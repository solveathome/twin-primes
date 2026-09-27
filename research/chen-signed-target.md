# After Chen: one signed estimate that would suffice for twins

<!-- ledger
id: Q-chen-signed-target
status: PARTIAL
todo: C
parity: The extra input is a one-sided Liouville estimate for the explicitly defined Chen-weighted shifted-prime sum R on infinitely many dyadic long intervals. It is OPEN; classical BV and unsigned switching do not supply it.
question: What exact additional arithmetic estimate would turn the completed Chen benchmark into a proof of infinitely many twin primes?
verdict: An elementary prime minorant gives a conditional twin theorem with all weights, ranges, quantifiers and errors specified. The opportunity audit identifies an avoidable negative-weight penalty and a separate-estimate budget that fails even under component cancellation; this sufficient target remains OPEN and is not the sole next proof obligation.
-->

Internal research specification, 2026-09-05. Definitions I_x, z, r, χ_z,
k, b, e, W, Q and c₀=C₂/40 are those of
[chen-fold-benchmark.md](chen-fold-benchmark.md). The numerical and algebraic
validator is [chen-benchmark-validation.js](chen-benchmark-validation.js).

**Calibration:** the implication below is elementary; its new estimate is
**OPEN**. It is a sufficient research target, not a claim that a new route
through the parity problem has been found.

The [opportunity audit](chen-opportunity-audit.md) determines what this fixed
weight costs and why arithmetic inputs must be matched to a prime-detecting
weight. Hη is retained as a diagnostic sufficient condition.

## 1. A prime minorant, including the unwanted factor counts

Let λ(m)=(−1)^Ω(m), with multiplicity. For m in the benchmark range,

$$
 V_x(m):={1-\lambda(m)\over2}W_x(m)\le1_{m\text{ prime}}.             \tag{1}
$$

Proof. For Ω=1, W≤1. For Ω=2, the prefactor is zero. For Ω≥3, the Chen
lemma gives W≤0 and the prefactor is nonnegative. Thus odd composites with
three or more factors never become false positive primes. They can give
negative contributions, which must remain in the bound. ∎

Define the single new signed quantity

$$
 R(x)=\sum_{n\in I_x}\Lambda(n)\chi_z(n+2)
                         \lambda(n+2)W_x(n+2).                      \tag{2}
$$

If $T_\Lambda(x)=\sum_{p\in I_x,\ p,p+2\text{ prime}}\log p$, then

$$
 T_\Lambda(x)\ge {Q(x)-R(x)\over2}-E_{\rm pp}(x),\qquad
 0\le E_{\rm pp}(x)\ll\sqrt x\log^2x.                              \tag{3}
$$

Indeed (1) bounds the Λ-weighted sum by prime partners; subtract the terms
whose opener is a proper prime power. One may take E_pp to be the sum of
Λ over all proper prime powers in I_x. For actual twin pairs at large x,
χ_z=1. The benchmark proves Q(x)≥c₀x/log x eventually.

## 2. The additional estimate and its quantifiers

**Hη (OPEN).** There exist a fixed η∈(0,1) and an unbounded set of integers
J such that, for x=2^j, j∈J,

$$
 R(x)\le(1-\eta)Q(x)+e(x),\qquad
             |e(x)|=o(x/\log x)\quad(j\to\infty,\ j\in J).          \tag{H}
$$

All factor restrictions in (2) remain in force. The small-o is on these
same intervals and with the fixed weight W; it cannot be borrowed from an
unrestricted shifted-prime average or an average over tile phases.

**Conditional theorem.** Hη implies infinitely many twin primes. In fact it
gives $\gg_\eta x/\log^2x$ twin pairs in I_x along J.

Proof. The benchmark and (H) give Q−R≥ηc₀x/log x−|e(x)|. For sufficiently
large x in the selected sequence, |e|≤ηc₀x/(4 log x) and
E_pp≤ηc₀x/(8 log x). Equation (3) is then at least
ηc₀x/(4 log x). Dividing by log x gives the count. Its openers tend to
infinity since n≥x/2. ∎

