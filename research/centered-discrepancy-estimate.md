# Centered discrepancy: exact top-range flip and reviewed truncation

<!-- ledger
id: Q-centered-discrepancy-estimate
status: PARTIAL
todo: C
parity: Exact divisor algebra retains Lambda(n-2)mu(n), centering, odd moduli and moving endpoints. The top-range repair uses ordinary prime Bombieri-Vinogradov (Tao Notes 3 Theorem 17, prefix form by rounding) at moduli m[b^2,g]<=x^(1/2-eps)(log x)^(3L) with the Mobius sign averaged by the q=1 Siegel-Walfisz mean of mu (Tao Notes 2 Exercise 66); no estimate for the twisted sequence itself is used or supplied. The derivation was reviewed independently by the handler (lane V) on 2026-09-08 and accepted at its stated scope; no estimate for D^(e_1) follows.
question: Can the top of D_y be removed using ordinary prime distribution after an exact divisor flip, and what estimate remains?
verdict: Equations (3)-(4), the exact split and flip, survive review and finite controls. A repair of the top-range bound T^top=O_(A,eps)(x/log^A x) is DERIVED in section 3a (2026-09-08) with the endpoint atom retained, odd square divisors, the corrected reciprocal-totient local factors with (m',g)=1, explicit truncation powers, a Cauchy multiplicity device, and a uniform Mobius mean proved from the q=1 Siegel-Walfisz statements; its inputs are the terminal-point BV of Tao Notes 3 Theorem 17 with the prefix form derived by rounding. The handler (lane V) read the derivation on 2026-09-08, reconstructed (BV*), (3a.9), (3a.14) and (3a.16), checked the limiting constant of (3a.9) numerically at eight (b,g) pairs and found no defect; it is accepted at its stated scope, with ineffective constants. The payoff is D_y=D^(e_1)+O_(A,eps)(x/log^A x) only, so the handoff consumer is equivalent to D^(e_1)>=-4x/25+o(x). The fixed-endpoint signed discrepancy, D_y>=-4x/25+o(x) and twin-prime infinitude remain OPEN.
-->

**Accepted at its stated scope: the top-range truncation
T^top=O_(A,eps)(x/log^A x) of section 3a, reviewed 2026-09-08. It
estimates nothing about D^(e_1). Twin-prime infinitude and
D_y>=-4x/25+o(x) remain OPEN.** Lane A was submitted from fda7b55; its
original text is preserved in a5e1244. The first integration review is
[research-round-validation.md](research-round-validation.md) section 2;
the review of the repair is its section 7. Section 3a is the repair of
2026-09-08 from 1285d47; it restates the consumer at a fixed endpoint
without estimating it.

## 1. Exact decomposition retained

Notation as in the handoff: x = 2^j, J = (x/2, x], y = ceil(x^(12/25)),
Q = floor(x/y), f(n) = Lambda(n-2) mu(n) with standard Lambda,
M = sum_J f(n), a_e = max(x/2, ey), and D_y the finite atomic Stieltjes
sum (9) of moving-cutoff-parity, equal to

\[
 \mathcal D_y=\sum_{\substack{e\le Q\\ e\ \mathrm{odd}}}\mu(e)
 \sum_{\substack{n\in(a_e,x]}}\Bigl(\mathbf 1_{e\mid n}-\frac1{\varphi(e)}\Bigr)
 f(n)\log\frac en .
\]

Fix eps with 0 < eps < 1/50 and put e_1 = floor(x^(1/2+eps)). For x large,
e_1 <= x/(2y), so every odd e < e_1 has ey <= x/2 and a_e = x/2. Define

\[
 \mathcal D^{(e_1)}(x)=\sum_{\substack{e<e_1\\ e\ \mathrm{odd}}}\mu(e)
 \sum_{n\in J}\Bigl(\mathbf 1_{e\mid n}-\frac1{\varphi(e)}\Bigr)f(n)\log\frac en,
 \tag{1}
\]
\[
 T^{\rm top}(x)=\sum_{\substack{e_1\le e\le Q\\ e\ \mathrm{odd}}}\mu(e)
 \sum_{\substack{n\in(a_e,x]\\ e\mid n}}f(n)\log\frac en,\qquad
 P^{\rm top}(x)=\sum_{\substack{e_1\le e\le Q\\ e\ \mathrm{odd}}}\frac{\mu(e)}{\varphi(e)}
 \sum_{n\in(a_e,x]}f(n)\log\frac en .
 \tag{2}
\]

**Identity (exact, for every integer e_1 with 1 <= e_1 <= x/(2y) + 1).**

\[
 \mathcal D_y=\mathcal D^{(e_1)}+T^{\rm top}-P^{\rm top}. \tag{3}
\]

**Flip (exact).** For e odd squarefree and n = em, mu(e) mu(n) = mu(m) when
(e, m) = 1 and 0 otherwise, and log(e/n) = -log m. The condition n > ey
is m > y, and e <= Q is then automatic. Hence

\[
 T^{\rm top}=-\sum_{y<m\le x/e_1}\mu(m)\log m\; N_{e_1}(m),\qquad
 N_{e_1}(m)=\sum_{\substack{e\ge e_1,\ e\ \mathrm{odd},\ \mu^2(e)=1\\ (e,m)=1,\ x/2<em\le x}}
 \Lambda(em-2). \tag{4}
\]

In (4) the Mobius sign sits on the modulus m <= x^(1/2-eps) of the
progression em - 2 = -2 (mod m); the cofactor e carries only the odd,
squarefree and coprime filters. The moving endpoint of D_y has become the
lower limit y of the modulus range, and it is excluded on both sides.


The proof of (3) just partitions the original odd e sum. For (4), keep
mu^2(e) and the coprimality filter; both are necessary. These identities
do not assert that the top term is negligible.

## 2. Proposed estimate and current status

The attempted conclusion was, for every fixed A>0 and 0<eps<1/50,

    T^top = O_A(x/log^A x),  P^top = O_A(x/log^A x),
    D_y = D^(e_1) + O_A(x/log^A x),  e_1=floor(x^(1/2+eps)).

**Accepted for T^top, and therefore for the truncation, after the
section 3a repair and its review (2026-09-08).** The first submitted
orientation, ordinary primes in progressions with small modulus m,
motivated the repair; the small modulus alone did not establish the
bound, and section 3a evaluates the squarefree/coprime density and the
signed main term explicitly.

The density projection P^top does have the direct reduction
\[
 P^{\rm top}=\sum_{n\in J}f(n)
 \sum_{\substack{e_1\le e<n/y\\e\ {\rm odd}}}
 \frac{\mu(e)}{\varphi(e)}(\log e-\log n).
\]
The two weighted Mobius partial sums in moving-cutoff-parity (11) have
constant limits and arbitrary logarithmic errors. Their differences at
e_1 and n/y cancel those limits. Since sum_J |f(n)|=O(x), partial summation
gives an arbitrary logarithmic saving for P^top. This does not control
T^top.

## 3. What the proof repair must discharge

After removing terms with em-2 a power of two, both m and e are odd.
The exact expansion of the remaining N uses odd b and g|m:
\[
 \sum_{\substack{b\ge1\\b\ {\rm odd}}}\sum_{g\mid m}\mu(b)\mu(g)
 \sum_{\substack{x/2<n\le x,\ n\ge e_1m\\
                  n\equiv0\pmod{m[b^2,g]}}}\Lambda(n-2).
\]
The removed powers of two have a separate divisor-bound error
O(sqrt(x)log^3 x) after summing the outer log m weight. The endpoint
n=e_1m is included here. Dropping it changes the exact sum (a witness is
x=16,y=2,e_1=3,m=5), even though the aggregate boundary can be bounded by
O((x/e_1)log^2 x).

If b,g<=B, the modulus is at most (x/e_1)B^3. For a fixed logarithmic B
this still fits inside ordinary BV with a fixed power margin, but both
tails and the multiplicity of this modulus must be paid explicitly.

For fixed b,g and m=gm' with (m',g)=1, write r=g[b^2,g]. Then
\[
 \frac1{\varphi(m'r)}
 =\frac1{\varphi(m')\varphi(r)}
   \frac{\varphi((m',r))}{(m',r)}.
\]
The local factor at p|r is (p-1)/p, and it is zero at p|g after enforcing
(m',g)=1. The submitted proof used the inverse factor p/(p-1), and lost
the coprimality condition in its Dirichlet series. That series cannot
justify the actual main term. A repaired proof must establish the
correct mean uniformly in b,g and sum its losses after truncation.
The finite validator does not address this analytic obligation.

The proposed H_band is withdrawn as a formal interface: it used an
undefined N and density kappa and an x/2 main interval length without
specifying the clipped endpoints. A future version must define that
arithmetic count and its mean before asking for a saving.

## 3a. Reviewed truncation proof

Notation of section 1 throughout: x=2^j, J=(x/2,x], y=ceil(x^(12/25)),
Q=floor(x/y), fixed 0<eps<1/50, e_1=floor(x^(1/2+eps)), M:=x/e_1<=2x^(1/2-eps), and
T^top as in (2) and (4). All constants implied by O and << depend on the
named parameters only and are ineffective through Siegel's theorem.
x is taken larger than a threshold x_0(A,eps).

**Claim (DERIVED 2026-09-08; read twice independently the same day, by the handler and by reader V2, and accepted at stated scope).** For every fixed A>0 and every
fixed 0<eps<1/50,

\[
 T^{\rm top}(x)=O_{A,\epsilon}\bigl(x\log^{-A}x\bigr). \tag{3a.1}
\]

With the accepted bound for P^top in section 2, (3) then gives
D_y=D^(e_1)+O_{A,eps}(x log^-A x). Nothing below estimates D^(e_1).

### 3a.1 Step 1: reconstruction with the endpoint, odd b and g | m

Let Lambda_0(k)=Lambda(k) unless k is a power of two, where Lambda_0(k)=0.
Write N(m)=N_0(m)+N_2(m), with N_0 the sum (4) taken with Lambda_0 and
N_2 the terms with em-2 a power of two. Since em in (x/2,x] and
em-2=2^a force em=x/2+2 (one value of n), the bound
Lambda(2^a)=log 2, log m<=log x and tau(x/2+2)<=2 sqrt(x) give

\[
 E_2:=\Bigl|\sum_{y<m\le M}\mu(m)\log m\,N_2(m)\Bigr|\le 2\sqrt x\,\log x. \tag{3a.2}
\]

In N_0, Lambda_0(em-2) is nonzero only when em-2 is an odd prime power,
so em is odd: N_0(m)=0 for even m, and for odd m every contributing e is
odd. Fix odd squarefree m. Expand mu^2(e)=sum_{b^2|e}mu(b), where b is odd
because e is odd, and 1_{(e,m)=1}=sum_{g|(e,m)}mu(g). For fixed b,g the map
e -> n=em is a bijection from {e: [b^2,g] | e, e>=e_1, x/2<em<=x} onto
{n: m[b^2,g] | n, n in I_m}, where

\[
 I_m:=\{n\in\mathbb Z:\ x/2<n\le x,\ n\ge e_1m\}=(l_m,x]\cap\mathbb Z,\qquad
 l_m:=\max(x/2,\ e_1m-1),\qquad L(m):=x-l_m=|I_m|. \tag{3a.3}
\]

l_m is an integer, 1<=L(m)<=x/2 for y<m<=M, and L is nonincreasing in m.
Hence, exactly,

\[
 N_0(m)=\sum_{\substack{b\ge1\\ b\ {\rm odd}}}\ \sum_{g\mid m}\mu(b)\mu(g)
 \sum_{\substack{n\in I_m\\ n\equiv0\ (m[b^2,g])}}\Lambda_0(n-2)\qquad(m\ {\rm odd\ squarefree}). \tag{3a.4}
\]

The endpoint n=e_1m is inside I_m. Even b would give a modulus divisible
by 4 and terms that vanish identically for x>=8 (validator section 4a);
they are excluded here because the reduced-residue hypothesis below
would fail for them, which is the actual content of review defect 2.
The modulus q=m[b^2,g] is odd, so the class -2 mod q is reduced.

### 3a.2 Step 2: the progression sums, the local factors and the required mean

For odd q write, for t>=2 and (a,q)=1,
Delta_q(t;a):=sum_{n<=t, n=a (q)}Lambda(n)-(1/phi(q))sum_{n<=t,(n,q)=1}Lambda(n),
Tao's discrepancy, and D(q):=sup_{(a,q)=1}sup_{2<=t<=x}|Delta_q(t;a)|.
The inner sum of (3a.4) equals psi_0(x-2;q,-2)-psi_0(l_m-2;q,-2) with psi_0
the Lambda_0 progression sum; psi_0 differs from psi by at most log x per
prefix (the removed powers of two), and (1/phi(q))sum_{n<=t,(n,q)=1}Lambda(n)
differs from psi(t)/phi(q) by at most log^2 x/phi(q). With
psi(t)=t+O_{A_3}(t log^-A_3 t) for t>=2 ([Tao, Notes 2, Exercise 64](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/), q=1),

\[
 \sum_{\substack{n\in I_m\\ n\equiv0\ (q)}}\Lambda_0(n-2)
 =\frac{L(m)}{\varphi(q)}+\theta_{m,q},\qquad
 |\theta_{m,q}|\le 2D(q)+O_{A_3}\Bigl(\frac{x\log^{-A_3}x+\log^2x}{\varphi(q)}\Bigr)+O(\log x). \tag{3a.5}
\]

Main term and its local factors. Fix odd b and odd squarefree g. The odd
squarefree m with g | m are m=gm' with m' odd squarefree and (m',g)=1;
mu(m)=mu(g)mu(m') and mu(g)^2=1. Put r:=g[b^2,g]=b^2g^2/(b,g), so
q=m'r. Since (m',g)=1 and rad(r)=rad(bg), (m',r)=prod of the primes
p | m' with p | b, and

\[
 \frac1{\varphi(m'r)}=\frac1{\varphi(m')\varphi(r)}\prod_{p\mid(m',b)}\frac{p-1}{p}
 =\frac{h_{b,g}(m')}{\varphi(m')\varphi(r)},\qquad
 h_{b,g}(p)=\begin{cases}0,& p\mid 2g\\ (p-1)/p,& p\mid b,\ p\nmid g\\ 1,& p\nmid 2bg,\end{cases} \tag{3a.6}
\]

with h_{b,g} multiplicative on squarefree arguments. The value 0 at p | 2g
carries the conditions m' odd and (m',g)=1 inside the weight. The factor
is (p-1)/p, not p/(p-1) (validator section 4b, including m'=3, r=9).

The actual Dirichlet series of the main term is

\[
 \sum_{m'\ge1}\frac{\mu(m')h_{b,g}(m')}{\varphi(m')\,m'^{s}}
 =\prod_{p\nmid 2bg}\Bigl(1-\frac{p^{-s}}{p-1}\Bigr)\prod_{p\mid b,\ p\nmid g}\bigl(1-p^{-1-s}\bigr)
 =\frac{H_{b,g}(s)}{\zeta(1+s)}, \tag{3a.7}
\]
\[
 H_{b,g}(s)=\prod_{p\nmid 2bg}\frac{1-p^{-s}/(p-1)}{1-p^{-1-s}}\prod_{p\mid 2g}\frac1{1-p^{-1-s}}
 =\sum_{k\ge1}\eta_{b,g}(k)k^{-s},
\]

with eta_{b,g} multiplicative, eta(p^k)=-1/(p^k(p-1)) for p not dividing
2bg, eta(p^k)=p^-k for p | 2g, and eta(p^k)=0 for p | b, p not dividing g
(the local factor at such p is exactly that of 1/zeta(1+s)). The
convolution identity mu(m')h(m')/phi(m')=sum_{dk=m'}(mu(d)/d)eta(k) is
checked exactly in validator section 4c. Absolute convergence, uniformly
in b:

\[
 K_g:=\sum_{k\ge1}|\eta_{b,g}(k)|\sqrt k
 \le\prod_p\Bigl(1+\frac1{(p-1)(\sqrt p-1)}\Bigr)\cdot\frac1{1-2^{-1/2}}\prod_{p\mid g}\frac1{1-3^{-1/2}}
 \le C_0\,\tau(g)^2, \tag{3a.8}
\]

since (1-3^(-1/2))^-1<2.4<2^2. At s=0, H_{b,g}(0)=2 prod_{p>2, p not
dividing bg}(1-1/(p-1)^2) prod_{p|g}p/(p-1), and H_{1,1}(0)=2C_2 agrees
with moving-cutoff-parity (11).

**Required signed uniform mean (UM).** Let
P_0(u):=sum_{m'<=u}mu(m')h_{b,g}(m')/phi(m') and
P_1(u):=sum_{m'<=u}mu(m')log m' h_{b,g}(m')/phi(m'). For every fixed A>0
there is C_A such that for all odd b>=1, all odd squarefree g>=1 and all
u>=2,

\[
 |P_0(u)|\le C_A\,\tau(g)^2\log^{-A}u,\qquad
 |P_1(u)+H_{b,g}(0)|\le C_A\,\tau(g)^2\log^{-A}u. \tag{3a.9}
\]

Uniformity in b, g and the block ends u in [y/G, M] is the whole
requirement; the block (y/g, M/g] is the clipped interval of the
assignment, and both its ends satisfy log u >= (12/25 - o(1)) log x.

Proof of (UM). Inputs: (M1) M_1(v):=sum_{d<=v}mu(d)/d satisfies
M_1(v)<<_A log^-A(2v) for v>=1; (M2) M_2(v):=sum_{d<=v}mu(d)log d/d
satisfies M_2(v)=-1+O_A(log^-A(2v)) for v>=1. (M1) follows from
[Tao, Notes 2, Exercise 66](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/)
at q=1, M(t):=sum_{n<=t}mu(n)<<_A t log^-A t, by partial summation
M_1(v)=M(v)/v+int_1^v M(t)t^-2 dt: the integral converges, its limit
equals the convergent series sum mu(d)/d, which equals lim_{s->1+}1/zeta(s)=0
by Abel's theorem for Dirichlet series, and the tail int_v^infty is
O_A(log^(1-A)v). (M2) follows from (M1) by
M_2(v)=M_1(v)log v-int_1^v M_1(t)t^-1 dt, the same limit argument and
lim_{s->1+}zeta'(s)/zeta(s)^2=-1. Now
P_0(u)=sum_{k<=u}eta(k)M_1(u/k). For k<=sqrt u, |M_1(u/k)|<=C'_A 2^A log^-A u;
for k>sqrt u, |M_1|<=C'_A and sum_{k>sqrt u}|eta(k)|<=K_g u^(-1/4).
This gives the first bound with (3a.8). For P_1 write
log m'=log d+log k on dk=m': P_1(u)=sum_{k<=u}eta(k)M_2(u/k)+sum_{k<=u}eta(k)log k M_1(u/k).
The first sum is -sum_{k<=sqrt u}eta(k)+O_A(K_g log^-A u)+O(K_g u^(-1/4))
=-H_{b,g}(0)+O_A(K_g log^-A u); the second is bounded like P_0 using
log k<=4k^(1/4). This proves (3a.9).

### 3a.3 Step 3: truncation, tails, multiplicities, endpoint errors

Fix L>0 and put B=G=(log x)^L. Split (3a.4) into b<=B, g<=G (body), b>B
(tail b) and b<=B, g>G (tail g). The count of n in I_m with q | n is at
most L(m)/q+1<=x/(2q)+1 when q<=x and 0 otherwise, and q>=mb^2, q>=mbg
(for squarefree g, [b^2,g]=b^2g/(b,g)>=bg). With Lambda_0<=log x, the
outer weight log m<=log x, sum_{m<=M}tau(m)/m<<log^2 M and
sum_{m<=M}tau(m)/sqrt m<<sqrt M log M:

\[
 E_b\le\log^2x\sum_{m\le M}\tau(m)\Bigl(\frac{x}{2mB}+\sqrt{x/m}\Bigr)
 \ll \frac{x\log^4x}{B}+x^{3/4-\epsilon/2}\log^3x, \tag{3a.10}
\]
\[
 E_g\le\log^2x\Bigl[\frac x2\sum_{b\le B}\frac1b\sum_{g>G}\frac1g\sum_{\substack{m\le M\\ g\mid m}}\frac1m
 +\sum_{m\le M}\tau(m)\sqrt{x/m}\Bigr]
 \ll \frac{x\log^3x\,\log B}{G}+x^{3/4-\epsilon/2}\log^3x. \tag{3a.11}
\]

Body. Every modulus satisfies q=m[b^2,g]<=MB^3<=2x^(1/2-eps)(log x)^(3L)=:Q_0.
The multiplicity c(q):=#{(m,b,g): m odd squarefree<=M, b<=B odd, g|m, g<=G, m[b^2,g]=q}
is at most tau(q)^3: m | q, then b^2 | q/m and g | q/m (validator section 4d).
Summing (3a.5) with |mu(b)mu(g)|<=1 and the outer weight,

\[
 T^{\rm top}=-{\rm Main}+O\bigl(E_2+E_b+E_g+E_{BV}+E_{P}\bigr),\qquad
 {\rm Main}:=\sum_{\substack{y<m\le M\\ m\ {\rm odd}}}\mu(m)\log m\,L(m)
 \sum_{\substack{b\le B\\ b\ {\rm odd}}}\sum_{\substack{g\mid m\\ g\le G}}\frac{\mu(b)\mu(g)}{\varphi(m[b^2,g])}, \tag{3a.12}
\]

where E_BV:=2 log x sum_{q<=Q_0}c(q)D(q) and E_P collects the remaining
terms of (3a.5): with phi(q)>=phi(m)phi(b^2), sum_{m<=M}tau(m)log m/phi(m)<<log^3x
and sum_b 1/phi(b^2)<infinity, and at most O(MB log M) triples, each carrying the outer log m and an O(log x) error. Thus the final term below costs three logarithms, including the divisor count (corrected 2026-09-09),

\[
 E_P\ll x\log^{3-A_3}x+\log^5x+x^{1/2-\epsilon}\log^{L+3}x. \tag{3a.13}
\]

Prime BV in the form used. [Tao, Notes 3, Theorem 17](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/)
states, for x>=2 and any A_2>0, sum_{q<=Q}sup_{a in (Z/qZ)^*}|Delta_q(x;a)|<<_{A_2}x log^-A_2 x
provided Q<=x^(1/2)log^-B x with B=B(A_2). This is the terminal-point
form; the supremum over prefixes t<=x is his Exercise 20 (statement with
a rounding hint, not a proved theorem on that page). The prefix form is
derived here from Theorem 17. Given A_1, set delta:=x log^-(A_1+10) x and
for t<=x let t':=delta floor(t/delta). Then
Delta_q(t;a)=Delta_q(t';a)+Delta_q((t',t];a), and the short piece is at
most 3 log x(delta/phi(q)+1) in absolute value, so its sum over q<=Q_0 is
<<delta log^2x+Q_0 log x<<x log^-(A_1+8)x. For each of the at most
log^(A_1+10)x values t'=i delta>=delta, Theorem 17 at x:=t' with precision
A_2:=2A_1+12 applies because Q_0<=t'^(1/2)log^-B t' for x>=x_0 (as
t'>=x log^-(A_1+10)x and Q_0<=2x^(1/2-eps)log^(3L)x), and gives
sum_q sup_a|Delta_q(t';a)|<<t' log^-A_2 t'<<x log^-A_2 x. Summing over i,

\[
 \sum_{q\le Q_0}D(q)\ \ll_{A_1,\epsilon,L}\ x\log^{-A_1}x. \tag{BV*}
\]

Cauchy device. Trivially D(q)<=4x log x/phi(q) for q<=x. Since
tau(q)^6/phi(q) is nonnegative and multiplicative,
sum_{q<=Q_0}tau(q)^6/phi(q)<=prod_{p<=Q_0}(1+2^6/(p-1)+O(p^-2))<<(log x)^64
by Mertens. Hence, by Cauchy-Schwarz with c(q)<=tau(q)^3,

\[
 E_{BV}\le 2\log x\Bigl(\sum_{q\le Q_0}\tau(q)^6D(q)\Bigr)^{1/2}\Bigl(\sum_{q\le Q_0}D(q)\Bigr)^{1/2}
 \ll \log x\,(x\log^{65}x)^{1/2}(x\log^{-A_1}x)^{1/2}
 = x\log^{1+(65-A_1)/2}x. \tag{3a.14}
\]

Main term. Insert (3a.6) into (3a.12) and write a_{m'}:=mu(m')(log g+log m')h_{b,g}(m')/phi(m'):

\[
 {\rm Main}=\sum_{\substack{b\le B\\ b\ {\rm odd}}}\mu(b)\sum_{\substack{g\le G\\ g\ {\rm odd\ squarefree}}}\frac1{\varphi(r_{b,g})}
 \sum_{y/g<m'\le M/g}a_{m'}\,L(gm'). \tag{3a.15}
\]

For t in [y/g, M/g] the partial sum A(t):=sum_{y/g<m'<=t}a_{m'}
=log g(P_0(t)-P_0(y/g))+(P_1(t)-P_1(y/g)) is a difference of two
values of (3a.9) at points u>=y/G>=x^(12/25)log^-L x, so
|A(t)|<=2C_A tau(g)^2(1+log g) 3^A log^-A x, because log u>=(log x)/3 there for x>=x_0(L). Since
L(gm') is positive and nonincreasing in m', Abel summation gives
|sum a_{m'}L(gm')|<=sup_t|A(t)| max L<=(x/2)sup_t|A(t)|. Finally
r_{b,g}=b^2g^2/(b,g)>=(bg)^(3/2) and 1/phi(r)<<r^(-5/6) (from
r/phi(r)<=2^omega(r)<=tau(r)<<r^(1/6)), so

\[
 |{\rm Main}|\ll_A x\log^{-A}x\sum_{b,g\ge1}\frac{\tau(g)^2(1+\log g)}{(bg)^{5/4}}\ll_A x\log^{-A}x. \tag{3a.16}
\]

The constants in (3a.9) and (3a.16) do not depend on b, g, L or eps; the
threshold x_0 depends on eps and L through y/G>=x^(12/25)log^-L x.

### 3a.4 Step 4: one total error

Given A and eps, choose L:=A+5, A_3:=A+3 and A_1:=2A+68. Then for x>=x_0(A,eps),
from (3a.2), (3a.10), (3a.11), (3a.13), (3a.14), (3a.16):

\[
 |T^{\rm top}|\ll_{A,\epsilon}\ x\log^{-A}x
 +\sqrt x\log x+\frac{x\log^4x}{\log^{A+5}x}+\frac{x\log^3x\log\log x}{\log^{A+5}x}
 +x^{3/4-\epsilon/2}\log^3x+x\log^{-A}x+x^{1/2-\epsilon}\log^{A+8}x
 \ll_{A,\epsilon}x\log^{-A}x. \tag{3a.17}
\]

This is (3a.1). Every constant is ineffective. The Mobius sign of the
original f(n)=Lambda(n-2)mu(n) is handled as follows: mu(n)=mu(e)mu(m),
mu(e) was absorbed into the squarefree filter of e in (4), and mu(m)
sits on the modulus of an ordinary prime progression; BV is applied with
absolute values, so the sign plays no role in E_BV, and it is averaged
only in the main term through (3a.9), a q=1 Mobius mean. No estimate for
the twisted sequence itself is used, and none is supplied for D^(e_1).

### 3a.5 What this changes and what it does not

With (3a.1) accepted and the accepted P^top bound,
D_y=D^(e_1)+O_{A,eps}(x log^-A x): the handoff consumer D_y>=-4x/25+o(x)
is equivalent to D^(e_1)>=-4x/25+o(x) for any fixed eps<1/50, a
fixed-endpoint signed discrepancy over odd moduli e<x^(1/2+eps) with the
sequence f(n)=Lambda(n-2)mu(n) on the full interval J. That object is
unestimated here; the band and below-band obstacles recorded in section 4
of the a5e1244 text are unchanged, and no theorem for f in progressions
at any modulus e>=3 is imported. The shift is 2 throughout; no shift
average is used, so no transfer is owed by this section.

Custody: the two imported statements were read on 2026-09-08 as
exercise statements on Tao's pages (Notes 2 Exercises 64 and 66) and as
Theorem 17 with the proof on the Notes 3 page. Theorem 17 is the
terminal-point form; the earlier table row describing it as carrying a
prefix maximum is corrected below. The existing repo import of the
prefix form for the Mobius case ([mobius-bv-derivation.md](mobius-bv-derivation.md))
is not used here.

## 4. Prior work and source matrix

The flip is the reverse of Murty–Vatwani's divisor switch, already read
in [moving-cutoff-parity.md](moving-cutoff-parity.md). No novelty claim is
made. Their freedom to take theta<1/2 motivates this
attempt. Their all-residue, all-prefix equidistribution assumption is
stronger than the one-sided signed consumer here; they are not equivalent
hypotheses. See [consumer-comparison.md](consumer-comparison.md).

The following table preserves the worker's source-reading scope. No
large-modulus theorem in it is newly imported by this integration.
The ordinary-BV application is justified in section 3a.
Claims of absence concern only the sources inspected.

| Source, version, locator | Statement (hypotheses) | Use here | Unmatched condition |
|---|---|---|---|
| [Tao, Notes 3, Theorem 17](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/), read 2026-09-08 with its proof: for x>=2 and any A, sum over q<=Q of the maximum over reduced classes of the terminal-point discrepancy of Lambda 1_[1,x] is O_A(x log^-A x) when Q<=x^(1/2)log^-B x, B=B(A); terminal point only, ineffective constants | ordinary BV import; used in section 3a.3 through (BV*) | moduli m[b^2,g]<=x^(1/2-eps)(log x)^(3L), residue -2 mod odd q, absolute values, weights <=log x through the Cauchy device | none for the terminal point; the supremum over prefixes t<=x is Exercise 20 on the same page (statement with hint), and is derived from Theorem 17 in section 3a.3 by rounding the prefix to multiples of x log^-(A_1+10) x |
| [Tao, Notes 2, Exercise 64](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/) (Siegel-Walfisz for Lambda; the unconditional form psi(x;q,a)=x/phi(q)+O_A(x log^-A x) for primitive classes, all x>=2), read 2026-09-08 as an exercise statement | q=1 case only, psi(t)=t+O_A(t log^-A t), for the main term in (3a.5) | none | stated as an exercise, not proved on the page; classical theorem |
| [Tao, Notes 2, Exercise 66](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/) (Siegel-Walfisz for the Mobius function: sum_{n<=x, n=a (q)} mu(n)<<_A x log^-A x, all classes, x>=2, ineffective), read 2026-09-08 as an exercise statement | q=1 case only; (M1) and (M2) of section 3a.2 follow by partial summation and Abel's theorem | none | stated as an exercise, not proved on the page; classical theorem |
| Murty–Vatwani, JNT 180 (2017) Thm 1.1, PRIMARY in consumer-comparison | EH_Lambda(x^theta log^C x) and EH_{mu_h}(x^(1-theta)) give the squarefree-density lower bound | comparison only | (8) is their hypothesis at theta = 1/2 - eps, restricted to the class -2 and the dyadic prefix |
| [Maynard, Primes in arithmetic progressions to large moduli I, arXiv:2006.06572v2](https://arxiv.org/abs/2006.06572), 2021-04-05, Theorem 1.1, Corollaries 1.2–1.4; PDF sha256 7732d1c035258ef8946b4720c06b8a6c80b1606f5e82bf97c0590474b412de0c, read in extracted text | fixed a; sum over q_1 <= Q_1, q_2 <= Q_2 of the absolute error of pi(x; q_1 q_2, a), bound x/log^A x, under Q_1 Q_2^2 < x^(1-100 eps), Q_1^12 Q_2^7 < x^(4-100 eps), Q_1^20 Q_2^19 < x^(10-100 eps); Cor. 1.2: moduli q <= x^(1/2+delta) with a divisor in (x^(2 delta+eta), min(x^(1/10-7 delta/5-eta), x^(1/2-19 delta-eta))); Cor. 1.3: all but 18 delta Q phi(a)/a moduli in [Q, 2Q] | matched against the band (section 4.3) | at height x^(1/2+delta') the moduli without a convenient divisor have proportion of order delta' and carry trivial mass of order delta' x log x per dyadic block; absolute values would accept the mu(m) weights, so the exceptional set is the whole obstruction |
| BFI II, Math. Ann. 277 (1987) Theorems 3, 5*, read only in Maynard I Lemmas 8.4–8.5 (restatements); primary: Springer paywall, GDZ resolver 404 on 2026-09-08 | all q ~ Q with absolute values, x^(1/2) log^(-A) x < Q < x^(2/3-eps), for triple convolutions of the prime variable with range constraints (Q x^eps < KL, K^3 L^2 < x^(3/2-eps), K^3 L^4 < x^(2-2 eps), K^2 L^5 < x^(2-2 eps); or one smooth factor with Q x^eps < KL, K^3 Q < L x^(1-eps), K Q^2 < L x^(1-eps)) | would cover the good Heath-Brown shapes in the band | the bad shapes (four factors near x^(1/4), five near x^(1/5); Maynard I section 3.2) are uncovered and cost of order delta'^3 of the trivial bound per block; primary statements not read |
| BFI II + BFI III, J. AMS 2 (1989), as Theorem A in Maynard I section 1.1; primary BFI III: AMS returned 403 to two fetchers on 2026-09-08 | fixed a, Q = x^(1/2+delta): sum over q in [Q, 2Q] of (pi(x;q,a) - pi(x)/phi(q)) is O(delta^2 x/log x + x (log log x)^O(1)/log^3 x), without absolute values | matched against the band | constant-factor saving delta^2 only; no absolute values, so the signed weight mu(m) log m is not admitted |
| BFI I, Acta Math. 156 (1986) Theorem 10 (as Theorem B in Maynard I; Theorem A in Maynard II) | well-factorable lambda_q of level x^(4/7-eps), fixed a | matched | mu(m) log m and its Vaughan pieces are not well-factorable |
| [Maynard, II: well-factorable estimates, arXiv:2006.07088v1](https://arxiv.org/abs/2006.07088) Theorem 1.1; sha256 04516b141dfac689f317d533189eabf9b50cec200706159aaa3d8dbe1e25bfb4 | triply well-factorable weights, level x^(3/5-eps) | matched | same as the previous row |
| [Polymath, arXiv:1402.0811v3](https://arxiv.org/abs/1402.0811) Theorem 1.1; sha256 f4b4556f9451ea0524b974376b9dbe4478faf3734847897460274f6bae98b65c | x^delta-smooth squarefree moduli, exponent 1/2 + 7/300, uniform in CRT residue classes | matched | our moduli are arbitrary squarefree |
| [Drappeau, arXiv:1504.05549v4](https://arxiv.org/abs/1504.05549), 2016-12-11, Theorems 1.1–1.2 and its Theorem A; sha256 7d5b2f3c2dac35f09004f005bfc6de9696979cdf05c4330b25c346a81f4d924f | Titchmarsh sum T(x) = sum Lambda(n) tau(n-1) with error O_A(x/log^A x) (Fouvry 1985, BFI I), power saving under GRH | indicates that an unweighted log-power result at moduli near x^(1/2) exists in the two primaries, which were not opened (Crelle 357: de Gruyter paywall, GDZ 404) | the Titchmarsh average is unweighted in the modulus; at best it would serve the Type I Vaughan pieces of mu(m) over a window x^(1/2) log^(±B) x and lower the level of (8) by a logarithmic power |

The previous calculation charged an entire power-width band by a bound
of size O_eps(x log^2 x). That upper bound is insufficient for an O(x)
allowance; it is not a lower bound on the actual band. Even in this
model, a relative width M_2/M_1 would need
log(M_2/M_1)=O(1/log x) to make x log x log(M_2/M_1)=O(x), rather than the
O(log^(-2) x) condition originally written. No global impossibility or
claim about every published route follows.

## 5. Validation and next obligation

[centered-discrepancy-estimate-validation.js](centered-discrepancy-estimate-validation.js)
checks 237 exact splits, the flipped sum, endpoint and coprimality
controls, the density subtraction and 3923 finite Vaughan identities.
Its section 4 (added 2026-09-08) checks the algebra that section 3a
changes: 1412 reconstructions (3a.4) with the inclusive endpoint, odd b
and the single power-of-two atom, the review witness x=16, y=2, e_1=3,
m=5, the local factors (3a.6) at primes dividing b only, g only, both,
neither and a shared prime, the failure of the reciprocal 3/2 at m'=3,
r=9, the convolution identity behind (3a.7) on 8800 cases, and the
multiplicity bound c(q)<=tau(q)^3 to 1100.
[research-round-validation.js](research-round-validation.js) additionally
checks the proof's missing atom and incorrect local factor. These are
finite checks. They do not test (BV*), (3a.9) or any asymptotic step;
the derivation of section 3a carries those. The handler's review
([research-round-validation.md](research-round-validation.md) section 7)
reconstructed (BV*), (3a.9), (3a.14) and (3a.16) and added a finite check
of the limiting constant -H_{b,g}(0) in (3a.9) to
[research-round-validation.js](research-round-validation.js).

Falsifier for the derivation: an error in the rounding step for (BV*),
in the uniformity of (3a.9) in g, or in the convergence (3a.16) would
each break (3a.1); the reviewer should read those three steps first.
No finite computation can refute (3a.1).

With (3a.1) accepted, the handoff consumer may be stated equivalently
at the fixed endpoint e_1. The fixed-endpoint object D^(e_1) is split in
[fixed-endpoint-discrepancy.md](fixed-endpoint-discrepancy.md); its
below-level Type I estimate is corrected and accepted after the 2026-09-09 independent reading, and the
remainder there is the recorded Mobius-weighted shifted-prime bilinear
family, not estimated. A theorem for the actual twisted sequence or another
signed estimate can also justify a new attempt. No blanket prohibition on
revisiting this lane follows from the present state.

Revision history: research/history/CHANGELOG.md.
