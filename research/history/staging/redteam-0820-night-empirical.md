# Red team, 2026-08-20 night: mp-derivation and rho-maximal-law attacked

<!-- ledger
id: Q-redteam-0820-night
status: ANSWERED
todo: none
question: Do the night's two staged headlines, mp-derivation.md and rho-maximal-law.md, survive an adversarial re-derivation before integration?
verdict: Both survive: every decisive number reproduced on independent code, the fresh window re-sieved with a different engine reproducing all 37 X, the prereg custody at commit 303711b confirmed with the anchor genuinely fresh, and all 37 sealed (mu, lam) values and all 74 band integers reproduced exactly.
-->

*(2026-08-20. Adversarial verification pass over the two staged night
headlines `mp-derivation.md` (empirical formula) and `rho-maximal-law.md`
(stated law + pricing), before integration. Method: refuted-until-rederived;
decisive statistics recomputed on independent code paths from the embedded
artifacts; instruments calibrated on known-truth controls in the same pass;
units stated before comparison. Scratch producers live outside the tree
(`rt-night-*.js`) and are quoted inline. Grades: CONFIRMED / WEAKENED
(with corrected sentence) / REFUTED (with counterexample). BOTTOM LINE:
both headlines SURVIVE — every decisive number reproduced on independent
code, the fresh window re-sieved with a different engine and all 37 X
reproduced, the sup|rho| column re-walked with a different walker at all
five levels — with one mandatory rider on T2's HELD s/u finding, one
confound in T1's theta-claim evidence that a matched control closes, and
one custody residual on the prereg timing. Nothing is refuted.)*

## T1. mp-derivation.md

### T1.a The W1 overlap derivation re-derived — CONFIRMED

Brute enumeration (`rt-night-w1-brute.js`) over 182 (q, v) pairs, q = 5..31,
all even v to 2q+6: the forbidden set {0, −2, −v, −v−2} mod q has size 2
iff q | v, 3 iff q | v±2, 4 otherwise; the three classes are mutually
exclusive for q ≥ 5 (any collision forces q | 2); and the direct survival
count over residues equals q − |S| in every case. So the per-fold factors
(q−2)/(q−4), (q−3)/(q−4) are exact as pair-survival relative to a generic
distance, and the (q−4) denominator is the correct base measure for that
comparison (all four residues distinct). The base choice only moves a
smooth-in-p normalization; the falsifiable content is the class-factor
ratios, and the free exponent reads beta = 1.0313 on my own two-variable
refit where the derivation says 1. The step "W1 as gap-count weight"
remains a modeling step and the doc flags it as such.

### T1.b Prereg custody at 303711b + blind re-score — CONFIRMED, one residual

- **Commit graph**: 303711b (17:16:41) contains ONLY the prereg. The anchor
  is genuinely fresh: `git grep` for 132000000000 / 1.32e11 / 132e9 at
  303711b^ returns nothing. The producer-01 fingerprint pinned in the prereg
  (code-sha256 248c8c88…, out-sha256 856d0519…) matches the committed file;
  `embed.js --check` reports both producers bit-honest.
- **Sealed bands re-derived**: from my own parse of the committed embeds, my
  own W1/mbar arithmetic, my own OLS refit and my own PLN quantile code
  (Simpson on [−6,6], N = 241, own lgamma — vs the producer's trapezoid
  [−5,5], N = 61), **all 37 sealed (mu, lam) values and all 74 band integers
  reproduce exactly**.
- **The window re-sieved on an independent engine**: increasing-prime
  conditional-write marking and a merge-on-equal monotone stack counting
  adjacent pairs at level p (vs the record's decreasing unconditional writes
  and kills−runs bookkeeping). Calibration in-pass: 37/37 scored folds match
  the embedded [0, 2e9) record. At A = 1.32e11: **37/37 folds agree with
  producer-02's embedded X**. My own re-score: **34/37 in-90 (need ≥ 28),
  0/37 outside 99.73% (allow ≤ 1), margin D4 − D0 = +25.4 nats. HIT stands.**
- **Residual, custody**: producer-02 first exists in git at 254b689
  (17:22:02), 5m21s after the seal. "The producer does not exist at the
  seal" is unverifiable from git, and at 15.8 s per run anchor-shopping was
  physically possible in that gap and before it. Mitigation, not proof: the
  bands are a deterministic function of artifacts committed half a day
  earlier plus the declared formula, and the outcome (34) sits AT the
  incumbent-truth expectation (34.6), not above it — a shopped anchor would
  be expected to overshoot. Recorded as a residual; future preregs should
  seal before the measuring producer is even drafted, with a longer gap.

### T1.c Model selection re-fit — CONFIRMED, no leak found

