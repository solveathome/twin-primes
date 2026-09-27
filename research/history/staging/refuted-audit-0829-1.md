# Refuted-audit, rows 1 to 17: re-deriving the closures

<!-- ledger
id: Q-refuted-audit-0829-1
status: ANSWERED
todo: none
question: Do the closures recorded in REFUTED.md rows 1 to 17 survive re-derivation against the object definitions, the producers' embedded output and the corpus corrections through 2026-08-29?
verdict: Ten of the seventeen rows stand as written and seven are SOUND-NARROWER on wording that claims more than the record carries; no row is WEAKENED or UNSOUND, no route reopens, and the sharpest defect is row 16 crediting a published lemma whose own hypothesis excludes this corpus's operative range.
-->

*(2026-08-29. Internal, HELD under the publication moratorium. An audit of
closures rather than of routes: each row is re-derived from its own record, and
the verdict is about whether the row's clause matches what that record carries.
Calibration marked per claim: PROVEN, VERIFIED, MEASURED, INFERRED, HEURISTIC,
OPEN. One producer was re-run read-only (`gate-multiplies-03.js`); every other
number is read from an embedded OUTPUT block or is hand arithmetic on cited
constants, marked [ARITHMETIC] where it is this audit's.)*

## §0. Verdict

**Range covered.** Rows 1 to 17 in file order, counted from the header at
`research/REFUTED.md`:25 and its separator at :26. Row 1 is *the localized merge
chain, telescoped to level x* (`REFUTED.md`:27) and row 17 is *`u_sup` as an
unconditional worst-position bound* (:43). The brief named *Lemma V's mean-square
form as the missing factor* as the seventeenth; by the file's own row order that
is row 16 (:42), so this range is the brief's plus one row, and the overlap with
the sibling covering rows 18 to 34 is at most that one row.

**Counts.** SOUND 10, SOUND-NARROWER 7, WEAKENED 0, UNSOUND 0. **No route
reopens at rung OPEN.** Every closing mechanism re-derived here holds; the seven
SOUND-NARROWER verdicts are all about a row clause that overstates the rung, the
attribution or the coordinates of a closure that itself survives.

**The three findings that matter, worst first.**

1. **Row 16, `REFUTED.md`:42.** The clause reads "`B ≤ 9A²(E−1) = O((log z)⁸)` is
   a theorem with no hypothesis, published as Opera de Cribro 6.18". The record
   `history/staging/attack-AB-bounded.md` §3.3 says the opposite of the
   attribution half in its own heading, "Why it does not simply drop in, and this
   is the queue item": Lemma 6.18 requires `s ≥ 9` and "this corpus runs `s` in
   [2.0, 3.4]", plus three further unresolved deltas, and the section closes by
   naming a live queue item. The unconditional bound in the operative range is
   this corpus's own, graded **[INFERRED]** for the chain and **[VERIFIED]** for
   the steps over z = 13..41 (§1.1), not [PROVEN]. A reader of the row takes a
   live queue item for a settled attribution and an INFERRED chain for a
   published theorem. The closure survives on its other clause, "B was never the
   binding term", VERIFIED at z = 13..47 (§HEADLINE item 5).
2. **Row 9, `REFUTED.md`:35.** The clause leads with "the reported crossing was a
   fixed-window artifact". `history/staging/phase1-T4-maximal-law.md` states in
   terms that the artifact correction removed the reason the route had been
   called dead: "The route is not refuted by the unconditional data. It is
   refuted by sec.2." The first clause therefore describes a correction that ran
   in the route's favour, printed in the column of reasons it closed. The
   closure stands on the second clause alone, and that clause's TPC-strength
   label holds under Axis A and Axis D of
   `history/staging/attack-wrongdirection-audit.md` §1.
3. **Row 5, `REFUTED.md`:31.** The Overshoot Budget's quoted 0.88 to 1.19 nats is
   `ln(x²/G₂(x#))`, a target 0.4 nats tighter than the programme's own
   `G₂(x#) < x′² − 2` (`G2-STATE.md` §3). Against the programme's target the same
   eight levels read 1.16 to 1.47 nats [ARITHMETIC, §2]. This is the same
   denominator collision the 2026-08-29 pass logged for the "window/G₂" label
   (`z2-state-draft-0829.md` §5f) with a fourth denominator added. The closure
   survives; the numbers in the row do not travel to the Zone Postulate's target
   unchanged.

**What did not move.** None of the 2026-08-29 live-layer corrections (the tail's
unit, the window/G₂ label, the Euclid anchor's symbol) falsifies any row in this
range. The h₂ definition collision (`object-g2-read-0829.md` §5 item 2) touches
rows 10 and 13 only through the label; `h₂ ≥ h` holds under both readings, so
row 13's mechanism is unaffected. The `M(x, x²)` versus `M(x, x′²)` label
(`z2-state-draft-0829.md` §5e) does not reach rows 1 to 4, whose `M(T_x, Y)` is
a third object (the max twin-slot gap inside a fixed `[0, Y)`), though that is a
third use of the letter M and is flagged in §4.

## §1. Row by row

| # | route (line) | closing mechanism, one sentence | verdict | reason | record and producer checked |
|---|---|---|---|---|---|
| 1 | the localized merge chain, telescoped to level x (:27) | The Deficit Lemma, a one-line averaging fact, forces `maxsum_m ≥ m·m̄`, so the telescope's own gate caps it at `j ≤ α x₀/m̄ ≈ x₀/(9.6 ln²x₀)` folds against the `π(x) ≈ x/ln x` the route needs. | **SOUND** | The Deficit Lemma is PROVEN in the record and `m̄ ≈ 2.4 ln²x` is Mertens (density `∏_{2<p≤x}(1−2/p) → 0.41621/ln²x`, so `m̄ = 2.403 ln²x` [ARITHMETIC]); `9.6 = 4 × 2.4` and `9.6 ln 16001 = 92.9` reproduce the row's factor 93. Quantifier is stronger than the route needs: an every-x deficit closes a route that would only have needed i.o. Scope: the fixed-base telescope, and the record itself carves out the re-basing chain (§10). | `localized-04-maxsum.md` §7, §10; engine `research/localized-04-maxsum.js` (OUTPUT embedded, not re-run) |
| 2 | weakening the gate to M ≤ α·p (:28) | The gate feeds back: a running bound `B` buys `B/x` kills per fold, so `π(x)` folds return `2.4·R·B·ln x`, and self-consistency needs `2.4 R ln x ≤ 1`, false at every x ≥ 2. | **SOUND** | The map is linear in B, so a larger α rescales without creating a fixed point. Re-derived independently for the constant-α regime the record's `B/x + 1` approximation skips: `B ≤ αx` gives `J ≈ (α+1)x/ln x` and `maxsum_J ≈ 2.4R(α+1)x ln x`, which needs `2.4R(α+1) ln x ≤ α`, false for every constant α [ARITHMETIC]. Rows 1 and 2 jointly cover both regimes. | `localized-04-maxsum.md` §10 |
| 3 | bounding the increment rather than the level (:29) | Even the true per-fold increments of M outrun the gate's earn of `ln x/4` by an order of magnitude, so a perfect increment bound would not close the chain. | **SOUND** | Measured at one level only (x = 307, 61 folds, 20 of them moving M, mean increment 14.16 against 1.43, ratio 9.9), but the same statement follows from the Deficit Lemma for the only bound a chain can carry: telescoping `maxsum_m ≥ m·m̄` forces mean increment ≥ `m̄ = 2.4 ln²x` against `ln x/4`, ratio `9.6 ln x`, PROVEN [ARITHMETIC]. The row's clause is the measured half of a proven statement. | `localized-04-maxsum.md` §10 repair 1; `localized-01-ladder.js` |
| 4 | composing the chain in blocks to reach M ≲ 3.3 x ln x (:30) | Blocks do not compose because M is cumulative while the gate earns only `(q_{j+1}−q_j)/4` per fold, so the composed bound ends at `3.3 x ln x` against a gate of `x/4` it must respect at every step. | **SOUND** | Every constant reproduces: `9.6 ln 2 = 6.65` blocks per doubling, `Σ (6.7/4) ln x · x/2^k = 3.35 x ln x`, and `3.3 x ln x / (x/4) = 13.2 ln x` [ARITHMETIC]. The contradiction is visible with no measurement, as the record says, and the block structure is quantified over ("whatever the block structure"). | `localized-04-maxsum.md` §7 |
| 5 | the accumulating-index family on the tile (A4, A10's m_eff) (:31) | Any valid chain of upper bounds ending in `G₂(x#) < x²` passes through quantities all ≥ `G₂(x#)`, capping its lifetime multiplicative overshoot at `x²/G₂(x#)`, while the only unconditional counting tool is loose by 3.5× to 6.7× at a single fold. | **SOUND-NARROWER** | Three riders, none fatal. (i) The nats are against `x²`, not the programme's `x′² − 2`; re-read against the latter the eight levels give 1.16 to 1.47 nats [ARITHMETIC], and the tightest tool looseness (`ln 3.5 = 1.25` nats) then sits below the budget at four of eight levels. (ii) The asymptotic cap 1.82 assumes exponent exactly 2, which `G2-STATE.md` §3 lists as MEASURED 1.50 ± 0.05 and open, and gate-multiplies §7 says so in its own words. (iii) The m_eff half is closed by step 4's refutation, not by the budget (§6 table row "10 (A10)"). What survives independent of all three: the chain busts at a reachable fold, re-run here read-only, `maxsum_5(T_29)/G₂ = 1.9767` against a requirement of 1.376. Also `1.19` is a mis-rounding of the table's maximum 1.182. | `gate-multiplies.md` §5, §6; re-ran `node research/gate-multiplies-03.js` read-only (T_29 ladder to maxsum_12, the fold-31 bust line reproduced verbatim; wall time not recorded) |
| 6 | TODO 0b as stated, ln c ≲ 2 ln²u/u ⟹ G2(u) < u² (:32) | The telescope's budget is `Σ_{p≤u} ln c(p) ≤ 2 ln u − ln 12`, and `Σ_{p≤u} 2 ln²p/p ~ ln²u` overspends it by `ln u/2`, so the stated rate certifies a bound diverging from `u²`. | **SOUND-NARROWER** | The mechanism is PROVEN algebra plus a VERIFIED table (4.64× at u = 37 to 1.59e10 at u = 1000), and the sharp per-fold rate `2 ln p/p` follows from differentiating the partial-sum condition. The defect is the row's second clause: "the measured multiplier already spends 106% of it" is the mean of the Ziller-Morack adversarial terms at p = 41..73 (1.0567 [ARITHMETIC] on the record's nine values), not of this corpus's own ladder, whose mean is 1.304 on the same table. The record's own closing sentence pairs this corpus's range with their mean. Either number supports the closure; the row quotes the smaller one without its coordinates. | `gate-multiplies.md` §7; `research/gate-multiplies-01.js` OUTPUT (embedded) |
| 7 | the Maier matrix as a route to the origin (:33) | The Origin Excess Lemma needs `S ≤ y′²` and the Zone Postulate needs `S = x′²`, so both hold only if `y ≥ x`, where the matrix is the tautology `0 = 0`. | **SOUND** | One line and parameter-free: `y < x` with x prime gives `y′ ≤ x < x′`, hence `y′² < x′²` strictly, so no better lemma repairs it. A second independent closure sits beside it (§5a: below `y′²` the identity's input and output are both the twin-prime count, the A6 degeneracy). Scope is correct in the row's own words, "as a route to the origin"; the matrix's other uses are classified in §6, not closed. | `maier-matrix.md` §5, §5a; `research/origin-excess.js` OUTPUT (embedded) |
| 8 | the origin as a distinguished position at S = x′² (:34) | At the zone's own width the origin carries `ρ(2)` of the tile's mean density rather than more, and `ρ` takes its minimum at u = 2, so the advantage has expired before the window the Zone Postulate asks for. | **SOUND-NARROWER** | The refutation is sound and is witnessed by exact counterexample, not only by trend: at y = 13, x = 19, S = 529 the origin sits below the mean, rank 135 of 323. The row's arrow overstates the record: `origin-excess.md` §5 grades the ceiling "(MEASURED, HL-conditional in its exact value)", and reading the limit `ρ(2) → e^{2γ}/4` as established would assert the Hardy-Littlewood twin asymptotic, since `D_x(x′²)` below `x′²` is the twin-prime count by crystallisation. Measured raw values run 1.00 at x = 181 down to 0.912 at x = 6037; divided by the window's measured HL factor they read 0.79303 to 0.79922 against `e^{2γ}/4 = 0.79305`. | `origin-excess.md` §2 (identity, VERIFIED 39/39), §5; `research/origin-excess.js` |
| 9 | the certificate route (the θ ladder) as a road to TPC (:35) | The sharp maximal law that would finish the route, stated for the operative remainder `R_H`, gives an all-positions window of `need/z² = 0.49 to 0.61` at every z from 13 to 43, which is the Gap Reformulation and hence TPC, so no soft argument can prove it. | **SOUND-NARROWER** | The closure holds and the label holds: `H ≈ 0.61 z² ≤ w² − w` at i.o. w is TPC-implying by Axis A, and the functional is `min_x N(x) ≥ 1`, the target functional under Axis D (`attack-wrongdirection-audit.md` §1, target 6 confirms at 0.4913 to 0.6144). The row's first clause is the defect: the record states "the crossing ... does not happen" and "the route is not refuted by the unconditional data", so the fixed-window artifact removed a reason for closure rather than supplying one. Corrected self-consistently the certificate is positive at all 223,092,870 positions at H = 0.46 z² and the real crossing sits in (31, 47]. | `theta-ladder.md` §5b (carries the correction in place); `history/staging/phase1-T4-maximal-law.md`; `research/theta-ladder-sup.js`:18 (the hardcoded u) |
| 10 | extending h2 past 21 terms as the high-value computation (:36) | Term 22 is a roughly four-year single-thread computation and would buy nothing, because on the one-class control where the truth is known 56 terms out to p = 271 still select the wrong model by the largest margin in the table. | **SOUND** | Precision was never the constraint: sliding-window `sd·width` is flat at 1.05, so sd = 0.057 at 19 terms against the 0.17 that separates 1.5 from 2 at three sigma [ARITHMETIC checks both]. The bias argument is the right shape (nested prefixes of a control containing the truth, ΔAIC growing monotonically 0.5 → 46.9). All three cheaper proxies are refuted separately, one of them by a CRT one-liner (h2 has no location, so windowing an adversarial object saves nothing). WITHDRAWN is a decision about a computation's value, so the quantifier axis does not apply. | `h2-scoping.md` §5, §6; `research/h2-lower-ladder.js`, `h2-randomised.js`, `h2-length-needed.js` OUTPUT (embedded) |
| 11 | the two-class driving-term route (Holt's method adapted) (:37) | The driving-term lemma's hypothesis caps the certified span below `x′ − 2`, and materialising a span of order x advances the level to order x, so the conclusion `G₂(X#) ≫ X` is already free from `G₂ ≥ F(x) + 1 ≥ x′`. | **SOUND** | The level arithmetic reproduces: `j+1 ≈ x/(2.4 ln²x)` slots, `k = π(x) ≈ x/ln x`, so `j ≈ k/(2.4 ln x)` and `p_{k+j−1} ≈ x(1 + 1/(2.4 ln x))` [ARITHMETIC]. The row's split verdict ("route REFUTED, lemma stands") is the right one: the lemma is PROVEN and kept as a bookkeeping device for the linear regime. Uses the `F` symbol, which is the form the 2026-08-29 correction says is the unconditional one. | `two-class-lower-bounds.md` §7, §8 |
| 12 | Hagedorn's algebraic construction h(n) ≥ 2p_{n−1}, adapted (:38) | Applied to `G₂` the CRT construction returns the same `2p`, which is the linear regime row 11 already shows is free, and extending it past that requires knowing where the first twin slot sits. | **SOUND-NARROWER** | The closure stands, but on the clause the row does not name. The record's carried argument is the heading "Hagedorn's algebraic construction has the same ceiling", derived; the circularity is one asserted sentence with no derivation beside it. A reader of the row takes an unelaborated remark for the mechanism and may conclude the construction is otherwise sound. | `two-class-lower-bounds.md` §7 (last paragraph) |
| 13 | the proportional-bias exponent correction (:39) | The correction returns 0.67 to 0.83, below the pointwise floor `h₂ ≥ h`, so it overshoots and is refuted by data the corpus already holds. | **SOUND** | `h₂ ≥ h` is elementary and VERIFIED at all 21 terms, and it survives both readings in the h₂ definition collision (under the per-prime-adversarial reading the one-class optimum is an admissible choice; under the even-offset reading the paired set is a subset of the coprime set, so its maximal gap is at least as long). The floor the closure needs is only "exponent ≥ 1", which is PROVEN independently through `G₂ ≥ g` and FGKMT's `g(x#) ≫ x log x logloglog x/loglog x`. The record's supporting phrase "exponent(h) = 1 + o(1)" is CONJECTURED rather than proven asymptotically (Iwaniec gives ≪ x² only), but the closure does not consume it. | `exponent-control.md` §3; `research/exponent-control.js` OUTPUT (embedded); `object-g2-read-0829.md` §5 item 2 |
| 14 | any twin-specific discrepancy law (:40) | A control with the same primes and the same number of removed classes but random classes reproduces the twin set's discrepancy, so the growth law is a function of the class count alone. | **SOUND-NARROWER** | The reading is right and the structural half supports it (the level law's integer 3 is `k+1` and provable, class-independent), but the row's "any" rests on one configuration: k = 2, top prime 23, 24 draws, the twin set at the 71st percentile in sd and the 79th in sup. That is a null result at one level with n = 24, quoted without its coordinates, against the corpus's own house rule that a ladder reading carries its control line. Absence of a detectable twin effect at x = 23 is not a refutation of every twin-specific law at every level or in every norm. | `discrepancy-two-class.md` §6, §7; `research/discrepancy-two-class.js` OUTPUT (embedded) |
| 15 | GS Corollary 1.4 as an obstruction (:41) | The corollary sets `η = min(α/3, 1/100)`, so `u ≥ 5/η² ≥ 50,000` always, and the upper constraint `u ≤ η(log x)^{η/2}` then forces `log x ≥ (5·10⁶)^{200}`. | **SOUND** | Both inequalities reproduce from the verbatim quote: `5/η² = 5·10⁴` and `(log x)^{1/200} ≥ 5/η³ = 5·10⁶` [ARITHMETIC]. The cap on η is by construction and holds for every sequence regardless of α, and a smaller η only makes it worse. Source read from the published Annals page and independently from the arXiv PDF, with the numbering checked in both. Scope is correct: Corollary 1.4 as an obstruction, not the GS uncertainty principle, which §8 shows this set satisfies explicitly. | `maier-matrix.md` §8; `history/staging/lit-pdf-fgkt-maier.md` item 2 |
| 16 | Lemma V's mean-square form as the missing factor (:42) | `B` is polylog in z while the mean-square Lemma V needs only `B ≤ H/log⁶H` with `H` a power of z, and in the currency that could reach `G₂` the `min` picks the `B2` branch at every z, so `B` was never the binding term. | **SOUND-NARROWER** | The closure survives on "B was never the binding term" (VERIFIED at every z from 13 to 47; `B` binds only below a crossover `u* = 1.46..2.69` while the exponent runs 3.43..7.20). Two over-claims in the clause: the chain is graded [INFERRED] with [VERIFIED] steps over z = 13..41, not a theorem; and the attribution to Opera de Cribro 6.18 is contradicted by the record's own §3.3, which lists four unresolved deltas, the first being that the published lemma needs `s ≥ 9` against this corpus's `s ∈ [2.0, 3.4]`, and which names a live queue item. See §2. | `history/staging/attack-AB-bounded.md` §1.1, §1.2, §3.3, §3.4; `history/staging/attack-tail-maximal.md`; `research/attack-beta2-A-B-bounded.js` OUTPUT (embedded) |
| 17 | `u_sup` as an unconditional worst-position bound (:43) | The absolute-value step that removes the position quantifier costs `C^{π(z)}`, so the saturation sum grows by a flat factor ~2.05 per added prime and `u_sup` diverges like `π(z)/ln z` rather than plateauing below β₂. | **SOUND** | Nine measured levels z = 13..43, rising at all eight steps (2.0617 to 3.2026), constant model's RSS 49× the best fit's. The mechanism is close to structural rather than merely fitted: `e` runs over the `2^{π(z)}` divisors of `P(z)` and the triangle inequality over them is exactly where the `C^{π(z)}` goes, with the constant recomputed at 2.0516 by an independent re-pricing. The crossing point is undetermined and the closure does not need it. Basis-independence is a like-for-like check on the same instrument, and the record says so at its true size. Nit: "rises at all nine levels" is eight steps over nine levels. | `sift-limit-attack.md` §7e; `history/staging/attack-tau-repricing.md`, `history/staging/attack-hm-basis.md`; `research/lemmaV-sup-extension.js` OUTPUT (embedded) |

## §2. Rows needing detail

**No row in this range is WEAKENED and none is UNSOUND.** Every closing
mechanism re-derived above holds, and no route reopens. What follows is the
detail behind the three SOUND-NARROWER verdicts that carry substance, then four
that are wording only.

### 2.1 Row 16 (`REFUTED.md`:42), Lemma V's mean-square form

**The argument as the row states it.** "`B ≤ 9A²(E−1) = O((log z)⁸)` is a
theorem with no hypothesis, published as Opera de Cribro 6.18, and B was never
the binding term."

**What the record carries.** Three separable statements, at three rungs.

- The mean-square form itself, `⟨R²⟩_H ≤ B(z,s)·H` for every H, z, s, is
  **PROVED unconditionally** in `sift-limit-attack.md` §7e: five identities and
  two triangle inequalities, and the same L4 step proves (V1) and (V2), which
  `sift-limit-lemmaV.js` had asserted without proof. This half is not in
  dispute.
- The bound on `B` is graded by its own record, `attack-AB-bounded.md` §1.1, as
  **[INFERRED] for the chain** (a deduction from the sourced `|λ_d| ≤ 1`) and
  **[VERIFIED] for each step per-e**, with zero violations over z = 13..41. Its
  sourced inputs are published (Iwaniec's `|λ_d| ≤ 1`, Richert's
  `#{(d₁,d₂) : [d₁,d₂] = d} = 3^{ν(d)}`), and two of the four cited Iwaniec
  papers are image scans read only through secondary summaries (§3.4). Calling
  it "a theorem" raises the corpus's own label by one rung.
- The attribution is the sharp defect. §3.3 is headed "Why it does not simply
  drop in, and this is the queue item" and lists four deltas, none resolved:
  (i) the published proof's finish assumes `s = log D/log z ≥ β + 1` with
  `β ≥ 8`, that is `s ≥ 9`, "This corpus runs `s` in [2.0, 3.4]"; (ii) the
  paper's author flags `β ≥ 8` as possibly a proof artifact, which makes it
  soft but not lifted; (iii) the absolute values sit in a different place, this corpus's
  `Vabs(e)` taking `|·|` on the split pieces first, so `B` is at least the
  Friedlander-shaped quantity and "the entire gap is the split"; (iv) the object here is
  the two-factor one against his one-dimensional `λ_m`.

**What moved, and what did not.** Nothing has moved since the closure; the row
was over-stated at the time it was written. The route stays closed, because the
closure does not run through the attribution at all: it runs through
§HEADLINE item 5, VERIFIED, that `attack-beta2-01` §4(ii)'s all-positions
exponent takes `min(B·H, B2)` and the min picks the `B2` branch at **every** z
from 13 to 47, `B` binding only below a crossover `u* = 1.4641..2.6912` while
the exponent itself runs 3.4299..7.1966.

**What would be needed to change the verdict on the attribution.** Pricing
Lemma 6.18's `β ≥ 8` against `s ∈ [2.0, 3.4]`, which is the queue item §3.3
names. Until that runs, the honest sentence is that a published estimate of the
same shape exists at `s ≥ 9` and that the operative-range bound is this
corpus's own.

**A second-order observation, HOLD.** `G2-STATE.md`:35-38 lists this item in its
**PROVEN** block: "The mean-square Lemma V, with `B ≤ 9A(z)²(E(z)−1) =
O((log z)⁸)` and the finding that B was never the binding term." The
mean-square form is proven; the `B` bound is [INFERRED] at its record and the
"never binding" finding is [VERIFIED] over z = 13..47. Splitting the entry so
the three rungs travel separately is a live-layer edit and therefore Chris's
call, not this audit's.

### 2.2 Row 9 (`REFUTED.md`:35), the θ ladder

**The argument as the row states it.** "the reported crossing was a fixed-window
artifact, and the sharp maximal law that would finish the route is itself
TPC-implying."

**The direction problem.** `theta-ladder.md` §5b carries the correction in
place: `research/theta-ladder-sup.js`:18 reads
`const z=Number(process.argv[2]), u=3.2, s=3.0;`, so z comes from the caller and
u never does, and every `need_true` in that section was measured at a window 61×
to 123× longer than the operative one. Corrected self-consistently,
`need_true/z²` reads 0.5485 / 0.4877 / 0.4637 at z = 19 / 23 / 29 against the
published 0.869 / 0.849 / 1.006, and the certificate is positive at every one of
the 223,092,870 positions at H = 0.46 z². `phase1-T4-maximal-law.md` draws the
conclusion in terms: "The crossing that reading 8 calls 'the headline of the
run', and that TODO 0 cites as the reason this is not a road to TPC, does not
happen. The route is not refuted by the unconditional data. It is refuted by
sec.2."

So the row's first clause names a correction that ran in the route's favour and
prints it in the column of reasons the route closed. A reader given only the row
would take the artifact for a cause of death.

**The clause that does close it, and its label under axes A to D.** The sharp
maximal law stated for the operative remainder `R_H` gives
`need/z² = 0.49 to 0.61`, flat and below the zone budget at every z from 13 to
43 (`attack-wrongdirection-audit.md` §1, target 6: 0.4913 to 0.6144). Axis A:
a window `H ≈ 0.61 z²` satisfies `H ≤ w² − w` and, held at i.o. w, is
TPC-implying, so the label is (ii) TPC-strength. Axis B buys nothing. Axis C
does not apply, the statement being all-positions rather than almost-all. Axis
D: the functional is `min_x N(x) ≥ 1`, the target functional, not `E[N] ≥ 1`
and not `P(N = 0) ≤ ε`. **The TPC-strength label holds.** The measured rider
that makes it uncomfortable rather than comforting is in the same record: at the
operative window `sup|R_H|/(rms·√(2 lnW))` reads 0.56, 0.73, 0.92, 0.79, 0.85 at
z = 13..29, so the law is approximately exact on the sawtooth, and a hypothesis
true to a few percent whose truth gives TPC is not one with a soft proof waiting.

### 2.3 Row 5 (`REFUTED.md`:31), the accumulating-index family

**The denominator.** The Overshoot Budget is stated for chains "ending in
`G₂(x#) < x²`" and its slack column is `ln(x²/G₂(x#))`: 1.058, 0.940, 0.984,
0.878, 0.953, 1.182, 1.016, 0.953 at x = 11..37. The programme's target is
`G₂(x#) < x′² − 2` (`G2-STATE.md` §3, `ZONE-POSTULATE.md` §1b), which is
`4p + 4 − 2` wider. Against that target the same eight levels give 1.380, 1.470,
1.201, 1.256, 1.414, 1.313, 1.368, 1.157 nats [ARITHMETIC, on `G2-STATE.md` §2's
exact ladder]. The tool's looseness at one fold, 3.5× to 6.7×, is 1.253 to 1.902
nats, so under the programme's own target the tightest looseness sits **below**
the budget at four of the eight levels rather than above it at all eight. This
is the `z2-state-draft-0829.md` §5f collision ("one phrase, window/G₂, two
denominators and three ranges") with a fourth denominator, `x²`, added.

**Why the closure survives it anyway.** Three independent reasons, in order of
strength. (i) The budget is a **lifetime** total over `π(x)` folds, so even
1.25 nats spent at one fold leaves under 0.2 nats for the remaining `π(x) − 1`,
and the record's own consequence sentence is the operative one: "An
accumulating-index chain must bound the cumulative index to within a factor
under 2 of the truth, over `π(x)` folds. That is not a bound on the answer, it
is the answer." (ii) The chain busts at a fold this box can reach, re-run
read-only here: `gate-multiplies-03.js` prints "step-3 chain at fold 31 needs
maxsum_5(T_29)/G2 < 1.376 -> measured 1.9767 BUSTS". (iii) The m_eff half never
depended on the budget; `gate-multiplies.md` §6's table closes it "by step 4's
refutation".

**The exponent conditionality, stated once.** The asymptotic cap `1/0.55 = 1.82`
assumes `G₂ ~ 0.55 (ln W)²`, that is exponent exactly 2. `G2-STATE.md` §3 lists
the control-corrected exponent as MEASURED 1.50 ± 0.05 stat on 22 trusted terms,
with the question open, and `gate-multiplies.md` §7 says so itself: "asymptotic
headroom in 0b is exactly the exponent question and is not settled". If the
exponent is below 2 the budget grows without bound and the asymptotic form of
the obstruction evaporates; what does not evaporate is the measured budget at
reachable levels and the measured bust. The row should not be read as an
asymptotic theorem.

### 2.4 The four wording-only narrowings

- **Row 6.** "106%" is the Ziller-Morack adversarial ladder's mean (1.0567 on the
  record's nine values at p = 41..73 [ARITHMETIC]), not this corpus's, whose mean
  on the same table is 1.304 over p = 7..37 with a range of 0.77 to 2.14. The
  record's own closing sentence pairs this corpus's range with their mean, and the row
  inherits the smaller number. Neither reading threatens the closure, which is
  the `ln u` factor.
- **Row 8.** The record grades the ceiling "(MEASURED, HL-conditional in its
  exact value)"; the row's arrow reads as an established limit, and the limit
  form would assert the Hardy-Littlewood twin asymptotic, since twin slots of
  `T_x` below `x′²` are twin primes. The closure rests on exact counterexamples
  and on the measured reversal, neither of which needs the limit.
- **Row 12.** The record's derived argument is the shared `O(x)` ceiling; the
  circularity is one asserted sentence. The row names only the assertion.
- **Row 14.** The control is one configuration: k = 2, top prime 23, 24 draws,
  the twin set at the 71st percentile in sd and the 79th in sup. "Any
  twin-specific discrepancy law" is a wider quantifier than a single-level null
  supports, though the class-count structure (`R_k(p) → k+1`, so the level law's
  integer 3 is provable and class-independent) argues the same way.

## §3. Proposed `REFUTED.md` rewrites

Eight proposals, seven of them changes to a row's "why" clause and one a nit.
All are APPLY: none reopens a route, and each replaces a clause that is wrong or
that over-claims with the clause its own record carries. Only the third column
changes in every case; route, verdict, date and record stay as they are. One
HOLD item follows, and it is outside the row set.

**Row 5 (:31), APPLY.**
old: `the Overshoot Budget: 0.88 to 1.19 nats of lifetime slack against a counting tool loose by 3.5× to 6.7× at one fold`
new: `the Overshoot Budget, MEASURED: 0.88 to 1.18 nats of lifetime slack against x² (1.16 to 1.47 against the programme's x′² − 2) versus a counting tool loose by 3.5× to 6.7× at one fold, plus the measured bust at fold 31; the m_eff half dies on step 4's refutation, not on the budget`

**Row 6 (:32), APPLY.**
old: `false by a factor ln u; the sharp rate is ln c(p) ≤ 2 ln p/p and the measured multiplier already spends 106% of it`
new: `false by a factor ln u; the sharp rate is ln c(p) ≤ 2 ln p/p and the measured multiplier spends 77% to 214% of it on this corpus's ladder (mean 1.30 over p = 7..37) and 106% on Ziller and Morack's`

**Row 8 (:34), APPLY.**
old: `origin/mean = ρ(2) → e^{2γ}/4 = 0.79305, the minimum of the survival curve`
new: `origin/mean = ρ(2), at the minimum of the survival curve: measured 0.79303 to 0.79922 against e^{2γ}/4 = 0.79305, HL-conditional in its exact value, and below the mean by exact count at y = 13, x = 19`

**Row 9 (:35), APPLY.**
old: `the reported crossing was a fixed-window artifact, and the sharp maximal law that would finish the route is itself TPC-implying`
new: `the sharp maximal law that would finish the route is itself TPC-implying, need/z² = 0.49 to 0.61 flat at z = 13..43; the reported z = 29 crossing was separately found to be a fixed-window artifact and is not among the reasons this closed`

**Row 12 (:38), APPLY.**
old: `circular: it runs into the first-twin-slot question, which is the postulate`
new: `the same O(x) ceiling as the driving-term route, already free from G₂ ≥ F(x) + 1 ≥ x′; past it the construction meets the first-twin-slot question, which is the postulate`

**Row 14 (:40), APPLY.**
old: `the random-class control reproduces it`
new: `the random-class control reproduces it at the one level tested (k = 2, top prime 23, 24 draws, the twin set at the 71st percentile in sd and the 79th in sup), and the growth law's integer 3 is R_k(p) → k+1, class-independent`

**Row 16 (:42), APPLY.**
old: `B ≤ 9A²(E−1) = O((log z)⁸) is a theorem with no hypothesis, published as Opera de Cribro 6.18, and B was never the binding term`
new: `B was never the binding term, the min taking the B2 branch at every z from 13 to 47; and B ≤ 9A²(E−1) = O((log z)⁸) is unconditional and uniform in s, INFERRED here from published inputs, with Opera de Cribro 6.18 the same shape at s ≥ 9 against this corpus's s in [2.0, 3.4]`

**Row 17 (:43), APPLY, nit only.**
old: `it rises at all nine levels`
new: `it rises at all eight steps over nine levels`

**HOLD, and outside this row set.** `G2-STATE.md`:35-38 lists the Lemma V item
in its PROVEN block as one claim. Three rungs are bundled there: the mean-square
form (PROVED, `sift-limit-attack.md` §7e), the bound on B (INFERRED chain,
VERIFIED steps, `attack-AB-bounded.md` §1.1) and the never-binding finding
(VERIFIED at z = 13..47). Splitting the entry is a live-layer edit to a canonical
file and is Chris's call.

## §4. Defects of this audit

- **One producer was re-run; the rest were read.** Only
  `research/gate-multiplies-03.js` was executed (read-only, row 5's bust line).
  Every other number here was read from an embedded OUTPUT block or is hand
  arithmetic on cited constants. `node research/qc/embed.js --check` was not run
  on any record, so a stale embed would not have been caught by this pass. The
  three producers whose re-runs would have cost most and would have been worth
  most are `research/lemmaV-sup-extension.js` (row 17's nine levels),
  `research/attack-beta2-A-B-bounded.js` (row 16's min-branch table) and
  `research/origin-excess.js` (row 8's HL-factor column).
- **The lemmas inside the routes were not re-derived.** This audit checked the
  closing arguments, not the objects they consume. Taken as given: the Localized
  Merge Lemma, the driving-term lemma's "exactly one interior kill per fold" step,
  the Survival Quotient Identity's proof, the L1 to L5 chain, the Unification Law
  (`ρ` a function of u alone, MEASURED), and the extreme-value growth law for
  `maxsum_m`.
- **No literature was re-read at source.** The Granville-Soundararajan Corollary
  1.4 quotation, Opera de Cribro Lemma 6.18 and the Friedlander appendix,
  Hagedorn's Prop. 1.1, and Holt and Rudd §4 were all taken as accurately
  transcribed by their records. Row 15 in particular stands or falls on a
  verbatim quotation this audit did not re-verify against the Annals page, and
  row 16's §3.3 hypothesis reading (`β ≥ 8`, so `s ≥ 9`) was likewise taken from
  the record.
- **No search convention was re-run.** Rows closed partly on absence claims were
  not re-searched in the owning convention per `SEARCH-CONVENTIONS.md`; that is
  a separate pass and none of these seventeen rows is primarily an absence claim.
- **Row 5's asymptotic form turns on an open question this audit did not
  settle.** Whether the exponent is 2 or nearer the measured 1.50 decides whether
  the Overshoot Budget is bounded in the limit. The audit records the dependency
  and leaves the question where `G2-STATE.md` §6 leaves it.
- **Row 3's measurement was not extended.** Its "order of magnitude" is measured
  at a single level, x = 307, 61 folds. The audit supplied a proven substitute
  through the Deficit Lemma rather than re-running `localized-01-ladder.js` at
  another level.
- **One symbol collision was noticed and not swept.** `M` names the max
  twin-slot gap inside a fixed window `[0, Y)` in `localized-04-maxsum.md`, and
  `M(x, x²)` versus `M(x, x′²)` names two other windows in the pair
  `maxgap-law.md` / `ZONE-POSTULATE.md` (`z2-state-draft-0829.md` §5e). Rows 1 to
  4 are unaffected on the mathematics; whether the corpus wants three windows
  under one letter is a separate question.
- **The rows were audited one at a time.** Coverage between rows was checked only
  where it was forced (rows 1 and 2 jointly covering both regimes of the gate,
  rows 11 and 12 sharing a ceiling). No systematic search was made for a route
  that falls between two rows and is closed by neither.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
