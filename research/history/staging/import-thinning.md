# Foreign import 3 of 5: interval coalescence and point-process thinning against H″

<!-- ledger
id: Q-import-thinning
status: ANSWERED
todo: 0b
question: Do point-process thinning and interval coalescence give H'' a null model?
verdict: Yes and exactly: the fold recursion is an exactly solvable thinning whose gap pgf transforms by a Mobius map fixing 0 and 1, so under independent thinning the gap word of T_x is exactly geometric with mean mbar/6 at every rung with no error term, which turns both of the record's fitted parameters into derived ones.
-->

*Staging note, 2026-08-19. Proposal only; nothing here is integrated into a live
document. Producers, all three formally embedded:
`research/import-thinning-01-nullmodel.js` (20.5 s),
`research/import-thinning-02-coalescence.js` (19.6 s),
`research/import-thinning-03-deepfolds.js` (21.0 s). Calibration is marked on
every claim: PROVEN, VERIFIED by exact computation, MEASURED, REFUTED.*

## 0. The answer

**The fold recursion is an exactly solvable thinning, and its null model is the
geometric law.** Deleting points of a renewal process independently merges
adjacent intervals, so the new gap is a geometric compound of old ones and the
gap pgf transforms by `φ → qφ/(1−rφ)`. On this recursion that map is a Möbius
transformation fixing 0 and 1, the maps compose multiplicatively, and the whole
ladder from the mod-6 comb up to T_x collapses to a single map. Under
independent thinning the gap word of T_x is **exactly** Geometric with mean
`m̄/6` in comb units, at every rung, with no error term and no limit.

That closed form turns both of the record's fitted parameters into derived ones.
The exponent it forces is `c_null = (m̄/6)·ln(1/(1−6/m̄))`, which falls from
1.527151 at fold 7 to 1.023916 at fold 1499: **c → 1 from above, and 1 is the
thinning fixed point**. Fitted the way the record fits, it gives c = 1.0577
against the record's **fitted** 1.0818 ± 0.0317, a 2.2% gap with zero free
parameters. The amplitude it forces is `3/m̄`, which is the prefactor
`attack-foldL-06-scaling.md` §7 records as "the right order but is not a
prediction".

**The deviation from that null is one term and it can be written down.** The
Fold Moment Identity, assembled here from two identities the corpus already
proves,

> `(p−2)·Φ_new = (p−4)·Φ + Ω + 2·Ψ + Δ`

with `Φ = (1/N)Σe^{λg_i}`, `Ψ = (1/N)Σe^{λ(g_i+g_{i+1})}` the **adjacent-pair**
moment, `Ω = (1/N)Σω_i e^{λg_i}`, and Δ carrying the runs of length ≥ 2. The
null map expands as `(1−2/p)Φ + (2/p)Φ² + O(p⁻²)`. Term by term: the survival
coefficient is smaller under CRT, the merge coefficient is larger, and the merge
term carries **Ψ where the null carries Φ²**. So

> **the entire deviation of CRT thinning from independent thinning, at first
> order in 1/p, is `Ψ − Φ²`,**

which is H″ at m = 2 written as a moment rather than as a conditional count.

**The domination the brief asked for exists and is measured.** Solving
`Φ_new ≤ (1−c′/p)Φ/(1−(c′/p)Φ)` for c′ gives the closed form
`c′_min = p(Φ_new−Φ)/(Φ(Φ_new−1))`, and c′_min < 2 at **52 of 52 measured
cells**, eight folds of the exact tile and six of the localized ladder out to
p = 1009. The true fold is dominated on exponential moments by an independent
thinning at a rate strictly better than its own 2/p.

**And it buys a constant, not an exponent, for a reason that is analytic rather
than empirical.** `c′_min → 2` exactly as λ → 0 at every fold, because the fold
multiplies the mean gap by exactly p/(p−2) and that first-moment fact fixes the
limit. The margin is an O(λ²) effect. A tail bound at level x needs one absolute
λ carried through every fold, and along that trajectory the ladder spends nearly
all of its Σ1/q at λm̄ ≈ 0 where the margin is zero. Composed correctly the
implied exponent is **1.0302, 1.0614, 1.0885, 1.1096** at u_x = 0.25, 0.5,
0.75, 0.9. Composed the way the raw table invites, holding the top fold's margin at
every fold, it would read 1.1104, 1.2322, 1.2988, 1.8158. The gap between those two
columns is the whole of the temptation, and the first column is the honest one.

