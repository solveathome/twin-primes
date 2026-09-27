# Refuted-index audit, rows 17 to 34 (segment 2 of 4)

<!-- ledger
id: Q-refuted-audit-0829-2
status: ANSWERED
todo: none
question: Do the closures recorded in REFUTED.md rows 17 to 34 survive re-derivation against the object definitions, the producers' embedded output, the 2026-08-29 corrections, and their own quantifiers?
verdict: All eighteen closures stand and none reopens; nine rows are SOUND and nine are SOUND-NARROWER, the worst being row 53's "the search is finished", which its own record contradicts in two places, and the others splitting into three classes: a mechanism clause that covers half its route (rows 47, 58), a universal quantifier wider than the sweep behind it (rows 49, 59), and a measured number carried without its calibration or its unit (rows 43, 46, 60).
-->

*(2026-08-29. Internal, HELD under the publication moratorium. An audit of the
closures, not of the routes. No live file was edited and no producer was
re-run: per the standing compute rule the embedded OUTPUT blocks are cited
rather than recomputed, and the single arithmetic check performed here is
marked [ARITHMETIC] with its inputs. Calibration marked per claim: PROVEN,
VERIFIED at the record, MEASURED, INFERRED, OPEN.)*

## 0. Verdict

**Rows covered.** `research/REFUTED.md` lines 43 to 60, eighteen data rows, from
"`u_sup` as an unconditional worst-position bound" to "the greedy oracle as an
exact solver past x ≈ 53". Numbering the table's data rows from 1 at "the
localized merge chain, telescoped to level x", these are rows 17 to 34; the
brief's range 18 to 34 and its named endpoints differ by one, so both readings
are covered and the boundary rows 17 and 34 are audited here as well as by any
sibling.

**Counts.** SOUND 9, SOUND-NARROWER 9, WEAKENED 0, UNSOUND 0. No route in this
range reopens, and no closure was found to rest on a premise the 2026-08-29
corrections moved.

**The worst finding, first.** `research/REFUTED.md:53` closes prior art on the
`u_sup` representation with the clause "the search is finished". Its own record
says the opposite twice. `history/staging/attack-prior-art-last-ground.md:357`
reads, of the same searches: "**These title-level zeros are NOT an absence
claim** and must not be read as one: `research/SEARCH-CONVENTIONS.md` §1 carries
**no owning-convention row for the `u_sup` representation**, and a technique
that lives inside a paper about something else has no title to be found under."
Its §6 then lists four channels not reached, MathSciNet review text and
abstracts and MSC among them, and names that residual as "where a two-class
bound buried in a paper about something else would still be". The closure of the
ROW still stands, for a different and sufficient reason the row does not give:
the Fejér half is discharged to a folklore identity, the mean-value half to
*Opera de Cribro* Lemma 6.18 and Friedlander arXiv:2607.05707, the standing
instruction is to assume the representation known, and the `u_sup` route it
would have been novelty for is itself closed at row 43. So nothing reopens; what
is wrong is the sentence, and it is wrong in the direction this corpus most
distrusts, a clean negative asserted outside the owning convention.

**Second and third.** `research/REFUTED.md:59` closes certificate monotonicity
as a defect class on "every first-valid-L in the corpus", a universal quantifier
its record retracts: `history/staging/monotonicity-sweep.md` §"What this does
not show" states "The staging layer beyond the three documents the live layer
cites was not swept (~40 files)". And `research/REFUTED.md:47` gives the
fractional-retention closure as the empty window `(α_κ, β_κ+1)`, which closes
only Brady's Corollary 10; his Corollary 11 and Runbo Li's §3 family **do** apply
at κ = 2 by the record's own §4, and are closed on economics instead, at a
measured 3.83 × 10⁻⁴ of exponent.

**One numerical defect, non-load-bearing, found in re-derivation.** Row 51 and
its producer carry "diverges like 7.19 lnln x" from a constant `a = 3.594`
declared as the root of `a·ln(a/e) = 1`
(`research/attack-beta2-05-covering-prune.js`:370, :608). That root is
3.5911214767, giving 2a = 7.1822 [ARITHMETIC, bisection on the stated equation;
a = 3.594 returns 1.00368, not 1]. The error is 0.08 per cent in the leading
constant of a divergence already 6.8 orders of magnitude above the measured law,
so no verdict moves.

