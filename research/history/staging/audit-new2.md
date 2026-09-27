# Consistency audit, agent `new2`, 2026-08-17

<!-- ledger
id: Q-audit-new2
status: ANSWERED
todo: none
question: Are the seven research documents of the new2 partition internally consistent and correctly scoped?
verdict: Per-file findings across the seven, mostly dropped scopes and attribution defects, plus four documents that were missing the standard current-understanding footer, which was added.
-->

Files audited: `research/maier-matrix.md`, `research/origin-excess.md`,
`research/two-class-lower-bounds.md`, `research/maxgap-law.md`,
`research/discrepancy-two-class.md`, `research/h2-scoping.md`,
`research/theta-ladder.md`.

---

### research/two-class-lower-bounds.md

**G2(41#) ≈ 530 to 640, central 580 (§6), and ≈ 660 (§11).** RETIRED, and the
file derived neither. §6's own form 1066·c2' with c2' in [0.446, 0.594] gives
**476 to 633**, 513 at the full-sample mean c2' = 0.4814, about 487 if the
x = 37 term is an outlier (median c2' ≈ 0.457 over x = 11..31) and about 633 if
it is a genuine level shift. The 660 sat outside the band entirely. Forced by
recomputation from the exact primorials and the exact D_x, reproduced
independently here (m2(41) = 35.80, θ(41) = 33.349, m·lnD = 1065.7). The
diagonal c2' ladder is now printed in the body as §6a.

**"c flat to 7 percent" (§11), and "no trend" (§6).** NARROWED. c is not a
constant, it is a surface c(x, lnD): inside the single tile x = 29 it falls
1.083 → 0.446 as lnD runs 2.1 → 19.2, and at fixed lnD it rises with x from
0.577 at x = 23 to 0.989 at x = 6421. Every c in this file sits on the
**diagonal**, where the window is the whole period and the two effects cancel.
The 7% is a coefficient of variation, not a range; the same 46 terms span
[0.3359, 0.4873]. On the two-class ladder specifically c is not flat at all:
[0.446, 0.500] for x = 11..31, then 0.594 at x = 37. Forced by
`maxgap-law.md` §4.

**"c1 does not move at all over x = 11..229" (§6 caveat).** NARROWED. There is a
real positive drift, c1 ~ (log p)^{0.12 ± 0.03} on the top 41 exact terms,
against the exponent 1 Maier-Pomerance needs, with a synthetic control ladder of
true exponent 1 returning 0.979 ± 0.007 from the identical estimator. The
Maier-Pomerance o(1) is negative on the whole accessible range at a tenth of the
required rate; the conclusion is unchanged, the phrasing was wrong.

**"the corrected two-class exponent ... moves the central estimate down from
1.54 to about 1.2" (§5).** FRAME ERROR. 1.2 is the certificate ladder, an
explicit lower-bound construction; the exponent of G2 itself is **1.57**
central, bracket 1.3 to 1.9, floor 1, from the exact terms through the same
control. Different objects, not competing estimates (`G2-STATE.md` §6.1).

**"the pointwise exponent on the same data is 1.88" (§10 item 4).** RETIRED. The
same 21 terms read **1.924** against x, and frame-matched the reading is
**1.567**.

**"the Poisson-extremes law max ≈ c·m·ln(W/m)" listed as new (§11).** NARROWED.
The law is Ford's random-dart prediction J(T) ~ T·Q_T/φ(Q_T), which §6 of the
same file already credits. What is new is the measurement of c and its
constancy on the diagonal.

**"lower, measured law ≈ 1.2 x ln²x" (§8 table).** NARROWED. Safe as a
description of x ≤ 41 on the diagonal, not as an asymptotic; with the FGKMT
ledger's drift it is 3x larger by x = 1e50. Also flagged in the body that the
1.2 and the 0.8 of `oeis-G2-submission.md` are different statements and the
Poisson form should be quoted instead of either.

**Correction block removed**, its content folded into §6/§6a as body text.

---

### research/discrepancy-two-class.md

**"PRIOR-ART's 'two independent routes to one number' is a statement about the
max-gap channel" (§7).** WITHDRAWN. The phrase was retired the same day: 2.13
(ratio of sieve limits) and about 1.57 (measured exponent ratio) are different
numbers, so there is no single number for the two routes to meet at.

**"h(x#) is linear in x, G2(x#) is near quadratic" (§7).** RETIRED. One class
tracks **p log p**; the two-class object carries a measured exponent of
**1.57** (bracket 1.3 to 1.9, floor 1).

**The separation warning survives, and is now the point of §7.** The discrepancy
channel's price for the second residue class is exponential in π(x), a factor
(3/2)^{π(x)/2} crossing over at x = 11; the max-gap channel's price is a power
of log. Different objects, different prices, and no constant or exponent should
be carried between them.

**Correction block removed.**

---

### research/maier-matrix.md

**"the origin beats the ensemble mean by a factor of order (ln x / ln y)²"
(§4, and readings 3 and 4).** NARROWED to an absolute constant. The Origin
Excess Lemma carries three hypotheses, not one: S ≤ y′²; y′² > x, else
D_x(S) = 0 and it reads 0 = 0; and x < x\* with ln x\*/ln y ≈ 1.44, else the
loss bound exceeds D_y(y′²). Together they cap the factor at **about 2.2**, and
the measured maximum over the 14 cells, 1.372, is near the ceiling rather than a
small sample. Forced by `origin-excess.md` §6. The lemma statement, the §4
narrative and readings 3 and 4 now all carry the capped form, and the exact form
ρ_x(S)/ρ_y(S) is stated alongside.

**"The advantage does not decay gracefully into the zone; it is gone" (§5).**
RETIRED. It **reverses**: the ratio troughs at 0.9343 at S = 3.53 y′² before
relaxing to 1.0043 at the full period, and per prime the origin's loss reaches
125% of fair share at eight times its threshold. The head excess is repaid on
the shoulder.

**The scale collision was presented as a property of the matrix (§5).**
NARROWED. y < x with x prime gives y′ ≤ x < x′, hence y′² < x′² strictly, in one
line with no matrix in it. Added.

**The ρ(2) ceiling was absent.** Added to §5 and reading 4: against the ensemble
of all x# translates the origin at S = x′² carries e^{2γ}/4 = **0.79305** of the
tile's mean density, 21% **below** it, measured to x = 6037 after dividing out
the window's Hardy-Littlewood factor. That is the same constant `FOLD-PROFILE.md`
§9 calls the trough constant and `GLOSSARY.md` records as the conjectured limit
of β; the origin ceiling is its fifth independent appearance.

**"the `pred` column is a first guess ... wrong in an instructive way" (§3).**
REPLACED. pred is 1/∏(1 − 2/q), the density ratio alone; the gap between it and
origin/mean is exactly ρ_x/ρ_y.

---

### research/origin-excess.md

**§9's corrections against `maier-matrix.md` restated as claims, not as
corrections**, since they have been applied there. No number changed. The
cross-reference to `GLOSSARY.md`'s β and the count "fifth independent
appearance" of e^{2γ}/4 added to §5 and §9.

---

### research/maxgap-law.md

**"The two spreads are the same number ... both +-22.5%" (§3, and §1 item 2).**
UNITS ERROR of its own. The two ± figures were computed on different
conventions: A's ±22.7% is half-range over midpoint, B's ±22.5% is half of
(max/min − 1). Matched, A is ±22.8% and B ±18.4% (midpoint), or ±29.5% and
±22.5% (ratio). Both are near ±20% and A's is wider by about a quarter. The
conclusion, that there was never a factor-three tightness disagreement, stands;
the claim of exact equality does not.

**"Band 476 to 633, central 513" (§9 table).** NARROWED, not wrong: 513 is the
full-sample mean, 487 the outlier-excluded median and 633 the level-shift
reading. All three now stated, matching `two-class-lower-bounds.md` §6a.

**"`G2-STATE.md` §6.2 already corrected two-class-lower-bounds' three different
values for G2(41#)" (§9).** REFERENCE ERROR. `G2-STATE.md` §6.2 is about the two
constants 0.8 and 1.2, not about G2(41#). Sentence removed and replaced by the
statement of the band.

**§10 "Corrections to the record, proposed, not applied".** Retitled and
trimmed to what is still outstanding against files this note does not own. Items
3 and 4 (the Poisson law's provenance, and recording the coordinates) have been
applied to `two-class-lower-bounds.md` and were removed; items 1 and 2 duplicated
§3 and were removed. Items on `localized-04-maxsum.md` §4, `FOLD-PROFILE.md` §12
and `exponent-control.md` §2 remain and were re-verified against the numbers in
§4, §6 and §8 of the note.

---

### research/h2-scoping.md

**"House rules: these go here, not into the files they correct" (§8).**
SUPERSEDED by the doc convention adopted today: the claim is edited in the file
that carries it and the reason goes to `history/CHANGELOG.md`. Section retitled
"What this note owes other files"; its three items are against
`exponent-control.md` §8 and OEIS and are unchanged in substance.

No numeric claim in this file needed changing. Its two verdicts, that term 22 is
about 3.4 months on this hardware and that more terms make the wrong model win
by a margin growing to 47 AIC units at 56 control terms, are the current
understanding and are cited as such elsewhere.

---

### research/theta-ladder.md

No claim changed. Checked against the settled column: theta is above 2 and
rising, exact suprema 1.9524, 1.9477, 2.0018, 2.0476 at z = 19, 23, 29, 31 and
> 2.05 through z = 71, "turns over below 2" REFUTED and "exactly 2" recorded as
a miss rather than a tie. β₂ = 4.26645 used consistently. The file states all of
this already.

---

### Footers

`origin-excess.md`, `maxgap-law.md`, `h2-scoping.md` and `theta-ladder.md` were
missing the standard "This document states current understanding" footer that
the other four carry. Added.
