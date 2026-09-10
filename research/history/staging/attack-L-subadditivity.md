# Attack A: is `L` sub-additive when two prime sets merge?

<!-- ledger
id: Q-L-subadditivity
status: ANSWERED
todo: none
question: Is L sub-additive when two prime sets merge, as the intuition that L should be smaller for the combined set suggests?
verdict: Read literally the intuition is wrong by a one-line proof rather than an edge case: L is super-additive, exhaustively censused to nine primes; read as a statement about reusing primes it is right, and that reading is worth more than the refutation.
-->

*(2026-08-19, wave of 2026-08-19. Companion computation:
`research/attack-L-subadditivity.js`, embedded output, `code-sha256 ba0dcbf8`,
27.4 s. Legend: **[PROVEN]** published theorem or proof given here;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical, finite
range; **[ABSENT]** named channel plus a known-positive calibration probe;
**[INFERRED]** our deduction from sourced facts.)*

## The verdict

Chris asked: *"It still strikes me that `L` should be smaller for the combined
set of two `P` rather than `P+P`."*

**Read literally, the intuition is wrong, and it is wrong by a one-line proof
rather than by a counterexample that might be an edge case.** `L` is
**super-additive**. **Read as a statement about reusing primes, it is right, and
that reading is worth more than the refutation.** Both are settled below.

---

## 1. The theorem [PROVEN]

> **Concatenation.** For **disjoint** prime sets `P` and `Q`,
> `L(P ∪ Q) ≥ L(P) + L(Q)`.

*Proof.* `a_p` is free, so a cover is translation invariant: if `(a_p)` covers
`[1, A]` then `(a_p + t)` covers `[1+t, A+t]`. Take `(a_p)_{p∈P}` covering
`[1, L(P)]` and `(a_q)_{q∈Q}` covering `[1, L(Q)]`, and translate the second by
`t = L(P)` so it covers `[L(P)+1, L(P)+L(Q)]`. `P` and `Q` are disjoint, so no
prime is asked to hold two translations at once and the two assignments are
simultaneously legal. Their union covers `[1, L(P)+L(Q)]`. ∎

**So `L(P ∪ Q) < L(P) + L(Q)` cannot happen.** The brief asked whether CRT
decides the concatenation baseline. It does not have to: disjoint prime sets
touch disjoint coordinates, so there is nothing to reconcile. CRT is what
licenses the free-translate model in the first place
(`two-class-lower-bounds.md` §1); once it is licensed, the merge is one line.

**The honest baseline is therefore a FLOOR, not a ceiling.** §3 of the script
builds the concatenated assignment explicitly and verifies it covers, rather
than asserting it: `P = {5,7,11}` at `L = 9`, `Q = {13,17,19}` at `L = 5`, the
translated phases `10, 13, 14`, all 14 points of `[1,14]` covered, against a
true `L(P ∪ Q) = 32`.

## 2. The census [VERIFIED, exhaustive to nine primes]

Every disjoint pair drawn from the pool `{5,7,11,13,17,19,23,29,31}`, all 511
subsets solved exactly (7.1 s), 9330 pairs:

| `Δ = L(P∪Q) − L(P) − L(Q)` | count |
|---|---|
| `Δ < 0` — sub-additive, the guess | **0** |
| `Δ = 0` — exactly additive | 398 |
| `Δ > 0` — super-additive | 8932 |

min 0, q25 3, median 8, q75 15, **max 44, mean +10.516**. Every one of the 398
equality cases is a small-set case: with **both** parts of size ≥ 3 the count of
exact equality is **0**. Mean `Δ` by the size of the smaller part: 4.57, 7.97,
15.81, 31.48 at `min(|P|,|Q|) = 1..4`. **The deficit does not exist and the
excess grows.**

## 3. Where the intuition is actually right [VERIFIED] — the load-bearing finding

