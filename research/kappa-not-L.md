# L and κ(m): the proven bounds, and why L is not the target

<!-- ledger
id: Q-kappa-not-L
status: CLOSED
todo: none
question: Can L, or its generalisation kappa(m), be bounded well enough to be the route's target?
verdict: L is not the target: three bounds on L are PROVEN through the Alternation Lemma and transfer to kappa(m), but the wall is located precisely and the lower bound never becomes exact, so L cannot be made irrelevant; closed 2026-08-19, L has no law of its own, being G2 divided by the block's own spacing and super-additive on disjoint sets.
-->

*Parent: `research/U-FRAME.md` §10, which carries these claims in summary. Three
proven theorems on L, the lemma that makes them, and the two reasons the bound
cannot reach the branch the route needs.*

L, the longest adjacent-kill run, is the parameter in U-FRAME §5a step 3's upper
bound; κ(m), the maximum kill count in a window of m consecutive new gaps, is its
generalisation to the whole family (U-FRAME §5a step 3a), with κ(1) = L. Both are
governed by the criterion that two adjacent slots at distance g can both be
deleted by the fold at p only if g ≡ 0 or ±2 (mod p), PROVEN in one line from the
strike classes {0, −2}, hence by f, the fraction of gaps meeting it, which
`research/f-decays.md` measures. This note is the status of both: what is proven,
where the proofs stop, and why the object to aim at is κ(m).

### The qualifying gaps, in closed form (PROVEN and exact)

Grain gaps are multiples of 6, so d = 6k qualifies iff k ≡ 0, ±3⁻¹ (mod p). The
qualifying set is therefore three arithmetic progressions of modulus 6p carrying
weights 1, 1, 2:

> **{2p−2, 4p+2, 6p} when p ≡ 1 (mod 6), and {2p+2, 4p−2, 6p} when p ≡ 5 (mod 6)**

so the smallest qualifying gap is exactly **2p ∓ 2**, not "about 2p". The weight
2 on the p-divisible size is a multiplicity: d ≡ 0 admits both kill patterns
(0, 0) and (−2, −2), so two of the p copies realise it, while d ≡ ±2 admits one.
Checked against brute force at all 302 primes from 5 to 1999, derived twice by
routes that share nothing (A3's census argument and A8's pair count), and it
reproduces U-FRAME §5's qualifying-gap table at all eight folds.

**It also explains the fold-11 anomaly, which is a census accident and not an
exclusion.** The law predicts a single qualifying value 24 below G₂(T₇) = 30,
while U-FRAME §5 records fold 11 as having no qualifying gap at all. Both are
right: 24 is legal, and T₇'s gap set is {6, 12, 18, 30}, which contains no 24.

### The Alternation Lemma (PROVEN, and it is the prize)

A run is a walk on two states: from residue a only gaps ≡ 0 or −2 are legal, from
a−2 only 0 or +2. So the class word is a two-state walk rather than merely a word
avoiding three residues, and **along a run the non-zero class gaps must strictly
alternate** between class +2 and class −2. One class is small (2p∓2) and the other
large (4p±2), and they sum to exactly 6p. Hence L ≥ 3 forces a gap of at least
4p−2; L ≥ 2k+1 forces k of them; and the run's internal gaps average at least
3p − p/(L−1). **The operative threshold is 3p on a window, not 2p on a single
gap.** In quantitative form, with no independence assumption:
#(3-windows) ≤ 2(min(N_P, N_M) + N_Z).

**ATTRIBUTION (2026-08-19): the LEMMA is ours, the LANGUAGE FAMILY is printed.**
The two-state walk this lemma defines — non-zero marks strictly alternating in
sign — is a textbook constrained-coding object: it is the **B = 1 charge
constraint**, equivalently **alternate-mark-inversion**, in Marcus–Roth–Siegel
**§2.3 p. 47**, with its capacity in their **§3.2 p. 75** table. So the
strict-soficity of the constraint graph and its capacity ln 2 are REPRODUCTIONS
of printed results and may not be presented here as new structure. What stays
ours is the lemma's arithmetic content: that this is the constraint the fold
imposes at all, the 3/p → 2/p rate correction, the weight-(1,1,2) multiplicity
that puts the small class at 2p ∓ 2 and the large one at 4p ± 2 summing to
exactly 6p, and the wall address below (`IMPORT-MAP.md` row 2,
`history/staging/import-sofic.md`).

