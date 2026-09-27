# f out of sample: the 42-point census is corrupted from x = 37, and the decay law survives the correction

<!-- ledger
id: Q-fdecay-deep
status: ANSWERED
todo: none
question: Does the fitted f decay law hold out of sample at deep levels?
verdict: It holds as a band, nine of nine deep levels inside the four-specification band, but the residual trends against the central specification at t = -7.08; the test also found what it was not looking for, that the 42-point exact census is wrong from x = 37 upward by a factor rising to 1.63 at x = 199, from a 32-bit shift alias.
-->

**Verdict, before anything else. The pre-registered test was whether
`f-decays.md`'s fitted decay law holds out of sample. It does, as a band: nine of
nine deep levels land inside the four-specification band, and the residual
trends against the central specification at t = −7.08. But the test found
something it was not looking for. The 42 exact census points that the law is
fitted to are wrong from x = 37 upward, by a factor rising to 1.63 at x = 199,
because the evaluator carries the avoided residue set in a 32-bit word and
`1 << r` in JavaScript uses r mod 32. Every level the census ever verified is
below 32. The correction moves the threshold coefficient by 0.11, leaves the
comb coefficient and the polylog branch call untouched, and moves the projected
crossings down rather than up.**

*2026-08-19. Pre-registration:
[fdecay-deep-prereg.md](fdecay-deep-prereg.md), written and committed alone
(`705c839`, message `prereg: fdecay-deep`) before any producer for this pass
existed on disk. Producers, all formally embedded:
[`../../fdecay-deep-00-core.js`](../../fdecay-deep-00-core.js) (the segmented
window instrument, a library),
[`../../fdecay-deep-01-census-defect.js`](../../fdecay-deep-01-census-defect.js)
(2209.2 s, `out-sha256 4d932d02`),
[`../../fdecay-deep-02-window.js`](../../fdecay-deep-02-window.js) (140.8 s,
`out-sha256 6da42b1e`),
[`../../fdecay-deep-03-ladder.js`](../../fdecay-deep-03-ladder.js) (1325.5 s,
`out-sha256 0825440d`) and
[`../../fdecay-deep-04-crossings.js`](../../fdecay-deep-04-crossings.js) (6.5 s,
`out-sha256 45336f9e`). Legend as in `research/sift-limit-attack.md`:
**[PROVEN]**, **[VERIFIED]**, **[MEASURED]**, **[CITED]**. No live document was
edited by this pass; §8 lists the proposed edits and none is applied.*

---

## 0. What was asked, and what the instrument is

`research/f-decays.md` fits a decay law for f, the qualifying-gap fraction, on 42
exact census points from `research/a3-03-f-from-census.js`. U-FRAME §12's polylog
call, `history/staging/import-sofic.md` §6's projected crossings at x = 773 and
x = 2297, and `research/gate-multiplies.md` §8's p ~ 800 turnaround all read that
law far outside its range. The census method's cost is exp(0.048 p) and stops at
x ≈ 200, so the law had never been shot at out of sample.

**The instrument.** For level x with fold p = nextprime(x), inside a window
[0, X): count the gaps between consecutive x-rough twin slots that are
≡ 0, ±2 (mod p). The sieve is segmented on the lattice n ≡ 5 (mod 6), memory is
the segment and not X, and one sieve serves every level of the ladder at once
because level x is exactly { n : min{q ≥ 5 : q | n(n+2)} > x }. That is the
`research/LOCALIZED-GAP.md` §10 lever applied to a tail functional.

**Two calibrations, both fixed in the pre-registration and both load-bearing.**

1. **`f_win` is an ESTIMATE of the tile ratio, not the tile ratio.** The census f
   is an exact ratio over the whole period x#; this is the same ratio over a
   window. §2 measures the substitution error directly.
