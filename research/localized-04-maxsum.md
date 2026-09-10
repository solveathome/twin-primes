# The growth law of maxsum_m, and why the localized chain cannot close

<!-- ledger
id: Q-maxsum-growth-law
status: CLOSED
todo: none
question: What is the growth law of maxsum_m, and is there a constant C that closes the localized chain?
verdict: The chain has no chance, and for a reason cheaper than the sieve wall: the gate grows like ln x per fold while the bound it must stay under grows by at least 2.4 ln^2 x, a deficit that is unconditional in C and in the sifting parameter, and the Deficit Lemma kills the weaken-the-gate repair because the gate feeds back.
-->

*(2026-08-17. Engine `research/localized-04-maxsum.js`. Calibration marked
throughout: PROVEN, VERIFIED by exact computation, MEASURED, FIT, REFUTED.
Read `research/LOCALIZED-GAP.md` first; this file supplies the growth law behind
its §5 and §6 and the arithmetic behind its §4.)*

## 0. PREDICTION ON RECORD

Written into the script header before the first run, quoted here unchanged.

> **Chris.** "The chain needs maxsum_m <= C·m·mbar for m up to about x/ln²x.
> Read as an interval statement that says every interval of length about x/4
> inside [0,Y) contains at least about x/(9.6 ln²x) twin slots of T_x. Interval
> length ~x against sift level x puts this at sifting parameter u = 1, below the
> linear sieve limit β₁ = 2 and far below the two-class limit β₂ = 4.2665. So I
> predict it fails, or at minimum that the ratio maxsum_m/(m·mbar) drifts upward
> with m rather than settling."

> **Mine.** "maxsum_m is a MAX over roughly Y/mbar windows, so it should
> CONCENTRATE as m grows and R(m) should fall toward 1, not rise. If so the
> binding constraint is R(1) and the whole question is how R(1) grows with x."

**Verdict, both.** The chain fails. Chris is right about the verdict and wrong
about the mechanism: R(m) does not drift upward, it falls, cleanly and
predictably, and the failure is not at the sieve wall at all. My concentration
reading is right about the shape and wrong about which end matters: neither end
matters, because the chain dies on the *trivial lower bound* maxsum_m ≥ m·mbar,
before any question about C is reached.

## 1. The answer, in four lines

1. **The growth law is a square root, not a constant.** MEASURED and matched by
   an unfitted extreme-value model to within 12% over m ∈ [2 lnD, 1024]:
   `maxsum_m = m·m̄ + σ·√(2 m lnD)`, that is
   `R(m) = 1 + (σ/m̄)·√(2 lnD/m)` with σ/m̄ ≈ 0.89 to 0.95 and D = #slots below Y.
   R(m) → 1 from above. It never plateaus at a constant C > 1.
2. **So sup_m R(m) = R(1), and R(1) ≈ lnD**, not a constant, and it depends on
   the *window* and not on the level: R(1)/lnD measured **0.736 to 1.170**
   across Y = 10⁷, 10⁸, 10⁹ and x from 89 to 16001, a factor 180 in x.
3. **None of that is what kills the chain.** The chain dies on the *lower*
   bound. maxsum_m ≥ m·m̄ is a one-line averaging fact, and it alone caps the
   telescope at about x/(9.6 ln²x) folds, for *any* C, even C = 1.
4. **Price of the hole:** LOCALIZED-GAP.md §4 costs the route at π(x) ≈ x/ln x
   folds. The cap above supplies x/(9.6 ln²x). Short by a factor **9.6 ln x**,
   which is 93 at x = 16001. Measured chain survival at the largest x reachable:
   **1 fold against the 1863 that π(16001) needs.**

## 2. Custody

`localized-04-maxsum.js` reproduces `localized-01-ladder.js` digit for digit at
the top of its k = 3 ladder, by a completely different engine (bitset,
word-parallel twin-slot extraction, no per-integer scan).

| quantity | localized-01 | localized-04 |
|---|---|---|
| x = 307, Y = 307³ = 28,934,443 | | |
| M(x, Y) | 870 | **870** |
| m̄ | 79.3 | **79.33** |
| M/x² | 0.00923 | **9.231e-3** |
| M/m̄ | 10.97 | **10.967** |

## 3. MEASURED: the growth law of maxsum_m

