# The delta mechanism and x = 37 through the HL lens: the second singular-series layer IS the residual sub-field, delta itself survives all three candidate families, and 37 stays a G2-side anomaly no comb explains

<!-- ledger
id: Q-delta37
status: ANSWERED
todo: none
question: What sources the depth term exp(-delta*theta/mbar) of the M_p law, and does x = 37 fall out under the Hardy-Littlewood lens?
verdict: None of the three candidate families sources delta, each failing its parameter-free prediction (a source needs tilt slope -0.277 per unit z; the measured flattening is +0.0247); the residual sub-field IS the second singular-series layer (interior 6-tuple comb, zero parameters, correlation 0.907, sd 0.18 to 0.083), and 37 stays a G2-side anomaly no comb explains.
-->

*(2026-08-21. Staging note; nothing here is integrated into a live document.
Producer, formally embedded: `research/attack-delta37-01.js` (0.6 s, no
sieving — every measured number parsed from committed embeds; code-sha256
b134f6ad…, out-sha256 b2b5909b…). Calibration marked on every claim: PROVEN,
VERIFIED by exact computation, MEASURED, PREDICTED, REFUTED, NOT FOUND.
Brief: with W1 identified as the HL twin-twin comb (`w1-singular-series.md`),
score three candidate mechanisms for the depth term exp(−δ·θ/m̄) of
`mp-derivation.md` — each on its parameter-free prediction FIRST, with the
far-tail flattening (0.277 → 0.252) as the discriminating data — and read
x = 37 through the same lens.)*

## 0. The answer

**(a) δ is not sourced by any of the three candidate families.** The scored
verdicts, each parameter-free before any refit (a δ source needs tilt slope
−0.277 per unit z; the measured flattening is φ = +0.0247):

| candidate | predicted tilt (train) | predicted φ | verdict |
|---|---|---|---|
| (iii) finite-size / edge, derived exactly | −0.0024 | +0.0021 | **REFUTED**, 2 orders short (window-edge ≤ 2.5·10⁻⁸ pooled; W1-cutoff tail ≤ 2.0·10⁻²) |
| (i-a) published second moments of 𝔖 | 0 | 0 | **no channel**: θ_p is deterministic and W1 is carried exactly; an ensemble variance prices spread, not a per-fold mean |
| (ii) the derived thinning null's own depth structure | −0.0600 | +0.0764* | right sign, **22% of δ**; custody-licensed (reproduces THN's zero-parameter window totals: 5481.9) |
| (i-b) the interior 6-tuple comb (second 𝔖 layer), exact | −0.0208 | +0.0241 | **8% of δ — but it is the residual sub-field, §2** |

*(φ entries are band-OLS summaries of the prediction; under the record's own
estimators — train OLS + deep Poisson MLE, the only fair comparison — see §3.)*

**But two of the losers, combined, derive the residual sub-field that
`mp-derivation.md` §5 named and left "deterministic-looking and NOT
derived" — with zero new parameters.** Crediting the exact thinning-null
depth structure (ii) plus the exact interior comb (i-b) into the D4 model
and refitting only the law's own two scalars:

- train roughness **sd 0.1715 → 0.0834** (the interior comb alone: 0.0830;
  Pearson correlation of the interior comb with the D4 train residual field
  **0.907**, Spearman 0.842, over the 37 train folds) [MEASURED];
- the far-tail flattening collapses **φ = 0.0247 → 0.0085** (δ′ = 0.1964
  train / 0.1879 deep — nearly flat) [MEASURED];
- **all four flagged folds drop below 3**: 311: 3.10 → 2.63, 331: 3.21 →
  2.22, 409: 3.28 → 2.31, 631: 3.36 → 2.45; deep |pull| > 3 count 4 → 0
  [MEASURED];
- the band table repairs: [300,500) reads 0.480 vs measured 0.520 (D4 said
  0.423); [500,710) reads **0.351 vs measured 0.357** (D4 said 0.233)
  [MEASURED];
