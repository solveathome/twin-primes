# Full residual coverage and the first-branch moment

<!-- ledger
id: Q-residual-coverage
status: ANSWERED
todo: C
parity: The exceptional coefficient is retained as a prime-power sum with a shorter base interval. A separate prime-free moment includes the low coefficients; powers of two retain their actual reduced modulus. Classical completion, averaged nonzero gcd losses, paired zero frequencies and the entire positive majorant give bounds uniform in independent divisor twists. An explicit truncated Perron argument separates the product and monomial cuts. The signed density is bounded before twisting. The resulting global complement and its one-sided twin consumer remain OPEN.
question: What portion of the full residual is controlled with uniform margins, and can the exceptional first branch improve that coverage rather than just a regional corner?
verdict: The first-branch and prime-free moments remove the exceptional norm condition. Full rectangles are controlled when delta+nu<19/25 or 5delta+2nu<123/50. Uniform twists justify exact coupled cuts: every fixed de<=x^theta with theta<19/25, and d^5*e^2<=x^lambda with lambda<123/50, as well as their union, have arbitrary fixed logarithmic savings. A concrete remaining endpoint sum has de>floor(x^(3/4)) and d^5*e^2>floor(x^(49/20)). Its twin margin is OPEN. The right zero-frequency budget, after an extra Cauchy inequality, limits the uniform product range; the left cross moment limits the other edge. Finite checks validate identities and masks, not asymptotic rates.
-->

**The remaining signed endpoint estimate and twin-prime infinitude are
OPEN.** This note derives a larger controlled set from the previously
specified classical inputs. It gives an exact complement, not a percentage
of the problem solved. The finite computation tests the new coefficient
handling and set partition; it does not measure an asymptotic saving.

The audit changes the next research decision. The exceptional coefficient
need not be bounded only by its norm. Retaining its first branch, and
including a moment without a distinguished prime, gives estimates for
both orientations of the **whole** coefficient. The two resulting edges
have different limiting terms.

## 1. Objects, cutoffs and the full domain

Use the exact residual and endpoint kernel from
[signed-divisor-grouping.md](signed-divisor-grouping.md), including its
discrete partial summation and both compatible gcd branches. Put

\[
 w=6/25,\quad v=1/20,\quad U=V=\lfloor x^w\rfloor,
 \quad Y=Z=\lfloor x^v\rfloor,
 \quad D_0=\left\lfloor\frac{x}{V+1}\right\rfloor,
 \quad E_0=\left\lfloor\frac{x-2}{Z+1}\right\rfloor.
\]

The exact original divisor domain is
\(U<d\le D_0,\ Y<e\le E_0\). Its limiting exponent rectangle is

\[
       w\le\delta\le1-w,\qquad v\le\nu\le1-v.              \tag{1}
\]

Split it into disjoint dyadic intervals starting at U and Y, clipping the
last interval at D0 and E0. Each interval has ratio at most two. If D,E
are its lower endpoints, write delta=log(D)/log(x), nu=log(E)/log(x),
a=delta+w, b=nu+v. Floors change the lower bounds in (1) by O(1/log x);
all estimates below retain a fixed margin and absorb this change. There
are O(log^2 x) original boxes. Subintervals are allowed throughout.

An endpoint estimate at fixed delta,nu cannot be applied uniformly to
boxes approaching its boundary without such a margin. Nor can one put
an unseparated condition de<=L into an arbitrary-coefficient theorem.
Sections 4--5 address both points explicitly.

## 2. Keep the first branch inside the moment

First permit the independent twists mu(d)d^(-s), mu(e)e^(-t), with
Re(s),Re(t)>=0. Every bound in this section and section 3 is independent
of their imaginary parts. Only endpoint sums are twisted; no uniform
twisted Mobius mean is asserted.

For an interval I contained in (D,2D], the twisted convolution is

\[
 A_{I,W,1}^{(s)}(\ell)=-\mu(\ell)\ell^{-s}1_I(\ell)\log\ell
 -\sum_{r\mid\ell,\ 2\le r\le W}
          \mu(\ell/r)(\ell/r)^{-s}1_I(\ell/r)\Lambda(r).     \tag{2}
\]

