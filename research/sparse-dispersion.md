# Dispersion of the sparse coefficient, including frequency collisions

<!-- ledger
id: Q-sparse-dispersion
status: ANSWERED
todo: C
parity: The left nonsquarefree norm is kept inside Cauchy while the right prime and harmonic averages remain in a second moment. Exact rational-frequency collisions and distinguished-prime gcd factors are counted, rather than excluded by a false prime-greater-than-harmonic hypothesis. Classical composite-modulus completion, the averaged-gcd lemma, paired endpoints and the full positive majorant control a stated region of full rectangles. The full twin margin remains OPEN.
question: Can the opposite dispersion orientation control the left nonsquarefree sector beyond the previous sparse-norm boundary, and what signed second moment remains at the resulting boundary?
verdict: A paired second-moment bound controls the left B/right Q sector with all harmonics, including distinct-prime zero numerators. Combined with the existing left-prime dispersion and sparse bounds for other sectors, it controls d~x^0.275, e~x^0.541 at product scale x^0.816. The product-exponent supremum of the stated sufficient inequalities is 1368/1675. The remaining tight budgets are BB and the left-prime cross moment; neither a uniform product cutoff nor a twin lower bound follows.
-->

**The full endpoint remainder and twin-prime infinitude remain OPEN.**
This note derives a further region of full rectangles using the existing
classical inputs. Its new calculation is the left B/right Q sector, where
B is the nonsquarefree coefficient and Q the squarefree prime sum of
[coefficient-structure.md](coefficient-structure.md). No novelty or effective
finite onset is claimed. Finite checks below test the identities and budgets;
they do not measure an asymptotic cancellation rate.

## 1. Region and coefficient accounting

Keep the cutoffs and rectangles of [dispersion-range.md](dispersion-range.md):

$$
 w=6/25,\quad v=1/20,\quad a=\delta+w,\quad b=\nu+v,
 \quad t=a+b,\quad u=\max(0,t-1),
 \qquad C(a,b)=3/20+7(a+b)/10+\max(a,b)/4.
$$

Assume delta>w, nu>v, a,b<1 and the strict inequalities

$$
\begin{split}
 C(a,b)&<1+(w+v)/4=429/400, &\text{BB and low sectors},\\
 t-w/2&<1, &\text{left-prime diagonal},\\
 W_L:=(5/4)a+b/2+w/4&<1, &\text{left-prime cross term},\\
 C(a-w+u,b)&<1, &\text{small left primes},\\
 W_{BQ}:=a/2+(5/4)b+v/4-w/4&<1. &\text{right-prime cross term}
\end{split}                                                     \tag{1}
$$

Then for every fixed H,

$$
                         R_{I,J}(x)=O_H(x/\log^H x).           \tag{2}
$$

The endpoint error has a fixed power saving; the already derived density
bound has arbitrary fixed logarithmic saving. All margins are fixed before
x tends to infinity. This is a sufficient region, not a product cutoff.

Here is a complete allocation of the sixteen coefficient sectors:

| left type | right type | estimate |
|---|---|---|
| L0 or L1 | any | paired sparse-norm bound |
| B | L0, L1 or B | paired sparse-norm bound |
| B | Q | sections 2--5 below |
| Q | any | dispersion-range.md sections 3--5 |

For BB the paired first budget is C-(w+v)/4. For B against a right low
term it is at most C-w/4-7v/10; for a left low term it is at most
C-7w/10. Thus the first line of (1) controls all rows assigned to the
paired bound. Its second budget is also controlled: with
G=7t/8+max(a,b)/8, use G<=(25/22)(C-3/20). The BB budget is
G-(w+v)/4<1 under (1); the low sectors save still more in that budget.
These are support-and-norm substitutions in dispersion-range.md (4),
not discounts assumed to hold pointwise on every smaller box.

The left-Q argument needs only lines 2--4 of (1) once the other left
sectors have been removed. Choose u<kappa<w with C(a-w+kappa,b)<1.
Its retained left primes exceed every harmonic after taking tau small.
Both endpoint shifts by 2 in that reciprocal orientation are unchanged.

## 2. The opposite orientation and the actual sparse norm