So: three routes now land on the same number. The record's fit to measured pairs
gives c = 1.0818 ± 0.0317, the closed-form thinning null gives 1.0577, and the
domination composed along the ladder gives 1.0614 to 1.0885. **Nothing here
proves H″.** What the import establishes is that the measured law is the thinning
fixed point plus a second-order correction, that the correction has a sign, and
that the sign is safe.

**And there is a fourth finding, which is the one that decides the route, and it
is negative.** Chase the domination's own consequence. If `Φ_new ≤ T_{2/p}(Φ)`
held at every fold at one fixed λ, induction from the mod-6 comb would give
`Φ_x(λ) ≤` the null geometric, and Markov at θ = G₂ against N = |T_x| points
would give `G₂ ≲ m̄·ln N ≈ 2.4·x·ln²x`. That is verbatim the statement
`a3-05-bound-L.md` §8 calls the naive form and rejects as "far too strong ...
stronger than the Zone Postulate and stronger than anything known". So **the
domination hypothesis is not weaker than the target; it implies it.**
`attack-l1-residue.md` found exactly this failure for the m = 1 base case of H″
and retired that branch. The same failure is now on record for the m = 2 half,
reached from a third direction. The measurements below are evidence FOR the
Zone Postulate. They are not a route TO it.

## 1. Stage 1 — the null model, exactly, with its source

### 1.1 The classical part

Thinning a renewal process by deleting each point independently with probability
r leaves a renewal process whose interval is a geometric compound of the old
one: the number of old intervals swallowed is `K ~ Geom(q)` on {1, 2, …} with
q = 1 − r, so

> `φ_new(w) = q·φ(w)/(1 − r·φ(w))`.

This is standard. It is the thinning of a renewal process (Daley and Vere-Jones,
*An Introduction to the Theory of Point Processes*), the compound-geometric or
defective-renewal tail (Feller vol II, renewal theory), and the Cramér-Lundberg
exponent solving `E[e^{κG}] = 1/r` (Embrechts, Klüppelberg and Mikosch,
*Modelling Extremal Events*). None of it is new.

**CALIBRATION on those three attributions: they are written from memory.** No
copy of any of the three is on this disk, and no chapter or section number is
given because none was checked. §1.2 is self-contained and does not rest on
them; they are named so a reader knows the null model is textbook rather than
invented.

### 1.2 The composed form, derived here

**No prior-art search was run on this, so nothing below claims novelty for it.**
`research/SEARCH-CONVENTIONS.md` governs, and the owning convention for "an
infinite composition of Bernoulli thinnings of a lattice renewal process" has
not been identified, let alone searched. The derivation is elementary and short
enough that it is more likely known than not.

Write the gap in comb units, `κ = G/6`, so the base tile has κ ≡ 1. The map
`w ↦ qw/(1−(1−q)w)` fixes both 0 and 1. Reparameterised by α = 1/q it is
`M_α(w) = w/(α − (α−1)w)`, and a two-line computation gives **`M_a ∘ M_b =
M_{ab}`**. The maps form a one-parameter multiplicative group, so the entire
ladder collapses to one map with

> `α(x) = Π_{5≤q≤x} q/(q−2) = m̄(x)/6`.

`M_α` applied to the pgf of the point mass at κ = 1 is the pgf of the geometric
on {1, 2, …} with mean α. Hence:

> **NULL LAW (VERIFIED to 1.0e−14).** Under independent thinning the gap word of
> T_x has `P(κ = k) = (1/α)ρ^{k−1}`, `ρ = 1 − 6/m̄`, exactly, at every level.
> Its tail is `P(G ≥ θ) = ρ^{θ/6−1}`, exponential with
> `c_null = (m̄/6)ln(1/ρ) = 1 + 3/m̄ + O(m̄⁻²)` in θ/m̄ units.

