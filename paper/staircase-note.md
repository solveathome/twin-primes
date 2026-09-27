# The Staircase Theorem: per-prime hard caps on the Scour, and certified twin floors

**Calibration block.** Three objects, three rungs, one note. Theorem 3 (the per-prime hard caps) is PROVEN, elementary and self-contained. Theorem 8 (the certified twin floors) is CERTIFIED at six tile levels, @11 through @29, and nowhere else: `research/natal-cap-08-staircase.js` asserts every cap against the actual march at 599 scour primes across four levels, and `research/natal-cap-11-kstar23.js` and `research/natal-cap-18-at29.js` extend the assertions to six levels and 10,201 scour primes, zero violations in all three (all three re-run for this revision, 2026-09-19). Theorem 6 (the tail theorem) is the one non-elementary ingredient: its asymptotic form is PROVEN from the Prime Number Theorem and Mertens' theorem, and its finite instances are explicit through Rosser and Schoenfeld. The K* law of §7 is MEASURED at six points and is not a theorem. The explicit head bound of §6.1 is PROVEN from a published inequality of Fan and Pomerance; its numerical comparison is VERIFIED by the script named there. Nothing in this note bears on the infinitude of twin primes, and §10 says where the parity obstruction stops this route.

**Registry status.** `paper/proposals/prop-staircase-note.md`, grade HELD. External submission is governed by the house moratorium recorded in `paper/PAPERS.md`; this file is the paper of record for the platform review.

## Abstract

Fix a prime x and the primorial tile W = x#. We count the twin-admissible residues of the tile in two of its three houses (the Natal@5 comb, N = 2∏_{7≤p≤x}(p−2) slots) and march the sieving primes q ∈ (x, √W] over them in ascending order. Each prime's fresh kills are the slots it strikes that no smaller sieving prime struck. We prove that fresh(q) is bounded by a quantity depending only on (W, x, q): a Legendre–Buchstab rough-number count of cofactors, plus a self-strike allowance of at most one (Theorem 3). The cap has three regimes as q climbs, and in the top regime q³ > W+1 it is a pure prime count whose sum over the whole upper half of the sieving range is (2 ln 2 + o(1)) W/ln W (Theorem 6), asymptotically negligible against the census N ≍ W/ln²x and yet one logarithm too coarse to certify a single survivor. Folding the comb's residue conditions and the first K freshness moduli into the cofactor count gives a monotone ladder of history-blind caps (Proposition 7). The least depth K* at which the ladder's sum falls below N certifies, by pigeonhole and the survivor-is-twin lemma (Lemma 5), a floor on the number of twin prime pairs in the tile without locating a strike or testing a slot for primality: 34, 110, 82, 1877, 4841 and 31,327 pairs at x = 11, 13, 17, 19, 23, 29 (Theorem 8), against true counts 45, 307, 3099, 38,380, 597,475 and 12,307,838. The escalation K* = 0, 0, 2, 10, 27, 69 is measured against the count of sieving primes below W^{1/4} and stays within a factor 1.00 to 1.35 of it over the six levels. The per-prime caps are classical sieve identities applied per remover; what the note offers is the framing, the machine-asserted ladder with its certified floors, and K* as a reproducible measure of how steep the sieve wall is in a fixed tile. Positioning, per the programme statement: a new lens over classical sieve-theoretic objects, not a new branch of mathematics.

## 0. The wall, first

Every result below is finite or asymptotic in x and none approaches the twin prime conjecture. The caps are history-blind: they never use where an earlier strike landed. Actual removals approach the census (50%, 69%, 79%, 85%, 89%, 91% of N at the six levels), so a history-blind cap family that certifies survivors must be tight to a factor 1 + O(survivors/N), and the price of that tightness is the depth K*, which grows with the level (§7). The underlying counting problem, #{m ≤ t : m rough, qm ± 2 rough}, is Brun-sieve territory, and the parity obstruction is the reason no cheap refinement finishes it (§10). The tail theorem confines the twin question inside a tile to the head q ≤ W^{1/3} and does nothing more.

## 1. Setting and definitions

Fix a prime x ≥ 7 and let W = x# be the primorial. The **tile** T_x is the residue interval [0, W) (canonical alias, stated once per the glossary convention: the primorial wheel mod x#; `research/GLOSSARY.md`). Inside the tile we work with the **Natal@5 comb** carried to level x (canonical alias: the two twin-admissible residue classes 11, 17 of the mod-30 wheel, refined by the twin-admissibility conditions at every wheel prime 7 ≤ p ≤ x):

  N_x = { r ∈ [0, W) : r ≡ 11 or 17 (mod 30), and r mod p ∉ {0, p−2} for every prime 7 ≤ p ≤ x }.

Equivalently N_x = { r ∈ [0, W) : r ≡ 11 or 17 (mod 30), gcd(r(r+2), W) = 1 }: these are the twin slots of the tile lying in Houses 11 and 17 (the descendants of the fold-5 natal cohort), two thirds of the full twin census, excluding the edge House 29. By the Chinese remainder theorem,

  N := |N_x| = 2·∏_{7 ≤ p ≤ x} (p−2) = 10, 90, 990, 14,850, 252,450, 5,301,450, 143,139,150
  at x = 7, 11, 13, 17, 19, 23, 29.

The **Scour** (canonical alias: the sieving primes of the interval) is the set of primes q with x < q and q² ≤ W, marched in ascending order. A scour prime q **strikes** the slot r when r ≡ 0 or −2 (mod q), that is, when q divides r or r+2. A strike by q on r is **fresh** if no smaller scour prime strikes r; fresh(q) denotes the number of fresh strikes of q. Since the march is ascending, the fresh strikes of q are exactly the slots q removes from the alive set (its kills), and

  survivors := N − Σ_q fresh(q)

