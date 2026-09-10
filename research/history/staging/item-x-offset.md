# The ~3.8 law's −0.45% offset: the candidate family priced, two mechanisms tested, and the @37 discriminator

<!-- ledger
id: Q-xchannel-offset
status: PARTIAL
todo: X
question: What produces the ~3.8 law's -0.45% offset, and which candidate correction survives?
verdict: The best available description is a finite-level correction of S3's size and sign - 1 - J = 4S2 - S3 scores z = +0.04 at @29 and -0.41 at @31 where the standing law scores -0.43 and -2.32 - but it is POST HOC; two candidate corrections and one shape are refuted on existing data, the sigma behind the @31 detection is calibrated on seven known-truth controls, and the deciding blind test at @37 is pre-registered and committed alone.
-->

*(2026-08-20. TODO item X, after both blind tests: `1 − J = 4S₂` is the last
law standing and is NOT exact — a relative offset of −0.41% (@29) and −0.48%
(@31), the same absolute residual ≈ 1.19e−4 at both sharp levels, detected at
z = −2.32 on the corrected slot-clustered σ (@31) and only consistent at −0.43
(@29). The open analytic target must now produce the offset, not just the law.
This file prices the finite-level-correction family against the exact
residuals, measures where the deficit lives, and pre-registers the @37 test
that separates the survivors. Producers, all three formally embedded:
`research/attack-x-offset-01-terms.js` (170 s),
`research/attack-x-offset-02-profile.js` (2948 s),
`research/attack-x-offset-03-cofactor.js` (117 s). Pre-registration for @37:
[xchan-at37-offset-prereg.md](xchan-at37-offset-prereg.md), committed alone.
Calibration is marked on every claim: MEASURED, DERIVED, REFUTED, POST HOC.)*

## Verdict

**The offset's best available description is a finite-level correction of S₃'s
size and sign — `1 − J = 4S₂ − S₃` scores z = +0.04 (@29) and −0.41 (@31)
where the standing law scores −0.43 and −2.32 — but it is POST HOC, and the
blind test that decides it is @37, pre-registered and committed alone**
([xchan-at37-offset-prereg.md](xchan-at37-offset-prereg.md), commit `0a7dd73`).
What this pass settles outright, at high significance:

1. **The σ behind the @31 detection is calibrated.** Seven known-truth control
   draws land inside 1.9σ; the instrument does not manufacture a −0.45%-scale
   offset (§4).
2. **Two candidate corrections and one shape are REFUTED on existing data**:
   `4S₂ − 4S₃` (5.3σ), `4Σ1/(q(q+2))` (12.4σ), and the locality shape
   `1−J ∝ E_super[Σ_{q∈Q} q⁻²]`, whose constant would have to grow 120 → 572
   (§2).
3. **The marginal-discrepancy mechanism does not carry the offset**: re-basing
   the denominator on measured per-prime strike counts moves the residual by
   +118% at @29 but by −55% at @31 (and −145%/−224% at the noisy levels) —
   sign-erratic where a real mechanism must be stable (§5).
4. **The raw 11/17 line is itself biased**, J_line − 1 = +4.03e−3 at @31
   (z = 147.6), positive and decaying across four levels: the natal J that
   `4S₂` fits to half a percent is the NET of a positive lattice bias and a
   deeper sieve deficit, 1 − J/J_line = 1.15–1.18 × 4S₂ (§3).
5. **The far-super-W surplus component is now DERIVED**: on the strips where
   the scour pair's only eligible cofactor is 1, the natal count is
   pairs·(1/4)·∏_{7≤p≤x}(p−2)/(p−1) — verified to 0.001% over 5.05e8 pairs at
   @31 — an enrichment over the smooth model of exactly ∏_{p≤x} p/(p−1)
   → e^γ ln x (§6b).
6. **The deficit is a structured profile, not a constant** — octave deficits
   spanning 0.006 to 0.059 with sign flips, each bin hundreds of σ from the
   aggregate (§6a). Any derivation of the ~3.8 constant, and of its offset,
   must produce this profile; an aggregate-only argument cannot be checked
   against it and should not be believed.