`node research/localized-04-maxsum.js 1e9 997,16001 1024 16000`, x = 997 at
k = 3.00. m̄ = 113.96 (against 2.4 ln²x = 114.42, ratio 0.996). D = 8,775,234.

| m | maxsum_m | R(m) | EV model | R/EV |
|---|---|---|---|---|
| 1 | 2052 | 18.007 | 6.042 | 2.980 |
| 2 | 2220 | 9.741 | 4.565 | 2.134 |
| 4 | 2688 | 5.897 | 3.521 | 1.675 |
| 8 | 3072 | 3.370 | 2.783 | 1.211 |
| 16 | 4242 | 2.327 | 2.261 | 1.029 |
| 32 | 6888 | 1.889 | 1.891 | **0.999** |
| 64 | 11880 | 1.629 | 1.630 | **0.999** |
| 128 | 21504 | 1.474 | 1.446 | 1.020 |
| 256 | 39480 | 1.353 | 1.315 | 1.029 |
| 1024 | (not printed) | 1.2841 | 1.158 (derived) | 1.110 |

The "EV model" column is **not a fit**. It is
`R(m) = 1 + (σ/m̄)·√(2 lnD/m)`, the classical maximum of D overlapping m-sums of
gaps with the measured mean and standard deviation, with nothing tuned. Over
m ≥ 2 lnD it holds to `R/EV ∈ [0.981, 1.110]` at x = 997, `[1.038, 1.119]` at
x = 3499, `[0.990, 1.064]` at x = 16001.

**Where it stops looking like a constant: nowhere, because it never starts.**
R(m) falls from ≈ 15 to ≈ 1.2 across m = 1 to 1024 and is still falling. There
is no turnover and no plateau.

**Two regimes, crossing at m ≈ 2 lnD ≈ 32 (MEASURED).**

- m ≲ 2 lnD: **a single tail event.** At x = 997 the argmax window for every
  m from 1 to 10 sits in the same neighbourhood, slots 397,900,889 to
  397,901,849. One sparse patch owns the whole small-m curve. R(1) ≈ lnD is the
  exponential-tail extreme-value law, and R/EV ≈ 3 there because the Gaussian
  model is the wrong model at m = 1.
- m ≳ 2 lnD: **bulk concentration.** The argmax migrates (184,968,731 then
  489,992,357 then 341,018,369 then 681,396,071 …), R/EV settles inside 12% of
  1, and the excess over the mean is the √m Gaussian fluctuation.

So the honest answer to "slow drift, clean turnover, or tail event" is: a tail
event below m ≈ 2 lnD and a √m drift above it, joined smoothly.

## 4. MEASURED: R(1) is a property of the window, not of the level

R(1) = M(x,Y)/m̄. Across three windows and a factor 180 in x it tracks lnD.

| Y | x range | R(1) range | lnD | R(1)/lnD |
|---|---|---|---|---|
| 10⁷ | 89 to 2153 (24 x) | 9.00 to 11.92 | 11.1 to 11.9 | **0.756 to 1.053** |
| 10⁸ | 283 to 6803 (24 x) | 10.22 to 13.75 | 13.2 to 14.0 | **0.736 to 1.038** |
| 10⁹ | 661 to 16001 (24 x) | 12.61 to 18.65 | 15.2 to 16.1 | **0.783 to 1.170** |

Three decades of Y, a factor 24 in x inside each, and R(1)/lnD stays inside
[0.74, 1.17] with no trend in x.

R(1)/ln x, by contrast, falls monotonically 2.6 → 1.45 across the Y = 10⁹ scan,
so "R(1) grows like ln x" is the wrong reading. The right one is
**M(x, Y) ≈ m̄ · ln(Y/m̄)**, the Poisson-style maximal gap, with m̄ ≈ 2.4 ln²x.
That is the same statement as LOCALIZED-GAP.md §5's `M/(k ln³x)` flat in 1.2 to
1.6, written so the k dependence sits where it belongs, in the window and not
in the level. Keep that band's scope with it: it is measured on the k = 3 ladder
to x = 307, and `research/localized-single-alignment.md` §5 carries the same
object to x = 1613, where the crude band fails and the m̄·ln(Y/m̄) form holds.
M/ln³x reads 4.63 at x = 307, climbs to 6.41 at x = 739 and falls back to 5.51 at
x = 1613, so the breach is one excursion and not a trend, which is that file's
own reading. Since ln(Y/m̄) = lnY − ln m̄, the level enters M only through the
m̄ prefactor and a second-order log correction: at x = 997 and Y = 10⁹,
m̄·lnD = 113.96 × 15.99 = 1822 against the measured 2052.

