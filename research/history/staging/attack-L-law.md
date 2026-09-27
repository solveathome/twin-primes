# Attack B: the law of `L`, measured level by level

<!-- ledger
id: Q-L-own-law
status: ANSWERED
todo: none
question: Does L, the adjacent-kill run length, have a law of its own level by level, and which abscissa is it linear in?
verdict: L has no law of its own: (L+1)*mbar(T_v) is approximately G2(y#) at every tile and top prime where both sides are exact, spread 1.0000 to 1.0838 over four tiles at y >= 23 with mean 1.0198, so the residue is quantisation, the abscissa question returns a calibrated negative, and the distance to 529 is priced rather than closed.
-->

*2026-08-19. Attack B of 5, wave of 2026-08-19. Producer:
`research/attack-L-law.js` (about 2.5 minutes; formal embed, `code-sha256` and
`out-sha256` bound, fourteen self-tests and numbered readings in the script's
own tail). Legend as in `research/sift-limit-attack.md`: **[PROVEN]** published
theorem with source; **[VERIFIED]** checked computationally here;
**[MEASURED]** empirical, finite range; **[INFERRED]** deduction from sourced
facts.*

**Assignment.** Measure what `L` does on its own, level by level; say which
abscissa it is actually linear in; and price the distance to 529. A companion
attack asks whether `L` is sub-additive when two prime sets merge. This one asks
for `L`'s own law and does not touch the `v → v²` squaring ladder, closed on
2026-08-18.

---

## 0. The answer, up front

> **`L` has no law of its own.** For every tile `T_v` and every top prime `y`
> where both sides are exact, `(L(v,y) + 1)·m̄(T_v) ≈ G₂(y#)`, and the residue is
> quantisation and nothing else: over `y ≥ 23` the spread of `(L+1)·m̄` across
> four tiles is 1.0000 to 1.0838, mean 1.0198, and it is exactly 1.0000 at
> `y = 53, 61, 73, 79`. So the block coordinate contributes one thing, the divisor
> `m̄(T_v)`, and every question about `L` is the same question about `G₂` in
> different units. **[VERIFIED]**

Three consequences, and they are the whole file.

1. **"Compute `L` at the block where it reaches 529" IS "compute `G₂` there."**
   The block at which `L` reaches 529 is `v = 17` under both the raw and the
   control-corrected growth law. That block holds 54 primes and tops at 289, and
   reaching it means knowing `G₂` at 61 primes against an exact frontier of 22.
   **A clean impossibility, and the reason is not the block coordinate.**
2. **The counting route to 529 at block 1 is closed with a number.** The
   criterion's ceiling is 62, proven; 529 needs `L ≤ 51`; deficit 11 slots,
   factor **1.216**. Meanwhile the object clears 529 by a factor 2.59, so the
   entire distance at block 1 is instrument slack.
3. **The abscissa question has no data-decidable answer at this range**, and the
   control proves it: the bias-corrected exponent moves by 0.441 between frames,
   several times the ±0.09 the corpus quotes on the exponent itself.

**One new exact value.** `L(7, 47) = 50`. The corpus had `≥ 49`
(`research/history/staging/attack-block-03-alternation.md` §6). **[VERIFIED]**

---

## 1. The object, and the instrument that decides it

`L(v, Q)` is the greatest `l` such that some run of `l` consecutive `T_v` slots
is entirely deleted by one two-class set `{a_p, a_p − 2}` per prime `p ∈ Q`,
with every `a_p` free. The `a_p` are free because CRT realises any prescribed
`(s₀ mod p)` at a real `T_v` slot, `gcd(v#, ∏Q) = 1`; this is the covering form
of `{0, −2}`, not the sieve form (`research/qc/units.js` item 5). **[PROVEN]**

**`v = 3` is the interval coordinate.** `T_3 = {5 mod 6}`, one slot per six
integers, so `L(3, {5..y})` is the brief's own `L`, rescaled:
`A144311(π(y)) = 6·L(3,y) + 5` is the length of the integer interval `[1, L]`
covered by two classes per prime up to `y`. **The brief's "`[1,L]` coverable by a
block's primes" and this repo's "combined `L`" are one object in two coordinates,
related by the tile.** **[VERIFIED]** at every level below.

**The instrument is a branch-and-bound decision procedure**, exhaustive rather
than greedy: branch on the first uncovered position over every unused prime and
its two admissible classes, prune with the union bound on the residual. A NO is
therefore a proof. Three validations, all in the script's §2:

| validation | result |
|---|---|
| full-period enumeration, up to 37,182,145 slots, nine instances | **9 / 9 agree** |
| brute force over every legal assignment, `n ≤ 6` | agrees at every level |
| A144311's published terms, `n = 3..8` | `6L+5` reproduces all six |

**The structural point is worth more than the validation.** The pruning bound at
the root node, before any branching, is exactly
`S(l,f) = Σ_p max_a #{i<l : d_i ≡ a or a−2 mod p}` — **Theorem D's counting
criterion is the depth-0 relaxation of this search.** So the criterion can never
be sharper than the search, at any block, by construction. **[INFERRED]**

---

## 2. The ladder, and where exact stops

**The bracket.** A run of `L` deleted `T_v` slots opens a gap of at least
`minsum_{L+1}(T_v)`, and the maximal gap spans at most `maxsum_m` over its own
`m`. So

> `min{m : maxsum_m(T_v) ≥ G₂(y#)} − 1  ≤  L(v,y)  ≤  max{m : minsum_m(T_v) ≤ G₂(y#)} − 1`

with `G₂(y#) = A144311(π(y)) + 1`, whose 22 terms are **proven maximal**, not
best-found (`research/sift-limit-attack.md` §7,
`research/attack-beta2-05-covering-prune.js`). **[PROVEN]**

Combining the bracket, the ladder search and one targeted push pins `L` exactly
in **60 of 90** `(tile, y)` pairs, `y ≤ 79`, `v ∈ {3,5,7,11,13}`; the bracket
alone pins 41 of them and the exhaustive search supplies the other 19. The two
are independent instruments and **agree in 37 of 37 levels where both are
exact, with zero search values outside the bracket.** **[VERIFIED]**

| `y` | `G₂(y#)` | `L(3,y)` | `L(5,y)` | `L(7,y)` | `L(11,y)` |
|---|---|---|---|---|---|
| 23 | 204 | 33 | **19** | 13 | 10 |
| 31 | 348 | 57 | 34 | 24 | 20 |
| 43 | 618 | 102 | 61 | 43 | 35 |
| 47 | 708 | 117 | 70 | **50** | 41 |
| 61 | 1080 | 179 | 107 | 75..77 | 59..66 |
| 79 | 1710 | 284 | 170 | 120..122 | 97..102 |

**The one new exact value.** The block the programme wants at `v = 7` is
`(7, 49]`, top prime 47. Two decisions settle it: `l = 50` is feasible, a cover
exhibited in 29,381,838 nodes; `l = 51` is infeasible with the search **completed
at every distinct phase** in 107,391,034 nodes. So **`L(7,47) = 50`**, against
the corpus's standing `≥ 49`. **[VERIFIED]**

**Where exact stops, and why.** Two frontiers, and they are not the same one.

- This script's uniform ladder, at a 4·10⁶-node budget per decision: `T_3` to
  `y = 29`, `T_5` to `y = 37`, `T_7` to `y = 43`, `T_11` to `y = 47`.
- The bracket, which stops dead at `y = 79` because A144311 stops at 22 terms.

**Past `y = 79` nothing is exact, for anyone**, and §0's identity is the reason:
`L(v,y)` exact *is* `G₂(y#)` exact, so the two problems have one frontier. The
diagonal blocks reachable at all are therefore `v = 3, 5, 7` and no more; `v = 11`
needs `G₂` at `x = 113`, eight terms past the frontier. **[INFERRED]**

**Measured cost of going further:** `ln(nodes) = −2.513 + 1.8894·k` over the 19
exact levels above 1000 nodes, log-RMS 0.525 — every prime added to a block
multiplies the exhaustive search by **6.62**. **[MEASURED]**

---

## 3. Feasibility and the counting criterion, kept apart

The brief's item 4, and the error `attack-block-00-ADJUDICATION.md` made.

**Feasibility is monotone**, and closure was tested rather than assumed: in every
one of the nine full-period instances the achievable run lengths were decided at
each `l` by that `l`'s own independent window scan, and the achievable set was a
contiguous `1..L` in all nine, **zero non-contiguous cases**. **[VERIFIED]**

**The criterion is a staircase and is not monotone.** At block 1 it is first dead
at `l = 63`, revives **five** times, is last alive at `l = 111`, and is dead for
good from 112; `T(l) = S_max(l) − l` is subadditive with `T(1200) = −77` and
`max T = 7`, so there is no revival anywhere above. Beside it, feasibility is
`FEASIBLE` on exactly `1..19` and `INFEASIBLE` at every `l ≥ 20` — including at
`l = 62, 64, 110` and `111`, every one of which the criterion reports as "not
excluded". **[VERIFIED]**

**Slack of the criterion at block 1: bound 62 against truth 19, a factor 3.26.**

**And the criterion's death is the Mertens wall, measured cleanly.** Across nine
blocks the criterion is finite exactly when `Σ_{p ∈ block} 2/p < 1`:

| block | `Σ 2/p` | criterion |
|---|---|---|
| `(11, 23]` | 0.4637 | finite, `L ≤ 14` |
| `(7, 23]` | 0.6455 | finite, `L ≤ 26` |
| `(11, 47]` | 0.7891 | finite, `L ≤ 141` |
| `(5, 23]` | 0.9312 | finite, `L ≤ 62` |
| `(7, 47]` | 0.9709 | finite, `L ≤ 659` |
| `(5, 29]` | 1.0002 | **vacuous at every `l`** |
| `(5, 31]` | 1.0647 | vacuous |
| `(3, 23]` | 1.3312 | vacuous |
| `(3, 47]` | 1.6566 | vacuous |

The mechanism is one line: `S(l,f) = Σ_p (2l/p + fluctuation)`, so
`S − l ≈ l(Σ2/p − 1) + O(k)` and the sign of `Σ2/p − 1` decides whether the
criterion can ever die. **[MEASURED]** on nine blocks, **[INFERRED]** as to
mechanism. One more independent arrival at the wall
`research/sift-limit-attack.md` §7 counted as the sixth.

---

## 4. The abscissa, and a calibrated negative

The brief's item 2, and the answer is a negative with a number on it.

**Raw log-log slopes, `L_int` on 18 exact terms, `y = 11..79`:**

| abscissa `X` | exponent in `L ~ X^b` | se | log-RMS |
|---|---|---|---|
| `y` | 1.8269 | 0.0328 | 0.0785 |
| `θ(y) = ln(y#)` | 1.6933 | 0.0255 | 0.0658 |
| `π(y)` | 2.5091 | 0.0467 | 0.0812 |
| `y ln²y` | 1.1466 | 0.0163 | 0.0623 |
| `θ(y) ln²θ(y)` | **1.0335** | 0.0130 | **0.0551** |

Read naively that says `L` is linear in `θ ln²θ`. **It is not.** The same
estimator, same window, same 18 terms, run on the one-class Jacobsthal control
`h(x#)` (A048670, terms as carried in `research/exponent-control.js` line 44),
whose true exponent is 1 in every one of these frames because
`h ~ x ln^{2+o(1)} x` **[PROVEN ≤ 2, Iwaniec 1978; conjectured, Maier–Pomerance]**:

| abscissa | control reads | bias vs 1 | `G₂` reads | `G₂` bias-corrected |
|---|---|---|---|---|
| `y` | 1.2725 | +0.2725 | 1.8269 | **1.5544** |
| `θ(y)` | 1.1822 | +0.1822 | 1.6933 | **1.5110** |
| `π(y)` | 1.7547 | +0.7547 | 2.5091 | 1.7544 |
| `y ln²y` | 0.7968 | −0.2032 | 1.1466 | 1.3498 |
| `θ ln²θ` | 0.7196 | −0.2804 | 1.0335 | 1.3139 |

**Corrected readings run 1.314 to 1.754, a spread of 0.441.** So:

- **The data does not prefer an abscissa.** The spread between frames is five
  times the ±0.09 the corpus quotes on the exponent. **[MEASURED]**
- **`L` is linear in none of the bare abscissae**: 1.83 in `y`, 1.69 in `θ`,
  2.51 in `π`, at standard errors near 0.03. The apparent linearity in `θ ln²θ`
  is an artifact, because the identical estimator reads 0.72 there on a control
  whose truth is 1.
- **The `y` and `θ` frames agree to 0.04** and both land on the corpus's 1.54
  (`research/exponent-control.md` §5;
  `research/history/staging/attack-growth-law.md` §4). **`π` is the outlier and
  should not be used as an abscissa for this object.**
- The script reproduces attack E's matched-window control reading **1.272**
  independently, as a self-test.

**The polynomial-versus-exponential point the brief warns about survives all
this.** The block's modulus is `e^θ`, so a law polynomial in `θ` is polylog in
the modulus and a law indexed by the modulus itself would be exponential. Here
`θ(y)` and `y` are the same abscissa to within 0.04 in the corrected exponent,
so the corpus's `x`-frame convention is safe for this object. **[INFERRED]**

---

## 5. The distance to 529

**Reading (a): the requirement.** 529 = 23² is the p²-rule window at the top
prime of block 1, and the requirement is `maxsum_{L+1}(T_5) ≤ 529`.

- `maxsum₅₂(T_5) = 522 ≤ 529 < 534 = maxsum₅₃(T_5)`, so the requirement is
  **`L ≤ 51`**. On the strict form `G₂ < q² − q = 506` it is `L ≤ 49`.
- The counting criterion's best possible reading is `L ≤ 62`, and **62 is its
  ceiling, not one of its readings**: `research/block-L-first-dead.js` §4 proves
  `W(l) = S_max(l)` by CRT, so no positional refinement of the same count does
  better.
- **Deficit 11 slots, factor 1.216. The counting route to 529 at block 1 is
  CLOSED, not unfinished.** **[PROVEN]**, given the CRT ceiling.

**Reading (b): the object.** `L = 19`, `maxsum₂₀(T_5) = 204`, which clears 529
**with a factor 2.59 to spare**. The whole distance at block 1 is instrument
slack: 3.26× between criterion and truth where the requirement asks for 1.216×.

**And the margin grows up every diagonal block that can be reached:**

| `v` | top prime `q` | `L(v,q)` | `maxsum_{L+1}(T_v)` | `q²` | margin |
|---|---|---|---|---|---|
| 3 | 7 | 4 | 30 | 49 | 1.63× |
| 5 | 23 | 19 | 204 | 529 | 2.59× |
| 7 | 47 | **50** | 738 | 2209 | **2.99×** |

That growth is the whole content of "exponent below 2" in this coordinate. It is
**[MEASURED]** and not proved: the proven exponent is 4.2665
(`research/dhr-verification.md`), which would make this column shrink to nothing
immediately.

**Reading (c): where does `L` itself reach 529?** Under the raw law
`G₂ ≈ 0.8711·x^1.7360` (top 14 exact terms, se 0.0477) and under the corrected
1.54 alike, `L(v, v²)` first reaches 529 at the prime **`v = 17`**. That block
holds 54 primes and tops at 289; knowing it means knowing `G₂` at 61 primes
against a frontier of 22, and at the measured node cost of ×6.62 per prime the
exhaustive search there is `10^43.2` nodes. **[MEASURED then EXTRAPOLATED, and
an extrapolated search cost is the softest number in this file.]**

**So the answer to item 3 is an impossibility, not a route**, and §0's identity
is why: the block coordinate has nothing of its own to give, so no reformulation
inside it can move the frontier.

---

## 6. Monotonicity, declared

The brief's item 5. This file assumes monotonicity in exactly one place:
`L = (first infeasible l) − 1`, licensed by downward closure — a run of `l+1`
deleted slots contains a run of `l` at the same phase, and its cover restricts.
§3 re-tests that closure on nine instances instead of citing it.

**Nothing here bisects**, on the greedy or on anything else. The criterion is
reported as the non-monotone staircase it is, beside the monotone feasibility, at
nine values of `l`. **No claim is made anywhere that a margin, a ratio or a
certificate is monotone in `L`;** this file consumes no certificate, so the
non-monotonicity of certificate validity in `L` that the wave brief records is
not a failure mode this instrument can reach.

---

## 7. Corrections to the record

1. **`research/history/staging/attack-block-03-alternation.md` §6**, the block
   table, row `v = 7`: **"truth ≥ 49" should read "truth 50"**, exact.
   `research/attack-L-law.js` §3b, two completed searches.
2. **Same file, same section**: *"Had it read L ≤ 52 it would have proved 'there
   is a twin prime in (23, 529]'"* is off by one. `maxsum₅₃(T_5) = 534 > 529`, so
   the threshold is **`L ≤ 51`**, and on the strict p²-rule form
   `G₂ < 23² − 23 = 506` it is `L ≤ 49`. The paragraph's conclusion, that block 1
   sits within 20 percent of a p²-rule conclusion, survives: the factor is 1.216.
3. **`research/exponent-control.md` §5**, the reading table: the row *"raw fit,
   G₂, 10 terms, x-frame | 1.801 ± 0.074"* rests on a ladder that has since grown
   to 22 proven-maximal terms. The same estimator on 18 terms reads **1.8269**
   here and 1.818 in `research/history/staging/attack-growth-law.md` §2. Suggest
   replacing the row and keeping the corrected 1.54, which this file reproduces
   at 1.5544 in the `x` frame and 1.5110 in the `θ` frame.
4. **`research/qc/units.js` item 2** ends at *"Correct bound: L ≤ 62"*, which is
   the criterion's bound and not the object. Suggest one line beside it: **the
   truth at block 1 is 19 and at block 2 is 50**, so the 62 is never read as the
   object.

---

## Sources

- Object, coordinates and the `{0,−2}` covering form: `research/qc/units.js`
  items 2, 4, 5; `research/two-class-lower-bounds.md` §1.
- A144311's 22 terms and their proven maximality:
  `research/sift-limit-attack.md` §7; `research/attack-beta2-05-covering-prune.js`;
  `research/history/staging/attack-beta2-05-covering-pruning-bound.md`.
- The criterion, its CRT ceiling and the first-dead reading:
  `research/block-L-first-dead.js` §§3–5; `research/sift-limit-attack.md` §7a;
  `research/history/staging/attack-block-03-alternation.md` §§2, 6;
  `research/history/staging/attack-block-00-ADJUDICATION.md`.
- Growth law, control calibration and the exponent band:
  `research/exponent-control.md` §§1, 5; `research/exponent-control.js` line 44;
  `research/history/staging/attack-growth-law.md` §§1–4; `research/G2-STATE.md`.
- The p² rule and the requirement at each block:
  `research/history/staging/attack-block-10-target.md` §1; `research/covering-dive.md`.
- The proven exponent 4.2665: `research/dhr-verification.md`; `paper/beta2-note.md`.

*History for this document: `research/history/CHANGELOG.md`.*
