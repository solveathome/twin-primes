# Switching literature and a lower bound for the negative mass

<!-- ledger
id: Q-switching-negative-mass
status: ANSWERED
todo: C
parity: Uses the nonnegative linear sieve, ordinary prime Bombieri--Vinogradov with maximum over reduced residues, Mertens and exact divisor algebra. The lower bound concerns the actual negative part at the present cutoff exponents, including its prime exclusion. It refutes discarding every positive contribution for this consumer, not signed sieve arguments or other cutoffs.
question: Can existing switching and rough-number estimates price an actual opposed-sign factor family, and can a bound on the negative part alone close the current twin consumer?
verdict: DERIVED from classical inputs: liminf Nhat/(C2*x) is at least kappa=(10*log(3)-36/5)*I>3/2, where I is the explicit ordered two-factor integral below. A three-prime left input and rough composite right input suffice; prime partners are subtracted using an upper sieve. The witness survives every fixed delta<1/50 and every averaging profile with the same plateaus. Consequently the negative-only consumer is false, and liminf Phat/(C2*x)>1/2. The signed twin margin remains OPEN; literature novelty is unestablished.
-->

**Twin-prime infinitude and an improved signed lower margin remain OPEN.**
This literature-led attempt rules out a particular proposed shortcut:
bounding the entire negative mass below C2*x while discarding the
positive mass. The actual negative mass is already larger than that.
This is a classical-input application to the present coefficients,
not a new prime-counting theorem or a claim of literature novelty.

Read [smooth-sieve-literature.md](smooth-sieve-literature.md) for the
completed localization, [global-factor-signs.md](global-factor-signs.md)
for the exact coefficient, and [chen-opportunity-audit.md](chen-opportunity-audit.md)
for the distinct earlier failure of the fixed Chen weight. The argument
here estimates an actual shifted family; it does not infer its density
from the existence of individual factor configurations.

## 1. What the sources supply

