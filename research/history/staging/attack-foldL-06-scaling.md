# Attack fold-L 06 — the multi-kill extinction scaling test

<!-- ledger
id: Q-foldL-extinction-scaling
status: ANSWERED
todo: none
question: Does the multi-kill extinction law predict windows it was not fitted on?
verdict: CONFIRMED under the pre-registered rule at Y = 2e7, 2e8 and 2e10 from the Y = 2e9 calibration alone, with the run-length extension REFUTED exactly as pre-registered; this promotes a law candidate on measurement, not a proof.
-->

*Staging note. Proposal only; nothing here is integrated into a live document.
Producer: `research/attack-foldL-06-scaling.js`, output formally embedded.
Calibration marked on every claim: PROVEN, VERIFIED by exact computation,
MEASURED, REFUTED.*

## 0. What is being tested

`attack-foldL-04-amortized.md` §8 measured, in the localized window `[0, 2·10⁹)`,
that kill-runs of length ≥ 2 die out past a threshold fold, and that the
first-moment inequality

> `2c·p / m̄(p) > ln(kills in the window at fold p)`

crosses at the same fold, p = 421, with a fitted c = 1.22. One window, one
fitted constant, one extreme-value statistic. That is an observation. A law has
to predict a window it was not fitted on, so this note pre-registers predictions
for Y = 2·10⁷, 2·10⁸ and 2·10¹⁰ from the Y = 2·10⁹ calibration alone, states a
kill criterion, and then measures.

The mechanism under the inequality is H″ of `research/a3-05-bound-L.md` §8: an
exponential density for the chance that a killed slot has a killed neighbour, at
a rate set by the qualifying threshold θ_p against the mean spacing m̄. **H″ is
unproven and nothing here proves it.** This test promotes or breaks it
empirically.

Conventions are angle 4's throughout: window `[A, A+Y)`, positions n ≡ 5 (mod 6),
`key(n) = min{q prime ≥ 5 : q | n(n+2)}` with key 0 for the survivors of every
fold ≤ 1499, fold p deletes the n with key(n) = p, a kill run is a maximal block
of slots adjacent in the current level and all killed at p, L is the longest run,
`X_p = kills − runs` is the number of adjacent kill pairs, m̄ = Y/N, and the
qualifying threshold is `θ_p = 2p − 2η` with η = +1 for p ≡ 1 (mod 6) and η = −1
for p ≡ 5 (mod 6). That last is the **2p′ ∓ 2** form, the correction
`attack-foldL-01-census.md` §0 flagged; the angle-4 engine already carries it and
so does this one.

`attack-foldL-02-bridge.md`'s straddle question does not arise, and it is worth
saying why rather than assuming it. That note's runs straddle a **copy** boundary
of a cyclic tile, an artifact of representing T_x as p copies of a residue word.
A window is not cyclic and has no copies. Its only boundary artifacts are the two
end gaps, excluded throughout, and the least-factor slots n = p and n = p²−2
below p², a couple per fold against ~2Y/(p·m̄).

## 1. The engine, and why its inner loop is new

Angle 4's engine owns this object. What could not be reused is its data
structure: it materialises a doubly linked list over all M = Y/6 positions, which
is about 7 GB of typed arrays at Y = 2·10⁹ and would be 70 GB at Y = 2·10¹⁰. So
the inner loop here is a chunked, streaming re-derivation of the same quantities.

The identity that makes chunking **exact rather than approximate**: the level-p
object is `{n : key(n) = 0 or key(n) ≥ p}`, so two slots i < j with key = p are
adjacent at level p if and only if every slot strictly between them has key < p.
The entire fold history is therefore a local function of the key *sequence*, and
one left-to-right pass with a stack of strictly decreasing keys computes every
run at every fold at once: a new key k pops, and thereby closes the run of, every
stack entry with a smaller key; extends the run if the surviving top equals k;
starts a new run otherwise; key 0 is the sentinel +∞. The stack carries across
chunk boundaries, so there is no margin, no overlap and no boundary
approximation. Memory is one `Uint16Array` per chunk, flat in Y.

