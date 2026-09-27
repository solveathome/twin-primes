# Adversarial verification: the cofactor-convolution identity at the anchor

<!-- ledger
id: Q-verify-cofactor-convolution
status: ANSWERED
todo: X
question: Does the cofactor-convolution identity at the anchor hold, and does it test the joint law?
verdict: RESTATED with corrections: the arithmetic is right, an independent re-derivation reproducing every figure to the digit at all five levels and confirming the asserted closed-form step, but the framing does not survive, since X is pinned by the identity X = M - Nbar + n_0 so the whole comparison collapses to one cell and the joint is measurably not a product elsewhere; the model error is 0.52 per cent, not 0.050.
-->

*(2026-08-19. Verifier's report on the headline held out of TODO.md item X and
recorded in `research/history/staging/xchannel-at23.md` §6. Every number below
was produced by an instrument written from `paper/anchored-note.md` §1's
definitions, importing nothing from `research/natal-cap-35-x-multiplicity.js`.
Calibration is marked on every claim: MEASURED, DERIVED, INFERRED, REFUTED.)*

## Verdict

**RESTATED, with corrections.** The arithmetic is right. An independent
re-derivation reproduces every figure in §6's table to the digit at all five
levels, and also confirms the closed-form step the report asserted but never
computed. What does not survive is the framing. Three things:

1. **The test is not a test of the joint law.** For any model that matches the
   two marginals, `X` is pinned by the identity `X = M − N̄ + n_0`, so the
   entire §6 comparison collapses to a single cell, `P(ω_s(r) = 0 and
   ω_s(r+2) = 0)`. The convolution is decorative. Nothing in §6 tests the joint
   law at any other cell, and at the other cells the joint is measurably not a
   product: the empirical factorial-moment ratios `T(i,j)/(M_a(i)·M_b(j)/N̄)`
   run 0.991, 0.979, 0.953, 0.972, 0.933, 0.910 at @19 for
   (i,j) = (1,1), (2,1), (2,2), (3,1), (3,2), (4,1).
2. **The model error is 0.52%, not 0.050%.** The reported figure is the error
   on the one cell the test can see, `n_0`, diluted by the factor
   `n_0/X = 0.0967` at @23. In the cell's own units the five-level series is
   −2.025%, +0.426%, +0.300%, −0.285%, **+0.518%**: sign-flipping,
   non-monotone, and worse at @23 than at @17 or @19. From @13 onward,
   **100% of the reported "65× convergence" is the dilution factor.**
3. **The origin-density candidate is not refuted, it is out of scope.** The
   mechanism is already measured in the file's own @17 output and it is
   present: mixed super-W triples read obs/CRT = 0.677 against the
   P1-only prediction 0.750, a 9.7% joint deficit that no marginal accounts
   for. `X` is structurally blind to it, which is a different fact.

What stands, and is worth keeping: **the anchored survivor deficit is the
square of a one-sided deficit.** That is the honest headline, it is stronger
than the one held, and §7 below states it.

---

## 1. Instrument

`advconv-verify.js`, `advconv-moments.js` and `advconv-onesided.js`, in the
session scratchpad and deliberately not repo files. They build W = x#, the
Natal@5 comb, the scour primes x < q ≤ √W, and the two strike counts
a(v) = #{q : q | v}, b(v) = #{q : q | v+2} straight from `anchored-note.md`
§1, then enumerate the full anchored joint law
cnt(i, j) = #{r ∈ N : a(r) = i, b(r) = j}. @23 runs in 16.2 s at 986 MB peak
RSS. The producer's own scratch instrument (`xchan-m3-closedform.js`) is not on
disk, so §6's table had no artifact in the repo at all before this pass;
reproducing it independently was the only way to grade it. MEASURED.

## 2. [MEASURED] The re-derivation agrees to the digit, at all five levels

