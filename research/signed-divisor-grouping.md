# Signed divisor grouping: a controlled product range and the remaining endpoint sum

<!-- ledger
id: Q-signed-divisor-grouping
status: ANSWERED
todo: C
parity: The classical quantitative Mobius mean estimate, an excluded-prime convolution and exact CRT counts control the signed region de<=x^(7/10). Both Mobius signs are retained before bounding errors. The remaining weighted inverse-residue endpoint discrepancy is not estimated; no universal parity obstruction or twin lower bound is asserted.
question: Can grouping different fibers while retaining their Mobius signs control an explicit part of R, and what signed error remains after that grouping?
verdict: For every fixed H>0 the actual remainder restricted to de<=x^(7/10) is O_H(x/log^H x), although each sign's mass there is at least c*x*log(x) eventually. This follows from a written classical-input derivation, with finite algebra and archived-factor checks. The remaining de>x^(7/10) contribution reduces to an explicit weighted CRT endpoint discrepancy whose required one-sided improvement is OPEN.
-->

Internal continuation, 2026-09-05. **The twin-prime estimate remains OPEN.**
This note controls a signed part of the remainder, not merely its density
model. It executes the grouping first move after
[singleton-fiber-audit.md](singleton-fiber-audit.md). Definitions and the
positive-count consumer are in
[shifted-prime-decomposition.md](shifted-prime-decomposition.md) and
[prime-detection-spec.md](prime-detection-spec.md). The proof below is
checked here using named classical inputs; it is not independently
refereed and carries no novelty claim. The
[validator](signed-divisor-validation.js) uses the retained factors from
[the data audit](data-reuse-audit.md).

## 1. The result and what it buys

Let x be dyadic, J_x=(x/2,x]∩Z, U=V=⌊x^(6/25)⌋,
Y=Z=⌊x^(1/20)⌋, β_W(k)=Σ_{r|k,r>W}Λ(r), and

$$
 R(x)=\sum_{d>U,\ k>V,\ e>Y,\ v>Z\atop dk-ev=2,\ dk\in J_x}
               \mu(d)\mu(e)\beta_V(k)\beta_Z(v).
$$

Put L=⌊x^(7/10)⌋ and split R=R_{≤L}+R_{>L} according to de≤L or
de>L. **Derived:** for every fixed H>0,

$$
 R_{\le L}(x)\ll_H x/\log^H x.                                 \tag{1}
$$

More precisely, a signed density term M_L and an endpoint error E_L satisfy

$$
 R_{\le L}=M_L+E_L,\qquad M_L\ll_H x/\log^H x,\qquad
 |E_L|\ll L VZ\log^3x\ll x^{99/100}\log^3x.                    \tag{2}
$$

The last power saving is smaller than x/log^H x for any fixed H, once x
is sufficiently large. No numerical onset is calculated. The same argument
works with L=⌊x^θ⌋ for any fixed 0<θ<71/100; 7/10 leaves a margin of 1/100.
This is the range of the displayed absolute endpoint budget, not a proved
optimal limit of all signed methods.

For de≤L and n=dk∈J_x,
kv=n(n−2)/(de)≫x^(13/10)>x eventually. Hence every nonzero term in this
region belongs to a singleton fiber of the full original problem.
The previous proof's witness has de≤4UY≪x^(29/100), and is contained
here eventually. Therefore both signs' masses in this very region are
at least c*x*log(x), even though their signed difference satisfies (1).
This is actual cancellation **across** fibers. It does not bound the
rest of the singleton family or the longer fibers.

The prior reduction now reads

$$
                  S(x)=C_2x+R_{>L}(x)+O_H(x/\log^H x).          \tag{3}
$$

An adequate one-sided improvement for R_{>L} is still required. The
reduction does not establish that improvement or reduce the known G₂
exponent.

## 2. A uniform excluded-prime Möbius mean

The sole analytic import for (1) is the classical estimate

$$
 M(t)=\sum_{n\le t}\mu(n)\ll_A t/\log^A t\quad(A>0),           \tag{4}
$$

available, for example, from the q=1 case of
[Tao, Notes 2, Exercise 66](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/).
We use no growing-modulus progression theorem here. The required
uniformity for excluding prime factors is derived next.

Let h_m(n) be 1 when all prime factors of n divide m, and 0 otherwise,
with h_m(1)=1. Euler factors give the exact convolution

$$
 \mu(n)1_{(n,m)=1}=(\mu*h_m)(n).                               \tag{5}
$$

For 1≤m≤x² the following bounds are sufficient:

