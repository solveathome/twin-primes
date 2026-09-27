# The L = 1 residue count: stated exactly, and it is not a hypothesis

<!-- ledger
id: Q-l1-residue
status: CLOSED
todo: none
question: Is the L = 1 residue count an open counting hypothesis whose proof would deliver the Zone Postulate?
verdict: REFUTED as a hypothesis: restore the dropped L >= 2 terms and it IS the Zone Postulate, so the chain is a tautology, and leave them out and what remains is provably no stronger than the target; Lemma A (inside B(p) the residue condition is the kill condition) is PROVEN and VERIFIED at 237 folds, and the route lands back on the residue-deleted maxsum without advancing it.
-->

*Staging note, 2026-08-19. Proposal only; nothing here is integrated into a live
document. Target: the one counting statement `research/U-FRAME.md` §7 item 1
names as "what remains there is one counting hypothesis at L = 1, stated on
residues", reached from two sides by `verify-tailcount-transport.md` §(e) and
`attack-foldL-04-amortized.md` §8, with the supply collapse under it measured in
`attack-foldL-06-scaling.md`. Producer:
`research/attack-l1-residue-01-middleband.js`, output formally embedded
(`node research/qc/embed.js research/attack-l1-residue-01-middleband.js --streams both --timeout 2400`).
Calibration is marked on every claim: PROVEN, VERIFIED by exact computation,
MEASURED, REFUTED.*

## 0. The answer

**The L = 1 residue count is not an open hypothesis whose proof would deliver the
Zone Postulate. It is a consequence of the Zone Postulate.** Put the terms the
record drops back in and it becomes the Zone Postulate exactly, so the chain is a
tautology; leave them out and what remains is provably no stronger than the
target, so it cannot imply it, and in every window measured it is the target
again. Both readings rest on one-line lemmas and both are measured exactly in
four windows.

The three findings, in order of how much they cost the branch.

1. **The residue condition is not a relaxation of anything.** Inside the level-p
   word, `slot ≡ 0 or −2 (mod p)` and `slot is killed at fold p` are the same
   condition, with no slack (§2, PROVEN, and VERIFIED at 237 folds). So
   `R_L^{(p)}(θ)` is not a residue over-count of a merge count. It *is* the merge
   count. Everything the transport was built to avoid needing about the gap word
   is already inside it.
2. **The direction of the implication runs the wrong way.** `T*`, the exact
   threshold at which the L = 1 sum falls to zero, satisfies `T* ≤ G₂` always
   (§3, PROVEN), and equals `G₂` at four windows out of four (§6.2). So the Zone
   Postulate implies the hypothesis, and measurement says the two are the same
   statement. In the tile frame the same lemma is `maxsum₂(old) ≤ G₂(new)`,
   which the corpus carries as VERIFIED at 329 cells and which is proven here in
   one line.
3. **The live middle band is empty at every computable scale, by three orders of
   magnitude, and would only become non-empty at the point where the conclusion
   itself fails.** `T*/θ_zone` runs 6.386e−4 to 9.724e−4 across the four windows
   (§4). There is no regime in which the hypothesis is both non-trivial and
   weaker than its own conclusion.

The honest size of regime (iii), which was the brief's question for stage 1, is
therefore **zero**: the statement is a threshold with no interior.

## 1. Stage 1 — the theorem candidate, with every quantifier and unit

### 1.1 The statement, as the record intends it

Fix an anchor `A ≡ 0 (mod 6)` and a length `Y`. The slot set is
`S = {n ∈ [A, A+Y) : n ≡ 5 (mod 6)}`, and for a prime `p ≥ 5`

> `B(p) = { n ∈ S : q ∤ n(n+2) for every prime 5 ≤ q < p }`

is the word **before** fold p, written in increasing order with gaps
`g_i^{(p)}`. All lengths are absolute integers; every gap is a positive multiple
of 6. The window is not cyclic, so the first and last slot of each `B(p)` have
one neighbour only and are excluded: the wrap convention is *no wrap*, and the
boundary term is 2 slots per level, `2·π(x)` in total, against populations of
`10⁷` and up. `attack-foldL-02-bridge.md`'s straddle question does not arise for
the same reason it does not arise in angle 6: a window has no copies.

`θ` is the zone budget **at the terminal fold level x**, not at the window's
height: by the Gap Reformulation (`G2-STATE.md` §1b) the zone of level x is
`(x, x′²)` and the budget is `θ = x′² − 2`. For the fold set used throughout the
branch, `x = 1499` and `x′ = 1511`, so

