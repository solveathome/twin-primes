# First attack on the specified bilinear remainder

<!-- ledger
id: Q-bilinear-fold-first-attack
status: ANSWERED
todo: C
parity: The exact least-prime-factor expansion retains Mobius signs for the shifted-prime remainder B. A direct Cauchy-Schwarz bound produces two-linear-form correlations not supplied by the established single-progression BV input. This diagnoses these estimates only; no impossibility theorem for other fold arguments is claimed.
question: Does assigning each Mobius factor to its first fold, or applying a direct second-moment bound, establish the missing one-sided estimate?
verdict: The first-fold identity yields no saving; a direct second moment has a negligible diagonal and an open two-prime off-diagonal. Fixed-fold covariance is an exact residue-imbalance square and the beta weights balance at each fixed modulus. Growing-depth joint control remains OPEN; B>=-C2*x+o(x) is not improved.
-->

Internal attack record, 2026-09-05. **No new cancellation bound is obtained.**
Use all definitions from [prime-detection-spec.md](prime-detection-spec.md).
This executes the first decomposition and estimate attempt; it is not a
proposal to repeat them. Exact algebra checks are in
[prime-detection-validation.js](prime-detection-validation.js).
The [joint local continuation](polylog-fold-transfer.md) establishes uniform
control at polylogarithmic modulus and leaves the signed reconstruction open.

## 1. Assigning a factor to its first fold

Let P⁻(s) be the least prime factor, with P⁻(1)=∞. Terms with squareful d
have μ(d)=0. For squarefree d>1 there is a unique factorization d=qs with
q prime and P⁻(s)>q, and μ(d)=−μ(s). Hence, exactly,

$$
 B(x)=-\sum_{q\text{ prime}}\sum_{s\ge1\atop P^-(s)>q}
       \sum_{k>V\atop qs>U,\ x/2<qsk\le x}
                     \mu(s)\beta_V(k)w(qsk).                     \tag{1}
$$

The strict least-factor condition excludes q|s. Including q again in s
would invalidate the sign identity. Squareful s need not be excluded
separately because μ(s)=0. The s=1 branch must remain.

This is the factor ancestry that the fold language can track. Replacing μ(s)
by |μ(s)| destroys its sign, and the equality itself gives no bound on the
shifted-prime term Λ(qsk−2). It is classical least-prime-factor bookkeeping,
not an extra distribution theorem.

An absolute-value estimate is insufficient at the required scale. Since
β_V(k)≤log k and b(n)≤2τ(n),

$$
 |B|\le\log x\sum_{n\in J_x}\tau(n)
                          \bigl(\Lambda(n-2)+b(n)\bigr)
                         \ll x\log^4x.                          \tag{2}
$$

Here Σ_{n≤x}τ(n)≪x log x and Στ(n)²≪x log³x suffice. The latter follows
from τ(n)²≤τ₄(n) and the elementary four-divisor sum bound. Formula (2)
does not improve the already available B≥−C₂x+o(x).

## 2. The direct second moment and its exact remaining input

Partition U<d≤x/V into O(log x) blocks D_M⊂(M,2M], starting with M=U and
clipping the last block at x/V. Put

$$
 B_M=\sum_{d\in D_M}\mu(d)\sum_{k\in K_d}\beta_V(k)w(dk),\qquad
 K_d=\{k>V:x/2<dk\le x\}.
$$

Cauchy–Schwarz gives

$$
 |B_M|^2\le2M\sum_{d\in D_M}
       \left|\sum_{k\in K_d}\beta_V(k)w(dk)\right|^2
            =2M\bigl(\mathcal D_M+\mathcal E_M\bigr),             \tag{3}
$$

where the factor 2 accommodates integer endpoints, and

$$
 \mathcal D_M=\sum_{d\in D_M}\sum_{k\in K_d}
                                  \beta_V(k)^2w(dk)^2,
$$
$$
 \mathcal E_M=\sum_{k_1\ne k_2}\beta_V(k_1)\beta_V(k_2)
       \sum_{d\in D_M\atop k_1,k_2\in K_d}w(dk_1)w(dk_2).        \tag{4}
$$

These are real sums; the off-diagonal is signed. No absolute values have
been inserted inside (4). Every endpoint intersection remains explicit.

**The diagonal is affordable.** All k in a block lie between x/(4M) and
x/M, so the two coordinate lengths have product O(x). Use

$$
 w(dk)^2\le2\log^2x+8\tau(dk)^2
            \le2\log^2x+8\tau(d)^2\tau(k)^2.
$$

The divisor second-moment bounds then give, uniformly,

$$
 \mathcal D_M\ll x\log^8x,\qquad
 \sqrt{M\mathcal D_M}\ll x^{22/25}\log^4x.                       \tag{5}
$$

We used M≤x/V≪x^(19/25), including its fixed floor constant. Summing the
last bound over O(log x) blocks remains o(x). Thus this direct method does
not fail on its diagonal.

**A sufficient off-diagonal estimate, OPEN**, is the uniform upper bound

$$
                \mathcal E_M\ll {x^2\over M\log^6x}              \tag{6}
$$

on the same unbounded scales and all these blocks. With (5), (3) implies
|B_M|≪x/log³x+√(Mx)log⁴x and hence B=o(x). This would give more than
infinitude: the full weighted main term in the specification. Consequently
(6) is a stronger research target than the one-sided H_B; it is a diagnostic
of this Cauchy–Schwarz attempt, not the new mandatory destination.

