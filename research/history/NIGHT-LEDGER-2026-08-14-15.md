# The night ledger: 2026-08-14 evening to 2026-08-15 morning

Complete data record of the five-wave autonomous campaign (waves 2 to 6),
written for later synthesis. Every claim here traces to a committed artifact.
Calibration is marked throughout: PROVEN, VERIFIED (exact computation),
MEASURED, PREDICTED, REFUTED.

Preceding context: waves 0 and 1 were the ten-attack natal-cap campaign
(research/NATAL-CAP-CAMPAIGN.md) plus the exact Natal@5 variance
(research/natal5-variance.js). This ledger covers what came after.

---

## 1. The three headline results

### 1.1 The conjecture compressed to one number (paper/anchored-note.md)

Define S(x) as the anchored Natal@5 survivor count of the x-tile, E(x) as the
exact rotation-ensemble mean, and the anchored bias β(x) = S(x)/E(x).

- Lemma (PROVEN): every anchored survivor exceeds √W, hence is a genuine twin
  prime pair. Upgraded during the night from a per-level check to all x by a
  one-line mod-4 argument (W+1 ≡ 3 mod 4 is never a square).
- Lemma (PROVEN, Mertens): E(x) → ∞ unconditionally.
- Theorem (PROVEN): if liminf β > 0 then twin primes are infinite.
- Proposition 2 (PROVEN, the weakest sufficient form): if S(x) ≥ 1 for
  infinitely many x, twin primes are infinite. No density, no positivity of β,
  only non-annihilation infinitely often. Measured margin at @37: S = 8.0e9
  against the needed 1.
- Proposition 1 (PROVEN + MEASURED): measure-theoretic bounds cannot decide
  the anchored question. The second-moment bound misses the decision threshold
  1/W by a factor 81 at @19 and the gap grows like ln²W; the anchor is a
  diverging outlier of the ensemble it is embedded in.
- Assumption A pricing (PROVEN equivalence): the sharp form of β's limit is
  algebraically equivalent to Hardy-Littlewood on the 11/17 comb; the weak
  form is blocked by the parity floor 2.

### 1.2 β measured to nine levels, tracking a zero-parameter series

| x  | S(x)          | E(x)           | β = S/E | z = (S−E)/σ |
|----|---------------|----------------|---------|-------------|
| 7  | 8             | 6.92           | 1.1556  | +1.05       |
| 11 | 45            | 39.27          | 1.1458  | +1.81       |
| 13 | 307           | 304.28         | 1.0089  | +0.28       |
| 17 | 3,099         | 3,245.51       | 0.9549  | −4.50       |
| 19 | 38,380        | 41,441.19      | 0.9261  | −25.52      |
| 23 | 597,475       | 669,028.8      | 0.8930  | −144.9      |
| 29 | 12,307,838    | 14,063,617.4   | 0.8752  | −762.1      |
| 31 | 283,449,187   | 328,601,798.6  | 0.8626  | −4,000.9    |
| 37 | 7,998,394,865 | 9,377,228,928.8| 0.8530  | −22,632.9   |

The describing curve is the zero-knob classical correction
β ≈ (e^{2γ}/4)·(1 + 2/lnW + 6/ln²W). Its residuals collapse monotonically:

  @13 +0.0173, @17 +0.0136, @19 +0.0161, @23 +0.0046, @29 +0.0026,
  @31 +0.0016, @37 +0.0010.

Four consecutive collapses, each a prediction made before the run. At @37 the
forecast was on record (classical-raw 0.8520, 0.8536 with persisted residual;
free-linear 0.8479; pinned-linear 0.8598) and the march measured 0.8530. The
free-linear form survives numerically but its intercept slides with the fit
window (0.7650 → 0.7621 → 0.7577), which is fit-window artifact, not a limit
estimate; the pinned-linear form is dead. The conjectured limit
e^{2γ}/4 = 0.793055 is extrapolation-supported: the remaining gap 0.0600 is
still 60 times the deepest residual. @41 forecasts on record: classical-raw
0.8449, with-residual 0.8459, free 0.8443, pinned 0.8488.

### 1.3 The exponent road (research/sift-limit-attack.md)

The Gap Reformulation remains the only route with a defined finish line: a
two-class Jacobsthal exponent below 2 proves TPC outright. Our published-grade
bound is 4.267 (paper/beta2-note.md, source-verified against Diamond and
Halberstam).

Strategic finding, calibrated as an analysis of the method rather than a
theorem: the entire distance from 4.2665 to 2 is a positivity-method problem
and zero percent a distribution problem. Distribution hypotheses (EH, GRH,
bilinear inputs) enter only at the remainder step, which the primorial
formulation already saturates for free. A perfect distribution oracle moves
the exponent by nothing. Five discard points were mapped in the Theorem 9.1
pipeline; our exact structure (J₅ correlations, hyperuniformity, mod-30
rigidity, mirror, fusion) is quotiented away at the first one, where the sieve
reduces the set to divisor counts.

