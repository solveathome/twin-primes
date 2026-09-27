# Smooth sieve literature: existing results and the next signed question

<!-- ledger
id: Q-smooth-sieve-literature
status: PARTIAL
todo: C
parity: Primary-source matching of smooth sieve moments, quadratic optimality and shifted divisor correlations. A weakened smallest-prime majorant meets Henriot's corrected nonmultiplicative upper theorem and localizes the full absolute residual. Exact prime filters and prime-power errors are retained. Neither a signed lower margin nor a general parity obstruction is proved.
question: Which nearby published results should be imported instead of rediscovered, and do their methods give a more focused next question for the complete global remainder?
verdict: Existing sources supply the finite-difference mechanism, one-point concentration and quadratic profile optimization; shifted divisor-sum estimates admit fixed shift two under their own support and smoothness conditions. A derived application of corrected Henriot bounds gives small-prime mass O_sigma(delta^sigma x)+O_epsilon(x^(39/40+epsilon)), uniformly in delta for fixed 0<sigma<1. This permits approximation by bounded-factor configurations at fixed delta, but their joint signed estimate, usable constants and the twin margin remain open. Fixed delta alone cannot absorb a shrinking logarithmic margin. The unrestricted ordered-prime formula in GKM Lemma 10.5 is refuted without the symmetry used in its proof and subsequent application.
-->

**The sufficient twin-prime margin remains OPEN.** This is a bounded
source audit and one application of the matched upper-bound machinery,
not an originality claim. The source-informed priority is now to estimate
the signed contribution of specified factor configurations with a paid
tail. Further generic moment calculations or profile optimization must
name what they buy for that signed estimate.

Use the exact C3 profile, floors and notation of
[global-smooth-majorant.md](global-smooth-majorant.md):
T=log x, J_x=(x/2,x], L_i=log(b_i/a_i),
(a_L,b_L)=(floor(x^.22),floor(x^.24)),
(a_R,b_R)=(floor(x^.04),floor(x^.05)), W_i=b_i.
The complete identity is

\[
 S(x)=C_2x+\widehat{\mathcal R}(x)+O_A(x/\log^A x),\qquad
 \widehat{\mathcal R}(x)=\sum_{n\in J_x}
                 \widehat G_L(n)\widehat G_R(n-2).                 \tag{1}
\]

## 1. What the sources already do

