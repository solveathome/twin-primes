# The @37 prereg scored: every registered candidate is killed, the number survives an independent recount, and the offset question is replaced by a larger one

<!-- ledger
id: Q-xchan-at37-score
status: ANSWERED
todo: X
question: What does the @37 census say about the sealed X-channel offset pre-registration?
verdict: The census measured 1 - J = 0.020823, below every registered prediction, so scored exactly as registered every one of the seven candidates dies at |z| = 104 to 122 and the survivor set is EMPTY, an outcome the sealed prereg has no consequence clause for; the number itself survives an independent recount on a different marking scheme, and the offset question is replaced by a larger one.
-->

*(2026-08-21. HELD for one adversarial pass before anything downstream quotes
it. Scores the SEALED pre-registration
[xchan-at37-offset-prereg.md](xchan-at37-offset-prereg.md) (committed alone at
`0a7dd73`) against the @37 census `research/xchan-at37-01-census.js` (embedded
2026-08-21, 21354.0 s, out-sha256 `6d83c928…`), then verifies the surprising
number with an independent implementation,
`research/xchan-at37-02-verify.js` (formally embedded, 335.1 s). Every figure
below is from an embedded OUTPUT block or one-line arithmetic on figures in
one, inputs shown. Grades are explicit throughout: MEASURED, REGISTERED
VERDICT, INTERPRETATION.)*

## Verdict

**The census measured 1 − J = 0.020823 at @37 — below every prediction the
prereg registered. Scored exactly as registered (z on the run's own
slot-clustered σ, |z| > 3 kills), every one of the seven candidates dies, at
|z| = 104–122; the attack-sigma31 calibration bracket [0.745, 2.293] moves
the weakest reading to 45σ and changes no verdict. The survivor set is EMPTY
— an outcome the sealed prereg has no consequence clause for. And the number
is right: an independent implementation (different marking scheme,
prime-value divisor lists, BigInt-exact U and classification samples), gated
byte-exact on the full @23 period against the natal-cap-39 reference, agrees
with the producer's own kernel field-for-field — all 17 compared fields EQUAL
— on the contiguous prefix [0, 3e10) of the @37 period. The offset the
prereg was built to adjudicate (a ~1.2e−4 flat absolute residual) is gone as
a question: the residual at @37 is 1.04e−3 — nine times larger, 13.4·S₃,
below the entire finite-level-correction family including both members
already refuted at @31 for subtracting too much.** What stands, what died,
and what it means:

