# Separating the small-common-divisor kernel, and what the Kloosterman-fraction interfaces cost

<!-- ledger
id: Q-small-divisor-kernel
status: ANSWERED
todo: C
parity: Reciprocity, Mellin separation and norm-only bilinear interfaces. The Mobius and von Mangoldt structure of the aggregated coefficients is used only through pointwise and L2 bounds, so no cancellation of their signs is claimed or needed; conversely none is extracted. Both gcd branches, both endpoint conventions, all harmonic bands, complete periods and the divisor twists are carried. The negative pricings scope to the reviewed theorem statements only; no universal parity or method obstruction is asserted.
question: Does reciprocity separate the j<=x^(1/20) kernel of grouped-divisor-moment (21) at delta=8/25, nu=9/20, and do the Duke-Friedlander-Iwaniec / Bettin-Chandee and Kuznetsov interfaces then supply the required saving?
verdict: The separation is exact and cheap: reciprocity splits index by index, the correction phase has sup norm and total variation O(A/(MN))=O(1/x) at this box, and Mellin separation of the endpoint weight costs x^epsilon with L1 mass min(1,Ax/(MN)), so the whole block reduces to a pure trilinear Kloosterman fraction with unimodular twists. The interfaces then fail by explicit amounts: Bettin-Chandee Theorem 1 gives block exponent 129/125, above the required 1 by 4/125 and above the classical 103/100; DFI (1.1) gives 1267/1200; every box Bettin-Chandee controls is already controlled, verified on 19005 rational boxes; the audit's spectral diagnostic factor is trivial for all common divisors up to x^(19/50). Closing this box inside the same interface needs the (M+N) exponent below 27/140 or the (AMN) exponent below 9/28. Target (21) and the global twin margin remain OPEN; nothing is added to the controlled region.
-->

**No new region is controlled by this note, and twin-prime infinitude
remains OPEN.** The result is a derived separation of the remaining
kernel plus three priced negative interface tests. The global consumer
[grouped-divisor-moment (20)](grouped-divisor-moment.md) is unchanged:
E_dagger, its cut set (19) and W_dagger are exactly as before. A failed
upper bound is a failure of the stated estimate, not evidence about the
size or sign of the underlying correlation.

Throughout, the box is (delta,nu)=(8/25,9/20) from
[RESEARCH-HANDOFF §5](RESEARCH-HANDOFF.md), so the expanded lengths are
M<<x^(14/25), N<<x^(1/2), the top harmonic band is A~x^(3/50), and
a=14/25, b=1/2, alpha=3/50 denote their logarithms to base x. Write
v=Ax/(MN) and f=min(1,v); the top band is exactly v=1.

## 1. What already carries the pressure, and what is left

The right orientation's block is

\[
 T=\sum_{m\in I_m}A_{\rm left}(gm)
   \sum_{u\sim N}b_u\sum_{h\in H}c_h1_{(m,u)=1}
        e_u(\sigma\theta h\bar m)\Phi_{u,h}(m),                   \tag{1}
\]

with b_u=A_right(gu), |b_u|<=B log x, |c_h|<=C/A, g in {1,2},
theta=2/g, sigma in {-1,1}. Controlling the rectangle needs
|T|<<x^(1-eta) for a fixed eta>0, uniformly over boxes, bands,
endpoints, gcd branches and the divisor twists.

The moment route bounds |T| by (sum_m |A_left(gm)|^2)^(1/2) times the
square root of the moment in
[grouped-divisor-moment (1)](grouped-divisor-moment.md), the first
factor being O(M^(1/2) log x). The moment's four classes have these
**block** exponents at this box:

| class | source | block exponent | margin below 1 |
|---|---|---|---|
| equal frequency R=0 | (5) | 39/50 | 11/50 |
| complete periods, all j | (11) | 14/25 | 11/25 |
| nonzero R, j>x^(1/20) | (12) | 397/400 | 3/400 |
| nonzero R, j<=x^(1/20) | (10) | 103/100 | deficit 3/100 |

