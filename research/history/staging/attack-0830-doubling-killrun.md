# The weighted kill-run computed exactly at fourteen steps, and the per-fold composition across one doubling step ruled out: it is a product, it is dominated by yesterday's certificate at every step, and it exceeds the allowance from s = 9 on and for all large s

<!-- ledger
id: Q-doubling-killrun-0830
status: PARTIAL
todo: D
question: Can the exact per-fold L bounds of the pi(2s) - pi(s) folds inside one doubling step compose to an upper bound on the weighted kill-run below the allowance 8 Ghat(s)/gbar(s), for all s, without passing through K*?
verdict: No, and the composition is closed as a route, not merely unproven: the folds compose as a PRODUCT, K*+1 <= prod_j (1+L_j) (PROVEN here, exact at fourteen steps, 540 against 18 at s = 16), the composed certificate never sits below yesterday's maxsum certificate (PROVEN by monotonicity), it exceeds the allowance at 8 of 14 enumerable steps starting at s = 9 (VERIFIED), and since every fold kills a slot the composed index is at least 2^N, whose floor 2^N gbar(s) alone exceeds 8 Ghat(s) at the chain rungs 16, 32, 64 and beats the cited polynomial ceiling on Ghat for all large s (PROVEN given the ceiling); the sum form is false at seven steps and the max form is a floor; the weighted run itself, computed exactly, sits at 0.83 of its allowance at s = 16 and (M8) is exactly where yesterday left it, OPEN.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-doubling.md`).** Both
> proofs re-derive and the product theorem was stressed far past what this
> note ran: 21,641,346 nesting links over 6,012,804 killed runs, 0 failures,
> with the zero-kill fold fired on 5,909,600 runs (it is the trivial case,
> not an exception). One clause WEAKENED: "the truth sits under it everywhere
> (sup w/a = 0.8295)" attaches the CERTIFICATE's ratio to the word truth; the
> truth's own sup is 0.6591. `REFUTED.md` row 98 is corrected.

*2026-08-30 wave. Producer:
`research/history/staging/attack-0830-doubling-killrun.js` (formal embed; the
tail carries the hashes; run 423 s under `embed.js`, timing on stderr only).
Nothing committed; no git command run; no existing document edited;
publication moratorium respected. HELD, awaiting the standing one-pass
adversarial review. Legend as in `research/sift-limit-attack.md`:
**[PROVEN]** proof given here or in a cited corpus note; **[VERIFIED]** checked
computationally here; **[MEASURED]** empirical, finite range; **[INFERRED]**
deduction from sourced facts; **[CITED]** taken from a corpus artifact, not
recomputed; **[OPEN]** not proven, not refuted.*

---

## 0. The verdict, up front

> **The composition does not close and cannot be made to close. Inside one
> doubling step the `N = π(2s) − π(s)` folds compose as a product: a killed
> level-`s` run of length `K` satisfies `K + 1 ≤ ∏_j (1 + L_j)` with `L_j` the
> exact per-fold run length on the `j`-th intermediate tile (proof in §2, an
> instance at every one of the fourteen enumerable steps). The product is
> never below yesterday's certificate `maxsum_{K*+1}(T_s)`, so it cannot
> improve on it; it exceeds the allowance `8·Ĝ(s)` at eight of fourteen steps,
> first at `s = 9`, by a factor 20.83 at the sup step `s = 16`; and because
> every fold kills at least one slot, the composed index is at least `2^N`,
> so the composed certificate is at least `2^N·ḡ(s)`, which already exceeds
> `8·Ĝ(s)` at the chain rungs 16, 32 and 64 without any walk and beats the
> corpus's proven polynomial ceiling on `Ĝ` for all large `s`. That is a
> truth gap on the fourteen points and a proven divergence past them, not a
> proof gap. The sum form `K* + 1 ≤ 1 + Σ L_j` is false at seven of fourteen
> steps; the max form is a floor. The weighted kill-run itself, defined in
> yesterday's notation and computed exactly, sits at 0.8295 of its allowance
> at `s = 16` and lower everywhere else on the range, so (M8) holds where it
> can be seen and is untouched past `s = 18`. The composition is not the
> closed fold recursion (no exponent is averaged; the per-step target stays
> `log₂ 8 = 3`); it is the Tail-Count Transport chain with the window index
> forced to grow, and it fails at the opposite end of the index dial from the
> closed fixed-index version. Nothing here bounds `K*` or `C₂` for any
> `s > 18`.**

