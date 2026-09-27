# Attack fold-L 01 — the channel-compatible run census and the forced-ceiling ladder

<!-- ledger
id: Q-foldL-run-census
status: PARTIAL
todo: none
question: What ceiling on L does the channel-compatible run census force, and is that ceiling forced or a bridge?
verdict: Channel compatibility is exact and cheap but buys little: 3 in 71 at kappa(1) = L, the forced ceiling is a presence-relaxation rather than a multiset-exact bound, exact tiles stop at T_29, and the angle's own verdict sends it to TODO 0c, bounding a residue-deleted maxsum, which this pass did not attempt.
-->

*Staging note. Proposal only; nothing here is integrated into a live document.*

## 0. PRE-REGISTRATION (written before any code was run)

Recorded first so the predictions cannot be tuned to the answer.

**The objects, as I re-derive them (not taken on trust).**

Tile T_x = residues r mod P_x = prod_{p<=x} p with r !≡ 0 and r !≡ −2 (mod p)
for every p ≤ x. Folding by p' > x: copy k sits at offset k·P_x, and with
w = P_x mod p', a = −k·w, the slot at residue r_i dies in copy k iff
r_i ≡ a (channel A, p' | r) or r_i ≡ a−2 (channel B, p' | r+2). As k runs over
0..p'−1, a runs over all of Z_{p'}, so a fold is one two-class deletion per
alignment a.

