# Attack 3: is there a block-level alternation law?

<!-- ledger
id: Q-block-alternation
status: CLOSED
todo: none
question: Is there a block-level alternation law?
verdict: No: a block-level inequality exists and is a real theorem, but it is not an alternation law - over a block the alternation law is strictly weaker than plain slot counting by the exact factor mbar(T_v)/6, at least 10/6 and growing like ln^2 v, and the resulting Block Partition Inequality closes only at v = 5 and v = 7 and is vacuous from v = 11 because 2*Sum_{v<p<=v^2} 1/p rises to 2 ln 2 = 1.3863.
-->

*(2026-08-18. Object and rules from the block brief. Every number below was
recomputed here from scratch; nothing is quoted from another document without
being rederived. Calibration is marked on every claim: PROVEN, VERIFIED by exact
computation, MEASURED, REFUTED.)*

## Verdict

**A block-level inequality exists and it is a real theorem. It is not an
alternation law.**

Over a block, the alternation law of `research/a3-05-bound-L.md` section 2 is
strictly weaker than plain slot counting, by the exact factor `mbar(T_v)/6`, and
that factor is at least 10/6 and grows like `ln^2 v`. The strongest per-prime
statement is the exact two-class count `K_p`, which subsumes both. The resulting
Block Partition Inequality closes at v = 5 and v = 7 and is vacuous from v = 11
onward, because its slope is `2 * sum_{v<p<=v^2} 1/p`, which rises to
`2 ln 2 = 1.3863`.

**The number that decides it: `2 * sum_{v<p<=v^2} 1/p`, against 1.**
It reads 0.9312 at v = 5, 0.9709 at v = 7, and 1.1654 at v = 11.

The attack does collapse into trap 1, as the adjudicator predicted. It does not
collapse the way the adjudicator predicted, and the quoted margin was wrong in
both directions, which is the useful part of this report:

- The predicted death mechanism, "the primes above the span each cover up to 2
  slots for free and there are pi(v^2) of them", **does not occur at any v**.
  No block prime is ever above the span. PROVEN below, VERIFIED to v = 1009.
- "Capacity available 189 against 19 needed, vacuous by 10x" is a **unit
  mismatch**. The 189 counts integers; the 19 counts T_5 slots. Converted to
  slots the capacity is 17.69 on the mean and 23 at the sharp maximum, against
  19 needed. Capacity at block 1 is not vacuous by 10x, it is **binding to
  within 21 percent**, and it yields a genuine finite bound, L <= 62.

## 1. The object, rebuilt and checked (VERIFIED)