**The constant travels with its coordinates, because it is a surface.**
`research/maxgap-law.md` §4 establishes that the c in `maxgap ≈ c·m̄·lnD` is a
surface c(x, lnD): at fixed x it falls as lnD grows, measured 1.083 → 0.446
inside the single tile x = 29, and at fixed lnD it rises with x, measured 0.577
at x = 23 to 0.989 at x = 6421. Every number in this section sits **off the
diagonal**, at

| coordinate | this section |
|---|---|
| level x | 89 to 16001 |
| lnD | 11.0 to 16.1 |
| position lnD/θ(x) | 5·10⁻³ to 0.15 |
| c = R(1)/lnD | 0.736 to 1.170 |

and the same twin-slot object read on the whole tile, where lnD/θ(x) → 1, gives
c = 0.446 to 0.594. **The 0.74 to 1.17 above is not transferable to the full
tile, and the tile's 0.46 is not transferable here.** The two files agree; they
sit on different curves through one surface.

## 5. The C that would be needed, against the C observed

C_obs is sup R(m) over the chain's own range m ≤ x/ln²x, which by §3 is always
attained at m = 1. C_gate is the largest C the Localized Merge Lemma's
hypothesis tolerates at m = 1, namely (p−2)/(4 m̄). Y = 10⁹ throughout.

| x | k | m̄ | M | C_obs = R(1) | C_gate | gate | folds the chain survives |
|---|---|---|---|---|---|---|---|
| 61 | 5.04 | 43.6 | 468 | 10.73 | 0.4 | off | 0 |
| 251 | 3.75 | 75.2 | 990 | 13.16 | 0.8 | off | 0 |
| 997 | 3.00 | 114.0 | 2052 | 18.01 | 2.2 | off | 0 |
| 3499 | 2.54 | 163.4 | 2430 | 14.87 | 5.4 | off | 0 |
| 8017 | 2.31 | 212.0 | 2832 | 13.36 | 9.5 | off | 0 |
| 12143 | 2.20 | 241.1 | 3474 | 14.41 | 12.6 | off | 0 |
| **13933** | 2.17 | 251.5 | 3474 | 13.81 | **13.9** | **ON** | **1** |
| 16001 | 2.14 | 261.4 | 3804 | 14.55 | 15.3 | ON | **1** |

**The gate turns on at x = 13933 in the window Y = 10⁹ (k = 2.17), VERIFIED.**
C_obs is flat in x at about lnD while C_gate = (p−2)/(4m̄) = x/(9.6 ln²x) is
linear, so the crossing solves

  x* = 9.6 · ln²x* · ln(Y/m̄).

At Y = 10⁹ that gives **x* = 13,630 against the measured 13,933, 2% out.** At
k = 3 (Y = x³) the same equation gives **x* ≈ 2.4×10⁴, that is Y = x*³ ≈
1.4×10¹³, out of reach of this engine by four decades.** So at k = 3 the lemma's
own hypothesis cannot be checked directly at any x where it holds, and the
k = 2.17 verification above is the closest approach available.

## 6. Two conditions, four times apart, and only one of them is usable

The Localized Merge Lemma has a **hypothesis-side** condition and a
**conclusion-side** condition, and they turn on at levels a decade apart. Keeping
them separate is the whole of this section.

| | statement | evaluated at | first satisfied |
|---|---|---|---|
| hypothesis | M(T_x, Y) ≤ (p−2)/4 | the **old** level | x = 13933 (Y = 10⁹, k = 2.17), VERIFIED |
| conclusion | M(T_p, Y) < p−2 | the **new** level | x = 1453 (k = 2), VERIFIED |

`localized-03-merge-lemma.js` line 74 tests `M_new < p - 2`, which is the second
row. The first row is four times stronger and is the one a chain has to supply in
advance. By §5's equation the hypothesis turns on at x* ≈ 1.1×10⁴ at k = 2, so
the k = 2 run's 820 folds to x = 6323 stop short of it as well.

