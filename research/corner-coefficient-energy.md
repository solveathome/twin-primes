# Full corner coefficients: exact energy and a smoothed bound

<!-- ledger
id: Q-corner-coefficient-energy
status: ANSWERED
todo: C
parity: Exact divisor regrouping, the elementary squarefree counting identity and a named Graham/Barban–Vehov mean-square theorem. The smoothed estimate retains proper prime powers, small cofactors and non-squarefree inputs, but is an unsigned one-point norm bound, not cancellation at shift 2. It does not extend the existing bounded-multiplicative correlation theorem to these coefficients or bound the sharp-to-smooth transition.
question: Can the full corner coefficients be studied before splitting their cofactor branches, and what do exact energy and classical smoothed sieve weights supply?
verdict: The sharp coefficient energy is an explicit signed quadratic form in short cofactors plus O_epsilon(x^(1/2)K^2*x^epsilon), a power below x at the fixed corner. Logarithmically averaging the divisor cutoff gives Barban–Vehov weights and an O_eta(x log x) squared norm on each side and absolute shifted-product bound. The follow-up sharp-corner-transition.md gives sharp O_eta(x log^2 x) norms and proves a non-negligible norm transition for sufficiently small fixed eta. Signed transition saving and the global complement remain OPEN; no exact residual cut or twin margin changes.
-->

**The sufficient twin margin remains OPEN.** The O(x log x) bound below
is too large, and it concerns a smoothed portion of the remainder. The
connection combines the full-coefficient identity in
[corner-correlation.md](corner-correlation.md), the common-factor sign
calculation in [structural-literature-audit.md](structural-literature-audit.md)
and classical quadratic sieve weights. No novelty claim is made.

## 1. A one-point energy for the sharp coefficient

Let 0<=A<B<=x, integers 1<=D_-<D_+, and arbitrary complex alpha_k
supported on 1<=k<=K. Put

\[
 C(n)=\sum_{k\mid n}\alpha_k\mu(n/k)
                   1_{D_-<n/k\le D_+},\qquad A<n\le B.
                                                               \tag{1}
\]

For k,l write g=(k,l), a=k/g, b=l/g, M=[k,l]=gab. Every common
multiple is n=Mt, with n/k=bt, n/l=at. Define

\[
 L_{kl}=\max(A/M,D_-/a,D_-/b),\qquad
 H_{kl}=\min(B/M,D_+/a,D_+/b).
\]

Empty intervals contribute zero. Since (a,b)=1, for every t,

\[
 \mu(at)\mu(bt)=\mu(a)\mu(b)\mu^2(t)1_{(t,ab)=1}.             \tag{2}
\]

If a or b is not squarefree both sides vanish. Otherwise the equality
follows by checking whether t is squarefree and coprime to ab. There is
no squarefreeness assumption on g or n. In particular this calculation
keeps terms at non-squarefree n that the mu(n)mu(n-2) representation misses.

Writing Q_q(L,H)=sum_(L<t<=H) mu^2(t)1_{(t,q)=1}, expansion gives exactly

\[
 \sum_{A<n\le B}|C(n)|^2
 =\sum_{k,l\le K}\alpha_k\overline{\alpha_l}\mu(a)\mu(b)
                  Q_{ab}(L_{kl},H_{kl}).                       \tag{3}
\]

The intervals are essential. This is a one-point norm; replacing the
second n by n-2 destroys (2) and returns the unresolved two-form problem.

### 1.1 Elementary asymptotic for the squarefree count

Uniformly for q>=1 and T>=1,

\[
 Q_q(0,T)=\kappa(q)T+O(2^{\omega(q)}\sqrt T),\qquad
 \kappa(q)=\frac1{\zeta(2)}\prod_{p\mid q}\frac p{p+1}.         \tag{4}
\]

Expand mu^2(t)=sum_(j^2|t) mu(j). The inner coprime count is
(T/j^2)phi(q)/q+O(2^omega(q)) when (j,q)=1, and zero otherwise.
Sum j<=sqrt T. Completing the absolutely convergent j-series costs
O(sqrt T); its Euler product gives kappa(q). Subtracting two prefixes
proves the interval version with error O(2^omega(q)sqrt H).
For 0<=T<1 the same bound follows directly from Q_q(0,T)=0.

