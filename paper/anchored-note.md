# Anchored versus random windows

*(Research note, 2026-08-17. Ten exactly computed levels of β through @41,
where W = 3.04·10¹⁴ and the current arithmetic stops; ensemble variance
certified through @37. Feeds Paper I §8(i) and Paper III. Under
moratorium: not for circulation. Every number regenerates from a named script
in research/.)*

## The wall, first

This note proves no case of the Twin Prime Conjecture. What it does is
separate, with exact objects, the window statistics we can prove (about a
window dropped at a uniformly random phase of the tile) from the single
statement we cannot (about the window anchored at phase zero), and then
compress the entire conjecture into the positivity of one exactly computable
function, the anchored bias β(x). The compression is a theorem (§7). The
weakest input the compression actually needs, non-annihilation of the
anchored tile infinitely often, is isolated in §8. The positivity of β is
Hardy-Littlewood-strength input, and we price it as such in §9.

## 1. Objects and instruments

Fix a level x. The **tile** has width W = x# (canonical alias: the primorial
wheel mod x#). The **Natal@5 comb** is

> N_x = { r ∈ [0, W) : r ≡ 11 or 17 (mod 30), and r mod p ∉ {0, p−2} for
> every prime 7 ≤ p ≤ x },

with |N_x| = N = 2·∏_{7≤p≤x}(p−2) (canonical alias: the admissible twin
residues 11, 17 mod 30 surviving the wheel primes; it carries two thirds of
the tile's census; the same comb, with the gcd form and the House-29 exclusion
spelled out, opens `paper/staircase-note.md` §1). The **scour depth** is
y = y(x), the largest prime ≤ √W; the **scour primes** are the primes q with
x < q ≤ y.

**The rotation ensemble.** At phase t, each scour prime q strikes the residue
classes {t mod q, (t−2) mod q}; the rotation ensemble puts t uniform. By CRT
the phase vector (t mod q)_q is distinct for every t ∈ [0, W), so the
strike-statistics ensemble has exactly W members and can be enumerated in
full (natal-cap-13-anchored-calm.js, header derivation). The window-count
instrument uses the full rotation of the deep pattern (period ∏_{p≤y} p,
comb phase included; natal5-variance.js); both ensembles contain the same
distinguished member.

**The anchored member** is t = 0: every prime's strike classes sit at
{0, −2} simultaneously, which is the arithmetic Scour itself (q kills qm and
qm − 2). Its survivors below the frontier are genuine twin primes, verified
exhaustively at @23: all 597,475 survivors cross-checked against a full
Eratosthenes sieve, zero failures (natal-cap-11-kstar23.js, part 0).

Three instruments measure the ensemble against the anchor.

1. **Window-count moments.** The exact pair correlation
   J₅(d) = (ρ₃₀(d)/30)·∏_{7≤p≤y} ρ_p(d)/p, with comb factor ρ₃₀(d) = 2, 1, 0
   for d ≡ 0, ±6, other (mod 30) and ρ_p(d) = p−2, p−3, p−4 by the class of
   d mod p, gives E and Var of the survivor count over rotations in closed
   form (natal5-variance.js).
2. **Per-prime strike statistics.** For each scour prime q, the pair-class
   count G(t, q) and its deviation dev(t, q) = G − 2N/q, aggregated into the
   variance ratio VR and the equal-weight statistic Z2
   (natal-cap-05-second-moment.js, natal-cap-13-anchored-calm.js).
3. **The march filtration.** Scour primes in ascending order; increments
   e_k = fresh_k − (2/q_k)·alive_{k−1} are exact martingale increments over
   the ensemble, with the endpoint identity
   final = N·∏(1−2/q) − Σ e_k f_k verified to the digit
   (natal-cap-07-trajectory.js; conditional mean and variance proven in
   natal-cap-14-discrepancy-lemma.md, Lemma 1).

## 2. The ensemble layer: proven and verified

**Exact moments.** For the window of length L = W at scour depth y, the mean
is E = δL with δ = (2/30)·∏_{7≤p≤y}(1−2/p), and the variance is the J₅ sum
Var = Σ_{|d|<L}(L−|d|)(J₅(d) − δ²). We verify the formula by brute force at
@7 over all 30,030 rotations (mean and variance match to 10⁻⁶) and by Monte
Carlo at @11 (300,000 samples) and @13 (20,000), all within sampling error
(natal5-variance.js, parts B and D). The computed table:

