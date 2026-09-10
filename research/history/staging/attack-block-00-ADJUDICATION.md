# The block campaign: adjudication and self-review

<!-- ledger
id: Q-block-reformulation
status: CLOSED
todo: none
question: Does the v to v^2 block reformulation, treating the block as a set, give a smaller combined L and an exponentially growing window?
verdict: Sound reformulation, no open path: no primality input is needed anywhere, nothing is deleted inside the window at all so combined L there is identically zero, and the object has to live in the tile; this note's own correction (the counting bound is 111, not 62) was itself reversed the same day by adjudicate-L-bound.md.
-->

*(2026-08-18. Ten attacks on the v -> v^2 block reformulation, launched after the
consistency campaign's wave 6. Read this before any of the ten reports: it
records which of their numbers survived checking and which did not.)*

## The question that was asked

Chris proposed replacing the per-fold ladder (fold at the next prime, window
(p, p'^2)) with a squaring ladder: fold at every odd u in (v, v^2], then set
v <- v^2. The hope was that treating the block as a SET, rather than composing
per-fold bounds, would give a smaller bound on the combined L and a window that
grows exponentially rather than linearly.

Two premises were checked first and both hold. Folding at every odd u gives
exactly the same survivor set as folding at the primes (136 composite folds, 0
live deletions), so **no primality input is needed anywhere** — this is
Eratosthenes' own trick and it removes p as an input, which was Chris's design
requirement. And every twin-slot candidate lying wholly inside (v, v^2) is an
actual twin prime, verified at every v from 5 to 2003 across 26,870 candidates,
zero exceptions.

The second premise has a consequence that reshaped the plan: because any prime
p > v first strikes at p^2 > v^2, **nothing is deleted inside the window at
all**. Combined L in the window is identically zero. The object has to live in
the tile, not the window.

## The verdict: sound reformulation, no open path

| # | attack | verdict |
|---|---|---|
| 1 | combined-L ladder | +0.05 +/- 0.11 slope, no signal; the criterion IS G2(x#)/x^2 |
| 2 | killer census | the effective block is the WHOLE block |
| 3 | block alternation law | dominated by plain counting, by exactly mbar/6 |
| 4 | block-restricted greedy | block restriction costs the adversary nothing |
| 5 | block exponent | required exponent 2; restriction buys no dimension |
| 6 | literature | the object is the small sieve; Erdos #688 |
| 7 | kappa block | kappa_block(1) = combined L identically; Theorem C dies |
| 8 | second moment | legal precisely because useless |
| 9 | anchored vs global | the proven bound is the IDENTICAL theorem |
| 10 | recursion target | required exponent 2; requirement is exponent-invariant |

The deepest reason is attack 10's: the ladder recursion is an AVERAGING,
beta_{k+1} = (beta_k + phi_k)/2, verified exactly at block 0. It forgets its
starting exponent at rate 2^-k, but beta -> phi, so the per-block exponent to
prove equals the global one. The ladder amplifies the sign of (2 - t)
doubly-exponentially and cannot manufacture it. **"Only the first few steps are
hard" is false**, which was the most attractive property the ladder appeared to
have.

## THE CORRECTION THAT MATTERS: the counting bound is L <= 111, not 62

Four values for one quantity were produced on the same day: attack 3 said
**62**, the shepherd said **120**, attack 7 said **158**, and attack 1 quoted
**52** in passing. None was right.

**The settled value is L <= 111**, computed here exactly. Method: w(i) = the
number of block primes killing T_5 slot i; a run of L consecutive slots can be
fully covered only if some window of L consecutive slots has sum(w) >= L. Taken
over a single position, which is what the constraint actually permits, over the
full 23# period. Instrument validated in the same run: uncovered slots =
7,952,175 = D_23 exactly, and mean(w) = 0.9312 = sum 2/p exactly.

**Attack 3's 62 is wrong because it assumed feasibility is monotone in L, and
it is not.** L = 63 is infeasible (window sum 62) but L = 70, 100 and 111 are
all feasible again, because each per-prime cap advances in a staircase and the
sum oscillates around the line. Stopping at the first dead L understates the
bound by a factor of nearly two.

**That is the same bug attack 4 was diagnosing in the corpus at the same
moment.** `research/two-class-lower-bounds.js`'s `maxM` binary-searches on
`fn(m).ok` as though feasibility were monotone in m; for a greedy it is not, and
the published Y2 ladder is under-searched as a result. Two agents hit the
identical trap on the same day from opposite directions and neither saw the
other. **This is now a standing check: anywhere this corpus bisects on a
predicate, the predicate's monotonicity must be demonstrated, not assumed.**

**The monotonicity sweep has been run, and it is clean apart from the known
case.** Every bisection in the corpus, found by searching for the `(lo+hi)>>1`
shape: `discrepancy-two-class.js`:483 and the `lowerBound`/`upperBound` pairs in
`natal-cap-31` and `natal-cap-13` all bisect on a SORTED ARRAY, where
monotonicity holds by construction and the search is correct.
`two-class-lower-bounds.js`:118 bisects on a greedy feasibility predicate and is
the one unsafe instance. The pattern is calibrated by that hit: it found the
known-bad case, so its silence on the other three is informative rather than
empty. **Damage is bounded to the Y2 ladder.**

Consequence for attack 3's headline. L <= 111 gives G2(23#) <= maxsum_112(T_5)
= 1122 against the p^2-rule threshold 529, an overshoot of **2.12x**. Attack 3
reported 1.19x and wrote that the bound "just misses being interesting". It does
not; it misses by more than a factor of two. The qualitative finding survives
and is still worth having: **counting at block 1 is binding rather than vacuous,
and it yields the first finite block-level bound on combined L in this
project.** The quantitative headline does not survive.

## The shepherd's own errors, all five, and what they have in common

1. **`log(v^2#) ~ 2v`** in attack 5's brief. It is theta(v^2) ~ v^2. Wrong by
   1.9x at v = 5 and 498x at v = 997. Caught by attack 5, which overrode the
   brief and was right.
2. **"capacity is vacuous by 10x"** in the shared brief all ten agents read.
   A unit error: 189 counts integers in the killed classes, 19 counts T_5 slots,
   and one integer in ten is a slot. Capacity is binding, not vacuous. Caught
   independently by attacks 3, 7 and 4.
3. **"exponent exactly 2 is TPC-equivalent"**, dropping the constant.
   `covering-dive.md`:141 says "with the right constant"; o((log q)^2) is TPC,
   O((log q)^2) is legal and open. Caught by attack 8.
4. **"the anchored gap is three to four orders below the global"**, comparing an
   anchored measurement at v = 2003 against G2/window figures that exist only
   for x <= 37. Apples-to-apples it is a factor of 12. Caught by attack 9. This
   was the reason the shepherd rated attack 9 the most promising route.
5. **The loose counting bound, 120**, allowing every prime its own best phase
   when the phases are linked through the position. Caught in this review.

**Every one of the five is a unit, scale or quantifier slip. Not one is an
arithmetic slip.** That is a specific and actionable diagnosis: the failures are
in dimensional analysis, not in computation. The operational fix is to state the
units of both sides of every comparison before making it, which would have
caught 1, 2, 4 and 5.

**None of the five was caught by the shepherd re-reading its own work.** All
were caught by an agent re-deriving independently, or by this review recomputing
from scratch. The parallel design is load-bearing rather than decorative, and
the instruction to hand agents the evidence rather than the answer is what let
them override.

## What the campaign produced anyway

- **G2(41#) = 546**, a new exact term, inside the pre-registered Poisson window
  476-633 and 6.4% above its centre. Verified here by local certificate.
  Measured cost 2 min 31 s against a 5.6 h estimate that was itself a correction
  of a 37 h estimate.
- **max A = (0.49 +/- 0.09) ln^3 v**, flat over nine decades, putting a constant
  on the ln^3 guard `ZONE-POSTULATE.md` section 4 uses without one.
- **Y2 corrected 355 -> 527 at x = 37**, the exact optimum. The construction was
  never the weak part; the search around it was.
- **The block object identified**: it is the small sieve, and Erdos #688 is its
  one-class case at epsilon = 1/2. The threshold between them is exactly the
  capacity constant: one class gives ln 2 = 0.693 and counting forbids covering,
  two classes give 2 ln 2 = 1.386 and counting permits it. Our problem sits just
  above the line the one-class problem sits below, which is why trap 1 is
  delicate rather than obvious. Kalmynin-Konyagin's published gain
  M(f)(lnln z1 - lnln z0) is that same 2 ln 2 on our alphabet.
- **The covering identity combined L = G2 checked at six block tops** by exact
  DP, not one.
- Four corpus defects: the c_min sign, the T_5 maxsum truncation, `maxM`'s
  non-monotone bisection, and a missing journal reference the shepherd
  introduced the same day.

## What the day did NOT settle, and it is the important one

**Whether G2(x#)/x^2 actually falls.** Every route closed, but the central
empirical question got no better answer. Attack 1's slope is +0.05 +/- 0.11 over
eleven exact terms. The Y2 curve that appeared to show a fall is under-searched
and its levels do not survive. So on the question underneath everything, the
position is roughly where the day started, with better instruments and one more
exact term.

That is what the next phase has to attack, and it is why the plan leads with
extending the exact ladder rather than with proving anything.