Drop disjointness and **the sign flips**, because one prime cannot hold two
translations at once. The degenerate case is `Q = P`: `L(P ∪ P) = L(P) < 2L(P)`,
sub-additive by a clean factor of two. Across all 120,975 overlapping pairs,
38.5% are sub-additive, and **the deficit is monotone in the number of shared
primes**:

| `|P ∩ Q|` | pairs | mean `Δ` | min `Δ` | share sub-additive |
|---|---|---|---|---|
| 1 | 29520 | +8.21 | −3 | 0.177 |
| 2 | 39348 | +5.83 | −7 | 0.297 |
| 3 | 30576 | +2.48 | −12 | 0.466 |
| 4 | 15246 | **−2.31** | −20 | 0.643 |
| 5 | 5040 | −8.96 | −27 | 0.863 |
| 6 | 1092 | −18.06 | −34 | 0.983 |
| 7 | 144 | −30.58 | −40 | 1.000 |
| 8 | 9 | −47.00 | −52 | 1.000 |

It crosses zero at an overlap of four primes out of nine. **The deficit is a
function of the shared primes and of nothing else**: provably absent at zero
overlap, turning on the moment primes are reused, deepening monotonically.

**So the instinct is a correct instinct about prime reuse, misfiled as a
statement about set union.** That is worth recording as a positive result, not
a correction.

## 4. The law, and the coordinate in which the intuition survives [MEASURED]

`mbar(P) = ∏_{p∈P} p/(p−2)` is exactly multiplicative over a disjoint union.
The residual `r(P) = (L(P)+1)/mbar(P)` is not: mean `r` runs

`1.67, 3.50, 4.12, 4.95, 5.85, 7.15, 8.45, 10.68, 12.11` at `|P| = 1..9`,

**roughly linear in `|P|` where `mbar` is multiplicative.** Hence

> `L(P ∪ Q) + 1  ≈  mbar(P)·mbar(Q)·r(|P|+|Q|)`

— **merging multiplies the spacings and only adds the residuals.**

Against the natural multiplicative baseline `(L(P)+1)(L(Q)+1)` the merge ratio
has **min 0.264, mean 0.504, max 1.346**, and only 116 of 9330 pairs (1.2%)
exceed 1, none with both parts of size ≥ 2. **`L` is super-additive but
sub-multiplicative.** "The combined set does less than you would expect" is
**true** of the multiplicative baseline and **false** of the additive one Chris
named. That is the steelman and it survives.

## 5. The defect compounds; it does not saturate [VERIFIED]

All 21,147 set partitions of the pool. Best floor any `k`-part partition can
give, against the truth `L = 64`:

| parts `k` | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| best floor | 64 | 53 | 41 | 37 | 28 | 18 | 15 | 11 | 9 |
| interaction share | 0.000 | 0.172 | 0.359 | 0.422 | 0.563 | 0.719 | 0.766 | 0.828 | 0.859 |

Monotone. **A many-block merge is the worst case for the floor, not the best,
and there is no `k` at which the floor climbs back onto `L`.** At the finest
partition 86% of `L` is pure interaction.

## 6. The tile coordinate, where phases really can fail to line up [PROVEN + MEASURED]

The corpus `L` is a **block** `L`: runs of consecutive `T₅` slots. There the
concatenation argument is not free, because the slot after a run sits at a phase
the first run dictates. Translating by a multiple of 30 moves a run to any slot
of the **same** phase (30 is a unit mod every block prime), and a prefix of a run
of length `x` is a run of any length `x′ ≤ x`, so the proven floor is

> `ℓ(P ∪ Q) ≥ max over f, over x′ ≤ ℓ_P(f), of  x′ + ℓ_Q((f + x′) mod 3)`.

Over all 301 disjoint sub-block pairs inside block 1, computed exactly over full
periods: **0 violations of that floor, and 0 of the naive `ℓ_P^max + ℓ_Q^max`**
(naive is **[MEASURED]** true here, **not proven** — it exceeds the proven floor
in 18 pairs, so it is not implied). Excess above the naive floor: mean 3.16,
max 10. **Phase misalignment costs a couple of slots and never reverses the
sign.**