is the number of slots never struck by any scour prime. There are 10 / 34 / 120 / 435 / 1739 / 7863 scour primes at x = 11 / 13 / 17 / 19 / 23 / 29 (√W = 48.1 / 173.3 / 714.5 / 3114.4 / 14,936.3 / 80,434.4).

A **self-strike** is a fresh strike of q on the slot containing q itself, r = q or r = q−2. It is proven elsewhere in this programme (`research/scour-into-fixed-tile.js`, verified at every computed level) that a self-strike occurs iff the pair (q, q±2) is a genuine twin prime, so a self-strike is a twin found rather than a candidate destroyed; for the caps below we only need that each q has at most one self-strike slot (Lemma 2).

Two counting functions. For real t ≥ 0 and a prime z let

  Φ*(t, z) = #{ 2 ≤ m ≤ t : P⁻(m) ≥ z },

where P⁻(m) is the least prime factor (canonical alias: the Legendre–Buchstab partial-sieve count; Φ*(t, z) = Φ(t, z′) − 1 where Φ(t, ·) is the standard count of z′-rough integers including m = 1 and z′ is any real in [the predecessor prime of z, z)). And let

  s(q) = 1 if q mod 30 ∈ {11, 13, 17, 19},  s(q) = 0 otherwise.

Throughout, π is the prime-counting function; since π(⌊t⌋) = π(t), floors are dropped where harmless.

## 2. The Cofactor Rigidity Lemma

**Lemma 1 (Cofactor Rigidity).** Let q be a scour prime and r ∈ N_x a fresh strike of q which is not a self-strike. Then exactly one of the following holds:

- **(A)** q | r, and r = qm with 2 ≤ m ≤ ⌊(W−1)/q⌋ and P⁻(m) ≥ q;
- **(B)** q | r+2, and r+2 = qm with 2 ≤ m ≤ ⌊(W+1)/q⌋ and P⁻(m) ≥ q.

In both cases m ≥ q, hence r ≥ q² − 2: a prime's genuine (non-self) fresh victims all lie at or beyond q² − 2 (the p²-rule seen from the kill side; `research/scour-into-fixed-tile.js`).

*Proof.* q strikes r means q | r or q | r+2; not both, since q > 5 cannot divide 2. Note that every prime in the open interval (x, q) is itself a scour prime (it exceeds x, and it is < q ≤ √W).

Case A: write r = qm. Since 11 ≤ r ≤ W−1, we get 1 ≤ m ≤ ⌊(W−1)/q⌋; m = 1 is the self-strike r = q, excluded by hypothesis, so m ≥ 2. Suppose a prime p ≤ x divides m; then p | r. But r ≡ 11 or 17 (mod 30) forces gcd(r, 30) = 1, excluding p ∈ {2, 3, 5}, and the comb condition r mod p ≠ 0 excludes 7 ≤ p ≤ x. Suppose instead a prime q′ with x < q′ < q divides m; then q′ | r, so the scour prime q′ struck r earlier in the ascending march, contradicting freshness. Hence every prime factor of m is ≥ q, that is, P⁻(m) ≥ q.

Case B: write r + 2 = qm. Since 13 ≤ r+2 ≤ W+1, we get 1 ≤ m ≤ ⌊(W+1)/q⌋; m = 1 is the self-strike r = q−2, excluded, so m ≥ 2. A prime p ≤ x dividing m divides r+2. But r+2 ≡ 13 or 19 (mod 30) forces gcd(r+2, 30) = 1, and the comb condition r mod p ≠ p−2 says precisely p ∤ r+2 for 7 ≤ p ≤ x. A prime q′ ∈ (x, q) dividing m gives q′ | r+2, that is, r ≡ −2 (mod q′): q′ struck r earlier, contradicting freshness. Hence P⁻(m) ≥ q.

Finally m ≥ P⁻(m) ≥ q, so r = qm ≥ q² in case A and r = qm − 2 ≥ q² − 2 in case B. ∎

## 3. Self-strikes: classification, and the never-self-strike lemma

**Lemma 2 (self-strike classification).** A scour prime q has at most one self-strike slot, namely:

- r = q, possible only when q ≡ 11 or 17 (mod 30);
- r = q−2, possible only when q ≡ 13 or 19 (mod 30);
- and if q ≡ 1, 7, 23, or 29 (mod 30), then q can never self-strike a Natal@5 slot.

In particular the number of self-strikes of q is at most s(q).

*Proof.* Every slot satisfies r ≡ 11 or 17 (mod 30). The slot r = q lies on the comb iff q ≡ 11 or 17 (mod 30); the slot r = q−2 lies on the comb iff q − 2 ≡ 11 or 17, that is, q ≡ 13 or 19 (mod 30). A scour prime q > 5 is coprime to 30, so q mod 30 ∈ {1, 7, 11, 13, 17, 19, 23, 29}. The two residue sets {11, 17} and {13, 19} are disjoint, so at most one of the two candidate slots exists; and for q ≡ 1, 7, 23, 29 (mod 30) neither exists: the candidate positions land at q, q−2 ≡ 1, 29 / 7, 5 / 23, 21 / 29, 27 (mod 30) respectively, and none of these is 11 or 17. (For q ≡ 1 and q ≡ 29 the near-miss residue 29 is the edge House 29, which the Natal@5 comb excludes by construction.) ∎