| x | X(0) exact | X from independent marginals | rel err | m=2 residual | m≥3 residual |
|---|---|---|---|---|---|
| 11 | 28 | 27.09 | −3.2540% | +7.29 | −6.38 |
| 13 | 452 | 453.31 | +0.2896% | +26.90 | −28.21 |
| 17 | 10,381 | 10,390.29 | +0.0895% | +277.90 | −287.19 |
| 19 | 236,625 | 236,515.60 | −0.0462% | +2,461.98 | −2,352.58 |
| 23 | 6,179,192 | 6,182,284.06 | +0.0503% | +25,287.24 | −28,379.29 |

Every cell matches §6 to the last printed digit, including the tail ratios
0.938, 0.750, 1.340 at k = 7, 8, 9. Probe (b) finds no arithmetic defect.
The producer's §6 is computationally sound.

**And the closed-form step, which §6 asserted without computing it, also
holds — but only after a repair.** §6 says "convolving that law with itself
gives X(0)". Part4 prints no `i = 0` row: it starts its Π_i sweep at n = 2, so
A = 1 is never counted and the table says `n/a`. Since X depends on the joint
*only* through the i = j = 0 cell (§3), part4 as it stands supplies exactly
nothing that X needs. Restoring A = 1 (Π_0 = 1, room_0 = π(W) − π(y)) closes
it: p_nat·(1 + π(W) − π(y)) = 1,784,097.0 against the true 1,784,710 at @23,
ratio 1.0003. Convolving the repaired closed form with itself gives
X = 6,182,297.08, **+0.0503%**, thirteen slots from the empirical-marginal
model. At the lower levels the closed-form route is worse: −7.92% @11,
+0.68% @13, +0.17% @17, −0.061% @19. MEASURED.

Note what the repaired i = 0 cell actually is: p_nat·π(W), the count of natal
slots whose scour part is trivial, which is a prime count. So the "composite
closed form for the channel" reads S(0) ≈ p_nat²·π(W)²/N̄ = 600,349 against
597,475. That is the classical independence heuristic for twins, not new
arithmetic at the origin. INFERRED.

## 3. [MEASURED] Probe (a): the test sees one cell, and independence there is
   bounded a priori

**The identity.** X = Σ_{k≥2} (k−1)·n_k = M − N̄ + n_0 exactly, where
M = Σ_k k·n_k. Verified PASS at all five levels. Any model built from the true
marginals conserves N̄ (trivially) and M (because M is the sum of the two
marginal means), verified to 1e−6 at all five levels. Therefore

> X_model − X_exact = n_0^model − n_0^exact = N̄·p_0·q_0 − S(0),

and nothing else. DERIVED, then MEASURED: the residual split printed in §6
sums to exactly the n_0 gap at every level (@23: +25,287.24 − 28,379.29 =
−3,092.06 = S(0) − N̄p_0q_0). §7 of the held report notices that "what cancels
is the total" and reads it as an observation; it is an identity, and it is why
the m = 2 and m ≥ 3 residuals are equal and opposite to within the one number
the test actually measures.

Consequence for the headline: "the anchored joint law is the product of its own
marginals" is not what was tested. What was tested is
S(0) = N̄·P(ω_s(r) = 0)·P(ω_s(r+2) = 0), one cell.

**How much room the construction leaves.** Three bounds, in increasing
relevance:

- Fréchet–Hoeffding leaves enormous room (P(0,0) ∈ [0, 0.3366] at @23 against
  the product value 0.1133), so the observed agreement is not a measure-zero
  accident.
- The exact CRT/mutual-exclusion model — each scour prime strikes r with
  probability 1/q, strikes r+2 with probability 1/q, and cannot do both —
  already violates independence at the (0,0) cell by
  ∏(1−1/q)²/∏(1−2/q) − 1 = Σ_q 1/(q(q−2)) + O(·). MEASURED: **2.109%,
  1.708%, 1.386%, 1.088%, 0.882%** at @11..@23. This is the natural scale of
  dependence in this construction, and it decays like 1/(x ln x). The observed
  anchored dependence at the same cell is −2.025%, +0.426%, +0.300%, −0.285%,
  +0.518% — the **same order at every level**, 21% to 96% of the forced scale,
  and at @19 with the opposite sign. So the joint is not independent; it is
  dependent at, and bounded by, the scale the construction forces.
