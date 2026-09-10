# Do the actual Mobius signs cancel in the small-common-divisor kernel?

<!-- ledger
id: Q-kernel-sign-control
status: ANSWERED
todo: C
parity: Finite measurement of an already-derived ordered-pair decomposition. The actual aggregated Mobius/von Mangoldt right coefficient A_right(gu) of grouped-divisor-moment.md (13) is measured against a same-support absolute-value control and a same-support seeded random-sign control. No arithmetic estimate, no asymptotic rate and no parity obstruction is asserted or excluded; a finite ratio can neither establish nor refute a power saving, and the null result below is a failure to detect, not a proof of absence.
question: At delta=8/25, nu=9/20, is the moment Mfrak and its small-common-divisor kernel X_small measurably smaller with the actual coefficient b_u=A_right(gu) than with |b_u| or with |b_u| times an independent seeded random sign, and does the actual/random ratio decrease with x over the feasible dyadic range?
verdict: MEASURED, negative. Over seven dyadic scales j=18..30 and four boxes, the pre-registered slope of log2(actual/random) for X_small has mean + sd >= 0 in all four families, so the run gives no heuristic support for extra Mobius-sign cancellation in the small-j kernel. The actual coefficient's |X_small| ranks like one more random draw. The measurement is weak where it matters: the finite moment is 97.66-102.58 percent equal-frequency class, X_small carries 0.02-2.88 percent, J0=floor(x^(1/20)) is 1 at j=18 and 2 at j=20..30, and Z=2 collapses the prime-power sector of (13) to r=2. Equation (21) and the global twin margin remain OPEN and untouched.
-->

**Twin-prime infinitude remains OPEN and nothing here moves it.** This note
records one finite measurement. Its calibration is MEASURED. A ratio measured
on seven dyadic scales can refute a hope (if the actual coefficient shows no
advantage at all) or lend heuristic weight to one; it cannot show a power
saving, cannot establish (21) of
[grouped-divisor-moment.md](grouped-divisor-moment.md), and cannot move the
sufficient margin of [RESEARCH-HANDOFF.md §3](RESEARCH-HANDOFF.md).

## 0. Pre-registered falsifier and controls, written before the run

Fixed before executing [kernel-sign-control.js](kernel-sign-control.js).

**Falsifier.** Let the ratio be

    rho_k(x) = |X_small(actual)| / |X_small(random draw k)|,   k = 1..8.

For each draw k separately, fit the least-squares slope of log2 rho_k against
log2 x over the dyadic points that share one value of J0 = floor(x^(1/20)).
Report the mean slope over the eight draws and its sample standard deviation.

*If mean slope + sd >= 0, the measurement gives no heuristic support for
Mobius-sign cancellation in the small-j kernel along this route, and this note
says so first.* If mean slope + sd < 0, the note may say the measurement is
**consistent with** extra cancellation over the measured range; it may never
say the measurement implies, shows or establishes it, and it must state the
finite range and the fact that a decreasing finite ratio is compatible with no
asymptotic saving.

The same statistic is reported for the whole moment Mfrak and for the
absolute-value control (control 1), which has no sign structure at all and is
therefore the upper reference, not a null.

**Negative controls, all required to fire.**

1. *Complete periods are detected.* In a configuration where the class of
   nonzero pairs with c dividing theta\*R is nonempty, dropping those pairs
   must change the kernel value. In the production boxes the class is proved
   empty by an exact inequality, and that is reported as a measured share of
   zero, not as an absence of the class from the derivation.
2. *Conjugation is load-bearing.* Replacing the conjugate of the second factor
   by the factor itself must destroy the reality of X_small: the unconjugated
   ordered-pair sum must have a nonzero imaginary part.
3. *Both endpoints are shifted under reciprocity.* The left-orientation kernel
   built with the reciprocal shift must agree with the native kernel, and the
   variant built without the shift must disagree.
4. *All-ones coefficients reproduce the zero-frequency size.* With b_u = 1 the
   equal-frequency class of (5) must dominate the moment, its ordered-pair
   count must respect the counting bound 8\*N\*A\*(1+log(2\*min(N,A))), and its
   mass must respect the majorant B²\*max|c_h|²\*max|F|\*|I|\*(pair count).

**Identity checks.** The class decomposition is computed by an exact divisor
sieve, and it is checked against literal ordered-pair enumeration at small
sizes before any production number is read.

## 1. What is measured, exactly

