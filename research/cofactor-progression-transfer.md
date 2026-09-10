# A signed transfer for a growing range of small cofactors

<!-- ledger
id: Q-cofactor-progression-transfer
status: PARTIAL
todo: C
parity: The signed estimate imports Tao-Teravainen v2 Theorem 3.1(ii) and the quantitative Liouville non-pretentiousness input in MRT (1.12). Modified Euler factors and exact CRT progressions retain both Mobius signs, divisibility and non-squarefree inputs. Absolute values are taken after the imported signed correlation estimate, not substituted for it. No complete-corner estimate or sufficient twin margin is obtained.
question: Can the corrected full-cofactor kernel be estimated on a growing cofactor range by representing its actual arithmetic on CRT progressions, and does the resulting bound reach the twin consumer?
verdict: Derived from named imports: for some positive absolute kappa and d, all prime-r cofactor pairs s,t <= floor((log x)^kappa), including non-squarefree inputs and mixed transition/smoothed profiles, admit a dyadic scale-average O(log^(2-d) X) bound after division by x. The extension uses bounded multiplicative Euler modifications on the progression s|n, t|n-2 and keeps its density 1/lcm(s,t), so summing cofactors costs only O((log log X)^2). This goes beyond s=t=1 but remains short of o(x). The large-cofactor joint remainder, outside residual and twin margin remain OPEN; the attempted extension to power-sized cofactors fails on source modulus range and accumulated logarithmic cost.
-->

**The sufficient twin-prime margin remains OPEN.** This attempt obtains a
signed estimate for a larger subfamily of the corner, importing a theorem
from the primary preprint cited below. It does not estimate the whole corner or claim novelty
in the literature. The derivation below, its finite falsifiers and the
failed extension are the outcome; a new representation alone would not
have supplied an estimate.

Starting checkout: `8edecf0`, clean. Read before this attempt:
[the corrected review](transition-round-audit.md), the transition reports,
[prime-band-transfer.md](prime-band-transfer.md), the relevant question and
outcome entries, and the owning sharp and smoothed coefficient arguments.
The earlier transfer covers the prime-cofactor case s=t=1. This attempt
retains additional cofactor divisibility instead of treating mu(n/s) as
mu(n) or applying a theorem directly to a nonmultiplicative convolution.

## 1. The estimate and its scope

Let x=2N, J_x=(N,2N], and fix 0<eta<1/400. All floor cutoffs are those
of [transition-signed-estimate.md](transition-signed-estimate.md):
w_L=6/25, w_R=1/20, W_i=floor(x^w_i),
D_i=max(W_i,floor(x^(1-w_i-2eta))),
z_i=floor(x^(1-w_i-eta)), L_i=log(z_i/D_i).
Here rho_i(u) is 1 for u<=D_i, log(z_i/u)/L_i for D_i<u<z_i,
and 0 for u>=z_i.
Use any of these three real-argument profiles:

\[
 v_i(u)=1_{u>D_i},\qquad
 v_i(u)=\tau_i(u)=\rho_i(u)1_{D_i<u<z_i},\qquad
 v_i(u)=h_i(u)=1-\rho_i(u).
\]

The exact upper divisor cutoff is redundant, as in the owning notes.
For an integer H>=1 define the prime-r coefficient restricted by the
remaining cofactor s:

\[
 A_{i,H}^{v}(m)=
 \sum_{\substack{spd=m\\p>W_i\ {\rm prime}\\s\le H}}
       \mu(d)\log p\,v_i(d).                              \tag{1}
\]

This is an actual subfamily, with multiplicity, of the full coefficient.
The input m need not be squarefree; no coprimality with s is assumed.
For the sharp profile write C_(i,H); for transition and smooth profiles
write T_(i,H) and Ctilde_(i,H). Pointwise C_(i,H)=T_(i,H)+Ctilde_(i,H).
Thus estimating the sharp product already estimates the **joint sum** of
its four restricted transition pieces.

**Derived transfer, using the imports in section 3.** There exist positive
absolute kappa,d such that, with H(x)=floor((log x)^kappa), for any fixed
choice of the two profiles above,

