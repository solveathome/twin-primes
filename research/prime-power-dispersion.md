# Resolving the nonsquarefree coefficient into prime powers

<!-- ledger
id: Q-prime-power-dispersion
status: ANSWERED
todo: C
parity: The exact nonsquarefree coefficient splits into a small-norm exceptional part and odd prime-power sums. A second moment retains the prime powers and harmonics, including zero numerators and all prime-power gcd factors, and uses classical composite-modulus completion with an averaged common-divisor gcd. Power bands keep the estimates uniform as the power grows. Paired endpoints also remove the earlier harmonic cut in the prime case. Both gcd branches, the full positive majorant and the original density bound remain present; the global twin margin stays OPEN.
question: Does the repeated-prime structure control the BB contribution beyond its two-norm bound, and can a prime-power moment include every harmonic uniformly?
verdict: The decomposition leaves an exceptional coefficient with norm at most sqrt(D) times logarithms; its odd prime-power core has a derived all-harmonic dispersion bound. The same bound for first powers removes the former left-prime cutoff and unpaired diagonal constraint. Two strict inequalities control a region including d~x^0.247, e~x^0.612 at product scale x^0.859. Their product-exponent supremum is 5757/6700, not a uniform product cutoff or a twin lower bound. Exact finite checks run separately from this classical-input derivation.
-->

**The full endpoint remainder and twin-prime infinitude remain OPEN.**
The computations in this pass test a specified decomposition and prime-power
moment. The regional bound below is a written derivation using the existing
classical inputs, not an inference from numerical cancellation. No novelty,
effective onset or percentage of the twin-prime problem solved is claimed.

## 1. The question and computation budget

The preceding [sparse dispersion](sparse-dispersion.md) leaves BB and the
left-prime cross moment tight at its region's corner. BB used only the two
global norms. The proposed falsifier is a failure of the exact coefficient
split, its counting bound, the prime-power phase identity, or the complete
moment budget. The user authorized computations shorter than fifteen minutes.
The new [validator](prime-power-dispersion-validation.js) has a three-minute
internal cap and was run with the embed tool's 190-second timeout. It reuses
the saved base primes, generates bounded coefficient tables through 1,048,576,
and retains [the complete test summaries](data-reuse/prime-power-dispersion.json).
The tables are for coefficient identities, not a larger twin-prime sweep.

The result of checking the argument is a simplification: decompose only the
left nonsquarefree coefficient, and allow every right coefficient throughout.
There is no need to expand both sides of BB simultaneously.

## 2. Separate the exceptional coefficient from the odd prime powers

Use I=(D,2D], W>=2, and the coefficient B from
[coefficient-structure.md](coefficient-structure.md). If l has exactly one
repeated prime, write l=p^k m, k>=2, m squarefree, p not dividing m. Then

$$
 B(p^k m)=\mu(m)\log p\left[
     1_{p^{k-1}\le W}1_I(pm)-1_{p^k\le W}1_I(m)\right].       \tag{1}
$$

It is zero on integers without exactly one repeated prime. The two interval
indicators in (1) cannot both hold. Define B_exc to be the first term in (1)
for every p, together with the negative second term when p=2. For k>=2 put

$$
 B_k(\ell)=-\sum_{\substack{p\text{ odd prime},\ p^k\le W\\
                      \ell=p^k d,\ d\in I,\ p\nmid d}}
                                      \mu(d)\log p.
 \qquad B=B_{\rm exc}+\sum_{k\ge2}B_k.                      \tag{2}
$$

The sum over k has O(log W) terms. Any nonzero term forces squarefree d,
so its repeated prime and exponent are unique. No cancellation between
different representations is needed for the following improvement:

$$
 \#\operatorname{supp}B_{\rm exc}\ll D\log^2(2DW),\qquad
 \|B_{\rm exc}\|_2\ll\sqrt D\log^2(2DW).                    \tag{3}
$$

Indeed for the first branch p<=2D, and pm in I allows at most
D/p+1<=3D/p choices of m. For each p there are O(log(2W)) allowed
exponents. Summing 1/p over p<=2D costs at most O(log(2D)), even using
the harmonic sum over integers. The negative p=2 branch contributes
O(D log(2W)) more entries. Each coefficient is bounded by log(2DW),
which gives (3). The support is still at most 2DW: the smaller norm
does not permit replacing the full support by O(D).

