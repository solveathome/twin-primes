# The per-fold error model: a deterministic fold factor, blind-validated at a fresh anchor

<!-- ledger
id: Q-perfold-error-model
status: ANSWERED
todo: none
question: What is the per-fold error model behind the extinction law's +/-3 sqrt(lambda) failure at 43.2 per cent?
verdict: X_p ~ Poisson(lambda_model(p, Y) M_p) with M_p a deterministic factor of the fold, the same number at every window length from 2e7 to 2e11 and at every anchor, MEASURED and not derived, and it holds on a sealed blind test at a fresh anchor.
-->

*(2026-08-20. Staging note; nothing here is integrated into a live document.
Producers, both formally embedded: `research/attack-perfold-01-error-model.js`
(142.0 s) and `research/attack-perfold-02-blindwindow.js` (22.6 s). The blind
test's pre-registration `perfold-window-prereg.md`, same folder, was committed
ALONE at `199dd33` before the producer existed. Calibration marked on every
claim: PROVEN, VERIFIED by exact computation, MEASURED, PREDICTED, REFUTED.)*

## 0. The answer

The extinction law's one missing piece — the per-fold error model whose absence
`foldL-window5.md` D3 records as "±3√λ FAILS at 43.2%" — is:

> **X_p ~ Poisson(λ_model(p, Y) · M_p)**, where **M_p is a deterministic factor
> of the fold**: the same number at every window length (2·10⁷ … 2·10¹¹) and at
> every anchor, MEASURED, not derived. The law's per-fold failure is
> **first-moment roughness the smooth law misses** — the same shape as the
> hot-count systematic already written into the law, one level finer — and NOT
> super-Poisson noise. Around the correct per-fold mean the dispersion is
> Poisson.

The field over the 43 best-measured folds: `sd(ln M) = 0.560`, range
`M ∈ [0.19, 2.23]`, mean `ln M = −0.319`. Its predictive for a window that has
never been run is a negative binomial with the fold's own pooled exposure:

> `X_p ~ NB(r = Sx_p + ½, q = λ_h/(λ_h + Sλ_p))`, `Sx_p, Sλ_p` summed over the
> embedded windows, `λ_h` the model mean at the new window.

**Blind-validated.** At the fresh anchor `[6.6·10¹⁰, 6.6·10¹⁰ + 2·10⁹)` —
pre-registered, producer written after the prereg commit — the sealed bands
scored **HIT: 33 of 37 folds inside the 90% bands (needed ≥ 28; model expected
34.6) and 0 of 37 outside the 99.73% bands (allowed ≤ 1)**. The registered
Poisson clause was predicted to keep failing at 28.1 of 37 and measured
**29 of 37 = 78.4%** against its 90% demand — the model predicts even the way
the old clause fails.

## 1. Units, data and custody

Both sides are counts of adjacent kill pairs per fold per window (dimensionless
integers); λ is the expected count. No existing window was re-sieved: every
X_p, kills, θ, m̄ and model mean is parsed from the embedded OUTPUT blocks of
`attack-foldL-06-scaling.js` (four windows + the 2·10⁹ offset window) and
`foldL-window5-01-extinction.js` (C1, B2, D3), custody-asserted digit for digit
against the embeds' own aggregates (ΣX per window, every N2, the 32-of-74
clause). The model mean at W = 2·10¹¹ is VERBATIM from the window-5 B2 table
for p ≥ 307 and reconstructed for p ∈ [101, 306] from the law's own formula and
the embedded m̄ chains; the reconstruction reproduces the prereg decade sum
(ratio 1.0001), D4's total (1.0001), and **replays the registered clause
exactly: 32 of 74, every printed p ≥ 300 flag matching**. λ at every other
window is λ(p, 2·10¹¹)·Y/2·10¹¹, exact because the model is linear in Y. Fold
universe: the 102 primes in [101, 709].

## 2. The calibrated battery

Three synthetic controls at the real λ grid went through the identical battery
first (sfc32 seeded): **A** pure Poisson, **B** fixed fold factor
(ln M ~ N, σ = 0.6, shared across windows), **C** i.i.d. NB (k = 3) drawn
independently per (fold, window). All four gates PASS: A reads as Poisson
(k → cap, σ = 0.03), B as fold-factor, C as i.i.d. overdispersion. The two
decisive statistics and their control readings:

| statistic | control A | control B | control C | **REAL** |
|---|---|---|---|---|
| anchor-replicate χ²/df (2·10⁹ pair, same length, anchors 0 and 10¹⁰) | 1.15 | 0.99 | **11.63** | **1.17** |
| fold-factor deviance G/df (pooled M̂ per fold, six windows) | 1.09 | 0.89 | **50.09** | **0.98** |

The real data is control B. Window-level mixing — overdispersion as i.i.d.
noise, and with it the block-correlated-noise reading — is **REFUTED**: the
anchor replicate is Poisson-clean at χ²/df = 1.17 where mixing would give ~12.

## 3. Fit / held-out scores

Dispersion fitted on {2·10⁷, 2·10⁸, 2·10⁹, offset}, scored on the held windows
(population: folds with λ ≥ 1). Global bias b = 0.973; i.i.d. NB MLE k = 4.16;
Poisson-lognormal MLE σ = 0.484. Held-out total log predictive likelihood and
central-interval coverage:

| model | 2·10¹⁰ loglik (n=55) | in-90% | 2·10¹¹ loglik, sequential fit (n=74) | in-90% | in-99.7% |
|---|---|---|---|---|---|
| M0 Poisson(λ) | −1693.3 | 24/55 | −15343.1 | 22/74 | 30/74 |
| M1 Poisson(bλ) | −1680.3 | 24/55 | −15128.3 | 22/74 | 33/74 |
| M2 NB(bλ, k) | −251.1 | 51/55 | −411.0 | 68/74 | 74/74 |
| M3 Poisson-lognormal | −251.7 | 50/55 | −417.5 | 63/74 | 74/74 |
| **M4 fold-factor NB predictive** | **−195.3** | **53/55** | **−335.5** | **68/74** | **74/74** |

M4 beats the best i.i.d. mixture by 55.8 nats at 2·10¹⁰ and 75.5 nats at
2·10¹¹. i.i.d. NB with k ≈ 3.5–4.2 is a serviceable approximation — it is the
shadow the M field casts when fold identity is ignored — but it is strictly
dominated, and its mixing interpretation is refuted by §2. The heavy-tail
question is settled the same way: lognormal never beats gamma mixing, and no
fold escaped a 99.73% band anywhere.

## 4. What M_p is

- **[MEASURED] M_p = λ_derived/λ_model.** At all 8 folds where
  `import-stein.md` §2.4 prints the zero-parameter derived first moment at
  2·10⁹, the ratio equals the pooled M̂ within 2 s.e. (8 of 8; e.g. p = 101:
  0.976 vs 0.975; p = 211: 2.189 vs 2.225). So the fold factor is exactly the
  first-moment roughness that P1 already showed carries Poisson-scale
  dispersion (`|X − λ_der| ≤ 3√λ_der` at 97–100%).
- **[MEASURED] The known ~20% hot-count systematic is the same field.**
  Exposure-weighted mean M by band: [100, 200): 0.959; [200, 300): 0.858;
  [300, 500): 0.520 — the deep-decade overprediction (D2's 32 vs 43) is the
  deep tail of the M field, not a separate phenomenon.
- **[MEASURED, mechanism lead only] corr(ln M̂, ln comb-weight(θ_p)) = 0.654**
  over 48 folds, where the comb weight is ∏_{q≥5, q|θ}(q−1)/(q−2) of the
  dominant qualifying gap value θ_p = 2p − 2η. The singular-series comb of the
  qualifying gap values is the natural owner of a deterministic per-fold factor
  (`f-decays.md`'s comb, seen from the fold side); deriving M_p from it is open.
- **Rider, not scored:** the blind window's own extinction fold read 631 — the
  same fold as window 5's, at one-hundredth the length, and above the 2·10⁹
  survival band's 90th percentile. M̂(631) = 4.5 from tiny exposure: folds with
  large M_p fire preferentially at every window, so part of the extinction
  fold's anchor spread is plausibly deterministic too. Worth a look if the
  extinction extreme is ever revisited.

## 5. The blind test, sealed and scored

Prereg committed alone at `199dd33` (window, population, all 37 band pairs,
both criteria, consequences). Producer `attack-perfold-02-blindwindow.js`:
Stage A reproduces the embedded [0, 2·10⁹) calibration digit for digit (11 of
11) so the copied engine is the record engine; Stage B re-derives all 37 sealed
bands from the declared formula exactly; Stage C sieves the fresh anchor;
Stage D scores. **HIT** as quoted in §0. Under the model, criterion (a) fails
with probability < 0.2%; under the refuted i.i.d.-NB rival its expected score
was ≈ 21.5 of 37 (control C measured the rival's coverage at 56–59%), so the
test separated the hypotheses by ~13 folds and landed on the model's side.

## 6. What this does not show

Nothing here proves H″ or touches the exponent, the aggregate law, or its
WEAKENED grade (set by prior art). M_p is MEASURED per fold, not derived; the
comb correlation is a lead, not a mechanism. The model covers the body of the
per-fold distribution at folds with λ ≥ 1; the extinction extreme is a
different statistic and keeps its own clauses. The Poisson-sampler in the
controls is exact below λ = 30 and normal-rounded above, which is immaterial at
the coverage levels used. The clause replay in §1 uses the literal ±3√λ band
(32/74); the Poisson central-99.73% interval gives 30/74 — both fail the same
way. Predictive sharpness at a new window is bounded by pooled exposure: at
Y = 2·10⁹ the bands are near-Poisson because Sλ ≈ 112·λ_h, but a sixth-decade
window (2·10¹²) would get bands ~√(1 + Y/ΣY') wider than Poisson — the honest
price of a measured, underived M_p.

## 7. Proposed consequences, for adjudication rather than applied

- **`prop-thinning-null.md` §5 / §1** (HELD, not edited here): the sentence
  "the per-fold ±3√λ clause holds at only 43.2% … the law's one missing piece"
  can now carry its answer: *the missing piece is found and blind-validated —
  a deterministic per-fold factor M_p (= λ_derived/λ_model), Poisson dispersion
  around it; the ±3√λ_model clause is REFUTED as an error model and any future
  window prereg should quote the NB fold-factor predictive bands instead
  (`perfold-error-model.md`).*
- **`foldL-window5.md` D3's** "overdispersion consistent with D1's systematic"
  reads, in hindsight, exactly right: D1 and D3 are one field at two depths.
- The extinction-law statement gains one clause: counts are
  `Poisson(λ_model·M_p)` per fold; the ~20% aggregate correction is the
  exposure-weighted mean of M over the scored folds.

## 8. Reproduction

```
node research/qc/embed.js --check --timeout 400 research/attack-perfold-01-error-model.js
node research/qc/embed.js --check --timeout 200 research/attack-perfold-02-blindwindow.js
```

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