Only the last exceeds one, and its majorant on a dyadic band j~J is
N^3/J^(3/2). Summing that geometrically, the single band j in [1,2)
already carries 1/(sum_{k>=0}2^(-3k/2))=64.6% of the majorant, and no
restriction j<=J_1 with J_1 fixed lowers the exponent below 3/2.
**The residual pressure is a coprime-pair problem, not a
small-common-divisor problem**: the whole 3/50 moment deficit is
present at j=1 alone. The label "small common divisor" describes where
(12) stops, not where the mass sits.

## 2. The exact completed kernel, with the coupled weight displayed

For an ordered pair set j=(u_1,u_2), u_i=j*ell_i, (ell_1,ell_2)=1,
c=j*ell_1*ell_2, R=h_1*ell_2-h_2*ell_1, r=-theta*R, and
F(m)=Phi_{u_1,h_1}(m)*conj(Phi_{u_2,h_2}(m)). Expanding both endpoint
differences gives the exact four-term form

\[
 F(m)=\sum_{\epsilon_1,\epsilon_2\in\{0,1\}}
   (-1)^{\epsilon_1+\epsilon_2}
   e\!\left(\frac{\lambda_{\epsilon_1\epsilon_2}}{m}\right),\quad
 \lambda_{\epsilon_1\epsilon_2}
  =\frac1g\left(\frac{h_1z^{(\epsilon_1)}}{u_1}
               -\frac{h_2z^{(\epsilon_2)}}{u_2}\right),          \tag{2}
\]

with z^(0)=z_0', z^(1)=z' the two endpoints, |z^(i)|<=x. Each
|lambda|<<Ax/N and |lambda/m|<<v. The complete Fourier expansion of the
kernel over the modulus c is then exactly

\[
 K=\sum_{m\in I_m,(m,c)=1}e_c(r\bar m)F(m)
  =\frac1c\sum_{t\bmod c}\widehat F(t)S(t,r;c),\quad
 \widehat F(t)=\sum_{m\in I_m}F(m)e_c(-tm),                      \tag{3}
\]

and the target is

\[
 \mathcal X_{\rm small}
 =\sum_{j\le x^{1/20}}\ \sum_{(\ell_1,\ell_2)=1}\ \sum_{h_i\in H,\ R\ne0}
   b_{j\ell_1}\overline{b_{j\ell_2}}c_{h_1}\overline{c_{h_2}}\,K.  \tag{4}
\]

The coupling is entirely in lambda: F depends on (u_1,h_1,u_2,h_2)
through the two ratios h_i/u_i, and hatF(t) additionally depends on c.
This is the reason a bilinear theorem for independent coefficient
sequences is not directly applicable to (3)--(4).

## 3. The separation cost is x^epsilon, and only because v<=1 here

Take one factor e(h z/(g m u)) of (2) and set kappa=z/g, so
|kappa|<=x, and y=h/(mu), so y lies in [Y/4,2Y] with Y=A/(MN) and
|kappa|Y<=v. Fix Psi in C_c^infty((1/16,16)) with Psi=1 on [1/8,8] and
put W(y)=e(kappa y)Psi(y/Y), or W(y)=(1-e(kappa y))Psi(y/Y) when the
two endpoints are kept together. Repeated integration by parts gives,
for every j>=0,

\[
 |\widehat W(it)|\ll_j\frac{\min(1,|\kappa|Y)(1+|\kappa|Y)^j}{(1+|t|)^j},
 \qquad
 \int_{-\infty}^{\infty}|\widehat W(it)|\,dt\ll f.                \tag{5}
\]

Truncating at |t|<=(1+v)x^epsilon leaves O(x^(-100)), and on Re(s)=0

\[
 y^{-s}=h^{-it}m^{it}u^{it}.                                      \tag{6}
\]

So the endpoint weight separates into **unimodular** factors attached to
h, m and u. Three consequences, all used below.

