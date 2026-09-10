# Changelog: what changed in the body of work, and why

> Public mirror edition: repository-internal working instructions were removed. See MIRROR.md.

*(Opened 2026-08-17. Chris's rule: the working documents state current
understanding and nothing else. Every correction, supersession and retired
claim lives here. This file is process, not result. Do not load it unless you
need the history of a specific claim.)*

**How to use it.** Entries are dated, newest first, and grouped by the document
they changed. Each names the claim as it stood, what replaced it, and the
artifact that forced the change. `research/history/CHRONICLE.md` is the
narrative of what was discovered; this file is the ledger of what was wrong.

---

## 2026-09-09: independent review and integration of the completed dispatch

Incoming commits 07ab47f through 46fa948 were reviewed personally against
the owning proofs and selected primary sources. Twin-prime infinitude and
all sufficient signed margins remain OPEN. No new worker or long census
was started. Current review: [research-round-validation.md](../research-round-validation.md).

- A's truncation survives. The floor in x/e_1 costs a factor 2; the
  weighted error in (3a.13) costs log^(L+3), both absorbed by fixed slack.
- A2's corrected low Type I proof is accepted after reconstructing both
  g-tails, the density, multiplicity and uniform Mobius mean. The weighted
  count costs log^4; the atom proof uses delta=1/100 for the full eps'
  range. The two sufficient consumers are not equivalent; (4.9) is only
  a stronger sufficient input. The elementary size bound is O(x log^5 x),
  replacing an unsupported direct Brun–Titchmarsh claim of O(x log^4 x).
- B's ordinary-BV repair survives. The Dickman error 24/22! was used
  outside its delta=1/100 scope; the uniform replacement 12/11! for
  delta<1/50 preserves the failed separate-sign bound. The consumer now
  includes a concrete complement inequality. A generic uncentered o(x)
  claim for arbitrary positive coefficients is removed.
- C's growing norm obstruction survives on all smooth inputs. The
  zero-only unit-disc claim was false: low nonzero Fourier modes qualify
  for every Mellin twist. The filtered correlation rate remains open.
- D's Lemma H, (D1) and fourth residual condition survive the completion,
  upstream coefficient and Perron/density checks. Its next moment target
  was miscomputed: exponent 57/40 must fall below 139/100, so the saving
  is greater than 7/200 and the large-gcd threshold is 7/300 with slack,
  replacing 59/40, 17/200 and 17/300. The box remains uncontrolled.
- E's constant 4 is aggregate over factor tuples, not uniform per tuple.
  The cardinality bound retains its additive error at zero-density
  boundaries. Directed BigInt rational logarithm bounds now certify the
  five all-depth pieces; the older floating calculation remains measured.
  Wu's page 6 was re-read visually; the coefficient-uniform reading and
  unread original Pan–Ding proof remain explicit. W's original 1974 page
  remains OCR-only; the thirteen reported access attempts were not repeated.
- Owning notes, outcomes, handoff, entry documents and priorities now agree.
  Completed dispatch instructions were replaced by a closeout and bounded
  next obligations, with original assignments preserved in Git. The vanished
  B-question transfer adjudication was checked on both sides and retired
  with its original reason intact; no hypothesis was dropped.

Validation: all six lane validators and the integration validator reproduce
their embedded outputs. The integration validator adds exact exponent,
consumer, local-density, low-mode and constant controls, plus E's rational
certificate. Re-embedding the integration and E validators preserved every
previous numerical figure (forced output-label additions, zero lost figures).
The two retained 2^38 data inputs were read and hash-checked, not regenerated.
QC self-tests pass: 58 known positives fire and 47 controls stay silent.
Strict QC with regenerated indexes passes all 14 checks with zero findings.
The numerical audit passes 251/251 checks in 164.2 seconds; this is routine
validation, including its recorded small-cycle recomputations, not a new
2^38 research census. git diff --check passes. Existing advisory backlogs
remain distinct from these gates; no claim of a fully certified corpus follows.

## 2026-09-08 (second dispatch): lane A's held top-range bound is derived and reviewed

Dispatch from 1285d47 with three workers; the handler reviews. B/D
return recovery failed (first-dispatch workers stopped by a session limit
during reading; board section 2 records where the lookup went).

- [centered-discrepancy-estimate.md](../centered-discrepancy-estimate.md)
  gains section 3a: T^top=O_(A,eps)(x/log^A x) with the three review
  defects discharged (inclusive endpoint, odd b after removing powers of
  two, the (p-1)/p local factor with (m',g)=1 inside the weight), a
  uniform Mobius mean proved from the q=1 statements, explicit truncation,
  a Cauchy multiplicity device and prefix-form prime BV derived by rounding
  from Tao Notes 3 Theorem 17. The claim as it stood: HELD. Replaced by:
  accepted at stated scope after the handler's review
  ([research-round-validation.md](../research-round-validation.md) section 7).
  The source row calling Theorem 17 a prefix-maximum statement was wrong at
  source and is corrected; validator section 4 added and re-embedded.
- The handoff's centered alternative now states the equivalent fixed-endpoint
  form; the OPEN sufficient input is unchanged in content.
- [full-coefficient-average.md](../full-coefficient-average.md) gains
  section 6: the weighted sum with the composite filter and log t lift,
  c_0=3/5 exact, the rough pair sum with coefficient one, route (i) priced
  to exact obstructions (filter not multiplicative, rate log^(2-d) above
  trivial, unit disc). The sentences in sections 3 and 5 saying "no
  unbounded sequence was supplied" are superseded by Proposition 6.5,
  which proves norm >= (log x)^(2/5) for 1-bounded representations of F_L
  on all smooth inputs; reviewed by the handler
  ([research-round-validation.md](../research-round-validation.md) section 8).
  Validator extended and re-embedded.
- New [joint-factor-estimate.md](../joint-factor-estimate.md) (lane B,
  first return; the first-dispatch worker left nothing): for the
  single-large-prime rough family, R_F = C2 x H_delta - Z_F^p + o(x) with
  the Type I part evaluated by Pan–Ding and the twisted constant 2C2; the
  complement carries -C2 x H_delta, so factor grouping is a zero-sum
  transfer of Type I mass; family bound certified below -2/5 C2 x
  (insufficient). Reviewed by the handler
  ([research-round-validation.md](../research-round-validation.md) section 9).
- **Halberstam and Richert Theorem 2.2 custody (paper/kk-lower-bound.md
  §11.2, §11.4, §12).** The claim as it stood: the 1974 text UNREACHABLE
  (archive.org access-restricted), statement reached at OCR and two
  same-author secondaries, constant label uncertain between "B" and "B3".
  What replaced it: a second bounded pass over thirteen channels reached no
  page image and no verbatim secondary; the OCR now covers both clauses,
  the footnote B = B(A, A_1, A_2, κ) and the Remark replacing (Ω_2(κ)) by
  (Ω); the label discrepancy is three OCR tokens on one page; the
  substitution discharges every OCR-read hypothesis (A = 1, A_1 = κ + 1,
  A_0 = κ, P = primes ≤ z). Status of Theorem 2.2 in the manuscript changes
  from [MEMORY] to [OCR ONLY]; the page image remains the owed item. No
  number moves; Theorem 2c stays DERIVED, not refereed. Report filed as [reviews-0907/12](reviews-0907/12-halberstam-richert-second-access.md).
- New [structured-dispersion-estimate.md](../structured-dispersion-estimate.md)
  (lane D, first return): block bound (D1) by Cauchy in (m,q) with the
  right prime power outside; Lemma H; target-box worst sector
  41/40 -> 407/400, not controlled; candidate strip delta<71/100,
  delta+3nu<327/200 HELD; E_dagger unchanged. Handler read Lemma H and the
  assembly ([research-round-validation.md](../research-round-validation.md)
  section 10); reader V3 assigned to the reused completion bound.
- [fold-arithmetic-bridge.md](../fold-arithmetic-bridge.md) (lane E,
  second dispatch) revised in place: Wu Lemma 2.2 and 2.3 read at the arXiv
  page (hash matched); BV for k-fold rough products derived (Prop. 3);
  contamination constant corrected from the displayed 12.86–19.72 to 4
  (Prop. 4); the HR Theorem 3.12 mislabel corrected and that theorem
  retired from the pricing; all-depth failure of both ratio tests derived
  (Prop. 5). The closed-route row moves from "conditional numerical failure
  on 16 sampled depths" to "closed at every depth u>4 in union-bound form",
  conditional on the uniformity reading of Lemma 2.3. Handler reading in
  [research-round-validation.md](../research-round-validation.md) section 11.
- Second reader V2 ([reviews-0908/01](reviews-0908/01-second-reader-A-B-C.md)):
  A's section 3a and C's Proposition 6.5 verified on a second independent
  reading (calibration raised to "read twice"); B's Type I evaluation
  found CONDITIONAL because Wu Lemma 2.3 is squarefree-only while the b_R
  moduli are not; the OUTCOMES grade of B was downgraded and the lane applied the
  repair the same day: Type I error paid by ordinary prime BV per
  cofactor interval at all moduli (new (4.2a)-(4.2b)); Pan–Ding retained
  only for the squarefree sieve level; handler and V2 re-read, both verified at scope.
- Reader V3 ([reviews-0908/02](reviews-0908/02-reader-D-structured-dispersion.md)):
  D's Lemma H and (D1) verified at stated scope; the section 6 sentence
  proposing to replace W_dagger's third condition by the candidate cut is
  wrong (the cut is not a superset; witness (73/100,29/100)) and changes
  to adding a fourth condition; the lane then wrote the four-condition
  application (kappa'=141/200, lambda'=1631/1000, lower product cut
  mu'=77/100 because the cross budget is exactly 1 at (31/100,11/25)),
  V3 re-read it as a domain change, and
  [RESEARCH-HANDOFF.md](../RESEARCH-HANDOFF.md) section 3's W_dagger
  display and section 4's region union now carry it. Domain only.
- New [fixed-endpoint-discrepancy.md](../fixed-endpoint-discrepancy.md)
  (lane A, second checkpoint): D^(e_1) split at x^(1/2-eps'), density
  projections evaluated, below-level Type I piece derived O(x/log^A x)
  (handler reading, [research-round-validation.md](../research-round-validation.md)
    section 12), remainder B exhibited with S=C_2x+B+o(x); the lane stops
  at this shape because every identity returns the same family. Later the
  same day reader V4 ([reviews-0908/03](reviews-0908/03-second-reader-E-A2.md))
  found that 4.1 bounds the modulus e[r,g] by e_0UV, false for g>1, so
  the Type I estimate is HELD and the handoff sentence reads
  S=C_2x+T_I^low+B+o(x); the handler's first reading had accepted the
  level line and withdraws it. V4 verified E's Propositions 3–5 on a
  second reading (two wording items applied). The lane applied the
  g-truncation repair the same day; the handler re-read it without
  finding a defect and it stays HELD until a second reading (owed).
  The round was then closed at the user's instruction; closeout record in
  [RESEARCH-EXECUTION.md](../RESEARCH-EXECUTION.md).

## 2026-09-08: integration review narrows the returned claims

Incoming reports and shared edits are preserved in a5e1244. Current
dispositions and regression witnesses:
[research-round-validation.md](../research-round-validation.md) and
[research-round-validation.js](../research-round-validation.js).

- Lane A's exact flip survives. The claimed top-range estimate is HELD:
  a strict endpoint lost an atom, the odd square-divisor restriction was
  omitted, and the reciprocal-totient factor was inverted with a
  coprimality restriction missing from the proposed mean. The handoff
  consumer is unchanged. These errors do not disprove the estimate.
- Lane C's Fourier representation now uses normalized rounded endpoints.
  Its norm is uniform for large x, not literally independent of x.
  The fixed finite binomial lower bound does not exclude all bounded
  representations; the proposed weighted transfer from unweighted
  cancellation is withdrawn.
- Lane E's exact parity identity survives with S=0 and dyadic cube-root
  endpoints stated correctly. Its reported maxima concern 16 sampled
  depths under partly unread inputs, not every u>4. The validator's output
  label is changed to say 'any listed u passes' and formally re-embedded
  with an intentional override; the numerical model is unchanged.
- V's corrected tolerances and the pooled-control qualification are retained;
  unsupported significance language and extrapolation to every reachable
  scale are removed. W's source corrections are retained. The r=0 case in
  the CRT representative argument is distinguished from r>=2.
- The execution board marks A/C/E/V/W reviewed and B/D reports not located.
  No report is inferred from a reserved filename. OUTCOMES, TODO and
  generated indexes record these dispositions.

## 2026-09-08: the prepared research round dispatched; two independent reviews applied

**Review of the 2026-09-07 session (research/review-request-0907.md;
history/reviews-0907/10).** Ranked claims 1, 2, 4, 5, 6 verified within stated
scope (claim 1 conditional on the unread 1974 page); claim 3's tolerances
corrected in centered-discrepancy-measurement.md (ledger and §3 item 3) and
OUTCOMES: the identity pins D_y/x to -(T1/x - C2) within 2e-4 for j>=30, not
1e-5 or 1e-4, and S/x - C2 reaches 1.80e-4 at j=32 (recomputed by the
integrator from the JSON). The Corollary 1 representative slip in
kk-lower-bound §11.2 sharpened: every representative other than 1 breaks the
printed encoding, and the sign is wrong even then. Richert Theorem 11.3, its
chapter note and the 1971 Mémoire Theorem 3 read at page image; the Dover OCR
index re-fetched. Cross-codebase M column agreement extended from one j to all
23 shared j (5.4e-12). Tooling: embed.js --check re-runs the recorded
invocation; its two 2^38 census reruns were killed after the static verdict
passed; no artifact changed; header comment added. review-request-0907 ledger
ANSWERED.

**Theorem 2c source review (TODO W; history/reviews-0907/11;
paper/kk-lower-bound.md §6.3, §6.5, §11.4, §12, Appendix A;
paper/two-class-jacobsthal.md §3, §6; paper/proposals/draft-kk-lower-bound.md).**
The claim as it stood: the explicit Mertens error 1/(10 ln²x) + 4/(15 ln³x)
for x ≥ 286 was Rosser and Schoenfeld's Theorem 20 [MEMORY]; the smooth-number
estimate was consumed from memory in "Hildebrand's range". What replaced it:
read at page images, Rosser and Schoenfeld's explicit Mertens bound is Theorem
5 with error 1/(2 ln²x) (x ≥ 286) and the quoted form is Dusart's Theorem 6.10
(x ≥ 10372), no number of Theorem B moving; the smooth-number input is
Hildebrand and Tenenbaum 1993 Theorem 1.2 / Corollary 1.3 with a slack range;
Rosser and Schoenfeld (3.5), (3.6) confirmed for §7. Both [MEMORY] labels
retired, the footnote count falling from five to three. Two stale
cross-references in two-class-jacobsthal.md corrected (six → seven
hypotheses; the §11.1 readings are no longer unrepeated). The prose of
research/attack-kk-substitution.js still names Theorem 20 (not edited, to
keep its embed bound; Appendix A says so). Disposition of Theorem 2c:
verified within stated scope, conditional as before on the unread 1974 page.

**Research round dispatched (research/RESEARCH-EXECUTION.md).** Board marked
DISPATCHED from fda7b55; lanes A–E, V and TODO W and 9 run as parallel
agents with Day 1 and Day 2 merged. Lane results are recorded below as they
are integrated.

**Lane C (research/full-coefficient-average.md,
research/full-coefficient-average-validation.js; new).** Exact scale-free
Fourier superposition of the complete C3 coefficient's smooth-part factor
over multiplicative functions with |g(p)|<=2; identity
X_L+X_R-Y=C_2x+O_A(x/log^A x), equivalent to the reduction; scoped negative
against seven correlation sources; exact obstruction (class, main term,
modulus range, conversion). No estimate or margin.
Q-full-coefficient-average PARTIAL.

**Lane A (research/centered-discrepancy-estimate.md,
research/centered-discrepancy-estimate-validation.js; new).** Derives
D_y = D^(x^(1/2+eps)) + O_A(x/log^A x) by the divisor flip n = em and
ordinary prime BV on the flipped moduli (the moving endpoint lies entirely
in the flipped range); records the band's trivial cost of order
eps x log^2 x and the unfilled hypothesis (H_band); the sufficient input
(16) of moving-cutoff-parity is unchanged. Q-centered-discrepancy-estimate
PARTIAL.

**Lane E (research/fold-arithmetic-bridge.md,
research/fold-arithmetic-bridge-validation.js; new).** Two-sided Liouville
parity identity on the sifted pair set stated and checked exactly; the
covariance and conditional-marginal routes priced negative at every depth
u > 4 with classical sieve inputs; the fold ledger's parity content pinned
above (2X+2)^(1/3). No changed input; no estimate changes. Closed-route row
added. Q-fold-arithmetic-bridge ANSWERED.

## 2026-09-07: source readings correct three records; two finite measurements added

**Erdős #687 attribution (G2-STATE PROVEN list; paper/two-class-jacobsthal.md §3).**
The claim as it stood: the `x ln x/lnlnln x` one-class bound reported on the
Erdős Problems page (edited 2026-08-31) was "credited to a 2026 result, not
read here at source". What replaced it: read at source, the page credits
"GPT 5.6 Pro" and links only to Problem #4's proof-claims thread; the artifact
is an anonymous AI-authored 48-page PDF on GitHub (2026-08-26), not on arXiv,
not refereed, whose covering theorem `Y(X) ≥ c₀ X log X/log₃ X` is the
one-class primorial statement and has been formalised in Lean by a third
party (plby/lean-proofs). It transfers through `G₂ ≥ g` at exactly that
calibration. Report: `research/history/reviews-0907/03`.

**Kalmynin–Konyagin readings (paper/kk-lower-bound.md §11.1).** The two
load-bearing readings R1 (Corollary 1 depends on Ω_p only through g(p)) and
R2 (Ω^II is defined by non-linear irreducible factors, empty for x(x+2)) were
re-read at the arXiv v2 text and CONFIRMED; the polynomial enters only the
proof of Theorem 1, which the manuscript replaces. Report: `reviews-0907/04`.

**§6.2 of paper/kk-lower-bound.md demoted to a remark (§6.1, §6.2, §11.2,
§11.4, §11.5, Appendix A; echoes in research/two-class-lower-bounds.md,
paper/proposals/prop-kk-lower-bound.md, draft-kk-lower-bound.md).** The claim
as it stood (second adversarial pass, 2026-08-19, which had no source PDF):
the sieve step needs a Selberg-form support `ξ = √y/(ln y)^7` because the
remainder `Σ_{d≤ξ²} 3^{ω(d)}|r_d|` is `y(ln y)^{11}` at `ξ = √y`; `κ = 4` is
load-bearing and the margin is one sieve dimension wide. What replaced it:
Richert's own Tata lectures cross-reference Halberstam–Richert Theorem 2.2,
the theorem K–K's Lemma 1 cites, as Theorem 11.3, the Brun-form bound
`S ≪ X ∏(1 − ω(p)/p)` for `z ≤ X^A` under pointwise `|R_d| ≤ ω(d)`, with no
remainder sum and no support parameter; Lemma 1 matches it term for term; the
CRT remainder `|r_d| ≤ g(d)` holds for every `d | P(z)`; the manuscript
already computed at `z = √y` throughout while saying it sieved at `z = ξ`;
and within the Selberg frame any `κ` is served by `C > 3κ/2`. A dependency
review and a red team (`reviews-0907/05`, `06`) agree; the red team added that
Corollary 1's printed proof mis-chooses CRT representatives (proves the bound
for −Ω, same count), a residual on the source shared by Theorems A and B. The
1974 page remains unread; the remaining residual is that page behind a
printed refereed Lemma 1, and it reaches Theorem A equally.

**Two finite measurements (research/centered-discrepancy-measurement.js,
research/shifted-prime-mobius-sums.js).** New scripts with pre-registered
falsifiers, embedded outputs and companion notes; the first run of the
shifted-prime script exposed a wrong constant in both scripts (A2 typed as
0.7364 where 2·Artin = 0.7479116; the note's own certified interval already
excluded the wrong value), fixed and re-embedded before any reading was
written. An adversarial code review (`reviews-0907/02`) found one diagnostic
defect (E_even column) and one vacuous falsifier, fixed before the bound run.
Neither measurement changes the proof status. Readings: the shifted-prime
sums sit at random-sign size to 2^38 (structure falsifier silent); the
D_y census refutes neither sufficient form, and its excess over the
random-sign control is pinned by the exact identity to the finite-x error
of the classical term T1 (D_y/x = -(T1/x - C2) within 1e-4 for j>=30),
so no census can see the parity object; recorded in OUTCOMES, README
Status, RESEARCH-EXECUTION lane A and moving-cutoff-parity §5 as a
do-not-rerun.

**Review trail.** `research/review-request-0907.md` (ledger
Q-review-request-0907, OPEN, TODO Z0) ranks the session's claims by
leverage and lists six ASSUMED-UNVERIFIED items, the first being the 1974
Halberstam–Richert page image (its statement is now reached through the
Dover OCR index at p. 68 and the 1971 Mémoire, both Brun form; report
08). A referee pass on Theorem B (report 09) then found and repaired a
false strict inequality in Proposition 3, Case 1 ((m+2)/(y/2) < 2m/y is
false by 4/y; (5.1) now reads 2(m+2)/y ≤ z_0, moving nothing) and a
self-contradiction in §11.2 that denied Theorem A the residual it shares;
the INFERRED justification for Theorem B was rewritten (it consumes
Corollary 1 at its statement like Theorem A; it sits below A on the
unartifacted smooth-number estimate, the constants-set-to-1 floor and the
absence of a finite exhibition); H7 (z ≪ X) added to the §8 table as slack;
H5's coded constant in `research/attack-kk-substitution.js` changed from
ln 3 to ln 12 (the smooth term's share of the budget) and re-embedded with
the override, no status or y_0 row moving.
The old sentence about the
Dover OCR index at p. 68 and the 1971 Mémoire, both Brun form; report
08); agent reports are verbatim under
`research/history/reviews-0907/`. No reader outside the session has yet
checked the §6.2 demotion.

## 2026-09-06: average the complete identity before isolating the corner

The corpus-wide strategic check in global-cutoff-averaging.md replaces an
automatic extension of the small-cofactor lemma with a bounded global
signed attempt. It averages the initial U,Y cutoffs within uniform BV
ranges, retaining the full remainder and deriving O(x log x) squared
coefficient norms. The existing sharp-corner norm forces same-input
cancellation with the rest of each coefficient. No shift-2 cancellation
or improved signed bound follows; the one-sided twin margin remains open.
The previous corner smoothing and cofactor estimates stay valid at their
stated scope. Entry points, the outcome register and the forward queue now
record this distinction. Exact prime-log controls check the new algebra;
no proposal grade or publication status changes.

## 2026-09-06: growing cofactor progression transfer

`cofactor-progression-transfer.md` extends the earlier s=t=1 signed
scale-average application to a growing polylogarithmic cofactor family,
including nonsquarefree inputs. Modified Euler factors represent the
cofactor quotient on its divisibility progression; retaining the source's
progression density pays for summing this range. The owning note prices
uniformity, moving profiles and dyadic sampling, then records the failed
full extension: power-sized moduli and accumulated logarithmic cost.
Its rate is still weaker than o(x). The exact remaining cofactor term
has both mixed tails; it and E_out remain OPEN. Entry documents and TODO
now direct further work to that remainder or collective cofactor
cancellation, rather than repeating the restricted transfer. The unified
outcome register holds both the derived estimate and its failed extension.

## 2026-09-06: direct review of the transition return

`transition-round-audit.md` reviews return `cb957a1`. The original norm
chain survives. The owning returned notes and current registers correct
a missing transition cut, the rho/tau Mellin confusion, singleton versus
long fiber orientation, unpriced coefficient/source normalization and
overbroad claims excluding joint or cutoff arguments. The local Input M
now has a separate common-scale global consumer. The existing stronger
proper-power support bound replaces the weaker returned estimate. A new
finite validator exercises these specific algebra and inference failures.
No signed saving, region, exact cut or twin margin changes. Superseded
wording is preserved by Git rather than parallel current documents.

## 2026-09-06: transition round executed and integrated

The prepared round in `TRANSITION-RESEARCH-EXECUTION.md` ran with three
parallel workers and the handler's own attempt. Reports:
`transition-energy-review.md`, `transition-source-match.md`,
`transition-joint-budget.md`, `transition-signed-estimate.md`; integration
in `transition-round-review.md`. No region, exact cut or twin margin
changed. The statements "assignments prepared, not executed" in CLAUDE,
README, G2-STATE, AGENT-START, RESEARCH-HANDOFF and the router were
replaced by the executed state.

Baseline notes edited: `sharp-corner-transition.md` §2 gained the DBT
journal line and the refetch record; `corner-coefficient-energy.md` §3.1
names Graham 1978 as the primary integer source and records why the k=Q
constant is absolute; `corner-correlation.md` §0 records that the
inclusion S_0 ⊂ W_dagger holds for eta_0<13/56 through the second
disjunct, so 1/400 is forced elsewhere. No mathematical claim changed.

Closed-route rows added: the moving-sharp-cutoff route followed by Cauchy
(Minkowski), the one-multiplicative-factor fixed-shift relaxation
(counterexample), and three source interfaces at the transition cuts
(scoped). TODO C now lists the five new question ids and points at Input M.

## 2026-09-06: transition research specifications and handler contract

`TRANSITION-RESEARCH-EXECUTION.md` is the unified entry document for the
next handler. Three detailed specifications cover independent energy
review, source matching for the actual transition coefficients, and the
mixed/joint signed budget. The handler retains the central signed attempt
and integration. The mathematical baseline is `0292082`; this work
prepares assignments without executing them or changing a bound.

The contract fixes coefficients, the four signed pieces, the exact outside
residual and the common-scale consumer. It specifies report ownership,
source custody, conditional dependencies, scoped failed-step returns,
the inherited aggregate compute ceiling and final gates. Future report
paths are marked as planned manifests, not references to existing results.
Current entry points and the outcome/question registers link the briefs.
The earlier 3/50 regional moment target is explicitly distinguished from
the present transition target. No worker result or signed saving is
claimed by the completed specification.

## 2026-09-06: sharp coefficient energy and the smoothing transition

`sharp-corner-transition.md` completes the preceding bounded energy
question using the uniform de la Breteche–Dress–Tenenbaum mean-square
input. The full sharp squared norms and absolute shifted-product budget
are O_eta(x log^2 x). For sufficiently small fixed eta, both the sharp
and transition squared norms have that order on the actual dyadic
intervals. The lower bound includes the entire cross-prime budget and
proper-power error; it is not a diagonal-only inference.

The scoped failure is now recorded: an O_eta(x log x) sharp squared norm
or negligible L2 transition is unavailable in that small-fixed-eta range.
There is no shifted-product lower bound, signed o(x), controlled-region
extension or twin margin. The next target is the explicit signed
transition kernel, with mixed terms and the global complement retained.
The source map, outcome register, current-state documents and TODO agree.

`sharp-corner-transition-validation.js` checks exact coefficient vectors,
prime energy matrices, exceptional divisibility and singleton branches,
and the transition kernel. A signed-zero assertion was normalized; an
intentional kernel-check addition required the embed tool's recorded
override, with prior figures reproduced. The new bound output reproduces.
QC has zero findings; its selftest passes all 58 positives and 47 controls;
the numerical audit passes 251/251 checks in 167.5 seconds. Those gates
do not prove the imported analytic theorem or an asymptotic twin claim.

## 2026-09-06: cross-campaign synthesis and proposal reconciliation

`cross-campaign-synthesis.md` compares the arithmetic and fold/anchor
campaigns with both proposed external sources and all eight local proposals.
`corner-coefficient-energy.md` derives a sharp energy quadratic form,
a Graham-based smoothed full-coefficient norm and a small-prime cutoff
difference. These do not change the exact residual or positive twin margin.
The next bounded work is the sharp energy/transition, with all costs stated.

Proposal scoring: every registry grade is held. The x log x proposal's
PROPOSAL header and §2 contradicted its own recorded QUICK-DRAFT decision;
both now agree. The K–K proposal no longer calls itself the only entry at
that grade. Anchored-note Lemma 1 used 1-2/p >= (1-1/p)^2 in an optional
lower-bound argument; that inequality is reversed. The correct convergent
Euler-product factor supplies the lower bound, preserving mean divergence
and leaving anchored positivity open. The Suen proposal omitted corrections
already at the top of import-shearer: H>=x^2 is not exact pairwise CRT
independence, atomicity was unproved, and graph/marginal tightness does not
close every richer arithmetic representation. Its statement is narrowed;
no previously open arithmetic input is newly settled. Registry and proposal
notes are synchronized, with publication still held.

The finite validator checks the new algebra and active deletion controls.
Its first execution stopped on JavaScript's distinction between zero and
negative zero in an exact equality assertion; using mathematical equality
repairs the test without changing the identity. No output was embedded from
the failed run. The completed run is in cross-campaign-validation.js.

## 2026-09-06: completed local preparation for the next agent round

Review 21 completes the bounded upstream/source audit and corrects the
window-support, mass-constant, rate-necessity and identity-piece closures.
It supplies a term-wise Linnik-tail proof and prices joint Cauchy, with
no new region. `prime-band-transfer.md` supplies the exact multiplicative
Fourier lift, source hypotheses, Tonelli and moving-window mesh, yielding
only a small continuous scale-average saving for the prime-cofactor
subfamily. `AGENT-START.md` gives bounded review, implementation and
source-lookup briefs; complex new analytic extensions return locally.
The margin remains OPEN. New finite controls are embedded by the
repository tool; old log-average diagnostics are reinterpreted without
promoting them to asymptotics. Shared state and outcome records are
updated in place. No agents were launched and nothing was published.

## 2026-09-06: independent handoff review and integration

Report `reviews-0906/20-independent-handoff-review.md` checks the grouped
moment and selected coverage dependencies without promoting the whole
upstream chain. `handoff-review-0906.md` records its remaining scope.
Integrated five corrections: the cumulative and dyadic consumers are
equivalent on unbounded scales at fixed K up to constants; the
nonnegative Möbius-product corner form is only a subfamily with exact
cofactor cuts; x-dependent margins require unprovided uniform loss
bounds; signed-moment Lemma A leaves unequal proportional R=0 pairs;
the proper-prime-power tail uses a two-range estimate rather than a
false lower bound on its base. The fixed-margin regions are retained.
Updated the owning notes, canonical summaries, outcome register and
forward plan. No new signed estimate or twin lower bound is claimed.

## 2026-09-06: reviewed the reduction chain, priced the remaining routes, classified the corner

Three waves of agents reviewed the arithmetic campaign of 2026-09-05/06
and priced every remaining move inside the grouped-moment shape. The
reports are preserved verbatim in `history/reviews-0906/`; the live
conclusions are in the owning notes and in `TWIN-REDUCTION.md`.

- Reviewed: the chain S(x) to E_dagger in three links, the interior of
  prime-power-dispersion §§4-5, the singleton-fiber counting, and the
  wave-2 derivation notes. No defect in the chain. Conservative slips
  repaired in reachability-coverage (edge-clearing thresholds 11/10 and
  37/25 were the cheapest single points, not clearing costs; the e-edge
  prime-power class is negligible; limiting versus concrete cut labels;
  the absolute-mass sentence no longer implies a per-sign split),
  corner-correlation (exactly one prime base, not prime power; bijection
  with multiplicity; ledger attribution of the Bettin-Chandee orientations;
  two constants), left-divisor-signs (corner per-block requirement eta'>1,
  not 2; Lemma II hypothesis nu>19/100 on the grid; one boundary point).
- Provenance: the Mobius Bombieri-Vinogradov citation to an EPFL exercise
  sheet is replaced by `mobius-bv-derivation.md` from Koukoulopoulos GSM
  203; no published statement of the Mobius case was located.
  arXiv:2601.00292 is not withdrawn; it stands at v2 with an author
  erratum, and three live wordings were corrected. Stale o(x) rates in
  three note bodies replaced by the derived O_H form.
- New derived records: small-divisor-kernel (reciprocity separation,
  interfaces fail at 129/125 and 1267/1200, deficit at common divisor 1),
  reachability-coverage (corner unreachable, gamma=2), corner-correlation
  (weighted two-point Mobius correlation at shift 2; prior art in Tao 2016
  and Maynard ICM 2022 Q17), left-divisor-signs (41/40), determinant-
  corollary (zero added area), consumer-comparison (Murty-Vatwani reduces
  to EH_{mu_2}(x^(1/2+eps)); corrected delta_x dictionary; weaker block-
  summed consumer), corner-log-average (transfer fails at named steps),
  signed-moment (true diagonal not binding; Cauchy-in-h lemma; heuristic
  ceiling), heath-brown-edges (edge relocates; cutoff 6/25 below 1/4).
- Measured, negative: kernel-sign-control (x<=2^30), corner-measurement
  (x<=2^36; right band degenerate below x=2^70).
- Live assessment rewritten in README Status, G2-STATE §0, CLAUDE.md,
  RESEARCH-HANDOFF §§1,3,6 and TODO item C: no further local rectangles;
  the campaign has reached the weighted two-point Mobius correlation at
  shift 2 plus a bulk needing gamma=2. `REVIEW-REQUEST.md` specifies the
  independent review with every remaining unverified dependency listed.

## 2026-09-05: controlled a signed product range and isolated endpoint phases

The forward move after the singleton mass audit was to preserve Möbius
signs while grouping different fibers. This pass derives an estimate for
an actual subregion of the remainder and uses the saved input factors.

- Added `signed-divisor-grouping.md`. The region de≤x^(7/10) is
  O_H(x/log^H x) for every fixed H. Its density term cancels by a derived
  uniform excluded-prime Möbius mean estimate, importing only the classical
  quantitative mean of μ. Its CRT errors sum to
  O(x^(99/100) log³x). The previous witness places positive and negative
  masses at least c*x*log(x) inside this region, so this is signed
  cancellation across singleton fibers. No practical onset is asserted.
- The complementary density term cancels by the same uniform argument.
  The remaining actual sum is a weighted CRT endpoint discrepancy, with
  exact fractional-part, modular-inverse and discrete-summation formulae.
  Its needed one-sided improvement is OPEN. The 71/100 product threshold
  belongs to the displayed unsigned error budget, not a universal barrier.
- Added `signed-divisor-validation.js`, checking the excluded-prime
  convolution, all parity branches of the CRT kernel, inverse residues,
  exact endpoint discrepancies and weighted summation. Independent full
  expansions check the small and large product regions at finite sizes,
  including zero β contributions below cofactor cutoffs.
- Read `data-reuse/factor-windows.json` unchanged and reproduced its
  archived totals using an independent cofactor enumeration. New signed
  and absolute dyadic block sums are retained in
  `data-reuse/signed-grouping.json`; no old archived sieve was rerun.
  Finite density terms and endpoint errors remain explicit rather than
  replaced by their asymptotic limits.
- Recorded S-0905-13–14 and F-0905-14 separately. No newly false signed
  conjecture is asserted and no new REFUTED row is warranted. TODO C now
  asks for the Fourier/tail budget and a matched theorem audit for the
  actual remaining phases. Updated current-state pointers and generated
  indexes. The twin and G₂ bounds are unchanged.

**Validation:** the bound producer output records the algebra and archived
input checks: 98,304 parity-kernel comparisons, 3,584 convolution identities,
28,800 exact discrepancy numerators, weighted summation in 450 compatible
cells, and independent finite expansions. The prose table and finite budget
were compared to the generated data and its source hash was verified.
The full gate passed all 14 corpus checks, 58 known-positive checker cases,
47 controls and 251/251 numerical checks. Its finite measurements do not
establish the asymptotic theorem, which rests on the written derivation
and its named input; the remaining one-sided estimate stays OPEN.

## 2026-09-05: reused archived inputs and priced the singleton family

Chris asked to continue the arithmetic work and inspect existing runs and
their inputs before scheduling more computation. The previous first move
was to partition the determinant-2 sum into singleton and longer fibers.

- Added `singleton-fiber-audit.md`. Exact regrouping makes its coefficient
  vanish whenever either integer is prime. A derivation using prime BV,
  PNT and the Möbius mean estimate gives a c*x*log(x) lower bound on each
  sign's ungrouped singleton mass for all sufficiently large x. It uses
  odd squarefree coprime divisor pairs, a prime cofactor and a restricted
  part of the actual second β weight; modulus multiplicity, sign density
  and the proper-prime-power error are accounted for explicitly.
- This closes only an absolute O(x) singleton bound and an O(x) bound on
  its total negative mass. It does not bound the signed difference, the
  longer-fiber sum, or the combined remainder. The achieved twin and G₂
  bounds are unchanged. No independent referee or novelty claim is made.
- Added `data-reuse-audit.md`. The old fold CSV yields a complete verified
  base-prime list and archived interval coordinates. Three old rows are
  reproduced; bounded prefixes are reconstructed with all residue classes
  and saved complete prime-power factors in `data-reuse/factor-windows.json`.
  Other inspected outputs retain aggregates or gap records, not the
  needed divisor coefficients. Large old sweeps were not rerun.
- Added `singleton-fiber-validation.js`, with independent defining-sum
  checks, exhaustive full-fiber geometry including zero weights, direct
  regrouping, an independent witness progression enumeration, full dyadic
  measurements and archived-prefix checks. Finite Type I budgets prevent
  treating the limiting main term as an exact identity at small cutoffs.
- Recorded S-0905-11–12 and F-0905-12–13 separately, added the scoped
  closure to REFUTED, and moved TODO C forward to signed grouping across
  fibers. Current-state pointers and generated indexes are synchronized.
- The new JSON links exposed a reference-checker defect: its `.js` match
  truncated `.json` and reported nonexistent scripts. The root/relative
  path rules now recognize complete JSON extensions, with live and missing
  JSON fixtures in the checker self-tests.

**Validation:** see the producer's bound output for its coefficient,
geometry, arithmetic-progression and archived-row checks. Both new prose
tables were compared to the generated artifact; input and artifact hashes
were verified. The full gate passed all 14 corpus checks, 58 known-positive
checker cases, 47 controls and 251/251 numerical checks. The corpus gate
does not certify the open signed estimate or replace review of the proof.

## 2026-09-05: separated successful work from unsuccessful attempts

Chris explicitly asked for separate success and failure documents so later
agents do not repeat completed work. This is a record-keeping update; no
new mathematical estimate or numerical experiment is claimed.

- Added `research/SUCCESSES.md`, indexing the current campaign's reusable
  derivations, exact identities, conditional implications and finite checks.
  Every entry has a stable identifier, source question where applicable,
  evidence and a stated limit on what can be reused.
- Added `research/FAILURES.md`, indexing unsuccessful deductions, bounds
  and imports, with their precise failure and conditions for revisiting.
  A missing arithmetic input is distinguished from a refuted statement;
  surviving lemmas are cross-referenced in the success log.
- Preserved `research/REFUTED.md` as the owning earlier closed-route
  catalogue. The new logs cover the current review and arithmetic campaign
  from commits c07f5a3 and 7c2c323; they do not claim a fresh audit or full
  migration of the historical corpus.
- Added `AGENTS.md` as an entry point to the existing `CLAUDE.md` rules,
  and required outcome logging after research attempts. Both logs are on
  the README, research router and TODO reading paths. The question index
  is regenerated from their registry ledger blocks.

**Validation:** the full gate passed all 14 corpus checks, checker self-tests
and 251/251 numerical checks. The final success-log backfill and this record
were followed by the fast/index/strict gate and whitespace check. Existing
mathematical arguments, validators and embedded outputs are unchanged.

## 2026-09-05: committed the review and estimated the second small-divisor pieces

At Chris's request, the complete preceding review, corrected specifications,
Chen benchmark, positive-count consumer, local-transfer arguments and
validators were committed as **c07f5a3**, with a clean working tree after
the commit. The following research continues from that snapshot.

- **Derived two estimates using an additional classical input.**
  `shifted-prime-decomposition.md` expands Λ(dk−2) by Vaughan's identity
  with Y=Z=floor(x^(1/20)). Ordinary Möbius BV controls both new Type I
  pieces by O_H(x/log^H x). Its imported theorem, endpoint reduction,
  nonprimitive congruences and coefficient bounds are explicit. The
  divisor exponent 1/10 has a margin of 1/50 below the smallest relevant
  square-root exponent 3/25. This is an application of classical methods,
  not a new bound on the complete shifted-prime sum.
- **Identified the remaining joint correlation without erasing its weights.**
  The exact residual is Σ_{dk−ev=2} μ(d)μ(e)β_V(k)β_Z(v), with all product
  and cutoff conditions retained. A second parametrization gives an
  average of Möbius correlations along two linear forms. Their coefficients
  grow, and kv>x permits at most one integer in an inner interval.
  Ordinary BV does not include the remaining cofactor weight; the cited
  fixed-form/logarithmic and freely averaged-shift Chowla statements do
  not directly supply the estimate either. These are scoped hypothesis
  audits, not a general impossibility or literature-absence claim.
- **Gave a sufficient estimate averaged across scales.**
  A fixed improvement in the limsup dyadic average of R(x)/x would yield
  a positive twin count on unbounded scales. The implication is derived;
  its premise remains OPEN and still asks for more than mere infinitude.
  The forward task now prices the short and long intervals in the coupled
  average, consuming the completed second expansion instead of repeating it.
- **Added an exact validator.** `shifted-prime-validation.js` represents
  logarithms by integer prime vectors and their products by ordered
  tensors. It checks both Vaughan identities and contractions, separate
  determinant enumeration, inverse-residue parametrization, parity cases,
  interval endpoints and rational exponent margins. The initial test run
  exposed JavaScript's distinction between −0 and 0 in a zero Möbius term;
  the evaluator now normalizes that zero. No mathematical formula changed.
  OUTPUT was generated by `research/qc/embed.js`, never pasted by hand.

**Validation:** the full gate passed all 14 corpus checks, checker
self-tests and 251/251 numerical checks (167.1 seconds for the numerical
audit). The new validator separately passed 65,256 exact log-vector
identities, 32,640 partner tensor identities, 1,179,648 parity checks and
24,576 interval checks. It enumerated 917,083 determinant tuples and
independently recovered 23,506 through the linear-form parametrization.
The embed check reproduced its bound output. The final prose refinements
were followed by the fast/index/strict gate and whitespace check. These
finite checks do not validate the open asymptotic estimate. No new
asymptotic twin lower bound is claimed, and no material was published or
sent externally.

## 2026-09-05: matched positive prime weights to available inputs; first joint estimate attempted

Chris approved proceeding through the opportunity audit's sequence. The
input specification and conditional payoff are complete; the first estimate
attempt does not establish the missing bilinear improvement.

- **Specified and justified the comparison sequence.**
  `prime-detection-spec.md` uses a(n)=Λ(n−2) and the positive comparator
  b(n)=2C₂·1_(n odd)·∏_{p|n,p>2}(p−1)/(p−2). An elementary divisor expansion
  proves its local progression main term d/φ(d), including repeated factors,
  with a uniform error. Prime BV then supplies the interval Type I estimates
  through d≤x^(12/25); PNT supplies the comparison's prime mass. The earlier
  note's comparator and bounded-sequence obligations are no longer merely
  unnamed prerequisites for this consumer.
- **Derived the exact positive payoff.** Vaughan's identity with
  U=V=floor(x^(6/25)) gives S=C₂x+B+o(x), with both Type I terms negligible
  and every coefficient of B explicit. A fixed improvement over the available
  one-sided boundary B≥−C₂x+o(x) gives a positive twin count on unbounded
  scales. This is a classical reduction, not an independently established
  reason that the improvement holds. No Ford–Maynard bounded-class theorem
  is transplanted to logarithmic weights.
- **Executed the first attack.** `bilinear-fold-attack.md` assigns the Möbius
  factor to its least prime, with strict factor exclusion and the s=1 branch
  retained. Absolute values lose too much. The direct second moment has a
  negligible diagonal and an open off-diagonal involving two shifted prime
  forms. Its sufficient cancellation condition is stronger than the required
  one-sided estimate and is not made the sole next target.
- **Checked the local covariance rather than assuming independence.**
  The one-fold comparison factor is a conditional mean. Its covariance is
  computed exactly and the weighted contraction is a nonzero-residue
  imbalance square. Fixed-modulus PNT balances the actual β weights. This
  does not control the full shifted-prime remainder or growing fold depth;
  the distinction is explicit in the attack note.
- **Added exact algebra validation and updated the queue.**
  `prime-detection-validation.js` checks Vaughan's identity using integer
  coefficients of log primes, finite Euler factors using rational arithmetic,
  least-factor assignments, weighted contractions, the second-moment split,
  and fixed-fold covariance. The embed tool generated its output. The board
  now asks for joint control with growing depth and a priced reconstruction
  error; completed input and decomposition tasks are referenced, not repeated.

- **Continued through growing local depth and priced reconstruction.**
  `polylog-fold-transfer.md` uses Siegel–Walfisz to prove β-weighted local
  bilinear cancellation uniformly for squarefree moduli at most a fixed
  power of log x. A separate Möbius convolution argument controls the full
  and truncated comparison terms. The remaining sum is explicitly
  Σ μ(d)β_V(k)Λ(dk−2). Absolute reconstruction from these local models
  has error at least (1/2+o(1))x, so an o(x) absolute approximation is false.
  This does not bound the signed reconstruction error, which remains OPEN.
  The queue now targets that actual shifted-prime/Möbius interaction.

**Validation.** The full gate passed: 14 corpus checks, checker self-tests,
and 251/251 numerical checks (166.3 seconds). The final local-transfer
additions extend the same exact validator with joint CRT conditional means
and the comparison Möbius convolution; its output was regenerated and
reproduced with the embed tool. The final fast/index gate and whitespace
check were rerun after those additions. The validator checks 69,885 exact
log-vector identities and 34,944 first-fold assignments, as well as the
stated rational and second-moment identities. These validate finite algebra,
not the missing asymptotic estimate. No new asymptotic twin lower bound,
commit, publication or contact is claimed.

## 2026-09-05: audited the proof opportunity beyond the fixed Chen weight

Chris asked where a proof opportunity lies. The proposed signed condition
remains mathematically sufficient, but the audit changes which research task
should be pursued first.

- **Exposed the weight's extra obligation.** On actual prime openers,
  Q_P−R_P=2(T_Λ−L), with L a nonnegative odd-composite penalty. Clipping W
  at zero gives Q_P⁺−R_P⁺=2T_Λ exactly. This removes an artificial loss from
  the representation but supplies no estimate of the signed sum. The audit
  classifies the loss by factor count and bounds the triple and squareful
  contributions as negligible at the benchmark scale.
- **Checked what component cancellation would buy.** Even granting
  R₁−R₂/2=o(x/log x), the separate classical bounds leave coefficient
  (1/2)log(3/2)−J<−1/12. This is a deficit in those lower bounds, not a
  negative value of the actual twin expression and not a refutation of Hη.
  The original recommendation to pursue cancellation for the fixed weight
  first did not account for this budget.
- **Realigned the forward task.** `chen-opportunity-audit.md` directs a
  conditional prime-detection specification: choose the positive sequence
  and its locally correct comparator, state justified and OPEN arithmetic
  input ranges and coefficient classes, and certify the resulting positive
  margin before choosing a missing estimate to attack. Ford–Maynard's
  prime-producing-sieve framework was checked at its hypotheses, including
  its stronger Type II coefficient class and bounded-sequence caveat. It is
  a candidate tool for this specification, not an available twin-prime proof.
- **Kept the record current.** The signed note, TODO board, canonical state,
  assistant context and research router now reflect that assessment.
  `chen-benchmark-validation.js` adds exact loss/clipping identities and a
  rational certificate for the negative separate-estimate coefficient. Its
  intentionally extended output was regenerated with the embed tool's forced
  replacement, which reproduced every previously recorded figure.

**Validation.** All final gate components passed: the 14 corpus checks in
`node research/qc.js --index --strict`, the checker self-tests, and 251/251
numerical checks (167.5 seconds). The initial full invocation reported one
quotation finding: quotation marks around a new search term were interpreted
as a quotation from the linked local audit. The term is now formatted as a
search term, and the fast gate was rerun clean; numerical code was unchanged
by that formatting correction. Both validation scripts passed their embed
reproduction checks. The extended Chen validator checks 559,228 integers,
including the loss and positive-part identities; its rational certificate
checks the separate-estimate deficit. These are algebra/constant checks,
not evidence for an asymptotic signed saving. No new asymptotic arithmetic
estimate, commit, publication or contact is claimed.

## 2026-09-05: corrected scope, Chen benchmark, and an explicit signed target

Chris approved the independent review's sequence (“Let's move forward in the
order suggested”) and explicitly authorized refactoring and research
realignment. The earlier review below remains a historical record; its claim
that the ledger was entirely sound is not the current assessment.

- **Corrected the live specification.** README, G2-STATE, ZONE-POSTULATE,
  THE-LENS, THE-DIALS, ATTACKS3, the consolidated manuscript and the research
  queue now distinguish a limitation of a specified sieve method from a
  universal limitation of exact residue information. The DHR threshold is an
  achieved value, not a proved optimal floor; 4 remains conjectural. A constant
  quadratic G₂ bound gives a limsup comparison for g, not little-o. A fixed
  power saving would give little-o. Infinitely-often, eventually-always and
  every-prime conclusions are kept separate.
- **Corrected the CRT premise and measured range.** Freely translated pairs
  with fixed separation 2 occur jointly at some tile phase by CRT. Independent
  phase coordinates do not prevent worst-case accumulation. The normalized
  ladder headline now includes x=37: about 0.446–0.594 over the 18 terms with
  x≥11, from `research/a144311-full-ladder.js`. The old finite fits are not
  asymptotic exponents. Crystallization explicitly excludes 1. U-FRAME's
  unsupported claim about impossibility of writing the next-prime function
  is replaced by the actual question of obtaining a useful estimate.
- **Retained custody while correcting its interpretation.** The parity line
  still requires a substantive declaration and rejects placeholders; its
  messages and instructions no longer purport to prove mathematical
  impossibility. The duplicate misalignment adjudication was reviewed on both
  sides and moved to ADJUDICATED_RETIRED with its old reason intact. The closure
  registry now distinguishes failed inequalities, finite tests and missing
  inputs. Historical attack records and their embedded outputs are retained.
  CLAUDE.md explicitly permits evidence-based correction of canonical summaries.
- **Completed a classical benchmark using named theorem inputs.**
  `research/chen-fold-benchmark.md` matches the linear sieve, prime BV and
  Chen's switched-sequence distribution theorem on intervals of length
  asymptotic to x/2. It proves the combinatorial minorant, prices square and
  prime-power errors, and derives a positive lower bound for prime-plus-P₂
  pairs. These are classical mathematical results, not new Primeoire theorems;
  the imported sieve/distribution theorems are not independently reproved.
- **Specified the additional open arithmetic.**
  `research/chen-signed-target.md` gives a prime minorant and a conditional twin
  theorem from one signed estimate on infinitely many dyadic intervals. The
  factor/cofactor identity retains the sign and the actual element ranges.
  The new estimate is OPEN, with no proved cancellation mechanism. No larger
  covariance sweep or gap fit is justified by this work.
- **Added exact validation.** `research/chen-benchmark-validation.js` certifies
  the classical integral margin by rational arithmetic and checks the
  minorants and cofactor identity at finite intervals. Output is generated by
  the embed tool. `research/review-0905-validation.js` separately checks the
  fold kernel, exhaustive T7 CRT configurations and the four-sign identity.
  These checks do not prove asymptotic cancellation.

**Validation.** `node research/qc.js --full --index --strict` passed: 14
corpus checks clean, checker self-tests passed, and 251/251 numerical checks
passed (numerical audit: 170.3 seconds). The audit recomputed G₂ through 37#
and checked the recorded witnesses at 41# and 43#; those last two are not
fresh exhaustive maximality searches. Both added validation scripts also
passed the embed tool's code, body, dependency and reproduced-output checks
where applicable. The Chen validator checked 559,228 integers pointwise;
its exact rational calculation certifies the integral margin, not a signed
prime asymptotic. The standing advisory backlog is not an audited proof of
the entire historical corpus.

The queue now begins with deriving an estimate for the signed expression;
completed benchmark tasks live in their artifacts. The research router and
paper-suite sequencing point there. AI disclosure now distinguishes finite
computation from proof of asymptotic claims. No commit, external publication,
or contact was made.

## 2026-09-05: the review, the decision, and the parity gate

*(Chris: "review the work so far and validate that it's solid or not", then
"we just want twin prime goal, we don't care how we break it", then "execute
your recommendations starting with cleanup and better ordering". One session,
no agents. The review reproduced the ladder to x = 23 on fresh code, re-read
the β₂ proof, the Gap Reformulation, the REC closure and the K–K lower bound,
ran the full gate (251/251), and checked four literature facts at source:
Selberg's 2κ conjecture (Franze 2011), Erdős #687 (the Erdős Problems page,
curl, edited 2026-08-31), the Maier–Pomerance conjecture (FGKMT), and the
absence of a published two-class upper bound. Nothing in the ledger was found
wrong. What was found wrong is the target.)*

- **README §Status rewritten around the target, not the object.** The old
  section led with "we cannot bound this object" and a wave-by-wave history.
  The new one leads with the goal and three facts already in the repository
  but never together: the target's quantifier is stronger than the
  conjecture's (`ZONE-POSTULATE.md` §2, `THE-DIALS.md` dial 4), the target
  implies Erdős #687 (`G2-STATE.md` §9 route A), and the target sits below
  Selberg's conjectured sifting limit 2κ = 4 (`REFUTED.md` "floor at 4"). It
  states the wall as a specification: a residue-only argument applies to the
  parity-twisted sequence, so the tile is parity-blind by construction, and
  the missing input is Type II information over shifted primes, cleanest
  instance Σ_{p≤X} λ(p−2) = o(π(X)). The 2026-08-29 and 2026-08-30 wave
  narratives leave the section; they live in this file's entries of those
  dates.
- **"Measured exponent 1.50" demoted from headline to a labelled local
  slope.** README §Status now reports the ladder as 0.45 to 0.53 times
  m·ln D (`a144311-full-ladder.js`, the c₂′ column), the x·polylog scale, with
  the log power undecided by 22 terms, and says the power fit's 1.50 is not an
  exponent in the sense 4.26645 and 2 are. `G2-STATE.md` §3c said this
  already; the README did not.
- **The wall's label corrected on the exponent face.** README's "Open: the
  wall (parity)" now names two faces: parity in Selberg's sense on the count
  face (`anchored-note.md` §9 had this right), the dimension-2 sifting limit
  for an all-positions statement on the exponent face (`wall-note.md` Face 4
  had this right), both instances of the residue-only specification. In the
  G₂ regime the sieve runs to x on integers of size e^x, survivors carry up
  to x/ln x prime factors, and the classical parity example does not bite as
  such.
- **One-class lower-bound citation flagged as possibly superseded.** The
  Erdős Problems page for #687 reports Y(x) ≫ x ln x/lnlnln x, credited to a
  2026 result, improving FGKMT. Not read at source; recorded as reported in
  README §Status and `G2-STATE.md` §0. The repository's own x ln x composition
  sits above it either way.
- **Decision recorded (Chris, 2026-09-05): attack waves on G₂ and Z₂ stop.**
  `TODO.md` opens with a 2026-09-05 board ranked by what an item can still
  deliver; item 0's 150-line body is condensed to its closure and ledger
  (`attack-0829n-rml-proof.md` through `redteam-0904-item0.md`); THE TARGET's
  spine sentence now says the Z₂ target is the wrong lever for the goal and
  keeps the proven statements. The G2-STATE §0 "Judgment call for the
  orchestrator" block, process text from 2026-08-20, is deleted.
- **The parity gate.** New gated check `parity` (`qc/questions.js`,
  registered in `qc.js`, documented in `qc/README.md` and at the top of
  `questions.js`): an attack note (ledger `todo:` naming a live item) added on
  or after 2026-09-05 by `git log --diff-filter=A` must carry
  `parity: <one line naming the non-residue input>` or exactly
  `parity: residue-only`; placeholders fire `parity-placeholder`. Legacy notes
  exempt. Selftest gains two positives and four controls (56/45). Zero notes
  in scope on the day it landed, by construction.
- **Item 9's owed producer fix applied.** `varE-theta2-step.js` (staging)
  summed one mirror half of the shift-2 pattern twice
  (`verify-0830-record-defects.md` claim 1, CONFIRMED). The line now sums
  both patterns; re-embedded with `--force`; the new column reproduces the
  verification's values digit for digit at x = 7..19 (δ·X2 = −0.009235,
  0.004509, 0.001365, 0.000736, 0.000394) and adds x = 23 (0.000236;
  δ·Xmix −0.013876). Reading 6 and the companion note's §5 rewritten; the
  2026-08-30 rider records the application.
- **`node research/qc.js --index` no longer throws.** `gen-scripts-index.js`
  joined `research/` with each script's basename and hit ENOENT on the first
  staging script; it now resolves basenames through `corpus.js`'s own list.
- **New draft `paper/two-class-jacobsthal.md`**: the programme's one finished
  result as a single note, assembled from `beta2-note.md`,
  `kk-lower-bound.md` and `a144311-full-ladder.js`, nothing re-derived, with
  the calibration against the conjecture in its own section. `PAPERS.md`
  sequencing revised to lead with it. README Map gains its row and
  `kk-lower-bound.md`'s.

## 2026-09-04 — one wave toward the wall: four attacks, four red teams, the map moved and neither exponent did

*(Chris: "move our understanding forwards towards the wall, max 4 concurrent
opus agents, you organize and drive; search, some compute under 2 h ok". Four
Opus agents wrote one staging note each; four Opus red teams graded them on
independent code; every surviving verdict is applied below as a live-doc edit or
a dated rider. Orchestrator's own note `derive-0904-L7-transfer.md` red-teamed in
the same pass. Records: `research/history/staging/{redteam-0904-floor-growth-2,
recon-0904-sifting-limit-floor, measure-0904-argmax, derive-0904-r0-extension,
derive-0904-L7-transfer, redteam-0904-item0, redteam-0904-sifting-limit,
redteam-0904-r0-extension, redteam-0904-argmax}.md`, all HELD, all producers
bit-honest under `embed.js --check`. No exponent moved.)*

- **Item 0's growth half survived a SECOND adversarial pass and the route is
  now a truth gap at rung derived-and-red-teamed-twice.** Ten attacks over two
  passes, every load-bearing number reproduced digit for digit on a third
  code base (18 of 18 A₁A₂ cells, the LP vertex 8s/9, the crossing 9β₂/16).
  The proof-gap reading is REFUTED: REC quantifies over the remainder of the
  very certificate the floor bounds. Corrections applied to `REFUTED.md` (the ρ
  maximal law row), `TODO.md` board row 1 and item 0, `README.md` §Status and
  `G2-STATE.md` §0: "red-teamed once on each half" → twice on the growth half;
  the scope is every admissible level split (1643 splits, minimum margin
  0.64), not only D₁ = D₂; the crossing depends on (s, u₀), 10^15.3 at
  (3.0, β₂) and 5.6e31 at (2.698721, 4.2165), so the bare "z ≈ 1e31" is
  retired; the construction's exact onset is 1.875e6 at the record's own s
  (the analytic 1.055e6 is early by 1.78×), 4.39e5 at s = 3.0; "then 4" above
  s = 5 holds on [5, 7] only, and at s ≥ 7 the four-prime construction has no
  exit prime below z. Riders on `redteam-0830-floor-growth.md` (R3, escape (a)
  density bracket), `attack-0830-rec-cheapest.md` §4.2 (p* window a convenience
  bound), `redteam-0904-floor-growth-2.md` (four rewordings). Scope of death:
  only L2 leaves the legal open set, and with it L7's second mechanism.
- **The corpus's "no lower bound on the κ = 2 sifting limit is known" was a
  CONVENTION failure, corrected in five live files.** Selberg's *Lectures* §17
  "Some upper bounds for sifting limits" states lower bounds on β_κ in his
  reciprocal convention a_k = 1/β_κ (second source Ford 2023 p. 37); Brady
  2017 Theorem 22 at κ = 2 gives β₂ ≥ 3e^{−1/2} = 1.8196 on proved facts
  alone, and his class is the axiom-only interval class Face 4 needs;
  β(2) ≥ 2 is immediate from Ford's one-sided dimension axiom. All at or below
  the band's lower endpoint, none inside it. The extremal-example absence is
  now calibrated (Halberstam 2003 p. 117: "not known and greatly to be
  desired"). Applied: `paper/wall-note.md` Face 4 (two passages),
  `sift-limit-attack.md` §2 (the [ABSENT] split; the Franze paragraph's
  "plateau near 2κ" reading demoted to small κ only, since β_κ − 2κ grows to
  6.45 at κ = 15), `THE-DIALS.md` (footnote on the β_κ column and the
  extremal sentence), `G2-STATE.md` §9's copy, and a new
  `SEARCH-CONVENTIONS.md` §1 row (gate effect measured: three phrases added,
  nothing existing newly clears). **The recon's headline was REFUTED by its
  red team**: "the cap at 4.26645 is a method artefact at rung MEASURED via the
  LP floor 3.3152" fails on four grounds (a legal profile inside the classical
  budget reads 5.0113 calibrated, above β₂; the 1.72 calibration misses the
  second proven anchor β(1/2) = 1 by 66 to 82 per cent; the definitional route
  reads 3.9487 at x = 43 and climbs; 3.3152 is 22.3 per cent below, not 18).
  The live sentence says: no barrier theorem, no exhibited axiom-only argument
  inside the band, the LP number a finite-level measurement for one profile.
- **Killer 2's coordinate measured for the first time, and half of the
  question turned out to be on the ladder already.** The multiplicity of the
  maximum was NOT open (`exact-g2-ladder.js` nmax, `measure-g2z2-0829.js`,
  `ATTACKS3.md` §A1 to x = 31); `object-g2-read-0829.md`:1000's "unknown" is
  wrong and carries a rider. New, MEASURED exhaustively at x = 11..37 by a
  third engine and reproduced at 11..31 by a fourth: the argmax set is
  mirror-invariant with no fixed-point hit, carries zero congruence pairs from
  x = 23 (forced, by both kill classes being present), and at x = 37 the
  maximum is 2 positions of 7.4e12 with 6 gaps within ten per cent. Red-team
  corrections applied as a rider: the null ratio for near-maximal translates
  was inflated 6.9× to 29.1× (correct twin-slot null (p − 3)/(D − 1), so
  10^4 to 10^6, and the statistic is deterministic, so a null ratio is a
  category error); "58 to 82 per cent" reported K − components where K −
  isolated (83 to 98) was meant; F3/F7 scored at four levels; the chi-square
  control is biased toward reassurance. Four of eight sealed forecasts failed.
  A dangling widths annotation was deleted and all three tails re-bound (seal
  hash unchanged; timing custody residual recorded). `G2-STATE.md` §3c gains
  the third-engine certificate sentence.
- **No piece of the zone decomposition R0 is both legal and exempt from the
  parity obstruction with content** (DERIVED, red-teamed once, conditional on
  Tao's Claim 1). Proposition A (the convex-hull test reduces to a coordinate
  count in the product class) CONFIRMED with a counter-witness outside it;
  the scope slip CONFIRMED and strengthened: `wall-note.md`:182,
  `lit-tao-parity.md`:313 and `object-bridge-read-0829.md`:471 bound one
  coordinate, which is Tao's Example 2 (not obstructed); the property must
  bound both. Applied to `paper/wall-note.md` (with the Claim 1 conditional),
  riders on the two staging notes. Propositions B and D WEAKENED (B proves
  too much and its insertion is not needed, the conclusion being live
  already; D's causal reading of the exponent band does not hold). REFUTED:
  "no artifact certifies the window-count variance at width p′²",
  `research/06-variance-theorem.js` does; the zone anchor's z-score is now
  MEASURED at 43 levels, −0.49 to +2.13, mean +0.59, not a diverging outlier
  at these levels (two different statistics from the tile anchor's; tension
  with `origin-excess.md`'s 21 per cent deficit is the named follow-up). The
  equivariance argument transfers to the zone by restriction, not analogy
  (rider on `z2-state-draft-0829.md` §8). EXEMPT means "Claim 1's H5 fails",
  not "no parity obstruction".
- **L7 (G₂ ≪ g·ln^A x), legal and never asked, is not a transfer.** The
  union-bound budget Σ 1/(p − 1) passes 1 at x = 11 (VERIFIED by enumeration,
  `derive-0904-L7-transfer.js`); the sieve-on-holes reduces to the vector
  sieve after the Ford–Halberstam substitution, priced K_BF = 5.158 at free
  levels (the note's 5.297 was the forced-equal-level constant, corrected by
  rider), and its decoupled form dies with L2. Weighted sieves with Chen
  switching were already closed at `sift-limit-attack.md` §4.2. L7 stays OPEN
  as a statement with no mechanism.
- **Gate housekeeping.** Six `ABSENCE_VERIFIED` entries had aged past the
  fourteen-day window (the repo sat idle 08-30 to 09-04); each re-verified
  against today's artifact set and re-dated in `qc/ledgers.js` (the z = 41
  sup and @43 engine still unrun; c_obs still stops at @17; the rest
  unchanged). Owed and not done: the one-line X2 fix in `varE-theta2-step.js`
  and its re-embed (item 9); `a3-01-misalignment-ledger.js`:371-373's
  "assumption" comment is now measured but rewording a producer comment
  forces a re-embed and was left. Also found, pre-existing at the previous
  commit: `node research/qc.js --index` throws because
  `research/gen-scripts-index.js` opens `research/attack-0829n-X-upper.js`,
  which lives under `history/staging/` (ENOENT at its line 48);
  `gen-questions-index.js` run directly works and was used.

## 2026-08-30, afternoon — the full self red team of both days' records, applied

*(Chris: "full self red team, then cleanup, self ordering, then commit". Ten
red-team notes `redteam-0830-{floor-growth,floor-sign,rml,fekete,zone,
doubling,records,engine,slack,imports}.md`, each on independent code, every
verdict applied by the orchestrator as a dated rider or a live-doc edit. The
Fable credit ran out at launch; all ten ran on Opus. No exponent moved.)*

- **Item 0's REC route ruled a TRUTH GAP at rung derived-and-red-teamed-once**
  and given a REFUTED row: the exact half PROVEN (`floor-sign`), the growth
  half survived six attacks (`floor-growth`, hypothesis s ≤ 3 added). The
  blind slope test is ruled to test the construction, not the law; the
  orchestrator's live sentence saying otherwise is corrected.
- **Four sentences the orchestrator wrote into the live layer were wrong**:
  "δ unreadable by any instrument tried" (a reader passed; needs
  "non-circular"), "s_max 1.81 → 1.96" as a B3→B8 range (peaks at B4),
  "removes at most 0.0102" (wrong in sign at @17), the null's "0.025 in the
  width law" (it is the ln Q slope; width is 0.031), and one applied rider's
  pooling range (top decade only). All corrected.
- **A derivation under REFUTED row 97 REFUTED** (the level-free
  "|B − 1| ≥ c forces σ < u_c − 1"); its conclusion survives as a
  measurement at @23 and the row is reworded. Row 96's sign clause and row
  98's certificate-versus-truth ratio corrected; rows 94 and 95 stand, 94
  under-claiming.
- **Confirmed on independent code**: D* exactly at 299 of 376 anchors on a
  BigInt simplex with the custody gate re-derived; the 1e11 twin sieve
  against published π₂(10^k); the CAP lemma in full; the reflection
  identity; the @23 ladder; Theorem U's every band sum; both doubling proofs
  (21.6M nesting links, 0 failures) and a fifteenth exact step at
  s = 19, 20; all 48 δ-reader calibration cells; the head, tail and
  verification arithmetic with 0 assertion failures.
- **Two limits no red team can lift**: a seal's TIMING is unverifiable by
  content hashes (every sealed prereg in the corpus shares this); the RML
  note's `ask` column is the proven bound on the rms, not the rms (36× to
  200× apart, conservative direction).
- Literature: Harper JLMS 112 (2025) e70293 proves the weighted BDH form the
  smooth-numbers recon called unmet; the step still does not close.

## 2026-08-30, overnight campaign (in progress) — up to ten agents on the updated queue, integrated as they land

*(Chris: "continue, up to 10 agents concurrent, ~12 hours". Each agent one
staging note, no live file touched by any agent; the orchestrator integrates
each note after `embed.js --check` and adds the ledger ids. No exponent moved
so far. This entry is extended as notes land.)*

- **TODO item 4 (Skeleton Equidistribution) DEMOTED and deleted**
  (`decide-0830-skeleton-door.md`, ANSWERED): over every scour prime the
  door governs 9.2%, −0.9%, 0.2%, 0.5% of the mass at @13..@23; the −10.8%
  and +5.5% that `anchored-calm.md`, `GLOSSARY.md` and cap-36 carried were
  subsamples (40 of 435, 29 of 1,739 primes; `qc-wave6-Y.md` defect Y-3 had
  flagged it 2026-08-18 and it never reached TODO). Those three live
  sentences corrected; six `todo: 4` ledger blocks flipped to `4 (retired)`;
  REFUTED row added; the Collapse Theorem, Trapezoid Cancellation and the
  six-level certificate stand.
- **TODO item A's first move (a) was stale**: "the unified ladder at @17+"
  had been ANSWERED on 2026-08-21 (`Q-anchored-ladder`); a brief re-posed it.
  The agent went to @23 instead (`attack-0830-anchored-ladder-17.md`, sealed
  14-of-14). Item A rewritten.
- **Item D: the fold-composition route CLOSED as a truth gap**
  (`attack-0830-doubling-killrun.md`): composition is a product ≥ 2^N.
  REFUTED row added; D parked on 0c. Also caught: `prop-exact-fold-L.md`
  self-grades PROPOSAL while `G2-STATE.md` §0 lists it under PROVEN
  (resolved: the bullet moved out of §0's PROVEN list, `coherence-0830.md` D1).
- **Item 8(a), the deep-ladder Buchstab transfer, CLOSED**
  (`attack-0830-buchstab-deep.md`); REFUTED row added; item 8 rewritten.
- **Item 1d: δ's sign unreadable at reach 79** (`measure-0830-delta-reader.md`);
  the brief's "δ ≈ 2 conjectured for the one-class control" was imprecise
  (Maier–Pomerance is x(log x)^{2+o(1)}, o(1) unconstrained); item rewritten.
- **Item Z2: fourth decade blind, 64 HIT / 12 MISS** (misses on naked
  asymptotes, pre-declared; `blind-0830-quadpoint-31607.md`); item updated.
- **Item 0: REC at the cheapest legal point does not close; an ADVERSE
  derived floor is on file, HELD** (`attack-0830-rec-cheapest.md`): if its
  growth half Ω ≫ z^{16s/9}/ln⁸z survives an adversarial pass, REC is false
  below u₀ = 4.7088 and the RML route is a truth gap. Not integrated as
  fact; item 0 carries it as an adverse candidate; red team on Chris's ask;
  a blind test of the growth law's slope is in flight
  (`blind-0830-omega-floor.md`). Prior art (`recon-0830-rec-killrun.md`):
  no theorem applies to REC or to the kill-run as stated, no Maier-type
  truth-gap result at level D, the kill-run upper bound is absent in the
  long-gap literature (only lower bounds exist).
- **The adverse floor's growth law survived a sealed blind test**
  (`blind-0830-omega-floor.md`): exact Ω to z = 113 and certified chains to
  1e9, ten of ten slope rows HIT onto 16s/9 − 8/ln z, four constant rows
  MISS in the pre-declared non-adverse direction. Still not the adversarial
  pass; item 0 carries it. Item 8(b) measured per prime and the item parked
  (`attack-0830-comb-tail.md`); item 9's smooth-numbers search found no
  theorem that applies as written, nearest Harper 2012 Thm 2
  (`recon-0830-smooth-aps.md`).
- **The three record defects VERIFIED at the producer on independent code**
  (`verify-0830-record-defects.md`): the X2 doubling CONFIRMED to every
  digit (riders on `varE-theta2-step.md`, `varE-theta2-proof.md`,
  `varE-spectral.md`; `paper/variance-note.md` §10 waits for Chris); the
  "R + 1/2" AMENDED (5/2 and 3 under the tail's convention, the head's line
  exact under its own; rider on `zone-tail-02-0829.md`); the pooled head
  remainder CONFIRMED as an artefact and AMENDED on mechanism, with HL now
  2.5 to 3.4% BELOW the half-decade measurement (rider on
  `head-residual-hl3.md`). TODO Z4 and 9 updated.
- **Coherence pass over the day's notes against the live layer**
  (`coherence-0830.md`, 27 findings): applied the 15 APPLY items and the
  quote-backed numeric ASK items: per-fold L moved out of G2-STATE §0's
  PROVEN list (PROPOSAL grade), 67 → 71 closed routes, README's skeleton-door
  and u_sup clauses, "8 hits" → ten of ten, "27 clauses" → 25, anchored-calm's
  two remaining door sentences, Z5's title and body, Z2's stale first move,
  u* seventh digit, Henriot read at the text layer, the 0.611 sentence, the
  Monte-Carlo-model rider on the 0.002 residuals in three places, minimal
  pools 4/21, counts 216 to 557, the δ wording, G2-STATE's doubling and
  analytic-front paragraphs. Held for Chris: the README morning-wave
  paragraph (written at campaign end), the two SEARCH-CONVENTIONS rows
  `recon-0830-rec-killrun.md` proposes, and the door row's HELD tag.
- **Item Z2: the fifth decade ran sealed and rejects the exact-Mertens
  main term** (`blind-0830-quadpoint-c1c2.md`, 17,702 blind anchors to
  Q = 316243): C1 above the data by 13.33 and 23.82 se at B13/B14 while the
  ω-form C2 sits within 2 se; riders placed on `u2-engine-depth.md` and
  `import-rough-anatomy.md` (both stay HELD); reproduction target extended
  to m14. Item 1 rewritten from `engine-0830-at43-bigint.md` (@43 is 579
  laptop-hours, box-class; the "~13×" had no source).
- **Item 9: the "two open steps" are one statement**, and a standard import
  applies as stated (Henriot Cor. 2 with the 2014 erratum, moduli cut to
  n ≤ L·ln^{2+o(1)} y); the non-closing inequality is smooth-numbers-in-APs
  equidistribution to moduli y^{4/5}, an unsearched owning convention (recon
  in flight). A record defect in `varE-theta2-step.js` (X2 doubling) is HELD
  pending verification at the producer (`verify-0830-record-defects.md`, in
  flight).
- **Item Z4: both derivation attempts ran; ensemble halves derive exactly,
  anchored halves are HL-strength** (`attack-0830-head-remainder.md`,
  `attack-0830-tail-derivation.md`); two record findings HELD pending the
  same verification (the 5.3% head remainder as a pooling artefact; the
  "R + 1/2" convention).
- **Item Z5: the residual of Kourbatov's b is located in a measured law**
  (`attack-0830-record-mechanism.md`): the twin-prime gap law at height is
  under-dispersed with far-tail log-slope 1.06 to 1.08, and fed into the
  record null with no parameter carries 96% to 100% of the residual; not
  height-stationary (CV² 0.7276 → 0.9295 over seven decades), conjectural
  null, per-band sigmas owed.
- **The 2026-08-29 HELD correction to `lemmaV-sup-extension.md` APPLIED**
  after adjudication (`verify-0830-usup-convention.md`): same object at the
  code; the orchestrator's level-convention suspicion was wrong.

---

## 2026-08-29, evening wave — five attacks on the exponent, one per live item, nothing moved

*(Chris: "spawn all 5 attacks with high competency fable agents". Five agents,
one staging note each, no existing file edited by any agent; the orchestrator
applied the corrections below after reading each note at its producer
(`embed.js --check` bit-honest on all five). No exponent moved. Records:
`attack-0829n-rml-proof.md`, `attack-0829n-hsubpow-K.md`,
`attack-0829n-X-upper.md`, `attack-0829n-doubling-bridge.md`,
`attack-0829n-parity-dstar.md`. All five HELD, no adversarial pass yet.)*

- **TODO item 1d's exponent formula was wrong as written.** It read
  `β ≤ (ln 66 + K)/ln 16 < β₂`; at the corrected ceiling K = 11.3568 that
  expression is 5.607, above β₂. The binding base on the trusted ladder is
  82 for every K ≥ 3 and the correct form is `min_b (f(b) + K)/ln b`
  (`attack-0829n-hsubpow-K.md` §1, VERIFIED; arithmetic re-checked by the
  orchestrator). Replaced in `TODO.md` item 1d.
- **The all-bases (H-sub-pow) hypothesis carries a sign condition that was
  unstated.** For an exact law `c·n^β·(ln n)^δ` it holds with finite K iff
  δ ≥ 0; for δ < 0 the k = 1 rung diverges (sign lemma, PROVEN, two lines,
  `attack-0829n-hsubpow-K.md` §3b). `fekete-1d.md` §4's sentence "every
  power-log law has a bounded window-sup defect" now carries "with δ ≥ 0".
  The sign of δ for G₂ is unknown: the diagonal δ-meter reads +0.5157 ±
  0.1969 on the one-class control where δ ≈ 2 is conjectured, so its G₂
  reading is void. Added to `TODO.md` item 1d.
- **APPLIED 2026-08-30 after adjudication (`verify-0830-usup-convention.md`,
  ANSWERED): the orchestrator's level-convention suspicion was REFUTED at the
  code, both notes bound the same lattice (`buildTerms(z, z^3)`), so the cap
  stands in substance.** `lemmaV-sup-extension.md` lines 485-486, 491-492,
  508-516 rewritten (2^π(z) moduli → min(2^π(z), z^{2s}); "exponential in
  π(z)" → bounded by z^{2s+o(1)}; the reachable theorem is polynomial,
  G₂(P(z)) ≤ z^{2s+o(1)}, not superpolynomial), a rider at 448-453, and its
  ledger verdict gains "(divergence since REFUTED at fixed s)". The RML
  note's attribution ("reads u_sup's growth as π(z)/ln z") overreached and
  is rewritten at its lines 241-246 and 432-433. The record below is the
  state before the ruling.
- **Was HELD, not applied: attack 1's "correction in passing" to
  `lemmaV-sup-extension.md`** (that u_sup's π(z)/ln z growth cannot continue
  because sup|R_H| is capped at z^{2s+o(1)}). The cap is at fixed level
  D = z^s; that note's growth reading is at full level, where 2s itself
  grows like z/ln z, so the two may be different conventions rather than a
  contradiction. Needs a second reader before either note is edited.
- **The K*-product doubling certificate is dead at every C₂ in the legal
  band [4, 19.2455)**, by exact data plus the red-team-confirmed floor
  K* ≥ π(2s) − π(s): certificate 18 against target 8 at s = 16 (true ratio
  5.2727), ≥ 14 at s = 64, ≥ 24 at s = 128 (`attack-0829n-doubling-bridge.md`
  §0, VERIFIED). The maxsum certificate stays under 8 at all fourteen
  enumerable steps (sup 6.6364 at s = 16) and is the tightest proven bridge;
  its all-s form is the open inequality. Not yet a REFUTED row: the doubling
  inequality itself is untouched in both directions.
- **The parity adversary's killing level D* has no law in Q; CLOSED by its
  own sealed kill rule** (`attack-0829n-parity-dstar.md`, 5 HIT, 1 MISS on
  a prereg sealed before the run; MEASURED on 271 anchors, 211 ≤ Q ≤ 13679).
  The Q-slope moves 1.446 → 1.204 → 0.575 across ranges while ln D* on
  ln(width) holds 1.097 ± 0.012 with a quarter of the scatter, D*/width
  ≈ 0.5, and the independent-thinning null reproduces the width law within
  0.025 in slope. Mechanism (HEURISTIC): D* is where a modulus first reads a
  single position of the window, the wall survey's remainder statement in the
  stretch coordinate; nothing new is named. The note discloses eleven anchors
  seen before or between seal and run and a gap-selected decade-2 sample;
  the decade-1 fits are blind on roughly 230 of 250 anchors. The engine is a
  floating-point simplex gated by 172 exact figures reproduced, 0 failures.
- **Ledger:** `Q-rml-proof-0829n` (item 0), `Q-hsubpow-K-0829n` (1d),
  `Q-X-upper-0829n` and `Q-parity-dstar-law-0829n` (Z2),
  `Q-doubling-bridge-0829n` (D) added to their items' `Ledger:` lines.

---

## 2026-08-29, late night — everything in flight taken to its end: custody, registries, the ledger links, the wording HOLDs, and Lemma V's whole chain

*(Chris: "wrap up everything in flight nicely, fully taken to the end". Six
resumed agents and two fresh ones closed the debts the day's notes had
recorded; the orchestrator applied the wording HOLD items it had held for a
second reader, each verified by at least one red team. Nothing here moves an
exponent. Records: `applied-0829-registries.md`, `applied-0829-ledger.md`, the
§8/§9 appendices of the closed notes, `redteam-0829-theorem1.md` §9.)*

- **Lemma V's mean-square chain, L1 to L5, ruled PROVEN with no hypothesis**
  (`redteam-0829-theorem1.md` §9: L1 and L2 identities, L3 the finite Fourier
  expansion on Z/W giving Parseval, L4's Fejér mass checked at 2,262 cases to
  5.5e-12, step B by CRT and the triangle inequality; brute force over
  complete periods at z = 7, 11, 13 to 3e-14). The one caveat unchanged: it is
  a period mean, not a supremum, so Lemma V proper is untouched. G2-STATE §0's
  bullet cites §§2, 9.
- **Custody closed on every scratchpad-grade figure of the day:** the rough-pair
  N3 pairing (SEC 7 of its producer, and a weighting inconsistency found on the
  way: band 1.18 to 1.42); the zone tail's cluster bootstrap and P7 model
  figure (SEC I of `zone-tail-02.js`; inflation 4.10 and 0.0285 reproduce, the
  interval [0.6848, 0.7692] differs from the red team's by a seed); the two
  owed checks on Kourbatov's b (`measure-record-null2-0829.md` §8), which
  WEAKENED that note's own headline: the 6ℤ lattice's share of b is
  law-dependent, +0.111 for the memoryless law and −0.006 for nearest
  rounding, so the null side accounts for 16 to 25% of b and no single number
  bounds the lattice; the shape assumption behind every b reading sits at
  1.6 sigma, open. TODO Z5's clause (c) rewritten as the bracket, clause (e)
  added.
- **Registries:** IMPORT-MAP rows 20 (extremal majorants, Vaaler) and 21
  (Holt-Rudd eigenstructure) at recon grade, nothing opening; the PRIOR-ART
  Holt-Rudd line names the printed spectrum and the mixing rate
  (SCRATCHPAD-GRADE); the sixteen escape labels landed, nine as fresh
  judgements marked as such; REFUTED.md gained three of the audits' HOLD
  rewrites as wording, the corrected covering-economy constant (7.182 with
  a = 3.5911 the root of a·ln(a/e) = 1, computed in the producer now, and
  `attack-hybrid-bound.js` re-embedded on the same constant), and the
  smoothness row's underived "≳ 0.4" replaced by the record's own ratio
  criterion (C̃/K ≫ 100), with a rider at `attack-bilinear-transplant.md`.
- **The question ledger's TODO guard now covers the day:** nine notes
  re-pointed from `todo: none` to the item their move executes (0, Z2, Z4,
  Z5, Z7, 9), four Ledger lines extended, Z7's Ledger line created (it had
  none), the index regenerated at 424 questions over 451 notes.
- **Wording HOLDs applied by the orchestrator, each verified by a red team or
  an audit:** the localized margin band in five files (ZONE-POSTULATE,
  maxgap-law, LOCALIZED-GAP, FOLD-PROFILE, TODO: "flat at 3.2 to 3.7" was
  narrower than either engine; the band is 2.9 to 4.2 and the honest worst
  case x²/(4.2 ln³x), audit A6 landed after nine days); the M(x, x²) label
  where M(x, x′²) stood; ZONE-POSTULATE §5's L = 1 rung (the equivalence's
  operative direction rests on T* = G₂ MEASURED at four windows);
  `zonegap-02-reduction.md`'s Euclid anchor stated for F with head as the
  conditional corollary; `paper/anchored-note.md`'s factor 81 carrying its
  ensemble rider; README §Status's shift sentence (the value d = 2 is the
  structure, the constant-shift form is not, proven in the generic note) and
  its date and closing paragraph; Z₂ routed from ZONE-POSTULATE's preamble and
  the router's two tables to its HELD state draft.
- **Still owed to Chris after this pass:** promotion of the Z₂ draft (fit after
  today's fixes; scope is his call); REFUTED audit-3 line 77 and the
  G2-STATE-independent HOLDs the registries note lists; `attack-hybrid-bound`'s
  legacy READINGS advisory (nine figures not in its block, pre-existing);
  box-class runs.
- **The tail deficit's second-order word** (`measure-tail-deficit-0829.md`
  §9-§10): a Markov word built from the true adjacent-triple statistics carries
  essentially all of the order effect (ratio 0.97 to 1.06 of the shuffled-to-
  true deficit on draw-mean maxima at all three folds, against the registered
  0.30), so the tile's light tail is a second-order correlation of the gap word;
  one draw set at 29→31 shows zero variance across ten draws and is flagged
  by the note as distrusted. The C3 constructive route stays REFUTED and D5
  stays OPEN as a statement about the word; the red team's 40-draw figures
  and the 0.5438 now sit in the producer's own block (0.05 to 0.12 sd from
  the scratchpad values).
- **The day-close coherence pass** (`coherence-0829.md`: 24 changed facts at
  63 live sites; 16 disagreements, none touching an exponent, a rung or a
  verdict) and what it corrected: the localized band had been attributed to
  "two engines" when 2.9 to 4.2 is one engine's span (the second reads 2.14
  to 4.39), so the worst case across both is x²/(4.4 ln³x) with the direct
  engine's 4.2 kept beside it at every site; the zone-side margin denominator
  moved from 3.9 to 4.0 on measured bands with the unscored 4.18 excluded; the
  G₂ ≥ g ratio floor is 1.00, not 2.00; two pointers to ZONE-POSTULATE §8 item
  4 now say item 3; IMPORT-MAP's counts paragraph is scoped to the seventeen
  original rows and row 16 carries the bracket and the open shape assumption;
  TODO's rough-pair χ²/df is quoted against the binomial reference; TODO Z4
  carries the producer's cluster interval [0.6848, 0.7692]; TODO Z5's stale
  "owed" sentence replaced; the x = 37 "five independent ways" clause replaced
  by a pointer; GLOSSARY's Lemma V entry names the proven mean-square half;
  `attack-hybrid-bound.js` re-embedded with 3.5911 at all three sites; the
  escapes note's row count 69 → 67; README's in-body date. The papers need no
  correction; `wall-note.md` §2 already states the exemption sentence for
  sentence, and two absences are HOLD for Chris (the exemption in
  `moire-primes.md` §7, the killers' grading in `wall-note.md` §2).
- **The 1e12 prereg fully scored** (`zonegap-03-score.md`): a re-sweep with
  the band edge added prints [316228, 1e6), and T5 clause 2 (c3 = 4.182 ±
  0.132, all five sealed fields exact) and S1 (head/ln²p = 0.723, −0.29σ)
  both HIT, so the tally is ten sealed rows, ten HIT, zero MISS.
  `zonegap-01.js` gained an extra-band argument defaulting to empty (its
  1e11 tail re-embedded to the same out-sha256); the inlined 41-record ladder
  that forces the derived engine at 1e12 is still owed. TODO Z7 (2) updated.
- **The embed backlog, the cheap half** (`embed-backlog-0829.md`): 29 legacy
  scripts bound by `embed.js` and `--check`-verified, no-output-block 34 → 5
  (the five remaining are priced above ten minutes), zero forces, the three
  legacy PASTED OUTPUT blocks reproducing their fresh runs with zero differing
  lines, `attack-hybrid-bound.js`'s nine advisory figures all roundings.
  Recorded and NOT edited, per the rule that a readings block is never made
  to match: `attack-beta2-03-exact-strata.js` reading 8 says F_meas at u = 3
  is "flat at 1.04 to 1.07 across y = 7..23" where the fresh block prints
  1.102 at y = 7 (the 1.07 is the y = 11 row); and `h2-lower-ladder.js` can
  never reproduce its out-sha256 because its `secs cum-secs` header defeats
  the timing scrub (mathematics columns exact, timing only). The 181
  readings-not-traceable advisories stand as before.

## 2026-08-29, night — the refuted registry audited row by row, and Lemma V's mean-square bound ruled PROVEN

*(Chris: "take a pass on refuted claims to see if we were wrong". Four audits,
`refuted-audit-0829-1/2/3/4.md`, re-derived all 67 closures of
`research/REFUTED.md` at their records: 40 SOUND, 27 SOUND-NARROWER,
0 WEAKENED, 0 UNSOUND. No route reopens. The closures were right; a third of
the one-line clauses claimed more than their records carry.)*

- **REFUTED.md, 25 clauses rewritten** (`applied-0829-refuted.md`, every old
  string matched verbatim once, table still 67 rows): a transposed quantity
  (the row said δ exceeds the forced scale where the record says ρ/F does), a
  "search is finished" where the record says the owning-convention row does
  not exist, a post-hoc reading quoted as registered, a mis-blamed mechanism
  for the transport not chaining, a crossing at x = 11 quoted as 13, a
  log-log slope quoted "per level", the fractional-retention closure widened
  to the corollary that does apply, and the rest of the same kind. Seven
  proposals HOLD for Chris (a reopening is proposed by none of them).
- **Lemma V's mean-square bound (row 16, G2-STATE §0, attack-AB-bounded.md
  §1.1).** Audit 1 asked whether PROVEN was a rung inflation, since the record
  self-graded its chain INFERRED and cited Opera de Cribro 6.18, whose
  hypothesis needs s ≥ 9 against the corpus's s in [2.0, 3.4].
  `redteam-0829-theorem1.md` re-derived the three steps: PROVEN for every
  z ≥ 3 and s > 0, for any weights on divisors of P(z) with |λ_d| ≤ 1 (exact
  by construction for rosserSupport); the record's grade is raised to PROVEN,
  G2-STATE §0's bullet separates the proven bound from the VERIFIED "never the
  binding term", and REFUTED's "published as" becomes "a published neighbour
  at s ≥ 9 for a one-dimensional signed analogue". README §Status's clause was
  not wrong and is unchanged. Not re-derived: the L1-L5 mean-square chain.
- One producer defect recorded, not applied: `attack-beta2-05-covering-prune.js`
  declares a = 3.594 as the root of a·ln(a/e) = 1; the root is 3.5911, so the
  divergence constant reads 7.182, not 7.19 (audit 2 §2; nothing downstream
  turns on it).

## 2026-08-29, evening — the measurement wave red-teamed and applied; the live layer catches up on Z4, Z5, Z7, the Z₂ band and the x = 37 coincidence

*(Chris, mid-afternoon: continue autonomously toward the wall, keep the corpus
correct, explore all avenues of mathematics; and, later, "take a pass on
refuted claims to see if we were wrong". Ten notes landed in the afternoon
(five measurements, three compute runs incl. the sealed 1e12 blind test, two
recons, one literature read), three red teams checked them (216 claims:
170 CONFIRMED, 34 WEAKENED, 9 REFUTED, 3 UNVERIFIED; no verdict overturned),
three "applied" passes wrote the APPLY items into the HELD notes
(`applied-0829-measure-a/b/c.md`), and the orchestrator applied the
live-document items below after reading each proposal against its red team.
Wall unchanged; no route opened.)*

- **TODO.md §THE TARGET, the Z₂ line.** Stood: "Z₂ ~ (3.4..4.0) ln³p drifting".
  The sealed 1e12 prereg scored (`zonegap-03-score.md`: 8 HIT, 0 MISS,
  2 NOT SCORABLE), Z₂ = env verified at all 78,497 zones to 1e12, and the
  band means read 3.43 / 3.68 / 4.02 / 3.93, not monotone, with the decade
  [3.16e5, 1e6) unmeasured by any producer (the sealed 4.18 ± 0.13 there is
  unscored). The line now says that instead of a band.
- **TODO.md Z4.** The tail half ran in full (`zone-tail-02-0829.md`, 27,292
  zones to 1e11): coefficient 0.7522 ln²(p′²) at the top band, interval
  containing HL's 0.7574, no convergence measured; t/R resolves from 1.0619
  to 1.0298 [1.0156, 1.0443] height-matched and 1.0157 [1.0013, 1.0308]
  class-matched; head and tail independent at that n; one defect owed to the
  note itself (its head interval priced over 17,700 draws where the field
  holds 1,910 distinct openers; cluster bootstrap inflation 4.10, interval
  still inside the registered band), with the red team's correction that no
  other head bootstrap in the corpus is affected. Win clause restated as met
  by neither half.
- **TODO.md Z5.** The two un-run record nulls ran (`measure-record-null2-0829.md`,
  the first of that family inside output custody): the 15% estimator
  disagreement is the exact identity cov(−z, 1/L)/mean(1/L); the
  inhomogeneous null carries none of b; the 6ℤ lattice carries 8.6% of b (the
  argued 1.7e-4 was one order low as a share of the deficit, not three, per
  red team B); the residual 0.78 to 0.97 of b at 3.2 to 4.2 sd has no
  mechanism. First move restated; two cheap owed checks named.
- **TODO.md Z7.** Item (2) marked DONE on the laptop (the derived-engine custody
  note and the two unscorable rows recorded as owed); the tail item (3)
  struck as discharged; β(37) renumbered to (3).
- **G2-STATE.md §2, the x = 37 sentence.** Stood: "three instruments now point
  at x = 37 as a G2-side anomaly". The three are ratios sharing G2(37#) = 528;
  nine G2-free instruments read nothing high at 37; what survives is the
  blind seven-term forecast overshoot z = +6.58, unexplained
  (`measure-g2-provenance-0829.md`, red-team reproduced).
- **G2-STATE.md §6.1, a paragraph added after the headline blockquote.** The
  exponent does not rest on the eight unreproduced terms: custody-only 1.533,
  all-22 1.498, block moves ≤ 0.035, against a control range sensitivity
  0.932 to 1.233 that is wider than the effect.
- **SEARCH-CONVENTIONS.md §1, a row added** for the smooth-divisor object of
  the Var/E identification step (owed since 08-28), carrying Scourfield 2008
  as SECOND-HAND (unreachable at the page after ten channels; her 2016
  restatement read at a rendered page image) and the corrected precision
  clause: the convention does hold `O(1/log x)` asymptotics, one epsilon
  short of the `o(1/ln y)` the step needs, so the row clears neither the
  range axis nor the precision axis.
- **HELD notes, by the applied passes and the orchestrator:**
  `varE-theta2-proof.md` (the smoothness range is `u in (2, 6]`, not `u = 2`),
  `lit-smooth-divisors.md` §5 (the Scourfield precision entry),
  `object-bridge-read-0829.md` (G₂/Z₂ extended to 22 levels, 8.14 at x = 79,
  maximum 8.32 at x = 71), `object-models-read-0829.md` (D8 classified),
  `attack-roughpair-error.md` (the sub-Poisson reference is 1 − p, not 1; the
  control is RUN), `record-location-null.md` (the lattice bound measured
  wrong; its falsifier RUN and not firing), plus the three red teams' edits
  inside the ten afternoon notes.
- **Not applied, for Chris:** README §Status's constant-shift sentence (the
  generic note proves the constant-shift form is not structure, only the
  value d = 2 is: a wording matter in his own canonical prose);
  `paper/anchored-note.md`'s bare "factor 81"; `zonegap-02-reduction.md`:122's
  Euclid anchor stated for head where only the F form is unconditional;
  ZONE-POSTULATE.md:325's rung on the L = 1 equivalence; the 3.5/3.9/4.2
  margin constants; IMPORT-MAP rows 20/21 and the PRIOR-ART eigenvalue line
  from the far-field pass; Z₂'s absence from ZONE-POSTULATE.md and the router.

## 2026-08-29, later — the red teams of the four object reads applied: two live-layer corrections and nineteen edits inside the HELD notes

*(`redteam-0829-objects-gb.md` and `redteam-0829-objects-zm.md`: 156 claims
re-derived at the record, 131 CONFIRMED, 19 WEAKENED, 2 REFUTED, zero
TPC-strength labels wrong in the expensive direction, the morning's three
applied edits confirmed. Everything flagged APPLY was applied by the
orchestrator; the HOLD items wait for Chris and are listed in each red team's
§2.)*

- **ZONE-POSTULATE.md §3, the shared-term count.** Stood: "VERIFIED at all
  ten shared terms, ratios 2.00 to 8.00", the fourth distinct count in the
  corpus for one relation. Now points at `G2-STATE.md` §2 (22 shared terms,
  maximum 8.55 at x = 79) instead of carrying a number.
- **ZONE-POSTULATE.md §8, the ordering after the morning's label.** The list
  says "descending order of value" and, after the label, ranked item 4 below
  an item it says it implies. Item 4 is folded into item 3 as its specific
  form; the number 4 is kept as a pointer so older citations resolve.
- **TODO.md Z4, a cost line.** "About ten minutes" for the 1e11 tail census
  against the embedded 315.7 s; now "about five minutes of compute".
- **Inside the HELD notes (not the live layer):** `z2-state-draft-0829.md`
  regraded its §7 band arithmetic from UNSTAMPED to the stamped artifact it
  reproduces (`import-kw-01-calibrate.js`, the one REFUTED item), states the
  Euclid anchor for F(p) rather than head(p) (only the F form is
  unconditional), and marks its §5a/§5c as applied; `object-models-read-0829.md`
  carries the gap-spectrum source's own caveat on the s = 1.75 zero, the
  baseline clause on b_null = 0.167 with its SCRATCHPAD-GRADE custody, and the
  factor-81 ensemble rider; `object-g2-read-0829.md` row L5 drops the
  superseded single-base expression (the other REFUTED item; label unaffected).

## 2026-08-29 — three live-layer defects found by the Z/G object reads, applied after verification at the record

*(Four parallel reads of the two objects, one HELD note each in
`research/history/staging/`: `object-g2-read-0829.md`,
`z2-state-draft-0829.md`, `object-bridge-read-0829.md`,
`object-models-read-0829.md`. Nothing computed, no route opened. The notes
list about twenty further inconsistencies; only the three below were verified
by the orchestrator at the producer or the source and applied. The rest wait
for Chris.)*

- **TODO.md §THE TARGET, the tail's unit.** Stood: "tail ~ (0.58..0.77)
  ln²p". The estimator is `zonegap-01.js`:391, `mean(z.tail / l2(z.bound))`
  with `bound = p′²`, so the band means are in ln²(p′²) units and read
  2.43..3.11 in ln²p (`zone-tail-01.md` §3, B4 = 3.1096). The live document
  understated the tail by a factor of four against its own source and made
  head and tail look like one scale. Found independently by two of the four
  reads. Now carries both units.
- **TODO.md Z4, the tail dataset.** Stood: "The tail field has NO per-zone
  dataset at all" and "First move (tail), untouched". `zone-tail-01.md`
  produced it on 2026-08-28 (1,225 zones to 1e8, embedded) and
  `QUESTIONS.md` §1 already listed `Q-zone-tail` under Z4. Same shape as
  the `phase1-T4-maximal-law.md` example in the resume notes: the index knew,
  the item body did not. Now states what ran and what is left (the 1e11 range).
- **ZONE-POSTULATE.md §8 item 4 and G2-STATE.md §9 item 4, a missing label.**
  Stood: "prove window/G₂ is unbounded, which is weaker than route A", read as
  a cheaper sub-goal and ranked below item 3. Unbounded means
  G₂(x#) < x′² − 2 at infinitely many x, the i.o. Gap Reformulation, which is
  weak ZP ⟺ TPC by Axis A of `attack-wrongdirection-audit.md` §1. The item was
  not among the audit's ten targets. Both lines now carry the label; the item
  stays, since it is still worth wanting, it is simply not cheap.

---

## 2026-08-21 — TODO.md pruned to its charter and refocused on the zone-restricted gap Z₂(p)

*(Curation pass under Chris's 2026-08-21 directive: the body of work ordered
and cleaned of context spill, the focus moved to the new zone-restricted
object. TODO.md went from 914 lines to 587. No live question was dropped; what
left is settled material whose records already carry it, listed here per the
forward-only charter. The same pass added the three-gap-object distinction to
`G2-STATE.md` §1a, the "Zone gap" and "onset shell" entries to `GLOSSARY.md`,
and the standing future-import rule to `IMPORT-MAP.md` §0a.)*

- **TODO.md, new top slot.** The programme's focus block now heads into the
  zone gap Z₂(p) — G₂'s question restricted to the zone (p, p′²) (Chris,
  2026-08-21) — with the doubling target and the anchored-arguments attack as
  the other two top items. `research/zonegap-01.js` is cited as the incoming
  measurement artifact; no result is quoted, the slot is reserved.
- **TODO "the three artifact decisions: ALL RESOLVED" left the file.** It was
  a record, not a task: fossil-shadows' provenance declaration, genealogy's
  corrected `0.41621` table, and the two wall-clock-gate replacements, all
  bound and verified. The record is
  `research/history/staging/custody-wave3.md`, which also holds the corpus
  `0.41625` → `0.41621` digit sweep this entry used to attest (the regression
  guard is `audit-numbers.js` X3).
- **TODO "the import map is SPENT as a queue" left the file.** All thirteen
  rows of `research/IMPORT-MAP.md` have run; the map stands as the
  calibration record and its §0a now carries the standing rule the TODO
  paragraph carried (a future import gets a graded row and a circularity
  pre-check before it runs). Row 13's record:
  `research/history/staging/import-hypergraph.md`,
  `paper/proposals/prop-xlnx-lower-bound.md`.
- **TODO item 3 (the unrefereed lower bound is Chris's call) moved to the
  moratorium block**, beside the proposals registry that holds its draft and
  triggers. Same text, shorter; it is a publication decision, not a research
  item.
- **TODO's "was true until 2026-08-18" status paragraph and the "LIVE QUEUE
  AFTER TWO WAVES" preamble left the file.** Both were records of how the
  queue got its shape; the shape itself remains. The Lemma V mean-square and
  `u_sup` closures they referenced are in `research/REFUTED.md` and
  `research/G2-STATE.md`.
- **TODO item 0's DONE narratives left the file**: the maximal-law first move
  (answer NO, `research/history/staging/phase1-T4-maximal-law.md`), the
  theta-ladder-sup fixed-window refutation and rewrite
  (`research/history/staging/theta-selfconsistent.md`, riders included), and
  the ρ-maximal-law first-move record
  (`research/history/staging/rho-maximal-law.md`). The item now states the
  live target, the mandatory Lemma V rider, the first move and the win.
- **TODO item 0b's "(original)" u-frame frame block left the file.** It
  duplicated `research/U-FRAME.md` §§1-7 and `research/gate-multiplies.md`;
  the two refuted sub-routes, the structural warning and the fdecay
  census-defect rider stay in the item as one-liners.
- **TODO item E ("DO NOT SPEND HERE") reduced to a pointer.** Its four closed
  knobs (improving β₂, DP2's L and the o(1), exact-strata re-insertion, the
  covering economy/hybrid) are rows in `research/REFUTED.md` with their
  records; the elasticity table itself stays in TODO.
- **TODO item 1c's "REFUTED AS A MECHANISM" closure narrative left the
  file** (the ladder-raises-threshold clause); the record is
  `research/history/staging/fekete-1d.md` §3 and
  `research/history/staging/redteam-0820-math.md` §1.2. The item is
  re-headed on its live question, the c₂′ drift and the 22-term refit.
- **TODO item 1d's hunt narratives and window-convention riders left the
  file**; records are `research/history/staging/attack-hsub-01.md` and
  `research/history/staging/attack-block-01-ladder.md` §6. The trap windows,
  the (H-sub-pow) statement and the two paid-for traps stay.
- **TODO item 6's precision-history (cap-34 stage [E] REL retirement, the
  cap-21→cap-27 prediction story) left the file**; records are
  `research/natal-cap-34-wrap-precision.js`'s own traceability note and
  `research/history/staging/phase1-W2-cal4-routing.md`. The derived ladder,
  the MET @13 gate, the BLOCKED @17 route and both first moves stay.
- **TODO item X's mechanism history left the file** (the cap-31 calm-vs-kill
  narrative, the "84% convolution fit" bookkeeping story, the J-series
  classification history, the spent @37 RUN PLAN text): records are
  `research/history/staging/verify-cofactor-convolution.md`,
  `research/history/staging/xchannel-triples.md`,
  `research/history/staging/xchan-at29.md`,
  `research/history/staging/item-x-offset.md`. The item keeps the live
  derivation target (~3.8 and its offset), the pre-registered @37 scoring
  step, the named gaps, and every calibration rider's conclusion.
- **TODO item 4 (skeleton) and item 9 (Var/E) trimmed to charter form**; no
  content changed, the pruned sentences restated their own records
  (natal-cap-30/36, `paper/variance-note.md` §7,
  `research/history/staging/var41-prereg.md`).
- **GLOSSARY.md, X-channel entry: one self-history phrase restated in the
  present tense.** "down for two levels, then UP, so the descent this entry
  used to assert breaks at the fourth level" now reads "down for two levels,
  then UP at the fourth, so no monotone descent holds" — same fact, same
  numbers, the editorial history is this line. Producer unchanged
  (`natal-cap-35-x-multiplicity.js`).
- **New vocabulary fixed before results exist**: `GLOSSARY.md` gains "Zone
  gap (Z₂(p))" (beside the G₂ entry) and "Onset shell" (beside the Effective
  Scour entry, its tile-global dual); `G2-STATE.md` §1a gains the
  three-gap-object block (G₂ whole-tile / h₂ free-class adversary A288815 /
  Z₂ zone-restricted, definition only). The Z₂ measurement slot is
  `research/zonegap-01.js`; nothing about its results is stated anywhere in
  the live layer by this pass.

## 2026-08-20, evening — the seven held headlines integrated, with every red-team correction applied

*(Integration of the day's attack wave into the live layer, after the
three-agent adversarial pass whose verdicts are
`history/staging/redteam-0820-math.md`, `redteam-0820-empirical.md` and
`redteam-0820-structural.md`. Every retired reading below names its
replacement. The staging records themselves are unchanged, as always: the
red-team reports ARE the correction record for what they weakened.)*

- **IMPORT-MAP row 13, UNTRIED → LANDED — and the record's own yield-cap
  sentence did not integrate as written.** The staging record's §0.3/§5(3)
  claim that the covering engine "can never carry a ln-power" with leftover
  floor 1/log₂x is REFUTED as a universal statement (redteam-0820-math §3.2):
  the printed floor holds for Cor 4's own hypothesis and for FGKMT-sized
  edges, while ideal bounded-size edges permit depth m ≲ 0.434·log₂x and a
  genuine ln-power floor (ln x)^{−log₁₀5} ≈ (ln x)^{−0.699}. The row cell
  carries the corrected cap; the row verdict survives on it (0.699 of a log
  is still short of Maier–Pomerance's +1 log and two logs short of the K–K
  reading, and the C-window factor-1.97 wall is confirmed at source). The
  held theorem `G₂(x#) ≫ x ln x` entered the live layer adversary-confirmed
  (every ingredient at page image, composition re-derived, finite cover
  independently rebuilt and replayed clean, §3.3–3.4): `G2-STATE.md` §0 and
  §3a now state all three lower bounds with their grades, `GLOSSARY.md`'s G₂
  entry carries the new rung, and the registry gained
  `paper/proposals/prop-xlnx-lower-bound.md` at PROPOSAL.
- **G2-STATE, the analytic front: `H^{0.857720}` and 29.24% retired.** The
  smoothness-front pass read the hypothesis nobody had: Theorem A's own
  admissible range carries the third term `q²/N³`, supplying
  `Y_N = max(1, q/N²)` for arbitrary sequences free. The shortfall is now
  `H^{0.818235}`, the affordable rough mass 32.50% for Pascadi, and the
  `Y_N`/coefficient axis is recorded EXHAUSTED at frontier 0.393922 — the
  `Y_N`-free regular-spectrum main term binds past it by exact arithmetic.
  The old "the generous reading `Y_N = 1`" framing is retired: it was
  conservative, not generous. Forced by `history/staging/smoothness-front.md`;
  the exponent chain and every load-bearing source quote independently
  confirmed (redteam-0820-math §2).
- **The extinction law's per-fold clause: "far wider than Poisson, the law's
  one missing piece" retired in `G2-STATE.md` §0 and
  `paper/proposals/prop-thinning-null.md` §1/§5.** The missing piece is found
  and blind-validated: a deterministic fold-factor field M_p
  (= λ_derived/λ_model) with Poisson dispersion around the corrected mean,
  33/37 folds inside sealed 90% bands at a fresh pre-registered anchor
  (`history/staging/perfold-error-model.md`). Integrated with both
  empirical-red-team shrinks: anchor-constancy is stated at its
  one-replicate strength (~6–10% jitter not excluded; "deterministic" is the
  surviving model class, not a measured identity in the anchor direction),
  and the ±3√λ clause is retired for FUTURE larger-Y preregs only — the
  blind window rejects it at p ≈ 0.02 and the 2·10¹¹ window at p ~ 10⁻¹⁹,
  but it was never separately refuted at Y ≤ 2·10⁸. Future preregs quote the
  NB fold-factor predictive. prop-thinning-null regraded per the registry
  rule: grade held at WEAKENED (nothing here touches prior art).
- **Two structural facts entered `G2-STATE.md` (§4a, §5a).** The
  Mirror-Sweep Lemma, with the structural red team's wording: the specials
  are AT MOST four (three whenever w ∈ {2, p−2} — the producer's own 5→7 row
  prints a three-element set, so the original "four specials" count did not
  integrate), and the fold ladder's 31→37 single-engine caveat is recorded
  RESOLVED by the red team's independent direct-definition engine (full
  29→31 curve, six 31→37 values spanning the shape). And advmin@11 = 16,
  now with two disjoint proof stacks, entered beside the staircase floor 34
  with §2d's CORRECTED quantifier sentence — the ceiling caps bounds whose
  CONCLUSION is class-uniform, not everything that quantifies over classes —
  replacing the original inversion sentence, which conflated the two.
- **TODO item X rewritten around the offset's priced family, with three
  corrections applied in the same stroke.** The @31 σ is NOT calibrated at
  @31 (zero control draws there; seven draws at ≤ @29 bound the scale only
  to a factor ~2; the control cancels what the test statistic does not), so
  the z = −2.32 detection integrates as consistent-with, never as hardened;
  the record's "each octave bin 100σ+" is refuted as stated and integrates
  as eleven of twelve bins at 92–283σ with bin 9 at 7.5σ; and the
  cofactor-one layer law integrates as a theorem CONDITIONAL on
  pair-equidistribution (purity certified, algebra exact, equidistribution
  measured at 0.1–0.2× Poisson scale), not as "derived exactly". 4S₂ − S₃
  stays POST HOC with its blind test sealed at 0a7dd73
  (redteam-0820-empirical §T2).
- **"Each new ladder-known x raises 1d's TPC threshold" retired as a
  mechanism** — in TODO 1c's win clause, TODO 1d, and IMPORT-MAP row 9's
  cell. It is certified false for every possible enumeration outcome at
  47/53/59 (the greedy floors cap those windows below the custody max
  1.3555, which is frozen); what moved the operative threshold to 1.3946 at
  b = 66 was the ADOPTION of the trusted A144311 terms — the x = 61 riser
  fired at trusted grade, robust across three Wang-2024 terms, the exact
  figure resting on a(18) alone (`history/staging/fekete-1d.md` §3,
  redteam-0820-math §1.2). TODO 1d also gains the proven bounded-defect
  Fekete lemma with (H-mono) discharged; (H-sub) is named as the route's
  single remaining gap.
- **`research/attack-0c0e-01-deleted-family.js` reading 5: "the argmax sets
  carry no arithmetic pattern" REFUTED** — they are mirror-closed under
  a ↦ (w−a) mod p at every fold from 7→11 up, with 5→7 the licensed
  seam-striking exception, verified independently by the structural red
  team's own recompute of the embedded sets. Corrected by a dated banner in
  the READINGS region; the original reading text and the bound tail are
  untouched, and `embed.js --check` re-verified all three fingerprints by
  full re-execution.
- **`REFUTED.md` gains five rows** (the day's closed routes): class-uniform
  joint caps at the origin; manufacturing the smooth profile from sieve
  weights; the Kowalski–Michel–Sawin branch; the Y_N/coefficient axis past
  0.393922; literature-owned special-level constructions.
  `SEARCH-CONVENTIONS.md` §1's Lemma V row now records the KMS branch closed
  rather than unexplored. `G2-STATE.md`'s DEAD paragraph recounted to
  sixty-three routes.
- **The TODO queue.** A new top attack added — the anchored-arguments
  attack: compose the Mirror-Sweep Lemma, Cofactor Rigidity and the
  birth-canal structure into an anchored-aware floor family that
  class-uniform caps provably cannot reach, starting at @11 where the exact
  adversarial witness is known. And the import map is recorded SPENT as a
  queue: all thirteen rows have now run.

## 2026-08-20 (fifty-third pass), the external-data audit applied: two more series adopted, one drift refused, and a monotone that never was

*(Application of `history/staging/external-data-audit.md` items H3, M1, M2,
M3, L1, L2, L4, under the series rule of 2026-08-20; H1 and H2 were applied
earlier the same day. Every finding was re-verified at the record before the
edit; two were only half right.)*

- **ATTACKS2 row 7, the seam-ladder scale reading retired and replaced.** The
  35-term verdict — "growth tracks the HL scale ... 'Matches' overstates a
  ratio spanning two and a half orders of magnitude" — is superseded by the
  500-term reading on Cami's b-file (`research/a060256-seam-ladder.js`,
  custody overlap 35/35 exact): slope of ln m against ln scale
  0.9756 ± 0.0281, per-level drift +0.00004 ± 0.00040, and m/scale matching
  Exp(1) on every moment (mean 0.992, median 0.692 against ln 2, mass below
  ln 2 = 0.504). The old caveat's scatter was the waiting-time distribution
  itself, not evidence against the scale.
- **ZONE-POSTULATE's guard (and PRIOR-ART's Kourbatov bullet), from eleven
  decades to record-exact.** "Nothing in eleven decades hints at the
  postulate being tight" now carries the full published record ladder
  (`research/a113274-gap-records.js`, A113274 + A113275 adopted): 0 of 82
  records reach 0.76 ln³p, worst load 0.8434, and the run's 8,042 extreme at
  p = 65,095,731,749 is record n = 41 of that ladder — published gap 8,040,
  the 2 being a lesser-to-lesser versus lesser-to-upper convention shift
  caught by the adoption guard.
- **G2-STATE and two-class-lower-bounds §9: "g(x#)/x² falls monotonically
  over all 50 exact terms of A048670 ... to 0.0145 at x = 229" retired as
  doubly wrong.** The count was stale (58 on the entry face, 64 with the
  b-file tail), and the monotonicity was never true at any count: 21 of the
  63 steps rise (first at x = 11 → 13, 0.1157 → 0.1302). Both sites now
  state the trend — 0.240 at x = 5 to 0.0115 at x = 311 over 64 published
  terms, with the upticks counted.
- **two-class-lower-bounds §preamble: "fidelity is measured only up to
  x = 41" retired.** `research/greedy-oracle-validation.js` measures it
  against A144311's published optima to x = 79: exact through x = 43 (and at
  the published x = 53), −0.024 per level beyond, honest frontier near
  x = 53. The sentence now says so.
- **OBSERVATIONS' "where the first maximal gap sits ... is unexamined"
  retired — the two numbers in the same sentence were the answer.** The
  2.43% at 13# and 0.01% at 19# are the `pos` column of
  `research/exact-g2-ladder.js` (731 of 30,030; 659 of 9,699,690), recorded
  at all fourteen levels, and it already refutes "near the start" (34% at
  23#, 19% at 29#); the one-class half is answered in print by Gerbicz's
  u(n) table on A048670 (smallest starts = A049300).
- **A048670 extended 58 → 64 where it could be without drift, and refused
  where it could not.** The b-file tail a(59)..a(64) = 978..1110 (Bozek,
  single-witness; 58/58 overlap exact) entered `exponent-control.js` (fits
  index-pinned to the 58-term calibration set, output byte-identical,
  re-embedded) and `audit-numbers.js` (calibration windows pinned to 58,
  now 243 checks). `maxgap-law.js` was NOT extended: its fits consume the
  full array and the re-run shifts quoted figures (the c1 drift slope on
  the top window moves 0.1198 ± 0.0279 to 0.1221 ± 0.0232, the full-ladder
  drift −0.1280 to −0.1091) — held for the queued refit rather than
  integrating a drifted number.
- **natal-cap-04's ladder compared at its owning convention at last.**
  w(k) ≥ A008407(2k) at all 17 terms, equality only at k = 1, 2, excess
  growing 16 to 236, and no 3-term run of the ladder appears in A008407's
  342 published terms at any offset or stride. The ABSENT reading is
  calibrated; NATAL-CAP-CAMPAIGN row 4 updated.
- **Two audit findings corrected in the applying.** THE-DIALS' "nineteen
  terms of Ziller-Morack's h₂" was not a stale count but the fit's actual
  dataset (p in [5, 73], of the 21 published) — the sentence now says which;
  and G2-STATE:701's "50" was not merely inconsistent with 58 — the claim it
  counted for was false, per the monotone entry above.

---

## 2026-08-20 (fifty-second pass), the seven queued questions settled on Chris's instruction

*(Chris, after a first read of the decision documents: "settle them based on
our best understanding." Decisions recorded here; the paper-voice edits follow
the house style guide.)*

- **Q1, the √m law's two settings: two objects, not a contradiction.** The
  seven-level refutation is measured on the cyclic TILE family; the
  head/anchored window setting shares the formula and not the constants, and
  U-FRAME's no-transfer rule is the reason both statement sets stand. Both
  sites now say so.
- **Q2, bind vs reconcile: reconcile first.** The four unbound producers
  (exponent-control, origin-excess, maier-matrix, two-class-lower-bounds)
  run to scratch, their tables diff against the six quoting documents, and
  only a clean diff binds — executing now.
- **Q3/Q4, beta2-note: rewritten, not deleted.** The thirteenth term's
  paragraph now leads with A144311's 2009 priority for the shifted value and
  claims what the note actually owns — custody: two full-period maximality
  searches on disjoint natal masks, the position certificate, and agreement
  with a method sharing no code, three directions in all.
- **Q5, the H* ladder: given a live home** — sift-limit-attack §7a-quater,
  with the semiprime ladder, θ ≈ 1.41, the proven 2/√e floor, the
  NOVEL-SO-FAR line with its conventions, and the union-bound reading.
- **Q6, the secs column: WIDEN the volatile list, timing-only** — consistent
  with the standing wall-clock policy; folded into the gate-repair wave
  along with the new min-rule's lookahead miss.
- **README §Status voice pass done**: the K–K lower bound (two logs above
  the free one, checked twice, not refereed) and the sealed-forecast
  programme with its deliberately mixed ledger now sit in the one-paragraph
  state.
- The HELD grades did not move: a first read is not the read the holds
  await, and no grade moves on it.

---

## 2026-08-20 (fifty-first pass), the constants audit: the most-quoted number has no custody, and a novelty claim in a paper is false

*(Verify-the-verifier lane 3 + cross-document constants edition 2; report at
`history/staging/constants-audit-2.md`; section X — 125 first-principles
checks — entered the regression net at `f792713`, total 242.)*

- **A2, the finding with the widest reach**: the corpus's most-quoted
  measured number, the exponent pair 1.54/1.57 (51 live sites), traces to
  `exponent-control.js`, whose output block opens "REAL OUTPUT, pasted" —
  hand-pasted, never embedded. `origin-excess.js` and `maier-matrix.js`,
  which feed six live documents, are likewise unbound. All four named
  producers go to the embed wave with reconcile-before-bind ordering.
- **Fixed in place**: four sites attributing the h₂ control's 1.57 to G₂
  itself now read 1.54-with-control (GLOSSARY, ZONE-POSTULATE, THE-DIALS;
  README already reconciled); G2-STATE's "halves the band" → 71.4%;
  theta-ladder's coupled-route constant re-pointed from Ford–Halberstam's
  5.2974 to K_BF = 5.1581; IMPORT-MAP row 4's spent blind tests written
  into the cell; the A1 check's stale label ("break-even 1.2417") now says
  what it actually checks.
- **Held for Chris (authorial)**: beta2-note:62 claims the thirteenth term
  is new — A144311 published its shifted twin in 2009 and G2-STATE already
  carries the correction; the surrounding paragraph is about certificate
  custody, so deletion-vs-rewrite is his call. Also his: the paper
  UNDERSTATES its own custody (two disjoint-mask enumerations exist).
- Reversed on recompute, recorded to the auditors' credit: TODO's @29/@31
  residual and the √m-law flags were RIGHT as written; the seeded worry
  about 4.26645-vs-4.2665 printing was unfounded (zero offenders).
- Canonical print rules adopted: β₂ as 4.2665 prose / 4.26645 arithmetic /
  never "4.2665…" with an ellipsis (it rounds up); the break-even always
  printed with its numerator K; H-law fits named by their basis.

---

## 2026-08-20 (fiftieth pass), the registries and the reading path catch up with the wave

*(Consolidation audits 2 and 3 of 4 applied — `audit-registries.md`,
`audit-reading-path.md` — plus the mutation-test's three live §-defects.)*

- **REFUTED.md grows to 58 rows**: eight added for everything closed after
  Tuesday evening (the bounded-differences family, lonely runner + BRS,
  distortion, BGT, the sofic shape claim, the tail factor, the twice-blind
  linear rule, Chen–Stein + super-W); row 31's date corrected to 08-18; the
  header gains the registry links and the producer-path record kind; six
  bare staging names prefixed.
- **The import map is internally consistent again**: row 7's circularity
  cell corrected to TPC-STRENGTH, the counts paragraph recounted with
  priced-vs-banked separated, §2's "every row is UNTRIED" reversed, §3 row
  1's "the form survives" contradiction fixed and the H series extended to
  seven levels, outcome clauses beside every pre-registration in §3 and §4
  (row 4's kill FIRED; row 5's kill did not fire and its inference was
  inverted — both now say so in place), the prune rule amended rather than
  violated, and the PROPOSALS crosslinks added in both directions.
- **TODO re-grounded**: item 1's counts (3 of 200, not 12 of 126), item 0c's
  dead laws named dead with the pair re-keyed twice, item 1c re-aimed at 47#
  with the greedy head start, item 2/9 carrying Var(41)'s decline and fix,
  item 6's precision routing replaced by the derived ladder (T₃ hurts 4×
  more than T₄; the old @17 rerun is blocked as stated), item X's census
  marked spent through @31, the moratorium block retiring the duplicate
  OEIS draft and naming the proposals registry, and the standing compute
  note gaining the wave's three new levers.
- **Three §-references the refs check is structurally blind to** fixed by
  hand (SEARCH-CONVENTIONS §4.7 → §4.5, natal-cap-10's §6.5 pair,
  anchored-calm's §P6 → §Proposition E), and covering-dive citations moved
  to its actual §Q headings.
- **Proposal hygiene**: prop-tailcount's false absence sentence replaced and
  its trigger precondition scored (fired; trigger does not); prop-anchored
  regraded in place (row 7 moved its price trigger AGAINST; grade held);
  PROPOSALS' prior-art paragraph recounted to the four surviving gaps;
  the K–K draft's ageing markers and absence expiry set.
- README's status re-dated with the u_sup closure and the four registries
  named; the router gains the proposals question row, theta-ladder moves to
  SPENT, and f-decays' router cell carries its DEFECT banner.

---

## 2026-08-20 (forty-ninth pass), the front door refreshed: §0 rewritten, the CHRONICLE gains its missing chapter, the README map completed

*(Consolidation audit 1 of 4; record at `history/staging/audit-front-door.md`.
Two more front-door items await Chris or a later pass: README §Status is his
voice and needs his call on which headlines survive into one paragraph, and
CHRONICLE's Day 6 — 2026-08-18 — is still unwritten.)*

- `G2-STATE.md` §0 replaced wholesale: the 4.2665 → 2 headline unchanged;
  the PROVEN / MEASURED-blind-validated / DEAD-by-family / one-live-front /
  compute-lever structure, every claim with its record pointer. The old §0
  stopped at "two waves of parallel attacks" and knew none of the
  registries, the blind-test programme, or the census defect.
- `CHRONICLE.md` gains Days 7 and 8 (the registries, the eleven-agent wave
  plus its adversary, the blind-test splits, the census bug, the standing
  lessons). Known residue: the Day-1 entry still carries "G₂ (not in OEIS)"
  as a then-candidate novelty a reader meets before its 08-18 retirement —
  narrative layer, left as history with this note as the marker.
- README's file map repaired (a list item was breaking the table) and
  completed with the four missing rows: IMPORT-MAP, SEARCH-CONVENTIONS,
  OBSERVATIONS, PROPOSALS. §Status still stamped 2026-08-17, held for
  Chris's voice.
- SCRIPTS.md regenerated (235 scripts, zero orphans, 51 correction banners).

---

## 2026-08-20 (forty-eighth pass), row 7 closes with mechanism, and Banks–Ford–Tao's checkpoint programme enters the record

*(Recon record at `history/staging/row7-recon.md`; the closure's price table
is scratchpad-grade until the pre-registered §9 confirmation producer runs —
queued.)*

- Talagrand's certifiable-function corollary read verbatim at source
  (Bruhn–Joos Thm 8 p. 14, Thm 10 p. 16, pages as images): it genuinely
  EVADES the shared-draw mechanism that closed rows 3/4/10 — and dies on
  the Lipschitz constant: d(q₁) misses the theorem's slack by a factor
  growing like √N, and the published repair's exponent is ≍ ln²x/x,
  vacuous and falling. McDiarmid, Azuma, Talagrand, Warnke, Kutin and
  Kim–Vu close as a family. Both named targets were unreachable in
  principle anyway (the anchor is single-member; ρ is TPC-STRENGTH — the
  row's circularity cell corrected).
- **Prior-art find**: Banks–Ford–Tao arXiv:1908.08613 §5 already ran the
  concentration programme on this exact ensemble — five checkpoints,
  Azuma on a normalised martingale, never a boxed inequality — and their
  own "most delicate part" (primes near log x) is the defeating
  coordinate. All four papers of that family contain zero occurrences of
  Talagrand/McDiarmid, full texts scanned. SEARCH-CONVENTIONS gains the
  row, plus a balance-function row for maxsum − minsum.

## 2026-08-20 (forty-seventh pass), row 12 closes: the lonely runner's own wall is our configuration

*(Recon record at `history/staging/row12-recon.md`.)*

- The multi-obstacle lonely runner is answered in print with the union
  bound EXACTLY tight (Perarnau–Serra §11.3 via Schoenberg 1976 — Schoenberg
  unreached, so no REFUTED row yet); the shifted variant (our free a_p) is
  FALSE from n = 5 (Blanco–Criado–Santos 2026); and Tao's own account of
  the field's sixty-year-stuck factor of 2 names PRIME velocities as the
  obstruction — the escape route uses composite velocities' medium prime
  factors, which sieving moduli never have. Same wall, their side of it.
- The Birkhoff/bounded-remainder branch fails its hypotheses (rational
  rotation number; worst-possible continued fraction) AND is dominated by
  the corpus's own Level Ledger from x = 13, by 5454× at x = 29.
- **Find: the Lonely Rabbit problem** (Cusick 1972, proved Schark 1974,
  asymptotic e^{−2γ}/(n log log n)) — a closed-form extremal problem whose
  extremal object is a primorial wheel and whose constant is Mertens; zero
  corpus mentions before this pass. PRIOR-ART gains the section.
- The import map now stands at TWELVE of thirteen rows resolved; row 13
  (hypergraph covering) is the last one open.

---

## 2026-08-19 (forty-sixth pass), the fifth window is a HIT: the extinction law lands one decade blind

*(Prereg alone at `4391c2c` — anchor, ceiling, both predictions, all
criteria and every consequence fixed before the run; producer embedded, the
run re-executed in full by the embed and the verdict reproduced; record at
`history/staging/foldL-window5.md`.)*

- At W = 2·10¹¹ the last multi-kill fold measured **631** against the sealed
  band [571, 877]; counts in band; the sequence 181 → 331 → 421 → 457 → 631
  holds. The rate law's support now spans five windows and four decades of
  Y, still MEASURED. prop-thinning-null §5's fifth-window clause does not
  fire and is now scored in place; the grade stays WEAKENED (prior art).
- Fixed consequences applied: the hot systematic (five of five windows at
  0.75–0.87) now belongs IN the law as a known ~20% count overprediction;
  the per-fold ±3√λ clause FAILS at 43.2% — aggregate right, per-fold
  dispersion far wider than Poisson, the law's one missing piece; the full
  sweep to 2999 shows the old fold ceiling was never binding (last θ ≤ G₂
  at 1039), so the extinction is arithmetic.
- Quarantined per the prereg's own §3.5: the Stein-derived pair predicts the
  window's total count at ratio 0.9961 against the fitted pair's 0.9527 —
  recorded, not scored.

---

## 2026-08-19 (forty-fifth pass), T₃₁ corroborates the kill, and the tail factor dies by sign

*(Prereg alone at `cde163a`; record at `history/staging/scanstat2.md`;
T₃₇'s registered post-hoc refit run with the measured H(T₃₁).)*

- H(T₃₁) = 0.3460 ± 0.0068 misses ITS sealed band [0.3508, 0.3680] too —
  two blind levels, two engines, one verdict: the linear-in-ln D rule is
  dead, and the DERIVED-CONSTANT claim on IMPORT-MAP row 1 is withdrawn. The
  seven-level series 0.2661 → 0.3565 bends below every line (the post-hoc
  six-level refit accommodates T₃₇ only at 2.20 s.e., labelled post-hoc),
  and H is a grid-dependent summary of a curve (small-m concavity at all six
  levels, up to 2.61 s.e.) — no single exponent should be quoted.
- The tail factor √(2 ln D) and its one named repair √(2 ln θD) are REFUTED
  by magnitude AND by sign: the measured level sits ABOVE the θ ≤ 1 ceiling
  at small m and the residual widens with D. New method banked: streaming
  extremal index from sliding-maximum histograms (θ measured at T₂₉/T₃₁ for
  the first time).
- The duality is verified at every m (1484/1484 exact on T₁₃) and the
  crossover measured: a plateau with mirrored ramps, not an arch — the
  recorded "peak at m = 742" was the top of the scatter on a flat stretch.

## 2026-08-19 (forty-fourth pass), the census had a 32-bit shift alias: f-decays is defective from x = 37

*(Prereg alone at `705c839`; record at `history/staging/fdecay-deep.md`; the
alias-free recomputation of all 42 levels is embedded in
`research/fdecay-deep-01-census-defect.js`, two independent methods agreeing
to 1.74σ; the deep-window ladder reaches x = 829.)*

- **The defect**: `a3-03-f-from-census.js` holds each prime's avoided set in
  one 32-bit word, and JavaScript's `<<` takes shift counts mod 32 — so for
  q > 32 residues alias and every (q − |A_q|) factor is under-read. T_x
  carries a prime above 32 iff x ≥ 37; the prediction was written before
  the table was read and is exact. Published points are off by 0.62× to
  1.05× from x = 37 up. **Nothing caught it because every verification
  lived at x ≤ 31** — the new standing lesson: verify at a level where the
  feared mechanism can fire. `grain-census.js` carries the same pattern,
  safe only because its levels stop at 23; flagged.
- What survives, corrected: the polylog branch call (ln L = −1.861 +
  2.864·lnln x vs published −1.884 + 2.892), the staircase theorem, Lemma
  B, the comb coefficient, and §5a step 7 (all x ≤ 31). The projected
  crossings move slightly earlier and become ranges: 719 (509–757) and
  1801 (1201–2039), form 2 at 271/839 — the published 773/2297 were also
  not reproducible from the published coefficients (pointer registered
  before measuring).
- The corrected law over 51 window levels:
  ln(1/f) = 1.917 + 1.4016·(2p/m̄) − 1.021·ln s(d_min), R² 0.9867; the
  deep-window instrument reaches x = 829 against the census's x ≈ 200
  wall, and L_win = 2 at every level 97..829 — a window can measure f but
  never L (closing the gap by length alone needs ×e^500).
- f-decays.md carries the defect header; a3-03 carries the notice in its
  READINGS; the producer's multi-word-mask fix and OUTPUT regeneration are
  queued.

---

## 2026-08-19 (forty-third pass), T₃₇: the linear exponent rule dies at 3.63 s.e., and G₂(37#) gets an exhaustive certificate

*(Prereg alone at `3d060964`-era commit `4782ef5`, sealed from the five
committed levels with T₃₁ quarantined in flight; record at
`history/staging/scanstat-t37.md`; shard moments preserved in
`research/t37-partials/`, producer embedded in --combine-only mode.)*

- **The pre-registered verdict: OUTSIDE.** H(T₃₇) = 0.3565 ± 0.0068 against
  the sealed band [0.3699, 0.3926] — a 3.63 s.e. miss, so the
  linear-in-ln D rule that was validated one level out at T₂₉ was a
  coincidence of a short ladder. The seven-point series is concave in ln D
  and the honest statement is the table, not a fitted curve.
- **What survives**: √m refuted at the seventh level (H + 3se = 0.377);
  the direction test holds; the excess kill criterion still favours the
  exponent, now narrowly (1.05), consistent with the concavity.
- **The bonus**: maxsum₁ = 528 over all 217,929,355,875 gaps is an
  independent exhaustive maximality certificate for G₂(37#) — A144311's
  twelfth term — from an engine sharing no code with the exact-ladder
  producers.
- The post-hoc six-level refit awaits the sibling's H(T₃₁), labelled
  post-hoc per the seal.

---

## 2026-08-19 (forty-second pass), the 3.8's blind tests are spent: last law standing, and not exact

*(Prereg alone at `27dc709`; record at `history/staging/xchan-at29.md`. The
segmented census validates 85/85 against the record's five levels and runs
@23 at 303× the old instrument's speed in 62 MB.)*

- **@29 is a HIT** (1 − J measured 0.028823 against the blind 0.028943,
  z = −0.90) and **@31 separates the laws**: the two pre-registered rivals
  die at 6.35σ and 20.81σ, and the closed form 4·Σ q⁻² survives as the last
  law standing — while @31's precision (σ_J = 2.4e-5) shows it is NOT
  exact: a −0.41% to −0.48% offset, the same residual 0.000119 at both new
  levels, detected only where the error bar can see it.
- "Asymptote exactly 4" gets no support from the measured ratio (3.8630,
  3.8240, 3.8427 over @23..@31, not rising). P1 (aligned super-W ≡ 0) is
  now directly enumerated at @29 and @31; J is monotone at all five levels
  (0.9025 → 0.9753).
- **A Named gap is struck**: "@29 needs 162 GB" was the in-memory
  instrument's price, not the object's — the census segments at 62 MB per
  level, and the j = 4 census is now reachable at @29/@31 by the same code
  path. TODO item X rewritten accordingly: the derivation must now produce
  the offset too.

---

## 2026-08-19 (forty-first pass), two closures score: the Neudecker trigger does not fire, and row 11 dies on arithmetic

*(Both with standalone git-committed preregs; records at
`history/staging/null-limsup.md` and `row11-closure.md`.)*

- **The extinction half survives its own trigger.** Neudecker's limsup law
  does not transfer as constant 1 on log²p — in Hawkins' sieve log p is
  simultaneously the mean gap and ln N, so the transferable statement is
  max gap ≈ mean gap × ln(points), and on ln²p the two-class constant is
  e^{2γ}/(2C₂) = 2.402607. All three pre-registered criteria pass; a
  literal reading would have predicted 53.5 against ~2000 and wrongly
  retired a sound half. Riders: real G₂ runs 0.83–1.02 of the null's
  maximal gap (below at 3 of 4, the safe direction), and the null gives an
  independent ~90–105-in-p ceiling spread confirming the 72-in-p caution.
  Also caught: the thinning and scaling records index m̄ one fold apart
  (∏_{q<p} vs ∏_{q≤p}) — both right, differing 0.5% at p = 421.
- **IMPORT-MAP row 11 formally dead**: greedy's coverage is at least
  L(1 − ∏(1−2/p)) for every L by an exact average-marginal argument, so no
  α ≤ 1 − 1/e certificate ever fires — at the decisive lengths the test
  would separate 1.000 from 0.9965 with a constant of 0.64. A citation
  error corrected: the (1 − 1/e) greedy bound is Nemhauser–Wolsey–Fisher
  part I under a cardinality constraint; part II gives 1/2 for this
  instance's partition matroid. REFUTED.md gains the row.

---

## 2026-08-19 (fortieth pass), the custody migration takes nine more tails, both stopwatches die, and a limit constant is corrected

*(Migration wave three: 12 -> 3 legacy tails. Record at
`history/staging/custody-wave3.md`. Nine files bound by `research/qc/embed.js`,
every one verified with `--check` afterwards. `node research/qc.js` stayed at
TOTAL 0 for this wave's scope; the only findings on the gate during the pass
were uncited untracked scripts from a concurrent import wave.)*

- **The two wall-clock gates are gone, and the a3-09 forecast did NOT come
  true.** `a3-09-histogram-operator.js`'s fold diagonal stopped on a 33 s
  budget; it now stops at `const DIAGONAL_MAX_P = 139`, stated in the code with
  its reason. 139 rather than 137 is the whole point: it is the level the
  2026-08-16 run reached and the last affordable one, so **both fitted constants
  reproduce exactly, 0.770 and 0.738**. The thirty-first pass entry and TODO
  item 2 both predicted they would move to 0.767 and 0.729; that prediction is
  superseded, no document carries a stale constant from this file, and those two
  sentences should be retired at the next TODO prune. A second fix was needed to
  make the block re-checkable at all: the diagonal's cost column printed a bare
  number, which `qc/tailfmt.js` cannot see as volatile, so it now prints with an
  `s`. `a3-01-misalignment-ledger.js`'s 30 s print gate became
  `PRINT_EVERY_KTH_COPY = 9`, which reproduces `copy 9/31`, `18/31` and `27/31`
  digit for digit and needed no `--force`.
- **`genealogy.js`: the asserted table was right and the limit was wrong.** The
  code now computes the six-entry convergence table it had only ever asserted,
  and all six entries reproduce exactly (0.3253, 0.3661, 0.4007, 0.4093, 0.4140,
  0.4150 at p = 13..9973), so nine sourceless figures are sourced. The arrow's
  destination is not: `2*C2*e^{-2gamma} = 0.4162145328…`, so **0.41621 is the
  bound truth and 0.41625 was never computed** — the code has always printed the
  right value. The old block is quoted verbatim in the wave record; the embed was
  forced on that one figure. The file also gained the `READINGS` banner it had
  never had. `0.41625` still stands at five sites, listed in the record:
  `paper/moire-primes.md`:266, `paper/beta2-note.md`:183 and :185,
  `research/sift-limit-attack.md`:201,
  `history/staging/attack-block-08-secondmoment.md`:352, plus a stale string in
  `attack-beta2-04-loss-budget.js`:183 that credits it to `maxgap-law.md`, which
  no longer carries it.
- **Seven tails carried material the OUTPUT region could not have produced, and
  all seven kept it.** The summary or the second invocation moved into READINGS
  verbatim with a provenance line naming the invocation that does produce it:
  `attack-beta2-04-loss-budget` (its whole eight-section summary),
  `a3-08-adjacent-pairs` (`[6b]`, the 2,620 s `--t31` run),
  `a3-10-lower-tightness` (the `deep31` and `deep37` modes),
  `attack2-rankin2d` (sections A–F over two invocations),
  `natal-cap-32-wrap-identity` (`small`/`at13`/`at17`), and header prose from
  `a3-01` and `a3-02` moved above the banner. Nothing was deleted.
- **One composite dissolved instead of splitting.** `a3-02-diagonal-f.js`'s mode
  `all` runs both legs in one process, so its tail is one invocation that also
  recomputes the five numbers it is handed. En route: passing the deep results as
  the block PRINTS them (1.844e-2, 32.2105) moves PHASE E's two intercepts to
  1.357 and 1.601; passing them at full precision reproduces the pasted 1.358 and
  1.602. The pasted block was right and the exact invocation is now in the file
  header.
- **Three tails remain and each is over budget, not unexplained**:
  `natal-cap-33-overnight` (~38 min, four run modes, and the over-budget tier is
  a concurrent wave's), `natal-cap-34-wrap-precision` (six commands sharing a
  scratch directory, ~35 min) and `natal-cap-37-at41-march` (the 6.16 h @41
  march, pasted from logs outside the repository). The last two already declare
  their provenance in full, which is the honest form for a tail of that shape.
- **Standing rider for anyone moving prose out of an OUTPUT region**:
  `tailfmt.locate` scans BACKWARDS for the last `// OUTPUT`, so a moved banner
  line below the real one steals the tail. Indent and quote it. And the
  `readings-not-traceable` advisory RISES when this work is done right (137 to
  139 here); it is not a defect and must not be driven down by deleting
  provenance declarations.

## 2026-08-19 (thirty-ninth pass), five landings integrated: two identifications owned, the spectral wall named, the 1d trap corrected, and covering closed twice more

*(Records: `identifications-prior-art.md`, `lemmaV-neighbours.md`,
`import-interp.md`, `import-distortion.md`, `import-bridge.md` — the last
three with git-provable standalone preregs.)*

- **Identifications officer**: the complementary-window duality is OWNED
  (the circular scan statistic's complement identity — Cressie 1977, Naus,
  GNW 2001) and the alternation language is OWNED at textbook page level
  (Marcus–Roth–Siegel: the B = 1 charge constraint / AMI; our strict-
  soficity argument is their §2.3 example, the capacity their §3.2 table) —
  IMPORT-MAP rows 1/2 reworded, both "banked theorem" lines now carry the
  tags. NOVEL-SO-FAR: the exponent law H = a + b·ln D (absent from the
  conditional-scan convention BY ARITHMETIC; adjacent owner is
  hyperuniformity, where no sieved-set number variance exists) and the H*
  Shearer ladder (six OEIS indexings, calibrated). Four §1 rows and nine §3
  rows lifted verbatim into SEARCH-CONVENTIONS.
- **Lemma-V neighbours read at source**: the spectral branch's wall is
  SMOOTHNESS, not strength — DI 1982 Thms 9/11/12 (via Maynard Mem. AMS 306
  Lemma 6.12, sharpened by Pascadi Forum Math. Pi 14 (2026) Cor 18) would
  clear Lemma V outright with smooth profiles on both variables; at our
  roughness both return γ = 1.5 exactly. Rows 5/6 stay CLOSED on two
  grounds. The Lemma V convention row now splits all-rough vs smooth-modulus
  branches; a level-of-distribution row added (θ < 1 always, ours 1.212 —
  negatives there are worthless). Corrections applied: the twin-constant
  record gains its preprint queue (Lichtman 3.2290, Pascadi 3.203+o(1),
  neither refereed); attack-sqrt-cancellation's well-factorable record
  superseded (x^{5/8−ε}, preprint); ojaroudi-read §8's 1512.03213 was a
  different paper by subject.
- **Row 9 (interpolation)**: BGT closes on H1, but the reframing is banked —
  the 1d defect is identically S(s)+S(t)−S(st), the exponent cancels, and
  TODO 1d's trap statement is CORRECTED: an explicit C is TPC-implying iff
  ln C < S(x) at a ladder-known x, a threshold that RISES with the ladder,
  linking 1c to 1d. The measured defect reads BOUNDED once the
  step-sampling artifact is calibrated out (a constant-defect null reads
  "growing" at the same magnitude — the +0.28 control bias's second
  signature).
- **Row 8 (distortion)**: two classes were never the blocker (BBMST Thm 3.1
  has no distinctness hypothesis; convergent Σ4/p² clears the Mertens wall,
  the first import to do so) — the AMBIENT is: primorial windows, an
  exponential interval bridge, total yield G₂ ≤ 6·2^{2(π(x)−2)}+6.
  covering-dive §6's knife-edge sentence was wrong at source (the primes
  grow strictly FASTER than the counterexample regime) and is corrected.
- **The Ojaroudi Bridge import returns ZERO new certified numbers, by
  identity**: fed the corpus's only certified L² input the chain is
  circular (loss exactly √(q/(p−1))), and even the strongest plausible
  input loses to the incumbent from x = 17 on. Free sharpenings kept:
  coprimality is load-bearing, the composite-d form is free, the summed
  ceiling sits at level 1/2 regardless of input quality, and the divergence
  rider is governed by |T_x|, not F_i.

---

## 2026-08-19 (thirty-eighth pass), the shadow's amplitude: 45% derived, the explanation replaced, and an error floor 4–6× too small

*(Prereg git-provable at `6c49f5f` — the first under the new rule; record at
`history/staging/shadow-amplitude.md`.)*

- The drift's missing amplitude is nearly half the exact-vs-asymptotic
  normalisation: divide the prediction by K(y), the squared Mertens
  partial-product error — derived, parameter-free, carrying 45.1% of the
  gap; corrected amplitude ratios cover 1 at 2σ on every binning, remainder
  consistent with zero. The drift law reads
  0.793055·(1 + (2 − 1/ln 2)·ln 2/ln y + …)/K(y).
- `shadow-buchstab.md` §4's candidate explanation is REPLACED, not
  softened: the local pair density OSCILLATES about HL (λ_twin above 1 at 4
  of 10 clusters); what had not converged was the fair share, and that is
  K(y). Route (b) confirmed route (a) on disjoint integers at 10/10.
- **Reach beyond the shadow**: the record's se(Poisson) column was 4–6× too
  small at every pooled cluster (overlapping bands oversample 35.8×;
  distinct pairs set the floor). Any pooled-band residual priced against
  measured/√N_tot anywhere in the corpus is priced against the wrong floor.
- TODO item 5 leaves the file; the verdict label stays SHAPE-ONLY.

---

## 2026-08-19 (thirty-seventh pass), Stein–Chen: the kill fires, and the arithmetic delivers anyway

*(Import-map experiment #4; record and prereg at
`history/staging/import-stein.md`, `import-stein-prereg.md`. AGG's b₁/b₂/b₃
verified verbatim at the authors' 1990 Statistical Science restatement, read
as page images.)*

- **The pre-registered kill FIRES at both objects**: b₃ runs 0.85–0.9998 of
  its own ceiling (multi-kill) and a flat 12.7–73.4× the pair terms
  (strikes), because both objects carry exactly one shared uniform residue
  draw, which the non-neighbourhood indicators reconstruct. Chen–Stein
  cannot price this sieve at any local neighbourhood — the same
  product-space hypothesis that closed rows 3/10, now measured from the
  probability side. Row 4 → LANDED, kill fired; zero derived constants as
  Stein results, per the prereg.
- **Relabelled as first-moment arithmetic, two things landed anyway**: the
  extinction amplitude DERIVED (A = 2.2091e-2 against the record's fitted
  2.4312e-2; c at 0.37σ; beats the geometric null on both), answering
  `attack-foldL-06-scaling.md` §7's "A is fitted, not derived"; and a
  zero-parameter candidate for the ~3.8 joint-deficit constant —
  1 − J = 4·Σ_{x<q≤√W} q⁻², asymptote exactly 4 = AGG's neighbourhood
  count, hitting at −0.29σ/+0.60σ with blind @29/@31 values pre-computed.
  TODO item X now carries the candidate; it is NOT a derivation (the route
  that would derive it is the one the kill voided, and the super-W
  decomposition was tested and REFUTED).
- Custody: 23/23 record figures reproduced; W(0) = X_p at 237/237 folds.

---

## 2026-08-19 (thirty-sixth pass), the adversarial pass: nothing broken, three verdicts corrected in the sentence, and a closed form found

*(Refute-first pass on the four headline experiments; record and producers at
`history/staging/adversary-wave2.md`, `research/adversary-wave2-0*.js`.
Against the 4-in-5 base rate, every arithmetic claim reproduced — three from
code sharing no line with the original. Every defect found is in a sentence,
not a number. Live-layer integration applied with this pass.)*

- **Shadow**: verdict corrected DERIVED → **SHAPE-ONLY** by the prereg's own
  rule (y ~ 1000 misses D1 at 1.49×; deciding levels may not be narrowed
  after measurement); the drift's AMPLITUDE is ~2.6× the prediction and the
  record had not reported it — now TODO item 5's one residual; the
  coefficient has a closed form the record missed, **2 − 1/ln 2 =
  0.5573049591**. GLOSSARY, ATTACKS2 and anchored-windows now carry the
  drift law in corrected form; anchored-windows §5 is RECOVERED (32/32), §3
  still is not; fossil-shadows.js got its provenance declaration (one of
  TODO item 2's three decisions, closed).
- **Scanstat**: "T₂₉ never computed here" was FALSE (a3-04 published
  maxsum_m(T₂₉) m = 1..8 on 2026-08-16; the new run reproduces it digit for
  digit, so the anchor is a reproduction) — but the blind claim SURVIVES on
  substance: H backed out of the prior rows is 0.2100 ± 0.0274 vs measured
  0.3367, no leak possible. Precision corrected: 1 residual df, 95% band
  [0.281, 0.396], T₁₃-sensitivity 0.94 s.e.; the kill of √m is safe. The
  duality upgraded to exact at all 1484 m, flagged as the standard circular
  complement identity with no prior-art search yet.
- **Sofic**: SURVIVES clean — the only one; the adversary strengthened it
  (all-M soficity closure; paired slope test t = −14.18).
- **Shearer**: identity, H* ladder, floor and quarantine all held;
  completeness IS forced given the frame. Corrected: the tightness witness
  is arcs end-to-end on ℝ/ℤ, not disjoint intervals; the A–I leg's atomicity
  lemma has an unproven hypothesis here and the closure runs through the
  sequel's unconditional γ_i ≥ μ(f_i) instead (IMPORT-MAP rows 3/10
  re-worded); exact pair independence needs the primorial | H, not x².
- **Process finding, now a standing rule**: pre-registration custody was
  PROVABLE for one experiment of four (Shearer — prereg committed alone,
  before the producer existed) and only DECLARED for three (same-commit;
  mtimes order correctly). A prereg must be committed alone, before its
  producer exists, or it does not prove priority.

---

## 2026-08-19 (thirty-fifth pass), the ℓ¹→ℓ² programme closes: the conversion is the maximal law

*(Import-map experiment #5; record and sealed pre-registration at
`history/staging/import-l1l2.md`, `import-l1l2-prereg.md`.)*

- The pre-registered kill line (ρ ≥ 0.5 everywhere) does NOT fire — ρ falls
  0.4352 → 0.0645 over z = 13..41 — and the prereg's own §2, sealed before
  any number existed, records that the criterion's inference was inverted:
  Cauchy–Schwarz makes the flat family the favourable case, so a low ρ is
  not a survival.
- What closes rows 5 and 6 instead: ‖Θ·S_H‖₂ = rms(R_H) exactly (Parseval,
  checked to 1.2e-15), so any ℓ¹→ℓ²√log theorem here IS the sharp maximal
  law sup|R_H| ≤ C·rms·√(2 ln W) — and C_true = 0.5634–0.9215 sits BELOW
  C_crit = 1.358–2.225 at every level, so every true version is
  TPC-implying. The certificate route's retirement (theta-ladder.md §5b)
  said the same of the same law; this is its arrival from the ℓ¹ side.
- Banked constant: ‖Θ‖₁/‖Θ‖₂ grows 2.01 per added prime against S_sat's
  measured 2.0516 — the C^{π(z)} price measured twice from independent
  definitions, 2% apart. Mechanism split: within-modulus flat, all decay
  across moduli.
- One flag for the next adversarial round: the closure's interpretive step
  (the criterion inversion and the C_true/C_crit reading) is the record's
  own analysis, held to the same standard as the other four headlines.

---

## 2026-08-19 (thirty-fourth pass), four experiments land and the map regrades itself

*(The evening fleet's first four experiment verdicts; records at
`history/staging/import-scanstat.md`, `import-sofic.md`, `import-shearer.md`,
`shadow-buchstab.md`. Registry rows regraded per the map's own rule; the
headline claims are HELD out of the live layer pending an adversarial pass.)*

- **Scan statistics (row 1 → LANDED).** The kill criterion passed at T₂₃ and
  at the blind level T₂₉ (H = 0.3216/0.3367 against √m's 0.5, misses of
  0.37/0.21 s.e. on a pre-registered rule). The map's own offered identity
  was adjudicated: TRUE as an identity, its conclusion REFUTED by a
  permutation-invariance counterexample. Banked instead: the
  complementary-window duality maxsum_m + minsum_{D−m} = W.
- **Sofic shift (row 2 → LANDED, the shape claim dies).** The graph is exact
  and strictly sofic (capacity ln 2, p-free), but the map's rate formula
  fails its own flatness kill (t = 2.69), its constant arithmetic substituted
  p for ln D, and the measured qualifying fraction falls 170× where 3/p
  falls 16× — the first-moment L is polylog, a downgrade of U-FRAME §12's
  reading, not the u-frame's shape.
- **Shearer (rows 3 and 10 → route CLOSED).** On the complete dependency
  graph Shearer's exact criterion IS the union bound (Scott–Sokal Ex. 3.1):
  the wall is x = 13 as an identity (the map's "wall at x = 7" was the
  sufficient asymmetric LLL only — its rider was wrong twice), Regts's
  zero-free polydisc reaches exactly to Mertens, and the family closes by
  three mechanisms, not one (tightness / chordality + exclusivity /
  atomicity). REFUTED.md gains the family row; import-suen §8(ii)'s
  "strictly stronger than the union bound" now says SUFFICIENT condition,
  with the exact criterion named as the eighth Mertens arrival.
- **Kill shadow (TODO item 5, first move done).** The band-averaged
  pair-Buchstab candidate scores DERIVED above y ≈ 1400 on a pre-registered
  tolerance (D1 9/10, D2 8/9, D3 10/10) — and the item's premise was stale:
  `attack2-03-09-depth-formula.js` had already computed the candidate on
  2026-08-18. The sharper finding: **0.85 was never a constant** — the band
  is a shrinking interval in u, the depth drifts 0.850 → 0.823 over
  y ~ 1000 → 26000 along 0.793055·(1 + 0.5573·ln2/ln y), and "stable at
  every level" was an artifact of never leaving y ≤ 1000. anchored-windows
  §5 reproduces 32/32 from a code-independent instrument. The fossil
  stratum is a corollary of the proven Exact Invariance Lemma; only the
  birth depth is empirical. GLOSSARY/ATTACKS2 corrections and TODO item 5's
  retirement are HELD for the adversarial pass.

---

## 2026-08-19 (thirty-third pass), the Hawkins primaries: six papers read, a date error fixed, and the null's twins and gaps are owned

*(Primary-source read; record with verbatim quotations at
`history/staging/hawkins-read.md`.)*

- **Date correction, load-bearing**: the formalisation is Neudecker–Williams,
  Compositio Math. 29 (**1974**) 197–200 — no 1979 item exists in the
  tradition. Fixed in `SEARCH-CONVENTIONS.md` §1 and
  `paper/proposals/prop-thinning-null.md`; the frozen officer record keeps
  its 1979 and this entry is the correction.
- The decisive check is run and clean: **no two-class or k-residue variant
  anywhere in the tradition** (calibrated zeros across six full texts). New
  ownership absorbed: the moment-recursion technique, a joint-minus-product
  null expansion, the general-rate family (our 2/n inside Lorch's
  "Hawkins' p-primes"), the random-sieve twin THEOREM (Wunderlich 1974, no
  singular series), and the null's maximal gap — Neudecker 1975's
  lim sup gap/log²p = 1 a.s. The proposal stays WEAKENED with a new
  pre-registered trigger: score the extinction analysis against Neudecker's
  limsup law before any write-up.
- What sharpened in our favour: the tradition asks the deviation question
  out loud and never answers it (Bui–Keating p. 2; Neudecker–Williams
  p. 199) — Ψ − Φ² answers a published open question rather than duplicating
  a published answer.
- The Daley–Vere-Jones thinning citation is now known unusable as cited
  (no thinning-titled chapter in Vol. II; the substitute route also fails);
  `import-thinning.md` §1.1 needs a section number or a different source.

---

## 2026-08-19 (thirty-second pass), the KLZ walk: one citing work, no Part II, and the control is OEIS A023192

*(Forward-citation walk of arXiv:2205.08273 by API; record at
`history/staging/klz-forward-walk.md`.)*

- The forward graph holds ONE citing work (three indexes agree once walked by
  DOI — S2 splits preprint/article records, and a wrong-DOI guess returns a
  convincing false zero); no multi-class complexity anywhere; KLZ Part II is
  not out after four years.
- **The one-class complexity column is OEIS A023192** (Wilson's
  infinitely-recurring prime patterns), 13/13 against its b-file — the OEIS
  owning convention for our cpx sequences was the prime-pattern family all
  along, not the B-free one. The two-class sequence returns nothing there at
  three calibrated indexings; §3.3's "no owning convention was identified" is
  superseded and the negative now carries weight.
- `import-bfree.md` §3.3 upgraded: `cpx₁(n) = cpx_{X_ℙ}(n)` EXACTLY (KLZ
  §1.2 counts subsets and heredity is proven for us by the mod-6 lemma,
  union == subset verified n = 1..20), so eq. (8) sandwiches our measured
  sequence from both sides. §10's open search item retired.
- The exponent-shape claim's status sharpened: the upper bound 2^{cN/(log N)²}
  transfers cleanly from KLZ §5.1's published argument with ω(p) = 2; the
  lower bound's natural witness is the twin primes themselves — the
  circularity §10 flagged is confirmed, not dissolved.
- The officer's "Kułaga-Przymus misattribution" adjudicated: none exists; the
  instinct traced to her being first author of the one citing work, with a
  DIFFERENT Lemańczyk (Michał, not Mariusz) as second author.

---

## 2026-08-19 (thirty-first pass), the custody migration takes three more tails, and finds a second stopwatch

*(Migration wave: 15 -> 12 legacy tails. `05-twin-jacobsthal`,
`h2-length-needed` and `natal-cap-36-skeleton-door` bound by
`research/qc/embed.js`, all three verified by `--check` immediately after.
TOTAL stayed 0 throughout; the only findings on the gate during the pass were
uncited new scripts from a concurrent import wave, not from this one.)*

- **The blocker in all three was material sitting INSIDE the OUTPUT region that
  the run does not produce, and in none of them was it a number that moved.**
  Each was moved verbatim above the OUTPUT banner, where the code hash covers
  it and no embed can overwrite it: `h2-length-needed`'s paragraph recording
  the pre-A048670 run (1.2604 through 1.2999), `natal-cap-36`'s P6 block, which
  is the separate `--at29` invocation (11.3 min) and not the default run, and
  `05-twin-jacobsthal`'s 29# row, which line 54 stops short of producing and
  which `05b-twin-jacobsthal-segmented.js` already carries in its own bound
  tail. Nothing was deleted.
- **Every load-bearing figure reproduced.** `natal-cap-36`: 145 of 145 figures
  of the legacy block, the P4 rows included, where the paste had merged three
  printed lines into one and written `1.9e1` for the printed `1.9e+1`.
  `05-twin-jacobsthal`: 46 of 46, the seven belonging to the 29# row aside.
  `h2-length-needed`: every data figure, with two lines the old paste had
  dropped now present.
- **`a3-01-misalignment-ledger.js` is a second `a3-09`, and is left
  un-migrated.** Its fold-31 progress lines are gated on a 30 s WALL CLOCK
  (line 133), so which copies print depends on machine load, not on the
  computation: an embed attempt on a loaded machine failed to reproduce
  `copy 9/31`, `18/31` and `27/31`, and a quiet re-run 40 minutes later
  reproduced all three digit for digit. Everything else in that tail
  reproduces (125 of 127 figures; the other two are `10000` and `429` from the
  header prose). The fix is the same as `a3-09`'s: a deterministic gate, then
  re-run and embed.
- **`attack-beta2-04-loss-budget.js` carries no sourceless figure.** Its OUTPUT
  region is an eight-section summary written by hand from a 531-line run, and
  every one of the 12 figures a re-run "does not produce" is that summary's own
  rounding of a figure the run prints: 0.8824 for 0.882353, 0.8462 for
  0.846154, 2.2e-16 for 2.2204e-16, 1.65-1.74 and 2.55-2.57 for printed
  columns. It is ready to bind the moment a reader decides where the summary
  lives.

## 2026-08-19 (thirtieth pass), Ojaroudi read at source: the frame is ours, the theorem is not proved, the absence resolves our way

*(Full read of the Zenodo deposit, v4 end to end, v5 diffed at every
load-bearing passage; record at `history/staging/ojaroudi-read.md`.)*

- His T_i IS our tile, his lift-and-delete-two our fold, his recursion our
  Copying Theorem, and his |T_i| column our D_x to the digit — custody clean
  in both directions (his Appendix A reproduced cell for cell here).
- His twin-prime theorem is NOT proved: the load-bearing step imports a
  Selberg quadratic-form LOWER bound from Opera de Cribro Ch. 7, where none
  exists (the Λ² sieve is one-sided; the same book's Ch. 16 proves why). A
  second independent gap in his Kloosterman range. PRIOR-ART.md carries the
  verdict in the parity row and a new section.
- `discrepancy-two-class.md`'s absence RESOLVED in the note's favour: his
  discrepancy is L² over residue classes (AP-variance), not our signed
  interval sup; nothing in his paper counts twin slots below a bound.
  `SEARCH-CONVENTIONS.md` §1 gains the owning-convention row ("variance of
  the sifted set in arithmetic progressions") — the interval analogue still
  may not be called absent until searched under its own convention.
- Two of his lemmas are elementary, fully proved, upstream of the false
  step, and importable (the Bridge L²→L∞ inequality; the universal collision
  bound). His v5 bibliography adds four unread Lemma-V-adjacent instruments,
  led by Maynard's well-factorable II (Oxford ORA, Lemma 6.12); the Lemma V
  convention row now carries them.

---

## 2026-08-19 (twenty-ninth pass), the Holt sweep closes at fifteen of fifteen

*(Full read of arXiv:2605.19165, page images; record at
`history/staging/holt-2605-sweep.md`.)*

- The fifteenth manuscript is "On nonconvex constellations II: (458, 3240)",
  Holt alone, May 2026: the 116 Engelsma counterexamples as heads/tails of
  the 58 parents. No max-gap bound, no G₂, and "twin" absent — the FOURTH
  such paper (the boundary paragraph said three).
- Its |s|/2 threshold is the corpus's own already-verified fact under
  another name: 2603.25915 §1 p. 6, "the minimum span between fusions is
  2p_{k+1}". Citation guidance: 2603.25915 primary, 2605.19165 as the
  numeric marking (1620/1621) plus the mechanism and eq. (1) use.
- **The interaction check is NEGATIVE**: our multi-kill extinction law is
  not his threshold. His scales linearly in window span; ours grows ×2.525
  per ×1000 of W (divergence factor 396 over three decades, from the cited
  embedded folds 181/331/421/457). Read at the kill-pair scale his |s|/2 is
  tautologically our θ_p ≈ 2p — half one of the law, already attributed —
  and the other half (adjacency in the word vs the maximal spacing) has no
  counterpart in his corpus.

---

## 2026-08-19 (twenty-eighth pass), the import map opens as a standing registry

*(Deep-research pass; record with the twelve rejections and the verification
ledger at `history/staging/import-map-construction.md`.)*

- `research/IMPORT-MAP.md` created: thirteen live rows (4 EXACT-IDENTITY, 9
  STRONG-ANALOGY; 11 CLEAN, 2 TPC-STRENGTH), the five landed imports as the
  calibration set, and a top five each carrying a pre-registered four-hour
  experiment. Twelve candidates rejected as VOCABULARY-ONLY live in the
  record, not the map. Every theorem carries a [SOURCED] / [SOURCED-BIB] /
  [MEMORY] provenance tag; the [MEMORY] list is explicit and long.
- One citation correction from its reconnaissance: the A = N + δ⁻¹ large
  sieve is Montgomery–Vaughan, Mathematika 20 (1973), not the JLMS 1974
  Hilbert's-inequality paper.
- Two of its claims are OFFERED, not asserted, and await adjudication here:
  the fixed-sum identity Σγ(k) = 0 that would forbid the √m scaling (TODO
  0c), and the sofic-shift first-moment shape ln D/ln(1/f) ≍ p/ln p.
- `TODO.md` gains the spend-from-the-map rule; `research/README.md` gains the
  REG row.

---

## 2026-08-19 (twenty-seventh pass), the officer pass lands: one false sentence, one owned null, one manuscript the sweep missed

*(Prior-art risk officer, record at `history/staging/proposals-prior-art.md`;
six owning-convention rows added to `SEARCH-CONVENTIONS.md` §1.)*

- **`research/PRIOR-ART.md` carried a false sentence** — "his machinery is
  bounded by |s| < 2p1 throughout". Holt–Rudd 1408.6002 §6.1, Corollary 6.3
  (pp. 25–26, page images) carries the (q − 2) driving-term transport with no
  span hypothesis. Fixed; the novelty boundary now also names what he does
  not have: the adjacency run, since (J+1) − ν_p(s) is blind to position.
- **The Holt sweep was one paper short**: fifteen prime-gaps manuscripts, not
  fourteen. The fifteenth, arXiv:2605.19165, holds the |s|/2 extinction
  threshold at §3 p. 11 and is otherwise UNSWEPT; the sweep header and table
  now say fourteen of fifteen. His 2502.20470v3 §3 Lemma 2 is the one-class
  compatibility lemma ("fusions in the same image iff p divides the span").
- **`prop-thinning-null` regraded PROPOSAL → WEAKENED**, hours after filing:
  the exactly-geometric null is Hawkins' random sieve (Neudecker–Williams
  1979, verified in Rivoal JTNB 20 (2008) 799–801), the group law is Bunge's
  composition semigroup (Ann. Probab. 24 (1996)); the corpus had zero
  mentions of any of it. NOT FOUND in that convention: the Fold Moment
  Identity and Ψ − Φ². The proposal's own pre-registered trigger fired, in
  the downgrade direction.
- **`research/discrepancy-two-class.md`'s absence claim downgraded to OPEN**:
  Ojaroudi (Zenodo 10.5281/zenodo.18509488, Feb 2026) builds the same
  tile-and-fold frame with a Selberg-weighted discrepancy energy; unread past
  its abstract.
- `import-bfree.md` §3.3: equation (8)'s unconditional sandwich is for
  cpx_{X_ℙ}, not for the sequence, whose lower bound is conditional; the
  sentence now says so. The officer's companion claim that §3.3 misattributed
  the author list was checked against the file and found already correct
  (Kasjan–Lemańczyk–Zuniga Alterman was on the page), so nothing moved there.
- `import-suen.md` §11 gains Peres–Yang (arXiv:2606.28860) as the nearest
  methodological neighbour, from a two-graph citation walk (97 + 99 citing
  works, zero on coprimality); `prop-suen-import` records NOVEL-SO-FAR.

---

## 2026-08-19 (twenty-sixth pass), the paper-proposals registry opens

*(Chris's decision: not ready for papers, so track candidates with grades and
pre-registered triggers instead. New standing structure: `paper/proposals/`.)*

- `paper/proposals/PROPOSALS.md` opened with seven entries: one QUICK-DRAFT
  (the K–K two-class lower bound, its 544-line draft beside it), five
  PROPOSALs (exact fold-L, Tail-Count Transport, the thinning null, the Suen
  import, plus the two HELD wrappers over the existing anchored and staircase
  notes). Six-grade ladder and the regrade rule: any session that lands
  evidence touching a proposal must regrade it, in both directions, and
  record the change here.
- `paper/PAPERS.md` gained one paragraph pointing at the registry; nothing
  else in it moved.
- Corrections applied while filing: the thinning proposal's brief had framed
  the out-of-sample test as four window-specific scaling exponents; the
  record holds ONE rate law tested at four windows, and the proposal says so.
  The exact-fold-L proposal records that the ninth diagonal cell was not
  blind (`a3-10-lower-tightness.js` already held it).
- A gate lesson worth keeping: a paragraph whose first line begins with bold
  matches the listy test in `paragraphIndex`, so the block scopes line by
  line and an owning-convention citation two lines up does not clear an
  absence phrase on a later line. Fixed in the prose (leading bold dropped),
  not by weakening the checker.

---

## 2026-08-19 (twenty-fifth pass), the max-plus import closes the twelve-task batch

*(Foreign-import attack 4: `history/staging/import-maxplus.md`, two embedded
producers. The batch of twelve — five attacks, five imports, plus the
earlier census and Y2 — is complete.)*

- The copy theorem is a max-plus identity (fold = cyclic duplication ⊕
  state elimination, 6/6 folds); Holt's operator and ours are ONE operator
  in two semirings — counting root p−2 and closed with no bounds, tropical
  root ×p/(p−2) with bounds and no closure — the difficulty in a sentence.
- PROVEN upgrades: maxsum subadditivity in m (was measured); Theorem A
  sharpened from ≈ to = with exact c_min(j) formulas — the record words are
  exact min-plus critical circuits and the 3/2 constant is a Perron-root
  sharpness. New structure: the tropical Perron root is m̄ with transient 0;
  G₂ is the NORM, a small and shrinking part of the eigenvector amplitude.
- 1d's first new lead: constant-free submultiplicativity ⟹ Fekete
  limit-existence; any explicit constant is TPC-implying (β ≤ 1.95 at base
  79) — the must-be-constant-free verdict, reached independently of 1e, and
  shown not to touch the Overshoot Budget. Custody riders on 1d's headline
  (+0.05 ± 0.11 is one of four window conventions, three negative) and the
  Budget's slack column (rising over its last eight terms) carried into the
  item.

## 2026-08-19 (twenty-fourth pass), the B-free import: the field declines the object, and Granville–Kurlberg's open problem holds for the comb

*(Foreign-import attack 5: `history/staging/import-bfree.md`, three embedded
producers, GK/Araújo/KLZ re-verified at source.)*

- The exclusion, in print: Araújo (arXiv:2602.24031/34) names the
  Mertens-divergent multi-class regime "not an interesting system"; the
  limit comb is {−1}, entropy 0, not Toeplitz; the crystallization/
  regularity mapping is INVERTED; unique ergodicity is true and vacuous;
  tautness fails by definition; heredity is true and does not upgrade
  translate-buys-zero. The wall's published dynamical form: KLZ Thm 1.1's
  split — unconditional for X_P, conditional on Hardy–Littlewood for 1_P.
- The live thread: Granville–Kurlberg, Adv. Math. 218 (2008) — their Thm 1
  hypothesis (1) FAILS for the twin comb (the second class, not the offset;
  flat at 0.5–1.5 vs Hooley's 1/p decay for reduced residues), while their
  own stated open problem, the averaged weakening, HOLDS for the comb with
  a factor p to spare. Priced: typical gaps, not G₂.
- New computed objects: the two-class subshift complexity exact to n = 60
  (exponent 0.4963 — NOT to be called novel until its owning convention is
  searched, per the agent's own flag); the nondegenerate cousin's entropy
  0.2236; the recognizability radii R_x. REFUTED.md gains two rows; §8's
  SEARCH-CONVENTIONS/PRIOR-ART additions queued. Second pattern-kill breach
  disclosed (own script only); future briefs say "never pkill, including
  your own names".

## 2026-08-19 (twenty-third pass), the chaining import closes geometrically and re-addresses the wall

*(Foreign-import attack 1: `history/staging/import-chaining.md`, three
embedded producers, custody reproducing phase1-T4 §4 digit for digit.)*

- CLOSED, twice over: the entropy integral of the true increment metric
  exceeds the union bound at every level (1.04–1.10×) before any tail
  hypothesis is asked; and the subgaussian gate fails at the fine scales
  carrying 30–82% of the bound. The blocking constant is the universal
  Dudley constant (needs ≈1.05, measures 2.3–2.9 against the TPC-implying
  line).
- Kept: the exact increment identity R_H(x+δ) − R_H(x) = R_δ(x+H) − R_δ(x),
  giving d(δ) ≤ 2√(B·δ) unconditionally on the proven mean-square — the
  metric is Brownian to three digits; the E-sup gap closes exactly by
  shift-invariance; and the wall's corrected address — C^{π(z)} is charged
  over moduli/frequencies, not positions; the object is ℓ¹→ℓ²√log on the
  arithmetic of Θ_e(a).
- By-product HELD for a definitions check: the maxsum law's √m factor is
  disputed (measured exponent 0.27–0.32, anti-correlated tile gaps), while
  its √(ln D) factor is explained. TODO 0c carries the flag.

## 2026-08-19 (twenty-second pass), the Suen import: bounding δ was never a lemma, and the sign flip resolves

*(Foreign-import attack 2: `history/staging/import-suen.md`, producer
embedded, 576 s, seven levels @11..@31 — δ extended two levels.)*

- The dependency structure is a perfect matching (Janson's Δ = 0 exactly);
  Janson's lower half is structurally inapplicable (two orientations cannot
  both be increasing); Suen applies and its exponents point the wrong way at
  depth — all applied, not asserted.
- The exact identity (1+δ)(1+F) = 1+ρ: F is the product-measure part of δ;
  δ = ρ − F to second order; the @19 sign flip is ρ crossing F, RESOLVED,
  with the forward prediction pre-registered. Corrections: δ exceeds the
  forced scale at 2 of 7 levels, and any constant bound on δ is
  TPC-strength — the fourth wrong-direction arrival. REFUTED.md gains the
  row; the verify report's "a priori O(Σq^{−2})" reading is corrected here
  (frozen layer noted, not edited).
- Delivered: the LLL wall address (pairwise horizon = the p² rule; set-wise
  dies at x = 7, the seventh Mertens arrival; the admissible repair is
  Brun's pure sieve, reproducing β_pure independently); the e^{2γ}/4 sharp
  form's upgrade to INFERRED-unconditional queued for Chris (BV sketch);
  and a calibrated novelty flag — the Janson/Suen family has never been
  imported into the sieve literature (zero hits, five key papers + math.NT).

## 2026-08-19 (twenty-first pass), the thinning import: the null is exactly geometric, the deviation is exactly the pair correlation

*(Foreign-import attack 3: `history/staging/import-thinning.md`, three
embedded producers. Literature attributions are from memory and flagged as
unverified in the note.)*

- Independent thinning of the comb is EXACTLY solvable: the thinning map is
  a Möbius transformation fixing 0 and 1, the per-fold maps compose
  multiplicatively, and the null gap law is exactly Geometric(m̄/6) at every
  rung — predicting the extinction law's constant to 2.2% of foldL-06's
  blind fit (c_null = 1.0577 vs 1.0818 ± 0.032, pre-registered).
- The Fold Moment Identity [PROVEN, 7 folds × 4 λ, no error term]:
  (p−2)Φ_new = (p−4)Φ + Ω + 2Ψ + Δ — the entire first-order deviation from
  the null is Ψ − Φ², so H″(m=2) is the adjacent-pair correlation as an
  exact identity. Measured: adjacent gaps negatively associated (K < 1 at
  52/52 cells), the CRT tail LIGHTER than geometric at qualifying scale —
  the deviation sits in the bulk, sign opposite to the pre-registration.
- Closed: the monotone-coupling route (merge events are gap-value functions,
  mutually singular with solvable variants), and H″(m=2) in moment form
  implies the Zone Postulate — the third independent wrong-direction
  arrival. The exponential-moment margin c′ < 2 exists at every cell but
  vanishes exactly on the trajectory an induction needs. REFUTED.md gains
  the row; TODO 0b carries the new state.

## 2026-08-19 (twentieth pass), the frontier extends to fold 37: three exactness claims hold one level deeper

*(`history/staging/frontier37.md`, producers embedded and re-verified by
independent second runs. Eight of nine pre-registrations right; the miss —
the loose certificate expected strictly above 528 — makes the result
stronger. Prior-art disclosure: a3-10's deep37 leg already held L(T₃₁,37)=4
and the maxsum row, so those legs were not blind.)*

- The word statistic's NINTH diagonal cell: L(T₃₁, 37) = 4 by both routes;
  extremal word 150 + 72 + 150 (the gap classes swap roles vs fold 31).
- The tail-count certificate exact at its EIGHTH fold, loose = alt = full =
  528; the transport inequality 0 violations at 88 thresholds untruncated,
  and its margin narrows monotonically (0.888 → 0.948, +0.012/step — proven
  inequality, so tightness approaches; fold 41 the cheap check, ~2.4 h +
  ~5.4 h priced).
- New exacts: maxsum_{1..8}(T₃₁) = 348..660; D(T₃₇) = 217,929,355,875 from
  two disjoint sources to the unit, matching A059861; N_new(528) = 2
  reproducing the ladder's nmax without visiting a position. Cost estimates
  erred DEAR by 2.5× — the first recorded instance in that direction.

## 2026-08-19 (nineteenth pass), the joint deficit decays on the forced scale

*(The triple census past @17: `research/natal-cap-39-triple-census.js`
(embedded twice, presentation note disclosed), report
`history/staging/xchannel-triples.md`, bands pre-registered blind for @23.)*

- The mixed super-W joint deficit DECAYS: J = 0.9025, 0.9599, 0.9659 at
  @17/@19/@23 (deepening refuted at 3.5σ; still 48.7σ from zero). From @19
  it is a constant ~3.8 times the forced mutual-exclusion scale (0.52σ
  agreement across the two deep levels; @17 sits 2.75σ high). "0.903 with
  no level trend" was an @17-only fact and is retired from TODO item X.
- P1 tested directly at all five levels (aligned super-W ≡ 0, by bridge and
  enumeration — a named gap closed); the deficit is not the m≥3 story
  (opposite trends over the same levels); the δ sign flip's worst reading
  removed, flip still unexplained; the restriction-to-sub-W bridge is an
  exact identity, so no proxy factor was needed. An instrument bug
  (Uint8 wraparound at K = 435) was caught by the reproduction gate before
  the run.

## 2026-08-19 (eighteenth pass), the Y2 ladder reproduces sixteen-for-sixteen and falls fifteen-for-fifteen

*(The corrected instrument's ladder, re-run as sixteen independent detached
shards: `research/y2-ladder-recompute.js`, `history/staging/y2-recompute.md`.
All sixteen levels reproduce the published §5d table digit for digit — level
independence measured; the three pre-named decreases vs the superseded
2026-08-17 ladder landed exactly where predicted and nowhere else.)*

- The 1d-adjacent reading: **Y2/x² fell at 15 of 15 consecutive steps**,
  slope −0.6142 ± 0.0076, and the greedy-fidelity calibration band moves the
  slope by 4.4% of the effect. Honest cap carried in the record: Y2 is a
  lower bound, so this cannot by itself prove G₂/x² falls; flatness would
  require greedy fidelity 0.058 against a worst measured shortfall of 1.045.
- Stale sentence corrected in `G2-STATE.md` §5a: the greedy reaches 617 — the
  optimum — at x = 43 (the 611 was budget, superseded by the oracle
  validation); §5d gains its reproducibility note.

## 2026-08-19 (seventeenth pass), the L = 1 hypothesis is the postulate in disguise, and step 3's lower half becomes a theorem

*(`history/staging/attack-l1-residue.md`, four windows to 2·10¹⁰. REFUTED AS
A HYPOTHESIS by three proven lemmas: the residue condition IS the kill
condition (237/237, zero slack); the vanishing threshold T* is provably ≤ G₂
and measured EQUAL at four of four windows; the chain sum is zero iff
G₂ < θ. The fourteenth-pass synthesis overstated — the zone frame's
instruments stand, but "one remaining counting hypothesis" was the Zone
Postulate in residue notation. U-FRAME §7 item 1 and §5a step 3,
ZONE-POSTULATE, TODO 0b corrected; REFUTED.md gains the row.)*

- Collected: `maxsum₂(old) ≤ G₂(new)` upgrades from VERIFIED-at-329-cells to
  PROVEN (every slot dies in exactly 2 of its p copies; the record pair
  merges somewhere).
- Cartography kept: the free 2/p is proven over a full period and fails in a
  window (u = ln Y/ln p against β₂); BT/BV/EH inapplicable (no primes in the
  statement); the first-moment reading crosses below the record at the two
  largest windows. The 6.5% deep-fold deficit in the 2/p ratio is
  reproducible and unexplained. One process disclosure: the agent issued a
  pattern-kill on its own script's name after a successful PID kill —
  harmless and a violation all the same.

## 2026-08-19 (sixteenth pass), dial 4 is finished: the instrument-slack channel closes

*(TODO 0e's first move executed: `history/staging/ioslack-survey.md`,
producer `research/attack-ioslack-survey.js`, every input cited from an
embedded artifact, pre-registration 5 of 6.)*

- Twenty-three instruments surveyed. The loosest that bounds G₂ DIRECTLY is
  the exemplar `maxsum_{L+1}` at 0.3747 nats; the larger amplitudes all sit
  on the L- or depth-axes, which are already-closed channels. No sharp-level
  signature survives a permutation test at any of 19 instruments (smallest
  p_FWE 0.1082; Šidák over the family 0.8865), and the closure is carried by
  mechanism, not absence: the two signatures with a named mechanism select
  FINITE sets (L = 1 needs no qualifying gap, unsatisfiable from T_11; the
  oracle's sharp levels are the initial segment).
- The zero-slack finding: the exact instruments (LVP, M_alt, M_full) have
  i.o. value exactly zero — C ≡ 1 reduces the licence to the truth's own
  amplitude — and they are precisely the instruments that transport nothing.
  Exactness and i.o. usefulness are in structural tension.
- TODO 0e left the file per the charter; REFUTED.md gains the closing row;
  THE-DIALS dial 4 reads "all four channels closed", total measured margin
  ~0.7 nats against a need of 6.7–9.6. The would-be candidate statement an
  i.o. argument would have needed is recorded in the survey's §8d so the
  closure stays checkable.

## 2026-08-19 (fifteenth pass), the wave's numbers enter the regression net

- `research/audit-numbers.js` gains section W: the block-1 depth-0 ceiling
  (first dead 63), the true diagonal L at folds 7..29 by direct global-
  alignment enumeration, and the 2·10⁷ extinction fold (181) — 117 checks
  total. The section's first draft used a small-word max-over-alignments
  variant and FAILED at (T₇, 11) with 2 against the true 1 — the copy-
  boundary lesson (`attack-foldL-02-bridge.md`) re-learned live, and the
  known-positive proof that the new checks can fire. Heavy wave numbers
  (depth-2/3, tail-count certificates, deep windows) stay out of the gate
  budget; their double verification is their record.
- `research/exact-g2-ladder.js` custody-bound (1.3 s embed): the fourteen-
  term ladder's home carries a formal tail. Backlog 15 → 14.
- Costello–Watts re-verified at source by the orchestrator: Math. Comp. 84
  (293), 2015, 1389–1399 (AMS page), and arXiv:1209.3464 v2 is the authors'
  withdrawal, "due to an error on page 6" — the page the angle-5 agent
  refuted numerically.

## 2026-08-19 (fourteenth pass), the fold-L wave synthesis reaches the live layer

*(All five angles plus two adversarial passes and the scaling test are in;
this pass integrates. Records: `attack-foldL-0[1-6]-*.md`,
`verify-tailcount-transport.md`, `verify-ab-coupling.md`,
`consolidation-wave.md`.)*

- `U-FRAME.md`: three figures corrected against the new reproduction scripts
  (tile width 1,296,000, not 162,000; the drop-x37 fit is 1.716, not 1.98;
  fold-17 share 4.85%); §7 item 3's G₂(41#) pricing replaced by the two
  published exact terms; item 4 answered from the genealogy tree (four
  record folds, fresh assembly, the old record absent from the ancestry);
  item 1 re-scoped by the wave; §8's recorded-not-reproducible warning
  retired — the tables are regenerated from nothing and quotable; §11 gains
  the Tail-Count Transport [PROVEN], the sharp per-level evaluator.
- `ZONE-POSTULATE.md`: the zone-frame destruction paragraph — extinction as
  a measured out-of-sample-validated law, the transport chain's collapse to
  one L = 1 residue hypothesis, met by the genealogy ledger from the other
  side.
- `TODO.md`: 11b executed and left the file; 0b re-scoped to the window
  statistic's growth and the L = 1 residue count.

## 2026-08-19 (thirteenth pass), REFUTED.md joins the reading path

*(Chris's pruning decision, executed at its verified-safe 80/20 after the
inventory pass found the corpus had already done most of the prune — only
3.15% of the live layer was prune-safe, ~9k tokens are ORPHAN-DETAIL that
must move rather than be deleted, and `paper/` is exempt in writing.)*

- `research/REFUTED.md` created: forty closed routes, one line each — name,
  verdict class, mechanism in one clause, record pointer. Wired into the
  router ("what is closed" row), the README map, and reachable for
  `crosslinks` from the `research/README.md` entry.
- `TODO.md`'s closed-routes block (5.5k chars) migrated there, restoring the
  file's forward-only charter; `G2-STATE.md` §5b's table replaced by a
  pointer (the heading stays so "§5b" citations resolve), removing the
  standing transfers-collision risk between the two lists.
- Deferred, with reasons in the inventory record: whole-file moves of
  `origin-excess.md`/`maier-matrix.md` (≈40% of their distinctive figures
  have no history twin — a sibling reader's "prune-eligible" call was
  refuted by numeric probe), and the ~9k-token orphan-detail migrations,
  which gate any further pruning.

## 2026-08-19 (twelfth pass), the order-m object surfaces in print one class down, and 0c decouples from L

*(Angle 5 of the fold-L wave, `history/staging/attack-foldL-05-maxsum-direct.md`.)*

- **Costello–Watts, Math. Comp. 84 (2015) 1389–1399** was in §2.2's
  citation-graph triage list all along and was triaged by its m = 1
  conclusion; its Theorem 4.4 bounds the order-m object `π_min(m,k)` for all
  m, k (recursion only, one class). `covering-dive.md` §2.2 carries the
  correction, `SEARCH-CONVENTIONS.md` §1 gains the owning-convention row, and
  the two-class order-m absence is now calibrated. The closed-form
  arXiv:1209.3464 Thm 2.3 is author-withdrawn; its page-6 error was located
  and refuted numerically at k = 11.
- **TODO 0c gains the price rider**: the bridge floors at ≈ 0.183x for any
  maxsum bound whatsoever (maxsum_k ≥ G₂; already in `a3-05-bound-L.md` §7,
  re-derived independently), floor/need above 1 at all eight exact levels —
  solving 0c does not deliver the u-frame through L. 0c's payoff restated as
  the object itself plus the threshold-m certificate connection (the
  certificate overhead is additive, so thresholds above m = 1 ride nearly
  free — unconditional, quantifier-safe).

## 2026-08-19 (eleventh pass), the depth axis goes live: 529's counting route is open at depth 3

*(Independent verification `history/staging/verify-ab-coupling.md`: every
pilot ceiling confirmed by exhaustive enumeration — 7.4M coupled tuples at
the decisive windows, 468 sub-instance ceilings none below truth — the
soundness logic is a fractional-cover bound with no parity trap, and the full
depth-2 LP equals the partition value 54 exactly, with the closed-form
reason: the LP gain is the fractional-matching gap on K₆, zero here. Depth 3
improves 39 → 38 under the full LP; the {7,11,13} triple's 3 slots are
genuinely beyond pairwise. One cosmetic pilot error: six pairwise deficits,
not five, one not involving 7.)*

- `sift-limit-attack.md` §7a-ter rewritten: "529 is closed" was a depth-0
  statement; the criterion has a depth axis, 62 → 54 → 38, open at depth 3
  and priced as expensive (zone depths 3, 3, 5, 5; x = 41 unreachable);
  TODO's closed-routes block gains the coupling line. The transfers pair
  TODO 0c ↔ U-FRAME §5a adjudicated KEEP (faithful paraphrase; the rider
  edit had lapsed the old fingerprint).

## 2026-08-19 (tenth pass), the Monotone Depth closure is narrowed: truth-slack priced, instrument-slack open

*(Adversarial verification `history/staging/verify-monotone-depth.md`: every
number in `attack-0c0e-level-selection.md` reproduces from independent code;
the mechanism as named does not. Verdict NARROWED.)*

- The licence-value argument conflated truth-slack with instrument-slack: the
  i.o. licence is worth `amp(ln C·T)`, and the truth's 0.3187 nats caps it
  only for level-independent instruments — refuted inside the corpus by
  `maxsum_{L+1}`'s slack oscillating 0.3747 nats. Dial 4 moves from "free
  slack, no mechanism" to "priced slack, three channels closed, the
  instrument-slack channel open" (`THE-DIALS.md` updated; TODO 0e rewritten
  to the adversary's drafted form).
- Strengthened on the way: depth-is-not-a-modulus is now a one-line proof
  (max gap non-decreasing under inclusion of the sieve set), which also
  proves the monotonicity §5 had only measured.
- Custody riders: the "amplitude falls" half rests on A144311 terms 15–22
  (ours to verify, not to claim); the x'−x ≥ 6 rule fails family-wise
  multiplicity on the ladder (p_FWE = 0.14) and survives only on the 54-term
  control; the m = 1 circularity is conditional on Link B's verified
  no-straddling clause; the record's "SHAPE RIGHT" on prediction (a) is
  backwards on the tile (max/mean rises with ln x, r = +0.657).

## 2026-08-19 (ninth pass), the convolution headline is restated as a squared one-sided law

*(Adversarial verification of the held cofactor-convolution claim:
`history/staging/verify-cofactor-convolution.md`, independent instrument
built from `anchored-note.md` §1, all five levels reproduced to the last
digit. Verdict RESTATED — arithmetic stands, framing does not.)*

- The "84% of the m≥3 gap" collapses to one cell by the exact identity
  `X = M − N̄ + n₀`; the apparent convergence was denominator dilution (the
  model's own n₀-error worsens 1.21× from @13 to @23 while the reported
  error improves 5.79×). The residual is 79.5% bulk, not tail.
- The restatement: the anchored β is one one-sided deficit squared (0.88982
  vs 0.89305 at @23, 0.4%), Assumption A ≈ `S(0)/S̄ > ε` — the HL
  independence heuristic measured to 0.5% with δ bounded by the forced CRT
  scale — and the origin-density candidate is out of X's reach rather than
  refuted: its joint part is measured at @17 (mixed super-W triples at 0.903
  of CRT, invisible to marginals). Producer defect recorded: part4 never
  computes the i = 0 row the closed form needs (A = 1 skipped; prints n/a).
- TODO item X rewritten to the restated form; the eighth-pass entry's HOLD
  is discharged.

## 2026-08-19 (eighth pass), the X-channel's fifth point lands above its band

*(TODO item X's first move, executed priced-first: the @23 run cost 18.9 s at
5.69 GB against a 19–28 s derivation from the code's own work counts. Producer
`research/natal-cap-35-x-multiplicity.js`, one-line level edit, tail
re-embedded and hash-verified; report `history/staging/xchannel-at23.md`.
Custody gate: the anchored side reproduces `paper/anchored-note.md` §3 and
`research/OBSERVATIONS.md` exactly.)*

- `(X̄−X(0))/S̄` extends to **+0.2658** — increment +0.0433 above the
  geometric-continuation band; the m≥3 share of the X-gap runs 10.5% → 23.5%
  → **81.1%**, making the on-record m≥3 warning true of the gap for the first
  time; `X(0)/X̄` rises a second consecutive level; the truncation factor
  falls to 0.8202.
- The origin-density mechanism candidate is REFUTED as stated, and 84% of the
  m≥3 gap matches the one-sided cofactor trichotomy convolved with itself
  (X(0) model error +0.050% at @23). **Held out of every live claim pending
  an adversarial re-derivation**, per the same-day-integration rule; TODO
  item X records it as HOLD.
- @23 is the in-memory instrument's last level (@29 needs 162 GB); a sixth
  point requires a segmented rewrite.

## 2026-08-19 (seventh pass), the prose tranche binds fifteen more tails

*(Second custody-migration tranche: OUTPUT-region prose moved to READINGS under
a dated carried-out heading, then embedded with `--streams both`. 34 → 19
hand-pasted tails. No `--force` was needed anywhere and no real value changed:
all 96 "gone" figures across the 15 files resolve to prose arithmetic,
rounding, notation reformats, or cross-file citations — verified against
pre-edit copies by an independent diff, not by the guard alone.
`birth-cohorts.js`'s entire old OUTPUT block was hand-written summary; the
first real run confirms every claim in it.)*

- Held for the owner, deliberately: `genealogy.js` (tail asserts a table the
  code never prints), `attack-beta2-04-loss-budget.js` (its CORRECTION banner
  retains the defective tail as custody), `h2-length-needed.js` (its OUTPUT
  block is a retired-numbers record its own header points at). Over budget:
  `verify-ladder-big.js` (~56 min), `lemmaV-sup-extension.js` (~22 min) —
  both had their prose relocated so a later embed is one command.
- **`h2-scoping.md` §6 carried the pre-correction A048670 figures** (window
  means 1.2604… where the corrected tail prints 1.2568…, two shortfall rows,
  and the 56-term AIC row) — figures-only, no verdict moves; corrected against
  `h2-length-needed.js`'s post-correction tail. It escaped the gate because
  that tail is unbound, which is the defect class the migration closes.
- Parser hazard for later tranches: `tailfmt.locate()` takes the LAST line
  matching `// OUTPUT`, so relocated prose must not begin with that word;
  `birth-cohorts.js` carries the worked example.
- `readings-not-traceable` rose 110 → 115 honestly: prose that used to hide
  inside OUTPUT blocks is now where the checker can see it.

## 2026-08-19 (sixth pass), the greedy oracle validates inside its sealed rule and dies at 53

*(TODO 1b executed under its pre-registration, verbatim in
`history/staging/greedy-oracle-validation.md`. Producer
`research/greedy-oracle-validation.js`, embedded, re-verified by full re-run;
greedy/verifier extracted from `two-class-lower-bounds.js` as source text,
truth from `exact-g2-ladder.js` (x ≤ 43) and A144311 (x = 47..79).)*

- **ORACLE ESTABLISHED** under the sealed rule: exact at 13/13 and 14/14, min
  ratio 1.0000, uniform budget, no level exceeds its optimum. The dead clause
  (ratio degrades with x) does not fire in scope.
- **The honest frontier is x ≈ 53**: on the published covering optima beyond,
  1 of 8 exact, slope −0.0235 (±1.96 se [−0.037, −0.010]), and 59/71/73/79
  take nothing from 4× restarts. The x = 100+ instrument item 1d wanted does
  not exist; 1d's first move restated accordingly, and 1b left the file.
- Mechanism: at 15 of 22 levels the optimum certificate falls out of a FAILED
  attempt at a larger target (43#'s 617 is never covered directly; it appears
  inside the failed run at 759). Cost of exactness ×3.14 per added prime.
- Also fixed: TODO item 2's a3-09 sentence used an absence phrase the
  `absence` check rightly flagged; rephrased positively with the verification.

## 2026-08-19 (fifth pass), the readings catch up with their embedded blocks

*(Re-quote pass over the 14 first-tranche migrations: ~53 readings re-quoted to
the blocks' printed precision or given inline derivations; untraceable figures
in that set 191 → 138 of ~750. Meaning never changed; drift beyond rounding
flagged instead.)*

- Two pre-existing errors in `a3-03-f-from-census.js`'s readings, found by the
  pass and verified by hand before fixing: "P ~ 1e86" for T199 is `m̄·D ≈ 1e82`
  (ln P = ln 70.11 + 184.3 = 188.6), and "cost is exp(0.048 p)" is
  `exp(0.095 p)` — the block's own predictions give ln/p = 0.0953 and 0.0949,
  so the old constant used p/6 where the derivation has p/3. Conclusions
  unchanged (the second is strengthened).
- The `readings-not-traceable` tokenizer let `[\d,]*` swallow a trailing
  comma, so "min 548,402," never matched a block printing 548,402 — a
  systematic false-positive class. Fixed in `tailfmt.js` NUM with a selftest
  case; most of fold-profile-01's residual untraceables were this.
- One cross-script quote sourced precisely (`natal-cap-23` reading 6's 0.94 →
  `natal-cap-13-anchored-calm.js`); four old-run timings re-quoted to the new
  blocks and listed in the pass record.

## 2026-08-19 (fourth pass), the custody migration moves 13 tails and the blockers turn out to be editorial

*(Migration wave: 47 → 34 legacy tails. Six stderr-class scripts embedded with
`--streams both`, five trimmed-tail scripts re-embedded in full (every "gone"
figure was the old block's own hand-rounding — 1.0279→1.028 class),
`natal-cap-22` and `a3-03-f-from-census` (with its recorded `-- 210 3e9`
invocation) embedded. 11 of 13 verified by `--check` immediately.)*

- **The remaining 34 are editorial, not mechanical**: 20 carry hand-written
  prose inside the OUTPUT region that an embed would destroy (the prose must
  move to READINGS or here first), 9 are declared multi-run composites, 3 are
  priced over budget, 2 are nondeterministic by construction.
- **`a3-09-histogram-operator.js` is not reproducible**: a 33 s wall-clock
  budget decides which diagonal rows exist, the pasted `p = 139` row does not
  reproduce, and the readings' fitted constants (0.770, 0.738) move without
  it (re-run: 0.767, 0.729). TODO item 2 now carries the fix.
- **`genealogy.js`'s tail asserts a table its code never printed**, closing at
  0.41625 where the code computes 0.41621 (independently hand-verified).
- **`tailfmt.normalize` had a blind timing shape**: key-form `"secs":70.2`
  (unit before the number) and bare trailing seconds passed as data, so two
  fresh embeds could never re-verify. A key-form VOLATILE rule landed with
  five selftest cases (three collapses, two preserved-data controls);
  `a3-03` now prints its seconds with a unit; `natal-cap-20`, `a3-03` and
  `natal-cap-17-cheap-laws` (whose bound tail carried six key-form timings)
  re-embedded under the new rule.
- `embed.js --timeout` is in SECONDS (default 120), and a timeout or interrupt
  leaves the tail untouched — the child runs to completion before any write.

## 2026-08-19 (third pass), the self-consistent theta ladder runs, and the crossing turns out to be real — one level bracket later

*(Producer: `research/theta-ladder-sup.js`, rewritten per TODO item 0's first
move — window from the caller, `--Hs` band walks, `--fixed-point`; report
`history/staging/theta-selfconsistent.md`. The z = 47 crossing was replicated
independently by the orchestrator before integration: min T = 0 at
H = 2300 = 1.0412 z² in a 4·10⁹-position prefix, 178 s.)*

- **"Nothing crosses" (second pass, above) was true of every level it measured
  and false one bracket later.** Self-consistent exact values now run
  need/z² = 0.3550, 0.4360, 0.5485, 0.4877, 0.4637, 0.6119 at z = 13..31 — all
  inside the budget, falling 19→29 and rising from 31 — and at z = 47 the
  certificate fails inside the period (a prefix minimum upper-bounds the
  period minimum), so the crossing sits in (31, 47]. Six documents updated
  (`theta-ladder.md` §0/§5b/§6/verdict/§9, `G2-STATE.md`, `ZONE-POSTULATE.md`,
  `sift-limit-attack.md`, `paper/wall-note.md`, `research/README.md`,
  `TODO.md` item 0). The route's retirement ground (sharp maximal law
  TPC-implying) is unchanged; both columns now point the same way.
- **The conditional column's slack is 2.46–3.68 and rising** at the
  self-consistent window, not the recorded "1.70 to 2.09, no trend": §5b
  readings 1–2 rewritten, and the shared-limit argument is OPEN, not
  established.
- The old windows were 61×–123× too long against the operative window; the
  published "39×–62×" mixed two denominators.
- Method riders: the fixed point of `sup|R_H|/M` is not unique (it certifies
  T ≥ 0, not T ≥ 1); the operative window is the last fixed point plus one,
  visible only to a band walk.

## 2026-08-19 (second pass), the theta-crossing correction swept into the summary layer, and two closures re-verified

*(A cross-layer staleness audit plus two independent adversarial re-verifications,
2026-08-19. The `theta-ladder.md` §5b correction — `theta-ladder-sup.js` took
`u = 3.2` from no caller, so its suprema were measured at windows 39×–62× too
long; corrected 2026-08-18, `history/staging/phase1-T4-maximal-law.md` — had
reached §5b and reading 8 but not the summary layer above it.)*

### The theta-crossing cluster (six documents)

- `theta-ladder.md` §0, §6 and verdict item 1 asserted the unconditional column
  "crossed 2 between z = 23 and 29 and exceeds the budget by half again from
  z = 43"; they now carry the self-consistent values (need/z² = 0.5485, 0.4877,
  0.4637 at z = 19, 23, 29; nothing crosses; certificate positive at every one
  of the 223,092,870 positions at H = 0.46 z²) and the route's actual retirement
  ground: the sharp maximal law is TPC-implying. "Two independent instruments"
  was withdrawn with it — the verdict rests on the conditional column alone.
- `G2-STATE.md`: the θ_true/need table (0.8693/0.8487/1.0060/… ) replaced by the
  self-consistent values; the §5b closed-routes row re-verdicted from
  "REFUTED, θ crossed 2 upward" to "RETIRED, fixed-window artifact + sharp-law
  price"; "the live route is `u_sup`" corrected to "`u_sup`, which is closed".
- `ZONE-POSTULATE.md` §5: same crossing claim replaced; the 2.05-vs-2.0495
  refinement parenthetical removed as moot (it fine-tuned a voided column).
- `sift-limit-attack.md` §0 and the §5-area toy-scale row: same replacement.
- `paper/wall-note.md`: the refuted ladder paragraph replaced with the sharp-law
  pricing; this was submission-track text.
- `research/README.md` router row for `theta-ladder.md` updated.

### The stale working point s/u ≈ 1.2 (four sites)

`ZONE-POSTULATE.md`, `sift-limit-attack.md` §0, `theta-ladder.md` (ii), and
`paper/wall-note.md` all carried s/u ≈ 1.2 (or 3.0/2.4 = 1.25); the corrected
working point is s/u = 1.62–1.72, further outside Lemma V's range s ≤ u.
Conclusions unchanged and strengthened.

### Ford–Halberstam: "the same inequality" narrowed (re-verified independently)

An independent re-derivation reproduced every number in
`attack-ford-halberstam.md` to 1e-11 and confirmed the route closure, including
that full cross-component asymmetry does not beat the symmetric optimum
(5.158186 vs 5.158065). One headline narrowed in `TODO.md` item 2 and
`sift-limit-attack.md`: FH's Lemma 1 is not "the same inequality" as BF (2.6) —
it is (2.6) with the true indicators in the minorant slots, strictly stronger
pointwise (min gap 7.86e-6); any usable form (minorants substituted) is (2.6)
verbatim, which is what the closure needs.

### u_sup: the bounded-asymptote argument retired as family-dependent (re-verified independently)

`attack-hm-basis.js` re-ran identically (624 s) and the (h,m) closure stands on
(T1), which is a proof. But "the bounded family's best asymptote is 5.46, above
β₂, forcing it to β₂ costs 8.70×" held only within the `A − B/ln z` family: the
better-fitting bounded family `A − B/π(z)` lands below β₂ (π(z) being the
natural abscissa for a per-added-prime mechanism). `sift-limit-attack.md` §7e
and `TODO.md` item B now rest the closure on the mechanism (flat ~2.05 per-prime
factor, so `u_sat` grows like `π(z)/ln z`) and the model-free derivative, with
asymptote fits carrying no weight in either direction.
`research/lemmaV-sup-extension.js` S4/reading 2 still carries the family-bound
phrasing in its embedded tail; correcting it requires a re-embed and is left for
the custody migration.

### The K–K substitution: second adversarial pass (STANDS), and the ledger repair it forced

A second, independent adversarial verification re-derived the exponent assembly
to machine precision, reproduced the trichotomy brute force digit-for-digit
from independently written code, confirmed `Ω^II = ∅` breaks nothing (the
theorem's `m` never routes through their Theorem 1 statement), confirmed the
`y₀` table from the H2 condition alone, and found `κ = 4` load-bearing in the
Selberg remainder (`3κ − 1 = 11`; at their `κ = 6` the `ξ = √y/(ln y)⁷`
support would fail). Corrections applied to `two-class-lower-bounds.md` §4c,
none touching the exponent: "necessary and sufficient at finite scale"
narrowed to "sufficient" (violations at the boundary produce no
counterexamples — measured in three parameter families); `y₀ = 10^{134.1}`
restated as the all-implied-constants-set-to-1 floor rather than "computable";
the ξ support named with its sifting parameter (as written `ξ < z`; free
repair `z := ξ`). And the Maier–Pomerance dimension-2 ledger was inconsistent
with the theorem it sits under: its multi-kill row's justification presupposes
`y ≍ x(log x)³` — the new unconditional size — while the table still totalled
3. The ledger now carries the band-2 device as its own unconditional row, the
superseded conditional "honest analogue" (`x log²x·lll/ll`,
FGKMT-transfer-contingent) left the body, and the conjectural two-class
ceiling is `x (log x)^{4+o(1)}`. Residuals on record: the second checker had
no K–K PDF (the first did, reading displays from page images) and could not
check Halberstam–Richert Thm 2.2's `ξ`-vs-`z` hypothesis at source; the
staging verify-report's "necessary and sufficient" stays as written in the
frozen layer, corrected here and in the live document. A six-script custody
re-run the same day: all six embeds PASS and every live output matches its tail
to the timing stamps; three staging residuals stay in the frozen layer —
`attack-L-subadditivity.md` quotes a `7.1 s` timing no run produced (tail 6.7,
live 6.9), `attack-kk-substitution.md` §5 still carries `1.5e6` for `z₀` where
the truth is `4.7e3`–`5.3e3` (the verify-report's correction 1, recorded but
never applied; conclusion unaffected), and the two K–K documents use opposite
conventions for `p₀` (5 against 3), each matching its own producer.

### The monotonicity sweep (old TODO item 7): one unsound bisection, corrected

`attack-beta2-04-loss-budget.js` §6's `H₁` bisected on a predicate that is not
upward-closed in `H` (15–146 revivals per level) and reported 36/72/144/174/354
as minima; true first-crossings are 30/72/132/174/210 (independent rescan
agreeing with `attack-beta2-03-exact-strata.js`'s j = 0 row). READINGS 6's
"factor 1.2 to 2.4, penalty about 0.25" becomes "1.00 to 2.00, penalty 0 to
0.27 and falling"; the certificate is sharp at x = 7. The `β` floor never
consumed it. Script carries a CORRECTION banner, tail retained as custody.
`redteam-DP1-certificate.js`'s "so each reported L is genuinely the first" was
an invalid two-point inference (true only because the producers scan
consecutively); corrected in its READINGS below the tail. The caveat
`attack-bonferroni-degree.md` §9 drafted for `attack-DP1-mechanism.md` §5
remains unapplied in the frozen layer, recorded here. Full record:
`history/staging/monotonicity-sweep.md`.

### TODO.md housekeeping

Item 000 (Holt book / MathSciNet, both closed) left the file per its own text;
the "live risk" paragraph it carried was the FKMPT false alarm already closed by
item 1 (the corrigendum was read 2026-08-18; `covering-dive.md` §2.3). Item A's
"named and open" (h,m) line was settled by item 3 the same day. The item-B
pointer in the preamble no longer calls a closed item the live route. In a
second pruning pass the same day, every closed live-queue item left the file
per the charter (1 FKMPT, 2 Ford–Halberstam, 3 (h,m) basis, 6 Hough/BBMST —
itself already discharged in this changelog — plus letters A, B, B-old, C, D,
D-closed, F, F-new, H, H-old and G), the four live items renumbered 1–4, and a
compact "closed with reasons" record block now stands between the do-not-spend
list and item 0, each line naming its record file. Unique content was verified
duplicated before deletion (the α₂ = 5.35773 window lives in
`sift-limit-attack.md` and `scope-fractional-retention.md`); item D was
superseded by D-closed and left with it; G(ii) pointed at a conflict item C had
already resolved.

### Other

- `two-class-lower-bounds.md` carried two sections numbered §4c (the K–K
  substitution and the counting-argument section). Every citation of "§4c" means
  the K–K one; the counting section is now §4d and the Rankin-shaped hybrid §4e.
- `sift-limit-attack.md` §7a-bis wrote the 529 requirement as "`B ≤ 51`",
  colliding with Lemma V's `B(z,s)` defined in the same file; now "`L ≤ 51`",
  matching §7a-ter and the staging record.
- `paper/PAPERS.md` conditioned the 2.649 almost-all paper on "if the Parseval
  mean-square form of Lemma V is proven"; the antecedent has held since
  2026-08-18/19, so the line now marks it a pending paper-grade decision.
- `README.md` §Status qualified "no route has moved that gap" the same way
  `TODO.md` and `ZONE-POSTULATE.md` already did.
- `genealogy.js` comment constant 0.41625 for 2·C₂·e^{−2γ} re-derived by hand:
  the true value is 0.41621 (the code prints the right value; TODO item 5's
  decision stands).

## 2026-08-19, the u_sup closure is basis-independent, and an absence expired on schedule

*(Report: `history/staging/attack-hm-basis.md`; producer
`research/attack-hm-basis.js`, embedded with `--streams both`.)*

### The open question attack 1 named: SETTLED, and it strengthens a closure

`u_sup`'s divergence was measured in the `e` basis, and `attack-tail-maximal.md`
reading 18 had flagged that such a divergence could be a fact about the
representation rather than the object. It is not. **The two bases differ only in
whether the `m`-sum sits inside or outside the single absolute value, so
`Ssup_hm ≥ Ssup_e` frequency by frequency** — 0 violations over 2309, 30029 and
510509 frequencies checked. The natural basis could never have rescued `u_sup`;
what was genuinely open was the size, and it is a **flat factor 7.2599**
(6.6170–7.8932 over z = 13..43, log-log slope 0.0133). `u_sup_hm` rises at 5 of 5
steps as the `e` column does, and the like-for-like bounded asymptote is 5.4512
against 5.4823, both above `β₂`. The withdrawn `τ(m)` re-pricing did not sneak
back in either: the `(h,m)` total is 6.62–7.89× **more** expensive at every level.

### Two corrections to same-week reports

`attack-tail-maximal.md` readings 21 and 12: **`z^{2s}` caps the SIZE of `m`, not
the count.** The realised `(h,m)` moduli run 32…3880 against `2^{π(z)}` =
32…8192, a ratio falling to **0.474** — fewer moduli, not more, which reverses
the direction that reading implied. And `attack-tau-repricing.md`'s "at most
`3·τ(m)`" is true at odd `m` but **`4.5·τ(m)` at even `m`**, attained at `m = 2`
at every level, because 2 may go to both `d₁` and `d₂`.

### New, and unaimed

The corpus's "23–44× and falling" Fourier gain **splits** at z = 43 into
`3.67 × 7.0136`: coherence *inside* a modulus, which is the falling half, times
coherence *across* moduli, which is flat. So the decay that made the Fourier
currency look like it was closing is entirely a within-modulus effect.

### research/qc/ledgers.js, the ABSENCE_VERIFIED entry recorded this morning

**EXPIRED ON SCHEDULE, and that is the point.** The entry read that the `(h,m)`
ladder had never been computed here, verified against the one file that could
have done it, and it carried its own expiry condition in its own words: *"it goes
stale the moment anyone attaches the weights"*. Someone attached the weights the
same day. The entry is rewritten rather than deleted, because an absence that was
true, was recorded with the condition that would kill it, and then died on that
condition is the best evidence this framework has produced that the discipline
does what it claims.

### Operational, and this one is the adjudicator's fault

`research/attack-hm-basis.js` was swept into commit `ce90c11` in an
**in-progress state**, because the adjudicator committed with `git add -A
research` while agents were still writing. Nothing was lost — the working tree
carries the final embedded version and the agent committed nothing itself — but
the rule is now explicit: **while a wave is in flight, stage files by name.**
Agents also reported the session scratchpad being shared, with one clobbering
another's log filename.

## 2026-08-19, L has no law of its own: it is G₂ divided by the block's own spacing

*(Report: `history/staging/attack-L-law.md`; producer `research/attack-L-law.js`.
The companion to the same day's sub-additivity result, and between them the
covering-by-blocks family is now mapped rather than merely bounded.)*

### The headline, and it dissolves the question rather than answering it

**`(L(v,y) + 1)·m̄(T_v) ≈ G₂(y#)` at every level where both are exact.** Over
`y ≥ 23` the spread across four tiles is 1.0000 to 1.0838, mean 1.0198, and it is
**exactly 1.0000 at `y = 53, 61, 73, 79`**, the residue being pure quantisation.
The block coordinate contributes **one** thing, the divisor `m̄(T_v)`. So
"compute `L` at the block where it reaches 529" is the same task as "compute `G₂`
there", and **`L` was never an independent handle on the object**. Taken with the
same day's super-additivity theorem — splitting yields floors and never ceilings
— the whole covering-by-blocks family is closed as a source of upper bounds.

### research/sift-limit-attack.md §7a, the 529 requirement

RESTATED as closed rather than open. The counting criterion's ceiling is 62,
proven and CRT-based; 529 needs `L ≤ 51`. That is a **deficit of 11 slots, a
factor of 1.216** — the route fails, it is not merely unfinished. Meanwhile the
object clears 529 by 2.59× and the margin *grows*: 1.63×, 2.59×, 2.99× at
`v = 3, 5, 7`. `L` itself reaches 529 only at `v = 17`, needing `G₂` at 61 primes
against a frontier of 22, roughly `10^{43.2}` nodes.

### New exact values, and one that supersedes a bound

An exhaustive branch-and-bound decision procedure — validated 9/9 against
full-period scans to 37.2M slots, against brute force, and against A144311 at
`n = 3..8` — pins `L` in **60 of 90** `(tile, y)` pairs, with 37/37 agreement
between two independent instruments. **`L(7,47) = 50`**, where the corpus carried
`≥ 49`: `l = 50` feasible in 29,381,838 nodes, `l = 51` infeasible on a completed
search of 107,391,034.

### And `L` is linear in nothing, which is a finding about our instruments

Calibrated against the one-class control, bias-corrected exponents span 1.314 to
1.754 and **the data prefers no abscissa**: not `y`, not `θ`, not `π`. The
apparent linearity in `θ ln²θ` is an estimator artifact, since the control reads
0.72 where the truth is 1; `y` and `θ` agree to 0.04 and `π` is the outlier.
**This is the trap that turned a polynomial reading into an exponential one at
DP1 two days earlier**, and it was avoided here only because the brief required
calibrating before fitting. Recorded as method, not as a number.

## 2026-08-19, Ford and Halberstam said in print it should win, and carried out it loses

*(Report: `history/staging/attack-ford-halberstam.md`; producer
`research/attack-ford-halberstam.js`. The level arithmetic below was re-derived
by the adjudicator before it was written here.)*

### TODO item 2, the only unexplored inequality left on the vector-sieve road

CLOSED. Ford and Halberstam, *J. Number Theory* 81 (2000), p. 15, from a 300 dpi
page image: *"This seems to us superior to Lemma 13 of [BF1] or (2.6) of [BF2] in
the treatment of the 'y_ℓ − x_ℓ' terms, and should lead to better results."*
Nobody carried it out in the 26 years since — Schindler and Sofos built the
multidimensional vector sieve from Brüdern–Fouvry in 2018 without citing it, and
Ford's own 2023 notes never mention the vector sieve.

**Carried out, it is not a different inequality.** Their Lemma 1 rearranges at
every `r` to `Σ_ℓ x_ℓ ∏_{j≠ℓ} y_j − (r−1)∏ y_j`, matching BF (2.6) to
`3.553e-15`. The entire claim is about the estimation step — **and that step is
better than they claimed**, since `χ̄⁺` is supported on `ν(d)` odd only, making
their absolute bound an identity (zero failures over 4.8M/3.0M/3.0M positions) at
no cost in level.

**What sinks it is the freedom forfeited, not the estimate.** One `χ⁺` per
component forces `D⁻ = D⁺`, so the per-component bound is a linear-sieve minorant
of level `D` capped by `f`, and the level currency becomes
`K_FH = 2(1+√e) = 5.297442541400` against `K_BF = 5.158064680330` — **2.702135%
worse** — with the `(+,+)` diagonal never buyable free.

**Priced both ways, and it loses both.** For us: exponent 5.297443 at
`θ_total = 1`, 5.141635 with Bettin–Chandee, against `β₂ = 4.266450`, needing
`θ_total > 1.241651` and `γ ≤ 0.805379` where the existing road needs 1.208983
and 0.827142 — strictly harder on both. **In their own problem**, evaluated
against all four side conditions with (iii) binding in the only feasible slot
assignment: **4.359140915496 against their published 4.156000022150**. It loses
to their own constant and misses `β₂` by 0.092691. Transfer to `G₂`: none, since
the work is all main-term and the `e(−hN/(d₁d₂))` factor is untouched.

**Worth stating as a fact about the literature rather than about us:** a
published "should lead to better results", left uncarried for 26 years, does not
survive being carried out. That is not a criticism of the authors — their
estimation step really is superior, exactly as they said — it is that the
inequality they were improving was not where the loss lived.

## 2026-08-19, how L combines: Chris's question inverts, and the instinct behind it is right

*(Report: `history/staging/attack-L-subadditivity.md`; producer
`research/attack-L-subadditivity.js`. Chris asked whether `L` should be smaller
for the combined set of two prime sets than for the two separately. The theorem
and the `G₂` identity were re-derived independently by the adjudicator on a
separate implementation before either was written into the corpus.)*

### The question as asked: RESOLVED, and the answer is the opposite sign

**For disjoint prime sets, `L(P ∪ Q) ≥ L(P) + L(Q)` [PROVEN]**, one line:
`a_p` is free, so a cover is translation-invariant, and translating `Q`'s cover
by `t = L(P)` lays the two end to end. Disjointness is the whole hypothesis and
no CRT is needed, because disjoint primes touch disjoint coordinates.
**Sub-additivity is impossible there**, and the concatenation baseline the
question implied is a floor rather than a ceiling. The exhaustive census agrees:
of 9330 disjoint pairs reachable to 9 primes, **zero** are sub-additive, 398 are
exactly additive and 8932 super-additive, mean surplus +10.5, max +44, with every
equality a small-set case.

### The instinct behind it: CONFIRMED, and misfiled rather than wrong

Drop disjointness and the sign flips, monotonically in the overlap: over 120,975
overlapping pairs the mean `Δ` runs **+8.21, +5.83, +2.48, −2.31, −8.96, −18.06,
−30.58, −47.00** at `|P ∩ Q| = 1..8`, **crossing zero at an overlap of 4**. The
deficit is real and it is about **prime reuse**, not about union of sets. And
against the operation `L` actually respects it is true as stated: `L` is
super-additive but **sub-multiplicative**, ratio min 0.264 and mean 0.504, because
merging multiplies spacings while only adding residuals
(`L+1 ≈ m̄(P)·m̄(Q)·r(|P|+|Q|)`).

### What it closes, and it closes a family rather than a route

**Super-additivity kills upper-bound-by-splitting outright.** Splitting a prime
set yields floors on `L`, never ceilings, so no argument of that shape can bound
`G₂` from above. It is not an obstruction either: the best two-part floor in
block 1 is 15 against a requirement of `B ≤ 51`, and the defect compounds rather
than accumulating — the best `k`-part floor falls from 64 to 9 across all
Bell(9) = 21147 partitions.

### And the by-product is worth more than the answer

**`L(primes ≤ x) + 1 = G₂(x#)` at every exact ladder level** — nine by the
attack, seven re-derived here on an independent implementation. At these levels
the covering form's **free translate buys exactly zero** over the pinned sieve
pair `{0, −2}`. The two formulations that `research/qc/units.js` §5 exists to keep
apart therefore agree numerically on this range, which is a fact about the object
and emphatically not a licence to substitute one for the other.

## 2026-08-19, the FKMPT alarm was stale when I raised it## 2026-08-19, the FKMPT alarm was stale when I raised it, and one of its "fixes" was a regression

*(Report: `history/staging/verify-fkmpt-corrigendum.md`. Raised as the top item
of `TODO.md` the same day and closed by the attack sent to work it. The entry
being corrected is the adjudicator's, not an agent's.)*

### TODO.md item 1, PRIOR-ART.md and G2-STATE.md: "FKMPT carries a 2023 corrigendum that nothing here has read"

RETIRED, false when written. The corrigendum-incorporated PDF was pulled and read
**on 2026-08-18**, a day before the alarm: `covering-dive.md` §2.3 quotes its
Appendix A verbatim, records what the authors themselves blame, and
`history/staging/lit-pdf-fkmpt.md` logs the JEMS PDF of record with its hashes.
**Nothing load-bearing is affected.** The corrigendum changes `4+δ → 6` in
`C(ρ)`, and with it `C(ρ) > e^{−1−6/ρ}`, `C(1) > 1/835`, `C(1/d) > e^{−(6d+1)}`,
**`C(1/2) > 1/325565`** and `6 < M ⩽ 7`; the rest is proof-internal. **Every one
of those corrected values is already the value this corpus uses**, including
`1/325565` in `two-class-lower-bounds.md` §2a and `attack-lower-bound.js`. Of 25
FKMPT citations audited, 22 are clean. The provisional markers are withdrawn from
all three documents.

**The lesson, and it is this corpus's own rule read backwards.** The standing
lesson has been "prior art already on disk is not prior art in the argument".
Its inverse cost a day here: **an alarm about missing prior art must check the
disk before it is raised.** The alarm was taken from an agent's report and
propagated into three documents without a `grep` that would have settled it in
seconds.

### The proposed "Remark 7 → Remark 4" correction

REFUSED, and it was a REGRESSION rather than a fix. **Remark 7 is correct in the
published text**, read from page images: p. 7, marker `[7]`, "log log X".
**Remark 4 is that same passage's number in the Dartmouth preprint**, where the
marker is `[9]` and the bound is written "log₂ X"; Remark 4 in the *published*
text is about Theorem 1 equivalence and never mentions twins. `covering-dive.md`
§2.3 had already written this down as citation hygiene, in terms — "anyone
checking Remark 7 against the Dartmouth file will read a remark about polynomial
coefficients instead". The attack that proposed the change had read the preprint,
and applying it would have **injected the defect it claimed to remove**.

### "Hough's Lemma 3.2" — confirmed, and a second defect found beside it

CONFIRMED: it is **BBMST, *Erdős covering systems*, arXiv:2211.01417 p. 4**,
verbatim. And while confirming it, a second citation defect surfaced:
`history/staging/attack-DP1-mechanism.md` also has Hough's **title and volume**
wrong. It is *Solution of the minimum modulus problem for covering systems*,
**Ann. of Math. 181 (2015) 361–382**, not 183 (2016).

## 2026-08-19, the custody migration, and the two gaps it found in the embedder

*(Report: `history/staging/custody-embed-migration.md`. The last of the overnight
ten, and the one that ran longest.)*

### The counter, restated against a true baseline

The advisory read **56** and 56 was wrong, because the parser was blind to 51
tails. Measured against commit `97e2cfa` with the corrected parser, the true
baseline was **107 tails, none bound**. The working tree now carries **126 tails,
79 bound, 47 hand-pasted**, and **55 of the 79 were bound by this attack**. The
slow tier ran at 900 s and then a second pass over the 38 tails the old parser
had skipped, so all 126 are now covered: of the 91 visible, 28 reproduced every
figure and 58 had at least one absent; of the 38 hidden, **29 reproduced every
figure and 9 had one absent — the hidden population was the healthier one.** The
five over-tier scripts are now measured rather than unknown, from 1,006 s to
3,368 s.

### The dominant blocker was never arguments, it was the capture channel

`embed.js` recorded **stdout only**, while the legacy tails were pasted from a
terminal showing the merged stream. **35 scripts here write progress with
`process.stderr.write`**, 15 of them among the unbound. Demonstrated cleanly:
`fold-profile-13/14/15/16` each miss exactly one figure, `2.23e+8`, which exists
only on stderr. **Fixed**: `--streams both` appends stderr under a marker and
hashes the pair, the fingerprint records **which** mode was used, and `--check`
verifies in the mode the tail records rather than the caller's default. The
default stays stdout, so all 79 tails bound before the change still verify — spot
checked on three, both hashes matching.

### And it could not record an environment

`a3-01` states its own invocation as `FOLDS=… node --max-old-space-size=12000 …`.
Setting those in the shell and embedding would have written a tail whose recorded
`invocation` was **false**, so the attack correctly refused to do it rather than
produce a tidy lie. **Fixed**: `--env` and `--node-flag` are first-class, appear
verbatim in the recorded invocation, and are carried into the regenerate line.

### No fiction, and the causes of the remaining 47

Across the 47: 15 stderr channel, 16 arguments or environment, 13 real blocks
carrying hand-written prose rather than output, 3 declared composites. **No case
of an invented tail was found anywhere in the migration** — the 2026-08-18 defect
remains the only one of its kind on record here.

### Two adjudicator items it surfaced, neither yet acted on

**`fossil-shadows.js` pastes another script's rows without saying so** — its
percentile table comes from `attack2-02-08-tomography.js`. `05-twin-jacobsthal`
does the same thing and declares it in its first line, which is the difference
between a composite and a misattribution. **`genealogy.js`'s tail reads `0.41625`
where its own code prints `0.41621`** — the known cross-document constant,
surfacing inside a tail this time.

### The forcings, and the fact that the guard was inert while they ran

Four files were forced — `attack-01-gap-cartography`,
`attack-06-difference-hierarchy`, `attack-06b-difference-map`,
`attack2-01-06-seam-census` — losing 11 tokens between them, every one a
hand-reflow artifact (spacing in a list, a `5.25-5.29` range summary, `3.0e8`
against `3.00e+8`), and all four old blocks are quoted verbatim in the report
before the overwrite. **The first 15 embeds of this attack ran while the guard
was still inert**, before the parser was fixed mid-session. All 55 were therefore
re-verified afterwards against the pre-wave commit with the corrected parser:
**nothing lost on 51 of 55, and the other four are the forcings above.**

## 2026-08-19, DP1's one mechanism is closed with a theorem, and its absence claim was wrong twice over

*(Report: `history/staging/attack-bonferroni-degree.md`; producer
`research/attack-bonferroni-degree.js`. It finishes the verdict attack D
half-reached the previous day.)*

### sift-limit-attack.md §7e, "one consumer, and it loses by a factor growing as a power of x"

RETIRED AS A DESCRIPTION, and replaced by something stronger and differently
shaped. **The right variable is `θ(x)`, not `x`.** `ln(6L/G₂)` is *linear* in
`θ(x)`, with measured slopes 0.5441, 0.5425, 0.2816, 0.2937, 0.1695 at
`k = 2..6` against a predicted `1/(2⌊k/2⌋)`, so the certified bound is about
`(x#)^{1/(2⌊k/2⌋)}` — **exponential in `x` at every fixed degree**, not
polynomially worse. **Attack D's `+5.20` log-log slope is therefore a fit
statistic for an exponential and must never be quoted as a growth exponent.**
A theorem, proved and verified 59/59 against the exact simplex, explains the
shape: odd degree is nearly free, `k = 3` tracking `k = 2` and `k = 5` tracking
`k = 4`.

### And the required degree provably diverges, self-defeatingly

`k* ≥ (θ(x) − O(1))/(log G₂(x#) + O(1))`, so under any polynomial bound
`G₂ = O(x^B)` the degree needed is `≥ (1+o(1))·x/(B log x)`. **The better the
`G₂` bound assumed, the higher the degree the certificate needs** — a route that
gets harder exactly as it succeeds. Measured across eight levels,
`k* = 2, 4, 5, 8, 10, 12, 14, 16` with slope 1.066 ± 0.099, the eighth level from
a **full enumeration of `x = 29`, 1,078,282,205 slots**, which independently
re-confirms `G₂(29#) = 258`. The same theorem proves, up to a constant, the
moment arithmetic this file had been assuming at §1.

### attack D's retired absence, settled the other way

It claimed the mechanism was classical but unrepresented in the sieve literature,
and that claim was retired the same day as unsupported because attack D's five
literature agents all died without reporting. Searched properly and calibrated,
**the degree-2 member is in print: Friedlander, *Math. Ann.* 267 (1984) 101–106**,
the second moment of the sifted count over windows converted to a gap-moment
bound. Gorodetsky arXiv:2111.00853 is the modern unconditional variance, and
Brady arXiv:2112.02722 casts the pair correlation as an SDP with no gap output.
`k ≥ 3` is genuinely unresolved in the literature. **So the absence was wrong
twice: once as asserted without a search, and once in its direction.**

### sift-limit-attack.md §7d, the two DP1 shares that read as a contradiction

RECONCILED, not corrected: they are the same quantity at two ranges. The §7d
table's `+2.1945` on a floor of 3.1945 (DP1 at 67%) is the `x ≤ 23` LP over 16
readings; §7c's `+2.32` on a floor of 3.3152 (DP1 at 71%) is the push to
`x ≤ 43` over 33 readings, and it is the current figure. The table now says so on
its own row, because a reader meeting one without the other had no way to tell.

### Three corrections carried in from the same report, applied or flagged

`certificate validity is NOT monotone in L` — measured 1.000818, 0.987479,
1.020035 at `L = 3149, 3150, 3151`, so a ladder in `L` can overshoot and any
argument assuming monotonicity there is unsound. Two citation defects are flagged
rather than silently changed, since this corpus has been burned by both
directions of that: **"Hough's Lemma 3.2" appears to be BBMST arXiv:2211.01417**,
and **the FKMPT remark this corpus cites as Remark 7 may be Remark 4**. The FKMPT
one compounds with the 2023 corrigendum MR4592874 that nothing here has read, so
**every FKMPT citation needs one pass at the source before it is quoted again.**

## 2026-08-19, a new lower bound survives its adversary, and it is two logs above the free one

*(Claim: `history/staging/attack-kk-substitution.md`, producer
`research/attack-kk-substitution.js`. Adversary:
`history/staging/verify-kk-substitution.md`, producer
`research/verify-kk-substitution.js`. The claim was written on 2026-08-19 and
**deliberately kept out of every corpus document until the adversary reported**,
which is the first time this project has held a result at the door.)*

### two-class-lower-bounds.md §4b's `y ≍ x log x`, and ZONE-POSTULATE.md §3's free bound

SUPERSEDED IN STRENGTH, not retired. `G₂(P(y)) ≫ y (ln y)³ (lnlnln y)²/(lnln y)⁴`
for `y ≥ y₀`, obtained by substituting `Ω_p = {a_p, a_p−2}` into
Kalmynin–Konyagin's published Erdős–Rankin construction and carrying their §2
trichotomy through line by line. Two logs above the free bound
`G₂ ≥ g` imports, one above the sketch in §4b. **It consumes** their Lemma 1 and
Corollary 1 at `κ = 4` (they use 6), Mertens with Rosser–Schoenfeld, the standard
smooth-number estimate and CRT. **It does not consume** their Lemma 2,
Chebotarev, Theorem 2, Lemma 3 or `M(f)` — the whole §3 apparatus — because
`h_f = 0` for the two-linear-factor system leaves `Ω^II` empty and Case 2's
hypothesis quantifying over nothing.

### The adversarial check, and why its method is the record worth keeping

The checker was briefed to break it, pulled the source PDF independently (md5
matching), re-read every load-bearing display from 200 dpi page images rather
than `pdftotext` — and **brute-forced the Proposition's finite content**, which
is the move that makes the verdict worth something. Over `i = 1…4·10⁶` at
`y = 200000`, `z₁ = 300`: with `2m/y < z₀` satisfied, **zero counterexamples**
among 16985, 14381 and 13164 unkilled `i`; with it violated, 235, 799 and 2921.
The hypothesis Case 1 claims to consume is necessary and sufficient at finite
scale, which also excludes a covering-form/sieve-form leak, since a leak would
have surfaced as a counterexample. **Verdict: STANDS WITH CORRECTIONS.**

### The five corrections, all to the claim's presentation rather than its theorem

(1) A `1.5e6` quoted at `y = 4001` was never computed; the true `z₀` is `5.26e3`
and `1.5e6` needs `A = 6.722`. (2) The §3a check tests `z ≪ X` but not the
Selberg support, and a naive `ξ = √y` leaves a remainder `(ln y)^12` above the
main term — repairable at `ξ = √y/(ln y)⁷`, so the fact holds and the check did
not. (3) The headline mis-routed Theorem 2 and Lemma 3 to `h_f = 0`; they drop
for the Case-3 reason instead. (4) A draft dropped "for that step" from `A > 3`;
the proof needs `A > 4`. (5) The `5.7e-13` collapse cannot test the `O(1)`,
because both sides dropped it.

### And the checker's own near-miss, recorded because it is the lesson

A `pdftotext` linearisation nearly produced a **false finding against
Kalmynin–Konyagin's** `π(y) − π(y/2)`. The page image showed they were right.
Text extraction is not reading, and this corpus has now been bitten by that in
both directions.

### What it costs, which is why no computation here can see it

`y₀ = 10^{134.1}` at `A = 4.05`, with the binding condition always `z₀ < z₁`, and
band 2 is empty at `y = 4001` for every `A > 4`. So the D4 factor-5 loss recorded
in `attack-lower-bound.md` is **not evidence about this construction**, and no
finite search in this repository can exhibit it. The Zone Postulate's margin is
untouched: `x²/(x ln³x) → ∞`.

## 2026-08-19, the τ(m) price is withdrawn, and C^{π(z)} was right all along

*(Report: `research/history/staging/attack-tau-repricing.md`; producer
`research/attack-tau-repricing.js`. Fourth correction of the night to work
integrated the previous evening. The claim being corrected was written into
`sift-limit-attack.md` §7e and `TODO.md` item B by the adjudicator hours after
attack C proposed it.)*

### sift-limit-attack.md §7e and TODO item B, "the quantifier is separable and its price is τ(m), not C^{π(z)}"

**Half true, and the half that was carried into the corpus is the false half.**
The **separability is TRUE and verified four independent ways**: the one-class
Fourier identity against brute force to `5.08e-14`, reciprocity
`c/(d₁d₂) ≡ −2d̄₁/d₂` over 13,116 coprime pairs with **zero** violations, and the
aggregate identity against a full-period count to `2.52e-13`. It is also **not
new** — it is L5, already sitting in `research/lemmaV-parseval.js` lines 55–62,
so what was reported as a discovery was a rediscovery of our own lemma.
**The re-pricing drawn from it is RETIRED.** The chain contains ONE
absolute-value step doing two jobs at once: `|e(ax/e)| = 1`, which is free, and
the triangle inequality over the `(e,a)` sum, which is where all the loss lives.
The first cannot be taken without the second, so removing the phase does not buy
the cheaper count. `τ(m)` counts terms inside a single modulus; summed over the
modulus set it **is** the divisor-pair count, up to the vector sieve's factor 3.
Measured: used as a bound, the `τ(m)` price is **4–5× worse** in the Fourier
currency and **23–44× worse** in the divisor-pair currency than what the corpus
already computes, and `S_sat`'s per-added-prime factor recomputes at **2.0516**,
reproducing the 2.05 already recorded. **`C^{π(z)}` was right.**

### attack-theta-last-gap.md §6's "closed asymptotically, from z = 10¹²"

RETIRED as a threshold, in the direction that closes the route sooner. The sum
needs the AVERAGE `τ`, and on the actual working-point modulus set, enumerated
exhaustively, mean `τ` is **flat at ≈ 17** (slope 0.1172) against a requirement
growing at `β₂(θ−1) = 0.9052`. They cross **at the lowest level tested, z = 31**,
not at `10¹²`. The trap that produced the optimistic figure is worth recording:
the textbook `Σ τ(m) ~ M ln M` does **not** apply here, because every modulus in
play is `z`-smooth, and an earlier draft that used it landed the crossover five
orders of magnitude the wrong way.

### What the re-pricing does change, which is a constant and not a conclusion

`u_1^prov` moves from `3.4299…7.1966` to `3.0839…7.0324` under `Θ*`, to
`2.6523…6.5619` exact, with a floor of `2.6346…5.7972` at `B₂ = 1`; the gain
shrinks with `z` (0.7776 → 0.6347, slope −0.1241). The floor itself diverges like
`z/(2 ln z)` and exceeds 2 by between 0.63 and 3.80, so **`θ < 2` is unreachable
on this chain at any price.** `u_sup` does not reopen either: its closure numbers
re-derive from the exact `S_sat` (4.9872 and 6.1967 against the published 4.99
and 6.20, asymptote 5.5649 against 5.56), and under the `τ(m)` price the ladder
is 0.43 to 0.55 **worse** at all ten levels.

### An operational note, because it affected the night's runs

One agent in this wave ran `pkill -f "qc/embed.js"`, which killed three of
another agent's embed runs mid-flight. Nothing was corrupted — the embedder
writes only on a completed run — but the transient `tail-does-not-belong-to-this-code`
findings seen during the wave trace partly to this. **Agents sharing a working
tree must not pattern-kill shared tooling.**

## 2026-08-19, the Brüdern–Fouvry re-split was a trap, and 99.3% of it evaporates

*(Report: `research/history/staging/attack-bf-split.md`; producer
`research/attack-bf-split.js`. The third correction in one night to work
integrated the previous evening, and like the other two it was found by sending
somebody to check rather than by re-reading.)*

### sift-limit-attack.md §7b, "their side condition constrains only D₁D₂, so re-splitting gains 0.0295482779"

RETIRED, and the defect is a quantifier-shaped one: **Brüdern–Fouvry have FOUR
side conditions and only the fourth is a product condition.** Read at 600 dpi
from numdam PDF p. 10 = journal p. 345, they are `q^{C₀}D₁ ≤ x^{1−cε}`,
`q^{C₀}D₁D₂² ≤ x^{2−cε}`, `q^{C₀}D₁²D₂³ ≤ x^{3−cε}` and
`q^{C₀}D₁⁴D₂⁴ ≤ x^{5−cε}`. The first constrains `D₁` alone; the middle two are
asymmetric. The 2026-08-18 reading quoted the fourth and inferred the shape of
the whole constraint set from it. **Condition (iii) binds at their own split**,
where it and (iv) saturate simultaneously, so their point is a **vertex** and the
signature of an optimisation already done rather than an oversight. The claimed
optimum violates (iii) by `x^{0.040403}`.

### What survives, stated at its real size

`0.0000120536` in `θ`, which is **0.70% of the claim**. Their vertex is not
stationary, `dθ/dβ = −0.006021189818`, and the true optimum sits just inside edge
(iii) at majorant `x^{0.502674}`, minorant `x^{0.745990}`, giving
`θ = 0.240628029251`. **Their printed "0,2406" is unchanged**, so nothing here
touches their paper. At that optimum (iii) binds and (iv) has slack, the reverse
of the 2026-08-18 picture.

### And the slot assignment was reversed in this corpus

`D₁` is the **minorant** at `x^{3/4}` and `D₂` the **majorant** at `x^{1/2}`, not
the other way round. Also checked at the source rather than assumed: the four
printed conditions are exactly the p. 348 maximum after substituting their `D₂'`,
and their choice of `D₂'` is itself optimal since every remaining condition is
non-increasing in it up to (2.15). No comparability of the two levels is needed
anywhere, so **four independent levels buy exactly `0.00000000000000`**.

### One live lead, independent of all of this

**Ford and Halberstam (J. Number Theory 81, 2000) state in print that their dual
decomposition should beat Brüdern–Fouvry's inequality (2.6), and never carry it
out.** Nobody in this corpus has followed that.

## 2026-08-19, the red team: what a day of fast integration got wrong

*(Report: `research/history/staging/redteam-2026-08-18.md`, an adversary briefed
to break the six headlines of 2026-08-18 rather than extend them. Four CONFIRMED,
two WEAKENED, one REFUTED, and a seventh it added itself. **Every one of the
corrections below lands on text the adjudicator wrote into the corpus the same
evening**, which is the point of running one.)*

### two-class-lower-bounds.md §6 and G2-STATE.md §6.2, "two independent instruments"

REFUTED. The claim was that model selection over the ladder and the exact-frame
diagonal are independent witnesses, and that their agreement is therefore
evidence rather than repetition. **The exact frame cancels out of every reported
offset.** OLS slope is linear in the response, and both regressions subtract the
same `ln(m lnD)` against the same regressor, so the frame is gone from the
difference: recomputed with no frame at all, the offsets agree to **4.44e-16**,
and dividing by `x⁵`, `eˣ` or `1/x³` leaves the MP2 offset at −0.7581 in every
case. Worse, the diagonal hands back attack E's **own fitted parameter**: the `b`
it lands on is 0.8930 against E's fitted 0.893, agreeing to 0.000292. Both
readings also weaken on the same deleted point, `x = 11`, which is what
dependence looks like. What the frame really contributes is the **error scale**,
not a second measurement.

### The same two files, "c x ln²x excluded at 31.8 AICc units" and "the pure power law excluded at 10.6"

BOTH RETIRED as exclusions. (i) The 31.8 is not shape evidence, and
`attack-growth-law.md` §2b said so before the adjudicator quoted it without the
qualification: the **one-class control, whose conjectured truth IS `x ln²x`**, is
thrown out by 32.8. A frozen one-parameter law is beaten at this range whether or
not it is true. (ii) The power law's 10.6 falls to **3.3** on deleting the single
point `x = 11`, and at `x = 5..79` **the whole ranking reverses**: PW wins and
MP2LL is excluded at 38.4. `attack-growth-law.js` computes that reversal itself,
as its block D2, and neither its fourteen readings nor any of the eleven sections
of its report mentions it, including the section listing what is not established.
The stated reason for starting at `x = 11` is that `lnln 2 < 0`, which excludes
`x = 2` and nothing else. **The low end is a judgement and the answer is a
function of it.**

### What replaced them, and it is weaker and honest

`G₂(x#) = x ln^{2+o(1)}x` with the `o(1)` positive, best single description
`0.76 x ln²x lnln x` over x = 11..79, **two significant figures on the constant
and not three** (jackknife band 0.7574–0.7698, window band 0.7534–0.8316). The
frame-free RANKING survives and is a fact about `G₂`: `c x ln²x` sits 0.758 from
the data's own trend against 0.0908 for `c x ln²x lnln x`, a factor of eight. So
does the `x`-exponent tending to 1 at every window tested, and MP2LL's stability
under every single-point deletion on the stated window.

### An AICc mis-specification, running in the safe direction

`attack-growth-law.js` counts `k` parameters where a Gaussian least-squares model
with unknown variance estimates `K = k+1`, the coefficients and `σ²`. The AICc
correction depends on `K`, so it does not cancel in a difference: at n = 18 the
shift is 0.00 for k = 1, 0.36 for k = 2, 0.81 for k = 3, and it always penalises
the larger model. Corrected, PW moves 10.6 → 10.9 and MP2 stays at 31.8. A real
defect, worth fixing, and it does not touch the winner.

### sift-limit-attack.md §7b and this file, `1/4.156000 = 0.2406159756`

CORRECTED to **0.2406159769**. The true value is 0.240615976901, recomputed by
the adjudicator. The wrong digit string came out of a report and was **hand-copied
into two documents**, which is precisely the act `research/qc/embed.js` was built
the same day to make unnecessary. A number typed by hand is a number nobody ran.

### TODO item A, "the maximal wall is entirely in the tail"

WITHDRAWN within hours of being written, on the attack that went to look. **The
split does not localise the wall, it parametrises it.** The head is exactly the
conditional mean of `R_H` on the class `x mod m` and carries exactly `m−1`
frequencies, so Cauchy–Schwarz bounds its supremum with no quantifier over `x` at
all: the measured flatness was a theorem about the CUT, not about the sieve. The
tail's own `sup|T|/rms(T)` rises 2.3142 → 4.1244 over z = 13..23 tracking
`√(2 ln W)`, the tail carries 99.65% of the mean square by z = 37, and a free
head buys 1.0039×. A tail-only maximal inequality is the whole ask.

### Two confirmations that came with a correction attached

The `B` chain checks **as a proof** (exponent 8 measured at 1.9997/3.9993, no
violations at z = 43 or s = 2.0), but its stated `(log z)^14` threshold is wrong:
the true requirement is `(log z)^{8+o(1)}`, so the claim was conservative rather
than false. DP1's six certified bounds all verify on the sharp LP, **including
x = 17 and 19, which the producing script never LP-checked** — x = 19 clears by
1.4e-4, re-certified in exact BigInt — but its headline slope **+5.20 is a
five-point fit; on the six printed ratios it is 4.60**.

### And one the red team added: what OEIS actually asserts about A144311

The ladder's provenance is CONFIRMED — both sequences diff identical, offset and
definition correct, and OEIS answers `curl` at 200 while returning 403 to
WebFetch. But **its keywords are `nonn,more,hard`, so OEIS asserts no
maximality.** Any maximality this corpus claims for those terms rests on our own
pruning bound and must be attributed there, never to the OEIS entry.

## 2026-08-19, the overnight wave: three landings, and a channel this file said was closed

### research/SEARCH-CONVENTIONS.md §5, "MathSciNet remains UNSEARCHED — it is paywalled and redirects to LibLynx"

RETIRED, half true and wholly misleading. The subscription **UI** does redirect
to LibLynx. The **index** does not: `POST https://mathscinet.ams.org/mrlookup`
with `au`, `ti`, `jrnl`, `year`, `format=bibtex` is free, answers against
MathSciNet, prints the total match count and returns BibTeX. Calibrated on six
known positives, two of which the adjudicator re-ran independently before this
was written (MR4727548 Kalmynin–Konyagin, MR4239958 Brady). Gotcha recorded:
`year=1900-1963` reads as a **lower bound**, not a range, which makes complete
enumeration possible by differencing. Residual, stated rather than hidden:
bibliographic fields only, no review text, no abstracts, no MSC.

### research/SEARCH-CONVENTIONS.md §5 and TODO item 000, "Holt's 2022 book remains unread"

CLOSED BY PROXY, and the reason it was never findable is that the book is
**self-published** (Independently Published / KDP, 212 pp, ISBN 9798831607314),
so MathSciNet, zbMATH and Crossref all return zero and no indexed channel was
ever withholding it. Four of Holt's own artifacts read in full with hashes
recorded: `Jacobsthal` 0, `maximum gap` 0, `upper bound` 0, `spacing` 0 across
all four, and his video series named after the book gives a chapter order with no
maximum-gap chapter. Residual: Google Books returned HTTP 429 all session.

### research/SEARCH-CONVENTIONS.md §3, the position-uniform bilinear remainder row

RETIRED, wrong by omission. It read "None found", having searched Iwaniec 1980
and Brüdern–Fouvry in our own wording. Searched in the convention that owns the
object — **bilinear and trilinear forms with Kloosterman fractions** — the answer
is sharper and worse for us: the aligned-position case is in print at
`γ = 0.970624` (Bettin–Chandee 2015), Duke–Friedlander–Iwaniec 1997 reads
`γ = 1.009638` in our configuration and is **worse than trivial** because our
level split `b/a = 1.4243` exceeds their `6/5` threshold, and the needed figure
is `0.824975`. In `θ_total` currency, `1.030303` against `1.208983`; the route
returns exponent **5.090707**, worse than `β₂`. **The 35% of square-root
cancellation attack C priced yesterday is not available in print.** Also: the
arXiv API is NOT dead, which an earlier session recorded — it answers on `https`
and 301s on `http`. And arXiv:2601.00292, which claimed to improve DFI, was
**withdrawn by its authors on 5 Jan 2026**.

### The `[ABSENT]` beside Lemma V in sift-limit-attack.md §4.7

DOWNGRADED from an absence to a price, which is a different and more useful
statement. Position-uniformity is charged by the source itself: Bettin–Chandee's
Remark 1 admits our window phase at `(1+hx/MN)^{1/2}`, `O(1)` only for
`x ≪ H^{1.212157}`, while our `x` reaches `exp(H^{0.2344})`. So the exponent gap
is technical and the uniformity gap is structural and larger.

### TODO item H, the u_sup novelty check

DISCHARGED, and it landed where the item feared. The Fejér-mass identity
`Σ_{a ≢ 0 mod e} F_H(a/e) = h(e−h)` **is** the classical
`Σ_{k=1}^{n−1} sin²(πkm/n)/sin²(πk/n) = m(n−m)`, verified for all `2 ≤ n ≤ 60`;
folklore, exactly as suspected. The mean-value half sits in dense named territory
(Salerno MR1133234, BFI, Barban–Vehov/Graham), and the route being closed makes
the consequence presentational.

### Three additions to PRIOR-ART.md, one of which is a live risk

**FKMPT carries a 2023 corrigendum, MR4592874, JEMS, and this corpus has never
cited it.** The MR record was verified independently by the adjudicator. Every
FKMPT quotation here predates it, including the Remark 7 the sift-limit work
leans on, and none has been checked against it; those quotations are marked
provisional until someone reads it. **Brady's thesis IS in MathSciNet**, MR4239958,
so any reading that it was unindexed is withdrawn. **Maier–Pomerance 1990 is the
earliest two-classes-per-prime sieve device in print**, a lower-bound device, so
it leaves the upper-bound novelty sentence standing while retiring any suggestion
that the two-class configuration itself is new here.

### And the novelty sentence, re-tested rather than re-asserted

It stands. Complete title enumerations on the newly reachable index — 19 records
for `Jacobsthal function` across 1900–2026, 39 for `Jacobsthal` pre-1990 —
contain every published upper bound on this object, and **every one of them is
one class per prime**: Erdős 1962, Kanold three times, Vaughan, Stevens, Iwaniec
1978, Costello–Watts. Kalmynin–Konyagin is a lower bound, and FKMPT's `|I_p|` is
"bounded and about 1 on average" and also a lower bound. So
`G₂(x#) ≪_ε x^{4.26645+ε}` remains the first published upper bound at any
exponent for the two-class problem.

### Held deliberately, not applied

Attack 4 reports a **proved** lower bound, `G₂(P(y)) ≫ y (ln y)³ (lll y)²/(ll y)⁴`,
by finishing the Kalmynin–Konyagin substitution on paper, with K–K's entire §3
apparatus falling away as vacuous. Its script binds and its report is thorough.
**Nothing from it has been written into any corpus document, and nothing should
be, until the adversarial check now running reports.** A claimed new theorem
derived overnight and unrefereed is precisely the artifact this repository spent
2026-08-18 learning to distrust.

## 2026-08-18, attack C: the quantifier is cheaper than we said, and Brüdern–Fouvry was never in conflict

*(Report: `research/history/staging/attack-theta-last-gap.md`; producer
`research/attack-theta-margin.js`. Everything re-derived, nothing inherited, on
the rerun of an attack that died leaving only prototypes and a known bug in
them.)*

### sift-limit-attack.md §7b, "our 5.158065/θ_total reads 4.126452, not their 4.156000 … unverified"

CLOSED, and it was never an error on either side. `4.156000 = (1+e^{b/2a})/b` at
Brüdern–Fouvry's split `(a,b) = (1/2, 3/4)`, and `1/4.156000 = 0.2406159769`
reproduces their published "0,2406" exactly, while their "0,2343" is `1/β₂`.
Theirs is the **unoptimised** split and ours is the optimised one. Their side
condition constrains only `D₁D₂`, so re-splitting stays inside their own
hypothesis and gains `0.0295482779` of exponent their theorem does not claim.
The caveat is kept deliberately: their other three side conditions were not
checked for split-sensitivity, so this is an arithmetic reconciliation, not a
claim about their theorem. [ABSENT] no published re-optimisation, on OpenAlex
with all ten citing works read and on WebSearch, both calibrated in the same
session; Semantic Scholar returned 429 and no negative is claimed from it.

### sift-limit-attack.md §4.5 and TODO item B, "the quantifier is priced, and the price is C^{π(z)}"

CORRECTED, and the correction makes the wall cheaper without moving it. All of
the `x`-dependence sits in a **single factor** `e(−hx/m)`, so the quantifier is
**separable and priced at `τ(m)`**, not at `C^{π(z)}`. The `C^{π(z)}` figure was
the price in the particular form the `u_sup` extension measured, quoted as though
it were the price of the quantifier itself. Still a wall, and closed
asymptotically from `z = 10¹²`.

### What the rerun establishes, and what it does not reach

`θ_total` reaches **1**, unchanged, with the break-even re-derived independently
at **1.208983** (1.212157 with the `(+,+)` diagonal made free, which costs
0.003175 of `θ`). The reason for the ceiling is sharpened from "absolute values
are sharp at the worst position" to **the absolute-value ceiling is `c·H^θ` with
`c > 0`**, a power rather than a polylog, so the whole budget available to any
sharper constant is `O(lnln H/ln H)` and `θ_total = 1` is not shakeable by
improving constants. One integer sets the supremum: `n₀ ≡ 0 mod ∏S₁`,
`n₀+2 ≡ 0 mod ∏S₂` fires every split pair at once. The smallest sufficient
improvement is priced at **35.0% of square-root cancellation** (`γ ≤ 0.824975`
against a trivial 1), so the gap needs *any* power saving rather than a hard one.
Independent per-component levels buy nothing, and the apparent 0.46 gain from
them is the sieve formula read outside its range of validity. No finite scan can
adjudicate `θ`: the ceiling does not exceed `H` until `z ≈ 3.9×10⁴` to `6.3×10⁵`.

## 2026-08-18, attack D's DP1 headline: one retracted, one corrected, one withdrawn as evidence, one kept

*(Report: `research/history/staging/attack-DP1-mechanism.md`, rewritten from the
ground up. Producer: `research/attack-D-twopoint.js`, which the original run
never wrote. The first version of that report was written by an agent that died
before writing a line of code, so its four load-bearing claims were asserted
without a run; the script now computes all four.)*

### "the degree-k certificate proves no empty window iff max_r X_r ≤ k, and that is an identity"

RETIRED, false. The governing quantity is the **range** `X_max − X_min + 1`, not
the maximum. The two agree in 2 of 14 measured rows, and a set with a survivor
every third slot has `max_r X_r = 3` with threshold degree 2. The claim is true at
`L = G₂/6` alone, where `X_min = 1` is forced, which is the one place the
inherited text happened to use it.

### "degree 2 works iff Var(X_L) < (t−1)(2−t) + 2/M, i.e. Fano below 1/6"

RETIRED, a special case quoted as the general one. It is the `s = 1` member of
`Var < (t−s)(s+1−t) + s(s+1)/M` with `s = ⌊t⌋`, optimal only for `1 ≤ t ≤ 2`;
outside that range the stated right-hand side goes **negative** (`−10.07` at
`x = 17`). The Fano threshold is `frac(t)(1−frac(t))/t ≤ 1/(4t)`, not the constant
`1/6`. The corrected criterion agrees with the sharp LP in 73 of 73 rows.

### "natal5-variance.js reading 2's Fano 0.152 → 0.347 puts the crossing between x = 5 and x = 7"

RETIRED AS EVIDENCE, on a units error of the class `research/qc/units.js` exists
for. The Fano values reproduce exactly, but they are measured at `L = W = x#`
integers where `t = 6.92 … 41441`, while the `1/6` threshold holds only at
`t = 3/2`. The comparison is off by 14× to 9.5×10⁴. The conclusion happens to be
separately true at `L = G₂/6` and is now measured there instead of inherited.

### "the mechanism is classical and unrepresented in the sieve literature"

RETIRED, unsupported. No search backed it. Attack D's three literature children
and two grandchildren all died without reporting and the parent received nothing
from any of them, so the absence had no channel and no calibration behind it.

### KEPT, and NEW

The quantifier argument stands: over a finite period the count of bad positions is
a non-negative integer, so a failure density below `1/M` forces it to zero, and
that does not contradict `natal5-variance.js` reading 6, which constrains
almost-all bounds rather than exceptional-count bounds. **New:** two-point data
has a consumer and it is priced. Degree-2 Boole-Fréchet over the survivor events
certifies `G₂ ≤ 12, 114, 390, 2256, 18900, 117558` at `x = 5..19` against truths
`12, 30, 42, 66, 108, 150`, a ratio running `1.0 → 783.7` with log-log slope
**+5.20**. So DP1 moves from "no known consumer" to "one consumer, unconditional,
all-positions, and measurably worse than the sieve it would have to beat, by a
factor growing as a power of x". `sift-limit-attack.md` §2 and §7d updated,
`TODO.md`'s elasticity table updated.

## 2026-08-18, the sentence that made a pasted output count as evidence

*(Instrument: `research/qc/embed.js`, `research/qc/tailfmt.js`,
`research/qc/tails.js`, checks `embeds` and the advisory `embed-backlog`.
Chris's instruction, the same day attack I was salvaged: "not trust AI to copy
correctly data over, but have a formal embed".)*

### research/SCRIPTS.md, "a script is readable as evidence without being re-run"

WITHDRAWN. The index generator printed that sentence about the house format, and
it was true of the format and false of the practice. The format is question,
code, pasted output, numbered readings; the pasting was done by hand, and on this
day `research/attack-lower-bound.js` was found carrying an OUTPUT block and eight
numbered readings written **before the file had ever been executed**. A pasted
block is evidence only if something binds it to the code beside it. Now something
does: `qc/embed.js` runs the script and writes the block itself, stamping it with
`code-sha256` over every byte above the OUTPUT banner, `out-sha256` over the
normalised stdout, and the exact invocation.

### The claim that a green gate covered script tails

RETIRED. It never did, and the shape of the hole is worth recording because it
was a gap **between** instruments rather than a failure of one. `qc.js scripts`
asks whether a script parses, is titled and is cited: all three were true of the
fictional tail. `qc.js provenance` asks whether a claim names a producer: it did.
`audit-numbers.js` recomputes load-bearing numbers that reached a **document**,
and those figures never reached one. A reader sees a number, a script beside it,
and a plausible table, with nothing to notice. Eleven checks now, and the new one
speaks only about tails that claim which code produced them, so it could gate
from the day it landed.

### First findings of the new instrument, recorded so the numbers are not lost

`05-twin-jacobsthal.js` carries a `p = 29` row that its committed code, which
stops at `p = 23`, cannot produce. The row's values are correct, so this is a
provenance break rather than a wrong number, and it is exactly what
`code-sha256` exists to make visible. `natal-cap-34-wrap-precision.js` and
`natal-cap-37-at41-march.js` have OUTPUT blocks that are not output at all but
provenance notes saying the real logs live **outside this repository**, which is
a separate fragility nobody had counted. The first full dynamic pass, at a 20 s
per-script tier: 89 scripts reachable, **28 reproduced every figure**, 34 carried
at least one figure absent from a fresh run, 27 were too slow for the tier, none
failed to run. The dominant causes among the 34 are argument-driven scripts run
with arguments nobody recorded and overnight runs pasted from logs, which is what
the `invocation` field now removes. **61 legacy tails** await an embed and the
count prints on every run.

## 2026-08-18, attack I: a readings tail that was written before the script ever ran

*(Report: `research/history/staging/attack-lower-bound.md`. This is the worst
custody failure the corpus has recorded, and it was caught only because the
salvage was told to diff the tail against a fresh run rather than trust it.)*

### research/attack-lower-bound.js, the READINGS tail as the dead run left it

RETIRED WHOLESALE, fiction. The producing agent wrote the script complete with
an OUTPUT block and eight numbered READINGS **before it had ever executed the
file** (transcript: the `Write` precedes the first run), then ran it once, said
"several results differ from what I expected", began repairing at the wrong end,
and died on an API 500. **Ten figures in that tail were wrong, two with the sign
reversed, and none of them appears anywhere in the session's 140-entry
transcript.** Retired: `G₂/g ~ (ln x)^{1.10}` (now **1.268**) and `(ln x)^{1.06}`
on the top fourteen (now **1.478**, rising rather than falling); `c₂'` on the
eight new terms 0.4413 "sitting slightly lower" (now **0.5142**, sitting
**higher**); `c₂'` on all twenty 0.4626 (now **0.4983 ± 0.0369**); the trend
`(ln x)^{−0.087}`, which the tail read as evidence *against* the K–K template
(now `(ln x)^{+0.227}`, 2.8 se **above** zero, i.e. evidence *for* it); the
slowly-varying factor moving "91.5×, 5.8× faster than the object" (now 22.8×,
1.4×); the `c₂'` spread 1.47 (now 1.331); `G₂/(x ln³x)` cv 4.5% and
`G₂/(x ln²x)` cv 15.9% (now 7.6% and 14.2%); and the range needed to separate
`ln²` from `ln³`, quoted as `x ~ 1.0e7` and `1.6e15` (now **3.35e2** and
**2.30e3**, wrong by four and eleven orders of magnitude). D2's violations were
said to vanish "exactly at the threshold the proof predicts"; they vanish at
`z₀ = 139` against a derived sufficient threshold of 149, so the threshold is
**conservative by one prime step**, not exact. D4's loss to the greedy was "3 to
7"; it is 4.0 to 6.6.

**The code was never wrong.** It reproduces byte-identically across three
re-runs and one independent re-run in a separate session. Only the prose tail was
invented. The lesson is narrow and worth stating plainly: **a script's own
readings block is not evidence of a run.** Where a tail and an output disagree,
the output wins, and a tail that predates its first execution is not a record.

### research/two-class-lower-bounds.md §6 and §6a, research/G2-STATE.md §6.2, research/covering-dive.md §4.2 and Realistic Target 4

RETIRED, the measured law for `G₂` was wrong in shape. `G2(x#) ≈ 1.2 · x ln²x`
stood as the diagonal reading off `c₂' ≈ 0.48`, with its own error growing as
exact terms arrived (10% high at `G2(37#) = 528`, 24% high at `G2(41#) = 546`).
With the ladder at 22 terms to `x = 79` it is **excluded on two independent
instruments**: model selection over the terms puts `c x ln²x` **31.8 AICc units**
behind, and the exact-frame diagonal, with nothing fitted but the constant,
misses it by **9.3 se**. Both prefer **`0.762 x ln²x lnln x`**, which the
diagonal places 1.1 se from the data. §6a's nine-term figures reproduce exactly,
so the diagonal was extended rather than replaced: `c₂'` now reads
**0.4983 ± 0.0369 over all 20 exact terms**, cv 7.4%, against 0.4848 and cv 9.7%
on the nine. The `h₂` law is untouched: `c₂ = 0.85` on A288815 is a different
object and still measures `c·x·ln²x`.

### The cross-attack tension between attack I and attack E

RESOLVED, and it was never a conflict. The transferred K–K bound
`≫ x ln³x (lll x)²/(ll x)⁴` and the measured `0.762 x ln²x lnln x` agree on the
`x`-exponent, which is the only thing the measurement resolved; they do not cross
until `x = 10^7327` with both constants at 1; and they are different kinds of
statement, one asymptotic and one descriptive over a finite range. Attack E's own
§7 had already established that its winner and `x ln³x` are "not separable in
principle on this range". The finite range cannot decide and never will. Only
finishing the K–K substitution on paper at D3 can.

## 2026-08-18, attacks A and B: B is proved polylog, and was never the binding term

*(Report: `research/history/staging/attack-AB-bounded.md`, salvaged from the two
agents that died leaving one shared script and no report.)*

### TODO.md item A, "the proof stops at one place: B bounded as z grows"

SUPERSEDED. **Theorem 1, unconditional and explicit and uniform in `s`:**
`B(z,s) ≤ 9A(z)²(E(z)−1) = O((log z)^8)`, a three-step chain resting only on the
sourced `|λ_d| ≤ 1`, both inequality steps re-verified per-`e` with zero
violations to z = 41. The mean-square ask is `B ≤ H/log⁶H` with `H = z^u` a
*power* of `z`, and a power beats a polylog, so **the mean-square Lemma V is now
unconditional and useful, with no hypothesis anywhere.** `B = O(1)` remains open
and nothing downstream wants it.

### The B = O(1) question, as a uniform statement

RETIRED as a target. It is measured **dead**: `sup φ` rises at all nine steps
over z = 13..47 (1.2000 → 2.0658) and the constant model's RSS is **248×** the
linear model's, while the `φ²`-weighted mean is flat. Any `O(1)` proof is
irreducibly a mean value over the divisor lattice, never a sup-norm argument. The
flatness has an exact mechanism: `(1−2/p)²(1+4p/(p−2)²) = 1 + 4/p²` **exactly**
(worst deviation 2.22e−16 over all odd p < 2000), so `B_model` is an absolutely
convergent Euler product with limit 4.60631320 and `B` sits at a constant
fraction 0.3286 → 0.3352 of it. Ladder extended to z = 73, where `B` = 1.5471 and
still rising, and `B = κ·B_model` is rejected because `B/B_model` drifts up while
`B_model` saturates.

### research/history/staging/attack-beta2-01, §4(ii)'s all-positions exponent

CORRECTED, and the correction removes `B` from the currency that could reach
`G₂`. The exponent takes `min(B·H, B₂)` and the `min` picks the `B₂` branch at
**every** z from 13 to 47, so **`B` is not a term at all there**; it binds only
below a crossover `u*` = 1.4641..2.6912 while the exponent itself runs
3.4299..7.1966. A first draft of the salvage script tabled the `B·H` branch alone
and compared it against `B₂`-branch source values; reinstating the `min`
reproduces the source's 4.3604 / 4.7087 / 5.0021 exactly.

### The candidate headline handed to the salvage by the adjudicator

RETIRED, false as literally written, and this is recorded because the number came
from a brief. The dead script's closing line, "the spread from A = 0 to A = 8 is
under half a unit of window exponent", was passed on as a candidate headline. The
spread is **2.9379 falling to 2.8012**. What is under half a unit is the cost per
power of log z, `lnln z/ln z` = 0.3672 falling to 0.3501. **The conclusion
survives the arithmetic that was meant to support it**: `B`'s growth rate is
invisible in all three currencies, giving exponent 0 in the almost-all currency,
no term at all in the all-positions one, and a window falling to `u → 0` in
Lemma V's literal ask.

### And the estimate turns out to be published

`B`'s bound is Opera de Cribro **Lemma 6.18**, with a corrected proof in
J. B. Friedlander, *A weaker but simpler sieve inequality*, arXiv:2607.05707
(7 Jul 2026), appendix, at a *stronger* conclusion. It needs `β ≥ 8`, i.e.
`s ≥ 9`, against this corpus's `s ∈ [2.0, 3.4]`, and the author flags that
requirement as a likely artifact. **The forward move is pricing, not searching.**
Attack B's own target closed too: the phase split has no interior optimum, the
optimum end is the exhaustive full-period walk (an identity, not a bound), so the
interpolation is asymptotically the bad horn. Its by-product is worth more than
its verdict: the retained-phase part is **not** a maximal-inequality problem,
`sup|Φ|/rms` being flat at 2.93..3.45 over z = 13..43 and below `√(2 ln E)`.
**The maximal wall is entirely in the tail**, which is a narrower target than
"the maximal inequality".

## 2026-08-18, attack G: the hybrid bound, and a head that was underpriced

*(Report: `research/history/staging/attack-hybrid-bound.md`; producer
`research/attack-hybrid-bound.js`.)*

### research/sift-limit-attack.md §7, "beats 4.2665 for x ≤ 227"

EXTENDED, not retired. Theorem HY glues an exactly-handled head of primes onto
Brun's truncated tail: the head-survivor set is `∏(p−2)` classes mod `Q = x₀#`,
and on each class the tail acts as an ordinary two-class sift, so no head term
appears in `A_m` or `B_m`, and `[1,L]` is uncoverable for `L > Q(B_m/A_m + 1)`.
That widens the covering economy's window against 4.2665 from **x ≤ 227 to
x ≤ 439**, first loss at 443, never returning over 5972 further primes to
x = 60000. It changes nothing asymptotic: exactness costs `e^{θ(x₀)}`, so the
head reaches only `x₀ = O(ln x)` (measured `x₀*/ln x` = 1.01 to 1.85) and removes
only `lnlnln x` of the `lnln x` Mertens mass that sets the Bonferroni depth. At
the crossover the improvement is a factor 1.27 in a bound 6.8 orders of magnitude
above the measured law.

### The dead run's larger apparent win, and the "A144311 as base case" glue

BOTH RETIRED. The first run of this attack believed it had more, and the
difference traces to a single pricing error: it charged the head
`3^{π(x₀)}/∏(1−2/p)` where the correct price is `Q = x₀#`, an underprice of
**1.89e19 at x₀ = 79**. And the literal glue the brief proposed, using A144311 as
a base case, is **dead on a type mismatch**: a certificate is order information
while Bonferroni needs congruence information, and spent against Theorem P the
certificate admits not one further prime at any `x₀` from 11 to 79.

## 2026-08-18, Brady's Problem 3 is not our covering problem

*(Report: `research/history/staging/attack-np-licenses.md`. The entry added
earlier the same day put Brady in `PRIOR-ART.md` with an instruction to
reconcile his framing before any novelty claim. The reconciliation ran, and it
withdrew half of the entry that carried it. The separation was re-derived
independently by the adjudicator before this was applied, reproducing the
report's table including its optimal shifts.)*

### research/PRIOR-ART.md and research/sift-limit-attack.md §7c, "his Problem 3 (p. 12) IS the G₂ covering problem, he proves it NP-complete"

RETIRED, false on three counts. (i) Problem 3 quantifies over an **arbitrary**
finite `A ⊂ ℤ`; `G₂` is a single fixed instance family with no free input, so
"is" was the wrong verb before the class count was even reached. (ii) Problem 3
supplies **one** congruence class per prime, and Brady says so himself: with `A`
an interval it is the Jacobsthal problem. Ours supplies two at locked separation
2. The two-class setting is his **Problem 2** (p. 1), about which he proves
nothing computational. (iii) His twin instance `A + c` with `A = {n(n+2)}`
shifts the **value**, giving the fibre `{−1 ± √(1−c)}`, which is the
Kalmynin–Konyagin shape of fixed centre and varying separation; ours shifts the
**argument**, giving free centre and separation locked at 2. **These are
numerically different problems**: the value-shift maximum is **17 against our 11
at x = 5** and **65 against our 41 at x = 11**, while the argument-shift column
reproduces **A144311** exactly, which is the calibration.

### The same sentence's NP-completeness reading

RETIRED, out of scope. Theorem 9 (p. 13) is a reduction from Set Cover whose
hardness lives entirely in the adversarial choice of `A`. Our object is one fixed
sequence of instances and has no complexity. The theorem does not even quantify
over our family: Problem 4 requires each prime to supply a **partition**, and
`{a_p, a_p−2}` is a 2-cover at every odd prime and never a partition. **No claim
anywhere in the corpus may use NP-completeness as evidence about the exponent or
about asymptotic difficulty.**

### What survives, and one thing that was not known

Brady's **p. 1 names our system** and he gives **no bound at any exponent**
anywhere in the thesis; `twin` occurs exactly three times in it. His p. 12
sentence that a bound at the `z²` scale *"would be a much stronger claim than the
twin prime conjecture"* stands and corroborates `G2-STATE.md` §1c's strong form.
Recorded the same day and new: **`zeb` is Brady** — MathOverflow user 2363
publishes `website_url: https://notzeb.com`, the host serving the thesis, and the
thesis's Chapter 8 runs the technique of answer 52890 in print. The technique
demotion of 2026-08-18 and this object collision are **one source, not two
independent ones**, which matters because two independent collisions read as a
crowded field and one reads as one person having been here first.

## 2026-08-18, the erdosproblems channel: a caveat that outlived its cause

*(Two documents carried a broken-channel warning that stopped being true.
Re-verified by the adjudicator directly rather than taken from an agent report:
`/search/Jacobsthal` returns 200 with exactly #687 and #970, `/range/1-end`
returns 10.6 MB carrying 1217 distinct problem ids, and `/latex/<n>` prints the
unrendered TeX per problem. Companion report:
`research/history/staging/attack-erdos-map.md`, which found the working routes.)*

### research/SEARCH-CONVENTIONS.md §3, the "not reproducible" row

RETIRED, the cause is gone. The row read that the site's `/search` endpoint
"has returned 404 to every automated route since 2026-08-18, so this rests on
one agent's one pass and a human with a browser settles it in one query". The
endpoint is **path-encoded, not query-string**: `/search/<term>` answers 200
with a browser user-agent, and so do `/range/<a>-<b>`, `/range/1-end`,
`/go_to/<n>`, `/latex/<n>`, `/history/<n>` and `/bibs/<key>`. The 404s came from
querying it the other way. The row now carries the complete sweep, the routes
and the calibration probes instead of the warning.

### research/covering-dive.md §2.2, "the absence rests on one agent's one pass"

RETIRED, superseded by a complete sweep. All 1217 problems were fetched in one
page and swept mechanically, twice and independently: `Jacobsthal` occurs in
exactly two, #687 and #970, each confirmed individually at `/latex/<n>`, and
`two congruence` in none. The claim is also **narrowed while being
strengthened**, because the old wording covered more than the sweep can: it now
says no problem NUMBER carries the two-class object, and states explicitly that
whether Erdős posed the extension in prose inside the #687 paragraph is a
separate question under primary-source verification.

### And the mistake the re-sweep made on its own first pass, corrected before it
### reached any document

A bulk grep over the 1217-problem page, keyed to the nearest **preceding**
`bib-container<id>` marker, reported three Jacobsthal problems and named #969 as
the third. #969 is the squarefree-count error term and has nothing to do with
Jacobsthal. In that page a problem's marker does not sit inside its own text
block, so nearest-preceding attribution is off by one. The three candidates were
then checked individually at `/latex/<n>`, which is what produced the count of
two. Recorded here because it is a configuration slip of exactly the class
`research/qc/units.js` exists for, and because the next agent to sweep that page
in bulk will meet the same layout.

## 2026-08-18, attack F: the book pages were in the repo all along

*(Report: `research/history/staging/attack-dim2-standalone.md`. Four
corrections to `paper/beta2-note.md`, all sourcing, all in the direction of the
note under-claiming what this repository can prove. The cause in every case was
the same: `attestation/book-ch5-6/` holds pages **3–12 as well as 43–79**, and
Chapter 9 (pp. 103–112) is at the top level of `attestation/`, so a folder name
hid three pages the note said it did not have. Campaign lesson 7, "before
writing that something was never run, list the directory", applied to
photographs.)*

### paper/beta2-note.md, status header: "Definition 1.3 … not photographed"

RETIRED, false. The header carried "(Formal Ω(κ) = Definition 1.3, Ch. 1, **not
photographed**…)" and a paragraph explaining that the header contradicted
itself. Page 8, carrying §1.4, Definition 1.3 and eq. (1.5) in full, is
`attestation/book-ch5-6/Screenshot 2026-08-14 at 12.23.24 PM.png`. It reads as
the note reconstructed it, quantifier `2 ≤ w₁ < w` included, and adds the
constants `κ ≥ 1, A > 1`, which the note did not record. Replaced by the primary
quotation. Johnston–Thomas and Ford stay in §6.1 as corroboration rather than as
the source of record.

### paper/beta2-note.md, status header: the Ω*(κ) hedge

RETIRED, false. The header treated the p. 44 product form (5.2) as possibly a
starred variant `Ω*(κ)` distinct from Definition 1.3, on the strength of an OCR
reading of the notation index. Page 44
(`attestation/book-ch5-6/Screenshot 2026-08-14 at 11.58.47 AM.png`) opens
"condition **Ω(κ)** can be restated in the form (5.2)", unstarred. `Ω*(κ)` is
**(5.6)** on the same page, the two-sided condition on the topped-up function
`g*` from Lemma 5.1 (the Topping-Up Lemma). Hedge deleted.

### paper/beta2-note.md §2: "our A is that example restricted to an interval"

RETIRED, understated. Example 1.2 (p. 7) is already
`A = {L(n) : x − y < n ≤ x}` with `X = y`, and already carries `|r_A(d)| ≤ ω(d)`
and `ω(d) ≤ g^{ν(d)}`. The interval restriction is the book's. §2 and §6.1 now
say that the sequence, the remainder bound and the density check are all quoted
from Example 1.2 at `g = 2`, which is what makes the note honest about how much
of the setup it did not build.

### paper/beta2-note.md §6.1: "the density hypothesis §4 verifies by hand"

RETIRED, stale pointer. The dimension check is in §2; §4 is "No transfer lemma
needed". Corrected to §2.

### The finding the corrections came out of

**The dimension-2 case is an exercise, and the report says so rather than
defending it.** The only hypothesis of Theorem 9.1 (p. 104) is Ω(κ); the book's
p. 8 check of Ω(κ) uses only `ω(p) ≤ g` and so covers every dimension; the
error exponent `1/(2κ+2) = 1/6` is inert, because `f₂` is a fixed positive
constant strictly above the sifting limit; and the same assembly at `κ = 1`
returns Iwaniec 1978 up to an `ε`. The general `k`-class family
`J_k(x) ≪_{k,ε} x^{β_k+ε}`, uniform over arbitrary admissible choices of `≤ k`
residue classes per prime, is in the report's §3 and §4 and is not added to the
note.

## 2026-08-18, phase 1: the certificate route retires, and the @13 gate becomes reachable

*(Nine agents in parallel after the block campaign closed. Two sealed
pre-registrations, `2f6c49e` and `3902944`, committed ahead of the measurements
they predict. Reports under `research/history/staging/phase1-*.md`.)*

### The sieve Gaussian maximal law is TPC-implying, so the certificate route retires

**`TODO.md` item 0 asked whether the Gaussian maximal law for the sawtooth is
provable in any weak form, and said to retire the certificate route if not.
Answered: NO.** The corpus states the law only in a crude form
(`sift-limit-lemmaV.js`:466) that pays a triangle inequality and swaps the
operative mean square for an H-free plateau. The sharp form — the exact analogue
of the elementary criterion — is flat at 0.5566 across nine levels (slope
+0.0104 ± 0.0414) and below the zone budget at every one, which IS the Gap
Reformulation and therefore implies TPC. Robust to a constant up to
C_crit ≈ 1.4–1.7. So no weak form is both soft-provable and sufficient, and the
gap between the two forms widens like z^1.4.

Sharpest observation in the report: at the operative window the maximal law is
not a generous hypothesis but an approximately exact description —
sup/(rms·√(2 lnW)) reads 0.56, 0.73, 0.92, 0.79, 0.85 and goes **above 1** at
z = 19. That is why the route always looked close, and exactly why no soft
argument will establish it.

**Retired with it:** the theta ladder as a TPC-reachability instrument (83% of
its apparent drift is bookkeeping loss); `sift-limit-attack.md` §4.5's "the
maximal law is the whole cost", which needs splitting into two laws with
different prices; and the Lemma V sub-question as moot, since at the corrected
working point s/u = 1.62–1.72 rather than the recorded 1.2, further outside
Lemma V's stated range.

**Surviving and now the item:** the exact-supremum prefix walk (one-line fix,
take H from the caller); the unconditional verifications, which are STRONGER
than recorded — positivity at every position of five complete periods at
H/z² = 0.36, 0.44, 0.55, 0.49, 0.46; Brüdern–Fouvry and the mean-square
machinery, validated not implicated; and the legal target now named precisely,
**a maximal law for rho**, 2.43 at z = 43 and rising against β₂ = 4.2665.

### "The headline of the run" does not happen: a hard-coded u

`research/theta-ladder-sup.js`:18 reads `const z=Number(process.argv[2]), u=3.2,
s=3.0;` — **z comes from the caller and u never does.** Verified here by
reading. So every `need_true` in theta-ladder §5b measures sup|R| at a window
39x to 62x longer than the window it draws a conclusion about. Self-consistently
`need_true/z²` is 0.5485 / 0.4877 / 0.4637 at z = 19 / 23 / 29 against the
published 0.8693 / 0.8487 / 1.0060 — overstated 1.58x, 1.74x and **2.17x** — and
the certificate is positive at every one of the 223,092,870 positions at
H = 0.46 z². The crossing that reading 8 called "the headline of the run", and
that TODO item 0 cited as evidence, **does not occur**. §5b and reading 8 now
carry correction boxes; the original numbers are left in place as the custody
record of what was run and are marked not-to-be-quoted.

### The @13 gate can be met today, by one call site

The k4 Monte-Carlo shape was the last obstruction at @13. **cap-32 already ships
`k4direct`**, an exact computation of the same quantity, validated at @7 and
never run above it. At full @13 it returns 60234.496774278130 in 198.9 s on one
core, and rebuilding cap-34's best assembly with it gives REL −2.753038e−13:
**the gate MET by ×3600**, against −1.021692e−9 with the Monte Carlo. One call
site, not yet edited, because it changes what the script computes.

**CAL4 is right in direction and immaterial in size.** 0.932164 is correct as
@13's measurement and wrong as a constant: cap-32's 0.87 is the N = 240 reading
of a monotone drift it measured and stopped early (0.750 … 0.932164 at
N = 100…990), with the true endpoint outside cap-32's own ±0.05 band. Fitting
1 − CAL4 = 1.994/√N extrapolates to ≈0.984 at @17, so the @17 bias is ~2.9e−5,
7% of the published ±4e−4 bar.

**The @17 requirement was never derived.** Neither 3e−9 nor 3.06e−10; both are
arbitrary quality targets and both ~2× loose. The ladder, with relT₃ = relT₄/4:
**5.05e−5 to beat Chebyshev at all** (a factor 7.9 from today), 4.99e−6 for ×10,
1.53e−10 for the ×3300 win. Two facts stated nowhere in the corpus: T₃ hurts 4×
more than T₄ per unit relative error and contributes equally at the published
bars, so fixing T₄ alone caps the gain at ×2; and μ₃@17 and μ₄@17 are both
noise, μ₄ = 3.40e9 against dμ₄ = 8.87e10.

**Routing verdict: independent.** The @13 gate is met only by an assembly
containing the brute-force Multi, whose @17 counterpart is 513 days on ten cores
and is not even codeable (`pairMasks` asserts K ≤ 64; @17 has K = 120). Meeting
the @13 gate certifies nothing for @17; it helps only through the engine it
validates, at a tolerance five orders looser than the one on record.

Also corrected: cap-32's "±2e2 on μ₄" was wrong by two orders — the correct dμ₄
is 8.87e10, which the same file's own OUTPUT block already stated as 2.6e4×.

### The eighth check, and the layer the gate did not defend

`sourcing` added on Chris's rule that our tested claims must link to the script
that produced them, third-party numbers exempt. 59 of 66 documents sourced, 7
third-party, three genuine gaps fixed (`f-decays.md`, `operator-and-pair-count.md`,
`anchored-calm.md`).

Building it exposed a hole in the selftest: its runner enumerated a HARD-CODED
list of seven checks, so a new check could ship with no known positive at all.
It now enumerates every exported check.

And the deeper finding, recorded in `qc/README.md`: of nine adjudicator errors
that day, **six never entered the corpus** — they were prose in agent briefs and
chat, and the two worst were read by ten agents simultaneously. The gate defends
the corpus and nothing defended the briefs. `research/qc/units.js` is the lookup
for that layer, and the standing rule is that a number in a brief carries the
same custody as a number in the corpus.

## 2026-08-18: the consistency campaign, wave 6

*(Wave 6 opened with the one item on wave 5's list that was mathematics rather
than bookkeeping, on the principle that a wave which opens with cleanup tends to
stay there. The adjudications are in
`research/history/staging/qc-CAMPAIGN.md`.)*

### The Loudness Ceiling Conjecture survives its first real test, and the X-limitation Theorem gains a fourth level

**"Whether the conjecture survives at @19 is open, because the @19 driver has
not been computed", in `natal-cap-31-calm-vs-kill.md` and both papers.**
SUPERSEDED, by computation. `research/natal-cap-38-loudness-driver.js` computes
S̄ at @19 = 49,238.76, so the driver S̄/√(K·V̄) = 24.96 and the conjecture's
threshold S̄²/(K·V̄) = 623.1, against an enumerated max VR of 2.293. **The
conjecture holds at @19 with a margin of ×271.7.**

**And the consequence is a theorem, not just a conjecture test.** The
conjecture's per-level hypothesis max_t VR < S̄²/(K·V̄) is, after multiplying
out and taking a square root, exactly √(K·V̄·VRmax) < S̄ — the inequality the
X-limitation Theorem's per-level proof needs. So the driver run promoted @19
from conjecture to theorem: **the X-limitation Theorem is now proven at @11,
@13, @17 and @19**, corrected at `README.md`, `research/GLOSSARY.md`,
`TODO.md`, `research/natal-cap-31-calm-vs-kill.md`, `paper/anchored-note.md`
and `paper/wall-note.md`.

**What the run says about the broken leg.** Wave 5 killed the conjecture's
"max VR falls" leg by enumerating a fourth point, 2.78, 2.35, 2.14, 2.293. The
driver run shows that leg was carrying almost none of the weight: the margin
runs ×3.5, ×10.1, ×44.4, ×271.7, accelerating by factors of 2.9, 4.4 and 6.1
per level, and the strike channel max|D| falls from 53.5% of S̄ at @11 to 6.1%
at @19. The all-x form stays **[OPEN]**: four levels is four levels, and this
corpus has twice had a short-run trend refuted by the next point.

**Why it cost 8 seconds when cap-31 costs 76 s at @17 and cannot reach @19.**
cap-31 sweeps survivors, strikes, overlap credit and pair counts per rotation.
The conjecture needs only S̄, K, V̄ and max VR, and each has a cheap exact
route; S̄ in particular follows from an exact prefix identity, Σ_t S(t) =
Σ_{r∈ρ}(P[r+W] − P[r]), which replaces the sweep with one 2W-length sieve. The
saving is structural: cap-38 computes strictly less than cap-31 does.

**Custody, including a false absence claim of the shepherd's own, caught the
same day.** Every quantity was reproduced against a known positive before the
@19 row was read: W, N, K, V̄, S̄, VR(0) and max VR all PASS against cap-31's
pasted output at @11, @13 and @17, and V̄, VR(0) and max VR against cap-19
PART A at @19. cap-38's readings originally added that S̄ at @19 was "the only
load-bearing number with no known positive available, since cap-31 stops at
@17", and **that was false**: `research/wave7-logs/cap35-x-multiplicity.log`,
on disk since 2026-08-15, prints S̄ = 49238.76 at @19 from natal-cap-35's
u-form path. cap-31 is not the only producer, and the claim was written without
listing the directory — in the wave that restated that rule, in the readings of
the file that preaches checking against known positives. Found by partition Y.

**The correction strengthens the number.** S̄ at @19 now has four witnesses that
agree: cap-35's archived u-form log (49,238.76), cap-35 re-run today by
partition W (49,238.76), cap-38's prefix identity (49,238.76, sharing no code
with the u-form), and cap-38's direct simulation (49,201 ± 50, z = −0.76, its
estimator calibrated at @13 and @17 where the exact answer is known). The
simulation was built as a substitute for a known positive and is a fourth
witness instead.

**And extending the scope found where the previous scope fix had stopped.**
Wave 2 corrected "proven from x = 13 upward" to "per level, at the enumerated
levels" in five places. It never reached the history layer:
`research/history/CHRONICLE.md`:198 and
`research/history/NIGHT-LEDGER-2026-08-14-15.md` at two sites still carried
the unscoped "from @13 on, strikes alone cannot annihilate at any loudness".
All three corrected. A dated session ledger is custody of what was believed
that night, but a false mathematical scope in it is still a false scope a
reader will act on, so the correction is annotated in place rather than
rewritten away. The generalisable point: **a scope fix applied to the summary
layer does not propagate to the history layer, and nothing checks that it
did.**

### A two-class Erdős–Rankin paper exists, and a co-author is the K of FKMPT

**"No Erdős–Rankin-type two-class paper exists [ABSENT]"**, `covering-dive.md`
§4.2, echoed at §Q5.5 and load-bearing for Realistic Target 4. **REFUTED** by
Kalmynin and Konyagin, *A polynomial analogue of Jacobsthal function*,
arXiv:2302.00459v2 (v1 1 Feb 2023, v2 3 Dec 2023), verified at the arXiv record.
Choosing one residue x_p per prime deletes the fibre {i : f(i) ≡ −x_p}; their
M(f) is the average number of classes deleted per prime and M(x²) = 2; the gain
over Rankin is the Rankin factor to the M(f)-th power, squared for a quadratic,
landing on the y·ln²y shape this corpus states as its own target. **The narrowed
claim survives and is what the file now says**: their two classes are a varying
fibre, ours is the fixed pair {0, −2}, so the twin system is untouched.
Realistic Target 4 now names the competitor. Found by the first partition in the
campaign to have web access.

### Three citation errors, two of them in author lists

- The **"DHR book"** is *A Higher-Dimensional Sieve Method* by **Diamond,
  Halberstam and Galway**, Cambridge Tracts 177 (2008). **Richert is not an
  author of it**, though "DHR sieve" is the correct name for the sieve. Two
  sites in `covering-dive.md`. Verified against the Cambridge record.
- **Riesel–Vaughan's venue was wrong.** *On sums of primes* is **Ark. Mat. 21
  (1983) 45–74**, not "BIT 23 (1983)". Verified through DOI 10.1007/BF02384300.
  `natal-cap-10-sieve-cap.md`, two sites.
- **Wu 2004 is now read at source.** Theorem 3 states π₂(x) ⩽ 3.3996·Π(x); the
  §8 proof line gives 3.39951. The corpus's gloss "twin side by halving" is
  **not** how Wu obtains it — that describes the earlier Selberg/Pan/BD/Chen
  family, not Theorem 3.

### One [UNVERIFIED] closed by reading the primary source

`natal-cap-10-sieve-cap.md` §1.4 flagged that no primary reference states the
interval twin bound with the explicit constant 8. **Riesel–Vaughan Lemma 5 is
exactly that**, and its supremum runs over **all intervals of length x**, so the
position-uniformity the file called "folklore-true" is in the lemma's own
statement. Read from the PDF and now quoted with its (L, A) table and its
C = 2∏_{p>2} p(p−2)/(p−1)².

### A dead number with no flag, and a settled question presented as open

`research/wave7-logs/lemmaV-meansquare.log`'s S6 block is output of
`elementaryVariance`, which `sift-limit-lemmaV.js`:395 banners as **wrong by
three orders**. The log carries no flag and `CHANGELOG.md` had zero hits for
`lemmaV`, `S6` or `elementaryVariance`. `WAVE7-RESULTS-2026-08-15.md`:50-54
voided the block **for the wrong reason** — the linear law rather than the
broken function — while quoting two of the voided constants inside the sentence
telling a reader not to quote them, and closed "beats the elementary bound by
roughly two orders". `MORNING-2026-08-16.md`:74 settled it two days later: **it
loses, by about 1.4×.** Corrected, with the two constants struck and the
unflagged log named.

### Two more absence claims refuted by their own documents

- `G2-STATE.md`:584 opened §5a "Nobody in this repo had ever asked how large G2
  can be *made* to get" while §5c of the same file, 160 lines below, credits
  `attack2-rankin2d.js` with asking it three days earlier.
- `NATAL-CAP-CAMPAIGN.md`:91 ranked "K*(x) at @23" as open lead #1 while the
  same file records K* = 27 at @23 and 69 at @29, "both measured", twice above.
  The open question is the shape beyond @29.

### A lemma quoted as proven, refuted by three scripts in its own family

"Inside [0, p²) copy 0 deletes at most the single slot p" stood as a displayed
block quote in `a3-06-origin-vs-max.js` and in `fold-profile-03`'s header.
`fold-profile-03` S4, `-07` S1 and `-08` S4 all print the counter-example: T₂₃
folded by 29 has two kills below p², at 29 and 839. The true statement is the
corpus's own **Head Lemma** (`FOLD-PROFILE.md`:144-150): the kills are contained
in **{p, p²−2}**, and in six of eleven ladder folds the single kill is p²−2 with
p not a slot at all. Both artifacts carried pre-Head-Lemma wording. The
conclusion each supports survives, since at most two slots is still vacuous for
the strong Zone Postulate.

### The index files, swept for the first time in four waves

`ATTACKS.md` and `ATTACKS2.md` had not been edited since `324252f`. Fifteen
corrections, of which the sharpest: the campaign verdict awarded
"**theorem-grade**" to the Unification Law, which its home marks MEASURED and
Hardy-Littlewood-conditional and whose [2,3] step its own cited script calls a
conjecture — with row 3 of the same table already saying "HL-conditional" about
the same curve. Also corrected: the rich vein was logged twice as an unexplained
novelty and has been solved since 14 August (`attack2-rich-vein.js`, "REAL
STRUCTURE, KNOWN MECHANISM, NO NEW PHYSICS"); the anchored-window programme was
called "unexplored" and has a research note, a 34 KB paper and a 38-script
campaign; "matches to 4 decimals at every depth" holds at four of five depths,
the script's own caveat having been dropped; "beats Chebyshev 35-40×" is 30-37×,
an interval containing neither endpoint; the pigeonhole theorem's **p ≥ 17**
hypothesis was dropped; a seam is 10× to 20× more likely to be a twin **prime**,
and the "no more likely than average" clause needs its "conditional on being a
slot"; the seam slot-enrichment "25×" is printed by no script and runs 20.2 to
28.1 by level; and the Unification Law was written on the domain "u ≤ 2", on
which it diverges, at three sites now reading 1 ≤ u ≤ 2.

### W/2 is not the loudest rotation at @13, and two documents said it was

**"W/2 duplicates (proven loudest)"** in `research/history/CHRONICLE.md` and
**"W/2 the single loudest rotation for the third level running"** in
`research/natal-cap-19-calm-lemma.md`. Both SUPERSEDED. cap-38 enumerates
VR(W/2) = 1.6652 at @13, rank 198 from the top of 30,030 — the 99.34th
percentile, against a true maximum of 2.3518 at t = 3461. W/2 IS the loudest at
@11, @17 and @19, all at rank-from-top 0, so the streak claim is wrong at
exactly the level it skipped.

The Mirror-Phase Doubling Lemma proves that dev(W/2, q) is twice one window's
deviation, per prime. Maximality of the sum over primes is a different claim,
and it is measured rather than proven. `paper/anchored-note.md` already carried
the correctly scoped version — "the loudest rotation of the entire ensemble at
@11 and @17 and the 99.3rd percentile at @13" — while the index and the
chronicle above it did not. **This is wave 5's lesson 16 again**: the paper was
right and the index was not, and the refuting number had been sitting in
cap-31's own @13 enumeration since 14 August. Nobody had compared max VR to
VR(W/2) at the one level where they differ.

## 2026-08-17, night: the consistency campaign

*(A two-wave campaign: eight read-only diagnostic passes over the whole corpus,
then six appliers partitioned by file. Its subject was the defect class that
internal reading cannot find, a claim fixed in the research layer while the
summary layer above it goes on asserting the old thing. Thirty-eight documents
changed. Distinct from the earlier "six-agent wave" of the same day, which was a
mathematics wave; this one changed almost no mathematics and a great deal of
what the corpus says about its own mathematics. The adjudications are in
`research/history/staging/qc-CAMPAIGN.md` and the per-partition apply records in
the `applied-*.md` files beside it.)*

**One false claim, the rest internal inconsistency.** Only `paper/moire-primes.md`
Door 2 asserted something untrue of the world. Everything else below is a
document saying something its own sources no longer support.

### Door 2 rested on a computation its own source file marks invalid

This is the campaign's worst single finding and its only false claim.
`research/attack-04-fourier-budget.js` has carried a correction banner since
2026-08-14: its `certified` column indexed local factors at k mod p and omitted
the CRT twist y_p = (W/p)^{-1} mod p, moving pointwise |S| by up to N/2, so the
column was never a certificate. The banner was correct where it stood, was
repeated as a standing note in `research/NATAL-CAP-CAMPAIGN.md`, and **the
flagship paper never inherited it**, nor did `research/README.md`'s attack-4
bullet. Both went on quoting that column's two numbers, the budget "grows like
2ⁿ" and the p = 11 zone missed "by only 18%".

The corrected artifact `research/natal-cap-02-fourier-budget.js` reverses the
reading: at x = 11 a perfect per-window oracle already fails (cap 117.3 against a
census of 90), from x = 13 the gross strike total alone exceeds the census (1,135
against 990), and the real near miss is 15% at x = 7 and is moot. Retracted in
the paper with the retraction left visible, dropped from `research/README.md`,
and promoted in `NATAL-CAP-CAMPAIGN.md` from a standing note to a blockquote at
the head of the file so the invalid readings cannot be met later than the data.

### The FKMPT constant is 6, not 4, across research/covering-dive.md and research/two-class-lower-bounds.md

**`C(ρ) := sup{δ : (4 + δ)·10^{2δ}/log(1/(2δ)) < ρ}`, `C(ρ) > e^{-1-4/ρ}`
(`covering-dive.md` §Q2.3) and `C(1/2) > 1/6001` (`two-class-lower-bounds.md`
§2a).** RETRACTED VALUES, replaced by `6·10^{2δ}`, `e^{-1-6/ρ}` and
`C(1/2) > 1/325565`.

**The value has moved three times and the record of why is the point of this
entry.** The corpus first carried 6; an earlier audit wave
(`staging/audit-campaign.md`) judged that 6 a stale arXiv reading and moved
`covering-dive.md`:59 to 4; every later pass inherited the 4, including the
wave-1 brief. This campaign pulled all four arXiv PDFs and found the direction is
the opposite one. The evidence, so no fourth edit is needed:

- arXiv:1802.07604 v2 (2019-08-16) and v3 (2021-06-23) print `(4 + δ)·10^{2δ}`
  and `C(ρ) > e^{-1-4/ρ}`; v3 prints `C(1/2) > 1/6001` in its own text.
- **v4 (2022-09-19) prints `6·10^{2δ}`, `C(ρ) > e^{-1-6/ρ}` and
  `C(1/2) > 1/325565`.** The last is the paper's own corrected figure, not our
  arithmetic.
- v4 carries the corrigendum as **Appendix A**, naming the cause (errors in the
  exponents of H in the deduction of Theorem 2 from Theorem 3, forcing M > 6) and
  crediting Mikhail Gabdullin. Item (1) corrects the factor 4 + δ to 6 and the
  bound to `e^{-1-6/ρ}`; item (4) gives `C(1/2) > 1/325565`.
- **The corrigendum is published: J. Eur. Math. Soc. 25 (2023), no. 6,
  2483-2485, DOI 10.4171/JEMS/1305.** It appeared nowhere in this repository
  before this pass and is now cited in both files, in `sift-limit-attack.md`,
  and beside the paper in `paper/moire-primes.md` and `paper/beta2-note.md`.
- The direction is the ordinary shape of a corrected error: 4 → 6 *weakens* the
  bound, since e^{-1-6/ρ} < e^{-1-4/ρ}. The standing figure was **54× too
  generous.**

The qualitative claim is unaffected: "two classes per prime on half the primes is
inside a published theorem" needs only `C(1/2) > 0`, true in every version. Both
files now state which version they quote. **The method lesson, recorded because
it is about this campaign:** version drift in a cited source is invisible to
internal consistency. `covering-dive.md` and its own bibliography agreed with
each other perfectly while both carried the retracted value, and only fetching
the source caught it.

Two related repairs travelled with it. `covering-dive.md`:58's **"v3, dated
2024-12-03"** is RETIRED, no version of the paper carrying that date (v1
2018-02-21, v2 2019-08-16, v3 2021-06-23, v4 2022-09-19). And
`covering-dive.md`'s `[Halberstam-Richert, Cor. 2.4.1]`, which sat inside a
quotation labelled verbatim, is substantively correct (entry [7] in v2, v3 and v4
is that book) and is now marked as the editorial expansion it is,
`[7 = Halberstam-Richert, Cor. 2.4.1]`, with the note that `[7]` in v1 is a
different work. Remark 7's text is byte-identical in v3 and v4 (Remark 8 in v2),
so the version split there was harmless; the damage was one bullet up.

### TODO 000b closed by inspection: the Kanold-Stevens-Paseman premise is false

**"An afternoon with three papers", premised on Kanold, Stevens and Paseman each
proving a one-class exponent-(2+ε) bound with a stated constant.** The premise is
FALSE for all three, so the item is CLOSED by inspection of the sources rather
than done. From Paseman's own §1 (arXiv:1311.5944): Kanold gives `2^k` and
`2^{√k}` for k ≥ e^50; Stevens gives `g(n) < 2k^{2+2e·log k}`, whose log₂ is
`O((log k)²)`; Paseman improves that to `u(k) = O(log k·loglog k)`. As exponents
in k those are `2^{√k}`, `k^{Θ(log k)}` and `k^{O(loglog k)}`, none of them an
exponent-2 statement. The `k^{2+ε}` results are **Vaughan 1977** for general n,
with **Iwaniec 1971 Thm 2 / 1978** already covering the primorial case, both with
inexplicit constants, and the constant is the whole question. At the primorial
k = π(x) ~ x/log x, so g(x#) < x′² needs Iwaniec's shape and nothing weaker.

Consequence: no explicit-constant route to g(x#) < x′² exists in this literature,
and **route A's second difficulty floor stands rather than collapsing.** Applied
at every site that carried the loose end: `TODO.md` 000b, `research/G2-STATE.md`
§5 route A and §9 item 2 (where "the cheapest item on the list" retires with it,
and where four words, "at the needed constant", had also been dropped in transfer
from `ZONE-POSTULATE.md`:248, the constant being the whole question),
`research/ZONE-POSTULATE.md` §6, `research/THE-DIALS.md` §6, and
`research/two-class-lower-bounds.md` §9. Forced by `qc-refs.md` W7, which read
the sources; found independently by three partitions. `covering-dive.md`:17
carries the same correction with the bibliography fixed: Kanold's Jacobsthal
paper is Math. Ann. **170** (1967) 314-326, not the 1965 Math. Ann. 157 paper,
which is a different work.

### The X-limitation Theorem is proven per level, at @11, @13 and @17 only

**"Proven from x = 13 upward", in three summaries and two papers.** SUPERSEDED.
The proof runs per level, from L1-L2 plus the **enumerated** ensemble maximum of
VR, and `research/natal-cap-31-calm-vs-kill.js` line 184 enumerates exactly three
levels, `for (const x of [11,13,17])`. Its own reading 3 says so in terms:
"proven, per level, from L2 + enumerated max VR". **No level-uniform bound on
max VR exists anywhere in the corpus.** So "from x = 13 upward" is an
extrapolation off two measured trends over three points, max VR falling
2.78 / 2.35 / 2.14 and the driver S̄/√(K·V̄) rising 3.1 / 4.9 / 9.8. That
extension is now the named **Loudness Ceiling Conjecture [OPEN]**.

Corrected at `README.md`, `research/GLOSSARY.md`, `TODO.md` item X,
`research/natal-cap-31-calm-vs-kill.md` and both `paper/anchored-note.md` sites.
**This downgrades `qc-status.md` B-3**, which carried HIGH confidence on the
wider claim because three summaries agreed, and all three descend from the one
home. Found independently by three partitions; the failure mode is the one
`qc-compound.md` CC-11 predicted, and the standing lesson is that agreement is
not independence.

### Lemma V is not the operative assumption, corpus-wide

**"Lemma V, the one missing ingredient on the exponent road"
(`research/GLOSSARY.md`), and its equivalents in five more files.** SUPERSEDED,
and it was the most expensive misdirection in the corpus for a planner. At the
measured working point s/u ≈ 1.2, outside the range s ≤ u that Lemma V is stated
in, so proving Lemma V as stated would not reach the regime the ladder sits in.
The operative unproven input is a **Gaussian Maximal Law for the interval
sawtooth**, which now has its own glossary entry and its own name. Four
documents including the home already said so. `research/sift-limit-attack.md`
§§3 and 4.5 is named the authority and now says it in those words, because
`GLOSSARY.md`, `theta-ladder.md`, `TODO.md` and `G2-STATE.md` all point there for
it; `ZONE-POSTULATE.md` §6 route A, `theta-ladder.md` §7, `paper/moire-primes.md`
§7A Face 4 and `paper/PAPERS.md` carry the qualifier at the point of use. The
phrase "maximal law" had appeared in no paper file at all. Forced by
`qc-status.md` A-1, `qc-compound.md` CC-7, `qc-papers2.md` P-3, all verified at
both ends against the primary files.

### G2(41#) is repriced from about 37 hours to about 6

**"Cost: about 40× the 37# run", "roughly 37 hours", in `research/G2-STATE.md` §9
item 6, `research/U-FRAME.md` §7 item 3 and `TODO.md`'s Parked list.** REPRICED,
and promoted out of Parked to `TODO.md` item 1b. The 37-hour figure prices the
lattice walk, which is linear in tile width (54 min × 41). The streaming leg of
`U-FRAME.md` §8 scales in **slots**, and it recovered G₂(37#) = 528 from T₃₁'s
6,226,553,025 slots in 519 s. The slot ladder D_x = ∏_{3≤p≤x}(p−2) gives T₃₇ =
217,929,355,875 slots, so T₃₇/T₃₁ = exactly 35: 519 s × 35 = 5.05 h, or 5.6 h
carrying the 41/37 deletion-state factor. The measured 519 s already folds by 37,
so the per-state work is inside it. The residual risk is memory, not time.
**A 37-hour commitment is parked; a 6-hour one is a same-day falsifiable test**
of the Poisson law's pre-registered 476 to 633 window, and it discriminates
whether x = 37's c₂′ = 0.594 is an outlier or a level shift. Forced by
`qc-numbers.md`, verified arithmetically as `qc-CAMPAIGN.md` Decision U1.

### The Fused-Window Calm Lemma is retired as a claim name, everywhere

The name bundled **nine sub-claims at four calibrations**, and the conjunction
was the only thing a summary could copy, so every summary either reproduced the
whole grading or said something false. `README.md` copied it under the word
"Proven". The nine objects underneath already had their own names and their own
proofs. **"The anchored calm" survives as the name of a *phenomenon*, and may not
appear in any list headed Proven, Theorems, or the proven spine.**

**The buried refutation, which is the correction that matters most here.** The
uniform-in-q form of the anticorrelation, `Cov_adj < 0` uniformly in q, is
**REFUTED**, with six known counterexample primes, and the "plausible general
proof target" `natal-cap-19-calm-lemma.md` proposed cannot be reached. It was a
clause inside a status block, and **it reached no summary document in the corpus
while it was a clause**; it is now a named boxed statement, §"Uniform-in-q
Anticorrelation is refuted", with all six primes and their skeleton values.
Forced by `natal-cap-23-covadj-proof.js` (four counterexamples @11-@19),
`natal-cap-30-skeleton-bound.js` (q = 2339 @23) and
`natal-cap-36-skeleton-door.js --at29` (q = 173 @29).

**The four competing status tables are deleted, and this changelog is their only
remaining copy.** The same table had been written four times, in four leaf notes,
at four different states of knowledge, which is why no summary could copy it
correctly. Verbatim, in the order they were written:

`natal-cap-19-calm-lemma.md`, §"The Fused-Window Calm Lemma (status: two legs
proven, two measured)":

> (i) [PROVEN] fusion — dev(0,q) is ONE cyclic sibling window of length
> L_q ≈ 2W/q. (ii) [PROVEN] duplication — dev(W/2,q) = 2 × one window.
> (iii) [MEASURED, exact finite computation, all scour primes @13/@17] one
> fused window is quieter than two. (iv) [MEASURED] the anchor is
> position-typical of fused windows.

`natal-cap-23-covadj-proof.md`, §"Consequence: corrected status of the
Fused-Window Calm Lemma":

> (i) [PROVEN] fusion. (ii) [PROVEN] duplication. (iii) split by this file:
> (iii-a) [PROVEN] Cov_adj is exact arithmetic (Props 1–4); (iii-b) [CERTIFIED
> EXACT @11–@19] per-prime anticorrelation for 595/599 scour primes, the
> uniform-in-q form of (iii) refuted, the aggregate form standing at all four
> levels; (iii-c) [OPEN] the aggregate anticorrelation as an all-levels theorem.
> (iv) [MEASURED] anchored typicality 0.94.

`natal-cap-26-minus-half.md`, §"Consequence: status of the Fused-Window Calm
Lemma":

> (i), (ii) [PROVEN] fusion and duplication — unchanged. (iii-a) [PROVEN] now
> includes the exact −1/2 (Thm 2), the deviation identity (Prop 3) and the
> q-uniform no-30 bound (Prop 4). (iii-b) [CERTIFIED EXACT @11–@19]
> R(q) = −1/2 + skeleton ± 0.007, R_agg ∈ [−0.40, −0.29] < 0 at every level.
> (iii-c) [OPEN, reduced] the all-x aggregate theorem is now exactly
> G30_agg(x) < 1/2. (iv) [MEASURED] anchored typicality 0.94.

`natal-cap-30-skeleton-bound.md`, §"Status of the Fused-Window Calm Lemma after
this file", the most-cited of the four and the one `qc-status.md` B-2 named as
the authority:

> (i), (ii) [PROVEN] fusion, duplication (cap-19) — unchanged. (iii) [THEOREM at
> x = 11..23; all-x OPEN] −1/2 exact + deviation = skeleton + collapse (Thm A,
> all x, q) + G30_agg < 1/2 certified as an exact integer inequality at all five
> levels (Thm B), margins 0.29–0.41. (iv) [MEASURED] anchored typicality ≈ 0.94
> — this leg has no proof mechanism in sight; it is the calm's last wall.

Status now lives in one place, the new status-only parent
`research/anchored-calm.md`. **Two standing policies came out of this**, both
approved in `qc-CAMPAIGN.md`: *status-only parent files* as a document kind, and
*calibration-in-the-name*, where an object that is not proven carries its
calibration as part of its name (Measurement, Conjecture, Hypothesis), so that
"Proven: the Anchored Typicality Measurement" is self-contradicting on its face
where "Proven: the Fused-Window Calm Lemma" read fine and was false. That is the
mechanism that makes the error structurally impossible rather than merely
corrected.

### README.md

**"Proven: Copying Theorem, Redundancy Lemma, Crystallization, Euclid-in-moiré,
Zone Equivalence, …".** SUPERSEDED. The first four are classical and now carry
their citations inline; **Zone Equivalence is removed from the list entirely**,
with the reason stated: it is an equivalence between our target and TPC, so
listing it beside the Copying Theorem invites a reader to count a restatement of
the problem as progress. The content stays where it is used,
`ZONE-POSTULATE.md` §2. Chris's ruling, via `qc-status.md` C-1 and C-3.

**"The natal-cap campaign … added nine more: … the Fused-Window Calm Lemma …".**
SUPERSEDED, and this was the campaign's worst scope inflation. Eight proven
results, not nine. The anchored calm is a measured phenomenon whose mechanism is
proven, whose effect is certified at six levels @11..@29, whose uniform-in-q form
is REFUTED, whose all-x form is open behind a door reaching about a tenth of the
mass, and whose last leg is measured at ≈ 0.94 with no proof mechanism in sight.
The refutation had never reached any summary. Pointer added to
`research/anchored-calm.md`. Forced by `qc-status.md` B-2 and `qc-compound.md`
CC-1.

**"the first beyond-Chebyshev ensemble bounds" (plural).** RETIRED. Exactly one
exists, at @11. @13 is listed as a next step with an expected value in
`natal-cap-21-beyond-chebyshev.md`:141 and was never run; @17 never started.
Forced by `qc-status.md` B-3 and `qc-CAMPAIGN.md` Decision 2.

**"the X-limitation Theorem" (unqualified).** SUPERSEDED; see the scope entry
above.

**Map row for `paper/beta2-note.md`, "with the matching lower bound".** RETIRED.
The bounds are exponent ≈ 4.27 against exponent 1 + o(1); they do not match, and
the band between them is the repository's central fact. The row contradicted
§Status eleven lines below it. Forced by `qc-status.md` B-4.

**§Status, "the whole conjecture is the positivity of the anchored bias β(x)".**
SUPERSEDED. What is proven is one-way, liminf β > 0 ⟹ TPC. No converse is proven
or claimed, so β's positivity is at least as strong as TPC and may be strictly
stronger, and writing it as an identity makes the target look easier than it is.
The weakest sufficient statement the corpus owns, one anchored survivor at
infinitely many levels, is now named. Forced by `qc-compound.md` CC-2.

**The Map, and the first-read pointer.** "`research/GLOSSARY.md` — read this
first" RETIRED: the glossary is a lookup document and, until this campaign, the
file a first-time reader was sent to carried the wrong open problem. The Map
gained `ZONE-POSTULATE.md`, `U-FRAME.md`, `THE-DIALS.md`, `THE-LENS.md`,
`FOLD-PROFILE.md`, `TODO.md`, `SCRIPTS.md` and `qc/README.md`, all previously
absent, and a "Where to start" block naming the one reading path. Forced by
`qc-arch.md` (a) and recommendation 6.

### research/README.md

**The whole document.** REPURPOSED from a summary into the research directory's
router, per Chris's ruling in `qc-CAMPAIGN.md`. As it stood it was an accurate
summary of the work **as of 2026-08-13** wearing the filename a fresh agent opens
first: grepping it for U-FRAME, G2-STATE, ZONE-POSTULATE, FOLD-PROFILE,
THE-DIALS, THE-LENS, natal-cap, anchored-note, 4.2665 and the bare string "4.26"
returned zero hits on all ten. It now holds a question-to-file table, a file
table with a live/spent/register status column, the naming convention, the house
rule, the `history/` warning, and the six-script measurement table with script
filenames added. **The displaced prose is not deleted**: it is preserved in full,
with a table saying which document now owns each section, in
`research/history/staging/changelog-add-D-readme-prose.md`, for filing beside
`CHRONICLE.md`. Forced by `qc-arch.md` recommendations 4, 5 and 20 and diagnoses
(a), (b) B1 and (f).

**§"The proven spine" items 1, 2, 3, 5.** SUPERSEDED as a list of this
repository's results. Items 1 and 3 are Holt and Rudd arXiv:1408.6002 Thm 2.3,
item 2 is the classical sieve p² rule (Pritchard 1982), and item 5, Zone
Equivalence, is a framing biconditional that `research/PRIOR-ART.md` instructs be
presented as a framing device rather than a result. The section moved to history;
the attribution now sits at the point of use in `README.md` §Status. Forced by
`qc-status.md` C-2 and C-3.

**§"The ten attacks", the attack-4 bullet.** Its two numbers are outputs of the
invalidated `certified` column; see the Door 2 entry above. Recorded in the
displaced-prose file rather than carried forward. Forced by `qc-papers2.md` P-1.

### research/GLOSSARY.md

**"Lemma V — the one missing ingredient on the exponent road".** SUPERSEDED; see
the Lemma V entry above. The Gaussian Maximal Law now has its own entry.

**"Hyperuniformity", the Var/E tail.** SUPERSEDED. The bullet spliced three
objects: the comb-restricted ladder 0.152 → 0.396, the full process's scaling law
ln(Var/E) ≈ −(0.24u² + 0.13u), and the comb's 0.611 limit hypothesis. Read as one
object it contradicted itself, since that law at u = 2 gives 0.290 while the full
process only reaches 0.321 by y = 2003. The two ensembles are now stated
separately and 0.611 is marked as the hypothesis it is. Forced by `qc-numbers.md`
Q1.1.

**"Unification Law — one curve governs …".** Gained the calibration and the
attribution it never carried: MEASURED to ~1%, Hardy-Littlewood-conditional, and
ω(u) is Buchstab's survival function. Forced by `qc-status.md` C-5 and B-1.

**"The skeleton", "certified in exact BigInt at @11 through @23".** SUPERSEDED:
six levels, @11 through @29, confirmed by the clean re-run of
`natal-cap-36-skeleton-door.js --at29` reproducing G30_agg = 0.1176. The entry
now separates three objects that shared one name: the Skeleton Collapse Theorem
(PROVEN, all x, all q), the Aggregate 30-Skeleton Bound (CERTIFIED, six levels)
and the Skeleton Equidistribution Conjecture (OPEN). Forced by `qc-status.md` F-1
and `qc-compound.md` CC-1, CC-11.

**"The anchored calm" and "Fused window".** Both now name the claims underneath
them and point at `research/anchored-calm.md`, with the rule recorded in the
entry: the anchored calm is a phenomenon, never a claim, and there is no
Fused-Window Calm Lemma.

**"Anchored bias β" and "Assumption A".** The bolded "The whole Twin Prime
Conjecture is the positivity of this one number" RETIRED, for the reason under
`README.md` above. "Assumption A" now carries the rule that it is never written
bare: every occurrence names the weak or the sharp form.

**Header.** "Read THE-LENS.md first" RETIRED, replaced by a declared scope saying
the glossary is a lookup document, is not a first read, and owns no route's
status. The adoption dates STAY, because `research/README.md` relies on them to
tell readers that older files use older vocabulary (`qc-history.md` U3). The
campaign narrative in the anchored-layer heading goes.

### TODO.md

**Item 000b, "An afternoon with three papers".** LEFT the file per the charter,
CLOSED by inspection; see the Kanold-Stevens-Paseman entry above.

**Parked item "G₂(41#) … roughly 37 hours".** SUPERSEDED and promoted to item 1b;
see the repricing entry above.

**Item 6, "The @13 gate is MET".** DISAMBIGUATED. What is met is the T₄
*precision* gate; the @13 beyond-Chebyshev bound does not exist and is listed as
a next step with an expected value at `natal-cap-21-beyond-chebyshev.md`:141. As
written the item read as though the bound were in hand. Forced by
`qc-CAMPAIGN.md` Decision 2.

**Item 0b, "The gap is a factor 0.58 ln p".** SUPERSEDED: **0.58 to 0.95 ln p**,
the two ends being 0.18/0.31 at ρ = 1.5 and 0.18/0.19 at ρ = 2.4. 0.58 is the
optimistic end of the corpus's own range and was quoted as a point value in eight
places. The item also now records that ρ is measured non-monotone, so neither end
may be presented as the one a trend favours. Forced by `qc-numbers.md` Q5.1 as
amended in `qc-CAMPAIGN.md`.

**Item 0c, "U-FRAME §10".** REPOINTED to §5a Step 2, where the exact copy theorem
for the whole maxsum family now lives after the U-FRAME restructure, and the
dropped hypotheses restored: VERIFIED 40 of 40 **over five folds and m ≤ 8**, and
no straddling window ever beats a single-copy one. Forced by `qc-history.md`.

**Item 4, "the calm's last analytic step".** RENAMED to the Skeleton
Equidistribution Conjecture, the all-x form of the Aggregate 30-Skeleton Bound,
the parent name "the calm" being retired. Numbers unchanged; they were already
correct at six levels.

**Header.** Gained a pointer to the one reading path, so TODO no longer names a
different first read from `README.md`.

### paper/moire-primes.md

**Door 2 of §7, both load-bearing numbers.** RETRACTED and replaced; see the
Door 2 entry above. The door now states the mechanism, the per-prime toll it does
certify (deviation below N/q for every q ≤ 263 at x = 17; gross(19) ≤ 1,685
against a true 1,563), and where it stops, with the retraction left visible in
place.

**Door 5 of §7, the covering theorems.** CORRECTED. Hough (2015) and BBMST (2022)
require **distinct** moduli and our classes {0, −2 mod q} use each modulus twice,
so neither applies to our object. The door now cites
Klein-Koukoulopoulos-Lemieux (2024) Theorem 3, which covers multiplicity s = 2
explicitly and gives **no numeric constant at s = 2**, and marks our translation
inferred. The two-class shortfall is now p/ln²p from Ziller and Morack's measured
law 1.90·x·ln²x rather than the one-class p/ln p, and "a covering phenomenon of a
fundamentally new kind" is reduced to what an ABSENT marker supports, with a
visible note asking for an expert read. Forced by `research/covering-dive.md`
§§3.1, 3.3, 4.2.

**§7 preamble and abstract, "five independent routes, each rigorous until its
last step".** SUPERSEDED. Doors 1 and 4 are one classical object at two
truncation depths (Door 4's union bound is the first line of Brun 1919), and Door
2 fails structurally at x = 11 rather than at a last step. All five doors are now
stated in three labelled parts, mechanism / toll / where it stops, each with its
own calibration, so a door can no longer lend the authority of its mechanism to
its toll.

**§7A Face 4, "missing exactly one ingredient, which we name Lemma V".**
SUPERSEDED; see the Lemma V entry above. Face 4 now carries the ladder's ceiling
(exact full-period suprema 1.9524, 1.9477, 2.0018, 2.0476 at z = 19, 23, 29, 31)
and drops "nothing in print blocks it" for the κ = 2 sifting limit that does.
Forced by `research/sift-limit-attack.md` §§3, 4.5 and `research/theta-ladder.md`.

**§8's "an unexplained structural bias in the helpful direction".** RETIRED. The
anchored calm's mechanism is proven and the calm is uncorrelated with survival,
which §7A Face 2 said forty lines earlier. Forced by
`research/natal-cap-31-calm-vs-kill.md` reading 1 and `natal-cap-19-calm-lemma.md`.

**The abstract's "the matching lower bound".** RETIRED here and at
`paper/PAPERS.md`:30. The bounds are exponent 4.2665 against 1 + o(1), and the
note itself says "The point of this note is not sharpness".

**The abstract's one novelty theorem.** The hypothesis p ≥ 17 had been dropped
and an o(1) inequality was quantified over each p. Abstract and §6 now give the
finite form (p² − p)/(K − 1) with K = π(p²) − π(p) and derive the (2 + o(1))·ln p
reading from it.

**Six further dropped hypotheses and scopes**, all invisible to anything but a
word diff: the 4,190× certificate at x = 11 needs moments through order 6 and not
degree 4 (degree 4 gives 80×); Face 2's z = −0.30 and −2.71 are the diagonal
ensemble, not Face 1's window ensemble; corr(X, S) = 0.99 and the 97% hold at
x = 17, the ladder being 0.48, 0.91, 0.99; "the anchor is in deficit" printed a
45% surplus as its first value; K* is a function of the moduli pool as well as of
x, and its home withdraws the word "law"; the certificate ladder costs 5μ per
**two** degrees, only even degrees existing.

**Attribution.** FKMPT's Remark 7, not FGKMT's; arXiv:1402.1970 is Holt **and
Rudd**; Klein-Koukoulopoulos-Lemieux and Brun added to the references, and the
FKMPT corrigendum cited beside the paper; H. J. S. Smith 1857 now carries
PRIOR-ART's "per Dickson's *History*" hedge; our "fusion" is distinguished from
Holt's; Maier (1985) and Brun (1920) cited at their points of use in §7A, which
had cited nothing outside this repository.

**Honesty items the notes carried and the flagship did not.** The certified floor
at x = 29 now prints the truth beside it (31,327 against 12,307,838, being
0.25%); Face 1 gains the parity floor's measured gap (2 against the needed 1.28
at x = 17) and the z-ladder's nine-level scope; the §7A preamble now states that
the faces overlap the doors, Face 2 being Door 4's overlap credit and Door 3's
certificates seen again.

### paper/anchored-note.md

**§10's "the anchored-calm lemma, two legs from closed" and its five-level
ladder.** SUPERSEDED. The certified aggregate 30-skeleton bound now reads six
levels, @11 through @29, at 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176, the
@29 row reproduced during this campaign, so the leg is a theorem for x ≤ 29 and
no longer for x ≤ 23. The reading "the deepest level also the lowest" is **false**
at six levels, the minimum being 0.0945 at @23, and the worry it softened is
back. The paragraph no longer names a lemma, its parts carrying four
calibrations, and it now states that the uniform-in-q form of the anticorrelation
is refuted (595 of 599 scour primes anticorrelate, four cataloged exceptions) and
that only the aggregate form is claimed. Forced by
`research/natal-cap-36-skeleton-door.js --at29` and
`research/natal-cap-23-covadj-proof.md`:175-179.

**The X-limitation theorem, "from @13 on".** SCOPE CORRECTED at both paper sites;
see the scope entry above. Stated here as proven at @13 and @17, those being the
enumerated levels at or above the theorem's own starting point, with the
extension upward resting on the two measured trends.

**§7's "the entire Twin Prime Conjecture lives inside that single ratio".**
QUALIFIED: positivity suffices, no converse is claimed, so Assumption A is at
least as strong as the conjecture and may be strictly stronger.

**§11's "the proven layer around it (… Proposition 1 …)".** CORRECTED to
Proposition 1's part (i), part (ii) being an extrapolation of two measured
trends, which the same section says four lines later.

### paper/staircase-note.md

**§9's quotation of Fan and Pomerance.** CORRECTED. The source reads
Φ(x,y) < .6x/log y when y ≤ √x; the note printed 6x/log y for y ≤ x, a dropped
decimal point and a dropped square root, in a bound the note leans on. Forced by
the arXiv:2306.03339 text quoted in `qc-refs.md` W5.

**Honesty item 1, "four finite computations".** CORRECTED to six; the note's own
Theorem 8 table has had six rows since 2026-08-15.

**The title's name.** The status block now states that "the Staircase Theorem"
names Theorem 3 and nothing else, the certified floors being Theorem 8 at six
levels and the tail bound Theorem 6, the note's one non-elementary ingredient.

### paper/beta2-note.md

**Two "FGKMT Remark 7" attributions.** CORRECTED to FKMPT (Ford, Konyagin,
Maynard, **Pomerance**, Tao, *Long gaps in sieved sets*), one of them at :152
which the reference audit did not list. The corrigendum is now cited beside it.

### paper/PAPERS.md

**Paper II's title.** The note governs: "An upper bound for the twin Jacobsthal
function", replacing "Two-sided bounds for …", with the reason recorded in place.

**"Iwaniec's contested transfer lemma".** The word DROPPED. One unanswered 2016
MathOverflow post is not a controversy. Replaced by the note that the route
avoids the lemma entirely and that an explicit-constant or formalised exposition
of it would be useful.

**"the matching lower bound".** Retired, as in the flagship.

**Zone Equivalence listed among "the spine theorems".** CORRECTED to a framing
device presented as a proposition, which is what `research/PRIOR-ART.md` asks for
and what `paper/moire-primes.md` §6 already does.

**"OEIS: G₂ sequence (drafted, 11 terms)".** CORRECTED to twelve, through
a(12) = G₂(37#) = 528.

**The Lemma V map's positioning.** Now carries the qualification that travels
with it: the operative assumption at the measured working point is the Gaussian
maximal law, not Lemma V.

### research/G2-STATE.md

**§4e stated the Origin Excess Lemma without `y′² > x`.** RESTORED. The
hypothesis is in `maier-matrix.md` §4 in bold and was lost in transfer, with the
citation, the `PROVEN, VERIFIED 14/14` marker and every number intact. Without it
the quoted lemma applies to every y < x with S ≤ y′², and in the whole regime
y′² ≤ x it asserts nothing: D_x(S) = 0 for S ≤ x, so at S = y′² ≤ x it reads
0 = 0. **A proven lemma was being quoted in vacuous form.** Restored as a
labelled non-vacuity remark inside the boxed statement so it cannot be quoted
away again. Forced by `qc-shepherd.md` item 3b, re-verified computationally three
ways (`oel-hypotheses.js`).

**§4e's "the lemma carries an unstated third hypothesis".** RETIRED as a private
count. The lemma has one hypothesis, S ≤ y′²; the x < x* threshold belongs to the
Origin Excess Corollary. §4e now cites the canonical enumeration at
`maier-matrix.md` §4a.

**§4e, "The lemma's first form missed the m = y′² boundary case and failed 4 of
14".** MIGRATED here; the body states the surviving fact, that the m = y′²
boundary case is load-bearing and dropping it fails 4 of the 14 cells.

**§5 route A and §9 item 2, the Kanold/Stevens/Paseman loose end.** Two defects
in one passage, both settled above: four words, "at the needed constant", dropped
in transfer, and a premise false for all three papers.

**§9 item 6, "Cost: about 40× the 37# run".** REPRICED; see above.

**§7's quotation of `ZONE-POSTULATE.md` §5's "second sighting worth watching".**
DEAD QUOTATION removed; that phrase is no longer in ZONE-POSTULATE §5. The body
states the question and the answer without the retired framing. Forced by
`qc-history.md` O6.

**§8's ownership table fused five rows.** SPLIT, with the discipline now stated at
the head of the table: one object per row, one calibration per cell, a subject
containing "and" is a defect, and a calibration cell containing "+" or "given"
names a second object. Rows split: the driving-term lemma from the refuted route;
the Overshoot Budget from the four-hypothesis no-fixed-point argument; Facts A
and B from the two-class Localized Merge Lemma; the discrepancy ΔΦ₂ from its
measured per-fold sup and sd ladder; and the Origin Excess Lemma from the
corollary's ceiling and from the measured reversal at the zone width. Forced by
`qc-compound.md` CC-5, which notes that `README.md` sends readers here on the
promise of a calibration marker on every line.

**"Today" and "tonight" as the tense of a working document.** RETIRED at eight
sites (the header, §0 twice, §3b's house practice, §5's title and status line,
route B, route D, §5b's title, §10). The document states current understanding
and reads as though it had always said it; the dates are here.

**§4f's citation of the `OBSERVATIONS.md` triage rule.** REPOINTED to
`THE-LENS.md` §5, which owns the rule and says so at `THE-LENS.md`:184. Forced by
`qc-arch.md` recommendation 1.

### research/maier-matrix.md

**§4's statement fused four objects of three logical types inside one boxed
"Lemma (PROVEN, VERIFIED 14/14)".** DECOMPOSED, and §4a is now the canonical
enumeration for the corpus: the **Origin Excess Lemma** with its one hypothesis
S ≤ y′²; the **non-vacuity condition** y′² > x, a remark and not a hypothesis
because the identity is bookkeeping and holds regardless (VERIFIED 3 of 3 outside
the stated range); the **Origin Excess Corollary**, which owns the advantage and
its expiry at x < x*(y); and the **Scale Collision Proposition**, a theorem about
the parameters and independent of the lemma. Why the split matters: the strike
characterisation is what needs S ≤ y′², and its bound
L ≤ 2(π(x) − π(y) + 1) fails in 6 of the 8 test cells with S > y′². Three
documents previously kept three different counts of "the hypotheses", which is
how a qualifier went missing unnoticed. Forced by `qc-shepherd.md` item 3c and
`qc-compound.md` CC-4.

**§8's heading, "Chris's correction is right".** REWORDED to the verdict itself,
"Granville-Soundararajan Corollary 1.4 is vacuous at every computable scale";
likewise §8's closing sentence and reading 8, which now state that Corollary 1.4
is not an obstruction in this repo without narrating the withdrawal. The
withdrawn claim, for the record: **GS Corollary 1.4 as a proven obstruction to
the zone programme is WITHDRAWN**, because η = min(α/3, 1/100) caps at 1/100 for
every sequence, forcing u ≥ 50,000 and log x ≥ (5·10⁶)^200
(`scratchpad/holt/gs.txt` 313-325).

**§10 "Corrections to the briefing" (25 lines).** MIGRATED, section removed, §11
renumbered to §10. Its three bullets:

- The briefing offered q = x# on the ground that the slot count is identical in
  every row while the prime count is not. That ground is empty as a matrix
  statement. The surviving mathematics, that the row-by-row count of prime slots
  is free below x′² by crystallisation and is the twin prime problem above it,
  was not stated in §2 in that form and is now there.
- The briefing's "Maier has to fight for his AP input, ours is exact and free"
  asymmetry is RETIRED as an encouraging reading: the premise is true and the
  inference is wrong, since GS's own history shows the AP input moving from
  GRH-conditional to unconditional without changing the size of the conclusion.
  The epigram that survives, "his fight with the AP input buys unconditionality;
  his fight with Buchstab buys the theorem", is now in §7 Q3.1.
- The bullet asserting that `PRIOR-ART.md`'s Maier-chain entry has the row and
  column sums the wrong way round is DELETED: `PRIOR-ART.md`:302-303 already
  carries the corrected version and this changelog already logs it. The bullet
  asserted a pending action that no longer existed.

**§1's "Chris's doubt, recorded before the work" and §7 Q3.1's "The briefing is
right that…".** REWORDED to state the fact and keep the attribution. The doubt
and who held it stay; the process framing is here.

**§4 and §9's citations of the `OBSERVATIONS.md` triage rule.** REPOINTED to
`THE-LENS.md` §5, the declared owner.

### research/origin-excess.md

**§6's title, "The three hypotheses of the Origin Excess Lemma, only one of which
was written down".** RETIRED, false twice over: `maier-matrix.md` §4 does state
the second, and two of the three were never hypotheses. §6 is now "The lemma's
one hypothesis, the corollary's threshold, and the collision", with §6a, §6b and
§6c deriving the three companions of the §4a enumeration.

**§0's "the Origin Excess Lemma has an unstated third hypothesis".** RETIRED as
above; the threshold belongs to the corollary and the text now says so.

**§9 "Corrections to the record" (35 lines).** MIGRATED, section removed, §§10
and 11 renumbered. Its six bullets:

- "The lemma carries three hypotheses, not one" is superseded by the
  decomposition and by §6; deleted.
- "The disjointness of the two regimes owes nothing to the matrix" is current
  mathematics and MOVED into the body as §6c, the Scale Collision Proposition.
  This is the statement `maier-matrix.md`:282 was citing when it cited the
  non-existent §6c; the citation now resolves.
- "Above y′² the advantage is negative" is current and already stated three times
  in the body (§0 item 2, §3, §4), so nothing needed relocating.
- "'The measured factor is small' is the weak form" RETIRED as our own earlier
  phrasing; the surviving and stronger fact, that the factor is bounded by an
  absolute constant near 2 and the bound does not improve with scale, is in §6b.
- The identification of `FOLD-PROFILE.md` §9's trough constant with ρ(2) is
  current and already in the body at §5; the instruction to cross-reference it in
  three files is spent, `FOLD-PROFILE.md`:300 and `GLOSSARY.md`:208 carrying it.
- The quotation of `ZONE-POSTULATE.md` §6 route B's "not yet aimed here" is a
  DEAD QUOTATION, that string being in no body file. The surviving fact, that
  three pieces of the origin's proven structure are aimed at route B and all
  three miss, is now the closing paragraph of §7.

**§1's "The briefing's numbers are all correct".** REWORDED to the custody fact:
every inherited number reproduces on an independent engine.

### research/LOCALIZED-GAP.md

**§4's unnamed map.** The home document left the gate feedback map anonymous
while `G2-STATE.md` §4c named it. BACKPORTED: the map B ↦ 2.4·R·B·ln x is named,
and its expansiveness for every x ≥ 2 is stated as the reason there is no fixed
point, together with "because the gate feeds back". Forced by `qc-shepherd.md`
item 4 and recommendation 10.

### research/U-FRAME.md

**§§10-15 were titled by which attack produced the result**, so the status of L
was spread over six attack sections and had to be synthesised by any reader who
asked for it. RESTRUCTURED by claim: the mathematics went into the sections that
own each object (§5a, §6a, §8), the residue became §10 L and κ(m), §11 the
transfer operator and the pair count, §12 f and the staircase. **§§1-9 keep their
numbers**, 128 inbound pointers landing on them and 15 of the citing artifacts
being scripts whose pointers sit in pasted output. Forced by `qc-arch.md` §2,
accepted over the shepherd's plan on this question. Nothing went to `history/`;
the attack chronology has a home in `ATTACKS3.md`.

**§5a Step 3 and old §10 disagreed on strategy while agreeing on the facts.**
Step 3 stated maxsum₂ ≤ G₂(new) ≤ maxsum_{L+1} and read as an invitation to bound
L; §10, four hundred lines later, recorded that the sharp shift measures strictly
below L at three of five folds and that "a proof aimed at L is aiming past the
target", so a reader who stopped at §5a took away the wrong strategy. RESOLVED:
both verdicts now sit in Step 3 where L is defined, as **aim at κ(m), not at L**.

**The sharp shift j*(1) and the effective run length were the same object under
two names**, over five folds in old §10 (j*(1) = 1, 2, 1, 2, 2 against
L = 2, 2, 2, 3, 2) and over nine in §5a's EXTENDED block and old §12
(m_eff = 3, 2, 2, 3, 2, 3, 3, 3, 4 against L+1 = 3, 2, 3, 3, 3, 4, 3, 5, 5).
1 + j*(1) = m_eff by definition and the five overlapping values agree. MERGED
into one statement in Step 3, with j*(m) defined once.

**Three corrections and duplications sitting beside the claims they corrected,
all folded into present-tense statement.** §5a Step 3's inline dated block
("EXTENDED to folds 31 and 37, and A10 answered NEGATIVELY (2026-08-16)") becomes
the bound's own statement, verified at 329 (tile, prime) cells over folds 7 to
37, with the two mechanisms that stop the lower half becoming exact moved to §10.
Step 4, stated twice 90 lines apart with the reason in one place and the table in
the other, is MERGED, and the Step 2 kill law's copy theorem gains the family
form that `TODO.md` 0c and `gate-multiplies.md` §9 both cite. One qualifying-gap
closed form stated three times (old §§11, 13, 14), one Alternation Lemma twice,
one fold-11 explanation twice: COLLAPSED into §10 keeping every distinguishing
detail, the weights 1, 1, 2, the 3p window threshold, the check at all 302 primes
from 5 to 1999, and the two-state walk as the proof sketch.

**The L(T₂₃, 29) = 2 custody note was stated three times, each claiming a
different ordinal**: "established independently five times" (§5), "the fourth of
five independent confirmations" (old §12), "confirmed here for the fifth time"
(old §14). The ordinals were per-attack bookkeeping and disagreed. SETTLED as one
custody statement in §8 naming all five confirmations (A4, A5, A8, A9, A10) and
dropping the ordinals, with `Lgrowth.js`'s hazard warning and the streaming
custody moved there too.

**Old §11 held a prior-art finding**, the Holt and Rudd arXiv:1408.6002 §5
attribution and the instruction that nothing below may be presented as new
structure. MOVED to §6a, the file's own prior-art section, which is why
`PRIOR-ART.md`:117 had to point into an attack section to find it.

**§9's "the same ratio ρ is measured rising with level, 1.58, 1.78, 1.83, 1.41,
1.84, 2.39" and old §10's "about 1.3 at T₁₁ and about 1.7 at T₂₃, rising with
level" both named no statistic and both asserted a trend.** They are different
statistics of one quantity, ρ = (maxsum_m − G₂)/((m−1)·m̄), §9 the per-level
maximum over m ≤ 8 and old §10 the per-level median, and both are arithmetically
right. **"Rising with level" is REFUTED for all three natural statistics**: the
median runs 1.33, 1.26, 1.15, 1.27, 1.71 at T₁₁ to T₂₃, the mean has the same
shape, and the max dips 1.83 → 1.41 at T₁₉. Both sites now name their statistic
and neither claims a trend. Forced by `qc-numbers.md` Task 0, which sieved T₁₁ to
T₂₃ from scratch and reproduced both recorded maxsum tables digit for digit.

**§9 said "we have seven integers" and listed eight**, omitting fold 37's value
that §5 carries. CORRECTED to nine: 2, 1, 2, 2, 2, 3, 2, 4, 4 at folds 7 to 37.

**Two entries settled above.** "The gap is a factor 0.58 ln p, and it is the only
gap" was the optimistic end of a range, corrected at §7 and §9 to 0.58 to 0.95
ln p. §7 item 3's 37 hours for G₂(41#) stands as the lattice-walk cost only; the
streaming leg of §8 prices the same term at about 6 hours.

### research/ATTACKS3.md

**Five Landed verdicts pointed at U-FRAME sections that the restructure retired**
(§§10, 11, 12, 13, 14-15). REPOINTED to the sections that now hold the
mathematics, in the same edit as the restructure, which is why the restructure
did not move the chronology to `history/`.

**"min(N_P, N_M) still decays, so A5's hole remains" (A8's verdict) said the
opposite of what it meant** and of what U-FRAME's honest limit states. CORRECTED
to "nothing shows min(N_P, N_M) decays". The two halves of the sentence
contradicted each other: a decaying min would close the hole, not leave it open.

**The organising principle presented the additive chain
G₂(new) ≤ G₂(old) + L·m̄ as the live route.** That chain is §5a step 4 and is
REFUTED. The paragraph now states the interval difficulty on its own terms and
records that the chain the wave was framed around is dead, so the R/I marks read
as a statement about the attacks rather than about a live route.

### research/gate-multiplies.md

**§7 attributed to `U-FRAME.md` §§4 and 6a a claim those sections no longer
make**, "the multiplier uses only 15 to 45 percent of its budget and the fraction
is TRENDING DOWN", while the numbers in the two files agreed. The quotation was
dead: a reader following the pointer found agreement rather than the error being
described. REWRITTEN to make the point against the softer `2 ln² p/p` budget
without attributing a retired claim to a document that no longer holds it. Forced
by `qc-history.md` O1.

**§8's "ρ MEASURED at 1.0 to 1.9 across T₁₁ to T₂₃ and rising with level" named
no statistic and asserted a trend the same file refutes sixty lines later** at
:424, which prints the dip 1.83 → 1.41 at T₁₉. The range is the min/max over
every (tile, m ≤ 8) cell, 1.015 at (T₁₉, m=4) to 1.839 at (T₂₃, m=6). CORRECTED
to name the statistic, give the per-level medians, and drop the trend. §10's
honest-limits note lost its "and it is rising" for the same reason.

**§7 and §9 were written as a verdict on TODO item 0b as that item used to be
written**, and `TODO.md` has since been rewritten to the corrected form, so the
quoted premise is absent from the file cited. MIGRATED: §7's heading and opening
state the required rate as the fact it is, §8's heading and threshold box speak of
the surviving form, and §9 item 3 states the per-fold multiplier bound without
quoting the retired item or its retired win condition. Every number, the VERIFIED
table and the `ln x / 2` mechanism are unchanged.

**§10, "Where the corrections went", was pure process record** duplicating both
the standing footer and this file's index by document. DELETED; §§11 and 12
renumber. No working document pointed at either.

**§6's recursion table and §9 labelled their rows by the U-FRAME section that
held each object**, four of which moved. RELABELLED: A4's three recursions now
name §5a steps 2, 3 and 3a; A5's theorems and A10's effective run length name
§10; A9's operator stays at §11.

### research/THE-DIALS.md

**Dial 7, "`research/bv-import-survey.md` already returned the verdict for us:
inert. … Do not spend effort here".** SUPERSEDED, and this is the campaign's one
finding that returns work rather than removing it. The survey scopes "inert"
narrowly, to weak Assumption A and the Buchstab transfer at bounded u. Elsewhere
it says the opposite: §3.2 is titled "Provable by BV: the full-wheel prime-comb
equidistribution, tail regime", it calls the full wheel product at depth
q_K = T^{o(1)} a BV theorem, marks an item provable now and elementarily, and
says Assumption A is a theorem for the P₂-weakened comb with BV proving it. Read
literally, dial 7 retired `TODO.md` item 11, which is three theorems that need
writing up rather than discovering. The dial now carries the split verdict, and
the §3 summary row with it. Forced by `qc-status.md` F-2.

**§3 summary row for dial 2, "1.57 measured".** Gained the bracket 1.3-1.9 and
the floor 1 in the row itself; the caveat was 99 lines away, and this row is the
file's most quotable line. Forced by `qc-numbers.md` Q2.1.

**§6, "Unchecked: whether an explicit elementary bound (Kanold, Stevens,
Paseman) already delivers g(x#) < x′² at the needed constant".** SUPERSEDED:
checked, and the answer is no. See above.

**§0, "His call on overlap is CORRECT, and it retires an old objection".**
REWORDED to state the conclusion rather than the adjudication; the argument is
unchanged and entirely current. Forced by `qc-history.md`.

### research/ZONE-POSTULATE.md

**§6 route A, "missing the signed cancellation … (Lemma V)".** Now carries the
qualifier; see the Lemma V entry above. Forced by `qc-status.md` A-1.

**§6, "Loose end, logged and not chased" (Kanold, Stevens, Paseman).**
SUPERSEDED by the closure; see above.

**§7, "From `research/OBSERVATIONS.md`: if a statement can be phrased in
residues …".** REPOINTED to `THE-LENS.md` §5, which owns the triage rule and says
so in writing at its line 184. One of four sites citing a sightings notebook for
a rule it does not own. Forced by `qc-arch.md` recommendation 1 and (d) D2.

**Where this stands.** A three-line status block added after the title, in
`G2-STATE.md` §0's shape. The document's single most useful sentence for a fresh
reader, the 10¹¹ verification, sat at line 90 behind 89 lines of logical status.
No content moved. Forced by `qc-arch.md` recommendation 3 and (c) C4.

### research/THE-LENS.md

**§4, the one-number reformulations table, "u-frame | CLOSED, the rate has no
slack".** DECOMPOSED into two rows, because the file said CLOSED about an object
the router calls the live route. The per-fold multiplier form is closed; the
copy-theorem form is open and is the branch's one live entry point, TODO 0c.

**§3's heading date, and "Both are still correct reformulations".** The date
stamp goes and Chris's attribution stays, per `qc-history.md` U3: dates stay
where a reader uses them to date other documents, and go where they only date the
idea. "Still" dropped for the same reason.

### research/FOLD-PROFILE.md

**§8 CREATED, "The natal cohort: dispersion, and the lineage identity".** The
**Natal Dispersion Lemma** (PROVEN, one line; VERIFIED, never exceeded) and the
**lineage identity** (EXACT at every level) previously existed only in
`research/history/SESSION-2026-08-17.md` and in a script comment. Under the rule
that `history/` is not read for current understanding, both had no findable
status, and the first is load-bearing for the session's verdict that the natal
creation engine is CLOSED, so a closed route's justification rested on a lemma
with no home. §8 was the empty slot in a numbering that ran 0-7, 9, 11, 12, 10,
it sits in the right reading order before §9 Survival, and it gives
`fold-profile-09/10/11-*.js` their first prose home. All three scripts were
re-run for this section rather than transcribed. Forced by `qc-status.md` D-1 and
`qc-arch.md` (d) D1, which corrected the provisional §9 placement.

**One number corrected in the transcription.** The session record's "99.94% of
twin primes born at level ≤ 13" is the figure for the real twin primes below
10⁸; on the tile the cumulative share is **99.93%**. Both are now stated, with
the object each belongs to. The twin count in that run is 440,311 rather than the
familiar 440,312 because the census starts at (5,7); (3,5) sits below the comb.

**§12c, "*Lemma (PROVEN).* A position r < p² is a twin slot of T_p iff …".**
NAMED as the **Head Monotonicity Lemma**. Three other documents refer to it by
name while its home left it unnamed. Forced by `qc-status.md` §4.

**Header, "`research/fold-profile-01..04-*.js`", and §10 Reproduction.** The
enumeration stopped at 04 while the family runs to 16; scripts 09, 10 and 11 are
now listed with what they own and what their custody is. Forced by `qc-arch.md`
(g) G1.

### research/covering-dive.md

**The FKMPT constant, the "v3, dated 2024-12-03" stamp, and the
Halberstam-Richert expansion.** See the FKMPT entry above.

**:17's Kanold bibliography.** CORRECTED to Math. Ann. **170** (1967) 314-326;
the 1965 Math. Ann. 157 paper is a different work.

**:108's "c ≈ 1.90 over all 21 exact terms", attributed to
`two-class-lower-bounds.md` §6, which gives 2.04.** SCOPED rather than deleted.
From the exact A288815 terms the ratio is **not constant at all**: 1.04 at x = 11
rising to 1.95 at x = 73, mean 1.63.

**§Q5's "Ford's slides: not located in this dive".** RESOLVED by locating them;
see `research/maxgap-law.md` below.

### research/two-class-lower-bounds.md

**§2a's `C(1/2) > 1/6001`.** RETRACTED VALUE; see the FKMPT entry above. The bare
`[7]` gains the version numbering with it.

**§9's "LOOSE END, not checked": Kanold, Stevens and Paseman "all of which give
exponent 2 + ε with stated constants".** FALSE for all three, and CLOSED rather
than done; see above.

**§10 "Corrections logged", five items.** MIGRATED. Four of the five quoted
sister documents that no longer say the quoted thing:

- item 3 quoted `covering-dive.md` §Q4.2's "realistic target 4", asking "does
  covered length scale like `c·p²/log`? like ZM's ≈ `p²/2` data?"; neither string
  is in that file. Its mathematics is stated nowhere else and has moved into §6
  as a plain paragraph.
- item 4 quoted `U-FRAME.md` §6a as reading the adversarial exponent "STABLE at
  about 1.62, comfortably below the critical 2"; `U-FRAME.md`:535 now reads "The
  fitted exponent is 1.62 in the theta frame and 1.924 against x". Its one
  non-duplicated sentence, the 1.2 greedy-ladder exponent, is already at §5.
- item 5 quoted `ZONE-POSTULATE.md` §5's "a second sighting worth watching",
  retired from that file. Its surviving content is the direction-of-inference
  warning, which is live and load-bearing.
- items 1 and 2 recorded briefing doubts whose answers are already the file's own
  headlines (`G2 ≥ g` at §1; "stronger by exactly log x", derived three ways at
  §4b, §5 and §6 and restated in §8's verdict).

**§10 is REPURPOSED rather than deleted, and §§11-12 keep their numbers**, because
`ZONE-POSTULATE.md`:150 cites §10 for the climbing certificate ladder. Deleting
and renumbering would have broken that pointer and required an edit in another
partition's file; instead §10 now holds item 5's surviving content under "The
certificate ladder, and how far it can be pushed", so the inbound pointer
resolves to exactly the claim it wants.

**§8's "VERDICT: SAFE".** SCOPED at the point of use to "SAFE against the
construction side", the qualifier §9 already carried one section later and that
`G2-STATE.md`'s copy carried inline. Found by the `transfers` check on the
near-duplicate pair, which is what that check exists for.

**Brief-response framing.** §0's "the honest doubt", §1's "Correction to the
briefing" and §4a's quotation of the briefing RETIRED, every mathematical
statement in them retained as a statement of fact.

### research/PRIOR-ART.md

**"Phi(x,y) < 6x/log y for y <= x" (Fan and Pomerance).** WRONG in two
independent ways in one formula. The source's abstract, read from the LaTeX via
the arXiv API, is **"Φ(x,y) < .6x/log y when y ≤ √x"**: a dropped decimal point,
making the theorem ten times weaker than it is, and a dropped square root, making
the corpus claim a range twice as wide as the theorem covers. The venue given,
J. Number Theory 254 (2024), is CORRECT. The same error stood at
`paper/staircase-note.md`:444 and is fixed there.

**"e^{2γ}/4 ≈ 0.7935".** RETIRED. `e^{2γ}/4 = 0.7930547…`, so 0.7935 is not a
rounding at any precision. Now 0.7931; the only site in the corpus carrying it.

**"Iwaniec … see Erdős Problem #687" for the h(k) form.** WRONG cross-reference,
confirmed by reading both pages in full. #970 carries the `h(k) ≪ (k log k)²`
form and says of itself "This is a more general form of the function considered
in [687]"; #687 carries the `Y(x) ≪ x²` form and the $1000. Both are now named
for what each holds, and the row's "constant unknown" is reworded to
"inexplicit", neither page's text saying the constant is unknown.

**"cited by Holt in 1402.1970", and the whole §"What 1402.1970 does have".**
arXiv:1402.1970, *On Polignac's Conjecture*, is **Holt AND Rudd**; the section
attributed its findings to "he" throughout. Corrected here and at the corpus's
other three sites.

**Two paraphrases inside quotation marks.** Táfula's "missing the constant by
4e^{−2γ}" reads, in the source, "missing its constant only by a factor of
4e^{−2γ}"; the Cheer-Goldston "Maier used this result…" sentence silently deletes
"has recently". Both are now marked as paraphrases. The *other* Cheer-Goldston
quotation on the line above is verbatim and stays.

**Táfula's date "(2015/2020)": CORRECT AS WRITTEN, and now unambiguous.**
arXiv:1508.05702 has v1 2015-08-24 through v5 2019-08-28 and no 2020 version, but
the paper was published in São Paulo J. Math. Sci. in 2020. Both halves are right
and the file now says which is which. Recorded so nobody "fixes" it.

**"twin-Legendre (OEIS A192870)".** IMPRECISE. A192870 is the n-tuplet
generalisation, whose n = 2 entry is the twin case; the twin-specific sequences
are A091591/A091592, which the corpus cites correctly elsewhere.

**"periodicity remarked by H.J.S. Smith (1857, per Dickson's *History*)":
CONFIRMED, and the citation is now primary.** The date had been flagged as
suspicious because Smith's *Report on the Theory of Numbers* ran 1859-1865 and
his arithmetical-determinant paper is 1875/76. Dickson vol. I cites the same
paper twice: p. 439 ("Diatomic Series"), where after deleting the multiples of
2, 3, …, p the survivors "form a periodic series of period 2·3…p; and similar
theorems. Like remarks had been made previously by H. J. S. Smith"; and p. 436,
"H. J. S. Smith gave a theoretical method of finding the primes between the xth
prime P_x and P²_{x+1}, given the first x primes." Footnote in both places:
**Proc. Ashmolean Soc. 3 (1857) 128-131; Coll. Math. Papers I, p. 37.** So the
1857 date is right, and the paper is a **stronger** prior-art item than the
corpus recorded: the second entry is the zone (p, p′²) and the p²-rule, stated as
a method, in 1857. Added to the crystallization row.

**"Mirror/palindrome of the wheel — never foregrounded as an organizing
device".** WEAKENED on the same source. Dickson vol. I p. 439 records
A. de Polignac's "diatomic series" (Comptes Rendus Paris 29 (1849) 397-401; Nouv.
Ann. Math. 8 (1849) 423-9) as periodic with φ(πₙ) terms and with "the terms after
1 of the period … symmetrically distributed (two terms equidistant from the ends
are equal)": the palindrome and the census, together, in 1849. The claim is
narrowed from the observation to the *use* of it as an organizing device. **This
is a novelty-verdict change**, approved in `qc-CAMPAIGN.md` and flagged below.

### research/maxgap-law.md

**§10 item 4, "The Maier-Pomerance statement, checked against the source, so
nobody re-checks it".** Two of its three legs were WRONG, in a block whose whole
function was to discourage re-checking. Corrected against arXiv:1412.5029 before
being relocated into §7:

- "`Y(x) = j(P(x)) − 1` exactly (their **eq. 1.2**)" is **eq. (1.3)**; `Y` itself
  is their **Definition 1**; (1.2) is a different statement, the proven lower
  bound.
- "The proven FGKMT bound is `Y(x) >= R·x·log x·log_3 x/(log_2 x)^2` for any `R`"
  is not theirs. FGKMT's (1.2) is `Y(x) ≫ x log x log_3 x/log_2 x`, a **single**
  power of log_2 x. The squared form is **Rankin's**, printed by FGKMT only in
  "This improves on the bound … obtained by Rankin". Nor is "for any R" theirs:
  their Theorem 1 is `G(X) ≫ log X log_2 X log_4 X/log_3 X` with an effective
  implied constant.
- Leg 1, the Maier-Pomerance quotation, is CORRECT and verbatim.

**The conclusion survives**, which is why this is a defect in the statement of
someone else's theorem and not a mathematical one: with the correct bound the
ratio to the random-dart level is `log_3 x/(e^γ log_2 x) → 0`, so it still sits
below. `:391` carried the same misattribution and is corrected with it; the other
fourteen sites in the corpus already had the single `log_2 x`, and `:52` and
`:390` correctly attribute the squared form to Rankin. The relocated block now
says what was checked, against which version, and on what date, which is what
makes a "do not re-check" note usable.

**"Ford's slides: not located in this dive" (`covering-dive.md` §Q5) against §6
quoting them verbatim as read.** RESOLVED by locating them: Kevin Ford, *Large
gaps between primes*, Talks 1-3, CRM Montreal workshop *Probability in Number
Theory*, 2018, ford126.web.illinois.edu/montreal_talk{1,2,3}_primegaps.pdf.
Talk 1's slide "Proving large gaps: Jacobsthal's function" carries both quoted
statements one line apart, verbatim as §6 reports, and independently corroborates
FGKMT's single log_2 T. Both files now carry the citation, as does
`two-class-lower-bounds.md` §2c, whose "T(log T)^{1+c} under uniform
Hardy-Littlewood" is also verbatim on that slide.

**§10 items 1, 2 and 3, "What this note owes other files".** All three debts had
been paid before this pass while the list still stated them outstanding:
`localized-04-maxsum.md`:127-133 carries the coordinates; `FOLD-PROFILE.md`:486
reads `M(x, x′²) ~ 3.5·ln³x` with margin `x²/(3.5 ln³x)`;
`exponent-control.md`:86 carries `c1 ~ (log p)^{0.12 ± 0.03}`. Section removed,
§§11-12 renumber, verified first that nothing cites §10 or past it (the highest
inbound reference is §9).

**Brief-response framing.** The 2026-08-17-night date stamp, "this note …
corrects three things", "over a lever 41 times longer than the briefing assumed",
"the tension in the briefing", the READING 1 heading "The tightness dispute", the
quotation of the briefing's two spreads, and "Correction to the briefing, and to
both files" all RETIRED as framing. The mathematics is unchanged: the two spreads
are the same size on matched conventions, and the one-class lever is a factor 41
with `c1` moving 22% over it.

### research/theta-ladder.md

**"Run 2026-08-17. Brief: TODO item 00, feeding TODO item 0", and the eighteen
sites where "the brief" or "TODO 00" is the grammatical subject.** MIGRATED to
statements of fact, nothing mathematical changed. The superseded estimates being
corrected retire with them: TODO 00's "z = 31 took 65.3 s" against the measured
36.7 s, and its costing "z = 59 is 1 to 2 h, z = 71 several hours, z = 100 is
days" against the measured z = 59 ≈ 5 h and z = 71 ≈ 36.5 h. Both were already
applied to `TODO.md`:71-72 and logged in this file; the measured cost table stays
in §9 under a plain "**Cost.**" heading.

**"`research/ZONE-POSTULATE.md` §5 ('a second sighting worth watching')".** DEAD
QUOTATION, that phrase no longer being in ZONE-POSTULATE §5. Replaced by what the
pointer is actually for.

**Conditional-theta caveat discipline.** Every place a reader meets the
conditional column now carries, at the point of use, that it rests on an
**unproven** Gaussian maximal law for the sawtooth: §0's definition, §0's
headline answer, §2's table, §6's "the conditional column agrees and more
loudly". §5b's exact column is marked as the one that owes nothing to it.

**"The null 2 + ⟨2/ln lnW⟩ = 2.649" at §3.** Kept and now named. It is an
empirical regression null and a numerical near-coincidence with the unrelated
vector-sieve threshold `1+√e = 2.6487` discussed in §7; the file says so where
the collision occurs.

**§7's Lemma V paragraph.** REPOINTED at the home, `sift-limit-attack.md` §§3 and
4.5. The TODO 0 statement it derived is already applied at `TODO.md`:63-66 and is
now stated as fact rather than as a correction to carry.

### research/sift-limit-attack.md

**The Lemma V calibration.** No claim changed. The file is the home and the
authority for the fact that Lemma V is not the operative assumption at the
measured working point and the Gaussian maximal law is, and it now says so in
those words, because `GLOSSARY.md`, `theta-ladder.md`, `TODO.md` and
`G2-STATE.md` all point here for it. The conditional column's introduction gains
the word **unproven**, and the FKMPT citation gains the corrigendum and version.

**§3's discard-map row "Fusion / anchored calm (PROVEN (i),(ii); MEASURED
(iii),(iv), cap-19/23/26)".** STALE in the conservative direction, the rarer
kind: it graded as MEASURED a leg that is a certified theorem. The row now names
the five PROVEN objects (Mirror-Sibling Identity, Fusion Identity, Mirror-Phase
Doubling, Minus-Half, Skeleton Collapse), the Aggregate 30-Skeleton Bound as
**CERTIFIED at six levels @11..@29 as an exact integer inequality**, and the
Anchored Typicality Measurement as MEASURED, and points at
`research/anchored-calm.md` rather than at the three cap-files whose competing
status tables are retired. Understating our own result is still a defect.

### research/dhr-verification.md

**The file was a spent audit whose every quoted claim had been fixed**, and
`staging/audit-campaign.md`:11 listed it "Clean, no change needed". All seven of
its §6 recommendations had been applied to `paper/beta2-note.md` before this pass
(verified 7 of 7 again here against the note's current text), so its §0 table
asserted as live claims of that note six statements the note no longer makes.

**Decision: the file STAYS in the body, brought current, rather than moving to
`history/`.** Its §§1-5 and §7 are the primary-source ledger for β₂ and DHR
Theorem 9.1, the corpus's most load-bearing external chain, and
`research/sift-limit-attack.md`:58 and :412 cite it live for exactly that.
Nothing in it is superseded; the sources still say what they say. What died was
the framing. It now opens with a dated **APPLIED / OUTSTANDING** line, its §0
column reads "Claim as originally drafted", and §6 becomes "The seven edits this
audit produced, all since applied". First instance of the convention `qc-refs.md`
§8.5 proposes for audit files, and the cheap fix for the whole class.

**A staleness no report caught, running the other way.** §0 item 1e and §5 told a
reader the Diamond-Halberstam book (Cambridge Tracts 177) was lending-locked and
that the literal hypothesis block of Theorem 9.1 was the single remaining
unverified step in the corpus's most load-bearing citation.
`paper/beta2-note.md`'s status header records that the book has since been
obtained and read at line level, with page numbers: Theorem 9.1 at pp. 103-112
carrying exactly the `2·Σ 4^{ν(m)}|r_A(m)|` remainder and the
`(log y)^{1/(2κ+2)}` error this file predicted from Franze-Kao; Ω(κ)'s working
product form (5.2) at p. 44; Theorem 6.1 at pp. 67-68; **β₂ ≈ 4.266 in print at
p. 79**; α_κ ≥ β_κ+1 at p. 77. Every prediction the triangulation made was borne
out. §0 item 1e is now **CLOSED**, §5 retitled to record what the book settled,
and the source ledger's "lending-locked, NOT verified line-by-line" row
corrected. **Two documents disagreed about whether the corpus's central citation
had been verified against its primary source, and the one that said no was the
audit trail the other one names.**

### research/anchored-calm.md (new)

**Created as a status-only parent**, the first of its kind and the reason that
document kind was approved. It holds one status table over nine sub-claims that
live in five leaf notes, and no mathematics of its own. It exists because the
same status table had been written four times, in four leaf notes, at four
different states of knowledge, and no summary could copy it correctly;
`README.md` copied it under the word "Proven".

### research/certificate-engine.md (new)

**Created as the prose home of `natal-cap-28-analytic-certificate.js`**, which
had none. The object it describes gated two TODO items while its only prose
statement was a script comment. It separates the script's nine sub-claims at five
calibrations: three proven lemmas, one open conjecture, one heuristic transfer,
one refutation, three measurements and one set of predictions.

### research/natal-cap-19-calm-lemma.md

**"The Fused-Window Calm Lemma".** RETIRED as a claim name; see the retirement
entry above, which holds the deleted status block verbatim. The section is now
§"What Lemmas 1-3 do and do not give", keeping the exposition as the derivation
of the phenomenon and carrying no status verdict.

**§"The gap, precisely", item 1**, which read that leg (iii) "is not yet a
theorem" and needed "Cov_adj < 0 uniformly in q", calling that "a plausible
general proof target". REFUTED; the uniform-in-q form is false and the target it
proposed cannot be reached.

**Lemma 3** is named the **Mirror-Phase Doubling Lemma**, previously unnamed.
Leg (iv) is named the **Anchored Typicality Measurement**, its calibration inside
its name, so that "Proven: …" cannot be written of it.

### research/natal-cap-23-covadj-proof.md

**§"Consequence: corrected status of the Fused-Window Calm Lemma" and its
table.** DELETED as a superseded status state, quoted verbatim above. Replaced by
§"Where this sits", four sentences pointing at `research/anchored-calm.md` for
status and at the three successor notes for the mathematics. The file keeps what
it uniquely owns: Props 1-5, and the refutation.

**The refutation was a clause inside that status block; it is now a named boxed
statement**, §"Uniform-in-q Anticorrelation is refuted", with all six known
counterexample primes and their skeleton values. It reached no summary document
in the corpus while it was a clause.

**The title**, "Cov_adj < 0 — the anticorrelation leg of the Fused-Window Calm".
Replaced by "Cov_adj < 0 — anticorrelation proven in aggregate, refuted uniformly
in q", which states the file's two results instead of naming a retired parent.

**:123, "The brief's candidate mechanism".** REWORDED to "The candidate
mechanism, that most lags sweep the generic (p−4)/p classes", per the house rule
that working documents do not address a brief. All numbers and the negative
verdict unchanged.

### research/natal-cap-26-minus-half.md

**§"Consequence: status of the Fused-Window Calm Lemma" and its table.** DELETED
as a superseded status state, quoted verbatim above. Replaced by §"Where this
sits", which keeps the one thing that block uniquely carried, the reduction of
the open statement to G30_agg(x) < 1/2, and points at the parent for calibration.

**§"Next", items 1 and 2** (skeleton bounds by small-subset Bonferroni; an @23
exact dev pass to test stability one level up). SPENT: the skeleton collapsed to
one closed-form kernel and the ladder now runs to @29. Folded into §"Where this
sits" as pointers to `natal-cap-30` and `natal-cap-36`.

**The title**, "The Minus-Half Theorem — leg (iii) of the calm, aggregate form".
Replaced by "The Minus-Half Theorem — the exact −1/2 anticorrelation constant".
"Leg (iii)" is meaningless once the parent is retired.

### research/natal-cap-30-skeleton-bound.md

**§"Status of the Fused-Window Calm Lemma after this file" and its table**, the
most-cited of the four and the one `qc-status.md` B-2 named as the authority.
DELETED as a superseded status state, quoted verbatim above. Replaced by §"What
this file owns, and what it does not", which names the two proven objects and the
one open one and points at the parent. **Two of its numbers were also stale**:
the certificate runs to @29, **six** levels and not five, and the margins run
0.287 to 0.406 with 0.3824 at @29.

**Theorem B's certified table**, five rows ending at @23 with the prose "@23 is
new". EXTENDED to six. The @29 row is K = 7,863, G30_agg = +0.1176, margin
0.3824, dev_agg = +0.1180, R_agg = −0.382, one resonance q = 173 (0.511), from
`natal-cap-36-skeleton-door.js --at29` (18.5 min, W = 6,469,693,230), which
reproduces @23 as its control. The per-prime max|no30| column is empty at @29
because that pass computes the certificate and not the no-30 ledger; the
aggregate no30 there is +0.0004, in line with every level below.

**Prop D's exception list**, five primes. Now six, q = 173 at @29 joining it, and
the count stated as six in 10,201 scour primes over six levels. **§"Next" item 2**
(run the @29 skeleton pass) is SPENT; it is the sixth row of Theorem B.

**The title**, "The Aggregate 30-Skeleton Bound — leg (iii) of the calm, closed
at every computed level". Replaced by "— certified at every computed level, @11
through @29"; "closed" overstated a certificate at listed levels.

### research/natal-cap-36-skeleton-door.md

**§"The decay-law shortcut (refuted)", five-point statistics.** SUPERSEDED by the
six-point ones, which its own script has carried since the `--at29` pass and
which `TODO.md` already reported. The ladder is 0.2132, 0.1113, 0.1011, 0.1259,
0.0945, 0.1176 at @11 through @29; increments −0.1019, −0.0102, +0.0248, −0.0313,
+0.0231, non-monotone **twice**; mean 0.1101, spread 0.0313 (was 0.1082, 0.0314);
fits R² 0.439 / 0.261 / 0.331 against ln ln W / x / ln K (was 0.601 / 0.511 /
0.527), exponent −0.483 against ln ln W (was −0.700), residuals to ±0.27 (was
±0.25). **The refutation is strictly better supported than the note claimed**:
adding @29 makes every fit worse, the signature of a fit that was tracking one
outlier. Forced by `natal-cap-36-skeleton-door.js` lines 331-340.

**The door's statement** was unnamed prose. Now the boxed **Skeleton
Equidistribution Conjecture [OPEN]**, so the open object has a name a summary can
carry with its calibration attached, and the title names the object rather than
the campaign step ("The Named Door — opened, measured, and found not to be the
blocker").

### research/natal-cap-31-calm-vs-kill.md

**Theorem 2, "From @13 on the strike channel is provably too small to
annihilate".** SCOPE CORRECTED; see the X-limitation entry above. The extension
is now the named **Loudness Ceiling Conjecture [OPEN]**.

**Two labels.** :119's "Assumption A relocated, not removed" is named the
**X-Channel Restatement of Assumption A** and marked a restatement with measured
support, not a reduction. :107's "the Cov_adj < 0 leg cap-23, partial" becomes
"the Cov_adj < 0 aggregate result, cap-23": the aggregate result is not partial,
and "leg" names a retired parent.

### research/natal-cap-21-beyond-chebyshev.md

**Theorem 2's heading, "(the first beyond-Chebyshev unconditional ensemble
bound)".** LEVEL-STAMPED: "(the Beyond-Chebyshev Ensemble Bound, @11 — the first,
and so far the only one)". **The apparent contradiction with :141 is resolved
rather than corrected**: the two lines name different objects. Theorem 2 is the
first such bound anywhere, at @11, where capacity already settles P(S=0) = 0;
:141's next step would be the first at a level where capacity does *not*, and it
has not been run. `qc-status.md`'s report of an in-file contradiction is
withdrawn, its quotation having lost the disambiguating clause to an ellipsis.

### research/natal-cap-12-overlap-sign.md

**§"Status of 'the anchored calm' … pair component"**, which closed "the
remaining calm sightings (cap-05 variance ratios, cap-09 house splits) are about
second moments and remain open". SUPERSEDED: of the four original sightings only
the strike-variance one survives as the calm, and its mechanism is proven. The
paragraph points at `research/anchored-calm.md` instead of grading the siblings.

### research/NATAL-CAP-CAMPAIGN.md

**The `attack-04-fourier-budget.js` standing note.** KEPT and PROMOTED to a
blockquote at the head of the file, with the invalid readings named and the
corrected artifact's reversed conclusion stated; see the Door 2 entry above.

**Convergent finding 4, "THE ANCHORED CALM (new object, unexplained, four
sightings)".** SUPERSEDED. One sighting, not four: the sub-random house splits
belong to every rotation, the sub-CRT pair/triple overlaps are the dead origin
plus short-window arithmetic (cap-12), and the drift toward 0.793·E is the
anchored bias β with its own home in `paper/anchored-note.md`. What survives is
the anchored strike variance, whose mechanism is proven.

**Open lead 2, "unify the four helpful anomalies; first step is proving the
sub-CRT sign of pair overlaps".** SPENT: the unification is done and the
S₂ ≤ Σ4N/(qq′) sign conjecture is refuted at every granularity (cap-12). What
remains of the lead is the Skeleton Equidistribution Conjecture and the Anchored
Typicality Measurement.

**:31, "predicted limit e^{2γ}/4 = 0.7932".** CORRECTED to 0.79305. The true
value is 0.7930547; the fourth decimal was wrong by two units and the "="
presented it as exact.

**The attack-8 scoreboard row**, "survivors ≥ 34/110/82/1877 @11/13/17/19" and
"K*(x) = 0,0,2,10". LEVEL-STAMPED and extended: the certified twin floors run to
six levels, 34, 110, 82, 1877, 4841 and 31,327 at @11 through @29
(`paper/staircase-note.md` Theorem 8), and the K* ladder continues 27 at @23 and
69 at @29, both measured (`natal-cap-11-kstar23.js`, `natal-cap-18-at29.js`).

**The prose-note index.** ADDED, all twelve `natal-cap-NN-*.md` listed by
filename with a one-line description, closing `qc-arch.md` E4: two of them,
`natal-cap-04-packing-notes.md` and `natal-cap-32-wrap-identity.md`, were
reachable only through their `cap-NN` shorthand.

### Two errors in the campaign's own briefs, caught by the appliers

Recorded because the method is part of what a future reader needs, and because
both were caught downstream of the person who made them.

**A wrong number was nearly written into a home document.** The shepherd reported
that `maxgap-law.md`:502 quotes `two-class-lower-bounds.md` §8 for a "measured
law ~1.2 x ln² x" while "that file contains no 1.2 at all", called it a verified
true positive, and recommended writing in **c ≈ 1.90** as the current constant.
Checked against the pre-wave-2 commit by the applier: **1.2 is there**, at lines
339-341 as the table values 1.2255, 1.2594, 1.2500. And **1.90 is h₂'s constant,
not G₂'s**, line 448 pairing it with `h2(73#) = 2622`, so applying the
recommendation would have put a wrong number into the home document. The actual
defect at :502 was `~` against `≈`.

**The dead quotation rested on an unchecked grep.** The claim that the string was
absent came from a grep whose pattern was never tested against a known positive.
The standing rule that came out of it: **a grep that returns nothing is not
evidence of absence until the pattern is checked against a known positive.**

**And the general lesson, which changed how the remaining partitions were
briefed:** a shepherd handing an applier a replacement VALUE is more dangerous
than handing it a question. Partition C refused its supplied replacement text and
recomputed, finding five comb frequencies where the source said four; partition E
refused the shepherd's and re-derived. Both were right, and in both cases the
supplied answer was wrong. **Findings should carry the defect and the evidence,
not the answer.**

### Flagged, not resolved

- **Two novelty verdicts moved in this campaign**, Holt and Rudd earlier and now
  de Polignac 1849 via Dickson. Any remaining novelty claim in the
  mirror/palindrome area needs a literature check before anything leaves the
  repo. Publication-track, for Chris.
- **Door 5's claim strength** now that it cites Klein-Koukoulopoulos-Lemieux with
  no constant at s = 2 wants an expert read; the paper carries a visible note
  asking for one.
- **A presentational difference between two partitions on the X-limitation
  scope**, recorded rather than resolved because both statements are true of
  different things. The enumerated levels are @11, @13 and @17;
  `paper/anchored-note.md` states the theorem as proven at @13 and @17, those
  being the enumerated levels at or above its own "from @13" starting point,
  while `README.md`, `GLOSSARY.md`, `TODO.md` and the home note state all three.
  A reader comparing the two should read the paper's as a scope statement about
  the theorem as the paper states it, not as a disagreement about what was
  enumerated.
- **`e^{2γ}/4` is now written to two different precisions in two places**, 0.7931
  in `PRIOR-ART.md` and 0.79305 in `NATAL-CAP-CAMPAIGN.md`. Both are correct
  roundings of 0.7930547 and neither was changed to match the other.

## 2026-08-17, late: TODO 0d executed — the single-alignment recursion measured

### TODO.md

**Item 0d (M(x, x^k) under the single-alignment recursion).** LEFT the file per
the charter. The first move was run to x = 1613 (Y = 4.2e9, 253 folds); the
route to a growth law through the recursion is closed by the boundary term the
window's own growth creates, while the "different shape" premise itself was
confirmed. Forced by `research/localized-single-alignment.md` / `.js`, which is
the item's trace. Two of the artifact's five pre-registered predictions were
refuted and are recorded there (P1's ln³x constant band; P4's ≥2/3 boundary
dominance — kills are co-equal at 42% of the nats).

### research/G2-STATE.md

**§9 item 8, "nothing in the repo has tried it".** SUPERSEDED — tried and
measured; item rewritten with the measured state and the closure. Forced by
the same artifact.

### research/FOLD-PROFILE.md

**§12b, "Nothing in the repo has spent it this way" / "nothing in the repo has
tried it".** SUPERSEDED, same measurement, pointers added. The claim that the
head "carries a live recursion" is sharpened: the recursion is live and its
multiplier is exactly 1 at 94% of folds; what it does not carry is the growth,
whose majority share is the boundary term.

### research/LOCALIZED-GAP.md (no text change, one number contextualized)

**§3's "out of computational reach by four decades"** for the k = 3 gate regime
x* ≈ 2.4e4: still true for the flat-array engine used today, but the measured
cost (36 s at Y = 4.2e9) prices a segmented version at rough single-thread
days, so the regime is expensive rather than impossible. Recorded in
`localized-single-alignment.md` §8; the LOCALIZED-GAP body was left unchanged
because the merge chain dies on the Deficit Lemma regardless of the gate.

## 2026-08-17, evening and late: the six-agent wave

### research/THE-DIALS.md

**§2, "the exponent sitting at exactly 2".** RETIRED. On G₂'s twelve terms the
two frozen quadratics are the worst two of seven models tested, AIC −32.3 and
−25.8 against −41.5 for the best. The constant 0.6 is right for that model,
fitted at 0.656; the residuals reject the model. Replaced by: exponent 1.57
central, 1.3 to 1.9 practical bracket, 1 as a hard floor, exponent 2 disfavoured
but not excluded. Forced by `research/exponent-control.md`.

**§2, "drifting toward about 1.7".** RETIRED as a four-row artifact, the same
shape as TODO 0b's dead 1.43 multiplier scare. Two causes: the p′ index
convention, since the OLS slope of log p_{n+1} on log p_n is 0.8815 rather than
1, so the margins against p′² and against p² disagree in sign (−0.084 ± 0.045
against +0.154 ± 0.035); and the x = 37 outlier, whose local exponent is 4.49.
On nineteen terms of h₂ the margin against x′² is flat at 2.2, slope
+0.018 ± 0.045.

**§6, "Ziller and Morack's exponent measures 1.62 and ours measures about 2".**
RETIRED, both numbers. The 1.62 is a θ-frame slope quoted against a p-frame
threshold; the same 21 terms read 1.924 against p. "Ours measures about 2" is
superseded by 1.57. The conclusion this supported, that the object sits at or
below 2, survives and is strengthened.

### research/U-FRAME.md

**§6a, "alpha is STABLE at about 1.62, comfortably below the critical 2".**
FRAME ERROR. 1.653 is the exponent against ln W = θ(p), reproduced at 1.6526.
The same 21 terms read 1.924 against p, and the Zone Postulate's threshold p_n²
is a p-frame quantity. Frame-matched and bias-corrected the two reconcile at
1.567 in the p frame and 1.493 in the θ frame. Conclusion survives, stated
comfort was overstated. **Found independently by two agents with no contact**,
which is why the overlap in the wave was deliberate.

**§11, the A9 histogram transfer operator presented as new structure.**
DEMOTED to a rediscovery of Holt and Rudd's 2014 discrete dynamic system
(arXiv:1408.6002 §5), including the eigenstructure with binomial left and right
eigenvectors. The engine and its 42 exact diagonal points remain ours as
computation. The operator is not ours as an idea.

### research/LOCALIZED-GAP.md

**§1, "the chain reduces to a maxsum_m statement at sifting parameter u = 1".**
WRONG, and wrong in a way that flattered us. The u = 1 sieve wall never gets a
chance to be the obstruction. The telescope dies earlier on the Deficit Lemma
(maxsum_m ≥ m·m̄, by averaging) and the Traverse Bound, which caps a block at
x/(9.6 ln²x) folds for any constant including C = 1.

**§4, "condition first satisfied at x = 1453".** MISLABELLED, and I reported the
mislabelled version to Chris. `localized-03-merge-lemma.js` line 74 tests
`M_new < p − 2`, the conclusion-side condition read at the new level, which is 4×
weaker than the lemma's hypothesis M(T_x, Y) ≤ (p−2)/4 read at the old level.
The verification stands as computed. The hypothesis first holds at x = 13933 at
Y = 10⁹, verified, against 13,630 predicted. At k = 3 that is x* ≈ 2.4·10⁴ with
Y ≈ 1.4·10¹³, out of reach by four decades.

**§7, "M(x, Y) ≲ 3.3·x·ln x".** REFUTED, and it needed no measurement. The
blocks do not compose: every block requires M ≤ x/4 at its start and the claimed
total exceeds that gate by 13.2·ln x, which is 91× at x = 10³ and 274× at 10⁹.
Replaced by the measured growth law maxsum_m = m·m̄ + σ·√(2m·ln D).

**§3, the boundary caveat.** CLOSED and it was empty. Three window rules agree to
1.0000 at every x, every m ≤ 1024, at Y = 10⁷, 10⁸ and 10⁹.

**§6, "localized clears, margin x/(2.4 ln x)".** RETIRED. The per-fold index cost
of 1 is real and survives. The column that fails is the number of folds the
chain can traverse.

### research/PRIOR-ART.md

**The Maier entry, rows and columns.** SWAPPED. Rows are short intervals, columns
are arithmetic progressions, checked against Granville-Soundararajan's own text:
"the r-th row contributes A((R+r)q + lS; l, (R+r)q) − A((R+r)q; l, (R+r)q)".

**"One class is linear, two classes quadratic, two independent routes to one
number".** WITHDRAWN in full. One class is not linear, it tracks p·log p. Two
classes is not quadratic, it is 1.57. The ratio of sieve limits is 2.13 against a
measured exponent ratio of about 1.57, so the routes do not meet; the agreement
was manufactured by rounding one reading to "quadratic". What survives is the
qualitative statement that the second class costs a growing factor in the
max-gap channel. It does not transfer to other channels: in the discrepancy
channel the price is exponential in π(x).

### research/two-class-lower-bounds.md

**The G₂(41#) prediction.** WRONG THREE WAYS INSIDE ONE FILE. §6 derives
1066·c₂′ with c₂′ ∈ [0.446, 0.594]; the file then reports "530 to 640" in one
place and "about 660" in §11. Recomputed independently from the exact
primorials, the band is **476 to 633** and the 660 is outside it.

**"c flat to 7 percent".** Not true of the two-class ladder. c is 0.446 to 0.500
for x = 11 through 31 and jumps to 0.594 at x = 37, the same outlier
`exponent-control.md` isolates. Excluding x = 37 the prediction becomes 487. The
7 percent claim must be carrying the one-class terms.

### research/discrepancy-two-class.md

**§7's endorsement of "two independent routes to one number".** Withdrawn the
same day in PRIOR-ART. The separation warning §7 was defending stands; only the
phrase is retired.

### research/ZONE-POSTULATE.md

**§5, the flat window/G₂ ratio.** Recorded as a small-numbers effect rather than
a trend, with the direction-of-inequality caveat stated.

**§6 route A.** Gained a second difficulty floor, independent of TPC-hardness:
G₂(x#) ≥ g(x#) pointwise, so route A's target implies g(x#) < x′² − 2, an
explicit constant-1 Jacobsthal bound that Iwaniec gives only inexplicitly and
Erdős #687 pays $1000 to weaken.

### research/covering-dive.md

**"c·p²/log", and Ziller-Morack's "≈ p²/2".** Neither. Both small-number
artifacts; the measured form is c·x·ln²x.

**FKMPT's C(ρ) constant.** Reads c = 6 here and c = 4 in the 2026-08-17 sweep's
read of the source. FLAGGED, UNRESOLVED, nothing in the repo depends on it.

---

## Standing corrections carried forward from earlier sessions

These were recorded inline before this file existed and are summarised here so
the working documents can be read clean. The full statements are in
`research/history/SESSION-2026-08-17.md` §4, `research/history/CHRONICLE.md`'s
refutation ledger, and `research/history/NIGHT-LEDGER-2026-08-14-15.md`.

- **2026-08-17 morning:** two detrending bugs that manufactured z up to 69.6 and
  26.1; a cofactor primality table reaching only √W, misreporting the semiprime
  share as 3.9% instead of 66.6%; an algebraic identity presented as an agreement
  between measurements; a wrong mechanism for the tail deficit.
- **2026-08-16:** step 4 of the §5a ladder FALSIFIED; the ZONE-POSTULATE
  "fourteen orders of magnitude" headroom was a mis-normalisation, real advantage
  about 7× polylog; the corridor constant was 4.95 not 3.301; `killrun.js`
  overcounted L, found independently five times.
- **2026-08-14/15:** the attack-10 divergence claim; the sub-Poisson "≈0.2
  constant"; the d ↦ G_d v₂ pattern as a level-19 coincidence; attack-04's
  Fourier certificate CRT index; the mirror strike-invariance claim; the
  universal packing cap; the "parity floor 4" briefing error.

---

## 2026-08-17, late: contradictions found by the consolidation pass, now resolved

`research/G2-STATE.md` was written to assemble the object and found five
disagreements between files written the same day. Four are resolved and recorded
here; the two that are genuine modelling questions stayed in that file's §6.

**The G2(41#) prediction, wrong three ways inside one file.** RESOLVED.
`two-class-lower-bounds.md` §6 derives 1066·c₂′ with c₂′ ∈ [0.446, 0.594], then
reported "530 to 640" in one place and "about 660" in §11. Recomputed from the
exact primorials the band is 476 to 633, and 660 is outside it. Corrected in that
file.

**"Two independent routes to one number", withdrawn in one file and endorsed in
another.** RESOLVED. `PRIOR-ART.md` withdrew it; `discrepancy-two-class.md` §7
presupposed it still held in the max-gap channel. The withdrawal wins. §7's
separation warning stands on its own.

**THE-DIALS §6 carrying pre-correction exponents.** RESOLVED. §6 sat outside §2's
correction block and repeated both the θ-frame 1.62 and "ours measures about 2".
Both retired; §6 now states 1.57 and 1.567 in matched frames.

**The superseded-numbers table.** Every entry below has since been fixed in the
document named, as part of the 2026-08-17 separation of body from changelog.

| number | was in | replaced by |
|---|---|---|
| "exponent exactly 2", constant 0.6 | THE-DIALS §2 | 1.57 central, 1.3 to 1.9, floor 1 |
| "1.62, comfortably below the critical 2" | U-FRAME §6a, THE-DIALS §6 | a θ-frame slope against an x-frame threshold; 1.924 in the x frame, 1.567 corrected |
| "condition first satisfied at x = 1453" | LOCALIZED-GAP §4 | the conclusion-side condition; the hypothesis first holds at x = 13933 |
| "M ≲ 3.3·x·ln x by composing blocks" | LOCALIZED-GAP §7 | REFUTED, exceeds its own gate by 13.2·ln x |
| "localized route clears, margin x/(2.4 ln x)" | LOCALIZED-GAP §6 | the per-fold cost of 1 is real; the fold count is what fails |
| "two independent routes to one number" | PRIOR-ART | withdrawn, β₂/β₁ = 2.13 against a measured 1.57 |
| "the chain reduces to a maxsum statement at u = 1" | LOCALIZED-GAP §1 | the u = 1 wall never gets a chance to be the obstruction |
| "the origin's advantage is fourteen orders of magnitude" | ZONE-POSTULATE §5 | window/F is capped at x′ and saturated; the real advantage is G2/F ≈ 7 |

---

## Index by document

Look here for the history of a claim in a given file. Undated entries predate the
night of 2026-08-17; **night** points at *2026-08-17, night: the consistency
campaign*, which is the newest section and covers 38 documents.

| document | entries |
|---|---|
| README.md | night: proven-list corrected, Zone Equivalence removed, beyond-Chebyshev singular, X-limitation scope, "matching lower bound" retired, β positivity one-way, Map and first read |
| TODO.md | night: 000b closed by inspection, G2(41#) repriced to item 1b, item 6 gate disambiguated, 0b range, 0c repointed, item 4 renamed |
| research/README.md | night: repurposed from summary to router, proven spine moved out, attack-4 bullet dropped |
| GLOSSARY.md | night: Lemma V superseded, hyperuniformity split, Unification Law calibrated, skeleton split in three, calm/fused repointed, header scope |
| THE-DIALS.md | §2 exponent and drift, §6 pre-correction exponents; night: dial 7 split verdict, §3 dial-2 bracket, §6 loose end closed |
| U-FRAME.md | §6a frame error, §11 A9 demoted to Holt and Rudd 2014; night: §§10-15 restructured by claim, aim at κ(m) not L, ρ trend refuted, nine integers, 0.58-0.95 ln p, G2(41#) repriced |
| LOCALIZED-GAP.md | §1 obstruction misplaced, §3 boundary caveat, §4 mislabelled condition, §6 index budget, §7 refuted projection; night: §4 gate feedback map named |
| PRIOR-ART.md | Maier rows/columns swapped, "two independent routes" withdrawn; night: Fan-Pomerance formula, 0.7935 retired, Erdős #687/#970, Holt and Rudd, Smith 1857 confirmed primary, mirror novelty narrowed |
| ZONE-POSTULATE.md | §5 window/G2 flatness, §5 headroom mis-normalisation, §6 route A second floor; night: Lemma V qualifier, loose end closed, triage rule repointed, status block added |
| two-class-lower-bounds.md | G2(41#) prediction band, "c flat to 7 percent"; night: FKMPT C(1/2) retracted value, §9 loose end closed, §10 repurposed, §8 verdict scoped |
| discrepancy-two-class.md | §7 endorsement of a withdrawn claim |
| covering-dive.md | "c·p²/log", FKMPT C(ρ) constant unresolved; night: FKMPT constant settled at 6 with the published corrigendum, v3 date retired, Kanold bibliography, c ≈ 1.90 scoped |
| G2-STATE.md | §6 split, four contradictions resolved here; night: Origin Excess hypothesis restored, hypothesis count retired, loose end closed, G2(41#) repriced, dead quotation, §8 table split |
| maier-matrix.md | night: §4 decomposed into four objects, §4a canonical enumeration, GS Cor. 1.4 withdrawal recorded, §10 briefing section migrated |
| origin-excess.md | night: §6 retitled, third-hypothesis claim retired, §9 corrections migrated, Scale Collision Proposition moved into §6c |
| ATTACKS3.md | night: five verdicts repointed, A8 verdict reversed in wording, additive chain marked refuted |
| gate-multiplies.md | night: dead §7 quotation, ρ statistic and trend, TODO 0b premise migrated, §10 deleted |
| THE-LENS.md | night: §4 u-frame row split, §3 date stamp |
| FOLD-PROFILE.md | §12a; night: §8 created (Natal Dispersion Lemma, lineage identity), 99.93 vs 99.94, Head Monotonicity Lemma named, script enumeration |
| maxgap-law.md | night: Maier-Pomerance block two legs wrong, Ford's slides located, §10 debts paid, brief framing retired |
| theta-ladder.md | night: brief framing migrated, dead quotation, conditional caveat at every point of use, 2.649 coincidence named |
| sift-limit-attack.md | night: named the Lemma V authority, corrigendum, §3 discard row understated our own result |
| dhr-verification.md | night: kept in body under APPLIED/OUTSTANDING, Diamond-Halberstam verified, §0 item 1e closed |
| anchored-calm.md | night: created, status-only parent |
| certificate-engine.md | night: created, prose home of natal-cap-28 |
| natal-cap-19-calm-lemma.md | night: Fused-Window Calm Lemma name retired, uniform-in-q refuted, Lemma 3 and leg (iv) named |
| natal-cap-23-covadj-proof.md | night: status table deleted (verbatim here), refutation boxed, title |
| natal-cap-26-minus-half.md | night: status table deleted (verbatim here), §Next spent, title |
| natal-cap-30-skeleton-bound.md | night: status table deleted (verbatim here), Theorem B extended to six rows, Prop D six exceptions, title |
| natal-cap-36-skeleton-door.md | night: six-point statistics, Skeleton Equidistribution Conjecture named, title |
| natal-cap-31-calm-vs-kill.md | night: X-limitation scope, Loudness Ceiling Conjecture, two labels |
| natal-cap-21-beyond-chebyshev.md | night: Theorem 2 level-stamped, apparent contradiction resolved |
| natal-cap-12-overlap-sign.md | night: sibling sightings superseded |
| NATAL-CAP-CAMPAIGN.md | night: attack-04 note promoted, four sightings to one, 0.79305, scoreboard level-stamped, prose-note index |
| paper/moire-primes.md | night: Door 2 retracted, Door 5 covering theorems, five-doors framing, Face 4 Lemma V, six dropped hypotheses, attributions |
| paper/anchored-note.md | night: six-level ladder, "deepest also lowest" false, X-limitation scope, §7 converse, Prop 1 part (i) |
| paper/staircase-note.md | night: Fan-Pomerance formula, six finite computations, Staircase Theorem names Theorem 3 |
| paper/beta2-note.md | night: FGKMT to FKMPT, corrigendum |
| paper/PAPERS.md | night: Paper II title, "contested" dropped, matching lower bound, Zone Equivalence, twelve OEIS terms, Lemma V positioning |

---

## 2026-08-17, late: the theta ladder

### research/ZONE-POSTULATE.md

**§5, the "second sighting worth watching".** RESOLVED against us. The paired
observation was that window/G₂ and the all-positions exponent θ both sat near 2.
`research/theta-ladder.md` settles θ by exact suprema over complete periods
instead of by fitting: θ is above 2 and rising, and the requirement exceeds the
zone budget from z = 29 onward. Branch A, that θ turns over below 2, is REFUTED
over the measured range. Branch "settles at 2" is not observed; θ → 2 loses by
A·ln²z, a factor of 3.6 at z = 47.

**§5, the 2026-08-16 headroom correction.** Absorbed into the body. The block
recorded that "274 and 2.7e14" were window/(F − x) rather than the postulate's
headroom, that window/F is capped at x′ and saturated, and that the genuine
origin advantage is G₂/F ≈ 7. The body now states the corrected version directly.

### TODO.md item 0

**Repriced.** The exponent road is an exponent-improvement programme, not a road
to TPC. Two things sharpen the price: θ = 2.48 at z = 47 leaves only 0.17 below
the full-decoupling target 1+√e = 2.649, closing at 0.57 per unit ln z, so even
"first below 2.649" has a short runway; and at θ ≈ 2.5 the ratio s/u = 1.2 sits
outside the range Lemma V is stated in (s ≤ u). So item 0's parts (a) and (b) are
not independent halves. **(b), the Gaussian maximal law, is the whole price.**

**Cost estimates corrected:** z = 59 is about 5 hours, not 1 to 2; z = 71 is
36 hours, not "several".

---

## 2026-08-17, late: the gate-multiplies and h2-scoping agents

### TODO.md item 0b, and research/U-FRAME.md §3

**The u-frame's central inequality was wrong by a factor of ln u.** The route was
stated as ln c ≲ 2·ln²u/u sufficing for G₂(u) < u². It does not. Telescoping
needs Σ_{p≤u} ln c(p) < 2 ln u, and Mertens gives Σ ln p/p ~ ln u, so the ln²
form sums to about ln²u. VERIFIED in the parent session: the stated rate
certifies a bound exceeding u² by 24× at u = 37, 3.9e3 at u = 100 and 5.9e12 at
u = 1000. **The sharp requirement is ln c(p) ≤ 2·ln p/p**, which fits (11.2
against a budget of 13.8 at u = 1000). The true multiplier (θ(p′)/θ(p))² sits
exactly at that rate, so there is zero asymptotic headroom.

**0b's "RESOLVED 2026-08-16" note is withdrawn.** The Ziller-Morack headroom
fractions of 0.16 to 0.45 were measured against the wrong denominator. Against
2·ln p/p they read 0.61 to 1.39, mean 1.06, which is spending the full budget
rather than a fifth of it.

**0b's win condition is withdrawn.** "A proof that c decays at any rate" is
worthless; it must decay at exactly the rate the truth runs at.

### research/U-FRAME.md §11 and research/a3-09-histogram-operator.md

**The Mertens limit for m̄/ln²p was stated as 1.20.** Wrong by a factor of 2, from
double-counting the p = 2 factor: it is e^{2γ}/(2C₂) = **2.4026**, not
e^{2γ}/(4C₂) = 1.2013. Exact W/D gives 2.4195 at x = 1009, 2.4086 at x = 10007,
2.4035 at x = 200003, verified independently in the parent session. The measured
values in A9 were always right; what was wrong was the target they were said to
be drifting toward. **The sequence has already converged and there is no drift
left to exploit.**

### research/LOCALIZED-GAP.md §4

**"The gate multiplies" was stated too broadly.** It should read: wherever the
index accumulates against a fixed base. The no-fixed-point argument closes the
merge chain and A4's tile chain, and does not reach the u-frame recursion at all.

### research/exponent-control.md §8

**The recommendation to extend h₂ past 21 terms is WITHDRAWN**, on two grounds
measured in `research/h2-scoping.md`. It is infeasible: term 22 costs about
3.4 months on this hardware, term 25 about 85 years. And it would not help, since
sliding-window sd is already 0.057 at 19 terms against a 0.5 question, so
precision was never the constraint. The constraint is bias, and bias gets *worse*
with terms: on nested control prefixes the wrong model's AIC lead grows
monotonically from a tie at 10 terms to −47.0 at 56.

---

## 2026-08-17, late: the origin-excess agent

### research/maier-matrix.md §4

**The Origin Excess Lemma's advantage was stated as "of order (ln x / ln y)²"
without bounds.** That factor is capped by an absolute constant of about 2.2,
measured maximum 1.372, because the lemma carries two hypotheses that were left
unstated: it is silent unless y′² > x, since D_x(S) = 0 for S ≤ x and it reads
0 = 0, and its bound is trivial unless x < x* with ln x*/ln y ≈ 1.44, flat at
nine levels. The advantage is real and small.

**The scale collision needs no matrix.** It was derived through the matrix
classification; it is one line: y < x implies y′ ≤ x < x′ implies y′² < x′².

**"The advantage is gone at S = x′²" understates it.** It reverses. The trough
reaches 0.9343 at 3.5·y′², and per prime the loss runs 5% of fair share below
threshold, 125% at v = 8, and back to 100% at v = 100, scale-free at 150 cells
per bin. At S = x′² the class a_q = 0 is the *worst* of the q classes at the
smallest prime, rank 17 of 17 at y = 13, x = 23.

---

## 2026-08-17, late: the maxgap-law agent

### research/FOLD-PROFILE.md §12a

**"Localized: M(x, x′²) ~ 1.2·x·ln x, margin ~ x/(1.2 ln x)".** REFUTED, and it
errs in the safe direction. Direct computation to x = 4001 gives
M(x, x′²)/ln³x = 2.14, 3.85, 4.39, 3.44, 3.33 at x = 101, 499, 1009, 2003, 4001,
flat with no trend, against a projection that is high by 2.7× at x = 101 and
20.9× at x = 4001, with the error growing like x/ln²x. Verified independently in
the parent session. **The correct margin is x²/(3.5·ln³x), which is far larger
than the x/(1.2 ln x) claimed.** Chris's localization payoff is bigger than the
repo recorded, not smaller. `LOCALIZED-GAP.md` §5 was right and this section
contradicted it.

**"M ≈ 12.2·ln Y".** Narrowed to a reading at T₂₃. The coefficient is c(x)·m̄(x)
and c drifts along the diagonal, so 12.2 does not transfer between levels.

### The c constant, across research/localized-04-maxsum.md and research/two-class-lower-bounds.md

**The apparent conflict was two separate errors.** One is a units mismatch: one
file quoted a range and the other a coefficient of variation. Converted to the
same units both read about ±22.5%, so neither was tighter than the other and the
"7 percent against 23 percent" disagreement recorded earlier was not real.

**The second is substantive: c is not a constant, it is a surface c(x, ln D).**
Inside the exact x = 29 twin tile, holding x fixed so only ln D moves, c falls
monotonically 1.083 → 0.446 as ln D runs 2.1 → 19.2, terminating exactly on
G₂(29#) = 258. At matched ln D = 11.09 the same statistic gives c = 0.577, 0.587,
0.745, 0.857, 0.951, 0.989 at x = 23, 29, 97, 401, 1601, 6421. **The two readings
are the same surface at x ≈ 10³ against x ≈ 20.** Quote c only with the (x, ln D)
it was measured at.

**The diagonal flatness is a cancellation, not a law.** Off the diagonal more
ln D means more positions at fixed π(x); on the diagonal ln D = θ(x), so the
resource grows in lockstep. Feeding the off-diagonal exponents along the diagonal
leg p = 101 → 271 predicts a 32% fall in c; the exact terms deliver a 2.5% rise.

---

## 2026-08-17, late: the consistency audit

### research/PRIOR-ART.md

**The Maier matrix entry mapped our objects to the wrong axes, twice.** It first
said rows are arithmetic progressions and columns short intervals, which is
backwards against Granville-Soundararajan's own text. The first fix corrected the
axes but dropped the mapping of our objects onto them. Both are now stated: rows
are short intervals, columns are arithmetic progressions, so the Copying Theorem
is the **column** sum and our window statistics are the **row** sum.

### The known-wrong table used to brief the audit

Two entries in that table were themselves imprecise and are corrected here.

**"c flat to 7 percent, both readings ±22.5% once matched".** The two figures
were computed by different statistics: one is half-range over midpoint, the other
half of (max/min − 1). Matched properly they read 22.8% against 18.4% by the
first convention, or 29.5% against 22.5% by the second. Both are near ±20% and
one is wider by about a quarter. The conclusion that there was no real
disagreement stands; the exact equality does not.

**The G2(41#) headline.** Three numbers were in circulation and all three are
defensible readings of the same derivation. Canonical form from here:
**band 476 to 633, central 513** (full-sample mean c₂′ = 0.4814), with **487
against 633** as the discriminating test of whether x = 37 is an outlier or a
level shift. Quote the band and the test, not a bare central value.

### The exponent: 1.57 is h2's number, 1.54 is G2's

The audit brief quoted **1.57** as "the measured G2 exponent". That is the
control-corrected figure for **h2**, Ziller and Morack's adversarial paired
Jacobsthal. G2's own control-corrected figure is **1.54 ± 0.09**
(`research/exponent-control.md` §5, which states "quote 1.57 for h2 and 1.54 for
G2"). Both sit inside the 1.3 to 1.9 bracket, but a document quoting 1.57 for G2
is quoting the dominating sequence rather than ours.

### A near-miss worth recording, so nobody "corrects" it into a falsehood

`paper/anchored-note.md` §9 says no published lower bound of any exponent exists
for a two-classes-per-prime sifted set. That is about the sifted **count**, not
the gap, and today's G2 >= g result does not touch it. It reads like the retired
claim and is not one. Disambiguated in place.

### The ln-u overshoot: two computations were in circulation

The audit brief quoted the bad rate as certifying a bound exceeding u² by 24x at
u = 37, 3.9e3 at u = 100 and 5.9e12 at u = 1000. `research/gate-multiplies.md`
§7's pasted output gives **4.64, 1.49e2, 1.59e10**. Both are right for what they
compute: the brief's figure used exp(Σ 2 ln²p/p) from p = 2, and the repo's uses
∏(1 + 2 ln²p/p) over p > 5, which is the conservative reading and the one with
output on the page. **The repo's numbers are canonical.** The conclusion is
identical either way: the ln² rate busts the budget and the gap grows without
bound.

### research/PRIOR-ART.md, the candidate-novelty list

The list still claimed "its empirical ≈0.8·p·ln²p growth" and "its verified
sub-Poisson constant ≈0.2" as surviving novelties. Both are retired: the growth
is a measured exponent of 1.54 ± 0.09 for G2 and 1.57 ± 0.06 for h2, and Var/E
drifts rather than sitting at a constant. An inline NOTE block recording the
second refutation has moved here.

### research/covering-dive.md, and two files that inherited it

**The FKMPT constant is 4, not 6.** RESOLVED from the source: arXiv:1802.07604v3
Theorem 1 states C(ρ) > e^{−1−4/ρ}, with the 4 appearing twice. The 6 came from
an older arXiv version that ar5iv still renders. The PDF text is the authority.

**"Long gaps in sieved sets" was misattributed to FGKMT in eight places.** It is
Ford, **Konyagin**, Maynard, **Pomerance**, Tao. No Green. The file's own source
index already said FKMPT, so the body contradicted its own bibliography. Same fix
in `natal-cap-10-sieve-cap.md` and `sift-limit-attack.md`.

### research/oeis-G2-submission.md

**The draft asserted a(n) < 0.31·prime(n+1)², which is false.** 528/41² = 0.3141.
Verified in the parent session: that is the only term exceeding 0.31, and 0.32
holds across all twelve. This was in a draft headed for OEIS.

### research/FOLD-PROFILE.md §5

**"ρ(u) decreases to 1 from above" is wrong.** It crosses 1 at u = e^γ = 1.781
and undershoots to ρ(2) = e^{2γ}/4 = 0.79305 before returning from below. That is
the same reversal recorded for the origin's advantage in
`research/origin-excess.md`, and the section's own measured 0.931 band is exactly
it, against a prediction of 0.91.

### research/G2-STATE.md

**§4e said the origin's advantage "expires" at the zone width.** It does not
expire, it **reverses**: origin/mean tends to e^{2γ}/4 = 0.79305, a 21 percent
deficit at exactly the width the programme asks for. A document summarising a
refutation was understating it.

**§7 was a placeholder for a file that was already finished.** Replaced with the
theta ladder's verdict.

**The document went stale within an hour of being written.** Five of the results
it consolidates landed after it, and it asserted two things they refute. It is a
consolidation note with no engine behind it, so it goes stale by default and
needs a pass every time a source file lands. Treat that as a standing property
of the file, not a one-off.

### research/gate-multiplies.md

**"Zero asymptotic headroom" rested on the retired exponent 2.** The truth spends
exactly α/2 of the sharp budget, so at the calibrated 1.57 there is about 22
percent headroom rather than none. The verdict now rests on the model-free
reading, ln c against 2 ln p/p at mean 1.06 over Ziller-Morack's 21 terms with no
downward trend, which needs no exponent fit. `U-FRAME.md` §3 was right and
gate-multiplies was wrong.

Its own §10 correction list had two internal errors: item 1 gave ln x/4 against
§1's ln x/2, and item 5 carried a crossover of x = 45 against a computed 37.

### Two more corrections to the audit brief's known-wrong table

**"M/ln³x is flat at about 3.5" needs its k.** The constant is k-dependent:
3.2 to 3.7 at k = 2, while `LOCALIZED-GAP.md` §5 measures M/(k ln³x) at 1.2 to
1.6 on a k = 3 ladder, which is 3.6 to 4.8 at k = 3. The law is c·m̄·(k ln x − ln m̄)
and dividing by k ln³x is not constant across k. The two agree in shape and not
in the number, so quoting 3.5 without k invites a contradiction that is not there.

**"1.57 against about 1.2 are different objects" is itself a category error.**
The CRT identity makes the greedy certificate ladder a proxy for the same object,
not a different one. A residual of about 0.25 does survive after pricing both
biases, so the disagreement is real, and it is about a third smaller than the
"different objects" framing implied. `G2-STATE.md` §6.1's ruling is corrected
accordingly.

### research/level-ledger-tight.md, the deep run

**The constant improves from 53.9 to 81.04.** R*(19) = 53.972817 completed as an
exact maximum over all 1,658,880 dilation classes (2717 s), giving
|h(a) − D/p| ≤ 53.972817·3^{π(x)−8} + ½ for x ≥ 19, against the published
2·3^{π(x)−1}. Verified in the parent session: 4374/53.972817 = 81.04.

**A self-correction the agent made and flagged.** At y = 17 the ladder appeared
to hit the √3 target exactly: seven-fold geometric mean 1.73226 against
√3 = 1.73205, and R*(17) = 27.0194 against 3³ = 27. R*(19) broke it. The step is
1.9976, close to 2 rather than to √3, and 3^{3.5} = 46.77 is 15 percent below the
measured 53.97. R* is a maximum over a growing pattern count, so it carries an
extreme-value factor that √3 does not, and the apparent exact hit at y = 17 was a
coincidence. It is labelled as one.

---

## 2026-08-17: the publication moratorium is now structurally enforced

Chris made the no-push rule hard rather than remembered. Three independent
layers, because each one alone is defeatable.

**1. The push URL is disabled.** `git remote set-url --push origin
DISABLED_BY_PUBLICATION_MORATORIUM`. Fetch still works; a plain `git push`
cannot resolve a target.

**2. A pre-push hook rejects every push**, tracked at `.githooks/pre-push` with
`core.hooksPath = .githooks`. Being tracked, it survives a clone and a reset.
Verified: it fires even when the disabled push URL is bypassed by naming the
remote URL explicitly on the command line.

**3. Harness-level deny rules** in `.claude/settings.json`, project-scoped so
they travel with the repo and do not affect other projects. They block
`git push`, `git remote set-url`, `git remote add`, `gh pr create`,
`gh repo create`, `gh repo sync`, `gh release` and `gh gist`.

**The honest gap.** `git push --no-verify` skips pre-push hooks by design, so
layers 1 and 2 together are defeatable by a deliberate operator who also names
the remote URL explicitly. Layer 3 is what closes that for agents and sessions.
Chris himself can still push deliberately, which is correct: he owns the
decision, and lifting the moratorium should take a deliberate act rather than a
slip.

**To lift it**, both of these are required, and needing two is the point:

    git config --unset core.hooksPath
    git remote set-url --push origin git@github.com:Benjaminsen/primeoire.git

Attestation remains OTS-only, hash-based, zero content disclosure.

---

## 2026-08-17: the numbers verifier, and the audit closes

The read-only verifier recomputed the corpus arithmetic from scratch: 39 checks,
37 pass, the two failures being the discrepancies below, asserted deliberately.
Headline: **the whole G2 ladder verifies by an independent method** (exact CRT
lift with longest-compatible-suffix scan, 123 s for 37# against the original 54
minutes), the Zone Postulate census is confirmed as a 1e11 run, and every number
appearing in three or more files that is recomputable came back to the last
digit.

### The "x = 37 outlier with local exponent 4.49" welded two facts together

In `exponent-control.md` and `two-class-lower-bounds.md`, repeated twice in the
session log. **4.487 is the 29 to 31 step.** The 31 to 37 step reads 2.356, below
the ladder mean, so x = 37 is not a local-exponent outlier under any endpoint
convention. It IS a c2' outlier, 0.594 against a 0.446 to 0.500 band, which is
the separately stated and correct fact. Both files now say exactly that.

### Small quantitative fixes

- U-FRAME quoted the prediction band low as 475 (floor) where the source rounds
  to 476; and labelled the Ziller-Morack margin column "against p_n^2" when the
  numbers are (p_n^2 - p_n)/a(n).
- "About 487" is 488: the median c2' over x = 11..31 is 0.45766, not 0.457.
- gate-multiplies §10 was a body-resident corrections block still reciting the
  retired 1.2013; all its items had landed, so it is now a pointer here.
- An overzealous find-replace in the parent session briefly corrupted 0.4873 to
  0.4883 in maxgap-law.md; caught by diff review and reverted in the same pass.

### Errors in the audit briefs themselves, final tally six

The two new ones: the brief said 37# is 7.86e15 (it is 7.42e12; the repo had it
right), and e^{2gamma} = 3.17221 (it is 3.17222).

### Left unverified, stated honestly

beta_2 (external, Booker-Browning); h(31#) and h(37#) beyond the sieve range;
h2/A288815 (a harder search, though h <= G2 <= h2 holds at all twelve terms and
the 6*A072753+6 identity holds from n = 2); pi(1e11) to the unit; the exact
theta suprema; all MEASURED fit constants.

---

## 2026-08-17: three cross-file contradictions reconciled

### research/PRIOR-ART.md

**"It is a comparison worth making and nobody has made it"** (whether Holt's
max abs DeltaPhi growth and our level laws are the same object). SUPERSEDED the
same day it was written: `discrepancy-two-class.md` §5 made the comparison and
settled it (one object, three norms; his column is the sup of the k = 1 case),
and `level-ledger-tight.md` Theorem 1 upgraded the identification from measured
to proven. The paragraph now records the settlement and points at both files.

### research/discrepancy-two-class.md

**§9 "Loose end worth one hour"** ("if the natal ledger deviation is another
sup of a k = 2 discrepancy ... Not tested here"). SETTLED by
`level-ledger-tight.md` Theorem 1: it is one, exactly, so the base is sqrt(3),
not 2 — and the "nearer 2" reading was separately refuted there (§1, correction
2: the series moves p with x). §9 now records the settlement.

### research/U-FRAME.md §7 and TODO.md (parked)

**"G2(41#) ... about 12 hours with the current lattice counter."** RETIRED as
ungrounded: it entered with the first draft of U-FRAME and no timing artifact
behind it, and 12 h is about 13x the measured 37# run, which no scaling of the
counter produces. The grounded figure is G2-STATE §9.6's: the 37# walk took 54
minutes over its full 7.42e12-position period (`oeis-G2-submission.md`,
`verify-ladder-big.js` output block), the walk is linear in width, and 41# is
41x wider, so about 37 hours, "about 40x". U-FRAME now carries that figure with
the derivation; TODO's "13x vs 40x — reconcile before budgeting" flag is
resolved. (In passing, U-FRAME's two remaining "475"s — §4 and §7 — were
brought to the audited 476; the numbers verifier had adjudicated that floor-vs-
round slip but fixed only one of the three occurrences.)

### research/ZONE-POSTULATE.md §"The guard now has a constant" (2026-08-18)

**"max A = (0.49 +/- 0.09)*ln^3 v per decade, flat over nine decades, band
0.321 to 0.571 with no trend."** The flatness is RETRACTED. Kourbatov, J.
Integer Seq. 16 (2013) 13.5.2 = arXiv:1301.2242, Table 1 gives four published
slopes for exactly this object -- 0.4576, 0.4756, 0.5203, 0.5628 below 10^6,
10^9, 10^12, 10^15 -- which sit inside our band and centre on our value, so the
measurement replicates. They also rise monotonically over the decades we called
flat, and he writes directly under the table: "record gaps between k-tuples
farther from zero have a steeper trendline ... This is not a
'one-slope-fits-all' situation!"

Three aggravating facts, recorded because the failure is procedural rather than
arithmetic. The sequence (A113274) was already listed in `PRIOR-ART.md`:161
from the 2026-08-17 OEIS sweep. The law itself, `0.76 log^3 p`, was already in
`two-class-lower-bounds.md`:103 with the arXiv id. And the retracted number
carried its own custody note saying it was not reproducible from this
repository -- its scripts live in the attack's scratch directory. An
unreproducible in-house re-measurement was asserted over a published result the
repo cited twice.

The guard is STRONGER after the retraction, not weaker: it now rests on
Kourbatov's `0.76 ln^3 p` against a window of `p^2`. What survives from the
anchored attack is the normalisation only -- `gap/ln^2 a` climbs 3.6 to 13.0
over the range, so ln^3 is the exponent that holds still, agreeing with him.
`PRIOR-ART.md` gains a named Kourbatov entry; the A113274 pointer had been
sitting passively in a list of "existing relevant entries stay".

### research/PRIOR-ART.md:154 and paper/moire-primes.md (2026-08-18)

**"Grob and Schmitt, arXiv:1905.03117 and arXiv:2107.06950"** -- a joint
attribution applied to both papers. Only the 2019 paper is joint.
arXiv:2107.06950 (2021) is by **George F. Grob alone**: the arXiv author line,
the arXiv API record and the PDF title-page byline all name one author, and
Schmitt appears inside the paper only in "this author and M. Schmitt",
describing the earlier work. Fixed at all three sites (PRIOR-ART.md,
moire-primes.md prose, moire-primes.md bibliography).

Recorded with it, because it is the kind of thing that makes a re-check come
back empty: the string "Part 2" is printed on that PDF's title page but is NOT
in arXiv's metadata title, which reads "Cycles and Patterns in the Sieve of
Eratosthenes, Potential Twin Primes". Searching the printed title can miss the
paper. Neither paper has a journal version; the only DOIs are the auto-assigned
arXiv DataCite ones, which are not evidence of publication.

### The PDF verification pass, 2026-08-18 (seven sources, five reports)

Every literature quotation this corpus calls "verbatim" had entered from a web
page, an ar5iv HTML rendering, an abstract, or a third paper restating a
second. `research/lit-provenance.js` counted 50 attributed quotations, 17
claiming verbatim, 11 with no record of what was read. One agent per PDF was
sent to close that. What the PDFs changed:

**Nothing was fabricated.** Every quotation attributed to Holt, to Kourbatov,
to FKMPT, to Kalmynin-Konyagin and to Banks-Ford-Tao is verbatim against the
source of record. The defects are all in NUMBERING, ELISION and GLOSS.

**`two-class-lower-bounds.md` §2a "their §1.3"** -- no such section exists in
any version of FKMPT. It is §1.1, p. 673 of JEMS 23 (p. 7 of the arXiv PDF).
Found independently by two agents.

**The same section's gloss "specific to `I_p = {0}`" overreached.** The quoted
passage is elided at the front, and the elided opening puts the obstruction at
`ρ < 1`, primes with `|I_p|` vanishing -- the other axis, not `|I_p| = 2`. Our
reading is licensed by their NEXT sentence, which we do not quote.

**The Definition 1 block silently dropped a clause and repaired a typo** ("if
the density of primes with |I_p| >= 1 equals rho, that is,"; "sieving system
system"). Neither changes the meaning; a block labelled verbatim may not do
either silently. It also shows 2 of 4 bullets and the omitted (B-Boundedness)
is what licenses B = 2.

**Two "ABSENT" rows REFUTED.** Kalmynin-Konyagin, Izv. Math. 88:2 (2024)
225-235, publish a multi-class Erdos-Rankin construction and run the
dimension-2 Mertens ledger. `covering-dive.md` §4.2 had recorded this on the
17th and handed the fix back by name; it sat unapplied while four other places
kept claiming absence. `PRIOR-ART.md` had no row for the paper and now does.
What survives is narrow: their `j_f` shifts the VALUE, G2's covering
formulation shifts the ARGUMENT, and the two families of 2-element sets differ.

**The Banks-Ford-Tao demotion does not stand.** Their model R is ONE class per
prime ((1.9)-(1.10), p. 5). Our rotation ensemble is the twin subset, which is
their §1.7 Open Problem (3) -- posed as OPEN, and which they say "likely will
involve a different extremal sieve problem". Citing them against our bounds
inverts what they wrote.

**The Exact Invariance demotion stands only in half.** Holt-Rudd Lemma 3.1 and
Corollary 3.2 carry no sub-interval content and Holt disclaims localization in
the 1402.1970 abstract. The census half is his; the band half is not.

**Holt's open-problem list is in arXiv:2603.25915 §4.1-4.2 (2026, Holt alone),
not 1408.6002**, whose §1.1 list has six items and none localized.
`U-FRAME.md`:773's "(Holt and Rudd 2014, §6a)" cited a section that does not
exist in their paper: the operator is their §5, pp. 17-19, and the "§6a" was
U-FRAME's own all along.

**`covering-dive.md` §4.2 refused a correction on a false ground.** It called
"errors in the exponents of H on pages 685-686" the publisher's blurb. It is
the published corrigendum's body text, JEMS 25 (2023) 2483-2485, p. 2483, and
the authors' own -- as is v4's Appendix A wording. Both are authorial; they
describe the same defect differently. The disk wording stands, the reason
given for keeping it does not.

**Kourbatov: today's retraction was JUSTIFIED**, all four items verbatim
against the JIS article. Two errors in how I wrote it up are corrected:
`0.76 = 1/(2C2)` is OUR inference and he never writes it (and "C2" is 0.6601618
in our notation, 0.75739 in his, so it is true only read in ours); and the
Fischer credit attaches the 2008 *Maximale Lucken* preprint, his [5], to the
non-linear-formula sentence, which cites his [6], the 2006 *Maximale
Intervalle*. Wolf's "G2(x) in terms of pi2(x)" is a personal communication, not
a document. The "one-slope-fits-all" sentence was rewritten twice and only v3
and JIS read as we quote it.

### The books partition, 2026-08-18 (four defects, one asset nobody was using)

The partition sent after Halberstam-Richert and DHR was expected to come back
mostly UNREACHABLE. Two of its three targets turned out not to be book quotes
at all.

**`dhr-verification.md`:181 Condition (B) is Marasingha, arXiv:math/0607494
Theorem 3.1**, not a book. LaTeX source pulled; kappa, A_1, the -1, the <= and
the 2 <= z_1 < z all correct. VERBATIM.

**`dhr-verification.md`:239 is Matomaki-Teravainen, arXiv:2301.07679 Lemma
9.1**, not a book. `s >= 9*kappa + 1` is exact, no off-by-one, and
e^{9kappa-s}K^{10} matches. VERBATIM. The "Friedlander" the inventory resolved
is Friedlander-Iwaniec *Opera de Cribro* Lemma 6.8, which MT cite with "see
e.g.", so the normalisation is MT's.

**Halberstam-Richert Corollary 2.4.1 is UNREACHABLE**, recorded as corroborated
rather than verified. Fourteen routes tried and listed; a full-text grep for
"2.4.1" across thirteen downloaded papers returns zero hits.

**The Diamond-Halberstam book is IN THIS REPOSITORY** and was being cited as if
remote: `attestation/book-ch5-6/` holds page photographs. Theorem 9.1 (p. 104)
and p. 79 match the corpus word for word.

Four defects fixed:

1. `oeis-G2-submission.md`:76,122 printed "beta_2 = 4.2665..." pinned to book
   p. 79, which prints "beta_2 ~ 4.266". The twenty-decimal value is Booker and
   Browning, Discrete Anal.
2. `sift-limit-attack.md`:115 credited Franze's Table 1 with 4.2665; it prints
   4.266. The other thirty-odd bare 4.2665 occurrences are four-decimal
   roundings with no source attached and are fine -- only this one attributes
   the digits.
3. `dhr-verification.md`:165 mis-transcribed Franze-Kao: their (14)/(15) are
   the SHIFTED sequence of dimension g+1, and the sentence paired (8)'s
   right-hand side with (14)'s number and (9)'s exponent with (15)'s
   denominator, dropping the rho_1/rho_2 subscript that separates them. Now
   cites (8) and (9) with rho_1 and phi(p).
4. `dhr-verification.md`:83 expanded Johnston-Thomas's [5] as the
   Booker-Browning TABLE; the table is their [4] and [5] is the paper.

And one label withdrawn: `natal-cap-10-sieve-cap.md`:145 called a Wu 2004
sentence "verbatim" where it is a close paraphrase -- it substitutes "(1.3)"
for "(see Lemma 2.2 below)", drops "1 <=" and drops "(nu = 1, 2)". Nothing
changes meaning and the load-bearing tail "(see [14], page 239)" is exact. The
words are now restored rather than the label kept. This is the ONLY paraphrase
found inside quote marks across all seven partitions.

### The fourteenth term, and the oracle's first miss (2026-08-18)

**G2(43#) = 618.** Least position 830,330,079,152,051, multiplicity 8,
survivors = D_43 = 348,469,040,044,125 exactly. Measured twice on disjoint
natal masks -- wheel 19 (63.1 min) and wheel 23 (48.0 min) -- agreeing on all
four. The lower half needs no enumeration: that position is a slot mod 43# whose
next slot is exactly 618 above, by trial division, and `audit-numbers.js`
part g2at43 now recomputes that certificate on every gate run.

**"Two runs agreeing on the position" was never a valid check**, and is retired.
The maximum is not unique: 8 positions attain 618 at 43#, 20 attain 150 at 19#,
4 attain 204 at 23#. Two runs report whichever their thread schedule reached
first. Both tools now report multiplicity and least position, which are
canonical, and the certificate pins the LEAST.

**`G2/h` "growing without settling" is REFUTED.** Over fourteen terms the ratio
runs 1.00, 1.50, 2.00, 3.00, 3.00, 3.00, 4.15, 4.41, 5.10, 5.61, 6.00, 8.00,
7.38, 6.87 -- it peaked at x = 37, exactly where the old run ended, and has
fallen twice since. The inequality G2 >= h is untouched; the monotonicity was
read off a run that stopped at its own maximum. Read it as "no trend
established", not as a turn: the fall is small against the 3.00-flat stretch
earlier in the same column.

**The oracle is 13 of 14, not 14 of 14.** At x = 43 the repaired search reaches
611 against the optimum 617, ratio 0.9903. The pre-registered rule -- >= 12 of
13 exact and >= 0.99 at all -- was written before 43# existed and is NOT
rewritten; scored under it, ORACLE ESTABLISHED still holds. The denominator in
the script is now EXACTX.length rather than a hardcoded 13, because "13 of 13"
and "13 of 14" print identically when the denominator is a literal and only one
of them is a clean sweep.

What the miss does NOT show is the greedy rule failing at 43#. §1c-3 measures
the search budget needed to hold 1.000 degrading by 3.31x per added prime, so a
miss at the newest and largest level is what the budget model already predicts,
and this run used the schedule tuned for the levels below. Budget and structure
are not separated by it. The test that separates them -- 43# alone at a much
larger budget -- has not been run. Every number the search prints is a lower
bound, so 611 <= 617 is consistent and the thirteen exact levels stay exact.
What is withdrawn is the stronger reading: that the construction attains the
optimum wherever the optimum is known.

The OEIS absence claim at `covering-dive.md`:177 was calibrated and re-run
against the THIRTEEN-term ladder. A fourteenth term is exactly the event that
falsifies an absence claim without changing its sentence, so the search is being
re-run at fourteen.

### OEIS A144311: the ladder was published in 2008 (2026-08-18)

**`G2` as a studied object is NOT ours.** A144311, Andrew Carter, September
2008: "The length of the longest sequence of consecutive integers, each equal to
1 or -1 modulo at least one of the first n primes." Their m is our r+1, so
m = +-1 (mod p) is exactly p | r(r+2), and their a(n) is our G2 - 1 -- the
covering optimum, same fixed classes {0,-2}, no free translate. The same object,
not an analogue.

It carries **22 terms** to our fourteen, and all fourteen agree: 1, 5, 11, 29,
41, 65, 107, 149, 203, 257, 347, 527, 545, 617, 707, 869, 965, 1079, 1283, 1397,
1529, 1709. So the exact ladder runs to **x = 79**, not 43; G2(41#) = 546 and
G2(43#) = 618 were recomputations rather than new values, and their agreement is
a check on both sides. G2(47#) = 708 is published, so the 35.8 h price for 47#
buys verification, not discovery.

**Why five waves missed it, which is the part that transfers.** Every search was
run on `G2` and never on `G2 - 1`. The `G2` searches are genuinely clean
negatives and still are -- the fourteen-term ladder and both offset variants
return "No results" today. A144311's text contains no "Jacobsthal", no "twin",
no "primorial" and no "gap", and it cross-references neither A072753 nor
A288815, so no vocabulary sweep and no neighbour-walk could reach it. **A
calibrated search of the wrong convention is a clean negative every time**, and
the calibration was real: the controls returned A288815 and A048670 on the same
channel in the same session.

`research/oeis-G2-submission.md` is RETIRED as a submission and carries a
do-not-submit banner. What survives to offer A144311 instead, subject to the
moratorium and to Chris's decision: a b-file, the twin-prime motivation and
primorial-wheel framing, the cross-references A144311 lacks, and the position
certificates.

A288815 is unchanged at 21 terms ending 2622 (2026-04-12 revisions touched only
link lines). A072753 unchanged at 19 terms ending 436, last edited 2017.

### A144311, checked at the record: same object, disjoint method (2026-08-18)

The first pass on A144311 was relayed from an agent and two of its claims were
wrong or too strong. Checked directly at `oeis.org/A144311/internal`, at the
b-file, at the linked C++ program, and at the StackExchange thread:

**SAME OBJECT, and the bijection is exact, not numerical.** m = r+1 sends
"m = +-1 (mod p)" to "p | r or p | r+2", so m is covered exactly when r is not a
twin slot, and the longest covered run is the slot gap minus one. Periodicity
makes "over all integers" equal "cyclically in one period". The entry's own
comment a(n) = 5 (mod 6) for n > 1 holds at all fourteen of our values.

**BUT A DISJOINT COMPUTATION.** Wang's program is a branch-and-bound over the
CHOICE OF RESIDUE PER PRIME -- plist from 5, pskip[i] with 6*pskip[i] = 2 (mod
p_i), two classes marked per prime, pruned by an optimistic bound. That is our
§1 CRT covering identity implemented as an algorithm. Ours is a full-period
enumeration. Exhaustive enumeration at n = 22 would cost 2.8e10 years at our
measured 43# rate, so neither method can produce the other's terms. **Our terms
are therefore independent confirmation with disjoint failure modes**, not
duplicated work: a branch-and-bound's maximality rests on its pruning bound
being admissible, a period sweep on nothing but the sieve. Our 41# and 43#
confirm Alekseyev's 2009 a(13) and a(14). We also hold least position,
multiplicity and a trial-division certificate, none of which OEIS carries.

**PROVENANCE, three efforts not one.** a(1)-a(7) Andrew Carter 17 Sep 2008;
a(8)-a(16) Max Alekseyev 18 Nov 2009; a(17)-a(22) Jinyuan Wang 26 Nov 2024.
b-file has 22 and no more. For most of this project's life the published ladder
stopped at x = 53.

**CORRECTION to yesterday's entry: "no neighbour-walk could reach it" is FALSE.**
A144311 does cross-reference A048670, which this corpus cites. The citation is
ONE-DIRECTIONAL -- A048670 does not point back -- and every walk we ran followed
xrefs forward only. The route that would have worked is OEIS's reverse-citation
search on A048670, never run. A forward-only neighbour-walk is not a
neighbourhood search.

**The 2016 StackExchange thread is itself evidence.** Its asker defines the
object as gaps between "relative twin primes", consecutive odds coprime to the
first n primes -- our twin slot, arrived at independently. Its answers enumerate
and stall where we would: one reports "the answer is incorrect for m greater
than 9", which is searching a range shorter than the period; another reduces to
3 (mod 6) and strikes 2 and 4 mod each prime >= 5, our natal-set reduction, then
asks for help chunking it. Nobody in the thread finds the covering formulation.
The wall they hit is the one the identity removes.

### The theory searched in A144311's vocabulary (2026-08-18): the bound survives

Finding the sequence made it possible to search the literature in the
convention that owns the object. The result reverses the direction of the day:
after losing the data and the identity's novelty, **the upper bound claim
survives its first honest test**.

**No published upper bound on G2 exists at any exponent.** Nearest is Ziller and
Morack's "paired Jacobsthal function" (arXiv:1706.00317, PDF read): h_2(n)
quantifies over ALL even differences so h_2 >= G_2, and h_2(n) < p_n^2 - p_n is
their Conjecture 6, one of three they explicitly call "alleged". Theorem 4.1 is
an implication, not a bound.

**beta_2 = 4.26645028414864191641... is unimproved since DHR 2008 and the
post-2008 literature is WORSE at kappa = 2**: Blight 2010 < 4.45, Franze 2011
4.516, Opera de Cribro's beta-sieve ~4.83; Brady 2017 improves only kappa = 3/2.
Booker-Browning: superior sieves arrive "once kappa >= 3", not at 2. Ford's 2023
notes still table 4.2665 as best known. So "improve beta_2" is CLOSED as a route
for us, and our constant is the best available rather than a default. A digit
check across the corpus found no erroneous 4.26650.

**MathOverflow 88323 (Foo, 2012)** is the only other place the problem has been
posed, and it took this vocabulary to find -- five waves and four fresh MO
queries in our words missed it. It defines a g_f(n) whose f(x) = x(x+2) case is
exactly G_2. Paseman's reply is the sole bound-shaped claim in the literature
and opens "I have no proofs to offer": a heuristic O(2^{C log n log log n})
sketch, never carried out. Whether that is weaker than x^{4.2665} depends on
reading their n and is NOT yet checked. The honest position is not "nobody
looked" but "two people looked, one wrote a conjecture and one wrote a feeling,
and neither proved a bound."

Max Alekseyev, who extended the sequence in 2009 and was the highest-risk lead,
wrote nothing on it: zero hits for "prime" across 158 publications. Jinyuan Wang
holds an unpublished a(23) >= 1859 with a witness, in the OEIS revision log only.
Nobody has studied the asymptotic growth, so our measurement is the only one.
Coverage gap disclosed: the 2009 SeqFan thread is unread, blocked by four
Internet Archive 503s, and is the one place a bound could still hide.

### The greedy extension: my reading line was wrong before it was published

Scoring the repaired search against A144311's eight published levels gave
ratios 0.992, 0.959, 0.982, 0.944, 0.899, 0.917, 0.942, 0.937, log-log slope
-0.133. The script's READING line said a negative slope means STRUCTURE -- that
the greedy stops being the covering optimum above x = 41. **That line was wrong
and is corrected in place.** The budget schedule is not flat across the range:
maxCalls falls 3e6 -> 1.2e5 and restarts 512 -> 96 at np = 16, which is x = 53,
exactly where the ratios drop. x = 47 is the only extension level that keeps the
np <= 15 row and it is the one that nearly hits exact at 0.992. Meanwhile 1c-3
has the budget NEEDED rising 3.31x per added prime. Schedule falling and
requirement rising at the same boundary means a degrading ratio there is what an
under-budgeted search looks like, and is not evidence about the greedy rule.
A --force-budget=N flag was added for the discriminating run.

### Attack 5 of 5 on the upper bound: the covering economy, closed with a number

Full write-up `staging/attack-beta2-05-covering-pruning-bound.md`, script
`research/attack-beta2-05-covering-prune.js`, recorded in
`sift-limit-attack.md` §7.

**By-product worth more than the attack: A144311's terms above x = 43 are PROVEN
MAXIMAL.** Wang's pruning test is a union bound on the current residual,
|U| <= Sum_q max_r |U ∩ C^q_r|, admissible at every deeper state because the
residual only shrinks. Confirmed three ways: a faithful port reproduces every
term it reaches (n = 3..15), the pruned optimum equals brute force over 8.35e6
assignments at n <= 9, and zero violations across 104 prefixes. So the eight
terms we inherited today are exact, not best-found.

**As an upper bound it is sharp twice and then dies.** G2(5#) <= 11 and
G2(7#) <= 29 exactly, by counting alone; 83 against 41 at x = 11; nothing from
x = 13 onward. The content is Sum_{5<=p<=x} 2/p < 1, crossing between 0.8675 and
1.0214 -- the Mertens wall, arrived at independently for the SIXTH time.

**The number.** Bonferroni truncation (Brun's pure sieve) gives beta_pure = 2.80,
3.98, 4.25, 5.38, 8.88 at x = 13, 101, 199, 1009, 1e6. It BEATS 4.2665 for
x <= 227, loses from x = 229, never returns, and diverges like 7.19 lnln x. The
main term alone is already false at x = 13 (25.2 against a truth of 65, ratio
growing like x to 49145x at 1e5).

### Correcting our own adjudication: L <= 62 stands, L <= 111 is weaker

Coverability of [1,L] is DOWNWARD CLOSED -- restrict a cover of [1,L'] to [1,L].
So feasible L form an initial segment, revivals are impossible, and the FIRST
infeasible L minus one is the bound. Verified here by exhaustive enumeration over
all 385 phase choices at primes {5,7,11}: the feasible set is exactly 1..9,
contiguous.

`attack-block-00-ADJUDICATION.md` overturned an L <= 62 for L <= 111 on the
ground that feasibility is non-monotone. That conflated two things. What is
non-monotone -- a real defect this repo found and fixed -- is the GREEDY SEARCH's
success, which is why bisecting on it is unsafe. Feasibility itself is monotone.
Taking the last dead L rather than the first gives a true but far weaker bound:
at x = 11, where truth is known, first-dead is 2.02x the truth and last-dead is
5854x. L <= 62 is correct and stronger. Flagged INFERRED, since the block-1
instrument was not re-run, and QUEUED for Chris rather than decided.

### The budget/structure question, settled by --force-budget (2026-08-18)

The extension to A144311's eight published levels scored min ratio 0.8995 with
log-log slope -0.133 at the schedule's own budget. Re-run at --force-budget=15,
which holds every level on the np<=15 schedule row instead of letting it fall off
the cliff at np=16:

  x        47    53    59    61    67    71    73    79    min     slope
  own    0.992 0.959 0.982 0.944 0.899 0.917 0.942 0.937  0.8995  -0.133
  forced 0.992 0.962 0.988 0.953 0.944 0.940 0.973 0.957  0.9399  -0.065

Every level improves and the trend halves. The shortfall is BUDGET-DOMINATED.
One schedule step recovered about 40% of the gap, and one step is nowhere near
enough: at x = 79 the 3.31x-per-prime law asks for roughly 1e9 times the x = 43
budget. Nothing here shows the greedy failing structurally, and nothing here
shows it IS the optimum above x = 41 either -- these levels are too far under
budget to test that in either direction. Recorded at
`two-class-lower-bounds.md` §5b-ii.

### Attacks 2 and 3 on the upper bound (2026-08-18)

**Attack 2, the vector-sieve route priced against the source.** Both
Brudern-Fouvry PDFs read (numdam CM_1996__102_3_337_0, matwbn aa37127; the
numdam text layer drops every display formula, so the side conditions were read
off rendered page images). Verdict: the defensible theta_total is 1, short of
break-even by 0.209. Three findings outweigh it.

Two corrections to this file's own §4.5 and §6, applied in place. **The
break-even is 1.2090, not 1.2417** -- parametrising by ln(s1-1)+ln(s2-1)>1
varies COMPONENT asymmetry, but the asymmetry that pays is upper-level against
lower-level, giving u > (1+e^{b/2a})/b with optimum 5.158065/theta_total.
Verified: 5.158065/4.26645 = 1.2090. And "the coupled sieve lands at 5.2974,
which is why it does not appear in this problem" is the WRONG REASON, withdrawn:
Brudern-Fouvry never ran it coupled.

Their Proposition 2 (p.345) carries q^{C_0} D_1^4 D_2^4 <= x^{5-c*eps}, which IS
theta_total <= 5/4, and their exponent (4/3)(1+e^{3/4}) = 4.156000 sits below
beta_2 by 0.110450 -- a comparison their own §1 makes. So the 5/4 target is a
published theorem in a DIFFERENT problem. The transfer to ours fails at exactly
one factor: by reciprocity e(h*rho/(d1 d2)) = e(-h*N/(d1 d2)) * e(-2h*dbar1/d2);
the right factor is theirs verbatim, the left is O(x^eps) for them because window
length equals element size, and O(N/H) for us with N up to P(z). It breaks their
partial summation at (2.9) and the smoothness hypothesis of their Lemme 2.

New small result: absolute-value accounting is SHARP, not lazy. At a
CRT-constructed worst position Sum|r| reaches 0.978 of the trivial pair-count
bound against 0.027 typical, so theta_total <= 1 is a real ceiling on any
absolute-value method. At that same position the SIGNED Rosser sum stays about H
(max 6 over 20,000 positions, pair count 588) -- Lemma V looks true and only its
proof is missing. Routed live to attack 1 while it was still running.

**Attack 3, DP3 opened.** The strata ARE self-similar, provably: for odd p,
{r = 0 mod p} = p*(p^-1 * T^-) and {r = -2 mod p} = p*(-p^-1 * T^-) - 2, so a
discarded stratum is exactly two two-class interval sifts at length H/p, same
kappa, same omega. Machine-verified at all eight levels. But the dilation is an
isomorphism of the tile as a set with CONGRUENCE structure and not as a set with
ORDER, and every question a sieve asks a stratum is an interval question: at
level 19 the family is uniform from above (<=15% spread) and not from below (the
twin tile is the family MINIMUM in max gap, 0 of 10 dilates smaller, one at 198
against G2 = 150).

Exact pricing is worth 1.72 to 1.84 of exponent, the largest single elasticity
measured in this pipeline. Finite certificates produced: G2(19#) <= 210 and
G2(23#) <= 420 (truths 150 and 204). Not trending below: the stable value RISES
1.9448 -> 2.0260 across p_k = 11..23.

The obstruction is an INFINITE REGRESS, not circularity. Full re-insertion is a
tautology (the script demonstrates it on itself, returning H* = G2 exactly at six
levels); partial re-insertion is a valid finite theorem; but max_x Str_i at
u_i ~ 1 IS the upper sieve function of a dilated tile one level down, whose only
proven bound is F_2 -- the thing exactness was replacing. Terminates at every
finite z, at no uniform z.

**And a ceiling that reframes the programme: Blight gives Selberg's conjectured
kappa=2 sifting limit as 4.** If so, 4.2665 is close to the axiom class's truth,
no approach inside the sieve axioms reaches the TPC-equivalent exponent 2, and
attacks staying inside the axioms are competing for the band (4, 4.2665]. The
vector sieve's decoupled 2.649 lies below 4 precisely because the product
structure it consumes is not an axiom-class object.

New live door: Brady's and Runbo Li's fractional retention rules sit at DP3, are
inequality-based and therefore carry NO regress, and Li states that bounding
beta_kappa for kappa > 1 that way is open.

### Attack 4: the loss budget, and §1's ordering is inverted (2026-08-18)

Where the x^3.3 goes, with E = beta/theta and DHR at beta = 4.26645, theta = 1:
truth 1.0000; DP1 the one-point floor +2.1945 (cumulative 3.1945); DP2+DP3
+1.0719 (cumulative 4.2665); DP2's envelope alone, DP4 at theta=1, and the
unnamed o(1) all +0.0000 in exponent. Residual 0.000000. beta_2 recovered
independently by shooting the DDE: 4.26660 against 4.26645.

**§1's ordering is INVERTED.** That section calls DP3 "where the dimension-2
price is actually paid". Measured, DP1 is 2.19 of the 3.27 and DP2+DP3 together
are 1.07. The master discard is the master cost.

**DP4 is saturated, not free**, and §1's cheerful reading of "saturated free of
charge" is wrong: the per-term bound is tight to 0.88, and that tightness is
exactly what caps theta -- the largest derivative in the problem. Elasticities
are exactly +1 in beta and -1 in theta, so a factor c in either divides E by c.

Ranked by headroom times availability: (1) theta/DP4, headroom 1->2 MEASURED
(signed sum ~ D^gamma with gamma = 0.27-0.49 over complete periods, giving
theta = 2.06-3.65) and the only knob with a consumer, reaching E -> 2.133;
(2) beta/DP2+DP3, headroom only 4.266->3.195, no consumer; (3) DP1, 3.195->1,
no mechanism, the wall; (4) DP2's L and the o(1), elasticity exactly zero.

Independent consistency: beta_floor/theta_max = 3.195/2 = 1.597 against the
measured 1.70, 6.2% apart with no shared code.

**UNRESOLVED CONFLICT between attacks 3 and 4, recorded rather than resolved.**
Attack 3 prices exact-versus-worst-case strata at 1.72-1.84 of exponent; attack
4 caps DP2+DP3 together at 1.0719 and separately measures worst-casing exact
strata at about 0.25. Both cannot be right. Different baselines are the likely
cause -- attack 3 swaps pricing inside the DHR bound, attack 4 measures exact
strata against true G2 -- but that is not established. Neither figure may be
quoted alone until adjudicated.

Reach, which limits the headline: exhaustive to x = 23, LP to x = 23 at 512
cells. The kappa=1 control converged by x = 13 but kappa=2's s90/s99 were still
RISING at x = 23, so 3.195 rests on calibration rather than convergence. Pushing
the LP to x = 43 (2^14 cells, sparse solver) would settle whether DP3's 1.07 is
real, and with it the inversion.

### Attack 1 of 5: the mean-square Lemma V is PROVED, and L5 hands back a sup bound

`research/lemmaV-parseval.js` (371 s); write-up
`staging/attack-beta2-01-lemmaV-meansquare.md`; recorded at
`sift-limit-attack.md` §7e.

**PROVED unconditionally: <R^2>_H <= B(z,s)*H for every H, z, s**, with
B(z,s) = Sum_{e | P(z), e>1} e*Vabs(e)^2. Five identities and two triangle
inequalities: L1 window sum, L2 autocovariance, L3 Parseval, L4 the exact Fejer
mass Sum_{a != 0 mod e} F_H(a/e) = h(e-h), L5 the pointwise expansion.
B(z,3.0) is flat at 1.3833-1.4883 across z = 13..37 and stays in [1.27,1.68]
over s in [2.0,3.4]. **L4 also PROVES (V1) and (V2)** including the equality
case -- statements `sift-limit-lemmaV.js` asserts without proof.

The proof stops at exactly one place and it is NOT a maximal inequality: B
bounded as z grows, a character-free mean-value estimate for signed Rosser
weights, with no quantifier over positions.

**The honest negative: the almost-all exponent is 0.** The window B/(eta M^2)
is polylog, not a power. Useless for G2, and the elementary second moment
already owns that ground about 1.4x cheaper. This is the clearest demonstration
yet that almost-all is not the currency this problem trades in.

**What a worst-position proof must beat:** u_1 = theta(z)/(2 ln z) + 1.45,
measured 2.8489, 3.2063, 3.6686, 4.0634, 4.3767 at z = 13..29, residual flat
1.34-1.52, against u_true flat 1.60-1.80. The gap is theta(z)/(2 ln z) - 1.45 =
1.25, 1.50, 1.87, 2.29, 2.60, DIVERGING like z/(2 ln z). In moment order
k ~ theta(z)/(2 ln z (beta_2 - 1.45)): k = 1 to z = 23, k = 2 from z = 29.

**Not asked for, and it may outrank all of the above.** L5 also yields an
UNCONDITIONAL WORST-POSITION bound with no maximal law,
sup|R_H| <= Sum_{e,a} |Theta_e(a)| |S_H(a/e)|, whose exponent u_sup measures
2.06, 2.30, 2.55, 2.67 at z = 13, 17, 19, 23 -- within 4.3x to 15.1x of the true
sup and 80x tighter than the divisor-pair absolute-value bound. It is a SUP
bound, so it does not pay the quantifier. All four values are below beta_2. They
are also RISING, increments 0.24, 0.25, 0.12, which four points cannot separate
from deceleration toward a plateau. Extension to z = 29..43+ in flight. NOT a
theorem.

**Two corrections to what was recorded earlier today.** (i) §7b read attack 2's
sharp absolute-value finding as "theta_total <= 1 is a real ceiling on any
absolute-value method". L5's representation is 80x tighter at the same
positions, so that is a ceiling on the REPRESENTATION, not on the problem. Both
readings are now in the corpus and neither may be quoted alone until the
extension settles it. (ii) "The one factor" is ANSWERED: Brudern-Fouvry's left
factor e(-hN/(d1 d2)) is L5's e(ax/e), unimodular, so Parseval kills it free --
no partial summation, no Lemme 2, no N/H loss. The price is exactly the
QUANTIFIER, not the factor. TODO item B is retired and replaced by the u_sup
route, which does not obviously pay it.

### Integrating the Lemma V result across the corpus (2026-08-18)

The result landed in `sift-limit-attack.md` §7e and TODO, but four documents a
reader reaches FIRST still said the opposite. All four now carry it.

**"No route in the repo has moved that gap by any amount"** was true for the
whole programme and is now too strong. Corrected at all three sites that carried
it: `G2-STATE.md` §0, `ZONE-POSTULATE.md`'s "Where this stands", and TODO's focus
paragraph. Each states what actually changed and what did not: the mean-square
Lemma V is PROVED but buys an almost-all exponent of 0, so on its own it moves
nothing -- what it moves is the STATUS of the estimate the vector-sieve road was
waiting on; and u_sup measures below 4.26645 at every level reached but is
rising, and four points cannot separate a plateau from a crossing.

`G2-STATE.md`'s novelty scoreboard gains two rows, both hedged: the mean-square
Lemma V as PROVEN, and u_sup as MEASURED-not-proven. The existing
x^{4.2665+eps} row gains the 2026-08-18 re-test in the owning vocabulary, with
the instruction to phrase it as "two people looked and neither proved a bound"
rather than "first ever".

`G2-STATE.md` §5b's Route A gains the status change: what is missing is NOT the
factor everyone expected -- Brudern-Fouvry's e(-hN/(d1 d2)) is unimodular and
Parseval kills it free -- but the QUANTIFIER, almost-all against worst-position.
Break-even corrected to 1.2090 there too.

`THE-DIALS.md` dial 2, the live dial, gains the measured 1.70 over 22 exact
terms and the u_sup line with its NOT-A-THEOREM flag.

**And a new TODO item H: prior-art check both new results before claiming
either.** Neither has been searched in any vocabulary. Named risks: a
mean-square estimate for signed Rosser weights over a complete period sits close
to standard large-sieve and mean-value territory, and the Fejer-mass identity
Sum_{a != 0 mod e} F_H(a/e) = h(e-h) is elementary enough to be folklore. Assume
both are known until searched. That instruction exists because today the central
object turned out to have been published in 2008 while five calibrated waves
searched our own vocabulary and found nothing.

### The "ceiling at 4" is WITHDRAWN, same day it was written (2026-08-18)

`sift-limit-attack.md` §7c carried a boxed claim: Blight gives Selberg's
conjectured kappa=2 sifting limit as 4, so nothing inside the sieve axioms
reaches exponent 2 and inside-axiom attacks compete for the band (4, 4.2665].
Reading Blight's thesis directly kills both halves.

**She never writes 4.** Her p. 6 §2.1: "Selberg proposed that the sifting limit
is 2kappa... a lower bound sieve with a sieving limit of 2kappa has not been
found for kappa > 1." The 4 is OUR arithmetic on 2kappa.

**And 2kappa is a TARGET, not a proven floor.** Her p. 7 records beta_kappa <
2kappa already ACHIEVED for 1/2 < kappa < 1, and Brady p. 3 conjectures
beta_kappa <= 2kappa - eps*kappa^(1/3) for large kappa. Nothing establishes 4 as
a floor at kappa = 2; the axiom class may go below it. The band (4, 4.2665] is
not a thing. What survives is only that nobody has exhibited any kappa = 2
sifting limit below 4.2665.

Confirmed on the same read, and kept: DHR really IS the infinite iteration of
Ankeny-Onishi (Blight p. 8 §2.2.2, verbatim), and that page prints
beta_2 = 4.266450 -- a second independent source for our constant.

### Fractional retention: door open, opens onto nothing

Everything optimistic §7c recorded about Brady's and Li's rules is TRUE -- they
apply to our system, and being functional inequalities in (F_kappa, f_kappa) they
carry no regress, which was the whole reason the lead looked good after exact
strata died on one. But Brady §9.6 (p. 133) gives the rule's window as
(alpha_kappa, beta_kappa + 1), and DH p. 77 proves alpha_kappa >= beta_kappa + 1
for kappa >= 2, so the window is EMPTY at every kappa >= 2 (alpha_2 = 5.35773
against beta_2 + 1 = 5.26645). Only the lower-bound half survives and Brady
measured its yield: beta(3/2) from 3.11582 to 3.11549, relative 1.06e-4, which is
0.017% of the 4.2665 -> 2 gap. Closed.

### Brady's thesis is uncited prior art, and it outranks the lead that found it

His p. 1 names our exact system -- "kappa is 2 and the congruence classes chosen
modulo each prime are 0 and 2". His **Problem 3 (p. 12) IS our G2 covering
problem**, he proves it **NP-complete**, and he states that a bound there "would
be a much stronger claim than the twin prime conjecture". Added to PRIOR-ART.md,
with the instruction to reconcile his framing against
`two-class-lower-bounds.md` §1 before any novelty claim about the covering
formulation. Blight added there too as the second independent source for beta_2.

### The unreached sources, reached (2026-08-18)

**The 2009 SeqFan thread DOES NOT EXIST.** `list.seqfan.eu` is dead
(ECONNREFUSED on 80 and 443), so the archive was rebuilt from Wayback's
per-month mailboxes: 142 months, 19,964 messages, ~41 MB, 1999-2023, with ZERO
hits for `144311` anywhere. Calibrated on the same corpus in the same pass --
Alekseyev 1033 hits, primorial 192, Jacobsthal 30 -- so the silence is the
channel working. November 2009 is complete (322 messages); Alekseyev posted ten
times that month, none on this subject, none on the 18th. All 23 A144311
revisions read: no method note, no program, no bound. Residual gap: 5-30
September 2008 is archived by nobody. **The upper-bound novelty claim is no
longer hostage to this.**

**Paseman's heuristic is WEAKER than ours.** His `n` is omega(m), confirmed four
ways and decisively by his own arXiv:1311.5944, which cites MO 88323 and gives
g(n) < k^{3+3.81 log log k}. His shape is k^{0.693 C ln ln k}, exponent
UNBOUNDED, against our k^{4.2665+o(1)}, exponent FIXED. Crossover undeterminable
(C unspecified; base-2 against natural differs by eight orders).

**THE UNWELCOME FIND, and it narrows our novelty. MathOverflow 37679 answer
52890 (zeb, 2011) already derives j(x#) << x^{4.032} from a sieve's error
exponent** -- our exact shape, at dimension ONE. The arithmetic was re-verified
and the exponent sits on p_n as ours does. So the TECHNIQUE is not ours; the
DIMENSION-2 INSTANTIATION is, and every claim about the beta_2 theorem should be
phrased that way. **The closeness of 4.032 to 4.2665 is coincidence and must
never be tabled beside it.**

**Fischer and Rivera do not study our object.** Retrieved in full: both concern
maximal gaps between ACTUAL twin primes, which shares the symbol G2 with ours.
No bound in either. Recorded because a symbol collision produces false hits and
false all-clears equally.

zbMATH swept via the open api.zbmath.org. **MathSciNet remains UNSEARCHED** --
paywalled, redirects to LibLynx, and no substitute was run in its place, which
is the honest form of that gap.

### L <= 62 recomputed and confirmed; my 5854x was the wrong quantity

The instrument is `attack-block-03-alternation.md` §2(c)+§6, Theorem D's sweep of
S(l,f) = Sum_p max_a #{i<l : d_i = a or a-2 mod p}. Re-run from scratch in
`research/block-L-first-dead.js` (17 s): first dead l = 63, sums 62/62/62 across
all three phases, so **L <= 62**; last-alive 111. Block 2 reproduces
independently (660 -> L <= 659) and all seven object numbers replay, including
maxsum_20(T_5) = 204 = G2(23#). The INFERRED flag on §7a is dropped.

Downward closure HOLDS in the block coordinate, attacked four ways: achievable
dead-run lengths per l are exactly 1..19; all 190 sub-runs of the extremal run
are themselves all-dead and satisfy the constraint, which is the property closure
actually needs since Theorem D never uses maximality; and 67 instances with exact
truth show zero non-contiguous cases and zero violations.

Three things §7a lacked. The adjudication's w-window IS attack 3's instrument --
W(l) = Smax(l) at every l <= 400, PROVEN by CRT -- so 62 is the CEILING of the
criterion, not just a valid reading. There is no revival anywhere: T(l) =
Smax(l) - l is subadditive, max T = 7, T(1200) = -77. And **the 5854x I quoted
was the wrong quantity**: it was covering-prune's last-dead, i.e. its sweep
limit, and that script prints 40000 today. The dispute turns on LAST-ALIVE, where
the honest comparison at x = 11 is 83 (2.02x) against 113 (2.76x).

Nothing downstream consumes either bound; the only other carrier was
`research/qc/units.js`, corrected from 111 to 62. Neither clears 529, so this was
a record-keeping question, not a mathematical one. TODO item G(i) is resolved and
needs no decision from Chris.

### The x = 43 LP push: the inversion survives, the conflict was false (2026-08-18)

`research/lp-push-x43.js` (1850 s) rebuilds the level-D LP as a revised simplex
-- Mobius crash basis with a closed-form inverse, zeta-transform pricing over the
Boolean lattice, Devex weights -- reproduces all 48 published cells of the
loss budget to 4.9e-5, and reaches x = 29, 31, 37, 41, 43. Worst duality gap
3.7e-13.

**The inversion SURVIVES and strengthens.** The two statistics flagged as "still
rising at x = 23", which is why the headline was said to rest on calibration
rather than convergence, now SETTLE: raw s90(kappa=2) rose +0.130/level to x=23
and then only +0.022/level to x=41; s99 rose +0.090 then +0.005. After the
beta_1 = 2 calibration the spread over x = 23..43 is 0.093 and 0.045 against
0.279 and 0.211 before. What drifts instead is s* and s50, and every drift is
upward. The floor RISES: pooled 3.1945 (x <= 23, 16 readings) -> 3.3152
(x <= 43, 33 readings), 3.2513 like-for-like on the seven levels where all four
routes land. **DP1 is 2.32 of 3.2665 -- 71 per cent -- against DP2+DP3's 0.95.**
All 33 readings clear the (1+beta_2)/2 = 2.6332 the inversion needs, tightest
2.6692 at x = 19. So 3.195 was CONSERVATIVE, not an artifact.

**The attack 3 / attack 4 conflict was a false one, and it is resolved without
splitting the difference.** Both endpoints differ. §7c's 1.72-1.84 runs from a
one-step envelope SURROGATE (3.8452, not beta_2) down to the exact-strata
threshold (2.0260); §7d's 1.0719 runs from beta_2 down to the calibrated floor.
The two bottoms are one object at two scales: exact strata and the raw LP
frontier agree to 0.1 per cent at x = 23, with |ratio-1| falling at all six
levels from 0.223 to 0.001 and crossing 1. Neither figure was wrong; they were
never comparable, which is what the do-not-quote-either-alone flag was for.

Not reached, stated: s90/s99 at x = 43 and s99 at x = 41 hit row caps and are
given as honest lower bounds; the B-vs-L identification cannot exceed six levels.

Consequence for the attack ranking: DP1 is now 71% of the loss and still has no
mechanism, so the wall is a larger share of the total than the first budget said.
That makes theta the only knob left with anywhere to go.

### The k4direct swap, made and measured (2026-08-18)

Flagged as a top item all day and never verified end to end. Now done, and two
of the three things the record said about it were wrong.

**Same quantity: PASS, proved by enumeration rather than by agreement.** At
N = 10/14/20 the Monte Carlo's estimand, EXHAUSTED over its own ordered-tuple
universe instead of sampled, equals `k4direct` to 3.3e-14.
`assembleA(N, shapes, k4direct)` reproduces `AdirectT4` to 6.3e-15 at @7, @11 and
@13 at 120/240/500, so it fills exactly the slot the call site adds it into.
Forty MC draws: mean z 0.039, sd 1.22; at N = 990 twelve seeds give mean z
0.41 +/- 0.24. The single 3-sigma draw is a small-N error-bar artifact -- the
plug-in sigma is understated 2.4x at N = 10 and is honest from N = 240 up -- not
a disagreement.

**Cost: the "x3600" is an ACCURACY margin, not a speedup, and the exact routine
is SLOWER.** `k4direct` measures 93.5 s over three runs, 0.8% spread;
`k4MC(2e8)` 11.7-23.4 s over six. The swap costs 4x-8x, +75 s on a 266 s stage.
It is worth paying because the Monte Carlo's NOISE was the only thing keeping
the gate out of reach, and more samples do not buy that away here. The corpus
note in `gen-scripts-index.js` stated the x3600 correctly as a gate margin; the
BRIEF written from it read "x3600 cheaper" and sent an agent hunting a speedup
that does not exist. That was my error, and the note now says so in terms.

**Second cost correction: the recorded 198.9 s for `k4direct` is 2.1x too
expensive.** Measured 93.5 s, which drags its @17 extrapolation from 8.5 days on
ten cores to about 4.4.

**Gate: PASS by x3632.** Against cap-27's T4 = 352253669.87624449 with a
|dT4|/T4 <= 1e-9 cap: the unmodified baseline, re-run here, reads -1.021692e-9
and MISSES by 2.2%; swapped it reads -2.753038e-13.

One call site (`natal-cap-32-wrap-identity.js`:436) plus its two dependent log
lines. All six stages re-run: `verify` 88,520 checks, `c2` 6, `exact13` 4, and
every digit outside the [L] best-assembly block bit-identical. The pasted OUTPUT
was diffed line by line against six fresh logs. `SCRIPTS.md` regenerated.

### u_sup: raised and closed the same day (2026-08-18)

L5 of the Lemma V proof yielded an unconditional worst-position bound with no
maximal law. On four points, z = 13..23, it read 2.0617, 2.3036, 2.5518, 2.6666
-- all below beta_2 -- and was recorded as possibly outranking everything else in
sift-limit-attack, with the caveat that four points could not separate a plateau
from a slow crossing. It was integrated into G2-STATE, ZONE-POSTULATE, THE-DIALS
and TODO on that basis.

**Extended to nine points, z = 13..43, it is DEAD.** u_sup = 2.0617, 2.3036,
2.5518, 2.6666, 2.7464, 2.8924, 3.0125, 3.1103, 3.2026, RISING at all eight
steps, with the constant model's RSS 49x the best fit's. A plateau below beta_2
is rejected.

**The crossing point does not need locating to close it.** All four rising models
cross beta_2 -- at z = 73, 147, 267, 1544 -- and are statistically
indistinguishable at 1.8x RSS spread, so where is undetermined. But the BOUNDED
family's best asymptote is 5.46, ABOVE beta_2, and forcing it down to beta_2
costs 8.70x in RSS. Model-free, d ln Ssat/d ln z is 4.99 over ten levels and 6.20
over the top five: above beta_2 in every window and rising. The live question is
"plateau above beta_2, or divergence", and both answers close the route.

Attack 1's own theta(z)/ln z shape is rejected too, conservatively: residuals
-0.086, -0.189, -0.249, -0.373, -0.535 across the five new levels. Growth sits
between ln z and lnln z.

**The mechanism, with both horns MEASURED rather than argued.** Ssat grows ~2.05x
per added prime, and the step that loses C^pi(z) is exactly the absolute-value
step |e(ax/e)| = 1 -- the one that removes the position quantifier. That step IS
a mean-value estimate and not a maximal inequality, i.e. it lives in the
tractable class, and it is too weak by that factor. Keeping the phase to recover
the factor puts x back and makes the statement uniform-in-x. **So the quantifier
is not a presentational choice; it is priced, and the price is C^pi(z).**

**Two corrections to what was recorded four hours earlier.** The "80x tighter"
claim does not survive: the Fourier route wins on the CONSTANT by 23-44x, N/Ssat
FALLS from 44 to 23, while §7b wins on the RATE, and both losses grow ~1.5x per
prime. Neither is a ceiling on the problem and neither is a route; they degrade
together. And closure is NOT monotone in H -- the true minimum at z = 17 is 659,
not 683 -- so every published u_sup is an upper estimate; attack 1 also
over-priced z = 29 by about 550x.

Walked back at every site it was integrated into: sift-limit-attack §7e, G2-STATE
§0 and its novelty scoreboard, ZONE-POSTULATE, THE-DIALS dial 2, TODO item B.
What survives is the narrower true statement: the STATUS of Lemma V's
mean-square form moved, the gap did not.

### The 84-finding queue, worked to zero (2026-08-18)

search-convention 75 -> 0, provenance 8 -> 0. **Fixed 83, adjudicated 2** -- both
to `transfers`, both forced by the fixes themselves, content-keyed and dated.
Neither new check consults a ledger, so an entry for them would have been inert.

**All six "not in OEIS" claims were FALSE**, and reading turned up three more of
the same falsehood that the check CLEARED because their paragraphs happened to
name a convention -- including U-FRAME §6a's "checked at three offsets", where
the three did not include the -1 shift that returns A144311 instantly. A fourth
fell out of two-class-lower-bounds §2 row 12 (computational work "ABSENT", while
A144311 carries three separate efforts plus Wang's C++), and a fifth in TODO,
which still listed three search gaps closed hours earlier.

All 8 provenance findings closed by carrying the artifact back from
`staging/lit-pdf-*.md`, page numbers included, and including what was NOT
obtained. One was not a literature quotation at all: maier-matrix.md §3a's
display is our own algebra sitting under the word "says" inside a
Maier-attributed block.

§1 of SEARCH-CONVENTIONS was deliberately left untouched -- 20 owning conventions
and 7 house terms before and after -- which is the evidence that no suppressor
was widened to make the number fall.

Honest remainder, recorded: no search was re-run, so truth is still unchecked;
two claims stay flagged uncalibrated (twin Hensley-Richards, two-class window
variance) because no owning convention exists for them; MathSciNet untouched; the
Erdos-problem absence still rests on a single pass; and five findings were
resolved by rewording sentences that were never literature claims, named
individually so the ratio stays visible.

## 2026-08-20 — TODO 1c re-scoped: the 47# extension parks to paper phase

Chris set the series rule: depended-on third-party number series (A144311
here) are trusted as true during research, with no recomputation; the only
recomputation of a depended-on series happens at the final paper-writing
phase, where every series a paper leans on must be verified in-house. TODO
item 1c rewritten accordingly: the 47# enumeration moves from live research
item to queued paper-phase deliverable, carrying its direct-probe price
(35.8 h/run, two wheels, phase1-T2b §5), its recorded instruments and
recipe, and the standing prereg-the-window discipline for the day it runs.
The free remainder stays live: the x = 37 outlier question is to be settled
by reading A144311's trusted terms 15-22. The old item body claimed the
extension as the path to "verifies a published term" during research; that
claim moves to the paper-phase win column unchanged.

## 2026-08-20 — the full A144311 set adopted; the x = 37 outlier settled free

Chris: use the full A144311 data set right away, the derivation being public
(Wang's C++ branch-and-bound in the entry). `research/a144311-full-ladder.js`
adopts all 22 terms (Carter 2008 / Alekseyev 2009 / Wang 2024) as trusted
under the series rule, with two transcription guards (custody overlap exact
14/14, the entry's own 5-mod-6 invariant 21/21). Free readings, now in TODO
1c: x = 37 CONFIRMED an outlier by all ten terms above it, but c2' drifts
upward (x >= 41 band sits above the custody band), so the flat-band reading
retires with the outlier question; G2/x^2 leans falling over the trusted
tail; S(x) max rises to 1.2946 at x = 79. Queued follow-up: the 22-term
refit belongs to exponent-control.md.

## 2026-08-20 — external-ladders-01: h and h2 adopted, the G2/h trend settled

Applying the external-data audit's two HIGH findings
(history/staging/external-data-audit.md): research/external-ladders-01.js
adopts A048670 (h, 22-term prefix of a 64-term b-file) and A288815 (h2, all
21 published terms) against the trusted G2 ladder. G2-STATE §5's first two
relations upgrade: G2 >= h now verified 22/22 and its old reading "peaks at
x = 37 and then falls twice, no trend established" (itself the 2026-08-18
correction of "growing without settling") is retired as an
end-of-data artifact — seven of eight trusted terms x >= 53 exceed the old
8.00 peak, max 8.55 at x = 79, slow upward drift; G2 <= h2 now verified
21/21 with the seven new levels in [1.63, 1.81] and x = 37 as the column's
low outlier (1.341), the third instrument pointing at x = 37 as a G2-side
anomaly. THE-DIALS' ten-term citation updated to the 22-term artifact. The
three independently computed series double as a cross-series custody guard:
any corrupted term would violate an inequality.

## 2026-08-20 night — the four-attack wave integrated: unified caps, (H-sub-pow), RML(alpha), M_p's comb — every retired reading named

The night wave (attack-anchored-01.md, attack-hsub-01.md, rho-maximal-law.md,
mp-derivation.md, all in history/staging/) was adversarially verified with
ZERO refutations (redteam-0820-night-proofs.md, redteam-0820-night-empirical.md)
and promoted into the live layer. The readings that retired or moved, one by
one:

**TODO TOP ATTACK.** The pre-wave framing ("compose the origin's proven
mechanics into an anchored-aware floor", first move: unify Mirror-Sweep with
Cofactor Rigidity at @11) is superseded: the first move is DONE and the
composition works. The unified-cap lemma is PROVEN and red-team re-derived;
anchored-point floors 36 @11 / 115 @13 at K = 0 reach exact truth 45/307 at
K = 8/28; the classic ladder provably plateaus at 41/296; the blocking
structure is named with digit-exact accounting; the forcing ladder
16→...→45 is exact and independently reproduced. The block's new first moves
are the doubling target, the unified ladder at @17+, and a cheap-K
certificate. The advmin/kill-decoupling background moved to G2-STATE §5a and
the standing records.

**TODO item 0.** Two retirements. (i) "the Lemma V sub-question, as moot and
moving further away" — the mootness is TPC-SPECIFIC: at the beta_2 target the
working point is s/u = 3/4.26645 = 0.70316, INSIDE Lemma V's stated range,
for every delivered exponent in (3, beta_2). The mandatory rider carried with
it: this un-moots a POSED lemma, not a proven one; the fixed-smooth-profile
hypothesis that killed the DI 6.12 / Maynard / Pascadi import binds at the
beta_2 point exactly as at the TPC point; what re-enters is the ASK (a
0.1787-of-theta_total improvement), not an import route. (ii) The named
first move ("state the rho maximal law precisely and price its weakest
sufficient form") is executed: RML(alpha) stated in five forms with the
pricing lemma proven in every step but the law, sufficiency curve weakest at
z = 47 (lambda_max 1.78446, looseness factor 963), the Gaussian rho law
measured TRUE at all five exact levels (C_true 0.60–0.80) while the sharp
law dies at z = 19, and nothing in print reaches the curve. The item's new
first move is an analytic upper bound on <rho^2>(z) from its proven closed
form, next exact point z = 31.

**Source-pointer correction, recorded here because the history layer is not
edited.** The verbatim source for Lemma V's stated range ("in some range
s ≥ (0.63+δ)·u (θ_total ≥ 1.25) up to s = u − ε") is
`research/sift-limit-attack.md`'s Lemma V block, NOT
`history/staging/lemmaV-neighbours.md` (that file carries the DI/Maynard/
Pascadi smoothness-hypothesis quotes). The rho-maximal-law.md record's
pointer for that range is wrong on this; the record stands unedited and
every live citation names sift-limit-attack.md
(redteam-0820-night-empirical.md §T2e).

**TODO item 1d.** The trap window ln C in [1.0761, 1.3946), 0.3185 nats
(and its custody twin [1.0761, 1.3555)), is retired: (H-sub) WEAKENED to
power pairs (H-sub-pow) with conclusions unchanged — the -02 lemma's proof
consumes pairs only at (b^k, b), the liminf half none, red-team re-read line
by line — so the record defects at (4,10) and (4,12), which are not power
pairs, stop constraining the route. New windows: [1.0033, 1.3946) trusted
(0.3913 nats), [0.9694, 1.3555) custody (0.3861 nats). The t = 2 slice is
the live sub-target, held by the TOP ATTACK's doubling entry.

**G2-STATE.** Section 0's per-fold field entry gains the partial derivation:
M_p ≈ k·W1(theta_p)·exp(−delta·theta_p/mbar), W1 the exact endpoint comb
(zero parameters), sd(ln M) 0.560 → 0.177, blind 34/37 at the second fresh
anchor sealed at 303711b — with the custody residual on record (producer-02
first exists in git 5m21s post-seal; mitigation: deterministic bands from
half-day-earlier artifacts, outcome AT the incumbent expectation 34.6, not
above). The theta-not-p claim now carries the MATCHED-CONTROL version — the
raw twin contrast 0.155-vs-0.764 is confounded (theta-sharing iff
delta-p = 2) and is superseded as evidence by the matched control (matched
non-twin rms 0.181; variance ratio 1.09 onto the theta-arithmetic). §3a
gains the doubling window as the named legal route at the exponent; §5a
gains the anchored-point floor family and plateau paragraph; the DEAD count
moves 63 → 65.

**prop-thinning-null.md §5.** "M_p is measured, not derived (the comb-weight
correlation 0.654 is a lead, not a mechanism)" is retired — the lead closed,
per mp-derivation.md §7's proposed sentence, applied WITH the empirical red
team's riders: the matched control carries the theta claim, and the four
flagged folds reduce to two above 3 (409, 631) under the formula's own PLN
variance, the flag list being exposure-noise-flattered as Poisson pulls.

**REFUTED.md, two new rows.** Mirror symmetrization as an improvement
channel at the anchored cap (gains exactly 0, structural covariance); and
K = Psi/Phi^2 as the M_p field mechanism (spans 1.009 where M-hat spans
2.28).

**Producer cosmetic, on record without editing the embedded artifact.**
`research/attack-mp-derive-01.js`'s header comment says "weighted
ln-regression"; the implemented and reproduced fit is unweighted OLS in ln
(redteam-0820-night-empirical.md §T1c). Results are internally consistent;
the wording defect rides here.

**Prereg discipline, forward.** Per the custody residual above: future
preregs seal before the measuring producer is even drafted, with a longer
gap between seal and run.

## 2026-08-21 — the two queued refits applied: A048670 to 64 terms in maxgap-law, the exponent read on all 22 trusted G2 terms

*(The deliberate integration of the drift held on 2026-08-20 ("held for the
queued refit rather than integrating a drifted number") plus the queued
22-term exponent refit. Both re-runs are formally embedded; every figure
below is from the new embedded artifacts.)*

**maxgap-law.js, A048670 extended 58 → 64 terms.** The b-file tail
a(59)..a(64) = 978, 1002, 1030, 1058, 1098, 1110 (Bozek, single-witness,
series rule) entered the array; the 58-term prefix was verified exactly
against the adopted 64-term array in `exponent-control.js` (which carried the
recorded 58/58 b-file overlap check at adoption) and the 22-term b-file
transcript in `external-ladders-01.js`. Re-embedded with the documented
`--big` invocation, 147.8 s; 30 of 1389 figures in the block moved, all of
them the S6 fits that consume the full array. The retired readings, old →
new (docs updated: `maxgap-law.md` §1/§3/§6/§8 list,
`exponent-control.md` §2, `G2-STATE.md` §3c caveat,
`two-class-lower-bounds.md` §6 caveat):

- full-ladder c1 drift beta(vs log p): −0.1280 ± 0.0366 (n 54) →
  **−0.1091 ± 0.0335** (n 60)
- top-window drift: 0.1198 ± 0.0279 (n 41) → **0.1221 ± 0.0232** (n 47);
  the headline "(log p)^{0.12 ± 0.03} on the top 41 exact terms" is now
  "(log p)^{0.12 ± 0.02} on the top 47 exact terms"
- second window: 0.1109 ± 0.0295 (n 34) → 0.1185 ± 0.0236 (n 40)
- top slice: 0.2336 ± 0.0715 (n 17) → **0.1994 ± 0.0473** (n 23)
- synthetic controls: LAW −0.0166 ± 0.0093 → −0.0152 ± 0.0083, MP
  0.9790 ± 0.0070 → 0.9808 ± 0.0063 ("recovers 0.979" → "recovers 0.981";
  "absent by a factor of 4 to 8" → "5 to 8")
- the MP growth requirement across the ladder: factor 2.33 (log p 2.40 to
  5.60) → 2.39 (2.40 to 5.74); the one-class lever: lnD 6.17 to 252 (factor
  41) → 6.17 to 286 (factor 46)
- sliding windows: two new, [179,281] = 0.219 and [197,311] = 0.166;
  "eight of the nine positive" → "ten of the eleven positive"
- **window labels corrected to true ranges**: the slices behind
  "[59,271]", "[101,271]", "[179,271]" actually start at p = 61, 97, 181
  (an off-by-one at the lower edge present since the fits were written), so
  the windows are now labelled [61,311], [97,311], [181,311], and prose
  "from p = 59 / p = 179 upward" reads "from p = 61 / p = 181 upward". No
  fitted value was affected by the labels; the slices are unchanged.

**exponent-control.js, the 22-term refit (new §S11; the pinned fits of
S1–S10 untouched as the calibration record).** The two-class exponent fitted
on all 22 trusted G2 terms (A144311, x ≤ 79) with the script's own
discipline: raw slope over p in [5, 79] (n = 20), bias read off the
control's width-20 sliding windows, bracket = [corrected − 2·window-sd, raw]
rounded outward. Old → new (docs updated: `exponent-control.md` §5/§5a/§7/§8,
`G2-STATE.md` §0 second-difficulty note, §3a table, §6.1, §8 item 3,
`THE-DIALS.md` §0 dial 2, §3 row 2, Q&A):

- raw fit, G2: 1.801 ± 0.074 (10 terms) → **1.777 ± 0.029** (22 trusted
  terms; the raw fit FELL where the control's rises with prefix length)
- control bias at matched width: +0.262 (width 10, 49 windows, sd 0.094) →
  **+0.279** (width 20, 45 windows over the 64-term control, sd 0.052;
  pinned 58-term windows give +0.281, a 0.002 difference)
- corrected central: 1.54 ± 0.09 → **1.50 ± 0.05** stat (θ-frame 1.43);
  h2's corrected 1.57 ± 0.06 is untouched (its ladder did not extend)
- practical bracket: 1.3 to 1.9 → **1.3 to 1.8**
- §6.1's residual between trusted and certificate exponents: 0.25 → 0.2;
  the prefix-shortness allowance +0.09 → +0.04 (control reads 1.245 at 22
  terms against 1.282 at 56)
- `THE-DIALS.md` §3 row 2's 2026-08-18 aside "the measured exponent is 1.70
  flat over 22 exact terms" is retired in favour of the calibrated reading
  (raw 1.78, corrected 1.50); `exponent-control.md` §8's "G2(41#), the
  thirteenth term" bullet is superseded — the bulk test ran: ten adopted
  terms moved the corrected central by −0.04, inside one window sd, so the
  question stays bias-limited
- NOT updated in this pass, still quoting the ≤37-term reading (1.54/1.57
  central, bracket 1.3–1.9): `a3-05-bound-L.md`, `discrepancy-two-class.md`,
  `GLOSSARY.md`, `FOLD-PROFILE.md`, `gate-multiplies.md`,
  `oeis-G2-submission.md`, `PRIOR-ART.md`, `README.md` (root and research),
  `sift-limit-attack.md`, `two-class-lower-bounds.md` §5b, `U-FRAME.md`,
  `ZONE-POSTULATE.md`, `paper/moire-primes.md`, `paper/beta2-note.md` — the
  brief scoped this pass to exponent-control/G2-STATE/THE-DIALS; the sweep
  of the remaining fifteen is queued

## 2026-08-21 — the queued fifteen-doc exponent sweep lands, and the census memory line tells the truth

*(The sweep the 22-term refit's entry queued above: every remaining doc that
quoted the superseded ≤37-term reading now carries 1.50 ± 0.05 central on the
22 trusted terms, practical bracket 1.3 to 1.8, h₂'s control figure 1.57 ±
0.06 untouched throughout since its ladder did not extend. Every changed
sentence was verified at the record before editing; historical and pinned
readings were left as the record.)*

**The sweep, doc by doc.** All citations point at `exponent-control.md` §5
(the 22-term refit, script §S11), in each doc's own citation style:

- `a3-05-bound-L.md` §7: the "not settled" parenthesis reads 1.50 for G2
  against 1.57 for the h2 ceiling, bracket 1.3 to 1.8 (was 1.54, 1.3 to 1.9)
- `GLOSSARY.md`, G₂ entry: measured 1.50 on the 22 trusted terms, bracket
  1.3 to 1.8 (was 1.54 on exact terms, 1.3 to 1.9)
- `FOLD-PROFILE.md`, full-tile row: α is 1.50 central on the 22 trusted
  terms (h₂ stays 1.57), bracket 1.3 to 1.8 (was 1.57 central, 1.3 to 1.9)
- `gate-multiplies.md` §0b/§7: the budget fraction is α/2 arithmetic, so the
  grid column at the calibrated central moved 1.570 → 1.500 and its fraction
  78.5% → 75.0%; prose "78% at the calibrated central 1.57" → "75% at the
  calibrated central 1.50", headroom "about 22%" → "25%". The 1.847 column is
  h2's raw fit and stands
- `oeis-G2-submission.md` (the unsent duplicate, kept current as the A144311
  proposal source): raw slope 1.777 over the twenty terms x = 5..79 against
  the 64-term control at bias +0.28, correcting to 1.50 +- 0.05, bracket
  1.3 to 1.8 (was 1.801 over ten terms, 58-term control, +0.26, 1.54 +- 0.09,
  1.3 to 1.9); the certificate-ladder sentence now names the residual 0.2
- `PRIOR-ART.md` item 1: 1.50 ± 0.05 for G₂ on the 22 trusted terms,
  bracket 1.3 to 1.8 (was 1.54 ± 0.09, 1.3 to 1.9)
- `README.md` (root): reads 1.50 on the 22 trusted terms, bracket 1.3 to 1.8
  (was 1.54 on exact terms, 1.3 to 1.9)
- `research/README.md`, script 05 row: growth exponent ~1.50, bracket
  1.3 to 1.8 (was ~1.57, 1.3 to 1.9)
- `discrepancy-two-class.md`: the max-gap channel's measured exponent 1.50,
  bracket 1.3 to 1.8 (was 1.57, 1.3 to 1.9), and the sieve-limit contrast
  "2.13 against a measured exponent ratio near 1.50" (was 1.57)
- `two-class-lower-bounds.md` §5b: the exact terms give 1.50 central on the
  22 trusted terms (h2 stays 1.57), bracket 1.3 to 1.8, and the quoting rule
  is "1.50 for `G2` itself" (was "1.57 for `G2` itself"), matching §6 and
  `G2-STATE.md` §6.1
- `U-FRAME.md` §4: G₂'s corrected reading 1.50 ± 0.05 on the 22 trusted
  terms (was 1.54 ± 0.09 on 10), central 1.50 for G₂ with h₂ at 1.57,
  bracket 1.3 to 1.8; §7's Ziller-Morack paragraph now closes "1.57 for h₂
  and 1.50 for G₂, bracket 1.3 to 1.8". The §1 pinned 58-term control record
  and the measured ratio lists stand as the record
- `ZONE-POSTULATE.md` §"two exponents": reads 1.50 on the 22 trusted terms,
  bracket 1.3 to 1.8 (was 1.54, 1.3 to 1.9); h₂'s 1.567 over 21 terms stands
- `sift-limit-attack.md`: control-corrected exponent 1.50 central on the 22
  trusted terms (h₂ 1.57), bracket 1.3 to 1.8 (was 1.57 central, 1.3 to 1.9)
- `paper/moire-primes.md` and `paper/beta2-note.md` §5: the ten-term fits
  stand untouched as each draft's original record, and each now carries a
  dated update rider stating the 22-term reading with its grade — raw
  1.777 ± 0.029, corrected central 1.50 ± 0.05 statistical with the
  systematic unquantified, bracket 1.3 to 1.8, h₂ unchanged.
  `beta2-note.md` §2's rider "have not been re-run on thirteen terms" now
  says the 22-term refit is quoted alongside the ten-term fits in §5

**The MEMORY line stops under-reporting, one file of the queued three.**
`width-repairs.md` (staging, 2026-08-21) queued the `bytes: MS * (3 + 2 * 2 *
LC)` under-report left behind by the Uint16 → Uint32 widening of `la`/`lb`.
Status per file:

- `xchan-at29-01-segmented.js`: formula corrected to `MS * (3 + 2 * 4 * LC)`
  and the two stale header comments (31 bytes per slot, 65 MB) brought to 59
  bytes per slot; re-embedded with the recorded invocation, 450.1 s. Diffed
  line by line against the previous tail: every non-timing figure identical,
  the only changed readings the seven MEMORY lines, **62.0 → 118.0 MB**, plus
  the timing-derived price predictions. The R1 reading's "on 62.0 MB" now
  says 118.0 with the repair named. The staging page's estimate of 93.0 MB
  was itself miscomputed: two lists of capacity 7 at 4 bytes on 2^21 slots
  are 59 bytes per slot, 118.0 MB, which is what the corrected line prints
- `attack-x-offset-02-profile.js`: **no repair needed and none made.** Its
  adapted census() neither computes `bytes` nor prints a MEMORY line (zero
  matches in the file), so the queued item is moot here; recorded so the
  queue does not carry it forward
- `xchan-at37-01-census.js`: still carries the old formula at line 193 and
  prints 86.0 MB (LC = 10; truth 166.0 MB by the same arithmetic). NOT
  touched: the file is the live @37 census, mid-run since this morning, and
  editing it would orphan that run's tail. It rides with the census's own
  re-embed, as the staging page already prescribes

## 2026-08-21 — the next-stretch preparation: the Z2 day integrated

## 2026-08-28 — the Z0 red teams land: one live-doc number corrected

`TODO.md` Z2: "moves the target only 2% of the measured residual" corrected to
6.6% (0.000291 against a top-band residual of 0.004414), per
`history/staging/redteam-0828-quadpoint.md` on `quadpoint-prior-art.md` §2.2,
which the sentence was quoting. The conclusion drawn from it (the drift stays
unmodelled by the u·ω(u) = 2 correction) is unchanged. Everything else the
seven 2026-08-28 red teams corrected lives in HELD staging notes and is
applied there (`applied-0828-*.md`), not here.

`TODO.md` Z6: "scored UNIFORM-CONSISTENT on all three reads; square-blindness
closes its fourth decade to 7.05e16" restated on the two reads with power,
READ-3 being vacuous (75 of 82 fractions fixed before the seal confine the
pooled mean to [0.4381, 0.5235] inside the sealed band [0.436, 0.564]), and
the decade arithmetic corrected to a factor 25 into the decade above 1e16;
per `history/staging/redteam-0828-census.md` and `applied-0828-census.md`.
The bands themselves were not moved after the seal.

`TODO.md` Z2: the capture identity now carries its window clause (half-open,
both members in [Q², Q′²); load-bearing, the loose convention breaks by +1)
and Chen's switching principle is adjacent to the identity rather than its
owner; per `history/staging/redteam-0828-quadpoint.md`. `TODO.md` Z0: the
seven-note debt of 2026-08-22 is discharged (passes and applied records
named in the item); the prereg custody residual is stated.

`TODO.md` items 1c, 10, 9 restated on the 2026-08-28 red-teamed notes: 1c does
not close (class-count-blind on x ≥ 41, significant on x ≥ 17); 10's
compressed-tail derivation is refuted and its value is not (1.074 inside the
bar); 9's "≈ 0.61, lnlnW favoured 10:1" is refuted as an inference and the
item now names the heuristic 0.45546 and its two open steps. Per
`history/staging/redteam-0828-closures.md`, `redteam-0828-varE.md` and the
matching `applied-0828-*.md`. The 0.611 in `paper/variance-note.md`,
`research/GLOSSARY.md` and `README.md` is queued, not yet edited.

`research/GLOSSARY.md` (Var/E entry): "≈ 0.611 is the live hypothesis,
favoured 10:1" replaced by the refutation-as-inference and the heuristic
0.45546 with its two open steps, per `history/staging/redteam-0828-varE.md`.

## 2026-08-28 — engine and head red-team corrections reach the live layer

`research/GLOSSARY.md`, Staircase cap: "cap_K adds the two forbidden freshness
residues" replaced by the one residue per scour prime q′ < q that can fire
(v ≢ −2 on the A side, v ≢ +2 on the B side), its void companion
v ≢ 0 (mod q′) under P⁻(m) ≥ q, the density factor ∏(1 − 1/(q′−1)), and the
mandatory scope clause that a formulation sifting for P⁻(m) ≥ q instead of
assuming it has a real second class and dimension 2. The old line was wrong as
a dimension count and, without the second sentence, would have read as
contradicting `history/staging/thm-buchstab-transfer-shallow.md` §2(c). Same
file: new entries for **twin opener**, **head** and **tail**, the head entry
naming all three senses in use (the scour head, the head window of
`attack-02-head-bias.js`, and the zone head F(p) of TODO Z4). Per
`history/staging/redteam-0828-engine.md` §1.3 and §8 item 2,
`redteam-0828-head.md` §2, `applied-0828-engine.md` §3 and
`applied-0828-head.md` §3.

`research/bv-import-survey.md` §3.1: S1's display regains the
− π(q−1; 30, ·) terms, without which the form caps fresh(q) but is not below
cap₁ (measured to exceed it at 1 of 9, 5 of 29, 16 of 105 and 60 of 396 tail
primes at @11/@13/@17/@19), and S1 now carries the hypothesis r ∈ N_x with the
full-census class lists, tail factor 8/3 and constant (3/4)·ln 2 stated for
contrast. S2's density factor ∏(1 − 2/(q_i − 1)) is corrected to
∏(1 − 1/(q_i − 1)), the survey having been the corpus's lone two-class
outlier: measured against 8 exact depth-K counts at @17 and @19 the one-class
factor is within 0.40% and the two-class factor is 5.00% to 32.37% out. What
§3.1 says S1 and S2 buy is unchanged. Per
`history/staging/thm-mod30-tail.md` D1/D2/D3, re-measured in
`redteam-0828-engine.md` §1.2, routed by `applied-0828-engine.md` §3.

`research/bv-import-survey.md` §3.2 and §3.3: the Chen-style absorption of
divisor weights is dropped, the fundamental lemma's weights satisfying
|λ_d| ≤ 1 so plain BV in its max_{y ≤ T} form suffices; the §3.2 headline is
now attributed to Theorem C of `history/staging/thm-capK-bv.md` §2 at PROVEN
short-note grade for q_K = W^{o(1)}, with the emptiness stated in the same
place (error factor below 1 only for s ≥ 10.82, first cleared at x = 263,
against s < 5 at every level reached or predicted, and no effectivity, BV's
constant being ineffective); "dimension 2 in the range (x, q_K]" becomes
dimension 1 wherever q_i < q on a sequence already carrying P⁻(m) ≥ q, with
the two exceptions named and the source's NOT AUDITED flag left standing. In
§3.3, the "remainder O(1) unconditionally and trivially" now carries the
comb-conditioning qualifier (2·3^k per Legendre term under the repo's own Comb
Discrepancy Lemma), and bullet 1's "covers the B-factor in the band where
cap-28 validated it best" is corrected to the inverse: |B − 1| < 10⁻⁵ in the
shallow band, so the payoff sits at the deep end. The same bullet gains the
second hypothesis q = T^{o(1)}. Per `thm-capK-bv.md` §0/§7,
`thm-buchstab-transfer-shallow.md` §3.2/§3.3/§4/§7 and
`redteam-0828-engine.md` §3.3/§8.

`research/certificate-engine.md`: the equidistribution ingredient's status cell
becomes "PROVEN in the shallow regime (q_K = W^{o(1)}), empty at every run
level; deep ladder open", with §2 rewritten to carry Theorem C, the three
things it does not buy, and the Tail Envelope Measurement as the only
finite-level statement; the Buchstab Transfer row and §3's box gain the second
hypothesis q = T^{o(1)}; and the Comb Discrepancy Lemma's scope cell now says
each of the 2·3^k Legendre terms is off by less than 1, so a window count is
off by at most 2·3^k, with the constant named as the trivial per-block bound
whose attained optimum is max G − min G per level. Per `thm-capK-bv.md` §2/§4/
§6, `comb-discrepancy-tight.md` Defects, `redteam-0828-engine.md` §6.5 and
`applied-0828-engine.md` §3 item 6.

`research/history/staging/destroyer-census-01.md` §6(b): R is restated as the
CONTINUUM inspection-paradox functional, with the discrete comparators a
uniform integer origin sees R + 1/2 exactly, an odd origin R + 1, and the
coprime-to-30 residues primes ≥ 7 occupy R + 2.754 at [1e7,1e8); h/R =
1.09 → 1.03 is flagged as read against a population no prime belongs to, and
h − R is given at all three nulls (5.679, 5.179, 2.925). The decomposition
itself does not move. Per `history/staging/redteam-0828-head.md` §1.2 and §2,
routed by `applied-0828-head.md` §3.

`research/README.md` row 06: "hypothesis 0.611" replaced by the
refutation-as-inference and the heuristic 0.45546 with two open steps, per
`history/staging/redteam-0828-varE.md` and `applied-0828-varE.md`.

## 2026-08-28 — the import rows 15–17 land and the lit/imports corrections reach the registries

`research/IMPORT-MAP.md`: rows 15 (the distribution of the fractional parts of
x/n and x/p), 16 (the theory of records) and 17 (repulsive point processes) are
written into §2, which ended at row 14. Row 15 lands as PUBLISHED-ANCHOR +
WALL-ADDRESS with its THEOREM column struck, not repriced: Saffari–Vaughan II
Theorem 10 reads x^{6/11+ε} < y ⩽ x, which under the row's own dictionary is
W^{1/12} < M_T ≤ √W, so the fixed-M statement has no instance and no line of
cap-36 Measurement D is upgraded. Row 16 is STALE, its experiment executed by
`record-location-null.md` and its prior-art half closed by
`lit-kourbatov-shortfall.md` the same day, leaving the wall address only. Row 17
lands as CLOSURE + PUBLISHED-ANCHOR, two-sided, with the Gibbs and Coulomb
extension withdrawn and the hyperuniformity reading demoted to sub-Poisson along
the L = y^u family. §0a, §2's preamble and the Counts paragraph are recounted to
seventeen rows, seven EXACT-IDENTITY, ten STRONG-ANALOGY, twelve CLEAN, none
UNTRIED. Per `history/staging/applied-0828-litimports.md` §5b,
`import-fracparts.md` §8, `import-repulsive.md` §7 and `import-map-rows-15-17.md`
§1, routed by `applied-0828-registries.md`.

`research/SEARCH-CONVENTIONS.md` §1: three owning-convention rows added. The
record-location deficit is Kourbatov's b coefficient of E_1 = a log(p/a) − ba,
equivalently the Gumbel mode µ*, with b ≈ 1.2597 and µ* = −1.659 for twins below
10^15 and the instruction to search b, E_1, median-unbiased and standardized
maximal gaps rather than "location parameter" or "trend load". The two-class
sifted short-interval variance is the generalized Dickman GD(θ) convention at
θ = 1 and the distribution of k-tuples of reduced residues at θ ≥ 2, carrying
the scope warning that Gorodetsky is κ = 1 only and that at θ = 2 only Aryan's
upper bound is in print, with the six calibrated channels and the four owed legs
named. The VC dimension of the two-class range space is Thomas's "VC-dimension
of a class of multiples of the primes" and Helmbold–Sloan–Warmuth's "learning
integer lattices", the latter OWED at abstract level and single-sourced through
Thomas. Per `lit-kourbatov-shortfall.md` §7, `lit-dickman-variance.md` §6.1 and
`lit-vc-multiples.md` §§0, 1, 5.

`research/history/staging/import-map-construction.md` §1, the determinantal row:
the rejection's quoted product ∏(1−2/p)/∏(1−1/p)² is replaced, because as
written its p = 2 factor makes it zero at every level. The cell now carries the
two-point inequality itself, the twin tile's failure at its first admissible
separation d = 6 with g(6) = 6∏_{5≤p≤x}(1−4/(p−2)²) = 2.661728 at x = 11, the
one-class analogue's failure at d = 2 with g₁(2) = 2∏_{2<p≤x}(1−1/(p−1)²) =
1.3535, and the fact that the field re-entered the map as row 17. The
rejection's conclusion is unchanged. Per `import-repulsive.md` §5.

`research/natal-cap-36-skeleton-door.md`, Measurement D's separate-census
sentence: the census is marked MEASURED at its nine finite levels and not
upgraded to PROVEN by anything in the corpus, with the three reasons named, that
Theorem 10 holds only on the growing window W^{1/12} < M ≤ √W, that its
exp(−C(log W/log log W)^{1/3}) saving certifies no finite level, and that it
controls one marginal while the door is joint. Per `import-fracparts.md` §6.

`research/REFUTED.md`: one row added closing the repulsive family in both signs,
the pair correlation taking the value 0 or a value at least 2.3812 and nothing
between, so no association hypothesis of either sign holds. Per
`import-repulsive.md` §2, §7.

`research/PRIOR-ART.md`, the Kourbatov–Wolf bullet: one added block recording
that the 2013 predecessor already quantifies the finite-height location
shortfall for twins, at b ≈ 1.2597 and µ* = −1.659 below 10^15, that the repo's
record-location statistic is that b, and that the deficit is documented in print
and explained in neither corpus. Per `lit-kourbatov-shortfall.md` §7.

## 2026-08-28 — Z3 executed and closed

`TODO.md` item Z3 (the QR refinement: immune offset classes in the anchored
caps) leaves the file: executed under a pre-registered statistic with a
matched control (`history/staging/attack-z3-immune-01.md`,
`research/attack-z3-immune-01.js`, 31.6 s). The surplus test was VOID by its
own control (a 0.6% ratio-of-means design bias that a control-free run would
have reported as a 6.5σ surplus), the placement test HOLD, and the immune
classes deliver exactly the guardrail's r/(r−2) and nothing past it; as a
certificate they are dominated by the QR-blind restriction. One row added to
`research/REFUTED.md`.

## 2026-08-28 — the canonical state absorbs the day (Chris: "update our internal understanding accordingly")

`README.md` §Status: dated 2026-08-28; closed-route count recounted to 67;
a new paragraph states the exponent attack's state after three days of attacks
and the five-field recon (class-blind cap, quantifier wall, equivariance wall;
the constant shift as the one non-generic structure and its three tested uses;
Z₂'s lack of a non-TPC band; what was banked). `research/G2-STATE.md` §0:
a HEURISTIC block for the diagonal Var/E closed form with its two open steps
and the refuted 0.611 inference; a conditional PROVEN block for the Face-4
barrier statement β_interval(2) ≥ 2; DEAD recounted with Z3's closure.
`paper/wall-note.md` Face 4: "no barrier result on this face" replaced by the
below-band barrier statement, with "inside the band there is still no barrier
result" kept. `paper/variance-note.md`: four sentences (abstract, §7 diagonal,
§7 closing, §7 calibration) stop asserting 0.611 as the constant and state the
control result, per `history/staging/redteam-0828-varE.md` and
`applied-0828-varE.md` §5. `paper/staircase-note.md` §7: the A-side's void
first condition gets its parenthetical, per `applied-0828-live.md`.

## 2026-08-28 — history rewritten once: the attestation tar bundles leave git

Chris lifted the push moratorium and asked for the repository on GitHub, whose
100 MB blob limit refused the attestation bundles
(`attestation/primeoire-2026-08-14-v5.tar` 227 MB, `-v4.tar` 113 MB). On his
call (option 1 of three offered) the six `attestation/*.tar` files were
removed from every commit with `git filter-repo --path-glob 'attestation/*.tar'
--invert-paths`; the `.ots` proofs, the commit logs, the README and the
screenshots stay in git, the tars stay on disk under an ignore rule and in
`~/Files/primeoire-backups/attestation-bundles/`, and the whole pre-rewrite
history is in `~/Files/primeoire-backups/pre-filter-2026-08-28.bundle`. The
OpenTimestamps proofs are unaffected: they stamp the bundles, not the commits.

Every commit from the first attestation commit onward has a new hash. The
corpus cites commit hashes as custody (sealed preregs, "producer first exists
in git N minutes after the seal"), so every cited hash was rewritten in place
from filter-repo's commit map, 169 replacements in 61 files;
the map for the cited hashes is below and the full map is in the backup
directory as `commit-map-2026-08-28.txt`. Commit ORDER and TIMESTAMPS are
unchanged, so every custody statement that reads "the seal predates the
producer by N minutes" is exactly as true as before.

| old | new | status |
|---|---|---|
| `05598bc` | `f792713` | rewritten |
| `0695a7b` | `2e95563` | rewritten |
| `11de808` | `1bc0dd8` | rewritten |
| `1e8c7fa` | `dc5a7d0` | rewritten |
| `21fca9f` | `0a7dd73` | rewritten |
| `22266c5` | `605ce83` | rewritten |
| `27f8387` | `2f6c49e` | rewritten |
| `296e54e` | `88d2287` | rewritten |
| `2c28443` | `199dd33` | rewritten |
| `2ee2dec` | `760a558` | rewritten |
| `2f32718` | `469aaa3` | rewritten |
| `391bd7a` | `1c42a16` | rewritten |
| `3ad2e6f` | `eb0f9c8` | rewritten |
| `3d60964` | `4782ef5` | rewritten |
| `3f26d19` | `7800bd2` | rewritten |
| `437a682` | `254b689` | rewritten |
| `4d8ac38` | `bf4b183` | rewritten |
| `510eee2` | `4293686` | rewritten |
| `5124260` | `b19d77d` | rewritten |
| `537bf24` | `ab34c82` | rewritten |
| `552e0d0` | `f7217ca` | rewritten |
| `564c8c9` | `1536446` | rewritten |
| `599b2f3` | `324252f` | rewritten |
| `5e0fd87` | `303711b` | rewritten |
| `5f04843` | `acbf6f2` | rewritten |
| `5fc6eba` | `f56e318` | rewritten |
| `62505b7` | `705c839` | rewritten |
| `6a06d3a` | `f345adf` | rewritten |
| `6b277f2` | `2321e40` | rewritten |
| `6c09366` | `97e2cfa` | rewritten |
| `6d57c41` | `ea8fef4` | rewritten |
| `7038e0b` | `4391c2c` | rewritten |
| `71499fd` | `5717e58` | rewritten |
| `733e25d` | `56bc30f` | rewritten |
| `76ac1fc` | `81593bf` | rewritten |
| `7800b3e` | `7800b3e` | unchanged |
| `7a390e1` | `ce90c11` | rewritten |
| `7b045c1` | `0620c0c` | rewritten |
| `7b8c17d` | `9d822f4` | rewritten |
| `8274bc3` | `4636f31` | rewritten |
| `8fa01be` | `f7dc206` | rewritten |
| `9914e01` | `27dc709` | rewritten |
| `9c01c42` | `b1fdd8e` | rewritten |
| `9f9a9dc` | `7b36f78` | rewritten |
| `a1cd7f3` | `3902944` | rewritten |
| `a458f3a` | `552143c` | rewritten |
| `acc07f9` | `cdd753c` | rewritten |
| `b053150` | `7e6e49f` | rewritten |
| `b4ba3da` | `f34e5c0` | rewritten |
| `b5c7628` | `6c49f5f` | rewritten |
| `b9a73e2` | `3f0ccd6` | rewritten |
| `bbe9434` | `5c1ac06` | rewritten |
| `c91d880` | `fa087d3` | rewritten |
| `cf0b76a` | `25e961c` | rewritten |
| `d44ebd3` | `f466a68` | rewritten |
| `d9b200d` | `d6c5a9b` | rewritten |
| `e16d90f` | `a24fc09` | rewritten |
| `e3395bc` | `ab8934f` | rewritten |
| `ec74acb` | `50f0307` | rewritten |
| `f4d8c33` | `b3c340e` | rewritten |
| `f4fb5fb` | `cde163a` | rewritten |
| `f759c15` | `4a9037f` | rewritten |
| `f7dbf92` | `02b773d` | rewritten |
| `fed50d8` | `f0eb201` | rewritten |

## 2026-08-28 — queue0827 applied

> **2026-08-28 — the 2026-08-27 drafted corrections applied.** Eighteen edit entries
> across six files, from six HELD notes drafted the previous day and never applied. The load-bearing
> one is Wu's savings function: `attack-lichtman-decomp.md` §4.2 had inferred that the
> printed "(2.1)" was a band label and the intended argument `2.0`, and had read the
> resulting agreement as 2004 saturating the function. Wu's own p. 32 prints
> `H(2.1) ⩾ 0.0287118` at argument 2.1, Lichtman's band `2.0 ⩽ t ⩽ 2.1` carries that
> value, and the disconfirming arithmetic used the neighbouring band; the value is a
> numerical lower bound from a discretisation, so "2004 saturated parity permeability"
> is unsupported and is replaced throughout that note by "the standing record at
> `θ = 4/7`, a lower bound with no upper bound known at any level". No live document
> repeated the claim. `quadpoint-prior-art.md` closes its Evans item, corrects its
> §2.3 "sub-case `u < 3`" and rewords its proposed PRIOR-ART row.
> `quadpoint-identity-01.md` §3 gains the corrected asymptote `1/u* = 0.280438` in place
> of `1/(2e^γ) = 0.280730`, κ's name in the literature's notation, and a §6 bullet stating
> the finite-size drift as explained at scratchpad grade in two notes rather than as a
> fact; the two notes' forward forecasts disagree at the first anchor (313 against 317)
> and neither may be sealed. `attack-obstruction-audit.md` §2.1's exemption argument is
> corrected: the primality-detection step is not an escape Tao names, and the reason that
> survives at source is extensionality, which exempts the bare tile statement and not the
> zone form; §6's 403 hole is closed as read-at-source and half-answered.
> `paper/wall-note.md` gains the finite-periodic address at the head of §2, a paragraph
> separating the three 2s in Face 1, and Tao's own pricing of the infinitely-often
> weakening. `research/bv-import-survey.md`'s rotation-averaging paragraph is softened:
> the moments are the deep ensemble's product measure, the W-member phase set is a
> diagonal inside it whose measured variance is 1.36× at @11 and 6.87× at @13. Six
> proposals declined: two on ownership, one because the brief forbids promoting its
> note, one already carried in paraphrase, one on an unverified inferred theta-law, and
> one because two scratchpad notes disagree on the number. No exponent, constant or route status moved, and no embedded producer ran.
> Record: `history/staging/applied-0828-queue0827.md`.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md` for the
corpus rule.*

## 2026-08-28 — registries2 applied

*(For `research/history/CHANGELOG.md`, appended by the primary agent. Not
written by this pass.)*

> **2026-08-28, registries, second pass.** The convention and import registries
> take the corrections the first pass left at the door.
> `research/SEARCH-CONVENTIONS.md` §1 gains four owning-convention rows: the
> rough-pair census as a two-point correlation of `χ₀ mod y#`, whose owning side
> is pretentious multiplicative functions and whose Chowla / Elliott side is
> recorded as a guaranteed-and-worthless negative
> (`history/staging/import-entropy-decrement.md` §9); the Bonferroni depth
> truncation as a low-degree function on the CRT product, with the equivariance
> reason no theorem in that field reaches the anchor
> (`import-boolean-analysis.md` §4); the set relaxation `τ_set` as covering a
> finite abelian group by translates, with the Rogers–Stein bound and A144311 as
> the interval case (`import-vc-nets.md` §§4, 8); and the fractional parts of
> `N/n` and `N/p` as Saffari–Vaughan's `Θ*`, with the range condition that
> strikes map row 15's THEOREM column (`import-fracparts.md` §6). All four
> record that no search has been run in the named convention. §3 gains the five
> searches-already-run rows drafted at `lit-dickman-variance.md` §6.2. One
> escaped pipe in the variance row added earlier the same day was hiding "the
> distribution of `k`-tuples of reduced residues" from the gate's parser and is
> removed; the parsed vocabulary reads 100 owning conventions against 83 before,
> and `search-convention` stays at 0 findings.
> `history/staging/import-rough-anatomy.md` has its comparand corrected in four
> places: Gorodetsky's `λ` is the one-class `λ₁` and the census's comparand is
> `λ₂`, so the recorded 12–23× mismatch becomes 2.11 to 2.86× against the
> like-for-like `λ₁` figures 13.9 and 25.2, the 22.7 is a six-band maximum on
> another band and not the comparand, and the shrinkage of 6.6 to 8.8× does not
> close the gap (`lit-dickman-variance.md` §§0, 4, 6.3; `λ₂` values
> `[SCRATCHPAD-GRADE]`). `lit-dickman-variance.md` §6.3's "IMPORT-MAP row 15" is
> disambiguated: it means the row numbered 15 in `import-rough-anatomy.md` §8.1,
> drafted and never applied, not the live map's fractional-parts row.
> `research/IMPORT-MAP.md` §2's Counts paragraph is recounted: the circularity
> tallies summed to fifteen and omitted row 14's split cell, and the payoff
> tallies had missed row 14 entirely while counting row 16's negated
> DERIVED-CONSTANT, so they now read three THEOREM, four DERIVED-CONSTANT, ten
> WALL-ADDRESS, six PUBLISHED-ANCHOR, four CLOSURE, with row 15's struck THEOREM
> noted as an as-first-priced fourth. The seventeen-row, seven EXACT-IDENTITY,
> ten STRONG-ANALOGY and twelve CLEAN figures were verified against the table and
> stand. `research/REFUTED.md` was checked and needed no edit: today's two rows
> carry the right five columns and the file has no count sentence.
> Record: `history/staging/applied-0828-registries2.md`.

---

*This document states current understanding at 2026-08-28. The source notes
remain HELD. Nothing here was measured; every figure is carried from the note
named beside it.*

## 2026-08-28 — the hyperuniformity conflation leaves the vocabulary

`research/GLOSSARY.md`: the Hyperuniformity entry is split in two. The
quantitative content, the sub-Poisson window counts with Var/E drifting
0.152 → 0.396 across @7..@37, the extremal-excess law E = 0.97·σ(ℓ)·√(2ln(W/ℓ)),
the two ladders, the refuted 0.611 fit inference and the HEURISTIC limit
0.45546, keeps its text under the new term **Sub-Poisson window counts
(Var/E)**. A new **Hyperuniformity** entry carries Torquato's definition
(the structure factor vanishing at zero wavenumber) and the class I/II/III
taxonomy by the growth of Var[N_L], cited to Physics Reports 745 (2018) 1–95
read at arXiv:1801.06924 and by ITS pages, eq. (14) p. 10, §5.3 p. 23, §5.5
p. 28 and eq. (252) p. 78, with the entry stating that the journal pagination
differs. It records that the tile is periodic with period W, so Var[N_L] is
W-periodic and Var[N_W] = 0 exactly, which makes every level class I by
periodicity alone, PROVEN and arithmetically empty since no live document
reasons about a window longer than one period; and that at L = y^u with u fixed
the twin-slot count variance is linear in L with Var/E between 0.152 and 0.396,
which is sub-Poisson and NOT hyperuniform, MEASURED, and is a statement about
the diagonal family of configurations rather than a class for any one tile. The
effective-hyperuniformity fallback S(0)/S(k_peak) ≲ 10⁻⁴ fails at order 10⁻¹ to
10⁰. Per `history/staging/import-repulsive.md` §3 and
`redteam-0828-litimports.md` §7b, §7d, routed by
`applied-0828-glossary.md`.

`research/history/staging/excess-chain-c.md`, §1(ii) and §2: "the extreme-value
law of a hyperuniform field" becomes "of a sub-Poisson field", and "Var(W) = 0
identically, so the field is hyperuniform" is replaced by the periodicity
reading, that Var(W) = 0 makes σ²(l) W-periodic and puts the field in class I
vacuously, with the counts at the window scales read there being sub-Poisson.
The note's verdict on c is unchanged. Per `import-repulsive.md` §3.

Not applied, and listed with their replacement sentences at
`applied-0828-glossary.md` §2: nine further loose uses of the word in
`research/G2-STATE.md`, `research/FOLD-PROFILE.md`,
`research/discrepancy-two-class.md`, `research/level-ledger-tight.md`,
`research/maier-matrix.md`, `research/origin-excess.md`,
`research/sift-limit-attack.md`, `paper/wall-note.md` and the generated
`research/SCRIPTS.md`, plus eighteen in seven scripts whose embedded OUTPUT
blocks mirror them. `research/history/staging/import-map-rows-15-17.md` is left as written
because it is row 17's pre-registration.

## 2026-08-28 — TODO.md pruned to its charter after the proof-shaped wave

*(Curation pass under the forward-only charter, run against
`research/QUESTIONS.md` §1 as it stood at the end of the 2026-08-28 wave. No
claim changed rung and no live question was dropped; what left is attempted
material whose records already carry it. TODO.md went from 552 lines to 591,
the growth being the executed verdicts that replaced the executed moves.
Record: `research/history/staging/applied-0828-todo-prune.md`.)*

- **TODO item 11 (three NOW-provable BV prizes) left the file.** All three are
  written as theorems and all three are EMPTY in every computable range
  (`thm-mod30-tail.md`, `thm-capK-bv.md`; S2's freshness factor corrected to
  one class per prime; cap_K needs s ≥ 10.82, first cleared at x = 263).
- **TODO item 10 (pin the excess chain's c → 1.074) left the file.** The
  compressed-tail correction is REFUTED as the mechanism and the value is not:
  c = 1.05 ± 0.06 MEASURED on x = 17..31 (`excess-chain-c.md`). The item's own
  remaining move was "a mechanism that is not a tail compression, or nothing".
- **TODO item 1c (why does c₂′ drift) left the live queue for Parked.**
  Executed and absorbed, not closed: the 22-term refit is done, the question
  is PARTIAL (`c2prime-refit-22.md`, `attack-c2drift-01.md` §3), and the only
  move left needs 47#, already parked to paper phase.
- **TODO item 1e left the file**, as its own body instructed on 2026-08-27.
- **TODO item Z5b (the fold ledger) left the file, absorbed into Z2.** Its
  stated open question is ANSWERED with fourteen forced constraints
  (`fold-ledger-forced.md`) and what remains, bounding the short-window
  fluctuation below the mean at every fold, IS the postulate by the item's own
  sentence, so it is not a separate front. The three embedded producers keep a
  pointer inside Z2.
- **Nine items restated on what remains**, with each executed first move
  replaced by its verdict at the rung its note gives it: Z2 (Evans read, depth
  axis relabelled as answered, blind test the only move left), Z4 (head half
  ran, PARTIAL, mod-30 mechanism NO), Z5 (restated on Kourbatov's published
  b = 1.2597; first move is to pin b, the two in-house estimators differing by
  15%), Z6 (76–82 scored, SEC C2 replication remains), Z7 (item 3 is the tail
  field, item 4 names item X), Z0 (cadence rule only, custody residual kept as
  a standing exposure), 0 (⟨ρ²⟩ executed 2026-08-21, six no-route recon
  findings named, exact Λ at z = 31/37 the one move left), 1d (legal zone
  CORRECTED to the trusted [1.3946, 11.3568); explicit-K route CLOSED by three
  mechanisms), 4 (row 15's THEOREM void), 8 (retitled to the deep-ladder
  transfer; shallow half proven and empty; part (c) answered as the trivial
  per-block bound).
- **TODO item A's cross-reference corrected.** "The zone-side transplant
  (Z1–Z3)" now reads Z2 alone: Z1 executed 2026-08-22, Z3 retired with its QR
  refinement CLOSED (`REFUTED.md`).
- **TODO's moratorium block, git bullet rewritten.** The three push layers
  were lifted by Chris on 2026-08-28 and the repository is on GitHub, both
  branches at the same commit; pushing is routine, and the publication
  moratorium on arXiv, OEIS and the papers stands until Chris says otherwise.
- **Owed by this pass and not applied by it:** eleven notes whose `todo:` line
  names a retired item need `<id> (retired)`, listed in §3 of the record file.
  Until they are made, `node research/qc.js ledger` fails on those eleven.

## 2026-08-28 — the question ledger is complete: 410 notes indexed, none left by title

Four backfill passes (`history/staging/applied-0828-backfill-{1,2,3,4}.md`) put a
`<!-- ledger -->` block on every one of the 342 legacy notes and working
documents that had none, plus `research/GLOSSARY.md` as a registry
(`Q-registry-glossary`); registries carry `Q-registry-<name>` blocks and the
header of `research/qc/questions.js` now says so. Chained notes (a note, its
prereg, its verify or red-team record) share one id with identical question
text; eight chains whose two halves had been worded differently were merged onto
the main note's wording. `research/QUESTIONS.md` regenerates to 388 questions
from 410 indexed notes with no unindexed section, and every TODO item
acknowledges the legacy questions attacked under it (33 ids added to twelve
items' `Ledger:` lines). The `ledger` check reads zero. Two loose citations
surfaced by the prune were restored: `research/fold-ledger-02-derive.js` and
`-03-iterate.js` are named in full inside TODO Z2, and two quotations in the
new SEARCH-CONVENTIONS fractional-parts row were repaired (one rephrased to a
phrase `import-fracparts.md` carries, one demoted to a plain search term).

## 2026-08-28 — the Var/E closed form: the model half becomes a theorem, the identification half stays open

Chris's cleanup direction, "close the two Var/E steps". Step 2, the decoupled
model's own limit theorem, is PROVEN (`history/staging/varE-limit-theorem.md`,
producer embedded): ln n/ln y → GD(2) by a direct Laplace-transform argument
with rate O(lnln y/ln y), E[g] → λ₂(u) with no correction term (the n | L
conductors vanish exactly, the transition band dies by weak convergence and a
bounded density), and the n < L band the red team had flagged as unevaluated
is exact at nine levels, 0.063/ln y. Step 1, the θ = 2 mean-coefficient
replacement, stays open (`varE-theta2-proof.md`): two of its three groups
close unconditionally, and the CRT-mixed lags reduce by an exact identity to
a divisor-distribution statement about y-smooth divisors of C(C²−4) above
2L, so no exponential-sum bound applies. `research/varE-exact-ladder-01.js`
(42 min) extends the exact ratios to x = 29, 31 (1.000725, 1.000471, the
scaled error still bounded and falling) and confirms the x = 41 model value.
`README.md` §Status, `research/G2-STATE.md` §0, `research/GLOSSARY.md` and
`TODO.md` item 9 now say one step open, not two; `varE-spectral.md` §6a's
model value at x = 37 corrected from 0.39643 to 0.39566 (three witnesses).
0.45546 remains HEURISTIC as a statement about the true variance.

## 2026-08-28 — the two-class lower bound has a refereeable draft

`paper/kk-lower-bound.md` written (about 10,200 words): the CRT covering
identity, the free transfer, the y ln y chain from published ingredients as
Theorem A with its own proof, the Kalmynin–Konyagin substitution as Theorem B
with every consumed hypothesis discharged and the y₀ = 10^{134.1} floor
derived, what the bound does not do, a falsification table, references with
per-item verification levels (five [MEMORY] items footnoted), and a
provenance appendix tracing every number to a corpus file or a page. Record
`history/staging/paper-kk-draft.md` (30-row claim-to-source table). Registry:
`prop-xlnx-lower-bound.md` regraded PROPOSAL → QUICK-DRAFT (its first trigger
fired); `PROPOSALS.md` and `two-class-lower-bounds.md` §4c and `G2-STATE.md`
§3a point at the draft of record. Left for Chris: whether the note folds into
Paper II or stands as Paper V (`PAPERS.md`), and the house-style question the
draft raised, since `writing-style-math.md` §3 permits the authorial "we" that
his prose guide forbids; the draft is written impersonally.

## 2026-08-28 — Paper III restructured around the proven model theorem

For `research/history/CHANGELOG.md`, to be appended by whoever runs the commit:

> ## 2026-08-28 — Paper III restructured around the model limit theorem
>
> `paper/variance-note.md` §§1–5 are unchanged. Its second half now states what
> is established, at its rung, in four sections. §8 is the exact spectral form
> on the diagonal: Var/E = δX, δ ln²W → 16C₂e^{−2γ}/3 = 1.109905, and the
> Montgomery–Soundararajan main term equal to L prime by prime, so all of Var/E
> is discrepancy and that route has no main term to extract (PROVEN). §9 states
> the decoupled model and proves its limit theorem: ln n/ln y → GD(2) with an
> explicit transform rate, E[g] → λ₂(u) with no correction term, both
> transition bands O(1/ln y), and the closed form
> λ₂(2) = 1 − e^{−2γ}(9/2 − 4 ln 2) = 0.45546, with the θ = 1 case an identity
> with Gorodetsky's λ(u) (Math. Z. 308 (2024) no. 4, Paper 59). §10 states the
> identification of the true variance with the model as Conjecture 1,
> δ(X − X_dec) → 0, with the exact ratios at eight levels (1.000471 at x = 31),
> two of three lag groups closed unconditionally, and the third reduced to a
> divisor-distribution statement about y-smooth divisors of C(C²−4) that has
> not been searched in the Ford/Hooley convention. §11 keeps the refutation of
> the 0.611 fit inference as a calibration paragraph. The abstract and §6's
> open question are rewritten to match, and §7's "u = ln L/ln y = 2 exactly" is
> corrected to "2 in the limit" with the nine computed values. What left the
> live layer: §7's fit tables and the reading that the open question was "down
> to one constant, near 0.611". Record:
> `research/history/staging/paper-iii-restructure.md`.

## 2026-08-28 — Z6 executed and retired

`TODO.md` item Z6 leaves the file under its charter: its one remaining move,
the SEC C2 conditional-null offset replication on q ∈ [10⁴, 3.16·10⁴], ran
with a pre-registered statistic and a matched control
(`research/records-placement-02.js`, 4.9 s;
`history/staging/records-placement-02.md`): HOLD, per-prime χ²/df 0.31–1.11
against envelopes 2.0–3.2 derived from the exact null's covariance, control
inside its own envelopes, zero forbidden-class openers, both families below
the null mean. The prereg is unsealed (no commit in that session) and one
registered sub-band clause was biased by construction and never reached; both
are disclosed in the note.

## 2026-08-28 — two un-measured objects measured: the tail field and the tile's gap spectrum

Chris's direction, "bark up the most un-researched computed opportunities",
under the four-hour rule and with every test pre-registered before its
numbers. `research/zone-tail-01.js` (1.0 s; `history/staging/zone-tail-01.md`):
the first per-zone tail dataset, 1,225 zones. c_tail = 0.7771 ln²(p′²) at
[3163, 10⁴) against the head's 0.6693 ln²p on the same zones; the band drift
0.752 → 0.729 → 0.777 fails the registered ≤ 0.03 step, so this is band
composition and not a law; the "four times the head" is the unit
ln²(p′²) = 4 ln²p; the frozen-sieve identification is 100% at the zone's own
level (the Zone Restriction Lemma restated) and 98.69% one fold back; R0
asserted at every zone with shares head/Z₂/tail 1.82/89.72/8.46%, the tail's
falling. `research/gap-spectrum-01.js` (22 min, full period @5..@31;
`history/staging/gap-spectrum-01.md`): the complete gap-length distribution
of twin slots at nine exact levels, calibrated by A059861, the period sum and
the ladder's G₂ at every level; the excess-length functional |B_N| with the
identity G₂ ≤ N + |B_N|; and the empirical sifting curve. The tail is LIGHTER
than a renewal process at every level (power law refuted, exponential refuted
steep, a cut-off that survives but is not clean at @31), the renewal maximum
overshoots G₂ by 2.1–2.2×, and the onset ln G₂/ln x reads 1.63–1.70 flat over
x = 13..31. Neither measurement moves an exponent.

## 2026-08-28 — item 0's named cheap data run: exact Λ and sup|ρ̃| to z = 37

`research/rho-exact-z31-01.js` (115 min; `history/staging/rho-exact-z31-01.md`):
the exact Λ and the exact sup|ρ̃| over complete periods at z = 13..37, the
z = 31 and 37 points having existed nowhere. Λ(31) = 476.314, Λ(37) = 1286.338,
sup|ρ̃| = 28.122 and 52.219. The MV(α) slope moves from 4.2144 ± 0.3039 on
five points (the standing figure, reproduced) to 4.5656 ± 0.2173 on seven, so
β₂ = 4.26645 leaves the one-s.e. bar from below by 1.38 s.e. and stays inside
the two-s.e. bar; dropping z = 37 alone returns it inside. Pre-registered
Outcome C: a weak MEASURED tension with the weakest sufficient form of the
maximal law, never a refutation of an asymptotic statement. The object itself
grows at 2.766 ± 0.212, one and a half exponents under β₂; MV exceeds β₂
because the ℓ¹ accounting bleeds z^{1.80}. The TPC-implying sharp form is dead
at both new levels; the legal Gaussian ρ law holds at both. Recorded, not
applied: phase1-T4-maximal-law.md §4 says "none" at z = 29 where the dense
scan finds 201 failing H; that producer was never committed.