Numbers below are quoted from the producer's bound OUTPUT block
(`attack-0830-doubling-killrun.js`, lines 516 to 735) or from cited artifacts
by file and line; none is typed from a run.

## 1. (a) The weighted kill-run, defined exactly, and its table

Notation as in `attack-0829n-doubling-bridge.md` §3: `T_s` the level-`s` tile,
`D_s` its census, `ḡ(s) = P(s)#/D_s` its mean gap, `Ĝ(s) = G₂(P(s)#)`,
`maxsum_m(T_s)` the largest sum of `m` cyclically consecutive level-`s` gaps
(for `m ≥ D_s` the window wraps `⌊m/D_s⌋` full periods), `Q = {q prime : s <
q ≤ 2s}`, `N = |Q|`, `K*(s)` the longest run of consecutive level-`s` slots
all killed by `Q`. Yesterday's step 2 is the identity `Ĝ(2s) = max over
killed runs R of span(R)`; yesterday's (R) weights the run by the ground it
stands on. Written out in mean-gap units, the three objects are:

- **the weighted kill-run (truth)** `w_true(s) := Ĝ(2s)/ḡ(s)`, the span of
  the longest killed run in units of the level-`s` mean gap;
- **the weighted kill-run (certificate)** `w(s) := maxsum_{K*(s)+1}(T_s)/ḡ(s)
  = (K*+1)·ρ(s, K*+1)`, yesterday's maxsum certificate in the same units;
- **the allowance** `a(s) := 8·Ĝ(s)/ḡ(s)`.

Then `(D8)` at step `s` is `w_true(s) ≤ a(s)` and `(M8)` is `w(s) ≤ a(s)`;
`w/a = msc/8` exactly. The sandwich `w_true ≤ w ≤ a` is yesterday's step 3
restated. Computed at all fourteen enumerable steps (producer F, lines 641
to 675):

| step | s | ḡ | w_true | w | a | w_true/a | w/a |
|---|---|---|---|---|---|---|---|
| 7#→17# | 9 | 14.00 | 7.71 | 7.71 | 17.14 | 0.450 | 0.450 |
| 11#→23# | 12 | 17.11 | 11.92 | 12.27 | 19.64 | 0.607 | 0.625 |
| 13#→29# | 15 | 20.22 | 12.76 | 14.84 | 26.11 | 0.489 | 0.568 |
| 13#→31# | 16 | 20.22 | 17.21 | 21.66 | 26.11 | 0.659 | 0.830 |
| 17#→31# | 17,18 | 22.92 | 15.18 | 20.16 | 37.70 | 0.403 | 0.535 |

(the other nine rows are in the block, lines 646 to 672). `w_true ≤ w ≤ a`
at all fourteen; sup of `w/a` is `0.8295` at `s = 16` (line 675), which is
`6.6364/8`. So the weighted run stays within its allowance with a margin of
17 percent at the worst enumerable step, and the truth with a margin of 34
percent. **[VERIFIED]** This is the item's stated first test and it is
passed on the range; it says nothing about `s > 18`.

## 2. (b) The per-fold composition: it is a product, and here is why

**Setting.** Order `Q = {q_1 < … < q_N}` and fold in prime order:
`T^(0) = T_s`, `T^(j) = T^(j−1)` folded by `q_j`, `T^(N) = T_{2s}`. In prime
order `T^(j−1)` is `T_{q_{j−1}}`, the tile one prime below `q_j`, so every
intermediate tile is a diagonal tile of the ladder. Let `L_j = L(T^(j−1),
q_j)` be the longest run of consecutive `T^(j−1)` slots killed by `q_j`,
scanned on the big tile of period `P(s)#·q_1⋯q_j` (the implementation trap
of `prop-exact-fold-L.md` §3: a cyclic scan of one copy is wrong). The
producer computes each `L_j` by direct streaming enumeration, not through the
alternation-window statistic, so nothing below depends on the equality lemma
of `prop-exact-fold-L.md`; that lemma enters only in §3 as the reason no
sharper per-fold input exists.

