# Red team, 2026-08-20 evening: the two held empirical headlines attacked

<!-- ledger
id: Q-redteam-0820-empirical
status: ANSWERED
todo: none
question: Do the two held empirical headlines, perfold-error-model and item-x-offset, survive an adversarial pass before integration?
verdict: Both SURVIVE: every decisive statistic reproduced digit-for-digit on independent code, the blind window was re-sieved and re-scored 33/37 with independently re-derived bands, and the cofactor purity claim is certified; two sentences are weakened (the anchor-direction identical is only bounded at 6-10 per cent, and the @31 sigma calibrated claim outruns its controls) and one sentence is refuted as stated.
-->

*(2026-08-20. Adversarial verification pass over the two staged headlines
`perfold-error-model.md` and `item-x-offset.md`, before integration. Method:
refuted-until-rederived; every decisive statistic recomputed on a different
code path from the embedded artifacts; instruments calibrated on known-truth
controls in the same pass. Scratch producers live outside the tree and are
quoted inline. Grades: CONFIRMED / WEAKENED (with corrected sentence) /
REFUTED (with counterexample). Bottom line: both headlines SURVIVE — every
decisive number reproduced digit-for-digit on independent code, the blind
window re-sieved and re-scored 33/37 with independently re-derived bands, the
cofactor purity claim certified as a theorem — with two sentence-level
weakenings that should be applied before integration: the anchor-direction
"identical" in T1 is only bounded at ~6–10%, and the @31 σ "calibrated" claim
in T2 outruns its controls. One sentence is refuted as stated (T2.x).)*

## T1. perfold-error-model.md

### T1.a Decisive statistics recomputed — CONFIRMED

Both statistics were recomputed on a different code path, twice over.

1. **A fully independent sieve engine was written from the definition**
   (keys marked in increasing prime order with conditional writes where the
   producer marks decreasing/unconditional; X counted by a merge-on-equal
   monotone stack instead of kills−runs bookkeeping) and calibrated on the
   record first: it reproduces ΣX = 203165 (2·10⁷), 2031788 (2·10⁸),
   20317943 (2·10⁹), 203176087 (2·10¹⁰) and **every per-fold X in
   [101, 1499] at all five re-sieved windows, 214/214 folds each**, against
   the embedded tables.
2. **Anchor-replicate χ²** = Σ(X_a−X_b)²/(X_a+X_b) over the 43 folds with
   X_a+X_b > 0: **50.2/43 = 1.167** — identical from my parse of the embeds
   AND from my own raw re-sieve of both 2·10⁹ windows (anchors 0 and
   10¹⁰+2; the report's "anchors 0 and 10¹⁰" is off by the +2 the engine
   itself requires). Report's 1.17 CONFIRMED.
3. **Cross-window fold-factor deviance**, pooled M̂ per fold, cells λ ≥ 0.5:
   **G/df = 180.0/183 = 0.983**. Report's 0.98 CONFIRMED. The λ chain was
   rebuilt by the record's own recipe with my own parser (B2 verbatim for
   p ≥ 307, formula + m̄ chains below) and revalidated: decade sums at ratio
   1.0001, clause replay 32 of 74 exact.
4. **The rival's readings are real, not tuned**: i.i.d. NB(k = 3) data pushed
   through MY implementations of the same two statistics gives anchor
   χ²/df ≈ 14.5 and G/df ≈ 74 (their seeded control C read 11.63 and 50.09;
   same order, both a factor ≥ 10 above the real data). The refutation of
   window-level mixing stands.

### T1.b Prereg custody and blind re-score — CONFIRMED

- **Commit graph**: 199dd33 (10:38:46) contains ONLY the prereg;
  `attack-perfold-02-blindwindow.js` first exists at f0eb201 (10:50:44).
  The prereg file is byte-identical between 199dd33 and HEAD.
- **The sealed bands had no tuning surface.** Both source embeds predate the
  prereg by half a day or more (`attack-foldL-06-scaling.js` at f7217ca,
  2026-08-19 15:52; `foldL-window5-01-extinction.js` at f34e5c0 22:30, only
  comments added since). I recomputed every (Sx, Sλ, λ_h) pool myself from
  those committed embeds: **all 37 match the sealed table exactly**, and my
  own NB quantile code (different lgamma, different scan) reproduces **all
  37 sealed band pairs integer-exactly**. So the bands are a deterministic
  function of data committed before the prereg — the only freedom was the
  model formula itself, declared in the same sealed note.
