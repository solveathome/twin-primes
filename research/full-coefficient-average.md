# Complete coefficients: an exact Fourier representation, without a matched estimate

<!-- ledger
id: Q-full-coefficient-average
status: PARTIAL
todo: C
parity: Exact complete-coefficient divisor algebra and Fourier separation, with the log t lift and the composite filter written out. The full family has the envelope 2^omega; low modes are 1-bounded but the full family is not; the composite filter is not multiplicative; an unweighted cancellation theorem does not control a nonconstant arithmetic weight. The 2026-09-08 continuation proves, with PNT as the only arithmetic input, that every representation of the smooth-part coefficient by 1-bounded functions has norm at least (log x)^(2/5), and identifies the both-rough composite pair sum inside every Fourier component. No new correlation estimate, sieve asymptotic or universal representation obstruction beyond that scope is asserted.
question: Can aggregating the complete coefficients before a correlation theorem remove the explicit cofactor count, and what additional estimate is needed?
verdict: Exact factor and rounded-endpoint Fourier identities retained, with c_(i,0)=3/5 and an explicit composite-filtered weighted sum. The full family is not 1-bounded, but the sufficient phase condition admits at least k=0,+/-1 on the left and l=0,+/-1,...,+/-6 on the right for every Mellin twist; the earlier zero-only claim is corrected. Composite filtering and the required correlation rate remain unmatched. Proposition 6.5, independently reviewed including on 2026-09-09, proves coefficient norm at least (log x)^(2/5) for representations by 1-bounded functions on all smooth inputs. This does not exclude density-one representations, paid growing components or a jointly treated Fourier sum. No sufficient signed twin margin follows.
-->

**Twin-prime infinitude and all sufficient signed margins remain OPEN.**
Sections 1–5 are lane C's retained result after
[research-round-validation.md](research-round-validation.md), section 3.
The original submitted text is in commit a5e1244. Section 6 is the
2026-09-08 continuation (second dispatch) with the precise weighted sum,
the executed source match and a proved norm obstruction; the handler's
review of it is [research-round-validation.md](research-round-validation.md)
section 8.

## 1. Complete coefficient and exact factor identity

Use the profiles of [global-smooth-majorant.md](global-smooth-majorant.md):
(a_L,b_L,W_L)=(floor(x^.22),floor(x^.24),floor(x^.24)) and
(a_R,b_R,W_R)=(floor(x^.04),floor(x^.05),floor(x^.05)).
Write rhohat_i(d)=chi(log(d/a_i)/log(b_i/a_i)),
F_i(s)=sum_(d|s)mu(d)rhohat_i(d), s_i(n) for the W_i-smooth part,
t_i(n)=n/s_i(n), and
\[
 D_i(n)=\log t_i(n)F_i(s_i(n)),\qquad
 E_i(n)=\sum_{\substack{p\le W_i,\ j\ge2\\p^j\mid n,\ p^j>W_i}}
            \log p\,F_i(n/p^j).
\]
For n>W_i the exact identity from global-factor-signs (4) is
\[
 \widehat G_i(n)=\Lambda(n)-D_i(n)-E_i(n).                 \tag{1}
\]
It applies to both arguments n,n-2 on J_x for sufficiently large x.

Define Rhat=sum_J Ghat_L(n)Ghat_R(n-2),
X_L=sum_J Lambda(n)D_R(n-2), X_R=sum_J D_L(n)Lambda(n-2), and
Y=sum_J D_L(n)D_R(n-2). The owning exceptional-set budget gives
\[
 \widehat{\mathcal R}=S-X_L-X_R+Y+O_\epsilon(x^{39/40+\epsilon}).
                                                               \tag{2}
\]
Combining with the existing S=C2*x+Rhat+O_A(x/log^A x) yields
\[
 X_L+X_R-Y=C_2x+O_A(x/\log^A x).                         \tag{3}
\]
This is a consequence of the existing reduction, not a new estimate.
It does not rule out new inequalities involving these objects.

## 2. Fourier representation with the actual rounded endpoints