1. **[REGISTERED VERDICT] All seven candidates KILLED; no clause fires.** The
   prereg's three consequence clauses each presuppose at least one survivor;
   none is met. The J-band clause (J outside (0.94, 1.00] ⇒ "the object
   changed") does NOT fire: J = 0.979177. P1 (aligned super-W = 0): HIT. The
   validation gate: @23 ALL PASS, @31 reproduced digit-exact — the value is
   reportable under the prereg's own §3.
2. **[MEASURED] The instrument's error-bar model held; the world moved.** The
   run's own σ_slot = 8.511e−6 sits inside the prereg's projection band
   [8.44e−6, 8.64e−6], and the exact tail mass (0.070749) equals the
   registered arithmetic. Nothing about the σ machinery failed — the
   measurement fell 122 of those σ outside the nearest registered candidate.
3. **[MEASURED] The recount agrees exactly.** Slot count, B3 four-way split,
   sub/sup per class, per-slot subtotals ΣX/ΣX², maxima: all EQUAL between
   the independent walker and the producer's unmodified kernel on the same
   range. The 2^53 close calls are audited exact in BigInt (C(K,3) at 86.5%
   of 2^53; the producer never forms q₁q₂q₃ — its U-test compares
   q₁q₂ ≤ y² = 7.42e12 = 0.08% of 2^53).
4. **[INTERPRETATION] At least one of the two structural trends bends hard at
   @37.** Under item-x-offset's surplus/deficit split, the measured net
   forces either the sieve-deficit ratio D/4S₂ to fall 1.18 → 1.15 → ~1.09,
   or the line bias β to stop decaying (β/S₃ jumping ~41 → 48–57). No @37
   line census exists, so the split is one equation in two unknowns — the
   line ensemble at @37 is now the decisive missing instrument.
5. **[INTERPRETATION] The "asymptote exactly 4" reading dies in its monotone
   form; the ~3.8 law survives only as a ≈5% scale law.** Measured (1−J)/F:
   3.8242 (@29), 3.8427 (@31), 3.6907 (@37) — the approach to 4 reverses,
   with a one-level drop 4× the size of the prior two-level climb.

## 1. The registered score

The statistic, the σ, and the rule are the prereg's §3, verbatim: z_c =
((1−J)_meas − pred_c)/σ_slot on the run's own slot-clustered σ; |z_c| > 3
KILLED. Measured (census OUTPUT block): obs = 60,388,809,837,
CRT = 61,673,023,269.22, 1 − J = 0.020823 (exact 0.020822936),
σ_reg = 3.9846e−6, σ_slot = σ_reg × 2.136 = 8.5111e−6 (prints as the block's
rounded 0.000009; inside the prereg's projection band). Scoring table, from
the embedded OUTPUT of `research/xchan-at37-02-verify.js`:

| candidate | registered 1−J(37) | z (σ_slot) | registered verdict | at the @31 calibration bracket [0.745, 2.293] |
|---|---|---|---|---|
| N1 `4S₂` | 0.021863 | **−122.2** | KILLED | reads −53.3 to −164.0 — verdict unchanged |
| C1 `4S₂ − S₃` | 0.021785 | −113.0 | KILLED | −49.3 to −151.7 — unchanged |
| C2 `4S₂ − 2S₃` | 0.021707 | −103.9 | KILLED | −45.3 to −139.4 — unchanged |
| M-mult | 0.021759 | −110.0 | KILLED | −48.0 to −147.6 — unchanged |
| M-abs | 0.021744 | −108.2 | KILLED | −47.2 to −145.3 — unchanged |
| M-cS3 | 0.021770 | −111.3 | KILLED | −48.5 to −149.4 — unchanged |
| M-ln | 0.021772 | −111.5 | KILLED | −48.6 to −149.7 — unchanged |

**FAMILY VERDICT: no survivors.** For context only (already REFUTED at @31
and not carried by the prereg): C4 scores −85.7 and C8 −51.6 — the measured
point sits below the entire priced family, including the members killed at
@31 for subtracting too much.

Registered secondaries: **P1 HIT** (aligned super-W obs = 0). **The J-band
clause does not fire** (J = 0.979177 ∈ (0.94, 1.00]). **Gate PASS** (@23
reference ALL PASS — 14 integers + 3 rounded reals; the @31 blind row
reproduced to the digit: obs 1653241687, 1−J 0.024666, z(slot) −2.32,
d −0.48%). **N̄ counted = formula** (145,286,237,250). **Missing mass =
0.070749**, equal to the registered exact value
(`research/attack-x-offset-01-terms.js`). **The line-bias secondary was not
run** — the census is the natal producer only, and the prereg registered the
line ensemble as deferrable (3–5× the natal cost); there is no β(37) to
read, and §3 below feels its absence. Orientation symmetry holds:
(2,1) − (1,2) = −41185 of 6.04e10, −0.2·√obs.

### What the prereg prescribes for this outcome, checked against its wording

Prereg §3 defines KILLED/ALIVE per candidate and says "the family verdict
names every survivor, sorted by |z_c|" — an empty survivor list is
representable, and this file records exactly that. But its three consequence
clauses are each conditioned on a survivor pattern ("if N1 survives…", "if
N1 is killed and at least one shrinking-family member survives…", "if only
M-abs survives…"): none is met. The one registered catch-all for a wild
value — the J-band clause — does not fire, because J stayed inside
(0.94, 1.00]. **The sealed prereg therefore prescribes nothing for this
outcome beyond what is recorded above.** TODO item X's offset clause cannot
be updated under any registered branch; a fresh proposal is in §5, and it is
a proposal only.

## 2. The independent recount — the number is right

*Producer: `research/xchan-at37-02-verify.js`, formally embedded (335.1 s).
The discrepancy to the standing law N1 is 0.106% of obs
(6.4e7 of 6.04e10 triples; 0.090% to the nearest candidate, C2), so a
range-restricted recount resolves it; the
range was priced by pilot before the run (predicted ~208 s + ~90 s, measured
251.4 s + 81.9 s).*

**Independence, by construction.** The verifier shares no kernel with the
producer: marking is by direct multiple-enumeration in v-space (walk every
multiple of every prime, classify by m mod 30 tracked incrementally — no CRT
residues, no modular inverse, no compressed-index stride); the per-slot
divisor lists store the PRIME VALUE in Uint32, not an index into a prime
array, so the index-alias class of the repaired 2026-08-21 census defect
cannot exist in it; U[q] = ⌊W/q⌋ comes from BigInt division; a deterministic
1-in-2^20 sample of triple classifications is re-decided in BigInt as
q₁q₂q₃ vs W. Its prime list and level constants are rebuilt from scratch and
checked (K = 198274, y = 2724079, W and N̄ recomputed in BigInt).

**Gates.** [MEASURED] On the full @23 period both the independent engine and
the producer's kernel — loaded unmodified from its file at run time and
range-restricted through W, which `census()` reads only as kmax = W/30 —
reproduce the natal-cap-39 reference on all 11 compared figures: ALL PASS,
twice.

**The recount.** [MEASURED] On the contiguous prefix [0, 3e10) — 0.4043% of
the @37 period — the two implementations agree EXACTLY on all 17 compared
fields: natal slot count 587,352,241; the B3 four-way split; all four sub-W
classes; all four super-W classes (both aligned classes 0 — P1 holds on the
prefix); the per-slot subtotals ΣX = 244,865,942 (the prefix's mixed
super-W obs) and ΣX²; and both divisor-list maxima. 1753 sampled BigInt
classification re-decisions: 0 disagree. The U-table audit: all 198,274
producer entries equal the BigInt floor. The prefix's obs density sits 0.30%
above the full-period average (informative; density varies along the line).

**The 2^53 audit the width lesson demanded.** [MEASURED] C(K,3) =
1,299,090,727,729,024 in BigInt equals the printed figure, and the float
path is exact — K(K−1)(K−2) = 7.79e15 is 86.5% of 2^53 and still below it.
Triple-product formation: the producer never multiplies three primes; its
U-test compares q₁q₂ against ⌊W/q₃⌋, and max q₁q₂ ≤ y² = 7.42e12 = 0.08% of
2^53. The verifier's own accumulators peak at 8.9e−6% of 2^53.

**RECOUNT VERDICT: byte-exact agreement on the prefix — the counting is
right and 1 − J = 0.020823 stands.** What the prefix does not certify: a
defect expressed only beyond 3e10 of the walk. No position-scaled container
in the producer crosses 2^53 before @43 (the width-sweep table plus the
audit above), so the residual exposure is the one every full-period count
carries.

## 3. Interpretation, through the surplus/deficit split

*Everything here is INTERPRETATION over MEASURED anchors; grades marked.
The anchors (census OUTPUT; `attack-x-offset-01-terms.js` OUTPUT; ratios are
one-line arithmetic on them, inputs shown):*

| x | 4S₂ | measured 1−J | Δ = 4S₂−(1−J) | d | Δ/S₃ | (1−J)/F |
|---|---|---|---|---|---|---|
| 23 | 0.033678 | 0.034068 | −3.90e−4 | +1.16% | — | 3.8630 (noisy level) |
| 29 | 0.028943 | 0.028823 | +1.20e−4 | −0.41% | 0.92 | 3.8242 |
| 31 | 0.024784 | 0.024666 | +1.19e−4 | −0.48% | 1.21 | 3.8427 |
| 37 | 0.021863 | 0.020823 | **+1.04e−3** | **−4.76%** | **13.4** | **3.6907** |

**[MEASURED] The offset stopped being an offset.** Two sharp levels carried
the same absolute residual (~1.19e−4); @37's is 8.8× larger. A correction
family built to shrink (S₃-scale) or stay flat (constant absolute) cannot
follow a residual that grows nine-fold in one level while its own scale
falls.

**[INTERPRETATION] Through item-x-offset's decomposition.** The natal J is
the net of a positive, decaying lattice-line surplus (β = J_line − 1 = 9.88,
7.44, 5.38, 4.03 e−3 over @19..@31; β/S₃ = 39–43, a sighting) and a deeper
sieve deficit (D = 1 − J/J_line = 1.18× and 1.15× 4S₂ at @29/@31). The @37
run measured only the net: one equation, two unknowns.

- If β continues the β/S₃ ≈ 39–43 sighting (S₃(37) = 7.78e−5), then
  β(37) ≈ 3.04–3.35e−3 and the implied deficit is D = 0.0238–0.0241, i.e.
  D/4S₂ ≈ 1.09–1.10: the sieve deficit's excess over 4S₂ would be collapsing
  (1.18 → 1.15 → ~1.09).
- If instead D/4S₂ eases along its prior trend to 1.12–1.15, the implied
  β(37) is 3.76–4.43e−3, i.e. β/S₃ = 48–57: the line bias's decay stalls or
  reverses.

Either the deficit ratio or the β decay breaks trend; the measured net
cannot say which. **The @37 line ensemble is now the decisive missing
measurement** (registered as deferrable in the prereg at 3–5× the natal
cost, ~17–29 h on the existing instrument).

**[INTERPRETATION] A mechanism with the right sign, growth and provenance is
already on the record.** item-x-offset §6b DERIVED the cofactor-one surplus:
natal enrichment of the far-super-W layers by ∏_{p≤x} p/(p−1) → e^γ ln x — a
surplus component that GROWS with the level, pushes J up against the bulk
deficit, and is verified to 0.001% at @31. A growing surplus is exactly what
a nine-fold one-level shortfall of the net deficit needs. Whether its
aggregate CRT-mass weight at @37 is the right size is a closed-form
computation over prime sums (extend `attack-x-offset-03-cofactor.js` to
@37), not a census — the cheapest sharp test on the table.

**[INTERPRETATION] What survives, dies, transforms.**

- The "asymptote exactly 4" reading DIES in its monotone form: the measured
  (1−J)/F ladder turns down (3.8242 → 3.8427 → 3.6907), and the one-level
  drop is 4× the prior climb. A non-monotone approach to 4 is not excluded —
  nothing constrains it — but the reading as held is gone.
- The ~3.8 law TRANSFORMS: dead as a sharp law (−4.76% at 122 σ_slot), alive
  as a scale law (1−J within 5% of 4S₂ across @29–@37). 4S₂ now reads as an
  upper envelope with an accelerating downward departure.
- The 1.15–1.18 multiplicative split is UNDETERMINED at @37, not refuted:
  both of its factors cannot keep their trends simultaneously (above), and
  deciding which one bent requires β(37).
- The offset-correction family (the prereg's whole candidate space) DIES as
  a family: the needed correction at @37 is 13.4·S₃ — bigger than C4 and C8,
  the two members already refuted at @31 for being too big. No finite-level
  correction with a shrinking or constant scale fits @29, @31 and @37
  simultaneously.

**[INTERPRETATION] What the σ-calibration finding means for the 122σ.** The
registered z's are verdicts on the registered predictions, and no
calibration inside the measured bracket rescues any candidate. But 122σ is
not 122σ of sampling surprise: attack-sigma31 measured the raw
(non-cancelling) statistic's level-scale arithmetic term at 82 σ_slot at @31
— common to the whole window, invisible to any within-window control
ensemble, uncontrolled at every new level because each level owns exactly
one window. The @37 deviation, 1.04e−3 in J-units, is about a quarter of
@31's own line bias (4.03e−3): comfortably inside the scale that level
arithmetic is KNOWN to produce on the raw form. The honest reading of any
raw-form z at a new level is that the sampling σ is not the yardstick for
cross-level model error — a future prereg that wants probabilistic teeth at
a new level must register an arithmetic-term (β) model, which the @37
prereg's own §4 declined to do for lack of one on record. That refusal, not
the σ machinery, is what made a triple-digit z available here.

## 4. Files and gate

- `research/xchan-at37-02-verify.js`: new — the registered scoring
  arithmetic plus the independent recount, formally embedded
  (`node research/qc/embed.js --streams both --timeout 1800`, 335.1 s,
  code-sha256 `f57889cf…`, out-sha256 `770c0417…`), READINGS appended below
  the banner, binding re-verified by the static `embeds` check.
- `research/history/staging/xchan-at37-score.md`: this file, HELD for the
  adversarial pass.
- Nothing else touched: the prereg and the census producer are as this
  session found them; no live document edited; the TODO item X update is
  proposed below, not applied.

**Gate.** Before this session's edits: `node research/qc.js` TOTAL = 0 (the
standing census red had cleared when its re-embedded tail landed). After:
TOTAL = 0, selftest green — see the session record for the runs.

## 5. Proposed TODO item X update (report only, not applied)

> The @37 blind test ran and every registered candidate died (survivor set
> empty; `xchan-at37-score.md`): measured 1−J = 0.020823 against a nearest
> registered prediction of 0.021707, a 13.4·S₃ shortfall, independently
> recounted and confirmed (`research/xchan-at37-02-verify.js`). The
> finite-level-correction family is CLOSED as the offset's description; the
> ~3.8 law stands only as a ≈5% scale law, and the "asymptote exactly 4"
> reading is retired in its monotone form. The live question is which
> structural trend broke: the line bias β's decay or the sieve deficit's
> 1.15–1.18×4S₂ ratio — undecidable from the net alone. Next instruments, in
> cost order: (i) the cofactor-one surplus aggregate at @37 in closed form
> (extend `attack-x-offset-03-cofactor.js`), (ii) the @37 line ensemble
> (~17–29 h), which separates the split directly.

## 6. Not reached

- **The @37 line ensemble** (β(37)): not run, ~17–29 h; §3's split stays one
  equation in two unknowns until it lands.
- **The cofactor-one aggregate weight at @37**: a closed-form prime-sum
  computation, proposed above, not performed here.
- **The full-period recount**: the independent verification covers the full
  @23 period plus 0.404% of the @37 period, contiguously from 0; a defect
  expressed only past 3e10 would evade it (none is known; the 2^53 audit and
  the width-sweep table bound the class).
- **The CRT denominator by a third path**: it rests on two independent
  embedded producers that agree (the census's pointer tail with its e₃
  identity, and `attack-x-offset-01-terms.js`'s exact sum) — not recomputed
  a third time.
- **No @41 pricing** and no re-projection of any registered separation.
