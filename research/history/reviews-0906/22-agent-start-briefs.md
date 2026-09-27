# Executed briefs of the 2026-09-06 bounded round

<!-- ledger
id: Q-agent-start
status: ANSWERED
todo: C
parity: Archived execution record only. The briefs below were run once and are retained as the record of what was asked; no estimate or twin margin is claimed.
question: What exactly were workers A, B and C asked to do in the bounded round of 2026-09-06?
verdict: Record of the three briefs as dispatched from commit 10f6491, with their file ownership, acceptance criteria and stopping rules. Their outcomes are integrated in AGENT-START.md section 3 and the owning notes; the briefs are not to be re-dispatched without a changed hypothesis.
-->

These are the briefs as they stood in `AGENT-START.md` when the round was
dispatched. Outcomes: [next-transfer-review.md](../../next-transfer-review.md),
[corner-branch-diagnostic.md](../../corner-branch-diagnostic.md),
[next-correlation-source-map.md](../../next-correlation-source-map.md).

## 3. Copy-ready briefs (as dispatched)

Use one brief per worker. Each worker owns only its named new files.
Do not edit shared state, generated indexes or another worker's files.
Reports carry a ledger block with the assigned id, `todo: C` and an
honest `parity:` line. The coordinator integrates them in one pass.
No nested delegation. Return when the acceptance criteria are met or
the specified missing input is identified; do not expand the campaign.

### A. Adversarial verification of the new transfer

**Question:** does `prime-band-transfer.md` (1)--(6) follow at exactly
its stated scope? This is a fresh correctness check of a newly written
derivation, not an instruction to strengthen it.

**Read:** that note; review 21 F6--F7; the primary source
arXiv:2512.01739v2 Theorem 3.1(ii), Remarks 3.2 and the definition of M.
The source hashes are in the owning note. Also check MRT equation
(1.12), which justifies the safe parameter L=(log X)^(1/4); do not
replace it by L=log X. Do not reprove the source theorems.

**Check separately:** multiplicativity on coprime inputs; the uniform
O(1) pretentious-distance comparison for all Fourier parameters;
integrability and the order of Tonelli; functions fixed for each outer
X; no common-exceptional-set assumption; exact moving windows; CRT error
versus N>=sqrt(X); the number of mesh intervals; and the final
continuous-versus-dyadic distinction. Use adversarial examples to test
any claimed implication. No extrapolation from finite numerical checks.

**Return:** a compact per-step pass/fail table and the first actual gap,
if any, with a counterexample or missing hypothesis. Do not repair a
new deep analytic gap by inventing a theorem. If all steps pass, state
the weaker payoff and what is still open.

**Files:** `next-transfer-review.md`, optional
`next-transfer-review-validation.js`. **Ledger:** `Q-next-transfer-review`.
**Stop:** once the listed checks are discharged or a load-bearing
counterexample is found. No new literature campaign or broader proof.

### B. Exact implementation of a branch-preserving diagnostic

**Question:** can future experiments inspect the full coefficients
without silently dropping small cofactors, proper powers or non-squarefree
inputs? Implement the exact identity in §2 as a reusable local driver.

**Read:** `data-reuse-audit.md`, `corner-correlation.md` sections 1.1 through 1.4,
`agent-readiness-validation.js`, and the relevant OUTCOMES entries.
Use `data-reuse/factor-windows.json`; preserve its source and factor
hashes. Do not regenerate a large census or overwrite that input.

**Requirements:** expose explicit interval and cutoff arguments; compute
the direct divisor formula and the expanded prime-power formula
independently; preserve the full interval defining a fiber even on an
archived prefix. Split summands into P=(prime r,s=1), S=(prime r,s>1),
Q=(proper prime power r), retaining the resulting 3-by-3 contribution
matrix. Report signed totals, absolute term totals, grouped absolute
totals and support counts separately. Report both gcd branches and
non-squarefree n classes. Identify floating logarithmic sums as measured;
use integer prime-log coefficient vectors for the identity check.

**Controls:** deleting S/Q must break a populated fixture; count repeated
powers separately; reconstruct every input integer from its factors;
all categories must sum to the direct result. Reject parameter sets with
empty categories as tests of those categories. The actual fixed-eta
corner is often empty at retained sizes: do not call a proxy window the
asymptotic corner. Include an explicit `--fixture` mode with disclosed
toy cuts to exercise all branches, and label it as finite algebra only.

**Return:** the driver, one bounded factor-reuse run and its embedded
output, the active controls, and a short specification. No sign trend,
asymptotic saving or new research closure may be inferred. This is tool
preparation for a later named mechanism, not another sign-search attempt.

**Files:** `corner-branch-diagnostic.js`, `corner-branch-diagnostic.md`.
**Ledger:** `Q-corner-branch-diagnostic`. **Compute cap:** two minutes
per run, ten minutes total; use existing factors only. Stop on a failed
identity rather than running larger inputs.

### C. Bounded source lookup for a materially different interface

**Question:** is there a primary-source statement with stronger scale or
coefficient quantifiers than the new transfer actually used? This is
source lookup and hypothesis matching, not a request for a new theorem.

**Read:** `SEARCH-CONVENTIONS.md`, `prime-band-transfer.md` and relevant
OUTCOMES entries. Inspect at most three candidate primary statements,
including newer versions of an existing source only if its theorem
changed. Search in weighted multiplicative correlations, almost-all-scale
Chowla/Elliott and shifted convolution conventions.

For each candidate give version/date, theorem number, actual coefficients,
normalization, rate with constant dependence, scale quantifier and first
unmatched hypothesis. Compare separately against the prime-cofactor
subfamily and full C-product. A result on Liouville, fixed functions,
bounded affine coefficients or continuous scales is not automatically a
match. Do not use an abstract or a search summary as the theorem.

**Return:** at most three source rows and a reason to reopen one precise
step, or a scoped negative for the statements inspected. Send a genuinely
new analytical requirement back to the coordinating reviewer. Do not
claim no such theorem exists anywhere.

**Files:** `next-correlation-source-map.md`.
**Ledger:** `Q-next-correlation-source-map`.
**Stop:** after three source statements or a demonstrated exact match.

## 4. Integration and stopping rule (as dispatched)

The coordinating reviewer owns the complex next decision. Review A
before promoting the new transfer; repair any finding locally. Review B's
identity tests before using its output. A source lead from C does not
authorize a theorem claim until its deduction and all errors are checked.
If no matched new input remains, end the round with the precise missing
estimate. Do not autonomously repeat it, enlarge the data, switch to
another open conjecture or start TODO W without a separate assignment.

Integrate useful results and failed steps by question in OUTCOMES. Update
TODO C, CLAUDE, README Status, G2-STATE, the router and handoff together.
Use the existing embed tool for producer output. Then run:

```sh
node research/agent-readiness-validation.js
node research/qc.js --index --strict
node research/qc/selftest.js
node research/audit-numbers.js
git diff --check
```

Only the coordinator runs the full number audit, avoiding duplicate
compute. The old six-hour campaign allowance is a total ceiling, not
a fresh allowance for each worker or round. The smaller diagnostic caps
above apply to this round. Make local commits after review and passing
checks; do not push or circulate externally.

Every final report begins with the unchanged open margin and says what
was checked, what changed, which controls ran, what remains unproved and
which exact input would justify another round. If only documentation or
tooling changed, say so. A green gate is not a proof certificate.
