# The research directory: what answers what, and in what order

<!-- ledger
id: Q-registry-research-readme
status: ANSWERED
todo: none
question: Which file in research/ answers which question, and in what order should a reader open them?
verdict: Router only: state lives in ../README.md section Status and G2-STATE.md section 0, the target in ZONE-POSTULATE.md, the queue in ../TODO.md; this file holds no mathematics and no summary of the programme.
-->

**Scope.** This file is the **router**, and that is all it is. It holds no
mathematics and no summary of the programme's state. Its one job is to get a
reader to the right file for the question they have, at the lowest token cost,
without reading the wrong file first. State lives in [../README.md](../README.md)
§Status and [G2-STATE.md](G2-STATE.md) §0; the target lives in
[ZONE-POSTULATE.md](ZONE-POSTULATE.md); what to try next lives in
[../TODO.md](../TODO.md).

Primes as moiré patterns: stack the periodic multiples of the primes you know,
and the holes of the interference pattern — repeating with period P_n# =
2·3·…·p_n — are where all further primes must live. This directory is the lab
notebook: each numbered script states a claim in comments, computes it, and
carries its actual output and reading at the bottom. Experiments are
indexed in [SCRIPTS.md](SCRIPTS.md). Check each producer's invocation,
retained inputs, cost and correction banners before running it; some
source logs and over-budget reproductions remain outstanding.

## Start here, and every entry document points at the same path

1. [../README.md](../README.md) **§Status** — the central object, the proven
   bound, the gap, and the unchanged upper bound on G₂.
2. [G2-STATE.md](G2-STATE.md) **§0** — what is hard here, before any derivation.
3. **This table**, and then read for your question rather than in file order.

**Do not open [GLOSSARY.md](GLOSSARY.md) first.** It is a lookup document, read
one entry at a time. **Do not open anything in `history/`** unless you need the
history of a specific claim.

## Which file answers which question

