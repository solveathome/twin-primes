# Research outcomes

<!-- ledger
id: Q-registry-outcomes
status: ANSWERED
todo: none
question: What has each research approach established, where has it failed or stopped, and what evidence or changed input permits reuse or a further attempt?
verdict: One outcome register organized by research question and approach. Each record preserves its calibration, established result, limitation or failed step, evidence and reuse or revisit conditions. The closed-route table is part of this register. Git owns revision and authorship history; an open estimate is not a refuted claim.
-->

**No result in this register establishes twin-prime infinitude.** Read the
relevant question before starting an attempt, alongside
[QUESTIONS.md](QUESTIONS.md) and the current state in
[G2-STATE.md](G2-STATE.md). An unsuccessful estimate can leave a useful
lemma; both belong with the same question.

This register records current conclusions, exact limits and the evidence
needed to assess them. Git records revisions and authorship. Organize work
by its mathematical question and outcome. Detailed derivations and
reproducible data stay in their owning notes and scripts.

## Recording and reuse

For each question or precisely scoped approach, record:

- **Outcome and calibration:** exact identity, derived bound, finite
  measurement, conditional implication, insufficient bound, missing input,
  or refuted claim. State the actual scope and quantifiers.
- **Established result:** what can be reused, including lemmas from an
  otherwise unsuccessful attempt.
- **Limit or failed step:** what remains unproved, or the precise statement
  that fails. An unanswered estimate stays open.
- **Evidence:** the owning proof, theorem inputs, validator and retained data.
- **Reuse or revisit condition:** what a subsequent attempt must consume or
  change. Repeat a calculation only for a stated correctness concern or
  changed hypothesis, parameter range or implementation.

Update the relevant entry in place when understanding changes. Keep useful
identifiers for citations; Git preserves superseded wording. Existing S/F
identifiers remain stable citations. New findings can use a question-based
identifier.
An ANSWERED question is not a blanket proof grade, and a green mechanical
gate does not validate every mathematical statement. DERIVED uses named
inputs; VERIFIED means finite checking, not an asymptotic theorem.

Verify the argument behind a finding before it determines a research decision.
Check successes as well as failures. In particular, a closure used to exclude
an approach must establish that exclusion with the relevant hypotheses and
quantifiers. A review that finds a defect or missed scope is useful work;
record the correction here. Authorship and repeated agreement do not settle
the mathematical claim.

After each attempt, update the owning note and this register, regenerate
[QUESTIONS.md](QUESTIONS.md), and keep [TODO](../TODO.md) forward-only.
The closed-route table below is a compact index of scoped closures; add a
route there only when a statement or specified approach is actually closed.

## By research question

### Proof specification and logical implications

#### Research execution — Reviewed closeout and document ownership

**Grade:** SPECIFICATION and reviewed integration only.
**Question:** Q-research-execution; onboarding question Q-agent-start.
**Established:** the dispatch from 1285d47 ended at 46fa948; all A/A2/B/C/D/E
and V/W returns are present. [RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md)
owns the integrated board and candidate next obligations. The independent
2026-09-09 review accepts A/A2 and D at their scoped estimates, repairs
B/C/E quantifiers and preserves W's source limitation. Entry documents
and generated indexes agree with the owning notes.
**Limits:** no sufficient signed margin, proof date or fresh compute
allowance. The completed dispatch is not a running assignment.
**Evidence:** [review](research-round-validation.md), lane proofs and
validators; incoming commits remain in Git.
**Next/reuse:** select a changed bounded obligation, source match and
reviewer before further agent work. The first candidate is D's corrected
small-gcd moment target; A2's actual B is an independent alternative.

#### Research-round validation — Independent proof and scope corrections

**Grade:** REVIEWED at the exact analytic, source and finite scopes stated.
**Question:** Q-research-round-validation.
**Established:** A's truncation and A2's repaired low Type I estimate;
B's ordinary-BV family identity; C's norm obstruction on all smooth
inputs; D's block estimate and fourth residual cut; E's aggregate sieve
input and certified failure of two tests for all fixed u>4.
**Corrections:** D's missing moment exponent is 7/200, not 17/200;
C has 1-bounded nonzero Fourier modes; E's constant is aggregate, not
per-tuple; B's uniform Dickman error is 12/11!, not the specialized
24/22!; A2's two sufficient consumers are not equivalent. Bookkeeping
and endpoint repairs are in the owning proofs. Broad route exclusions
are replaced by the actual failed steps.
**Evidence:** [review](research-round-validation.md),
[regressions and rational certificates](research-round-validation.js),
primary source statements and the retained JSONs. No long census rerun.
**Next/reuse:** consume the corrected scope and actual coefficients.
Green gates or several agreeing reviews do not settle an unproved margin.

#### Transition research round — Prepared worker specs and execution contract

**Grade:** SPECIFICATION only; executed and subsequently reviewed, with no
signed estimate supplied by the specification. **Questions:** `Q-transition-research-execution`,
`Q-transition-energy-review-spec`, `Q-transition-source-match-spec`,
`Q-transition-joint-budget-spec`.
**Established:** [TRANSITION-RESEARCH-EXECUTION.md](TRANSITION-RESEARCH-EXECUTION.md)
is the unified handler brief at mathematical baseline `0292082`. It
fixes the full coefficients, exact signed transition kernel, four-term
decomposition and outside residual. The linked specs define independent
[energy review](transition-energy-review-spec.md),
[source matching](transition-source-match-spec.md) and
[joint-budget research](transition-joint-budget-spec.md); the handler
retains the central signed estimate and final mathematical integration.
Each assignment has bounded work, owned report paths, source/quantifier
checks, acceptance criteria and a precise failed-step return option.
**Limits:** preparing the specifications is not executing the assignments.
The conditional consumer template supplies no unproved lower bound.
No signed saving, region, exact cut or sufficient twin margin changes.
The prior 3/50 regional moment threshold is not the transition target.
**Evidence:** the four specification documents and their links to the
owning derivations. Baseline norm and transition conclusions remain
subject to the independent audit; finite gates do not settle them.
**Execution/reuse condition:** the round was executed from `cb51292` and
reviewed in [transition-round-audit.md](transition-round-audit.md). Its
current dispositions are in [transition-round-review.md](transition-round-review.md).
Do not redispatch these completed assignments unchanged; a specified new
estimate or correctness concern can justify further work.

#### Cross-campaign synthesis — Reusable links and proposal corrections

**Grade:** DERIVED elementary identities and bookkeeping; scoped source
and proposal review. **Question:** `Q-cross-campaign-synthesis`.
**Established:** [cross-campaign-synthesis.md](cross-campaign-synthesis.md)
compares the full-coefficient, fold, anchored and literature routes; checks
all eight local proposals and selected primary statements/proof steps;
and gives the common-scale union-bound condition for combining average
errors. It repairs the anchored note's reversed Euler-factor inequality,
the Suen proposal's independence/atomicity and universal-closure language,
and a proposal grade header that contradicted its recorded decision.
All proposal grades are retained, with no publication action.
**Failed inferences:** separate unbounded good sets need not intersect;
the present subfamily rate cannot absorb its normalization losses through
the stated absolute-average conversion; a smoothed norm and a bounded-
multiplicative subfamily theorem are not estimates for the same coefficient.
The reviewed quadratic-form main term with an O(D2^2) remainder does not
handle the long divisor support. No exhaustive literature closure follows.
**Evidence:** owning derivations and exact checks in
[cross-campaign-validation.js](cross-campaign-validation.js); the external
analytic proofs remain named dependencies, not numerically verified results.
**Next/reuse condition:** use the sharp-transition follow-up below and
its signed correlation budget, or another matched estimate with all costs.
No favorable twin margin is established.

#### Research-handoff — Assessment and assignment contract

**Grade:** CONSOLIDATED specification and research judgment; no new
arithmetic estimate or numerical evidence. **Question:** `Q-research-handoff`.
**Established record:** [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) assembles
the exact E_dagger, its sufficient positive and rescaled-average margins,
the completed generic moment and the small-common-divisor target.
It also specifies the complete C3 residual and centered prime–Mobius
alternative, with the moving cutoff and sufficient tolerance retained.
Current assignments and integration are owned by
[RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md).
**Assessment:** another bounded attempt is justified. The regional
improvement does not establish that a full proof is near; the global
margin remains OPEN. The generic estimate does not exploit additional
Mobius-sign cancellation. No claim that such cancellation is necessary
for every proof follows. The 0.995 budget and the greater-than-3/50
moment saving are exponents, not completion or finite-improvement
percentages. A smaller signed domain is not a monotonicity statement.
**Evidence and limits:** the mathematical sources are
[grouped-divisor-moment.md](grouped-divisor-moment.md),
[residual-coverage.md](residual-coverage.md) and
[endpoint-target-audit.md](endpoint-target-audit.md), with their upstream
dependencies. Their finite checks are not independent expert review.
The handoff itself completes no assigned research and adds no proof.
**Reuse or revision condition:** require a checked derivation or correction,
a matched new estimate with all costs, and an explicit regional or global
payoff before changing the assessment. Record each attempt by question;
do not split histories by agent class or promote a failed estimate to a
refutation of the arithmetic target.

#### Independent handoff review — Completed bounded audit

**Grade:** DERIVED corrections and scoped source/proof review.
**Question:** `Q-handoff-review-0906`. The bounded preparation checklist
is complete, with deep imported theorems retained as named dependencies.
Reviews 20 and 21 check the local reduction, grouped moment and coverage
steps; repair the cumulative/dyadic comparison, full-corner scope,
shrinking-margin inference, equal-frequency scope and prime-power tail;
and correct later window/rate and identity-piece overclaims. Joint
Cauchy is priced and adds no region. No full-margin proof or universal
impossibility theorem is supplied.
**Evidence:** [live review](handoff-review-0906.md),
[report 20](history/reviews-0906/20-independent-handoff-review.md),
[report 21](history/reviews-0906/21-readiness-review.md).
**Reuse:** consume the actual derivations and fixed hypotheses.
[AGENT-START.md](AGENT-START.md), question `Q-agent-start`, routes incoming
workers to the current handoff and execution plan. The executed round is
preserved in [round-review-0906.md](round-review-0906.md); the band transfer
retains its own PARTIAL scope and review record.

#### S-0905-01 — Corrected the proof specification

