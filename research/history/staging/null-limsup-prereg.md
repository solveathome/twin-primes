# Pre-registration: the thinning null's maximal gap against Neudecker's limsup law

<!-- ledger
id: Q-null-limsup
status: OPEN
todo: none
question: Does the thinning null's maximal gap disagree with Neudecker's limsup law, which would retire the extinction half?
verdict: Pre-registration only, hand-written and committed alone before its producer exists: it fixes the derivation, the statistics, the tolerances and the verdict rule, and no null-side number has been computed.
-->

*Hand-written, and committed alone before its producer
`research/null-limsup-01-score.js` exists. It fixes the derivation, the
statistics, the tolerances and the verdict rule before any null-side number has
been computed. Staging layer; it edits no live document.*

`paper/proposals/prop-thinning-null.md` §5 carries the trigger this file scores:

> **Retire the extinction half** if the null's measured maximal-gap behaviour
> disagrees with Neudecker's limsup law (constant 1 on log²p) — that law owns
> the null's extreme gaps and the extinction analysis must be scored against it
> before any write-up (added 2026-08-19).

The law, second-hand via Rivoal p. 808 and recorded in
[hawkins-read.md](hawkins-read.md) §7: for the Hawkins random sieve,
`lim sup (p_{n+1} − p_n)/log²(p_n) = 1` almost surely (Neudecker, *Math. Proc.
Cambridge Philos. Soc.* **77** (1975) 365–367). Neudecker 1975 itself is NOT
REACHED on this disk, per hawkins-read.md §10, so the law is carried at one
remove throughout and nothing below claims to have read it.

## 1. What the law is normalised by, and why that has to be translated first

`log²p_n` is not a free-standing constant to compare a gap against. In Hawkins'
sieve the sieving number **is** the position, so the single quantity `log p_n`
plays two distinct roles at once:

- it is the **mean gap** at that point of the sequence, since the geometric
  parameter is the Mertens product `m_n` and `m_n ~ log p_n`
  (Neudecker–Williams 1974 p. 199, Heyde 1976 p. 278, Rivoal p. 800, all quoted
  in hawkins-read.md §3);
- it is the **log of the point count**, since the sieve has `N ~ n/log n`
  survivors below `n`, so `ln N ~ log p_n`.

So `log²p_n = m_n · ln N`, and the depth-free content of Neudecker's law is

> **(N) maximal gap ≈ (mean gap) × ln(number of points), constant 1.**

That is the form that transfers. The form `constant 1 on log²p` does not
transfer on its own, because in this corpus's object the sieve depth and the
window are two independent parameters and the coincidence that collapses them
in Hawkins is absent.

## 2. The rate change, and the arithmetic it forces

Our null is the two-class analogue at rate `2/p` per fold on the mod-6 comb
(`import-thinning.md` §1.2, producer `research/import-thinning-01-nullmodel.js`):
after folding every prime `5 ≤ q ≤ p` the gap word is exactly geometric in comb
units `κ = G/6` with

> `P(κ = k) = (1/α)·ρ^{k−1}`, `α = m̄(p)/6`, `ρ = 1 − 6/m̄(p)`,
> `c_null(p) = (m̄/6)·ln(1/ρ) = 1 + 3/m̄ + O(m̄⁻²)`.

The rate generalisation is not ours: Lorch's *Hawkins' p-primes* (*Rocky
Mountain J. Math.* **37** (2007) 533–550, Thm 2.1) admit any `p(n)` with
`Σ p² < ∞` and `Σ p = ∞`, and `p(n) = 2/n` satisfies both (hawkins-read.md §4).
What is ours is only the two-class structure on a comb of twin slots sieved by
the actual primes.

**Maximal gap in a window of length `W` at fold `p`.** The window carries
`N = W/m̄(p)` surviving slots and `N − 1` interior gaps, iid geometric, with the
two end gaps excluded exactly as `attack-foldL-06-scaling.md` §0 excludes them.
Writing `β = ln(1/ρ) = 6·c_null/m̄`, the maximum `K` of `N − 1` iid geometrics
has the exact law

> **(E) `P(K ≤ k) = (1 − ρ^k)^{N−1}`, `G_max = 6K`,**

and the Gumbel form of (E) is

> **(★) `E[G_max] = (m̄/c_null)·(ln(N−1) + γ) + O(1)`,
> `sd(G_max) = (π/√6)·(m̄/c_null)`.**

The leading term of (★) is `m̄·ln N`, which is (N) with constant 1, since
`c_null → 1` as the thinning fixed point. **The rate change does not move the
constant in Neudecker's own units.** It moves it only if the answer is forced
back onto `ln²p`: by the two-class Mertens product,
`m̄(x) = 2/∏_{2<q≤x}(1 − 2/q) ~ e^{2γ}·ln²x/(2C₂)` with `C₂ = 0.6601618…` the
twin-prime constant, so

> **(C) `G_max ~ (e^{2γ}/(2C₂))·ln²p·ln W`, constant `e^{2γ}/(2C₂) = 2.4026…`**

against `ln²p·ln W`. Two things move together and they must not be confused: the
rate `2/p` in place of `1/n` puts `e^{2γ}/(2C₂)` where Hawkins has 1, and the
decoupling of depth from position puts `ln W` where Hawkins has a second factor
of `log p`.

