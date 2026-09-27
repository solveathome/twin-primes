# Completed signed transition research round

> Public mirror edition: repository-internal working instructions were removed. See MIRROR.md.

<!-- ledger
id: Q-transition-research-execution
status: ANSWERED
todo: C
parity: Execution specification only. It preserves the actual two-factor arithmetic, the reviewed scope of norm bounds and the open global consumer. Preparing or completing assignments is not a new cancellation theorem.
question: How should the core research handler execute and integrate the three bounded transition assignments while retaining the central signed estimate?
verdict: Prepared execution contract with a fixed mathematical baseline, three independently assignable specs, handler-owned signed research, dependency checks, shared-file ownership, reporting requirements and stopping rules. Execution is complete; the corrected results are in transition-round-review.md and transition-round-audit.md. The specification itself supplies no arithmetic estimate.
-->

**The twin-prime margin remains OPEN.** This contract was executed from
`cb51292`; the returned reports were reviewed in
[transition-round-audit.md](transition-round-audit.md) and reconciled in
[transition-round-review.md](transition-round-review.md). Read those
conclusions before reusing this specification. The workflow below records
the bounded assignments that ran; another execution needs a specified new
estimate, changed hypothesis or correctness concern.

For the current prepared assignments, use
[RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md).

Repository: `~/Files/Git/primeoire`.
Mathematical baseline: `029208295099b60d7a8b837d19eb361cfc12e6b1`.
Use the current checkout containing these briefs, after reconciling any
later changes. Do not reset to the baseline and lose the briefs. Record
the actual commit and working-tree state in each report.

## 1. Mission and ownership

The immediate question is whether the **signed** transition correlation
can be estimated beyond its present absolute budget, with all other
terms priced. A useful round can also correct an argument or identify
the precise additional theorem needed. It need not obtain a proof of
twins to return useful, completed work.

| Owner | Read and execute | Deliverable |
|---|---|---|
| Reviewer | [Energy review specification](transition-energy-review-spec.md) | Independent check or correction of the sharp energy and failed norm-transfer argument |
| Source researcher | [Source matching specification](transition-source-match-spec.md) | At most three detailed theorem-interface assessments, with actual coefficients and all losses |
| Joint-budget researcher | [Joint budget specification](transition-joint-budget-spec.md) | Analysis of mixed terms, possible cancellation between pieces, and a complete sufficient inequality |
| Core handler | Sections 2–5 below, plus the three returns | A bounded attempt on the central signed kernel, dependency review, global payoff and integrated record |

Launch the three workers in parallel if capacity permits; with fewer
slots, start the reviewer first and queue the other assignments. Keep
the central signed estimate and final mathematical judgment with the
handler. Workers must not expand into additional agents or unrelated
campaigns. Model settings do not alter the evidence requirements.

## 2. Mandatory context and mathematical contract

### Exact coefficients

Let x=2^j tend to infinity, J_x=(x/2,x] intersected with the integers,
and fix 0<eta<1/400 independently of x. The two sides have

| Side i | w_i | W_i | lower cut D_i | upper cut D_i^+ | z_i |
|---|---|---|---|---|---|
| L | 6/25 | V=floor(x^(6/25)) | max(U,floor(x^(19/25-2 eta))) | floor(x/(V+1)) | floor(x^(19/25-eta)) |
| R | 1/20 | Z=floor(x^(1/20)) | max(Y,floor(x^(19/20-2 eta))) | floor((x-2)/(Z+1)) | floor(x^(19/20-eta)) |

Here U=V and Y=Z. Work at sufficiently large x that D_i<z_i<D_i^+;
then the maxima in D_i equal the power cutoffs. Retain exact floors,
maxima and shifted endpoints whenever making a finite identity check.
Define

\[
 \beta_W(k)=\sum_{r\mid k,\ r>W}\Lambda(r),\qquad
 C_i(m)=\sum_{d\mid m,\ D_i<d\le D_i^+}\mu(d)\beta_{W_i}(m/d).
\]

All prime powers r occur, with Lambda(p^a)=log p. No small cofactor
or non-squarefree input is silently removed. The upper divisor cut is
redundant on the respective interval I_L=J_x or I_R=(x/2-2,x-2].

Set rho_i(d)=1 for d<=D_i, rho_i(d)=log(z_i/d)/log(z_i/D_i)
for D_i<d<z_i, and rho_i(d)=0 for d>=z_i. Let h_i=1-rho_i,

\[
 \widetilde C_i(m)=\sum_{d\mid m}\mu(d)h_i(d)\beta_{W_i}(m/d),
 \qquad T_i=C_i-\widetilde C_i.
\]

