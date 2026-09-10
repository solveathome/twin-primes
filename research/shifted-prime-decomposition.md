# Expanding the shifted prime: controlled small divisors and a coupled Möbius sum

<!-- ledger
id: Q-shifted-prime-decomposition
status: ANSWERED
todo: C
parity: Ordinary Mobius BV controls the second Vaughan Type I terms through moduli x^(1/10), including nonprimitive congruences after an explicit parity reduction. The remaining determinant-2 sum couples two Mobius factors with beta cofactor weights; neither that signed sum nor its dyadic average is estimated here.
question: Does decomposing Lambda(dk-2) give a provable saving on any part of the actual shifted-prime sum, and what exact arithmetic remains outside the imported hypotheses?
verdict: Both second Type I terms are O_H(x/log^H x) by classical Mobius BV. The residual is an explicit weighted sum over dk-ev=2, equivalently an average of two-linear-form Mobius correlations with growing coefficients and possibly one-point intervals. Its required one-sided improvement is OPEN. No twin lower bound or novelty is claimed.
-->

Internal continuation, 2026-09-05. **The twin-prime estimate remains OPEN.**
The quantitative result here controls two pieces of a classical expansion;
it does not save anything on the whole remainder. This executes TODO C's
second-decomposition and modulus audit. Definitions and the positive payoff
are in [prime-detection-spec.md](prime-detection-spec.md); control of the
comparison term is in [polylog-fold-transfer.md](polylog-fold-transfer.md).
Exact finite checks are in [shifted-prime-validation.js](shifted-prime-validation.js).

## 1. Statement of the reduction

Keep J_x=(x/2,x]∩Z and U=V=⌊x^(6/25)⌋. For a cutoff W set
β_W(m)=Σ_{r|m,r>W}Λ(r), so 0≤β_W(m)≤log m and β_W(m)=0 when m≤W.
The previous notes establish, for every fixed H>0,

$$
 B(x)=\mathcal B(a)+O_H(x/\log^H x),\qquad
 \mathcal B(a)=\sum_{d>U,\ k>V\atop dk\in J_x}
                         \mu(d)\beta_V(k)\Lambda(dk-2),
 \qquad S(x)=C_2x+B(x)+O_H(x/\log^H x).                          \tag{1}
$$

Choose new cutoffs Y=Z=⌊x^(1/20)⌋. Define

$$
 R(x)=\sum_{d>U,\ k>V,\ e>Y,\ v>Z\atop dk-ev=2,\ dk\in J_x}
                \mu(d)\mu(e)\beta_V(k)\beta_Z(v).                \tag{2}
$$

**Derived using ordinary Möbius Bombieri–Vinogradov (BV):**

$$
 B(x)=R(x)+O_H(x/\log^H x)\quad\hbox{for every fixed }H>0,
 \qquad S(x)=C_2x+R(x)+O_H(x/\log^H x).                         \tag{3}
$$

All four variables in (2) are positive integers, and both strict cutoffs
and the shift 2 are retained. The rates in (1) and (3) hold for every
fixed H with constants depending on H; the rate bookkeeping is in
[endpoint-target-audit.md §1](endpoint-target-audit.md). H_B's sufficient bound transfers to R
using (3). The [endpoint target audit](endpoint-target-audit.md) also
derives a smaller logarithmic-margin consumer using the quantitative
error rates. The determinant relation is classical
arithmetic, not a new independence principle for folds.

## 2. What Möbius BV actually supplies

The imported theorem says that for each A>0 there is b_A>0 such that

$$
 \sum_{q\le T^{1/2}/(\log T)^{b_A}}
   \max_{(a,q)=1}\left|\sum_{m\le T\atop m\equiv a\pmod q}\mu(m)\right|
                   \ll_A T/\log^A T.                            \tag{4}
$$