## 1. Units, and what the offset is

Everything here is in J-units: `J = obs/CRT` is a dimensionless ratio of
counts, `obs` the mixed super-`W` triple census over the natal set of `[0,W)`
and `CRT` the smooth model's expectation `6·N̄·Σ_{∏Q>W} 1/∏Q`
(`research/xchan-at29-01-segmented.js`, whose embedded OUTPUT is the source of
every measured input below). Three different numbers describe the same
mismatch and are not interchangeable:

- **Δ = 4S₂ − (1−J)_meas**, the ABSOLUTE residual in J-units. Positive means
  the closed form predicts a deeper deficit than measured. Δ = **+1.201e−4**
  at @29 and **+1.185e−4** at @31 — the same number to 1.3%.
- **d = (1−J)_meas/4S₂ − 1**, the RELATIVE offset, σ-free: **−0.41%** and
  **−0.48%**.
- **z = −Δ/σ_slot**, the significance on the slot-clustered σ of the
  pooled-floor fix (`defect-repairs.md` item 3): **−0.43** (@29, a
  non-detection) and **−2.32** (@31, the one detection).

So the offset is one 2.3σ detection plus one consistent non-detection, and
any model of it is a model of essentially one measured number. That is why
this file prices a FAMILY against exact arithmetic, tests mechanisms that are
measurable at high significance today, and pushes the decision to @37.

## 2. The candidate ladder against the exact residuals (producer 01)

`research/attack-x-offset-01-terms.js` computes the correction sums exactly
(S₃ = Σ_{x<q≤√W} q⁻³, S₄, 4Σ1/(q(q+2)), F, and the exact triple tail mass
through @37), under custody: its 4S₂, F and K reproduce the record at @29/@31
to the printed digit, and its exact tail mass reproduces the record's CRT to
**6e−11 relative** at @29 and **3e−13** at @31.

**[MEASURED] Two zero-parameter members die on the existing data.**

| candidate | @29 z | @31 z | verdict |
|---|---|---|---|
| N1: `4S₂` (the standing law) | −0.43 | −2.32 | ALIVE, χ²(2) = 5.59 |
| **C1: `4S₂ − S₃`** | **+0.04** | **−0.41** | **ALIVE, χ²(2) = 0.17** |
| C2: `4S₂ − 2S₃` | +0.51 | +1.50 | ALIVE, χ²(2) = 2.52 |
| C4: `4S₂ − 4S₃` | +1.45 | +5.33 | **REFUTED** |
| C8: `4Σ1/(q(q+2))` | +3.17 | +12.40 | **REFUTED** |

The scale is the finding: **S₃ = 1.31e−4 at @29 and 0.98e−4 at @31 — the
residual's own size and near-flatness, with no parameter**. But C1 is
**[POST HOC]**: it was found by scanning correction sums against the two known
residuals, so nothing at @29/@31 can promote it. What the levels DO settle is
the refutation of C4 and C8: any correction of size 4S₃ or larger — including
the natural-looking per-term form `4Σ1/(q(q+2))` ≈ 4S₂ − 8S₃ — dies at 5σ or
worse at @31.

**[MEASURED] The fitted one-parameter members are degenerate here.** Fitted on
@29+@31 (weighted): multiplicative ε = (4.76 ± 2.01)e−3; absolute
A₀ = (1.186 ± 0.502)e−4; c₃ = 1.20 ± 0.51 on S₃; c_l = 0.49 ± 0.21 on S₂/lnW.
All describe the two points; none is a detection of shape.

**[REFUTED] The locality shape.** If the deficit were distributed per-triple
∝ Σ_{q∈Q} q⁻² (the naive b₁-local reading of the 4S₂ agreement), the constant
κ in `1−J = κ·E_super[Σ q⁻²]` would be level-free. Measured κ:
120.4 → 228.0 → 371.1 → 571.6 over @19..@31. The deficit is NOT a
smallest-prime-local object, which §6 confirms directly.