The box is (delta,nu) = (8/25,9/20) of
[grouped-divisor-moment.md §6](grouped-divisor-moment.md) and
[RESEARCH-HANDOFF.md §5](RESEARCH-HANDOFF.md). For x = 2^j:

* left expanded interval I = (M,2M] with M = floor(x^(14/25)); every integer
  m in I is summed, so |I| = M;
* right original interval J = (E,2E] with E = floor(x^(9/20)) and cutoff
  W = Z = max(2,floor(x^(1/20)));
* **top** expanded box ell in (E\*Z, 2E\*Z] (so ell is of order x^(1/2)) and
  **low** expanded box ell in (E,2E], with u = ell/g in (N,2N];
* g in {1,2}, theta = 2/g, sigma = -1, native endpoints z0 = x/2 and z = x;
* harmonic band H = [A,2A) with A = round(x^(3/50)) (the top band) and A = 1;
* c_h = -W(h/(T+1))/(2 pi i h) with Vaaler's W of
  [endpoint-fourier.md (7)](endpoint-fourier.md) and T = 4\*round(x^(3/50)).

The coefficient is the actual one, b_u = A_right(g u), built from (13) at
s = 0 with that J and W. Two structural facts about it at these finite sizes
shape everything below.

* On the **top** box no ell lies in J, so A_0 vanishes identically there and
  A_1(ell) reduces to the prime-power sector alone. Since floor(x^(1/20)) = 2
  for every x in the feasible range, that sector has the single prime power
  r = 2, and A_1(ell) = -mu(ell/2)\*log 2 for even ell, zero for odd ell. The
  top-box coefficient is therefore exactly a Mobius sign times a constant,
  supported on the even u. This is the sharpest possible form of the sign
  question and simultaneously a finite-size degeneracy: the r-sector of (13)
  is not exercised beyond r = 2.
* On the **low** box A_0(ell) = mu(ell) and A_1(ell) = -mu(ell)\*log ell on the
  whole box, with no prime-power term. This is the pure Mobius sector.

The three coefficient choices share one support: actual b_u; |b_u| (control 1);
and |b_u| times an independent seeded sign, eight draws (control 2). A fourth,
b_u = 1 on the whole box, is the all-ones control (iv).

**Classes.** For an ordered pair put j = (u1,u2), u_i = j\*ell_i, c = lcm(u1,u2)
= j\*ell_1\*ell_2 and R = h1\*ell_2 - h2\*ell_1. The four classes are R = 0
(equal rational frequencies h1/u1 = h2/u2), nonzero R with c | theta\*R
(complete periods), nonzero R with j > J0, and X_small of (21), the nonzero R
with j <= J0, where J0 = max(1,floor(x^(1/20))).

X_small is computed by an exact divisor sieve, not by pair enumeration: with
f = 1_{n<=J0} \* mu in the Dirichlet sense, sum_{d|n} f(d) = 1_{n<=J0}, so the
whole j <= J0 class equals sum_m sum_d f(d)\*|G_d(m)|², where G_d(m) restricts
the u-sum to multiples of d. The script verifies that identity numerically for
every n <= 2N in every configuration, and checks the resulting class values
against literal ordered-pair enumeration at small sizes.

Two classes are proved empty on every production configuration rather than
assumed away:

* a nonzero R with c | theta\*R needs theta\*|h1\*u2 - h2\*u1| >= u1\*u2, and
  theta\*max(h)\*2N < (N+1)² holds throughout, so the complete-period class is
  empty and its measured share is exactly 0;
* an equal-frequency pair with h/u = p/q in lowest terms has
  j = q\*gcd(t1,t2) >= q, and min q over the atoms exceeds J0 throughout, so no
  equal-frequency pair has small j. Hence the sieve's j <= J0 class is exactly
  X_small of (21).

## 2. Result

**Falsifier verdict, negative in all four families.** The pre-registered slope
of log2(|X_small(actual)|/|X_small(draw k)|) against log2 x, fitted over the
six scales j = 20,22,24,26,28,30 that share J0 = 2, has mean and sample
standard deviation over the eight draws

* -0.0570 +- 0.1741 (top box, g=2, A~x^(3/50)),
* 0.2088 +- 0.2072 (top box, g=2, A=1),
* -0.1443 +- 0.2237 (top box, g=1, A~x^(3/50)),
* -0.0813 +- 0.3024 (low box, g=1, A~x^(3/50)).

