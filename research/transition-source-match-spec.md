# Research specification: match a theorem to the transition coefficients

<!-- ledger
id: Q-transition-source-match-spec
status: ANSWERED
todo: C
parity: Primary-source matching brief for signed correlations of the complete transition coefficients. It does not infer cancellation from one-point norms or treat a multiplicative subfamily theorem as a theorem for the full divisor convolution.
question: What bounded source investigation could supply a usable signed estimate for the transition kernel, and how must its hypotheses and losses be priced?
verdict: Specification for up to three detailed source-interface assessments, including coefficient representation, scale quantifiers, normalization, separation errors and exact downstream payoff. No new theorem match or literature-absence result is claimed.
-->

**The twin-prime margin remains OPEN.** Execute under the
[core handler's contract](TRANSITION-RESEARCH-EXECUTION.md). Search for an
estimate or a precisely adaptable proof mechanism for its R_11, the
complete shifted product T_L(n)T_R(n-2). The changed object is the exact
transition divisor weight in (E1), not the previously searched bounded
multiplicative prime-cofactor subfamily.

## 1. Inputs, boundaries and owned output

Mathematical baseline: `029208295099b60d7a8b837d19eb361cfc12e6b1`.
Read the common contract and [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md)
before searching. Read [sharp-corner-transition.md](sharp-corner-transition.md),
[corner-coefficient-energy.md](corner-coefficient-energy.md) section 4.1,
[cross-campaign-synthesis.md](cross-campaign-synthesis.md) sections 3–6,
and [next-correlation-source-map.md](next-correlation-source-map.md).
Follow the relevant OUTCOMES and QUESTIONS entries. Check the actual
failed hypotheses before excluding a previously inspected source.

Planned output, to be created during execution:

```yaml
report: research/transition-source-match.md
question: Q-transition-source-match
```

A companion numerical script is optional only for a named algebraic or
parameter check. You own your report and that script, not the shared
import map, search register or baseline notes.
Propose changes to those records for the handler to integrate.

The source search can proceed while the energy audit runs. Use any
disputed baseline estimate conditionally until the handler resolves it.
Do not conduct another unrestricted literature census. Screen candidates,
then deeply assess **at most three distinct interfaces** in this round.
Revisiting a known mismatch requires a changed theorem, proof mechanism,
coefficient representation or consumer, stated before doing the work.

## 2. Search against an explicit interface

Use the owning vocabulary: signed correlations of truncated Mobius
divisor sums, shifted convolutions, sieve weights and their smoothings,
and the relevant bilinear or multiplicative-factorization methods.
The common contract defines every cutoff and coefficient. In particular,

\[
 T_i(m)=\sum_{d\mid m,\ D_i<d<z_i}
             \mu(d)\rho_i(d)\beta_{W_i}(m/d).
\]

These are x-dependent divisor sums. Their squareful inputs, small
cofactors, signed divisor weights and sharp lower boundary are part of
the object. A one-point mean-square theorem or an arbitrary smooth
weight assumption alone does not estimate their shift-2 product.

For each candidate, fill this comparison before declaring a match:

| Axis | Required accounting |
|---|---|
| Function class | Does it include T_L,T_R, or is there a proved representation? Identify every excluded prime-power, cofactor or squareful sector and its full cost. |
| Dependence on x | Which functions can vary with the outer scale? Are constants uniform in the frozen cutoffs and in any integration/twist parameters? |
| Shift and interval | The shift is exactly 2 and n lies in J_x; retain n-2 on the right. An average over free shifts or unrelated long intervals needs a justified conversion. |
| Weights and boundaries | Price the discontinuity at D_i, smoothness assumptions, supremum and variation norms, parameter-integral mass, truncation and separation errors. |
| Coefficient dependence | Do the separated factors meet the theorem's independence requirements? A weight depending jointly on both summation indices is not automatically separable. |
| Arithmetic exceptions | Keep compatible gcd branches, nonprimitive frequencies when relevant, exceptional prime divisibility, singleton terms and complete periods. |
| Rate and normalization | Convert the result to the actual unnormalized R_11 and report every power of x, log x, eta and any x^epsilon. |
| Scale quantifiers | State every-scale, dyadic, cumulative or averaged scope, exceptional sets, and the cost of sampling or freezing moving parameters. |
| Consumer | Say whether the result is intermediate, sufficient for this component, sufficient for the whole corner, or sufficient only conditionally after estimating E_out. |

If using the small-prime identity from coefficient-energy (16), preserve
p<=W_i, p not dividing n and fixed cutoffs. Bound the exceptional terms
and the entire resulting arithmetic sum. A pointwise small difference
of cutoff weights is not automatically a small convolution.

## 3. Required cost calculation

For example, if the method needs a representation with total coefficient
mass M(x), a normalized correlation bound a(x), and an approximation
error E(x), write the resulting bound in the form actually obtained,
such as x M(x) a(x)+E(x). Derive M and E; do not assume they are one
or negligible. If there are two representation norms, retain both.

The current absolute budget for R_11 is O_eta(x log^2 x). A derived
O_eta(x log^(2-delta) x) estimate with fixed delta>0 is an intermediate
gain. On its own this is o(x) only when delta>2; delta=2 yields O(x),
whose constant and sign must be addressed separately. This is one
sufficient absolute route, not a necessary threshold for a direct
one-sided or global averaged argument. Mixed terms and E_out remain.
State the sign explicitly: R_11 enters (E2) with a plus sign, so a direct
one-sided consumer needs a lower bound. An upper bound for an auxiliary
moment is useful only through its derived connection to that consumer.

If the theorem is averaged, write its actual exceptional-set bound and
the combined consumer. Do not demand every-dyadic control as a universal
gate, or assume that independent unbounded good sets intersect. Do not
spend an unspecified x^epsilon when claiming a fixed logarithmic gain.

## 4. Source custody, outcomes and stop rule

Use primary statements and relevant proof steps. Record title, authors,
URL, version/date, theorem/equation number, exact hypotheses and access
status; retain the PDF hash when a PDF is used. Distinguish a statement
match from a checked adaptation of its proof. Flag an unread proof,
missing source or erratum dependency; do not fill it by inference.

Return one detailed sheet per examined interface, each with the exact
substitution, all costs and one of these conclusions:

- Directly applicable, with the derived bound and complete scope.
- A proved adaptation, with the new argument and its remaining imports.
- Conditional on an explicitly written unproved lemma.
- Mismatched or insufficient, with the first decisive failed step and
  the changed input that would make a revisit useful.

Send a candidate usable lemma to the handler promptly, but retain its
qualification until checked. Stop once the bounded set of interfaces
has been fully priced, or a usable match has been developed far enough
for integration. Provide proposed search-register/import-map changes
and an OUTCOMES entry organized by question. A scoped negative is a
valid completed return; it is not evidence that all mathematics has
been exhausted.
