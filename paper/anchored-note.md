# The anchored bias β(x): an exactly computable finite form of the twin prime question

*Draft 2, 2026-09-18, revising Draft 1 (return #41, 2026-09-11) after referee report #67 (@Benjaminsen, gpt-6-astra; reject with itemised corrections) and advisory review #25 (@natepac, claude-opus-5). Internal to the primeoire repository; the publication moratorium is in force and this document is not submission copy. Prose follows `paper/writing-style-math.md`. Grade and triggers are carried by `paper/proposals/prop-anchored-note.md` (HELD, last regraded 2026-08-19, reviewed 2026-09-06); the suite architecture is `paper/PAPERS.md`. The mathematics and every number are the research note's, `paper/anchored-note.md` (2026-08-17, eleven sections), and its leaf notes in `research/`. This document is the short-note form the proposal's §2 names as the alternative to holding: the Hardy–Littlewood equivalence in the abstract, the title on the compression. Writing it does not move the grade; that decision is the owner's.*

**Author.** Chris Benjaminsen.

**Methods and AI disclosure** (the statement adopted for the suite, `paper/PAPERS.md`, adapted to this note): the framework, vocabulary, and driving questions are the author's, developed over six years of independent work. Formal derivations, literature audits, computations, and manuscript drafting were carried out using AI assistants operating under the author's direction; computations have reproducible code and recorded outputs, asymptotic arguments require their stated mathematical inputs and are not proved by finite checks, and all refuted intermediate claims are retained in the record.

---

## Abstract

Fix a prime x, let W = x# be the product of the primes at most x, and let y be the largest prime with y² ≤ W. Sieve the residues r ∈ [0, W) with r ≡ 11 or 17 (mod 30) by every prime 7 ≤ p ≤ y, deleting the two classes r ≡ 0 and r ≡ −2 (mod p). The survivor count S(x) is exactly the number of twin prime pairs (r, r + 2) with √W < r < W and r ≡ 11 or 17 (mod 30) (Lemma 2 and its converse, (3.1)). Let E(x) be the mean survivor count when the same two-class sieve is applied at a uniformly random phase of the depth-y pattern, an exact Mertens product, and let β(x) = S(x)/E(x) be the **anchored bias**. We prove:

- E(x) → ∞ unconditionally (Lemma 1), so if liminf β(x) > 0 then every tile beyond a computable level contains a twin pair and there are infinitely many twin primes (Theorem 1);
- the weakest statement the compression needs is S(x) ≥ 1 for infinitely many x, and that statement is equivalent to the infinitude of twin primes with lower member ≡ 11 or 17 (mod 30) (Proposition 2);
- β(x) → e^{2γ}/4 = 0.79305… is equivalent to the combined two-class asymptotic π₂^{comb}(x#) ~ (4/3) C₂ x#/ln²(x#) along the primorials (§6): the Hardy–Littlewood conjecture in the progressions 11, 17 mod 30 implies it, and it is that conjecture read at the primorial endpoints for the two classes together; the converse to the full conjecture is not proven. The hypothesis of Theorem 1 is therefore a positive-proportion Hardy–Littlewood lower bound along the primorials, and we price it as such;
- no bound of the form "at most a fraction ε(x) of rotations have zero survivors" decides whether S(x) > 0 unless εW < 1, and the second-moment bound ε = Var/E² misses that threshold at every one of the nine computed levels, by factors εW growing from 4.6 at x = 7 to 313 at x = 37 (Proposition 1(ii)); the factor is ≍ ln²W if Var/E stays bounded away from 0 and ∞, which is measured (0.15 to 0.40) and not proven.

We compute S(x) and E(x) exactly at the ten levels x = 7, 11, …, 41, where W reaches 3.04·10¹⁴ and the scour is 1,117,909 primes: β descends 1.156, 1.146, 1.009, 0.955, 0.926, 0.893, 0.875, 0.863, 0.853, 0.846, and its residuals against the zero-parameter classical series (e^{2γ}/4)(1 + 2/ln W + 6/ln²W) decrease through the last five levels, +0.0046, +0.0026, +0.0016, +0.0010, +0.0006; the runs at x = 31, 37 and 41 tested values of that series recorded before them, while at x = 23 and 29 the series was evaluated after the fact. The limit is extrapolated, not observed: the gap to e^{2γ}/4 is 82 times the deepest residual. Nothing here bounds β from below, no case of the twin prime conjecture is proven, and the note says where the parity obstruction sits in this form: in one exactly computable ratio, measured ten times.

---

## 1. The wall, first

This note proves no case of the Twin Prime Conjecture. Its content is a compression: the conjecture, on the anchored side, is equivalent to the positivity of one exactly computable function, and its Hardy–Littlewood form is equivalent to that function's limit. A compression can flatter, and the record's own vacuity warning applies (`research/anchored-windows.md` §6: "anchored ≥ minimum over windows" is circular). What the note adds to the wall is coordinates: both sides of the one assumption are integers and exact products, computed at ten levels, with a measured trajectory and a forecast that has held at the three levels where it was recorded in advance. The assumption itself is Hardy–Littlewood-strength and is priced in §6.

## 2. Objects

**The tile and the comb.** Fix a prime x ≥ 7 and write W = x# (canonical alias: the primorial wheel mod x#). The **comb** is

> N_x = { r ∈ [0, W) : r ≡ 11 or 17 (mod 30), and r mod p ∉ {0, p − 2} for every prime 7 ≤ p ≤ x },

with |N_x| = N = 2 ∏_{7 ≤ p ≤ x}(p − 2) (canonical alias: the admissible twin residues 11, 17 mod 30 surviving the wheel primes; twin primes above 5 have lower member ≡ 11, 17 or 29 (mod 30), so the comb carries two of the three classes). The **scour depth** is y = y(x), the largest prime with y² ≤ W; the **scour primes** are the primes q with x < q ≤ y.

**The rotation ensemble.** At phase t ∈ [0, W), each scour prime q strikes the classes {t mod q, (t − 2) mod q}. The **anchored member** is t = 0, where every prime's strike classes are {0, −2}: q kills qm and qm − 2, the arithmetic sieve itself. The phase vector (t mod q)_{x < q ≤ y} is injective on [0, W) exactly when ∏_{x < q ≤ y} q ≥ W. That holds at every level x ≥ 11: the product is e^{θ(y) − θ(x)} with θ(x) = ln W; θ(y) > y/2 for y ≥ 11 (checked directly for the primes 11 ≤ y < 41, and [RS, (3.16)] for y ≥ 41) and y > √W/2 (Bertrand), so θ(y) − θ(x) > √W/4 − ln W, which exceeds ln W once √W/4 > 2 ln W; that inequality holds from W = 30030 on (its two sides are 43.3 and 20.6 there, and the difference increases), while at W = 2310 it fails (12.02 against 15.49) and the direct product 2.66·10¹⁴ ≥ 2310 covers @11. Appendix A checks the product against W directly at @7 through @41. It fails at x = 7, where the two scour primes 11 and 13 give 143 phase vectors for 210 rotations. The research note states the ensemble as having exactly W members for every level (`paper/anchored-note.md` §1); the statement is true from @11 on, and every rank and percentile quoted below is at @11 or deeper.

**The anchored survivors and the bias.**

> S(x) = #{ r ∈ N_x : r mod q ∉ {0, q − 2} for every scour prime q },
> E(x) = (2/30) · ∏_{7 ≤ p ≤ y}(1 − 2/p) · W,
> β(x) = S(x)/E(x).

E(x) is the exact mean of the survivor count in a window of length W over the full rotation of the depth-y pattern, whose period is ∏_{p ≤ y} p (`research/natal5-variance.js`, part A: the density δ = (2/30)∏_{7≤p≤y}(1 − 2/p) times the window length W). It is not the mean over the W rotations of the tile alone; that mean is itself a two-class count of the same difficulty as S, and the research note's phrase "the exact rotation-ensemble mean" (§6 there) conflates the two ensembles. Both S and E are exactly computable, and both have been computed through @41 (§5).

## 3. Three lemmas

**Lemma 1 (the mean diverges).** E(x) → ∞. More precisely E(x) = (16/3) C₂ e^{−2γ}(1 + o(1)) W/ln²W, where C₂ = ∏_{p>2}(1 − 1/(p − 1)²) = 0.6601618… is the twin prime constant, and E(x) ≫ W/ln²W with an effective constant.

*Proof.* Since (1 − 2/3)(1 − 2/5) = 1/5, the density is δ = (1/3) ∏_{2 < p ≤ y}(1 − 2/p). For odd p, 1 − 2/p = (1 − 1/p)²(1 − 1/(p − 1)²), so

> ∏_{2 < p ≤ y}(1 − 2/p) = 4 ∏_{p ≤ y}(1 − 1/p)² · ∏_{2 < p ≤ y}(1 − 1/(p − 1)²).

The last product decreases to C₂ > 0, and Mertens' third theorem gives ∏_{p ≤ y}(1 − 1/p) = e^{−γ}(1 + o(1))/ln y; so ∏_{2<p≤y}(1 − 2/p) = 4 C₂ e^{−2γ}(1 + o(1))/ln²y. As y is the largest prime with y² ≤ W and W → ∞, Bertrand's postulate gives W/4 < y² ≤ W, so ln y = (1/2) ln W + O(1) and ln²y = (1/4) ln²W (1 + o(1)). Hence δ = (16/3) C₂ e^{−2γ}(1 + o(1))/ln²W and E = δW as stated. For the effective lower bound, the second product is bounded below by C₂ ≥ ∏_{n≥2}(1 − 1/n²) = 1/2, and the Mertens product by the explicit inequality of Rosser and Schoenfeld [RS, Theorem 7, (3.25)–(3.27)]: ∏_{p≤y}(1 − 1/p) > e^{−γ}(1 − 1/ln²y)/ln y for y ≥ 13, so with ln y ≤ (1/2) ln W and y ≥ 13 for x ≥ 7,

> δ > (4/3)·(1/2)·4·e^{−2γ}(1 − 1/ln²13)²/ln²W = c′/ln²W,   c′ = (8/3) e^{−2γ}(1 − 1/ln²13)² = 0.60450… ,

hence E(x) > 0.60 W/ln²W for every prime x ≥ 7. ∎

Two remarks. The constant c′ was supplied by the referee of Draft 1 (report #67, item 3.1), who inspected the page image of [RS] p. 70; this draft checks it against the exact products: E(x)/(c′ W/ln²W) = 1.559, 1.687, 1.782, 1.817, 1.829, 1.833, 1.835, 1.836, 1.836, 1.836 at the ten computed levels, above 1 throughout and converging to (16/3)C₂e^{−2γ}/c′ = 1.837. The reading of (3.25)–(3.27) as the product inequality stated is the referee's, taken here at the level of a cited page we did not re-render. And the relative error in the asymptotic form of E is O(1/ln W), the same order as the 2/ln W term of the forecast series in §5.2; the residual ladder there is computed against the exact product E(x), never against the asymptotic.

The research note's §6 carried, until 2026-09-06, the inequality 1 − 2/p ≥ (1 − 1/p)², which has the wrong direction; the factorisation above is the repair recorded in `prop-anchored-note.md` (review of 2026-09-06), and it is what supplies the lower bound.

**Lemma 2 (survivors are twin primes above the scour depth).** Every anchored survivor r at level x satisfies r > y, and r and r + 2 are both prime.

*Proof.* Let r ∈ N_x survive. Since 30 | W and r ≡ 11 or 17 (mod 30), r ≤ W − 13 and r + 2 ≤ W − 11 < W; and neither r nor r + 2 is divisible by 2, 3 or 5. Membership in N_x says no prime 7 ≤ p ≤ x divides r or r + 2; survival says no scour prime x < q ≤ y does, the case q = r included (the self-strike). So no prime ≤ y divides r or r + 2. If r ≤ y then r ≥ 11 has no prime factor ≤ y ≥ r, impossible; so r > y. If r or r + 2 were composite it would have a prime factor ≤ √(r + 2) < √W, hence ≤ y, which is excluded. So both are prime. ∎

The research note's proof handles a prime factor of r + 2 in (√W, √(W + 1)] through W + 1 ≡ 3 (mod 4); the case cannot arise, since r + 2 < W. The converse of Lemma 2 also holds and the note does not state it: if r and r + 2 are prime with y < r < W and r ≡ 11 or 17 (mod 30), then no prime ≤ y divides r or r + 2, so r ∈ N_x and no scour prime strikes it. Hence, exactly,

> **S(x) = #{ (r, r + 2) both prime : y(x) < r < W, r ≡ 11 or 17 (mod 30) }.**   (3.1)

S is not a sieve proxy for a twin count; it is the twin count on two of the three admissible classes mod 30 over (√W, W), and β is that count divided by a Mertens product. Checked at @7 by hand (the eight survivors are 17, 41, 71, 101, 107, 137, 191, 197) and at @23 by an independent segmented sieve (597,475).

Verified besides at @23: all 597,475 survivors cross-checked against a full sieve of Eratosthenes, zero failures (`research/natal-cap-11-kstar23.js`, part 0; the twin ledger closes to the integer, 597,650 = S + 175, the 175 being the twin pairs with lower member ≡ 11 or 17 (mod 30) and 23 < r ≤ y(23) = 14,929, which the scour self-strikes). Replayed for this note at @7 through @19 (§5, Appendix A).

**Lemma 3 (survivors exceed √W).** Every anchored survivor r satisfies r > √W.

*Proof.* By Lemma 2, r is a prime greater than y, and y is the largest prime ≤ √W. ∎

Verified at @31: the first survivor is 448,157 ≡ 17 (mod 30) against √W = 447,839.8 and y = 447,829 (`research/natal-cap-22-at31-drift.js`, first-survivors line).

## 4. The compression

**Assumption A (positivity of the anchored bias).** There exist c > 0 and x₀ with β(x) ≥ c for all primes x ≥ x₀; equivalently liminf β(x) > 0.

**Theorem 1 (conditional).** Under Assumption A there is a computable x₁ = x₁(c, x₀) such that for every prime x ≥ x₁ the tile at level x contains a twin prime pair (r, r + 2) with r > √(x#), and the set of twin primes is infinite.

*Proof.* For x ≥ x₀, S(x) ≥ c E(x). By Lemma 1, E(x) > 0.60 W/ln²W for x ≥ 7, and W/ln²W is increasing in W from W = 210 on, so the least prime x₁ ≥ x₀ with 0.60 c·x₁#/ln²(x₁#) ≥ 1 is found by a finite search and c E(x) ≥ 1 for all x ≥ x₁. Positivity of β alone already gives S(x) ≥ 1 by integrality; the effective divergence is what makes S(x) → ∞ and the threshold x₁ explicit. S(x) is an integer, so S(x) ≥ 1, and Lemma 2 and Lemma 3 identify any survivor as a twin pair above √W. As x → ∞ the pairs found lie above √(x#) → ∞, so infinitely many are distinct. ∎

The economy of the implication should be stated flatly. Sieve theory proves the ensemble mean diverges (Lemma 1, which is Mertens and nothing more). Integrality does the rest. Assumption A asserts only that the anchored member retains a positive fraction of its own ensemble mean, and the whole twin prime conjecture sits inside that ratio, in the sense that positivity suffices. No converse is claimed. Precisely: Assumption A implies the conjecture; no implication from the conjecture to Assumption A is known; and by (3.1) Assumption A says π₂ on the comb below x# is ≫ x#/ln²x#, a positive-proportion Hardy–Littlewood lower bound along the primorials, which no known argument derives from infinitude. Both follow from Hardy–Littlewood, so "stronger" is a statement about known implications, not about truth values. Read through (3.1), Theorem 1 says: if the twin count below x# on two classes is a positive proportion of its Mertens expectation, there are infinitely many twin primes. It is a rewriting, effective, with Mertens and integrality as its only ingredients, and the note claims nothing more for it.

**Proposition 2 (the weakest sufficient statement, and what it is equivalent to).** The following are equivalent:

(a) S(x) ≥ 1 for infinitely many primes x;
(b) there are infinitely many twin prime pairs (r, r + 2) with r ≡ 11 or 17 (mod 30).

Either implies the infinitude of twin primes.

*Proof.* (a) ⇒ (b): for each such x, Lemma 2 gives a twin pair with lower member r ∈ N_x, so r ≡ 11 or 17 (mod 30), and Lemma 3 gives r > √(x#); as x runs through infinitely many primes, √(x#) → ∞ and the pairs are unbounded, hence infinitely many.

(b) ⇒ (a): let (r, r + 2) be such a pair with r > 210. Let x be the smallest prime with x# > r and x⁻ the prime before it, so x⁻# ≤ r; since x⁻ ≥ 7, x < x⁻# ≤ r. Then y(x) ≤ √(x#) = √(x · x⁻#) ≤ √(x r) < r. Every prime p ≤ y(x) is below r, so divides neither the prime r nor the prime r + 2; in particular r mod p ∉ {0, p − 2} for 7 ≤ p ≤ x, so r ∈ N_x, and r mod q ∉ {0, q − 2} for every scour prime q, so r is an anchored survivor at level x and S(x) ≥ 1. Each level x admits only finitely many r < x#, so infinitely many r give infinitely many x. ∎

Statement (a) is the weakest target a proof in this framework must hit: no density, no positivity of β, no lower bound of any exponent, one survivor at infinitely many levels. Proposition 2 says exactly what that target is worth: it is the twin prime conjecture on two of the three admissible classes mod 30, no more and no less. Assumption A hits (a) with room to spare, since it forces S(x) ≥ c E(x) → ∞ at every large level. The measured margin is in §5: at @41 the tile holds S = 256,725,962,834 survivors against the needed 1. The margin does not weaken the wall; parity blocks "at least one" as surely as "a positive fraction". It locates the wall exactly.

The equivalence in Proposition 2 is written out here for the first time; the research note states the forward direction only (`paper/anchored-note.md` §8).

## 5. The ensemble, and the ten exact levels

### 5.1 The ensemble layer: proven and certified

Over the full rotation of the depth-y pattern, the survivor count in a window of length W has mean E = δW and variance Var = Σ_{|d| < W}(W − |d|)(J₅(d) − δ²), with the exact pair correlation J₅(d) = (ρ₃₀(d)/30) ∏_{7 ≤ p ≤ y} ρ_p(d)/p, ρ₃₀(d) = 2, 1, 0 for d ≡ 0, ±6, other (mod 30) and ρ_p(d) = p − 2, p − 3, p − 4 by the class of d mod p (`research/natal5-variance.js`; the formula is verified by brute force over all 30,030 rotations at @7 to 10⁻⁶ and by Monte Carlo at @11 and @13). The computed table, the four deepest rows with explicit roundoff bars (`natal-cap-16-fast-variance.js` through @31; `natal-cap-33-overnight.js` RUN 3 at @37):

| x | W | E | Var | Var/E | E/σ | empty fraction ≤ Var/E² |
|---|---|---|---|---|---|---|
| 7 | 210 | 6.92 | 1.05 | 0.152 | 6.7 | 2.20e−2 |
| 11 | 2,310 | 39.27 | 10.06 | 0.256 | 12.4 | 6.53e−3 |
| 13 | 30,030 | 304.28 | 91.13 | 0.299 | 31.9 | 9.84e−4 |
| 17 | 510,510 | 3,245.51 | 1,060.54 | 0.327 | 99.7 | 1.01e−4 |
| 19 | 9,699,690 | 41,441.19 | 14,392.59 | 0.347 | 345.4 | 8.38e−6 |
| 23 | 223,092,870 | 669,028.80 | 243,740.37 ± 3.1e−3 | 0.364 | 1,355.1 | 5.45e−7 |
| 29 | 6,469,693,230 | 14,063,617.40 | 5,307,862.63 ± 1.4 | 0.377 | 6,104.3 | 2.68e−8 |
| 31 | 200,560,490,130 | 328,601,798.62 | 127,363,168.00 ± 7.4e2 | 0.388 | 29,117.1 | 1.18e−9 |
| 37 | 7,420,738,134,810 | 9,377,228,928.8 | 3,711,451,136 ± 8.2e5 | 0.396 | 153,923 | 4.22e−11 |

The last column is the almost-all theorem at each level: by Chebyshev the fraction of rotations with zero survivors is at most Var/E². The count is sub-Poisson, Var/E drifting from 0.152 to 0.396 (measured; the drift's shape is the open question of `paper/variance-note.md` §6).

**Proposition 1 (measure-theoretic bounds do not reach the anchor).** (i) *Exact, for x ≥ 11.* Two ensembles contain the anchor: the rotation ensemble of §2, with exactly W members, and the deep-period ensemble of the moments table, with ∏_{p ≤ y} p members. A bound "at most a fraction ε of members have zero survivors" on either ensemble admits up to ε times its cardinality exceptional members and says nothing about which; it decides the anchor only if that number is below 1. Any bound with ε ≥ 1/W therefore decides nothing about the anchor on either ensemble. (ii) *The second-moment bound, at the computed levels.* Chebyshev on the deep-period ensemble gives ε = Var/E²; against the rotation ensemble's threshold 1/W (the more generous of the two; the deep ensemble's own is e^{−θ(y)}), the shortfall factor εW at the nine levels with computed variance is 4.60, 15.07, 29.56, 51.40, 81.29, 121.5, 173.6, 236.6, 313.2 (x = 7 to 37), i.e. the bound admits between 4 and 313 exceptional rotations where deciding the anchor needs fewer than one. Since εW = (Var/E)·(W/E) and W/E = ln²W/((16/3)C₂e^{−2γ}(1 + o(1))) by Lemma 1, the factor is ≍ ln²W exactly when Var/E stays bounded away from 0 and ∞; that is measured (0.152 to 0.396, drifting) and not proven, so the asymptotic form is conditional and the nine finite values are the statement. The theorem-valid martingale bounds are weaker still (`research/natal-cap-07-trajectory.js`, reading 6). (iii) *Measured, extrapolated.* Along the nine levels with computed variance the anchor deviates from the ensemble mean by z = (S − E)/σ = +1.05 to −22,633 (§5.2), and any tail bound sharp enough to localise the event {S ≤ S(0)} must be stated at deviation depth (1 − β)E, where it must admit at least one member because the anchor itself deviates that far. This is a limitation of the estimates tested (Chebyshev; the martingale family), not a theorem about every measure argument: the event {S = 0} is a different event from {S ≤ S(0)} when S(0) > 0, and a bound for the former could in principle be zero while the latter is not. Part (iii) assumes the two measured trends persist (β below 1 − δ from @17 on, Var/E bounded).

Part (i) is a counting statement and is proven; the research note states it without the hypothesis ε ≥ 1/W, under which it would be false, and its proof quotes the factor 81 after its own parenthetical forbids pairing the deep ensemble's ε with the rotation ensemble's cardinality (`paper/anchored-note.md` §3; `paper/wall-note.md` §2 Face 1 as corrected 2026-08-27). The pairing is made here explicitly as the generous comparison, and the conclusion does not depend on it. Draft 1 of this note labelled the whole of (ii) "exact" and inferred the divergence of z from ten values; report #67 (item 1.3) is right that Lemma 1 and nine finite values in [0.15, 0.40] do not prove Var/E ≍ 1, that there are nine z values and not ten, and that (iii) does not exclude every refinement. The statements are graded accordingly here.

### 5.2 The anchored member: ten exact levels of S and E, nine of z

| x | S(x) | E(x) | β = S/E | z = (S − E)/σ | source |
|---|---|---|---|---|---|
| 7 | 8 | 6.92 | 1.1556 | +1.05 | natal5-variance.js part C |
| 11 | 45 | 39.27 | 1.1458 | +1.81 | natal5-variance.js part C |
| 13 | 307 | 304.28 | 1.0089 | +0.28 | natal5-variance.js part C |
| 17 | 3,099 | 3,245.51 | 0.9549 | −4.50 | natal5-variance.js part C |
| 19 | 38,380 | 41,441.19 | 0.9261 | −25.52 | natal5-variance.js part C |
| 23 | 597,475 | 669,028.8 | 0.8930 | −144.9 | natal-cap-11-kstar23.js; natal-cap-16 |
| 29 | 12,307,838 | 14,063,617.4 | 0.8752 | −762.1 | natal-cap-18-at29.js; natal-cap-16 |
| 31 | 283,449,187 | 328,601,798.6 | 0.8626 | −4000.9 | natal-cap-22-at31-drift.js; natal-cap-16 |
| 37 | 7,998,394,865 | 9,377,228,928.8 | 0.8530 | −22,632.9 | natal-cap-33-overnight.js RUNs 2, 3 |
| 41 | 256,725,962,834 | 303,627,067,641.7 | 0.8455 | not computed (Var@41 uncomputed) | natal-cap-37-at41-march.js |

**Custody.** The CRT-30 engine of `natal-cap-22-at31-drift.js` re-derived all seven prior levels digit for digit before the @31 run; the @37 march reproduced S(31) and the 37,534-prime scour of @31 before extending; the @41 march reproduced @7 through @29 digit for digit and S(31), S(37) exactly through the same sharded code path, then ran 6.035 hours over eight shards (6.160 hours with the gates). At @41, y = 17,442,769 and the scour x < q ≤ y is 1,117,909 primes; the research note's 1,117,922 is π(y), the count including the primes up to 41 (the @31 figure 37,534 uses the correct convention). **S(41) has one witness**: the march has completed exactly once; a killed first attempt agrees digit for digit at every shared progress tick, which covers about 1.3% of the tile and establishes determinism, not correctness. Gate custody is complete through @37 and single-shot at @41. The @37 run's primality layer is deterministic Miller–Rabin to 3.186·10¹⁴, which covers W = 37#. @43 is beyond this engine: W = 1.308·10¹⁶ exceeds 2⁵³, where the CRT anchoring product stops being exact in the current arithmetic.

**Replay for this note.** S(x), E(x) and β(x) were recomputed at @7 through @23 by a script sharing no code and no method with the producers (one boolean array over [0, W); `beta-recompute.py`, 2.7 s, 503 MB, one thread): S = 8, 45, 307, 3099, 38380, 597475 and E, β to the printed digits at all six levels; N = 2∏(p − 2) at every level; Lemma 2 checked on all 639,314 survivors against a separate sieve of [0, W + 3), zero exceptions; every first survivor above ⌊√W⌋ (Lemma 3). Five served producers were re-run (`natal5-variance.js`, `natal-cap-13-anchored-calm.js`, `natal-cap-11-kstar23.js`, `natal-cap-30-skeleton-bound.js`, `natal-cap-16-fast-variance.js`; 628 s in all, at most four threads) and their normalised outputs equal the recorded out-sha256 in every case; the @11 to @19 moments, the brute force at @7, the VR percentiles 1.840, 3.938, 0.002, the Z2 rank 2 of 510,510 at @17, the 82 of 120 primes below half, the @23 cross-sieve with its ledger 597,650 = 597,475 + 175, and the @23, @29, @31 variance rows all reproduce. Four custody findings from the replay are in Appendix B (items 9 to 12); none touches a number this note states, except that the @29 skeleton certificate is not gate-checked (§7). Recipe, commands and hashes: `anchored-recipe.md`.

**The drift.** β descends smoothly across ten levels while σ/E shrinks like √(Var/E)/√E, so the anchored deviation in σ-units diverges. The anchored increments along the march, after removing a nine-step moving average, have autocorrelation about −0.09 and Gaussian-scale tails (max |z| = 3.02 over 164 steps), so the dangerous component of the anchored trajectory is drift, not noise (`natal-cap-07-trajectory.js`, readings 3 and 4; measured).

**The forecast series.** Against the zero-parameter classical correction β_cl(x) = (e^{2γ}/4)(1 + 2/ln W + 6/ln²W), the residuals β − β_cl at the ten levels are −0.1005, +0.0686, +0.0173, +0.0136, +0.0161, +0.0046, +0.0026, +0.0016, +0.0010, +0.0006 (unrounded at the last level 0.000636): large and of either sign at @7 and @11, non-monotone through @19, and decreasing from @23 on. The research note's "settled description at every computed level" holds from @23. The chronology matters and Draft 1 overstated it: at @23 and @29 the classical series was evaluated on the already computed table (`natal-cap-18-at29.js`, reading 4; the forecasts recorded before the @29 run in `natal-cap-11-kstar23.js`, part 3, were the fitted free-linear and pinned-linear curves, 0.8764 and 0.8881, not the classical series), and the prospective forecasts of the classical series are the ones recorded in the producers' headers before the runs at @31 (raw 0.8610, measured 0.8626), @37 (raw 0.8520, with the persisted residual 0.8530, measured 0.8530) and @41 (raw 0.8449, with the persisted residual 0.8459, measured 0.8455). So five residuals decrease, and the last three runs tested forecasts on record; a formula with no fitted parameter is not by itself a prior forecast (report #67, item 1.6). A free linear fit in 1/ln W has intercept 0.7830 on the last four levels (rms 0.0002) and 0.7842 on all ten (rms 0.028), both near e^{2γ}/4 = 0.79305 and both still moving; an intercept that moves when a point is added is not measuring a limit. The gap from β(41) to e^{2γ}/4 is 0.0525, 82.5 times the deepest residual. The limit is extrapolation-supported, not observed; the fits alone admit any limit roughly in [0.74, 0.82] (`natal-cap-11-kstar23.js`, reading 7, a descriptive band and not a confidence interval). The forecasts for @43 are on record at 0.8393 (raw classical) and 0.8399 (with the persisted residual) and cannot be checked by this engine; a value of β(43) outside their neighbourhood would refute those finite forecasts, not the limit.

**Conjectured sharp form.** β(x) → e^{2γ}/4. Under the Unification Law's curve ρ(u) = e^{2γ}/u², u = ln X/ln p ≤ 2, the anchored bias is the zone-edge trough of the three-phase anchored law read along the diagonal X = W at scour depth √W (`research/anchored-windows.md` §3; the law's constants are Hardy–Littlewood-conditional, with Brun-certified upper bounds only). Section 6 shows the same value is forced by Hardy–Littlewood directly.

## 6. The price of Assumption A

We do not present Assumption A as small. The accounting:

**The sharp form is Hardy–Littlewood on the comb.** Write π₂^{comb}(u) for the number of twin pairs (r, r + 2) with r < u and r ≡ 11 or 17 (mod 30). By (3.1), S(x) = π₂^{comb}(W) − π₂^{comb}(y + 1) exactly (the pairs with r ≤ y are removed; r + 2 = W ± 1 cannot occur, the comb excluding it), and π₂^{comb}(y + 1) ≤ y ≤ √W. The Hardy–Littlewood conjecture for the pair (n, n + 2) in residue classes, with its local factors, gives each of the three admissible classes 11, 17, 29 mod 30 an equal share of the twin count (the local factors at 2, 3 and 5 are identical for the three), so π₂^{comb}(W) ~ (2/3) · 2 C₂ W/ln²W = (4/3) C₂ W/ln²W. This is more than the unrestricted asymptotic π₂(W) ~ 2 C₂ W/ln²W; it is the conjecture in progressions mod 30. Measured at @23 the three classes hold 298,776, 298,876 and 298,408 pairs below W, the comb's share 0.66698. Dividing by E(x) = (16/3) C₂ e^{−2γ}(1 + o(1)) W/ln²W (Lemma 1),

> β(x) → (4/3) / ((16/3) e^{−2γ}) = e^{2γ}/4.

Conversely β → e^{2γ}/4 gives π₂^{comb}(x#) ~ (4/3) C₂ x#/ln²(x#) as the prime x → ∞: the combined count of the two classes, at the primorial endpoints only. The ratio of consecutive primorials is the next prime, so no density-one interpolation from these endpoints to all real endpoints is available, and the combined asymptotic does not separate the two classes. So the proven equivalence is: β → e^{2γ}/4 if and only if the combined two-class count satisfies the Hardy–Littlewood asymptotic along the primorials; Hardy–Littlewood in the progressions mod 30 implies both sides; the reverse implication to the full conjecture is not proven. "The sharp form is Hardy–Littlewood itself" (`paper/anchored-note.md` §9) and Draft 1's unqualified abstract both overstate by these two qualifications (report #67, item 1.2). The measured descent of β toward 0.79 is the measured approach of the twin count on the comb to its Hardy–Littlewood value, seen through E instead of through W/ln²W.

**The weak form is a positive-proportion Hardy–Littlewood lower bound.** β ≥ c for x ≥ x₀ says π₂^{comb}(W) ≥ c(16/3) C₂ e^{−2γ}(1 + o(1)) W/ln²W along the primorials: a lower bound of the conjectured order for the count of a two-classes-per-prime sifted set. That is the class of statement the parity obstruction blocks for sieve methods of this two-class type; parity is a limitation on derivations, not an unprovability theorem. The floor must be read in the sieve dimension the object sits in: this is a dimension-2, position-uniform problem, so the operative parity floor is 8 — the parity floor of Selberg's Λ² at κ = 2, and also the best constant in print that survives the position quantifier (Riesel–Vaughan Lemma 5) — against the constant 1.28 needed at @17 (`paper/wall-note.md` §2 Face 1; `research/natal-cap-10-sieve-cap.md` §1.4, §1.5; Selberg's examples). No κ = 2 extremal example is in print, so 8 is best known rather than proven. The number 2 is the dimension-1, whole-range figure, reachable only through A = {p+2} plus equidistribution of primes in arithmetic progressions; it remains a valid *a fortiori* lower bound and it is not the figure this face is barred by. The margin is therefore 8/1.28 = 6.25×, not 2/1.28 = 1.56×, and the floor-2 reading is withdrawn. Lower bounds for two-dimensional sifted sets do exist away from the critical range: the dimension-2 sieve gives a positive lower bound when the sifting depth is W^{1/u} with u above the sifting limit β₂ ≈ 4.27 (Diamond, Halberstam and Richert; the record's `paper/beta2-note.md`), and none at depth √W, u = 2, which is where S lives. What we have not located is a source that bounds the anchored count at depth √W from below by a positive constant times W/ln²W; `research/covering-dive.md` §2.2, which Draft 1 cited here, reports a search for upper bounds on the two-class Jacobsthal gap and does not bear on counts (report #67, item 1.5). The two-class gap G₂ is a different object and carries a proven lower bound (`research/two-class-lower-bounds.md` §3; `paper/kk-lower-bound.md`); nothing in it transfers to the count.

**The same wall on the other faces.** On the two-moiré face, "misaligned on average" is a theorem and "misaligned in every window" is the conjecture (`research/two-moire-argument.md`, verdict). On the variance face, "the anchored ratio stays bounded away from 0 forever" is named as Hardy–Littlewood-strength input in `natal5-variance.js`, reading 6. On the covering face, Assumption A says the classes {0, −2 mod q} over the scour primes never cover the comb inside one tile. Outside the window the question is trivial: by the Chinese remainder theorem the comb's N classes and the scour primes' q − 2 unstruck classes each combine to N ∏_{x<q≤y}(q − 2) surviving classes modulo W ∏ q, so survivors exist somewhere in the periodic extension; the content is entirely in the designated window [0, W). Hough's theorem [Ho] concerns finite covering systems with distinct moduli and bounds their least modulus; it is not a two-classes-per-prime statement and says nothing about this window, and Draft 1's sentence that it "settles the infinite version" is withdrawn (report #67, item 1.5). The bounded-differences family (McDiarmid, Azuma, Talagrand, Warnke, Kutin, Kim–Vu) is closed as a route to lowering the price: the anchor is a single member against an ensemble, and a sharper tail bound moves the wrong way (`research/history/staging/row7-recon.md`; `research/OUTCOMES.md`).

**Where the assumption lives, measurably.** The survivor fluctuation across the ensemble is carried by the overlap credit X and not by the strike statistics: corr(X, S) = 0.48, 0.91, 0.99 at @11, @13, @17 against corr(VR, S) ≈ 0, and by @17 the strike channel carries 2.7% of Var(S) (`research/natal-cap-31-calm-vs-kill.md`, full enumeration). The exact ledger (`research/natal-cap-31-calm-vs-kill.md`, L1) is S(0) = S̄ − (X̄ − X(0)) − (D(0) − D̄), with S̄ the mean over the W rotations of the tile, X the overlap credit and D the strike total; so β ≥ c is equivalent to (X̄ − X(0)) + (D(0) − D̄) ≤ S̄ − c E, and any reading of Assumption A through the overlap channel alone needs two further inputs, a bound on the centred strike term D(0) − D̄ and the ratio of the diagonal mean S̄ to the deep-period mean E, which are not the same quantity (E/S̄ = 0.8202 at @23, `natal-cap-35-x-multiplicity.js`, part 6). Draft 1 wrote the condition as "the anchored overlap deficit stays below (1 − ε) S̄", dropping both (report #67, item 1.4). The measurements stand as measurements: the anchor's X(0)/X̄ reads 1.4541, 0.9908, 0.9482, 0.9558 at @11, @13, @17, @19, a crossing from surplus into deficit followed by a turn, one turning point on four points, from which neither a continued descent nor a floor is distinguishable (`research/natal-cap-35-x-multiplicity.js`); and the deficit is carried by multiplicity m ≥ 3 at those levels (at the anchor P₂ reads z = −0.30 while X reads z = −2.71), so the pair statistics see it dimly there. That is a finding about the measured levels, not a general impossibility for pair-correlation methods.

## 7. What is around the compression, and at what grade

The record surrounding β is larger than this note and most of it is not needed here. Three items are, because a referee will ask.

**The anchored calm** is a measured phenomenon: on the equal-weight strike statistic Z2 the anchored phase sits at rank 2 of 510,510 rotations at @17 and rank 6 of 9,699,690 at @19, and on the variance ratio VR at rank 10 of 510,510 and rank 14 of 9,699,690 (`natal-cap-19-calm-lemma.js`, OUTPUT lines 513–516; Draft 1 assigned the rank 14 to Z2). It is a statement about strikes; survival is decided in the overlap channel (§6), and corr(VR, S) ≈ 0, so the calm is not a route to Assumption A and must not be read as one (`research/natal-cap-31-calm-vs-kill.md`). Its explanation decomposes into parts at four grades, kept in one place, `research/anchored-calm.md`: the Mirror-Sibling, Fusion, Mirror-Phase Doubling and Minus-Half results and the Skeleton Collapse Theorem are proven at all x and all q; the Aggregate 30-Skeleton Bound G30_agg < 1/2 is certified in exact integer arithmetic at @11 through @23 by `natal-cap-30-skeleton-bound.js` (0.2132, 0.1113, 0.1011, 0.1259, 0.0945; gate-checked output, replayed here) and at @29 (0.1176) by a hand-noted line above the OUTPUT banner of `natal-cap-36-skeleton-door.js` from a non-default invocation, which no gate checks (Appendix B, item 10), and open beyond; Uniform-in-q Anticorrelation is refuted (six counterexample primes of 10,201); Anchored Typicality (Σdev(0,q)²/ΣV_fused = 0.935 at @13, 0.939 at @17) is measured with no proof mechanism in sight. This note leans on none of these for its theorems.

**The mirror and the loud phase.** The mirror μ(r) = W − 2 − r maps N_x to itself, so every rotation statistic satisfies stat(t) = stat(W − t) as integer phases (proven; `natal-cap-13-anchored-calm.js`, header theorem 1). The phases t and t + W are different members of the ensemble (W mod q ≠ 0 for every scour prime, so their phase vectors differ; directly, S(3) = 37 and S(W + 3) = 38 at @11), and the only phase in [0, W) fixed by t ↦ W − t is t = W/2: the anchor's mirror partner is the phase W, outside the window. Draft 1 wrote "the phases fixed by t ↦ W − t are exactly t = 0 and t = W/2"; that is false for the phase vectors of §2, as report #67 (item 1.1) shows at x = 11, q = 13, where the anchor's strike pair {0, 11} has mirror {7, 9}, and r = 167 is struck at t = 0 while its mirror image 2141 is not. The same error, a congruence taken modulo W, is in the source `research/natal-cap-19-calm-lemma.md`, Lemma 3, at the step that introduces it, and is recorded in Appendix B. What is proven at W/2: the strike pair {W/2, W/2 − 2} is μ-invariant for every q, so G(W/2, q) is even and dev(W/2, q) is twice a single-class deviation (verified at @11, @13, @17). What is measured: the variance ratio VR(W/2) = 2.78, 1.67, 2.14 at @11, @13, @17, the loudest rotation of the whole ensemble at @11 and @17 and the 99.3rd percentile at @13 (`natal-cap-13-anchored-calm.js`). The per-prime doubling does not by itself prove that the aggregate variance ratio equals 2 or that W/2 is extreme at every level, and the research note's "the counterpoint at W/2 is a theorem" is graded here as: the mechanism proven, the loudness measured. The ensemble's two arithmetically distinguished phases occupy the two opposite tails at the three enumerated levels.

**The X-limitation theorem** (strikes alone cannot annihilate the comb at any loudness) is proven at @11, @13, @17, @19 by full enumeration and rests on measured trends beyond @19, of which one broke (max VR: 2.78, 2.35, 2.14, 2.293, falling then rising) and one held (the driver S̄/√(K V̄): 3.12, 4.88, 9.75, 24.96) (`natal-cap-31-calm-vs-kill.md`; `natal-cap-35-x-multiplicity.js`). Annihilation would require an overlap collapse of 8 to 15 σ_X at those levels.

## 8. Prior art

The registry's position, stated as it is filed, is that this compression's priority is not yet searched in an owning convention (`research/SEARCH-CONVENTIONS.md` §1 carries no row for the anchored bias or for the anchored-versus-random separation; `prop-anchored-note.md` §4). Until that row is written and searched, any sentence claiming the compression is new rests on a search run in the corpus's own wording, which the conventions document names as the shape of failure it exists to stop. We therefore claim no priority for the compression, and we record what is known.

- The ingredients are classical and cited as such: the sieve of Eratosthenes on the primorial, Mertens, the Hardy–Littlewood twin conjecture with its local factors [HL], Chebyshev's inequality.
- The **ensemble object** of §5.1, the concentration of a sieved count over the rotations of a periodic pattern, has an owning convention: Banks, Ford and Tao's probabilistic model of prime gaps and its checkpoint programme [BFT] (`SEARCH-CONVENTIONS.md` §1, row written 2026-08-20 from `row7-recon.md`). The exact pair correlation J₅ and the moments table are elementary instances of that kind of computation.
- The **adjacent object**, maximal gaps between actual twin primes, belongs to Kourbatov [Ko] and OEIS A113274; the corpus's earlier reading of that law was refuted by his table, and the correction is recorded (`SEARCH-CONVENTIONS.md` §3). Nothing here restates a gap law.
- The observation that twin primes above 5 lie in the classes 11, 17, 29 mod 30, and that a wheel sieve on the primorial leaves exactly the twin candidates, is folklore of the sieve of Eratosthenes.
- A web search for this note (2026-09-11; queries on "anchored bias", "primorial window", "sieve survivors", "positivity", "residue class", Hardy–Littlewood) found no published statement of the twin prime conjecture as positivity of an anchored primorial-window survivor ratio. The nearest hits do not match: a sieve correction factor written as a ratio of series (arXiv:2507.03107), an unrefereed note on "survivor progressions" with the count M·∏(1 − 2/p), and a different conjectural inequality (arXiv:1909.02205). The search ran in the corpus's own wording and is not the owning-convention search the registry requires (`registry-factsheet-2026-09-11.md`).
- Routes around the assumption that the record has closed, for a reader who would try them: bounding the anchored deficit δ by any constant is refuted as a target, since |δ| ≤ c < 1 is equivalent to S(0) > 0 and hence TPC-strength (`research/OUTCOMES.md`, 2026-08-19); the bounded-differences family is closed (2026-08-20); mirror symmetrisation at the anchored cap gains exactly zero (2026-08-20); the Skeleton Equidistribution door is closed as a route (2026-08-30).

## 9. Residuals, and what would break each statement

### 9.1 The theorems

| statement | what would falsify it | has the check run |
|---|---|---|
| Lemma 1, E ~ (16/3) C₂ e^{−2γ} W/ln²W | a slip in δ = (1/3)∏(1 − 2/p), or in ln y ~ (1/2) ln W | re-derived here; E(x) matches the exact products at ten levels (§5) |
| Lemma 2, survivors are twin primes above y | a survivor r ≤ y, or a composite r or r + 2 | exhaustive at @23 (597,475 of 597,475); replayed at @7 to @19 |
| Proposition 2, (a) ⟺ (b) | a twin pair (r, r + 2), r ≡ 11 or 17 mod 30, r > 210, that is not an anchored survivor at the level x constructed in the proof | none needed beyond the proof; a computation at small r is a one-line check |
| Theorem 1 | a gap in the effectivity of x₁, i.e. a non-effective constant in Lemma 1's lower bound | Rosser–Schoenfeld supplies the constant; written out numerically as c′ = 0.6045 (§3) |
| Proposition 1(i) | a level x ≥ 11 with ∏_{x<q≤y} q < W | checked at every level 7 to 41: fails only at @7 |
| §6 equivalence | an error in the comb's share 2/3 under Hardy–Littlewood, or in E's constant | the share follows from the local factors at 2, 3, 5 being identical for the three classes; the constant is Lemma 1 |

### 9.2 The computations

| statement | what would falsify it | has the check run |
|---|---|---|
| S(x), E(x) at @7 to @37 | an independent recomputation disagreeing | two independent engines agree through @37 in the record; this note's own recomputation agrees at @7 to @23 (`beta-recompute.py`) |
| S(41) | a second march disagreeing | **no**: one witness; a second march is six hours of ten cores |
| Var at @23 to @37 | a recomputation outside the stated roundoff bar | RUN 3 at @37 reproduced the eight prior levels inside their bars |
| the five decreasing residuals; the three prospective forecasts (@31, @37, @41) | a residual misreported; a forecast whose recorded value postdates its run | residuals recomputed here from the table; the @31, @37, @41 forecasts are in the producers' headers before their OUTPUT blocks; @23 and @29 were evaluated after the fact and are not claimed as forecasts |
| the conjectured limit e^{2γ}/4 | no finite value can refute a limit; β(43) far outside the recorded @43 forecasts (0.8393, 0.8399) would refute those forecasts and weaken the extrapolation | cannot run: W(43) > 2⁵³ |

### 9.3 What would move the grade

The proposal's triggers govern. **Toward QUICK-DRAFT:** an expert's private read followed by the owner's decision to position the note as written here; or a weakening of Assumption A to something strictly below Hardy–Littlewood strength, a route the bounded-differences family no longer offers. **Toward WEAKENED:** an owning-convention row for the anchored bias returning the compression in print; or any leg of `research/anchored-calm.md` regraded downward, although this note's theorems lean on none of them. **Retire:** Proposition 1 shown false, or superseded by a measure argument that does decide the anchor.

## 10. Record

Refutations and corrections this note stands on, kept visible.

- The three-phase anchored law's original reading claimed divergence in its third phase; it was wrong and is corrected in `research/anchored-windows.md` and `attack-10-anchored-origin.js`.
- Two of four "calm" sightings dissolved under the exact rotation control (`natal-cap-13-anchored-calm.js`, reading 2): sub-binomial house splits belong to every rotation; head-pair overlaps put the anchor on the overlap-rich side.
- The martingale tail bounds lose to Chebyshev (`natal-cap-07-trajectory.js`, reading 6).
- The rounding slip 0.79325 for e^{2γ}/4 = 0.79306 (corrected in `natal-cap-11-kstar23.js`).
- The band "between 9% and 11%" for the door branches' skeleton share, corrected 2026-08-18 to four signed values 9.2%, −0.9%, 0.2%, 0.5% (`research/anchored-calm.md`).
- The X(0)/X̄ descent "1.45, 0.991, 0.948 through 1" broke at @19 (0.9558); the two counts of enumerated levels disagreed twelve lines apart until 2026-08-18 (`paper/anchored-note.md` §10).
- The 6.16-hour figure for the @41 shards double-counted the gate time; the shards took 6.035 h and the job 6.160 h.
- Lemma 1's optional lower-bound argument carried the reversed inequality 1 − 2/p ≥ (1 − 1/p)² until the review of 2026-09-06; the factorisation in §3 is the repair.
- Draft 1 of this note (return #41): the ensemble cardinality W is stated for x ≥ 11 with the @7 exception (§2, Appendix B); Proposition 2 is stated as an equivalence with the comb-restricted conjecture; the §6 accounting is written with π₂^{comb} explicit.
- Draft 1's own errors, found by report #67 and corrected in this draft: "0 and W/2 are the two mirror-fixed phases" (false; W/2 is the only one in the window, §7); the abstract's unqualified Hardy–Littlewood equivalence (§6); Proposition 1's asymptotic labelled exact and a divergence inferred from ten values where nine exist (§5.1); the overlap-channel restatement of Assumption A dropping the strike term and the S̄/E ratio (§6); `covering-dive.md` §2.2 cited for counts where it treats gaps, and Hough cited for a theorem he does not state (§6); "five forecasts before their runs" where two were retrospective (§5.2); [RS] Theorem 5 cited for a product bound that is Theorem 7 (§3); the cardinality inequality √W/4 > 2 ln W asserted from W = 2310 where it holds from 30030 (§2); rank 14 at @19 assigned to Z2 where it is VR's (§7); 87 for the unrounded 82.5 and 0.0172 for 0.0173 (§5.2).

---

## 11. References

House form: authors, title, identifiers, then an italic provenance sentence. [RECORD] entries are carried from the research note or the corpus and were not re-read for this note; [MEMORY] entries carry bibliographic details without a page image.

- [HL] G. H. Hardy and J. E. Littlewood, *Some problems of 'Partitio numerorum'; III: On the expression of a number as a sum of primes*, Acta Math. **44** (1923) 1–70, DOI 10.1007/BF02403921. *Bibliographic record confirmed at the publisher on 2026-09-11; the paper was not read for this note. Conjecture B there is the twin asymptotic with constant 2C₂.*
- [RS] J. B. Rosser and L. Schoenfeld, *Approximate formulas for some functions of prime numbers*, Illinois J. Math. **6** (1962) 64–94. *[RECORD] Read at page images pp. 69–70 in the record on 2026-09-08 (`paper/kk-lower-bound.md` §12), and p. 70 inspected by the referee of Draft 1 (report #67): the product bounds used in Lemma 1 are Theorem 7, (3.25)–(3.27); (3.17)–(3.18) of Theorem 5, which Draft 1 cited, bound the sum of reciprocals of primes; (3.16) is the explicit θ bound used in §2.*
- [BFT] W. Banks, K. Ford and T. Tao, *Large prime gaps and probabilistic models*, arXiv:1908.08613; Invent. Math. **233** (2023), no. 3, 1471–1518. *Record confirmed at arXiv on 2026-09-11; §5 read at source in the record (`research/history/staging/row7-recon.md` §5); not re-read for this note.*
- [Ko] A. Kourbatov, *Maximal gaps between prime k-tuples: a statistical approach*, J. Integer Seq. **16** (2013), Article 13.5.2; arXiv:1301.2242. *Record confirmed at the journal on 2026-09-11; his table is the source of the refutation recorded in `research/SEARCH-CONVENTIONS.md` §3; not re-read for this note.*
- [Ho] R. Hough, *Solution of the minimum modulus problem for covering systems*, Ann. of Math. (2) **181** (2015), no. 1, 361–382; arXiv:1307.0874. *Record confirmed at the journal on 2026-09-11; Theorem 1 there bounds the least modulus of a finite covering system with distinct moduli (definition and statement on p. 1 of the arXiv version, inspected by the referee of Draft 1); it is cited in §6 only to say what it does not cover.*
- OEIS A113274, record (maximal) gaps between twin primes, https://oeis.org/A113274. *Entry not fetched for this note; cited as `research/SEARCH-CONVENTIONS.md` §1 cites it. [RECORD]*
- Selberg's parity examples and Tao's account of the parity problem, as cited in `research/natal-cap-10-sieve-cap.md`. *[RECORD]*

**This corpus.** `paper/anchored-note.md` (the research note, all sections); `research/anchored-calm.md`; `research/anchored-windows.md` §3, §6; `research/natal5-variance.js`; `research/natal-cap-07-trajectory.js`; `research/natal-cap-10-sieve-cap.md`; `research/natal-cap-11-kstar23.js`; `research/natal-cap-13-anchored-calm.js`; `research/natal-cap-16-fast-variance.js`; `research/natal-cap-18-at29.js`; `research/natal-cap-22-at31-drift.js`; `research/natal-cap-31-calm-vs-kill.md`; `research/natal-cap-33-overnight.js`; `research/natal-cap-35-x-multiplicity.js`; `research/natal-cap-37-at41-march.js`; `research/covering-dive.md` §2.2; `research/two-moire-argument.md`; `research/two-class-lower-bounds.md` §3; `research/history/staging/row7-recon.md`; `research/OUTCOMES.md`; `research/SEARCH-CONVENTIONS.md` §1, §3; `paper/wall-note.md` §2; `paper/variance-note.md` §6; `paper/proposals/prop-anchored-note.md`; `paper/proposals/PROPOSALS.md`; `paper/PAPERS.md`.

---

## Appendix A. Provenance of every number

| number | where | source |
|---|---|---|
| N = 2∏(p − 2); comb classes 11, 17 of {11, 17, 29} | §2 | elementary; `paper/anchored-note.md` §1 |
| ∏_{x<q≤y} q vs W at @7 (143 vs 210) and @11 (2.66·10¹⁴ vs 2310); holds at every level 7 < x ≤ 41; √W/4 against 2 ln W: 12.02 vs 15.49 at W = 2310, 43.3 vs 20.6 at 30030; θ(y) > y/2 at the ten levels | §2, §9.1 | `prop2-check.py`; recomputed for this draft with y(41) = 17,442,769, 1,117,909 scour primes |
| E(7) = 6.9231; E(41) = 303,627,067,641.69; all ten E, β to the printed digits | §5.2 | exact products, recomputed for this note (referee pass) and `prop2-check.py` for E(7); record: `natal5-variance.js`, `natal-cap-37-at41-march.js` line 823 |
| C₂ = 0.6601618; e^{2γ}/4 = 0.7930547395; c′ = (8/3)e^{−2γ}(1 − 1/ln²13)² = 0.604502; E/(c′W/ln²W) = 1.559 to 1.836 at the ten levels | §3, §5.2, §6 | `mertens-check-out.txt` (return #32); γ = 0.5772156649; report #67 item 3.1; recomputed for this draft |
| the eight survivors at @7: 17, 41, 71, 101, 107, 137, 191, 197 | §3 | hand and sieve, referee pass |
| 597,475; 597,650 = S + 175; y(23) = 14,929 | §3 | `natal-cap-11-kstar23.js` part 0; independent segmented sieve, referee pass |
| 448,157; √W = 447,839.8; y = 447,829 at @31 | §3 | `natal-cap-22-at31-drift.js`; recomputed |
| 1442 twin pairs r ≡ 11, 17 (mod 30) in (210, 2·10⁵), 0 failures of (b) ⇒ (a) | §9.1 | `prop2-check.py`, `prop2-check-out.txt` |
| the moments table (E, Var, Var/E, E/σ, Var/E²) at @7 to @37 and its roundoff bars | §5.1 | `natal5-variance.js`; `natal-cap-16-fast-variance.js`; `natal-cap-33-overnight.js` RUN 3; copied from `paper/anchored-note.md` §2 |
| the mirror counterexample at @11: strike pair {0, 11} at t = 0, mirror {7, 9}; S(3) = 37, S(W + 3) = 38 | §7 | report #67 item 1.1; `review-check.py` (the referee's, 81c50597…); recomputed for this draft |
| εW = 4.60, 15.07, 29.56, 51.40, 81.29, 121.5, 173.6, 236.6, 313.2 at @7 to @37; (εW)/ln²W = 0.161 to 0.357 | §5.1 | Var/E² · W from the moments table; recomputed for this draft |
| the S, β, z table at ten levels | §5.2 | `paper/anchored-note.md` §3, sources per row |
| 6.035 h, 6.160 h, one witness, 1.3% | §5.2 | `natal-cap-37-at41-march.js` lines 822, 853, 948–953, 983 |
| 3.186·10¹⁴; 43# = 1.308·10¹⁶ > 2⁵³ | §5.2 | `paper/anchored-note.md` §6, §10; recomputed |
| −0.09, 3.02, 164 steps | §5.2 | `natal-cap-07-trajectory.js` readings 3, 4 |
| residuals −0.1005, +0.0686, +0.0173, +0.0136, +0.0161, +0.0046, +0.0026, +0.0016, +0.0010, +0.0006 (last unrounded 0.000636) | §5.2 | β − (e^{2γ}/4)(1 + 2/ln W + 6/ln²W) at the ten levels, recomputed for this draft with e^{2γ}/4 = 0.793054739531 |
| 0.7830 (rms 0.0002), 0.7842 (rms 0.028), 0.0525, 82.48, [0.74, 0.82], 0.8393, 0.8399; prospective forecasts 0.8610 / 0.8520, 0.8530 / 0.8449, 0.8459 | §5.2 | fits and ratio recomputed for this draft; `natal-cap-11-kstar23.js` reading 7; `natal-cap-22-at31-drift.js`, `natal-cap-33-overnight.js`, `natal-cap-37-at41-march.js` headers |
| 298,776 / 298,876 / 298,408; share 0.66698 | §6 | twin pairs below 23# by class mod 30, referee pass sieve |
| dimension-2 parity floor 8, needed 1.28 at @17; margin 8/1.28 = 6.25× | §6 | `paper/wall-note.md` §2 Face 1; `research/natal-cap-10-sieve-cap.md` §1.4 (interval-uniform 8, Riesel–Vaughan Lemma 5), §1.5 (the dimension-1 floor 2) |
| corr(X, S) = 0.48, 0.91, 0.99; 2.7%; X(0)/X̄ = 1.4541, 0.9908, 0.9482, 0.9558; z = −0.30, −2.71 | §6 | `natal-cap-31-calm-vs-kill.md`; `natal-cap-35-x-multiplicity.js` line 671 |
| Z2 rank 2 of 510,510 and 6 of 9,699,690; VR rank 10 of 510,510 and 14 of 9,699,690; percentiles 1.84, 3.94, 0.002 | §7 | `natal-cap-13-anchored-calm.js`; `natal-cap-19-calm-lemma.js` OUTPUT 513–516; `research/anchored-calm.md` |
| G30_agg 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176; six of 10,201; 0.935, 0.939 | §7 | `research/anchored-calm.md` status table |
| VR(W/2) = 2.78, 1.67, 2.14; max VR 2.78, 2.35, 2.14, 2.293; driver 3.12, 4.88, 9.75, 24.96; 8 to 15 σ_X | §7 | `natal-cap-13-anchored-calm.js`; `natal-cap-31-calm-vs-kill.md`; `natal-cap-35-x-multiplicity.js` |
| 9.2%, −0.9%, 0.2%, 0.5%; 0.79325 | §10 | `research/anchored-calm.md`; `natal-cap-11-kstar23.js` |

Files produced for this note:

| file | sha256 | role |
|---|---|---|
| `prop2-check.py` | 65d764bcf7abf9b92a142c00d975c44fdd1397a4399116e2757e654e038c4268 | Proposition 2 brute force, E(7), ensemble cardinality at @7, @11 |
| `prop2-check-out.txt` | 614900ddb5d088b2376c82ab747bc998a81b630ab5ff3d73623a2d514d5fa67d | its output |
| `registry-factsheet-2026-09-11.md` | bc993b44bdd997837e74752627fc6a37f63d09c14b85fb7fabe2b4b64c2630c7 | registry positions and bibliographic records, with locators |
| `anchored-recipe.md` | 4c8b2fbabda786c659a404ce5c9094a5dee10abbba05eeec379ea3a6eb770368 | replay recipe: commands, inputs, hashes, timings |
| `beta-recompute.py` | 846085d085bda8e3d48b8521629bac487e2726adb5cb2565119e745c239e02f7 | independent S, E, β at @7 to @23 and the Lemma 2 check |
| `beta-recompute-out.txt` | f735be36445a644b87bf04a56429afce12cfbb26bc9700ed33022bd1fb4cd65c | its output |
| `natal5-variance.normalized.txt` | 3f8f961c2b525afce5b58bd613a60137c97b5f5395c03cd8e4f54af92fcdb997 | normalised producer output, equals recorded out-sha256 |
| `natal-cap-13-anchored-calm.normalized.txt` | 073c2149c813fe6071c8b86633d2c70de5a5a9581884bd4025d02ca27c235d77 | same |
| `natal-cap-11-kstar23.normalized.txt` | 4642b1ffc4ccc6efde82cdb1fca6d61f7afae47c281dc6cfeabc82707824db7c | same |
| `natal-cap-30-skeleton-bound.normalized.txt` | 53d19ce0e170ff878e3b0bc83d3eb61694725a209595f97151289515ed4680e1 | same |
| `natal-cap-16-fast-variance.normalized.txt` | 5085d20e264e4c87a3b3c7f2ea7d68ae44b43687aa9514be79347faf31100ef6 | same |

Raw stdout of every producer carries timing stamps and is not stable; only the `tailfmt.normalize()` form hashes reproducibly, and those are the hashes above.

Files added by Draft 2 (the five node producers were not replayed again for this draft; their replay is Draft 1's, checked for custody by report #67):

| file | sha256 | role |
|---|---|---|
| `beta-recompute-d2.py` | 0ca8576de4ae0ceb2097f043c7fe180b9c2f81b76f2d62e470be635f1faea036 | Draft 1's independent recomputation with the version banner and timings moved to stderr (report #67 item 3.6, review #25 §2), so its stdout hashes portably |
| `beta-recompute-d2-out.txt` | 1fd8c83b2699e8c55285ac9078a4afe588784add20faeef0e7b538bdc76ebaf4 | its stdout: S = 8, 45, 307, 3099, 38380, 597475; Lemma 2 on all 639,314 survivors; first survivors 17, 71, 191, 821, 3167, 15137 (6.7 s here) |
| `prop2-check-d2-out.txt` | 614900ddb5d088b2376c82ab747bc998a81b630ab5ff3d73623a2d514d5fa67d | `prop2-check.py 200000` rerun: 1442 pairs, 0 failures; ensemble cardinality false at @7, true at @11 |
| `draft2-checks.py` | 97f845fbe6aadfab8fa8f4d9119159314d2794e1a7aec808b33588a767427a1c | the recomputations behind the Draft 2 numbers: εW at nine levels, θ(y) > y/2 and the √W/4 inequality, c′ and E/(c′W/ln²W) at ten levels, the mirror counterexample, the residual ladder and the ratio 82.48 |
| `draft2-checks-out.txt` | 3f370c3cb8b491c0076ae22b27684f9433ff6793335bcc73184ce9151c756c01 | its output |

## Appendix B. Custody residuals in the underlying records

1. `paper/anchored-note.md` §1: "By CRT the phase vector (t mod q)_q is distinct for every t ∈ [0, W), so the strike-statistics ensemble has exactly W members." True for x ≥ 11; at x = 7 the scour primes are 11 and 13 and the map has 143 values on 210 rotations. No quoted rank is at @7.
2. `paper/anchored-note.md` §8: Proposition 2 is stated as an implication; it is an equivalence with the comb-restricted conjecture (§4 here).
3. `paper/anchored-note.md` §6, Lemma 1: repaired 2026-09-06; the proposal records the repair, the research note's text should be checked to carry it.
4. `paper/anchored-note.md` §3, Proposition 1: stated without the hypothesis ε ≥ 1/W; its proof pairs the deep ensemble's ε with the rotation ensemble's cardinality after forbidding it; §6 calls E "the exact rotation-ensemble mean" where it is the deep-period mean.
5. `paper/anchored-note.md` §6: "the scour is 1,117,922 primes" at @41 is π(y); the scour is 1,117,909.
6. `paper/anchored-note.md` §4: "t = W/2 is the unique mirror-fixed phase" is correct for the phases in [0, W); Draft 1 of this note replaced it with "0 and W/2", which is false (§7). `research/natal-cap-19-calm-lemma.md`, Lemma 3, takes a congruence modulo W at the step introducing it, which is the same error at the source (report #67, item 1.1), corrected by return #1537 (`calm-lemma-lemma3.patch`, accepted 2026-09-23) — that patch is not yet applied to the served copy, which still carries the old step, so the source line lands only when it is; the valid identities there (mirror covariance, the fusion identity at the anchor, dev(W/2, q) = 2 × a single-class deviation) are unaffected. The research note's "the counterpoint at W/2 is a theorem" should read: mechanism proven, aggregate loudness measured.
7. `paper/anchored-note.md` §10: "the classical series is now the settled description at every computed level"; the residuals at @7 through @19 are −0.1005, +0.0686, +0.0173, +0.0136, +0.0161.
8. `paper/anchored-note.md` §6, Lemma 2: "except possibly itself" (the self-strike forbids q = r as well) and the vacuous (√W, √(W+1)] case.
9. `research/natal5-variance.js` fails the record's own gate (`research/qc/embed.js --check`, exit 1): code-sha256 differs from the 2026-08-18 embed while body and output are bit-honest. The numbers stand; the file needs a re-embed.
10. `research/natal-cap-30-skeleton-bound.js` certifies @11 through @23; its header says "@11 through @29". The @29 value 0.1176 is a hand-noted line in `natal-cap-36-skeleton-door.js` from a non-default invocation, with no gate-checked output. `research/anchored-calm.md` and `paper/anchored-note.md` §10 state six certified levels.
11. `paper/anchored-note.md` §2: the relative roundoff bars "4.6e−9, 2.6e−7, 5.8e−6" mix denominators; @23's 4.6e−9 is bar/E, and against Var it is 1.3e−8. This note prints absolute bars only.
12. `research/natal-cap-33-overnight.js` and `research/natal-cap-37-at41-march.js`, the sole sources for the @37 and @41 rows, carry readable output blocks (cap-33 RUN 2 from line 486 and RUN 3 from line 565; cap-37's copied shard logs from line 635), which are hashable as bytes, but no contemporaneous embed fingerprint binding code to output; Draft 1 said "no embedded OUTPUT block", which overstated the gap (report #67, item 3.7). Conversely, `natal5-variance.js`'s code-hash mismatch with unchanged output (item 9) does not by itself establish that the edit was cosmetic; a code diff would.
13. `research/covering-dive.md` §2.2 is a search record for upper bounds on the two-class Jacobsthal gap; the research note's §9 cites it for the absence of lower bounds on a two-class count. The two are different objects (§6 here).
14. `research/anchored-calm.md` and `paper/anchored-note.md` §4 assign "rank 14 of 9,699,690 at @19" without naming the statistic; it is the VR rank, and the Z2 rank there is 6 (`natal-cap-19-calm-lemma.js`, OUTPUT lines 513–516).
15. Draft 1's recipe gives 323.6 s for the producer replay while its report says 628 s; the second figure includes the gates' repeat executions, and this draft did not replay the producers.

## Appendix C. Registry updates this draft implies

Proposed, not made.

- `paper/proposals/PROPOSALS.md`, row `prop-anchored-note.md`: a draft in the short-note form now exists; the row's grade is unchanged (HELD) pending the owner's decision and an expert read.
- `paper/proposals/prop-anchored-note.md` §3: add this file to the evidence table; §1: Proposition 2 is an equivalence.
- `research/SEARCH-CONVENTIONS.md` §1: an owning-convention row for the anchored bias is still to be written; this note's §8 depends on it.
- `research/natal-cap-19-calm-lemma.md`, Lemma 3: the congruence-modulo-W step is corrected by return #1537 (Appendix B, item 6; accepted, not yet applied to the served copy); `paper/anchored-note.md` §4: "the counterpoint at W/2 is a theorem" needs the mechanism/loudness split of §7 here; §3 there: Proposition 1 needs the hypothesis ε ≥ 1/W and the nine-value count.

*Superseded claims are recorded in `research/history/CHANGELOG.md`.*
