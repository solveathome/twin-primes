# The doubling bridge at C₂ = 8: the K* certificate is dead uniformly by a cited lemma, the maxsum certificate is the sharpest proven bridge and holds at fourteen exact steps, and the one inequality that does not close is located

<!-- ledger
id: Q-doubling-bridge-0829n
status: PARTIAL
todo: D
question: Can a bridging certificate carry Ghat(2s) <= 8 Ghat(s) from level s to level 2s uniformly in s, all s, on the base-2 chain?
verdict: Not by any proven mechanism: the K*-product bridge is CLOSED at every C2 by the cited run floor K* >= pi(2s)-pi(s) (K* = 17 at s = 16 by exact walk, VERIFIED, so the certificate reads 18 against 8 on the chain itself; it exits the whole legal band at s = 128, PROVEN); the sharper maxsum bridge Ghat(2s) <= maxsum_{K*+1}(T_s) is PROVEN and holds under 8 at all fourteen enumerable steps (VERIFIED), but its all-s form needs an upper bound on K* against the entering primes' two-class covering that nothing proven supplies; the doubling inequality itself is untouched.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-doubling.md`, a
> column-major engine sharing no line with this producer; every quoted figure
> reproduced digit for digit, including K*(16) = 17 and G₂(31#) = 348 @
> 8813641451 ×4 from BOTH base tiles).** One statement REFUTED: this note's
> NOT-REACHED line on 19#→37# — that walk runs, reproduces the x = 37 ladder
> row (528 @ 544899485411 ×2, census 217929355875) and yields a FIFTEENTH
> step at s = 19, 20: K* = 13, C₂ = 3.5200, certificate 3.8000. (M8) holds at
> fifteen steps, and K*/N reads 3.25 there, so the "rising" reading does not
> continue. `REFUTED.md` row 94 stands and in fact under-claims: Lemma 1 at
> s = 128 alone clears the whole legal band.

*2026-08-29 night wave. Producer:
`research/history/staging/attack-0829n-doubling-bridge.js` (formal embed;
the tail carries the hashes). Nothing committed; no git command run; no
existing corpus document edited; publication moratorium respected. HELD,
awaiting the standing one-pass adversarial review. Legend as in
`research/sift-limit-attack.md`: **[PROVEN]** proof given here or in a cited
corpus note; **[VERIFIED]** checked computationally here; **[MEASURED]**
empirical, finite range; **[INFERRED]** deduction from sourced facts;
**[CITED]** taken from a corpus artifact, not recomputed; **[OPEN]** not
proven, not refuted.*

---

## 0. The verdict, up front

> **No uniform bridge is proven. The one bridge the corpus had, the
> K*-product certificate `Ĝ(2s) ≤ (K*+1)·Ĝ(s)`, is dead at `C₂ = 8` on the
> chain itself: at `s = 16` the exact walk gives `K* = 17`, so the
> certificate reads 18 against the target 8 while the true ratio is
> 5.2727, and by the cited run floor `K* ≥ π(2s) − π(s)` it reads at least
> 14 at `s = 64` and at least 24 at `s = 128`, past the whole legal band.
> The sharper bridge `Ĝ(2s) ≤ maxsum_{K*+1}(T_s)` (the corpus's own
> `G₂(new) ≤ maxsum_{1+L}(old)` shape) is a per-step theorem, stays under 8
> at all fourteen enumerable steps with sup 6.6364 at `s = 16`, and is the
> tightest proven object here: slack 1.00 to 1.33 over the truth where the
> product certificate's runs to 3.27. Its all-s form is the inequality that
> does not close, and it is located exactly: the longest run of consecutive
> level-`s` slots the primes in `(s, 2s]` can kill, weighted by the ground
> it stands on, must stay within 8 records. Nothing proven bounds that run
> from above; the counting bound needs `θ < 1` and `θ → ∞` (cited); the
> run's proven floor grows like `s/ln s`. The doubling inequality itself is
> untouched in both directions. The telescoped chain is a Cesàro mean of
> `log₂ C₂`, so no rung gains anything and the per-step inequality at every
> large `s` is the whole content; it is not the closed fold recursion, whose
> per-block target was exponent 2, and it lands on no refuted row.**

Numbers below are quoted from the producer's bound OUTPUT block
(`attack-0829n-doubling-bridge.js`, lines 464 to 652) or from cited artifacts
by file and line; none is typed from a run.

## 1. (a) The statement, quantifiers fixed

