# f, the qualifying-gap fraction, decays: 42 exact points and the staircase

<!-- ledger
id: Q-f-census
status: PARTIAL
todo: none
question: What does the grain census law give for f, the qualifying-gap fraction, and where does it structurally stop?
verdict: DEFECT-carrying: every census point from x = 37 up is aliased, so the 42-point table above x = 31, both regressions, the factor 170 and the x = 1000 extrapolation must be re-read against the corrected law; the staircase theorem (treads are exactly the twin pairs), Lemma B, the comb coefficient and everything at x <= 31 are UNAFFECTED, and the growth law is a fit and not a theorem.
-->

*Parent: `research/U-FRAME.md` §12, which carries these claims in summary. Forty-two
exact census points, the proven staircase behind the scatter, and a growth law
that is a fit and not a theorem.*

*The forty-two census points, the staircase and the fitted law are all output of
`research/a3-03-f-from-census.js`, which derives f directly from the exact
census. U-FRAME summarises them; it does not compute them.*

> **DEFECT, 2026-08-19 (`history/staging/fdecay-deep.md`): the producer's
> evaluator aliases residues for primes above 32 (JavaScript's `<<` takes
> shift counts mod 32), so every census point from x = 37 up is wrong by a
> factor 0.62–1.05, and everything in this file FITTED to those points — the
> 42-point table above x = 31, both regressions, the halves, the factor of
> 170, and the x = 1000 extrapolation (f ≈ 2.3e−12, L ≈ 35.5, band
> 30.8–42.9) — must be re-read against the alias-free recomputation embedded
> in `research/fdecay-deep-01-census-defect.js` (all 42 levels, two
> independent methods agreeing to 1.74σ). The corrected law over 51 window
> levels is ln(1/f) = 1.917 + 1.4016(±0.0235)·(2p/m̄) − 1.021·ln s(d_min),
> R² 0.9867; the corrected factor from x = 11 to x = 199 is LARGER than 170,
> and the range dependence of the threshold slope survives (1.588 on
> x ≤ 199 vs 1.280 on x ≥ 211). UNAFFECTED: the staircase theorem, Lemma B,
> the comb coefficient (−1.030 corrected vs −1.038), everything at x ≤ 31,
> and U-FRAME §12's polylog branch call (corrected
> ln L = −1.861 + 2.864·lnln x against the published −1.884 + 2.892).
> Regenerating this file's table awaits the producer's multi-word-mask fix,
> queued; do not quote an x ≥ 37 point from below without the correction.**

f is the fraction of gaps ≡ 0, ±2 (mod p), the quantity that governs L through
roughly L ≈ ln D/ln(1/f) (U-FRAME §5a step 6). U-FRAME §5a step 7 measures it on
the seven diagonal points that come from tiles; this note is what the grain
census law
adds, which is 42 exact points with no tile ever built, the arithmetic behind the
scatter, and the proven reason the diagonal is a staircase.

### What the census law reaches, and what it structurally cannot (PROVEN)

*Lemma B.* A prime q rescales the strata for d only if 2q − 2 > d. On the
diagonal d = 2p ∓ 2 by the closed form of `research/kappa-not-L.md`, so q is safe
only if q > p, while every
prime of the tile has q ≤ x < p. Counted over every diagonal fold p ≤ 200, **the
number of safe primes inside the tile is zero.**

**The structural negative, and it is a clean one.** The grain census law has an
expensive half, the raw pruned inclusion-exclusion, which does reach d ≈ 2p
exactly; and a cheap half, the fold covariance S_m → S_m(q − 2m), which does not.
Lemma B says the cheap half is not merely unhelpful but structurally
unavailable: **the same lemma that places d_min at 2p ∓ 2 is what makes every
prime of the tile unsafe for it.** Cost is then 1.33^(d/6) with d_min/6 ≈ p/3, so
exp(0.048p): reach x ≈ 200 (x = 199 costs 299 s), while x = 1000 would need
count(2016), about 4·10⁴¹ terms. Out of reach by this method and by any
constant-factor improvement. What is uncontrolled is exactly count_x(d) for d of
order 2p, with no closed form and no saddle point.

**Verification, and a cross-agent check.** The law reproduces every gap size at
T₇ to T₂₃ against direct sieving (worst 4.2e−10, double roundoff), the five
published diagonal values to about 1e−16, and independently **A2's two streamed
points to four figures**. Two agents, two unrelated methods, same numbers.

### f decays, on 42 exact points

The diagonal went from 5 points to **42**, x = 11 to 199, with no tile ever built
(T₁₉₉ has about 10⁸⁰ gaps and never will be). f falls from 4.444e−2 at x = 11 to
2.653e−4 at x = 199, a factor of 170. That is the polylog branch, the one the
route needs (U-FRAME §5a step 7). It is the branch, not the route.

- ln(1/f) = 1.001 + 1.451·(2p/m̄), R² = 0.902; the ratio ln(1/f)/(2p/m̄) by
  quarters reads 1.83, 1.80, 1.74, 1.58, drifting slowly rather than collapsing.
- Downstream: ln L = −1.884 + 2.892·lnln x, R² = 0.972. **Polylog.**