**Both readings are sound and only the hypothesis-side one is chainable.** The
conclusion-side condition is what the proof consumes at the step it is proving,
so verifying it verifies the lemma; it is useless as a gate because it refers to
the level you have not reached yet.

The distinction does not change §7's arithmetic. Running §7 with the weaker gate
M ≤ p−2 instead of M ≤ (p−2)/4 multiplies every bound below by 4 and changes
nothing.

## 7. The Deficit Lemma, and why no C closes the chain

This is the load-bearing section. It needs no sieve theory, no Fact A, no
transfer operator, and no measurement beyond Mertens.

> **Deficit Lemma (PROVEN).** For 1 ≤ m ≤ D/2,
> maxsum_m(T_x, [0,Y)) ≥ m·m̄·(1 − O(m/D)), where m̄ = Y/D.
>
> *Proof.* Sum s_{i+m} − s_i over i = 0 … D−1−m. Writing g_j for the j-th gap,
> the double sum counts every g_j with m−1 ≤ j ≤ D−1−m exactly m times, so it is
> at least m·(s_{D−m} − s_{m−1}). Dividing by the D−m terms, the *average*
> window already exceeds m·m̄·(1 − O(m/D)), and the max exceeds the average. ∎

VERIFIED: min over m ≤ 1024 of R(m) measures 1.187 (x = 16001), 1.280 (x = 997),
1.296 (x = 3499). Never below 1, as required.

> **Traverse Bound (PROVEN, given m̄ ≍ ln²x).** Telescoping the Localized Merge
> Lemma from base x₀ needs, at fold j, the hypothesis M(T_{q_j}, Y) ≤ α·q_{j+1}
> where q_j is the j-th prime after x₀ and α = 1/4. The only bound the chain has
> at that point is M(T_{q_j}, Y) ≤ maxsum_j(T_{x₀}, Y). By the Deficit Lemma this
> forces j·m̄ ≤ α·q_{j+1} = α·(x₀ + O(j ln x₀)). Since m̄ ≈ 2.4 ln²x₀ ≫ α ln x₀,
>
> **j ≤ α·x₀/m̄ ≈ x₀/(9.6 ln²x₀),** whatever C is, even C = 1.

So the telescope advances the level only from x₀ to
q_{j_max} ≈ x₀·(1 + 1/(9.6 ln x₀)), a multiplicative advance of about 2% at
x₀ = 16001, and then it stops.

**Against what is required.** LOCALIZED-GAP.md §4 prices the route at π(x) ≈
x/ln x folds, which is what carries a base-level maxsum up to level x and gives
its 2.4 x ln x against a window of x². The cap supplies x/(9.6 ln²x).
**Short by a factor 9.6 ln x**, which is 93 at x = 16001. Equivalently, covering
the ladder from a base x₀ up to x needs about 9.6 ln x · ln(x/x₀) separate
chains, each of which must have its own hypothesis established by some other
means, and that hypothesis is the very thing the chain was built to supply.

**Cutting the ladder into blocks does not rescue it, and that is worth naming
because it is the obvious next move (PROVEN).** The block accounting looks
affordable: cap each block at x/(9.6 ln²x) folds, add about x/4 to M per block,
descend x by a factor of two in about 6.7 ln x blocks, sum the geometric series
and read off M ≲ 3.3·x·ln x. **The blocks do not compose.** Each block requires
M ≤ p/4 at its start, and M is cumulative, so a second block starts with M
already at x/4 while p has grown only to x·(1 + 1/(9.6 ln x)). The gate earns
(q_{j+1} − q_j)/4 ≈ ln x/4 per fold while the bound spends at least
m̄ ≈ 2.4 ln²x per fold, a deficit of 9.6 ln x per fold that no bookkeeping
recovers. Ending at M ≈ 3.3 x ln x while every step requires M ≤ x/4 is the
contradiction, and it is visible without any measurement. Whatever the block
structure, the composed bound exceeds its own gate by 13.2 ln x.

**MEASURED, the same thing.** The script prints the per-fold spend
d(maxsum_m)/dm against the per-fold earn d(q/4)/dm:

| x | spend | earn | ratio | predicted 14.4 ln x |
|---|---|---|---|---|
| 499 | 124.69 | 1.781 | 70.0 | 89.5 |
| 997 | 156.00 | 1.844 | 84.6 | 99.4 |
| 3499 | 233.06 | 2.141 | 108.9 | 117.5 |
| 16001 | 387.75 | 2.484 | 156.1 | 139.4 |

The ratio grows like ln x, exactly as the Deficit Lemma says it must, and it is
never below 70 anywhere in reach. The Deficit Lemma's unconditional floor for
this ratio is 9.6 ln x, that is 59.6, 66.3, 78.3, 92.9 at those four x *(the
middle two read 66.2 and 78.7 until 2026-08-18; 9.6·ln 997 = 66.29 and
9.6·ln 3499 = 78.34, and the 14.4 ln x column beside them was already exact)*;
the
measured values sit above it because the spend is a *marginal* cost, and §3's
growth law supplies that margin directly as
d(maxsum_m)/dm = m̄ + σ·√(lnD/2m), which over m ∈ [32, 64] is 1.37, 1.43 and
1.48 times m̄ at x = 997, 3499 and 16001. That is not R(m), which reads 1.63 to
1.89 over the same m at x = 997. Floor and measurement agree on the branch,
which is what matters: **the deficit is linear in ln x and never closes.**

**Chain survival, VERIFIED directly.** Starting from base x and applying the
lemma fold by fold with the hypothesis checked at each step against the proven
running bound:

- x ≤ 12143 (Y = 10⁹): **0 folds.** The hypothesis fails at m = 1.
- x = 13933 and x = 16001: **1 fold**, reaching level 13963 and 16007. It dies
  at m = 2, maxsum₂ = 4782 against a gate of 4007.8.

Even the Deficit Lemma's own ceiling, x/(4m̄) = 13.9 to 15.3 folds at those two
x, is never approached, because R(2) ≈ 9 rather than 1. *(CORRECTED 2026-08-18
from "15 to 18 folds", which merged two different quantities. `x/(4m̄)` is §5's
C_gate column, 13.9 at x = 13933 and 15.3 at x = 16001. The 18 is the number
printed next to it in `localized-04-maxsum.js`:409-410 -- "cap x/(4 mbar) = 15
vs sec7 heuristic x/(9.6 ln^2x) = 18" -- and it is the section 7 heuristic, not
the ceiling.)* So the measured shortfall at
x = 16001 is **1 fold against π(16001) = 1863**, a factor 1863, against the
unconditional factor of 93 that the Deficit Lemma alone forces.

## 8. Does the chain have any chance? A5 and A9 say the same thing

**A5 Theorem C, transplanted, AGREES with the Localized Merge Lemma, and
independently.** Theorem C reads κ(m) ≤ max{k : maxsum_{m+k−2} ≥ c_min(k−1)}
with c_min(j) ≈ 3p·j. In the head maxsum_j ≈ R(j)·j·m̄ and m̄ ≪ 3p, so the set is
empty past k = 1 and **κ(m) = 1 for all m ≤ 6, at every x ≥ 997, MEASURED.**
Theorem B likewise gives L ≤ 1 from x = 211 (Y = 10⁷), x = 331 (Y = 10⁸),
x = 499 (Y = 10⁹).

That is a genuinely useful cross-check: *two independent routes reach "one index
per fold" in the head*, Fact A + Fact B (LOCALIZED-GAP §2, Holt's mechanism in
two-class form) and A5's Run Cost plus alternation. **And it locates exactly what
localization buys A5.** `research/kappa-not-L.md` records that Theorem B is
"structurally capped, since maxsum_m ≥ G₂ always, so it can never prove L below
G₂/(3p) ≈ 0.18x". The localized analogue of that ceiling is M(x,Y)/(3p), and

  M(x,Y)/(3p) ≈ m̄·lnD/(3x) ≈ 0.8·ln²x·lnD/x,

which drops **below 1** once x ≳ 0.8·lnD·ln²x, i.e. x ≈ 470 at Y = 10⁹. The
measured onset of L ≤ 1 is x = 499. So localization does not repair Theorem B by
improving the argument; it repairs it by moving the ceiling, from 0.18x on the
tile to under 1 in the head. Same theorem, different m̄/3p ratio. On the tile
A10 measured 2p/m̄ pinned near 2; in the head it is 2p/m̄ = 17.7 at x = 997 and
122.5 at x = 16001. A10's "safe band 2p/m̄ ≥ 4" is crossed between the measured
x = 61 (2p/m̄ = 3.07) and x = 127 (4.49), instead of at a tile of width 10⁵⁷.

