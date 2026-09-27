# The `ℓ¹ → ℓ²` programme measured and retired: the conversion's output is the sharp maximal law

<!-- ledger
id: Q-import-l1l2
status: CLOSED
todo: none
question: Does an l1 -> l2 conversion on the (e,a) coefficient sum buy the needed sqrt(log)?
verdict: The pre-registered kill line (rho >= 0.5 at every level) does NOT fire, rho falling 0.4352 to 0.0645 at z = 13..41, and the programme dies anyway on what the decay measures: ||Theta||_1/||Theta||_2 grows by 2.01 per added prime against 2.0516 for S_sat, so the l1/l2 gap is not a proxy for the C^{pi(z)} price, it IS that price; rows 5 and 6 retire together.
-->

*(2026-08-19. Foreign-import attack, IMPORT-MAP row 5, run against the wall
`sift-limit-attack.md` §7e relocates onto the `(e,a)` sum. Pre-registration:
`import-l1l2-prereg.md`, committed to disk before the producer was written.
Artifact: `research/import-l1l2-01.js`, 195.1 s, OUTPUT block written by
`research/qc/embed.js`. Legend: **[PROVEN]** published or proved here;
**[VERIFIED]** checked computationally in this run; **[MEASURED]** empirical,
finite range; **[INFERRED]** deduction from those.)*

## HEADLINE

**The pre-registered kill does not fire, and the programme dies anyway, on the
mechanism the measurement exposes.** `ρ = ‖Θ‖₁/(‖Θ‖₂√#)` reads **0.4352,
0.2729, 0.1363, 0.1133, 0.0892, 0.0824, 0.0681, 0.0645** at `z = 13..41`,
monotone decreasing, so the map's "at or above 0.5 at every level" line is not
reached at any level. What the decay measures is not a prize:

> **`‖Θ‖₁/‖Θ‖₂` grows by a factor 2.01 per added prime — 20.91 at `z = 13` to
> 2733.58 at `z = 41` — against the 2.0516 per added prime that
> `attack-tau-repricing.md` measured for `S_sat`. The `ℓ¹/ℓ²` gap of the
> coefficient family is not a proxy for the `C^{π(z)}` price. It is that price.**
> **[MEASURED]**

**And the conversion, written out, is the corpus's own sharp maximal law.**
`‖Θ·S_H‖₂ = rms(R_H)` exactly, by the Parseval identity L3, so an `ℓ¹ → ℓ²√log`
theorem on this family is the statement `sup_x|R_H(x)| ≤ C·rms(R_H)·√(2 ln W)`
and nothing else. It is false below `C_true = 0.5634, 0.7279, 0.9215, 0.7935,
0.8507` (`z = 13..29`, the measured `sup/rms/√(2 ln W)`), and TPC-implying below
`C_crit = 2.225, 1.720, 1.358, 1.418, 1.660`. **`C_true < C_crit` at every level
measured, so every version of this theorem that is true is also TPC-implying,
and every version that is not TPC-implying delivers nothing.** **[MEASURED]**,
**[INFERRED]**

**The phenomenon the import would establish is already measured true.** Row 5
asks whether `Θ_e(a)` exhibits square-root cancellation across the family at
all. `C_true` is that measurement, and it sits at 0.56 to 0.92 against 1, flat:
at the worst position the phases cancel to the random-sign size. **What is
missing is not the fact. It is the proof, and the proof is the maximal law.**

**Two rows retire together, with one mechanism.** Row 5 (spectral theory,
Deshouillers–Iwaniec via Kuznetsov) and row 6 (discrepancy theory) both aim at
the same conversion, and the retirement does not depend on any claim about what
either machine can prove: it is a statement about the strength of the target.

---

## 0. CUSTODY

Six reproductions run before any new number was read, and every one of them is
in the OUTPUT block above the readings in `research/import-l1l2-01.js` §S0.