| x  | W               | E[S]           | Var            | Var/E | E/σ     | empty fraction ≤ Var/E² |
|----|-----------------|----------------|----------------|-------|---------|--------------------------|
| 7  | 210             | 6.92           | 1.05           | 0.152 | 6.7     | 2.20e−2 |
| 11 | 2,310           | 39.27          | 10.06          | 0.256 | 12.4    | 6.53e−3 |
| 13 | 30,030          | 304.28         | 91.13          | 0.299 | 31.9    | 9.84e−4 |
| 17 | 510,510         | 3,245.51       | 1,060.54       | 0.327 | 99.7    | 1.01e−4 |
| 19 | 9,699,690       | 41,441.19      | 14,392.59      | 0.347 | 345.4   | 8.38e−6 |
| 23 | 223,092,870     | 669,028.80     | 243,740.37     | 0.364 | 1,355.1 | 5.45e−7 |
| 29 | 6,469,693,230   | 14,063,617.40  | 5,307,862.63   | 0.377 | 6,104.3 | 2.68e−8 |
| 31 | 200,560,490,130 | 328,601,798.62 | 127,363,168.00 | 0.388 | 29,117.1| 1.18e−9 |
| 37 | 7,420,738,134,810 | 9,377,228,928.8 | 3,711,451,136 | 0.396 | 153,923 | 4.22e−11 |

The four deepest rows are certified with explicit roundoff bars: ±3.1e−3 at
@23, ±1.4 at @29, ±7.4e2 at @31 (relative 4.6e−9, 2.6e−7, 5.8e−6;
natal-cap-16-fast-variance.js) and ±8.2e5 at @37 (relative 2.2e−4;
natal-cap-33-overnight.js, RUN 3, which reproduced all eight prior levels
inside their bars before extending, and whose sieve-side E(37) agrees with
the independent march-side E(37) of RUN 2).