\[
 \frac1{\log X}\sum_{\sqrt X\le 2^j\le X}
 \frac{\left|\sum_{2^j<n\le2^{j+1}}
       A_{L,H(2^{j+1})}^{v}(n)
       A_{R,H(2^{j+1})}^{v'}(n-2)\right|}
      {2^j(\log X)^2}
 \ll_\eta (\log X)^{-d}.                                \tag{2}
\]

Each coefficient uses the exact cutoffs at x=2^(j+1). The result is an
average over dyadic scales, not a bound at every scale. Section 6 permits
kappa=c/4 and d=c/8 for a sufficiently small absolute c inherited from
the source; no numerical value or effective onset is extracted here.
The available bound after dividing the inner sum by N is still
O_eta(log^(2-d) X), not o(1).

## 2. Keep the cofactor divisibility through modified Euler factors

For a>=1 define a multiplicative function F_a by F_a(1)=1. If p does
not divide a, let F_a(p^v)=mu(p^v). If p^e exactly divides a, put

\[
 F_a(p^v)=
 \begin{cases}
  1,&v=e,\\
 -1,&v=e+1,\\
  0,&v\ge1,\ v\notin\{e,e+1\}.
 \end{cases}                                             \tag{3}
\]

Then |F_a|<=1, and, **on multiples of a**,

\[
 F_a(n)=\mu(n/a).                                        \tag{4}
\]

This follows prime by prime, including the powers of primes dividing a.
For example F_4(4)=1 and F_4(8)=-1, although mu(4)=mu(8)=0. Away from
multiples of a, (4) is not asserted: F_a(1)=1 is already a counterexample.

Replace mu(m/p) by -mu(m) in (1), with m=n/s, only after accounting for
its failure when p^2 divides m. Define

\[
 B_{i,H}^{v}(n)=-\sum_{\substack{s\le H\\s\mid n}}\mu(n/s)
    \sum_{\substack{p\mid n/s\\p>W_i}}\log p\,
                      v_i\!\left(\frac{n}{sp}\right).     \tag{5}
\]

Off integers divisible by the square of a prime above W_i, (1) and (5)
are equal: mu(m/p)=-mu(m) whenever p divides m but p^2 does not, even
if m has a square at another prime. Both coefficients have pointwise
bound at most a constant times the divisor function times log x. The
exceptional support has size at most
x sum_(p>W_i)p^-2 << x/W_i. Consequently, for every fixed epsilon>0,

\[
 \sum_{n\in J_x} A_{L,H}^{v}(n)A_{R,H}^{v'}(n-2)
 =\sum_{n\in J_x} B_{L,H}^{v}(n)B_{R,H}^{v'}(n-2)
       +O_\epsilon(x^{19/20+\epsilon}).                  \tag{6}
\]

The bound is uniform in H; it uses the divisor bound, not an H-dependent
pointwise estimate. Take epsilon<1/20. This error concerns repeated
large primes in n, and is distinct from the already negligible
proper-prime-power r branch of the full coefficient.

For fixed s,t the two divisibility conditions are compatible precisely
when g=gcd(s,t) divides 2. If compatible, they give one residue b_(s,t)
modulo

\[
 Q=\operatorname{lcm}(s,t)=st/g.                          \tag{7}
\]

On that progression the two Mobius factors in (5) are F_s(n) and
F_t(n-2). This is the coefficient class to which the source is applied.
The progression, including its density, is part of the application.

## 3. The source match, with its normalization retained

Primary statements checked on 2026-09-06:
[Tao–Teravainen, arXiv:2512.01739v2, Theorem 3.1(ii), (3.3)–(3.4)](https://arxiv.org/html/2512.01739v2)
and [MRT, arXiv:1503.05121v3, (1.12)](https://arxiv.org/html/1503.05121v3).
Their proofs are imported, not reproduced. The equidistributed alternative
and its extra prime-value condition are not used.

For the former theorem take its parameter mathcal L=(log X)^(1/4).
For some sufficiently small absolute c>0 its resulting rate is
(log X)^(-c), its allowed progression modulus is Q<= (log X)^c,
and its exceptional N-set in [sqrt X,X] has logarithmic measure
O(log X (log X)^(-c)). The correlation is normalized by **Q/N**.
Use h_1=0, h_2=-2 and the representative 0<=b_(s,t)<Q. All are in range.

To insert prime weights, let a(p) be any frozen real weight with
0<=a(p)<=log p, supported on primes in [X^alpha,X^beta], for fixed
0<alpha<beta<1. Define

\[
 \ell_a(n)=\frac1{\log X}\sum_{p\mid n}a(p),\qquad
 G_{s,a,u}(n)=F_s(n)\exp(iu\ell_a(n)).                    \tag{8}
\]

These are 1-bounded multiplicative functions. If s<=H_X with
H_X=(log(2X))^kappa, all primes in the weight's support exceed H_X for
large X, so ell_a(n/s)=ell_a(n) whenever s divides n. For n<=2X+2,
0<=ell_a(n)<=2. Choose the fixed smooth extension psi of the identity
on [0,2] from prime-band-transfer. Exactly,

\[
 F_s(n)\ell_a(n)=\int_{\mathbb R}\widehat\psi(u)
                              G_{s,a,u}(n)\,du.          \tag{9}
\]

The absolute integral norm is a fixed constant independent of s, the
prime weight and u. There is no cofactor-count loss in this single-pair
representation.

At primes, G_(s,a,u) agrees with mu outside the support of a and the
prime divisors of s. Its pretentious squared distance differs from that
of mu by at most

\[
 2\sum_{X^\alpha\le p\le X^\beta}\frac1p
       +2\sum_{p\mid s}\frac1p
 \ll_{\alpha,\beta}1+\log\log H_X
 =O_{\alpha,\beta,\kappa}(1+\log\log\log X).             \tag{10}
\]

This is uniform in all Fourier frequencies and s<=H_X. The imported
MRT lower bound, with epsilon=1/24 at X^2, therefore gives
M(G;X^2,log^(1/125)X)>= (7/24)log log X-O(log log log X).
It exceeds (1/4)log log X by an unbounded amount. This checks the
non-pretentious source hypothesis uniformly for the whole family.

For any fixed weight pair a,a', inserting (9), applying the source on
the progression (7), using the trivial AP count on its exceptional set,
and then Tonelli gives

\[
 \frac1{\log X}\int_{\sqrt X}^{X}
 \frac{\left|\sum_{N<n\le2N}F_s(n)F_t(n-2)
               \ell_a(n)\ell_{a'}(n-2)1_{n\equiv b_{s,t}\ (Q)}\right|}{N}
          \frac{dN}{N}
 \ll \frac{(\log X)^{-c}}{Q}.                           \tag{11}
\]

There is no intersection of the frequency-dependent exceptional sets.
On each such set the normalized AP sum is O(1), since Q/N=o(1).
The factor 1/Q in (11) is what an unnormalized, modulus-one application
would have lost.

## 4. Summing the cofactors and sampling dyadic scales

For compatible s,t,

\[
 \sum_{s,t\le H_X,\ (s,t)\mid2}\frac1{[s,t]}
 \le 2\left(\sum_{s\le H_X}\frac1s\right)^2
 \ll (1+\log H_X)^2.                                    \tag{12}
\]

Thus the pairwise summation costs O((log log X)^2), not H_X^2.
Choose kappa=c/4. Then Q<=H_X^2=(log X)^(c/2+o(1)) is within the
source's (log X)^c range. This fixes an actual permitted growing range;
no modulus power of X is silently substituted into a logarithmic range.

The required sampling lemma also retains the density. For |a(n)|<=B
supported on one residue modulo Q, let F(N)=Q/N sum_(N<n<=2N)a(n).
For N<=t<=(1+h)N, comparing the two endpoints and normalizations gives

\[
 |F(t)-F(N)|\le B\{4h+O(Q/N)\}.                         \tag{13}
\]

Indeed the symmetric difference contains at most 3hN/Q+O(1) progression
points, and the old interval at most N/Q+1. Integrating on disjoint
intervals [2^j,(1+h)2^j], with
h=(log X)^(-c/2), converts (11) to a dyadic average with bound
O((log X)^(-c/2)/Q). The top interval costs O(1/(Q log X)); the rounding
term Q/sqrt X in the Q-normalization is negligible uniformly here.
This is the AP version of the sampling argument in round-review-0906.

Apply it separately to each frozen pair and sum (12). An arbitrary
selection of pairs at each scale, including s,t<=H(2N), is harmless
after this triangle inequality: it only deletes terms from a nonnegative
sum. No regularity of the integer cutoff H(2N) is required.

## 5. Actual windows and transition weights: price the freezing

It remains to justify using the frozen weights in (11). This is not a
claim that the actual coefficient is multiplicative as N varies.
Partition theta=log N/log X in [1/2,1] into O(1/delta) cells. Choose one
representative y=2N_0 in each cell. For side i and cofactor s, freeze

\[
 a_{i,s,y}(p)=\log p\,v_{i,y}\!\left(\frac{y}{sp}\right)
                                  1_{p>W_i(y)}.          \tag{14}
\]

The profile subscript includes D_i(y),z_i(y) and their exact floors.
The weights satisfy the hypotheses of section 3. One may use, for example,
alpha=1/100 and beta=1/3 uniformly over all cells, both sides and
s<=H_X, for sufficiently large X. The two sides' prime ranges are disjoint,
and every active prime exceeds H_X.

There are two comparisons: replacing m=n or n-2 by x=2N in the profile,
then replacing x and its cuts by y. A profile jump can only change primes
in intervals whose log endpoint widths are O_eta(delta log X+1).
Away from the jumps, rho and h have log-argument slope at most 1/L_i;
variation of the denominator L_i as x changes has the same
O_eta(delta+1/log X) cost. Hence there are nonnegative, n-independent
prime-weight envelopes for the differences with

\[
 \sum_p\frac{|\Delta a_i(p)|}{p}\ll_\eta\delta\log X+1,
 \qquad \sum_p\frac{a_i(p)}p\ll_\eta\log X.               \tag{15}
\]

To obtain (15), use sum_(p<=u)log p/p=log u+O(1) at the interval
endpoints. Floors are covered by the O(1) widths. The shifted lower
endpoint n-2>N-2 changes the comparison by a bounded factor as well.
The strict lower divisor cut in tau is included among the jumps.

For fixed s,t and primes p,q in the respective ranges,

\[
 \#\{N<n\le2N:sp\mid n,\ tq\mid n-2\}
 =\frac{N}{Qpq}+O(1)                                   \tag{16}
\]

when (s,t)|2, and it is zero otherwise. This uses p,q>H_X and p!=q;
without these facts gcd(sp,tq)=gcd(s,t) would be false.
After (15), (16) and (12), the absolute normalized product error is

\[
 O_\eta\!\left((1+\log H_X)^2
           (\delta+1/\log X)+X^{-1/10}\right).           \tag{17}
\]

For the O(1) CRT errors, a crude count suffices: at most H_X^2 times
O(X^(29/100+4eta+o(1))) prime pairs, each with weight O(log^2 X).
Since N>=sqrt X and eta<1/400, division by N log^2 X leaves a fixed
power saving; polylogarithmic factors fit inside X^-1/10. This also
prices the profile products and exact endpoint rounding.

## 6. Finish the transfer, then attempt the full consumer

For each frozen cell, the dyadic estimate from section 4 can be bounded
by its nonnegative sum over the whole outer scale range. The mesh costs
O(1/delta). Thus the left side of (2), first with B in place of A, is at
most

\[
 O_\eta\!\left((1+\log H_X)^2
    \{\delta^{-1}(\log X)^{-c/2}+\delta+1/\log X\}
                     +X^{-1/10}\right).                 \tag{18}
\]

Choose delta=(log X)^(-c/4), decreasing c below 1 if necessary. The
answer is O_eta((log log X)^2 (log X)^(-c/4)). Absorb the iterated
logarithm by setting d=c/8>0. The repeated-large-prime error (6) is
smaller than any fixed logarithmic saving. This proves (2) from the
named imports. The same calculation before sampling gives a continuous
average with exponent c/2, up to the iterated-logarithm factor.

The extension covers s>1, t>1 and nonsquarefree n that the earlier
s=t=1 transfer did not represent. For the sharp choice it bounds the
joint restricted corner, so it is not merely a reformulation or a
separate norm bound. It also applies to each restricted transition or
smoothed profile and their mixed products.

**The attempt to pass to the full corner stops at two priced steps.**
The full prime-r cofactor range reaches x/D_iW_i=x^(2eta+o(1)).
At that range (s,t)|2 forces Q=st/(s,t), which can be a power of x,
outside the source's polylogarithmic modulus range. Even granting a
hypothetical uniform modulus extension with the same rate, (12) would
cost O_eta(log^2 X), rather than O((log log X)^2). This triangle
summation would then supply only an x log^(4-c)-type budget before
mesh losses, insufficient even to improve the existing x log^2 x norm
budget when c is small. Neither failure excludes a method that retains
cancellation between the cofactor pairs or uses a different theorem.

For the exact consumer let C_i^P be the full prime-r sharp coefficient,
U_i=C_i^P-C_(i,H), K_H=sum_J C_(L,H)(n)C_(R,H)(n-2), and put

\[
 J_H=\sum_{n\in J_x}
 \{C_{L,H}(n)U_R(n-2)+U_L(n)C_{R,H}(n-2)+U_L(n)U_R(n-2)\}.
\]

The existing proper-power estimate gives, with any fixed H_0>0,

\[
 E_\dagger=E_{\rm out}+K_H+J_H+O_{H_0}(x/\log^{H_0}x).    \tag{19}
\]

Equation (2) does not make K_H negligible at scale x: it gives an
averaged upper budget growing like log^(2-d) X for |K_H|/N. J_H includes
both mixed tails and is unestimated; E_out is also unestimated at the
required one-sided precision. No common-scale positive margin follows.

The subsequent [global cutoff assessment](global-cutoff-averaging.md)
refines the research priority: initial cutoffs can be averaged in the
whole identity, representing the full residual with smoother coefficients.
The existing norms force same-input cancellation between the corner and
its complement. This gives a reason to test the complete global pair
before extending individual cofactor terms. No shifted estimate follows.

## 7. Falsifiers, records and the next obligation

[cofactor-progression-transfer-validation.js](cofactor-progression-transfer-validation.js)
checks (3)–(7), the cofactor CRT branches, actual sharp/transition/smooth
coefficient reconstructions, the exact split and the mixed-tail identity.
Controls exercise nonsquarefree inputs, failure away from s|n, prime
bands meeting the cofactor, repeated large prime squares of both signs,
missing mixed tails, and the Q/N sampling endpoint error. Sharp identities
use integer arithmetic for Mobius values; weighted numerical identities
use the stated floating tolerance. These are finite checks, not evidence
for the imported theorem or the asymptotic rate.

A wrong source normalization, loss of uniform non-pretentiousness in s or
frequency, an unpriced profile jump, or a CRT error of size N would break
this transfer. Their bounds and hypotheses are written above and checked
at the source where imported. No large census was run.

**Outcome:** derived signed scale-average control for a growing small
cofactor subfamily; failed extension to the full signed margin. The
current first priority is the complete pair in global-cutoff-averaging,
which retains cancellation with the coefficient complement. If pursuing
the present cofactor decomposition, J_H and its mixed terms still need
an estimate, and a faster single-pair rate must be priced against the
full cofactor cost. Repeating the same termwise modulus-one lift or
calling (2) an o(x) estimate would not advance that question.

Repository verification on 2026-09-06: the linked finite validator passed;
`node research/qc.js --index --strict` reported zero findings;
`node research/qc/selftest.js` retained all 58 positive and 47 negative
controls; `node research/audit-numbers.js` passed all 251 checks;
`git diff --check` was clean. These gates check finite identities, recorded
numbers and document consistency. The analytic derivation is a direct
attempt with a self-audit, not an independent mathematical review.