Mean slope + sd >= 0 in every case. By the rule written in section 0, **the
measurement gives no heuristic support for Mobius-sign cancellation in the
small-j kernel along this route.** It does not refute such cancellation; it
fails to detect any, in a regime described below where it would be hard to see.

The whole moment shows no advantage either. Mfrak(actual) divided by the mean
of the eight random-sign moments is 1.027, 1.038, 1.020, 1.021, 1.019, 1.014
across j = 20..30 on the top box at g=2, with slope -0.0024 +- 0.0035 — the
actual coefficient's moment is if anything a per-cent or two **larger** than a
random-sign one. That is expected: the equal-frequency class carries between
97.66% and 102.58% of Mfrak in every row, and on the diagonal the sign of b_u
cannot matter.

The descriptive aggregate in TABLE 4 was computed after the pre-registered fit
and is not the pre-registered test. Over the 27 configurations with a nonempty
small-j class, |X_small(actual)| has mean rank 5.15 among itself and its eight
draws, against the null expectation 5.00 with null standard deviation 0.50 for
that mean; 12 of 27 configurations put the actual value below its draw median,
against the null expectation 13.5. Both distribution-free statistics sit at the
null: in this kernel and at these sizes the actual Mobius signs behave like one
more independent sign draw.

Two ratios in TABLE 4 need reading carefully rather than at face value. The
geometric mean of |X_small(actual)|/mean|X_small(random)| is 0.604, which is
**not** evidence of an advantage: the numerator is one value and the
denominator an average of eight, so by Jensen's inequality that ratio is below
one under the null as well. The geometric mean of
|X_small(actual)|/|X_small(|b|)| is 0.316, comparing two single values, and
that one does say something — against the all-positive control, which has no
sign structure at all, the signed coefficient's kernel is smaller by roughly a
factor of three. Signs help against no signs. Mobius signs
do not help against random signs, which is the question asked here.

Growth rates. d log2 Mfrak / d log2 x is 0.982, 1.001, 0.979 and 0.990 in the
four families, against budget slopes of 1.388, 1.325, 1.426 and 1.495, and the
generic N³ exponent 1.500. The measured moment therefore tracks the diagonal term and
sits far below its Weil budget: at j=30 the top box at g=2 measures
2.6265e+6 against a budget of 2.5676e+12. d log2 |X_small| / d log2 x is 0.684,
0.929, 0.455 and 0.585, all well under the 36/25 = 1.440 that (21) asks for —
but that is the growth of the actual finite value in a regime where the moment
grows like x^1 rather than x^1.5, and it is not an estimate of the asymptotic
exponent.

All four negative controls fired, and the sieve identity agrees with literal
ordered-pair enumeration on all five class quantities in four configurations.
The endpoint matters: at j=22, g=2, A=2 the native z = x gives Mfrak =
1.1513e+4 and X_small = -8.7460e+1, while z = 3x/4 gives Mfrak = 3.5937e+3
and X_small = -5.1390e+1. Numerical headroom is adequate: the divisor sieve cancels by
between 137.1x and 26201.6x, and the worst-case double-rounding floor relative
to |X_small| is 2.48e-7.

The output block below is copied mechanically out of the binding written by
`node research/qc/embed.js research/kernel-sign-control.js`; the deterministic
artifact is [kernel-sign-control.json](kernel-sign-control.json).

