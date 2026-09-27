# Pre-registration: f out of sample, by segmented window, and a direct L point

<!-- ledger
id: Q-fdecay-out-of-sample
status: OPEN
todo: none
question: Does the 42-point decay law for f, the qualifying-gap fraction, survive out of sample, given that every downstream reading extrapolates it three to thirty times past its range?
verdict: Pre-registration only, written before any producer for the pass exists on disk: four specifications are refit on the 42 exact census points as a transcription check and their projections are frozen, and nothing here is measured.
-->

*Written 2026-08-19, BEFORE any producer for this pass exists on disk. Nothing
below is measured; every number is a projection from coefficients that are
already embedded elsewhere. The producers are `research/fdecay-deep-*.js` and the
record will be `research/history/staging/fdecay-deep.md`.*

The question. `research/f-decays.md` fits a decay law for f, the qualifying-gap
fraction, on 42 EXACT census points, x = 11 to 199
(`research/a3-03-f-from-census.js`, embedded OUTPUT). Every downstream reading in
the branch — U-FRAME §12's polylog call, `history/staging/import-sofic.md` §6's
projected crossings at x = 773 and x = 2297, `research/gate-multiplies.md` §8's
p ~ 800 turnaround — is that law extrapolated three to thirty times past its
range. The law has never been shot at out of sample, because the census method's
cost is exp(0.048p) and stops at x ≈ 200 (f-decays, Lemma B). This pass tries a
different instrument that has a different wall.

---

## 1. The instrument, and exactly what it measures

**Object measured.** For level x with fold p = nextprime(x), inside a window
[0, X):

- `f_win(x, X)` = (number of gaps between consecutive x-rough twin slots in
  [0, X) that are ≡ 0, ±2 mod p) / (number of such gaps).
- `L_win(x, X)` = the longest run of consecutive x-rough twin slots in [0, X)
  whose gap-class word is accepted by the Alternation Lemma's two-state graph
  (`history/staging/import-sofic.md` §1: from state Z the legal letters are
  0 and −2, from state M they are 0 and +2), maximised over both start states.

**Calibration, stated before any number exists.**

1. **`f_win` is an ESTIMATE of the tile quantity, not the tile quantity.** The
   census f is an exact ratio over the whole period x#. `f_win` is the same ratio
   over a prefix [0, X) with X ≪ x#. It is subject to sampling error and to
   whatever head bias the prefix carries. The whole of §3 below is the
   calibration of that difference, and §4's window-size sensitivity is reported
   for every level whether it is flattering or not.
2. **`L_win` is a PROVEN lower bound on the tile L at the same fold**, given the
   graph identification. A legal class word over ℓ consecutive slots of the
   prefix fixes a residue a with those ℓ slots all in {a, a−2} mod p; the copy
   k ≡ −a·w^{-1} (mod p) of the full period deletes exactly that pair of classes
   (U-FRAME §5a step 1), so an adjacent-kill run of length ℓ exists in the full
   period. Hence `L_win ≤ L`. It is a lower bound and nothing more: the prefix
   holds X/m̄ slots against the period's p·D, so `L_win` is expected to sit far
   below L, by the ratio of the two logarithms.
3. **Nothing here is a bound on anything.** Every projection is a fitted law
   outside its range.

**Cost model, registered so the reach claim can be scored.** One streaming
segmented sieve of [0, X) on the lattice n ≡ 5 (mod 6), striking n ≡ 0 and
n ≡ −2 (mod q) for 5 ≤ q ≤ x_max, is 2·(X/6)·Σ_{5≤q≤x_max} 1/q strike attempts
plus X/6 reads, and its memory is the segment, not X. This is the compute lever
recorded in `research/LOCALIZED-GAP.md` §10 (820 folds to x = 6323 in 27 s for
merge quantities). The registered prediction is that **f costs far more than
merge quantities do**, because f is a tail functional: it never sees a gap below
d_min = 2p ∓ 2 (f-decays, Lemma A), so a level is only measurable once
(X/m̄)·f is of order 10 or more.

Registered reach, from the projected f of §2:

| level x | m̄ | projected f | X for ~30 qualifying gaps | strike attempts |
|---|---|---|---|---|
| 211 | 70.8 | 2.4e−5 | 8.7e7 | 3.3e7 |
| 307 | 80.2 | 2.7e−6 | 8.8e8 | 3.5e8 |
| 401 | 87.8 | 3.0e−7 | 8.8e9 | 3.6e9 |
| 503 | 94.7 | 1.3e−7 | 2.2e10 | 9.5e9 |
| 601 | 99.5 | 7.3e−9 | 4.1e11 | 1.8e11 |
| 773 | 107.7 | 1.8e−10 | 1.8e13 | 8.1e12 |
| 1009 | 115.8 | 4.1e−12 | 8.4e14 | 3.8e14 |

**Registered prediction R1: the wall of this instrument is at x ≈ 600, three
times deeper than the census method's x ≈ 200 and a decade short of the level
where the crossing question is decided.** If the run reaches past x = 700 with
30 or more qualifying gaps, R1 is wrong and the pass over-delivered.

---

## 2. The predictions, from the 42-point fit's own coefficients

Four specifications, all refit here on the 42 CITED (x, f) pairs from
`a3-03-f-from-census.js`'s embedded OUTPUT §5, and all reproducing the published
coefficients as a transcription check:

| spec | form | published | refit here |
|---|---|---|---|
| A-full | ln(1/f) = a + b·(2p/m̄) | 1.001 + 1.451·T, R² 0.9020 | 1.0006 + 1.4506·T, R² 0.9020 |
| B-comb | + c·ln s(d_min) | 1.529 + 1.482·T − 1.025·S, R² 0.9639 | 1.5294 + 1.4819·T − 1.0251·S, R² 0.9639 |
| B-lower | B on the first 21 points | — | 0.5390 + 1.8656·T − 1.0590·S, R² 0.9170 |
| B-upper | B on the last 21 points | (A-upper 3.748 + 0.906·T, R² 0.5684 — reproduced) | 3.3143 + 1.1148·T − 0.9910·S, R² 0.9660 |

**B-comb is the central prediction** (it is the specification f-decays calibrates
and extrapolates with). **The band is [min, max] over all four specifications**,
which is this pass's honest reading of f-decays' own "the coefficient is
range-dependent under every specification tried".

T = 2p/m̄ and S = ln s(d_min) are both exact closed forms, computed here, not
fitted.

| x | p | 2p/m̄ | ln s | ln(1/f) central | ln(1/f) band | f central | L = lnD/ln(1/f) | L band | 0.31p/ln p | 0.19p/ln p |
|---|---|---|---|---|---|---|---|---|---|---|
| 101 | 103 | 3.866 | 0.153 | 7.10 | 6.61 – 7.59 | 8.23e−4 | 11.88 | 11.1 – 12.8 | 6.89 | 4.22 |
| 151 | 157 | 5.011 | 0.930 | 8.00 | 7.98 – 8.90 | 3.35e−4 | 16.56 | 14.9 – 16.6 | 9.63 | 5.90 |
| 199 | 211 | 6.019 | 1.808 | 8.60 | 8.23 – 9.85 | 1.85e−4 | 21.44 | 18.7 – 22.4 | 12.22 | 7.49 |
| 211 | 223 | 6.301 | 0.238 | 10.62 | 10.10 – 12.04 | 2.44e−5 | 17.85 | 15.8 – 18.8 | 12.78 | 7.84 |
| 251 | 257 | 6.839 | 0.368 | 11.29 | 10.57 – 12.91 | 1.25e−5 | 20.18 | 17.6 – 21.5 | 14.36 | 8.80 |
| 307 | 311 | 7.753 | 0.201 | 12.81 | 11.76 – 14.79 | 2.72e−6 | 21.72 | 18.8 – 23.7 | 16.80 | 10.29 |
| 353 | 359 | 8.527 | 1.163 | 12.97 | 11.67 – 15.21 | 2.32e−6 | 25.03 | 21.3 – 27.8 | 18.92 | 11.59 |
| 401 | 409 | 9.314 | 0.306 | 15.02 | 13.39 – 17.59 | 3.01e−7 | 24.79 | 21.2 – 27.8 | 21.08 | 12.92 |
| 449 | 457 | 10.026 | 1.211 | 15.15 | 13.29 – 17.96 | 2.65e−7 | 27.78 | 23.4 – 31.7 | 23.13 | 14.18 |
| 503 | 509 | 10.753 | 1.544 | 15.88 | 13.77 – 18.96 | 1.27e−7 | 29.99 | 25.1 – 34.6 | 25.32 | 15.52 |
| 601 | 607 | 12.197 | 0.847 | 18.74 | 16.07 – 22.40 | 7.30e−9 | 30.14 | 25.2 – 35.1 | 29.36 | 18.00 |
| 701 | 709 | 13.560 | 0.334 | 21.28 | 18.10 – 25.48 | 5.71e−10 | 31.40 | 26.2 – 36.9 | 33.48 | 20.52 |
| 773 | 787 | 14.613 | 0.715 | 22.45 | 18.90 – 27.04 | 1.78e−10 | 33.01 | 27.4 – 39.2 | 36.59 | 22.42 |
| 1009 | 1013 | 17.503 | 1.221 | 26.22 | 21.62 – 31.90 | 4.12e−12 | 36.56 | 30.0 – 44.3 | 45.38 | 27.81 |
| 1499 | 1511 | 23.313 | 0.597 | 35.47 | 28.71 – 43.40 | 3.95e−16 | 41.09 | 33.6 – 50.8 | 63.99 | 39.22 |
| 2297 | 2309 | 31.914 | 1.861 | 46.92 | 37.05 – 58.11 | 4.21e−21 | 47.62 | 38.4 – 60.3 | 92.42 | 56.65 |
| 3001 | 3011 | 38.897 | 0.067 | 59.10 | 46.61 – 73.03 | 2.15e−26 | 49.66 | 40.2 – 63.0 | 116.53 | 71.42 |
| 6323 | 6329 | 68.551 | 1.216 | 101.87 | 78.53 – 127.14 | 5.72e−45 | 61.23 | 49.1 – 79.4 | 224.15 | 137.38 |