**Grade:** DERIVED logical corrections and VERIFIED finite algebra.
**Question:** `Q-review-0905`.
The review distinguishes sieve-method limitations from the information in
the exact tile, preserves the occupancy quantifiers, and corrects the
quadratic-bound deduction and the CRT alignment claim. Reuse the corrected
definitions in [README Status](../README.md#status).
**Evidence:** [review](history/staging/review-0905.md),
[validation](review-0905-validation.js), [correction history](history/CHANGELOG.md).
**Limit:** no improved bound on G₂ or on twins follows from these repairs.

#### F-0905-01 — Treating all exact tile arguments as parity-blind

**Verdict:** WITHDRAWN CLAIM. **Question:** `Q-review-0905`.
Exact divisibility arrangements retain primality information. A limitation
of a specified sieve's statistics and tolerated errors was generalized to
every possible argument on the representation.
**Evidence:** [review](history/staging/review-0905.md),
[corrected current scope](../README.md#status).
**Revisit only with:** a named method class, retained statistics, errors and
quantifiers, and a proof at that scope. Existing particular failures stand.
The separate assertion of a proved universal floor at 4 was also withdrawn;
its owning closure is in [closed-route index](OUTCOMES.md#closed-routes).

#### F-0905-02 — Inferring little-o from a constant quadratic bound

**Verdict:** REFUTED DEDUCTION. **Question:** `Q-review-0905`.
The comparison g≤G₂<x′²−2 gives at most limsup g/x²≤1 from those
inequalities and x′/x→1; it does not give g=o(x²).
**Evidence:** [review, quadratic-bound countermodel](history/staging/review-0905.md).
**Revisit only with:** additional information, such as a fixed power saving.
The countermodel refutes the deduction, not a separate theorem about g.

#### F-0905-03 — Claiming CRT prevents adverse alignments from combining

**Verdict:** REFUTED DEDUCTION. **Question:** `Q-review-0905`.
CRT realizes all freely prescribed translates of the separation-2 forbidden
pairs simultaneously. Independence does not prevent a bad joint phase.
**Evidence:** [review](history/staging/review-0905.md),
[finite exhaustive check](review-0905-validation.js).
**Revisit only with:** a restriction that actually distinguishes the integer
origin or the relevant interval and a bound using that restriction.

#### F-0905-04 — Reading negative Liouville sign as primality

**Verdict:** REFUTED DEDUCTION. **Question:** `Q-review-0905`.
An odd factor count can exceed one; the review's example 107−2=105 has
three prime factors. A raw shifted Liouville average had no complete
prime-detection implication attached to it.
**Evidence:** [review and restricted four-sign identity](history/staging/review-0905.md),
[validator](review-0905-validation.js).
**Revisit only with:** proved roughness/factor-count control and estimates
valid after that conditioning. This does not refute useful Liouville inputs.

### Classical Chen benchmark

#### S-0905-02 — Completed the classical Chen benchmark

**Grade:** DERIVED using named classical inputs; finite minorant and
rational margin checks VERIFIED. **Question:** `Q-chen-fold-benchmark`.
The long-interval prime/almost-prime benchmark has an explicit weight,
endpoint conventions, square-error bound and positive constant budget.
Reuse that benchmark and its imported interfaces instead of rebuilding it.
**Evidence:** [benchmark](chen-fold-benchmark.md),
[validator](chen-benchmark-validation.js).
**Limit:** partners may be semiprime; this does not prove twins or occupancy
of every short zone. The imported theorems were not reproved here.

### Chen weight selection

#### S-0905-03 — Identified and removed an artificial weight penalty

**Grade:** EXACT identities and DERIVED bounds.
**Question:** `Q-chen-opportunity`.
The fixed Chen weight subtracts an odd-composite penalty from the prime
minorant. Clipping the weight at zero removes that penalty in the exact
prime-count identity. Reuse this diagnosis when selecting weights.
**Evidence:** [opportunity audit](chen-opportunity-audit.md),
[validator](chen-benchmark-validation.js). **Related failure:** F-0905-05.
**Limit:** the clipped signed sum still has no sufficient arithmetic estimate.

#### F-0905-05 — Closing the fixed Chen target with separate bounds

**Verdict:** INSUFFICIENT BOUND. **Question:** `Q-chen-opportunity`.
The fixed weight incurs an avoidable odd-composite loss. Even granting
cancellation of the selected signed components, the recorded separate
classical bounds leave a negative lower-bound coefficient. That does not
say the actual twin expression is negative or that Hη is false.
**Evidence:** [audit](chen-opportunity-audit.md),
[rational sign certificate](chen-benchmark-validation.js).
**Revisit only with:** a sharper joint estimate, an improved unsigned budget,
or a different weight whose full payoff is derived. **Reuse:** S-0905-03–04.

### Signed Chen target

#### S-0905-10 — Specified the original signed Chen implication

**Grade:** CONDITIONAL implication with an OPEN signed premise.
**Question:** `Q-chen-signed-target`.
The note states the signed hypothesis Hη, derives its twin-prime payoff,
and records the actual factor and cofactor ranges. This completed
specification remains a diagnostic to cite; the current primary consumer
is S-0905-04 and its subsequent residual reductions.
**Evidence:** [signed target](chen-signed-target.md),
[weight checks](chen-benchmark-validation.js).
**Limit:** the original weight has the penalty in S-0905-03 and F-0905-05.
Neither the signed premise nor its needed improvement is established.

### Positive prime detector and arithmetic inputs

#### S-0905-04 — Matched a positive prime detector to available inputs

**Grade:** DERIVED using PNT and prime BV; CONDITIONAL twin implication.
**Question:** `Q-prime-detection-inputs`.
The positive comparator has the correct progression main terms. Both
Type I contributions are controlled through divisor size x^(12/25),
giving S(x)=C₂x+B(x)+o(x). The note states the precise one-sided
improvement that would force twins on unbounded scales. Reuse its weights,
coefficient definitions and payoff, keeping the stated ranges.
**Evidence:** [input specification](prime-detection-spec.md),
[validator](prime-detection-validation.js).
**Limit:** the improvement for B is OPEN; the implication is not evidence
that its premise holds.

### First-fold and second-moment estimates

#### S-0905-05 — Completed the first-fold and local covariance algebra

**Grade:** EXACT identities; DERIVED diagonal and fixed-modulus bounds.
**Question:** `Q-bilinear-fold-first-attack`.
Least-prime-factor assignment is exact with strict factor exclusion and
the unit cofactor retained. The second-moment diagonal is affordable;
the local covariance is a residue-imbalance square. Reuse these formulae
with their endpoint and weight conventions.
**Evidence:** [first attack](bilinear-fold-attack.md),
[validator](prime-detection-validation.js). **Related failures:** F-0905-06–07.
**Limit:** neither the full off-diagonal nor the required bilinear saving
was estimated.

#### F-0905-06 — Getting cancellation from first-factor assignment alone

**Verdict:** NO SAVING. **Question:** `Q-bilinear-fold-first-attack`.
The least-factor identity is exact, but the attempted absolute-value bound
is only O(x log⁴x), too weak to improve the one-sided boundary at scale x.
**Evidence:** [first-fold calculation](bilinear-fold-attack.md),
[identity checks](prime-detection-validation.js).
**Revisit only with:** an actual signed estimate or a quantitatively better
bound; assigning factors again is already completed work. **Reuse:** S-0905-05.

#### F-0905-07 — Finishing the direct second moment from its diagonal

**Verdict:** MISSING INPUT. **Question:** `Q-bilinear-fold-first-attack`.
The diagonal contribution is negligible at the required scale. The
off-diagonal retains two shifted prime forms and is not controlled by the
single-progression BV input. The sufficient off-diagonal estimate is OPEN.
**Evidence:** [second-moment calculation](bilinear-fold-attack.md),
[finite split check](prime-detection-validation.js).
**Revisit only with:** a theorem that bounds the actual weighted off-diagonal
over its intersected intervals, or an argument retaining useful Möbius signs.
**Reuse:** S-0905-05; failure here does not refute the original one-sided target.

### Local folds and signed reconstruction

#### S-0905-06 — Controlled the joint local and comparison sums

**Grade:** DERIVED using Siegel–Walfisz and Möbius mean estimates.
**Question:** `Q-polylog-fold-transfer`.
Joint local bilinear sums cancel for the specified polylogarithmic moduli;
the full and truncated comparison terms are also negligible. These are
available inputs to the actual shifted-prime problem.
**Evidence:** [transfer note](polylog-fold-transfer.md),
[finite identities](prime-detection-validation.js).
**Related failures:** F-0905-08–09.
**Limit:** the signed reconstruction error remains OPEN. Local cancellation
is not a substitute for estimating it.

#### F-0905-08 — Approximating the actual remainder in absolute norm

**Verdict:** REFUTED at the specified model class.
**Question:** `Q-polylog-fold-transfer`.
The proposed o(x) absolute reconstruction from normalized joint folds of
fixed-power polylogarithmic modulus fails: the absolute error is at least
(1/2+o(1))x.
**Evidence and owning closure:** [transfer proof](polylog-fold-transfer.md),
[closed-route index](OUTCOMES.md#closed-routes). **Reuse:** S-0905-06.
**Revisit only with:** a different approximation class/norm or a bound on
the signed reconstruction. The latter remains OPEN and is not refuted.

#### F-0905-09 — Transferring local cancellation without its signed error

**Verdict:** MISSING INPUT. **Question:** `Q-polylog-fold-transfer`.
The local and comparison sums cancel, but their cancellation does not
estimate the separately identified signed reconstruction term E_Q.
**Evidence:** [transfer identity and error](polylog-fold-transfer.md).
**Revisit only with:** a bound for that signed error, preserving the weights
and the needed one-sided constant. Another sweep at already controlled
local depths does not supply it. **Reuse:** S-0905-06.

### Second Vaughan decomposition and scale averages

#### S-0905-07 — Controlled both pieces with small introduced divisors

**Grade:** DERIVED using ordinary Möbius BV; EXACT second decomposition.
**Question:** `Q-shifted-prime-decomposition`.
Both second Vaughan Type I pieces are O_H(x/log^H x), for every fixed H,
with introduced divisors through x^(1/10). The proof includes parity cases,
interval cuts and the modulus margin. The remaining weighted sum on
dk−ev=2 has an exact linear-form parametrization. Consume these estimates
and identities before designing another decomposition.
**Evidence:** [decomposition](shifted-prime-decomposition.md),
[validator](shifted-prime-validation.js). **Related failures:** F-0905-10–11.
**Limit:** no improvement of the whole remainder R is obtained.

#### S-0905-08 — Established an alternative conditional payoff across scales

**Grade:** CONDITIONAL implication, derived by averaging.
**Question:** `Q-shifted-prime-decomposition`.
A fixed improvement in the limsup dyadic average of R(x)/x implies
positive twin counts on unbounded scales. Reuse the statement in
[the decomposition note](shifted-prime-decomposition.md), including its
moving cutoffs and error terms.
**Limit:** its premise is OPEN and still stronger than mere infinitude;
it is not an unconditional cancellation theorem.

#### F-0905-10 — Applying ordinary Möbius BV to the entire second remainder

**Verdict:** IMPORT DOES NOT APPLY AS STATED.
**Question:** `Q-shifted-prime-decomposition`.
Both pieces with small introduced divisors are controlled. The remaining
sum over dk−ev=2 has larger divisor ranges and the arithmetic cofactor
weight β_Z((dk−2)/e). The imported progression theorem does not estimate
that weighted sum. Bounding a weight by its maximum inside a signed sum
would be invalid.
**Evidence:** [modulus and coefficient audit](shifted-prime-decomposition.md),
[finite algebra](shifted-prime-validation.js).
**Revisit only with:** a proved weighted transfer, useful cancellation across
the cofactor average, or a different decomposition with an estimated error.
**Reuse:** S-0905-07; the whole residual remains OPEN.

#### F-0905-11 — Directly importing the cited Chowla correlation statements

**Verdict:** IMPORT DOES NOT APPLY AS STATED.
**Question:** `Q-shifted-prime-decomposition`.
The audited logarithmically averaged fixed-form theorem has coefficient-
dependent thresholds; the audited averaged-shift theorem uses a free shift
average. Our parametrization has growing coefficients, inverse-residue
constraints, β weights and possibly one-point intervals.
**Evidence:** [source-by-source parameter audit](shifted-prime-decomposition.md),
[owning search conventions](SEARCH-CONVENTIONS.md).
**Revisit only with:** a transfer matching those parameters or a named theorem
that supplies them. The audit does not exclude adaptations or every later
correlation result. **Reuse:** S-0905-07–08.

#### Complete-coefficient average — Exact representation and scoped norm obstruction

**Grade:** DERIVED identities and reviewed norm bound; finite proxy
MEASURED; no matched correlation estimate. **Question:** Q-full-coefficient-average.
**Established:** [full-coefficient-average.md](full-coefficient-average.md)
gives Ghat_i=Lambda-D_i-E_i with rounded-endpoint Fourier profiles and
uniformly summable coefficients. Section 6 writes the actual weighted
shifted sum, composite filters, log t lift and c_(i,0)=3/5. The both-rough
composite contribution enters the assembled residual with coefficient one.
Proposition 6.5 gives norm >=(log x)^(2/5) for representations by
1-bounded functions on every W_L-smooth input, via growing binomial
witnesses and the PNT. It is reviewed, including on 2026-09-09.
**Failed steps and correction:** a finite norm example alone was not
unboundedness; the growing witness now supplies that restricted result.
The composite filter is not multiplicative; unweighted cancellation
cannot be multiplied through its arithmetic envelope. The claim that
only zero Fourier modes are 1-bounded is false: the sufficient condition
|k|log W_i/log x<=1/3 admits at least k=0,±1 on the left and
l=0,±1,...,±6 on the right, for every Mellin twist. Those modes still
need the other hypotheses and filtered o(x/log^2 x) rate. The full
family does not meet the unit-disc condition. Only a rough-pair upper
bound, not a matching lower bound, is used.
**Evidence:** [lane validator](full-coefficient-average-validation.js),
[review](research-round-validation.md) sections 3,8,
[integration controls](research-round-validation.js).
**Limits/revisit:** sparse norm witnesses do not exclude density-one
representations or components with paid growth. A matched filtered
correlation theorem, jointly treated Fourier coefficients or a new
one-sided inequality may reopen the question. No region or twin margin
follows from the representation.

### Singleton fibers

#### S-0905-12 — Identified the support and cost of singleton fibers

**Grade:** EXACT regrouping; DERIVED mass lower bounds using prime BV,
PNT and the Möbius mean estimate; finite checks VERIFIED.
**Question:** `Q-singleton-fiber-audit`.
The grouped remainder vanishes whenever either integer is prime. For the
prescribed cutoffs, the positive and negative ungrouped singleton masses
are each at least c*x*log(x) for all sufficiently large x, with c>0. Reuse
the witness construction and the sign-density proof when pricing a bound.
**Evidence:** [proof and parameter budget](singleton-fiber-audit.md),
[independent coefficient, fiber and progression checks](singleton-fiber-validation.js).
**Limit:** neither the signed singleton difference nor the longer-fiber
sum is estimated. This is not a twin lower bound or a novelty claim.
**Related failure:** F-0905-12.

#### F-0905-12 — Discarding singleton fibers or pricing each sign separately

**Verdict:** REFUTED at the ungrouped absolute-mass scope.
**Question:** `Q-singleton-fiber-audit`.
The actual β-weighted singleton family has both positive and negative
masses at least c*x*log(x) eventually. Its absolute mass is not O(x),
and neither is its negative mass alone. Dropping all positive terms and
bounding the negatives separately cannot close a scale-x lower bound.
**Evidence:** [derived lower bounds](singleton-fiber-audit.md),
[finite partition controls](singleton-fiber-validation.js),
[owning closure](#closed-routes). **Reuse:** S-0905-12.
**Revisit only with:** cancellation across different fibers, a grouping
that preserves useful signs before taking absolute values, or a different
decomposition. The signed singleton sum and its combination with longer
fibers remain OPEN; the mass lower bounds do not refute either target.

### Reusable data and retained inputs

#### S-0905-11 — Recovered useful inputs from existing runs

**Grade:** VERIFIED finite reconstruction. **Question:** `Q-data-reuse-audit`.
The old fold CSV supplies 1,230 base primes through 10,007 and exact
interval boundaries. Three complete archived rows are reproduced; bounded
prefixes are reconstructed with full prime-power factors retained for
future divisor weights. The saved aggregate files and producer workspaces
are inventoried, so subsequent work need not repeat the data search.
**Evidence:** [retention audit](data-reuse-audit.md),
[validator and bound output](singleton-fiber-validation.js),
[generated factors](data-reuse/factor-windows.json).
**Limit:** prefix measurements are not full dyadic residuals, and the
largest tested interval still has inner cutoff 2. **Related failure:** F-0905-13.

#### F-0905-13 — Reading the new weighted residual directly from old summaries

**Verdict:** REQUIRED FIELDS NOT RETAINED in the inspected outputs.
**Question:** `Q-data-reuse-audit`.
The inspected Liouville, tile-window and zone-gap outputs save aggregate
statistics, not per-integer divisor signs and β weights. Twin records
alone sample zero grouped coefficients of the present residual. The old
fold CSV does retain prime and interval inputs, and they have been reused.
**Evidence:** [artifact/producer inventory and reconstruction](data-reuse-audit.md).
**Revisit only with:** an additional raw-factor or equivalent arithmetic
artifact, or a specified recomputation from retained coordinates. This is
not an impossibility claim about reconstructing arithmetic from integer
inputs, nor an audit of unavailable backups. **Reuse:** S-0905-11.

### Signed divisor grouping and endpoint discrepancies

#### Full corner coefficient energy — Sharp identity and smoothed norm

**Grade:** DERIVED from exact algebra, elementary squarefree counting and
the imported Graham/Barban–Vehov mean-square theorem; finite identities
VERIFIED. **Question:** `Q-corner-coefficient-energy`.
**Established:** [corner-coefficient-energy.md](corner-coefficient-energy.md)
gives the exact sharp energy over short cofactors k,l, retaining complex
conjugation, off-diagonals, all prime-log weights, non-squarefree inputs and
clipping. Its counting error is O_epsilon(x^(1/2)K^2 x^epsilon), below x at
the fixed corner. A logarithmic average of the lower divisor cuts yields
full smoothed coefficients with squared norms O_eta(x log x), and hence
the same absolute bound for their shifted product. The short-endpoint
range of Graham's input is handled by an exact rescaling. Radical
regrouping and coprime small-prime multiplication give exact identities;
the latter produces a cutoff difference, not multiplicativity.
**Limits/failed shortcuts:** Jensen cannot recover a sharp norm from its
smoothed counterpart; dropping the prime singleton cancellation gives a
false coefficient. The follow-up below prices the sharp norm and refutes
a negligible L2 transition for sufficiently small fixed eta. A signed
transition saving and the global complement remain OPEN. This is no
three-log gain for E_dagger and no extension of a bounded multiplicative
correlation theorem. Exact residual cuts and twin status are unchanged.
**Evidence:** the owning proof, pinned Graham source statement and
[cross-campaign-validation.js](cross-campaign-validation.js) with active
deletion controls. The imported theorem is not proved by the finite tests.
**Next/reuse condition:** consume the sharp-transition result below;
a proof route still needs signed estimates and the remaining global margin.

#### Sharp corner transition — Complete energy and a failed norm transfer

**Grade:** DERIVED using the uniform de la Breteche–Dress–Tenenbaum
mean-square theorem, PNT and exact algebra; finite identities VERIFIED.
**Question:** `Q-sharp-corner-transition`.
**Established:** [sharp-corner-transition.md](sharp-corner-transition.md)
gives O_eta(x log^2 x) squared norms for both complete sharp coefficients
and the same absolute shifted-product bound, for each fixed eta in the
existing range. For every sufficiently small fixed eta>0, their squared
norms on the actual dyadic intervals, and those of sharp minus smoothed,
are Theta_eta(x log^2 x). The proof pays O(eta^2 x log^2 x) for all
cross-prime terms against an Omega(eta x log^2 x) diagonal, and removes
proper powers by an L2 bound. No diagonal-only lower bound is used.
**Failed step:** an O_eta(x log x) sharp squared norm or
o_eta(x log^2 x) transition squared norm fails in that small-fixed-eta
range. The easy O(D^2) floor error cannot replace the uniform source
input; applying the smooth sieve-weight bound at smoothing order zero
also fails its hypothesis. These failures do not preclude cancellation
between the transition coefficients at shift 2.
**Limits:** the small-eta threshold and onset are not numerically
extracted. No lower bound for a shifted product follows from individual
norms. The mixed, smoothed and transition signed sums, global complement
and sufficient twin margin remain OPEN. No region or exact cut changes.
**Evidence:** source locators and pinned PDF in the owning note;
[sharp-corner-transition-validation.js](sharp-corner-transition-validation.js)
checks exact coefficient vectors, the full prime energy matrix, clipping,
coprimality, singleton and proper-power corrections with active controls.
An initial validator assertion distinguished JavaScript -0 from 0;
normalizing signed zero repaired that test, without changing the identity.
Finite checks do not establish the imported asymptotic.
**Next/reuse condition:** estimate the signed transition-pair kernel with
its actual arithmetic weights; retain the mixed terms and common-scale
global consumer. Norms alone cannot supply that estimate.

#### Moving cutoff — Published endpoint omission and a checked conditional tolerance

**Grade:** source interfaces CHECKED; endpoint counterexample EXACT;
dyadic repair and conditional implication DERIVED; finite controls VERIFIED.
**Question:** Q-moving-cutoff-parity.
**Established:** [moving-cutoff-parity.md](moving-cutoff-parity.md)
reads the published Murty--Vatwani mechanism before local analysis.
Its fixed-residue simplification is already explicit in print. A
rearrangement on p. 654 drops n+h>ey. At x=20,y=3,h=2, the prime-only
version acquires the extra positive term log(3)*(log(13)+log(19)).
The PDF image and an exact formal-logarithm calculation check this.
It refutes the displayed equality, not the conditional theorem.
The repaired dyadic formula is S=C2*x-2*C2*M+D_y+O_A(x/log^A x),
where M=sum_J Lambda(n-2)mu(n) and D_y is the fully specified
centered progression discrepancy with n>ey retained. Ordinary BV
handles the squarefree short term at y=ceil(x^(12/25)). The remaining
cofactor moduli are at most x^(13/25), for a different sequence than
ordinary prime BV. The actual discrepancy has not been bounded.
**Conditional payoff:** the unconditional squarefree density and
rational Euler-product enclosures give 33/200<C2*(1-A2)<21/125.
Consequently D_y>=-4x/25+o(x) on unbounded dyadic scales would give
S>=x/200+o(x). This is an OPEN sufficient condition, not an estimate
or proof-progress measurement. The relation D_y=B_L+2*C2*M+negligible
error makes its connection to the existing residual explicit.
**Source retrieval:** Vatwani's 2018-10-02 author preprint for the
2019 Math. Z. paper is now read at the owning note's stated scope.
Its one-odd-exponent theorem concerns mu times squarefree indicators;
its twin theorem has two unfilled near-level-one hypotheses.
Its general theorem's main-term restriction must be checked before
application to Lambda. A second exact control checks its formal
swap before (6.23): at x=40,Q=3,h=2 the dropped cut adds
2*log(3)*log(5). Section 6's moving cuts require care;
no full reproof of that theorem is claimed.
**Failed payoff/limit:** no new signed bound, unconditional margin,
asymptotic measurement or established literature novelty. The formula
does not establish that its arithmetic estimate is easier than B_L.
**Evidence:** [validator](moving-cutoff-validation.js) checks both
Lambda conventions, 40 dyadic exact reconstructions, independently
ordered progression/density sums and rational infinite-product
enclosures. Deleting the boundary, density projection, even terms
or proper prime powers changes a control. Source locators and hashes
are in the note. Candidate validation was completed in this pass.
**Next/reuse condition:** obtain a matched estimate for the actual
centered prime/Mobius sequence and price it against (13)--(16), or
give a different justified full-residual estimate. Do not repeat
retrieval, the source switch or the constant calculation as a new
cancellation mechanism.

#### Centered discrepancy census — D_y at finite x is the classical term's error

**Grade:** MEASURED, two pre-registered falsifiers (neither fired), four
controls, one independent reimplementation agreeing to 1e-14, one
cross-codebase check; no asymptotic content. **Question:**
Q-centered-discrepancy-measurement. The sufficient input (16) of
moving-cutoff-parity remains OPEN.
**Result:** D_y(x), M(x), the identity pieces of (12) and the absolute
sum W1 of (13) computed exactly at x=2^j, j=16..38 (3.9e9 support integers
at the top, 8224 s). D_y/x stays within 0.0043 of zero for j>=26 against
the threshold -0.16. W1/x decays like the random-sign control (slopes
0.827 against 0.825), within 8 percent of it at every j>=26, and reaches
0.0773 at j=38 against the threshold 0.08. Real D_y exceeds the control by
up to 22 times with slope 0.863 against 0.544, and the exact identities
pin D_y/x to -(T1/x - C2) within 2e-4 at every j>=30 (largest deviation
1.84e-4 at j=30), because S/x is within 1.8e-4 of C2 and the density term
is negligible: the excess is the finite-x error of the classical
BV/Mobius-mean term, of order x/log^2 x (independent recomputation of the
identity columns: history/reviews-0907/10 §5).
**Limit:** the parity object's own fluctuation is an order of magnitude
beneath that error at every reachable x, so a census of D_y cannot inform
the missing estimate; the absolute BV-type form is consistent with the
data and the obstacle is proof, not truth.
**Evidence:** [note](centered-discrepancy-measurement.md),
[script](centered-discrepancy-measurement.js),
[artifact](centered-discrepancy-measurement.json); code review in
history/reviews-0907/02.
**Reuse or revisit condition:** do not rerun or extend; there is no scale
at which the census separates the two contributions. Reuse the exact
identity check S=T1+T2+E_pp as a validator for any future implementation
of the Vaughan pieces.

#### Shifted-prime Mobius sums — A finite table of the parity input at 2^38

**Grade:** MEASURED, pre-registered falsifiers, three controls fired, one
independent reimplementation and one cross-codebase check agreeing; no
asymptotic content. **Question:** Q-shifted-prime-mobius-sums. The
o(pi(x)) conjecture for Mobius on shifted primes remains OPEN.
**Result:** sum_{5<=p<=x} mu(p+-2) and lambda(p+-2) computed to x=2^38
(10.9e9 primes, 3446 s). All four sums sit at random-sign size: the
largest |U|/control-rms at any j is 2.8, and the slopes of log|U| over
j>=28 (0.28 to 0.65) lie within the control's per-draw spread around 1/2.
The +2 sums are negative at every j from 21 to 38; the note compares that
run with the draws' runs and proposes no mechanism. The dyadic total
M(x)=sum Lambda(n-2)mu(n) is at most 8.8e-5 x in magnitude for j>=29,
against the trivial bound 0.374 x that moving-cutoff-parity (14)-(16)
uses, so the -4x/25 tolerance is loose by four orders at these scales.
Squarefree density of p+2 among primes 0.747911 at 2^38 against 2*Artin
0.7479116. pi(2^j)+2 equals OEIS A007053 at every j.
**Limit:** a bound on M is itself a bound on the shifted-prime Mobius sum,
the same parity object; the looseness of the trivial bound is not usable
by a derivation. Searched in the owning convention (Mobius on shifted
primes, Chowla two-point, Elliott--Halberstam twisted by Mobius; row in
SEARCH-CONVENTIONS.md, record in history/reviews-0907/01): there is no
published table to compare above x=10^4. The first run carried a wrong A2 constant in its
header, caught by the data and corrected before any reading.
**Evidence:** [note](shifted-prime-mobius-sums.md),
[script](shifted-prime-mobius-sums.js), [artifact](shifted-prime-mobius-sums.json).
**Reuse or revisit condition:** do not extend the table; a larger x sharpens
nothing a proof can consume. Reuse the M column as the cross-check for any
future implementation of the centered discrepancy.

#### Joint correction — Known completion and the arithmetic still missing

**Grade:** source interfaces CHECKED; exact reconstruction and support
budgets DERIVED; formal integer/logarithm controls VERIFIED.
**Question:** Q-joint-correction-source-audit.
**Established:** [joint-correction-source-audit.md](joint-correction-source-audit.md)
checks novelty first. Ford--Maynard Definition 7.1 already supplies
prime-factor subset convolution; its complementary-sum estimate uses
a separate Type II hypothesis. Mounier's signed smooth-number
condition and Friedlander--Iwaniec's asymptotic sieve are additional
source matches with unfilled input requirements.
The full logarithmic large-factor weight D_i equals the existing
short Vaughan approximant P_i minus the paid exceptional term E_i.
The supports are x^(12/25) and x^(1/10); full mixed prime/approximant
sums are within ordinary BV and their product has an elementary CRT
error O(x^(29/50)log^2 x). This makes explicit which unrestricted
weights are already controlled.
**Failed payoff:** assembling the entire prime-partner/complement
combination returns C_delta=S-C2*x-U_delta+o_delta(x). The surviving
quantity is the already-open prime correlation/Vaughan remainder.
That cancellation is not an additional estimate and gives no signed
improvement. It does not close all possible joint estimates.
**Branch control:** exponent vectors (12,13,75)/100 and
(12,13,36,39)/100 have the same unrestricted weight -3/4 but different
selected prime-cofactor weights. This distinguishes the factor-vector
functions only; it makes no shifted-density or integer-information
impossibility claim. The branch cannot silently inherit full support.
**Source limits:** Mounier's direct application at y=x^(6/25)
requires theta>19/25, beyond the currently matched input. Its signed
condition is an assumption, not a theorem about this sequence.
Friedlander--Iwaniec additionally requires its specific bilinear
estimate and distribution beyond x^(2/3). Ford--Maynard's general
Type II hypothesis is not supplied by the Pan--Ding aggregate theorem.
**Evidence:** source locators, selected proof steps, PDF images and
hashes in the owning note; [validator](joint-correction-validation.js)
checks short/long reconstruction with repeated primes, the prime
intersection term, CRT support and the formal branch control.
The machinery is prior art; literature novelty is unestablished.
**Next/reuse condition:** identify an additional estimate for the actual
coefficients in the owning note's (12), or another justified one-sided
bound for the full residual. A proposed theorem import must price
its complete complement. Do not repeat this algebraic completion or
harmonic optimization as if it supplied new distribution information.

#### Supported coefficient — Dickman collapse and an insufficient sieve lower bound

**Grade:** classical source interfaces CHECKED; harmonic identity and
budget DERIVED; finite rational controls VERIFIED.
**Question:** Q-supported-coefficient-dickman.
**Established:** [supported-coefficient-dickman.md](supported-coefficient-dickman.md)
performs the novelty check first and applies the classical Dickman
convolution identity to the complete harmonic subset coefficient,
with m=1 excluded and repeated-prime effects paid. At delta=1/100,
H_delta=D(25/12)-1+E_delta with 0<=E_delta<=24/22!, hence
-1<H_delta<-2/3. The formula extends to continuous fixed limiting
profiles between zero and one with the present plateaus, under uniform
convergence of the actual profiles. It avoids separate enumeration of up
to 50-factor integrals. The existing Pan--Ding transfer applies to both
bounded nonnegative parts, with a paid coprimality error.
**Failed estimate:** the available separate-sign lower constant
K=(10log3-40/9)H_plus-(40/3)H_minus is less than -80/9.
Adding only C2*x to that lower bound cannot prove positivity. This is
an INSUFFICIENT BOUND, not a proof that the actual supported residual
is negative. Further precision in these integrals cannot fix this
particular lower consumer. The exact prime-partner/complement
combination remains OPEN and is retained in the sufficient condition.
**Source limits:** Drappeau--Mounier 2026 supplies established rigorous
integration machinery, with polynomial weights; positive-part zero
boundaries need extra treatment. Its v1 Dickman display (21) misses
the factor u, corrected against Soundararajan's p. 1. This does not
audit or invalidate the integration code. Bharadwaj--Rodgers 2026
Lemma 8 has total factor-exponent support strictly below 1/2 for
shifted primes; a direct test marking our large cofactor fails that
hypothesis. Full Poisson--Dirichlet substitution is not unconditional.
**Evidence:** source statements and selected proofs, PDF page images
and hashes, owning derivation, and
[validator](supported-coefficient-dickman-validation.js). The finite
checks include empty-term, repeated-prime and sign controls; they
do not prove the asymptotic theorem. Literature novelty is unestablished.
**Next/reuse condition:** the complete algebraic reconstruction is
audited in joint-correction-source-audit.md and returns the earlier
Vaughan remainder without a signed improvement. A further attempt
needs an additional arithmetic estimate, not another completion of
the same identity. Reuse the Dickman formula and existing integration
machinery. Revisit the failed elementary consumer only with a changed
estimate or support.

#### Paired factor budget — Aggregate input and an insufficient positive companion

**Grade:** source interface CHECKED; regional budget DERIVED from the
named classical inputs; finite rational enclosures VERIFIED.
**Question:** Q-paired-factor-budget.
**Established:** [paired-factor-budget.md](paired-factor-budget.md)
matches Pan--Ding's mean-value theorem through Wu's published Lemma 2.3
and its actual use in (10.6)--(10.8). Averaging the small-factor products
before the absolute progression error permits level x^(9/20), with
the log-prime weight and discarded coprimality condition paid.
It derives liminf N2/(C2*x)>15223/4500 and locates a positive family
with liminf P3/(C2*x)>1171/1125>1. The positive-family lower bound
does not rely on S>=0. Both families retain prime exclusions and
proper prime powers, and have unique ordered factorizations.
**Failed shortcut:** liminf (N2-P3)/(C2*x)>5023/4500>11/10.
The proposed pair plus the main term is insufficient. Its exact
complement R_rest cannot be negligible: S>=0 forces
liminf R_rest/(C2*x)>1/10. This implication supplies no improved
twin lower bound. The closure is for this pair, current cutoffs
and omission of its complement; broader signed grouping remains OPEN.
The witnesses survive fixed delta<1/50 and all current plateau profiles.
**Evidence:** owning source match, complete logarithmic and local-density
budget, and [validator](paired-factor-budget-validation.js) with directed
BigInt integral enclosures and sign controls. Published PDF pages,
continuations and hashes are recorded. No effective onset is available.
The original Pan--Ding paper and book restatement were not independently
read; the import is Wu's published lemma. The machinery is prior art;
literature novelty of the application is unestablished.
**Next/reuse condition:** the whole supported harmonic and elementary
sieve test is completed in supported-coefficient-dickman.md. Its joint
prime-partner/complement estimate remains OPEN. Applying a nonnegative
sieve directly to the signed coefficient would be invalid. Do not
repeat either completed constant calculation for an unchanged consumer.

#### Joint factor family — Type I part evaluated, signed prime partner remains

**Grade:** DERIVED and reviewed identity and Type I evaluation;
INSUFFICIENT separate-sign bound. **Question:** Q-joint-factor-estimate.
**Established:** for the single-large-prime delta-rough family,
R_F=C2*x*H_delta-Z_F^p+o_delta(x). Ordinary prime BV applies at each
cofactor length >=sqrt x, to all odd moduli <=x^(1/10). The complement
has Type I part -C2*x*H_delta, so these linear masses cancel. The local
Mobius density constant is 2C2. Wu's squarefree-only lemma is used only
for the upper sieve, not for nonsquarefree Type I moduli.
**Failed step and repair:** the separate-sign coefficient
1+H_delta-(40/9)H_delta^+ is below -2/5; this is an insufficient lower
bound, not a negative upper bound on the actual count. A constant 2 is
still insufficient. The uniform Dickman error for 0<delta<1/50 is
12/11!<1/1000; 24/22! remains specialized to delta=1/100. The corrected
range preserves the failure, certified rationally.
**Open consumer:** Z_F^p<=(1+H_delta-eta)C2*x together with
B_L^comp>=(H_delta-eta+kappa)C2*x+o(x), fixed 0<kappa<eta on the same
unbounded scales, would give S>=kappa*C2*x+o(x). Neither estimate is
supplied. Generic o(x) for arbitrary bounded positive coefficients
without a main term is not a valid substitute.
**Evidence:** [note](joint-factor-estimate.md) sections 2,4,
[lane validator](joint-factor-estimate-validation.js),
[review](research-round-validation.md) section 9 and
[rational controls](research-round-validation.js).
**Next/reuse:** exact regrouping alone gives no new estimate, but does not
exclude useful family inequalities. Reopen with a signed correlation and
paid complement, different consumer or a correctness concern.

#### Switching literature — Actual negative mass exceeds the main term

**Grade:** DERIVED using ordinary prime BV, the nonnegative linear
sieve, Mertens and exact algebra; finite certificates VERIFIED.
**Question:** Q-switching-negative-mass.
**Established:** [switching-negative-mass.md](switching-negative-mass.md)
reads Matomäki--Zuniga Alterman's published switching framework and
matches its linear-sieve interface. For the actual family n=p*q*r,
p<q<=a_L, pq>=b_L, r prime, with n-2 a W_R-rough composite,
G_L=log r and G_R=-log(n-2), apart from paid proper powers.
A rough lower sieve at s=4 minus a prime upper sieve at s=2 gives
liminf Nhat/(C2*x)>=kappa=(10*log(3)-36/5)*I>3/2.
The ordered two-factor integral I and a rational certificate are
explicit. The shortest cofactor has BV power slack 1/450.
The witness survives fixed delta<1/50 and all profiles with the
same plateaus. The full identity forces liminf Phat/(C2*x)>1/2.
**Failed shortcut:** discarding Phat and seeking Nhat<C2*x is
refuted for these cutoffs. No sharpening of that negative-only
majorant or change inside the same taper bands can repair it.
This is not a universal sieve obstruction. The net signed margin
and twin infinitude remain OPEN; no effective onset is extracted.
The forced positive mass merely recovers the existing S>=0 budget.
**Source qualification:** Tao's 5 April 2020 comment identifies a
gap in his blog proof of the linear-sieve theorem. The classical
input remains, with the published Lemma 2.5 and book locators
recorded; the Chen benchmark's citation is qualified accordingly.
**Evidence:** owning proof, source pages and PDF hash;
[validator](switching-negative-mass-validation.js) gives exact
constant, full prime-log convolution and local-density controls.
Literature novelty of the application is unestablished.
**Next/reuse condition:** the proposed two-small-prime loss and
three-small-prime gain are now compared in paired-factor-budget.md
above. That pair is insufficient, with its complement retained explicitly.
Use the follow-up's whole-coefficient assignment before another factor
enumeration. Different cutoff exponents need a new budget; the present
closures do not price them.

#### Smooth sieve literature — Existing machinery and shifted localization

**Grade:** primary-source matches CHECKED; localization and profile
constant DERIVED using the named imports; finite algebra VERIFIED.
**Question:** Q-smooth-sieve-literature.
**Established:** [smooth-sieve-literature.md](smooth-sieve-literature.md)
matches GKM's concentration results, CCHM's quadratic optimality,
Green--Tao Appendix D, Goldston--Yildirim III and corrected Henriot.
The C3 profile has derivative energy 700/429, versus one for the
linear taper; this is a different objective from shifted absolute mass.
Weakening the first logarithmic factor in the three-prime envelope
gives a uniform growth-class majorant with bounded harmonic mass.
For each fixed 0<sigma<1, the full Ghat mass on
P^-(n(n-2))<=x^delta is O_sigma(delta^sigma x), plus the existing
O_epsilon(x^(39/40+epsilon)) exceptional error, uniformly in delta.
At fixed delta the retained integers have at most 1/delta prime
factors counting multiplicity.
**Failed shortcuts and limits:** GKM plus one-point Cauchy loses a
logarithm in this transfer. C3 does not meet its general-profile
sixth-moment hypothesis. GKM Lemma 10.5's unrestricted ordered-prime
formula is refuted by a bounded antisymmetric function; its proof
requires symmetry, which its own subsequent application has.
The v4 and journal statements were both checked. Green--Tao's divisor
theorem admits fixed shift two, but its smoothness/support conditions and extra arithmetic
weights cannot be assumed. Removing both prime filters produces an
explicit twin-count term. Fixed delta pays only a fixed multiple of x,
not a shrinking x/log^K x margin. Joint factor densities, useful
constants, tractable enumeration and the sufficient signed margin
remain OPEN; literature novelty is unestablished.
**Evidence:** source locators, PDF hashes, derivative integral, full
ordered-prime harmonic calculation and absolute transfer in the note;
[exact finite controls](smooth-sieve-literature-validation.js).
The filter control initially met JavaScript signed zero; BigInt repaired
the finite representation, with no change to the mathematical identity.
**Next/reuse condition:** use the paid tail to match specified signed
factor families to existing Buchstab, switching or almost-prime
estimates, retaining their complement and prime exclusions. A new
moment or constant calculation needs an explicit signed payoff.
The switching follow-up above completes the first such family budget
and excludes discarding all positive mass at the current cutoffs.

#### Global smooth majorant — Full absolute mass at scale x

**Grade:** DERIVED from the corrected Henriot upper theorem and elementary
majorant estimates; finite identities VERIFIED.
**Question:** Q-global-smooth-majorant.
**Established:** [global-smooth-majorant.md](global-smooth-majorant.md)
uses a C3 probability average within the same admissible initial cutoff
rectangle. The complete reduction is unchanged. A pointwise majorant
w_T(n)=2^omega(n) times the product of the three smallest clamped
log(p)/log(x) factors has bounded harmonic mass. It satisfies Henriot's
uniform growth class, although it is not multiplicative. New Theorem 5
in the published erratum gives the shifted Fhat product bound
O(x/log^2 x). The full prime-power transfer then yields
sum |Ghat_L(n)Ghat_R(n-2)|=O(x). Thus both signs have O(x) mass for
this new admissible profile; the old logarithmic profile keeps its
recorded O(x log x) absolute budget. Their complete signed sums agree
to arbitrary fixed logarithmic precision.
**Failed shortcuts and limits:** a prime-value Euler product for w_T is
invalid; the witness 210=30*7 violates multiplicativity. The general
upper theorem, not its multiplicative lower theorem, is applied.
The older profile lacks the three bounded derivatives required here.
The bound has no established constant below C2 and supplies no improved
signed lower bound or twin margin. The signed O(x) bound was already known.
**Originality assessment:** the smallest-prime finite-difference mechanism
is explicit in Granville--Koukoulopoulos--Maynard, section 1.2, equations
(1.6)--(1.7); the owning note gives the exact notation match. The complete
argument is an application of established techniques. Its literature
novelty is unestablished, and the local budget improvement must not be
reported as an improvement over published twin-prime results.
**Evidence:** the full finite-difference proof, ordered-prime harmonic
calculation, uniform source-class check and corrected root density in
the owning note; primary erratum pages 375 and 377 checked visually;
[exact finite controls](global-smooth-majorant-validation.js).
Finite proxies do not validate asymptotic estimates or an O(x) constant.
**Next/reuse condition:** seek a sufficient constant comparison or a
signed defect estimate for the full pair, keeping prime exclusions and
positive contributions. Repeating an order-only absolute estimate does
not meet that obligation. No general signed method is excluded.
The [literature follow-up](smooth-sieve-literature.md) now gives a paid
small-prime tail and records which classical surrogates should be reused.

#### Global factor signs — Complete small-prime formula and failed pair majorant

**Grade:** DERIVED exact formula and exceptional-set budget; specified
pair-trigger inequality REFUTED; finite identities VERIFIED.
**Question:** Q-global-factor-signs.
**Established:** [global-factor-signs.md](global-factor-signs.md) derives
G_i=Lambda_(>W_i)-F_i(s_i)*log(t_i)-E_i for the full logarithmic
profiles, where s_i contains all small-prime factors, including powers.
E_i is supported on inputs divisible by p^k>W_i with p<=W_i.
An elementary reciprocal-sum count and divisor bounds pay its full
shifted effect by O_epsilon(x^(39/40+epsilon)); proper prime powers
are also paid. The complete residual is therefore a signed
composite-filtered smooth/rough cofactor sum. It has no unpriced
small-cofactor tail. The negative part has an explicit prime-filter
correction, which is nonnegative but not estimated here.
**Failed step:** the proposed F^- upper bound supported only on small-prime
pairs with product >a is false. Ten small primes with every triple below
a and every quadruple above b give F=-84 while that pair count is zero.
The configuration has strict margins in the actual left exponent range;
no shifted density for it is asserted. Linear Type I support cannot
automatically be assigned to the nonlinear positive/negative part of F.
**Limits:** this removes an exceptional term, not the main mixed-sign
sum. Neither a new signed scale-x bound nor the sufficient twin margin
is supplied. A bound on the negative part alone is sufficient, not necessary.
**Evidence:** the complete derivation and [exact polynomial controls](global-factor-signs-validation.js),
including logarithmic ramps, squareful inputs, prime zeros, prime-power
corrections and an integer counterexample. The standard PNT input is
used only for asymptotic existence of the single-input factor cell.
**Next/reuse condition:** the higher-order majorant is now carried out in
[global-smooth-majorant.md](global-smooth-majorant.md), giving a full
absolute O(x) budget for a different admissible profile. The signed
constant comparison remains OPEN, with prime filters and positive
mass retained when needed. A census or pair-only classification
does not provide it.

#### Global cutoff averaging — Preserve the whole remainder before estimating it

**Grade:** DERIVED uniform reduction, imported one-point norm and
same-input cancellation; finite algebra VERIFIED. **Question:**
Q-global-cutoff-averaging.
**Established:** [global-cutoff-averaging.md](global-cutoff-averaging.md)
averages the initial U and Y cutoffs in complete Vaughan identities,
with explicit fixed margins for both prime and Mobius BV. This gives
S=C2*x+mathcal R+O_A(x/log^A x), where
mathcal R=sum G_L(n)G_R(n-2) includes every branch and the arithmetic
previously assigned to E_out. Graham's mean square gives
||G_i||_2^2=O(x log x). For sufficiently small fixed eta, the existing
sharp-corner norm then forces
<C_i,B_i>=-||C_i||_2^2+O_eta(x log^(3/2) x), where G_i=C_i+B_i.
This is cancellation between the corner and its complement at one input.
**Limits and failed inference:** it does not give the shifted cross terms,
a lower margin, or a new signed O(x) bound; the latter already follows
from positivity and the twin upper-bound sieve. Averaging only the corner
would still leave its transition and E_out. The bounded-multiplicative
subfamily theorem cannot be applied to G_i from its norm alone.
**Evidence:** the owning uniformity table and derivations, primary Vaughan
and Graham statements, the existing Mobius BV derivation, and
[integer prime-log controls](global-cutoff-averaging-validation.js).
Those controls retain prime powers, nonsquarefree inputs, independent
averaging, the r=n correction and all mixed complements; they do not
verify an asymptotic estimate.
**Next/reuse condition:** the first factor-sign attempt is completed in
[global-factor-signs.md](global-factor-signs.md), with a paid exceptional
term and a refuted pair-trigger majorant. Continue from its full signed
cofactor sum and prime-filter correction, retaining positive mass as needed.
The priority is a research judgment, not a proved optimal route. Keep
the small-cofactor transfer as a possible ingredient, with its full rate
and coefficient mismatch explicitly priced.

#### Cofactor progression transfer — A signed estimate on a growing restricted family

**Grade:** DERIVED from named correlation and non-pretentiousness inputs;
finite identities and controls VERIFIED. **Question:**
`Q-cofactor-progression-transfer`.
**Established:** [cofactor-progression-transfer.md](cofactor-progression-transfer.md)
derives a dyadic scale-average bound O_eta(log^(2-d) X) after division
by x, for some absolute d>0, for the actual prime-r coefficients restricted
to remaining cofactors s,t<=floor((log x)^kappa), for some absolute kappa>0.
It includes nonsquarefree inputs and every sharp, transition or smoothed
profile pair. The sharp choice is the joint sum of the four restricted
pieces. Modified multiplicative Euler factors represent mu(n/s) on s|n;
the source is applied on the exact CRT progression modulo [s,t]. Retaining
its density 1/[s,t] limits cofactor summation to O((log log X)^2).
Uniform non-pretentiousness, Fourier integration, dyadic sampling,
moving cutoffs, the strict transition jump and CRT rounding are priced.
**Failed extension:** full cofactors reach x^(2eta+o(1)), so their
progression moduli exceed the source's polylogarithmic range. Even a
same-rate extension would incur O_eta(log^2 X) from termwise cofactor
summation, exhausting the small saving. This rejects that application,
not a collective signed estimate or another theorem.
**Limits:** the restricted bound is still weaker than o(x). In the exact
consumer E_dagger=E_out+K_H+J_H+negligible error, J_H contains both mixed
cofactor tails and the tail product; neither J_H nor E_out has the needed
one-sided control. No full-corner improvement, exact cut or twin margin
is established. No numerical exponent, onset or literature novelty is claimed.
**Evidence:** the owning derivation, Tao–Teravainen v2 Theorem 3.1(ii),
MRT (1.12), and [finite controls](cofactor-progression-transfer-validation.js).
The controls do not prove the imported asymptotic.
**Next/reuse condition:** estimate J_H with its mixed terms, or retain
cancellation while summing cofactor pairs. Price the rate at scale x
and combine it with E_out on common scales. Do not repeat the completed
small-cofactor transfer as an open assignment.

#### Transition round — Direct review of the completed research

**Grade:** DERIVED corrections and scoped review; finite controls VERIFIED;
no signed estimate. **Questions:** `Q-transition-round-audit`,
`Q-transition-round-review`.
**Established:** [transition-round-audit.md](transition-round-audit.md)
checks the returned arguments, validators and primary theorem statements.
The original sharp energy chain survives at its stated scope. The exact
cofactor and joint-cutoff formulations are retained after correcting the
transition support. [The integration](transition-round-review.md) now gives
one reconciled dependency and budget table.
**Corrections:** the displayed cofactor kernel omitted its lower cut; the
Mellin formula represented rho instead of tau; fixed-divisor singleton
fibers were confused with long cofactor fibers; Theta's scalar mass did
not price full T; separate upper bounds were treated as actual sizes;
joint and cutoff routes were excluded beyond the inequalities proved.
**Limits:** no signed improvement, region, exact cut or sufficient twin
margin changed. The review does not reproduce every imported proof.
**Evidence:** [targeted validator](transition-round-audit-validation.js),
all four returned validators, the owning corrected reports and primary
source locators in the review.
**Reuse:** choose a signed cofactor or joint-cutoff interface, preserve
clipping and both signs, and price a complete common-scale consumer. A
source mismatch is not a closure of the broader method.

#### Sharp corner transition — Independent review

**Grade:** DERIVED argument retained using named imports; finite checks
VERIFIED. **Question:** `Q-transition-energy-review`.
**Established:** [energy review](transition-energy-review.md) retains the
sharp upper norms, sufficiently-small-fixed-eta lower norms and failure
of negligible L2 transition, with all cross-prime terms paid. The upper
constant can be taken as 2B eta(1+o_eta(1)). Citation corrections distinguish
Graham's original result from its quotation in An and correct DBT's volume.
**Limits:** B, eta_0 and the onset are not extracted; ineffectivity is not
established. The cross-prime support interval is only enclosing. Prefix
positivity would not imply the required dyadic positivity. The unretained
scratch probe is not evidence. S(z,z)=1 does not rule out sharper localized
mean-square estimates; that closure is withdrawn.
**Evidence:** [validator](transition-energy-review-validation.js), six
active controls, and the owning energy derivations. Imported proofs remain
imports, and signed correlations remain OPEN.
**Reuse:** retain the eta range. Any investigation of cross-prime signs
must use the actual shifted dyadic intervals and prime hypotheses. It is
supporting work, not a required step toward a joint signed estimate.

#### Transition source match — Inspected theorem interfaces

**Grade:** DERIVED identities; scoped failed direct applications; one
REFUTED relaxation. **Question:** `Q-transition-source-match`.
**Established:** [source match](transition-source-match.md) retains the
cofactor exchange and Theta identity. Fixed-divisor fibers are singleton
at these cuts; fixed-cofactor fibers need not be. GY's displayed error is
insufficient for the raw levels, GKM (1.15) is a one-point moment outside
that raw range, specified divisor-function correlation theorems do not
directly match T, and MRT averages shifts with bounded-function and
parameter requirements.
**Failed steps:** full coefficient representation, affine-form uniformity,
clipping, sampling and rate costs remain unpriced. The transition Mellin
kernel needs a sharp subtraction with a 1/s tail. Neither the scalar
Theta expansion nor the sharp-subfamily normalization supplies a full
representation for T. The rate test is representation-dependent.
**Refuted:** fixed-shift cancellation uniform against an arbitrary bounded
factor with one multiplicative factor, by the lambda counterexample.
**Evidence:** primary locators and custody records in the note;
[validator](transition-source-match-validation.js) checks finite algebra,
not theorem applicability. No absence theorem or exhaustion of a method.
**Reuse:** reopen a paper for a specified new reduction, proof adaptation
or correctness issue; do not repeat an unchanged invalid substitution.

#### Transition joint budget — Mixed terms and the combined inequality

**Grade:** DERIVED identities and precisely scoped norm obstruction;
OPEN signed target. **Question:** `Q-transition-joint-budget`.
**Established:** [joint budget](transition-joint-budget.md) retains the
exact split, no support leakage, the wider purely geometric inclusion,
the cutoff-average identities and mixed second difference. Separate
Cauchy upper budgets have leading order 2B eta x log^2 x. The specific
average-triangle-Cauchy output is at least ||T_L||||T_R|| by Minkowski,
and is saturated for sufficiently small fixed eta. The safe lower
coefficient pays the proper-power and smoothed remainders first.
**Corrections:** signed cutoff estimates remain open; separate control of
R_00 is not necessary under every grouping. The window-average constraint
uses theta_eff=min(theta,4B); a restricted-range theorem requires pricing
its complement, not automatic rejection.
**Evidence:** [validator](transition-joint-budget-validation.js), eight
controls, plus the corrected derivations and audit countermodels.
**Reuse:** a joint signed estimate may exploit cancellation before taking
absolute values. Smoothed norm lower bounds are optional supporting work.
No consumer input, signed saving or E_out bound is supplied.

#### Transition signed estimate — Corrected cofactor and cutoff interfaces

**Grade:** DERIVED identities and absolute budgets; OPEN local input.
**Question:** `Q-transition-signed-estimate`.
**Established:** [signed attempt](transition-signed-estimate.md) gives the
single-base split and an exactly clipped two-affine-form cofactor average
with tau_i=rho_i 1_(D_i,z_i), both gcd branches and prescribed residues.
The existing proper-power support argument gives
R_11=R_11^(PP)+O_epsilon(x^(39/40+epsilon)); the returned 79/80 exponent
was weaker. Cauchy gives 2B eta x log^2 x(1+o_eta(1)); cofactor triangle
gives the weaker 4eta^4 x log^4 x budget. The cutoff-difference identity
retains both boundary windows and exact floor-dependent logarithms.
**Limits:** no uniform positive clipped fiber length, no signed saving.
Input M states a local one-sided O(x) bound on an unbounded dyadic set.
Mixed and outside estimates must separately fit a common-scale budget,
or be replaced by a joint or admissible averaged estimate.
**Evidence:** [validator](transition-signed-estimate-validation.js) and
[audit controls](transition-round-audit-validation.js). The returned
validator already included the cut omitted in the printed formula.
**Reuse:** attempt the weighted cofactor average or joint cutoff correlation
with full normalization. Norm-only repetition cannot supply the signed gain.

#### S-0905-13 — Controlled a signed region across singleton fibers

**Grade:** DERIVED using the classical quantitative Möbius mean estimate;
finite algebra and saved-factor tests VERIFIED.
**Question:** `Q-signed-divisor-grouping`.
For every fixed H, the actual remainder restricted to de≤x^(7/10) is
O_H(x/log^H x). Its density term cancels by a uniform excluded-prime
Möbius convolution; the summed CRT endpoint errors are
O(x^(99/100) log³x). Both signs in this region still have mass at least
c*x*log(x) eventually, so this is signed cancellation across fibers.
**Evidence:** [derivation and parameter budget](signed-divisor-grouping.md),
[independent validator](signed-divisor-validation.js),
[saved signed blocks](data-reuse/signed-grouping.json).
**Limit:** the complementary product range remains OPEN. No practical
asymptotic onset, improved twin count or novelty is claimed.
**Related failure:** F-0905-14.

#### S-0905-14 — Isolated the remaining signed endpoint sum

**Grade:** EXACT CRT and discrete partial-summation identities; DERIVED
cancellation of the complementary density term.
**Question:** `Q-signed-divisor-grouping`.
The remaining region has an explicit inverse-residue fractional-part
error E_>, with S(x)=C₂x+E_>(x)+o(x). Reuse its precise coefficients,
composite moduli, product cut and endpoint weights when auditing an import.
**Evidence:** [endpoint interface](signed-divisor-grouping.md),
[exact discrepancy and weighted-summation checks](signed-divisor-validation.js).
**Limit:** identifying E_> does not estimate its sign or prove its sufficient
one-sided hypothesis. The required scale-x improvement is OPEN.

#### F-0905-14 — Extending the unsigned endpoint budget to the remaining range

**Verdict:** INSUFFICIENT BOUND, not a refuted signed estimate.
**Question:** `Q-signed-divisor-grouping`.
After the β expansion, separate absolute CRT errors cost
O(L*V*Z*log³x) up to product L. This gives a saving for every fixed
product exponent below 71/100, but supplies no scale-x saving when
extended without additional cancellation. On the full complementary
rectangle the same allowance is O(x²log²x), worse than the existing
O(x log⁴x) absolute bound. The complementary density term does cancel;
the unestimated part is its signed finite-interval discrepancy.
**Evidence:** [error budget and exact remaining sum](signed-divisor-grouping.md),
[finite CRT checks](signed-divisor-validation.js). **Reuse:** S-0905-13–14.
**Revisit only with:** a signed bound across endpoint phases, a sharper
summed discrepancy estimate, or a different decomposition with its own
error budget. The exponent 71/100 is not a universal method barrier, and
the sufficient one-sided endpoint hypothesis remains OPEN.

#### Endpoint-target-audit — A shrinking positive margin is sufficient

**Grade:** DERIVED quantitative error accounting and CONDITIONAL twin
implications using classical inputs. **Question:** `Q-endpoint-target-audit`.
The complete reduction has error O_H(x/log^H x) for every fixed H.
Consequently C₂x+E_>(x)≥c*x/log^K x on unbounded dyadic scales, with
fixed c,K>0, suffices for infinitely many twins. A logarithmically
rescaled average also suffices. Both endpoint hypotheses remain OPEN.
The fixed-fraction target remains a stronger sufficient option; its
failure would not refute the smaller-margin target. The recorded
uniform-gap Kloosterman comparison does not establish an obstruction
at these different coefficients, positions and quantifiers.
**Evidence:** [rate accounting, conditional derivations and scope check](endpoint-target-audit.md).
**Reuse:** retain the smaller margin after removing the additional
rectangle in [endpoint-fourier.md](endpoint-fourier.md). **Limit:** the
target audit itself adds no cancellation estimate, count, effective onset
or independent referee validation. Its Fourier follow-up controls a
region, not the full E_>. Recheck a decisive prior claim at its exact
scope before using it to exclude an approach.

#### Endpoint-fourier — Aggregation makes a further rectangle controllable

**Grade:** EXACT coefficient identity; DERIVED regional estimate from
Vaaler, Bettin–Chandee and the uniform Möbius mean; finite checks VERIFIED.
**Question:** `Q-endpoint-fourier`.
Combining small prime-power terms on each expanded divisor yields
coefficients bounded by 2log l. For original ranges d~x^delta,
e~x^nu, put a=delta+6/25, b=nu+1/20. The complete Fourier budget gives
O_H(x/log^H x) for each rectangle with
(17/20)(a+b)+(1/4)max(a,b)<1, delta>6/25 and nu>1/20.
In particular d in (floor(x^0.27),2floor(x^0.27)] and
e in (floor(x^0.46),2floor(x^0.46)] are controlled. Its endpoint error
has a power saving and its density cancels at every fixed logarithmic
precision. The whole rectangle lies outside de≤x^0.70 eventually.
**Unsuccessful steps:** applying the same bound separately to the small
prime-power factors has first norm exponent 2279/2000 in this example;
aggregation reduces it to 1989/2000. Dropping all nonconstant Vaaler
majorant terms is invalid: a retained finite counterexample has actual
truncation error 0.859687064 versus the zero-only allowance 0.2.
On full expanded supports of order x, the generic first exponent is
39/20, so this estimate still supplies no full residual bound. That
upper-bound shortfall is not a lower bound or impossibility theorem.
**Evidence:** [derivation, sources and complete budget](endpoint-fourier.md),
[independent algebra and exact exponent checks](endpoint-fourier-validation.js),
[retained checks and reused prefixes](data-reuse/endpoint-fourier.json).
**Limits:** a rectangle, not a uniform product cutoff at x^0.73; no
proportion of mass controlled, effective onset, novelty or twin lower
bound is claimed. The written theorem application has been checked here;
the finite tests do not establish its asymptotic claims.
**Reuse or revisit:** preserve aggregation, g=2, the endpoint perturbation
and every majorant frequency. The [coefficient follow-up](coefficient-structure.md)
supplies a smaller nonsquarefree norm and a squarefree norm lower bound.
The [paired endpoint follow-up](endpoint-pairing.md) improves this budget
and controls another rectangle. To continue, exploit the remaining
arithmetic phase correlation or use a justified one-sided argument. A coupled
product cut requires a separate treatment. Both sufficient twin margins
in the target audit remain OPEN after removing the controlled rectangle.

#### Coefficient-structure — Sparse exceptions and the squarefree core

**Grade:** EXACT coefficient classification; DERIVED support bounds,
norm lower bound and regional endpoint reduction using classical inputs;
finite identities and sector reconstruction VERIFIED.
**Question:** `Q-coefficient-structure`.
On I=(D,2D], the aggregated contribution splits as
L_0(l)log n+L_1(l)+Q(l)+B(l). The low terms lie in I. Q is a
squarefree Möbius sign times a nonnegative prime-log sum; B has at most
one repeated prime and is explicitly plus or minus its logarithm.
The nonsquarefree norm is O(sqrt(D)*W^(1/4)*log^(3/2)(2DW)), allowing
its endpoint sectors to be controlled in a larger range.
For d~x^0.277, e~x^0.467, all endpoint sectors except QQ have a
power saving: their largest first exponent is 19913/20000, whereas
the separate-endpoint QQ budget has 20163/20000. The total rectangle density cancels at arbitrary
fixed logarithmic precision, leaving R_{I,J}=E_QQ+O_H(x/log^H x).
A separate excluded-prime argument also controls the QQ density,
so its raw correlation is an equivalent target at that precision.
**Failed step and its scope:** a uniform power saving in the individual
squarefree norms is impossible. Ordinary PNT and an elementary squarefree
count give sum_{DW/2<l<=2DW} Q(l)^2 >= c*DW*log W for fixed positive
power scales D,W. Reinforcing prime contributions supply this lower
bound. It does not exclude cancellation in the signed inverse-residue
correlation, special ranges, logarithmic gains or one-sided bounds.
**Evidence:** [classification and proofs](coefficient-structure.md),
[exact vectors, norm witnesses and 16-sector validator](coefficient-structure-validation.js),
[retained checks and archived prefixes](data-reuse/coefficient-structure.json).
**Limits:** the further rectangle is reduced, not controlled, and the
full twin margin remains OPEN. The exact finite QQ endpoint retains its
density subtraction; raw prefix QQ sums are not endpoint estimates or
full-interval averages. The nonsquarefree terms
are not identically zero: both signs have exact witnesses.
**Reuse or revisit:** use the prime-factor identity (13) in the note,
preserving the prime averages and CRT parity branches. The
[paired endpoint budget](endpoint-pairing.md) reduces the relevant deficit
to 61/20000 near h~MN/x on the top boxes, and controls their lowest
frequencies. That note also controls the entire majorant by an elementary
divisor-count argument.
A one-sided strategy can use a different sufficient budget. Do not retry uniform
squarefree norm power savings without changing their stated scope.

#### Endpoint-pairing — Interval cancellation and the transition frequencies

**Grade:** EXACT polynomial integral identity; DERIVED regional bound
from the existing Vaaler, Bettin-Chandee and Mobius inputs; finite
identities and rational budgets VERIFIED. **Question:** `Q-endpoint-pairing`.
Keeping the two interval endpoints together saves min(1,Ax/(MN)) in
the polynomial sum. The positive error majorant does not have that
factor; its nonzero frequencies instead retain their coefficient A/T.
The complete first exponent becomes
3/20+(7/10)(a+b)+(1/4)max(a,b), with the second term also controlled.
This bounds the full rectangle d~x^0.275, e~x^0.465 to O_H(x/log^H x)
for every fixed H. Its endpoint first exponent is 3999/4000<1,
whereas the separate-endpoint estimate gives 4017/4000>1.
The balanced sufficient boundary is a=b<17/33. An independent elementary
bound controls the entire positive majorant by O_epsilon((MN/T)*x^epsilon):
group nearby CRT solutions by their integer value and count divisor pairs.
Both negative integers and the exceptional values 0,2 are accounted for;
the latter contribute no pairs because both divisor indices exceed 2.
**Remaining failure:** on the larger squarefree pilot a=b=0.517,
the transition h~MN/x~x^0.034 still has first exponent 20061/20000>1.
The relevant deficit is 61/20000 before strict losses. The low-frequency
polynomial on these top boxes has exponent at most 19993/20000 for
h<=x^0.03. Thus focusing on h~1 as their obstruction would repeat an
avoidable loss. A direct fixed-q application of Wright v2 Theorem 2.1,
followed by triangle summation over q, has exponent 1.01895 even
with a free perturbation cost, and does not close this deficit.
The advertised improvement in arXiv:2601.00292 does not follow after its
authors' erratum (v2, missing factor L^2 in (2.53)) and is not an input. Neither failed import excludes a retained-prime-average estimate.
**Rejected shortcut:** applying the interval factor to the whole
positive majorant is false at sawtooth jumps. The retained witness has
error 0.859687064, full allowance 0.968575681, but incorrectly paired
allowance 0.110694364; the note gives a family disproving any universal
such factor. Nonzero majorant modes cannot be discarded either.
**Evidence:** [derivation and versioned sources](endpoint-pairing.md),
[validator](endpoint-pairing-validation.js),
[retained checks](data-reuse/endpoint-pairing.json): 35,640 polynomial
identities, 757,350 complex harmonic checks, 8,910 exact CRT count checks,
both gcd branches, and 79,728 exact rational envelope inequalities.
The whole-tail check adds 6,376 Fejer bounds and 2,307 integer
divisor-count bounds, including 897 negative integers. The existing
251-check numerical audit and all strict QC/self-test checks also pass.
**Limits:** this is a rectangle with product of order x^0.74, not a
uniform product cutoff, a mass proportion, an effective onset or a twin
lower bound. The full complementary endpoint remains OPEN; the larger
QQ pilot is controlled by [prime dispersion](prime-dispersion.md).
Finite tests do not prove the asymptotic inputs; no novelty is claimed.
**Reuse or revisit:** seek a correlation estimate near each relevant
box's transition, retaining p,q averages and the endpoint phase. Consume
the divisor-count bound for the full majorant rather than requiring a
further oscillatory saving there, or justify a different one-sided consumer.
Do not repeat the lowest-frequency or norm-only attempts at unchanged scope.
The [prime-band follow-up](prime-band-completion.md) now localizes the
prime ranges and treats completion; [prime dispersion](prime-dispersion.md)
consumes it to control the larger pilot, retaining right-prime cross terms.

#### Prime-band-completion — Localized core and the full dual spectrum

**Grade:** DERIVED prime-strip and uniform low-h removals using the
paired classical-input budget; EXACT completion, Gram identity and
diagonal lemma; finite checks VERIFIED. **Question:** `Q-prime-band-completion`.
On the unresolved pilot, aggregation removes p<=x^0.235 or q<=x^0.045
with first exponent 19991/20000<1. An envelope uniform in the expanded
divisor product removes h<=x^0.029, with exponents 19991/20000 and
193/200. The residual prime bands are (x^0.235,x^0.24] and
(x^0.045,x^0.05], and the positive harmonics satisfy x^0.029<h<=T,
T=O(x^0.0342) chosen per divisor box. Both primes exceed 2h eventually.
The full approximation tail remains controlled by divisor counts.
This localization alone does not improve the 61/20000 exponent deficit.
The separate [dispersion argument](prime-dispersion.md) now controls
the full pilot using these reductions.
**Unsuccessful step:** exact completion of the right prime modulus
produces all dual residues and coefficients depending jointly on h
and the dual variable, through the modulo-e and endpoint phases.
They cannot automatically be treated as separate short coefficients.
For the unrestricted kernel K_(h,t)=S(t,lambda*h;q), q prime,
2<=number of rows<=q-1, the derived Gram matrix is q^2 I-q J;
its norm is exactly q. Even after t=0 is removed the norm remains q.
Thus a uniform fixed-power saving for arbitrary full-frequency vectors
is false. This does not refute cancellation of the actual structured
coefficient, an effective separated approximation with a proved error,
or a joint-modulus dispersion estimate. Pascadi's Theorems 1.1, 1.2,
7.1 do not directly match this completion; no new theorem is imported.
**Reusable diagonal fact:** for primes q_i>h_i>0, equality
h_1/q_1=h_2/q_2 forces identical pairs. This identifies only that
diagonal, not every possible coincidence in a further dispersion argument.
**Evidence:** [derivation and source audit](prime-band-completion.md),
[validator](prime-band-completion-validation.js),
[retained artifact](data-reuse/prime-band-completion.json). Checks include
8,192 divisor/prime comparisons, 8,468 exact phase splits, 28 completion
identities with the endpoint perturbation, 462 Gram entries and 36
norm-attaining checks. There are 1,134 exact rational envelope checks
and 17,424 equal-fraction comparisons. Both gcd branches are included.
All fourteen strict QC gates, the verifier self-tests and the existing
251-check numerical audit pass; these do not prove the asymptotic inputs.
**Data reuse and limits:** all three retained archived prefixes have
an empty high-band core because at least one rounded prime band is
empty. This is a finite cutoff effect, not evidence of an asymptotic
rate. The toy high-band endpoint is -9.232843649 and its density is
5.326894578; neither is silently set to zero. No twin lower bound,
effective onset, mass proportion or novelty is claimed.
**Reuse or revisit:** consume the completed dispersion argument below,
which changes the placement of Cauchy while retaining the actual phases.
The full-spectrum closure and coefficient-separation caveat here remain
valid. A larger run is justified only by a specific falsifier and
sufficient input fields.

#### Prime-dispersion — A second moment controls the full pilot

**Grade:** DERIVED bound using classical Ramanujan and Weil inputs;
EXACT regrouping and second moment; finite checks VERIFIED.
**Question:** `Q-prime-dispersion`.
The full d~x^0.277, e~x^0.467 rectangle now satisfies
R_IJ=O_H(x/log^H x) for every fixed H. This consumes the established
coefficient-sector, density, prime-strip, uniform low-h and entire-majorant
bounds; it does not replace those arguments with a numerical observation.
The decisive choice is to aggregate m=dp before Cauchy, keeping a
logarithmically bounded coefficient on an interval of length M. For each
e, retain both right-prime and harmonic averages in the second moment.
Its only zero-phase pairs are identical (q,h). Same-prime different-h
pairs have modulus eq and gcd loss O(A); distinct primes have modulus
e*q1*q2 and gcd loss O(AZ). Interval completion keeps the Ramanujan
full-period term, and partial summation prices the true endpoint weight.
The diagonal's final exponent is 1989/2000=0.9945; the largest
off-diagonal exponent is 1173/1250=0.9384, before an arbitrarily small
loss. The remaining high-h polynomial is O(x^0.995).
**Unsuccessful placement and scope control:** fixing p before Cauchy
leaves a much shorter d interval. The present uniform Weil bound then
loses to the trivial cross kernel, returning exponent 1.034 after
the outer sums. This is an insufficient bound, not an impossibility
result. Dropping the e factor from the cross-prime modulus is also
invalid in general: e=5, q1=11, q2=13, h1=h2=1, theta=1 yields
modulus 715, and the phases at m=1,144 differ despite equality modulo 143.
**Evidence:** [derivation and classical inputs](prime-dispersion.md),
[validator](prime-dispersion-validation.js),
[retained artifact](data-reuse/prime-dispersion.json). Checks include
6,144 coefficient identities, 1,024 parity zeros, eight original-versus-
grouped endpoint polynomials, 54 endpoint-weighted second moments,
606,096 exact modulus comparisons, 90 interval completions (30 longer
than their moduli), and 180 rational exponent comparisons. Both gcd
branches and all pair classes occur. The validator's first run caught
a same-prime exponent addition error: the corrected row is 0.8884;
the leading diagonal and cross-prime budgets were unaffected.
All fourteen strict QC gates, the verifier self-tests (58 positives and
47 controls), and the existing numerical audit (251/251) also pass.
**Limits:** the controlled rectangle has product scale x^0.744, compared
with the previous x^0.74 rectangle. These are rectangle statements, not
a uniform product cutoff or measured proportion of the residual. The
global endpoint remainder and sufficient twin margin remain OPEN.
The retained prime table supports algebra checks; the archived high-band
cores are still empty at their finite cutoffs. No effective onset or
asymptotic rate is measured, and no novelty is claimed.
**Reuse or revisit:** the [range follow-up](dispersion-range.md) supplies
a different orientation and averages the gcd loss, controlling a larger
region. Consume its explicit constraints along with the pilot here.
Do not repeat the norm-only attempt or the full-frequency operator
closure at unchanged scope.

#### Dispersion-range — Averaged gcd losses and a region of rectangles

**Grade:** DERIVED regional bound with classical inputs, EXACT reciprocal
and second-moment identities; finite checks VERIFIED.
**Question:** `Q-dispersion-range`.
Reversing inverse reciprocity shifts both interval endpoints by 2 and
moves the larger left distinguished-prime average into the second moment.
Cauchy in the right expanded divisor and then in the original left
divisor allows the bound sum_(d~D) gcd(r,d)^alpha << D*tau(|r|),
for r!=0 and 0<alpha<=1, before completion's gcd loss is bounded.
This elementary average needs no hypothesis r<D and does not apply
to the zero diagonal. Every right coefficient sector is retained;
the left low and nonsquarefree sectors use a derived paired sparse-norm
transfer. All harmonics can be retained after the small-left-prime cut.
The leading cross-prime budget is (5/4)a+(1/2)b+3/50, where
a=delta+6/25 and b=nu+1/20. The owning note's four strict conditions
include every diagonal, prime-cut, sparse-sector and period contribution.
They control the full d~x^0.282, e~x^0.522 rectangle to arbitrary fixed
logarithmic precision. Its product scale is x^0.804; the cross-prime
and left-sparse exponents are 0.9985 and 0.9988 before losses.
**Range and limit:** the exact product-exponent supremum of those
sufficient inequalities is 5397/6700, approached at
a=876/1675, b=959/1675. Both the left B and cross-prime budgets
become tight there. This is neither a uniform product cutoff nor an
optimality result for other estimates. Balanced expanded supports
separately allow 12/25<s<94/175, including d~x^0.297, e~x^0.487.
At s=.538 the current cross-prime exponent is 2003/2000, so that
particular bound is insufficient, not a proof that cancellation fails.
The global endpoint remainder and sufficient twin margin remain OPEN.
**Unsuccessful intermediate budget:** extending the previous orientation
with one uniform low-h cutoff requires 4s-41/20<eta<(3-5s)/14.
Its overlap ends at s=317/610 and fails at s=.52 by a gap of 1/700.
Changing orientation and averaging the gcd loss avoids inheriting that
incompatibility. The finite validator also caught a period-term exponent
using the original right-divisor exponent instead of the expanded one;
the corrected balanced value is 0.6855 and is not a limiting term.
**Evidence:** [derivation and region](dispersion-range.md),
[validator](dispersion-range-validation.js),
[retained artifact](data-reuse/dispersion-range.json). Checks include
5,472 averaged-gcd inequalities, 1,200 right-coefficient decompositions,
127,068 shifted endpoint identities, twelve exact weighted moments,
693,684 pair phases and 48 sparse-sector exponent checks. They include
199,400 off-diagonal terms with nontrivial gcd, both gcd branches,
all right coefficient types and controls for the omitted endpoint shift
and r=0. Existing saved primes support these algebra checks; no large
sieve or asymptotic measurement is added.
All fourteen strict QC gates, the verifier self-tests (58 positives and
47 controls), and the existing numerical audit (251/251) also pass.
**Reuse or revisit:** [sparse dispersion](sparse-dispersion.md) now controls
the left B/right Q sector with paired endpoints and frequency collisions
included. It relaxes this note's first inequality after checking every
other sector. Consume that follow-up rather than repeat the opposite
orientation. It also specifies the signed cross-prime moment and its
one-sided Cauchy consumer. The full residual remains OPEN; no novelty
is claimed.

#### Sparse-dispersion — Paired moments with frequency collisions

**Grade:** DERIVED regional bound with classical inputs; exact coefficient,
frequency and second-moment identities, with separate finite validation.
**Question:** `Q-sparse-dispersion`.
The global twin margin remains OPEN. Keeping the left nonsquarefree norm
inside Cauchy and the right primes and harmonics inside its second moment
controls the BQ sector. Distinct primes can have zero numerator when
h1=kq1,h2=kq2; they are counted with the identical pairs. Nonzero kernels
retain distinguished-prime gcd factors and average them over harmonics,
then average the remaining gcd over the original divisor. Endpoint
pairing inside the moment controls all low harmonics without requiring
q>2h. Complete periods and the whole positive Vaaler majorant remain
priced separately. This derives the uniform bound in the owning note (12).
**Range:** combining this estimate with the existing left-prime dispersion
and every other coefficient sector controls d~x^0.275, e~x^0.541, a full
rectangle at product scale x^0.816. The leading BB and left-prime cross
budgets are 0.99945 and 0.99925. The product-exponent supremum of the
stated sufficient inequalities is 1368/1675, about 0.816716, approached
at a=1727/3350, b=3961/6700. BB and the left-prime cross moment both
become tight there. This is not a uniform product cutoff or a bound on
the full remainder. The actual signed cross moment is written before
the final kernel triangle inequality; an upper saving x^(-gamma) in its
moment reduces the block exponent by gamma/2. This stronger estimate
remains OPEN, and alone would not remove the BB constraint.
**Failures and controls:** the preceding paired sparse-norm bound gives 1.01195
on the new rectangle, insufficient for a saving. Reusing q>2h would
discard needed harmonics, since T can reach exponent 0.10602 while
q<=x^0.05. Explicit witnesses refute the resulting false zero-pair
exclusion and the omitted distinguished-prime gcd factor. The preceding
notes' prime cuts validate their narrower use of those assertions.
A finite-difference check initially failed at large phase because its
second-order truncation error exceeded the comparison tolerance; a
fourth-order Richardson comparison checks the same analytic derivative.
This was a numerical diagnostic issue, not a change to the derivative
or the claimed variation bound.
**Evidence:** [derivation, full region and signed target](sparse-dispersion.md),
[validator](sparse-dispersion-validation.js),
[retained artifact](data-reuse/sparse-dispersion.json). The checks use the
saved prime table, actual B coefficients, both gcd branches, harmonics
below and above the primes, exact moment partitions and rational budgets.
They measure no asymptotic cancellation rate.
The completed run includes 8,722 B identities, 1,388,040 gcd
factorizations, 24 exact moments, 1,251,432 pair phases and 22
paired-sector budgets. All fourteen strict QC gates have zero findings,
the verifier self-tests pass (58 positives, 47 controls), and the
independent existing numerical audit passes 251/251 checks.
**Reuse or revisit:** the opposite BQ orientation and frequency matching
are completed at this scope. [Prime-power dispersion](prime-power-dispersion.md)
now splits the left B coefficient and prices its entire odd-power core.
It also uses the paired, all-harmonic first-power moment to remove the
older prime cut. Consume that follow-up's region and limits before
proposing another BB calculation. Do not pair the positive approximation
tail or apply a global norm discount pointwise on a smaller box.

#### Prime-power-dispersion — Exceptional coefficient and all-harmonic moments

**Grade:** DERIVED regional bound with classical inputs; exact coefficient,
modular and moment identities, with separate finite validation.
**Question:** `Q-prime-power-dispersion`.
The full remainder and sufficient twin margin remain OPEN. The exact left B
coefficient splits into odd prime-power sums and an exceptional part with
norm O(sqrt(D) log^2(2DV)), retaining support O(DV). For every fixed
power k inside the moment, power bands R<=p^k<2R make the constants
uniform as k grows. The common-divisor gcd average and harmonic averages
of the full prime-power gcd handle all nonzero numerators; equal rational
frequencies supply an explicit additional zero class. Paired endpoint
weights control that entire zero class, with the complete-period term and
the full positive majorant retained. The k=1 case consequently needs no
small-prime/harmonic cut. Both reciprocal endpoint shifts and gcd branches
remain explicit, and all right coefficient sectors are allowed.
**Range:** C(a,b)<28/25 and W_L(a,b)<1 suffice for the full rectangle
bound O_H(x/log^H x), with the original cutoffs and a=delta+6/25,
b=nu+1/20. The example delta=0.247, nu=0.612 has product scale
x^0.859 and leading budgets 0.9998 and 0.99975. The exact supremum
of product exponents in these inequalities is 5757/6700, about 0.859254,
approached at a=816/1675, b=1109/1675. The remaining tight terms are
the exceptional coefficient's paired bound and the signed first-power
cross moment. This is not a uniform product cutoff or full remainder bound.
**Failed shortcuts:** at the new rectangle the preceding BB norm budget
is 1.0473 and the unpaired diagonal budget is 1.029; those estimates
are replaced, not assumed small. Replacing gcd(h,p^k) by gcd(h,p)
fails already at h=25,p=5,k=2. Base-prime dyadic bands can widen by
2^k and are not uniform for growing k; power bands resolve that issue.
The validator also demonstrates failures of ordinary Number residue
arithmetic above the safe integer range. Its actual kernels use BigInt.
The old 1.01195 budget in the preceding entry is correctly described as
paired; correcting that wording changes no numerical value or bound.
**Evidence:** [derivation and full region](prime-power-dispersion.md),
[validator](prime-power-dispersion-validation.js),
[retained artifact](data-reuse/prime-power-dispersion.json). The completed
3.3-second run checks 1,883,736 coefficient identities, 1,152 harmonic
gcd/counting bounds, 80 weighted moments, 1,434,208 pair phases and
197,736 shifted endpoint identities. It includes powers through eight,
10,612 distinct-prime zero terms, 217,616 nonzero prime-power gcd terms
and every right coefficient sector. There are 56,368 kernels above the
safe integer range; the deliberately unsafe arithmetic disagrees with
55,284 exact residues. These are finite algebra tests, not measured
asymptotic rates. Harmonic subsets in the large-power examples are
declared; the all-harmonic conclusion comes from the written proof.
All fourteen strict QC gates have zero findings, verifier self-tests pass
(58 positives, 47 controls), and the independent numerical audit passes
251/251 checks in 165.2 seconds. Together with the new validator this is
under three minutes of numerical runs, within the authorized budget.
**Reuse or revisit:** consume the uniform power-band moment and the
two-inequality region. The [coverage follow-up](residual-coverage.md)
now handles the first branch inside a shorter-base moment, includes the
prime-free terms, and separates exact coupled cuts. Its full region no
longer has the exceptional norm condition. Use that audit's remaining
sum and edge-specific budgets before another local optimization.

#### Residual-coverage — Exact global complement and first-branch dispersion

**Grade:** DERIVED bounds from the existing classical completion inputs;
VERIFIED finite twisted identities, moment algebra and exact masks.
**Question:** `Q-residual-coverage`.
The sufficient twin margin and full endpoint remainder remain OPEN.
The first branch B(p^k m), with pm in the original interval, has base
length D/P on a power band p^k~R, P=R^(1/k). Retaining that shorter
interval bounds its cross term by F*D^(5/4)*W^(3/4), up to the stated
losses, while preserving zero and complete-period terms. A prime-free
moment controls the low coefficients, and a separate singleton calculation
retains the actual p=2,g=2 reduced power. Both orientations consequently
cover the whole coefficient without an exceptional norm constraint.
**Range and complement:** full boxes are controlled when delta+nu<19/25
or 5delta+2nu<123/50. Independent divisor twists have uniform endpoint
bounds; an explicit truncated Perron argument therefore separates de and
d^5*e^2 cuts, including their intersection. The untwisted density is
bounded directly on its original intervals before separation. Every fixed
de<=x^theta with theta<19/25, and d^5*e^2<=x^lambda with lambda<123/50,
has arbitrary fixed logarithmic savings, as does their union. This is a
uniform product improvement over 7/10 (and the elementary allowance
theta<71/100). The regional product supremum 87/100 is a different claim.
The concrete remaining E_* in (16) has de>floor(x^(3/4)) and
d^5*e^2>floor(x^(49/20)); all margin strips and endpoint conventions
are retained. S=C2*x+E_*+O_H(x/log^H x) preserves the open one-sided
and rescaled-average twin consumers.
**Insufficient bound and next target:** at d~e~x^(2/5), the right
cross/zero/period budgets are 179/200, 51/50, 21/25. Improving the
cross term alone does not fix its zero-frequency deficit. The extra
Cauchy inequality in the original divisor loses its Mobius signs.
Equations (19)--(20) retain those signs and give a specified first-power
sector target: a signed upper bound with moment exponent below 34/25,
versus the current 7/5, requiring more than a 1/25 saving. The other
sectors and the full complementary domain remain to be handled. Neither
this failed estimate nor the nonnegative zero class excludes another proof.
**Evidence:** [derivation and exact consumer](residual-coverage.md),
[validator](residual-coverage-validation.js),
[retained input checks](data-reuse/residual-coverage.json). The finite
decomposition covers 146,016 twisted coefficient identities and 1,710
power-of-two reductions. Exact reciprocity checks reject the omitted-shift
control. The moment tests include twists, both orientations, both gcd
branches, the low terms and larger prime powers. A rational grid tests
117,711 budget points. The archived factor data supply 273,177 weighted
divisor pairs for exact inclusion-exclusion, with nonzero overlap as the
double-counting control and BigInt monomial masks. None of these finite
checks measures an asymptotic cancellation exponent.
The final validator runs in 1.4 seconds and includes forty moment checks
with 535,900 expanded pairs. All fourteen strict QC gates have zero
findings; verifier self-tests pass all 58 positives and 47 controls.
The independent existing numerical audit passes 251/251 checks in
164.7 seconds. Numerical verification remains under three minutes.
**Reuse or revisit:** the coverage audit, exceptional first branch,
prime-free moment and cut separation are completed at their stated scope.
The [literature audit](structural-literature-audit.md) derives the
cross-divisor kernels, lcm moduli, gcd factors and rational-frequency
coincidences before the second Cauchy step. Their improved analytic
estimate remains open; use the audit's full-moment test next.
The right zero term limits the uniform-product edge; the left cross term
limits the other edge. Choose the next estimate by its effect on the
explicit complement, not by maximizing a regional product exponent.

#### Structural-literature — Theorem interfaces and the exact cross-divisor kernel

**Grade:** SOURCE-CHECKED theorem interfaces; DERIVED kernel identities,
collision count and conditional parameter comparisons; VERIFIED finite
algebra. **Question:** `Q-structural-literature-audit`.
No reviewed modern theorem directly closes E_*. The
[grouped-divisor follow-up](grouped-divisor-moment.md) derives the proposed
full moment from classical completion and controls an additional region.
The global twin margin remains OPEN.

**Reusable result:** with u_i=j*ell_i, j=gcd(u1,u2), the paired inverse
phase has modulus c=j*ell1*ell2 and numerator
-theta*(h1*ell2-h2*ell1). Its zero class is exactly
h_i=t*ell_i, requiring j>N/(2A) on u_i~N,h_i~A. The number of ordered
collisions is at most 8*N*A*H_floor(2*min(N,A)). On the live squarefree
first-power sector the original sign product is mu(ell1)*mu(ell2);
squarefreeness and other common-factor weights remain. The nonzero gcd
inequality in (6) includes repeated prime powers. Equation (8) gives
the exact endpoint-weighted completion and exposes coupled coefficients.

**Useful matches and insufficient imports:** Pascadi's dispersion-coefficient
spectral theorem has the same linear frequency difference, but at the
natural diagnostic level q~L², L=N/J, its extra factor is trivial when
J<=x^0.27 at the benchmark. This does not exclude another spectral
factorization. Blomer--Pascadi's July 2026 composite-modulus bilinear
estimate and Pascadi's factorization-sensitive estimate require a short
separated bilinear form that has not been constructed. A headline saving
cannot be multiplied into the present moment. Trace-function estimates
require prime moduli and kernel hypotheses; the reviewed Mobius estimate
has only logarithmic savings. Triple-convolution dispersion subtracts
small-conductor characters, whose contribution must be handled separately.
Well-factorable progression weights, divisibility-graph expansion,
quantitative Chowla correlations and the asymptotic sieve each have
explicit transfer or input gaps recorded in the note. These are failed
direct imports, not refutations of those methods or of the twin target.

**Evidence:** [source-linked audit and derivations](structural-literature-audit.md),
[validator](structural-literature-validation.js),
[retained finite checks](structural-literature-validation.json).
The validator independently checks modular phases, original-divisor sign
products, collision parametrization, gcd bounds, endpoint-weighted Fourier
completion and rational budgets. Incorrect modulus, missing theta and
unrestricted squarefree-sign controls are detected. These tests do not
prove a saving or validate the papers' proofs.

**Next and revisit conditions:** the full grouped-moment test is now
completed in the next entry. It includes the coefficient sectors,
harmonic gcd averages, periods, endpoint variation and twists, and removes
the old 1.02 loss at the benchmark without assuming Mobius cancellation.
Match a complete spectral formula or a separated bilinear piece for the
follow-up's remaining small-common-divisor kernel. Centered dispersion
and graph transfers remain alternatives with concrete obligations. Do
not repeat the unmatched theorem comparisons or the completed moment.

#### Grouped-divisor-moment — Full moment, exact additional cut and next kernel

**Grade:** DERIVED from classical completion and elementary gcd averages;
VERIFIED finite identities and rational bookkeeping.
**Question:** `Q-grouped-divisor-moment`.
The full endpoint margin and twin-prime infinitude remain OPEN.

**Established result:** the full aggregate coefficient, with arbitrary
complex divisor twists of nonnegative real part, stays inside one
Cauchy moment. Equal rational frequencies contribute at most
B²*x^epsilon*f²*MN/A. Nonzero kernels with common divisor j~J have
Weil budget N³/J^(3/2) and complete-period budget M, up to small losses.
The general harmonic gcd average includes repeated prime powers.
Endpoint variation costs f²*(1+Ax/(MN)). This proves the proposed full
moment B²*x^epsilon*[x+x^(3*tau)*(N³+M)] on retained harmonic bands.
No cancellation estimate for Mobius signs is assumed in this moment.

**Coverage:** every coefficient sector is included by the bounded full
convolution coefficient, in both gcd branches. First Cauchy gives right
block budgets (1+a)/2,a/2+3b/2,a. The additional full region is
delta<19/25 and delta+3nu<161/100. The entire d~e~x^(2/5) benchmark
has budgets 41/50,199/200,16/25 before small losses, and is controlled
to arbitrary fixed logarithmic precision. The full positive majorant
and the untwisted density are consumed separately.
Uniform divisor twists justify the exact added cut
d<=floor(x^(151/200)), de³<=floor(x^(321/200)), and all intersections
with the previous cuts. The current E_dagger has the domain in (19).
E_*-E_dagger=O_H(x/log^H x), preserving the sufficient twin consumers.

**Limits and failed inferences:** the vertical cutoff cannot be dropped
from this application; a reaching one leaves the zero budget at one.
The combined uniform product threshold remains every fixed exponent
below 19/25, with an explicit unhandled boundary witness. A smaller
summation domain does not imply monotonicity of its signed value.
At delta=8/25,nu=9/20 the grouped Weil budget is 103/100; the old left
cross and right zero budgets also exceed one. Neither estimate controls
this nearby box. These are failures of stated upper bounds, not lower
bounds on the actual correlation or a universal obstruction.

**Evidence:** [proof and exact consumer](grouped-divisor-moment.md),
[validator](grouped-divisor-validation.js),
[retained finite checks](grouped-divisor-validation.json).
The validation checks 16,384 general harmonic gcd averages and
14,894,880 ordered completion-proxy pairs in 360 common-divisor bands.
It reconstructs 96 full-coefficient moments, including 104 repeated-prime
coefficient entries, and their 16,864 pair kernels. A rational grid checks
117,711 parameter points. The existing archived factors supply 273,177
signed divisor pairs for exact cut partitioning; 28,318 are in the
additional cut only. These counts are finite validation, not estimates
for the proportion or asymptotic mass of the residual. Missing periods,
conjugation, endpoint shift, vertical cutoff and overlap corrections
are detected by separate controls.

**Next target:** the restricted bound controls all nonzero pairs with
j>x^(1/20) at the next box, with block budget 397/400. Its zero and
period terms are already controlled. Equation (21) retains the real
signed sum over j<=x^(1/20), R!=0, and asks for a one-sided upper bound
with exponent below 36/25, versus the generic 3/2: more than 3/50 must
be saved. Complete the actual Fourier-weight separation and price its
coefficients before using a modern bilinear or spectral input. The
large-common-divisor ranges are not the remaining bottleneck. A solution
at this box alone would still not establish the global twin margin.

#### Structured dispersion estimate — Common prime-power factor retained through Cauchy

**Grade:** DERIVED and independently reviewed block and regional bounds;
finite inputs VERIFIED. **Question:** Q-structured-dispersion-estimate.
**Established:** for b_u=sum_(q|u)beta(u/q)lambda(q), prime-power q~Q,
|beta|<=1, Cauchy over (m,q) gives (D1), with a factor
Q^(-1/4)+A^(-1/4) on the cross term. Lemma H prices the harmonic gcd
average. The 2026-09-09 review rechecks completion (7), its Pascadi
inputs, the necessary separate coefficients, gcd branches and the
Perron/density application. The target-box exponent falls from 41/40
to 407/400, still above one.
**Region:** delta<71/100, delta+3nu<327/200. The concrete cut
C'={d<=floor(x^(141/200)), de^3<=floor(x^(1631/1000)),
de>floor(x^(77/100))} is removed in addition to the three previous cuts.
It is a fourth simultaneous complement condition, not a substitution.
The resulting exact residual differs from the previous residual by
O_H(x/log^H x). The uniform product threshold remains 19/25.
**Corrected target:** at the top sector Q^(3/2)E^3 has exponent 57/40;
MQ has exponent 61/100. A block saving requires the moment below
139/100, hence saving greater than 7/200. The reported 59/40 and
17/200 were arithmetic errors. The j_e^(-3/2) factor pays the gap for
j_e>x^(7/300+epsilon), fixed epsilon>0; the remaining small-gcd range
is OPEN. Native u-pair and fixed-q e-pair targets are distinct sums.
**Evidence:** [note](structured-dispersion-estimate.md),
[lane validator](structured-dispersion-estimate-validation.js),
[review](research-round-validation.md) section 10,
[exact exponent regression](research-round-validation.js).
**Limits/revisit:** upper block bound only, no sign of E_dagger. A
smaller residual domain is not a monotone improvement of its value.
Target-box success would still leave the corner and global complement.
Reopen with a mechanism paying the small-gcd saving and all costs; no
claim that the unused Mobius signs are necessary for every possible proof.

#### Small-divisor-kernel — Reciprocity separation and priced Kloosterman-fraction interfaces

**Grade:** DERIVED separation and exact rational pricings; VERIFIED finite
identities. **Question:** `Q-small-divisor-kernel`.
Target (21) of the grouped moment and twin-prime infinitude remain OPEN.

**Established result:** at delta=8/25, nu=9/20 the j<=x^(1/20) kernel of
[grouped-divisor-moment (21)](grouped-divisor-moment.md) separates exactly.
Reciprocity splits the completed phase index by index,
e_c(theta R mbar) = e_m(theta h1 u1bar - theta h2 u2bar) times a
correction phase whose sup norm and total m-variation are O(A/(MN))=O(1/x)
on this box; removing it costs O(x^(14/25)) absolutely. Mellin separation
of the endpoint factor costs x^epsilon with unimodular twists and L1 mass
min(1,Ax/(MN)), free exactly because v=Ax/(MN)<=1 on every retained band
here. The block reduces to a pure trilinear Kloosterman fraction
T = sum alpha_m beta_u nu_h 1_{(m,u)=1} e(sigma theta h mbar/u) with
alpha_m=A_left(gm), beta_u=A_right(gu), |nu_h|<=C/A. The small-common-
divisor kernel is therefore the pair expansion of the left orientation
with modulus m; reciprocity interchanges the two endpoint conventions.
Both gcd branches, both endpoints, all coefficient sectors and the divisor
twists are carried.

**Limits and failed steps:** Bettin-Chandee (arXiv:1502.00769v1, Theorem 1
with Remark 1; every hypothesis met) gives block exponent 129/125 at this
box, above the required 1 by 4/125 and above the classical completion
budget 103/100; its second bracket term alone is 399/400, so the first
term (AMN)^(7/20)(M+N)^(1/4) is the whole failure. DFI (1.1) with the
band summed trivially gives 1267/1200. The spectral diagnostic factor of
the literature audit is trivial for all common divisors up to x^(19/50),
so the structured spectral advantage is absent where the deficit sits.
No separated short bilinear subexpression exists for the composite-modulus
route; the only pairing is the full-length dual variable against a modulus
that is itself a summation variable. On a 19005-point rational grid every
box Bettin-Chandee controls is already controlled. The band majorant
N^3/J^(3/2) puts 64.6 percent of its mass at j in [1,2): the whole 3/50
deficit is present at common divisor j=1, so this is a coprime-pair
problem, not a small-common-divisor problem. These are failures of the
stated upper bounds and say nothing about the size or sign of the actual
correlation. Dong-Robles-Zeindler arXiv:2601.00292 stands at v2 with an
author erratum (missing factor L^2 in its (2.53)); its claimed improvement
does not follow and is not imported.

**Evidence:** [proof and pricings](small-divisor-kernel.md),
[validator](small-divisor-kernel-validation.js),
[artifact](small-divisor-kernel-validation.json). Negative controls
reverse the reciprocity sign, replace the lcm by the product, drop theta,
and replace the region by one of its three conditions (722 containment
violations detected).

**Reuse or revisit condition:** any future bound on T plugs into (7) of
the owning note with the thresholds it must beat: the (M+N) exponent
below 27/140 or the (AMN) exponent below 9/28, holding the other factor
fixed. Revisit only with a corrected reading of Bettin-Chandee, a
Kuznetsov formulation with modulus-independent coefficients, a modulus
factorization exposing a genuinely short separated bilinear form, or an
argument that does not pay the first Cauchy in the left divisor (see the
reachability record below).

#### Left-divisor-signs — Type I/II decomposition of the left coefficient instead of the first Cauchy

**Grade:** DERIVED lemmas and exact rational pricings, reviewed once:
three conservative slips found and repaired (corner per-block requirement
eta'>1 not 2; Lemma II's hypothesis B_2<N, i.e. nu>19/100, violated on
4790 of the 9943 counted grid boxes, conservative for the zero-added
region; one boundary lattice point at sigma=3/100); the 41/40 headline
and the zero added region survive. VERIFIED finite identities (82 exact
rational assertions, 6 negative controls). **Question:** `Q-left-divisor-signs`.
Target (21), the corner and twin-prime infinitude remain OPEN.

**Established result:** the left coefficient A_left(gm) of the block has
three sectors: A_0 and the -mu log term supported inside the original
divisor interval, and A_1's prime-power term, which is exactly the
convolution (mu (.)^(-s) 1_I) * (Lambda 1_[2,W]). Parametrising the left
prime power by r~x^rho and the right one by q~x^sigma gives
a=delta+rho, b=nu+sigma sector by sector rather than the uniform top
values. Lemma I (Type I): a piece of mu(m) carrying a long smooth
variable has block budgets alpha_1+3b/2 and a with no zero-frequency
term, because no second moment is formed; it replaces sqrt(M) by the
length of the arbitrary block, decisive only when that block is below
x^(1/4). Lemma II (Type II): Cauchy in the ORIGINAL divisor d rather
than the expanded m=dr, uniform in the Perron twist heights because the
twist rides on the variable removed by Cauchy. At (8/25,9/20) the
grouped bound already controls every sector with rho+3sigma<33/100, so
the A_0 and -mu log sectors are controlled; Lemma II controls
rho+5sigma/4<111/400; together every sector with right prime power
q<=x^(3/100) is controlled, the survivor at sigma=1/20 is
43/200<=rho<=6/25, and the worst block exponent there is 41/40 against
the previous 103/100. Deficit 3/100 becomes 1/40 at this box.

**Limits and failed steps:** the balanced Heath-Brown piece (two
variables at x^(7/25)) is covered by neither lemma and returns to Cauchy
in m at 103/100; the deficit sits there. Lemma I is not uniform in the
Perron twist heights (its smooth variable carries b^(-s) with total
variation of order |Im s|), so a Type I route must redo the cut
separation at height x^(o(1)). At the corner a=b=1 every priced route
exceeds 1: grouped 1/2/1, Lemma I >=3/2, Lemma II 15/8, Bettin-Chandee
and Wright 15/8, and even a hypothetical per-block square-root
cancellation in m with trivial summation over u gives 3/2, because the
corner needs a per-block saving u^(-eta') with eta'>(a+b-1)/b, which is
eta'>1 at a=b=1, while square-root cancellation at M=u is eta'=1/2
(twice the ceiling; the note's first version said eta'>2, corrected on
review). Cauchy on the right divisor instead
gives 109/100 at the target box and the identical 1/2/1 at the corner;
the U=V versus Y=Z asymmetry is invisible at a=b=1. Fouvry-Kowalski-
Michel Theorem 1.7 (arXiv:1211.6043v3) needs a prime modulus and would
give at most 1/48 against a required 3/25; Wu-Xi arXiv:1603.07060v5
needs squarefree friable moduli and short sums; Wright arXiv:2608.27732v1
Theorem 2.1 reduces to Bettin-Chandee at full dyadic supports because its
subdyadic hypothesis is on the two inverted variables, not on the
harmonic band, and manufacturing subdyadicity costs 1157/1000; Guria
arXiv:2410.10856v2 needs two variables of weight exactly 1 to Poisson-sum
and a genuine prime, neither present. All are failed upper bounds, not
refutations of the target.

**Evidence:** [note](left-divisor-signs.md),
[validator](left-divisor-signs-validation.js). On a 36481-box grid Lemma
II controls 9943 boxes, none outside the region already controlled.

**Reuse or revisit condition:** reuse Lemma II wherever a Cauchy in the
original divisor is admissible and twist uniformity is needed. Revisit
the balanced piece only with an estimate for a bilinear form in two
variables of length x^(7/25) against the Kloosterman-fraction phase; the
corner needs an argument that is not a per-block bound in m.

#### Reachability-coverage — Fixed-margin ceiling and hypothetical kernel savings

**Grade:** DERIVED rational bookkeeping at a prescribed fixed margin;
shrinking-margin extension UNPROVED. **Question:** `Q-reachability-coverage`.
The sufficient twin margin and twin-prime infinitude remain OPEN.

**Established result:** for p=19/25-delta and q=19/20-nu, the right
budgets are 1-p/2, 2-p/2-3q/2-gamma/2 and 1-p; the left swaps p,q.
At prescribed margin eta0 the zero budget leaves S_0={p<2eta0,q<2eta0}
out of reach of that margin for every nonzero-kernel saving. Uniform
gamma=2 covers its complement at that margin. This is far stronger
than the one-box gamma>3/50 target. S_0 lies inside W_dagger for
eta0<1/400. The a=b=1 endpoint keeps zero budget one for every margin;
fixed interior points can become controllable with a smaller margin.
No general impossibility theorem follows.

**Correction from independent review:** substituting
eta0=C loglog x/log x is not justified with the present x^epsilon
losses and uncontrolled epsilon-dependent constants. The corresponding
O(loglog x) box counts are geometry, not proved analytic coverage.
The original fixed-margin cuts remain intact. Proper prime powers
are still negligible after replacing the incorrect lower bound on
their base by sum_{p^j>W,j>=2}p^(-j)<<W^(-1/2). The full corner retains
s,s'>1 and non-squarefree branches. Its sharp mass constants were not
rechecked in this independent pass.

**Evidence:** [owning note](reachability-coverage.md),
[finite budget validator](reachability-validation.js),
[artifact](reachability-validation.json),
[independent review F3 and F5](history/reviews-0906/20-independent-handoff-review.md).
**Reuse:** distinguish prescribed fixed-margin failure from failure at
every positive margin. Prove uniform losses before shrinking eta with x.
The first-Cauchy alternatives have already been attempted in
signed-moment.md; Lemma A's unequal R=0 pairs remain uncontrolled.

#### Determinant-corollary — Bettin-Chandee Corollary 1 applied directly to dk-et=2

**Grade:** DERIVED transfer and exact rational pricing, negative,
reviewed once with no defect (Corollary 1 confirmed verbatim at the
source; all vertices and areas reproduced by an independent clipper; the
DFI containment needs the line (1/40)S-(1/48)max>=0, now added);
VERIFIED finite checks (28 checks, 4 negative controls). **Question:**
`Q-determinant-corollary`. E_dagger and the twin margin remain OPEN.

**Established result:** the residual R(x) equals T_11-T_10-T_01+T_00
exactly, each a sum over m_1 n_2 - m_2 n_1 = 2 with two arbitrary
coefficients and two smooth weights, after deleting the vacuous cutoffs
k>V, t>Z (beta_W vanishes below W) and writing
beta_W(k) = log k - sum_{r|k, r<=W} Lambda(r) with the bijection
(d,r) -> dr of endpoint-fourier §2. The literature scout's recorded
blocker, smoothness of the cofactor weights, is therefore removable. The
parity branches g in {1,2} never arise: the corollary's main term over
(n_1,n_2) | 2 is exactly the compatibility condition, and its density
factor and modulus coincide with the subtracted M_> of
signed-divisor-grouping §5. The sharp interval dk in J_x is separated by
Perron at height x^kappa with eta of order x^kappa; R=O(1) because
m_1 n_2 = dk is of order x. Every hypothesis of Corollary 1 (read at the
primary source, arXiv:1502.00769v1, statement p. 4, proof §9) is met.

**Limits and failed step:** the error term costs
x^((17/20)(A+B) + max(A,B)/4 + 3kappa/2) with A=delta+rho, B=nu+zeta
over the bands rho<=6/25, zeta<=1/20, so the all-pieces region is
22 max(A,B) + 17 min(A,B) < 20, forcing A+B<40/39 and hence
delta+nu < 2869/3900 at the top band, strictly inside the region already
controlled. Added area: exactly zero. The log-log piece alone would add
12.97 percent of the domain, but the region for R is governed by the
worst piece. At (8/25,9/20) the top band fails by 41/1000; at the corner
by 39/20, and no smoothing repairs it because the corner's mass sits in
the top band with coefficient exponent 1. Since every band budget
(this corollary, grouped (14) per band, residual-coverage (9) per band)
is nondecreasing in rho and zeta, an r-size split covers a box iff the
top band does, so the split region equals the current region. The
constraint a+b<40/39 is the same one endpoint-fourier's use of Theorem 1
forces; Corollary 1 inherits Theorem 1's bracket. DFI's older determinant
corollary (statements via the BC text; both DFI primary texts unreachable
today) has diagonal 48/95 and adds nothing. No note had applied
Corollary 1 before; the structural literature audit does not cite BC.

**Evidence:** [note](determinant-corollary.md),
[validator](determinant-corollary-validation.js).

**Reuse or revisit condition:** the four-piece decomposition and the
main-term identification are reusable for any determinant-equation
input. Revisit only with an error term whose (N_1 N_2) exponent is below
33/106 at kappa=1/4, or whose (N_1+N_2) exponent is below 99/560 at
gamma=7/20, or with a Delta-averaged version (unavailable at fixed
Delta=2), a different decomposition of beta, or a joint-band estimate.

#### Kernel-sign-control — Measured Mobius signs against random signs in the kernel moment

**Grade:** MEASURED, pre-registered falsifier, four negative controls
fired; no asymptotic content. **Question:** `Q-kernel-sign-control`.

**Result:** at (delta,nu)=(8/25,9/20), x=2^j for j=18..30 (M from 1082
to 114104, N from 274 to 23170, harmonic bands A in {1,2,3}, 8 seeded
random-sign draws per configuration, 1031.7 s wall clock), the slope of
log2(|X_small(actual)|/|X_small(draw)|) against log2 x is -0.057+-0.174,
+0.209+-0.207, -0.144+-0.224 and -0.081+-0.302 in the four families
(top box g=2 at the top band and at A=1, top box g=1, low box g=1); mean
plus sd is nonnegative in every case, so the pre-registered falsifier
fires: no heuristic support for Mobius-sign cancellation in the small-j
kernel along this route. The moment ratio actual/random is 1.027 to
1.014 with slope -0.0024+-0.0035. Signs help against absolute values by
about 3x (geometric mean 0.316); Mobius signs do not help against random
signs. The R=0 class carries 96 to 103 percent of the moment, complete
periods are proved empty at these sizes, and X_small is 0.02 to 2.88
percent of the moment. Measured moment slopes 0.98 to 1.00 against budget
slopes 1.33 to 1.50.

**Limits:** the reachable regime is diagonal-dominated, so the Weil term
that (21) concerns is invisible; J0=floor(x^(1/20)) is 1 or 2, so small
common divisor means gcd 1 or 2; Z=2 collapses the prime-power sector to
r=2; one box, native orientation, two bands. Finite scaling proves nothing
asymptotic in either direction. The embedded tail carries a forced stamp
explained in the note: the first binding predated the fourth table and
the guard refused the changed output, with 0 of 546 figures failing to
reproduce.

**Evidence:** [note](kernel-sign-control.md), [script](kernel-sign-control.js),
[artifact](kernel-sign-control.json).

**Reuse or revisit condition:** a regime where the nonzero kernel is a
measurable share of the moment needs x>=2^60 for floor(x^(1/20))>=3;
do not rerun below that without a changed question.

#### Mobius-bv-derivation — Provenance repair for the Mobius Bombieri-Vinogradov input

**Grade:** DERIVED from numbered published theorems, reviewed once with
no defect: all four Koukoulopoulos statements and numbers confirmed
verbatim in the author's preliminary version, the identity proved, every
hypothesis checked, the bookkeeping found to over-estimate safely by
log powers; VERIFIED identity checks. **Question:** `Q-mobius-bv-derivation`.
No twin-prime statement changes.

**Established record:** no published theorem statement of
sum_{q<=T^(1/2)/log^B T} max_{(a,q)=1} |sum_{m<=T, m=a(q)} mu(m)| <<_A T/log^A T
was located on five channels, searching in the owning convention of
[SEARCH-CONVENTIONS.md §1](SEARCH-CONVENTIONS.md) (Mobius function in
arithmetic progressions, Bombieri-Vinogradov) (Granville-Shao Adv. Math. 350 assert it
without a locator; Koukoulopoulos GSM 203 ch. 26 proves the prime case
only; Iwaniec-Kowalski §17.2 and Opera de Cribro §9 unreachable; Tao
Notes 3 has only the L^2 form for mu). The note derives the estimate,
with max over y<=T inside, from Koukoulopoulos Corollary 13.4
(Siegel-Walfisz for mu with coprimality), Theorem 26.2 (Type I),
Theorem 26.6 (Type II large sieve over primitive characters) and
equation (26.3), using the identity
mu = mu_{>U} * mu_{>V} * 1 - mu_{<=U} * mu_{<=V} * 1 + mu_{<=U} + mu_{<=V}
(valid at every n, checked exactly to 10^5), with U=V=T^(1/5): Type I
T^(9/10) log T, small conductors by Corollary 13.4 class by class, large
conductors by the dyadic split and Theorem 26.6, yielding level
Q<=T^(1/2)/(log T)^(A+6), ineffective constant, reduced classes only.
The mesh argument in shifted-prime-decomposition for interval endpoints
becomes unnecessary but stays correct.

**Limits:** theorem numbering read from the author's preliminary version
of GSM 203 by two readers, not the printed book; that version's final
display in ch. 26 has a harmless misprint (min{U,V} for sqrt U, sqrt V).

**Evidence:** [note](mobius-bv-derivation.md), [validator](mobius-bv-validation.js).

**Reuse or revisit condition:** replace by a page citation if
Iwaniec-Kowalski Theorem 17.4 or Opera de Cribro Theorems 9.16-9.18 is
confirmed to state the Mobius case.

#### Corner-correlation — Full coefficients and the prime-cofactor subfamily

**Grade:** DERIVED classification and fixed-corner proper-power bound;
finite identities VERIFIED. **Question:** `Q-corner-correlation` (PARTIAL:
the sharp full-corner estimate and global complement remain OPEN).

**Established record:** on the exact fixed-eta S_0, the excluded-prime
Mobius mean makes its density contribution O_H(x/log^H x), uniformly
in the lower corner cuts. Its raw residual is exactly sum_n C(n)C'(n-2).
Every prime power r above the threshold occurs with Lambda(r), including
multiple powers of the same base. The proper-power terms on the left
and right cost O_epsilon(x^(22/25+epsilon)) and
O_epsilon(x^(39/40+epsilon)), both negligible for fixed small epsilon.
The remaining prime-r terms still have small cofactors s,s'>=1.
Only the s=s'=1 subfamily has the mu(n)mu(n-2) representation with
nonnegative prime-band weights and exact moving cuts. Its representation
error is O_epsilon(x^(19/20+epsilon)). Neither that representation nor
proper-power removal eliminates all non-squarefree full-coefficient inputs.

**Reuse and failed interfaces:** the prime-dilation average is not an
additive-shift average, so an averaged-shift theorem does not directly
apply. The subsequent prime-band-transfer DOES give a bounded
multiplicative lift and a small continuous and dyadic scale-average
saving for the subfamily. The earlier abstract-only/no-purchase summary
is superseded by that source-matched derivation. Neither rate gives o(x)
or handles the full coefficients. The specified Bettin-Chandee and
prime-averaged completion interfaces fail at their recorded hypotheses
and budgets; no universal correlation obstruction follows.
The sharp term-wise envelopes do not measure the signed remainder, and
fixed-eta estimates do not justify shrinking eta with x without uniform
loss control. The sign and non-squarefree measurements remain finite proxy
observations, not asymptotic lower bounds or cancellation theorems.

**Follow-up:** [corner-coefficient-energy.md](corner-coefficient-energy.md)
retains all branches in a sharp one-point quadratic form and an auxiliary
smoothed norm. [sharp-corner-transition.md](sharp-corner-transition.md)
then prices the sharp energy and its non-negligible norm transition;
signed/global obligations stay open. A one-sided corner estimate must use a
proved complementary bound at the same scales to imply the consumer.

**Evidence:** [owning classification](corner-correlation.md),
[validator](corner-correlation-validation.js),
[prime-band transfer](prime-band-transfer.md),
[round review](round-review-0906.md), and the energy follow-up above.

#### Consumer-comparison — Our sufficient consumer against the published conditional routes

**Grade:** literature readings CHECKED in primary sources where stated,
two elementary DERIVED specification remarks, no estimate.
**Question:** `Q-consumer-comparison`. The consumer remains OPEN.

**Established record:** Murty-Vatwani (JNT 180, 2017) Theorem 1.1 needs
EH_Lambda(x^theta log^C x) and EH_{mu_h}(x^(1-theta)); at theta=1/2-eps
the first is Bombieri-Vinogradov, so their route reduces to the single
hypothesis EH_{mu_2}(x^(1/2+eps)), for which no case is known; their
conclusion is a positive proportion (1-A(2)) = 0.2521 of the
Hardy-Littlewood main term on [1,x], which implies our consumer at K=0
by the elementary cumulative-to-dyadic argument. A proof transfer to
every dyadic interval is unnecessary for the unbounded-scale consumer. Tao's 2016
asymptotic-sieve notes: only 0<=delta_x<=2 is known, conditional on EH,
with delta_x defined up to o(1); the correct dictionary is
E_dagger(x)/x = C_2(2 delta_x - delta_{x/2} - 1) + o(1), so the K>0
consumer lies below that normalisation's resolution. The block-summed
form on unbounded scales is equivalent to the dyadic consumer at fixed K,
with a possibly different positive constant and witnessing scales.
At K=0 this is cumulative scalar positivity on unbounded scales; eventual
positivity also implies it. The former strict comparison is withdrawn
by independent review F1. Every integer-side conditional route from a
two-point Mobius or Liouville object to twins (Pintz 2012 at level >3/4
for five sequences; Murty-Vatwani) needs equidistribution in
progressions, not a bound; Sawin-Shusterman over F_q[T] derives twins and
Chowla from a common geometric input; Siegel-zero routes (Heath-Brown
1983, Friedlander-Iwaniec, Tao-Teravainen 2022) imply our consumer at K=0
by applying Cor. 1.8(i) at x and x/2, so a proof of the consumer must be
consistent with the Siegel-zero world and would not disprove exceptional
zeros. Prior art for the corner shape: Tao states on GEH the equivalence
of the twin asymptotic with sum mu(n)1_R(n)mu(n+2)1_R(n+2) = o(x/log^2 x)
and why Chowla progress does not transfer; Maynard ICM 2022 Question 17
poses the determinant-2 sum with arbitrary coefficients as open. The
corner identification is an independent rediscovery with a different
weight (large prime factor, not rough) and a log^(4+eps) relative saving
against Tao's o(1).

**Limits:** Heath-Brown 1983, the Vatwani Math. Z. journal copy, Opera de Cribro
chapter bodies, Bombieri 1975/76 and Ng 1992 were not reachable; every
negative is "not found on the channels used" in the owning conventions of
SEARCH-CONVENTIONS.md. No published statement identifies the Vaughan
Type II remainder with weighted two-point Chowla; the shape is published,
the identification is not.

**Source follow-up:** [moving-cutoff-parity.md](moving-cutoff-parity.md)
now retrieves the 2018 author preprint for the Math. Z. paper, reads
its named hypotheses and repairs the relevant 2017 dyadic switch.
The preprint body is accessible; its equivalence to the journal copy
was not checked. The source equality omits a
moving endpoint, but the repaired fixed-interior-cutoff conditional
consumer survives. The new note owns that validation and its scope.

**Evidence:** [note](consumer-comparison.md).

**Reuse or revisit condition:** any brief asking for "a two-point
cancellation bound" must say whether it means a bound or uniformity in
q; the published routes need the latter. Cite Tao's post and Maynard's
Question 17 in any write-up of the corner.

#### Corner-measurement — The corner correlation at finite scales against a random-sign control

**Grade:** MEASURED, pre-registered falsifier, four controls fired, one
independent reimplementation agreeing exactly; no asymptotic content.
**Question:** `Q-corner-measurement`. The corner remains OPEN.

**Result:** K(x) = sum_{x/2<n<=x} mu(n) mu(n-2) L(n) L'(n-2) was computed
for x=2^j, j=20..36 (1,297,289,791 contributing integers over 62
non-empty rows, 1393 s), in four live variants (eta_0=1/100, eta_0=1/40,
one dyadic band each side, and a scaled model with right exponent 1/8).
|K|/mass falls with x in every variant, but no faster than the matched
random-sign null: slope differences -0.166+-0.119, -0.024+-0.062,
-0.033+-0.095, +0.039+-0.086 (largest deviation 1.4 s.e., in the variant
with fewest points); median |K|/sqrt(sum w^2) between 0.50 and 0.94. K
sits at random-sign size. K is never below -C_2 x; the largest |K/(C_2 x)|
is 3.3e-4. Signs alternate with longest run 4. Shift 4 differs from shift
2 on every row; mu replaced by 1 reproduces the unrestricted mass; the
random mean is within 4 s.e. of zero everywhere; an emptied band gives
K=0. A full (d,e,k,t) enumeration at j in {20,22,24} reproduces K exactly
and verifies mu(d)mu(e) = mu(n)mu(n-2) term by term.

**Limits, which are larger than the result:** at every reachable x the
actual right band (Z, Z x^(2 eta_0)] holds at most one prime and is empty
at j=20,21,22,32,33, so the right weight is a fixed residue-class
indicator for the prime 3 or 5; populating the band needs about 4 primes
at x=2^70 and 17 at x=2^100. This degeneracy is structural, not a compute
limit. The s>1 branch is essentially unmeasured (s=1 is forced whenever
x^(2 eta_0)<2). The absolute target's log^(2+eps) x saving is invisible
over the factor 1.8 in log x available, so a negative was the expected
outcome even if the target holds. Standard errors are scratchpad-grade.

**Evidence:** [note](corner-measurement.md), [script](corner-measurement.js),
[artifact](corner-measurement.json).

**Reuse or revisit condition:** do not rerun a direct corner sieve; the
band degeneracy makes it uninformative below x=2^70. A different finite
probe would need a model with populated bands and a stated falsifier.

#### Corner-log-average — Corrected transfer assessment

**Grade:** DERIVED support/mass and quantifier corrections; scoped source
comparison. **Question:** `Q-corner-log-average`.
Pure bands are invariant under outside-prime dilation. Exact cofactor
windows are not, but their support is not a single dyadic block and a
fixed dilation can retain terms. The natural-average unsigned swap cost
is 2*eta*(1-log 2)*x*log x+o_eta(x log x); this does not lower-bound the
signed error. Uniform-prefix logarithmic bounds transfer by Abel; c>3
is one sufficient exponent for o(x) at the stated envelope, not a
necessary condition for every argument. Pilatte's 1/(96e) is arithmetic
for one displayed parameter choice, not a universal method ceiling.
**Evidence:** [owning note](corner-log-average.md), review 21 F6--F7 and
the finite proxy validator. Historical T4 predictions are not a proof
of the corrected leading constant. No full-corner bound follows.
**Reuse:** direct fixed-parameter substitutions still need their stated
hypotheses; do not use nonmultiplicativity alone to exclude a lift.

#### Round-review — Review of the completed round and the next research specification

**Grade:** REVIEW of local deductions and checked source hypotheses;
DERIVED elementary sampling consequence; finite algebra checks.
**Question:** `Q-round-review-0906`.
The fixed-band Fourier lift and continuous moving-window estimate survive
review against Tao–Teräväinen v2 Theorem 3.1(ii) and MRT (1.12). For a
bounded fixed sequence, normalized sums over (N,2N] vary by O(h+1/N) on
[N,(1+h)N]. Integrating these disjoint neighborhoods and then using the
existing moving-band mesh gives a dyadic scale-average saving with
exponent c_*/2 for |A_w(N)|/(N log^2 X). The bare exceptional-set argument
did not justify excluding this sampling route. Proper-prime-power terms
already have total absolute bound O_epsilon(x^(22/25+epsilon)+
x^(39/40+epsilon)) on the fixed corner; they were incorrectly listed as
an open obligation. The driver's integer-parity split does not measure
per-term CRT gcds; its total coefficient identities survive. Universal
diagonal lower bounds fail under arbitrary bounded coefficients. The
conditional reachability intersections require six scalar cutoffs, and
the fixed-margin bulk can disappear before gamma=2 even though edge
strips persist up to that threshold.
**Limit:** the dyadic saving is relative to N log^2 X, with a small
unextracted exponent; it is not o(N), every-dyadic control or a twin
margin. Remaining prime-r terms with s>1 or s'>1, their non-squarefree
inputs and the complement remain OPEN. No unconditional region or exact
cut changes. This review is not a reproof of every upstream reduction or
of the deep imported theorems.
**Evidence:** [review and sampling derivation](round-review-0906.md),
[finite validation](round-review-validation.js), the corrected owning
notes and rerun driver/transfer checks. The full number audit and QC
self-tests pass; these do not certify the analytic argument.
**Reuse:** price a stronger averaged rate or an estimate for the remaining
full coefficients against the global consumer. Do not require an
every-scale theorem merely to obtain a dyadic average, reassign the
completed fixed-corner prime-power tail bound, or infer a lower bound
from an upper budget. Reopen a finding for a precise correctness concern
or changed hypotheses.

#### Prime-band-transfer — Bounded multiplicative lift and scale accounting

**Grade:** DERIVED from an imported primary-source theorem; PARTIAL
campaign payoff. **Question:** `Q-prime-band-transfer`.
An integrable Fourier superposition represents mu L_B/log X by bounded
multiplicative functions. Their squared pretentious distances differ
from mu's by O(1) uniformly in Fourier parameters. Tao–Teräväinen v2
Theorem 3.1(ii), Tonelli and an explicitly priced log-scale mesh give a
small unspecified log saving in the continuous scale-average of the
absolute prime-cofactor sum divided by N*log^2 X. The exact moving
cofactor windows are included at fixed eta. The coordinating review's
interval-stability lemma additionally yields a dyadic scale-average
saving with exponent c_*/2, recorded as (7) in the owning note.
**Limit:** no o(N), every-dyadic bound, s>1 or s'>1 estimate, full-corner
bound, regional extension or positive twin margin. Proper prime powers
are separately negligible on this fixed corner. The source theorem is
consumed, not reproved; no novelty claim is made.
**Evidence:** [complete local derivation](prime-band-transfer.md),
[sampling consequence](round-review-0906.md),
[finite ingredient checks](agent-readiness-validation.js).
**Reuse:** the two reviews retain (1)–(6), with the scale discussion
qualified by the sampling lemma. A stronger global claim needs a matched
estimate and all omitted branches.

#### Next-transfer-review — Adversarial check of the band transfer at its scope

**Grade:** REVIEW of the continuous estimate; scope corrected by the
coordinating review. **Question:** `Q-next-transfer-review`.
Checks a–k on prime-band-transfer.md (1)–(6) survive: multiplicativity,
Fourier identity, uniform pretentious-distance comparison, MRT exponent
7/24, exceptional-set structure, Tonelli, CRT error against N>=sqrt X
and mesh count. The source's technical condition (3.2) belongs to case
(i), not the consumed case (ii), independently confirmed at source.
Four unstated steps (shift assignment, frozen-band uniformity, the
two-integer lower-edge set and width-2 strip) are now written in.
**Correction:** check l did not consider bounded-interval stability.
A weaker dyadic scale-average estimate follows as proved in round-review
§2. The no-o(N), no-every-dyadic and no-margin limits stand. Proper prime
powers already have a separate fixed-corner bound; they are not open
merely because the lift does not represent them. Imported proofs were
not independently reproduced.
**Evidence:** [review](next-transfer-review.md),
[finite validator](next-transfer-review-validation.js),
[coordinating correction](round-review-0906.md).
**Reuse:** consume the explicit derivations with their hypotheses and
check any inference that determines a new research decision. A review
label is not a substitute for the argument.

#### Corner-branch-diagnostic — Exact branch-preserving enumeration of C(n)C'(n-2)

**Grade:** VERIFIED finite algebra; tooling only. **Question:**
`Q-corner-branch-diagnostic`.
A driver computes each side by the direct divisor formula and by the
expanded prime-power identity independently, compares them as integer
prime-log coefficient vectors, and retains the 3-by-3 (P,S,Q) contribution
matrix, both integer parities and the four squarefree classes, with signed,
term-absolute, grouped-absolute and support totals reported separately.
Five controls are ACTIVE on a disclosed fixture and on the archived window
q=9973 (8192 sides, 0 mismatches; deleting S or Q breaks the identity;
repeated powers counted separately; every integer reconstructs from its
stored factors). The factor artefact is read, never written, with its
source and window hashes printed.
**Limit:** the parity split is gcd(n,n-2), not the per-term CRT gcd
partition (round-review R3). The fixed-eta corner is empty on the retained
prefix (0 integers with both sides nonempty at x=2^27, eta_0=1/500);
Elo also exceeds E0 across the entire J_x; the embedded matrix uses
the handoff cuts on 6.1e-5 of J_x and is a proxy window, not S_0. No sign
trend, saving or closure is inferred; the right cutoff Z=2 is degenerate.
**Evidence:** [specification](corner-branch-diagnostic.md),
[driver with two embedded tails](corner-branch-diagnostic.js).
**Reuse:** use it to enumerate branches for a later named mechanism on
retained factors; a larger census needs the condition in
[data-reuse-audit.md](data-reuse-audit.md) §5.

#### Next-correlation-source-map — Scale and coefficient quantifiers beyond the transfer

**Grade:** scoped NEGATIVE for three primary statements read at source.
**Question:** `Q-next-correlation-source-map`.
Tao-Teravainen 1809.02518v2 Cor. 1.13/1.14 has fixed functions, no rate and
a logarithmic-density-zero exceptional set, weaker on every axis than the
statement already consumed. Guo 2608.23500v4 Thm. 1.1/1.8 holds at every
large scale and covers shift 2, but only for the Liouville pair in
logarithmic normalization at rate (log x)^(1-c), below the natural-average
conversion threshold of [corner-log-average.md](corner-log-average.md) §3;
its proof was not examined. Tao-Teravainen 2512.01739v2 Thm. 3.1(i) shares
3.1(ii)'s exceptional set: its real-valued condition fails for a general
complex lifted factor, and its g1(p)=1 condition fails for mu.
**Limit:** none of these statements supplies the required rate and full
coefficients. An every-scale input is one possible sufficient form, not
a necessary gate: the coordinating review already derives a weak dyadic
average from the consumed source. Averaged alternatives must price their
actual sampling and normalization losses. The prime-r terms with s>1 or
s'>1 remain unestimated; proper-prime-power terms already have a separate
fixed-corner bound. This is not a claim that no suitable theorem exists.
**Evidence:** [source map](next-correlation-source-map.md) with fetch
records and hashes; [coordinating review](round-review-0906.md).
**Reuse:** match a further candidate against the actual missing rate,
coefficient class and consumer quantifiers before another lookup round.

#### Signed-moment — Alternatives to the first Cauchy inequality

**Grade:** DERIVED elementary bounds and joint-Cauchy pricing; one
CONDITIONAL budget and one HEURISTIC ceiling remain distinct.
**Question:** `Q-signed-moment`. No region or twin margin is added.
Lemma A includes only u1=u2,h1=h2, not unequal proportional R=0 pairs.
Reviews 20--21 retain its endpoint integral/Abel repair and check Lemma
B's geometric-series argument. Lemma B's exponents are
(1+a+b)/2, b+1/2, a+b/2, b+a/2; its usable region is analytically
contained in the already controlled product region.
Joint Cauchy in (m,h) is now priced: a+b/2, a/2+3b/2, a. It gives
103/100 at the target and 2 at the corner, adding no region. Modulus
larger than the interval does not prevent finite Fourier completion.
The true diagonal has only an upper bound under arbitrary coefficients;
the old general Holder floor fails for sparse coefficients (review F9).
The random-matrix lower-bound model remains heuristic; no actual
coefficient lower bound follows from the available upper estimates.
**Evidence:** [note](signed-moment.md),
[readiness review C](history/reviews-0906/21-readiness-review.md),
[signed-moment validator](signed-moment-validation.js) and finite
readiness controls. **Reuse:** a new attempt must change an estimate
or hypothesis, not reprice joint Cauchy or infer a universal barrier.

#### Heath-brown-edges — Formal pieces, not an intrinsic obstruction

**Grade:** DERIVED identities/classification with corrected scope.
**Question:** `Q-heath-brown-edges`. The identity and subset-sum lemma
survive review. The exponent simplex has sup a=1 at the balanced j=K
configuration; exponent-zero free variables may be subpower, not just
bounded. This prices separately bounded pieces and does not exclude
identity-piece cancellation. The Vaughan log and low-prime terms can
cancel exactly on some formal edge configurations.
The bounded-cofactor correlation retains affine multipliers l,l', so
it is not literally F(n)F(n-2). Finite F-coefficient masses are not
asymptotic lower bounds for that signed correlation. A direct counting
proof shows the fixed Linnik truncation has a large term-wise absolute
tail; the signed tail remains unestimated. BV's exponent-1/2 endpoint
needs logarithmic slack, and divisor-bounded coefficients need actual
normalization costs. A weighted-cofactor theorem cannot inherit budgets
by a formal exponent substitution.
**Evidence:** [owning note](heath-brown-edges.md), review 21 F8 and its
existing finite identity validator. Maynard Question 17 and Lemma 18
were checked again at source; they are not impossibility statements.
**Reuse:** only the exact identities and scoped classification. No full
alternative reduction, new controlled region or twin margin is claimed.

#### Centered discrepancy estimate — Exact flip retained; top-range truncation proved at its scope

**Grade:** exact identities DERIVED and finite checks VERIFIED; the
top-range bound T^top=O_(A,eps)(x/log^A x) DERIVED 2026-09-08 and
read twice independently the same day (handler, lane V; reader V2,
[reviews-0908/01](history/reviews-0908/01-second-reader-A-B-C.md)),
accepted at its stated scope with ineffective constants.
**Question:** Q-centered-discrepancy-estimate.
**Established:** D_y=D^(e_1)+T^top-P^top exactly at the stated finite
cutoffs. The top divisor flip uses mu(e)mu(em)=mu(m)1_((e,m)=1) for
squarefree e and retains m>y. The density projection is controlled by
the existing weighted Mobius means. Section 3a of the note proves, for
every fixed A>0 and 0<eps<1/50 with e_1=floor(x^(1/2+eps)),
T^top=O_(A,eps)(x/log^A x): endpoint atom retained in
I_m=(max(x/2,e_1 m-1),x], powers of two removed as one atom, odd b and
g|m, the local factor 1/phi(m'r)=h_{b,g}(m')/(phi(m')phi(r)) with
h(p)=0 at p|2g and (p-1)/p at p|b, the series H_{b,g}(s)/zeta(1+s) with
coefficients summable against sqrt(k) at cost O(tau(g)^2), the uniform
mean (3a.9) proved from the q=1 Mobius means M_1(v)<<log^-A v and
M_2(v)=-1+O(log^-A v), truncation B=G=(log x)^(A+5), a Cauchy
multiplicity device with c(q)<=tau(q)^3, and prime BV in prefix form
derived by rounding from Tao Notes 3 Theorem 17. Consequence:
D_y=D^(e_1)+O_(A,eps)(x/log^A x), so the sufficient consumer
D_y>=-4x/25+o(x) is equivalent to D^(e_1)>=-4x/25+o(x).
**Earlier failed step (a5e1244, repaired):** the first proof changed
n>=e_1*m to a strict endpoint, omitted odd b, and inverted the
reciprocal-totient factor while losing (m',g)=1. The proposed H_band
interface remains withdrawn.
**Review scope:** the reader reconstructed (BV*), (3a.6)-(3a.9), (3a.14)
and (3a.16) by hand. The retained integration validator checks four
(b,g) pairs at u=1e6; other earlier diagnostic counts are not its
recorded invocation. The 2026-09-09 reading also repairs the floor
factor 2 and the log^(L+3) error count, absorbed by fixed power slack. Finite checks do not prove the rate;
the analytic steps rest on the two cited Tao statements.
**Evidence:** [note](centered-discrepancy-estimate.md) sections 1–3a;
[worker validator](centered-discrepancy-estimate-validation.js) section 4,
[review](research-round-validation.md) sections 2 and 7 and
[regression checks](research-round-validation.js).
**Reuse/revisit:** reuse the exact flip and the truncation (3a.1) at the
stated scope. It is a Murty–Vatwani-type freedom to fix the endpoint at
x^(1/2+eps), not a signed estimate: D^(e_1), the twisted sequence
Lambda(n-2)mu(n) at odd moduli e<x^(1/2+eps) on the full dyadic
interval, is unestimated, and no theorem for it at any modulus e>=3 is
imported. The band obstacles in note section 4 remain open. The reviewed A2
continuation below pays the low Type I term without bounding the whole
fixed-endpoint discrepancy.

#### Fixed-endpoint discrepancy — Reviewed low Type I estimate; exact remainder OPEN

**Grade:** DERIVED and reviewed analytic estimate with finite identity
controls. **Question:** Q-fixed-endpoint-discrepancy.
**Established:** Vaughan decomposition gives
D^(e_1)=2C2*M+T_I^low+B+O_A(x/log^A x), B=T_II^low+P_band exactly as
(2.9). The repaired T_I^low=O_(A,eps')(x/log^A x) survives the independent
2026-09-09 reading, so S=C2*x+B+O_A(x/log^A x) is accepted.
**Failed step repaired:** e[r,g]<=e_0UV was false; the retained witness
has q=43681>1908. Truncating g<=G=(log x)^(A+13) pays both tails and
keeps body moduli below x^(1/2-eps'/3)G. The density
sum_(g|e)mu(g)/phi(e[r,g])=1_((r,e)=1)/(e phi(r)), multiplicity
tau(q)^4 and the uniform Mobius mean at (k,e) complete the estimate.
The review corrects a log^4 weighted count, the repeated-prime local
exponent and the power-of-two atom for every 0<eps'<1/2.
**Open consumers and limits:** the stronger D-margin is
B+2C2*M>=-4x/25+o(x). It implies, but is not equivalent to,
B>=-(C2-1/200)x+o(x). General H_B has fixed c0>0 on unbounded dyadic
scales. All remain OPEN. The all-modulus absolute statement (4.9) is
one stronger sufficient band input, not a necessary condition. An
elementary O(x log^5 x) bound is used for B; the claimed O(x log^4 x)
was not justified by applying Brun–Titchmarsh to every divisor class.
**Evidence:** [proof](fixed-endpoint-discrepancy.md) sections 2,4,
[lane validator](fixed-endpoint-discrepancy-validation.js),
[independent review](research-round-validation.md) section 12 and
[rational density/consumer controls](research-round-validation.js).
**Reuse/revisit:** the Type I review obligation is complete. A new attempt
must estimate the actual B with paid coefficient costs, supply a changed
representation/consumer or identify a correctness concern. The inspected
decompositions leave B unestimated; they do not rule out every other one.

#### Review of the 2026-09-07 session — six ranked claims read by an outside reader

**Grade:** REVIEWED at textual and finite scope; no asymptotic content.
**Question:** Q-review-request-0907.
**Result:** Claims 1, 2, 4, 5, 6 verified within stated scope, claim 1
conditional on the unread 1974 page of Halberstam and Richert; claim 3
verified with its tolerances corrected (max |D_y/x + (T1/x - C2)| over
j>=30 is 1.84e-4, recomputed by the integrator as well). Lemma 1 and
Corollary 1 of Kalmynin and Konyagin read at the arXiv TeX and at two page
images; Richert Theorem 11.3 and the 1971 Mémoire Theorem 3 read at page
image; the Dover OCR index re-fetched; all Brun form. The Corollary 1
representative slip sharpened by exact finite algebra: with representatives
in [0, p-1] the printed encoding selects the empty set whenever some
Omega_p is not contained in {1}, and selects the avoiders of -Omega in the
remaining case; the repair r' = r (mod p), r' = 1 (mod P(z;p)) selects the
-Omega avoiders pointwise in all nine tested configurations. The
cross-codebase M column agrees at all 23 shared j to 5.4e-12 relative.
**Limit:** the 1974 page image is unread; Richert's proof of 11.3 is a
pointer, re-derived only in sketch; the Lean build is not reproduced. A
finite check does not prove Corollary 1; the statement is consumed from a
refereed source.
**Evidence:** [report](history/reviews-0907/10-independent-review-0908.md);
scratch `crt-check.js` and `a2.js` under the round-0908/V scratchpad (not
embedded).
**Reuse or revisit condition:** revisit claim 1 only with the 1974 page or
a printed proof of Theorem 11.3; revisit claim 2 only if a representative
convention other than [0, p-1] is shown to be the authors' intent, which
does not change the statement consumed.

### Finite algebra and numerical validation

#### S-0905-09 — Reproduced the algebra and existing numerical checks

**Grade:** VERIFIED finite computation only.
**Questions:** `Q-review-0905`, `Q-chen-fold-benchmark`,
`Q-prime-detection-inputs`, `Q-shifted-prime-decomposition`.
The campaign's exact validators cover the relevant fold, weight, CRT,
Vaughan, parity and determinant identities. Their output was generated
and reproduced with the embed tool. Full-gate runs and their scope are
recorded in [the changelog](history/CHANGELOG.md).
**Evidence:** [review validator](review-0905-validation.js),
[Chen validator](chen-benchmark-validation.js),
[prime-detector validator](prime-detection-validation.js),
[shifted-prime validator](shifted-prime-validation.js).
**Reuse:** existing scripts for regression or a stated falsification check.
**Limit:** agreement on finite inputs proves no asymptotic estimate and
does not referee every argument in the repository.

### Fold ledger and the parity table

#### Fold-arithmetic-bridge — Aggregate sieve input and certified failure of two tests

**Grade:** DERIVED and independently reviewed identities and bounds;
conditional source-uniformity reading explicit. **Question:** Q-fold-arithmetic-bridge.
**Established:** T=P_odd*P'_odd/S+S*cov/4-N_odd3 for S>0, with a
valid denominator-free form. Above (2X+2)^(1/3) a killed composite is a
semiprime; X^(1/3) alone is insufficient. Proposition 3 derives BV for
k-fold X^(1/u)-rough products, fixed k,u and squarefree moduli, from
Wu Lemma 2.3 read as uniform over bounded coefficients. Proposition 4
gives shifted-prime contamination <=(4D_k(u)+o(1))2C2*X/log^2 X.
This is aggregate over factor tuples, not uniform per tuple. Its
cardinality form retains an additive arbitrary-log error even at k=u.
**Failed tests:** the two displayed union-bound tests with that aggregate
constant fail for every u>4: Q_cov<1 and c*_real<4. The 2026-09-09
review replaces floating-point proof bounds with directed rational
certificates, while retaining the old grid as a measurement. The
certified sub-2 ranges are (4,4.8] and (8,infinity).
**Evidence:** [proof](fold-arithmetic-bridge.md) sections 3a–4a,
[lane validator](fold-arithmetic-bridge-validation.js),
[review](research-round-validation.md) sections 4,11 and
[rational certificates](research-round-validation.js). Wu page 6 was
re-read at the rendered PDF; the original Pan–Ding proof remains unread.
**Limits/revisit:** the failure does not decide Cov_u or Dec_1, require a
second Liouville hypothesis or exclude a joint bound retaining the
partner's parity. Reopen with an improved input/consumer or a correctness
concern. No sufficient twin-prime margin follows.

#### Theorem 2c source review — every hypothesis of the substitution read at source

**Grade:** DERIVED (the manuscript's Theorem 2c), not refereed; source
review VERIFIED within stated scope. **Question:**
Q-two-class-theorem2c-source-review (TODO W); prior Q-kk-substitution,
Q-paper-kk-draft.
**Established:** the chain of paper/kk-lower-bound.md Theorem B, re-derived
in history/reviews-0907/11 section 3, is proved from its cited sources once
Kalmynin and Konyagin's Corollary 1 (arXiv:2302.00459v2, TeX read in full;
Izvestiya 88:2 read at extracted text) is granted at its printed statement.
The smooth-number input is Hildebrand and Tenenbaum 1993 Theorem 1.2 /
Corollary 1.3 (page image), range slack; the band-3 count is Rosser and
Schoenfeld (3.5), (3.6) (page image). kappa = 4 enters only the implied
constant. No progression, Brun–Titchmarsh, Chebotarev or Galois input is
consumed. Proposition 1 holds exhaustively at y = 5, 7, 11, 13; the
three-band CRT composition produces twin-free runs at toy parameters with
zero twin slots inside (finite check only).
**Limits:** Halberstam and Richert Theorem 2.2, cited by the source's Lemma 1, is unread at the page (shared with Theorem A). A second bounded access pass on 2026-09-08 (thirteen channels, [history/reviews-0907/12](history/reviews-0907/12-halberstam-richert-second-access.md)) reached no page image and no verbatim secondary; the OCR-read hypotheses (Ω_1), (Ω_2(κ)) or (Ω), (R) and both clauses are discharged by the substitution with A = 1, A_1 = κ + 1, A_0 = κ; the owed item is a page image of pp. 68 to 69 (Academic Press 1974 or Dover 2011), obtainable by an archive.org loan or a library copy. Implied constants
unpriced; y_0 = 10^{134.1} is a floor with constants set to 1 and H2
binding. Band 2 is empty at every computable y, so no finite run exhibits
the asymptotic construction. Not refereed.
**Defect found:** the explicit Mertens error quoted as Rosser and Schoenfeld
"Theorem 20", 1/(10 ln^2 x) + 4/(15 ln^3 x) for x >= 286, is Dusart's
Theorem 6.10 (x >= 10372); Rosser and Schoenfeld's (3.18) has 1/(2 ln^2 x)
for x >= 286 (confirmed by the integrator at the page image). Provenance
only; no number of Theorem 2c moves.
**Evidence:** [report](history/reviews-0907/11-two-class-theorem2c-source-review.md)
(hypothesis table, chain, artifact hashes, scratch script).
**Next/reuse condition:** a reader holding Halberstam and Richert 1974
quotes Theorem 2.2 at the page; an explicit-constants pass turns y_0 into a
value; an outside number theorist reads the substitution. No twin-prime
payoff is implied.

## Closed routes

**Scope of closure.** A counterexample to an inequality, a bound on a
specified certificate class, a finite failed forecast, and a method with a
missing input are different outcomes. Each row closes its named attempt at
its cited scope. These rows do not collectively prove a universal obstruction
to every argument on the exact tile. In particular, the lambda-ledger's
constant-sign result at crystallization and its failed finite anomaly test
(`history/staging/attack-lambda-ledger.md`) do not rule out useful conditional
decorrelation before crystallization; see
`history/staging/review-0905.md` §4. TPC-equivalent targets require an
independent derivation; equivalence alone is not a refutation.

Each row names an attempted route, its scoped verdict, the failed step,
and the evidence. A surviving lemma can still be reused. Read its record
before revisiting; a new attempt must change the hypothesis or mechanism
responsible for the closure. Dates identify the recorded checks.

| route | verdict | why, in one clause | closed | record |
|---|---|---|---|---|
| the two submitted Liouville parity-table ratio tests | CLOSED at every fixed u>4 for the displayed aggregate-constant-4 tests; rational certificate reviewed 2026-09-09 | Q_cov(u)<1 and c*_real(u)<4 for all u>4 with the discharged inputs and the corrected contamination constant 4; conditional on the uniformity reading of Wu Lemma 2.3; not a closure of the decorrelation hypotheses or of a joint bound retaining the partner's parity | 2026-09-08 | [fold-arithmetic-bridge.md](fold-arithmetic-bridge.md) sections 3a–4a; [research-round-validation.md](research-round-validation.md) section 11 |
| using the printed p. 654 Murty--Vatwani divisor swap without its moving inner endpoint | REFUTED for the displayed equality; conditional theorem not refuted | d>y requires n+h>ey after switching, and x=20,y=3,h=2 gives an exact positive counterexample | 2026-09-06 | [moving-cutoff-parity.md](moving-cutoff-parity.md) sections 2--4, with a dyadic repair |
| treating complete prime-partner/complement reassembly as an extra signed estimate | NO NEW ESTIMATE from this algebraic operation | short terms are already within BV/CRT; the uncancelled term is S or the existing Vaughan remainder | 2026-09-06 | [joint-correction-source-audit.md](joint-correction-source-audit.md) sections 2--5 |
| seeking a positive main-plus-supported lower bound from the specified separate-sign sieves, with the complement omitted | INSUFFICIENT BOUND for this specified consumer | H_delta<-2/3 makes its lower constant K<-80/9; this does not give an upper bound on the actual residual | 2026-09-06 | [supported-coefficient-dickman.md](supported-coefficient-dickman.md) section 4 |
| keeping only the specified M2/M3 pair and main term, or declaring its complement negligible | REFUTED for this pair and current plateau cutoffs | liminf (N2-P3)/(C2*x)>11/10 with prime exclusions paid; S>=0 forces liminf R_rest/(C2*x)>1/10 | 2026-09-06 | [paired-factor-budget.md](paired-factor-budget.md) section 4 |
| discarding every positive contribution and bounding the current full negative mass below C2*x | REFUTED for the present cutoff exponents and plateau profiles | a three-prime/rough-composite family with its prime exclusion paid gives liminf Nhat/(C2*x)>3/2, also at fixed delta<1/50 | 2026-09-06 | [switching-negative-mass.md](switching-negative-mass.md) section 5 |
| applying GKM Lemma 10.5's cube/m! formula to a general ordered-prime weight | REFUTED at this scope | a bounded antisymmetric function gives zero cube integral but positive ordered-prime mass; symmetry repairs the paper's own application | 2026-09-06 | [smooth-sieve-literature.md](smooth-sieve-literature.md) §3.1 |
| replacing the three-smallest-prime majorant by the multiplicative function with its prime values | REFUTED as an identity or pointwise upper bound | w_T(210)>w_T(30)w_T(7) when T>log 7; the general nonmultiplicative upper theorem remains applicable | 2026-09-06 | [global-smooth-majorant.md](global-smooth-majorant.md) §4 |
| bounding the full F^- by a constant times the number of small-prime pairs with product >a | REFUTED for this specified majorant | a ten-prime cell has F=-84 and zero such pairs, with strict admissible left exponent margins | 2026-09-06 | [global-factor-signs.md](global-factor-signs.md) §3 |
| averaging sharp-window coefficients, then triangle and Cauchy, to obtain o(x log^2 x) | REFUTED for sufficiently small fixed eta | Minkowski bounds this exact norm output below by the transition norm product; signed cutoff estimates are untouched | 2026-09-06 | [transition-joint-budget.md](transition-joint-budget.md) §3.3; [audit](transition-round-audit.md) |
| bounding one 1-bounded multiplicative factor against an arbitrary 1-bounded factor at a fixed shift | REFUTED by counterexample | g_2=lambda, g_1(n)=lambda(n-2) gives sum g_1(n)g_2(n-2)=X+O(1); the shift average in Matomäki–Radziwiłł–Tao Theorem 1.6 is load-bearing | 2026-09-06 | [transition-source-match.md](transition-source-match.md) §5 |
| transfer the smoothed corner through a negligible L2 error | REFUTED for sufficiently small fixed eta>0 | sharp and transition squared norms are Theta_eta(x log^2 x); this does not rule out signed shift-2 cancellation | 2026-09-06 | [sharp-corner-transition.md](sharp-corner-transition.md) sections 4–5; cross-prime budget retained |
| strictly weakening the unbounded-scale dyadic consumer merely by cumulative summation | REFUTED DEDUCTION, at fixed K and existential positive constants | nonnegativity and sum_{i<=j}2^i/i^K=(2+o(1))2^j/j^K give the converse implication with a changed positive constant; both estimates remain OPEN | 2026-09-06 | `consumer-comparison.md` §2; `history/reviews-0906/20-independent-handoff-review.md` F1 |
| replacing the distinguished prime-power gcd by its radical in the moment | REFUTED as an arithmetic identity | gcd(25,5^2)=25 but gcd(25,5)=5; the full factor can still be handled by harmonic averaging | 2026-09-05 | `prime-power-dispersion.md` §4 |
| excluding every distinct-prime zero numerator without a prime-greater-than-harmonic condition | REFUTED at this unrestricted-frequency scope | (q1,h1)=(5,5), (q2,h2)=(7,7) have the same rational frequency; counting such collisions still permits a sparse dispersion bound | 2026-09-05 | `sparse-dispersion.md` §3 |
| omitting distinguished-prime factors from gcd(r,eq) once harmonics exceed q | REFUTED at this unrestricted-frequency scope | e=6,q=5,h1=5,h2=10,theta=1 gives gcd(r,eq)=5 but gcd(r,e)=1; harmonic averaging retains the missing factor | 2026-09-05 | `sparse-dispersion.md` §3 |
| a uniform fixed-power operator-norm saving for the complete dual-frequency matrix S(t,lambda*h;q), with arbitrary coefficient vectors | REFUTED at this full-spectrum scope | for prime q and at least two distinct nonzero h rows, the Gram matrix is q^2 I-q J and the norm is exactly q, even after the zero dual column is removed; structured coefficient cancellation remains OPEN | 2026-09-05 | `prime-band-completion.md` §4 |
| automatically dropping the common e factor from a cross-prime second-moment phase | REFUTED as a general phase identity | e=5, q1=11, q2=13, h1=h2=1, theta=1 gives modulus 715 and numerator -2; m=1 and 144 agree modulo 143 but have different phases. Gcd-dependent reductions require their own calculation | 2026-09-05 | `prime-dispersion.md` §3 |
| multiplying Vaaler's full positive endpoint-error majorant by min(1,T times interval-length / CRT-modulus) | REFUTED at this pointwise scope | fixed-degree polynomials cannot reproduce a sawtooth jump across a unit interval as the modulus grows; the polynomial pairing identity remains valid | 2026-09-05 | `endpoint-pairing.md` §3 |
| a uniform fixed-power L2 norm saving for the aggregated squarefree coefficient Q on all expanded-divisor boxes | REFUTED at this norm scope by a derived lower bound | for D=x^delta and W=x^w at fixed positive exponents, the top-band energy is at least c*DW*log W; cancellation in the signed phase correlation remains open | 2026-09-05 | `coefficient-structure.md` §3 |
| discarding the determinant-2 singleton family in absolute norm, or bounding its entire negative mass by O(x) | REFUTED at the ungrouped mass scope | with the prescribed cutoffs, each sign's singleton mass is at least c*x*log(x) eventually; the signed difference and cancellation across fibers remain open | 2026-09-05 | `singleton-fiber-audit.md` §§2–6 |
| o(x) absolute reconstruction of the shifted-prime remainder from normalized joint local folds of polylogarithmic modulus | REFUTED at this model class | uniformly for even squarefree Q≤(log x)^L with fixed L, Σ_{n∈(x/2,x]} abs(w(n)−r_Q(n))≥(1/2+o(1))x; the signed reconstruction error can still cancel and is not refuted | 2026-09-05 | `polylog-fold-transfer.md` §5 |
| the localized merge chain, telescoped to level x | REFUTED | it dies on averaging before any sieve question is reached, short by a factor 9.6 ln x | 2026-08-17 | `localized-04-maxsum.md` §7, §10 |
| weakening the gate to M ≤ α·p | REFUTED | the bootstrap map B ↦ 2.4·R·B·ln x is expanding at every x, so there is no fixed point at any α | 2026-08-17 | `localized-04-maxsum.md` §10 |
| bounding the increment rather than the level | REFUTED | true increments outrun the gate by an order of magnitude | 2026-08-17 | `localized-04-maxsum.md` §10 |
| composing the chain in blocks to reach M ≲ 3.3 x ln x | REFUTED | blocks do not compose; the composed bound exceeds its own gate by 13.2 ln x | 2026-08-17 | `localized-04-maxsum.md` §7 |
| the accumulating-index family on the tile (A4, A10's m_eff) | CLOSED | the Overshoot Budget, MEASURED: 0.88 to 1.18 nats of lifetime slack against x² (1.16 to 1.47 against the programme's x′² − 2) versus a counting tool loose by 3.5× to 6.7× at one fold, plus the measured bust at fold 31; the m_eff half dies on step 4's refutation, not on the budget | 2026-08-17 | `gate-multiplies.md` §5, §6 |
| TODO 0b as stated, ln c ≲ 2 ln²u/u ⟹ G2(u) < u² | REFUTED | false by a factor ln u; the sharp rate is ln c(p) ≤ 2 ln p/p and the measured multiplier spends 77% to 214% of it on this corpus's ladder (mean 1.30 over p = 7..37) and 106% on Ziller and Morack's | 2026-08-17 | `gate-multiplies.md` §7 |
| the Maier matrix as a route to the origin | REFUTED | the informative and origin-distinguished regimes are disjoint | 2026-08-17 | `maier-matrix.md` §5 |
| the origin as a distinguished position at S = x′² | REFUTED, and reversed | origin/mean = ρ(2), at the minimum of the survival curve: measured 0.79303 to 0.79922 against e^{2γ}/4 = 0.79305, HL-conditional in its exact value, and below the mean by exact count at y = 13, x = 19 | 2026-08-17 | `origin-excess.md` §2, §5 |
| the certificate route (the θ ladder) as a road to TPC | RETIRED | the sharp maximal law that would finish the route is itself TPC-implying, need/z² = 0.49 to 0.61 flat at z = 13..43; the reported z = 29 crossing was separately found to be a fixed-window artifact and is not among the reasons this closed | 2026-08-18 | `theta-ladder.md` §5b; `history/staging/phase1-T4-maximal-law.md` |
| extending h2 past 21 terms as the high-value computation | WITHDRAWN | infeasible and non-diagnostic: precision was never the constraint, and the bias is a property of the range | 2026-08-17 | `h2-scoping.md` §5, §6 |
| the two-class driving-term route (Holt's method adapted) | route REFUTED, lemma stands | it certifies gaps of size O(x) and cannot reach x² | 2026-08-17 | `two-class-lower-bounds.md` §7 |
| Hagedorn's algebraic construction h(n) ≥ 2p_{n−1}, adapted | CLOSED | the same O(x) ceiling as the driving-term route, already free from G₂ ≥ F(x) + 1 ≥ x′; past it the construction meets the first-twin-slot question, which is the postulate | 2026-08-17 | `two-class-lower-bounds.md` §7 |
| the proportional-bias exponent correction | REFUTED | the h2 ≥ h floor kills it | 2026-08-17 | `exponent-control.md` §3 |
| any twin-specific discrepancy law | REFUTED | the random-class control reproduces it at the one level tested (k = 2, top prime 23, 24 draws, the twin set at the 71st percentile in sd and the 79th in sup), and the growth law's integer 3 is R_k(p) → k+1, class-independent | 2026-08-17 | `discrepancy-two-class.md` §6 |
| GS Corollary 1.4 as an obstruction | WITHDRAWN | η is capped at 1/100, so u ≥ 50,000 and log x ≥ (5·10⁶)^{200} | 2026-08-17 | `maier-matrix.md` §8 |
| Lemma V's mean-square form as the missing factor | CLOSED | B was never the binding term, the min taking the B2 branch at every z from 13 to 47; and B ≤ 9A²(E−1) = O((log z)⁸) is a theorem with no hypothesis, proved in-repo and re-derived adversarially 2026-08-29, with Opera de Cribro 6.18 a published neighbour for a one-dimensional signed analogue at s ≥ 9 against this corpus's s in [2.0, 3.4] | 2026-08-18 | `history/staging/attack-AB-bounded.md`, `history/staging/attack-tail-maximal.md`, `history/staging/redteam-0829-theorem1.md` |
| `u_sup` as an unconditional worst-position bound | CLOSED | measured rising at all nine steps over ten levels (z = 13..47) on a flat ~2.05 per-prime factor, and not a basis artifact, the (h,m) basis being strictly more expensive by a flat 7.26 | 2026-08-18 (basis-independence added 08-19) | `sift-limit-attack.md` §7e; `history/staging/attack-tau-repricing.md`, `history/staging/attack-hm-basis.md` |
| Brüdern–Fouvry's left factor as the thing to beat | CLOSED | it is unimodular, so Parseval kills it free; the price is exactly the quantifier | 2026-08-18 | `sift-limit-attack.md` §7e |
| re-splitting Brüdern–Fouvry's four side conditions | CLOSED | the apparent extra 0.0295482779 of exponent violates side condition (iii); their point is a vertex of an optimisation already performed | 2026-08-18 | `history/staging/attack-bf-split.md` |
| the loss-budget LP at x = 43 | CLOSED | calibrated floor 3.3152 over 33 readings, error bar 0.62 to 0.98 and not converged, with DP1 carrying 71% of the loss; inside the LP's information class θ is the only place left to push | 2026-08-18 | `research/lp-push-x43.js`; `history/staging/lp-push-x43.md` |
| fractional retention (Brady / Runbo Li) | CLOSED | the upper-bound window (α_κ, β_κ+1) is empty at every κ ≥ 2, since α₂ = 5.35773 > 5.26645, and the lower-bound half that does apply is worth a projected 3.83e-4 of exponent, 0.017% of the gap | 2026-08-18 | `history/staging/scope-fractional-retention.md` |
| "a floor at 4", and the band (4, 4.2665] | REFUTED | 2κ is Selberg's conjectured target and not a proven floor, already beaten for ½ < κ < 1 and open for every κ > 1 per Brady p. 3, and Blight never writes the number; what survives is only that no κ = 2 limit below 4.2665 is exhibited, per `SEARCH-CONVENTIONS.md` §4 | 2026-08-18 | `sift-limit-attack.md` (Blight passage); `SEARCH-CONVENTIONS.md` §4 |
| improving β₂ itself | CLOSED | closed for us, not proven unimprovable: unimproved since Diamond–Halberstam 2008 and everything after is worse at κ = 2 (Blight 4.45, Franze 4.516, Opera de Cribro 4.83) | 2026-08-18 | `dhr-verification.md`; `PRIOR-ART.md` |
| exact-strata re-insertion as a proof technique | CLOSED | infinite regress: it terminates at every finite z and at no uniform z; it survives as a finite theorem giving G₂(19#) ≤ 210, G₂(23#) ≤ 420 | 2026-08-18 | `history/staging/attack-beta2-03-exact-strata.md` |
| the covering economy asymptotically, and the hybrid | CLOSED | it dies at x = 13 where Σ 2/p crosses 1, and β_pure diverges like 7.182 lnln x (2a with a = 3.5911 the root of a·ln(a/e) = 1; the 7.19 that stood here used a = 3.594, corrected 2026-08-29); the exact head reaches only x₀ = O(ln x), so no exponent moves | 2026-08-18 | `sift-limit-attack.md` §7; `history/staging/attack-hybrid-bound.md`, `history/staging/attack-beta2-05-covering-pruning-bound.md` |
| Brady's thesis Problem 3 as a licence on the exponent | CLOSED | it is not our covering problem — one class per prime, value-shift, measurably different optimum | 2026-08-18 | `history/staging/attack-np-licenses.md` |
| prior art on the `u_sup` representation | CLOSED | the Fejér-mass identity is the classical Σ sin²/sin² = m(n−m) folklore and the mean-square half is published (Opera de Cribro 6.18, Friedlander arXiv:2607.05707), so the representation is an assembly of standard parts; the title-level zeros are not an absence claim and SEARCH-CONVENTIONS has no owning-convention row for it | 2026-08-18 | `history/staging/attack-prior-art-last-ground.md` |
| the FKMPT corrigendum alarm (MR4592874) | WITHDRAWN | the corrigendum was read on 2026-08-18, one day before the alarm claimed otherwise; 22 of 25 citations clean and every corrected constant already carried | 2026-08-19 | `covering-dive.md` §2.3; `history/staging/verify-fkmpt-corrigendum.md` |
| Ford–Halberstam's dual decomposition, carried out after 26 years | REFUTED | one χ⁺ per component forces D⁻ = D⁺, giving 2(1+√e) = 5.2974 against 5.1581, and 4.3591 against their own published 4.1560 | 2026-08-19 | `history/staging/attack-ford-halberstam.md` |
| "Hough's Lemma 3.2" as a separate source | SUPERSEDED | it is BBMST arXiv:2211.01417 Lemma 3.2, confirmed at source | 2026-08-18 | `history/staging/verify-fkmpt-corrigendum.md` §4 |
| `L ≤ 111` as the adjudicated block bound | SUPERSEDED | coverability of [1, L] is downward closed, so the bound is first-infeasible-minus-one: `L ≤ 62` stands and 111 is 1.79× weaker | 2026-08-19 | `research/block-L-first-dead.js`; `sift-limit-attack.md` §7a |
| the A/B-coupling depth axis as a proof route | CLOSED | the alternation lemmas add exactly 0 beyond exact per-prime counting, since K_p is already an exact maximum; depth 3 = 38 does clear 529's L ≤ 51, so the counting route is open at block 1 and closed on reach, x = 41 being unreachable at every depth run | 2026-08-19 | `sift-limit-attack.md` §7a-ter; `history/staging/attack-ab-coupling.md`, `history/staging/verify-ab-coupling.md` |
| certificate monotonicity in L as a live defect class | CLOSED | every first-valid-L in the live layer and the three documents it cites comes from a consecutive scan; the one survivor was an H₁ bisection, wrong at 3 of 5 levels, now boxed as SUPERSEDED; about 40 staging files were not swept | 2026-08-19 | `history/staging/monotonicity-sweep.md` |
| the greedy oracle as an exact solver past x ≈ 53 | CLOSED | at one fixed uniform budget, exact at 13 of 13 and 14 of 14 sealed-scope terms but 1 of 8 on the published optima x = 47..79, log-log slope −0.0235 ± 0.007 in ln x; 43 and 53 were budget (4× restarts closed them) and three of the eight misses were still moving with budget | 2026-08-19 | `research/greedy-oracle-validation.js`; `history/staging/greedy-oracle-validation.md` |
| a constant-factor submodular certificate for a finite-level G₂ ceiling (import-map row 11) | CLOSED | greedy's coverage is at least L(1 − ∏(1−2/p)) for every L — 0.800 to 0.959 along the ladder, 0.9167 to 0.9965 at the decisive lengths — so no α ≤ 1 − 1/e test ever fires | 2026-08-19 | `research/row11-closure-01-coverage.js`; `history/staging/row11-closure.md` |
| the ℓ¹ → ℓ²√log conversion on Θ_e(a)'s arithmetic (import-map rows 5 and 6) | CLOSED | ‖Θ·S_H‖₂ = rms(R_H) exactly, so the conversion IS the sharp maximal law and its true constant (0.56–0.92) sits below the TPC line (1.36–2.23); the available gain is the C^{π(z)} loss itself | 2026-08-19 | `history/staging/import-l1l2.md` |
| the local-lemma family (Shearer's exact criterion, Moser–Tardos, resampling oracles, entropy compression) as a route past the Mertens threshold | CLOSED, by three separate mechanisms | on a complete dependency graph Shearer's exact criterion is the union bound; Moser–Tardos gains nothing (chordal graph, mutually exclusive dependent pairs); the variable model that escapes needs structure costing H ≥ x#; and Achlioptas–Iliopoulos is not touched by tightness at all but arrives two levels earlier than Shearer, at x = 7, because this object's causality digraph is complete (INFERRED) | 2026-08-19 | `history/staging/import-shearer.md` §4, §6, §8 |
| fold-succession damping (the moiré question) | CLOSED | the succession anti-correlation is level-tracking and nothing more; kill succession is memoryless and record assembly is cooperative | 2026-08-19 | `history/staging/fold-succession-autocorr.md` |
| the 0c×0e composition (level-selected residue-deleted maxsum) | CLOSED | the chain is circular at m = 1 and alignment goodness is universal, so there is nothing to select | 2026-08-19 | `history/staging/attack-0c0e-level-selection.md`, `history/staging/verify-monotone-depth.md` |
| the maxsum bridge as a 0c→L converter | CLOSED | maxsum_k ≥ G₂ floors the bridge output at ≈ 0.183x for any maxsum bound whatsoever | 2026-08-19 | `a3-05-bound-L.md` §7; `history/staging/attack-foldL-05-maxsum-direct.md` |
| chaining the Tail-Count Transport on the tile | CLOSED | a fixed window index certifies a constant against a diverging truth (108/180/240/330 at every fold 13..29 against a truth of 66..258), and forcing the index to grow prices out at A5's coordinate-free cap K ≤ 1 + θ/(3q); the single-fold instrument stays exact because the alignment sum is the sum over copies and realises every merge | 2026-08-19 | `history/staging/attack-foldL-03-transport.md` §4, `history/staging/verify-tailcount-transport.md` |
| gap-genealogy amortization on the tile | CLOSED | births are maximal, not scarce; the ledger fails by exactly the factor ln²x | 2026-08-19 | `history/staging/attack-foldL-04-amortized.md` |
| the B-free/Sarnak dynamical import as a route | CLOSED (an exclusion in print) | Araújo's 2026 multi-class generalisation names the Mertens-divergent regime "not an interesting system" — the limit comb is {−1}, entropy 0, not Toeplitz; the dictionary is exact at period scale and silent where Assumption A and H″ live; H″'s dynamical translation predicts the opposite of the measurement | 2026-08-19 | `history/staging/import-bfree.md` |
| recognizability-radius route: R_x < x′²−3 ⟹ Zone Postulate | REFUTED | R_x ≥ G₂ − 1 makes the reformulation strictly stronger than the target, and R_x/x′² crosses 1 at x = 11 (1.1006) and reaches 2.5429 at x = 17, so it fails at four consecutive levels | 2026-08-19 | `history/staging/import-bfree.md` §3.2 |
| generic chaining against the maximal-law union bound | CLOSED | the entropy integral of the true metric already exceeds the union bound at every level (1.04–1.10×) — chaining's ceiling is below the union bound's floor — and the C^{π(z)} price was never over positions but over the arithmetic of Θ_e(a), an ℓ¹→ℓ²√log statement no geometry on Z/W reaches | 2026-08-19 | `history/staging/import-chaining.md` |
| bounding the anchored δ by the forced scale (or any constant) as a lemma | REFUTED as a target | the identity 1+δ = S(0)·N̄/(L0·R0) makes δ > −1 equivalent to S(0) > 0, which at infinitely many x is TPC by `anchored-note.md` Prop 2, so ANY bound \|δ\| ≤ c < 1 is TPC-strength, the fourth wrong-direction arrival; the split identity (1+δ)(1+F) = 1+ρ then shows ρ/F is not bounded by 1 (2.001 at @11, 1.266 at @19) and δ takes the sign opposite to Hardy-Littlewood at those same 2 of 7 levels, while \|δ\| < F at 7 of 7 | 2026-08-19 | `history/staging/import-suen.md` §1, §4 |
| a stochastic coupling dominating CRT thinning by independent thinning | CLOSED (argued) | the merge event is a function of the gap value (merges only at g ≡ 0, ±2 mod p), mutually singular with every solvable variant; and H″(m=2) in moment form implies the Zone Postulate, the third wrong-direction arrival | 2026-08-19 | `history/staging/import-thinning.md` |
| the L = 1 residue count as a smaller target than the postulate | REFUTED | it IS the Zone Postulate in residue notation: the residue condition is the kill condition with zero slack, and the chain sum vanishes iff G₂ < θ (three lemmas; T* = G₂ measured at four of four windows) | 2026-08-19 | `history/staging/attack-l1-residue.md` |
| the instrument-slack channel of the i.o. licence (dial 4's last) | CLOSED | the loosest direct-G₂ instrument oscillates 0.3747 nats against a need of 6.700, no sharp-level signature survives a permutation test at any of 19 instruments (Šidák p = 0.8865), and the two signatures with a named mechanism select finite sets — dial 4 is FINISHED, a measured margin of ~0.7 nats total | 2026-08-19 | `history/staging/ioslack-survey.md`; `research/attack-ioslack-survey.js` |
| the one-parameter extinction density law as a fitting model | REFUTED | two calibrations of the same shape disagree by 60%; the two-parameter form is the measured, predictive one | 2026-08-19 | `history/staging/attack-foldL-06-scaling.md` |
| the bounded-differences family (McDiarmid, Azuma, Talagrand's convex distance, Warnke, Kutin, Kim–Vu) on the anchored deficit | CLOSED | the first scour prime's worst-case effect d(q₁) misses the theorem's own slack by a factor growing like √N (174 to 70,576 over x = 11..23); the published repair's exponent is MEASURED below 1 and falling at eight levels (0.5323 at @11 to 0.1682 at @37), with a closed form q₁Π/16 converging onto it from below; and independently, the target is a named anchored word on which an ensemble bound of any strength is inert | 2026-08-20 | `history/staging/row7-recon.md` |
| the lonely runner / view-obstruction import, and the Birkhoff/bounded-remainder branch (import-map row 12) | CLOSED | the fully general multiplicity version is answered in print with the union bound exactly tight (per the 2025 survey quoting Schoenberg 1976, himself NOT REACHED), the shifted variant is false from n = 5, the field names prime velocities as ITS obstruction, and the BRS branch fails its hypotheses and is dominated 5454× by the Level Ledger at x = 29 | 2026-08-20 | `history/staging/row12-recon.md` |
| the distortion method as a route to an interval bound (import-map row 8) | CLOSED | the criterion speaks at two classes and its economy is convergent, but its measures live on a CRT product, so the certified window is at least a primorial and the only interval bridge is exponential in the progression count | 2026-08-19 | `history/staging/import-distortion.md` |
| the BGT interpolation machine for 1d limit existence (import-map row 9) | CLOSED as a machine, reframing banked | it closes on hypothesis H1 in the coordinate the exponent lives in, since π(st) − π(s) − π(t) is never 0 at st ≥ 25 (minimum 2, maximum 12 over 104 pairs), for the rotation ensemble as well; the one coordinate where H1 does hold, n = π(x), has limit +∞; the surviving target is the bounded superadditivity defect of S(x) = ln(x²/Ĝ(x)), whose explicit-constant form is TPC-implying below ln C = 1.3946 | 2026-08-19 | `history/staging/import-interp.md` |
| the sofic first-moment shape L ≍ p/ln p (import-map row 2's rate claim) | REFUTED | killed by its own pre-registered flatness criterion on the map's own formula (t = 2.69 at seven points) and, independently of any flatness, by arithmetic: granting perfect flatness the measured ratio 2.1346 still misses the requirement by 1.618 to 2.640; the corrected qualifying fraction falls faster than 3/p by an order of magnitude and the first-moment L is MEASURED polylog (ln L = −1.884 + 2.892 lnln x, R² = 0.972, 42 corrected census points) | 2026-08-19 | `history/staging/import-sofic.md`; `history/staging/fdecay-deep.md` |
| the tail factor √(2 ln D), and its repair √(2 ln θD), in the maxsum growth law | REFUTED | the measured level sits ABOVE the θ ≤ 1 ceiling at small m and the residual widens with D — refuted by magnitude and by sign | 2026-08-19 | `history/staging/scanstat2.md` |
| the linear exponent rule H = a + b·ln D (pre-registered 0.220511 + 0.006140, refitted 0.220795 + 0.006146) | REFUTED, twice blind | validated one level out at T₂₉ and then missed both sealed bands, T₃₁ by 4.96 and T₃₇ by 6.90 band standard errors (1.99 and 3.63 of each measurement's own s.e.), two engines; H is a grid-dependent summary of a curve and no single exponent should be quoted | 2026-08-19/20 | `history/staging/scanstat2.md`; `history/staging/scanstat-t37.md` |
| the Chen–Stein route to the 3.8 and the extinction constants, and the super-W decomposition of the deficit (import-map row 4) | CLOSED / REFUTED | one shared uniform residue draw per object leaves no error term: b₃ reaches 0.850 to 0.9998 of its own ceiling on the multi-kill events and 12.7 to 73.4 times b₁ + b₂ on the strike process; and the deficit does not live in the super-W part (δ_tot/s = 0.0195 against a measured 0.0341 at @23) | 2026-08-19 | `history/staging/import-stein.md` |
| class-uniform joint caps at the origin (closing 34 → 45 with bounds quantified over scour classes and concluding a class-uniform number) | CLOSED | advmin@11 = 16 exact, two disjoint proof stacks — 18 BELOW the staircase's anchored floor 34, so any class-uniform conclusion is instantiated by the adversarial witness and capped by 16; only anchored-aware caps remain (at @13 at least 155 of the 197 floor-to-truth points are anchored-only) | 2026-08-20 | `history/staging/attack-advmin-1113.md`; `history/staging/redteam-0820-structural.md` §2 |
| manufacturing the smooth profile from sieve weights (completion/decomposition on the Rosser factor) | CLOSED | Möbius-signed weights are Fourier-flat: the aggregated low-frequency mass share sits at or below the flat null at every occupied block and at 31 of 31 fixed-s slices (0.57 to 1.15 times the null, median 0.82) where a usable smooth component needs it at scale C̃/K ≫ 100, and the largest single mode, k = 0 included, carries 2.8e−3; the exact blocking term is the high-frequency remainder of the completed expansion, which keeps 1 − o(1) of the ℓ² mass and is exactly as inadmissible as the original | 2026-08-20 | `history/staging/smoothness-front.md` §4; `history/staging/redteam-0820-math.md` §2.3 |
| the Kowalski–Michel–Sawin branch for Lemma V | CLOSED | the modulus hypothesis fails on its own (both papers scope themselves to a single fixed PRIME in the authors' own words, read at source, while ours is z-smooth squarefree and is summed over), and the kernel and interval-support hypotheses are jointly unsatisfiable for the rank-1 ratio phase; the granted fantasy gives no saving at all on the binding h ≍ 1 block and H^{−0.011127} on the largest, under a third of Bettin-Chandee's standing H^{−0.035608}; revival needs the squarefree-smooth-moduli extension KMS 2017 §1.5.2 names as open | 2026-08-20 | `history/staging/smoothness-front.md` §5; `history/staging/redteam-0820-math.md` §2.4 |
| the Y_N/coefficient axis of the DI/Pascadi frontier past 0.393922 | CLOSED | Y_N enters Cor 18's ℐ² only through the exceptional factor, and the Y_N-free regular-spectrum main term CS(C+DR)(RS+N) binds at 0.393922 by exact arithmetic (1.212157 + 2σ ≤ 2), so no coefficient information moves the frontier further | 2026-08-20 | `history/staging/smoothness-front.md` §3.4; `history/staging/redteam-0820-math.md` §2.1–2.2 |
| literature-owned special-level constructions as a source of favourable levels | CLOSED (recon) | the field's level engineering is entirely on the DEVIATION side: no surveyed construction certifies smallness or regularity of a max-type object at its engineered level, and the only offensive i.o.-over-levels quantifier (Heath-Brown's, citation unverified at source) hypothesises its levels rather than constructing them; the absence rests on the family's own surveys, the indexed 11N13/11N25 owning-convention sweep never having run | 2026-08-20 | `history/staging/special-levels-recon.md` |
| mirror symmetrization as an improvement channel at the anchored cap | REFUTED | gains exactly 0 — every cap family in play is itself mirror-covariant, and the covariance σ(K_q(a)) = K_q(w−a) with the comb fixed is a one-line theorem, so the zero is structural, not empirical | 2026-08-20 | `history/staging/attack-anchored-01.md` §3; `history/staging/redteam-0820-night-proofs.md` §1 |
| K = Ψ/Φ² (the Fold Moment Identity's deviation) as the M_p field mechanism | REFUTED as a field predictor | K spans a factor 1.009 across folds 101/211/421 while M̂ spans 2.28 — the deviation does not carry the field | 2026-08-20 | `history/staging/mp-derivation.md` §3; `history/staging/redteam-0820-night-empirical.md` §T1 |
| modelling the twin tile as a repulsive point process (Hermitian determinantal, negatively-associated, strongly Rayleigh) or as an attractive one (permanental, positively-associated) | CLOSED, both signs | its pair correlation takes the value 0 or a value ≥ 2.3812 and nothing in between, so no association hypothesis of either sign holds: g(2) = 0 by mod 3, g(6) = 6∏_{5≤p≤x}(1−4/(p−2)²) = 2.6617 at x = 11 | 2026-08-28 | `history/staging/import-repulsive.md` §2; import row 17 |
| the QR refinement of the anchored-cap transplant (immune offset classes in the caps) | CLOSED | the registered surplus test is VOID on its own matched control (a 0.6% design bias at 6.63 s.e. where no class is QR-immune at all), and what stands is the registered placement test at Z = +0.49 plus a POST-HOC design-free class test in which the immune classes deliver exactly the guardrail's r/(r−2) and nothing past it (per-prime Z −0.48..+1.66 over 3.4M twin openers, differenced primary +0.00046 ± 0.00127); as a certificate they are dominated by simply naming the two classes each small prime kills, which certifies 1219/1219 anchors against the immune subset's 1126 | 2026-08-28 | `history/staging/attack-z3-immune-01.md` §3, §4; `research/attack-z3-immune-01.js` |
| the K*-product doubling certificate Ĝ(2s) ≤ (K*+1)·Ĝ(s) as the bridge for item D at any C₂ in the legal band [4, 19.2455) | CLOSED | dead on the chain's own exact data plus the red-team-confirmed floor K* ≥ π(2s) − π(s): certificate 18 against target 8 at s = 16 where the true ratio is 5.2727, then ≥ 14 at s = 64 and ≥ 24 at s = 128, past the whole band; the maxsum certificate (sup 6.6364 at s = 16) survives as the tightest proven per-step bridge and its all-s form is the open inequality, so the doubling target itself is untouched | 2026-08-29 | `history/staging/attack-0829n-doubling-bridge.md` §§0, 3; red-teamed `history/staging/redteam-0830-doubling.md`, which finds the row UNDER-claims: Lemma 1 at s = 128 alone clears the whole band (N+1 = 24 > 19.2455), so the exact walk corroborates rather than carries it |
| a law D* ≈ Q^c for the parity adversary's killing level, as a candidate for unnamed structure at the wall | CLOSED (sealed prereg, 5 HIT 1 MISS) | no law in Q: the Q-slope moves 1.446 → 1.204 → 0.575 across ranges while ln D* on ln(width) holds 1.097 ± 0.012 with a quarter of the scatter, D*/width ≈ 0.5, and the independent-thinning null reproduces the LN-Q slope within 0.025 (corrected 2026-08-30, `redteam-0830-records.md`: 0.025 is the ln Q slope difference, not the width law's; on the same 84 matched anchors the WIDTH difference is 0.031); D* is where a modulus first reads a single position of the window, the wall survey's remainder statement in the stretch coordinate, and names nothing new; eleven anchors seen around the seal are disclosed in the note | 2026-08-29 | `history/staging/attack-0829n-parity-dstar.md` §§4, 6; red-teamed `history/staging/redteam-0830-records.md`, which confirms D* EXACTLY at 299 of 376 anchors on a BigInt rational simplex (0 contradicted, 77 above its row cap) and re-derives the 172-figure gate from arithmetic, and which rules the closure well powered on clause (b) (paired se 0.0401 against a 0.15 band) |
| the Skeleton Equidistribution door (fixed-modulus equidistribution of (q mod M_T, ⌊W/q⌋ mod M_T) over the scour primes) as the route to the all-x aggregate 30-skeleton bound; TODO item 4 retired | CLOSED as a route; the Collapse Theorem and the six-level certificate stand | over every scour prime the branches on which the door is a fixed-modulus question carry 9.2%, −0.9%, 0.2%, 0.5% of the skeleton at @13..@23 (the −10.8% and 5.5% on record were 9% and 2% subsamples), so the door as named moves G30_agg by at most 0.0102 and NOT ALWAYS DOWNWARD (the closable block is −0.0009 at @17, so removing it RAISES G30_agg from 0.1011 to 0.1020; sign corrected 2026-08-30 per `redteam-0830-imports.md`), against an open part of 0.094 to 0.126; on the open side M_T > lB ⟺ q > W/M_T, the phase never wraps and no equidistribution statement remains, only the inequality itself; the one literature instrument (Saffari–Vaughan Thm 10) is a marginal on a growing window and certifies no level; and nothing on the live board consumes G30_agg < 1/2, calm being decorrelated from survival | 2026-08-30 | `history/staging/decide-0830-skeleton-door.md`; `natal-cap-36-skeleton-door.md` §Proposition E; `history/staging/import-fracparts.md` §§5-6 |
| the deep-ladder Buchstab transfer (item 8a) by the sharp sieve functions at the depths the run levels reach | CLOSED | the transfer is an asymptotic for a ratio of two κ = 2 sifting functions sharing z = q, so any sieve bracket enters the ratio undivided: F₂/f₂ = 3.668 at @23's head σ = 4.7088 (NOT "the best σ any level has": @29's head σ is 5.5785 and @97's 17.1422; corrected 2026-08-30); the source's level-free implication "|B − 1| ≥ c forces σ < u_c − 1" is REFUTED as a derivation (`redteam-0830-engine.md`: it bounds every u in a weighted average by the largest and mistakes the denominator, and fails exhaustively over all 1,512,930 (q, K) pairs at @23 for the model B at c = 0.10/0.05/0.02 and for measured B at every c), and what survives is the MEASURED statement at @23: worst σ = 2.159 against β₂ = 4.26645, while a lower bound needs σ > β₂; the iterated Buchstab identity with F₂ is negative from K = 1 at q = 37 @23 and Jurkat–Richert fails Ω(1) as stated; the F₂ bound beats the trivial cap at 0 of 1,512,930 (q, K) pairs, floor −1,733,138 at every K | 2026-08-30 | `history/staging/attack-0830-buchstab-deep.md` §§2, 4; red-teamed `history/staging/redteam-0830-engine.md` (26 of 26 comparisons agree; one derivation refuted, conclusion surviving as a measurement at @23) |
| the per-fold composition of L across the primes in (s, 2s] as an upper bound on the doubling kill-run (item D) | CLOSED (truth gap) | the composition is a PRODUCT, K*+1 ≤ ∏(1 + L_j) (PROVEN by a nesting chain of survivors; the sum form is false at 7 of 14 steps), so the composed index is ≥ 2^N over N folds and 2^N·ḡ(s) alone beats 8·Ĝ(s) at chain rungs 16, 32, 64 with no walk; the composed certificate exceeds the allowance at 8 of 14 enumerable steps (20.83× at s = 16) while the truth sits under it everywhere (sup w/a = 0.6591 for the truth; the 0.8295 this row carried until 2026-08-30 is the CERTIFICATE's ratio, `redteam-0830-doubling.md`); it is the Tail-Count Transport chain with the index forced to grow, failing at the opposite end of the index dial | 2026-08-30 | `history/staging/attack-0830-doubling-killrun.md` §§2, 3; red-teamed `history/staging/redteam-0830-doubling.md` (product theorem stressed to 21,641,346 nesting links over 6,012,804 killed runs, 0 failures) |
| the ρ maximal law / REC(s, u₀) route to a two-class exponent below β₂ (item 0's Lemma V → sup-over-positions arrow) | CLOSED as a TRUTH GAP at rung DERIVED, red-teamed twice on the growth half and once on the exact half | a pointwise floor on the vector-sieve remainder, cc(r) = −(A₁A₂ + A₁B₂ + B₁A₂) as signed counts of Rosser exit chains, is PROVEN (identity holding at every position, 0 mismatches in 20.5M, extended to z = 113), and its DERIVED growth Ω ≫ z^{16s/9}/ln⁸z (s ≤ 3; corollary 2 × capped-LP-max > β₂ for every s > 2.3999) survived two adversarial passes on independent code (2026-08-30, 2026-09-04) on the Rosser vector-sieve lattice at every admissible level split (1643 splits, minimum margin 0.64; no other admissible weight system is derived); if the growth holds then REC(s, u₀), F1, F2 and RML(α) are FALSE for every u₀ < 16s/9 > β₂, so the route is false rather than hard, and the proof-gap reading is refuted because REC quantifies over the remainder of the very certificate the floor bounds; the falsity lives beyond a level that depends on (s, u₀): z ≈ 10^15.3 at s = 3.0 and u₀ = β₂, 5.6e31 at s = 2.698721 and u₀ = 4.2165, and no computation reaches any of them; two failed breaks on a derivation are two failed breaks, so the row is worded at rung DERIVED and not above it | 2026-08-30, reworded 2026-09-04 | `history/staging/attack-0830-rec-cheapest.md` §4; `history/staging/redteam-0830-floor-growth.md`; `history/staging/redteam-0830-floor-sign.md`; `history/staging/attack-0829n-rml-proof.md` §3 (REC's statement); `history/staging/redteam-0904-floor-growth-2.md`; `history/staging/redteam-0904-item0.md` |

Recorded script outputs that cite [REFUTED.md](REFUTED.md) resolve to
this table through a compatibility pointer; all outcome updates belong here.
