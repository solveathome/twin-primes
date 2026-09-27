# The Discrepancy Lemma (attack 14): statements and proofs

<!-- ledger
id: Q-natal-discrepancy-lemma
status: PARTIAL
todo: none
question: Can the rotation ensemble's class discrepancy be controlled strongly enough to feed Freedman's inequality?
verdict: Lemmas 1 to 4 and Theorem 5 are stated and machine-checked (1,954 assertions, zero failures) and Proposition 6's stopped Markov-union-Freedman chain is rigorous, but none of it touches the anchored problem: the anchored path's per-step conditional variances are ensemble-typical (mean ratio 0.93 to 0.99), so the anchored side remains 100 per cent drift against the Mertens/2C2 wall.
-->

*(2026-08-14, natal-cap series, TODO item 6. Companion to
`natal-cap-14-discrepancy-lemma.js`, where every claim marked [verified] is
machine-checked — 1,954 assertions, zero failures. Under moratorium: not for
circulation.)*

## Setting

W = x#, natal set **N** ⊂ Z/W with |N| = N (canonical alias: the admissible
twin residues 11, 17 mod 30 surviving p ∈ [7, x]). Scour primes
x < q₁ < … < q_K ≤ √W. **Rotation ensemble**: independent uniform strike
classes c_j ∈ Z/q_j; step j removes every alive r with r ≡ c_j or c_j − 2
(mod q_j). A_k = alive set after steps 1..k (A₀ = N), fresh_k = |A_{k−1}| −
|A_k|, filtration F_k = σ(c₁,…,c_k). The anchored tile is the member
c_j ≡ 0 ∀j. For a set A and a prime q ∤ W:

- X_c = #{r ∈ A : r ≡ c (mod q)}, x_c = X_c − |A|/q,
- Y_c = X_c + X_{c−2} (pair-class count),
- D²(A,q) = Σ_c x_c² (the ℓ² class discrepancy),
- R₂(A,q) = Σ_c x_c x_{c+2}.

The target (cap-07 reading 7): control of the deviations
e_k = fresh_k − (2/q_k)|A_{k−1}| strong enough to feed Freedman's inequality
and upgrade the ensemble zero-survivor bound from Chebyshev (1.0e−4 at @17)
toward the empirical ceiling e^−311.

## Lemma 1 (exact conditional mean and variance) [verified 1e−15]

Conditioned on F_{k−1} (so A = A_{k−1} is fixed; c = c_{q} uniform,
independent, q = q_k):

  E[fresh | F_{k−1}] = (2/q)|A|,
  Var[fresh | F_{k−1}] = (1/q) Σ_c (Y_c − 2|A|/q)² = (2/q) (D² + R₂).

*Proof.* fresh = Y_c with c uniform on Z/q. Σ_c Y_c = 2|A| gives the mean.
For the variance, Y_c − 2|A|/q = x_c + x_{c−2}, so
Σ_c (Y_c − 2|A|/q)² = Σ x_c² + Σ x_{c−2}² + 2 Σ_c x_c x_{c−2} = 2D² + 2R₂. ∎

Cauchy–Schwarz gives |R₂| ≤ D², hence 0 ≤ Var ≤ (4/q)D²: **the discrepancy
lemma is exactly an ℓ²-flatness statement about the alive set mod the
upcoming prime.**

## Lemma 2 (deterministic bridge) [verified: anchored path uses ≤ 0.42 of it]

Pathwise, |e_k| = |Y_{c_k} − 2|A|/q| ≤ √(q · v_k), where
v_k = Var[fresh | F_{k−1}].

*Proof.* max_c (Y_c − 2|A|/q)² ≤ Σ_c (Y_c − 2|A|/q)² = q·v_k. ∎

The bound is by a *predictable* quantity — exactly what Freedman consumes.
Its cost: a factor √q against the true ℓ∞ deviation, which section D of the
.js shows is the decisive loss (readings 7–8).

## Lemma 3 (step-1 Parseval and the spectrum certificate) [verified]

For the deterministic first step (A = N):

  D²(N,q) = (1/q) Σ_{a=1}^{q−1} |G(a)|²,  G(a) = Σ_{r∈N} e(ar/q).

Since q ∤ W, class counts mod q are **window counts** on Z/(Wq):

  G(a) = (1/W) Σ_{k∈Z/W} S(k) · D_W(kq − aW),

