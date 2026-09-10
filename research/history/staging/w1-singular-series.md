# W1 is the Hardy–Littlewood singular series in disguise: the identity is exact, and the comb now has a canonical name

<!-- ledger
id: Q-w1-singular-series
status: ANSWERED
todo: none
question: What is the endpoint comb W1 in the literature's terms?
verdict: W1 is exactly the Hardy-Littlewood singular-series ratio for (0, 2, v, v+2) over the twin series squared, truncated to the folded primes and normalised by a v-independent constant, PROVEN algebraically and VERIFIED as exact BigInt-rational equality, so the fold-factor comb is the twin-twin correlation comb evaluated at v = theta_p.
-->

*(2026-08-21. Staging note; nothing here is integrated into a live document.
Producer, formally embedded: `research/attack-w1hl-01.js` (0.2 s, no sieving;
per-fold W1/θ table parsed from `attack-mp-derive-01.js`'s committed embed,
code-sha256 248c8c88…, custody-pinned before use). Calibration marked on every
claim: PROVEN, VERIFIED by exact computation, MEASURED, PREDICTED, ABSENT-WITH-
CONVENTION. Salvage note: the producer is the orphaned predecessor's script,
audited here — its embed verified bit-honest by `embed.js --check` (code,
body and out-sha256 all match), its ν-case table independently confirmed by
the red team's own 182/182 brute enumeration
(`redteam-0820-night-empirical.md` §T1.a), and every figure its READINGS
quote appears in its OUTPUT block.)*

## 0. The answer

`mp-derivation.md` §1 derived the endpoint comb
W1(v) = ∏_{q|v}(q−2)/(q−4) · ∏_{q|v±2}(q−3)/(q−4) over folded primes
5 ≤ q < p from the forbidden set {0, −2, −v, −v−2} mod q, and flagged
NOT-REACHED on its prior-art position. The flag closes:

> **W1 is exactly the Hardy–Littlewood singular-series ratio
> 𝔖(0,2,v,v+2)/𝔖(0,2)², truncated to the folded primes and normalised by a
> v-independent constant.** Per prime q ≥ 5 the HL local-factor ratio
> r_q(v) = (1 − ν_q/q)/(1 − 2/q)² divided by its generic value
> q(q−4)/(q−2)² equals W1's factor as an identity of rationals; over any
> cutoff P and any v with 6 | v,
> ∏_{5≤q<P} r_q(v) = C_P · W1_P(v) with C_P = ∏ q(q−4)/(q−2)², and with
> q = 2, 3 included the full-series form is
> **𝔖(0,2,v,v+2)/𝔖(0,2)² = 6 · C_∞ · W1_∞(v)** on 6 | v (𝔖₄ = 0 off it,
> and every θ_p has 12 | θ, so the fold field never leaves the domain).
> **[PROVEN algebraically + VERIFIED as exact BigInt-rational equality]**

So the fold-factor field's comb half, M_p ∝ W1(θ_p), is the HL **twin-twin
correlation comb**: the conjectural enhancement of two twin pairs at distance
v over independent twins, evaluated at v = θ_p. The quadruple (0, 2, v, v+2)
is two twin pairs at distance v, and the forbidden set of `mp-derivation.md`
§1 is that quadruple's local condition, prime by prime.

## 1. What the producer verifies, exactly

All in `attack-w1hl-01.js`, elementary arithmetic, BigInt rationals, nothing
re-sieved:

- **ν-case table** [VERIFIED]: ν_q(0,2,v,v+2) = 2 iff q | v, 3 iff q | v±2,
  4 otherwise, brute residue count vs the case formula on 1147 (q, v) pairs,
  q ∈ [5, 97], classes mutually exclusive; q = 3 gives ν = 2 iff 3 | v and
  ν = 3 (𝔖₄ = 0, inadmissible) otherwise; q = 2 gives ν = 1 on even v.
- **Per-prime identity** [VERIFIED, exact]: r_q/gen_q ∈
  {(q−2)/(q−4), (q−3)/(q−4), 1} for all 167 primes q ∈ [5, 1009]; the q = 2, 3
  factors contribute the v-independent constant 2 · 3 = 6 on 6 | v.
- **Field custody** [VERIFIED]: the HL-ratio path (independent brute-ν route)
  equals the recorded divisibility-comb W1 as exact rationals at 12 folds
  spanning the field (101 … 709; e.g. W1(θ_211) = 128/21, W1(θ_631) =
  2380/429) and reproduces ALL 102 embedded per-fold W1 values of
  `attack-mp-derive-01.js` to the printed 2 decimals (worst |dev| = 0.0050,
  printing precision, at p = 251).
