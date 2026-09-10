# Per-fold error model — pre-registration of the blind fold-factor band test at a fresh anchor

<!-- ledger
id: Q-perfold-window
status: OPEN
todo: none
question: Does the negative-binomial per-fold error model's band hold at a fresh blind anchor, after the extinction law's +/-3 sqrt(lambda) clause failed at the fifth window?
verdict: Pre-registration only, committed alone before the producer existed: the population is fixed in advance at the 37 folds p >= 100 with predictive mean or lambda_model at least 1, and the bands are printed verbatim from the model's embedded Stage 4; nothing here is measured.
-->

*Staging note, pre-registration only. Nothing here is a measurement and nothing
here is integrated into a live document. Written and committed alone, before the
producer `research/attack-perfold-02-blindwindow.js` exists, so the commit graph
carries the order. Calibration marked on every claim: PROVEN, VERIFIED by exact
computation, MEASURED, PREDICTED.*

## 0. What fires, and what is being tested

The extinction law's per-fold `±3√λ` clause FAILED at the fifth window (32 of 74
folds inside = 43.2% against the registered 90%, `foldL-window5.md` D3), while
every aggregate clause landed. `research/attack-perfold-01-error-model.js`
(formally embedded, 2026-08-20) identified the surviving per-fold error model
against three calibrated synthetic controls and two held-out windows:

> **X_p ~ Poisson(λ_model(p, Y) · M_p)**, with **M_p a deterministic factor of
> the fold** — identical across window lengths (fold-factor deviance
> G/df = 0.98 on six windows) and across anchors (anchor-replicate
> χ²/df = 1.17 on the 2e9 pair, against 11.6 under window-level mixing) —
> MEASURED, not derived. `M_p = λ_derived/λ_model` at all 8 comparable folds of
> `import-stein.md` §2.4, so the per-fold failure is first-moment roughness the
> smooth law misses, not super-Poisson noise. sd(ln M) = 0.56 over the 43
> best-measured folds; range [0.19, 2.23].

The model's predictive for a window that has never been run is a negative
binomial with the fold's own pooled exposure over the six embedded windows:

> `X_p ~ NB(r = Sx_p + 1/2, q = λ_h/(λ_h + Sλ_p))`,
> `Sx_p = Σ X_p` and `Sλ_p = Σ λ_model` over the six embedded windows,
> `λ_h = λ_model(p, 2·10⁹)`.

This note fixes the blind test of those bands at a window that does not exist
anywhere in the corpus, and writes every number the run will be scored against
before the producer exists. Units on both sides: counts of adjacent kill pairs
per fold (dimensionless integers); λ is the expected count.

## 1. The window, stated before the run

**Anchor `A = 66,000,000,000` (= 6.6·10¹⁰, a multiple of 6), length
`Y = 2·10⁹`, fold ceiling 1499, engine conventions of
`attack-foldL-06-scaling.js` verbatim.** No window in the corpus has used this
anchor. The window is run at this anchor and scored at this anchor. No second
anchor is run before the verdict is written, and no second anchor may be used
to overturn a miss.

The producer is a copy of the scaling record's chunked streaming engine. Its
Stage A must reproduce, digit for digit, the embedded `[0, 2·10⁹)` calibration
figures of `attack-foldL-06-scaling.js` (X at folds 7, 23, 29, 421; N2 = 37;
Σ X = 20,317,943; last L ≥ 2 fold = 421) and abort on any mismatch, and its
Stage B must reproduce this note's prediction table from the embedded artifacts
before Stage C measures anything. PREDICTED wall time: ~10 s sieve at an idle
machine, up to ~60 s under load.

## 2. The predictions, verbatim from the embedded Stage 4 of `attack-perfold-01-error-model.js`

The population is fixed in advance: the 37 folds `p ≥ 100` with predictive mean
≥ 1 or `λ_model ≥ 1`. The bands are central intervals of the NB predictive
(discrete, so nominal coverage is ≥ the stated level). `P(old clause)` is this
model's own predicted probability that the fold lands inside the REGISTERED
Poisson clause band `λ_model ± 3√λ_model` — printed as contrast, not scored.

