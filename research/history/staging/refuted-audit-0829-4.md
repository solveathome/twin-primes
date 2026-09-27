# Audit of REFUTED.md rows 51 to 67 (the fitted laws, the class-uniform caps, the smoothness front, the point process)

<!-- ledger
id: Q-refuted-audit-0829-4
status: ANSWERED
todo: none
question: Do the closures recorded in REFUTED.md rows 51 to 67 hold when the record is opened and the closing mechanism re-derived against today's corrected corpus?
verdict: All seventeen closures stand: 8 SOUND and 9 SOUND-NARROWER, zero WEAKENED and zero UNSOUND, no route reopens; the narrowings are wording that claims more than the record carries, worst of them row 67, whose closing clause quotes a section its own record headed POST HOC and carrying no verdict after the pre-registered primary went VOID on its matched control.
-->

*(Internal, HELD under the publication moratorium. An audit of closures, not of
routes: the question each row answers is whether the recorded argument closes
what the row says it closes, at the quantifier the row states.)*


## 0. Verdict

**Range covered.** `research/REFUTED.md` data rows 51 to 67 in file order, that
is lines 77 to 93 of the file. First route text: *the bounded-differences family
(McDiarmid, Azuma, Talagrand's convex distance, Warnke, Kutin, Kim-Vu) on the
anchored deficit*. Last route text: *the QR refinement of the anchored-cap
transplant (immune offset classes in the caps)*. Seventeen rows. The brief's
"starts around the lonely runner" lands one row later, at data row 52; data row
51 is included here and data row 50 (the one-parameter extinction density law,
sibling 3's last row) is reported as a supplementary check in section 1 only.

**Counts.** SOUND 8, SOUND-NARROWER 9, WEAKENED 0, UNSOUND 0. No route in this
range reopens. Every closing mechanism was re-derived against the record and no
mechanism failed.

**Worst finding first.** `research/REFUTED.md:93` (row 67, the QR refinement)
states its closing evidence as though it came from the pre-registered design.
It did not. The registered primary surplus test is VOID on its own matched
control at `history/staging/attack-z3-immune-01.md:266` (matched control reads
+0.00577 at 6.63 s.e. where the seal required 0, so the seal's own clause voids
both treatment verdicts), and the reading the row quotes, the design-free
per-prime class test with Z in −0.48 to +1.66, lives at `§4a` under a heading
the record wrote as "POST HOC, invented after the data, carrying NO verdict".
The closure survives, because §4a's null is combinatorial rather than a sampling
design and because §4c's differenced primary reads +0.00046 ± 0.00127 (0.36
s.e.), but the row as written converts a post-hoc reading into a registered one.
Rung: the closure is MEASURED post hoc, not MEASURED under seal.

**Second.** `research/REFUTED.md:86` (row 60) compares "every mode's share of
the factor's mass is ≤ 2.8e−3" against "the ≳ 0.4 a usable smooth component
needs". The `≳ 0.4` is derived nowhere in the corpus. It first appears as a
parenthetical inside a red-team nit at
`history/staging/redteam-0820-math.md:251` and is quoted onward as a record
figure at `research/REFUTED.md:86` and
`history/staging/attack-bilinear-transplant.md:419`. The record's own criterion
is a different quantity: a ratio, the aggregated low-frequency mass share
against the flat null at scale `C̃/K ≫ 100`
(`history/staging/smoothness-front.md:406`), measured at 0.57 to 1.15 times the
null across 31 of 31 slices. The row also sets a per-mode share against an
aggregate requirement. The verdict is not in doubt on either reading.

**Third.** `research/REFUTED.md:83` (row 57) reports the two blind misses in two
different units, T₃₁ in band standard errors and T₃₇ in the measurement's own
standard error, and the row's fitted constants belong to the three-point
pre-registered law rather than to the five-level refit whose bands were actually
missed. `research/audit-numbers.js:1420-1434` already guards the constant split
(X9, X9b, X9c) and prices it at under 0.1 measurement s.e. at T₃₇.

**What did not fire.** Test (f), whether a row closed because its target is
TPC-strength holds up under `attack-wrongdirection-audit.md` §1 axes A to D,
does not apply anywhere in rows 51 to 67: no row in this range is closed on a
TPC-strength label. The four recorded wrong-direction arrivals are rows 27, 64,
65 and 66, all outside this range.

**What this audit did not do.** It did not re-run the two producers whose
elapsed times exceed two minutes (`import-talagrand-01-price-c.js` at 401.2 s,
`scanstat2-01-t31.js` at 3029.3 s), and it opened no cited paper at source.

## 1. Row by row

Line numbers are `research/REFUTED.md`. "Mechanism" is the closing argument in
one sentence of this audit's own words, not the row's clause.

| # | line | route, short | mechanism, re-derived here | verdict |
|---|---|---|---|---|
| 51 | 77 | bounded-differences family on the anchored deficit | the first scour prime is one coordinate whose worst-case swing `d(q₁)` is of the same order as the survivor count, so the theorem's own additive slack is exceeded by a ratio growing like `√N`, and the typical-effect repair's exponent locks at `q₁Π/16` because certificate size, deviation scale and per-coordinate effect are all forced by the same three quantities | SOUND-NARROWER |
| 52 | 78 | lonely runner / view-obstruction import, and the Birkhoff / bounded-remainder branch | the multi-obstacle-per-speed problem is the repeated-speed shifted problem, which is settled in print at the trivial bound, so no general theorem of the family can beat a first moment, and the BRS leg fails its irrationality hypothesis outright while its bound is the component count `D_x`, which the corpus's own Level Ledger beats from `x = 13` | SOUND |
| 53 | 79 | distortion method as a route to an interval bound | the criterion's economy converges because it prices classes as `κ²/p²`, and it pays for that in ambient length, since its measures are resolved only on a CRT product and the sole published bridge back to an interval, Crittenden and Vanden Eynden, costs `2ⁿ` in the progression count | SOUND |
| 54 | 80 | BGT interpolation machine for 1d limit existence | interpolation needs the ground set to split under the size parameter, and in `u = ln x` the constraint set is the primes below `st`, which never splits (`Δπ ≥ 2` at every reachable pair) | SOUND-NARROWER |
| 55 | 81 | the sofic first-moment shape `L ≍ p/ln p` | the map fed the graph a uniform letter measure `3/p` that the corpus had already measured to be wrong, and the graph's own per-step rate plus the measured qualifying fraction give a polylog first-moment `L`, so the shape claim dies on its own pre-registered flatness test | SOUND-NARROWER |
| 56 | 82 | the tail factor `√(2 ln D)` and its `θ` repair | `θ ≤ 1` bounds the repair below the incumbent, and the measurement already sits above the incumbent at 7 of 9 tested (level, m) pairs, so no admissible `θ` can close the gap and the residual widens with `D` | SOUND |
| 57 | 83 | the linear exponent rule `H = a + b·ln D` | two blind levels computed after the band was sealed both landed outside it, in the same direction, on two engines, and the series is concave in `ln D` rather than linear | SOUND-NARROWER |
| 58 | 84 | Chen-Stein route to the 3.8 and the extinction constants, plus the super-W decomposition | each object is driven by one shared uniform residue draw, so the indicators outside a neighbourhood reconstruct the draw and AGG's `b₃` climbs toward its own ceiling, leaving no error term; separately the measured deficit is 1.75 times what the super-W part carries | SOUND-NARROWER |
| 59 | 85 | class-uniform joint caps at the origin | a bound whose certified floor is one number valid simultaneously at every choice of scour classes is instantiated at the adversarial witness, and the exact adversarial minimum at @11 is 16, below the staircase's anchored floor of 34 | SOUND |
| 60 | 86 | manufacturing the smooth profile from sieve weights | admissible smooth profiles span the low-frequency subspace, Möbius-signed weights put no mass there, and the completed expansion's high-frequency remainder retains `1 − o(1)` of the mass and re-poses the original sum | SOUND-NARROWER |
| 61 | 87 | the Kowalski-Michel-Sawin branch for Lemma V | both papers scope themselves to a single fixed prime modulus in their own words, while ours is a `z`-smooth squarefree modulus that is additionally summed over, and the granted fantasy's saving is below what the corpus already holds | SOUND-NARROWER |
| 62 | 88 | the `Y_N` / coefficient axis of the DI/Pascadi frontier | `Y_N` enters Corollary 18's `ℐ²` only inside the exceptional factor, which is already dead at the binding block, so the binding object is the regular spectrum's main term and `1.212157 + 2σ ≤ 2` caps `σ` at 0.3939215 whatever `Y_N` is | SOUND |
| 63 | 89 | literature-owned special-level constructions | every construction the survey reached engineers a level in order to certify a deviation or a count, none certifies smallness or regularity of a max-type object at its level, and the family's only offensive i.o.-over-levels quantifier hypothesises its levels | SOUND-NARROWER |
| 64 | 90 | mirror symmetrisation at the anchored cap | `σ: a ↦ w − a` maps class-`a` strike sets to class-`(w−a)` strike sets and fixes the comb, so every cap family that is a function of strike sets and comb is `σ`-covariant and `max(F(a), F(σa)) = F(a)` identically | SOUND |
| 65 | 91 | `K = Ψ/Φ²` as the `M_p` field mechanism | across the three folds where both are computable `K` varies by a factor 1.009 while the field it is supposed to explain varies by 2.28, so the Fold Moment Identity's deviation cannot be the field's mechanism | SOUND |
| 66 | 92 | the twin tile as a repulsive or an attractive point process | Hermitian determinantal and negatively associated measures force `g ≤ 1` and permanental or positively associated ones force `g ≥ 1`, while the tile's pair correlation is 0 at five sixths of distances and at least 2.3812 at the rest, so neither sign is available | SOUND |
| 67 | 93 | the QR refinement of the anchored-cap transplant | twin openers equidistribute over the `r − 2` classes an anchor does not kill, so the immune share is exactly `r/(r−2)` by counting, and the restricted certificate has holes where the QR-blind restriction has none | SOUND-NARROWER |

**Supplementary, outside the assigned range.** Data row 50 (line 76, the
one-parameter extinction density law) was checked because the brief named it.
`history/staging/attack-foldL-06-scaling.md:296-299` and `:334-338` carry both
clauses: `c = 1.22` against `c = 1.9496`, two calibrations of one shape
disagreeing by 60 per cent, and the two-parameter form graded MEASURED and
predictive. **SOUND.** One clause the row drops: the surviving two-parameter
form carries "a disclosed systematic of about 20% on counts and about 2 on the
deep decade" (`:338`), so "the measured, predictive one" is right in kind and
generous in degree. Left to sibling 3.

**Custody checks run.** `node research/qc/embed.js --check` returns
`code-sha256 matches / body matches out-sha256 / out-sha256 matches` for
`research/attack-z3-immune-01.js`, `research/import-distortion-01-ladder.js`,
`research/import-interp-01-bgt-defect.js` and
`research/import-sofic-02-prediction.js`.
`research/import-talagrand-01-price-c.js` was not checked (401.2 s embedded
elapsed, over this audit's two-minute ceiling).

**One number re-derived independently here.** Row 66's pair correlation:
`g(6) = 6∏_{5≤p≤x}(1 − 4/(p−2)²)` evaluates to 2.661728 at `x = 11` and the
infinite product to 2.381283, so "2.6617 at x = 11" and "≥ 2.3812" both stand,
and the product is decreasing in `x`, which is what makes the floor hold at
every level. [VERIFIED here, direct evaluation to `p ≤ 10⁶`.]


## 2. The rows that moved

**No row is WEAKENED and no row is UNSOUND.** No closure in rows 51 to 67
depends on a premise that has since moved, and no closing argument fails. The
2026-08-29 corrections were checked against every row and none of them touches
one: the tail's unit correction is about the zone tail measured by
`zonegap-01.js` and `zone-tail-01.md`, a different object from row 56's
extreme-value tail factor `√(2 ln D)`; the "window/G₂" label correction is about
`ZONE-POSTULATE.md` §8 item 4 and `G2-STATE.md` §9 item 4, neither cited by any
row here; the Euclid anchor's symbol correction is inside
`z2-state-draft-0829.md`; the `M(x, x²)` versus `M(x, x′²)` label collision
touches `maxgap-law.md` and `ZONE-POSTULATE.md`, not these records; the factor
81 ensemble rider and the margin constants 3.5 / 3.9 / 4.2 appear in no record
in this range. The `h₂` definition collision brushes one row and is recorded
under 59 below without changing it.

What follows is the nine SOUND-NARROWER rows, each with the honest wording the
record carries. All nine stand as closures; what is narrowed is what the row
claims, not whether the route is dead.

### 51 (line 77): the bounded-differences family

Three narrowings, in order of size.

1. **The exponent's rung.** The row states "the published repair's exponent is
   `≍ ln²x/x`" flatly. The record derives that closed form from five points and
   then says so itself: "the exponent formula is an asymptotic reading of five
   measured points, and five points are not a series"
   (`row7-recon.md:288-289`), and after the confirmation run, with eight points,
   "**The exponent is measured, not proven asymptotic.** Eight decreasing points
   and a closed form converging onto them are evidence for `≍ ln²x/x`, not a
   proof that the sequence never levels off past `@37`" (`:700-702`). Rung:
   MEASURED at eight levels with a converging closed form, not derived.
2. **The family's coverage.** The row names six members. Two are priced against
   the theorem directly (Talagrand's Theorem 8 as Bruhn-Joos state it, and
   Bruhn-Joos's Lemma 9 as the typical-effect repair) and McDiarmid is already
   on record at `paper/anchored-note.md` §2. Warnke, Kutin and Kim-Vu are
   **[SOURCED-BIB]** only, "the statement was not read and the journal name came
   back garbled in the fetch" (`:46-49`). They are covered by an argument rather
   than an instantiation: "§4's mode 2 prices the whole family at once, because
   the exponent `≍ x·Π/16` is set by the certificate size and the survivor
   density and not by which repair supplies the typical effect" (`:453-455`).
   That argument is sound in shape and it is not a check of three theorems.
3. **The row omits the sturdier of the two closing grounds.** The record closes
   twice, and the second closure is unconditional on any exponent: "the target
   hole is on the wrong side of the ensemble/anchor divide, so even a perfect
   bound would be inert on Assumption A" (`:20-23`), with the argument at §6
   ("`maxsum_m(T_x)` is a deterministic function of the anchored member ... a
   concentration inequality is a statement about measure and has no access to a
   named point"). The pre-registered confirmation confirms it as untouchable:
   "**The target is untouched.** No outcome here could have reopened the second
   named target" (`:697-699`). A row that carried this ground would be immune to
   any later movement in the exponent.

Everything numerical stands. `d(q₁)/c*` = 174, 620, 3133, 14608, 70575 against
the sealed 174 / 619 / 3133 / 14608 / 70576 at worst 0.10 per cent; the Lemma-9
exponent 0.5323, 0.4160, 0.2972, 0.2578, 0.2437 against the sealed figures at
worst 0.12 per cent; four of five sealed predictions confirmed. The one FAIL,
prediction (ii) out of band at `@11`, misses **upward**, which puts the true
worst-case coordinate effect further outside the theorem's reach, so it hardens
the closure (`:669-676`). The kill criterion had two ways to fire and neither
did.

### 54 (line 80): the BGT interpolation machine

**"fails for the rotation ensemble too" is true in one coordinate and false in
the other, and the record is explicit about which.** In `u = ln x`, the
coordinate the exponent lives in, H1 fails for the deterministic object and for
the ensemble alike, because `Δπ = π(st) − π(s) − π(t)` is never zero past
`st ≥ 25`, minimum 2, maximum 12 at `(5, 15)`, over 104 pairs
(`import-interp.md:139-147`). In `n = π(x)`, "**H1 in coordinate B, where it
holds**": the rotation ensemble over `P ⊔ Q` is the product of its parts, `L` is
super-additive on disjoint prime sets, "so on the rotation ensemble, in
`n = π(x)`, H1 and H2 both hold and no error term is needed at all" (`:151-157`).
The machine runs there and returns `+∞`, which is useless rather than
unavailable. Honest wording: the machine cannot be aimed at the exponent,
because the coordinate that composes and the coordinate the exponent lives in
are separated by an exponential (`π(x)` is not linear in `ln x`).

**The banked target carries a trap the row does not name.** The row hands
forward "the bounded superadditivity defect of `S(x) = ln(x²/Ĝ(x))`". Two
riders at the record: `S(x) > 0` for all `x` is `G₂(x#) < x²`, the Zone
Postulate (`:194-197`); and the explicit-constant form is threshold-bounded, not
free, "`ln C < ln(x_next²/Ĝ(x))`, which tops out at `1.3946` on integer bases",
so "with any explicit constant the candidate is TPC-implying" is stated to be
wrong as written (`:52-57`). The 1.3946 agrees with `TODO.md:366`'s corrected
trusted legal zone `K ∈ [1.3946, 11.3568)`, so the record is current on that
correction. The route is closed either way; the surviving target should not be
handed on unlabelled.

One transcription nit: the row writes "never 0 past `st = 25`" where the record
quantifies over `st ≥ 25`.

### 55 (line 81): the sofic first-moment shape

**"the first-moment L is polylog" is MEASURED, not proven.** The chain is
`ln(1/f) = 1.001 + 1.451·(2p/m̄)` with `m̄` polylog, hence
`ln(1/f) ≍ p/polylog(p)`, hence `L ≍ ln D/ln(1/f) ≍ polylog`, and the supporting
statement is a fit, `ln L = −1.884 + 2.892·lnln x`, `R² = 0.972`
(`import-sofic.md:203-207`). Over 42 exact census points, with the census itself
corrected from `x = 37` by `fdecay-deep.md`. Rung: MEASURED on a corrected
42-point census with a fitted law, not derived.

**The row quotes the weaker of the two kills.** The pre-registered flatness test
kills estimator B, the map's literal formula, at `t = 2.556` on nine points and
`t = 2.690` on seven. It does not kill estimator A, and the adversary says so
in the record's own header: "What is NOT shown is that estimator A is flat (its
CI contains B's slope)" (`:15-17`). A is disposed of by a transient argument
that is declared post hoc: `A/B` falls to 0.9989 by fold 37, so past the ladder
A and B are the same estimator (`:186-192`). The independent and much cleaner
ground is arithmetic and sits at `§6`: even granting perfect flatness, granting
the extrapolation and granting the whole u-frame chain, the measured ratio
2.1346 misses the requirement (3.4535 at `c = 0.31`, 5.6346 at `c = 0.19`) "by
1.618 to 2.640" (`:236-242`). That clause does not depend on any flatness test
and belongs in the row.

Two further riders at the record, neither in the row: what is refuted is the
map's **rate claim**, while the machinery is validated (estimator C, fed the
object's measured letter weight, is flat at slope 0.135 ± 0.172 with mean ratio
1.4965); and the map's own `p = 101` arithmetic was wrong by 21 per cent because
it used a Chebyshev asymptotic as an equality (`:229-235`).

### 57 (line 83): the linear exponent rule

**Two units are presented side by side as if comparable.** T₃₁'s 4.96 is in band
standard errors: band half-width `0.368027 − 0.359402 = 0.008625`, divided by
`t_{0.975,3} = 3.18245` gives 0.0027102, and the miss 0.013445 over that is
4.961, reproducing `scanstat2.md:110-112` exactly. T₃₇'s 3.63 is in the
measurement's own standard error: `0.024706 / 0.0068 = 3.63`, per
`scanstat-t37.md:23-27`. On the T₃₁ denominator convention, T₃₇'s band
half-width is `0.392641 − 0.381254 = 0.011387`, giving band s.e. 0.0035781 and a
miss of **6.90 band standard errors**, larger than T₃₁'s. [DERIVED here from the
two records' printed bands.] The row therefore understates the second blind
miss relative to the first. The direction is favourable to the closure, so
nothing reopens.

**The row's constants are the three-point law, the missed bands are the
five-level refit's.** `H = 0.2205 + 0.0061 ln D` is
`import-scanstat-03-prereg.js:158`'s `0.220511 + 0.006140`. The band T₃₁ missed
was built from `0.220795 + 0.006146` (`scanstat2.md:96`), and the band T₃₇
missed from the same (`scanstat-t37-04-run.js:240`). The corpus already knows:
`research/audit-numbers.js:1420-1434` runs X9 (the five-level intercept is
0.220795), X9b ("the five-level refit at 4 dp is NOT the pre-registered 0.2205",
asserting 0.2208) and X9c (the two laws agree at T₃₇ within 0.1 measurement
s.e.). So the conflation is guarded and priced, and it is still a conflation
inside the row.

**One clause of the row is stronger than the record.** "no single exponent
should be quoted" is the record's own conclusion and is carried at
`IMPORT-MAP.md:151` with its reason (`H(m≤16) − H(m≤64) > 0` at all six levels).
Confirmed, not narrowed.


### 58 (line 84): the Chen-Stein route

**The `b₃` ceiling range in the row belongs to one of the two objects.** The
route names two targets. Object 1, the multi-kill events, reads `b₃` at 0.850,
0.983, 0.998, 0.9998 of its own ceiling across four windows. Object 2, the
strike process, which is the one carrying "the 3.8", reads "a flat **0.55 to
0.61**" (`import-stein.md:26-29`). The row's "0.85 to 0.9998 of its own ceiling
at every window" therefore describes the extinction-constants half only. What
closes the 3.8 half is the pair-term comparison on the same page: `b₃` runs
"**12.7 to 73.4 times**" `b₁ + b₂` for the strike process, against 200 to 800
times for the multi-kill side. Both are decisive; they are different numbers.

Two riders the record carries and the row does not. The `4S₂` closed form that
predicts `1 − J` at −0.29σ and +0.60σ, and whose asymptote is exactly 4, is
explicitly **not** promoted by the pre-registration's own clause: with
`b₃ > b₁ + b₂` a numerical agreement is "an unexplained coincidence of scale,
not a derivation" (`:60-63`), so the honest label is a zero-parameter candidate
fitting at two levels. And the `J` values are quoted from `xchannel-triples.md`
and were not recomputed in this pass (`:409-411`), while `@17` disagrees with
both.

### 60 (line 86): manufacturing the smooth profile

**The `≳ 0.4` threshold has no derivation anywhere in the corpus.** A grep for
"usable smooth component" across `research/` and `paper/` returns exactly four
hits: the REFUTED row itself, `redteam-0820-math.md:251`,
`smoothness-front.md:53` and `:406`, and a downstream quotation at
`attack-bilinear-transplant.md:419`. The two record hits state a **ratio**
criterion, not a mass share: `smoothness-front.md:406`, "A usable smooth
component would need the low-mass ratio at the scale `C̃/K ≫ 100`", and `:53`,
"against the `≫ 100×` a usable smooth component would need". The `0.4` first
appears at `redteam-0820-math.md:251`, inside the parenthetical of a nit about
the `k = 0` mode, as "still two orders below the ≳0.4 mass share a usable smooth
component needs", with no derivation attached. From the record's own criterion
the implied share is level dependent: the flat null `K/C̃` is 7.81e−3, 3.91e−3
and 1.95e−3 at the three occupied blocks, so `≫ 100×` the null is `≫ 0.78`,
`≫ 0.39` and `≫ 0.195`. The `0.4` is one of those three, quoted as though it
were the threshold. [DERIVED here from the record's printed nulls.]

**The row compares a per-mode quantity against an aggregate one.** "every mode's
share of the factor's mass is ≤ 2.8e−3" is per single mode, and the largest of
those is the `k = 0` DC mode at 2.75e−3, "~45× its flat per-mode share"
(`redteam-0820-math.md:248-250`). The quantity the record's criterion is about
is the **aggregated** low-frequency mass over `K` modes, measured at 5.6e−3,
2.3e−3 and 1.4e−3 against those flat nulls, and per fixed-`s` slice at 0.57 to
1.15 times the null with median 0.82 across 31 of 31 slices
(`smoothness-front.md:398-408`). A smooth component lives across `K` modes, not
in one.

None of this reopens anything. On the record's own instrument the measured
aggregate share sits at or below the flat noise floor at every block and every
slice, and a usable component needs it two to three orders above. The second
clause of the row, the high-frequency remainder retaining `1 − o(1)` of the `ℓ²`
mass and being exactly as inadmissible as the original, was re-derived cleanly
by the red team (`redteam-0820-math.md:257-262`) and is untouched.

Scope, which the row's route name already gets right: this closes **regrouping**
the existing weights. The record's own boundary remark says so and names what it
does not close: "It does not forbid replacing the sieve itself by one with
smooth-by-construction weights", although every upper-bound sieve weight in
existence is `μ`-signed, and the trade of level against smoothness via the
fundamental lemma at `u ≈ 3.04` per side "is not priced further here"
(`smoothness-front.md:490-503`).

### 61 (line 87): the Kowalski-Michel-Sawin branch

**"each independently fatal" holds for one of the two named failures.** The
modulus failure is independent and structural: KMS 2017 Theorem 1.1 opens "Let
`q` be a PRIME" and KMS 2020 says at p. 2, verbatim and confirmed at a rendered
page image by the red team, "In this paper, we will only consider the case where
`q` is a prime", while ours is `z`-smooth squarefree with no large prime factor
anywhere in it and is additionally summed over with rough weights, so their
framework "has no modulus average at all"
(`smoothness-front.md:583-591`). The kernel failure is stated at the record
jointly with the interval-support hypothesis, not standalone: the ratio phase
`e_{d₂}(2h·\overline{d₁})` rewrites as `K(mn)` only with a twist varying in `m`
where theirs is fixed, and "substituting `n → n̄` fixes the shape but scatters
the interval support", so the two rows are marked "**jointly unsatisfiable**".
Honest wording: the modulus hypothesis is independently fatal; the kernel and
interval hypotheses are fatal as a pair.

**The row quotes the weaker half of the fantasy pricing.** `H^{−0.011127}` is
what the granted fantasy saves at the **largest** block `a′ = 0.212157`. At every
block with `a′ < 0.152812`, "which includes the binding `h ≍ 1` block of §3.4",
the saving factor is `≥ 1`, that is **no saving at all** (`:596-600`). The row's
own comparison is also generous by a shade: `0.011127 / 0.035608 = 0.3125`, and
the record says "less than a third", not "a third".

**The row omits the record's named revival condition,** which is what keeps this
a closure of an import rather than of an idea: "what would revive it is a
published KMS-type bound for squarefree smooth moduli with savings a power of
the FULL modulus, which is precisely the open extension named in KMS 2017
§1.5.2, and which Pascadi already prices as 'relatively small' even if it lands"
(`:614-619`). Honest scope: the algebraic-geometry branch is closed against KMS
as published, with the extension the authors themselves name as open, and
already priced small by a third party.

### 63 (line 89): literature-owned special-level constructions

**The record names its own re-open instrument and says it was not run.** From
`special-levels-recon.md:335-340`: "A systematic owning-convention sweep for
'regularity at an engineered modulus' (zbMATH/MathSciNet keyword classes
11N13/11N25) was NOT run; §1's absence claims rest on the family's own surveys
(Thorne, read in full; the Pintz-Rassias TOC) plus GS's examples list, not on an
indexed sweep. If this corner is ever re-opened, start there." Under
`CLAUDE.md`'s own standing rule that a clean negative in the wrong convention is
the default failure mode, an absence claim whose owning-convention sweep has not
run is a bounded survey negative, not a closed literature question. The row's
verdict cell already carries "(recon)" and the clause says "no **surveyed**
construction", so the row is not wrong; it does not carry the re-open address.

**One load-bearing citation is unverified.** The row leans on Heath-Brown's
being the only offensive i.o.-over-levels quantifier. `:328-330`: "**Heath-Brown
1983** citation not verified at source; the dichotomy's exact hypotheses unread
this pass." Two more of the surveyed constructions are second-hand (Shiu 2000
through Thorne's rendered statements, Friedlander-Granville through GS p. 2).
The red team confirmed the Shiu and AGP citation traps and weakened one gloss:
Thorne's footnote is on printed page 2 and "never mentions Siegel zeros", so
reading its subsequence as Siegel-avoidance is a standard gloss, not the
footnote's words (`redteam-0820-structural.md:3c`).

The positive half of the closure does not depend on any of this. The `AGP`
template row and the `ioslack-survey.md` §8d requirement are internal: nothing
surveyed supplies the checkable level-predicate `R(x)` that dial 4 needs, which
is a statement about the programme's own requirement rather than about the
literature.

### 67 (line 93): the QR refinement

Detailed at §0 as the worst finding. The three components, with rungs.

1. **VOID, the registered primary.** `§1c` sealed the clause "if the control
   does not read 0, both treatment verdicts are VOID and the note reports an
   instrument defect, not a finding". The control read +0.00577 at 6.63 s.e.
   under the MC null, against the treatment's +0.00623 at 6.50 s.e., a common
   ratio-of-means bias of about 0.6 per cent present with and without the
   quadratic point (`attack-z3-immune-01.md:266-288`). The record's own words:
   "a note that had run the treatment alone would have reported a 6.5-sigma
   surplus". Rung: no verdict.
2. **The clause the row quotes is post hoc.** The per-prime `Z` values −0.48 to
   +1.66 over 3.4 million twin openers come from `§4a`, under a heading the
   record wrote as "POST HOC, invented after the data, carrying NO verdict"
   (`:326`). Its null needs no sampling design, which is why it survives where
   the registered one did not, and its content is a counting identity: twin
   openers equidistribute over the `r − 2` classes an anchor does not kill, so
   the immune share is `r/(r−2)` and nothing else. Rung: MEASURED post hoc on a
   design-free null, corroborated by `§4c`'s differenced primary at +0.00046 ±
   0.00127 (0.36 s.e.).
3. **The registered test that did hold is not in the row.** The placement test
   holds at `Z = +0.49`, 589 of 1219 anchors against 580.50 expected, with a
   clean control at `Z = +1.59` (`:289-301`). That is the row's one sealed
   result and it belongs in the clause.

Two minor points. "matched control the same" understates the control, whose `Z`
runs +0.24 to +2.39 and is the wider of the two ranges; the intended reading,
that the control reproduces the guardrail-only picture, is right. And the record
declares a gate debt at `:20-25`: `TODO.md` Z3's `Ledger:` line does not list
`Q-z3-immune`, which `research/qc/questions.js` enforces. Not this audit's to
fix and named here so it is not lost.

**Row 59's one rider, recorded without changing the verdict.** The record's §4
cross-reference reads "the free-class adversary is the adversary of Ziller and
Morack's h2 (A288815 ...), but the object differs". Under the collision at
`object-g2-read-0829.md` §5 item 2, what A288815's adversary quantifies over is
itself OPEN: `GLOSSARY.md:278` reads it as a per-prime free choice while
`covering-dive.md:56` reads ZM's Def. 2.2 off the PDF as one global even offset.
The cross-reference is not load-bearing (the record says the object differs and
no number depends on it), so row 59 stays SOUND; the sentence inherits an open
definitional question and should not be quoted as an identification.

## 3. Proposed REFUTED.md rewrites

Nine rows, exact old text to exact new text. The `old` blocks quote the file
verbatim, punctuation included; every `new` block is written without em dashes.
Only the changed cell is given; the route, verdict, date and record cells are
unchanged unless stated. **Nothing here is applied. This note edits no existing
file.**

### 51, line 77. APPLY.

`old` (why cell): *the first scour prime's worst-case effect d(q₁) misses the theorem's own slack by a factor growing like √N (174 → 70,576 over x = 11..23), and the published repair's exponent is ≍ ln²x/x, below 1 at every computable level and falling*

`new`: `the first scour prime's worst-case effect d(q₁) misses the theorem's own slack by a factor growing like √N (174 to 70,576 over x = 11..23); the published repair's exponent is MEASURED below 1 and falling at eight levels (0.5323 at @11 to 0.1682 at @37), with a closed form q₁Π/16 converging onto it from below; and independently, the target is a named anchored word on which an ensemble bound of any strength is inert`

Reason: the row asserts an asymptotic the record twice declines to assert, and
it omits the closing ground that is immune to the exponent moving.

### 54, line 80. APPLY.

`old`: *it closes on hypothesis H1 — π(st) − π(s) − π(t) is never 0 past st = 25 — and fails for the rotation ensemble too; the surviving target is the bounded superadditivity defect of S(x) = ln(x²/Ĝ(x))*

`new`: `it closes on hypothesis H1 in the coordinate the exponent lives in, since π(st) − π(s) − π(t) is never 0 at st ≥ 25 (minimum 2, maximum 12 over 104 pairs), for the rotation ensemble as well; the one coordinate where H1 does hold, n = π(x), has limit +∞; the surviving target is the bounded superadditivity defect of S(x) = ln(x²/Ĝ(x)), whose explicit-constant form is TPC-implying below ln C = 1.3946`

Reason: "fails for the rotation ensemble too" is false in the coordinate where
the machine actually runs, and the banked target is handed on without its label.

### 55, line 81. APPLY.

`old`: *killed by its own pre-registered flatness criterion (t = 2.69) and by the corrected qualifying fraction, which falls faster than 3/p by an order of magnitude; the first-moment L is polylog*

`new`: `killed by its own pre-registered flatness criterion on the map's own formula (t = 2.69 at seven points) and, independently of any flatness, by arithmetic: granting perfect flatness the measured ratio 2.1346 still misses the requirement by 1.618 to 2.640; the corrected qualifying fraction falls faster than 3/p by an order of magnitude and the first-moment L is MEASURED polylog (ln L = −1.884 + 2.892 lnln x, R² = 0.972, 42 corrected census points)`

Reason: the flatness kill fires on estimator B alone and the record says
estimator A's flatness is not shown; the arithmetic ground is unconditional and
is the sturdier half. "L is polylog" is a fit.

### 57, line 83. APPLY, two cells.

`old` (route cell): *the linear exponent rule H = 0.2205 + 0.0061·ln D*

`new`: `the linear exponent rule H = a + b·ln D (pre-registered 0.220511 + 0.006140, refitted 0.220795 + 0.006146)`

`old` (why cell): *validated one level out at T₂₉ and then missed both sealed bands — T₃₁ at 4.96 band-s.e. and T₃₇ at 3.63 s.e., two engines; H is a grid-dependent summary of a curve and no single exponent should be quoted*

`new`: `validated one level out at T₂₉ and then missed both sealed bands, T₃₁ by 4.96 and T₃₇ by 6.90 band standard errors (1.99 and 3.63 of each measurement's own s.e.), two engines; H is a grid-dependent summary of a curve and no single exponent should be quoted`

Reason: the row's constants are the three-point law while the bands missed were
the five-level refit's, a split `audit-numbers.js` X9/X9b already guards; and
the two misses were quoted in two different units, understating the second.

### 58, line 84. APPLY.

`old`: *b₃ sits at 0.85–0.9998 of its own ceiling at every window (one shared uniform residue draw), and the deficit does not live in the super-W part (δ_tot/s = 0.0195 vs measured 0.0341 at @23)*

`new`: `one shared uniform residue draw per object leaves no error term: b₃ reaches 0.850 to 0.9998 of its own ceiling on the multi-kill events and 12.7 to 73.4 times b₁ + b₂ on the strike process; and the deficit does not live in the super-W part (δ_tot/s = 0.0195 against a measured 0.0341 at @23)`

Reason: the quoted ceiling range belongs to the extinction-constants object
only; the 3.8 object reads 0.55 to 0.61 of its ceiling and is closed by the
pair-term ratio instead.

### 60, line 86. HOLD, for Chris.

`old`: *Möbius-signed weights are Fourier-flat — every mode's share of the factor's mass is ≤ 2.8e−3 against the ≳ 0.4 a usable smooth component needs, and the exact blocking term is the high-frequency remainder of the completed expansion, which keeps 1 − o(1) of the ℓ² mass and is exactly as inadmissible as the original*

`new`: `Möbius-signed weights are Fourier-flat: the aggregated low-frequency mass share sits at or below the flat null at every occupied block and at 31 of 31 fixed-s slices (0.57 to 1.15 times the null, median 0.82) where a usable smooth component needs it at scale C̃/K ≫ 100, and the largest single mode, k = 0 included, carries 2.8e−3; the exact blocking term is the high-frequency remainder of the completed expansion, which keeps 1 − o(1) of the ℓ² mass and is exactly as inadmissible as the original`

HOLD, not APPLY, because the fix removes a number (`≳ 0.4`) that two documents
now quote, and whoever removes it should decide at the same time whether
`attack-bilinear-transplant.md:419` is corrected or left as a HELD note with a
rider. The `≳ 0.4` has no derivation at any record; if it is kept it needs one.

### 61, line 87. APPLY.

`old`: *fails on the modulus (both papers require a single fixed PRIME, by the authors' own scoping, read at source) and on the kernel rank (they need Kl_k, k ≥ 2 with big monodromy; ours is a rank-1 pullback) — each independently fatal; even the granted fantasy saves only H^{−0.011127}, a third of Bettin–Chandee's standing H^{−0.035608}*

`new`: `the modulus hypothesis fails on its own (both papers scope themselves to a single fixed PRIME in the authors' own words, read at source, while ours is z-smooth squarefree and is summed over), and the kernel and interval-support hypotheses are jointly unsatisfiable for the rank-1 ratio phase; the granted fantasy gives no saving at all on the binding h ≍ 1 block and H^{−0.011127} on the largest, under a third of Bettin-Chandee's standing H^{−0.035608}; revival needs the squarefree-smooth-moduli extension KMS 2017 §1.5.2 names as open`

Reason: "each independently fatal" overstates the kernel row, which the record
marks jointly unsatisfiable with the interval row; and the row quotes the
fantasy's best block rather than its binding one.

### 63, line 89. APPLY.

`old`: *the field's level engineering is entirely on the DEVIATION side — no surveyed construction certifies smallness or regularity of a max-type object at its engineered level, and the only offensive i.o.-over-levels quantifier (Heath-Brown's) hypothesises its levels rather than constructing them*

`new`: `the field's level engineering is entirely on the DEVIATION side: no surveyed construction certifies smallness or regularity of a max-type object at its engineered level, and the only offensive i.o.-over-levels quantifier (Heath-Brown's, citation unverified at source) hypothesises its levels rather than constructing them; the absence rests on the family's own surveys, the indexed 11N13/11N25 owning-convention sweep never having run`

Reason: the record names the un-run sweep as the re-open address and the row
should carry it, per `SEARCH-CONVENTIONS.md`'s own failure mode.

### 67, line 93. APPLY.

`old`: *the immune classes deliver exactly the guardrail's r/(r−2) and nothing past it (per-prime Z −0.48..+1.66 over 3.4M twin openers, matched control the same), and as a certificate they are dominated by simply naming the two classes each small prime kills, which certifies 1219/1219 anchors against the immune subset's 1126*

`new`: `the registered surplus test is VOID on its own matched control (a 0.6% design bias at 6.63 s.e. where no class is QR-immune at all), and what stands is the registered placement test at Z = +0.49 plus a POST-HOC design-free class test in which the immune classes deliver exactly the guardrail's r/(r−2) and nothing past it (per-prime Z −0.48..+1.66 over 3.4M twin openers, differenced primary +0.00046 ± 0.00127); as a certificate they are dominated by simply naming the two classes each small prime kills, which certifies 1219/1219 anchors against the immune subset's 1126`

Reason: the row presents a reading its own record labels post hoc and carrying
no verdict as though it were the registered result, and drops the registered
result that did hold.

### Not proposed for change

Rows 52, 53, 56, 59, 62, 64, 65 and 66 stand as written. Row 59's wording is
already the red team's corrected sentence and is the better of the two in the
corpus. Row 66's clause is the record's own drafted sharper form and its two
numbers reproduce here to the printed digit.


## 4. Defects of this audit

Stated so the next pass knows what it is inheriting.

1. **No source was opened.** Every literature claim in rows 52, 53, 61, 62, 63
   and 66 was checked against the record's own quotation and against the
   red-team report that re-read it, never against the paper. Where a record and
   its red team agree, this audit agreed with them. That is a custody check, not
   a verification. In particular the KMS 2017 "Let `q` be a PRIME" reading is
   `smoothness-front.md`'s page-image read, confirmed by the red team only for
   the 2020 paper.
2. **Two producers were not re-run.** `import-talagrand-01-price-c.js` (401.2 s)
   and `scanstat2-01-t31.js` (3029.3 s) exceed this audit's two-minute ceiling,
   so rows 51, 56 and 57 rest on their embedded blocks and on the record's own
   scorecards. Four producers were custody-checked clean.
3. **The band-standard-error convention for row 57 is inferred.** The record
   prints 4.96 for T₃₁ without naming its denominator. This audit recovered it
   as half-width over `t_{0.975,3} = 3.18245` because that reproduces 4.961
   against the printed 4.96, and then applied the same convention to T₃₇ to get
   6.90. If the record meant a different denominator, the 6.90 is wrong and the
   row's two figures may already be comparable. The finding's direction does not
   change either way.
4. **The `≳ 0.4` search was a grep, not a reconstruction.** This audit
   established that the string appears in four places and is derived in none of
   them. It did not attempt to derive a correct threshold from Pascadi's
   Kuznetsov step, which is where one would come from. The claim is "no
   derivation exists in this corpus", not "no such threshold exists".
5. **Nine SOUND-NARROWER verdicts is a high rate and may reflect this audit's
   threshold rather than the rows.** The line drawn here is: a row is narrowed
   when its wording would lead a reader to believe something broader or better
   established than the record carries. A reader who draws that line further out
   would call several of the nine SOUND. None of the nine is a reopening and
   none should be read as one.
6. **The `h₂` collision was noted, not resolved.** Row 59's cross-reference
   inherits an OPEN definitional question about what A288815's adversary
   quantifies over. This audit did not read Ziller and Morack.
7. **Rows were audited as closures, not as routes.** Whether any of these
   seventeen routes would be worth reopening on new grounds is outside the
   question asked. Nothing here says any of them should be.
8. **The gate debt at `attack-z3-immune-01.md:20-25` is reported, not fixed.**
   `TODO.md` Z3's `Ledger:` line does not list `Q-z3-immune`. This note edits no
   existing file.
