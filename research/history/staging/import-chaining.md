# Generic chaining, imported and closed: the union bound over positions was never the loss

<!-- ledger
id: Q-import-chaining
status: CLOSED
todo: 0c
question: Can Dudley's entropy bound or Talagrand's generic chaining beat the union bound over positions on the maxsum law?
verdict: No, and the reason is geometric rather than probabilistic: the entropy integral of the true increment metric is already 1.054-1.099 times rms*sqrt(2 lnW) at its lower branch and 1.484-1.545 at its upper, flat across z = 13..23, so chaining's ceiling with a perfect universal constant sits below the union bound's floor; the honest constant-carrying chain measures 2.878 to 3.027.
-->

*(2026-08-19. Foreign-import attack 1 of 5: Dudley's entropy bound and
Talagrand's generic chaining, run against the corpus's `u_sup` wall and against
TODO 0c's maxsum law. Artifacts: `research/import-chaining-01.js`,
`research/import-chaining-02.js`, `research/import-chaining-03.js`, all three
embedded. Legend: **[PROVEN]** published theorem with source; **[VERIFIED]**
checked computationally here; **[MEASURED]** empirical, finite range;
**[INFERRED]** our deduction from sourced facts; **[LITERATURE, UNVERIFIED]**
recalled from the standard theory and not opened against a source in this run.)*

## HEADLINE

**Chaining cannot beat the union bound over positions here, and the reason is
geometric rather than probabilistic: the entropy integral of the true increment
metric is already LARGER than the union bound at every level.** Measured, exact,
two-sided from ball volumes with no net choice at all: the integral is
1.054–1.099 times `rms·sqrt(2 lnW)` at its lower branch and 1.484–1.545 at its
upper branch, flat across z = 13..23. Since the entropy integral is what
chaining delivers with a *perfect* universal constant, chaining's ceiling sits
below the union bound's floor. The honest constant-carrying chain measures
**2.878 to 3.027**, flat.

**And the target was mis-addressed, which is the more useful finding.** The
`C^{π(z)}` price is charged by *the triangle inequality over the (e,a) sum*
(`sift-limit-attack.md` §7e), and `(e,a)` indexes **moduli and frequencies, not
positions**. Chaining is a tool for a supremum over an index set with metric
structure; the position supremum is the step that is already essentially
optimal, because a union bound over W positions at moment order 2 lnW returns
`sqrt(2 lnW)` exactly. The `ℓ¹ → ℓ²·sqrt(log)` improvement the corpus wants over
the frequency sum is a Salem–Zygmund-type statement about the *arithmetic* of
the coefficients `Θ_e(a)`, and no amount of geometry on `Z/W` reaches it.
**That relocation is the wall's new address.**

**Three by-products, each independently checkable.**

1. **The increment metric is Brownian with an exact mechanism**, not an
   empirical fit: `R_H(x+δ) − R_H(x) = R_δ(x+H) − R_δ(x)`, so the increment at
   lag δ IS the remainder at window δ, and `d_H(δ) = d_δ(H)`. Hence
   `d(δ) ≤ 2 sqrt(⟨R²⟩_δ) ≤ 2 sqrt(B(z,s)·δ)` **unconditionally**, on the
   already-proved mean-square theorem. **[INFERRED]**, **[VERIFIED]** numerically.
2. **Dudley's hypothesis is measured FALSE on the scales that carry the bound.**
   `sup|inc|/(d(δ)·sqrt(2 lnW))` at lag 1 reads 1.8204, 1.5156, 2.3099, 2.5769
   at z = 13, 17, 19, 23 — rising — and the scales where it fails carry
   30.2%–81.7% of the entropy integral, also rising.
3. **TODO 0c's law has the right log and the wrong root.** The OLS slope of
   `ln sd_m` on `ln m` is 0.2661 ± 0.0230, 0.2804 ± 0.0189, 0.3001 ± 0.0130,
   0.3216 ± 0.0096 on T_13..T_23, against the 0.5 that `sqrt(2m ln D)` assumes.
   Every one is more than eight standard errors below 0.5.

---

## 0. CUSTODY

Everything numeric below is quoted from the embedded OUTPUT block of one of the
three scripts. Nothing that already exists in the corpus was recomputed except
as a custody check.

