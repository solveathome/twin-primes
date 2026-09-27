# Red team, 2026-08-21 second wave, analytic: b2mean, f4weak, quartic

<!-- ledger
id: Q-redteam-0821-wave2
status: ANSWERED
todo: none
question: Do the three held analytic attacks, b2mean, f4weak and quartic, survive an adversarial re-derivation?
verdict: The arithmetic of all three is clean, several dozen numbers spanning all three producers reproducing exactly through independent implementations, and the custody is clean on all three; one reading is WEAKENED, and it is one of the two the brief flagged as programme-steering.
-->

**Adversarial verification of the three held analytic attacks
(`attack-b2mean-01.md`, `attack-f4weak-01.md`, `attack-quartic-01.md`),
refuted-until-rederived, through this session's own code. Bottom line: the
arithmetic of all three files is clean — every number attempted (several
dozen, spanning all three producers) reproduced exactly through independent
implementations — and the custody is clean (`embed.js --check` re-run on all
three producers: code-sha, out-sha, bit-honest body). One reading is
WEAKENED and it is one of the two the brief flagged as programme-steering:
the quartic's "the sub-Gaussian deficit is carried almost entirely by the
decaying self-pairing Q" fails on its own printed numbers at z = 17 and 23,
where the genuine off-diagonal carries 41–43% of the deficit and shows no
decay trend; the corrected sentence is in §3(b). The other steering claim —
f4weak's "β₂ inside the error bar" — is arithmetically CONFIRMED and robust
to deleting any point, but it is an absence-of-power statement (95% band
3.25..5.18 on five points whose local slopes scatter 3.3..7.8): quote it
only with the producer's own "undecided by the window", never as support.**

## 0. METHOD AND CUSTODY

Own code, session scratchpad (`rt0821w2a-{lemmaJ-mv,sweep,zstar,modes,fits,
derive,chain}.js` + `zagier1973.pdf`): fresh implementations of the subset
sweep, the full-period walker (increment route, wrap-checked), the mode
enumeration (direct `c_j mod e` phases — a different route from the
producers' class-map inverses), the H-builder (direct F*_e tables, not the
Möbius/cotangent recursion), the RS-envelope scan, and all OLS fits. The
only shared machinery is `buildTerms` — the lattice definition itself,
already rebuilt from definitions with identical term multisets in
`redteam-0821-exponent.md` §1.3. Zagier read at page images fetched
independently (MPIM copy of Math. Ann. 202). `qc/embed.js --check` re-run
on all three producers: all match (f4weak's 2-figure advisory is its
disclosed prose-arithmetic floor).

## 1. TARGET attack-b2mean-01

- **(a) Lemma J — CONFIRMED.** Re-derived: the classical (e²−1)/12 identity
  and the primitive/imprimitive split checked independently (e = 2..400,
  general e including prime powers, worst rel 5.2e-14); the Möbius step
  Σ_f μ(e/f)f² = J₂(e) and Σμ = 0 verified as exact integer identities. The
  12 is right; the split is exact.
- **(b) Theorem MV — CONFIRMED.** Chain algebra re-derived: h = f−1 ≥ 0 and
  h_J ≥ 0 at every prime < 1e6; the divisor-trick inequality
  Σ_{1<e≤X, e|P(z)} f(e) ≤ X·Π(1+h/p) brute-forced over a (z, X) grid, no
  violation; the claimed orders are real (A/ln²z → 1.14, Π(1+h/p)/ln³z →
  0.080 at z = 1e6), so MV2 = O(qmax·ln⁷z) against the trivial ladder's
  ln⁸ — the one-log gain is genuine, and measured 2.14×/3.37× at 13/47. Own
  sweep reproduces B, B₂, MV0, MV1, MV2, and the Theorem-1 step maxima
  (Vabs/T ≤ 0.3333, T/(3Aρ) ≤ 0.9927) at z = 13, 23, 31, 47 to every
  printed digit; chain HOLDS. The named stall MV0/B₂ ≈ 4.9e2–5.9e2 at my
  four levels — the flat ~600× as printed.
