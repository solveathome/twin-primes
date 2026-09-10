# Research execution: reviewed closeout and next obligations

<!-- ledger
id: Q-research-execution
status: ANSWERED
todo: C
parity: Execution and review contract. Accepted identities, regional bounds, scoped failures and open signed estimates retain separate mathematical scopes. No new theorem is asserted by this board.
question: How should agents use the integrated returns, avoid repeated work and select the next bounded research obligation?
verdict: The second dispatch from 1285d47 closed at 46fa948 and was independently reviewed on 2026-09-09. A/A2/B/C/D/E and V/W returns are present and integrated at their owning scopes. A2's corrected Type I estimate is accepted; D's fourth residual cut is retained and its remaining moment saving corrected to 7/200. C's low nonzero modes and E's aggregate scope are corrected. No new assignment is started by this integration; next obligations are candidates, not running work. Twin-prime infinitude and every sufficient signed margin remain OPEN.
-->

**Twin-prime infinitude remains OPEN.** The second dispatch is complete.
The [independent integration review](research-round-validation.md) covers
incoming commits 07ab47f through 46fa948, after dispatch from 1285d47.
Fourteen worker/reviewer passes were reported in that closeout; all returns
are in Git. This integration starts no new worker or automation.

The mathematical baseline has advanced beyond 147dab1: A's truncation,
A2's low Type I estimate and D's fourth simultaneous residual cut are
now part of the [handoff](RESEARCH-HANDOFF.md). No sufficient signed
margin follows. Git preserves the earlier assignments and their revisions;
this document is the current board and reusable execution contract.

## 1. Instructions to the core research handler

Read [AGENT-START.md](AGENT-START.md), the handoff and the owning proof
before selecting another attempt. Review relevant OUTCOMES and QUESTIONS
entries and their decisive arguments. A negative result excludes only the
method and quantifiers actually checked. Review the proposed source match
before original analysis or computation, then validate any candidate in
the same pass. No blanket novelty or impossibility claim follows from a
failed source search.

When continuation is requested, select a bounded obligation in section 3
and record its owner, starting commit, owned files, independent reviewer,
checkpoint and compute allocation before dispatch. Preserve one review
slot; use isolated worktrees for independent commits, or let only the
handler commit and edit shared registers in a shared checkout. Do not
redispatch the completed first-round repair/recovery tasks.

Default checkpoint: at most two hours of active work, earlier at a
decisive result or failed step. Grant a second checkpoint only for a named
remaining calculation, source match or correction. Rotate after two
checkpoints without a changed input; this is an execution limit, not a
refutation of the arithmetic target. Validate a promising deduction before
ending its pass, rather than saving it for another continuation prompt.

## 2. Assignment board

All rows below are **INTEGRATED**, with no new assignment made by this
review. The board records report disposition, not the live state of any
external task application.

| Lane | Current accepted scope | Outstanding arithmetic or custody | Owner and evidence |
|---|---|---|---|
| A | Truncation D_y=D^(e_1)+O_(A,eps)(x/log^A x) | Sufficient lower bound for D^(e_1) | [centered-discrepancy-estimate.md](centered-discrepancy-estimate.md), Q-centered-discrepancy-estimate; review sections 2,7 |
| A2 | Repaired low Type I term paid; S=C2*x+B+O_A(x/log^A x) | Exact B=(Type II)+(band), signed bound OPEN | [fixed-endpoint-discrepancy.md](fixed-endpoint-discrepancy.md), Q-fixed-endpoint-discrepancy; review section 12 |
| B | Ordinary-BV family identity; separate-sign inequality insufficient | Actual signed family correlation and complement | [joint-factor-estimate.md](joint-factor-estimate.md), Q-joint-factor-estimate; review section 9 |
| C | Fourier identity and growing norm bound on all smooth inputs | Filtered correlation rate or a different representation with paid costs | [full-coefficient-average.md](full-coefficient-average.md), Q-full-coefficient-average; review sections 3,8 |
| D | (D1), Lemma H, new region and fourth residual condition | Small-gcd target moment saving >7/200; global complement | [structured-dispersion-estimate.md](structured-dispersion-estimate.md), Q-structured-dispersion-estimate; review section 10 |
| E | Rough-product BV, aggregate constant 4; two specified tests fail for every fixed u>4 | Cov_u, Dec_1 or a better joint contamination consumer | [fold-arithmetic-bridge.md](fold-arithmetic-bridge.md), Q-fold-arithmetic-bridge; review sections 4,11 |
| V | Independent reconstruction and correction of the above | A new candidate or specific correctness concern | [research-round-validation.md](research-round-validation.md), Q-research-round-validation |
| W | OCR-only source identification retained | H–R 1974 Theorem 2.2 printed pp. 68–69, original Lemma 2.2 behind the Remark | [report 12](history/reviews-0907/12-halberstam-richert-second-access.md); manuscript source audit |

### File ownership

