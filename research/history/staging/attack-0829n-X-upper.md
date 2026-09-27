# An unconditional upper bound on the rough-pair census X(K) by Selberg's Λ² sieve on the stretch window: a theorem with every constant explicit, loose against exact X(K) by 7.8 to 10.1 at the band depths, and a level the window holds below z² so the sifting parameter never reaches s = 2

<!-- ledger
id: Q-X-upper-0829n
status: PARTIAL
todo: Z2
question: Can the rough-pair census X(K) on the stretch window be bounded above, unconditionally and with an explicit error term, by a dimension-2 upper-bound sieve, and how loose is the bound against exact X(K)?
verdict: Yes, as a theorem with nothing open (Selberg's Λ² inequality with a remainder bounded by the interval structure alone, VERIFIED at all 10908 anchor-depth pairs), but it is loose by 7.82 to 10.13 against exact X(K) at the band depths, decomposed as a sieve loss 1.78 to 2.53 times a structural loss 4.01 to 4.39 that no upper-bound sieve can remove, the window holds the level below z² (s_max 1.81 to 1.96) so the bound stops improving past p_K = 31 to 61, its main term is the sifting function's and not the census's, and the drift is a crossing quantity outside the legal half and is not evaluated.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-zone.md` A7, which
> reproduced every band sum, tier ratio, D_max and the flat 378100.0 digit
> for digit on independent code).** §0 item 2's and the ledger's
> "s_max 1.81 → 1.96" is REFUTED as written, since the arrow reads B3→B8
> everywhere else in this note: the values are 1.8106, 1.9612, 1.9538,
> 1.9288, 1.9149, 1.8542, not monotone, peaking at B4 with B8 at 1.85 (§5
> here already contradicts §0). Read instead: "s_max reads 1.81 at B3,
> peaks at 1.96 at B4 and falls to 1.85 at B8; the maximum over the six
> bands is 1.96 and the level is below z² at every band." The mathematics
> is unaffected. Also A8: the wrong-direction guard forbids the CLAIM that
> X < T, not the computation of a crossing quantity, which is why the two
> blind notes are legal.

*(2026-08-29. Staging note. Producer, formally embedded:
`research/history/staging/attack-0829n-X-upper.js` (2.8 s; code-sha256
3272cd0e...; out-sha256 281a529c...; `node research/qc/embed.js --check`
passes bit-honest). No existing file edited, no git command run. Calibration
per claim: PROVEN, VERIFIED by exact computation, MEASURED, HEURISTIC, OPEN.
Wrong-direction guard: `attack-wrongdirection-audit.md` §3.1 rules that the
only legal half of TODO Z2 is an upper bound on X(K) alone; this note compares
X(K) against nothing but its own upper bound and the sifting function S(K),
never against T. T is computed by the producer only as an engine-identity
gate against cited band sums and enters no bound and no ratio. The standing
K* and K*/pool targets (12.20 → 31.22, 0.061 → 0.032, `attack-quadpoint-02.md`
§2–3) and the main-term K* comparison (3.92 → 31.15, ratio 0.998 at B8,
`attack-roughpair-error.md` §6) are crossing quantities, i.e. comparisons of
X against T; they are quoted here as what they are and are NOT recomputed,
because computing them is the comparison the guard forbids. The reproduction
target this note can legally score is exact X(K) itself, per anchor.)*

## 0. Verdict, disconfirming half first

1. **The bound is loose by a factor 7.82 → 10.13 at the band depths, band
   sums B3 → B8, and the factor grows with Q** [MEASURED, SEC 2]. Per anchor
   the median runs 8.78 → 10.75 and the worst anchor is 34.96 (B4) [SEC 3].
   The loss splits into two factors with different owners:
   - a **sieve loss** T1/S = 1.78 → 2.53, the Selberg upper bound against the
     sifting function S(K) it actually bounds;
   - a **structural loss** S/X = 4.39 → 4.01, the sifting function against the
     census: S − X = M + T, and the mixed pairs are M/S = 0.495 → 0.513 of S
     [SEC 5]. This factor is not a sieve deficiency. Removing it needs a LOWER
     bound on M(K), the pairs with one prime member and a p_K-rough partner,
     on a window of length Q′² − Q² = (Q′ − Q)(Q′ + Q), which is h^{1/2}
     times a prime gap at h = Q². That is a lower-bound sieve over the primes
     of the window and needs their distribution in progressions at some
     positive level; no such level is known unconditionally in intervals this
     short (the h^{0.525} of Baker–Harman–Pintz 2001, literature figure, is
     the threshold for the bare count of primes, with no level at all). So
     the structural factor is out of reach of an upper-bound sieve by
     construction, and of any unconditional argument this corpus knows.