- **(c) The fully-analytic cap — CONFIRMED.** Own arithmetic at 13/23/31/47:
  capMV1J − β₂ = −0.5296, −0.1801, −0.0560, +0.1385 — identical; below β₂
  at 13..37, crossing at 41, exactly as claimed. cap3′ and the 1.479–1.487
  flat gain (vs the per-z ζ(2) cap) also reproduce. The MS3′ chain and its
  step costs (max_a 2.08/6.04/6.75×, triangle 5.84/3.44/2.93×) reproduced
  mode-exactly at 13, 17, 19 through my own spectral pass.
- **(d) z\* — CONFIRMED, and the headline is honest about the spread.** Own
  RS-envelope implementation: ln z\* = 28.65 / 30.81 / 34.66 at c_M = 0.35 /
  0.1 / 0.01 (z\* = 2.78e12 / 2.40e13 / 1.12e15 — the 2.77e12 is grid
  resolution), no re-crossing out to ln z = 200, cap → 3.5. The RS formula
  dominates my own exact-prime scan at every prime 285..150000 (min gap
  0.24 of exponent), and the exact window [13, 149993], peak 5.695 at
  z = 31, reproduces. The headline itself carries all three c_M values and
  the rider's grade; Δln z\* = 6.0 for the factor-35 c_M drop checks. The
  one caveat stands as flagged: c_M = 0.35 is the measured M·ln²z scale,
  and the located z\* moves logarithmically in it (28.65 → 38.4 even at
  c_M = 0.001).
- **(e) Decay-law fits — CONFIRMED.** Fixed-ω slopes at z = 23 and 47
  reproduced to the digit by my own per-ω OLS (ω=1: −0.97±0.15 / −0.99±0.07
  through ω=8: −2.08±0.06); the collinearity handling (fixed-ω decides, F2
  quoted with its 0.5–0.8 rmse) is sound. The ℓ²-route kill reproduced
  exactly: 55.83× / 665.20× truth at 13/17 in my own enumeration.

## 2. TARGET attack-f4weak-01

- **(a) MV(α) ⟹ RML(α) — CONFIRMED, airtight.** The expansion of ρ̃ on ℤ/W
  is finite and exact; ĉ(0) = 0 (own walker: |mean| ≤ 5e-9 at 13..23, and
  own Parseval closes against m₂ to 3e-11, which pins the DC mode); the
  sine denominators are all at reduced a/e ∉ ℤ. So sup|ρ̃| ≤ Σ|ĉ| = Λ is
  the plain triangle inequality, pointwise in y with no sup on the right —
  verified numerically with 3.2–3.7× slack, and my own direct-phase Λ
  reproduces 9.801 / 25.157 / 60.031 / 121.250 at 13..23 to every digit.
  Λ ≤ Cz^α therefore gives RML(α) (`rho-maximal-law.md` §1 form) verbatim;
  the pricing riders carry over as flagged there.
- **(b) N(z) and the mode-count death — CONFIRMED.** Own divisor
  enumeration reproduces N at 13/23/31/47 exactly; own OLS on the ten-point
  table returns 8.174 ± 0.249 (√N·rms) and 11.876 ± 0.328 / 12.531 ± 0.465
  (N, full/tail) — identical. Dead from z = 31 as printed.
- **(c) The 4.214 ± 0.304 fit — CONFIRMED as arithmetic, with a reading
  rider.** First, a brief correction: the estimator control is a z^3.7
  synthetic (returns 3.700000; there is no z^2.5 control in this file) —
  it calibrates slope recovery, not the error bar. My re-fit reproduces
  4.214 ± 0.304; leave-one-out slopes run 4.12–4.52 and β₂ stays inside
  1 s.e. in all five — the claim is robust to any single point, including
  the one not independently recomputed (z = 29). But the local pairwise
  slopes are 3.51, 7.82, 3.68, 3.32 — scatter, not a trend — and the
  95% t-band is [3.25, 5.18]. **Corrected reading for any onward use: the
  window cannot distinguish α < β₂ from α > β₂; "β₂ inside the ±1σ bar" is
  a statement of non-exclusion, and the producer's "undecided by the
  window" is the only quotable form.** The file itself already says this;
  the exposure is in quoting the headline clause without it.
