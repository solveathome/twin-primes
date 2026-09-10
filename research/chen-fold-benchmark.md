# Chen's theorem in fold coordinates: the long-interval benchmark

<!-- ledger
id: Q-chen-fold-benchmark
status: ANSWERED
todo: C
parity: Imports the classical linear sieve, Bombieri-Vinogradov for primes, and the distribution theorem for Chen's switched triple-product sequence. No new signed cancellation estimate is claimed.
question: Can the fold framework reproduce a classical Chen lower bound on long intervals with every imported hypothesis and error budget stated?
verdict: The classical implication is derived below using three explicitly imported theorem statements, with the combinatorial minorant proved and its integral margin certified by exact rational arithmetic. This is a benchmark, not a new prime theorem, and it does not prove twins or a short-zone result.
-->

Internal research note, 2026-09-05. This completes the benchmark at the level
of a proof **using named classical theorems**, not an independent proof of
those imported theorems. No novelty is claimed. The additional requirement
for twins is isolated in [chen-signed-target.md](chen-signed-target.md).

## 1. Coordinates and statement

Let x tend to infinity and set

$$
 I_x=[x/2,x-2]\cap\mathbb Z,\qquad
 z=x^{1/8},\quad r=x^{1/3},\quad P_{<z}=\prod_{q<z}q,
 \quad\chi_z(m)=1_{(m,P_{<z})=1}.
$$

All q and p variables designated as factors below are prime. Endpoints are
literal: factors equal to z survive; factors equal to r are in the small
factor sum. The tile is the wheel for primes **strictly below z**, matching
the classical sieve convention rather than silently replacing it by z#.

For a prime opener n in I_x, n already survives these folds. Thus
$\chi_z(n+2)$ is its exact twin-slot survival indicator at this depth.
Multiplying by $\Lambda(n)$ introduces proper prime powers as well; we
bound their contribution below. The sequence is anchored on I_x, whose length
is asymptotic to x/2. No averaging over phases and no uniform bound on G₂ is
used. This interval is not a short stretch between consecutive prime squares.

**Classical benchmark.** There is c>0 such that, for all sufficiently large x,

$$
 \#\{p\in I_x:p\text{ prime},\ \Omega(p+2)\le2,
                    \ \chi_z(p+2)=1\}\ge c\,x/(\log x)^2.                 \tag{B}
$$

Here Ω counts factors with multiplicity, so a prime square is permitted.

## 2. Exact fold weight

For $x^{2/3}<m\le x$, define

$$
 k_x(m)=\sum_{q\le r}1_{q\mid m},\qquad
 e_x(m)=\sum_{q\le r}1_{q^2\mid m},\qquad
 b_x(m)=\sum_{q_1\le r<q_2\le q_3}1_{m=q_1q_2q_3},
$$
$$
 W_x(m)=1-\tfrac12 k_x(m)-\tfrac12 b_x(m)-\tfrac12 e_x(m).
                                                                    \tag{1}
$$

The k sum counts distinct divisors, not Ω. In fold language it records which
later prime folds kill a surviving partner. The b term retains a specified
three-factor configuration; the e term handles repeated factors.

**Elementary lemma.** $W_x(m)\le1_{\Omega(m)\le2}$.

Proof. If Ω≤2, W≤1 suffices. Suppose Ω≥3. At least one factor is ≤r,
since three factors greater than r have product greater than x. Two distinct
such factors give k≥2 and W≤0. With exactly one small prime q, either q²|m
and k+e≥2, or q occurs once. In the latter case the remaining factors are
greater than r; there are exactly two, since three would exceed the product
budget. Then k=b=1 and again W=0. This covers all multiplicities. ∎

For sufficiently large x, m=n+2 with n∈I_x satisfies the lemma's range. Put

$$
 Q(x)=\sum_{n\in I_x}\Lambda(n)\chi_z(n+2)W_x(n+2)
      =A_1-\tfrac12 A_2-\tfrac12 A_3-\tfrac12 E_\square,              \tag{2}
$$

where A₁ is the same sum with W replaced by 1, A₂ by k, A₃ by b, and
$E_\square$ by e. In particular A₂ is the sum of the restricted terms
$A_{2,q}$ for z≤q≤r. All four A/E sequences are nonnegative; W itself
need not be. On rough m≤x, Ω(m)≤8 and |W(m)|≤3.