2. **The level the window allows is below z², at every band** [MEASURED,
   SEC 5]. The uniform remainder R_U(z, ξ) stays at or below the sieve main
   term C·V₂(z) only up to D_max = 169, 841, 1849, 3721, 6889, 9409
   (B3 → B8, median C), i.e. s_max = ln D_max/ln p_K = 1.81 → 1.96, never 2.
   The optimal ξ is below p_K at every band (medians 7 → 61 against
   p_K = 17 → 139, s = 1.37 → 1.67), so the weights never see all the primes
   being sifted. In B6 the band sum of the uniform bound is **flat at
   378100.0 from K = 17 to K = 46** while ΣX falls 41172 → 15540, so T1/X
   climbs 9.18 → 24.33 with depth [SEC 4]. This is the kill condition the
   brief named: the theorem is not vacuous (the bound sits below the trivial
   C at every anchor of B4–B8 and 35 of 40 in B3, SEC 3) but past
   p_K ≈ 31 (B6) and p_K ≈ 61 (B8) deeper sieving buys it nothing.
3. **The theorem's main term is the sifting function's, not the census's**
   [MEASURED, SEC 5]. C·V₂(z) tracks S(K) to S/(C V₂) = 0.998 → 1.004 at the
   band depths, but it is 5.18 → 5.55 times the census's own naive main term
   C[V₂(K) − 2V₂(K)U(K) + V₂(nR)] of `attack-roughpair-error.md` §2 (and
   X/Xnaive = 1.261 → 1.307 measured). So the brief's aim, "turn the main
   term into a theorem", is met for the WRONG main term: the sieve theorem
   carries the first of the census's three terms and cannot carry the
   subtracted two, for the reason in item 1.
4. **The drift 0.923 → 0.984 is not evaluated, by rule.** It is a property of
   the crossing y*(Q), defined by X(y) < T (`u2-engine-depth.md` §5), outside
   the legal half. What the theorem does carry is the mechanism that note
   names: its main term is the exact partial product, not the Mertens
   asymptotic, and the T-free size of that effect on the theorem's own main
   term is V₂(z) exact/asymptotic = 0.8415 → 0.9591 at the band depths
   [MEASURED, SEC 6]. Whether that produces the crossing's drift remains a
   statement about the crossing (§6).
5. What is PROVEN: Theorem U of §2, with nothing OPEN in its proof. It is
   classical sieve bookkeeping (Selberg's Λ² inequality, Halberstam–Richert
   Ch. 3; Ford's notes, cited through `quadpoint-prior-art.md` §1.1) applied
   to a standard object; no novelty is claimed for any step. Its value is
   that every constant is explicit and computed, and that the loss factors
   above are now numbers rather than a hardness analogy. It opens no route.

## 1. The object, copied

From `quadpoint-identity-01.md` §1, verbatim in substance: fix an anchor Q
(a prime ≥ 7), Q′ the next prime, the half-open stretch S_Q = [Q², Q′²), the
capacity C counting the channel pairs (a, a+2) with BOTH members in S_Q
(a ≡ 11, 17, 29 mod 30, a ≥ Q², a + 2 < Q′²), twins T, and actives
p₁ < p₂ < ... = 7, 11, 13, .... Then

> X(K) = #{channel pairs with both members composite and
> min(lpf(a), lpf(a+2)) > p_K},  X(0) = CC.

The window convention is load-bearing there (the pair (Q′² − 2, Q′²) is
excluded) and is implemented identically here: the producer's loop is
`a + 2 < hi`. Two further counts are used, neither compared to T:

- S(K) = #{channel pairs with (a(a+2), P(z)) = 1}, z = p_K, P(z) = ∏ actives
  ≤ z: the dimension-2 sifting function of Ford §1.7.2. Since a prime member
  has no active factor, S(K) = X(K) + M(K) + T with M(K) the pairs having
  exactly one prime member and the composite member p_K-rough. The producer
  asserts S(full) = T and X(full) = 0 at every anchor [SEC 0].
- V₂(z) = ∏_{7≤p≤z}(1 − 2/p), the fundamental-lemma density.

Engine identity [VERIFIED, SEC 0]: 1227 anchors; band counts n = 40, 103,
71, 208, 292, 491 and band sums ΣT = 1017, 7086, 8332, 42495, 101763, 280128
reproduce `attack-roughpair-error-01.js`; T = 127 and X(0) = 2357 at
Q = 9281 reproduce `attack-quadpoint-03.js`.

## 2. The statement

Notation, for a fixed anchor Q and depth K ≥ 1 with z = p_K:

- A = the set of openers a of the C channel pairs (an interval
  [Q², Q′² − 3] intersected with three residue classes mod 30).
- For squarefree d | P(z): A_d = #{a ∈ A : d | a(a+2)}, g(d) = 2^{ω(d)}/d,
  r_d = A_d − C·g(d), h(d) = ∏_{p|d} 2/(p − 2),
  G(ξ) = Σ_{d ≤ ξ, d | P(z)} h(d), and B(1) = 0,
  B(d) = 3·2^{ω(d)}(1 + 1/d) for d > 1.
- The Selberg weights at level ξ: λ_1 = 1, λ_d = 0 for d > ξ, and for
  1 < d ≤ ξ, d | P(z),
  λ_d = μ(d)·∏_{p|d}(1 − 2/p)^{−1}·G_d(ξ/d)/G(ξ) with
  G_d(y) = Σ_{m ≤ y, m | P(z), (m, d) = 1} h(m).

**Theorem U.** For every anchor Q, every K ≥ 1 and every real ξ ≥ 1,

> X(K) ≤ S(K) ≤ C/G(ξ) + Σ_{d₁,d₂ ≤ ξ} λ_{d₁}λ_{d₂} r_{[d₁,d₂]}   (tier T3, the exact Selberg value)
> ≤ C/G(ξ) + Σ_{d₁,d₂ ≤ ξ} |λ_{d₁}λ_{d₂}| |r_{[d₁,d₂]}|   (tier T2, exact remainders in absolute value)
> ≤ C/G(ξ) + Σ_{d₁,d₂ ≤ ξ} |λ_{d₁}λ_{d₂}| B([d₁,d₂]) =: C/G(ξ) + R_U(z, ξ)   (tier T1, uniform),

where the sums run over d₁, d₂ | P(z), and

> 1/G(ξ) = V₂(z)·(1 + E_z(ξ)),  E_z(ξ) = (G(P(z)) − G(ξ))/G(ξ) ≥ 0,
> |λ_d| ≤ 1, so R_U(z, ξ) ≤ Σ_{d ≤ ξ², d | P(z)} 3^{ω(d)} B(d).

Tier T1 depends on the anchor only through C: it is a bound
X(K) ≤ C·V₂(z)(1 + E_z(ξ)) + R_U(z, ξ) with both correction terms functions of
(z, ξ) alone, uniform over every anchor of every stretch. Tiers T2 and T3 use
the anchor's own r_d and are theorem instances rather than a uniform
statement. Since each tier is a valid upper bound at every ξ, the minimum
over any fixed set of ξ is a valid upper bound; the producer takes the
minimum over a 28-point grid ξ ≤ 701, per anchor and tier. The sifting
parameter is s = ln(ξ²)/ln z, stated per band in §4.

Every inequality above runs upward from X(K), which is the direction
`attack-wrongdirection-audit.md` §3.1 allows; none involves T.

## 3. The proof, step by step

Each step is labelled. Nothing in this section is OPEN.

**Step 1, X(K) ≤ S(K)** [PROVEN, one line]. S(K) counts the channel pairs
with both members free of every active ≤ p_K; X(K) counts those among them
with both members composite (a composite member is p_K-rough iff its lpf
exceeds p_K, and a prime member exceeds Q² and so is divisible by no active
≤ p_K, hence is p_K-rough at every depth reported). Dropping the
"both composite" condition enlarges the set. Direction: upward. What is
dropped is M(K) + T, and §0 item 1 says why it cannot be recovered.

