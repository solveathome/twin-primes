# Gap genealogy amortization: charging kill-runs to the birth of what they consume

<!-- ledger
id: Q-foldL-amortized
status: CLOSED
todo: none
question: Can the fold multiplier L be bounded by charging kill-runs to the birth of the gaps they consume?
verdict: The accounting does not close on the tile: the Consumption Identity makes the charge exact and the bound is then only as good as X = 2Q0 + Q+ + Q-, and supply against demand fails on the tile at every x by exactly the factor ln^2 x; it closes in a localized window from p about 421 on, which is a statement about a bounded population only.
-->

*(2026-08-19, attack angle 4 of 4 on the fold multiplier L. Producers, both
embedded: `research/attack-foldL-04-genealogy.js`, the exact tiles T₅ to T₂₉
plus fold 31 statistics, 41 s; `research/attack-foldL-04-localized.js`, a
2·10⁹ window carrying 237 folds to p = 1499, 25 s. Calibration marked on every
claim: PROVEN, VERIFIED by exact computation, MEASURED, REFUTED. Nothing is
recomputed that an embedded artifact already holds: `birth-cohorts.js` owns the
SLOT cohorts and is cited, `gate-multiplies-03.js` owns maxsum_m(T₂₉),
`a3-05-bound-L.md` owns Theorem B and L's diagonal, `fold-succession-autocorr.md`
owns succession damping. `genealogy.js` is not used at all.)*

## Pre-registration

Stated in both script banners before the first run.

**P1** creation rate: exactly 2·N_old slots die per fold, so newly born gaps
number M = 2·N_old − X and the born-at-p share of T_new is ≈ 2/(p−2).
**P2** destruction rate: each old gap has exactly 4 − ω of its p copies
destroyed, ω = 2 if g ≡ 0 (mod p), 1 if g ≡ ±2, else 0; cohort shares therefore
decay by (p−4+ω)/(p−2) and sum to 1.
**P3** most gaps are old, most large gaps are young.
**P4** every gap is a sum of base gaps all equal to 6, so κ = G/6 exactly and
merge depth obeys Σ ln(1+L) ≥ ln(G/6); prediction that this does not bind, and
that d(record at T₂₉) lands in [5, 8].
**P5** the ledger fails to close on the tile because supply is
N·exp(−2λp) with ln N = θ(x) ≈ x against 2λp ≈ 2.6x/m̄ ≪ x, and closes in the
localized frame where the population is bounded.

Outcome: P1 confirmed, P2 confirmed exactly, **P3 refuted in the form stated**
and replaced by an age filter (§4), P4 confirmed with the depth at the top of
its predicted range, P5 confirmed and sharpened into one inequality (§8).

## 1. The answer

**The accounting does not close on the tile, and the reason is a single
inequality that can be written down.** A kill-run needs one adjacent pair of
killed slots. The number of such pairs a fold makes is a quantity the ledger
pins exactly, and the ledger says it is `X = 2Q₀ + Q₊ + Q₋`, a residue count on
the old gap word. Charging runs to births then requires X to be small. It is
not: X is a constant fraction of N at every reachable fold, and asymptotically
`ln X ≈ θ(x) − 2c·x/m̄ ≈ x·(1 − 1.0/ln²x)`, which is `x(1 − o(1))`. Supply
exceeds demand by an exponential in x, so the average of L is not bounded by the birth ledger.

**What the ledger does buy is three exact conservation laws, one new proven
bound on L, and the exact location of the wall.** In the localized frame the
same accounting closes, and where it closes is computable: the condition is
`λ·θ_p > ln(kills at that fold)`, satisfied in a window from p ≈ 421 on and
failing on the tile at every x by exactly the factor ln²x. That factor is TODO 0b's parity-scale wall written as a ledger
statement.

**Two side results that outlive the attack.** The record gap's merge tree at
T₂₉ is 258 = 60 + 138 + 60 with the old record 204 absent from it, which
converts U-FRAME §7 item 4 from an observation into a read-off. And the
fold-31 extremal run 60, 126, 60 with span 246 is reproduced from a code path
with nothing in common with `a3-05-bound-L.js`, with the genealogy of its three
gaps attached: @29, @23, @29.

