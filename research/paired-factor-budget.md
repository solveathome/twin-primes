# Aggregate distribution and the paired factor budget

<!-- ledger
id: Q-paired-factor-budget
status: ANSWERED
todo: C
parity: Imports Pan--Ding's averaged prime-cofactor distribution through Wu's published Lemma 2.3, and applies linear sieves only to nonnegative measures. The signed residual and prime exclusions remain explicit. Closing one two-family shortcut does not close broader signed aggregation or different cutoffs.
question: Does averaging the proposed two-small-prime loss and three-small-prime gain using existing distribution theorems make their net contribution sufficient for the current twin consumer?
verdict: DERIVED from the matched classical inputs, with finite rational enclosures VERIFIED: the explicit positive family has liminf P3/(C2*x)>1, but liminf (N2-P3)/(C2*x)>11/10. Keeping only these families and the main term therefore fails at the current cutoffs. Pan--Ding supplies aggregate level x^(9/20), stronger than the earlier per-cofactor application; the complete signed margin remains OPEN. The aggregation machinery is prior art and literature novelty of this application is unestablished.
-->

**Twin-prime infinitude and the sufficient net lower margin remain OPEN.**
The proposed two-family comparison is now priced and is insufficient.
This note also identifies a usable distribution input missed by the
previous per-cofactor calculation. It is an application of existing
mathematics; literature novelty is unestablished.

The owning predecessor is [switching-negative-mass.md](switching-negative-mass.md).
The complete C3 identity remains

\[
 S(x)=C_2x+\widehat{\mathcal R}(x)+O_A(x/\log^A x),
 \qquad
 \widehat{\mathcal R}=\sum_{x/2<n\le x}\widehat G_L(n)\widehat G_R(n-2).
                                                               \tag{1}
\]

Every complement is part of this identity. Here and below T=log x;
cutoffs, C2 and the prime-power convention are those of the predecessor.

## 1. The literature input that changes this calculation