**Step 2, Selberg's inequality** [PROVEN, classical; Halberstam–Richert
*Sieve Methods* Ch. 3, Selberg's Λ² method; Ford's notes, the Selberg sieve
chapter; numbering not verified at page image this session, and the proof
is reproduced here so nothing rests on the citation]. For any real numbers
λ_d indexed by d | P(z) with λ_1 = 1,

> 1[(n, P(z)) = 1] ≤ (Σ_{d | (n, P(z))} λ_d)²  for every integer n,

because the left side is 1 exactly when the only divisor is d = 1 (the
square is then λ_1² = 1) and is 0 otherwise while the right side is a
square. Applying it with n = a(a+2) and summing over a ∈ A:

> S(K) ≤ Σ_{a∈A} (Σ_{d | (a(a+2), P(z))} λ_d)² = Σ_{d₁,d₂} λ_{d₁}λ_{d₂} A_{[d₁,d₂]}.

Direction: upward. Verified by the producer, which computes the left-hand
quadratic form directly over the window at three anchors and matches
C/G + Σλλr to 1e-6 relative (128.0930, 1021.5420, 1503.4693) [SEC 1].

**Step 3, the diagonalisation** [PROVEN, classical]. Write
A_{[d₁,d₂]} = C·g([d₁,d₂]) + r_{[d₁,d₂]}. The main part
C·Σ λ_{d₁}λ_{d₂} g([d₁,d₂]) is a quadratic form in the λ's; with g
multiplicative and g(p) = 2/p < 1 for p ≥ 7 it diagonalises, and the
choice of λ_d in §2, supported on d ≤ ξ with λ_1 = 1, minimises it to
exactly C/G(ξ) (the standard computation; Halberstam–Richert Ch. 3,
Lemma 3.1–Theorem 3.2 in most editions, numbering unverified). The same
computation gives |λ_d| ≤ 1. Both are checked: λ_1 = 1 and
max |λ_d| = 1.0000 over 9 depths × 28 levels [SEC 1]. What remains is
the remainder Σ λ_{d₁}λ_{d₂} r_{[d₁,d₂]}, which is tier T3 exactly.

**Step 4, the main term as a partial product** [PROVEN, one line]. At
full level ξ ≥ P(z), G(P(z)) = ∏_{p≤z}(1 + h(p)) = ∏_{p≤z}(1 − 2/p)^{−1}
= 1/V₂(z), and G is increasing in ξ, so 1/G(ξ) = V₂(z)(1 + E_z(ξ)) with
E_z(ξ) ≥ 0 as stated. Checked at K = 3: G(1001)·V₂(13) = 1 to 1e-15
[SEC 1]. This is the step that makes the theorem's main term the exact
partial product and not the Mertens asymptotic (§6).

**Step 5, T3 ≤ T2** [PROVEN, triangle inequality]. Direction: upward.

**Step 6, the uniform remainder bound, T2 ≤ T1** [PROVEN, elementary].
For squarefree d coprime to 30, a(a+2) ≡ 0 (mod d) holds on exactly
2^{ω(d)} residues mod d (a ≡ 0 or −2 mod each odd prime p | d, distinct
residues), so A_d is a count of integers of an interval of length L in
3·2^{ω(d)} residue classes mod 30d; each class contributes L/(30d) + θ
with |θ| < 1, so A_d = 3·2^{ω(d)}L/(30d) + θ_d, |θ_d| < 3·2^{ω(d)}, and
C = A_1 = 3L/30 + θ_1, |θ_1| < 3. Hence
r_d = A_d − C·2^{ω(d)}/d = θ_d − θ_1·2^{ω(d)}/d, so |r_d| < 3·2^{ω(d)}(1 + 1/d)
= B(d) for d > 1, and r_1 = 0 identically. Checked: max |r_d|/B(d) = 0.4600
over 3702 moduli × 1227 anchors, at Q = 4111, d = 8137 [SEC 1]. The
bound uses only that A is an interval in fixed residue classes; no
equidistribution input of any kind enters, which is what makes T1
unconditional and uniform.