Fix g in {1,2}, expanded-divisor boxes m~M,n~N and positive harmonics
h~A, clipped at T. Split the right primes into dyadic bands q~Q, q odd.
The single prime 2 has right support O(E); the same budget as a right
low sector controls it. For each e with ge in J=(E,2E], let P_e contain
the primes in this band with q<=Z, eq~N and q not dividing e. Thus
N is comparable to EQ (g costs constants). Put theta=2/g and

$$
\begin{split}
 \Phi_{q,h,e}(m)&=\mathrm e\left(\frac{hz_0}{gmeq}\right)
                      -\mathrm e\left(\frac{hz}{gmeq}\right),\\
 Y_e(m)&=\sum_{q\in P_e}\sum_{h\sim A}(\log q)c_h
      1_{(m,eq)=1}\mathrm e_{eq}(-\theta h\overline m)
                                      \Phi_{q,h,e}(m),\\
 \mathcal B&=-\sum_{ge\in J}\mu(ge)\sum_{m\sim M}B(gm)Y_e(m).
\end{split}                                                     \tag{3}
$$

Here z0=x/2, z0<=z<=x and c_h is the actual Vaaler coefficient. These
are the original orientation's endpoints: there is no reciprocal shift
in (3). The exact right-Q weight is -mu(ge)log q. Cauchy first in m,
then in e gives, writing F for the restricted left norm,

$$
 |\mathcal B|^2\ll F^2 E\sum_{ge\in J}\sum_{m\sim M}|Y_e(m)|^2,
 \qquad F=\|B(gm)1_{m\sim M}\|_2
 \ll \min(\sqrt M,D^{1/2}V^{1/4})\log^C x.                 \tag{4}
$$

The nonnegative moment may be enlarged to all e in this interval;
q not dividing e and m being a unit stay inside Y. In the g=2 branch
mu(ge) kills even e in the original sum, but a left B(gm) may have
even m. No odd-m restriction is introduced.

As before, use |Delta|<=1 on MN<=x^(1-tau). Else take
T=ceil(x^(2tau)max(1,MN/x)). The entire positive Vaaler majorant is
controlled by the divisor-count lemma in endpoint-pairing.md. It does
not acquire a paired factor. We estimate only the polynomial below.

## 3. Frequencies can collide; their prime factors cannot be dropped

For two entries in (3), the m kernel has

$$
 (c,r)=\begin{cases}
 (eq,\ \theta(h_2-h_1)),&q_1=q_2=q,\\
 (eq_1q_2,\ \theta(h_2q_1-h_1q_2)),&q_1\ne q_2.
 \end{cases}                                                   \tag{5}
$$

Distinct primes have r=0 exactly when h1=kq1 and h2=kq2. For example,
(q1,h1)=(5,5) and (q2,h2)=(7,7) collide. Both lie in the prime band
(4,8] and harmonic band (4,8]. At the rectangle below, T can have
exponent 0.10602 while q<=x^0.05, so a q>2h hypothesis would be false.

For each fixed distinct-prime pair there are O(A/Q) such zero pairs,
or none when A is too small; the existence of a positive k absorbs
the endpoint constant. There are O(Q^2) prime pairs. Identical entries
number O(QA). With |c_h|<<1/A, the combined zero-numerator weight is

$$
 \sum_{r=0}(\log q_1)(\log q_2)|c_{h_1}c_{h_2}|
                              \ll (Q/A)\log^C x.            \tag{6}
$$

This includes all distinct-prime collisions and the ordinary diagonal.

For r!=0, q_i not dividing e implies exactly

$$
 \gcd(r,c)=\gcd(r,e)H,\quad
 H=\begin{cases}
 \gcd(h_2-h_1,q),&q_1=q_2,\\
 \gcd(h_1,q_1)\gcd(h_2,q_2),&q_1\ne q_2.
 \end{cases}                                                   \tag{7}
$$

The primes are odd, so theta causes no extra distinguished-prime factor.
The factor H need not be 1. For instance q=5,h1=5,h2=10,e=6 gives
r=5 at theta=1 and gcd(r,eq)=5, whereas gcd(r,e)=1.

For alpha=1/2 or 1, uniformly for a fixed prime pair,

