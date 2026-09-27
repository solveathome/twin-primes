# Cov_adj < 0 — anticorrelation proven in aggregate, refuted uniformly in q

<!-- ledger
id: Q-covadj-sign
status: PARTIAL
todo: none
question: Is Cov_adj < 0 for every scour prime q at every level?
verdict: Uniform-in-q anticorrelation is REFUTED, with six counterexample primes known; the aggregate is negative at all four levels in exact integer arithmetic over 599 scour primes, and the Low-Band Lemma is true but is not the mechanism, so the all-x aggregate theorem stays OPEN.
-->

*(2026-08-14. Companion to `natal-cap-23-covadj-proof.js`, which verifies every
identity below — the sign verdicts in exact BigInt integer arithmetic, the
spectral forms to relerr ≤ 3·10⁻¹⁰. Notation as in cap-19: level x, W = x#,
natal set N ⊂ [0, W) — the comb {11, 17} mod 30 minus {0, p−2} mod p for
7 ≤ p ≤ x — with indicator `ind`, N̄ = |N| = 2∏(p−2), δ = N̄/W. Scour prime q:
dilated sibling A(m) = ind[(qm) mod W]; lA = ⌈W/q⌉, lB = ⌊(W+1)/q⌋,
L = lA + lB; the anchor's fused window splits into the ABUTTING windows
N_A(s) = #(A ∩ [s, s+lA)), N_B(s) = #(A ∩ [s+lA, s+L)) over the W cyclic
starts s, and V_fused = V_A + V_B + 2·Cov_adj.)*

Status of this result and of the anchored calm as a whole:
[anchored-calm.md](anchored-calm.md).

---

## Proposition 1 (Lag-sum identity — the trapezoid)

Let C_A(d) = Σ_s A(s)A(s+d) be A's cyclic autocorrelation. Then

**W²·Cov_adj = W·Σ_{d=1}^{L−1} w(d)·C_A(d) − N̄²·lA·lB**, with
**w(d) = min(d, lA, lB, L−d)**.

*Proof.* Cov_adj = (1/W)Σ_s N_A N_B − δ²·lA·lB. The cross sum counts triples:
Σ_s N_A N_B = Σ_{i<lA, i′<lB} Σ_s A(s+i)A(s+lA+i′) = Σ_{i,i′} C_A(lA+i′−i).
The lag d = lA + i′ − i ranges over [1, L−1], each realized by
w(d) = #{(i, i′)} = min(d, lA, lB, L−d) pairs (a trapezoid: up-ramp, plateau
of width |lA−lB|+1, down-ramp; Σ_d w(d) = lA·lB). Every lag is NONZERO: the
covariance is a pure correlation sum, no diagonal term. ∎

Verified: Σ_s N_A N_B === Σ_d w(d)C_A(d) as exact integers for all 599 scour
primes at x = 11, 13, 17, 19 — so sign(Cov_adj) = sign of the (BigInt)
integer W·Σ w·C_A − N̄²·lA·lB. **The verdict below involves no floats.**

## Proposition 2 (Dilated correlation product — J₅ with rotated classes)

C_A(d) = C_N(qd mod W) (substitute r = qm), and by CRT the natal
autocorrelation factors, so, exactly,

**C_A(d) = ρ′₃₀(d) · ∏_{7≤p≤x} ρ′_p(d)**, where
ρ′₃₀(d) = 2 / 1 / 0 for d ≡ 0 / ±6q⁻¹ / other (mod 30), and
ρ′_p(d) = p−2 / p−3 / p−4 for d ≡ 0 / ±2q⁻¹ / other (mod p).