**A pointer finding, recorded before the measurement so it cannot be mistaken for
one.** `import-sofic.md` §6's "L first falls below 0.31·p/ln p at x = 773 and
below 0.19·p/ln p at x = 2297" is not reproducible from f-decays' published
coefficients under any of the five variants tried here. The stays-below level is
479 (B-lower), 661 (A-full), 691 (B-comb), 937 (B-upper), 509 (the proportional
k = 1.7454 form); for 0.19 it is 1171, 1699, 1657, 2521, 1307. The record's 773
and 2297 sit inside those spreads, so the reading survives as a range and not as
a pair of numbers. **This pass will report the crossing as a spread, not a
point.**

---

## 3. Validation, fixed in advance

The instrument is not used at any level x > 199 until it has passed this.

- **V1.** At every one of the 42 census levels for which the run's own window
  delivers K ≥ 100 qualifying gaps, |ln f_win − ln f_cited| ≤ 3/√K + 0.05.
  **Pass criterion: at most 2 of those levels may fail.** More than 2 and the
  instrument is declared not validated and no deep point is scored.
- **V2.** The slot count in the window reproduces the exact mean gap:
  |X/(N·m̄_exact) − 1| ≤ 0.01 at every one of the 42 levels. This is the head-bias
  check. The one cited comparison available is `attack-foldL-04-localized.js`'s
  embedded N = 28,510,623 at X = 2e9 for the level whose fold is 211, i.e. m̄
  = 70.15 against the exact 70.11, +0.06%.
- **V3.** The instrument's `L_win` at X = 2e9, restricted to the single copy
  a = 0, must reproduce `attack-foldL-04-localized.js`'s embedded L column
  (2 at folds 13 through 277 with the recorded exceptions at 11, 281, 311, 401,
  431, 461, 491 and above where it is 1). A disagreement anywhere is a defect in
  this instrument, not in that one.
- **V4.** The measured f decomposes term by term over the qualifying comb
  d_min, 4p±2, 6p, …; the first term's share must sit in the range the census
  reports for the levels where more than one term is affordable there (min
  83.33%, median 98.08%).

---

## 4. Window-size sensitivity, registered as a required report

At every measured level, f_win is reported at every decade of X from the first
decade holding 10 qualifying gaps up to the full window, and the record states
the drift. **Registered prediction R2: f_win has no systematic drift in X beyond
sampling error once K ≥ 100** — that is, the prefix is an unbiased sample of the
period at these levels. If f_win drifts monotonically with X at the 42 census
levels, the deep points are biased by an unknown amount and the pass reports the
drift instead of the deep points.

---

## 5. Scoring the decay law out of sample

For each deep level x > 199 with K ≥ 10:

- **INSIDE the band** (§2 column 6): the fitted law holds out of sample at that
  level.
- **ABOVE the band** (f smaller than the whole band, i.e. ln(1/f) larger):
  f decays FASTER than fitted. L = ln D/ln(1/f) is smaller, the crossings move
  DOWN, `gate-multiplies` §8's p ~ 800 turnaround arrives earlier, and U-FRAME
  §12's polylog reading is strengthened.