Consequently, if |alpha_k|<=log x,

\[
 \sum_{A<n\le B}|C(n)|^2=\mathcal Q_x+
                  O_\epsilon(x^{1/2}K^2x^\epsilon),             \tag{5}
\]
\[
 \mathcal Q_x=\sum_{k,l\le K}\alpha_k\overline{\alpha_l}
       \mu(a)\mu(b)\kappa(ab)(H_{kl}-L_{kl})_+ .
\]

Here the divisor bound absorbs 2^omega(ab) and all fixed logarithms;
K is at most a fixed power of x. No claimed logarithmic evaluation of
this signed quadratic form follows from (5).

For the actual left corner take A=x/2, B=x, D_-=max(U,D_1),
D_+=D_0, alpha_k=beta_V(k) and K=floor(x/(D_-+1)). Thus
K<=x^(6/25+2eta), and the error exponent is
49/50+4eta+epsilon. For the right side use A=x/2-2, B=x-2,
D_-=max(Y,E_1), D_+=E_0 and beta_Z; its exponent is
3/5+4eta+epsilon. At fixed 0<eta<1/400 both are below one for
sufficiently small fixed epsilon. All P/S/Q terms are included.

This isolates an elementary quadratic-form task before attempting a
shifted correlation estimate. The existing x log^4 x term-wise envelope
does not evaluate this energy.

## 2. Small cofactors can cancel inside the coefficient

For m>=1 write rad(m)=product_(p|m) p and q(m)=m/rad(m). Exactly,

\[
 \sum_{\substack{s\mid m\\D_-<m/s\le D_+}}\mu(m/s)
 =\mu(\operatorname{rad}m)
   \sum_{\substack{t\mid\operatorname{rad}m\\
                    D_-<\operatorname{rad}(m)/t\le D_+}}\mu(t).
                                                               \tag{6}
\]

Indeed a surviving divisor m/s is squarefree, so s=q(m)t with
t|rad(m). This keeps non-squarefree inputs exactly. Applying it for
every prime power r in

\[
 C(n)=\sum_{\substack{r\mid n\\r>V}}\Lambda(r)
           \sum_{\substack{s\mid n/r\\D_-<n/(rs)\le D_+}}
                     \mu(n/(rs))                               \tag{7}
\]

combines the s branches before any triangle inequality. The function
mu(rad(m)) is 1-bounded and multiplicative, with prime value -1, but
the inner truncated divisor sum is signed and need not be bounded by
one. Thus (6) is not the constant-norm multiplicative lift of
prime-band-transfer.md. It supplies neither a positive weight nor a
correlation estimate. It does show why non-squarefreeness alone is
not a reason to abandon all multiplicative representations.

## 3. Logarithmically average the divisor cutoff

Fix an integer W>=1 and 1<z_1<z_2, and put L=log(z_2/z_1). Define

\[
 \rho(d)=\begin{cases}
 1&d\le z_1,\\
 \log(z_2/d)/L&z_1<d<z_2,\\
 0&d\ge z_2,
 \end{cases}
 \quad F_\rho(m)=\sum_{d\mid m}\mu(d)\rho(d),\quad h(d)=1-\rho(d).
\]

The identity

\[
 h(d)=\frac1L\int_{z_1}^{z_2}1_{d>T}\frac{dT}{T}                \tag{8}
\]

is exact, including its endpoints. Set

\[
 \widetilde C_W(n)=\sum_{dk=n}\mu(d)h(d)\beta_W(k).
\]

On n<=x the usual upper divisor cutoff floor(x/(W+1)) is redundant:
every term of beta_W has an integer r>=W+1 dividing k, so
d<=n/r<=floor(x/(W+1)). Expanding beta and using mu*1=delta gives

\[
 \widetilde C_W(n)=
 -\sum_{\substack{r\mid n\\r>W,\ r<n}}\Lambda(r)F_\rho(n/r).
                                                               \tag{9}
\]