*Proof.* #{r: r, r+e ∈ N} factors over the moduli 30, p; each local count is
the natal5-variance ρ-table at e mod p (cap-16, reading 1). Substituting
e = qd rotates the exception classes by q⁻¹ and fixes 0 (qd ≡ 0 mod p ⟺
d ≡ 0 mod p, since gcd(q, W) = 1). So the sibling's pair correlation is the
SAME J₅ product with the ±2 teeth moved to ±2q⁻¹. ∎ (Verified exactly, spot
lags at all levels; and P1's equality is itself an aggregate certificate.)

## Proposition 3 (Full-period forcing — the negative g-mass)

With g_A(d) = C_A(d)/W − δ²: **Σ_{d mod W} g_A(d) = 0**, hence

**Σ_{d≢0 (mod W)} g_A(d) = −g_A(0) = −δ(1−δ) < 0.**

*Proof.* Σ_d C_A(d) = N̄² (every ordered pair of A-points sits at exactly one
cyclic lag); per-factor this is cap-16's (p−2) + 2(p−3) + (p−3)(p−4) = (p−2)²
— which the rotated classes leave untouched. And δ²W² = N̄². ∎ (Verified:
Σ_d C_A(d) = N̄² exact at all levels.) So the total off-zero correlation-excess
mass is negative-forced; Cov_adj asks whether the lag range [1, L−1] with
trapezoid weight captures a negative slice of it.

## Proposition 4 (Exact spectral form of the abutting covariance)

Let a = q·lA − W, b = q·lB − W, r = a + b (cap-19: |r| < q), and
S(j) = Σ_{r∈N} e(jr/W). Then

**Cov_adj = (1/W²) Σ_{j≠0} |S(j)|² · sin(πja/W)·sin(πjb/W)·cos(πjr/W) / sin²(π(qj mod W)/W).**

*Proof.* For any pattern, the abutting two-box kernel at frequency k is
Re[e(k·lA/W)·D_{lB}(k)·conj(D_{lA}(k))] = cos(πkL/W)·sin(πk·lA/W)·sin(πk·lB/W)/sin²(πk/W)
(D_l = geometric kernel; the three phases add to πkL/W). Substitute k = qj
mod W (bijection; |S_A(qj)|² = |S(j)|²): q·lA = W + a gives
sin(πk·lA/W) = (−1)^j sin(πja/W), likewise for lB; the two (−1)^j cancel;
q·L = 2W + r gives cos(πkL/W) = cos(πjr/W). ∎ (Verified to relerr ≤ 3·10⁻¹⁰
against the exact integer value, every prime, x ≤ 17; also equals
(V_fused − V_A − V_B)/2 by the identity sin²(x+y) − sin²x − sin²y =
2·sinx·siny·cos(x+y) applied to Lemma 4(2) of cap-19.)

## Proposition 5 (Sign dichotomy and the Low-Band Lemma)

Let m = W mod q. If q ∤ W+1 then **a = q−m ≥ 1 and b = −m ≤ −1** — opposite
signs — and r = q−2m. If q | W+1 then a = b = 1, r = 2.

**Low-Band Lemma.** For q ∤ W+1, every spectral term of Prop. 4 with
1 ≤ j ≤ J₀ = ⌊W/(2·max(a, |b|))⌋, and its mirror W−j, is ≤ 0 (strictly < 0
unless S(j) = 0). For q | W+1 every term with j ≤ W/4 is ≥ 0.

*Proof.* For j ≤ J₀: x = πja/W ∈ (0, π/2], y = πjb/W ∈ [−π/2, 0), and
|x+y| = πj|r|/W ≤ π/2 since |r| = |a − |b|| ≤ max(a, |b|). So sin x > 0,
sin y < 0, cos(x+y) ≥ 0: the product is ≤ 0. The mirror j ↦ W−j carries sign
(−1)^{a+b+r} = +1. For q | W+1 all three factors are positive up to j = W/4. ∎

(Verified: 0 sign violations over all j, all primes, x ≤ 17.)

## The verdict (exact integer arithmetic, 599 scour primes, 4 levels)

Sign of Cov_adj by the BigInt integer of Prop. 1, both integer routes agreeing
exactly for every prime:

| x | scour primes | Cov_adj < 0 | exceptions (ratio 2C/(V_A+V_B)) | aggregate Σ2Cov/Σ(V_A+V_B) |
|---|---|---|---|---|
| 11 | 10 | 9 | q = 13 (+0.125) | −0.287 |
| 13 | 34 | 34 | none | −0.389 |
| 17 | 120 | 119 | q = 107 (+0.043) | −0.399 |
| 19 | 435 | 433 | q = 2083 (+0.107), q = 2221 (+0.024) | −0.374 |

**Cov_adj < 0 for 595/599 (99.3%).** The four exceptions are sparse, WEAK
(+0.02..+0.13, against typical −0.4 and extremes to −0.75), and obey no
divisibility law: none divide W±1 or W−2.

Two predicted-structure surprises, both verified exactly:

- **q | W+1 does NOT flip the sign.** For q = 59 @13, q = 19, 97, 277 @17,
  q = 347 @19 the whole low band is provably positive (Prop. 5), yet the
  verdicts are −1.61, −5.09, −1.95, −1.72, −4.71: the high band wins.
- **q | W−2 is not an exception either** (cap-19's stated exclusion): those
  primes are among the MOST anticorrelated (q = 23 @17: ratio −0.748).

## What is proven, what is refuted, what remains

**The Low-Band Lemma is true and is not the mechanism.** Measured lowShare
(fraction of Cov carried by |j| ≤ J₀) is 0.003 mean; the Cauchy–Schwarz
certificate Cov_low + √(V_A^hi·V_B^hi) < 0 closes for 0/595. The candidate
mechanism, that most lags sweep the generic (p−4)/p classes, is
correct about the lag-mass (27/30 of lag classes carry g = −δ², Prop. 3
forces the total off-zero mass negative) but that equidistribution main term
is O(δ·W/q²), an order 1/q smaller than the measured Cov. Neither the low
spectral band nor the flat lag-average decides the sign.

**The real mechanism (exact, then one measured step).** Reparametrize Prop. 4
by k = qj mod W (a bijection): 

Cov_adj = (1/W²) Σ_{k≠0} |S(q⁻¹k)|² · sin(πk·lA/W)·sin(πk·lB/W)·cos(πkL/W) / sin²(πk/W),

and since lA/W, lB/W ≈ 1/q and L/W ≈ 2/q, the kernel is
**sin²(πk/q + ε)·cos(2πk/q + ε′) / sin²(πk/W)** — a Fejér-type resonant
envelope times a cosine that oscillates with period q in k. The same
envelope without the cosine gives V_A + V_B. Hence

**2Cov/(V_A + V_B) = weighted mean of cos(2πk/q + ε′), weights
|S(q⁻¹k)|²·sin²(·)/sin²(πk/W) ≥ 0** — bounded in [−1, 1] by construction. If
the weight equidistributes in k/q mod 1, the ratio tends to
E[sin²θ·cos2θ]/E[sin²θ] = **−1/2**.

Measured: −0.29 / −0.39 / −0.40 / −0.37, with the weight share on the
cos > 0 lobes 0.50 for every generic prime. The anticorrelation of abutting
sibling windows is the trigonometric fact E[sin²θ·cos2θ] < 0 dressed in natal
arithmetic; the four exceptions are primes where the weighted cosine average
fluctuates across zero — which is exactly why every exception is weak.

## Uniform-in-q Anticorrelation is refuted

This is the file's most decision-relevant output, and it is a refutation rather
than a gap, so it is stated on its own rather than as a clause inside a status
list.

> **Uniform-in-q Anticorrelation [REFUTED].** "Cov_adj(q) < 0 for every scour
> prime q at every level" is FALSE. Six counterexample primes are known, of the
> 10,201 scour primes at the six computed levels: q = 13 @11 (ratio +0.125),
> q = 107 @17 (+0.043), q = 2083 @19 (+0.107), q = 2221 @19 (+0.024) here;
> q = 2339 @23 (cap-30 Prop D) and q = 173 @29 (cap-36 P6). Every one is weakly
> positive against typical −0.4 and extremes to −0.75, and every one is a
> skeleton resonance in the sense of cap-26 — skeleton 0.625, 0.544, 0.606,
> 0.521, 0.575, 0.511, each above 1/2 — so the exceptions are deterministic and
> exactly computable, not noise. **Any correct general statement about the sign
> is aggregate, or all-but-sparse-exceptions.** The aggregate form is what the
> calm actually uses, and it holds at every computed level.

The exceptions obey no divisibility law: none divide W±1 or W−2, and cap-26
explains why — the law is multi-prime alignment of the two lag classes with the
J₅ spike classes, which no congruence in q decides.

**Sharpest true form.**

- [PROVEN, all x, q] Props. 1–5: Cov_adj is a closed arithmetic object — an
  exact integer sign — with exact spectral form and a sign-definite low band.
- [CERTIFIED EXACT, x = 11..19] Cov_adj < 0 for 595/599 scour primes; all
  4 exceptions at these levels cataloged, weakly positive, non-resonant in the
  divisibility sense.
- [REFUTED] the uniform-in-q form, per the box above.
- [OPEN] the aggregate theorem Σ_q 2Cov / Σ_q (V_A+V_B) < 0 for all x: needs
  provable equidistribution of the spectral weight in k/q (Erdős–Turán /
  large-sieve discrepancy against the natal spectral measure) — the same
  diffuse support-≥2 cloud that blocks cap-02's caps. Cap-26 and cap-30 reduce
  this to G30_agg(x) < 1/2 and certify it at six levels; cap-36 names the
  residue as the Skeleton Equidistribution Conjecture.

## Where this sits

This file owns two things: the exact arithmetic of Cov_adj (Props 1–5) and the
refutation of the uniform-in-q form. What the anticorrelation then buys, and at
what calibration each part of the anchored calm stands, is one table in
[anchored-calm.md](anchored-calm.md). The −1/2 constant this file identified as a
heuristic limit is proven exact in [natal-cap-26-minus-half.md](natal-cap-26-minus-half.md);
the aggregate bound it left open is certified at six levels in
[natal-cap-30-skeleton-bound.md](natal-cap-30-skeleton-bound.md) and
[natal-cap-36-skeleton-door.md](natal-cap-36-skeleton-door.md).
