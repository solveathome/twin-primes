# The instrument-slack oscillation survey — dial 4's fourth channel, priced and closed

<!-- ledger
id: Q-ioslack-survey
status: CLOSED
todo: 0e (retired)
question: Does any instrument in the corpus carry a sharp-level signature that would let the infinitely-often slack be spent?
verdict: None does: 23 instruments surveyed and 19 eligible, smallest per-instrument p_FWE = 0.1082 and 0.8865 after Šidák, so dial 4's fourth channel closes and the dial is finished; the second finding is that maxsum_{L+1} is sharp exactly when L = 1.
-->

*2026-08-19. TODO item 0e's first move, executed. Producer:
`research/attack-ioslack-survey.js`, output formally embedded
(`node research/qc/embed.js --check` passes; code-sha256 `e1e3b8d4e582ed89…`,
out-sha256 `0d0990292c648d00…`). Staging note: proposal only, no live document
touched. Gate: `node research/qc.js --full` was clean before this file (108/108
in `audit-numbers`, 11 checks clean, FULL GATE PASSED) and reads TOTAL = 4 after
(117/117 in `audit-numbers`; the four are `uncited-script` on
`attack-frontier37-01-word.js`, `attack-frontier37-02-transport.js`,
`natal-cap-39-triple-census.js` and `y2-ladder-recompute.js`, none of them this
wave's, all written by concurrent siblings in the shared tree while this ran).
`attack-ioslack-survey.js` itself raises nothing: it is cited here, its embed
verifies, and the `embeds`, `sourcing`, `refs` and `crosslinks` legs are all 0.
Calibration marked on every claim.*

---

## 0. The answer, up front

> **NO instrument in the corpus has a sharp-level signature that survives a
> permutation test, and the two signatures that have a named mechanism select
> FINITE sets. Dial 4's fourth channel closes. The dial is FINISHED.**

Twenty-three instruments surveyed, nineteen eligible for the test, eleven rules
each, 20000-permutation null with a best-of-family statistic. **Smallest
per-instrument `p_FWE` = 0.1082**; Šidák over the nineteen instruments puts it
at **0.8865**. Not one instrument reaches 0.05 even before the outer correction.

And the survey's second finding is the one that closes rather than merely fails
to open. `maxsum_{L+1}` — the exemplar `verify-monotone-depth.md` named — is
sharp **exactly when `L = 1`**, i.e. when no gap of the old tile is `≡ 0, ±2
(mod p)`. That is a recognisable signature, and it names a finite set: the
qualifying-gap counts on record run `2, 4, 4, 72, 60, 20, 380, 380, 64, 11784,
9452, 9500, 243816, 248058, 95896`, growing like `3D/p` with
`D = ∏_{3≤q≤x}(q−2)`, so the condition is already unsatisfiable at `T_11`. The
greedy oracle's sharp levels are the initial segment `x ≤ 43`, also finite.
**A signature an argument could recognise exists; the set it recognises is
finite, which is the one thing an infinitely-often argument cannot use.**

**And the exemplar is the ceiling.** Across everything measured, the largest
slack oscillation of any instrument that bounds `G₂` **directly** is **0.3747
nats**, and it is `maxsum_{L+1}` itself. The next is 0.2231 and then 0.0455.
The channel's value was already fully known when it was opened.

---

## 1. The instrument table

`C = B/G₂` for an upper instrument, `G₂/B` for a lower one, so `C ≥ 1` always;
`amp(ln C) = max ln C − min ln C` over the instrument's exact range. Trend is
the least-squares slope of `ln C` on `ln(level)` with its t-statistic. Every
column is **cited, not recomputed** — the standing compute rule's
cite-don't-recompute case — and the sources are in the last column.

| id | instrument | levels | n | **amp ln C** | sharp | trend (slope, t) | source |
|---|---|---|---|---|---|---|---|
| **I1** | **`maxsum_{L+1}` step-3** | p = 7..29 | 7 | **0.3747** | 2/7 | +0.085, t = 0.72 | `a3-10-lower-tightness.js` §1; `gate-multiplies.md` §8 |
| I2 | A5 Theorem B ceiling on L | p′ = 7..31 | 8 | 0.9163 | 2/8 | +0.342, t = 1.43 | `a3-05-bound-L.md` §5; `attack-foldL-02-bridge.md` §2 |
| I3 | A5 condition-(i) ceiling (= L0) | p′ = 7..31 | 8 | **1.2993** | 0/8 | +0.594, t = 2.22 | same |
| I4 | forced ceiling (channel census) | p′ = 7..31 | 8 | 0.9163 | 3/8 | +0.508, t = 2.45 | `attack-foldL-01-census.md` §2 |
| I5 | LR (run of gaps ≥ θ) | p′ = 7..31 | 8 | 0.6286 | 0/8 | +0.055, t = 0.28 | `attack-foldL-02-bridge.md` §2 |
| I6 | LP (LR + the 6p pair floor) | p′ = 7..31 | 8 | 0.6931 | 5/8 | −0.018, t = −0.08 | same |
| I7 | LV (value-qualifying run) | p′ = 7..31 | 8 | 0.4055 | 6/8 | −0.077, t = −0.52 | same |
| **I8** | **LVP** | p′ = 7..31 | 8 | **0.0000** | 8/8 | flat | same, "slack zero at all eight cells" |
| I9 | Tail-Count `M_loose` | q = 11..31 | 7 | 0.0455 | 6/7 | +0.021, t = 1.18 | `verify-tailcount-transport.md` §(c) |
| **I10** | **Tail-Count `M_alt`** | q = 11..31 | 7 | **0.0000** | 7/7 | flat | same |
| **I11** | **Tail-Count `M_full`** | q = 11..31 | 7 | **0.0000** | 7/7 | flat | same |
| I12 | depth-k counting ceiling, block 1 | k = 1..6 | 6 | 1.1827 | 1/6 | −0.679, **t = −6.03** | `attack-ab-coupling.md` §4 |
| I13 | vector-sieve need `nP/z²` | z = 13..31 | 6 | 0.5445 | 0/6 | +0.431, t = 2.31 | `theta-selfconsistent.md` §2 |
| I14a | threshold-m certificate, m = 1 | z = 13..29 | 5 | 0.3066 | 0/5 | +0.291, t = 1.75 | `attack-foldL-05-maxsum-direct.md` §4 R1 |
| I14b | threshold-m certificate, m = 4 | z = 13..29 | 5 | 0.3302 | 0/5 | +0.439, t = 2.48 | same |
| I14c | threshold-m certificate, m = 8 | z = 13..29 | 5 | 0.3629 | 1/5 | +0.228, t = 1.06 | same |
| I15 | greedy oracle (lower) | x = 2..79 | **22** | 0.0620 | 15/22 | +0.009, t = 2.71 | `greedy-oracle-validation.md` §3 |
| I16 | bridge floor / u-frame need | x = 11..79 | 8 | 0.3524 | 0/8 | −0.048, t = −0.55 | `attack-foldL-05-maxsum-direct.md` §3 |
| I17 | `maxsum_2` step-3 **lower** bound | p = 7..29 | 7 | 0.2231 | 3/7 | −0.050, t = −0.68 | `a3-10-lower-tightness.js` §1 |
| I18 | ρ overshoot coefficient, max m ≤ 8 | T_11..T_29 | 6 | 0.5277 | 0/6 | +0.302, t = 1.54 | `gate-multiplies.md` §8 tail |
| I19 | centered maxsum `C_M` multiplier | q = 13..29 | 5 | 0.1179 | 0/5 | −0.116, t = −1.72 | `attack-foldL-03-transport.md` §3 |
| I20 | alphabet `|A|` (lower) | q = 11..29 | 6 | 0.2231 | 1/6 | −0.109, t = −1.16 | same |
| I21 | `Σ exp(λg)` index cost `Z₂/Z₁` | q = 11..29 | 6 | 2.6355 | 0/6 | +0.255, t = 0.19 | same, "no stable value" |

Reference: the **truth's** own oscillation is `amp(ln T) = 0.3187` nats.

**Seven custody checks pass**, including `I1`'s slack column reproducing
`verify-monotone-depth.md` §2's quoted `1.0000, 1.0000, 1.4545, 1.2778, 1.1200,
1.1176, 1.1628` to 5·10⁻⁵, the shared true-L column being byte-identical across
I2–I8, the `I9`–`I11` truth column matching `exact-g2-ladder.js`, the bridge
ladder `L0 ≥ LB`, `LR ≥ LP ≥ LVP`, `LV ≥ LVP` holding at all eight cells, and
every bound sitting on the correct side of its truth at all 159 slack cells.

---

## 2. The big amplitudes are all on the wrong axis

This is the correction the raw table needs, and it is why the headline is 0.3747
and not 2.6355.

**(a) Instruments that bound `G₂` directly** — the only ones whose slack enters
the licence one for one:

| I1 `maxsum_{L+1}` | I17 `maxsum_2` | I9 `M_loose` | I10 `M_alt` | I11 `M_full` |
|---|---|---|---|---|
| **0.3747** | 0.2231 | 0.0455 | 0.0000 | 0.0000 |

**(b) Instruments that bound `L`** — I3 at 1.2993, I2 and I4 at 0.9163, I6 at
0.6931, I5 at 0.6286, I7 at 0.4055, I8 at 0. Their slack reaches `G₂` only
through the bridge, and **the bridge floors at ≈ 0.183x for ANY maxsum bound
whatsoever** (`a3-05-bound-L.md` §7; `REFUTED.md`, "the maxsum bridge as a
0c→L converter"). An L-slack of 1.30 nats does not deliver 1.30 nats of `G₂`
slack; it is spent before it arrives, and it may not be counted as if it did.

**(c) Diagnostics that are not bound/truth ratios at all** — I21 (a Laplace
index cost), I12 (dial 4's already-closed depth channel), I13 (a ratio to the
zone budget, i.e. `C·T` and not `C`), I18 (an overshoot coefficient).

**One trend in the whole table is real, and it is the wrong one.** I12 reads
slope −0.679 at t = −6.03 with Spearman exactly −1.000, because depth is an
index the prover chooses rather than a level the ladder hands over. That is
channel 3 in its own coordinates and it is already closed. Every level-indexed
instrument reads |t| < 2.5, and 14 of 23 read |t| < 2. **On 5 to 8 levels the
instrument-slack columns carry no direction.**

---

## 3. The permutation test, with family-wise honesty

Method is `attack-0c0e-02-level-selection.js` §B's, unchanged in construction:
detrend `ln C` by least squares on `ln(level)` over exactly the instrument's own
levels so "select the big levels" is not a rule; a rule's statistic is the mean
detrended `ln C` **sign-flipped**, so a sharp-selecting rule scores positive;
per-rule `p` is the fraction of 20000 same-size random subsets scoring at least
as high; the **family-wise** `p` is the fraction of permutations whose best rule
over the whole family beats the observed best, with the selected sets held fixed
and only the column shuffled; then an outer Šidák over the instruments. Seed
20260819, xorshift32, stated so the null is reproducible byte for byte.

The eleven rules: `p′−p ≥ 4`; `p′−p ≥ 6`; p is a lower twin; `p ≡ 1 (mod 4)`;
`p ≡ 1 (mod 6)`; `π(p)` even (null control); `frac(m̄_p)` above its median;
`θ(p)/p` above its median; **the record gap qualifies mod p** (a3-10's mechanism
(S), the one rule in the family that names an arithmetic accident recurring at
arbitrarily large p); `G₂(old)/(3p) < 1` (A5's structural cap); and level in the
bottom half, marked ORACLE-adjacent and excluded from the verdict.

| instrument | best non-oracle rule | gain, nats | **p_FWE** |
|---|---|---|---|
| I3 condition-(i) ceiling | `p′−p ≥ 6` | 0.3008 | **0.1082** |
| I4 forced ceiling | `p′−p ≥ 6` | 0.2598 | **0.1082** |
| I5 LR | `p′−p ≥ 6` | 0.2691 | **0.1082** |
| I6 LP | record qualifies mod p | 0.1958 | 0.2044 |
| I1 `maxsum_{L+1}` | `G₂(old)/(3p) < 1` | 0.0935 | 0.2423 |
| I15 greedy oracle | `p′−p ≥ 6` | 0.0082 | 0.3194 |
| I9 `M_loose` | `p′−p ≥ 6` | 0.0133 | 0.3258 |
| I2 Theorem B | `p′−p ≥ 6` | 0.2707 | 0.3599 |
| I16 bridge floor | `G₂(old)/(3p) < 1` | 0.2104 | 0.3726 |
| I14b threshold-m, m = 4 | record qualifies mod p | 0.1224 | 0.4038 |
| I21 Laplace index cost | `G₂(old)/(3p) < 1` | 1.3674 | 0.4988 |
| I18 ρ | `θ(p)/p` above median | 0.1506 | 0.6291 |
| I20 alphabet | `p ≡ 1 (mod 6)` | 0.0657 | 0.6369 |
| I13 vector-sieve need | `p ≡ 1 (mod 4)` | 0.0836 | 0.7496 |
| I7 LV | `frac(m̄_p)` above median | 0.1050 | 0.7641 |
| I14a threshold-m, m = 1 | `p′−p ≥ 6` | 0.0692 | 0.7988 |
| I19 centered maxsum | `p′−p ≥ 6` | 0.0258 | 0.7988 |
| I14c threshold-m, m = 8 | `p ≡ 1 (mod 4)` | 0.0647 | 0.9014 |
| I17 `maxsum_2` | `θ(p)/p` above median | 0.0380 | 0.9326 |
| I8, I10, I11 | **degenerate** — zero slack, nothing to select on | — | — |

> **Outer correction: smallest `p_FWE` = 0.1082, Šidák over 19 instruments
> = 0.8865, Bonferroni = 1.0000. NO SIGNATURE SURVIVES.** [VERIFIED]

Three things about that table are worth saying out loud.

**The one rule that keeps winning is already dead.** `p′−p ≥ 6` is the best
non-oracle rule at eight of the nineteen instruments. It is the large-gap
mechanism, refuted 2026-08-17 and priced at 0.033 to 0.054 nats against `ln 3`
on the long ladder. Its reappearance here is the same trend leaking through a
short ladder, not a second finding.

**The oracle ceilings bound the whole rule space without any rule at all.** On
the direct-`G₂` instruments the best single level sits **0.1128 nats** sharp of
its own trend (I1) and **0.0164** (I9). An argument allowed to cheat — to look
at the answer and pick the sharpest level — gains a tenth of a nat against a
need of 6.700. That is `attack-0c0e-02-level-selection.js` reading 7's argument,
transplanted from the truth's column to the instruments'.

**And no covariate carries the slack.** Eleven covariates against nineteen
instruments: the largest |r| on a direct-`G₂` instrument is 0.804 (I1 against
`p ≡ 1 mod 4`, one bit on seven points) and 0.778 (I17 against "the record
qualifies mod p", which is the mechanism `a3-10` names for that very instrument
and is the only correlation in the table with a reason behind it). The truth's
own excursions carry nothing: the largest |r| against the truth's `ln` margin is
−0.850 at I14a on five points and −0.795 at I4 on eight, both the wrong sign for
the story a route would want. **ρ's non-monotonicity carries nothing either**:
|r| against `ln ρ` never exceeds 0.636 and is under 0.14 at every direct-`G₂`
instrument.

---

## 4. The zero-slack case, and why it points the wrong way

Three instruments read `amp(ln C) = 0.0000` exactly: **LVP** (proven ceiling on
`L`, exact at all eight diagonal cells), **`M_alt`** and **`M_full`** (the
alternation-refined and fully-conditioned tail-count certificates, exact at all
seven folds). The brief asked what a zero-slack instrument means for the
licence. It means this, and it is worth writing down because the instinct runs
the other way:

> **A zero-slack instrument has nothing to be sharp-on-a-subsequence WITH. Its
> i.o. value is 0, not unbounded.** If `C ≡ 1` then `ln(C·T) = ln T`, so the
> i.o. licence on that instrument is worth exactly `amp(ln T) = 0.3187` nats and
> not one nat more — channel 1, already priced and already closed. [PROVEN, one
> line]

The degenerate case is therefore not a gap in the survey; it is the survey's
cleanest reading. And it comes with a mechanism: **exactness and usefulness are
in tension, and the three exact instruments are exactly the three that transport
nothing.** `M_full` is identically the truth because it is the operator
evaluated on its own support, which is `verify-tailcount-transport.md`'s "exact
simulator rather than a source of bounds"; proving it *is* proving the theorem.
`REFUTED.md` already carries the chaining failure ("chaining the Tail-Count
Transport on the tile"). LVP is exact and its own record says the obstruction
merely **relocates** onto bounding the run length. An instrument that gives away
nothing has taken on everything.

---

## 5. The mechanism check, which is what actually closes the channel

A permutation test on 5 to 8 levels cannot see an asymptotic, so §3 alone would
be a failure to open the channel rather than a closure. The closure is §4 of the
producer:

**I1, `maxsum_{L+1}`.** Sharp iff `L = 1`, i.e. iff **no** gap of `T_x` is
`≡ 0, ±2 (mod p)`. That is a clean arithmetic signature and an argument could in
principle select on it. It selects a finite set. The qualifying-gap counts, from
`a3-10-lower-tightness.js` OUTPUT §3's fifteen miss cells:

```
T_5@7:2  T_11@17:4  T_11@19:4  T_13@17:72  T_13@19:60  T_13@23:20
T_17@29:380  T_17@31:380  T_17@37:64  T_19@23:11784  T_19@29:9452
T_19@31:9500  T_23@29:243816  T_23@31:248058  T_23@37:95896
```

The count is `≈ 3D/p` with `D = ∏_{3≤q≤x}(q−2)`, so it grows like
`exp(θ(x))/p`. `L = 1` is already unsatisfiable at `T_11` and the emptiness is
monotone in `D`. [MEASURED at 15 cells; PROVEN-shaped]

**I9, the tail-count certificate.** Sharp at 6 of 7 folds; the single loss is at
`q = 29` and its cause is named exactly — the alternation constraint, the only
dropped condition that has ever cost anything. Add it back and the instrument is
exact at 7 of 7. The sharp levels are not a subsequence, they are every level,
and the instrument does not chain. Nothing to select.

**I15, the greedy oracle.** Sharp at `x = 2..43`, loose at `47..79`. A monotone
break, not an oscillation; `REFUTED.md` already records it as budget-and-rule
with slope −0.0235 ± 0.007 per level. A signature that is an initial segment
selects a finite set.

---

## 6. The prize, even if a signature existed

Against the Zone Postulate's need `(4.2665−2)·ln θ(x)` = 6.700, 8.191, 9.637 at
x = 23, 43, 79:

| x | need, nats | best direct-`G₂` `amp(ln C)` alone | + the truth's 0.3187 | loosest column in the corpus + truth |
|---|---|---|---|---|
| 23 | 6.700 | 5.6% | 10.3% | 44.1% |
| 43 | 8.191 | 4.6% | 8.5% | 36.1% |
| 79 | 9.637 | 3.9% | 7.2% | 30.7% |

The last column is an oracle three times over: it gets to pick the loosest
object anywhere in the corpus (a Laplace index cost that is not a bound at all),
count its entire oscillation as free, and add the truth's on top. It never
reaches half the need. **The fourth channel is worth 0.3747 nats and it cannot
be collected.**

---

## 7. Pre-registration scored: 5 of 6

Written into the producer's header before any line below it ran.

| # | prediction | outcome |
|---|---|---|
| P1 | `amp(ln C)` exceeds 0.3187 at a majority of instruments with n ≥ 5 | **RIGHT**, 14 of 23 (60.9%) — but see §2: the majority is carried by columns that are not `G₂` bounds, so the prediction is right on its terms and misleading on its intent |
| P2 | the L-ceiling family is loosest and most oscillatory | **RIGHT**, mean 0.6942 against 0.4556 |
| P3 | at least one instrument reads exactly 0, and that is the degenerate case pointing the wrong way | **RIGHT**, three of them (I8, I10, I11); §4 |
| P4 | trends are noise: \|t\| < 2 at most instruments | **RIGHT**, 14 of 23 |
| P5 | **no signature survives family-wise correction** | **RIGHT**, Šidák 0.8865 |
| P6 | "record qualifies mod p" looks good raw and dies on FWE | **WRONG**, and the truth is sharper: it is never even the best rule on the instrument whose mechanism it names. Best only at I6 (p = 0.0716) and I14b (p = 0.2009); it scores −0.0770 at I17, where the mechanism actually lives. Real as a mechanism, useless as a selector |

---

## 8. Drafted sentences (NOT APPLIED)

Proposed replacements. Nothing below has been written into a live document.

### 8a. `TODO.md` item 0e — replace the whole item

> ~~0e.~~ **DELETE THE ITEM.** Dial 4 is finished and TODO items leave the file
> when they complete (the forward-only charter). The closure line for
> `research/REFUTED.md` is:
>
> | the instrument-slack channel of the i.o. licence | CLOSED | the loosest direct-G₂ instrument oscillates 0.3747 nats against a need of 6.700, no sharp-level signature survives a permutation test at any of 19 instruments (Šidák p = 0.8865), and the two signatures with a named mechanism select finite sets | 2026-08-19 | `history/staging/ioslack-survey.md`; `research/attack-ioslack-survey.js` |

If the item is instead kept one more cycle for the writing-up, the body should
read:

> 0e. **The infinitely-often slack is PRICED and all four channels are closed;
> dial 4 is finished** (2026-08-19: `attack-0c0e-level-selection.md`,
> `verify-monotone-depth.md`, `ioslack-survey.md` — read the third first).
> The truth's own oscillation is worth **0.3187 nats over the exact ladder**,
> falling to 0.0865 in the top windows (the falling half rests on A144311's
> terms 15–22, ours to verify, not to claim); a 54-term one-class control reads
> 0.2175 and 0.1372. The alignment max-over-mean is worth 2–11%, carried by
> 1/ln(census). Any power-law instrument gains 2·range·ln(x′/x) → 0. A BV-shaped
> exceptional set cannot be imported: the max gap is non-decreasing under
> inclusion of the sieve set. **And the fourth channel, an instrument sharp at
> infinitely many levels and loose elsewhere, is now priced too.** Twenty-three
> instruments surveyed: the loosest that bounds G₂ directly is the exemplar
> `maxsum_{L+1}` at **0.3747 nats**, and nothing beats it. No sharp-level
> signature survives a permutation test at any of nineteen instruments
> (smallest p_FWE = 0.1082, Šidák over the family 0.8865), and the two
> signatures that have a named mechanism select **finite** sets: `maxsum_{L+1}`
> is sharp exactly when L = 1, which needs no gap of T_x to be ≡ 0, ±2 mod p and
> is already unsatisfiable at T_11, and the greedy oracle's sharp levels are the
> initial segment x ≤ 43. The three instruments with **zero** slack (LVP,
> M_alt, M_full) are the degenerate case and they point the wrong way: C ≡ 1
> makes the licence worth exactly amp(ln T), and an exact instrument transfers
> the whole difficulty to the object.
> **Nothing further to do here. Dial 4 is a measured margin of 0.32 nats and
> not a knob.**

### 8b. `research/THE-DIALS.md` §3, the dial 4 paragraph — replace the parenthesis

> **Dial 4, "every" against "infinitely often". Priced slack: all four channels
> closed.** (2026-08-19: the truth's oscillation is 0.3187 nats over the exact
> ladder and falling; alignment freedom 2–11%; power-law instruments gain
> nothing by PNT; the sieve depth carries no i.o. freedom because the max gap is
> non-decreasing under inclusion of the sieve set; and the instrument-slack
> channel is now surveyed — across 23 instruments the loosest that bounds G₂
> directly is `maxsum_{L+1}` at 0.3747 nats against a need of 6.700, no
> sharp-level signature survives a permutation test at any of 19 instruments
> (Šidák p = 0.8865), and the two signatures with a mechanism select finite
> sets. Records: `history/staging/attack-0c0e-level-selection.md`,
> `verify-monotone-depth.md`, `ioslack-survey.md`.)

The closing sentence of that paragraph, "The slack is real and there is
currently no route that spends it", should become:

> The slack is real, it is worth at most about 0.7 nats with every channel
> counted at its measured best, and no route spends it.

### 8c. `research/THE-DIALS.md` §4, "The honest reading" — one sentence

> The infinitely-often slack of dial 4 is fully priced (0.32 nats of truth
> oscillation, falling, plus at most 0.37 of instrument slack that no argument
> can select on), so it is a measured margin rather than a knob.

### 8d. The sentences the OTHER outcome would have needed, and why none is claimable

Recorded so the closure is checkable against what would have refuted it. The
closest thing to a candidate the survey produced is `maxsum_{L+1}` — the only
direct-`G₂` instrument with a real oscillation (0.3747 nats) AND a clean
arithmetic sharpness criterion. Had the channel opened, the statement an i.o.
argument would have needed is exactly this:

> **(would-be Candidate.)** There are infinitely many x such that the fold of
> `T_x` by `p′ = nextprime(x)` has `L(x, p′) = 1`, i.e. **no** gap of `T_x` is
> `≡ 0, ±2 (mod p′)`; and at every such x, `maxsum_2(T_x) < p′²`.

The first clause is false, and its failure is not delicate. The number of
qualifying gaps is `≈ 3D/p′` with `D = ∏_{3≤q≤x}(q−2) = exp(θ(x) + o(x))`, so it
diverges; measured, it is already 4 at `T_11` and 248058 at `T_23`. The second
clause is `a3-10`'s exactness question and it fails at 24 of 329 measured cells
independently. **Neither half is close, and no other instrument in the corpus
gets as far as having both halves to state.**

For any future instrument, the corresponding statement to pre-register before
any work is: *"there is a checkable predicate `R(x)`, decidable without
computing `G₂(x#)`, that holds at infinitely many x, and on `{x : R(x)}` the
instrument's slack `C` is bounded by `e^δ` with `δ + sup ln T < 0`."* The survey
prices the second half at 0.3747 nats of available slack against a need of
6.700, so even a predicate that selected perfectly would leave a factor of
about 17 in the log.

---

## 9. NOT REACHED

- **`T_31` and above.** Every instrument's exact range stops at the reachable
  ladder. The longest column is the greedy oracle's 22 levels, and eight of
  those are A144311's terms, ours to verify and not to claim.
- **Instruments that do not exist yet.** The survey covers every instrument with
  per-level values *on record*. A method nobody has built cannot be surveyed,
  and reading 9 of the producer says so. What is bounded is not the space of
  possible instruments; it is the space of instruments this corpus has built,
  plus the two whose sharp-level mechanism is named and provably finite.
- **No asymptotic is excluded by §3.** Five to eight levels cannot exclude an
  amplitude that grows. §5, not §3, is what carries the closure, and §5 covers
  two instruments, not all of them.
- **The full LP behind I12** (`attack-ab-coupling.md` §8's most valuable
  unexecuted run) was not run, so the depth column may not be the depth optimum.
  It does not matter here, because the depth axis is channel 3 and closed.
- **Heath-Brown's dichotomy was not re-examined.** It remains the one published
  statement of the sharp-on-a-subsequence shape, and it selects the levels where
  its instrument (a Siegel zero) exists, not the levels where the truth is
  generous. Nothing in this survey touches whether an analogous instrument could
  be constructed here; what the survey establishes is that the corpus does not
  contain one.
- **`I13`'s one-sided rows past z = 31** (0.8408, 0.6550, 0.8388, 1.0416 at
  z = 37..47) were excluded, because they are lower bounds on the need and mixing
  them with exact rows would inflate the amplitude by construction.