- **Truncation pricing**: W1's cutoff at q < p differs from W1_∞ only in
  primes q ≥ p dividing θ(θ² − 4) — q = p itself always (p | θ ∓ 2η, factor
  (p−3)/(p−4)) plus any prime factor > p of p − η ± 1: a 1 + O(1/p) per-fold
  correction, absorbed by the law's smooth normalisation.

## 2. The Gallagher block: what imports, priced

- **Per-prime mean-one** [VERIFIED, exact]: the average of r_q(v) over v mod q
  is exactly 1 at every prime (q = 2, 3 included, inadmissible classes
  contributing 0). This is the local skeleton of Gallagher's theorem —
  singular series average to 1 (Soundararajan, arXiv:math/0605696, p. 9
  eq. (3), page image read 2026-08-21; Gallagher 1976 behind it). **Import
  priced honestly: Gallagher's actual theorem averages 𝔖 over ALL k-element
  subsets of [1, h] as h → ∞. Our object is a one-parameter fixed-shape
  family, which his statement does not cover; the per-prime computation in
  the producer does the whole job for our case and the theorem supplies the
  convention's name, not the result.** The refined all-subset asymptotics are
  Montgomery–Soundararajan 2004; structured sums of singular series (large
  sets; entries in arithmetic progressions) are Kuperberg arXiv:2210.09775
  and arXiv:2301.06095 — none of them index the argument by shifted primes.
- **Prime-indexing shifts the mean** [PROVEN + VERIFIED, exact]: on the fold
  field v = θ_p = 2(p − η), the class p ≡ 0 mod q is empty, which kills one
  of the two q | v ± 2 classes; the per-prime mean over admissible classes is
  exactly 1 + 3/((q−1)(q−4)) (both η), NOT the integer-indexed
  (q−2)²/(q(q−4)). Products: E_p[W1_∞] = 2.3252 (prime-indexed) vs
  E_v[W1_∞] = 2.5197 (integer-indexed).
- **The field's mean lands on the zero-parameter prediction** [MEASURED]:
  measured mean W1 over the 102 embedded folds = 2.2823 (se 0.120) vs the
  per-fold-truncated prime-indexed prediction 2.3215 — gap −0.33 se. A
  consistency read, not a powered test: θ_p is deterministic, the se treats
  folds as independent draws, and the equidistribution of p mod q behind the
  class weights is Dirichlet, assumed not proven at this scale.
- **What does NOT import** [stated so it is not mistaken for coverage]:
  nothing in the 4-tuple singular-series theory touches δ = 0.277, the depth
  term e^{−δz}, or the far-tail flattening of `mp-derivation.md` §5. The
  singular series constrains v's arithmetic only; the depth residual is
  orthogonal to this identity and stays underived. Second-moment
  singular-series results would bear on an integer-indexed field variance,
  not on the measured per-fold residual sd ≈ 0.18.

## 3. Prior-art position (searched per `SEARCH-CONVENTIONS.md`)

The owning convention is **singular series for prime constellations /
k-tuple local factors / correlations of twin primes**, searched 2026-08-21 on
WebSearch + arXiv full texts, channel calibrated in-session (known positives
retrieved: Gallagher's theorem, Lemke Oliver–Soundararajan 1603.03720, the
Kelly–Pilling trilogy). Position, standard first:

- **STANDARD — the singular series and its ν-case computation.** 𝔖(H) =
  ∏_ℓ (1 − ν_H(ℓ)/ℓ)(1 − 1/ℓ)^{−k} with admissibility 𝔖 ≠ 0 is Hardy–
  Littlewood 1923 (Partitio Numerorum III, Acta Math. 44, Conjecture X's
  apparatus), stated in exactly our local-factor form in Soundararajan,
  arXiv:math/0605696 p. 8 eq. (2) — page image read. Computing ν by cases on
  which primes divide the tuple's difference products is standard in print:
  Goldston–Ledoan, arXiv:0910.2960 §4 p. 6 (page image read) do it for the
  triple {0, d′, d} via Δ = d′d(d − d′), "If p ∤ Δ … ν_D(p) = 3", and their
  eq. (2.2) p. 3 is the pair comb 𝔖(d) = 2C₂ ∏_{p|d, p>2}(1 + 1/(p−2)) —
  the k = 2 analogue of W1's q | v factor. **Nothing in §0's algebra is
  claimable; it is a two-line instance of 1923-vintage theory.** The corpus's
  recorded W0 = ∏_{q|θ}(q−1)/(q−2) is that eq.-(2.2) pair comb — right
  divisor classes, wrong tuple.
