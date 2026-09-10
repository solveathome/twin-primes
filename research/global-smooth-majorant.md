# A full absolute bound with a smoother admissible profile

<!-- ledger
id: Q-global-smooth-majorant
status: PARTIAL
todo: C
parity: A pointwise three-smallest-prime finite-difference majorant, classical Mertens estimates, and Henriot's corrected upper Theorem 5 for nonmultiplicative functions satisfying its uniform growth condition. The existing uniform Vaughan reduction and exceptional-prime-power budget are retained. This controls absolute mass, not its sign or a sufficient constant.
question: Can a higher-order majorant control the complete global coefficient pair at scale x while retaining every factor configuration and the prime filters?
verdict: Derived using the corrected Henriot upper theorem: a C3 probability average of the same admissible initial cutoffs gives a full residual with sum |Ghat_L(n) Ghat_R(n-2)|=O(x). The three-smallest-prime majorant has bounded harmonic mass and meets the source growth class uniformly, despite not being multiplicative. All prime-power exceptions are paid. This replaces the O(x log x) absolute budget for the earlier logarithmic profile by O(x) for a different admissible profile representing the same signed residual to arbitrary logarithmic precision. The implied constant is not compared with C2 and no improved signed lower bound or twin margin is supplied.
-->

**The sufficient twin-prime margin remains OPEN.** This note derives an
absolute O(x) bound for a complete global remainder after changing the
admissible averaging profile. Its implied constant is not a usable
comparison with C2. The signed remainder already had an O(x) bound;
the change is that its separate positive and negative masses now have
that bound as well, in this representation.

Baseline: commit 204e7e1, 2026-09-06. The first attempt in
[global-factor-signs.md](global-factor-signs.md) retains all small-prime
subsets and pays the exceptional terms. Its pair-trigger majorant fails.
Here the full factor sum is bounded with three finite differences,
without truncating the number of factors in either input.
No novelty or optimality claim is made.
The finite-difference mechanism has an explicit prior-art match in
Granville--Koukoulopoulos--Maynard; see the source comparison in section 7.

## 1. Change the initial probability average, preserving the global identity

Keep exactly the parameters of
[global-cutoff-averaging.md](global-cutoff-averaging.md):

\[
 (a_L,b_L,W_L)=(\lfloor x^{.22}\rfloor,\lfloor x^{.24}\rfloor,
                    \lfloor x^{.24}\rfloor),\qquad
 (a_R,b_R,W_R)=(\lfloor x^{.04}\rfloor,\lfloor x^{.05}\rfloor,
                    \lfloor x^{.05}\rfloor).
                                                               \tag{1}
\]

Let L_i=log(b_i/a_i), T=log x, and use the decreasing profile

\[
 \chi(t)=
 \begin{cases}
 1,&t\le0,\\
 1-35t^4+84t^5-70t^6+20t^7,&0<t<1,\\
 0,&t\ge1.
 \end{cases}
 \qquad
 \widehat\rho_i(d)=\chi\!\left(\frac{\log d-\log a_i}{L_i}\right).
                                                               \tag{2}
\]