The visible road is the Brüdern and Fouvry vector sieve, which consumes the
product structure. Its unconditional coupled form gives 2(1+√e) = 5.297, worse
than 4.2665, which explains its absence from this problem. The missing
ingredient is one lemma (named Lemma V in the file): signed cancellation of
the bilinear interval sawtooth remainder, uniform in position, the
two-dimensional analog of Iwaniec's 1980 linear-sieve error term. Payoff
scale: any partial decoupling beyond θ = 1.2417 beats 4.2665; full decoupling
gives 1+√e ≈ 2.649. Ford's notes confirm no κ = 2 extremal example exists in
print, so nothing published blocks the band (2, 4.2665].

Pilot computation (research/sift-limit-attack.js): real Rosser weights, machine
verified sandwich, decoupled certificate positive at every one of the 9,699,690
positions of the p < 20 period at window exponent u = 2.2, and at all 8M
sampled positions at z = 50 to 100 down to u = 1.8. Measured cancellation
exponent 0.23 to 0.33 against 1.0 for absolute values. Toy scale, stated as
such. First provable target: the Parseval mean-square form of Lemma V, which
would give the almost-all version of 2.649.

---

## 2. Artifact ledger

Each row: file, one-line result, calibration.

| Artifact | Result | Grade |
|---|---|---|
| natal-cap-11-kstar23.js | K*(23) = 27; K* curve 0,0,2,10,27; S(23) = 597,475; β(23) = 0.8930; φ-band ratios 1.00/1.25/1.29 | VERIFIED |
| natal-cap-12-overlap-sign.js/.md | S₂ ≤ ΣCRT REFUTED (40 to 53% of pairs above CRT); Structured-Bias Theorem: each combo is an anchored window of a dilated pattern, S₂ ≈ ΣCRT − #pairs·N/W; exception exactly when q,q′ both divide W+1 | PROVEN + REFUTED |
| natal-cap-13-anchored-calm.js | Calm reduced from four sightings to one: anchored VR rank 2 of 510,510 at @17; house splits dissolved (73.7th pct), overlaps reversed (94.3rd); W/2 provably fixed phase and measured loudest | VERIFIED |
| natal-cap-14-discrepancy-lemma.js/.md | Var(fresh given past) = (2/q)(D² + R₂) exact; pair-survival ∏(1−(4−ρ)/q_j) closed form; √q bridge ceiling e^−69; ℓ∞ hinge C ≤ 7.34; corrected cap-07's ensemble variance | PROVEN |
| natal-cap-15-head-certificate.js | Composed head+tail certificate dies on the tail at every affordable boundary; head-exactness buys ≤0.1%; 99.9% of certified survivors come from ladder depth; hybrid floors 39/238/2227/25978 | VERIFIED + REFUTED |
| natal-cap-16-fast-variance.js | Exact variance to @31 by product-sieve; Var(full period) = 0 proven in BigInt; Var/E rises 0.152 → 0.388 | PROVEN + VERIFIED |
| natal-cap-17-cheap-laws.js | Window excess ×1.81 per level over six levels; zone share to p = 100,003 with 1/lnp decay | MEASURED |
| natal-cap-18-at29.js | K*(29) = 69 against the φ-band forecast ~70; K* sub-linear in the scour; β(29) = 0.8752; E_med(29) = 36.24 | VERIFIED |
| natal-cap-19-calm-lemma.js/.md | Fused-Window Calm Lemma: the anchor's two strike windows are mirror-adjacent and fuse; W/2 duplicates and is provably variance-doubled; fusion predicts the calm within 7%; @19 rank 14 of 9,699,690 | PROVEN + MEASURED |
| natal-cap-20-third-order.js | Zone-share expansion derived exactly: aⱼ = (j+1)!/2ʲ, all rationals; out-of-sample test at p = 200,003 hits to 2e−5; thread closed | PROVEN (HL-conditional) |
| natal-cap-21-beyond-chebyshev.js/.md | First beyond-Chebyshev ensemble bound: @11 P(S=0) ≤ 1.49e−6, a 4190× beat; @11 closed exactly (P = 0) by capacity plus exhaustion; per-step chains structurally dead | PROVEN |
| natal-cap-22-at31-drift.js | β(31) = 0.8626 in 132 seconds via the CRT-30 engine, a 60× speedup; third consecutive residual collapse | VERIFIED |
| natal-cap-23-covadj-proof.js/.md | Uniform Cov_adj < 0 REFUTED (595 of 599); aggregate ≈ −0.4 certified; mechanism found: weighted mean of cos(2πk/q) | PROVEN + REFUTED |
| natal-cap-24-boundK-curve.js | bound(K) priced by a Mertens closed form within 2.5 to 4.1% over entire curves; NO efficiency collapse (fixed relative depth improves with level); cap_full = fresh − self + s exact at 2328 primes | VERIFIED |
| natal-cap-25-excess-law.js | Excess law derived: E = 0.97·σ(ℓ)·√(2ln(W/ℓ)); the field is hyperuniform; drift reproduced parameter-free including the @29 anomaly | PROVEN + MEASURED |
| natal-cap-26-minus-half.js/.md | The −1/2 is EXACT, not an equidistribution limit: the comb kills lags h = 1..5 identically; deviation is a mod-30 skeleton discrepancy; four exceptions explained as multi-prime resonances | PROVEN |
| natal-cap-27-t4-at13.js | T₄ at @13 exact over 39,782,707,965 quadruples with certified 1e−14 error; P(S=0) ≤ 1.898e−6, a ×513 beat at a level capacity cannot close; kurtosis 2.9999 | PROVEN |
| natal-cap-28-analytic-certificate.js | Legendre-comb head certificate (new theorem); deep-K deviation is Buchstab, not pair correlation (pair resummation REFUTED); collapse 3.4% → 0.2%; predictions to @97 | PROVEN + MEASURED |
| natal-cap-29-sigma-plateau.js | Plateau derived exactly: P = (1/π²)Σ|S(j)|²/j², BigInt closed form; level law R(x̂) → 3 per fold; E_med(31) = 54.98 or 61.22 put on record before measurement | PROVEN |
| natal-cap-30-skeleton-bound.js/.md | Skeleton Collapse Theorem: the 2ⁿ ledger collapses to K = 15C − 2P (all x, all q); G30_agg < 1/2 certified in BigInt at @11 to @23; all-x door named | PROVEN + VERIFIED |
| natal-cap-31-calm-vs-kill.js/.md | Calm does NOT concentrate survivors (REFUTED); X-limitation theorem: strikes alone cannot annihilate, per level at @11/@13/@17 (@19 added later by cap-38), NOT "from @13 on" — scope corrected 2026-08-18; Assumption A relocated to the overlap-credit channel; drift lives in m ≥ 3 multiplicities | PROVEN + REFUTED |
| natal-cap-32-wrap-identity.js/.md | Wrap obstruction dissolves (all constrained counts are residue histograms); T₄ at @17 computed for the first time, 4,616,850,623,332 ± 4e−4, in 10 minutes against a 4.9e16-term naive sum; μ₄ certification blocked by 7-order cancellation | PROVEN + MEASURED |
| natal-cap-33-overnight.js/.txt | Three runs: E_med(31) = 60.90 against the a-priori 61.22; β(37) = 0.8530 hitting the on-record classical forecast; Var/E(37) = 0.3958 separating the limit fits 10:1 | VERIFIED |
| sift-limit-attack.md/.js | The exponent road: positivity not distribution; Lemma V; pilot certificate positive at 9.7M positions | ANALYSIS + PILOT |
| bv-import-survey.md | Verdict table for BV, EH, GRH against every unproven leg; three NOW-provable prizes; Chen recast as Assumption A for the P₂-comb | SURVEY |
| paper/staircase-note.md | Print-grade: Cofactor Rigidity, Staircase Theorem, never-self-strike lemma, tail theorem, four certified twin floors | PROVEN |
| paper/anchored-note.md | The β compression, Propositions 1 and 2, the drift table through @37 | PROVEN + MEASURED |

