# Attack 1: the combined-L ladder

<!-- ledger
id: Q-block-combined-L
status: CLOSED
todo: none
question: Does combined L grow slower than the window, the criterion for the v -> v^2 block ladder to sustain itself?
verdict: No: on the eleven-term exact ladder (this attack computed G2(41#) = 546) the ratio is flat at slope +0.05 +/- 0.11 on b >= 11 against a 12.3 per cent band, while the same estimator resolves the one-class control's falling ratio at 11.6 sigma; and the criterion is not independent, since at the natal it IS G2(x#)/x^2, the Zone Postulate itself.
-->

Object: BLOCK v -> v^2 on the twin tile T_v. COMBINED L is the longest run of
cyclically consecutive T_v slots deleted by the whole block. The question is
whether combined L grows slower than the window, since that is the criterion
for the v -> v^2 ladder to sustain itself.

**VERDICT (two sentences).** Combined L does **not** measurably grow slower
than the window anywhere in the computable range: on the longest exact ladder
that exists — now **eleven** terms, b = 5 to 41, after this attack computed
**G2(41#) = 546** — the ratio of combined L to the window in slot units is
**flat**, slope **+0.05 +/- 0.11** on b >= 11 against a 12.3% fluctuation band,
and the three window conventions tried do not even agree on the sign, while the
identical estimator over the identical range resolves the one-class control's
falling ratio at 11.6 sigma, so the instrument is sharp and the signal is
absent. The criterion is also **not an independent instrument**: at the natal
where the exact ladder lives the mean-gap conversion cancels to within 1.5%, so
"combined L against the window in slot units" *is* `G2(x#)/x^2`, which is the
Zone Postulate itself and therefore TPC-equivalent by trap 2.

**The single number: +0.05 +/- 0.11**, the fitted slope of
`ln(combined L / window in slot units)` against `ln b` over the nine exact
levels b = 11 to 41. Zero to within half a standard error.

**The one durable product: `G2(41#) = 546`, exact, new**, the eleventh exact
term, computed twice from two different natal tiles in 2 min 31 s against the
repo's standing price of 5.6 hours (`TODO.md` item 1b, `G2-STATE.md` §9 item 6).
It lands inside the pre-registered Poisson window 476 to 633.

Status: the derivation the brief asked for is VALIDATED at b = 23 and at three
further levels, and its failure mode is characterised. Direct enumeration was
pushed from block 1 (23#, 2.2e8) to **41# = 3.04e14**, a factor of 1.36 million.
No existing repo file was edited. Scratch code lives outside the repo.

---

## 0. Custody

Two independent programs were written from scratch for this task; no repo code
was reused.

- `block.c` — scalar walk. Enumerates every T_v slot in [0, b#), maintains the
  residue of the position modulo each block prime incrementally, and finds the
  longest run of deleted slots and the largest integer gap between survivors in
  one pass, with the cyclic wrap closed by joining tail run to head run across
  the thread seam.
- `bitblock.c` — bit-parallel. The dead bitmap of one copy of the T_v tile is an
  OR of precomputed residue masks, 64 slots per word. A shift-AND filter finds
  words containing a dead run at least THRESH long; only those words take the
  slow exact path. THRESH is chosen from a *proved* lower bound on the answer
  (see §2), so it never hides the maximum.

**Custody ladder, five independent agreements.**

| level | scalar `block.c` | bit-parallel `bitblock.c` | survivor count | D_b closed form |
|---|---|---|---|---|
| 23# | G2 = 204 | G2 = 204 | 7,952,175 | 7,952,175 |
| 29# | G2 = 258 | G2 = 258 | 214,708,725 | 214,708,725 |
| 31# | G2 = 348 | G2 = 348 | 6,226,553,025 | 6,226,553,025 |
| 37# | G2 = 528 | G2 = 528 | 217,929,355,875 | 217,929,355,875 |
| 41# | — | G2 = 546 (natal 19 **and** natal 23) | 8,499,244,879,125 | 8,499,244,879,125 |

Every one of 204, 258, 348, 528 is the repo's exact G2 value. At 37# the two
programs agree not only on the value but on the **position** of the maximal gap,
544,899,485,411, having walked different tiles (T_23 and T_19). At 41# the two
bit-parallel runs used different natal tiles, different thresholds and disjoint
mask sets and returned the same value at the same position, 3,784,200,788,231.
D_b = prod_{3<=p<=b}(p-2) is reproduced exactly at all five levels.

**Control custody.** The same engine run in one-class mode (delete only
r = 0 mod p; tile = residues coprime to v#) reproduces A048670,
g(x#) = **6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74** at x = 5 to 41 — eleven
terms, the same eleven levels as the two-class ladder — and phi(x#) at every
level, including phi(37#) = 1,103,619,686,400. That control is used in §6 and
its value there depends on the engine being right, so it is checked here rather
than assumed. The g(41#) run cost 11 min 05 s.

**One hazard to record.** The scratch directory used for this attack turned out
to be shared with another agent, which overwrote one of the analysis scripts
mid-run. Every number in §4 and §6 was therefore recomputed from scratch in a
private subdirectory, from a script that also *asserts* the natal-5 bracket is a
point at every level and throws if it is not. All values reproduced. The C
binaries and their outputs were not touched, and their timestamps were checked.

---

## 1. The derivation: validated at b = 23, and it is a lower bound, not an identity

The brief proposed deriving combined L from G2 as "the number of T_v slots
strictly inside the maximal gap of T_b", and required validation at b = 23
before use. Both halves of that instruction mattered.

**The rigorous form is a two-sided bracket, not the proposed identity.** Because
T_b is a subset of T_v, a run of L deleted T_v slots spans exactly L+1
consecutive T_v gaps whose total is a T_b gap. Writing maxsum_n(T_v) and
minsum_n(T_v) for the largest and smallest total of n cyclically consecutive
T_v gaps,

> **N_max - 1 <= combined L(T_v -> b) <= N_min - 1**, where
> N_max = min{n : maxsum_n(T_v) >= G2(b#)} and
> N_min = max{n : minsum_n(T_v) <= G2(b#)}.

Lower: the maximal T_b gap has some number k of T_v slots inside it, and
G2(b#) <= maxsum_{k+1}, so k+1 >= N_max and L >= k >= N_max - 1. Upper: the
maximal run's own span is at least minsum_{L+1} and at most G2(b#), so
L+1 <= N_min. Both directions are elementary and need only the T_v gap sequence.

**Validation at b = 23 (natal 5), as instructed.** T_5 has gaps 6, 12, 12
repeating. maxsum_20 = 204 and maxsum_19 = 192, so N_max = 20; minsum_20 = 198
and minsum_21 = 210, so N_min = 20. The bracket collapses to a point:
**combined L = 19**. Direct enumeration of all 22,309,287 T_5 slots in 23#
returns **19**. The derivation reproduces the measured value and is cleared for
use at natal 5.

**It stays exact at natal 5 at every level.** The bracket collapses to a single
integer for every exact G2, and the two extra levels enumerated directly confirm
it:

| b | G2(b#) | bracket at natal 5 | enumerated | agree |
|---|---|---|---|---|
| 7 | 30 | [2, 2] | — | — |
| 11 | 42 | [3, 3] | — | — |
| 13 | 66 | [6, 6] | — | — |
| 17 | 108 | [10, 10] | — | — |
| 19 | 150 | [14, 14] | — | — |
| 23 | 204 | [19, 19] | **19** | yes |
| 29 | 258 | [25, 25] | **25** | yes |
| 31 | 348 | [34, 34] | **34** | yes |
| 37 | 528 | [52, 52] | — | — |
| 41 | 546 | [54, 54] | — | — |

**But the identity the brief proposed is FALSE off natal 5, and by a lot.**
Counting T_v slots strictly inside the maximal gap gives the *lower* end of the
bracket, and the maximum run does not have to live in the maximum gap.
Measured directly:

| natal v | b | slots inside the maximal gap | true combined L | error |
|---|---|---|---|---|
| 5 | 23 | 19 | 19 | 0 |
| 5 | 29 | 25 | 25 | 0 |
| 5 | 31 | 34 | 34 | 0 |
| 19 | 37 | 11 | 13 | -15% |
| 23 | 37 | 8 | 10 | -20% |

At b = 23 the argmax of the run and the argmax of the gap are at *different*
positions (33,638,411 and 76,166,567); they both happen to yield 19 because
T_5 has only two gap lengths. At natal 23 the two positions differ and so do
the two answers. **The derivation is safe at natal 5 and nowhere else**, which
is exactly the natal the exact ladder needs, so it was used and no further.

---

## 2. How far the enumeration reaches, and what it cost

The brief asked whether 29# (6.5e9) was affordable and asked for the decision
either way. It is affordable; so is 31#, so is 37#, and so is **41#**.

| natal | b | period b# | T_v slots walked | engine | wall, 10 cores |
|---|---|---|---|---|---|
| 5 | 23 | 2.23e8 | 22,309,287 | scalar | 0.39 s |
| 5 | 29 | 6.47e9 | 646,969,323 | scalar | 1.35 s |
| 5 | 31 | 2.01e11 | 20,056,049,013 | scalar | 47.5 s |
| 23 | 37 | 7.42e12 | 264,513,197,025 | scalar | about 10 min |
| 19 | 37 | 7.42e12 | 289,704,930,075 | bit-parallel | **6.42 s** |
| 19 | 41 | 3.04e14 | 11,877,902,133,075 | bit-parallel | **2 min 31 s** |
| 23 | 41 | 3.04e14 | 10,845,041,078,025 | bit-parallel | about 5 min (shared) |

**Why the bit-parallel engine is 100x faster than the price on record.**
`TODO.md` item 1b prices G2(41#) at 5.6 hours by the streaming leg, scaling
T_31's 6,226,553,025 slots at 519 s by the slot ladder. That price is for a
*per-slot* walk. Choosing natal 19 puts all 161 residue masks in 7.27 MB, small
enough to stay resident, and then 64 slots are tested per machine word. The
measured cost is **151 s**, 133x below the 5.6-hour figure and 880x below the
37-hour lattice-walk figure. The residual risk the TODO names (memory at 2.2e11
slots) does not arise, because the engine never materialises T_37; peak
resident set is under 200 MB.

**Threshold safety.** The filter records a run only when it is at least THRESH
long, so THRESH must not exceed either the true combined L or the run length at
the true maximal gap. Both are bounded below without knowing the answer:
G2(41#) >= G2(37#) = 528 because T_41 is a subset of T_37, and
combined L(T_v -> 41) >= combined L(T_v -> 37) for the same reason. From
maxsum_n(T_19), G >= 528 forces the run at the maximal gap to be at least 11,
and combined L(T_19 -> 37) = 13 was measured, so THRESH = 11 is proved safe.
The natal-23 run used the same argument to reach THRESH = 7. Two different
safe thresholds, same answer.

**What is not affordable.** 43# = 1.31e16 is 43x the 41# run, so about 108
minutes by the same engine and clearly reachable; 47# is another 47x, about
85 hours, and is not. The wall is not this attack's.

---

## 3. G2(41#) = 546, the eleventh exact term

> **G2(41#) = 546**, attained at position 3,784,200,788,231 mod 41#.
> Survivors 8,499,244,879,125 = prod_{3<=p<=41}(p-2), exactly.

**This was not in the repo.** `grep -rl 8499244879125` over the whole tree
returns nothing; the pattern is sound because the same grep for the 31# and 37#
constants (200560490130, 7420738134810) returns 17 and 9 files respectively, so
a null here is informative. The one file that carries the constant 41# ,
`research/natal-cap-37-at41-march.js`, marches beta(x) = S/E and computes no
maximal gap. `G2(41#)` appears in seven `.md` files, every occurrence a
*prediction* or a *price*, never a value.

**Against the pre-registered window.** `G2-STATE.md` §9 item 6 and
`two-class-lower-bounds.md` §6 predict 476 to 633, central 513, with the band
splitting the test: about 488 if x = 37's c2' = 0.594 is an outlier and about
633 if it is a level shift.

| quantity | value |
|---|---|
| measured G2(41#) | **546** |
| pre-registered band | 476 to 633 — **inside** |
| central prediction 513 | measured is +6.4% |
| c2' = G2 / (m_bar(41) . ln D_41) = 546 / (35.7973 x 29.7710) | **0.5123** |
| full-sample mean c2' | 0.4814 |
| x = 37's c2' | 0.5939 |

The Poisson law is **confirmed**, and it is confirmed at a level narrow enough
to be worth something: the window was 476 to 633 and the term landed at 546.
On the sub-test the answer is a soft one. 546 sits 58 above the outlier reading
and 87 below the level-shift reading, with the midpoint at 560, so it leans
"x = 37 was an outlier" without settling it; c2' at 41 is 0.512, above the
0.446 to 0.500 band that x = 37 broke but well short of 37's 0.594. **Two
consecutive levels now sit above the band**, which is the reading the exponent
file should adjudicate, not this one.

The term also confirms the repo's own meta-claim about its worth. Adding it
moves the ten-term fit of d ln G2 / d ln b from 1.801 to 1.797, a shift of
0.004, against `exponent-control.md` §8's measured "0.022 on average and 0.078
at worst". As predicted, one more term does not move the exponent question.

---

## 4. The ladder

**Mean gap of the natal tile.** m_bar(v) = v# / D_v = 2 . prod_{3<=p<=v} p/(p-2).
It is the conversion factor between integers and slot units, so every rung needs
it.

| v | 2 | 3 | 5 | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| m_bar | 2.000 | 6.000 | 10.000 | 14.000 | 17.111 | 20.222 | 22.919 | 25.615 | 28.054 | 30.132 | 32.211 | 34.051 | 35.797 |
| m_bar/ln^2 v | 4.163 | 4.971 | 3.861 | 3.697 | 2.976 | 3.074 | 2.855 | 2.955 | 2.854 | 2.658 | 2.732 | 2.612 | 2.596 |

The brief's `m_bar ~ C ln^2 v` is right and the constant is
**C = e^{2gamma}/(2 C_2) = 2.4025**, from
prod_{2<p<=v}(1 - 2/p) ~ 4 C_2 e^{-2gamma} / ln^2 v. Convergence is from above
and slow: 2.596 at v = 41 against the limit 2.4025. Nothing in this report uses
the asymptotic; every rung uses the exact m_bar.

**The v -> v^2 block ladder has exactly two exact rungs, and cannot be fitted.**
Rung k folds every odd u in (v_k, v_k^2] and produces the tile T_{b_k} with
b_k the largest prime <= v_k^2; the next window is (v_k^2, v_k^4].

| rung | v | v^2 | b | G2(b#) | m_bar(v) | combined L | next window, integers | next window, slots | L / W_slot |
|---|---|---|---|---|---|---|---|---|---|
| 0 | 3 | 9 | 7 | 30 | 6.000 | 4 | 72 | 12.0 | 0.3333 |
| 1 | 5 | 25 | 23 | 204 | 10.000 | 19 | 600 | 60.0 | 0.3167 |
| 2 | 25 | 625 | 619 | **unknown** | 28.054 | — | 390,000 | — | — |

Rung 2 needs G2(619#). That is **101 primes past the frontier** this attack just
moved (pi(619) = 114 against pi(41) = 13), and the cost of one more prime is a
factor of that prime, so it is not a question of engineering. **Two rungs is what exists**, and the brief's own
warning applies to it with full force: 0.3333 -> 0.3167 is a two-point
comparison and must not be read as a trend. It is a 5% fall against a
fluctuation band measured below at 12.3%.

Note that this table's window is the *true* next block window (v^2, v^4], while
the surrogate table below uses (b, b^2]. They differ — at rung 1, 600 against
506 — and the surrogate is the conservative one (smaller window, larger ratio).
Ratios are therefore comparable *within* a table and not across the two.

**The surrogate ladder that does have length.** Index by b instead and take the
window from the level whose tile is T_b, conservatively ell = b, so the next
block's window is (b, b^2] of length b^2 - b. Combined L is at natal 5, where
the derivation of §1 is exact.

| b | G2(b#) | combined L (natal 5) | W_int = b^2 - b | W_slot = W_int/10 | **L / W_slot** | G2/W_int | G2/b^2 | G2/(b ln^2 b) | local exp |
|---|---|---|---|---|---|---|---|---|---|
| 7 | 30 | 2 | 42 | 4.2 | 0.4762 | 0.7143 | 0.6122 | 1.1318 | 2.723 |
| 11 | 42 | 3 | 110 | 11.0 | 0.2727 | 0.3818 | 0.3471 | 0.6640 | 0.744 |
| 13 | 66 | 6 | 156 | 15.6 | 0.3846 | 0.4231 | 0.3905 | 0.7717 | 2.706 |
| 17 | 108 | 10 | 272 | 27.2 | 0.3676 | 0.3971 | 0.3737 | 0.7914 | 1.836 |
| 19 | 150 | 14 | 342 | 34.2 | 0.4094 | 0.4386 | 0.4155 | 0.9106 | 2.953 |
| 23 | 204 | 19 | 506 | 50.6 | 0.3755 | 0.4032 | 0.3856 | 0.9022 | 1.609 |
| 29 | 258 | 25 | 812 | 81.2 | 0.3079 | 0.3177 | 0.3068 | 0.7846 | 1.013 |
| 31 | 348 | 34 | 930 | 93.0 | 0.3656 | 0.3742 | 0.3621 | 0.9520 | 4.487 |
| 37 | 528 | 52 | 1332 | 133.2 | 0.3904 | 0.3964 | 0.3857 | 1.0945 | 2.356 |
| 41 | 546 | 54 | 1640 | 164.0 | **0.3293** | 0.3329 | 0.3248 | 0.9657 | 0.327 |

All eleven G2 values are **GRADE A, exact**. All combined-L values are GRADE A:
the natal-5 bracket is a point at every level and three of them are confirmed by
direct enumeration.

**Grade B, kept strictly separate.** The certified greedy Y2 of
`two-class-lower-bounds.md` §5 is a *lower* bound on G2(x#) - 1 and therefore
gives only a *lower* bound on combined L. Sixteen certified levels exist, not
three; the full ladder is x = 37, 73, 113, 167, 229, 313, 421, 571, 773, 1009,
1301, 1699, 2003, 2503, 3001, 4001 with Y2 = 355 up to 356,711. Y2/x^2 falls
from 0.259 to 0.022 and d ln Y2 / d ln x = 1.449 +/- 0.017.

Pushed through the §1 bracket at natal 5 with G2(x#) >= Y2 + 1, these become
certified lower bounds on combined L, selected rows:

| x | Y2 | **combined L >=** | W_slot = (x^2-x)/10 | L_lower / W_slot | Y2/x^2 |
|---|---|---|---|---|---|
| 37 | 355 | 35 | 133.2 | 0.2628 | 0.2593 |
| 229 | 6,748 | 674 | 5,221.2 | 0.1291 | 0.1287 |
| 1009 | 56,213 | 5,620 | 101,707.2 | 0.0553 | 0.0552 |
| 4001 | 356,711 | 35,670 | 1,600,400.0 | 0.0223 | 0.0223 |

The last two columns agree to three decimals at every level, which is §5's
cancellation again and is the reason this grade adds nothing the Y2 column did
not already say.

> **That fall carries no information about the criterion and must not be put in
> the same fit as the exact terms.** A lower bound that falls relative to the
> window is consistent with the truth falling, being flat, or rising; only the
> construction is being measured, and `two-class-lower-bounds.md` §5 reading 2
> already identifies what it measures — the second class buying exactly one
> logarithm. The two grades are reported in separate tables here and were never
> pooled.

---

## 5. The slot-unit conversion cancels — and where it does not

**The cancellation.** At natal 5, combined L = G2(b#)/10 - 1 to within 0.4 at
every level, because maxsum_n(T_5) - minsum_n(T_5) <= 6 for every n. So

> L / W_slot = (G2/m_bar - 1) . m_bar / W_int = **G2/W_int - m_bar/W_int + eps**

and the mean gap, the only thing "slot units" contribute, cancels out of the
leading term. The correction -m_bar/W_int is negative and shrinking, and the
measured difference column tracks it:

| b | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 |
|---|---|---|---|---|---|---|---|---|---|
| G2/W_int - L/W_slot | 0.1091 | 0.0385 | 0.0294 | 0.0292 | 0.0277 | 0.0099 | 0.0086 | 0.0060 | 0.0037 |
| predicted m_bar/W_int | 0.0909 | 0.0641 | 0.0368 | 0.0292 | 0.0198 | 0.0123 | 0.0108 | 0.0075 | 0.0061 |

By b = 41 the criterion and G2(b#)/(b^2 - b) agree to 1.1%. **Combined L against
the window in slot units is G2(x#)/x^2 wearing different units.** That is the
central structural finding of this attack and it is what makes §7 bite.

**Where it does not cancel: the natal artifact, and it is large.** Combined L
depends on the natal tile, and L . m_bar(v) is *not* G2(b#) once the natal tile
has spread-out gaps. Measured at fixed b = 37:

| natal v | m_bar(v) | combined L(T_v -> 37) | L . m_bar | L . m_bar / G2(37#) | source |
|---|---|---|---|---|---|
| 5 | 10.000 | 52 | 520 | **0.985** | bracket, exact |
| 11 | 17.111 | 28 | 479.1 | **0.907** | enumerated |
| 13 | 20.222 | 21 | 424.7 | **0.804** | enumerated |
| 17 | 22.919 | 16 | 366.7 | **0.695** | enumerated |
| 19 | 25.615 | 13 | 333.0 | **0.631** | enumerated |
| 23 | 28.054 | 10 | 280.5 | **0.531** | enumerated |

The cause is a correlation, not noise: a long gap in T_b is preferentially
located where T_v *already* has long gaps, since T_b is a subset of T_v. The
maximal gap therefore sits in a region sparse in T_v and holds fewer T_v slots
than the mean density predicts, while the maximal *run* sits somewhere dense.
The two extremes separate, and the gap between them widens as the natal tile's
gap distribution widens.

> **TRAP, and it is new here.** Reading the slot-unit ratio *across natals*
> would show it halving from v = 5 to v = 23 at a fixed b, with no change at all
> in the underlying object. In the real v -> v^2 ladder the natal grows
> (5, 25, 625, ...), so a ladder that reported L/W_slot at each rung would show
> a fall that is an artifact of tile geometry. The effect is a finite-L
> averaging deficit and shrinks as L grows (0.985 at L = 52, 0.531 at L = 10),
> and combined L up the real ladder is large (about 19 at rung 1, about 5,000 at
> rung 2), so the artifact should die away — but nothing here proves it does,
> and it is 47% at the largest natal measured. **Never compare slot-unit ratios
> across natals.** All of §4's ladder is at one natal for exactly this reason.

Six points, monotone, and the deficit is better organised by L than by v:
0.985 at L = 52, 0.907 at 28, 0.804 at 21, 0.695 at 16, 0.631 at 13, 0.531 at
10. That is the signature of an averaging deficit, which is the reason to expect
it to die at the large-L end where the real ladder lives.

---

## 6. The fit, the fluctuation band, and the control that knows the answer

**The band first, as instructed.** On the exact ladder b >= 11, nine terms:

| ratio | mean | sd | sd as % of mean |
|---|---|---|---|
| L / W_slot (natal 5) | 0.3559 | 0.0439 | **12.3%** |
| G2 / (b^2 - b) | 0.3850 | 0.0392 | 10.2% |
| G2 / b^2 | 0.3658 | 0.0344 | 9.4% |
| G2 / (b^2 - b), level = nextprime(b) - 1 | 0.3077 | 0.0298 | 9.7% |

The total change in L/W_slot from b = 11 to b = 41 is 0.2727 -> 0.3293, which
is a **rise** of 21%, and from b = 13 to b = 41 a **fall** of 14%. Both are
inside a 12.3% one-sigma band. There is no signal at this length.

**The fitted slopes, three window conventions.**

| quantity, b >= 11 | slope of ln(ratio) vs ln b | verdict |
|---|---|---|
| L / W_slot, slot units, level = b | **+0.052 +/- 0.105** | flat |
| G2 / (b^2 - b), integers, level = b | -0.122 +/- 0.073 | flat, 1.7 sigma |
| G2 / (b^2 - b), integers, level = nextprime(b) - 1 | +0.005 +/- 0.080 | flat |
| G2 / b^2 | -0.069 +/- 0.075 | flat |

**The three conventions do not agree on the sign.** That is the cleanest
statement of the result: the choice of how to write down the window moves the
answer by more than the answer.

**Equivalently in exponent form.** d ln G2 / d ln b = **1.931 +/- 0.075** on
b >= 11 and **1.797 +/- 0.064** on all eleven terms. On b >= 11 the reading is
*not distinguishable from exactly 2*, and exponent exactly 2 is TPC-equivalent
via the p^2 rule (`covering-dive.md` Q5.4).

**The control, computed here, not cited, and matched term for term.** The same
estimator on the one-class object g(x#) = A048670, whose conjectural exponent is
1, over the *identical eleven levels*, from the eleven g values this attack
computed itself:

| range | terms | d ln g / d ln b | truth | bias | ratio slope d ln(g/b^2)/d ln b |
|---|---|---|---|---|---|
| [5, 41] | 11 | **1.184 +/- 0.040** | 1.000 | +0.184 | **-0.816 +/- 0.040** |
| [11, 41] | 9 | 1.179 +/- 0.071 | 1.000 | +0.179 | **-0.821 +/- 0.071** |
| [5, 37] | 10 | 1.191 +/- 0.046 | 1.000 | +0.191 | -0.809 +/- 0.046 |

The [5,37] reading of **1.191** reproduces `h2-scoping.md` §6's control row
`10 [5,37] 1.191` to three decimals, independently. That is custody on the
estimator itself.

**This is the sharpest thing in the report, so read it slowly.**

> Over the *same nine levels*, with the *same estimator*, the one-class ratio
> falls at **-0.821 +/- 0.071**, an **11.6 sigma** detection, and the two-class
> ratio reads **-0.069 +/- 0.075**, a **0.9 sigma** non-detection. The
> instrument is not blunt at this ladder length: it resolves a falling ratio
> easily when there is one. The two readings are **7.3 sigma** apart, and that
> separation is a real measurement.

**And here is why it still does not settle the criterion.** The control also
shows the estimator understating the fall: the one-class truth is a ratio slope
of -1 and the estimator returns -0.82, a +0.18 finite-range bias. Apply the same
+0.18 to the two-class reading and it becomes **-0.25 +/- 0.075**, a 3.3 sigma
fall, exponent 1.75. Do not apply it and it is **-0.07 +/- 0.075**, flat,
exponent 1.93.

| reading | ratio slope | G2 exponent | verdict on the criterion |
|---|---|---|---|
| raw, b >= 11 | -0.069 +/- 0.075 | 1.931 | flat, indistinguishable from 2 |
| control-corrected, b >= 11 | -0.25 +/- 0.075 | 1.752 | falling, safely below 2 |
| raw, all eleven | -0.203 +/- 0.064 | 1.797 | falling |
| control-corrected, all eleven | -0.387 +/- 0.064 | 1.613 | falling |

The correction is legitimate **only if the two-class object has the one-class
object's polylog shape**, which is exactly the thing in question: if G2 is
x . polylog then the bias applies and the ratio falls; if G2 sits at an exponent
near 2 then the bias does not apply and the ratio is flat. The correction and
the conclusion are the same assumption. `h2-scoping.md` READING 5 has already
settled what breaking that circle would cost: on the only object where the
answer can be checked, 56 terms out to p = 271 still select the wrong model, by
the largest margin in its table.

> **The honest answer to the brief's question.** The computable range is long
> enough to establish that the two-class object behaves very differently from
> the one-class control — 7.3 sigma apart on the same reading — and **too short
> to place the two-class exponent relative to 2**, which is the only placement
> the criterion cares about. Raw, combined L keeps pace with the window. The
> only reading in which it falls behind is one that has already assumed the
> answer.

---

## 7. The TPC trap: this criterion is the target, not a step towards it

Tested early, as instructed, and it fires.

§5 shows combined L / W_slot = G2(b#)/(b^2 - b) + O(m_bar/b^2). So
"combined L / window -> 0" is exactly "G2(x#) / x^2 -> 0". Now:

1. G2(x#) < x^2 - x means every interval of length x^2 - x above x contains a
   T_x slot.
2. A T_x slot in (x, x^2) is a genuine twin prime pair, since both members are
   coprime to x# and below x^2 + 2.
3. So the criterion holding at any infinite family of x gives twin primes above
   every bound. **TPC.**

The v -> v^2 ladder needs the criterion only at the sparse set v, v^2, v^4, ...,
which changes nothing: trap 2 as stated covers any infinite family. The criterion
is therefore **not a lemma on the way to the Zone Postulate; it is the Zone
Postulate in slot coordinates.** Attack 1 as framed cannot produce a proof, and
the numerical part of it is a re-reading of the `G2(x#)/x^2` column that
`G2-STATE.md` §6 already reads.

What the attack *can* do, and did, is lengthen that column by one exact term
and price the instrument that reads it. Both are in this report.

**Trap 1, capacity counting, was not triggered.** Nothing in §1 to §6 reduces to
counting how many slots the block's primes can delete; the whole argument is
about *where* the deletions land relative to the T_v gap structure, which is the
information capacity counting throws away. The arithmetic, for the record: the
sum of 2/p over the primes of block 1 is
2/7 + 2/11 + 2/13 + 2/17 + 2/19 + 2/23 = **0.9313**, on its way to the constant
2 ln 2 = 1.3863, which does not depend on L or on v; against the 22,309,287 T_5
slots of one period that is 20.8 million deletions available. The brief's own
per-window form of the same check is 189 available against 19 needed. Either
way it is vacuous, and no step in this report uses it.

**The coordinator's mid-run correction, checked.** log(x#) = theta(x) ~ x, so
log(v^2 #) ~ v^2 and not 2v. **This report is untouched by it.** Every scale here
is either an integer count (b, b^2, b^2 - b, G2, Y2) or a slot count
(combined L, W_slot = W_int/m_bar). m_bar = v#/D_v is a ratio of a modulus to a
slot count, never a logarithm of a modulus. The only logarithm of a primorial
anywhere in the report is ln D_41 = 29.771 in §3's c2', which is the repo's own
coordinate for the Poisson law and is computed from the exact D_41, not from any
theta approximation. Grep over this attack's own nine scripts for a `2*v` or
`2*Math.log(v)` modulus conversion returns nothing; the calibration is that the
same grep run without the `v` restriction *does* hit the four intended
`Math.log(x)**2` sites, so a null result here is informative rather than a
pattern that never matches anything. (The first attempt at this grep was run
over the whole scratch directory and picked up three hits belonging to another
agent's scripts; it was rerun restricted to files this attack wrote.)

---

## 8. What to quote

| claim | grade | number |
|---|---|---|
| G2(41#) | **exact, new** | **546** |
| position of the maximal gap in 41# | exact | 3,784,200,788,231 |
| D_41 survivor check | exact | 8,499,244,879,125 |
| c2' at x = 41 | derived from the above | 0.5123 |
| cost of G2(41#) on 10 cores | measured | 2 min 31 s (repo price 5.6 h) |
| combined L(T_5 -> b), b = 7..41 | exact | 2, 3, 6, 10, 14, 19, 25, 34, 52, 54 |
| combined L / window in slot units, slope | measured, b >= 11 | **+0.05 +/- 0.11** |
| fluctuation band on that ratio | measured | 12.3% (1 sd), mean 0.356 |
| d ln G2 / d ln b, eleven exact terms | measured | 1.797 +/- 0.064 |
| same, b >= 11, nine terms | measured | 1.931 +/- 0.075 |
| control g(x#) = A048670, eleven matched terms | measured here | 1.184 +/- 0.040, truth 1 |
| g(41#) | **exact** | **74** (A048670 a(13)) |
| control ratio slope vs two-class ratio slope, b >= 11 | measured | -0.821 +/- 0.071 against -0.069 +/- 0.075 |
| natal artifact in slot units, v = 5 -> 23 at b = 37 | measured | L.m_bar/G2 falls 0.985 -> 0.531 |
| m_bar(v) ~ C ln^2 v | derived | C = e^{2gamma}/(2 C_2) = 2.4025 |

---

## 9. COVERAGE: what this did not reach

**Not reached.**
- The real ladder past rung 1. Rung 2 needs G2(619#) and there is no route to it.
  Everything in §4 past rung 1 is a surrogate indexed by b, and the surrogate is
  not the ladder: it varies the block's endpoint without varying the natal, which
  §5 shows is the axis that carries the artifact.
- G2(43#). It is 43x the 41# run, about 108 minutes by the same engine, and was
  not attempted because the eleventh term already demonstrated that terms do not
  move this question (0.004 on the exponent). Someone who wants the twelfth term
  can have it in two hours with `bitblock.c`; the code is in the scratch dir and
  would need copying into the repo before it can be trusted long-term.
- combined L at natal 7 for b = 37. Launched and still running when this was
  written, because natal 7's tile is 15 slots wide and the bit-parallel engine
  degenerates below one machine word. The natal curve in §5 therefore has six
  points (v = 5, 11, 13, 17, 19, 23) and not seven. The bracket at natal 7 is
  [35, 38]; the other five all landed at or near the low end of their brackets,
  so 35 is the likely value, and it is not used anywhere.
- Anything about how the natal artifact of §5 behaves at large L, which is the
  regime the real ladder lives in. Every measurement is at L <= 52.

**Suspected but not proved.**
- That the natal artifact of §5 dies as combined L grows. The six measured
  points are monotone in L and the mechanism is an averaging deficit, so it
  should, but they span only a 5x range in L and the curve could be approaching
  a positive constant deficit rather than zero. If it approaches a constant, the
  slot-unit criterion is *permanently* below G2/window by a factor and the two
  are not the same statement after all. This is the one place where §5's central
  claim could be wrong, and it is checkable: measure L.m_bar/G2 at natal
  5, 11, 13, 17, 19, 23 for b = 41 as well, and see whether the curve moves at
  fixed L or at fixed v.
- That the two exact rungs of the real ladder, 0.3333 and 0.3167, are drawn from
  the same distribution as the surrogate column. They are consistent with it
  (both inside one sd of the b >= 11 mean 0.356) but two points cannot establish
  that.

**Where this is likely wrong.**
- **The b >= 11 cut in §6 is a judgement call and the control does not support
  it.** A first draft of this section justified dropping b = 5 and b = 7 by
  claiming the control reads its steepest slope on the same two points. That was
  checked and it is FALSE: dropping them moves the control by **-0.005**
  (1.184 -> 1.179) and moves the two-class object by **+0.134**
  (1.797 -> 1.931). The small-b terms distort the two-class fit and do nothing
  to the control, so the outlier argument for removing them has no external
  support. Both readings therefore stand: all eleven terms give a ratio slope
  of -0.203 +/- 0.064, which is falling at 3.2 sigma, and b >= 11 gives
  -0.069 +/- 0.075, which is flat. **They disagree, and the disagreement is
  itself the strongest evidence in this report that the range is too short.**
  The headline "flat" is a b >= 11 verdict and anyone quoting it must say so.
- The claim in §3 that G2(41#) was not in the repo rests on a grep for
  8499244879125 and a reading of the one file carrying the 41# constant. The
  grep is calibrated (the 31# and 37# analogues return 17 and 9 files) but a
  value stored as `5.46e2`, or computed at runtime and never written down, would
  be missed.
- The 10-minute figure for the scalar 37# run in §2 is an interval bound from
  process observation, not a `time` measurement. It is the only cost figure in
  the report that is not measured directly, and it is the one that does not
  matter.
- `L / W_slot` is reported at natal 5 throughout §4 and §6, so the "combined L"
  column is a natal-5 quantity while the real ladder's rung-1 natal is 5 and
  rung-2's is 25. The ladder is therefore self-consistent only at its own first
  two rungs, and §5's artifact says the higher rungs would read *lower* for
  reasons that have nothing to do with the postulate. If anyone extends this
  table upward they must hold the natal fixed or the trend they see will be the
  artifact.