## 2. The ledger, stated exactly

Fix T_x, the cyclic gap word `g₀ … g_{N−1}` of the twin slot tile mod W, and
fold by p > x. Copy k deletes the slots whose residue mod p lies in
`{d, d−2}` with `d = −kW`, and d runs over every residue as k runs over the
copies.

> **Merge Rate Identity (PROVEN).** Fix a gap of T_x between slots s and s′.
> Its left endpoint dies in exactly the two copies with `d ∈ {s, s+2}`, its
> right endpoint in exactly the two with `d ∈ {s′, s′+2}`, and those 2-sets
> intersect in ω elements where ω = 2 if `g ≡ 0 (mod p)`, ω = 1 if
> `g ≡ ±2 (mod p)`, and ω = 0 otherwise. So of the gap's p copies, exactly
> **4 − ω are destroyed and p − 4 + ω survive intact**, and ω ≥ 1 holds exactly
> when the gap qualifies in the sense of `a3-05-bound-L.md` Lemma 2.

> **Consumption Identity (PROVEN).** Summing ω over the cyclic gap word,
> **`X = Σᵢ ωᵢ = 2·Q₀ + Q₊ + Q₋`**, where Q₀ counts gaps ≡ 0 (mod p) and Q± the
> gaps ≡ ±2. X is simultaneously the number of adjacent killed pairs the fold
> makes, the number of qualifying gap COPIES it consumes (a gap ≡ 0 mod p is
> consumed once in each of two different copies, which is why the spend ledger
> at fold 23 reads 4400 for cohort @19 against that cohort's 4314 qualifying
> gaps, the difference being exactly Q₀ = 86), and `2N − M` with M the number
> of kill runs.

> **Conservation of the ≥ θ population (PROVEN).**
> `Q(T_new, θ) = p·Q(T_old, θ) − Σ_{g ≥ θ}(4 − ω) + M_θ`, with M_θ the number of
> newly merged gaps of size at least θ. Normalised, `q_new = q_old·(p−4+ω̄)/(p−2)
> + m_θ/(p−2)`, so the density of large gaps relaxes at rate 2/p per fold
> towards a fixed point set by the merge production rate alone.

> **Counting Bound (PROVEN, new).** `L ≤ 1 + X = 1 + 2Q₀ + Q₊ + Q₋`.
> A maximum is at most a sum.

**VERIFIED at every fold, 5 through 31.** Reading 1 checks `X = 2Q₀ + Q₊ + Q₋`
and `M = 2N − X` at all eight folds and at fold 31, where both routes give
8,025,014. Reading 2 checks `4N − X = 2N + M`. Reading 3 checks the
Merge Rate Identity cohort by cohort in its sharp form. Custody passes on the
way: D(T_x) = Π(q−2) and G₂ reproduces 12, 30, 42, 66, 108, 150, 204, 258 from
a generator that never touches a sieve.

## 3. The birth ledger

Every gap of T_x carries a birth fold, the fold whose deletions last merged it.
Unlike slots, which never die and never gain a lineage (`birth-cohorts.js`),
gaps die by merging and are re-born, so the cohort census is a different object
with a different conservation law. Measured shares at T₂₃:

| cohort | @3 | @5 | @7 | @11 | @13 | @17 | @19 | @23 |
|---|---|---|---|---|---|---|---|---|
| share of all gaps | 0.0881 | 0.2348 | 0.1174 | 0.1311 | 0.1256 | 0.1049 | 0.1044 | 0.0937 |

and the per-fold decay is exactly `Σ(p−4+ω)` over the cohort, matched to the
unit at every fold and every cohort (Reading 3). The asymptotic form implied is
`share(q at x) ≈ (2/q)·(ln q/ln x)²`, which integrates to 1 over the primes.