T_5 is the residues 11, 17, 29 mod 30; gap word 6, 12, 12; mbar = 10.
Block 1 folds every odd u in (5, 25], of which only 7, 11, 13, 17, 19, 23 delete
anything. Marking every T_5 slot in [0, 23#) dead when s = 0 or -2 mod p for some
block prime:

| quantity | value | check |
|---|---|---|
| T_5 slots in 23# | 22,309,287 | |
| survivors | 7,952,175 | equals D_23 exactly |
| combined L | **19** | matches the brief |
| extremal run first slot | 33,638,417 | phase: first gap is 12 |
| **span X of the run** | **180** | 18 gaps, and 18 = 0 mod 3, so 180 at every phase |

The span is phase independent, which removes the one free parameter the rest of
the argument would otherwise carry.

The per-prime kill profile of that run, and its separations:

| p | k_p | positions (offset from run start) | separations | sum of adjacent pairs |
|---|---|---|---|---|
| 7 | 6 | 60, 90, 102, 132, 144, 174 | 30, 12, 30, 12, 30 | 42, 42, 42, 42 |
| 11 | 4 | 12, 54, 120, 144 | 42, 66, 24 | 108, 90 |
| 13 | 3 | 30, 84, 162 | 54, 78 | 132 |
| 17 | 3 | 42, 144, 180 | 102, 36 | 138 |
| 19 | 3 | 0, 114, 150 | 114, 36 | 150 |
| 23 | 3 | 24, 72, 162 | 48, 90 | 138 |

Two facts worth recording. **Sum of k_p is 22 against L = 19**, so the block
covering is nearly a partition; the total over-coverage is 3. And **Theorem A is
attained on the block**, not merely valid: p = 7 pairs to exactly 6p = 42 four
times over, and p = 23 pairs to exactly 6p = 138. The residue side is again used
to the last unit, exactly as section 4 of a3-05 found at single folds.

## 2. What the partition constraint forces, stated precisely

Fix a run of L cyclically consecutive T_v slots, all deleted by the block, with
offsets d_0 = 0 < d_1 < ... < d_{L-1} = X from the run's first slot. Let k_p be
the number of run slots deleted by p. Every slot has at least one killer, so

> **sum over p in (v, v^2] of k_p >= L.**  (the partition constraint)

Three upper bounds on k_p are available, in increasing strength.

**(a) The alternation bound.** The k_p slots killed by p lie in one set
{a, a-2} mod p and are all congruent to 5 mod 6, so their consecutive
separations obey Lemma 1 and Lemma 2 of a3-05 verbatim. Adjacency was never used
in those lemmas, which is the same observation that gives Theorem C. Hence
Theorem A applies to the separations and

> **k_p <= 1 + m*_p(X)**, where m*_p(X) = max{m : c_min^{(p)}(m) <= X} and
> c_min^{(p)}(m) = 3pm for m even, 3pm - p - 2*eta for m odd.

Since c_min(m) >= 3pm - p - 2 this is k_p <= 1 + (X + p + 2)/(3p), so about
1 + X/(3p). PROVEN, given a3-05 sections 2 to 4.

**(b) The free-slot lemma.** If 2p - 2*eta > X then k_p <= 1, because two run
slots in one 2-set are separated by a positive multiple of 6 lying in classes
0 or +-2 mod p, and the least such is 2p - 2*eta by Lemma 2. This is the one
place where the alternation law says something counting cannot: it halves the
naive "2 free slots per large prime" to 1. PROVEN. It never fires; see section 5.

**(c) The exact two-class count.** Since s_i = s_0 + d_i, the kill condition
s_i = 0 or -2 mod p reads d_i = a or a-2 mod p with a = -s_0, so

> **k_p <= K_p(L, f) := max over a of #{i < L : d_i = a or a-2 (mod p)}**,

a computable function of the run length L and the phase f alone, independent of
where the run sits. K_p is exact: it is the true maximum, so it dominates (a)
and (b) automatically. PROVEN.

Combining (c) with the partition constraint gives the only theorem this attack
produces:

> **Theorem D (Block Partition Inequality, PROVEN).** If a run of L cyclically
> consecutive T_v slots at phase f is entirely deleted by the block (v, v^2],
> then
>
>   L <= sum over p in (v, v^2] of K_p(L, f).
>
> Since any run of length L contains runs of every shorter length, the combined
> L of the block satisfies
>
>   **combined L <= L0 - 1, where L0 = min{ l : max over f of sum_p K_p(l, f) < l }.**

The alternation form of the same theorem, which is all that is available when
the gap word of T_v is not in hand, replaces K_p by 1 + m*_p(X) with
X = maxsum_{L-1}(T_v).

## 3. Evaluated at block 1, against the truth and against capacity

All five columns are per-prime caps on k_p for the measured run, L = 19,
X = 180. VERIFIED by exact computation.

| p | true k_p | K_p exact | 1 + m*_p(180), alternation | mean 2L/p | integer capacity 2X/p |
|---|---|---|---|---|---|
| 7 | 6 | 6 | 10 | 5.43 | 51.4 |
| 11 | 4 | 4 | 6 | 3.45 | 32.7 |
| 13 | 3 | 4 | 6 | 2.92 | 27.7 |
| 17 | 3 | 3 | 4 | 2.24 | 21.2 |
| 19 | 3 | 3 | 4 | 2.00 | 18.9 |
| 23 | 3 | 3 | 3 | 1.65 | 15.7 |
| **sum** | **22** | **23** | **33** | **17.69** | **167.6** |

Read against L = 19:

- **The exact cap is attained at five of six primes.** Sum of K_p is 23 against
  a true sum of 22 and a need of 19. The counting side of the block problem is
  as tight as the residue side is at a single fold.
- **The alternation cap is 33, which is 43 percent worse than counting**, and it
  loses at every prime except p = 23 where it ties. Over a block, the alternation
  law is not an improvement on counting. It is a degradation of it.
- **The 189 is reproduced as an integer count, not a slot count.**
  `2 * G2(23#) * sum_p 1/p = 2 * 204 * 0.465623 = 189.97`, and the floor of that
  is 189. The span version, 2X/p summed, is 167.6. Both count integers in the
  two classes. Only one integer in ten is a T_5 slot, and 189.97/10 = 19.0
  against the mean slot capacity 17.69. That factor of 10 is mbar(T_5), and it is
  the whole of the "vacuous by 10x".

GREP CALIBRATION, per the rules: 189 does not appear anywhere in `research/` or
`paper/` in a capacity context. The pattern was calibrated on a known positive,
`grep "204" research/history/staging/` returns the G2 sequence in applied-Q.md.
So the 189 is the adjudicator's own arithmetic, made today, and the
reconstruction above matches it to the unit but is a reconstruction.

## 4. Why it dies: two slopes, one of them fatal

Both forms of Theorem D are linear in L with a slope, and both are useless the
moment the slope reaches 1.

**Counting form.** K_p is 2L/p on the mean, so

> slope_count(v) = 2 * sum_{v < p <= v^2} 1/p, limit 2 ln 2 = 1.386294.

**Alternation form.** 1 + m*_p is 1 + X/(3p) with X = mbar * (L-1), so

> slope_alt(v) = mbar(T_v) * sum_{v < p <= v^2} 1/p / 3,

and therefore, exactly,

> **slope_alt / slope_count = mbar(T_v) / 6.**

That ratio is 10/6 at v = 5, 14/6 at v = 7, 20.2/6 at v = 13, and it grows like
`ln^2 v` forever. The alternation law prices a killed slot at 3p of span; plain
counting prices it at mbar/2 slots, that is 6p/mbar of the same span per unit
of 2/p. The two agree at mbar = 6 and mbar is never below 10. **This is the
clean reason attack 3 has nothing to add: Theorem A wins at a single fold
because there the run is every slot and counting says nothing, and it loses over
a block because there the run is a sparse subset and counting says everything.**

The crossover, VERIFIED:

| v | 2 * sum_{v<p<=v^2} 1/p | block primes | slope_alt | bound closes? |
|---|---|---|---|---|
| 5 | **0.931245** | 6 | 1.5521 | yes, counting only |
| 7 | **0.970912** | 11 | 2.2655 | yes, counting only |
| 11 | 1.165394 | 25 | 3.3235 | **no** |
| 13 | 1.135203 | 33 | 3.8261 | no |
| 23 | 1.211075 | 90 | | no |
| 97 | 1.346856 | 1138 | | no |
| 1009 | 1.376514 | 78329 | | no |

Limit 2 ln 2 = 1.386294. The sum is not monotone (13 dips below 11) but it never
returns below 1 after v = 7: it exceeds 1 at v = 11 and every larger v tested to
1009, and its liminf is 2 ln 2.

**The alternation form is supercritical at every v including v = 5.** It never
produces a finite bound on L at any block, ever. That is the direct answer to
the question asked.

## 5. The free-slot term does not exist (REFUTES the predicted mechanism)

The adjudicator's estimate was that the attack dies because primes above the
span cover 2 slots for free and there are pi(v^2) of them. **No block prime is
ever above the span.**

By the free-slot lemma, p contributes a free slot only when 2p - 2 > X. The
trivial construction "one prime per slot" gives combined L >= pi(v^2) - pi(v)
(set a_p = s_i for distinct primes), hence X >= mbar(T_v) * (pi(v^2) - pi(v) - 1).
Comparing against the largest possible 2p - 2 = 2v^2 - 2:

| v | mbar(T_v) | pi(v^2)-pi(v) | X at least | 2v^2 - 2 | free-slot primes |
|---|---|---|---|---|---|
| 5 | 10.000 | 6 | 50 | 48 | none |
| 7 | 14.000 | 11 | 140 | 96 | none |
| 11 | 17.111 | 25 | 411 | 240 | none |
| 23 | 28.054 | 90 | 2497 | 1056 | none |
| 101 | 53.278 | 1226 | 65266 | 20400 | none |
| 1009 | 115.752 | 79661 | 9220807 | 2036160 | none |

The margin is `mbar * pi(v^2) / (2v^2)`, about `C ln v / 4`, and it widens. At
block 1 directly: the largest 2p - 2*eta in the block is 48, against X = 180.
VERIFIED at every v listed; PROVEN for all v >= 5 by the displayed inequality
plus the growth of mbar.

So the free capacity in the block is not 2 per prime. It is the fluctuation of
K_p above its mean 2L/p, MEASURED at 0.9 per prime at v = 5 and 1.9 per prime at
v = 7. The death is entirely the slope, not the intercept.

## 6. The numbers, in full

Theorem D in counting form, evaluated exactly by sweeping l and all phases.

| block | truth | Theorem D bound | capacity as quoted | trivial lower bound |
|---|---|---|---|---|
| v = 5 | **19** | **L <= 62** (first dead l = 63, sums 62, 62, 62) | 189 | 6 |
| v = 7 | >= 49 | **L <= 659** (first dead l = 660, sum 659) | | 11 |
| v >= 11 | | **none, at any L** | | 25 and up |

At v = 5 the raw inequality is satisfied again at some l above 63, last at
l = 111, and fails at every l from 112 to 200, the limit of the sweep. The
monotone reading, that a run of 64 contains a run of 63 which must also be
covered, is what makes 62 the answer rather than 111.

So the honest scoreboard at block 1, all four quantities in the same units:

> **truth 19, sharp per-prime sum 23, Theorem D bound 62, alternation form
> infinite, quoted capacity 189 (in integer units, 19.0 in slot units).**

Theorem D beats the quoted capacity by 3.0x and sits 3.3x above the truth. It is
the first finite block-level bound on combined L in this repository. It is also
worthless, for the reason in section 4: it exists only at the first two blocks.

**It just misses being interesting.** L <= 62 gives
G2(23#) <= maxsum_63(T_5) = 630. The p^2 rule threshold at x = 23 is 23^2 = 529.
The bound overshoots by a factor 1.19. Had it read L <= 52 it would have proved
"there is a twin prime in (23, 529]" by pure counting, which is true but finite
and so no contradiction; the point is only that the block-1 arithmetic sits
within 20 percent of a p^2-rule conclusion.

## 7. Trap tests

**Trap 1, capacity. HIT, but not where expected.** Theorem D is capacity
counting with an exact per-prime maximum instead of a mean. It dies at the
Mertens constant 2 ln 2 > 1. The correction to the brief is that at block 1
capacity is not vacuous by 10x; in slot units it is 17.69 against 19 on the mean
and 23 against 19 at the maximum, and the 10x was mbar(T_5).

**Trap 2, TPC. NOT HIT.** This needs saying carefully, because the temptation is
to claim the trap and stop. Suppose Theorem D were subcritical for infinitely
many v, giving L <= B(v) = O(pi(v^2)) = O(v^2 / ln v). Then
G2(v^2 #) <= maxsum_{B+1}(T_v) <= (B+1) * G2(v #). To reach the p^2 rule at
x = v^2 one needs G2(v^2 #) < v^4, hence B * G2(v #) < v^4, hence
G2(v #) < v^2 * ln v roughly. **With the currently proven exponent that fails**:
G2(v #) <= v^{4.2665+eps} gives v^{6.27}, nowhere near v^4. With the measured
exponent 1.54 it succeeds, at v^{3.54} < v^4. So a subcritical block law implies
TPC only when fed an input at least as strong as the Zone Postulate itself,
which is already known to be TPC-equivalent by the p^2 rule. **Subcriticality is
not TPC-hard on its own.** Attack 3 therefore dies of trap 1 and only trap 1,
and the honest statement is that the Mertens constant, not the twin prime
conjecture, is what kills it.

That distinction matters for the programme. It means the block law is not
protected by a hardness barrier; it is defeated by an arithmetic constant. A
different constraint on the same object is not ruled out by trap 2.

## 8. The unique-killer refinement (MEASURED, no force)

Requested as the fallback if the main line died. It does die, so here it is.

MEASURED at block 1: **17 of the 19 run slots have exactly one killer.** The
distribution of killer counts along the run is
1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,2,1,1, and by prime the unique-killer counts are
7:5, 11:3, 13:2, 17:2, 19:3, 23:2. Over-coverage is 3 slots' worth out of 22.

So the sub-run of uniquely-killed slots is 17 of 19, and a constraint on it would
be nearly a constraint on the whole run. **It has no force, and the reason is
structural rather than numerical.** Write U_p for the slots killed only by p.
Then U_p is a subset of the kill set of p, so every bound of section 2 applies to
|U_p| verbatim and gives nothing new; and the only available aggregate statement
is sum_p |U_p| = #{uniquely killed slots} <= L, which points the wrong way. To
get force one would need a proven lower bound on the number of uniquely killed
slots, that is a proven upper bound on the forced overlap. There is none: the
residues a_p are free by CRT, and pigeonhole forces an overlap between p and q
only when k_p + k_q > L, which at block 1 fails for every pair (the largest is
k_7 + k_11 = 10 against 19). The adversary is never compelled to overlap, so it
is never compelled to be unique either. REFUTED as a source of force.

The measurement is still worth keeping for a different reason. It says the block
covering at v = 5 is almost exactly a partition, 22 kills for 19 slots, which is
why the sharp counting bound is attained at five of six primes. The block
problem is not loose; it is a tight packing that counting can see and that no
residue argument improves on.

## 9. Corrections to claims elsewhere

Both are made from computations in this file and should be checked before being
propagated.

**`research/history/staging/attack-block-10-target.md` section 5, trap 1.** It
states "a prime p kills at most 2(L/p + 1) of them" and concludes "capacity
exceeds need for every L, at every v, forever". Two issues.

- The per-prime bound 2(L/p + 1) is not valid. The exact K_p exceeds it in 100
  or more of the (L, phase, p) triples tested at block 1 for L <= 300, first at
  L = 27, p = 7 where K_p = 10 against 9.71, and at L = 20, p = 23 where K_p = 4
  against 3.74. The violations are always under one unit, so the formula is a
  good approximation and its aggregate conclusion is unaffected, but it is not a
  bound. The valid object is K_p.
- "For every L, at every v, forever" is false at the first two blocks. Even that
  file's own formula, 0.9312 L + 12 at v = 5, closes at L = 175. The exact form
  closes at L = 62. Capacity at v = 5 and v = 7 gives finite bounds. It gives
  none from v = 11 on, which is the part that is right and is the part that
  matters.

**The brief's "coverage available 189 against 19 needed, vacuous by 10x".** The
two numbers are in different units. In slot units the reading is 17.69 on the
mean, 23 at the sharp maximum, against 19. The conclusion (any attack reducing
to capacity is dead) survives, because it is decided by 2 ln 2 and not by the
block-1 margin, but the margin as quoted overstates the case by mbar(T_5) = 10
and would mislead anyone calibrating a new attack against it.

## 10. Reproduction

Scripts are in the session scratch directory, not in `research/`, per the rules:
`blk.js` (block-1 object, 22.3M slots, 20 s), `cap.js` (the five per-prime caps
and the self-consistency sweep), `cross.js` (the Mertens crossover), `bv.js` and
`bv7.js` (Theorem D at v = 5, 7, 11, 13), `freeslot.js` (section 5),
`truth7c.js` (block-2 covering optimum by branch and bound), `chk.js` (the
2(L/p+1) violations).

## COVERAGE, blunt

**What I did not reach.**

- **Block-2 truth is not pinned.** Combined L at v = 7 is at least 49, by an
  explicit covering found with a complete branch and bound over all 15 phases,
  and at least 35 independently because G2(37#) = 528 and the smallest m with
  maxsum_m(T_7) >= 528 is 36. The upper end is unknown. The search was still
  running at l = 50 when I stopped. So "Theorem D at v = 7 is 13x loose" is a
  lower bound on its looseness, not the figure.
- **The LP relaxation of the block covering problem was not computed.** Theorem D
  uses one inequality, sum_p k_p >= L, and per-prime caps. The full linear
  program (choose a fractional a_p per prime, cover every slot) is strictly
  stronger, its value at block 1 sits somewhere in [19, 62], and it is the
  natural next object. I did not build it. If anyone does: the only content
  beyond Theorem D lives in the interaction between primes, since K_p is exact
  and cannot be improved.
- **G2 for the block-2 tile.** I used G2(37#) = 528 from the brief and did not
  recompute it.
- **Nothing was tested above v = 13 for Theorem D itself**, only the slope. The
  slope is what decides it, but the exact bound at v = 11 and 13 was inferred
  from supercriticality rather than swept.

**Where I was wrong, caught here.**

My first branch and bound reported combined L = 33 at v = 7 and called l = 34
infeasible. It was incomplete: it branched on "prime p_i covers the first
uncovered slot, or p_i is unused", which discards every solution where p_i covers
some other slot and a later prime covers the target. The error was caught by an
independent consistency check, not by inspection: G2 is monotone in x, so
G2(47#) >= G2(37#) = 528, and maxsum_36(T_7) = 528 forces combined L >= 35 at
that block. The corrected complete search then found coverings up to 49. Any
number from the first search is void.

**Where I still suspect I am wrong.**

- The identification of 189 as `floor(2 * G2(23#) * sum 1/p)` is a
  reconstruction of someone else's arithmetic that matches to the unit. It could
  be a different computation that coincides. The substantive point, that the
  quantity is in integer units while 19 is in slot units, holds for both
  candidates I could construct (167.6 over the span, 189.97 over G2).
- Theorem D's monotone step, "a run of 63 contains a run of 63 at some phase",
  is sound, but the bound 62 depends on my having swept all three phases at every
  l. The three phases give identical sums at l = 19, 63 and most other l, which
  is either a genuine symmetry of the 6, 12, 12 word or a bug I did not find. The
  numbers differ at other l (l = 15 gives 21, 19, 21), so it is not a constant
  function, which is the only check I ran on it.
- I have assumed throughout that a block prime deletes exactly the residues
  0 and -2 mod p, per the brief. If the fold's 2-set at block level were ever
  {a, a-2} with a not equal to 0 for reasons other than CRT copy choice, the
  measured k_p profile of section 1 would change, though Theorem D would not,
  since it maximises over a.