**A9's fitted tail transplants, but 20% too steep.**
`research/operator-and-pair-count.md`'s exact tail engine gives
FIT ln(1/tail) = −0.235 + 1.2992·(2p′/m̄) on the tile, read here as a law in the
threshold. Pushed through
an extreme-value argument over D gaps it predicts R(1) = (lnD + 0.235)/1.2992,
which is ≈ 12.0 to 12.6 across the whole Y = 10⁹ scan. Measured R(1) is 12.6 to
18.7, ratio 1.00 to 1.50 with mean ≈ 1.23.

**So the head's gap tail is HEAVIER than the tile's fitted law by about 20 to
25%: the head's exponential rate is ≈ 1.06/m̄ against A9's 1.2992/m̄.** That is a
departure, and it is in the unhelpful direction. Corroborating it at the far end:
A9's law predicts 1.1×10⁻³ gaps of length ≥ 2p′ below Y at x = 997, and there is
**one** (M = 2052 against 2p′ = 2018). *(The level read "x = 1009" until
2026-08-18. 2p′ = 2018 means p′ = 1009, so the level is x = 997; at x = 1009 the
next prime is 1013 and 2p′ = 2026. The conclusion is unchanged either way, since
M = 2052 clears both. Same mislabel in `localized-04-maxsum.js` reading 13.)* At x = 769 and 877 likewise one each,
against predictions 7.5×10⁻² and 1.1×10⁻². Three orders under at the extreme,
which is what a 20% error in an exponential rate does when you extrapolate it 15
mean-lengths out. A9's fit should not be used past the range it was fitted on.

## 9. The boundary caveat is resolved, and it is harmless

The boundary question is whether a fused gap whose left endpoint sits just below
Y can have its right endpoint above Y, which would mean M has to be defined on
[0, Y + M] or with an explicit buffer. Three rules were computed in the same
pass:

- (a) left endpoint < Y, right endpoint free (the definition used everywhere);
- (b) whole window below Y;
- (c) slot list truncated at Y + 4096, the buffer LOCALIZED-GAP.md actually uses.

**Result: (a)/(b) = 1.0000 and (a)/(c) = 1.0000 at every x and every
m ≤ 1024, at Y = 10⁷, 10⁸ and 10⁹.** The optimal window overshoots Y by 0 in
every case, and windows that start in [Y − 4096, Y) reach at most 76% to 83% of
maxsum. VERIFIED, not argued.

The reason is structural, so it will not stop being true: maxsum_m is a max over
D ≈ 10⁷ windows and the edge region holds a handful of them, so the probability
that the extremal window is one of the last 30 is about 30/D. The caveat is real
as a matter of statement hygiene and empty as a matter of numbers. The clean
statement is M defined on [0, Y) with a buffer of max(4096, 2·maxsum_m), and this
measurement is what licenses it.

## 10. Verdict

**Does the chain have any chance? No, and the reason is cheaper than the sieve
wall.**

The Localized Merge Lemma is real and its one-index cost is real. What the
telescope cannot do is *carry* that cost, because its hypothesis is a gate that
grows like the prime gap, ln x per fold, while the bound it must stay under grows
by at least the mean twin-slot gap, 2.4 ln²x per fold. That deficit is
unconditional. It does not care about C, about the sifting parameter u = 1, about
β₁ = 2 or β₂ = 4.2665. **The prediction on record is right about the outcome and
the u = 1 sieve wall never gets a chance to be the obstruction.**

**The sharpest form, and it kills the obvious repair.** The natural response is
"weaken the gate": ask for M ≤ α·p with α larger than 1/4. That does not help,
because the gate feeds back. Suppose the chain proves M(T_x, Y) ≤ B(x). Fact B
then allows up to B(x)/(p−2) + 1 ≈ B(x)/x kills inside a maximal new gap, so the
index cost per fold is B(x)/x rather than 1. Over π(x) ≈ x/ln x folds the
telescope index is J ≈ B(x)/ln x, and the bound it returns is

  maxsum_J ≈ J·m̄·R(J) ≈ 2.4·R·B(x)·ln x.