**Creation runs at the maximum rate the structure allows (Reading 7).** The
born-at-p share is `2/(p−2)` times 0.975 to 0.985 from fold 13 on, the deficit
being exactly the runs that merge three gaps rather than two. The hope behind
the attack, that creation of large gaps is slow, is false as stated: two gaps
per old slot are created at every fold, forever.

## 4. What the birth ledger actually supplies: an age filter, not youth

P3 predicted the qualifying gaps would be dominated by the last one or two
cohorts. Reading 4 refutes that and replaces it with something sharper.

At T₂₉ against fold 31 (θ = 60), the 8,022,924 qualifying gaps (2090 + 205,068 + 7,815,766)
break down by birth as @13: 14.4%, @17: 20.7%, @19: 23.4%,
@23: 21.8%, @29: 19.7%, and **@3, @5, @7 and @11 contribute nothing at all**,
despite carrying 52.9% of the population (shares 0.081534, 0.217425, 0.108712,
0.121376 at T₂₉). The mechanism is exact: a gap's size is
frozen at birth and never changes until it is re-merged, and the largest gap
fold 11 can make is 42, under θ₃₁ = 60.

> **The age filter (PROVEN).** A cohort q can supply a gap qualifying at fold p
> only if `G₂(T_q) ≥ 2p − 2η`. That half is exact. On the measured law
> `G₂ ≈ 0.55·θ(q)²` it excludes, on the fold diagonal, every cohort born before
> about q ≈ 1.9√x.

That is a genuine restriction and it is not enough. On the share law above the excluded
mass is `(ln q_min/ln x)² ≈ 1/4` of the population, a constant factor against a demand
that needs an exponential.

## 5. The spend ledger

| fold | killed = 2N | runs M | X | L | run lengths |
|---|---|---|---|---|---|
| 5 | 2 | 2 | 0 | 1 | 1:2 |
| 7 | 6 | 4 | 2 | 2 | 1:2 2:2 |
| 11 | 30 | 30 | 0 | 1 | 1:30 |
| 13 | 270 | 264 | 6 | 2 | 1:258 2:6 |
| 17 | 2,970 | 2,898 | 72 | 2 | 1:2826 2:72 |
| 19 | 44,550 | 43,462 | 1,088 | 2 | 1:42374 2:1088 |
| 23 | 757,350 | 745,480 | 11,870 | 3 | 1:733672 2:11746 3:62 |
| 29 | 15,904,350 | 15,660,528 | 243,822 | 2 | 1:15416706 2:243822 |

L reproduces the diagonal 2, 1, 2, 2, 2, 3, 2 of `a3-05-bound-L.md` §9, and
fold 31 gives L = 4 with interior gaps **60, 126, 60**, span 246, the cheapest
legal alternating word 2p−2, 4p+2, 2p−2. Two things are new here. The runs that
straddle a copy boundary are counted separately and never exceed the
single-2-set maximum at any fold, so the physical merge run and the L of the
residue definition agree throughout. And every consumed gap carries its birth:
at fold 31 the three interior gaps were born at @29, @23, @29, while the
population of consumed gaps across all runs is spread over @13 through @29.

## 6. Forced creation, priced honestly

Every gap of every tile is a sum of consecutive gaps of the mod-6 comb, all
equal to 6. So

> **κ = G/6 exactly**, where κ is the number of primitive constituents.

A merge at fold p has arity at most 1 + L(p), and constituent counts add, so
along any gap's merge tree `Σ_generations ln(max arity) ≥ ln κ`. That is the
build-time argument in its correct form. It is true, it is sharp in shape, and
**it does not bind, for a reason worth naming: it is the telescope itself.**
The demand `ln κ = ln G₂ − ln 6` sits under the u-frame budget `2 ln x − ln 12`
precisely when `G₂ < x²/2`, which is the Zone Postulate restated. Measured at
T₂₉: ln κ = 3.761, budget 4.250, actually spent Σ ln(1+L) = 8.266.