The same stack yields the record gap of every level for free. When a slot arrives
it becomes the predecessor of every level ≤ its key, so each popped entry
contributes one genuine gap to a contiguous band of levels; recording it at the
band's floor and sweeping upward with a running max is valid because the level-p
object is a subset of the level-q object for q < p, so a gap can only grow.

## 2. Calibration: VERDICT CLEAN

**Thirty figures of angle 4's embedded tail are asserted digit for digit and all
thirty reproduce**, from an engine sharing no data structure with it. The
assertions cover the slot count, N/kills/runs/X/L at folds 5, 7, 23, 29, 421 and
1451, G₂ = 258 after fold 29, and every summary statistic of the closure section:
last fold with L ≥ 2 = 421, last fold with θ ≤ G₂ = 1021, 58 folds of 237 with
L ≥ 2, max L = 3, Σ(L−1) = 64, ΣX = 20,317,943. m̄(421) = 89.15 and
θ/m̄ = 9.467 also reproduce. **No disagreement with the record was found**, so
the test proceeded.

Two things the calibration adds to the record rather than contradicting it.

**The crossing arithmetic, exactly.** At p = 421, ln(kills) = 11.569 and
2c·p/m̄ = 11.522 at c = 1.22; the c making the two sides equal is 1.2250. At the
next fold, 431, the left side is 11.742 against 11.540, so the crossing is at 421
and the record's "11.6 at c = 1.22" was rounded up rather than computed. The
conclusion is unchanged.

**The record's per-decade "effective c" is biased low, and by a mechanism worth
naming.** It is computed as `−ln(ΣX/Σkills) / mean(θ/m̄)` over a decade. Inside a
decade the pairs all sit at the *smallest* θ/m̄ while the mean θ/m̄ is far larger,
so dividing an aggregate log-ratio by a mean understates c. Maximum likelihood on
the same folds gives 1.545, 2.594, 2.052, 1.950 and 1.656 against the record's
1.439, 2.435, 1.738, 1.550 and 1.171. **So the record's reading that c "drifts
below the bracket at the closure point" is that bias, not a drift.** This does not
move any conclusion of angle 4: the ln²x factor there is a statement about the
tile, and it survives any c in the bracket.

## 3. PRE-REGISTRATION

*Everything in this section was produced by `STAGE=predict node
research/attack-foldL-06-scaling.js`, which stops before touching any window
other than the calibration one, and was written here before the measurement ran.
The prediction code is deterministic, so the same text appears in the embedded
block of the full run and can be checked against this section line by line.*

### 3.1 Calibrating the estimator before fitting

The campaign keeps paying for skipping this. Two models were fitted to the
Y = 2·10⁹ pairs, and only one of them reproduces the Y = 2·10⁹ *statistics* the
test is scored on:

| model | c | A | last-pair median | 10–90% band | N2(p ≥ 100) | S1(p ≥ 100) |
|---|---|---|---|---|---|---|
| 1: `X_p ~ Poisson(kills·e^(−c·θ/m̄))` | 1.9496 | 1 | 277 | [241, 331] | 27.4 | 28.2 |
| 2: `X_p ~ Poisson(kills·A·e^(−c·θ/m̄))` | 1.0818 | 2.4312e−2 | 431 | [367, 521] | 42.6 | 50.9 |
| **measured at 2·10⁹** | | | **421** | | **37** | **37** |

**Model 1 is the law exactly as the record writes it, and it is refuted as a
fitting model on its own calibration window before any new window is touched.**
It puts the last pair at fold 277 against the truth 421, and predicts 27.4 folds
with a pair against 37. Model 2 adds one amplitude, which is not a fudge: the
mechanism produces one, since a gap qualifies when it is 0 or ±2 mod p, three
residues out of p among multiples of 6, so the rate carries a prefactor of order
6/m̄ before any exponential is taken. Model 1 forces that prefactor to 1. Model 2
lands the extinction fold at 431 against 421 and brackets it, so **model 2 is
adopted for bands and counts.**