| the question | read, in this order |
|---|---|
| what to give the core handler so agents can continue | [RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md); reviewed closeout, candidate next obligations, ownership, checkpoints and acceptance |
| how an incoming research agent should start without loading the entire corpus | [AGENT-START.md](AGENT-START.md), then [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) sections 1–3 and the assigned lane |
| whether the shifted-Mobius source keeps its moving cutoff and what explicit error tolerance suffices | [moving-cutoff-parity.md](moving-cutoff-parity.md), [validator](moving-cutoff-validation.js); source counterexample, dyadic repair, exact centered discrepancy and OPEN arithmetic estimate |
| whether joint prime-partner/complement completion supplies a new estimate | [joint-correction-source-audit.md](joint-correction-source-audit.md), [validator](joint-correction-validation.js); prior-art matches, short Vaughan reconstruction, selected-branch control and remaining arithmetic |
| what the whole supported coefficient contributes to the harmonic and sieve budgets | [supported-coefficient-dickman.md](supported-coefficient-dickman.md), [validator](supported-coefficient-dickman-validation.js); novelty check, classical Dickman collapse, insufficient separate-sign lower bound and OPEN joint correction |
| whether the proposed positive companion pays the negative family | [paired-factor-budget.md](paired-factor-budget.md), [validator](paired-factor-budget-validation.js); aggregate Pan--Ding input and complete two-family budget |
| whether paying only negative mass can close the current consumer, and what switching supplies | [switching-negative-mass.md](switching-negative-mass.md), [validator](switching-negative-mass-validation.js); actual negative-mass lower bound, prime exclusion, matched classical inputs and required net comparison |
| what nearby sieve literature already supplies and which factor configurations remain | [smooth-sieve-literature.md](smooth-sieve-literature.md), [validator](smooth-sieve-literature-validation.js); source matches, profile constant, paid shifted small-prime tail and remaining signed factor estimate |
| whether all absolute global contributions can be paid at scale x | [global-smooth-majorant.md](global-smooth-majorant.md); a C3 admissible profile, three-prime majorant and corrected Henriot upper theorem give full absolute O(x); the signed constant remains open |
| what causes negative products of the full global coefficients, and what the first bound attempt established | [global-factor-signs.md](global-factor-signs.md); complete small-prime subset formula, paid prime-power exceptions, failed pair majorant, and the full signed cofactor target with prime filters |
| whether the wider corpus supports changing the global decomposition before extending the corner | [global-cutoff-averaging.md](global-cutoff-averaging.md); averaged complete identities, uniform cutoff ranges, full coefficient norms and same-input cancellation; shifted lower margin open |
| how far a direct signed attempt gets beyond prime cofactors s=t=1 | [cofactor-progression-transfer.md](cofactor-progression-transfer.md); modified Euler factors on CRT progressions, a growing restricted cofactor estimate, exact mixed tails and the failed full extension |
| what was assigned in the completed transition round | [TRANSITION-RESEARCH-EXECUTION.md](TRANSITION-RESEARCH-EXECUTION.md); executed 2026-09-06, with review links; not the current execution queue |
| what the executed transition round established and what changed | [transition-round-review.md](transition-round-review.md); reconciled dispositions, dependencies and combined budget; no signed improvement |
| which returned conclusions survived direct review | [transition-round-audit.md](transition-round-audit.md); support, Mellin, fiber geometry, normalization and closure corrections with targeted controls |
| whether the sharp energy chain survives an adversarial review | [transition-energy-review.md](transition-energy-review.md); core energy chain survives; cross-prime scope and constant extraction corrected |
| whether a primary-source theorem estimates the signed transition kernel | [transition-source-match.md](transition-source-match.md); scoped failed direct applications; full representation remains unpriced; two exact identities |
| whether the mixed and smoothed pieces can be grouped with the transition pair | [transition-joint-budget.md](transition-joint-budget.md); decomposition exact; specific norm procedure saturated; signed joint estimates remain open |
| what the signed transition kernel is and what input it needs | [transition-signed-estimate.md](transition-signed-estimate.md); fiber form over pairs of linear forms; budgets 2B*eta*x*log^2 x and 4*eta^4*x*log^4 x; cutoff-difference identity; Input M OPEN |
| what survives review of the completed agent round and what changes the next research brief | [round-review-0906.md](round-review-0906.md), [AGENT-START.md](AGENT-START.md); dyadic-average consequence, coefficient obligations, diagnostic and scope corrections |
| what a cross-look at the arithmetic, fold/anchor work and proposed papers recovers | [cross-campaign-synthesis.md](cross-campaign-synthesis.md); source/proof interfaces, proposal corrections, common-scale bookkeeping and bounded next estimates |
| whether full corner coefficients can be grouped before their branches are bounded | [corner-coefficient-energy.md](corner-coefficient-energy.md); sharp energy formula, Graham-based smoothed O_eta(x log x) bound and small-prime cutoff difference; sharp signed transition and global saving OPEN |
| what the complete sharp energy and smoothing error actually cost | [sharp-corner-transition.md](sharp-corner-transition.md); sharp O_eta(x log^2 x) norms; for sufficiently small fixed eta, sharp and transition norms have that squared order; signed correlations OPEN |
| what survived the handoff review and what is ready for the next round | [handoff-review-0906.md](handoff-review-0906.md), [AGENT-START.md](AGENT-START.md); completed local audit and current research specification |
| how should an incoming agent assess the active campaign, take a bounded assignment and report its result | [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md); current proof status, exact remaining object, sufficient global margin, next local target, dependencies and reporting contract |
| what is the target, and what is its exact logical status | [ZONE-POSTULATE.md](ZONE-POSTULATE.md) §§1-2, then §3 |
| what is the state of G₂, the central object | [G2-STATE.md](G2-STATE.md) §0, then the section its §10 table names |
| what is the state of Z₂, the zone gap, the programme's stated goal | [history/staging/z2-state-draft-0829.md](history/staging/z2-state-draft-0829.md) §0 and §4b (a HELD draft; promotion open), then [ZONE-POSTULATE.md](ZONE-POSTULATE.md) for the postulate it serves |
| why is the tile the right object at all | [THE-LENS.md](THE-LENS.md), whole |
| which variable should I push | [THE-DIALS.md](THE-DIALS.md) §3 (the summary table), then §4, then the one dial |
| how does the long-interval Chen benchmark work | [chen-fold-benchmark.md](chen-fold-benchmark.md), then [chen-benchmark-validation.js](chen-benchmark-validation.js) for finite checks |
| what extra estimate would suffice for twins after that benchmark | [chen-signed-target.md](chen-signed-target.md); its signed estimate is OPEN |
| where does the next proof opportunity lie, and what does the fixed weight cost | [chen-opportunity-audit.md](chen-opportunity-audit.md); identities established, proposed mechanism OPEN |
| which arithmetic inputs are justified, and what precise missing estimate would force a positive count | [prime-detection-spec.md](prime-detection-spec.md), then [prime-detection-validation.js](prime-detection-validation.js) for exact finite algebra checks |
| does the first joint fold estimate close that bound | [bilinear-fold-attack.md](bilinear-fold-attack.md); no saving, fixed-fold covariance calculated, growing-depth estimate OPEN |
| how far can joint local folds be controlled, and does that transfer to actual primes | [polylog-fold-transfer.md](polylog-fold-transfer.md); local and comparison terms controlled, signed reconstruction OPEN |
| what can be estimated after expanding the shifted prime itself | [shifted-prime-decomposition.md](shifted-prime-decomposition.md), then [shifted-prime-validation.js](shifted-prime-validation.js); second Type I pieces controlled, coupled Möbius estimate OPEN |
| can the one-point fibers be discarded or bounded separately | [singleton-fiber-audit.md](singleton-fiber-audit.md); each sign's ungrouped mass is at least c*x*log(x) eventually, while the signed difference remains OPEN |
| do old runs contain inputs for the current weighted remainder | [data-reuse-audit.md](data-reuse-audit.md), [validator](singleton-fiber-validation.js), [retained factors](data-reuse/factor-windows.json); archived inputs actually reused, prefix measurements distinguished from whole intervals |
| does preserving signs across fibers give an actual estimate | [signed-divisor-grouping.md](signed-divisor-grouping.md), [validator](signed-divisor-validation.js), [signed blocks](data-reuse/signed-grouping.json); de≤x^(7/10) controlled, complementary endpoint discrepancy OPEN |
| how small can the sufficient endpoint margin be, and what do prior theorem failures exclude | [endpoint-target-audit.md](endpoint-target-audit.md); quantitative errors permit a margin c*x/log^K x; this input remains OPEN, and earlier uniform-gap comparisons do not settle it |
| does a complete Fourier estimate control any further region | [endpoint-fourier.md](endpoint-fourier.md), [validator](endpoint-fourier-validation.js), [retained checks](data-reuse/endpoint-fourier.json); aggregating coefficients permits an additional rectangle at d~x^0.27, e~x^0.46, with the full tail and parity branches included; the complement remains OPEN |
| does the coefficient structure supply a further saving | [coefficient-structure.md](coefficient-structure.md), [validator](coefficient-structure-validation.js); sparse exceptions are removable on a further rectangle, leaving one OPEN squarefree endpoint correlation; its individual norms have no uniform fixed-power saving |
| are the lowest Fourier frequencies the remaining obstruction | [endpoint-pairing.md](endpoint-pairing.md), [validator](endpoint-pairing-validation.js); pairing endpoints controls another full rectangle at d~x^0.275, e~x^0.465 and moves the larger pilot's deficit to its transition frequencies; the full majorant remains necessary |
| can prime-modulus completion directly supply the missing saving | [prime-band-completion.md](prime-band-completion.md), [validator](prime-band-completion-validation.js); narrows the prime and harmonic bands, completes exactly, and shows why coupled coefficients and the full dual range prevent a direct general operator estimate; the dispersion follow-up supplies a different bound |
| does a second moment retain enough prime averaging to control the pilot | [prime-dispersion.md](prime-dispersion.md), [validator](prime-dispersion-validation.js); regrouping m=dp before Cauchy gives a long interval, and classical composite-modulus bounds control the full d~x^0.277, e~x^0.467 rectangle; the global remainder remains OPEN |
| how far can the dispersion estimate extend across divisor sizes | [dispersion-range.md](dispersion-range.md), [validator](dispersion-range-validation.js); reverses the prime average and averages gcd losses, controlling a region that includes product scale x^0.804 on a specified rectangle; the limiting sparse and cross-prime budgets remain explicit |
| does opposite dispersion control the sparse sector when harmonics exceed its primes | [sparse-dispersion.md](sparse-dispersion.md), [validator](sparse-dispersion-validation.js); pairs endpoints inside the moment and counts frequency collisions, controlling a full rectangle at product scale x^0.816; BB and the explicit signed cross-prime upper target remain at the boundary |
| does BB's repeated-prime structure improve the norm-only estimate | [prime-power-dispersion.md](prime-power-dispersion.md), [validator](prime-power-dispersion-validation.js); separates a smaller-norm exception and controls the odd prime-power core with all harmonics, including the first-power case; a two-inequality region reaches a full rectangle at product scale x^0.859 |
| what is controlled across the full residual, and which term limits the next move | [residual-coverage.md](residual-coverage.md), [validator](residual-coverage-validation.js); the first-branch and prime-free moments yield a uniform product range below x^0.76 plus an exact monomial region; the explicit complement remains OPEN, with the right zero term and left cross term limiting different edges |
| which known mathematical structures fit the current signed remainder | [structural-literature-audit.md](structural-literature-audit.md), [validator](structural-literature-validation.js); primary-source theorem matches and failed imports, exact gcd/lcm kernel and collision count; the full-moment test is consumed in the next note |
| whether the full grouped moment holds and what remains after applying it | [grouped-divisor-moment.md](grouped-divisor-moment.md), [validator](grouped-divisor-validation.js); the classical-input bound controls the full d~e~x^0.4 benchmark and an exact extra cut; E_dagger and a localized small-common-divisor target remain OPEN |
| does the remaining small-common-divisor kernel separate, and do the Kloosterman-fraction interfaces then close it | [small-divisor-kernel.md](small-divisor-kernel.md), [validator](small-divisor-kernel-validation.js); reciprocity splits the kernel exactly into a trilinear Kloosterman fraction; Bettin-Chandee gives 129/125 against a required 1, DFI 1267/1200; the deficit is present at common divisor 1; nothing is added to the controlled region |
| has the reduction chain S(x) to E_dagger been independently reviewed, and where does it remain unreviewed | [chain-review-0906.md](chain-review-0906.md); three adversarial passes, no defect recorded in the six classical contributions or the grouped moment, the E_> to E_* link and the block-shape derivation listed as the remaining unreviewed dependencies, one citation needs a published source |
| what exactly remains on the corner where both cofactors are primes just above their cutoffs | [corner-correlation.md](corner-correlation.md), [validator](corner-correlation-validation.js); the corner is a weighted two-point Mobius correlation at the fixed shift 2, the dilation average is divisor structure and not a shift average, Bettin-Chandee Corollary 1 and Guria's prime-averaged mechanism fail there by explicit amounts; both the absolute and one-sided corner targets are OPEN and the one-sided form is, given the complement, the twin lower bound itself |
| can the left divisor's Mobius structure replace the first Cauchy inequality | [left-divisor-signs.md](left-divisor-signs.md), [validator](left-divisor-signs-validation.js); Type I and Type II lemmas remove the zero-frequency budget only on smooth pieces, confine the target-box deficit to right prime powers above x^(3/100) and lower its worst block exponent from 103/100 to 41/40; the corner is untouched by every priced route; no region added |
| which part of the remainder can no kernel improvement reach, and what would a uniform saving buy | [reachability-coverage.md](reachability-coverage.md), [validator](reachability-validation.js); inside the grouped-moment shape the corner d>x^(19/25-2eta), e>x^(19/20-2eta) is unreachable for every kernel saving, a uniform saving of 2 (33 times the current 3/50 target) is needed to reduce the leftover to that corner, and the corner carries absolute term mass of order x per top dyadic box; budget bookkeeping, no new estimate |
| does Bettin-Chandee's determinant-equation corollary, applied directly to dk-et=2, control anything new | [determinant-corollary.md](determinant-corollary.md), [validator](determinant-corollary-validation.js); the smoothness hypothesis is removable by moving the prime-power part of beta onto the coefficient side, the main term matches the subtracted density, and the priced error term adds exactly zero area: its all-pieces region lies inside delta+nu<2869/3900, and an r-size split equals the current region |
| do the actual Mobius signs measurably help the kernel moment against random signs | [kernel-sign-control.md](kernel-sign-control.md), [script](kernel-sign-control.js); MEASURED at x<=2^30 on the (8/25,9/20) box: no advantage over random signs in any of four families, slopes within one sd of zero, in a regime where the R=0 class carries about all of the moment and the kernel is invisible; a failure to detect, not a refutation |
| where does the Mobius Bombieri-Vinogradov input come from, since no published theorem statement was located in the owning convention of SEARCH-CONVENTIONS.md §1 (Mobius function in arithmetic progressions, Bombieri-Vinogradov) | [mobius-bv-derivation.md](mobius-bv-derivation.md), [validator](mobius-bv-validation.js); derived from four numbered results of Koukoulopoulos GSM 203 plus Vaughan's identity for mu, with the maximum over y<=T inside and level Q<=T^(1/2)/(log T)^(A+6); assembled from published theorems, not itself refereed |
| how does our sufficient consumer compare with the published conditional routes to twins | [consumer-comparison.md](consumer-comparison.md); Murty-Vatwani reduces to BV plus one hypothesis EH_{mu_2}(x^(1/2+eps)); the dyadic dictionary to Tao's delta_x and a strictly weaker block-summed consumer; every integer-side conditional route needs equidistribution in progressions, not a bound; the corner shape has prior art in Tao's 2016 GEH statement and Maynard's ICM 2022 Question 17 |
| how large is the corner correlation at finite x against its mass and a random-sign control | [corner-measurement.md](corner-measurement.md), [script](corner-measurement.js); MEASURED at x<=2^36 over 1.3e9 integers: |K|/mass falls no faster than the random-sign null in all four variants (largest deviation 1.4 s.e.), K never below -C_2 x, and the actual right prime band holds at most one prime at every reachable x, so this class of measurement cannot inform the asymptotic corner; a negative, methodological result |
| **the whole arithmetic campaign in one document** | [TWIN-REDUCTION.md](TWIN-REDUCTION.md); the reviewed reduction, the three sufficient margins, the controlled region, the ceiling of the moment shape, the corner identification with prior art, every priced interface and measurement, and where each claim lives |
| can weighted correlation theorems handle the prime-cofactor subfamily | [corner-log-average.md](corner-log-average.md), [prime-band-transfer.md](prime-band-transfer.md), [round-review-0906.md](round-review-0906.md); continuous and weaker dyadic scale averages, no every-dyadic estimate, o(x) or full-corner margin |
| does the multiplicative band transfer follow at its reviewed scope | [next-transfer-review.md](next-transfer-review.md), [round-review-0906.md](round-review-0906.md), [validator](next-transfer-review-validation.js); the source condition (3.2) is scoped to case (i); the coordinating review adds the weaker dyadic-average consequence and retains the open full margin |
| can experiments enumerate the full coefficients C(n), C'(n-2) branch by branch without dropping cofactors, proper powers or non-squarefree inputs | [corner-branch-diagnostic.md](corner-branch-diagnostic.md), [driver](corner-branch-diagnostic.js); exact two-construction identity, 3-by-3 (P,S,Q) matrix and active controls; the integer-parity split is not a per-term CRT gcd partition; the fixed-eta corner is empty on the retained prefix, so its embedded matrix is a proxy window |
| is there a primary-source correlation statement with stronger scale or coefficient quantifiers than the transfer used | [next-correlation-source-map.md](next-correlation-source-map.md); scoped negative for three statements read at source; Guo 2608.23500 gives every-scale Liouville at shift 2 in logarithmic normalization only; the three requirements a closing import would need are listed |
| can another Cauchy arrangement control the remaining region | [signed-moment.md](signed-moment.md), [readiness review C](history/reviews-0906/21-readiness-review.md); harmonic and joint arrangements priced, no added region, heuristic ceilings remain heuristic |
| is the unreachable corner an artefact of the two-cutoff Vaughan identity | [heath-brown-edges.md](heath-brown-edges.md), [validator](heath-brown-edges-validation.js); under Heath-Brown at every K the supremum of a is 1, attained where all K Mobius variables are balanced at x^(1/K) with a bounded cofactor, because the moment's phase is the CRT count with both cofactors summed unweighted; the edge relocates, it does not disappear; Linnik and Vaughan-for-mu likewise; the second Vaughan decomposition traded a Question 17 bilinear hypothesis for a statement equivalent to the target; the cutoff 6/25 sits below the best two-cutoff value 1/4 |
| **how to review current work independently** | [RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md), lane V; [research-round-validation.md](research-round-validation.md) owns the 09-09 integration; [review-request-0907.md](review-request-0907.md) records the completed prior-session review and remaining source limits; [REVIEW-REQUEST.md](REVIEW-REQUEST.md) retains the completed 09-06 round's checklist |
| what should I work on next | [../TODO.md](../TODO.md), the priority board and the chosen item; [RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md) supplies the current board and candidate obligations |
| what has this approach established or failed to establish, and when can it be reused or revisited | [OUTCOMES.md](OUTCOMES.md), then the owning derivation and validation record; grades, limits and revisit conditions are explicit |
| **has this question been attacked before** | [QUESTIONS.md](QUESTIONS.md) §1, by TODO item, then grep the object; generated from the notes' own `<!-- ledger -->` blocks, so it cannot drift from them. Read the listed notes before briefing anything |
| what is the earlier u-frame reduction, and where did it stop | [U-FRAME.md](U-FRAME.md) §§1-3 (the frame), §5a Step 3 (the bound), then §10 and [kappa-not-L.md](kappa-not-L.md) for the L question, which is the gap |
| what is proven, and what is Holt's | [PRIOR-ART.md](PRIOR-ART.md), then [G2-STATE.md](G2-STATE.md) §8 |
| **before searching the literature at all** | [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md) — our words are never the words the literature uses, and a calibrated search in the wrong convention is a clean negative every time |
| what is closed, and what would justify revisiting it | [OUTCOMES.md §Closed routes](OUTCOMES.md#closed-routes), then the decisive argument and its stated scope; [ATTACKS.md](ATTACKS.md)/[ATTACKS2.md](ATTACKS2.md)/[ATTACKS3.md](ATTACKS3.md) retain the dated wave tables |
| is there a paper behind this, and what is its grade | [../paper/proposals/PROPOSALS.md](../paper/proposals/PROPOSALS.md), the queue; [../paper/PAPERS.md](../paper/PAPERS.md) for the suite architecture |
| what does this word mean | [GLOSSARY.md](GLOSSARY.md), the entry only |
| the exponent, and why a raw fit cannot be trusted here | [exponent-control.md](exponent-control.md), then [G2-STATE.md](G2-STATE.md) §3b |
| the anchored side: β, the calm, the X-channel | [../paper/anchored-note.md](../paper/anchored-note.md), then [anchored-calm.md](anchored-calm.md) for what is and is not proven, then GLOSSARY §"The anchored layer" |
| where a fold's damage lands, and what survives | [FOLD-PROFILE.md](FOLD-PROFILE.md) |
| how do I reproduce a number | [G2-STATE.md](G2-STATE.md) §10's command block, or the owning file's Reproduction section |
| which script produced this | [SCRIPTS.md](SCRIPTS.md), generated from the script headers |
| which consistency checks can I run | [qc/README.md](qc/README.md); `node research/qc.js --list` lists the current checks, and `--full` runs the complete gate; neither constitutes an analytic proof review |
| **how do I put a run's output into a script** | **`node research/qc/embed.js research/<file>.js` — NEVER by hand.** It runs the file, writes the OUTPUT block itself and stamps `code-sha256` over the code, `out-sha256` over the normalised output, and the exact invocation. `--check` verifies both. `--streams both` when the script writes progress to stderr; `--env`/`--node-flag` when it needs an environment. It refuses to overwrite a legacy tail whose figures a fresh run cannot reproduce |
| why the embed exists, and what it does not cover | [qc/README.md](qc/README.md) §"The formal embed": a script here was found carrying an OUTPUT block and eight readings written **before it had ever been executed**, code correct throughout. The embed proves the output came from the code; it says nothing about whether the code is right, which is `audit-numbers.js`'s job |
| does a script's pasted output still reproduce | `node research/qc/tails.js` — slow, outside the fast gate, re-runs each script and compares |
| the history of a specific claim | [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document — and nothing else in `history/` |

## The files, and which are live

These are navigation classes, not mathematical grades or dispatch decisions.
**LIVE** points to a working topic; **SPENT** to the record of a completed
attempt. Either may contain reusable lemmas and open questions. Consult
QUESTIONS, OUTCOMES and TODO before choosing work. **ORIENT** / **REG**
denote frames and registers; **SUB** denotes a draft under the moratorium,
not publication readiness.

| file | what it is FOR | class |
|---|---|---|
| [G2-STATE.md](G2-STATE.md) | the central object's consolidated state, every claim calibrated and sourced | ORIENT |
| [ZONE-POSTULATE.md](ZONE-POSTULATE.md) | the target: statement, the weak⟺TPC biconditional, the 1e11 verification, four routes | ORIENT |
| [history/staging/z2-state-draft-0829.md](history/staging/z2-state-draft-0829.md) | Z₂, the zone gap: definitions, proven, measured, the TPC-strength line and the legal open set (HELD draft, red-teamed; promotion to a live Z2-STATE.md is open) | LIVE (draft) |
| [THE-LENS.md](THE-LENS.md) | why the tile is the right object: completeness, exact recursion, the triage rule | ORIENT |
| [THE-DIALS.md](THE-DIALS.md) | every variable this programme can push, and the one that only looks like a dial | ORIENT |
| [GLOSSARY.md](GLOSSARY.md) | the adopted vocabulary, one term per object, canonical aliases attached | ORIENT |
| [PRIOR-ART.md](PRIOR-ART.md) | the novelty audit: every claim as classical / obscure / possibly novel, with sources, held to the standard of SEARCH-CONVENTIONS.md | REG |
| [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md) | how to search: the owning convention per object, the moves that work, what is already settled, what is still open | REG |
| [IMPORT-MAP.md](IMPORT-MAP.md) | the graded map of candidate mathematics imports: structural fit, circularity pre-check, payoff type, and the five landed imports as the calibration set | REG |
| [U-FRAME.md](U-FRAME.md) | the earlier sufficient u-frame reduction and its remaining estimate | LIVE |
| [kappa-not-L.md](kappa-not-L.md) | U-FRAME §10 in full: the qualifying gaps in closed form, the Alternation Lemma, why L is not the target | LIVE |
| [operator-and-pair-count.md](operator-and-pair-count.md) | U-FRAME §11 in full: the histogram transfer operator and the exact pair count (both PRIOR ART, Holt and Rudd 2014) | LIVE |
| [f-decays.md](f-decays.md) | U-FRAME §12 in full: f on 42 exact points, the singular-series comb, the twin-pair staircase | LIVE — carrying a 2026-08-19 DEFECT banner: every census point from x = 37 up was aliased and must be read against `fdecay-deep-01-census-defect.js` |
| [FOLD-PROFILE.md](FOLD-PROFILE.md) | where a fold's damage lands: the Level and Mirror Ledgers, the natal cohort, survival | LIVE |
| [OUTCOMES.md](OUTCOMES.md) | research outcomes by question: established results, unsuccessful attempts, scoped closures, evidence and reuse or revisit conditions | REG |
| [theta-ladder.md](theta-ladder.md) | the θ ladder: the conditional column rises; self-consistent exact suprema sit inside the budget to z = 31 and cross in (31, 47]; the route is retired via the sharp maximal law | SPENT |
| [two-class-lower-bounds.md](two-class-lower-bounds.md) | the adversary's side: how large can G₂ be forced? The certified ladder, the Poisson law | LIVE |
| [maxgap-law.md](maxgap-law.md) | c is a surface, not a constant; plus which repo extrapolations inherited the old error | LIVE |
| [gate-multiplies.md](gate-multiplies.md) | does the no-fixed-point argument close the u-frame branch? No; and the Overshoot Budget | LIVE |
| [sift-limit-attack.md](sift-limit-attack.md) | where the dimension-2 sieve discards our structure; the road from 4.2665 toward 2 | LIVE |
| [level-ledger-tight.md](level-ledger-tight.md) | can the Level Ledger exponent be tightened? R\*(y) by exhaustion; it does not move | LIVE |
| [bv-import-survey.md](bv-import-survey.md) | which open legs become theorems under BV / EH / GRH, and which stay inert | LIVE |
| [discrepancy-two-class.md](discrepancy-two-class.md) | the two-class signed discrepancy, its ×3 ceiling, the Level Ledger's true looseness | LIVE |
| [exponent-control.md](exponent-control.md) | the exponent measured against a control whose answer is known: the estimator is biased | LIVE |
| [a3-09-histogram-operator.md](a3-09-histogram-operator.md) | the gap-histogram fold rule as an exact transfer operator (= Holt and Rudd 2014) | LIVE |
| [anchored-calm.md](anchored-calm.md) | the anchored calm decomposed: which sub-claims are proven, certified, open, refuted | REG |
| [certificate-engine.md](certificate-engine.md) | what natal-cap-28 actually assembled, and at what calibration: nine objects, five calibrations | REG |
| [d2-d4-bijection.md](d2-d4-bijection.md) | first proof of Labos's 2001 A059861 remark, #d=2 = #d=4, by explicit bijection | LIVE |
| [origin-excess.md](origin-excess.md) | can the Origin Excess Lemma reach S = x′²? No, and the scale collision is structural | SPENT |
| [maier-matrix.md](maier-matrix.md) | Maier's matrix on the twin-slot set: complete classification, and it yields nothing | SPENT |
| [a3-05-bound-L.md](a3-05-bound-L.md) | A5: the first unconditional bound on L, and the wall it cannot pass | SPENT |
| [localized-04-maxsum.md](localized-04-maxsum.md) | the maxsum growth law, the Deficit Lemma, the Traverse Bound | SPENT |
| [h2-scoping.md](h2-scoping.md) | pricing an extension of A288815: infeasible and non-diagnostic | SPENT |
| [dhr-verification.md](dhr-verification.md) | verifies beta2-note's Diamond-Halberstam citations against primary sources | SPENT |
| [LOCALIZED-GAP.md](LOCALIZED-GAP.md) | the Localized Merge Lemma, and why the localized chain does not close | SPENT |
| [localized-single-alignment.md](localized-single-alignment.md) | the single-alignment recursion for M(x, x³); route closed | SPENT |
| [covering-dive.md](covering-dive.md) | literature dive on Jacobsthal and covering systems; source of the PROVEN/CONJ/ABSENT legend, whose ABSENT tag is held to SEARCH-CONVENTIONS.md | SPENT |
| [a3-03-f-from-census.md](a3-03-f-from-census.md) | A3: two lemmas pinning f from the grain census law, and where the law stops | SPENT |
| [anchored-windows.md](anchored-windows.md) | formalizes anchored-versus-random windows; superseded by `paper/anchored-note.md` | SPENT |
| [two-moire-argument.md](two-moire-argument.md) | Chris's two-moiré formulation of TPC, adjudicated assertion by assertion | SPENT |
| `natal-cap-NN-*.md` (twelve) | one natal-cap attack apiece; the campaign scoreboard is [NATAL-CAP-CAMPAIGN.md](NATAL-CAP-CAMPAIGN.md) | SPENT |
| [ATTACKS.md](ATTACKS.md), [ATTACKS2.md](ATTACKS2.md), [ATTACKS3.md](ATTACKS3.md) | the three attack waves' scoreboards, one row per attack with its landed verdict | REG |
| [OBSERVATIONS.md](OBSERVATIONS.md) | bench sightings recorded before they are chased, each triaged residue or interval | REG |
| [SCRIPTS.md](SCRIPTS.md) | generated index of every script; also lists the ones carrying correction banners | REG |
| [oeis-G2-submission.md](oeis-G2-submission.md) | retired new-sequence submission; its owning record identifies the duplication and remaining material | SPENT |
| [oeis-seam-submission.md](oeis-seam-submission.md) | draft with source/cross-reference review still required; held under the moratorium | SUB |

**Naming convention**, so a filename is readable: ALL-CAPS is a standing frame or
a campaign head; lowercase-with-NN is the prose companion to the script of the
same stem; lowercase without NN is a standalone topic note. Three family heads
wear topic-note names for historical reasons and are not being renamed:
`gate-multiplies.md`, `h2-scoping.md`, `theta-ladder.md`.

## How this directory is organised (Chris's rule, 2026-08-17)

**The working documents state current understanding and nothing else.** No
correction blocks, no "this first read", no superseded numbers left in place
with a note beside them. If a claim changes, the document is edited to say the
new thing, in the present tense, as though it had always said it. A claim whose
current status is REFUTED or CLOSED is current understanding and stays, stated
plainly.

**Git records revisions and authorship.** Keep established results, failed
steps and their evidence together in [OUTCOMES.md](OUTCOMES.md), organized by
research question. Update current conclusions in place when they change.
The existing notes in `history/` retain derivations and annotations cited by
the research record; read them when following evidence for a specific claim.

The reason is context, not tidiness. Correction blocks accumulated to the point
where the record of how we learned something crowded out the thing we learned,
and every reader paid that cost on every pass.

**Vocabulary drift, and how to read around it.** The vocabulary (tile, fold,
seam, stratum, zone, frontier, family) was adopted 2026-08-14 and the anchored
layer 2026-08-15; the adoption dates are in [GLOSSARY.md](GLOSSARY.md) for
exactly this reason. Files written earlier use the older words, and their
readings stand.

## The first six measurements, and the scripts behind them

The one index of the pre-shorthand scripts. Later scripts are indexed in
[SCRIPTS.md](SCRIPTS.md) and cited by shorthand (`natal-cap-30`, `fold-profile-09`,
`attack-06`, `a3-05`) throughout the corpus.

| script | file | question to look up |
|---|---|---|
| 01 | [01-zone-twin-share.js](01-zone-twin-share.js) | How does the zone's observed share compare with the model? |
| 02 | [02-first-twin-margin.js](02-first-twin-margin.js) | What first-twin margins were measured at the sampled levels? |
| 03 | [03-legendre-error-budget.js](03-legendre-error-budget.js) | How do the exact Legendre count and its certified error compare? |
| 04 | [04-crystallization-and-hl.js](04-crystallization-and-hl.js) | What do the finite crystallization and Hardy–Littlewood comparisons test? |
| 05, 05b | [05-twin-jacobsthal.js](05-twin-jacobsthal.js), [05b-twin-jacobsthal-segmented.js](05b-twin-jacobsthal-segmented.js) | Which finite G2 levels and controls were computed? |
| 06 | [06-variance-theorem.js](06-variance-theorem.js) | What is the finite variance calculation? |

This is a lookup table, not an independent result summary. Use
[G2-STATE.md](G2-STATE.md) and the relevant OUTCOMES/QUESTIONS entry
for current calibration, corrections and the distinction between finite
measurements and asymptotic claims.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