My own OLS on the 37 pooled train rows (p ≤ 293) ONLY reproduces
(k, delta) = (1.9468, 0.2771) exactly, s0 = 0.1767, beta = 1.0313 — so the
two scalars are a function of the declared train split alone. My own PLN
scoring reproduces every table entry to 0.1 nat: deep −128.2 / −118.3 /
−116.2 / −122.7 / −107.8 / −88.6, blind −112.7; deep gaps D4 over
D3/D1/D0/D2/raw = 19.2 / 27.6 / 29.7 / 34.1 / 39.6 nats, blind 10.2–20.8.
Leak checks: the pooled Sx/Sl exclude the 6.6e10 blind window (Slam
identity = six-window exposure 1.1211; producer-01's Stage 7 adds BLINDX
separately for the incumbent), and the fresh anchor enters nothing fitted.
One wording defect: producer-01's header says "weighted ln-regression";
the implemented fit is unweighted OLS in ln (I reproduced from the code's
actual convention; results are internally consistent).

### T1.d The theta-not-p claim — CONFIRMED, but the doc's own evidence is confounded

The cited contrast (twin rms 0.155 vs adjacent non-twin 0.764, both
reproduced exactly) cannot by itself separate "function of theta" from
"smooth function of p": among adjacent fold pairs, sharing theta and
Delta p = 2 are perfectly collinear. The matched control closes it:
- the 4 adjacent NON-twin pairs whose D4-predicted |dln M| ≤ 0.15 agree at
  rms 0.181 (noise-rms 0.135) — as well as the twins (0.155, noise 0.150);
- across all 34 control pairs, sum(d² − noise) = 18.98 vs the D4-predicted
  theta-arithmetic sum 17.34 (ratio 1.09): the non-twin disagreement is the
  formula's own W1 + depth differences, nothing left for p;
- cov(excess d², prime gap) = 0.03 ≈ 0 — adjacency in p adds nothing.
Twin mean-squared Poisson pull = 2.23, confirming the doc's ~10–15% non-theta
residual clause. **Corrected sentence for the doc**: *the 0.155-vs-0.764
contrast is confounded (theta-sharing ⟺ Delta p = 2); the claim rests on the
matched control — non-twin pairs matched on predicted M agree like twins,
and control-pair variance decomposes onto the theta-arithmetic at ratio 1.09.*

### T1.e The four flagged folds and 631's pricing — CONFIRMED, one convention note

Under the producer's stated convention (deep Pearson (Sx−mu)/sqrt(mu)) the
four flags reproduce exactly: 311 +3.10, 331 +3.21, 409 +3.28, 631 +3.36,
and no train fold exceeds 2.5 s0. Note: these are Poisson pulls; under the
formula's own PLN variance (s0 = 0.177) only 409 (+3.15) and 631 (+3.36)
stay above 3 — the flag list is exposure-noise-flattered, worth one line.
631: P(≥2 events at 631 | D4) = 2.76e-3, trial-corrected P(≥2 at SOME
p ≥ 521) = 0.170, E4 = 2.30 vs E0 = 9.60, observed 2, P(N ≤ 2 | D0) =
3.84e-3, top expected folds 541/547, W1(631) = 5.55, M_D4 = 0.338, pooled
M̂ = 4.48 — all reproduce. The trial factor is priced correctly and stated.

Secondary claims all reproduce on my parse: corr probe 0.6537, band means
(measured 0.959/0.859/0.520/0.357 vs D4 0.946/0.872/0.423/0.233), deep
delta MLE 0.252 vs train 0.277, import-stein 14/14, K = Psi/Phi² span 1.009
vs M̂ span 2.28 at 101/211/421 (the refutation of K stands).

**T1 verdict: CONFIRMED.** The blind HIT, the fit, the bands, the sieve, the
selection table and the pricing all survive independent rederivation; grade
PARTIAL DERIVATION is right. Apply the T1.d corrected sentence, the T1.e
convention note, and record the T1.b custody residual.

## T2. rho-maximal-law.md

### T2.a The pricing lemma chain — CONFIRMED