**(D8).** For every integer `s ≥ 2`: `Ĝ(2s) ≤ 8·Ĝ(s)`, where
`Ĝ(t) = G₂(P(t)#)`, `P(t)` the largest prime `≤ t`, and `G₂(p#)` the maximal
cyclic gap between consecutive twin-admissible slots modulo `p#`
(`attack-doubling-01.md` §1). Chain form: for every `k ≥ 1`,
`Ĝ(2^{k+1}) ≤ 8·Ĝ(2^k)`.

- **Quantifier.** ALL `s` (all `k`), including `s = 16`. The eventual form
  `∀k ≥ k₀` is excluded on purpose: it drops the `s = 16` witness and past
  it the chain carries one datum, `1080/348 = 3.1034` at literature grade,
  so every `C₂ ∈ (3.1034, 4)` would be data-consistent and TPC-implying
  (`attack-wrongdirection-audit.md` §3.3). Every statement in this note is
  all-`s`.
- **Constant.** `C₂ = 8`, inside the legal band `[4, 19.2455)`: the trap is
  `C₂ < 4` (`ln C₂ ∈ [1.1325, 1.3863)`), and 8 sits above the exact sup
  `348/66 = 5.2727` by a factor the data leave open. The exact table has
  every `C₂(s) ≤ 8` for `s = 2..41` (producer, A). **[VERIFIED]**
- **Direction.** (D8) bounds the level-`2s` record ABOVE by the level-`s`
  record. That is the legal direction: an upper bound on `Ĝ` lowers the
  exponent ceiling and certifies no twin prime; the payout is
  `limsup ln Ĝ(x)/ln x ≤ log₂ 8 = 3.0000 < β₂ = 4.26645` through the
  Cesàro identity of §4 and (H-mono) (`fekete-1d.md` §5, cited). Nothing in
  this note bounds `Ĝ` below except where the bound is the adversary's own
  construction (§3 step 3), which runs in the opposite direction and is
  used only to measure slack.

## 2. (b) The finite-level mechanism, re-derived, and why it is per-level

**The Bridging Lemma [PROVEN, re-derived].** A twin-admissible slot at
level `2s` is an integer `r` with `r` and `r+2` coprime to `P(2s)#`; that
condition contains the level-`s` one, so the level-`2s` slots are a
sub-sequence of the (periodic) level-`s` slots. A level-`2s` gap
`[a, b]` therefore contains `k ≥ 0` level-`s` slots, each divisible (itself
or plus 2) by a prime `q ∈ (s, 2s]`, and `b − a` is the sum of the `k+1`
consecutive level-`s` gaps it spans. Each of those is `≤ Ĝ(s)` by the
definition of the record, so `Ĝ(2s) ≤ (k+1)·Ĝ(s) ≤ (K*(s)+1)·Ĝ(s)` with
`K*(s)` the longest run of consecutive level-`s` slots all killed by the
entering primes, anywhere in the level-`2s` period. This is the certificate
`C₂ ≤ K*+1` (`attack-doubling-01.md` §3); the producer re-derives it at
the eleven enumerable steps digit for digit against that file's own table
(§5) and adds three steps.

**Why it is per-level and not uniform.** `K*(s)` is defined by a full walk
of the level-`2s` period, `P(s)#` times the product of the entering primes;
the lemma converts one computed quantity into another and carries no
statement about `sup_s K*(s)`. A uniform (D8) through it needs
`K*(s) ≤ 7` for every `s`. That is false, twice over:

- **On the chain, by exact data.** `K*(16) = 17` (13#→31#, walked here for
  the first time; producer line 536), so the certificate is 18 at the very
  rung that carries the sup. The record window there bridges `k = 14`
  killed level-13 slots and does not realize the longest run
  (`k = 14 < K* = 17`, line 618). **[VERIFIED, custody grade]**
- **For all large `s`, by proof.** Lemma 1 of `hsubpow-explicit-K.md` §2b
  (three lines of CRT; red-team CONFIRMED, `redteam-0828-closures.md`
  row 1b) gives `K*(s) ≥ N(s) := π(2s) − π(s)` whenever `D_s ≥ N`. The
  producer checks `K* ≥ N` at all fourteen walked steps (`K*/N` from 1.00 to
  3.40, line 547) and the hypothesis at the rungs that matter. `N ≥ 8`
  first at `s = 34`; on the chain `N(64) = 13`, `N(128) = 23`, and
  `N ≥ 8` at every chain rung from 64 to 1024 (lines 548 to 550). So the
  certificate exceeds 8 at `s = 64` and exceeds the entire band
  `[4, 19.2455)` at `s = 128`, and since `N(s) → ∞` it exceeds every
  constant from some `s` on. **[PROVEN, given the cited lemma; VERIFIED the
  rungs]**

