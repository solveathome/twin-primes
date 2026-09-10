# The anchored-cap transplant reaches the quadratic point: the unified cap family is sound on stretch windows, the counting-only certificate dies at 17 on this grid, and depth buys every anchor back to 1499 at a measured falling cost fraction

<!-- ledger
id: Q-quadpoint-transplant
status: ANSWERED
todo: Z2
question: Does the anchored-cap family transplanted onto the stretch window S_Q certify every anchor, and what does the depth cost do with height?
verdict: MEASURED, not asymptotic: every anchor Q = 7..1499 certifies at finite depth (max K* = 21) and K*/pool falls 0.093 → 0.061 over one decade, which decides nothing in either direction; Σ capU_0/C tends to 2, the zone budget's own limit, so lpf-freshness buys a slower approach and not a lower ceiling.
-->

*(2026-08-22. Staging note; nothing here is integrated into a live document.
HELD for the end-of-day adversarial roundup (the red-team cadence rule,
Chris, 2026-08-22). Producer, formally embedded:
`research/attack-quadpoint-01.js` (0.3 s; code-sha256 6cdada1c...,
out-sha256 805f870b...; `--check` passes bit-honest). This executes TODO
item Z's named attack, first instrument: stretch-01 §5 route 1, the
per-prime history-blind cap family of `attack-anchored-01-unify.js`
transplanted from the origin comb to the stretch window S_Q = [Q², Q′²).
Calibration marked per claim: PROVEN, VERIFIED by exact computation,
MEASURED, OPEN. Conventions are stretch-01 §0's and
destroyer-census-01's; pool ascending as in the origin producer.)*

## 0. What the transplant is, in one paragraph

In absolute coordinates every active prime r kills the classes {0, −2},
for every window; the quadratic anchor (Q² mod r) enters through the
cofactor interval m ∈ (Q²/r, Q′²/r), not through the classes. So the
transplant is the origin machinery run verbatim on the window: capU_K(r)
counts candidates v = r·m in S_Q with lpf(m) ≥ r (same-member freshness,
free from the injection) passing the other-member freshness conditions of
the first K actives below r. floor_K = C − Σ_r capU_K is an unconditional
occupancy floor whenever ≥ 1 (distinct fresh strikes destroy distinct
pairs). K*(Q) = least K with floor_K ≥ 1 is the DEPTH COST of certifying
the stretch by caps alone. The QR offset structure (stretch-01 §4) is a
refinement deliberately not used here; this is the floor-zero instrument.

## 1. Soundness [VERIFIED, all 236 anchors Q = 7..1499]

fresh(r) ≤ capU_K(r) at every depth; capU monotone nonincreasing in K;
full-depth floor EQUALS the twin count T at every anchor (the injection is
a bijection at full depth). The origin lemma's structure carries to the
quadratic point verbatim — its proof never used the anchor. Aborts inside
the run: finality (march survivors = twin pairs, per window), freeze (no
in-window lpf above Q), Chris's hand anchors 121→127 and 169→173, S_7
worked by hand (C = 6, T = 4, fresh(7) = 2), occupancy at every anchor.

## 2. The K = 0 certificate on the stretch grid [MEASURED]

Counting alone (capU_0) certifies only 8 anchors {7, 11, 13, 19, 23, 31,
37, 43}; first death already at Q = 17, with revivals to 43, none after.
Weaker and earlier-dying than the zone grid (15 zones to p = 61, death at
67 — destroyer-census-01 §3, cited): expected direction, the stretch is
the zone's deepest and narrowest sub-window. Σ capU_0/C climbs
0.720 → 1.474 across bands to Q = 1499 (0.955 → 1.581 to Q = 10007,
`redteam-0828-quadpoint.js` SEC I). By the capture identity
(`quadpoint-identity-01.md` §1) the ratio is 1 − T/C + CC/C, and CC/C
climbs 0.223 → 0.622 while T/C falls 0.268 → 0.041, so it tends to 2, the
same limit as the zone budget's B/C; lpf-freshness buys a slower approach,
not a lower ceiling [MEASURED]. The limit itself rests on T/C → 0, which
is Hardy-Littlewood-grade and is not proven here.

## 3. The depth-cost curve [MEASURED, the headline, no asymptotic claim]

**Every anchor Q = 7..1499 is certified at some finite depth** — K* exists
everywhere, max K* = 21 — and the cost fraction FALLS on this range:
K*/pool mean 0.093 (Q ∈ [101, 313]) → 0.075 → 0.061 (Q ∈ [1009, 1499]);
absolute K* mean 3.88 → 8.42 → 12.20. Q = 67, where zone-grid counting
dies, needs K* = 1. The hard anchors are the twin-Q minimal-width
stretches (Q = 809: K* = 16; width 4Q + 4), exactly stretch-01 §3's
min-margin owner. 28 anchors past the K = 0 death certify at K* ≤ 3.

## 4. The honest projection — the next question, NOT a result

The margin the certificate must clear is T/C ~ c/ln²(height), falling; each
pool prime removes roughly its Hardy–Littlewood share of the remaining
double-count (the other-member overlap). A crude balance of the two rates
allows the depth family, pool capped at Q, to die a second time far beyond
the present range — or not; the constants decide, and **nothing on
Q ≤ 1499 decides it**. A falling K*/pool over one decade is consistent
with both fates. Named next moves:
- **The decade extension.** Segmented engine, anchors to ~10⁴ (window sieve
  by ascending actives, first-touch; no full lpf table). If K*(Q) bends
  upward relative to the pool, the second death becomes visible; if the
  fraction keeps falling, the balance of constants is worth deriving
  exactly.
- **The proof-side race.** capU_K is a Legendre/Buchstab-type count over an
  interval with K congruence conditions — elementary, no sieve limit
  invoked. An analytic upper bound for Σ capU_K against a lower bound for
  C, with K = K(Q) growing slowly, is the proof-shaped form of this
  instrument; whether the race closes is the wall in this coordinate, and
  no claim is made that it does.
- **The QR refinement.** The caps above are anchor-blind within the window;
  stretch-01 §4's immune classes and character structure are unused. Where
  they enter, if anywhere, is open.

## 5. NOT REACHED / NO CLAIM

- Nothing past Q = 1499; occupancy is already known to 9.0e15 from adopted
  data (stretch-01 §3) and nothing here extends it, bounds Z₂, or argues
  from density (Route B closed; ρ(2) adverse).
- The pool order is ascending-smallest, the origin convention; whether an
  optimized pool (largest-density-first is the same thing here, but e.g.
  per-anchor greedy selection) lowers K* was not tested.
- No analytic bound on capU_K was attempted; §4's race is posed, not run.
- The A/B side split of the caps, and which side owns the double-count,
  were not separated in the output.

---

*Producer and custody: `research/attack-quadpoint-01.js`, embedded
(`node research/qc/embed.js --check` passes bit-honest; three advisory
READINGS figures — 9.0e15, 121, 169 — are cited hand/adopted anchors, per
the FIGURE PROVENANCE block). Cited, never recomputed: the zone-grid
certificate's 15/61/67 (destroyer-census-01 §3), occupancy to 9.0e15 and
the twin-Q min-margin (stretch-01 §3), the unified-cap lemma
(attack-anchored-01-unify.js). History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