## 7. The price against 529

The largest block-1 bound that clears `23² = 529` is **`B = 51`**
(`maxsum₅₂(T₅) = 522 ≤ 529 < 534 = maxsum₅₃`). The standing bound 62 gives 630;
the truth 19 gives 204.

- **(i) Super-additivity kills the upper-bound-by-splitting family outright.**
  If `L` were sub-additive, bounding each sub-block exactly and adding would
  bound the union, and the 63 exact sub-block truths would be a cheap road to a
  small `B`. The inequality runs the other way. **Splitting produces floors,
  never ceilings.**
- **(ii) It is not an obstruction either.** The best two-part floor inside block
  1 is `{13} + {7,11,17,19,23} = 1 + 14 = 15`, far under both the truth 19 and
  the requirement 51. Nothing here forbids 529; nothing here reaches it.
- **(iii) The compounding of §5 says a many-block merge is the worst case.**
  So merging is not a route to 529 in either direction.

## 8. Not a revival of the squaring ladder

The `v → v²` block ladder and the "block as a set" family were closed on
2026-08-18 (`attack-block-00-ADJUDICATION.md`, `attack-block-01..10`). Those ask
whether a bound at `v` **lifts** to `v²` — reusing the same structure at a larger
scale. This asks how `L` behaves under a **disjoint union at one level**. The
answer runs opposite to what a lift would need, and §3 says why the ladder was
always going to be hard: **a ladder step reuses primes, and prime reuse is
exactly the regime where the deficit is real.** This is a reason the ladder
stays closed, not a way to reopen it.

## 9. The instrument, and its range

Complete depth-first search on the least uncovered point, so **"infeasible" is a
proof and not a search failure**; the only pruning is a valid capacity bound. No
greedy is used and nothing is bisected — the brief's warning that greedy success
is non-monotone is respected by not using a greedy at all.

**Four independent validations, all clean.**
1. **Literal brute force** over every phase vector, longest covered run over a
   full period: agrees at `{5,7}` (35), `{5,7,11}` (385), `{5,7,11,13}` (5005),
   `{7,11,13,17}` (17017). 4/4.
2. **`sift-limit-attack.md` §7a**: the `{5,7,11}` feasible set is exactly
   `1..9`, contiguous. Reproduced.
3. **`exact-g2-ladder.js`**: `L(primes ≤ x) + 1 = G₂(x#)` at **all nine levels**
   `x = 2..23`, i.e. `2, 6, 12, 30, 42, 66, 108, 150, 204`.
4. **`block-L-first-dead.js` §5**: eight `T₅` sub-block truths reproduce,
   including the full block 1 at 19.

**A by-product worth its own line [VERIFIED].** Validation 3 says the
**free-translate covering form buys nothing over the pinned `{0,−2}` sieve form**
at any level we can reach: `L_free(primes ≤ x) + 1 = G₂(x#)` exactly, nine for
nine to `x = 23`. `units.js` §5 records that the two formulations have opposite
freedom and that confusing them caused error 7; it does not record that at these
levels the extra freedom is worth **zero**. That is new, and it is a small
strengthening of every argument that quietly treats the two as interchangeable.

**Range.** Exhaustive to nine primes (511 subsets, 7.1 s); a tenth prime costs
roughly an order of magnitude. Downward closure re-verified in this coordinate
per `L`, each `L` its own exact call, probed six past the first failure over 8
sets: **0 revivals**.

## Sources

`research/sift-limit-attack.md` §7a · `research/block-L-first-dead.js` §§1, 5 ·
`research/exact-g2-ladder.js` `LADDER` (x = 2..23) · `research/qc/units.js` §§2,
4, 5 · `research/two-class-lower-bounds.md` §1 (free translate via CRT) ·
`history/staging/attack-block-00-ADJUDICATION.md` and `attack-block-01..10`
(the closed ladder) · all numbers in this file from
`research/attack-L-subadditivity.js`, run 2026-08-19, output embedded by
`research/qc/embed.js`.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
