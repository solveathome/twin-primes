# A positive prime count with one explicit bilinear remainder

<!-- ledger
id: Q-prime-detection-inputs
status: ANSWERED
todo: C
parity: Prime BV and PNT establish the Type I and comparison inputs on long intervals. Vaughan's identity isolates a specific Mobius-weighted shifted-prime bilinear remainder; its required one-sided improvement remains OPEN. No general Type II theorem is assumed or claimed available.
question: Can we give a locally correct positive comparison sequence, justify the ordinary arithmetic inputs, and prove exactly what one additional estimate would buy?
verdict: Yes: the comparison sequence and Type I estimates are derived, and a classical Vaughan decomposition gives S(x)=C2*x+B(x)+O_H(x/log^H x) for every fixed H. A fixed one-sided saving over B>=-C2*x+o(x) implies twins on unbounded scales. This is a fully specified classical reduction, not a new cancellation estimate or proof mechanism.
-->

Internal specification, 2026-09-05. The new arithmetic estimate is **OPEN**.
This executes the input/weight task in [chen-opportunity-audit.md](chen-opportunity-audit.md).
The construction uses classical multiplicative expansions, prime BV, PNT,
and Vaughan's identity; no novelty is claimed. Its first attempted estimate
is audited in [bilinear-fold-attack.md](bilinear-fold-attack.md).
Exact finite algebra checks: [prime-detection-validation.js](prime-detection-validation.js).
The [joint local transfer note](polylog-fold-transfer.md) controls the local
and comparison bilinear terms and identifies the remaining signed error.
The [shifted-prime decomposition](shifted-prime-decomposition.md) then
controls its second Type I pieces and states the residual correlation and
a sufficient scale-average target, both with their open estimates explicit.

## 1. The positive sequence and the count it detects

Let x tend to infinity through powers of 2. In this note the **partner** n
lies in J_x=(x/2,x]∩Z; this differs at the lower endpoint from the earlier
Chen convention. Define, on that interval and zero outside it,

$$
 a(n)=\Lambda(n-2),\quad
 b(n)=2C_2\,1_{2\nmid n}\prod_{p\mid n\atop p>2}{p-1\over p-2},
 \quad w(n)=a(n)-b(n),                                            \tag{1}
$$

where C₂=∏_{p>2}(1−1/(p−1)²)>0. Both sequences are nonnegative.
We use the genuinely nonnegative prime weight Λ(n), giving

$$
 S(x)=\sum_{n\in J_x}\Lambda(n)\Lambda(n-2),\qquad
 M(x)=\sum_{n\in J_x}\Lambda(n)b(n).                              \tag{2}
$$

PNT gives M(x)=C₂x+O_H(x/log^H x) for every fixed H, by the quantitative
form in [endpoint-target-audit.md §1](endpoint-target-audit.md): at odd primes p, b(p)=2C₂(1+1/(p−2));
the correction contributes O(log x), while the prime powers contribute
O(√x log²x). Thus the main term here is established without any twin-prime
assumption. The factor 1/2 from the interval length is already included.

Let N₂(x) count n∈J_x with n and n−2 both prime. The contribution to S from
a proper prime power on either side is O(√x log³x). This follows by counting
O(√x log x) proper prime powers and bounding each product of logarithms by
log²x. Therefore

$$
 N_2(x)\ge {S(x)-O(\sqrt x\log^3x)\over\log^2x}.                 \tag{3}
$$

This weight has no negative-composite penalty. It does not make S easy to
estimate; it makes the required payoff unambiguous.

## 2. Why b has the correct local densities

For odd integers put f(n)=∏_{p|n}(p−1)/(p−2), and let h be supported on odd
squarefree integers, with h(1)=1 and h(p)=1/(p−2). Multiplicativity gives

$$
 f(n)=\sum_{e\mid n}h(e),\qquad
 \sum_{e\ge1}{h(e)\over e}
   =\prod_{p>2}\left(1+{1\over p(p-2)}\right)=C_2^{-1}.           \tag{4}
$$

The series converges absolutely. For an odd d and a real interval
K⊂(x/(2d),x/d], factor out the primes already in d:

$$
 \sum_{k\in K}b(dk)
 =2C_2 f(d)\sum_{(e,d)=1}h(e)
          \#\{k\in K:k\text{ odd},\ e\mid k\}.                  \tag{5}
