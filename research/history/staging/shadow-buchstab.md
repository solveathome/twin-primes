# The kill shadow is the band-averaged pair-Buchstab integral — scored, and the §5 table recovered

<!-- ledger
id: Q-shadow-buchstab
status: ANSWERED
todo: none
question: Is the kill shadow the band-averaged pair-Buchstab integral?
verdict: SURVIVES WITH CORRECTIONS, and under the record's own pre-registration the verdict is SHAPE-ONLY rather than DERIVED, since y ~ 1000 misses D1 at 1.49x tolerance; the drift's amplitude is off by about 2.6x, the coefficient has the closed form 2 - 1/ln 2 = 0.5573049591 that the record missed, and anchored-windows section 5 reproduces 32 of 32 from an instrument sharing no code.
-->

**ADVERSARIAL OUTCOME, 2026-08-19 (`adversary-wave2.md`): SURVIVES WITH
CORRECTIONS.** All ten clusters reproduced exactly — ratios to five decimals
and the integer slot counts — from a complementary sieve formulation sharing
no code. The Exact Invariance Lemma is CRT-complete (the band's non-uniformity
against the new prime lives on integers; the lemma acts on lifts, where
gcd(P_b, p) = 1 forces exact equidistribution — retention histogram over all
30030 classes has one entry). The corrections: (1) under this record's OWN
pre-registration the verdict is **SHAPE-ONLY, not DERIVED** — y ~ 1000 misses
D1 at 1.49× tolerance and "deciding levels" may not be narrowed to y ≳ 1400
after measurement; (2) the drift's AMPLITUDE is off by a factor ~2.6
(measured −0.0321 vs predicted −0.0121 on independent binning; 1.19 at
y ≥ 2000) — the sign test cannot see this and the record did not report it;
(3) the coefficient has a closed form the record missed: **2 − 1/ln 2 =
0.5573049591** (first moment of the x-weight on the band; the producer
hardcodes 0.5573013, wrong in the sixth decimal, no published figure moves);
(4) pre-registration custody is DECLARED, not git-provable (prereg and
producer entered in one commit; mtimes order correctly).

**AMPLITUDE OUTCOME, 2026-08-19 late (`shadow-amplitude.md`, prereg
git-provable at `6c49f5f`): PARTIALLY EXPLAINED, and two corrections to this
record.** (1) The drift's amplitude clause: the instrument normalises by the
exact δ(y) while the curve is normalised asymptotically, so the prediction
must divide by K(y) = (e^γ M(y) ln y)²/A(y), the squared Mertens
partial-product error — a derived, parameter-free term carrying 45.1% of the
missing drift; the corrected amplitude ratio is 1.45 ± 0.80 pooled and
0.83 ± 0.67 at y ≥ 2000, both covering 1, remainder consistent with zero at
2σ. The drift law reads 0.793055·(1 + (2 − 1/ln 2)·ln 2/ln y + …)/K(y).
(2) §4's candidate explanation is REPLACED, not softened: the measured local
pair density OSCILLATES about its HL value (λ_twin above 1 at 4 of 10
clusters, mean 0.31σ) — it is not "still approaching" it; what had not
converged is the fair-share normalisation, which is K(y) and is derivable.
The "eleven-fold fall too steep for 1/ln y" was a smooth 1.7-fold fall in
1/K plus scatter. (3) **This record's se(Poisson) column is 4× to 6× too
small at every pooled cluster** — it was computed on the pooled slot total,
but the bands overlap (35.84× oversample at y₀ = 2900): distinct pairs, not
pooled slots, set the floor. Any pooled-band residual priced against
measured/√N_tot anywhere in the corpus is priced against the wrong floor.
The verdict label stays SHAPE-ONLY; nothing here promotes it.

**2026-08-19, TODO item 5.** Pre-registration: `shadow-prereg.md` (same folder),
written before the instrument existed. Producers:
`research/shadow-buchstab-01-candidate.js` (the candidate, pure computation) and
`research/shadow-buchstab-02-instrument.js` (the measurement and the score),
both embedded.

---

## 0. The item's premise was stale: this was already checked on 2026-08-18

