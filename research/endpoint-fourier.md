# Aggregating divisor coefficients before the Fourier estimate

<!-- ledger
id: Q-endpoint-fourier
status: ANSWERED
todo: C
parity: Vaaler's full trigonometric majorant and Bettin-Chandee Theorem 1 with Remark 1 bound composite-modulus CRT discrepancies with arbitrary separate coefficients. Exact aggregation controls their norms, and the existing uniform Mobius mean controls the density. This estimates an additional rectangle of the actual signed remainder; the complementary correlation and both sufficient twin margins remain OPEN.
question: Does a complete Fourier truncation budget and a matched Kloosterman-fraction theorem control any further part of the actual endpoint sum when its small prime-power coefficients are combined first?
verdict: A written classical-input derivation controls the rectangle d in (floor(x^(27/100)),2floor(x^(27/100))], e in (floor(x^(46/100)),2floor(x^(46/100))] to O_H(x/log^H x) for every fixed H. Its product is of order x^(73/100), outside the previously controlled region eventually. The aggregated Fourier exponent is 1989/2000; the full Vaaler tail and gcd=2 branch are included. This is a regional estimate, not a full residual bound or twin theorem; finite algebra and saved-factor checks are separate validation.
-->

**The sufficient twin estimate remains OPEN.** This note derives a bound
on an additional part of the actual remainder using named published
inputs. It does not establish either sufficient margin in
[endpoint-target-audit.md](endpoint-target-audit.md), improve G₂, or
claim novelty or independent referee approval.

The change that makes this estimate possible is to combine the small
prime-power terms into coefficients of the expanded divisors before
estimating their norms. Estimating those terms separately loses a power
in the example below. The full Fourier majorant, including its nonzero
frequencies, is retained.

[endpoint-pairing.md](endpoint-pairing.md) strengthens this sufficient
budget by keeping the two endpoints together at low frequencies and
using the majorant's actual harmonic coefficients. It controls an
additional d~x^0.275, e~x^0.465 rectangle. The estimates below remain
valid; their balanced boundary is not the best currently derived here.

## 1. A region of the actual signed remainder

Let x=2^j tend to infinity through dyadic integer scales. Keep the
original definitions from
[signed-divisor-grouping.md](signed-divisor-grouping.md):
J_x=(x/2,x], U=V=floor(x^(6/25)), Y=Z=floor(x^(1/20)),
L=floor(x^(7/10)), and beta_W(k)=sum_{r|k,r>W} Lambda(r).
For integer intervals I=(D,2D], J=(E,2E], lying above U,Y respectively,
define

$$
 R_{I,J}(x)=\sum_{n\in J_x}
       \left(\sum_{d\mid n,\ d\in I}\mu(d)\beta_V(n/d)\right)
       \left(\sum_{e\mid n-2,\ e\in J}\mu(e)\beta_Z((n-2)/e)\right).
                                                               \tag{1}
$$

The beta weights vanish below their cofactor cutoffs, so these cutoffs
remain exact. For fixed delta>6/25 and nu>1/20 put
D=floor(x^delta), E=floor(x^nu),
a=delta+6/25, b=nu+1/20, and

$$
                  \mathfrak b(a,b)
                  ={17\over20}(a+b)+{1\over4}\max(a,b).        \tag{2}
$$

**Derived from the inputs below:** if mathfrak b(a,b)<1, then for every
fixed H>0,

$$
                         R_{I,J}(x)\ll_H x/\log^H x.           \tag{3}
$$

The implied constants may depend on delta, nu and H. The same argument
allows subintervals of I and J. It requires a fixed strict margin in (2);
no uniform assertion at its boundary is made.

In particular take delta=27/100 and nu=46/100. Then a=b=51/100,
mathfrak b=1989/2000<1, and de is of order x^(73/100). The entire
rectangle lies outside de<=L eventually. This is a new controlled
rectangle, **not** a bound for every pair with de<=x^(73/100).

## 2. Exact aggregation and coefficient norms

For an integer interval I and a cutoff W, define coefficients on a new
divisor l by

$$
 \begin{split}
 A_{I,W,0}(\ell)&=\mu(\ell)1_{\ell\in I},\\
 A_{I,W,1}(\ell)&=-\mu(\ell)1_{\ell\in I}\log\ell
       -\sum_{r\mid\ell,\ 2\le r\le W,\ \ell/r\in I}
                                 \mu(\ell/r)\Lambda(r).
 \end{split}                                                   \tag{4}
$$