- held-out deep PLN improves **+3.6 nats with sharper bands** (model sd
  0.0834 vs the record's 0.177) [MEASURED].

**What remains is a constant-rate exponential δ″ ≈ 0.19–0.20 in θ/m̄, now
nearly depth-stable, and underived.** That is the sharpened open object: not
"δ = 0.277 with a flattening", but a flat ~0.19 that no singular-series
layer, no derived-null drift, and no finite-size term supplies.

**(b) x = 37: the HL layer is unexceptional, cleanly, and the anomaly
localises to G2 being LARGE while h and h2 are exactly normal.** W1_37(528)
= 2.571 sits at 1.044× its exact Gallagher mean, 58th percentile of its own
neighbourhood, mid-pack in a level range [0%, 93%] where the comb-loudest
levels (61, 79 at 1.84×) and comb-mutest (67 at 0.40×, W1 = 1 exactly) are
all non-anomalous. The comb-corrected threshold keeps the full spike
(c2″(37) = 0.5732, 0 of 10 later terms above). Leave-one-out log-midpoint
residuals: **G2 at +2.39 series-noise units, h at +0.14, h2 at −0.10**. With
the anchored/mirror negative (`attack-anchored-01.md` §5), this closes the
**third** unexceptional mechanism family at 37. The spike stays real and
stays unexplained.

## 1. Custody and calibration

Nothing re-sieved. The per-fold field (102 folds, p ∈ [101, 709]) is parsed
from `attack-mp-derive-01.js`'s embedded Stage-6 table; W1 is recomputed
exactly from (p, θ) and matches the printed column at worst 0.0050 (the
printing figure w1hl-01 recorded); the 65 deep Sλ are upgraded to 5-figure
precision from the window-5 B2 embed via the record's own Sλ = 1.1211·λ₁₁
identity; the ladders come from `a144311-full-ladder.js` and
`external-ladders-01.js` embeds with verbatim spot gates. Calibration gates,
all passing before any candidate is scored: the record's (k, δ) = (1.9468,
0.2771) reproduce as (1.9485, 0.2773), deep MLE 0.2526 vs 0.252, the Sλ
column carries the law's fixed exponent (slope −1.0866 vs c = 1.0818
[foldL-06 §3.1]), and the PLN engine lands 0.6 nat from the record's −88.6
(grid-independent input rounding; cancels in every model difference).

## 2. The finding: the interior 6-tuple comb is the residual sub-field

`mp-derivation.md` §1 modeled W1 as "endpoints exact, interior smooth". The
next singular-series layer drops the second half. For a gap of value θ at
fold p, condition each interior slot j ∈ {6, 12, …, θ−6} on the endpoint
quadruple {0, 2, θ, θ+2} being alive: per prime q ∈ [5, p), with the offset
uniform, **[PROVEN, elementary]**

> P(j alive | endpoints alive) / P(generic slot alive)
> = [(q − ν₆)/(q − ν₄)] · [q/(q − 2)],
> ν₆ = |{0, −2, −j, −j−2, −θ, −θ−2} mod q|, ν₄ the endpoint count,

and the first-order correction to the exactly-θ gap count is
exp(−(6/m̄)·D), D = Σ_j (∏_q r_q(j) − 1). The per-prime **mean over a full
residue system of j is exactly 1** (verified in-code at q ∈ {7,13,31,97} ×
θ ∈ {204,660,1260}, and it is one line: E_j[P(j alive | end)] = (q−2)/q
regardless of the endpoint class) — so Gallagher mean-one kills the effect
in the infinite limit, and **the entire correction is the finite interior
range 6…θ−6 breaking equidistribution**: for q > θ/6 the interior slots hit
θ/6 − 1 distinct residues that deterministically exclude the two strongest
enhancing classes (j ≡ 0 and j ≡ θ). It is the same mechanism shape as the
prime-indexed mean shift of `w1-singular-series.md` §2, one layer up.

This zero-parameter arithmetic field, evaluated exactly (about 3·10⁶
residue-set counts, 0.5 s), correlates 0.907 with the measured D4 train
residuals and halves the train roughness. It is not comb-collinear
(corr(ℓ, ln W1) = −0.013 over the 102 folds), so it is genuinely the *next*
term, not a W1 echo. Among the four flags it most helps 409 (ℓ = 0.4554 vs
field mean 0.3603); combined with the null credit all four drop below 3.

**Calibration note on "predicts the flattening".** The interior comb's
band-OLS tilt difference is φ_pred = 0.0241 vs the measured 0.0247 — on the
nose as a band summary. Under the record's own estimators (train OLS + deep
exposure-weighted MLE) crediting (i-b) alone moves φ 0.0247 → 0.0191, and
crediting (ii)+(i-b) moves it to 0.0085: the deep MLE weights the shallow
end of the deep band (Sλ falls from 111 to 0.06 across it), so band-OLS
summaries and MLE refits are deliberately both reported, and the refit is
the honest test.

## 3. The two structural candidates, priced