| check | result |
|---|---|
| peeled sweep vs direct `φ(e)2^ω(e)` evaluation of the same three sums | `‖Θ‖₁` rel 2.47e-15 (z=13), 3.35e-14 (z=17); `#(e,a)` equal |
| this sweep vs `lemmaV-sup-extension.js` `EXT.sweep()`, independently written | `S_sat` rel 1.14e-11 to 4.67e-12, `‖Θ‖₂²` rel ≤ 2.40e-16, `#(e,a)` EQUAL, `Ssup(H_sup)` rel ≤ 7.24e-11, at z = 13..29 |
| `‖Θ‖₂²` and `#(e,a)` vs the embedded `Var(c)` and `#(e,a)` columns | rel 4.72e-6 to 1.26e-4 (4-digit quotations), `#` rel ≤ 2.59e-5 |
| `Ssup(nP)` vs the embedded reference | 11.446659, 28.411760, 60.038210, 118.327993 reproduced, rel ≤ 4.31e-8 |
| `Σ_{e,a}|Θ|²|S_H|²` vs the repository's independent `O(N²)` `meanSquare()` | rel 1.24e-15, 1.32e-14, 2.95e-13 at z = 13, 17, 19 |
| `rms(R_H)` at `nP` and `H_sup` vs the embedded columns | rel ≤ 5.45e-5 (4-digit quotations) |

The last check is the load-bearing one: it is the Parseval identity L3 itself,
confirmed against a divisor-pair computation that never forms `Θ_e(a)` at all.

**Standing compute rule.** Everything else quoted here is cited from an embedded
OUTPUT block elsewhere in the corpus and was not recomputed: `H_sup`, `Ssup(H)`,
`rms(R_H)` and `#(e,a)` at every level from `lemmaV-sup-extension.js` S1/S3/S5,
the exhaustive `sup|R|` and `nP` from `phase1-T4-maximal-law.md` §4, `C_crit`
from `phase1-T4-maximal-law.md` §2(c), the `S_sat` per-prime factor 2.0516 from
`attack-tau-repricing.md`.

---

## 1. The object, pinned so the measurement is reproducible

The definitions are `lemmaV-parseval.js`'s (its chain L1–L5 and Theorem B) and
nothing here is new; they are restated because the measurement is meaningless
without them.

**Fixed.** `z`; `W = P(z) = ∏_{p < z} p`; level `s = 3.0`, `D = z^s`; the
Rosser–Iwaniec weights of that level; shift 2. `i` runs over divisor pairs
`(d₁,d₂)` with `gcd(d₁,d₂) | 2`, `q_i = [d₁,d₂]`, `c_i` the CRT class,
`w_i = ±1`; `M = Σ_i w_i/q_i`; `R_H(x) = T(x) − H·M`.

> **`Θ_e(a) := Σ_{i : e | q_i} (w_i/q_i)·e(−a c_i/e)`**, for `e | P(z)`, `e > 1`,
> and `a mod e` with `(a,e) = 1`.

Equivalently `Θ_e(a) = Σ_{e₁e₂=e} e(2a·inv(e₁)/e₂)·V(e₁,e₂)` with
`V(e₁,e₂) = Σ_{i : e|q_i, gcd(e,d₁)=e₁} w_i/q_i` (Theorem B), which is the form
the sweep evaluates.

**Why this is the object any import must beat.** L5 is the pointwise identity
`R_H(x) = Σ_{e>1} Σ*_{a mod e} Θ_e(a) S_H(a/e) e(ax/e)`, and the wall is the
triangle inequality across that sum, `sup_x|R_H(x)| ≤ Σ_{e,a}|Θ_e(a)||S_H(a/e)|`.
`sift-limit-attack.md` §7e prices that step at `C^{π(z)}` with a flat factor
2.0516 per added prime, and `import-chaining.md` §4.3 established that the
position supremum is not where the loss is. The index `(e,a)` is moduli and
frequencies.