**[DERIVED, exact] @37 separations.** With the exact tail mass at @37
(`miss = 0.070749`, `CRT = 6.167e10`) and the projected slot σ
(8.52e−6, inflation 2.14 banded [2.12, 2.17]): N1 vs C1 separate at **9.1σ**,
C1 vs the constant-absolute A₀ at **4.8σ**, C1 vs multiplicative at 3.1σ,
C1 vs C2 at 9.1σ. C1 vs the fitted S₂/lnW and c₃S₃ variants do NOT separate
at @37 (1.5σ, 1.8σ): @37 decides between "no correction", "a shrinking
S₃-scale correction" and "a constant absolute residual", not within the
shrinking family.

## 3. The line's own lattice bias (producer 02, measurement 1)

The same census on the whole 11/17 (mod 30) line, natal sieve off, isolates
the equidistribution of the CRT solution points against the cut at `W` — a
component the natal J inherits and the smooth denominator ignores.

**[MEASURED] β = J_line − 1 is positive at all four levels, decaying, and
unambiguous at the sharp ones:**

| x | β = J_line − 1 | z vs 1 | β/4S₂ | β/S₃ (sighting) |
|---|---|---|---|---|
| 19 | +9.88e−3 | 2.29 | 0.240 | 38.9 |
| 23 | +7.44e−3 | 8.67 | 0.221 | 43.2 |
| 29 | +5.38e−3 | 34.73 | 0.186 | 41.0 |
| 31 | +4.03e−3 | 147.59 | 0.163 | 41.3 |

Two consequences. First, the object the ~3.8 law fits is a **net**: reading
the split multiplicatively (a MODEL — see §7), the sieve-only deficit
`1 − J/J_line` is 0.03402 at @29 and 0.02859 at @31, i.e. **1.18× and 1.15×
the 4S₂ that the net fits to half a percent**. Whatever derivation eventually
produces the constant has to produce it for the net, or produce both
components. Second, β's decay is NOT proportional to S₂ (β/4S₂ falls
monotonically), while β/S₃ sits at 39–43 over four levels — recorded as a
sighting, not fitted.

## 4. The control, truth known in the same pass (producer 02, measurement 2)

Seeded random masks on the line at exact natal density (sfc32, seeds
in-file). Each draw is an unbiased subsample of the line, so its truth is the
same level's J_line, known in the same pass. Seven draws:

| level | z = (J_ctrl − J_line)/σ_slot per seed |
|---|---|
| @19 | 0.01 |
| @23 | 0.73, 0.25, 1.51 |
| @29 | 0.50, 1.88, −0.23 |

**[MEASURED] All seven inside 1.9σ, spread of order 1σ.** The pipeline
applied to a set with no arithmetic structure returns its truth, and the
slot-clustered σ — the error bar that carries the @31 offset detection at
z = −2.32 — is neither understated nor overstated at the scale these draws
resolve. P1 (aligned super-W ≡ 0) holds on the line and on every draw, as
registered (it is a theorem about ∏Q > W, not about the sieve).

## 5. The marginal-corrected denominator (producer 02, measurement 3)

The census accumulates the exact per-prime strike counts n_q^L, n_q^R over
natal slots and rebuilds the denominator from them:
`CRT' = N̄·Σ_{i<j<k, super}[∏(u_L+u_R) − ∏u_L − ∏u_R]`, u = n/N̄. If the
offset were the marginals' deviation from 1/q over one period, the residual
against CRT' would vanish at every level.

**[MEASURED] It does not — the correction is sign-erratic:**

| x | Δ(smooth) | Δ(marginal) | moved |
|---|---|---|---|
| 19 | +9.77e−4 | +2.40e−3 | −145% |
| 23 | −3.90e−4 | −1.27e−3 | −224% |
| 29 | **+1.20e−4** | **−2.20e−5** | **+118%** |
| 31 | **+1.19e−4** | **+1.83e−4** | **−55%** |