The four signed sums, always with the right factor at n-2, are

\[
 \begin{split}
 R_{00}&=\sum_{n\in J_x}\widetilde C_L(n)\widetilde C_R(n-2),\\
 R_{10}&=\sum_{n\in J_x}T_L(n)\widetilde C_R(n-2),\qquad
 R_{01}=\sum_{n\in J_x}\widetilde C_L(n)T_R(n-2),\\
 R_{11}&=\sum_{n\in J_x}T_L(n)T_R(n-2).
 \end{split}
\]

Their sum is the full raw corner R_cor=sum C_L(n)C_R(n-2).
The exact central kernel is

\[
 R_{11}=\sum_{\substack{D_L<d<z_L\\D_R<e<z_R}}
 \mu(d)\mu(e)\rho_L(d)\rho_R(e)
 \sum_{\substack{dk-ev=2\\dk\in J_x}}
       \beta_V(k)\beta_Z(v).                               \tag{E1}
\]

All variables are positive integers; compatible divisor pairs have
(d,e)|2. Keep both branches. Integer parity is not a substitute for
the per-pair compatibility condition. Equation (E1) is already derived
and finitely checked; restating it is not the new research objective.

### Available bounds and their limits

For each fixed eta in the stated range, the standing derivations give

| Quantity | Current upper bound |
|---|---|
| each sharp squared norm, and each transition squared norm | O_eta(x log^2 x) |
| each smoothed squared norm | O_eta(x log x) |
| absolute sums corresponding to R_11, R_10 or R_01, R_00 | O_eta(x log^2 x), O_eta(x log^(3/2) x), O_eta(x log x), respectively |

For every sufficiently small fixed eta>0, the sharp and transition
squared norms are also bounded below by a positive eta-dependent
multiple of x log^2 x. The recorded range is
eta<min(1/400,L_0/(2880B)), with B,L_0 from the uniform mean-square
input in sharp-corner-transition section 2. These constants and the
onset have not been numerically extracted. The review assignment must
check this derivation. It gives no lower bound for R_11 or its absolute
shifted product, and no impossibility theorem for signed cancellation.

### Global consumer: retain the outside contribution

