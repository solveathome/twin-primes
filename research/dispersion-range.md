# Reversing the dispersion and averaging the gcd loss

<!-- ledger
id: Q-dispersion-range
status: ANSWERED
todo: C
parity: Reciprocal CRT phases move the larger distinguished-prime average into a second moment, with both endpoints shifted by 2. Cauchy in the other expanded divisor and then in the original left divisor permits an elementary averaged-gcd bound before applying classical composite-modulus completion estimates. Left low and nonsquarefree sectors use the paired sparse-norm budget; all right coefficient sectors remain admissible. The resulting region consists of full rectangles with strict margins, not a product cutoff or a twin lower bound.
question: How far do the dispersion and coefficient-sector estimates extend across divisor sizes, and does a better orientation or gcd budget enlarge their overlap?
verdict: Averaging the nonzero gcd losses over the original divisor gives a different dispersion bound with cross-prime exponent (5/4)a+(1/2)b+3/50, where a=delta+6/25 and b=nu+1/20. Explicit diagonal, prime-cut and sparse-sector inequalities control a region of full rectangles, including d~x^0.282, e~x^0.522 at product scale x^0.804. Its cross-prime and left-sparse budgets are 0.9985 and 0.9988. The supremum of product exponents in this sufficient region is 5397/6700; it is not a uniform product cutoff. Balanced supports separately allow 12/25<s<94/175. The global remainder and twin margin remain OPEN.
-->

**The complete endpoint remainder and twin-prime infinitude remain OPEN.**
This note derives a larger region of controlled full rectangles. Its new
ingredients relative to [prime-dispersion.md](prime-dispersion.md) are a
different orientation of the same second moment and an elementary average
of its gcd loss. Finite algebra and rational arithmetic checks are separate
from the proof using classical inputs. No novelty or effective onset is claimed.

## 1. Statement of the region

Keep U=V=floor(x^(6/25)), Y=Z=floor(x^(1/20)), and let
D=floor(x^delta), E=floor(x^nu), I=(D,2D], J=(E,2E]. Set

$$
 w=6/25,\quad v=1/20,\quad a=\delta+w,\quad b=\nu+v,
 \quad t=a+b,\quad u=\max(0,t-1),
$$
$$
 C(a,b)=3/20+(7/10)(a+b)+(1/4)\max(a,b).                  \tag{1}
$$

Assume delta>w, nu>v, a,b<1 and the following strict inequalities:

$$
 \begin{split}
 C(a,b)&<1+w/4=53/50, &\text{left non-Q sectors},\\
 a+b-w/2&<1, &\text{identical-pair term},\\
 (5/4)a+(1/2)b+w/4&<1, &\text{cross-prime Weil term},\\
 C(a-w+u,b)&<1. &\text{small left primes}
 \end{split}                                                \tag{2}
$$

Then for every fixed H,

$$
                         R_{I,J}(x)=O_H(x/\log^H x).       \tag{3}
$$

The endpoint error has a fixed power saving; the density has arbitrary
fixed logarithmic savings as in [endpoint-fourier.md](endpoint-fourier.md).
Constants depend on the fixed parameters and their strict margins.
Equation (2) is a sufficient region, not an optimality statement.
The previously established region C(a,b)<1 remains available separately.

## 2. Remove only the left low and nonsquarefree sectors

Use L_0,L_1,Q,B from [coefficient-structure.md](coefficient-structure.md).
Leave the entire right coefficient in place: it may be any one of its
four types, or A_0,A_1 before that split, each logarithmically bounded and
supported up to 2EZ. Only the left Q coefficient needs dispersion.

Here is the sparse-norm transfer for the **paired** bound. If the support
exponents are a',b' and the norm exponents rho,sigma, its two powers are

$$
 C'=3/20+\rho+\sigma+(a'+b')/5+\max(a',b')/4,
 \quad G'=\rho+\sigma+3(a'+b')/8+\max(a',b')/8.             \tag{4}
$$

