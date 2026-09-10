# The thinning null's maximal gap, scored against Neudecker's limsup law

<!-- ledger
id: Q-null-limsup
status: ANSWERED
todo: none
question: Does the thinning null's maximal gap disagree with Neudecker's limsup law, which would retire the extinction half?
verdict: The trigger does not fire: the closed form is the exact law, the reduction returns Hawkins' own constant, and the real fold's record gap lands within 2 sigma of the null, so the extinction half survives and the null now supports the ceiling argument rather than threatening it; the limsup itself is not measurable and cannot be.
-->

*Staging-layer record. Proposal only: it edits no live document, and the
proposed replacement for `paper/proposals/prop-thinning-null.md` §5's trigger
paragraph is in §6 and is a proposal. Producer:
`research/null-limsup-01-score.js`, output formally embedded. Pre-registered in
[null-limsup-prereg.md](null-limsup-prereg.md), committed alone before the
producer existed. Calibration marked on every claim.*

## 0. The answer

**The trigger does not fire. The extinction half survives, and the reason it
survives is arithmetic that had to be done before the trigger could be scored at
all.**

`prop-thinning-null.md` §5 says to retire the extinction half if the null's
measured maximal-gap behaviour disagrees with Neudecker's limsup law, "constant
1 on log²p". Read literally at the deepest fold of the scaling record that law
asks for `ln²1499 = 53.5`. The measured record gaps there are of order 2000, a
factor near 42 away. **None of that factor is a disagreement.** In Hawkins'
sieve the sieving number is the position, so `log p_n` is simultaneously the
mean gap and the log of the point count; in this corpus's object those are two
independent parameters. The transferable content of the law is

> **(N) maximal gap ≈ (mean gap) × ln(number of points), constant 1,**

and for the two-class null at rate `2/p` on the mod-6 comb that reads

> **(★) `E[G_max] = (m̄(p)/c_null(p))·(ln(N − 1) + γ)`, `N = W/m̄(p)`,
> `sd = (π/√6)·m̄/c_null`,**

whose leading term is `m̄·ln N` with constant 1, since `c_null → 1` is the
thinning fixed point. Forced back onto `ln²p` the constant becomes
`e^{2γ}/(2C₂) = 2.402607`, and the second factor becomes `ln W` rather than a
second `log p`.

Scored against (★), the null's maximal gap agrees on all three criteria the
pre-registration named, and the two riders that cannot fire the trigger also
pass. The real fold's record gaps sit a little **below** the null's, which is
the direction `import-thinning.md` §1.4 already measures on the pair counts and
the safe direction for anything the extinction analysis leans on.

## 1. The derivation, in full

**The law, and how it is carried.** Neudecker, *Math. Proc. Cambridge Philos.
Soc.* **77** (1975) 365–367: `lim sup (p_{n+1} − p_n)/log²(p_n) = 1` almost
surely for the Hawkins random sieve. The primary is NOT REACHED on this disk
(`hawkins-read.md` §10, closed access with no OA location); the statement is
carried second-hand from Rivoal, *J. Théor. Nombres Bordeaux* **20** (2008)
799–809, p. 808. Everything below is scored against Rivoal's restatement.

**Why `log²p_n` cannot be transferred as written.** Two distinct quantities are
collapsed into one symbol in Hawkins' setting:

- `log p_n` is the **mean gap**, because the geometric parameter of the
  stage-`n` law is the Mertens product `m_n` and `m_n ~ log p_n`
  (Neudecker–Williams 1974 p. 199, Heyde 1976 p. 278, Rivoal p. 800, all quoted
  in `hawkins-read.md` §3);
- `log p_n` is also **`ln N`**, because the sieve has `N ~ n/log n` survivors
  below `n`.

So `log²p_n = m_n · ln N`, and the depth-free statement is (N). In this
corpus's object the sieve depth `p` and the window `W` are set independently, so
the collapse is not available and the two factors have to be carried separately.

**The null, and its exact extreme-value law.** Under the thinning null the gap
word after folding every prime `5 ≤ q ≤ p` is exactly geometric in comb units
`κ = G/6` with `α = m̄/6` and `ρ = 1 − 6/m̄` (`import-thinning.md` §1.2,
producer `research/import-thinning-01-nullmodel.js`). With the two end gaps
excluded exactly as `attack-foldL-06-scaling.md` §0 excludes them, the maximum
of the `N − 1` interior gaps has the **exact** law