- The structural reason the residual dependence stays small, which §6 does not
  state: **P1, the only exact-zero mechanism in the file, is one-sided.** An
  aligned pattern with ∏Q > W contributes exactly 0 because the only multiple
  of ∏Q in [0, W) is 0 and 0 is not natal. A *mixed* pattern (d₁ | r,
  d₂ | r+2, d₁d₂ = ∏Q) has its solution in a residue class mod d₁d₂ that is
  not 0, so it contributes 0 or 1 and keeps its CRT mass W/∏Q on average. The
  truncation therefore lives entirely in the marginals by construction, and the
  joint has nothing of that size left to deviate by. DERIVED, and confirmed by
  the moment table: empirical T(i,j)/P(i,j) tracks the *untruncated*
  mutual-exclusion prediction C(i+j,i)e_{i+j}/(e_i e_j) to about 1%, and misses
  the *truncated* prediction by a factor of two or more (@19, (2,1): empirical
  0.979, untruncated 0.975, truncated 0.540).

**Reading.** Independence is not forced — the CRT model itself breaks it by
0.88% at @23 — but the room for dependence in the cell X can see is
a priori O(Σ_{q>x} q^{−2}) and vanishing, and the one large mechanism in the
file is one-sided and hence absorbed into the marginals by construction. "84%
of the m ≥ 3 gap follows from the cofactor law" is therefore bookkeeping over a
split (m = 2 versus m ≥ 3) that the identity of §3 makes arbitrary: the same
data gives "38% of the m = 2 gap" and "98.6% of the whole gap", and only the
last of the three is a statement about anything X measures.

## 4. [MEASURED] Probe (c): the residual is not in the tail

The −28,379.29 at @23, per cell, (k−1)·[anchored − independent]:

| k | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|
| (k−1)·[A−I] | −29,439.48 | +28,489.81 | −5,897.53 | −15,708.71 | −4,909.40 | −918.04 | +4.06 |

k = 7, 8, 9 carry **−5,823 of −28,379, i.e. 20.5%**. k = 3..6 carry 79.5%, and
do it through two cells of nearly ±29,000 that almost cancel. So the report's
INFERRED pointer — "if the origin-density mechanism exists, that is where to
look", meaning k = 7..9 — is aimed at the fifth of the residual. The cells with
the largest absolute misfit are k = 3 and k = 4, whose *ratios* (0.982, 1.014)
look excellent precisely because they are the biggest cells. A residual that is
79.5% bulk and 20.5% tail is a different object from "the model is good in the
bulk and bad in the tail".

Sign and size: reproduced exactly (it is the same model, re-derived). The
residual's total is not an independent measurement; by §3 it equals
S(0) − N̄p_0q_0 and nothing else.

## 5. [REFUTED — the refutation, not the candidate] Probe (d): fairness

TODO item X's candidate is *"anchored classes {0, −2} put multi-prime
coincidences at multiples of products, which are dense at the origin"*. §6
converts this to "dependence between the two strike orientations at the anchor"
and refutes it. Two things are wrong with the conversion.

**First, the literal mechanism is largely one-sided, and one-sided effects are
in the marginals by construction.** The exact-zero part (P1) applies to aligned
patterns only. So the mechanism's main term was moved into the marginals before
the test ran, and then the test declared the mechanism absent because what was
left over was small. That is not a refutation; it is the mechanism being scored
against a model that has already absorbed it.

**Second, the surviving joint part is measured, is present, and is in the
repo's own output.** At @17 the j = 3 census reads:

> ∏Q > W: obs = 3199, CRT = 4726.4, ratio **0.677**, vs P1 prediction (aligned
> share removed) **0.750**