The lemma's second and larger reason for looseness is visible at the sup
step: five entering primes deliver 15 strikes on 14 slots inside the record
window (line 613), so a prime kills about three copies, not one, and the
floor `N` explains under half of `K*` there.

## 3. (c) The bridge attempted at C₂ = 8, step by step

Notation: `T_s` the level-`s` tile (the slot residues modulo `P(s)#`,
`D_s = ∏_{3≤p≤s}(p−2)` of them), `ḡ(s) = P(s)#/D_s` its mean gap,
`maxsum_m(T_s)` the largest sum of `m` cyclically consecutive level-`s`
gaps (`a3-05-bound-L.md` §5, same definition), `N(s) = π(2s) − π(s)`.

**Step 1 [PROVEN].** Level-`2s` slots are a sub-sequence of level-`s`
slots (§2).

**Step 2 [PROVEN, an identity].** Call a run of consecutive level-`s` slots
*killed* if every slot in it is struck by an entering prime, and its *span*
the distance from the surviving slot before it to the surviving slot after
it. Every level-`2s` gap is the span of a killed run (possibly empty) and
every killed run lies inside one level-`2s` gap, so
`Ĝ(2s) = max over killed runs R of span(R)`. This is the object itself
written in level-`s` words; it proves nothing and is where the bridge must
start.

**Step 3 [PROVEN, the sandwich].** A killed run of length `k` spans `k+1`
consecutive level-`s` gaps, so `span(R) ≤ maxsum_{k+1}(T_s) ≤
maxsum_{K*+1}(T_s)` (`maxsum_m` is monotone in `m`; checked at `m ≤ 40`,
producer B). And Lemma 1's construction places a killed run of length `N`
on ANY `N` consecutive slots, so placed on the `maxsum_{N+1}` window it
forces a level-`2s` gap of at least that span. Hence, direction by
direction:

    maxsum_{N+1}(T_s)  ≤  Ĝ(2s)  ≤  maxsum_{K*+1}(T_s)  ≤  (K*+1)·Ĝ(s).

The left inequality is the adversary's (a lower bound on `Ĝ(2s)`; the
classical CRT family of `two-class-lower-bounds.md` §1, not new); the
middle one is the **maxsum certificate**, the corpus's
`G₂(new) ≤ maxsum_{1+L}(old)` (`U-FRAME.md` §5a as quoted at `a3-09-histogram-operator.md` line 176;
`a3-05-bound-L.md` §5 has the same shape for the single-fold `L`), here applied to the doubling block; the right one is the product
certificate of §2. Verified at all fourteen steps, and the floor half at
`s = 19..23` against the exact table (producer E, lines 556 to 586):

| step | s | N | K* | floor | C₂ | msc | K*+1 |
|---|---|---|---|---|---|---|---|
| 13#→23# | 13,14 | 3 | 8 | 2.3636 | 3.0909 | 3.6364 | 9 |
| 13#→29# | 15 | 4 | 10 | 2.5455 | 3.9091 | 4.5455 | 11 |
| 13#→31# | 16 | 5 | 17 | 2.8182 | 5.2727 | 6.6364 | 18 |
| 17#→31# | 17,18 | 4 | 13 | 1.9444 | 3.2222 | 4.2778 | 14 |

(`floor = maxsum_{N+1}/Ĝ(s)`, `msc = maxsum_{K*+1}/Ĝ(s)`; the ten earlier
rows are in the block, lines 562 to 571.) `msc/C₂` runs 1.00 to 1.33 across
the fourteen steps and `(K*+1)/msc` 1.00 to 3.27: the product certificate
loses most of its slack by replacing a sum of gaps with a multiple of the
largest one. **[VERIFIED]**

**Step 4 [PROVEN sufficient; OPEN as a statement].** (D8) follows from

    (M8)   maxsum_{K*(s)+1}(T_s) ≤ 8·Ĝ(s)   for every s ≥ 2.

(M8) holds at all fourteen enumerable steps with sup `6.6364` at `s = 16`
(line 578), and nothing is known about it past `s = 18`. It is sufficient
and not necessary: the record window need not realize the longest run
(`s = 16, 17`) and need not stand on the thickest ground (`ρ = 1.147` at
`s = 16` against the tile mean, line 617). **[VERIFIED the range]**