It is pointwise O(log ell), uniformly in s. The A0 coefficient is
mu(ell)ell^(-s)1_I(ell). On squarefree ell the non-low part of (2)
is the first-power sum with original divisor d and weight
-mu(d)d^(-s)log p. On a nonsquarefree ell with exactly one repeated
prime, ell=p^k m, k>=2, m squarefree, p not dividing m, it is

\[
 \mu(m)\log p\left[
   (pm)^{-s}1_{p^{k-1}\le W}1_I(pm)
       -m^{-s}1_{p^k\le W}1_I(m)\right].                    \tag{3}
\]

Other nonsquarefree ell give zero. The interval indicators in (3) are
disjoint because I has ratio at most two. The first term is the branch
previously placed in B_exc. Its original divisor is **pm**, while its
expanded divisor is p^k m. This distinction supplies the shorter base
interval; it cannot be replaced by a smaller support bound for B_exc.

For odd p and a fixed k>=2, split p^k into R<=p^k<2R, set P=R^(1/k),
and write m=g d with g in {1,2}. The condition pm in I puts d in
O(1) intervals of size D/P. Retain this condition inside the prime sum.
The conditions p^(k-1)<=W imply

\[
             R\ll PW,\qquad P\le W,\qquad D/P\gg1.          \tag{4}
\]

The last assertion uses D>=U and W=V on the left, or E>=Y and W=Z
on the right, up to fixed floor constants. The coefficient outside the
moment is mu(gd)(gd)^(-s); inside it is p^(-s)log p. Both additional
factors have modulus at most one. The extra condition pd in the original
interval causes no loss: it restricts the prime set at fixed d and can
be dropped after taking a nonnegative bound. Fixed k is chosen **before**
Cauchy; there are no mixed-k kernels. Bands in p^k keep every comparison
uniform as k grows.

Apply [prime-power-dispersion.md](prime-power-dispersion.md) (13), with
base length D/P instead of D. Its proof uses only bounded prime weights,
so it remains valid for the twists above. If F is the norm of the other
coefficient and its support is n~N, the bracket before F becomes

\[
 \sqrt{Dx/R}+x^{3\tau/2}\left[
 D^{5/4}R^{1/2}P^{-1/4}
 +D^{5/4}R^{1/4}P^{-3/4}+\sqrt{DN/P}\right].              \tag{5}
\]

There are also x^epsilon and fixed logarithmic factors. Using (4), this
is at most

\[
 \sqrt{Dx}+x^{3\tau/2}
       \left[D^{5/4}W^{3/4}+D^{5/4}W^{1/4}+\sqrt{DN}\right].\tag{6}
\]

In particular the first-branch cross budget is smaller than the
first-power cross budget by 3w/4 on the left, or 3v/4 on the right.
Its zero term still needs an explicit bound; (6) does not supply a
uniform extra power saving there.

### Powers of two and the low coefficients

The even prime cannot simply use m=g d in every branch. If ell=2^k m
with m odd and g=2, the reduced modulus is 2^(k-1)m. For g=1 it is
2^k m. Fix the power before taking the moment. There is only one
distinguished prime, so no distinct-prime cross term. For the first
branch the base length is comparable to D/2 and the reduced power is
at most 2W; for the negative branch it is comparable to D and the
reduced power is at most W. A singleton version of the same proof gives

\[
 F x^{\epsilon}\left[\sqrt{Dx}
       +x^{3\tau/2}\big(D^{5/4}W^{1/4}+\sqrt{DN}\big)\right].\tag{7}
\]

Retain the odd-base restriction. The factor theta=2/g is harmless even
at p=2: gcd(theta r,c)<=2 gcd(r,c). Thus the full power-of-two gcd
is still averaged over the harmonics, and only an absolute factor is
added. This is not an assertion that the exact odd-prime gcd identity
continues unchanged at p=2.

Finally the coefficients A0, the low part of A1 and Q2 have support
O(D) and pointwise logarithmic bounds. They admit a **prime-free**
version of the moment: take a single multiplier 1, with weight 1 in
place of log p. The kernel has modulus d and numerator
theta(h1-h2). Its zero-numerator weight is O(1/A); for h1!=h2,
the common-divisor average applies. Completion gives

