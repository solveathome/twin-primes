# Joint small folds cancel; the signed reconstruction remains open

<!-- ledger
id: Q-polylog-fold-transfer
status: ANSWERED
todo: C
parity: Siegel-Walfisz controls beta-weighted joint local folds uniformly for squarefree moduli at most a fixed power of log x. The actual shifted-prime remainder has a separate signed reconstruction error. An o(x) absolute approximation is disproved for this model class; no obstruction for other signed arithmetic methods is claimed.
question: Can the fixed-fold calculation be made uniform at growing depth, and transferred to the actual bilinear remainder with an adequate error?
verdict: The local bilinear model is O_H(x/log^H x) uniformly for polylogarithmic squarefree moduli. Its absolute reconstruction error is at least (1/2+o(1))*x. The needed signed reconstruction bound remains OPEN, so this model does not establish the twin-prime lower bound.
-->

Internal continuation, 2026-09-05. **No new twin-prime lower bound follows.**
This executes the growing-depth and reconstruction check suggested by
[bilinear-fold-attack.md](bilinear-fold-attack.md). All a,b,w,β,U,V,B below
are defined in [prime-detection-spec.md](prime-detection-spec.md).
Finite CRT identities are checked in
[prime-detection-validation.js](prime-detection-validation.js).
The subsequent [shifted-prime decomposition](shifted-prime-decomposition.md)
controls the second Type I pieces of the actual sum; its residual estimate
remains OPEN.

## 1. The joint local model

Fix L>0. Let Q be even and squarefree, with Q≤(log x)^L; Q may depend on x.
For odd q|Q use A_q,b_q from the single-fold note; set
A₂(t)=b₂(t)=2·1_(t odd). Define

$$
 A_Q(t)=\prod_{q\mid Q}A_q(t)
       ={Q\over\phi(Q)}1_{(t-2,Q)=1},\qquad
 b_Q(t)=\prod_{q\mid Q}b_q(t),\qquad r_Q(t)=A_Q(t)-b_Q(t).         \tag{1}
$$

These are explicit periodic local factors. They are not the functions
Λ(t−2) and b(t). In particular, A_Q is a normalized roughness indicator,
not a prime indicator.
Write C_Q=∏_{q|Q,q>2}(1−1/(q−1)²); then
b_Q(t)=2C_Q·1_(t odd)·f_R(t), where R is the set of odd prime divisors of Q.

For every integer d and every g|Q,

$$
          \sum_{k\bmod Q\atop(k,Q)=g}r_Q(dk)=0.                 \tag{2}
$$

Proof: the gcd class is a product of zero/nonzero residue classes by CRT.
At an odd q dividing d or g, both factors take the same constant value.
At an odd q dividing neither, multiplication by d permutes the nonzero
residues, on which the average of A_q is b_q. At 2 the two factors agree
pointwise. Average the products coordinate by coordinate. ∎

Thus the single-fold conditional-mean identity survives joint folds
exactly. It does not require independent primality assumptions.

## 2. The specific beta weights balance uniformly

For V≤N≤x and any interval K⊂[1,N], put

$$
 W_a(K)=\sum_{k\in K\atop k\equiv a\pmod Q}\beta_V(k).
$$

Uniformly for a,b with (a,Q)=(b,Q), every fixed A,L>0 give

$$
                  W_a(K)-W_b(K)\ll_{A,L}{N\over\log^A x}.        \tag{3}
$$

Expand k=ℓr with ℓ>V and weight Λ(ℓ). First remove terms with (ℓ,Q)>1.
Then ℓ=p^j for p|Q, and their total mass is at most

$$
 \sum_{p\mid Q}\sum_{p^j>V}{N\log p\over p^j}
                         \ll {N\log Q\over V},                  \tag{4}
$$

which is negligible at every fixed logarithmic scale. For the remaining
terms, (k,Q)=(r,Q)=g. For each such r the progression condition on ℓ is a
primitive residue class modulo Q/g, namely
(a/g)(r/g)⁻¹ modulo Q/g. Removing prime powers of primes dividing g changes
the total by at most (4).

The lengths of the ℓ intervals are independent of a within this gcd class.
The Siegel–Walfisz error, summed over r≤N/V, is
O_L(N log x exp(−c_L√log V)), hence gives (3). The theorem applies because
every nonempty ℓ interval has endpoints at least V, a fixed positive power
of x, while Q/g is at most a fixed power of log x. Increasing the fixed
logarithmic exponent in its modulus condition absorbs the constant between
log V and log x. Its constants need not be effective for this asymptotic
specification.

Imported source: [Tao, Notes 2, Exercise 64, Siegel–Walfisz](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/).
The β convolution and nonprimitive-residue reduction are included above.

By (2) and (3), uniformly in d and K,

$$
           \sum_{k\in K}\beta_V(k)r_Q(dk)
                          \ll_{A,L}{N\over\log^A x}.             \tag{5}
$$

Indeed one can subtract the average W in each gcd class. The cost of summing
Q residue classes and of the local factors is only a fixed logarithmic
power: |r_Q|≤2Q/φ(Q)≤2Q. Absorb it by choosing a larger exponent in (3).

## 3. The local bilinear sum is controlled

Define the same bilinear functional on the joint local model:

$$
 B_Q(x)=\sum_{d>U,\ k>V\atop x/2<dk\le x}
                            \mu(d)\beta_V(k)r_Q(dk).              \tag{6}
$$

Take N=x/d and K=(max(V,x/(2d)),x/d] in (5). Summing over d costs at most
Σ_{U<d≤x/V}x/d≪x log x. Consequently, for every fixed H,L>0,