At @29 the marginal correction absorbs the whole offset; at @31 it deepens
it. A mechanism carrying a residual that is stable at +1.19e−4 across both
sharp levels must move it by ≈ +100% at both. **The marginal-discrepancy
explanation is closed as the offset's carrier**; what the @29 coincidence
shows is that the empirical marginal correction is itself
fluctuation-dominated at these populations (its size, ±1e−4 relative on the
denominator, is exactly the residual's scale — which is why it had to be
measured rather than assumed negligible).

## 6. Where the deficit lives (producer 02, measurements 4-5; producer 03)

### 6a. The profiles

The deficit decomposed two ways, numerator and denominator sharing the same
exact integer U-tests. At @31 (aggregate D = 0.0247, all figures from the
embedded OUTPUT):

- **∏Q-octaves** (bin m: ∏Q ∈ (2^m·W, 2^{m+1}·W]): D_m = 0.018, 0.040,
  0.047, 0.036, 0.014, then 0.006–0.009 across octaves 5–8, rising again to
  0.023 and 0.059 at octaves 9–10, and **flipping to surplus −0.011 at 11+**.
  Bins sit 92 to 283σ from the aggregate.
- **Smallest prime q₁**: D_b = **+0.069** at q₁ ∈ [37,119] falling through
  zero to −0.009 near q₁ ~ 1300–4000, rising to +0.149/+0.182 at
  q₁ ~ 1.3e4–1.4e5, and **−1.22 (a 2.2× surplus) at the near-√W bin**.

The @29 tables have the same shape one level down. The raw line shows the
same qualitative structure at ~10× smaller amplitude (deficit-side octaves
mildly negative, far octaves increasingly surplus, near-√W bin at −0.30).
**The aggregate ~3.8 law is the CRT-mass-weighted net of this structure**;
the law's derivation, and the offset's, must fit these tables, and the
tables are now on the record at 100σ-per-bin precision.

### 6b. The derived component: the cofactor-one layers

`research/attack-x-offset-03-cofactor.js`. For a scour pair d = q₁q₂ with
d ∈ (W/2^{s+1}, W/2^s] and 2^{s+1} below the smallest scour prime, the only
multiple of d in [0,W) that can be natal is r = d itself: every even
cofactor misses the 11/17 line and every cofactor with a base-prime factor
kills r-side natality, so the first eligible cofactor above 1 is the
smallest scour prime, which turns the pair into a triple and leaves the
layer. On that layer r = d is automatically a unit mod 30 and automatically
coprime to every base prime, so

> **#{natal r in the strip} = #pairs · (1/4)·∏_{7≤p≤x}(p−2)/(p−1)** —

an enrichment over the smooth model of exactly **∏_{p≤x} p/(p−1) → e^γ ln x**
(Mertens). **[MEASURED, DERIVED]** Verified per strip at four strips per
level: aggregate relative deviation +0.191% (@19, n = 10,134), +0.026%
(@23), +0.006% (@29), **+0.001% (@31, n = 68,409,827 natal points over
5.05e8 pairs)**. Measured enrichment 6.5423 against derived 6.5423 at @31.

This is the mechanism of the far-octave and near-√W surpluses in §6a, on the
line (enrichment 30/8 = 3.75, no base factors) and amplified on the natal
set (∏ p/(p−1), growing like e^γ ln x) — the first exactly-derived component
of the joint census. It is a SURPLUS component: it pushes J up, against the
bulk deficit, and its weight is concentrated where the profile's sign flips.
Deriving the full small-cofactor contribution (cofactors that are scour
primes and semiprimes, and the b-side divisor coupling) is the natural
continuation of the item's analytic target, and it is a closed-form
computation over prime sums, not a census.

## 7. What this does not show

- **No derivation of 4S₂, and none of the offset.** The candidate C1 = 4S₂ − S₃
  is a POST HOC scale match; the cofactor-layer law (§6b) derives a COMPONENT
  of the census, not the law. The open analytic target of TODO item X is
  narrowed, not met.