| check | result |
|---|---|
| new lag-dependent closed form at lag 0 vs `sift-limit-lemmaV.js` `meanSquare` | rel 2.49e-15, 4.01e-16, 0.00e+0, 1.18e-15, 3.79e-15 at z = 13..29 |
| full-period array mean square vs the closed form | rel 8.40e-15 to 3.45e-11 |
| FFT cyclic autocovariance vs the closed form at lags 1 and 7 | rel 2.75e-14 to 3.00e-10 |
| the closed form at lag ≠ 0 vs brute force over the period | agrees to 9 printed digits (z = 13, lags 0, 1, 2, 3, 10, 100) |
| `minT = 1` at H = 60, 126, 198, 258, 390 | **reproduces `phase1-T4-maximal-law.md` §4's self-consistent windows exactly** |
| `sup/(rms·sqrt(2 lnW))` | 0.5634, 0.7279, 0.9215, 0.7935, 0.8507 — `phase1-T4` §4's tightness row, digit for digit, from an independently written walker |

**One correction made to my own first pass, recorded because it changes a
formula another attack might copy.** The off-diagonal factor 2 in
`sift-limit-lemmaV.js` `meanSquare` is valid **only at lag 0**: at lag δ the
pairs (i,j) and (j,i) carry `Ψ(g, Δc − δ)` and `Ψ(g, Δc + δ)`, which differ. The
first version of `rhoR` used the factor 2 and was wrong by up to 60% at δ = 10.
Caught by the FFT cross-check, not by inspection.

---

## 1. THE MAPPING, PRECISE

**The object.** `R(x) = Σ_i w_i [ψ((x−c_i)/q_i) − ψ((x+H−c_i)/q_i)]` on
`x ∈ Z/W`, `W = P(z)`, the Brüdern–Fouvry sawtooth remainder of
`research/sift-limit-lemmaV.js`. The wall is `sup_x |R(x)|`.

**The process, and why stationarity closes the usual gap.** Put
`Z_x := R(t + x)` with `t` uniform on `Z/W`. This is a genuine stochastic
process indexed by `x`, and for **every** realisation of `t`,
`sup_x (Z_x − Z_0) = sup_y R(y) − R(t)`. Taking expectations,

> **`E sup_x (Z_x − Z_0) = sup_y R(y)`, exactly.**

The standard objection to importing chaining — that `E sup` does not bound one
deterministic sample — **does not arise**, because the randomisation is a shift
of the whole function and the supremum is shift-invariant. This is the one place
where the import is clean, and it is worth keeping even though the route dies
downstream.

**The metric.** `d(x,y)² = ‖Z_x − Z_y‖₂² = 2(⟨R²⟩ − ρ_R(x−y))`, translation
invariant, so `d(x,y) = d(δ)`, `δ = x − y`. Closed form, derived and verified
here as an extension of Lemma V's S2:

```
  rho_R(delta) = sum_{i,j} w_i w_j [ Psi(g, dc - delta) + Psi(g, dc + delta) ] / (2 q_i q_j) * 2
  Psi(g, y)    = P_g(y - H) + P_g(y + H) - 2 P_g(y),   P_g(y) = ybar (g - ybar)/2
  g = gcd(q_i, q_j),  dc = c_j - c_i,  ybar = y mod g
```
with the (V1) pruning `g | H ⟹ Ψ ≡ 0` still valid at every lag.

**The exact increment bound the brief asked for.** Directly from the definition,

> **`R_H(x + δ) − R_H(x) = R_δ(x + H) − R_δ(x)`**

— the increment at lag δ *is* the remainder at window δ, with the roles of
window and lag exchanged. Hence `d_H(δ) = d_δ(H)`, and

> **`d(δ)² ≤ 4 ⟨R²⟩_δ ≤ 4 B(z,s) · δ`, i.e. `d(δ) ≤ 2 sqrt(B(z,s) δ)`**

on the unconditional mean-square theorem `⟨R²⟩_H ≤ B(z,s)·H`,
`B ≤ 9A²(E−1) = O((log z)⁸)` (`history/staging/attack-AB-bounded.md`).
**[INFERRED]** from a **[PROVEN]** input, with no new hypothesis. The metric is
**Brownian**, with a proved constant.

