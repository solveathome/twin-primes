# primeoire

> Public mirror edition: repository-internal working instructions were removed. See MIRROR.md.

**A new framework and vocabulary over classical sieve-theoretic objects — a new lens.**

Primes as moiré patterns: stack the periodic beats of the primes you know, and
the holes of the interference pattern, repeating as a **tile** of width p#,
are where all further primes must live. This repository is the complete body
of work: the framework, its theorems, its measurements, its papers, and its
proof-of-existence.

Built by Chris Benjaminsen on a 2020–2026 corpus of independent
experiments, developed with AI assistance.

## Where to start

**The reading path, and it is the same one every document in this repository
points at.** Start with these three references to understand the programme
and what remains open:

1. **§Status below** — the central object, the proven bound, the gap, and the
   fact that the upper bound on G₂ remains unchanged.
2. **`research/G2-STATE.md` §0** — the current bounds and open arithmetic,
   followed by a reference inventory to consult for a specific claim.
3. **`research/README.md`** — the router. It says which file answers which
   question, in what order, and which files are live rather than spent. Every
   question-specific path starts there.

Then read for your question, not in file order. `research/GLOSSARY.md` is a
lookup document read one entry at a time, not a first read. Nothing in
`research/history/` should be loaded unless you need the history of a specific
claim.

Before starting an attack, check [Research outcomes](research/OUTCOMES.md).
It groups reusable results, failed steps and scoped closures by research
question, with evidence and conditions for revisiting. Git records revisions
and authorship. Agents start with [AGENTS.md](AGENTS.md). For the active
arithmetic campaign, [Research handoff](research/RESEARCH-HANDOFF.md)
consolidates the assessment, exact open targets and assignment requirements.
The [current execution plan](research/RESEARCH-EXECUTION.md) is the document
to give the core handler for continuation. It contains the reviewed closeout, candidate next obligations, ownership
and acceptance contract.

The [2026-09-09 review](research/research-round-validation.md) integrates
A/A2/B/C/D/E and V/W returns with proof and scope corrections. The
centered truncation, low Type I estimate and additional regional cut are
accepted at scope. No sufficient twin-prime estimate follows.

## Map

| Path | Purpose |
|---|---|
| [research/AGENT-START.md](research/AGENT-START.md) | Short onboarding and document ownership |
| [research/RESEARCH-EXECUTION.md](research/RESEARCH-EXECUTION.md) | Multi-day handler brief, reviewed returns and remaining assignments |
| [research/RESEARCH-HANDOFF.md](research/RESEARCH-HANDOFF.md) | Exact mathematical contract and sufficient open estimates |
| [research/README.md](research/README.md) | Question-to-file router for the full body of research |
| [research/G2-STATE.md](research/G2-STATE.md) | Current assessment and detailed G2 reference inventory |
| [research/TWIN-REDUCTION.md](research/TWIN-REDUCTION.md) | Arithmetic reduction and review state of its dependencies |
| [research/ZONE-POSTULATE.md](research/ZONE-POSTULATE.md) | Zone target and its logical relation to twin primes |
| [research/THE-LENS.md](research/THE-LENS.md), [research/GLOSSARY.md](research/GLOSSARY.md) | The framework and its vocabulary |
| [TODO.md](TODO.md) | Forward priorities, parked routes and maintenance |
| [research/OUTCOMES.md](research/OUTCOMES.md) | Reusable results, failed steps and revisit conditions by question |
| [research/QUESTIONS.md](research/QUESTIONS.md), [research/SCRIPTS.md](research/SCRIPTS.md) | Generated question and script indexes |
| [research/PRIOR-ART.md](research/PRIOR-ART.md), [research/SEARCH-CONVENTIONS.md](research/SEARCH-CONVENTIONS.md) | Attribution and source searches in the owning vocabulary |
| [research/data-reuse-audit.md](research/data-reuse-audit.md) | Retained inputs and their limits for new tests |
| [research/qc/README.md](research/qc/README.md) | Reproducibility and mechanical checks |
| [paper/PAPERS.md](paper/PAPERS.md), [paper/proposals/PROPOSALS.md](paper/proposals/PROPOSALS.md) | Internal manuscripts and proposal decisions |
| [research/history/CHRONICLE.md](research/history/CHRONICLE.md), [research/history/CHANGELOG.md](research/history/CHANGELOG.md) | Specific historical evidence when needed |

<a id="status-2026-09-05"></a>

## Status

Updated 2026-09-08. The mathematical proof status is unchanged.

*(Scope: this section is the short current assessment. Per-object status
is `research/G2-STATE.md`, the target and its logical
status `research/ZONE-POSTULATE.md`, which variable to push
`research/THE-DIALS.md`, what to try next `TODO.md`.)*