- **Anchor freshness**: `git grep` at 199dd33 finds no prior use of
  66,000,000,000 (the one hit is FOLD-PROFILE's unrelated 6.6·10⁴p²).
- **Blind re-score from my own re-sieve of [6.6·10¹⁰, 6.6·10¹⁰+2·10⁹)**
  (my engine, my bands): **in-90% = 33/37, outside-99.73% = 0/37, old clause
  29/37 = 78.4%** — digit-identical to the producer, misses at the same four
  folds (107, 113, 137, 257). HIT under the sealed rule CONFIRMED.
- Residual, inherent to self-run preregs: git cannot exclude unrecorded
  pre-runs before 10:38. Priced: under the rival the HIT chance is < 2%, so
  anchor-shopping cannot cheaply fake the discrimination; low concern.

### T1.c Strongest confound: anchor/scale-dependent mixing — WEAKENED (one sentence)

The strongest confound is not i.i.d. mixing (dead, §T1.a) but a **slowly
anchor-varying field**: M_{p,anchor} = M_p·exp(δ), δ ~ N(0, σ_δ²) per
(fold, anchor). Monte Carlo with the real (M̂_p, λ_p) grid, my own RNG
(mulberry32, not the producer's sfc32), 4000 replicates per point:

| σ_δ (per-anchor jitter) | mean χ²/df | P(χ²/df ≤ 1.167) | P(HIT-a at blind window) |
|---|---|---|---|
| 0.00 | 1.00 | 0.82 | 1.000 |
| 0.06 | 1.16 | **0.55** | 1.000 |
| 0.10 | 1.46 | **0.21** | 0.991 |
| 0.15 | 1.99 | 0.03 | 0.915 |
| 0.20 | — | — | 0.737 |

So the observed 1.167 is fully typical under anchor-to-anchor variation of
**up to ~6% relative sd, and only weakly disfavoured at ~10%**; the blind HIT
itself tolerates ~15–20%. One anchor pair at one length is simply not enough
replicates to pin "identical". **Across window lengths the bound IS tight**:
per-window jitter ≥ 3% already makes G/df = 0.983 a ≤ 3% event (my table:
σ_w = 0.03 → P(G/df ≤ 0.983) = 0.03; σ_w = 0.05 → mean G/df = 1.62).
CORRECTED SENTENCE for the headline: *"M_p is constant in window length to
within ~2–3% relative sd over 2·10⁷…2·10¹¹, and constant across the three
anchors tested to within the ~6–10% resolution one replicate pair affords —
'deterministic' is the surviving model class, not yet a measured identity in
the anchor direction."* Everything else in the note (the NB predictive, the
mixing refutation, the blind protocol) survives this refinement untouched,
because the predictive bands price fold identity, not anchor identity.

### T1.d The 8/8 import-stein unification — CONFIRMED (wording nit)

Recomputed all ratios λ_derived/λ_model at 2·10⁹ against pooled M̂ with my
own parse and pools: **8/8 agree, and the producer's +0.05·M̂ tolerance slack
never fires — strict ±2se alone passes all 8** (p = 211: |2.189 − 2.225| =
0.036 < 2se = 0.089; worst case p = 331 at 0.60×2se). The tolerance choice is
not load-bearing. Nit: import-stein §2.4 prints **14** folds, not 8; the
producer's disclosed Sx ≥ 15 precision filter drops 401, 421, 457, 499, 601,
701. I recomputed the dropped six WITHOUT the filter: **all consistent too**
(max 0.40×2se, error bars huge), so the filter hides nothing — but "at all 8
folds where §2.4 prints the derived first moment" should read "at all 8 of
the 14 printed folds with pooled X ≥ 15 (the other 6 agree trivially)".

### T1.e Is retiring ±3√λ licensed? — CONFIRMED with a scope clause

The clause was registered, scored, and failed twice independently: 32/74 =
43.2% at W = 2·10¹¹ (p ~ 10⁻¹⁹ against 90%) and now 29/37 = 78.4% at the
blind window (P(≤29 | true 90%) ≈ 0.02, a marginal rejection on its own, and
the model predicted 28.1). Retiring it as the per-fold error model of the
law, and quoting NB fold-factor bands in future preregs, is licensed — with
one scope clause the proposed §5 text should carry: the failure mechanism is
the first-moment shift (M_p−1)√λ, which GROWS with window length; at
Y ≤ 2·10⁸ the old clause still holds approximately (the P(old-clause)
column's small-λ rows are ≈ 1.00) and was never separately refuted there.
Since future window preregs run at larger Y, the retirement is licensed in
exactly the direction it will be used; §6's honest √(1 + Y/ΣY′) widening
already prices the sixth decade. No overreach found in the §7 consequences
EXCEPT the T1.c sentence ("identical across anchors") which propagates into
prop-thinning-null's proposed replacement text and should carry the
corrected wording above.

## T2. item-x-offset.md

### T2.a The two exclusions recomputed — CONFIRMED

My own sieve, my own tail pass (independent implementation of the exact
U-test), measured (obs, CRT, σ_slot) cited from the xchan embed as the report
does:

- Prime sums and tail masses reproduce to the digit at all levels
  (4S₂ = 0.028943 / 0.024784; S₃ = 1.3114e−4 / 9.7575e−5; my rebuilt
  CRT = 55252747.16 / 1695051393.52, rel 6e−11 / 3e−13).
- **C4 = 4S₂−4S₃: z = +1.45 / +5.33 — REFUTED at @31. C8 = 4Σ1/(q(q+2)):
  z = +3.17 / +12.40 — REFUTED at both.** Identical to the report.
- **Locality shape: κ = (1−J)/T3avg recomputed = 120.37 → 228.04 → 371.10 →
  571.55** over @19..@31. A constant-κ per-triple law is dead; the 120→572
  quote is exact.
- The four fitted members re-fit with my own weighted code: ε = 4.7550e−3 ±
  2.0124e−3, A₀ = 1.1858e−4 ± 5.0169e−5, c₃ = 1.1978 ± 0.508, c_l = 0.4909 ±
  0.208 — all digit-identical.

### T2.b The σ calibration controls — WEAKENED (corrected sentence)

The seven control draws are genuine and pass as quoted (z = 0.01; 0.73,
0.25, 1.51; 0.50, 1.88, −0.23). Three limits the verdict sentence hides:

1. **No control exists at @31** — SEEDS = {19:[1], 23:[1,2,3], 29:[1,2,3],
   31:[]} in the producer. The one level carrying the detection (z = −2.32)
   has zero known-truth draws; its inflation (2.124) is measured from the
   natal data itself.
2. **Seven draws bound the σ scale only to a factor ~[0.65, 2.0]** (Σz² =
   6.71 ~ χ²₇; 95% interval on the true/reported σ ratio). A σ understated
   by 30% — fully consistent with these controls — moves the @31 detection
   from 2.32σ to ~1.8σ.
3. **Exchangeability is partial by construction.** The control statistic is
   J_ctrl − J_line: a random mask scored against the same window's own line
   truth, so any level-scale arithmetic fluctuation CANCELS in the control
   but does NOT cancel in the test statistic (natal J against an analytic
   formula). The controls therefore validate unbiasedness and the
   sampling-noise scale of the estimator, not the implicit null that the
   full-period arithmetic residual fluctuates at σ_slot scale.

CORRECTED SENTENCE for verdict item 1: *"The σ estimator is validated as
unbiased at random-mask truth and its scale is consistent within the factor
~2 that seven draws at levels ≤ @29 can resolve; no control was run at @31,
and the offset remains one 2.3σ detection whose σ rests on the natal data's
own clustering estimate."* This does not reopen the C4/C8 kills (5.3σ and
12.4σ survive any plausible σ miscalibration) but it does mean N1's death
warrant cannot be signed at @29/@31 — which the report already says
(z = −2.32 is its own §1 "one detection").

### T2.c The cofactor-1 strip identity re-derived — CONFIRMED as derived-conditional; "exact" needs one word

Re-derivation from scratch, in three parts:

1. **The purity claim is a THEOREM and I certify it.** For d = q₁q₂ in
   (W/2^{s+1}, W/2^s] with 2^{s+1} ≤ 16 < q_min: any cofactor m ≥ 2 has
   m < 2^{s+1} ≤ 16, so every prime factor of m is ≤ 13, i.e. in
   {2, 3, 5} ∪ base primes (7, 11, 13 are base at every level here, x ≥ 19).
   Even m leaves the odd line; 3 | m or 5 | m leaves {11, 17} mod 30; a base
   factor kills r-side natality; and any factor > x would be ≥ q_min > 16 > m.
   Hence m = 1. Verified exhaustively at @19 with my own code: **257,704
   higher multiples scanned, 0 natal**.
2. **The enrichment factor is exact algebra**: P(natal | pair)/P_smooth =
   [¼·∏(p−2)/(p−1)] / [(1/15)·∏(p−2)/p] = (15/4)·∏_{7≤p≤x} p/(p−1) =
   ∏_{p≤x} p/(p−1), since 15/4 = 2·(3/2)·(5/4). The limit e^γ·ln x is
   Mertens' third theorem. Both CONFIRMED (my arithmetic: 5.8471, 6.1129,
   6.3312, 6.5423 at @19..@31, e^γ ln 19 = 5.2443 — all match).