Put w_i(x)=log(a_i)/log x and w'_i(x)=log(b_i)/log x. For sufficiently
large x these endpoints are distinct, lie in (0,1), and their difference
is bounded below by a positive fixed constant. Define
h_i(v)=1-chi((v-w_i)/(w'_i-w_i)), and on [0,2) set
hper_i(v)=h_i(v)-h_i(v-1.2), extended periodically.

It is C3 and piecewise polynomial; its fourth derivative is integrable
with a bound uniform for large x. For
c_(i,k)(x)=(1/2)int_0^2 hper_i(v)exp(-i*pi*k*v)dv, four integrations
by parts give |c_(i,k)(x)|<=C(1+|k|)^(-4) with C independent of x.
Consequently N_i(x)=sum_k|c_(i,k)(x)| is uniformly bounded and the tail
beyond K_0 is O(K_0^(-3)). It is not literally independent of x.

Absolute convergence and finite divisor summation give, exactly for d,s<=x,
\[
 1-\widehat\rho_i(d)=\sum_k c_{i,k}(x)d^{\,i\pi k/\log x},
 \qquad
 F_i(s)=1_{s=1}-\sum_k c_{i,k}(x)g_k(s),                 \tag{4}
\]
where
\[
 g_k(s)=\prod_{p\mid s}(1-p^{\,i\pi k/\log x}).
\]
Thus g_k is multiplicative, has g_k(p^v)=1-p^(i*pi*k/log x), and
|g_k(s)|<=2^omega(s). The function of n used in the coefficient is
g_k(s_i(n)): at p>W_i its prime-power value is 1, not 0. The term
1_(s_i(n)=1) is the W_i-rough indicator and also must be retained.

This removes an explicit enumeration of smooth cofactors from the
representation. It does not yet remove any loss from a proved estimate.
The measured norms 2.8247 and 3.0963 are finite Fourier sums for the
validator's fixed-exponent, unfloored proxy. They are neither certified
infinite norms nor the norms of every rounded profile. The new review
validator tests the endpoint distinction directly.

## 3. What is and is not excluded

**Available class.** The displayed g_k can have prime values of modulus
greater than 1, so a theorem restricted to 1-bounded functions does not
apply directly. The 45-prime construction in the original validator gives
F_L=C(44,10)=2481256778 at all sufficiently large scales with primes in
fixed strict exponent subintervals of (.24/11,.22/10). It follows that a
representation by 1-bounded functions needs coefficient norm at least
that constant. By itself it does not show that no larger x-independent
norm exists; Proposition 6.5 now supplies a sequence with norm tending
to infinity, at least (log x)^(2/5), on the set of all W_L-smooth inputs.

**Weighted transfer.** Dividing by 2^omega makes a 1-bounded function but
leaves a nonconstant arithmetic weight in the correlation. An unweighted
saving cannot be multiplied by an unsigned envelope to bound the
weighted signed sum. The previously reported O(x log^(4-c) x) is therefore
not an established transfer estimate. The finite envelope computation is
retained only as a measurement. A valid argument needs weighted
correlation control, or a decomposition of the weight with its costs.

**Main terms and quantifiers.** There is no proved common main-term formula
for every component in (4). Some terms, such as the rough indicator, do
not fall under a cancellation conclusion. A candidate theorem must match
the actual family, its dependence on x, the log t_i factors, shift 2,
twists, exceptional scales and complete error budget. A signed lower
bound might suffice; a full asymptotic is not proved necessary.

**Smooth-part truncation.** For D_i(n) nonzero one has t_i(n)>1 and
s_i(n)<=x/W_i. The left subfamily s=p_1p_2p_3 with exponents strictly
inside (.18,.22) has F_L(s)=-2 for sufficiently large x and s>x^.54.
Mertens summation gives limiting harmonic mass
(1/3)log(.22/.18)^3=0.002694 to the reported precision. Thus a cutoff at
x^(1/2-eps) omits nonzero coefficients. Harmonic mass alone is not an
estimate for their signed shifted correlation.

These facts exclude the direct theorem applications tried here. Together
with section 6 they exclude bounded-norm representations by 1-bounded
components on all smooth inputs; they do not exclude a signed inequality,
a representation with paid growing components, or a future coefficient
estimate that treats the Fourier sum jointly.

## 4. Prior work and source matrix

The factor identity and exceptional-set budget belong to
[global-factor-signs.md](global-factor-signs.md); the smooth profiles and
majorant to [global-smooth-majorant.md](global-smooth-majorant.md).
Mellin/Fourier separation is classical; we make no novelty claim.

The following records the worker's reading scope. The unit-disc
restriction in Klurman and the independent-linear-forms restriction in
Matthiesen were rechecked during integration. The latter excludes the
one-variable pair n,n-2. Other rows are retained as source-search records,
not as fresh theorem audits.

| source, version, locator | class and shape | error | first unmatched hypothesis |
|---|---|---|---|
| Klurman, arXiv:1603.08453v1 (28 Mar 2016), Compositio 153 (2017) 1622-1657, Theorem 1.3 and Theorem 1.5; PDF SHA-256 `502591fd12faf60e76ce6dc59d931880780cba824fa0ea03765b6bb46d08c43c` | f,g: N -> U (unit disc), fixed, with D(f,n^(it)chi;infinity)<infinity; two polynomials with nonzero resultant, in particular f(n)g(n+d); asymptotic with an Euler-product main term | Error << D_P(1,f;log x;x)+D_Q(1,g;log x;x)+1/log log x; qualitative o(1) for fixed pretentious f,g | 1-bounded, fixed functions. g_(i,k) has |g(p)|=|1-p^(i pi k/log x)| up to 2 and depends on x through its smooth-part cutoff. Not applicable. |
| Matthiesen, arXiv:1606.04482v4 (3 Nov 2019), Proc. LMS, DOI 10.1112/plms.12309, Definitions 1.1-1.2 and Theorem 2.4; PDF SHA-256 `557593f74e82cb7a18aada3a2a5129ccc132d2d1ae017a404caf250b06c42dfa` | class F*: |h(p^k)|<=H^k, |h(n)|<<n^epsilon, positive mean at primes, stable mean in progressions to modulus (log x)^C; linear forms psi_1..psi_r in s>=2 variables, pairwise linearly independent over Q; asymptotic with W-trick main term | (kappa(delta)+o(1)) times the divisor-type envelope; qualitative | s>=2 variables. The pair (n,n-2) is one variable with two forms proportional as linear forms, excluded by hypothesis (ii). The functions are also fixed in N except through n^(it) twists. Divisor-bounded growth would otherwise match. |
| Tao-Teravainen, arXiv:2512.01739v2, Theorem 3.1(ii); MRT arXiv:1503.05121v3 (1.12); already in custody (prime-band-transfer section 4) | 1-bounded multiplicative, non-pretentious, natural average on (N,2N], rate L^(-c) off an exceptional scale set | (log X)^(-c), c absolute and small | 1-bounded; and the conclusion is cancellation, not a main term. g_(i,k) is 2-bounded at primes and has a nonzero mean. Not applicable. |
| Klurman-Mangerel-Teravainen, arXiv:2304.05344v2 (26 May 2023), abstract read | f: N -> D, non-pretentious; two-point correlation tends to 0 on a set of full upper logarithmic density | none | 1-bounded, non-pretentious, no rate; not applicable. |
| Mangerel, arXiv:2108.11401v2 (12 Nov 2021), abstract read | divisor-bounded functions with |f(p)| uniformly bounded; short-interval Matomaki-Radziwill extension | not a correlation statement | no two-point or shifted statement in the abstract; not opened further. |
| arXiv:2603.23250v2 (15 Apr 2026), abstract read | k-divisor-bounded multiplicative functions, ternary correlations on average, conditional on L-function second-moment bounds | conditional | ternary and averaged; not a fixed-shift binary statement. Unrefereed. |
| Roy-Savalia-Vatwani, "Divisor-bounded multiplicative functions in arithmetic progressions", listed as submitted on [Vatwani's publication page](https://sites.google.com/view/akshaa/publications), checked 2026-09-08; no arXiv record under au:Vatwani or au:Savalia | title only | unknown | UNREAD. Not importable. A progression theorem for fixed divisor-bounded functions would not by itself give a fixed-shift correlation. |

## 5. Validation and payoff

[full-coefficient-average-validation.js](full-coefficient-average-validation.js)
checks the factor identity on a finite proxy, 27000 Euler identities,
7862 coprime multiplicativity cases, Fourier reconstruction, the fixed
binomial norm lower bound and the three-prime subfamily. Its measurements
are finite; the proxy does not itself validate the rounded identity.
[research-round-validation.js](research-round-validation.js) checks that
using fixed exponents can differ from the rounded profile, and verifies
the corrected normalized endpoints.

No estimate for Rhat, E_dagger or D_y follows. The next obligation is a
matched weighted arithmetic estimate or a rigorously costed alternative
representation. Repeating this same unweighted import has no payoff.
Section 6 records the executed weighted attempt, its exact obstructions
and the proved norm bound that replaces the finite example.

## 6. Continuation 2026-09-08: the actual weights, the rough-pair sub-sum and a proved norm obstruction

    Lane / stable question id: C / Q-full-coefficient-average
    Starting commit / report commit or shared-checkout paths: 1285d47, shared checkout; research/full-coefficient-average.md, research/full-coefficient-average-validation.js
    Disposition / exact claim / unproved hypotheses: no weighted transfer; route (i) executed to two exact obstructions (composite filter not multiplicative; rate log^(2-c) above the needed precision for the inspected zero modes; low nonzero modes also meet the unit-disc condition); Proposition 6.5 PROVED (1-bounded representations of F_L have norm >= (log x)^(2/5)); every sufficient margin OPEN
    Changed step compared with the reviewed baseline: the weighted sum (7) is written with its composite filter and log t lift; c_(i,0)=3/5 exactly; the both-rough composite pair sum R_00 is identified with coefficient one in every component; the withdrawn fixed-norm obstruction is replaced by a proved unbounded sequence
    Source theorem and first unmatched hypothesis, if any: Tao–Teravainen 2512.01739v2 Thm 3.1(ii): admits the rough indicators but not the composite filter, and its rate gives x log^(2-c) x; Klurman 1603.08453v1 Thm 1.3/1.5: error term D_P(1,f;log x;x) is unbounded on this family; Matthiesen 1606.04482v4 Thm 2.4: one variable
    Validation command, falsifier, result and compute used: node research/full-coefficient-average-validation.js (2.6 s, embedded); falsifiers in 6.5; all finite checks pass; no enumeration
    Independent reviewer / disposition (PENDING until actually reviewed): handler / verified within stated scope, 2026-09-08 (research-round-validation.md section 8)
    Full-consumer payoff and unpaid complement: none; the whole residual remains unestimated at the signed precision
    Proposed shared-record changes / next bounded obligation: OUTCOMES entry replacing the "revisit" line; SEARCH-CONVENTIONS rows; TODO ledger unchanged; next obligation in 6.8

### 6.1 Question, disposition, what remains open

The question is the lane C text of
[RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md) section 2, executed as
written: a weighted estimate for the repaired representation with its
actual arithmetic weights, or a costed alternative representation.

Disposition. The weighted shifted sum is written exactly in (7) with
every weight named. The only weight that is not absorbed into an
x-dependent multiplicative function is the composite filter on both
arguments. Route (i) was chosen and executed against the sources in
custody: no matched theorem, with the first unmatched hypothesis
recorded per source in 6.3 and the total cost in 6.4. Route (ii) is
closed at one scope by Proposition 6.5: a representation by 1-bounded
functions cannot have bounded norm. Nothing here estimates Rhat,
E_dagger or D_y. Twin-prime infinitude and every sufficient signed
margin of [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) section 3 remain OPEN.

### 6.2 Exact statement

Parameters, profiles, s_i, t_i, F_i, D_i, E_i and Ghat_i are those of
sections 1–2; x is dyadic, J_x=(x/2,x], and every n in J_x and n-2
exceeds both W_i for large x. Write 1_c(n)=1 if n is not prime and 0
if n is prime, and D_i^c=1_c D_i.

**Composite filter.** On n>W_i, Lambda(n)-D_i(n)=-D_i^c(n) unless n is
a proper prime power, where the difference is Lambda(n). With (1) and
the exceptional budget of [global-factor-signs.md (6)–(7)](global-factor-signs.md),
which already pays proper prime powers and the E_i terms with the
divisor bound,

\[
 \widehat{\mathcal R}(x)=\sum_{n\in J_x}D_L^c(n)D_R^c(n-2)
        +O_\epsilon(x^{39/40+\epsilon}).                     \tag{5}
\]

**Rough indicator and the constant coefficient.** In (4) put
c'_(i,0)=1-c_(i,0) and c'_(i,k)=-c_(i,k) for k≠0, and let
g_(i,k)(n)=g_k(s_i(n)). Then F_i(s_i(n))=sum_k c'_(i,k) g_(i,k)(n) with
g_(i,0)(n)=1_(s_i(n)=1). The constant coefficient is exact: since
h_i=0 on (-infinity,w_i] and h_i=1 on [w'_i,infinity) with 0<w_i<w'_i<0.8,

\[
 c_{i,0}=\tfrac12\int_0^2\bigl(h_i(v)-h_i(v-1.2)\bigr)dv
       =\tfrac12\Bigl(\int_{0.8}^{2}h_i-\int_{-1.2}^{0}h_i\Bigr)
       =\tfrac12\cdot1.2=\tfrac35 .                            \tag{6}
\]

So the rough indicator carries the coefficient 2/5 in F_i, and
sum_k c_(i,k)=hper_i(0)=0 gives sum_k c'_(i,k)=F_i(1)=1. The finite
validator reproduces c_0=0.600000 on both sides.

**Log t lift.** Fix psi in C_c^infty(R) with psi(v)=v on [0,1] and
psi(v)=int psihat(u)e^(iuv)du, ||psihat||_1<infinity. For n in J_x,
log t_i(n)/log x lies in [0,1], and n -> t_i(n)^(iu/log x) is
multiplicative with prime-power values p^(ivu/log x) for p>W_i and 1
for p<=W_i. Define the multiplicative function

\[
 G_{i,k,u}(n)=g_{i,k}(n)\,t_i(n)^{iu/\log x},\qquad
 G_{i,k,u}(p^v)=
 \begin{cases}1-p^{i\pi k/\log x},&p\le W_i,\\ p^{ivu/\log x},&p>W_i,\end{cases}
\]

so |G_(i,k,u)(n)|<=2^omega(s_i(n)) and |G(p^v)|=1 above W_i. Exactly,
for n in J_x,

\[
 D_i(n)=\log x\sum_k c'_{i,k}\int_{\mathbb R}\widehat\psi(u)
                        G_{i,k,u}(n)\,du .
\]

**The weighted shifted sum.** With absolute convergence of every sum,

\[
 \widehat{\mathcal R}
 =(\log x)^2\sum_{k,l}c'_{L,k}c'_{R,l}\iint\widehat\psi(u)\widehat\psi(u')
    T_{k,l}(u,u')\,du\,du' +O_\epsilon(x^{39/40+\epsilon}),
 \quad
 T_{k,l}(u,u')=\sum_{n\in J_x}1_c(n)1_c(n-2)G_{L,k,u}(n)G_{R,l,u'}(n-2).
                                                               \tag{7}
\]

The coefficient budget in front is
(1+N_L)(1+N_R)||psihat||_1^2 (log x)^2, uniformly bounded apart from
the explicit (log x)^2. A termwise estimate reaches o(x) in the S
normalization only if T_(k,l)(u,u')=o(x/log^2 x) uniformly in the
parameters, with at most polynomial growth in k,l to be absorbed by
|c'_(i,k)|<<(1+|k|)^(-4).

**The rough-pair sub-sum.** On W_i-rough n every g_(i,k)(n)=1 and
t_i(n)=n, so D_i(n)=log n. Define

\[
 R_{00}(x)=\sum_{\substack{n\in J_x,\ n,\,n-2\ \text{not prime}\\
                            s_L(n)=1,\ s_R(n-2)=1}}
                       \log n\,\log(n-2)\ \ge 0 .              \tag{8}
\]

Then Rhat=R_00+Rhat_mix+O_epsilon(x^(39/40+epsilon)), where Rhat_mix
is the sum in (5) over pairs with s_L(n)>1 or s_R(n-2)>1. The
coefficient of R_00 is one, not (2/5)^2: in (7) the restriction of
T_(k,l)(u,u') to both-rough composite pairs equals
sum n^(iu/log x)(n-2)^(iu'/log x) over those pairs for every (k,l),
and the outer sum of coefficients is F_L(1)F_R(1)=1. The finite check
(H) confirms Ghat=-log n at all 8831 W-rough composites of the proxy
window. From [global-smooth-majorant.md (15)](global-smooth-majorant.md),
R_00<<x.

### 6.3 Prior work and source matrix for the actual family

The matrix in section 4 stands. The actual objects in (7) are pairs
(G_(L,k,u),G_(R,l,u')) of x-dependent multiplicative functions, bounded
by 1 at primes above W_i and by 2 below, under the composite filter
1_c(n)1_c(n-2). Rows added on 2026-09-08 after rereading the primary
texts already in custody:

| source, locator | hypothesis matched by this family | first unmatched hypothesis |
|---|---|---|
| Tao–Teravainen, arXiv:2512.01739v2, Thm 3.1(ii), (3.3)–(3.4); PDF SHA-256 `ce10e83b…` (prime-band-transfer section 4) | For (k,l)=(0,0): both rough indicators are 1-bounded multiplicative, and M(1_(s_i=1);X^2,log^(1/125)X) >= sum_(p<=W_i)1/p >= log log W_i-1 >= (7/24)log log X for large X, since every summand of the distance is nonnegative and the p<=W_i summands equal 1/p. The moving cutoff W_i(2N) is frozen on a mesh as in prime-band-transfer section 3; two rough sets at cutoffs W,W' with log W'/log W=1+O(delta) differ on a set of density O(delta). | (a) The composite filter is not multiplicative and not admitted; (b) the full Fourier family is not uniformly 1-bounded, although low nonzero modes are (see 6.4(b)); (c) the available rate does not reach the o(N/log^2 N) needed after the log weights. Only an upper bound O(N/log^2 N) for the unfiltered rough pair count is used here; no matching lower bound has been established. |
| Klurman, arXiv:1603.08453v1, Thm 1.3 and Thm 1.5, p. 4–6; PDF SHA-256 `502591fd…`, reread 2026-09-08 | Multiplicative, unit-disc for (0,0); shift d=2 with res(P,Q)=2≠0. | The error term is << D_P(1,f;log x;x)+D_Q(1,g;log x;x)+1/log log x, with D_P(f,g;y;x)^2=sum_(y<=p<=x)(1-Re f(p)g(p)bar)/p+(prime-power term). For f=1_(s_L=1) this is at least sum_(log x<=p<=W_L)1/p=log log W_L-log log log x+O(1), which tends to infinity. The statement is vacuous on the family, and Theorem 1.5's D(f,n^(it)chi;infinity)<infinity is a fixed-function hypothesis whose o(1) is not uniform in W_L(x). |
| Matthiesen, arXiv:1606.04482v4, Thm 2.4 | growth class F* would admit |G(p)|<=2 | one variable; (n,n-2) are proportional linear forms. Unchanged. |
| Sieve asymptotics for both-rough pairs at fixed exponents (the object R_00 and its unfiltered version) | none | No inspected source states an asymptotic for #{n<=x: n is x^(1/s_1)-rough, n-2 is x^(1/s_2)-rough} with fixed s_1,s_2; the fundamental lemma gives the CRT main term with a relative error that does not tend to zero at fixed s, and the s_1,s_2 -> 2 boundary of the Buchstab recursion is the twin count. This is a scoped negative in the conventions "sieve of dimension two", "almost-prime twins", "Buchstab iteration", not an absence proof. |

No novelty claim is made for the identities of 6.2; the lift of log t
is the one already used in prime-band-transfer (1). The norm obstruction
of 6.5 is elementary; it was checked against the review's stated gap
and is not claimed new to the literature.

### 6.4 Route (i): the decisive steps and their total cost

**(a) The composite filter.** For a multiplicative g and primes
p,q>W_i, the function 1_c g has (1_c g)(p)=0 and (1_c g)(pq)=g(pq)≠0
whenever g(p)g(q)≠0, so it is not multiplicative and no row of 6.3
admits it. Expanding 1_c=1-1_prime in (7) gives, for each component,

\[
 T_{k,l}=U_{k,l}-V^L_{k,l}-V^R_{k,l}
        +\sum_{\substack{n\in J_x\\ n,\,n-2\ \text{prime}}}
              n^{iu/\log x}(n-2)^{iu'/\log x},
\]

with U the unfiltered correlation and V^L,V^R the sums over prime n or
prime n-2. After the u,u' integrals and the (log x)^2 factor the last
term is sum_(n,n-2 prime) log n log(n-2)=S(x)+O(\sqrt x\,\log^3 x),
independent of (k,l), with outer coefficient sum c'_(L,k)sum c'_(R,l)=1.
Thus the decomposition of the weight returns S itself, that is, the
reduction identity (3); the remaining three sums are the Fourier forms
of Y, X_L and X_R, whose combination is already known to arbitrary
logarithmic precision. No estimate is gained; this is the review's
point for this particular exact reassembly. It does not exclude a joint estimate exploiting the Fourier coefficients.

**(b) The unit-disc condition and the zero-mode rate.** For real u,

    |G_(i,k,u)(p^v)| = 2|sin(pi k log p/(2 log x))| <= 1

for p<=W_i whenever |k|log W_i/log x<=1/3; above W_i the modulus is
one. Therefore at least k=0,±1 on the left and l=0,±1,...,±6 on the
right are 1-bounded on every integer, for every Mellin twist. This
corrects the assertion that only the zero modes qualify. It is a
sufficient range, not an exhaustive classification of finite aliases.
The composite filter and the required correlation rate still need
separate checks, including for these modes. The rational phase bounds
and controls are in research-round-validation.js. For the zero modes, applying Tao–Teravainen to the frozen rough indicators, then the mesh
and the dyadic sampling of [round-review-0906.md section 2](round-review-0906.md),
gives on a dyadic scale average

\[
 \frac{1}{\log X}\sum_{\sqrt X\le 2^j\le X}
 \frac{\Bigl|\sum_{2^j<n\le 2^{j+1}}1_{s_L(n)=1}1_{s_R(n-2)=1}\Bigr|}{2^j}
 \ll (\log X)^{-d}
\]

for some fixed d>0 inherited from the source. Multiplying by the
weights log n log(n-2)<=(log x)^2 and by (2/5)^2||psihat||_1^2 gives,
in the normalization of S(x), a budget O(x (log x)^(2-d)). This is the
stop rule's case verbatim: a small logarithmic saving in a quantity of
size x log^2 x. It is weaker than the sieve upper bound O(x) that the
same unfiltered sum already has, and the sum it bounds is
R_00+P_L+P_R+S(x)+O(sqrt x log^3 x), with P_L the prime–rough and P_R
the rough–prime terms. The exceptional scale set depends on the frozen
cell and, for u,u'≠0, on the twist; Tonelli removes the dependence at
the price of an absolute average, which cannot carry a sign. A signed
statement would need U_(0,0) to relative precision o(1), which no row
of 6.3 supplies.

**(c) The remaining components.** When the unit-disc condition fails, dividing G_(i,k,u) by
2^omega(s_i(n)) produces a 1-bounded multiplicative function and the
weight 2^omega(s_L(n))2^omega(s_R(n-2)) in the correlation; the review's
control a=(1,-1), w=(2,1) applies. Decomposing instead
g_(i,k)(n)=sum_(d|s_i(n))mu(d)d^(i pi k/log x) gives divisor sums to
modulus up to x. The cutoff is restored only after the k-sum:
sum_k c'_(i,k)d^(i pi k/log x)=rhohat_i(d), which vanishes for d>=b_i.
Any termwise absolute-value step before that sum pays
sum_(d|s)|mu(d)|=2^omega(s) per component; performing the k-sum first
returns the short divisor sum d<b_i, which is the Type I input the
existing reduction already evaluated. Either way no estimate beyond
(3) appears.

**Total cost.** Route (i) yields no bound on Rhat below the trivial
O(x) of the majorant, and no signed statement. The exact rate and
uniformity obstructions are: the composite filter (not admitted by any
inspected multiplicative-correlation statement; its removal reinserts
S), the rate (log X)^(-d) against the needed o((log x)^(-2)) on the
unfiltered rough component, and the unit-disc restriction against the
prime values 1-p^(i pi k/log x). All terms live on the dyadic scales of
the campaign; the mesh and sampling costs are the same as in
prime-band-transfer and add nothing new.

### 6.5 Proposition: every 1-bounded representation of F_L has unbounded norm

The review withdrew the "no bounded representation" claim because the
C(44,10) construction is one fixed number. The sequence below tends to
infinity. Throughout, chi is the profile (global-smooth-majorant (2))
and S(y)=1-chi(y)=35y^4-84y^5+70y^6-20y^7 on [0,1], S=0 below 0 and
S=1 above 1; note chi(1-y)=S(y).

**Proposition 6.5 (reviewed by the handler 2026-09-08; elementary, PNT the only arithmetic input).** (i) For r=35m, m>=2, put n=r-4, J_2=12m, h=35/r,
q=12/23 and

\[
 F_r=\sum_{j=0}^{r}(-1)^j\binom rj\,\chi\!\Bigl(\frac{0.7j/r-0.22}{0.02}\Bigr),
 \qquad
 \kappa=1-\frac{24q^3}{1+q}=-\frac{22957}{18515}=-1.23991\ldots
\]

Then F_r=(-1)^(J_2+1) 35 h^4 binom(n,J_2-1)(kappa+O(1/m)), and in
particular |F_r|>=2^(0.92 r) for all sufficiently large m.

(ii) For all sufficiently large x there is a squarefree W_L-smooth
s<=x^(0.71) with |F_L(s)|>=(1/2)|F_r|, r=35 floor(log_2 log x/70).
Consequently

\[
 \sup_{s\le x/W_L,\ s\ W_L\text{-smooth}}|F_L(s)|\ \ge\ (\log x)^{2/5}
 \qquad(x\ \text{large}),                                     \tag{9}
\]

and every family of functions f_j with |f_j|<=1 on that set and
F_L=sum_j lambda_j f_j there has sum_j|lambda_j|>=(log x)^(2/5). The
same holds for n in J_x with s_L(n)=s and t_L(n)>1 prime, so
|D_L(n)|>=(log x)^(2/5) log t_L(n) at such n.

**Proof of (i).** The profile argument at j=J_2-l is
(0.7(J_2-l)/r-0.22)/0.02=1-lh, so f(j):=chi(35j/r-11) equals 1
for j<=J_1=11m, 0 for j>=J_2, and f(J_2-l)=S(lh) for 0<=l<=m.
Write Delta f(j)=f(j+1)-f(j). Since
sum_j(-1)^j binom(r,j)f(j)=(-1)^r Delta^r f(0) and
Delta^r=Delta^(r-4)Delta^4, Vandermonde gives the exact identity

\[
 F_r=\sum_{m'=0}^{n}(-1)^{m'}\binom n{m'}g(m'),\qquad
 g(m')=\sum_{i=0}^{4}(-1)^{4-i}\binom4i f(m'+i).
\]

g vanishes for m'+4<=J_1 and for m'>=J_2. With m'=J_2-k,
g_k:=g(J_2-k)=sum_(i<=4)(-1)^(4-i)binom(4,i)S((k-i)h), and

\[
 F_r=(-1)^{J_2+1}\binom n{J_2-1}\,35h^4\,\sigma_r,\qquad
 \sigma_r=\sum_{k=1}^{J_2}(-1)^{k-1}\rho_k\tilde g_k,\quad
 \rho_k=\frac{\binom n{J_2-k}}{\binom n{J_2-1}},\quad
 \tilde g_k=\frac{g_k}{35h^4}.
\]

The validator checks this identity in exact rational arithmetic for
m=2..8. Three bounds finish the proof.

*Binomial ratios.* rho_k=prod_(i=1)^(k-1)(J_2-i)/(n-J_2+i+1), a product
of decreasing factors, so rho_k<=q_r^(k-1) with
q_r=(J_2-1)/(n-J_2+2)=(12m-1)/(23m-2), q_r-12/23=1/(23(23m-2)), and
q_r<=0.523 for m>=2. Since J_2-1>=11m and n-J_2+2>=11m, each factor is
at least q_r(1-2(i-1)/(11m)), hence rho_k>=q_r^(k-1)(1-2k^2/(11m)).

*Fourth differences.* For 5<=k<=m all five points (k-i)h lie in [0,1],
where S is a polynomial; the mean value theorem for finite differences
gives g_k=h^4 S''''(xi) with xi in [(k-4)h,kh], and
S''''(y)=840(1-12y+30y^2-20y^3) satisfies 840(1-12y)<=S''''(y)<=840
on [0,1] (the quadratic 20y^2-30y+12 has negative discriminant and
10y^2(3-2y)>=0). Thus 24(1-12kh)<=tilde g_k<=24. For k<=4 direct
expansion gives tilde g_k=b_k+O(kh) with b=(1,12,23,24) and an
absolute constant (400 suffices for h<=1/10). For m<k<=J_2 at most
four points cross the left junction; there |g_k|<=16, and
rho_k<=q_r^(k-1) makes these terms O(q_r^m m^4)=O(1/m). The validator
verifies the two-sided bound for 5<=k<=m up to m=400.

*Summation.* Put b_k=24 for k>=4. Then
sum_(k>=1)(-1)^(k-1)q^(k-1)b_k=1-12q+23q^2-24q^3/(1+q)=kappa(q), and
kappa(12/23)=kappa because 12q=23q^2 there. Combining the bounds,

\[
 |\sigma_r-\kappa|\le\sum_{k\le m}q_r^{k-1}
   \Bigl(\frac{48k^2}{11m}+\frac{400k}{m}\Bigr)
   +|\kappa(q_r)-\kappa(12/23)|+O(q_r^m m^4)=O(1/m).
\]

The measured sigma_r/kappa is 1.00408 at m=400, consistent with an
O(1/m) error. Finally binom(n,J_2-1)>=2^(nH(12/35))/(n+1) with the
binary entropy H(12/35)=0.9276..., so
|F_r|>=35h^4 2^(0.9276(r-4))(r-3)^(-1)(|kappa|-O(1/m))>=2^(0.92r) for
large m. The exact values grow with log_2|F_r|/r=0.888 at r=420.

**Proof of (ii).** Let r=35 floor(log_2 log x/70), so
r>=(1/2)log_2 log x-35 and 2^r<=(log x)^(1/2). Put P=x^(0.7/r). By the
prime number theorem ([Tao, Notes 2, Corollary 39](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/))
pi(2P)-pi(P)>=r for large x, since P>=exp(0.7 log x/log_2 log x).
Take r distinct primes p in [P,2P] and s=their product. Then s is
squarefree, each p<=2P<=W_L, and s<=(2P)^r=2^r x^(0.7)<=x^(0.71)<=x/W_L.
The exponents e_p=log p/log x satisfy |e_p-0.7/r|<=log 2/log x, so
every subset sum differs from the equal-exponent value by at most
r log 2/log x. The profile is Lipschitz with constant
max|chi'|=35/16 in its argument, and the argument is the exponent sum
divided by 0.02; the rounded endpoints of section 2 move the argument
by O(x^(-0.22)) uniformly for d<=x. Hence

\[
 |F_L(s)-F_r|\le 2^r\cdot\frac{35}{16}\cdot50
    \Bigl(\frac{r\log2}{\log x}+O(x^{-0.22})\Bigr)
 \le\frac{76\,r\,2^r}{\log x}+o(1)\le\frac12
\]

for large x, using 2^r<=(log x)^(1/2). Since |F_r|>=2^(0.92r)>=1,
|F_L(s)|>=|F_r|/2>=2^(0.92r-1)>=2^(-34)(log x)^(0.46)>=(log x)^(2/5)
for large x. A prime t in (x/(2s),x/s] exists by the same theorem and
gives n=st in J_x with s_L(n)=s. The norm statement follows because
sum_j|lambda_j|>=|F_L(s)| at any single s. QED.

**Scope.** (Read twice independently on 2026-09-08, by the handler and by reader V2; V2's exact recomputation of F_r for m<=300 measures the inequality |F_r|>=2^(0.92r) holding at every tested m>=130 and failing at every tested m<=120, so the onset of part (i) is near r=4400 and the threshold of (ii) sits at log_2 log x of order 10^4.) The bound is on the set of all W_L-smooth s<=x/W_L. A
representation valid only on inputs of density one is not excluded:
the witnesses have r~(1/2)log_2 log x prime factors in a short
multiplicative range and are sparse. Components bounded by a growing
function are not excluded; the Fourier components g_k are bounded by
2^omega and that is why (4) has bounded norm. The exponent 2/5 comes
from the Chebyshev-level prime supply used here and is not optimal. The
threshold "x large" implied by these constants is astronomically large;
nothing effective is claimed, and none is needed for the norm statement.
Against the only quantitative cancellation rate in custody,
(log X)^(-c/4) with c small and unspecified, a norm of (log x)^(2/5)
is a net loss for every c<8/5, so no 1-bounded lift with an
x-uniform coefficient bound can carry a Tao–Teravainen saving to F_L.

### 6.6 Payoff for the full consumer

None. Equations (5)–(8) are exact re-expressions of the same residual;
6.4 shows that estimating the components separately returns (3), and
that the only admitted component has an averaged bound of size
x log^(2-d) x. Proposition 6.5 removes one route (bounded-norm
1-bounded lifts) rather than adding an estimate. The sufficient
margins in the handoff, the moment's regional control and the
cofactor transfer's restricted rate are unchanged.

### 6.7 Files, commands, records

Owned files: this note and
[full-coefficient-average-validation.js](full-coefficient-average-validation.js),
re-embedded with `node research/qc/embed.js research/full-coefficient-average-validation.js --force`
after the code change (all 38 previous figures reproduced; 4 lines added;
2.6 s; no enumeration). New finite checks: c_0=3/5 on both sides and
sum_k c_k=0; Ghat=-log n on all W-rough composites of the proxy window;
the exact junction identity for r=35m, m=2..8; the fourth-difference
bounds for 5<=k<=m up to m=400; sigma_r/kappa at m=4,20,100,400; the
growth of |F_r| to r=420. These test the ingredients of Proposition
6.5 and the exact coefficients of 6.2; they do not test any asymptotic
correlation statement. Source rereads: Klurman 1603.08453v1 (PDF
SHA-256 matches the recorded hash), Theorem 1.3 and the definition of
D_P on p. 3–4. Proposed shared-record text is in the lane report.

### 6.8 Next move or reopening condition

Reopen this question only with one of: (a) a two-point statement for
x-dependent multiplicative pairs bounded by 2 at primes, or for the
rough indicators, with a main term and error o(x/log^2 x) under a
composite or prime filter on both arguments; at (k,l)=(0,0) this is an
asymptotic for both-rough composite pairs at exponents (0.24, 0.05),
which is not a proved theorem in the inspected sources; (b) a
representation whose components are bounded by a function whose growth
is paid explicitly against a named rate, since 1-bounded components
with bounded norm are excluded by 6.5; (c) an argument that treats the
k-sum jointly with the correlation and provides an inequality beyond
the exact Type I reassembly examined here.
Repeating any inspected theorem on a single component, or bounding
|Rhat| termwise, has no payoff.

History and superseded wording: research/history/CHANGELOG.md.