**Measured, it is Brownian to three digits.** `d(δ)/sqrt(δ)` reads
0.2791, 0.2791, 0.2791 at δ = 1, 2, 4 (z = 13), and 0.2296, 0.2296, 0.2300,
0.2285, 0.2249 at δ = 1..16 (z = 29), saturating at `2·rms` near δ ≈ H.
**The pre-registered P1 ("the metric is flat, `d(1)/(2 rms) > 0.9`") is
REFUTED**: measured 0.0875 to 0.1168. Chaining has real geometry here. That is
the opposite of what the attack expected, and it is why the route had to be run
properly rather than dismissed.

**The entropy integral.** With `d(δ) ≤ 2 sqrt(B δ)`, an interval of length ℓ has
diameter `≤ 2 sqrt(B ℓ)`, so `N(ε) ≤ min(W, 4BW/ε²)` and

```
  E sup |R| <~ int_0^{2 rms} sqrt( 2 ln min(W, 4 B W / eps^2) ) d eps.
```

Evaluated with the *measured* local constant `⟨R²⟩_1` (0.0579, 0.0498, 0.0465,
0.0433, 0.0388 at z = 13..29) this is **1.773, 1.780, 1.830, 1.837, 1.837**
times `rms·sqrt(2 lnW)`. Evaluated with the *proved* `B = 9A²(E−1)`
(3.592e+3 to 1.861e+4) it is **exactly 2.000 times** the union bound at every
level, because `4BW/ε² > W` over the whole range `[0, 2 rms]` and the covering
refinement never activates at all. **The proved constant is five orders above
the measured one, so the Brownian structure is invisible to it.**

**KEY QUESTION, answered.** Yes, chaining reproduces `σ sqrt(2 lnW)`
multiplicatively and therefore beats `C^{π(z)}` exponentially. **The constant is
2.878 to 3.027** for the honest chain and **1.04 to 1.55** for the entropy
integral's own two-sided band.

---

## 2. THE HONESTY GATE — the crux, walked

Dudley bounds `E sup` for processes with **subgaussian increments**:
`P(|Z_x − Z_y| > u·d(x,y)) ≤ 2 exp(−u²/2)`. Our L² data alone gives no such
thing. §1 closes the `E sup` versus one-sample gap by stationarity; it does not
close this one. Three statements, in decreasing strength, and the honest verdict.

**(i) The deterministic Lipschitz form is vacuous.** `|R(x) − R(y)| ≤ d(x,y)`
is false — `d` is an average over t and the pointwise increment at a particular
pair far exceeds it. Chaining under a genuine pointwise Lipschitz bound gives
`sup ≤ diam`, which here is `2·rms`, absurdly weak.

**(ii) The L^p form charges the same moment order the union bound charges.** For
increments controlled only in `L^p`, chaining pays `N^{1/p}` per level; with
`N_j → W` at the fine end, `p ≈ 2 lnW` is required. But a union bound over W
positions with `⟨R^{2k}⟩ ≤ (2k−1)!! σ^{2k}` up to `k ≈ lnW` already returns
`σ sqrt(2 lnW)` on optimising k. **Chaining does not reduce the moment order.
It reorganises which random variables the moments are needed for, and it needs
them for W increment families instead of for one variable.**

**(iii) The subgaussian form is the only one that would work, and it is MEASURED
FALSE where it matters.** `import-chaining-02.js` §S1 measures
`sup_t|R(t+δ) − R(t)| / (d(δ)·sqrt(2 lnW))` at every dyadic lag:

```
   lag 1:   1.8204 (z=13)   1.5156 (z=17)   2.3099 (z=19)   2.5769 (z=23)   rising
   m8/105 at lag 1:  358.302        53.527        200.211        339.924
```

A Gaussian gives `m8/105 = 1`. **The mechanism is exact and arithmetic**: at
lag 1 the increment is `cert(t) − cert(t+H)` where `cert` is the vector-sieve
certificate weight at a single point, taking values in `[−1,1]`, `[−2,1]`,
`[−3,1]`, `[−3,1]` at z = 13, 17, 19, 23 with rms 0.2471, 0.2281, 0.2193. A
sparse bounded integer variable is heavy-tailed relative to its own rms by
construction, and `sup/rms` widens with z.