<!--BLOCK-->
```
KERNEL SIGN CONTROL — actual A_right(gu) against |A_right| and seeded random signs
box delta=8/25 nu=9/20: M=floor(x^(14/25)), I=(M,2M]; E=floor(x^(9/20)), Z=max(2,floor(x^(1/20)))
top expanded box ell~E*Z (~x^(1/2)), low expanded box ell~E; u=ell/g; native z0=x/2, z=x; sigma=-1
c_h = -W(h/(T+1))/(2 pi i h) with Vaaler W and T=4*Atop; J0=max(1,floor(x^(1/20))); draws=8
dyadic scales j: 18,20,22,24,26,28,30
control (iii) reciprocity: 6552/6552 shifted-endpoint kernels equal the native kernel; 6547 unshifted ones differ
identity check — divisor sieve against literal ordered-pair expansion:
  x=4096 g=1 A=2 J0=2 N=48 M=24: 900 ordered pairs (R=0: 32, j<=J0: 656, periods: 0); 5 quantities agree
  x=4096 g=2 A=2 J0=2 N=24 M=24: 900 ordered pairs (R=0: 32, j<=J0: 768, periods: 0); 5 quantities agree
  x=8192 g=1 A=1 J0=1 N=64 M=24: 361 ordered pairs (R=0: 19, j<=J0: 0, periods: 0); 5 quantities agree
  x=8192 g=2 A=3 J0=2 N=32 M=24: 3249 ordered pairs (R=0: 59, j<=J0: 2808, periods: 0); 5 quantities agree
control (i) complete periods: detector N=6 A=8 M=20 has 62 period pairs of 2304; dropping them moves the nonzero j<=J0 kernel from -1.4484e-2 by -8.7191e-3
control (ii) conjugation: at j=18 g=2 A=2 the conjugated X_small = 1.2476e+1 is real; the unconjugated ordered-pair sum is 1.0960e+0 + 9.8785e+0i
control (iv) all-ones coefficients, equal-frequency domination (top box, g=2, A=Atop):
  j=18 N=274 M=1082: Mfrak(ones)=2.0698e+3, R=0 share 108.30% (actual A1 on the same box: 97.66%); 638 equal-frequency ordered pairs vs the (5) count bound 1.046e+4; class majorant 1.3215e+4
  j=20 N=512 M=2352: Mfrak(ones)=8.4549e+3, R=0 share 105.53% (actual A1 on the same box: 100.72%); 1194 equal-frequency ordered pairs vs the (5) count bound 1.955e+4; class majorant 5.3760e+4
endpoint sensitivity at j=22 g=2 A=2: z=x gives Mfrak=1.1513e+4 X_small=-8.7460e+1; z=3x/4 gives Mfrak=3.5937e+3 X_small=-5.1390e+1

TABLE 1 — the moment Mfrak. n per row: |I|=M values of m, nz_u divisors u with A_right(gu)!=0, |H|=A harmonics
   j  box  g   A  J0       N        M   nz_u   atoms    Mfrak(A1)   Mfrak(|A1|)      Mfrak(random) mean +- sd    Mfrak(A0)       budget
  18  top  2   2   1     274     1082    166     332  7.3248e+2  6.8433e+2  6.9160e+2 +- 3.0227e+1  0  2.7434e+7
  18  top  2   1   1     274     1082    166     166  6.4526e+2  6.3136e+2  6.3327e+2 +- 2.4117e+1  0  1.4672e+7
  18  top  1   2   1     548     1082    166     332  4.5876e+2  4.0989e+2  4.1148e+2 +- 2.6359e+1  0  1.1659e+8
  18  low  1   2   1     274     1082    166     332  9.3168e+4  9.5638e+4  9.0466e+4 +- 2.1651e+3  2.5817e+3  2.2695e+9
  20  top  2   2   2     512     2352    310     620  2.8491e+3  2.8632e+3  2.7749e+3 +- 8.8428e+1  0  1.7708e+8
  20  top  2   1   2     512     2352    310     310  2.4951e+3  2.5581e+3  2.5526e+3 +- 3.6176e+1  0  9.1907e+7
  20  top  1   2   2    1024     2352    310     620  1.7516e+3  1.6635e+3  1.6226e+3 +- 4.1720e+1  0  7.3217e+8
  20  low  1   2   2     512     2352    310     620  4.7756e+5  4.5954e+5  4.5061e+5 +- 7.9240e+3  1.0883e+4  1.7703e+10
  22  top  2   2   2     955     5113    580    1160  1.1513e+4  1.1286e+4  1.1094e+4 +- 1.5851e+2  0  1.1386e+9
  22  top  2   1   2     955     5113    580     580  1.0201e+4  9.7556e+3  1.0217e+4 +- 1.7055e+2  0  5.7571e+8
  22  top  1   2   2    1910     5113    580    1160  6.9926e+3  6.6882e+3  6.5697e+3 +- 1.8351e+2  0  4.5936e+9
  22  low  1   2   2     955     5113    580    1160  2.2462e+6  2.3044e+6  2.2094e+6 +- 2.7588e+4  4.2780e+4  1.3526e+11
  24  top  2   3   2    1782    11113   1086    3258  4.0971e+4  4.1335e+4  4.0167e+4 +- 2.8406e+2  0  9.6319e+9
  24  top  2   1   2    1782    11113   1086    1086  4.2035e+4  4.1403e+4  4.1928e+4 +- 2.6285e+2  0  3.6114e+9
  24  top  1   3   2    3564    11113   1086    3258  2.5025e+4  2.3886e+4  2.3995e+4 +- 3.9785e+2  0  4.9396e+10
  24  low  1   3   2    1782    11113   1086    3258  4.7417e+6  4.9622e+6  4.7228e+6 +- 3.6470e+4  7.5531e+4  1.3409e+12
  26  top  2   3   2    3326    24154   2019    6057  1.6409e+5  1.6684e+5  1.6067e+5 +- 1.2699e+3  0  6.1991e+10
  26  top  2   1   2    3326    24154   2019    2019  1.6576e+5  1.6211e+5  1.6486e+5 +- 6.1213e+2  0  2.2667e+10
  26  top  1   3   2    6652    24154   2019    6057  9.8117e+4  9.7491e+4  9.7055e+4 +- 5.2774e+2  0  3.1865e+11
  26  low  1   3   2    3326    24154   2019    6057  2.2656e+7  2.3198e+7  2.2418e+7 +- 9.9463e+4  3.1060e+5  9.9968e+12
  28  top  2   3   2    6208    52498   3772   11316  6.5649e+5  6.6411e+5  6.4439e+5 +- 2.5795e+3  0  3.9904e+11
  28  top  2   1   2    6208    52498   3772    3772  6.4971e+5  6.5000e+5  6.5260e+5 +- 4.8264e+3  0  1.4232e+11
  28  top  1   3   2   12416    52498   3772   11316  3.9324e+5  3.9245e+5  3.8809e+5 +- 2.2935e+3  0  2.0558e+12
  28  low  1   3   2    6208    52498   3772   11316  1.0817e+8  1.0971e+8  1.0632e+8 +- 5.5324e+5  1.2878e+6  7.3804e+13
  30  top  2   3   2   11585   114104   7045   21135  2.6265e+6  2.6425e+6  2.5895e+6 +- 9.2785e+3  0  2.5676e+12
  30  top  2   1   2   11585   114104   7045    7045  2.5865e+6  2.5943e+6  2.5860e+6 +- 4.9483e+3  0  8.9366e+11
  30  top  1   3   2   23170   114104   7045   21135  1.5830e+6  1.5714e+6  1.5512e+6 +- 3.9659e+3  0  1.3258e+13
  30  low  1   3   2   11585   114104   7045   21135  5.0683e+8  5.1466e+8  4.9943e+8 +- 9.6734e+5  5.2910e+6  5.3984e+14

TABLE 2 — X_small of (21) and the four ordered-pair classes as shares of Mfrak (actual coefficient A1)
   j  box  g   A  J0   X_small(A1)  X_small(|A1|)  mean|X_small(rnd)|   rms(rnd)  rank  |Xs|/Mfrak   R=0 share   periods   j>J0 share  sieve cancel
  18  top  2   2   1  1.2476e+1  -2.7383e+1     1.7663e+1  2.2758e+1   5/9     1.70%    97.66%  0 (empty)      0.64%  223.3x
  18  top  2   1   1  5.9706e+0  -2.0867e+1     1.7869e+1  2.2632e+1   2/9     0.93%    99.62%  0 (empty)     -0.54%  419.4x
  18  top  1   2   1  CLASS EMPTY (0 ordered pairs with j<=J0)                                          0.00%    96.08%  0 (empty)      3.92%  -
  18  low  1   2   1  -2.6841e+3  -2.1502e+3     1.7930e+3  2.0180e+3   7/9     2.88%   101.35%  0 (empty)      1.53%  137.1x
  20  top  2   2   2  -5.6170e+1  -3.1269e+0     4.9625e+1  6.8690e+1   7/9     1.97%   100.72%  0 (empty)      1.25%  176.3x
  20  top  2   1   2  -6.2734e+1  1.2603e+1     3.2602e+1  3.8338e+1   8/9     2.51%   102.58%  0 (empty)     -0.07%  140.1x
  20  top  1   2   2  -3.5223e+1  -9.7056e+1     3.8619e+1  4.5630e+1   5/9     2.01%   100.77%  0 (empty)      1.24%  222.3x
  20  low  1   2   2  8.9228e+3  -3.2127e+3     7.2101e+3  9.2315e+3   6/9     1.87%    98.10%  0 (empty)      0.04%  183.3x
  22  top  2   2   2  -8.7460e+1  -2.5726e+2     1.0290e+2  1.1652e+2   5/9     0.76%    99.99%  0 (empty)      0.77%  482.6x
  22  top  2   1   2  4.1716e+0  -3.3853e+2     1.2118e+2  1.3856e+2   1/9     0.04%   100.20%  0 (empty)     -0.24%  9005.0x
  22  top  1   2   2  -1.4487e+2  -3.2459e+2     1.6337e+2  2.0516e+2   6/9     2.07%   101.12%  0 (empty)      0.96%  229.1x
  22  low  1   2   2  -2.9883e+4  2.2984e+4     1.7080e+4  2.1191e+4   8/9     1.33%   101.42%  0 (empty)     -0.09%  278.8x
  24  top  2   3   2  2.1394e+2  6.1840e+2     2.2236e+2  2.4632e+2   6/9     0.52%    99.49%  0 (empty)     -0.02%  736.4x
  24  top  2   1   2  -7.0618e+0  -3.7162e+2     2.3043e+2  2.5233e+2   1/9     0.02%    99.57%  0 (empty)      0.44%  22937.6x
  24  top  1   3   2  4.9533e+2  -7.3278e+2     2.3957e+2  2.8023e+2   8/9     1.98%    97.82%  0 (empty)      0.20%  252.7x
  24  low  1   3   2  -1.7659e+4  1.9170e+5     1.9369e+4  2.3995e+4   6/9     0.37%   100.44%  0 (empty)     -0.06%  1048.6x
  26  top  2   3   2  6.9576e+2  3.8908e+3     8.5581e+2  1.0362e+3   5/9     0.42%    99.63%  0 (empty)     -0.05%  952.5x
  26  top  2   1   2  1.1776e+3  -3.1025e+3     6.0521e+2  7.4798e+2   8/9     0.71%    99.75%  0 (empty)     -0.46%  569.6x
  26  top  1   3   2  1.9849e+1  -6.1772e+2     6.2540e+2  7.1588e+2   1/9     0.02%    99.90%  0 (empty)      0.08%  26201.6x
  26  low  1   3   2  1.2276e+4  6.0113e+5     1.0617e+5  1.4022e+5   2/9     0.05%   100.34%  0 (empty)     -0.40%  7549.5x
  28  top  2   3   2  5.1793e+2  4.7708e+3     1.8142e+3  2.1933e+3   3/9     0.08%    99.96%  0 (empty)     -0.04%  5383.8x
  28  top  2   1   2  -4.0222e+3  -2.8246e+3     3.3869e+3  4.3404e+3   7/9     0.62%   100.52%  0 (empty)      0.10%  690.7x
  28  top  1   3   2  -6.3190e+2  -3.6992e+3     1.4288e+3  1.7076e+3   4/9     0.16%   100.13%  0 (empty)      0.03%  3476.8x
  28  low  1   3   2  6.1727e+5  1.7666e+6     3.9718e+5  4.5860e+5   7/9     0.57%    99.52%  0 (empty)     -0.09%  747.0x
  30  top  2   3   2  -1.1644e+4  5.1029e+3     7.5491e+3  8.5113e+3   8/9     0.44%   100.35%  0 (empty)      0.09%  1005.5x
  30  top  2   1   2  3.0114e+3  1.3199e+4     4.6759e+3  5.2863e+3   3/9     0.12%    99.86%  0 (empty)      0.03%  3819.9x
  30  top  1   3   2  2.2917e+3  -1.1430e+4     3.3113e+3  4.3940e+3   5/9     0.14%    99.88%  0 (empty)     -0.02%  4028.0x
  30  low  1   3   2  4.5448e+5  9.2797e+6     7.5063e+5  1.1253e+6   5/9     0.09%    99.71%  0 (empty)      0.20%  4986.1x
  rank = position of |X_small(actual)| among itself and the 8 seeded draws, smallest first; 1/9 would mean the actual coefficient is the most cancelled of the nine
  worst-case double-rounding floor over these rows, relative to |X_small|: 2.48e-7

TABLE 3 — exponent fits and the pre-registered falsifier (primary fit: the points sharing one J0)
  top box, g=2, band A~x^(3/50); fit over j=20,22,24,26,28,30 (n=6 scales, J0=2)
    d log2 Mfrak / d log2 x:  actual 0.982   |b| 0.984   random 0.984 +- 0.004   budget 1.388   generic N^3 exponent 1.500
    d log2 |X_small| / d log2 x:  actual 0.684   random 0.741 +- 0.174   ((21) needs an exponent below 36/25 = 1.440)
    FALSIFIER, slope of log2(actual/random) per draw:  Mfrak -0.0024 +- 0.0035   X_small -0.0570 +- 0.1741
    ratio actual/random   Mfrak: 1.027 1.038 1.020 1.021 1.019 1.014
    ratio actual/random   |X_small|: 1.132 0.850 0.962 0.813 0.285 1.542
    ratio actual/|b|      Mfrak: 0.995 1.020 0.991 0.984 0.989 0.994   |X_small|: 17.963 0.340 0.346 0.179 0.109 2.282
    VERDICT: mean slope + sd >= 0 — NO heuristic support for Mobius-sign cancellation in the small-j kernel here
  top box, g=2, band A=1; fit over j=20,22,24,26,28,30 (n=6 scales, J0=2)
    d log2 Mfrak / d log2 x:  actual 1.001   |b| 1.001   random 0.998 +- 0.002   budget 1.325   generic N^3 exponent 1.500
    d log2 |X_small| / d log2 x:  actual 0.929   random 0.720 +- 0.207   ((21) needs an exponent below 36/25 = 1.440)
    FALSIFIER, slope of log2(actual/random) per draw:  Mfrak 0.0022 +- 0.0021   X_small 0.2088 +- 0.2072
    ratio actual/random   Mfrak: 0.977 0.998 1.003 1.005 0.996 1.000
    ratio actual/random   |X_small|: 1.924 0.034 0.031 1.946 1.188 0.644
    ratio actual/|b|      Mfrak: 0.975 1.046 1.015 1.023 1.000 0.997   |X_small|: 4.978 0.012 0.019 0.380 1.424 0.228
    VERDICT: mean slope + sd >= 0 — NO heuristic support for Mobius-sign cancellation in the small-j kernel here
  top box, g=1, band A~x^(3/50); fit over j=20,22,24,26,28,30 (n=6 scales, J0=2)
    d log2 Mfrak / d log2 x:  actual 0.979   |b| 0.987   random 0.988 +- 0.004   budget 1.426   generic N^3 exponent 1.500
    d log2 |X_small| / d log2 x:  actual 0.455   random 0.599 +- 0.224   ((21) needs an exponent below 36/25 = 1.440)
    FALSIFIER, slope of log2(actual/random) per draw:  Mfrak -0.0095 +- 0.0038   X_small -0.1443 +- 0.2237
    ratio actual/random   Mfrak: 1.080 1.064 1.043 1.011 1.013 1.021
    ratio actual/random   |X_small|: 0.912 0.887 2.068 0.032 0.442 0.692
    ratio actual/|b|      Mfrak: 1.053 1.046 1.048 1.006 1.002 1.007   |X_small|: 0.363 0.446 0.676 0.032 0.171 0.200
    VERDICT: mean slope + sd >= 0 — NO heuristic support for Mobius-sign cancellation in the small-j kernel here
  low box, g=1, band A~x^(3/50); fit over j=20,22,24,26,28,30 (n=6 scales, J0=2)
    d log2 Mfrak / d log2 x:  actual 0.990   |b| 0.994   random 0.994 +- 0.002   budget 1.495   generic N^3 exponent 1.500
    d log2 |X_small| / d log2 x:  actual 0.585   random 0.666 +- 0.302   ((21) needs an exponent below 36/25 = 1.440)
    FALSIFIER, slope of log2(actual/random) per draw:  Mfrak -0.0043 +- 0.0019   X_small -0.0813 +- 0.3024
    ratio actual/random   Mfrak: 1.060 1.017 1.004 1.011 1.017 1.015
    ratio actual/random   |X_small|: 1.238 1.750 0.912 0.116 1.554 0.605
    ratio actual/|b|      Mfrak: 1.039 0.975 0.956 0.977 0.986 0.985   |X_small|: 2.777 1.300 0.092 0.020 0.349 0.049
    VERDICT: mean slope + sd >= 0 — NO heuristic support for Mobius-sign cancellation in the small-j kernel here

TABLE 4 — descriptive aggregate over every configuration with a nonempty small-j class
  (post-hoc summary added after the pre-registered fit in TABLE 3; it is not the pre-registered test)
  configurations n = 27 (7 dyadic scales x 4 boxes, minus the empty-class row at j=18)
  mean rank of |X_small(actual)| among the nine values: 5.15   null expectation 5.00, null sd of this mean 0.50
  configurations with |X_small(actual)| below the median of its 8 draws: 12 of 27 (null expectation 13.5)
  geometric mean of |X_small(actual)| / mean|X_small(random)|: 0.604
  geometric mean of |X_small(actual)| / |X_small(|b|)|: 0.316
  geometric mean of Mfrak(actual) / mean Mfrak(random): 1.0213; 3 of 27 configurations below

artifact: kernel-sign-control.json (7 dyadic scales, 28 configurations, 8 seeded draws each)
MEASURED ONLY: no power saving, no asymptotic rate and no twin margin follows; (21) and the global margin remain OPEN
```
<!--/BLOCK-->