```
  p    lam_model   Sx      Slam      pred.mean   90% band     99.73% band   P(old +-3sqrt clause)
  101    269.37   29454   30199.0     262.73   [236, 290]    [215, 313]    1.00
  103    281.59   31072   31569.2     277.16   [250, 305]    [228, 329]    1.00
  107    226.77   14490   25423.6     129.25   [111, 148]    [96, 165]     0.00
  109    236.81   15451   26548.7     137.82   [119, 158]    [104, 175]    0.00
  113    192.42   29916   21572.3     266.85   [240, 294]    [219, 317]    0.02
  127    115.64   22880   12964.4     204.09   [181, 228]    [162, 248]    0.00
  131     95.20    8096   10672.4      72.22   [58, 87]      [48, 99]      0.78
  137     77.56    6174    8695.5      55.08   [43, 68]      [34, 79]      0.68
  139     81.09    6796    9091.5      60.62   [48, 74]      [39, 85]      0.78
  149     52.33    8135    5867.1      72.57   [59, 87]      [48, 100]     0.60
  151     54.72    8742    6134.5      77.98   [64, 93]      [53, 106]     0.44
  157     45.25    4880    5073.2      43.53   [33, 55]      [25, 65]      1.00
  163     37.57    2407    4211.6      21.47   [14, 29]      [9, 37]       0.65
  167     31.67    2885    3550.5      25.74   [18, 34]      [12, 42]      0.99
  173     26.48    4822    2968.3      43.02   [32, 54]      [25, 64]      0.42
  179     22.22    4061    2490.7      36.23   [27, 46]      [20, 56]      0.53
  181     23.20    4253    2601.5      37.94   [28, 48]      [21, 58]      0.48
  191     15.78     627    1769.2       5.60   [2, 10]       [0, 14]       0.81
  193     16.50     715    1849.3       6.38   [3, 11]       [0, 15]       0.76
  197     14.10     868    1581.1       7.75   [3, 13]       [1, 17]       0.98
  199     14.73     877    1651.2       7.83   [4, 13]       [1, 17]       0.95
  211     10.11    2521    1133.2      22.49   [15, 31]      [10, 38]      0.27
  223      6.98     339     782.7       3.03   [1, 6]        [0, 9]        1.00
  227      6.00     237     673.0       2.12   [0, 5]        [0, 8]        1.00
  229      6.30     249     705.8       2.23   [0, 5]        [0, 8]        1.00
  233      5.45     428     610.9       3.82   [1, 7]        [0, 11]       1.00
  239      4.68     442     525.2       3.95   [1, 7]        [0, 11]       1.00
  241      4.89     520     548.0       4.64   [1, 8]        [0, 12]       1.00
  251      3.49     208     390.9       1.86   [0, 4]        [0, 7]        1.00
  257      3.01     189     337.8       1.69   [0, 4]        [0, 7]        1.00
  263      2.61     309     292.4       2.76   [0, 6]        [0, 9]        0.99
  269      2.26     201     253.7       1.80   [0, 4]        [0, 7]        1.00
  271      2.36     237     264.5       2.12   [0, 5]        [0, 8]        0.99
  277      2.05     141     229.8       1.26   [0, 3]        [0, 6]        1.00
  281      1.80      38     201.4       0.34   [0, 1]        [0, 3]        1.00
  283      1.86      59     208.7       0.53   [0, 2]        [0, 4]        1.00
  293      1.36     158     152.3       1.41   [0, 4]        [0, 6]        0.98
expected count inside the 90% predictive bands = 34.6 of 37
```

**Expected counts under the model, fixed here:** 34.6 of 37 inside the 90%
bands; 28.1 of 37 inside the old Poisson clause (76%, still below the 90% that
clause demands). **Expected under the refuted rival** (i.i.d. NB mixing per
window, k ≈ 3.5): the fold-factor bands are then mis-centred and
Poisson-narrow, and control C of the embedded battery measured their coverage
at 56–59%, i.e. ≈ 21.5 of 37. The test separates the two by ~13 folds.

## 3. The scoring rule, stated before the data exists

Read off the 37 listed folds at anchor A = 6.6·10¹⁰ only.

- **(a)** at least **28 of 37** folds lie inside their listed 90% band;
- **(b)** at most **1 of 37** folds lies outside its listed 99.73% band.

**HIT** requires both. **MISS** is either failing.

Under the model, (a) fails with probability < 0.2% (binomial, 37 trials at
≥ 0.90 each) and (b) fails with probability ≈ 0.5%; under the rival, (a) holds
with probability < 2%. So a HIT is evidence for anchor-transferability of the
fold factor at Poisson precision, and a MISS is a real miss, not band luck.

### What HIT does

- The fold-factor error model moves from held-out-validated (windows 2e10 and
  2e11 scored by an estimator fitted on the smaller windows) to
  **blind-validated at a fresh anchor**. It stays MEASURED; M_p has no
  derivation, only the comb-weight correlation (0.654) as a mechanism lead.
- The per-fold clause of the extinction law should be REPLACED in any future
  window prereg by the NB predictive bands of §0, with the old `±3√λ_model`
  clause retired as REFUTED (it was scored at window 5 and failed; this note
  predicts it keeps failing).
- Nothing about the law's aggregate statistics, its grade (WEAKENED, set by
  prior art), or H″ moves. This is an error model, not progress on the target.

### What MISS does

- **(a) fails**: the fold factor is not anchor-transferable at Poisson
  precision; the surviving description falls back to i.i.d. NB with k ≈ 3.5,
  and `perfold-error-model.md` must say so in its verdict block.
- **(b) fails alone** (two or more 99.73% escapes with (a) holding): a heavy
  tail the mixture candidates would own; the PLN/NB comparison of the embedded
  battery is then re-read on the new window before anything is written.
- A MISS says nothing about the aggregate law, whose five-window record is
  untouched by any outcome here.

### What is registered as not scored

The old Poisson clause count (expected 28.1 of 37, printed for contrast). The
folds below p = 100 (alternation-capped, the record refuses to predict them).
All aggregate statistics (N2, S1, ΣX, extinction fold) — this window is a
per-fold test only; its aggregates are printed for the record. Everything above
p = 293.

## 4. Reproduction

```
node research/qc/embed.js --check --timeout 400 research/attack-perfold-01-error-model.js
node research/attack-perfold-02-blindwindow.js     # the producer; does not exist at commit time
```

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
