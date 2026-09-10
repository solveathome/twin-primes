# G2: the state of the object

<!-- ledger
id: Q-g2-state
status: PARTIAL
todo: none
question: What is known about G2, the two-class maximum twin-slot gap, and at what calibration?
verdict: The gap is unchanged through roughly fifty recorded passes: the proven upper bound is exponent 4.26645 against a target of 2, and this file consolidates the map rather than computing anything new.
-->

*(Consolidation note. This file assembles what is known about
G2, the two-class maximum twin-slot gap, from the eleven notes of 2026-08-17 plus
the older load-bearing ones. It computes nothing new. Every claim carries a
calibration marker (PROVEN, VERIFIED by exact computation, CERTIFIED, MEASURED,
INFERRED, CONJECTURED, REFUTED) and a pointer to the file it came from.)*

## 0. What is hard here, first

The achieved upper exponent is 4.266450284… from DHR. No argument here has
improved it. A fixed exponent below 2 would prove twin primes, but the present
sieve bound supplies no such result. This is a limitation of that argument,
not an impossibility theorem for every use of the exact tile.

The target distinctions are owned by [../README.md](../README.md) Status:
unbounded occupied intervals suffice for infinitude, whereas uniform gap
control asks for more. A constant at exponent 2 cannot be silently turned
into a fixed-power or little-o saving.

**Current arithmetic assessment (2026-09-09).** The complete reduction
S=C2*x+R+O_H(x/log^H x) has an OPEN signed lower consumer. The
[grouped-divisor moment](grouped-divisor-moment.md) controls a region with
explicit fixed-margin cuts; it does not bound the full remainder.
[Global cutoff averaging](global-cutoff-averaging.md) includes all outside
arithmetic. The [C3 majorant](global-smooth-majorant.md) gives a full
absolute O(x) bound for its profile, with no sufficient signed constant.

The [cofactor transfer](cofactor-progression-transfer.md) has a growing
polylogarithmic range but a rate weaker than o(x); its mixed tails and
outside contribution remain open. The [two-family](paired-factor-budget.md)
and [Dickman](supported-coefficient-dickman.md) calculations do not pay
the required full signed balance. Their exact limitations, including
the difference between an insufficient lower bound and a negative upper
bound, are retained in the owning notes.

The [moving-cutoff repair](moving-cutoff-parity.md) specifies the centered
prime–Mobius discrepancy D_y. D_y>=-4x/25+o(x) on unbounded dyadic
scales would suffice, but is OPEN. Its checked formula and tolerance
are not an arithmetic estimate. The full residual and centered
formulations are linked in [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md)
section 3; their gains cannot be counted independently.

The [2026-09-09 integration](research-round-validation.md) accepts the
centered truncation and repaired low Type I estimate, leaving the exact
S=C2*x+B+O_A(x/log^A x) with B unestimated. The structured moment adds
a fourth residual cut; the target box exponent remains 407/400 and the
corrected remaining moment saving is greater than 7/200. This is regional
control, not a sufficient global margin. C's norm obstruction and E's two
all-depth test failures retain their corrected scopes.

[RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md) records the completed
dispatch and candidate next obligations. The [router](README.md),
[question ledger](QUESTIONS.md) and [outcomes](OUTCOMES.md) locate the
owning arguments. No G2 upper exponent or twin-prime proof status changed.

## Reference inventory — read for a specific claim

The current assessment is section 0 above. The inventory below retains
bounds, measurements and earlier routes with their original evidence.
Use [OUTCOMES.md](OUTCOMES.md) and [../TODO.md](../TODO.md) for current
dispositions before treating an older route description as an assignment.

**PROVEN.**
- `G₂(x#) ≪_ε x^{4.26645+ε}` — no earlier published upper bound at any exponent was found for the two-class problem, searched in the owning convention **bounded number of residue classes per prime** per `SEARCH-CONVENTIONS.md` §1/§3, never in ours alone. `paper/beta2-note.md`, `dhr-verification.md`.
- `G₂ ≥ g` pointwise, so the one-class constructions transfer free: FGKMT's
  `x log x logloglog x/loglog x`, and the `x log x/logloglog x` that the
  Erdős Problems page for #687 reports (edited 2026-08-31). Read at source
  2026-09-07: that bound is not a paper. It is an anonymous AI-authored
  48-page PDF ("A Tilted Residue-Class Construction for Long Prime-Free
  Intervals", GitHub DottedCalculator/ai-math, posted 2026-08-26, not on
  arXiv, not refereed), whose covering theorem `Y(X) ≥ c₀ X log X/log₃X`
  is exactly the one-class primorial statement and has been formalised in
  Lean by a third party (plby/lean-proofs, `Erdos4Tilted.lean`; build not
  reproduced here). It transfers verbatim through `G₂ ≥ g` at that
  calibration: formalised, unrefereed. Above both, `G₂(x#) ≫ x ln x` from published ingredients only (K–K
  Corollary 1 + Mertens + PNT + the CRT identity — composition ours,
  adversary-confirmed at every ingredient's page image, **NOT refereed**;
  `history/staging/import-hypergraph.md` §4, `redteam-0820-math.md` §3.3,
  `paper/proposals/prop-xlnx-lower-bound.md`); and above both,
  `G₂(P(y)) ≫ y (ln y)³ (lnlnln y)²/(lnln y)⁴` for `y ≥ 10^{134.1}` by
  substituting `Ω_p = {a_p, a_p−2}` into Kalmynin–Konyagin. Two logs above the
  free bound, adversarially checked, **NOT refereed**, and re-deriving the
  inside of a published proof where the x ln x chain consumes statements only.
  `two-class-lower-bounds.md` §§3, 4c.
- The mean-square Lemma V, with `B ≤ 9A(z)²(E(z)−1) = O((log z)⁸)`,
  unconditional, explicit and uniform in the level `s`, re-derived
  adversarially on 2026-08-29 and holding for any weights supported on
  divisors of `P(z)` with `|λ_d| ≤ 1`. The companion finding that `B` was
  never the binding term is VERIFIED at z = 13..47, not proven.
  `history/staging/attack-AB-bounded.md` §1.1;
  `history/staging/redteam-0829-theorem1.md` §§2, 9 (the L1-L5 chain
  re-derived too: PROVEN with no hypothesis; a period mean, not a supremum,
  so Lemma V proper is untouched).
- The complementary-window duality `maxsum_m + minsum_{D−m} = W`, VERIFIED at all
  1484 `m` on T₁₃ — and **not ours**: it is the complement identity of the
  circular scan statistic (Cressie 1977). `IMPORT-MAP.md` row 1.
- Shearer's exact criterion on a complete dependency graph **is** the union
  bound, which is what closes the whole local-lemma family.
  `history/staging/import-shearer.md` §4.
- The Fold Moment Identity. `paper/proposals/prop-thinning-null.md`.
- The Tail-Count Transport, `N_new(θ) ≤ (q−2)·N(θ) + 2·Σ_L Q_L(θ)`, the sharp
  per-level evaluator, exact at eight consecutive folds. `U-FRAME.md` §11.
- The Exact Invariance Lemma: bands scale by exactly `(p−2)` and fossil depth is
  frozen at birth. `GLOSSARY.md` §stratum, `ATTACKS2.md` attack 2.
- (PROPOSAL grade, not proven here, moved out of this list 2026-08-30 per
  `coherence-0830.md` D1:) per-fold `L` as the longest alternation-legal
  window with the 3/2 constant a Perron root,
  `paper/proposals/prop-exact-fold-L.md` §2, its equality lemma proven in a
  staging record and verified at 36 cells, no second reader.
- `G₂(37#) = 528` carries an exhaustive maximality certificate: `maxsum₁` over
  all 217,929,355,875 gaps, from an engine sharing no code with the exact-ladder
  producers. `history/staging/scanstat-t37.md`.

**MEASURED, and blind-validated against sealed bands.**
- The extinction rate law holds at **five windows over four decades of Y**; at
  `W = 2·10¹¹` the last multi-kill fold measured 631 against the sealed
  [571, 877]. It carries its own systematic in writing: a **~20% count
  overprediction at five of five windows** — and the per-fold piece is now
  found and blind-validated (2026-08-20): the law's per-fold error is a
  **deterministic fold-factor field** M_p (= λ_derived/λ_model), with Poisson
  dispersion around the corrected mean — at a fresh pre-registered anchor the
  sealed NB fold-factor bands scored **33 of 37 folds inside the 90% bands and
  0 of 37 outside the 99.73%**, where the old `±3√λ` clause read 29/37 (it had
  failed at 43.2% at `2·10¹¹` and is retired for future larger-Y preregs; it
  was never separately refuted at `Y ≤ 2·10⁸`). The field is constant in
  window length to within ~2–3% relative sd over `2·10⁷…2·10¹¹`, and constant
  across the three anchors tested to within the **~6–10% resolution one
  replicate pair affords** — "deterministic" is the surviving model class, not
  yet a measured identity in the anchor direction. The ~20% aggregate
  correction is the exposure-weighted mean of M over the scored folds.
  **The field is now PARTIALLY DERIVED (2026-08-20 night,
  `history/staging/mp-derivation.md`; adversarial verdict
  `history/staging/redteam-0820-night-empirical.md` §T1):**
  M_p ≈ k·W1(θ_p)·exp(−δ·θ_p/m̄_p), where W1 is the **exact endpoint comb**
  of the two kill classes (zero parameters, PROVEN residue counting; the
  free exponent on ln W1 reads 1.031 where the derivation says exactly 1)
  and (k, δ = 0.277) are the law's own two constants re-estimated — one
  depth exponent beside the scale. The field's roughness drops
  sd(ln M) = 0.560 → 0.177 on the train split, and the formula then HIT a
  second pre-registered blind test at a fresh anchor 1.32·10¹¹ (prereg
  committed ALONE at `303711b`): **34 of 37 inside the 90% bands** (needed
  ≥ 28; incumbent-truth expectation 34.6), 0 of 37 outside 99.73%, margin
  +25.4 nats over the constant-bias rival. Custody residual, on record:
  producer-02 first exists in git 5m21s after the seal, so "the producer
  did not exist at the seal" is unverifiable from git — mitigated, not
  proven, by the sealed bands being a deterministic function of artifacts
  committed half a day earlier and by the outcome sitting AT the incumbent
  expectation rather than above it. The field is a function of θ, not of
  p, by the MATCHED CONTROL — the raw twin contrast 0.155-vs-0.764 is
  confounded (θ-sharing ⟺ Δp = 2): non-twin pairs matched on predicted M
  agree like twins (rms 0.181 vs 0.155), and control-pair variance
  decomposes onto the θ-arithmetic at ratio 1.09. The residual sub-field
  stays measured-only: sd ≈ 0.18, a far-tail flattening, fold 631; under
  the formula's own PLN variance only two of the four Poisson-flagged
  folds (409, 631) stay above 3.
  `history/staging/foldL-window5.md`, `history/staging/perfold-error-model.md`,
  corrections `history/staging/redteam-0820-empirical.md` §T1;
  `paper/proposals/prop-thinning-null.md` §5.
- The joint deficit's closed form `1 − J = 4·Σ_{x<q≤√W} q⁻²` is the last law
  standing after two pre-registered rivals died at **2.99σ and 9.80σ**; @29 is a
  hit at `z = −0.90` as registered and `z = −0.43` corrected; and it is **not
  exact**, a **−0.41% to −0.48% offset**, the same residual at both new levels.
  The σ was restated on 2026-08-20: the registered `σ_J` is a Poisson floor on
  the TRIPLE count, and the census walks natal SLOTS, whose triples are
  perfectly correlated, so it understates by ×2.11 at @29 and ×2.12 at @31
  [MEASURED per slot, `xchan-at29-01-segmented.js`, which now prints both]. On
  the registered σ those rivals read 6.35σ and 20.81σ. What carries "not exact"
  is TEST 2's relative offset, which has no σ in it at all, and that is why the
  offset survives the restatement while its old quantifiers do not.
  `history/staging/xchan-at29.md`.
- The shadow drift law, `0.793055·(1 + (2 − 1/ln 2)·ln 2/ln y + …)/K(y)`, with
  45.1% of the missing amplitude derived parameter-free and the remainder
  consistent with zero at 2σ. `history/staging/shadow-amplitude.md`.
- The programme's blind tests are not decoration: the linear-in-`ln D` exponent
  rule was validated one level out and then **killed twice blind**, at T₃₁ (4.96
  band-s.e.) and T₃₇ (3.63 s.e.), two engines, one verdict, and its
  DERIVED-CONSTANT claim is withdrawn. `history/staging/scanstat2.md`,
  `scanstat-t37.md`.
