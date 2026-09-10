# The level-D LP pushed to x = 43, and the attack-3 / attack-4 adjudication

<!-- ledger
id: Q-lp-push-x43
status: ANSWERED
todo: none
question: Does the level-D LP's DP1 > DP3 inversion survive being pushed to x = 43?
verdict: Yes, and the correction strengthens it: the two statistics still climbing at x = 23 stop climbing, the pooled floor moves UP from 3.1945 (16 readings) to 3.3152 (33 readings), DP1 reads 2.32 of the 3.2665 against DP2+DP3's 0.95, and every one of the 33 pooled readings clears the (1 + beta_2)/2 = 2.6332 the inversion needs, the tightest at 2.6692.
-->

*(2026-08-18. Staging note. Targets: the "not reached" item at the top of
`research/history/staging/attack-beta2-04-loss-budget.md` §5, and the flagged
UNRESOLVED CONFLICT box in `research/sift-limit-attack.md` §7d. Producer:
`research/lp-push-x43.js` (`node research/lp-push-x43.js`, 1850 s, full output
and readings pasted into the script). Legend as in
`research/sift-limit-attack.md`: **[PROVEN]** published theorem with source;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical, finite
range; **[INFERRED]** deduction from sourced facts.)*

## 0. The two answers, first

**Does the DP1 > DP3 inversion survive? Yes, and the correction runs the way
that strengthens it.** The linear program now reaches x = 43. The two statistics
that were still climbing at x = 23, and that made the 3.195 floor a calibration
rather than a measurement, **stop climbing**: after the calibration is applied,
the reading via s90 sits in 3.1240 to 3.2166 across x = 23, 29, 31, 37, 41 and
the reading via s99 in 2.8345 to 2.8797 across x = 23, 29, 31, 37, against
spreads of 0.279 and 0.211 over the four levels before that. The pooled floor
moves **up**, from 3.1945 (x ≤ 23, 16 readings) to 3.3152 (x ≤ 43, 33 readings),
so DP1 is **2.32** of the 3.2665 against DP2+DP3's **0.95**. Every one of the 33
pooled readings, not only the mean, clears the (1 + β₂)/2 = 2.6332 the inversion
needs, the tightest being 2.6692 at x = 19 via s99. **[MEASURED]**

**Is the §7c / §7d conflict resolved? Yes, and the guess in the conflict box is
half right.** They measure different things, and the reason is not one shared
endpoint with different baselines. **Both endpoints differ.** §7c's 1.72 to 1.84
runs from a one-step envelope surrogate (3.8452 at p_k = 23, which is not β₂)
down to the exact-strata threshold (2.0260). §7d's 1.0719 runs from
β₂ = 4.26645 down to the calibrated one-point floor. The two bottoms are the
same object at two different scales: **the exact-strata threshold and the raw
level-D LP frontier agree to 0.1 per cent at x = 23, and |ratio − 1| falls
monotonically at all six levels where both exist**, from 0.223 at x = 7 to
0.001 at x = 23, crossing 1 on the way. Not split, not averaged. Both figures
stand, each with its endpoints attached. **[MEASURED]**

---

## 1. The solver, and why the old one stopped at x = 23

The program is the one `research/attack-beta2-04-loss-budget.js` §7 defines:

> minimise y_∅ subject to Σ_{S ⊇ T} y_S = g(T) for every T with ∏T ≤ D, and
> y ≥ 0, where g(T) = ∏_{p∈T} ω(p)/p and y_S is the density of elements whose
> prime support below z is exactly S. ρ\*(z,D) = (LP optimum)/V(z).

At x = 43 that is 2¹⁴ = 16,384 variables. A dense two-phase tableau is
m × (2¹⁴ + m) doubles, tens of gigabytes at the row counts this needs, which is
why the old run stopped at x = 23 and 512 cells. Three changes make the same
program fit.