**The gate does pass at the coarse scales** — the ratio drops below 1 from
lag 4 (z = 13), lag 32 (z = 17), lag 64 (z = 19, 23) and stays there at every
larger lag scanned. So the honest verdict is not "the hypothesis is false" but:

> **CRUX VERDICT. Dudley's hypothesis holds on the coarse half of the scales and
> fails on the fine half, by a factor 1.52 to 2.58 that rises with z; and the
> failing half carries 30.2%–81.7% of the entropy integral, a fraction that also
> rises with z.** (`import-chaining-03.js` (b): 42.1%..30.2%, 76.6%..59.3%,
> 78.6%..62.7%, 81.7%..65.1% at z = 13, 17, 19, 23, the two figures being the
> lower and upper covering-number branches.) Because `d(δ) ~ sqrt(δ)`, a quarter
> of the lag range is half the metric range, which is why a failure confined to
> small lags is not a small failure.

**No almost-all closure is reopened.** Nothing here produces a
majority-of-positions statement; §4's verdict is a statement about worst
positions and about a constant, and `REFUTED.md`'s almost-all rows are untouched.

**One structural point, recorded so nobody re-tries the majorizing-measure
upgrade.** Our metric is **translation invariant**, i.e. the process is
stationary on a compact abelian group. For stationary Gaussian processes on such
groups the entropy integral is sharp up to a universal constant and the
majorizing-measure functional `γ₂` gives nothing beyond it (Fernique;
Marcus–Pisier; Talagrand's generic-chaining book, the random-Fourier-series
chapter). **[LITERATURE, UNVERIFIED]** — recalled from the standard theory and
not opened against a source in this run, and flagged as such. If it holds, the
entropy integral computed in §3 is not merely one chaining bound among many: it
is the ceiling of the whole Talagrand programme on this object, and §3's
measurement closes the family rather than one member.

---

## 3. THE THREE COLUMNS, AND THE PRE-REGISTRATION SCORED

Pre-registered before the first run, in the header of
`research/import-chaining-01.js`.

```
   z      truth      union      t/u  |   CHAIN_opt   c/u  |  entropy integral, exact two-sided   /union
  13     2.6494     4.7027  0.5634  |    14.0783  2.994  |   4.9567 .. 7.2664            1.054 .. 1.545
  17     4.9203     6.7593  0.7279  |    20.4633  3.027  |   7.0275 .. 10.2251           1.040 .. 1.513
  19     6.8403     7.4229  0.9215  |    21.3626  2.878  |   8.0895 .. 11.0144           1.090 .. 1.484
  23     7.8157     9.8499  0.7935  |    28.4138  2.885  |  10.8260 .. 14.7113           1.099 .. 1.494
  29    11.4187    13.4223  0.8507  |         --     --  |        --                          --
```

`union = rms·sqrt(2 lnW)`, the corpus's S-sharp law. `CHAIN_opt` is the
constant-carrying chaining sum `Σ_j ε_{j−1} sqrt(2 ln N(ε_j))` on geometric
nets. The entropy integral is computed with **no net choice at all**, from the
exact ball volumes of the translation-invariant metric via
`W/|B(ε)| ≤ N(ε) ≤ W/|B(ε/2)|`. The `u_sup` column of `sift-limit-attack.md`
§7e is 2.0617, 2.3036, 2.5518, 2.6666 at these levels, in exponent units, and is
placed against chaining in §4.

**Scoring.**

- **P1 REFUTED.** The metric is Brownian, not flat: `d(1)/(2 rms)` = 0.0875 to
  0.1168 against the predicted `> 0.9`. This is the prediction whose failure
  made the run worth doing.
- **P2 not applicable as stated.** It was a prediction about CRT-filtration tail
  energies, which the Brownian metric makes the wrong nets; the machinery is in
  `import-chaining-01.js` `tailEnergies` and is unused in the verdict.