**The goal is infinitely many twin primes. No proof or demonstrated route to
that conclusion exists here.** The fold structure is an exact representation
of divisibility; the unresolved work is extracting estimates strong enough to
prove survival on unbounded intervals. The achieved upper bound for the
maximum twin-slot gap is `G₂(x#) ≪_ε x^(4.266450284…+ε)`, from the DHR sieve.
The failed inequalities and finite experiments in `research/OUTCOMES.md` remain
closed at their stated scopes; they do not establish that every argument using
the fold structure must fail.

**The wall has to specify a method and its inputs.** Classical parity
obstructions concern the distribution estimates and error tolerances available
to particular sieve methods. They do not say that exact residue arrangements
lose all primality information. A new obstruction claim must name the method
class, retained statistics, tolerated errors and quantifiers. The `parity:`
ledger line records these inputs; its presence is documentation, not a proof
that a proposed argument succeeds or is impossible.

Three distinctions govern the next work:

1. **Quantifiers.** Infinitely many occupied dyadic intervals suffice for
   infinitely many twins. A uniform bound `G₂(x#) < x′² − 2` for all sufficiently
   large prime x gives occupancy of every sufficiently large zone, an additional
   requirement. We have not proved logical independence of these requirements.
2. **Constants versus powers.** Since `g ≤ G₂`, the preceding inequality gives
   `limsup g(x#)/x² ≤ 1`, using `x′/x → 1`. It does not by that comparison give
   `g(x#) = o(x²)`. A fixed power saving `G₂(x#) = O(x^(2−δ))`, δ > 0, would
   give the little-o conclusion and prove twin primes. An infinitely-often
   bound must retain that qualifier.
3. **Achieved sieve bounds versus impossibility.** The DHR threshold
   4.266450284… is an achieved dimension-2 sifting limit, not a proved optimal
   universal lower floor. Selberg's conjectured value 4 is not a proved floor
   either. The current application supplies no positive bound at the required
   quadratic scale; that is a limit of the available argument.

**Current arithmetic campaign (2026-09-09).** Classical reductions give
S(x)=C2*x+R(x)+O_H(x/log^H x) on dyadic intervals, with several complete
representations of R. The sufficient lower margin
R>=-C2*x+c*x/log^K x, for fixed c>0 and K>=0 on unbounded scales,
remains OPEN. The grouped-divisor moment controls a specified region.
A C3 averaged representation has a full absolute O(x) bound, without
the signed constant comparison needed for twins.

The latest [moving-cutoff audit](research/moving-cutoff-parity.md) repairs
a source endpoint and specifies a centered prime–Mobius discrepancy.
Its sufficient bound D_y>=-4x/25+o(x) remains OPEN. The repair, exact
reconstruction and rational tolerance checks supply no new cancellation
estimate. Ordinary prime BV is not an estimate for the twisted sequence.
A finite census to x=2^38 ([measurement](research/centered-discrepancy-measurement.md))
refutes neither sufficient form; its D_y comparison is dominated by the classical term's
slow convergence on the measured range. Further compute needs a new
statistic or falsifier; this is not an asymptotic limitation on every census.

The reviewed continuation fixes the centered endpoint and pays its low
Type I term, leaving S=C2*x+B+O_A(x/log^A x) with an exact unestimated B.
The [structured moment](research/structured-dispersion-estimate.md) adds
a fourth residual cut; its target box still has exponent 407/400>1.
Its remaining moment saving is greater than 7/200, with the global
complement still open. These regional and representation results cannot
be added as independent gains toward a twin count.

Read [the mathematical handoff](research/RESEARCH-HANDOFF.md) for the exact
objects, alternative consumers and links to their proofs. Read
[the continuation execution plan](research/RESEARCH-EXECUTION.md) for
assignments, novelty checks, validation and integration. Its board records
the integrated returns and candidate next obligations. Results and failed attempts are indexed by question
in [OUTCOMES](research/OUTCOMES.md), with their scope and revisit conditions.

**Finite evidence.** The trusted G2 ladder, its controls and its calibration
are recorded in [G2-STATE](research/G2-STATE.md) sections 2–3. Its fitted
power is a local slope, not an asymptotic exponent or evidence that the
sufficient twin margin holds. The detailed reference inventory there
separates derived bounds, conditional results, measurements and heuristics.

**Attribution.** The frame uses classical sieve objects. Holt's cycle-of-gaps
and fold programme, Maier's matrix method, and the other source matches are
recorded in [PRIOR-ART](research/PRIOR-ART.md). Independent rediscovery is
not a novelty claim. Read the owning source before importing an estimate.