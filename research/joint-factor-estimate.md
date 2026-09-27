# Joint factor family with a paid complement: the Type I part is a zero-sum transfer

<!-- ledger
id: Q-joint-factor-estimate
status: ANSWERED
todo: C
parity: Ordinary prime Bombieri--Vinogradov (Tao, Notes 3, Theorem 17) on each cofactor interval of length at least sqrt(x)/2 at all odd moduli up to x^(1/10), squarefree or not; Landau's Mobius mean bound for the twisted density constant; Pan--Ding (Wu, Lemma 2.3, squarefree moduli) only for the prime-partner upper sieve at level x^(9/20). No Type II or bilinear estimate for Lambda(n-2) against the signed family weight is used or proved; no universal obstruction is claimed.
question: Can an additional estimate for actual factor configurations control the full signed balance of the C3 residual?
verdict: DERIVED: for the single-large-prime delta-rough family F, the residual splits exactly as R_F = C2*x*H_delta - Z_F^p + o(x), where the Type I part C2*x*H_delta is evaluated by ordinary prime BV on each cofactor interval and the twisted Mobius constant 2C2 (corrected 2026-09-08 after V2: Wu Lemma 2.3 is squarefree-only and did not cover the non-squarefree b_R moduli; prime BV covers all moduli), and Z_F^p is the signed prime-partner sum. The complement carries the opposite Type I part -C2*x*H_delta, so grouping by factor configuration transfers Type I mass and leaves the twisted prime correlation B_L unchanged. With the matched upper sieve the family bound is C2*x(1+H_delta-(40/9)H^+), certified below -2/5 C2*x: INSUFFICIENT BOUND. Even a sieve constant 2 in place of 40/9 needs H^abs<1 and leaves the complement unpaid. Independently reviewed 2026-09-09 with the uniform delta-range and complement corrections below. Twin infinitude and every sufficient margin remain OPEN.
-->

**Twin-prime infinitude and every sufficient signed margin remain OPEN.**
This note executes lane B of [RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md)
section 2 at commit 1285d47. It derives one exact family/complement
partition of the C3 residual with the actual coefficients, evaluates the
family's Type I part by ordinary prime Bombieri--Vinogradov on each cofactor
interval, and records the exact inequality
that fails together with its unfilled hypothesis. No new asymptotic estimate
for a sufficient margin is supplied. Literature novelty is not claimed; the
mechanism is the Vaughan main term applied to a prime-cofactor family.

    Lane / stable question id: B / Q-joint-factor-estimate
    Starting commit / report commit or shared-checkout paths: 1285d47 / research/joint-factor-estimate.md, research/joint-factor-estimate-validation.js (shared checkout, uncommitted)
    Disposition / exact claim / unproved hypotheses: INSUFFICIENT BOUND with an exact identity retained. Claim (4.4): R_F = C2 x H_delta(x) - Z_F^p(x) + o_delta(x). Unproved: any bound Z_F^p <= (1+H_delta-eta) C2 x, and any bound on the complement's twisted prime correlation B_L^comp.
    Changed step compared with the reviewed baseline: the right partner is not sieved for roughness; its short Vaughan approximant P_R is used as an exact linear weight, so all partners (rough, nonrough, prime, prime power) enter with their actual coefficients and the Type I part of the family is evaluated, not bounded. Correction applied 2026-09-08 after V2: the Type I error at the non-squarefree b_R moduli is outside Wu Lemma 2.3 (mu(q)^2 3^nu(q) weight); it is now paid by ordinary prime BV per cofactor interval, which carries no squarefree restriction, so Pan--Ding is not needed for the Type I evaluation.
    Source theorem and first unmatched hypothesis, if any: Tao, 254A Notes 3, Theorem 17 (Bombieri--Vinogradov, sup over reduced classes, all moduli q <= y^(1/2) log^(-B) y), applied at y = x/m and y = x/(2m) for each m; hypotheses discharged in section 4.2. Pan--Ding (Wu Lemma 2.3) is used only for the prime-partner upper sieve constant 40/9 on squarefree moduli. No theorem is available for Z_F^p beyond the linear-sieve upper bound; that is the unmatched input, not a hypothesis of an applied theorem.
    Validation command, falsifier, result and compute used: node research/joint-factor-estimate-validation.js (embedded, 0.8 s, one core). Falsifiers in section 5; all finite checks pass; no enumeration allocation used.
    Independent reviewer / disposition: ordinary-BV repair accepted after the second readings; the independent 2026-09-09 integration reconstructs the Type I transfer and repairs the uniform Dickman error and explicit complement budget (research-round-validation.md section 9).
    Full-consumer payoff and unpaid complement: none for the consumer. C2 x + R_hat = C2 x + B_L^F + B_L^comp + o(x); the family and complement Type I parts cancel identically. Unpaid: Z_F^p beyond the sieve factor, and B_L^comp entirely.
    Proposed shared-record changes / next bounded obligation: section 7; section 8.

## 1. Question, disposition and what remains open

The lane question is whether an estimate for actual factor configurations
can control the signed balance of the complete C3 residual. The bounded
attempt here chooses the single-large-prime family with a fixed roughness
cut and all right partners, writes the exact partition first, evaluates the
family's linear part by ordinary prime BV, and bounds its nonlinear part by the
matched upper sieve. The result is an exact identity, (4.4), and a failed
inequality, (4.7), whose deficit is certified below -2/5 in units of C2 x.