The square error has an elementary bound:

$$
 E_\square\le\log x\sum_{z\le q\le r}(x/q^2+1)
 \ll x\log x/z+r\log x=o(x/\log x).                                 \tag{3}
$$

## 3. Imported arithmetic: exact interfaces

The linear sieve is used in its standard dimension-one form: for a finite
nonnegative sequence of mass parameter M with squarefree divisor sums
$g(d)M+\rho_d$, its lower and upper main terms are Mf(s)V and MF(s)V,
up to arbitrarily small fixed relative coefficient errors and
$O(\sum_{d\le D}\mu^2(d)|\rho_d|)$. Here

$$
 g(2)=0,\quad g(q)=1/(q-1)\ (q>2),\quad
 f(s)=2e^\gamma\log(s-1)/s\ (2\le s\le4),\quad
 F(s)=2e^\gamma/s\ (1<s\le3).                                       \tag{4}
$$

These are imported theorem statements, not consequences of the fold census.
The source is [Tao, Supplement 5, Theorem 2](https://terrytao.wordpress.com/2015/01/29/254a-supplement-5-the-linear-sieve-and-chens-theorem-optional/).

Source qualification from the [switching audit](switching-negative-mass.md):
Tao's comment of 5 April 2020 identifies a gap in the post's proof and
refers to *Opera de Cribro*, Theorem 11.12. The classical theorem is
still the imported input; we do not treat that blog proof as verified.
A published statement checked here is
[Matomäki--Zuniga Alterman, Lemma 2.5](https://arxiv.org/html/2405.19063v3#S2.SS3),
with its reference to *Opera de Cribro* (12.12)--(12.13).
Its density convention is g(d)/d, so replace its g(d) by d times
the g(d) in this note. All sequences being sieved here are nonnegative.

Fix 0<ε<1/48 and D=x^(1/2−ε). The following table specifies each application.

| term | sequence and excluded classes | mass and available distribution | sieve parameters |
|---|---|---|---|
| A₁ | $\Lambda(n)1_{I_x}(n)$; n≡−2 mod q | M=x/2; prime BV gives total remainder $O_\varepsilon(x\log^{-10}x)$ through D | sift at z; s=4−8ε lies in (2,4) |
| A₂,q | previous sequence times $1_{q\mid n+2}$, z≤q≤r | M=g(q)x/2; remainder at d is $\rho_{qd}$, with d dividing $P_{<z}$, hence (d,q)=1 | level D/q; s=4−8ε−log(q)/log(z) lies in (1,3) |
| A₃ after switching | $a_m=1_{[x/2+2,x]}(m)b_x(m)$; m≡2 mod q | M=$M_3=\sum_m a_m$; **imported switched-sequence BV** below | level D; sift at $\sigma=D^{1/(1+\varepsilon)}<\sqrt x$, s=1+ε |

Prime BV here is [Tao, Notes 3, Theorem 17](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/).
For odd d, −2 is a reduced class. For even d the main term is zero and
only powers of 2 can contribute, giving a total $O(D\log^2x)$ error.
The interval is obtained by subtracting two initial intervals; bounded
endpoint changes are harmless at this level. Fixed ε supplies the power
slack needed for every fixed logarithmic saving in BV.

The switched import is precisely

$$
 \sum_{m\equiv2\ (d)}a_m=g(d)M_3+\rho'_d,\qquad
 \sum_{d\le D}\mu^2(d)|\rho'_d|\ll_\varepsilon x\log^{-10}x.           \tag{5}
$$

This is [Tao, Supplement 5, Proposition 13](https://terrytao.wordpress.com/2015/01/29/254a-supplement-5-the-linear-sieve-and-chens-theorem-optional/),
with the same interval, factor ordering, z, r and D. It is a classical
convolution-distribution input. We import the proposition as a whole; we do
not assert that prime BV alone automatically applies to every product
sequence. No short-interval version or Liouville-weighted version is imported.

The density satisfies g(q)=1/q+O(q⁻²), 0≤g(q)≤1/2. Mertens gives

$$
 V(z)=\prod_{q<z}(1-g(q))
       \sim {2C_2e^{-\gamma}\over\log z},\qquad
 C_2=\prod_{q>2}\left(1-{1\over(q-1)^2}\right)>0.                    \tag{6}
$$

The factor 2 is from the omitted prime 2 in the Mertens product. This is a
dimension-one sieve on shifted **primes**, not the dimension-two sieve on
unrestricted openers used to bound G₂.

## 4. Bounds and the positive margin

Let $H=C_2x/(2\log z)=4C_2x/\log x$. Write oε(1) for errors tending to
zero with x at fixed ε. Substitution of (4)–(6) gives

$$
 A_1/H\ge\log3-O(\varepsilon)-o_\varepsilon(1),\qquad
 A_2/H\le\log6+O(\varepsilon)+o_\varepsilon(1).                     \tag{7}
$$

For the second bound, the remainder summed over q costs at most another
O(log x) factor, still negligible. Partial summation over the primes gives
the elementary integral

$$
 \int_1^{8/3}{dt\over t(4-t)}=\tfrac14\log6.
$$

Switching gives

$$
 A_3\le\log x\sum_m a_m\chi_{\sqrt x}(m-2)
             +O(\sqrt x\log^2x).
$$

The first sieve indicator is bounded above by $\chi_\sigma(m-2)$.
Equations (4)–(6) then bound its sum by
$(8C_2+O(\varepsilon)+o_\varepsilon(1))M_3/\log x
 +O_\varepsilon(x\log^{-10}x)$.

For fixed q₁,q₂ the remaining prime lies below U=x/(q₁q₂), above q₂ and
above U/2. Its count is at most $\pi(U)-\pi(U/2)\sim U/(2\log U)$,
uniformly since U≥x^(1/3) on the summation range. Two partial summations
therefore give

$$
 M_3\le(1+o(1)){x\over2\log x}J,\qquad
 J=\int_{1/8}^{1/3}\int_{1/3}^{(1-t)/2}
                  {dv\,dt\over tv(1-t-v)}
   =\int_{1/8}^{1/3}{\log(2-3t)\over t(1-t)}\,dt.                    \tag{8}
$$

Consequently $A_3/H\le J+O(\varepsilon)+o_\varepsilon(1)$. Combining
with (2), (3) and (7), and choosing ε small **before** taking x large,

$$
 \liminf_{x\to\infty}{Q(x)\log x\over x}
       \ge2C_2\bigl(\log(3/2)-J\bigr)>C_2/20.                       \tag{9}
$$

The last strict inequality has an exact certificate in
[chen-benchmark-validation.js](chen-benchmark-validation.js). Its proof is:
the integrand in (8) decreases on [1/8,1/3], because its nonnegative numerator
decreases and its positive denominator increases. Bound the integral by 128
left rectangles. At each rational node use

$$
 2\sum_{j=0}^{5}{w^{2j+1}\over2j+1}\le\log u
 \le2\sum_{j=0}^{5}{w^{2j+1}\over2j+1}
      +{2w^{13}\over13(1-w^2)},\quad w=(u-1)/(u+1).
$$

Exact BigInt fraction comparisons certify J<3/8 and log(3/2)>2/5,
hence the margin exceeds 1/40. This is a finite arithmetic certificate for
a fixed real constant, not empirical evidence for a prime asymptotic.

In particular, Q(x)≥c₀x/log x eventually, with c₀=C₂/40 a conservative
choice. The pointwise lemma bounds Q by the weighted Chen count. Proper
prime powers among n≤x contribute at most O(√x log²x). Removing them and
using log p≤log x proves (B), for example with c=C₂/80 after increasing the
unspecified threshold. No effective numerical starting x is claimed.

## 5. What has been completed

The arithmetic interfaces, factor multiplicities, switching direction, sieve
levels, numerical sign and negligible errors are explicit. The validator
also checks both minorants and the signed cofactor identity on finite integer
intervals. Its output is formally embedded by `research/qc/embed.js`.

This is a successful translation of a classical argument into the research
coordinates. It establishes no improvement to Chen, no uniform zone theorem,
and no new estimate of Liouville on shifted primes. The existing short-zone
and covariance experiments are not rerun. The next note identifies exactly
where additional arithmetic would enter.