The scripts assert self ≤ s(q) at every one of the 10,201 scour primes; the classification also refines the twin-finder reading of the self-strike column: only the four residues 11, 13, 17, 19 mod 30 can graduate through a Natal@5 slot.

## 4. The Staircase Theorem

**Theorem 3 (Staircase of hard caps).** For every scour prime q,

  fresh(q) ≤ Φ*(⌊(W−1)/q⌋, q) + Φ*(⌊(W+1)/q⌋, q) + s(q)  =: cap₁(q),

and the cap simplifies as q climbs the staircase:

- **(i) Prime regime, q³ > W+1.** Here Φ*(t, q) = π(t) − π(q−1) for both arguments, so
    fresh(q) ≤ π(⌊(W−1)/q⌋) + π(⌊(W+1)/q⌋) − 2π(q−1) + s(q) ≤ 2·( π((W+1)/q) − π(q−1) ) + s(q),
  a pure prime-counting cap. Moreover every non-self fresh victim r of such a q satisfies r = q·p or r+2 = q·p with p prime, q ≤ p: late victims are exactly q × prime.
- **(ii) Semiprime regime, q⁴ > W+1 ≥ q³.** Here, with t = ⌊(W±1)/q⌋,
    Φ*(t, q) = π(t) − π(q−1) + Σ_{q ≤ p₁, p₁² ≤ t} ( π(t/p₁) − π(p₁−1) ),
  a prime count plus an exact semiprime count (both factors ≥ q).
- **(iii) General regime.** Φ* is computed exactly (Legendre/Buchstab counting; trivial at these sizes).

*Proof.* Fix q. By Lemma 2 at most s(q) fresh strikes are self-strikes. Every other fresh strike falls in case (A) or (B) of Lemma 1, and the maps r ↦ r/q (case A) and r ↦ (r+2)/q (case B) are injective into { 2 ≤ m ≤ ⌊(W−1)/q⌋ : P⁻(m) ≥ q } and { 2 ≤ m ≤ ⌊(W+1)/q⌋ : P⁻(m) ≥ q } respectively (a given r falls in exactly one case). Counting the two ranges gives the two Φ* terms. That proves the master inequality.

(i) If q³ > W+1 then t ≤ (W+1)/q < q². An integer m with P⁻(m) ≥ q is either prime (then m ∈ [q, t] and there are π(t) − π(q−1) of them) or composite, in which case m ≥ P⁻(m)² ≥ q² > t, which is impossible. Hence Φ*(t, q) = π(t) − π(q−1); monotonicity of π gives the relaxed symmetric form. The structural statement is Lemma 1 with m prime.

(ii) If q⁴ > W+1 ≥ q³ then t < q³, so m with P⁻(m) ≥ q has at most two prime factors counted with multiplicity (three factors ≥ q would force m ≥ q³ > t): m is prime in [q, t], or m = p₁p₂ with q ≤ p₁ ≤ p₂ and p₁p₂ ≤ t. The displayed sum counts the latter exactly (p₁ ranges over primes with q ≤ p₁ and p₁² ≤ t; for each, p₂ ranges over primes in [p₁, t/p₁]).

(iii) is a definition, not a claim. ∎

The script verifies, at every one of the 599 scour primes across @11/@13/@17/@19, both the inequality fresh(q) ≤ cap₁(q) and the regime identities: in the prime regime the exact Φ* equals the prime-count formula, and in the semiprime regime it equals prime count plus exact semiprime count (assertion failures would abort the run; none occur). At @17 the staircase reads: general regime {19, 23}, semiprime regime {29, …, 79} (13 primes), prime regime {83, …, 709} (105 of the 120 scour primes; π(709) − π(79) = 105).

**Corollary 4 (pigeonhole).** survivors ≥ N − Σ_q cap₁(q); and the same holds with cap₁ replaced by any family of per-prime upper bounds on fresh(q).

Measured: cap₁ alone never closes the pigeonhole at any computed level. Σ cap₁ / N = 3.2 / 5.1 / 6.7 / 8.0 / 9.1 / 10.1 at x = 11 / 13 / 17 / 19 / 23 / 29 (Σ cap₁ = 288 / 5052 / 99,729 / 2,025,930 / 48,424,543 / 1,443,004,515 against N = 90 / 990 / 14,850 / 252,450 / 5,301,450 / 143,139,150), an overshoot of 6.4× to 11.0× against the actual removals 45 / 683 / 11,751 / 214,070 / 4,703,975 / 130,831,312. Section 6.1 shows the overshoot is of order ln x by an explicit inequality; Section 7 closes the pigeonhole; Section 8 says exactly where the slack lives.

## 5. Survivors are twins

**Lemma 5 (survivor = twin pair).** Let r ∈ N_x survive every scour prime (x ≥ 7). Then r and r+2 are both prime.

*Proof.* Suppose r is composite; it has a prime factor p ≤ √r ≤ √(W−1). The comb conditions exclude p ≤ x (as in Lemma 1, case A); survival excludes the scour primes, that is, all primes in (x, √W]. So p would satisfy √W < p ≤ √(W−1), which is empty. Suppose r+2 is composite; it has a prime factor p ≤ √(r+2) ≤ √(W+1), and as before the only room left is √W < p ≤ √(W+1). An integer n in the interval (√W, √(W+1)] satisfies W < n² ≤ W+1, forcing n² = W+1. But W = x# ≡ 2 (mod 4) for x ≥ 2 (the factor 2 appears exactly once), so W+1 ≡ 3 (mod 4), and no square is ≡ 3 (mod 4). So no such p exists, and r+2 is prime. ∎