---

## 3. New theorems established during the night

1. **Staircase Theorem** with its regime collapses, plus the never-self-strike
   lemma (q ≡ 1, 7, 23, 29 mod 30 can never self-strike a Natal@5 slot) and
   the tail theorem Σ tail caps = (2ln2 + o(1))·W/lnW.
2. **Structured-Bias Theorem** for pair overlaps, replacing the refuted
   one-sided conjecture.
3. **Fused-Window Calm Lemma**: the anchor fuses its two strike windows, the
   mirror-center duplicates, and the two arithmetically distinguished phases
   occupy opposite extremes of the ensemble.
4. **The exact −1/2**: the comb's difference set forces the first five
   correlation lags to vanish identically, so the adjacent-window correlation
   mean is −1/2 with no error term and no hypothesis.
5. **Skeleton Collapse Theorem**: K = 15C − 2P, reducing an exponential ledger
   to one kernel.
6. **X-limitation Theorem**: strikes alone cannot annihilate the
   natal set at any loudness; annihilation requires an overlap collapse of 8
   to 15 sigma. *(Scope corrected 2026-08-18. This ledger wrote "from @13 on";
   the proof runs PER LEVEL and needs the enumerated max VR at each, so it is
   established at @11, @13, @17 and @19 and nowhere else. The all-x form is the
   Loudness Ceiling Conjecture, open. See `history/CHANGELOG.md`.)*
