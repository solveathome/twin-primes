# The ⟨ρ²⟩ lemma: proved at exponent 2s, three ways, and the sup-recovery priced

<!-- ledger
id: Q-rho2-bound
status: ANSWERED
todo: 0
question: Is there an analytic upper bound on <rho^2>(z) from its proven closed form, and does it matter for RML?
verdict: <rho~^2> <= C z^{2s} ln^8 z PROVEN three ways (MS1-MS3), the sup-recovery priced; TODO 0's named first move executed 2026-08-21.
-->

**TODO's rho-maximal-law follow-on, executed: the NOT-REACHED item "an
analytic upper bound on ⟨ρ²⟩(z)" is closed in the affirmative, the composed
requirement mean-square × recovery is stated and priced against the
sufficiency curve, and the wall is renamed one object smaller. Producer:
`research/attack-rhoms-01.js` (embedded via `qc/embed.js`; all controls pass).
Salvage: a predecessor died to a token limit leaving a complete unrun draft;
this is that draft audited — four defects found and fixed, one of them a false
lemma (§5, reading 7). Four things came out.**

**One: the mean-square lemma is a theorem (§2).** Three independent proofs,
every step machine-verified: MS1 (elementary, from the proven closed form:
|C_ij| ≤ (g²−1)/(12qq′), multiplicity ≤ (9/2)τ(q), Mertens twice), MS2
(through the proven Theorem A ⟨R_H²⟩ ≤ B·H and an exact H-average transfer
with per-mode Dirichlet control, zero violations), and MS3 (the exact identity
Σ_{a≠0} 1/(4sin²(πa/e)) = (e²−1)/12, worst rel 3.2e-15, giving
⟨ρ̃²⟩ ≤ B₂/12 with B₂ = Σ e²Vabs(e)²). All land at

    ⟨ρ̃²⟩ ≤ C z^{2s} ln⁸z,   i.e.  rms(ρ̃) ≤ z^{3+o(1)}  at s = 3.0,

unconditional, B = O(log⁸z) per `attack-AB-bounded.md`. MS3 is the sharp
finite-z form: 81.1× to 10581.9× below MS2, and 18×–48× above the truth with
no strong trend across z = 13..47.