The scripts verified the emptiness of (last scour prime, √(W+1)] numerically at all six levels (last scour primes 47 / 173 / 709 / 3109 / 14,929 / 80,429); the mod-4 argument above upgrades the per-level check to all x. This lemma is the crystallization principle from the kill side: a slot the whole Scour misses is a genuine twin pair.

## 6. The tail theorem

The prime-regime cap is strong enough to retire the entire upper half of the Scour asymptotically.

**Theorem 6 (tail theorem).** With W = x#, sum over the scour primes q with q³ > W+1 (the tail q > (W+1)^{1/3}):

  Σ_q [ 2·( π((W+1)/q) − π(q−1) ) + s(q) ] = (2 ln 2 + o(1)) · W / ln W  as x → ∞.

Consequently the tail cap is Θ(W / ln W), while N ≍ W/ln²x, so

  (tail cap) / N ≍ (ln x)² / x → 0:

the whole scour tail q ∈ (W^{1/3}, √W] is asymptotically negligible against the census, unconditionally, by prime counting alone. The twin question inside a tile is carried entirely by the head q ∈ (x, W^{1/3}].

*Proof.* This part of the note uses standard asymptotics (the Prime Number Theorem and Mertens' theorems), flagged as such; everything else in the note is elementary and finite. The error terms first: Σ s(q) ≤ π(√W) ≪ √W, and Σ 2π(q−1) ≤ 2·π(√W)² ≪ W/ln²W, both o(W/ln W). Main term: write q = W^θ, θ = ln q / ln W ∈ (1/3, 1/2]. Then (W+1)/q = W^{1−θ}(1+o(1)) ≥ W^{1/2}, and the Prime Number Theorem gives, uniformly in this range,

  π((W+1)/q) = (1+o(1)) · W / ( q·(1−θ) ln W ).

By Mertens' second theorem, Σ_{q ≤ y} 1/q = ln ln y + M + o(1), the measure of {1/q} on the θ-axis is dθ/θ: for fixed 1/3 ≤ a < b ≤ 1/2, Σ_{W^a < q ≤ W^b} 1/q = ln(b/a) + o(1). Partial summation against the continuous factor 1/(1−θ) yields

  Σ_q 1/( q (1−θ_q) ) → ∫_{1/3}^{1/2} dθ / ( θ(1−θ) ) = [ ln( θ/(1−θ) ) ]_{1/3}^{1/2} = ln 2,

so the main term is (2 ln 2 + o(1)) W/ln W. For the consequence: N/W = (1/15)·∏_{7 ≤ p ≤ x}(1 − 2/p), and by Mertens ∏_{2 < p ≤ x}(1 − 2/p) ~ 4C₂e^{−2γ}/ln²x (C₂ = 0.66016… the twin-prime constant), so N/W ~ (4/3)C₂e^{−2γ}/ln²x, while ln W = θ(x) ~ x (Chebyshev); hence (tail cap)/N ~ (30 ln 2 / c)·(ln x)²/x with c = 20·C₂e^{−2γ} = 4.16215…, prefactor 30 ln 2 / c = 4.996. ∎

**Explicit finite bounds (Rosser–Schoenfeld).** For any prime-regime q, with B = ⌊(W+1)/q⌋, the cap is bounded by the closed form

  fresh(q) ≤ 2·( 1.25506·B/ln B − (q−1)/ln(q−1) ) + 1,

using π(t) < 1.25506·t/ln t for t > 1 and π(t) > t/ln t for t ≥ 17 [J. B. Rosser and L. Schoenfeld, *Approximate formulas for some functions of prime numbers*, Illinois J. Math. 6 (1962), 64–94, Theorem 1]. The single boundary case in our range is q = 17 at @11 (q−1 = 16 < 17), where π(16) = 6 > 16/ln 16 = 5.771 is checked directly. The measured tail ledger (`research/natal-cap-08-staircase.js`):

| x  | tail primes | exact Σ cap₁ (tail) | Rosser–Schoenfeld closed form | PNT-form 2ln2·W/lnW | tail cap₁ / N | tail actual / cap₁ |
|----|------------|--------------------|------------------------------|--------------------|--------------|-------------------|
| 11 | 9          | 215                | ≤ 262                        | 413                | 2.39         | 0.149             |
| 13 | 29         | 2,720              | ≤ 3,220                      | 4,038              | 2.75         | 0.117             |
| 17 | 105        | 42,895             | ≤ 50,406                     | 53,847             | 2.89         | 0.091             |
| 19 | 396        | 724,717            | ≤ 854,132                    | 835,838            | 2.87         | 0.075             |

The exact sum sits below the Rosser–Schoenfeld closed form at every level, as it must. The PNT-form column is an asymptotic guide and not a bound: at @19 it is already below the RS bound (835,838 < 854,132). This corrects the source script's READINGS §6, which claims "exact < RS < PNT at all four levels"; the OUTPUT block itself shows otherwise at @19. House rule: refutations stay visible.

The ratio (tail cap)/N ≈ 2.4 to 2.9 at our levels, and the asymptotic crossover below 1, measured against the exact finite products rather than the limit formula, first occurs at x = 149 (θ(x) = ln W = 131.6, W ≈ 10⁵⁷), decaying to 0.251 by x = 997. Two limits, stated plainly: (a) at the computable levels the tail cap still exceeds N, so the tail theorem certifies nothing per se there (with the refined cap₂ of §7 the tail costs only ≈ 0.44 to 0.49·N already at x = 11 to 19); (b) even asymptotically, the tail cap Θ(W/ln W) exceeds the true survivor count ≍ W/ln²W by a factor of ln W: prime counting alone is one logarithm too coarse to certify survival at any x. Its role is to confine the problem to the head.

### 6.1 Sharper explicit inputs: what changes and what does not

The earlier draft of this note named a comparison it had not made: substituting the Fan–Pomerance inequality for the Rosser–Schoenfeld closed form. We have made it, and the answer has two halves.

**Regime mismatch in the tail.** Fan and Pomerance prove: for 3 ≤ y ≤ √t, Φ(t, y) < 0.6·t/log y, and the same for 2 ≤ y ≤ √t when t ≥ 10 [K. Fan and C. Pomerance, *An inequality related to the sieve of Eratosthenes*, J. Number Theory 254 (2024); arXiv:2306.03339v3, Theorem 1, read from the arXiv text]. In the prime regime the cap's arguments satisfy t < q², so y = q−1 > √t lies outside the theorem's hypothesis, and there Φ(t, q−1) = π(t) − π(q−1) + 1 is a prime count in any case. The inequality therefore cannot tighten Theorem 6 or its finite ledger; the trigger written in the proposal ("if the substitution tightens the tail theorem") cannot fire as phrased. The sharper input for the tail is a sharper explicit π bound. With Dusart's π(t) ≤ (t/ln t)(1 + 1.2762/ln t) for t > 1 [P. Dusart, *The k-th prime is greater than k(ln k + ln ln k − 1) for k ≥ 2*, Math. Comp. 68 (1999), 411–415; the statement is quoted from secondary sources (Dusart's own restatement in Ramanujan J. 45 (2018) and later explicit-estimate papers) and is UNVERIFIED at the primary page for this revision] in place of 1.25506·t/ln t, the tail closed form at @19 falls from 1.179× to 1.046× the exact tail sum (`compare1426.py`, this revision; at @11 the older constant is the better one, 1.223× against 1.276×, since Dusart's second-order term is large at small t).

**Where Fan–Pomerance bites: the head.** In the head q³ ≤ W−1 the cap's arguments satisfy q−1 ≤ √t, so the inequality applies to both terms of cap₁ with y = q−1 ≥ 3.

**Proposition 9 (explicit head bound).** For every scour prime q with q³ ≤ W−1,

  cap₁(q) ≤ 0.6·( ⌊(W−1)/q⌋ + ⌊(W+1)/q⌋ ) / ln(q−1) − 2 + s(q) < 1.2·(W+1) / ( q ln(q−1) ),

and hence Σ_{q³ ≤ W−1} cap₁(q) < 1.2·(W+1)·Σ_{x < q ≤ (W−1)^{1/3}} 1/(q ln(q−1)).

*Proof.* Φ*(t, q) = Φ(t, q−1) − 1, and Fan–Pomerance's Theorem 1 applies to both arguments with y = q−1 ∈ [3, √t], since q³ ≤ W−1 gives (q−1)² < q² ≤ (W−1)/q ≤ t. Adding the two bounds and s(q) gives the first inequality. For the second, s(q) − 2 ≤ −1 < 0 and ⌊(W−1)/q⌋ + ⌊(W+1)/q⌋ ≤ 2(W+1)/q. ∎

Measured against the exact head cap₁ (`compare1426.py`), the bound runs 1.157×, 1.129×, 1.120×, 1.108× the exact head sum at x = 11, 13, 17, 19 (exact 73 / 2,332 / 56,834 / 1,301,213; bound 84 / 2,633 / 63,675 / 1,441,547). Since Σ_{x<q≤y} 1/(q ln q) = 1/ln x − 1/ln y + o(1/ln x) by Mertens, the head cap is at most (1.2 + o(1))·W/ln x, while N ~ (4/3)C₂e^{−2γ}·W/ln²x: the whole cap₁ ledger is O(W/ln x) explicitly, and Σ cap₁/N ≪ ln x [INFERRED from Proposition 9, Theorem 6 and Mertens; the matching lower bound Σ cap₁ ≫ W/ln x is not proved here]. This is an explicit closed form for a quantity the earlier draft only tabulated; it does not change any certified floor, because Theorem 8 uses the exact counts and not their bounds.

## 7. The residue-refined ladder and the pigeonhole closures

Lemma 1 constrains only the divisibility skeleton of a fresh victim. But the victim is a *slot*: r ∈ N_x imposes congruences on r = qm (resp. r+2 = qm) that translate into congruences on the cofactor m. These conditions are deterministic, per-prime, and independent of the history of the march. Folding them in keeps the count exact and the cap hard.

**Definitions.** Fix q. For v = qm define the side conditions

- **A-side (victims with q | r, v = r):** v ≡ 11 or 17 (mod 30), and v ≢ p−2 (mod p) for every prime 7 ≤ p ≤ x;
- **B-side (victims with q | r+2, v = r+2):** v ≡ 13 or 19 (mod 30), and v ≢ 2 (mod p) for every prime 7 ≤ p ≤ x.

(The remaining comb conditions, v ≢ 0 (mod p), are automatic: p ∤ q and P⁻(m) ≥ q > x.) Let M denote the ascending list of scour primes (the freshness-moduli pool; the scripts use the first 12 at @11 through @19 and the first 192 at @23 and @29). For K ≥ 0 the **freshness conditions at depth K** require additionally, for each of the first K entries q′ of M with q′ < q:

- A-side: v ≢ 0 and v ≢ −2 (mod q′) [else q′ strikes r] (the first is void, since q′ ≠ q and P⁻(m) ≥ q > q′, so only v ≢ −2 excludes a class and the per-prime surviving share is 1 − 1/(q′−1); the dimension count that matters is one class per freshness prime);
- B-side: v ≢ 0 and v ≢ 2 (mod q′) [r = v−2: q′ | r ⟺ v ≡ 2; q′ | r+2 ⟺ v ≡ 0].

Define cap_K(q) = #A_K + #B_K + s(q), where #A_K counts 2 ≤ m ≤ ⌊(W−1)/q⌋ with P⁻(m) ≥ q satisfying the A-side and depth-K conditions on v = qm, and #B_K likewise with ⌊(W+1)/q⌋ and the B-side conditions. Write cap₂ := cap_0 (residues folded in, no freshness moduli).

**Proposition 7 (the ladder is a ladder of hard caps).** For every K ≥ 0 and every scour prime q,

  fresh(q) ≤ cap_K(q) ≤ … ≤ cap₂(q) ≤ cap₁(q).

Every cap_K is *history-blind*: it depends only on (W, x, q) and the identity of the moduli list (which primes marched earlier), never on where any earlier strike landed.

*Proof.* Every non-self fresh victim of q satisfies the side conditions (r ∈ N_x, transcribed as above) and, being fresh, is struck by *no* scour prime q′ < q, in particular not by the first K entries of M below q. So the injections of Theorem 3 land in the depth-K admissible sets, for every K. The chain is monotone because raising K only adds conditions. ∎

**Theorem 8 (certified twin floors; computational).** With a moduli pool M consisting of the first several scour primes of the level in ascending order, let K* be the least K with Σ_q cap_K(q) < N. Then, by Corollary 4 and Lemma 5, the tile provably contains at least N − Σ_q cap_{K*}(q) twin prime pairs. Certified (the scripts compute every cap_K ladder exactly and assert fresh ≤ cap at every rung):

| x  | W             | N           | Σ cap₁        | Σ cap₂ (K=0) | K* | Σ cap_{K*}  | certified twin pairs ≥ | true survivors |
|----|---------------|-------------|---------------|--------------|----|-------------|------------------------|----------------|
| 11 | 2,310         | 90          | 288           | 56           | 0  | 56          | **34**                 | 45             |
| 13 | 30,030        | 990         | 5,052         | 880          | 0  | 880         | **110**                | 307            |
| 17 | 510,510       | 14,850      | 99,729        | 16,135       | 2  | 14,768      | **82**                 | 3,099          |
| 19 | 9,699,690     | 252,450     | 2,025,930     | 308,401      | 10 | 250,573     | **1,877**              | 38,380         |
| 23 | 223,092,870   | 5,301,450   | 48,424,543    | 7,034,588    | 27 | 5,296,609   | **4,841**              | 597,475        |
| 29 | 6,469,693,230 | 143,139,150 | 1,443,004,515 | 202,133,083  | 69 | 143,107,823 | **31,327**             | 12,307,838     |

Producers: rows @11 to @19 `research/natal-cap-08-staircase.js`; @23 `research/natal-cap-11-kstar23.js`; @29 `research/natal-cap-18-at29.js`; each deeper script reproduces every shallower ladder digit for digit before extending. The freshness moduli actually used: none at @11 and @13; {19, 23} at @17; {23, 29, 31, 37, 41, 43, 47, 53, 59, 61} at @19; the 27 primes 29 to 151 at @23; the 69 primes 31 to 401 at @29. For this revision the four shallow rows were also re-counted by an independent implementation written from the definitions above (`check1426.py`, Python, uploaded with this revision): N, removals, Σ cap₁, the full cap_K ladder for K ≤ 12, K* and the floor agree at all four levels.

**The K* law, measured.** The escalation runs 0, 0, 2, 10, 27, 69 at @11 through @29. K* is sub-linear in the scour: K*/scour falls 0.0167, 0.0230, 0.0155, 0.0088 at @17 through @29, with pairwise growth exponents 1.25, 0.72, 0.62. What K* tracks instead is the quarter-power band. Writing φ(x) = π(W^{1/4}) − π(x) for the count of scour primes below W^{1/4}, the ratio K*/φ reads 1.00, 1.25, 1.29, 1.35 at @17 through @29. `research/natal-cap-11-kstar23.js` put a forecast on record before the @29 march: φ(29) = 51 and, if the drift 1.00, 1.25, 1.29 continued, K*(29) ≈ 71; the march measured 69. The reading in the paragraph below, that K* is forced upward until the moduli list is the Scour itself, is wrong about the rate at every computed level: closure depth is the quarter-power primes times a slowly drifting factor, and the drifting factor has not turned over. The limit statement is untouched, since cap_∞ does equal the march plus the self-strike allowance (measured 0.8874N at @23). Whether K*/φ converges, plausibly near 1.4, is open, and six points are not a law.

These are verifiable computations, not estimates: each cap_K(q) is a finite exact count over cofactors, each inequality is asserted against the actual march, and the pigeonhole is a subtraction. The theorems of §§2–4 are what make the counts *caps*.

**What this does and does not prove.** These are per-tile existence proofs of twin primes by pure counting caps: at @19, for example, the interval [0, 9,699,690) provably contains at least 1,877 twin prime pairs in Houses 11/17, established without locating a single strike or primality-testing a single slot. They are not steps toward infinitude. The facts themselves are cheap (the direct march verifies the far stronger truth column in under a second); the content is the *form*: history-blind, per-prime, independently provable caps suffice to force survivors, and K* is the exact price of that blindness. The escalation K* = 0, 0, 2, 10, 27, 69 is the sieve wall's signature in miniature: actual removals approach N (50% / 69% / 79% / 85% / 89% / 91% of the census at the six levels), so any history-blind cap family must be tight to a factor 1 + O(survivors/N) = 1 + O((ln x / ln W)²), while truncating freshness at the K-th modulus wastes roughly the tail of a Mertens product, forcing K* upward. The @19 ladder shows the diminishing returns: the first freshness modulus removes 13,047 from the cap sum, the tenth only 2,500. Bounding the underlying quantity #{m ≤ t : m rough, qm ± 2 rough} for the head primes is exactly Brun-sieve territory [V. Brun, *Über das Goldbachsche Gesetz und die Anzahl der Primzahlpaare*, Arch. Math. Naturvid. B34 (1915), no. 8; V. Brun, *Le crible d'Eratosthène et le théorème de Goldbach*, Skr. Norske Vid.-Akad. Kristiania I (1920), no. 3; H. Halberstam and H.-E. Richert, *Sieve Methods*, Academic Press, 1974, Ch. 2], and the parity obstruction is why no cheap refinement finishes it. Nothing here approaches a twin-prime proof.