- **The offset is still one detection.** Nothing here adds a sharp level; @37
  is where the family separates, and its pre-registration is committed.
- **The fitted members are two-point descriptions** with ~40% parameter error
  bars; no shape claim is made from them.
- **The multiplicative line/sieve split is a model.** J = J_line·(J/J_line) is
  arithmetic; reading J/J_line as "the sieve-only deficit" assumes the natal
  mask samples the line's lattice bias neutrally. The random-mask control
  supports that for random masks; the natal mask is not random.
- **j = 4 remains untouched**, as in the record.

## 8. Files touched

- `research/attack-x-offset-01-terms.js`: new, embedded (170.2 s), READINGS
  appended below the OUTPUT banner, binding re-checked.
- `research/attack-x-offset-02-profile.js`: new, embedded, READINGS appended,
  binding re-checked.
- `research/attack-x-offset-03-cofactor.js`: new, embedded (116.8 s),
  READINGS appended, binding re-checked.
- `research/history/staging/xchan-at37-offset-prereg.md`: new, committed
  **alone** before any @37 census of any kind exists.
- `research/history/staging/item-x-offset.md`: this file.

No live document was edited. The TODO item X update is proposed in §10 and
not applied.

## 9. Gate

**Before:** `node research/qc.js` TOTAL = 2, both pre-existing and neither
this session's: the documented `natal-cap-27-t4-at13.js` embeds finding, and
an `uncited-script` on another live session's `attack-advmin-1113.js`.

**After:** `node research/qc.js` TOTAL = **0** — all eleven checks clean,
including `scripts` (all three producers are cited by this file) and `embeds`
(the three OUTPUT bindings verify with the READINGS appended). The two
pre-existing findings cleared under the shared tree while this session ran;
none of this session's files ever appeared in the finding set.

All three producers are formally embedded; READINGS were appended below the
OUTPUT banners. `embed.js --check` re-verified code-sha256 and out-sha256 on
producers 01 and 03 by full re-execution; producer 02's binding is verified
by the static `embeds` check above (its own `--check` is a second 2948 s
census execution and was left running when this file was written — its
verdict, PASS or FAIL, belongs to the session record, and a FAIL would be a
reproducibility finding against a file whose two prior executions agreed).

## 10. Proposed update to TODO item X (report only, not applied)

Replace the clause *"the derivation stays the open analytic target and must
now produce the offset too"* with:

> The offset now has a priced candidate family
> (`research/history/staging/item-x-offset.md`): `4S₂ − S₃` fits both sharp
> levels inside 0.5σ (POST HOC — found against the known residuals), the
> ≥ 4S₃-sized corrections and the per-triple locality shape are REFUTED, the
> marginal-discrepancy and instrument/σ mechanisms are closed by measurement,
> and the @37 blind test that separates {no correction | shrinking S₃-scale |
> constant absolute} at 4.8–9.1σ is pre-registered
> (`xchan-at37-offset-prereg.md`, committed alone at `0a7dd73`; the @37
> natal census is an overnight run on the existing segmented instrument).
> Two structural facts now constrain the derivation itself: the natal J is
> the net of a POSITIVE line-lattice bias (J_line − 1 = +4.03e−3 at @31,
> z = 148, decaying) and a deeper sieve deficit (1.15–1.18 × 4S₂ under the
> multiplicative split); and the deficit is a structured profile (octave
> bins 0.006 to 0.059 with a sign flip, each 100σ+ from the aggregate) whose
> far-super-W surplus component is exactly derived: the cofactor-one layers
> are natal-enriched by ∏_{p≤x} p/(p−1) → e^γ ln x, verified to 0.001% at
> @31 (`research/attack-x-offset-03-cofactor.js`). An aggregate-only
> derivation of the ~3.8 constant is no longer checkable-complete: it must
> reproduce the profile tables.