The first three derivatives match zero at both endpoints, so chi is
C3 on the real line. Its density is
-chi'(t)=140t^3(1-t)^3 on (0,1), nonnegative with integral one.
Independently average the sharp identities using
u=a_L exp(L_L t), v=a_R exp(L_R t') with those probability densities.
The indicator average is exactly 1-rhohat_i(d).

All cutoffs remain in the previously checked uniform BV rectangle.
Thus, defining

\[
 \widehat F_i(m)=\sum_{d\mid m}\mu(d)\widehat\rho_i(d),\quad
 \widehat G_i(m)=\sum_{d\mid m}\mu(d)(1-\widehat\rho_i(d))
                                  \beta_{W_i}(m/d),
 \quad
 \widehat{\mathcal R}(x)=\sum_{n\in J_x}
                      \widehat G_L(n)\widehat G_R(n-2),
                                                               \tag{3}
\]

we retain, for every fixed A,

\[
 S(x)=C_2x+\widehat{\mathcal R}(x)+O_A(x/\log^A x).
                                                               \tag{4}
\]

No sharp-corner transition or outside term is introduced. All the
existing uniformity margins are unchanged. The earlier logarithmic
profile still has its recorded O(x log x) absolute budget; we do not
transfer the new absolute bound to it. Only the complete signed sums
agree: Rhat=R+O_A(x/log^A x).

## 2. A majorant retaining all prime factors

For n>=1 let p_1<...<p_r be its distinct prime divisors, r=omega(n).
Put k=min(3,r), ell_T(p)=min(1,log p/T), and define on all integers

\[
 w_T(n)=2^{\omega(n)}\prod_{j=1}^{\min(3,\omega(n))}\ell_T(p_j),
 \qquad w_T(1)=1.                                             \tag{5}
\]

This is nonnegative and ignores prime-power multiplicities, but does
not discard squareful inputs. For every n<=x,

\[
 |\widehat F_i(n)|\le C_i w_T(n),                              \tag{6}
\]

where C_i is fixed independently of x.

To prove this, let f_i(y)=chi((y-log a_i)/L_i), and pair all subsets
containing each of the k smallest primes with those not containing it.
With Delta_u f(y)=f(y)-f(y+u), the full sum becomes

\[
 \widehat F_i(n)=
 \sum_{d\mid\operatorname{rad}(n)/(p_1\cdots p_k)}
       \mu(d)\Delta_{\log p_1}\cdots\Delta_{\log p_k}f_i(\log d).
                                                               \tag{7}
\]

The iterated fundamental theorem of calculus bounds each summand by
M_k L_i^(-k) product_(j<=k) log p_j, where
M_k=||chi^(k)||_infinity for k>0 and M_0=1. There are 2^(r-k)
remaining divisors. Since L_L/T tends to .02 and L_R/T to .01,
take C_i=max_(0<=k<=3) M_k (T/L_i)^k/2^k with a fixed eventual
upper bound. This proves (6), including r=0,1,2. When r>3 every
remaining factor stays in the divisor sum before the inequality.
Prime divisors above W_i cause no problem in (7); the same derivative
bound applies even when a step spans the whole taper.

This argument needs the new smoothness. The earlier logarithmic
profile does not have three bounded derivatives. The ten-prime
counterexample survives here: its profile samples lie entirely on
the constant parts, so Fhat=-84 there too. Smoothness does not make
Fhat nonnegative.

## 3. The majorant has bounded harmonic mass

The key elementary estimate is

\[
 \sum_{m\le x}\frac{w_T(m)}m\ll1,\qquad T=\log x.               \tag{8}
\]

Use the standard Mertens estimates, in the forms

\[
 \sum_{p\le z}\frac{\log p}{p-1}\ll\log z,\qquad
 \prod_{r<p\le x}\left(1+\frac2{p-1}\right)
                    \ll\left(\frac{T}{\log r}\right)^2
 \quad(2\le r\le x).
                                                               \tag{9}
\]

For the second form,
1+2/(p-1)=(1-1/p^2)/(1-1/p)^2. These are standard consequences of
[Mertens' estimates in Tao, Notes 1](https://terrytao.wordpress.com/2014/11/23/254a-notes-1-elementary-multiplicative-number-theory/).

The contribution to (8) with omega(m)=j<=2 is at most

\[
 \frac1{j!}\left(\frac2T
          \sum_{p\le x}\frac{\log p}{p-1}\right)^j\ll1,
                                                               \tag{10}
\]

including j=0. Summing a positive exponent of p contributes exactly
sum_(a>=1) p^(-a)=1/(p-1); powers are retained.

For omega(m)>=3, fix the first three primes p<q<r. All other primes
exceed r and their 2^omega weight is multiplicative. Removing the
product cutoff gives the upper bound

\[
 \begin{aligned}
 \sum_{\substack{m\le x\\\omega(m)\ge3}}\frac{w_T(m)}m
 &\le \frac8{T^3}
 \sum_{p<q<r\le x}
 \frac{\log p\,\log q\,\log r}{(p-1)(q-1)(r-1)}
 \prod_{r<\ell\le x}\left(1+\frac2{\ell-1}\right)\\
 &\ll\frac1T\sum_{r\le x}
 \frac{\log r}{(r-1)(\log r)^2}
 \left(\sum_{p<r}\frac{\log p}{p-1}\right)^2
 \ll1.
 \end{aligned}                                                \tag{11}
\]

All displayed p,q,r,ell are primes. This is an ordered-prime
decomposition of the positive envelope, not an Euler product for
w_T itself. It retains arbitrarily many additional primes.

This also explains the choice of three differences. Applying this
same envelope calculation with only one or two selected primes
leaves upper budgets O(T) or O(log T), respectively, for the harmonic
sum. Those are limitations of these estimates, not lower bounds
on the actual harmonic sums or a smoothness optimality theorem.

## 4. Match the corrected nonmultiplicative upper theorem

We import Henriot's **New Theorem 5** in the
[2014 erratum, p. 377](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/B0BD208D979495FE06B8192209E710EA/S0305004114000280a.pdf/nair-tenenbaum-uniform-with-respect-to-the-discriminant-erratum.pdf),
with its corrected root count from (0.1)--(0.2), p. 375. The definition
of the growth class M_k is in the
[original paper, introduction](https://arxiv.org/html/1102.1643v1).
The published theorem and corrected congruences were checked on
rendered pages as well as extracted text. PDF SHA-256:
bd56f8f411457549c5cc53f9b24bbdec68544dca09cfe0836e35cc1b25677d6f.
The full analytic proof of this imported theorem is not reproved here.

For the source interval use X=x/2, Y=X, alpha=1/2, delta=1,
Q_1(t)=t, Q_2(t)=t-2 and g=2. Both polynomials are primitive,
their leading coefficients are one and their resultant has absolute
value two. Choose the source epsilon_0=1/1200<1/600, its required
alpha/[50g(g+delta^(-1))]. X^alpha<Y<=X and the fixed polynomial
size condition hold eventually.

Apply the theorem to
mathfrak F_T(a,b)=w_T(a)w_T(b). Multiplying an integer by extra
prime factors cannot increase the product of its three smallest
clamped ell values: if fewer than three are present, the new
factors are <=1; if three are present, replacement can only decrease
their product. Hence

\[
 \mathfrak F_T(a_1b_1,a_2b_2)
 \le 2^{\omega(a_1)+\omega(a_2)}\mathfrak F_T(b_1,b_2)
 \le \min\{2^{\Omega(a_1a_2)},B_{\epsilon_0}(a_1a_2)^{\epsilon_0}\}
                       \mathfrak F_T(b_1,b_2).                \tag{12}
\]

The standard divisor bound supplies B_epsilon0 independent of T.
Thus membership in M_2(2,B_epsilon0,epsilon0) is uniform even though
the weight depends on x. This includes prime powers:
w_T(p^a)=2 ell_T(p) for every a>=1.

For these two irreducible linear forms the corrected theorem gives

\[
 \sum_{n\in J_x}w_T(n)w_T(n-2)
 \ll x\prod_{2<p\le X}(1-2/p)
       \sum_{ab\le X}w_T(a)w_T(b)
       \frac{\breve\rho(a,b)}{[a\operatorname{rad}(a),
                                      b\operatorname{rad}(b)]}.
                                                               \tag{13}
\]

The corrected density in (13) imposes exact divisibility and excludes
cross-divisibility by primes in the other coordinate's support.
It is at most the density of a|n, b|n-2. That density is zero unless
gcd(a,b)|2, and otherwise equals gcd(a,b)/(ab). Therefore it is
always at most 2/(ab). This explicitly includes the prime two.
Using (8) and Mertens' product estimate in (13),

\[
 \boxed{\sum_{n\in J_x}w_T(n)w_T(n-2)\ll x/T^2, \qquad
 \sum_{n\in J_x}|\widehat F_L(n)\widehat F_R(n-2)|
                                      \ll x/T^2.}             \tag{14}
\]

**The multiplicative shortcut is invalid.** For T>log 7,
w_T(210)>w_T(30)w_T(7); the fourth small prime is not another
small ell factor in (5). The source's Euler-product corollaries
and New Theorem 6 cannot replace the general upper theorem here.
No lower estimate is imported.

## 5. Consume the bound on the full global coefficients

The factor formula and exceptional-set proof in
[global-factor-signs.md](global-factor-signs.md) use only
0<=rho<=1, rho(1)=1 and support d<=b=W, all retained by (2).
Thus its complete prime and prime-power accounting applies verbatim
with hats. In particular, for C_i^comp(n)=1_(n composite)
Fhat_i(n) log(t_i(n)),

\[
 \sum_{n\in J_x}|\widehat G_L(n)\widehat G_R(n-2)|
 \le \sum_{n\in J_x}|C_L^{\rm comp}(n)C_R^{\rm comp}(n-2)|
       +O_\epsilon(x^{39/40+\epsilon})
 \le T^2\sum_{n\in J_x}|\widehat F_L(n)\widehat F_R(n-2)|
       +O_\epsilon(x^{39/40+\epsilon})
 \ll x.                                                       \tag{15}
\]

Fix epsilon<1/40. The second inequality deliberately enlarges a
nonnegative sum by dropping the prime filters. It is an upper bound,
not an identity and not a sign-preserving replacement. No small
cofactor, large-factor branch, squareful input or outside residual
is left unpaid.

Writing Phat and Nhat for the separate positive and negative masses,

\[
 \widehat P+\widehat N\ll x,\qquad
 S=C_2x+\widehat P-\widehat N+O_A(x/\log^A x).                 \tag{16}
\]

This is the payoff of the attempt. The earlier one-point Cauchy budget
was O(x log x), whereas (15) uses a shifted upper theorem and a
different allowed profile to pay the complete absolute mass at O(x).
It gives neither Phat-Nhat=o(x) nor a favorable constant lower bound.
The existing signed O(x) estimate is not being claimed again as new.

## 6. What remains, and what not to repeat

Read [smooth-sieve-literature.md](smooth-sieve-literature.md) before the
next attempt. It matches the existing concentration, optimization and
shifted-divisor results and derives a full small-prime tail bound from
the corrected upper theorem. That permits a specified factor-family
attempt with an error budget; it does not supply the signed margin.

The sufficient next input is still, for some fixed c,K>0 on unbounded
common dyadics,

\[
 \widehat N-\widehat P
       \le C_2x-cx/\log^K x.                                  \tag{17}
\]

The [switching follow-up](switching-negative-mass.md) now derives
liminf Nhat/(C2*x)>3/2, already on a three-prime/rough-composite
family. Thus a negative-only constant below C2 is impossible for
these cutoffs; improving the same upper majorant cannot supply it.
The witness also survives every fixed delta<1/50 and every profile
with the same plateaus. The full identity forces positive mass
with liminf Phat/(C2*x)>1/2, without improving the net margin.

The next bounded question must compare the signs in (17), retaining
prime exclusions and the complement. A justified signed scale average
remains permitted. Repeating the absolute-order estimate, estimating
all negative terms while discarding positive ones, or replacing the
envelope by its prime-value Euler product will not supply (17).

The previous pair-trigger closure is unchanged. The failed direct
small-cofactor theorem interface is not reopened by this argument:
we apply a different upper theorem to an explicitly proved majorant,
not a bounded-multiplicative correlation theorem to Ghat.

## 7. Checks and source-search scope

[global-smooth-majorant-validation.js](global-smooth-majorant-validation.js)
checks the profile polynomial and density, endpoint derivatives,
the full subset-pairing identity, derivative envelope, squareful
inputs, uniform growth inequality, prime-power convention, the
nonmultiplicativity witness, a finite first-three-prime Euler grouping,
and the corrected root-density bound with active controls.
It uses integer additive-log proxies for exact finite arithmetic.
It does not numerically test real-log asymptotics, the imported theorem,
the O(x) constant, or a signed twin margin.

A failure of uniform growth, the harmonic estimate, the source
hypotheses, or the complete prime-power transfer would invalidate
(15). Each has a written check above; the finite controls do not
substitute for those arguments.

The scoped lookup used absolute moments of truncated divisor sums,
Barban--Vehov weights, sieve-weight smoothings, and Nair--Tenenbaum
upper bounds. The originality check on 2026-09-06 found a direct match
in Granville--Koukoulopoulos--Maynard's
[smoothing paper, section 1.2, equations (1.6)--(1.7)](https://arxiv.org/html/1606.06781v4#S1.SS2):
pairing the smallest prime factors gives iterated finite differences,
with an integral formula in terms of the corresponding derivative.
These are exact identities, even though that section also discusses
heuristic consequences.

For the notation match, set R=b_i and
f(z)=chi((z log b_i-log a_i)/L_i). Then their M_f(n;R) is exactly
Fhat_i(n). Take r=min(3,omega(n)) in their identities and bound the
remaining squarefree divisor sum by its number of terms. This recovers
the pointwise derivative estimate used in section 2. The derivative
constants are uniform because log(b_i)/L_i stays bounded. Thus the
core finite-difference mechanism is established prior art.

Henriot's corrected nonmultiplicative upper theorem remains the matched
shifted import. The bounded harmonic majorant, source-class verification
and complete Ghat transfer are the application derived here. Their
combination is not assigned a literature-novelty grade: this check
neither establishes that the complete bound (15) is stated elsewhere
nor that it is absent. The justified assessment is an application of
established techniques with a local improvement over this project's
earlier absolute budget. The conclusion concerns this remainder
representation; it supplies no stronger bound on the count of twin primes.
The search does not establish exhaustion of signed approaches.