**TPC-strength check.** No row in this range is closed on the ground that its
target is TPC-strength, so axes A to D of
`history/staging/attack-wrongdirection-audit.md` §1 have no row to test here.
Two rows sit near a bridge and neither crosses it: row 50's surviving finite
theorem is a named-level certificate, which is Axis A legal territory and
matches the audit's target 4 reading; row 48 concerns the exponent band
(2, 4.2665], which the audit's target 10 records as genuinely legal.

**Quantifier check.** Three quantifier mismatches, all in the same direction, a
row claiming universally what its record establishes over a named finite set:
row 49 ("improving β₂ itself" against the record's "closed route **for us**"),
row 59 (the corpus against three documents plus the live layer), row 43 ("rises
at all nine levels" against nine levels and eight rising steps). None inverts an
i.o. statement into an every-x one or the reverse.

---

## 1. Row by row

Row numbers are the table's data-row index, counting from 1 at "the localized
merge chain"; the file line in `research/REFUTED.md` follows in brackets.
"Mechanism" is the closing argument restated here from the record, not copied
from the row.

| # | route | mechanism, in one sentence | verdict | reason | record and producer checked |
|---|---|---|---|---|---|
| 17 [:43] | `u_sup` as an unconditional worst-position bound | The saturated absolute-value sum `S_sat` grows by a measured flat factor 2.0516 per added prime, so the exponent it yields rises at every step measured over z = 13..43 and a plateau below β₂ is rejected, and the `(h,m)` basis puts the m-sum inside the same absolute value so it is frequency-by-frequency more expensive, which rules the divergence out as an artifact of the representation | SOUND-NARROWER | The closure is MEASURED to z = 43 plus a mechanism reading, not a proven divergence, and the record states the crossing point is undetermined across four statistically indistinguishable rising models; separately the row says "rises at all nine levels" where the record reads "rising at all eight steps" over nine levels | `sift-limit-attack.md` §7e box; `attack-tau-repricing.md`; `attack-hm-basis.md` (u_sup 2.0617 to 3.2026, constant model RSS 49×, hm factor 7.2599 over 6.6170 to 7.8932, 0 violations over 2309/30029/510509 frequencies) |
| 18 [:44] | Brüdern–Fouvry's left factor as the thing to beat | Their `e(−hN/(d₁d₂))` is L5's `e(ax/e)`, which is unimodular, so in the mean-square setting Parseval carries it at no cost and the entire loss sits in the triangle inequality over the `(e,a)` sum, which is where the position quantifier is paid for | SOUND | The derivation matches the object: `|e(ax/e)| = 1` is free in both the mean-square and the sup chain, and the record's relocation of the obstruction to almost-all versus sup is stated as a relocation rather than a closure | `sift-limit-attack.md` §7e final paragraph, read against L1 to L5 in the same section |
| 19 [:45] | re-splitting Brüdern–Fouvry's four side conditions | Their Proposition 2 carries four side conditions and only (iv) constrains the product, so the proposed re-split, which was optimised on (iv) alone, violates (iii) by `x^{0.040403}` in the only slot assignment their own levels admit | SOUND | Verified at the record against a page image of journal p. 345, both slot assignments tested, and the claimed 0.0295482779 reproduced to seven places before being refuted; the residual 1.205×10⁻⁵ that survives is stated at the record and is confined to the κ → 0 limit | `attack-bf-split.md` §§1 to 5; `research/attack-bf-split.js` (198.2 s, embed-stamped) |
| 20 [:46] | the loss-budget LP at x = 43 | The level-D one-point LP floor, pooled over 33 rescaled readings to x = 43, sits at 3.3152, so DP1 consumes 2.3152 of the 3.2665 the budget partitions and the residual left to DP2 and DP3 is 0.9513, inverting the ordering `sift-limit-attack.md` §1 had assumed | SOUND-NARROWER | The floor is a finite-z reading multiplied by an unlicensed κ = 1 calibration whose own error bar is 0.62 to 0.98, two of the four routes are still drifting upward at x = 41 and 43, and "θ is the only place left to push" is an inference inside the LP's information class rather than a statement at the record | `lp-push-x43.md` §§0, 4, 6; `research/lp-push-x43.js` OUTPUT :847, :872, :878 (3.315 pooled, DP1 2.3152, lowest reading 2.6692 against 2.6332) |
| 21 [:47] | fractional retention (Brady / Runbo Li) | Brady's Corollary 10 upper-bound rule is applicable only for `α_κ < s < β_κ+1`, and Diamond–Halberstam's `α_κ ≥ β_κ+1` for κ ≥ 2 makes that window empty at κ = 2, while the lower-bound half that does apply is worth a projected 3.83×10⁻⁴ of exponent | SOUND-NARROWER | The row's clause closes only half the rule family; the record's §4 states plainly "The lower-bound half is not closed by this", that Corollary 11 and Li's §3 family **can** be applied at κ = 2, and closes them on yield instead | `scope-fractional-retention.md` §§0, 4, 5; `research/scope-fractional-retention.js` (window −0.09128 at κ = 2, +0.2044 at κ = 3/2) |
| 22 [:48] | "a floor at 4", and the band (4, 4.2665] | Selberg's `2κ` is a conjectured target rather than a proven floor, already beaten for ½ < κ < 1 and recorded by Brady as open for every κ > 1, so no floor at 4 exists and the band the route was competing for is not a defined object | SOUND-NARROWER | The route is correctly refuted, but the row's clause states what SURVIVES the refutation (no κ = 2 limit below 4.2665 exhibited) rather than what killed it, and a reader could take the clause as evidence that 4.2665 is itself a floor | `sift-limit-attack.md` :818-838 downgrade box; `scope-fractional-retention.md` §7b item 3; `SEARCH-CONVENTIONS.md` §4 |
| 23 [:49] | improving β₂ itself | β₂ = 4.26645028414864191641 has not been improved since Diamond–Halberstam 2008 and every post-2008 κ = 2 value in the surveyed literature is worse, so the constant is the best available and the pipeline's discards are where any gain must come from | SOUND-NARROWER | The closure is a literature-survey negative for this programme, which is how `PRIOR-ART.md`:508 states it ("So 'improve β₂' is a closed route **for us**"); the row drops the qualifier, and the same corpus records Brady's Conjecture 1 that `β_κ ≤ 2κ − εκ^{1/3}` for large κ, so the object is not believed unimprovable | `dhr-verification.md` §0 rows 1a, 1b; `PRIOR-ART.md`:504-509; `SEARCH-CONVENTIONS.md` §4 table |
| 24 [:50] | exact-strata re-insertion as a proof technique | Partial re-insertion is a valid finite theorem but not circular and not asymptotic, because `max_x Str_i` at `u_i ≈ 1` is itself the upper sieve function of a dilated tile one level down, whose only proven bound is `F₂`, so the construction terminates at every finite z and at no uniform z | SOUND | The regress is derived at the record from the Stratum Dilation Lemma and corroborated three ways, and the surviving finite certificates reproduce in the producer's embedded block | `attack-beta2-03-exact-strata.md` §§0, 1a; `research/attack-beta2-03-exact-strata.js` OUTPUT :636, :648 (210 at p ≤ 19, 420 at p ≤ 23, u* stable 2.0028 and 2.0260) |
| 25 [:51] | the covering economy asymptotically, and the hybrid | The pruning test run backwards is the union bound, whose entire content is `Σ_{5≤p≤x} 2/p < 1`, and Mertens crosses 1 between x = 11 and x = 13, while the cheapest admissible repair, Bonferroni truncation, diverges like a constant times lnln x and an exactly handled head costs `e^{θ(x₀)}` so reaches only `x₀ = O(ln x)` | SOUND | Both halves check at the record; one numerical footnote, the constant declared as the root of `a·ln(a/e) = 1` is 3.5911, not the 3.594 the producer's header carries, so the divergence constant reads 7.182 rather than 7.19 [ARITHMETIC], which moves nothing | `sift-limit-attack.md` §7; `attack-beta2-05-covering-pruning-bound.md` ledger; `attack-hybrid-bound.md` Theorem HY (227 → 439, factor 1.93, no return over 5972 further primes) |
| 26 [:52] | Brady's thesis Problem 3 as a licence on the exponent | His Problem 3 gives one congruence class per prime over an arbitrary finite set, against two classes at locked separation 2 on an interval, and the two readings are numerically different problems, separated at x = 5 and x = 11 | SOUND | Correct as far as it goes, and the record carries a second and independent reason the row omits: his Theorem 9 is a hardness result about partitions, the programme.s per-prime family is a 2-cover and never a partition at an odd prime, and a single fixed sequence of instances has no complexity to license anything about an exponent | `attack-np-licenses.md` §0 items 1 and 2, §§2 to 4 |
| 27 [:53] | prior art on the `u_sup` representation | The Fejér-mass identity L4 uses is the classical `Σ sin²/sin² = m(n−m)`, verified in-script for all 2 ≤ n ≤ 60, and the mean-value half is discharged to *Opera de Cribro* Lemma 6.18 and Friedlander arXiv:2607.05707, so the representation must be presented as an assembly of standard parts | SOUND-NARROWER | The closure stands on the two discharges and on the `u_sup` route being closed anyway, but "the search is finished" is contradicted by the record's own §4b and §6; see §2 | `attack-prior-art-last-ground.md` §§4a, 4b, 4c, 6; `research/attack-prior-art-last-ground.js` (203 network calls, embed-stamped) |
| 28 [:54] | the FKMPT corrigendum alarm (MR4592874) | The alarm's premise, that nothing in the repository had read the corrigendum, was false on the day it was raised, and every constant the corrigendum changed was already carried at its corrected value | SOUND | The 25-row citation table is reproduced here: three rows are marked WRONG (:20 in half, :22, :24), which is the reading under which "22 of 25 citations clean" is exact; counting OK verdicts alone gives 19, so the row's number is right only under the not-WRONG reading | `verify-fkmpt-corrigendum.md` §§2, 5; `covering-dive.md` §2.3 (six artifacts with SHA-256, corrigendum-incorporated PDF p. 32 read at 180 to 220 dpi) |
| 29 [:55] | Ford–Halberstam's dual decomposition, carried out after 26 years | Their dual is the same inequality as Brüdern–Fouvry's (2.6), verified to 3.553e-15, and because its boundary layer belongs to the same `χ⁺` it has one level per component and no lower sieve, which is (2.6) with `D⁻ = D⁺` imposed, forfeiting the majorant/minorant asymmetry that is what BF are paid for | SOUND | The identity, the losslessness of their estimation step and both level-currency constants reproduce in the producer's embedded block, and the dual loses in BF's own configuration as well as in ours | `attack-ford-halberstam.md` headline, §§1 to 4; `research/attack-ford-halberstam.js` (75.8 s, embed-stamped, `--check` re-verified) |
| 30 [:56] | "Hough's Lemma 3.2" as a separate source | The lemma is character-for-character BBMST arXiv:2211.01417 Lemma 3.2, read from a page image, and Hough's own paper numbers its lemmas 2, 4, 5 and 7 and contains no Lemma 3.2 | SOUND | Confirmed at source; the record adds a second defect the row does not carry, that the same citation gives Hough's title and volume wrongly, and a mathematical caveat that BBMST's hyperplanes carry one residue class per modulus and so are the wrong input for a two-class system | `verify-fkmpt-corrigendum.md` §4 |
| 31 [:57] | `L ≤ 111` as the adjudicated block bound | Coverability of [1, L] is downward closed, so the feasible L form an initial segment and the bound is first-infeasible minus one; the adjudication that installed 111 conflated feasibility with the greedy search's success, which is the quantity that genuinely is non-monotone | SOUND | The distinction is drawn correctly against the objects, the criterion's ceiling 62 is proven by CRT at the record rather than merely read off, and the record states plainly that neither bound clears 529 so this settles record-keeping and not mathematics | `sift-limit-attack.md` §7a; `research/block-L-first-dead.js` OUTPUT :450, :458-462 (first dead l = 63, sums 62/62/62, last not excluded 111; block 2 660 → 659) |
| 32 [:58] | the A/B-coupling depth axis as a proof route | Imposing the Alternation and Merge Lemmas cannot change `K_p`, because `K_p` is already an exact maximum over the real T₅ difference word and every set it ranges over already obeys the three laws, so the coupling adds exactly 0 and the slack that remains is cross-prime | SOUND-NARROWER | The A/B half is closed and independently verified (0 of 72 cells change), but the depth axis itself is recorded as OPEN: `sift-limit-attack.md` §7a-ter says in terms "at block 1 the counting route to 529 is **open at depth 3, not closed**", and what closes it as a proof route is reach and cost, x = 41 unreachable at every depth run | `attack-ab-coupling.md` §5; `verify-ab-coupling.md` §§1, 6, 7; `research/attack-ab-coupling-01.js`, `research/attack-ab-coupling-02-lp.js` (depth-3 ceiling 38, depth-2 LP optimum 54 in exact rationals) |
| 33 [:59] | certificate monotonicity in L as a live defect class | The degree-2 Boole-Fréchet certificate `V₂(L)` is not monotone in L, so bisecting on it is unsound; one artifact did, and it is wrong at 3 of 5 levels, while every other first-valid-L in the documents swept comes from a consecutive scan | SOUND-NARROWER | The record's own closing section retracts the universal: "The staging layer beyond the three documents the live layer cites was not swept (~40 files)", and `x = 23`'s H₁ was not independently re-verified | `monotonicity-sweep.md` F1, F2, F3 and §"What this does not show" (36/72/144/174/354 reported against 30/72/132/174/210 true) |
| 34 [:60] | the greedy oracle as an exact solver past x ≈ 53 | At a single uniform budget the repaired greedy hits the covering optimum at every sealed-scope level to x = 43 and at x = 53, but matches only 1 of the 8 published optima over x = 47..79 and its ratio decays with a slope excluding zero, so the oracle's frontier is near x = 53 | SOUND-NARROWER | Numbers reproduce exactly, but −0.02353 (se 0.00706) is a LOG-LOG slope in ln x at the record, not a slope "per level" as the row and `object-g2-read-0829.md`:296 both state it, and the clean sweep is a property of one seed base at one budget, with six of nine alternative seed bases failing to cover the optimum's own target at x = 41 | `greedy-oracle-validation.md` §§0, 1, 3, 9; `research/greedy-oracle-validation.js` (about 14 min, formal embed, instrument extracted as source text at run time) |

---

## 2. The narrowings in detail

**No row in this range is WEAKENED or UNSOUND, so this section carries the nine
SOUND-NARROWER rows instead.** Each one closes its route; each one's wording in
`research/REFUTED.md` says more, or says something other, than the record it
cites. They fall into four classes.

### 2a. A negative asserted outside its owning convention (row 27, `:53`)

The clause is "the search is finished". The record says it twice, in terms, that
the search is not:

> "**These title-level zeros are NOT an absence claim** and must not be read as
> one: `research/SEARCH-CONVENTIONS.md` §1 carries **no owning-convention row
> for the `u_sup` representation**, and a technique that lives inside a paper
> about something else has no title to be found under."
> (`attack-prior-art-last-ground.md` §4b)

and its §6 names four channels not reached: MathSciNet review text, abstracts
and MSC ("this is the residual, and it is where a two-class bound buried in a
paper about something else would still be"), Google Books, the book itself, and
Semantic Scholar.

**Why the closure survives anyway.** The row's route is prior art on the
representation, and two positive discharges settle it without any absence claim:
the Fejér-mass half is the classical sine identity, VERIFIED in-script for all
2 ≤ n ≤ 60, and the mean-value half is discharged to two published sources. The
record's own §4c states the operative consequence, that the novelty question is
moot for the exponent because the `u_sup` route is closed at row 43, and that the
reason to settle it at all is publication hygiene. So the route does not reopen;
the sentence should be replaced.

**What would make "finished" true, if anyone wanted it.** An owning-convention
row for the representation in `SEARCH-CONVENTIONS.md` §1, then a review-text and
MSC pass on MathSciNet. Neither has run. Nothing in the programme depends on the
answer.

### 2b. A mechanism clause that covers half its route (rows 21 and 32)

**Row 21, `:47`, fractional retention.** The empty window `(α_κ, β_κ+1)` closes
Brady's Corollary 10 and only that. `scope-fractional-retention.md` §4 closes
with a paragraph the row does not reflect: "**The lower-bound half is not closed
by this.** Brady's Remark 5, p. 110, gives its window as `β + 1 ≤ s ≤ β + 2`,
with no `α` condition. At κ = 2 that is `5.26645 ≤ s ≤ 6.26645`, non-empty ...
So Corollary 11 and Li's §3 family **can** be applied at κ = 2. That is the live
remnant, and §5 prices it." The price is Brady's own realised relative gain
8.99×10⁻⁵ transferred, giving 3.83×10⁻⁴ of exponent, 0.017 per cent of the
4.2665 to 2 gap [INFERRED at the record from a PROVEN measured gain]. The
closure is therefore economic on the surviving half, not structural, and the row
as written would not block a re-proposal of Li's family.

**Row 32, `:58`, the A/B-coupling depth axis.** Two objects are named in one
route. The A/B coupling is closed structurally and the argument is sound: `K_p`
is an exact maximum over the real T₅ difference word, so the three laws are
already satisfied by every set in its range and imposing them is the identity
filter, VERIFIED both ways (0 violations over 1,080 hit sets; 0 of 72 `(l,f,p)`
cells change). The depth axis is not closed that way.
`sift-limit-attack.md` §7a-ter states: "Parts of size 3 give **`L ≤ 38`** and
clear 51 with room: at block 1 the counting route to 529 is **open at depth 3,
not closed**." What follows is a cost argument, that the depth needed rises
3, 3, 5, 5 at x = 23, 29, 31, 37, that the phase-tuple count at depth k is
`Σ_{|B|≤k} ∏_{p∈B} p`, that x = 41 is out of reach at every depth run, and that
depth 3's 38 is still 2.0× the truth L = 19. "Open and expensive is not a proof
route" is the record's own summary and is the honest scope of the closure.

### 2c. A universal quantifier wider than the sweep behind it (rows 23 and 33)

**Row 23, `:49`, improving β₂.** `PRIOR-ART.md`:508 states the conclusion with a
qualifier the row drops: "So 'improve β₂' is a closed route **for us**, and our
constant is the best available rather than a lazy choice." The evidence is a
survey, not an impossibility argument, and the same corpus records Brady's
Conjecture 1 (`β_κ ≤ 2κ − ε·κ^{1/3}` for large κ) and his expectation that the
method extends, so the object is believed improvable at high dimension by the
people who work on it. The route stays closed for this programme on cost and on
an eighteen-year unimproved record. It reopens on one event, a new published
κ = 2 value below 4.26645, and that event needs no work here to detect.

**Row 33, `:59`, certificate monotonicity.** The row asserts "every
first-valid-L in the corpus comes from a consecutive scan".
`monotonicity-sweep.md` closes with: "The staging layer beyond the three
documents the live layer cites was not swept (~40 files)." It also records that
`x = 23`'s H₁ (420 first, 574 stable) "was not independently re-verified", which
is the same number row 24 carries as the surviving finite theorem
`G₂(23#) ≤ 420`; the producer behind it is the one the sweep names as the model
treatment, printing first- and stable-crossing as separate columns, so its method
is not in doubt, only its independent corroboration. What the sweep establishes
is that the defect class is closed in the live layer and in the three documents
the live layer cites, with one artifact found unsound and corrected. That is a
real result and it is not the universal the row states.

### 2d. A measured number carried without its calibration or its unit (rows 17, 20, 34, and the wording of 22)

**Row 17, `:43`.** "Rises at all nine levels" against the record's "rising at all
eight steps" over nine measured levels; and "the divergence is
basis-independent" reads as a property established of a divergence, where what
is established is that a second basis is strictly more expensive frequency by
frequency, so the first basis cannot be flattering the route. The record is
careful about this and says so: "this is the same instrument with one summation
moved, **not** a second independent witness". The closure itself is MEASURED to
z = 43 plus a model-free mechanism reading, with the crossing point explicitly
undetermined; that is enough to close the route, and it is not a proof of
divergence.

**Row 20, `:46`.** "Floor 3.3152" is a pooled finite-z reading multiplied by
whatever factor the κ = 1 column needs to reproduce the proven β₁ = 2, a step
`lp-push-x43.md` §6 states "is not licensed by a theorem at either dimension",
with a spread across the four rescalings of 0.62 to 0.98 as "the honest error bar
on it". Two of the four routes are still drifting upward at x = 41 and 43, so
the floor is not converged, and all remaining drift is upward, which is the
direction that preserves the closure. The clause "θ is the only place left to
push" is an inference from `E = β/θ` given that DP1's share is a floor no
divisor-class-density method gets under; it is not a sentence at the record and
it holds only inside the LP's information class.

**Row 34, `:60`.** The slope −0.02353, se 0.00706, is the log-log slope of the
ratio against x over x = 13..79, that is `d ln(ratio)/d ln x`. The row calls it
"per level", and `object-g2-read-0829.md`:296 has already copied that unit
forward. Read as a per-level rate over the ten levels from x = 47 to 79 it would
predict a ratio drop of about 0.21, against the measured 0.9567 at x = 79, so the
mislabel is a factor of roughly four in the same shape as the tail-unit defect
applied to `TODO.md` earlier today. Separately, the 13-of-13 and 14-of-14 sweep
is stated at the record as "a property of this instrument at this budget with
this seed, not a theorem about the greedy rule", with six of nine alternative
seed bases failing to cover the optimum's own target at x = 41 within 6000
restarts.

**Row 22, `:48`.** The route is correctly refuted and the mechanism is missing
from the clause. What kills "a floor at 4" is that `2κ` is Selberg's proposed
target rather than a proven floor, that it has already been beaten for
½ < κ < 1, and that Brady p. 3 records it as open whether any κ > 1 has
`β_κ < 2κ`. The clause instead states the survivor, that no κ = 2 sifting limit
below 4.2665 has been exhibited, which is a different proposition about the other
side of the interval and could be misread as evidence that 4.2665 is a barrier.

---

## 3. Proposed REFUTED.md row rewrites

Nine rewrites, all confined to the `why, in one clause` column except where
noted. No verdict word changes and no row is deleted; every route stays closed.
Old and new are given in full so the edit is mechanical. Flags: APPLY where the
row as written contradicts its own record or misstates a unit, HOLD where the
change is a scope qualifier that Chris may prefer to leave to the record.

**Row 27, `research/REFUTED.md:53`, APPLY.** The row contradicts its record.

- old: `the Fejér-mass identity is the classical Σ sin²/sin² = m(n−m) folklore and the mean-square half is published; the search is finished`
- new: `the Fejér-mass identity is the classical Σ sin²/sin² = m(n−m) folklore and the mean-square half is published (Opera de Cribro 6.18, Friedlander arXiv:2607.05707), so the representation is an assembly of standard parts; the title-level zeros are not an absence claim and SEARCH-CONVENTIONS has no owning-convention row for it`

**Row 34, `research/REFUTED.md:60`, APPLY.** Unit correction, and the mislabel
has already propagated to `object-g2-read-0829.md`:296, which needs the same
fix if this is applied.

- old: `exact at 13 of 13 and 14 of 14 sealed-scope terms but 1 of 8 on the published optima x = 47..79, slope −0.0235 ± 0.007 per level`
- new: `exact at 13 of 13 and 14 of 14 sealed-scope terms at one seed base and one budget, but 1 of 8 on the published optima x = 47..79, log-log slope −0.0235 ± 0.007 in ln x`

**Row 21, `research/REFUTED.md:47`, APPLY.** As written the row does not block
a re-proposal of the half that survives.

- old: `the upper-bound window (α_κ, β_κ+1) is empty at every κ ≥ 2, since α₂ = 5.35773 > 5.26645`
- new: `the upper-bound window (α_κ, β_κ+1) is empty at every κ ≥ 2, since α₂ = 5.35773 > 5.26645, and the lower-bound half that does apply is worth a projected 3.83e-4 of exponent, 0.017% of the gap`

**Row 33, `research/REFUTED.md:59`, APPLY.** Quantifier correction.

- old: `every first-valid-L in the corpus comes from a consecutive scan; the one survivor was an H₁ bisection, wrong at 3 of 5 levels, now boxed as SUPERSEDED`
- new: `every first-valid-L in the live layer and the three documents it cites comes from a consecutive scan; the one survivor was an H₁ bisection, wrong at 3 of 5 levels, now boxed as SUPERSEDED; about 40 staging files were not swept`

**Row 32, `research/REFUTED.md:58`, APPLY.** The record says the counting route
is open at depth 3, which the row's verdict word alone would hide.

- old: `depth 3 = 38 clears 529's L ≤ 51, but the alternation lemmas add exactly 0 beyond exact per-prime counting and x = 41 is out of reach`
- new: `the alternation lemmas add exactly 0 beyond exact per-prime counting, since K_p is already an exact maximum; depth 3 = 38 does clear 529's L ≤ 51, so the counting route is open at block 1 and closed on reach, x = 41 being unreachable at every depth run`

**Row 22, `research/REFUTED.md:48`, APPLY.** The clause states the survivor
rather than the mechanism.

- old: ``no κ = 2 sifting limit below 4.2665 is exhibited in the owning sieve-theory convention, per `SEARCH-CONVENTIONS.md` §4, and Blight never writes the number``
- new: ``2κ is Selberg's conjectured target and not a proven floor, already beaten for ½ < κ < 1 and open for every κ > 1 per Brady p. 3, and Blight never writes the number; what survives is only that no κ = 2 limit below 4.2665 is exhibited, per `SEARCH-CONVENTIONS.md` §4``

**Row 23, `research/REFUTED.md:49`, HOLD.** A two-word qualifier that restores
the record's own wording. Chris may judge the bare row fine, since nothing in
the programme acts on it.

- old: `unimproved since Diamond–Halberstam 2008; everything after is worse at κ = 2 (Blight 4.45, Franze 4.516, Opera de Cribro 4.83)`
- new: `closed for us, not proven unimprovable: unimproved since Diamond–Halberstam 2008 and everything after is worse at κ = 2 (Blight 4.45, Franze 4.516, Opera de Cribro 4.83)`

**Row 17, `research/REFUTED.md:43`, HOLD.** A counting slip and a calibration
word; the closure is not in question and the row is long already.

- old: `it rises at all nine levels on a flat ~2.05 per-prime factor, and the divergence is basis-independent, the (h,m) basis worse by a flat 7.26`
- new: `measured rising at all eight steps over nine levels on a flat ~2.05 per-prime factor, and not a basis artifact, the (h,m) basis being strictly more expensive by a flat 7.26`

**Row 20, `research/REFUTED.md:46`, HOLD.** Adds the calibration the number
carries at its record.

- old: `floor 3.3152, with DP1 carrying 71% of the loss against a measured losing consumer; θ is the only place left to push`
- new: `calibrated floor 3.3152 over 33 readings, error bar 0.62 to 0.98 and not converged, with DP1 carrying 71% of the loss; inside the LP's information class θ is the only place left to push`

**Row 25, `research/REFUTED.md:51`, HOLD, and it is a producer fix first.** The
constant 3.594 in `research/attack-beta2-05-covering-prune.js`:370 and :608 is
not the root of the equation the same lines declare. Correcting the row without
re-stamping the producer would put the file and the index out of step, so the
producer's header text should be corrected under `research/qc/embed.js` and the
row follow. If both are done: `β_pure diverges like 7.19 lnln x` becomes
`β_pure diverges like 7.18 lnln x`. Nothing else in the corpus consumes the
constant, checked by grep on 7.19 and 3.594.

**Rows 18, 19, 24, 26, 28, 29, 30, 31: no change proposed.** Rows 26 and 30 each
carry less than their record holds, in the direction that under-defends the
closure rather than over-claiming it, and both could be strengthened if the
index is ever revised for that reason; neither is a defect.

---

## 4. Defects of this audit

1. **No producer was re-run.** Every number here is read from an embedded OUTPUT
   block under the standing compute rule. A producer whose block is stale
   against its own code would pass this audit undetected;
   `node research/qc.js embeds` is the check that would catch it and it was not
   run here, since running it is a write-adjacent action in a wave where three
   sibling agents are editing.
2. **One arithmetic result is this audit's own.** The root 3.5911214767 of
   `a·ln(a/e) = 1` was computed here by bisection in a scratch process, not by a
   producer, and it is unstamped. It is one line of arithmetic on an equation
   quoted verbatim from the producer's header, and it moves no verdict.
3. **Sources were not re-read at the page.** Rows 19, 22, 23, 26, 29 and 30 rest
   on page images and PDFs that the records describe with hashes and dpi.
   Whether those images say what the records quote was not re-verified; the
   audit checked internal consistency, arithmetic and quantifiers only. A
   misquotation at the page would survive this pass.
4. **The four Ford–Halberstam and Brüdern–Fouvry optimisations were checked for
   consistency, not re-derived.** The polytope vertex enumeration of
   `attack-bf-split.md` §3 and the `2(1+√e)` level currency of
   `attack-ford-halberstam.md` were checked against the constants they produce
   and against each other (`K_BF = 5.158064680330` appears in both, consistently),
   not by re-solving either program.
5. **Row 24's `G₂(23#) ≤ 420` inherits row 33's gap.** The value comes from a
   producer the monotonicity sweep names as the model treatment, and the sweep
   records that it was not independently re-verified. This audit did not close
   that either.
6. **The h₂ definitional collision was checked for reach and found not to touch
   this range.** No row from 17 to 34 uses h₂, the tail's unit, the window/G₂
   label, the Euclid anchor's symbol, the `M(x, x²)` label, the factor-81
   ensemble rider or the margin constants as a load-bearing premise, so the
   2026-08-29 corrections leave all eighteen closures where they stood. That is
   a negative established by grep over the records, not by reading every
   correction against every row.
7. **Sibling overlap at the boundary.** Rows 17 and 34 are audited here and may
   also fall inside a sibling's range. Two verdicts on one row is a
   reconciliation cost for the orchestrator, not a defect in either.