The count is sub-Poisson: Var/E drifts from 0.152 to 0.396 across the nine
levels (measured; the ratio is not a universal constant, and the shape of its
drift is Paper III's open question; see paper/variance-note.md §6). The last column is the **almost-all theorem** at
each level: by Chebyshev, the fraction of rotations with zero survivors is at
most Var/E², i.e. at most 1.01e−4 at @17 and 4.22e−11 at @37. No empty
rotation has ever been observed; the minima are 24 against E = 39.3 at @11
and 264 against E = 304.3 at @13.

One refutation belongs in this layer and stays visible: the theorem-valid
martingale upgrades lose to the endpoint Chebyshev bound. McDiarmid's
exponent at @17 is 1.80 (bound 1.65e−1 against Chebyshev's 1.01e−4), and the
gap widens with x because the first scour prime's worst-case increment is of
the same order as E (natal-cap-07-trajectory.js, reading 6). The e^{−311}
Freedman ceiling computed there is conditional on the unproven discrepancy
control of §10 and is not a theorem.

## 3. The anchored drift, and why measure cannot reach the anchor

The anchored member's own numbers, against the ensemble
(natal5-variance.js part C; @23 from natal-cap-11-kstar23.js and
natal-cap-16-fast-variance.js; @29 from natal-cap-18-at29.js and
natal-cap-16; @31 from natal-cap-22-at31-drift.js and natal-cap-16; @37 from
natal-cap-33-overnight.js, RUNs 2 and 3):

| x  | S(x) anchored | E(x)         | β = S/E | z = (S−E)/σ |
|----|---------------|--------------|---------|-------------|
| 7  | 8             | 6.92         | 1.1556  | +1.05 |
| 11 | 45            | 39.27        | 1.1458  | +1.81 |
| 13 | 307           | 304.28       | 1.0089  | +0.28 |
| 17 | 3,099         | 3,245.51     | 0.9549  | −4.50 |
| 19 | 38,380        | 41,441.19    | 0.9261  | −25.52 |
| 23 | 597,475       | 669,028.8    | 0.8930  | −144.9 |
| 29 | 12,307,838    | 14,063,617.4 | 0.8752  | −762.1 |
| 31 | 283,449,187   | 328,601,798.6| 0.8626  | −4000.9 |
| 37 | 7,998,394,865 | 9,377,228,928.8| 0.8530 | −22,632.9 |
| 41 | 256,725,962,834 | 303,627,067,641.7| 0.8455 | not yet (Var@41 uncomputed) |

The bias is proportional and deterministic: β descends smoothly
1.156 → 0.846 across ten levels while σ/E shrinks like √(Var/E)/√E. In σ-units the anchored
deviation therefore diverges. The march-level analysis separates this drift
cleanly from fluctuation: after removing a 9-step moving average, the
anchored increments have autocorrelation ≈ −0.09 and Gaussian-scale tails
(max |z| = 3.02 in 164 steps across levels), so the dangerous component of
the anchored trajectory is 100% drift, not noise
(natal-cap-07-trajectory.js, readings 3 and 4).

**Proposition 1 (measure-theoretic bounds cannot decide the anchored
question).** No bound of the form "at most a fraction ε(x) > 0 of rotations
have zero survivors" decides whether S(x) > 0 for all x.

*Proof sketch, calibrated.* (i) Exact counting logic: the ensemble has W
members and the anchor is one of them. A bound with exceptional fraction ε
admits up to εW exceptional members and says nothing about which they are;
it decides the anchor only if εW < 1. The second-moment bound gives
ε ≈ (Var/E)·(1/E) ≍ ln²W / W (measured: 8.38e−6 at @19 against the decision
threshold 1/W = 1.03e−7, a factor 81 short and growing like ln²W; that 81
pairs the window ensemble's ε with the rotation ensemble's cardinality and
is not to be quoted without both, per `paper/wall-note.md` §2 Face 1 as
corrected 2026-08-27, where the self-consistent readings are e^3025 in the
window ensemble at x = 19 and 1,682 in the rotation ensemble at x = 17), and the
theorem-valid martingale bounds are weaker still (§2). (ii) The structural
part, measured: the anchor deviates from the ensemble mean by |z| → −∞ along
the observed points. Any tail bound sharp enough to localize S(0) must be
stated at deviation depth |S − E| = (1 − β)E, and at that depth the bound
must admit at least one member, because the anchor itself deviates that far.
So every valid measure bound at the relevant depth has a nonempty allowance,
and the anchor is always eligible to fill it. Part (i) is exact; part (ii)
assumes the two measured trends persist (β stays below 1 − δ from @17 on,
Var/E stays bounded). ∎

In words: the variance program proves everything about the ensemble, and by
measuring the anchored drift it proves that ensemble typicality is the wrong
tool for the one member we need (natal5-variance.js, reading 6).

## 4. The anchored calm, measured; the loud fixed point, proven

Against the exact full-rotation control (every rank below is exhaustive
enumeration, not sampling; natal-cap-13-anchored-calm.js):

- On VR, the anchored phase sits at percentile 1.84 at @11 (rank 42 of
  2,310), 3.94 at @13 (rank 1,182 of 30,030), and 0.002 at @17 (rank 10 of
  510,510, i.e. five mirror pairs calmer). On the equal-weight Z2 at @17 the
  rank is **2 of 510,510**: one mirror pair (t = 132521 = 89·1489 and its
  partner) beats the anchor.
- The suppression is per-prime uniform: within each prime the anchored class
  pair {0, −2} sits at mean |dev| percentile 0.396 / 0.415 / 0.397 against
  the null 0.5, below half for 82 of 120 primes at @17. That is the profile
  of a mechanism, and not the profile of a lucky draw, which concentrates
  in a few primes (reading 5 there). Status: measured, with the mechanism
  since part-proven: the fusion identity and the exact −1/2 anticorrelation
  constant are theorems, and the remaining unproven steps are listed in §10
  (natal-cap-19-calm-lemma.md, natal-cap-23-covadj-proof.md,
  natal-cap-26-minus-half.md).
- Every structured family tested (seam phases, 7-smooth phases, phases near
  0) is ensemble-generic, with median VR percentiles between 46 and 62. The
  calm does not extend to any tested structure class.
- **The counterpoint at W/2 is a theorem.** The mirror μ(r) = W−2−r maps N_x
  to itself, so every rotation statistic satisfies stat(t) = stat(W−t), and
  t = W/2 is the unique mirror-fixed phase in the window. There, strikes
  arrive in mirror pairs: G(W/2, q) is even for every scour prime (verified
  at all three levels), the house split is exactly zero, and deviations move
  in steps of 2, doubling the variance. Prediction VR(W/2) ≈ 2; measured
  2.78 / 1.67 / 2.14, the loudest rotation of the entire ensemble at @11 and
  @17 and the 99.3rd percentile at @13.

The ensemble's two arithmetically distinguished phases occupy the two
opposite extreme tails, the loud one by proof, the calm one by measurement
with its mechanism still open. Two earlier "calm" sightings dissolved under
this exact control and stay refuted on the record: the sub-binomial house
splits belong to every rotation, and the head pair overlaps put the anchor
on the overlap-rich side, 94.3rd percentile (reading 2 there).

A third refutation belongs here, and it is the one that matters for the rest
of the note. The natural reading of the calm, that a quiet strike profile is
what keeps the anchored tile populated, is false. Across the ensemble the
correlation between the variance ratio and the survivor count is
corr(VR, S) ≈ 0 (natal-cap-31-calm-vs-kill.md). The calm is a statement about
strikes, and survival is decided somewhere the strike statistics cannot see.
Section 10 names that somewhere.

## 5. The three-phase anchored law

Hold a window [0, X] fixed and let the level grow through it. Measured at
X = 10⁴ (attack-10-anchored-origin.js; formalized in anchored-windows.md,
§3): the anchored density ratio ρ = C(X)/(δX) traces three phases. While
p³ < X it is equidistributed, ρ = 1.000 ± 0.005. Near p² ≈ X it dips into a
trough, measured 0.953 at p = 67, with HL-conditional asymptotic depth
e^{2γ}/4. Past p² > X it rises as the global density dilutes, capped at
e^{2γ} ≈ 3.172 (measured peak 2.01), and finally decays to zero as p → X
because the window's twins graduate into the wheel. The original attack-10
reading claimed divergence in the third phase; that claim was wrong, and the
correction is recorded in both files.

The law is consistent with the Unification Law's curve ρ(u) = e^{2γ}/u² for
u = ln X / ln p ≤ 2, which reproduces both the cap e^{2γ} and the zone-edge
trough e^{2γ}/4 (measured consistency; the law's constants are
HL-conditional, with Brun-certified upper bounds only). The β(x) drift of §3
is this same trough read along the diagonal X = W at scour depth √W, which
is where the conjectured limit in §7 comes from.

## 6. The formal object

Define, for each level x:

> **S(x)** = the anchored survivor count: members of N_x escaping the strike
> classes {0, −2} of every scour prime q ≤ y(x);
> **E(x)** = (2/30)·∏_{7≤p≤y(x)}(1 − 2/p)·W, the exact rotation-ensemble
> mean;
> **β(x) = S(x)/E(x)**, the anchored bias.

Both S and E are exactly computable; the pair has been computed through @41,
where W = 304,250,263,527,210 and the scour is 1,117,922 primes (table in §3).
Chain of custody: the CRT-30 engine of natal-cap-22-at31-drift.js re-derived
all seven prior levels digit-for-digit before the @31 run, and the @37 march
(natal-cap-33-overnight.js, RUN 2) reproduced S(31) = 283,449,187 and the
whole 37,534-prime scour of @31 before extending, the same discipline
natal-cap-11-kstar23.js applied against natal-cap-08. The @37 run's primality
layer is deterministic Miller-Rabin to 3.186e14, which covers W = 37#.

**Lemma 1 (unconditional divergence of the mean).** E(x) → ∞.
*Proof.* δ = (2/30)·∏_{7≤p≤y}(1−2/p) = (1/3)·∏_{2<p≤y}(1−2/p), since
(1−2/3)(1−2/5) = 1/5. By the two-class Mertens asymptotic
∏_{2<p≤y}(1−2/p) ~ 4C₂e^{−2γ}/ln²y. The elementary lower bound uses
1−2/p = (1−1/p)²(1−1/(p−1)²), the positive convergent product of
the last factors, and Mertens' theorem, giving ≫ 1/ln²y. The inequality
1−2/p ≥ (1−1/p)² would have the wrong direction. Since y ~ √W,
E(x) ~ (16/3)·C₂·e^{−2γ}·W/ln²W → ∞. Effective versions
(Rosser-Schoenfeld) make the lower bound explicit. ∎

**Lemma 2 (survivors are twin primes).** Every anchored survivor r at level
x satisfies r > y(x), and (r, r + 2) is a pair of primes.
*Proof.* A survivor r ≡ 11 or 17 (mod 30) escaping every strike class has
the property that neither r nor r + 2 is divisible by any prime ≤ y except
possibly itself; a survivor r ≤ y would be struck at position q = r or
q = r + 2 (the self-strike), so r > y. If r were composite it would have a
prime factor ≤ √r ≤ √(W−1) < √W, hence ≤ y, which survival excludes; so r is
prime. If r + 2 were composite it would have a prime factor p ≤ √(r+2) ≤
√(W+1), and the only room left is √W < p ≤ √(W+1). An integer n in that
interval satisfies W < n² ≤ W+1, forcing n² = W+1. But W = x# ≡ 2 (mod 4) for
every x ≥ 2, since the factor 2 appears exactly once, so W + 1 ≡ 3 (mod 4),
and no square is ≡ 3 (mod 4). No such p exists, so r + 2 is prime as well.
Verified besides at @23: 597,475 of 597,475
(natal-cap-11-kstar23.js, part 0; the twin ledger closes to the integer,
597,650 = S + 175 self-strikes). ∎

## 7. The one assumption and the conditional theorem

**Assumption A (positivity of the anchored bias).** There exist c > 0 and x₀
with β(x) ≥ c for all x ≥ x₀. Equivalently: liminf β(x) > 0.

**Conjectured sharp form.** β(x) → e^{2γ}/4 = 0.793055, the Unification-Law
zone-edge value.

**Theorem (conditional).** Under Assumption A there are infinitely many twin
primes, and every tile at level x ≥ x₁ contains a twin pair, with x₁
computable from (c, x₀).

*Proof.* For x ≥ x₀, S(x) ≥ c·E(x). By Lemma 1, E(x) → ∞ with an explicit
effective lower bound, so there is a computable x₁ ≥ x₀ with c·E(x) ≥ 1 for
all x ≥ x₁. S(x) is an integer, so S(x) ≥ 1: by Lemma 2 the tile contains a
twin prime pair with both members above y(x). Since S(x) ≥ c·E(x) → ∞, the
number of distinct twin pairs below W(x) is unbounded, so the set of twin
primes is infinite. ∎

The implication is exact, and its economy should be stated plainly. Sieve
theory already proves the ensemble mean diverges: that is Lemma 1, Mertens
and nothing more. Integrality does the rest. Assumption A asserts only that
the anchored member retains a positive fraction of its own ensemble mean.
The entire Twin Prime Conjecture, in this framework, lives inside that
single ratio, in the sense that positivity suffices. No converse is claimed,
so Assumption A is at least as strong as the conjecture and may be strictly
stronger.

## 8. The weakest sufficient statement

The conditional theorem uses Assumption A at full strength, but the
compression needs far less. The reduction rests on one structural fact:
anchored survivors cannot be small.

**Lemma 3 (survivors exceed √W).** Every anchored survivor r at level x
satisfies r > √W.
*Proof.* By Lemma 2, r is prime and r > y(x). Every prime ≤ √W is ≤ y,
since y is the largest such prime; so r > √W. ∎

The same fact is visible from the kill direction: a natal slot below √W is
either bulk-killed by a scour prime ≤ √W or self-struck at its own position
(the self-strike at q ≤ y removes the slot (q, q + 2) while recording it as
a twin below the frontier), so nothing below √W reaches the survivor ledger
(scour-into-fixed-tile.js, readings 2 and 3a). Verified at @31: the first
survivor is 448,157, above √W ≈ 447,840 and above y = 447,829
(natal-cap-22-at31-drift.js, first-survivors line).

**Proposition 2 (weakest sufficient statement).** If S(x) ≥ 1 for
infinitely many x, then there are infinitely many twin primes.
*Proof.* For each such x, any survivor r is a twin pair (r, r + 2) by
Lemma 2, with r > √(x#) by Lemma 3; √(x#) → ∞, so the pairs found are
unbounded. ∎

This is the weakest target a proof in this framework must hit: no density,
no positivity of β, no lower bound of any exponent, only non-annihilation
of the anchored tile infinitely often. Assumption A is one way to hit it,
and a strong one: it forces S(x) ≥ c·E(x) → ∞ at every large level, where
Proposition 2 asks for a single survivor at infinitely many levels. The
measured margin makes the gap between the apparent truth and the need
concrete: at @41 the tile keeps S = 256,725,962,834 survivors against the
needed 1. Nothing in that margin weakens the wall of §9; the parity
obstruction blocks the lower bound "at least one" as surely as it blocks
"a positive fraction". But it locates the wall exactly, and it shows how
much slack the truth appears to carry over the statement a proof requires.

## 9. The price of Assumption A

We do not present Assumption A as small. It is Hardy-Littlewood-strength,
and the accounting is as follows.

The sharp form is HL itself: since E(x) ~ (16/3)C₂e^{−2γ}W/ln²W (Lemma 1)
and the comb carries the twins ≡ 11, 17 (mod 30), the statement
β(x) → e^{2γ}/4 is algebraically equivalent to
π₂-on-the-comb ~ (4/3)C₂W/ln²W, the Hardy-Littlewood asymptotic in Mertens
normalization. The weak form β ≥ c is a positive-proportion HL lower bound
in the anchored interval [0, W], which is exactly the class of statement the
parity obstruction blocks: two-class sieves carry a parity floor of 2
against the needed constant 1.28 at @17 (natal-cap-10-sieve-cap.md,
Selberg's examples, Tao's account), and our literature dive found no
published lower bound of any exponent on the *count* of a two-classes-per-prime
sifted set (covering-dive.md, §2.2, a systematic negative result). The
two-class *gap* is a different object and now carries a proven lower bound,
G2(x#) ≥ g(x#) pointwise and hence
≫ x·log x·logloglog x/loglog x (two-class-lower-bounds.md §3); nothing in that
transfers to the count, which is where Assumption A sits.

Assumption A is the assertion that the anchored tile is not conspiratorial:
that the one phase where every prime's strike classes align at {0, −2},
forever, never conspires to erase the comb. The same wall shows this face
elsewhere in the framework, and the equivalents are on record. On the
two-moiré face, "misaligned on average" is a theorem and "misaligned in
every window" is TPC (two-moire-argument.md, verdict section). On the
variance face, "the anchored ratio stays bounded away from 0 forever" is
named as Hardy-Littlewood-strength input in natal5-variance.js, reading 6.
On the covering face, Assumption A says the classes {0, −2 mod q} over
primes q > x never cover the comb inside one tile: the infinite version of
that covering question is settled (Hough 2015, via covering-dive.md), and
the windowed version is the conjecture again. Parity, in its cleanest
costume yet: one number per level, exactly computable, measured ten times,
descending a smooth curve toward a predicted positive limit.

## 10. What would move it

**The anchored calm, and which of its parts are theorems.** The suppression
target of the calm campaign has advanced from a sighting to a proven mechanism
with an unproven last step. There is no single object here to call a lemma: the
parts carry four different calibrations and they are listed separately below,
with the status table in `research/anchored-calm.md`.
The fusion identity is proven: dev(0, q) is the deviation of one cyclic
window of length L_q ≈ 2W/q in the tile's own dilated natal pattern, the
mirror gluing the two strike classes into a single window at the anchor and
duplicating them at W/2 (natal-cap-19-calm-lemma.md, Lemmas 1 to 3). The
anticorrelation constant behind the fused window's small variance is exact:
for every level and every q coprime to 30, the flat spectral functional
equals −1/2 with no error term, because the comb's two teeth sit 6 apart in
the 30-wheel and the comb therefore kills the lags h = 1..5 identically
(natal-cap-26-minus-half.md, Theorem 2). The deviation from −1/2 reduces
exactly to two residue-class correlation sums, computed for all 599 scour
primes at @11 through @19 with aggregate R between −0.29 and −0.40 at every
level (natal-cap-23-covadj-proof.md; natal-cap-26, Propositions 3 and 4). Only
the aggregate form is claimed: the uniform-in-q form is **refuted**, 595 of
those 599 primes anticorrelating and the four exceptions being sparse, weak and
cataloged, with six counterexamples known once the deeper levels are counted
(natal-cap-23-covadj-proof.md; status table in research/anchored-calm.md). The
aggregate form is what the measured calm actually uses.
The remaining leg has since been reduced twice. The aggregate skeleton bound
is exactly the statement G30_agg(x) < 1/2, and the **Skeleton Collapse
Theorem** shows that the 2ⁿ branch ledger behind it collapses to a single
kernel K = 15C − 2P, for all x and all q (natal-cap-30-skeleton-bound.md).
With the kernel in hand the bound is certified in exact BigInt at @11 through
@29, at 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176, against the 1/2 it has
to beat. The @29 value was reproduced during the 2026-08-17 consistency
campaign. The six values are flat within their own spread after @11 rather than
trending down, and the deepest level is not the lowest: the minimum is 0.0945
at @23, which retires the reading the five-level ladder invited and brings back
the worry that the offset does not trend downward. So the leg is a theorem for
x ≤ 29. The all-x blocker is now named
precisely, and it is analytic rather than algebraic: branch algebra cannot
certify it, because the skeleton is close to total cancellation and the
denominators are calm-small. What is needed is equidistribution of ⌈W/q⌉
mod 30 over the scour primes, plausibly Siegel-Walfisz adjacent. One further
leg remains measured only: the 0.94 anchored typicality one level down.
Closing both would turn
the calm into a theorem and, fed through the proven conditional-variance
formula Var[fresh | past] = (2/q)(D² + R₂) (natal-cap-14-discrepancy-lemma.md,
Lemma 1), would control the anchored march's fluctuation term rigorously.
The drift term, which is where Assumption A lives, would remain.

**The X-channel: where Assumption A actually lives.** The survivor count
decomposes into a strike part and an overlap part, and the two are not
comparable in importance. Writing X for the overlap credit of §1 read as a
fluctuating quantity, rather than as the total it appears as in the census
identity, the survivor fluctuation migrates into X as the level rises:
corr(X, S) = 0.48, 0.91, 0.99 at @11, @13, @17, against corr(VR, S) ≈ 0 at all
three, and by @17 the strike channel carries 2.7% of Var(S), so 97% of the
fluctuation is overlap credit (natal-cap-31-calm-vs-kill.md, by full
enumeration of all 2,310 / 30,030 / 510,510 rotations).
Two results follow, and they sharpen §9 considerably.

The first is the **X-limitation theorem**: strikes alone cannot annihilate the
natal set at any loudness. However the scour primes' strike classes are placed,
the capacity to remove is not the binding constraint; annihilation requires an
overlap collapse of 8 to 15 σ_X. The theorem is proven at @11, @13, @17 and
@19. It carries content at @13 and above, since @11 is closed outright by a
separate annihilation-exclusion result, one inequality and seven checks. Its
extension to every level above **@19** rests on measured trends rather than on a
proof, and of the two trends one broke and one held. The ensemble maximum of VR
is enumerated at **four** levels, 2.78, 2.35, 2.14, 2.293 at @11, @13, @17, @19,
the last over all 9,699,690 rotations, **so max VR falls and then rises again
rather than staying on a trend**. The driver S̄/√(K·V̄) keeps growing, 3.12,
4.88, 9.75, 24.96, and it is the leg that matters: the per-level hypothesis is
exactly √(K·V̄·max VR) < S̄, so computing the @19 driver is what proved the
theorem at that level. The margin on the squared form runs ×3.5, ×10.1, ×44.4,
×271.7, growing faster than linearly in the level, while the strike channel
max|D| falls from 53.5% of S̄ at @11 to 6.1% at @19.

The second is a restatement of Assumption A in its true channel. Assumption A
is the assertion that **the anchored overlap-credit deficit stays below
(1 − ε)·S̄**. The anchor is measurably in deficit here and the deficit is
drifting: X(0)/X̄ = 1.4541, 0.9908, 0.9482, **0.9558** at the **four** exactly
computed levels @11, @13, @17, @19 — so the anchor crosses from surplus into
deficit between @11 and @13, and then **the descent breaks upward at @19**.
*(This sentence read "X(0)/X̄ = 1.45, 0.991, 0.948 at the three exactly computed
levels, descending through 1", written before the @19 row existed. The @19
value 0.9558 is printed by `natal-cap-35-x-multiplicity.js`, whose own header
records that "the reading of X(0)/X̄ = 1.45, 0.991, 0.948 breaks at @19". Note
the paragraph above already counted four enumerated levels for max VR; the two
counts disagreed twelve lines apart until 2026-08-18.)* Three points fell and
the fourth rose, so what the channel shows is a crossing followed by a turn,
not a monotone descent, and the "same descent β is making" reading is available
only at @11–@17: β keeps falling at @19 (0.9261) while X(0)/X̄ does not. With
one turning point on four points, neither a continued descent nor a floor near
1 is distinguishable from the data.

One warning belongs on the record with this. The anchored overlap deficit
lives in multiplicity m ≥ 3: at the anchor, the pair statistic P₂ reads
z = −0.30 while X reads z = −2.71. Pair-based instruments, which is to say
almost every second-moment method including the T₄ route of §2, see the
deficit dimly. Any attempt to bound β from below through pair correlations is
working in the wrong multiplicity, and the measured numbers say by how much.

**The drift's decay law: the @31 and @37 verdicts.** The march at W = 2.01e11
measured β(31) = 0.8626 exactly (natal-cap-22-at31-drift.js). Against the
on-record forecasts: classical-raw 0.8610 (miss +0.0016), free-linear
0.8605 (+0.0020), pinned-linear 0.8720 (off by −0.0094, dead at @29 and
deader now). The verdict lives in the residual sequence, not the point:
against the zero-parameter classical correction
(e^{2γ}/4)·(1 + 2/lnW + 6/ln²W) the residuals run
+0.0046 → +0.0026 → +0.0016 at @23, @29, @31, a third consecutive collapse
with no knob turned, and the classical series is now the settled
description at every computed level. The free-linear intercept keeps
sliding down as the window deepens (0.7650 → 0.7621 → 0.7577), a straight
line in 1/lnW chasing curvature it cannot represent. Fitted on every measured
level, the free intercept sits near e^{2γ}/4 = 0.7931 and drifts with each
new point: 0.7890 on the first eight levels, 0.7860 on all nine (ordinary
least squares of the §3 β column against 1/lnW; the eight-point figure
reproduces the one on record). We read the proximity as consistency, not as
evidence: an intercept that moves when a point is added is not measuring a
limit. The @37 forecasts
went on record (classical-raw 0.8520, about 0.8530 with the
decaying-residual allowance; free-linear 0.8479; pinned 0.8598) and the
march then measured β(37) = 0.8530 exactly on the classical figure: the
fourth consecutive residual collapse, +0.0046, +0.0026, +0.0016, +0.0010
(natal-cap-33-overnight.js).

The @41 forecasts went on record in the same way, frozen before the run:
classical-raw 0.8449, classical plus the persisted residual 0.8459,
free-linear 0.8443, pinned-linear 0.8488. The march measured
β(41) = 0.8455 at W = 304,250,263,527,210, with S(41) = 256,725,962,834
against E(41) = 303,627,067,641.7 (natal-cap-37-at41-march.js: **6.035 hours
over the eight shards**, after reproducing @7 through @29 digit-for-digit and
S(31) and S(37) exactly through the same sharded code path — 6.160 hours for
the job as a whole, the reproduction gates being the other 450 s). *(The
sentence used to read "6.16 hours over eight shards, after reproducing …",
which charged the shards with time the gates spent and so double-counted the
reproduction it describes as coming first. The two figures are the log's own:
`all 8 shards returned in 6.035 h` and `[at41 done in 22176.3s = 6.160 h]`.)*
**S(41) has one witness.** The march has been run to completion exactly once,
and the corpus should say so wherever it leans on @41: the killed first attempt
agrees with it digit for digit at every shared progress tick, but that covers
about 1.3% of the tile and establishes determinism rather than correctness, and
the eight shard files that reconcile to S(41) and N(41) are that same run's own
output. Gate custody is complete through @37 and single-shot at @41. A second
independent march is six hours of ten cores and is the only thing that would
make @41 as well-attested as @31 and @37. The closest
forecast is classical-plus-residual, missing by −0.0004, with classical-raw
next at +0.0006; pinned-linear misses by −0.0033 and stays dead. That is a
**fifth consecutive residual collapse**: +0.0046, +0.0026, +0.0016, +0.0010,
+0.0006. Five collapses, each forecast before its run, leave the zero-knob
classical series without a rival description at any computed level.

The honest caveat stands and has if anything sharpened: the remaining gap
to the conjectured limit, 0.0525, is now 87 times the deepest residual,
so the limit reading is extrapolation-supported, not observed. The
free-linear intercept fitted on the last four levels is 0.7830 with rms
0.0002, and on all ten levels 0.7842, both near e^{2γ}/4 = 0.7931 and both
still moving. The next level, @43, is beyond this engine: W = 1.308e16
exceeds 2^53, which is exactly where the CRT anchoring product stops being
exact, so @41 is the last level the current arithmetic can reach. The
forecast for @43 is on record anyway at 0.8393 classical-raw, 0.8399 with
the persisted residual.

**The Mertens-versus-HL structure of the limit.** The finite-Mertens
correction u(y) is already 0.9983 at @23 while β is 0.8930: the remaining
drift is not the Mertens product catching up to its own limit, it is the
HL-shaped 1/lnW term. Splitting β's descent into the provable Mertens
bookkeeping and the genuine HL content is finite computation at every level,
and it locates exactly where a proof of any positive lower bound would have
to bite.

## 11. Honesty

The weakest point of this note is its central object: nothing here bounds
β(x) from below, and a compression can flatter. The same wall has been
stated equivalently before, including as the gap inequality G₂(n) < W, and
anchored-windows.md §6 records the vacuity warning that "anchored ≥ minimum
over windows" is circular. What the present form adds is that both sides of
the one assumption are exact computable numbers with a measured trajectory,
and that the proven layer around it (the moments, Proposition 1's part (i),
the W/2 mechanism, Lemmas 1 and 2) is machine-verified.

Further caveats, in the open. Proposition 1's part (ii) extrapolates two
measured trends and is marked as such; part (i) alone carries the proven
content. The conjectured limit e^{2γ}/4 is supported by the collapsing
residual sequence but not observed: the gap to the limit is 87 times the
deepest residual (§10), and the fits alone admit any limit roughly in
[0.74, 0.82] (natal-cap-11-kstar23.js, reading 7). The ensemble variance is
now certified through @37 (natal-cap-16-fast-variance.js through @31, with
roundoff bar ±7.4e2 there; natal-cap-33-overnight.js RUN 3 at @37, bar
±8.2e5), so the z column of §3 runs the full nine levels. And
the refutations this note stands on remain visible: attack-10's divergence
claim (corrected in anchored-windows.md), two of the four calm sightings
(dissolved in natal-cap-13, reading 2), the martingale bounds losing to
Chebyshev (natal-cap-07, reading 6), and the 0.79325 rounding slip
(corrected in natal-cap-11).

## Authorship and AI disclosure

Sole author: Chris Benjaminsen.

> The framework, vocabulary, and driving questions are the author's,
> developed over six years of independent work. Formal derivations,
> literature audits, computations, and manuscript drafting were carried out
> using an AI assistant operating under the author's
> direction; all results were verified by explicit computation, with code
> and outputs published in the accompanying repository, and all refuted
> intermediate claims retained in the record.