**Step 5, the split, and the single inequality that does not close.**
Write `maxsum_{m}(T_s) = m·ḡ(s)·ρ(s, m)` with `ρ` the thick-ground factor
(measured `ρ_run` at `m = K*+1`: 1.000 to 1.440 across the fourteen
steps, lines 587 to 602). Then (M8) reads

    (R)    K*(s) + 1  ≤  8 · [Ĝ(s)/ḡ(s)] / ρ(s, K*+1)   for every s.

The left side is a covering quantity: the longest run the two residue
classes of each prime in `(s, 2s]` can jointly cover on the slot sequence.
The right side is a record quantity: how far the level-`s` record exceeds
the tile's mean gap (`Ĝ/ḡ` measured 1.00 at `s = 2` to 4.71 at `s = 17`,
same lines). (R) is the inequality the bridge needs and cannot supply, and
each of its three pieces is open in the direction needed:

- **Upper bound on `K*(s)`: OPEN.** The only a-priori handle is residue
  counting, which closes iff `θ = 2Ĝ(s)Σ_{q∈(s,2s]} 1/q < 1`;
  `θ ≥ 1.3333` at the first step and `θ → ∞` at every base
  (`attack-doubling-01.md` §3; `hsubpow-explicit-K.md` §3). The proven
  floor `K* ≥ N ~ s/ln s` runs the wrong way. `K*` is the entering primes'
  two-class Jacobsthal problem on the slot sequence: self-similar
  (doubling-01 §3), and the block campaign's combined-`L` object at the
  doubling block (`attack-block-00-ADJUDICATION.md`; its counting bound is
  the same `θ` machinery).
- **Upper bound on `ρ(s, m)` at `m ≈ K*`: OPEN.** A bound on the largest
  sum of `m` consecutive gaps for `m ~ s/ln s` is a generalized Jacobsthal
  statement; the trivial one, `ρ ≤ Ĝ/ḡ`, returns the product certificate
  and Lemma 1's divergence.
- **Lower bound on `Ĝ(s)/ḡ(s)`: order proven, constant not in hand.**
  `ḡ(s) ≍ ln² s` (Mertens) and `G₂(x#) ≫ x ln x` from published
  ingredients (`G2-STATE.md` §PROVEN, NOT refereed), so the right side of
  (R) grows at least like `s/ln s`, the same order as the left side's
  floor. A race of constants at exponent one, with the constant on the left
  unproven in any form. **[CITED the bound; INFERRED the comparison]**

So the bridge at `C₂ = 8` reduces to (R): a run-length upper bound of the
same order as the run's proven lower bound, against a record lower bound of
the same order. Random-model heuristics put `K*` near `s/ln ln s` and
`Ĝ(s)/ḡ(s)` near `s ln s`, which would leave (R) room of order `ln s`;
that is a heuristic and the fourteen points cannot test it.
**[HEURISTIC]**

**A shortcut that is not one.** Bridging through the intermediate primes
one fold at a time composes `N(s)` single-fold certificates, one per
entering prime, and `N(s) → ∞`: a constant per-fold cap compounds to
`exp(#folds)`, which is `attack-hsub-01.md` §4(i)'s point about (H-sub)
and applies unchanged to (D8). Not pursued. **[CITED]**

## 4. (d) The kill check against the fold recursion and the refuted registry

**Against the fold recursion `β_{k+1} = (β_k + φ_k)/2` (CLOSED,
`attack-block-00-ADJUDICATION.md` attack 10).** Telescoping (D8) along the
chain gives `Ĝ(2^{k+1}) = Ĝ(2)·∏_{j≤k} C₂(2^j)`, hence

    β(2^{k+1}) := ln Ĝ(2^{k+1}) / ln 2^{k+1} = (log₂ Ĝ(2) + Σ_{j=1..k} log₂ C₂(2^j)) / (k+1),

a Cesàro mean of `log₂ C₂` along the chain (checked at `k = 6`:
`β(64) = 1.6795` both ways, line 637). It is an averaging and it forgets
its start, at rate `1/k` rather than the squaring ladder's `2^{−k}`. The
adjudication's lesson transfers in full: the limsup of `β` is at most the
limsup of `log₂ C₂`, no rung contributes anything, and the whole content is
the per-step inequality at every large `s`. What does NOT transfer is the
closure: attack 10 closed because the per-block exponent to prove equalled
the global exponent 2, a TPC-strength requirement. Here the per-step
requirement is `C₂ ≤ 8`, that is exponent `log₂ 8 = 3.0000`, legal and
finite. The bridge is not that row. **[VERIFIED the identity; INFERRED the
scoping]**

