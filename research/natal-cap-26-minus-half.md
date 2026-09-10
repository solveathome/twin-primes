# The Minus-Half Theorem — the exact −1/2 anticorrelation constant

<!-- ledger
id: Q-minus-half
status: ANSWERED
todo: none
question: Is the -1/2 anticorrelation constant of the abutting-window covariance exact, or only equidistribution-conditional?
verdict: For the flat spectral functional the -1/2 is EXACT, a two-line consequence of the mod-30 difference set, verified to relerr <= 1e-15 on the full spectrum at x = 7 and 11; the whole equidistribution question compresses exactly into two residue-class correlation sums, and the residual all-x statement reduces to G30_agg(x) < 1/2.
-->

*(2026-08-14. Companion to `natal-cap-26-minus-half.js`, which verifies every
identity below — the pushforward identity and the exact −1/2 to relerr
≤ 1e−15 on the full spectrum at x = 7, 11; the deviation identity and ledger
to ≤ 1e−9 for every scour prime at x = 11..19. Notation as cap-23: level x,
W = x#, natal set N, N̄ = 2∏(p−2), δ = N̄/W, S(j) = Σ_{r∈N} e(jr/W); scour
prime q, lA = ⌈W/q⌉, lB = ⌊(W+1)/q⌋, L = lA+lB, a = q·lA − W;
R(q) = 2Cov_adj/(V_A+V_B). C(m) = natal autocorrelation (the J₅ product),
g(m) = C(m)/W − δ². Pushforward variable t_j = (qj mod W)/W.)*

Status of this result and of the anchored calm as a whole:
[anchored-calm.md](anchored-calm.md).

Cap-23 closed with one open leg: under k/q-equidistribution of the resonant
spectral weight, R(q) → E[sin²θcos2θ]/E[sin²θ] = −1/2. This file proves what
is provable there. The surprise: **for the flat spectral functional the −1/2
is EXACT — a two-line consequence of the mod-30 difference set — and the
whole equidistribution question compresses, exactly, into two residue-class
correlation sums.**

---

## Proposition 1 (Pushforward identity)

For every integer h: **Σ_j |S(j)|² e(h·qj/W) = W·C(qh mod W).**