- **P3 RIGHT for the correct chain, WRONG for the naive one.** Predicted
  chain/union in [3,10] growing like π(z). Measured 2.878–3.027 for the
  ε-geometric chain, **flat, not growing** — and 9.407, 12.325, 14.694, 19.358,
  30.663 for the dyadic-interval chain, which is the wrong construction and
  whose growth is the levels on which the cell diameter has already saturated.
- **P4 RIGHT.** Predicted the floor at about `sqrt(2) = 1.414` times the union
  bound. Measured band [1.04, 1.55], flat, containing it.
- **P5 RIGHT.** truth/union = 0.5634, 0.7279, 0.9215, 0.7935, 0.8507, inside the
  predicted 0.56–0.92.

---

## 4. THE PRICE: the theorem candidate, the failing step, and the TPC check

### 4.1 The theorem candidate, with every hypothesis

> **CANDIDATE (conditional).** Fix z, s, H; let W = P(z), R = R_H,
> `d(δ)² = 2(⟨R²⟩ − ρ_R(δ))`. Assume
> **(SG)** for every `δ ∈ Z/W`, the variable `R(t+δ) − R(t)` with t uniform on
> `Z/W` satisfies `P(|·| > u d(δ)) ≤ 2 exp(−u²/2)` for all `u > 0`.
> Then `sup_x |R(x)| ≤ Σ_{j≥1} ε_{j−1} sqrt(2 ln N(ε_j))`, `ε_j = 2^{−j} diam`.
>
> **Measured value of the right-hand side: 2.878 to 3.027 times
> `rms·sqrt(2 lnW)`, flat in z.**
>
> Status of (SG): **MEASURED FALSE** at every lag below δ* = 4, 32, 64, 64
> (z = 13, 17, 19, 23), by factors up to 2.58 and rising; those lags carry
> 30.2%–81.7% of the bound.

### 4.2 The failing step, in chaining coordinates

**The wall's new address is the subgaussian increment hypothesis at the fine end
of the chain**, where the increment is the certificate weight difference
`cert(t) − cert(t+H)`: a sparse, bounded, integer-valued arithmetic object whose
`sup/rms` grows with z. In chaining language: *the process has good metric
geometry and bad increment tails, and Dudley needs both.*

### 4.3 The TPC check, and why the route is squeezed dead

`phase1-T4-maximal-law.md` §2(c): a bound `sup|R| ≤ C·rms·sqrt(2 lnW)` is
TPC-implying for `C` below `C_crit` = 2.225, 1.720, 1.358, 1.418, 1.660 at
z = 13..29. Converting through `need(K) = K²·need_sharp` — legitimate because
`⟨R²⟩_H/H` is flat at the operative window (`phase1-T4` §2b) — and reading
`import-chaining-03.js` (e):

```
  z |  need_sharp  /z^2 | entropy floor K=1.30: /z^2 | chaining K=2.94: /z^2 | C_crit
  13 |     100  0.5917  |          1.0000            |        5.1146          | 2.225
  17 |     142  0.4913  |          0.8304            |        4.2470          | 1.720
  19 |     191  0.5291  |          0.8942            |        4.5732          | 1.358
  23 |     325  0.6144  |          1.0383            |        5.3103          | 1.418
  29 |     436  0.5184  |          0.8761            |        4.4811          | 1.660
```

Three readings, and together they close the route from both sides.

1. **The entropy floor is at or inside the TPC-implying region.** At K = 1.30 it
   is below the zone budget at three of five levels and at it within 4% at the
   other two. So *a chaining theorem with a universal constant near 1 would be
   TPC-implying*, and by `phase1-T4`'s argument cannot be proved by any soft
   argument. **Which chaining constant blocks it: the universal Dudley constant.
   It would have to run below about 1.05 relative to the entropy integral to
   reach the threshold, and it measures 2.3 to 2.9.**
2. **The honest chaining constant is legal and useless.** At K = 2.94 the
   requirement is 4.25 to 5.31 zone budgets, far above 1, so nothing is implied
   and nothing is delivered. In exponent units that column is
   `u = ln(need)/ln z` = 2.6363, 2.5105, 2.5163, 2.5325, 2.4454 — flat or gently
   falling — against `u_sup` = 2.0617, 2.3036, 2.5518, 2.6666, which rises at
   every step and diverges on a flat 2.05 factor per added prime
   (`sift-limit-attack.md` §7e). The two cross between z = 19 and z = 23. **So
   chaining does beat the quantifier price, and it changes nothing**, because
   the chaining column is conditional on (SG) and the `u_sup` column is
   unconditional.
