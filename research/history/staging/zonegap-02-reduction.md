# The Z2 reduction: the Zone Restriction Lemma, the three-slack chain graded honestly, the head machinery's transfer inventory, and a proof that the deep end is an onset desert

<!-- ledger
id: Q-zonegap-reduction
status: PARTIAL
todo: Z (retired)
question: What must be proven for Z2, what already is, and what does the proven head machinery give the zone?
verdict: The Zone Restriction Lemma is proven and verified at five levels - the in-zone twin slots of T_p ARE the in-zone twin primes, so Z2(p) IS the whole-tile gap object restricted to the head window - the three-slack chain is graded honestly, the transfer inventory is listed item by item, and the deep end is proven an onset desert over 24 levels; section 5 lists what was not reached.
-->

*(2026-08-21. Staging note; nothing here is integrated into a live document.
Producer, formally embedded: `research/zonegap-02-reduction.js` (0.1 s;
code-sha256 ed74bb89..., out-sha256 a278320d...); every identity below is
verified there exactly, at 5 levels for the lemma and chain, 24 levels for the
deep end, abort-on-mismatch, calibrated first against the G2 ladder
(`G2-STATE.md` §2) and zonegap-01's Z2 values. This is the PROOF-TARGET
document for TODO item Z: what must be proven, what already is, and what the
proven head machinery does and does not give the zone. Calibration marked per
claim: PROVEN, VERIFIED by exact computation, MEASURED, OPEN, REFUTED.
Conventions are zonegap-01's throughout
(`research/history/staging/zonegap-01.md` §0): pairs named by opener a; in
zone p iff p < a and a+2 < p'^2, both strict; gaps opener-to-opener; Z2 their
max, defined when the zone holds >= 2 pairs (it does, at every zone to 1e11);
head = a_first - p and tail = p'^2 - a_last, counted separately, never inside
Z2.)*

## 1. The Zone Restriction Lemma [PROVEN; VERIFIED at p = 7, 11, 13, 17, 23]