**A crash basis with a closed-form inverse.** The constraint set
𝒯 = {T : ∏T ≤ D} is a downset, so the columns {S = T : T ∈ 𝒯} form a basis and
its inverse is the Möbius matrix μ(T,T') = (−1)^{|T'|−|T|}, written down rather
than computed. Phase 1 never starts from an artificial basis. Measured at
κ = 2, between 21 and 33 per cent of the crash rows come out negative and need
repair (21 of 63 at x = 19, 241 of 1159 at x = 31), and at κ = 1 it is 1 to
3 per cent. A textbook artificial start would have to repair all m.

**Zeta pricing.** The reduced cost of column S is c_S − Σ_{T ⊆ S} π_T. For all
2^π columns at once that is one subset-sum transform over the Boolean lattice,
O(2^π · π) per iteration instead of O(2^π · m). At x = 43 it is 229k operations
against 90 million.

**Devex weights**, updated from the pivot row, which is one more zeta transform.
Dantzig pricing alone runs about six times the iterations on this program
(10,165 against 1,565 at x = 31, D = 31^3.5), and the difference compounds
because each iteration costs O(m²).

Phase 1 is composite, minimising the sum of infeasibilities from the crash
basis, so no artificial variable is ever created. Measured degenerate pivot
count across the levels checked: **zero**, and perturbing the right-hand side by
10⁻⁷ or 10⁻⁵ does not reduce the iteration count. The iteration totals below are
not a degeneracy artefact. **[VERIFIED]**

**Every solve carries its own certificate**: the primal residual
max_T |Σ_{S⊇T} y_S − g(T)| over every moment constraint, rebuilt by a
superset-sum transform of the basic solution, and the primal-dual gap
|Σ_T π_T g(T) − y_∅|. Over the 166 solves printed with certificates at the five
new levels: worst primal residual 3.7·10⁻¹³, worst duality gap 1.4·10⁻¹³. Over
the 48-cell validation set of §1: 2.7·10⁻¹⁵ and 2.7·10⁻¹⁵. **[VERIFIED]**

**Validation against the dense solver.** The new solver reproduces all 48
published cells of `attack-beta2-04-loss-budget.md` §3.5 (six levels, both
dimensions, four statistics) to a worst disagreement of **4.9·10⁻⁵**, which is
the resolution of the level grid itself. The two share no code past the
definition of g. **[VERIFIED]**

**Cost, declared.** Squarefree products of distinct primes are distinct, so the
sorted list of the 2^π subset products is the list of admissible levels D, and
the index of D in that list is exactly the constraint count m. Row count is
index, so the cost of a solve is known before it is run. Iterations grow near
m², each costs about 3m², so a solve costs about m⁵. Measured at x = 43:
0.7 s at m = 281, 8.8 s at m = 672, 67 s at m = 1402, 103 s at m = 1901. The row
caps in the script come from that curve, and any statistic whose crossing lies
above its level's cap is reported NOT REACHED rather than extrapolated.

---

## 2. The push

s\* is the smallest level exponent at which ρ\* is positive at all; s50, s90 and
s99 are where it reaches half, nine tenths and 99 per cent of the true density.
The first six rows reproduce `attack-beta2-04-loss-budget.md` §3.5 and are the
solver's validation. The last five are new. **[VERIFIED]**

