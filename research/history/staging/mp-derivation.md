# The fold-factor field M_p, derived down to its comb: a formula that hit blind at a second fresh anchor

<!-- ledger
id: Q-mp-derivation
status: ANSWERED
todo: none
question: Can the fold-factor field M_p be derived rather than merely measured?
verdict: Its comb structure derives: M_p is about k*W1(theta_p)*exp(-delta*theta_p/mbar_p) with W1 the exact endpoint comb at zero parameters, blind-validated at a second fresh anchor; (k, delta) remain fitted, so this is a zero-parameter derivation of the field's comb structure and not of M_p, and nothing here proves H-double-prime or touches the exponent.
-->

*(2026-08-20. Staging note; nothing here is integrated into a live document.
Producers, both formally embedded: `research/attack-mp-derive-01.js` (0.2 s,
no sieving — every number parsed from committed embeds) and
`research/attack-mp-derive-02-anchor.js` (15.8 s, one fresh 2·10⁹ sieve). The
blind test's pre-registration `mp-window-prereg.md`, same folder, was
committed ALONE at `303711b` before the producer existed. Calibration marked
on every claim: PROVEN, VERIFIED by exact computation, MEASURED, PREDICTED,
REFUTED.)*

## 0. The answer

`perfold-error-model.md` left M_p "MEASURED, not derived" with the comb-weight
correlation 0.654 as its recorded lead. The lead was right, and it sharpens
into a formula:

> **M_p ≈ k · W1(θ_p) · exp(−δ · θ_p/m̄_p)**, where
> **W1(v) = ∏_{q|v} (q−2)/(q−4) · ∏_{q|v−2 or q|v+2} (q−3)/(q−4)** over the
> folded primes 5 ≤ q < p — the **exact endpoint comb** of the two kill
> classes, zero parameters — m̄_p = 6·∏_{5≤q<p} q/(q−2) analytic, and
> (k, δ) = (1.9468, 0.2771) the only fitted scalars. Equivalently, as a law:
> **E[X_p] = kills · (A·k) · W1(θ_p) · exp(−(c+δ)·θ_p/m̄)** with c+δ = 1.359 —
> the law's own two constants re-estimated with the comb in place, and no
> degree of freedom the law does not already carry.

Fitted on the 37 pooled folds p ≤ 293 only, the formula drops the field's
roughness from sd(ln M) = 0.560 to a train residual of **0.177**, beats every
rival on both held-out sets (10–40 nats), and then **hit a pre-registered
blind test at a second fresh anchor**: at `[1.32·10¹¹, 1.32·10¹¹ + 2·10⁹)` —
anchor never used, bands sealed from arithmetic plus the two train scalars,
NO per-fold measured M anywhere in them — it scored **34 of 37 inside the 90%
bands (needed ≥ 28), 0 of 37 outside the 99.73% bands (allowed ≤ 1), and a
+25.4-nat likelihood margin over the constant-bias rival (needed > 0;
predicted +23.6)**. VERDICT under the sealed rule: **HIT**.

**Grade, against the brief's own bar: PARTIAL DERIVATION.** The comb half is
derived with zero parameters and carries the within-depth spread; the two
scalars are refits of constants the law already had; and a real residual
sub-field (sd ≈ 0.18, a far-tail flattening, fold 631, four flagged folds) is
deterministic-looking and NOT derived — §5 names it exactly.

## 1. Where W1 comes from, and why it is not the recorded comb

A slot n of the twin comb dies at fold q iff n ≡ 0 or −2 (mod q). For a PAIR
of slots at distance v the forbidden residue set is {0, −2, −v, −v−2}, whose
size is 4 minus the coincidences: two if q | v, one if q | v−2, one if
q | v+2 (at most one of the three can hold for q ≥ 5). **[PROVEN, elementary
residue counting]** the pair-survival weight of distance v relative to a
generic distance is therefore exactly

> q | v → (q−2)/(q−4);  q | v±2 → (q−3)/(q−4);  else 1,

per fold, which is W1. Since θ_p = 2(p−η), the q | θ class is the divisor
structure of p−η and the q | θ∓2 classes are the divisor structures of
p−η∓1 — the fold's exact arithmetic, in the corpus's anchored sense. The
recorded comb W0 = ∏_{q|θ}(q−1)/(q−2) is the twin-prime singular-series
form: right divisor classes on the θ side, wrong magnitudes, and no θ±2
classes at all. Using W1 as the gap-count weight is a modeling step
(endpoints exact, interior smooth), and everything below is its MEASURED
scorecard. No prior-art search was run on W1 itself; the object is
singular-series-shaped and nothing here is claimed as new.

