# The supported coefficient: Dickman cancellation and the signed sieve budget

<!-- ledger
id: Q-supported-coefficient-dickman
status: ANSWERED
todo: C
parity: Computes a harmonic coefficient using a classical Dickman identity; distribution is used only through the previously matched Pan--Ding theorem and nonnegative linear sieves. The prime-partner subtraction and exact complement remain in the consumer. A negative value of the available lower bound is not an upper bound on the actual residual.
question: Can the whole supported coefficient be priced using existing literature before enumerating its factor cells, and does the resulting separate-sign sieve estimate supply a positive twin margin?
verdict: DERIVED from classical inputs: at delta=1/100 the harmonic limit is H_delta=D(25/12)-1+E_delta with 0<=E_delta<=24/22!, hence -1<H_delta<-2/3. The elementary separate-sign lower-bound constant is less than -80/9 and cannot supply positivity after adding only the main term. This is an INSUFFICIENT BOUND, not a negative upper bound on the regional residual. Existing integration and Dickman machinery is prior art; literature novelty of this application is unestablished. The joint prime-partner/complement estimate and twin infinitude remain OPEN.
-->

**The full signed margin and twin-prime infinitude remain OPEN.** This
completes the harmonic and elementary sieve-budget test proposed in
[paired-factor-budget.md](paired-factor-budget.md) section 6. It does
not estimate the exact complement favorably. The literature check below
preceded the calculation; it supplies the simplification used here.

The subsequent [joint-correction source audit](joint-correction-source-audit.md)
checks the completion proposed in sections 5--6. It identifies the
unrestricted logarithmic weight with an existing short Vaughan
approximant, up to the paid exception. Reassembling the full joint
correction returns the original open remainder; no signed bound is
improved. The selected branch still cannot inherit the unrestricted
weight's support. Read that audit before another completion attempt.

## 1. Novelty check and imported interfaces

The owning subjects are harmonic Möbius sums, Dickman convolution,
weighted sieves with switching, and prime-factor distributions of
well-distributed sequences. Literature novelty is unestablished.