## 3. Why the available progression theorem does not finish it

For k₁≠k₂, the summand in (4) expands as

$$
 \begin{split}
 w(dk_1)w(dk_2)
 ={}&\Lambda(dk_1-2)\Lambda(dk_2-2)\\
 &-\Lambda(dk_1-2)b(dk_2)-b(dk_1)\Lambda(dk_2-2)
       +b(dk_1)b(dk_2).                                         \tag{7}
 \end{split}
$$

The first term concerns two distinct linear forms in the same d. The
Type I estimate already proved concerns one linear progression at a time;
it does not provide the joint estimate (6). Nor does the known local-density
formula for b authorize replacing a product of prime weights by a product
of local means. Shared local obstructions between the two forms must remain.

For example, even k makes dk−2 even, so the corresponding prime weight is
supported only at powers of 2. For odd k₁,k₂, the possible coincidences of
the two forbidden residues modulo an odd prime depend on k₁−k₂ and on
which kᵢ are divisible by that prime. An independence assumption would
already misstate this elementary local structure.

The exact expansion exposes what this attempted bound would need. It does
not show that (6) is true, that it is the weakest possible input, or that
all arithmetic methods meet the same obstruction. Applying Cauchy–Schwarz
has also discarded μ(d); a future approach retaining those signs could
require less than this full second moment.

## 4. The fixed-fold covariance check

Before accepting (6) as a useful target, check whether one fixed fold forces
an unremoved covariance main term. This check can be done exactly. For an
odd prime q define its normalized local factors

$$
 A_q(t)={q\over q-1}1_{q\nmid t-2},\qquad
 b_q(t)=\begin{cases}q/(q-1)&q\mid t,\\
 q(q-2)/(q-1)^2&q\nmid t,\end{cases}
 \qquad r_q(t)=A_q(t)-b_q(t).
$$

The factor b_q is the conditional mean of A_q given whether q divides t.
It is also the q factor of the comparison product C₂f(t). Directly averaging
over d modulo q gives

$$
 K_q(i,j)={1\over q}\sum_{d\bmod q}r_q(di)r_q(dj)
 =\begin{cases}
 0&q\mid ij,\\
 q(q-2)/(q-1)^3&i\equiv j\not\equiv0\pmod q,\\
 -q/(q-1)^3&i,j\not\equiv0,\ i\not\equiv j\pmod q.
 \end{cases}                                                     \tag{8}
$$

To verify the formula, d=0 contributes zero; for nonzero d, r_q(di) equals
−q(q−2)/(q−1)² at the single residue d=2/i and q/(q−1)² elsewhere.
Coincident and distinct excluded residues give the two nonzero cases.

For real cofactor weights t_k, let W_a=Σ_{k≡a mod q}t_k for a≠0 and
W̄=(Σ_{a≠0}W_a)/(q−1). Then (8) gives the exact identity

$$
 \sum_{i,j}t_it_jK_q(i,j)
       ={q\over(q-1)^2}\sum_{a\ne0}(W_a-\overline W)^2.          \tag{9}
$$

The off-diagonal version subtracts
q(q−2)/(q−1)³ times Σ_{q∤k}t_k². Thus the local covariances cannot simply
be discarded, but they do not force a positive leading term when the
nonzero residue masses are equal.

For t_k=β_V(k) on any interval K⊂[1,N], with V≤N≤x, the masses in nonzero
classes of a **fixed** q are equal up to O_{q,A}(N/log^A x) for every fixed
A. Indeed, expand β as Σ_{ℓr=k, ℓ>V}Λ(ℓ). Only r coprime to q contribute
to nonzero classes. Fixed-modulus PNT for ℓ in the class ar⁻¹ gives a main
term independent of a. Its error, summed over r≤N/V, is bounded by
O_q(N log x exp(−c_q√log V)); here V is a fixed positive power of x.
Subtracting interval endpoints gives the same conclusion for K.
The imported prime-progression error is the fixed-modulus case of
[Tao, Notes 2, Exercise 64 (Siegel–Walfisz)](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/);
only the fixed-q consequence is used here.

**Scope:** (8)–(9) concern a single local factor, not the actual w(dk) in
(4). The full shifted-prime remainder is not a sum of these r_q. Neither
the fixed-q PNT argument nor multiplying finitely many local identities
provides a uniform bound as the fold depth grows with x. This check rules
out a fixed-fold residue imbalance as a forced leading term in this local
model; it does not establish (6).

## 5. Disposition

The input specification and its conditional positive payoff are established
using classical inputs. The first-fold decomposition and the direct second
moment have now been executed. Their elementary estimates do not provide
the missing one-sided saving. No correlation sweep is warranted by this
calculation, because it supplies no new asymptotic mechanism to test.

The fixed-fold covariance has also been checked: it is controlled by
nonzero-residue imbalance, and fixed-modulus PNT balances the specific β
weights. The remaining problem is uniformity across growing fold depth and
the actual simultaneous-primality constraint, with the coefficient signs
retained where possible. A proposed next theorem must cover that joint
problem and its error budget, rather than repeat a fixed-modulus calculation.
If (6) fails, retain H_B and the μ signs rather than interpreting the failure
as an obstruction for B. No currently established input here improves the
one-sided boundary B≥−C₂x+o(x).
