# Z2(p) measured at every zone to 1e11: the record envelope in zone coordinates, a margin that runs away, and a prereg scored 2 of 5 with the misses naming the mechanism

<!-- ledger
id: Q-zonegap-Z2
status: PARTIAL
todo: none
question: What is Z2(p), the largest twin-pair gap inside the zone (p, p′^2), measured at every zone to 1e11?
verdict: MEASURED to 1e11 over 27,292 zones: every zone holds at least two twin pairs, Z2 is the record envelope wearing zone coordinates, Z2(p) <= G2(p#) is a one-line theorem with equality only to p = 7, and the zone-local margin runs away like p^2/(3.9 ln^3 p); the pre-registration scored 2 of 5.
-->

*(2026-08-21. Staging note; nothing here is integrated into a live document.
Producer, formally embedded: `research/zonegap-01.js -- 1e11` (315.7 s;
code-sha256 5b6814a5..., out-sha256 2be031a1...). The object and its framing
are Chris's: in the zone (p, p'^2) tile survivors ARE primes, so the twin-slot
gap structure is measurable from prime data alone, and Z2(p) — the largest gap
between consecutive twin pairs inside the zone — is a first-class refinement
of the Zone Postulate. Preregistration sealed before the sweep:
`research/history/staging/zonegap-01-prereg.md`, commit cdd753c. Adopted data:
`research/tos-twin-gaps-1e16.txt` (Oliveira e Silva; provenance in §1).
Calibration marked per claim: PROVEN, VERIFIED by exact computation, MEASURED,
REFUTED.)*

## 0. Conventions (stated once, the producer's header carries the same text)

Pairs are named by opener a; a pair is in zone p iff p < a and a+2 < p'^2;
gaps are opener-to-opener (the A113274 convention); Z2(p) is their max; head
= a_first - p and tail = p'^2 - a_last are boundary slacks counted separately;
u = (gapStart - p)/(p'^2 - p) locates the earliest maximal gap. Width audit:
X = 1e11 < 2^53, no BigInt needed, asserted in-code for X <= 4e15.

## 1. Custody, and one attribution corrected [VERIFIED]

- Engine: one segmented sweep; an independent brute-force engine recomputes
  all 167 zones below 1e6 (count, Z2, gap start, head, tail): IDENTICAL.
- The sweep's running-max ladder == A113274 records 1..41 (all with
  p_end <= 1e11): EXACT.
- **Adopted this pass under the series rule:** Tomás Oliveira e Silva,
  "Gaps between twin primes" (sweet.ua.pt/tos/twin_gaps.html, exhaustive to
  1e16), copied verbatim to `research/tos-twin-gaps-1e16.txt`, sha256
  78767cad d001b1b0 (gz 960e6ae3). Transcription guards in-code: 3,909 rows
  parsed, g monotone, g = 2 or 0 mod 6, and his 75 record-starred rows must
  equal A113274 records 1..75 — they do. The sweep then checks the FIRST
  OCCURRENCE of every gap size against his F(g), both directions: 1,116 gap
  sizes, 0 mismatches (one mismatch voids the adoption, by construction).
- **The brief's pointer said Nicely's twin-gap tables.** Verified against the
  archived trnicely.net (the live domain is squatted spam): Nicely carries
  first-occurrence PRIME gaps and twin-prime COUNTS; the twin-gap
  first-occurrence table is Oliveira e Silva's. He is already trusted in this
  corpus (A113274 records 73-75 are his).
- The envelope identity env(p) = largest published record wholly below p'^2
  holds at ALL 27,292 zones: the object's whole extremal skeleton is
  record-exact against the literature.