- **(d) Moments-are-F4 — CONFIRMED.** The composition re-derived: minimizing
  (θ + ln(2k−1)!!)/(2k) gives argmin k = θ exactly (checked to k = 4e6 at
  θ = 1e6) and value √(2θ); own evaluation returns 1.0047 at the z = 47
  inputs and 1.0002 / 1.0000 at θ = 1e3 / 1e6 — identical. Own walker
  confirms m₆ ratios at 13, 17 (8.60, 7.42); m₈..m₁₆ not re-derived.
- **(e) "3,570 modes" misattribution — CONFIRMED.** `smoothness-front.md`
  §4.3: 3,570 is the support size of the Rosser slice 𝒟⁺ at z = 101,
  D = z^{3.038} (re-derived at 3,569 + d=1 in `redteam-0820-math.md` §2.3)
  — a coefficient-support count, not a mode or conductor count; the real
  counts are #E = 31..6119 and N = 2.3e3..1.1e10.
- Also reproduced exactly: Λ_V at 47 = 1.4979e5 vs smax 1.5767e5 — the
  5.0% margin; the csc ℓ¹ bound (own spot sweep, max ratio 0.6258); the
  sup/rms slope 0.891 ± 0.213 and Λ/rms 2.608 ± 0.179.

## 3. TARGET attack-quartic-01

- **(a) Lemma Q1 + Q2 — CONFIRMED.** The Wick/inclusion–exclusion split
  re-derived (A∩B, A∩C, B∩C each the single-frequency locus Q; triple =
  the (1/2)⁴ quadruple) and brute-forced on my own synthetic on ℤ/42
  (different W and rng from the producer's control): rel 3.1e-14 / 3.1e-15.
  Lemma Q2 brute-forced over ALL 8.18e7 conductor-quadruple classes with
  e | 210: zero criterion mismatches, zero resonant quadruples with a
  single-covered prime, and zero two-mode resonances with e₁ ≠ e₂ (Q2a).
- **(b) The Q-vs-OFF split — numbers CONFIRMED, reading WEAKENED.** My own
  walker + own direct-phase modes reproduce every cell at all four z: OFF/m₂²
  = −0.0454, −0.2767, +0.0101, −0.0446 and 3Q/m₂² = 0.4460, 0.4023, 0.1170,
  0.0596 — to the digit. But decompose the sub-Gaussian deficit itself,
  3 − m₄/m₂² = 3Q/m₂² − ĉ(1/2)⁴/m₂² − OFF/m₂²: the share carried by the
  self-pairing term is 91% (z=13), **59% (17)**, 109% (19, OFF positive),
  **57% (23)** — "carried almost entirely by the self-pairing term" is
  false at 17 and 23 on the file's own printed numbers, where the genuine
  off-diagonal carries 41–43%. And |OFF|/m₂² (0.045, 0.277, 0.010, 0.045)
  shows **no decay trend on four points**, unlike Q. **Corrected sentence:
  the deficit's decaying component is the self-pairing Q (0.446 → 0.060,
  provably a finite-W term); the genuine off-diagonal is small (≤ 0.05 of
  m₂² at three of four z) and sign-varying but not measured to decay, so
  m₄/m₂² → 3 is the extrapolation consistent with the window, not a
  measured law.** What survives intact — and it is the part that steers —
  is the correction of attack-rhoms reading 6: the sub-Gaussian column is
  NOT evidence of quartic-resonance cancellation, and any route that needs
  OFF ≪ 0 has nothing to stand on.