TODO item 5 records the band-average explanation as a "CANDIDATE (2026-08-19
session, unchecked)". It is not unchecked. `attack2-03-09-depth-formula.js`
states the same formula (`D_pred(b) = (1/b²)∫_{b²}^{2b²} (e^γ ω(ln x/ln b))² dx`),
computes it, and scores it against measured birth depths out to b = 4999 — its
embedded output reads 0.849/0.852 at b = 97, 0.855/0.834 at 997, 0.832/0.830 at
2003 and 0.827/0.827 at 4999, and its reading 2 already calls the match. The
present work is therefore an **independent second instrument**, not a first
computation, and it was run because three things the item asks for were genuinely
missing: a pre-registered tolerance, a test of the band's SHAPE (which no earlier
artifact measured), and a re-measurement of the flagged
`anchored-windows.md` §5 table. Standing compute rule: the recomputation is what
this experiment itself required; the agreement with `attack2-03-09` is reported
as cross-validation, not re-derivation.

## 1. Verdict on Task 1: DERIVED above y ≈ 1400

Scored against the pre-registered criteria (tolerance 0.011, deciding levels
y ≥ 997), on ten clusters of nearby primes from y ~ 1000 to y ~ 26000, totalling
15.8 million twin slots:

| criterion | result |
|---|---|
| **D1** magnitude, \|measured − B_x\| ≤ 0.011 | **9 of 10 clusters PASS**; the only failure is y ~ 1000 at 1.49× tolerance |
| **D2** level trend (candidate falls with y, measurement must too) | **8 of 9 steps PASS**; the one failure, 6000→8500, is a +0.00051 rise inside the visible wobble |
| **D3** band shape, last/first eighth within 0.020 of prediction | **10 of 10 PASS** |

From y ~ 2000 upward the residual never exceeds 0.0033 against a tolerance of
0.011, and at y ~ 18000 it is +0.00036. **The kill shadow is the pair-Buchstab
survival curve averaged over the ignition band.** Calibration: MEASURED, and
HL-conditional through the curve — the [2,3] branch of that curve is
`attack2-05`'s independence-squared conjecture, not a theorem, so what is closed
is the *identification* of the shadow, not its proof.

## 2. The result worth more than the verdict: 0.85 is not a constant

The band `[y², 2y²]` is a fixed factor in x and therefore a **shrinking**
interval in `u`, of width `w = ln2/ln y`. Any average of a curve over it must
walk down to the curve's value at the left edge — which is the point trough
`e^{2γ}/4 = 0.793055`. Measured, the depth falls

    0.85004 (y~1000)  0.84124  0.83285  0.83212  0.82830  0.82690
    0.82741  0.82325  0.82315  0.82279 (y~26000)

against a prediction falling 0.83365 → 0.82177 over the same span. "≈ 0.85 at
every level, strikingly stable" was an artifact of never leaving y ≤ 1000.
Anything in the corpus that treats 0.85 as a constant of the pattern is treating
a slow drift as a law; the honest statement is that the shadow depth is
`0.793055·(1 + 0.5573 ln2/ln y + O(1/ln²y))`, first-order form derived in
`shadow-buchstab-01`'s header and checked against the exact integral there.

## 3. `anchored-windows.md` §5 reproduces, 32 of 32

The §5 table's producer (`scratchpad/anchored-check.js`) is gone, and that file's
header forbids quoting §5 without recomputation. A segmented window sieve sharing
no code, table or author with it recovers **all 32 published entries to three
decimals** (levels p = 23, 97, 401, 997, windows k = 0..7). Calibration: VERIFIED.
The header's warning is discharged for §5; §3 (the life-cycle peak sequence) was
not in scope here and remains unrecomputed.

Two things that table looked like, and is not:
- **It does not rise with p.** Its four k = 1 values (0.834, 0.850, 0.853, 0.856)
  rest on 25, 166, 1625 and 7542 slots — Poisson scales 20%, 7.8%, 2.5%, 1.15%.
  Only the p = 997 row decides anything.
- **Its band is not at the level's own square.** §5 puts the window at the NEXT
  prime's square while sieving to p, which moves the band's left edge to
  `u₀ = 2 ln p′/ln p` — 2.147857 at p = 23, 2.000043 at p = 10007. At p = 23 that
  alone lifts the prediction from 0.873 to 0.943, so the p = 23 row is a
  measurement of the 23→29 prime gap, not of the shadow.

Against the §5 configuration's own predictions the residuals are −0.109, −0.013,
+0.009, +0.020.

