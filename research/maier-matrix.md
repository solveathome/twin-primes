# The Maier matrix on the twin-slot set: what it gives, and exactly where it stops

<!-- ledger
id: Q-maier-matrix
status: CLOSED
todo: none
question: Can the Maier matrix transfer exact residue-level knowledge about twin slots into an interval statement, and if not, where does it stop?
verdict: It stops at a scale collision: at q = x# the matrix is the identity 0 = 0, at q = y# with y < x the transfer identity is PROVEN and VERIFIED 20 of 20 but is a first-moment identity only, almost-all would need the second moment which is the localized twin-gap problem itself, and Granville-Soundararajan Corollary 1.4 is vacuous at every computable scale.
-->

*(2026-08-17. Question from Chris: can the Maier matrix transfer our exact
residue-level knowledge into an interval statement about twin slots, and if not,
where does it stop? Code, real output and calibration below. Marked PROVEN,
VERIFIED by exact computation, MEASURED, REFUTED.)*

## 0. The hard part first

**The matrix works perfectly on our set, with every error term equal to zero,
and that is exactly why it yields nothing.** Maier's method is a device for
converting an approximate statement about arithmetic progressions into a
contradiction with an approximate statement about intervals. It runs on the
*mismatch* between two independent predictions. Our AP information is not
approximate, it is exact, so there is no mismatch to exploit; and we have no
second, independent prediction for the interval side, because supplying one is
the Zone Postulate itself.

Chris's doubt: *"I expect this yields almost-all statements and therefore does
not reach the origin."* The doubt is right, and
the situation is worse than almost-all. For our set the matrix does not even
reach an almost-all statement. It reaches a **first-moment identity**, one exact
mean over an ensemble, and nothing more. Almost-all would require a second
moment, and the second moment is the localized-gap problem the repo already has
open.