There is no prime-density main term in this estimate. No published theorem
statement of (4) was located in the owning convention of
[SEARCH-CONVENTIONS.md §1](SEARCH-CONVENTIONS.md); the searched channels and
what each does contain are tabulated in
[mobius-bv-derivation.md §2](mobius-bv-derivation.md),
which then derives (4), with the maximum over y≤T added, from four numbered
results of Koukoulopoulos, *The Distribution of Prime Numbers*, AMS GSM 203
(2019): Corollary 13.4 (Siegel–Walfisz for μ), Theorem 26.2 (Type I),
Theorem 26.6 (the bilinear large sieve) and equation (26.3), together with
Vaughan's identity for μ. That derivation gives b_A=A+6 with an ineffective
constant. It is assembled here from published theorems and is not itself a
refereed theorem. A teaching statement of the same estimate, without the
maximum over y, is [Pierre Le Boudec, EPFL, Exercise Sheet III, Exercise 4,
p. 2 (2014)](https://wiki.epfl.ch/tan-tnt/documents/TNT%202014-2015/Sheet%203.pdf).
The estimate is imported, not reproved from scratch here.

We need interval endpoints in [T/2,T]. If q≤T^(1/2−δ), with a fixed δ>0,
(4) implies the same bound with a maximum over subintervals there. To see
this without importing a short-interval theorem, use a mesh of spacing
T/log^K T. Fixed-endpoint (4) applies at every mesh point, since each is
comparable to T and the fixed power margin absorbs its logarithmic losses.
There are O(log^K T) mesh points. At a single modulus the interpolation
cost is at most O(T/(q log^K T)+1), using |μ|≤1. Summed over q this is
O(T/log^(K−1)T+T^(1/2−δ)). Choose K large, then the exponent in (4) larger
still. Subtraction of two endpoints proves the interval version.

In (1), fix k and put T=x/k. A nonempty d interval is

$$
                 D_k=(\max(U,T/2),T],\qquad T>U.                \tag{5}
$$

In particular T≫x^(6/25), whereas every second Type I divisor satisfies
q≤YZ≤x^(1/10). The smallest square-root scale is x^(3/25); the margin in
exponents is 3/25−1/10=1/50. For example q≤T^(1/2−1/24) for sufficiently
large x, including when T is replaced by T/2. Thus (4), with any desired
fixed logarithmic exponent, applies uniformly throughout (5). This is an
average over introduced divisors, not a BV estimate at arbitrary moduli.
Any equal inner cutoff exponent α with 0<α<3/50 fits this same budget;
1/20 is a convenient interior choice, not an optimized threshold for all
possible decompositions.

## 3. Nonprimitive congruences are retained

For a divisor ℓ, the congruence kd≡2 (mod ℓ) need not be primitive in d.
Put g=gcd(k,ℓ). The following exact reductions cover every case.

| condition | reduction |
|---|---|
| g does not divide 2 | no solutions |
| g=2 | d≡(k/2)⁻¹ (mod ℓ/2), a primitive class |
| g=1 and ℓ odd | d≡2k⁻¹ (mod ℓ), a primitive class |
| g=1 and ℓ=2f even | k is odd and d=2h; kh≡1 (mod f), with μ(2h)=−μ(h)·1_(h odd) |

In the last row, if f is even its primitive class already forces h odd;
use modulus f. If f is odd, take its unique odd lift modulo 2f=ℓ. That is
again a primitive class. The interval for h is D_k/2. This also covers
ℓ=2; modulus 1 uses its unique residue class as usual.

For fixed k each reduced modulus occurs with bounded multiplicity as ℓ
varies: it comes from ℓ=q or ℓ=2q, in intervals for d or h. Consequently,
the interval form of (4) gives, uniformly in the relevant k,

$$
 \sum_{\ell\le YZ}\max_{I\subseteq D_k\text{ interval}}
       \left|\sum_{d\in I\atop kd\equiv2\pmod\ell}\mu(d)\right|
                         \ll_A {T\over\log^A x}.                \tag{6}
$$

No term with an even variable has been silently discarded. Coprimality
alone would not justify (6); the parity reduction supplies what is missing.

## 4. The exact second identity and its estimated pieces

For t=dk−2∈(x/2−2,x−2], the small initial term Λ_{≤Z}(t) in Vaughan's
identity vanishes for large x. With

$$
 c_{Y,Z}(\ell)=\sum_{ab=\ell\atop a\le Y,\ b\le Z}\mu(a)\Lambda(b),
 \qquad |c_{Y,Z}(\ell)|\le\log\ell,
$$

the identity is

$$
 \Lambda(t)=
 \sum_{e\le Y,\ e\mid t}\mu(e)\log(t/e)
 -\sum_{\ell\le YZ,\ \ell\mid t}c_{Y,Z}(\ell)
 +\sum_{e>Y,\ v>Z,\ ev=t}\mu(e)\beta_Z(v).                    \tag{7}
$$

This is the same classical identity already derived in the input note,
applied at different cutoffs. Substitution into (1) gives exactly
𝓑(a)=P₁−P₂+R, where

$$
 \begin{split}
 P_1&=\sum_{k>V}\beta_V(k)\sum_{e\le Y}\mu(e)
       \sum_{d\in D_k\atop kd\equiv2\pmod e}
                  \mu(d)\log((dk-2)/e),\\
 P_2&=\sum_{k>V}\beta_V(k)\sum_{\ell\le YZ}c_{Y,Z}(\ell)
       \sum_{d\in D_k\atop kd\equiv2\pmod\ell}\mu(d).
 \end{split}                                                    \tag{8}
$$

The k sums end at k<x/U; outside that range D_k is empty. In P₁ the log
weight has size O(log x) and total variation O(1) on D_k, since its
derivative is k/(kd−2) and d stays in a dyadic interval. Partial summation
and (6) therefore bound the inner e sum by O_A(T log x/log^A x).
The coefficient bound for c gives the same bound for P₂. Finally

$$
 \sum_{V<k<x/U}\beta_V(k)\,{x\over k}\ll x\log^2x,
 \qquad |P_1|+|P_2|\ll_A x\log^{3-A}x.                          \tag{9}
$$

Taking A>H+3 proves (3). The saving in (9) applies to the complete signed
Type I pieces after summing their divisors. It does not assert each prime
or each residue-class contribution is small.

## 5. The residual is a joint correlation, not two separate means

The remaining ranges include e up to (x−2)/(Z+1), approximately x^(19/20),
far beyond the divisor range just handled. There is a second difficulty
even where e is small: for fixed k,e the remaining d progression carries
β_Z((kd−2)/e). That arithmetic weight is not covered by (4), and its total
variation has not been bounded by a fixed logarithmic power. Replacing it
by its maximum inside a signed sum is invalid. Ordinary BV for μ(e) or μ(d)
separately therefore does not complete (2).

A useful exact reparametrization exposes the correlation. Fix k,v, and set
g=gcd(k,v). If g does not divide 2 there are no solutions. Otherwise choose
the unique d₀ in [0,v/g) with

$$
 (k/g)d_0\equiv2/g\pmod{v/g},\qquad e_0=(kd_0-2)/v.
$$

All integer solutions are

$$
         d=d_0+(v/g)j,\qquad e=e_0+(k/g)j.                      \tag{10}
$$

Let I_{k,v} be the real interval cut out by d>U, e>Y and x/2<kd≤x in
(10). With k>V and v>Z fixed, it follows that

$$
 R(x)=\sum_{k>V,\ v>Z\atop(k,v)\mid2}\beta_V(k)\beta_Z(v)
       \sum_{j\in I_{k,v}\cap\mathbb Z}
          \mu(d_0+(v/g)j)\mu(e_0+(k/g)j).                      \tag{11}
$$

The inner interval has length at most xg/(2kv), hence contains at most
⌊xg/(2kv)⌋+1 integers. In particular kv>x allows at most one integer.
The coefficients k/g and v/g grow with x; their linear-form determinant
is −2/g. Formula (11) is not a family of fixed-coefficient correlations
over uniformly long intervals. Both its cofactor average and its weights
must be used if this representation is to help. Taking absolute values
fiber by fiber is a substantially stronger requirement than the needed
one-sided estimate, and no saving from doing so is established here.

The related literature must be read with those parameters retained.
[Tao, logarithmically averaged Chowla/Elliott, Theorems 1.2–1.3](https://arxiv.org/html/1509.05422)
addresses fixed linear forms with a logarithmic average over a growing
range; its nonasymptotic version has a threshold depending on those
coefficients. It does not state the uniform growing-coefficient, clipped-interval,
β-weighted estimate in (11). [Matomäki–Radziwiłł–Tao, averaged Chowla](https://arxiv.org/abs/1503.05121)
averages additive shifts over a box. Our inverse-residue parametrization
and determinant constraint do not supply that shift average. These are
specific mismatches with those theorems, not a survey claiming that every
later correlation method fails, or a refutation of using their ideas.

## 6. A scale average is also an admissible proof target

The desired estimate does not have to hold separately at every x. Fix
η∈(0,1), x_j=2^j, and a fixed j₀ large enough for the reductions above.
Write L=J−j₀+1. The following condition is sufficient, and **OPEN**:

$$
 \limsup_{J\to\infty}{1\over L}
         \sum_{j=j_0}^J {R(2^j)\over2^j}
                              \ge -(1-\eta)C_2.                \tag{12}
$$

Indeed (3) gives a limsup of the same average of S(2^j)/2^j at least ηC₂.
The averaged o(1) error vanishes by elementary Cesàro averaging.
There must be infinitely many j with S(2^j)/2^j≥ηC₂/2; otherwise its
limsup average would be at most ηC₂/2. The prime-power error in the input
note then gives eventually on those scales

$$
                    N_2(2^j)\ge {\eta C_2\over4}
                                     {2^j\over\log^2(2^j)}.     \tag{13}
$$

Only elementary averaging is used in this implication. It relaxes an
every-scale estimate, but it is not logically weaker than every possible
subsequence condition and is still stronger than mere infinitude.
The cutoffs U,V,Y,Z change with j; a theorem with fixed linear forms does
not become applicable merely by putting an average around (11).

## 7. Checks and the next decision

The validator uses integer coefficients of log primes and ordered products
of those formal variables. It checks (7), its weighted contraction (8),
direct enumeration of dk−ev=2, and the parametrization (10) independently.
Parity reductions are checked pointwise, including moduli with powers of
2, and on clipped intervals. Both the prescribed power cutoffs and larger
test cutoffs are used, so that branches are exercised at finite sizes.
The exponent margin is checked with exact rational arithmetic.

Falsifiers are explicit: a missed gcd branch, unequal formal coefficients,
an endpoint mismatch, or a divisor level outside (4) would invalidate the
corresponding reduction. Those finite algebra and exponent checks run in
the companion script; the written derivation supplies the uniform bound.
Neither the script nor the literature audit checks (12) or H_B.

The singleton audit is completed in
[singleton-fiber-audit.md](singleton-fiber-audit.md): both signs of that
family have ungrouped mass at least c*x*log(x) eventually. Its signed
difference and the longer-fiber sum remain open.
[signed-divisor-grouping.md](signed-divisor-grouping.md) now controls the
signed region de≤x^(7/10) and isolates the complementary CRT endpoint
sum. That note owns the next theorem audit, retaining (12) and the original
target. Recovered factors from [data-reuse-audit.md](data-reuse-audit.md)
have been used for the specified grouping test.
The expansion, small-divisor bounds and singleton partition are records
to consume, not tasks to repeat; no fixed-coefficient Chowla statement can
be substituted without the required transfer.