- **(c) R_k and R2 at 47 — CONFIRMED (in the producer's own grades).**
  Derivation re-checked: the increment telescope gives |ρ̃(y₀±t)| ≥ S−C_L·t
  (verified pointwise, 0 violations at 13, 17, both sides), the
  sum-≥-integral step is valid (decreasing integrand, ⌊S/C_L⌋+1 ≥ S/C_L),
  S/C_L ≪ W everywhere, and C_L re-measured exactly (1.056, 2.047 at 13,
  17). W·m_{2k} ≥ S^{2k+1}/((2k+1)C_L) holds numerically at k = 1, 2, 3.
  R2@47 reproduced: 4.805e4 ≤ 1.577e5 — INDICATIVE as flagged (sampled-C_L
  lower bound + model m₄), but robust: breaking it needs true C_L > 3.8e3
  (380× the sampled bound) or m₄ > 1141·m₂². Grade (iii) K = 25 at 47
  reproduced as a miss (2.859e5); the death scans reproduce exactly
  (R1 41, M2 53, R2 67, R2@C_L=10 61, R3 89).
- **(d) K_T/K_V — CONFIRMED.** Own H-builder (direct F*_e tables): the
  identity ⟨H_V²⟩/4 = B₂ᴶ/12 closes at 4.6e-14 / 2.0e-13; ⟨H_V⁴⟩/16 =
  2.90167e3 / 6.51940e4, K_V = 16.4456 / 24.1645, K_T = 24.722 / 28.317,
  K_T/K_V = 1.5033 / 1.1718 at 13 / 17 — all identical; ⟨H⁴⟩/16 ≥ m₄ and
  ⟨H_T²⟩/4 ≥ m₂ verified. The independence verdict (the ~600× sign-discard
  cancels in the Λ(4) ratio) is arithmetically sound. The primitive-ℓ¹
  by-product reproduced at 13 (H_V(0)/2 = 3.985e1, ratio 3.92 on Λ_V).
- **(e) Zagier — CONFIRMED at page images** (fetched independently, MPIM
  copy of Math. Ann. 202 (1973) 149–172). Eq. (1) p. 149: one common
  modulus p, every a_i prime to p, n even ("for n odd the sum is clearly
  equal to zero"). Pp. 150–151: the stated main task is rationality and
  the **denominator** — "bounded by a number depending only on n (3 for
  n = 2 … 45 for n = 4)" — via a rational expression (§2) and a reciprocity
  law generalising Rademacher (§3). P. 166 Table 3: exact four-dimensional
  evaluations; p. 168: cotangent identities. No upper bound on |d|, no mean
  value over a family. The three-failure refusal is accurate.

## 4. NOT REACHED

- Exact Λ at z = 29 (261.555) — not independently recomputed (my
  direct-phase method is too slow there); it is 1 of the 5 fit points, and
  leave-it-out keeps β₂ inside 1 s.e. (4.52 ± 0.46).
- Moments m₈..m₁₆ (the C_k table beyond k = 3) — cited; m₂, m₄, m₆
  re-derived at walkable z. K_V and the OFF split at z ≥ 29 — the same
  period-storage wall as the producers.
- Rudin 1960 at page image — the vacuity verdict rests on our own measured
  W-saturation (which I reproduced), so nothing hangs on the page, but the
  citation itself was not source-checked.
- smax = (z^β₂·M − 1)/2 and rmsr at 31..47 — custody-cited from
  attack-rhoms/theta-ladder, not re-derived here (in-grade per the standing
  compute rule).
- b2mean's S1 mass-profile columns (N₉₀, top-e, ω-ladder shares) — the
  aggregates they feed (B₂, fits) reproduce, but the columns were not
  re-derived cell by cell.

## 5. GATE

`node research/qc.js` after this report: **TOTAL 0** (the standing census
red the brief carried had already cleared by gate time; nothing names this
file or the three targets). `embed.js --check` on all three producers:
match/match/bit-honest.

*History and superseded claims: `research/history/CHANGELOG.md`.*