## 8. Where cap₁'s slack lives (diagnostic remark)

The 6.4× to 11.0× overshoot of cap₁ is completely accounted for, which is what justified §7's construction. Three multiplicative losses, read off the victim's residue system: (a) the mod-30 house condition on v = qm (only 2 of the 8 coprime classes admissible per side: factor 1/4); (b) the second natal residue at each wheel prime 7 ≤ p ≤ x (factor ∏(1 − 1/(p−1)), the first residue being automatic); (c) the second freshness residue at each scour prime q′ ∈ (x, q) already marched (factor ∏(1 − 1/(q′−1)), a Mertens product decaying like ln x / ln q). The heuristic tightness

  pred(q) = (1/4) · ∏_{7 ≤ p ≤ x} (1 − 1/(p−1)) · ∏_{x < q′ < q} (1 − 1/(q′−1))

matches the measured ratio fresh/cap₁ to two or three significant figures down entire tables (@17: q = 19 ratio 0.161 vs pred 0.161; q = 29: 0.146 vs 0.145; q = 83: 0.116 vs 0.110), and re-weighting Σ cap₁·pred gives 47 / 688 / 11,837 / 215,658 against actual removals 45 / 683 / 11,751 / 214,070. Factors (a)+(b) are the deterministic congruences folded into cap₂; hence cap₂ of the *first* marcher is exact by construction (no freshness conditions exist for it: at @17, cap₂(19) = 1564 = fresh(19) + s(19) = 1563 + 1). Factor (c) is what the cap_K ladder buys back one modulus at a time. This decomposition is diagnostic, not a theorem; every inequality actually used is from §§2–7.