| x | s\*(κ=1) | s50 | s90 | s99 | s\*(κ=2) | s50 | s90 | s99 |
|---|---|---|---|---|---|---|---|---|
| 7 | 1.1833 | 1.3562 | 1.9208 | 2.7479 | 1.7479 | 1.9208 | 2.7479 | 2.7479 |
| 11 | 1.1006 | 1.2891 | 1.7472 | 2.5587 | 1.7472 | 2.2299 | 2.4184 | 3.2299 |
| 13 | 1.2051 | 1.3260 | 2.0558 | 2.8326 | 2.0847 | 2.2609 | 3.0196 | 4.0196 |
| 17 | 1.1500 | 1.3192 | 2.0468 | 2.8368 | 2.0468 | 2.2005 | 3.0468 | 3.7926 |
| 19 | 1.1976 | 1.4229 | 2.1174 | 2.9885 | 2.0262 | 2.5428 | 3.2562 | 3.9885 |
| 23 | 1.1601 | 1.3895 | 2.1197 | 2.9782 | 2.0238 | 2.5234 | 3.4092 | 4.2881 |
| **29** | 1.1100 | 1.3821 | 2.1031 | 2.9514 | **2.0942** | **2.4624** | **3.3253** | **4.1877** |
| **31** | 1.1824 | 1.4348 | 2.1939 | 3.0399 | **2.2554** | **2.5377** | **3.4269** | **4.3082** |
| **37** | 1.1603 | 1.4287 | 2.1766 | 3.0141 | **2.1911** | **2.5146** | **3.4002** | **4.3031** |
| **41** | 1.1590 | 1.4199 | 2.1942 | 3.0529 | **2.2328** | **2.5769** | **3.4964** | not reached |
| **43** | 1.1716 | 1.4364 | 2.2522 | 3.1190 | **2.3132** | **2.6911** | not reached | not reached |

**Reach, exactly.** The κ = 1 column is complete at every level, because its
crossings sit at low D. At κ = 2 the caps bite at the top two levels:

| x | row cap | level at the cap | ρ\* at the cap | consequence |
|---|---|---|---|---|
| 37 | 2601 | s = 4.5544 | 0.9939 | all four reached |
| 41 | 2101 | s = 3.6016 | 0.9151 | s99(41) > 3.6016 |
| 43 | 1901 | s = 3.2385 | 0.8107 | s90(43) > 3.2385, s99(43) > 3.2385 |

Those are honest lower bounds, not estimates: ρ\* is nondecreasing in D, and the
single solve at the cap is enough to place the crossing above it.

---

## 3. Convergence

The loss budget's flag was specifically that "kappa = 1 converged by x = 13 but
kappa = 2's s90 and s99 were still rising at x = 23". Extended, in raw terms:

| statistic | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 | rise 13→23 | per level after |
|---|---|---|---|---|---|---|---|---|---|---|
| **s90(κ=2)** | 3.0196 | 3.0468 | 3.2562 | 3.4092 | 3.3253 | 3.4269 | 3.4002 | 3.4964 | **+0.390** (+0.130/level) | **+0.022/level** |
| **s99(κ=2)** | 4.0196 | 3.7926 | 3.9885 | 4.2881 | 4.1877 | 4.3082 | 4.3031 | -- | **+0.269** (+0.090/level) | **+0.005/level** |

The per-level rate falls by a factor of 6 for s90 and 18 for s99, and both
series now oscillate rather than climb. **[MEASURED]**

**The sharper statement, because the raw column is not the quantity the floor
uses.** The κ = 1 control drifts upward too (s90 2.0558 → 2.2522, s99 2.8326 →
3.1190 across x = 13 to 43), and the floor is built from the ratio. In
calibrated terms:

| route | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 | 43 | spread 13-23 | spread 23-43 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| via s\* | 3.4597 | 3.5598 | 3.3837 | 3.4889 | 3.7734 | 3.8149 | 3.7769 | 3.8529 | 3.9487 | 0.176 | **0.460** |
| via s50 | 3.4100 | 3.3360 | 3.5741 | 3.6321 | 3.5632 | 3.5372 | 3.5200 | 3.6296 | 3.7470 | 0.296 | 0.227 |
| **via s90** | 2.9376 | 2.9771 | 3.0758 | 3.2166 | 3.1623 | 3.1240 | 3.1244 | 3.1869 | -- | 0.279 | **0.093** |
| **via s99** | 2.8381 | 2.6739 | 2.6692 | 2.8797 | 2.8378 | 2.8345 | 2.8554 | -- | -- | 0.211 | **0.045** |

