# A multiplicative lift for the prime-cofactor subfamily

<!-- ledger
id: Q-prime-band-transfer
status: PARTIAL
todo: C
parity: Elementary Fourier superposition and CRT comparisons consume the non-pretentious case of Tao-Teravainen arXiv:2512.01739v2 Theorem 3.1 and its stated Liouville non-pretentiousness input. This uses arithmetic information beyond local residue densities. The imported theorem is not reproved. The continuous scale-average saving and its elementary dyadic sampling consequence apply only to the prime-cofactor subfamily, with no o(x) estimate and no full-corner or twin margin.
question: Can the nonmultiplicative prime-band weight be represented by bounded multiplicative functions, and what does an available quantitative correlation theorem actually give after all scale and normalization costs?
verdict: A smooth Fourier superposition represents mu(n)L_B(n)/log X exactly on n<=2X+2. The quantitative non-pretentious input and a mesh give a continuous scale-average saving for the exact s=s'=1 windows. The round review additionally derives a dyadic scale-average saving by bounded-interval stability, with exponent c_*/2. Neither estimate gives an every-dyadic bound, o(N), full-corner control or a twin margin. The extension in cofactor-progression-transfer.md now estimates a growing polylogarithmic cofactor family; the full remainder remains open. Proper-prime-power branches have the separate bound in corner-correlation §1.1.
-->

**Twin-prime infinitude and the sufficient signed margin remain OPEN.**
This is a derived transfer conditional on a named imported theorem,
not a novelty claim or a replacement for the full corner. The elementary
steps and their losses are completed here for the next local campaign.

**Extension:** [cofactor-progression-transfer.md](cofactor-progression-transfer.md)
now treats all remaining cofactors s,t<=(log x)^kappa for some kappa>0,
including nonsquarefree inputs, by modifying Euler factors and keeping
the density of the CRT progression. It gives a signed dyadic average
for exact sharp, transition and smoothed profiles. That restricted rate
is still weaker than o(x); the full cofactor remainder and twin margin
remain OPEN. The s=t=1 derivation here remains its first special case.

## 1. Fixed-band representation

Let X grow, and let B,B' be prime bands with endpoints between X^alpha
and X^beta, for fixed 0<alpha<beta<=1. Set

\[
 L_B(n)=\sum_{p\mid n,\ p\in B}\log p,\quad
 \ell_B(n)=L_B(n)/\log X,\quad
 g_{B,t}(n)=\mu(n)\exp(it\ell_B(n)).
\]

For coprime m,n, L_B(mn)=L_B(m)+L_B(n). Thus g is a
1-bounded multiplicative function for every real t, despite mu L_B
itself not being multiplicative. At every prime outside B, g(p)=-1.
For n<=2X+2 and X large, 0<=ell_B(n)<=2.

Choose once and for all a smooth compactly supported function psi on R
equal to u on [0,2]. Use the Fourier convention
psi(u)=integral hat(psi)(t) exp(itu)dt. Its Fourier transform is
integrable (two integrations by parts suffice). Exactly on this range,

\[
 \mu(n)\ell_B(n)=\int_{\mathbb R}\widehat\psi(t)g_{B,t}(n)\,dt. \tag{1}
\]

The total absolute coefficient norm is the fixed number ||hat(psi)||_1.
In particular there is **no finite-difference division by a small
parameter**. A derivative approximation would introduce an avoidable
loss. Formula (1) is a superposition identity, not an assertion that
mu L_B is itself multiplicative.

## 2. Source interface and non-pretentiousness