Write the squarefree prime coefficient Q as Q_2+Q_odd. Its single-prime
piece Q_2 is logarithmically bounded with support O(D). For the dispersion
calculation set B_1=Q_odd. Thus for every k>=1 its nonzero representations
have the same weight -mu(d)log p with odd p, p not dividing d, and p^k<=W.
The first-power case may have multiple representations, as in the exact Q
formula; aggregation is retained before any norm bound.

## 3. Use bands in the prime power, not just in its base

Fix k>=1 before taking a second moment. Split p^k into bands

$$
                    R\le p^k<2R,\qquad P=R^{1/k}.             \tag{4}
$$

There are O(P) possible prime bases, with an absolute constant independent
of k. Both p^k and the product of two such powers have uniform size bounds.
This detail is necessary: p in (P,2P] would let p^k vary by 2^k, which
is not an absolute constant when k grows with log x. We sum O(log x)
power bands and O(log x) exponents only after bounding each moment.
There are no mixed-exponent pairs inside a moment.

For the left side take W=V, and write the compatible expanded divisors
l=gm, j=gn, (m,n)=1, g in {1,2}. A retained representation is m=dp^k
with gd in I. Let beta_g(n) be any right coefficient on n~N, and put
F=||beta_g 1_(n~N)||_2. It can be the actual A0,A1 or any of their
coefficient sectors. In all cases F<<sqrt(N)log^C x.

Inverse reciprocity, as in dispersion-range.md (7), gives the exact factors

$$
\begin{split}
 \widetilde\Phi_{p,h,d}(n)&=
   \mathrm e\left(\frac{h(z_0-2)}{gdp^k n}\right)
      -\mathrm e\left(\frac{h(z-2)}{gdp^k n}\right),\\
 Y_d(n)&=\sum_{p\in\mathcal P_d}\sum_{h\sim A}(\log p)c_h
       1_{(n,dp^k)=1}\mathrm e_{dp^k}(\theta h\overline n)
                                        \widetilde\Phi_{p,h,d}(n),
 \qquad \theta=2/g.
\end{split}                                                     \tag{5}
$$

Here z0=x/2, z0<=z<=x, and c_h are the actual Vaaler coefficients.
The set P_d retains (4), p^k<=V, dp^k~M and p not dividing d. A nonempty
box has M comparable to DR, uniformly in k and g. Both endpoints shift
by 2. Cauchy in n and then in d yields

$$
 |\mathcal B_k|^2\ll F^2D\sum_{gd\in I}\sum_{n\sim N}|Y_d(n)|^2.
                                                               \tag{6}
$$

Only the nonnegative moment is enlarged to all d in this interval. The
conditions p not dividing d and n being a unit remain inside Y. In the g=2
branch the original mu(gd) kills even d, while a right B(gn) may have
even n. No odd-n restriction is imposed on that coefficient.

## 4. Zero numerators and the full prime-power gcd

The n kernel obtained by expanding (6) has

$$
 (c,r)=\begin{cases}
 (dp^k,\ \theta(h_1-h_2)),&p_1=p_2=p,\\
 (d p_1^k p_2^k,\ \theta(h_1p_2^k-h_2p_1^k)),&p_1\ne p_2.
 \end{cases}                                                   \tag{7}
$$

Distinct primes have r=0 exactly when h1=j p1^k, h2=j p2^k for a
positive integer j. For each pair there are O(A/R) such solutions, or
none; if a solution exists then A is comparable to or larger than R,
which absorbs the endpoint constant. Together with identical pairs, the
zero-numerator weight is

$$
 \sum_{r=0}\log p_1\log p_2\,|c_{h_1}c_{h_2}|
       \ll\left(\frac P A+\frac{P^2}{AR}\right)\log^C x
       \ll\frac P A\log^C x,                                \tag{8}
$$

since P<=R. For every nonzero r, p_i not dividing d and p_i odd give

$$
 \gcd(r,c)=\gcd(r,d)H,\quad
 H=\begin{cases}
 \gcd(h_1-h_2,p^k),&p_1=p_2=p,\\
 \gcd(h_1,p_1^k)\gcd(h_2,p_2^k),&p_1\ne p_2.
 \end{cases}                                                   \tag{9}