Open after this pass: the sufficient margin
C2 x + R_hat >= c x/log^K x on unbounded dyadic scales; every bound on the
signed prime-partner sum Z_F^p sharper than the linear-sieve constant; every
bound on the complement's twisted prime correlation. Nothing here is an
upper bound on the actual residual or an obstruction for other methods.

## 2. Exact statement, variables and normalisation

Throughout x = 2^j tends to infinity, T = log x, J = (x/2, x] intersected
with the integers, C2 = product over p > 2 of (1 - 1/(p-1)^2), and Lambda
is the standard von Mangoldt function including proper prime powers. The
cutoffs, C3 profile and coefficients are those of
[global-smooth-majorant.md (1)--(3)](global-smooth-majorant.md):
(a_L, b_L, W_L) = (floor(x^.22), floor(x^.24), floor(x^.24)),
(a_R, b_R, W_R) = (floor(x^.04), floor(x^.05), floor(x^.05)),
F_hat_i(m) = sum_{d|m} mu(d) rho_hat_i(d), and

\[
 \widehat{\mathcal R}(x)=\sum_{n\in J}\widehat G_L(n)\widehat G_R(n-2),
 \qquad S(x)=C_2x+\widehat{\mathcal R}(x)+O_A(x/T^A).
                                                               \tag{2.1}
\]

Two exact identities from the corpus are used as inputs. First, from
[joint-correction-source-audit.md (1)--(3)](joint-correction-source-audit.md),
with a_i(d) = mu(d) rho_hat_i(d) supported on d <= W_i and
b_i(e) = -a_i(e) log e - sum_{dq=e, q<=W_i} a_i(d) Lambda(q) supported on
e <= W_i^2, the short approximant P_i(t) = (log t) sum_{d|t} a_i(d)
+ sum_{e|t} b_i(e) satisfies, for every integer t > W_i,

\[
 \widehat G_i(t)=\Lambda(t)-P_i(t).                            \tag{2.2}
\]

This holds at primes, at proper prime powers and at composites. Second,
from [global-factor-signs.md (4)](global-factor-signs.md), for n = m r with
r prime, r > W_L, and every prime factor of m at most W_L,

\[
 \widehat G_L(mr)=-\widehat F_L(m)\log r-E_L(mr),                 \tag{2.3}
\]

where E_L is supported on inputs divisible by some p^k > W_L with
p <= W_L, and the full shifted effect of E_L is O_eps(x^(39/40+eps)).

**The family.** Fix delta with 0 < delta < 1/50. Put

\[
 \mathcal M_\delta=\{m:1<m\le x^{1/2},\ P^-(m)>x^\delta,\ P^+(m)\le W_L\},
 \qquad c(m)=\mathbf 1_{\mathcal M_\delta}(m)\widehat F_L(m),
                                                               \tag{2.4}
\]
\[
 \mathcal F=\{mr:\ m\in\mathcal M_\delta,\ r\ \text{prime},\ x/2<mr\le x\}.
                                                               \tag{2.5}
\]

Every m in M_delta is odd and has at most 1/delta prime factors with
multiplicity, so |c(m)| <= 2^(1/delta). For n in F the prime r exceeds
x^(1/2)/2 > W_L and is the unique prime factor of n above W_L, so each n
has exactly one representation. This is the support of
[supported-coefficient-dickman.md (2)](supported-coefficient-dickman.md)
with every right partner admitted; nothing about the partner is assumed.

**The partition, written before any estimate:**

\[
 \widehat{\mathcal R}=R_{\mathcal F}+R_{\rm comp},\qquad
 R_{\mathcal F}=\sum_{n\in\mathcal F}\widehat G_L(n)\widehat G_R(n-2),\quad
 R_{\rm comp}=\sum_{n\in J\setminus\mathcal F}\widehat G_L(n)\widehat G_R(n-2).
                                                               \tag{2.6}
\]

Define the harmonic weights and the signed prime-partner sum

\[
 H_\delta(x)=\sum_{m\in\mathcal M_\delta}\frac{c(m)}m,\quad
 H_\delta^\pm(x)=\sum_{m}\frac{(c(m))_\pm}m,\qquad
 Z^p_{\mathcal F}(x)=\sum_{m\in\mathcal M_\delta}c(m)
   \sum_{\substack{x/2<mr\le x\\ r\ {\rm prime}}}(\log r)\Lambda(mr-2).
                                                               \tag{2.7}
\]

The harmonic limit is H_delta -> D(25/12)-1+E_delta. The Dickman
note proves 0<=E_delta<=(b/delta)D(a/delta), with a=11/50,b=6/25;
its printed bound 24/22! is specialized to delta=1/100 and cannot be
imported unchanged for every delta<1/50. To cover this note's range,
put v=a/delta>11. The identity vD(v)=int_(v-1)^v D(t)dt makes vD(v)
decreasing, since D is nonnegative and decreasing. Thus

    E_delta <= (b/a)11D(11) = 12D(11) <= 12/11! < 1/1000.

