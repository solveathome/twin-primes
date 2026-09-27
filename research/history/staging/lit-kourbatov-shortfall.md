# The 6.0% record-location deficit is Kourbatov's published b: same object, same normalisation, and the median-unbiased coefficient matches to four digits

<!-- ledger
id: Q-record-deficit
status: ANSWERED
todo: Z5
question: Does the 6.0 percent record-location deficit survive the corrected null, and what is it?
verdict: It is Kourbatov's published finite-height shortfall b = 1.2597, in the same normalisation on the same data; prior art DOCUMENTED as a measurement and not explained as a mechanism in either corpus; the A-normalisation is consistent but is not a second confirmation, since the two in-house estimators of b disagree by 15 percent, 1.125 from A against 1.298 from mean z.
-->

*(2026-08-28. Staging note; nothing here is integrated into a live document.
Closes the largest open exposure in `record-location-null.md` §7/§8, "the
deficit is already in the literature under its own normalisation: NOT
CHECKED". Producer: `research/history/staging/lit-kourbatov-shortfall.js`,
SCRATCHPAD-GRADE and outside output custody: `embed.js --check` finds no OUTPUT
banner, so every figure below is hand-pasted and none of these numbers may leave
this file until the producer carries one. 0.0 s; it gates on reproducing the
three published in-house readings before it compares anything. Sources read at
page image this session; sha256 in §2. No new census, no sieve, no twin data
beyond `research/a113274-gap-records.js`. Calibration marked per claim.)*

## 1. Verdict

**SAME EFFECT.** [MEASURED, scratchpad-grade, on prior-art-identified sources]
The in-house 6.0% trend-load deficit is Kourbatov's finite-height shortfall
coefficient `b`, published in 2013 for exactly this object, in exactly this
normalisation, with no conversion needed. Three things line up, and the middle
one is the decisive one:

- **The statistic is his, unchanged.** The repo's `z = (g - T(e))/abar(e)` is
  Kourbatov's standardized record gap `g*_2 = (g_2(p) - a log(p/a))/a` with
  `a = C_2 log^2 p = 0.75739 log^2 p`. Same numerator, same denominator, same
  ladder. §4 does the identification line by line.
- **His median-unbiased coefficient for twins reproduces on the adopted ladder
  to four decimals.** Kourbatov 2013 §5.1 observation 1, page 8, verified at
  page image: *"setting b ≈ 1.2597 for twin primes … would turn E1 into a
  median-unbiased estimator for maximal gaps below 10^15."* His footnote 5
  defines median-unbiased as "as many observed values above it as below it",
  so `b` there is exactly `-median(z)`. On the adopted ladder restricted to
  his window, `e < 1e15`, 71 records, the producer reads
  **median z = -1.2597**.
- **The size is consistent in the repo's own A-normalisation, and consistency
  is all it is.** A constant-`b` model gives `A(b) = mean_k (1 - b/L_k)`,
  `L_k = ln(e_k/abar(e_k))`. Against the cited null level 0.9895 ± 0.0182 the
  three published twin `b` values predict deficits of 5.27%, 5.79% and 6.92%;
  the data reads 6.07%, between the `b = 1.0818` model's 5.79% and the
  `b = 1.2597` model's 6.92% and within one null sigma of both. It is not an
  independent confirmation of the four-digit match. The `b` that the
  A-normalisation itself implies is 1.125, 15% below the 1.298 that mean `z`
  implies on the same records, because `A` weights by `1/L_k` and the low band
  carries a smaller `b` (§5). The two in-house estimators of `b` agree only to
  about 15% on this ladder.

**What this does not close.** The deficit is prior art *documented*, not
*explained*: it is prior art as a measurement and not as a mechanism.
Kourbatov offers no mechanism for `b > 0` at `k ≥ 2`: his one
mechanism argument (Kourbatov-Wolf 2019 §2.3.2, the `Σ 1/p ~ log log x`
"primes conspire together" heuristic) is stated for `k = 1` only, and for
`k ≥ 2` the same paper says the EVT trend formulas "work well" and then fits
`b` empirically. So `record-location-null.md` §5's reading stands, with its
novelty claim withdrawn: the effect is documented, named and quantified in the
owning convention, and unexplained there too.

