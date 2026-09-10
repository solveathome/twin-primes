# Audit staging: uframe partition (2026-08-17)

<!-- ledger
id: Q-audit-uframe
status: ANSWERED
todo: none
question: Do the u-frame documents' claims survive an audit against their own sources?
verdict: Several are REFUTED: the multiplier requirement ln c <~ 2 ln^2 u / u is off by a factor ln u and is replaced by the per-fold rate ln c(p) <= 2 ln p / p, the Inertness Lemma's rate is narrowed to 4/u, and SUM L*mbar ~ 2 x ln^3 x is false because U-FRAME step 4 is false.
-->

Files: `research/U-FRAME.md`, `research/FOLD-PROFILE.md`,
`research/a3-03-f-from-census.md`, `research/a3-05-bound-L.md`,
`research/a3-09-histogram-operator.md`.

### research/U-FRAME.md

**§3, "the requirement on the multiplier is ln c ≲ 2·ln²u/u", with G₂(u) ≤ 12·c^{π(u)} read as a uniform constant.** REFUTED, by a factor of ln u.
Replaced by the partial-sum condition Σ_{p≤u} ln c(p) ≤ 2 ln u − ln 12 and its
differentiated form, the sharp per-fold rate **ln c(p) ≤ 2 ln p / p**. Forced by
`research/gate-multiplies.md` §7: the softer form does not telescope, since
Σ_{p≤x} ln²p/p ~ ln²x/2 against a budget of 2 ln x, and the bound it certifies
exceeds u² by 4.6× at u = 37, 149× at u = 100 and 1.6e10 at u = 1000. Read as a
uniform c the original is vacuous, since only c = 1 satisfies it.

**§3, the Inertness Lemma "buys back a factor ln u/2" against ln c ≲ 4 ln u/u.** NARROWED, arithmetic corrected.
The all-odd-folds rate is 4/u, not 4 ln u/u. The factor bought is still ln u/2;
the comparison numbers were wrong.

**§3, new.** Added the zero-headroom statement: with G₂ ≍ (ln W)^α and
ln W = θ(x), c_true = (θ(p′)/θ(p))^α ~ 1 + α ln p/p, so the entire asymptotic
headroom is the factor α/2.

**§4, "the multiplier uses only 15 to 45 percent of its budget and the fraction is TRENDING DOWN" (headroom fractions 0.406 … 0.156).** FRAME ERROR / wrong denominator.
Those fractions are measured against 2 ln²p/p. Against the sharp 2 ln p/p our own
ladder reads **1.65, 0.77, 1.15, 1.48, 1.06, 1.13, 1.01, 1.35, 2.14** (77 to 214
percent) and Ziller and Morack's terms at p = 41 to 73 read **1.39, 0.97, 1.36,
0.75, 1.15, 1.10, 1.18, 1.00, 0.61, mean 1.06**. Neither is trending down.
Forced by `research/gate-multiplies.md` §7.

**§4, "G₂ ≈ 0.55·(ln W)², exponent exactly 2, and the route survives on the constant rather than on the exponent."** RETIRED.
Replaced by the control-corrected reading: **α = 1.57 central, practical bracket
1.3 to 1.9, hard floor 1**, with 2 disfavoured by the one-sidedness of the bias
rather than excluded. Forced by `research/exponent-control.md`: the same
estimator on A048670 gives 1.282 ± 0.008 over 58 terms where the truth is 1,
positive bias in all 40 sliding windows, no drift. Added the correct pricing of
the target: the job is an **exponent** reduction, 4.2665 → 2.

**§4, "RESOLVED by §6a … the α ≈ 2 reading was small-sample noise."** RETIRED.
The resolution rested on a theta-frame exponent compared against an x-frame
threshold. Section now states the frame-matched numbers.

**§4, "G₂(41#) is no longer the decisive measurement … it would supply one exact term inside a bound we already have."** NARROWED, right conclusion, wrong reason.
It is not decisive because adding an eleventh term to a ten-term fit moves the
exponent by 0.022 on average against a bias of +0.262. Its value is as a test of
the Poisson law's **475 to 633, centre 513** (`research/G2-STATE.md` §6.2).
Retired the extrapolation "~740".