$$

Only e≤X=x/d occur. The inner count is |K|/(2e)+O(1), and the full-series
main coefficient is

$$
 C_2 f(d)\sum_{(e,d)=1}{h(e)\over e}
 =\prod_{p\mid d}{(p-1)/(p-2)\over1+1/(p(p-2))}
 ={d\over\phi(d)}.                                               \tag{6}
$$

Here |K| is real length, not its number of integer points. Uniformly in K,

$$
 \sum_{k\in K}b(dk)={d\over\phi(d)}|K|
                  +O\bigl(\tau(d)\log^3(2x)\bigr).              \tag{7}
$$

For completeness, h(e)≤τ₃(e)/e, since 1/(p−2)≤3/p. Hence
Σ_{e≤X}h(e)≤(1+log X)³. Also Σ_{e≤Y}τ₃(e)≪Y log²(2Y), so a dyadic
tail bound gives Σ_{e>X}h(e)/e≪log²(2X)/X. These estimates and f(d)≤τ(d)
prove (7). For even d the b-sum is exactly zero.

The a-sum for odd d is a prime progression with residue −2 modulo d,
which is coprime to d. Its expected value is also (d/φ(d))|K|. Thus (1)
matches all these local main terms, including non-squarefree moduli. The
constant comparison b(n)=1 would fail this test.

## 3. The available Type I estimate

Fix

$$
 U=V=\lfloor x^{6/25}\rfloor,\qquad D=UV.                         \tag{8}
$$

The choice 6/25 is a convenient interior point below 1/4, not an optimized
exponent. In particular D≤x^(12/25), safely below the BV level for every
fixed logarithmic loss once x is large enough.

**Derived from prime BV:** for every fixed A>0,

$$
 \mathcal I_A(x):=\sum_{d\le D}\max_{K\text{ interval}}
       \left|\sum_{k\in K\atop dk\in J_x}w(dk)\right|
             \ll_A {x\over\log^A x}.                            \tag{9}
$$

For odd d, subtract the identical main terms just established. Summing the
comparison errors in (7) costs O(D log⁴x). For even d, a(dk) can be nonzero
only when dk−2 is a power of 2. The crude bound O(log x) per modulus costs
O(D log x). Both are smaller than x/log^A x for every fixed A.

The remaining odd-modulus discrepancies are covered by the standard BV
estimate for ψ(y;d,−2)−y/φ(d). The maximum over interval endpoints can also
be obtained from its fixed-endpoint version: bracket endpoints in
[x/2−2,x−2] by a mesh of spacing x/log^K x. Positivity of Λ bounds the
interpolation cost after summing d by O(x log^(1−K)x). Sum the fixed-endpoint
BV bounds over O(log^K x) mesh points, using an arbitrarily larger fixed
logarithmic exponent in that theorem. This proves (9), with rounding costs
O(D log x) absorbed. No short-interval BV assertion is needed.

Primary source for the imported BV theorem and the identity used below:
[Tao, Notes 3, Theorem 17 and Lemma 18](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/).
The comparison calculation and the endpoint reduction above specify their
application here; the theorem itself is not reproved.

## 4. The exact identity and its one remaining sum

Write L(n)=log n, and use * for Dirichlet convolution. Vaughan's identity is

$$
 \Lambda=\Lambda_{\le V}+\mu_{\le U}*L
       -\mu_{\le U}*\Lambda_{\le V}*1
       +\mu_{>U}*\Lambda_{>V}*1.                                 \tag{10}
$$

One derivation is to split μ and Λ at U,V in μ*Λ, then convolve by 1,
using μ*1=δ and Λ*1=L. The first term in (10) vanishes on J_x for large x.
Define

$$
 c(d)=\sum_{ef=d\atop e\le U,\ f\le V}\mu(e)\Lambda(f),\qquad
 \beta_V(k)=\sum_{\ell\mid k\atop\ell>V}\Lambda(\ell)
           =\log k-\sum_{\ell\mid k\atop\ell\le V}\Lambda(\ell).
$$

Then |c(d)|≤log d, c(d)=0 for d>D, and 0≤β_V(k)≤log k,
with β_V(k)=0 for k≤V. Set