| Primary source, read 2026-09-06 | Usable input and limit |
|---|---|
| [Soundararajan, arXiv:1005.3494v1](https://arxiv.org/pdf/1005.3494v1), p. 1 | The classical Dickman integral expansion and delay equation (4) below. We use these introductory identities, not the paper's asymptotic expansion theorem. |
| [Drappeau--Mounier, arXiv:2606.30428v1](https://arxiv.org/pdf/2606.30428v1), Theorem 1.1, Lemma 2.2, Remark 2.4 | Rigorous integration of reciprocal monomials over fixed rational polytopes, allowing polynomial numerators. Precision complexity is polynomial for fixed dimension and polytope. The authors supply [Sage/LattE code](https://github.com/sarydrappeau/sieve_integral); its README was read, but code was not run or audited. |
| [Matomäki--Zuniga Alterman, published version](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/986429394BA969687D48224E177E2F1C/S0305004125000258a.pdf/weighted_sieves_with_switching.pdf), section 4, (4.16)--(4.17) | Expanding their additive signed weight and using lower/upper sieves according to sign is established practice. Their weight differs from our subset coefficient. Only the previously matched linear-sieve input is used here, not their full weighted-sieve theorem. |
| [Bharadwaj--Rodgers, published 2026](https://doi.org/10.4153/S0008439526101982), Proposition 2, Theorem 7, Lemma 8 | Shifted primes are 1/2 well-distributed; the full Poisson--Dirichlet law requires the stronger 1 well-distributed hypothesis. Lemma 8 gives unconditional factorial correlations only for test functions supported where the sum of factor exponents is strictly below 1/2. Section 6 checks the mismatch with our prime-partner term. |

The C3 subset coefficient is polynomial on chambers cut out by rational
linear inequalities in prime exponents. This matches the polynomial
extension of the integration method. Its positive part can have a curved
zero boundary inside a chamber: integrating the positive part requires
additional enclosures or subdivision, not just calling a polytope routine.
The signed total has the simpler analytic evaluation below, so this
attempt does not build another general integration engine.

**Source correction:** Drappeau--Mounier v1, p. 9, (21), prints the
Dickman delay equation without the factor u on its left side. The
correct equation is uD'(u)=-D(u-1), as in Soundararajan p. 1. The printed
version would give D(2)=0; the correct value is 1-log 2>0. This is a
scoped correction to that display. It does not establish a defect in
their integration theorem, implementation or reported computations.

## 2. The complete supported harmonic coefficient

Use T=log x and the C3 profile from
[global-smooth-majorant.md](global-smooth-majorant.md). Put

\[
 a=11/50,\quad b=6/25,\quad U=1/2,\quad\delta=1/100,\qquad
 \phi(t)=\chi((t-a)/(b-a)).
                                                               \tag{1}
\]

Here chi is 1 below 0, 0 above 1, and
1-35t^4+84t^5-70t^6+20t^7 between them. In particular 0<=phi<=1,
phi=1 on [0,a] and phi=0 on [b,infinity). The actual profile uses
the logarithms of the floored cutoffs and tends uniformly to phi.
With W_L=floor(x^b), define

\[
 \begin{split}
 \mathcal M_\delta(x)&=\{1<m\le x^U:
             P^-(m)>x^\delta,\ P^+(m)\le W_L\},\\
 c_x(m)&=1_{\mathcal M_\delta(x)}(m)\widehat F_L(m),\\
 H_\delta^\pm(x)&=\sum_m\frac{(c_x(m))_\pm}{m},
 \qquad H_\delta(x)=H_\delta^+(x)-H_\delta^-(x).
 \end{split}                                                   \tag{2}
\]

The signs mean positive and negative parts, both nonnegative. The term
m=1 is excluded because n=mr would then be prime and G_L(n)=0.
It must be restored temporarily, then subtracted in the calculation.

There are at most 50 prime factors with multiplicity, and |c_x|<=2^50.
The unrestricted harmonic mass of numbers supported on these primes is
the Euler product product_(x^delta<p<=W_L)(1-1/p)^(-1)=O_delta(1).
The harmonic mass having a repeated prime is therefore at most
O_delta(sum_(p>x^delta)p^(-2))=o(1), also after multiplication by 2^50.
For the squarefree terms, prime Mertens and finite rectangle
approximation give the limits H_delta and H_delta^plus/minus in (2).
The limiting subset function is continuous; exponent cut boundaries
have measure zero. These observations justify the same passage to the
limit for the absolute value, not just for the signed coefficient.

Define nu_(c,d)(dt)=1_(c<t<=d)dt/t and let delta_0 denote unit mass at
zero. For measures supported away from zero, use the convolution
exponential exp_*(nu)=sum_(k>=0)nu^(*k)/k!, whose k=0 term is delta_0.
On [0,U] only finitely many terms occur. Write

\[
 \mathsf A_\delta=\exp_*(\nu_{\delta,b}),\quad
 C_\delta(v)=\mathsf A_\delta([0,v]),\quad
 \mathsf M_\delta=\exp_*(-\nu_{\delta,\infty}).
                                                               \tag{3}
\]

Set C_delta(v)=0 for v<0. Its total mass is exp(log(b/delta))=24.
The classical Dickman function D, extended as zero at negative
arguments when needed, satisfies

\[
 \begin{split}
 &D(u)=1\quad(0\le u\le1),\qquad uD'(u)=-D(u-1)\quad(u>1),\\
 &D(u)=\sum_{k\ge0}\frac{(-1)^k}{k!}
   \int_{\substack{t_i\ge1\\t_1+\cdots+t_k\le u}}
                \frac{dt_1\cdots dt_k}{t_1\cdots t_k}.
 \end{split}                                                   \tag{4}
\]

The k=0 integral is 1. Thus
mathsf M_delta([0,v])=D(v/delta); it has an atom 1 at zero and density
-D(v/delta-1)/v for v>delta, zero density between zero and delta.

Expanding the **complete** subset coefficient before taking its sign gives

\[
 1+H_\delta
       =[(\phi\,\mathsf M_\delta)*\mathsf A_\delta]([0,U]).
                                                               \tag{5}
\]

For clarity, the k-prime integral on the left has integrand
sum_(A subset {1,...,k})(-1)^|A| phi(sum_(i in A)t_i), and measure
product dt_i/t_i divided by k!. Choosing j members of the subset and
l=k-j outside it yields the factor 1/(j!l!) and exactly the convolution
on the right. This use of a factorial is valid because the complete
subset integrand is symmetric. Since phi vanishes for t>=b, replacing
exp_*(-nu_(delta,b)) by mathsf M_delta inside phi changes nothing.
This proves (5), including the restored empty configuration.

## 3. An explicit collapse with a small profile error

Convolution exponentials cancel locally:

\[
 \mathsf M_\delta*\mathsf A_\delta
       =\exp_*(-\nu_{b,\infty}),\qquad
 [\mathsf M_\delta*\mathsf A_\delta]([0,U])=D(U/b).
                                                               \tag{6}
\]

All changes of order are in finite sums of finite integrals on [0,U].
The signed measure mathsf M_delta has no positive mass away from zero,
and phi(0)=1. Hence (phi-1)mathsf M_delta is nonnegative. Equations
(5)--(6) give the exact formula

\[
 \boxed{H_\delta=D(25/12)-1+E_\delta},\qquad
 E_\delta=\int_a^U(1-\phi(t))
        \frac{D(t/\delta-1)}{t}C_\delta(U-t)\,dt\ge0 .
                                                               \tag{7}
\]

Here is an analytic bound on the entire error, without a dimension-50
integration. Equation (4) implies, for u>=1,

\[
 uD(u)=\int_{u-1}^u D(v)\,dv.
                                                               \tag{8}
\]

Both sides have derivative D(u)-D(u-1) and agree at u=1. Positivity
and monotonicity of D then give nD(n)<=D(n-1), so D(n)<=1/n!
and D(u) tends to zero. Since C_delta<=24, integrate the negative
derivative of D(t/delta) from a to infinity to obtain

\[
 0\le E_\delta\le24D(22)\le\frac{24}{22!},\qquad
 -1<H_\delta\le-\log2+\frac{24}{22!}<-\frac23 .
                                                               \tag{9}
\]

For the upper bound, U/b=25/12>2 and D is decreasing, while
D(2)=1-log 2. For the strict lower bound D(25/12)>0: it also follows
directly from (4), since at u=25/12 only k=0,1,2 occur and
1-log(25/12)>0. The rational comparisons log 2>69/100 and
24/22!<1/1000 suffice for the last strict inequality.

The harmonic-limit derivation also works for any continuous fixed
limiting profile between 0 and 1 with the same two plateaus, provided
the actual profiles tend to it uniformly. It concerns a harmonic
coefficient, not the sign of the actual shifted correlation. No
Poisson--Dirichlet law for shifted primes is used to obtain it.

## 4. What the existing nonnegative sieves actually deliver

For m in (2), take r prime with x/(2m)<r<=x/m and put n=mr, h=n-2.
Eventually r>W_L and is the unique prime factor of n exceeding W_L,
so each n has one representation. Let R_delta be the actual contribution
to the full residual from these n with P^-(h)>W_R=floor(x^(1/20)).
Define B_c^r and B_c^p as the sums of c_x(m)log r over these pairs,
restricted respectively to rough h and prime h. Define B_plus/minus
by replacing c_x with its nonnegative parts.

The proof of [paired-factor-budget.md](paired-factor-budget.md)
section 3 applies to each coefficient divided by 2^50. In particular,
Pan--Ding through Wu's Lemma 2.3 allows m<=x^(1/2) and D=x^(9/20).
Its maximum over y pays partial summation of log r=log(mr)-log m,
using also the bounded coefficient c_x(m)log m/T. The main term is
x/(2m varphi(d)). Removing (m,d)=1 now costs O_delta(x^(1-delta)T):
sum_(p|m)1/(p-1)=O_delta(x^(-delta)) and sum_m |c_x(m)|/m=O_delta(1).
Even moduli have zero actual and model mass. Thus the same density
h(d)=1/varphi(d) for odd squarefree d, zero for even d, and arbitrary
fixed logarithmic precision hold.

For the previously specified rough lower, rough upper and prime upper
sieves, put

\[
 \ell=10\log3,\quad u=40/3,\quad v=40/9.
 \qquad
 \begin{cases}
 TB_\pm^r\ge\ell C_2xH_\delta^\pm+o_\delta(x),\\
 TB_\pm^r\le u C_2xH_\delta^\pm+o_\delta(x),\\
 0\le TB_\pm^p\le v C_2xH_\delta^\pm+o_\delta(x).
 \end{cases}                                                   \tag{10}
\]

These are nonnegative sieve applications. The error absorbs the
harmonic limits in (2); it has not been quantified for a shrinking
margin. The global exceptional-prime-power bound
O_epsilon(x^(39/40+epsilon)), with epsilon<1/40, pays the exceptions to
G_L(mr)=-F_L(m)log r. On rough h the exact right coefficient is
G_R(h)=Lambda(h)-log h. Proper-power partners and replacing log h by
T cost o_delta(x), using uniqueness and the absolute rough upper
bound in (10). Consequently

\[
 R_\delta=T(B_c^r-B_c^p)+o_\delta(x).
                                                               \tag{11}
\]

Apply (10) term by term to (11), retaining the direction of prime
subtraction:

\[
 R_\delta\ge C_2xK_\delta+o_\delta(x),\quad
 K_\delta=(\ell-v)H_\delta^+-uH_\delta^-
          =uH_\delta-(u-\ell+v)H_\delta^+<-\frac{80}{9}.
                                                               \tag{12}
\]

The last inequality uses (9), H_delta^plus>=0, and u-ell+v>0.
Thus **this lower bound plus the main term cannot establish positivity
with the complement omitted**. Computing the positive and negative
harmonic integrals more accurately cannot repair that particular
estimate. This is an INSUFFICIENT BOUND, not a proof that R_delta is
negative or that signed aggregation is impossible. In contrast, the
earlier two-family note supplied an actual negative upper bound on its
smaller regional residual. Do not interchange these conclusions.

## 5. Exact remaining consumer

Write R_rest,delta=Rhat-R_delta, by exact subtraction, and group the
signed prime-partner correction with that complement:

\[
 \mathcal C_\delta(x)=R_{\mathrm{rest},\delta}(x)-TB_c^p(x).
 \quad
 S(x)=C_2x+TB_c^r(x)+\mathcal C_\delta(x)+o_\delta(x).
                                                               \tag{13}
\]

The complement includes multiple large left factors, m outside (2),
nonrough right partners and the small-prime tail. The exceptions have
only been replaced in (11) with a paid error; the definition of the
complement uses the actual residual. It is neither discarded nor
assumed nonnegative.

For example, (10) makes the following a sufficient **OPEN** fixed-margin
input, on an unbounded common sequence of dyadic scales, for some eta>0:

\[
 \frac{\mathcal C_\delta(x)}{C_2x}
   \ge -1-\ell H_\delta^++uH_\delta^-+\eta.
                                                               \tag{14}
\]

It would give S(x)>=eta*C2*x/2 eventually on that sequence, after the
o(x) errors. This is a sufficient condition, not a necessity theorem
or a new arithmetic bound. The broader logarithmically shrinking
consumer remains allowed, but cannot be inferred from unspecified
o(x) convergence here. Fixed delta's paid tail is likewise only a
fixed multiple of x.

## 6. Why the 2026 prime-factor theorem does not fill this input

On a prime partner h=p, the left input is n=p+2. This is the shifted
prime sequence in Bharadwaj--Rodgers Proposition 2, with shift a=-2.
Its level 1/2 factorial-correlation result, Lemma 8, evaluates tests
whose selected factor product is below x^(1/2-epsilon) for some fixed
epsilon>0. The proof uses that exact restriction on p. 11 to replace
divisor counts by their means in (16). Symmetrizing the test function
first justifies the ordered-factor rewrite there.

Our marked prime cofactor has r>x/(2m)>=sqrt(x)/2, and the support
contains regions where r>x^(1/2+epsilon). A direct test marking r
does not satisfy Lemma 8. Merely selecting m's small factors does
not assert that the remaining cofactor is prime or rule out additional
factors. The full law in Theorem 7 would require the unproved stronger
distribution hypothesis for shifted primes (their Conjecture 5).
Theorem 11's endpoint upper estimate is also not a signed evaluation
of (13). None of these statements directly supplies (14).

This is a checked interface mismatch, not an impossibility claim for
a special weighted cancellation. The algebraic completion of (13)
has now been checked in the
[joint-correction audit](joint-correction-source-audit.md), using the
relevant prior art first. It returns the existing open Vaughan kernel.
An additional arithmetic estimate would be needed for a new signed
bound. A formal rewriting of (13), a one-input Dickman calculation,
or further cell volumes alone does not supply that estimate.

## 7. Checks, falsifiers and source custody

[supported-coefficient-dickman-validation.js](supported-coefficient-dickman-validation.js)
uses exact rational arithmetic to check finite Möbius convolution
including repeated primes and the empty term, convolution-exponential
cancellation, logarithm/factorial comparisons and the sign-budget
algebra. The embedded output is a VERIFIED finite certificate, not
verification of an asymptotic theorem. The derivations above justify
the limits, the Dickman density sign and the source transfer.

Decisive falsifiers are a lost m=1 term, unjustified factorial
symmetrization, a reversed signed-measure density or prime subtraction,
an unbounded cofactor coefficient, or use of Lemma 8 outside its
support. These checks were performed. No effective onset, full shifted
main term or favorable complementary estimate was computed.

PDF versions and SHA-256 hashes used:

- Soundararajan v1, 2010-05-19: p. 1 statement inspected as image and
  text; 1e7237739cf2fe29ef1c5442ab43d229472323cbd2a83fa3cf8c8c77a18047b3.
- Drappeau--Mounier v1, 2026-06-29: sections 1, 2.2, 2.4--2.6 and
  Theorem 3.1 statement read; pp. 2, 5, 9, 12 inspected as images;
  63df14b8f638beee6613cb0f9a020ea28cb06e4a2752fbbd6fcb19737ceb4e9a.
- Matomäki--Zuniga Alterman published: section 4, printed pp. 360--361
  (PDF pp. 10--11), inspected as text and images; prior Lemma 2.5
  source match retained; 9cd4cf5d5b51bb903aa613dd8d33c07358bfc7f0bb5bdab9e2f56c6dd60c8d0b.
- Bharadwaj--Rodgers published online 2026-04-17: definitions,
  Proposition 2, Conjecture 5, Theorem 7, Lemma 8, Theorem 11 and
  Lemma 8's proof read; pp. 3, 6, 7, 8, 11 inspected as images;
  2fbd36e2454a67315c88dfed0a9f69854eb6026779f8c49503372d8c1e98ca64.

Wu/Pan--Ding custody and its exact import are in the paired note.
The cited 2026 computational method and classical identities are
positive prior-art matches; this review is not a literature-exhaustion
claim or a claim of a new general theorem.