> **θ_zone = 1511² − 2 = 2 283 119.**

> **Theorem candidate (L1-RES).** For every anchor A, every length Y and every
> terminal level x,
>
> `Σ_{p ≤ x} #{ i : g_i^{(p)} + g_{i+1}^{(p)} ≥ θ and the slot between them ≡ 0 or −2 (mod p) } < 1`.

The summand is `R_1^{(p)}(θ)` of `verify-tailcount-transport.md` §(e). Since it
is a sum of non-negative integers, `< 1` is `= 0`, and the statement is that no
adjacent pair anywhere in the fold history is merged into something as long as
the zone.

### 1.2 The per-slot form used throughout

For `s ∈ B(p)` with both neighbours present write

> `span_p(s) = succ_{B(p)}(s) − pred_{B(p)}(s)`,

which is `g_i + g_{i+1}` with `s` the slot between. Then exactly

- `R_1^{(p)}(θ) = #{ s ∈ B(p) : key(s) = p, span_p(s) ≥ θ }`
- `N_2^{(p)}(θ) = #{ s ∈ B(p) : span_p(s) ≥ θ }`, the same count with the residue
  condition dropped,

with `key(n) = min{ q prime ≥ 5 : q | n(n+2) }` and key 0 for the survivors of
every fold in range. `N_2^{(p)}(θ)` is the object a "free 2/p" claim has to
divide into, and `max_s span_p(s)` is `maxsum₂(B(p))`, the L = 1 transport bound
of `verify-tailcount-transport.md` §(e).

## 2. Lemma A: the residue condition is the kill condition (PROVEN, VERIFIED)

> **Lemma A.** For `s ∈ B(p)`: `p | s(s+2)` if and only if `key(s) = p`.

*Proof.* `s ∈ B(p)` means `key(s) = 0` or `key(s) ≥ p`. If `p | s(s+2)` then
`key(s) ≤ p` unless `key(s) = 0`; and `key(s) = 0` says no prime in range divides
`s(s+2)`, which p does. So `key(s) = p`. The converse is the definition of key.
QED

**VERIFIED** by brute force at all 237 folds in `[0, 6·10⁶)`: the residue count
and the key count agree exactly at every fold, over 959 041 killed slots.

This is the first thing that has to be said about the hypothesis, and the record
says the opposite of it. `verify-tailcount-transport.md` §(e) closes with "note
it is stated on **residues**, not on the gap word. That is precisely the
information the tail-count transport is built to avoid needing." In the tile
frame that reading is right, because there the sum runs over all p alignments and
the residue is free. In the window frame the alignment is fixed by the actual
arithmetic, and Lemma A says the residue condition has already collapsed onto the
kill condition. **The window frame does not buy a residue statement in place of a
gap-word statement. It buys the gap-word statement written in residue
notation.**

## 3. Lemma B and Lemma C: the implication runs the wrong way

> **Lemma B (window frame, PROVEN).** Let `T* = max_{p, s} span_p(s)` over
> `s` with `key(s) = p`, so that `Σ_p R_1^{(p)}(θ) = 0` exactly when `θ > T*`.
> Then `T* ≤ G₂`, where `G₂` is the record gap of the fully folded word.

*Proof.* Fix p and `s` with `key(s) = p`, and let `a < s < b` be its neighbours in
`B(p)`. The open interval `(a, b)` contains exactly one member of `B(p)`, namely
`s`, and `s` is deleted at fold p. Every later fold only deletes, so `(a, b)`
contains no member of the final word. The final word's gap covering `(a, b)` is
therefore at least `b − a = span_p(s)`. Hence `G₂ ≥ span_p(s)` for every such
pair, so `G₂ ≥ T*`. QED

> **Corollary (the refutation).** `G₂ < θ` implies `Σ_p R_1^{(p)}(θ) = 0`.
> The Zone Postulate for the window implies the L = 1 residue count. The
> hypothesis is a consequence of the conclusion, so no proof of it can deliver
> the conclusion.

> **Lemma C (tile frame, PROVEN).** Folding `T_x` by `p`, `maxsum₂(T_x) ≤ G₂(T_{x'})`,
> and the loose L = 1 term summed over the p copies is exactly
> `2 · #{i : g_i + g_{i+1} ≥ θ}`.

