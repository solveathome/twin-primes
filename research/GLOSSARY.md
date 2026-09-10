# Glossary — the shared vocabulary of primeoire

<!-- ledger
id: Q-registry-glossary
status: ANSWERED
todo: none
question: What does each word of the programme mean, one term per object?
verdict: The vocabulary registry; adopted terms with dates, the anchored layer, and the calibrated entries (Var/E, hyperuniformity, the freshness dimension count) as corrected on 2026-08-28.
-->

**Scope.** This document owns the vocabulary and nothing else: one term per
object, with the canonical alias attached. It is a lookup document, read one
entry at a time, and it is **not the first thing to read**. It does not own the
status of any route. The reading path for a fresh reader is in
[README.md](README.md); the state of the central object is in
[G2-STATE.md](G2-STATE.md); why these objects are the right ones is in
[THE-LENS.md](THE-LENS.md); what to try next is in [../TODO.md](../TODO.md).

Adopted 2026-08-14. One metaphor family (moiré/tiling), one term per object.
First use in any public text states the canonical alias once, then uses our word.

## Core objects

- **Tile (Tₚ)** — the repeating unit of the moiré after stacking all primes ≤ p:
  one full period, width p# (the primorial). *The 31-tile* T₃₁ has width
  200,560,490,130. Canonical aliases: the primorial wheel mod p#; Holt and Rudd's
  *cycle of gaps* G(p#) among the generators of Z mod p#.
- **Fold** — what a new prime does to the tile: p **folds** the tile p times
  (lays p copies end to end), then strikes its residues through every copy.
  "Adding 11 folds the 7-tile eleven times and strikes each twin site twice."
  Canonical alias: Holt and Rudd's R1/R2/R3 recursion (identify the next prime,
  concatenate p copies, close adjacent gaps); a kill is their *fusion*.
- **Hole / candidate** — a position no stacked prime hits; where all further
  primes must live.
- **Twin slot** — a position r with both r and r+2 holes; a *possible* twin pair.
- **Twin opener** — the lower member a of a realized twin pair (a and a+2 both
  prime): the twin slot that survived every fold. Consecutive openers define the
  twin gaps g_i, and those gaps are the process the head statistics of TODO Z4
  run on (history/staging/head-residual-factor.md §1).
- **Census (Dₚ)** — the number of twin slots per tile: Dₚ = ∏₃≤q≤p (q−2).
  The 31-tile's census is 6,226,553,025. (Counted exactly; Copying Theorem.)
  Canonical aliases: OEIS A059861; Schemmel's totient (1869) at the primorial —
  the pair-analogue of Euler's φ, which is the SINGLE-hole census ∏(q−1); Holt
  and Rudd's N2(p#), "Twin Generators".
- **Width (|Tₚ|)** — the tile's size: |Tₚ| = p# (the primorial; classically the
  pattern's period). The two growth laws per fold: |Tₚ| = p·|T_prev| and
  Dₚ = (p−2)·D_prev.

## Places in the tile

- **Seam** — where adjacent copies meet after a fold: the multiples k·(width of
  the previous tile). Every seam carries the pair (kP−1, kP+1) — twin slots by
  the mirror. **Seam Lemma:** each fold kills exactly 2 seam pairs; p−2 survive.
  **The seam's enrichment is slot-level and stops there.** Against a random
  integer a seam point is 10–20× more likely to carry a twin prime, with the
  Hardy-Littlewood constant E(P) = 2·∏_{odd p|P} p/(p−2) VERIFIED to 0.1–0.6%
  (10×/14×/17×/20× at P = 30..30030, sieved to 3·10⁹). That whole factor is
  slot-hood: a seam position is roughly 20× to 28× more likely than average to be a slot, level by level (20.2, 22.9, 25.6, 28.1 at T₁₃, T₁₇, T₁₉, T₂₃, recomputed from `attack2-01-06-seam-census.js`; no script prints a single figure, and the round "25×" that stood here is the T₁₉ value),
  and **conditional on being a slot it is not more likely than average to be a
  twin prime**. Seam neighbourhoods at half-widths 300 to 3·10⁵ measure
  twin-prime survival at 1.016, 0.980, 1.007, 0.986 times the tile mean at T₂₃,
  against one control offset each, and the seam points themselves
  give 1 genuine twin pair from 20 slots against 2.25 expected
  (`research/fold-profile-12-anatomy-survival.js`). The 400-control test is a
  different run, `research/fold-profile-13-hotspot-sweep.js`, which puts the
  seams at z = −1.41 to +0.13 across T₁₉ and T₂₃, every cell consistent with the
  null; those two extremes are different tiles at different half-widths. Nor is the enrichment a
  neighbourhood effect even at slot level: seam-anchored windows measure
  1.002 ± 0.005 (`attack2-01-06-seam-census.js`).
- **Mirror** — the palindrome: the tile reads the same backward (r ↔ width−r);
  center at width/2, edges (±1 from the seams) always survive.