$$

The prime-power factors cannot be replaced by their radicals. For example
gcd(25,5^2)=25, not gcd(25,5)=5. Nor can distinct-prime zero pairs be
omitted: (p1^k,h1)=(25,25) and (p2^k,h2)=(49,49) have equal frequency.

For alpha=1/2 or 1,

$$
 \sum_{h\sim A}\gcd(h,p^k)^\alpha\ll A(k+1),\qquad
 \sum_{h_1\ne h_2\sim A}\gcd(h_1-h_2,p^k)^\alpha
                                      \ll A^2(k+1).           \tag{10}
$$

To see this uniformly in k, majorize gcd(h,p^k)^alpha by
sum_(0<=j<=k,p^j|h) p^(j alpha). Only p^j<=2A can divide a positive
h<=2A, and their multiples number at most 2A/p^j. Each j contributes
O(A) since alpha<=1. For nonzero differences use their absolute values
up to A, each with at most O(A) realizations. The singleton h=1 obeys
the same bounds. Thus the normalized harmonic average of H^alpha for a
fixed prime pair is O((k+1)^2), with r=0 excluded where necessary.
These factors cost only logarithms because k=O(log x).

Now apply the already derived average
sum_(d~D) gcd(r,d)^alpha << D*tau(|r|) for r!=0. The numerator in
(7) is independent of d and polynomially bounded in x. Restrictions on
d can be dropped after taking a nonnegative bound. This retains the
complete prime-power factor and averages the remaining common divisor.

## 5. Paired endpoints bound the entire harmonic range

As in the preceding notes, directly dispose of MN<=x^(1-tau), using
|Delta|<=1 and logarithmic pointwise bounds. Else put
T=ceil(x^(2tau)max(1,MN/x)) and retain all harmonics 1<=|h|<=T.
The entire positive approximation majorant is bounded by the divisor-count
argument in endpoint-pairing.md. It receives no paired factor.

For the polynomial on h~A, let r_phase=Ax/(DRN), f=min(1,r_phase).
The actual product of the two endpoint factors in (5) has supremum plus
total variation O(f^2(1+r_phase)); this is the derivative argument of
sparse-dispersion.md (9), with the shifted endpoints. It is uniform in
k because differentiation is in n and dp^k~M. On the retained boxes
r_phase<<x^(3tau).

Classical completion of an interval of length at most N gives

$$
 \left|\sum_{n\in\mathcal I,(n,c)=1}\mathrm e_c(r\overline n)\right|
 \ll_\epsilon x^\epsilon\left(\sqrt{cG}+(N/c)G\right),
 \qquad G=\gcd(r,c).                                         \tag{11}
$$