7. **First beyond-Chebyshev ensemble bounds**: @11 (×4190) and @13 (×513),
   plus @11 closed exactly.
8. **Legendre-comb head certificate** and the exact plateau formula.
9. **Cofactor rigidity, survivors-are-twins for all x** (the mod-4 upgrade).

## 4. Refutations, kept visible

- S₂ ≤ ΣCRT one-sided conjecture (40 to 53% of pairs violate it; cap-06's
  "3% below" reading was an aggregate artifact).
- Uniform Cov_adj < 0 (4 weak exceptions in 599, all zero-crossings; a fifth
  found at @23).
- The anchored calm as four phenomena (three dissolved; house splits are
  actually on the uneven side, overlaps are rich not deficient).
- Calm implies survivor concentration (correlation ≈ 0; the survivor
  fluctuation lives in a channel the calm statistic cannot see).
- Martingale bounds beat Chebyshev (they lose by 1 to 3 orders).
- Per-step concentration chains (lose by 43 to 3600×).
- A fixed window-excess multiplier (it drifts; the geometric fit was √R times
  truncation plus per-level twist).
- Pinned-linear drift form (6× worse than the classical series at @31).
- The pair-correction hypothesis for deep-K certificate deviation (the
  correlation is all-orders Buchstab).
- Universal packing cap at the scour head (the embedding runs the other way).
- Mirror strike-invariance (needs q dividing W, false for scour primes).
- Efficiency collapse of certificates (an artifact of reading only the
  crossing point K*).
- Briefing errors corrected by agents: parity floor is 2 not 4; @13 scour is
  34 primes not 39; 19# is 9.7e6 not 9.7e9; S₃₀ algebra; z(31) = −4000.9 not
  −4001.4; cap-19's divisibility exclusions on both ends; cap-08's RS versus
  PNT ordering claim at @19.

## 5. Open doors, ranked as of this writing

0. **Lemma V** (sift-limit-attack.md): the Parseval mean-square form first.
   Any decrement below 4.2665 is a new theorem; 2.649 halves the open band.
1. **@41 drift point**: needs an engine past 2^53. Forecasts on record.
2. **Precision-grade the wrap engine**: T₄ at @17 needs 3e−9 relative for the
   bound; the blocking term (C2 order-3 truncation) is named and finite.
   Shape-reference predicts ~3.05e−8, a ×3000 beat over Chebyshev.
3. **The X-channel**: map the multiplicity spectrum (m ≥ 3) of the anchored
   overlap credit, where Assumption A now provably lives.
4. **The skeleton door**: equidistribution of ⌈W/q⌉ mod 30 over scour primes,
   possibly Siegel-Walfisz adjacent. Would make the calm lemma all-levels.
5. **The three NOW-provable prizes** from the BV survey: the mod-30 tail
   improvement (factor 4), fixed-depth caps as SW theorems, and the cap₂ tail
   asymptotic as a BV theorem.
6. **Var/E limit ≈ 0.611**: derive it (Paper III's open question).
7. **c ≈ 1.074**: the excess chain's last free number.

## 6. Operational lessons

- Four agents died at the 64k output-token limit and four at a session token
  limit. Fix: brief agents to write files in small pieces (skeleton first,
  then edits under 150 lines) and to compute before deriving. A fresh agent
  with a computation-first brief succeeded where two resumed ones failed,
  because resumption carries the bloated transcript.
- Long detached computations survive agent death. Watch the process IDs from
  the parent session; agent self-watchers proved unreliable.
- Chain of custody discipline paid for itself repeatedly: every new-level
  result reproduced all previous levels digit-for-digit before being trusted,
  which caught engine drift twice.
- Predictions on record before runs (K*(29) ≈ 70, E_med(31) = 54.98/61.22,
  β(37) = 0.8520/0.8536) converted three runs from measurements into tests.

## 7. Attestation state

Attestation v6 (lean recipe, 1.5MB, excludes prior snapshots) covers HEAD
a677ca2; its OpenTimestamps proofs and all earlier versions are Bitcoin
anchored as of 2026-08-15 morning. The iPhone backup for v6 was delivered over
LAN HTTP without roundtrip verification, since no cable was available; the
tarball hash is recorded in memory and the OTS stamp is the operative
protection. Publication moratorium held throughout: nothing was pushed,
posted, or submitted.