[Wu, *Chen's double sieve, Goldbach's conjecture and the twin prime problem*,
Acta Arith. 114 (2004)](https://www.impan.pl/shop/en/publication/transaction/download/product/82961),
Lemma 2.3, attributes the following mean-value input to Pan--Ding [21],
in the form of Pan--Pan [22, Corollary 8.12]. For bounded coefficients
c(m), the **first** estimate gives, for every A and suitable B,

\[
 \sum_{d\le\sqrt{x}/T^B}\mu^2(d)3^{\omega(d)}
 \max_{y\le x}\max_{(a,d)=1}
 \left|\sum_{\substack{m\le x^{1-\alpha}\\(m,d)=1}}
 c(m)\left\{\sum_{\substack{mr\le y\\mr\equiv a\pmod d\\r\ {\rm prime}}}1
              -\frac{\operatorname{li}(y/m)}{\varphi(d)}\right\}\right|
 \ll_A x/T^A.                                                \tag{2}
\]

We use alpha=1/2 only. The other two endpoint variants are unnecessary.
Wu's section 10, (10.6)--(10.8), already aggregates a two-prime product
inside this absolute value and pays the discarded coprimality condition.
Thus aggregation before the progression bound is established machinery.
The linear-sieve formulas used below are the published
[Matomäki--Zuniga Alterman Lemma 2.5](https://arxiv.org/abs/2405.19063),
matched in the predecessor; no double-sieve improvement is imported.

The distinction from the previous input is mathematical: an individual
m still has prime interval length x/m. Formula (2) controls its
**aggregate** with other m at level sqrt(x) times logarithms.
It does not assert that each shorter prime interval has that level.

## 2. Exact families and their signs

Write a=floor(x^(11/50)), b=W_L=floor(x^(6/25)),
W_R=floor(x^(1/20)). Define sets of integers with the indicated unique
ordered prime factorizations:

\[
 \begin{split}
 \mathcal M_2&=\{pq:p<q\le a,\ pq\ge b\},\\
 \mathcal M_3&=\{pqt:p<q<t,\ pq,pt,qt\le a,\ pqt\ge b\}.
 \end{split}                                                 \tag{3}
\]

For m in either set take r prime with x/(2m)<r<=x/m, n=mr and h=n-2.
All prime factors of m exceed a constant times x^(1/50). For M2 this
follows from p>=b/a. For M3 use p=m/(qt)>=b/a. Also

\[
 m\le x^{11/25}\quad(m\in\mathcal M_2),\qquad
 m^2=(pq)(pt)(qt)\le a^3\le x^{33/50}
       \quad(m\in\mathcal M_3).                              \tag{4}
\]

Hence m<=x^(1/2), r>W_L, and r is n's unique prime factor exceeding
W_L. The two n-families are disjoint and each n has one representation.
There is no factorial multiplicity in (3).

On the plateaus the complete subset coefficient is respectively -1
and +1. For M3, every singleton and pair is at most a while the triple
is at least b, so F_L=1-3+3=1. Terms containing r vanish in F_L.
The exact coefficient identities therefore give

\[
 \widehat G_L(mr)=
 \begin{cases}\log r,&m\in\mathcal M_2,\\-\log r,&m\in\mathcal M_3,\end{cases}
 \qquad
 \widehat G_R(h)=\Lambda(h)-\log h
        \quad\hbox{if }P^-(h)>W_R.                          \tag{5}
\]

Let N2 be the absolute negative contribution from M2 with a rough h,
and P3 the positive contribution from M3 with a rough h. Include proper
prime-power partners with their actual weights; prime partners contribute
zero. Define for k=2,3

\[
 B_{k,r}=\sum_{\substack{m\in\mathcal M_k,\ r\ {\rm prime}\\x/2<mr\le x}}
        (\log r)1_{P^-(mr-2)>W_R},\qquad
 B_{k,p}=\sum_{\substack{m\in\mathcal M_k,\ r\ {\rm prime}\\x/2<mr\le x}}
        (\log r)1_{mr-2\ {\rm prime}}.                      \tag{6}
\]

The bounds in section 4 give B_(k,r)=O(x/T). Replacing log h by T
then costs O(x/T). Proper prime powers cost O(sqrt(x)T^3), since
representations are unique. Consequently

\[
 N_2=T(B_{2,r}-B_{2,p})+o(x),\qquad
 P_3=T(B_{3,r}-B_{3,p})+o(x).                               \tag{7}
\]

No assumption about the frequency of prime partners is used.

## 3. Match the aggregate measure, logarithm and local densities

Put H_k=sum_(m in M_k)1/m and X_k=xH_k/2. Mertens gives H_k=O(1);
each set has bounded factor count and all its primes lie between fixed
positive powers of x. Let A_(k,d) be the sum of log r over the pairs
in (6) with d|mr-2. For D=x^(9/20), we claim for every fixed A

\[
 \sum_{d\le D}\mu^2(d)|A_{k,d}-h(d)X_k|\ll_A x/T^A,\qquad
 h(d)=\frac{1_{(d,2)=1}}{\varphi(d)}
          \quad\hbox{on squarefree }d.                    \tag{8}
\]

Here are the required transfers from (2).

**Support and level.** The two indicator coefficients 1_(M_k)(m)
are bounded by one, even though their supports depend on x.
Equation (4) permits alpha=1/2. For every fixed B,
x^(9/20)<=sqrt(x)/T^B eventually, with power slack 1/20.
This application uses actual primes, so no Lambda-to-primes removal
is hidden in the distribution error.

**Logarithm.** For odd d let E_c(y;d) denote the inner discrepancy in (2)
at a=2. Keep the m-support fixed while y varies. Since
log r=log(mr)-log m, the weighted dyadic discrepancy is exactly

\[
 [(\log y)E_c(y;d)]_{x/2}^{x}
 -\int_{x/2}^{x}E_c(y;d)\frac{dy}{y}
 -T[E_{c\log m/T}(y;d)]_{x/2}^{x}.                         \tag{9}
\]

Both coefficients are bounded. The maximum over y in (2) controls
the integral, and arbitrary logarithmic precision pays the extra T.
The main term is exactly x/(2m phi(d)), because
(log y-log m) d li(y/m)=dy/m on this interval.

**Coprimality.** If an odd prime divides both m and d, the congruence
mr=2 mod d is impossible. For odd d the correct main term initially
contains sum_(m in M_k,(m,d)=1)1/m. Removing this restriction costs,
in the sum of absolute remainders, at most

\[
 \frac{x}{2}\sum_{m\in\mathcal M_k}\frac1m
       \sum_{\ell\mid m}\sum_{\substack{d\le D\\\ell\mid d}}
                    \frac{\mu^2(d)}{\varphi(d)}
 \ll xT\sum_{m\in\mathcal M_k}\frac1m\sum_{\ell\mid m}\frac1{\ell-1}
 \ll x^{49/50}T.                                          \tag{10}
\]

For the middle bound write d=ell*e and use
sum_(e<=D)mu^2(e)/phi(e)=O(log D). All m are odd and the r here are
odd, so even d have A_(k,d)=h(d)=0 exactly. Equations (9)--(10)
prove (8). We use the unweighted remainder sum in (8); the source's
additional factor 3^omega(d) need not be carried through (10).

In the linear-sieve convention g(d)/d take g(d)=d*h(d).
The dimension-one product condition holds, and

\[
 V(z)=\prod_{\ell<z}(1-h(\ell))
       \sim\frac{2C_2e^{-\gamma}}{\log z}.                 \tag{11}
\]

The factor at 2 is retained. The fixed density and (8) give uniform
sieve errors o(x/T) in all the applications below.

## 4. The complete regional constant budget

All three uses of the linear sieve are on a nonnegative measure.
At the roughness cut z=W_R+1 use a lower sieve of level x^(1/5)
and an upper sieve of level x^(3/20). Their limiting s are 4 and 3.
For the prime-partner upper bound use level x^(9/20) and z=x^(9/40),
so s=2. These levels are all allowed by (8).

Since f(4)=e^gamma*log(3)/2, F(3)=2e^gamma/3 and F(2)=e^gamma,
(11) and X_k=xH_k/2 give

\[
 \begin{split}
 T B_{k,r}&\ge(10\log3+o(1))C_2xH_k,\\
 T B_{k,r}&\le(40/3+o(1))C_2xH_k,\\
 T B_{k,p}&\le(40/9+o(1))C_2xH_k .
 \end{split}                                               \tag{12}
\]

Every prime partner exceeds the upper sieve's z eventually.
That upper sieve may count composites, which is the correct direction
when subtracting B_(k,p). The looser rough upper bound is chosen to
keep the constants elementary; optimizing them is unnecessary.

The ordered harmonic limits, justified by prime Mertens and finite
rectangle approximations away from exponent zero, are

\[
 \begin{split}
 H_2&\longrightarrow I_2
   =\iint_{\substack{0<u<v<11/50\\u+v>6/25}}\frac{du\,dv}{uv},\\
 H_3&\longrightarrow I_3
   =\int_{1/50}^{11/100}\frac{du}{u}
       \int_u^{11/100}\frac{dv}{v}
       \log\frac{11/50-v}{\max(v,\,6/25-u-v)} .
 \end{split}                                               \tag{13}
\]

For I3 the integrated third exponent w has lower endpoint
max(v,6/25-u-v) and upper endpoint 11/50-v. These are ordered
throughout the displayed u,v triangle. Boundary equalities and the
floor cutoffs do not change either limit. The finite certificate
described in section 5 encloses the integrals as

\[
 \frac{13}{25}<I_2<\frac{53}{100},\qquad
 \frac4{25}<I_3<\frac{17}{100},\qquad
 \log3>\frac{219}{200}.                                    \tag{14}
\]

Set L=10log(3)-40/9>1171/180 and U=40/3. Combining (7)--(14),

\[
 \begin{split}
 \liminf\frac{N_2}{C_2x}&\ge LI_2>\frac{15223}{4500},\\
 \liminf\frac{P_3}{C_2x}&\ge LI_3>\frac{1171}{1125}>1,\\
 \liminf\frac{N_2-P_3}{C_2x}
       &\ge LI_2-UI_3>\frac{5023}{4500}>\frac{11}{10}.
 \end{split}                                               \tag{15}
\]

The second line locates an explicit positive family without deriving
its existence from S>=0. The third line is the decisive comparison:
this positive family does not pay even the chosen negative family.
It is not merely a failure to obtain a favorable bound; the paired
contribution itself has the wrong size to close the truncated consumer.

Define the complementary sum exactly by

\[
 R_{23}=P_3-N_2,\qquad
 R_{\rm rest}=\widehat{\mathcal R}-R_{23}.
 \quad S=C_2x+R_{23}+R_{\rm rest}+O_A(x/T^A).               \tag{16}
\]

Thus C2*x+R23 is negative of order x. Discarding R_rest, or claiming
it is o(x), is refuted at these cutoffs. In fact (1), S>=0 and
(15) force liminf R_rest/(C2*x)>1/10. This last observation does
not improve the twin lower bound: it only recovers a necessary
contribution that the truncated calculation omitted. An independently
proved lower bound for the complete sum in (16) is still needed.

All witnesses survive localization at each fixed delta<1/50, and
all profiles with the same plateaus. Other cutoff exponents are not
priced here. Nothing establishes a universal limitation of signed
sieving or an effective starting scale.

## 5. Finite certificate and checks

[paired-factor-budget-validation.js](paired-factor-budget-validation.js)
uses a 400-cell grid in each exponent coordinate. For I2 it includes
whole rectangles inside the ordered region for a lower sum and every
intersecting rectangle for an upper sum. A cell's harmonic mass is
log(u1/u0)*log(v1/v0). Diagonal cells occur only in the upper sum.

For I3 the grid covers [1/50,11/100]^2. On a cell with u<v, the
integrated logarithm is bounded below by

\[
 \left[\log\frac{11/50-v_1}{\max(v_1,6/25-u_0-v_0)}\right]_+
\]

and above by the same expression with numerator 11/50-v0 and
denominator max(v0,6/25-u1-v1). The lower bound discards diagonal
cells; the upper bound includes them. Multiplication by the cell's
exact harmonic mass encloses the integral, without a smoothness
assumption at its internal boundaries.

Every logarithm uses t=(a-b)/(a+b) and the positive series
log(a/b)=2*sum_(j>=0)t^(2j+1)/(2j+1). After K=32 terms the remaining
tail is at most 2*t^(2K+1)/((2K+1)(1-t^2)). All arithmetic rounds
outwards with BigInt at scale 10^16. Addition and multiplication
preserve the interval inclusions. The script's exact rational
enclosures verify (14); no floating quadrature is used for (15).
The interval construction is the derivation; its implementation
and finite rational comparisons are VERIFIED computational certificates.

Controls include an independently alternating log series, logarithm
addition, complete subset sums for both signs, level exponents and
the invalidity of applying a nonnegative sieve to a signed singleton.
The predecessor's direct G convolution controls still cover prime and
proper prime-power partners. A finite script cannot verify (2) or its
asymptotic applicability: sections 2--4 supply that source match.

Decisive falsifiers are a wrong support or order of absolute values in
(2), a missing logarithmic or coprimality error, an overcounted ordered
factorization, reversed prime subtraction, or incorrect integral
enclosures. These checks were carried out; no effective onset was
computed. The global complement remains unestimated beyond the
previous absolute O(x) budget and the implication from S>=0.

## 6. Whole supported coefficient and its completed follow-up

The harmonic calculation and elementary sieve-budget test below are
completed in [supported-coefficient-dickman.md](supported-coefficient-dickman.md).
Classical Dickman convolution gives H_delta=D(25/12)-1+E_delta at
delta=1/100, with 0<=E_delta<=24/22! and H_delta<-2/3. The resulting
separate-sign lower constant is below -80/9. That insufficient lower
bound is not a negative upper bound on the actual supported residual.
The next open estimate is the joint prime-partner/complement consumer
in that note's section 5; do not repeat the harmonic calculation unchanged.
The definition and required accounting are retained here for reference.

Do not repeat two-family enumeration as if it supplied the net margin.
The source-matched test uses (2) for an entire coefficient within its
support, then prices the signed sieve loss and retains the complement.
For fixed delta>0 define the support

\[
 \mathcal M_\delta=\{m:1<m\le x^{1/2},\
                P^-(m)>x^\delta,\ P^+(m)\le W_L\},
 \qquad c_\delta(m)=1_{\mathcal M_\delta}(m)\widehat F_L(m).
                                                               \tag{17}
\]

Here m=1 is deliberately excluded: the n-prime cancellation in G_L
would otherwise invalidate a composite formula. At fixed delta the
coefficient is bounded by 2^(1/(2delta)), so (2) can handle its
normalized signed values, as well as its absolute value. It includes
the present two families when delta<1/50. Its prime cofactor is
larger than W_L and unique. Pay irregular prime powers using the
existing complete bound before using G_L=-F_L(m)log r.

The completed bounded assignment was to derive the harmonic main term and error
for this full supported coefficient under a common roughness sieve,
retaining the signed prime-partner subtraction. Nonnegative sieve
inequalities do not extend automatically to c_delta: one must bound
the discrepancy using its absolute coefficient or another justified
comparison. State the exact complementary residual, including cases
with several large left factors, m outside the support, nonrough right
partners and the paid small-prime tail. That complement is essential
by (16); a regional gain alone is insufficient.

Before adding machinery, check the proposed signed combination against
the existing weighted/Buchstab identities and their distribution
assumptions. A useful research output would be a net estimate beyond
S>=0, or a quantified failure for this full support. The source match
does not predict which outcome will hold. Fixed delta's O(delta^sigma x)
allowance still cannot automatically pay an x/log^K x target.

## 7. Source custody

Read on 2026-09-06: Wu's published Lemma 2.3 on printed pp. 220--221
(PDF pp. 6--7), and its application (10.6)--(10.8) on pp. 263--264
(PDF pp. 49--50), including continuations, inspected as images and text.
Published PDF SHA-256:
ebe75ef36478213bde937dce7d163bdd14b5b0352be54e085c9f696afc6e8a30.
The [arXiv v1](https://arxiv.org/pdf/0705.1652v1) statement agrees;
its PDF SHA-256 is
41d432dd63da6d1fe7836ba3beda8b601ce6e64420e50501d26d79f7d971043e.
The 1979 Pan--Ding original and 1992 book were not independently read;
the import rests on Wu's published statement. No theorem about the
full Ghat correlation is asserted by that source.