**The comparison is not independent.** The adopted ladder is A113274, which is
the data Kourbatov fitted, plus records 72 to 82 above 1e15 that he did not
have. This is the same data read with the same statistic, which is what makes
the verdict SAME EFFECT rather than an independent confirmation of anything.

## 2. Sources read at source this session

Fetched by `curl` from `export.arxiv.org`, extracted with `pdftotext` in both
`-layout` and `-raw` modes, and every decisive number cross-read against the
rendered page image (`pdftoppm -r 150 -png`). The four PDFs downloaded clean on
the first attempt; no 429, no leg owed.

| artifact | endpoint | status | sha256 |
|---|---|---|---|
| Kourbatov, *Maximal gaps between prime k-tuples: a statistical approach*, JIS 16 (2013) 13.5.2 = arXiv:1301.2242**v3**, 24 pp. | `export.arxiv.org/pdf/1301.2242` | FULL TEXT, decisive pages 8 and 14 read at page image | `08c584ded894c7e48bed04531650254314a46bd35d7fc651d9374f92de2ab936` |
| Kourbatov, *Tables of Record Gaps Between Prime Constellations*, arXiv:1309.4053v1, 12 pp. | `export.arxiv.org/pdf/1309.4053` | FULL TEXT, page 1 read at page image | `733f8e77aba31d7f2bd5dee7da6e42b73f07be49a2bc1f442d3a658b10d108df` |
| Kourbatov-Wolf, *Predicting maximal gaps in sets of primes*, Mathematics 7 (2019) 400 = arXiv:1901.03785, 30 pp. | `export.arxiv.org/pdf/1901.03785` | FULL TEXT | `7d69b3564c38a0d0525eeb6a2184bd0375682d2cc61d619b6c1d9398e8767509` |
| Kourbatov, *The distribution of maximal prime gaps in Cramér's model*, arXiv:1401.6959 | `export.arxiv.org/pdf/1401.6959` | FULL TEXT, skimmed only | `71799148afda30ac0555107881796b47ff3a93b7500bdf6160dbdb129da58744` |
| Kourbatov-Wolf, *On the first occurrences of gaps between primes in a residue class*, JIS 23 (2020) = arXiv:2002.02115 | `export.arxiv.org/pdf/2002.02115` | FULL TEXT, read for a twin instance; **there is none** | `4c5bf092161dde3e8116b366d79a5ded01176ac7c404568cb72ed13273feea73` |

Custody notes. The 1901.03785 sha256 is byte-identical to the one
`zonegap-prior-art.md` §5 recorded on 2026-08-21, so that paper's earlier
page-image reading carries forward and its identification with Mathematics
7 (2019) 400 is not re-litigated here. The 1301.2242 download is the 24-page
v3, the same version `lit-pdf-kourbatov-grob.md` verified verbatim; that note
quotes the Figure 1 caption but records **neither** §5.1's `b ≈ 1.2597` **nor**
§5.2's `µ* = -1.659`, which are the two numbers that decide this item. The JIS
23 (2020) paper is `k = 1` throughout (primes in a residue class,
first-occurrence gaps); it carries no `k = 2` instance and does not bear on
this comparison. Its one transferable reading is that the best-fit Gumbel
scale sits in `α ∈ [0.7, 1]`, which brackets the in-house 0.796 (§5).

## 3. Object mapping: SAME OBJECT, not "contains" and not "shares a trend"

[PROVEN, conditional on the adopted ladder, by citation to an existing repo
result] The task asked whether the zone-record object is literally twin-prime
gaps. It is.