**Against the refuted registry.** The residue-density closure and every
constant-factor sharpening (`attack-doubling-01.md` §3): not re-run; used
here only as the reason the `K*` side of (R) has no handle. The block
ladder rows (`REFUTED.md` rows on `L ≤ 62`, the A/B-coupling depth axis,
the submodular certificate): the `K*` object is the block campaign's
combined `L` at a different block; none of those rows bounds it uniformly,
and this note reopens none. The localized merge chain and its block
composition (`REFUTED.md` rows 27 and 30): a different object (the merge
chain's `M`), not touched. The `θ` ladder (row 35): a different `θ`.
**Verdict: the K*-product bridge is CLOSED at every `C₂ < 19.2455` (by
exact data at `s = 16` for `C₂ < 18`, by Lemma 1 at `s = 128` for the
rest); the maxsum bridge is on no refuted row and its all-s form (R) is
OPEN; the question's status is PARTIAL.**

## 5. (e) Chain of custody: the producer against the exact table

Nothing new was trusted before the old was reproduced, in this order
(producer A to C, lines 464 to 543):

- The two ladders are parsed from their keepers (`exact-g2-ladder.js`,
  `import-interp-01-bgt-defect.js`), never retyped, and agree on the 14
  shared terms.
- The `C₂` table `s = 2..41` is rebuilt and compared field by field
  (`P(s)`, `P(2s)`, `Ĝ(s)`, `Ĝ(2s)`, exact fraction, four-decimal ratio,
  grade) against the table bound inside `attack-doubling-01.js`'s own
  OUTPUT block, parsed from that file at run time: 40 of 40 rows identical
  (line 469). **[VERIFIED]**
- Tiles to 23# by fold recursion match the ladder in census, record, least
  argmax and multiplicity at every `p ≤ 23` (lines 474 to 485).
- A walk engine written fresh for this pass (bitmask over copy residues, no
  shift operator; `qc/widths.js` guards on every wide quantity) re-derives
  at the eleven enumerable steps the record, least argmax, multiplicity,
  census, `k`, `K*` and the certificate, each compared against
  `attack-doubling-01.js`'s F-table and walk rows: all equal (lines 487 to
  532). **[VERIFIED]**
- Only then the three new steps: 13#→29#, 13#→31#, 17#→31#. They re-derive
  `G₂(29#) = 258 @ 1205437109 (×2)` and `G₂(31#) = 348 @ 8813641451 (×4)`
  against the exact ladder, the 31# row by two independent base tiles
  (lines 533 to 543). Wall 0.7 s, 26.3 s and 17.6 s. **[VERIFIED]**
- Self-test failures: 0 (line 652). Fingerprint: `code-sha256 a12d2919`,
  `out-sha256 217204ab`, 190 body lines; written by `embed.js`, no
  `--force`.

## 6. How low can C₂ be pushed while staying ≥ 4

- **The K*-product bridge**: nothing below 18 on the chain (`s = 16`, exact),
  and no constant at all for all `s` (Lemma 1). Lowering `C₂` is moot.
- **The maxsum bridge**: on the enumerable range it certifies exactly
  `6.6364` (its sup, `s = 16`, line 578) and cannot certify anything lower
  there, since at `s = 16` the certificate is itself 6.6364 while the truth
  is 5.2727. For every `C ∈ [6.6364, 8]` the all-`s` statement is (R) with
  8 replaced by `C`, the same open inequality with less room; for
  `C ∈ [5.2727, 6.6364)` the bridge is already refuted at `s = 16` as a
  method, though (D8) with that `C` may still be true. Nothing here
  approaches 4, and nothing here is stated for any `C₂ < 4`. The number
  8 was chosen for margin, and the margin bought no structural relief:
  (R) at 8 and (R) at 19.2455 have the same three open pieces.
  **[VERIFIED the range; INFERRED the rest]**

## 7. NOT REACHED, falsifiers, trap grading

**NOT REACHED.**

- (D8) itself: not proven, not refuted, for any `s > 41`; on the chain the
  next datum is `Ĝ(128) = G₂(127#)`, out of reach of any walk.