## 9. Related work and positioning

The per-prime caps are Legendre/Buchstab-type identities (counting rough numbers below a threshold) applied *per remover* rather than to the sifted set as a whole; regime (i) is the elementary fact that rough numbers below z² are prime, and regime (iii) is Legendre-style exact counting [standard references: Halberstam–Richert, op. cit., Ch. 1; A. C. Cojocaru and M. R. Murty, *An Introduction to Sieve Methods and Their Applications*, CUP 2006]. The counting function Φ carries its own current literature, now used in §6.1: Fan and Pomerance (op. cit.) prove the explicit unconditional Φ(x, y) < 0.6x/log y for 3 ≤ y ≤ √x; Weingartner, *A link between error terms when counting smooth and rough numbers*, arXiv:2604.22058 (2026), relates the error terms of the smooth and rough counting functions and derives an explicit bound for de Bruijn's smooth-number approximation from Fan's explicit rough-number bound; F. B. Holt, *On the counts of p-rough numbers*, arXiv:2308.07570 (2023), exhibits for fixed p a line of symmetry of Φ(x, p) and a periodic, bounded discrepancy ΔΦ(x, p) about it. The freshness ladder is a per-modulus truncation in the spirit of Brun's graded sieve (op. cit. 1920), with K* playing the role of Brun's depth budget; the companion studies in this repository price the same wall through Bonferroni depth (`research/natal-cap-06-bonferroni.js`) and through certified Selberg Λ² caps against the parity floor 2 [Selberg's examples, Halberstam–Richert p. 239; T. Tao, *Open question: the parity problem in sieve theory*, blog, 2007], with the current twin upper-bound record constant 3.29956 [J. D. Lichtman, *A modification of the linear sieve, and the count of twin primes*, Algebra & Number Theory 19:1 (2025) 1–38, Theorem 1.2; arXiv:2109.02851] (`research/natal-cap-10-sieve-cap.md`).

We make no claim that any inequality here is beyond classical technology: an expert would regard Theorem 3 as an exercise. On priority the registry's position governs, and it is this. `research/SEARCH-CONVENTIONS.md` §1 carries no owning-convention row for the per-remover cap in its per-tile, per-prime form, so the sentence "we have found no prior statement of it" is our framing and not a calibrated negative; the searches actually run cover the sieve-theory side (Halberstam–Richert, Cojocaru–Murty) and the Φ literature named above. Prior art probably exists for more of this than we attribute. The contribution claimed is the framing (fresh kills of a fixed comb, capped prime by prime, history-blind), the machine-verified ladder with its certified floors, and K*(x) as a quantitative, reproducible measure of the wall's steepness. Positioning per the programme statement: a new lens over classical sieve-theoretic objects, not a new branch of mathematics.

## 10. Limits and refutations, visible

1. **Finite results only.** Theorems 3 and 6 and Proposition 9 hold for all x; the certified floors (Theorem 8) are six finite computations. Nothing here bears on infinitude, and the K* escalation is evidence *against* this route scaling, not for it.
2. **The floors are weak against the truth** (34 vs 45, 110 vs 307, 82 vs 3,099, 1,877 vs 38,380, 4,841 vs 597,475, 31,327 vs 12,307,838). The point is the proof form. We record a reading of ours that was wrong: we took the falling ratio of floor to truth (0.76, 0.36, 0.026, 0.049, 0.0081, 0.0025) as a collapse of certificate efficiency with level. It is not. That ratio is measured at the crossing point K*, where the bound has only just climbed out of negative territory. At fixed relative depth the efficiency improves with level: bound/truth at K/scour = 10%, 25%, 50% runs 0.65 to 0.71 to 0.79, 0.88 to 0.91 to 0.94, and 0.97 to 0.98 to 0.99 across @17, @19, @23, monotone at every depth above 3% (`research/natal-cap-24-boundK-curve.js`, PART 4). The wall's fingerprint on this technology sits at the crossing, not along the curve.
3. **The tail theorem's asymptotic form is not elementary** (Prime Number Theorem and Mertens); the finite instances are explicit via Rosser–Schoenfeld, with the one boundary case (q = 17 at @11) checked directly. The PNT-form figure 2 ln 2·W/ln W is a guide and not a bound; it undercuts the RS bound at @19.
4. **Corrections to our own record.** The source script's READINGS §6 states "exact < RS < PNT at all four levels"; its own OUTPUT refutes the second inequality at @19 (854,132 > 835,838). Corrected in §6. Earlier task-sheet figures (105 of 120 prime-regime primes at @17, not 102 of 125) were corrected by the script and are used here. The earlier draft of this note described Weingartner's paper as an explicit error bound for Φ; the paper's own abstract makes it a bound for the smooth-number side derived from Fan's rough-number bound, and §9 now says so.
5. **Lemma 5's mod-4 argument** (no prime in (√W, √(W+1)] for any x) is proved in this note; the scripts verified it only at the six levels. It is one line and a second reader should check it.
6. **Self-strikes are counted as removals** in the pigeonhole, though each is itself a twin found; the floors therefore count only full-scour survivors and are conservative on that margin too.
7. **K* depends on the moduli pool** (first 12 scour primes at @11 to @19, first 192 at @23 and @29, ascending in both cases). A different pool or ordering could shift K*; the certified floors are valid for the stated pool, and any pool yields valid caps (Proposition 7).
8. **Six levels is a short ladder.** Theorem 8 is certified at @11 through @29 and nowhere else. The @29 run costs about 16 minutes on one core (`research/natal-cap-18-at29.js`, embedded OUTPUT: 973 s); @31 has W = 200,560,490,130, thirty-one times the @29 tile, and its march and ladder have not been run. What happens to K*/φ at @31 is not known.
9. **The Fan–Pomerance trigger in the proposal was mis-aimed.** The proposal's upgrade trigger asked for the substitution "into §6". §6.1 shows the inequality does not apply in the prime regime at all; it bounds the head, where it gives Proposition 9. The tail's sharper input is a sharper explicit π bound, and the Dusart constant quoted there is confirmed only through secondary sources, UNVERIFIED at its primary page in this revision.
10. **Proposition 9's asymptotic reading is one-sided.** Σ cap₁ = O(W/ln x) is proved; the matching lower bound, which would make "cap₁ never closes at any level" a theorem rather than a measurement at six levels, is not.

## 11. Reproduction

Everything quoted in §§4–8 regenerates from `node research/natal-cap-08-staircase.js` (1.1 s on the machine used for this revision, no dependencies): the march itself, every cap at every rung (assert-guarded: fresh ≤ cap_K ≤ … ≤ cap₂ ≤ cap₁ and self ≤ s at all 599 scour primes), the regime identities of Theorem 3, the ladder sums, the tail sums and their RS closed forms, and the asymptotic crossover table. The two deeper rows of Theorem 8 and the K* law come from `node research/natal-cap-11-kstar23.js` (@23, W = 2.23·10⁸; 13 s) and `node research/natal-cap-18-at29.js` (@29, W = 6.47·10⁹, segmented march; 973 s in the embedded OUTPUT), each of which reproduces every shallower ladder before extending. The pasted OUTPUT block in each file is the ledger this note quotes. The independent re-count of the four shallow rows is `check1426.py` (Python, 7 s at @19) and the §6.1 comparisons are `compare1426.py`, both uploaded with this revision. Companions: `research/scour-into-fixed-tile.js` (the fixed-tile march and p²-rule), `research/NATAL-CAP-CAMPAIGN.md` (the campaign context), `research/natal-cap-24-boundK-curve.js` (the depth curve of §10 item 2), `research/GLOSSARY.md` (vocabulary and canonical aliases).

## 12. Authorship and AI disclosure

Sole author: Chris Benjaminsen.

> The framework, vocabulary, and driving questions are the author's, developed over six years of independent work; the per-prime cap question answered here, and the tile/Scour objects it is posed in, are his. Formal derivations, the literature audit, the verification code, and the drafting of this note were carried out using AI assistants under the author's direction. Computations have reproducible code and recorded outputs; asymptotic arguments require their stated mathematical inputs and are not proved by finite checks. Refuted intermediate claims, including corrections to this note's own source script and to its earlier draft, are retained in the record.