**Two: the composed requirement, priced (§1, §3).** MS(c): ⟨ρ̃²⟩ ≤ C₁z^{2c}
plus a recovery REC(ℓ): sup|ρ̃| ≤ C₂√⟨ρ̃²⟩·z^{ℓ+o(1)} compose to RML(c+ℓ),
which wins iff c+ℓ < β₂ = 4.26645. Proven c = 3+o(1) leaves ℓ < 1.266 for the
recovery. The Gaussian recovery (F4, measured true at every walkable level)
costs ℓ = 1/2+o(1) — margin 0.766. **So F4 alone now implies G₂(z#) ≪
z^{3.5+ε}**, through the proven mean square, with no other hypothesis; and
unconditionally θ_G(z) is capped at 3.5+o(1), so the sufficiency curve's room
λ_max = β₂ − θ_G **cannot close asymptotically**: rho-maxlaw reading 6's
model A (linear drift, room gone at z ~ 5·10³) is excluded as an asymptote.
At measured z the exact-qmax MS3 cap is already below β₂ at every level
(2.5104..2.9740, i.e. −1.7561..−1.2924 against β₂); the crude all-z constants
(qmax → z⁶) exceed β₂ only on the finite window z ∈ [23, ~2767–3547] (model
spread), re-entering below permanently after.

**Three: every proven recovery pays e^{θ(z)/(2k)} and dies (§3).** Chebyshev +
the exact bounded-increment constant (C_L = max|M − cc|, the certificate
integrand, identity verified positionwise) gives sup ≤ (3C_L·W·⟨ρ̃²⟩)^{1/3}:
a **proven finite-z clearing at z = 13..29** (exact inputs), certifiable
failure at z = 37..47, absolute floor (C_L = ms = 1) dead at z = 47. The
moment ladder's 6th-moment rung clears every measured z spending 4.7% → 65%
of the 963 budget in log terms, but the order needed grows like z/(1.53 ln z).
Chaining is CLOSED (`REFUTED.md`) and was not retried. **The analytic push
stops, named: the fourth moment ⟨ρ̃⁴⟩** — the quartic gcd-lattice correlation
(mode-resonance sum over a₁/e₁+a₂/e₂+a₃/e₃+a₄/e₄ ∈ ℤ), for which no
Theorem-A analogue exists; proving ⟨ρ̃⁴⟩ ≪ ⟨ρ̃²⟩²·polylog would cut the
position-union price from e^{θ/2} to e^{θ/4}.

**Four, a new measurement: the moments of ρ̃ are sub-Gaussian at every
walkable level.** m₄/m₂² = 2.509, 2.321, 2.893, 2.896, 2.918 (Gaussian 3);
m₆/m₂³ = 8.60..14.00 (15); m₈/m₂⁴ = 34.8..93.5 (105), at z = 13..29 over
complete periods — every ratio below Gaussian, drifting up. The shrunk lemma
of §3 (prove the measured m₄ ≤ 3m₂²) is measured true with margin.

---

## 0. CUSTODY

Everything measured is in `research/attack-rhoms-01.js` (`qc/embed.js
--check`: code-sha256 matches, out-sha256 matches, body bit-honest; two
embeds, identical out-sha256 — the run is deterministic). Division of labour
per the standing compute rule:

- **Recomputed (cheap, controls in-pass):** the closed-form ⟨ρ̃²⟩ by my own
  O(n²) pair sum, matched against the repo's `row(z,·,3.0).plateau/2` at
  z = 13..23 (rel ≤ 1.6e-15), the S1 walker at 29, and the cited rmsr² at 31
  (rel 6.0e-8). B(z, 3.0) re-swept from my own subset enumeration, MATCH to
  the cited 1.3833..1.4883 at z = 13..37 (B at 41..47 is new: 1.4963, 1.5057,
  1.5135). The θ_G column recomputed and matched against `rho-maxlaw-01` S3
  at all ten z, worst |diff| 4.8e-6 — the budget arithmetic is guarded.
- **Walker controls:** brute force from the definition at z = 13 (identical
  through m₆, sup, maxCC, C_L; the K(y) = cc(y) identity at 2310/2310
  positions); period mean, closed-form variance (rel ≤ 1.2e-10), closure
  drift ≤ 4.3e-7; sup|ρ̃| MATCHES the cited column at all five levels.
- **Cited (custody-bound, not recomputed):** √⟨ρ²⟩ at z = 37..47 from
  `theta-ladder.md` §2 via `rho-maxlaw-01-sufficiency.js` (rmsr =
  √(plateau/2), H-free — convention re-verified at source); sup|ρ̃| at
  13..29 (re-measured); β₂ per `paper/beta2-note.md`.
- **Estimator control:** OLS returns slope 3.700000 on a known z^3.7 truth
  before any fit is quoted. The MS3 identity is verified to 3.2e-15 over
  e = 2..40 before it is used.
- **Proven inputs, checked at source this session:** Theorem A's exact
  statement (`attack-beta2-01-lemmaV-meansquare.md` §1, for EVERY H);
  B ≤ 9A²(E−1) = O(log⁸z) with A, E as defined (`attack-AB-bounded.md` §1.1);
  Lemma V's literal ask and range (`sift-limit-attack.md` §4.5).

Units: ρ̃ and its moments dimensionless (weight counts); W, qmax, H in
positions; strengths as exponents base z. WIDTH: W = P(47) = 1.307e16 > 2^53,
so every W-dependent number at z ≥ 31 is exp of a log-space sum off
lnW = θ(z); exact integers appear only below 2^53 (W at z ≤ 29, g² at
z ≤ 31).

---

## 1. THE COMPOSED REQUIREMENT

For the centered sawtooth potential ρ̃ of the Brüdern–Fouvry certificate at
s = 3.0 (object as in `rho-maximal-law.md` §1):

- **MS(c):** ⟨ρ̃²⟩(z) ≤ C₁·z^{2c}   (period variance),
- **REC(ℓ):** sup_y|ρ̃| ≤ C₂·√⟨ρ̃²⟩·z^{ℓ+o(1)}   (sup-recovery loss ℓ),

compose, via |R_H| ≤ 2 sup|ρ̃| and the pricing lemma (rho-maximal-law §2,
riders included), to **RML(c+ℓ), which wins iff c + ℓ < β₂ = 4.26645.** In
Gaussian units: a law of F4 shape loose by z^λ wins iff λ < β₂ − c − 1/2.

The proven c = 3 + o(1) (§2) splits the remaining ask: **the recovery may
lose at most z^{1.26645−o(1)} over the root-mean-square.** The mechanisms:

| recovery | loss ℓ | composed exponent | verdict |
|---|---|---|---|
| Gaussian form (F4, unproven; measured true, C_true 0.60–0.80) | 1/2 + o(1) | 3.5 + o(1) | **wins, margin 0.766** |
| Chebyshev + increment (R1, PROVEN, constant C_L exact) | (θ/lnz − c + log_z 3C_L)/3 | (2c + θ/lnz + log_z 3C_L)/3 → ∞ | dies at z = 47 even at C_L = ms = 1 |
| 2k-th moment ladder (moments unproven for k ≥ 2) | [θ + ln(2k−1)!!]/(2k lnz) | c + ℓ_k | fixed k dies; needs k ~ z/(1.53 lnz) |
| dyadic/generic chaining | — | — | CLOSED (`REFUTED.md`; `import-chaining.md`), not retried |

The R1 constant is derived exactly in the producer header: ρ(y+1) − ρ(y) =
M − cc(y+1) with cc the certificate integrand (identity verified at every
position of the z = 13 period), C_L = max_x|M − cc(x)|, and the one-sided
count under the peak gives W⟨ρ̃²⟩ ≥ sup³/(3C_L). C_L measured exact:
1.056, 2.047, 3.040, 3.034, 3.032 at z = 13..29 (maxCC = 1, 2, 3, 3, 3);
sampled lower bounds ≥ 9.03, 7.03, 7.03, 7.02, 10.02 at z = 31..47.

The working point stays inside Lemma V's stated range at the delivered
exponent: s/u = 3/3.5 = 0.857 ∈ (0.703, 1) — the redteam T2.e rider (Lemma V
is posed, not proven; the smooth-profile obstruction is unchanged) carries
over verbatim and nothing here invokes Lemma V itself.

## 2. THE THREE PROOFS, AND WHERE IMPROVEMENT STOPS

**MS1 (elementary).** ⟨ρ̃²⟩ ≤ GS/12, GS = Σ_{i,j} g²/(q_iq_j); multiplicity
of a modulus is provably ≤ (9/2)τ(q) ((3/2)τ per block × 3 blocks — tight:
measured ratio to (9/2)τ is 1.0000 at z = 13, 17, 19), so GS ≤ (81/4)·z^{2s}·
Π(1+4/p)·Π(1+2/p)² ≤ Cz^{2s}ln⁸z. GS measured 8.94e4 → 7.98e6 over 13..31,
6.7e-7 → 4.6e-8 of the assembled bound; d lnGS/d lnz = 5.04 ± 0.19 against
the ceiling 6.

**MS2 (through Theorem A).** Mode-by-mode, avg_{H=1..K} 4sin²(πaH/e) ≥
2 − e/(Ka′) ≥ 1 once K = qmax ≥ e (Dirichlet; per-mode violations 0 at
z = 13, 17), so ⟨ρ̃²⟩ ≤ avg_H⟨R_H²⟩ ≤ B(qmax+1)/2 ≤ (B/2)z^{2s}(1+o(1)).
The full chain verified exactly: 1.095 ≤ 2.190 ≤ 1.598e3 (z = 13),
2.497 ≤ 4.993 ≤ 2.134e4 (z = 17).

**MS3 (sharp form, no H-average).** ⟨ρ̃²⟩ = Σ_{e,a}|Θ_e(a)|²/(4sin²(πa/e))
(spectral identity, rel ≤ 4.6e-13; Theorem-B factorised form vs direct phase
1.4e-17) ≤ Σ_e Θ*(e)²(e²−1)/12 ≤ B₂/12, B₂ = Σ e²Vabs(e)² ≤ qmax·B. The
chain holds exactly at z = 13, 17; the max_a step costs 3.0–8.9×, the
Θ* → Vabs triangle ~5.9×. **B₂/12 sits 18×–48× above the truth at every
z = 13..47** — the loose steps are nearly z-independent, because 92–94% of
⟨ρ̃²⟩'s mass sits at a′ = 1: the variance lives at the lowest frequency of
each modulus, which is what the (e²−1)/12 weight prices exactly.

**Where a sharper mean-square stops.** The exponent gap 2s = 6 (proven)
versus ~4.5 (measured 13..47; the local slope rises with the window — 3.39 ±
0.24 on 13..31 — quote no single power) is carried entirely by qmax and by
B₂'s growth: the named object for any improvement is **a mean-value bound on
B₂ = Σ e²Vabs(e)² below its qmax·B ceiling** — the e²-weighted analogue of
attack-AB-bounded's B, a signed-Rosser mean value with no maximal inequality
in it. It would sharpen the cap's constant and finite-z window, not the
asymptotic 3.5 (which the √(2lnW) = z^{1/2+o(1)} recovery fixes).

## 3. THE BUDGET ARITHMETIC, PER z

Producer S4, against smax = (z^{β₂}M − 1)/2 (strict T ≥ 1 accounting built
in) and the sufficiency budget z^{λ_max} (θ_G column reproduced to 4.8e-6):

```
  z   budget z^lam   R1 factor/consumed   M2 factor/consumed   M3 factor/consumed   k_min
 13      383.5        4.86    0.266        2.22    0.134        1.32    0.047        1
 17      581.8        1.08e1  0.373        3.58    0.200        1.71    0.085        1
 19      495.6        2.49e1  0.518        6.80    0.309        2.69    0.159        1
 23      687.9        5.55e1  0.615        1.28e1  0.391        3.96    0.211        1
 29     1208.1        1.32e2  0.688        2.58e1  0.458        6.17    0.256        2
 31*    1008.8        4.88e2  0.895        5.55e1  0.581        1.01e1  0.334        2
 37*    1030.4        1.07e3  1.005        1.22e2  0.693        1.67e1  0.405        2
 41*    1079.7        3.06e3  1.149        2.82e2  0.808        2.85e1  0.480        2
 43*     981.9        9.40e3  1.328        6.73e2  0.945        4.99e1  0.567        2
 47*     963.4        3.19e4  1.509        1.63e3  1.077        8.85e1  0.652        3
```

(factor = route bound over the Gaussian form G = rms·√(2lnW); consumed =
ln(factor)/ln(budget); * = cited ms / C_L lower bound / Gaussian-model
moments — verdicts there indicative, except that R1's failures at 37..47 are
certifiable since its C_L input is a lower bound.)

Readings of the table: **R1 clears with fully exact, fully proven inputs at
z = 13..29** (and indicatively at 31), consuming 27–69% of the budget — at
those levels the missing lemma genuinely shrinks to "prove the measured
mean-square", strictly easier than any maximal law. The shrinkage is
finite-z only: R1's own floor dies at z = 47, the familiar Bonferroni-x≤227
phenomenon, and is reported as calibration, not as a route. M3 (6th moment)
clears everywhere measured at 4.7% → 65% of budget; the measured sub-Gaussian
moment ratios (§ headline four) say its model inputs are conservative where
they can be checked. k_min = 1 at z ≤ 23 reproduces `attack-beta2-01`'s
"second moment alone clears β₂ up to z = 23" from independent code.

## 4. WHAT THE CAP DOES TO THE STANDING PICTURE

θ_G(z) ≤ log_z(2√(2lnW·B₂/12)/M): measured θ_G 1.9470..2.4820 against cap
2.5104..2.9740 at z = 13..47 — **the proven cap is below β₂ at every
measured level, using no measured mean-square anywhere.** Asymptotically
cap = s + 1/2 + (2lnlnz + O(1))/lnz → 3.5. Consequences:

- **rho-maximal-law reading 6 is half-settled.** Model A (linear drift of
  θ_G, room closes at z ~ 5·10³) cannot be an asymptote: λ_max ≥ β₂ − cap →
  0.766. A finite-z dip of λ_max to 0 inside the uncovered window
  z ∈ (47, ~3000) is not excluded by the crude constants (the crude qmax→z⁶
  cap exceeds β₂ exactly on z ∈ [23, 2767] at B = 1.5, [23, 3547] on the
  B-drift model, peak 4.74 at z = 31), but a dip is harmless to the theorem:
  the pricing lemma needs large z only. Model B's θ_∞ = 2.74 ± 0.14 is
  consistent with the cap; the cap adds the unconditional ceiling 3.5.
- **The F4 target is re-priced.** Before: F4 was sufficient where the
  measured curve said so. Now: F4 (with any looseness λ < 0.766) implies
  G₂(z#) ≪ z^{3.5+λ+ε} outright, mean-square factor unconditional. The
  entire unproven content of the β₂ programme on this route is the
  sup-recovery — one maximal inequality on one explicit object.
- **The wall, renamed one object smaller.** Every proven recovery pays
  W^{1/(2k)} with only k = 1 machinery in the corpus (Theorem A, the ℓ¹/ℓ²
  identity, sofic capacity are all second-moment grade). The first unproven
  object is ⟨ρ̃⁴⟩, the quartic gcd-lattice correlation / mode-resonance sum;
  ⟨ρ̃⁴⟩ ≪ ⟨ρ̃²⟩²·polylog would cut the union price to e^{θ/4} and is
  measured true with margin (m₄/m₂² = 2.32..2.92 < 3).

## 5. READINGS

1. **PROVEN.** ⟨ρ̃²⟩ ≤ Cz^{2s}ln⁸z (rms ≤ z^{3+o(1)}) — three independent
   proofs MS1/MS2/MS3, all steps verified; the NOT-REACHED lemma of
   rho-maximal-law exists with no hypothesis. Producer S2, S3.
2. **VERIFIED / MEASURED.** MS3 = B₂/12 is the sharp form: 81.1×–10581.9×
   below MS2, 18×–48× above truth, flat; 92–94% of the variance mass at
   a′ = 1. B₂ measured at ten levels (new at 41..47). Producer S3.
3. **DERIVED + MEASURED.** The composed requirement MS(c) × REC(ℓ) → RML(c+ℓ),
   win iff c+ℓ < β₂; with c = 3 the recovery budget is z^{1.266}. F4 costs
   z^{1/2+o(1)}: F4 ⟹ G₂(z#) ≪ z^{3.5+ε}, margin 0.766. θ_G capped below β₂
   at every measured z (−1.7561..−1.2924) and at 3.5+o(1) asymptotically; the
   crude all-z window [23, ~2767–3547] stated rather than hidden. S5.
4. **MEASURED (exact at z ≤ 29; flagged elsewhere).** R1, the only fully
   proven recovery, clears at z = 13..29 with exact inputs (27–69% of
   budget), fails certifiably at 37..47, floor dead at z = 47: the
   "shrunk lemma" reading is finite-z calibration, not a route. The moment
   ladder needs k ~ z/(1.53 lnz). Producer S4, S5.
5. **INFERRED.** Where the push stops, named: ⟨ρ̃⁴⟩, the quartic gcd-lattice
   correlation — no Theorem-A analogue exists; a polylog quartic bound is
   worth e^{θ/4} against e^{θ/2}. §4.
6. **MEASURED, new.** Sub-Gaussian moment ratios of ρ̃ at every walkable
   level: m₄/m₂² = 2.509, 2.321, 2.893, 2.896, 2.918; m₆/m₂³ = 8.60..14.00;
   m₈/m₂⁴ = 34.8..93.5. First measurement of any moment of ρ̃ beyond the
   second. Producer S1.
7. **SALVAGE VERDICT.** The orphan draft's architecture survives; four
   defects fixed: (D1) GS dropped its g = 1 pairs; (D2) silent 0/0 on the
   q = 1 diagonal; (D3) W = P(47) > 2^53 as a Number (now log-space, WIDTH
   RULE); (D4) its multiplicity lemma m(q) ≤ (3/2)τ(q) is FALSE — measured
   ratio exactly 3.0000, the three certificate blocks it forgot; the proven
   (9/2)τ(q) cap is tight at 1.0000. No verdict changed; one constant did
   (81/4 for 9/4) inside a bound with 10⁷ of slack.

## 6. NOT REACHED

- **The z = 31 full-period walk** (sup, m₄..m₈, exact C_L; ~500 s) — still
  the next exact point, deferred under the compute ceiling.
- **A mean-value bound on B₂ = Σ e²Vabs(e)²** below its qmax·B ceiling — the
  named object that would sharpen the cap's constant and close the crude
  window; same family as Iwaniec-1980-style mean values, not attempted.
- **The exact-qmax cap on 47 < z < re-entry** (needs buildTerms at large z);
  the window is covered only by the crude constants and the measured-growth
  model.
- **Any proof attempt on ⟨ρ̃⁴⟩** (the named stopping object); only its
  measurement exists (reading 6).
- **The s-freedom**: everything is s = 3.0; whether some s < 3 lowers the
  composed exponent (the cap moves as s + 1/2) was not scanned — note the
  trade: smaller s lowers the cap but weakens M and the main term's range.
- **The Kloosterman pricing at the ρ-potential configuration** (inherited
  from rho-maximal-law, unchanged).

## 7. GATE

`node research/qc.js` after the producer and this report: TOTAL 2, both
embeds findings on files in flight with other agents this session —
`xchan-at37-01-census.js` (the known standing red; clears when the census
writes) and `attack-x-offset-02-profile.js` (mid-edit by the repair agent).
Neither names this producer or this file; the `--full` X-checks pass 246/246.
`qc/embed.js --check` on the producer:
code-sha256 matches, out-sha256 matches, body bit-honest; the two embeds
returned identical out-sha256 (deterministic, 59.2 s / 63.0 s).

*History and superseded claims: `research/history/CHANGELOG.md`.*