Hη asks for a positive proportion on a subsequence and is stronger than
mere infinitude requires. A smaller positive defect Q−R exceeding 2E_pp
would already give one pair on each successful scale. Neither inequality
is proved here. Calling a target TPC-strength is not a proof of circularity;
proposing (H) without an independent derivation also does not advance it.

## 3. The actual factor/cofactor interface

Let

$$
 R_1=\sum_{n\in I_x}\Lambda(n)\chi_z(n+2)\lambda(n+2),\quad
 R_2=\sum_{n\in I_x}\Lambda(n)\chi_z(n+2)\lambda(n+2)k_x(n+2),
$$
$$
 R_\square=\sum_{n\in I_x}\Lambda(n)\chi_z(n+2)\lambda(n+2)e_x(n+2).
$$

Exactly, including square factors,

$$
 R=R_1-\tfrac12R_2+\tfrac12A_3-\tfrac12R_\square,\qquad
 |R_\square|\le E_\square=o(x/\log x).                              \tag{4}
$$

The **plus** sign before A₃ matters: on its three-factor support λ=−1.
Thus a proposal to cancel only R₁ must still pay the other terms.
Complete multiplicativity, including q|v, gives the exact identity

$$
 R_2=-\sum_{z\le q\le r\atop q\text{ prime}}
          \sum_{x/2+2\le qv\le x}
               \Lambda(qv-2)\lambda(v)\chi_z(v).                    \tag{5}
$$

Here q is an actual prime factor and v an actual cofactor, not two divisor
moduli. For a block q∼M, the range is v∼x/M, with

$$
 x^{1/8}\lesssim M\lesssim x^{1/3},\qquad
 x^{2/3}\lesssim v\lesssim x^{7/8},
$$

and the exact product inequalities in (5) govern the constants and endpoints.
Prime-restricted unit-weight versions of (4) and (5) are independently
enumerated by the validator; the general identities follow algebraically.

This supplies a place to state an arithmetic estimate. It supplies no such
estimate by itself. In particular:

- Prime BV controls unsigned arithmetic-progression discrepancies. It does
  not assert cancellation of λ(v) against Λ(qv−2) with these restrictions.
- The switched theorem in the benchmark concerns a nonnegative triple-product
  sequence. Multiplying it by λ on a shifted argument changes its hypotheses.
- The PNT cancellation of an unweighted one-variable Liouville sum cannot
  discard the shifted-prime weight or the roughness and product constraints.
- Taking absolute values term by term destroys the sign needed in (4).
  A proof must bound the combined expression at the scale of Q, not merely
  show that some individual correlation tends to zero after normalization
  by a larger mass.

The earlier [bilinear-transplant audit](history/staging/attack-bilinear-transplant.md)
tested different certificates and short stretches; its density mismatch is
not removed by relabelling those intervals. This benchmark instead uses a
long interval from the outset. Likewise the
[lambda-ledger experiment](history/staging/attack-lambda-ledger.md) tested a
large, shift-specific covariance anomaly. We neither repeat that experiment
nor infer that small covariance would be useless.

## 4. Choosing the next proof obligation

On actual prime openers the exact expression Q_P−R_P is twice the weighted
twin count **minus** twice a nonnegative odd-composite penalty L. Clipping W
at zero removes that penalty but leaves an unestimated signed sum. Also,
even if R₁−R₂/2=o(x/log x), the benchmark's separate estimates in (4) give
a negative lower-bound coefficient for Q−R. These statements are proved in
[chen-opportunity-audit.md](chen-opportunity-audit.md); they do not refute Hη.

The resulting [input/weight specification](prime-detection-spec.md) proves the
ordinary progression estimates for a locally correct comparison sequence and
gives a positive conditional payoff from a specific bilinear bound. The
[first fold attack](bilinear-fold-attack.md) executes the least-factor and
second-moment calculations without obtaining the missing saving. Its growing-
depth joint estimate remains open. These notes supersede the task of choosing
a concrete input package; Hη here remains a valid diagnostic condition.

Only once such a mechanism makes a testable prediction should a numerical
experiment be designed for it. The present computation checks definitions,
signs, endpoints and the classical constant. It is not an asymptotic
correlation sweep and supplies no evidence that (H) holds. The immediate
research uncertainty is the estimate itself, not the precision of the old
G₂ fit or the height of another tile computation.