**The two statistics that were unsafe are now the two settled ones, and the two
that were settled are now the ones drifting.** s90's calibrated reading has a
spread of 0.093 over five levels from x = 23, against 0.279 over the four before
it. s99's is 0.045 against 0.211. Meanwhile s\* has stepped up between x = 23
and x = 29 and keeps creeping, and s50 turns up at x = 41 and 43.

**Every drift observed is upward.** Nothing in the new data pulls the floor
down, at any route, at any level. That is the load-bearing fact for §4: the old
3.195 is a conservative reading of this instrument, not an optimistic one.

Least-squares slopes against ln x over the reached levels, for the record:
κ = 2 gives +0.207, +0.297, +0.402, +0.415 for s\*, s50, s90, s99; κ = 1 gives
−0.025, +0.087, +0.148, +0.202. The κ = 2 raw statistics do still have a
positive slope. The calibrated ratios in the table above are what removes most
of it, and what is left is not a trend at s90 and s99.

---

## 4. The calibrated floor, and the inversion

Each κ = 2 statistic is rescaled by the factor its κ = 1 twin needs to reproduce
the **[PROVEN]** β₁ = 2 (Selberg; the one-class sifting limit is optimal). Four
independent rescalings of the same program. The table is in §3 above.

**Pooled, on the same convention the loss budget used (x ≥ 13):**

- x = 13..23, 16 readings: **3.1945**, range 2.669 to 3.632. Reproduced exactly.
- x = 13..43, 33 readings: **3.3152**, range 2.669 to 3.949. **[MEASURED]**

**The like-for-like comparison, because the pooled means are not directly
comparable.** At x = 41 and 43 the expensive statistics are above the row cap,
so those levels contribute only their cheap rescalings, which run high.
Restricting to the seven levels where all four routes are reached removes that:

| route | pooled x = 13..23 | pooled x = 13..37 | change |
|---|---|---|---|
| via s\* | 3.4730 | 3.6082 | +0.135 |
| via s50 | 3.4881 | 3.5104 | +0.022 |
| via s90 | 3.0518 | 3.0883 | +0.037 |
| via s99 | 2.7652 | 2.7984 | +0.033 |
| **all four** | **3.1945** | **3.2513** | **+0.057** |

Every route moves up, and the like-for-like floor is **3.2513**. The 33-reading
figure 3.3152 is the same thing with the two capped levels' cheap routes added,
which is why it is higher.

**The budget, recomputed.** E = β/θ, DHR at β = 4.26645 and θ = 1, truth E = 1.

| line | exponent | cumulative |
|---|---|---|
| truth | 1.0000 | 1.0000 |
| DP1, one-point floor as published (x ≤ 23) | +2.1945 | 3.1945 |
| DP2+DP3 | +1.0719 | 4.26645 |
| DP1, one-point floor like-for-like (x ≤ 37) | **+2.2513** | **3.2513** |
| DP2+DP3 | **+1.0151** | 4.26645 |
| DP1, one-point floor all readings (x ≤ 43) | **+2.3152** | **3.3152** |
| DP2+DP3 | **+0.9513** | 4.26645 |

**The inversion needs the floor above (1 + β₂)/2 = 2.6332.** It clears that by
0.62 to 0.68 on the pooled mean, and it clears it on **every single one of the
33 individual rescalings**, the lowest being 2.6692 at x = 19 via s99, margin
0.036. The 17 new readings contribute nothing below 2.8345, so the tightest
reading in the whole set is still the old one and the new data only pulls the
distribution up. **[MEASURED]**

Two consequences worth carrying. β's headroom shrinks from 4.266 → 3.195 to
4.266 → 3.315. And the programme ceiling β_floor/θ_max moves from 3.195/2 =
1.597 to 3.3152/2 = **1.6576**, against the measured log_x(G₂) of 1.7037, which
tightens that agreement from 6.2 per cent to **2.7 per cent**.

---

## 5. The adjudication

### 5.1 What each attack actually measured