- One instrument was defective: the census held each prime's avoided set in a
  32-bit word, so residues aliased for `q > 32` and every published `f-decays`
  point from `x = 37` up was off by 0.62× to 1.05×. Recomputed alias-free at all
  42 levels. The standing lesson is verify at a level where the feared mechanism
  can fire. `history/staging/fdecay-deep.md`.

**HEURISTIC, held behind one open step** (the identification IS the θ = 2 replacement error, `attack-0830-varE-identification.md`, HELD)**.** The variance-to-mean ratio of
twin-slot counts on the comb-restricted diagonal window has a zero-parameter
closed form, lim Var/E = Pr[GD(2) > 2] = 1 − e^{−2γ}(9/2 − 4 ln 2) = 0.45546,
confirmed to 2.9e−11 by three routes, residuals ≤ 0.002 at nine exact points
from x = 13 against the Monte-Carlo model (+0.0029 at x = 13 against the exact model), exact at one excluded class where it reproduces Gorodetsky's
λ(u); the model's own limit theorem is PROVEN (`history/staging/varE-limit-theorem.md`: ln n/ln y → GD(2) with rate O(lnln y/ln y), E[g] → λ₂(u) with no correction, the n < L band exact at nine levels at 0.063/ln y), and the θ = 2 mean-coefficient replacement stays open (`varE-theta2-proof.md`: two of its three groups closed unconditionally, the CRT-mixed lags a class discrepancy whose dominant part (82% of the measured remainder at x = 19) sits below 2L in the unbalanced range and is a friable-integers-in-progressions question (`attack-0830-varE-identification.md`, HELD); measured error O(1/ln y), falling through x = 31). The earlier fitted reading 0.611 is
refuted as an inference: the fit protocol run on the model returns 0.615 and
wins the frozen forecast too. Not in print at θ = 2, searched in the owning
convention (variance of y-rough integers in short intervals, Gorodetsky's;
`SEARCH-CONVENTIONS.md` §1).
`history/staging/varE-spectral.md`, `varE-theta2-step.md`,
`lit-dickman-variance.md`, `redteam-0828-varE.md`.

**PROVEN, conditional, and a barrier rather than a bound.** On the hypothesis
Granville uses (infinitely many real characters with a Siegel zero
β ≥ 1 − κ/log q, κ arbitrarily small), interval sifting problems with two
classes per prime attain the dimension-2 sieve bounds up to u = 2, so
β_interval(2) ≥ 2: the first barrier statement on Face 4, sitting below the
open band (2, 4.26645], where the transfer dies on a Chowla-strength
correlation. `history/staging/attack-barrier-kappa2.md`.

**DEAD.** 72 routes (recounted 2026-08-30 evening: 67 on 08-28, two added 08-29, four 08-30), one line each with its mechanism and record, in
`OUTCOMES.md`. Added 2026-08-28: the QR refinement of the anchored caps (Z3),
closed by a pre-registered test with a matched control. By family: **chaining** (the entropy integral of the true metric
already exceeds the union bound, so chaining's ceiling sits below the union
bound's floor); **the local-lemma family** (Shearer, Moser–Tardos, resampling
oracles, entropy compression — all die on the complete dependency graph);
**the concentration family** (McDiarmid, Azuma, Talagrand, Warnke, Kutin, Kim–Vu
— one shared uniform residue draw defeats every local neighbourhood, and
Banks–Ford–Tao arXiv:1908.08613 §5 had already run the programme on this
ensemble); **spectral ℓ¹→ℓ²** (the conversion *is* the sharp maximal law and its
true constant sits below the TPC line); **coverings** (the economy dies at
`x = 13` where `Σ 2/p` crosses 1; the adversary side is SAFE by `x^{1−o(1)}` and
widening); **thinning as a route** (the merge event is a function of the gap
value and is mutually singular with every solvable coupling). Four candidate
hypotheses were unmasked in one wave as the Zone Postulate wearing other
clothes, which is why every `IMPORT-MAP.md` row now carries a circularity
pre-check.

**Earlier exponent route (parked under TODO 0).** Lemma V's missing piece is the quantifier —
almost-all against worst-position — and the instrument family that would supply
it is now named and priced. Deshouillers–Iwaniec 1982 Theorem 12, Maynard's
Lemma 6.12 and Pascadi's 2026 Corollary 18 all require the **modulus and the
inverted variable each to carry a fixed smooth profile**; Rosser weights are
arbitrary functions of the whole modulus and supply none. If both were smooth,
the published bound would still price at exponent 5.0907 > β₂ and the consumer
cannot take a smooth profile (`attack-0829n-rml-proof.md` §4.5, HELD). The
open arrow is now written with its quantifiers as REC(s, u₀) (same note §3);
an adverse derived floor is on file (`attack-0830-rec-cheapest.md` §4) and
has now been red-teamed on both halves (`redteam-0830-floor-sign.md`: the
exact half PROVEN; `redteam-0830-floor-growth.md` and, on 2026-09-04,
`redteam-0904-floor-growth-2.md` graded by `redteam-0904-item0.md`: the
growth half survived two adversarial passes at every admissible level split
and stays DERIVED, with the hypothesis s ≤ 3 added; the proof-gap reading is
refuted, since REC quantifies over the remainder of the certificate the floor
bounds). At that rung REC, F1, F2 and RML below β₂ are false rather than
unproven, the route is a truth gap (`OUTCOMES.md`, 2026-08-30, reworded
2026-09-04), and its falsity lives beyond a level that depends on (s, u₀),
10^15.3 at (3.0, β₂) and 5.6e31 at (2.698721, 4.2165), where no computation
reaches. This front is therefore CLOSED at rung derived-and-red-teamed-twice;
the second pass that its earlier wording asked for has run and found no
break, so only a non-two-class input reopens it. The affordable rough mass is 12.49%
of ours for DI and — corrected 2026-08-20 — 32.50% for Pascadi, leaving a
shortfall of `H^{0.818235}`: Theorem A's own admissible range carries a third
term, `X ≪ max(1, q/N, q²/N³)`, that supplies `Y_N = max(1, q/N²)` for
arbitrary sequences free, moving the frontier 0.354437 → 0.393922. And that
axis is EXHAUSTED: `Y_N` enters Corollary 18's `ℐ²` only through the
exceptional factor, and past 0.393922 the `Y_N`-free regular-spectrum main
term `CS(C+DR)(RS+N)` binds whatever `Y_N` does — exact arithmetic
(`1.212157 + 2σ ≤ 2`), so no coefficient information moves it further.
`history/staging/lemmaV-neighbours.md`, `history/staging/smoothness-front.md`;
the exponent chain and the source readings independently confirmed,
`history/staging/redteam-0820-math.md` §2. Beside it, open and now carrying the named
legal route at the exponent: the **1d bounded-defect Fekete target**. The
submultiplicativity defect
is an identity on the Overshoot slack, `D(s,t) = S(s) + S(t) − S(st)`, so the
whole of TODO 1d is a statement about the sublinear part of `ln G₂`; the
bounded-defect Fekete lemma is now stated and PROVEN with (H-mono) discharged,
and the remaining hypothesis was WEAKENED to power pairs (2026-08-20 night) —
**(H-sub-pow)**, `f(b^{k+1}) ≤ f(b^k) + f(b) + K` for all `b ≥ 2, k ≥ 1`,
conclusions unchanged, since the lemma's proof consumes pairs only at
`(b^k, b)` and the liminf half uses none — so conditional on (H-sub-pow), the
route's single remaining gap, the exponent
limit exists, and de Bruijn–Erdős is not needed (the reachable range supports a
bounded defect). Its `t = 2` slice is **the doubling window** (§3a): proving
`Ĝ(2s) ≤ C₂·Ĝ(s)` on the base-2 power chain for any `C₂ < 2^{β₂} = 19.2455`
is trap-free in its all-s form only (the eventual form is TPC-implying below
C₂ = 4, TODO D; custody data force `C₂ ≥ 348/66 = 5.2727`, so
`log₂C₂ ≥ 2.3985 > 2`) and every provable point beats β₂; the two bridges
tried, the K*-product and the per-fold composition, are closed
(`OUTCOMES.md`, 2026-08-29/30).
`history/staging/import-interp.md` §0,
`history/staging/fekete-1d.md` §5, `history/staging/attack-hsub-01.md`,
`history/staging/redteam-0820-night-proofs.md` §2.

**The compute lever, and it is looser than the ladders suggest.** The exact
ladder runs to 43# (`G₂(43#) = 618`); 41# and 43# are recomputations against
A144311's 22 terms rather than new values, which makes them a check on both
sides. The `162 GB` price recorded for the @29 census was the in-memory
instrument's and not the object's — the segmented census runs @29 and @31 at
62 MB. Standing lever: any question phrased about a bounded window `[0, x^k)`
rather than about the whole tile runs on a segmented sieve and reaches about
three decades further, and the segmented engine walks the exact 29# period in
O(1) memory. Check any stalled ladder against that before calling it
compute-bound. `TODO.md` standing compute note, `LOCALIZED-GAP.md` §10.

**And the second difficulty, which is about our measurements rather than about
G₂.** Three quantities this programme quotes are not constants: the
extreme-value `c` is a surface `c(x, lnD)` reading 0.45 to 1.09 across the
reachable range (§3c); the exponent reads 1.50 on the 22 trusted terms and about
1.2 on certified ones, a third of that gap priced (§6); and the all-positions exponent
θ is above 2 and rising with no visible asymptote (§7). Every number below
carries the coordinates it was measured at, because two apparent contradictions
in this programme were nothing but missing coordinates.

---

## 1. The object, and why it matters

### 1a. Definition