**Theorem (product composition) [PROVEN].** Let `R` be a run of `K`
consecutive level-`s` slots all killed by `Q`, and let `m_j` be the number of
slots of `R` surviving `q_1, …, q_j` (`m_0 = K`, `m_N = 0`). Then for each
`j`, `m_{j−1} + 1 ≤ (m_j + 1)(1 + L_j)`, hence `K + 1 ≤ ∏_{j=1}^{N} (1 + L_j)`,
and in particular `K*(s) + 1 ≤ ∏_j (1 + L_j)`.

*Proof.* The `m_{j−1}` survivors of `q_1..q_{j−1}` inside `R` are consecutive
slots of `T^(j−1)`, because every level-`s` slot between two of them lies in
`R` and is killed by one of `q_1..q_{j−1}`. Among these `m_{j−1}` consecutive
`T^(j−1)` slots, those killed by `q_j` form at most `m_j + 1` maximal
stretches, one before each of the `m_j` survivors of `q_j` and one after the
last, each stretch being a run of consecutive `T^(j−1)` slots killed by
`q_j`, hence of length at most `L_j`. So `m_{j−1} ≤ m_j + (m_j + 1)·L_j`,
which is the link. Multiply the links from `j = N` (where `m_N + 1 = 1`)
down to `j = 1`. ∎

**The two companion facts [PROVEN].** (i) `K* ≥ max_j L_j`: a run of `L_j`
consecutive `T^(j−1)` slots killed by `q_j` spans a stretch of level-`s`
slots every one of which is killed by some `q_i`, `i ≤ j`. (ii) The maxsum
transport across one fold: `maxsum_m(T^(j)) ≤ maxsum_{m(1+L_j)}(T^(j−1))`,
because `m` consecutive `T^(j)` gaps are spanned by `m + 1` consecutive
`T^(j)` slots with at most `L_j` killed `T^(j−1)` slots between each adjacent
pair, hence by at most `m(1 + L_j)` consecutive `T^(j−1)` gaps. Composing (ii)
from `T^(N)` down to `T^(0)` with `m = 1` at the top gives the **composed
certificate**

    (C)    Ĝ(2s) ≤ maxsum_{M(s)}(T_s),   M(s) := ∏_{q ∈ (s, 2s]} (1 + L(T_{q⁻}, q)),

`q⁻` the prime below `q`. Since `K* + 1 ≤ M` and `maxsum_m` is monotone in
`m`, `maxsum_{M}(T_s) ≥ maxsum_{K*+1}(T_s)`: **the composed certificate is
never tighter than yesterday's maxsum certificate, at any `s`.** [PROVEN]

**Which rule: product, not sum, not max.** The sum form `K* + 1 ≤ 1 + Σ_j
L_j` is not a theorem and is false on the data at seven of fourteen steps
(`18 > 14` at `s = 16`, `14 > 12` at `s = 17`; line 586); as a certificate
`maxsum_{1+ΣL_j}(T_s)` even falls below the truth `Ĝ(2s)` at `s = 4` and
`s = 10` (line 700). The max form is fact (i), a floor on `K*`, not a
certificate. **[VERIFIED]**

**The table (producer C, D, E, G).** Per-fold `L_j` in prime order, the
product `M`, the certificate, against the truth:

| step | s | L_1..L_N | M = ∏(1+L_j) | K*+1 | 1+ΣL_j | M/(K*+1) | w_prod = maxsum_M/ḡ | a | w_prod/a |
|---|---|---|---|---|---|---|---|---|---|
| 7#→13# | 7,8 | 1 2 | 6 | 4 | 4 | 1.50 | 7.71 | 17.14 | 0.450 |
| 7#→17# | 9 | 1 2 2 | 18 | 6 | 6 | 3.00 | 19.71 | 17.14 | 1.150 |
| 7#→19# | 10 | 1 2 2 2 | 54 | 9 | 8 | 6.00 | 55.71 | 17.14 | 3.250 |
| 11#→23# | 12 | 2 2 2 3 | 108 | 11 | 10 | 9.82 | 110.45 | 19.64 | 5.625 |
| 13#→29# | 15 | 2 2 3 2 | 108 | 11 | 10 | 9.82 | 112.75 | 26.11 | 4.318 |
| 13#→31# | 16 | 2 2 3 2 4 | 540 | 18 | 14 | 30.00 | 543.86 | 26.11 | 20.830 |
| 17#→31# | 17,18 | 2 3 2 4 | 180 | 14 | 12 | 12.86 | 188.76 | 37.70 | 5.007 |

