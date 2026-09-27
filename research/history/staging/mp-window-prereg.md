# Pre-registration: the M_p FORMULA bands at a second fresh anchor

<!-- ledger
id: Q-mp-window-prereg
status: OPEN
todo: none
question: Do the M_p FORMULA bands hold at a second fresh anchor?
verdict: Pre-registration only, sealed and committed alone before the measuring producer exists: the window, the population, the zero-new-parameter formula, all 37 band pairs, three scoring criteria and the consequences are fixed here, pinned to the v1 producer's embed fingerprint; nothing is measured.
-->

*(2026-08-20. Sealed BEFORE the producer exists. This file fixes the window,
the population, the predictive formula, all 37 band pairs, the three scoring
criteria and the consequences. The producer that will run the measurement,
`research/attack-mp-derive-02-anchor.js`, does not exist at the commit that
introduces this file, and this file is committed ALONE.)*

## 1. What is being tested

`attack-mp-derive-01.js` (formally embedded; pinned below) found that the
deterministic fold-factor field M_p of `perfold-error-model.md` is, to a
train residual of sd(ln) = 0.177, an arithmetic formula:

> **M_D4(p) = k · W1(θ_p) · exp(−δ · θ_p/m̄_p)**, with
> **W1(v) = ∏_{q|v} (q−2)/(q−4) · ∏_{q|v−2 or q|v+2} (q−3)/(q−4)** over primes
> 5 ≤ q < p (the exact endpoint comb — zero parameters), m̄_p = 6·∏_{5≤q<p}
> q/(q−2) (analytic, custody-checked against the embedded chain), and
> (k, δ) = (1.9468, 0.2771) fitted by OLS in ln on the 37 pooled folds
> p ≤ 293 only. Equivalently: E[X_p] = kills · (A·k) · W1(θ_p) ·
> exp(−(c+δ)·θ_p/m̄) — the law's own two constants re-estimated with the comb
> in place, no new degree of freedom.

Held out, the formula beat the raw law, the constant-bias rival, the recorded
W0 comb lead, comb-only and depth-only on both existing test sets. But every
existing test set was measured before the formula existed. This prereg buys
the missing kind of evidence: per-fold predictions at an anchor **no fold of
which has ever been measured**, from arithmetic plus two scalars fitted at
other anchors — with NO per-fold measured M entering any band.

## 2. The sealed test