## 2. The target table, custody first

Producer 01 re-sieves nothing. It assembles the whole measured field from the
embedded OUTPUT blocks (perfold-01's pooled table and Stage-4 pools,
perfold-02's blind X, window-5's B2/C1, the four scaling windows + offset,
import-stein's B2, import-thinning-03's K column) and must reproduce, before
anything is fitted: the 48 printed pooled rows, the recorded 0.654 probe
(got 0.6535), the printed band means 0.959/0.858/0.520, the blind 33/37, the
Slam = 1.1211·λ_{2·10¹¹} identity, the analytic m̄ chain against the embedded
one (worst 0.44%), and the deep pooled M̂ against the printed rows (worst
0.0005). **[VERIFIED, all of it]** The import-stein unification extends from
the record's 8 of 8 to **14 of 14** printed folds. Field = 102 folds in
[101, 709]: TRAIN the 37 with p ≤ 293, TEST the 65 with p ≥ 307 plus the 37
blind-window folds — split declared before any fit.

## 3. The candidate battery, calibrated, and the scores

The identical pipeline first reads two synthetic controls at the real
exposure grid (sfc32 seeded): a planted comb+depth field is recovered
(δ̂ = 0.247 vs 0.25 planted; free exponent β̂ = 1.09 vs 1) and a pure
lognormal field yields neither depth (δ̂ = 0.091) nor a comb advantage
(D4 − D0 = −6.9 nats). All five gates PASS; the run aborts otherwise.

The real field, candidates fitted on TRAIN only, scored on held-out
Poisson-lognormal log-likelihood (each candidate with its own train
roughness):

| candidate | train sd(ln resid) | deep PLN LL (65 folds) | blind PLN LL (37) |
|---|---|---|---|
| M ≡ 1 (the raw law) | 0.634 | −128.2 | −132.4 |
| D0 constant bias b = 0.750 | 0.563 | −118.3 | −133.5 |
| D1 k·W0 (the recorded lead) | 0.494 | −116.2 | −130.1 |
| D2 k·W1 (comb only) | 0.353 | −122.7 | −123.0 |
| D3 k·e^{−δz} (depth only) | 0.535 | −107.8 | −132.1 |
| **D4 k·W1·e^{−δz}** | **0.177** | **−88.6** | **−112.7** |
| D4q curvature variant | 0.180 | −101.6 | −112.8 |

Two mechanisms, both needed, and the free-exponent diagnostic reads
**β = 1.031 on ln W1 where the derivation says exactly 1** [MEASURED]. The
candidate list the brief posed closes as: (i) the comb lead becomes D4;
(ii) the Stein route M_p ≡ λ_derived/λ_model is exact by construction where
λ_derived exists (14/14) but extending λ_derived to all folds without
sieving IS the histogram-derivation problem — it collapses into (i);
(iii) **REFUTED as a field predictor**: K = Ψ/Φ² spans a factor 1.009 across
folds 101/211/421 while M̂ spans 2.28 — the Fold Moment Identity's deviation
does not carry the field; (iv) the divisor structures of p±1, p±2 are
exactly W1's classes and are subsumed.

**The field is a function of θ, not of p** [MEASURED]: the 13 twin-θ pairs
(twin primes share θ) agree at rms |Δln M̂| = 0.155 against 0.764 for
adjacent non-twin pairs — though at 2.25× the Poisson-pull scale, so a
~10–15% non-θ (or anchor-jitter) residual exists.

## 4. The blind test at the second fresh anchor

Sealed before the producer existed (`mp-window-prereg.md`, committed alone at
`303711b`; producer-01 pinned there by its embed fingerprint): window
`[1.32·10¹¹ +2·10⁹)`, the 37-fold population, X_p ~ PLN(λ_model·M_D4, s0 =
0.177), all 74 band integers, and three criteria. Producer 02's Stage A
reproduces the embedded [0, 2·10⁹) calibration 11 of 11 digit for digit (the
engine is the record engine); Stage B re-derives all 37 sealed band pairs
integer-exactly from the committed chain; Stage C sieves; Stage D scores:

> **(a) 34 of 37 in-90 (needed ≥ 28; incumbent-truth expectation 34.6);
> (b) 0 of 37 outside 99.73% (allowed ≤ 1); (c) margin over D0 = +25.4 nats
> (predicted +23.6). HIT.** Misses: 101 (279 vs [146, 274], by 5), 137, 199.
> For the record, unscored: N2 = 39, ΣX = 20,317,819, last L ≥ 2 fold = 397.