The restriction r<n is essential. The m=n/r=1 term cancels against
delta_(m=1); retaining it with a minus sign would give a false
nonzero coefficient at primes. Also F_rho(m)=0 for 1<m<=z_1.
Thus every nonzero term in (9) has W<r<x/z_1 and m>z_1.
All prime powers r are retained with weight Lambda(r), not log r.

### 3.1 Imported mean-square input and the short endpoint range

Use the integer case of the Graham mean-square estimate, stated in
[Chen An, arXiv:2206.10104v1, (1.1) and Theorem 1.1](https://arxiv.org/html/2206.10104v1):
for 1<=a<b<=N, the preceding weight with endpoints a,b satisfies

\[
 \sum_{m\le N}F_{a,b}(m)^2=
       \frac N{\log(b/a)}+O\left(\frac N{\log^2(b/a)}\right),    \tag{10}
\]

with an absolute implied constant in the integer case. This is a
named imported theorem, not a proof supplied by our finite test. The
primary integer source is S. W. Graham, *An asymptotic estimate related
to Selberg's sieve*, J. Number Theory 10 (1978), 83–94; An's (1.1)
quotes it, and An's own Theorem 1.1 is the number-field generalization.
The import used here is (1.1). Its constant is absolute at k=Q because
n_k=d_k=1 and Q has no Siegel zero, so C_(beta_0)=1.
The primary statement and its weight/range definitions were read;
its full analytic proof has not been independently verified here.
PDF SHA-256: `60b77f3957a4da643079ded072adf5f10515e90e047eb0b6327685a87ef2ec19`.

Assume L>=1. A consequence valid for every N>=z_1 is

\[
 \sum_{z_1<m\le N}F_\rho(m)^2\ll N/L.                         \tag{11}
\]

For N>=z_2 this is (10). If z_1<N<z_2, put t=log(N/z_1).
For m>1, m<=N, the identity sum_(d|m)mu(d)=0 gives
F_rho(m)=(t/L)F_{z_1,N}(m): the constant difference between the
two cutoff functions vanishes after convolution. Equation (10) then
bounds the sum by O(N(t+1)/L^2)<=O(N/L). At N=z_1 it is zero.
This step matters: simply applying (10) with z_2>N violates its range.

### 3.2 The resulting full-coefficient norm

The nonnegative weights in (9) have total at most
sum_(r|n)Lambda(r)=log n. Cauchy and (11) give

\[
 \sum_{n\le x}|\widetilde C_W(n)|^2
 \ll \frac{x\log x}{L}
            \sum_{W<r<x/z_1}\frac{\Lambda(r)}r
 \ll \frac{x\log x}{L}\bigl(1+\log(x/(Wz_1))\bigr),            \tag{12}
\]

when x/z_1>W. Otherwise the sum is zero. The final inequality follows
by partial summation from the classical Chebyshev bound psi(t)<<t;
the existing quantitative PNT input is more than enough. No prime-only
substitution or squarefree restriction was made.

At the left corner choose

\[
 W=V,\quad z_1=\lfloor x^{19/25-2\eta}\rfloor,
 \quad z_2=\lfloor x^{19/25-\eta}\rfloor,
\]

and on the right W=Z with exponents 19/20-2eta, 19/20-eta.
For fixed 0<eta<1/400 and sufficiently large x these lie between the
original lower and upper divisor bounds, L~eta log x, and
log(x/(Wz_1))~2eta log x. Therefore

\[
 \boxed{\sum_{n\le x}|\widetilde C_V(n)|^2\ll_\eta x\log x,
 \qquad\sum_{m\le x-2}|\widetilde C_Z'(m)|^2\ll_\eta x\log x.} \tag{13}
\]

For the right side the proof uses x-2 as the summation endpoint and
the stated x-dependent cutoffs. Cauchy now implies

\[
 \boxed{\sum_{n\in J_x}
    |\widetilde C_V(n)\widetilde C_Z'(n-2)|\ll_\eta x\log x.}   \tag{14}
\]

This is an unsigned norm estimate for the complete smoothed coefficients.
It is not an estimate for their signed correlation smaller than x.

## 4. What this does and does not transfer to

Equation (8) makes the smoothed product a positive average over two
independently chosen divisor cutoffs. It is not the original sharp
corner. Let C,C' denote that sharp corner, with lower cuts z_1,z_1'.
The exact difference is

\[
 CC'-\widetilde C\widetilde C'
     =(C-\widetilde C)C'+\widetilde C(C'-\widetilde C').         \tag{15}
\]

These terms have at least one divisor in its transition range
(z_1,z_2) or (z_1',z_2'). They are part of the current uncontrolled
corner. Their small fixed exponent width does not make their signed
contribution negligible. Jensen gives a bound for the average from the
sharp norms, not a reverse bound for sharp norms from (13).

One may split the existing E_dagger with the multiplier h(d)h'(e),
without changing its definition or exact cuts. The density argument in
corner-correlation §1.3 is uniform in the two lower cutoffs; averaging
it with (8) costs total mass one. Hence the weighted endpoint part
equals the smoothed raw product up to O_H(x/log^H x). The complementary
weighted endpoint part is still open, including (15).

Relative to (14), a further signed saving of log^(1+epsilon) x would
give o(x) for this smoothed portion. No such saving is established.
The x log^4 x sharp term-wise envelope and x log x smoothed grouped
envelope are bounds on different objects, so their ratio is not a
three-log improvement for E_dagger. Nor can the subfamily's existing
small correlation saving be multiplied by (13): that theorem applies
to different coefficients.

The follow-up [sharp-corner-transition.md](sharp-corner-transition.md)
prices this question: the full sharp squared norms are O_eta(x log^2 x),
and both they and the transition squared norms are Theta_eta(x log^2 x)
for sufficiently small fixed eta. Thus a negligible L2 transfer fails
in that range. The next question is the signed transition-pair correlation,
with mixed terms and the global complement retained. No larger factor
census is needed for the identities here.

### 4.1 The small-prime multiplication step becomes a cutoff difference

For an arbitrary divisor weight w define
C_w(n)=sum_(d|n) mu(d)w(d)beta_W(n/d), keeping W and w fixed.
Let p<=W be prime and p not divide n. Then beta_W(pk)=beta_W(k)
for k|n: the only new prime power dividing pk is p itself, below the
strict threshold. Splitting divisors of pn according to p|d gives

\[
 C_w(pn)=\sum_{d\mid n}\mu(d)\{w(d)-w(pd)\}\beta_W(n/d).
                                                               \tag{16}
\]

For the sharp lower cutoff w(d)=1_(d>D), this is exactly
-sum_(D/p<d<=D,d|n) mu(d)beta_W(n/d). For w=h from (8), the
difference vanishes outside z_1/p<d<z_2 and has magnitude at most
min(1,log(p)/L). Upper divisor bounds remain redundant when pn<=x.
The coprimality and p<=W conditions are essential; terms with p|n
must be accounted for separately in any application.

Thus the full coefficient does not transform as a multiplicative
function of prime value -1. This identifies the missing step if trying
to adapt the Ramaré factorization in Tao–Teräväinen §3.5 or the
complete-multiplicativity step in Guo §6.1; the precise source audit is
in [cross-campaign-synthesis.md](cross-campaign-synthesis.md) §3.
It also gives a concrete boundary sum to study. The pointwise
log(p)/L bound is on the difference of weights, not on the whole
arithmetic sum. Summing absolute divisor coefficients, exceptional
prime divisibility or repeated differences can consume that apparent
saving. No signed estimate is obtained from (16) alone.

## 5. Verification and falsifiers

[cross-campaign-validation.js](cross-campaign-validation.js) checks the
sharp Gram identity using exact integer coefficients, including complex
coefficients and non-squarefree inputs; the radical/cofactor identity;
the logarithmic cutoff integral; the prime singleton cancellation;
the N<z_2 rescaling identity; and (16) for sharp and smoothed weights.
Controls deliberately remove coprimality, conjugation, off-diagonal
terms or the singleton correction, or substitute multiplicativity. Proxy
cutoffs test finite algebra, not asymptotic corner occupancy or (10).

A nonuniform constant or a missing parameter restriction in (10) would
invalidate (11)–(14). The source statement has been checked for those
hypotheses; the imported proof remains an explicit dependency. A claimed
sharp or global bound must additionally estimate (15) and the complement.