- **Zone** — the quiet stretch (p, p′²), where p′ is the next prime after p:
  every hole in it is a genuine prime and every twin slot lying wholly inside it
  is a genuine twin pair. p's own only strike below p′² is at p itself.
  Everything the conjecture needs happens here. Nearest prior-art object: Holt's
  *interval of survival* Δ-H(p_k) = [p_k², p_{k+1}²], which shares the upper
  endpoint and starts higher.
- **Frontier / crystallization** — at p′² the tile below is *finished forever*:
  holes there are real primes, twin slots real twin primes. The frontier moves
  outward at speed p′²; settled territory is never touched again. Canonical
  alias: Holt's *horizon of survival*.
- **Stratum (fossil)** — the permanent dent each prime digs at [p², 2p²] in its
  own tile, copied into every later tile unchanged. **Exact Invariance Lemma:**
  a stratum's depth is frozen at birth (every band scales by exactly (p−2) per
  fold). Depth at birth given by the Unification Law's band average.
- **Kill image** — the Redundancy Lemma's object: p's new strikes are exactly
  p × (previous holes) — a p-times magnified copy of the tile's own hole
  pattern, igniting at p². Its dense head digs the stratum.
- **Head** — one word, three objects, and every use states which. (i) The
  **scour head**: the scour primes with q³ ≤ W+1, where the heaviest caps sit and
  where the twin question lives; the certificate engine's proven share is the
  head share only (research/certificate-engine.md §1). (ii) The **head window**
  [0, x] at the start of a tile period, the twin-poor start whose ratio is capped
  at e^{2γ} by the Unification Law (research/attack-02-head-bias.js). (iii) The
  **zone head** F(p): the distance from a prime p to the first twin opener
  strictly above it, the object of TODO Z4, of
  history/staging/destroyer-census-01.md §6 and of zonegap-01.js's a_first − p.
  Senses (i) and (ii) are regions and collide only on the word; sense (iii) is a
  distance.
- **Tail** — the scour primes with q³ > W+1, the complement of the scour head.
  There every fresh victim v = qm has m prime, so cap₂ counts primes rather than
  rough integers and the tail sum becomes a prime-counting statement: on the
  Natal@5 comb the elementary 2 ln 2 drops to (ln 2)/2 at modulus 30
  (paper/staircase-note.md §4, §6; research/bv-import-survey.md §3.1). Distinct
  from the distributional tail of a statistic, which the corpus also calls a
  tail.

## The ledger

- **Remover window** — for a slot at position r in the tile at level x, the
  only primes that can strike it are q with x < q ≤ √r (q strikes only at
  positions ≥ q²). Empty window ⟺ crystallized ⟺ real twins. Just 34
  removers for all of T₁₃.
- **Overlap credit** — kill events landing on already-dead slots (divisible by
  two removers ⇒ dies once, absorbs two strikes). Removers' total capacity
  EXCEEDS the census (~2 ln x factor), so the family survives on this forced
  inefficiency alone: survivors = census·∏(1−2/q) ~ 2C₂W/ln²W → ∞. Removers
  act exactly like folds not yet performed. Resolves folder-17 steps 6–7:
  the hoped "capacity < census" inequality reverses; salvation is overlap.
  Read as a fluctuating quantity rather than a total, the overlap credit is
  the **X-channel** (see the anchored layer below), which is where the
  anchored survivor deficit was localized on 2026-08-15.
- **Self-strike = twin found (NOT a kill)** — when prime q removes the slot
  that contains q itself (position q or q−2), it is not destroying a candidate:
  it is q graduating to wheel-prime status. PROVEN: a self-strike occurs iff
  the pair (q, q±2) is a genuine twin prime (a composite partner would have
  been bulk-killed by a smaller prime first). So the self-strike sequence of a
  tile ENUMERATES its twin primes; honest destruction count = kills − self-strikes.
  The ancestor (5,7) is the first self-strike. Contrast: genuine kills (bulk +
  the hit at q²) unmask COMPOSITE candidates.
- **Effective Scour / √W tooth-loss** — inside a FIXED tile of width W, a prime
  q kills a slot only via a self-strike (at position q — a twin FOUND, see
  above) or a genuine strike at q² and beyond (smaller multiples are already
  dead). So if q² > W the prime is nearly toothless — it can only self-strike
  (find a twin), destroying nothing. The effective *destructive* Scour on a
  width-W tile is just the primes ≤ √W; the rest is boundary noise. Per-prime
  kills follow kills(q) ≈ 2·(alive before q)/q — the (p−2)/p law as a kill
  sequence. Marching all primes ≤ √W reconstructs exactly the real twins in the
  tile (crystallization from the kill side). See scour-into-fixed-tile.js.
- **Onset shell** — the Effective Scour's origin-local dual, on the integer
  line rather than in a fixed tile (Chris's hand derivation, 2026-08-21,
  machine-verified over 1..10⁴: `natal-onset-01.js`). The first FRESH kill of
  scour prime q is exactly q² — any earlier multiple q·m with m > 1 coprime
  to the wheel has lpf(m) < q and was already struck — so at position n the
  destructive influencer set is exactly {q : q² ≤ n}: a √n staircase, one new
  tread per q². The onset shell of q is the stretch [q², q′²) on which that
  set is frozen at the primes ≤ q. The zone (p, p′²) sits entirely below p′'s
  tread, which is the certification fact in onset coordinates: inside a zone
  the only active destroyers are the tile's own primes, so holes are primes
  and twin slots are twin pairs. Per prime, three onsets lag in order: first
  fresh kill (q²), first kill landing in a twin channel, first destruction of
  a LIVE pair — the instrument measures all three. The tile-global statement
  is the Effective Scour entry above (`scour-into-fixed-tile.js`).