## 4. The residual, and what structure it suggests: none that is new

At y ~ 1000 the measured band sits +0.0164 above the candidate. Per-eighth, the
excess is +0.0220 +0.0210 +0.0176 +0.0145 +0.0176 +0.0160 +0.0088 +0.0081 —
**largest at the band's floor**, u just above 2, smallest at its top. So it is
the trough that is shallower than `e^{2γ}/4` at that scale, not the band's rise
that is wrong; the shape test passes at that very cluster. A finer sweep puts the
excess at +0.01864 for y = 941..1051 and +0.00164 by y = 1889..2087 — far too
steep a decay for a `1/ln y` or `1/ln²y` term (neither rescaled column flattens).
Reading: the local pair density is still approaching its Hardy–Littlewood form at
x ~ 10⁶. There is no residual structure to name, and the honest conclusion is the
unifying one rather than the "worth more" one the item hoped for.

Free by-product: the `u ≤ 2` branch checks too — the pre-band `[y²/2, y²)`
measures 0.83038 against 0.83075 predicted at y = 881, and 0.82067 against
0.82137 at y = 7481.

## 5. Task 2 — the fossil stratum: it is a corollary, and the clean instrument already exists

The recurrence "each shadow recurs at `k·P_p + [p², 2p²]` forever" does **not**
need `fossil-shadows.js`, and does not need measuring at all.
`attack2-03-09-depth-formula.js` carries the **Exact Invariance Lemma**, PROVEN
by CRT: the in-period depth of any residue band mod `P_b` is exactly invariant
under adding further primes, because every residue class keeps exactly
`∏(p−2)` of `∏ p` lifts, so band count and global density scale by the identical
factor. The recurrence is that lemma applied to the band `[p², 2p²] mod P_p`. Its
own reading says it: "the 0.714 → 0.714 observation was mathematics, not luck."
What remains empirical is only the **birth depth** of each stratum, which is §1's
band average, and for small b an exact enumeration frozen forever by the lemma.

What a clean instrument would have to do, and where it already exists:

| requirement | met by |
|---|---|
| absolute-territory band depth vs the exact wheel density, many levels | `attack2-03-09-depth-formula.js` (b = 7..4999), and independently `shadow-buchstab-02` (y ~ 1000..26000) |
| the invariance identity checked numerically, not asserted | `attack2-03-09`: 17-band lifts to level 23, 3213 = 3213; 23-band at level 29, 378 = 378 |
| percentile rank of a fossil band among all same-width offsets | `attack2-02-08-tomography.js`, level-23 tomogram: 0.00% / 86.97% / 22.23% / 0.17% / 0.03% for p = 7/11/13/17/19 |
| a control at unrelated offsets, and slot counts not just ratios | `fossil-shadows.js` (controls), `shadow-buchstab-02` (counts) |
| separation of inherited from fresh depth | `attack2-03-09`'s birth/inherited/fresh columns |

All three of `fossil-shadows.js`, `attack2-02-08-tomography.js` and
`attack2-03-09-depth-formula.js` verify under `embed.js --check` today (code and
output hashes both match). So `fossil-shadows.js`'s custody flag is a
**declaration defect, not an evidence defect**: the rows it carries without
declaring them are reproduced, fingerprint-bound, in `attack2-02-08-tomography.js`
(the percentiles and the level-23 rows) and in `attack2-03-09-depth-formula.js`
(the birth depths 0.571 / 1.273 / 0.957 / 0.714 / 0.639, and the 3213 lift count,
both verbatim). Recommended decision for TODO item 2: add a one-line provenance
declaration in `fossil-shadows.js`'s header naming the two scripts that own those
rows — the pattern `05-twin-jacobsthal.js` already uses — and point its readings
1 and 3 at `attack2-03-09` readings 1–3. **No rerun of the heavy job is
warranted.**

## 6. What is still open

The `[2,3]` branch of the Unification Law is a conjecture (independence of the two
coordinates), so "the shadow is the band average" inherits that status. Turning
the shadow into a theorem needs the pair-Buchstab delay equation proved, not
measured; nothing here moves that. Absence: no prior study of the shadow constant
is claimed anywhere in this record — `research/SEARCH-CONVENTIONS.md` §1 carries
no owning convention for it, and `anchored-windows.md`'s own header already
withdrew the novelty claim when the shadow was absorbed into the Unification Law.