1. Separation in u is free up to x^epsilon, even though u sits in the
   denominator of the phase: (6) separates the product mu
   multiplicatively, and u^(it) leaves |b_u| and ||b||_2 unchanged.
2. The only cost is the truncation height (1+v)x^epsilon and the L1
   mass f. At this box v<=1 on every retained band, so the cost is
   x^epsilon and the gain f is retained on the lower bands. This is the
   same (1+v) and f bookkeeping as
   [grouped-divisor-moment (6)](grouped-divisor-moment.md); it is cheap
   here only because A<=MN/x.
3. The independent divisor twists d^(-s), (de^3)^(-t) of
   [residual-coverage §4](residual-coverage.md) and
   [grouped-divisor-moment §5](grouped-divisor-moment.md) have
   nonnegative real part, so they multiply b_u and A_left(gm) by factors
   of modulus at most one. Any interface that sees the coefficients only
   through their L2 norms is therefore automatically uniform in the
   twists and in the twist heights.

After (5)--(6) the block (1) is, up to x^epsilon and the factor f, the
pure trilinear Kloosterman fraction

\[
 \mathcal T=\sum_{m\sim M}\sum_{u\sim N}\sum_{h\in H}
   \alpha_m\beta_u\nu_h1_{(m,u)=1}\,
   e\!\left(\frac{\sigma\theta h\bar m}{u}\right),                \tag{7}
\]

with ||alpha||_2<<M^(1/2)log x, ||beta||_2<<B N^(1/2)log x,
||nu||_2<<C A^(-1/2), and arbitrary complex coefficients supported on
the boxes. The trivial bound is |T|<<MN x^epsilon=x^(53/50+epsilon).

## 4. Reciprocity splits the kernel exactly, and buys nothing here

For (m,u)=1 with a=inverse of m mod u and b=inverse of u mod m,
(am+bu-1)/(mu) is an integer, so

\[
 e_u(\sigma\theta h\bar m)
  =e\!\left(\frac{\sigma\theta h}{mu}\right)
   e_m(-\sigma\theta h\bar u).                                    \tag{8}
\]

Applying (8) to each index of a pair and using
ell_2*inverse(j ell_1 ell_2)=inverse(j ell_1) modulo m,

\[
 \theta R\,\overline{c}\equiv\theta h_1\overline{u_1}
                            -\theta h_2\overline{u_2}\pmod m,
 \qquad
 \frac{\theta R}{mc}=\frac{\theta h_1}{mu_1}-\frac{\theta h_2}{mu_2}.
                                                                  \tag{9}
\]

Both halves of (9) are exact integer, respectively rational, identities;
they are checked in the validator. Three readings.

**(a) It does reproduce the left orientation with modulus m.** By (9)
the small-j kernel of (4) is precisely the pair expansion of
sum_m |sum_{u,h} beta_u nu_h e_m(-sigma theta h ubar) Psi_{u,h}(m)|^2
restricted to j<=x^(1/20) and R!=0. Moreover the correction phase in
(8) merges with the endpoint factor: since theta=2/g,