- (R), equivalently (M8), past `s = 18`: `K*` at 19#→37# and beyond needs
  walks over `D_19 = 378675` slots times four or more entering primes,
  hours in this engine rather than seconds; `s = 32` (31#→61#) has
  `D_31 = 6226553025` base slots (line 536) times seven entering primes and
  is beyond any walk.
- No a-priori bound on `K*(s)`, on `ρ(s, m)`, or on `maxsum_{K*+1}(T_s)`
  is derived. (R) is TODO item 0c's shape at the doubling block (a
  residue-deleted maxsum bounded without a kill count, `U-FRAME.md` §5a),
  which that item records as untried in this repository; this pass did not
  try it either.
- The constant in `G₂(x#) ≫ x ln x` was not extracted and compared with
  `N(s)·ḡ(s)`; the comparison in §3 step 5 is at the level of orders.
- Whether `K*/N` (1.00 to 3.40, rising) keeps rising: fourteen points at
  `P(2s) ≤ 31`.

**What would falsify each claim, and whether the check has run.**

| claim | falsifier | has it run |
|---|---|---|
| the K*-product bridge fails at `C₂ = 8` on the chain | `K*(16) ≤ 7` | yes: `K*(16) = 17` by an exact walk that also reproduces `G₂(31#)` and its argmax from two base tiles |
| it fails for all large `s` | a proof that `K*` is bounded | refuted by the cited Lemma 1, checked here at 14 steps and at the chain rungs 64 to 1024 |
| the sandwich `maxsum_{N+1} ≤ Ĝ(2s) ≤ maxsum_{K*+1}` | one step violating either side | yes: 14 walked steps, plus the floor side at `s = 19..23` against the exact table; none |
| (M8) holds on the enumerable range | one step with `msc > 8` | yes, 14 steps, sup 6.6364 |
| (R) is open | a proven upper bound on `K*(s)` of order `s/ln s` with an explicit constant, plus a bound on `ρ` | none exists in the corpus; the counting bound needs `θ < 1` and `θ → ∞` (cited) |
| the bridge is not the closed fold recursion | a derivation in which the per-step target is exponent 2 | the per-step target here is exponent 3 (`log₂ 8`); the Cesàro identity is verified at `k = 6` |
| the C₂ table reproduces doubling-01 | any differing field | yes, 40 of 40 rows, 8 fields |

**Trap grading.** `C₂ = 8 ≥ 4` throughout; the all-`s` quantifier is kept
in (D8), (M8) and (R); no constant below 4 is derived or implied; the only
lower bounds on `Ĝ` used are the adversary's, in their own direction, for
slack measurement. Nothing here is TPC-implying, and nothing here is a
result: one route is closed by data and a cited lemma, one route is
sharpened and left open at a named inequality.

## 8. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/history/staging/attack-0829n-doubling-bridge.js` | custody (A), tiles (B), fourteen walks (C), the run floor at the rungs (D), the maxsum sandwich and ground table (E), the sup-step anatomy (F), the Cesàro identity (G) |
| `research/attack-doubling-01.js`, `attack-doubling-01.md` | the C₂ table, the eleven certificates, the residue-density closure, the mechanism; reproduced here field by field |
| `research/history/staging/hsubpow-explicit-K.md` §2b, `redteam-0828-closures.md` row 1b | Lemma 1, `K* ≥ π(y′) − π(y)`, proven and red-team confirmed |
| `research/history/staging/attack-wrongdirection-audit.md` §3.3 | the all-`s` quantifier discipline and the trap window |
| `research/history/staging/attack-block-00-ADJUDICATION.md` attack 10 | the closed averaging recursion the kill check is run against |
| `research/a3-05-bound-L.md` §5, `research/U-FRAME.md` §5a, `research/a3-09-histogram-operator.md` line 176 | the maxsum object and the `G₂(new) ≤ maxsum_{1+L}(old)` shape |
| `research/two-class-lower-bounds.md` §1; `research/G2-STATE.md` §PROVEN | the CRT adversary and the `x ln x` lower bound |
| `research/history/staging/attack-hsub-01.md` §4(i) | folds compound to `exp(#folds)` |
| `research/exact-g2-ladder.js`, `research/import-interp-01-bgt-defect.js` | the two ladders, parsed at run time |

Reproduce with `node research/qc/embed.js --check --timeout 600
research/history/staging/attack-0829n-doubling-bridge.js` (about 45 s).