**Step 7, the tail bound on R_U** [PROVEN, standard]. The number of pairs
(d₁, d₂) with [d₁, d₂] = d is 3^{ω(d)}, and |λ| ≤ 1, giving the stated
Σ_{d ≤ ξ²} 3^{ω(d)} B(d). The producer uses the sharper exact-|λ| form of
R_U, which is what §4's numbers are.

That completes the proof. Verification of the whole chain: T1 ≥ T2 ≥ T3 ≥
S(K) ≥ X(K) at all 10908 (anchor, depth) pairs [SEC 1].

## 4. The level the window allows, and the sifting parameter

The theorem is non-vacuous only where R_U(z, ξ) is below the main term
C·V₂(z), and C is small: the window has length (Q′ − Q)(Q′ + Q), so
C ≈ (Q′ − Q)·Q/5 and the median C at the band depths is 184, 714, 1427,
2922, 5848, 10938 (B3 → B8), with median main term C·V₂(z) = 80.3 → 1793.2
[SEC 5]. Against that, the uniform remainder at the largest grid level
with R_U ≤ C·V₂ gives

| band | K_b | p_K | C med | C·V₂ med | D_max | s_max = ln D_max/ln p_K |
|---|---|---|---|---|---|---|
| B3 | 4 | 17 | 184 | 80.3 | 169 | 1.81 |
| B4 | 8 | 31 | 714 | 221.7 | 841 | 1.96 |
| B5 | 12 | 47 | 1427 | 363.9 | 1849 | 1.95 |
| B6 | 17 | 71 | 2922 | 631.7 | 3721 | 1.93 |
| B7 | 23 | 101 | 5848 | 1097.6 | 6889 | 1.91 |
| B8 | 31 | 139 | 10938 | 1793.2 | 9409 | 1.85 |