$$
 \begin{split}
 I_1(x)&=\sum_{d\le U}\mu(d)\sum_{dk\in J_x}(\log k)w(dk),\\
 I_2(x)&=\sum_{d\le D}c(d)\sum_{dk\in J_x}w(dk),\\
 B(x)&=\sum_{d>U,\ k>V\atop dk\in J_x}
                       \mu(d)\beta_V(k)w(dk).                    \tag{11}
 \end{split}
$$

Equation (10) yields the exact equality

$$
                  S(x)-M(x)=I_1(x)-I_2(x)+B(x).                  \tag{12}
$$

Partial summation in k bounds |I₁| by O(log x) times (9), and the bound
on c does the same for I₂. Since A in (9) is arbitrary, for every fixed H>0,

$$
       I_1-I_2=O_H(x/\log^H x),\qquad
                   S(x)=C_2x+B(x)+O_H(x/\log^H x).              \tag{13}
$$

The actual elements in B satisfy d>U, k>V and x/2<dk≤x. Thus the factor
exponents range approximately from 6/25 to 19/25, with the exact floor and
product conditions in (11). The coefficient is μ(d)β_V(k), not an arbitrary
pair of divisor-bounded coefficients and not the earlier prime-q Liouville
coefficient. Those different input classes must not be substituted silently.

## 5. The required estimate and the positive payoff

The transfer note also proves B=𝓑(a)+O_H(x/log^H x) for every fixed H,
where 𝓑(a) is (11)'s bilinear sum with w(dk) replaced by Λ(dk−2).
Thus the condition below can equivalently be stated for that simpler sum;
the comparison term is already controlled.

**H_B(η), OPEN.** For some fixed η∈(0,1) and an unbounded set of dyadic x,

$$
                  B(x)\ge -(1-\eta)C_2x+o(x),                   \tag{14}
$$

where the error is along those same scales and all restrictions in (11)
remain in force. It follows from (13) that S(x)≥ηC₂x+o(x), and from (3) that
eventually on those scales

$$
                         N_2(x)\ge{\eta C_2\over2}
                                         {x\over\log^2x}.        \tag{15}
$$

For a concrete fixed target, η=1/2 gives the conservative eventual lower
bound (C₂/4)x/log²x. These intervals have openers tending to infinity, so
the implication to infinitude follows. The positive coefficient is exact;
no numerical optimization or extrapolation is involved.

**What this does and does not buy.** Nonnegativity of S already implies
B(x)≥−C₂x+o(x). H_B asks for a fixed improvement over precisely
that boundary. This is stronger than mere infinitude, which need not give
a positive proportion of the expected count on any subsequence. The still
stronger cancellation B=o(x) would give the full dyadic weighted main term.
Neither improvement is proved here.

The [endpoint target audit](endpoint-target-audit.md) retains the stronger
O_H(x/log^H x) rate in every discarded term, including M-C₂x through
quantitative PNT. It derives a sufficient smaller-margin condition
C₂x+E_>(x)≥c*x/log^K x, with fixed c,K>0 on unbounded dyadic scales,
and a corresponding rescaled average. These hypotheses remain OPEN;
the fixed-fraction condition above is one sufficient option.

The reduction is not an independent explanation of why H_B should hold:
(13) relates it directly to the unknown twin count. Its value is the
explicit coefficient, factor range, correct local comparator, and proof
that all the other inputs are available. Renaming this sum cannot count as
progress in estimating it. The first attempt in the companion note must
be read before designing another experiment.

## 6. Input ledger

| input | precise use | status |
|---|---|---|
| elementary multiplicativity and divisor bounds | (4)–(7), local comparator and uniform error | DERIVED here |
| PNT | M(x)=C₂x+O_H(x/log^H x) | classical imported theorem with its classical error term, application derived |
| prime BV | (9), moduli at most x^(12/25), all interval cuts as derived above | classical imported theorem, application derived |
| Vaughan identity | exact (10)–(12); coefficients c and β retained | classical identity, derivation included |
| partial summation | I₁−I₂ negligible at any fixed logarithmic scale | DERIVED here |
| one-sided bilinear improvement | (14), on unbounded dyadic scales | OPEN |
| generic Type II / Ford–Maynard bounded-class hypotheses | not required for this particular consumer | NOT invoked |

This chooses an explicit classical consumer with a wider factor range rather
than presuming a narrower optimized theorem applies. Range reduction remains
a possible later optimization, not a completed input or a reason to claim
the present estimate is attainable.