*Proof.* |S(j)|² = Σ_{r,r'∈N} e(j(r−r')/W); summing e(j(r−r'+qh)/W) over all
j gives W exactly when r'−r ≡ qh (mod W), else 0. ∎

So the Fourier coefficients of the pushforward of the spectral measure
|S(j)|² under j ↦ t_j are the natal autocorrelations at the lags q, 2q, 3q, …
— everything J₅-computable. (Verified @7, @11: h = 1..10, every scour prime,
relerr ≤ 4e−16 against the full CRT spectrum.)

## Theorem 2 (Minus-half, flat form — EXACT)

For every level x and every q coprime to 30 (in particular every scour prime):

**Σ_{j≠0} |S(j)|² sin²(πt_j) cos(2πt_j) / Σ_{j≠0} |S(j)|² sin²(πt_j) = −1/2**

exactly — no equidistribution hypothesis, no error term.

*Proof.* The difference set of {11, 17} mod 30 is {0, ±6}. For a unit u mod 30
and 1 ≤ h ≤ 5, hu mod 30 never lies in {0, ±6} (check the 8 units; first hit
is h = 6, when q ≡ ±1 mod 5). So C(qh mod W) = 0 for h = 1..5: by Prop. 1 the
pushforward integrates every trig polynomial of degree ≤ 5 exactly as the
uniform measure does. Both test functions have degree 2:
numerator = −¼WN̄ + ½WC(q) − ¼WC(2q) = −¼WN̄, denominator = ½WN̄ − ½WC(q) =
½WN̄ (the j = 0 term drops itself: sin²(0) = 0). Ratio −1/2. ∎

The heuristic constant of cap-23 is not a limit — it is an identity. The
natal comb's two teeth sit 6 apart in a 30-wheel; 6/30 = 1/5, and no lag qh
with h ≤ 5 can come back around. All approximation lives in the difference
between the flat functional and the true abutting-window kernel — and that
difference is *exactly* the next proposition.

## Proposition 3 (Deviation identity — the bridge)

The combined lag weight of 2Cov_adj + (V_A+V_B)/2 is
ψ_d = 2w(d) + (lA−d)₊ + (lB−d)₊ (w the cap-23 trapezoid), and

**ψ_d = L for every 1 ≤ d < lA;  ψ_d = 2(L−d) for lA ≤ d < L.**

Hence, exactly:

**R(q) + 1/2 = [ (L/2)·B1 + B2 ] / (V_A+V_B)**, with
- **B1 = Σ_{|d|<lA} g(qd mod W)** — a flat sum over the COMPLETE lag class
  q·Z mod W (the lA multiples of q in [0, W), each nonzero one twice);
- **B2 = 2 Σ_{e=0}^{lB−1} (lB−e)·g(a + qe)** — a triangular sum over the
  complete shifted class a + q·Z (lags a, a+q, …, up to W+r−q).

*Proof.* |lA − lB| ≤ 1 always. For 1 ≤ d < lA: w(d) = min(d, lB) and
ψ_d = 2d + (lA−d) + (lB−d) = L when d ≤ lB, and at d = lB (lA = lB+1 case)
ψ = 2lB + 1 = L: constant. For d ≥ lA: w = L−d, the Fejér parts vanish,
ψ = 2(L−d). The d < lA lags are qd mod W = qd (no wrap; q(lA−1) = W−m < W) —
the complete class q·Z; the d ≥ lA lags are qd − W = a + q(d−lA) — the
complete class a + q·Z with triangle weight. Collect with the d = 0 term
(L/2)g(0) inside B1. ∎ (Verified: relerr ≤ 1e−9 vs the exact BigInt
integers, every scour prime, x = 11..19; R matches cap-23's table exactly.)

**Reading.** All deviation of R(q) from −1/2 is two residue-class
discrepancies of the natal correlation function. If the classes q·Z and
a + q·Z carried their period-average correlation mass, R(q) = −1/2 on the
nose. The anticorrelation constant is exact; its corrections are arithmetic.

## Proposition 4 (Ledger and the a-priori no-30 bound)

Over moduli M ∈ {30} ∪ {7..x} write g = ∏_M f_M − ∏_M m̄_M (f_M = local J₅
row / M, m̄_M its mean; ∏_M m̄_M = δ² exactly). Expanding both class sums over
subsets T (φ_M := f_M − m̄_M is mean-zero per factor) splits

dev(q) := R(q) + 1/2 = Σ_{T≠∅} dev_T(q), each term exactly computable.

For every T with 30 ∉ T, uniformly in q (partial sums of a mean-zero
P_T-periodic product are ≤ ½ its one-period absolute mass; Abel summation for
the triangular weight):

**|Σ_{30∉T} dev_T(q)| ≤ APB(x, q) := A_x · (L/4 + lB/2) / (V_A+V_B)**,
A_x = m̄₃₀·[∏_p(m̄_p + s_p) − ∏_p m̄_p], s_p = (8p−24)/p², s₃₀ = 27/125·…= 0.24.

So with the SKELETON G30(q) := Σ_{30∈T} dev_T(q) (lags qd ≡ 0, ±6 mod 30 and
their p-refinements — exactly computed):

**R(q) ∈ [−1/2 + G30(q) − APB, −1/2 + G30(q) + APB]**, and the

**NON-RESONANCE CONDITION: G30(q) + APB(x, q) < 1/2 ⟹ Cov_adj(q) < 0**,
certified. (Measured: |no-30 mass| ≈ 1e−3, APB ≈ 0.1–0.35 — the bound holds
with 100× slack; ALL the action is in the skeleton.)

## The verdict (exact + certified, x = 11..19, 599 scour primes)

| x | K | dev_agg = R_agg+½ | skeleton G30_agg | no30_agg | max per-q \|no30\| | certified Cov<0 (a-priori) | true Cov<0 |
|---|---|---|---|---|---|---|---|
| 11 | 10 | +0.2133 | +0.2132 | +0.00009 | 0.0024 | 7/10 | 9/10 |
| 13 | 34 | +0.1109 | +0.1113 | −0.00035 | 0.0068 | 4/34 | 34/34 |
| 17 | 120 | +0.1013 | +0.1011 | +0.00027 | 0.0070 | 0/120 | 119/120 |
| 19 | 435 | +0.1262 | +0.1259 | +0.00031 | 0.0060 | 0/435 | 433/435 |

- **The deviation is skeleton-borne to within 4e−4 in aggregate, 0.007 per
  prime, at every level.** R_agg = −0.29/−0.39/−0.40/−0.37 = −1/2 + skeleton.
- **The a-priori certificate dies where it is most wanted**: at x ≥ 17,
  V_A+V_B is calm-small (≈ 16 at q = 19@17 — 30× below Poisson), so
  APB ∝ L/(V_A+V_B) is vacuous (median 1.4 @17). The bound is true (0
  violations, 100–1000× slack) but certifies negativity only at @11–@13.
- **All 4 cap-23 sign exceptions are skeleton resonances** (dev > 1/2 ⟺
  Cov > 0): skeleton = 0.625 (13@11), 0.544 (107@17), 0.606 (2083@19),
  0.521 (2221@19) — carried by deep (support ≥ 3) terms: {30,7} +0.314 and
  {30,7,11} +0.321 for 13@11; {30,7,13,17} +0.392 for 107@17; {30,7,11,13}
  +0.245 for 2221@19; a broad multi-T spread for 2083@19. Cap-23 found "no
  divisibility law" — correct: the law is multi-prime alignment of the two
  lag classes q·Z and a+q·Z with the J₅ spike classes, deterministic and
  exactly computable but not a one-liner. Near-exceptions form a continuum
  (q = 1621@19: dev +0.449).
- **The −0.4-not-−0.5 gap is real**: mean rigid (|T| ≤ 2) skeleton ≈ 0.000
  at x ≥ 13 — the systematic +0.10..0.13 offset is deep skeleton and does
  not trend to 0 through @19.

## Sharpest true form

- **[PROVEN, all x, all q coprime to 30]** Theorem 2: the flat −1/2 is
  exact, with 5 harmonics of immunity (Prop. 1 + the mod-30 difference set).
- **[PROVEN, all x, q]** Prop. 3: R(q) + 1/2 = two explicit residue-class
  correlation sums over V_A+V_B; Prop. 4: the no-30 part ≤ APB(x,q),
  uniformly in q, with the explicit constant A_x.
- **[CERTIFIED EXACT @11–@19]** R(q) = −1/2 + G30(q) + no30(q) with G30
  computed exactly for all 599 primes and |no30| ≤ 0.007 (measured; bounded
  a-priori with 100× slack); the non-resonance condition G30 + APB < 1/2
  certifies Cov < 0 for 7/10 @11 and 4/34 @13 (vacuous at @17/@19); the
  4 exceptions are exactly the deep-skeleton resonances G30 > 1/2.
- **[OPEN]** an all-x bound on the skeleton itself — the aggregate calm
  needs only **G30_agg < 1/2** (measured +0.10..+0.21). Its deep terms are
  the same diffuse support-≥2 cloud as cap-02, now CONFINED to the lags
  ≡ 0, ±6 (mod 30) of the two classes q·Z and a+q·Z. The wall, in a
  smaller room.

## Where this sits

This file owns the Minus-Half Theorem and the reduction that follows it: the
all-x aggregate statement is exactly **G30_agg(x) < 1/2**, and everything else
in the chain is proven. That is strictly smaller than what cap-23 left open,
which asked for equidistribution of the whole spectral weight; the constant
needs none.

The reduction has since been carried further. The skeleton's 2ⁿ ledger collapses
to one closed-form kernel and G30_agg < 1/2 is certified as an exact integer
inequality at six levels @11 through @29
([natal-cap-30-skeleton-bound.md](natal-cap-30-skeleton-bound.md) Theorems A and
B, [natal-cap-36-skeleton-door.md](natal-cap-36-skeleton-door.md) P6), and the
residual all-x statement is named the Skeleton Equidistribution Conjecture.
Calibration of every part of the anchored calm is one table in
[anchored-calm.md](anchored-calm.md).