The last inequality uses D(n)<=1/n!, obtained inductively from the same
integral identity. In particular -1<H_delta<=-log 2+12/11! and
1+H_delta<31/100. At delta=1/100 the sharper 24/22! bound remains
available. Also H_delta^+ >= sum over the three-prime family M_3 of
1/m -> I_3>4/25 ([paired-factor-budget.md (14)](paired-factor-budget.md));
M_3 lies in M_delta with c=+1 for every delta<1/50. The uniform numerical
implications are checked with exact rational bounds in
research-round-validation.js; these harmonic limits are asymptotic.

## 3. Prior work and source hypothesis matrix

Read before calculation: the five lane notes, the switching note and its
validator, the Chen audit, and the OUTCOMES/QUESTIONS entries for their
ids. The relevant closures were checked at their decisive inequalities:
the negative-only target fails because liminf N_hat/(C2 x) > 3/2
([switching-negative-mass.md (13)](switching-negative-mass.md)); the
two-family pair fails because liminf (N_2 - P_3)/(C2 x) > 11/10
([paired-factor-budget.md (15)](paired-factor-budget.md)); the separate-sign
bound for the rough-partner family has constant K_delta < -80/9
([supported-coefficient-dickman.md (12)](supported-coefficient-dickman.md));
and full algebraic completion of the joint correction returns S
([joint-correction-source-audit.md (10)](joint-correction-source-audit.md)).
All four inequalities were re-read and are used at their stated scope. In
particular the Dickman note bounds the rough-partner sum by the linear
sieve on both sides and subtracts an upper bound for prime partners. The
changed input here removes the roughness sieve entirely: the partner enters
through (2.2) as Lambda(n-2) - P_R(n-2), and P_R is a linear divisor weight
of support x^(1/10). The accepted calculation this avoids repeating is the
pair of sieve bounds (10) of the Dickman note with constants 10 log 3 and
40/3 and the rough-partner enclosure of the paired note; H_delta is reused.

Correction after the second reader (2026-09-08). The first version applied
Pan--Ding to every odd modulus of P_R. Wu's Lemma 2.3 carries the weight
mu(q)^2 3^nu(q) in its modulus sum and so covers squarefree moduli only;
the b_R moduli e = d p^k are not squarefree when p | d or k >= 2, and
V2 measured sum_{e odd, non-squarefree} |b_R(e)|/e at about 0.30 log W for
W = 10^3..10^5, so their trivial error is O(x T^2). The main term at those
moduli was never in question; their error term is now paid by ordinary
prime BV on each cofactor interval, which has no squarefree restriction.

