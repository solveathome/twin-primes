# Research specification: independent review of the sharp energy

<!-- ledger
id: Q-transition-energy-review-spec
status: ANSWERED
todo: C
parity: Independent-review brief only. The assigned audit must check all off-diagonal and exceptional terms before accepting a one-point lower bound. No new review result or shift-2 cancellation is asserted here.
question: What independent checks are required before the sharp-energy and non-negligible-transition conclusions can guide the next signed research attempt?
verdict: Bounded review assignment with explicit source, algebra, interval, error and quantifier checks; per-claim verdicts and dependency consequences are required. The assignment is specified, not executed.
-->

**The twin-prime margin remains OPEN.** Execute this specification under
the [core handler's contract](TRANSITION-RESEARCH-EXECUTION.md). Your role
is to try to break the load-bearing argument in
[sharp-corner-transition.md](sharp-corner-transition.md), then report what
survives at its actual scope. Agreement with an existing label is not
evidence. The reason for this review is specific: the new lower bound
determines whether a negligible smoothing transfer should be excluded.

## 1. Scope, inputs and output ownership

Mathematical baseline: `029208295099b60d7a8b837d19eb361cfc12e6b1`.
Record the actual launch commit. Read the common contract, repository
rules, relevant question/outcome records, the entire sharp-transition
note, and [corner-coefficient-energy.md](corner-coefficient-energy.md).
Use [corner-correlation.md](corner-correlation.md) sections 1.1–1.4 for
the original cuts, full coefficient and density replacement.

Planned outputs, to be created during execution:

```yaml
report: research/transition-energy-review.md
question: Q-transition-energy-review
optional_validator: research/transition-energy-review-validation.js
```

Create the validator only for a new named finite falsifier. These are
future outputs, not existing results. Follow the shared-file ownership
and reporting rules in the handler contract.

## 2. Required mathematical checks

Give a separate disposition for every row. A reproducible finite check
can support an algebraic step; it cannot certify an asymptotic input.

| Check | Exact question to settle |
|---|---|
| A1. Full coefficient | Does inversion (2) retain every prime power with weight log p, cancel r=n, and vanish for 1<m<=D? Is the upper divisor cut redundant on both actual intervals? |
| A2. Sharp source | Does the de la Breteche–Dress–Tenenbaum input supply both the uniform S(N,D)<=BN bound and its stated asymptotic in the full long-cutoff range used? Check source parameters, absolute constants and L_0>0. |
| A3. Sharp upper norm | Re-derive (5)–(7), including weighted Cauchy, r<R, the reciprocal Mangoldt sum, floors and the right endpoint x-2. Distinguish squared norms from the shifted-product bound. |
| A4. Proper powers | Re-derive the support count and reciprocal-power tail behind (8), specify epsilon, and check that the L2 error is negligible relative to sqrt(x) log x on each actual interval. |
| A5. Prime expansion | Check every term of (9)–(10), including repeated prime divisibility in the remaining cofactor and ordered p!=q pairs. |
| A6. Cross-prime identity | Verify R<D and x/W^2<D; treat m=1, p dividing m and q dividing m explicitly before using (12). Re-derive the uniform absolute cross budget from the two scalar mean squares. |
| A7. Dyadic diagonal | For p<=x^(w+eta), verify xi=x^(eta/2) satisfies the source range at both endpoints, including (x/2-2)/p. Justify subtracting the two asymptotics uniformly and the PNT partial summation. |
| A8. Lower bound | Verify the coefficients L_0 w eta/8 and 9B eta^2, the restriction eta<L_0 w/(144B), and one positive eta range for both sides. Do not extract a numerical threshold from an unbounded implied constant. |
| A9. Smoothing transfer | Check the Graham input and the N<z_2 rescaling in coefficient-energy (10)–(14); then verify the reverse triangle inequalities leading to (17)–(18). |
| A10. Signed/global scope | Check (19)–(20), support and compatibility, and the density replacement used to relate the corner to E_dagger. Verify that no individual norm lower bound has been turned into a shifted-correlation lower bound. |

For A2 read the primary source at its pinned version, not a secondary
summary: de la Breteche–Dress–Tenenbaum,
[*Remarques sur une somme liee a la fonction de Mobius*](https://tenenb.perso.math.cnrs.fr/PPP/Sxz.pdf),
(1.5), Theorem 1.1, and the relevant proof steps. The baseline hash is
in sharp-corner-transition section 2. For A9 follow the Graham/Chen An
source and hash in coefficient-energy section 3. State separately which
published results you import, which proof steps you inspected and which
parts you independently derived. This is not an assignment to re-prove
every upstream analytic theorem from first principles.

## 3. Attempted falsifications

Target the actual failure modes: loss of a singleton, coprimality or
interval condition; a p^a weight changed to log(p^a); a missing factor
from ordered pairs; using a prefix asymptotic without both endpoints;
or choosing eta or epsilon depending on x. Test squareful inputs where
a squarefree-only model would vanish.

Inspect [sharp-corner-transition-validation.js](sharp-corner-transition-validation.js)
and [cross-campaign-validation.js](cross-campaign-validation.js). Their
green output is not an independent derivation. Reuse a test when it
addresses your named concern. Add a new exact check only if it attacks
an uncovered step; do not clone the existing validators or fit a finite
exponent to certify (17). An algebraic counterexample outside a claimed
range is a control, not a refutation within that range.

## 4. Return and acceptance criteria

Use the common report format and provide a table with columns:
claim/equation, checked hypotheses, decisive calculation, disposition,
remaining dependency, and proposed correction. Distinguish:

- **Survives at stated scope:** the required deduction is checked, with
  named imported inputs still identified as imports.
- **Needs a repair:** give the exact missing step or citation and a
  correction if available; say which downstream claims depend on it.
- **Incorrect at stated scope:** supply a counterexample or a decisive
  contradiction, plus the strongest surviving replacement.
- **Unresolved in this review:** name precisely what could not be checked.

Do not use a single blanket PASS to hide an unverified source dependency.
The most important final distinction is whether the **upper norm**, the
**small-fixed-eta lower norm**, and the **failed negligible transition**
each survive. Failure of one does not automatically invalidate the others.

Notify the handler immediately of a decisive defect; do not edit the
owning baseline documents yourself. Finish with the proposed OUTCOMES
entry and exact downstream changes. Stop after every required row has
a reasoned disposition. A full signed estimate, a new census and a
global twin proof are outside this review assignment.
