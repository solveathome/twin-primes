# The weakest sufficient form of F4: the mode-count check answered, the ℓ¹ frontier measured, the family charts drawn

<!-- ledger
id: Q-f4weak
status: PARTIAL
todo: none
question: What is the weakest sufficient form of F4 that could be proven, given rms <= z^(3+o(1))?
verdict: The mode-count/degree bound is NOT the theorem (sqrt(N)*rms grows at z^8.174 +/- 0.249 against the z^4.26645 ceiling and is dead from z = 31); one new PROVEN finite-z clearing survives z = 47 at a 5.0 percent margin but converges onto the trivial bound; the weakest law-shaped form found is MV(alpha), a mean value over modes, MEASURED slope 4.214 +/- 0.304 with beta2 inside the bar.
-->

**The F4 follow-on of `attack-rhoms-01.md`, executed: with rms ≤ z^{3+o(1)}
PROVEN, any recovery sup ≤ C·rms·z^ℓ with ℓ < β₂ − 3 = 1.26645 wins — this
pass hunts the weakest such form that could be proven, treating ρ̃ as what it
is: a deterministic explicit trig sum with computed coefficients. Producer:
`research/attack-f4weak-01.js` (embedded via `qc/embed.js`; code-sha256 and
out-sha256 match, body bit-honest; all controls pass). Four things came out.
All new findings HELD for one adversarial pass per the standing rule.**

**One: the first concrete check is answered — the mode-count/degree bound is
NOT the theorem (§1).** The mode count N(z) = Σ_{e∈E} φ(e) is computed
exactly at all ten z: the mode set is **W-saturated at z ≤ 19** (coverage
N/(W−1) = 1.0000 — every divisor is a live conductor, so the degree bound
√N·rms IS Chebyshev √W·rms there), detaches from W at z = 23 (coverage
0.2731, then 0.0936, down to lnN − lnW = −14.0 at 47) but still grows at
d lnN/d lnz = 11.876 ± 0.328 — the divisor count is still doubling with each
new prime. √N·rms grows at **z^{8.174 ± 0.249} against the z^{4.26645}
ceiling**: it clears smax only at z ≤ 29 and is dead from z = 31 on; the
no-measured-input variant √N·√(B₂/12) is dead from z = 19. Task (c)'s STOP
condition is NOT met.

**Two: a new PROVEN finite-z clearing — and it is the first to survive
z = 47 (§2).** Λ_V(z) = Σ_e Vabs(e)·(e/2)(ln e + 0.307) is a fully proven
sup bound (classical cosecant ℓ¹ bound + Θ* ≤ Vabs, no measured input
anywhere) and **clears smax at ALL TEN levels, 1.498e5 ≤ 1.577e5 at z = 47
(5.0% margin)** — where R1, the previous best proven recovery, certifiably
failed. But it is the Bonferroni window once more: its growth is 5.230 ±
0.186, at z = 47 it has converged onto the trivial (n+M)/2 = 1.470e5, and
the collapse is structural — Σ_e e·Vabs(e) ≤ Σ_i σ(q_i)/q_i ≤ n·Π(1+1/p) =
O(n ln z) (L4): absolute-value accounting cannot win asymptotically.

**Three: the exact spectral ℓ¹ norm of ρ̃, measured for the first time — and
the β₂ boundary passes through its error bar (§2, §5).** Λ(z) =
Σ_{e,a}|Θ_e(a)|/(2 sin(πa/e)) = 9.801, 25.157, 60.031, 121.250, 261.555 at
z = 13..29, exact (factorised vs direct-phase 1.9e-14; Parseval vs walker
1.2e-10; sup ≤ Λ holds with 3.7×→3.2× slack). **d lnΛ/d lnz = 4.214 ± 0.304
against β₂ = 4.26645** — the weakest law-shaped object this pass found,
**MV(α): Λ ≤ C·z^α with α < β₂, a MEAN VALUE over modes with no position
sup, implies RML(α) outright**, and it is the only form here whose truth the
measurements do not already decide against (the a′≤3 model extension reads
5.649 ± 0.227 at 31..47, leaning low, and local slopes rise with the window
throughout this corpus — quote no single power). The TRUTH's recovery loss
is measured too: d ln(sup/rms)/d lnz = 0.891 ± 0.213 vs F4's √(2lnW) at
0.54–0.56 in z-exponent, vs the ℓ¹ instrument's 2.608 ± 0.179.