**Window:** `[A, A + 2·10⁹)` at **A = 132,000,000,000 = 1.32·10¹¹**. A is a
multiple of 6 (the engine's anchor requirement) and fresh: `git grep` over the
corpus finds no prior use of 132000000000, 1.32e11 or 132e9.

**Population:** the same 37 folds as `perfold-window-prereg.md` (p ∈ [101,
293]), with λ_model(p, 2·10⁹) VERBATIM from the embedded Stage-4 table of
`attack-perfold-01-error-model.js` (anchor-independent by the law's form).

**Predictive:** X_p ~ PLN(μ_p, s0) with μ_p = λ_model(p, 2·10⁹) · M_D4(p),
s0 = 0.177 (the formula's own train roughness), PLN = Poisson mixed over
lognormal mean e^{s0·u − s0²/2}, u ~ N(0,1). Central bands at 90% and 99.73%
by the PLN quantiles. **Rival for criterion (c):** D0, the constant-bias
field M = b = 0.750 with its own train roughness s0 = 0.563, same PLN form.
The producer must re-derive (k, δ, b, both s0, every μ and every band) from
the embedded artifacts at full precision and abort if any sealed integer
below moves.

The sealed bands (from the embedded Stage 7 of `attack-mp-derive-01.js`):

|   p | λ_model | μ_D4 | 90% band | 99.73% band |
|----|---------|-------|----------|-------------|
| 101 | 269.37 | 204.94 | [146, 274] | [111, 351] |
| 103 | 281.59 | 221.14 | [158, 296] | [120, 378] |
| 107 | 226.77 | 146.69 | [104, 198] | [77, 254] |
| 109 | 236.81 | 157.89 | [112, 212] | [84, 272] |
| 113 | 192.42 | 291.52 | [210, 388] | [161, 496] |
| 127 | 115.64 | 222.36 | [159, 297] | [121, 380] |
| 131 | 95.20 | 96.69 | [67, 132] | [49, 170] |
| 137 | 77.56 | 45.88 | [30, 65] | [20, 85] |
| 139 | 81.09 | 49.25 | [32, 69] | [22, 90] |
| 149 | 52.33 | 78.20 | [53, 107] | [38, 139] |
| 151 | 54.72 | 83.86 | [58, 115] | [41, 148] |
| 157 | 45.25 | 56.18 | [37, 78] | [26, 102] |
| 163 | 37.57 | 24.94 | [15, 37] | [9, 49] |
| 167 | 31.67 | 26.80 | [16, 39] | [10, 52] |
| 173 | 26.48 | 33.69 | [21, 48] | [13, 64] |
| 179 | 22.22 | 28.48 | [17, 41] | [10, 55] |
| 181 | 23.20 | 30.42 | [19, 44] | [12, 58] |
| 191 | 15.78 | 6.32 | [2, 11] | [0, 16] |
| 193 | 16.50 | 6.75 | [3, 12] | [0, 17] |
| 197 | 14.10 | 7.14 | [3, 12] | [0, 18] |
| 199 | 14.73 | 7.62 | [3, 13] | [1, 19] |
| 211 | 10.11 | 22.81 | [13, 34] | [8, 45] |
| 223 | 6.98 | 3.03 | [0, 6] | [0, 10] |
| 227 | 6.00 | 2.26 | [0, 5] | [0, 8] |
| 229 | 6.30 | 2.42 | [0, 5] | [0, 9] |
| 233 | 5.45 | 4.46 | [1, 8] | [0, 13] |
| 239 | 4.68 | 4.45 | [1, 8] | [0, 13] |
| 241 | 4.89 | 4.75 | [1, 9] | [0, 13] |
| 251 | 3.49 | 2.09 | [0, 5] | [0, 8] |
| 257 | 3.01 | 1.26 | [0, 3] | [0, 6] |
| 263 | 2.61 | 1.93 | [0, 5] | [0, 8] |
| 269 | 2.26 | 1.86 | [0, 4] | [0, 7] |
| 271 | 2.36 | 1.98 | [0, 5] | [0, 8] |
| 277 | 2.05 | 1.40 | [0, 4] | [0, 6] |
| 281 | 1.80 | 0.49 | [0, 2] | [0, 4] |
| 283 | 1.86 | 0.52 | [0, 2] | [0, 4] |
| 293 | 1.36 | 1.15 | [0, 3] | [0, 6] |

## 3. Scoring, fixed now

- **(a)** HIT needs **≥ 28 of 37** folds inside their 90% band.
- **(b)** HIT allows **at most 1 of 37** outside its 99.73% band.
- **(c)** the discrimination criterion: total PLN log-likelihood of the 37
  measured X under the D4 formula predictive minus the same under the D0
  constant-bias rival is **> 0** (each with its own s0 as declared).

Expected values if the blind-updated MEASURED field (the incumbent NB
predictive of `perfold-error-model.md`, pools updated with the 6.6·10¹⁰
window) is the truth: in-90 = 34.6 of 37, in-99.73 = 37.0 of 37, margin
= +23.6 nats. So the rule is not tuned to pass trivially: it passes if and
only if the formula's arithmetic carries most of the field at a never-seen
anchor.

## 4. Consequences, fixed now

- **HIT on (a), (b) and (c):** the formula field transfers to a fresh anchor
  with no per-fold measured input. The derivation grade set in
  `mp-derivation.md` stays **PARTIAL** (the residual sub-field — far-tail
  flattening, fold 631, four flagged folds — is real and underived); what the
  HIT adds is that the comb W1 plus the recalibrated constants is a
  *predictive* object, not a post-hoc fit. Formula bands may from then on be
  quoted as the RIVAL line in future window preregs; they do NOT replace the
  measured-field NB bands, which stay sharper.
- **(a) and (b) pass but (c) fails:** the formula is compatible but this
  window cannot separate it from a constant field; record as consistent, not
  confirmed; no grade moves.
- **MISS on (a) or (b):** the formula does not transfer across anchors at
  per-fold resolution; `mp-derivation.md` regrades the derivation from
  PARTIAL to LEAD, and the field keeps its "measured, not derived" clause
  unchanged.
- The window's other statistics (last L ≥ 2 fold, N2, ΣX) are recorded for
  the record but NOT scored here.

## 5. Custody

Every input to the sealed table is a deterministic function of artifacts
already committed: the embedded OUTPUT blocks of
`attack-perfold-01-error-model.js`, `attack-perfold-02-blindwindow.js`,
`foldL-window5-01-extinction.js`, `attack-foldL-06-scaling.js`,
`import-stein-01-multikill.js`, `import-thinning-03-deepfolds.js`. The
deriving producer `attack-mp-derive-01.js` is not yet committed at the seal
(this file is committed alone, per the standing rule); it is pinned here by
its formal embed fingerprint, so the exact code and output behind the table
are fixed byte-for-byte:

```
attack-mp-derive-01.js  code-sha256 248c8c887aeacec404c5765e10e129c66527e63e9bebb1d4cabbb04e5a181d7f
                        out-sha256  856d0519823561926b61cadf56017223fa10e2da62df4d6d86d50fe711e9af14
```

The measuring producer will be `research/attack-mp-derive-02-anchor.js`,
carrying the record engine of `attack-foldL-06-scaling.js` (as
`attack-perfold-02-blindwindow.js` did), with a Stage A that must reproduce
the embedded [0, 2·10⁹) calibration digit for digit and a Stage B that must
re-derive every sealed band above before the fresh anchor is touched.