*Proof.* Each old slot lies at absolute position `s + kW` in copy k, and since
`gcd(W, p) = 1` the residues `s + kW mod p` run over all of `Z/p` exactly once as
k runs over the copies. So exactly two copies delete a given old slot, which is
the second claim and is the coefficient 2 of the Tail-Count Transport. In either
of those two copies the two gaps either side of that slot merge into one new gap
of length at least their sum, so `G₂(new) ≥ maxsum₂(old)`. QED

Lemma C is the same statement as U-FRAME §5a's lower bound `maxsum₂ ≤ G₂(new)`,
which `research/U-FRAME.md` §9 carries as **VERIFIED at 329 cells, not proven**.
It is proven above in one line, and that is a small free upgrade available to the
live layer independently of anything else here.

The two lemmas say the same thing in the two frames, and the tile ladder shows
it with room to spare: `maxsum₂` reads 42, 66, 96, 150, 186, 234, 330 at
T₇ to T₂₉ (`research/a3-04-maxsum-recursion.js`, embedded, plus
`research/gate-multiplies-03.js` for T₂₉) against `G₂` of the next tile
42, 66, 108, 150, 204, 258, 348. Every entry of the first row is at most the
entry below it, with equality at three folds and a shortfall of up to 24 units at
the others.

## 4. What the full sum is, with the L ≥ 2 terms restored

> **Lemma D (PROVEN).** With the base word's gaps all equal to 6 and `θ > 6`,
>
> `Σ_{p ≤ x} Σ_{L ≥ 1} R_L^{(p)}(θ) = 0` **if and only if** `G₂ < θ`.

*Proof.* (⇒) is the record's own direction, the Localized Transport Chain of
`verify-tailcount-transport.md` §(e). (⇐) Suppose `G₂ < θ` and some
`R_L^{(p)}(θ) > 0`. Then there is an i with slots `i+1 … i+L` all killed at p and
`G_{L+1}(i) ≥ θ`. By Lemma A those slots are exactly the members of `B(p)` inside
the open interval spanned, so after fold p that interval contains no surviving
slot, and by monotonicity neither does it at the end. The final word therefore
carries a gap of at least `G_{L+1}(i) ≥ θ`, contradicting `G₂ < θ`. QED

So the chain's hypothesis, taken whole, is **equivalent** to its conclusion, not
sufficient for it. The equivalence is not an artifact of the loose bound: it
survives because Lemma A removes the only slack the residue form had.

**The head the record drops is large in folds and empty in mass, and that is
what closes the last gap in the argument.** The reduction in
`verify-tailcount-transport.md` §(e) removes every `L ≥ 2` term "beyond the fold
where no gap reaches 2p − 2". Below that fold they are present: the last fold
carrying a kill run of length ≥ 2 is 181, 331, 421, 457 at the four windows
(`attack-foldL-06-scaling.md` §4), so the head runs over dozens of folds. But at
the θ that decides the statement it contributes **nothing**: measured at
θ = `G₂`, the folds at or below the run-extinction fold contribute 0 at every
window, and the whole sum comes from folds 1409, 911, 1151 and 1151, all above
it. So Lemma D's equivalence and Lemma B's inequality coincide in every window
measured, and the L = 1 statement on its own is not merely implied by the Zone
Postulate, it flips at exactly the same threshold.

## 5. Stage 1's three regimes, resolved

**(i) The regime where the sum is empty for size reasons.** For `L ≥ 2` this is
real and is the record's collapse: an interior gap of a kill run must satisfy
`g ≡ 0 or ±2 (mod p)`, whose least legal multiple of 6 is `2p − 2η` by
`a3-05-bound-L.md` Lemma 2, so the term is empty once the level word carries no
gap in those classes. **For the L = 1 term there is no such regime at all.** The
L = 1 term has no interior condition, so no p-dependent size threshold enters;
its only size condition is `span ≥ θ`, and its only p-dependence is the residue
condition, which Lemma A shows is satisfied by `kills(p) ≈ (2/p)|B(p)|` slots at
every fold without exception. The regime boundary the brief asked for exists only
in the θ coordinate, and it is `θ > T*`.

