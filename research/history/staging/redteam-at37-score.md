# Red team: the @37 scoring record (xchan-at37-score.md), adversarial pass

<!-- ledger
id: Q-redteam-at37-score
status: ANSWERED
todo: none
question: Does the @37 scoring record survive an adversarial pass on its prereg re-score, its independence claim, its interpretation table and the cofactor extrapolation?
verdict: The empty-survivor scoring holds - every registered figure reproduces from the committed prereg text and the embedded census block, and the four skipped reference-level gates were run here and all pass - with two findings against the held report, neither touching the verdict: the one-level-drop figure is 8.2x rather than 4x, which strengthens the reversal claim, and the cofactor-one surplus sentence oversells.
-->

*(2026-08-21. Adversarial verification of the HELD
`research/history/staging/xchan-at37-score.md` before integration. Scope per
brief: (a) independent re-score of the sealed prereg 0a7dd73; (b) audit of the
verifier's independence claim and the prefix+gate coverage; (c) recomputation
of the interpretation table; (d) the two-unknown equation and the cofactor
extrapolation; (e) grade hygiene. Verdicts: CONFIRMED / WEAKENED / REFUTED
per claim.)*

## Verdict

**The empty-survivor scoring holds. Every registered figure reproduces from
the committed prereg text and the embedded census block: all seven z's to
the printed digit, every bracket read, σ_slot inside the projection band,
no registered clause fires that the scorer missed. The recount's
independence claim survives inspection, and the four reference-level gates
the census skipped (of the five the registered "same gate" wording names)
were run in this pass and ALL PASS. Two findings against the held report,
neither touching the verdict: (1) the "one-level drop 4× the prior climb"
figure in the (1−J)/F ladder is wrong — the measured ratio is 8.2×, which
STRENGTHENS the reversal claim; (2) the §3 sentence offering the
cofactor-one surplus as "a mechanism with the right sign, growth and
provenance" is REFUTED by the very closed-form computation the report
proposes: computed here (and validated against direct full-period counts at
@19/@23/@29), the layer's aggregate CRT-mass weight DECLINES across levels
— 2.24e−2 → 2.16e−2 → 2.04e−2 → 1.87e−2 (@23..@37) — because the layer's
mass shrinks faster than the e^γ ln x enrichment grows. The derived
component moves the net by −1.7e−3 from @31 to @37, the WRONG direction for
the +9.2e−4 bend; whatever produced the shortfall must supply ≈ +2.6e−3 of
new surplus (or deficit collapse) beyond it. The two-unknown equation is
confirmed genuinely underdetermined — and now sharper.**

## (a) The prereg re-scored from the committed text — CONFIRMED