> **Lemma A.** Fix a prime p, let p' be the next prime, W = p#, and let the
> boundary conventions be zonegap-01 §0's. Then the in-zone twin-slot openers
> of T_p and the in-zone twin-prime openers are the SAME SET:
>
> { a : p < a, a+2 < p'^2, gcd(a(a+2), W) = 1 }
> = { a : p < a, a+2 < p'^2, a and a+2 prime }.
>
> Consequently every zone statistic — the gap multiset, Z2(p), head, tail,
> the pair count — has two readings, prime-side and slot-side, and they are
> equal numbers, not analogous ones: **Z2(p) IS the whole-tile gap object
> restricted to the head window (p, p'^2).**

*Proof.* (⊇) A prime exceeding p is coprime to W. (⊆) A hole n of T_p with
1 < n < p'^2 has no prime factor ≤ p; if n were composite its least prime
factor would exceed p, forcing n ≥ p'^2. So both members of an in-zone slot
pair are prime. ∎

Two supporting clauses, each one line, both verified per level (SEC A):
**the first hole of T_p above 1 is exactly p'** (any n in (1, p') is either a
prime ≤ p, dividing W, or composite with least factor ≤ √n < p), and **every
hole in (p, p'^2) is prime**. Producer check: sets equal at all five levels
(8, 9, 16, 17, 29 in-zone pairs), and Z2/head/tail identical computed either
way.

One convention caveat, carried explicitly: "head" presupposes an in-zone
first slot, i.e. occupancy. The tile's first twin-slot opener above p equals
the zone's first pair opener PROVIDED its closer lands below p'^2 — which is
the postulate at p. Measured standing: every zone to 1e11 holds ≥ 2 pairs
(zonegap-01 §2), so head, tail and Z2 are all defined on the entire measured
range.

## 2. The reduction chain, exact and graded

**(R0) Partition identity [PROVEN; VERIFIED SEC B].** When the zone holds
k ≥ 1 pairs, width = head + Σ gaps + tail exactly; for k ≥ 2, Z2 ≤ Σ gaps,
hence

  head + Z2 + tail ≤ width, with equality iff k = 2, strict iff k ≥ 3.

Verified digit-exact at all five levels (e.g. p = 23: 818 = 6 + 798 + 14;
head + Z2 + tail = 170 < 818).

**(R1) The chain as tasked [PROVEN, with its circularity stated].**

> Z2(p) + head(p) + tail(p) < p'^2 − p for infinitely many p
> ⟹ infinitely many zones occupied ⟺ TPC.

The second equivalence is ZONE-POSTULATE.md §2 (PROVEN, both directions,
elementary — cited, not re-proven). The first implication is immediate but
must be read honestly: the premise's three objects are DEFINED only when the
zone holds ≥ 2 pairs, so the premise already contains occupancy, and by (R0)
the strict inequality is exactly "≥ 3 pairs". The implication is trivially
PROVEN; the entire difficulty is producing the premise — an a-priori bound on
the tile's window-restricted slot structure that forces the objects to be
defined. That step is TPC-strength and no wording of the chain evades it
(zonegap-01 §5: the max is the wall; first-moment arguments closed,
`REFUTED.md` Route B; the residue form of the same statement is the postulate
itself, `attack-l1-residue.md`).

**(R2) The non-circular sufficient form [PROVEN].** Occupancy at p needs one
pair, so the minimal premise is a first-slot bound: if F(p) denotes the
distance from p to the tile's first twin-slot opener above p, then

  F(p) < p'^2 − p − 2 for infinitely many p ⟹ weak Zone Postulate ⟺ TPC,

and the currently proven instrument for F is §3.1's Euclid anchor:
F(p) ≤ G2(p#) − p − 1 — which, with G2 ≪ (ln W)^{4.2665+ε} = p^{4.2665+ε}
(paper/beta2-note.md), misses the needed p^2 by exactly the programme's open
exponent band (2, 4.2665].

**The honest grade.** The chain is TPC-strength end to end; its value is the
DECOMPOSITION, not a weakening. The three pieces have separately measured
scales and separately attackable mechanics, against a width that grows like
p^2 [all MEASURED, zonegap-01]:

| piece | scale (measured) | its machinery |
|---|---|---|
| head | mean 0.7229 ln²p (HL coefficient 0.7574); worst 0.72 of the Kourbatov ceiling at height p | anchored/origin, first-passage |
| Z2 | ln³ family, band constants c3 = 3.43..4.02, drifting; record envelope | Kourbatov / A113274 literature, record staircase |
| tail | band means 0.58..0.77 in ln²(p²) units | unstudied (cheapest piece) |
| width | p'^2 − p ~ p² | free |

Each piece is polylog against a quadratic width; the margin diverges like
p²/(3.9 ln³p) and none of that divergence is evidence (square-window lesson,
ZONE-POSTULATE.md §5a). What would count as progress is a PROVEN bound on any
piece at the window scale — and §3 inventories exactly what is proven today.

## 3. The transfer inventory: what the proven head machinery gives the zone

### 3.1 Euclid-in-moiré (the edge pair)

- **[PROVEN; VERIFIED SEC C1]** The tile carries the twin slot (W−1, W+1) at
  its edge — cyclically the opener a₀ = −1 — so the cyclic gap to the first
  opener a₁ above the origin gives **F(p) ≤ G2(p#) − p − 1**, and hence
  **head(p) ≤ G2(p#) − p − 1 wherever head is defined** (only the F form is
  unconditional; §2's (R2) uses F, and the two symbols name one inequality,
  clarified 2026-08-29 per redteam-0829-objects-zm.md H1): the Gap
  Reformulation localized to the head slack. Checked with ladder G2 at
  p = 7..17 (anchor gaps 12, 18, 18, 30 against G2 = 30, 42, 66, 108). This
  is the ONE proven head bound, and its shortfall is the whole open band:
  p^{4.2665+ε} against a needed p².
- **[PROVEN]** Inside the zone, Euclid-type guarantees give SINGLES only:
  the first hole above 1 is p', so the zone always holds the hole p' — and
  π(p'^2) − π(p) holes total, all prime — but no guaranteed pair. The only
  construction-guaranteed pair in the whole tile is the edge, and it lies in
  no zone: it sits W − p'^2 beyond the frontier, a factor ~e^{(1+o(1))p}/p².
  The pair guarantee inside the zone IS the postulate; ±1-type slots do not
  approach it.

### 3.2 Mirror-Sweep (σ(a) = W−2−a)

- **[PROVEN; VERIFIED SEC C2]** σ maps in-zone openers bijectively onto the
  tile openers of the co-edge window (W−p'^2, W−p−2), reversing the gap
  multiset: **Z2 is σ-invariant, and the zone's entire gap structure is
  copied to within p² of the tile's edge.** The edge W−1 is σ-fixed with
  two-sided isolation exactly a₁+1 = p + head + 1 (verified: nearest opener
  below W−1 is W−2−a₁ at every level) — the birth canal appears twice,
  mirror-symmetrically, and G2 ≥ p + head + 1 is the same fact as 3.1's.
- **[REFUTED as a transfer channel; VERIFIED SEC C2]** Certification does
  not survive the mirror: the image window carries composite-membered slots
  at every level (1 of 16 members at p = 7 — the slot pair (167, 169),
  169 = 13² — rising to 21 of 34 at p = 17). The mechanism is structural:
  the frontier p'^2 is not a mirror-covariant object (W − p'^2 is nobody's
  frontier), and the zone's defining property — sitting BELOW the frontier —
  is precisely what a tile symmetry cannot preserve. This is the
  origin-local shadow of "the mirror cannot conjugate time order"
  (natal-onset-01 §2) and is consistent with the mirror-symmetrization zero
  (`REFUTED.md`, attack-anchored-01 §3).
- What survives is bookkeeping, free and so far unused: the tile's last p²
  of slot structure is fully known (it is the zone's, reversed).

### 3.3 The unified-cap / anchored floors

- Setting recalled (paper/staircase-note.md; attack-anchored-01/02): the
  caps bound fresh strikes of the scour primes q > x on the Natal@5 comb
  over the WHOLE tile; the unified floors are 36 @11, 115 @13, 108 @17,
  1987 @19, anchored-point quantifier.
- **[PROVEN; VERIFIED SEC C3]** Restricted to the zone the machinery
  degenerates completely: Cofactor Rigidity's protection radius q₁² − 2 —
  q₁ = p' the first scour prime — IS the zone frontier, so **every strike by
  a prime q > p on an in-zone slot is a self-strike** (verified: strike
  count = 2 per pair at all five levels, each pair struck exactly by its own
  two members), and a self-strike is a twin found, not a candidate
  destroyed. Inside the zone the whole cap ledger reduces to the
  certification identity of §1, read from the kill side. It adds zero
  information there.
- **Where the transfer fails, named exactly.** The floors are
  location-blind pigeonhole counts over width W: the certified survivors
  carry no position, and a windowed pigeonhole is vacuous because in-window
  survival ⟺ primality is already known (§1). What the floors do give the
  zone is only a mean statement (tile slot count ≥ floor ⟹ average slot gap
  ≤ W/floor) — and mean/first-moment routes to the zone are CLOSED (Route B,
  `REFUTED.md`). The staircase certifies twins in a tile, not in a zone
  (ZONE-POSTULATE.md §3 already carries this sentence; it is now verified
  mechanically).

### 3.4 The onset shell: the zone's exact per-prime destruction ledger

- **[PROVEN]** The active strikers of the zone are exactly the primes
  q ≤ p. A prime q ≥ p' touches an in-zone slot only as itself — the self
  case m = 1, a twin found, not a kill; any non-self slot multiple q·m has
  m's prime factors > p, hence q·m ≥ p'^2 — and it makes no fresh kill on
  any in-zone integer (a composite multiple q·m < q² has lpf(q·m) =
  lpf(m) ≤ m < q, so a smaller prime struck first).
- **[PROVEN; VERIFIED SEC C4 at p = 7, 11, 13, every q]** The exact
  per-prime fresh-kill count inside the zone, in staircase-note notation:

  freshZone(q) = Φ*(⌊(p'^2−1)/q⌋, q) − Φ*(⌊p/q⌋, q),

  with the prime-regime simplification whenever q³ > p'^2 − 1:
  freshZone(q) = π(⌊(p'^2−1)/q⌋) − π(q−1) — pure prime count, every kill
  q × prime. The load as a function of q: mature primes (q² ≤ p) subtract
  the lower Φ* term and carry ~2(p'^2−p)/q-scale counts; young primes
  (q² > p) have their entire zone activity above q², counted by primes in
  [q, p'^2/q]; and the youngest, q = p, makes only 2..4 fresh kills in its
  whole zone (SEC D3, all 24 levels to 97). **This is Theorem 3's staircase
  transplanted to the zone with W ↦ p'^2: the zone is itself a tile-like
  window whose scour is its own young primes** — the same Φ* cap shape the
  staircase note proves for the tile, now at thousands of measurable levels.
  What it bounds: the zone's destruction ledger per prime, exactly; what it
  does not bound: where the misses (the survivors) sit, which is the wall.

## 4. The deep end is an onset desert [PROVEN; VERIFIED, 24 levels]

The measured binding gap sits just under p'^2 (u = 0.9992..1.0000 on the last
15 envelope steps; zonegap-01 §3). The natural suspicion — the deep end is
where primes q with q² ∈ (p'^2−δ, p'^2) have JUST onset, and fresh-onset
strike patterns carve the gap — is REFUTED by exact counting, and the truth
is sharper in the opposite direction:

- **(D1) Tread-free tail [PROVEN; VERIFIED, 24 levels].** Consecutive onset
  treads near the frontier are p'^2 − p² ≥ 4p + 4 apart, so the zone's last
  p'^2 − p² − 1 ≥ 4p + 3 contains NO onset tread at all. The whole stretch
  (p², p'^2) is p's own onset shell: the influencer set is frozen at
  {q ≤ p} (GLOSSARY "Onset shell"). There are no fresh onsets in the deep
  end — a desert, not sparse activity.
- **(D2) The frontier stride bound [PROVEN; VERIFIED, 1,084 (p, δ)
  cells].** For 1 ≤ δ ≤ p'−3, the primes with treads in the CLOSED stretch
  (p'^2−δ, p'^2] are exactly {p'} — uniqueness is forced by square spacing,
  and the count bound #{q : q² ∈ (p'^2−δ, p'^2]} ≤ δ/(2√(p'^2−δ)) + 1 holds
  with room — and p' strikes exactly the two integers p'^2−2 and p'^2 there
  (one multiple of p' in reach, since the stretch is shorter than the
  stride). Of these only p'^2 − 2 lies in the zone (open top). **So the
  total just-onset contribution to the zone's last δ is exactly ONE struck
  integer**, the B-side natal strike p'^2 − 2 (q² ≡ 1 or 19 mod 30, always
  a closer class — natal-onset-01 §1). The general stride lemma behind it:
  any prime q ≥ δ+2 strikes at most 2 integers in any window of length δ.
- **(D3) Youngest-active load [PROVEN; VERIFIED, 24 levels].** The youngest
  active prime q = p makes exactly π(⌊(p'^2−1)/p⌋) − π(p−1) fresh kills in
  its WHOLE zone — the primes in an interval of length (p'^2−p²)/p ~ 4
  above p: measured 2, 3 or 4 at every level to 97. The youngest K primes
  contribute O(K) kills zone-wide.
- **Consequence.** The deep-end loading of Z2 is NOT an onset-front effect:
  fresh onsets are proven absent from the deep end, and the young primes'
  total contribution anywhere in the zone is a handful of kills. What
  remains as the mechanism is zonegap-01 §3's: gap scale grows like ln² of
  height and the top of the zone owns nearly all its length. The
  alternative mechanism is now eliminated by proof, not by measurement.
  Additionally Z2 < p'^2 − p² at all five exact levels [VERIFIED]: the
  binding gap FITS inside the tread-free tail (whether the binding gap's
  interval always lies wholly inside (p², p'^2) is OPEN — u-deciles say
  usually, not always).

## 5. NOT REACHED

- The chain's premise-producing step — any a-priori bound on head, Z2 or
  tail at the window scale — is untouched and is TPC-strength; this note
  aims the target, it does not fire at it.
- The Φ* transplant (§3.4) is verified at three levels and stated for
  general p without a written general proof of the regime boundaries; the
  proof is Theorem 3's verbatim with W ↦ p'^2 and deserves five lines in a
  future pass, not a claim here.
- The co-edge window bookkeeping (§3.2) is derived and unused; whether an
  edge-isolation bound could run the head inequality in the OTHER direction
  was not attempted.
- Deep-end verification stops at p = 97 and δ ≤ p'−3 (LIGHT budget); the
  desert statement (D1) is fully general by the square-spacing argument,
  but δ beyond ~p' needs the stride lemma's window condition re-examined.
- No statement anywhere about WHERE survivors sit; every proven item here
  bounds destruction or restates certification. The supply question is the
  postulate, unchanged.

---

*Producer and custody: `research/zonegap-02-reduction.js`, embedded
(`node research/qc/embed.js --check` passes bit-honest). Calibration inside
the run: G2(p#) recomputed by full cyclic tile scan at p = 7..17 and asserted
against the G2-STATE §2 ladder (30/42/66/108); Z2(11) = 30 and Z2(13) = 30
asserted against zonegap-01 §5's ratios; abort on any mismatch before any new
figure is produced. Cited figures: G2 at 19, 23 (ladder, 150/204), the
unified floors (attack-anchored-01/02), the measured scales in §2's table
(zonegap-01 §§3-6), 4.2665 (beta2-note via ZONE-POSTULATE §3) — none
recomputed here, per the standing compute rule.*