Model 2 is not unbiased either, and the bias is disclosed and priced. Decade by
decade at Y = 2·10⁹:

| decade | folds | X meas | X pred | N2 meas | N2 pred |
|---|---|---|---|---|---|
| [100, 200) | 21 | 1,937 | 1,930.7 | 21 | 21.0 |
| [200, 300) | 16 | 66 | 65.2 | 13 | 14.9 |
| [300, 500) | 33 | 3 | 8.4 | 3 | 6.5 |
| [500, 1000) | 73 | 0 | 0.2 | 0 | 0.2 |
| [1000, 1500) | 71 | 0 | 0.0 | 0 | 0.0 |

Exact through p = 300, about a factor 2 hot beyond it, which is exactly the
regime that sets the extinction point. Count bands are therefore widened by a
flat ±30% on top of two Poisson standard deviations.

**REFUTED, and pre-registered as refuted: the run-length extension.** Chaining
the same rate to runs of length ℓ gives `kills·A·r^(ℓ−1)` runs of length ≥ ℓ,
which at Y = 2·10⁹ predicts 8.3 folds with p ≥ 100 carrying L ≥ 3. Measured:
zero. Every one of the 37 folds with p ≥ 100 and L ≥ 2 has L exactly 2. The cause
is alternation again: a run of 3 needs two consecutive qualifying gaps in
opposite channels, and the independence model does not know that
(`attack-foldL-01-census.md` §1). **So S1 is predicted equal to N2 in every
window**, and the geometric value is carried only as the contrast it is.

The same alternation cap is why no prediction is made below p = 100 at all. The
model there predicts L = 11 at fold 7 against the truth 2, L = 6 at fold 23
against 3, L = 4 at fold 53 against 3. Shallow folds are reported as raw data.

### 3.2 The predictive machine, in full

- `kills(Y,p) = (Y / m̄_before(p)) · (2/p)`, with m̄_before(p) the measured
  Y = 2·10⁹ value. That is legitimate because **m̄(p) carries no Y dependence and
  no drift with height at all (PROVEN):** key(n) depends only on n mod
  ∏(q ≤ 1499), so the level-p density is exactly periodic. Against the Mertens
  product 6/∏(1−2/q) the measured m̄ agrees to 1.00000 at folds 5, 13 and 29 and
  to 1.00050 at fold 421.
- `E[X_p] = kills(Y,p) · A · exp(−c·θ_p/m̄_before(p))`, A = 2.4312e−2,
  c = 1.0818 ± 0.0317.
- **Point prediction of the extinction fold, in the law's own literal §8
  arithmetic:** the last fold with `2c·p/m̄(p) ≤ ln kills(Y,p)` at the record's
  c = 1.22.
- **Band:** 10th to 90th percentile of the last-pair distribution under
  `P(last ≥ p) = 1 − exp(−Σ_{q≥p} E[X_q])`, unioned over c ∈ [c−3se, c+3se] with
  A profiled at each c, i.e. over c ∈ {0.987, 1.018, 1.082, 1.145, 1.177}.
- **Counts**, better powered than any single last event: N2(Y) = number of folds
  p ≥ 100 with L ≥ 2; S1(Y) = Σ_{p≥100}(L−1). Acceptance band on both:
  prediction × [0.7, 1.3], then widened by ±2 Poisson standard deviations.

### 3.3 The predictions