**(ii) Supply zero while the threshold sits below the max gap.** This is
**impossible**, and it is worth stating as such rather than measuring: "supply
zero" means no gap of `B(p)` is at least `θ_p`, and "threshold below the max gap"
means `θ_p ≤ G₂(B(p))`; the record gap is itself a gap, so the second implies the
first is false. The two conditions are complements, not a possible middle. What
*is* possible, and is what the record's two numbers actually are, is supply zero
in the **congruence** sense while the size threshold is still below the record
gap: at p = 701 in the 2·10⁹ window no gap is `≡ 0 or ±2 (mod 701)` although the
record gap 1446 exceeds `θ_701 = 1404`. That is why
`verify-tailcount-transport.md` §(e) reads 701 and `attack-foldL-06-scaling.md`
§4 reads 1021 for "last fold with θ ≤ G₂". The two numbers are answers to two
different questions and neither is wrong.

**(iii) The live middle band.** Empty at every computable scale. §6 gives the
numbers.

## 6. Stage 2 — the middle band measured

Four windows `[0, Y)` with `Y = 2·10⁷, 2·10⁸, 2·10⁹, 2·10¹⁰`, all 237 folds from
5 to 1499, 3 333 333 333 slots at the largest, 639.7 s in total. Six figures of
the angle-4 and angle-6 embedded tails are asserted digit for digit and all six
reproduce, from a pass that shares no data structure with either (the decreasing-
key stack measures kill runs; this keeps the last two members of every level).

### 6.1 Pre-registration, and how it scored

Stated in the script banner before any window was run, and parameter-free: no
model is fitted anywhere in this note, so no window is a calibration window.

| | prediction | outcome |
|---|---|---|
| P1 | residue count = key count at every fold | **HELD**, 237 of 237 folds, 959 041 killed slots |
| P2 | `R_1/N_2 = 2/p` at θ = 0 | **HELD as an approximation**, pooled ratio 0.9968 to 1.0622 of 2/p |
| P3 | the same ratio survives into the tail | **PARTIAL**: it survives to within 7%, and sits outside two Poisson sd at most cells |
| P4 | `G₂ ≤ T* ≤ 2·G₂` | **HELD at the floor**: `T* = G₂` exactly, four of four |
| P5 | `T*/θ_zone < 1/300` | **HELD**, measured 6.386e−4 to 9.724e−4 |
| P6 | the sum is linear in Y at fixed θ | **PARTIAL**: 10.230, 10.550, 10.975, 11.369 at the largest step, 3.667 to 8.473 at the smallest |

### 6.2 The threshold, and the equivalence

| Y | T* | maxsum₂ over all levels | G₂ (fully folded) | T*/G₂ | θ_zone/T* | Σ R₁ at θ_zone |
|---|---|---|---|---|---|---|
| 2·10⁷ | **1458** | 1938 | 1458 | 1.0000 | 1565.9 | 0 |
| 2·10⁸ | **1560** | 1968 | 1560 | 1.0000 | 1463.5 | 0 |
| 2·10⁹ | **2220** | 2262 | 2220 | 1.0000 | 1028.4 | 0 |
| 2·10¹⁰ | **2220** | 2400 | 2220 | 1.0000 | 1028.4 | 0 |

`T*` is by construction the least θ above which the hypothesis's sum is zero;
`G₂` is the least θ above which the Zone Postulate holds for the window. **They
are the same integer at four windows out of four.** Lemma B proves one direction
of that; the measurement supplies the other. So the statement's boundary is the
conclusion's boundary, and the θ the branch actually needs sits a factor of a
thousand above both.

The transport's L = 1 bound `maxsum₂` is the third column, and it is the only
one of the three that is strictly larger than `G₂`: 1.33, 1.26, 1.02 and 1.08
times it. That is the whole of the slack the transport has, and it is slack in
the wrong direction, since the bound is an upper bound on a quantity whose truth
already equals the target.

### 6.3 The θ-curve, term by term

`Σ_p R_1^{(p)}(θ)`, the hypothesis's sum, and `Σ_p N_2^{(p)}(θ)`, the same sum
with the residue condition dropped:

| θ | Σ R₁, 2·10⁷ | 2·10⁸ | 2·10⁹ | 2·10¹⁰ | | Σ N₂, 2·10⁹ |
|---|---|---|---|---|---|---|
| 0 | 3.1921e6 | 3.1804e7 | 3.1767e8 | 3.1783e9 | | 6.3100e9 |
| 300 | 2.7525e4 | 2.3323e5 | 2.2054e6 | 2.2561e7 | | 7.7197e8 |
| 600 | 1.9620e3 | 1.3487e4 | 1.1790e5 | 1.2438e6 | | 5.8020e7 |
| 900 | 1.3600e2 | 7.7200e2 | 6.2380e3 | 6.8460e4 | | 3.5700e6 |
| 1200 | 1.5000e1 | 5.5000e1 | 3.5500e2 | 4.0360e3 | | 2.2605e5 |
| 1500 | 0 | 4 | 31 | 211 | | 1.3694e4 |
| 1800 | 0 | 0 | 3 | 10 | | 1.2440e3 |
| 2100 | 0 | 0 | 1 | 1 | | 1.2000e2 |
| 2400 | 0 | 0 | 0 | 0 | | 0 |

The curve falls by six orders of magnitude over a factor of four in θ and then
stops, at `T*`. There is no plateau, no shoulder and no band in which the sum is
small but positive over a range of θ worth summing: the last three decades of the
curve are carried by single-figure counts. **That is what "the middle band is
empty" means quantitatively.** At the θ the branch needs, 2 283 119, every column
is 0 and has been 0 since θ = 2400.

### 6.4 Where the sum lives, fold by fold

The 2·10⁹ window, at four working thresholds:

| p | \|B(p)\| | kills | m̄ | maxsum₂(B(p)) | R₁(300) | R₁(600) | R₁(900) | R₁(1200) |
|---|---|---|---|---|---|---|---|---|
| 29 | 7.1290e7 | 4.92e6 | 28.05 | 234 | 0 | 0 | 0 | 0 |
| 31 | 6.6374e7 | 4.28e6 | 30.13 | 330 | 1 | 0 | 0 | 0 |
| 61 | 4.7416e7 | 1.55e6 | 42.18 | 576 | 1.034e3 | 0 | 0 | 0 |
| 101 | 3.8298e7 | 7.58e5 | 52.22 | 744 | 5.351e3 | 0 | 0 | 0 |
| 211 | 2.8511e7 | 2.72e5 | 70.15 | 1080 | 1.342e4 | 79 | 0 | 0 |
| 421 | 2.2539e7 | 1.06e5 | 88.73 | 1470 | 1.369e4 | 3.730e2 | 7 | 0 |
| 701 | 1.9262e7 | 5.23e4 | 103.83 | 1848 | 1.077e4 | 6.430e2 | 23 | 0 |
| 1021 | 1.7394e7 | 3.21e4 | 114.99 | 2220 | 8.346e3 | 7.680e2 | 37 | 1 |
| 1499 | 1.5684e7 | 2.09e4 | 127.52 | 2262 | 6.761e3 | 8.320e2 | 74 | 3 |

Two shapes worth naming. The count at a fixed θ **rises and then falls** with p,
peaking near p = 421 at θ = 300: early folds cannot reach θ at all, late folds
have too few kills left. And the highest θ at which any fold contributes moves up
monotonically with p, because `maxsum₂(B(p))` does. Neither shape gives a fold at
which the term is provably empty for a p-dependent reason, which is regime (i)
failing to exist, measured.

### 6.5 The residue condition's actual worth

`R_1^{(p)}(θ) / N_2^{(p)}(θ)` against `2/p`, the 2·10⁹ window at θ = 3m̄:

| p | 17 | 31 | 61 | 101 | 211 | 421 | 701 | 1021 | 1103 | 1499 |
|---|---|---|---|---|---|---|---|---|---|---|
| ratio ÷ (2/p) | 1.0000 | 1.0001 | 1.0008 | 1.0029 | 1.0076 | 0.9861 | 0.9592 | 0.9448 | 0.9347 | 0.9980 |
| inside ±2 sd | yes | yes | yes | yes | yes | yes | **no** | **no** | **no** | yes |

Pooled over `p ≥ 100`, the ratio divided by 2/p reads 1.0622, 1.0024, 0.9883 and
0.9968 at the four windows at θ = 0, and 1.0602, 1.0092, 0.9866 and 0.9953 at
θ = 6m̄. **So the residue condition is worth about 2/p, to within a few per cent,
and the deviation is real rather than sampling at the deep folds.** It errs in the
safe direction there, up to 6.5% below 2/p at p = 1103, which says a long span
and a kill at a deep fold are mildly anti-correlated. Useful to know, and far too
small to change anything.

### 6.6 The first-moment reading, priced

`Σ_p (2/p)·N_2^{(p)}(θ)` is the sum's value under exact equidistribution. The θ
at which each object falls below 1:

| Y | G₂ | θ at which Σ R₁ < 1 | θ at which the first moment < 1 | θ at which Σ N₂ < 1 | ratio to G₂ |
|---|---|---|---|---|---|
| 2·10⁷ | 1458 | 1464 | 1494 | 1944 | 1.025 |
| 2·10⁸ | 1560 | 1566 | 1656 | 1974 | 1.062 |
| 2·10⁹ | 2220 | 2226 | 1908 | 2268 | 0.859 |
| 2·10¹⁰ | 2220 | 2226 | 2058 | 2406 | 0.927 |

The first-moment threshold tracks the record gap to within 15%, which is close,
and it lands **below** it at the two largest windows, which is fatal for its use
as a certificate. Read directly: at Y = 2·10⁹ and θ = 2100 the first moment is
1.890e−1 while the true count is 1; at 2·10¹⁰ and the same θ it is 6.036e−1
against 1.
A first-moment argument at an extreme statistic is a prediction, not a bound, and
here it is measurably optimistic exactly where the statement lives.

### 6.7 The provable sieve range against where the mass sits

| Y | ln Y | `p_prov = Y^{1/β₂}` | fold at the 50% point of the mass | at the 90% point | last fold with mass |
|---|---|---|---|---|---|
| 2·10⁷ | 16.81 | 51 | 29 | 353 | 1499 |
| 2·10⁸ | 19.11 | 88 | 41 | 389 | 1499 |
| 2·10⁹ | 21.42 | 151 | 29 | 277 | 1499 |
| 2·10¹⁰ | 23.72 | 260 | 29 | 281 | 1499 |

The median fold is inside provable range at every window. The 90% point is not,
by a factor of 1.1 to 7, and the tail that decides the statement runs to 1499 at
every window.

## 7. Stage 3 — the proof surface, priced

Four candidate routes to bounding the middle-band sum, each with the regime it
covers.

### (a) "The residue condition gives a free factor 2/p per fold"

**PROVEN over a full period; FAILS in a window, in exactly the regime the sum
lives in.** Over one period of the level word, modulus `6·∏_{5 ≤ q < p} q`, the
level slots split over the residues mod p evenly by CRT, so the count in the two
classes is exactly `(2/p)` of the total. That is Lemma C, and it is free. It is
also the tile statement, and the tile is where the chain was already known to
die.

In a window the period is `e^{θ(p)} ≈ e^p`, larger than any Y by an
astronomical factor, so no periodicity argument survives. What is left is a
count of `{ n ∈ [A, A+Y) : n ≡ 5 (mod 6), n(n+2) free of primes in [5, p),
p | n(n+2) }`, a two-dimensional sieve with sifting variable `u = ln Y / ln p`.
Lower bounds of the right order need u above the DHR sifting limit
`β₂ = 4.26645` (`research/dhr-verification.md`, and `a3-05-bound-L.md` §8 for the
same wall in the run-length coordinate), so only folds `p ≤ Y^{1/β₂}` are inside
provable range. Those cut-offs against the folds that actually carry the sum are
in §6, and they do not overlap where it matters. An upper-bound sieve is
available at every u and gives `R_1^{(p)}(0) ≤ C·(2/p)|B(p)|` with a DHR constant
`C > 1`; against a hypothesis that needs a sum of 237 terms to come in under 1,
a constant-factor upper bound on each term is **PROVEN and vacuous**.

And the factor is not exactly 2/p even numerically: §6 measures the pooled ratio
against 2/p, and the deviation is small but sits outside the Poisson band at the
larger windows, in both directions. Free is the wrong word for it.

### (b) "Bound the pair-sum condition with the Tail-Count Transport itself"

**FAILS, and it fails as an identity rather than a near miss.** The transport
controls `N^{(p)}(θ)` level by level; the hypothesis's summand is, by Lemma A,
the count of merges producing something of length θ, and by Lemma D the whole sum
vanishes exactly when `N^{(x)}(θ)` does. So the chain's input and its output are
the same object. Walking the circle precisely: to bound `R_1^{(p)}(θ)` one needs
to know that no adjacent pair of the level-p word sums to θ; that is
`maxsum₂(B(p)) < θ`; by Lemma C the transport's own conclusion `G₂ < θ` implies
it and is implied by it up to the L ≥ 2 head. There is no level ordering that
breaks the circle, because gaps only grow and the quantity is monotone in the
level.