- **The Scour** — the removers as a collective, with their strike pattern:
  ⋃_q q × (the tile's own holes). The tile's crystallized output, re-scaled
  and turned against it; deterministic, periodic per remover, misses =
  survivors. "The scour of T₁₃ is 34 primes firing 1,699 strikes; its misses
  are the 456 real twins."
- **Two-Moiré Argument** — the conjecture in final native form: Grain and
  Scour come from disjoint prime alphabets, so they are EXACTLY independent
  (CRT; provable — aggregate alignment impossible, miss classes guaranteed in
  the joint tile). TPC = "the Scour never achieves perfect local alignment
  with the Grain" — the guaranteed misses live in a joint tile ~10⁷³ wide
  while our window is a ~10⁻⁶⁹ sliver of it. See two-moire-argument.md.

- **Origin Excess Lemma** (PROVEN, VERIFIED 14/14) — the origin carries more
  slots than the mean over the ensemble of all x# translates, for windows
  S ≤ y′². It has exactly **one** hypothesis, and three further statements
  travel with it that are easy to miscount as hypotheses: the **non-vacuity
  remark** (the conclusion is empty unless y′² > x), the **Origin Excess
  Corollary** (the advantage and its expiry at x < x\*(y)) and the **Scale
  Collision Proposition** (y′² < x′² strictly, a statement about the parameters
  rather than about the construction, so no better lemma repairs it). The
  canonical enumeration by logical type is `maier-matrix.md` §4a; cite it rather
  than keeping a private count. The advantage is capped: at most a factor of
  about 2.2, measured maximum 1.372 over the fourteen cells, and at the zone's
  own width S = x′² it reverses to ρ(2) = e^{2γ}/4.
- **Two-class discrepancy (ΔΦ₂), and the ×3 ceiling** (PROVEN) — the signed
  discrepancy of the two-class sieve against its main term. Its ceiling is
  3^{π(x)}, which is exactly the Möbius term count, and the identity
  R_k(p) → k+1 goes with it. The two-class object does not appear in the
  literature; the one-class version is Holt's (`discrepancy-two-class.md`,
  `G2-STATE.md` §8).
- **Driving term** — Holt's one-class mechanism adapted to two classes. The
  **two-class driving-term lemma is PROVEN**, and cleaner than the one-class
  original because Fact A rules out the second kill. **The driving-term ROUTE to
  a bound on G₂ is REFUTED**: it certifies gaps of size O(x) and cannot reach x²
  (`two-class-lower-bounds.md` §7). Keep the two statuses apart; the lemma being
  proven says nothing about the route.

## The dynamics

- **The family** — all twin slots in every tile descend from the single
  ancestral slot (5,7) in T₃; no new lineage is ever born (zero orphans,
  verified). Each slot has p−2 children per fold.
- **Edge lineage** — the family branch that keeps the seam address kP±1;
  the Seam Lemma is the Copying Theorem restricted to this line.
- **The three houses** — the @5 tile's slots, the family's complete and final
  aristocracy: House 11 and House 17 (mirror images of each other; the fold-5
  graduates) and House 29 (self-mirror; the edge house, owner of all seams).
  Each carries exactly one third of every census forever. @5 is the unique
  tile fully crystallized at birth (width 30 < frontier 49): all three
  founders are real twin primes, immortal by theorem.
- **Natal set @p** (the *born-at-p* cohort) — the twin opportunities that first
  appear as *interior* slots at fold p, born at the **seam** (the mirror
  protects the edge: position 1 and width−1 are never struck). Size at birth
  = **p−3** (and 2 at @5). Mechanism: the Seam Lemma — the edge lineage bears
  p−2 children each fold, 1 stays the eternal edge, **p−3 graduate inward** as
  the natal set. Carried forward, a natal set scales by (q−2) per later fold.
  Honest note: "born" = newly-*interior*, not new-lineage (zero orphans —
  every natal slot descends from the ancestor; the seam is its birth canal).
  Paired with:
  - **Carried set** (legacy / inheritance) — the surviving copies of
    earlier-born opportunities; each existing slot keeps **(p−2) of its p
    copies** per fold (coprimality forbids more than 2 struck).
  - **Eternal edge** — the single slot (House 29 / ancestral seam pair, ≡ −1
    mod width) that is *always* the edge, never born; descends straight from
    the ancestor. The "1 / width−1 never touched" slot.
  Fold law: D_new = 1 (edge) + carried·(p−2)-per-slot + natal(p−3). Every tile
  decomposes as edge + Σ_q (natal@q, carried to the present). Verified
  T₅..T₁₃ (e.g. @13 = 1 + 990 + 396 + 88 + 10). See [[birth cohorts]] below.