| Y | crossing p* (c = 1.22) | survival p* median | 10–90% band | N2 pred | N2 accept | S1 pred | S1 accept | S1 geometric (refuted) |
|---|---|---|---|---|---|---|---|---|
| 2·10⁷ | 233 | 211 | [163, 311] | 10.6 | 3.4 – 17.9 | 10.6 | 3.4 – 17.9 | 10.8 |
| 2·10⁸ | 317 | 311 | [241, 439] | 25.7 | 13.5 – 37.8 | 25.7 | 13.5 – 37.8 | 27.6 |
| 2·10¹⁰ | 523 | 557 | [457, 719] | 60.8 | 37.7 – 83.9 | 60.8 | 37.7 – 83.9 | 79.4 |
| *2·10⁹ (calibration, not a test)* | 421 | 431 | [347, 577] | 42.6 | fitted | 42.6 | fitted | 50.9 |

Predicted count of folds with L ≥ 2 by decade of p:

| decade | 2·10⁷ | 2·10⁸ | 2·10⁹ | 2·10¹⁰ |
|---|---|---|---|---|
| [5, 10) | 2.0 | 2.0 | 2.0 | 2.0 |
| [10, 30) | 6.0 | 6.0 | 6.0 | 6.0 |
| [30, 100) | 15.0 | 15.0 | 15.0 | 15.0 |
| [100, 300) | 10.5 | 24.8 | 35.9 | 37.0 |
| [300, 1000) | 0.1 | 0.8 | 6.7 | 23.8 |
| [1000, 1500) | 0.0 | 0.0 | 0.0 | 0.0 |

The first three rows carry no prediction; they are printed for completeness.

**The offset prediction.** By the exact periodicity above,
`[10000000002, 10000000002 + 2·10⁹)` must be statistically identical to
`[0, 2·10⁹)`: extinction fold inside the same [347, 577] band, N2(p ≥ 100) within
2 Poisson standard deviations of the anchored-at-zero value. There is no height
drift to allow for, so a material move would falsify the periodicity argument,
not H″.

*The anchor is 10000000002 and not 10¹⁰ because the first offset run used 10¹⁰,
which is ≡ 4 (mod 6), so `n = A + 6i + 5` walked n ≡ 3 (mod 6): multiples of 3,
not twin slots. Every number it produced was about the wrong object and none of
them looked wrong. The engine now throws unless the anchor is a multiple of 6.*

### 3.4 The kill criterion, stated before the data exists

- **CONFIRMED** if at all three new windows: (a) the measured last L ≥ 2 fold
  lies inside its 10–90% band; (b) measured N2(p ≥ 100) lies inside its
  acceptance band; (c) measured S1(p ≥ 100) likewise; and (d) the measured
  extinction fold is strictly increasing across 2·10⁷ < 2·10⁸ < 2·10⁹ < 2·10¹⁰.
- **PARTIAL** if (d) holds and (b) holds at 2 of the 3 new windows, but (a) or
  (c) fails somewhere, and no measured extinction fold misses its band by more
  than a factor 1.5 in p.
- **BROKEN** if (d) fails, or (b) fails at 2 or more of the 3 windows, or a
  measured extinction fold misses its band by more than a factor 1.5 in p at any
  window.

CONFIRMED promotes H″ from observation to calibrated law. BROKEN retires it.
PARTIAL leaves it an observation with a known scaling.

## 4. Measured

*Everything below is output of `research/attack-foldL-06-scaling.js`, whose tail
is formally embedded (`node research/qc/embed.js
research/attack-foldL-06-scaling.js --streams both --timeout 1800`, 96.5 s). No
figure here was typed by hand from a terminal. The Y = 2·10¹⁰ window sieves
3,333,333,333 slots in 78.7 s inside 548 MB, in chunks of 10⁸ slots.*

| Y | last L ≥ 2 fold | crossing pred | survival pred | band | in band | N2 meas | N2 pred | S1 meas | S1 pred |
|---|---|---|---|---|---|---|---|---|---|
| 2·10⁷ | **181** | 233 | 211 | [163, 311] | yes | **8** | 10.6 | **8** | 10.6 |
| 2·10⁸ | **331** | 317 | 311 | [241, 439] | yes | **21** | 25.7 | **21** | 25.7 |
| 2·10⁹ | *421* | *(calibration)* | *431* | *[347, 577]* | | *37* | *42.6* | *37* | *42.6* |
| 2·10¹⁰ | **457** | 523 | 557 | [457, 719] | yes | **50** | 60.8 | **50** | 60.8 |