3. **The count law itself is an EXPECTATION under joint equidistribution of
   q₁q₂ over the unit classes mod 30·∏p — not a CRT counting identity.**
   The ¼ and the (p−2)/(p−1) are exact only if scour-pair products
   equidistribute; the producer discloses this ("WHAT THE UNIFORMITY
   ASSUMPTION IS") but the report's verdict item 5 ("is now DERIVED …
   derived exactly") compresses it away. I re-counted every strip at every
   level with my own enumeration: **digit-identical to the producer at all
   16 strips** (e.g. @31: 505,212,797 pairs, 68,409,827 natal, dev +0.001%).
   The deviations are ~0.1–0.2× the Poisson scale of the natal counts
   (e.g. @31: 734 counts against √n ≈ 8300) — the equidistribution is
   sub-random-good, which is itself a striking measured fact, not a proof.
   CORRECTED WORD: "derived exactly, given pair-equidistribution, and the
   equidistribution measured to 0.001% at @31".

### T2.d POST HOC hygiene of 4S₂−S₃ — CONFIRMED

Every occurrence of the candidate in the tree (item-x-offset.md lines 20,
88, 245, 300; xchan-at37-offset-prereg.md line 36) carries POST HOC or the
found-against-the-known-residuals framing in the same sentence or row. No
live document mentions it. The prereg's upgrade path ("survived one blind
level" only if |z_C1| ≤ 3 at @37) is the correct promotion rule. Nothing
leans on C1 as established.

### T2.e The @37 kill rule's σ — CONFIRMED

Recomputed from scratch: miss(37) = 0.070749 (my own K = 198,274 tail pass),
N̄(37) = 145,286,237,250, CRT(37) = 6.1673e10, σ_reg = 3.9826e−6,
σ_slot = 2.14 × σ_reg = 8.5228e−6. All 21 pairwise separations
digit-identical (N1 vs C1 = 9.1σ, C1 vs M-abs = 4.8σ, C1 vs C2 = 9.1σ).
The separations use the SLOT-CLUSTERED σ (2.14× the naive one), i.e. the
conservative choice; the inflation 2.14 [2.12, 2.17] is a projection from
the measured 2.078 → 2.106 → 2.124 with decreasing increments (reasonable),
and the prereg's supersede clause makes the run's own σ authoritative — so
even a 2.3 inflation only shrinks 4.8σ to ~4.5σ. The kill threshold |z| > 3
on the run's own slot σ is the right instrument. One dependency to know:
σ_reg uses obs ≈ (1−ω)·CRT with ω from C1 — candidate-dependence is O(0.1%),
immaterial.

### T2.x Unrequested finding: the "each bin 100σ+" sentence is false at one bin

item-x-offset.md §6a says the @31 octave bins "sit 92 to 283σ from the
aggregate", verdict item 6 says "each bin hundreds of σ", and §10 says "each
100σ+". The producer's own embedded table has octave bin m = 9 at
**(D_m−D)/σ_m = −7.47** and bin 0 at −92.6: eleven of twelve bins are ≥ 92σ,
one is at 7.5σ. CORRECTED SENTENCE: *"eleven of the twelve octave bins sit
92–283σ from the aggregate; bin 9 sits at 7.5σ"*. The profile-shape
conclusion is untouched (the bins collectively refute any constant-deficit
reading at astronomical significance), but the "each" claims should not
integrate as written.

## Verdict table

| # | Claim | Grade |
|---|---|---|
| T1.a | anchor χ²/df = 1.17, G/df = 0.98, vs mixing's ~11.6 / ~50 | **CONFIRMED** (twice, once from raw re-sieve) |
| T1.b | prereg custody + blind 33/37, 0/37, old clause 29/37 | **CONFIRMED** (bands derivable only from pre-committed data; re-scored from an independent sieve) |
| T1.c | "M_p identical across window lengths and anchors" | **WEAKENED**: length-constancy bounded at ~2–3%; anchor-constancy only bounded at ~6–10% by one replicate pair — corrected sentence in §T1.c |
| T1.d | 8/8 import-stein unification, p=211 2.189 vs 2.225 | **CONFIRMED** (passes strict ±2se; slack unused; 6 filtered folds also agree; "8 of 14 printed" wording fix) |
| T1.e | retiring ±3√λ per §5 consequence | **CONFIRMED** for future (larger-Y) preregs; never separately refuted at Y ≤ 2·10⁸, add scope clause |
| T2.a | C4 dead 5.3σ, C8 dead 12.4σ; locality κ 120→572 | **CONFIRMED** (digit-identical recompute) |
| T2.b | "the σ behind the @31 detection is calibrated" | **WEAKENED**: no @31 control; 7 draws bound σ scale to factor ~[0.65, 2.0]; control cancels what the test statistic does not — corrected sentence in §T2.b |
| T2.c | cofactor-1 layer law exact, enrichment ∏p/(p−1) → e^γ ln x | **CONFIRMED as derived-conditional**: purity is a theorem (certified + exhaustively verified), enrichment algebra and Mertens limit exact, count law is an equidistribution expectation measured to 0.001% |
| T2.d | report does not lean on 4S₂−S₃ | **CONFIRMED** |
| T2.e | @37 separations 4.8–9.1σ on slot-clustered σ | **CONFIRMED** (recomputed from scratch incl. miss(37); conservative σ family) |
| T2.x | "each octave bin 100σ+" | **REFUTED as stated**: bin 9 sits at 7.5σ (11 of 12 are ≥ 92σ); one-sentence fix, conclusion survives |

**Most load-bearing correction**: T1.c — the headline word "identical across
… anchors" must become a bound (~6–10% from one 2·10⁹ replicate pair) before
the model statement integrates or propagates into prop-thinning-null.
Second: T2.b — the @31 detection's σ is uncontrolled at @31 itself and the
verdict sentence "the σ … is calibrated" needs the §T2.b wording.

## Method and instruments

All decisive numbers recomputed on different code paths: an independent
streaming sieve (calibrated on the embedded [0, 2·10⁹) record, 214/214 folds
at five windows, then run at the blind anchor), an independent NB quantile
stack (Stirling lgamma), an independent tail-mass/T3 pass through @37, an
independent strip enumerator with an exhaustive purity scan, and Monte Carlo
confounds on my own RNG. Scratch producers: rt-t1-sieve.js, rt-t1-stats.js,
rt-t1-confound.js, rt-t2-sums.js, rt-t2-cofactor.js in the session
scratchpad (not part of the tree; every number above is restated here).

## Not reached

- The xchan @29/@31 censuses themselves (obs, CRT, σ_slot) were cited from
  their embeds, as the producers do — not re-sieved (the @31 census alone is
  ~50 min). The two CRTs were rebuilt exactly from my own tail masses; obs
  was not independently re-counted.
- Producer 02's line/marginal/profile tables (2948 s census) were accepted
  from its embed after internal-identity checks (Σ_b = Σ_m = aggregate,
  gate-vs-xchan PASS lines); its census kernel was not re-executed. The §3
  and §5 derived ratios (1.15–1.18×, sign-erratic marginals) were verified
  arithmetically from the embedded numbers only.
- The W = 2·10¹¹ window was not re-sieved (≈ 20+ min); its X entered T1
  through the embedded C1 table, cross-checked against ΣX = 2,031,759,826.
- The prereg's unscored columns (P(old clause), expected 34.6 / 28.1) were
  not re-derived; the scored objects (all 74 band integers) were.
- embed.js --check was not re-run on any producer (concurrent gate work;
  judged on content per brief).

---

*Adversarial verification note; grades and corrected sentences above are the
deliverable. Nothing here edits the audited files.*
