# The fused window — three proven identities, the exact spectral forms, and the Anchored Typicality Measurement

<!-- ledger
id: Q-calm-lemma-identities
status: PARTIAL
todo: none
question: What in the fused window and the anchored calm is proven, exactly?
verdict: Three identities and the exact spectral forms are proven and verified as exact integers or floats; the uniform-in-q anticorrelation is REFUTED rather than open, with six counterexample primes across six levels, and the Anchored Typicality Measurement is the anchored-escape wall one level down with no proof mechanism in sight.
-->

*(2026-08-14. Companion to `natal-cap-19-calm-lemma.js`, which verifies every
identity below as exact integers/floats. Notation: level x, tile width
W = x#, natal set N = N_x ⊂ [0, W) with indicator `ind`, |N| = N̄, mirror
μ(r) = W−2−r with μ(N) = N (cap-09 P0 / cap-13). Scour prime q: gcd(q, W)=1,
q² ≤ W; strike classes of rotation t are {t, t−2} mod q; q⁻¹ is the inverse
of q mod W. Sibling A(m) = ind[(qm) mod W], sibling B(m) = ind[(qm−2) mod W]
— cap-01's dilated kill-image patterns.)*

Status of these results and of the anchored calm as a whole:
[anchored-calm.md](anchored-calm.md).

---

## Lemma 1 (Mirror-Sibling Identity)

**B(m) = A(−m mod W) for every m.**

*Proof.* B(m) = ind[(qm−2) mod W] = ind[μ(qm−2) mod W] since μ(N) = N.
μ(qm−2) = W−2−(qm−2) = W−qm ≡ −qm ≡ q·(−m) (mod W). So
B(m) = ind[(q·(−m)) mod W] = A(−m mod W). ∎

The two dilated siblings are one pattern read in opposite directions.

## Lemma 2 (Fusion Identity — the anchor)

Let lA = ⌈W/q⌉, lB = ⌊(W+1)/q⌋, L_q = lA + lB. Then

**gross(0,q) = #( A ∩ [W−lB, W+lA) ) — a single cyclic window of length
L_q containing m = 0**, where the window is read cyclically mod W.

*Proof.* The class-0 strikes are the natal r = qm with 0 ≤ qm < W, i.e.
m ∈ [0, lA); their count is Σ_{m=0}^{lA−1} A(m) (this is cap-01's certified
branch-A identity). The class-(−2) strikes are the natal r = qm−2 with
0 ≤ qm−2 < W, i.e. m ∈ [1, lB] (q∤W excludes qm = W; qm = W+1 gives
r = W−1 ∉ N and contributes 0 either way); their count is
Σ_{m=1}^{lB} B(m) = Σ_{m=1}^{lB} A(−m) (Lemma 1) = Σ_{v=W−lB}^{W−1} A(v).
The two index intervals [W−lB, W−1] and [0, lA−1] are cyclically adjacent
across 0 and disjoint (L_q ≈ 2W/q < W), so the sum is one window. ∎

Since q·lA − W ∈ [1, q−1] and q·lB − W ∈ [2−q, 1], the fused length obeys
**q·L_q = 2W + r_q with |r_q| < q**: the anchored window is within O(q/W)
of exactly 2/q of the period — the resonance used in Lemma 4.

## Lemma 3 (Mirror-Phase Doubling Lemma — the two degenerate phases, concatenation and duplication)

The mirror acts on strike classes by c ↦ (W−2−c) mod q, hence on rotation
pairs by {t, t−2} ↦ {W−t, (W−t)−2}: rotation t's pair maps to rotation
(W−t)'s pair — the proven ensemble symmetry stat(t) = stat(W−t). The pair
is **self-paired iff 2t ≡ 0 (mod W)**, i.e. exactly t = 0 and t = W/2:

- **t = 0 (concatenation).** The self-pairing swaps the two classes
  {0, −2}, and by Lemma 2 the two windows are mirror-adjacent: one window
  of doubled length.
- **t = W/2 (duplication).** Here the self-pairing fixes each class:
  W−2−(W/2) ≡ W/2 − 2 (mod q) means the mirror maps class W/2−2 **onto**
  class W/2, so n_{W/2−2} = n_{W/2} and
  dev(W/2, q) = 2·(one class-window's deviation). (This is cap-13's
  variance-doubling, re-derived: dev in steps of 2, variance ≈ 2× the
  unfused pair.)

For generic t the two windows of A sit at starts q⁻¹t and q⁻¹(t−2),
separated by 2q⁻¹ mod W — generically far apart.

**Refinement (resonant primes).** Adjacency of the two *literal* windows of
a generic rotation requires q·l ≡ −2 (mod W) for the relevant window length
l ≈ W/q, i.e. **q | W−2**: for such q every rotation's pair is adjacent and
the whole ensemble is fused (measured @17: q = 23, 31, 179; varPair/V_fused
= 1.00 exactly; the anchor has no advantage there, R ≈ 1). Dually q | W+1
forces r_q = 2, the tightest resonance (q = 19 @17: R = 0.15). ∎

## Lemma 4 (Exact spectral forms)

With S(k) = Σ_{r∈N} e(kr/W) (factored with CRT twist, cap-02):

1. **Phase alignment.** μ(N) = N gives S(k) = e(−2k/W)·conj(S(k)), so
   **T(k) = e(k/W)·S(k) is real** for all k (the pattern is symmetric about
   the two centers (W−2)/2 and W−1).
2. **Fused-window variance.** The variance of the count of A over all W
   cyclic starts of a length-L_q window is
   **V_fused(q) = (1/W²) Σ_{j≠0} |S(j)|² · sin²(πj·r_q/W) / sin²(π(qj mod W)/W)**
   (substitute k = qj in the sibling spectrum S_A(k) = S(q⁻¹k) and use
   q·L_q = 2W + r_q). Verified to relerr ≤ 7·10⁻¹²; the same with
   a_q = q·lA − W gives the single-head variance.
3. **Anchored Σ-form.** dev(0,q) = ρ·r_q/q + (1/W) Σ_{j≠0} S(j)·conj(E_I(qj)),
   E_I the fused window's geometric kernel; reproduces the integer counts to
   2·10⁻¹¹. This is the sharpest exact expression for the anchored deviation:
   an incomplete twisted sum with resonant kernel — no closed form found,
   and no c·mean^{1/4} bound is visible in it (the budget sits in the diffuse
   support-≥2 spectral cloud, as in cap-02). ∎

## What Lemmas 1–3 do and do not give

Four separate objects, at three calibrations. Their statuses are held in
[anchored-calm.md](anchored-calm.md), not here.

- **Fusion Identity [PROVEN, every scour prime q, every level x].** dev(0,q) is
  the deviation of ONE cyclic sibling window of length L_q ≈ 2W/q (Lemmas 1–2);
  a generic rotation's deviation is the sum over TWO windows 2q⁻¹ apart.
- **Mirror-Phase Doubling Lemma [PROVEN, every q, every x].** dev(W/2,q) =
  2 × (one window's deviation) (Lemma 3) — the same symmetry that calms the
  anchor doubles W/2.
- **The suppression, measured here and since made a theorem elsewhere.** One
  fused window is quieter than two: Σ_q V_fused / Σ_q VarRot = 0.666 @13, 0.589
  @17, driven by adjacent-window anticorrelation Σ 2Cov_adj / Σ(V_A+V_B) =
  −0.39 / −0.40 (the window-scale face of the sieve's ρ_p(d) = p−4 < p−2
  sub-Poisson correlations). The two ratios above are measurements at @13 and
  @17. The anticorrelation behind them is no longer one: the −1/2 constant is
  exact for every q coprime to 30 (Minus-Half Theorem, cap-26), and the
  aggregate bound that makes it negative is certified as an exact integer
  inequality at six levels @11 through @29 (Aggregate 30-Skeleton Bound, cap-30
  and cap-36).
- **Anchored Typicality Measurement [MEASURED].** The anchor is
  position-typical of fused windows: Σ dev(0,q)² / Σ V_fused = 0.935 @13, 0.939
  @17; mean position percentile 47.9% / 47.8%.

Together: measured VR(0) = 0.623 / 0.553 = suppression × typicality. **The
anchored calm is fusion × anticorrelation, with a ≈0.94 typicality residual.**
The heads' own percentiles (45–48%, not extreme) refute "the head window is
specially thin/quiet" as a variance mechanism: the head's only gift is adjacency.

## What is not proven, precisely

1. **The uniform-in-q form of the anticorrelation is REFUTED, not open.**
   Cov_adj < 0 for *every* scour q is false: six counterexample primes are
   known across six levels, cataloged as skeleton resonances (cap-23's verdict
   table, cap-30 Prop D). Any correct general statement is aggregate, or
   all-but-sparse-exceptions. What remains open is the all-x aggregate form,
   which cap-30 reduces to G30_agg(x) < 1/2 and cap-36 names as the Skeleton
   Equidistribution Conjecture.
2. **The Anchored Typicality Measurement is the anchored-escape wall, one level
   down.** "The one arithmetic position is ensemble-typical" is exactly the kind
   of statement measure arguments cannot finish (natal5-variance reading 6) —
   but the unexplained residue has shrunk from the whole calm to a factor 0.94.
   Its home says the rest: no proof mechanism is in sight.

@19 (full enumeration, 9,699,690 rotations, 435 primes): anchored VR rank
14/9,699,690, Z2 rank 6 — percentile ladder 1.84% → 3.94% → 0.0021% →
0.00014%; W/2 the single loudest rotation here, as it is at @11 and @17. The
rank deepens because the ensemble sd shrinks ~K^(−1/2) while the suppression
factor stays ≈0.55–0.70 — consistent with (iii) being a level-stable
mechanism, not a fluctuation.

**W/2 is not loudest at every level, and this sentence used to say it was.** It
read "the single loudest rotation for the third level running", a streak that
@13 breaks: `natal-cap-38-loudness-driver.js` enumerates VR(W/2) = 1.6652 at
@13, rank 198 from the top of 30,030 — the 99.34th percentile, not the
maximum, against a true max of 2.3518 at t = 3461. W/2 IS the loudest at @11,
@17 and @19, all three at rank-from-top 0. What the Mirror-Phase Doubling
Lemma proves is that dev(W/2, q) is twice one window's deviation, per prime;
maximality of the sum over primes is a separate claim and is measured, not
proven. `paper/anchored-note.md` already carried the correctly scoped version
("the loudest rotation of the entire ensemble at @11 and @17 and the 99.3rd
percentile at @13") while this file and `history/CHRONICLE.md` did not.