**What a naive reading of the trigger would do.** Read "constant 1 on log²p"
literally at the deepest fold of the scaling record, `p = 1499`, and it predicts
a maximal gap of `ln²1499 ≈ 53`. The record's measured record gaps are of order
2000. A factor near 40 separates the two, and every bit of it is the
translation above rather than a disagreement with Neudecker. Doing the
arithmetic before scoring the trigger is the entire point of this file.

## 3. The statistics, fixed here

Conventions are the scaling record's: window `[0, Y)`, slots `n ≡ 5 (mod 6)`,
folds the 237 primes `5 ≤ p ≤ 1499`, the level-`p` object is the one that still
contains the slots fold `p` is about to delete, so `m̄(p)` is `m̄_before(p)`, and
`θ_p = 2p − 2η` with `η = ±1`. The four validated windows are
`Y = 2·10⁷, 2·10⁸, 2·10⁹, 2·10¹⁰`.

- **`G₂(Y)`** — the record gap of the level-1499 object in the window. The
  scaling record's own column.
- **`p_θ(Y)`** — the last fold whose qualifying threshold still fits under the
  record gap of its own level, `θ_p ≤ G₂(p)`. A maximal-gap statistic, and the
  ceiling the extinction argument leans on.
- **`p_ext(Y)`** — the last fold carrying a kill run of length ≥ 2. Not a
  maximal-gap statistic; carried only for the comparison in P5.

## 4. Pre-registered predictions and tolerances

**P1 — the exact law describes a real window.** A coupled simulation of the null
ladder over a genuine window of length `Y` (every comb slot given an independent
death fold with the null's own probabilities, so the levels are nested exactly
as in the real engine) reproduces (E): the simulated mean `G₂` lies within 2
simulation standard errors of the exact mean of (E), and the simulated standard
deviation is within 15% of the exact standard deviation of (E), at both
simulated windows.

**P2 — the Gumbel form is the algebra of (N).** The exact mean of (E), summed
from the discrete CDF with no asymptotic step, agrees with (★) to within 5% at
all four windows. This is the check on the derivation in §2, not on the
simulation.

**P3 — the reduction returns Neudecker's constant.** Fed Hawkins' own rate and
Hawkins' own diagonal (`m = log x`, `N = x/log x`), the same closed form returns
`E[max]/log²x` increasing in `x` and ≥ 0.95 by `x = 10¹⁰⁰`, with the depth-free
ratio `E[max]·c/(m·(ln N + γ))` equal to 1 identically. If this returns any
constant other than 1, the translation in §1 is wrong and the whole score is
void.

**P4 — the real fold against the null.** The ratio `G₂(Y)` measured, over the
null's `E[G_max]` at the same `Y` and the same fold, at the four windows: band
`[0.7, 1.3]`, and `|z| ≤ 3` against the null's own standard deviation from (★).
The direction is pre-registered: the real fold is expected at or **below** the
null, because `import-thinning.md` §1.4 measures the real fold progressively
further below independent thinning with depth, and the null overshoots the pair
count by 2.73 at the calibration window.

**P5 — the ceiling.** The null's predictor for `p_θ(Y)` is the last fold with
`P(G_max(p) ≥ θ_p) ≥ 1/2` under (E). It is validated against the coupled
simulation's median `p_θ` at the two simulated windows, tolerance 20% in `p`,
and then compared with the measured `p_θ` at all four windows, tolerance a
factor 1.5 in `p` — the same tolerance `attack-foldL-06-scaling.md` §3.4 uses
for an extinction fold. The simulation also returns the sampling spread of
`p_θ`, which is the quantity the scaling record §5 has only one measurement of
(the 72-in-`p` offset swing) and explicitly says it cannot separate from a
trend.

## 5. The verdict rule

- **The trigger FIRES and the extinction half is RETIRED** if any of P1, P2, P3
  fails. Those three are the null's maximal-gap behaviour against Neudecker's
  law and nothing else.
- **The trigger does NOT fire and the extinction half SURVIVES** if P1, P2 and
  P3 all pass.
- **P4 and P5 cannot fire the trigger.** They score whether the real/null ratio
  is consistent with the extinction analysis as recorded. A failure there is
  reported against `attack-foldL-06-scaling.md` §7's ceiling paragraph and
  against the extinction half's *reading*, not against the null's law, and the
  proposal's §5 gets a separate sentence rather than a retirement.

## 6. Disclosed leaks, and what is actually blind

- **The real fold's numbers were read before this file was written.** `G₂(Y)` =
  1458, 1560, 2220, 2220; `p_θ(Y)` = 463, 607, 1021, 1021; `p_ext(Y)` = 181,
  331, 421, 457. All are in the formally embedded tail of
  `research/attack-foldL-06-scaling.js` and are quoted, never re-measured, per
  the standing compute rule. **P4 and P5 are therefore not blind and are scored
  as consistency checks, not as predictions.** What was fixed before any
  null-side arithmetic ran is the band, the direction and the verdict rule.
- **No null-side number exists at the time of writing.** P1, P2 and P3 are
  arithmetic that has not been carried out. The derivation in §2 is on paper
  only, and `e^{2γ}/(2C₂) = 2.4026…` is the one number in this file computed by
  hand rather than by a producer; the producer recomputes it.
- **The producer will assert `m̄(421) = 89.1522` from the scaling record §2 as a
  calibration gate** and abort on disagreement, so the two engines are bound to
  the same Mertens convention before anything is scored.
- Neudecker 1975 is unread here, per §1. If the primary turns out to state the
  limsup with a different normalisation from Rivoal's restatement, this whole
  score is against Rivoal p. 808 and must be re-run.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