**The kill graph makes all of it computable on the old gap word alone.** Take 2D
nodes (i, σ), one per kill, with an edge (i, σ) → (i+1, σ′) iff σ′ − σ ≡ g_i
(mod p). Both degrees are at most 1, so the graph is a disjoint union of paths:
edges are the adjacent-kill pairs, components are the maximal runs, and L is the
largest component. All of it is O(D), with no fold in memory.

**And it explains the fold-29 dip, which nothing else did.** At fold 29 the
classes are +2 → 60 and −2 → 114, and every one of the 288 adjacent
qualifying-gap pairs in T₂₃ is (60, 60), both in the SAME class. Alternation
forbids all of them, so no run of three exists and L = 2. The dip is forced by
the lemma, not by scarcity. VERIFIED: every long run in the data is a strict
alternation, 48+90 and 90+48 at fold 23, 60+126 and 126+60 and 60+126+60 at fold
31, never 60+60. `research/operator-and-pair-count.md` carries the same check at
fold 37, the deepest we have.

### The proven bounds on L, and their transfer to κ(m)

**Theorem A (Run Cost, PROVEN; VERIFIED at ten primes).** Any two ADJACENT gaps
of a run sum to at least 6p, because min(class +2) + min(class −2) = 6p exactly.
Hence the span of a run of length L is at least c_min(L−1) ≈ 3p(L−1).
**Attained with equality at every fold with L ≥ 2, all seven.** At fold 31 the
extremal run is 60, 126, 60 = 2p−2, 4p+2, 2p−2, whose adjacent sums are 186 = 6p
to the unit.

**Theorem B (PROVEN, the first unconditional bound on L).**
L ≤ 1 + max{m : maxsum_m(T_x) ≥ c_min(m)}. It gives 2, 2, 2, 4, 4, 4, 5, 6
against the true 2, 1, 2, 2, 2, 3, 2, 4. The run-consistency condition alone
would give 3, 2, 8, 5, 11, 8, 10, 13, so the alternation condition roughly halves
the bound.

**Theorem C (PROVEN).** The argument never used adjacency, so it transfers to
κ(m): κ(m) ≤ max{k : maxsum_{m+k−2} ≥ c_min(k−1)}. Verified in all 56 cases.

### The wall, located precisely

The alternation condition is worth exactly 3/2 and no more: it raises the per-gap
floor from about 2p to exactly 3p, and the extremal runs attain it. That changes
the constant, not the branch. **Theorem B is structurally capped**, since
maxsum_m ≥ G₂ always, so it can never prove L below G₂/(3p) ≈ 0.18x, which is
LINEAR, the failing branch; its projection clears x² only to about x = 100.
Theorem C inherits the ceiling, so redirecting L to κ does not move the wall.

What remains is a decay hypothesis on runs of large gaps, and there are two sharp
reasons it is hard. It is a two-dimensional lower-bound sieve at sifting
parameter 1+o(1) against the dimension-2 sifting limit β₂ = 4.26645
(`research/dhr-verification.md`, rigorous, Booker and Browning). And **no polynomial moment of any
fixed order can give it**, because Markov at order k bounds the window fraction
below by (m̄/3p)^k independently of m, threshold and mean both scaling linearly in
m. Decay needs exponential moments, that is quasi-independence. Measured, Markov
sits flat at 0.32 to 0.48 while the true fraction falls one to two orders per
step.

*(CORRECTED 2026-08-18: this read "0.32 to 0.44", which drops fold 7's 0.4762.
The band came from `a3-05-bound-L.js` reading 6 and so did the identical band in
`research/a3-05-bound-L.md` section 7, so the two sites agreeing was descent, not
corroboration, and a prior wave marked both clean on the strength of it.)*

**The cap is more general than A5, and that is the bad news.**
`research/gate-multiplies.md` §§2, 5 shows it is exactly the linear cost feedback
of the no-fixed-point argument, so Theorem B is the supplier of the hypothesis
that closes every chain fed by it, and the Overshoot Budget then closes the whole
accumulating-index family on the tile.