The slope is not the same as the seven-point tile fit of U-FRAME §5a step 7,
which gives 1.06 with R² 0.730 over 2p/m̄ ∈ [1.52, 2.30]. **The two are not two
measurements. The seven tile points ARE the first seven of these 42, carrying the
same f**, agreed by three independent routes: the tile enumeration, the census
and the transfer operator, to 1e−16 on the five enumerable folds and to a3-02's
three-figure print precision on all seven. So restricting the 42 to the tile x
values and refitting returns 1.062 by construction, and there is nothing here for
the two to disagree about.

What separates the numbers is sample size and range, not method, and the
difference **is not statistically detectable**: the seven-point slope carries
SE 0.289 and a 95% interval of [0.319, 1.805], which contains 1.451 and contains
1 as well. Adding just two more points moves 1.062 to 1.881. The 1.06 is a
small-sample reading, not a competing estimate.

Two earlier explanations of the difference are withdrawn as wrong. The comb
correction is not the reason: comb-correcting the seven moves them to 1.161,
away from 1.451 rather than toward it. Truncation past the first qualifying gap
is not the reason either: refitting on the first term alone moves the 42-point
slope only from 1.450 to 1.436.

**What is real is that the coefficient is range-dependent under every
specification tried**, which is stronger than the old "neither pins the exponent".
The raw halves give 1.695 against 0.906 (t = 2.92), a quadratic term is
significant (t = −2.68), and even comb-corrected the threshold coefficient runs
1.866 against 1.115 between halves (t = 5.21). No specification yields a stable
slope, so none of 1.06, 1.45 or anything between should be quoted as "the" slope
of this law. The comb coefficient itself survives: it is −1 to within the fit in
both halves.

**And the scatter is arithmetic, which resolves A2's puzzle.** A2 found f
non-monotone and could not say why. The answer is a singular-series comb on the
minimal qualifying gap, s(d) = Π ρ_q(d)/(q−4). Adding ln s gives
ln(1/f) = 1.529 + 1.482·(2p/m̄) − 1.025·ln s(d_min) with R² = 0.964, the
coefficient being −1 to within the fit, so **f ∝ s(d_min)·exp(−1.482·2p/m̄)**.
That is why x = 181 (d_min = 384, s = 1) has f = 5.7e−5 while x = 199
(d_min = 420 = 2²·3·5·7, s = 6.10) has f = 2.7e−4 at a LARGER p.

Extrapolating with that closed form, calibrated (it predicts 8.13e−4 at x = 100
against the exact 8.14e−4 at x = 101): at x = 1000, f ≈ 2.3e−12,
ln(1/f) ≈ 26.8, L ≈ 35.5 against ln²x = 47.7. **The 35.5 carries a hidden band
and must not be quoted bare**: because the threshold coefficient is
range-dependent, re-anchoring the same form on either half of the measured range
puts L at x = 1000 anywhere between **30.8 and 42.9**. The branch call is safe
either way, since the whole band stays under ln²x = 47.7, but the margin at the
top of the band is a quarter of what the point estimate suggests.

> **[UNTRACED — verify before quoting]** (2026-08-20, mismatch adjudication
> #35). The band 30.8–42.9, and the point estimate 35.5 it brackets, have no
> script custody anywhere in the corpus: no embedded OUTPUT prints either, and
> the half-range re-anchoring behind the band was done in this document. The
> figures are quoted onward by `research/a3-03-f-from-census.js` reading 7,
> which names this document as their home and is correct to do so — but that
> makes this the only witness, and one document is not custody. What survives
> without them: the branch call, since the whole band's top stays under
> ln²x = 47.7. Reproducing them means refitting
> ln(1/f) = a + b(2p/m̄) − c·ln s(d_min) on each half of the measured census
> range and extrapolating each to x = 1000, into a script with an embedded
> block.


### The diagonal is a staircase, and its treads are the twin pairs (PROVEN)

This is the second half of the scatter, and it explains the stalls A2 and A3 both
flagged without explaining. A twin lower member p > 3 always satisfies
p ≡ 2 (mod 3), since p ≡ 1 would make p + 2 divisible by 3. So by the closed form
of `research/kappa-not-L.md` the smallest qualifying gap is d_min(p) = 2p + 2,
while for its partner
d_min(p+2) = 2(p+2) − 2 = 2p + 2. **The two are identical, both equal to 2(p+1),
twice the number sitting between the twins.** VERIFIED at all 18 twin pairs below
300, no exceptions.

Consequence: the qualifying threshold does not advance across a twin fold, so f
is flat there and falls only at non-twin steps. **The diagonal is a staircase
whose treads are exactly the twin pairs.** That is why f steps back up at T₂₉ (29
and 31 are twins, both giving d_min = 60) and why 17 and 19 shared d_min = 36.
The apparent non-monotonicity was never noise; it is the twin structure of the
folding primes showing through, on top of the singular-series comb on d_min.

### Caveats, kept visible

The growth law is a fit over 42 exact points, not a theorem, and the threshold
exponent is 0.871 rather than 1. Truncation beyond the first qualifying gap is
bounded empirically (the first term is 98% of f at the median) but **not proven**
bounded, since the pair-count majorant does not decay in d, which is the same gap
Lemma B names. And any Σ L·m̄ column inherits the refutation of U-FRAME §5a
step 4. What this note settles is the f layer, which was the question asked.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
