# The fifth window: W = 2·10¹¹ scores the extinction law one decade blind, and it lands

<!-- ledger
id: Q-foldL-window5
status: ANSWERED
todo: none
question: Does the fold extinction law score one decade blind at W = 2e11?
verdict: HIT on all four pre-registered criteria (last fold with L >= 2 measured 631 against band [571, 877]; both counts inside their bands), with the hot systematic now confirmed at five of five windows at measured over predicted about 0.82, which by the prereg's own clause belongs in the law as a known overprediction rather than in the acceptance band.
-->

*(2026-08-19 night. Pre-registration committed alone at `4391c2c` before the
producer existed: `foldL-window5-prereg.md`, same folder. Producer:
`research/foldL-window5-01-extinction.js`, 1228.7 s at nice 15, formally
embedded. The prereg fixed the anchor (A = 0), the sweep ceiling (2999,
scored at the record's 1499), both predictions, all four criteria, and every
consequence, before the run.)*

## 1. The verdict: HIT, all four criteria

| criterion | prediction | measured | verdict |
|---|---|---|---|
| (a) last fold with L ≥ 2 | band [571, 877], median 683 | **631** | in band |
| (b) N2(p ≥ 100) | 80.1, accept [51.2, 108.9] | 69 | in band |
| (c) S1(p ≥ 100) | 80.1, accept [51.2, 108.9] | 70 | in band |
| (d) the sequence | strictly increasing | 181 → 331 → 421 → 457 → **631** | holds |

Crossing at the record's literal c = 1.22 predicted 653 against 631, ratio
0.966. The consequences were fixed in the prereg and apply mechanically: the
rate law's support now spans **five windows and four decades of Y**, still
MEASURED, H″ still UNPROVEN; `paper/proposals/prop-thinning-null.md` §5's
"downgrade toward RETIRED if the rate law misses at a fifth window" does NOT
fire; **the grade does not improve** — WEAKENED was set by found prior art
and a fifth window says nothing about prior art. Writing this HIT up as an
upgrade is the misreading the prereg names.

## 2. The secondary readings, none of which change the verdict

- **D1, the hot systematic, now confirmed at five of five windows**:
  measured/predicted N2 = 0.75, 0.82, 0.87, 0.82, **0.86**. Per the prereg's
  own clause, this now belongs IN the law as a known ~20% overprediction on
  counts, not absorbed by the acceptance band a sixth time. Any future
  window prediction should quote both the raw and the ×0.82-corrected count.
- **D3, the per-fold ±3√λ clause, FAILS**: 32 of 74 folds with E[X] ≥ 1
  inside the band = 43.2% against the registered 90%. The aggregate lands
  while the per-fold dispersion is far wider than Poisson — overdispersion
  consistent with D1's systematic and with the anchor-offset spread the
  record and `null-limsup.md` both measure. A per-fold error model is the
  law's one missing piece; the aggregate statistics are what the law
  predicts well.
- **D2**: the [300, 1000) decade measures 32 against 43 predicted — the hot
  bias concentrated where the counts are; [100, 300) is exact at 37.
- **C3, the range check**: the full sweep to 2999 puts the last fold with
  θ ≤ G₂ at **1039 < 1499**, so the record's old ceiling was never binding
  and the extinction is arithmetic, not a sweep artifact. The §7-style
  disclaimer in the scaling record can be retired.
- **D4, for the record only**: Σ X(p ≥ 100) = 190,961 against the fitted
  model's 2.004e5 (ratio 0.9527) and the Stein-derived pair's 1.917e5
  (ratio **0.9961**). The prereg's §3.5 forbids reading this window as
  evidence between the fitted and derived pairs on the scored statistics,
  and D4's own caption notes the derived λ is not digit-comparable; the
  0.9961 is recorded as a note, not a verdict.

## 3. Custody

Stage A reproduced the whole embedded four-window tail byte for byte
(`embed.js --check` on the scaling producer passed pre-launch), the copied
engine passed 30 of 30 calibration assertions at the raised ceiling, and
ceiling invariance was verified at Y = 2·10⁹ (identical restricted
statistics across 428 folds). Stage B reproduced every prereg number with
one disclosed fourth-significant-digit exception (B0a: the prereg used the
published rounded constants; no scored figure moved). The raw log is
`research/foldL-window5-01-extinction.raw.txt`; the formal embed carries the
stdout stream (chunk progress went to stderr).
