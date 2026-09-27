<!-- ledger
id: Q-refuted-audit-0829-3
status: ANSWERED
todo: none
question: Do the closure arguments behind REFUTED.md rows 34 to 51 (the greedy oracle through the bounded-differences family) hold when re-derived against the object definitions, the producers' embedded OUTPUT blocks, and the corpus corrections landed through 2026-08-29?
verdict: The band holds: 13 of 18 rows SOUND and 5 SOUND-NARROWER, no WEAKENED and no UNSOUND, so no route reopens; the worst finding is a factual inversion in the anchored-delta row, which asserts that delta exceeds the forced scale at 2 of 7 levels when the record's own table has |delta| < F at 7 of 7, and the same wording has already propagated into a second note.
-->

# Refuted-index audit, band 3: the greedy oracle through the bounded-differences family

*(HELD. Internal calibration under the publication moratorium. This note audits
the CLOSURES, not the routes: a row is SOUND when the record's mechanism, re-derived,
closes what the row says it closes. Nothing here reopens a route on suspicion alone.)*

## §0 Verdict

**Rows covered.** `research/REFUTED.md` lines 60 to 77, eighteen data rows, first
row text *"the greedy oracle as an exact solver past x ≈ 53"* and last row text
*"the bounded-differences family (McDiarmid, Azuma, Talagrand's convex distance,
Warnke, Kutin, Kim–Vu) on the anchored deficit"*. The brief named those two as
the band's approximate endpoints and separately named the TPC-strength rows it
wanted re-derived; taking the two named endpoints inclusive covers every anchor
the brief names, at the cost of a one-row overlap with each sibling auditor at
each end. Counting data rows from the first (`the localized merge chain,
telescoped to level x`, line 27) makes this band rows 34 to 51; the brief's own
"rows 35 to 50" is inside it.

**Counts.** SOUND 13, SOUND-NARROWER 5, WEAKENED 0, UNSOUND 0. **No route in
this band reopens.** Every closing mechanism re-derived here survives contact
with the object definitions and with the corpus corrections through 2026-08-29.
What the band does carry is five rows whose one-clause `why` misdescribes the
record it points at, three of them by naming a number or a mechanism the record
does not contain.

**Worst finding first.** `research/REFUTED.md:72` (the anchored δ row) states
*"δ in fact exceeds the forced scale at 2 of 7 levels (ρ/F = 2.00 at @11, 1.27
at @19)"*. The record's own table (`history/staging/import-suen.md` §4) has
`|δ|` at 2.0665, 0.4246, 0.2988, 0.2859, 0.5149, 0.4770, 0.4428 per cent against
`F` at 2.1086, 1.7084, 1.3856, 1.0878, 0.8819, 0.7537, 0.6419 per cent, so
**`|δ| < F` at 7 of 7 levels, not `> F` at 2 of 7** [VERIFIED at the record's
table]. The record's own sentence is about a different quantity: *"ρ/F is not
bounded by 1 — it is 2.001 at @11 and 1.266 at @19"*. The row transposed ρ into
δ. The closure does not depend on the clause (the row's TPC-strength label is
independent and re-derives correctly, §2.4), so nothing reopens, but the same
wording has already been copied into
`history/staging/object-bridge-read-0829.md`:77 and :213, which is how a
transposition becomes corpus.

**Second finding.** `research/REFUTED.md:67` names *"the (q−2) growth factor"*
as why the Tail-Count Transport does not chain. The record
(`history/staging/attack-foldL-03-transport.md` §4) names something else: the
chain inequality's leading coefficient is `q`, not `q−2`, and what kills the
chain is that a **fixed** window index certifies a constant against a diverging
truth, while forcing the index to grow lands on A5's coordinate-free `0.18p`
cap. The `(q−2)` is the coefficient of the single-fold inequality, which is the
half that works. Closure intact, mechanism misnamed.

**Third finding.** `research/REFUTED.md:70` states the recognizability-radius
ratio *"crosses 1 at x = 13"*. The record's table
(`history/staging/import-bfree.md` §3.2) reads `R_x/x′²` = 0.2000, 0.4898,
0.5455, **1.1006**, 1.0796, 2.5429, 2.0756 at x = 3, 5, 7, 11, 13, 17, 19, so
the crossing is at **x = 11** and the record says so in its own words (*"fails
from x = 11 onward"*). The row also cites `§2`, where the material is in `§3.2`.
The error runs in the route's favour by one level and the closure is therefore
stronger than the row claims.

**On the TPC-strength labels.** The two rows in this band that close on a
TPC-strength label (lines 72 and 73, the fourth and third wrong-direction
arrivals) were re-derived against `attack-wrongdirection-audit.md` §1 axes A to
D. Both labels hold, on independent grounds, and neither is a loose implication:
line 73 lands squarely on Axis A's `G₂(w#) = o((log w#)²) ⟹ TPC` [PROVEN chain,
§2.4]; line 72 lands on the corpus's own `anchored-note.md` Proposition 2,
`S(x) ≥ 1` i.o. ⟹ TPC [PROVEN, read at source], through an identity, which is
Axis D's `min_x N(x) ≥ 1` functional. **No legal target in this band was closed
by a wrong (ii) label.**