so the mixed super-W triples sit at 0.677/0.750 = **0.903 of CRT**, a 9.7%
deficit that P1 does not explain and that no marginal can see, because for
mixed patterns each of d₁ and d₂ is separately far below W. That is exactly a
coincidence structure at multiples of products, and it is a joint effect. The
cofactor-range table at @23's j = 2 census shows the same fingerprint in the
extreme-cofactor corner (0.78 against 1.00 in the bulk).

**The precise steelman that survives.** *The anchored joint law is truncated at
∏Q > W beyond what its marginals are truncated at, by a factor measured at
0.903 on the mixed super-W triples at @17; this is a genuine dependence between
the two orientations, it lives at i + j ≥ 3, and it is invisible to X because X
depends on the joint only through the i = j = 0 cell.* Nothing in §6 touches
this, and §6's own tail ratios (0.938, 0.750) are its signature at @23.

The honest word for §6's finding is not REFUTED. It is: **the origin-density
mechanism does not reach X.** Which is what §7 of the held report says in its
last bullet, and which contradicts §6's own headline.

## 6. [MEASURED] Probe (e): the @11 anomaly and the "65× convergence"

The X-relative error factors exactly:

> X-relative error = (n_0-relative error) × (n_0/X)

| x | n_0 error | n_0/X | X error |
|---|---|---|---|
| 11 | −2.0247% | 1.6071 | −3.2540% |
| 13 | +0.4264% | 0.6792 | +0.2896% |
| 17 | +0.2997% | 0.2985 | +0.0895% |
| 19 | −0.2850% | 0.1622 | −0.0462% |
| 23 | +0.5175% | 0.0967 | +0.0503% |

The dilution factor n_0/X = S(0)/X(0) falls 16.6× from @11 to @23 for reasons
that have nothing to do with model quality: it is the overlap capacity growing,
which is the very thing this channel exists to measure. In log terms the
dilution supplies 67% of the reported 65×. **From @13 to @23 it supplies all of
it and more**: the reported X error improves 5.79× while the model's own error
gets 1.21× *worse*, and 7.02/1.21 = 5.80.

So the answer to probe (e) is neither of the two offered. The convergence is
not a structural small-W effect with a computable correction, and it is not a
warning that the model is only asymptotically right. It is a normalisation
artifact. The @11 figure needs no correction; it needs the other denominator,
and with it @11's −2.02% is only 4× the @23 figure of +0.52%, on a level with
N̄ = 90 natal slots and S(0) = 45.

There is a computable correction available for the *forced* part, and it is
worth stating: the mutual-exclusion baseline predicts the independent model
should overcount n_0 by +2.109% at @11, and it undercounts by −2.025%. The
gap of −4.1% is the roughness correlation between r and r+2 at a level where
the whole comb is 90 slots. INFERRED.

## 7. The honest restatement

What the run actually establishes, stated so that it can be defended:

> **[MEASURED] The anchored survivor deficit factors as the square of a
> one-sided deficit.** Write p₀ = #{r ∈ N : ω_s(r) = 0}/N̄ and q₀ the same for
> ω_s(r+2). Then S(0) = N̄·p₀·q₀·(1 + δ) with δ = −0.518% at @23, and the
> one-sided ratios against the CRT one-sided value ∏(1−1/q) are
>
> | x | p₀/∏(1−1/q) | q₀/∏(1−1/q) | product | β = S(0)/S_CRT |
> |---|---|---|---|---|
> | 11 | 1.03202 | 1.06531 | 1.09943 | 1.14581 |
> | 13 | 1.00809 | 0.98822 | 0.99622 | 1.00893 |
> | 17 | 0.97464 | 0.96921 | 0.94463 | 0.95486 |
> | 19 | 0.95626 | 0.95534 | 0.91355 | 0.92613 |
> | 23 | 0.94350 | 0.94311 | 0.88982 | 0.89305 |
>
> so β, the whole anchored-versus-CRT survivor deficit that
> `paper/anchored-note.md` §3 tabulates to @41, is the square of a single
> one-sided number, to 0.4% at @23. The one-sided number is the product
> truncation on ω_s alone, and part4's `p_nat·(Π_i + room_i)` law gives it in
> computable form once the missing i = 0 row (A = 1, room = π(W) − π(y)) is
> restored.
>
> **[MEASURED] The residual dependence between the two orientations is of the
> size the construction forces**, |δ| = 0.29% to 2.02% against a
> mutual-exclusion scale of 0.88% to 2.11%, and both scales decay like
> 1/(x ln x). **[DERIVED] The reason it stays that small is P1's one-sidedness**,
> not an absence of coincidence structure. **[MEASURED] Coincidence structure
> at multiples of products is present** at 0.903 of CRT on mixed super-W
> triples at @17.