Numerically at z = 13 over the full period (`rt-night-t2.js`): (i) the
identity T = HM + rho(x) − rho(x+H) agrees with my own floor-sum evaluation
to machine zero at 330 sampled positions; (ii) |R_H| ≤ 2 sup|rho~| is exact
algebra (the mean cancels in the difference); (iii) H = ceil((2S+1)/M)
gives HM − 2S ≥ 1 by construction — min T = 3.0 observed; (iv) the BF
pointwise inequality holds at every sampled x (T ≤ #admissible in (x, x+H],
0 violations), and the delivered window H = 112 indeed covers the actual
max admissible gap 42 in the z = 13 period; (v) M·ln²z measured
0.343–0.367 flat across z = 13..47 (my own M at 47 from buildTerms:
2.3166e-2), and 1+sqrt(e) is the 2f > F composition threshold, so
M ≍ c/ln²z is standard as claimed. Composition: G2(z#) ≤ ceil((2Cz^a+1)/M)
≪ z^a ln²z — the ln²z factor is right, and ln²z ≪ z^e closes the
"below 4.2665" clause. Only the law itself is unproven, as stated.

### T2.b The sufficiency curve — CONFIRMED by my own arithmetic

Recomputed at z = 13 and 29 entirely from my own walker's period variance
plus my own M = Σw/q and lnW, and at z = 47 from my own buildTerms
(n = 293980, M = 2.3166e-2, lnW = 37.110 — all matching the cited row) plus
the cited rmsr: theta_G = 1.94696 / 2.15889 / 2.48199, lambda_max =
2.31949 / 2.10756 / 1.78446, d_strict = 0.04467 / 0.00642 / 0.00079,
1/M = 17.9 / 31.4 / 43.2, alpha_max = 2.8712 / 3.0369 / 3.1085 — every
column digit-for-digit. Floor arithmetic: th(nP) exact at all six z,
z = 47 floor 2.0106, band width 2.2559, room consumed 0.47% ("0.5%").

### T2.c The looseness factor — CONFIRMED: 47^(4.26645−2.48199) = 963.4.

### T2.d The direct sup|rho| measurement — CONFIRMED and extended

My own walker (different blocking, own rho(0), own accumulation) reproduces
sup|rho~| and C_true at ALL FIVE levels digit-for-digit (2.62013 / 4.33665 /
9.15247 / 12.10617 / 17.90249; C_true 0.6362 / 0.6044 / 0.8022 / 0.7554 /
0.7830), with period mean + M/2 ≤ 2.2e-7, closure drift ≤ 4.3e-7, and the
measured period variance equal to the closed-form column at printed
precision. Brute force from the definition at TWO levels (z = 13 AND 17,
one more than the producer's own control) agrees to 1e-8. The Gaussian rho
law is TRUE at every exactly measurable level; the C_true band 0.60–0.80
stands. z = 31 not walked (compute ceiling; unchanged).

### T2.e The HELD s/u = 0.703 finding — CONFIRMED, with a mandatory rider

- **Arithmetic**: s/u = 3/4.26645 = 0.70316. Lemma V's stated range —
  verbatim at `research/sift-limit-attack.md` ("in some range
  s ≥ (0.63+δ)·u (θ_total ≥ 1.25) up to s = u − ε") — contains 0.703 for
  any δ < 0.073. Every delivered exponent u in (3, β₂) has s/u in
  (0.703, 1), inside the range; exponents ≤ 3 give s/u ≥ 1, outside. Edge
  precision: for FIXED ε the clean claim is u in [3/(1−ε), β₂). The TPC
  quote is faithful (`theta-ladder.md` §: s/u = 1.62–1.72 > 1, moot there).
  Lemma V's conclusion ≪ H/log³H is indeed strictly stronger than needed
  (log³H = u³ln³z ≫ ln²z ≍ 1/M).
- **Pointer fix**: the sourced range lives in `sift-limit-attack.md`, NOT in
  `lemmaV-neighbours.md` (that file carries the DI/Maynard/Pascadi
  smoothness-hypothesis quotes); any integration should cite the former.
- **THE RIDER (mandatory before this moves anywhere live)**: "inside the
  stated range" un-moots the corpus's own POSED lemma — Lemma V is
  needed-not-proven, so nothing "applies" in the theorem sense. And the
  fixed-smooth-profile hypothesis that killed the import of DI 6.12 /
  Maynard / Pascadi is a property of the Rosser weights (arbitrary
  functions of the whole modulus, no smooth factor), NOT of the working
  point: it binds at the β₂ point exactly as it did at the TPC point.
  What re-enters is therefore the ASK — a 0.1787-of-θ_total improvement
  (1.2090 needed vs 1.0303 delivered, re-verified) at a working point
  inside Lemma V's own range — not an import route. The doc's §5 wording
  is compatible with this; the rider should be explicit when the HELD
  block is resolved. The recorded Kloosterman pricing also remains
  R_H-configuration only (the doc already carries that caveat).

**T2 verdict: CONFIRMED.** Statement, pricing, curve, measurement and
position all survive; the HELD finding can be released WITH the rider and
the pointer fix.

## Not reached

- The z = 31 sup|rho~| walk (~500 s, barred by the compute ceiling) and the
  z = 37..47 conditional rmsr rows (O(N²), cited; their cheap fields n, M,
  lnW were re-derived here from my own buildTerms and match).
- Producer-02's Stage A 11-of-11 engine replay (my own engine was calibrated
  on the same embedded record instead) and producer-01's two synthetic
  control gates (my refit reproduced the real-field numbers directly).
- The incumbent-NB expected-score line (34.6 / +23.6) — taken from the
  sealed prereg, not re-derived.
- The Kloosterman pricing at the rho-potential configuration (open in the
  doc's own NOT REACHED, unchanged).

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
