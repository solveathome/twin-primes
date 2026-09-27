# PRE-REGISTRATION — the `ℓ¹ → ℓ²` measurement on `Θ_e(a)` (IMPORT-MAP row 5)

<!-- ledger
id: Q-import-l1l2-prereg
status: CLOSED
todo: none
question: Does the l1 to l2 conversion on Theta_e(a) reach the threshold the import map set?
verdict: Sealed before any number was computed; scored in import-l1l2.md, where the pre-registered kill does not fire and the programme dies anyway: rho falls monotonically from 0.4352 to 0.0645 over z = 13..41, never reaching the map's 0.5 line, and what the conversion outputs is the sharp maximal law.
-->

*Written and committed BEFORE any number in this experiment was computed. Nothing
below is a result. The outturn is `import-l1l2.md`; the producer is
`research/import-l1l2-01.js`. Sealed 2026-08-19.*

---

## 1. The object, stated exactly so the measurement is reproducible

The definitions are the corpus's own, from `research/lemmaV-parseval.js` (the
header chain L1–L5 and Theorem B) and its record
`attack-beta2-01-lemmaV-meansquare.md`. Nothing here is new; it is pinned so the
norms below have a unique meaning.

**Fixed.** `z`; `P(z) = ∏_{p ≤ z} p = W`; the level `s = 3.0`, `D = z^s`; the
Rosser–Iwaniec weights of that level; the shift 2.

**The term list.** `i` runs over divisor pairs `(d₁, d₂)` with `d₁, d₂ | P(z)`,
`gcd(d₁,d₂) | 2`, both within their sieve levels. For each, `q_i = [d₁,d₂]`,
`c_i` = the CRT class of the pair inside the window, `w_i = ±1` the product of
the two Rosser weights. `M = Σ_i w_i/q_i`, and the signed sawtooth remainder is
`R_H(x) = T(x) − H·M`.

**The coefficient family, which is what this experiment measures.**

> **`Θ_e(a) := Σ_{i : e | q_i} (w_i / q_i) · e(−a c_i / e)`**, one number for each
> pair `(e, a)` with `e | P(z)`, `e > 1`, and `a mod e` restricted to
> `(a, e) = 1` (that is the `Σ*`).

Equivalently, by Theorem B, `Θ_e(a) = Σ_{e₁e₂ = e} e(2a·inv(e₁)/e₂)·V(e₁,e₂)`
with `V(e₁,e₂) = Σ_{i : e | q_i, gcd(e,d₁) = e₁} w_i/q_i`.

**Where it sits in the wall.** L5 is the pointwise identity
`R_H(x) = Σ_{e>1} Σ*_{a mod e} Θ_e(a)·S_H(a/e)·e(ax/e)`, `S_H(t) = Σ_{m ≤ H} e(mt)`,
and the wall is the step that takes absolute values across the `(e,a)` sum:
`sup_x |R_H(x)| ≤ Σ_{e,a} |Θ_e(a)|·|S_H(a/e)|`. `sift-limit-attack.md` §7e prices
that step at `C^{π(z)}` with `C ≈ 2.05` per added prime, and
`history/staging/import-chaining.md` §4.3 relocates the loss there from the
position supremum. So `Θ_e(a)` is the arithmetic object any
Deshouillers–Iwaniec-style import would have to beat.

**The norms.** All sums are over the same index set, `(e,a)` with `e | P(z)`,
`e > 1`, `(a,e) = 1`, and `Θ_e(a) ≠ 0`.

```
  ‖Θ‖₁ = Σ_{e,a} |Θ_e(a)|
  ‖Θ‖₂ = ( Σ_{e,a} |Θ_e(a)|² )^{1/2}
  #    = #{ (e,a) : Θ_e(a) ≠ 0 }
  ρ(z) = ‖Θ‖₁ / ( ‖Θ‖₂ · √# )
```

Two of the three are already on the corpus's record and will be reproduced
rather than trusted: `‖Θ‖₂² = Var(c)` and `#` are the `Var(c)` and `#(e,a)`
columns of `research/lemmaV-sup-extension.js` S5 and S3. `‖Θ‖₁` has never been
computed here.

**The weighted family**, which is the one the bound actually contains:
`ρ_W(H) = Ssup(H) / ( rms(R_H) · √# )`, where `Ssup(H) = Σ_{e,a}|Θ_e(a)||S_H(a/e)|`
is the ℓ¹ bound itself and `rms(R_H) = √⟨R²⟩_H = ‖Θ·S_H‖₂` exactly, by L3.

## 2. The kill criterion, quoted from the map before it is applied

> *IMPORT-MAP.md §4, Row 5:* "compute `Θ_e(a)` over the full `(e,a)` family at
> `z = 13, 17, 19, 23` and form the ratio `‖Θ‖₁ / (‖Θ‖₂ · √(#(e,a)))`, which is 1
> under perfect alignment and `O(1/√#)` under square-root cancellation.
> *Pre-registration:* write down which of the two regimes is expected at each
> level, and the threshold ratio below which an `ℓ¹ → ℓ²` theorem could deliver
> the needed `√log`, before computing. *Kill:* a ratio at or above 0.5 at every
> level kills the whole `ℓ¹ → ℓ²` programme for this wall, which is worth more
> than a partial success and retires rows 5 and 6 together."