The group law is checked to 3.7e−16 over 36 triples, and the closed form is
checked against brute-force iteration of the exact pmf recursion
`f_new(k) = q f(k) + r Σ_{j<k} f(j) f_new(k−j)` from δ₁ through folds 5 to 29,
maximum relative deviation 1.02e−14, with mean(κ) equal to α to eight places at
every level.

The amplitude follows too. By `a3-05-bound-L.md` Lemma 2 the qualifying values
are three arithmetic progressions of modulus 6p with least members θ = 2p−2η,
4p+2η and 6p, so under the null law the adjacent-kill-pair density is

> `r_null(p) = (2ρ^{p−1} + ρ^{k_c−1} + ρ^{k_e−1}) / (2α(1−ρ^p))`,
> `k_c = (2p−2η)/6`, `k_e = (4p+2η)/6`,

whose leading term is `(3/m̄)·exp(−c_null·θ/m̄)`. Zero free parameters.

### 1.3 Pre-registration and outcome

Five predictions were written into the script banner and printed by a stage that
stops before touching any measurement. All five are in the embedded tail.

| | prediction | outcome |
|---|---|---|
| **R1** shape | fitted c_null within 10% of the record's 1.0818 | **HELD**, 2.2% (c_null = 1.0577) |
| **R2** amplitude | A_null / A_record in [1.5, 5] | **HELD**, 1.97 (4.7843e−2 vs 2.4312e−2) |
| **R3** residue and its sign | null OVERSHOOTS measured pairs by 2 to 4 at Y = 2·10⁹ | **HELD**, 2.73 (5486.4 against 2006) |
| **R4** extinction | brackets 421 at Y = 2·10⁹, misses high at Y = 2·10¹⁰ | **HELD** as written |
| **R5** decomposition | tail factor carries it, hazard factor within 30% of 1 | **REFUTED**, see §1.5 |

### 1.4 Predicted against measured, in full

The record's fitted model against the derived null, folds p ≥ 100:

| | A | c |
|---|---|---|
| record, Poisson MLE on measured X (`attack-foldL-06-scaling.md` §3.1) | 2.4312e−2 | 1.0818 ± 0.0317 |
| null, same form fitted by OLS in log | 4.7843e−2 | 1.0577 |
| null, weighted by expected pair count | 9.3439e−2 | 1.1601 |

Zero-parameter window predictions against the four measured windows:

| Y | null E[pairs, p≥100] | null E[N2] | null p* median | null band | measured last L≥2 | measured N2 |
|---|---|---|---|---|---|---|
| 2·10⁷ | 54.8 | 16.2 | 251 | [199, 337] | **181** | **8** |
| 2·10⁸ | 548.2 | 31.7 | 359 | [293, 457] | **331** | **21** |
| 2·10⁹ | 5481.9 | 48.9 | 479 | [419, 593] | **421** | **37** |
| 2·10¹⁰ | 54819.1 | 68.1 | 617 | [541, 733] | **457** | **50** |

Measured adjacent pairs against the null, by decade of p at Y = 2·10⁹:

| decade | folds | mean θ/m̄ | X meas | X null | meas/null |
|---|---|---|---|---|---|
| [5, 10) | 2 | 1.600 | 19,047,619 | 7.449e+6 | 2.5572 |
| [10, 30) | 6 | 1.747 | 1,087,762 | 3.161e+6 | 0.3441 |
| [30, 100) | 15 | 2.904 | 180,556 | 1.963e+5 | 0.9200 |
| [100, 300) | 37 | 5.674 | 2,003 | 5.467e+3 | 0.3664 |
| [300, 1000) | 106 | 12.588 | 3 | 1.962e+1 | 0.1529 |
| [1000, 1500) | 71 | 20.606 | 0 | 1.512e−4 | 0 |

The ratio falls with depth. The true process is progressively further below
independent thinning the deeper the fold, which is the safe direction.

### 1.5 Why R5 was refuted, and what replaced it

R5 expected the overshoot to be almost all tail. It is not. In the window:

| fold | θ | #{g = θ} | #{g ≥ θ} | null #{g ≥ θ} | tail factor | hazard meas | hazard null | hazard factor |
|---|---|---|---|---|---|---|---|---|
| 101 | 204 | 26,361 | 304,983 | 6.824e+5 | 0.4470 | 0.08643 | 0.11490 | 0.7442 |
| 211 | 420 | 4,669 | 19,422 | 5.965e+4 | 0.3256 | 0.24040 | 0.08553 | 2.8057 |
| 421 | 840 | 42 | 220 | 1.338e+3 | 0.1644 | 0.19091 | 0.06762 | 2.8232 |