They vanish for l>2DW if I=(D,2D] and W>=1. Expanding beta as
log minus its small prime-power divisors gives the exact identity

$$
 \sum_{d\mid n,\ d\in I}\mu(d)\beta_W(n/d)
       =\sum_{\ell\mid n}
              \big(A_{I,W,0}(\ell)\log n+A_{I,W,1}(\ell)\big). \tag{5}
$$

No squarefreeness of l is presumed. Crucially,

$$
 |A_{I,W,0}(\ell)|\le1,\qquad
 |A_{I,W,1}(\ell)|\le2\log\ell,                               \tag{6}
$$

because sum_{r|l} Lambda(r)=log l and |mu|<=1. Consequently the
L2 norms on l of size M are O(sqrt(M) log x), even though the
coefficients were assembled from many small prime powers. Formula (5)
also includes the exact cancellation when n/d<=W.

Apply (5) twice in (1). This leaves four products of **separate** divisor
coefficients, with smooth n-weights 1, log n, log(n-2), and
log n log(n-2). Their supports are l<=2DV and j<=2EZ. There is
no coupled product cut inside this rectangle. Applying this argument
to a cut such as de>L would require an additional justified separation;
the rectangle avoids making that assumption.

## 3. The density term still cancels

Let M_{I,J} be the discrete CRT density term of (1): expand the beta
weights, replace each pair of divisibilities by
gcd(dr,es)/(dr es) when gcd(dr,es) divides 2, and by zero otherwise,
and sum the original smooth weights over integer n in J_x.

The excluded-prime Mobius argument in signed-divisor-grouping.md
sections 2 and 4 applies to the d interval I in place of (U,L/e].
For fixed n,e,r,s its odd part is still a coprimality-restricted
mu(d)/d sum, possibly with log(n/d). The two-adic branch has constant
numerator at fixed parity, and the excluded-prime parameter is at
most 2es<=x^2 eventually. The d endpoints are at least U/2.
That note's uniform estimates therefore apply before summing e,r,s;
their harmonic sums cost only fixed logarithmic powers.

Thus M_{I,J}=O_H(x/log^H x) for every fixed H. This reuses the
proved uniform mean, not an assumption that the aggregated coefficients
have zero average. Condition (2) implies a,b<1, so DV and EZ are
o(x), and all original cofactor cutoffs are automatic on J_x eventually.
The exact aggregation handles them at finite sizes as well.

It remains to bound R_{I,J}-M_{I,J}. Its density may be nonzero and
substantial at finite x; the validator retains it explicitly.

## 4. The Fourier approximation and its full tail

Write e(t)=exp(2 pi i t), psi(t)={t}-1/2, and, for an integer T>=1,

$$
 \begin{split}
 \psi_T(u)&=-\sum_{1\le |h|\le T}
       {W(h/(T+1))\over 2\pi i h}\,\mathrm e(hu),\\
 W(v)&=\pi v(1-|v|)\cot(\pi v)+|v|,\\
 D_T(u)&={1\over2T+2}\sum_{|h|\le T}
              \left(1-{|h|\over T+1}\right)\mathrm e(hu).
 \end{split}                                                   \tag{7}
$$

