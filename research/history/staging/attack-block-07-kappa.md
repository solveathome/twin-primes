# Attack block 7: the block version of kappa(m)

<!-- ledger
id: Q-block-kappa
status: CLOSED
todo: none
question: What does the block version of kappa(m) buy over the per-fold form?
verdict: Nothing: kappa_block(1) = 19 equals combined L at block 1 by construction, the minimal shift j*(m) equals kappa_block(m) at every m from 1 to 12 so there is zero slack in the block object, and the block form of Theorem C is empty, its vacuity coefficient 1.552 against a requirement of 1 at block 1 and growing like ln^2 v.
-->

*(2026-08-18. Block attack 7. Object: kappa_block(m) over a block v -> v^2,
the aggregated form of Theorem C of `research/a3-05-bound-L.md` section 8a.
Calibration marked on every claim: PROVEN, VERIFIED by exact computation,
MEASURED, REFUTED. Scripts in the attack's scratch directory, listed in section 7;
nothing in `research/` was edited.)*

## 0. Verdict first

**kappa_block(1) = 19 = combined L at block 1, and the two are equal by
construction, not by accident. The tightness that kappa buys per fold does not
survive aggregation: the minimal shift j*(m) equals kappa_block(m) at every m
from 1 to 12, so there is zero slack anywhere in the block object.**

**And the block form of Theorem C is not merely weak, it is EMPTY.** Aggregating
the alternation law over the six primes of the block excludes no kill count at
all, at any m, because the aggregation replaces a per-prime SUM by a per-prime
MAX and what remains is capacity counting. That is trap 1 of the brief, reached
by a different road. The vacuity coefficient at block 1 is 1.552 against a
requirement of 1, and it grows like m_bar(v) ~ ln^2 v, so it is worse at every
later block and permanently so. Worse still, it is dominated: plain counting of
T_v slots, using no residue law at all, is smaller by the exact factor
m_bar(v)/6 and does return a finite bound at block 1 (158, against the true 19).
**The alternation law adds nothing to a block.**

So a3-05's sentence "moving the target from L to kappa buys tightness and buys
nothing against the obstruction" transfers to the block with one word changed:
at the block it does not even buy tightness. This closes the kappa route at the
block level.

## 1. The definition

Fix v and the block v -> v^2. Let T_v be the twin slot tile mod v#, let
Q = {p prime : v < p <= v^2}, and let P = v# * prod(Q) = (v^2)# be the block
period. Composite folds in (v, v^2] are the identity (established, 136 composite
folds and 0 live deletions), so Q is the whole block.

A T_v slot r is **killed by the block** if r = 0 or -2 (mod p) for at least one
p in Q. The **survivors** are exactly the T_{v^2} slots. Read the T_v slots
cyclically around P and let

> r_t = the number of killed T_v slots strictly between survivor t and
> survivor t+1, for t = 1..D_{v^2} cyclically.

Then, for m >= 1,

> **kappa_block(m) = max_t ( r_t + r_{t+1} + ... + r_{t+m-1} ),**

the largest number of T_v slots the block kills inside a stretch that becomes m
consecutive new gaps of T_{v^2}.

Equivalently and identically: take m+1 consecutive survivors s_0 < ... < s_m and
count the killed T_v slots strictly between s_0 and s_m; kappa_block(m) is the
maximum over position. **kappa_block(1) = combined L**, since a stretch that
becomes one new gap is exactly a maximal run of consecutively killed slots.

The consequence that makes it the right object, PROVEN in one line, is the block
form of the A4 recursion. A stretch that becomes m new gaps spans exactly
m + K old gaps when it contains K kills, so

> **maxsum_m(T_{v^2}) <= maxsum_{m + kappa_block(m)}(T_v).**

VERIFIED at block 1 for all m from 1 to 12; see the table in section 3.

## 2. The degeneration check

**A block containing one prime must reproduce the per-fold kappa(m) of a3-05
section 8a.** The block code was run with Q = {p}, over the full period v#*p,
at six single-prime blocks. This is the correctness test, so it is reported
before any new number.