[MEASURED, SEC 5; the p_K column is SEC 6's]. The level the window
allows is D < z² at every band. In the Selberg sieve the weights live on
d ≤ ξ = D^{1/2} < z, so at s < 2 the sifting primes between ξ and z carry
no weight at all: they are sifted only through the inequality
1[(n,P(z)) = 1] ≤ (Σλ_d)², which does not see them. The producer's
minimising ξ confirms it: median ξ₁ = 7, 13, 19, 31, 43, 61 against
p_K = 17, 31, 47, 71, 101, 139, s₁ = 1.37, 1.49, 1.53, 1.61, 1.63, 1.67
[SEC 2]. For comparison, `attack-wrongdirection-audit.md` §3.8 prices the
LOWER-bound half at s = u*/2 = 1.7829 against β₂ = 4.26645 with the level
taken as the window length itself; the upper-bound half measured here sits
at s = 1.4 to 1.7 with the level the window actually supports, which is
below the window length by the remainder's 3^{ω}·2^{ω} multiplicity.

**Consequence, the saturation** [MEASURED, SEC 4]. Because ξ₁ < p_K, the
uniform bound at depth K equals the uniform bound at the depth where
p_K first exceeds ξ₁. In B6 the band sum ΣT1 is 557471.0, 478733.8,
418415.9, 383864.4, 378671.3 at K = 1, 2, 4, 8, 12 and then 378100.0 at
every K from 17 to 46, while ΣX falls 41172 → 15540 over the same K; in
B8 ΣT1 moves from 2840801.7 at K = 17 to 2827497.3 at K = 46, against
ΣX 470118 → 197389. The exact tier T3 does keep falling with K (B6:
214190.2 → 188361.3; B8: 1890938.5 → 1662685.3) because its remainder
carries the signs, but it stays 8.42 to 12.12 above X at K = 46.

**The kill condition, answered with the numbers.** The brief asked
whether "the only sieve that certifies has level below what the window
allows so the bound is vacuous at the anchors". The bound is not vacuous:
T1 < C at 35 of 40 anchors in B3 and at every anchor of B4 through B8
[SEC 3]. But the level the window allows is below z² at every band, so the
theorem cannot follow X(K) down past p_K ≈ 31 (B6) or ≈ 61 (B8), and the
gap to X opens with depth (T1/X = 9.18 → 24.33 across K = 17 → 46 in B6).
That is the honest shape of the result: a theorem at a fixed low level,
not a bound that tracks the census.

## 5. The measurement: the bound against exact X(K) at every anchor

At the fixed band depths K_b = 4, 8, 12, 17, 23, 31 (the cited K* band
means 3.88 → 31.22 rounded, `attack-quadpoint-03.js` SEC 2, used only as
depths), band sums [MEASURED, SEC 2]:

| band | n | ΣX | ΣS | ΣT1 | ΣT3 | T1/X | T2/X | T3/X | S/X | T1/S |
|---|---|---|---|---|---|---|---|---|---|---|
| B3 | 40 | 891 | 3915 | 6971.3 | 3990.7 | 7.82 | 5.50 | 4.48 | 4.39 | 1.78 |
| B4 | 103 | 7035 | 28425 | 56241.1 | 30810.4 | 7.99 | 5.72 | 4.38 | 4.04 | 1.98 |
| B5 | 71 | 7941 | 32194 | 68871.2 | 37753.1 | 8.67 | 6.28 | 4.75 | 4.05 | 2.14 |
| B6 | 208 | 41172 | 167264 | 378100.0 | 214190.2 | 9.18 | 6.73 | 5.20 | 4.06 | 2.26 |
| B7 | 292 | 101591 | 407883 | 968355.1 | 571510.6 | 9.53 | 7.00 | 5.63 | 4.01 | 2.37 |
| B8 | 491 | 279040 | 1119016 | 2827454.6 | 1733352.8 | 10.13 | 7.42 | 6.21 | 4.01 | 2.53 |

Per anchor [MEASURED, SEC 3]: T1/X median 8.78, 8.90, 9.19, 9.77, 10.22,
10.75 and max 20.00, 34.96, 15.41, 18.78, 16.86, 16.08 (B3 → B8); T3/X
median 4.73 → 6.23. No anchor in any band has X(K_b) = 0, so every ratio
is defined.

**Reading, flat.** The uniform theorem is loose by 7.82 → 10.13 in band
sums and the factor rises with Q. The larger part of it is the structural
S/X = 4.39 → 4.01, fixed by the window (§0 item 1); the
sieve's own share T1/S = 1.78 → 2.53 rises with Q because the level the
window supports falls relative to z (s_max 1.96 → 1.85 from B4). The
exact-remainder tier T3 reduces the sieve share (T3/S = 1.00 → 1.75 in
B8 across K = 1 → 46, SEC 4) and cannot go below S/X.

**On the reproduction target.** `attack-quadpoint-02.md` §4 fixes
m6/m7/m8 = 0.050/0.040/0.032 and K* = 12.20 → 31.22 as what a proof-side
bound must hit; `attack-roughpair-error.md` §6 shows a zero-parameter main
term hits it to ratio 0.998 at B8 and calls the target necessary and far
from sufficient. This note does not score against it, because K* is the
depth where X crosses T and computing it is the comparison §3.1 forbids.
What can be said without T: a bound loose by a factor 7.82 → 10.13 against
X cannot reproduce any target that the census's own main term reproduces
to 0.2%, and a bound that cannot follow X below p_K ≈ 31 to 61 cannot
reproduce a depth statistic that lives at p_K = 139 in B8. So the
theorem fails the reproduction target for a reason visible without ever
comparing to T, and that failure is the expected outcome the brief named.

## 6. What the theorem does and does not say about the main term and the drift

**The main term** [MEASURED, SEC 5]. The theorem's main term C·V₂(z) is the
fundamental-lemma main term of the sifting function, and at the band depths
it is accurate for S: S/(C·V₂) = 0.998, 0.999, 0.998, 0.999, 0.998, 0.998
(B3 → B8); along the K profile it reaches 1.016 at K = 46 in B6, the
Buchstab correction beginning to show as u = ln h/ln z falls. The census's
own zero-parameter main term (`attack-roughpair-error.md` §2, naive form)
is C[V₂(K) − 2V₂(K)U(K) + V₂(nR)], and V₂(z) exceeds that bracket by
5.55, 5.19, 5.31, 5.27, 5.18, 5.20; the measured X/Xnaive is 1.261 →
1.307 (the Buchstab bias of the naive form that note reports for T as
26%, seen here on X). So the theorem proves the FIRST term of the census's
main term as an upper bound with explicit error, and proves nothing about
the two subtracted terms, which are lower-bound objects. The brief's
"turn the main term into a theorem" is therefore met only for a main
term 5.2 to 5.6 times the one the drift analysis uses. The composite-
structure alternative (bound X by switching to the larger prime factor of
a member) is worse before any remainder: its main term multiplier
Σ_{z<p≤Q} 2/p = 1.068 → 1.149 exceeds 1 at every band depth [SEC 5].

**The drift, deliverable (d)** [not evaluated, by rule]. The 0.923 → 0.984
drift (`u2-engine-depth.md` §5, scratchpad-grade) is a drift of ln y*/ln h
band means, and y* is the least prime at which X falls below T. Any
reproduction of it is a computation of the crossing and is outside the
legal half; this note does not run it and the mechanism therefore does not
move from HEURISTIC to a consequence of a theorem here. What the theorem
does establish, T-free, is the ingredient that note's mechanism rests on:
the main term is the exact partial product, not the Mertens asymptotic
(§3 step 4), and the size of that difference on the theorem's own main
term is [MEASURED, SEC 6]

| band | p_K | P(z) exact/asym | V₂(z) exact/asym |
|---|---|---|---|
| B3 | 17 | 0.9110 | 0.8415 |
| B4 | 31 | 0.9349 | 0.8796 |
| B5 | 47 | 0.9511 | 0.9083 |
| B6 | 71 | 0.9703 | 0.9438 |
| B7 | 101 | 0.9792 | 0.9605 |
| B8 | 139 | 0.9788 | 0.9591 |

with P(z) = ∏_{7≤p≤z}(1 − 1/p) against (15/4)e^{−γ}/ln z and
V₂ against κ·P_asym², κ = 0.938899 to p ≤ 31699. These are the finite-size
factors an exact-partial-product main term carries at the band depths; the
non-monotone B7 → B8 step in P(z) (0.9792 → 0.9788) is the prime-grid
discretisation of z. Whether the crossing's drift follows from them is a
statement about the crossing, left where `u2-engine-depth.md` left it.

## 7. NOT REACHED

- **No adversarial pass.** Every figure is from one producer run; the
  proof is classical but the transcription of Steps 3 and 6 has been read
  by nobody else. Halberstam–Richert's theorem numbering is cited from
  memory and flagged as unverified; the proof does not depend on it.
- **The grid.** The ξ grid stops at 701 and the exact tier T3's minimiser
  sits at the grid edge in B4 through B8 (median ξ₃ = 701, SEC 2), so T3
  is grid-limited; its limit as ξ → P(z) is S(K) itself (the weights
  become μ(d) and the square becomes the indicator), so extending the grid
  moves T3 toward the structural floor S/X and no further. The uniform
  tier's minimiser is interior at every band.
- **A better uniform remainder.** B(d) uses the interval structure only.
  Exploiting the sign of r_d uniformly needs an equidistribution statement
  for a(a+2) in a window of length ≈ h^{1/2}·gap, and none is available;
  the measured max |r_d|/B(d) = 0.4600 says the room inside B(d) itself is
  at most a factor 2.2, which does not reach the structural factor.
- **Rosser–Iwaniec / DHR upper bounds** were not run. At s < 2 in
  dimension 2 the Selberg Λ² bound is the standard choice and no
  combinatorial upper sieve is expected to beat it there; this is a
  literature expectation, not a measurement, and a comparison producer
  would settle it cheaply.
- **Nothing past Q = 10007**, and no per-anchor law fitted to any ratio
  (the exponent lesson of `REFUTED.md`).
- **Prior art.** The object and the Selberg bound are textbook
  (`quadpoint-prior-art.md` §1.1, §3); the only content here is the
  explicit evaluation on this window. No novelty is claimed and no search
  was run.

---

*Producer and custody: `research/history/staging/attack-0829n-X-upper.js`,
embedded, `--check` bit-honest. Cited, never recomputed: band n and ΣT
(`attack-roughpair-error-01.js`), T and X(0) at Q = 9281 and the K* band
means (`attack-quadpoint-03.js`), the crossing targets and the drift
(`attack-quadpoint-02.md`, `attack-roughpair-error.md` §6,
`u2-engine-depth.md` §5), s = 1.7829 and β₂ (`attack-wrongdirection-audit.md`
§3.8). History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