To check this rather than assume a norm discount, on a divisor box M,N
multiply the bound in endpoint-pairing.md (9) by the actual norm product
divided by sqrt(MN). The resulting monomials are
x^(3/20)||xi||||zeta||(MN)^(1/5)(M+N)^(1/4) and
||xi||||zeta||(MN)^(3/8)(M+N)^(1/8). Both increase with M,N.
Endpoint integration divides each coefficient by its own divisor and
preserves separation. The same truncation and full majorant argument
therefore give (4), with arbitrarily small fixed losses. Boxes
MN<=x^(1-tau) still use the pointwise logarithmic coefficient bounds.
This uses [Bettin--Chandee, Theorem 1 and Remark 1](https://arxiv.org/pdf/1502.00769),
in the already checked convention; no new bilinear theorem is imported.

On the left B sector, a'=a and rho=a/2-w/4, so the first exponent
is C(a,b)-w/4. For either left L sector it decreases by at least 7w/10.
Thus the first line of (2) controls all three left non-Q types against
every right type. The second term is also below 1: writing
G=7(a+b)/8+max(a,b)/8, one has G<=(25/22)(C-3/20).
Consequently G-w/4<2143/2200<1 under C<53/50; either L sector saves
at least 7w/8 instead. Small tau handles all strict losses.

The uniform endpoint estimates permit partial summation of the original
weights 1, log k, log(k-2), log k log(k-2). These logs refer to the
original counted integer k, not the expanded divisor variables below.
There is no requirement to dispose of the right nonsquarefree sector
by its smaller norm: it will be allowed as an arbitrary coefficient.

## 3. Cut the small left primes and keep every harmonic

By the second line of (2), u<w/2<w. By continuity and the last line,
choose a fixed kappa with

$$
             u<\kappa<w,\qquad C(a-w+\kappa,b)<1.          \tag{5}
$$

The part of left Q with p<=floor(x^kappa) is logarithmically bounded,
with left support exponent a-w+kappa. The paired estimate removes it
against any of the right coefficients. This includes p=2.
Only p in (x^kappa,V] remains; no right-prime cutoff is imposed.

On reduced boxes m~M,n~N, first remove MN<=x^(1-tau) directly using
|Delta|<=1. On all other boxes take the usual

$$
            T=\lceil x^{2\tau}\max(1,MN/x)\rceil.          \tag{6}
$$

The entire positive majorant is controlled by the elementary divisor-count
lemma of [endpoint-pairing.md](endpoint-pairing.md). Its width
8MN/(T+1) lies between 1 and x eventually on these boxes. Take tau
small enough that u+2tau<kappa. Since MN<<x^(a+b), every retained p
then exceeds 2T eventually. Split **all** 1<=h<=T into clipped dyadic
blocks h~A, with A>=1. No uniform low-h cutoff or frequency-overlap
condition is needed in this orientation.

## 4. Reciprocity keeps a required shift of both endpoints

For (m,n)=1, inverse reciprocity gives
inv(m)/n+inv(n)/m = 1/(mn) modulo 1. Put theta=2/g, g in {1,2}.
The original positive-h phase and endpoint factor therefore satisfy

$$
 \begin{split}
 &\mathrm e\left(-\theta h\frac{\overline m}{n}\right)
  \left[\mathrm e\left(\frac{hz_0}{gmn}\right)
              -\mathrm e\left(\frac{hz}{gmn}\right)\right]\\
 &=\mathrm e\left(\theta h\frac{\overline n}{m}\right)
  \left[\mathrm e\left(\frac{h(z_0-2)}{gmn}\right)
              -\mathrm e\left(\frac{h(z-2)}{gmn}\right)\right].
 \end{split}                                                \tag{7}
$$

Here z_0=x/2 and z_0<=z<=x. Dropping the shift by 2 would change the
sum. The endpoint derivatives still have size O(Ax/(MN)) on the box.

Write m=dp, gd in I. Since p is odd, the exact left Q weight is
-mu(gd)log p with p not dividing d. Let beta_g(n) be the actual right
coefficient at gn; it is bounded by a fixed power of log x and its norm
on n~N is O(sqrt(N) log^C x). Define P_d to contain the retained primes
with dp~M and p not dividing d, and define

$$
 \begin{split}
 \widetilde\Phi_{h,p,d}(n)&=
 \mathrm e\left(\frac{h(z_0-2)}{gdpn}\right)
            -\mathrm e\left(\frac{h(z-2)}{gdpn}\right),\\
 Y_d(n)&=\sum_{p\in P_d}\sum_{h\sim A}(\log p)c_h 1_{(n,dp)=1}
              \mathrm e_{dp}(\theta h\overline n)
                              \widetilde\Phi_{h,p,d}(n).
 \end{split}                                                \tag{8}
$$

For g=2 the original left Mobius weight forces odd d, but a right
nonsquarefree coefficient can have even n. No odd-n restriction is
imposed: for example the validator includes B_(J,13)(132)=-log 2,
corresponding to g=2, n=66 and J=(24,48].

The block is exactly -sum_(gd in I) mu(gd) sum_(n~N) beta_g(n)Y_d(n).
First Cauchy in n removes beta_g, then Cauchy in d gives

$$
 |\text{block}|^2\ll ND\log^C x\sum_{gd\in I}\sum_{n\sim N}|Y_d(n)|^2.
                                                               \tag{9}
$$

Enlarging the nonnegative second moment to all d is allowed; squarefree
and parity restrictions from mu(gd) were not imposed on the enlarged
sum. Both gcd branches are thus covered. The condition p not dividing d
and the (n,dp)=1 factors remain inside Y_d.

## 5. Average the gcd loss before taking its worst value

Expanding (9), the n kernel has modulus c=dp for equal p, and
c=dp_1p_2 for distinct primes, with numerator respectively
theta(h_1-h_2) or theta(h_1p_2-h_2p_1). All n must be units modulo c.
Identical pairs alone have numerator zero. On every other pair its
numerator r is nonzero, polynomially bounded in x, coprime to the
distinguished prime or primes, and

$$
                            \gcd(r,c)=\gcd(r,d).           \tag{10}
$$

The prime cut p>2h proves these assertions even for theta=2.
When d is summed, its allowed set includes the dp_i box restrictions
and p_i not dividing d. These may be dropped after taking a nonnegative
upper bound, since they define a subset of d of order D.

For r!=0 and 0<alpha<=1 there is an elementary uniform estimate

$$
             \sum_{D_0<d\le2D_0}\gcd(r,d)^\alpha
                         \ll D_0\,\tau(|r|).               \tag{11}
$$

Indeed gcd(r,d)^alpha<=sum_(s|r,s|d)s^alpha. Only s<=2D_0 occur;
their multiples in the interval number at most D_0/s+1. Each divisor
contributes at most D_0 s^(alpha-1)+s^alpha<=3D_0, up to an absolute
constant for D_0>=1. Sum over divisors of |r|. The translated gcd=2
branch has D_0=D/2 and costs the same order. No assumption r<D or
coprimality of r and d is made. For polynomially bounded nonzero r,
tau(|r|)<<_epsilon x^epsilon. The r=0 diagonal must be kept separate.

Use the composite-modulus interval completion bound derived in
[prime-dispersion.md](prime-dispersion.md), from the classical
[Ramanujan and Weil bounds, Lemmas 3.2--3.3](https://link.springer.com/article/10.1007/s00039-026-00746-0):
an interval of length at most N costs x^epsilon(sqrt(cG)+(N/c)G),
where G=gcd(r,c). The product of the actual two endpoint factors has
variation O(1+Ax/(MN))<<x^(3tau) on the boxes retained in section 3.
Partial summation pays that cost. Complete periods are included.

For a fixed distinct-prime pair, (11) with alpha=1/2 gives
sum_d sqrt(d p_1p_2 gcd(r,d))<<x^epsilon D^(3/2)sqrt(p_1p_2).
The alpha=1 case gives sum_d gcd(r,d)/d<<x^epsilon for the complete-period
term. Same-prime pairs have sqrt(p) in place of sqrt(p_1p_2).

Since sum_(h~A)|c_h|=O(1), sum_(h~A)|c_h|^2=O(1/A), the absolute
budgets for the moment on the right of (9), omitting only logarithms, are:

| pair class | bound after summing d,p,h |
|---|---|
| identical (p,h) | D N V/A |
| same p, distinct h: Weil | x^(3tau+epsilon) D^(3/2) V^(3/2) |
| distinct p: Weil | x^(3tau+epsilon) D^(3/2) V^3 |
| nonidentical pairs: complete periods | x^(3tau+epsilon) N |

For the last row, sum_(p<=V)(log p)^2/p and
(sum_(p<=V)(log p)/p)^2 cost only logarithms. This avoids replacing
their denominators by the smallest prime in the band.
Applying (9) and taking square roots proves the block bound

$$
 |\text{block}|\ll_\epsilon x^\epsilon\left[
 DN\sqrt{V/A}+x^{3\tau/2}
 \left(N^{1/2}D^{5/4}V^{3/2}
       +N^{1/2}D^{5/4}V^{3/4}+ND^{1/2}\right)\right].     \tag{12}
$$

All prime and divisor averages have now been priced. In particular,
(11) is an average inside the second moment, not an assumed saving
in the individual coefficient norms or in a pointwise Weil bound.

## 6. Budget, balanced family and the remaining boundary

With A>=1 and N<<x^b, the exponents in (12), before strict losses, are

$$
 \begin{array}{ll}
 a+b-w/2,&\text{diagonal},\\
 (5/4)a+b/2+w/4,&\text{distinct-prime Weil},\\
 (5/4)a+b/2-w/2,&\text{same-prime Weil},\\
 b+a/2-w/2,&\text{complete periods}.
 \end{array}                                                \tag{13}
$$

The second line dominates the third. The first dominates the fourth
because a>0. Thus (2) leaves a strict margin on every term. Choose tau
and then the theorem epsilons small enough for all margins, the prime
cut (5), the small-box bound and the full-majorant bound. Summing the
logarithmically many boxes and blocks preserves a fixed power saving.
Restore the original smooth weights by partial summation and consume
the total density estimate. This proves (3).

On balanced expanded supports a=b=s, (2) gives the particularly simple
sufficient family

$$
     12/25<s<94/175,\qquad
     \delta=s-6/25,\quad\nu=s-1/20.                       \tag{14}
$$

One may fix kappa=3/25 throughout this family and take small tau depending
on s. The cross-prime exponent is 7s/4+3/50<1. At s=94/175 the other
budgets still have strict margins: C-w/4=3417/3500, the small-prime
budget C(s-3/25,s)=3333/3500, and the diagonal is 167/175.
The strict balanced product boundary supplied by this estimate is

$$
                         \delta+\nu<549/700.               \tag{15}
$$

For a concrete rectangle choose s=537/1000, hence
delta=297/1000, nu=487/1000, kappa=3/25, tau=1/100000.
Its budgets are:

| term | exponent before strict losses |
|---|---:|
| left B against any right coefficient | 19521/20000 = 0.97605 |
| small left primes against any right coefficient | 19041/20000 = 0.95205 |
| dispersion diagonal | 477/500 = 0.954 |
| distinct-prime Weil | 3999/4000 = 0.99975 |
| same-prime Weil | 3279/4000 = 0.81975 |
| complete periods | 1371/2000 = 0.6855 |

Here T<<x^.07402 and p>x^.12, so p>2T eventually. The dispersion
polynomial is O(x^.9999) after its losses; the other components retain
their own power savings. Equation (3) controls the full rectangle at
product scale x^.784, compared with x^.744 for the previous pilot.
This does not bound every pair up to that product or measure a fraction
of the full residual.

For a falsifying scope control take s=269/500=.538. The cross-prime
budget becomes 2003/2000=1.0015 while the other displayed conditions
still have slack. This bound is insufficient there; it does not prove
that cancellation fails. Likewise (15) is a strict boundary of this
sufficient balanced calculation, not a universal barrier.

The initial attempt to extend the previous orientation by a single
low-h cutoff has its own narrower budget: at balanced s it requires
4s-41/20<eta<(3-5s)/14, hence s<317/610. At s=.52 those inequalities
have no overlap. That is an incompatibility between two sufficient
estimates, not a refutation of the sum. Equations (7)--(12) change both
the orientation and treatment of the gcd loss, so do not inherit it.

The region need not be balanced. Taking a=.522, b=.572 gives the
full rectangle **delta=.282, nu=.522**, with product scale x^.804.
Again kappa=.12 and tau=1/100000 work. Its left-sparse, small-prime,
diagonal, cross-prime, same-prime and complete-period exponents are
respectively .9988, .9748, .974, .9985, .8185 and .713, before losses.
Here T<<x^.09402. Thus it has strict margins in every required estimate.

One can bound the range of (2) exactly. Its sparse and cross-prime
conditions imply

$$
           14a+19b<91/5,\qquad 5a+2b<94/25.
$$

Multiplying these by 3/67 and 5/67 and adding gives
a+b<367/335. Equality of the two boundary lines occurs at
a=876/1675, b=959/1675. At that point b>a, and the diagonal and
prime-cut conditions still have slack with kappa=.12; decreasing both
coordinates slightly satisfies every strict condition. Consequently
the exact supremum of original product exponents in this sufficient
region is

$$
                  \sup(\delta+\nu)=5397/6700\simeq .805522. \tag{16}
$$

This optimizes **the inequalities (2)** only. It neither excludes another
estimate past that value nor asserts control of every pair with product
below it. Near this corner both the left B budget and the cross-prime
budget become tight; improving only the balanced boundary misses that
second constraint.

## 7. Validation and next work

[dispersion-range-validation.js](dispersion-range-validation.js) and
[its retained artifact](data-reuse/dispersion-range.json) check the shifted
reciprocity identity, exact moments with the actual right A coefficients,
both gcd branches, nonunit restrictions, the averaged-gcd inequality and
rational region budgets. Controls include nonidentical prime pairs with
nontrivial gcd loss, omission of the endpoint shift, and the excluded r=0
case. Saved factor inputs supply the prime table; no larger sieve is run.
The right-coefficient probe is A_1+(2+i)A_0, an allowed complex combination
of the actual coefficients that exercises all four sector types. It is
an algebra test for the general coefficient bound, not a measurement of R.
These finite checks can falsify algebra and bookkeeping, not prove the
classical asymptotic inputs. Missing the shift, deleting a right sector,
using (11) on r=0, or averaging after the wrong absolute-value step would
invalidate the result; the proof keeps each explicitly.

The retained run has 5,472 gcd inequalities, 127,068 shifted endpoint
identities, twelve full weighted moments and 693,684 pair-phase checks.
It includes all four right coefficient types and 199,400 nonidentical
terms with nontrivial gcd. Exact rational checks caught a period-term
addition using the original right-divisor exponent instead of b; the
corrected balanced value is .6855 and the leading budgets are unchanged.
All fourteen strict QC gates pass with zero findings, the verifier
self-tests pass (58 positives, 47 controls), and the existing numerical
audit passes 251/251 checks. These are distinct from reviewing the proof.

The [sparse-dispersion follow-up](sparse-dispersion.md) now controls left
B against right Q using the opposite orientation, including the frequency
collisions that arise when its harmonics exceed its right primes. It
retains the sparse norm and pairs endpoints inside the moment. Combining
that estimate with BB's two sparse norms relaxes the first inequality
here and gives a larger region, with product-exponent supremum 1368/1675.
The follow-up also writes the exact signed cross-prime moment before
section 5's final triangle inequality and specifies its one-sided upper
consumer. Its remaining tight budgets are BB and the left-prime cross
moment. Consume those calculations before proposing another orientation
or frequency cut. The full residual outside the controlled rectangles
remains open; no global coverage or twin lower bound follows.