That restatement keeps everything the run earned and drops the three
overstatements. It is also a better result than the one held: β squaring is a
statement about the quantity `anchored-note.md` §3 actually tracks, at ten
levels, whereas the X-channel version is a statement about one cell of one
spectrum at five.

## 8. What the identity gives Assumption A

Almost nothing, and the reason is arithmetic rather than judgement. Assumption
A lives in (X̄ − X(0))/S̄, and by the identity of §3 applied to both channels,
(X̄ − X(0))/S̄ = 1 − S(0)/S̄ − (M(0) − M̄)/S̄, where the M-drift term is
+0.0018 at @23, −0.0020 at @19 and +0.0141 at @17 (MEASURED: the five values of
1 − S(0)/S̄ are −0.1768, +0.0125, +0.1427, +0.2205, +0.2676 against the
published −0.2287, +0.0134, +0.1568, +0.2225, +0.2658). So Assumption A is, to
within one to five percent of itself, the statement S(0)/S̄ > ε: the anchored
survivor count is a positive fraction of the ensemble mean. The convolution
identity then says S(0) = N̄p₀q₀(1 + δ), and with the closed form for p₀ that
is S(0) ≈ p_nat²·π(W)²/N̄. That is the Hardy–Littlewood independence heuristic
for twins written in this file's notation. It is a good heuristic, it is now
measured to 0.5% at @23 with the dependence correction bounded by
Σ_{q>x} 1/(q(q−2)), and it is not a lower bound on anything, because π(W)
enters as an input. Assumption A gains a sharp *form* and no *leverage*.

## 9. What this pass did not reach

- **No @29.** The verification runs the same five levels; the instrument
  ceiling in §7 of the held report is not tested.
- **No σ_X, no z-scores.** Same gate as the producer: part0 is x ≤ 17. Whether
  the 0.518% dependence at @23 is large or small in ensemble-fluctuation units
  is not computed, at @23 or @19.
- **The mixed super-W deficit is measured only at @17**, from the file's own
  embedded j = 3 census. Its level trend, and whether 0.903 is drifting, needs
  part5(·,3) extended past x = 17, which the file gates off.
- **No proof that δ = O(Σ_{q>x} q^{−2}).** §3's third bullet is a derivation
  from P1's one-sidedness plus the observation that mixed patterns keep their
  CRT mass on average; the averaging is not controlled, and the sign flip at
  @19 is unexplained.
- **The M-drift term (M(0) − M̄)/S̄ is measured, not modelled.** It is the only
  part of Assumption A's statistic that the S(0)/S̄ reduction does not cover,
  and at @17 it is 9% of the statistic.
- **`research/OBSERVATIONS.md`, `paper/anchored-note.md` §10 and
  `research/moire-theorems.md` were not touched.** No live document carries any
  of this.

## 10. Files touched

- `research/history/staging/verify-cofactor-convolution.md`: this file. Nothing
  else in the repo was edited. Gate before and after: `node research/qc.js`
  TOTAL = 2, both `uncited-script` on `research/uframe-repro-01-fold-ladder.js`
  and `research/uframe-repro-02-maxgap-forensics.js`, pre-existing and
  unrelated.
