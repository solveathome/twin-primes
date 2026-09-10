# Red team: the Z2 foundation — natal-onset-01, zonegap-01, zonegap-prior-art

<!-- ledger
id: Q-redteam-zonegap-foundation
status: ANSWERED
todo: none
question: Do natal-onset-01, zonegap-01 and zonegap-prior-art, the three artifacts the Z2 pivot builds on, survive an adversarial pass?
verdict: The foundation HOLDS: all four natal-onset claims CONFIRMED, zonegap-01 confirmed at every reachable point by independent code using a different sieve and a different max-gap algorithm, and the prior-art spot checks all confirmed at page image; two prose defects found, both WEAKENED and neither refuted.
-->

*(2026-08-21. Adversarial pass over the three HELD artifacts the Z2 pivot
builds on. Default refuted-until-rederived; independent code in the session
scratchpad; page images for the prior-art spot checks. Verdicts CONFIRMED /
WEAKENED / REFUTED per claim. Producer scripts were NOT edited; only this
file is written.)*

## Verdict line, corrections first

The foundation HOLDS. Two prose defects found, both WEAKENED-not-refuted;
every load-bearing number and identity reached was rederived exactly by
independent code (scratchpad: `rt-natal-verify.js`, `rt-natal-lens.js`,
`rt-zonegap-sweep.js`, `rt-custody.js`; different sieve, different max-gap
algorithm — block-max over a stored opener array, not the producer's deque).

1. **WEAKENED (zonegap-01.md §1): "3,909 rows parsed" is wrong — the TOS
   table parses to 4,051 rows under the producer's own regex** (rerun
   verbatim on `research/tos-twin-gaps-1e16.txt`, sha256 verified
   78767cad...). The figure appears only in the staging prose, not in the
   embedded OUTPUT (whose in-code guard is `>= 3000` plus the 75-starred
   check); every custody consequence (75 starred rows, 1,116 shared sizes,
   0 mismatches) is unaffected and was independently reproduced. Corrected
   sentence: "4,051 rows parsed".