Two adjacent slots at gap g both die at alignment a iff both land in {a, a−2}:
(A,A) and (B,B) need g ≡ 0, (A,B) needs g ≡ −2, (B,A) needs g ≡ +2 (mod p').
State walk: from A the legal gap classes are {0, −2}; from B they are {0, +2}.
So non-zero classes strictly alternate, and the alignment a is recoverable from
the first slot of a run, which means **every alternation-legal window of the
actual gap word is realised by some copy.**

**PREDICTION P1 (forced vs bridge).** FORCED CEILING ≤ THEOREM B ≤ BRIDGE,
with both inequalities strict at most folds. The brief's bridge
`1 + max{k : maxsum_k ≥ k(2p'−2)}` is condition (i) of A5, the weakest of the
three: it charges only the minimum qualifying gap per step. I predict forced
is STRICTLY smaller than that bridge at nearly every computable cell, by a
factor near 2, because (a) alternation raises the per-gap floor from ~2p' to
3p' (worth exactly 3/2) and (b) the ALPHABET fact — that the cheap class
representative need not occur as a gap value in T_x at all — kills further runs
that the abstract minimum permits.

**PREDICTION P2 (where the alphabet fact bites).** The alphabet fact is worth
something only while G₂(T_x) is small against 6p'. Once G₂(T_x) ≥ 6p' the tile
carries gap values in every residue class and the forced ceiling should collapse
onto Theorem B. Concretely I predict forced < Theorem B at folds 7, 11, 13 and
forced = Theorem B from fold 17 or 19 upward.

**PREDICTION P3 (compression).** Consequently the angle mostly, but not
entirely, compresses onto TODO 0c's maxsum ask: the alphabet fact buys a
constant amount at the shallow end and nothing asymptotically.

**PREDICTION P4 (the decision question).** The average forced ceiling over folds
sits ABOVE the u-frame requirement line 0.19–0.31·p/ln p over the whole
computable range, and the ratio worsens with p. Reason: Theorem B is capped
below by G₂(T_x)/(3p') ≈ 0.18p', and 0.18p' exceeds 0.31p'/ln p' for every
p' ≥ 7 (ln p' ≥ 1.95 already at p' = 7). The alphabet fact cannot rescue this
because it is a shallow-end effect (P2). So the honest expected verdict is NO.

**PREDICTION P5 (fold 7 over T_5).** L = 2 is forced. T_5's alphabet is
{6, 12, 12}; 6 ≡ −1 (mod 7) does not qualify; 12 ≡ −2 (mod 7) qualifies in
class M only. A run of 3 needs two consecutive qualifying gaps, and the only
such pair is (12, 12), which is class M twice — forbidden by alternation. So
the forcing is by ALTERNATION, not by scarcity of qualifying values.

**DEVIATION FLAGGED IN ADVANCE from the session statement.** The brief says
"the minimum qualifying gap is 2p'−2". That is right only for p' ≡ 1 (mod 6).
For p' ≡ 5 (mod 6) the smallest multiple of 6 that is ≡ ±2 (mod p') is 2p'+2.
The correct statement is 2p' ∓ 2, matching `research/kappa-not-L.md`'s closed
form {2p−2, 4p+2, 6p} for p ≡ 1 and {2p+2, 4p−2, 6p} for p ≡ 5. This affects
the bridge column directly: at p' = 11, 17, 23, 29, 41, 47 the brief's constant
is 4 too small, which INFLATES the bridge.

*Everything below is output of `research/attack-foldL-01-census.js`, whose tail is
formally embedded (`node research/qc/embed.js research/attack-foldL-01-census.js
--streams both --timeout 900`, 510 lines, 236.9 s). No figure here was typed by
hand from a terminal.*

## 1. The lemma verdicts

**The compatibility lemma, as the session stated it: CONFIRMED.** Brute force
over 1160 (p', g) cells at p' = 5..67 finds zero mismatches with

> g ≡ 0 (mod p') admits (A,A) and (B,B); g ≡ −2 admits (A,B); g ≡ +2 admits (B,A)

and the state walk that follows from it: from A the legal classes are {0, −2},
from B they are {0, +2}, so non-zero classes strictly alternate.

**One deviation from the session's statement, and it is arithmetic.** The
minimum qualifying gap is **2p' ∓ 2**, not 2p' − 2. For p' ≡ 1 (mod 6) the
cheapest class representative is 2p'−2 in class M; for p' ≡ 5 (mod 6) it is
2p'+2 in class P. The run recomputes min(class P) + min(class M) = 6p' at all
seventeen primes tested, so Theorem A's identity is unaffected, but the constant
in the bridge is not.

**That deviation is a slip in the brief, not in the corpus.** The corrected
bridge `1 + max{k : maxsum_k ≥ k·(2p'∓2)}` reproduces
`research/a3-05-bound-L.md` §5's condition (i) row exactly on the diagonal —
3, 2, 8, 5, 11, 8, 10, 13 — while the literal `k(2p'−2)` gives
3, 4, 8, 6, 11, 13, 11, 13 and matches at only 5 of 8 folds. Using the literal
form would have inflated fold 23 from 8 to 13.

**A second lemma, derived here and not in the corpus: the word is the whole
story.** The longest alternation-legal window of the OLD gap word equals L
exactly, with no slack, because the alignment a is recoverable from the first
slot of the run (a = r_i from state A, a = r_i + 2 from state B) and w = P_x mod
p' is invertible, so every legal window is realised by a real copy. Verified two
ways: L computed from gaps mod p' alone agrees with L computed by enumerating
every old-slot position across the whole new period and testing the absolute
kill condition p' | v or p' | v+2, at 36 of 36 cells; and the diagonal
reproduces the published 2, 1, 2, 2, 2, 3, 2, 4 at all eight folds.

**Fold 7 over T_5: L = 2 IS forced, and the forcing agent is alternation, not
scarcity.** T_5's word is 6, 12, 12. 6 mod 7 = 6 does not qualify; 12 mod 7 = 5
is class M. The three cyclically adjacent pairs are (6,12), (12,12), (12,6), and
a legal run of three sits on none of them: the one pair of qualifying neighbours
is (M, M), and a class-M gap from state A lands in B, where a second class-M gap
is illegal. Forced ceiling 2, true L 2.

## 2. The table

Full 71-cell table in the script's OUTPUT block §5 (exact tiles T_5..T_29, six
folds each; segmented windows [0, 6.000e+9) at x = 31, 37, 41, 43, every column
of which is a window LOWER bound). The ladder diagonal, which is the row the
u-frame requirement is about:

| tile | p' | forced ceiling | Theorem B | bridge (corrected) | bridge (literal) | true L | 0.18p' | G₂/(3p') | 0.31p'/ln p' |
|---|---|---|---|---|---|---|---|---|---|
| T_5 | 7 | 2 | 2 | 3 | 3 | 2 | 1.26 | 0.57 | 1.12 |
| T_7 | 11 | **1** | 2 | 2 | 4 | 1 | 1.98 | 0.91 | 1.42 |
| T_11 | 13 | 2 | 2 | 8 | 8 | 2 | 2.34 | 1.08 | 1.57 |
| T_13 | 17 | 4 | 4 | 5 | 6 | 2 | 3.06 | 1.29 | 1.86 |
| T_17 | 19 | 4 | 4 | 11 | 11 | 2 | 3.42 | 1.89 | 2.00 |
| T_19 | 23 | 4 | 4 | 8 | 13 | 3 | 4.14 | 2.17 | 2.27 |
| T_23 | 29 | 5 | 5 | 10 | 11 | 2 | 5.22 | 2.34 | 2.67 |
| T_29 | 31 | 6 | 6 | 13 | 13 | 4 | 5.58 | 2.77 | 2.80 |
| MEAN | | 3.50 | | | | 2.25 | | | 1.96 |

## 3. Verdict on forced versus bridge

**Forced is strictly below the bridge nearly everywhere — mean ratio 0.686
against the corrected bridge, 0.654 against the literal one, equal at 18 and 17
of 71 cells. But that whole distance is the Alternation Lemma, which A5 already
owns.** Said loudly, because it is the finding:

> **FORCED CEILING = A5 THEOREM B AT 68 OF 71 CELLS.** It is strictly below at
> three, always by exactly 1. Channel compatibility, over and above alternation,
> is worth one unit three times in seventy-one cells.

So the angle **does** compress onto the maxsum ask — onto TODO 0c's object, not
onto condition (i) — and almost nothing is lost. Anyone hoping the run census
would beat Theorem B by a factor should stop.

**The three cells where it does bite name the alphabet fact exactly.** It is
never "the cheap class is too big"; it is always **a legal value that simply
does not occur**:

| cell | forced | Theorem B | true L | missing class minimum | G₂ of the tile |
|---|---|---|---|---|---|
| T_7 @ 11 | 1 | 2 | 1 | P = 24 (also Z = 66, M = 42) | 30 |
| T_7 @ 13 | 1 | 2 | 1 | M = 24 (also Z = 78, P = 54) | 30 |
| T_19 @ 29 | 2 | 3 | 2 | M = 114 (also Z = 174) | 150 |

In all three the missing value is smaller than the tile's largest gap, so size
does not exclude it: 24 < 30 and 114 < 150. These are census accidents, the same
mechanism `research/kappa-not-L.md` records for the fold-11 anomaly, which now
has two further instances. **And at all three the forced ceiling is exact**
(1, 1, 2 against true L 1, 1, 2). That is the only place in the census where
anything closes.

**One implementation warning that a bisecting implementation would get wrong.**
The feasible set {k : cmin(k) ≤ maxsum_k} is NOT downward closed. At T_13 @ 17,
cmin(2) = 102 > maxsum_2 = 96 while cmin(3) = 138 = maxsum_3 = 138, so k = 2
fails and k = 3 holds. The ceiling is still valid, since L−1 must lie in the set
and the bound takes its maximum, but it must be taken as a maximum and not as a
first failure.

## 4. The decision question, with bands

**NO — the average forced ceiling sits ABOVE the requirement line over the whole
computable range, and it is diverging.**

On the ladder diagonal: mean forced ceiling 3.500 against mean 0.31·p/ln p =
1.964 (ratio **1.782**) and mean 0.19·p/ln p = 1.204 (ratio **2.908**). Forced
sits below the 0.31 line at 1 of 8 folds and below the 0.19 line at 0 of 8.
Averaged over all six folds of each level, forced/req31 runs 0.68, 0.51, 0.68,
0.88, 0.92, 0.84, 0.98, 1.20 across T_5 to T_29, crosses 1 at T_29 and stays
above it at every window level (1.11, 1.17, 1.10, 1.05).

**The band is not statistical, it is the 0.19-to-0.31 spread itself, and the
answer is the same at both ends.** Against 0.19 the bound is over by a factor
2.9; against 0.31 by 1.78. There is no reading of the constant on which the
forced ceiling clears.

**The trend is the real content.** forced/req31 against ln p' on the diagonal
has slope **+0.487**: the bound is not merely above the line, it is pulling away
from it, which is the linear-versus-polylog branch appearing directly in eight
computable points rather than as an asymptotic argument.

**And the truth is not doing that.** trueL/req31 has slope **−0.234** and mean
1.168, and over all folds it sits flat at 0.68, 0.51, 0.68, 0.74, 0.73, 0.78,
0.67, 0.72 across T_5 to T_29. So L itself remains compatible with the
requirement over the computable range while the bound does not; the bound pays a
factor **1.47** over the truth on the diagonal and that factor is what grows.
The obstruction is in the proof, not in the object.

**The floor is visible as a column.** G₂/(3p') crosses 1 at T_11 @ 13, reaches
2.77 at T_29 @ 31 and 3.07 at W_37 @ 41, and the forced ceiling never goes under
it, because maxsum_1 = G₂ alone licenses a run whenever G₂ ≥ 3p'. That is A5's
structural cap re-derived from the census side, and channel compatibility does
not touch it.

## 5. Pre-registration scored

| prediction | outcome |
|---|---|
| P1 forced ≤ Theorem B ≤ bridge, forced strictly below the bridge at nearly every cell, factor near 2 | **RIGHT**, mean ratio 0.686 |
| P1's attribution: the gap is alternation AND alphabet | **HALF WRONG.** Alternation is essentially all of it; the alphabet is worth 1 unit at 3 of 71 cells |
| P2 alphabet bites at folds 7, 11, 13 and stops from 17 or 19 up | **WRONG IN FORM, RIGHT IN SPIRIT.** It bites at T_7 @ 11, T_7 @ 13 and T_19 @ 29, so it is not confined to the shallow end; the real predicate is "a class minimum is absent from the alphabet", which can happen at any depth |
| P3 the angle mostly compresses onto the maxsum ask | **RIGHT, and more strongly than predicted** |
| P4 average forced sits above the requirement line, ratio worsening | **RIGHT**, 1.782 against 0.31 and 2.908 against 0.19, slope +0.487 |
| P5 fold 7 over T_5 forced to L = 2 by alternation | **RIGHT**, with the mechanism confirmed cell by cell |

## 6. Cross-checks against what the repository already holds

Recomputed only as a by-product of what this census needs; held against the
bound artifacts rather than replacing them. All agree.

- G₂(x#) at x = 5..29 against `research/exact-g2-ladder.js`: 12, 30, 42, 66,
  108, 150, 204, 258, eight of eight.
- maxsum_m(T_29), m ≤ 6, against `research/gate-multiplies-03.js`'s tail as
  carried in `research/gate-multiplies.md` §8: 258, 330, 390, 420, 510, 540.
- A5 Theorem B on the diagonal against `research/a3-05-bound-L.md` §5:
  2, 2, 2, 4, 4, 4, 5, 6, eight of eight.
- condition (i) on the diagonal: reproduced by the corrected bridge, not by the
  literal one (see §1).
- true L on the diagonal against `research/a3-05-bound-L.md` line 185:
  2, 1, 2, 2, 2, 3, 2, 4, eight of eight.
- the extremal run words: 48 + 90 at fold 23 and 60 + 126 + 60 at fold 31,
  matching `research/kappa-not-L.md`'s alternation check.
- f, the qualifying-gap fraction, at T_11 @ 13 reads 4.444e−2 and at T_29 @ 31
  reads 3.737e−2, matching `research/f-decays.md` and `research/U-FRAME.md`
  §12's diagonal to their printed precision. Independent reproduction of two of
  the 42 census points by a route that builds the tile rather than the census.

## 7. What this proposes for the live documents

Nothing is proposed for a live document as a headline. Three narrow additions
are candidates once a second pass has looked at them:

1. `research/kappa-not-L.md` could record that the forced ceiling from channel
   compatibility equals Theorem B at 68 of 71 cells, which closes the question
   "is there anything left in the residue side" with a number rather than an
   argument. The document already says "the residue side has nothing more to
   give"; this measures how little.
2. The fold-11 anomaly there has two more instances, T_7 @ 13 and T_19 @ 29, and
   the general predicate is "a class minimum below G₂ that does not occur in the
   alphabet", not anything about fold 11.
3. The non-downward-closed feasible set at T_13 @ 17 is worth a line wherever
   Theorem B is implemented, since the natural implementation is wrong there.

## 8. Files

- `research/attack-foldL-01-census.js` — the census, formally embedded, 236.9 s.
- this note.

## 9. NOT REACHED

- The forced ceiling was computed against maxsum, which is an ordered-word
  quantity. A purely alphabet-level ceiling — one that never looks at the order
  of the gaps — was not attempted, and it is not obvious it exists, since
  without a span constraint an alternation-legal word can be extended forever.
- Multiplicity feasibility is checked only as presence, not as count. It can
  only bind on the tiniest tiles, where the true L is computed exactly anyway,
  so nothing in the table depends on it; but the forced ceiling is therefore a
  presence-relaxation and not a multiset-exact bound.
- κ(m) for m > 1 was not censused. The whole run is at κ(1) = L, and
  `research/U-FRAME.md` §5a step 3a says κ is the better coordinate. Whether
  channel compatibility buys more at κ(m) than the 3-in-71 it buys at L is open
  and is the obvious next question.
- Exact tiles stop at T_29. T_31 is streamable (`research/U-FRAME.md` §8 records
  126 s from T_29) and would add one more exact diagonal point; the windows at
  x = 31..43 are lower bounds and cannot settle a ceiling.
- No attempt was made to bound a residue-deleted maxsum directly, which is
  TODO 0c and is where §3's verdict says this angle lands.