## 3. Limitations

Lead with these; they are larger than the result.

1. **The reachable regime is not the regime (21) is about.** The moment grows
   like x^0.98 to x^1.00 here and is 97.66% to 102.58% equal-frequency class.
   X_small carries 0.02% to 2.88% of it. The Weil term N³ that sets the 3/2
   budget is nowhere near dominant at these sizes, so a sign effect inside it
   would be measured against a diagonal a hundred times larger.
2. **J0 = floor(x^(1/20)) is 2 across the whole feasible range** (and 1 at
   j=18, where the g=1 top box's small-j class is empty because that box's
   support is entirely even). "Small common divisor" is literally "gcd 1 or 2"
   here, not a band.
3. **Z = floor(x^(1/20)) is also 2**, so the prime-power sector of (13) has one
   prime power. The top-box coefficient collapses to -mu(ell/2)\*log 2 and the
   low-box coefficient to -mu(ell)\*log ell. Repeated primes and multiple r
   values, which (13) admits and the derivation must handle, are not exercised.
   Reaching floor(x^(1/20)) >= 3 needs x >= 2^60, far outside this engine.
4. **One box, one orientation, one twist.** (delta,nu) = (8/25,9/20) only;
   native orientation and sigma = -1 only; s = 0 only, so no divisor twist;
   two harmonic bands rather than the full logarithmic stack; T = 4\*round
   (x^(3/50)) rather than the derivation's ceil(x^(2tau)max(1,MN/x)). The one
   endpoint sensitivity run moved Mfrak from 1.1513e+4 to 3.5937e+3.
