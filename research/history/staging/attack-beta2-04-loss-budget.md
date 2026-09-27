# Attack beta2-04: the loss budget

<!-- ledger
id: Q-beta2-loss-budget
status: ANSWERED
todo: none
question: Where in the chain from truth to beta2 = 4.26645 is the loss, and which discard point is worth attacking?
verdict: Aim at theta: it carries the largest derivative (-4.2665 per unit) and the only consumer in the literature, beta is worth at most 1.07 and has no consumer, DP2 and the o(1) are worth exactly zero, and the two live knobs together stop at 1.597, so the last factor of 1.6 down to truth is in neither of them.
-->

*2026-08-18. Attack 4 of 5 on the upper bound. Producer:
`research/attack-beta2-04-loss-budget.js` (10.3 s, ~250 MB, eight instruments,
pasted output and numbered readings in the script's own tail). Legend as in
`research/sift-limit-attack.md`: **[PROVEN]** published theorem with source;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical, finite
range; **[INFERRED]** deduction from sourced facts.*

**Assignment.** `paper/beta2-note.md` certifies G₂(x#) ≪ x^{β₂+ε} with
β₂ = 4.26645028414864191641. Truth sits near x^{1+o(1)}. The bound is loose by
about x^{3.27} and nobody had measured where that is lost.
`research/sift-limit-attack.md` §1 names five discard points DP1 through DP5
and prices none of them. This file prices them, at z small enough that the
truth is computable exactly, and ranks them by how much each moves the
exponent.

**Nothing here is a proof and nothing here beats 4.26645.** The deliverable is
a map with numbers on it.

---

## 1. The loss budget

The spine is one identity. The certified exponent is

> **E = β / θ**, β the sifting limit of the positivity method, θ the level
> exponent (level = H^θ).

DHR runs at β = 4.26645, θ = 1. Truth is E = 1 asymptotically, and
log_x(G₂) = 1.70, flat, everywhere in the exactly known range. Every line
below is a number the script computed.

| line | exponent | cumulative | basis |
|---|---|---|---|
| truth (asymptotic belief) | 1.0000 | 1.0000 | x·ln^a x; log_x G₂ = 1.70 flat at x ≤ 79 **[MEASURED]** |
| **DP1: the one-point / level-D floor** | **+2.1945** | **3.1945** | exact level-D linear program, calibrated on the proven β₁ = 2; bracket 2.67 to 3.63 **[MEASURED]** |
| **DP2+DP3: adversarial ω + truncation** | **+1.0719** | **4.2665** | residual: DHR's β₂ minus the measured floor **[INFERRED]** |
| DP2 alone: envelope validity | +0.0000 | 4.2665 | L\* = 2.19722 exact, κ_eff = 2.0465, V costs 2·lnln z/ln z → 0 **[VERIFIED]** |
| DP4 at θ = 1 | +0.0000 | 4.2665 | max\|r_d\|/ω(d) = 0.88 attained; level H^{1−ε} free **[VERIFIED]** |
| DP6: the o(1), unnamed in the discard map | +0.0000 | 4.2665 | zero in the exponent; **+2.80 at x = 79** **[VERIFIED]** |
| **residual** | **0.000000** | | zero by construction |

The residual is zero because the DP2+DP3 line is defined as what is left. The
honest uncertainty is entirely in the DP1 line, whose bracket is about ±0.4,
and it propagates one for one into DP2+DP3.

**The two big lines, said plainly.**

- **2.19 of the 3.27 is the one-point floor itself.** No sieve of any kind
  that reads only divisor-class counts gets under it, at any level. At least
  1.00 of it is the parity adversary, which the linear program contains
  explicitly (it is free to put all its mass on cells of one Ω-parity).
- **1.07 is what DHR pays on top of that floor.** That is the only piece a
  better positivity method could recover, and it is small. It mixes DHR's
  truncation with its quantification over every ω in Ω(κ,L), and this file
  cannot separate the two.

**This contradicts the standing map.** `research/sift-limit-attack.md` §1 calls
DP3 "where the dimension-2 price is actually paid" and calls DP1 "the master
discard; DP2 through DP4 are its refinements". Measured, the ordering is the
other way round: DP1 is two thirds of the entire loss and DP3's own truncation
is the small half. The recommendation for that file is in §6.

---

## 2. The elasticity ranking, which is the deliverable

At the working point (β, θ) = (4.26645, 1):

- ∂E/∂β = 1/θ = **1.0000** per unit of β
- ∂E/∂θ = −β/θ² = **−4.2665** per unit of θ
- ∂lnE/∂lnβ = **+1**, ∂lnE/∂lnθ = **−1**

**Per proportional improvement the two knobs are exactly equal.** A factor c in
either divides the certified exponent by exactly c. So elasticity alone does
not rank them; the ranking is headroom times availability.

| rank | knob | discard point | measured headroom | E at that limit | consumer in print |
|---|---|---|---|---|---|
| **1** | **θ, the level exponent** | **DP4** | 1 → 2 | **2.1332** | **vector sieve (Brüdern-Fouvry) + Lemma V** |
| 2 | β, the sifting limit | DP2+DP3 | 4.266 → 3.195 | 3.1945 | none |
| 3 | the one-point floor | DP1 | 3.195 → 1 | 1.0000 | none; this is the wall |
| 4 | L in Ω(κ,L); the o(1) | DP2, DP6 | none | 4.2665 | elasticity exactly 0 |

**θ ranks first on three counts and it is not close.** It carries the largest
raw derivative in the problem (−4.2665 per unit). Its headroom is measured, not
assumed: the signed remainder sum over the divisor lattice comes out D^γ with
γ = 0.27 to 0.49 across all nine rows checked over complete periods, which is
θ = 2.06 to 3.65, the smallest reading being 2.06. And it is the only knob with
a mechanism in the literature.

**The coupling nobody prices.** The two knobs are not independent. The one
mechanism that buys θ = 2 factors the two-class condition into two linear
sieves, so it pays for θ in β:

| | β | θ | E |
|---|---|---|---|
| DHR, dimension 2 | 4.26645 | 1 | 4.2665 |
| vector sieve, coupled | 5.29744 = 2(1+√e) | 1 | 5.2974 |
| vector sieve, decoupled | 5.29744 | 2 | **2.6487** |

The θ purchase costs 24.2 per cent of β. Net gain 1.6177. Any θ > 1.2417
already beats 4.26645, which reproduces §4.5 of the standing file.

**The ceiling of the whole programme.** Both measured knobs at their limits,
β = 3.195 and θ = 2, give **E = 1.597**. The measured truth exponent over the
same range is 1.70. Those two numbers agree to 6.2 per cent and come from
computations that share no code: one is a linear program over divisor-support
cells, the other is a full-period maximum gap. **[MEASURED]**

Exponent 1 needs c = 4.2665. The measured knobs together supply c = 2.67. So
even a perfect θ and a perfect one-point β do not reach truth: the last factor
1.6 is not in either knob, which is the sharpest statement this file can make
about why the parity wall is where it is.

---

## 3. The instruments, one per discard point

### 3.1 The truth ladder, and the 22-term cross-check

Exhaustive full-period maximum gap at both dimensions, x = 2 to 23.
**[VERIFIED]** All nine two-class values MATCH the ladder: 2, 6, 12, 30, 42,
66, 108, 150, 204 through the complete periods of 2# to 23#. The one-class
control reproduces A048670: 2, 4, 6, 10, 14, 22, 26, 34, 40. The κ = 1 control
matters because its sifting limit β₁ = 2 is **[PROVEN]** optimal (Selberg,
via Ford's notes §1.7.4), and it is what calibrates §3.5.

The three log-log regression slopes the brief quotes come out exactly:
**1.9190** (x ≤ 43), **1.8182** (x in [11,79]), **1.7249** (the new eight).

**But the pointwise exponent is flat, not falling.** log_x(G₂) reads 1.7017,
1.6961, 1.6491, 1.7042, 1.7362, 1.6972, 1.7086, 1.7045, 1.7048, 1.6856,
1.6991, 1.7023, 1.6991, 1.7091, 1.7037 at x = 19 through 79: no trend, mean
1.70. The falling regression slope is a window artifact, not a falling
exponent. The one-class control is flat at 1.18. **[MEASURED]** This matters
for the budget: at the accessible range the truth exponent is 1.70, not 1, and
the constant-free overshoot log_x(x^{β₂}/G₂) sits at 2.55 to 2.57 for every
x ≥ 19, not 3.27.

### 3.2 DP2, the density envelope: free, verified rather than assumed

The file predicted this discard is nearly free. It is, and here is the number.
**[VERIFIED]**

- The exact envelope constant, as a suffix maximum over all 283,146 primes
  below 4·10⁶: **κ = 1 gives L\* = 0.69315 at (z₁,z₂) = (2, 2+); κ = 2 gives
  L\* = 2.19722 at (3, 3+)**. Both sups are attained at the degenerate pair
  z₂ = z₁ + 0, i.e. the condition is worst at a single prime, and both are
  small absolute constants. Ω(2, 2.198) holds for our ω.
- Effective dimension κ_eff = ln(V(z₁)/V(z₂))/ln(ln z₂/ln z₁) on [2, 4·10⁶] is
  **2.0465** for our ω against **1.0682** for the one-class control.
  Convergence is O(1/ln z₁), so narrow high ranges wobble.
- V(z)·ln²z → 0.416215 = 2·C₂·e^{−2γ}, at 94.55 per cent of the limit by
  z = 80 and 99.92 per cent by z = 1000.
- **What V costs in the only currency that matters:** ln(1/V)/ln z is the
  number of powers of z the density factor eats. It reads 0.3993 at z = 10⁷ and
  0.0511 at z = 10¹⁰⁰, so it tends to 0 and DP2's exponent elasticity is
  exactly zero.

**One finite-z caveat the standing file does not make.** In the exactly known
range V(z) is worth about a full power of z, not a log factor: 1.1006 at
z = 11, 0.8872 at z = 80. Any finite-range argument that treats V as "a log"
is off by a factor x^{0.9}.

### 3.3 DP3 asymptotic: the delay-differential system, solved and validated

The Ankeny-Onishi σ_κ and the (F_κ, f_κ) system of Booker-Browning Theorem 3.1
(quoted in `research/dhr-verification.md` §1.1) integrated forward on a
10⁻⁵ grid. **[VERIFIED]**

- **Validation at κ = 1**, where the closed forms F₁ = 2e^γ/u on [1,3] and
  f₁ = 2e^γ·ln(u−1)/u on [2,4] must fall out of the same march: F matches to
  2.2·10⁻¹⁶, f to 2.5·10⁻⁵. Far field F₁(20) = 1.00000619, f₁(20) = 1.00000629.
- **At κ = 2** with the published (α₂, β₂): F₂(20) = f₂(20) = 0.99999949.
- **An independent recovery of β₂.** Shooting on β with α held at
  5.35772744559446184227 and requiring f₂(20) = 1 returns **β₂ = 4.26660**
  against Booker-Browning's 4.26645028414864191641, relative error 3.5·10⁻⁵.
  Perturbing β₂ by ±0.05 moves f₂(20) to 1.0200 and 0.9803, so the far field
  discriminates sharply. This is the first computation in the repository that
  produces β₂ rather than citing it.

**The retention curve, which is the DP3 price.** f_κ(u) is the fraction of the
true main term H·V(z) the certificate keeps at level z^u.

| u | f₂(u) | f₁(u) | | retention | u at κ=2 | u at κ=1 | ratio |
|---|---|---|---|---|---|---|---|
| 4.2665 | 0.000059 | 0.988671 | | f ≥ 10⁻⁶ | 4.2665 | 2.0000 | 2.1332 |
| 4.5 | 0.240280 | 0.993638 | | f ≥ 0.25 | 4.5110 | 2.1640 | 2.0845 |
| 5.0 | 0.578997 | 0.998249 | | f ≥ 0.50 | 4.8554 | 2.4007 | 2.0225 |
| 6.0 | 0.884369 | 0.999902 | | f ≥ 0.90 | 6.0971 | 3.3047 | 1.8450 |
| 8.0 | 0.997329 | 1.000006 | | f ≥ 0.99 | 7.3650 | 4.3174 | 1.7059 |

At the sifting limit itself the κ=2/κ=1 level ratio is exactly β₂/β₁ = 2.1332,
and it falls to 1.71 by the 99 per cent line. Practical reading for the other
attacks: **f₂ rises slowly.** Half retention needs u = 4.86, not 4.27, so an
argument that only asks for f₂ > 0 is working at an effective exponent above
the nominal one.

### 3.4 DP3 finite: worst-casing the strata is cheap, not knowing them is everything

Buchstab at depth one, exact: N(t) = H − Σ_i B_i(t), with B_i(t) the count of
window elements first killed by p_i. A sieve that keeps the strata but prices
each at its own worst case over window position certifies
N ≥ H − Σ_i max_t B_i(t). That threshold H₁ is exactly computable over a full
period. **[VERIFIED]**

| x | G₂ | H₁ | H₁/G₂ | log_x(H₁) | log_x(G₂) |
|---|---|---|---|---|---|
| 7 | 30 | 36 | 1.20 | 1.8416 | 1.7479 |
| 11 | 42 | 72 | 1.71 | 1.7835 | 1.5587 |
| 13 | 66 | 144 | 2.18 | 1.9376 | 1.6334 |
| 17 | 108 | 174 | 1.61 | 1.8209 | 1.6526 |
| 19 | 150 | 354 | 2.36 | 1.9933 | 1.7017 |

**Worst-casing every stratum independently, over every window position of the
whole period, costs a factor 1.2 to 2.4, an exponent penalty of about 0.25.**
It does not cost 2.5. So the dimension-2 price is not the worst-casing; it is
the truncation, that is, having to bound strata you cannot compute.

For scale, Brun's depth truncation, the crudest valid one: the minimum odd
Bonferroni depth with positive retention needs level exponent 4.31, 6.37, 6.70,
8.84, 10.94, 12.99 at x = 19, 43, 79, 200, 10³, 10⁴ at κ = 2, against 2.83,
2.95, 4.86, 4.96, 4.99, 7.00 at κ = 1. Unbounded, growing with lnln x. DHR's
bounded constant 4.26645 is already the large win over the naive truncation,
which is worth remembering before calling it wasteful.

### 3.5 The instrument that decides it: the exact level-D linear program

The sharpest question the discard map raises is what the best level-D minorant
can carry. At small z that is a finite linear program:

> minimise y_∅ subject to Σ_{S ⊇ T} y_S = g(T) for every T with ∏T ≤ D, and
> y ≥ 0, where g(T) = ∏_{p∈T} ω(p)/p and y_S is the density of elements whose
> prime support below z is exactly S.

By duality the optimum is the value of the best level-D weight vector, so
ρ\*(z,D) = (LP optimum)/V(z) is the exact finite-z analogue of f_κ(ln D/ln z),
computed for our ω rather than for the adversarial one DHR must survive. **It
is therefore an upper bound on what any repair of DP3 could deliver at that
level, and the parity adversary is inside it**: the program is free to put all
its mass on cells of one Ω-parity.

Two self-checks pin the solver and both PASS at all six x and both dimensions:
ρ\*(z, x#) = 1.00000000 exactly (all moments present, Möbius inversion is the
unique feasible point) and ρ\*(z, 1) = 0.00000000. **[VERIFIED]**

s\* is the smallest level exponent with ρ\* > 0; s50, s90, s99 are where it
reaches half, nine tenths and 99 per cent of the true density.

| x | s\*(κ=1) | s50 | s90 | s99 | s\*(κ=2) | s50 | s90 | s99 |
|---|---|---|---|---|---|---|---|---|
| 7 | 1.1833 | 1.3562 | 1.9208 | 2.7479 | 1.7479 | 1.9208 | 2.7479 | 2.7479 |
| 11 | 1.1006 | 1.2891 | 1.7472 | 2.5587 | 1.7472 | 2.2299 | 2.4184 | 3.2299 |
| 13 | 1.2051 | 1.3260 | 2.0558 | 2.8326 | 2.0847 | 2.2609 | 3.0196 | 4.0196 |
| 17 | 1.1500 | 1.3192 | 2.0468 | 2.8368 | 2.0468 | 2.2005 | 3.0468 | 3.7926 |
| 19 | 1.1976 | 1.4229 | 2.1174 | 2.9885 | 2.0262 | 2.5428 | 3.2562 | 3.9885 |
| 23 | 1.1601 | 1.3895 | 2.1197 | 2.9782 | 2.0238 | 2.5234 | 3.4092 | 4.2881 |

**The κ = 1 column is the calibration and it is the whole reason the κ = 2
column means anything.** Its asymptotic answer β₁ = 2 is proven optimal, so
whatever each statistic reads there is that statistic's bias. Rescaling each
κ = 2 statistic by the factor its κ = 1 twin needs to reproduce 2:

| x | via s\* | via s50 | via s90 | via s99 |
|---|---|---|---|---|
| 13 | 3.4597 | 3.4100 | 2.9376 | 2.8381 |
| 17 | 3.5598 | 3.3360 | 2.9771 | 2.6739 |
| 19 | 3.3837 | 3.5741 | 3.0758 | 2.6692 |
| 23 | 3.4889 | 3.6321 | 3.2166 | 2.8797 |

Pooled over x = 13 to 23, sixteen readings: **the one-point floor at dimension
two is 3.195, range 2.669 to 3.632**, against DHR's β₂ = 4.26645. Four
independent rescalings of the same program, and the spread is 0.96.
**[MEASURED]**

### 3.6 DP4: free per term, saturated, and the largest derivative in the problem

**Per term the trivial bound is essentially attained.** Over every window
position of the complete period of 19#, the largest value of
max_t|r_d(t)|/ω(d) among divisors d ≤ H is 0.8235, 0.8235, 0.8824, 0.8462 at
H = 150, 10³, 10⁴, 10⁵. **[VERIFIED]** No sharper absolute bound exists; the
level H^{1−ε} really is free and really is the most that absolute values give.
The file's "costs nothing" verdict holds as stated.

**But that is exactly what caps θ at 1, and θ is the denominator of the whole
exponent.** The identity Σ_{d|P(z)} μ(d)·r_d(t) = N(t) − H·V(z) says the signed
object is the count deviation itself, so what DP4 discards is measurable:

| x | H = D | Theorem 9.1 charge 2Σ4^ν\|r\| | Σ max\|r_d\| | max_t \|signed\| | γ = ln(signed)/ln D | θ = 1/γ |
|---|---|---|---|---|---|---|
| 13 | 66 | 711.6 | 16.72 | 5.45 | 0.4045 | 2.4719 |
| 13 | 1056 | 11490.6 | 65.82 | 6.73 | 0.2737 | 3.6530 |
| 17 | 108 | 1829.3 | 35.31 | 7.62 | 0.4337 | 2.3057 |
| 17 | 1728 | 25650.0 | 124.84 | 15.01 | 0.3634 | 2.7520 |
| 19 | 150 | 2532.6 | 46.45 | 11.39 | 0.4854 | 2.0600 |
| 19 | 600 | 12462.8 | 101.33 | 16.00 | 0.4335 | 2.3070 |
| 19 | 2400 | 41312.5 | 181.30 | 19.30 | 0.3803 | 2.6294 |

γ = 0.27 to 0.49, smallest implied θ = 2.06. Square-root cancellation, the
vector sieve's full-decoupling target, visible in the data over complete
periods. **[MEASURED]** Calling DP4 "free" hides ∂E/∂θ = −4.2665.

### 3.7 DP6: the sixth discard, and the only one that bites at computable scale

Theorem 9.1 carries O((lnln y)²/(ln y)^{1/(2κ+2)}), which at κ = 2 is
(lnln y)²/(ln y)^{1/6}. The discard map does not name it. It costs zero in the
exponent and **exceeds f₂ ≤ 1 at every computable z**: with the implied
constant set to 1, it first drops below 1 at ln z ≈ 1.6·10²⁰, peaking at 18.3
around ln z = 10⁶. **[VERIFIED]** No computation will ever witness this
theorem.

---

## 4. Cross-check: the certified threshold against the true G₂, all 22 levels

Two comparisons. The first is constant-free, the shape only. The second sets
the o(1) generously to zero and computes every remaining constant exactly,
including the remainder sum over the actual divisors of the primorial (not an
asymptotic y·log⁷y), optimising the level y for each z.

| x | G₂ | x^{β₂} | log_x(x^{β₂}/G₂) | u\* (optimal level) | H\* | log_x(H\*) | H\*/G₂ | overhead ln H\* − β₂ ln z |
|---|---|---|---|---|---|---|---|---|
| 19 | 150 | 2.856e+5 | 2.5647 | 5.128 | 1.077e+9 | 7.063 | 7.18e+6 | 8.02 |
| 23 | 204 | 6.453e+5 | 2.5703 | 4.889 | 4.755e+9 | 7.107 | 2.33e+7 | 8.72 |
| 43 | 618 | 9.314e+6 | 2.5578 | 4.552 | 4.589e+11 | 7.139 | 7.43e+8 | 10.71 |
| 53 | 870 | 2.273e+7 | 2.5617 | 4.517 | 1.760e+12 | 7.102 | 2.02e+9 | 11.18 |
| 67 | 1284 | 6.178e+7 | 2.5641 | 4.518 | 8.299e+12 | 7.075 | 6.46e+9 | 11.74 |
| 79 | 1710 | 1.248e+8 | 2.5627 | 4.490 | 2.592e+13 | 7.069 | 1.52e+10 | 12.19 |

(The full 22-row version is in the script's output. Rows for x ≤ 17 have
u\* ≈ 13.6, meaning the optimum takes every divisor: at those z the level
z^{β₂} is a large fraction of the primorial and the certificate degenerates to
Legendre.) **[VERIFIED]**

Three readings.

1. **The constant-free overshoot is x^{2.56}, not x^{3.27}**, and it is
   remarkably stable: 2.5647, 2.5703, 2.6174, 2.5622, 2.5303, 2.5693, 2.5578,
   2.5620, 2.5617, 2.5808, 2.5674, 2.5641, 2.5673, 2.5573, 2.5627 across
   x = 19 to 79. The difference from 3.27 is exactly the gap between truth's
   asymptotic exponent 1 and its measured exponent 1.70.
2. **With constants, the certified exponent is 7.07, not 4.27.** log_x(H\*)
   sits at 7.007 to 7.139 across x = 19 to 79 with no trend, and H\*/G₂ reaches
   1.5·10¹⁰ at x = 79. The overhead ln H\* − β₂·ln z grows steadily (8.02 at
   x = 19 to 12.19 at x = 79) and is the log⁹ term.
3. **The optimal level u\* settles just above β₂**, at 4.49 to 4.55 for
   x ≥ 37, which is the theorem behaving exactly as designed and is a
   consistency check on the whole apparatus.

---

## 5. Reach: what was computed and what was not

**Reached.**

- Exhaustive full-period maximum gap at both dimensions through **x = 23**
  (period 223,092,870), 0.7 s per dimension.
- The delay-differential system at both dimensions to u = 22, grid 10⁻⁵,
  validated against closed forms.
- Exact remainder maxima over **every window position of the complete periods
  of 13#, 17#, 19#**, for every divisor.
- Exact Buchstab stratum worst cases over complete periods through **x = 19**.
- The level-D linear program through **x = 23**, that is 512 support cells and
  up to 512 moment constraints, both self-checks passing.
- The certified-threshold table for **all 22 levels**, since it needs only
  divisor enumeration (2²² = 4,194,304 divisors at x = 79).

**Not reached, and it matters.**

- **The linear program past x = 23.** Its κ = 1 control converged by x = 13
  (s90 = 2.056, 2.047, 2.117, 2.120 at x = 13, 17, 19, 23) but its κ = 2
  columns s90 and s99 were still rising at x = 23 (2.42, 3.02, 3.05, 3.26,
  3.41). **The floor 3.195 therefore rests on the calibration, not on
  convergence.** Pushing to x = 43 needs 2¹⁴ cells and a sparse or
  column-generation solver; that is the single highest-value follow-up in this
  file and it would settle whether DP3 has 1.07 of recoverable slack or zero.
- **Exhaustive truth past x = 23.** x = 29 needs a 6.5·10⁹ segmented pass. The
  repository already carries x = 29 to 43 independently
  (`research/exact-g2-ladder.js`, `research/maxgap-law.md`), so this is a
  convenience gap, not an evidence gap.
- **Any statement uniform in window position at product level beyond H.** The
  γ ≈ 1/2 readings are at toy D over complete periods and are consistent with
  Lemma V but are not evidence for it; Lemma V quantifies over a regime none of
  this touches.
- **Separating DP2's adversarial quantification from DP3's truncation.** The
  linear program knows our exact ω; β₂ is a supremum over the whole Ω(κ,L)
  class. The 1.07 residual mixes the two and no instrument here splits it.

---

## 6. What this asks of `research/sift-limit-attack.md`

Findings only. No replacement text is supplied and nothing was edited outside
this file and the new script.

1. **§1's ordering of DP1 through DP5 is inverted relative to the
   measurement.** DP1 is described as "the master discard; DP2 through DP4 are
   its refinements", and DP3 as "where the dimension-2 price is actually paid".
   Measured, DP1 alone is 2.19 of the 3.27 and DP3 plus DP2's adversarial
   freedom is 1.07. Severity: high, because it points the next four attacks at
   the smaller half. Confidence: medium-high; the basis is a linear program
   with two passing self-checks at six levels and a calibration against a
   proven constant, limited by non-convergence at κ = 2.
2. **§1's DP4 verdict "for our interval problem this discard costs nothing" is
   true per term and misleading in aggregate.** Verified: the per-term bound is
   attained to 0.88. But θ = 1 is the denominator of the exponent and
   ∂E/∂θ = −4.2665 is the largest derivative in the problem. Suggested
   framing: DP4 is saturated, not free. Severity: high. Confidence: high, the
   arithmetic is an identity.
3. **§1 has no entry for the o(1).** It costs zero in the exponent and is
   larger than f₂ until ln z ≈ 1.6·10²⁰, which is why no finite computation can
   ever exhibit the theorem and why the honest finite-z certified exponent is
   7.07. Severity: medium, it is a calibration point rather than a route.
   Confidence: high.
4. **§2's open question "is 4.2665 information-theoretic?" now has its first
   number.** The exact one-point floor for our ω, calibrated against the proven
   β₁ = 2, reads 3.195 with range 2.669 to 3.632. That is below 4.26645 and
   above 2. Severity: medium. Confidence: medium, see the non-convergence
   caveat in §5.
5. **§3's two-economy framing gains a third fact.** β at its measured
   one-point floor divided by θ at its measured cancellation limit is 1.597,
   against the measured log_x(G₂) of 1.70. Two computations sharing no code
   land 6.2 per cent apart. Severity: low, it is corroboration rather than a
   correction. Confidence: medium.

---

## 7. One-line answer to the assignment

**Aim at θ.** It has the largest derivative (−4.2665 per unit), measured
headroom to 2.06 from square-root cancellation over complete periods, and the
only consumer in the literature. β is worth at most 1.07 and has no consumer.
DP2 and the o(1) are worth exactly zero. And the two live knobs together stop
at 1.597, so the last factor of 1.6 down to truth is in neither of them.

---

*Staging report. Producer `research/attack-beta2-04-loss-budget.js` carries the
full output and the numbered readings. Nothing in this file was applied to any
working document.*