**The norms**, over `{(e,a) : Θ_e(a) ≠ 0}`: `‖Θ‖₁ = Σ|Θ_e(a)|`,
`‖Θ‖₂ = (Σ|Θ_e(a)|²)^{1/2}`, `#` the index count, `ρ = ‖Θ‖₁/(‖Θ‖₂√#)`.
`‖Θ‖₂² = Var(c)` and `#` are quantities the corpus already owned; `‖Θ‖₁` had
never been computed here, and it is the one new accumulator in the producer.

At `z = 13, 17, 19` the family is the complete set of non-zero frequencies mod
`W` (`# = W − 1`); from `z = 23` it is smaller, because a modulus `e` occurs only
if it divides some `q_i`. **[VERIFIED]**

---

## 2. The pre-registered ratio, and the verdict against the kill line

| z | `#(e,a)` | `‖Θ‖₁` | `‖Θ‖₂` | `ρ` | `N_eff = ρ²#` | `N_eff/#` |
|---|---|---|---|---|---|---|
| 13 | 2.3090e+3 | 5.03305 | 0.240667 | **0.435215** | 4.3735e+2 | 1.89e-1 |
| 17 | 3.0029e+4 | 10.5584 | 0.223249 | **0.272922** | 2.2367e+3 | 7.45e-2 |
| 19 | 5.1051e+5 | 21.0078 | 0.215674 | **0.136326** | 9.4878e+3 | 1.86e-2 |
| 23 | 2.6494e+6 | 38.3814 | 0.208034 | **0.113346** | 3.4039e+4 | 1.28e-2 |
| 29 | 1.7193e+7 | 72.7995 | 0.196930 | **0.089154** | 1.3666e+5 | 7.95e-3 |
| 31 | 6.0577e+7 | 122.834 | 0.191438 | **0.082440** | 4.1170e+5 | 6.80e-3 |
| 37 | 5.2512e+8 | 286.282 | 0.183442 | **0.068103** | 2.4355e+6 | 4.64e-3 |
| 41 | 1.7951e+9 | 491.847 | 0.179928 | **0.064518** | 7.4724e+6 | 4.16e-3 |

**The criterion does not fire.** Its line is `ρ ≥ 0.5` at every level; the
maximum over eight levels is 0.435215, at the smallest level, and `ρ` falls at
every step. **[MEASURED]**

**The criterion's stated mechanism points the other way from its letter, and
that was recorded before the numbers existed** (`import-l1l2-prereg.md` §2).
Cauchy–Schwarz gives `‖Θ‖₁ ≤ ‖Θ‖₂√#` with equality exactly when the mass is
flat, so `ρ ≈ 1` is the case in which a conversion has the *most* to win, not the
least, and `ρ ≈ 1/√#` is the case in which `‖Θ‖₁ ≈ ‖Θ‖₂` and it wins nothing.
The map's sentence has those two swapped. **A `ρ` below 0.5 is therefore not a
survival**; it is a statement that the available `ℓ¹ → ℓ²` gain, `√N_eff`, is
smaller than the `√#` that a flat family would offer — and §3 measures what
`√N_eff` actually is.

---

## 3. The decay rate is the `C^{π(z)}` price, and it is made of one thing

**The decay is not a fixed power.** The step-by-step exponent in `ρ ~ #^{-g/2}`
reads `g` = 0.3638, 0.4900, 0.2242, 0.2568, 0.1243, 0.1769, 0.0880 across the
seven steps, drifting toward zero; the global fits are poor in consequence
(`ρ = 0.551·W^{−0.0820}`, RSS 4.96e-1 on eight points). **Quoting one decay rate
would misreport the object; the honest statement is that the local exponent falls
by a factor 4 over the ladder and the family is becoming flatter, not sparser.**
**[MEASURED]**