**§4, new.** Added the Overshoot Budget as a measured quantity: ln(x²/G₂(x#)) is
1.058, 0.940, 0.984, 0.878, 0.953, 1.182, 1.016, 0.953 nats at x = 11 to 37, flat
with no growing margin anywhere.

**§5 and §5a step 6, the strikethrough "~~3~~ 2" at fold 29 and the "CORRECTED 2026-08-16" block.** MIGRATED to the doc convention.
Body now states the diagonal L = 2, 1, 2, 2, 2, 3, 2, 4, 4 in present tense,
names the five independent confirmations, and keeps the live operational fact
that `research/Lgrowth.js` is still unfixed and must not be quoted.

**§5a step 4, the strikethrough of G₂(new) ≤ G₂(old) + L·m̄.** MIGRATED.
Stated in present tense as false, with the two failing folds (106.4 against 108
at T₁₃@17, 476.8 against 528 at T₃₁@37).

**§5a step 4 consequence, and §5a step 7, "Σ L·m̄ ~ x·ln³x, comfortably under x². The route closes."** REFUTED.
The sum is step 4 and step 4 is false. Replaced by the valid pricing: step 3 goes
through iff **L ≤ 0.19 to 0.31·p/ln p** on average, against A5 Theorem B's proven
**L ≤ 0.18 p**, a gap of 0.58 ln p. Forced by `research/gate-multiplies.md` §8,
whose chain with the true L at every fold dies at fold 31 (1,380.5 against 961).

**§5a step 3, "a bound of the form m = O(1) or m = O(ln ln x) would close §5a from the upper side."** REFUTED for the O(1) case; see §12 below.

**§6, "is the per-fold multiplier bounded by 1 + O(ln²u/u)?"** Corrected to
1 + O(ln p/p) with constant 2, and added the win-condition consequence: a proof
that c decays at *any* rate is worth nothing; it must decay at exactly 2 ln p/p.

**§6a, "Fitted exponent alpha is STABLE at about 1.62 …, comfortably below the critical 2."** FRAME ERROR.
1.653/1.613/1.623 are theta-frame fits; the same 21 terms against x read
**1.924**, and the Zone Postulate threshold p_n² is an x-frame quantity. After
the control's bias (+0.282 in x, +0.220 in theta) the frames land at **1.567 and
1.493**. Forced by `research/exponent-control.md` §6.

**§6a, "This substantially defuses section 4's alpha scare."** RETIRED with the
frame error that produced it.

**§6a, "margin growing 1.11, 1.40, … 2.00" quoted without a convention.** NARROWED.
That is the p_n² convention, whose trend is +0.154 ± 0.035; against p_{n+1}² the
trend is −0.084 ± 0.045 and the margin is **flat at 2.2**, minimum 1.880 at
x = 17 and never revisited. Both series and both trends are now stated with the
convention named.

**§7 "Next", "the α > 2 reading currently rests on a single jump at x = 37" as the reason to compute G₂(41#).** RETIRED.
Reordered: the L question priced at 0.58 ln p is item 1, the exact copy theorem
for the maxsum family is item 2, G₂(41#) demoted to item 3 as a Poisson-law test.

**§9, "the chain has a hole at exactly one point" with the maxsum ladder unmeasured.** RETIRED in part.
The maxsum growth law is no longer missing: `research/localized-04-maxsum.md`
measures **maxsum_m = m·m̄ + σ·√(2m·ln D)**, unfitted, holding to 6 percent over
m ∈ [2 ln D, 1024] and three decades of window, σ/m̄ ≈ 0.89 to 0.95. Added the
caution that this is a head measurement: on the tile ρ is measured **rising**
(1.58, 1.78, 1.83, 1.41, 1.84, 2.39 at T₁₁ to T₂₉) and the model's exponential
tail assumption fails there. §9 also now carries the priced death of the step-3
chain at fold 31.

**§11 (A9), presented as new structure.** DEMOTED to prior art.
Holt and Rudd, arXiv:1408.6002 §5 (2014), hold the transfer matrix M_J, its
eigenstructure and the binomial eigenvectors. Their fusions are our kills, their
cycle of gaps is our tile, their R1/R2/R3 recursion is our fold. What remains
ours is the exact head engine and the diagonal it computes.

**§11 (A9), "the tail evidence … does not close the route" left without a positive statement.** Extended:
L ≲ 0.8 ln²p clears the corrected requirement from p ≈ 800, margin then growing
like p/ln³p. Added the transfer caution: the tile fit 1.2992/m̄ is 20 to 25
percent too steep for the head, whose rate is ≈ 1.06/m̄.

**§12 (A10), "For eight folds it looked constant at 3, which would have closed §5a from the upper side, since telescoping then gives Σ ~ x·ln²x, well under x²."** REFUTED twice over.
It inherits step 4's falsity, and independently Σ_{p≤x} 3·m̄(p) ~ 7.2·x·(ln x − 1)
falls below the measured G₂ from about x = 45, so it would certify a bound
smaller than the truth. A constant m_eff is impossible.
Forced by `research/gate-multiplies.md` §6.

**§12 and §14, the two "Corrections carried" blocks.** MIGRATED to custody notes.

**§13 (A3), "f falls by a factor of 170. That is the branch in which the route closes."** NARROWED to "that is the branch, not the route."

### research/FOLD-PROFILE.md

**§2, table column headed "Möbius bound".** MISLABELLED.
The values 9.72e2, 2.92e3, 8.75e3, 2.62e4 are 4·3^{π(x)−1}, the K-level bound,
which is twice the h-level bound 2·3^{π(x)−1} stated in the theorem directly
above. Column relabelled; the theorem is right.

**§2, "the bound crosses below the mean at x = 19", relative error 0.048 at T₂₃.** SUPERSEDED by a proven improvement.
`research/level-ledger-tight.md` proves, for x ≥ 17, every p > x and every a,
**|h(a) − D/p| ≤ 27.019392·3^{π(x)−7} + 1/2**, a constant factor **53.96** better
than 2·3^{π(x)−1} (2·3⁶/27.019392 = 53.96). At T₂₃ that is 243.7 rather than
13,122. Consequently the bound crosses below the mean at **x = 11**, and the
relative error at T₂₃ is **8.89e−4**, not 0.048. Table rebuilt with the tight
K-level column: 19.0, 55.0, 163.1, 487.4 and ratios 0.109, 0.023, 4.95e−3,
8.89e−4.

**§3, "max_a |h(a) − D/p| measures 1.36, 1.62, 3.35, 3.63, 6.13, 16.9 … 0.085, 0.051, 0.052, 0.028, 0.024, 0.033 times 2^{π(x)} … the base is nearer 2 than 3."** REFUTED.
That ladder is read at the smallest admissible p at each level, so it moves p and
x together and is not a growth law in either. Maximised over p at fixed x, which
is what the theorem quantifies over, the truth is **2.87, 5.97, 12.03 at
x = 11, 13, 17** against the published 1.62, 3.35, 3.63. The 2^{π(x)} conclusion
is dropped. Forced by the Level Ledger measurement.

**§5, "the Unification Law says that curve … decreases to 1 from above."** REFUTED.
ρ(u) = e^{2γ}/u² falls from 3.1722 at u = 1, crosses 1 at u = e^γ = 1.781,
**undershoots to ρ(2) = e^{2γ}/4 = 0.79305 at u = 2**, and returns to 1 from
below. The shape statement now has four regimes, not three, and the measured
0.931 in the u = 2.81 to 3.07 band is identified as that trough seen through the
one-step shift (predicted mean 0.91 against measured 0.931) rather than as noise.

**§12a, "full-tile: G₂ ~ 0.6x² against x², margin ~1.7, a constant" and "Chris's localization turns a constant fight into an unbounded one."** RETIRED.
The full-tile margin against x′² is measured 3.3 to 4.1 on our ladder and flat at
2.2 for the dominating adversarial h₂; whether it grows depends on α, which is
unresolved at 1.57 central, bracket 1.3 to 1.9. Restated: **localization makes
the margin unbounded unconditionally, where the full-tile margin is unbounded
only if α < 2.** Also repaired the sentence flow left by the §12a patch.

**§12b, "if the fold recursion is ever made to work, the localized version can afford to lose a factor of x/ln x."** NARROWED, and the counter-evidence added.
The one chain built on that saving, the Localized Merge Lemma, has been run and
fails: the Deficit Lemma maxsum_m ≥ m·m̄ caps a block at x/(9.6 ln²x) folds
against π(x) needed, short by 9.6 ln x, and measured survival is **1 fold at
x = 16001 against 1863**. Weakening the gate has no fixed point. Forced by
`research/localized-04-maxsum.md` §§7, 10.

**§12b, "M(x, x^k) … is still only ~c·k·ln x rather than ~c·x."** Corrected to
**~c·k·ln³x with c measured flat in 1.2 to 1.75**; the cube was dropped.

**§0, A9 cited as establishing the histogram result.** Prior-art pointer to Holt
and Rudd 2014 added.

### research/a3-03-f-from-census.md

**"it takes the diagonal from five measured points to forty two computed ones … so the route closes."** NARROWED.
f falling by a factor 170 settles the **branch** (polylog rather than linear); it
is not the route. Carrying L to G₂ needs L ≤ 0.19 to 0.31·p/ln p against the
proven 0.18 p, a factor 0.58 ln p.

**"a distribution whose mean is m̄ ~ ln²x."** Sharpened to
m̄ ~ (e^{2γ}/2C₂)·ln²x = **2.4026**·ln²x, already converged by x = 2003.

Doc-convention footer added.

### research/a3-05-bound-L.md

**§1 and §9, the "REFUTED: a correction to the published diagonal" block.** MIGRATED.
Body now states the diagonal L = 2, 1, 2, 2, 2, 3, 2, 4 in present tense, gives
the three routes that establish it, keeps the `runFor` state-machine diagnosis
because `research/Lgrowth.js` is still unfixed, and drops the "the published
value has an error" framing.

**§7, "On the fold diagonal G2 is about 0.55*(ln W)^2, which is about 0.55x^2."** NARROWED.
Kept as a measured reading over the reachable ladder, with the exponent flagged
unresolved (1.57 central, bracket 1.3 to 1.9, floor 1), and the ceiling argument
restated so it does not depend on settling the exponent: G₂ is a positive power
of x on any reading, so G₂/(3p) is never polylog.

**§7, the table columns "sum mbar^2/3 | x^2 | P closes" and "the polylog branch clears the requirement from x = 100 on with a margin that widens like ln^2 x."** REFUTED.
Those columns evaluate the additive form G₂ ≤ 12 + Σ L·m̄, which is U-FRAME §5a
step 4 and is false. Columns removed; the multiplicative columns (which are the
correct partial-sum test) kept. The polylog branch is now priced through step 3
at L ≤ 0.19 to 0.31·p/ln p.

**§8, "and then sum over p <= x of L*mbar is about x*ln^4 x, well under x^2. The route closes."** REFUTED, same reason.
H'' delivers the branch; the branch still has to be spent through step 3.

Doc-convention footer added.

### research/a3-09-histogram-operator.md

**"drifting down toward the Mertens value e^{2γ}/(4 C_2) = 1.20 but very slowly."** REFUTED, factor-2 slip.
The limit is **e^{2γ}/(2 C₂) = 2.4026**, from the twin-slot density
(1/2)·Π_{2<q≤x}(1 − 2/q) = 2 C₂ e^{−2γ}/ln²x; the 1.20 double-counts the q = 2
factor. VERIFIED by exact W/D: 3.6973, 2.8536, 2.6115, 2.4954, 2.5024, 2.4167,
2.4052, 2.4035 at x = 7, 23, 37, 97, 199, 2003, 20011, 200003, reproducing this
file's own six values digit for digit. **Already converged to 0.6 percent by
x = 2003; there is no drift left.** Forced by `research/gate-multiplies.md` §10
item 4.

**The transfer operator presented as new structure.** DEMOTED to prior art.
Holt and Rudd, arXiv:1408.6002 §5 (2014). New section at the head of the file.

**"SUM L*mbar ~ 2 x ln^3 x, comfortably under x^2. On the tail evidence the u-frame route closes."** REFUTED.
That sum is U-FRAME step 4 and step 4 is false. Replaced by the branch statement
plus the correct pricing (L ≤ 0.19 to 0.31·p/ln p, gap 0.58 ln p). The "Honest
limits" entry upgraded from "not an identity" to "false".

**"Honest limits", new entry.** The tail LAW is fitted on the tile and is 20 to
25 percent too steep for the localized head, whose own rate is ≈ 1.06/m̄ against
1.2992/m̄. Forced by `research/localized-04-maxsum.md` §8.

**"One refutation, recorded" (the L = 3 at fold 29 correction).** MIGRATED to a
present-tense statement of the diagonal, the operator's independent confirmation
of it, and the standing warning on `research/Lgrowth.js`.

Doc-convention footer added.