3. **And the decisive point needs neither of those.** `I_lo/union` = 1.054,
   1.040, 1.090, 1.099: **the entropy integral of the true metric already
   exceeds the union bound at every level**, before any constant is charged and
   before (SG) is even discussed. The entropy integral is chaining's output with
   a perfect constant, so *chaining's ceiling is below the union bound's floor*.
   The mechanism is plain: the union bound prices the variable at its own scale
   `rms`; chaining only ever sees increments, and pays `diam = 2·rms` at the top
   of the chain, a factor it never recovers.

> **VERDICT. The chaining route is CLOSED. It is dominated on both axes: its
> conclusion is 2.9× weaker than the corpus's S-sharp law (and cannot be better
> than 1.04× weaker even with a perfect constant), and its hypothesis (SG) is a
> family of W statements, measured false where it matters, in place of the one
> statement "R is subgaussian at scale rms" that the union bound needs and that
> the moment data in `import-chaining-02.js` reading 4 shows is nearly true.**

**And the relocation is the win.** `sift-limit-attack.md` §7e diagnoses the
`C^{π(z)}` loss as "the triangle inequality over the `(e,a)` sum". That sum is
over **moduli and frequencies**. The step over **positions** — the one chaining
addresses — is already optimal to within the constant measured here. So the loss
was never a union bound over positions, and the thing that would have to be
proved is an `ℓ¹ → ℓ² sqrt(log)` statement about the *arithmetic* of `Θ_e(a)`,
i.e. that the certificate's Fourier coefficients behave like random signs. No
metric geometry on `Z/W` reaches that, and this run is the demonstration.

---

## 5. WHAT THIS DOES TO TODO 0c

The maxsum object is the better fit for the import, and it yields a correction
rather than a route.

**The metric is Brownian with a hard cutoff at m, exactly as the mapping
predicts.** At T_23, m = 32, `d(lag)/sd_m` reads 0.421, 0.583, 0.749, 0.907,
1.200, 1.612 at lag 1, 2, 4, 8, 16, 32, then flattens at 1.471, 1.512 for
lag 64, 128 — square-root growth to `lag = m`, saturation at `sqrt(2)` after.
**So the `sqrt(log #positions)` shape of 0c's law is the signature of a
moving-sum process, and chaining explains it.** That is the positive content.

**But the `sqrt(m)` factor is wrong, and measurably so.** `sd_m/(sd_1 sqrt(m))`
falls monotonically to 0.413, 0.420, 0.461, 0.497 at m = 64 on T_13..T_23, and
the OLS slope of `ln sd_m` on `ln m` over m = 1..64 is

```
  T_13  0.2661 +/- 0.0230      T_17  0.2804 +/- 0.0189
  T_19  0.3001 +/- 0.0130      T_23  0.3216 +/- 0.0096      (independent gaps: 0.5)
```

Every one is more than eight standard errors below 0.5. **The tile's gaps are
anti-correlated and the block variance is sub-additive, with a shortfall that
depends on m — so no single `σ` absorbs it and the law
`maxsum_m = m·m̄ + σ sqrt(2m ln D)` cannot hold with one constant across m.**
Consistently, `excess/sd_m` at m = 1 is 3.80, 5.83, 7.25, 9.04 against
`sqrt(2 ln D)` = 3.822, 4.475, 5.068, 5.637 (ratios 0.99, 1.30, 1.43, 1.60,
rising), and at m = 32 it is 3.04, 3.24, 4.47, 4.89, i.e. below the same column.