\[
 F x^{\epsilon}\left[\sqrt{Dx}
           +x^{3\tau/2}\big(D^{5/4}+\sqrt{DN}\big)\right].   \tag{8}
\]

One can see (8) directly from Cauchy in n then d: the moment is bounded
by f^2[DN/A+x^(3tau+epsilon)(D^(3/2)+N)], where
f=min(1,Ax/(DN)). Use f/sqrt(A)<=sqrt(x/(DN)). An arbitrary
logarithmically bounded coefficient on d can stand outside this moment;
its signs are lost in this Cauchy step. No assertion about cancellation
of those signs is needed for (8).

The inputs throughout are the already matched
[Ramanujan and composite-modulus Weil bounds, Pascadi Lemmas 3.2--3.3](https://link.springer.com/article/10.1007/s00039-026-00746-0),
their complete-period term, and the derived nonzero common-divisor gcd
average. All harmonic gcd factors and equal-frequency pairs from the
prime-power note remain present. Positive and negative harmonic bands
are estimated separately. No stronger imported theorem is used.

## 3. Both orientations now include the whole coefficient

Against any other coefficient on support n~N with norm F, the largest
cross term is still the squarefree first-power term. Equations (6)--(8),
the odd negative prime-power terms, and the first-power bound therefore
give the uniform endpoint bound

\[
 F x^{\epsilon}\left[\sqrt{Dx}
       +x^{3\tau/2}\big(D^{5/4}W^{3/2}+\sqrt{DN}\big)\right],\tag{9}
\]

up to fixed logarithms. Summing O(log x) powers, power bands and support
boxes costs only further logarithms. Same-prime terms are smaller than
the displayed cross term. There is no remaining B_exc norm condition.

The left orientation uses the reciprocal phase with **both** counted
endpoints shifted by 2. The right orientation uses the native phase

\[
 e\left(-\frac{\theta h\overline m}{n}\right)
 \left[e\left(\frac{hz_0}{gmn}\right)
          -e\left(\frac{hz}{gmn}\right)\right].             \tag{10}
\]

Here m is the left reduced divisor and n the right one. Thus the right
moment has negative theta and unshifted z0,z. Absolute completion and
gcd estimates are unchanged by that sign. In either orientation the
arbitrary other coefficient can have even reduced divisors in the g=2
branch. No unsupported parity restriction is inserted.

The cross, zero-numerator and complete-period budgets in (9) are

| orientation | cross W | zero J | periods P |
|---|---|---|---|
| left | 5a/4+b/2+w/4 | 1/2+(a+b)/2-w/2 | b+a/2-w/2 |
| right | a/2+5b/4+v/4 | 1/2+(a+b)/2-v/2 | a+b/2-v/2 |

Require all three budgets of one orientation to be at most 1-eta,
with a fixed eta>0. Choose tau and epsilon sufficiently small compared
with eta. Boxes MN<=x^(1-tau) are bounded directly. On the other boxes,
the Vaaler polynomial uses T_F=ceil(x^(2tau)max(1,MN/x)). The
**entire positive majorant**, including nonzero frequencies, is bounded
by [endpoint-pairing.md](endpoint-pairing.md) section 5's divisor-count
argument. It is not multiplied by a paired factor. Twists preserve its
pointwise coefficient bounds. Uniformity in z restores the original
logarithmic endpoint weights by partial summation. Consequently the
twisted endpoint sum is O(x^(1-c_eta)) for some c_eta>0, with logarithms
absorbed, uniformly in both imaginary parts. This is stronger than any
fixed logarithmic saving, but no effective onset is asserted.

On the limiting domain (1) the sufficient conditions simplify exactly:

\[
 \boxed{\quad \delta+\nu<19/25
          \quad\hbox{or}\quad 5\delta+2\nu<123/50.\quad}    \tag{11}
\]

For the right orientation set theta=delta+nu. Then

\[
 J_R=\frac{31}{50}+\frac\theta2,\qquad
 W_R\le\frac54\theta+\frac3{200},\qquad
 P_R\le\theta+\frac{43}{200}.                              \tag{12}
\]

At theta=19/25 the latter two upper budgets are 193/200 and 39/40,
strictly below one; J_R reaches one. Conversely J_R<1 requires
theta<19/25. The left cross budget is
W_L=(5delta+2nu)/4+77/200. As in the preceding note, W_L<1 and
delta>=w imply J_L<24/25 and P_L<4/5. This proves both simplifications,
with uniform slack for every compact subset of the strict inequalities.

The generic paired region is contained here: C<1 implies
a+b<34/33<21/20, which places it in the right region. The earlier
dispersion regions have W_L<1 and are contained in the left region.
Thus the audit does not discard an earlier controlled corner.

The frontier lines meet at
(delta,nu)=(47/150,67/150). The product-exponent supremum of their
union is 87/100, approached at (6/25,63/100) along the left edge.
This follows from delta+nu<123/100-3delta/2<=87/100.
It remains a regional supremum. The **uniform** product threshold from
(11) is every fixed exponent below 19/25, not 87/100.

## 4. Separate the coupled cuts with a uniform cost

Fix theta<19/25 and lambda<123/50, independent of x. Define integer cuts

\[
 L_\theta=\lfloor x^\theta\rfloor,\qquad
 K_\lambda=\lfloor x^\lambda\rfloor,\qquad
 \mathcal A=\{de\le L_\theta\},\quad
 \mathcal B=\{d^5e^2\le K_\lambda\}.                       \tag{13}
\]

Intersect these with the exact full domain in section 1. On a dyadic
box meeting A, its lower endpoints satisfy DE<L_theta. Thus the
right budgets have a fixed margin by (12). On a box meeting B,
D^5 E^2<K_lambda, and the left cross budget is at most
lambda/4+77/200<1. Boundary boxes are included, not thrown away.
Constants from support dyadicization and floors are absorbed by the
fixed gaps 19/25-theta and 123/50-lambda.

Here is an explicit separation of each indicator. For a positive integer
q, integer K>=1, c=1/log x and T_P=x^10, write

\[
 P_K(q)=\frac1{2\pi i}\int_{c-iT_P}^{c+iT_P}
                    \frac{(K+1/2)^s q^{-s}}s\,ds.
\]

Then

\[
                 1_{q\le K}=P_K(q)+O((K+1)/T_P),           \tag{14}
\]

uniformly for the integers here. To verify the formula, put
u=log((K+1/2)/q). Fourier inversion of exp(-c u)1_(u>0), or the
elementary one-pole contour integral, gives the untruncated integral
1_(u>0). Integrating each tail by parts bounds its error by
O(exp(cu)/(T_P |u|)). Integer spacing gives |u|>>1/(K+1);
exp(cu)<=exp(c log(K+1/2))=O(1) for the fixed polynomial cuts.
The half-integer shift excludes equality at the jump.

For q=de the integrand is a product of twists d^(-s), e^(-s).
For q=d^5 e^2 it is d^(-5s)e^(-2s). Their real parts are nonnegative,
so sections 2--3 apply uniformly for all imaginary parts in the integral.
The integral of 1/|s| costs O(log x). For A intersect B use both
integrals: the twists are d^(-s-5t), e^(-s-2t), costing O(log^2 x).
Both budgets are available on a box meeting that intersection; one
suffices. There is no height-dependent derivative loss because the
twists belong to the divisor coefficients, not the counted endpoint.

The sum of absolute values of the unaggregated endpoint terms on the
whole domain is O(x^2 log^C x): each discrepancy with its logarithmic
weights is O(log^C x), there are at most D0 E0 original divisor pairs,
and at most VZ weighted expansion terms up to logarithms. Equation (14)
therefore has total error O(x^(2+max(theta,lambda)-10)log^C x).
For the double cut use |P_K|<=1+O((K+1)/T_P), which also bounds the
product approximation error. These errors are negligible. This is a
justified cost for the coupled cuts, not an appeal to a rectangle
estimate on a nonrectangular set.

Finally, bound each **untwisted density** before this separation. At
fixed e the allowable d form an interval: its upper bound is L_theta/e,
(K_lambda/e^2)^(1/5), or their minimum for the intersection. For the
union it is their maximum. Clip with U,D0. The uniform excluded-prime
Mobius lemma in signed-divisor-grouping.md applies on these intervals;
the remaining harmonic sums cost fixed logarithms. It gives
O_H(x/log^H x) for each density and hence for their complement by
subtraction from the full density. No large-height twisted Mobius
estimate has been used.

Combining the endpoint and density bounds proves, for each fixed H,

\[
 R_{\mathcal A},\ R_{\mathcal B},\ R_{\mathcal A\cap\mathcal B},\
 R_{\mathcal A\cup\mathcal B}=O_H(x/\log^H x).              \tag{15}
\]

This improves the preceding elementary uniform range de<=x^(7/10).
That argument also permitted any fixed exponent below 71/100; neither
fact is a claim that its endpoint or this note's endpoint is included.

## 5. The exact remaining sum and sufficient consumer

For a concrete fixed choice take theta=3/4 and lambda=49/20. The right
zero budget is at most 199/200 and the left cross budget at most
399/400, before arbitrarily small truncation and epsilon losses. Define

\[
 \mathcal W_* =\{U<d\le D_0,\ Y<e\le E_0:
          de>\lfloor x^{3/4}\rfloor,
          \ d^5 e^2>\lfloor x^{49/20}\rfloor\},
\]

\[
 E_*(x)=\sum_{(d,e)\in\mathcal W_*}\mu(d)\mu(e)
       \sum_{r\in\mathcal P_V,\ s\in\mathcal P_Z}
                     \alpha_r\alpha_s\mathcal E_{d,e,r,s}(x).
                                                               \tag{16}
\]

Every symbol in this kernel is the exact weighted, compatible CRT kernel
in signed-divisor-grouping.md (17)--(18), including zero for incompatible
gcd and the original endpoint convention. Thus no boundary contribution
is implicit in (16). Inclusion-exclusion accounts for overlap of the
two controlled cuts exactly.

The quantitative reduction in
[endpoint-target-audit.md](endpoint-target-audit.md) now becomes

\[
 \sum_{x/2<n\le x}\Lambda(n)\Lambda(n-2)
       =C_2x+E_*(x)+O_H(x/\log^H x)\qquad(H>0).             \tag{17}
\]

The sufficient **OPEN** hypothesis is still, for fixed c,K>0,
C2*x+E_*(x)>=c*x/log^K x on an unbounded set of dyadic scales,
or the precise logarithmically rescaled positive-average condition from
that note with E_* substituted. The union bound (15) justifies this
substitution at every fixed logarithmic precision. No such margin has
been established.

The limiting unhandled region of this family is explicitly

\[
 \delta+\nu\ge19/25,\qquad5\delta+2\nu\ge123/50,
 \quad\hbox{inside (1)}.                                  \tag{18}
\]

For the concrete fixed cuts in (16), retain the strips between 3/4 and
19/25, and between 49/20 and 123/50. They are not discarded as negligible.
For example (delta,nu)=(2/5,2/5) lies in the open complement even of
the limiting region. Its right cross/zero/period budgets are respectively
179/200, 51/50, 21/25; the left cross budget is 217/200. At this box,
improving the already smaller right cross term does not close the bound.
There is no argument converting the geometric area of (18) into the
size or sign of E_*.

## 6. Next arithmetic target: retain the divisor signs before the extra Cauchy

For the full product edge the limiting term is J_R, the equal-frequency
part after the second Cauchy inequality. For the left edge it is W_L,
the nonzero first-power cross term. The exceptional norm is no longer
the term that must be improved at either edge of (11).

A specific next test is the right first-power sector at
delta=nu=2/5, with a=16/25 and b=9/20. In the native orientation set

\[
 Y_e(m)=\sum_{\substack{q\ {m odd\ prime},\ q\le Z\\
                      eq\sim N,\ q\nmid e}}
       \sum_{h\sim A}(\log q)c_h1_{(m,eq)=1}
       e_{eq}(-\theta h\overline m)
       \left[e\left(\frac{hz_0}{gmeq}\right)
               -e\left(\frac{hz}{gmeq}\right)\right],
\]

with ge in the original right interval and g in {1,2}. Fix prime and
harmonic bands as in the existing proof, retaining the exact support
cuts. Write gamma_e=mu(ge). First Cauchy, in the other divisor, requires
an upper bound on

\[
 \mathcal M=\sum_{m\sim M}\left|\sum_{ge\in J}
                                     \gamma_eY_e(m)\right|^2.
                                                               \tag{19}
\]

The current second Cauchy replaces it by
O(E) sum_(ge in J,m~M)|Y_e(m)|^2. Instead expand (19) as its e1=e2
part plus the real signed sum

\[
 \mathcal X=\sum_{\substack{ge_1,ge_2\in J\\e_1\ne e_2}}
       \mu(ge_1)\mu(ge_2)
           \sum_{m\sim M}Y_{e_1}(m)\overline{Y_{e_2}(m)}.   \tag{20}
\]

This retains Mobius signs absent from the earlier moment. Its complete
moduli are lcm(e1*q1,e2*q2); the common factors and rational-frequency
collisions must be computed before completion. The zero-frequency part
within a fixed e is nonnegative; cancelling it after taking an absolute
second moment is not an available argument.

For this **specified sector and box**, the e-diagonal in (19) has the
old three block budgets reduced by nu/2=1/5: 139/200, 41/50, 16/25.
This follows by removing the factor E in the squared bound, not by
assuming additional cancellation. They are all below one. Since the
other coefficient has F^2<<x^(16/25) times logarithms, a uniform upper bound
X<=C*x^(34/25-epsilon) with fixed C,epsilon>0 would suffice for this
sector, after the diagonal is included. The existing Cauchy bound has
moment budget x^(7/5+epsilon), so this target asks for more than a
1/25 saving in its exponent. Keep endpoint uniformity, power/prime
bands and logarithmic losses in this comparison.

This target is **OPEN** and is not yet a full-box result: the other
coefficient sectors must also be handled, and the full complement (18)
is larger than this one box. The [structural literature audit](structural-literature-audit.md)
derives the exact cross-divisor kernels in (20), including equal rational
frequencies, and checks relevant theorem interfaces. The
[grouped-divisor moment](grouped-divisor-moment.md) now controls this
entire benchmark and an additional exact cut by retaining the full
coefficient before a further Cauchy inequality. It specifies E_dagger
as the current complement and a remaining small-common-divisor target.
The global endpoint margin remains OPEN. Improving W_L alone remains a
possible local extension, with a different coverage consequence.

## 7. Validation, falsifiers and limits

[residual-coverage-validation.js](residual-coverage-validation.js) tests
the twisted decomposition against the original convolution, including
clipped intervals and the p=2,g=2 reduction. It constructs first-branch
moments from the original divisors and independently regroups them by
the shorter base, checking both orientations. Exact BigInt residues test
the endpoint shift, with an active wrong-shift control. Rational budget
checks test the two simplified regions and prior-region inclusion.

The saved [factor windows](data-reuse/factor-windows.json) are reused for
the original signed beta weights and exact inclusion-exclusion masks.
The monomial cut is evaluated with BigInt, including values above the
safe integer range. Nonzero overlap makes omitting the intersection an
active failed control. Full inputs and summaries are retained in
[data-reuse/residual-coverage.json](data-reuse/residual-coverage.json).
The validator completed in 1.4 seconds: 146,016 twisted coefficient
identities, 47,172 exact phase residues, forty first-branch/low moment checks
with 535,900 expanded pairs, and 117,711 rational grid checks. The archived
partition uses 273,177 weighted divisor pairs; 231,071 monomials exceed
the safe integer range. These counts describe finite checks only.
The computation is bounded by three minutes, within the user's allowance.

All fourteen strict QC gates report zero findings. The verifier self-tests
pass all 58 known positives and 47 controls. The independent existing
numerical audit passes 251/251 checks in 164.7 seconds. The new validator
and that audit together take under three minutes of numerical runs.

A wrong first-branch power, dropped p=2 reduction, unshifted reciprocal
endpoint, or double-counted intersection would invalidate the extension;
the finite identity checks for these have run. They do not prove the
analytic uniformity, which is supplied by the written bounds and the
explicit separation argument. Mechanical repository gates do not act
as independent mathematical refereeing. No novelty, optimality, effective
onset or asymptotic twin lower bound is claimed.