> **(E) `P(K ≤ k) = (1 − ρ^k)^{N−1}`, `G_max = 6K`,**

and (★) is its Gumbel form. The rate generalisation is not ours: Lorch's
*Hawkins' p-primes* (*Rocky Mountain J. Math.* **37** (2007) 533–550, Thm 2.1)
admit any rate with `Σ p² < ∞` and `Σ p = ∞`, and `p(n) = 2/n` satisfies both
(`hawkins-read.md` §4). What is ours is the two-class structure on a comb of
twin slots sieved by the actual primes.

**Where the constant goes.** By the two-class Mertens product
`m̄(x) = 2/∏_{2<q≤x}(1 − 2/q) ~ e^{2γ}·ln²x/(2C₂)`, so

> **(C) `G_max ~ (e^{2γ}/(2C₂))·ln²p·ln W`, constant 2.402607.**

The producer checks the constant along the extended Mertens product: `m̄/ln²x`
reads 2.424129 at `x = 1499` and 2.402798 at `x = 10⁶`, ratios to the closed
form 1.008958 and 1.000079. **Two things move together and must not be
confused**: the rate `2/p` in place of `1/n` is what puts `e^{2γ}/(2C₂)` where
Hawkins has 1, and the decoupling of depth from position is what puts `ln W`
where Hawkins has a second `log p`.

## 2. The score

*Every figure below is in the formally embedded tail of
`research/null-limsup-01-score.js`. None was typed by hand.*

**Calibration gates, both passed before anything was scored.** The Mertens
product at fold 421 is 89.1075 against the scaling record's measured 89.1522, a
ratio of 1.00050 which is the ratio that record's own §3.2 states; and `c_null`
at fold 1499 is 1.023916, which is `import-thinning.md` §1.2's value to six
places. The script aborts on either disagreement.

### P2 — the closed form is the exact law

| `W` | `m̄` | `c_null` | `E` exact from (E) | `E` from (★) | ratio | sd |
|---|---|---|---|---|---|---|
| 2·10⁷ | 129.6265 | 1.023883 | 1588.5 | 1585.5 | 1.00189 | 162.4 |
| 2·10⁸ | 129.6265 | 1.023883 | 1880.1 | 1877.1 | 1.00160 | 162.4 |
| 2·10⁹ | 129.6265 | 1.023883 | 2171.6 | 2168.6 | 1.00138 | 162.4 |
| 2·10¹⁰ | 129.6265 | 1.023883 | 2463.1 | 2460.1 | 1.00122 | 162.4 |

**PASS**, with two orders of magnitude of margin on a 5% tolerance. The
one-fold ambiguity between the two records' `m̄` conventions moves the four means
to 1586.6, 1877.7, 2168.8 and 2459.9, which is smaller than the discretisation.

### P3 — the reduction returns Hawkins' own constant

Fed Hawkins' rate and Hawkins' diagonal, `m = ln x` and `N = x/ln x`, the same
closed form gives `E[max]/ln²x` = 0.785364, 0.856909, 0.890684, 0.923939,
0.954914, 0.973951 and 0.985231 at `ln x` = 10, 20, 30, 50, 100, 200, 400:
increasing, heading for 1, with the depth-free ratio 1.000000000000 at every
row. **PASS.**

This is the check that would have caught a wrong translation, because a
mistranslation returns a constant other than 1. It also fixes the reading of the
finite-scale deficit: 0.785364 at `ln x = 10` is the `ln ln x / ln x` gap
between a running maximum and a limsup, not evidence against the law. **Any
future scoring of a measured maximum against "constant 1" that does not carry
that term will read a 15% agreement as a 15% failure.**

### P1 — a coupled simulation of real windows reproduces (E)

| `W` | reps | sim mean `G₂` | sim se | exact `E` | `z` | sim sd | exact sd | ratio | sd err | `z(sd)` |
|---|---|---|---|---|---|---|---|---|---|---|
| 2·10⁷ | 1000 | 1591.4 | 5.1 | 1588.5 | +0.56 | 161.0 | 162.4 | 0.9914 | 0.0326 | −0.26 |
| 2·10⁸ | 400 | 1876.8 | 9.2 | 1880.1 | −0.36 | 183.2 | 162.4 | 1.1283 | 0.0518 | +2.48 |