Everything below is in one unit: log_x of the interval length H that the
construction certifies, at θ = 1 so that level = H and log_x(H\*) is the β of
E = β/θ. Both attacks already used that unit. What they did not share is the
pair of endpoints the difference was taken between.

| label | quantity | value at x = 23 | source |
|---|---|---|---|
| A | truth, log_x G₂ | 1.6961 | `research/exact-g2-ladder.js` |
| L | raw level-D LP frontier s\*(κ=2), uncalibrated | 2.0238 | this script §2 |
| B | exact strata, u\* stable | 2.0260 | `attack-beta2-03-exact-strata.md` §3 |
| L′ | the same LP frontier after the β₁ = 2 calibration | 3.4889 | this script §5 |
| C | envelope surrogate, strata at main_i·F₂(u_i) | 3.8452 | `attack-beta2-03-exact-strata.md` §4b |
| D | DHR β₂ | 4.26645 | `research/dhr-verification.md` §1.1 |

- **§7c's 1.72 to 1.84 is C − B.** Two pricings of the same depth-one Buchstab
  bound at the same finite z. Its top is a one-step decoupled surrogate, which
  that attack's own §4b already says must not be quoted as "what DHR gives". Its
  bottom uses exact full-period stratum maxima. The figure is also specific to
  the cut j = 0. The same swap at j = k−1, in the same table, is worth 0.6942 to
  1.0529, so "the price of exact stratum pricing" is not one number even inside
  the file that produced it.
- **§7d's 1.0719 is D − L′.** DHR's asymptotic sifting limit minus the one-point
  floor, on the asymptotic scale the β₁ = 2 calibration puts the LP on.
- **§7d's "about 0.25" is B − A.** Measured here as 0.3011 at x = 19 and 0.3299
  at x = 23, against the 0.2916 that attack 4 §3.4 read off its own H₁ table.
  Same segment, and it is disjoint from both of the others.

### 5.2 The measurement that decides it

Attack 3's lower endpoint and the raw level-D LP frontier are the same number.
**[MEASURED]**

| x | B, exact strata | L, raw LP frontier | B − L | B / L | \|B/L − 1\| |
|---|---|---|---|---|---|
| 7 | 2.1372 | 1.7479 | +0.3893 | 1.2227 | 0.2227 |
| 11 | 1.9448 | 1.7472 | +0.1976 | 1.1131 | 0.1131 |
| 13 | 1.9638 | 2.0847 | −0.1209 | 0.9420 | 0.0580 |
| 17 | 1.9812 | 2.0468 | −0.0656 | 0.9679 | 0.0321 |
| 19 | 2.0028 | 2.0262 | −0.0234 | 0.9884 | 0.0116 |
| 23 | 2.0260 | 2.0238 | +0.0022 | 1.0011 | 0.0011 |

Two computations with nothing in common. One is a linear program over
divisor-support cells that never looks at an interval. The other is a
full-period maximum of Buchstab stratum counts over every window position of
23#. The last column falls at every one of the six levels, roughly halving to
x = 17 and then faster, and the ratio crosses 1 between x = 11 and x = 13, so
the two are not converging from one side by construction. At x = 23 they agree
to 0.1 per cent.

So attack 3's difference is not measured down to the truth, and it is not
measured down through the one-point floor. **It is measured down to the
one-point frontier itself, from a top that is not β₂.** Attack 4's difference is
measured from β₂ down to that same frontier, after the calibration has moved the
frontier onto the asymptotic scale. Two differences, two different tops, one
shared bottom expressed at two different scales.

### 5.3 One axis, at x = 23

Finite-z axis, every quantity measured at x = 23 itself:

| from | to | segment | what it is |
|---|---|---|---|
| 1.6961 | 2.0238 | **+0.3277** | independent stratum maxima; attack 4 §3.4's "about 0.25" |
| 2.0238 | 2.0260 | +0.0022 | exact strata against the raw LP frontier: they coincide |
| 2.0260 | 3.8452 | **+1.8192** | envelope pricing of the strata; attack 3's 1.72 to 1.84 |
| 3.8452 | 4.26645 | +0.4213 | one-step surrogate up to DHR's real truncation |