This is the evidence class the existing test sets could not supply: every
prior scoring window was measured before the formula existed. It also adds a
third anchor at which the field's per-fold structure is reproduced by one
fixed object — consistent with anchor-constancy, though bands this wide
(s0 = 0.177) do not tighten redteam T1.c's ~6–10% one-replicate jitter bound.

## 5. What fails, exactly (the underived residual, named)

- **The far tail decays slower than the train extrapolation.** δ refit on the
  deep folds alone (diagnostic) reads 0.252 vs the train 0.277; band
  [300,500): predicted 0.423 vs measured 0.520; [500,710): 0.233 vs 0.357.
  The linear-in-z residual decay flattens beyond z ≈ 8, and that flattening
  is the structure a third parameter would chase. (Shallow bands land:
  0.946 vs 0.959 and 0.872 vs 0.859.)
- **Four flagged folds** (|pull| > 3 against the formula): 311 (+3.10),
  331 (+3.21), 409 (+3.28), 631 (+3.36) — all HIGH. 331 and 631 are the two
  comb-loudest deep folds (W1 = 5.26, 5.55), so part of the residual grows
  with W1; 311 and 409 (W1 = 1.22, 1.36) say not all of it does.
- **Fold 631, the twice-seen extinction fold.** D4 makes it comb-loud but
  not the loudest (top expected deep events sit at 541, 547); its two events
  (2·10¹¹ once, the 6.6·10¹⁰ blind window once) are a 2.8·10⁻³ Poisson event
  at that fold under D4 (P = 0.17 that some p ≥ 521 fold shows two). The
  far-tail TOTAL is D4's cleanest deep win: 2 events observed vs 2.30
  expected, against 9.60 for the constant-bias rival (P(N ≤ 2) = 3.8·10⁻³).
  The perfold record's rider — the extinction extreme's anchor spread is
  partly deterministic — survives in sharpened form: W1(1260) = 5.55
  explains a preference for 631, and does not explain two sightings.
- M̂(631) itself: 4.482 on the six-window pool (the record's 4.5), 8.9 with
  the blind event; the formula says 0.338. Tiny exposure, honest tension.

## 6. What this does not show

Nothing here proves H″ or touches the exponent, the aggregate law, or its
WEAKENED grade. W1's use as a gap-value weight is a modeled leading term —
the interior of the gap is treated as smooth — and (k, δ) remain fitted, so
this is not a zero-parameter derivation of M_p; it is a zero-parameter
derivation of the field's comb structure plus a recalibration of constants
the law already owned. The PLN roughness s0 = 0.177 prices the formula's own
residual, so its bands are wider than the measured-field NB bands, which
remain the sharper predictive (the prereg's consequence fixes this: formula
bands are a RIVAL line in future preregs, never the replacement). The deep
TEST folds pool six windows dominated by 2·10¹¹ exposure; per-fold deep M̂
below Sx ≈ 10 is Poisson-limited. And the depth term e^{−δz} is
phenomenological: no mechanism here forces the residual exponent shift
δ = 0.277, and §5's flattening says linear-in-z is itself only a local
description.

## 7. Proposed consequences, for adjudication rather than applied

- **`perfold-error-model.md` §4's** "M_p is MEASURED, not derived; the comb
  correlation is a lead, not a mechanism" can now carry: *the lead closed —
  M_p = k·W1(θ_p)·e^{−δθ_p/m̄} with W1 the exact endpoint comb (zero
  parameters, β = 1.03 measured), (k, δ) the law's own two constants
  re-estimated, blind-validated 34/37 at a second fresh anchor
  (`mp-derivation.md`); the residual sub-field (sd ≈ 0.18, far-tail
  flattening, fold 631) stays measured-only.*
- **`prop-thinning-null.md` §5**: the same sentence-level update where the
  2026-08-20 block says "the comb-weight correlation 0.654 is a lead".
- The law's statement gains the comb clause: the ~20% hot systematic and the
  deep-decade overprediction are the exposure-weighted image of
  k·W1·e^{−δz} − 1, and a comb-aware refit (A·k, c+δ) removes most of the
  per-fold first-moment roughness the smooth law misses.

## 8. Reproduction

```
node research/attack-mp-derive-01.js                      # 0.2 s, no sieving
node research/attack-mp-derive-02-anchor.js               # 15.8 s, one fresh 2e9 sieve
STAGE=predict node research/attack-mp-derive-02-anchor.js # stops before the fresh anchor
node research/qc/embed.js --check research/attack-mp-derive-01.js
node research/qc/embed.js --check --timeout 200 research/attack-mp-derive-02-anchor.js
```

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