**The quantity that does have a law is `‖Θ‖₁/‖Θ‖₂ = √N_eff.**

| step | 13→17 | 17→19 | 19→23 | 23→29 | 29→31 | 31→37 | 37→41 |
|---|---|---|---|---|---|---|---|
| `(‖Θ‖₁/‖Θ‖₂)` ratio | 2.2615 | 2.0596 | 1.8941 | 2.0037 | 1.7357 | 2.4322 | 1.7516 |

From 20.91 to 2733.58 over seven added primes is **2.01 per added prime**,
against the **2.0516** per added prime that `attack-tau-repricing.md` measured
for `S_sat` and that `sift-limit-attack.md` §7e names as the mechanism behind
`C^{π(z)}`. Two per cent apart, on independently defined quantities in the same
basis. **The `ℓ¹/ℓ²` gap of the raw coefficient family is the `C^{π(z)}` price.**
**[MEASURED]**, **[INFERRED]**

**And the unevenness is entirely across moduli, not inside them.** Writing
`P(e) = Σ*_a|Θ_e(a)|²`, `n_e = #{a}` and `r_e = ‖Θ_e‖₁/√(P(e)n_e)`, the ratio
factors as `ρ = F·X` with `F` the flatness inside a modulus and `X` the
across-`e` Cauchy–Schwarz ratio:

| z | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 |
|---|---|---|---|---|---|---|---|---|
| `F` within-`e` | 0.8644 | 0.8213 | 0.8111 | 0.8134 | 0.8154 | 0.8141 | 0.8026 | 0.7999 |
| `X` across-`e` | 0.5035 | 0.3323 | 0.1681 | 0.1393 | 0.1093 | 0.1013 | 0.0848 | 0.0807 |

`F` is flat at 0.80 to 0.86 at every level: **inside a fixed modulus the
coefficients are essentially of one size, so there is no square-root cancellation
there for a conversion to harvest.** All of the decay is `X`, the mismatch
between where the `ℓ²` mass sits (small `e`: at `z = 41`, moduli with `ω(e) ≤ 4`
carry 17.2% of the `ℓ¹` mass on 1.1% of the terms) and where the terms are
(large `e`). **[MEASURED]**

That mismatch is a fact about the divisor structure of the Rosser weights, and
it is the same fact in both directions: it is why `ρ` is small, and why the
`ℓ¹` bound loses a fixed factor per prime.

---

## 4. The weighted family: what an `ℓ¹ → ℓ²√log` theorem IS here

The bound contains `Θ_e(a)S_H(a/e)`, not `Θ_e(a)`, and the two ends of the
conversion are named by L3:

> **`ℓ¹` end: `Ssup(H) = Σ_{e,a}|Θ_e(a)||S_H(a/e)|`, the current bound.
> `ℓ²` end: `‖Θ·S_H‖₂ = √⟨R²⟩_H = rms(R_H)`, EXACTLY** — the mean square that
> `attack-beta2-01-lemmaV-meansquare.md` proves is `≤ B(z,s)·H`. **[PROVEN]**

So the conversion's output is `C·rms(R_H)·√(2 ln W)`, which is the sharp maximal
law of `phase1-T4-maximal-law.md`, in its own notation. The available gain
`A = Ssup/(rms·√(2 ln W))` reproduces that file's TIGHTNESS column digit for
digit at `H = H_sup` — 3.3028, 3.1199, 5.0781, 7.6981, 11.8363, 15.4519,
24.0689, 33.8198 against the embedded 3.30, 3.12, 5.08, 7.70, 11.84, 15.45,
24.07, 33.82 — and rises at every step, because it *is* the diverging quantity.

**The room the theorem has to live in, measured:**

| z | `C_true` (measured, `sup/(rms√(2 lnW))`) | `C_crit` (TPC line) | width |
|---|---|---|---|
| 13 | 0.5634 | 2.2250 | 3.95× |
| 17 | 0.7279 | 1.7200 | 2.36× |
| 19 | 0.9215 | 1.3580 | 1.47× |
| 23 | 0.7935 | 1.4180 | 1.79× |
| 29 | 0.8507 | 1.6600 | 1.95× |