The other half of the hope was that the record's lineage merges at far fewer
folds than π(x), which would say the truth spends its budget in O(log x) folds
while the chain charges all of them. **Measured, it does not.** Merge depth of
the record runs 1, 2, 3, 4, 4, 5, 6, 7 at T₅ through T₂₉ against 1 through 8
folds available, and the set of folds appearing as internal nodes of the record
tree is the entire fold set at every level. There is no rare-merge gain to
amortize at any reachable scale. The lower bound `d ≥ 2 ln x/ln(1+L)` still
permits one asymptotically; nothing in the data suggests it.

## 7. The record genealogy, and U-FRAME §7 item 4

Read off the tree rather than inferred:

```
G2(T_29) = 258, kappa = 43, depth 7
  gen 0: 258@29 from 3 constituents
  gen 1: 60@23, 138@19, 60@23
```

The old record G₂(T₂₃) = 204 is not an ancestor. **The maximum at T₂₉ is
assembled fresh from three large but non-record gaps born two and three folds
earlier**, which is exactly the mechanism U-FRAME §7 item 4 asked to be
checked, now confirmed. It also matches `fold-succession-autocorr.md` finding 3,
cooperative record structure, from a completely different instrument.

## 8. The verdict, as one inequality

The u-frame needs `Σ_p (L−1)·ρ·m̄/G₂ ≤ 2 ln x − O(1)`, the excess form of
`gate-multiplies.md` §8. The amortized route would bound the left side by
charging each run to the qualifying gaps it consumes. The Consumption Identity
makes that charge exact, and then the bound is only as good as X.

**Supply against demand, measured (Reading 9):**

| fold | 7 | 13 | 17 | 19 | 23 | 29 |
|---|---|---|---|---|---|---|
| demand L−1 | 1 | 1 | 1 | 1 | 2 | 1 |
| supply X | 2 | 6 | 72 | 1,088 | 11,870 | 243,822 |
| X/(p·N) | 9.5e−2 | 3.4e−3 | 2.9e−3 | 2.6e−3 | 1.4e−3 | 1.1e−3 |
| ratio | 2 | 6 | 72 | 1,089 | 5,940 | 244,000 |

The per-position density falls slowly, the population grows like `e^{θ(x)}`, and
the product diverges.

**The closure condition.** A run needs one adjacent kill pair. The measured law
for their density is `X / (kills) ≈ exp(−c·θ_p/m̄)` with c between 1.2 and 1.9,
so the expected count is `kills · exp(−c·θ_p/m̄)` and the ledger closes once

> **2c·p / m̄(p) > ln(number of kills at fold p)**,

using θ_p ≈ 2p. Both sides are measured quantities, and the two frames put
them in opposite order.

- **In the 2·10⁹ window** the two sides cross exactly where the runs stop. At
  p = 421, m̄ = 89.15 and the fold makes 105,790 kills, so the right side is
  ln 105,790 = 11.57 and the left side is 2c·421/89.15, which equals 11.6 at
  c = 1.22. **Measured, fold 421 is the last fold in the window with a kill run
  of length ≥ 2, and it has exactly one adjacent kill pair.** Beyond p = 1021
  no gap in the window is even as large as θ, so L = 1 is forced by size alone.
  Only 58 of 237 folds have L ≥ 2, max L = 3, and Σ(L−1) over all 237 folds
  is 64.
- **On the tile** the left side is `2c·x/(2.4 ln²x) ≈ x/ln²x` and the right side
  is `ln(2·D_x) ≈ θ(x) ≈ x`. The condition fails at every x, by the factor
  **ln²x**, and the failure widens. The ledger can never close.

**That factor ln²x is the whole content of the attack.** It is the same object
as TODO 0b's warning that the ~2p tail inside a p# tile is where parity lives,
and it is the same object as the tile-versus-zone divide the corpus has hit
before. The amortized ledger does not weaken the requirement, because the
requirement is already the sharp global statement: summing the per-fold burn
over the ladder reproduces the Overshoot Budget, 0.598 nats of lifetime slack
(`gate-multiplies.md` §5), with nothing left over. Amortization can redistribute
L across folds. It cannot create budget.