Self-consistency needs 2.4·R·B ≤ B/ln x, that is ln x ≤ 1/(2.4 R).
**The map B ↦ 2.4·R·B·ln x is expanding for every x ≥ 2, so the bootstrap has no
fixed point at any α and diverges at 2.4 R ln x ≈ 3.2 ln x per round.** The
obstruction is not the size of the gate. It is that the gate multiplies.

**How far that reaches, stated exactly.** `research/gate-multiplies.md` §2 turns
the paragraph above into four hypotheses (accumulating index, deficit, linear
cost feedback, and a traverse count exceeding the budget) and tests every
recursion in the repo against them. The argument closes this chain and A4's tile
analogue. It does **not** reach a chain that re-bases at every fold, because
there the running bound cancels out of the cost instead of compounding. So the
principle is *the gate multiplies wherever the index accumulates against a fixed
base*, and not more than that.

Two further repairs, checked and closed, listed so nobody re-runs them:

1. A bound on the *increment* M(T_p, Y) − M(T_x, Y) rather than on M(T_p, Y).
   `localized-01` measured that only 20 of 61 folds move M at all, mean increment
   14.16 at x = 307, against a gate earning ln x/4 = 1.43. Even the **true**
   increments outrun the gate by an order of magnitude, so a perfect increment
   bound would still not close it. REFUTED here, not merely unproven.
2. A merge lemma with no gate at all. False on the full tile, where M = G₂ sits
   between x′²/4.5 and x′²/3.2 at every computed level and Hagedorn's Jacobsthal
   values exceed 2p (PRIOR-ART.md §Holt).

**What survives.** The growth law of §3, which is new and predicts maxsum_m from
two numbers (m̄ and σ) to within 12% at every m above about 2 lnD, the range §3
measures it on; below that the Gaussian model is the wrong model and R/EV runs
to about 3 at m = 1.

*(CORRECTED 2026-08-18, at all three sites in this file and at the one restating
it in `research/U-FRAME.md` §9. The tolerance used to be given as **6%**. The
three intervals §3 prints one screen above are `R/EV ∈ [0.981, 1.110]` at
x = 997, `[1.038, 1.119]` at x = 3499 and `[0.990, 1.064]` at x = 16001, so the
worst deviation is 11.9% and 6% is not reached on any of the three grids -- the
narrowest, x = 16001, is 6.4%. `applied-P.md` row 43 marked this "clean at both
ends" after checking that the SCOPE, m ∈ [2 lnD, 1024], travelled intact between
the two files, and never compared the value against the interval printed beside
it. The finding is not weakened by the correction: an unfitted two-parameter
model landing within 12% over three decades of window size is still the result,
and the conclusion it supports -- R(m) → 1 from above, no plateau at a constant
C > 1 -- does not depend on the tolerance.)* U-FRAME §9's named hole asked for a ladder in m that is not
G₂ itself, and the hole is closed by a measurement rather than by a proof: the
ladder exists, it is `1 + (σ/m̄)√(2 lnD/m)`, MEASURED, and it is not the
obstruction. The obstruction is the gate. That is a better place to be stuck
than an unmeasured hypothesis.

## 11. Reproduction

```
node research/localized-04-maxsum.js 28934443 307 256          # custody, 0.7 s
node research/localized-04-maxsum.js 1e9 auto 256              # k >= 3 ladder, 90 s
node research/localized-04-maxsum.js 1e9 scan 8 16000          # gate scan, 18 s
node research/localized-04-maxsum.js 1e9 997,16001 1024 16000  # growth law, 100 s
node research/localized-04-maxsum.js 1e7 scan 8 2154           # Y dependence, 0.3 s
node research/localized-04-maxsum.js 1e8 scan 8 6812           # Y dependence, 2 s
```

Engine note, continuing LOCALIZED-GAP §10. The bitset plus word-parallel twin
extraction (`t = a & ((a >>> 2) | (b << 30))`) does the whole Y = 10⁹ ladder to
x = 16001 in 18 seconds, against `localized-01`'s per-integer scan. Every number
above comes from a sieve of [0, 10⁹) by primes ≤ 16001. The tile is never built.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