- Kourbatov's `G_2(p)` is the maximal gap between consecutive twin primes below
  `p`, and his data source for `k = 2` is A113274 (2013 §5.1, page 8, at page
  image: *"Figure 1 shows record gaps between twin primes (A113274) for
  p < 10^15"*).
- The repo's record ladder is A113274/A113275 as adopted in
  `research/a113274-gap-records.js`. It is not a tile object and not a slot
  object: the records are gaps between actual twin primes in the integers.
- The zone field `Z_2(p)` is a deterministic functional of that same ladder.
  `zonegap-03-model.md` §1 proves `D ≡ 0`, so `Z_2(p) = env(p)` at all 27,292
  swept zones and through all 79 ladder transitions from record 3 on. The
  per-zone object contains no information the ladder does not already carry.

So there is no object gap to price. The two records are the same records, and
the comparison is a like-for-like one. The only convention differences are
cosmetic and are checked in §4.

## 4. Normalisation map: the repo's z is Kourbatov's g*_2

[VERIFIED, by reading both definitions]

| quantity | Kourbatov 2013 §5.2, page 13 | repo, `zonegap-03-model.js` lines 365-388 |
|---|---|---|
| average gap unit | `a = C_k log^k p`, `C_2 = 0.75739` | `abar(x) = ln^2 x/(2C2)`, `1/(2C2) = 0.7573900640687455` |
| trend | `E_2 = a log(p/a)` | `trend(x) = abar(x) ln(x/abar(x))` |
| standardized record | `g*_k = (g_k(p) - a log(p/a))/a` | `z = (g - trend(e))/abar(e)` |
| shortfall coefficient | `b` in `E_1 = a log(p/a) - ba` | not named; enters as the location deficit |

Two cosmetic differences, both checked and both immaterial.

- **Notation collision on `C_2`.** Kourbatov's `C_2 = 0.75739` is the
  *reciprocal* Hardy-Littlewood constant; the repo's `C2 = 0.66016` is the
  Hardy-Littlewood constant itself, and `1/(2C2) = 0.75739`. Already flagged in
  `lit-pdf-kourbatov-grob.md` and in `ZONE-POSTULATE.md` §4. Same number, two
  conventions.
- **End-of-gap index.** Kourbatov indexes by the *lesser* prime of the ending
  pair (his own example: the gap between {17,19} and {29,31} is `g_2(29) = 12`).
  The repo uses `E = START + GAP + 2`, the greater member, two larger. The
  relative effect on `log^2 x` is `O(1/x)`. The four-digit reproduction of
  `b = 1.2597` in §5 is the operational check that this does not matter.

The repo's `A = mean_k g_k/T(e_k)` is a second summary of the same field. The
bridge is exact: `1 - A = -mean_k (z_k/L_k)` with `L_k = ln(e_k/abar(e_k))`, so
a constant-`b` model reads `A(b) = 1 - b·mean_k(1/L_k)`. The producer computes
`mean_k(1/L_k) = 0.06269` on the 72-record window.

## 5. The numbers [MEASURED, scratchpad-grade]

The producer gates first: on the window `e ∈ [1e4, 7.05e16]` it reproduces
`A = 0.9295`, `z mean = -1.298`, `z sd = 1.021`, `n = 72`, all three published
in `zonegap-03-model.md` §3 and `record-location-null.md` §2. It exits nonzero
if any of them misses.

**In the A-normalisation.** Null level `A_null = 0.9895 ± 0.0182` and the
deficit `6.06% ± 1.84%` are cited from `zonegap-03-model.js` §(b) and
`record-location-null.js`, not recomputed (standing compute rule).

| model | source of b | A(b) | deficit vs null | z vs null |
|---|---|---|---|---|
| `b = 1` | `b ≈ 2/k` at `k = 2`, arXiv:1309.4053 p. 1 (page image); also the 2013 Figure 1 caption | 0.9373 | 5.27% | -2.87 |
| `b = 1.0818` | `-b = µ* + γ` with `µ* = -1.659`, 2013 §5.2 Note (page image) | 0.9322 | 5.79% | -3.15 |
| `b = 1.2597` | median-unbiased for `p < 1e15`, 2013 §5.1 obs. 1 (page image) | 0.9210 | 6.92% | -3.76 |
| **in-house data** | `record-location-null.md` §2 | **0.9295** | **6.07%** | **-3.30** |

**In Kourbatov's own b units**, which is the sharper reading because it needs
no `L_k` weighting:

| reading | window | value |
|---|---|---|
| `b` implied by in-house z mean | `[1e4, 7.05e16]`, n = 72 | 1.2981 |
| `b` implied by in-house z median | same | 1.3159 |
| `b` implied by in-house `A`, via `A(b) = 1 − b·mean_k(1/L_k)` | same | 1.1251 |
| `b` implied by in-house z mean | `e < 1e15`, n = 71 | 1.2006 |
| **`b` implied by in-house z median** | **`e < 1e15`, n = 71** | **1.2597** |
| **Kourbatov's published median-unbiased b** | **`p < 1e15`, twins** | **1.2597** |
| in-house Gumbel mode from mean and sd | `e < 1e15` | -1.6681 |
| Kourbatov's published Gumbel mode `µ*` | `p < 1e15`, `k = 2` | -1.659 |

**The two in-house estimators of `b` disagree by 15%, and the A-normalisation
is the weaker one.** On the same 72-record window the A-route reads 1.1251 and
the mean-`z` route 1.2981, from `mean_k(1/L_k) = 0.06269` and `1 - A = 0.0705`.
The gap is not an arithmetic slip: `A` weights each record by `1/L_k`, which
upweights the low records by about a factor of six, and the height profile
below puts `b = 0.713` in the bottom band. The A-route's implied 1.125 sits
nearer Kourbatov's *default* `b ≈ 2/k = 1` than his fitted 1.2597. So the
A-normalisation table above and the b-unit table here are not two readings of
one number, and only the median route carries the four-digit match.

The mode agreement is looser than it looks and is reported as a consistency
check only: the in-house 1.6681 is moment-matched (`α = sd·√6/π = 0.810`,
`µ = mean - γα`), Kourbatov's is a distribution-fitting-software Gumbel fit,
and the two estimators are not the same estimator. The median agreement is the
one that carries weight, because both sides compute the same order statistic
by the same definition.

**How stable is the four-digit match.** Not very, and this is the caveat that
belongs with the headline. Median `z` moves with the cut: -1.3090 at `e < 1e14`
(n = 65), -1.2607 at `5e14` (n = 70), -1.2597 at `1e15` (n = 71) and at `2e15`
(n = 73), -1.2118 at `1e16` (n = 75). The neighbouring order statistics at the
`1e15` cut are -1.2618 and -1.2118, so the match is on a single record and is
not on a plateau. What the match establishes is that the two sides compute the
same quantity on the same data at the stated cut, not that the quantity is
cut-stable.

**Kourbatov-Wolf 2019's lower trend, in the same normalisation.** Their
Definitions 4 and 5 give `T_c(x) = a_c(x) log(C_{k,H} Li_k(x)/φ)` and
`T̄_c(x) = ā_c(x) log(x/ā_c(x))`, with `T̄_c - T_c → k·ā_c` by their eq (17).
The repo's `trend` is their **upper** trend `T̄_c`. The producer evaluates both
at the 72 ladder heights: `mean T_c/T̄_c = 0.9114`, `mean (T̄_c - T_c)/ā = 1.483`
(against the eq (17) limit `k = 2`, convergence stated by them as slow), and
`T_c` sits 7.89% below the null level. So the deficit's size is of the order of
the separation between their own two published trend curves, and the repo's
choice of the upper one accounts for most of it.

Their §3.1 bullet for `k = 2` reads *"approximately half of maximal gaps `G_c`
between lesser twin primes `p ∈ P_c` are below the lower trend curve `T_c(x)`
of Equation (12), while the other half are above that curve"*. On the adopted
ladder, 32 of 72 records sit below `T_c`, 44.4%. That is consistent, but it is
not a check of their statement: theirs is measured at `q = 313` and `q = 16001`
residue classes, ours at `q = 2`. Recorded as an adjacency, not as a
verification.

**Height profile of `b`**, four disjoint bands, read as a profile only because
`n` per band is 15 to 24 and the bands are not independent of the ladder's own
record structure: `[1e4, 1e8)` `b = 0.713` (n = 16); `[1e8, 1e11)` `b = 1.816`
(n = 15); `[1e11, 1e14)` `b = 1.620` (n = 24); `[1e14, 8e16)` `b = 0.937`
(n = 17). Non-monotone. The top band's 0.937 is near `2/k = 1`, which is the
direction `zonegap-03-model.md` §5 asked about, and at this `n` it is not a
measurement of a trend. That question stays NOT REACHED, unchanged.

## 6. What is left in the in-house work after the prior art is subtracted

[calibrated as stated]

- **Gone: the effect's existence and its size.** Both are Kourbatov's, 2013,
  in print, for this exact ladder and this exact statistic. No live sentence
  may present the 6.0% as an in-house finding.
- **Stands, and is not in these papers: the matched simulated null and its
  sigma.** Kourbatov reports `b`, `µ*` and a KS/AD goodness-of-fit, all
  descriptive fits to the data. Nowhere in the four papers read is there a
  matched ensemble of simulated pure-Exp record processes on the same window,
  an ensemble sigma, or a `z` for the location against such an ensemble. The
  corrected null of `record-location-null.md` §4 is therefore not duplicated
  by this prior art. Whether it is duplicated somewhere else was not searched
  this session.
- **Stands: `D ≡ 0`**, which is what makes the ladder statement a statement
  about `Z_2`. That is `zonegap-03-model.md` §1's and is untouched here.
- **Unchanged: no proof value.** Everything on both sides is conjectural.
  `zonegap-prior-art.md` §1 verified the string "Theorem" does not occur in
  the 2019 paper; the 2013 paper's statement (B) sits under a "Conjectures"
  heading. A match between a measurement and a fitted heuristic coefficient is
  not evidence about the twin prime conjecture in either direction.

## 7. Anchors banked

**Deciding sentence, for citation.** Kourbatov, JIS 16 (2013) 13.5.2, §5.1
observation 1, page 8, read at page image:

> "(We can make it even closer by tweaking the b value; e.g., setting
> b ≈ 1.2597 for twin primes, or b ≈ 0.7497 for prime quadruplets, would turn
> E1 into a median-unbiased estimator for maximal gaps below 10^15.)"