$$
 \sum_h{h_m(h)\over h}={m\over\varphi(m)}\ll1+\log m,\qquad
 \sum_h{h_m(h)\over\sqrt h}
       =\prod_{p\mid m}(1-p^{-1/2})^{-1}\ll_\epsilon m^\epsilon.
                                                               \tag{6}
$$

For the first bound, factor each (1−1/p)^{-1} into
(1+1/p)/(1−1/p²); the second product is bounded by ζ(2), and the
first is a sum of reciprocals of divisors of rad(m), bounded by
Σ_{n≤m}1/n. For the second, each sufficiently large prime factor obeys
(1−p^{-1/2})^{-1}≤p^ε; the finitely many smaller factors enter the
constant. Thus no unproved uniform prime-factor statistic is used.

Write M_m(t)=Σ_{n≤t,(n,m)=1}μ(n). Split the convolution sum at h=√t.
For h≤√t use (4), and for h>√t use |M(t/h)|≤t/h and (6). Uniformly
for U/2≤t≤x and m≤x², this gives

$$
 |M_m(t)|\ll_A {t\log x\over\log^A x}
                    +t^{3/4}m^{1/100}
       \ll_A {t\over\log^{A-1}x}+t x^{-1/25}.                  \tag{7}
$$

Here t≥U/2≫x^(6/25), so t^(−1/4)m^(1/100)≪x^(−6/100+2/100).
Consequently M_m(t)≪_H t/log^H x for every H, uniformly in the
displayed ranges. Partial summation yields, for U/2≤a<b≤x,

$$
 \sum_{a<n\le b\atop(n,m)=1}{\mu(n)\over n}
                  \ll_H\log^{-H}x,\qquad
 \sum_{a<n\le b\atop(n,m)=1}{\mu(n)\over n}\log(t_0/(c n))
                  \ll_H\log^{-H}x,                             \tag{8}
$$

uniformly for t₀∈[x/2−2,x], c∈{1,2}. Endpoint and variation factors
cost only fixed powers of log x, absorbed by choosing A larger in (7).
Empty intervals are allowed. The summation in (8) is over a growing
range of integers; it is not an estimate on an individual singleton fiber.

## 3. Expand the β weights before taking absolute values

For W≥1 set P_W={1}∪{p^j≤W}, α₁=1, and α_r=−Λ(r) for r>1.
Let f₁(t;d)=log(t/d) and f_r(t;d)=1 for r>1. The identity
Σ_{r|k}Λ(r)=log k gives

$$
 1_{d\mid n}\beta_V(n/d)
       =\sum_{r\in P_V}\alpha_r f_r(n;d)1_{dr\mid n}.          \tag{9}
$$

The left side is understood to be zero when d∤n. There is an identical
formula for e,n−2,Z. For the small-product region, de≤L implies
d≤L/(Y+1) and e≤L/(U+1). Eventually dV<x/2 and eZ<x/2−2, so the
cofactor cutoffs k>V and v>Z are automatic whenever both divisibilities
hold. This accounts for the original strict cutoffs; they are not dropped
without a check.

For a,b≥1 define

$$
 \delta(a,b)={g\over ab}\,1_{g\mid2},\qquad g=(a,b).           \tag{10}
$$

This is the CRT density for n≡0 mod a, n≡2 mod b. For any integer
subinterval, its count differs from its length times δ(a,b) by less than
1 in the compatible case, and both quantities vanish otherwise.

Expanding (9) on both sides, define the **discrete density term**

$$
 M_L=\sum_{n\in J_x}\sum_{d>U,e>Y\atop de\le L}
       \mu(d)\mu(e)\sum_{r\in P_V,s\in P_Z}
       \alpha_r\alpha_s f_r(n;d)f_s(n-2;e)\delta(dr,es).         \tag{11}
$$

No numerical quadrature or limit is hidden in this definition. Each
smooth weight F(n)=f_r(n;d)f_s(n−2;e) is nonnegative and nondecreasing
on J_x, with size at most log²x. Discrete partial summation bounds the
weighted count minus its density term by at most 2F(x). Summing absolute
errors **only after this exact expansion** gives

$$
 |R_{\le L}-M_L|
 \ll \#\{(d,e):de\le L\}
       \left(\log x+\sum_{r\le V}\Lambda(r)\right)
       \left(\log x+\sum_{s\le Z}\Lambda(s)\right)
 \ll L VZ\log^3x.                                             \tag{12}
$$

The elementary bounds #pairs≤L(1+log L) and Σ_{r≤V}Λ(r)≤V log V
suffice. The cost is charged to every expanded congruence, including
those with no solution in this finite interval.

## 4. The signed density term cancels uniformly