Asymptotic axis, which is the budget's axis:

| from | to | segment | what it is |
|---|---|---|---|
| 1 | 3.4889 | **+2.4889** | DP1, the one-point floor at x = 23 via s\* after calibration |
| 3.4889 | 4.26645 | **+0.7775** | DP2+DP3, the residual |

The two axes share only their top. The finite-z axis starts at the measured
truth 1.6961, the asymptotic axis starts at 1. The 1.8192 segment and the 0.7775
segment do not overlap, are not nested, and do not sum to anything.

### 5.4 The verdict, and what each figure licenses

**They measure different things and both stand. Neither figure is wrong and the
difference is not split.**

- **1.72 to 1.84** licenses this and no more: at accessible z, pricing
  depth-one Buchstab strata at their exact full-period maxima instead of at
  main_i·F₂(u_i) moves that specific bound, at that specific cut, by 1.72 to
  1.84. It does **not** license "DP3 holds 1.8 of recoverable exponent inside
  DHR". Its floor is the one-point frontier, which nothing reading only
  divisor-class densities gets under, and its ceiling is a one-step surrogate
  rather than β₂.
- **1.0719** licenses this: on the asymptotic scale, everything DHR gives up
  beyond the one-point floor is at most 1.07, now 0.95 to 1.02 on the extended
  data. It carries the calibration's uncertainty and says nothing about
  finite z.
- **About 0.25** licenses this: pricing every stratum at its own worst case over
  window position rather than jointly costs 0.30 to 0.33 at accessible z. That
  is the segment from truth up to exact strata.

The suspicion recorded in the conflict box, that the two used different
baselines, is **half right**. §7c does swap pricing inside a bound and §7d does
measure against true G₂, but that is not where the incompatibility came from.
Both endpoints differ, not one: the tops are 3.8452 and 4.26645, the bottoms are
2.0260 and 3.4889, and the bottoms are the same object at two different scales.

---

## 6. What was not reached

**s90 and s99 at x = 43, and s99 at x = 41.** The row caps are the reason and
the numbers are in §2. What it would take, from the measured cost curve:
s90(43) has its crossing near m ≈ 2800 by extrapolating the x = 41 curve, which
is about 7 minutes a solve and about ten solves for the bisection, so roughly an
hour. s99(43) sits near m ≈ 6000, which is about ninety minutes a solve and
around thirteen solves, so about a day of compute on this machine. Neither is
out of reach, both were out of this budget. The cost is m⁵ and nothing in the
solver changes that; getting to x = 47 and beyond needs a different algorithm,
not a faster one.

**The identification of the two endpoints rests on six levels.** Column B needs
a full-period maximum of stratum counts, which stops at 23# = 223,092,870;
29# is 6.5·10⁹ and out of reach for the same instrument. So B against L is
checkable at x = 7 through 23 and nowhere else. The deviation falls monotonically
across all six and crosses zero, which is why §5.2 states it, but it is a
measured coincidence with a trend, not a theorem. **Nothing here proves that the
raw LP frontier is a lower bound for the exact-strata threshold.** A proof would
need the exact-strata bound to be expressible as a level-D one-point minorant,
and it is not obviously one: it consumes interval statistics that the LP's
information class does not contain.

**The calibration is still a calibration.** Every asymptotic-scale number in §4
and §5 is a finite-z reading multiplied by whatever factor the κ = 1 column
needs to reproduce the proven β₁ = 2. That step is not licensed by a theorem at
either dimension, and the spread across the four rescalings, 0.62 to 0.98 at
the seven levels where all four are reached, is the honest error bar on it.

**Two of the four routes have not settled.** s\* and s50 are still drifting up
at x = 41 and 43. Their calibrated spread over x = 23..43 is 0.460 and 0.227,
against 0.093 and 0.045 for s90 and s99. So the floor is not converged; what is
established is that the two routes flagged as unsafe are now the stable ones,
and that all remaining drift is upward.