**Three riders on that.** (i) The slope itself rises with the tile — 0.2661,
0.2804, 0.3001, 0.3216 — and four points do not decide whether it heads for 0.5;
what is decided is the behaviour at every exactly computable level. (ii) The
definitions used here are `D` = the slot count of `T_x`, `m̄ = W/D`, `sd_m` = the
exact standard deviation of `slot[i+m] − slot[i]` over `i ∈ Z/D`; if TODO 0c's
`σ` and `D` are defined otherwise the arithmetic of the comparison moves, and
this reading should be checked against 0c's own source before it is promoted out
of staging. (iii) Chaining's own refinement of the log factor — `ln(D/m)` in
place of `ln D` — is **not** supported: the measured `excess/sd_m` sits above
both columns at small m and below both at large m.

**The same gate fails here too, and also rises.** `sup/d` at lag 1 is 3.08,
4.56, 5.57, 7.04 on T_13..T_23 against `sqrt(2 ln D)` = 3.822, 4.475, 5.068,
5.637: the ratio runs 0.81, 1.02, 1.10, 1.25, crossing 1 between T_13 and T_17.
So 0c gains no bound from this import. What it gains is the **statement of the
right object**: a proof of a maxsum law by this route needs a uniform subgaussian
tail for sums of δ consecutive tile gaps, δ ≤ m — a family with no position
quantifier — and the measurement says that family is violated at δ small, by a
margin that grows with the tile.

---

## 6. COVERAGE

**What I did not reach.**

- **z = 29 has no metric profile and no chain number.** `W = 2.23e8` puts the
  period array out of reach at 8 bytes a slot, so z = 29 contributes the true
  supremum (blocked walker, 265 s) and the closed-form metric at δ = 1..1024,
  but not the exact ball volumes, hence no `I_exact` and no `CHAIN_opt`. The
  four levels that do carry those are flat to within 5%, so I do not expect z=29
  to move them; that is an expectation, not a measurement.
- **The subgaussian gate is measured at dyadic lags only**, so `δ*` is located to
  within a factor of 2. The fractions in §2 inherit that granularity.
- **s = 3.0 only.** `phase1-T4` §6 records the same restriction and the same
  reason; I did not test whether the flatness of `CHAIN_opt/union` survives a
  change of s.
- **Fernique's theorem is not verified against a source in this run** and is
  flagged **[LITERATURE, UNVERIFIED]** in §2. If it is wrong or does not apply,
  §3's entropy integral closes Dudley and not the whole Talagrand family; §4.3
  reading 3 is unaffected either way, since it compares the integral to the union
  bound directly.
- **I did not attempt a Bernstein-type chain.** The fine-scale increments are
  bounded (the certificate range is `[−3,1]` at z = 19, 23), so a bounded-
  difference chaining variant is formally available. I did not price it, because
  §4.3 reading 3 kills the route on the geometry alone, independent of which tail
  inequality is used at the links.

**What I suspect but did not prove.** That `I_lo/union` stays above 1 for all z.
Four levels reading 1.054, 1.040, 1.090, 1.099 with no trend is consistent with a
constant above 1 and with a very slow drift; brief Trap 3 applies and I am not
calling a trend.

**Where I am most likely wrong.** The conversion `need(K) = K² need_sharp` in
§4.3 assumes `⟨R²⟩_H/H` is flat across the relevant H, which `phase1-T4` §2b
measures at the operative window but not across a factor of 9 in H, which is what
`K = 2.94` moves. If `⟨R²⟩_H/H` falls over that range the chaining column in the
table is an overstatement — in the direction that makes the route look worse than
it is. Reading 3 of §4.3 does not use the conversion.

**Brief trap checks.** Trap 1: `δ*` and the operative windows come from full
scans with the last failure recorded, never a bisection; `minT = 1` is printed at
every level. Trap 2: every ratio in §3 and §4 compares quantities at the same z,
the same H and the same s, and the units of `union` are stated. Trap 3: the
flatness of `CHAIN_opt/union` and of `I/union` is reported as a band, not a
trend, and the one rising quantity (the gate ratio, the slope in §5) is reported
as rising over four points with the count stated.

**Artifacts.** `research/import-chaining-01.js` (the mapping, the metric, the
three columns; 265 s), `research/import-chaining-02.js` (the crux, the maxsum
metric; 7 s), `research/import-chaining-03.js` (the optimised chain, the gate
fractions, the proved-input integral, the maxsum variance exponent; 17 s). All
three carry embedded OUTPUT blocks written by `research/qc/embed.js` and
numbered readings below them.