5. **Eight draws.** In almost every row the spread of |X_small| across draws is
   comparable to |X_small| itself, so a single row carries little power; the
   aggregate rank is the strongest available reading and it sits at the null.
6. **Finite scaling never proves an asymptotic power saving**, and it never
   disproves one. Six or seven dyadic points spanning a factor of 64 in x
   cannot separate x^1.44 from x^1.50.

## 4. What would change the reading

* A derivation. The only thing that settles (21) is a matched estimate with its
  coefficient interface, norms and error budget, as
  [RESEARCH-HANDOFF.md §6](RESEARCH-HANDOFF.md) specifies. This measurement
  cannot supply one and does not narrow the space of possible ones.
* A configuration where the nonzero off-diagonal actually dominates the finite
  moment. That needs the harmonic band A comparable to N, which the actual box
  does not give at reachable x; a synthetic box with A ~ N would measure a
  different object and would have to say so.
* More draws (say 64) rather than more x-scales: the spread across draws, not
  the number of scales, is what limits the current statistic.
* A finding that the sieve identity or an emptiness certificate is wrong. Both
  are checked here — the identity against literal enumeration, the certificates
  by exact inequality — but a defect in either would invalidate every class
  share above.

## 5. Validation

[kernel-sign-control.js](kernel-sign-control.js) is deterministic and seeded
(mulberry32, base 0x5EED0000, seed a fixed function of draw index, scale, g,
band and box), writes [kernel-sign-control.json](kernel-sign-control.json), and
carries an embedded output block bound to its own code hash. It checks the
Dirichlet identity sum_{d|n} f(d) = 1_{n<=J0} for every n <= 2N in every
configuration, agrees with literal ordered-pair enumeration on the moment, the
pair expansion, its reality, the R=0 class, the j<=J0 class and the j>J0 class
in four small configurations, and asserts the two emptiness certificates and
the (5) counting and majorant bounds in every production configuration. The
negative controls are asserted, not merely printed: an inert control aborts the
run. These checks certify their finite scope only.

The embedded tail carries a `forced` stamp dated 2026-09-06. The reason is
recorded here rather than left to guesswork: the first binding of this script,
made minutes earlier in the same session and never committed, predated TABLE 4.
Adding that descriptive aggregate changed the output, the embed guard refused
to replace a bound tail whose output had changed, and the re-bind used the
tool's documented override. The tool's own comparison reports 0 of 546 figures
in the replaced block not reproduced: no measured figure changed, only lines
were added.