The one-point tail at θ ≈ 2p is three to six times **lighter** than geometric and
getting lighter with depth, while the discrete hazard `P(g = θ | g ≥ θ)` is
about 2.8 times the null's constant `1/α`. Those two are not independent: a tail
that falls faster than geometric puts more of its conditional mass on the
threshold itself. Read together they say the gap word above 2p is not geometric,
it is steeper, and the steepness is what the fitted amplitude was absorbing.

## 2. Stage 2 — the CRT deviation, quantified

### 2.1 The structural difference, stated exactly

Under independent Bernoulli(2/p) deletion of the pN slot copies, the two
endpoints of any gap die together with probability 4/p², whatever the gap. Under
the fold, by the Merge Rate Identity (`attack-foldL-04-amortized.md` §2, PROVEN
there), they die together in exactly ω of the p copies, ω = 2/1/0 by residue,
and ω ≥ 1 holds exactly on the qualifying gaps, which by
`a3-05-bound-L.md` Lemma 2 are all at least θ = 2p−2η. **CRT coalescence is
all-or-nothing and size-biased**: probability 0 for a non-qualifying gap against
the null's 4/p², and ω/p for a qualifying one, a factor p/4 up.

On the exact tile that reads:

| fold | tile | N | θ | θ/m̄ | X meas | X null | meas/null | X indep | meas/indep |
|---|---|---|---|---|---|---|---|---|---|
| 7 | T₅ | 3 | 12 | 1.200 | 2 | 7.821e−1 | 2.557 | 1.714e+0 | 1.17e+0 |
| 11 | T₇ | 15 | 24 | 1.714 | 0 | 1.474e+0 | 0.000 | 5.455e+0 | 0.00e+0 |
| 13 | T₁₁ | 135 | 24 | 1.403 | 6 | 1.504e+1 | 0.399 | 4.154e+1 | 1.44e−1 |
| 17 | T₁₃ | 1,485 | 36 | 1.780 | 72 | 9.225e+1 | 0.781 | 3.494e+2 | 2.06e−1 |
| 19 | T₁₇ | 22,275 | 36 | 1.571 | 1,088 | 1.485e+3 | 0.733 | 4.689e+3 | 2.32e−1 |
| 23 | T₁₉ | 378,675 | 48 | 1.874 | 11,870 | 1.635e+4 | 0.726 | 6.586e+4 | 1.80e−1 |
| 29 | T₂₃ | 7,952,175 | 60 | 2.139 | 243,822 | 2.216e+5 | 1.100 | 1.097e+6 | 2.22e−1 |
| 31 | T₂₉ | 214,708,725 | 60 | 1.991 | 8,025,014 | 6.415e+6 | 1.251 | 2.770e+7 | 2.90e−1 |

The geometric gap law is a good model of the **word**, within a factor 2.5 at
every reachable fold. Independent deletion is a bad model of the **fold**, off by
3 to 7 at the same folds and by orders of magnitude deeper.

### 2.2 Total variation per fold, and where CRT is heavier

The reference law is the exact compound-geometric thinning of the **same** old
word, `f = qh + r(h∗f)` with h the measured old histogram, so the comparison
isolates the thinning structure and not the gap law.

| tile | p | TV | largest excess bands (gap: CRT/indep) | P(≥θ) true/indep | P(≥2θ) | P(≥3θ) |
|---|---|---|---|---|---|---|
| T₅ | 7 | 0.18069 | 12: 1.07× \| 30: 4.83× \| 18: 1.44× | 1.050 | 0.784 | 0.000 |
| T₇ | 11 | 0.06567 | 30: 1.20× \| 18: 1.16× \| 36: 1.71× | 1.054 | 0.000 | 0.000 |
| T₁₁ | 13 | 0.04116 | 30: 1.14× \| 18: 1.04× \| 42: 1.17× | 1.038 | 0.708 | 0.000 |
| T₁₃ | 17 | 0.03085 | 30: 1.09× \| 18: 1.01× \| 42: 1.15× | 0.982 | 0.767 | 1.058 |
| T₁₇ | 19 | 0.02394 | 30: 1.06× \| 18: 1.00× \| 42: 1.11× | 0.995 | 0.943 | 1.039 |
| T₁₉ | 23 | 0.01765 | 30: 1.04× \| 42: 1.07× \| 48: 1.02× | 0.978 | 0.894 | 0.432 |
| T₂₃ | 29 | 0.01397 | 30: 1.03× \| 42: 1.04× \| 60: 1.06× | 1.011 | 0.980 | 0.409 |