**PASS.** Every comb slot draws its own death fold, so the levels nest exactly
as in the real engine and the test is of the whole construction, not of a
final-level shortcut.

**The estimator had to be calibrated before the second moment could be scored at
all, and that is worth recording as a method note.** The maximum of iid
geometrics is a discrete Gumbel, not a Gaussian, so the normal-theory error on a
sample standard deviation understates by half again: 0.0224 and 0.0354 against a
true 0.0326 and 0.0518, the latter computed from the exact law by inverse
transform rather than assumed. A first pass at 150 reps read a 2σ fluctuation as
a 3σ one and reported P1 as failed. **The pre-registered 15% tolerance was not
moved. What moved is the rep count, which the pre-registration did not fix,
chosen so that 15% is a multiple of the estimator's own error rather than a coin
flip.**

**One figure still wants watching.** The `2·10⁸` sd ratio 1.1283 passes the
tolerance and is still `+2.48σ` on one draw against its own error bar. The
`2·10⁷` window, with more than twice the reps, shows nothing of the kind at
`−0.26σ`. A rerun at a different `SEED` is the check, and §7 gives the
invocation.

### P4 — the real fold against the null

*Real figures quoted from the embedded tail of
`research/attack-foldL-06-scaling.js`, never re-measured.*

| `W` | real `G₂` | null `E[G_max]` | ratio | `z` |
|---|---|---|---|---|
| 2·10⁷ | 1458 | 1588.5 | 0.9178 | −0.80 |
| 2·10⁸ | 1560 | 1880.1 | 0.8298 | −1.97 |
| 2·10⁹ | 2220 | 2171.6 | 1.0223 | +0.30 |
| 2·10¹⁰ | 2220 | 2463.1 | 0.9013 | −1.50 |

Mean ratio 0.9178, below the null at 3 of 4 windows, worst `|z|` = 1.97.
**PASS**, in the pre-registered direction.

### P5 — the ceiling statistic

The predictor is the last fold with `P(G_max(p) ≥ θ_p) ≥ 1/2` under (E). It is
validated first against the simulation, which it was not built from:

| `W` | predictor | sim median | sim 10–90% | sim sd |
|---|---|---|---|---|
| 2·10⁷ | 607 | 631 | [547, 769] | 93.3 |
| 2·10⁸ | 773 | 797 | [701, 941] | 104.6 |

and then compared with the real fold's own ceiling:

| `W` | null predictor | real measured | pred/real | real extinction fold |
|---|---|---|---|---|
| 2·10⁷ | 607 | 463 | 1.3110 | 181 |
| 2·10⁸ | 773 | 607 | 1.2735 | 331 |
| 2·10⁹ | 941 | 1021 | 0.9216 | 421 |
| 2·10¹⁰ | 1129 | 1021 | 1.1058 | 457 |

**PASS**, within the pre-registered factor 1.5. The predictor lands within 4% of
the simulated median at both simulated windows, so the disagreement with the
real fold is the real fold's and not the predictor's — and at 93.3 and 104.6 in
`p`, the ceiling statistic's own sampling spread under the null is of the same
order as that disagreement.

## 3. What this does to the extinction analysis

**The ceiling argument holds, and the null now supports it rather than
threatening it.** `attack-foldL-06-scaling.md` §7 argues that the extinction at
457 is not a range artifact because the last fold whose `θ` still fits under the
window's record gap is 1021 at `Y = 2·10¹⁰`. Under the null that ceiling would
sit at 1129, higher still, so the extinction folds 181, 331, 421 and 457 sit at
roughly 30%, 43%, 45% and 40% of the null's own ceiling. **Extinction happens
far below where the supply of qualifying gaps runs out, under the real fold and
under independent thinning alike.**

**The real fold's extremes are shorter than the null's, not longer.** Mean ratio
0.9178 with three of four windows below. That is the same direction
`import-thinning.md` §1.4 measures on the pair counts, where the ratio of
measured to null falls from 0.9200 to 0.3664 to 0.1529 across the deep decades.
A real fold whose extreme gaps are at or below independent thinning's cannot
manufacture the extinction phenomenon out of an excess of long gaps.