[Matomäki--Zuniga Alterman, *Weighted sieves with switching*](https://arxiv.org/html/2405.19063v3),
published in 2025, is the closest additional match. Definition 2.4 and
Lemma 2.5 give the distribution interface and linear sieve. Sections
2.2 and 8 organize rough cofactors by factor count and prime-exponent
integrals. Section 3, especially Assumption 3.1(A1)--(A5), requires
distribution and compatible main terms for both the original and
switched sequences. These are hypotheses, not consequences of changing
variables. Its Theorem 3.2 detects a prime paired with a number having
at most three prime factors under specified inputs; it does not detect
twins. Our full subset-sum coefficient is not its additive weight
1-sum_(p|n) w_p. We import only the nonnegative linear-sieve statement
here and derive the application below.

The earlier [Ford--Maynard input audit](chen-opportunity-audit.md#4-the-research-opening-and-the-literature-interface)
still applies: Type I/II geometry translates established arithmetic
information into a prime bound; it does not supply our missing signed
information. Rereading its introduction, Theorems 2.1--2.2 and the
input definitions does not justify importing an arbitrary-coefficient
Type II hypothesis for the shifted-prime sequence.

For the prime progression input use
[Tao, Notes 3, Theorem 17](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/):
prime Bombieri--Vinogradov with maximum over reduced residue classes,
through sqrt(Y) times a sufficiently negative logarithmic power.
Subtract initial intervals and use PNT to replace the primitive-class
average by interval length divided by phi(d). No convolution theorem
for an arbitrary weighted factor sequence is assumed.

**Source correction:** Tao's Supplement 5 comment of 5 April 2020
identifies a gap in that post's proof of its linear-sieve Theorem 2 and
directs readers to *Opera de Cribro*, Theorem 11.12. The theorem is a
classical input; that blog proof is not a verification of it. The
published Matomäki--Zuniga Alterman Lemma 2.5 supplies a checked statement
and cites *Opera de Cribro* (12.12)--(12.13). We use nonnegative sequences
and s>1 only. The [Chen benchmark](chen-fold-benchmark.md) now records
this source qualification too; its classical constants are unchanged.

## 2. A whole negative family on the plateau

Use J_x=(x/2,x], T=log x and the current cutoffs

\[
 a_L=\lfloor x^{11/50}\rfloor,\quad
 b_L=W_L=\lfloor x^{6/25}\rfloor,\quad
 W_R=\lfloor x^{1/20}\rfloor.
\]

Let p<q be primes with q<=a_L and pq>=b_L. Put m=pq and let r be
prime with x/(2m)<r<=x/m. Thus n=mr belongs to J_x. Uniformly,

\[
 p\ge b_L/a_L\gg x^{1/50},\quad
 m\le x^{11/25},\quad r\ge\tfrac12x^{14/25}>W_L.
                                                               \tag{1}
\]

The prime factorization of n is unique in these coordinates: p,q are
its two primes at most W_L and r is its sole larger prime. All three
are distinct. For every profile rho that equals one on d<=a_L and
zero on d>=b_L, the **complete** subset sum is

\[
 F_L(n)=1-\rho(p)-\rho(q)+\rho(pq)=-1,
 \qquad G_L(n)=\log r.                                        \tag{2}
\]

Terms containing r vanish in F. The exact G formula, including
prime powers, is the one in global-factor-signs (4).

If P^-(n-2)>W_R, then F_R(n-2)=1 and

\[
 G_R(n-2)=\Lambda(n-2)-\log(n-2).                              \tag{3}
\]

For a composite partner that is not a prime power, (2)--(3) give
G_L(n)G_R(n-2)=-(log r)log(n-2). A prime partner gives zero and
must be excluded. A proper prime-power partner gives a different
negative weight; there are O(sqrt(x) log x) such partners and each
has a unique representation here, so their total correction is
O(sqrt(x) log^3 x)=o(x). No assumption that shifted prime partners
are rare is made.

Define, with the same ordered p,q,r conditions,

\[
 B_{\rm rough}=\sum_{p,q,r}(\log r)
                      1_{P^-(pqr-2)>W_R},\qquad
 B_{\rm prime}=\sum_{p,q,r}(\log r)1_{pqr-2\text{ prime}}.
                                                               \tag{4}
\]

Prime partners pass the roughness cut for sufficiently large x.
Their removal is the exact difference B_rough-B_prime. The estimates
below also give B_rough=O(x/T), so replacing log(n-2) by T in the
remaining rough sum costs O(x/T). Consequently, for the full negative
mass Nhat of the C3 pair,

\[
 \widehat N\ge T(B_{\rm rough}-B_{\rm prime})-o(x).             \tag{5}
\]

## 3. Uniform progression input at the actual cofactor length

For each m=pq in (1), set Y=x/m and consider the nonnegative measure
on h=mr-2 with Y/2<r<=Y prime, weighted by log r. Its mass parameter
is X_m=Y/2. For squarefree d the density is

\[
 h_m(d)=\frac{1_{(d,2m)=1}}{\varphi(d)}.                        \tag{6}
\]

If (d,2m)=1, the event d|mr-2 is the reduced residue
r=2*m^(-1) mod d, so ordinary BV applies. If d shares an odd prime
with m, that event is impossible. If d is even it is impossible for
our odd prime r. Thus these exceptional classes have density zero,
not 1/phi(d).

Fix D=x^(5/18). Since Y>=x^(14/25),

\[
 D/\sqrt Y\le x^{5/18-7/25}=x^{-1/450}.                       \tag{7}
\]

For every fixed A, BV and PNT therefore give, uniformly in p,q,

\[
 \sum_{d\le D}\mu^2(d)
 \left|\sum_{\substack{Y/2<r\le Y\\r\ {\rm prime}\\d\mid mr-2}}
          \log r-h_m(d)X_m\right|\ll_A Y/T^A.                 \tag{8}
\]

To pass from Lambda to actual primes, the crude aggregate error is
O(D sqrt(Y) log^2 Y), plus a smaller main-term correction. By (7)
this is O(Y x^(-1/450) T^2), absorbed in (8) eventually. PNT errors
multiplied by sum_(d<=D) 1/phi(d)=O(log D) are also absorbed. This
checks uniformity at the shortest cofactor interval; using x instead
of Y to justify the BV level would be incorrect.

In Definition 2.4's convention take g_m(d)=d*h_m(d), not h_m(d).
Its dimension-one product condition holds uniformly: omitting the
primes 2,p,q only reduces the inverse sieve product. For any fixed
c>0 and z=x^c+O(1), Mertens gives uniformly

\[
 V_m(z)=\prod_{\ell<z}(1-h_m(\ell))
       =(1+o(1))\frac{2C_2e^{-\gamma}}{\log z}.               \tag{9}
\]

The factors omitted at p,q change the ordinary odd-prime product by
1+O(x^(-1/50)); this remains true when one is below z and the other
above it. Formula (9) includes the factor 2 at the prime 2.

Finally sum the uniform errors over p,q. Their total Y-mass is
x*sum_(p,q)1/(pq)=O(x), by (1) and Mertens. Thus (8) sums to
O_A(x/T^A), not a factor-count loss. Every subsequent sieve error
is uniform in m and can be summed in the same way.

## 4. Two sieve bounds, with the prime subtraction paid

For B_rough use the lower linear sieve at level D_0=x^(1/5)<=D
and at z=W_R+1, so the primes at most W_R are removed literally.
Then s=log(D_0)/log z=4+o(1), and
f(4)=e^gamma*log(3)/2. Combining (8)--(9),

\[
 T B_{\rm rough}\ge (10\log3+o(1))C_2x
                       \sum_{p<q\le a_L\atop pq\ge b_L}\frac1{pq}.
                                                               \tag{10}
\]

The upper linear sieve at the same D_0,z has bounded F(s), and
therefore also gives B_rough=O(x/T). This is the upper bound used
to pay the logarithmic replacement in (5).

For B_prime use an **upper** sieve on the same nonnegative measure,
at level D=x^(5/18) and z_1=x^(5/36), so s=2 and F(2)=e^gamma.
Every prime partner passes this weaker test. Therefore

\[
 T B_{\rm prime}\le (36/5+o(1))C_2x
                       \sum_{p<q\le a_L\atop pq\ge b_L}\frac1{pq}.
                                                               \tag{11}
\]

For a check on normalization, each pair contributes X_m=x/(2pq).
In (10), T*X_m times 2C2*e^(-gamma)/(T/20) times f(4) equals
10*C2*x*log(3)/(pq). In (11), replace T/20 by 5T/36 and f(4)
by F(2); the coefficient becomes (36/5)*C2*x/(pq).
The partner upper bound deliberately counts some composites too;
subtracting an upper bound is the valid direction for (5).

Mertens and a finite partition into rectangles in log(p)/T,
log(q)/T give

\[
 \sum_{p<q\le a_L\atop pq\ge b_L}\frac1{pq}\longrightarrow
 I:=\iint_{\substack{0<u<v<11/50\\u+v>6/25}}
                  \frac{du\,dv}{uv}
   =\int_{1/50}^{11/50}\frac1u
       \log\frac{11/50}{\max(u,6/25-u)}\,du.                 \tag{12}
\]

This domain is bounded away from zero. Its boundary has zero measure,
so strict endpoints, integer floors and p=q do not affect the limit.
The integral retains ordering; it is not a cube integral divided by
a factorial for an asymmetric weight.

Equations (5), (10)--(12) prove

\[
 \boxed{\liminf_{x\to\infty}\frac{\widehat N(x)}{C_2x}
       \ge\kappa:=(10\log3-36/5)I>\frac32.}                 \tag{13}
\]

Here is a rationally certifiable lower bound, without relying on
numerical integration. The ordered triangle 3/25<u<v<11/50 and
the three disjoint rectangles

| u interval | v interval |
|---|---|
| (1/25,3/25) | (1/5,11/50) |
| (3/50,3/25) | (9/50,1/5) |
| (2/25,3/25) | (4/25,9/50) |

are inside (12) up to boundaries. Their total integral is

\[
 I_0=\tfrac12\log^2(11/6)+\log3\log(11/10)
       +\log2\log(10/9)+\log(3/2)\log(9/8)>2/5.             \tag{14}
\]

The positive series log t=2*sum_(j>=0) w^(2j+1)/(2j+1),
w=(t-1)/(t+1), certifies (14) with rational lower truncations.
It also gives log3>219/200, so 10*log3-36/5>15/4.
Multiplying the two strict lower bounds proves (13).

## 5. Scope of the obstruction and the next research obligation

The consumer which discards Phat would require
Nhat<=C2*x-c*x/log^K x on unbounded scales. Equation (13) refutes
that statement for these cutoffs. Extracting better constants for
the same global negative-part majorant cannot fix it. No assertion
about all sieve methods, arbitrary cutoff exponents, or possible
signed estimates is being made.

The witness uses only the plateaus of both profiles. It applies also
to the earlier logarithmic taper, and to any admissible probability
profile with these same plateaus. Smoothing inside the transition
bands cannot remove this particular loss. Further, every integer
in this family has P^-(n(n-2))>x^delta eventually whenever fixed
delta<1/50. The negative mass of the localized remainder obeys the
same lower bound. The small-prime tail estimate does not remove it.

For the full C3 pair, S>=0 and the complete global identity imply

\[
 \widehat P\ge\widehat N-C_2x-o(x),\qquad
 \liminf\frac{\widehat P}{C_2x}\ge\kappa-1>\tfrac12.          \tag{15}
\]

This is a compulsory positive mass, not a positive surplus for S.
It supplies no improvement over S>=0. The remaining question is
still the **net** comparison Nhat-Phat<=C2*x-c*x/log^K x.

**The bounded paired-family follow-up is completed in
[paired-factor-budget.md](paired-factor-budget.md).** It uses a stronger
aggregate Pan--Ding input through Wu's published statement and locates
an actual positive companion. Nevertheless liminf (N2-P3)/(C2*x)>11/10:
that pair and the main term alone are insufficient. Its exact complement
cannot be o(x). The earlier per-m argument above remains valid; its level
is a restriction of that particular input, not of aggregate distribution.
Read the follow-up's section 6 for the next whole-coefficient assignment,
including its signed sieve error, prime subtraction and complement.

## 6. Validation, falsifiers and source custody

[switching-negative-mass-validation.js](switching-negative-mass-validation.js)
checks (14), the strict 3/2 certificate, the exponent slack and region
inclusions with exact rational arithmetic. It also computes the full
G divisor convolution as vectors of prime logarithms on finite
plateau fixtures, including prime and proper prime-power partners.
Controls detect omitted prime exclusions, omitted proper powers and
incorrect densities at 2 or at a prime dividing pq. These are algebra
checks, not observations of the asymptotic lower bound.

The argument would fail if the BV level were unavailable uniformly
at Y=x/(pq), if the prime sieve were subtracted in the wrong direction,
if the coefficient signs or the ordered-region normalization were
incorrect, or if errors accumulated above o(x). Sections 2--4 check
these points explicitly. The constants are asymptotic; no numerical
onset is extracted. The complementary signed estimate remains open.

Read on 2026-09-06: Matomäki--Zuniga Alterman sections 2--3, the
lower bound in section 4, the opening upper-bound argument of section
5, and section 8. The Diophantine application was not independently
reviewed. The published PDF's printed pp. 355--356 and 358--359
(PDF pp. 5--6 and 8--9) were inspected as images at the definition,
lemma and assumption pages, and the other cited passages as text.
The [published PDF](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/986429394BA969687D48224E177E2F1C/S0305004125000258a.pdf/weighted_sieves_with_switching.pdf)
has SHA-256
`9cd4cf5d5b51bb903aa613dd8d33c07358bfc7f0bb5bdab9e2f56c6dd60c8d0b`.
ArXiv currently lists v3, 14 March 2025, and the journal citation
*Math. Proc. Cambridge Philos. Soc.* 179 (2025), 351--372.
Tao's theorem and correction were read at their primary pages;
the Ford--Maynard reread has the limited scope stated in section 1.