**The pre-registered prediction S5 is refuted, and the direction is the opposite
of what was predicted.** The excess of CRT over independent thinning sits in the
**bulk**, at gaps 18, 30 and 42 at every fold, never near θ or 2θ. In the far
tail CRT is at or below independent thinning, by a factor 2.4 at 3θ for folds 23
and 29. The mechanism is clear in hindsight: independent thinning merges bulk
gaps at random and manufactures a tail out of nothing, while CRT merges only at
qualifying gaps, leaves the bulk alone, and makes far fewer of the long
coalescences that build a heavy tail. TV falls monotonically and is under 0.05
from fold 13 on, ahead of the predicted fold 17.

### 2.3 The Fold Moment Identity

> **Fold Moment Identity (PROVEN from the Merge Rate and Consumption
> Identities, VERIFIED at 7 folds × 4 values of λ).**
> `(p−2)Φ_new = (p−4)Φ + Ω + 2Ψ + Δ`, where Δ collects the kill runs of length
> ≥ 2 replacing pairs of single merges and is supported entirely on the X
> adjacent kill pairs.

Every new gap is either a surviving copy of an old gap, and there are exactly
p−4+ω_i of those for gap i, or the span of a kill run, and there are M = 2N−X of
those. With all runs of length 1 the run term is exactly 2Ψ, because each killed
slot dies in exactly 2 copies. There is no error term.

Custody on the way: the run-length spectra `1:733672 2:11746 3:62` at fold 23 and
`1:15416706 2:243822` at fold 29, `X = 2·86 + 10462 + 1236 = 11870` at fold 23,
and `X = 2N − M` at 7 of 7 folds, all reproduce the spend ledger of
`attack-foldL-04-amortized.md` §5 from an engine that computes them differently.

**Δ is second order, so the recursion closes at the pair level.** Its share of
`(p−2)Φ_new` at u = 0.5 reads −3.78e−3, −1.43e−3, −9.53e−4, −1.11e−3, −1.10e−3
at folds 13, 17, 19, 23, 29. Since Δ is the entire contribution of every m ≥ 3
adjacent-gap sum, **H″ is invoked at m = 2 and at m ≥ 3 only to second order.**

## 3. Stage 3 — the coupling attempt

### 3.1 What was tried, and what replaced it

A monotone coupling would need the CRT-deleted set to be a randomisation of an
independently-deleted set. It is not, and the obstruction is not technical. The
CRT-deleted set is `{n : n ≡ d or d−2 (mod p)}` for a single offset d, a
deterministic union of two residue classes, and the same 2-set applies to every
copy of the tile. Conditional on which gaps merge, the two processes are
mutually singular in the direction that matters: under CRT the merging gaps are
exactly the qualifying ones, all ≥ 2p−2η, and under independent thinning they
are a uniform random selection. There is no monotone map from one to the other,
because the CRT merge event is a **function of the gap value** and the
independent one is independent of it.

What survives is domination on exponential moments, which is what a tail theorem
actually needs. Solving `Φ_new ≤ (1−c′/p)Φ/(1−(c′/p)Φ)` gives

> `c′_min(λ) = p·(Φ_new − Φ)/(Φ·(Φ_new − 1))`.

`c′_min < 2` means the true fold is dominated by an independent thinning at a
rate better than its own. By Markov that is an exponential tail bound. It is not
a stochastic order and is not presented as one.

### 3.2 The measurement

**c′_min < 2 at 52 of 52 cells.** On the exact tile, folds 7 to 29:

| fold | u = 0.25 | 0.50 | 0.75 | 0.90 |
|---|---|---|---|---|
| 7 | 1.9181 | 1.8105 | 1.6722 | 1.5743 |
| 11 | 1.8553 | 1.6797 | 1.4763 | 1.3441 |
| 13 | 1.9010 | 1.7796 | 1.6321 | 1.5297 |
| 17 | 1.9434 | 1.8772 | 1.7922 | 1.7252 |
| 19 | 1.9508 | 1.8866 | 1.7909 | 1.7066 |
| 23 | 1.9490 | 1.8769 | 1.7636 | 1.6621 |
| 29 | 1.9524 | 1.8785 | 1.7537 | 1.6389 |

In the localized frame, out to p = 1009:

| fold | u = 0.25 | 0.50 | 0.75 | 0.90 | K = Ψ/Φ² at u = 0.9 |
|---|---|---|---|---|---|
| 31 | 1.9535 | 1.8779 | 1.7460 | 1.6241 | 0.91459360 |
| 53 | 1.9523 | 1.8700 | 1.7318 | 1.6116 | 0.89124837 |
| 101 | 1.9574 | 1.8873 | 1.7696 | 1.6570 | 0.90691716 |
| 211 | 1.9811 | 1.9298 | 1.8332 | 1.7187 | 0.91551525 |
| 421 | 1.9537 | 1.9133 | 1.8229 | 1.6969 | 0.91498039 |
| 1009 | 1.8579 | 1.8311 | 1.7907 | 1.4812 | 0.84059770 |

`K = Ψ/Φ² < 1` at all 28 tile cells and all 24 window cells, so **adjacent gaps
are negatively associated at exponential order**, which is H″(m = 2) as a moment.
The range on the tile is 0.89362755 to 0.99894799.

**But negative association is not where the margin comes from.** The exact
criterion for domination by the fold's own null map is `K < K_crit` with
`K_crit = [Φ(2+(p−4)Φ)/(p−2Φ) − (Ω+Δ)/2]/Φ²`, and K_crit is **greater than 1**:
1.00443540 at fold 29 and u = 0.25, rising to 1.11721750 at u = 0.9. The slack is
there because CRT destroys 4−ω ≥ 2 copies of every gap while independent thinning
expects 2. Negative association is sufficient and far from necessary. The
pre-registered proxy `K < 1 − 4/p` was a bad large-p approximation of this and is
withdrawn.

### 3.3 Solvable variants, and what breaks in the transfer

The nearest exactly solvable neighbour is **uniform deletion under
exchangeability**: the spacings of a uniform subsample of exchangeable spacings
stay exchangeable, and for i.i.d. uniform points on a circle the k-subsample
spacings are again the spacings of k uniform points, with negative-binomial
composition (Pyke, "Spacings", *JRSS-B* 27 (1965) 395–449). The renewal version
is the compound geometric of §1.1. Both are used here as the null.

What breaks in the transfer, in order of severity.

1. **There is no probability space.** The tile's gap word is a single
   deterministic cyclic word. Every "law" above is the empirical measure of that
   word, and every "independence" statement is a statement about its
   autocorrelation. Exchangeability is not weakened here, it is absent.
2. **The deleted set is algebraic, not uniform.** Two residue classes mod p,
   the same two in every copy. Deletions at distance ≡ 0 mod p are perfectly
   correlated, which is precisely the structure the exchangeable calculation
   assumes away.
3. **The merge event depends on the gap value.** This is the one that kills the
   coupling: under CRT a gap merges only if it is 0 or ±2 mod p, hence only if
   it is at least 2p−2η. Under every solvable variant the merge event is
   independent of the interval it merges.

Item 3 is also why the import is useful rather than vacuous. It is exactly the
Merge Rate Identity, it is already PROVEN in this corpus, and it is what makes
the CRT fold quieter than its own null instead of noisier.

## 4. Stage 4 — the verdict

### 4.1 The theorem candidate

> **Fold Tail Propagation (CONDITIONAL, and see §4.3 for what the condition
> costs).** Fix λ. Suppose `Φ_new(λ) ≤ (1−c′/p)Φ(λ)/(1−(c′/p)Φ(λ))` at every
> fold p of the ladder, with c′ ≤ 2. Then, since the dominating maps compose by
> the Möbius group law of §1.2 and the base tile has `Φ = e^{6λ}` exactly, the
> gap word of T_x satisfies `P(G ≥ θ) ≤ C·exp(−c·θ/m̄)` with
> `c = m̄/(6·Π q/(q−c′)) ≥ 1`.

