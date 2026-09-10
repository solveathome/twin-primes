# natal-cap-12 — the sub-CRT overlap sign: proofs, refutation, and the priced law

<!-- ledger
id: Q-natal-cap-overlap-sign
status: CLOSED
todo: none
question: Is the sub-CRT overlap bound S2 <= sum of 4N/(q q') provable, per pair or in aggregate?
verdict: REFUTED as an inequality at every granularity, with 40 to 53 percent of pairs sitting above CRT at x = 11 through 23 and named exhibits at each level; what survives is proven structure, an exact per-pair-computable aggregate deficit, with the remainder a sign-alternating discrepancy at noise scale.
-->

2026-08-14. Companion to `natal-cap-12-overlap-sign.js` (all statements below are
machine-verified there; "verify A/B/C" and the T2 line in the output are the checks).
Question under attack (campaign TODO 2, from natal-cap-06 readings 3/7): is
S₂ = Σ_{q<q′} |A_q ∩ A_q′| ≤ Σ 4N/(qq′) provable — per pair or in aggregate?

**Answer: refuted as an inequality at every granularity; the aggregate deficit is
proven structure (an exact, per-pair-computable term), and the remainder is a
sign-alternating discrepancy at noise scale.**

L1 below, the Window Dilation Lemma, is also one of the three proven ingredients
of the certificate machinery: [certificate-engine.md](certificate-engine.md).

## Notation

Level x, W = x# (the tile width), N_x the Natal@5 set
{r ∈ [0,W) : r ≡ 11,17 (mod 30), r mod p ∉ {0, p−2} for 7 ≤ p ≤ x}, N = |N_x| =
2·∏_{7≤p≤x}(p−2). Scour primes x < q < q′ ≤ √W; Q = qq′; ρ = W mod Q.
A_q = {r ∈ N_x : r ≡ 0 or −2 (mod q)}. Since q is odd, the two classes are disjoint,
so A_q ∩ A_q′ partitions into four **combos** (a,b) ∈ {0,−2}²:

    cnt_{(a,b)} = #{r ∈ N_x : r ≡ a (mod q), r ≡ b (mod q′)}.

By CRT each combo is one residue class c mod Q; write c₍₀,₀₎ = 0, c₍₋₂,₋₂₎ = Q−2,
and for the mixed combos c₍₀,₋₂₎ + c₍₋₂,₀₎ ≡ −2 (mod Q) (sum the congruences mod q
and mod q′; both mixed classes lie in (0, Q−2), so the sum is exactly Q−2).
The CRT prediction is N/Q per combo, 4N/Q per pair.

## L1 — Window Dilation Lemma

**Statement.** Fix a combo class c. The map t ↦ r = c + tQ is a bijection from

    T_c = { t ∈ [0, L_c) : t ≡ (11−c)·Q̄₃₀ or (17−c)·Q̄₃₀ (mod 30),
                            t ≢ −c·Q̄_p and t ≢ −(c+2)·Q̄_p (mod p) ∀ p ∈ [7,x] }

onto N_x ∩ {r ≡ c mod Q} ∩ [0, W), where Q̄_m = Q⁻¹ mod m and

    L_c = ⌊W/Q⌋ + [c < ρ].

Moreover the t-conditions define a natal-type pattern (two allowed unit classes
mod 30, two forbidden classes mod each p) whose census over any full period of
length W in t is exactly N.

**Proof.** gcd(Q, 30·∏p) = 1 because q, q′ > x ≥ 11 are primes. The class
{r ≡ c mod Q} ∩ [0,W) is {c + tQ : 0 ≤ t < L_c} with L_c = ⌈(W−c)/Q⌉; writing
W = Q⌊W/Q⌋ + ρ (ρ ≥ 1 since gcd(Q,W)=1) gives L_c = ⌊W/Q⌋+1 for c < ρ and ⌊W/Q⌋
for c ≥ ρ. For each modulus m ∈ {30} ∪ {p}, r ≡ v (mod m) ⟺ t ≡ (v−c)Q̄_m (mod m);
substituting the natal conditions (r ∈ {11,17} mod 30; r ∉ {0, −2} mod p) gives the
displayed t-conditions. The two forbidden classes mod p are distinct (their
difference is −2Q̄_p ≢ 0), and the two allowed classes mod 30 are units times units,
so per period of lcm = W the t-pattern count is 2·∏(p−2) = N. ∎

The forbidden-class *gap* in t-space is −2Q̄_p, not −2: the combo windows are
**dilated** natal patterns, one per pair — the rotation-and-dilation ensemble of
natal-cap-03/05, anchored at a specific origin.

## L2 — Class-sum identity

Σ_{c mod Q} cnt_c = N (the classes partition N_x). Hence the CRT value N/Q is the
**exact average over all Q classes**, and per-pair deviations measure anchoring
only, not normalization. (Verified exhaustively for the pair 13·17 at @11.)

## L3 — Fair-price identity

For every class c,

    N·L_c/W = N/Q + N·(Q·[c<ρ] − ρ)/(QW).

*Proof:* substitute L_c from L1 and W = Q⌊W/Q⌋ + ρ. ∎

By cap-05's exact ensemble-mean theorem, N·L_c/W is the average count of a window
of length L_c over all rotations of the (dilated) pattern — the honest "fair price"
of the window. So CRT **overprices every short class by exactly Nρ/(QW)** and
underprices every long class by N(Q−ρ)/(QW).

## L4 — Dead origin

c = 0 satisfies c < ρ always (ρ ≥ 1), so combo (0,0) always draws the long window;
but its t = 0 position is r = 0, which is never natal (0 ≡ 0 mod 7). Additionally
r = W−2 (≡ −2 mod every tile prime, ≡ 28 mod 30 — never natal) lies in the (0,0)
window iff Q | W−2, i.e. q and q′ both divide W−2 (counted in the run: 3 pairs @17,
1 @23, 0 elsewhere). No other position of any combo window is dead independently of
(q, q′): in mixed combos r = 0 and r = W−2 would force q′ | 2 or q′ | W, impossible.

## T1 — Structured-bias theorem

Define, per combo, dev := cnt − N/Q and the decomposition

    dev = len + head + resid,
    len  = N·L_c/W − N/Q                (exact, L3 — deterministic),
    head = −(N/W)·(#forced-dead positions)   (L4 — deterministic),
    resid = cnt − (fair price of the window's non-forced positions).

**Theorem.** For every pair (q,q′) at every level x:

1. combo (0,0):  len + head = −Nρ/(QW) − [Q | W−2]·N/W  **< 0 always**
   (long-window credit N(Q−ρ)/QW minus the dead origin N/W).
2. combo (−2,−2): len = −Nρ/(QW) **< 0**, UNLESS ρ = Q−1, i.e. W ≡ −1 (mod Q),
   i.e. **q and q′ both divide the Euclid number W+1** (then len = +N/(QW)·(Q−ρ)
   = +N/(QW)). These pairs are enumerable: @17, W+1 = 510511 = 19·97·277 gives
   exactly the 3 pairs (19,97), (19,277), (97,277); no other level ≤ 23 has any.
3. mixed combos: len = ±, sign [c < ρ], no fixed sign; the two mixed classes sum
   to c ≡ −2 and behave as coin flips over pairs (measured mean 0.00–0.43 N/W).

*Proof.* (1) c = 0 < ρ always, so L = ⌊W/Q⌋+1 and L3 gives len = +N(Q−ρ)/(QW);
the origin subtracts N/W = NQ/(QW); sum −Nρ/(QW). (2) c = Q−2 ≥ ρ unless
ρ = Q−1; ρ = Q−1 ⟺ W ≡ −1 mod Q ⟺ Q | W+1 ⟺ q,q′ | W+1 (q,q′ prime). Apply L3.
(3) immediate from L3. ∎

**Corollary (the priced law).** Summing over pairs, with ρ/Q equidistributing
(measured: mean 0.4965 @23),

    E[dev per pair] = −2·(N/W)·E[ρ/Q] + o(N/W) ≈ −N/W,
    i.e.   S₂ ≈ ΣCRT − (#pairs)·N/W.

Measured (structured part vs total deficit): −18.5/−19.0 @13, −206/−415 @17,
−2444/−1864 @19, −35657/−34275 @23 — the deterministic term IS the deficit; the
remainder Σresid alternates in sign (−0.6, −209, +580, +1382; z = −0.03, −2.70,
+1.65, +0.90) and has no persistent sign.

## T2 — Tail lemma (the largest-Q pairs are ABOVE CRT)

**Theorem.** If ⌊W/Q⌋ < nextprime(x), then cnt₍₀,₀₎ = [ qq′ ∈ N_x ] exactly.

*Proof.* The (0,0) window is {tQ : 0 ≤ t ≤ ⌊W/Q⌋}. t = 0 is dead (L4). Any
t ∈ [2, ⌊W/Q⌋] has a prime factor ≤ t < nextprime(x), hence a prime factor
p₀ ≤ x (including 2, 3, 5); then p₀ | tQ, so tQ is ≡ 0 mod p₀ — excluded by the
natal conditions (for p₀ ∈ {2,3,5} via the mod-30 classes 11, 17, which are units).
Only t = 1, r = Q remains. ∎

Verified: 1,205,518 pairs @23 (0 violations; likewise at all other levels).

**Consequence.** For these pairs CRT predicts N/Q ≤ (⌊W/Q⌋+1)·N/W ≲ x·N/W ≪ 1
while the hit rate is P(qq′ ∈ N_x) — a product of two units mod 30 lands in
{11,17} at rate ≈ 1/4 (vs 1/15 for a random position) and avoids −2 mod p at rate
(p−2)/(p−1) (vs (p−2)/p), giving the unit-product heuristic

    P(qq′ natal) ≈ (1/4)·∏_{7≤p≤x} (p−2)/(p−1),

measured 0.2222 / 0.1690 / 0.1618 / 0.1523 / 0.1453 at x = 11..23 vs theory
0.1875 / 0.1719 / 0.1611 / 0.1522 / 0.1453 (4-digit agreement once the scour is
large enough for unit-equidistribution). Since 0.145 ≫ CRT ≈ 0.037 for L̄ = 1,
**the deepest-tail pairs run systematically ABOVE CRT** (+9.1 N/W per pair @23).
This is a *proven* mechanism producing positive deviations — the one-sided
conjecture was structurally false, not unlucky.

## The refutation record

- **Per pair:** 53.3 / 45.3 / 41.5 / 41.7 / 40.4 % of pairs sit above CRT at
  x = 11 / 13 / 17 / 19 / 23. Exhibits: (19,31) @11 dev +1.39; (19,71) @13 +2.06;
  (23,191) @17 +4.48; (37,307) @19 +12.10; (43,89) @23 +27.90 (cnt 5569 vs CRT 5541).
- **Per combo:** even (0,0) alone is above CRT for 21–23% of pairs, e.g.
  (29,47) @23: cnt 3904 vs 3889.5. The negative structured bias −Nρ/QW < resid
  fluctuation scale per pair, so no per-pair sign survives.
- **Aggregate:** S₂ = 30 > ΣCRT = 24.7 at @11 (ratio 1.216). The universal
  aggregate inequality is false. For x ≥ 13 the aggregate deficit is real but is
  exactly the T1 structured term (97%, 50%, 131%, 104% at 13/17/19/23), with the
  residual alternating sign — so any "S₂ ≤ ΣCRT for x ≥ 13" claim would hinge on
  Σresid never exceeding the structured −#pairs·N/W, which is a discrepancy
  bound, not a sign law (and at @19, @23 Σresid was positive: +580, +1382 —
  within 1.7σ, but positive).

## What survives (the useful form)

**Priced pair law (proven core + measured remainder).**

    S₂ = ΣCRT − Σ_pairs [ 2Nρ/(QW) + mixedLen(q,q′) + corrections ] + Σresid

where every bracketed term is computable in O(log Q) per pair (ρ = W mod Q; the
mixed-combo classes via one modular inverse; corrections: +N/W for each Euclid
pair q,q′ | W+1, −N/W for each pair with Q | W−2), and resid is the
anchored-window discrepancy of a dilated natal pattern with measured per-pair rms
0.57 → 1.24 counts (O(1), level after level — attack-1's O(1) window law
transported to dilated windows) and |Σresid| ≤ 2.7σ, sign-alternating.

**What a Bonferroni certificate needs next** is not a sign theorem but a certified
per-pair cap |resid(q,q′)| ≤ c(x) — exactly the campaign's open lead 3 (the
discrepancy lemma), now reduced to a concrete family: initial segments of
coprime-to-W combs (T2 shows the head behavior is Legendre/Buchstab oscillation:
below fair for 2 ≤ L̄ < nextprime(x), above at L̄ = 1, oscillating beyond —
mean ~0; the (0,0) head t < 30 pays −139,799 @23 and the bulk refunds +140,148).

**The anchored calm, pair component: explained.** The sub-CRT pair/triple
overlaps of cap-06 were the dead origin plus short-window arithmetic —
deterministic bookkeeping, not a statistical quietness. That is one of the four
original sightings dissolved; the calm's remaining sub-claims and their
calibrations are in [anchored-calm.md](anchored-calm.md).

## Caveats, honestly

- z-scores treat pairs as independent; pairs sharing a prime are correlated —
  read σ's as indicative, not exact.
- The unit-product value (1/4)∏(p−2)/(p−1) assumes scour primes equidistribute
  over units mod 30 and over nonzero classes mod p; it is a heuristic with 4-digit
  empirical agreement at @19/@23, not a theorem (finite Chebyshev-type biases are
  visible at @11: 0.222 vs 0.188).
- Triples (cap-06's 7–15% deficits) inherit the same machinery — three anchored
  classes mod qq′q″, origin dead in the (0,0,0) combo, all short/long terms from
  L3 — but were not re-measured here; the pair verdict makes the sign expectation
  clear (structured, not one-sided).

## Byproducts

- New census numbers: Natal@5 survivors (= twins in (√W, W), by the empty-window
  crystallization argument, sieve-verified at 11–17 in cap-06): @19 = 38,380;
  @23 = 597,475. cap-08's refined @19 ladder (≥ 1877) certifies 4.9% of truth.
- Euclid-number divisors of W+1 appear as a genuine (tiny) arithmetic exception
  class in the overlap ledger: q ∈ {59} @13, {19, 97, 277} @17, {347} @19,
  {317} @23 get the long −2-window in singles; pairs within one W+1 exist only
  at @17 (three of them).
