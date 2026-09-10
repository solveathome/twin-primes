# Sharp corner energy and the cost of smoothing

<!-- ledger
id: Q-sharp-corner-transition
status: ANSWERED
todo: C
parity: A named uniform mean-square theorem for truncated Mobius divisor sums, PNT and elementary convolution identities give one-point energy bounds. Cross-prime terms are bounded before a diagonal lower bound is used. No cancellation at shift 2 or favorable global twin margin is obtained.
question: What is the energy of the complete sharp corner coefficient, and can the smoothed estimate be transferred through a negligible L2 transition?
verdict: DERIVED using named analytic inputs: for each fixed 0<eta<1/400 the full sharp squared norms and absolute shifted product are O_eta(x log^2 x). For every sufficiently small fixed eta>0 both sharp squared norms and sharp-minus-smoothed squared norms are Theta_eta(x log^2 x) on the actual dyadic intervals. Thus an O_eta(x log x) sharp squared norm or negligible L2 transition fails in that range. Signed transition correlations and the global complement remain OPEN. No region, exact residual cut or twin margin changes.
-->

**The sufficient twin margin remains OPEN.** The transition cannot be
discarded by a small one-point norm in the parameter range proved below.
There is nevertheless a sharper upper budget for the complete sharp
corner: O_eta(x log^2 x), after grouping each coefficient, compared with
the previous O_eta(x log^4 x) term-wise envelope. This does not supply
signed o(x). No novelty or effective-onset claim is made.

The owning upstream definitions and smoothed estimate are in
[corner-coefficient-energy.md](corner-coefficient-energy.md) and
[corner-correlation.md](corner-correlation.md). The new lower bound here
does **not** infer a lower bound from diagonal terms alone: section 4
explicitly pays for every off-diagonal term.

## 1. Parameters and exact inversion

Treat the two sides together. Fix w=6/25 or w=1/20, set

\[
 W=\lfloor x^w\rfloor,\qquad
 D=\lfloor x^{1-w-2\eta}\rfloor,\qquad R=x/D,
 \qquad 0<\eta<1/400.
\]

For all sufficiently large x, D is the corner's actual lower divisor
cut (it exceeds U on the left and Y on the right). Write

\[
 C(n)=\sum_{d\mid n,d>D}\mu(d)\beta_W(n/d),\quad
 \beta_W(k)=\sum_{r\mid k,r>W}\Lambda(r),\quad
 M(m,D)=\sum_{d\mid m,d\le D}\mu(d).                         \tag{1}
\]

The existing upper divisor cut is redundant for n<=x on the left,
and n<=x-2 on the right: a nonzero beta requires k>=W+1.
No small cofactor or non-squarefree input is suppressed. Since
sum_(d|m) mu(d)=1_(m=1),

\[
 C(n)=-\sum_{r\mid n,\ W<r<n}\Lambda(r)M(n/r,D).             \tag{2}
\]

The r=n singleton cancels exactly. For 1<m<=D, M(m,D)=0;
thus only r<n/D<=R can contribute. All prime powers r occur, with
Lambda(p^a)=log p, not log(p^a).

Use I_0=(x/2,x] for the left norm and I_2=(x/2-2,x-2] for the
right norm. These intervals each have length x/2. A proof for all
n<=x gives an upper bound on either interval, but the lower bounds
below are proved on these intervals themselves.

## 2. Imported input and source audit