Fix a prime x and write W = x# for the primorial. The **tile** T_x is the
residue pattern of width W (classically: the primorial wheel mod x#). A **twin
slot** is a residue r with

  gcd(r(r+2), W) = 1,

that is, r and r+2 are both coprime to W. The census of twin slots in one period
is D_x = ∏_{3 ≤ q ≤ x}(q − 2), OEIS A059861, the Schemmel totient (1869).

> **G2(x#)** is the largest cyclic gap between consecutive twin slots of T_x.

The omitted classes are fixed by the arithmetic and not chosen: for p = 2 one
class is forbidden, and for each odd prime q ≤ x two classes are forbidden,
r ≡ 0 and r ≡ −2 mod q. So G2 is the maximum-gap function of a sieve of
dimension κ = 2 whose two omitted classes sit at distance exactly 2.

**Three gap objects are in play, and they are not interchangeable.**

**G2(x#), the whole-tile gap** — the object above: one number per tile, the
maximum taken over the full period x#. Every exponent statement, ladder term
and bracket in this file is about G2 unless it says otherwise. Exact in
custody to 43#; 22 trusted terms to x = 79 via A144311.

**h2, the free-class adversary** — Ziller and Morack's OEIS A288815: the same
maximum-gap question with each prime free to CHOOSE its two omitted classes,
where G2's classes are forced to {0, −2} by the arithmetic. It dominates G2 at
every level and serves as the control ladder (§6: its exponent figure is 1.57
against the trusted ladder's 1.50). Any upper-bound machinery that never uses
the class positions is really bounding h2, and pays h2's price.

**Z2(x), the zone gap** — new, 2026-08-21 (Chris): the same maximum-gap
question restricted to the zone (x, x′²) rather than the whole tile. One
number per zone, not per tile. Because the zone lies below the frontier, its
twin slots are genuine twin prime pairs, so Z2 is measured from the primes
themselves with no tile built — thousands of levels where the tile ladder has
fourteen — and an interior gap of the zone is a gap of the tile's slot
sequence, so the interior part of Z2 never exceeds G2(x#). Definition and the
not-G2 distinction: `GLOSSARY.md` §"Core objects", the "Zone gap" entry. The
measurement artifact is `zonegap-01.js`; its boundary convention, data and law
belong to that artifact and are not restated here.

### 1b. The Gap Reformulation

**PROVEN reduction** (`research/ZONE-POSTULATE.md` §3). Both x# − 1 and x# + 1
are coprime to x#, so the tile carries a twin slot at its edge, and reading
forward from the origin the first twin slot lies within G2 of it. Every hole of
T_x in the zone (x, x′²) is a genuine prime, and every twin slot lying wholly
inside the zone is a genuine twin prime pair, because a composite x-rough number
is at least x′². Hence

> **G2(x#) < x′² − 2  ⟹  Zone Postulate at x  ⟹  (for infinitely many x) TPC.**

Since ln(x#) = θ(x) ~ x, the window x² is (ln W)², so the sufficient condition
is a two-class Jacobsthal exponent below 2.

### 1c. The exact logical status of the Zone Postulate

**PROVEN, both directions, elementary** (`research/ZONE-POSTULATE.md` §2).

- **Weak form** (the zone is occupied for infinitely many x) is **equivalent to
  the Twin Prime Conjecture**. Forward, occupied zones sit above x and x → ∞, so
  the twins found are unbounded. Backward, given a twin pair (r, r+2) with r > 3,
  take x the largest prime below r, so x′ = r and the pair lies in the zone of x.
- **Strong form** (every zone occupied) implies TPC and imposes an additional
  occupancy requirement. A converse or logical independence is not proved here.

A G2 bound holding at every prime gives the strong form; a bound holding
only infinitely often gives the weak form. Uniformity in tile position does
not itself imply uniformity in the prime level. `research/THE-DIALS.md` §1 dial 4 prices the difference as **free
slack with no known mechanism**: an argument allowed to fail on a sparse set of x
would be strictly weaker and still sufficient, and the two mechanisms looked for
both fail. An almost-all-positions bound cannot be steered to the origin, because
certification pins the anchor at 0 and there is exactly one usable window per
tile. Large prime gaps widen the window by 2(x′−x)/x → 0, where a factor of three
is needed.

### 1d. Why the object is the right one to hold

`research/THE-DIALS.md` §5 measured three candidate windows to 10⁸. The
square-to-square family (n², (n+1)²) has twelve genuine failures, last at
n = 122, and reproduces OEIS A091592 term for term. The pane (n², (n+2)²) has
one failure, at n = 26. The zone (x, x′²) has none, and its worst case across
1,228 windows sits at 1.13 times the Hardy-Littlewood count, never below its own
expectation. A uniform gap bound cannot prove a statement that has exceptions, so
the zone is the widest window whose statement has the same shape as the only tool
we have. The comfort is margin and margin is not a dial (`THE-DIALS.md` §2).

---

## 2. The ladder

All fourteen exact terms — the custody ladder; the trusted extension to
x = 79 (A144311's 22 terms, adopted 2026-08-20) lives in
`research/a144311-full-ladder.js`. The last four — 31#, 37#, 41#, 43# — were
computed here; 41# and 43# on 2026-08-18, each twice on disjoint natal masks. G2 from
`research/05-twin-jacobsthal.js` and
`05b-twin-jacobsthal-segmented.js`, provenance table in
`research/oeis-G2-submission.md`. The one-class column h(x#) is Jacobsthal at
primorials, OEIS A048670, also tabulated by Holt (arXiv:1402.1970 §4). The
ceiling column h2(x#) is Ziller and Morack's adversarial paired Jacobsthal,
OEIS A288815 = 6·A072753 + 6.

| n | x | G2(x#) | h(x#) one class | h2(x#) ceiling | x′² | x′²/G2 | G2/h |
|---|---|---|---|---|---|---|---|
| 1 | 2 | 2 | 2 | 2 | 9 | 4.50 | 1.00 |
| 2 | 3 | 6 | 4 | 6 | 25 | 4.17 | 1.50 |
| 3 | 5 | 12 | 6 | 18 | 49 | 4.08 | 2.00 |
| 4 | 7 | 30 | 10 | 30 | 121 | 4.03 | 3.00 |
| 5 | 11 | 42 | 14 | 66 | 169 | 4.02 | 3.00 |
| 6 | 13 | 66 | 22 | 150 | 289 | 4.38 | 3.00 |
| 7 | 17 | 108 | 26 | 192 | 361 | 3.34 | 4.15 |
| 8 | 19 | 150 | 34 | 258 | 529 | 3.53 | 4.41 |
| 9 | 23 | 204 | 40 | 366 | 841 | 4.12 | 5.10 |
| 10 | 29 | 258 | 46 | 450 | 961 | 3.72 | 5.61 |
| 11 | 31 | 348 | 58 | 570 | 1369 | 3.93 | 6.00 |
| 12 | 37 | 528 | 66 | 708 | 1681 | 3.18 | 8.00 |
| 13 | 41 | 546 | 74 | 894 | 1849 | 3.39 | 7.38 |
| 14 | 43 | 618 | 90 | 1044 | 2209 | 3.57 | 6.87 |

Three pointwise relations hold at every shared term and all three are
elementary.

- **G2 ≥ g(x#) = h(x#) (PROVEN, VERIFIED at all 22 shared terms).** Twin slots
  are a subset of holes, so an interval with no hole has no twin slot, and the
  twin-slot gap covering the largest hole gap is at least as long.
  `two-class-lower-bounds.md` §1. **The ratio's trend is settled by the full
  trusted ladders (2026-08-20, `research/external-ladders-01.js`):** the old
  14-term reading "peaks at x = 37 and then falls twice, no trend established"
  was an artifact of the data ending at 43 — seven of the eight trusted terms
  x ≥ 53 sit ABOVE the old 8.00 peak, the maximum moves to the last term
  (8.55 at x = 79), and the tail reads as a slow upward drift: the one-class
  and two-class maximal gaps are separating, slowly.
- **G2 ≤ h2(x#) (VERIFIED at all 21 shared terms, to x = 73;
  `research/external-ladders-01.js`).** Offset 2 is one of the offsets h2
  maximises over. `exponent-control.md` §3. h2/G2 sits in [1.63, 1.81] at the
  seven trusted levels x = 47..73; the low outlier of the whole column is
  x = 37 at 1.341 — the same level that spikes G2/h and c2′. The three are not
  independent: all three are ratios carrying G2(37#) = 528, and of nine
  instruments free of that value none reads high at 37, the largest being
  h(37#) itself at z = −2.20 in the low direction and −1.08 on the
  range-matched ladder (MEASURED, `history/staging/measure-g2-provenance-0829.md`
  §4). What survives is one object: G2(37#) overshoots a blind seven-term
  extreme-value forecast by z = +6.58, the largest such residual on any of
  the three ladders, and that overshoot is unexplained.
- **h2 ≥ h (VERIFIED at all 21 terms, elementary).** The adversary choosing two
  classes may take the first to be the one-class optimum.

**G2(37#) = 528 additionally carries an INDEPENDENT EXHAUSTIVE maximality
certificate** (2026-08-19): `maxsum₁ = 528` taken over all 217,929,355,875 gaps
of T₃₇ by the scan-statistic engine, which shares no code with either exact-ladder
producer. It certifies the maximum over the whole tile rather than agreeing with a
published term, which makes it the strongest custody fact in this table
(`history/staging/scanstat-t37.md`, `U-FRAME.md` §8). A third engine, a
wheel-210 segmented striking sieve sharing no code with either, re-derived the
whole ladder exhaustively at x = 11..37 on 2026-09-04 with every self-test
exact (slot count, Σg = W, gap count, maximum) and measured the argmax sets:
mirror-invariant, no fixed-point hit, and from x = 23 zero congruence pairs
among the maximal windows, those zeros forced by both kill classes being
present; a fourth engine (fold replication over the gap word) reproduced every
position at x = 11..31 (`history/staging/measure-0904-argmax.md`,
`redteam-0904-argmax.md`; MEASURED, understanding only).

The last two terms are ours. G2(31#) came from the segmented method over
2.0·10¹¹ positions in about 80 minutes, G2(37#) from a mod-30 lattice walk over
7.42·10¹² positions in about 54 minutes, both with the slot count matched against
A059861 exactly (`research/oeis-G2-submission.md`). The sequence **is** in OEIS:
it is **A144311 + 1**, Carter 2008, 22 terms. The 2026-08-16 negative "at any of
three offsets" was run in our own convention and none of the three was the −1
shift that returns A144311 at once, so `research/oeis-G2-submission.md` is a
duplicate and must not be sent (`research/U-FRAME.md` §6a,
`research/SEARCH-CONVENTIONS.md` §2).

The margin column is flat. Its minimum over the computed ladder is 3.18 at
x = 37, and on Ziller and Morack's dominating h2 the same margin against p_{n+1}²
is flat at about 2.2 over nineteen terms, slope +0.018 ± 0.045 on [23, 73], with
minimum 1.880 at x = 17 and never revisited (`exponent-control.md` §6).

---

## 3. Growth

### 3a. Everything known, in one table

| statement | value | calibration | source |
|---|---|---|---|
| upper bound | G2(x#) ≪_ε x^{β₂+ε}, β₂ = 4.26645028414864191641 | **PROVEN** (DHR dimension-2 lower-bound sieve, input verified line by line against the primary source) | `paper/beta2-note.md` |
| upper bound, conjectural | h2(n) < p_n² − p_n, hence G2 below it | CONJ, verified to x = 73 | Ziller and Morack 2017, Conjecture 6 |
| **the target** | G2(x#) < x′² − 2, i.e. exponent 2 | what route A needs | `ZONE-POSTULATE.md` §3 |
| **the named legal route at the exponent (2026-08-20 night)** | the doubling window: Ĝ(2s) ≤ C₂·Ĝ(s) on the base-2 power chain for any C₂ ∈ [5.2727, 2^{β₂} = 19.2455) gives limsup ln G2(x#)/ln x ≤ log₂C₂ ∈ [2.3985, 4.2665) | **OPEN, trap-free** — TPC through the slice needs C₂ < 4, excluded by custody data (Ĝ(32)/Ĝ(16) = 348/66 = 5.2727, red-team verified as the sup of Ĝ(2s)/Ĝ(s) over ALL data, sitting on the (2^k, 2) chain); every provable point improves β₂ | `history/staging/attack-hsub-01.md` §3; `history/staging/redteam-0820-night-proofs.md` §2b–2c |
| lower bound, best proven | G2(x#) ≫ x·log x·logloglog x / loglog x | **PROVEN**, free by monotonicity from G2 ≥ g plus Ford-Green-Konyagin-Maynard-Tao (JAMS 31, 2018) via Rankin 1938 and Pintz 1997 | `two-class-lower-bounds.md` §3 Full write-up `paper/kk-lower-bound.md` (2026-08-28). |
| lower bound, published-ingredient chain, above the free transfer | G2(x#) ≫ x·ln x, effective constant | **PROVEN from published ingredients consumed as theorems (K–K Cor 1 + Mertens + PNT + the §1 CRT identity), composition ours, adversary-confirmed end to end, NOT refereed** — held one adversarial pass at the door; finite cover independently rebuilt and replayed clean | `history/staging/import-hypergraph.md` §4; `history/staging/redteam-0820-math.md` §3.3–3.4; `paper/proposals/prop-xlnx-lower-bound.md` |
| lower bound, derived here, two logs above the free one | G2(P(y)) ≫ y(ln y)³(lnlnln y)²/(lnln y)⁴ for y ≥ 10^{134.1} | **DERIVED HERE, NOT REFEREED** — K–K's §2 trichotomy re-derived for Ω_p = {a_p, a_p−2}, Case 2 empty and \|Ω^III_p\| = 2 verified to 10⁶, adversarially checked twice; sits ≈ ln²x above the x·ln x chain, on weaker (proof-reading) provenance | `two-class-lower-bounds.md` §4c |
| lower bound, best constructed | 356,712 at x = 4001 | **CERTIFIED**, explicit (a_p) replayed by an independent routine, zero uncovered, at all sixteen levels | `two-class-lower-bounds.md` §5 |
| lower bound, honest Rankin analogue | x(log x)² logloglog x / loglog x | INFERRED, contingent on the Rankin/FGKMT refinements transferring | `two-class-lower-bounds.md` §4b |
| lower bound, conjectural truth | x(log x)^{3+o(1)} | CONJ, Maier-Pomerance accounting run in dimension 2 | `two-class-lower-bounds.md` §4b |
| raw exponent fit, G2, 22 trusted terms, x-frame | 1.777 ± 0.029 | MEASURED, and the standard error is worthless | `exponent-control.md` §5 |
| raw exponent fit, h2, 19 terms, x-frame | 1.847 ± 0.035 | MEASURED, same caveat | `exponent-control.md` §5 |
| control-corrected exponent, h2 | **1.57 ± 0.06** stat, systematic unquantified | MEASURED | `exponent-control.md` §5 |
| control-corrected exponent, G2, 22 terms | **1.50 ± 0.05** stat | MEASURED | `exponent-control.md` §5 |
| control-corrected exponent, certificate ladder to x = 4001 | 1.11 to 1.25, falling with range | MEASURED, on the greedy construction rather than on G2 | `two-class-lower-bounds.md` §5 |
| hard floor on the exponent | ≥ 1 | **PROVEN** via h2 ≥ h and exponent(h) = 1 + o(1) | `exponent-control.md` §3 |
| proportional-bias correction, 0.67 to 0.83 | **REFUTED** by that floor | REFUTED | `exponent-control.md` §3 |
| extreme-value law, on the diagonal | max ≈ c·m·(θ(x) − ln m), c₂′ = 0.4814 ± 0.049 for G2 | MEASURED, 8 exact terms, cv 10.2%, whole-period windows only | `two-class-lower-bounds.md` §6, `maxgap-law.md` §4 |
| c is a surface c(x, lnD), not a constant | 0.446 to 1.083 inside the single tile x = 29; 0.577 (x = 23) to 0.989 (x = 6421) at fixed lnD | MEASURED, REFUTES any universal c | `maxgap-law.md` §4 |
| mean twin-slot gap | m₂(x) = x#/∏(q−2) ~ e^{2γ} ln²x/(2C₂) ≈ 2.40 ln²x | **VERIFIED** | `ZONE-POSTULATE.md` §6, `localized-04-maxsum.md` §3 |
| conjectural shape | G2(x#) = x(log x)^{3+o(1)}, with the o(1) strongly negative on everything computable | CONJ | `two-class-lower-bounds.md` §4b, §6 |

### 3b. The control, which is the reason not to trust any of the fits

The estimator does not work at these sizes, and that is provable, because the
same estimator run on 58 terms of an object whose answer is known reports 1.282
when the truth is 1 (`exponent-control.md` §1). The bias grows and then sticks:

| window width | windows | mean | sd | bias |
|---|---|---|---|---|
| 10 | 49 | 1.262 | 0.094 | +0.262 |
| 19 | 40 | 1.280 | 0.058 | +0.280 |
| 21 | 38 | 1.282 | 0.053 | +0.282 |
| 30 | 29 | 1.283 | 0.036 | +0.283 |

The scatter collapses by a factor of three across those widths and the centre
does not move. On the same data the pure power law beats the family containing
the truth by 47 AIC units with white residuals (27 sign runs against 28.5
expected, lag-1 autocorrelation 0.118) and its exponent is wrong by 0.28. So a
clean power-law fit with white residuals carries no evidence about an asymptotic
exponent at these sizes.

**House practice.** Any exponent read off a ladder in this repo is
quoted alongside the control line: *58 terms, true exponent 1, measured
1.282 ± 0.008, no drift.*

Two further readings from the same note. On nineteen terms of h2 the models
c·p^1.847 and c·p·log^2.448 p are separated by **0.1 AIC units** while differing
by a factor of x^0.85 in the limit, so the data does not determine the exponent.
And at matched n and range the frozen quadratic loses 74.7 AIC units on the
one-class control against only 12.2 on h2, so two classes do look far more
quadratic than one, without that being a measurement of the exponent.

Exponent 2 is disfavoured by one-sidedness rather than by a standard error. The
control's bias is positive in all 40 windows, minimum 1.197, because a positive
power of log inside the truth biases a finite-range power fit upward. Nothing
about the two-class object suggests a negative log power, so the bias transfers
in sign and the true exponent lies **below** the raw 1.847.

### 3c. The extreme-value law, and the fact that c is a surface

Reading Ford's random-dart prediction J(T) ~ e^γ T log T as extreme-value
statistics generalises it: for a sifted set of mean gap m inside a period W, the
number of gaps is W/m and the maximum of that many exponential gaps is about
m·ln(W/m). Tested against every exact value that exists
(`two-class-lower-bounds.md` §6), every row a **whole period**, that is
lnD/θ(x) → 1:

| c | object | terms | range | mean | cv | range of c |
|---|---|---|---|---|---|---|
| c₁ | one class g(x#), A048670 | 46 | x ∈ [11, 229] | 0.3718 | 7.2% | [0.3359, 0.4873] |
| c₂ | free 2-class h2(x#), A288815 | 17 | x ∈ [11, 73] | 0.8511 | 7.3% | [0.7784, 1.0157] |
| c₂′ | our G2(x#) | 8 | x ∈ [11, 37] | 0.4814 | 10.2% | [0.4463, 0.5939] |

**c is a surface c(x, lnD) and the law is a diagonal law (MEASURED, `maxgap-law.md`
§4).** Two coordinates move it in opposite directions. At fixed x, cutting one
exact period into blocks and growing lnD makes c fall monotonically from 1.083 to
0.446 inside the single tile x = 29, terminating on the exact G2(29#) = 258. At
fixed lnD ≈ 11, growing x makes c rise 0.577, 0.587, 0.745, 0.803, 0.857, 0.951,
0.989 at x = 23, 29, 97, 199, 401, 1601, 6421. Along the **diagonal**, where the
window is the whole period, lnD = θ(x) − ln m grows because more primes enter, and
the two effects cancel. That cancellation is the whole content of the law's
apparent constancy. It is not an extreme-value statement, and the off-diagonal
exponents (b ≈ −0.4 in lnD, a ≈ +0.4 in ln ln x) predict a 32% fall along the
diagonal leg x = 101 → 271 where the exact terms deliver a 2.5% rise.

> **Report c with its coordinates (x, lnD, lnD/θ(x)) or do not report it.** The
> localized files read 0.74 to 1.17 and the exact tiles read 0.45 to 0.59 for the
> same twin-slot object. Those are the same surface at different positions, and
> on matched statistics both spreads are ±22.5%, not one tight and one loose.

**What the constant is (MEASURED, `maxgap-law.md` §5).** c is the reciprocal of
the gap tail's exponential rate at the extreme. c₁ = 0.372 says the one-class gap
tail decays like exp(−2.7 g/m), not exp(−g/m), and the extreme-value solve
D·S(t) = 1 returns the exact whole-period maximum at both x = 23 objects, ratio
1.000.

**The caveat that stops this being an asymptotic.** For one class the conjectural
truth is x ln²x, so c₁ should eventually grow like ln x. It does drift upward, at
a tenth of the required rate: c₁ ~ (log p)^{0.12 ± 0.02} on the top 47 exact
terms, against the exponent 1 Maier-Pomerance needs. A synthetic ladder built to
have exponent exactly 1 returns 0.981 ± 0.006 from the identical estimator, so the
shortfall is a measurement rather than a resolution limit. The law describes the
accessible range, not the limit, which agrees with `exponent-control.md` §2
finding the frozen Maier-Pomerance shape refuted on the same data (rms 0.281,
maximum log residual 1.239, a factor of 3.5).

**Where the missing log lives (INFERRED from a PROVEN source, `maxgap-law.md`
§7).** In Ford, Green, Konyagin and Tao's own accounting the truth is
y ~ e^γ·x·T1·r, so in the law's units c = T1·r/log x. T1 is Rankin's alignment
gain, PROVEN and capped by the smooth-number step at log x·log₃x/(log₂x)², which
is less than one log. r is the number of survivors one large prime can kill,
proven only at r = 2 and conjectured by Maier and Pomerance at (log x)^{1+o(1)}.
Both are maxima over indices a random-dart model does not carry. Evaluated with r
frozen at 2, the ledger returns c = 0.3674 at x = 229 against the measured 0.3722,
and it predicts flatness across exactly the range where flatness is observed
because log₃x/(log₂x)² is stationary at x = 181. It doubles c only past x ≈ 10¹⁷.

### 3d. What the second residue class costs

Three independent routes, one answer, and the answer is **one logarithm, not a
power of x**.

- **Rankin accounting run in dimension 2** (`two-class-lower-bounds.md` §4b,
  INFERRED). The second class multiplies the survivor density after the small
  primes by 1/log z, so it multiplies the coverable length by log x. The
  Maier-Pomerance ledger, whose one-class exponent decomposes as 1 + 1, gains one
  row in dimension 2 and closes at 3.
- **The certificate ladder** (MEASURED). (Y2/Y1)/ln x plateaus at 2.18, flat from
  x = 113 onward. Fitting the ratio as a power of ln x gives 1.39 on the whole
  ladder, 1.17 from x = 229, 1.09 from x = 773, and 0.88 on the top five points.
- **The Poisson law** (MEASURED). m₂/m₁ ~ e^γ ln x/(2C₂) ~ 1.35 ln x, and both
  objects sit at a flat multiple of their own prediction.

In the **discrepancy** channel the price is entirely different, and the two must
not be quoted as one phenomenon. There sup₂/sup₁ crosses over at x = 11 and then
grows by ×1.177 per fold, asymptotically √(3/2) = 1.2247 per fold, that is
(3/2)^{π(x)/2}, exponential in π(x) (`discrepancy-two-class.md` §7).

---

## 4. Structure

### 4a. The two merge facts

**Fact A (PROVEN).** For x ≥ 3, no two twin slots of T_x are 2 apart. If s and
s+2 were both twin slots then s, s+2, s+4 would all be x-rough and they cover
every residue class mod 3, so one is divisible by 3.

**Fact B (PROVEN).** Folding T_x by p deletes exactly the slots in classes
{0, −2} mod p, and those classes are 2 apart. In an interval of length below
p − 2, two kills would be either p apart (impossible in the interval) or exactly
2 apart, which Fact A rules out. **An interval of length below p − 2 contains at
most one kill.** (`LOCALIZED-GAP.md` §2.)

Fact A is what makes the two-class version of Holt and Rudd's fusion mechanism
*cleaner* than the one-class original: their minimum span between fusions is
2p_{k+1} because the minimum gap between generators is 2, ours is p − 2 because
the two kill classes sit only 2 apart.

**The Mirror-Sweep Lemma (PROVEN 2026-08-20; re-derived from scratch and
verified exhaustively by an independent engine).** The tile mirror
σ(s) = W−2−s conjugates the fold's deletion classes {a, a−2} mod p into
{w−a, w−a−2}, w = W mod p, so the residue-deleted maxsum family satisfies
Δ_m(x,p,a) = Δ_m(x,p,(w−a) mod p) for all m, for every alignment outside the
specials {1, w−1, w+1, p−1} — **at most four** (three whenever w ∈ {2, p−2};
the producer's own 5→7 row prints {1,3,6}). In copy order the per-copy
degradation curve is a **palindrome**, C(k) = C(p−1−k), broken only at the
seam-striking copies, where the identity degrades to a one-sided inequality
with an exact correction term: the seam side never loses. The single
symmetry-breaking point is the edge slot W−1, the natal cohort's birth canal.
Every argmax set from 7→11 up is closed under a ↦ w−a; the 5→7 exception is
the licensed one (its unique argmax IS the seam-striking alignment). The
fold-ladder verification's single-engine caveat at 31→37 is resolved: the
structural red team's from-scratch direct-definition tracker reproduces the
full 29→31 curve (31 of 31 alignments) and six 31→37 values spanning the
whole shape — max, min, both tiers, bulk — all agreeing, the rest halved by
the proven mirror. Same pass, kill-decoupling: the per-copy kill count stops
predicting degradation at depth — exactly flat at 17→19 for every tie-break
permutation, REVERSED at 23→29 for every tie-break (19→23's flatness is
tie-break-dependent, range straddling zero).
`history/staging/attack-0c-holesweep.md` §4;
`history/staging/redteam-0820-structural.md` §1.

### 4b. The Localized Merge Lemma, and its true turn-on point

Write M(T_x, Y) for the largest twin-slot gap of T_x among gaps starting below Y,
and maxsum_m for the largest sum of m consecutive such gaps.

> **Lemma (PROVEN, `LOCALIZED-GAP.md` §3).** If M(T_x, Y) ≤ (p − 2)/4 then
> M(T_p, Y) ≤ maxsum₂(T_x, Y).

**The lemma has two conditions and they turn on a decade apart**
(`localized-04-maxsum.md` §6). The **hypothesis-side** condition M(T_x, Y) ≤
(p−2)/4 is read at the old level and is the only one a chain can use in advance;
it first holds at **x = 13933** at Y = 10⁹ (k = 2.17), VERIFIED, against a
prediction of 13,630 from solving x* = 9.6·ln²x*·ln(Y/m̄), 2% out. The
**conclusion-side** condition M(T_p, Y) < p−2 is read at the new level, is four
times weaker, and first holds at x = 1453 at k = 2; `localized-03-merge-lemma.js`
line 74 tests that one. Verifying it verifies the lemma and does not give a gate,
because it refers to the level not yet reached. At k = 3 the same equation gives
x* ≈ 2.4·10⁴ with Y ≈ 1.4·10¹³, out of computational reach by four decades. The
lemma is true and the regime where it applies is not one we can survey.

### 4c. Why the chain dies, and it is cheaper than the sieve wall

**Deficit Lemma (PROVEN, `localized-04-maxsum.md` §7).** For 1 ≤ m ≤ D/2,
maxsum_m ≥ m·m̄·(1 − O(m/D)), by averaging and nothing else. VERIFIED: the minimum
of R(m) = maxsum_m/(m·m̄) over m ≤ 1024 measures 1.187, 1.280 and 1.296 at
x = 16001, 997 and 3499, never below 1.

**Traverse Bound (PROVEN).** Telescoping the merge lemma forces j·m̄ ≤ α·q_{j+1}
with α = 1/4, so **j ≤ x₀/(9.6 ln²x₀) folds whatever C is, even C = 1**, against
the π(x) ≈ x/ln x folds the route needs. Short by a factor 9.6 ln x, which is 93
at x = 16001. Measured chain survival is **0 folds for every x ≤ 12143 at
Y = 10⁹, and exactly 1 fold at x = 13933 and x = 16001, against the 1863 that
π(16001) requires**.

**The obvious repair is closed (PROVEN).** Weakening the gate to M ≤ α·p does not
help at any α, because the gate feeds back. If the chain proves M ≤ B(x), Fact B
permits B/x kills per gap, the telescope index is B/ln x, and the bound returned
is about 2.4·R·B·ln x. The map B ↦ 2.4·R·B·ln x is expanding for every x ≥ 2, so
there is no fixed point. The obstruction is not the size of the gate, it is that
**the gate multiplies wherever the index accumulates against a fixed base.**

**How far that principle reaches, and it is narrower than it sounds
(`gate-multiplies.md` §2, §6).** Stated as four hypotheses on a proof strategy
(accumulating index, a deficit floor, linear cost feedback, and a traverse count
exceeding the budget), the no-fixed-point argument closes this chain and A4's tile
analogue, and it does **not** reach a recursion that re-bases at every fold, where
the running bound cancels out of the cost instead of compounding. Three escapes
exist and all three are occupied by something in the repo: an exact identity (the
copy theorem for the whole maxsum family, and A9's transfer operator), a B-free
per-fold cost, and re-basing. The u-frame recursion escapes it.

**What closes the tile analogue instead is simpler and harder to escape.**

> **Overshoot Budget (PROVEN given the measured G2 law, `gate-multiplies.md` §5).**
> Any valid chain of upper bounds ending in G2(x#) < x² passes through quantities
> all at least G2(x#), so its total multiplicative overshoot over the truth is
> capped at x²/G2(x#). MEASURED, the slack ln(x²/G2(x#)) reads 1.058, 0.940,
> 0.984, 0.878, 0.953, 1.182, 1.016, 0.953 across x = 11 to 37. Flat over the
> whole reachable ladder, with a predicted asymptote of ln(1/0.55) = 0.598 nats.

So an accumulating-index chain must pin its cumulative index to within a factor
1.82 of the truth over π(x) folds, and the budget is a fixed number of nats spread
over an infinite ladder however the chain is decomposed. The only unconditional
tool available, the spacing bound of Fact B, is loose by 3.5× to 6.7× at a single
fold (MEASURED at four folds, deepest T_23 by 29). **There is no growing margin
anywhere in this route, at any level, in any formulation.**

### 4d. The growth law of maxsum, which survives the chain

**MEASURED, and not a fit** (`localized-04-maxsum.md` §3):

> maxsum_m = m·m̄ + σ·√(2 m ln D), so R(m) = 1 + (σ/m̄)·√(2 ln D / m),
> with σ/m̄ = 0.892, 0.920, 0.949 at x = 997, 3499, 16001.

Over m ≥ 2 ln D it holds to R/R_EV ∈ [0.981, 1.110], [1.038, 1.119] and
[0.990, 1.064] at those three levels. R(m) falls from about 15 at m = 1 to about
1.2 at m = 1024 and never plateaus, so sup_m R(m) = R(1), and R(1) is a property
of the **window** and not of the level: R(1)/ln D ∈ [0.736, 1.170] across
Y = 10⁷, 10⁸, 10⁹ and x from 89 to 16001, a factor 180 in x. Those are
off-diagonal coordinates in the sense of §3c, so that 0.74 to 1.17 is not the same
number as the tile's 0.46 and neither travels to the other's window. Below
m ≈ 2 ln D the
maximum is a single tail event, one sparse patch owning the whole small-m curve.
Above it the argmax migrates and the excess is √m Gaussian fluctuation.

This retires the standing question `U-FRAME.md` §9 used to carry, the repo's
named single hole, one rung with no ladder. §9 now records the hole as closed and
cites this result as what closed it. The ladder exists. It was never the
obstruction.

### 4e. The Origin Excess Lemma, its ceiling, and the reversal at the zone width

> **PROVEN, VERIFIED 14/14** (`maier-matrix.md` §4). Let y < x, let y′ be the
> least prime above y, and let **S ≤ y′²**. Then #(A ∩ [0,S)) = D_y(S) − L, where
> L counts twin slots t of T_y with t < S such that t or t+2 is struck, and a
> y-rough integer m ≤ y′² is struck by a prime in (y, x] only if m is itself a
> prime in (y, x] or m = y′² with y′ ≤ x.
>
> *Non-vacuity, a remark and not a hypothesis:* the conclusion has content only
> when **y′² > x**. An x-rough integer below x is 1, which is not a slot, so
> D_x(S) = 0 for every S ≤ x, and at S = y′² ≤ x the lemma reads 0 = 0. All
> fourteen verification cells satisfy y′² > x.

So L ≤ 2(π(x) − π(y) + 1), a count of primes, against D_y(S) which grows with S.
Measured L is 0, 1 or 2 across all fourteen cells. The m = y′² boundary case is
load-bearing: dropping it fails 4 of the 14 cells.

**The lemma has exactly one hypothesis, S ≤ y′², and it travels with three
companion statements of three different logical types** — the non-vacuity remark
above, the corollary below, and the Scale Collision Proposition. The canonical
enumeration is `maier-matrix.md` §4a and the derivations are `origin-excess.md`
§§6a-6c; do not keep a private count of them here.

**The advantage is capped by an absolute constant, not by (ln x/ln y)²
(MEASURED, `origin-excess.md` §0).** The binding constraint is the corollary's
positivity threshold: the guaranteed lower bound
D_y(y′²) − 2(π(x) − π(y) + 1) is positive only for x below a threshold x*, and
ln x*/ln y ≈ 1.44 at every level computed. So the advertised (ln x/ln y)² is
**capped at about 2.2**, and the largest ratio in the fourteen-cell table is
**1.372**. No choice of (y, x) reaches past 2.2.

**Why the collision is structural rather than an artifact of this lemma.**

> **Survival Quotient Identity (PROVEN, VERIFIED 39/39, `origin-excess.md` §2).**
> With ρ_z(S) := (D_z(S)/S)/δ_z the local-to-global density ratio of level z,
>
>   **origin(S)/mean(S) = ρ_x(S)/ρ_y(S)**  for every y < x and every S ≤ y#.

The origin's excess is not a property of the origin. It is one survival curve read
at two levels, and by the repo's Unification Law ρ_z(S) depends only on
u = ln S/ln z. The Zone Postulate asks for S = x′², that is u_x = 2, which is
where ρ takes its minimum.

**So at the zone's width the origin does not merely lose its advantage, it
reverses (MEASURED, decisive).** Against the full ensemble of all x# translates,
origin/mean = ρ(2), and after stripping the finite-size Hardy-Littlewood factor
that reads 0.79303, 0.79475, 0.79668, 0.79863, 0.79922 at x = 1487 to 6037 against

>   **ρ(2) → e^{2γ}/4 = 0.79305: the origin carries 21% LESS than the mean
>   density at exactly the width the programme needs.**

The trough is at S ≈ 3.5 y′², not a decay to 1, and the band of y for which the
origin still beats the mean at S = x′² shrinks monotonically toward y = x across
nine levels (max ln x/ln y = 1.219 down to 1.137). At S = x′² the class a_q = 0
that the origin occupies is the worst of the q available classes at the smallest
prime q = y′, rank 17 of 17 at y = 13, x = 23.

The rank measurements agree. At y = 13, x = 23 the origin is the largest of 7429
rows at S = 289 and the 5752nd, below the mean, at S = 1000; at S = x′² it ranks
2254 of 7429; and at y = 13, x = 19 it sits below the mean outright. The Origin
Excess Lemma needs S ≤ y′² and the Zone Postulate needs S = x′², so both together
force y ≥ x, at which point the matrix is a tautology. That is the **Scale
Collision Proposition** (PROVEN, `origin-excess.md` §6c): y < x with x prime gives
y′ ≤ x < x′, hence y′² < x′² strictly, which is a fact about the two parameters
and not about this construction, so no better lemma repairs it. **The informative
regime and the origin-distinguished regime are disjoint, and pushing to the zone
width lands on the one point where the origin is worst.**

### 4f. The Maier matrix, classified completely

**PROVEN + VERIFIED across eleven divisors of 13#** (`maier-matrix.md` §6). The
matrix depends on the column modulus q only through d = gcd(q, x#), and returns
exactly one number, the mean of the window count over the x#/d windows at
multiples of d, which is the Level Ledger histogram h_d.

| d = gcd(q, x#) | ensemble | output |
|---|---|---|
| d = 1 | all W translates | the global mean exactly, ρ = 1, zero information |
| d = y#, proper divisor | the W/d windows at multiples of d | ρ_y(S), the coarser tile's local density |
| d = W | one window | the target itself, the tautology 0 = 0 |

The transfer identity at d = y# is Σ_r #(A ∩ [r·y#, r·y# + S)) = D_y(S)·∏_{y<r≤x}(r−2),
PROVEN in three lines of CRT and VERIFIED at 20 of 20 exact integer matches. It
is the Copying Theorem written as a rectangle. The matrix is a first-moment
device, and for an exactly periodic set it never crosses from the residue side of
`THE-LENS.md` §5's triage to the interval side, because the crossing in
Maier's own work is performed by comparison with an independent interval
prediction and the only one on offer for twin slots is Hardy-Littlewood.

### 4g. The discrepancy channel

`discrepancy-two-class.md` builds ΔΦ₂(y, x) = Ψ(y,x) − (D_x/x#)·y, the two-class
analogue of Holt's one-class signed discrepancy, which does not exist in the
literature. Two exact recursions and their proven ceilings:

| | sup, geometric mean per fold | sd per fold | √R_k limit | proven ceiling |
|---|---|---|---|---|
| one class | ×1.5592 | ×1.3656 | 1.4142 | ×2 |
| two class | ×1.8356 | ×1.6612 | 1.7321 | ×3 |

The ×2 and ×3 ceilings are the Möbius term counts, and 3^{π(x)} is exactly the
Level Ledger's majorant. **The Level Ledger bound has the right base and twice
the right exponent**, and its ratio to the measured two-class sup runs 25.7, 36.0,
54.4, 124, 186, 256, 479, 801 across x = 5 to 29, growing by about √3 per fold,
which is the square-root gap and nothing else. That is the same shape of gap the
repo carries in the sifting exponent (4.2665 against 2), now visible in a second
and much simpler place where the doubling has an exact cause: an L^∞ bound
derived from an L¹ term count against an L² truth.

Two controls ran before any of that was claimed. A Bernoulli set at matched
density gives sup two orders of magnitude larger, so the pipeline reports Poisson-scale fluctuation when it is there. Random two-class patterns put the twin
pattern at the 71st and 79th percentile of the control spread, which **refutes**
any twin-specific discrepancy law: the growth law is a function of the count k of
removed classes only, and the twin arithmetic sets the twist luck rather than the
law. (An earlier 8-draw run put the twin set above the whole control range and
was small-sample noise.)

---

## 5. The routes, and which of them are closed

`ZONE-POSTULATE.md` §6 lists four. Status of each.

**Route A, bound G2 below the window.** Live, and the only one with a proven
statement in it. 4.2665 proven, 2 needed. The visible road is Brüdern-Fouvry
vector-sieve decoupling, missing the signed cancellation of the bilinear interval
sawtooth remainder uniform in position (Lemma V).
**Status change 2026-08-18: Lemma V's MEAN-SQUARE form is now proved** and the
break-even against β₂ is **1.2090, not the 1.2417 recorded elsewhere**. What is
still missing is not the factor everyone expected — Brüdern-Fouvry's
`e(−hN/(d₁d₂))` is unimodular and Parseval kills it free — but the **quantifier**:
almost-all against worst-position. `sift-limit-attack.md` §7e, and the quantifier
question there is `u_sup`, which is closed. Full decoupling would give
1 + √e ≈ 2.649, which removes 71.4% of the open band without finishing. Note that at the
measured θ = 2.159 to 2.482 the certificate already sits above full decoupling
(θ_total = 6/θ = 2.4 to 2.8), so the all-positions requirement is not a cheaper
door into the same band: §7.

Route A now carries **two independent difficulty floors**, and anyone pricing it
must price both.

1. **TPC-hardness.** The uniform statement proves the strong form of the Zone
   Postulate, which implies TPC. This has been on the record since Ziller and
   Morack 2017.
2. **The Jacobsthal shadow (PROVEN as an implication).**
   G2 ≥ g pointwise runs backward as well as forward, so G2(x#) < x′² − 2
   **implies** g(x#) < x′² − 2, an explicit constant-1 form of the Jacobsthal
   bound at primorials. Iwaniec 1978 gives g(x#) ≪ x² with an inexplicit constant
   The little-o target in Erdős problem #687 is different: the displayed
   constant bound alone does not imply it. A fixed subquadratic power bound
   would imply it.
   (`two-class-lower-bounds.md` §9.)

   **CLOSED by inspection of the sources, and the floor stands.** The question was
   whether an explicit elementary bound already delivers g(x#) < x′² **at the
   needed constant**, since the constant is the whole question and an inexplicit
   one decides nothing. The answer is no, and the three papers usually named do not
   even reach the exponent: Kanold gives 2^{√k}, Stevens k^{Θ(log k)} and Paseman
   (arXiv:1311.5944) k^{O(log log k)}, all far weaker than exponent 2. The only
   exponent-2 statements are Vaughan 1977 for general n and Iwaniec 1971 Theorem 2
   / 1978 at primorials, `g ≪ (k log k)²`, both with inexplicit constants. So no
   explicit-constant route to g(x#) < x′² exists in this literature, and the floor
   does not collapse (`TODO.md` 000b).

For calibration on the shadow: g(x#)/x² falls from 0.240 at x = 5 to 0.0115 at
x = 311 across all 64 published terms of A048670 (b-file, checked 2026-08-20) —
a steady trend, not a term-by-term monotone fall: 21 of the 63 steps tick up —
and the greedy one-class ladder continues the fall to 0.00123 at x = 4001.
Comfortable in the data, and unproven.

**Route B, bound the first slot at the origin.** Closed in its fold half and
closed in its Maier half. The first-slot recursion is
exact and worth nothing, because its only nontrivial clause is where the slot
moves when F(old) = p, which is the next twin prime. The Origin Excess Lemma is a
real unconditional origin-specific advantage, it is capped at about 2.2, and at
the zone's width it reverses to a 21% deficit (§4e). In the one regime where the
origin is distinguished, the identity's
input equals its output: below y′² every twin slot is a genuine twin prime, so
the input is the twin prime count and the output is the twin prime count minus a
handful of primes.

**Route C, counting with a certificate.** Blocked by the parity floor 2 for a
two-class sieve, and by cost, since the certified head is a vanishing fraction of
the zone.

**Route D, covering.** Settled in our favour asymptotically (Hough 2015,
Balister-Bollobás-Morris-Sahasrabudhe-Tiba 2022). Quantified against the
constructions, and the verdict is **SAFE**: see §5a.

### 5a. The adversary's side, quantified

How large G2 can be *made* to get was first asked in this repo by
`research/attack2-rankin2d.js`, under the name PAIRED, as §5c of this file
records. (This section used to open "Nobody in this repo had ever asked" — an
absence claim contradicted by this same file 160 lines below it.) G2 **is**
an adversarial covering problem: **PROVEN (elementary, CRT)**, G2(x#) − 1 equals
the maximum length of an interval [1,m] coverable by choosing, for each prime
p ≤ x, the residue pair {a_p, a_p − 2} mod p (`two-class-lower-bounds.md` §1).

The best construction we can build is a greedy that emits an explicit (a_p) and
is replayed from scratch by a separate routine, with zero uncovered at all sixteen
levels.

**⚠ THE Y2 LADDER BELOW IS UNDER-SEARCHED, for two independent reasons found
2026-08-18. Read the levels as weak lower bounds, not as the greedy's reach.**
(i) `two-class-lower-bounds.js`'s `maxM` binary-searches on `fn(m).ok` as though
feasibility were monotone in m. For a GREEDY it is not: a larger target changes
the choices, so the bisection returns the unbroken feasible prefix rather than
the maximum. Confirmed here by reading the three lines. At x = 31 the published
233 is exactly that prefix while the same greedy covers 305.
(ii) Deterministic tie-breaking costs the remainder. With randomised restarts
the unrestricted greedy attains **527 at x = 37 — the exact optimum, since the
covering optimum is G2 − 1 = 527** — against the 355 tabulated below, and
attains the exact optimum at 13, 17, 19, 23, 29 and 0.997 of it at 31. Those are
the block attack's replay-verified figures, not reproduced independently here.
**So the sentence this file used to carry, that the best construction reaches
0.672 of the truth, should read 1.000.** The construction was never the weak
part; the search around it was.
What survives unchanged: Y2/x² still falls, and the falling is not an artifact
of the under-search. What does NOT survive is the LEVEL of the curve and any
phrase resting on it. Selected rows, as tabulated and now known low:

**Recomputed 2026-08-18 with the search repaired.** Certified = the larger of
the two machine-verified certificates, since both replay clean; at x = 1699,
2003 and 4001 the 2026-08-17 run stands and the repaired one lands slightly
below it at its call cap. The ladder now extends one rung further.

| x | Y2 (certified) | Y2/x² | Y2/(x ln²x) | was |
|---|---|---|---|---|
| 37 | **527** | 0.38495 | 1.0924 | 355 |
| 229 | **7,372** | 0.14058 | 1.0903 | 6,748 |
| 1009 | **57,245** | 0.05623 | 1.1859 | 56,213 |
| 4001 | 356,711 | 0.02228 | 1.2960 | — (2026-08-17 stands) |
| 5003 | **479,339** | 0.01915 | 1.3206 | — (new rung) |

**Y2/x² falls by a factor of 20.1 across this range, monotonically, while
Y2/(x ln²x) rises by only 1.21 and is close to flat throughout.** Both readings
moved when the search was repaired, and both moved in the direction that
sharpens them: the fall is steeper than the 11.6 recorded, and the x·ln²x
normalisation is far flatter than the 1.76. The construction is x·polylog. At
x = 5003 the best construction reaches 1.9% of the zone, against 38% at x = 37.

**And the construction is EXACT at every level up to 41, but no longer at every
level known.** The repaired search hits `G2(x#) − 1` at thirteen exactly-known
levels — 1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545 — so at x ≤ 41
it is not a lower bound but the value. Its 545 at x = 41 independently confirms
G2(41#) = 546, which was computed the same day by direct enumeration over a
disjoint method.

**At x = 43 it reaches 617 — the optimum — exactly (2026-08-19,
`history/staging/greedy-oracle-validation.md`: the 611 read on 2026-08-18 was
budget, not rule; at the uniform R = 2048 budget the sealed-scope score is 14
of 14 exact).** The first genuine shortfalls start at x ≈ 53 (47's 3-slot gap and 43's were budget, not structure; `greedy-oracle-validation.md`). That does
**not** show the rule failing: `two-class-lower-bounds.md` §5b,
from section 1c-3 of `two-class-lower-bounds.js`'s output, measures the *budget*
to hold the ratio at 1.000 degrading by 3.31× per added prime, so a miss at the
newest and largest level is what the budget model predicts, and this run used
the schedule tuned for the levels below. Budget and structure are not separated
by it. Re-running 43# alone at a much larger budget is the test that would
separate them.

This weakens nothing below. Every number the search prints is a **lower bound**
on the optimum, so 611 ≤ 617 is consistent and the thirteen exact levels stay
exact. What it removes is the stronger reading this section used to license —
that the construction attains the optimum wherever the optimum is known.

> **VERDICT: SAFE against the construction side.** The gap between the best
> available lower bound and the threshold is x^{1−o(1)} and widening. To threaten
> the Zone Postulate a two-class construction would have to beat the one-class
> construction by a **power** of x, and every route checked says the second class
> is worth exactly one logarithm.

**The adversarial minimum at the origin, exact (2026-08-20).** The same
free-class adversary, turned against the anchored Natal@5 comb: minimising
survivors over ALL scour-class choices gives **advmin@11 = 16, exact, with two
disjoint proof stacks** — the producer's branch-and-bound with proven pruning
plus a replay-verified witness, and the structural red team's independent
union-only branch-and-bound, completed over the full 10-prime space with zero
leaves below 16 (`history/staging/attack-advmin-1113.md`;
`history/staging/redteam-0820-structural.md` §2a). The staircase's certified
anchored floor at @11 is 34 (`paper/staircase-note.md` Thm 8), so the floor
sits **18 ABOVE the class-blind ceiling**, and the corrected quantifier
(red-team wording): *any bound whose certified floor is a single number valid
simultaneously for every choice of scour classes (a class-uniform conclusion)
is instantiated by the adversarial witness, so its ceiling is
advmin@11 = 16 < 34: class-uniform caps cannot re-certify the staircase floor,
let alone close 34 → 45. A cap whose conclusion depends on the chosen classes
is not touched — but reading the classes is exactly what "anchored-aware"
means, so only anchored-aware caps remain.* At @13 the certified bracket is
[21, 152] against floor 110 and truth 307: at least 155 of the 197
floor-to-truth points are anchored-only. Class-uniform-conclusion joint caps
are DEAD as a route (`OUTCOMES.md`); the live successor is TODO's
anchored-arguments attack.

**The anchored-point floor family, and the classic ladder's plateau
(2026-08-20 night).** The composition the advmin verdict demanded exists, and
it is one move: the **unified-cap lemma** (PROVEN, red-team re-derived —
`history/staging/attack-anchored-01.md`;
`history/staging/redteam-0820-night-proofs.md` §1) extends the staircase's
cofactor injection to m = 1, so the self-strike allowance s(q) disappears
into a per-prime cap family with `fresh ≤ capU_K ≤ cap_K` at every depth and
every prime, @11 and @13. Its floors are **ANCHORED-POINT floors per Theorem
8's own quantifier** — separated from, not contradicted by, the 16-witness,
which does not instantiate them: 36 @11 and 115 @13 at K = 0 (above the
staircase's 34/110), exact truth 45/307 reached first at K = 8/28, and every
@11 floor exceeds advmin's 16 — a floor family class-uniform caps provably
cannot reach. The classic ladder (s(q) kept as an allowance) provably
plateaus at 41 @11 and 296 @13 at every depth — pool saturation plus
exhaustion — and the shortfall is the named blocking structure with
digit-exact accounting: **wheel-excluded self slots** plus **twin-collision
shadows**, 6 − 2 = 4 = 45 − 41 @11 and 17 − 6 = 11 = 307 − 296 @13. The
**forcing ladder** — the exact adversarial minimum with the first j scour
primes anchored — runs 16→20→20→22→23→25→30→35→38→42→45 (j = 0..10), fully
reproduced by an independent branch-and-bound; anchoring q = 13 alone costs
the adversary +4, and every single anchored prime costs at least +1. Mirror
symmetrization gains exactly 0 at the anchored cap and is REFUTED as an
improvement channel (`OUTCOMES.md`): the covariance σ(K_q(a)) = K_q(w−a) is a
one-line theorem, so the zero gain is structural, not empirical.

### 5b. What is closed

The closed routes are indexed in [OUTCOMES.md](OUTCOMES.md) — one line per
route, verdict, mechanism, and the record file that carries the full
argument. That index is the authority; this section exists so citations of
"§5b" keep resolving.

## 6. The exponent, and the one gap left in reading it

### 6.1 The trusted ladders read 1.50 and the certificate ladder reads 1.2

Both readings are of **one object**, not two. By the CRT identity of
`two-class-lower-bounds.md` §1, G2(x#) − 1 is exactly the longest interval
coverable by choosing a residue pair per prime, so the certified greedy ladder is
a proxy for the same exponent that the exact terms measure, not a different
quantity. What differs is the proxy and the range.

| reading | object | range | control-corrected |
|---|---|---|---|
| exact terms, h2 | free two-class ceiling | x ≤ 73, 19 terms | **1.57 ± 0.06** stat |
| trusted terms, G2 | the object itself | x ≤ 79, 22 terms (A144311) | **1.50 ± 0.05** stat |
| certified greedy ladder | a lower certificate for G2 | x ≤ 4001, 16 levels | **1.11 to 1.25**, falling with range |

Two measured effects account for about a third of the difference and they point
opposite ways. A certified lower-bound ladder biases the exponent **down** by
about 0.09 at a 28% terminal shortfall, priced on the one-class control
(`h2-scoping.md` §5b). The trusted ladders are still short, and the control's own
reading rises with prefix length, 1.245 at 22 terms to 1.282 at 56, so the short
ladders carry up to +0.04 of the other sign. Adding the first back gives about
1.29 from the certificates against 1.50 from the trusted G2 terms.

> **Quote 1.57 for h2, 1.50 for G2, and note that the long certificate ladder
> reads 1.2 with about a third of the gap priced as the greedy's own downward
> bias.** The residual 0.2 is unexplained and is not worth chasing: every
> reading, corrected or raw, sits below 2 and above 1, and the gap that matters is
> 4.2665 against 2.

The headline does not rest on the eight trusted terms this repository has not
reproduced. Refitting by provenance block with the same estimator and the same
matched-width control gives 1.533 on custody terms alone, 1.525 on custody plus
Alekseyev, 1.465 on the eight external terms alone and 1.500 dropping the
x = 61 term (Ĝ(64) = 1080 in item D's coordinate), against 1.498 on all 22
(MEASURED, `history/staging/measure-g2-provenance-0829.md` §3). The same index
sets run on the one-class control spread 0.932 to 1.233, so the split is a null
against a floor set by the estimator's own range sensitivity, not a
demonstration of independence.

### 6.2 The law's two constants were a coordinate error, and it is settled

`c` in max ≈ c·m·(θ(x) − ln m) is a surface c(x, lnD), not a constant, and the two
values quoted in the repo were the same formula read on two different curves
through it (§3c, `maxgap-law.md` §4). On matched statistics the two spreads are
identical at ±22.5%; there was never a tightness disagreement, only a range
compared against a coefficient of variation.

**Quote the Poisson form with its (θ(x) − ln m) factor and the coordinates
(x, lnD, lnD/θ(x)), never a bare constant.** On the diagonal, where the window is
the whole period, c₂′ = 0.4983 over all 20 exact diagonal terms to x = 79
(cv 7.4%, trend (ln x)^{+0.227}). **The bare-constant reading that used to sit
here, G2 ≈ 1.2 x ln²x, is superseded as of 2026-08-18**, and the strength of that
supersession was itself corrected on 2026-08-19. Quotable:
**G2(x#) = x ln^{2+o(1)}x with the o(1) positive**, best single description
**≈ 0.76 x ln²x lnln x** over x = 11..79, two significant figures on the constant
and not three. **The claim that two INDEPENDENT instruments agreed is REFUTED**:
the exact frame cancels out of every reported offset, so the diagonal is the same
comparison in a sharper error bar rather than a second witness, and it returns
attack E's own fitted parameter. The AICc figures 31.8 and 10.6 must not be
quoted as exclusions either — the one-class control, whose conjectured truth IS
x ln²x, is thrown out by 32.8, and the power law's margin falls to 3.3 on
deleting x = 11 while the whole ranking reverses at x = 5..79. What survives is
the frame-free ranking, a factor of eight, and the x-exponent tending to 1 at
every window tested. Nor is any of it an asymptotic: the FGKMT ledger overtakes
such a reading, and attack E's §7 shows x ln²x lnln x and x ln³x are not
separable in principle here (`two-class-lower-bounds.md` §6,
`history/staging/redteam-2026-08-18.md` §§1–2).

## 7. The theta ladder: it does not turn over

On `ZONE-POSTULATE.md` §5's question, whether the all-positions exponent θ turns
over below 2: θ is the window exponent z^θ at which the vector-sieve certificate
is positive at every position, and the Gap Reformulation needs θ < 2.

**The unconditional column, measured self-consistently, sits below 2 at every
exactly-measured level.** The instrument that reported a crossing took its
window from no caller (`theta-ladder-sup.js` fixed `u = 3.2`), so its suprema
were measured at windows 61×–123× too long. Self-consistent exhaustive
full-period walks give need/z² = 0.3550, 0.4360, 0.5485, 0.4877, 0.4637,
0.6119 at z = 13..31 — all exact, all inside the budget, worst margin 39% —
and the certificate is positive at every one of the 223,092,870 positions at
H = 0.46 z². The crossing is real and sits in (31, 47]: at z = 47 a prefix
walk finds min T = 0 at H = 1.041 z², and a prefix minimum upper-bounds the
period minimum (`history/staging/theta-selfconsistent.md`). The old ladder's
prefix rows are lower bounds on an overstated quantity and bound nothing
(`theta-ladder.md` §5b). **What retires the route is the maximal law's price, not a crossing: the
sharp Gaussian maximal law is TPC-implying**
(`history/staging/phase1-T4-maximal-law.md`).

**The conditional column is where the route loses ground.** need/z² runs 1.596, 1.773,
1.707, 2.379, 3.477, 4.188, 5.130, 6.396 at z = 19 to 47, and θ rises
monotonically from z = 29 to 2.482.

**Where the growth lives.** Decomposing need = 2√(2 lnW)·√⟨ρ²⟩/M, two of the
three factors are tame; the whole problem is ⟨ρ²⟩, which tracks the divisor-pair
count N growing like z^{4.6} with a cancellation factor flat near 75 to 125 rather
than improving, against a budget that allows z³.

**What is not established.** "θ settles" is not observed. The fitted growth
exponent of c(z) is not stationary, running 0.94 ± 0.38 on the first four points
and 3.07 ± 0.28 on the last four, so the four fits that reject θ → 2 at 95% reject
a model rather than a limit. Extending the ladder cannot repair that: z = 71 costs
36 hours and moves ln z only from 3.85 to 4.26. **θ is above 2 over the whole
measured range, it is rising, and it has no visible asymptote.**

---

## 8. What is genuinely ours

Two prior-art audits ran over this material, the 2026-08-13 three-sweep audit and
the 2026-08-17 Holt corpus sweep plus reference sweep (`research/PRIOR-ART.md`).
Stated conservatively, and with the owners named first.

**Not ours.** Holt owns the cycle of gaps, the fold recursion, the fusion
mechanism (Holt and Rudd 2014, Lemma 3.1 of arXiv:1408.6002), the closure theorem,
the transfer operator, the population models, the interval of survival, and the
one-class discrepancy front ΔΦ. Maier owns the matrix, and Granville and
Soundararajan own the layout we used. Buchstab owns the survival curve, computed
by Cheer and Goldston and used by Maier. Ziller and Morack own h2, A288815, and
the reduction "h2(n) < p_n² − p_n for n ≥ 3 implies Goldbach and the twin prime
conjecture". Schemmel owns the census ∏(q−2). Rankin, Erdős, Pintz and
Ford-Green-Konyagin-Maynard-Tao own the one-class lower bounds. Iwaniec owns
g(q) ≪ ln²q. Diamond, Halberstam and Richert own the dimension-2 sieve, with the
exact β₂ due to Booker and Browning. The CRT collapse that makes G2 an
adversarial covering problem was already in this repo under the name PAIRED
(`research/attack2-rankin2d.js`).

**Ours, at the calibration marked.** The table discipline, because `README.md`
sends readers here on the promise of a calibration marker on every line: **one
object per row, one calibration per cell.** A row whose subject contains "and" is
a defect, and a calibration cell containing "+" or "given" names a second object
that needs its own row.

| item | calibration | note |
|---|---|---|
| G2 as a studied object | **NOT OURS — OEIS A144311, Andrew Carter, September 2008** | the object is published and has been for eighteen years, under the `G2 − 1` convention: "the longest sequence of consecutive integers, each equal to 1 or −1 modulo at least one of the first n primes". Their m = our r+1; same fixed classes {0,−2}. Five of our waves searched `G2` and never `G2 − 1` |
| the four exact terms computed here | VERIFIED | 31#, 37#, 41#, 43#. **A144311 already carries 22 terms**, so 41# and 43# were recomputations, not new values — they agree, which is a check on both. Terms 15–22 extend the ladder to x = 79 and are ours to verify, not to claim |
| G2(x#) ≪_ε x^{4.2665+ε} | PROVEN | the first upper bound at any exponent for the two-class problem. **Re-tested 2026-08-18 in the owning vocabulary** (A144311's, not ours) and it survives: no published upper bound at any exponent, and the one bound-shaped heuristic (Paseman, MO 88323) is asymptotically WEAKER — his exponent is unbounded, ours fixed. **But the TECHNIQUE is not ours**: MO 37679 answer 52890 (zeb, 2011) already reads `j(x#) ≪ x^{4.032}` off a sieve's error exponent at dimension ONE. **Claim the dimension-2 instantiation, not the method**, and never table 4.032 beside 4.2665 — the closeness is coincidence |
| the mean-square Lemma V, `⟨R²⟩_H ≤ B(z,s)·H` for every H, z, s | **PROVEN, 2026-08-18** | five identities and two triangle inequalities; `B(z,3.0)` flat at 1.3833–1.4883 over z = 13..37. Its L4 also proves (V1) and (V2) with the equality case, which `sift-limit-lemmaV.js` only asserted. **Prior art NOT checked — do not claim novelty until it is** |
| `u_sup`, an unconditional worst-position remainder bound with no maximal law | **MEASURED, and CLOSED as a route** | rises at all eight steps over z = 13..43 to 3.2026; constant model's RSS 49× the best fit's; the bounded family's best asymptote is 5.46, **above** β₂. Real as a bound, useless as a road. The Fourier gain over the divisor-pair bound is 23–44× and **falling**, not a flat 80× |
| G2(x#) ≥ g(x#) pointwise, and with it the first lower bound of any kind for a two-class Jacobsthal function | PROVEN, trivial | absent from the literature and from both OEIS entries (A288815, A072753) |
| the "difference 2 only, infinitely often only" weakening of Ziller and Morack's reduction | PROVEN, logically lightweight | strictly weaker hypothesis than theirs, and not found elsewhere |
| the two-class Rankin accounting, giving log x and not a power | INFERRED | Maier-Pomerance's own ledger run in dimension 2 for the first time. **"Their ledger" is load-bearing:** Kalmynin-Konyagin run a dimension-2 Mertens ledger of their own (arXiv:2302.00459), so the unqualified form of this claim is false |
| the two-class driving-term lemma | PROVEN | cleaner than Holt's one-class version because Fact A rules out the second kill |
| the driving-term route to a bound on G2 | **REFUTED** | it certifies gaps of size O(x) and cannot reach x² (`two-class-lower-bounds.md` §7) |
| the certified G2 lower-bound ladder to x = 4001, sixteen levels, independently replayed | CERTIFIED | extends the two-class data 55-fold beyond Ziller and Morack's 21 exact terms |
| the measurement of c in max ≈ c·m·ln(W/m), and the finding that it is a **diagonal** constant on a surface c(x, lnD) | MEASURED | the law itself is Ford's random-dart prediction. Ours is the measurement across 46 exact one-class and 17 exact two-class terms, the block statistic that separates the two coordinates, and the identification of c as the reciprocal of the gap tail's rate at the extreme |
| the Overshoot Budget | PROVEN as an implication, its input MEASURED | a lifetime slack measured at 0.88 to 1.19 nats caps every accumulating-index chain, and it survives any decomposition |
| the no-fixed-point argument, four-hypothesis form | PROVEN | closes accumulating-index chains and A4's tile analogue; it does **not** reach a recursion that re-bases at every fold (§4c) |
| the Survival Quotient Identity origin/mean = ρ_x(S)/ρ_y(S) | PROVEN, VERIFIED 39/39 | one line of rewriting, and it turns the origin's excess into a statement about one survival curve read at two levels |
| the exact unconditional θ suprema over complete periods to z = 31, with prefix bounds to z = 71 | VERIFIED | removes the Gaussian maximal law from the sighting entirely, which no amount of laddering the conditional column could do |
| route A's shadow implication into the explicit one-class Jacobsthal bound | PROVEN as an implication | §5 route A; the explicit-constant question under it is closed and the floor stands |
| Facts A and B in their two-class form | PROVEN | mechanism is Holt and Rudd's; the two-class form is not in their corpus. Fact B is loose by 3.5× to 6.7× at a single fold |
| the two-class Localized Merge Lemma | PROVEN | the localized-window application is on Holt's own open-problem list — **arXiv:2603.25915 §4.1–4.2 (2026, Holt alone)**, where he defines `g_max(I,p)` and asks its trend, NOT 1408.6002, whose §1.1 list has six items and none localized (PDF read 2026-08-18) |
| the Deficit Lemma and the Traverse Bound | PROVEN | one-line averaging, and it kills the chain unconditionally |
| the growth law maxsum_m = m·m̄ + σ√(2m ln D) | MEASURED, unfitted | retires U-FRAME §9's named single hole |
| the Origin Excess Lemma | PROVEN, VERIFIED 14/14 | one hypothesis, S ≤ y′², non-vacuous when y′² > x; enumerated by logical type at `maier-matrix.md` §4a |
| the Origin Excess Corollary's ceiling at about 2.2 | PROVEN, on one MEASURED input | the input is the flatness of ln x\*/ln y ≈ 1.44 over nine levels; measured maximum 1.372 over fourteen cells |
| the reversal to ρ(2) = 0.79305 at the zone width | MEASURED, decisive | the origin carries 21% less than the mean density at exactly the width the programme needs |
| the complete classification of the Maier matrix on a periodic set by d = gcd(q, x#) | PROVEN, VERIFIED | sharper than "it does not work" |
| the two-class discrepancy ΔΦ₂, with its ×3 ceiling and the identity R_k(p) → k+1 | PROVEN | the two-class object was not found in the convention that owns its one-class neighbour, Holt's `ΔΦ(x,p)` at arXiv:2308.07570, and `SEARCH-CONVENTIONS.md` §1 carries no row for the two-class form, so read that as our reach; the ceiling is the Möbius term count |
| the per-fold sup and sd growth of ΔΦ₂ | MEASURED | ×1.8356 and ×1.6612 two-class, against the √R_k limit 1.7321 (§4g) |
| the control-estimator method as house practice | method | quote the 58-term control line beside any ladder exponent |
| the Inertness Lemma and the u-frame presentation | PROVEN | `U-FRAME.md` §2, §3 |
| the complementary-window duality `maxsum_m + minsum_{D−m} = W` | **NOT OURS** | the complement identity of the circular scan statistic: Cressie, *J. Appl. Probab.* 14 (1977); Naus; Wallenstein–Naus; Glaz–Naus–Wallenstein 2001 chs. 8–10, 17. Verified here EXACT at all 1484 `m` on T₁₃, which is a reproduction. No live sentence may present it as new (`IMPORT-MAP.md` row 1) |
| the wheel as the extremal object of a closed-form Diophantine problem | **NOT OURS — the Lonely Rabbit problem** | Rab(n) = 1/w(n), conjectured Cusick (Acta Arith. 22 (1972) 1–9), PROVED Schark (Monatsh. Math. 78 (1974) 131–146), asymptotic Rab(n) ~ e^{−2γ}/(n log log n). The extremal modulus is a primorial wheel and the constant is Mertens, so the wheel-is-extremal intuition has a PUBLISHED-ANCHOR — and it is an anchor, not a bound on G2 (`PRIOR-ART.md`, `history/staging/row12-recon.md` §5) |
| the exhaustive maximality certificate for G2(37#) = 528 | **CERTIFIED, ours** | `maxsum₁` over all 217,929,355,875 gaps of T₃₇, from an engine sharing no code with either exact-ladder producer. A144311 owns the TERM; what is ours is the independent proof that 528 is maximal over the whole tile rather than a value that matched (`history/staging/scanstat-t37.md`) |
| the two-class substitution into Kalmynin–Konyagin, giving G2(P(y)) ≫ y(ln y)³(lnlnln y)²/(lnln y)⁴ | **DERIVED HERE, checked twice, NOT REFEREED** | K–K own the §2 trichotomy and the machine; ours is the re-derivation at Ω_p = {a_p, a_p−2}, where Case 2 is empty and the third class has size exactly 2. Two logs above the free FGKMT bound. The referee gap is named: Halberstam–Richert Thm 2.2 and the Selberg remainder's ξ-versus-z condition at κ = 4 (`two-class-lower-bounds.md` §4c) |
| the Zone Postulate weak-form equivalence, stated as a biconditional | PROVEN, lightweight | not found as a biconditional, searched under twin-Legendre; `SEARCH-CONVENTIONS.md` §1 carries no owning convention for the biconditional form, so that negative is in our framing. The framing is a device rather than a result |

The honest summary of the ownership question: the mechanisms are almost all
borrowed and correctly attributed, and what is ours is the specific object G2, its
data, the two-sided bounds on it, and four small lemmas that each close a door.

---

## 9. Open questions, ranked

Ranked by what each would buy, not by how hard it is. An item that closes keeps
its slot and is marked CLOSED, so a reader who remembers the ranking finds the
answer where the question was. This list is the state side of the programme and
`TODO.md` is the plan side; they overlap, and neither is a subset of the other.

**1. Any unconditional two-class exponent below 4.2665.**
Buys the only thing that matters. The band (2, 4.2665] is a proof gap rather than
a truth gap. `research/sift-limit-attack.md` §2 finds nothing published that blocks it and no κ = 2 extremal example known (Halberstam 2003 p. 117); the published lower bounds on β₂ (Selberg's reciprocal convention, Brady 2017: 1.8196; β(2) ≥ 2 from the one-sided dimension axiom, 2026-09-04) sit at or below the band's lower endpoint, searched as tabled in `SEARCH-CONVENTIONS.md` §1 and §3.
β₂ itself is unimproved since Diamond-Halberstam 2008, with every post-2008 source worse at κ = 2 (`SEARCH-CONVENTIONS.md` §4); nobody has shown it cannot move for this problem either. The visible
road is full Brüdern-Fouvry decoupling at 1 + √e ≈ 2.649, which removes about 71% of the open band
without finishing. Cost: unknown, and the whole programme.

**2. Whether an explicit elementary bound already gives g(x#) < x′² — CLOSED, and
the answer is no.**
The item would have retired route A's second difficulty floor if any explicit
elementary bound delivered the constant-1 form at primorials. None does. Kanold
(2^{√k}), Stevens (k^{Θ(log k)}) and Paseman (arXiv:1311.5944, k^{O(log log k)})
are all far weaker than exponent 2; the only exponent-2 statements are Vaughan
1977 for general n and Iwaniec 1971 Theorem 2 / 1978 at primorials, both with
inexplicit constants, and the constant is what the question turns on. The floor
stands and route A's price is unchanged (§5 route A, `TODO.md` 000b).

**3. Close the residual 0.2 between the trusted and certificate exponents (§6.1).**
1.50 on trusted G2 terms against about 1.29 on certificates once the greedy's own
downward bias is added back. Buys a number the repo can quote without a footnote,
and settles whether the greedy's shortfall really is constant-factor: the
free-choice greedy is flat at 0.73 against the ILP optima over 19 terms while the
branch-and-bound lower ladder's shortfall grows 0% to 28% over n = 9 to 21, and
those two readings are not obviously compatible. Cost: extending the greedy
against the exact ILP optima, which already exists as a routine.

**4. Prove that window/G2 is unbounded.**
`ZONE-POSTULATE.md` §8 item 3 (folded there from item 4 on 2026-08-29). Strictly weaker than route A and still TPC-implying:
unbounded means G₂(x#) < x′² − 2 at infinitely many x, which is weak ZP
(labelled 2026-08-29, `history/staging/object-g2-read-0829.md` §5). It would show the
Gap Reformulation is not asymptotically self-defeating. Today's evidence for it is
one-directional and was flagged as such: the certificate is a lower bound on G2,
so x²/certificate is an *upper* bound on x²/G2, and its growth (3.8, 7.8, 18.1,
44.9 at x = 37, 229, 1009, 4001) does not by itself prove x²/G2 grows.

**5. Find a mechanism that spends the infinitely-often slack.**
An argument allowed to fail on a sparse set of x is strictly weaker than any gap
bound and still sufficient, because the weak form is equivalent to TPC. The slack
is free and there is no known mechanism: both candidates have been checked and
both fail (§1c, `THE-DIALS.md` dial 4). This item is the search for a third.

**6. Compute G2(41#), the thirteenth term — CLOSED 2026-08-18, and the Poisson
law survived its own test.**
G2(41#) = 546 and G2(43#) = 618 are exact (§2), each computed twice on disjoint
natal masks, and **both landed inside their pre-registered Poisson windows** —
546 against the 476–633 band below, central 513. A144311 already carried both
terms, so they are recomputations that agree rather than new values, which is a
check on both sides. The cost estimate below missed by two orders of magnitude
in the cheap direction: the run took 2m31s against the six hours priced here,
which is the cost-estimates-err-cheap rule's best exhibit. The band's own
discriminator resolved toward the outlier reading rather than the level shift.
Everything from here to the end of the item is the pre-computation pricing, kept
because §9's rule is that a closed item keeps its slot.

Worth less than it looks for the exponent: measured on 48 control cases, adding an
eleventh term to a ten-term fit moves the exponent by 0.022 on average and 0.078
at worst, against a bias of +0.262. Its real value is as a falsifiable test of the
Poisson law, which predicts **476 to 633, central 513**, below both the
free-choice ceiling of 894 and the older multiplier extrapolation of about 740.
The band splits the test: about **488** if x = 37's c₂′ = 0.594 is an outlier and
about **633** if it is a genuine level shift, and one term discriminates them. The
ledger drift over the single step 37 → 41 is 4%, so the surface structure of §3c
does not blunt it. **Cost: about 6 hours by the streaming leg**, which is the
instrument to price against, because it scales in slots rather than in positions.
T₃₇ holds D = ∏_{3≤p≤37}(p−2) = 217,929,355,875 slots against T₃₁'s
6,226,553,025, a factor of exactly 35, so the measured 519 s that recovered
G₂(37#) from T₃₁ (`U-FRAME.md`, streaming-leg custody) scales to 5.05 h, and 5.6 h
carrying the 41/37 deletion-state factor. The 37-hour figure also in circulation
is the lattice walk over positions, which is linear in tile width. The residual
risk is memory rather than time at 2.2·10¹¹ slots, and the segmented engine walks
a full period in O(1) memory. At six hours this is a same-day falsifiable test of
the Poisson law rather than an overnight commitment.

**7. Whether sup/sd stays bounded in the discrepancy channel.**
Nothing proven there beyond the ×2 and ×3 ceilings, and the right-base
doubled-exponent gap has an exact cause. It is the same shape as the sifting gap
in a place simple enough to attack. `discrepancy-two-class.md` §10.

**8. M(x, x^k) for fixed k ≥ 3 under the single-alignment recursion — MEASURED
2026-08-17, and the route to a growth law through it is CLOSED.**
The head sits in copy 0, which receives only the alignment a = 0, so its recursion
is single-alignment rather than a maximum over p alignments. Measured to
x = 1613 (Y = 4.2e9, 253 folds, `research/localized-single-alignment.md`): the
multiplier IS different in shape — exactly 1 at 94% of folds, total spend 107%
of the 3 ln ln budget against the tile shape's two-orders overshoot, and the
kill census is countable at 0.81 p²/ln²p dead flat — but 55% of the growth and
the birth of every deep record sit in the boundary term the window's own
growth creates, which is not a fold statement; it is the localized gap problem
re-posed at the new scale. The recursion reduces M to itself plus a countable
correction. Standing caveat unchanged: at k = 2 the head is crystallised and
TPC-hard by construction.

**9. The compute observation, which outlives the lemmas it came from.**
Every localized object needs a segmented sieve of [0, x^k) by primes up to x and
never needs the tile of width x#. Any question in this repo phrased about a
bounded window rather than about the whole tile can be asked three decades further
out than it currently is (`LOCALIZED-GAP.md` §10). The same observation on the
other side: `maxgap-law.md`'s segmented engine walks the exact period
29# = 6,469,693,230 in O(1) memory, so whole-tile statistics are reachable two
levels past where the repo was building tiles.

---

## 10. Sources and reproduction

All of them read in full for this note.

| file | what it holds |
|---|---|
| `research/exponent-control.md` / `.js` | the exponent, calibrated against the one-class control, and the frame correction |
| `research/two-class-lower-bounds.md` / `.js` | G2 ≥ g, the imported lower bound, the certificate ladder, the Poisson law, route A's second floor |
| `research/localized-04-maxsum.md` / `.js` | the maxsum growth law, the Deficit Lemma, the Traverse Bound |
| `research/LOCALIZED-GAP.md` | Facts A and B, the Localized Merge Lemma, the refutation of the chain |
| `research/maier-matrix.md` / `.js` | the Origin Excess Lemma, the scale collision, the complete classification |
| `research/origin-excess.md` / `.js` | the Survival Quotient Identity, the ceiling at 2.2, and ρ(2) = 0.79305 |
| `research/discrepancy-two-class.md` / `.js` | the two-class discrepancy channel and the Level Ledger's true looseness |
| `research/gate-multiplies.md` / `-01..03.js` | the no-fixed-point argument in four hypotheses, the Overshoot Budget, and the surviving form of TODO 0b's per-fold rate |
| `research/maxgap-law.md` / `.js` | c as a surface, the block statistic that separates its coordinates, and the FGKMT ledger |
| `research/theta-ladder.md` | the conditional θ ladder to z = 47 and the exact unconditional suprema to z = 71 |
| `research/h2-scoping.md` | why extending A288815 is both infeasible and non-diagnostic |

*Files added since 2026-08-18 are indexed in [../README.md](../README.md)'s
file table, not here; §0 above is the current map.*

Older and load-bearing: `research/ZONE-POSTULATE.md`, `research/THE-DIALS.md`,
`research/U-FRAME.md`, `research/PRIOR-ART.md`, `paper/beta2-note.md`,
`research/oeis-G2-submission.md`.

```
node research/exponent-control.js                    # ~1 s
node research/two-class-lower-bounds.js              # 3 s, ladder to x = 571
node research/two-class-lower-bounds.js --full       # 6 min, ladder to x = 4001
node research/localized-04-maxsum.js 1e9 scan 8 16000        # 18 s
node research/localized-04-maxsum.js 1e9 997,16001 1024 16000 # 100 s
node --max-old-space-size=6144 research/maier-matrix.js      # 6 s
node --max-old-space-size=6144 research/origin-excess.js     # 13 s
node --max-old-space-size=6144 research/discrepancy-two-class.js  # 17.9 s
node research/gate-multiplies-02.js 29               # 17 s
node research/gate-multiplies-03.js                  # 4.3 s, streams T_29
node --max-old-space-size=8192 research/maxgap-law.js --big  # 147 s, exact periods to 29#
node research/window-check.js 1e11                   # ~10 min, the Zone Postulate check
```

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
