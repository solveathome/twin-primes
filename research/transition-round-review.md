# Transition round: reviewed conclusions and remaining budget

<!-- ledger
id: Q-transition-round-review
status: ANSWERED
todo: C
parity: Integration corrected by transition-round-audit.md. Exact identities and imported one-point norm bounds are distinguished from signed correlations. Finite validators check stated algebra only. Scoped failures do not close broader methods or establish a favorable twin margin.
question: What survives the executed transition round after direct review, and what combined estimate is still missing?
verdict: The energy chain survives at its original scope; the integration's missing cutoff, Mellin representation, fiber identification, normalization and general closure claims are corrected. The exact cofactor and joint-cutoff formulations remain useful. No signed estimate, controlled region, exact cut or sufficient twin margin changed. Only the stated norm-only procedure and the arbitrary-factor fixed-shift relaxation are refuted at their specified scopes.
-->

**The sufficient twin margin remains OPEN.** The completed transition round
produced exact identities and explicit absolute budgets, but no signed
improvement. [transition-round-audit.md](transition-round-audit.md) gives
the direct review and corrections that now govern this integration.

Execution specification: [TRANSITION-RESEARCH-EXECUTION.md](TRANSITION-RESEARCH-EXECUTION.md),
launch `cb51292`, mathematical baseline `0292082`, returned commit `cb957a1`.
The original returned wording remains in Git. Current documents contain
one reconciled assessment, organized by mathematical question.

## 1. Dispositions

| Report | Retained | Corrected or withdrawn |
|---|---|---|
| [Energy review](transition-energy-review.md) | Sharp upper norms, small-fixed-eta lower norms, non-negligible L2 transition; exact-cut and diagonal checks | The cross-prime support interval is only enclosing; prefix positivity does not give dyadic positivity; S(z,z)=1 does not rule out a short-window saving; unretained scratch probes are not evidence; unextracted does not imply ineffective |
| [Source match](transition-source-match.md) | Cofactor exchange, Theta identity, fixed-divisor singleton statement, inspected direct-application mismatches, arbitrary-factor counterexample | Theta's scalar coefficient mass does not price full T; transition Mellin kernel needs the sharp subtraction; cofactor fibers can be long; source rates and parameter costs depend on the representation; no general closure of the papers' methods |
| [Joint budget](transition-joint-budget.md) | Exact four pieces, no support leakage, cutoff-average identities, mixed finite difference, Minkowski comparison for its precise procedure | No general closure of signed cutoff estimates; R_00 need not be bounded separately; the explicit lower constant pays remainder norms; the short-window inference uses a bounded majorant |
| [Signed attempt](transition-signed-estimate.md) | Single-base reduction, proper-power negligibility, correct clipped affine-form kernel, absolute budgets, cutoff-difference identity | rho alone omits the lower cut; no uniform positive clipped fiber length; use the existing stronger proper-power bound; local Input M and the global consumer have separate quantifiers |

No error was found in the original sharp upper/lower argument at its stated
scope. This is a review against named imported statements, not reproduction
of all imported proofs or independent certification of the whole repository.

## 2. Dependencies and available bounds

Fix 0<eta<1/400; the lower norm assertions additionally require
eta<eta_0=min(1/400,L_0/(2880B)). Constants B and A are absolute constants
in the uniform truncated-Mobius and Graham mean-square bounds, enlarged
if necessary. All upper bounds hold for sufficiently large dyadic x.

| Quantity | Derived bound | Inputs and limit |
|---|---|---|
| Sharp squared norms | at most 2B eta x log^2 x(1+o_eta(1)) | Uniform truncated-Mobius mean square and Mertens |
| Transition squared norms | same upper budget; Theta_eta(x log^2 x) for eta<eta_0 | Sharp norm plus the smaller smoothed norm; lower argument pays all cross-prime terms |
| R_00 | absolute budget 2A x log x(1+o_eta(1)) | Graham mean square; no sign or matching lower bound |
| R_10 and R_01 | each at most 2 sqrt(AB eta) x log^(3/2) x(1+o_eta(1)) in absolute value | Cauchy; no signed estimate |
| R_11 | at most 2B eta x log^2 x(1+o_eta(1)) in absolute value | Cauchy; cofactor triangle gives the weaker 4eta^4 x log^4 x budget |
| Proper-power remainder in R_11 | O_epsilon(x^(39/40+epsilon)), epsilon<1/40 | Existing support count and pointwise divisor bound, reused with transition weights <=1 |
| Density replacement | O_H(x/log^H x), every fixed H | Owning uniform signed-divisor grouping derivation |
| E_out | no useful one-sided budget supplied | OPEN |

These are upper budgets, not sizes or lower bounds for the signed terms.
The four separate budgets have the same leading order as direct Cauchy
on R_cor. They do not fit the required margin. The lower norm result
precludes a logarithmic improvement from the exact product of transition
norms alone; it says nothing about the signed shifted inner product.

## 3. Exact consumer and the scope of failures

The exact decomposition is

\[
 E_\dagger=E_{\rm out}+R_{00}+R_{10}+R_{01}+R_{11}
                  +O_H(x/\log^Hx).
\]

The target remains fixed c,K>0 and an unbounded common set of dyadic x
with C_2x+E_dagger>=cx/log^Kx, or a justified cumulative or averaged form.
Input M of the signed note is a **local** one-sided O(x) hypothesis for
R_11's prime part. It only feeds a twin theorem after mixed and outside
budgets on the same scales fit the full margin. A joint estimate may
bypass separate bounds for those components.

The precisely closed statements are:

- For sufficiently small fixed eta, a procedure that averages sharp
  window coefficients, takes triangle inequalities and then Cauchy in n
  cannot have output o(x log^2 x). Minkowski and the transition lower
  norms prove this. Signed cutoff averages are not covered by this closure.
- A fixed-shift cancellation statement uniform against an arbitrary
  bounded second factor, with just one multiplicative factor, is false.
  The explicit lambda counterexample establishes that scope only.

The inspected sources do not directly supply the missing signed estimate.
That is a failed match, not a theorem closing their broader methods.
Singleton fibers in the divisor orientation do not rule out cancellation
in the long cofactor orientation. No universal requirement to beat two
logarithms can be assigned before fixing a representation and all its costs.

## 4. Next bounded research target

Keep the signs before Cauchy. The useful exact interfaces are the clipped
cofactor average and the joint cutoff correlation Phi(S,T). A next attempt
should choose one, state its moving coefficients, prescribed residues,
weights and endpoints, and price a candidate estimate against the complete
common-scale margin. This is a research choice, not a necessary form of a
proof or a claim that a suitable theorem exists.

The cross-prime dyadic sign and the smoothed norm's lower order remain
possible supporting questions. Neither is a prerequisite for a joint
signed argument or by itself advances the twin margin.

## 5. Verification

The four returned validators pass their specific finite checks. They did
not test all the conclusions previously attributed to them: in particular,
the signed validator already used the corrected transition cutoff.
[transition-round-audit-validation.js](transition-round-audit-validation.js)
adds active controls for missing cuts, Mellin ramps, the two fiber
orientations, clipping and invalid cancellation/interval inferences.
Repository mechanical gates check consistency and retained numerical
output; they do not validate an asymptotic theorem or a source application.