**Four: the family charts (§3, §4).** sup ≤ C·rms·(lnW)^A wins iff
A·lnθ/lnz < 1.26645 − o(1) — finite-z A_max runs 3.575 → 2.497 across
13..47 and 1.2666 at z = 999983; F4 (A = 1/2) carries a 5–7× margin in A
units everywhere measured. Every fixed W^ε dies: z* = 13, 19, 23, 41, 71,
151, 419 at ε = 1/2..1/50. The moment ladder with Gaussian constants
**rediscovers F4 exactly at its k-optimum** (1.0047–1.0218 × rms√(2lnW);
synthetic control 1.0002, 1.0000 at θ = 1e3, 1e6): uniform sub-Gaussian
moments ARE F4 at constant 1. Measured to m₁₆ for the first time:
C_k/(2k−1)!! < 1 at every (z, k ≤ 8), falling in k, drifting up in z; the
needed order is k(z) → 0.56·z/lnz.

---

## 0. CUSTODY

Everything measured is in `research/attack-f4weak-01.js` (`qc/embed.js
--check`: code-sha256 matches, out-sha256 matches, body bit-honest;
deterministic — the check's re-run reproduced the out-sha). Division of
labour per the standing compute rule:

- **Recomputed (cheap, controls in-pass):** the subset sweep (B, B₂) —
  **MATCH against attack-rhoms-01's embedded columns at all ten z** (B to
  6e-5, B₂/12 to rel 1.5e-3 of the 5-digit cited print); the closed-form
  pair sum at 13..23 (vs walker m₂, rel ≤ 2.5e-11); the full-period walker
  at 13..29 — sup MATCHES the cited column at all five levels, and the
  z = 29 moment ratios reproduce attack-rhoms S1 (2.918/14.00/93.5).
- **New measurements:** N, #E, Σe, Vabs decay bins (S1); exact Λ, Λ₁, Λ₃,
  Θ*-form, nonzero-mode counts (S3); moments m₁₀..m₁₆ at z = 13..29 (S5).
- **Cited (custody-bound):** rmsr at z = 31..47 (`theta-ladder.md` §2 via
  `rho-maxlaw-01-sufficiency.js`); sup at 13..29 (re-measured); B/B₂
  lineage back to `lemmaV-parseval.js` / `attack-beta2-01`; β₂ = 4.26645
  per `paper/beta2-note.md`.
- **Proven inputs checked at source:** Θ* ≤ Vabs (Theorem B triangle);
  the spectral identity (verified here two independent ways at z = 13:
  factorised-vs-direct worst rel 1.9e-14 over ALL modes, Parseval vs walker
  3.5e-13).
- **Estimator control:** OLS returns 3.700000 on a known z^3.7 truth before
  any fit is quoted. The L2 cosecant bound is verified over e = 2..30000
  (max ratio 0.6257, i.e. holds with ≥ 1.6× to spare); the mode-completeness
  identity Σ_{e|W}φ(e) = W at three W.

Units: ρ̃ and moments dimensionless; W, qmax, N in positions/counts;
strengths as exponents base z. WIDTH: W > 2^53 at z ≥ 31 — W appears as an
integer only at z ≤ 29; all W-dependence at z ≥ 31 runs off lnW = θ(z); N
and Σe stay below 2^53 at every level (max 3.5e10).

---

## 1. THE MODE-COUNT ARITHMETIC (the first concrete check), AND ITS VERDICT

sup|ρ̃| ≤ Σ_modes|ĉ| ≤ √N·rms with N the number of distinct reduced
frequencies a/e carrying a coefficient — the trig-polynomial "degree" bound
the task asked to work exactly. Producer S1/S2, exact at all ten z:

```
  z       #E        N            cover N/(W−1)    sqrtN·rms   proven sqrtN·sqrt(B2/12)   smax       verdict
 13       31      2.309e3          1.0000          5.03e1        2.13e2                  1.58e3      Y|Y
 19      127      5.105e5          1.0000          1.59e3        8.61e3                  5.65e3      Y|n
 23      243      2.649e6          0.2731          4.60e3        2.66e4                  1.10e4      Y|n
 29      467      2.089e7          0.0936          1.69e4        1.16e5                  2.76e4      Y|n
 31      827      8.207e7        lnN−lnW=−4.4      4.51e4        3.09e5                  3.37e4      n|n
 47     6119      1.115e10       lnN−lnW=−14.0     2.01e6        1.33e7                  1.58e5      n|n
```