Use the exact E_dagger and domain W_dagger in
[RESEARCH-HANDOFF.md section 3](RESEARCH-HANDOFF.md#3-exact-target-and-remaining-object).
Do not replace it by an unweighted remaining-pair count or a geometrical
area. Let S_0 be the corner defined by D_L,D_R and let E_out denote the
exact restriction of E_dagger to its complement. By the already derived
corner density estimate,

\[
 E_\dagger=E_{\rm out}+R_{00}+R_{10}+R_{01}+R_{11}
                    +O_H(x/\log^H x)\quad\text{for each fixed }H.
                                                               \tag{E2}
\]

Verify that the actual corner lies inside W_dagger when using (E2).
The source for the density replacement is
[corner-correlation section 1.3](corner-correlation.md#13-the-crt-endpoint-weights-on-s_0-degenerate-the-sawtooth-is-not-the-object).
The standing reduction is S(x)=C_2x+E_dagger+O_H(x/log^H x), where
S(x)=sum_(n in J_x) Lambda(n)Lambda(n-2) and
C_2=product_(p>2)(1-1/(p-1)^2)>0.

The target remains fixed c,K>0 and an unbounded set of dyadic x with
C_2x+E_dagger(x)>=c x/log^K x. A sufficient route through (E2) must
keep positive slack, choose fixed H>K, and put **all** estimates on
the same scales. The sufficiently strong rescaled-average and cumulative
consumers in the handoff are also admissible. Separate unbounded good
sets need not intersect. Even R_cor=o(x) would leave E_out to estimate.

## 3. Execution sequence and dependency handling

1. **Preflight.** Record commit, local modifications, assigned paths and
   the existing compute allocation. Read the four specs. Check for
   already completed reports before dispatch; reuse completed work
   unless a precise defect or changed hypothesis justifies a repeat.
2. **Dispatch.** Give each worker its spec, this document and the actual
   launch commit. Require it to read the owning arguments, not just the
   summary. Ask for an immediate message on a decisive defect or useful
   lemma, followed by the complete written return.
3. **Work locally.** The handler attempts a matched signed estimate for
   (E1). The exact small-prime cutoff difference in coefficient-energy
   (16) is one candidate starting point. Freeze x-dependent cutoffs when
   applying it; retain exceptional divisibility and all separation costs.
   A different method is allowed if its coefficient interface is stated.
4. **Use returns conditionally.** Source matching and joint-budget work
   may proceed while the audit runs. Mark dependence on reviewed norm
   claims explicitly. If a defect is found, suspend only the affected
   inference, notify the other workers, and repair or remove it before
   accepting a downstream result. Independent work can continue.
5. **Integrate once the arguments are available.** Read the decisive
   proofs, resolve discrepancies by derivation or counterexample, and
   price every accepted result in (E2). Worker agreement is not proof.
   Have the relevant worker check any substantive repair before closing
   the round, within the same assigned scope.

The handler must finish at least one bounded analytic attempt: state the
proposed lemma, derive its strongest justified bound, and compare it
with the required normalization. If it stops at a missing input, write
that input with exact quantifiers and identify the step that needs it.
Do not turn the round into an indefinite search for a complete proof.

## 4. Files, computation and authorization

Each worker owns only its report and any specifically justified companion
validator. Planned report paths and question ids are in the individual
specs; they are not completed findings. The handler owns these planned
outputs (to be created during execution):

```yaml
central_note: research/transition-signed-estimate.md
central_question: Q-transition-signed-estimate
integration_note: research/transition-round-review.md
integration_question: Q-transition-round-review
```

Each result note needs the repository ledger block with its own question
id, status matching the result, todo C and an honest parity scope.
The handler acknowledges new ids in TODO when those notes exist.

Only the handler updates shared records: OUTCOMES, TODO, QUESTIONS,
SCRIPTS, SEARCH-CONVENTIONS, IMPORT-MAP, the owning baseline notes and
current-state entry points. Workers put proposed outcome entries and
precise corrections in their reports. They must not concurrently stage,
commit, reset, or edit shared files. Preserve unrelated local work.
Isolated worktrees are acceptable if the handler needs them; record the
commit used and integrate reviewed changes deliberately.

This round is primarily analytic. Numerical work needs a named falsifier,
control and stopping condition before execution. Reuse retained inputs
where applicable; label proxy cutoffs honestly. The existing six-hour
compute allowance is aggregate for the campaign, not six hours per worker
or a fresh allocation from this document. Account for prior consumption
and sum concurrent job allocations before scheduling substantial compute.
Unknown remaining allowance is not permission to start a large run.

Use `node research/qc/embed.js` for retained script output. Routine
exact checks are evidence for finite identities, not an asymptotic
correlation rate. Do not repeat the empty fixed-corner census or increase
enumeration merely to collect more twins. Existing internal research and
local-commit authorization applies. No push, publication or external
circulation is authorized; the repository moratorium remains in force.

## 5. Required returns, acceptance and closeout

Every report must contain:

1. Question, baseline, scope and calibration; state the open twin margin.
2. Exact result or conditional statement, including cutoffs, quantifiers,
   constants, scale set and normalization.
3. Load-bearing derivation and source locators, versions and access status;
   separate imported results from proof steps actually checked.
4. Complete cost table, with each term marked derived, imported,
   conditional or open; include its contribution to (E2).
5. Falsifier/control and whether it ran; no required computation when
   the decisive test is a mathematical counterexample or source mismatch.
6. Reusable findings, precise failed steps and remaining obligations.
7. A proposed OUTCOMES entry, affected dependencies and one justified
   next move, or a reason no further repeat is useful.

A completed specification is not an executed assignment. A completed
audit is not a new signed bound. A theorem match must include the
parameter substitution and final cost; a conditional lemma must retain
its unproved premise. A weak saving is an intermediate estimate if it
does not reach the consumer. A scoped failure must not become a universal
closure or a claim that no theorem exists.

The handler's integration note must include a finding-by-finding
disposition, a dependency table for the baseline conclusions, the best
justified combined budget, and an explicit verdict on whether any region,
exact cut or sufficient twin margin changed. Record successes and
failures together by research question in OUTCOMES; Git owns revisions
and authorship. Add result-ledger ids to TODO C when their notes exist;
never mark an arithmetic question solved merely because its report is done.

Reconcile affected live statements in CLAUDE, README Status, G2-STATE
section 0, TWIN-REDUCTION, the research router, AGENT-START and
RESEARCH-HANDOFF. Regenerate indexes and run the relevant validators and
the repository gates after integration:

```sh
node research/qc.js --index --strict
node research/qc/selftest.js
node research/audit-numbers.js
git diff --check
```

Fix failures, commit the reviewed internal work locally, and report the
commit, changed mathematical claims, unresolved target and next precise
input. If the round produces no signed improvement, say so and preserve
the audit and failed-step evidence. The handler should not ask for a new
round merely to repeat an unchanged failed interface.