Read [Tao–Teräväinen v2, Theorem 3.1(ii) and Remarks 3.2](https://arxiv.org/html/2512.01739v2).
For 1-bounded multiplicative g1,g2 with
exp M(g1;X^2,log^(1/125)X) sufficiently large relative to L<=log X,
the theorem bounds natural correlations on (N,2N] outside a set of
N in [sqrt(X),X] of logarithmic measure O(log X L^(-c)). The bound
is O(L^(-c)), with a small positive absolute c. Bounded shift 2 and
modulus 1 are within its parameter ranges: take W=1, b=0, h1=0,
h2=-2 in its (3.4). Its technical condition (3.2), g1(p)=1 on a range
of primes, belongs to the equidistributed case (i) only and is not a
hypothesis of case (ii); a global reading would refute this application. For its Liouville input read
[Matomaki–Radziwill–Tao, equation (1.12)](https://arxiv.org/pdf/1503.05121)
at source: it supplies M >= (1/3-epsilon) log log Y+O(1) at scale Y,
for conductors at most log^(1/125)Y. Use Y=X^2 and, for instance,
epsilon=1/24. It does **not** supply exp M>>log X. These analytic
statements are imported dependencies, not reproduced here.

At primes mu and lambda coincide. For any Dirichlet character chi
and any frequency u in the source's infimum,

\[
 |\mathbb D(g_{B,t},\chi n^{iu};X^2)^2
     -\mathbb D(\mu,\chi n^{iu};X^2)^2|
 \le 2\sum_{p\in B}1/p=O_{\alpha,\beta}(1).             \tag{2}
\]

This is uniform for every real t; no bound on t is needed. Taking
infima preserves the inequality. Therefore the required lower bound
for exp M holds uniformly for g_{B,t}, with a fixed constant. Take
L=(log X)^(1/4): the exponent 7/24 from the preceding input exceeds
1/4 and absorbs all fixed constants for sufficiently large X. If the
source theorem's saving exponent is c_src, write c=c_src/4 from now
on, so L^(-c_src)=(log X)^(-c). The source's real-valued
equidistribution alternative is not used.

Write A_(t,s)(N)=N^(-1)sum_(N<n<=2N)
g_(B,t)(n)g_(B',s)(n-2). On the exceptional set use |A|<=2;
off it use the theorem. For each t,s separately,

\[
 \int_{\sqrt X}^{X}|A_{t,s}(N)|\frac{dN}{N}
       \ll (\log X)^{1-c}.                              \tag{3}
\]

The constant is uniform in t,s and in bands inside a fixed exponent
range, including the growing family of frozen bands used in section 3:
by Mertens, the reciprocal prime mass of each such band is
log(1+2eta/w)+o(1), independent of the representative scale. There is no need to intersect uncountably many exceptional
sets: insert (1), use the triangle inequality, then Tonelli on the
nonnegative integrand. This yields

\[
 \frac1{\log X}\int_{\sqrt X}^{X}
 \frac{\left|\sum_{N<n\le2N}\mu(n)\mu(n-2)L_B(n)L_{B'}(n-2)\right|}
      {N\log^2 X}\frac{dN}{N}
 \ll (\log X)^{-c}.                                    \tag{4}
\]

The bands in (4) are fixed while N varies. The theorem allows functions
chosen for each outer X; it does not give simultaneous control for an
arbitrary family chosen separately at every inner N.

## 3. Exact moving cofactor windows: price the mesh locally

Fix 0<eta<1/400 once and for all. At x=2N use exactly the floors and
L_w,L'_w of corner-correlation (5). Let

    A_w(N) = sum_(N<n<=2N) mu(n)mu(n-2)L_w(n)L'_w(n-2).

First replace each window on its own interval by the pure band
((2N)^w,(2N)^(w+2eta)], respectively w=6/25 and w=1/20.
The window omits a strip of multiplicative width at most 2 at the
upper edge, plus a lower-edge set contained in (V, n/D_0] with
n/D_0<=V+1+o(1), at most two integers wide. The finite validator of the
review confirms both sets at two scales and that width 2 is sharp. CRT and quantitative
PNT give a product-weight absolute error O_eta(N log X), uniformly
for sqrt(X)<=N<=X. This is large compared with o(N), but after the
normalization in (4) it is O_eta(1/log X).

Now partition theta=log N/log X in [1/2,1] into at most O(1/delta)
intervals of length delta, and freeze the two band endpoints at a
representative theta in each interval. Each changed log-endpoint moves
by O(delta log X+1). The symmetric difference of the prime bands has
weighted reciprocal mass O(delta log X+1), whereas either complete
band has mass O_eta(log X). For each pair of primes, CRT on (N,2N]
has O(1) error; the left and right bands are disjoint throughout this
range. The number of pairs is at most
X^(29/100+4eta+o(1)), which is smaller than N by a fixed power.
Consequently the normalized absolute comparison error is

    O_eta(delta + 1/log X + X^(-1/10)).                  (5)

Apply (4) separately for every frozen band pair. An integral over one
mesh interval is at most the nonnegative integral over all scales in
(4), so summing the O(1/delta) bounds costs exactly that factor.
Together with (5), the left side of (4) for A_w is at most

    O_eta(delta^(-1)(log X)^(-c) + delta + 1/log X).

Decrease c so 0<c<1, and choose delta=(log X)^(-c/2). Hence, with
some fixed c_*=c/2>0,

\[
 \boxed{\frac1{\log X}\int_{\sqrt X}^{X}
       \frac{|A_w(N)|}{N\log^2 X}\frac{dN}{N}
          \ll_\eta (\log X)^{-c_*}.}                    \tag{6}
\]

All constants may depend on the fixed eta and the imported theorem.
No eta(x) limit is taken. The proper-square error in converting A_w
to the s=s'=1 raw corner piece is a fixed power below N and is
absorbed in (6). The same is true of bounded endpoint rounding.

## 4. Exact payoff and limits

(6) gives a small relative logarithmic saving over the unsigned
prime-cofactor envelope on **continuous scales**. It is not o(N):
the scale-averaged bound on |A_w|/N is only
O_eta(log^(2-c_*)X), with c_* small and unspecified. The integral alone
does not control all dyadic points. However, the bounded interval sums
also satisfy a stability inequality: §6 records the resulting dyadic
scale-average saving. No every-dyadic estimate or positive margin follows.

The full corner is sum C(n)C'(n-2). Formula (1) does not represent its
prime-r branches with s>1 or s'>1 and their non-squarefree inputs. Terms
with a proper prime power above a cutoff already have the separate
negligible bound in corner-correlation §1.1. The complement of S0 is still
uncontrolled at the global precision. No divisor region or cut changes.

**What is reusable:** the exact multiplicative lift, its uniform
non-pretentiousness comparison, Tonelli instead of an invalid common
exceptional set, and the explicit mesh cost for a moving band.
**What would change the global assessment:** a proved estimate with
the full coefficients and the actual one-sided consumer; or a stronger
rate/scale statement whose complete errors reach that consumer.
Recomputing (6), treating c_* as known numerically, or calling it a proof
at every prescribed dyadic point is not a new attempt.

Source custody: arXiv:2512.01739v2, PDF SHA-256
`ce10e83b10c6544e1dbff037a5e4efa0e387892e0fc596ae09dce76025d7b41e`.
The MRT source is arXiv:1503.05121v3, equation (1.12), PDF SHA-256
`8a2633b1594615fe0c340bbca01ad059be5bd66d3495bd028e7e9d2264f1e688`.
Both primary statements were read on 2026-09-06. No search-result summary is used as
an analytic input; no assertion of an exhaustive literature search or
originality is made.

## 5. Verification and falsifiers

The local audit checked (1)--(6), including source hypotheses, the
positive integral order and the count of mesh intervals. The
[adversarial review](next-transfer-review.md) of 2026-09-06 found no
load-bearing gap at this scope and supplied the four unstated steps
now written above. The source
proof is not independently reproduced. The finite validator
[agent-readiness-validation.js](agent-readiness-validation.js) checks
additivity/multiplicativity ingredients and active counterexamples to
the discarded support and completeness claims. It does not prove (6).

A failure of uniformity in (2), a nonintegrable Fourier majorant, or
a CRT error of size N in (5) would invalidate the transfer. The above
proof supplies their bounds. A future use on the full corner needs
a new identity and error bound; no implied extension is authorized by
this note's PARTIAL ledger status.

## 6. Dyadic scale-average consequence after review

[round-review-0906.md §2](round-review-0906.md) supplies the missing
sampling argument. For a fixed bounded sequence, moving (N,2N] to
(t,2t], N<=t<=(1+h)N, changes its normalized sum by O(h+1/N).
Integrating on disjoint neighborhoods of dyadic points converts the
fixed-band saving c in (4) into a dyadic saving c/2. Applying the same
moving-band mesh with delta=(log X)^(-c/4) gives

\[
 \frac1{\log X}\sum_{\sqrt X\le2^j\le X}
     \frac{|A_w(2^j)|}{2^j(\log X)^2}
       \ll_\eta (\log X)^{-d},\qquad d=c/4=c_*/2>0.       \tag{7}
\]

The top endpoint is charged O(1/log X); no exceptional set is required
to omit every dyadic point. Since x=2N, these are campaign dyadic
scales as well. The proof includes the exact cofactor windows at fixed
eta and the proper-square conversion error. This is an average over
dyadic scales, not a bound at every such scale. It still gives only
an averaged O(log^(2-d) X) bound on |A_w|/N, and no full-corner or
twin margin. The finite sampling validator belongs to the review.