A through E retain their linked owning notes and same-stem
`-validation.js` files. V owns research-round-validation.md/.js. During
parallel work the handler alone edits OUTCOMES, TODO, SEARCH-CONVENTIONS,
PRIOR-ART, entry documents, this board and generated indexes. A new helper,
data file or question needs an explicit owner. Workers propose exact shared
record changes instead of editing those files concurrently.

The earlier B/D recovery task is complete: the closeout records that the
first workers stopped before writing reports. It searched the checkout,
local branches/worktrees, stash, reflog, supplied scratch paths and worker
transcripts. Missing first returns had no mathematical grade. The second
returns now exist at the linked owning paths; do not repeat recovery.

## 3. Candidate next obligations — not dispatched

The ordering below is research judgment about a specific remaining step,
not a success probability. Read the full coefficients and consumer before
choosing one. No new compute allowance is granted here.

### D. Preserve structure in the remaining small-gcd moment

First candidate: at original box (delta,nu)=(8/25,9/20), top sector
(rho,sigma)=(6/25,1/20), expanded a=14/25,b=1/2, the fixed-q method gives
moment Q^(3/2)E^3 with exponent 57/40. The Cauchy factor MQ has exponent
61/100. To improve the block exponent 407/400 below one, prove a moment
bound below x^(139/100) with fixed slack: a saving greater than 7/200.
Large gcd j>x^(7/300+epsilon) is paid by j^(-3/2); the remaining small-gcd
range includes coprime e-pairs inside a common prime power q.

Read structured-dispersion-estimate sections 2–6, grouped-divisor-moment,
small-divisor-kernel and their source records. Translate the retained
coefficient correlations into the literature's dispersion conventions;
check whether a named theorem actually exploits a sign or dependence
lost by the present absolute-value bound. Then price one changed
inequality, including coefficient separation, both gcd branches, zero
numerators, proper powers, full periods and positive majorants. An
unchanged generic exponent ends that variant. The top-sector exponent is a
diagnostic: to control the entire box, the improved estimate must cover
all contributing sectors with their actual ranges, or the remaining
sectors must be paid separately. A successful target-box
bound is regional until all remaining boxes and errors are paid.

### A2. Estimate the actual fixed-endpoint remainder

Independent alternative: B is (2.9) of fixed-endpoint-discrepancy with
fixed eps,eps',U,V,e_0,e_1 and its exact clipped intervals. A lower bound
B>=-(C2-c0)x+o(x), c0>0 on unbounded dyadic scales, would suffice. The
stronger D-margin requires B+2C2*M>=-4x/25+o(x); these are not equivalent.
The low Type I proof is completed, so another attempt must change the
estimate for the remaining Type II/band coefficients. The absolute
one-class statement (4.9) is one stronger sufficient input, not a
necessary obstruction. A signed or jointly grouped estimate may suffice
without it. Recheck a theorem's coefficient class and growing ranges
before performing another decomposition.

### B/C/E. Reopen with a changed rate, input or consumer

- B: estimate the signed c(m)-weighted prime-partner sum and explicitly
  pay the complementary B_L term on the same scales. Separate-sign pricing
  at the present cutoffs is already insufficient; exact Type I reassembly
  alone does not improve it.
- C: check a filtered two-point theorem with the required o(x/log^2 x)
  rate, or a representation whose growing norm is paid. Low nonzero modes
  do meet the unit-disc condition; the full Fourier family does not. A
  joint coefficient estimate is not excluded by the norm obstruction.
- E: change the aggregate contamination estimate or the consumer, for
  example retaining the partner's parity in N_odd3. The two displayed
  constant-4 tests fail for all u>4; no conclusion rules out every such
  improved consumer or settles Cov_u/Dec_1.

A precise correctness concern also justifies reopening an accepted or
closed step. No lane should be rejected merely because its objects can
all be described informally as a parity problem.

## 4. Source, compute and report discipline

**Source record.** For each proposed import, report primary URL, version/date,
theorem and proof-step locator, exact hypotheses, target substitutions,
unmatched conditions and the error after all sums. Use a PDF hash where one
was downloaded. Temporary files under /tmp are caches, not durable evidence:
keep a recoverable source URL and locator in the owning note.

