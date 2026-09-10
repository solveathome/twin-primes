# The full divisor moment and an additional controlled region

<!-- ledger
id: Q-grouped-divisor-moment
status: ANSWERED
todo: C
parity: Aggregate the full twisted Mobius-von Mangoldt coefficient before one Cauchy inequality; count equal rational frequencies and average all nonzero gcd factors over the common divisor and harmonics. Classical Ramanujan and composite-modulus Weil bounds supply completion. Both gcd branches, prime powers, endpoint variation, complete periods and the full majorant are retained. No Mobius cancellation is assumed in the moment bound and no universal parity obstruction is asserted.
question: Does the full gcd-normalized moment proposed by the literature audit hold, and what exact portion of the twin-prime remainder does it control?
verdict: The proposed moment is derived from classical completion with all coefficient sectors and uniform twists included. Full rectangles are controlled when delta<19/25 and delta+3nu<161/100, in addition to the preceding region. A concrete extra cut d<=floor(x^(151/200)), de^3<=floor(x^(321/200)) controls the entire d~e~x^(2/5) benchmark and leaves an explicit smaller-domain endpoint remainder. The uniform product threshold stays below 19/25. At delta=8/25,nu=9/20, the next deficit is confined to small-common-divisor nonzero kernels; their required saving and the global twin margin remain OPEN. Finite validation does not prove asymptotic rates.
-->

**The global endpoint margin and twin-prime infinitude remain OPEN.**
The result here is a derived bound for another region of the exact
residual, using named classical inputs. It proves the proposed moment
from [the literature audit](structural-literature-audit.md), rather than
inferring it from numerical scaling. No effective finite onset or novelty
claim is made. [OUTCOMES.md](OUTCOMES.md) records the result and its limits.

[RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) consolidates the assessment and
the next assignments. This regional bound warrants a bounded follow-up,
not a claim that a full proof is near. Its arbitrary-coefficient estimate
does not extract additional cancellation from the actual Mobius signs;
no necessity theorem for a particular future mechanism is asserted.

## 1. A general moment with the endpoint difference retained

Let x>=8. All length parameters below are at most a fixed power of x;
the constants may depend on that fixed power and epsilon. Let M,N,A>=1,
let I be an integer subinterval of (M,2M], and let H be any subset of
the positive integers in [A,2A]. Coefficients b_u, supported on (N,2N],
are arbitrary complex numbers with |b_u|<=B; |c_h|<=C/A with C fixed.
Let g in {1,2}, theta in {1,2}, and sigma in {-1,1}. The application has
theta=2/g. Set