The hypothesis is exactly a bound on Ψ. By the Fold Moment Identity,
`c′ ≤ 2` rearranges into an upper bound on the adjacent-pair exponential moment
Ψ in terms of Φ, Ω and Δ. **The condition is H″ at m = 2, in moment form**, with
m ≥ 3 entering only through Δ at second order. The base case m = 1 is not
assumed anywhere: the induction starts at the mod-6 comb, whose gap law is δ₆
and is known exactly.

### 4.2 Whether the condition is the known wall

**It is the wall, it is the half of the wall the corpus deliberately left
unconstrained, and it turns out to sit on the wrong side of it.**

`a3-05-bound-L.md` §8 states H″ for m ≥ 2 and says "The base case m = 1 is left
unconstrained, which is what keeps H'' from implying its own conclusion".
`attack-l1-residue.md` then showed that the m = 1 base case, reinstated as the
L = 1 residue count, **is** the Zone Postulate in residue notation, and
`research/REFUTED.md` carries it as REFUTED for that reason.

The condition derived here needs only m = 2. On the naming question it is
therefore clean:

- it is **not** the L = 1 residue count, and does not assume it,
- it is **not** Assumption A, which `ZONE-POSTULATE.md` §5 assigns to the
  population side while "the destruction side's open object is H″",
- it **is** H″(m = 2), reached from a third direction.

**But the direction of implication runs the wrong way, exactly as it did for the
m = 1 case.** The induction of §4.1 turns an m = 2 hypothesis at every level into
an m = 1 conclusion at the top, and that conclusion is the naive form:

> `Φ_x(λ) ≤` null geometric, for all λ < ln(1/ρ)/6
> ⟹ `#{i : g_i ≥ θ} ≤ N·ρ^{θ/6−1}`
> ⟹ taking θ = G₂ and requiring the count to reach 1,
> `G₂ ≤ m̄·ln N·(1+o(1)) ≈ 2.4·x·ln²x`
> ⟹ the Zone Postulate, since `x·ln²x = o(x²)`.

`a3-05-bound-L.md` §8 already rejected that consequent: "The naive form, that
the number of gaps at least theta is at most N*exp(-c*theta/mbar), is far too
strong". It is not known to be false. It is known to be stronger than the
target, and this attack's condition implies it. So H″(m = 2) in exponential-
moment form is at least as hard as the Zone Postulate, and the branch that
hoped it was easier is closed by the same argument that closed the m = 1 branch.

What survives as a positive is the convergence itself.
`attack-foldL-04-amortized.md` §9 reaches H″ from the genealogy ledger,
`attack-foldL-06-scaling.md` §6 reaches it from out-of-sample scaling, and
point-process thinning reaches it from the moment recursion. Three instruments,
one statement, and now a fourth fact about that statement: in its moment form it
is not a weaker sub-goal but a stronger one.

### 4.3 The second reason the candidate does not become a theorem

§4.2 is the first and it is fatal on its own: the hypothesis implies the target.
There is a second, independent of it, and it constrains what a weakened version
could ever buy.

`c′_min → 2` **exactly** as λ → 0, at every fold, and the argument is one line.
Expanding, `Φ = 1 + λm̄ + O(λ²)` and `Φ_new = 1 + λm̄·p/(p−2) + O(λ²)`, the second
because the fold multiplies the mean gap by exactly p/(p−2), which is PROVEN
since 2N of the pN slot copies die. Substituting into the closed form gives

> `c′_min → p·[λm̄·2/(p−2)] / [λm̄·p/(p−2)] = 2`.

So δ is not a property of the fold, it is a second-and-higher-moment effect.
Measured, `(2−c′_min)/u²` sits between 0.281 and 0.764 at 23 of the 24 deep
cells, which is the O(λ²) law showing up as data. The 24th is fold 1009 at
u = 0.25, ratio 2.274, and it is the one place the instrument is thin: at that
depth the level word has almost no gaps at the scale the small-λ moment weighs.
It is reported and not leaned on.