$$
                    B_Q(x)\ll_{H,L}{x\over\log^H x},              \tag{7}
$$

uniformly for all the specified Q. No cancellation of μ(d) is needed in
this step. This is a theorem about the local model, obtained from a classical
prime-progression theorem; it is not a theorem about B(x).

## 4. The comparison part of reconstruction is also controlled

For an arithmetic function F, write
𝓑(F)=Σ_{d>U,k>V,dk∈J_x}μ(d)β_V(k)F(dk). In fact, for every H>0,

$$
                  \mathcal B(b),\ \mathcal B(b_Q)
                            \ll_H x/\log^H x,                   \tag{8}
$$

uniformly in the choice of the finite prime set for b_Q. This part of the
reconstruction need not be left open.

Here is a proof with uniformity in k explicit. For any set R of odd primes,
including the full set, let f_R(k)=∏_{p|k,p∈R}(p−1)/(p−2). For odd k,
factor f_R(dk)=f_R(k)∏_{p|d,p∈R,p∤k}(p−1)/(p−2). The Dirichlet series
of the d coefficient

$$
 g_{k,R}(d)=1_{d\text{ odd}}\mu(d)
                 \prod_{p\mid d\atop p\in R,\ p\nmid k}{p-1\over p-2}
$$

equals ζ(s)⁻¹H_{k,R}(s), where

$$
 H_{k,R}(s)=(1-2^{-s})^{-1}
       \prod_{p\in R\atop p\nmid k}
       \left(1-{p^{-s}\over(p-2)(1-p^{-s})}\right).
$$

If h_{k,R}(e) are its coefficients, then
Σ_e|h_{k,R}(e)|/√e is bounded by one constant, uniformly in k,R: the odd-prime
absolute Euler factors are 1+O(p^(-3/2)), and the factor at 2 converges.
The convolution g=μ*h and the classical bound
Σ_{n≤t}μ(n)≪_A t/log^A t therefore give, uniformly,

$$
                  \sum_{d\le T}g_{k,R}(d)\ll_A T/\log^A T.
$$

Indeed split e at √T: on the smaller part apply the Möbius bound, and on
the larger use Σ_{e>√T}|h(e)|/e≪T^(-1/4). For the d interval in 𝓑,
all relevant endpoints are at least U or yield an empty interval. Thus its
sum is ≪_A(x/k)/log^A x. Multiplying by β_V(k)≤log x and
f_R(k)≤f(k)≪log log x, then summing k, loses only O(log²x log log x).
The bounded constants 2C₂ and 2C_Q do not affect the argument. Even k give
zero. This proves (8).

The imported Möbius bound is the q=1 case of
[Tao, Notes 2, Exercise 66](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/).
It is applied only after the coefficient is separated multiplicatively;
it cannot be applied in the same way to Λ(dk−2).

## 5. The reconstruction error cannot be hidden

The exact missing term is

$$
 E_Q(x)=B(x)-B_Q(x)
 =\sum_{d>U,\ k>V\atop dk\in J_x}\mu(d)\beta_V(k)
     \left[(\Lambda(dk-2)-A_Q(dk))-(b(dk)-b_Q(dk))\right].        \tag{9}
$$

In view of (7), the sufficient H_B condition is equivalent to
E_Q≥−(1−η)C₂x+o(x) on the chosen scales. It is still **OPEN**. The local
theorem has not estimated this signed reconstruction term.
By (8), its comparison part is negligible. Equivalently,

$$
 E_Q=\mathcal B(a-A_Q)+O_H(x/\log^H x),\quad
 \mathcal B(A_Q)=O_{H,L}(x/\log^H x),\quad
 B=\mathcal B(a)+O_H(x/\log^H x).                               \tag{10}
$$

Thus the unresolved arithmetic is specifically μ(d)β_V(k) against
Λ(dk−2), or against its difference from the local roughness model. All the
comparison and polylogarithmic local terms have been estimated separately.

Moreover an absolute approximation cannot be o(x): uniformly in this Q class,

$$
       \sum_{n\in J_x}|w(n)-r_Q(n)|\ge(\tfrac12+o(1))x.          \tag{11}
$$

To prove (11), restrict the sum to n−2 prime. On these n,
w(n)−r_Q(n)=log(n−2)+O_L(log log x). For A_Q and b_Q, this bound follows
from Q/φ(Q)≪log Q≪_L log log x. Also

$$
 b(n)\le2{n\over\phi(n)}\ll\log\log(3n),
$$

since f(n)/(n/φ(n))≤C₂⁻¹ on odd n. The standard totient bound follows by
splitting prime divisors at log n and using Mertens for the smaller ones.
PNT now gives Σ_{n∈J_x,n−2 prime}log(n−2)=x/2+o(x); the O(log log x)
correction per prime totals o(x). This proves (11).

Inequality (11) does **not** say that E_Q has size at least x. Its coefficients
are signed, so weighted cancellation could still be substantial. It refutes
the proposed o(x) unweighted absolute approximation, not a signed transfer.

## 6. What has been settled

Joint local folds up to polylogarithmic combined modulus, their β-weighted
balance, their local bilinear cancellation, and the comparison terms are
established. The first absolute reconstruction strategy fails by (11). Any
further use of these models must supply a signed bound for (9), retaining
its factor and interval restrictions, or an independently justified
alternative arithmetic input.
More exact local recursions at these depths do not by themselves supply that
bound. The true bilinear remainder and twin-prime infinitude remain open.