- **Birth cohorts** — the exact decomposition of the census by creation fold:
  each fold p the edge bears p−2 children; one remains the edge, p−3 graduate
  into the interior as that fold's newborns (cohort(5) = 2, the special
  case). D_x = 1 + Σ cohort(p)·∏_{p<q≤x}(q−2), telescoping via 1+(p−3) = p−2.
  Birth fold is readable from a slot's residue (seam-address depth). All
  cohorts from fold 7 on are born inside House 29 (the womb). Two-thirds of
  all twin opportunities ever were born at @5. Verified exactly at T₁₃, T₁₇.
- **Unification Law** (MEASURED to ~1%, Hardy-Littlewood-conditional; ω(u) is
  Buchstab's survival function) — one curve governs local twin density relative
  to the tile average: ρ(u) = e^{2γ}/u² for u = ln x / ln p ≤ 2, continuing as the
  pair-Buchstab square (e^γ ω(u))² on 2 ≤ u ≤ 3, pinned to 1 beyond. Explains
  the head cap (e^{2γ}), the zone-edge trough (e^{2γ}/4 ≈ 0.793), the
  historical "kill shadow" (the first-octave band average — absorbed term, no
  longer a separate object; its depth is NOT the constant 0.85 but a drift,
  0.850 → 0.823 measured over y ~ 1000 → 26000, along
  0.793055·(1 + (2 − 1/ln 2)·ln 2/ln y): the band is a shrinking interval in
  u, so the average walks down to the trough constant — the old "stable 0.85"
  was a y ≤ 1000 artifact; **VERDICT: SHAPE-ONLY**, corrected from DERIVED by the
  prereg's own rule at the thirty-sixth pass — y ~ 1000 misses deciding level D1
  by 1.49×, and deciding levels may not be narrowed after measurement — and
  CONFIRMED SHAPE-ONLY at the thirty-eighth. Under that label the shape is
  SCORED and the amplitude's first term is DERIVED: divide by K(y), the squared
  Mertens partial-product error, carrying 45.1% of the gap, remainder zero at 2σ;
  `history/staging/shadow-buchstab.md`, `history/staging/shadow-amplitude.md`),
  and the p³ equidistribution law.
- **Twin Prime Grain ("the grain")** — the tile's fine texture: the ordered
  sequence of gaps between consecutive twin slots. T₇'s grain:
  6,12,12,18,12,30,6,30,12,18,12,12,6,12,12. Deterministic and fold-recursive
  (copy p times, merge the two gaps flanking every kill — the twin version of
  the 2024 jumps.txt merge rule). Mirror-symmetric about the tile's center
  (offset −2). Its size distribution ("grain census": T₁₁ = 6×21, 12×56,
  18×22, 24×6, 30×22, 36×4, 42×4) HAS a law as of 2026-08-14: the exact CRT
  inclusion-exclusion identity and its fold covariance, in
  [grain-census.js](grain-census.js) (count(6) = ∏_{5≤q≤p}(q−4); the word rule
  that the grain never contains "6,6"; the forced ratio 8·count(6) =
  3·count(12) at every level; no forced equalities). Precision note: behind the
  frontier the grain is the spacing of REAL twin primes; past it, of slots.
  Canonical alias: the gap word of the twin residues (single-hole version =
  OEIS A049296; the twin version appears absent from OEIS — third submission
  candidate).
- **G₂ (twin Jacobsthal)** — the coarsest grain: the largest gap between twin
  slots in a tile: 2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618
  (T₂..T₄₃ computed here). **The sequence is A144311 + 1**, Andrew Carter 2008,
  22 terms to x = 79, so `research/oeis-G2-submission.md` is a DUPLICATE and must
  not be sent; what survives as a proposal on A144311 is a b-file, the twin-prime
  motivation and the cross-references. Bracketed on both sides. Above:
  G₂ ≪ (log p#)^{4.2665+ε} PROVEN (paper/beta2-note.md), the exponent measured at
  1.50 on the 22 trusted terms (1.57 is the h2 control's figure;
  reconciliation: `research/G2-STATE.md` §6; the 22-term refit is
  `research/exponent-control.md` §5), bracket 1.3 to 1.8, floor 1. Below:
  G₂(p#) ≥ g(p#) pointwise, since twin slots are a subset of holes, so the
  Rankin-Pintz-FGKMT lower bounds transfer, giving
  G₂(p#) ≫ p·log p·logloglog p/loglog p; one rung above the transfer,
  G₂(p#) ≫ p·log p from published ingredients only (K–K Corollary 1 + Mertens
  + PNT + the CRT identity — composition ours, adversary-confirmed 2026-08-20,
  not refereed; `paper/proposals/prop-xlnx-lower-bound.md`). The adversarial version, where each
  prime may choose its class pair freely, is Ziller and Morack's h₂, OEIS
  A288815, which dominates G₂ at every level.
- **Zone gap (Z₂(p))** — G₂'s question asked of the zone alone (Chris,
  2026-08-21): the largest gap between consecutive twin slots of T_p
  restricted to the zone (p, p′²), where G₂ ranges over the whole tile. NOT
  G₂: one number per zone rather than per tile, over a window of width ≈ p²
  rather than p#. What makes it prime-measurable is crystallization: the zone
  lies below the frontier p′², so every twin slot wholly inside it is a
  genuine twin prime pair, and Z₂ is computed from the twin primes themselves
  with no tile ever built — thousands of exact levels against the tile
  ladder's fourteen. An interior gap of the zone is a gap of the tile's slot
  sequence, so the interior part of Z₂ never exceeds G₂(p#); the boundary
  convention belongs to the measuring artifact. The strong Zone Postulate at
  p is the statement that the zone's twin supply is non-empty, and Z₂ is that
  statement's gap form on its own ground. Producer: `zonegap-01.js` (the
  incoming measurement; its data and any law live there). The three-object
  distinction G₂ / h₂ / Z₂ is stated at `G2-STATE.md` §1a.

## The anchored layer (adopted 2026-08-15)

These words describe objects that did not exist when the vocabulary above was
fixed. They all live one level down from the tile: they describe the *anchored* window, the phase-zero member
of the rotation ensemble, which is the arithmetic Scour itself.

- **Rotation ensemble** — the W phases t of a tile, each assigning every scour
  prime q the strike classes {t, t−2} mod q. By CRT the phase vector is
  distinct for every t, so the ensemble has exactly W members and is
  enumerable in full. Everything provable about windows is a statement about
  this ensemble; the conjecture is a statement about one member of it.
- **The anchor** — the member t = 0, where every prime's strike classes sit at
  {0, −2} simultaneously. Not a random window: it is the real number line.
  Canonical alias: the sifted set of the interval [0, W).
- **Anchored bias β(x)** — β = S(x)/E(x), where S is the anchored Natal@5
  survivor count at level x and E is the exact rotation-ensemble mean. Both
  sides are exactly computable; measured at ten levels, descending 1.156 →
  0.846 from @7 to @41 along the zero-knob classical curve
  (e^{2γ}/4)(1 + 2/lnW + 6/ln²W). **Positivity of this one number is SUFFICIENT
  for the Twin Prime Conjecture**, and the implication runs one way only:
  liminf β > 0 implies twins are infinite, because E → ∞ is Mertens and
  survivors-are-twins is proven (paper/anchored-note.md §7). No converse is
  proven or claimed, so β's positivity is at least as strong as TPC and may be
  strictly stronger; do not write "TPC *is* the positivity of β". The weakest
  sufficient statement the corpus has is weaker still and is the one to aim at:
  **Non-Annihilation Sufficiency** (PROVEN, paper/anchored-note.md §8
  Proposition 2) — if the anchored survivor count S(x) ≥ 1 for infinitely many
  x, twins are infinite. Conjectured limit of β is e^{2γ}/4 = 0.793055, the
  Unification Law's zone-edge value. Do not call β "the anchored ratio" or "R";
  older files use both.
- **Assumption A** — the positivity of β, stated as an assumption and priced
  honestly at Hardy-Littlewood strength. **"Assumption A" alone is not a
  statement: every occurrence carries a form.** Its *sharp* form
  (β → e^{2γ}/4) is algebraically equivalent to HL on the 11/17 comb; its *weak*
  form (β ≥ c) is blocked by the parity floor 2 at every known input including
  GEH. The name is used across the papers, so keep it.
- **Fused window** — the anchor's two strike classes {0, −2} mod q are
  mirror-adjacent, so they glue into a SINGLE cyclic window of length
  L_q ≈ 2W/q in the tile's own dilated natal pattern, rather than two
  independent ones. PROVEN — this is the **Fusion Identity** plus the
  **Mirror-Phase Doubling Lemma** (natal-cap-19-calm-lemma.md). It is the
  mechanism behind the anchored calm, and it is why W/2, the unique
  mirror-fixed phase, duplicates instead and is provably variance-doubled.
- **The anchored calm** — the measured fact that the anchor sits in the
  extreme low tail of the ensemble's strike-variance statistics (rank 2 of
  510,510 at @17 on equal-weight Z2). One sighting, not four: three of the
  original four dissolved under exact control. **"The anchored calm" names a
  phenomenon and is never a claim**: it decomposes into separately-named
  sub-claims at separate statuses, from PROVEN through CERTIFIED at six levels
  to one that is REFUTED in its uniform-in-q form and one that is merely
  MEASURED, and the status table is [anchored-calm.md](anchored-calm.md). There
  is no "Fused-Window Calm Lemma"; the name is retired. WARNING, on the record:
  the calm does NOT concentrate survivors (corr(VR, S) ≈ 0). Calm is about
  strikes; survival is about the X-channel.
- **The X-channel** — the overlap credit read as a fluctuating quantity.
  97% of the anchored survivor fluctuation lives here, with corr(X, S) = 0.99,
  and it is invisible to every strike statistic. **X-limitation Theorem**
  (PROVEN PER LEVEL, at the enumerated levels @11, @13, @17 and @19): strikes
  alone cannot annihilate the natal set at any loudness; annihilation requires
  an overlap collapse of 8 to 15 σ_X at @13 and @17. The all-x form is OPEN,
  because no level-uniform bound on max VR exists, so "from x = 13 upward"
  remains an extrapolation rather than a theorem. Of the two measured trends it
  rested on, one broke and the other held decisively. Max VR was enumerated at
  a fourth level and does not fall: 2.78, 2.35, 2.14, 2.293 at @11, @13, @17,
  @19. The driver S̄/√(K·V̄) does keep rising, 3.12, 4.88, 9.75, 24.96, and
  since the per-level hypothesis is exactly √(K·V̄·maxVR) < S̄, the @19 driver
  is what promoted @19 to a theorem (margin ×271.7 on the squared form;
  natal-cap-38-loudness-driver.js). So
  Assumption A restated in its true channel: the anchored overlap-credit
  deficit stays below (1−ε)·S̄. Measured X(0)/X̄ = 1.4541, 0.9908, 0.9482,
  **0.9558** at @11/@13/@17/@19 — **down for two levels, then UP at the
  fourth, so no monotone descent holds**
  (`natal-cap-35-x-multiplicity.js`, whose @19 row is a u-form means row).
  That is the same shape, at the same level, as max VR (2.78, 2.35, 2.14,
  2.293): @19 breaks both monotone claims and in the same direction. The deficit lives in multiplicity m ≥ 3, which pair-based
  instruments track poorly (natal-cap-31-calm-vs-kill.md).
- **The skeleton** — the mod-30 kernel that survives when the anchored
  ledger's 2ⁿ branch algebra collapses. Two objects, at two calibrations.
  **Skeleton Collapse Theorem** (PROVEN, all x and all q): the whole ledger
  reduces to one kernel K = 15C − 2P (natal-cap-30-skeleton-bound.md).
  **Aggregate 30-Skeleton Bound** (CERTIFIED at six levels, @11 through @29):
  G30_agg < 1/2 in exact BigInt. Its all-x form is the **Skeleton
  Equidistribution Conjecture** (OPEN, door named and analytic:
  equidistribution of ⌈W/q⌉ mod 30 over the scour primes); the door as named
  is CLOSED as a route (2026-08-30, `OUTCOMES.md`): over every scour prime it
  governs 9.2%, −0.9%, 0.2%, 0.5% of the mass at @13..@23, at most 0.0102 of
  G30_agg, and the open side is the inequality itself at moduli exceeding the
  window.
- **Staircase cap (cap₁, cap₂, cap_K)** — the per-prime, HISTORY-BLIND hard
  upper bounds on a scour prime's fresh kills. cap₁ is the divisibility
  skeleton via Legendre-Buchstab counting; cap₂ folds in the deterministic
  natal residue system on the cofactor; cap_K adds, for each of the first K
  scour primes q′ < q, the **one** forbidden freshness residue that can fire
  (v ≢ −2 mod q′ on the A side, v ≢ +2 on the B side). Its companion
  v ≢ 0 (mod q′) is void under P⁻(m) ≥ q, so the density factor is
  ∏(1 − 1/(q′−1)), one class per prime, and the sifting dimension is 1. In a
  formulation that *sifts* for P⁻(m) ≥ q rather than assuming it, m ≢ 0 is a
  real second class and the dimension is 2
  (history/staging/thm-buchstab-transfer-shallow.md §2(c)). The caps form a
  monotone ladder fresh ≤ cap_K ≤ … ≤ cap₂ ≤ cap₁ (paper/staircase-note.md).
- **Ladder depth K, and K*** — K is how many freshness moduli a cap folds in;
  **K\*** is the least K at which the pigeonhole closes, Σ cap_K < N. K* is
  the exact price of history-blindness. Measured 0, 0, 2, 10, 27, 69 at
  @11..@29, which is SUB-LINEAR in the scour and tracks the quarter-power
  phi-band. Certificate efficiency at fixed relative depth improves with level;
  read only at the crossing point it appears to collapse, and that appearance is
  an artifact of the crossing point rather than a property of the certificate
  (natal-cap-24-boundK-curve.js).
- **Sub-Poisson window counts (Var/E)** — the natal field's suppressed
  large-scale density fluctuation: window counts are sub-Poisson, Var/E drifting
  0.152 → 0.396 across @7..@37 rather than sitting at 1. This is NOT
  hyperuniformity; see that entry below. It is the reason the extremal
  window excess obeys E = 0.97·σ(ℓ)·√(2ln(W/ℓ)) with no free multiplier
  (natal-cap-25-excess-law.js). Var/E is not a constant in either the level or
  the window, and the two ladders that carry it are different objects. For the
  **full** twin process the stable structure is a scaling law in the window
  exponent u, ln(Var/E) ≈ −(0.24u² + 0.13u), whose u = 2 value drifts
  0.251 → 0.321 over y = 97 to 2003 with the limit unknown
  (paper/variance-note.md §6). For the **comb-restricted** Natal@5 process the
  diagonal u = 2 ladder above (0.152 → 0.396) is the one that reaches deep
  levels, and its limit is Paper III's last open question. The earlier
  reading "≈ 0.611, favoured 10:1" is refuted as an inference: the note's own
  fit protocol, run on a model whose limit is 0.455 by construction, returns
  0.615 and wins the frozen forecast too, so no fit on this lever arm can see
  the limit. The standing HEURISTIC closed form is
  lim Var/E = Pr[GD(2) > u] = 1 − e^{−2γ}(9/2 − 4 ln 2) = 0.45546 at u = 2,
  zero parameters, residuals ≤ 0.002 from x = 13 against the Monte-Carlo model (+0.0029 at x = 13 against the exact model), exact at one excluded class,
  with the model's limit theorem PROVEN (`history/staging/varE-limit-theorem.md`) and one step open, the θ = 2 identification (`varE-theta2-proof.md`; `varE-spectral.md`, red-teamed 2026-08-28; paper/variance-note.md §7
  still carries the older reading pending its edit).
- **Hyperuniformity** — Torquato's word, and not a synonym for the entry
  above. A point configuration is hyperuniform when its structure factor
  vanishes at zero wavenumber, and the taxonomy sorts configurations by how the
  local number variance Var[N_L] grows with the window: class I as the window
  surface area, which in one dimension means bounded; class II with an extra
  ln L; class III as L^{1−α}, α ∈ (0,1). Torquato, *Physics Reports* **745**
  (2018) 1–95, read at the author's arXiv full text and cited by ITS pages,
  not the journal's: arXiv:1801.06924 eq. (14) p. 10 (the definition), §5.3
  p. 23 (the three classes), §5.5 p. 28 (every periodic configuration is class
  I). The published article runs 1–95 on different pagination and those are not
  its page numbers. **The tile is class I, and vacuously so.** It is periodic
  with period W, so Var[N_L] is W-periodic and Var[N_W] = 0 exactly by the sum
  rule; periodicity alone puts every level in class I, and no window any live
  document reasons about exceeds one period, so the classification carries no
  arithmetic (PROVEN, `history/staging/import-repulsive.md` §3). **At the window
  scale the programme actually reads, L = y^u with u fixed, the twin-slot count
  is sub-Poisson and not hyperuniform**: Var[N_L] grows linearly in L with
  Var/E between 0.152 and 0.396, which is the Poisson scaling with a reduced
  prefactor rather than a suppressed one, MEASURED. That reading is a statement
  about the diagonal family of configurations, one per level with L and the
  sieve level moving together, not a hyperuniformity class for any one tile; the
  standing values and the open limit sit under **Sub-Poisson window counts
  (Var/E)** above. Torquato's practical fallback fails here too: the effective
  hyperuniformity criterion S(0)/S(k_peak) ≲ 10⁻⁴ (§11.1.6 eq. (252),
  arXiv p. 78) is of order 10⁻¹ to 10⁰ on this object. What is genuinely
  small-k here is the comb's structure factor S(ν) = δŴ(ν), and
  natal-cap-29-sigma-plateau.js has been computing it under another name.
- **Lemma V** — the two-dimensional analog of Iwaniec's 1980 linear-sieve error
  term: signed cancellation of the bilinear interval sawtooth remainder, uniform
  in position. NEEDED, NOT PROVEN in the supremum form the route needs; its
  MEAN-SQUARE form is PROVEN and unconditional (G2-STATE.md §0; re-derived
  adversarially 2026-08-29, redteam-0829-theorem1.md §§2, 9), a period mean
  rather than a supremum, so Lemma V proper is untouched. It is what the Brüdern-Fouvry vector sieve
  needs to decouple, and full decoupling gives 1 + √e ≈ 2.649, with any partial
  decoupling past θ_total = 1.2090 beating our proven 4.2665 (corrected
  2026-08-18 from 1.2417, which was the wrong asymmetry;
  research/sift-limit-attack.md §4.5). **But Lemma V is not the
  operative assumption at the measured working point.** There s/u ≈ 1.2, outside
  the range s ≤ u that Lemma V is stated in, so the ladder rests instead on the
  unproven Gaussian Maximal Law below, which is the whole price of the route
  (research/sift-limit-attack.md §§3, 4.5; research/theta-ladder.md). Below 2 is
  TPC outright. That sidelining is TPC-specific (2026-08-20 night): at the β₂
  target — the ρ maximal law's F2 form — the working point s/u = 3/u sits
  inside Lemma V's stated range for every delivered exponent u ∈ (3, β₂), so
  the sub-question is un-mooted there in its weakest form only; what re-enters
  is the ask, not an import route
  (research/history/staging/rho-maximal-law.md §5).
- **Gaussian Maximal Law for the interval sawtooth** — the operative unproven
  input on the exponent road, and the one to price the route against: that the
  bilinear interval sawtooth remainder obeys a Gaussian maximal inequality at the
  measured working point s/u ≈ 1.2 to 1.25. NEEDED, NOT PROVEN, and every number
  in theta-ladder's conditional column rests on it. Its mean-square form is done
  and verified; the uniform-in-position form is not
  (research/sift-limit-attack.md §3, research/theta-ladder.md §5b).
- **The Gap Reformulation** — TPC as a statement about the two-class
  Jacobsthal exponent: an exponent below 2 proves it. The only route in the
  programme with a defined finish line, which is why the exponent road is
  TODO item 0.

## The pane (adopted 2026-08-16)

Vocabulary for Chris's square-window target. Kept separate from the zone
because the two windows are different objects and confusing them wastes time.

- **Pane** — the window (n², (n+2)²), of width 4n+4. Contrast the **zone**
  (p, p′²), of width ≈ p². The zone is quadratic and its consecutive instances
  overlap almost entirely, so a handful of twins satisfies vast stretches of
  it. The pane is LINEAR, that redundancy is gone, and the statement develops
  genuine exceptions. Canonical alias: the interval between squares two apart.
- **Pane slots** — the Natal@5 positions in a pane, meaning r ≡ 11 or 17
  (mod 30) with the whole pair inside. About (4n+4)/15 of them.
- **Pane Postulate** — every pane contains a twin prime pair. MEASURED: one
  exception, n = 26, for n up to 1e5. The tighter (n², (n+1)²) version has
  twelve exceptions ending at 122, and is OEIS A091592, conjectured complete,
  tested to 1e7, keyword `hard`; its companion A091591 records that proving it
  would prove the twin prime conjecture.
- **The Pane Bound** — a proven upper bound on the number of pane slots
  destroyed by the primes 7 ≤ q ≤ n, lying strictly below the pane's slot count.
  By pigeonhole a Pane Bound forces a survivor, and a survivor in a pane is a
  genuine twin pair, so establishing it for all large n proves TPC.
  **VERDICT (attack A7, research/a3-07-pane-overlap.js): the pane is STRICTLY
  HARDER than the zone route it was proposed as an alternative to.** Scanning the sieve cutoff, the first z at which any provable bound
  enters the corridor has lnW/ln z decreasing toward **1**. Classical TPC sits
  at sifting parameter 2, the parity floor; dimension-2 sieves are proven only
  above β₂ = 4.2665. In the repo's own currency the pane's ledger entry reads
  **"4.2665 proven, 1 needed"**, which is HALF the parity floor. The best
  provable family falls short by 159 corridor widths at n = 3e6 and the miss
  grows like ln²n. This refutes a family of counting arguments, not the Pane
  Postulate itself, and does not touch bounds using structure other than
  counting.
- **The corridor** — the band a valid Pane Bound must land in: at or above the
  true removal count, strictly below the slot count. Its width is exactly the
  twin count, **5·C₂/ln²n = 3.301/ln²n** of the slots (VERIFIED at 3.348,
  3.285, 3.386, 3.326, 3.325 for n = 3e4 to 3e6). MEASURED at 25% at n = 100,
  8.2% at n = 1000, 3.2% at n = 30,000, 0.52% at n = 3e6. **The corridor
  closes.** That is the one-line statement of the difficulty: a valid Pane
  Bound is not merely a better bound, it is an asymptotically exact one. The
  factor 5 rather than 15/2 is the point to get right: the slot set sees only two
  of the three twin residues mod 30, so counting all twins against it overstates
  the corridor by exactly 3/2.
- **The overshoot** — why the naive bound misses. Counting strikes ON COMB
  SLOTS, total capacity is Σ_q 2·slots/q, so
  **capacity/slots = 2·Σ_{7≤q≤n} 1/q ≈ 2(lnln n − 0.772)**, independent of the
  pane's width. VERIFIED against exact counts: 1.32, 1.94, 2.33, 2.61, 2.89,
  3.13 at n = 100, 300, 1000, 3000, 10⁴, 3·10⁴, matching the closed form to
  three digits. It exceeds 1, so the naive pigeonhole fails, but it grows only
  like a double logarithm: about 3.7 at n = 10⁶ and still only about 9 at
  n = 10¹⁰⁰. Capacity EXCEEDS the census, so twins survive on
  [[overlap credit]] rather than scarcity, and a Pane Bound must bound OVERLAP
  rather than capacity. Both sides of the ratio must be counted on the comb:
  strikes on ALL integers against comb-only slots is a factor-15 mismatch and
  inflates the overshoot to 25 to 60.
- **Width invariance (PROVEN, one line)** — slots and capacity both scale
  linearly in the pane's width, so their ratio does not depend on it. The
  overshoot is a function of the sieve depth alone, and the sieve depth is set
  by the pane's HEIGHT, not its width. Widening a pane therefore cannot close
  the pigeonhole; it only suppresses the O(π(n)) boundary term from the
  per-prime ceilings, which is a real but bounded gain (about 26% of capacity
  at n = 3·10⁴).

## Deprecated / historical terms

- "Copy set" → **tile**. "Pattern/wheel" in older research files → tile.
- "Kill shadow" → absorbed into the Unification Law (kept only historically).
- Files written before 2026-08-14 use the older words; readings stand.

## The problem, in this vocabulary

Every fold multiplies the family by p−2 and moves the frontier to p². The Twin
Prime Conjecture: *the family never stops sending at least one child into the
zone before it crystallizes.* Measured: the zone's supply grows like p²/ln²p
with safety margin ~p. Provable: two primes within 2·ln p of each other in
every zone. The gap between those two sentences is the parity wall.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