### The lower bound never becomes exact, so L cannot be made irrelevant

Exactness of G₂(new) = maxsum₂(old) holds at 3 of the 9 ladder folds (11, 13, 19)
and over a grid of 329 (tile, prime) cells at rate 0.927. **It does trend, but
not along the ladder.** Binned by 2p/m̄ the exactness rate is 0.44, 0.39, 0.81,
0.91, 0.96, 1.000, clean and monotone. But the fold ladder is pinned near
2p/m̄ ≈ 2, the worst band, moving only 1.40 to 2.30 across folds 7 to 37, and on
a Mertens fit it reaches the safe band 2p/m̄ ≥ 4 only near x ≈ 130, a tile of
width 10⁵⁷. The excess over the lower bound runs 6, 0, 0, 12, 0, 18, 24, 18, 120:
it does not shrink, and the deepest reachable fold is by far the worst.

**Half the failure has a closed form (PROVEN, VERIFIED).** A miss whose record
carries a qualifying gap happens **iff p divides one of G₂(old), G₂(old)−2,
G₂(old)+2**: the record gap is then itself deletable at both ends, so the merge
takes both its neighbours. Predicted tile by tile with no errors and no false
alarms: T₅{7}, T₁₃{17}, T₁₇{53}, T₁₉{37}, T₂₃{101, 103}, empty for T₇ and T₁₁.
It is the sufficient half only, catching 6 of 24 misses; L ≥ 2 is necessary but
over-flags 45 cells. The real criterion is a size question rather than a residue
one: whether the best three-gap sum anchored at a qualifying gap beats the best
two-gap sum anywhere.

**Why that closes the route outright.** The divisibility event has chance about
3/p per fold, so it recurs forever, about 3·lnln x times. **Exactness can
therefore never hold from some level on**, and the hope of settling the growth law
by making L irrelevant is dead. The second mechanism is statistical and does
fade, since exactness is essentially certain once 2p/m̄ ≥ 4, but the arithmetic
one does not, which is why the fading half cannot rescue it.

**And no constant can replace the effective run length either.** The effective
run length of U-FRAME §5a step 3 is the better coordinate, never worse than L+1
and strictly better at three folds, but a constant value for it cannot exist, for
two independent reasons. The telescoping argument that would make it useful,
Σ_{p≤x} m_eff·m̄(p), is U-FRAME §5a step 4, and step 4 is false. And even taken at
face value it self-destructs: Σ_{p≤x} 3·m̄(p) ~ 7.2·x·(ln x − 1) falls **below**
the measured G₂ from about x = 45, so it would certify a bound smaller than the
truth. The data agrees directly, since the effective run length leaves 3 at fold 37, where
G₂(37#) = 528 overshoots maxsum₃(T₃₁) = 510 and a run of three wins.

### Where the L question stands

Theorem B is unconditional and structurally too weak, linear rather than polylog,
and it names exactly why. `research/f-decays.md`'s census supplies strong
evidence for the polylog branch and `research/operator-and-pair-count.md`'s
operator makes the tail computable exactly at any level in reach, but the step from L to G₂ went
through U-FRAME §5a step 4 and is missing. **The
interval difficulty is now concentrated in one scalar, P(gap ≥ 2p), and the
missing piece is no longer measurement but the valid replacement for step 4.**

**So the target is κ(m), and inside κ(m) the rarer of the two ±2 classes at 4p**,
a quantity 38 times smaller than the 2p count at fold 31 and 553 times smaller at
fold 29. That is a narrower hole in a better coordinate, and there is about L + 2
of headroom to spend in it. **Honest limit:** the independence model is exact at
L = 2, within 20% at L = 3, and over-predicts L = 4 by a factor of 70, and
nothing here shows min(N_P, N_M) decays, so A5's hole remains open.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*

**Closed 2026-08-19:** L has no law of its own — it is G₂ divided by the
block's own spacing, and it is super-additive on disjoint sets, so splitting
gives floors and merging gives G₂ back (`research/sift-limit-attack.md`
§7a-bis, §7a-ter); `L ≤ 62` supersedes the adjudicated `L ≤ 111`
(`research/OUTCOMES.md`).