It remains to justify the signed estimate for M_L, not assume that an
unweighted average applies after adding arbitrary coefficients.
Fix n,e,r,s. Terms with μ(d)=0 vanish. Write d=2^ε a with a odd and
ε∈{0,1}, r=2^ρ r_o, es=2^τ b_o, with r_o,b_o odd.
The kernel (10) is zero unless

$$
 (r_o,b_o)=1,\qquad(a,b_o)=1,\qquad
                      \min(\epsilon+\rho,\tau)\le1.            \tag{13}
$$

When these hold, its numerator is the constant
2^{min(ε+ρ,τ)}, independent of a. The remaining d sum is a constant
of absolute value at most 2/(e r s) times one of the sums (8), over
U/2^ε<a≤L/(2^ε e), with excluded-prime integer m=2b_o≤2es≤x²
eventually. The sign μ(d)=(-1)^ε μ(a) is retained. Conditions (13)
include the nonprimitive even branches; assuming gcd(dr,es)=1 would
miss actual terms.

Use (8) on this inner sum before taking its absolute value. The outer
e harmonic sum costs O(log x). The r and s sums cost at most fixed
logarithmic powers, since
Σ_{r≤V}Λ(r)/r≪log²x, and likewise for Z; an r=1 or s=1 term adds
at most another log x already allowed in (8) or in the outer weight.
All costs are absorbed by its arbitrary H. Finally summing n∈J_x proves

$$
                            M_L\ll_H x/\log^H x.               \tag{14}
$$

Combining (12), (14) and L VZ≤x^(70/100+24/100+5/100) proves (1).
The excluded-prime parameter depends on e and s, but (7) is uniform in
that parameter. It would be insufficient to cite only a fixed-m mean
estimate here.