| Source and inspected location | Reusable content | Limit for this campaign |
|---|---|---|
| Granville--Koukoulopoulos--Maynard (GKM), [v4](https://arxiv.org/html/1606.06781v4), section 1.2, Theorems 1.3--1.4 and 10.4, Lemma 10.3 | Finite differences; moment and small-prime concentration estimates; integral transfer between profiles | One-point even moments do not determine the signed shifted pair. Smoothness requirements depend on the moment. |
| Carneiro--Chirre--Helfgott--Mejia-Cordero (CCHM), [v6](https://arxiv.org/html/2005.03162v6), Theorem 1.2, Corollary 1.3 | Two-parameter quadratic main term and profile optimality | Optimizes the one-point quadratic form, not the full absolute pair or its sign. |
| Green--Tao, [Appendix D](https://arxiv.org/html/math/0606088), Lemma D.2, Theorem D.3 and proof | Smooth shifted divisor correlations; explicit sieve factors | Its divisor theorem allows infinite-complexity systems; its prime theorem does not thereby apply to twins. Smoothness and support must still match. |
| Goldston--Yildirim III, [section 8](https://arxiv.org/html/math/0209102), (8.1)--(8.10) | Different truncation levels, constants and product-of-levels error | The displayed theorem concerns truncated Lambda sums, not prime-filtered Ghat. Uniformity must be proved before integrating a family of cutoffs. |
| Henriot, [original](https://arxiv.org/html/1102.1643v1) and [2014 erratum](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/B0BD208D979495FE06B8192209E710EA/S0305004114000280a.pdf/nair-tenenbaum-uniform-with-respect-to-the-discriminant-erratum.pdf), corrected New Theorem 5 | Upper bound for a nonnegative function in a uniform growth class, without multiplicativity | Not a signed theorem or a sharp constant. New Theorem 6 has additional hypotheses. |

The source convention and lookup scope are recorded in
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md). Searches used smooth
sieve weights, smallest prime factors, shifted divisor correlations and
Nair--Tenenbaum bounds. This is not a complete citation-tree review.

## 2. Profile optimization already has an answer for the quadratic norm

Set h(t)=chi(1-t), D_1=a_i and D_2=b_i in CCHM. The source hypotheses
hold: h is absolutely continuous, constant outside [0,1], and h' has
bounded variation. Expanding the finite divisor sum and counting
multiples gives an O(b_i^2) error since |rhohat_i|<=1. Consequently,

\[
 \sum_{n\in J_x}\widehat F_i(n)^2
 =\frac{|J_x|}{L_i}\int_0^1|\chi'(t)|^2\,dt
       +O(x/L_i^2+b_i^2)
 =\frac{700|J_x|}{429L_i}+O(x/L_i^2+b_i^2).                    \tag{2}
\]

Here chi'(t)=-140t^3(1-t)^3, so the integral is
19600 B(7,7)=700/429. The
[validator](smooth-sieve-literature-validation.js) checks it separately
by polynomial integration and the factorial beta formula.

For every absolutely continuous transition with the same endpoint values,
integral |chi'|^2 >= |integral chi'|^2=1. The linear taper attains one.
Thus our C3 choice increases this norm's leading constant. Its purpose
was to enable a different shifted absolute estimate. Smoother does not
mean better under every objective, and the quadratic optimization problem
should not be reassigned without changed constraints or a changed objective.

Equation (2) concerns Fhat, not Ghat. It does not identify the implicit
constant of the Henriot majorant or compare that constant with C2.

## 3. GKM suggests localization, but its one-point bound is not enough

GKM Theorem 10.4(a) bounds the moment weighted by the number of small
prime factors; Theorem 1.4(a) gives the corresponding exceptional-set
bound. With the exact profile map in global-smooth-majorant section 7,
the C3 hypothesis admits second and fourth moments: 3>1 and 3>6/4.
It does not meet the general-profile sixth-moment condition 3>20/6.
The proof via Lemma 10.3 exposes bounded derivative norms, which stay
bounded for our family because log(b_i)/L_i stays bounded.

For 0<delta<.04, put eta_i=delta T/log b_i. At x^delta>=2,
the second-moment source bound reads

\[
 \sum_{\substack{n\le x\\P^-(n)\le x^\delta}}
       \widehat F_i(n)^2\ll \delta x/T.                       \tag{3}
\]

Applying Cauchy to (3) and the other side's full second moment only
gives O(sqrt(delta) x/T) for the absolute Fhat pair. Multiplication by
the two rough-part logarithms then gives O(sqrt(delta) x T).
That calculation loses a logarithm relative to the required scale.
It is not the shifted localization result below.

### 3.1. A symmetry condition needed when reusing the prime integrals

GKM Lemma 10.5 is stated for general C1 functions, but replaces an
ordered prime sum by 1/m! times a full-cube integral. The proof's
first equality needs permutation symmetry. This omission is present
in v4, pp. 68--69, and in the
[journal version, pp. 1158--1159](https://smf.emath.fr/system/files/filepdf/ens_ann-sc_54_1089-1177.pdf).

Here is an asymptotic counterexample to the unrestricted statement.
Take m=2 and the fixed bounded C1 function
g(t_1,t_2)=tanh(t_2-t_1), with y=exp(Y), z=exp(2Y).
The cube integral is zero by antisymmetry. Every ordered summand
is positive. Restrict p to (exp(Y),exp(5Y/4)] and q to
(exp(7Y/4),exp(2Y)]; then g(log p,log q)>=tanh(Y/2).
Mertens' prime harmonic asymptotic therefore gives a positive
liminf at least log(5/4)log(8/7) as Y tends to infinity.
The displayed lemma's error tends to zero, since g and its gradient
are bounded and both harmonic interval factors remain bounded.
Thus the unrestricted statement is false.

The paper's ensuing integrand g_m^(2k), built from all subset sums,
is symmetric. This defect does not invalidate that application or
the moment statements used above. For a weight that privileges the
smallest prime, retain the ordering, or establish an ordered-domain
integration formula with its own error; do not import the cube/m!
formula unchanged. Our harmonic proof in section 5 uses ordered
sums and inequalities and does not use Lemma 10.5.

## 4. What shifted divisor correlations do and do not reopen

Green--Tao Theorem D.3 requires that the affine forms are not rational
multiples. The forms n and n-2 qualify; only p=2 is exceptional.
The theorem explicitly does not require finite complexity. Lemma D.2
gives c_(f,1)=-f'(0) and c_(f,2)=integral_0^infinity |f'|^2.
Thus a smooth plateau at zero has zero first-order sieve factor.
This explains why cancellation in an unweighted short-divisor surrogate
can be classical even at a fixed shift.

A direct import for our exact C3 profile is not asserted. The theorem
uses smooth compactly supported functions and a sufficiently small
cutoff exponent. A compact extension on the negative axis is harmless
for positive divisors, but it does not turn C3 into C-infinity. The proof
uses rapid Fourier decay; replacing it by finite regularity requires
its own error check. Nor may a fixed exponent .24 be called sufficiently
small without examining the support calculation.

There is a useful changed support fact. Direct CRT expansion of pure
F_L^r F_R^s has a counting error O(b_L^r b_R^s), for fixed nonnegative
integers r,s and bounded divisor coefficients. Each compatible system
has one residue class modulo the lcm and hence an O(1) interval error.
For r=s=1 the exponent is .29; for r=s=2 it is .58. Both are below
one. The earlier transition calculation had a product above x.
Its failed raw-support import does not exclude these smaller objects.
This counting observation alone does not evaluate the main form.

For the earlier linear taper there is the exact identity

\[
 F_i^{\rm lin}(n)=\frac{\Lambda_{b_i}(n)-\Lambda_{a_i}(n)}{L_i},
 \qquad
 \Lambda_R(n)=\sum_{d\mid n}\mu(d)\log(R/d)_+.                  \tag{4}
\]

Goldston--Yildirim's unequal-level theorem is therefore the existing
tool for this surrogate. Its singleton constant C_1=1 makes the four
leading terms cancel for two distinct shifts and fixed exponents.
For our smoother profile, two integrations by parts give instead

\[
 \widehat F_i(n)=\frac1{L_i}\int_0^1
             \chi''(u)\Lambda_{a_i e^{L_i u}}(n)\,du,\qquad
 \int_0^1\chi''(u)\,du=0.                                    \tag{5}
\]

Indeed chi(v)=integral_0^1 chi''(u)(u-v)_+ du for v>=0; for v<0
the right side is one because integral chi''=0 and integral u chi''=1.
This also covers d=1 and both constant portions of the profile.

Uniform source errors on the compact exponent rectangles, interval
endpoints and floors must be handled before consuming (5). Even a
completed pure-F calculation omits H_L H_R and the prime exclusions.
Neither paper supplies those extra weights by allowing arbitrary
bounded multipliers. The actual signed Ghat consumer remains open.

## 5. A shifted small-prime bound from the matched upper theorem

This is a derived application, motivated by section 3. It changes the
majorant, not the profile or identity (1).

Fix 0<sigma<1; the resulting estimate is uniform for 0<delta<=1 as
x tends to infinity. List the distinct primes of m in increasing order and
write ell_j=min(1,log p_j/T), padding missing slots among the first
three with ones. Define

\[
 w_T(m)=2^{\omega(m)}\ell_1\ell_2\ell_3,\qquad
 v_{T,\sigma}(m)=2^{\omega(m)}
                         \ell_1^{1-\sigma}\ell_2\ell_3.       \tag{6}
\]

Both equal one at m=1, and are defined for all m, including primes
above x. We retain |Fhat_i(m)|<=C_i w_T(m) for m<=x.

**Uniform source class.** Adding prime factors can only decrease each
of the three ordered, padded ell coordinates. Their exponents in v
are positive. Hence, for coprime a,b,

\[
 v_{T,\sigma}(ab)\le 2^{\omega(a)}v_{T,\sigma}(b).
                                                                    \tag{7}
\]

The same bound holds for w. Thus both mixed two-variable weights
v(a)w(b) and w(a)v(b) belong to the same uniform
M_2(2,B_epsilon,epsilon) class used in global-smooth-majorant section 4.
The divisor bound supplies B_epsilon independently of T and delta.
Neither function is being called multiplicative.

**Bounded harmonic mass.** For every fixed b>0, partial summation of
the Mertens prime sum gives

\[
 \sum_{p\le z}\frac{(\log p)^b}{p-1}\ll_b(\log z)^b.           \tag{8}
\]

This pays the omega(m)=1 and 2 terms in sum_(m<=x) v(m)/m;
their normalization powers are T^(1-sigma) and T^(2-sigma).
For omega(m)>=3, fix its first three primes p<q<r, sum each
positive exponent by 1/(p-1), and sum all remaining prime factors
using the same positive Euler product as before. Their contribution is

\[
 \begin{aligned}
 &\frac8{T^{3-\sigma}}\sum_{p<q<r\le x}
  \frac{(\log p)^{1-\sigma}\log q\log r}
       {(p-1)(q-1)(r-1)}
  \prod_{r<\ell\le x}\left(1+\frac2{\ell-1}\right)\\
 &\ll T^{\sigma-1}\sum_{r\le x}
   \frac1{(r-1)\log r}
   \sum_{q<r}\frac{\log q}{q-1}
   \sum_{p<q}\frac{(\log p)^{1-\sigma}}{p-1}\\
 &\ll_\sigma T^{\sigma-1}
             \sum_{r\le x}\frac{(\log r)^{1-\sigma}}{r-1}
 \ll_\sigma 1.                                               \tag{9}
 \end{aligned}
\]

All p,q,r,ell here are primes. The two inner sums cost
O_sigma((log r)^(2-sigma)); (8) is applicable because 1-sigma>0.
This retains all additional factors and their powers, rather than
truncating them. Together with m=1 it proves sum v(m)/m=O_sigma(1).

**Shifted import.** Reuse Henriot's corrected New Theorem 5 with
X=Y=x/2, Q_1(t)=t, Q_2(t)=t-2, alpha=1/2, delta_source=1,
epsilon_source=1/1200. The polynomial-size and degree hypotheses,
fixed resultant and corrected density bound <=2/(ab) are unchanged.
The latter follows from the compatible congruences a|n, b|n-2,
whose density is gcd(a,b)/(ab), with gcd(a,b)|2.
Equations (7)--(9) and the harmonic bound for w therefore give

\[
 \sum_{n\in J_x}\bigl(v(n)w(n-2)+w(n)v(n-2)\bigr)
                                     \ll_\sigma x/T^2.       \tag{10}
\]

If P^-(m)<=x^delta, then w(m)=ell_1^sigma v(m)<=delta^sigma v(m).
Applying this on either side of the pair, with a union bound, yields

\[
 \sum_{\substack{n\in J_x\\P^-(n(n-2))\le x^\delta}}
          |\widehat F_L(n)\widehat F_R(n-2)|
                                  \ll_\sigma\delta^\sigma x/T^2.
                                                                    \tag{11}
\]

The constants are independent of delta. If x^delta<2, the set is
empty. The prime two, both possible marked sides, m=1 in the source
class, and squareful integers have all been accounted for.

The absolute exceptional-set proof of
[global-factor-signs.md](global-factor-signs.md) section 2 also bounds
the error on any subset. Since each H_i=log t_i is at most T and
dropping composite filters enlarges a nonnegative sum, it gives

\[
 \boxed{\displaystyle
 \sum_{\substack{n\in J_x\\P^-(n(n-2))\le x^\delta}}
       |\widehat G_L(n)\widehat G_R(n-2)|
 \ll_\sigma\delta^\sigma x
             +O_\epsilon(x^{39/40+\epsilon}).}                \tag{12}
\]

Fix epsilon<1/40. No signed improvement or explicit small constant is
inferred from (12). It is a localization of the existing absolute budget.

## 6. The remaining factor problem and the prime-filter trap

Let R_delta be the Ghat pair restricted to P^-(n(n-2))>x^delta.
For sigma fixed, (12) implies

\[
 |\widehat{\mathcal R}-R_\delta|
       \le K_\sigma\delta^\sigma x
                   +O_\epsilon(x^{39/40+\epsilon}).           \tag{13}
\]

At fixed delta, each remaining integer has Omega(n)<=1/delta,
counting multiplicity. Thus the full remainder can be approximated
to any fixed multiple of x by finitely many prime-factor types.
This is not a density theorem for those types: their prime variables
still satisfy the coupled equation n-(n-2)=2.

For delta<.04, primes in these configurations can still lie on both
sides of each a_i,b_i boundary. The ten-prime negative Fhat cell has
not disappeared. Its sign must be retained whenever its factors lie
above the new cutoff.

Removing prime exclusions is particularly dangerous here. Put
A_i(m)=Fhat_i(m)H_i(m) and P(m)=1_(m prime)log m. On the present
dyadic interval A_i(p)=log p for primes, so
C_i^comp=A_i-P exactly. Consequently

\[
 \begin{aligned}
 C_L^{\rm comp}(n)C_R^{\rm comp}(n-2)
  ={}&A_L(n)A_R(n-2)-P(n)A_R(n-2)\\
    &-P(n-2)A_L(n)+P(n)P(n-2).                              \tag{14}
 \end{aligned}
\]

The last term is the weighted twin count itself. Accounting for proper
prime powers converts it to S with the existing negligible correction.
Hence evaluating unfiltered surrogates and then treating all filter
terms as already known would assume the problem being investigated.
This is a specific algebraic warning, not a theorem excluding every
use of a filtered or signed sieve.

There is also an essential quantifier limit. A fixed delta gives a
fixed error K_sigma delta^sigma x. It cannot automatically absorb
cx/log^K x as x grows. A proof retaining only this error would need
a sufficient fixed linear surplus, or a uniform analysis with
delta=delta(x) shrinking, or a sharper signed estimate of the tail.
When delta shrinks the number of allowed prime factors grows.
We have neither a numerical K_sigma nor evidence that exhaustive
enumeration at a useful delta would be computationally practical.

## 7. Revised next step and conditions for reuse

The [executed switching match](switching-negative-mass.md) prices a
three-prime/rough-composite family using ordinary BV and the linear
sieve, including an upper bound for the excluded prime partners.
It derives liminf Nhat/(C2*x)>3/2. A negative-only upper bound below
C2*x is therefore refuted for the current cutoff exponents, including
the localized remainder at fixed delta<1/50. The next comparison
must retain positive mass; the net signed margin is still OPEN.

1. Keep (2), the source moment thresholds and the pure-divisor
   correlation formulas as imported background. Do not spend another
   attempt deriving their orders without a new signed consumer.
2. Use (13) to write the actual opposed-sign factor contribution,
   retaining the positive part and prime exclusions. Match each proposed
   estimate to classical Buchstab decomposition, switching or
   almost-prime sieve results before inventing a replacement. Read
   [chen-opportunity-audit.md](chen-opportunity-audit.md) first: finite
   factor count and a clipped weight were already insufficient there.
3. The next bounded output should be a matched comparison of positive
   and negative families, with its constant and complement budget.
   State which joint prime-factor density remains an open input.
   If the computed or derived bounds leave a deficit, record that
   scoped failure instead of enlarging an unvalidated computation.

For example, a fixed-delta estimate
R_delta >= (-C2+K_sigma delta^sigma+c)x for some c>0 would
suffice via (1), (13). It is stronger than necessary and is presently
OPEN. Merely restating it is not progress. PNT estimates for individual
prime variables do not supply the coupled factor density.

## 8. Source custody and validation

Read on 2026-09-06: the locations in section 1, GKM's section 10.3
proof and Green--Tao's Fourier/Euler-product argument in Appendix D.
This is not a claim to have independently re-proved all imported
theorems or read every section of every paper. The theorem pages and
their continuations were inspected as rendered PDFs as well as text.
The existing Henriot correction and source-class match were reused
and checked against the new weights in section 5.

| PDF | SHA-256 | Principal page locators checked |
|---|---|---|
| GKM v4 | 67feecce65ced4250aa046d6e0c36300744eb84358d21d53409a512d1649e34d | PDF pp. 9, 66--68; source equations (1.6)--(1.7), Theorems 1.4, 10.4 |
| GKM published version | 287f0f9953370ff5dc874217babdd6679619951bc005ab4c95fb84425a94765d | Printed pp. 1158--1160, PDF pp. 72--74; symmetry check for Lemma 10.5 and its application |
| CCHM v6 | 0bd3729efe1c89edf14c1ca22240af8362d6375397505cbcbb557dfe296eb309 | PDF pp. 4--5, Theorem 1.2 and Corollary 1.3 |
| Green--Tao published PDF | ec126f9c9e189cc0308b83fb4f9f93c29a47d11ad875391aff4ce4c42aef1001 | Printed pp. 1828--1835, PDF pp. 78--85 |
| Goldston--Yildirim III | 6be1422119bf78f43ea265da70bc73ce6b952ca07560f80b5105d96a81eca66f | PDF pp. 30--31, section 8 |
| Henriot erratum | bd56f8f411457549c5cc53f9b24bbdec68544dca09cfe0836e35cc1b25677d6f | Printed pp. 375, 377; custody in global-smooth-majorant section 4 |

[smooth-sieve-literature-validation.js](smooth-sieve-literature-validation.js)
checks the rational derivative constant, squared v-envelope growth at
sigma=1/2, small-prime suppression with exact ordered proxies, squareful
inputs and (14). Controls reject the same growth argument with a
negative first-coordinate exponent, a C3 sixth-moment import and the
omission of the twin term. An antisymmetric control detects the
ordered/unordered substitution in Lemma 10.5, while a symmetric
control verifies its permitted use. The first filter check used JavaScript
numbers and tripped over signed zero; using BigInt makes that integer
identity exact without a signed-zero convention.

A failure of uniform growth, (9), the corrected theorem hypotheses or
the absolute exceptional-set transfer would invalidate (12).
Those are written arguments; the finite validator does not establish
an asymptotic, an effective onset, a useful constant or a twin margin.