$$
            A^{-2}\sum_{h_1,h_2\sim A,\ r\ne0}H^\alpha\ll1.
                                                               \tag{8}
$$

For distinct primes, separate the two h sums. The multiples of q in
(A,2A] number at most floor(2A/q), so
sum_h gcd(h,q)^alpha << A+A*q^(alpha-1) << A. For the same prime,
exclude h1=h2. For each h1, its nonzero differences divisible by q
number at most 2 floor(A/q); this again gives O(A^2) after the weight
q^alpha. Clipping any harmonic interval only decreases these positive
bounds. Dropping r=0 from (8) is essential in the e-average next.
The initial singleton h=1 obeys the same bounds with A=1.

For fixed nonzero r use dispersion-range.md (11):
sum_(e~E) gcd(r,e)^alpha << E*tau(|r|). The allowed e restrictions
may be dropped only after taking a nonnegative bound. The raw numerator
r is independent of e and polynomially bounded in x. This average,
together with (8), replaces the earlier requirement that every prime
exceed every harmonic. It also keeps composite common factors in e.

## 4. Pairing is valid inside this moment

Write R=Ax/(MEQ), f=min(1,R). Uniformly across the fixed boxes,

$$
 |\Phi|\ll f,\qquad
 \|\Phi_1\overline{\Phi_2}\|_\infty+
       \operatorname{Var}_{m\sim M}(\Phi_1\overline{\Phi_2})
                                         \ll f^2(1+R).        \tag{9}
$$

For R<=1, both |Phi| and its total variation are O(R), by subtracting
the endpoints before differentiating; the product has variation O(R^2).
For R>=1 the factors are bounded and each has variation O(R).
This proves (9). On the retained boxes R<<x^(3tau). Unlike pulling a
pointwise factor from a signed exponential sum, (9) is a partial-summation
bound for its actual smooth pair weight. On zero pairs, |Phi1 Phi2|<<f^2
is enough.

The completion input is, for an interval of length at most M,

$$
 \left|\sum_{m\in\mathcal I,(m,c)=1}\mathrm e_c(r\overline m)\right|
 \ll_\epsilon x^\epsilon\left(\sqrt{cG}+(M/c)G\right),
 \qquad G=\gcd(r,c).                                         \tag{10}
$$