This is derived in prime-dispersion.md from the
[Ramanujan and composite-modulus Weil bounds, Pascadi Lemmas 3.2--3.3](https://link.springer.com/article/10.1007/s00039-026-00746-0),
reread for this application. Full periods and nonprimitive numerators are
included; there is no squarefree-modulus hypothesis or new bilinear input.

Using (8)--(11), and suppressing fixed logarithmic factors, the moment in
(6) is bounded by

$$
 f^2\left[\frac{DNP}{A}
    +x^{3\tau+\epsilon}\left(D^{3/2}RP^2
                         +D^{3/2}R^{1/2}P+N\right)\right].   \tag{12}
$$

For the cross-prime Weil term, sum_d sqrt(d p1^k p2^k gcd(r,d))
is at most x^epsilon D^(3/2)R, times H^(1/2). Then (10) sums the
harmonic weights, and the prime pairs give P^2. Same-prime terms have
R^(1/2) and P instead. For complete periods sum_d gcd(r,d)/d costs
x^epsilon; the remaining prime factors are at most N P^2/R^2 or
N P/R after (10). Both are bounded by N. They have not been discarded.

Apply (6) and the envelope f/sqrt(A)<=sqrt(x/(DRN)). This gives

$$
 |\mathcal B_k|\ll x^\epsilon F\left[
    \sqrt{DxP/R}+x^{3\tau/2}\left(
         D^{5/4}R^{1/2}P+D^{5/4}R^{1/4}P^{1/2}+\sqrt{DN}
                                      \right)\right],        \tag{13}
$$

up to fixed logarithms uniform in k. This is a moment partial-summation
argument, not extraction of a pointwise factor from a signed sum. The
zero term uses the pairing; the other terms safely use f<=1.
For k=1, P=R, while for k>=2, P<=sqrt(R). Therefore:

| contribution | k=1, R<=V | k>=2, R<=V |
|---|---|---|
| cross-prime term after F | D^(5/4)V^(3/2) | D^(5/4)V |
| same-prime term after F | D^(5/4)V^(3/4) | D^(5/4)V^(1/2) |
| all zero numerators after F | sqrt(Dx) | at most sqrt(Dx) |
| complete periods after F | sqrt(DN) | sqrt(DN) |

The first-power application also removes the earlier prime cut: all
nonprimitive frequencies are included by (8)--(10). Summing the exponents,
power bands, divisor boxes and harmonic boxes costs fixed logarithms.

## 6. The resulting full region

Keep w=6/25, v=1/20, a=delta+w, b=nu+v, and

$$
 C(a,b)=3/20+7(a+b)/10+\max(a,b)/4,
 \qquad W_L(a,b)=5a/4+b/2+w/4.
$$

Precisely, U=V=floor(x^w), Y=Z=floor(x^v), D=floor(x^delta),
E=floor(x^nu), I=(D,2D] and J=(E,2E], with x dyadic. The residual
R_IJ is the restriction of the determinant-2 sum in
shifted-prime-decomposition.md (2) to d in I, e in J.

Assume delta>w, nu>v, a,b<1, and just the two strict conditions

$$
                      C(a,b)<1+w/2=28/25,\qquad W_L(a,b)<1.
                                                               \tag{14}
$$

Then for every fixed H,

$$
                           R_{I,J}(x)=O_H(x/\log^H x).         \tag{15}
$$

Here is the complete coefficient allocation, against any right sector:

| left coefficient | justification |
|---|---|
| L0, L1, Q_2 | paired bound with support O(D) and norm O(sqrt(D) log^C x) |
| B_exc | paired bound with support O(DV) and norm O(sqrt(D) log^C x) |
| Q_odd=B_1 | (13) with k=1 |
| each B_k, k>=2 | (13) with P<=sqrt(R) |

For B_exc the two paired exponents from dispersion-range.md (4) are
C-w/2 and G-w/2, where G=7(a+b)/8+max(a,b)/8. The first is below
1 by (14); G<=(25/22)(C-3/20) gives G-w/2<2161/2200<1.
The low terms save at least 7w/10 in the first exponent and 7w/8 in the
second. This application retains separate coefficient norms and full
supports, as required by the already checked
[Bettin--Chandee Theorem 1 and Remark 1](https://arxiv.org/pdf/1502.00769).

Substituting F<<sqrt(N)log^C x, N<<x^b and D<<x^(a-w) in (13),
the k=1 cross exponent is W_L. Every k>=2 cross exponent is at most
W_L-w/2. Same-prime terms are smaller. The zero and complete-period
exponents are respectively

$$
                  J=1/2+(a+b)/2-w/2,\qquad P_0=b+a/2-w/2.
                                                               \tag{16}
$$

They are not new constraints here. Since a>2w and W_L<1,
a+b<2-7w/2=29/25, hence J<24/25. Also
P0=2W_L-w-2a<2-5w=4/5. All margins except the two in (14)
are thus bounded away from zero. Choose tau and the fixed epsilon
sufficiently small, then sum the logarithmically many pieces. The
positive majorant remains controlled, and uniformity in z restores the
original smooth logarithmic weights. The existing signed density argument
is applied before this endpoint decomposition and retains arbitrary fixed
logarithmic precision. This proves (15) using the stated classical inputs.

## 7. Concrete rectangle and the limits of this calculation

For a=0.487, b=0.662, we have delta=0.247, nu=0.612 and product
scale x^0.859. The seven checked budgets are

| contribution | exponent before fixed small losses |
|---|---:|
| B_exc first paired term | 0.9998 |
| k=1 cross-prime term | 0.99975 |
| all zero numerators | 0.9545 |
| complete periods | 0.7855 |
| k>=2 cross-prime terms | at most 0.87975 |
| k=1 same-prime terms | 0.81975 |
| low left terms, first paired term | 0.9518 |

For example tau=1/100000 leaves strict margins. The preceding BB norm
budget here is 1.0473, and its unpaired left-prime diagonal is 1.029.
Those estimates are insufficient; (3) and (13) replace them. No missing
piece is assumed small because it was small at a different rectangle.

The exact supremum of delta+nu under (14) is

$$
                      {5757\over6700}=0.859253\ldots.          \tag{17}
$$

Indeed max(a,b)>=b gives 14a+19b<97/5, and W_L<1 gives
5a+2b<94/25. Multiply these by 3/67 and 5/67 and add to obtain
a+b<77/67. The intersection

$$
                        a_*={816\over1675},\qquad
                        b_*={1109\over1675}                  \tag{18}
$$

has b*>a*, a*>2w and all auxiliary budgets strict. Decreasing both
slightly approaches (17) within the region. The bound optimizes these
two sufficient inequalities only. It does not control all products below
x^(5757/6700), all large divisor pairs, or the global twin margin.

At (18) the exceptional coefficient norm budget and the signed first-power
cross moment are tight. The odd prime-power core of BB is no longer the
limiting term at this region's boundary. The next audit should combine
the available regions with uniform margins and identify the complete
uncontrolled remainder before optimizing further boundary constants.
For a further local extension, retain the first branch of (1) inside
B_exc and the actual signed cross moment before its final triangle
inequality. Improving only one leaves the other limiting term unchanged.

## 8. Checks, rejected shortcuts and reuse

The validator builds the original truncated convolution independently of
(1)--(2), checks its exceptional and core parts and the support-count
majorant, and tests prime-power harmonic averages. Its moment tests
include k=1,2,3,4,8; both gcd branches; low and high harmonic selections;
zero numerators; intermediate and full prime-power gcd factors; every
right coefficient type; and small and large endpoint phase ratios.
The actual c_h are multiplied by the common A only for finite numerical
conditioning. This scales both sides of every identity equally. High-band
tests use specified harmonic subsets: they validate those identities, not
a measurement of the full asymptotic polynomial. The uniform all-harmonic
bound is the derivation (8)--(13).

Integer inverses, pair numerators, composite moduli and residues are BigInt.
Only the final reduced phase and coefficient weights use floating point.
The large-power controls explicitly compare the residue with unsafe Number
arithmetic. Complex phase identities are tolerance-checked; modular and
gcd identities and the boundary certificate are exact integer checks.
The omitted endpoint shift is also tested as a failing control.

The completed run checks 1,883,736 coefficient identities, 1,152 harmonic
gcd/counting bounds, fifteen distinct-prime collision counts, eighty
weighted moments, 1,434,208 pair phases and 197,736 shifted endpoint
identities. Among the terms retained are 10,612 distinct-prime zero terms
and 217,616 nonzero terms with a prime-power gcd. Ordinary Number residue
arithmetic disagrees with the BigInt answer on 55,284 of the 56,368
kernels tested above the safe integer range. The script completed in
3.3 seconds. All fourteen strict QC gates have zero findings, verifier
self-tests pass (58 positives, 47 controls), and the independent existing
numerical audit passes 251/251 checks in 165.2 seconds. The numerical
runs therefore used under three minutes, within the authorized budget.
These checks are distinct from the asymptotic proof review.

The following shortcuts are invalid: retaining only identical zero pairs,
replacing a prime-power gcd by its radical, treating 2^k as an absolute
constant for growing k, or shrinking B_exc's support with its norm.
The first two have explicit finite witnesses above; the growing-band issue
is avoided by (4). None invalidates the older arguments at their stated
prime/harmonic cuts or fixed exponents. An unrelated wording error in
OUTCOMES.md is corrected: the old 1.01195 sparse budget was already
paired, not an unpaired endpoint estimate.

Reuse the norm (3), the uniform moment (13), or the full region (14), with
their stated hypotheses. The numerical checks supply no asymptotic
cancellation rate and no evidence that all of the remaining signed sum
has the lower margin needed for twins.

The [coverage follow-up](residual-coverage.md) retains the exceptional
first branch inside a moment on its shorter base interval. Together with
a prime-free moment it removes the exceptional norm condition from the
full-coefficient estimate. It also justifies exact product/monomial cuts
and identifies their global complement. Consume that result before
attempting another exceptional-norm optimization; (14) remains a valid
sufficient region, with the scope and checks recorded here.