That is fatal to the composition. A tail bound at level x needs one absolute λ
carried through every fold of the ladder, and along that trajectory
`u_q = u_x·m̄(q)/m̄(x)` is small at every fold below the top. The ladder spends
nearly all of its Σ1/q at u ≈ 0 where the margin is zero. Composed on the right
trajectory:

| u at the top fold | m̄ truth | m̄ dominating | ratio | implied exponent c |
|---|---|---|---|---|
| 0.25 | 129.626 | 125.822 | 0.9707 | **1.0302** |
| 0.50 | 129.626 | 122.130 | 0.9422 | **1.0614** |
| 0.75 | 129.626 | 119.088 | 0.9187 | **1.0885** |
| 0.90 | 129.626 | 116.822 | 0.9012 | **1.1096** |

against the unlicensed version, holding the top fold's margin at every fold:

| u | ratio | implied exponent |
|---|---|---|
| 0.25 | 0.9005 | 1.1104 |
| 0.50 | 0.8116 | 1.2322 |
| 0.75 | 0.7699 | 1.2988 |
| 0.90 | 0.5507 | 1.8158 |

Pre-registration U2 predicted the margin would decay in p. It does not: at
u = 0.25 it reads 4.650e−2, 4.775e−2, 4.259e−2, 1.891e−2, 4.628e−2, 1.421e−1
across p = 31 to 1009, and `p(2−c′_min)` grows from 1.4414 to 143.4090, while
`1 − K` at u = 0.25 sits flat between 2.046e−3 and 3.736e−3. **U2 is
refuted as stated and its conclusion survives anyway**, because the margin decays
in λ rather than in p and the fixed-λ trajectory forces λm̄ → 0 down the ladder.
U1, U3 and U4's consequence all hold.

## 5. What this does not show

The domination is measured at 52 cells and proven at none. Every step of §4.1 is
conditional on the measured `c′_min(u)` curve holding at folds nobody has
reached, and the deepest fold measured is 1009 against a ladder that is supposed
to run to x. The exponential-moment domination gives a Chernoff tail bound, which
is weaker than the stochastic domination the brief asked about, and §3.3 item 3
says a stochastic domination is unavailable rather than merely unproven. The
localized frame measures the localized object: the window's level-p word is a
segment of a tile whose modulus is astronomically larger than the window, and
`attack-foldL-06-scaling.md` §7's warning that the window's G₂ is smaller than
the tile's at the same fold applies here unchanged. The four values of λ tested
are λm̄ ∈ {0.25, 0.5, 0.75, 0.9}; nothing is measured at λm̄ ≥ 1, where the null
geometric's own moment diverges, and the interpolation in §4.3 is linear in u
between those four points with c′ clamped to 2 at u = 0. The gaps above
`6·400 = 2400` are excluded from every moment in the localized frame; at
Y = 2·10⁹ the window's G₂ at fold 1499 is 2220, so nothing was excluded in
practice, but the cap is in the code and would bite at larger Y. Finally the
statement that three routes agree on c ≈ 1.06 to 1.09 is an agreement among
three models of the same measurement, not three independent measurements.

## 6. Reproduction

```
node --max-old-space-size=8000 research/import-thinning-01-nullmodel.js    # 20.5 s
STAGE=predict node research/import-thinning-01-nullmodel.js               # 0.1 s, stops before any measurement
node --max-old-space-size=8000 research/import-thinning-02-coalescence.js # 19.6 s
DEEP=1 node --max-old-space-size=8000 research/import-thinning-02-coalescence.js  # adds fold 31 on T_29
node --max-old-space-size=8000 research/import-thinning-03-deepfolds.js   # 21.0 s
WINY=2e8 node --max-old-space-size=4000 research/import-thinning-03-deepfolds.js
```

The tile ladder is generated from the mod-6 comb by the fold recursion, never
sieved, and reproduces N = Π(q−2) and the G₂ ladder 12, 30, 42, 66, 108, 150,
204, 258 at 8 of 8 levels inside every script. The window engine reproduces 24
figures of the `attack-foldL-06-scaling.js` embedded tail digit for digit and
aborts on any disagreement.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