## §1 Row by row

Line numbers are `research/REFUTED.md` line numbers. "Mechanism, re-derived" is
this audit's own one sentence for what closes the route, written from the record
rather than from the row.

| line | route (short) | mechanism, re-derived | checks (a)-(f) | verdict |
|---|---|---|---|---|
| 60 | the greedy oracle as an exact solver past x ≈ 53 | at one fixed uniform search budget the corrected greedy reaches the covering optimum at 14 of 14 own terms and 1 of 8 published A144311 optima, and the log-log ratio slope is −0.02353 ± 0.00706, a band excluding zero | (a) covering form and `G₂(x#) − 1` identity correct [PROVEN in the record's §2]; (b) table and scoring reproduce the row's "1 of 8" and the slope; (c) untouched by the 08-29 corrections; (d) the row's quantifier is a finite measured ladder and the row does not overstate it; (e) route closed, not the whole search family | **SOUND-NARROWER** |
| 61 | a constant-factor submodular certificate for a finite-level G₂ ceiling (import row 11) | greedy's coverage of `[1,L]` is at least `L(1 − ∏(1−2/p))` for every L by a one-line marginal-gain argument, so the firing condition `ALG < α·L` is never met at any level under any usable α | (a) partition matroid and coverage function correctly identified; (b) producer re-run read-only 2026-08-29, R1-R5 and C1-C4 all PASS, ladder 0.800000 to 0.959010, decisive lengths 0.916667 to 0.996491, reproducing the row's four numbers exactly; (c) untouched; (d) quantifier is "every L, every level, every constant" and the record earns it; (e) closes the constant-factor family, not one theorem, and cites Feige/value-oracle optimality for why no better constant arrives | **SOUND** |
| 62 | the ℓ¹ → ℓ²√log conversion on Θ_e(a)'s arithmetic (import rows 5 and 6) | Parseval identity L3 makes `‖Θ·S_H‖₂ = rms(R_H)` exactly, so the conversion is not a new tool but the sharp maximal law restated, and the measured true constant sits below the level at which the law would imply TPC | (a) object pinned to `lemmaV-parseval.js`'s L1-L5, six custody reproductions listed; (b) `C_true` 0.5634..0.9215 and `C_crit` 1.358..2.225 match the row's "0.56-0.92" and "1.36-2.23"; (c) untouched; (d) the identity half is PROVEN, the constants are MEASURED at five levels and the row does not claim more; (e) two import rows retire on one mechanism, and the mechanism is about the target's strength rather than about either machine, which is the honest wider scope | **SOUND** |
| 63 | the local-lemma family as a route past the Mertens threshold | three separate closures under one row: Shearer collapses to the union bound on a complete dependency graph [PROVEN], Moser-Tardos is in the exact case its own authors name as inescapable [PROVEN sourced], and Achlioptas-Iliopoulos arrives two levels *earlier* than Shearer because this object's causality digraph is complete [INFERRED] | (a) complete-graph collapse re-derived and correct; (b) `Σ2/p − 1` table and `H*` values reproduce; (c) the record already carries its own 2026-08-19 adversarial corrections, including "H ≥ x#, not x²", and the row uses the corrected form; (d) matches; (e) the row's single clause "every member that beats Shearer buys it with structure costing H ≥ x#" covers the variable model only, not the A-I leg | **SOUND-NARROWER** |
| 64 | fold-succession damping (the moiré question) | the ladder's lag-1 anti-correlation of −0.632 sits inside a level-noise null with median −0.460 (P = 0.16), and detrended kill damage autocorrelates at −0.07/−0.02/+0.05, so no succession mechanism is present beyond level tracking | (a) definitions correct; (b) findings 1-4 reproduce the row's three clauses; (c) instrument B is labelled `M(x, x²)`, the label the 08-29 read flags as colliding with `M(x, x′²)` (`z2-state-draft-0829.md` §5e), but the two bind the same gap at 7 of 7 checked levels and the finding here is an autocorrelation, so the collision does not touch it; (d) empirical at both reachable scales, the row says so; (e) route closed, and the record names what survives (prime reuse, a localized joint statement inside one zone) | **SOUND** |
| 65 | the 0c×0e composition (level-selected residue-deleted maxsum) | Link B makes `∀a: Δ₁(x, x′, a) ≤ B` literally the statement `G₂(x′#) ≤ B`, so the hypothesis is the conclusion one level up, and the measured max/mean goodness is universal rather than sparse, leaving the level-selection knob nothing to select | (a) Link A and Link B correctly stated against `ZONE-POSTULATE.md` §3 and `U-FRAME.md` §5a step 2; (b) the pre-registered predictions and their outcomes are in the record; (c) untouched; (d) the circularity is PROVEN and quantifier-exact; (e) the second cited record, `verify-monotone-depth.md`, narrows a *different* mechanism in the same note ("an i.o. licence is worth the oscillation amplitude" is false as a general law) and leaves the circularity untouched, so the row's stated mechanism survives the adversarial pass | **SOUND** |
| 66 | the maxsum bridge as a 0c→L converter | `maxsum_k ≥ maxsum_1 = G₂(T_x)` holds for every k, so the bridge's own inequality is satisfied by every k below `G₂/(3p)` and its output is floored there whatever upper bound on maxsum is supplied | (a) Bridge Floor correct; (b) `a3-05-bound-L.md` §7 gives the floor as "about 0.18x" from `G₂ ≈ 0.55 x²` against `3p ≈ 3x`, and 0.55/3 = 0.1833 recovers the row's 0.183; (c) §7 mentions the 1.57 h₂ control exponent, whose definition the 08-29 read flags as colliding (`object-g2-read-0829.md` §5 item 2, OPEN), but §7 states in the same paragraph that the ceiling does not depend on settling the exponent, so the collision does not reach the closure; (d) the qualitative floor is PROVEN for any maxsum bound, the constant 0.183 is measured-law-dependent and the row's "≈" carries it; (e) the record also shows Theorem C inherits the ceiling, so redirecting L to κ(m) does not move it, which is wider than the row states | **SOUND** |
| 67 | chaining the Tail-Count Transport on the tile | to iterate, the whole window family must be carried; a fixed index M certifies the constant `maxsum_M(T₁₁)` against a diverging truth, and forcing the index to grow prices out at A5's coordinate-free `K ≤ 1 + θ/(3q)` cap, the same 0.18p wall | (a) the transport inequality and its two multiplicity bounds re-derived; (b) §4's chain table (108/180/240/330 constant against truth 66..258) reproduces, and the adversarial verification adds a seventh fold exact at 348 = 348; (c) untouched; (d) matches; (e) the row's "(q−2) growth factor" is the coefficient of the single-fold inequality, which is the half that WORKS, and the adversarial verification adds that at the certificate the `(q−2)N(θ)` term never binds at any of six folds | **SOUND-NARROWER** |
| 68 | gap-genealogy amortization on the tile | two new gaps per old slot are created at every fold forever, so the charge has no scarcity to exploit, and supply against demand on the tile fails by `2c·x/(2.4 ln²x)` against `x`, exactly the factor ln²x | (a) the Consumption Identity and the age filter re-derived; (b) P1, P2, P4, P5 confirmed and P3 refuted in the form stated and replaced by the age filter, all in the record; (c) untouched; (d) matches; (e) the record adds that the ledger *does* close in a localized window from p ≈ 421, a bounded-population statement, which the row omits and which does not reopen the tile route | **SOUND** |
| 69 | the B-free/Sarnak dynamical import as a route | the limit comb is the single point {−1} with entropy 0, which the field's own newest generalisation names as the regime it declines to study, and the dictionary is exact exactly at the period scale where the corpus needs nothing | (a) Lemma A proven in two lines and brute-force verified to \|n\| ≤ 2·10⁶; (b) the Araújo passage is quoted verbatim, CONFIRMED AT SOURCE; (c) untouched; (d) matches; (e) the row's "H″'s dynamical translation predicts the opposite of the measurement" is the record's "predicts the opposite of what H″ needs" (§5.2), the same content in a looser phrasing, since the measurements are consistent with H″ and are not a test of it at H″'s own scale | **SOUND** |
| 70 | recognizability-radius route: R_x < x′²−3 ⟹ Zone Postulate | Lemma B gives `R_x ≥ G₂ − 1`, so the complexity reformulation is strictly stronger than the target, and it is already false as a certificate at four consecutive levels | (a) Lemma B and its corollary re-derived and correct; (b) the record's table gives the crossing at x = 11, **not** the row's x = 13, and 2.5429 at x = 17 as the row says; (c) untouched; (d) matches; (e) route closed; the row's record pointer `§2` should be `§3.2` | **SOUND**, two row errors |
| 71 | generic chaining against the maximal-law union bound | the entropy integral of the true increment metric, which is what chaining delivers with a perfect universal constant, already exceeds the union bound at every level, so chaining's ceiling sits below the union bound's floor | (a) the increment identity `R_H(x+δ) − R_H(x) = R_δ(x+H) − R_δ(x)` re-derived and correct; (b) `I_lo/union` = 1.054, 1.040, 1.090, 1.099 at z = 13, 17, 19, 23, so the row's "1.04-1.10×" is exact and the record's own headline range "1.054-1.099" is the one that drops the 1.040; (c) untouched; (d) matches; (e) the row also carries the relocation of the `C^{π(z)}` price onto the arithmetic of Θ_e(a), which is the record's more useful half | **SOUND** |
| 72 | bounding the anchored δ by the forced scale (or any constant) as a lemma | `1 + δ = S(0)·N̄/(L0·R0)` is an identity with a positive right-hand factor, so `δ > −1` is `S(0) > 0`, and `S(0) ≥ 1` at infinitely many x is TPC by `anchored-note.md` Proposition 2 | (a) identity and Proposition 2 both re-derived, the latter read at source; (b) §4's seven-level table checked against the row and the row's second clause is **false as stated**, see §2.4; (c) untouched by the 08-29 corrections; (d) the label needs the bound only at infinitely many x, which a lemma trivially supplies; (e) the row closes the target, not the correlation-inequality field, and the record says so explicitly; (f) TPC-strength label re-derived, holds, on Axis D's functional rather than Axis A's window form | **SOUND-NARROWER** |
| 73 | a stochastic coupling dominating CRT thinning by independent thinning | the merge event is a function of the gap value, mutually singular with every exactly solvable thinning, and the domination that would replace it induces `G₂ ≲ 2.4·x·ln²x`, which is `o(x²)` and therefore TPC-implying | (a) the Möbius-map null model and the Fold Moment Identity re-derived; (b) the domination is MEASURED at 1.0614 to 1.0885 composed along the ladder, and nothing proves H″; (c) untouched; (d) the hypothesis is per-fold at fixed λ and the conclusion is at the top level, and the record carries the induction; (e) closed as a route, while the measurements stand as evidence FOR the Zone Postulate rather than a route to it, which the record states in those words; (f) Axis A re-derived: `ln W = θ(x) ~ x`, so `x ln²x = o((log W)²)` and the label is (ii) | **SOUND** |
| 74 | the L = 1 residue count as a smaller target than the postulate | inside the level-p word, `slot ≡ 0 or −2 (mod p)` and `slot killed at fold p` are the same condition with no slack, and the vanishing threshold satisfies `T* ≤ G₂` always, so the postulate implies the hypothesis rather than the other way round | (a) Lemma A PROVEN and VERIFIED at 237 folds, `T* ≤ G₂` PROVEN; (b) `T* = G₂` at four windows of four, MEASURED, and the row carries that parenthetical; (c) `z2-state-draft-0829.md` §5h flags `ZONE-POSTULATE.md`:325 for dropping exactly this parenthetical and names **this row** as the one that states it correctly; (d) the row's "iff" is PROVEN in one direction and MEASURED in the other, and the parenthetical is what carries it; (e) route closed, and the honest residual is that the branch lands back on the residue-deleted maxsum without advancing it | **SOUND** |
| 75 | the instrument-slack channel of the i.o. licence (dial 4's last) | the loosest instrument that bounds G₂ directly oscillates 0.3747 nats against a Zone Postulate need of 6.700 nats, and no sharp-level signature in 19 eligible instruments survives a permutation test | (a) `C = B/G₂` normalisation and the amplitude definition correct; (b) 0.3747, 6.700, Šidák 0.8865 and the "~0.7 nats total" all appear in the record, the last at its §"the slack is real" line; (c) untouched; (d) the row says "dial 4 is FINISHED" and the predecessor `verify-monotone-depth.md` had left one channel open and unpriced, which is exactly the channel this record closes, so the sequence is consistent; (e) route closed; the finite-set finding (`maxsum_{L+1}` sharp exactly at L = 1, qualifying counts already unsatisfiable at T₁₁) is the closing half rather than a failure to open | **SOUND** |
| 76 | the one-parameter extinction density law as a fitting model | two calibrations of the same one-parameter shape against two different statistics give c = 1.22 and c = 1.9496, a 60% disagreement that is the misspecification itself; the two-parameter form `r = A·exp(−cθ/m̄)` is what passed out of sample | (a) conventions match angle 4's, including the corrected `2p′ ∓ 2` threshold form; (b) 1.9496/1.22 = 1.598 recovers the row's 60%; (c) untouched; (d) MEASURED and predictive, and the row does not call the two-parameter form proven; (e) the row closes the one-parameter *fitting model*, not H″, and the record is careful that nothing here proves H″ | **SOUND** |
| 77 | the bounded-differences family on the anchored deficit | the first scour prime's worst-case per-coordinate effect `c ≈ 2N/q₁` grows like N while the largest tolerable value `c* ≈ √N·∏(1−2/p)/60` grows like √N times a decaying product, so the ratio diverges, and the published exceptional-set repair's best-case exponent is `≍ ln²x/x` | (a) Theorem 8's hypotheses read at source as page images; (b) 174× at @11 to 70,576× at @23 and the exponent 0.53 → 0.24 over five levels reproduce; (c) the record's second, independent death is the ensemble/anchor divide, and the 2026-08-27 "factor 81" ensemble rider (`paper/wall-note.md` §2 Face 1) strengthens rather than weakens exactly that divide; (d) matches; (e) the row names six family members, of which Warnke is `[SOURCED-BIB only]`, Kutin is second-hand and Kim-Vu rests on Bruhn-Joos's own p. 15 assessment, so the family closure is carried by the divergent-shape argument plus the repair exponent, not by six readings | **SOUND-NARROWER** |

## §2 WEAKENED and UNSOUND rows in detail, and the five SOUND-NARROWER rows

**There are no WEAKENED rows and no UNSOUND rows in this band.** Every closing
mechanism re-derived here holds, and no route reopens at rung OPEN. What follows
is the detail on the five rows whose one-clause `why` claims more, or something
other, than the record carries, plus the two record-facing errors in an otherwise
sound row.

### 2.1 Line 60, the greedy oracle: the misses are budget-conditional and the record says so

The row reads *"exact at 13 of 13 and 14 of 14 sealed-scope terms but 1 of 8 on
the published optima x = 47..79"*. Both halves reproduce at
`history/staging/greedy-oracle-validation.md` §3. What the row omits is the
record's §4, which differences two uniform budgets and finds that the shortfall
at x = 43 and at x = 53 was **budget**, closed by four times the restarts, and
that three of the eight published levels (47, 61, 67) were still moving with
budget when the run stopped. Only four of the top six take nothing at all from
`4×` restarts. The record's own honest sentence is *"on this evidence the greedy
rule itself, not the search around it, is what runs out somewhere in x =
59..79"*, which is `[MEASURED]` and explicitly evidential.

Honest wording: the route is closed as a measurement at one fixed uniform search
budget, with the degradation slope excluding zero, and a materially larger budget
is not excluded from recovering exactness at some of the eight. That distinction
matters because the row as written invites the reading that the greedy *rule* is
proven inexact past 53, which the record does not claim. Nothing reopens: the
route asked for an oracle, and an oracle whose exactness is a function of the
search budget is not one.

### 2.2 Line 63, the local-lemma family: one clause, three different closures

The row's third clause, *"every member that beats Shearer buys it with structure
costing H ≥ x#"*, is correct for the variable-model escape and only for that.
`history/staging/import-shearer.md` §8 is explicit that the row's conclusion
holds while its mechanism does not, in the record's own words: *"the conclusion
holds for this object. The mechanism does not, and carrying it as written would
put a false general statement in the corpus."* The three legs are:

- **Shearer on a complete dependency graph is the union bound.** [PROVEN, §3]
  `Z_{K_n[S]}(−p) = 1 − Σ p_v`, so the criterion is `Σ_{5≤p≤x} 2/p < 1`, the
  Mertens threshold, as an identity.
- **Moser-Tardos.** [PROVEN, sourced] The corpus's graph is chordal at one
  reading and has mutually exclusive dependent pairs at the other, and both are
  named in the authors' own abstract as the cases where Shearer's bound is tight
  for the algorithm too. The identification of our graphs as chordal and extremal
  is the record's `[INFERRED]` step.
- **Achlioptas-Iliopoulos.** [INFERRED] Not closed by tightness at all, and not
  closed by `H ≥ x#` either. It is closed because addressing a flaw `f_p` changes
  the slot's residue modulo every other prime, so this object's causality
  digraph is complete, at which point the main theorem's condition is the
  asymmetric local lemma on the complete graph and fails from x = 7, two levels
  *earlier* than Shearer.

The record also carries its own 2026-08-19 adversarial corrections, one of which
is that the atomicity lemma's hypothesis is load-bearing and not shown for this
object; the A-I closure survives on the sequel's `γ_i ≥ μ(f_i)`, which needs no
atomicity. So the A-I leg's rung is INFERRED, not PROVEN, and the row's single
clause hides that.

### 2.3 Line 67, the Tail-Count Transport: the row names the half that works

The row's `why` opens *"the (q−2) growth factor"*. `(q−2)` is the coefficient of
the single-fold inequality `N_new(θ) ≤ (q−2)·N(θ) + 2·Σ_{L≥1} Q_L(θ)`, which is
the PROVEN part of the record and the part that is exact per level. The chaining
inequality is a different one, `S_m′(θ) ≤ q·S_m(θ) + Σ_{K≥1} c(m,K)·S_{m+K}(θ)`,
with leading coefficient `q`, and §4's mechanism is not that coefficient at all:

> `S_M` has nothing feeding it, so its support never grows and the chain prints a
> constant against a diverging truth. **A fixed index certifies a constant. The
> index must grow with the level.**

The §4 table makes it concrete: at M = 4, 8, 12, 16 the chain's certificate is
108, 180, 240, 330 at every fold from 13 to 29, against a truth running 66, 108,
150, 204, 258, so the chain is false from fold 19, 23, 29 and busts `q²` at 13
and 17. Forcing the index to grow then prices out at `K ≤ 1 + θ/(3q)` from the
Alternation Lemma, which is A5's cap and the same `0.18p` wall in a coordinate
that never mentions a kill run.

The adversarial verification (`verify-tailcount-transport.md`) sharpens the
mismatch from the other side: at the certificate the `(q−2)N(θ)` term **never
binds** at any of six folds, because `N(θ) = 0` for `θ > G₂(old)` and the
transported maximum exceeds `G₂(old)` at every fold. So the quantity the row
blames is inert exactly where the instrument is used.

The row's second clause, *"on the tile the alignment sum realises every merge,
which is why the same instrument is exact per level"*, is supported: the
verification's probe (a) shows the sum over alignments IS the sum over copies
(`gcd(W,q) = 1`), and its probe (c) shows the zero loss is the operator evaluated
on its own support with two conditions dropped, a near-tautology rather than a
fact about tails. That last is a demotion the row does not carry, and it is worth
carrying, because it renames what has to be bounded as a restricted-maxsum
quantity rather than a tail-count one.

### 2.4 Line 72, the anchored δ: a transposed quantity, a misattributed identity, and a label that holds

**The label first, since it is what closes the route, and it holds.** The row is
right that any bound `|δ| ≤ c < 1` is TPC-strength, but the identity that
delivers that is not the one the row names. The record's §1 item 1:

> `1 + δ = S(0)·N̄/(L0·R0)` is an identity, so `δ > −1` **is** `S(0) > 0`.

`N̄`, `L0` and `R0` are positive counts, so the equivalence is immediate.
`paper/anchored-note.md` Proposition 2, read at source, is *"If S(x) ≥ 1 for
infinitely many x, then there are infinitely many twin primes"*, PROVEN there in
four lines from its Lemmas 2 and 3. `S(0)` is an integer count, so `S(0) > 0` is
`S(0) ≥ 1`. Chain: a lemma bounding `|δ| ≤ c < 1` at infinitely many x gives
`S(0) ≥ 1` at infinitely many x gives TPC. Re-derived under
`attack-wrongdirection-audit.md` §1: this is **Axis D**'s functional, `min_x N(x)
≥ 1`, reached through a corpus bridge, not Axis A's window form and not Axis C's
density form. Verdict **(ii) TPC-strength**, with no unstated hypothesis. The
label stands.

The row instead names `(1+δ)(1+F) = 1+ρ`, which is the record's §1 item 2 and
§4's "exact split". That identity does something else entirely: it locates F as
exactly the ν-part of δ and ρ as the failure of `[0, W)` to equidistribute
modulo the primes above x. It does not, on its own, force `δ > −1`.

**The transposition.** The row's second clause is *"δ in fact exceeds the forced
scale at 2 of 7 levels (ρ/F = 2.00 at @11, 1.27 at @19)"*. The record's §4 table:

| x | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
|---|---|---|---|---|---|---|---|
| δ | +2.0665% | −0.4246% | −0.2988% | +0.2859% | −0.5149% | −0.4770% | −0.4428% |
| F | 2.1086% | 1.7084% | 1.3856% | 1.0878% | 0.8819% | 0.7537% | 0.6419% |
| ρ/F | 2.001 | 0.747 | 0.781 | 1.266 | 0.411 | 0.362 | 0.306 |

`|δ| < F` at all seven levels, including the two the row names (2.0665 < 2.1086
at @11, 0.2859 < 1.0878 at @19). The record's own sentence, immediately under
that table, is *"**ρ/F is not bounded by 1** — it is 2.001 at @11 and 1.266 at
@19"*. What is true about δ at those two levels is different again and is in the
same table: δ is **positive** there, against a Hardy-Littlewood prediction of
`−F/(1+F)` which is negative at every level, so δ takes the wrong sign at 2 of 7.

The clause is disconfirming evidence that points the wrong way. It makes the
target look harder than the measurements make it, and since the route is already
closed by the label, correcting it costs the closure nothing. It has propagated:
`history/staging/object-bridge-read-0829.md`:77 and :213 carry the same
"δ exceeds the forced scale at 2 of 7" wording. That note is HELD and is another
agent's file; this audit edits nothing and only records the propagation.

### 2.5 Line 77, the bounded-differences family: six names, three readings

The closing argument is a shape argument and it is general: the per-coordinate
effect `c ≈ 2N/q₁` grows like N while the largest tolerable effect
`c* ≈ √N·∏(1−2/p)/60` grows like `√N` against a decaying product, so the ratio
grows like `√N ≍ e^{x/2}`, measured 174× at @11 to 70,576× at @23. Any
concentration theorem whose slack is `√N`-shaped inherits that, which is why the
row is entitled to name a family rather than a theorem.

What the row does not carry is the reading level. `row7-recon.md` §0 records
Talagrand's Theorem 8 read at source as page images; Warnke as `[SOURCED-BIB
only]`, statement not read, journal name garbled in the fetch; Kutin as the
earlier form of the same, named through Bruhn-Joos; and Kim-Vu carried on
Bruhn-Joos's p. 15 assessment (*"powerful, but technical"*). So three of the six
named members are closed by the shape argument plus a second-hand assessment,
not by having been read. The record's own `[SOURCED-BIB]` tags say this; the row
does not.

The record's second and independent death, which the row omits, is that the
target hole is on the wrong side of the ensemble/anchor divide, so even a perfect
bound would be inert on Assumption A. The 2026-08-27 "factor 81" ensemble rider
(`paper/wall-note.md` §2 Face 1, *"that 81 must never be quoted without its
ensemble"*) bears on exactly that divide, and both of its self-consistent
readings are stated there to strengthen the conclusion, e^3025 at x = 19 in the
window ensemble and 1,682 at x = 17 in the rotation ensemble against the 51.40 of
the mixed pairing. So the correction moves the row's omitted leg in the closure's
favour.

### 2.6 Line 70, two record-facing errors in a sound row

Not a SOUND-NARROWER case: the closure is sound and is in fact **stronger** than
the row states. `import-bfree.md` §3.2 has `R_x/x′²` crossing 1 at x = 11
(1.1006) and the record's own sentence is *"fails from x = 11 onward"*, at four
consecutive levels. The row says x = 13. The row's second number, 2.54 at x = 17,
is right (2.5429). The row's record pointer is `§2`, where §2 is the limit-object
section; the recognizability radius, Lemma B and the table are in §3.2. Both are
transcription errors and both are cheap to fix.

## §3 Proposed REFUTED.md row rewrites

Five proposals, four APPLY and one HOLD. Each gives the row's exact current text
and the exact replacement. This audit edits no file; these are proposals for the
orchestrator. The replacement texts carry no em dashes, per the house style
directive for this wave; where the current row uses one as a separator the
replacement uses a semicolon.

### 3.1 Line 70, the recognizability radius: APPLY

Two transcription errors, both cheap, and both currently make the closure look
weaker than it is.

**OLD**

```
| recognizability-radius route: R_x < x′²−3 ⟹ Zone Postulate | REFUTED | R_x/x′² crosses 1 at x = 13 and reaches 2.54 at x = 17 | 2026-08-19 | `history/staging/import-bfree.md` §2 |
```

**NEW**

```
| recognizability-radius route: R_x < x′²−3 ⟹ Zone Postulate | REFUTED | R_x ≥ G₂ − 1 makes the reformulation strictly stronger than the target, and R_x/x′² crosses 1 at x = 11 (1.1006) and reaches 2.5429 at x = 17, so it fails at four consecutive levels | 2026-08-19 | `history/staging/import-bfree.md` §3.2 |
```

### 3.2 Line 72, the anchored δ: APPLY

The identity credited with the label is the wrong one, and the second clause
states the opposite of the record's table. Both fixes are inside the existing row
shape.

**OLD**

```
| bounding the anchored δ by the forced scale (or any constant) as a lemma | REFUTED as a target | the exact identity (1+δ)(1+F) = 1+ρ makes δ > −1 equivalent to S(0) > 0, so ANY bound \|δ\| ≤ c < 1 is TPC-strength — the fourth wrong-direction arrival; and δ in fact exceeds the forced scale at 2 of 7 levels (ρ/F = 2.00 at @11, 1.27 at @19) | 2026-08-19 | `history/staging/import-suen.md` |
```

**NEW**

```
| bounding the anchored δ by the forced scale (or any constant) as a lemma | REFUTED as a target | the identity 1+δ = S(0)·N̄/(L0·R0) makes δ > −1 equivalent to S(0) > 0, which at infinitely many x is TPC by `anchored-note.md` Prop 2, so ANY bound \|δ\| ≤ c < 1 is TPC-strength, the fourth wrong-direction arrival; the split identity (1+δ)(1+F) = 1+ρ then shows ρ/F is not bounded by 1 (2.001 at @11, 1.266 at @19) and δ takes the sign opposite to Hardy-Littlewood at those same 2 of 7 levels, while \|δ\| < F at 7 of 7 | 2026-08-19 | `history/staging/import-suen.md` §1, §4 |
```

The propagated copies at `history/staging/object-bridge-read-0829.md`:77 and
:213 carry the same transposed clause. They are in another agent's HELD note and
are flagged here, not touched.

### 3.3 Line 67, chaining the Tail-Count Transport: APPLY

The row blames the coefficient of the inequality that works, and the record's own
§4 names something else.

**OLD**

```
| chaining the Tail-Count Transport on the tile | CLOSED | the (q−2) growth factor; on the tile the alignment sum realises every merge, which is why the same instrument is exact per level | 2026-08-19 | `history/staging/attack-foldL-03-transport.md`, `history/staging/verify-tailcount-transport.md` |
```

**NEW**

```
| chaining the Tail-Count Transport on the tile | CLOSED | a fixed window index certifies a constant against a diverging truth (108/180/240/330 at every fold 13..29 against a truth of 66..258), and forcing the index to grow prices out at A5's coordinate-free cap K ≤ 1 + θ/(3q); the single-fold instrument stays exact because the alignment sum is the sum over copies and realises every merge | 2026-08-19 | `history/staging/attack-foldL-03-transport.md` §4, `history/staging/verify-tailcount-transport.md` |
```

### 3.4 Line 63, the local-lemma family: APPLY

The row's conclusion is right and its third clause is a general statement the
record explicitly declines to make. The minimal fix names the third mechanism.

**OLD**

```
| the local-lemma family (Shearer's exact criterion, Moser–Tardos, resampling oracles, entropy compression) as a route past the Mertens threshold | CLOSED | on a complete dependency graph Shearer's exact criterion is the union bound, Moser–Tardos gains nothing (chordal graph, mutually exclusive dependent pairs), and every member that beats Shearer buys it with structure costing H ≥ x# | 2026-08-19 | `history/staging/import-shearer.md` §4, §6, §8 |
```

**NEW**

```
| the local-lemma family (Shearer's exact criterion, Moser–Tardos, resampling oracles, entropy compression) as a route past the Mertens threshold | CLOSED, by three separate mechanisms | on a complete dependency graph Shearer's exact criterion is the union bound; Moser–Tardos gains nothing (chordal graph, mutually exclusive dependent pairs); the variable model that escapes needs structure costing H ≥ x#; and Achlioptas–Iliopoulos is not touched by tightness at all but arrives two levels earlier than Shearer, at x = 7, because this object's causality digraph is complete (INFERRED) | 2026-08-19 | `history/staging/import-shearer.md` §4, §6, §8 |
```

### 3.5 Line 60, the greedy oracle: APPLY

Six words, to stop the row reading as a statement about the greedy rule when the
record's §4 shows three of the eight misses still moving with budget.

**OLD**

```
| the greedy oracle as an exact solver past x ≈ 53 | CLOSED | exact at 13 of 13 and 14 of 14 sealed-scope terms but 1 of 8 on the published optima x = 47..79, slope −0.0235 ± 0.007 per level | 2026-08-19 | `research/greedy-oracle-validation.js`; `history/staging/greedy-oracle-validation.md` |
```

**NEW**

```
| the greedy oracle as an exact solver past x ≈ 53 | CLOSED | at one fixed uniform budget, exact at 13 of 13 and 14 of 14 sealed-scope terms but 1 of 8 on the published optima x = 47..79, slope −0.0235 ± 0.007 per level; 43 and 53 were budget (4× restarts closed them) and three of the eight misses were still moving with budget | 2026-08-19 | `research/greedy-oracle-validation.js`; `history/staging/greedy-oracle-validation.md` |
```

### 3.6 Line 77, the bounded-differences family: HOLD

The honest scope is that three of the six named members (Warnke, Kutin, Kim-Vu)
are closed by the divergent-shape argument plus Bruhn-Joos's own p. 15
assessment, not by having been read at source, and the record's `[SOURCED-BIB]`
tags already say so. The closure is not in doubt: the shape argument is general
over the family and the ensemble/anchor divide kills it a second time
independently. Held rather than applied because a REFUTED row is a one-line index
and per-member sourcing grades belong in `IMPORT-MAP.md` row 7 and in
`row7-recon.md` §0, where they already are. Chris's call if he wants the index to
carry reading levels; if he does, the clause to add is *"three of the six named
members are SOURCED-BIB, closed by the shape argument rather than at source"*.

## §4 Defects of this audit

Stated so the next pass knows what it is inheriting.

1. **Two producers were not re-run.** `research/row11-closure-01-coverage.js`
   was re-run read-only on 2026-08-29 (0.1 s) and reproduces R1 to R5 and C1 to
   C4, including the four numbers line 61 quotes. Nothing else was. The 14-minute
   `greedy-oracle-validation.js`, the 195 s `import-l1l2-01.js`, the 270 s
   `attack-foldL-05-maxsum-direct.js` and `attack-ioslack-survey.js` were all
   read at their embedded OUTPUT blocks or at the record's tables, under the
   standing compute rule. Their embeds were not verified with
   `node research/qc/embed.js --check`, so a stale embed anywhere in that set
   would not have been caught here.

2. **The band boundary overlaps the siblings by one row at each end.** The
   brief's row numbers and its named endpoints disagree by an offset that this
   audit resolved in favour of the named endpoints, so lines 60 and 77 may be
   audited twice and lines 61 to 76 exactly once. Double coverage is the cheap
   failure; if the siblings resolved the offset the other way, no row in 60 to 77
   is uncovered.

3. **Verdicts (a) and (e) were re-derived; (b) was checked against tables rather
   than against raw output in every case but one.** Where a row's number appears
   both in the record's prose and in the record's own table, this audit read the
   table. Where a number appears only in prose (line 75's "~0.7 nats total", line
   77's exponent range 0.53 to 0.24), it was located in the record and not
   independently recomputed.

4. **The TPC-strength re-derivations lean on two documents this audit read but
   did not re-verify.** `attack-wrongdirection-audit.md` §1 is taken as given (it
   labels itself PROVEN, cited not re-derived, and it is itself a HELD note whose
   §3.8 carries one unstamped hand-arithmetic number). `paper/anchored-note.md`
   Proposition 2 was read at source in this repo and its Lemmas 2 and 3 were not
   re-derived.

5. **One propagation was found and not chased.** The transposed δ clause of
   §2.4 appears in `history/staging/object-bridge-read-0829.md` at two lines. No
   sweep was run for other copies, and no sweep was run for copies of the line 70
   crossing level or the line 67 mechanism.

6. **Nothing here tests whether a route closed on a sound mechanism is worth
   reopening for a different reason.** The brief's question was whether the
   closures hold, and the answer for this band is that they do. A route can be
   correctly closed against the argument tried and still be live against an
   argument nobody has tried; this audit says nothing about that, and the base
   rate says the answer is usually no.

7. **No git command was run and no existing file was edited.** The only file
   written is this one. Scratch use was confined to the session scratchpad.