(all fourteen rows: lines 541 to 580, 624 to 638, 679 to 695). The per-fold
values are the diagonal cells of `a3-05-bound-L.md` §4's table, `7:2 11:1
13:2 17:2 19:2 23:3 29:2 31:4`, reproduced consistently wherever a cell
recurs across steps (line 587). `K* + 1 ≤ M` holds at all fourteen steps and
in reverse fold order too (producer D); order changes `M` both ways (864
against 540 at `s = 16`, 72 against 108 at `s = 12`, lines 609 to 615) and no
order can go below `K* + 1` or below `2^N`. The composed certificate exceeds
the allowance at 8 of 14 steps, first at `s = 9`, and is under it only at
`s ≤ 8` (line 697). **[VERIFIED]**

**Where the product loses.** The nesting chain along the actual longest run
(producer E) shows the links `(m_{j−1}+1)/((m_j+1)(1+L_j))` running 0.34 to
1.00; at `s = 16` the chain is `17 13 10 7 4 0` with links `0.43 0.42 0.34
0.53 1.00` (line 637). A fold's kills inside the run are not maximal runs
between every pair of survivors, and the number of stretches the next fold
may fill is the next level's own run length: the self-similarity yesterday
named, here as the reason the composition is multiplicative. **[MEASURED]**

## 3. (c) The single inequality that does not close, and that it is a truth gap

For the composition to deliver (M8) it needs

    (C8)   ∀ s ≥ 2:   maxsum_{M(s)}(T_s) ≤ 8·Ĝ(s),   M(s) = ∏_{q∈(s,2s]} (1 + L(T_{q⁻}, q)).

(C8) is false, in three ranges, all in the same direction:

- **On the fourteen points, exactly.** False at `s = 9, 10, 11, 12, 13, 15,
  16, 17` (line 697); at `s = 16` the left side is 20.83 times the right
  (line 699). **[VERIFIED]**
- **On the chain rungs with a known `Ĝ(s)`, by a floor and no walk.** Every
  fold kills at least one slot (`T^(j−1)` is non-empty and its period is
  coprime to `q_j`, so the copies of any slot meet every class mod `q_j`,
  class 0 included), so `L_j ≥ 1` and `M(s) ≥ 2^N`. And `maxsum_m(T_s) ≥
  m·ḡ(s)` for every `m` (the average over the `D_s` cyclic starting positions
  of an `m`-window sum is exactly `m·ḡ`; checked to `m = 200` at seven tiles,
  line 537). So the left side of (C8) is at least `2^N·ḡ(s)`. That floor
  alone exceeds `8·Ĝ(s)` at `s = 16, 32, 64` by factors 1.226, 1.481 and
  41.348 (lines 710 to 718; the `s = 64` term is Wang's literature-grade
  `G₂(61#) = 1080`). **[PROVEN the floor; VERIFIED the rungs]**
- **For all large `s`, by the cited ceiling.** `N(s) ~ s/ln s` and
  `Ĝ(s) ≪_ε s^{β₂+ε}` with `β₂ = 4.26645` (`G2-STATE.md` line 426, PROVEN
  there, `paper/beta2-note.md`), so `2^{N(s)} ḡ(s)/(8·Ĝ(s)) → ∞`. The crude
  count `N(s) > 3 + β₂ log₂ s` first holds at `s = 217` (line 720). The
  polynomial ceiling is load-bearing: the trivial `Ĝ(s) < P(s)#` does not
  suffice against `2^{s/ln s}`. **[PROVEN given the cited ceiling]**

So (C8) is a **truth gap**, not a proof gap: the composed inequality (C) is a
theorem and its right side is genuinely above `8·Ĝ(s)` from `s = 9` on and
asymptotically. The gap is exponential against polynomial: `M(s) ≥ 2^{N(s)}`
while the allowance `8·Ĝ(s)/ḡ(s)` is at most polynomial in `s`. No
sharpening of the per-fold input can repair this, for two independent
reasons: the per-fold `L_j` used here are exact (direct enumeration; and by
`prop-exact-fold-L.md`, at its PROPOSAL grade, no re-derivation of the
alternation automaton moves them, the `3/2` constant being a min-plus Perron
root), and the floor `L_j ≥ 1` already forces `2^N`. The only inequality
that would close a fold-by-fold route is one in which the folds compose
additively, and §2 shows the composition is multiplicative because of the
nesting of survivors. **[INFERRED from the two PROVEN facts]**

What remains open is exactly yesterday's (R), equivalently (M8), for
`s > 18`: `K*(s) + 1 ≤ 8·[Ĝ(s)/ḡ(s)]/ρ(s, K*+1)`, with `K*` bounded above by
nothing proven except the divergent product `M(s)`, and below by `N(s)` and
by `max_j L_j`. **[OPEN]**

## 4. (d) Kill check against the two closed chains

**Against the fold recursion `β_{k+1} = (β_k + φ_k)/2` (CLOSED,
`attack-block-00-ADJUDICATION.md` attack 10).** That recursion averages
exponents block by block and forgets its start at rate `2^{−k}`, so the
per-block exponent to prove equals the global exponent 2. Nothing here
averages an exponent: the composition lives inside one doubling step, its
target stays `C₂ = 8`, exponent `log₂ 8 = 3`, and its output is an index
`M(s)` in a maxsum, not an exponent. The failure mode is different too: the
recursion's requirement was exponent-invariant; the composition's requirement
is violated by a superpolynomial factor. It is not that row.
**[INFERRED]**

**Against the Tail-Count Transport chain (CLOSED, `REFUTED.md` row 67,
`attack-foldL-03-transport.md` §4).** Fact (ii) of §2, `maxsum_m(T^(j)) ≤
maxsum_{m(1+L_j)}(T^(j−1))`, is the transport of a maxsum window family
across a fold, and composing it across the `N` folds of a step is the
transport chain. The closed version held the window index fixed and
certified a constant (108, 180, 240, 330) against a truth that diverges
(66 to 258); that note priced the cure as "the index must grow with the
level". Here the index grows at the rate the fold forces, `m ↦ m(1 + L_j)`,
and the certificate diverges past the truth by a factor that itself
diverges (`M/(K*+1)` runs 1.00 to 30.00 on the range, line 637; `2^N`
against polynomial in the limit). The same chain fails at both ends of the
index dial, and no index law between "fixed" and "multiplied by `1 + L_j`
per fold" is a theorem; the exact rate is the nesting chain `m_j`, which is
`K*`'s own decomposition and is not known a priori. This is
`attack-hsub-01.md` §4(i)'s `exp(#folds)` compounding, made exact with the
constants `1 + L_j ∈ {2, 3, 4, 5}` on the range. It lands on no refuted row
as stated (the transport row is about a fixed index; the localized-merge
block rows 27 and 30 concern `M` of the merge chain, a different object) and
reopens none. **Verdict: the per-fold composition is CLOSED as a route to
(M8) by §3; it is a new row for the registry, not a reopening.**

## 5. (e) How the composed bound sits at the largest enumerable s

It sits above, not below. At `s = 17, 18` (`17#→31#`) the composed certificate
reads `w_prod/a = 5.007`, that is 5.01 times the allowance, and 12.43 times
the truth `w_true`, with `M = 180` against `K* + 1 = 14` (line 698). At the
sup step `s = 16` it reads 20.83 times the allowance and 31.60 times the
truth, `M = 540` against 18 (line 699). Yesterday's certificate at the same
two steps reads 0.535 and 0.830 of the allowance (§1). The slack a reader
should carry is therefore the ratio of the composed index to the true run,
`M/(K*+1)`: 12.86 and 30.00 at the two largest steps, rising with `N`
(line 624 to 638). **[VERIFIED]**

## 6. Chain of custody, and the brief checked

In this order, nothing new trusted before the old was reproduced (producer A
to C, lines 516 to 585):

- The two ladders parsed from their keepers; the `C₂` table `s = 2..41`
  rebuilt and compared field by field against the table bound in
  `attack-doubling-01.js`'s OUTPUT block: 40 of 40 rows, 8 fields (line 521);
  sup `58/11 = 5.2727` at `s = 16`, chain rows `3.0000 5.0000 2.2000 5.2727
  3.1034` (line 522).
- Yesterday's OUTPUT block parsed at run time from
  `attack-0829n-doubling-bridge.js`: 14 sandwich rows and 14 walk rows (line
  524); its fourteen maxsum-certificate values `3.0000 2.0000 5.0000 2.5000
  3.5000 2.6000 3.6000 5.0000 4.0000 5.0000 3.6364 4.5455 6.6364 4.2778`
  (line 525).
- A fold-chain engine written fresh for this pass (one streaming pass per
  entering prime, survivors by bitmask, the last pass carrying the level-`2s`
  data) re-derives at all fourteen steps `G₂(2s)`, least argmax,
  multiplicity, census, `k`, `K*`, `N` against yesterday's walk rows, and
  `floor`, `C₂`, `msc`, `K*+1` against yesterday's sandwich rows, digit for
  digit (the `ok` lines under each step, sections C and F). `G₂(31#) = 348 @
  8813641451 (×4)` again by two base tiles. **[VERIFIED]**
- Self-test failures: 0 (line 735). Fingerprint `code-sha256 61578274`,
  `out-sha256 abb986f9`, 220 body lines, written by `embed.js`, no `--force`.
  One reading figure was corrected after the embed (a rounding, `41.35` to
  the printed `41.348`); the readings sit below the banner and are outside
  the code hash.

**The brief's claims, checked at their records.** `sup 6.6364 at s = 16 over
fourteen steps`, `C₂ = 8`, the band `[4, 19.2455)`, the trap at `C₂ < 4`,
`K* ≥ π(2s) − π(s)`, the floor's order `s/ln s`, and `θ → ∞`: all as stated
in `attack-0829n-doubling-bridge.md` and `attack-wrongdirection-audit.md`
§3.3, and reproduced or re-read here. One calibration to record: the brief
calls the per-fold statement "PROVEN"; `prop-exact-fold-L.md` §2 grades
itself PROPOSAL, with the equality lemma proven in a staging record, verified
at 36 cells and nine diagonal folds, and never through the live layer or a
second reader. This note does not use the equality lemma for any number (the
`L_j` are enumerated directly) and cites it only for sharpness, at its own
grade. The "`3/2` constant" is the proposal's own phrase for the min-plus
cycle mean `3p` relative to the single-gap floor `2p ∓ 2`; no arithmetic here
depends on it. No error in the brief's numbers was found.

## 7. NOT REACHED, falsifiers, trap grading

**NOT REACHED.**

- (D8), (M8), (R) for any `s > 18`: untouched in both directions.
- The minimum of `M` over all `N!` fold orders: only prime order and reverse
  order were run; the minimum is bounded below by `K* + 1` and by `2^N`
  regardless, so it cannot change §3.
- An additive composition law: none was found and §2 gives the reason none
  exists through nested survivors; whether a different decomposition of a
  killed run (by killer rather than by fold) admits one was not attacked.
- The nesting chain `m_j` as an a-priori object: measured only along the
  longest run at fourteen steps.

**What would falsify each claim, and whether the check has run.**

| claim | falsifier | has it run |
|---|---|---|
| `K* + 1 ≤ ∏(1 + L_j)` | one step, one order, with `K* + 1 > M` | yes: 14 steps, two orders, none |
| the composed certificate never beats yesterday's | one step with `maxsum_M < maxsum_{K*+1}` | yes: dominance at 14 of 14 (line 696) |
| (C8) fails from `s = 9` on the range | a step `s ≥ 9` with `w_prod ≤ a` | yes: 8 of 8 steps at `s ≥ 9` exceed (line 697) |
| `M ≥ 2^N` | a fold with `L_j = 0` | impossible by the class argument; `L_j ≥ 1` at all 117 fold passes run (39 in each order, 39 direct) |
| the floor beats `8Ĝ` at rungs 16, 32, 64 | arithmetic | yes (lines 710 to 718) |
| the sum form is not a theorem | one violating step | yes: seven (line 586) |
| the composition is not the closed recursion | a derivation averaging an exponent | none appears; the target exponent stays 3 |
| the weighted run is within its allowance on the range | one step with `w > a` | yes: 14 of 14 within, sup 0.8295 |

**Trap grading.** `C₂ = 8 ≥ 4` throughout; the all-`s` quantifier is kept in
(D8), (M8) and (C8); nothing here derives or implies any constant below 4;
the only lower bounds used are on the certificate side (`M ≥ 2^N`,
`maxsum_m ≥ m·ḡ`, `K* ≥ N`, `K* ≥ max L_j`), each bounding a certificate or
a run from below, which closes a route and proves nothing about `Ĝ` in the
TPC-relevant direction. Nothing here is a result on the doubling inequality:
one route is closed by an exact table and a proven divergence, and the open
inequality is where it was.

## 8. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/history/staging/attack-0830-doubling-killrun.js` | custody (A), tiles (B), the fold chains and diagonal cells (C), order control and direct folds (D), the nesting chain (E), the weighted run (F), the composition (G), the all-`s` floor (H) |
| `research/history/staging/attack-0829n-doubling-bridge.md`, `.js` | the notation, (R), (M8), the sandwich, the fourteen rows reproduced here |
| `research/attack-doubling-01.js`, `attack-doubling-01.md` | the `C₂` table reproduced field by field |
| `paper/proposals/prop-exact-fold-L.md`; `research/a3-05-bound-L.md` §1, §4, §5; `research/kappa-not-L.md` | the per-fold `L`, the diagonal table, the alternation lemma and its sharpness grade |
| `research/history/staging/hsubpow-explicit-K.md` §2b | Lemma 1, `K* ≥ N` |
| `research/history/staging/attack-hsub-01.md` §4(i) | folds compound to `exp(#folds)` |
| `research/history/staging/attack-foldL-03-transport.md` §4; `research/REFUTED.md` row 67 | the fixed-index transport chain the kill check is run against |
| `research/history/staging/attack-block-00-ADJUDICATION.md` attack 10 | the closed averaging recursion |
| `research/G2-STATE.md` line 426; `paper/beta2-note.md` | `Ĝ(s) ≪_ε s^{β₂+ε}`, the polynomial ceiling §3 needs |
| `research/history/staging/attack-wrongdirection-audit.md` §3.3 | the all-`s` quantifier discipline |
| `research/exact-g2-ladder.js`, `research/import-interp-01-bgt-defect.js` | the two ladders, parsed at run time |

Reproduce with `node research/qc/embed.js --check --timeout 900
research/history/staging/attack-0830-doubling-killrun.js` (173 s standalone,
423 s under a loaded machine).