| fold p over T_v | kappa_block(m), m = 1..8 | a3-05 reading 9 | agree |
|---|---|---|---|
| 7 over T_5 | 2 2 4 4 5 5 6 6 | 2 2 2 1 0 0 0 0 | m >= 3 differ |
| 11 over T_7 | 1 2 2 2 3 4 4 4 | 1 2 2 2 3 4 4 4 | all 8 |
| 13 over T_11 | 2 2 2 2 3 3 3 4 | 2 2 2 2 3 3 3 4 | all 8 |
| 17 over T_13 | 2 2 2 3 3 3 3 4 | 2 2 2 3 3 3 3 4 | all 8 |
| 19 over T_17 | 2 2 3 3 3 3 3 4 | 2 2 3 3 3 3 3 4 | all 8 |
| 23 over T_19 | 3 4 4 4 5 5 5 5 | 3 4 4 4 5 5 5 5 | all 8 |

**Five of six folds agree in all eight entries, and kappa_block(1) reproduces the
published L diagonal 2, 1, 2, 2, 2, 3 at folds 7 through 23 exactly.** The
degeneration is therefore established.

**The sixth is a defect in a3-05's reading 9, not in the definition, and it is
visible without any computation: the published fold-7 row DECREASES in m.**
kappa(m) is a maximum of window sums over a fixed window family that grows with
m, so it is nondecreasing in m by definition; 2, 2, 2, 1, 0, 0, 0, 0 cannot be a
kappa profile. The cause is that T_5 carries three slots, `kappaProfile` extends
it by EXT = min(N, 64) = 3, and its window loop is guarded by `t >= m - 1`, so
for m larger than the number of runs seen it never fires and the entry stays 0.
Over the true period 210 there are 21 T_5 slots, 15 survivors and 6 kills, so
kappa is capped at 6 and reaches it at m = 7, which is what the block code
returns.

**The same short-tile fault corrupts a3-05's maxsum table, and therefore its
Theorem C row at fold 7.** Reading 5 prints maxsum_m(T_5) = 12, 24, 30, 42, 48,
0, 0, 0. The truth, from the exact 6, 12, 12 gap word, is
12, 24, 30, 42, **54, 60, 72, 84**. Recomputing Theorem C at fold 7 with the
correct maxsums gives 2, 2, 4, 4, 5, 6, 6, 8 against the published
2, 2, 3, 3, 2, 1, 1, 1, and the corrected bound holds over the corrected truth
at every m, tightly at five of eight.

**Scope of the defect, checked rather than assumed.** Only the T_5 row is
affected: T_7 already carries 15 slots and its published maxsums are correct.
**Theorem B is unaffected at fold 7**, because it only ever compares maxsum_1 = 12
against c_min(1) = 12 and maxsum_2 = 24 against c_min(2) = 42, both below the
corruption. The L diagonal is unaffected. So this is a reading-9 and reading-5
presentation error at one fold, not a load-bearing one, and it is reported here
because the degeneration check is what found it.

## 3. Block 1, measured

v = 5 -> 25. Full period 23# = 223,092,870. T_5 slots at 11, 17, 29 mod 30.
Folds at 7, 11, 13, 17, 19, 23. Exact, no sampling.

Ground truth reproduced, all four:

| quantity | measured | expected |
|---|---|---|
| T_5 slots in the period | 22,309,287 | 22,309,287 |
| survivors | 7,952,175 | D_23 = 7,952,175 |
| G2(23#) | 204 | 204 |
| maxsum_20(T_5) | 204 | 204 |

killed = 14,357,112, so the mean kills per new gap is 1.8054 and
maxsum_19(T_5) = 192 < 204 <= 204 = maxsum_20(T_5).

**The table.** j*(m) is the minimal shift, j*(m) = min{ j : maxsum_{m+j}(T_5) >=
maxsum_m(T_23) }, which is the quantity the recursion actually consumes;
kappa_block(m) is an upper bound for it.

| m | kappa_block(m) | m*L | kappa_block/(m*L) | maxsum_m(T_23) | j*(m) | maxsum_{m+kappa}(T_5) | recursion holds |
|---|---|---|---|---|---|---|---|
| 1 | **19** | 19 | 1.000 | 204 | **19** | 204 | OK |
| 2 | 21 | 38 | 0.553 | 234 | 21 | 234 | OK |
| 3 | 27 | 57 | 0.474 | 300 | 27 | 300 | OK |
| 4 | 31 | 76 | 0.408 | 348 | 31 | 354 | OK |
| 5 | 34 | 95 | 0.358 | 390 | 34 | 390 | OK |
| 6 | 40 | 114 | 0.351 | 462 | 40 | 462 | OK |
| 7 | 43 | 133 | 0.323 | 498 | 43 | 504 | OK |
| 8 | 45 | 152 | 0.296 | 528 | 45 | 534 | OK |
| 9 | 45 | 171 | 0.263 | 540 | 45 | 540 | OK |
| 10 | 47 | 190 | 0.247 | 570 | 47 | 570 | OK |
| 11 | 47 | 209 | 0.225 | 582 | 47 | 582 | OK |
| 12 | 49 | 228 | 0.215 | 612 | 49 | 612 | OK |

Increments of kappa_block: 2, 6, 4, 3, 6, 3, 2, 0, 2, 0, 2. A least squares fit
over m = 1..12 gives kappa_block(m) = 18.9 + 2.83m, and the cleaner reading is
**kappa_block(m) = 19 + 2.73(m-1) to within 2 over the measured range**: the
first new gap costs 19 kills and every further new gap costs about 2.73, which
is 1.51 times the mean 1.8054.

## 4. Is kappa_block tighter than combined L?

Two readings of the question, and they answer differently.

**Against m*L, yes, and the margin grows.** m*L - kappa_block(m) reads
0, 17, 30, 45, 61, 74, 90, 107, 126, 143, 162, 179 and the ratio falls
monotonically from 1.000 to 0.215 over m = 1..12. Aggregating over m is worth a
lot: paying L per new gap overstates the cost by a factor approaching 7 at
m = 12. This is the same qualitative gain the per-fold kappa profiles show, and
it is much larger here because L itself is large.

**Against combined L at the point that matters, m = 1, no, and this is the
finding.** kappa_block(1) = combined L identically, by the definition, exactly as
kappa(1) = L per fold. The substantive question is whether the object the
recursion consumes, j*, sits strictly below it, which is what A4 found per fold.
It does not. **j*(m) = kappa_block(m) at every one of the twelve measured m.**

For contrast, the per-fold picture computed the same way from a3-05's maxsum
table: j*(1) against L reads 2 vs 2, 1 vs 1, 1 vs 2, 2 vs 2, 1 vs 2, 2 vs 3,
2 vs 2, 2 vs 4 at folds 7, 11, 13, 17, 19, 23, 29, 31, so j* is strictly below L at
four of eight folds and by as much as 2 at fold 31. That slack is what motivated
A4's redirection. At block 1 the slack is zero at every m.

**Why, and it is not luck.** Two conditions must both hold for j* = kappa. First
the window realising maxsum_m(T_{v^2}) must also be a window of maximal kill
count, which at block 1 it is: the record new gap 204 spans 20 T_5 gaps and
therefore contains exactly 19 kills, the maximum. Second the granularity of
maxsum_k(T_v) must be fine enough that the previous step falls short, and at
block 1 maxsum_k(T_5) advances by 6 or 12 per step against a target of 204, a
resolution of 3 to 6 percent, where the per-fold ladder advances by about
m_bar(T_old) = 20 to 30 against targets of 100 to 350, a resolution of 10 to 25
percent. **The per-fold slack is a rounding artefact of a coarse ladder, and
aggregation removes it.** That is a discouraging finding rather than an
encouraging one: it means the block bound is attained, so there is nothing left
to win by sharpening the target, and the relation
maxsum_m(T_23) <= maxsum_{m + kappa_block(m)}(T_5) is a re-description of the
truth rather than an inequality with room in it.

## 5. Does Theorem C's mechanism survive aggregation?

**The lemma survives per prime. The theorem does not survive the sum. Committed
answer: NO.**

### 5a. What survives, VERIFIED

Theorem C works because the alternation lemma never uses adjacency: if one 2-set
deletes slots j_1 < ... < j_k anywhere, the separations between consecutive
deleted slots are all 0, +2 or -2 mod p and the two-state walk governs them, so
the span is at least c_min(k-1).

That argument is per prime and it is untouched by having other primes present.
Other primes delete other slots; they do not change which residues mod p the
p-killed slots occupy. So inside any stretch, for every p in Q,

> span of p's own kills >= c_min(k_p - 1), where k_p = the number of slots p kills
> in the stretch. PROVEN, unchanged from a3-05 section 8a.

VERIFIED inside the block, and attained. The extremal stretches at block 1
decompose as follows, with each prime's own first-to-last-kill span against its
own floor:

| m | K | kills by 7, 11, 13, 17, 19, 23 | sum | stretch span | binding prime |
|---|---|---|---|---|---|
| 1 | 19 | 6, 4, 3, 3, 3, 3 | 22 | 198 | 23: span 138 = c_min(2) = 138, EQUALITY |
| 2 | 21 | 6, 4, 4, 3, 3, 4 | 24 | 234 | 23: span 186 = c_min(3) = 186, EQUALITY |
| 4 | 31 | 12, 6, 6, 5, 4, 5 | 38 | 348 | 23: span 276 = c_min(4) = 276, EQUALITY |
| 8 | 45 | 17, 10, 9, 7, 6, 6 | 55 | 528 | 23: span 366 vs c_min(5) = 324 |

Every per-prime floor is respected in all 24 cells, and at three of the four
stretches the largest prime attains its floor exactly. **So the alternation law
is live and sharp inside the block**, exactly as a3-05 section 4 found per fold.
The sum column exceeds K because slots with two killers are counted twice: 22
against 19 distinct at m = 1, an overlap factor of 1.16, so 3 of the 19 killed
slots carry two killers.

### 5b. What breaks

The per-fold Theorem C converts "span >= c_min(k-1)" into a bound on k because
there is one prime and therefore one constraint on one unknown. With |Q| primes
the constraints are

> span >= c_min(k_p - 1) for every p, and sum_p k_p >= K,

and the adversary chooses the allocation. The binding statement is therefore
**a maximum over p, not a sum over p**, and the adversary defeats it by spreading:
inverting each constraint gives k_p <= span/(3p) + 1, so

> **K <= span * sum_{p in Q} 1/(3p) + |Q|.**

**That is capacity counting.** It is the same shape as trap 1, with the naive
2/p per prime replaced by 1/(3p), so the entire content of Theorem A and the
alternation law, aggregated over a block, is a factor 6 improvement on the
brief's integer-unit capacity count and nothing else. The brief's number at
block 1 is 189 available against 19 needed, a factor 10 short; a factor 6
improvement leaves 31.5, plus |Q| = 6, so 37.7 against 19 needed, still short by
a factor of 2. Section 5e shows that this comparison flatters the alternation
law, and that against the correct capacity count it is not an improvement at
all.

### 5c. It is empty, not weak

Worse than short: the bound has no fixed point, so it excludes nothing. Feeding
span <= maxsum_{m+K}(T_v) back in, with maxsum_k(T_5) = 10.2k at the record and
10k on average,

> K <= 1.552 * (m + K) + 6,

whose coefficient on K exceeds 1, so it holds for every K. Solved exactly as an
integer allocation rather than through the linear approximation, with
S = maxsum_{m+K-2}(T_5) and kmax_p(S) = max{k : c_min(k-1) <= S}:

| K | S = maxsum_{1+K-2}(T_5) | kmax at 7, 11, 13, 17, 19, 23 | capacity | excludes K? |
|---|---|---|---|---|
| 5 | 42 | 3, 2, 2, 2, 2, 1 | 12 | no |
| 10 | 90 | 5, 4, 3, 2, 2, 2 | 18 | no |
| **19** | 180 | 10, 6, 6, 4, 4, 3 | **33** | no |
| 30 | 294 | 15, 10, 8, 6, 6, 5 | 50 | no |
| 60 | 594 | 29, 19, 16, 12, 11, 9 | 96 | no |
| 200 | 1992 | 96, 61, 52, 40, 36, 30 | 315 | no |
| 1000 | 9990 | 476, 304, 257, 196, 176, 146 | 1555 | no |

The capacity/K ratio starts at 2.4 and settles at 1.552, never crossing 1. Same
at m = 8. **The block form of Theorem C returns no finite bound on kappa_block(m)
at block 1, for any m.**

**CALIBRATION of that null, since a null result proves nothing until the test is
shown able to fire.** The identical exclusion routine, run with Q = {p} a single
prime, reproduces a3-05's published Theorem C row exactly at folds 11, 13, 17,
19, 23 and 29, all eight entries each, and at fold 7 reproduces the corrected row
of section 2. It returns finite bounds there because the single-fold coefficient
is m_bar(T_old)/(3p), which reads 0.476, 0.424, 0.439, 0.397, 0.402, 0.371,
0.323 at folds 7 to 29, all below 1. **The routine fires when it should, so the
"no exclusion" verdict at block 1 is a finding.**

### 5d. Why it can never be repaired, and where the crossover is

The single-fold Theorem C terminates iff m_bar(v)/(3p) < 1. The block replaces
the one prime by all of Q, so the block Theorem C terminates iff

> **C(v) = m_bar(v) * sum_{v < p <= v^2} 1/(3p) < 1.**

Mertens gives sum_{v<p<=v^2} 1/p -> ln 2 = 0.693147, a constant, so
C(v) -> 0.2310 * m_bar(v), and m_bar(v) = 6*prod_{5<=q<=v} q/(q-2) increases
without bound, of order ln^2 v. Measured:

| v | primes in block | m_bar(v) | sum 1/(3p) | C(v) |
|---|---|---|---|---|
| 5 | 6 | 10.000 | 0.15521 | **1.552** |
| 7 | 11 | 14.000 | 0.16182 | 2.265 |
| 11 | 25 | 17.111 | 0.19423 | 3.324 |
| 23 | 90 | 28.054 | 0.20185 | 5.663 |
| 37 | 207 | 34.051 | 0.21636 | 7.367 |
| 101 | 1226 | 53.278 | 0.22421 | 11.945 |
| 1009 | 79661 | 115.752 | 0.22986 | 26.607 |

**C(v) > 1 already at block 1, and it rises monotonically over every block we can
evaluate.** So the block Theorem C is vacuous at the first block and more vacuous
at every later one. It never had a good regime and it never will.

The requirement is quantitative and it says exactly what a repair would have to
supply. For C(v) < 1 the per-kill floor would have to be at least
0.693 * m_bar(v) * p in place of 3p, that is, it must grow like p * ln^2 v rather
than being a constant multiple of p. **The alternation law gives exactly 3p and
cannot give more, because 3p is attained with equality**, per fold at all seven
folds with L >= 2 (a3-05 section 4) and, as section 5a shows, inside the block as
well at p = 23 in three of four extremal stretches. The residue side is
exhausted at 3p, and 3p is a factor ln^2 v below what aggregation needs.

### 5e. The alternation law is not merely insufficient, it is dominated

There is a second per-prime cap that uses no residue law at all. A stretch with
K kills and m new gaps holds n = m + K + 1 T_v slots, and the number of those
that lie in {0, -2} mod p is bounded by the exact maximum over windows of n
consecutive T_v slots, which is computable from the 3p-slot cycle of T_5 modulo
p. Call it maxKill(p, n). Both caps are valid, so the truth obeys the smaller.

| n = m+K+1 | S = maxsum_{m+K}(T_5) | (a) alternation, sum S/(3p)+1 | (b) slot count, sum maxKill(p,n) | ratio a/b |
|---|---|---|---|---|
| 21 | 204 | 37.66 | **25** | 1.507 |
| 31 | 312 | 52.56 | 35 | 1.502 |
| 61 | 612 | 99.12 | 61 | 1.625 |
| 101 | 1014 | 161.52 | 100 | 1.615 |
| 1001 | 10014 | 1558.39 | 940 | 1.658 |

**Cap (b) is smaller at every n, and the ratio converges to exactly
m_bar(v)/6 = 1.6667.** The reason is arithmetic and not statistical: the
alternation cap is denominated in LENGTH and converts to slots at 6 units per
slot, because T_v slots are 5 mod 6; the slot cap is denominated in slots
directly and converts at m_bar(v) = 10 units per slot. Every factor of
m_bar(v)/6 that separates "5 mod 6" from "actually a T_v slot" is thrown away by
any bound that reasons about span. So **the aggregated alternation law is
strictly weaker than plain slot counting, by the exact factor m_bar(v)/6, which
is 1.667 at block 1 and grows like ln^2 v.**

This also corrects the brief's capacity figure at the point where it matters.
189 is 2 * 204/p summed, an INTEGER count over the record span; the same count in
T_5 slots is 2 * 21/p summed = 19.56, against the true 19. **Capacity counting in
the right units is not vacuous at block 1, it is nearly exact.** Its slope in n
is 2 * sum_{v<p<=v^2} 1/p, which reads 0.9312 at v = 5 and rises to
2 ln 2 = 1.3863, so it has a fixed point at block 1 and loses it later: solved
exactly, cap (b) gives kappa_block(1) <= 158 and kappa_block(8) <= 238 at block
1, finite but a factor 8 and 5 above the true 19 and 45.

So the three-way ordering at block 1 is: aggregated Theorem C gives **no bound**,
exact slot counting gives **158**, the truth is **19**. The alternation law
contributes nothing to the block, and the object that does contribute is the one
trap 1 already names.

*(Custody note. The slope 2 * sum 1/p and the factor m_bar/6 are also the
conclusion of the independent block attack 3, whose verdict paragraph was read
here before this subsection was computed. Everything in the table above was then
recomputed from scratch by this attack's own code, and the ratio column, which
converges to 1.6667 without that value being put in, is the check. So this is a
confirmation of attack 3 by a different route rather than an independent
discovery of it, and it is recorded that way.)*

## 6. What this closes

a3-05 section 8a says of Theorem C that "redirecting the attack from L to kappa
buys tightness and a better fit to the recursion. It does not touch hypothesis
H''." At the block level the sentence becomes stronger and simpler:

> **The block redirection from combined L to kappa_block buys nothing at all.
> It does not buy tightness, because j* = kappa_block at every measured m. And
> its bound does not merely inherit the wall, it evaporates before reaching it,
> because aggregating a per-prime constraint over a block turns a max into a sum
> and lands on capacity counting, which is vacuous by a factor 1.552 at block 1
> and by ln^2 v asymptotically, and which is in any case denominated in the
> wrong units and so sits a further factor m_bar(v)/6 above the counting bound
> it was supposed to beat.**

The kappa route is therefore closed at the block level, and closed for a reason
that is structural rather than quantitative: there is no allocation of the
alternation law over many killers that survives, because the constraint is a
maximum over primes and the adversary has v^2/(2 ln v) primes to spread across
while needing only about G2/m_bar kills.

**Trap 2 was tested and is not triggered.** Nothing above asserts that any window
(u, u^2) contains a twin prime, and no statement here is an existence claim about
primes; the results are a definition, an exact census over one period, and a
vacuity proof about a counting bound. The block object kappa_block is a statement
about the tile, not about the primes in the zone.

## 7. Reproduction

Three scripts, in the attack's scratch directory
`.../43d455bc-.../scratchpad/`, not in `research/`:

```
node --max-old-space-size=6144 kblock.js    # 3.1 s: degeneration, block 1 table, composition
node kblock2.js                             # <1 s: exact aggregated Theorem C, C(v) ladder
node --max-old-space-size=6144 kblock3.js   # 5.8 s: calibration against a3-05 reading 9
node kblock4.js ; node k5.js                # <1 s: alternation cap vs exact slot cap
```

`kblock.js` streams the 22,309,287 T_5 slots of one 23# period, storing a
one-byte killer bitmask per slot, then derives runs, survivor gaps, kappa_block,
j* and the composition of the extremal stretches in one pass over the mask. Its
tile builder is independent of `research/Lgrowth.js`, so the reproduction of
D_23 = 7,952,175, G2 = 204 and the L diagonal 2, 1, 2, 2, 2, 3 is a genuine
cross-check rather than a shared routine.

## 8. COVERAGE: what this did not reach

**Only block 1 is measured.** Every kappa_block number above is v = 5 -> 25.
Block 2 is v = 23 -> 529, period 529#, and it is not computable here: T_23 has
7,952,175 slots but the block has 90 primes and the period is astronomically
beyond a full pass. So "the margin grows with m" and "j* = kappa_block" are
one-block measurements. The vacuity argument of section 5 is not; it is an
inequality plus Mertens and it holds at every v.

**j* = kappa_block is measured, not proven.** Section 4 gives a mechanism for it
(the record gap is also a record kill window, plus fine granularity) but the
first half of that is an empirical coincidence at block 1 and could fail at
block 2. If it does fail, kappa_block would regain some slack over j*, and
section 4's discouraging reading would soften. I do not expect it: the
granularity argument alone forces j* to within one of kappa whenever
m_bar(v) is small against maxsum_m(T_{v^2}), and that ratio improves with v.

**The multiply-killed slots are not exploited.** Section 5a measures 22 killer
incidences against 19 distinct kills, so sum_p k_p exceeds K by about 14 percent
at block 1. That overlap makes the capacity constraint sum_p k_p <= capacity
slightly stronger than K <= capacity, and I did not chase it. It cannot rescue
anything: the deficit is a factor 1.552 and rising, and overlap is worth 1.16 at
block 1 and falls as the primes get larger and their kill sets sparser. Recording
it because it is the one term I dropped.

**I did not attempt the correlated version.** The bound of section 5b treats the
per-prime constraints as independent and takes the worst allocation. A real
allocation must also be realisable by CRT, and the two-class lower bound result
(`research/two-class-lower-bounds.md` section 1) says every adversarial choice
does occur somewhere in the tile, which is why I did not expect a gain there and
did not test it. **This is the place I am most likely to be wrong**: the CRT
argument makes each prime's choice free, but it does not obviously make the
joint allocation free at a single position, and a joint obstruction is the only
door left in this direction. I did not find one and I did not prove there is
none.

**I did not push the surviving object, cap (b) of section 5e.** Its exclusion set
is not monotone in K: the smallest excluded K at block 1, m = 1, is 121, but some
larger K are not excluded, so the honest bound is the largest non-excluded value,
158 up to K = 20,000. That non-monotonicity comes from the exact maxKill counts
jumping in steps, and I did not smooth it or chase where it settles. Block
attack 3 owns that object and has taken it further.

**I did not re-derive combined L = 19 by a second method.** It is reproduced
here from an independent tile builder and agrees with the brief, and G2 = 204,
D_23 = 7,952,175 and maxsum_20 = 204 all reproduce, so the four ground-truth
anchors agree. That is agreement of two computations, not a proof.

**The a3-05 defect found in section 2 is reported, not fixed.** Per the brief no
existing repo file was edited. Reading 5's T_5 maxsum row and reading 9's fold-7
kappa and Theorem C rows need the corrections stated there. Theorem B, the L
diagonal, and every load-bearing claim in that file are unaffected, which I
checked rather than assumed.