| Source, version, locator | Statement used | Hypotheses and how each is discharged | Unmatched |
|---|---|---|---|
| [Tao, 254A Notes 3, Theorem 17](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/), read 2026-09-08 from the page source with LaTeX decoded: "Let x >= 2. Then one has sum_{q <= Q} sup_{a in (Z/qZ)^x} \|Delta(Lambda 1_{[1,x]}; a (q))\| <<_A x log^{-A} x (31) for any A > 0, provided that Q <= x^{1/2} log^{-B} x for some sufficiently large B = B(A)" | terminal-point prime BV, all moduli, sup over reduced classes; Delta(f; a (q)) = sum_{n = a (q)} f(n) - phi(q)^{-1} sum_{(n,q)=1} f(n) | applied at y = x/m and y = x/(2m), both >= x^(1/2)/2, for each m in M_delta; Q = W_R^2 <= x^(1/10) <= y^(1/2) log^(-B) y eventually, uniformly in m; the class 2 m^(-1) mod e is reduced for odd e coprime to m; Lambda to primes costs O(Q sqrt(y) log y); the comparison term is replaced by y/phi(q) via the PNT with classical error (Tao Notes 2, Corollary 39) and sum_{q<=Q} 1/phi(q) << log Q | none for the Type I part. The theorem says nothing about Z_F^p |
| Pan--Ding via [Wu, Acta Arith. 114 (2004), Lemma 2.3, first estimate](https://www.impan.pl/shop/en/publication/transaction/download/product/82961), published PDF SHA-256 ebe75ef3...b30 (custody in paired-factor-budget section 7); V2 reread pp. 220--221: the modulus sum carries mu(q)^2 3^nu(q) | aggregate level x^(9/20) for squarefree moduli; used only through [paired-factor-budget.md (8), (12)](paired-factor-budget.md) for the prime-partner upper sieve constant 40/9 | squarefree moduli, as the linear sieve requires; bounded c_+(m) | not applicable to the non-squarefree b_R moduli; reference only for the Type I part |
| [joint-correction-source-audit.md (1)--(3)](joint-correction-source-audit.md), derived from [global-cutoff-averaging.md (7)](global-cutoff-averaging.md) | (2.2), exact | t > W_R: n - 2 > x/2 - 2 > W_R eventually | none |
| [global-factor-signs.md (4), (6)--(7)](global-factor-signs.md) | (2.3) and the O_eps(x^(39/40+eps)) exceptional budget | irregular n are those with p^k > W_L, p <= W_L; \|E_L\|, \|G_R\| <= tau log; union bound | none |
| [Tao, 254A Notes 2, Exercise 41](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/), read 2026-09-08 from the page source with LaTeX decoded: "sum_{n <= x} mu(n) = O(x exp(-c_2 sqrt(log x))) ... for all x >= 2 and some c_2 > 0", following Corollary 39 (prime number theorem with classical error term) | Landau's bound; by partial summation M_1(Z) := sum_{i<=Z} mu(i)/i << exp(-c sqrt(log Z)) for Z >= 2 | stated as an exercise with hints from the zero-free region of Corollary 39; classical (Landau). Not reproved here | none; this is a stated exercise, flagged for the reader |
| [Tao, 254A Notes 1](https://terrytao.wordpress.com/2014/11/23/254a-notes-1-elementary-multiplicative-number-theory/), Mertens (retained in the corpus) | sum_{n<=Z} Lambda(n)/n = log Z + O(1); sum_{q<=W} Lambda(q)/phi(q) << log W | elementary | none |
| [paired-factor-budget.md (12)](paired-factor-budget.md), upper linear sieve at level x^(9/20), z = x^(9/40), F(2) = e^gamma, applied to nonnegative parts | T B^p_pm <= (40/9 + o(1)) C2 x H_delta^pm | nonnegative measure, dimension one, level from the Pan--Ding transfer | none |
| [Ford--Maynard, arXiv:2407.14368v1, section 4.6](https://arxiv.org/html/2407.14368v1#S4.SS6), audited in joint-correction-source-audit section 1 | motivates an interface search only | not applied | its Type II class is not supplied for Lambda(n-2) against c(m) 1_prime(r) |

The owning wording for this mechanism is Vaughan's identity main term,
level of distribution of a smooth-times-prime sequence (Pan--Ding), and
the twin singular series as a twisted Mobius mean. No search in those
terms is claimed to be exhaustive. The centered form (4.5) below is the
same object as the centered discrepancy of
[moving-cutoff-parity.md](moving-cutoff-parity.md) and Tao's delta_x
normalisation in [consumer-comparison.md](consumer-comparison.md),
restricted to the family; it is not a new object.

## 4. Derivation

### 4.1 Exact family formula

For n = m r in F, (2.2) and (2.3) give, with no approximation,

\[
 \widehat G_L(n)\widehat G_R(n-2)
 =\bigl[-c(m)\log r-E_L(n)\bigr]\bigl[\Lambda(n-2)-P_R(n-2)\bigr].
                                                               \tag{4.1}
\]

The E_L term is supported on irregular n. Its total over F is at most the
global exceptional budget: the number of irregular n <= x is
O(x W_L^(-1/2)) and each product is O_eps(x^eps), giving
O_eps(x^(22/25+eps)), inside O_eps(x^(39/40+eps)). Hence

\[
 R_{\mathcal F}=-Z^p_{\mathcal F}+
 \sum_{m\in\mathcal M_\delta}c(m)\sum_{\substack{x/2<mr\le x\\ r\ {\rm prime}}}
 (\log r)P_R(mr-2)+O_\epsilon(x^{39/40+\epsilon}).                \tag{4.2}
\]

The prime partner is inside Z_F^p, with prime powers; the difference from
the Dickman note's B^p_c (primes only) is O(sqrt(x) T^3) by uniqueness of
representation. The finite validator checks (4.1) and its sum by two
independent orderings on 8131 family members at N = 12000, including 847
prime partners, 18 prime-power partners, 6369 nonrough partners and 357
irregular left inputs.

### 4.2 The Type I part by ordinary prime Bombieri--Vinogradov

Write P_R(h) = (log h) sum_{d|h} a_R(d) + sum_{e|h} b_R(e). Since m and r
are odd, h = mr - 2 is odd and even d, e never divide it; the divisor sums
are over odd d <= W_R and odd e <= W_R^2. For odd e sharing a prime with m
there is no r with e | mr - 2: both the count and the main term are zero,
and no theorem is needed there. For odd e coprime to m the condition is
the class r = 2 m^(-1) mod e, which is reduced because (2m, e) = 1.

Fix m in M_delta and put Y = x/m >= x^(1/2). The inner sums run over
primes r in (Y/2, Y] with weight log r. The import is Theorem 17 of Tao's
Notes 3, quoted in section 3, applied at the two prefixes y = Y and
y = Y/2. Its hypotheses: y >= 2; Q <= y^(1/2) log^(-B) y, satisfied by
Q = W_R^2 <= x^(1/10) <= (Y/2)^(1/2) log^(-B)(Y/2) for every B once x is large, uniformly in m (margin x^(3/20)/sqrt 2 against the logarithm); sup over reduced classes, which the class 2 m^(-1) is. Two
conversions, both as in [switching-negative-mass.md section 3](switching-negative-mass.md):
the prime powers p^k <= y with k >= 2 number O(sqrt y), carry weight at
most log y and lie in one class per modulus, so their total over q <= Q is
O(Q sqrt(y) log y) = O(y x^(-3/20) log y); and the comparison term
phi(q)^(-1) sum_{n<=y,(n,q)=1} Lambda(n) equals y/phi(q) up to
O((y exp(-c sqrt(log y)) + log q log y)/phi(q)) by the PNT with classical
error, which after sum_{q<=Q} 1/phi(q) << log Q is O(y T^(-A)). Hence, for
every fixed A and uniformly in m in M_delta,

\[
 \sum_{\substack{e\le W_R^2,\ e\ {\rm odd}\\(e,m)=1}}
 \ \sup_{(a,e)=1}\Bigl|\sum_{\substack{Y/2<r\le Y\\ r\ {\rm prime},\ r\equiv a\,(e)}}\log r
   -\frac{Y}{2\varphi(e)}\Bigr|\ll_A Y\,T^{-A}.                  \tag{4.2a}
\]

This is the two-prefix form used in the switching note's (8), at the
present moduli and without a squarefree restriction, which the
Bombieri--Vinogradov theorem does not impose.

*b-part.* With |b_R(e)| <= 2 log e <= T, (4.2a) gives
sum_e b_R(e) sum_r (log r) 1_{e | mr-2} = (Y/2) B_m + O_A(Y T^(1-A)), with
B_m defined in (4.3b).

*a-part.* The weight is (log r) log(mr - 2). Partition (Y/2, Y] into
K = ceil(T^2) intervals I_j = (y_j, y_{j+1}] of equal logarithmic length.
On I_j, log(mr - 2) = l_j + O(T^(-2)) with l_j = log(m y_j - 2), since
the derivative of log(mt - 2) in t is at most 2/t there. So

\[
 \sum_{\substack{r\in I_j\\ r\equiv a\,(d)}}(\log r)\log(mr-2)
 =l_j\Bigl[\theta(y_{j+1};d,a)-\theta(y_j;d,a)\Bigr]
   +O\Bigl(T^{-2}\sum_{\substack{r\in I_j\\ r\equiv a\,(d)}}\log r\Bigr),
                                                               \tag{4.2b}
\]

with theta the prime-weighted prefix count. Applying (4.2a) in its
single-prefix form at each of the K + 1 points y_j, each at least Y/2,
with l_j <= 2T, costs O(K T Y T^(-A)) = O(Y T^(3-A)) after summing over
d <= W_R with |a_R(d)| <= 1. The O(T^(-2)) term costs
O(T^(-2) sum_{d<=W_R} (Y/(2 phi(d)) + err_d)) = O(Y T^(-2) log W_R)
= O(Y/T), using (4.2a) once more for the err_d. The main term
sum_j l_j (y_{j+1} - y_j)/phi(d) equals phi(d)^(-1) int_{Y/2}^{Y}
log(mt - 2) dt + O(Y T^(-2)). Altogether, for every fixed A and
uniformly in m in M_delta,

\[
 \sum_{r}(\log r)P_R(mr-2)
 =\frac1m\int_{x/2}^{x}\Bigl[\log(t-2)\,\mathsf A_m+\mathsf B_m\Bigr]dt+O(Y/T),
                                                               \tag{4.3a}
\]
\[
 \mathsf A_m=\sum_{\substack{d\le W_R,\ d\ {\rm odd}\\(d,m)=1}}\frac{a_R(d)}{\varphi(d)},
 \qquad
 \mathsf B_m=\sum_{\substack{e\le W_R^2,\ e\ {\rm odd}\\(e,m)=1}}\frac{b_R(e)}{\varphi(e)}.
                                                               \tag{4.3b}
\]

The error O(Y/T) is where the a-part's subinterval approximation lands;
it is o(Y) and, after multiplication by c(m) and summation, o_delta(x),
because sum_{m in M_delta} |c(m)|/m = O_delta(1) and the implied constants
in (4.2a) depend only on A. Pan--Ding is not used anywhere in this
evaluation; the cofactor intervals are long enough for ordinary BV because
every m in M_delta is at most x^(1/2).

The coprimality to m is a negligible perturbation: dropping it changes
A_m and B_m by at most sum_{p|m} (p-1)^(-1) sum_{e' <= W_R^2} T/phi(e')
<< delta^(-1) x^(-delta) T^2 = o(1/T), since m has at most 1/delta prime
factors, all above x^delta. Write A, B for the unrestricted odd sums.

**Lemma (twisted Mobius constant).** With rho_hat = rho_hat_R,
T A = o(1) and B = 2 C2 + o(1) as x tends to infinity.

*Proof.* Put S(D) = sum_{d <= D, d odd} mu(d)/phi(d) and, for Q >= 1,
M_1^Q(Z) = sum_{i <= Z, (i,Q)=1} mu(i)/i. The identity
mu(i) 1_{(i,Q)=1} = (mu * 1_{Q^infty})(i), where 1_{Q^infty} is the
indicator of integers all of whose prime factors divide Q, gives
M_1^Q(Z) = sum_{l | Q^infty, l <= Z} M_1(Z/l)/l. Landau's bound for M_1
on l <= sqrt Z and the trivial bound |M_1| <= 1 on l > sqrt Z give

\[
 M_1^Q(Z)\ll\frac{Q}{\varphi(Q)}\exp(-c'\sqrt{\log Z})
   +Z^{-1/4}\prod_{p\mid Q}(1-p^{-3/4})^{-1}.                 \tag{4.3c}
\]

Using 1/phi(d) = d^(-1) sum_{k|d} mu^2(k)/phi(k),

\[
 S(D)=\sum_{k\ {\rm odd\ squarefree}}\frac{\mu(k)}{k\varphi(k)}
       M_1^{2k}(D/k),                                          \tag{4.3d}
\]

and splitting at k <= sqrt D gives S(D) << exp(-c'' sqrt(log D)) +
D^(-1/2) log D, because sum_k (k phi(k))^(-1) (2k/phi(k))
prod_{p|2k}(1-p^(-3/4))^(-1) converges. Since rho_hat = 1 below a_R and
0 above b_R, partial summation gives A = -int_{a_R}^{b_R} S(u) d rho_hat(u);
the boundary terms vanish because rho_hat(b_R) = 0 and S vanishes below
d = 1. The total variation of rho_hat is one, so
|A| <= sup_{u >= a_R} |S(u)| << exp(-c'' sqrt(log a_R)), which is O(T^(-A))
for every A; so T A = o(1).

For B, the first part -sum_d a_R(d) log d/phi(d) equals
-(log b_R) A + sum_{d odd} mu(d) rho_hat(d) log(b_R/d)/phi(d). The last sum
differs from sum_{d <= b_R, odd} mu(d) log(b_R/d)/phi(d) by
int_{a_R}^{b_R} S d[(1 - rho_hat) log(b_R/u)], which is O(T^(1-A)). By
(4.3d) with the log weight,

\[
 \sum_{\substack{d\le D\\ d\ {\rm odd}}}\frac{\mu(d)\log(D/d)}{\varphi(d)}
 =\sum_{k}\frac{\mu(k)}{k\varphi(k)}
   \sum_{\substack{j\le D/k\\(j,2k)=1}}\frac{\mu(j)\log(D/(kj))}{j},
 \qquad
 \sum_{\substack{j\le Y\\(j,Q)=1}}\frac{\mu(j)\log(Y/j)}{j}
 =\sum_{l\mid Q^\infty,\ l\le Y}\frac{M_2(Y/l)}{l},               \tag{4.3e}
\]

with M_2(Z) = sum_{i <= Z} mu(i) log(Z/i)/i = int_1^Z M_1(u) du/u. By
Landau's bound M_2 converges to a limit kappa and is bounded. The value
kappa = 1 follows without a contour: with M_3(Z) = sum_{i<=Z} mu(i)
log^2(Z/i)/i one has d M_3/d(log Z) = 2 M_2, so M_3(Z) = 2 kappa log Z +
o(log Z); and the Dirichlet convolution mu * log = Lambda with
sum_{k<=Y} (log k)/k = (1/2) log^2 Y + O(1) and Mertens
sum_{n<=Z} Lambda(n)/n = log Z + O(1) gives M_3(Z) = 2 log Z + O(1).
Hence kappa = 1. The inner sum in (4.3e) therefore tends to
sum_{l | Q^infty} 1/l = Q/phi(Q) as Y tends to infinity, and is bounded by
(Q/phi(Q)) sup |M_2| uniformly. Dominated convergence in k, with the
absolutely convergent majorant sum_k 2 mu^2(k)/phi(k)^2, gives

\[
 \lim_{D\to\infty}\sum_{\substack{d\le D\\ d\ {\rm odd}}}
   \frac{\mu(d)\log(D/d)}{\varphi(d)}
 =\sum_{k\ {\rm odd\ squarefree}}\frac{2\mu(k)}{\varphi(k)^2}
 =2\prod_{p>2}\Bigl(1-\frac1{(p-1)^2}\Bigr)=2C_2.               \tag{4.3f}
\]

The second part of B is -sum_{d,q} a_R(d) Lambda(q)/phi(dq) over odd
dq with q <= W_R. For q coprime to d, phi(dq) = phi(d) phi(q); for
q = p^k with p | d, phi(dq) = phi(d) p^k. So this part equals
-Q_1 A + sum_d mu(d) rho_hat(d) w(d)/phi(d), where
Q_1 = sum_{q <= W_R, odd} Lambda(q)/phi(q) << T and
0 <= w(d) <= sum_{p|d} (log p)/(p-1)^2. The first term is O(T^(1-A)).
Exchanging the order, the second is a sum over odd primes p <= W_R of
(log p)(p-1)^(-2) times a sum of the form (4.3d) with the cutoff
rho_hat(p d'), coprime to p; for p <= a_R^(1/2) it is O(T^(-A)) by the
same argument, and the tail p > a_R^(1/2) contributes O(a_R^(-1/2) T).
Therefore B = 2 C2 + o(1). This proves the lemma.

The finite validator reports the partial sums of (4.3f) at
D = 10^4, 10^5, 10^6 equal to 1.3203 against 2 C2 = 1.3203 to four
decimals, the untwisted sum at 1.0000, and S(D) at most 3 x 10^(-3) in
absolute value on that range. These are measurements of a finite trend,
not the proof, which is the argument above.

Inserting the lemma into (4.3a), with the interval length x/2,
sum_m |c(m)|/m = O_delta(1), and log(t-2) = T + O(1),

\[
 \sum_{m}c(m)\sum_{r}(\log r)P_R(mr-2)=C_2x\,H_\delta(x)+o_\delta(x).
                                                               \tag{4.3}
\]

### 4.3 The family identity and its centered form

Equations (4.2) and (4.3) give the derived identity

\[
 \boxed{R_{\mathcal F}(x)=C_2x\,H_\delta(x)-Z^p_{\mathcal F}(x)+o_\delta(x).}
                                                               \tag{4.4}
\]

Since sum_{n in F} G_hat_L(n) = -(x/2) H_delta(x) + o(x) by (2.3) and the
prime number theorem on each cofactor interval, (4.4) reads

\[
 R_{\mathcal F}(x)=\sum_{n\in\mathcal F}\widehat G_L(n)\bigl[\Lambda(n-2)-2C_2\bigr]
                   +o_\delta(x).                               \tag{4.5}
\]

The family residual is the correlation of the left coefficient on the
family with the centered twisted sequence Lambda(n-2) - 2 C2. The same
argument applies to any subfamily of J whose left weight is distributed in
progressions to moduli x^(1/10) and whose members have no prime factor
below x^delta; only the per-cofactor BV step is specific to F: it needs each
cofactor interval to be a fixed power of x long with the moduli x^(1/10)
below its square root, which m <= x^(1/2) supplies.

**The complement.** For every n in J, n - 2 > W_R, so (2.2) gives exactly
R_hat = sum_n G_hat_L(n)[Lambda(n-2) - P_R(n-2)]. The audit's (5)--(9) with
prime BV and the CRT count evaluate sum_n G_hat_L(n) P_R(n-2) = R_0 - J_0
+ o(x) = C2 x - L_0 + o(x), and the lemma applied to the left profile with
prime BV at support x^(12/25) gives L_0 = C2 x + o(x). Hence

\[
 \widehat{\mathcal R}=\mathcal B_L+o(x),\qquad
 \mathcal B_L=\sum_{n\in J}\widehat G_L(n)\Lambda(n-2),
                                                               \tag{4.6a}
\]

which is the audit's (12) at o(x) precision. That statement was derived
there from the uniform first reduction of global-cutoff-averaging, not from
the lemma. The two routes agree only if the twisted constant is 2 C2: with
a constant Theta in its place, (4.6a) would read R_hat = B_L + C2 x -
Theta x/2 + o(x). So the audit's (12) is an independent check of the
lemma's constant, in addition to the finite trend. Subtracting (4.4),

\[
 R_{\rm comp}=\mathcal B_L^{\rm comp}-C_2x\,H_\delta(x)+o_\delta(x),\qquad
 \mathcal B_L^{\rm comp}=\sum_{n\in J\setminus\mathcal F}\widehat G_L(n)\Lambda(n-2).
                                                               \tag{4.6}
\]

The Type I parts of family and complement are +C2 x H_delta and
-C2 x H_delta. Grouping by factor configuration moves Type I mass between
the two parts and leaves C2 x + R_hat = C2 x + B_L^F + B_L^comp + o(x)
with B_L^F = -Z_F^p. This is the exact form of the audit's conclusion that
completion returns the open remainder, now with the family's share
identified: the entire signed content of any such family is its twisted
prime correlation.

### 4.4 The failed inequality

Split c = c_+ - c_- and Z_F^p accordingly; both parts are nonnegative.
The upper linear sieve of [paired-factor-budget.md (12)](paired-factor-budget.md)
applied to the nonnegative measure with coefficient c_+(m) log r gives
Z^p_{c_+} <= (40/9 + o(1)) C2 x H_delta^+, and Z^p_{c_-} >= 0. This is the
one place where Pan--Ding enters: the sieve level x^(9/20) comes from
[paired-factor-budget.md (8)](paired-factor-budget.md), on squarefree
moduli as the linear sieve requires. With ordinary BV per cofactor at
level x^(1/4) the constant would be 8 in place of 40/9 and (4.8) below
fails by more. Hence

\[
 C_2x+R_{\mathcal F}\ \ge\ C_2x\Bigl[1+H_\delta-\tfrac{40}{9}H_\delta^+\Bigr]-o_\delta(x).
                                                               \tag{4.7}
\]

With 1 + H_delta <= 1 - log 2 + 12/11! < 31/100 and
(40/9) H_delta^+ >= (40/9)(4/25) = 32/45,

\[
 1+H_\delta-\tfrac{40}{9}H_\delta^+<\tfrac{31}{100}-\tfrac{32}{45}<-\tfrac25.
                                                               \tag{4.8}
\]

The validator certifies (4.8) with rational arithmetic, using
log 2 > 693/1000 from the positive series and 24 < 22!/1000. This is an
INSUFFICIENT BOUND: the right side of (4.7) is negative, so the family
alone, even with its complement ignored, does not give positivity. It is
not an upper bound on R_F and says nothing about the sign of the actual
family residual. Compared with the Dickman note's constant K_delta < -80/9
for the rough-partner subfamily, the deficit is smaller because the linear
part is evaluated rather than sieved; it remains a deficit.

Replacing 40/9 by a hypothetical constant kappa, (4.7) is positive only if
kappa H_delta^+ < 1 + H_delta. At kappa = 2 this is H_delta^+ + H_delta^- < 1.
The linear sieve's upper-bound function gives at best the factor 2/theta
against the Hardy--Littlewood prediction at level theta <= 1, so kappa = 2
is the constant a level-one nonnegative sieve would give; with
H_delta^+ >= 4/25 alone, 2 H_delta^+ >= 8/25 > 31/100 > 1 + H_delta, so
even that constant fails here, and it would in any case leave (4.6)
unpaid. This is a statement about nonnegative sieve constants applied to
the two signed parts separately, not a universal obstruction.

**Exact unfilled hypothesis.** A sufficient family input would be, for
some fixed eta > 0 on unbounded dyadic scales,

\[
 Z^p_{\mathcal F}(x)\le(1+H_\delta-\eta)\,C_2x,                  \tag{4.9}
\]

together with, for example,
B_L^comp >= (H_delta-eta+kappa) C2 x+o(x), where 0<kappa<eta is
fixed on the same scales. Equations (4.4) and (4.6) then give
S>=kappa C2 x+o(x). The family inequality alone leaves this complement
unpaid. Inequality (4.9) requires the
prime-partner counts weighted by c_+ and c_- to cancel against each other,
that is, an estimate of the signed bilinear sum
sum_m c(m) sum_r (log r) Lambda(mr - 2) beyond the bound obtained by
bounding each sign separately. Under Hardy--Littlewood each inner sum
is 2 C2 x/(2m) prod_{p|m} (p-1)/(p-2) + o(x/m), giving Z_F^p = C2 x
H_delta + o(x) and R_F = o(x); (4.9) would then hold with room. No stated
theorem supplies (4.9). It is a Type II statement for the twisted sequence
Lambda(n-2) against the coefficient c(m) 1_prime(r) log r with m <= x^(1/2);
the Ford--Maynard Type II class and the Friedlander--Iwaniec bilinear
condition (B) are its nearest named forms, both recorded as unsupplied in
the joint-correction audit.

## 5. Validation, falsifiers and outcome

[joint-factor-estimate-validation.js](joint-factor-estimate-validation.js)
uses formal prime-log vectors with a doubled profile so that every
coefficient is an integer. Section A verifies (2.2) for every h in
(W_R, 12000] and the family identity (4.1)--(4.2) by two orderings on
8131 members for two left profiles, retaining irregular inputs, prime and
prime-power partners and every nonrough partner. Section B verifies the
two-small-prime witnesses (c = -1, 54 values of m), the three-small-prime
witnesses (c = +1, 4 values), the sign rule sign(F_L(m)) sign(F_R(t)) on
regular inputs with rough, nonrough, prime, smooth and prime-power
partners, and the ten-prime cell F = -84 by subset enumeration and by an
ordered divisor construction. Section C certifies (4.8) and the kappa = 2
statement in exact rationals. Section D is a floating measurement of
(4.3f) and of S(D). Elapsed 0.8 s on one core; no enumeration allocation.

Decisive falsifiers: a value of h > W_R with G_hat_R(h) different from
Lambda(h) - P_R(h); a family member where the direct convolution and the
factorised formula disagree; a witness with the wrong coefficient; a
partial sum of (4.3f) drifting away from 2 C2 at larger D; a rational
comparison in (4.8) failing. None occurred. What the finite checks cannot
establish: the prime BV transfer at all moduli, the Landau bound, the o(1) rates in the
lemma, or any asymptotic sign. Those are the written argument of section 4;
the lemma's contour-free identification kappa = 1, the uniformity in Q
of (4.3c), and the a-part subinterval argument (4.2b) are the steps a
reader should test first. The algebra checked by the validator is
unchanged by the 2026-09-08 correction, so it was not re-embedded.

## 6. Payoff for the full consumer

None. C2 x + R_hat = C2 x + B_L^F + B_L^comp + o(x), and neither term is
bounded below by an available theorem. The regional statement retained is
(4.4)--(4.5): the residual of a distributed rough family equals its
centered twisted prime correlation, and its Type I part is exactly
compensated in the complement. The conditional statement retained is
(4.9) plus a complement bound. The failed statement is (4.7)--(4.8). No
effective onset, probability or completion estimate follows.

## 7. Files, commands, data and proposed record updates

Files: research/joint-factor-estimate.md (this note);
research/joint-factor-estimate-validation.js (embedded with
`node research/qc/embed.js research/joint-factor-estimate-validation.js`).
No data-reuse file is retained. Compute: 0.8 s wall, one core, no
enumeration. Source page fetched: Tao 254A Notes 2 (HTML source, LaTeX
decoded), cached in the round scratch directory, not durable evidence.

Proposed record updates: applied by the handler on 2026-09-08 to
[OUTCOMES.md](OUTCOMES.md) (entry "Joint factor family"), TODO item C's
ledger line, [history/CHANGELOG.md](history/CHANGELOG.md) and the
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md) section 1 table; the
handler's review is [research-round-validation.md](research-round-validation.md)
section 9. Correction owed to those records after V2 (2026-09-08): the
OUTCOMES grade line should read "DERIVED from ordinary prime
Bombieri--Vinogradov per cofactor interval, Landau's Mobius bound and
Mertens" in place of a Pan--Ding derivation for the Type I part, and
record that Wu Lemma 2.3 is squarefree-only; the failed inequality and
the reuse condition are unchanged.

## 8. Next move or reopening condition

The separate-sign upper sieve (4.7)–(4.8) is insufficient at these
cutoffs, and merely evaluating further Type I masses cannot close the
consumer because those masses cancel in (4.6). This does not exclude a
useful signed estimate for a factor family. Reopen with a bound for the
actual c(m)-weighted Z_F^p, or its centered correlation, at a rate and
constant that pay (4.9) together with its complement. A generic o(x)
bound for all bounded coefficients without subtracting a main term is
not an appropriate target: positive coefficients need not cancel.
A changed consumer or a correctness concern is also a reason to reopen.

History: research/history/CHANGELOG.md.