- **STANDARD — the quadruple's interpretation.** Under the HL conjecture the
  number of twin pairs at separation v up to x is 𝔖(0,2,v,v+2) · x/log⁴x,
  so 𝔖₄(v)/𝔖₂² is the twin-twin pair correlation at distance v. The ratio
  normalisation by 𝔖² is the standard move of the consecutive-tuples / bias
  literature (Lemke Oliver–Soundararajan, arXiv:1603.03720, for primes).
- **NOT FOUND — the explicit W1 comb on twin-pair separations.** The written
  form ∏_{q|v}(q−2)/(q−4) · ∏_{q|v±2}(q−3)/(q−4) as the twin-twin
  correlation, or any divisor-modulated law for gaps between twin primes,
  was not found; searched in the owning convention (twin-prime pair
  correlations; gaps/separations between consecutive twin primes;
  LOS-bias analogues for twins) per `SEARCH-CONVENTIONS.md`. Three adjacent
  works checked at full text: **(i) Kelly–Pilling, arXiv:hep-th/0108241v1
  (full HTML read 2026-08-21): separations between consecutive twins are
  exponential, slope m ≃ 1.321/log π₁(N), HL invoked only for the slope's
  decay — the paper contains NO divisor-dependent factor. The predecessor's
  negative ("exponential separation law but no comb") is RE-VERIFIED at
  source.** Same for the trilogy's abstracts (math/0103191, math/0104205,
  math/0106223). (ii) Sahoo, arXiv:2111.09053v3 (full HTML read): three
  empirical biases in twin distribution, the third on the difference D of
  consecutive twin pairs ("D±1 is more likely to be a prime than an odd
  composite") — purely empirical, 30M pairs, explicitly no formula; an
  observed shadow in the comb's neighbourhood, no comb. (iii) the
  math.GM item arXiv:1703.08039 (PDF retrieved, extraction poor): counting
  methodology, no separation comb found in the legible portions.
  A negative here carries the usual weight of a one-session literature
  sweep, not of an exhaustive one; zbMATH/MathSciNet were not swept for
  this object (see §5).
- **OURS — the application.** Using the folded-prime truncation of
  𝔖₄(θ)/𝔖₂² as the per-fold field predictor M_p (with the depth term), the
  anchored reading θ = 2(p−η) tying the comb's classes to the divisor
  structure of p−η and p−η∓1, and the prime-indexed Gallagher-type mean
  1 + 3/((q−1)(q−4)) with its field-level −0.33 se hit — none of it found in
  print, all of it elementary given the frame; the value is the application
  to M_p, not the algebra.

## 4. Proposed consequences, for adjudication rather than applied

- `mp-derivation.md` §1's "No prior-art search was run on W1 itself; the
  object is singular-series-shaped and nothing here is claimed as new" can
  now carry: *searched and settled — W1 IS the HL singular-series ratio
  𝔖(0,2,θ,θ+2)/𝔖(0,2)² truncated to the folded primes (exact,
  `attack-w1hl-01.js`); the algebra is standard (HL 1923; Soundararajan
  math/0605696 eq. (2); Goldston–Ledoan 0910.2960 §4), the application to
  M_p is ours; Gallagher-style prime-indexed averaging predicts the comb
  field's mean at −0.33 se with zero parameters (`w1-singular-series.md`).*
- `SEARCH-CONVENTIONS.md` §1 could gain a row: object "the endpoint comb
  W1 / twin-pair correlation at fixed separation", owning convention
  **"singular series for prime constellations; correlations of twin primes;
  gaps between twin primes"**, living at HL 1923 / Soundararajan
  math/0605696 / Goldston–Ledoan 0910.2960; and §3 a row for the
  Kelly–Pilling negative (now full-text, twice verified).
- The vocabulary gain is free: "the endpoint comb" = "the HL twin-twin
  correlation at the fold's θ" is the framing-safe way to present M_p's comb
  half outside the corpus.

## 5. What was NOT reached

- **No page image of Hardy–Littlewood 1923 itself**; Conjecture X is carried
  here through Soundararajan's and Goldston–Ledoan's statements (both at
  page images) and Goldston–Ledoan's reference [3] to Acta Math. 44, 1–70.
- **zbMATH / MathSciNet were not swept** for the twin-separation comb; the
  §3 negative rests on WebSearch + arXiv full texts only. Wolf's early
  twin/cousin-gap preprints (1990s, IFTUWr) were not retrieved and are the
  likeliest place a written comb could still hide.
- **No derivation of δ = 0.277 was attempted** — §2 prices that nothing in
  this import bears on it.
- **The prime-indexed mean's se treats folds as independent**; no attempt to
  price the θ-field's actual correlation structure into that −0.33.

## 6. Reproduction

```
node research/attack-w1hl-01.js                      # 0.2 s, no sieving
node research/qc/embed.js --check research/attack-w1hl-01.js
```

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