**The residual still mixes two things.** The LP knows this problem's exact ω.
β₂ is a supremum over the whole Ω(κ,L) class, so DP2's adversarial
quantification and DP3's truncation remain inseparable by any instrument here.
That limit of `attack-beta2-04-loss-budget.md` §5 is untouched.

---

## 7. Corrections to the record

Findings only. Nothing outside `research/lp-push-x43.js` and this file was
edited.

1. **`research/sift-limit-attack.md` §7d, the ⚠ UNRESOLVED CONFLICT box.**
   Resolved, and the guess inside it is only half right. Suggested replacement:
   *"§7c's 1.72 to 1.84 and §7d's 1.0719 are two different segments of two
   different axes. Both endpoints differ, not one: §7c runs from a one-step
   envelope surrogate (3.8452 at p_k = 23) down to the exact-strata threshold
   (2.0260), and §7d runs from β₂ = 4.26645 down to the calibrated one-point
   floor. The two bottoms are the same object at two scales, because the
   exact-strata threshold and the raw level-D LP frontier agree to 0.1 per cent
   at x = 23 and their deviation falls monotonically from x = 7
   (`research/lp-push-x43.js` §5). Quote either figure only with its endpoints
   attached. Neither licenses 'DP3 holds recoverable exponent inside DHR'."*
   Severity: high, because the box currently blocks both numbers from use.
   Confidence: high on the arithmetic, medium on the identification of the two
   bottoms, which is six measured levels with a monotone trend and no proof.
2. **`research/sift-limit-attack.md` §7d, the "Reach" paragraph.** Its
   follow-up ("Pushing the LP to `x = 43` (2¹⁴ cells, sparse solver) would
   settle whether DP3's 1.07 is real") is done. Result: the LP reaches x = 43,
   s90 and s99 settle in calibrated terms, the floor rises to 3.2513
   like-for-like and 3.3152 over all readings, and DP2+DP3 falls from 1.0719 to
   0.95 to 1.02. The sentence "the 3.195 rests on calibration rather than
   convergence" should become "the 3.195 is a conservative reading: extended to
   x = 43 the floor rises to 3.32 and every drift observed is upward". Severity:
   high. Confidence: high.
3. **`research/sift-limit-attack.md` §7c**, "That is the largest single
   elasticity measured anywhere in this pipeline". True as arithmetic and
   misleading without its endpoints, for the reason in §5.4. Suggested framing:
   the segment is large because it runs from a surrogate top down to a frontier
   no sieve axiom reaches, so it is not a recoverable elasticity. It is also
   cut-dependent: 0.69 to 1.05 at j = k−1 in the same table.
4. **`research/sift-limit-attack.md` §7d's derived numbers.** With the floor at
   3.3152: β's headroom becomes 4.266 → 3.315, the ranking line "β, i.e.
   DP2+DP3. Headroom only 4.266 → 3.195" and the DP1 line "3.195 → 1" both move,
   and the consistency check β_floor/θ_max = 3.195/2 = 1.597 against 1.70
   becomes 3.3152/2 = 1.658 against 1.70, agreeing to 2.5 per cent rather than
   6.2. Severity: medium, the numbers move by less than their own error bar.
   Confidence: high.
5. **`TODO.md` lines 52-53** carry the same 3.195 in the elasticity ranking
   table and need the same edit as item 4.
6. **`research/history/staging/attack-beta2-04-loss-budget.md`**, §3.5's closing
   caveat, §5's first "Not reached" bullet, §6 item 4's "medium, see the
   non-convergence caveat", and readings 1 and 8(a) in the producer script's
   tail. All say the LP stops at x = 23 and that s90 and s99 were still rising
   there. All four should point at this file. Note that reading 1's headline
   claim, that DP1 is two thirds of the loss, gets **stronger**: 2.32 of 3.27 is
   71 per cent, not 67.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in
[../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