`C` below `C_true` is false. `C` in `[C_true, C_crit]` is true and TPC-implying.
`C` above `C_crit` is legal and yields `need ≥ z²`, i.e. nothing. **The width is
not room to work in — it is the slack `phase1-T4` §2(c) means when it says a
maximal law loose by 50 per cent is still TPC-implying.** `C_crit` reads 2.23,
1.72, 1.36, 1.42, 1.66, 1.45, 1.56, 1.51, 1.39 at `z = 13..43` with no downward
trend, so this is not a small-`z` artifact. **[MEASURED]**

**The choice of logarithm does not rescue it.** A Salem–Zygmund statement would
carry `√(2 ln #)` over the family rather than `√(2 ln W)` over positions, and
the ratio of the two is 1.0000, 1.0000, 1.0000, 0.9588, 0.9309, 0.8906, 0.8784,
0.8480 at `z = 13..41` — at most 15% smaller, in the direction that makes the
conversion's output smaller and the implication stronger. **[VERIFIED]**

---

## 5. What this does to rows 5 and 6

**Row 5, spectral theory of automorphic forms.** The row's own framing was
correct: an `ℓ¹ → ℓ²√log` statement about the arithmetic of `Θ_e(a)` is what the
wall wants. This measurement prices that statement and it prices out. The target
is TPC-implying at every constant at which it is both true and useful, which
takes it out of the class of things a soft argument may deliver
(`phase1-T4-maximal-law.md`, and `REFUTED.md` already carries the same mechanism
for the θ ladder). **The retirement does not depend on what Deshouillers–Iwaniec
or Kuznetsov can prove**, and no claim about their statements is made here: the
row's own provenance is `[SOURCED-BIB]`, statements not opened
(`import-map-construction.md` §3). It is a statement about the strength of the
target, so no strengthening of the tool changes it.

**The corpus's nearest opened evaluation of that family is already banked** and
points the same way: `attack-sqrt-cancellation.md` reads Duke–Friedlander–Iwaniec
1997 and Bettin–Chandee 2015 in this configuration on the adjacent bilinear
object and gets `γ = 1.009638` and `0.970624` against a needed `0.824975`, which
is 5.88 per cent of a square root where 35 per cent is needed.

**Row 6, discrepancy theory.** It retires with row 5, on the same mechanism plus
one of its own. The mechanism: whatever machine proves the conversion, the
conversion's output is the sharp maximal law, so the grade of the target is
unchanged by the choice of tool. Its own: the row already names the failing
hypothesis — the corpus does not choose its signs, arithmetic hands them over —
and this run adds that **the signs arithmetic hands over already behave like the
good ones**, `C_true` = 0.5634 to 0.9215 against 1. A discrepancy theorem that
produced a good sign vector would produce a phenomenon that is already there.

**What was banked.** A WALL-ADDRESS, sharpened to an identity rather than a
diagnosis: the `ℓ¹ → ℓ²√log` statement on this family is `sup|R_H| ≤ C·rms·√(2 lnW)`,
with the constant window measured. A DERIVED-CONSTANT: the `ℓ¹/ℓ²` gap grows
2.01 per added prime, reproducing `S_sat`'s 2.0516 from an independent
definition. A CLOSURE of two rows with one mechanism.

---

## 6. The pre-registration, item by item

The pre-registration is sealed in `import-l1l2-prereg.md` (commit `a24fc09`,
before the producer existed). Outturn:

| # | pre-registered | outturn |
|---|---|---|
| P1 | `ρ < 0.5` at every level, monotone decreasing, `ρ(13) ∈ [0.05, 0.40]` | **shape right, band MISSED**: `ρ(13) = 0.4352`, above the band; monotone decrease confirmed at all seven steps |
| P2 | `ρ` decays geometrically per prime with ratio in `[0.35, 0.80]`; `ρ ≈ c·A^{π(z)}/√W` with `A ∈ [1.5, 2.5]` | **MISSED on both counts, in the same direction**: the ratios are 0.63, 0.50, 0.83, 0.79, 0.92, 0.83, 0.95, four of seven above the band, and the fitted `A = 3.686` is above it. The family is flatter than predicted and the decay is stalling |
| P3 | `N_eff/# < 0.16` at `z = 13`, `< 0.01` at `z = 31` | first half **MISSED** (0.189), second half **RIGHT** (6.80e-3) |
| P4 | `ρ_W(H) < ρ(z)` at every level | **RIGHT**: 1.994e-1 vs 0.4352 at `z = 13`, 4.186e-2 vs 0.1133 at `z = 23`, and so on at every level |
| P5 | `A(z)` reproduces the embedded TIGHTNESS column and rises; lands within a factor `[1.0, 2.0]` of `Ssup/sup` | **RIGHT on the reproduction** (digit for digit at eight levels); on the comparison, `A/overshoot` = 0.5634, 0.7279, 0.9215, 0.7935, i.e. a factor 1.09 to 1.78 **on the low side**, a direction the prediction did not name |
| P6 | the conversion IS the sharp maximal law; `C_true ≥` the measured ratio, TPC-implying below `C_crit` | **RIGHT**, and it is the load-bearing outcome |

**One error in the pre-registration itself, corrected here rather than in the
sealed file.** Its §4 called `[C_true, C_crit]` "the entire window in which such
a theorem is both true and non-circular". That is backwards: `C_crit` is the
*largest* constant that still implies the postulate, so `[C_true, C_crit]` is the
window in which the theorem is true **and TPC-implying**. The correction
strengthens the conclusion rather than weakening it, which is exactly why it has
to be written down: the sealed prediction would otherwise read as if the route
had somewhere to stand.

**Two of the three numeric misses are in one direction** — the family is flatter
and the decay slower than predicted — and the third (P5's sign) is the same
error of intuition: I expected more concentration than the object has.

---

## 7. COVERAGE

**What I did not reach.** `z = 43` and `z = 47`, which the `u_sup` ladder
reaches; the ladder here stops at 41 for cost. `C_true` exists only where the
exhaustive full-period walk reaches, `z ≤ 29`, so the constant window in §4 is
measured at five levels and the `C_crit` column alone at nine. Only `s = 3.0`
was run, the same restriction `phase1-T4` and `import-chaining` record. The
`ρ_W` column is computed at two windows per level (`nP` and `H_sup`) rather than
across `H`.

**What I suspect but did not prove.** That `ρ` converges to a positive constant
rather than to zero. The local exponent `g` falls 0.49 → 0.088 over the ladder,
which is consistent with a limit at a positive `ρ` and with a very slow further
decay; seven steps do not separate those, and nothing in §5 depends on which is
right.

**Where I am most likely wrong.** In treating `√(2 ln W)` as the conversion's
log factor. The measurement of the alternative (`√(2 ln #)`) is in §4 and moves
the constant by at most 15% in the safe direction, but a Salem–Zygmund statement
proved with a worse dependence — `log` of the *conductor*, say, rather than of
the family — would carry a different factor, and this run does not price that.

**Trap checks.** Trap 1: every level's sweep is exhaustive over the whole `(e,a)`
family; nothing is sampled, and `#(e,a)` is printed and matched against the
corpus's own count at all eight levels. Trap 2: every ratio compares quantities
at the same `z`, the same `H` and the same `s`, and the units of each are stated
in the OUTPUT block. Trap 3: `F` and `C_true` are reported as flat bands, `X`
and `A` as rising with the step count given, and the one quantity whose trend is
undetermined (`ρ`'s limit) is reported as undetermined.

**Artifact.** `research/import-l1l2-01.js` (195.1 s, OUTPUT block embedded by
`research/qc/embed.js`, code-sha256 `94d985fb6bb8bfac…`, out-sha256
`62a58e3ad289d931…`). Pre-registration: `import-l1l2-prereg.md`.

*History and superseded claims: `research/history/CHANGELOG.md`.*