Vaaler's inequality gives D_T>=0 and |psi-psi_T|<=D_T for every real
argument, including integers with this convention. We use the precise
statement in [Baier-Zhao, Lemma 2.2, p. 344](https://www.impan.pl/shop/publication/transaction/download/product/82887).
Its constant term is 1/(2T+2); all its other terms must also be bounded.
The function W is bounded on (-1,1), with its continuous value at 0.

For compatible original moduli l,j write g=gcd(l,j) in {1,2},
l=gm, j=gn, (m,n)=1. The CRT modulus is q=gmn, and

$$
 {n_0\over q}\equiv {2\over g}{\overline m\over n}\pmod1,
 \qquad
 \Delta_{\ell,j}(t)=\psi((x/2-n_0)/q)-\psi((t-n_0)/q).        \tag{8}
$$

The inverse for modulus 1 is represented by 0. Incompatible moduli
contribute zero. The phase at either endpoint z in [x/2,x] is

$$
       \mathrm e\left(-{2h\over g}{\overline m\over n}
                              +{hz\over gmn}\right).          \tag{9}
$$

The factors xi_{gm}, zeta_{gn} stay separate after splitting g. For
the Vaaler error they become |xi_{gm}|, |zeta_{gn}|, still separate.
Taking these absolute values is confined to the error majorant; it
does not discard its oscillatory frequencies.

## 5. Apply the published bound with the endpoint phase included

On dyadic ranges m of size M, n of size N, h of size A, put
P=MN, Q=M+N. After normalizing |xi|,|zeta|<=1, the two divisor norms
cost O(sqrt(P)). The Fourier coefficients in (7) have norm
O(A^(-1/2)). The nonzero majorant coefficients have norm
O(sqrt(A)/T)<=O(A^(-1/2)), so the same envelope covers both sums.

[Bettin-Chandee, Theorem 1, p. 2](https://arxiv.org/pdf/1502.00769)
has the factor
(AMN)^(7/20+epsilon)(M+N)^(1/4)
+ (AMN)^(3/8+epsilon)(AN+AM)^(1/8), multiplied by the three norms.
Remark 1 on p. 3 allows the differentiable perturbation in (9).
Its derivatives have parameter O(Ax), so its extra factor is
O((1+Ax/P)^(1/2)). These are the theorem statements used here;
no smoothness of the arithmetic coefficients or prime-modulus
restriction is imposed by this import.
Positive and negative h are handled separately, with fixed theta equal
to -2/g or 2/g. On each positive harmonic block the perturbation is
f_h(u,v)=+hz/(guv) or -hz/(guv), so both required first derivatives
are bounded with X=O(Ax). It can be extended smoothly off the positive
dyadic rectangle; the apparent singularity at zero is outside its support.

Substitution and cancellation of the powers of A give, up to the
arbitrarily small epsilon loss,

$$
 (1+Ax/P)^{1/2}
       \left[P^{17/20}Q^{1/4}A^{-3/20}
                         +P^{7/8}Q^{1/8}\right].              \tag{10}
$$

This includes the position cost that would be missed by keeping only
the inverse-residue factor in (9). It is uniform in z in [x/2,x].
The coefficients (6) and the four smooth weights cost additional fixed
logarithmic powers, handled below.

Here is a complete truncation budget. Choose a fixed tau>0 with
mathfrak b(a,b)+3tau<1. Boxes P<=x^(1-tau) are bounded directly by
|Delta|<=1, costing O(x^(1-tau)) per box for normalized coefficients.
For the other boxes choose

$$
                  T=\left\lceil x^{2\tau}\max(1,P/x)\right\rceil.
                                                               \tag{11}
$$

The majorant's constant term costs O(P/T)<=O(x^(1-2tau)). For every
harmonic block A<=T, (1+Ax/P)^(1/2) is O(x^(3tau/2)), since
P>x^(1-tau). Choose the theorem's fixed epsilon small enough that
its loss is at most x^(tau/2). All supports and T have fixed polynomial
size in x, so this is possible without varying epsilon with x.

Both monomials in (10) increase with M,N. With supports bounded by
x^a,x^b up to constants, their exponents are

$$
 b_1={17\over20}(a+b)+{1\over4}\max(a,b),\qquad
 b_2={7\over8}(a+b)+{1\over8}\max(a,b).                       \tag{12}
$$

Here b_2<=b_1: their difference is max(a,b)/8-(a+b)/40>0 for
positive a,b. Also A^(-3/20)<=1. Thus the nonzero frequencies cost
O(x^(b_1+2tau)) per harmonic box. Summing the logarithmically many
divisor and harmonic boxes, restoring the coefficient log norms in
(6), and including both g branches give

$$
 \sup_{t\in[x/2,x]}\left|\sum_{\ell,j}\xi_\ell\zeta_j
                          \Delta_{\ell,j}(t)\right|
                    \ll x^{1-\tau}\log^C x                    \tag{13}
$$

for a fixed C, with the coefficients from any of the four products.
Their n-dependence is only the explicit smooth weight F(n).
Discrete partial summation bounds each weighted error by (13) times
|F(x)|+sum|F(n+1)-F(n)|=O(log^2 x). Hence the **endpoint error**
of (1) has a power saving. Adding the density estimate in section 3
proves (3). The total signed R_{I,J} is asserted only at arbitrary
fixed logarithmic precision; its density estimate is not a fixed
power saving.

## 6. The additional region and the remaining gap

For delta=27/100, nu=46/100, the first exponent is 1989/2000 and the
second is 153/160. Taking tau=1/1000 gives
b_1+2tau=1993/2000<999/1000=1-tau. Every exponent comparison is
checked in exact rational arithmetic by
[endpoint-fourier-validation.js](endpoint-fourier-validation.js).

If the prime-power contributions had instead been estimated separately
at r of size x^(6/25), s of size x^(1/20), the corresponding first
norm budget would be x^(2279/2000), before arbitrarily small losses.
This exceeds x. Combining the coefficients saves the unnecessary
norm cost x^(29/200) in this comparison. This is a comparison of
upper-bound budgets, not a lower bound on the original sum.
Indeed, at r of size R and s of size S, each separate application has
divisor norm product O(sqrt(DE)) up to logarithms. The outer triangle
sum costs RS, whereas aggregation gives O(sqrt(DR ES)). The ratio
is sqrt(RS), which here has exponent (6/25+1/20)/2=29/200.

Along the balanced expanded-modulus line a=b, the strict condition
is a<20/39. Its corresponding original divisor-product frontier is

$$
             \delta+\nu < {40\over39}-{29\over100}
                         ={2869\over3900}.                    \tag{14}
$$

This frontier only describes the separate-endpoint rectangle estimate,
at balanced expanded supports. It is not an optimality theorem, a
universal product cutoff, or a fraction of the residual mass controlled.

Eventually the concrete rectangle from section 1 and de<=L are disjoint.
Both signed sums are O_H(x/log^H x), so both can be removed from R while
preserving the quantitative positive-count identity. Equivalently,
subtract the rectangle's endpoint error from E_>; that subtraction is
smaller than every fixed logarithmic margin. The hypotheses in
endpoint-target-audit.md remain sufficient for the new complementary
remainder, and remain OPEN.
Explicitly, with E_rect=R_{I,J}-M_{I,J} for the concrete rectangle, set

$$
 E_{\rm rest}=E_>-E_{\rm rect},\qquad
 S(x)=C_2x+E_{\rm rest}(x)+O_H(x/\log^H x).                  \tag{15}
$$

The next sufficient inequality is C_2x+E_rest(x)>=c*x/log^K x
on unbounded dyadic scales, or the target audit's rescaled average.
The constant in this still-unproved inequality is not supplied by (3).

The full coefficient supports still reach l,j of order x. On those
upper supports, the generic envelope in (12) has b_1=39/20>1.
It therefore supplies no full scale-x bound; it is even weaker there
than the existing O(x log^4 x) absolute bound on R. This does not
prove that the actual upper blocks are large, or exclude a one-sided
argument exploiting the particular coefficients.

## 7. Validation, limits and next move

The validator performs 16,380 exact coefficient identities over log-prime
vectors, 24,960 Vaaler tests including integer endpoints, and 12,664
exact CRT phase tests with 647 gcd=2 cells. It checks a complete toy
rectangle by direct divisor enumeration and by the compressed CRT
expansion, retaining its density and all four discrete partial-summation
identities. Floating-point logarithmic checks are distinct from the
integer coefficient and rational exponent checks.

The full majorant matters: for moduli 5,7, interval (29,30] and T=4,
the actual truncation error is 0.859687064, exceeding the constant-term-only
allowance 0.2. The full majorant is 0.968575681 and does bound it.
Dropping the nonzero majorant frequencies would invalidate this proof.

The saved factor inputs are reused without changing their artifact. The
new rectangle has 128, 594 and 635 active terms in the three archived
prefixes, all outside de<=L. Their signed averages per measured partner
are 0.287243931, -0.309379721 and 0.298340976. These are partial-window
measurements, not estimates of R_{I,J}(x)/x or its limiting rate. The
checks and exact exponent data are retained in
[data-reuse/endpoint-fourier.json](data-reuse/endpoint-fourier.json),
with the input hash and producer. No large sieve run was repeated.

The written theorem application would fail if (5) lost a cutoff, if the
coefficient norm grew as a power, if the majorant's nonzero frequencies
were dropped, or if the endpoint perturbation or g=2 branch were omitted.
These are handled explicitly above, with finite algebra checks where
applicable. The scripts do not test the asymptotic imports or referee
their application.

The coefficient audit is recorded in
[coefficient-structure.md](coefficient-structure.md). Nonsquarefree
coefficients have a smaller norm; squarefree coefficients have a lower
bound excluding a uniform fixed-power norm saving. A further rectangle
at d~x^0.277, e~x^0.467 reduces to one squarefree-squarefree endpoint
correlation, which [prime-dispersion.md](prime-dispersion.md) now controls.
That follow-up owns the next question about the range of the combined
estimates. Preserve a possible
one-sided argument; the norm obstruction does not refute cancellation
in the phase sum. The aggregation, full Fourier tail, phase budget and
controlled rectangle here are completed inputs to consume.