with S(k) the corrected factored spectrum (cap-02, CRT twist included) and
D_W the window-W Dirichlet kernel on Z/(Wq),
|D_W(m)| = |sin(πm/q)| / |sin(πm/(Wq))| ≤ W, whose numerator |sin(πaW/q)| is
constant in k (m = kq − aW ≡ −aW mod q). The denominator never vanishes
(kq ≡ aW mod Wq would force q | a). Triangle inequality yields certified ℓ²
and ℓ∞ bounds from |S| alone.

*Proof.* First display: Parseval over Z/q with X̂(a) = G(a). Second: expand
1_N through its Z/W inversion and sum the geometric series over the window
[0, W). ∎

Measured certification gaps: ℓ² 10.6–42×, ℓ∞ 7.7–17.6× (valid at every
tested (q,a), never violated). There is **no** clean subgroup Parseval
collapse in the frequency domain because q ∤ W; the exact collapse lives in
the difference domain:

## Lemma 4 (difference-domain factorization) [verified at all 32,340 lags]

Cyclic autocorrelation of the natal set factors over CRT:

  C(d) = #{r : r, r+d (mod W) ∈ N} = c₃₀(d) · ∏_{7≤p≤x} (p − 4 + ρ_p(d)),

with c₃₀ = 2/1/0 for d ≡ 0/±6/other (mod 30) and ρ_p(d) = 2 if p|d, 1 if
d ≡ ±2 (mod p), 0 otherwise — the J₅ comb of natal5-variance. Moreover
C(d) = lin(d) + lin(W−d), lin(d) = ordered natal pairs at integer difference
d, and for any fresh prime q,

  D²(A,q) = #{(r,r′) ∈ A² : q | r−r′} − |A|²/q

turns the ℓ² discrepancy into pure pair counting.

*Proof.* Local counting mod each p (forbidden classes {0, p−2, −d, −d−2}
overlap by exactly ρ_p(d)); the wrap split is the bijection between wrapped
pairs at lag d and unwrapped pairs at lag W−d; the last display is
Σ_c X_c² = #{pairs ≡ mod q}. ∎

## Theorem 5 (evolution law — exact ensemble means at every step) [verified]

Over the rotation ensemble, for any r ≠ r′ with d = r − r′:

  P(r ∈ A_k) = ∏_{j≤k} (1 − 2/q_j)   (every r — no genericity needed),
  P(r, r′ ∈ A_k) = ∏_{j≤k} (1 − (4 − ρ_{q_j}(d))/q_j),

with the same ρ as Lemma 4 (the pair's kill classes at q_j number
4 − ρ_{q_j}(d)). Consequently, with P1_k, P2_k(d) those products and lin
from Lemma 4, the mean discrepancy and mean conditional variance of every
step are in closed form:

  E[D²_k(q)] = P1_{k−1} N (1 − 1/q) + 2 Σ_{d>0} lin(d) P2_{k−1}(d) (1[q|d] − 1/q),
  E[Σ_c X_c X_{c+2}] = Σ_{d>0} lin(d) P2_{k−1}(d) (1[d ≡ 2] + 1[d ≡ −2] (mod q)),
  E[A_k²] = P1_k N + 2 Σ_{d>0} lin(d) P2_k(d),
  E[v_k] = (2/q)( E[D²_k] + E[Σ X_c X_{c+2}] − E[A_{k−1}²]/q ).

**Corollary (noise-budget identity, exact).** With f_k = ∏_{j>k}(1 − 2/q_j):

  Var(S) = Σ_k f_k² E[v_k],

since S = N∏(1−2/q) − Σ e_k f_k and the e_k are martingale increments
(cross terms vanish by the tower property; E[e_k²] = E[v_k]).

*Proof of the products.* The c_j are independent; r is killed at step j iff
c_j ∈ {r, r+2} (two classes, always distinct for odd q_j); the pair is
killed iff c_j lies in the union of the two kill sets, of size 4 − ρ. ∎

Verification, three independent ways [all in the .js]: k = 1 reproduces the
exact natal values (1e−9); 210,400 Monte-Carlo marches match all 164
per-step means (max sampling z = 2.85); the trajectory sum equals the
endpoint pair-formula variance to 4.4e−8.

**Exact strike-ensemble endpoint variances.** These are a different ensemble
from the full window-rotation values 10.06 / 91.13 / 1060.54, and close to
them but not equal:

| level | strike-ensemble Var(S) | window-rotation Var | ratio |
|-------|-----------------------|---------------------|-------|
| @11 | 9.6305 | 10.06 | 0.957 |
| @13 | 90.1995 | 91.13 | 0.990 |
| @17 | 1062.3544 | 1060.54 | 1.0017 |

Means agree exactly in both ensembles; no qualitative cap-07 reading changes.

## Proposition 6 (the stopped Markov–union–Freedman chain — rigorous)

For any predictable thresholds τ_k > 0, let T = min{k : v_k > τ_k} (a
stopping time — v_k is F_{k−1}-measurable). Then

  P(S = 0) ≤ exp( −E² / (2(V* + M*E/3)) ) + Σ_k E[v_k]/τ_k,

with E = N∏(1−2/q), V* = Σ f_k²τ_k, M* = max_k f_k √(q_k τ_k).

*Proof.* {S = 0} = {Σ e_k f_k ≥ E} (the endpoint identity). Split on
{T = ∞} vs {T < ∞}. On {T = ∞} the stopped martingale Σ_{k<T} e_k f_k has
increments bounded by M* (Lemma 2 with v_k ≤ τ_k) and predictable quadratic
variation ≤ V*; apply Freedman (1975, Ann. Probab. 3, Thm 1.6, one-sided).
P(T < ∞) ≤ Σ P(v_k > τ_k) ≤ Σ E[v_k]/τ_k by Markov, E[v_k] exact by
Theorem 5. ∎

### The chain, computed at its optimum (section D of the .js)

Unconditional totals (best thresholds): 0.72 / 0.53 / 0.32 at @11/@13/@17 —
**loses to endpoint Chebyshev by 10²–3×10³**. With per-step moment control
of order m (measured Gamma scale c ≈ 0.75): m = 2 gives e^−4.3 at @17
(still below Chebyshev's e^−9.2), the full sub-exponential ladder saturates
at e^−15; the measured sub-Gaussian model reaches e^−34.6. And the hard
ceiling: **even v_k ≤ E[v_k] enforced deterministically yields only
e^−68.6 at @17** (e^−7.0 @11, e^−21.1 @13) because Lemma 2's bridge pays
√q — increment budget 70 where the true scale is ~15.

### Where the e^−311 actually lives

e^−311 = [ℓ² flatness, worth at most e^−69] × [ℓ∞ increment control, all
the rest]. Reconstructed exactly: v_k ≤ E[v_k] plus f·max_c|Y_c − 2A/q| ≤
14.67 gives e^−311.1 from the corrected variance (cap-07's 311.37). The
discrepancy lemma, correctly stated, is the **ℓ∞** statement

  on every path, max_c |Y_c − 2|A|/q| ≤ C·√(|A|/q),

measured C ≤ 5.76 / 6.46 / 7.34 over ~2.4 million MC step-samples, zero
violations, growth consistent with a √(log q) extreme-value factor. Proven,
it delivers the e^−150…e^−300 grade; exponential ℓ² tails alone deliver the
e^−35…e^−69 zone (still a 4–7 order exponent upgrade over Chebyshev, and
the most provable next rung: E[v_k] is now exact, so only one scalar tail
per step is missing).

## What none of this touches

All probabilities are over the rotation ensemble. The anchored tile is one
fixed, measurably atypical member (z = −4.5 @17, −25.5 @19, Mertens drift
toward 0.793·E). Theorem 5 and any future e^−300 ensemble theorem say
nothing about the anchored escape; this file's only anchored contribution is
structural — the anchored path's per-step conditional variances are
ensemble-typical (mean ratio 0.93–0.99), so the anchored problem remains
100% drift: the Mertens/2C₂ wall, untouched.

## Next steps

1. Exact E[v_k²] via 4-point correlations restricted to q|d classes (the
   quadruple sum should collapse by CRT as the pair sum did) → rigorous
   per-step Chebyshev tails → an unconditional ensemble theorem beyond
   Chebyshev, the first rung of the ladder.
2. The ℓ∞ lemma at step 1 only (deterministic natal set): max_c|Y_c − 2N/q|
   ≤ 7√(N/q) is a finite verified fact at three levels; find the mechanism
   where there is no randomness, then propagate with Prop 6's stopping-time
   scaffold.