This calculation belongs to classical correlations of truncated divisor
sums. For related literature, [Goldston–Yıldırım, *Higher correlations of
divisor sums related to primes I*](https://arxiv.org/abs/math/0111212)
studies such truncated prime approximations. Its abstract is used here
only to identify the literature, not as an imported theorem or a claim
that its precise hypotheses match our cutoff. Equations (5)–(14) supply
the argument actually needed in this note.

## 5. What remains is an explicit endpoint discrepancy

Write D₀=⌊x/(V+1)⌋, E₀=⌊(x−2)/(Z+1)⌋ and

$$
 \mathcal W_>=\{(d,e):U<d\le D_0,\ Y<e\le E_0,\ de>L\}.
$$

These global bounds contain every original term of R_{>L}. On expanding
(9) over W_>, additional n for which n/d≤V or (n−2)/e≤Z contribute
zero after the β expansion, exactly. No moving endpoint is silently
replaced. Define M_> by (11) with W_> as its divisor region. At each e,
the d interval is max(U,L/e)<d≤D₀, and m=2b_o≤2es≤x² eventually.
The same proof using (8)–(13) gives M_>≪_H x/log^H x.

For compatible a=dr,b=es, put g=(a,b), q=ab/g and choose

$$
 j_0\equiv(2/g)(a/g)^{-1}\pmod{b/g},\qquad
 0\le j_0<b/g,\qquad n_0=a j_0.                               \tag{15}
$$

When b/g=1 take j₀=0. Then n₀ represents the unique CRT class modulo q.
Let A=x/2, B=x, ψ(u)={u}−1/2, and, at integer m∈[A,B], define

$$
 \Delta_{a,b}(m)=\#\{A<n\le m:n\equiv n_0\pmod q\}
                                      -{m-A\over q}
       =\psi((A-n_0)/q)-\psi((m-n_0)/q).                       \tag{16}
$$

For incompatible a,b set Δ=0. For F(n)=f_r(n;d)f_s(n−2;e) define

$$
 \mathcal E_{d,e,r,s}
     =F(B)\Delta_{dr,es}(B)
       -\sum_{m=A+1}^{B-1}\Delta_{dr,es}(m)(F(m+1)-F(m)).       \tag{17}
$$

Exact discrete partial summation now gives the signed error

$$
 E_>(x)=\sum_{(d,e)\in\mathcal W_>}\mu(d)\mu(e)
             \sum_{r\in P_V,s\in P_Z}\alpha_r\alpha_s
                      \mathcal E_{d,e,r,s},\qquad
 R_{>L}=M_>+E_>.                                               \tag{18}
$$

In particular S(x)=C₂x+E_>(x)+O_H(x/log^H x) for every fixed H. The
sufficient fixed-fraction improvement is still **OPEN**: for some fixed
η>0 on unbounded dyadic scales, E_>(x)≥−(1−η)C₂x+o(x), or the sufficient
limsup scale-average version in the preceding decomposition note.

The [endpoint target audit](endpoint-target-audit.md) retains the rate
S=C₂x+E_>+O_H(x/log^H x) for every fixed H. Thus the weaker condition
C₂x+E_>≥c*x/log^K x, with fixed c,K>0 on unbounded dyadic scales,
also suffices, as does its logarithmically rescaled average. These
endpoint hypotheses are OPEN. A fixed-fraction saving is optional.

The remaining original cofactors obey kv=n(n−2)/(de)<x²/L, so their
product is O(x^(13/10)). The expanded moduli have a=dr≤x and b=es≤x,
and q=ab/g can be as large as order x². A proposed import must retain
these ranges and g∈{1,2}, rather than assuming a small prime modulus.

The inverse residue is explicit in n₀/q=j₀/(b/g). Equations (15)–(18)
are an exact interface, retaining μ(d)μ(e), the prime-power
α coefficients, the product restriction and all endpoint weights.
[endpoint-fourier.md](endpoint-fourier.md) applies a named bound to an
additional rectangle within this complement; the full interface remains
unestimated.

For W_>, the preceding absolute endpoint argument costs at most
O(D₀E₀VZ log²x)=O(x²log²x), which is worse even than the existing
O(x log⁴x) absolute bound on R. Beyond L VZ≈x, extending (12) without
additional cancellation supplies no scale-x saving. This is an
insufficient bound, not a refutation of the signed endpoint target.

## 6. Finite checks using the saved input

These **measurements do not test the asymptotic rate in (1)**. The validator
reads the previously retained factorizations without regenerating the old
archived sieves. An independent cofactor-factor enumeration reproduces
each archived total from the previous producer, partitions at the exact
integer L, and retains signed and absolute sums in dyadic (d,e) blocks.
Partial archived windows stay normalized per measured partner, never per x.

The independent checks cover the parity kernel (13), convolution (5),
inverse residues and exact discrepancy numerators (15)–(16), weighted
summation (17), and the full four-term CRT expansion. A custom small
case exercises both β expansions and the large-product region, including
the zero contributions from cofactors below cutoff. Integer checks are
exact; log-weighted checks use compensated sums and a tolerance relative
to their absolute mass. These check the algebra, not the imported mean
theorem or its asymptotic application.

| Archived q | x used for cutoffs | L | R_{≤L}/partner | R_{>L}/partner | Positive small-product mass/partner | Negative small-product mass/partner |
|---:|---:|---:|---:|---:|---:|---:|
| 97 | 16,384 | 891 | 4.742685 | −1.430889 | 54.499526 | 49.756841 |
| 997 | 1,048,576 | 16,384 | 7.470655 | −1.295413 | 176.451166 | 168.980511 |
| 9,973 | 134,217,728 | 489,178 | 0.307756 | 2.503601 | 571.548433 | 571.240677 |

The signed small-product averages are not monotone. Even the largest
archived x has Y=Z=2, and the windows are short prefixes; these values
do not imply a limiting bound for a full interval. The dyadic block
triangle sums also remain substantial in these finite runs. Grouping
alone, without its analytic estimate, does not certify a saving.

The finite CRT budgets expose both terms of (2). At the full canonical
x=65,536, the small-product sum is 40,953.274149; its density term is
39,609.307171 and its endpoint error is 1,343.966978. Thus one must not
set the asymptotically negligible density term to zero in this finite
calculation. The actual positive/negative values and block summaries are
retained in [data-reuse/signed-grouping.json](data-reuse/signed-grouping.json),
with the source hash and coordinates. Its producer and all bound output
are in [signed-divisor-validation.js](signed-divisor-validation.js).

## 7. The next first move and falsifiers

The Fourier and theorem audit is recorded in
[endpoint-fourier.md](endpoint-fourier.md). Aggregating the small
prime-power coefficients before applying Vaaler and Bettin–Chandee
controls the additional rectangle d~x^0.27, e~x^0.46, beyond de≤L.
It includes the entire majorant, both parity branches and the endpoint
phase cost. This does not extend the uniform product cutoff to x^0.73.
The coefficient audit in [coefficient-structure.md](coefficient-structure.md)
removes sparse endpoint sectors on a further rectangle and isolates
its remaining squarefree correlation. That note's section 6 owns the
next move. Preserve both the smaller-margin consumer in
[endpoint-target-audit.md](endpoint-target-audit.md) and the stronger
fixed-fraction option, including their respective scale averages.

The small-product proof would fail if the excluded-prime convolution
lacked the stated uniform norm bounds, an even CRT branch were omitted,
the β cutoff were expanded incorrectly, or its total endpoint errors
exceeded (12). These have explicit written checks and finite algebra
controls. Numerical cancellation in an archived prefix is not a substitute
for any of them. The group estimate (1) is completed work to reuse; the
signed endpoint estimate (18) remains the open research task.
