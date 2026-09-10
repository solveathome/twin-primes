# Consistency audit, partition new1, 2026-08-17

<!-- ledger
id: Q-audit-new1
status: ANSWERED
todo: none
question: Do G2-STATE.md, LOCALIZED-GAP.md, localized-04-maxsum.md, exponent-control.md and gate-multiplies.md agree with themselves and with their sources?
verdict: Findings per file, the leading one a NARROWED Origin Excess claim: the lemma carries an unstated third hypothesis, positivity of D_y(y'^2) - 2(pi(x) - pi(y) + 1), which forces ln x*/ln y near 1.44 at every level computed and caps the advantage at about 2.2 rather than order (ln x / ln y)^2.
-->

Files: `research/G2-STATE.md`, `research/LOCALIZED-GAP.md`,
`research/localized-04-maxsum.md`, `research/exponent-control.md`,
`research/gate-multiplies.md`.

---

### research/G2-STATE.md

**"The origin beats the ensemble mean by a factor of order (ln x / ln y)²."**
NARROWED. The lemma carries an unstated third hypothesis, that
D_y(y′²) − 2(π(x) − π(y) + 1) be positive, which forces ln x*/ln y ≈ 1.44 at every
level computed and caps the advantage at about **2.2**. Largest measured ratio in
the fourteen-cell table is **1.372**. Forced by `origin-excess.md` §0, §5.

**"The advantage expires at S = y′² and is gone by S ≈ 3y′²."** REFUTED as a
description. It does not decay to nothing, it **reverses**. By the Survival
Quotient Identity origin(S)/mean(S) = ρ_x(S)/ρ_y(S), and at the zone width
u_x = 2 the survival curve is at its minimum: origin/mean = ρ(2) → e^{2γ}/4 =
**0.79305**, measured 0.79303 at x = 1487 after stripping the Hardy-Littlewood
factor. The origin carries **21% less** than mean density at exactly the width the
programme needs. Trough at S ≈ 3.5 y′². Forced by `origin-excess.md` §2, §5.

**"the Poisson-extremes law max ≈ c·m·ln(W/m), c flat to 7%"** (ownership table,
§8). REFUTED as stated. c is a **surface c(x, lnD)**, not a constant: 1.083 → 0.446
inside the single tile x = 29 as lnD grows, and 0.577 → 0.989 at fixed lnD ≈ 11 as
x runs 23 → 6421. The "7%" was a coefficient of variation compared against another
file's range; on matched statistics both spreads are **±22.5%**. The ownership row
now claims the measurement and the diagonal-law finding, not a constant. Forced by
`maxgap-law.md` §3, §4.

**"Forty-six exact one-class terms sit at a constant times the prediction with no
trend ... ln x doubles while c₁ does not move at all"** (§3c). RETIRED. There is a
real positive drift, c₁ ~ (log p)^{0.12 ± 0.03} on the top 41 exact terms, against
the exponent 1 Maier-Pomerance needs; a synthetic ladder built to have exponent 1
returns 0.979 ± 0.007 from the identical estimator. §3c rewritten to carry the
surface, the tail-rate interpretation of c, and the FGKMT ledger (c = T1·r/log x,
stationary at x = 181, doubling only past x ≈ 10¹⁷). Forced by `maxgap-law.md` §5,
§6, §7.

**§7 "The theta ladder (placeholder)", and §9 item 7 "Settle whether θ and
window/G2 converge to exactly 2".** REPLACED by the verdict. The exact
unconditional suprema are **1.9524, 1.9477, 2.0018, 2.0476** at z = 19, 23, 29, 31,
and above 2.05 through z = 71 by prefix. θ fitted inside the zone budget only at
z = 19 and 23, crossed 2 upward between 23 and 29, and exceeds it by at least half
again from z = 43 on. Branch "turns over below 2" REFUTED; "settles at exactly 2"
NOT SUPPORTED; "settles" itself not observed, since the fitted growth exponent runs
0.94 ± 0.38 on the first four points and 3.07 ± 0.28 on the last four. Forced by
`theta-ladder.md` §5b, §6.

**§9 item 2, "Extend h2 past 21 terms. The highest-value computation available."**
WITHDRAWN and deleted. Term 22 is about 3.4 months on this hardware and term 25
about 85 years, and the diagnostic never becomes readable because the constraint is
bias, not precision: on nested control prefixes the wrong model's AIC lead grows
monotonically from a tie at 10 terms to −47.0 at 56. Forced by `h2-scoping.md`.

**§6.1 "These are different objects", 1.57 against about 1.2.** RESOLVED, and the
framing was wrong. By the CRT identity of `two-class-lower-bounds.md` §1 the greedy
certificate ladder is a proxy for the **same** object, not a different one. Two
measured effects account for about a third of the gap and point opposite ways: a
certified lower-bound ladder biases the exponent down about **0.09** at a 28%
terminal shortfall (`h2-scoping.md` §5b), and the exact ladders are short, where the
control's own reading rises with prefix length (1.191 at 10 terms to 1.282 at 56).
Reconciled reading: 1.54 exact against about 1.29 corrected certificate, residual
0.25 unexplained and logged as open question 3.

**§6.2, "the measured law carries two constants, 0.8 and 1.2".** RESOLVED as a
coordinate error, not a modelling question. Same formula on two curves through one
surface; §6 retitled and both sub-items now record what is settled.

**"THE-DIALS §1 dial 4 calls the difference the cheapest unexploited slack ...
nothing in the repo has ever spent it"** (§1c and §9 item 6). NARROWED. It is free
slack with **no known mechanism**; two candidates were looked for and both fail (an
almost-all-positions bound cannot be steered to the origin, and large prime gaps
widen the window by 2(x′−x)/x → 0 where a factor of three is needed).

**"the gate multiplies"** (§4c). NARROWED to *wherever the index accumulates
against a fixed base*. Added the four-hypothesis form, the three escapes, and the
**Overshoot Budget** (total multiplicative overshoot capped at x²/G2(x#), measured
flat at 0.88 to 1.19 nats, asymptote 0.598), which is what actually closes the tile
analogue. Forced by `gate-multiplies.md` §2, §5, §6.

**"G2(41#) predicts 475 to 633"** (§9 item 8). Corrected to **476 to 633**, central
513, with the split of the test recorded: about 487 if x = 37's c₂′ = 0.594 is an
outlier, about 633 if it is a level shift.

**"the correction block inside that file says so"** (§4b), **"§2 carries a
correction block, §6 does not and needs one"** (§10). Both removed as doc-convention
violations. §4b now states both conditions of the merge lemma positively, in a
table: hypothesis-side first holds at x = 13933, conclusion-side at x = 1453.

**Minor.** "Ratios 2.00 to 8.00" → 1.00 to 8.00 (the table's own first row is 1.00).
"Five routes closed today" → fifteen, matching the §5b table. §9 renumbered 1 to 9.
§10 sources table extended with `origin-excess.md`, `gate-multiplies.md`,
`maxgap-law.md`, `h2-scoping.md`, and theta-ladder's real contents; reproduction
block extended to match. `LOCALIZED-GAP.md §11` → §10. Doc-convention footer added.

---

### research/LOCALIZED-GAP.md

**"On the full tile M = G₂ ≈ 0.6x²"** (§3). RETIRED. The constant 0.6 belongs to a
frozen quadratic model that the residuals reject, and the exponent is not 2. Stated
instead from the ladder itself: G₂ sits between x′²/4.5 and x′²/3.2 at every level
against a hypothesis asking for G₂ ≤ (x′−2)/4.

**"Whether that argument closes the whole u-frame recursion branch or only this
chain is open; see gate-multiplies.md when it lands."** RESOLVED. gate-multiplies
landed and answered: the argument closes this chain and A4's tile analogue and does
not reach a re-basing chain. The statement in §4 is narrowed to *the gate multiplies
wherever the index accumulates against a fixed base*, and the Overshoot Budget is
named as what closes the tile analogue. This applies `gate-multiplies.md` §10 item 6.

**Deficit Lemma stated as maxsum_m ≥ m·m̄** (§4). SHARPENED to match its own source:
for 1 ≤ m ≤ D/2, maxsum_m ≥ m·m̄·(1 − O(m/D)).

**§5, M/(k ln³x) flat in 1.2 to 1.6.** CONFIRMED, not changed. `maxgap-law.md` §8
measures M(x, x²)/ln³x flat at 3.2 to 3.7 by a third engine out to x = 9973, which
is this row read at k = 2, and settles the repo's internal contradiction in this
file's favour. Added: the true localized margin is **x²/(3.5 ln³x)**, and the
coordinates (lnD ≈ 11 to 16, x ≈ 10²·⁵ to 10⁴, c = 0.74 to 1.17) now travel with
the constant, against the tile's 0.46 for the same object.

---

### research/localized-04-maxsum.md

**§6, "The correction LOCALIZED-GAP.md needs", quoting a row that no longer
exists.** REWRITTEN as "Two conditions, four times apart, and only one of them is
usable", a table of the hypothesis-side (x = 13933) and conclusion-side (x = 1453)
conditions with no reference to what any file used to say. Arithmetic unchanged.

**§7, "This is where LOCALIZED-GAP.md §7 goes wrong", quoting the M ≲ 3.3 x ln x
block composition.** REWRITTEN to state the fact directly: blocks do not compose,
and the composed bound exceeds its own gate by **13.2 ln x**. Same proof, no
reference to a retired claim.

**§9, quoting LOCALIZED-GAP §3's boundary flag and proposing a correction to it.**
REWRITTEN to state the boundary question and its resolution directly.

**"M = G₂ ≈ 0.6x²"** (§10 repair 2). RETIRED, same reason as above; restated from
the ladder.

**"a factor 260 in x"** (§4). Corrected to **180**, which is what the table (89 to
16001) and §1 both say.

**Added to §4:** the coordinate table (x, lnD, lnD/θ(x), c) and the explicit
statement that 0.74 to 1.17 is off-diagonal and does not transfer to the tile's
0.46. Applies `maxgap-law.md` §10 item 4.

**Added to §10:** the reach of the no-fixed-point argument, narrowed to accumulating
index against a fixed base.

**Stale section references fixed:** LOCALIZED-GAP §6 → §4 (twice), §3 → §2, §11 →
§10, and the header's "answers its §7 question and corrects two things in it".

---

### research/exponent-control.md

**§8 bullet on extending h2.** Already patched before this audit; VERIFIED against
`h2-scoping.md` (term 22 ≈ 3.4 months, term 25 ≈ 85 years, three cheaper proxies all
refuted, no reachable ladder length makes the exponent readable). Nothing else in
the file leans on the assumption; §8's third bullet correctly says Q is capped at
the 19 points now available.

**§2, "the Maier-Pomerance shape is refuted on this range".** STANDS as written
about the frozen log² shape, and EXTENDED: the o(1) is not static. c₁ drifts upward
at (log p)^{0.12 ± 0.03} on the top 41 exact terms, in MP's direction at a tenth of
the required rate, with a synthetic exponent-1 control returning 0.979 ± 0.007.
Applies `maxgap-law.md` §10 item 7.

**§2, "Two classes genuinely look far more quadratic than one."** HEDGED. Added that
this is a statement about model fit at these sizes and not a measurement of the
exponent, since the same comparison on the control prefers a model whose exponent is
wrong by 0.28.

**§7, "THE-DIALS §2 needs rewriting, in three places".** RETIRED as a to-do.
`THE-DIALS.md` has been rewritten and its §0 now carries all three items; the
section numbering it referred to no longer exists. Rewritten as three positive
statements of what this note settles for the rest of the repo.

**§6, "exactly as THE-DIALS' own 2026-08-17 correction says".** Removed as a
doc-convention violation; the sentence stands without it.

**New §5a.** Records the certificate-ladder reading (1.11 to 1.25 to x = 4001)
against this note's 1.57 and 1.54, prices the greedy's −0.09 bias, and states the
residual 0.25 as unexplained. This is the file-level half of G2-STATE §6.1.

---

### research/gate-multiplies.md

**"zero asymptotic headroom"** (§1 and §7). RETIRED. It was derived from
c_true = (θ(p′)/θ(p))^α with α = 2, taken from the retired G2 ~ 0.55 (ln W)². The
truth consumes exactly **α/2** of the sharp budget: 100% at α = 2, 92.3% at 1.847,
**78.5% at the calibrated central 1.57**, 65.0% at 1.30. So asymptotic headroom in
0b is the exponent question and is not settled, exactly as `U-FRAME.md` §3 already
states. The conclusion is now carried by the model-free measurement instead: ln c(p)
against 2 ln p/p reads **mean 1.06** over Ziller and Morack's 21 terms and 0.77 to
2.14 on ours, with no downward trend. Also softened §9's win-condition paragraph.

**"the product telescope overspends by ln x / 4"** (§7 and §10 item 1). ARITHMETIC
ERROR, factor 2. `sum_{p≤x} 2 ln²p/p ~ ln²x` against a budget of `2 ln x` overspends
by **ln x / 2**, which is what §1 already said. The ln x/4 came from dropping the
factor 2 inside the sum.

**"falls below 0.55 x² from about x = 45"** (§6 and §10 item 5). WRONG NUMBER.
Computed directly: with the exact m̄ = W/D the crossover is between x = 31 and
x = 37, and on the Mertens asymptotic 2.4026 ln²p it is between 23 and 29. Corrected
to "from x = 37 onward". The verdict (a constant m_eff is impossible) is unaffected.

**§10 item 6 pointed at LOCALIZED-GAP.md section 1.** The sentence it corrects is in
that file's §4. Reference fixed and the item marked APPLIED, since it has now been
applied there.

**§11 honest limits.** Added that every G2 reading used here is a whole-period one,
which is the diagonal of `maxgap-law.md` §4, so the constant is stable in that
note's sense and must not be carried to a localized window where the same object
reads about twice as large.

**Doc-convention footer added.**