**(ii) The derived null.** Its depth structure is two opposing drifts, both
computed exactly per fold and custody-licensed (the normalisation
X_null = (Y/m̄)(2/p)·r_null reproduces import-thinning §1.4's zero-parameter
window predictions: total 5481.9 exact, decades to 0.1–0.2%): the exponent
drift (c_law − c_null(p))·z is *anti-decay* (+0.0643/z — c_null falls
1.0623 → 1.0298 across the field, always below the fitted 1.0818), while
the derived amplitude 3/m̄ — the prefactor THN §0 records the law freezes
into a constant A — is decay (−0.1090/z train, fading to −0.0452 deep).
Net: −0.0600/z, right sign, 22% of δ, and a right-signed φ. Crediting it
exactly leaves δ′ = 0.2172/0.2031. The composed CRT second-order bracket
(exponents 1.0302…1.1096 at u = 0.25…0.9, THN §4.3, cited not recomputed)
cannot reach the remaining ~0.19 either.

**(i-a) Published second moments.** No channel, structurally: the field's
comb argument is deterministic per fold and carried exactly, so
integer-ensemble variance results bear on spread the model already owns.
The two honest numbers: the truncation drift of E_v[W1_P] across the whole
field is 0.67% in ln against a needed −2.67 nats, and the exact
second-moment spread (sd ≈ 0.465 lognormal-read) sits near the measured
sd(ln W1) = 0.515. Prior-art position of the second-moment layer: see §5.

**(iii) Finite-size/edge.** Derived exactly and refuted by orders of
magnitude: window-edge ≤ 2.5·10⁻⁸ pooled (≤ 2.8·10⁻⁴ at the worst single
window), W1-cutoff tail (primes q ≥ p dividing θ(θ²−4): q = p always,
factor (p−3)/(p−4), plus any prime factor > p of (θ±2)/2, factored exactly)
mean 4.3·10⁻³, worst 2.0·10⁻², tilt −0.0024/z.

## 4. x = 37, the computed layer

Fold comb θ_37 = 72 = 2³·3²: no folded divisor ≥ 5 at all — the whole comb
is W1(72) = 2·(4/3) = 2.667 from the θ−2 side (70 = 2·5·7), mid-band. Tile
comb at the record gap: W1_37(528) = (9/7)·2 = 2.571 (11 | 528; 5 | 530),
ratio 1.044 to the exact integer-indexed mean E_v[W1_37] = 2.462, 58th
percentile among v ≡ 0 (6) in [0.7·G2, 1.3·G2]. The level table (embed, 6a)
shows comb ratio and percentile are uncorrelated with anomaly status across
x = 11…79. c2″ = G2/(m·(lnD + ln W1(G2))) moves the spike by ~3.6% against
its ~19% size and 37 keeps 0 of 10 later terms above it. The three-series
LOO residuals give the sharpest one-line statement yet of the instrumental
reading: G2 +2.39 noise units, h +0.14, h2 −0.10 — **the anomaly is G2
large, not h2 small**, and the h2-side is now quantified as exactly normal.

## 5. Prior art (searched per `SEARCH-CONVENTIONS.md`), and the Wolf sweep

- **Montgomery–Soundararajan, "Primes in short intervals", arXiv
  math/0409258 — read at page images (pp. 1–4), hypotheses in full.** Their
  Theorem 1 (eq. 15: V_k(q;h) = μ_k V₂(q;h)^{k/2} + O_k(h^{k/2−1/(7k)}
  (q/φ(q))^{2^k+k/2}), k any positive integer) and Theorem 2 (R_k(h) =
  Σ_{distinct d_i ≤ h} 𝔖₀(D) = μ_k(−h log h + Ah)^{k/2} +
  O_k(h^{k/2−1/(7k)+ε}), A = 2 − C₀ − log 2π; R₂(h) = −h log h + Ah +
  O(h^{1/2+ε}), their (16)) are **unconditional** statements about moments
  of the deleted singular series averaged over integer tuples in [1, h].
  Their conclusion about ψ(x+H)−ψ(x) being normal with variance
  ~H log(N/H) is **conditional on a strong uniform form of the
  Hardy–Littlewood conjecture (their (1))** — stated so the import is not
  mistaken for coverage. Nothing in either theorem indexes an average by
  fold depth or by shifted primes; the no-channel verdict of §3 is our
  structural argument, not their theorem.