\[
 \Phi_{u,h}(m)=e\left(\frac{hz_0'}{gmu}\right)
                  -e\left(\frac{hz'}{gmu}\right),\qquad
 f=\min\left(1,\frac{Ax}{MN}\right),\quad v=\frac{Ax}{MN},
\]

where |z0'|,|z'|<=x and |z'-z0'|<=x. This includes the native endpoints
z0=x/2,z in [x/2,x], and their reciprocal shifts z0-2,z-2.
Write e(t)=exp(2*pi*i*t) and e_c(t)=e(t/c). Define

\[
 Y(m)=\sum_{u\sim N}b_u\sum_{h\in H}c_h1_{(m,u)=1}
               e_u(\sigma\theta h\bar m)\Phi_{u,h}(m),
 \qquad \mathfrak M=\sum_{m\in I}|Y(m)|^2.             \tag{1}
\]

**Derived moment bound:** for every fixed epsilon>0,

\[
 \boxed{\mathfrak M\ll_\epsilon
 B^2x^\epsilon f^2
       \left[\frac{MN}{A}+(1+v)(N^3+M)\right].}       \tag{2}
\]

In particular take MN>x^(1-tau),
T=ceil(x^(2*tau)*max(1,MN/x)), and A<=T, as in the Vaaler
polynomial. Then 1+v<<x^(3*tau) and f²*MN/A<=x, so

\[
 \mathfrak M\ll_\epsilon B^2x^\epsilon
                       [x+x^{3\tau}(N^3+M)].          \tag{3}
\]

This is the literature audit's proposed estimate. It holds for arbitrary
bounded b_u; a new cancellation estimate for their Mobius signs is not
an assumption. Negative harmonic bands follow by conjugating the phase
and endpoint factor, while allowing arbitrary complex coefficients.
There are only logarithmically many bands. The first band includes h=1.

## 2. Equal frequencies and endpoint variation

Expand (1). For each ordered pair u1,u2 put
j=gcd(u1,u2), u_i=j*ell_i, (ell1,ell2)=1, and

\[
 c=j\ell_1\ell_2,\quad R=h_1\ell_2-h_2\ell_1,
 \quad r=\sigma\theta R.
\]

The pair kernel is exactly

\[
 K=\sum_{m\in I,(m,c)=1}e_c(r\bar m)F(m),\qquad
 F(m)=\Phi_{u_1,h_1}(m)\overline{\Phi_{u_2,h_2}(m)}.  \tag{4}
\]

This is [structural-literature-audit.md](structural-literature-audit.md)
(1)--(3), with the sign parameter made explicit. Integer R=0 is
equivalent to h_i=t*ell_i for a positive integer t. The same note's
count gives at most 8*N*A*H_floor(2*min(N,A)) such ordered pairs.
Since |F|<<f² and |I|<<M, their total absolute contribution to the
moment is

\[
                     \ll B^2f^2\frac{MN}{A}\log(2NA). \tag{5}
\]

All collisions are included, also those between different divisors.
For this class no cancellation is claimed. Nonzero R with c dividing r
belongs to the next section, with its gcd retained; it is not treated
as a primitive oscillating phase.

For completeness, the endpoint weight satisfies

\[
 \|F\|_\infty+\int_M^{2M}|F'(t)|dt\ll f^2(1+v).     \tag{6}
\]

To verify the factor f, write Phi=e(h*z0'/(gmu))*(1-e(h*(z'-z0')/(gmu))).
When v<=1 this gives |Phi|<<v and |Phi'|<<v/M; when v>=1 it gives
|Phi|<=2 and |Phi'|<<v/M. Hence in both cases
|Phi|<<f, |Phi'|<<f*(1+v)/M. The product rule proves (6).
No differentiation of b_u, c_h or their divisor twists occurs.

## 3. The nonzero gcd sum, including complete periods

The published inputs are the classical bounds

\[
 |S(0,r;c)|\le(r,c),\qquad
 |S(t,r;c)|\ll_\epsilon c^\epsilon\sqrt{c(t,r,c)},
\]

as stated in [Pascadi, Lemmas 3.2--3.3](https://link.springer.com/article/10.1007/s00039-026-00746-0),
checked 2026-09-06. These apply to composite moduli and nonprimitive
numerators. Removing complete periods and completing the remaining
interval, exactly as in [prime-dispersion.md §4](prime-dispersion.md),
gives for every subinterval I' of I

\[
 \left|\sum_{m\in I',(m,c)=1}e_c(r\bar m)\right|
 \ll_\epsilon x^\epsilon
           \left[\sqrt{cG}+\frac{M}{c}G\right],\quad G=(r,c).
                                                               \tag{7}
\]

The finite Fourier transform of an interval has total modulus
O(c*log(2c)); (7) includes that cost. The term M*G/c is essential when
M exceeds c. Partial summation and (6) multiply (7) by f²*(1+v).

For R nonzero, no squarefree assumption is needed for

\[
 G\le2(R,j)(h_1,\ell_1)(h_2,\ell_2).                 \tag{8}
\]

It follows from (R,ab)<=(R,a)(R,b), and
(R,ell1)=(h1,ell1), (R,ell2)=(h2,ell2). Prime powers shared by j
and an ell_i therefore remain covered.

We need two elementary averages, both uniform in the integers involved:

\[
 \sum_{J\le j<2J}(R,j)^\alpha\le2J\tau(|R|),\qquad
 \sum_{h\in H}(h,\ell)^\alpha\le2A\tau(\ell),
 \quad 0\le\alpha\le1.                              \tag{9}
\]

For either inequality, dominate the gcd power by the sum of d^alpha
over its common divisors. Only d<=2J, respectively d<=2A, can divide a
summation variable, and it has at most 2J/d, respectively 2A/d,
multiples in the range. Sum d^(alpha-1)<=1 over the divisors of the
fixed nonzero integer. The first inequality is not used at R=0.

Split j into dyadic bands [J,2J). Put L=N/J; the ell_i lie in
(L/2,2L], with L>=1/2 on any nonempty band. For fixed ell1,ell2,h1,h2,
the integer R is independent of j. Restrictions on j may now be dropped
after taking a nonnegative upper bound. By (8)--(9), the square-root
part of (7), summed over this j band, is at most

\[
 4J^{3/2}\tau(|R|)
       \sqrt{\ell_1\ell_2(h_1,\ell_1)(h_2,\ell_2)}.
\]

Use the elementary divisor bound to absorb tau(|R|) into x^epsilon;
R is nonzero and polynomially bounded in x. Then sum the two harmonics
using (9) with alpha=1/2 and their coefficient bound C²/A². Sum the
O(L²) possible ell pairs, bounding their remaining divisor factors by
x^epsilon. Since sqrt(ell1*ell2)<<L, the resulting Weil budget is

\[
                    \ll_\epsilon x^\epsilon J^{3/2}L^3
                    =x^\epsilon\frac{N^3}{J^{3/2}}.   \tag{10}
\]

For complete periods, (8) instead gives

\[
 \sum_{j\sim J}\frac{MG}{j\ell_1\ell_2}
 \le\frac{4M\tau(|R|)}{\ell_1\ell_2}
                            (h_1,\ell_1)(h_2,\ell_2).
\]

Apply (9) with alpha=1. The sum of 1/(ell1*ell2) over the dyadic
ell ranges is O(1), also when L lies between 1/2 and 1. Thus the
period budget on a j band is

\[
                                  \ll_\epsilon Mx^\epsilon.   \tag{11}
\]

Summing (10) geometrically in J and (11) over O(log N) bands gives
x^epsilon*(N³+M). Multiply by B²*f²*(1+v) and combine with (5).
Choose the small divisor-bound exponents so their finite sum is the
epsilon in (2). This proves (2)--(3).

This argument also gives a useful restricted estimate: for nonzero R
and j>J0>=1, the **absolute sum of the weighted pair contributions** is

\[
 \ll_\epsilon B^2x^\epsilon f^2(1+v)
                       [N^3/J_0^{3/2}+M].             \tag{12}
\]

It is valid for arbitrary restrictions on those pairs. It is not an
assertion that a restricted signed cross term is itself nonnegative.

## 4. Consume the whole coefficient and the full approximation error

For an original interval I contained in (D,2D] and Re(s)>=0,
the exact coefficients are

\[
 A_0^{(s)}(\ell)=\mu(\ell)\ell^{-s}1_I(\ell),\quad
 A_1^{(s)}(\ell)=-\mu(\ell)\ell^{-s}1_I(\ell)\log\ell
 -\sum_{r\mid\ell,\ 2\le r\le W}
                 \mu(\ell/r)(\ell/r)^{-s}1_I(\ell/r)\Lambda(r).
                                                               \tag{13}
\]

Their bounds |A0|<=1, |A1|<=2*log ell hold independently of Im(s),
because sum_(r|ell) Lambda(r)=log ell. Their supports lie below 2DW.
Use the exact convolution identity in [endpoint-fourier.md §2](endpoint-fourier.md).
It includes the low term, the squarefree term, all repeated prime powers
and the prime 2 without separate estimates. There are four products of
these coefficients, with counted-integer weights 1,log n,log(n-2),
log n*log(n-2).

For a fixed expanded box m~M,u~N and gcd branch g, take the full right
coefficient as b_u=A_{right}(gu). Keep it inside (1). First Cauchy in
m costs F=(sum_m |A_{left}(gm)|²)^(1/2)<<sqrt(M)*log x. Equation (3)
therefore bounds each positive harmonic block by

\[
 x^\epsilon\left[\sqrt{Mx}
          +x^{3\tau/2}(\sqrt M\,N^{3/2}+M)\right].     \tag{14}
\]

All fixed logarithmic factors can be absorbed into epsilon. Coefficients
may vanish on arbitrary subsets, and may have even reduced indices in
the g=2 branch. No squarefree or odd-index assumption was used in (2).
The left orientation is obtained by inverse reciprocity, with phase
sign reversed and **both** counted endpoints shifted by 2; it swaps M,N
in (14). Uniformity in z restores the counted-integer log weights by
the same discrete partial summation as the earlier notes.

For MN<=x^(1-tau), bound |Delta|<=1 directly for cost
O(x^(1-tau)*log^C x). On retained boxes use T above. The entire positive
Vaaler majorant is bounded by the divisor-count argument in
[endpoint-pairing.md §5](endpoint-pairing.md). Its scale
8MN/(T+1) lies between 1 and O(x^(1-2*tau)) eventually. The original
expanded divisors exceed 2, so the exceptional CRT integers 0 and 2
produce no pair. This bound receives no endpoint pairing factor.

Put a=delta+6/25 and b=nu+1/20. The three right budgets in (14) are
(1+a)/2, a/2+3b/2, a; the left budgets swap a,b. These monomials
increase in each support length, so the top bounds apply to all smaller
expanded boxes. With a fixed strict margin choose tau and epsilon small
enough to absorb variation, divisor bounds and all logarithmic sums.
The right orientation consequently requires

\[
              \delta<19/25,\qquad\delta+3\nu<161/100. \tag{15}
\]

The left condition 3delta+nu<123/100 is already contained in the old
left region: 5delta+2nu<246/100-delta<=222/100<246/100. It also
forces b<1. It adds no region to the previous union.

The untwisted density retains the uniform excluded-prime Mobius bound
from [signed-divisor-grouping.md](signed-divisor-grouping.md): for fixed
e and the small expansion factors the d interval has lower endpoint
at least U/2, and the exclusion parameter is polynomially bounded.
The outer harmonic sums cost logarithms. Hence full rectangles satisfying
(15), with fixed margin, have R_IJ=O_H(x/log^H x) for every fixed H.
The endpoint power saving is uniform in the two divisor twist heights;
no large-height Mobius mean is asserted for the density.

At delta=nu=2/5, a=16/25,b=9/20, the budgets are

\[
                         41/50,\quad199/200,\quad16/25. \tag{16}
\]

Every coefficient sector of this benchmark is now included. These are
budgets before small losses; the final asymptotic exponent is not
claimed to equal 199/200 exactly.

## 5. Exact extra cuts and the remaining endpoint sum

The vertical condition in (15) matters: the monomial inequality alone
does not give a fixed saving when a approaches 1. Choose fixed
kappa<19/25 and lambda<161/100, and define

\[
 \mathcal C_{\kappa,\lambda}
  =\{d\le\lfloor x^\kappa\rfloor,\quad
                          de^3\le\lfloor x^\lambda\rfloor\},  \tag{17}
\]

inside the full original domain U<d<=D0,Y<e<=E0. On every dyadic box
meeting this set, the top support budgets have fixed slack by (15).
Constants from dyadic endpoints and floors do not consume that slack.
The monomial cutoff alone at delta=19/25,nu=1/20 would leave the zero
budget equal to one; this is a failed boundary inference, not a
counterexample to the underlying arithmetic estimate.

Use the truncated Perron formula in [residual-coverage.md §4](residual-coverage.md)
with real part 1/log x, height x^10 and the half-integer shift of each
integer threshold. The two integrands here supply twists d^(-s) and
d^(-t)*e^(-3t). Their product is covered by the uniform bound above,
and the integrations cost O(log² x). The pointwise indicator errors
are O(x^kappa/x^10) and O(x^lambda/x^10).

The old cuts are A={de<=floor(x^(3/4))} and
B={d^5*e²<=floor(x^(49/20))}. All intersections with C have at most
four Perron integrals, still only logarithmic cost. The absolute mass
of the unaggregated endpoint terms is O(x²*log^C x), as already bounded
in residual-coverage.md. The total separation error is therefore
O(x^(2+49/20-10)*log^C x). No boundary box is discarded.

At fixed e, C restricts d to an initial segment with upper endpoint
min(floor(x^kappa),floor(x^lambda)/e³). Intersecting with A or B takes
further minima; their union takes the corresponding maximum. Clip with
the original domain. Thus the untwisted density bound applies directly
before separation. Inclusion-exclusion proves R_C and all required
intersections are O_H(x/log^H x).

For a concrete choice take

\[
                  \kappa=151/200,\qquad\lambda=321/200. \tag{18}
\]

The right zero and cross budgets are at most 399/400 and the period
budget at most 199/200, before small losses. This C contains the whole
d~e~x^(2/5) rectangle eventually. Define E_dagger by the exact weighted
compatible CRT sum in residual-coverage.md (16), now restricted to

\[
 \begin{gathered}
 de>\lfloor x^{3/4}\rfloor,\qquad
 d^5e^2>\lfloor x^{49/20}\rfloor,\\
 d>\lfloor x^{151/200}\rfloor\quad\text{or}\quad
 de^3>\lfloor x^{321/200}\rfloor.
 \end{gathered}                                             \tag{19}
\]

The full original divisor bounds and every endpoint weight stay in force.
Then for every fixed H,

\[
 E_*(x)-E_\dagger(x)=O_H(x/\log^H x),\qquad
 \sum_{x/2<n\le x}\Lambda(n)\Lambda(n-2)
       =C_2x+E_\dagger(x)+O_H(x/\log^H x).                \tag{20}
\]

This is a smaller summation domain, not a monotonicity statement about
its signed value. A fixed positive margin c*x/log^K x on unbounded
dyadic scales, or the precise rescaled average already specified, remains
sufficient and OPEN with E_dagger substituted.

The uniform product threshold of the combined estimates has **not**
increased: delta=8/25,nu=11/25 has delta+nu=19/25, while
5delta+2nu=62/25>123/50 and delta+3nu=41/25>161/100. It lies in none
of the strict sufficient regions. Every larger uniform product cutoff
would include this unhandled point. This is a limitation of these
estimates, not a bound on the true attainable cutoff.

## 6. The next nonzero kernel, localized in the common divisor

Take delta=8/25,nu=9/20. This box remains in (19) eventually. The top
expanded lengths are M<=constant*x^(14/25), N<=constant*x^(1/2).
The right grouped budgets are 39/50,103/100,14/25. The zero and period
terms are controlled; the nonzero Weil budget is not. The old left
cross budget is 101/100 and the old right zero budget is 201/200, so
neither preceding orientation fills this gap.

Equation (12) controls every nonzero pair with j>x^(1/20): its final
block budget is at most 103/100-3/80=397/400. This holds on all
retained support and harmonic boxes, including twists. The equal-frequency
class is already controlled by (5), and all complete-period terms by (11).

The remaining specific target is the **one-sided upper bound**

\[
 \mathcal X_{\rm small}
 :=\sum_{\substack{u_i\sim N,\ h_i\in H\\
          (u_1,u_2)\le x^{1/20},\ R\ne0}}
 b_{u_1}\overline{b_{u_2}}c_{h_1}\overline{c_{h_2}}
          \sum_{m\in I,(m,c)=1}e_c(-\theta R\bar m)F(m)
 \le Cx^{36/25-\epsilon}.                              \tag{21}
\]

This ordered-pair expression is real by interchange of the two indices.
An absolute bound is sufficient but stronger than needed. The current
generic moment budget is x^(3/2+small loss), so (21) needs more than
3/50 in its exponent on the top box. The other-divisor norm squared
is O(x^(14/25)*log^C x); hence (21) would control this full rectangle
if uniform over its actual coefficient classes and cuts. It is not yet
an estimate for the whole remaining domain.

On the top transition band, A~x^(3/50). With j~J small, the completed
modulus is c~x/J, the numerator support is O(x^(14/25)/J), and the
usual smooth-completion dual scale is c/M~x^(11/25)/J. These are scale
diagnostics, not hard Fourier support statements for the sharp interval.
The literature audit's spectral and bilinear hypotheses must be matched
to the actual coupled weights before importing a saving. Large common
divisors already have (12); their easier spectral range is not the
remaining bottleneck here.

An estimate for (21) must report its region of validity and its effect on
the global consumer (20). Controlling another isolated rectangle does
not establish convergence toward that consumer. A direct one-sided or
rescaled-average argument is an admissible alternative. The deficit 3/50
is a moment-exponent deficit, not a percentage of numerical improvement
or proof completion; equality leaves no fixed slack for the losses.

## 7. Validation and conditions for revision

[grouped-divisor-validation.js](grouped-divisor-validation.js) tests the
general harmonic gcd averages, the j-band Weil/period majorants, and
moments of the full original convolution against independent aggregation
and ordered-pair expansion. It includes low and repeated-prime sectors,
both gcd branches, both phase orientations and complex divisor twists.
The finite original coefficients and the asymptotic bound are separate
checks. It also verifies rational coverage budgets and reconstructs the
new exact cut partition from retained factors in archived windows.

Negative controls omit complete periods, omit a required conjugation,
use the unshifted reciprocal endpoints, drop the vertical cutoff, and
double-count the overlap of the controlled regions. The deterministic
artifact is [grouped-divisor-validation.json](grouped-divisor-validation.json).
Finite results cannot establish a power saving or an effective onset.
An incorrect gcd average, an unbounded endpoint derivative, a lost
coefficient class or nonuniform twist dependence would invalidate the
application and require revision. Equations (8)--(14) specify those
obligations rather than relying on the numerical checks to supply them.

Verification on 2026-09-06: the new custody-bound validator completes in
3.4 seconds. All fourteen strict QC gates have zero findings; the verifier
self-test passes its 58 positive and 47 negative controls. The existing
[independent numerical audit](audit-numbers.js) passes 251/251 checks in
164.2 seconds. The work uses the authorized compute allowance without
requiring a long new prime enumeration. These checks certify their stated
finite and documentation scopes, not an asymptotic onset or a twin margin.