**The true excess burn, for the record.** `Σ(L−1)·ρ·m̄/G₂` over the eight exact
folds is 3.3576 nats against that 0.598 nat lifetime allowance, with the
per-fold ratio to replenishment falling 2.248 → 0.888. The overspend is
front-loaded and the trend is favourable; nothing in the ledger forces the trend
to continue.

## 9. The proven / measured / wall decomposition

**PROVEN by this note.** The Merge Rate Identity (4 − ω copies destroyed, ω ≥ 1
exactly on qualifying gaps). The Consumption Identity X = 2Q₀ + Q₊ + Q₋. The
conservation law for the ≥ θ population. The counting bound L ≤ 1 + X. The
identity κ = G/6 and the build-time inequality Σ ln(1+L) ≥ ln κ. The age filter.
All verified exactly at nine folds.

**MEASURED.** The creation rate 2/(p−2) times 0.975 to 0.985. The gap cohort
shares and their exact decay. The supply density X/(p·N) and its per-decade law
`≈ exp(−1.3·θ/m̄)` over six orders of magnitude. The conditional ratios
r₂ = 3.33e−1 down to 1.53e−2 and the single r₃ = 5.22e−3 at fold 23. The record
merge depths 1 through 7. θ_p/m̄ between 1.20 and 2.14 on the whole exact
ladder. The window closure at p = 421.

**THE WALL, and it is the same one.** Bounding L rather than Σ L needs the max
to be far below the sum, and the ledger prices the sum exactly. The remaining
statement is that adjacent qualifying gaps are rare given that qualifying gaps
are common, which is `a3-05-bound-L.md` §8's H″ verbatim, now measured on the
kill side as well as the gap side. The counting bound is sharp at exactly one
fold, fold 11, where no gap value qualifies at all and it beats Theorem B by
returning the truth; everywhere else it is worse by orders of magnitude, for
precisely the reason the wall exists.

**One premise of the attack is refuted outright.** "Gaps of scale 2p′ are
extreme-tail objects" is false at every computable fold: θ_p/m̄ never exceeds
2.14 on the exact ladder. The tail regime begins only where 2x/(2.4 ln²x) is
large, and there the population has grown to `e^{θ(x)}` and swamps it. The two
scales move together, and that is why the ledger cannot close.

## 10. What this does not show

The window instrument measures the localized object, not G₂(x#); its closure at
p = 421 is a statement about a bounded population and carries to the tile only
through the inequality of §8, which is exactly what fails there. The constant c in
the density law is measured, not derived: the six-tile bracket of
`a3-05-bound-L.md` §6 is 1.30 to 1.88, and the window's own effective c by
decade of p reads 1.44, 2.43, 1.74, 1.55, 1.17, straddling that bracket and
drifting below it at the closure point. So the crossing at p = 421 is a
consistency check on a fitted constant, not an independent confirmation, and
the ln²x conclusion for the tile does not depend on which value inside the
bracket is taken. Merge depth is measured on eight
levels and the record's use of every available fold may be a small-x artifact:
the lower bound `d ≥ 2 ln x/ln(1+L)` permits a rare-merge regime far out, and
nothing here rules it in or out. The counting bound L ≤ 1 + X is proven but
should not be presented as progress on L; it is a sum bounding a maximum and it
says so.

## 11. Reproduction

```
node research/attack-foldL-04-genealogy.js     # 41 s, T_5..T_29 and fold 31
SKIP29=1 node research/attack-foldL-04-genealogy.js   # 2.5 s, T_5..T_23
node research/attack-foldL-04-localized.js     # 25 s, 2e9 window, 237 folds
WIN=2e8 QMAX=1000 node research/attack-foldL-04-localized.js   # 2 s
```

Tiles are generated from the mod-6 comb by the fold recursion, never sieved,
and the custody check D(T_x) = Π(q−2) with the published G₂ ladder runs inside
the script. The window instrument sieves [0, 2·10⁹) for the least prime factor
of n(n+2) and reproduces the tile's conditional ratios to three significant
figures at every shared fold, which is the cross-frame calibration.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