`a3-05-bound-L.md` §8 saw this coming and guarded against it: H″ is stated for
`m ≥ 2` and "the base case m = 1 is left unconstrained, which is what keeps H″
from implying its own conclusion". **The L = 1 residue count is that base case,
reinstated.** The localized reduction removed the corpus's own guard.

### (c) Brun–Titchmarsh, the large sieve, and the BV/EH axis

**FAILS, for the reason `research/bv-import-survey.md` §3.3 already gives about
this family of statements.** No primes occur in the statement: `B(p)` is a set of
integers cut out by a sieve, and the residue condition is a congruence on
integers, whose remainder in an interval is O(1) unconditionally. So there is no
equidistribution of primes to import, and BV, EH and GRH are inert. The
obstruction is the sieve dimension, which is the §7(a) wall, and the large sieve
does not reach it either: a large-sieve inequality wants a fixed set sampled
against many moduli, while here the set `B(p)` is itself a function of the
modulus and is cut out by the same polynomial `n(n+2)` whose roots are the two
classes being counted. The structure the method needs is absent, not merely
unavailable.

### (d) The trivial union bound

**PROVEN and hopeless, with the gap measured.** Dropping the size condition
gives `Σ_p R_1^{(p)}(θ) ≤ Σ_p kills(p)`, which is every slot the fold range
deletes. §6 prints both ends of that gap at θ = 0 against the truth at
θ = θ_zone.

### (e) The only non-circular reading, and its price

If `< 1` is read as a first moment rather than a count, the statement becomes
`Σ_p (2/p)·N_2^{(p)}(θ) < 1` under exact equidistribution. That is not circular,
and it is the only version worth pricing. **PRICED, and it does not certify.**
§6.6 puts the two thresholds side by side: the first moment crosses 1 at
`θ/G₂` = 1.025, 1.062, 0.859 and 0.927, so it lands *below* the record gap at the
two largest windows and would license a θ at which the truth is still 1. There is
no probability space here, so the first moment is not an expectation and Markov
does not apply; it is a model value, and measured it is optimistic at the extreme
by a factor of about five at Y = 2·10⁹. The one genuinely encouraging number in
this note is how close it gets, within 15% in θ, which is what makes the route
tempting and does not make it sound.

## 8. Verdict

**REFUTED as a hypothesis, under the brief's second win condition: the statement
is equivalent to a known object, and the object is its own conclusion.**

| claim | verdict |
|---|---|
| the residue condition is information the transport avoids needing about the gap word | **REFUTED.** Lemma A: inside `B(p)` it is the kill condition exactly. PROVEN, VERIFIED at 237 folds |
| `Σ_p Σ_L R_L^{(p)}(θ) < 1` is a sufficient condition for the Zone Postulate | **STANDS, and is also necessary.** Lemma D makes it an equivalence, so the chain is a tautology |
| the L = 1 reduction leaves an open counting hypothesis | **REFUTED.** Lemma B proves `T* ≤ G₂`, so the Zone Postulate implies it; measurement gives `T* = G₂` at four windows out of four, so it *is* it |
| the middle band is where the work is | **REFUTED.** There is no band. The sum is a threshold function of θ with the threshold at `G₂`, and the operative θ sits 1028.4 to 1565.9 times above it |
| regime (ii), supply zero with the threshold under the max gap | **IMPOSSIBLE**, and the record's two numbers (701 and 1021) are answers to two different questions, both correct |
| the residue condition gives a free 2/p | **PROVEN over a period, MEASURED to a few per cent in a window, and not free**: the deviation sits outside two Poisson sd at the deep folds, and the provable sieve range covers only `p ≤ Y^{1/β₂}` |
| the transport can bound its own chain's hypothesis | **FAILS, circularly.** And `a3-05-bound-L.md` §8 already guarded against exactly this by leaving H″'s `m = 1` case unconstrained; the L = 1 reduction reinstates it |
| Brun–Titchmarsh, the large sieve, BV/EH/GRH | **FAIL.** No primes occur in the statement; the obstruction is the sieve dimension, per `bv-import-survey.md` §3.3 |
| `maxsum₂(old) ≤ G₂(new)` | **UPGRADE AVAILABLE.** Held as VERIFIED at 329 cells in `U-FRAME.md` §9; Lemma C proves it in one line |