- `maxgap-law.md` §8's seven levels (M(x, x^2), x = 211..9973) reproduce
  here 7 of 7 EXACT — the two windows (x, x^2) vs (x, x'^2) happen to bind
  the same gap at all seven.

## 2. The postulate, refined [VERIFIED to 1e11]

Every one of the 27,292 zones holds at least TWO twin pairs (minimum 2, at
p = 2; zones with a single pair: 0). `window-check.js` verified one pair per
zone; the gap sweep gets the second for free.

## 3. Z2 is the record envelope wearing zone coordinates [MEASURED]

The deepest gap sits in the onset shell's deep end, emphatically: the last 15
envelope steps have u = 0.9992..1.0000, the max-position deciles are EMPTY
below u = 0.2, 75% of the mass sits above u = 0.6, and in the top band
(p in [1e5, 316228)) the fraction with u > 0.8 is 0.462. Mechanism: gap scale
grows like ln^2 of height, and the top of the zone holds nearly all of its
length, so for a large zone the binding gap is typically the youngest record
just under p'^2. Consequence: the per-zone series Z2(p) is HEAVILY correlated
across overlapping zones — one physical gap serves thousands of zones — and
must never be fit as independent points (this is what broke three prereg
bands, §6).

## 4. The law, control-calibrated [MEASURED, with the mandatory control]

Naive power fit over 27,267 zones reads e = 3.192. Controls on the same grid,
same estimator, matched noise (sigma = 0.064): truth ln^3 reads 3.000 ± 0.003,
truth ln^2 reads 1.999 ± 0.004, and the deterministic E-form truth a·ln(w/a)
(a = ln^2(p^2)/2C2, w = p^2 - p; the Kourbatov-family shape) reads 3.261. So
the measurement is 58 control-sd away from constant·ln^3, 339 from ln^2, and
sits BETWEEN constant·ln^3 and the E-form: Z2 lives inside the ln^3 family
with a drifting constant, and no single exponent should be quoted (the
one-class lesson replicated; at stage 1 the fit read 3.411 and at 1e8 it read
3.323 — the "exponent" is a range summary, exactly as `maxgap-law.md` found
for c). Band constants c3 = Z2/ln^3 p: 3.426 ± 0.497, 3.681 ± 0.362,
4.022 ± 0.243, 3.930 ± 0.219 (10^2, 10^3, 10^4, top band). The ln^2·lnln
candidate is REFUTED (its "constant" runs 11.60 -> 19.17). The published
guard holds at every zone: max load Z2/(0.76 ln^3 s) = 0.7504 at the gap's
own height, against the record ladder's worst 0.8434
(`research/a113274-gap-records.js`).

## 5. The margin and the G2 relation [MEASURED + one-line theorem]

Whole-tile: window/G2 is FLAT at 3.2-4.5 over the 14 exact levels
(`G2-STATE.md` §2). Zone-local: worst Z2/width per band falls 1/50 (10^2),
1/706 (10^3), 1/34,900 (10^4), 1/1,660,000 (top band) — Chris's
"substantially better numbers" quantified: 5·10^5 times more slack than the
tile's flat 3.5 at the sweep top, diverging like p^2/(3.9 ln^3 p). The only
small ratio is the degenerate first zone, 1/3.50 at p = 2.

Z2(p) <= G2(p#) is a one-line theorem (in-zone pairs are the tile's twin
slots, certified prime below p'^2). Shared exact levels: EQUALITY at
p = 2, 3, 5, 7; then G2/Z2 = 1.40, 2.20, 3.00, 2.08, 1.36, 1.72, 2.32, 3.52,
3.64, 4.12 at p = 11..43. Past level 7 the tile's extremal gap lives beyond
p'^2: Z2 is NOT G2 restricted, and the zone maximum is strictly easier.

**The honest logic.** Proving Z2 + head + tail < width for every p is exactly
the strong Zone Postulate, which is TPC-strength; the weak form is TPC. The
object reframes the wall, it does not evade it (first-moment argument closed;
the max is the wall). What it buys: 27,292 measured levels against 14 exact
tile terms; a classical object with a published guard and living literature
(Kourbatov, A113274, Oliveira e Silva); and the anchored machinery's home
turf. Route B (density advantage) stays closed; nothing here argues from it.

## 6. The head, and the prereg scored 2 of 5 — misses first [MEASURED]

Head: mean head/ln^2 p = 0.7229 vs the HL mean-gap coefficient 0.7574 (4.6%
under); worst head against the Kourbatov ceiling AT HEIGHT p is 0.7218 (at
p = 659, where the record-8 gap of 150 IS the head). The head is a mean-scale
(ln^2) object; Z2 is a max-scale (ln^3-at-p^2) object; the producer's printed
"~8" hypothesis for Z2/head is refuted by its own row (16.6 -> 200.1).

Prereg (`zonegap-01-prereg.md`, sealed commit cdd753c, stage-1 output
sha-bound):

- **P1 MISS**: top-band c3 = 3.930 below the sealed [4.05, 4.35].
- **P2 MISS**: mean u = 0.728 above [0.63, 0.71]; frac u>0.8 = 0.462 far
  above [0.21, 0.33].
- **P5 MISS with a sign flip**: whole-sweep e = 3.192 below [3.38, 3.48] and
  BELOW the E-form read (3.261) where stage 1 had it 0.130 ABOVE.
- P3 PASS: head 0.725 in [0.64, 0.80]. P4 PASS: band max load 0.7272 in
  [0.66, 0.80], guard < 1 confirmed.

The three misses share one mechanism, §3's correlation: stage-1 extrapolation
treated band-to-band drift as independent, and the top band is dominated by a
record staircase it shares with its neighbours. That is the finding: the
prereg bought the exact failure mode a naive Z2 fit would have shipped as a
law. Also disclosed: the prereg prose miscounted stage-1 zones (wrote 9,592;
the sha-bound output says 9,591); predictions unaffected.

## 7. NOT REACHED

- No sweep past 1e11 (records constrain the envelope to 1e19 via A113274,
  but per-zone structure beyond p ~ 3.16e5 is unmeasured).
- No staircase-aware law fit: the right model treats Z2(p) as the record
  envelope at p'^2 plus a below-record correction field; neither the
  correction's law nor its variance was extracted.
- Tail slack got a per-band mean (0.58-0.77 in ln^2(p^2) units) and no more;
  no extremal analysis of the tail.
- The u-distribution's bimodality (dip at u ~ 0.4-0.5, deciles 1516/1424
  against neighbours 2105/4071) is unexplained; no null model was scored
  against it.
- The Oliveira e Silva table beyond 1e11 (to 1e16) is adopted but unused
  except through its guards; its F(g) shape against the E-form is an open
  cross-check.
- Readings-traceability advisory: 12 figures in the READINGS are prose
  reformattings (1/7.06e+2 quoted as 1/706, sealed prereg bands quoted from
  the prereg file); accepted under the advisory's known floor.