- **BELOW the band** (f larger than the whole band): f decays SLOWER than fitted.
  L is larger, the crossings move UP or disappear, §5a step 3's requirement
  L ≤ 0.19 to 0.31·p/ln p is harder, and if the shortfall grows with x the
  polylog call itself is at risk.

**Registered prediction R3, the central one.** The measured points land INSIDE
the four-specification band at every deep level. The point estimate B-comb is
expected to sit slightly BELOW the measurement (i.e. to over-predict f) at the
deep end, because the fitted threshold coefficient is range-dependent and falls
with range (1.695 lower half against 0.906 upper half, A-form), so an
extrapolation anchored on the whole range should over-state the decay. Concretely:
**the residual r(x) = ln(1/f_win) − ln(1/f_Bcomb) is predicted NEGATIVE on
average over the deep levels, with |mean r| ≤ 3.**

**Registered prediction R4, the trend test.** Regress r(x) on ln x over the deep
levels. **Predicted: slope negative, |t| < 3.** A significant positive slope
(t > 3) would say the true decay outruns the fit and every downstream projection
is conservative; a significant negative slope (t < −3) would say the fit
over-states the decay and the crossings are all optimistic. Either is a finding
about the branch and not about the instrument.

**Registered prediction R5, the recomputed crossings.** Substituting the measured
deep f into the same downstream form L = ln D/ln(1/f), refitting the threshold
coefficient on the measured deep points alone, and re-solving, the stays-below
level for 0.31·p/ln p is predicted to land in **[400, 1100]** and for
0.19·p/ln p in **[900, 3000]**. Landing outside either interval falsifies R5.

---

## 6. The direct L point, and what it can and cannot decide

`L_win` is a lower bound on the tile L (§1 calibration 2). The comparison the
u-frame needs is against 0.31·p/ln p and 0.19·p/ln p.

**Registered prediction R6.** `L_win` will NOT falsify the requirement at any
reachable level, because the window's sample is exponentially smaller than the
period's: the first-moment law over the graph gives
`L ≈ 1 + ln(2·samples)/ln(2/f)` (import-sofic §3, with the per-step continuation
rate f/2 that the same record measures as f_edge = f/2 exactly at every fold), so
the window reads ln(2X/m̄) ≈ 20 to 25 where the period reads ln(2pD) ≈ 200 to
740. Predicted L_win: **3 at x = 101 with X ≥ 1e10, 2 at every deep level**,
against a requirement of 12.8 to 29.4 over x = 211 to 601. **If L_win ≥ 0.31·p/ln p
at any level, the u-frame's §5a step 3 requirement is dead at that level by a
measurement rather than a projection.** That outcome is registered as very
unlikely; it is registered because it is the only thing a window measurement of L
could decide outright.

**Registered prediction R7, the informative reading.** The useful direct L point
is not L_win itself but the first-moment law with the MEASURED letter measure —
`import-sofic.md` §4's estimator C, the only estimator that record found flat
(slope 0.135 ± 0.172, mean predicted/exact 1.4965 over seven folds):

> **L̂(x) = [1 + ln(2D)/ln(2/f_measured)] / 1.4965.**

Registered: L̂ computed from the MEASURED f will exceed 0.31·p/ln p at x = 211
(projected 15.6 against 12.78) and will have fallen below it by x = 601
(projected 24.1 against 29.36); the stays-below level for L̂ against 0.31·p/ln p
is predicted in **[300, 700]** and against 0.19·p/ln p in **[700, 2200]**. These
are the numbers that matter, because they replace the fitted f in the crossing
projection by a measured one, and they are the first crossing estimate in this
corpus with no extrapolated f in it below the crossing level.

**And the standing caveat, registered.** The 1.4965 is measured on nine folds
whose exact L takes four distinct integer values, all at p ≤ 37. Carrying it to
p ≈ 600 is exactly the kind of transfer this corpus refuses elsewhere. Every L̂
in the record will be reported with and without it.

---

## 7. What is NOT being attempted

- No bound is proved, in either direction.
- The exact census is not recomputed at any level; the 42 points are cited from
  `a3-03-f-from-census.js`'s embedded OUTPUT (standing compute rule).
- The tile L is not computed at any level; only its window lower bound and the
  first-moment estimate.
- No prior-art search is run.
