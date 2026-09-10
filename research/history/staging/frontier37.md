# Frontier 37: the fold-L wave's three exact instruments, one level deeper

<!-- ledger
id: Q-frontier37
status: ANSWERED
todo: none
question: What do the fold-L wave's three exact instruments give one level deeper, at fold 37?
verdict: The prior-art check moved the target first: the ninth diagonal L(T_31, 37) = 4 and the maxsum_m(T_31) table for m <= 8 were already embedded in the corpus, so this is a re-measurement, not a first; M_alt = G2 is measured at eight folds and proven at none, and the transport ratio's rise 0.8881 to 0.9477 has no mechanism attached.
-->

*2026-08-19. Staging note. Proposal only; nothing here is integrated into a live
document. Producers: `research/attack-frontier37-01-word.js` (the word
statistic, embedded, 243.1 s) and `research/attack-frontier37-02-transport.js`
(the direct fold, the certificate and the transport inequality, embedded,
661.9 s). Both were bound with `node research/qc/embed.js`, calibration and
deep leg in the same invocation.
Every figure below is read from those two embedded OUTPUT blocks.*

## 0. THE PRIOR-ART CHECK CAME FIRST, AND IT MOVED THE TARGET

`research/a3-10-lower-tightness.js`, leg `deep37`, already streams T₃₁
(6,226,553,025 slots out of T₂₃, 519 s) and its embedded tail already carries

    T31: D = 6226553025, W = 200560490130, mean gap = 32.21
    maxsum_1..8 = 348, 408, 510, 540, 552, 582, 624, 660
    L(T31, 37) = 4   best merge by run length = 408, 510, 528, 408, 0
    G2(37#) = 528  (interior 528 at run length 3, best bridge 84)

So **the ninth diagonal value of L and the maxsum_m(T₃₁) table for m ≤ 8 are not
new to this corpus**, and the values are quoted onward in
`research/kappa-not-L.md` §"the effective run length" and `research/U-FRAME.md`
§5's fold table. Anything in this note that reads like a first measurement of
those two objects is not one. What is genuinely first at fold 37 is the ROUTE
for L (the census's word statistic, never evaluated past T₂₉), the census
ceiling row, the measured alphabet, the transported certificate, and the
transport inequality.

## 1. PRE-REGISTRATION, VERBATIM, WITH ITS OUTTURN BESIDE IT

Written and saved before either deep run started. The word statistic was run and
its answer recorded before the direct enumeration produced any output.

| # | pre-registration, verbatim | outturn |
|---|---|---|
| A1 | "The word statistic (longest alternation-legal window of T31's cyclic gap word, classes mod 37, no slot residue ever taken) returns 4." | **RIGHT.** `L_word(T31, 37) = 4` |
| A2 | "The direct per-alignment kill-run enumeration on the same stream (absolute condition 37 \| v or 37 \| v+2, no gap ever reduced mod anything) returns 4, so the census's Lemma 'the word is the whole story' holds at its ninth diagonal cell, one level outside its verified range." | **RIGHT.** `L(direct) = 4` |
| A3 | "maxsum_1..8(T31) reproduces a3-10's row exactly: 348, 408, 510, 540, 552, 582, 624, 660." | **RIGHT**, all eight |
| B1 | "M_alt(T31 -> 37) = 528 = G2(37#) exactly. The alternation-refined certificate stays exact at its EIGHTH fold." | **RIGHT.** M_alt = 528 |
| B2 | "M_loose(T31 -> 37) >= 528, and I give it about even odds of being STRICTLY larger. It was strictly larger exactly once so far (270 vs 258 at fold 29), and fold 37 is the fold every other statistic in the corpus flags as the outlier." | **WRONG.** M_loose = 528, exact. Fold 29 remains the only fold at which loose and refined differ |
| B3 | "M_full = 528 identically. This is near-tautological and is a code check, not a test." | **RIGHT**, and it is a code check |
| C1 | "Zero violations of N_new(theta) <= (q-2) N(theta) + 2 * SUM_{L>=1} Q_L(theta), q = 37, at every theta on the value grid, with the L-sum UNTRUNCATED." | **RIGHT.** 0 violations at all 88 θ, both the loose and the refined Q_L |
| C2 | "max N_new/RHS lands in 0.93 to 1.00." | **RIGHT.** 0.9477, at θ = 48 |
| C3 | "In the certificate-decisive range theta > G2(T31) = 348 the first term is inert (N(theta) = 0 there) ... at theta = 528, N_new(528) = 2 (the ladder's nmax for x = 37), so the ratio there is 1/SUM Q_L(528) and will be far below 1." | **RIGHT** on every clause. N(528) = 0, N_new(528) = 2, ΣQ_L(528) = 2, ratio 0.5 |

Eight of nine. The one miss is B2, and it is the miss that makes the fold-37
result stronger rather than weaker.

## 2. (A) THE DIAGONAL CELL L(T₃₁, 37)

**Both routes read 4, and they share no state.** The word route never takes a
slot residue; the residue route never reduces a gap modulo anything. The census
lemma that says they must agree is verified at 36 cells with x ≤ 19 and on a
diagonal that stopped at T₂₉, and it now holds at the ninth diagonal cell.

The extremal alternation-legal word is **150 + 72 + 150**, which is
4p′+2, 2p′−2, 4p′+2 at p′ = 37. At fold 31 the same object is 60 + 126 + 60, so
the two signs swap roles between the folds even though 31 and 37 are both
1 (mod 6). Each word sums to 6p′ plus the value it repeats, 246 and 372, and
neither of these longest runs wins the merge: the merge that produces G₂(37#) is
a run of THREE, and the best merge a run of four can make is 408.

**maxsum_m(T₃₁), m ≤ 8, exact.** Reproduced term for term from a3-10's tail in
243 s against 519 s. The stream construction is the same shape in both, so this
reproduces the consumer rather than the stream; the stream is re-certified by
D = 6,226,553,025 and, in the second leg, by D(T₃₇) = 217,929,355,875.

| m | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| maxsum_m(T₃₁) | 348 | 408 | 510 | 540 | 552 | 582 | 624 | 660 |

**The ninth row of the census diagonal, and the alphabet is now measured rather
than predicted.** T₃₁ carries 55 distinct gap values, and all three abstract
class minima at p′ = 37 occur among them: Z = 222, P = 150, M = 72. So the
alphabet-aware cheapest legal word equals the abstract one at every k ≤ 8, the
forced ceiling equals A5's Theorem B, and the census's prediction P2 (the
alphabet fact collapses onto Theorem B once the tile is large) holds here.

| tile | p′ | forced | Theorem B | true L | 0.31 p/ln p | forced/req | trueL/req |
|---|---|---|---|---|---|---|---|
| T₃₁ | 37 | 6 | 6 | 4 | 3.18 | 1.89 | 1.26 |

The bound pays a factor 1.5 over the truth, against the census's mean of 1.47
over its eight cells, and the §4 verdict is unchanged one level deeper: the
ceiling sits above the requirement line and pulls away from it while the object
itself does not.

The qualifying menu of T₃₁ at p′ = 37, values at or below G₂(T₃₁) = 348, is four
values wide: 72 (×1.099e+8), 150 (×4.937e+6), 222 (×2.637e+4), 294 (×46). The
count 46 is the entire supply of the third cheapest qualifying value across
6.2 billion gaps, which is the scarcity `research/a3-10-lower-tightness.js`
reading 8 names as the reason long runs usually lose.

**Honest limit.** Both ceilings are evaluated on m ≤ 8. The feasible set
{k : cmin(k) ≤ maxsum_k} is not downward closed, so a longer maxsum table could
in principle re-open a larger k. The margin at k = 8 is 888 − 660 = 228 and cmin
gains 111 per step on average against a mean gap of 32.21, so re-opening is not
expected; it is not excluded here.

## 3. (B) THE TAIL-COUNT CERTIFICATE AT FOLD 37

**M_loose = M_alt = M_full = G₂(37#) = 528. The certificate is exact at its
eighth fold, and at this fold the alternation refinement is not needed.**

| fold q | 11 | 13 | 17 | 19 | 23 | 29 | 31 | **37** |
|---|---|---|---|---|---|---|---|---|
| M_loose | 42 | 66 | 108 | 150 | 204 | **270** | 348 | **528** |
| M_alt | 42 | 66 | 108 | 150 | 204 | **258** | 348 | **528** |
| M_full = truth | 42 | 66 | 108 | 150 | 204 | 258 | 348 | **528** |

Folds 11 through 31 are recomputed here from an implementation written for this
note and agree with `verify-tailcount-transport.md`'s table cell for cell,
including the one place the two certificates part company. **Fold 29 is still the
only fold at which they differ.** That is the outturn against pre-registration
B2, which gave even odds the other way, and it is the more informative result:
the named open question of `verify-tailcount-transport.md`, whether M_alt = G₂
always, gets an eighth affirmative data point and no first failure, and the
loose certificate, which is the one the published inequality actually uses, is
not degrading with depth either.

**What that does and does not license.** It does not make the exactness a
theorem. `verify-tailcount-transport.md` (c) already explains why exactness is
near-tautological for M_full and a relaxation for the other two, and the honest
reading is unchanged: the transport is a sharp per-level evaluator, not a source
of a chained bound, and the eighth fold is one more level evaluated sharply.

## 4. (C) THE TRANSPORT INEQUALITY AT FOLD 37

Angle 3 recorded this as NOT REACHED, needing a stream of a stream. It is
reached, at every θ rather than at a sample, with the L-sum untruncated.

    N_new(theta) <= (q-2) N(theta) + 2 * SUM_{L>=1} Q_L(theta),   q = 37

**0 violations at all 88 θ values, with the loose Q_L and with the refined one.
max N_new/RHS = 0.9477, at θ = 48.**

| fold q | 11 | 13 | 17 | 19 | 23 | 29 | 31 | **37** |
|---|---|---|---|---|---|---|---|---|
| max N_new/RHS | 1.0000 | 1.0000 | 0.8881 | 0.8975 | 0.9180 | 0.9324 | 0.9348 | **0.9477** |

Folds 11 through 29 reproduce `verify-tailcount-transport.md` (b) to four
decimals; folds 31 and 37 are new. The ratio has risen at every fold from 17
upward, 0.8881 to 0.9477 over five steps, and is now within 5.2% of the
inequality. A naive linear extrapolation in the fold index, 0.0119 per step,
reaches 1 in about four more folds, which would be fold 53. That is a weak
prediction, since the two shallowest folds sit at 1.0000 and the trend is not
monotone over the whole range, but it is checkable at fold 41 and it is the
right shape to watch: the relaxation is losing margin in the direction that
would make the inequality tight rather than false.

**The certificate-decisive range behaves as pre-registered.** N(θ) = 0 for every
θ > G₂(T₃₁) = 348, so the first term is inert above 348 and the inequality there
is `N_new ≤ 2 ΣQ_L`. At θ = 528 the reading is N_new = 2, ΣQ_L = 2, ratio 0.5.

**Two counts recovered as by-products, and they are the run's strongest
custody.** The new tile's slot count comes out at
**D(T₃₇) = 217,929,355,875**, which is A059861's term as recorded in
`research/oeis-G2-submission.md`, assembled here from two completely separate
sources (the L = 0 new gaps counted by alignment multiplicity, plus
12,338,231,614 enumerated maximal kill runs) that have to agree to the unit.
And **N_new(528) = 2** reproduces `research/exact-g2-ladder.js`'s `nmax: 2` for
x = 37, the number of positions in [0, 37#) attaining the record gap, by a route
that never visits a position.

Other readings at fold 37: the longest run of consecutive qualifying gaps in
T₃₁ is 3, so the required truncation index is 4 and the producer's L ≤ 8 cutoff
is still sound with four to spare; 6,341,904,311 windows are scored under the
loose interior condition and 6,341,472,275 under the refined one, a difference
of 432,036, which is how little the alternation walk removes at this fold and is
consistent with it removing nothing from the maximum.

## 5. CALIBRATION, ALL OF IT PASSING BEFORE ANY DEEP FIGURE WAS BELIEVED

Both scripts run their calibration in the same invocation as the deep leg.

- L_word at the eight diagonal cells: 2, 1, 2, 2, 2, 3, 2, 4 at folds 7 to 31,
  against the published row, eight of eight.
- maxsum_1..8(T₂₉) = 258, 330, 390, 420, 510, 540, 552, 582 against a3-10's
  deep31 leg, eight of eight.
- D(new) = D(q−2) exact at all seven calibration folds and at fold 37, from two
  independent counting routes.
- G₂(new) at folds 11 to 31 = 42, 66, 108, 150, 204, 258, 348 against
  `research/exact-g2-ladder.js`, seven of seven, and 528 at fold 37.
- L(direct) at folds 11 to 31 = 1, 2, 2, 2, 3, 2, 4 against the published
  diagonal, seven of seven.
- The certificates at folds 11 to 31 against `verify-tailcount-transport.md`,
  including M_loose = 270 with M_alt = 258 at fold 29.
- Best merge by run length at fold 37 = 408, 510, 528, 408 and at fold 31 =
  330, 348, 330, 330, against a3-10's identical deep37 and deep31 rows.

## 6. COSTS, PREDICTED AND ACTUAL

| leg | predicted | actual |
|---|---|---|
| word statistic, calibration plus T₃₁ at fold 37 | 600 to 900 s | **243.1 s** |
| direct fold, certificate and transport, calibration plus T₃₁ at fold 37 | 900 to 1800 s | **661.9 s**, calibration 18.2 s of it; the deep leg alone measured 553.9 s in an uncontended standalone run |

Both estimates erred dear by roughly a factor 2.5, in the opposite direction to
the brief's warning. The reference point that priced them, a3-10's 519 s for the
same stream, was itself 2.1 times slower than the same stream is here, which is
the consumer and not the stream.

## 7. CORRECTIONS TO THE RECORD

1. `research/history/staging/attack-foldL-01-census.md` §9 NOT REACHED says
   "Exact tiles stop at T_29. T_31 is streamable and would add one more exact
   diagonal point". That item is now closed: the ninth diagonal point is
   computed, by the census's own statistic, and it agrees with the direct fold.
   The census's §2 table can carry a T₃₁/37 row of forced 6, Theorem B 6,
   true L 4.
2. `research/history/staging/attack-foldL-03-transport.md` §7 records the
   transport inequality as checked at five folds with an L ≤ 8 truncation.
   It is now checked at eight folds with the sum untruncated, and the required
   index at fold 37 is 4.
3. `research/history/staging/verify-tailcount-transport.md`'s open question
   "whether M_alt = G₂ ALWAYS" has an eighth affirmative fold and still no
   counterexample. Its drafted live-layer paragraph reads "Exact at folds 11
   through 31"; the range is now 11 through 37.
4. No claim anywhere in the corpus was found to be wrong by this run. Every
   recomputed figure agreed.

## 8. FILES

- `research/attack-frontier37-01-word.js` — the word statistic, the maxsum
  table and the census ceiling row. Embedded, invocation `full`, 243.1 s.
- `research/attack-frontier37-02-transport.js` — the direct per-alignment fold,
  the three certificates, and the transport inequality at every θ. Embedded,
  invocation `full`, 661.9 s.
- this note.

Both tails were re-verified after the fact with
`node research/qc/embed.js --check --timeout 1800 --node-flag
--max-old-space-size=4096 research/attack-frontier37-0N-*.js -- full`, and both
report `code-sha256 matches` and `out-sha256 matches`, so each pasted block is a
second independent run of the same code. The `-- full` argument and the node
flag are load-bearing for that check: without them the checker runs the
calibration leg alone and reports a spurious difference.

## 9. NOT REACHED

- **Fold 41 and beyond.** T₃₇ has 217,929,355,875 slots, 35 times T₃₁, so the
  same two passes cost about 2.4 hours and 5.4 hours respectively at the rates
  measured here. `research/G2-STATE.md` prices the streaming leg at 5.05 h from
  the same starting point, which agrees. Nothing in the method breaks; only the
  budget does.
- **A theorem where a datum now sits.** M_alt = G₂ is measured at eight folds
  and proven at none. The one-line structural argument that makes M_full exact
  says nothing about the two dropped conditions, which is exactly the gap.
- **The rising ratio in §4 is not modelled.** 0.8881 to 0.9477 over six folds is
  a trend with no mechanism attached, and no attempt was made here to say what
  it is a trend in.
- **κ(m) for m > 1 at fold 37.** The census's own NOT REACHED names κ as the
  better coordinate; this run stayed at κ(1) = L, as its predecessors did.
- **Multiplicity feasibility** is still checked as presence only, inherited
  unchanged from the census.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