**What this costs the branch.** `U-FRAME.md` §7 item 1 currently reads that the
live ground moved to the zone frame and "what remains there is one counting
hypothesis at L = 1, stated on residues". That sentence should be replaced. What
remains there is the Zone Postulate, written in residue notation. The relocation
in `verify-tailcount-transport.md` §(e) is real and its inequality is sound; what
it relocated to is not a smaller problem.

**What survives, and it is not nothing.** The Tail-Count Transport is unchanged
as a per-level evaluator, and §(c) of the verification already said so ("an exact
simulator rather than a source of bounds"). Lemma A is a genuine simplification:
in the window frame every `R_L^{(p)}` is a kill-run count and can be computed
without ever mentioning residues, which is why the engine here needed a single
pass. Lemma C is a free upgrade to the live layer. And §6.5's measured
anti-correlation between deep-fold kills and long spans is a new, small,
reproducible fact that nothing in the corpus had looked at.

## 9. What this does not show

The four windows are localized objects. Their gaps live at the `ln²` scale while
the zone budget lives at `x²`, which is the only reason every margin above is a
factor of a thousand rather than a factor of two; on the tile the same ratio is
about 1.8 and that is where the difficulty has always been
(`attack-foldL-04-amortized.md` §10). **The lemmas are frame-independent, the
numbers are not.** Lemma D's equivalence holds in the tile frame too, but through
`verify-tailcount-transport.md` §(c)'s `M_full` identity rather than through
Lemma A, and there the loose `R_L` is a strict over-count, so the tile-frame
statement is equivalence only up to the alternation and endpoint conditions the
transport drops.

`T* = G₂` is measured, not proven. The proven half is `T* ≤ G₂`, and equality
needs the record gap's last merge to be a single-slot kill, which is what the
run-extinction result makes overwhelmingly likely at large p and is not a
theorem. A window whose record gap is completed by a length-2 kill run would have
`T* < G₂` and the L = 1 statement alone would then be strictly weaker than the
conclusion, which is a worse outcome for the branch rather than a better one.

The anchor is 0 at every window, so the sampling spread of `T*` at fixed Y is
unmeasured; `attack-foldL-06-scaling.md` §5's offset check found the analogous
extreme statistic moving by 72 in p at fixed length, and nothing here bounds the
analogous movement in `T*`. The fold range stops at 1499. β₂ = 4.26645 is quoted
from `research/dhr-verification.md` and is used only to locate a provable range,
not inside any bound.

## 10. Reproduction

```
node research/attack-l1-residue-01-middleband.js              # 639.7 s, four windows
SKIPBIG=1 node research/attack-l1-residue-01-middleband.js    # 65 s, drops Y = 2e10
CHUNK=5e7 node research/attack-l1-residue-01-middleband.js    # same answers, half the memory
```

The chunked key sieve and the anchor guard are `attack-foldL-06-scaling.js`'s and
are reused unchanged. The span pass is new: it carries, per level, the last two
members of `B(p)` and the key of the later one, so every slot's span at every
level it survives to is emitted exactly once, at a cost of `π(key)` updates per
slot (measured 18.61 to 18.98 on average). Stage A asserts the residue-is-kill
lemma by brute force before anything else runs, and B1 asserts six figures of the
angle-4 and angle-6 tails.

## 11. NOT REACHED

- **The tile-frame equivalence is argued, not measured here.** Lemma C is proven
  and the `maxsum₂` ladder is cited from `a3-04-maxsum-recursion.js` and
  `gate-multiplies-03.js`, but no tile was built by this script. A direct
  tile-side measurement of `Σ_p R_1` against `G₂(T_x)` was not run.
- **The offset window was not repeated.** `T*`'s sampling spread at fixed Y is
  therefore unknown, and `T* = G₂` at four windows is four draws from an
  unmeasured distribution, not four independent confirmations.
- **No attempt was made to price what a genuinely non-circular replacement would
  look like.** The obvious candidate is a statement about `maxsum₂(B(p))` that
  does not go through `G₂`, which is `U-FRAME.md` §5a's residue-deleted maxsum
  and is TODO 0c; this note says the L = 1 route lands back on it and does not
  advance it.
- **The 6.5% deep-fold deficit in §6.5 is unexplained.** It is reproducible across
  windows and sits outside the Poisson band, and no mechanism is offered.
- **`θ` was taken as the zone budget at the terminal fold level throughout.** A
  reading in which `θ` is the localized budget at the window's own height was not
  developed, and it is not obvious it is the intended one; if it is, every margin
  in §6 changes and the note's lemmas do not.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