Full-window totals over all 237 folds, with no prediction attached below p = 100:

| Y | folds with L ≥ 2 | Σ(L−1) | max L | last fold with θ ≤ G₂ | G₂ at fold 1499 |
|---|---|---|---|---|---|
| 2·10⁷ | 29 | 31 | 3 | 463 | 1458 |
| 2·10⁸ | 42 | 46 | 3 | 607 | 1560 |
| 2·10⁹ | 58 | 64 | 3 | 1021 | 2220 |
| 2·10¹⁰ | 71 | 81 | 4 | 1021 | 2220 |

Counts of folds with L ≥ 2 by decade of p, measured against predicted:

| decade | 2·10⁷ | 2·10⁸ | 2·10⁹ | 2·10¹⁰ |
|---|---|---|---|---|
| [5, 10) | 1 / 2.0 | 1 / 2.0 | 1 / 2.0 | 1 / 2.0 |
| [10, 30) | 5 / 6.0 | 5 / 6.0 | 5 / 6.0 | 5 / 6.0 |
| [30, 100) | 15 / 15.0 | 15 / 15.0 | 15 / 15.0 | 15 / 15.0 |
| [100, 300) | 8 / 10.5 | 20 / 24.8 | 34 / 35.9 | 37 / 37.0 |
| [300, 1000) | 0 / 0.1 | 1 / 0.8 | 3 / 6.7 | 13 / 23.8 |
| [1000, 1500) | 0 / 0.0 | 0 / 0.0 | 0 / 0.0 | 0 / 0.0 |

The first three rows carry no prediction and are printed for completeness. By
Y = 2·10¹⁰ the [100, 300) decade has saturated at 37 of 37 folds, so all further
growth in N2 comes from [300, 1000).

## 5. Verdict under the pre-registered rule: CONFIRMED

(a) last-fold in band at 3 of 3; (b) N2 in band at 3 of 3; (c) S1 in band at
3 of 3; (d) the extinction sequence 181 → 331 → 421 → 457 is strictly
increasing. Worst last-fold ratio to the survival median is 1.22. That is
CONFIRMED under §3.4 as written.

**The record's own literal arithmetic does the best of anything here on the
extinction fold.** The crossing `2c·p/m̄(p) = ln kills(Y,p)` at the record's
c = 1.22 predicts 233, 317 and 523 against measured 181, 331 and 457: within
22%, 4% and 13% across three decades of Y it was never fitted on.

**Four things keep this from being a comfortable pass, and all four were visible
in the pre-registration.**

1. **The model is hot, always in the same direction.** Measured over predicted
   N2(p ≥ 100) reads 0.75, 0.82, 0.87 and 0.82 at the four windows. On the deep
   decade [300, 1000) alone, the decade that decides where extinction lands, it
   reads 0/0.1, 1/0.8, 3/6.7 and 13/23.8: a factor near 2 too many predicted at
   the two largest windows. A ±30% band absorbed a bias that is really there.
2. **The 2·10¹⁰ measurement sits exactly on the floor of its band**, 457 against
   a band starting at 457. That is a 90th-percentile event, and it is the same
   hot tail showing up as an extreme.
3. **The one-parameter law is refuted** and what passed is the two-parameter
   form (§3.1). c = 1.22 and c = 1.9496 are two calibrations of the same
   one-parameter shape against two different statistics, and they disagree by
   60%. That disagreement is the misspecification, and the amplitude is what
   reconciles them.
4. **The bands are wide.** The extinction band at 2·10¹⁰ runs from 457 all the
   way to 719, and its count band from 37.7 to 83.9. A wide band is a weak test
   even when it is the honest one.