Let S(N,z)=sum_(m<=N) M(m,z)^2. De la Breteche, Dress and Tenenbaum,
[*Remarques sur une somme liee a la fonction de Mobius*](https://tenenb.perso.math.cnrs.fr/PPP/Sxz.pdf),
(1.5) and Theorem 1.1, supply absolute constants B>=1, L_0>0, c>0:

\[
 S(N,z)\le BN\quad(N,z\ge1),                               \tag{3}
\]
\[
 S(N,z)=L_0N+O\bigl(N/\mathcal L(3\xi)^c\bigr),
 \quad 1\le\xi\le z\le N/\xi,\qquad
 \mathcal L(t)=\exp\{(\log t)^{3/5}/(\log\log t)^{1/5}\}.
                                                               \tag{4}
\]

Published version: [Mathematika 66 (2020), 416–421](https://londmathsoc.onlinelibrary.wiley.com/doi/abs/10.1112/mtk.12021); L_0 is the paper's L. The author PDF header has an extra leading digit in its volume line.
Read 2026-09-06, complete author PDF; SHA-256
`1a806559c82718e1e3d33cf9e0d71ebd5fab7c93488feec102601607f549997f`,
refetched and matched by the independent review
[transition-energy-review.md](transition-energy-review.md).
The proof's large-cutoff case uses radical/divisor symmetry in (2.7),
error O(N^(3/2)/z) in (2.8), and Lemma 2.1 in (2.9).
Its middle range is handled separately. We import the theorem, not a
replacement proof. If z>N, (3) also follows from S(N,z)=1.

This uniformity matters: expanding floors gives an O(z^2) error,
which does not control the long cutoffs used here. The primary
[Granville–Koukoulopoulos–Maynard paper, v4](https://arxiv.org/html/1606.06781v4),
*Sieve weights and their smoothings*, provides the relevant sharp/smooth
context (Theorem 1.3). Its proof's (10.8) requires smoothing order A>=1;
applying that bound at A=0 would be an invalid shortcut. Equations
(3)–(4) above give the matched sharp input instead. Ordinary PNT and
partial summation are the other analytic inputs below.

## 3. Complete sharp upper bound

Weighted Cauchy in (2), using sum_(r|n) Lambda(r)=log n, yields

\[
 \begin{aligned}
 \sum_{n\le x}|C(n)|^2
 &\le \log x\sum_{W<r<R}\Lambda(r)
                   \sum_{D<m\le x/r}M(m,D)^2\\
 &\le Bx\log x\sum_{W<r<R}\frac{\Lambda(r)}r\\
 &\ll x\log x\{1+\log(R/W)\}.
 \end{aligned}                                             \tag{5}
\]

For the final inequality, sum_(r<=t) Lambda(r)/r=log t+O(1)
is sufficient. Here log(R/W)=2 eta log x+o(1), with floors retained.
Therefore for every fixed admissible eta,

\[
 \boxed{\sum_{n\in I_0}|C(n)|^2\ll_\eta x\log^2x,
 \qquad \sum_{m\in I_2}|C'(m)|^2\ll_\eta x\log^2x.}          \tag{6}
\]

Cauchy at shift 2 now gives

\[
 \sum_{n\in I_0}|C(n)C'(n-2)|\ll_\eta x\log^2x.             \tag{7}
\]

The corner density subtraction is O_H(x/log^H x), as already derived
uniformly in the lower cuts. Thus its endpoint remainder has the same
upper budget. This estimates the whole sharp corner, not just the
prime-cofactor subfamily; it does not estimate the global complement.

## 4. A lower bound that includes the cross-prime budget

### 4.1 Separate the proper powers in L2

Write C=P+Q according to whether r in (2) is prime or a proper
prime power. The elementary estimate
sum_(p^a>W,a>=2) p^(-a) << W^(-1/2), together with
|M(m,D)|<=tau(m)<<_epsilon x^epsilon and sum_(r|n) Lambda(r)=log n,
gives, after absorbing logarithms and choosing the divisor exponent,

\[
 \sum_{n\le x}|Q(n)|^2\ll_\epsilon x^{1-w/2+\epsilon}.
                                                               \tag{8}
\]

Indeed Q is supported on multiples of a proper prime power exceeding
W; their number is at most x times the displayed reciprocal sum.
That sum follows by treating a=2 separately, bounding 3<=a<=log_2 W
by O(W^(-2/3) log W), and summing the remaining geometric tail.
Choose epsilon<w/2. The L2 norm of Q is o(sqrt(x) log x).

### 4.2 Exact off-diagonal reduction

For I=I_0 or I_2, expanding the prime part gives

\[
 \|P\|_I^2=\mathcal D_I+\mathcal O_I,
\]
\[
 \mathcal D_I=\sum_{W<p<R}(\log p)^2
                   \sum_{m\ge2,\ pm\in I}M(m,D)^2,          \tag{9}
\]
\[
 \mathcal O_I=\sum_{\substack{W<p,q<R\\p\ne q}}
       \log p\log q\sum_{pqm\in I}M(qm,D)M(pm,D).           \tag{10}
\]

For all sufficiently large x, the fixed parameters satisfy

\[
 R<D,\qquad x/W^2<D.                                       \tag{11}
\]

The exponent gaps are 1-2w-4 eta>0 and w-2 eta>0.
Consequently m<=x/(pq)<D. If m=1, both factors in (10) vanish
because p,q<D. If p|m, M(pm,D)=M(m,D)=0, since M depends only
on the radical of its first argument; the case q|m is identical.
For m>1 and (m,pq)=1, splitting the divisors divisible by p or q
gives the **exact** identity

\[
 M(qm,D)M(pm,D)=M(m,D/q)M(m,D/p).                           \tag{12}
\]

It is important to keep the m>1 and coprimality restrictions. After
taking absolute values, dropping those restrictions and I only increases
the sum. For each p,q, ordinary Cauchy and (3) give

\[
 \sum_{m\le x/(pq)}|M(m,D/q)M(m,D/p)|
 \le\sqrt{S(x/(pq),D/q)S(x/(pq),D/p)}\le Bx/(pq).
\]

All source parameters are at least one by (11). Consequently

\[
 \begin{aligned}
 |\mathcal O_I|
 &\le Bx\left(\sum_{W<p<R}\frac{\log p}{p}\right)^2\\
 &\le 9B\eta^2x\log^2x
 \end{aligned}                                             \tag{13}
\]

for all sufficiently large x at fixed eta. Partial summation gives
the prime sum =2 eta log x+o(log x). The ordered p!=q pairs in (10)
are already included in the square; there is no missing factor two.
No sign is asserted for this off-diagonal sum.

### 4.3 Price the diagonal on the actual interval

In the nonnegative sum (9), keep only W<p<=x^(w+eta).
For either endpoint N=(x-b)/p or (x/2-b)/p, b=0 or 2,
the choice xi=x^(eta/2) satisfies xi<=D<=N/xi eventually,
uniformly in those primes. Subtracting the two instances of (4),

\[
 \sum_{pm\in I}M(m,D)^2
       =\frac{L_0x}{2p}+o_\eta(x/p)
       \ge \frac{L_0x}{4p}.                                \tag{14}
\]

The m=1 term is absent from I for these primes at large x. PNT gives

\[
 \sum_{W<p\le x^{w+\eta}}\frac{(\log p)^2}{p}
   =\{w\eta+\eta^2/2+o(1)\}\log^2x
   \ge \tfrac12 w\eta\log^2x.                             \tag{15}
\]

Combining (9), (13)–(15),

\[
 \|P\|_I^2\ge
       (L_0w\eta/8-9B\eta^2)x\log^2x
       \ge (L_0w\eta/16)x\log^2x                           \tag{16}
\]

provided **0<eta<L_0 w/(144B)**, as well as eta<1/400.
This is an existence range for a fixed margin. Neither B nor the onset
is evaluated here, and (16) is not asserted for every eta<1/400.
Taking eta_0=min(1/400,L_0/(2880B)) gives a single positive range
valid for both sides, since w_min=1/20.
By the reverse triangle inequality and (8), (16) survives for C=P+Q.
Together with (6), this establishes, for each fixed 0<eta<eta_0,

\[
 \boxed{\|C\|_{I_0}^2\asymp_\eta x\log^2x,
 \qquad \|C'\|_{I_2}^2\asymp_\eta x\log^2x.}               \tag{17}
\]

This argument would fail if the O(eta^2) cross budget were absent;
positive diagonal mass alone is insufficient. The special short prime
band and (11) are the reasons it works here.

## 5. The transition is large in norm; its correlation is still open

Let the logarithmic smoothing have z_1=D and
z_2=floor(x^(1-w-eta)), as in the upstream note. It gives
||C_tilde||_I^2<<_eta x log x. Define T=C-C_tilde, and analogously
T' on the right. Equations (6) and (17), with the direct and reverse
triangle inequalities, imply for every fixed 0<eta<eta_0,

\[
 \boxed{\|T\|_{I_0}^2\asymp_\eta x\log^2x,
 \qquad \|T'\|_{I_2}^2\asymp_\eta x\log^2x.}               \tag{18}
\]

Thus the proposed O_eta(x log x) squared norm for the sharp coefficient,
or an o_eta(x log^2 x) transition squared norm, is **refuted in this
small-fixed-eta range**. This is not a lower bound for a shifted
correlation. Neither sum T(n)T'(n-2) nor its absolute version has
been shown to have the order of the product of the individual norms.

The exact decomposition, with all sums on n in I_0, is

\[
 \sum CC'=\sum\widetilde C\widetilde C'
        +\sum T\widetilde C'+\sum\widetilde C T'
        +\sum TT'.                                         \tag{19}
\]

Here each primed factor is evaluated at n-2. The available absolute
budgets (valid for every fixed admissible eta) are:

| Signed sum to estimate | Absolute upper budget from present norms | A sufficient further saving for o(x) |
|---|---|---|
| sum C_tilde C'_tilde | O_eta(x log x) | divide by log^(1+epsilon) x |
| each mixed sum in (19) | O_eta(x log^(3/2) x) | divide by log^(3/2+epsilon) x |
| sum T T' | O_eta(x log^2 x) | divide by log^(2+epsilon) x |

The last column describes sufficient hypothetical inputs, not obtained
estimates or necessary conditions for every possible proof. Cancellation
between these sums is also allowed. A one-sided or sufficiently strong
common-scale average can be consumed instead of four individual o(x)
theorems. The existing bounded-multiplicative subfamily saving is not
a theorem about T, C or either mixed coefficient.

**Next bounded question:** retain the signed T(n)T'(n-2) sum before
Cauchy and test a matched analytic estimate with every cutoff and
coefficient cost. Its exact divisor kernel can already be written down.
Put rho(d)=log(z_2/d)/log(z_2/D) on D<d<z_2, and define rho' on
the right transition interval. Then

\[
 T(n)=\sum_{d\mid n,\ D<d<z_2}\mu(d)\rho(d)\beta_W(n/d),
\]
\[
 \sum_{n\in I_0}T(n)T'(n-2)
 =\sum_{\substack{D<d<z_2\\D'<e<z_2'}}
   \mu(d)\mu(e)\rho(d)\rho'(e)
   \sum_{\substack{dk-ev=2\\dk\in I_0}}
           \beta_W(k)\beta_{W'}(v).                         \tag{20}
\]

All indices are positive integers. Nonzero fibers require (d,e)|2;
this is a property of each divisor pair, not just integer parity.
The prime-power and small-cofactor expansions remain inside both betas.
Equation (20) is an exact reformulation, not a signed estimate or an
extension of the controlled region. The exact boundary
identity in coefficient-energy (16) is a possible input, not an
approximate multiplicativity theorem. Price the mixed and smoothed sums
alongside it; even controlling the entire corner leaves the global
complement and common-scale positive twin margin open. This local
question does not require enlarging the factor census.

## 6. Verification and explicit failure tests

[sharp-corner-transition-validation.js](sharp-corner-transition-validation.js)
checks the full convolution and singleton correction in exact prime-log
coefficients; the entire prime energy matrix and cross-prime reduction;
proper powers, non-squarefree inputs, both interval shifts, and the exact
transition product and determinant-2 kernel (20). Proxy cutoffs obey
(11). Active controls remove the
singleton/coprimality corrections, proper powers, interval or divisor
cuts, an off-diagonal term, or confuse sharp and smooth coefficients.
A separate counterexample violates (11), so that hypothesis is not
silently treated as optional.

These finite identities do not verify (3)–(4), PNT, an asymptotic lower
constant or an effective onset. The analytic derivation above depends
on the stated uniform source input. A failure of uniformity in (3),
of the parameter check for (14), of (12), or of the off-diagonal budget
would invalidate the lower bound; those interfaces have been checked
directly. In particular (17) must not be used outside its small-fixed-eta
range, or converted into a lower bound at shift 2.