The task's hope — "if #modes grows polynomially in z, √(#modes)·rms may
already beat the needed exponent" — fails on both halves. (i) At walkable
z ≤ 19 the count is not polynomial structure at all: qmax = P(z), every
divisor of W is a live conductor (coverage exactly 1), and √N·rms IS the
Chebyshev bound M1. (ii) Where the count detaches from W (z ≥ 23) it is
still in the transitional regime where each new prime doubles the divisor
population: d lnN/d lnz = 11.876 ± 0.328 (12.531 ± 0.465 on 29..47), so
√N·rms grows at z^{8.174 ± 0.249} — the √N factor alone delivers z^{5.94},
~4.7× the entire 1.26645 recovery budget even before rms. The eventual polynomial
ceiling (E ⊂ squarefree z-smooth integers ≤ qmax, so #E ≤ qmax ≤ z^{2s} and
N ≤ #E·qmax) caps the exponent at 2s + o(1) per factor — an all-z bound of
exponent ≥ 3 + s = 6 through this chain, nowhere near 4.26645. The 3,570 of
the brief is not a mode count: it is the Rosser support size of the z = 101,
D = z^{3.038} slice (`smoothness-front.md` §4.3, `redteam-0820-math.md`
§2.3); the true conductor counts #E are 31..6119 across the ladder and the
mode counts N are 2.3e3..1.1e10. **Verdict: the mode-count route is closed
as an asymptotic route by measurement and by its own ceiling; a REFUTED.md
row is proposed after the adversarial pass** (this file owns no shared-tree
edits).

## 2. THE ℓ¹ / COEFFICIENT-DECAY ROUTE

The classical maximal bound for a trig sum with coefficient decay is the ℓ¹
norm with the cosecant sum, and every link is proven (producer header
L2/L3): sup ≤ Λ ≤ Λ_V ≤ CH = ((ln qmax + 0.307)/2)√(#E·B₂). The decay law,
fitted first as asked: bin-rms Vabs(e) ~ e^{−0.723 ± 0.030} at z = 23,
e^{−0.772 ± 0.018} at z = 47 (a pure triangle-scale law would be e^{−1};
the shortfall is the mass spreading up the conductors).

```
  z    Λ (exact)   Λ/rms    a′=1 ℓ¹ share   Λ_V (proven)  trivial (n+M)/2   smax      Λ_V verdict
 13      9.801      9.37       0.471          1.560e2        4.260e2         1.58e3       Y
 17     25.157     15.92       0.355          5.524e2        1.118e3         4.17e3       Y
 19     60.031     26.98       0.315          1.245e3        2.382e3         5.65e3       Y
 23    121.250     42.92       0.269          2.462e3        4.818e3         1.10e4       Y
 29    261.555     70.93       0.247          5.535e3        1.035e4         2.76e4       Y
 31        —         —           —            1.041e4        1.793e4         3.37e4       Y
 47        —         —           —            1.498e5        1.470e5         1.58e5       Y
```

Readings of the table. **Λ_V clears the β₂ ceiling at every measured level
including z = 47** — the first proven recovery to survive 47 (R1 died there;
attack-rhoms §3). The clearing is finite-z only: d lnΛ_V/d lnz = 5.230 ±
0.186, and at 47 Λ_V has converged onto the trivial bound — the ℓ¹ gain
over trivial is 2.7× at z = 13 and gone by 47, because (L4, verified per z)
Σ_e e·Vabs(e) ≤ Σ_i σ(q_i)/q_i ≤ n·Π_{p<z}(1+1/p): the triangle over terms
inside Vabs is the trivial bound wearing spectral clothes.

The exact Λ is the honest frontier of the route: it keeps the cancellation
across terms WITHIN each mode (the phase sum in Θ_e(a)) and forfeits only
the cancellation across modes. Its measured growth, 4.214 ± 0.304 on five
points 13..29, brackets β₂ = 4.26645 — see §5. Its decomposition:
the a′ = 1 modes carry a falling share (0.471 → 0.247) of the ℓ¹ mass
against 92–94% of the ℓ² mass — the ℓ¹ tail up the frequencies (Σ 1/a′
diverging logarithmically where Σ 1/a′² converges) is exactly what
absolute-value accounting pays and the variance does not. The effective
mode count N_eff = (Λ/rms)² runs 8.77e1 → 5.03e3, a factor ~26 → ~4.2e3
below N — the decay buys three orders of magnitude of concentration — but
N_eff's slope ~5.2 still doubles the needed 2×1.26645 = 2.533.

## 3. THE (lnW)^A AND W^ε CHARTS

For sup ≤ C·rms·(lnW)^A: composed exponent 3 + A·lnθ(z)/lnz + o(1), win iff
A·lnθ/lnz < 1.26645 − o(1). Since lnθ/lnz → 1, **the family boundary is
A = 1.26645**; finite-z, with exact inputs, A_max(z) = ln(smax/rms)/lnθ(z)
= 3.575, 3.377, 3.044, 2.977, 3.018, 2.830, 2.735, 2.663, 2.563, 2.497 at
z = 13..47, and on the sieve chart 1.3492 (z = 47) → 1.2666 (z = 999983).
F4 is A = 1/2: a 5–7× margin in A units at every measured level, and even
A = 1 suffices everywhere. Borell–TIS-shaped conclusions (√(lnW)-loss) are
therefore far from necessary — **any polynomial-in-lnW loss of power below
1.26645 wins**.

For sup ≤ rms·W^ε: composed exponent 3 + ε·θ(z)/lnz → ∞ for every fixed
ε > 0. Death points (first prime z with ε·θ(z) > 1.26645·lnz): z* = 13, 19,
23, 41, 71, 151, 419 at ε = 1/2, 1/3, 1/4, 1/6, 1/10, 1/20, 1/50. The
admissible decay is ε*(z) = 1.26645·lnz/θ(z) (1.31e-1 at 47, 1.75e-5 at
1e6): **sub-polynomial-in-W is not enough; the boundary is exactly REC(ℓ):
loss z^ℓ, ℓ < 1.26645.**

## 4. THE MOMENT LADDER

sup ≤ (W·m_{2k})^{1/2k}. New measurement, moments to m₁₆ at z = 13..29 over
complete periods (walker verified against cited sup, closed-form m₂, and
attack-rhoms' z = 29 ratios):

```
  C_k/(2k−1)!!    k=2      k=3      k=4      k=5      k=6      k=7      k=8
  z=13           0.8362   0.5731   0.3316   0.1659   0.0731   0.0287   0.0101
  z=19           0.9643   0.8945   0.8121   0.7293   0.6431   0.5474   0.4426
  z=29           0.9727   0.9335   0.8903   0.8441   0.7912   0.7264   0.6471
```

Every ratio below Gaussian at every measured (z, k) — the sub-Gaussian
window extends from attack-rhoms' k ≤ 4 to k ≤ 8 — falling in k at fixed z
and drifting up in z (+0.22, +0.54, +0.79 per lnz at k = 2, 3, 4; the small
levels 13, 17 sit low, 19..29 sit near 1). Five points cannot call the
limit; what they support is stated in §5(iii). The chart: fixed k dies
(k_min = 1,1,1,1,2,2,2,2,2,3 along the ladder, reproducing attack-rhoms S4
from independent code); the k-optimised Gaussian-model ladder lands at
1.0047–1.0218 × rms√(2lnW) (synthetic control 1.0002, 1.0000 at θ = 1e3,
1e6): **the ladder's optimum IS F4 at constant 1** — "uniform sub-Gaussian
moments" and "the Gaussian maximal form" are the same hypothesis. The
needed order with Gaussian constants is k_gauss(z) = 4.3 → 40435.9 across
z = 47 → 1e6, i.e. → 0.56·z/lnz (the extra ½ln(2k/e) term costs ~0.5 of
exponent — attack-rhoms' 1.53 denominator, re-derived).

## 5. THE WEAKEST SUFFICIENT FORMS, PRECISELY

Ordered from cheapest hypothesis upward; each implies RML(α < β₂) and hence
G₂(z#) ≪ z^{α}ln²z through the pricing lemma (`rho-maximal-law.md` §2, with
its riders; the M ≍ 1/ln²z literature rider of `redteam-0821-exponent.md`
§1.4 carries over verbatim).

- **(i) MV(α), the mean-value form — NEW, the cheapest law-shaped object
  found: Λ(z) = Σ_{e,a}|Θ_e(a)|/(2 sin(πa/e)) ≤ C·z^α for some α < 4.26645.**
  No position sup anywhere: it is an ℓ¹ mean value of the mode amplitudes
  |Θ_e(a)| — the same family as Theorem A's and B₂'s mean values, the only
  grade of estimate this corpus has ever proven. Measured true-or-false
  status: **undecided by the window** — d lnΛ/d lnz = 4.214 ± 0.304 with
  β₂ inside the bar, the model extension (leaning low) at 5.649 ± 0.227,
  and the corpus-wide pattern that local slopes rise with z. What is
  measured true: Λ exact at five levels, sup ≤ Λ with 3.2–3.7× slack,
  Parseval closure to 1.2e-10. What would settle it: exact Λ at z = 31, 37
  (see NOT REACHED), or an analytic mean value on Σ_e Σ_a |Θ_e(a)|/a′.
- **(ii) REC(ℓ), the Gaussian-units form: sup ≤ C·rms·z^ℓ, ℓ < 1.26645.**
  F4 is ℓ = 1/2 + o(1) and is 2.5× stronger than needed; the measured truth
  is ℓ̂ = 0.891 ± 0.213 (first fit of sup/rms's own exponent — above F4's
  0.54–0.56 finite-z reading but far inside the budget). Equivalently
  (lnW)^A with A < 1.26645.
- **(iii) The moment form: m_{2k} ≤ C^k(2k−1)!!·m₂^k for k up to
  k(z) ~ 0.65·z/lnz** (any uniform C; with constants ignored 0.40·z/lnz).
  Measured true to k = 8 at every walkable level with C = 1. This form is
  F4 in disguise at its optimum (§4) — its value is that each finite rung
  is a mean value (a 2k-fold correlation sum), and the first unproven rung
  is still ⟨ρ̃⁴⟩ (attack-rhoms reading 5).

What this pass ruled out: the degree/mode-count bound (§1, measured and
ceiling-capped), every absolute-value route through Vabs (§2, L4:
structurally n·polylog), sub-polynomial-in-W losses as a target class (§3:
W^ε always dies — the target must be polynomial in z, not in W). Chaining
stays CLOSED (`REFUTED.md`), untouched.

## 6. READINGS

Producer readings 1–7 carry the *(grades in the script tail)*: 1 MEASURED
(mode-count verdict), 2 PROVEN finite-z + MEASURED growth (Λ_V clears all
ten, first to survive 47), 3 MEASURED new (exact Λ, β₂ through the error
bar; sup/rms = 0.891 ± 0.213), 4 MEASURED (decay law, ℓ¹ vs ℓ² mass split,
N_eff), 5 DERIVED + MEASURED (A/ε charts), 6 MEASURED new (C_k to k = 8;
ladder⇒F4 equivalence), 7 INFERRED (the weakest-form triple). All HELD for
one adversarial pass before anything moves to a live-layer surface.

## 7. NOT REACHED

- **Exact Λ at z = 31, 37** — the decisive points for MV(α)'s measured
  slope (the 13..29 bar straddles β₂). Cost at 31 is ~1e10 table ops under
  this file's method (the per-conductor cos/sin tables cap at maxE = qmax);
  a factored-table or FFT-over-divisor-lattice pass would reach it.
- **An analytic attempt on MV(α)** — the named object is the ℓ¹-with-weights
  mean value Σ_e Σ_{a′≤e/2}|Θ_e(a)|/a′; Theorem A's machinery bounds the
  ℓ² analogue; nothing here was attempted on the ℓ¹.
- **The primitive-restricted cosecant sum** (Σ over gcd(a,e)=1 only) —
  would sharpen Λ_V by ~φ(e)/e per conductor; the full-a bound was used.
- **The finite-z window past 47 for Λ_V** — its death point is just past 47
  by the fit; the exact crossing was not located (needs the sweep at the
  next few primes, cheap but out of scope tonight).
- **Whether s < 3 moves any chart** (inherited from attack-rhoms NOT
  REACHED; everything here is s = 3.0).

## 8. GATE

`node research/qc.js` after producer + this report: TOTAL 1 — the standing
census red (`xchan-at37-01-census.js`, mid-flight, pre-existing, does not
name this producer or this file). `qc/embed.js --check` on the producer:
code-sha256 matches, out-sha256 matches, body bit-honest (two runs,
identical out-sha — deterministic); advisory: 2 readings figures are prose
arithmetic over printed values (the known false-positive floor).

*History and superseded claims: `research/history/CHANGELOG.md`.*