### The offset check, and what it is actually good for

Moving the same 2·10⁹ length up to `[10000000002, 10000000002 + 2·10⁹)`:

| statistic | anchored at 0 | offset |
|---|---|---|
| last L ≥ 2 fold | 421 | **349** |
| folds with L ≥ 2 | 58 | 61 |
| Σ(L−1) | 64 | 65 |
| N2(p ≥ 100) | 37 | 40 |
| S1(p ≥ 100) | 37 | 40 |
| m̄ at fold 421 | 89.1522 | 89.1763 |
| kills at fold 421 | 105,790 | 107,988 |

m̄ and the kill count move by two parts in a thousand or less, which is the exact
periodicity of §3.2 turning up as measurement rather than argument. The counts
move by 3, ordinary Poisson. **And the extinction fold moves by 72 in p at
identical window length**, which is the most useful number the check produced:
it is the only empirical measurement of the sampling spread of the extreme
statistic. Read the measured sequence 181, 331, 421, 457 against it. The
per-decade increments 150, 90, 36 look decelerating, and against a noise scale of
±72 that deceleration is not established by anything here.

## 6. What this does to the law candidate's status

- **The extinction phenomenon and its scaling with window length: MEASURED**, now
  at four window lengths spanning three decades, with an out-of-sample
  pre-registered test passed on all four criteria. That is a promotion: before
  this it was one window and one fitted constant.
- **The one-parameter density law of `attack-foldL-04-amortized.md` §8,
  `r = exp(−c·θ/m̄)` with a single c: REFUTED as a fitting model.** It cannot
  hold the 2006 pairs at p ∈ [100, 300) and the extinction event at the same c.
- **The two-parameter form `r = A·exp(−c·θ/m̄)`: MEASURED and predictive**, with
  a disclosed systematic of about 20% on counts and about 2 on the deep decade.
- **H″ itself: still UNPROVEN, and still the wall.** Nothing here proves that
  adjacent qualifying gaps are rare given that qualifying gaps are common. What
  changed is that the empirical rate law now has out-of-sample support, so H″ is
  a better-supported conjecture than it was, not a theorem.
- **`attack-foldL-04-amortized.md` §8's tile conclusion is untouched.** The
  ln²x factor there is a statement about a population of size e^{θ(x)}, and four
  bounded windows say nothing about it. Everything confirmed here is localized.

Two corrections to carry back to the record if it is ever integrated: the
per-decade "effective c" values 1.439, 2.435, 1.738, 1.550, 1.171 are biased low
by a Jensen effect (§2), and the crossing at fold 421 is 11.522 rather than 11.6.
Neither changes a conclusion.

## 7. What this does not show

The fold range stops at 1499 in every window. At Y = 2·10¹⁰ the last fold whose θ
still fits under the window's G₂ is 1021, so nothing past 1021 could have carried
a run in any case; the extinction at 457 is well inside that ceiling and is not a
range artifact. The amplitude A = 2.4312e−2 is fitted, not derived: the mechanism
says a prefactor of order 6/m̄ should be there, which is 0.067 at fold 421, and
0.024 is the right order but is not a prediction. The p < 100 folds carry no
prediction at all and were never scored. And the whole test is a test of a
localized object; the window's G₂ is smaller than the tile's at the same fold,
which was already stated in angle 4 §10 and is unchanged.

## 8. Reproduction

```
node research/attack-foldL-06-scaling.js                    # 95 s, all five windows
STAGE=predict node research/attack-foldL-06-scaling.js      # 8 s, stops before any new window
CHUNK=5e7 node research/attack-foldL-06-scaling.js          # same answers, half the memory
```

The chunked engine is exact, not approximate: the stack of decreasing keys
carries across chunk boundaries, so the chunk size changes the memory and nothing
else. Stage A asserts thirty figures of angle 4's embedded tail and aborts on any
disagreement.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
