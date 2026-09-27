# Research specification: mixed terms and the combined signed budget

<!-- ledger
id: Q-transition-joint-budget-spec
status: ANSWERED
todo: C
parity: Research brief retaining the signed sum of smoothed, mixed and transition pieces, together with the exact outside remainder. It does not impose separate absolute smallness as necessary or infer positive correlations from norm lower bounds.
question: Can the mixed and smoothed terms be handled jointly with the transition pair, and what complete inequality would make such an estimate useful for the twin consumer?
verdict: Bounded assignment to audit the exact four-term decomposition, price a concrete joint treatment, and return a sufficient one-sided or common-scale inequality with all open terms explicit. The decomposition and existing norm budgets are inputs, not new findings.
-->

**The twin-prime margin remains OPEN.** Execute under the
[core handler's contract](TRANSITION-RESEARCH-EXECUTION.md). Your question
is whether separately bounding R_00,R_10,R_01,R_11 loses cancellation
that can be preserved in a **justified estimate**, and how any useful
bound enters the complete reduction. The handler owns the main R_11
attempt; coordinate without duplicating it.

## 1. Inputs and owned output

Mathematical baseline: `029208295099b60d7a8b837d19eb361cfc12e6b1`.
Read the common contract, [sharp-corner-transition.md](sharp-corner-transition.md)
section 5, and [corner-coefficient-energy.md](corner-coefficient-energy.md)
sections 3–4. For the consumer read
[endpoint-target-audit.md](endpoint-target-audit.md),
[RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) section 3, and
[cross-campaign-synthesis.md](cross-campaign-synthesis.md) for the
common-scale issue. Check the relevant OUTCOMES and QUESTIONS entries.

Planned outputs, to be created during execution:

```yaml
report: research/transition-joint-budget.md
question: Q-transition-joint-budget
optional_validator: research/transition-joint-budget-validation.js
```

Own only this report and, for a new named falsifier, the optional
validator. Shared records and final integration belong to the handler.
Work conditionally if the reviewer disputes an input; state the dependency.

## 2. Exact task and minimum analytic attempt

The definitions and equation (E2) in the common contract fix the object:

\[
 R_{\rm cor}=R_{00}+R_{10}+R_{01}+R_{11},\qquad
 E_\dagger=E_{\rm out}+R_{\rm cor}+O_H(x/\log^H x).
\]

First check the equality and all supports. The auxiliary smoothing
does not alter E_dagger or the controlled cuts. The four individual
norm-based budgets are already known; reproducing them is a consistency
check, not completion of this assignment.

Then undertake at least one concrete analytic attempt on a mixed term
or a specified combination of the four pieces. State what structure
the estimate retains before Cauchy or a triangle inequality. Possible
starting points are the logarithmic cutoff integral, cancellation
between nearby cutoff differences, or grouping a mixed term with the
transition pair. Choose a mechanism and derive its actual cost; merely
listing these possibilities is not a return.

For every proposed grouping:

- Write the exact coefficient or kernel after grouping, with both
  shifted endpoints and all divisor/cofactor branches present.
- Identify the signed quantity that the method bounds and the first
  operation, if any, that discards cancellation.
- Price cutoff variation, parameter integration, smoothing error,
  approximation terms and all logarithmic or power losses.
- Compare the resulting inequality with the existing joint budget.
  If it does not improve it, isolate the first limiting term.

One-point Gram positivity does not imply positive cross-correlation at
shift 2. Conversely, large separate norms do not show that the four
signed pieces cannot cancel. Any claimed obstruction must name the
particular proposed inequality and prove failure at its stated scope.

## 3. State an actual sufficient consumer

Provide a table for R_00,R_10,R_01,R_11 and E_out, or for a disjoint
grouping of them. Mark each bound as derived, imported, conditional or
open. Give its sign, scale set and contribution after normalization by
x. Do not silently drop an open entry or count a term twice.

One admissible conditional specification is the following. Write
B_mix=R_00+R_10+R_01. On a **common unbounded set** of dyadic x,
suppose the deductions actually supply

\[
 R_{11}\ge-F_{11}(x),\quad B_{\rm mix}\ge-F_{\rm mix}(x),
 \quad E_{\rm out}\ge-F_{\rm out}(x),
\]

with specified error functions, and

\[
 F_{11}+F_{\rm mix}+F_{\rm out}
       \le C_2x-2c x/\log^Kx
\]

for fixed c,K>0. Choosing fixed H>K in the remaining error would then
give the sufficient positive margin for all sufficiently large x in
that set. This is a **template of a conditional implication**, not a
bound supplied by the assignment. Determine whether your proposed
mechanism provides any of its actual inputs. A joint lower estimate
for the entire sum is also admissible and may retain more cancellation.

A sufficiently strong rescaled-average or cumulative consumer is
equally acceptable. If using one, give the precise sampling,
exceptional-set and uniformity argument. The earlier dyadic transfer
for the multiplicative subfamily is not automatically a transfer for
these full coefficients. No necessity of separate componentwise o(x)
estimates is assumed.

## 4. Required return and stopping rule

Return the checked decomposition, the concrete attempted joint or mixed
estimate, its complete cost table, and the strongest justified combined
inequality. Distinguish an actual improvement from a conditional
specification and from a reformulation. A conditional statement must
name the exact unproved lemma and the line where it is needed.

For a failed attempt, state whether the loss came from a norm bound,
boundary term, coefficient separation, scale alignment or another
identified step. Preserve any reusable identity. Do not convert an
unestimated E_out into a claimed impossibility for the corner method.

Use exact finite checks only for a named gap in the algebra; do not
infer a sign or asymptotic rate from a finite matrix. Return proposed
OUTCOMES and next-step text to the handler. Stop after the specified
attempt and complete accounting are written, or after a decisive defect
has been identified and its dependency consequences supplied. Proving
the entire outside remainder is not required to complete this bounded
assignment; leaving it explicitly open is required when it is unproved.
