# Attack block 04 — the block-restricted adversarial greedy

<!-- ledger
id: Q-block-greedy
status: ANSWERED
todo: none
question: Does the block-restricted adversarial greedy reach the truth at v = 5, and does block restriction cost anything?
verdict: Deterministic greedy reaches 17 against truth 19, randomised restarts reach 19 and an exhaustive DP confirms it, so greedy as a rule is optimal at v = 5 and the shortfall is a search failure; block restriction costs nothing on ten points with the same estimator on both sides, and the published Y2 ladder's bisection on a non-monotone predicate is a real defect.
-->

Date 2026-08-18. Scratch code lives outside the repo, in
`/private/tmp/claude-501/-Users-benjaminsen-Files-Git-primeoire/43d455bc-6530-4df2-9970-05f6622affcb/scratchpad/`
(`block-greedy.js`, `unrestricted-rand.js`, `capacity.js`, `randomised.js`, `fits.js`).
No repo file was edited. Nothing was committed or pushed. `research/qc.js` was not run.

---

## 0. Headline

Two results, one of them about this repo's own published numbers.

1. **At v = 5 the block greedy reaches the truth.** Deterministic max-gain greedy
   gets 17 of the 19 slots (span 180 against 204, 0.882). A greedy with randomised
   restarts gets **19 = combined L exactly**, and an exhaustive DP over the block
   independently confirms 19 with span 204 = G2(23#).

2. **The published Y2 ladder in `G2-STATE.md` §5a understates its own estimator, and
   at x = 37 the truth is 1.49× the published number.** `two-class-lower-bounds.js` reports
   Y2 = 355 at x = 37 against a true G2 − 1 = 527 and calls that 0.672. The same
   greedy, scanned linearly instead of bisected, covers m = 389. With randomised
   restarts it covers **527 — the exact optimum**. At x = 31 the published 233
   is exactly the length of the unbroken feasible prefix, while the same
   deterministic greedy covers 305 and randomised covers 346 against a truth of 347.
   Verified by independent replay of the emitted (p, a_p) at every point.

Consequence for §5a: **at every x where the truth is known, the best construction we
can build IS the truth, not 67% of it.** The SAFE verdict survives and so does the
falling ratio — flatness would need estimator fidelity 0.0117 at the top of the
ladder, below greedy's theoretical worst case, so it is excluded (§7). What does not
survive is the stated reason for the verdict, the level of the Y2 curve, and the
phrase "x^{1−o(1)} and widening" (§8c).

---

## 1. Custody

The brief says to grep for the producer rather than assume. `grep -rln "6748\|56213"`
over `research/` and `paper/` returns three files: `research/natal-cap-37-at41-march.js`
(a coincidental `1.6748` in a data comment), `research/two-class-lower-bounds.md`
(the write-up), and `research/localized-04-maxsum.js` (another coincidental
`1.6748`). The producing script is `research/two-class-lower-bounds.js`, whose §2+3
emits the certificate ladder.

Reproduced before touching anything, `node research/two-class-lower-bounds.js`:

```
     x   Y1(1class)  Y2(diff-2)  Y2/Y1  (Y2/Y1)/lnx   Y2/x^2  Y2/(x ln^2x)  verify
    37         65         355    5.46      1.5125   0.25931       0.7359    OK
   229        600        6748   11.25      2.0698   0.12868       0.9980    OK
```

355 at x = 37 and 6748 at x = 229, matching `G2-STATE.md` §5a exactly. Right file.
Its §1a also re-derives G2(x#) by brute force for x ≤ 17 and matches the repo ladder,
so the ladder itself is in custody.

**Calibration of the search.** The grep pattern was checked against a known positive:
`grep -n "355" research/two-class-lower-bounds.md` returns the table row, so the
pattern does fire on the object being hunted. A null result would have meant something.

---

## 2. The block object, and why the start position is free

T_v is the twin-slot tile mod v#: integers n with n and n+2 both coprime to every
prime p ≤ v. The block v → v² chooses, for each prime p in (v, v²], a residue pair
{a_p, a_p − 2} mod p, and deletes every T_v slot in those classes. Combined L is
the longest run of consecutive T_v slots all deleted.

Take a run of M consecutive T_v slots and let D = {0 = d₁ < d₂ < … < d_M} be their
offsets. Every block prime is coprime to v#, so shifting the run by t is exactly
absorbed by replacing a_p with a_p + t, independently for every p (CRT). **The
absolute position of the run is therefore irrelevant; only the local gap pattern of
T_v matters**, i.e. only which residue class mod v# the run starts in. So the block
problem is:

> choose a start class of T_v, and cover its offset set D with one residue pair
> {a, a − 2} mod p per prime p ∈ (v, v²].

This is exactly the covering problem of `two-class-lower-bounds.md` §1, restricted
in two ways: the target is the admissible set D rather than a full interval, and the
small primes p ≤ v are not free — they are already spent building the tile.

**Trivial floor.** L ≥ #{p ∈ (v, v²]}: give each slot its own prime. Everything the
greedy achieves above that comes from primes small enough to hit the run twice.

**Slot generation.** A start class is a residue vector (n₀ mod p)_{p ≤ v}, which by
CRT can be chosen freely and independently. So runs are generated by segment-sieving
a window with arbitrary chosen residues, without ever forming v#. That is why the
ladder runs far past enumeration: enumeration of 23# reached v = 5, this reaches
v = 181 (block top x = 32 761, 3 470 free primes).

---

## 3. Verification that this object is the right one

Two checkers, both calibrated against known negatives.

**Certificate replay.** Every reported run emits its explicit (p, a_p) list and a
separate routine rebuilds coverage from scratch, also rejecting a prime used twice
or a prime outside (v, v²]. Calibration on deliberate negatives:

```
uncovered -> 2 (want >0) ; reuse -> rejected ("prime 7 used twice") ;
out-of-block -> rejected ("prime 5 is not in (5,25]") ; second reuse -> rejected
```

All reported rows below replay clean.

**Exhaustive DP on small blocks.** For blocks small enough to hold a 2^M reachable-mask
array, the true block covering optimum is computed by exact dynamic programming over
all pair choices, with all |T_v| start classes enumerated. It reproduces the exact
G2 ladder at six block tops:

| block | tile primes | exact block optimum L | exact span | G2(P#) |
|---|---|---|---|---|
| 5..11 | 2,3 | 6 | 42 | 42 |
| 5..13 | 2,3 | 10 | 66 | 66 |
| 5..17 | 2,3 | 17 | 108 | 108 |
| 5..19 | 2,3 | 24 | 150 | 150 |
| 7..23 | 2,3,5 | **19** | **204** | **204** |
| 7..29 | 2,3,5 | 25 | 258 | 258 |

The v = 5 row is the object the brief certifies from full enumeration of 23#:
combined L = 19, maxsum₂₀(T_5) = 204 = G2(23#). It comes out of an independent
route here. **The CRT theorem's operational form — block covering optimum = G2(P#)
where P is the largest prime in the block — is now checked at six points, not one.**

---

## 4. v = 5: greedy against truth

Block primes 7, 11, 13, 17, 19, 23. T_5 has three start classes (gap patterns
6,12,12 / 12,12,6 / 12,6,12), all enumerated.

| start pattern | asc | desc | max-gain | randomised restarts | EXACT |
|---|---|---|---|---|---|
| 6,12,12 | 15 | 12 | 17 | 19 | 19 (span 198) |
| 12,12,6 | 13 | 11 | 17 | 19 | **19 (span 204)** |
| 12,6,12 | 16 | 11 | 16 | 19 | 19 (span 198) |

**Answer to the brief's first question: the deterministic block greedy reaches 17,
short of the truth 19 by 2 slots (0.895 in slots, 180/204 = 0.882 in integers). The
randomised-restart greedy reaches 19 — the truth exactly.** So the greedy rule is
not what falls short at v = 5; the deterministic tie-breaking is.

The brief warned to expect a shortfall like the 67% seen at x = 37 and to measure
rather than assume. Measured: the block form at that same block top (7..37, v = 6.1)
reaches span 396 deterministically, i.e. 0.750 of 528, already better than the
published 355 = 0.672, and reaches **528 = the exact truth** with restarts.

---

## 5. Greedy against truth, block top slid over the whole exact G2 ladder

Choosing v with v² just above each prime P for which G2(P#) is known exactly gives
eight block tops, nine instances, whose truth is known. All |T_v| start classes
enumerated.

| block | tile | det. greedy span | randomised span | G2(P#) | det/truth | rand/truth |
|---|---|---|---|---|---|---|
| 5..11 | 2,3 | 42 | 42 | 42 | 1.000 | 1.000 |
| 5..13 | 2,3 | 66 | 66 | 66 | 1.000 | 1.000 |
| 5..17 | 2,3 | 108 | 108 | 108 | 1.000 | 1.000 |
| 5..19 | 2,3 | 150 | 150 | 150 | 1.000 | 1.000 |
| 5..23 | 2,3 | 174 | 204 | 204 | 0.853 | **1.000** |
| 7..23 | 2,3,5 | 180 | 198 | 204 | 0.882 | 0.971 |
| 7..29 | 2,3,5 | 204 | 258 | 258 | 0.791 | **1.000** |
| 7..31 | 2,3,5 | 300 | 342 | 348 | 0.862 | 0.983 |
| 7..37 | 2,3,5 | 396 | 528 | 528 | 0.750 | **1.000** |

(The randomised column is the best over all runs; 330 at 7..31 with 200 restarts,
342 with 800.)

The deterministic ratio falls, 1.00 → 0.75, log-log slope −0.31 against P over the
last four points. **The randomised ratio does not fall. It is 1.000 at seven of the
nine rows and never below 0.971.**

---

## 6. The v-ladder

Best over every search run made (deterministic ascending / descending / max-gain
with both tie-breaks, plus randomised restarts where affordable). `span` is the
integer length of the created gap, from the surviving T_v slot before the run to
the one after. x := v² is the block top, i.e. the level the folded tile reaches.

| v | \|block\| | m̄(T_v) | L (slots) | span | x = v² | L/\|block\| | span/x | span/x² | span/(x ln²x) |
|---|---|---|---|---|---|---|---|---|---|
| 5 | 6 | 10.00 | 19 | 198 | 25 | 3.17 | 7.9 | 0.3168 | 0.764 |
| 6 | 8 | 10.00 | 33 | 342 | 36 | 4.13 | 9.5 | 0.2639 | 0.740 |
| 6.1 | 9 | 10.00 | 52 | 528 | 37.2 | 5.78 | 14.2 | 0.3813 | 1.085 |
| 7 | 11 | 14.00 | 50 | 702 | 49 | 4.55 | 14.3 | 0.2924 | 0.946 |
| 11 | 25 | 17.11 | 168 | 2 880 | 121 | 6.72 | 23.8 | 0.1967 | 1.035 |
| 13 | 33 | 20.22 | 231 | 4 686 | 169 | 7.00 | 27.7 | 0.1641 | 1.054 |
| 17 | 54 | 22.92 | 439 | 9 978 | 289 | 8.13 | 34.5 | 0.1195 | 1.075 |
| 19 | 64 | 25.61 | 530 | 13 680 | 361 | 8.28 | 37.9 | 0.1050 | 1.093 |
| 23 | 90 | 28.05 | 838 | 23 430 | 529 | 9.31 | 44.3 | 0.0837 | 1.126 |
| 29 | 136 | 30.13 | 1 489 | 44 988 | 841 | 10.95 | 53.5 | 0.0636 | 1.179 |
| 31 | 151 | 32.21 | 1 657 | 53 430 | 961 | 10.97 | 55.6 | 0.0579 | 1.179 |
| 41 | 250 | 35.80 | 3 203 | 115 482 | 1 681 | 12.81 | 68.7 | 0.0409 | 1.245 |
| 47 | 314 | 39.21 | 4 144 | 162 192 | 2 209 | 13.20 | 73.4 | 0.0332 | 1.238 |
| 53 | 393 | 40.75 | 5 513 | 224 940 | 2 809 | 14.03 | 80.1 | 0.0285 | 1.270 |
| 61 | 501 | 43.61 | 7 428 | 324 672 | 3 721 | 14.83 | 87.3 | 0.0234 | 1.291 |
| 71 | 655 | 46.25 | 10 283 | 474 558 | 5 041 | 15.70 | 94.1 | 0.0187 | 1.295 |
| 83 | 863 | 50.00 | 14 144 | 702 420 | 6 889 | 16.39 | 102.0 | 0.0148 | 1.306 |
| 101 | 1 226 | 53.28 | 21 809 | 1 163 262 | 10 201 | 17.79 | 114.0 | 0.0112 | 1.339 |
| 127 | 1 846 | 58.34 | 35 350 | 2 044 614 | 16 129 | 19.15 | 126.8 | 0.0079 | 1.351 |
| 151 | 2 511 | 62.66 | 50 135 | 3 111 786 | 22 801 | 19.97 | 136.5 | 0.0060 | 1.355 |
| 181 | 3 470 | 67.28 | 72 984 | 4 858 776 | 32 761 | 21.03 | 148.3 | **0.0045** | 1.372 |

**Furthest v reached: 181**, block top 32 761, 3 470 free primes, 72 984 T_v slots
covered by an explicit certificate that replays clean. Enumeration reaches v = 5.

L/|block| — slots killed per block prime — rises from 3.2 to 20.0, monotonically
from v = 11 up (the smallest v wobble, 5.78 at v = 6.1 then 4.55 at v = 7, is the
tile changing under it). The trivial one-prime-per-slot floor is beaten by a growing
factor, so multiplicity, not prime count, is doing the work.

---

## 7. The ratio, and the caveat

The window the folded tile has to fit inside is x² = v⁴ in integer units, i.e.
v⁴/m̄(T_v) in T_v slot units. The requested ratio is L / (v⁴/m̄); it agrees with
span/v⁴ to within 4% at v = 5 and to three digits from v = 17 upward, the small-v
difference being that a 19-slot run at v = 5 spans 198 integers rather than 19 × m̄
= 190.

**It falls monotonically: 0.304 at v = 5 to 0.0046 at v = 181, a factor of 66 over
a 36-fold range in v (1310-fold in x).** Log-log fits of span against x = v²:

| range in x | fit | implied |
|---|---|---|
| 25 … 32 761 (21 pts) | span = 3.30 x^1.3901 | c·x·(ln x)^2.442 |
| 529 … 32 761 (13 pts) | span = 7.81 x^1.2884 | c·x·(ln x)^2.377 |
| 2 209 … 32 761 (9 pts) | span = 10.41 x^1.2572 | c·x·(ln x)^2.314 |

so span/x² ~ x^−0.74 at the top of the ladder, and span/(x ln²x) is nearly flat,
0.76 → 1.37. The construction is x·polylog in the block frame exactly as it is in
the unrestricted frame.

**THE CAVEAT, stated where the number is: the greedy is a LOWER bound on the block
covering optimum, so a falling greedy ratio does NOT prove the true ratio falls.**
And this is not a formality here. §5 shows the deterministic-grade ratio against
truth falling 1.00 → 0.75 over x = 11 … 37 while the true ratio G2(x#)/x² over the
same range is flat:

```
x        11     13     17     19     23     29     31     37
G2/x²  0.347  0.391  0.374  0.416  0.386  0.307  0.362  0.386
```

Over the only range where the truth is visible, G2/x² shows no fall at all, while
the deterministic estimator falls by a quarter. The expected asymptotic fall of
ln²x/x over x = 11…37 is only a factor 1.5 and would be invisible in that noise, so
this does not show the truth is flat — it shows the exact ladder is too short to see
either way, and that over that range the estimator's own decay is the same size as
the effect being measured.

**How much of the fall could be estimator decay? Not much.** For the ratio to be
genuinely flat at 0.386 out to x = 32 761 the true block optimum would have to be
0.386 × 32 761² = 414.3 million against the 4.86 million measured — fidelity 0.0117,
an 85-fold decay over an 885-fold range in x. For scale, the classical greedy
set-cover guarantee at this instance size is H_n ≈ ln 72 984 ≈ 11.2, i.e. a factor
0.089 — and that bounds the number of sets used, not the coverable length, so it is
a reference point rather than a theorem about this quantity. A 0.0117 fidelity is
worse than even that, and is not credible. A generous ln-shaped decay, fidelity
falling 1.00 → 0.353 from x = 37 to x = 32 761, would put the truth at 13.8 million,
ratio 0.0128 — still 30× below flat and still falling hard. **So the fall itself is
robust to any plausible estimator decay. What is not established is its rate, or the
level of the curve.**

---

## 8. What broke in the published Y2 ladder

Two independent defects, both in `research/two-class-lower-bounds.js`, both verified.

### 8a. Bisection on a non-monotone predicate

`maxM` bisects on "greedy covers [1,m]". That predicate is **not monotone in m**:
enlarging the target changes the gains and hence the whole choice sequence, so the
greedy can fail at m and succeed at m+1. Measured, for the repo's own `greedyD2`
(both tie-breaks, better kept):

| x | max m the deterministic greedy covers | longest unbroken feasible prefix | infeasible m below the max | published Y2 |
|---|---|---|---|---|
| 13 | 65 | 53 | 5 | 56 |
| 23 | 176 | 173 | 2 | 176 |
| 29 | 220 | 205 | 3 | 211 |
| 31 | **305** | **233** | 34 | **233** |
| 37 | **389** | 359 | 19 | **355** |

At x = 31 the published 233 is exactly the unbroken prefix — the bisection cannot
see past the first hole, and there are 34 holes below the estimator's real reach of
305. That is a 31% understatement of the script's own estimator.

The same trap bit this attack: a pure bisection returned 35 at v = 6.1 where the
greedy's real maximum is 39. The fix used here is bisect-to-bracket, then a linear
polish upward with patience.

### 8b. Deterministic tie-breaking

Randomising the argmax within a prime, and picking uniformly among the top-k
(prime, pair) candidates each round, with restarts, on the **unrestricted** problem
(cover [1,m], all primes p ≤ x, i.e. exactly the repo's object):

| x | published Y2 | det. greedy, scanned | randomised, restarts | truth G2(x#)−1 | published/truth | randomised/truth |
|---|---|---|---|---|---|---|
| 13 | 56 | 65 | 65 | 65 | 0.862 | **1.000** |
| 17 | 107 | 107 | 107 | 107 | 1.000 | 1.000 |
| 19 | 137 | 149 | 149 | 149 | 0.919 | **1.000** |
| 23 | 176 | 176 | 203 | 203 | 0.867 | **1.000** |
| 29 | 211 | 220 | 257 | 257 | 0.821 | **1.000** |
| 31 | 233 | 305 | 346 | 347 | 0.671 | 0.997 |
| 37 | 355 | 389 | 527 | 527 | 0.673 | **1.000** |

Every randomised row replays clean from its emitted (p, a_p).

**So the two-class construction attains the covering optimum at every x where the
optimum is known.** The number quoted in `G2-STATE.md` §5a as the best available
construction at x = 37 is 355; the best available construction at x = 37 is 527.

### 8c. What this does and does not do to the SAFE verdict

It does **not** refute it. G2(37#)/37² = 0.386 < 1, so even the corrected
construction sits comfortably inside the zone.

It damages the stated *reason*. §5a's verdict reads "the gap between the best
available lower bound and the threshold is x^{1−o(1)} and widening", and rests on
Y2/x² falling 11.6-fold from 0.259 at x = 37 to 0.022 at x = 4001. The 0.259 is
wrong: the true value at that row is 0.386, so the table's first row is 49% low and
the *measured* fall over the table is smaller than 11.6-fold by whatever the
estimator's fidelity does. Over x ≤ 37 the fidelity decays 1.00 → 0.67, which is the
same order as the fall being reported over the first decade of the table. **On the
evidence inside that table the falling Y2/x² cannot be separated from falling
estimator fidelity.**

What saves the conclusion is arithmetic done outside that table, in §7: flatness at
x = 32 761 would require fidelity 0.0117, which is below the theoretical worst case
for greedy on an instance that size. So the fall is real; it is the *rate*, the
*level*, and the phrase "x^{1−o(1)} and widening" that are unsupported. The honest
version of the verdict is: **SAFE, by a factor that is growing, at an unmeasured
rate, from a starting point 1.49× higher than recorded.**

Counter-evidence, and it is real: **randomisation stops paying above v ≈ 11.**

| v | 5 | 6 | 6.1 | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 41 | 71 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| randomised / deterministic span | 1.10 | 1.14 | 1.33 | 1.11 | 0.96 | 1.02 | 1.01 | 1.02 | 1.00 | 0.99 | 1.01 | 0.99 | 0.98 |

With 6–9 free primes the deterministic rule is brittle and restarts recover 10–33%.
With 25 or more free primes the greedy self-averages and restarts buy ≈ 1%, at the
same or lower search budget. That is consistent with the large-v ladder being at
whatever fidelity the greedy rule itself has, and with the fidelity problem at
x ≤ 37 being a small-instance artifact. It is **not** evidence that the fidelity is
1 at large v — it is evidence that this particular lever is exhausted, and therefore
that the fidelity at large v is **unmeasured**, not measured-and-good.

---

## 9. Block-restricted against unrestricted, same total prime set

Both cover with all primes ≤ x = v²; the difference is that the block form has the
small primes p ≤ v spent on the tile instead of free. Deterministic estimator on
both sides for a like-for-like comparison:

| v | x = v² | block span | unrestricted Y2 | block/Y2 |
|---|---|---|---|---|
| 5 | 25 | 180 | 176 | 1.023 |
| 6.1 | 37 | 396 | 355 | 1.115 |
| 7 | 49 | 630 | 557 | 1.131 |
| 11 | 121 | 2 634 | 2 471 | 1.066 |
| 17 | 289 | 9 828 | 10 066 | 0.976 |
| 23 | 529 | 23 208 | 22 162 | 1.047 |
| 29 | 841 | 44 646 | 43 433 | 1.028 |
| 31 | 961 | 52 428 | 51 947 | 1.009 |
| 41 | 1 681 | 115 482 | 113 863 | 0.988 |
| 47 | 2 209 | 162 192 | 160 571 | 1.002 |

**Restricting the choice to a block costs nothing.** The ratio converges to 1.00.
Spending the small primes on the tile is exactly as good as choosing them freely,
which is the CRT theorem's content made numerical. Two consequences: the Y2 ladder
of §5a can be read directly as a block statement, and the hope that a block frame
gives the adversary extra concentration power is closed — it gives none.

---

## 10. Trap checks

### 10a. Capacity counting — the brief's statement needs a unit correction

ρ(v) := Σ_{v<p≤v²} 2/p is the coverage a *random* residue pair per block prime buys
per unit of interval — and equally per T_v slot, since the slot density cancels.
ρ → 2 ln 2 = 1.3863. Counting is vacuous only where ρ > 1.

| v | 5 | 6 | 7 | 11 | 17 | 29 | 53 | 101 | 211 | 547 |
|---|---|---|---|---|---|---|---|---|---|---|
| ρ | **0.931** | 1.065 | **0.971** | 1.165 | 1.213 | 1.282 | 1.313 | 1.345 | 1.358 | 1.376 |

**At v = 5 and v = 7 capacity counting is binding, not vacuous.** The brief records
"coverage available 189 against 19 needed, vacuous by 10x" at block 1. That compares
an integer-unit availability (189 ≈ 204 × 0.931) against a slot-unit demand (19).
In matched units the comparison is 190 against 204 — random capacity at v = 5 is 7%
*short*, and the truth achieves 204 only by beating random placement.

The brief's conclusion still stands from v ≥ 11 onward, and stands for the asymptotic
question, which is the one that matters: ρ tends to a constant independent of L and
of v, so no capacity count can ever bound L. What the corrected units show is *why*
the count is useless: the covering is not capacity-limited, it is overlap-limited.
Π(1 − 2/p) over the block → 1/4, so a random block choice leaves a quarter of the
slots alive no matter how long the run; the adversary's entire power is in
anti-correlating the choices. Any attack that reduces to capacity is dead, as the
brief says. Any attack that reduces to *second-moment* overlap is the open question.

### 10b. The TPC trap — tested, and it does not bite this attack, in one direction only

The statement this attack probes is "the block v → v² leaves a surviving slot within
v⁴". Asserted for an infinite family of v that is the Zone Postulate, which by the
p² rule (`research/covering-dive.md` Q5.4) is TPC-equivalent at exponent exactly 2.
So:

- **A proof via this route is barred.** Any argument bounding the true combined L
  below the window at every v would prove G2(x#) < x² and hence TPC. The
  constructive side can never be upgraded into a proof of the postulate. It is a
  probe only. Reported as the brief asks, early and as a result.
- **A refutation is not barred.** One block whose true optimum exceeds v⁴ kills the
  postulate outright and says nothing about twin primes. That is the only outcome
  this attack could have produced, and it did not produce it: the best construction
  reached is 0.0045 of the window at v = 181, and the margin is widening in the
  measurement.

So the correct reading of this attack is: it looked for a counterexample on the only
side where one could exist, and found none, at 1310× the range in x that enumeration
can reach.

---

## 11. Answers to the brief's three questions

**Q. At v = 5, does the block greedy reach 19?**
Deterministic: no, 17 (0.895 in slots, 0.882 in integers). Randomised restarts: yes,
19, the truth exactly. Exhaustive DP independently confirms 19 with span 204 = G2(23#).
So greedy *as a rule* is optimal at v = 5; greedy *as implemented deterministically*
is not, and the shortfall is a search failure.

**Q. How far does the ladder go?**
v = 181, block top x = 32 761, 3 470 free primes, L = 72 984 slots, span 4 858 776,
certificate replayed clean. Enumeration of the tile reaches v = 5.

**Q. Does the ratio fall?**
Yes, monotonically, from 0.304 at v = 5 to 0.0046 at v = 181, ~x^−0.74 at the top.
**Greedy is a lower bound on the optimum, so this does not prove the true ratio
falls** — and §7 and §8 show the estimator's own fidelity decays by an amount of the
same order over the only range where fidelity is measurable.

---

## 12. COVERAGE — what this did not reach, and where I may be wrong

**Not reached.**

- No truth above x = 37. Everything about fidelity at large v is inference from
  eight small blocks with at most nine free primes each. The exact DP is capped at
  2^27 masks, so it cannot certify a block optimum past L ≈ 27.
- The ladder stops at v = 181 for time, not for any obstruction. Cost is roughly
  quadratic in π(v²), so each further rung is a few times the last; v = 151 took 18
  minutes, v = 181 five.
- No attempt at an exact solver (ILP, DFS with bounds, meet-in-the-middle) for blocks
  in the 10–40 free-prime range. That is the single highest-value missing measurement
  in this attack: it would extend the greedy-vs-truth calibration past x = 37, which
  is the only thing that can settle whether the falling ratio is real. I judge it
  feasible — an ILP over ~50 primes with ~250 elements is not obviously out of reach
  for a good solver — and I did not attempt it.
- No local search beyond restarts: no simulated annealing, no LP relaxation rounding,
  no repair-based improvement of a near-cover. Restarts stop paying above v ≈ 11, so
  a *different* lever is what is needed there, and none was tried.
- The randomised ladder was run only to v = 71 (one start, 6 restarts, parity 0.98).
  Rows v ≥ 41 are deterministic-grade.

**Suspected, not proven.**

- I suspect the true block optimum ratio span/x² does keep falling, roughly like
  ln²x/x, because the measured greedy ladder already falls *slower* than that law
  (factor 43.5 measured over x = 121 → 32 761 against 57.6 predicted), which is the
  wrong sign for a search that is silently degrading. But that is one weak
  consistency check against a real alternative, not evidence.
- I suspect the deterministic greedy's brittleness at 6–9 free primes and its
  robustness at 25+ is a genuine self-averaging effect and not a coincidence of these
  instances. Untested.

**Where I think I am wrong.**

- The strongest claim here — that §5a's Y2 numbers understate the truth by up to 49%
  — is solid at x ≤ 37 and replay-verified, but I have extrapolated its *significance*
  to the rest of the table. It is entirely possible that at x = 229 and above the
  published Y2 is close to the optimum and the 11.6-fold fall is real. I cannot
  distinguish those cases and I have written §8c to say so; if a reader takes away
  "the Y2 ladder is broken" rather than "the Y2 ladder's first rows are broken and
  the rest is unaudited", that is my fault.
- The v-ladder numbers are search-effort dependent, and different runs of the same
  code with different start counts gave results differing by up to 4% (v = 11: 152,
  158, 160, 162, 168 across runs). The table reports the maximum over all runs. That
  is legitimate for a lower bound but it means the *shape* of the ladder carries an
  effort artifact: small v got far more search per prime than large v. If effort per
  instance were equalised the fall would be steeper, not shallower, so this biases
  against my own caveat rather than for it — but it is a real defect in the
  measurement.
- The claim "block restriction costs nothing" rests on ten points with the
  deterministic estimator on both sides. If the two estimators degrade at different
  rates, the convergence to 1.00 could be two decays cancelling.