At preparation, the Ford–Maynard HTML, Lichtman's abstract/version page and
[Vatwani's publication list](https://sites.google.com/view/akshaa/publications)
were checked on 2026-09-07. This was a locator/scope check, not a new proof
audit. The listed submitted paper on divisor-bounded multiplicative functions
in progressions is an UNREAD lead, with no theorem imported. In particular,
f(n)=Lambda(n-2)mu(n) is not made multiplicative by its name or divisor bound.

**Compute.** The existing six-hour campaign allowance is aggregate and
includes prior use; it is not six hours per worker or a fresh grant from
this plan. The handler checks remaining allocation before dispatching runs.
The second dispatch treated this allowance as consumed by the retained
2^38 censuses (about 4.5 hours for D_y and about 1 hour for shifted-prime
sums and re-embedding). No enumeration allocation remains under this
brief. Reading, proofs and bounded validators can continue; a new
research run needs a concrete allocation and decision.
Prefer a small pilot of at most 15 minutes when an experiment is justified.
Record planned/actual wall time, workers/cores, memory and retained output.
Distinguish wall time from core-hours; parallel runs must not hide their cost.
Reading and analytic work can continue without an enumeration allocation.

Each experiment must name its decision, expected distinction, falsifier
and control first. Reuse [data-reuse-audit.md](data-reuse-audit.md) where
suitable, checking that support is nonempty at the retained scales.
Bind script output with node research/qc/embed.js; never hand-paste it.
Long censuses require a separately justified decision and allocation.
In particular, embed.js --check reruns the recorded invocation; inspect it
before use. For static provenance use node research/qc.js embeds. Reuse the
retained 2^38 JSONs without rerunning their producers unless a changed
statistic or correctness concern requires it. No experiment starts solely
because an existing command is convenient to run.

At dispatch, record each run's lane, decision/falsifier, command, maximum
wall time, cores, memory and approved allocation in its owning note. On
return add actual use and retained artifact paths; the handler reconciles
their aggregate against the campaign balance. Routine repository validation
is recorded separately from research enumeration.

**Required report, in this order:**

1. Question, disposition and what remains open.
2. Exact statement with variables, quantifiers, constants and normalization.
3. Prior-work/novelty check and source hypothesis matrix.
4. Proof or decisive failed calculation, with all complements and errors.
5. Independent validation, falsifier and outcome; distinguish finite checks.
6. Payoff for the full twin consumer, or an explicit regional/conditional limit.
7. Files/commands/data and proposed OUTCOMES, TODO and source-register updates.
8. One justified next move or a precise condition for reopening.

Start each return with this compact handoff, then give the derivation:

    Lane / stable question id:
    Starting commit / report commit or shared-checkout paths:
    Disposition / exact claim / unproved hypotheses:
    Changed step compared with the reviewed baseline:
    Source theorem and first unmatched hypothesis, if any:
    Validation command, falsifier, result and compute used:
    Independent reviewer / disposition (PENDING until actually reviewed):
    Full-consumer payoff and unpaid complement:
    Proposed shared-record changes / next bounded obligation:

Successful lemmas and failed steps stay together under the same question in
OUTCOMES. There is no separate worker-class or success/failure history.

The ledger status is OPEN, PARTIAL, ANSWERED, CLOSED or SUPERSEDED;
the review disposition belongs in the report body. An ANSWERED
specification does not mean its sufficient estimate has been proved.
Use the field format in research/qc/questions.js and keep the question id
stable when correcting the same argument.

## 5. Acceptance and closeout

The handler accepts a mathematical claim only at its checked scope. A
candidate sufficient estimate needs a second reader of its analytic proof;
matching finite output and green QC are separate evidence. Open hypotheses
must remain visible in every summary. Never add gains from overlapping
representations or infer a good common scale from separate existence claims.

After reviewing reports, integrate one consistent set of owning notes,
OUTCOMES entries, source records and forward TODO items. Update README Status
and G2-STATE section 0 only if the assessment changes. Update the handoff's
contract only if a reviewed argument justifies it. Do not paste every report
into the onboarding files.

For mathematical integration, run relevant new or changed validators, then
the repository gates once on the combined state:

    node research/qc.js --index --strict
    node research/qc/selftest.js
    node research/audit-numbers.js
    git diff --check

The 43135b3 review passed strict QC, the QC self-tests and the numerical
audit at its recorded scope. A dispatch-only document change needs strict QC
with regenerated indexes and git diff --check; it does not justify replaying
unchanged research producers. Repeat broader checks after new mathematical
or code changes, failures or an unresolved correctness concern.

The final return names accepted findings, failed variants, unresolved inputs,
review limits, consumed compute, commit ids and the next bounded question.
Commit internal work. Do not publish, upload papers, contact authors or start
automations under this brief. The earlier transition round remains completed;
its old specifications are evidence, not pending assignments.

## 6. Optional work outside the twin-prime lane

**W, one source checkpoint.** Read report 11 and the owning manuscript's
remaining Halberstam–Richert dependency. Locate the actual 1974 theorem page,
verify its hypotheses and constants against the substitution, and record
edition, page, recoverable source locator and exactly what was read. If
access fails after a bounded search, retain UNREAD and the exact owed item;
do not restart the completed Dusart or Hildebrand–Tenenbaum checks. Neither
page retrieval nor a later effective-constant calculation certifies the
previously quoted onset without its full numerical error budget. W is
optional and does not hold up the arithmetic lanes.

TODO 9's weighted variance identification is a separate mathematical
project, outside this dispatch queue. If selected later, give it an explicit
specification, owned files and consumer first.
They may yield useful mathematics, but neither is currently a demonstrated
route to twin-prime infinitude. Do not substitute them for an unsuccessful
arithmetic lane without recording the change of objective.