- **The Wolf sweep — the named unswept hiding place is now swept, and the
  W1 comb is NOT there.** Two full texts read as page images:
  (i) M. Wolf, *Some Remarks on the Distribution of twin Primes*,
  arXiv:math/0105211 (2001; the write-up of his 1990s computations to
  2⁴⁴ ≈ 1.76·10¹³, and the direct response to Kelly–Pilling). His m(d, N) —
  counts of consecutive twins at arithmetic separation d — is plotted with
  the comb's oscillations plainly visible (his Fig. 1), he names the twin
  separation champions d = 30, then d = 210, promises "the forthcoming
  paper" on them, and then derives formulas ONLY for the prime-count
  separation μ(s, N) ~ A(N)e^{−B(N)s} (A ≈ c₂²N/ln³N, B ≈ c₂/ln N), noting
  that the change of measuring sticks "removes oscillations from Fig.1 and
  leaves pure exponential decrease". **The comb's shadow is in his figure;
  no divisor-modulated formula for twin separations appears anywhere in the
  paper.** His s_max(N) ~ (1/c₂)ln²N and the remark that arithmetic maximal
  twin gaps grow ~ln³N are the Kelly–Pilling-adjacent objects, comb-free.
  (ii) M. Wolf, *On the Twin and Cousin Primes*, IFTUWr 909/96 (August
  1996, retrieved from his UKSW publication page as PDF): entirely
  π₂(x) vs π₄(x) — the fractal sign-change function W(x) = π₂ − π₄,
  random-walk analogies, generalized Brun constants. No separation
  statistics at all. (iii) Not opened: IFTUWr 894/95 (*Some conjectures on
  the gaps between consecutive primes*, PostScript only) — that paper is
  about PRIME gaps, where Wolf's divisor factor is the standard pair comb
  𝔖₂(d) (the corpus's W0 shape), already indexed as standard; no twin-twin
  claim rests on it. A "twin champions" follow-up never appears on his
  publication list (checked 2026-08-21); the nearest is Odlyzko–Rubinstein–
  Wolf, *Jumping Champions* (Exp. Math. 8, 1999), which is primes, not
  twins. **The `w1-singular-series.md` §3 NOT-FOUND on the explicit W1 comb
  therefore survives its last named hiding place.**
- **The interior-comb object itself (i-b).** The inclusion–exclusion of
  interior points with higher singular series is the standard apparatus of
  consecutive-gap heuristics (it is how gap counts between consecutive
  primes are corrected; Brent's and Odlyzko-style computations); our §2
  per-prime ratio is a two-line instance of it. What was not found in
  print: this correction used as a per-fold field on twin-comb fold depth,
  or any statement of its finite-range mean-one breaking. As with W1: the
  algebra is standard, the application is ours. (One-session sweep;
  zbMATH/MathSciNet not consulted.)

## 6. Proposed consequences, for adjudication rather than applied

- `mp-derivation.md` §5's "a real residual sub-field (sd ≈ 0.18, a far-tail
  flattening, fold 631, four flagged folds) is deterministic-looking and
  NOT derived" can now carry: *derived — the sub-field is the second
  singular-series layer (interior 6-tuple comb, zero parameters, corr
  0.907, sd 0.18 → 0.083) plus the thinning null's own depth drift; all
  four flags fall below 3 and the flattening collapses to 0.0085
  (`attack-delta37-01.md`). The remnant is a nearly depth-stable
  exponential δ″ ≈ 0.19–0.20, still underived.*
- `w1-singular-series.md` §5's Wolf line can close: *swept 2026-08-21 at
  page images (math/0105211 + IFTUWr 909/96): oscillations observed,
  champions named, no comb written — the NOT-FOUND stands.*
- The δ hunt's live target sharpens: the ~0.19 flat remnant, with the
  first-order interior layer now exhausted; the natural next objects are
  the interior-PAIR (second-order in 6/m̄) terms and the measured
  steeper-than-geometric hazard structure of THN §1.5 — i.e. CRT
  dependence beyond every first-order layer priced here.
- If adjudicated in, the credited model is a strictly sharper prereg RIVAL
  line (sd 0.083 vs 0.177) under the mp-window prereg's own consequence
  rule (formula bands are rivals, never replacements).

## 7. What this does not show

δ″ ≈ 0.19–0.20 remains fitted, not derived; nothing here touches H″, the
exponent, or any live grade. The interior correction is first order in the
level density (interior-PAIR terms not computed) and prices only the
dominant qualifying value θ_c (the 4p and 6p channels carry their own
e^{−z}-suppressed interiors). The 0.907 correlation is a train-band
statement (37 folds); deep folds enter only through exposure-limited
MLE/PLN scores, and the blind-window rows were not rescored. The credited
k′ values absorb each tilt's constant level and are not comparable to the
record's k. The x = 37 negative closes the HL mechanism family for the
*level instruments* (c2′, G2/h, h2/G2); it does not explain the spike.

## 8. Reproduction

```
node research/attack-delta37-01.js                       # 0.6 s, no sieving
node research/qc/embed.js --check research/attack-delta37-01.js
```

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