Re-scored from `git show 0a7dd73` and the census OUTPUT block only, in
fresh arithmetic (this session, not the verifier's code):

- 1 − J = 1 − 60388809837/61673023269.22 = 0.020822936; block's 0.020823
  consistent. σ_reg = √obs/CRT = 3.9846e−6; σ_slot = σ_reg × 2.136 (the
  block's printed inflation) = 8.5111e−6 — INSIDE the registered projection
  band [8.44e−6, 8.64e−6], and consistent with the block's rounded printed
  0.000009. All seven z's reproduce to the printed digit (−122.2, −113.0,
  −103.9, −110.0, −108.2, −111.3, −111.5), all fourteen bracket endpoints
  reproduce, C4 −85.7 and C8 −51.6 reproduce, and the seven registered
  predictions match the embedded `attack-x-offset-01-terms.js` OUTPUT
  digit-for-digit. Kill rule |z| > 3: no survivor at any calibration in
  [0.745, 2.293] (weakest reading C2 at −45.3). The bracket itself checks
  against `attack-sigma31-01.md` ("@31 alone (n = 7): r = 1.127, 95%
  bracket [0.745, 2.293]").
- **Clause structure**: walked the committed §3 clause by clause. The kill
  rule and the "family verdict names every survivor" clause FIRED and were
  followed (empty list recorded); "if N1 survives", "if N1 killed and a
  shrinking member survives", "if only M-abs survives" — none met; J-band:
  J = 0.979177 ∈ (0.94, 1.00], does not fire; P1 HIT (aligned super-W = 0);
  the §4 line-bias secondary was registered as deferrable and correctly
  reported not-run; §2's "no claim distinguishing shrinking members from
  @37 alone" is respected. **No registered clause fires that the scorer
  missed.** The "outside the registered decision tree" reading is exact:
  the scoring and reporting clauses all fired; only the three consequence
  clauses have no matching branch.
- **The gate, the one deviation found**: prereg §3 registers "the same gate
  the @29/@31 run used" — that run checked FIVE reference levels
  (11/13/17/19/23; its OUTPUT: "GATE: 5 reference levels checked, 0
  mismatches"). The @37 census's in-pass gate checked @23 only ("GATE: 1
  reference levels checked"). Closed empirically this pass:
  `node research/xchan-at37-01-census.js -- 11 13 17 19 23` with the
  repaired kernel — all five levels "GATE vs natal-cap-39 embedded OUTPUT
  (14 integers + 3 rounded reals): ALL PASS". The @31 full blind row also
  reproduces the @29/@31 run's record digit-exact (obs 1653241687,
  1−J 0.024666, z(slot) −2.32, d −0.48%) — though note that is the SAME
  kernel verbatim at the same segmentation, so it certifies no-regression,
  not independence. Verdict: reportable under §3 stands; the score report's
  "Gate PASS" sentence should carry the @23-only scope, now moot.
- **The forced embed is accounted for.** The census block's "forced:
  2026-08-21, 11 of 145 figures not reproduced" replaced the DEFECTIVE
  Uint16 index-alias run (its @37 mixed obs 50213010189 sits 17% low, its
  sub-obs figures high by the same ~1.0e10 — exactly the repair story of
  commit 605ce83); @23/@31 figures are identical across both runs, as the
  alias class predicts (K < 65536 there).

## (b) The verifier's independence and coverage — CONFIRMED, with the
## uncovered class named more precisely

Read `research/xchan-at37-02-verify.js` in full against the producer's
kernel:

- **Independence holds as claimed.** The walker marks by direct multiple
  enumeration (`m += p` with incremental `m mod 30`), no CRT residues, no
  modular inverse, no compressed-index stride; divisor lists hold the prime
  VALUE (`la[...] = q`, Uint32) — the index-alias class is structurally
  impossible in it; U from BigInt division; the 1-in-2^20 BigInt triple
  re-decisions are real re-decisions (`BigInt(q1)*BigInt(q2)*BigInt(q3) > Wb`).
  The U-test equivalence q₁q₂ > ⌊W/q₃⌋ ⟺ q₁q₂q₃ > W is exact for integers.
  The prime list, W, N̄, K, y are rebuilt from its own sieve. The one shared
  ingredient is the DEFINITION (natal set, mod-30 classes) — unavoidable.
- **Segmentation checked**: the production census ran SEGK = 2^20 ("2^21
  slots" = 2·SEGK lanes; 235899 segments = ⌈(W/30)/2^20⌉), and the harness
  called the kernel with the SAME 1<<20 — the prefix recount exercised the
  production segmentation, 954 boundaries. Both engines happen to share
  segment boundaries, but their boundary mechanics differ (fresh per-segment
  start offsets with ceil-clamp while-loops vs residue stride), and the @23
  full-period gate checks 8 production-size boundaries against the
  non-segmented natal-cap-39 reference.
- **What the prefix + @23 gate does NOT exclude**, stated sharper than the
  report's sentence: a POSITION-DEPENDENT defect expressed only at
  v ≥ 3e10 — large-V0 start-offset arithmetic, index computation at
  k ~ 2.5e11, or an accumulator effect past the prefix. Inspected: the
  producer's start-offset uses `ceil((V0−R)/m30)` FOLLOWED by two clamping
  while-loops, so a float-rounding slip in the division is corrected; index
  magnitudes peak at W/30 = 2.47e11 and products at ≤ W + 30q ≈ 7.4e12,
  both far under 2^53; the count accumulators peak at 4.8e11 (B3), exact in
  float64. A LEVEL-dependent (position-independent) counting error is
  excluded by the prefix agreement, since every scour prime q ≤ 2.7e6
  strikes thousands of times inside [0, 3e10) and the full U-table and
  prime list are audited exactly. So the residual class is exactly what §2
  of the held report says — a defect that turns on only past 3e10 — and
  inspection finds no mechanism for one. The 2^53 audit figures all
  reproduce (C(K,3) = 1299090727729024 = 86.5% of 2^53; y² = 8.24e−2% of
  2^53).

## (c) The interpretation table recomputed — CONFIRMED except one figure
## (WEAKENED in the direction of the report's own claim)

Every entry of the §3 table reproduces from embedded figures: Δ ladder
−3.90e−4 / +1.200e−4 / +1.185e−4 / +1.0401e−3; d = +1.16% / −0.41% /
−0.48% / −4.76%; Δ/S₃ = 0.92 / 1.21 / 13.36 (report's 13.4); (1−J)/F =
3.8630 / 3.8242 / 3.8427 / 3.6907; the @37 residual is 8.78× the @31 one
("8.8×", verdict's "nine times larger" acceptable); the σ-calibration
paragraph's figures check (attack-sigma31's level-scale term 82.2σ_slot;
1.0401e−3 / 4.03e−3 = 0.258 ≈ "a quarter of @31's line bias"); the
two-unknown bands reproduce exactly (β/S₃ ∈ [39, 43] ⇒ β(37) =
3.035–3.347e−3 ⇒ D = 0.023786–0.024089 ⇒ D/4S₂ = 1.088–1.102;
D/4S₂ ∈ [1.12, 1.15] ⇒ β(37) = 3.756–4.431e−3 ⇒ β/S₃ = 48.3–56.9); the
line-ensemble price 17–29 h = (3–5)× the census's 20927 s.

- **REFUTED FIGURE: "the one-level drop is 4× the size of the prior
  two-level climb"** (verdict item 5 and §3 bullet 1). Measured climb
  3.8242 → 3.8427 = +0.0185; drop 3.8427 → 3.6907 = −0.1520; the ratio is
  **8.2×**, not 4× (rounding intervals on the printed digits give 7.6–8.9;
  4 is outside at any rounding). Corrected sentence: "the one-level drop is
  8× the size of the prior climb." The error UNDERSTATES the reversal, so
  the "asymptote exactly 4 dies in monotone form" conclusion is unchanged
  and slightly stronger.

## (d) The two-unknown equation and the cofactor-one extrapolation —
## UNDERDETERMINATION CONFIRMED; the proposed mechanism REFUTED in its
## growth reading

The score report proposes (§3, §5) that the DERIVED cofactor-one surplus —
per-slot enrichment ∏_{p≤x} p/(p−1) → e^γ ln x, verified to 0.001% at @31 —
is "a mechanism with the right sign, growth and provenance", and that its
aggregate CRT-mass weight at @37 is a cheap closed-form computation. This
pass performed that computation (scratch, `rt37-cofactor-weight.js` +
`rt37-layer-test.js`), and the answer goes the other way.

**The closed form.** For a config (strip pair d = q₁q₂ ∈ (W/16, W] together
on one side, third prime q₃ on the other; 2 of the 6 mixed assignments),
the layer law gives obs = 2·#pairs·(1/4)∏(p−2)/(p−1)·S₁ against CRT mass
2·N̄·P·S₁ (P = Σ_pairs 1/d, S₁ = Σ_{x<q≤y} 1/q), so
dJ(layer) = (S₁/(3·miss))·(#pairs·pNatal/N̄ − P). Per config the enrichment
is (d/W)·E − 1, NOT E − 1: the CRT also prices the multiples k·d that the
cofactor argument kills, so deep strips are a structural DEFICIT, and the
naive (E−1)·mass/miss overestimates by ~25×.

**Validated by direct count** (full-period instrumented walk, this pass):
measured/closed-form obs_layer = 1.0151 (@19), 1.0080 (@23), 1.0066 (@29),
converging to 1 (the residual is the third-prime count of layer slots
running slightly above S₁: 1.1604 vs 1.1527 at @29). The form also explains
the profile's near-√W bin at the right scale: the measured 2.2× surplus
(D_b = −1.22) is (d/W)·E with d/W → 1 at E = 6.54.

**The ladder** (strips 0–3, d ∈ (W/16, W], the verified range):

| x | #pairs | P | S₁ | E | dJ(layer) |
|---|---|---|---|---|---|
| 23 | 1.062e6 | 2.525e−2 | 1.026 | 6.113 | +2.238e−2 |
| 29 | 2.193e7 | 1.785e−2 | 1.153 | 6.331 | +2.157e−2 |
| 31 | 5.052e8 | 1.318e−2 | 1.262 | 6.542 | +2.041e−2 |
| 37 | 1.423e10 | 9.981e−3 | 1.365 | 6.724 | **+1.873e−2** |

(#pairs and #pairs·pNatal reproduce producer 03's embedded @31 figures —
505212797 pairs, 68409827 natal — a custody cross-check.)

**Reading.** The layer is a large, REAL surplus component (~2e−2, an order
above the residual) — but its aggregate weight FALLS by 1.68e−3 from @31 to
@37: the mass sums P·S₁ shrink faster than E grows. The e^γ ln x growth is
a per-slot factor, not an aggregate one. So the derived component moves the
net toward MORE deficit at @37, the opposite of the measured bend
(+9.2e−4 of extra surplus needed vs the flat-Δ trend): after subtracting
the derived component's motion, the undetermined remainder (deeper
cofactor layers, line bias, bulk) must supply ≈ +2.6e−3 of new surplus in
one level. Consequences:

- The §3 sentence "a surplus component that GROWS with the level … A
  growing surplus is exactly what a nine-fold one-level shortfall … needs"
  is **REFUTED as an explanation-candidate**: right sign at fixed level,
  wrong sign in the level-derivative. Corrected sentence: "the cofactor-one
  layer's per-slot enrichment grows like e^γ ln x, but its aggregate
  CRT-mass weight declines (2.04e−2 → 1.87e−2 from @31 to @37), so the
  derived component deepens the @37 puzzle rather than resolving it."
- The §5/§6 "cheapest sharp test on the table" is now DONE, and it
  constrains the natal-side unknown by subtraction without deciding the
  split: **the two-unknown equation stays genuinely underdetermined**
  (β(37) is still the missing instrument), exactly as the report says —
  but the undetermined remainder is now bigger and better bounded.
- Caveats carried: the closed form covers the DERIVED strips only
  (d > W/16; strip 4 (W/32, W/16] adds a further, deeper-deficit term,
  −2.8e−2 at @37 by the same form, not directly validated); the ~1%
  equidistribution correction shrinks with level; cofactors that are scour
  primes/semiprimes are not derived and could move either way.

## (e) Grade hygiene — CONFIRMED with one note

All [MEASURED] claims trace to embedded OUTPUT figures or one-line
arithmetic on them (each spot-checked in (a)–(c)); all trend readings,
split projections and mechanism talk sit under [INTERPRETATION]; the
registered verdict is tagged [REGISTERED VERDICT] and kept separate from
both. One note: §3's first bolded block ("[MEASURED] The offset stopped
being an offset") ends with an inference sentence ("A correction family …
cannot follow …") that is interpretation-grade; the numbers in the block
are measured, the closing sentence belongs a grade down. No tag is wrong
in a way that launders a claim upward. The §2 recount claims match the
verifier's embedded OUTPUT line for line (17/17 EQUAL, 1753/0 BigInt
sample, U-table ALL EQUAL, gates ALL PASS twice).

## Not reached

- **The width-sweep table** behind "no position-scaled container crosses
  2^53 before @43" — quoted by the held report, not re-verified here (the
  @37-relevant containers were checked directly in (b)).
- **The full-period recount** past 3e10 and the third-path CRT denominator
  — same standing as the held report's own §6.
- **Strip-4 direct validation** (the closed form's deeper-strip deficit
  term) and any derivation of the non-cofactor-one small-cofactor layers.
- **β(37)** — still the decisive missing measurement; nothing here
  substitutes for it.

## Gate

`node research/qc.js` before and after this file's edits: TOTAL 0. Only
this file and scratchpad files were written; no live document, producer,
or embedded block touched.