\[
 e\!\left(\frac{\sigma\theta h}{mu}\right)\Phi_{u,h}(m)
 =e\!\left(\frac{h(2\sigma+z_0')}{gmu}\right)
 -e\!\left(\frac{h(2\sigma+z')}{gmu}\right),                     \tag{10}
\]

so reciprocity **interchanges the two endpoint conventions**: native
(sigma=-1, endpoints x/2 and z) becomes reciprocal (x/2-2, z-2) and
back. That is a consistency check on the sign conventions of
[residual-coverage](residual-coverage.md), not a new estimate.

**(b) The correction phase is negligible at this box.** From (9),
|theta R/(mc)|<<A/(MN)=x^(-1) and its m-derivative is
<<A/(M^2N), so its total variation across I_m is also O(x^(-1)).
Removing it costs, absolutely, at most
(number of pairs)*(coefficient mass)*(M/x)<<N^2*M/x=x^(14/25), far
below every budget in §1. So (5) and (12) transfer between the two
orientations unchanged up to that error.

**(c) It gains nothing at the interface below and loses at the
classical one.** Bettin-Chandee's bound depends on the two non-harmonic
lengths only through the symmetric quantities AMN, M+N and A(M+N), so
it is invariant under the exchange (8) performs: applying it after
reciprocity gives the identical exponent. For the classical
Weil/completion route the exchange is strictly worse: the grouped left
budgets swap a and b, giving b/2+3a/2=109/100 in place of
a/2+3b/2=103/100. (The separate earlier left estimate quoted as
101/100 in [grouped-divisor-moment §6](grouped-divisor-moment.md) is a
different bound and also exceeds one.)

## 5. Pricing the interfaces

### 5A. Duke-Friedlander-Iwaniec and Bettin-Chandee

**Imported statement.** [Bettin-Chandee, *Trilinear forms with
Kloosterman fractions*, arXiv:1502.00769v1](https://arxiv.org/abs/1502.00769)
(3 February 2015; published in Adv. Math.), Theorem 1, read 2026-09-06
in the ar5iv rendering of v1. With coefficients supported on dyadic
intervals M=[M/2,M], N=[N/2,N], A=[A/2,A], the coprimality (m,n)=1, m
inverted modulo n, and any nonzero real vartheta,

\[
 \mathcal B(M,N,A)=\sum_{a,m,n}\alpha_m\beta_n\nu_a
        e\!\left(\frac{\vartheta a\bar m}{n}\right)
 \ll\|\alpha\|\|\beta\|\|\nu\|
   \left(1+\frac{|\vartheta|A}{MN}\right)^{1/2}
   \Big[(AMN)^{7/20+\epsilon}(M+N)^{1/4}
       +(AMN)^{3/8+\epsilon}(AN+AM)^{1/8}\Big],
\]

with L2 norms. Remark 1 permits a C^1 perturbation of the argument with
|df/dx|<<X/(x^2y), |df/dy|<<X/(xy^2), replacing the first factor by
(1+(|vartheta|A+X)/(MN))^(1/2). Their (1.1) records the DFI bound
B_a(M,N)<<||alpha||||beta||(a+MN)^(3/8)(M+N)^(11/48+epsilon), for
[Duke-Friedlander-Iwaniec, *Bilinear forms with Kloosterman fractions*,
Invent. Math. 128 (1997), 23-43](https://link.springer.com/article/10.1007/s002220050135).

**Hypotheses checked against (7).** The inverted variable is m, the
modulus is u, so (m,n)_BC=(m,u)_ours, exactly the coprimality already
present. vartheta=sigma*theta in {-2,-1,1,2}, nonzero. Supports are
dyadic. Coefficients are arbitrary complex, so the sharp interval I_m,
an arbitrary harmonic subset H, both gcd branches, all repeated-prime
and prime-2 sectors, and the unimodular twists of §3 are all admissible
without further hypotheses. The endpoint weight is handled either by
(5)--(6) or, independently, by Remark 1 with X=Ax: our perturbation
h*w/(g m u) has partial derivatives h*w/(g m^2 u) and h*w/(g m u^2),
matching the required shape with X asymptotic to Ax, so its factor is
(1+(|vartheta|A+Ax)/(MN))^(1/2)=(1+v)^(1/2)=O(1) here. The two routes
agree at the top band; (5)--(6) also retains f on the lower bands.

**Hypothesis not available.** None fails. This interface applies.

**The pricing.** On the transition band alpha=a+b-1 the prefactor is
exactly x^(1/2): ||alpha||||beta||||nu||*f contributes
(a+b-alpha)/2+(alpha+1-a-b)=1/2. So the block exponent is
1/2 plus the larger bracket exponent, and both bracket exponents are
strictly increasing in the band exponent, so the top band binds. At
a=14/25, b=1/2, alpha=3/50:

\[
 \boxed{\tfrac12+\tfrac7{20}\!\left(\tfrac{28}{25}\right)
        +\tfrac14\!\left(\tfrac{14}{25}\right)=\tfrac{129}{125}>1.}
                                                                 \tag{11}
\]

The second bracket term gives only 399/400<1. **The first term is the
whole failure**, by 4/125. For comparison the classical budget is
103/100 and the trivial bound 53/50, so at this box Bettin-Chandee is
weaker than classical completion by 1/500 and short of what is needed
by 4/125. DFI (1.1) alone, with the harmonic band summed trivially,
gives 1267/1200, weaker still.

**What would have to change.** Holding the other exponent fixed,
replacing (M+N)^(1/4) by (M+N)^kappa closes this box iff kappa<27/140,
and replacing (AMN)^(7/20) by (AMN)^gamma closes it iff gamma<9/28.
Note 9/28<1/3: even an (AMN)^(1/3) first term would not suffice.

**Region.** The BC conditions at the top band are
(7/10)(a+b)+(1/4)max(a,b)<17/20 and (7/8)(a+b)+(1/8)max(a,b)<1. Over
19005 rational boxes covering delta in [6/25,19/25], nu in [1/20,19/20],
the 3218 boxes BC controls are **all** inside the 7004 already
controlled by
delta+nu<19/25 or 5delta+2nu<123/50 or (delta<19/25 and delta+3nu<161/100);
3786 already controlled boxes lie outside BC, and none lie outside the
existing region. So this interface **adds no region at all**.

**Two later papers, both unusable here.**
[Dong-Robles-Zeindler, arXiv:2601.00292](https://arxiv.org/abs/2601.00292)
claimed a 1/12 balanced saving in place of DFI's 1/48; the paper stands
at v2 (2026-01-05) with an author erratum recording that "a factor of
L^2 was accidentally missed in equation (2.53)", so the claimed
improvement does not follow; the authors state the rest of the argument
is still valid. The improvement must not be imported.
[Wright, *Trilinear Kloosterman fractions I*, arXiv:2604.25177v2](https://arxiv.org/abs/2604.25177),
Theorem 2.1, improves BC when the denominator carries a **fixed** factor
R, bounding the same sum over (m,nR)=1 by an asymmetric bracket with a
leading R^(1/4). Read only through a fetched rendering, so treat as a
secondary reading: at R=1 its bracket prices to block exponent
1023/1000 at this box, still above one. Our modulus u is an arbitrary
expanded divisor with no forced factor beyond g in {1,2}; a canonical
smooth-part factorisation u=Ru' does produce a fixed R, but the R=1
class survives and its bound is the R=1 bound, so nothing is gained.

### 5B. Kuznetsov and the spectral large sieve

The audit's diagnostic
([structural-literature-audit §3A](structural-literature-audit.md),
Pascadi arXiv:2404.04239v3, Theorem 3; translation inherited from that
note, not re-derived here) puts L=N/J, H=A, K asymptotic to HL at level
q asymptotic to L^2, with the extra factor comparable to max(1,H^2/L)
when H<=L. Here H^2=x^(3/25) and L=x^(1/2)/J, so the factor is trivial
for every J<=x^(19/50). That contains the entire remaining range
J<=x^(1/20) with a wide margin: **the structured spectral advantage is
absent exactly where the deficit sits**, and present only where (12)
already suffices.

A Kuznetsov application independent of that theorem needs complete
Kloosterman sums whose coefficients do not depend on the modulus. Both
available completions fail that at this box, and the failure is
explicit rather than inherited:

* completing u modulo m in (7) gives (1/m)*sum_{t mod m} hatbeta_m(t)
  S(theta h,t;m) with hatbeta_m(t)=sum_u beta_u e(tu/m): the coefficient
  depends on the modulus m;
* completing m modulo c in (3) gives hatF(t) and S(t,r;c) where c is
  itself the summation variable, and both hatF and r=-theta R depend on
  the factorisation c=j*ell_1*ell_2.

Naming a specific DI theorem number here would be an assumed rather than
a checked dependency: [Deshouillers-Iwaniec, Invent. Math. 70 (1982)] was
not reachable in this session. The obligation is stated structurally and
must be discharged against the primary text before any such import.

### 5C. Composite-modulus bilinear Kloosterman sums

[Blomer-Pascadi, arXiv:2607.24311v1](https://arxiv.org/abs/2607.24311),
Theorem 1.1, and
[Pascadi, GAFA published version](https://link.springer.com/article/10.1007/s00039-026-00746-0),
Theorems 1.1-1.2, require a bilinear form in complete Kloosterman sums
with two separated coefficient sequences on intervals of length B<=c.
The audit's instruction was to reach §3B only for a separated short
bilinear subexpression. **No such subexpression appears.** Equation (7)
carries no complete Kloosterman sum; the only one available is in (3),
where the pairing is (t mod c) against r, the t-interval has full length
c, and the modulus c=j*ell_1*ell_2 is itself one of the summation
variables. At B=c the displayed savings in Theorem 1.1 are larger than
one. The balanced factorisation c=ell_1*ell_2 with both factors near
x^(1/2) is genuinely present at j=1 and is the one structural feature of
this box that Theorem 1.2 is built for; the missing input is a
short separated pair of coefficient sequences against a fixed modulus,
not the factorisation. Constructing one, if possible, is the only route
in §3B that this note does not close.

## 6. Region of validity and effect on the global consumer

The derived items are (8)-(10), the correction-phase bound in §4(b), the
separation (5)-(6), and the interface pricings (11) and §5B-§5C. The
separation results hold on any expanded box with A<=MN/x, that is v<=1,
for both gcd branches, both endpoint conventions, all coefficient
sectors and uniformly in the divisor twists; the constants depend only
on epsilon and on the fixed power bounding the lengths. The pricings are
exact rational statements at (delta,nu)=(8/25,9/20) and, for the region
claim, on the stated rational grid.

**Effect on E_dagger: none.** The cut set
[grouped-divisor-moment (19)](grouped-divisor-moment.md) and the
reduction (20) are unchanged, and (21) remains OPEN. The controlled
region is still
delta+nu<19/25 or 5delta+2nu<123/50 or (delta<19/25 and delta+3nu<161/100),
with the uniform product threshold still every fixed exponent below
19/25. Controlling this rectangle would not by itself prove the
sufficient global margin of
[RESEARCH-HANDOFF §3](RESEARCH-HANDOFF.md), and failing to control it
proves nothing about the sign or size of the correlation.

What is reusable is the reduction itself: the block is now a pure
trilinear Kloosterman fraction (7) with unimodular twists and known
norms, so any future DFI-type bound plugs straight in, and the exact
thresholds it must beat are kappa<27/140 or gamma<9/28.

## 7. Validation and falsifiers

[small-divisor-kernel-validation.js](small-divisor-kernel-validation.js)
checks the reciprocity law as an integer identity, the index-by-index
split (9) modulo m and as exact rationals, the complex form of (8), the
endpoint interchange (10) in both directions, the size and m-variation
of the correction phase on a model box, and every rational exponent in
§5 including the region containment. Negative controls reverse the sign
in the reciprocity law, use the product u_1u_2 in place of the lcm,
drop theta, use the wrong sign in the correction split, and replace the
existing region by one of its three conditions; the last produces 722
containment violations, so the containment test is not vacuous. The
deterministic artifact is
[small-divisor-kernel-validation.json](small-divisor-kernel-validation.json).

These checks verify identities and arithmetic, not the imported papers'
proofs and not any asymptotic rate. What would change the conclusions:
a corrected reading of Bettin-Chandee Theorem 1 with different
exponents; a first-term improvement past 27/140 or 9/28; a modulus
factorisation exposing a genuinely short separated bilinear form for
§5C; a Kuznetsov formulation whose coefficients are modulus-independent;
or an error in the separation, in which case (7) is not the right
reduction and §5 prices the wrong object.