2. **WEAKENED (natal-onset-01.md §4 wording): "Every level's record sits a
   factor 10^6-10^11 beyond its own x^2"** — true for the five comparison
   levels {29..43} (1.43e6..4.49e11), but the table's x = 23 row sits at
   1.44e5. Corrected sentence: "each comparison level's record sits a
   factor 10^6-10^11 beyond its own x^2 (23's sits 1.4e5 beyond)". The
   clean-negative verdict is unaffected.

## 1. TARGET 1 — natal-onset-01: ALL FOUR CLAIMS CONFIRMED

- **(a) q^2 ≡ {1,19} mod 30 mini-theorem: CONFIRMED, rederived over ALL
  residues.** The 8 residues coprime to 30 are {1,7,11,13,17,19,23,29};
  their squares mod 30 are {1,19,1,19,19,1,19,1} — set {1,19}, both in the
  closer classes {13,19,1}; the openers q^2-2 fall in {29,17}, both in
  {11,17,29}. So the first fresh kill q^2 always lands B-side on the
  channel pair (q^2-2, q^2), and onset2 = onset1. Onset3 = q^2 iff q^2-2
  prime: verified for all 22 scour primes (10 yes-rows; lags 88..1162
  match the bound table row by row).
- **(b) live A/B identity: CONFIRMED — it is a theorem of the model, with
  the suspected edge case worked and closed.** In the timeline model a
  member dies exactly once, at its own coordinate, killed by its lpf. An
  A-side kill strikes the opener a at time a; the partner's only possible
  death time is a+2 > a, so no smaller prime can have killed the B side
  FIRST — a strike at position a+2 happens at time a+2 regardless of which
  prime owns it. Hence every A-side channel kill destroys a live pair, and
  a B-side kill (time a+2) finds the pair dead iff the opener is composite
  (died at a < a+2), i.e. destroys a live pair iff the opener is prime.
  Checked mechanically by direct death-time simulation over all 796
  destroyed pairs: 0 violations either side. The identity is exact, not
  approximate, and the "smaller prime" worry dissolves because kill TIME is
  the position, not the killer's size.
- **(c) 1..500 timeline: CONFIRMED — independent sieve (trial division, no
  shared code) reproduces the bound OUTPUT exactly**: all 28 destruction
  rows (time, destroyer, pair, side, factorization), 22 live pairs at 500
  (list identical), window totals 999/796/203, the classical cross-check
  205 total twin pairs below 10^4, the A/B table per-q (kills, dA, dB,
  f_meas), aggregate 539:543, live A:B 2.10, B-pred 246.0, derived null
  2.19, and the mirror conjugation mu(n) = (-2-n) mod 30q EXACT for all 22
  primes both directions. Deepest-tread staircase row re-verified (58
  pairs, 10 survive, 17.2%; prod(1-2/p) over 7..97 = 0.1915).
- **(d) records-vs-x^2: CONFIRMED.** The six LADDER positions match
  `research/exact-g2-ladder.js` verbatim (incl. nmax = 2 at 37). Recomputed
  independently: pos/x#, ln pos/ln x#, pi(sqrt(pos)), pos/x^2, and the
  inter-prime-square fraction agree in every cell (37: q1 = 738173,
  pos - q1^2 = 107482, frac 0.0030), and all four ranks reproduce (4/5,
  3/5, 3/5, 1/5). The x = 37 clean negative stands as stated, modulo the
  wording defect in the verdict line above.

## 2. TARGET 2 — zonegap-01: CONFIRMED at every reachable point

- **(a) independent re-sieve, sample far beyond the brief: CONFIRMED.**
  Own sweep to X = 1e10 (`rt-zonegap-sweep.js`, 25 s): stores every twin
  opener and answers each zone by binary search + sqrt-decomposition
  block-max — a different algorithm from the producer's monotonic deque.
  Results: 27,412,679 pairs (the prereg's stage-1 figure exactly) over
  9,591 zones (confirming the disclosed 9,592-in-prose miscount). Band
  rows 10^0..10^3 match the embedded 1e11 OUTPUT cell for cell (zones
  143/1,061; c3 3.426±0.497 / 3.681±0.362; maxLoad 0.7504/0.7504; worst
  margin 1/5.00e1 / 1/7.06e2; head 0.942/0.684; meanU 0.623/0.672; frac
  u>0.8 0.315/0.308), and the 10^4 band matches the prereg's sha-bound
  stage-1 anchors (8,362 zones, 4.022±0.243, u 0.668, frac 0.274, head
  0.720, load 0.7432, margin 1/3.49e4). All 34 envelope steps to 1e10
  identical (positions AND u values); record ladder == A113274 1..34;
  worst head 0.7218 at p = 659 (head 150); stage-1 fit e = 3.411 and
  E-form 3.281 reproduce, and my OWN-RNG matched-noise controls read truth
  ln^3 as 3.000±0.008 and ln^2 as 2.000±0.007 — the calibration story is
  real, the estimator is unbiased on truth, so the drifting-exponent
  verdict (no single exponent quotable) is the right reading.
  Custody from primary sources (`rt-custody.js`): the inlined REC arrays ==
  OEIS b113274/b113275 rows 1..41 EXACT (fetched fresh; record 42 starts
  1.34e11 > X, so "records 1..41" is the complete set); the TOS file's 75
  starred rows == the OEIS b-files EXACT; first-occurrence diff vs TOS to
  1e9 both directions: 555 sizes, 0 mismatches; the envelope identity
  env(p) == largest record wholly below p'^2 re-verified EXACT at my own
  3,400 zones to 1e9. maxgap-law §8: 7 of 7 reproduce (498..2868).
- **(b) boundary conventions: CONFIRMED, no headline is
  convention-sensitive.** Gap is opener-to-opener — required, since that
  convention is what makes the ladder equal A113274 (verified: my ladder
  reproduces it); closer-to-opener would shift every gap by -2, no
  headline moves. Head from p, strict p < a: the only real choice is
  excluding a = p when p itself opens a twin pair; it changes head by O(1)
  at small p and touches Z2 never in the shared-level table. a+2 < p'^2
  strict vs non-strict is vacuous (a+2 is prime, p'^2 is not). u from
  gapStart vs gapEnd tested side by side in-band: meanU 0.623 vs 0.629
  (10^2), 0.668 vs 0.668 (10^4); frac u>0.8 identical to 3 decimals — the
  deep-end-loading claims survive both conventions.
- **(c) margin ladder + G2 relation: CONFIRMED.** Worst Z2/width per band
  rederived: 1/3.50 (degenerate p = 2), 1/50.0, 1/706, 1/34,900 — the
  ladder's first four rungs exact; the top-band 1/1.66e6 was not re-swept
  (below) but is consistent with record 34 (6,282) against a ~1e10 width
  at the band's bottom. The shared-level table reproduces in every cell
  (widths, Z2, G2/Z2 = 1.00 at p = 2..7, then 1.40..4.12 at 43), and the
  one-line theorem is sound: in the zone, tile twin slots and twin-prime
  pairs coincide (certification both ways), so in-zone gaps are a subset
  of the tile's slot gaps and Z2(p) <= G2(p#).
- **(d) every zone >= 2 pairs: CONFIRMED at the sample** — minimum count 2
  (at p = 2), zero single-pair zones over all 9,591 zones to 1e10; the
  1e11 statement rests on the embedded OUTPUT, whose every reachable
  number checked out.
- **(e) prereg custody: CONFIRMED with one stated limit.** cdd753c
  (2026-08-21 13:49:01) adds exactly one file, the prereg, 63 lines,
  nothing else; the file is byte-identical at HEAD; the sweep's results
  commit is eb0f9c8 at 14:07:11 — 18 min later, consistent with the
  315.7 s run happening after the seal. Git cannot PROVE the run did not
  happen pre-seal; corroborating the honest ordering: 3 of 5 predictions
  MISSED, and the misses share the record-correlation mechanism the doc
  names. Scoring re-checked against the sealed bands: P1 3.930 not in
  [4.05,4.35] MISS; P2 0.728 not in [0.63,0.71] and 0.462 not in
  [0.21,0.33] MISS; P3 0.725 in [0.64,0.80] PASS; P4 0.7272 in
  [0.66,0.80] PASS; P5 3.192 not in [3.38,3.48] and below the E-form 3.261
  (sign flip) MISS — 2/5 exactly as reported.

## 3. TARGET 3 — zonegap-prior-art spot checks: ALL CONFIRMED at page image

Fresh fetches this pass (scratchpad `rt-kw2019.pdf`, `rt-oehl-v1.pdf`,
`rt-A192870.txt`); both PDF sha256s match the survey's §5 table exactly.

- **(a) KW 2019: CONFIRMED.** Capital-T "Theorem" occurs 0 times in the
  pdftotext extraction; the 4 case-insensitive hits are "prime number
  theorem" (x3) and "Dirichlet's theorem". §2 heading is "Heuristics and
  Conjectures". The Generalized Cramér conjecture reads verbatim "Almost
  all maximal gaps Gc(p) satisfy Gc(p) < C_{k,H}^{-1} phi_{k,H}(q)
  log^{k+1} p" (their (20)); Generalized Shanks is the ~ form (21), also
  "almost all"; Gumbel and the O_k(log x) maximal-gap count are in the
  abstract; C_{2,H} ≈ 1.32032363169... sits in their appendix line
  (A005597, A114907) = 2C2 as claimed.
- **(b) arXiv:1411.6582: CONFIRMED.** Abs page: v1 Thu 20 Nov 2014, v2 Sun
  9 Aug 2015, "withdrawn by the author due to a crucial error in Lemma
  8.4". v1 Conjecture 4.1 reads verbatim: "(Twin recursion conjecture).
  There exists at least one pair of twin primes {p̂, p̂ + 2} between the
  squares p2 and p'2 of two successive primes p and p'" (continuing "with
  distance Delta = p' - p such that p^2 < {p̂, p̂+2} < p'^2" — the survey's
  quote is a fair verbatim prefix).
- **(c) A192870: CONFIRMED.** The TPC comment is verbatim ("there is no
  proof that the greatest integer M exists - not even for a subset of
  values of n. If one could find a constructive existence proof, then Twin
  Prime Conjecture as well as Legendre's Conjecture would require just a
  trivial additional step." — Pfoertner edit Sep 15 2021), the HL
  "indication (but not a proof)" comment is present, a(2) = 122, and the
  Raab a(6) > 3005845357 bound with the a(7)..a(10) estimates matches the
  survey's §5 note. One nit, sub-defect: the survey's %N paraphrase drops
  "of any possible pattern" and the "-1 if no such maximum" clause —
  content unchanged.

## NOT REACHED

- **The 1e11 top band was not independently re-swept** (compute budget;
  producer run is 315 s and siblings are building). Everything specific to
  p in [1e5, 316228) — c3 3.930, meanU 0.728, frac 0.462, load 0.7272,
  margin 1/1.66e6, whole-sweep e = 3.192, head 0.7229, the 1,116-size
  first-occurrence count, 27,292-zone postulate minimum — rests on the
  embedded OUTPUT, against which every value reachable at X <= 1e10
  (bands, envelope, anchors, estimator, controls) reproduced exactly.
- First-occurrence diff vs TOS run to 1e9 (555 sizes both directions), not
  the full 1e11 range; TOS beyond its A113274-shared prefix remains
  single-witness, as the producer itself states.
- Prereg RUN-order: git proves seal-alone-before-results-commit; that the
  1e11 sweep did not execute pre-seal is corroborated (3/5 misses), not
  provable from the repository.
- natal-onset: tread table verified at its deepest row + via the identical
  1..500 timeline, not recomputed row by row; the lag distribution and
  A/B-null items the producer itself lists as NOT REACHED stay open.
- Kourbatov 2013 not re-fetched (standing verbatim record
  `lit-pdf-kourbatov-grob.md` cited per the compute rule); Guy, Ribenboim,
  Korevaar, Wolf-1990s stand exactly as the survey's own NOT-REACHED says.
- `node research/qc.js` after writing this file: TOTAL 3, all three in
  sibling files mid-flight (`zonegap-02-reduction.js`,
  `zonegap-03-model.js`: 2 uncited-script + 1 binding-lost) — not this
  pass's findings, left for their authors per the never-touch rule.

---

*History layer: process record, staging. Independent code in the session
scratchpad (`rt-natal-verify.js`, `rt-natal-lens.js`, `rt-zonegap-sweep.js`
at 1e8/1e10, `rt-custody.js`); page images `rt-kw2019.pdf` sha256 7d69b356...,
`rt-oehl-v1.pdf` sha256 f2e29048... See `research/history/CHANGELOG.md` for
the corpus rule.*