**One caution recorded before the numbers exist, because it changes what the
verdict means and must not be invented afterwards.** The criterion's letter and
its stated mechanism point opposite ways. Cauchy–Schwarz gives
`‖Θ‖₁ ≤ ‖Θ‖₂·√#` with equality exactly when the mass is flat, so `ρ ≈ 1` is the
case in which an `ℓ¹ → ℓ²` conversion has the *most* to win (`√#`), and `ρ ≈ 1/√#`
is the case in which `‖Θ‖₁ ≈ ‖Θ‖₂` and the conversion wins *nothing*. The map's
sentence reads that backwards. The measurement is well defined either way, and
this file commits to reporting the verdict under the criterion's letter AND
under the corrected inference, whichever way the numbers fall.

## 3. Which regime is expected, per level — the pre-registered predictions

**P1. `ρ < 0.5` at every level, so the kill criterion as written does NOT fire.**
Point prediction `ρ(13) ∈ [0.05, 0.40]`, and `ρ` monotone decreasing in `z` over
`13, 17, 19, 23, 29, 31`.

**P2. The decay is geometric per added prime**, `ρ(z_{k+1})/ρ(z_k) ∈ [0.35, 0.80]`,
equivalently `ρ ≈ c·A^{π(z)}/√W` with `A ∈ [1.5, 2.5]`. Mechanism claimed in
advance: `‖Θ‖₂² = Var(c)` is nearly flat in `z` (recorded 5.79e-2 → 3.67e-2 over
z = 13..31) while `#` multiplies by about `p` at each added prime, so `ρ` can
only hold up if `‖Θ‖₁` also multiplies by `√p`, and the ℓ² mass is concentrated
on small `e` while the term count is concentrated on large `e`.

**P3. The participation ratio `N_eff := (‖Θ‖₁/‖Θ‖₂)² = ρ²·#`** — the number of
equal-sized terms carrying the same ℓ¹ mass — grows with `z` but far slower than
`#`; predicted `N_eff/#` below `0.16` at `z = 13` and below `0.01` at `z = 31`.

**P4. The weighted ratio is smaller than the unweighted one**, `ρ_W(H) < ρ(z)` at
every level, because the `1/|sin(πa/e)|` factor inside `S_H` concentrates on
small `a/e`.

**P5. The operative prize.** `A(z) := Ssup(H)/(rms(R_H)·√(2 ln W))` at the
operative window is predicted to reproduce the TIGHTNESS `ratio` column already
embedded in `lemmaV-sup-extension.js` S3 (3.30, 3.12, 5.08, 7.70, 11.84, 15.45 at
`H = H_sup`, z = 13..31) and to rise with `z`; and at the exhaustive windows
`H = nP` it is predicted to land within a factor `[1.0, 2.0]` of the ℓ¹ bound's
overshoot of the truth, `Ssup(nP)/sup|R|` (recorded 4.32, 5.77, 8.78, 15.14).

**P6. The consequence, pre-registered so it can be falsified.** Because
`‖Θ·S_H‖₂ = rms(R_H)` exactly (L3), an `ℓ¹ → ℓ²√log` theorem on this family IS
the statement `sup_x|R_H(x)| ≤ C·rms(R_H)·√(2 ln W)`, which is the corpus's own
sharp maximal law. Predicted: the constant such a theorem needs in order to be
TRUE is at least the measured `sup/rms/√(2 ln W)` = 0.5634, 0.7279, 0.9215,
0.7935, 0.8507 (`phase1-T4-maximal-law.md` §4, reproduced in
`import-chaining.md` §0), and it is TPC-implying for `C` below `C_crit` = 2.225,
1.720, 1.358, 1.418, 1.660 (`phase1-T4-maximal-law.md` §2(c), quoted in
`import-chaining.md` §4.3).

## 4. The threshold the map asked for, written as a constant and not as a ratio

The map asks for "the threshold ratio below which an `ℓ¹ → ℓ²` theorem could
deliver the needed `√log`". On this family that threshold is not a property of
`ρ` — `ρ` and the gain are the same quantity in different units, since the gain
of a perfect conversion is `‖ΘS‖₁/(‖ΘS‖₂√(2 ln W)) = ρ_W·√#/√(2 ln W)`
identically. The threshold that has content is on the CONSTANT:

> **A conversion theorem `sup|R_H| ≤ C·rms·√(2 ln W)` is TRUE only for
> `C ≥ sup/(rms·√(2 ln W))` and is TPC-implying for `C < C_crit`. The entire
> window in which such a theorem is both true and non-circular is therefore
> `C ∈ [0.9215, 1.358]` at `z = 19` and `[0.7935, 1.418]` at `z = 23` — a factor
> under 1.5, level by level.**

**Pre-registered verdict rule, fixed now.**

1. If `ρ ≥ 0.5` at every level: the criterion fires by its letter, rows 5 and 6
   retire, and the record must ALSO state that under Cauchy–Schwarz a flat family
   is the favourable case, so the retirement rests on the constant window of §4
   and not on the ratio.
2. If `ρ < 0.5` somewhere: the criterion does not fire by its letter. The decay
   rate is then reported as the prize, and the route survives ONLY if the
   available gain `A(z)` exceeds the overshoot `Ssup/sup` AND the constant window
   of §4 is non-empty and does not shrink with `z`.
3. Either way the row-5 anchor question is answered separately: does the family
   exhibit square-root cancellation at all, measured as `sup|R|/(rms·√(2 ln W))`
   against 1.

**What would surprise me**, recorded so that it counts if it happens: `ρ` flat or
rising in `z`; `A(z)` materially BELOW `Ssup/sup`, which would mean even a perfect
conversion cannot reach the truth and the route dies harder than TPC; or
`‖Θ‖₂² ≠ Var(c)` to more than 1e-12 relative, which would mean the definition
pinned in §1 is not the one the corpus's own scripts compute.