It follows by full periods and Fourier completion from the classical
[Ramanujan and composite-modulus Weil bounds, Pascadi Lemmas 3.2--3.3](https://link.springer.com/article/10.1007/s00039-026-00746-0).
The full statements were reread for this application. Equation (10) is
derived in prime-dispersion.md; the complete-period term is retained.
No short-coefficient bilinear theorem is being imported.

Apply (7)--(10) to nonzero pairs, and (6) to zero pairs. Up to logs,
the moment in (4) is bounded by

$$
 f^2\left[EMQ/A+x^{3\tau+\epsilon}
     \left(E^{3/2}Q^3+E^{3/2}Q^{3/2}+M\right)\right].      \tag{11}
$$

For example a distinct-prime Weil kernel summed over e is bounded by
x^epsilon E^(3/2)sqrt(q1q2)H^(1/2); (8) sums the harmonic weights,
and summing the prime pairs gives Q^3. Equal-prime Weil terms give
Q^(3/2). For complete periods the e-average is
sum_e gcd(r,e)/e << x^epsilon. Its remaining factor is
M*H/(q1q2), or M*H/q for the same prime. Apply (8) with alpha=1
and sum prime reciprocals; both cost only logarithms. Thus this term
is M rather than a bound obtained by discarding its prime denominators.

Taking square roots in (4), and using f/\sqrt A<=sqrt(x/(MEQ))
for every A>0, gives the uniform polynomial block estimate

$$
 |\mathcal B|\ll x^\epsilon F\left[
   \sqrt{Ex}+x^{3\tau/2}
       \left(E^{5/4}Q^{3/2}+E^{5/4}Q^{3/4}+\sqrt{EM}\right)
                           \right].                          \tag{12}
$$

The zero contribution has been maximized with its paired factor;
nonzero terms safely use f<=1. This avoids a separate uniform low-h
cutoff, including on smaller M,N boxes. Keep the global norm F until
substituting supports: every remaining power of M,E,Q is nonnegative.

## 5. Substitute the sparse norm; finish every rectangle

Use F<<x^(a/2-w/4)log^C x, M<<x^a, E<<x^(b-v), Q<=Z<<x^v.
The powers in (12), before the small fixed losses, are

$$
\begin{array}{ll}
 J_{BQ}=1/2+t/2-v/2-w/4,&\text{all zero numerators},\\
 W_{BQ}=a/2+5b/4+v/4-w/4,&\text{distinct-prime Weil},\\
 W_{BQ}-3v/4,&\text{same-prime Weil},\\
 P_{BQ}=a+b/2-v/2-w/4,&\text{complete periods}.
\end{array}                                                    \tag{13}
$$

Line 2 of (1) gives J_BQ<1-v/2. Also
P_BQ=W_L-a/4-(w+v)/2<W_L. Therefore line 5 controls the only
additional possible limiting term. Choose tau and the theorem's epsilon
small compared with every strict margin. Summing logarithmically many
g, coefficient, divisor, prime and harmonic boxes preserves a fixed
power saving. Negative harmonics are conjugate estimates. The elementary
majorant estimate and the density argument are unchanged. Uniformity
in z restores the original logarithmic weights by partial summation.
This completes (2).

## 6. A concrete rectangle and the exact scope of its boundary

Take a=0.515, b=0.591, hence delta=0.275, nu=0.541. Their original
product scale is x^0.816. With kappa=0.12 the relevant budgets are

| contribution | exponent before losses |
|---|---:|
| BB first paired term | 0.99945 |
| left-prime cross term | 0.99925 |
| small left primes | 0.98795 |
| left-prime identical pairs | 0.986 |
| BQ zero numerators, paired | 0.968 |
| BQ cross-prime Weil | 0.94875 |
| BQ same-prime Weil | 0.91125 |
| BQ complete periods | 0.7255 |

Take tau=1/100000. Then T<<x^0.10602, below x^kappa, and all strict
budgets tolerate the fixed losses. The old bound for left B against
arbitrary right coefficients had exponent 1.01195 here; it is
insufficient. That is a failure of that estimate, not of cancellation.

The exact supremum of delta+nu in (1) is

$$
                       \frac{1368}{1675}=0.816716\ldots.       \tag{14}
$$

For an upper certificate, C<429/400 and max(a,b)>=b imply
14a+19b<369/20, while W_L<1 gives 5a+2b<94/25. Multiply these
by 3/67 and 5/67 respectively and add. This gives
a+b<1483/1340, hence (14). The intersection is

$$
                 a_*={1727\over3350},\qquad b_*={3961\over6700}.
                                                               \tag{15}
$$

Here b*>a*, the BB and W_L budgets equal 1, and all other conditions
are strict. One may fix kappa=0.12: the small-left-prime budget is
0.9885, u=143/1340<kappa, and W_BQ=318/335<1. Decrease a*,b*
slightly to obtain strict examples tending to (14). The two linear
inequalities therefore give the supremum of this stated region, not an
optimality theorem for other estimates or a uniform product cutoff.
The preceding region's supremum was 5397/6700, about 0.805522.

## 7. The signed cross-prime sum before the final triangle inequality

For the left-Q argument retain its exact Y_d(n) from
dispersion-range.md (8), including the shifted endpoints, actual c_h,
prime cut p>x^kappa, dp~M and p not dividing d. For a fixed divisor
and harmonic box write the enlarged nonnegative moment exactly as

$$
 \mathfrak M=\sum_{gd\in I}\sum_{n\sim N}|Y_d(n)|^2
                   =\mathfrak D+\mathfrak S+\mathfrak O,       \tag{16}
$$

where D is the identical-pair part, S has p1=p2,h1!=h2, and

$$
\begin{split}
 \mathfrak O={}&\sum_{gd\in I}
  \sum_{\substack{p_1,p_2\in P_d\\p_1\ne p_2}}
  \sum_{h_1,h_2\sim A}(\log p_1)(\log p_2)c_{h_1}\overline{c_{h_2}}\\
 &\quad\cdot\sum_{\substack{n\sim N\\(n,dp_1p_2)=1}}
 \mathrm e_{dp_1p_2}\left(\theta(h_1p_2-h_2p_1)\overline n\right)
       \widetilde\Phi_{h_1,p_1,d}(n)
                    \overline{\widetilde\Phi_{h_2,p_2,d}(n)}.
\end{split}                                                     \tag{17}
$$

Ordered pairs make O and S real; neither is required to be positive.
The Cauchy enlargement has removed the original mu(gd) and the right
coefficient, so their signs are **not** present in this target. Oscillation
in the kernel and endpoint weights remains. The estimate used so far
takes absolute values of individual n kernels, then averages their gcd
cost over d. It yields O<=|O|<<x^epsilon D^(3/2)V^3, including a
small endpoint-variation loss. Retaining (17) asks for an upper bound
on the actual sum, not independent control of every absolute kernel.

For a target block O(x^(1-eta)) with eta>0, the Cauchy consumer needs
Mfrak << x^(2-2eta)/(ND log^C x), where the fixed log power accounts
for the coefficient norms. If the known positive upper bounds for D
and |S| are already smaller, an upper bound of that order on O is
enough. Absolute smallness of O is a stronger sufficient input. Relative
to the current cross-prime power W_L, a saving x^(-gamma) in (17)'s
moment bound reduces the block exponent by gamma/2. Thus a strict
power saving requires gamma>2(W_L-1) when W_L>=1, with margin for
logs and variation. This is an OPEN quantitative target, not a proof.

At (15), improving (17) alone leaves this note's BB budget equal to 1.
The [prime-power follow-up](prime-power-dispersion.md) now splits B into
an exceptional part of smaller norm and odd prime-power sums. It prices
that core and the all-harmonic first-power moment, obtaining a larger
two-inequality region. Consume that result before another BB calculation.
For its all-prime version of (17), include the distinct-prime zero pairs
in the zero class and retain all prime gcd factors; the earlier cut here
excluded them. The sufficient global one-sided twin margin remains open.

## 8. Validation, failed shortcuts and reuse

The [validator](sparse-dispersion-validation.js) reuses the saved prime
table and writes [a retained artifact](data-reuse/sparse-dispersion.json).
It independently tests the exact B formula, the original BQ sum and
its Cauchy moment, composite-modulus pair phases, zero numerators,
nontrivial distinguished-prime factors, both gcd branches, the harmonic
averages, endpoint product variation, all sector budgets and the rational
boundary certificate. The finite cases include harmonics below and
above the prime band and a small endpoint difference. No larger sieve
or finite-data estimate of an asymptotic exponent is added.

The completed run checks 8,722 B identities, 1,388,040 gcd factorizations,
24 exact weighted moments and 1,251,432 pair phases. These include 2,704
distinct-prime zero terms, 203,980 nonzero terms with a distinguished-prime
gcd, and active even reduced divisors in the g=2 branch. It also checks
504 harmonic counting/average bounds, 12 product-variation bounds,
36 derivative comparisons and 22 paired-sector budgets. The cross parts
of six finite moments are negative and six are positive, consistent with
the requirement to retain their signs; this is not a limiting-rate claim.
The strict QC run has zero findings across all fourteen gates, verifier
self-tests pass (58 positives, 47 controls), and the independent existing
numerical audit passes 251/251 checks. Syntax gates do not verify the
asymptotic argument.

Two invalid shortcuts are explicitly falsified: treating distinct primes
as excluding zero numerators once h>=q, and replacing gcd(r,c) by
gcd(r,e) without the factor H. These are not defects in the preceding
notes, whose prime cuts ensure q>2h. The changed hypothesis here requires
(6)--(8). Simply imposing that old cut would discard part of the
polynomial and would not control this BQ sector.

Reuse (12) with its actual norm and dyadic prime support, or reuse the
full region (1). Do not count a norm saving twice, drop complete periods,
pair the positive Vaaler majorant, or mistake (14) for coverage of all
divisor products. The prime-power calculation is completed in the
follow-up above; its next targets are the full coverage audit, the
exceptional first branch and a sharper signed first-power moment bound.