2. **`L_win` is a PROVEN lower bound on the tile L at the same fold, and nothing
   more.** A legal class word over ℓ consecutive slots fixes a residue a with all
   ℓ slots in {a, a−2} mod p; copy k ≡ −a·w⁻¹ (mod p) of the full period deletes
   exactly that class pair (U-FRAME §5a step 1, w = x# mod p invertible), so an
   adjacent-kill run of length ℓ exists in the period. The window holds X/m̄ slots
   against the period's p·D, so L_win reads the same first-moment law at a far
   smaller sample size.

---

## 1. The defect

> **The census law's evaluator carries A_q, the set of residues mod q avoided by
> the current offset set, as a single 32-bit mask:**
>
>     a[j] = (1 << (((-o) % q + q) % q)) | (1 << (((-o - 2) % q + q) % q));
>
> **JavaScript takes the shift count of `<<` modulo 32. For any prime q > 32 the
> residues r and r + 32 share a bit, |A_q| is read off as the popcount of an
> aliased mask, and every factor (q − |A_q|) in the product is wrong whenever two
> avoided residues of that prime sit 32 apart. T_x carries a prime above 32 iff
> x ≥ 37.** [PROVEN as a statement about the code; VERIFIED as a prediction]

The prediction was written down before the table was read and it is exact.
Rerunning the published evaluator byte for byte against an alias-free one that
uses ⌈q/32⌉ words per prime and the identical pruning rule
(`fdecay-deep-01-census-defect.js` §2):

| levels | alias-free / published |
|---|---|
| x ≤ 31, seven levels | **[1.000000, 1.000000]** — identical, bit for bit |
| x ≥ 37, thirty-four levels rerun | **[0.62474, 1.04904]** |

Not a drift, not a fitted boundary: a step at one value of x.

**The rerun is the same code.** The copied published evaluator reproduces the
census's own OUTPUT §4b first-term column at every spot check: 4.0404e−2 at
x = 13, 2.7628e−2 at x = 19, 3.6402e−2 at x = 29, 7.1991e−3 at x = 37,
1.2776e−2 at x = 47, 6.4434e−4 at x = 67, 3.9724e−3 at x = 79. So the
disagreement is between two evaluators and not between two runs.

**And a method with no inclusion-exclusion in it agrees with the alias-free
one.** Over 42 levels the segmented window sieve sits within **1.74 σ** of the
alias-free evaluator at worst. Against the published one, over the 35 levels
x ≥ 37, the worst deviation is **27.0 σ**.

The error grows with depth, which is why it matters: the ratio runs 1.03324 at
x = 37, 0.93386 at x = 101, 0.74291 at x = 139 and **0.61323 at x = 199**, where
the published 2.6530e−4 becomes **1.62689e−4**. In ln(1/f) that is a shift of
**+0.4890** at x = 199 and +0.0000 at every level x ≤ 31.

**Why nothing caught it.** Every verification the census ran lives at x ≤ 31:
T₇ to T₂₃ against direct sieving (worst 4.17e−10), the five published diagonal
points (to 1e−16), and A2's independently streamed T₂₉ and T₃₁ (four figures).
All of them pass. All of them are inside the region where every prime of the tile
is below 32. The check that would have caught it is a second evaluator, or a
second method, at one level above 37, and neither existed until this pass.

---

## 2. The instrument, validated

Four checks were fixed in the pre-registration §3 and one report was required in
§4. `fdecay-deep-02-window.js` runs them.

- **V2, head bias: PASSES by three orders of margin.** The window slot density
  reproduces the exact tile mean gap to **4.98e−4** at worst, against a criterion
  of 0.01. At x = 11 the agreement is 7.56e−9.
- **V3, the single-copy kill run: PASSES, 42 of 42 levels**, against
  `attack-foldL-04-localized.js`'s embedded L column at the same X = 2e9. That
  script reads the same object through a min-prime key array, a linked list and
  bucketed deletions, and shares no line of code with this sieve. Its slot count
  at the level folded by 211 is 28,510,623 and this run's is **28,510,623**.
- **V4, the comb:** first-term share 83.33 % worst and 99.63 % median over the 38
  levels where the window sees more than one tooth, against the published 83.33 %
  and 98.08 % over 18 rows.
- **§4, window-size sensitivity: no drift.** Worst over all 42 levels is
  **3.01 σ** between the first decade with K ≥ 100 and the last. At x = 37 the
  four decades read 8.087e−3, 7.821e−3, 7.736e−3, 7.745e−3.
- **The prefix is not a biased window.** Against eight uniformly random offsets
  of the period — Z mod q drawn independently for every q, which by CRT is a
  uniform Z mod x# — the prefix ratio is 0.9824 at x = 101, 0.9841 at x = 151 and
  0.9110 at x = 199. The last rests on K = 506, so the combined standard error is
  about five per cent and 0.9110 is 1.8 of them.

**V1, agreement with the published census, is the check that fails, and §1 is
why.** It is replaced by agreement with the alias-free evaluator, which is the
stronger check because it is arithmetic against empirical.

---

## 3. How deep it reached, and what it cost

**x = 829, four times deeper than the census method's x ≈ 200 wall**
[MEASURED]. At X = 1e11 the deepest level with a usable count is x = 503
(K = 332); x = 547 and x = 601 carry K = 26 and K = 25; x = 653 carries 9,
x = 701 carries 2, x = 773 and x = 829 carry 1 each, and x = 907 sees nothing.
The whole ladder is **1325.5 s**, against 421.3 s for the published census's 42
points. Three decades of x for three times the time.

Pre-registered prediction **R1 put the wall at x ≈ 600 with 30 or more
qualifying gaps. Measured: K = 26 at x = 547 and K = 25 at x = 601. R1 is right
to within one level.** The wall is not the sieve: it is that f is a tail
functional and never sees a gap below d_min = 2p ∓ 2, so a level is measurable
only once (X/m̄)·f is of order ten.

---

## 4. The pre-registration, scored

| registered | outcome |
|---|---|
| **R1** wall at x ≈ 600 | **HOLDS** — K = 25 at x = 601, K = 1 at x = 829 |
| **R2** no window-size drift once K ≥ 100 | **HOLDS** — worst 3.01 σ over 42 levels |
| **R3** every deep level inside the band, mean residual negative, \|mean\| ≤ 3 | **HOLDS** — 9 of 9 inside, mean residual **−0.553** |
| **R4** residual trend on ln x negative with \|t\| < 3 | **FAILS on size, holds on sign** — slope −1.114 ± 0.157, **t = −7.08** |
| **R5** form-1 crossings in [400, 1100] and [900, 3000] | **HOLDS** — **719** and **1801** |
| **R6** L_win falsifies nothing | **HOLDS** — L_win = 2 from x = 97 to x = 829, 4 at worst below |
| **R7** form-2 crossings in [300, 700] and [700, 2200] | **HALF FAILS** — **271** and **839**; 271 is below the registered floor |

**R4 is the finding.** The published fit over-states the decay, and it over-states
it more the deeper you go: the residual against the central specification falls
from +0.043 at x = 211 to −1.227 at x = 601. Every projection built on the
published coefficients is optimistic about how fast f falls, and the size of the
optimism grows with the level being projected to.

---

## 5. The corrected law

**On first terms throughout, so the two columns are comparable**
(`fdecay-deep-01-census-defect.js` §4, 42 levels):

| | published points | corrected points |
|---|---|---|
| threshold only | 1.073 + 1.4357·T, R² 0.8999 | **0.792 + 1.5425(±0.0724)·T, R² 0.9191** |
| with the comb | 1.609 + 1.4675·T − 1.038·S, R² 0.9646 | **1.323 + 1.5741(±0.0405)·T − 1.030·S, R² 0.9754** |
| halves | 1.662 and 0.906 | **1.675 and 1.109** |
| downstream | ln L = −1.937 + 2.926·lnln x, R² 0.9728 | **−1.861 + 2.864(±0.075)·lnln x, R² 0.9732** |

**On the 51 window-measured levels with K ≥ 10, x = 11 to 601**
(`fdecay-deep-03-ladder.js` §4):

> **ln(1/f) = 1.917 + 1.4016(±0.0235)·(2p/m̄) − 1.021·ln s(d_min), R² 0.9867**

against the published 1.529 + 1.482·T − 1.025·S at R² 0.9639. The threshold
coefficient reads 1.5875 on x ≤ 199 and **1.2799 on x ≥ 211**, and 1.8385 on the
lower half against 1.2933 on the upper.

**Three things survive the correction unchanged, and they are the three that
matter for the branch.**

1. **The comb coefficient is −1 to within the fit** on the corrected points as on
   the defective ones: −1.030 against −1.038, and −1.021 on the window points.
   `f-decays.md`'s singular-series reading, f ∝ s(d_min)·exp(−c·2p/m̄), stands.
2. **The polylog branch call stands.** ln L_indep = −1.861 + 2.864 ± 0.075 on the
   corrected census points and −1.827 + 2.844 ± 0.058 on the window points,
   against the published −1.884 + 2.892. The exponent does not move outside its
   own error. **U-FRAME §12's branch call is not what the defect touches.**
3. **The range dependence is real on both sides.** It is smaller after the
   correction — the upper half moves from 0.906 to 1.109 — but it is still there,
   now across a range three times wider. No single slope should be quoted, which
   is what `f-decays.md` already says.

**What does move is the size of f, and therefore the level of every crossing.**

---

## 6. The crossings, recomputed

Two forms, both fed the same measured f
(`fdecay-deep-04-crossings.js`, seven specifications):

- **form 1**, `f-decays` / U-FRAME §5a step 6: `L = ln D / ln(1/f)`
- **form 2**, `import-sofic.md` §4's estimator C, the only one that record found
  flat: `L̂ = [1 + ln(2D)/ln(2/f)] / 1.4965`

| | 0.31·p/ln p | 0.19·p/ln p |
|---|---|---|
| form 1, all measured points | **719** | **1801** |
| form 1, spread over seven fits | 509 to 757 | 1201 to 2039 |
| form 2, all measured points | **271** | **839** |
| form 2, spread over seven fits | 211 to 271 | 547 to 929 |
| **published projection [CITED]** | 773 | 2297 |

**The sofic record's headline is confirmed and moved slightly earlier.** Its 773
and 2297 sit just above the form-1 spread, so the reading that survives is a
range with the published pair at its optimistic edge. This matters because the
projection was made from coefficients fitted to the defective table, and the
correction happened to push in the route's favour.

**A pointer finding, recorded in the pre-registration before any measurement.**
The exact numbers 773 and 2297 are not reproducible from `f-decays.md`'s
published coefficients under any of five variants tried: the stays-below level
for 0.31 is 479, 509, 661, 691 or 937 depending on specification, and for 0.19 it
is 1171, 1307, 1657, 1699 or 2521. **They should be quoted as a range, not as a
pair.**

**The two forms disagree by a factor of two to three in x, and the disagreement
is the estimator, not the data.** Both are fed the same measured f. Which form is
right is `import-sofic.md`'s open question, and it is now the largest single
uncertainty in the crossing level.

**The deepest fit is the least favourable.** The out-of-sample-only fit, x ≥ 211
with nine levels and R² 0.9974, crosses at 757 and 2039 — later than every other
specification. That is the direction that costs the route.

---

## 7. The direct L points

**L_win = 2 at every level from x = 97 to x = 829**, and 1 at x = 907. Below that
it reaches 4, at x = 29 and x = 31, and never more. Against a requirement of 6.78
at x = 97 and 38.63 at x = 829, the ratio L_win/(0.31·p/ln p) falls from 1.319 at
x = 19 to 0.052 at x = 829. **R6 holds: the window lower bound falsifies nothing.**

Two things it does say.

1. **The graph's first-moment law predicts the measured window L to within a
   fraction of an integer at every deep level.** With the measured letter
   measure, `1 + ln(2N)/ln(2/f)` reads 2.92 at x = 211, 2.37 at x = 503 and 2.00
   at x = 773, against a measured L_win of 2 throughout. The machinery
   `import-sofic.md` validated on nine folds at p ≤ 37 still works at p = 787, at
   a sample size fourteen orders of magnitude below the period's.
2. **The requirement is already violated at the bottom of the ladder.** The ratio
   reaches or passes 1 at x = 11, 13, 17 and 19, reading 1.273, 1.075, 1.000 and
   1.319 — levels where the requirement is 1.57 to 2.27 and an integer L of 2 or
   3 clears it by arithmetic. From x = 23 up the ratio never reaches 1 again.

**Why a window L cannot decide the question, stated so nobody re-runs it deeper.**
L_win ≈ 1 + ln(2X/m̄)/ln(2/f) reads about ln 2e9 ≈ 21 in the numerator where the
period reads ln(2pD) ≈ 200 to 740. Closing that gap by window length alone means
raising X by a factor of e^500. **The window measures f, not L, and the f it
measures is the thing L depends on.**

---

## 8. Proposed edits, none made

1. **`research/a3-03-f-from-census.js`.** The evaluator's `bitsOf` must carry
   ⌈q/32⌉ words per prime, or the avoided-set size as an integer. The embedded
   OUTPUT is defective from x = 37 and must be regenerated after the fix; the
   alias-free evaluator in `fdecay-deep-01-census-defect.js` is a drop-in with
   identical leaf counts and no measured slowdown. §1's Lemma A, §2's
   verification against direct sieving, §3's five diagonal points and §6's
   Lemma B are all unaffected.
2. **`research/f-decays.md`.** The 42-point table, both regressions, the halves,
   the "factor of 170", the x = 1000 extrapolation (f ≈ 2.3e−12, L ≈ 35.5, band
   30.8 to 42.9) and the x = 181 against x = 199 comb example are all fitted to or
   quoted from the defective points and need regenerating. **The staircase
   theorem, Lemma B, and the comb coefficient of −1 are unaffected**, and should
   be marked as such so the correction does not read as a wider retraction than
   it is.
3. **`research/U-FRAME.md` §12** carries "f falls by a factor of 170 over that
   range" — the corrected factor is larger. **§5a step 7's seven-row table is
   entirely at x ≤ 31 and is unaffected**, which is worth stating in the same
   edit.
4. **`history/staging/import-sofic.md` §5 and §6.** The factor of 170 and the
   projected 773 / 2297 both come from the defective fit. §6's conclusion
   survives; its two numbers should become the form-1 range 719 (509 to 757) and
   1801 (1201 to 2039), with the form-2 alternative 271 and 839 recorded beside
   them as the estimator-C reading.
5. **`research/LOCALIZED-GAP.md` §10** gains the observation that the lever
   reaches tail functionals as well as merge quantities, at a cost set by
   (X/m̄)·f rather than by the sieve: x = 829 in 1325.5 s here.
6. **A campaign-lessons row.** Every check of the census lived below the level
   where the defect can occur, and the defect was found by an instrument with no
   code in common. "Verify at a level where the mechanism you are worried about
   can actually fire" is the rule, and this pass is the case that pays for it.

---

## 9. NOT REACHED

- **No bound is proved, in either direction.** Every crossing here is a fitted
  law read outside its range.
- **No level above x = 503 carries a usable count.** x = 547 to 829 rest on 1 to
  26 events and are quoted with their K throughout.
- **The census was not regenerated.** Only count(d_min)/D was recomputed
  alias-free, at 42 levels; the later comb teeth were not, and the corrected
  full f is therefore a first-term value where the published one was too.
- **The tile L was not computed at any level**, only its window lower bound and
  the first-moment estimate.
- **No prior-art search was run**, and none of the fits here has been checked for
  a published analogue.
- **The 1.4965 of form 2 is measured on nine folds at p ≤ 37** and carried to
  p = 600 without justification. That transfer is exactly the kind this corpus
  refuses elsewhere, and it is the reason form 1 and form 2 disagree.