A clean negative, as asked. But the negative comes with a complete
classification (section 6) which is sharper than "it does not work": we can say
what the matrix produces for *every* choice of its parameters, because the whole
parameter space collapses to the single integer d = gcd(q, x#), and for each d
the output is one exact mean.

---

## 1. Setup, done honestly

Fix x, let W = x# and let

> **A = { n : gcd(n(n+2), W) = 1 }**, the twin-slot set of T_x, viewed as a set
> of integers rather than of residues.

A is exactly W-periodic, and its census in one period is the repo's
D_x = ∏_{3≤q≤x}(q−2), confirmed by direct enumeration in the code
(D_13 = 1485, D_19 = 378,675, D_23 = 7,952,175, matching `GLOSSARY.md`).

The Granville-Soundararajan matrix (gs.txt line 542) has (r,s) entry
**(R+r)q + sℓ**, summed by rows (short intervals inside an AP mod ℓ) and by
columns (APs mod q). We take **ℓ = 1**, which is Maier's own configuration: rows
become honest short intervals of length S, columns become APs to modulus q.

Two parameter choices matter and we examine both.

- **q = W = x# itself.** Chris's suggested choice, and the one that makes every
  row a translate of the same tile window.
- **q = y# for a coarser level y < x.** The choice that makes the matrix
  non-degenerate, and the only one that does.

We also drop GS's restriction of the entries to [x/4, x]. They need it so that
A(y)/y varies slowly; our A is periodic, so we sum over one exact period and
the origin is a legitimate row. **That is already a gain over the classical
setup**, and it is worth naming because it is the only place where exactness
buys anything at all: Maier and GS structurally exclude the origin, and we do
not have to.

---

## 2. q = x#: the matrix is the identity 0 = 0 (PROVEN, VERIFIED)

**Proposition.** If q is a multiple of W, then every row of the matrix contains
exactly D(S) := #{s ∈ [1,S] : s ∈ A} elements of A, and column s contains R
elements if s ∈ A and 0 otherwise. Both summations return R·D(S).

*Proof.* Row r is the translate of [1,S] by (R+r)q, an exact multiple of the
period. Column s is the set {(R+r)q + s}, all congruent to s mod W. ∎

Real output:

```
=== A. column modulus q = x#: the matrix is a tautology ===
  x= 7 W=   210 S=40 R=6  rowsum=18 colsum=18  rows distinct=3  col values in {0,6}: true  live cols=3 head=3
  x=11 W=  2310 S=40 R=6  rowsum=12 colsum=12  rows distinct=2  col values in {0,6}: true  live cols=2 head=2
  x=13 W= 30030 S=40 R=6  rowsum=12 colsum=12  rows distinct=2  col values in {0,6}: true  live cols=2 head=2
```

`rows distinct=3` means all six rows carry the same count, 3. The two sums agree
by construction, not by an argument.

**This kills the natural first idea immediately.** Chris's suggestion was that
with q = x# "the SLOT count is identical in every row while the PRIME count is
not". That is true, and it is the crystallization argument seen from the other
side, exactly as he said. But it also means the matrix has no content for slots:
the invariant Maier exploits is an *approximate* invariance which he plays
against an *exact* count. Here both sides are the same exact count. The prime
count does vary across rows, but the matrix gives no access to it, because A is
the slot set; to see primes you would need the row-by-row count of A ∩ primes,
which is free below x′² by crystallisation and is the twin prime problem itself
above x′². Either way it is not an output of the matrix.

---

## 3. q = y# with y < x: the exact transfer identity (PROVEN, VERIFIED 20/20)

Now let y < x, put q = W_y = y#, W = W_x = x#, M = W_x/W_y = ∏_{y<r≤x} r,
N = D_x/D_y = ∏_{y<r≤x}(r−2), and let the rows run over r = 0, 1, …, M−1 so
that the matrix covers exactly one period of A.

> **Transfer identity (PROVEN).** For every S ≤ y#,
>
>   **Σ_{r=0}^{M−1} #(A ∩ [r·y#, r·y# + S))  =  D_y(S) · N**,
>
> where D_y(S) = #{twin slots of T_y in [0,S)}. Equivalently the mean count over
> the M windows is
>
>   **mean = D_y(S) · ∏_{y<r≤x} (1 − 2/r)**.

*Proof.* The left side counts n ∈ [0, x#) with (n mod y#) < S and n ∈ A. Group
by s = n mod y#. By CRT a twin slot of T_x reduces mod y# to a twin slot of T_y,
and every twin slot s of T_y has exactly N preimages in one period of T_x, since
the residues at the primes in (y, x] are chosen independently and each admits
r−2 values. So the count is Σ_{s<S} N·[s ∈ T_y slots] = N·D_y(S). ∎

That proof is three lines of CRT. **The Maier matrix, applied to our set, is the
Copying Theorem written as a rectangle.** The row sum is the interval reading,
the column sum is the residue reading, and they agree because the Copying
Theorem says so.

Real output, every line an exact integer match:

```
  y=5 x=13: Wy=30 Wx=30030 M=1001 Dy=3 Dx=1485 N=495  prod(1-2/q)=0.494505  1/prod=2.022
    S     LHS(sum over rows)   RHS = D_y(S)*N   equal   origin  mean      origin/mean  pred
        20            990                990   YES       1     0.9890      1.011  2.022
        30           1485               1485   YES       2     1.4835      1.348  2.022

  y=7 x=17: Wy=210 Wx=510510 M=2431 Dy=15 Dx=22275 N=1485  prod(1-2/q)=0.610860  1/prod=1.637
        50           5940               5940   YES       2     2.4434      0.819  1.637
       121          11880              11880   YES       6     4.8869      1.228  1.637
       210          22275              22275   YES      11     9.1629      1.200  1.637

  y=13 x=19: Wy=30030 Wx=9699690 M=323 Dy=1485 Dx=378675 N=255  prod(1-2/q)=0.789474  1/prod=1.267
       169           2295               2295   YES       8     7.1053      1.126  1.267
      1000          11985              11985   YES      35    37.1053      0.943  1.267
     30030         378675             378675   YES    1173  1172.3684      1.001  1.267
```

(The `pred` column is 1/∏(1 − 2/q), the density ratio alone. It is not
origin/mean, and the gap between the two columns is exactly the factor ρ_x/ρ_y
of the Survival Quotient Identity, §4.)

### 3a. The identity in Maier's language

Divide by the naive prediction S·D_x/W_x. The identity becomes the display
below. **The display is ours, derived here — nothing in this subsection is
quoted from Maier**, and the `>` marks a result block rather than an attributed
quotation.

> **mean over the ensemble / naive = ρ_y(S) := [D_y(S)/S] / [D_y/W_y]**,

the local-to-global density ratio of the **coarser** tile in the same window.
This is Maier's mechanism exactly, with all error terms zero. ρ_y(S) is the
two-dimensional survival function, a function of u = ln S / ln y and of nothing
else (`FOLD-PROFILE.md` §9a), and its oscillation away from 1 is the Buchstab
oscillation Cheer and Goldston computed and Maier used.

```
  rho_y(S) = local density of T_13 in [0,S) over its global density  (y#=30030, D=1485, y'^2=289)
    S=     169  u=lnS/lny=2.000  D_y(S)=      9  rho=1.0769
    S=     289  u=lnS/lny=2.209  D_y(S)=     16  rho=1.1196
    S=     500  u=lnS/lny=2.423  D_y(S)=     25  rho=1.0111
    S=    1000  u=lnS/lny=2.693  D_y(S)=     47  rho=0.9504
    S=    5000  u=lnS/lny=3.321  D_y(S)=    246  rho=0.9949
    S=   30030  u=lnS/lny=4.020  D_y(S)=   1485  rho=1.0000

  rho_y(S) = local density of T_19 in [0,S) over its global density  (y#=9699690, D=378675, y'^2=529)
    S=     361  u=lnS/lny=2.000  D_y(S)=     17  rho=1.2062
    S=     529  u=lnS/lny=2.130  D_y(S)=     21  rho=1.0168
    S=    2000  u=lnS/lny=2.581  D_y(S)=     75  rho=0.9606
    S=   20000  u=lnS/lny=3.363  D_y(S)=    782  rho=1.0015
    S=  200000  u=lnS/lny=4.145  D_y(S)=   7801  rho=0.9991
    S= 9699690  u=lnS/lny=5.464  D_y(S)= 378675  rho=1.0000
```

So the matrix does deliver the analogue of Maier's theorem for our set, by
pigeonhole from the mean: **since ρ_y(S) ≠ 1, there exist windows of width S
where the twin-slot density is above its global mean and windows where it is
below.** Unconditional, exact, and at every window scale.

And it is worth nothing, because for a periodic set that statement is a
tautology restated: "the tile's head is denser than its bulk" is something we
can read off by enumeration at any level. Maier's theorem is hard for primes
because the primes are not a periodic set and the head-versus-bulk comparison is
not available by inspection. Ours is available by inspection. The matrix
converts an observation into itself.

---

## 4. The one thing the origin genuinely has: the Origin Excess Lemma

The origin is row 0, and it is not a typical row. It has a provable advantage,
and the advantage has an exact expiry date.

> **Origin Excess Lemma (PROVEN, VERIFIED 14/14).** Let y < x, let y′ be the
> least prime above y, and let **S ≤ y′²**. Then
>
>   **#(A ∩ [0,S)) = D_y(S) − L**,  where L = #{twin slots t of T_y with t < S
>   such that t or t+2 is struck},
>
> and a y-rough integer m ≤ y′² is struck by a prime in (y, x] **only if** m is
> itself a prime in (y, x], or m = y′² with y′ ≤ x.
>
> *Non-vacuity, a remark and not a hypothesis:* the conclusion has content only
> when **y′² > x**. See item 2 of the enumeration below, and never quote the box
> without it.

*Proof.* Write m = q·k with q prime in (y,x]. Then k is y-rough, so k = 1 or
k ≥ y′; and q ≥ y′. So either m = q, or m ≥ y′², with equality only when
q = k = y′. ∎

So at the origin the later folds remove essentially nothing. Each struck value m
can cost at most two slots (t = m and t = m − 2), so
**L ≤ 2(π(x) − π(y) + 1)**, a count of primes, against D_y(S) which grows with
S. Measured L is 0, 1 or 2 across all fourteen cells below. This is the
Head-calm lemma of `ZONE-POSTULATE.md` §6 in the two-level form.

The lemma predicts the count exactly, 14 of 14. The m = y′² boundary case is
load-bearing: dropping it fails 4 of the 14 cells.

```
=== F. the Origin Excess Lemma, S = y'^2 ===

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
```

### 4a. The canonical enumeration, by logical type

Three further statements travel with the lemma and are easy to miscount as
hypotheses of it. They are not, and the difference decides what each one needs
and where it can be used. **This table is the canonical enumeration; cite it
rather than keeping a private count.** `origin-excess.md` §6 carries the
derivations, one subsection per companion.

| # | statement | logical type | what it needs | derivation |
|---|---|---|---|---|
| 1 | **Origin Excess Lemma**, PROVEN, VERIFIED 14/14 | the lemma, and it has exactly one hypothesis | S ≤ y′² | this section |
| 2 | **the non-vacuity condition y′² > x** | a remark on when the conclusion has content, not a hypothesis | nothing; the identity holds regardless | `origin-excess.md` §6a |
| 3 | **Origin Excess Corollary**, PROVEN | a corollary, carrying the advantage and its expiry | x < x\*(y) for the guarantee to be positive | `origin-excess.md` §6b |
| 4 | **Scale Collision Proposition**, PROVEN | a theorem about the parameters, independent of the lemma | y < x with x prime | `origin-excess.md` §6c, and §5 below |

**1. What the one hypothesis is for.** The identity #(A ∩ [0,S)) = D_y(S) − L is
bookkeeping, because L is *defined* as the struck count, and it holds outside the
stated range too: VERIFIED at 3 of 3 cells with S > y′². The content is the
strike characterisation, and S ≤ y′² is what that needs. It is not decorative:
the bound L ≤ 2(π(x) − π(y) + 1) which the characterisation yields fails in 6 of
the 8 test cells with S > y′², at y = 7, x = 19, S = 1210 by L = 43 against a
bound of 10.

**2. The conclusion is empty unless y′² > x.** An x-rough integer below x is 1,
and 1 is not a slot, so D_x(S) = 0 for every S ≤ x and at S = y′² ≤ x the lemma
reads 0 = 0. This is a remark rather than a hypothesis precisely because the
lemma is *true* there, just empty, and every one of the fourteen verification
cells above satisfies it.

**3. The advantage, its ceiling, and where it expires.** The `ratio` column is
the origin's excess over the ensemble mean, exactly
(1 − L/D_y(S)) / ∏_{y<r≤x}(1 − 2/r), whose second factor is asymptotically
(ln x / ln y)². **That is not a licence to grow the advantage.** The corollary's
guarantee, origin ≥ D_y(y′²) − 2(π(x) − π(y) + 1), is positive only for x below a
threshold x\*(y), and ln x\*/ln y ≈ 1.44 at all nine computed levels
(`research/origin-excess.md` §6b). So

> **the origin beats the ensemble mean by a factor of at most about 2.2, for
> S ≤ y′², and the measured maximum over the fourteen cells is 1.372.**

The ceiling is MEASURED in one input, the flatness of ln x\*/ln y over two orders
of magnitude in y, and PROVEN from there. The measured maximum is near the
ceiling, not a small-sample artifact. The advantage is real, it is
unconditional, it is origin-specific, and it is small.

**4. The regimes never meet, and no better lemma repairs it.** y < x with x prime
gives y′ ≤ x < x′, hence **y′² < x′² strictly**. That is a statement about the
two parameters rather than about this construction, so it is independent of the
lemma and survives any improvement to it. It is the headline of §5.

The exact form of that ratio column, which is what should be quoted rather than
the asymptotic factor, is the **Survival Quotient Identity** of `origin-excess.md`
§2: origin(S)/mean(S) = ρ_x(S)/ρ_y(S), with no error term, for every y < x and
S ≤ y#. The origin's excess is not a property of the origin at all; it is the
one survival curve of §3a read at two levels.

That is exactly the kind of origin-specific advantage route B of
`ZONE-POSTULATE.md` §6 asks for. It is also, as the next section shows,
unusable.

---

## 5. Where it stops: the scale collision (the headline)

The Origin Excess Lemma needs **S ≤ y′²**. The Zone Postulate at level x needs
**S = x′²**. Putting these together requires

>  **x′² ≤ S ≤ y′²,  hence y ≥ x.**

But the matrix is non-degenerate only for y < x, and at y = x it is the
tautology of section 2. **The regime in which the matrix carries information and
the regime in which the origin is distinguished are disjoint, and they touch
only at the degenerate matrix.**

**And the collision needs no matrix at all.** If y < x with x prime then
y′ ≤ x < x′, so y′² < x′² strictly, in one line. The disjointness is a fact
about the two parameters and not a property of this construction, so no better
lemma repairs it (`research/origin-excess.md` §6c).

This is not a heuristic. It is measured directly. As S passes y′² the origin
loses its advantage and drops into the bulk of the ensemble:

```
  y=13 x=23  M=7429 rows   y'^2=289  x'^2=841
       S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
     169     6.487       8    3    9       0     163 / 7429          yes
     289    11.533      15    7   15       0       1 / 7429          yes
     361    13.696      17    9   17       0       1 / 7429          yes
    1000    33.879      32   28   40       0    5752 / 7429          NO
    5000   177.323     177  168  189       0    3522 / 7429          NO
   30030  1070.423    1075 1055 1087       0    1036 / 7429          yes

  y=11 x=17  M=221 rows   y'^2=169  x'^2=361
     121     5.226       6    3    7       0      16 / 221          yes
     169     7.466       8    5   10       0      28 / 221          yes
     500    22.398      22   19   26       0     104 / 221          NO
    1000    42.557      39   38   47       0     217 / 221          NO
    2310   100.792      99   95  104       0     182 / 221          NO
```

At S = y′² the origin is the single largest row out of 7429. At S = 1000, about
3.5 times y′², it is the 5752nd largest and sits **below** the mean.

**The advantage does not decay gracefully into the zone. It reverses.** The
ratio bottoms out at 0.9343 at S = 3.53 y′² and only then relaxes to 1.0043 at
the full period, and per prime the origin's loss reaches 125% of fair share at
eight times its threshold (`research/origin-excess.md` §3, §4). The head excess
is paid back on the shoulder, and any construction that widens the window past
y′² collects the repayment.

**REFUTATION.** The hope that the origin row could be shown to dominate the
ensemble at the zone's own width, so that the ensemble mean would lower-bound
it, is false. At the width the Zone Postulate actually asks for, S = x′², the
origin is an ordinary row:

```
=== E. the row width the Zone Postulate actually asks for: S = x'^2 ===

  y=11 x=17  M=221 rows   y'^2=169  x'^2=361
       S   mean     origin  min max  #empty  origin rank (1=largest)  origin>=mean?
     361    15.679      18   12   19       0       3 / 221          yes

  y=13 x=19  M=323 rows   y'^2=289  x'^2=529
     529    21.316      21   19   24       0     135 / 323          NO

  y=13 x=23  M=7429 rows   y'^2=289  x'^2=841
     841    29.554      30   24   36       0    2254 / 7429          yes

  y=17 x=23  M=437 rows   y'^2=361  x'^2=841
     841    27.776      30   24   32       0      16 / 437          yes

  y=19 x=23  M=23 rows   y'^2=529  x'^2=841
     841    27.391      30   25   30       0       1 / 23          yes
```

(Full sweep of ten (y,x) pairs in the run log; the five above are the ones with
M large enough for the rank to mean anything. The pair y=7, x=13 is skipped
because x′² = 289 exceeds y# = 210.)

The rows where the origin still ranks near the top are exactly the rows where y
is close to x, that is where x′² is still close to y′², which is the collapsing
regime again. At y = 13, x = 19 the origin is genuinely below the mean.

**The ceiling, stated with no y in it at all.** Take the ensemble of all x#
translates, whose mean is S·δ_x. Then origin/mean at S = x′² is exactly
ρ_x(x′²) = ρ(2), and ρ has its minimum at u = 2. Measured to x = 6037 and
divided by the window's own finite-size Hardy-Littlewood factor, that ratio
reads 0.79303, 0.79475, 0.79668, 0.79863, 0.79922 against

>  **e^{2γ}/4 = 0.79305.**

So at the zone's own width the origin carries **21% less** than the tile's mean
density, not more (`research/origin-excess.md` §5). That constant is the same
ρ(2) that `FOLD-PROFILE.md` §9 calls the Unification Law's trough constant and
that `GLOSSARY.md` records as the conjectured limit of β; the origin ceiling is
its fifth independent appearance in the repo, and the four earlier ones reached
it from other directions. Nothing about the matrix is needed for it.

### 5a. The circularity, stated once so it is not rediscovered

There is a second, independent reason the useful regime is empty. In the regime
S ≤ y′² where the Origin Excess Lemma applies, the identity's *input* is
D_y(S) = #{twin slots of T_y below S}, and by crystallization every such slot
below y′² is a genuine twin prime. So the input is the twin prime count below
y′², and the output is the twin prime count below y′² minus a handful of primes.
**Input and output are the same quantity.** This is the same degeneracy the A6
refutation found for the first-slot recursion (`ZONE-POSTULATE.md` §6, update
2026-08-16): at the origin, the fold structure is frozen and every exact
relation reduces to the twin prime sequence describing itself.

---

## 6. The complete classification (PROVEN, VERIFIED)

The above is not a report on two choices of q. The whole parameter space
collapses, and this is the sharpest form of the answer.

> **Proposition.** In the matrix with entries (R+r)q + s, the row positions
> (R+r)q reduce mod W = x# to the multiples of **d = gcd(q, W)**, and as r runs
> over a full period each multiple of d is hit equally often. Hence for the
> W-periodic set A the matrix returns, for every q, exactly one quantity: the
> **mean of #(A ∩ [t, t+S)) over the W/d windows at t ≡ 0 (mod d)**, which is
> Σ_{s<S} h_d(s) / (W/d), where h_d(s) = #{slots ≡ s mod d}.

So the matrix's entire output is the **residue histogram h_d**, which is the
Level Ledger object of `FOLD-PROFILE.md` §2. Three regimes, and there are no
others:

| d = gcd(q, x#) | ensemble | what the matrix returns |
|---|---|---|
| d = 1 (q coprime to W) | all W translates | the global mean exactly; ρ = 1; zero information |
| d = y# (or any proper divisor of W) | the W/d windows at multiples of d | ρ = ρ_y(S), the coarser tile's local density; section 3 |
| d = W | one window | the target itself; section 2, the tautology |

Verified across eleven divisors of 13# at S = 210:

```
=== G. the matrix depends on q only through d = gcd(q, x#) ===
  x=13 W=30030 D=1485 S=210   naive = S*D/W = 10.3846
       d   #windows      mean    rho=mean/naive   min  max  origin
     210        143    10.3846         1.0000     8   13     12
     330         91    10.2747         0.9894     8   13     12
     462         65    10.1538         0.9778     8   13     12
     770         39    10.1538         0.9778     8   13     12
    1155         26    10.5769         1.0185    10   13     12
    2310         13    11.0000         1.0593    10   13     12
    5005          6    10.3333         0.9951     9   12     12
    6006          5    10.8000         1.0400    10   12     12
   10010          3    10.6667         1.0272    10   12     12
   15015          2    11.0000         1.0593    10   12     12
   30030          1    12.0000         1.1556    12   12     12
```

The last line is the tautology: one window, mean equals the origin's own count.
The first line has ρ exactly 1 because S = 210 = 7# is a full period of T_7.
Note also that d = 1 is provably useless in one line: averaging a periodic
function over a full period returns its mean, so ρ = 1 and the matrix says
nothing at all. **Choosing the column modulus coprime to the tile, which is what
GS's coprimality condition (q, S) = 1 pushes you toward, is the worst possible
choice for our object.**

**Consequence.** The matrix is a first-moment device. It returns one number, an
exact mean, and the number it returns is a residue statement (h_d) in the sense
of `THE-LENS.md` §5's triage rule. **The Maier matrix, applied to an exactly
periodic set, never crosses from the residue side of the triage to the interval
side.** The crossing in Maier's own work is performed not by the matrix but by
the comparison with an *independent* interval prediction, namely the prime
number theorem. We have no independent interval prediction for twin slots; the
only one on offer is Hardy-Littlewood, which is the conjecture.

---

## 7. Chris's three questions, answered

**Q1. Almost-all, every-window, or something else?**

**Something else, and weaker than both.** It is a first-moment identity: one
exact ensemble mean, plus whatever pigeonhole extracts from it (some window is
above the mean, some below). Almost-all would need the second moment of the row
counts. That second moment is exactly the localized twin-gap problem
`LOCALIZED-GAP.md` already carries, and an every-window statement at S = x′² is
strictly stronger than the Zone Postulate, since it demands a slot in *every*
window of that width, which is the Gap Reformulation G₂(x#) < x′² of
`ZONE-POSTULATE.md` §3, route A. **So the matrix hands the problem back to route
A having added nothing.** The measured min column above (min 24 against mean
29.6 at y=13, x=23) shows the dispersion is small, which is the same sub-Poisson dispersion FOLD-PROFILE §3 measured, but small measured dispersion is not a bound.

**Q2. Can a distinguished row or column be the zone at the origin?**

**Yes, and that is the problem, not the solution.** Row 0 is literally the zone
at the origin, and unlike Maier and GS (who restrict entries to [x/4, x] to keep
A(y)/y slowly varying) we are free to include it, because our set is periodic.
That freedom is the one genuine gift of exactness. It buys nothing, for two
reasons proved above: the identity constrains the sum over all M = x#/y# rows
and gives no purchase on any single row; and the origin's provable advantage
(section 4) expires at S = y′², while the zone needs S = x′², which forces
y ≥ x and degenerates the matrix (section 5). In the one regime where the origin
is distinguished, the identity's input equals its output (section 5a).

**Q3. Does exact AP input buy anything Maier could not get?**

**No, and the reason is structural rather than quantitative.** Three parts.

1. **The AP input governs how conditional the theorem is, not how strong it
   is.** Maier's AP input is expensive: for primorial
   moduli it is Gallagher's large-sieve zero-density estimate near σ = 1
   (Invent. Math. 11, 1970), which is what keeps the exceptional zeros out. But
   GS say explicitly what improving it does. Their framework *"allows us to
   substitute a zero-density result of P. X. Gallagher where previously the
   Generalized Riemann Hypothesis was required"* (gs.txt line 386). Going from a
   GRH-strength AP input to an unconditional one changed the hypotheses and left
   the conclusions where they were. The **size** of Maier's conclusion is
   |ρ − 1|, and ρ comes from the oscillation of the Buchstab function, not from
   the AP estimate. So a perfect AP oracle, whether GRH or our exactness, moves
   the conclusion by nothing. That is the same finding `sift-limit-attack.md`
   reached on the sieve side: a perfect distribution oracle moves the exponent
   by nothing. **His fight with the AP input buys unconditionality; his fight
   with Buchstab buys the theorem.** Our exactness is on the wrong side of that
   split, which is why "ours is exact and free" is a true premise with no
   encouraging inference under it.
2. **Exactness removes the very mismatch the method runs on.** Maier's
   conclusion is a contradiction between two predictions for the same sum. Our
   two summations are two readings of one CRT product, so they agree by theorem.
   The matrix is a bridge between two shores; we own both shores, and the bridge
   connects a place to itself.
3. **The bottleneck sits elsewhere entirely, and it is the moment order.** A
   two-way sum is a first moment. A first moment can never lower-bound a
   distinguished term. Every localisation in this subject comes from a second
   moment or from a positivity certificate, and the matrix supplies neither.

**One thing exactness does buy, recorded so the ledger is honest:** the identity
of section 3 holds with zero error for **all** S ≤ y#, whereas Maier's
corresponding step is confined to S = (log x)^λ with λ bounded and to positions
in [x/4, x]. We get an unconditional Maier-type irregularity theorem for the
twin-slot set at every scale and every position. It is worth nothing here, but
it is a correct statement and a legitimate worked example of the technique.

---

## 8. Granville-Soundararajan Corollary 1.4 is vacuous at every computable scale

**Read from the published Annals of Mathematics 165 (2007), 593–635, printed
page 599 (PDF page 7 of the Annals reprint), and independently from the
arXiv:math/0406018v1 PDF** — the numbering agrees in both, (1.7) is (1.7) and
Corollary 1.4 is Corollary 1.4, so nothing here is exposed to a
preprint/published renumbering (verified 2026-08-18,
`research/history/staging/lit-pdf-fgkt-maier.md` item 2). The older citation
`scratchpad/holt/gs.txt` lines 313 to 325 is exact but points at another
session's scratchpad, which no reader of this file can reach. Verbatim:

> *"Suppose that (1.7) holds for some α ≥ 60 log log log x/ log log x and set
> η = min(α/3, 1/100). Then for each 5/η² ≤ u ≤ η(log x)^{η/2} at least one of
> the following two assertions holds …"*

**η is capped at 1/100 by construction**, for every sequence, regardless of how
good α is. So **u ≥ 5/η² ≥ 50,000 always**, and the upper constraint
u ≤ η(log x)^{η/2} then forces (log x)^{1/200} ≥ 5·10⁶, that is
log x ≥ (5·10⁶)^{200}, roughly x > exp(10^{1340}). The corollary is vacuous at
every scale anyone will ever compute at, and at u = 2 it is vacuous at every
scale whatsoever.

**Corollary 1.4 is not an obstruction to anything in this repo.**

Two further points, both new:

- For our set, condition (1.7) is satisfied with α = 1 + o(1). Here h(p) = 0 for
  p ≤ x and h(p) = 1 for p > x (by CRT the twin slots are exactly equidistributed
  in APs to moduli coprime to W). So if the tile level x is at least log X, where
  X is the range, then Σ_{p≤log X} (1−h(p)) log p / p ~ log log X and α = 1.
  Our set is a legitimate GS sequence. The corollary simply never activates.
- More interestingly, our set **satisfies the uncertainty principle explicitly
  and on the interval side**. Alternative (ii), poor distribution in APs, is
  false for us in the strongest sense: the distribution in APs coprime to W is
  perfect. So alternative (i), an interval where the density deviates, must
  hold, and section 3a exhibits it with the deviation computed exactly:
  ρ_y(S) ≠ 1. **Our object is a worked example of the GS dichotomy in which both
  sides are known exactly.** That is a nice thing to have and it changes nothing
  about the Zone Postulate, since the deviating intervals are the ensemble again.

---

## 9. READINGS

1. **PROVEN + VERIFIED.** With column modulus q a multiple of x#, the Maier
   matrix over the twin-slot set is the identity 0 = 0. Every row carries the
   same count. Section 2.
2. **PROVEN + VERIFIED (20/20 exact integer matches).** With q = y#, y < x, the
   two summations give the transfer identity Σ_r #(A ∩ [r·y#, r·y# + S)) =
   D_y(S)·∏_{y<r≤x}(r−2). It is the Copying Theorem written as a rectangle, and
   its proof is three lines of CRT. Section 3.
3. **PROVEN + VERIFIED (14/14).** Origin Excess Lemma, one hypothesis, S ≤ y′²,
   and non-vacuous when y′² > x: the origin row equals D_y(S) minus the T_y slots
   t < S with t or t+2 struck, and a y-rough m ≤ y′² is struck only if m is a
   prime in (y,x] or m = y′². The m = y′² boundary case is load-bearing: dropping
   it fails 4 of the 14 cells. The Origin Excess Corollary's advantage over the
   ensemble mean is **capped by an absolute constant of about 2.2**, with a
   measured maximum of 1.372, because the lemma is silent for y′² ≤ x and the
   corollary's guarantee is trivial for x ≥ x* with ln x*/ln y ≈ 1.44. Its exact
   form is ρ_x(S)/ρ_y(S). Sections 4 and 4a.
4. **REFUTED (MEASURED, decisive).** The origin does not dominate the ensemble at
   the zone's width. At S = x′² its rank among the M rows is 2254 of 7429
   (y=13, x=23) and it sits below the mean at y=13, x=19. The advantage of
   reading 3 expires at S ≈ y′² and then **reverses**, troughing at 0.9343 near
   S = 3.5 y′². Against the ensemble of all x# translates the origin at S = x′²
   carries ρ(2) = e^{2γ}/4 = 0.79305 of the mean density, 21% below it, which is
   the same constant `FOLD-PROFILE.md` §9 calls the trough constant. Section 5.
5. **PROVEN (the stopping point, sharply).** The Origin Excess Lemma needs
   S ≤ y′² and the Zone Postulate needs S = x′², so both together force y ≥ x,
   at which point the matrix is the tautology of reading 1. The informative
   regime and the origin-distinguished regime are disjoint. The collision is one
   line and has no matrix in it: y < x with x prime gives y′ ≤ x < x′, hence
   y′² < x′² strictly. Section 5.
6. **PROVEN + VERIFIED (11 divisors of 13#).** Complete classification: the
   matrix depends on q only through d = gcd(q, x#), and returns exactly one
   number, the mean of the window count over the x#/d windows at multiples of d,
   which is the Level Ledger histogram h_d. d = 1 gives ρ = 1 and zero
   information; d = x# gives the tautology. Section 6.
7. **INFERRED, and it is the general lesson.** The Maier matrix is a
   first-moment device that converts an approximate AP statement into a
   contradiction with an *independent* interval prediction. For an exactly
   periodic set there is no approximation to exploit and no independent
   prediction to contradict, so the matrix never crosses the residue-to-interval
   line of `THE-LENS.md` §5's triage. **Exact AP input does not beat Maier's
   approximate input; it removes the mechanism.** Section 7, Q3.
8. **VERIFIED from source.** GS Corollary 1.4 has η = min(α/3, 1/100) capped at
   1/100 for every sequence, hence u ≥ 50,000 unconditionally and
   log x ≥ (5·10⁶)^{200}. It cannot apply at u = 2 or at any computable scale, so
   it is not an obstruction here. Section 8.
9. **PROVEN + MEASURED, minor and positive.** Our set satisfies GS alternative
   (i) explicitly: it is perfectly distributed in APs coprime to W, so the
   dichotomy forces an interval irregularity, and ρ_y(S) computes it exactly.
   Section 8.
10. **INFERRED, where this leaves the repo.** The matrix hands the Zone
    Postulate back to route A of `ZONE-POSTULATE.md` §6 unchanged: an
    every-window statement at width x′² is the Gap Reformulation, and an
    almost-all statement needs the second moment of the same ensemble, which is
    the localized gap of `LOCALIZED-GAP.md`. Nothing is gained and nothing is
    lost. **Nobody in this repo should attempt the Maier matrix again without
    first defeating reading 5.**

---

## 10. Reproduction

`node --max-old-space-size=6144 research/maier-matrix.js`, 6 seconds. Output
sections A, B, C, D, E, F, G correspond to sections 2, 3, 3a, 5, 5, 4 and 6
here. The largest tile enumerated is T_23 (223,092,870 residues), which is why
the heap flag is there; everything else is small. The flag can be dropped if the
T_23 lines are removed.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