**And the noise figure the scaling record asked for now exists.** Its §5 has one
measurement of the sampling spread of an extreme fold statistic, the 72-in-`p`
swing when the same window length is moved to a different anchor, and it says
the apparent deceleration of 181, 331, 421, 457 cannot be separated from it. The
null now supplies an independent estimate of the same order from many windows
rather than one. **It confirms the record's caution rather than lifting it.**

## 4. What this does not show

- **Nothing here is about the real fold's law.** The null is a null. That the
  real fold's record gap lands within 2σ of it says the extreme-gap behaviour is
  not the place where CRT thinning departs from independence, which is a
  negative result about where to look, not a positive one about `H″`.
- **The limsup is not measured, and cannot be.** Neudecker's statement is an
  almost-sure limsup over an infinite sequence; four windows measure a running
  maximum at finite scale. What is scored is the finite-window form (★) whose
  leading constant is the limsup's. A corpus that later wants the limsup itself
  needs a different instrument.
- **The primary is unread.** Everything is against Rivoal p. 808's restatement.
  If Neudecker 1975 normalises differently, the score has to be re-run, and
  `hawkins-read.md` §10 already lists that paper as the one NOT REACHED item
  that matters most.
- **The two-class rate is inside Lorch's published family**, and no maximal-gap
  law at a general rate is stated there; the owning convention searched for that
  is "Hawkins' p-primes", the row already in `research/SEARCH-CONVENTIONS.md`
  §1, and Lorch's Theorem 2.1 and §6 give the PNT and Mertens analogues only.

## 5. One convention note, worth writing down once

The two records index `m̄` one fold apart. `import-thinning.md`'s "at fold `p`"
is the product over `q < p`, which is what reproduces its `c_null = 1.023916` at
fold 1499; the scaling record's measured `m̄` at fold 421 matches the product
over `q ≤ p`, at the ratio 1.00050 its own §3.2 states. The two differ by
1.00477 at `p = 421` and 1.00134 at `p = 1499`. Nothing in this score turns on
it, and a future reader who reproduces one of the two should not conclude the
other is wrong.

## 6. Proposed edit to `prop-thinning-null.md` §5, not applied

Replace the trigger paragraph:

> **Retire the extinction half** if the null's measured maximal-gap behaviour
> disagrees with Neudecker's limsup law (constant 1 on log²p) — that law owns
> the null's extreme gaps and the extinction analysis must be scored against it
> before any write-up (added 2026-08-19).

with:

> **Scored, 2026-08-19, and the extinction half stands**
> (`research/history/staging/null-limsup.md`, producer
> `research/null-limsup-01-score.js`, pre-registered in
> `null-limsup-prereg.md`). Neudecker's law does not transfer as a constant on
> `ln²p`: in Hawkins' sieve `log p_n` is at once the mean gap and the log of the
> point count, and here those are independent parameters, so the transferable
> form is maximal gap ≈ (mean gap)·ln(point count) with constant 1, which for
> this null is `E[G_max] = (m̄/c_null)(ln N + γ)` and carries the constant
> `e^{2γ}/(2C₂) = 2.4026` when forced back onto `ln²p·ln W`. Scored against that
> form the null agrees on all three pre-registered criteria and the trigger does
> not fire. Read literally instead, "constant 1 on `ln²p`" predicts 53.5 at fold
> 1499 against measured record gaps near 2000, and would have retired a sound
> half on a factor of 42 that is entirely translation. Two riders, reported and
> unable to fire the trigger: the real fold's record gaps sit at 0.83 to 1.02 of
> the null's, below it at three windows of four, which is the direction §3
> already measures on the pair counts; and the null's own ceiling statistic
> carries a sampling spread in `p` of the same order as the 72-in-`p` anchor
> swing, which confirms the scaling record's caution about the extinction
> sequence's shape rather than lifting it.

No other change is proposed. In particular the grade stays WEAKENED: nothing
here is progress on `H″`, and §2's ceiling sentence is untouched.

## 7. Reproduction

```
node research/null-limsup-01-score.js                          # the full score
REPS7=20 REPS8=5 node research/null-limsup-01-score.js         # a fast smoke run
SEED=12345 node research/null-limsup-01-score.js               # a different draw
```

Everything random is seeded from `SEED` and reproduces exactly. The first embed
of this producer was rejected by `qc/embed.js --check` because it used an
unseeded `Math.random`, and the seeded rerun is what is embedded.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