with footnote 5 on the same page: *"A median-unbiased estimator E_med(x) has as
many observed values above it as below it."* And §5.2, page 14, Figure 4 and
the Note beneath it: `k = 2`, `µ* = -1.659`, records below `10^15`; *"Now that
we have a more precise value of the mode µ*, we can refine the parameter b in
the E1 estimator: use -b = µ* + γ, which estimates the mean of the fitted
Gumbel distribution in Fig. 4."*

**SEARCH-CONVENTIONS row, PROPOSED, not applied** (the fence forbids editing
that file). `SEARCH-CONVENTIONS.md` §1 already carries a row for the *object*
("max gap between actual twin primes → maximal gaps between prime k-tuples,
fitted against `log^{k+1} p`; Kourbatov JIS 16 (2013) 13.5.2; OEIS A113274").
It carries **no** row for the *location statistic*, which is why this item's
exposure stayed open for a week. Proposed addition for the maintainer:

| object | our name | canonical | **OWNING convention** | where it lives |
|---|---|---|---|---|
| how far record twin gaps sit below their own trend curve at finite height | the record-location deficit, "trend load `A`", the 6% | finite-height shortfall of maximal gaps below the EVT trend | **the `b` coefficient of the estimator `E_1 = a log(p/a) - ba`**, `a = C_k log^k p`; equivalently the **mode `µ*` of the fitted Gumbel of the standardized record gaps `g*_k = (g_k(p) - a log(p/a))/a`**; the default is `b ≈ 2/k`, the twin values are `b ≈ 1.2597` (median-unbiased, `p < 1e15`) and `-b = µ* + γ` with `µ* = -1.659`. Searching "location parameter", "trend load" or "record deficit" returns nothing; **search `b`, `E_1`, `median-unbiased`, `standardized maximal gaps`** | Kourbatov, JIS 16 (2013) 13.5.2 §§5.1-5.2 (arXiv:1301.2242v3 pp. 8, 13-14); arXiv:1309.4053 p. 1 (`b ≈ 2/k`); Kourbatov-Wolf, Mathematics 7 (2019) 400 §3.2 (the `h`/`h̄` rescalings, eqs (48)-(49)) |

**PRIOR-ART note, PROPOSED, not applied.** The Kourbatov-Wolf bullet that
`zonegap-prior-art.md` §6 proposed should carry one added line: the 2013 paper
already quantifies the finite-height location shortfall for twins, at
`b ≈ 1.2597` and `µ* = -1.659` on records below `10^15`, and the repo's
record-location statistic is that `b`.

## 8. Defects noticed in passing

- `record-location-null.md` §7 cites the 2013 paper's **Table 1 decade slopes**
  (0.4576 → 0.5628 against `log^3 p`) as the in-print instance of the
  finite-height shortfall. That is a different statistic, a least-squares
  zero-intercept trendline slope, and it is the weaker of the two available
  citations. §5.1's `b` and §5.2's `µ*` are the same statistic as the repo's,
  and they were in the same paper the whole time.
- `zonegap-prior-art.md` §1 read the 2013 paper and lists the ceiling, the
  Table 1 slopes and the `a = 0.75739 log^2 p` form, but does not list §5.2's
  Gumbel fit or its `µ*`. A recon that reads a paper for the *trend* and not
  for the *residual distribution* leaves exactly this gap.
- `record-location-null.md` §3's mean-gap bullet cites "HL2 calibration ratio
  1.000046 (1e10)" as showing `abar` is right to `5e-5`. What
  `zonegap-03-model.js` S4 actually calibrates is the twin **pair count**
  against `2C2·Li_2(x)`, which validates `Li_2` and therefore validates
  Kourbatov-Wolf's `a_c(x) = x/π_2(x)`. It does not validate `ā(x) =
  ln^2 x/(2C2)` as the local exponential mean; those are different quantities,
  and KW's eq (10) puts them `k/log x` apart in relative terms, 5% to 9% over
  this window. The bullet's conclusion happens to survive, because `ā` is the
  correct *local* density reciprocal and `a_c` is a below-`x` average, but the
  cited number does not establish it.

## 9. What would falsify this, and whether that check has run

- **The two statistics are not the same statistic** (the identification in §4
  is wrong, and the 1.2597 agreement is a coincidence). Falsified by the
  producer's gate plus the definitional match: RUN. Kourbatov's `a` and the
  repo's `abar` are the same function to 16 digits, his `E_2` and the repo's
  `trend` are the same expression, and his median-unbiased `b` is `-median(z)`
  by his own footnote 5. The four-digit agreement follows from the
  identification rather than testing it, which is why the gate, not the
  agreement, is the evidence.
- **The agreement is an artefact of the window.** PARTIALLY RUN, and it is the
  live caveat. Median `z` reads -1.3090 / -1.2607 / -1.2597 / -1.2597 /
  -1.2118 at cuts `1e14` / `5e14` / `1e15` / `2e15` / `1e16`. The match holds
  at Kourbatov's stated cut and at one neighbour, and moves by ±0.05 outside
  them. A cut-free comparison would need his record list, not his coefficient,
  and that check has not been run.
- **The size does not match in the A-normalisation.** Falsified by §5's table:
  RUN. The data's 6.07% lies between the `b = 1.0818` model's 5.79% and the
  `b = 1.2597` model's 6.92%, and within one null sigma (1.84%) of both.
- **Kourbatov's b is a prediction the data could have missed.** NOT
  APPLICABLE, and stated so that the verdict is not over-read: `b = 1.2597` is
  a fit to A113274 below `1e15`, so the agreement is a reproduction, not a
  confirmation. The only genuinely out-of-sample part is records 72 to 82
  above `1e15`, and there the in-house `b` on the top band reads 0.937 against
  his 1.2597, a 25% move on 17 records. That is the one place the two could
  separate, and 17 records cannot settle it.
- **A mechanism for `b > 0` at `k = 2` exists in the literature and was
  missed.** NOT SETTLED. Four Kourbatov papers were read; the only mechanism
  offered anywhere in them is Kourbatov-Wolf 2019 §2.3.2, explicitly for
  `k = 1`. Wolf's 1990s preprints, cited by all of these and never fetched by
  this corpus, remain the standing hole; `zonegap-prior-art.md`'s NOT-REACHED
  already names them.
- **The matched-ensemble null is also prior art.** NOT CHECKED beyond these
  five papers. arXiv:1401.6959 builds a Cramér-model ensemble for `k = 1` and
  was skimmed, not read; whether its generalization section carries a `k = 2`
  ensemble comparison with a sigma was not established. This is now the
  largest open exposure in this note, replacing the one it closes.
- **The whole comparison is against conjectural objects.** Standing, and
  unfalsifiable in this corpus. Every trend, every `b`, and the Gumbel shape
  are conjectures or fits on both sides.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md`
for the corpus rule.*
