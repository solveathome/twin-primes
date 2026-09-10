# The null models against the two objects: what is predicted, what is measured, and whether any deviation is interval-level

<!-- ledger
id: Q-object-models-read
status: PARTIAL
todo: none
question: For G2(x#) and Z2(p), what does each null model in the corpus predict, which measured deviations from those models are real, and does any of them carry interval-level (wall-relevant) information?
verdict: Nothing found that carries interval-level information: seven of the nine real deviations are residue-level by the THE-LENS section 5 rule, Kourbatov's b is interval-level in form but blocked by a log-sparse quantifier and unexplained as a mechanism in both corpora, and the sub-Poisson rough-pair dispersion is classified interval-level in form and elementary in content (division with remainder, not placement) by the independent-thinning null that ran 2026-08-29 (measure-roughpair-null-0829.md), which also weakened the sub-Poisson reading since that null's own chi-squared per degree of freedom is 1 minus p rather than 1.
-->

*(Staging note, 2026-08-29. Reading pass only: computes nothing new, proposes no
route, edits no other file. Every claim carries a calibration marker and a
pointer. Where this note and `README.md` §Status or `research/G2-STATE.md` §0
disagree, those win and this is the file to fix.)*

## 0. What is open, first

**The starting position, and it does not move in this note: no model-vs-truth
deviation known to this corpus has been shown to carry interval-level
(wall-relevant) information.** [calibrated as a survey finding over the notes
listed in section 3, not as a theorem] Of the nine deviations catalogued below,
seven are functions of residues alone by the triage rule of `THE-LENS.md` §5
(a product over primes, a census ratio, a CRT identity), one is interval-level
in form and blocked by a quantifier that the corpus already proves fatal
(`history/staging/import-kw-zonegap.md` §2), and one is unclassified because the
control that would classify it was never run and its own note says so
(`history/staging/attack-roughpair-error.md`, defects list). Nothing here
touches the parity obstruction.

**Three specific things are open, and they are the reason the survey is not a
closure.**

- **Kourbatov's `b` has no mechanism in either corpus.** The 6.0% record-location
  deficit is his published finite-height shortfall coefficient, matched to four
  digits at his stated cut, and he offers no mechanism for `b > 0` at `k >= 2`;
  his one mechanism argument is stated for `k = 1` only
  (`history/staging/lit-kourbatov-shortfall.md` §1, §9). Three checks that would
  decide whether the residual part of `b` is arithmetic or an artefact of the
  trend's own finite-height form have NOT run (section 7).
- **The lighter-than-renewal tile tail is measured at `x <= 31` and derived
  nowhere.** The deficit factor (2.087 at @31, 2.241 at @29 against the renewal
  maximum) is [MEASURED] at six printed levels of the nine the producer computes,
  and no zero-parameter derivation of it from the fold's own qualifying-gap
  constraint exists (`history/staging/gap-spectrum-01.md` §3a, §6c;
  `history/staging/import-thinning.md` §2.1).
- **The `Var/E` identification half is open**, and the open half is the only
  interval-level half: `Conjecture 1` reduces to a weighted count of large
  `y`-smooth divisors of `C(C^2 - 4)` averaged over a window of length `L = y^2`,
  the search in its owning conventions has not been run, and the note's own prior
  is against the estimate being available at the precision needed
  (`paper/variance-note.md` §10).

**What this note does not do.** It computes nothing new: no producer was written
and none was run (section 7 lists the cheap unknowns and says why none was run).
It proposes no route. It edits no other file. Every number below is cited to the
file that measured it and none is recomputed, per the standing compute rule.
Where any statement here conflicts with `README.md` §Status or
`research/G2-STATE.md` §0, those win and this file is the one to fix.

**One framing correction carried forward, because it is easy to propagate.** The
exponent control is the ONE-class Jacobsthal `h(p#)` (A048670), which the
estimator reads at **1.282 where its truth is 1** (`research/exponent-control.md`
§1, 58 terms, all 40 sliding windows biased positive, minimum 1.197). The figure
**1.57** is `h2`'s control-corrected exponent and `1.50 +/- 0.05` stat is `G2`'s
on 22 trusted terms (`exponent-control.md` §5); neither object's truth is known,
and the proven floor for both is 1. "The h2 control reading 1.57 where its truth
is 1" collapses two different objects and should not be repeated.

---

## 1. The models in play

**The caveat first, and it applies to every subsection.** Not one of these
models is a theorem about `G2(x#)` or about `Z2(p)`. (a) and (b) are theorems
about a null process plus an unproven identification with the tile; (c) is
CONJECTURE-ONLY at every statement, verified: the string "Theorem" occurs zero
times in Kourbatov-Wolf 2019 (`history/staging/import-kw-zonegap.md` §4); (d) is
(c) evaluated as a simulated ensemble; (e) has a proven model half and an open
identification half; (f) is the one whose central identity is PROVEN, and what
it proves is adverse.

### (a) The independent-thinning / CRT-product null

**What it is.** Deleting points of a renewal process independently merges
adjacent intervals, so the gap probability generating function transforms by
`phi -> q*phi/(1 - r*phi)`, a Moebius map fixing 0 and 1; the maps compose
multiplicatively, and the whole ladder collapses to a single map. Under
independent thinning the gap word of `T_x` is **exactly** Geometric with mean
`mbar/6` in comb units at every rung, with no error term and no limit.
[PROVEN, as a statement about the null] `history/staging/import-thinning.md` §0,
§1.2.

**For `G2(x#)`.** Through the exact extreme-value law of the null,
`P(K <= k) = (1 - rho^k)^(N-1)` with `G_max = 6K`, the Gumbel form is
`E[G_max] = (mbar/c_null)*(ln(N-1) + gamma)`, leading term `mbar * ln N` with
constant 1, since `c_null -> 1` is the thinning fixed point (1.527151 at fold 7,
1.023916 at fold 1499). [PROVEN for the null; `history/staging/null-limsup.md`
§0, §1, and `import-thinning.md` §0.] With
`mbar(x) ~ e^(2 gamma) ln^2 x/(2 C_2) = 2.402607 ln^2 x` and `ln N = ln D_x`,
`ln W = theta(x) ~ x`, the null's prediction in the `x`-frame is
**`G2 ~ 2.4026 * x * ln^2 x`: exponent 1, log power 2.**

**For `Z2(p)`.** Nothing directly. The transferable content of Neudecker's
Hawkins limsup law (`lim sup (p_{n+1} - p_n)/log^2 p_n = 1` a.s., carried
second-hand via Rivoal, the primary NOT REACHED on this disk) is
`maximal gap ~ (mean gap) * ln(number of points)`, constant 1, because Hawkins'
`log p_n` is simultaneously the mean gap and `ln N`. In this corpus's object the
sieve depth and the window are set independently, so the collapse is not
available and the two factors have to be carried separately
(`history/staging/null-limsup.md` §1; `history/staging/hawkins-read.md` §3, §10).

**The deviation term, written exactly.** The Fold Moment Identity
`(p-2) Phi_new = (p-4) Phi + Omega + 2 Psi + Delta` against the null map's
`(1 - 2/p) Phi + (2/p) Phi^2 + O(p^-2)` gives: the entire deviation of CRT
thinning from independent thinning, at first order in `1/p`, is `Psi - Phi^2`,
the adjacent-pair moment against the square of the single-gap moment. [PROVEN,
assembled from two identities the corpus already proves;
`import-thinning.md` §0, §2.3.]

### (b) The Cramer-type random comb

**What it is.** `D_x` gaps, i.i.d. Exponential with mean `mbar = W/D_x`,
conditioned to sum to `W`; the conditioning correction is `O(1/D)`. This is the
null pre-registered analytically before the gap-spectrum producer was run
(`history/staging/gap-spectrum-01.md` §1).

**For `G2(x#)`.** `G2_null = mbar * ln D` (N3), and the shape predictions
`sd/mean = 1`, `skew = 2`, `max/mean = ln D` exactly, log-tail slope exactly
`-1` on the abscissa `t/mbar` with no free parameter (N1), and
`|B_N|/W = exp(-N/mbar)` for the excess-length functional
`|B_N| = sum_i max(0, g_i - N)` (N2). [The null is exact arithmetic; the
identification with the tile is a MODEL.] The leading term agrees with (a); the
two differ at finite depth, since (a) carries `c_null > 1` and therefore predicts
a **smaller** maximum than (b) at every reachable fold.

**One-class analogue against the Jacobsthal literature.** The same null run on
one class predicts `g(x#) ~ m_1 * ln D_1` with `m_1 ~ e^gamma ln x`, i.e.
exponent 1 with log power 1. The literature's positions, each with its pointer:
the proven upper bound is Iwaniec 1978, exponent 2 with an inexplicit constant
(sharpened form `h(k) << (k log k)^2`), and Vaughan 1977 for general `n`
(`research/two-class-lower-bounds.md` §9, which tabulates Kanold, Stevens 1977
and Paseman 2014 alongside, all far above exponent 2 as exponents in `k`); the
conjectured size is Maier-Pomerance `x (log x)^(2+o(1))`, i.e. exponent
`1 + o(1)` (`exponent-control.md` §"The control";
`SEARCH-CONVENTIONS.md` §1 row for A048670). The two-class conjectured truth is
`x (log x)^(3+o(1))`, the Maier-Pomerance accounting run in dimension 2
[CONJ, `two-class-lower-bounds.md` §4b]. **So (b) and the dimension-2
Maier-Pomerance conjecture predict differently for `G2` by exactly one
logarithm**, and `maxgap-law.md` §7 locates the missing log: in
Ford-Green-Konyagin-Tao's own accounting the truth is `y ~ e^gamma x T1 r`, so
`c = T1 r/log x`; `T1` is Rankin's alignment gain, PROVEN and capped below one
log by the smooth-number step, and `r` is the survivor count one large prime can
kill, proven only at `r = 2` and conjectured by Maier and Pomerance at
`(log x)^(1+o(1))` [INFERRED from a PROVEN source].

### (c) Hardy-Littlewood plus Cramer / Kourbatov for zone-side twin gaps

**What it is, and its rung.** CONJECTURE-ONLY, verified: zero theorems in the
source (`import-kw-zonegap.md` §4). Its three hypotheses are named there, and the
first of them, `k`-tuple infinitude at `H = (0,2)`, IS the twin prime
conjecture, which is why the row is graded CIRCULAR in any proof chain and CLEAN
as instrument only.

**For `Z2(p)`.** Via `D(p) = 0` (`history/staging/zonegap-03-model.md` §1,
PROVEN conditional on the adopted ladder being the true running max, VERIFIED
204 ways at 27,292 of 27,292 zones), `Z2(p) = env(p)`, so every prediction for
`Z2` is a prediction for the published record ladder. The forms:
upper trend `Tbar_c(x) = abar_c(x) log(x/abar_c(x))` with
`abar(x) = ln^2 x/(2 C_2)`; lower trend `T_c`, with `Tbar_c - T_c -> k*abar_c`;
the Generalized Cramer ceiling
`G_c(p) < C_(k,H)^-1 phi_(k,H)(q) log^(k+1) p`, which at `q = 2` is
`0.7574 ln^3 p`, quoted in the corpus as Kourbatov's "maximal gaps between twin
primes are less than 0.76 log^3 p" (`ZONE-POSTULATE.md` §4, with the notation
collision on `C_2` flagged there: his `C_2 = 0.75739` is the reciprocal
Hardy-Littlewood constant); and the finite-height shortfall
`E_1 = a log(p/a) - b*a`, default `b ~ 2/k = 1` at `k = 2`, fitted
`b = 1.2597` median-unbiased for `p < 1e15`, and `-b = mu* + gamma` with
`mu* = -1.659` giving `b = 1.0818`
(`history/staging/lit-kourbatov-shortfall.md` §4, §5, all read at page image).

**For `G2(x#)`.** Nothing. Kourbatov's object is gaps between actual twin
primes; the tile's twin slots are a superset. The two are not the same object
and the model does not transfer.

### (d) The pure-Exp record process of `zonegap-03-model` §3

**What it is.** A 200-replicate matched simulated ensemble: exponential gaps at
`abar = ln^2 x/(2 C_2)`, Gumbel block maxima, same window, same estimators,
seeded, with three controls passing in-pass (deterministic recovery reads
`A = 1.000000`; injection halving `abar` reads an `A` ratio 0.525 against a truth
0.500). [MEASURED, with controls; `zonegap-03-model.md` §3.]

**For `Z2(p)`.** Predicts record count `68 +/- 8`, rate `2.356 +/- 0.304` per
`ln x`, spacing CV `0.944 +/- 0.100`, `z` sd `1.264 +/- 0.177`, and the trend
load `A = 0.9895 +/- 0.0182` (0.9891 +/- 0.0178 on 5,000 fresh reps).

**For `G2(x#)`.** Nothing.

**Where (c) and (d) differ on the same object.** (c)'s two published trend
curves are themselves 8.9% apart on the ladder heights
(`mean T_c/Tbar = 0.9114`, `import-kw-zonegap.md` §5 and
`lit-kourbatov-shortfall.md` §5), and the repo's `trend` is the **upper** one,
which accounts for most of the deficit (d) measures. And (c)'s three published
`b` values predict deficits of 5.27%, 5.79% and 6.92% against (d)'s null level,
a spread wider than (d)'s own sigma.

### (e) Gorodetsky's variance model at `theta = 2` and the `GD(2)` limit

**What it is.** On the comb-restricted diagonal window `L = W = x#` with `y` the
largest prime `<= sqrt W`, a decoupled model of the discrepancy has a proven
limit: `ln n/ln y -> GD(2)` with rate `O(lnln y/ln y)`, `E[g] -> lambda_2(u)`
with no correction, so
`lim Var/E = lambda_2(2) = Pr[GD(2) > 2] = 1 - e^(-2 gamma)(9/2 - 4 ln 2)
= 0.45546`. [Model half PROVEN, `history/staging/varE-limit-theorem.md`;
identification half OPEN, `paper/variance-note.md` §10 Conjecture 1, one of five
links unproven.] At one excluded class per prime it is an identity rather than an
analogy, reproducing Gorodetsky's `lambda(u)`.

**For `G2` and `Z2`.** Nothing directly, and this is worth stating rather than
implying: a variance is a second moment on counts, and by the corpus's own
wrong-direction test only `min_x N(x) >= 1` is the target, while `E[N] >= 1` is
capacity counting and `P(N = 0) <= eps` is the almost-all axis
(`history/staging/attack-wrongdirection-audit.md` §1, Axes C and D). No
second-moment statement converts into a bound on one empty window.

### (f) The rotation ensemble as a null for the origin

**What it is, and it is the one PROVEN identity here.** For every `y < x` and
every `S <= y#`, writing `rho_z(S) = (D_z(S)/S)/delta_z`,

> **origin(S)/mean(S) = rho_x(S)/rho_y(S)**

exactly, with no error term. [PROVEN, VERIFIED 39 of 39 cells,
`research/origin-excess.md` §2.] Adding the Unification Law, `rho_z(S)` depends
on `u = ln S/ln z` and on nothing else [MEASURED, four decimals from `u = 3` up
across fifteen levels, and scale-free across three windows of different
character including one with no tile structure at all,
`research/FOLD-PROFILE.md` §9a], the whole question becomes one about the shape
of a single curve, `rho(u) = e^(2 gamma)/u^2` on `1 <= u <= 2`.

**For the origin at the zone width.** `S = x'^2` is `u = 2`, where the curve
takes the value `rho(2) = e^(2 gamma)/4 = 0.79305`: the origin carries about 21%
LESS than the ensemble mean. [MEASURED directly at eighteen levels, landing on
`e^(2 gamma)/4` to four digits, 0.79303 at `x = 1487` after stripping the
finite-size Hardy-Littlewood factor, `origin-excess.md` §0, §8. That `u = 2` is
the exact argmin is INFERRED from the squared-Buchstab form, not proven, and the
operative fact needs no such inference.]

**For the anchored bias.** The same constant appears as the conjectured limit of
`beta(x) = S(x)/E(x)`, and the descent follows the zero-parameter classical
correction `(e^(2 gamma)/4)(1 + 2/ln W + 6/ln^2 W)` with residuals collapsing
+0.0046, +0.0026, +0.0016, +0.0010 at @23, @29, @31, @37 and the @41 forecast
landing at 0.8449 against a measured 0.8455 [MEASURED, four consecutive
on-record forecasts, `paper/anchored-note.md` §3, §10].

**For `G2` and `Z2`.** Nothing directly: both statements are about density, not
about a maximum gap.

---


## 2. Measured against model

**The caveat first.** Two rows in each table have no honest sigma at all (the
exponent, because the estimator's bias is the dominant term and the nominal
standard error is worthless; the tail-deficit factor, because it is a ratio of
two deterministic numbers), and they are marked. Nothing in either table is
recomputed here.

### 2a. `G2(x#)`, the tile's largest twin-slot gap

| quantity | model value | measured | n | sigma or band | prereg | artifact |
|---|---|---|---|---|---|---|
| growth exponent, `x`-frame | 1 (with a `ln^2 x` factor) under (a)/(b); `1 + o(1)` for the one-class analogue under Maier-Pomerance; the dimension-2 conjecture reads one log higher, `x ln^3 x` | **1.50 +/- 0.05 stat**, control-corrected, 22 trusted terms; raw 1.777 +/- 0.029 nominal | 20 fitted points, `p` in [5, 79] | stat only; **systematic unquantified**; the control reads 1.282 where its truth is 1, bias positive in all 40 windows | no | `exponent-control.md` §5; `G2-STATE.md` §3a |
| proven upper bound | n/a | `<<_eps x^4.26645` | - | PROVEN | no | `paper/beta2-note.md` |
| `max/mean` | `ln D` exactly | 3.264, 4.712, 5.856, 7.272, 8.562, 10.804 | 6 printed levels, x = 13..31 (nine computed) | none (exact) | **yes**, P1 | `gap-spectrum-01.md` §3a |
| ratio of measured max to renewal max | 1 | **0.446 (@29), 0.479 (@31)**, i.e. a factor 2.241 and 2.087 BELOW, flat not drifting | 2 deepest levels | no sigma: a ratio of two exact numbers | **yes**, registered as P1 before the run | `gap-spectrum-01.md` §1, §3a |
| `sd/mean` | 1 | 0.5950 -> 0.7270, closing slowly | 6 | exact | yes | `gap-spectrum-01.md` §3a |
| skew | 2 | 1.109 -> 1.626 | 6 | exact | yes | same |
| log-tail slope, body decade | `-1` | **-1.3638 (@29), -1.3302 (@31)**, never returning to -1 | 36 and 50 qualifying points | factor-2 band on counts, plus `3 sqrt(count)` | yes, N1 | `gap-spectrum-01.md` §3b, §3c |
| power-law slope, by decade | constant | moves by a factor 19 (@29) and 17 (@31), monotone | same | no fit attempted | yes | `gap-spectrum-01.md` §3c |
| `\|B_N\|/W` at `s` = 1.00 / 1.25 / 1.50 | `exp(-N/mbar)` | meas/null 0.7436 / 0.4111 / 0.0245 (@31); 0.7322 / 0.3897 / 0.0257 (@29); 0.7931 / 0.4708 / 0.1066 (@23) | 3 levels | factor-2 HOLD band | yes, N2 | `gap-spectrum-01.md` §4a, §4b |
| `\|B_N\|` at `s = 1.75` | 3.92e4 (@29), 6.53e5 (@31) empty windows | **exactly 0 at both** | 2 | none | yes | `gap-spectrum-01.md` §4a |
| extreme-value constant `c` | `-> 1` from above | `c_1 = 0.3718` (cv 7.2%), `c_2 = 0.8511` (7.3%), `c_2' = 0.4814` (10.2%) | 46 / 17 / 8 whole-period terms | cv as quoted | no | `two-class-lower-bounds.md` §6; `maxgap-law.md` §2 |
| is `c` a constant | yes, in an extreme-value law | **no: a surface** `c(x, ln D)`, 0.446 to 1.083 inside the single tile `x = 29` | - | REFUTES any universal `c` | no | `maxgap-law.md` §4 |
| pair correlation `g(d)` | 1 (Poisson) | `g(2) = 0` and `g(d) = 0` unless `6 \| d`; on that support `g(d) >= 2.38128`, `g(6) = 2.661728` at `x = 11`, exact product form at all twelve levels | 12 levels, exhaustive to `d = 2e6` at `x = 1009` | PROVEN and VERIFIED | no | `history/staging/import-repulsive.md` §1, §2 |
| `Var/E`, comb diagonal | 1 (Poisson); model limit 0.45546 | 0.1521, 0.2563, 0.2995, 0.3268, 0.3473, 0.3643, 0.3774, 0.3876, 0.3958 | 9 exact levels, `x = 7..37` | certified roundoff bars, rel. 1.3e-8 to 2.2e-4 | model limit proven, identification open | `paper/variance-note.md` §7, §9, §10 |
| adjacent kill-pair count `X`, by decade of `p` | independent thinning | meas/null 2.5572, 0.3441, 0.9200, 0.3664, 0.1529, 0 across decades of `p` at `Y = 2e9`: falling with depth | 237 folds | none quoted | R3 registered, HELD at 2.73 | `import-thinning.md` §1.4 |
| total variation, CRT fold vs exact compound-geometric thinning of the same word | 0 | 0.18069 (T5) -> 0.01397 (T23), monotone, under 0.05 from fold 13 | 7 tiles | exact | S5 registered and **REFUTED in the opposite direction**: the excess sits in the bulk (gaps 18, 30, 42), never near the tail | `import-thinning.md` §2.2 |
| extinction count `N2`, measured/predicted | 1 | 0.75, 0.82, 0.87, 0.82, 0.86 | 5 windows, 4 decades of `Y` | now written into the law as a ~20% overprediction, not absorbed by the band | **yes**, sealed at `4391c2c` | `history/staging/foldL-window5.md` §1, §2 |
| per-fold dispersion around `lambda_model * M_p` | Poisson | 33 of 37 and 34 of 37 folds inside sealed 90% bands, 0 of 37 outside 99.73% | 37 folds, two fresh anchors | sealed NB bands; the old `+/-3 sqrt(lambda)` clause read 29 of 37 and had failed at 43.2% | **yes**, twice, sealed alone | `history/staging/perfold-error-model.md` §0; `history/staging/mp-derivation.md` §0 |

### 2b. `Z2(p)`, the largest gap between twin openers in `(p, p'^2)`

| quantity | model value | measured | n | sigma or band | prereg | artifact |
|---|---|---|---|---|---|---|
| `Z2(p)` vs `env(p)` | model posed a correction field `D(p) <= 0` | **`D(p) = 0` identically**, fraction 1.0000 | 27,292 zones; all 79 ladder transitions from record 3 | PROVEN conditional on the adopted ladder; VERIFIED 204 ways, zero free parameters, no twin data | no | `zonegap-03-model.md` §1 |
| `Z2` law | Generalized Cramer ceiling `0.7574 ln^3 p` | `(3.4..4.0) ln^3 p` drifting (live statement); band `c3` means 3.930 +/- 0.219 and neighbours; ladder-third mean ceiling loads 0.544 -> 0.685 -> 0.759, worst 0.8463 | 27,292 zones; 82 records | 0 of 82 records breach the ceiling | the `1e12` extension is sealed, unrun | `TODO.md`:49-51; `import-kw-zonegap.md` §5 |
| `Tbar(p^2)/ln^3 p` vs measured `c3` | 1 | 0.943, 0.904, 0.921, 0.867 (trend over-reads by 6-13%), with `T_c` bracketing from below at the two upper bands | 4 bands | none quoted | no | `import-kw-zonegap.md` §5 |
| record count | 68 +/- 8 | 72 | 72 records, window [1e4, 7.05e16] | inside 95% | no | `zonegap-03-model.md` §3 |
| record rate per `ln x` | 2.356 +/- 0.304 | 2.562 | same | inside 95% | no | same |
| spacing CV | 0.944 +/- 0.100 | 0.908 | same | inside 95% | no | same |
| `z` sd | 1.264 +/- 0.177 | 1.021 | same | inside 95% | no | same |
| trend load `A` | 0.9895 +/- 0.0182 | **0.9295**, a 6.06% deficit | 72 | `z = -3.30`; 5,000 fresh reps 6.03% at -3.34; conditional-on-`N` null 5.48% at -4.24; height-marginal-divided null 6.01% at -3.33; 1 of 5,000 realisations reach the data | no | `zonegap-03-model.md` §3; `history/staging/record-location-null.md` §2 |
| the deficit across window cuts | - | 6.03% / 6.50% / 5.95% / 5.68% / 4.01% at lower cuts 1e4 / 1e6 / 1e8 / 1e10 / 1e12 | `n` = 72 / 64 / 56 / 48 / 33 | `z` -3.34 to -2.65 | no | `record-location-null.md` §3 |
| Kourbatov's `b` | published 1.2597, median-unbiased for `p < 1e15` | in-house median `z` at `e < 1e15`: **-1.2597** | 71 records | four-digit match at his cut only: median `z` reads -1.3090 / -1.2607 / -1.2597 / -1.2597 / -1.2118 at cuts 1e14 / 5e14 / 1e15 / 2e15 / 1e16 | no; a reproduction, not a confirmation | `lit-kourbatov-shortfall.md` §5 |
| `b` from the `A` route vs the mean-`z` route | one number | 1.1251 against 1.2981 on the same 72 records | 72 | the two in-house estimators disagree by 15% | no | `lit-kourbatov-shortfall.md` §1, §5 |
| Gumbel mode | published `mu* = -1.659` | in-house moment-matched -1.6681 | 71 | consistency only: different estimators | no | same |
| record-start placement inside its prime-square stretch | uniform | seven fresh fractions, mean 0.4585 | 7, heights 1.29e16 to 7.05e16 | inside [0.282, 0.718]; one outer-decile point against an expectation of 1.4 | **yes**, sealed alone at `1bc0dd8`; READ-3 REFUTED as vacuous | `history/staging/records-placement-01.md` §1 |
| head | HL 0.7574 | 0.6693 `ln^2 p` at [3163, 1e4) | 782 zones | run-corrected `n_eff`; sealed whole-sweep prediction 0.7259 +/- 0.0101, unscored | sealed | `history/staging/zone-tail-01.md`; `zonegap-03-prereg.md` S2 |
| tail | HL 0.7574 | 0.7771 in `ln^2(p'^2)` units at [3163, 1e4), which is 3.1096 in `ln^2 p` units | 782 zones | bootstrap [0.7301, 0.8271]; band drift 0.7518, 0.7288, 0.7771 is non-monotone and MISSES the pre-registered 0.03 step | **yes**, E1 MISSED narrowly | `zone-tail-01.md` §0, E1 row |
| renewal surplus `t/R` at B4 | 1 | 1.0619, and the same 1.0619 from an exhaustive class-matched origin null over 5,962,057 origins | 782 zones | bootstrap [0.9937, 1.1321] **contains 1**: NOT RESOLVED | yes | `zone-tail-01.md` §0 |
| `R0` share | - | 1.82% head, 89.72% `Z2`, 8.46% tail at B4, tail share falling | 782 zones (B4); the identity is asserted at all 1,225 | asserted at all zones | no | `zone-tail-01.md` §0 |
| margin against the window | - | `p^2/(0.76 ln^3 p) = 1.12e29` at the last record; postulate verified to `p = 1e11`, 4,118,054,813 primes, zero failures | - | **budget, never evidence** (`TODO.md`:52-53) | no | `ZONE-POSTULATE.md` §4 |

---

## 3. Which deviations are real

**The disconfirming half first.** Two of the entries below are not deviations at
all once their control is read: the zone tail's renewal surplus (bootstrap
contains 1) and the fitted `Var/E = 0.611` (the fit protocol run on a model whose
limit is 0.455 returns 0.6164, so the reading measured the protocol). One more,
the sub-Poisson rough-pair dispersion, has never had the control its own note
names. Those three are stated as such rather than banked.

**D1. The origin deficit `rho(2) = 0.79305`. REAL, and PROVEN in direction.**
Sign: the origin sits **below** the ensemble mean, by 20.7%. Size: exactly
`e^(2 gamma)/4`, measured 0.79303 at `x = 1487` after stripping the finite-size
Hardy-Littlewood factor. Sigma: none needed; the Survival Quotient Identity is an
identity with no error term, VERIFIED 39 of 39, and `rho(2) < 1` is measured
directly at eighteen levels. Control: the Unification Law's own scale-free check,
three windows of different character including one with no tile structure, agreeing
to four decimals over the provable region. What is NOT proven: that `u = 2` is
the exact argmin of `rho`, INFERRED from the squared-Buchstab form; the measured
trough sits at `u = 2.0903` with the offset explained by the window's finite-size
factor. `origin-excess.md` §0, §2, §8.

**D2. `beta`'s descent below 1. REAL, and the same constant as D1 in a different
costume.** Sign: `beta` falls through 1 between `x = 13` and `x = 17` and keeps
falling: 1.156, 1.146, 1.009, 0.955, 0.926, 0.893, 0.875, 0.863, 0.853, 0.846
across ten levels. Size in sigma: `z = +1.05` at `x = 7` to `z = -22,633` at
`x = 37`, on the nine levels where the ensemble variance is certified. Drift, not
noise: after removing a 9-step moving average the anchored increments have
autocorrelation about -0.09 and Gaussian-scale tails, max `|z| = 3.02` in 164
steps. Blind status: four consecutive on-record forecasts against the
zero-parameter classical correction `(e^(2 gamma)/4)(1 + 2/ln W + 6/ln^2 W)`, with
residuals collapsing +0.0046, +0.0026, +0.0016, +0.0010, and the @41 forecast
0.8449 against a measured 0.8455. Proven in direction: no. The free-linear
intercept slides with each added point (0.7890 on eight levels, 0.7860 on nine),
and `anchored-note.md` §10 reads the proximity to `e^(2 gamma)/4` as consistency,
not as evidence. `paper/anchored-note.md` §3, §10; `paper/wall-note.md` Face 1.

**D3. The 6.0% record-location deficit. REAL as a measurement, NOT new, and not
blind.** Sign: the published twin-gap records sit **below** a matched pure-Exp
record process. Size: 6.03% to 6.50% of trend, about 1.1 `abar`, present at all
five window cuts. Sigma: `z` between -3.3 and -4.3 depending on the correction,
with 1 of 5,000 matched realisations reaching the data's value; the null's `A`
distribution is mildly right-skewed (skew 0.31), which thins the tail the data
sits in. Controls run, and one makes it worse: an independence null is 2.08 times
narrower than the ensemble sigma, so no `n_eff` deflation is available in the
direction the item assumed; conditioning on the observed record count lowers the
null and gives `z = -4.24`; dividing by the ensemble's own height marginal moves
the deficit by 0.05 percentage points. Robustness: the null's block approximation
carries no detectable location bias (-0.33% at 0.59 s.e., wrong sign); the mean-gap
scale is right to 3e-5 locally; the gap lattice is argued at 1.7e-4 and NOT
measured. Blind: no, entirely post hoc. **Not new:** it is Kourbatov's published
`b`, matched to four digits at his stated cut, and the match is a reproduction on
the data he fitted, not a confirmation; the one out-of-sample stretch, records 72
to 82 above 1e15, reads `b = 0.937` against his 1.2597, a 25% move that 17 records
cannot settle. `record-location-null.md` §1-§5, §8;
`lit-kourbatov-shortfall.md` §1, §5, §9.

**D4. `Var/E` sub-Poisson, and the refuted 0.611. THE SUB-POISSON DEVIATION IS
REAL; THE FITTED LIMIT IS NOT A MEASUREMENT.** Sign: every computed level and
window length is strictly below the Poisson value 1. Size: 0.1521 to 0.3958 across
`x = 7..37` on the comb diagonal; 0.845 down to 0.076 across `u = 0.6..3.0` at
`y = 401` on the full tile. Sigma: certified roundoff bars only, relative 1.3e-8 to
2.2e-4; these are exact computations, not samples. The 0.611 is REFUTED as an
inference, by a control rather than by an argument: the same in-sample protocol run
on a model sequence whose limit is 0.455456 by construction returns 0.6164, wins
the same model comparison by the same margin, and reproduces the frozen forecast
too. The 0.45546 is a **model** limit, PROVEN for the model
(`varE-limit-theorem.md`) with the identification OPEN; no value of
`lim Var/E` is measured anywhere in the note. `paper/variance-note.md` §6, §7,
§10, §11; `history/staging/redteam-0828-varE.md`.

**D5. The lighter-than-renewal tile tail. REAL, pre-registered, and confined to
`x <= 31`.** Sign: lighter, at every point above the mean, monotonically. Size:
the maximum is a factor 2.241 (@29) and 2.087 (@31) BELOW the renewal maximum, a
ratio that is flat rather than drifting; the body log-tail slope is -1.36 and
-1.33 against -1; the ratio to the null falls by four orders of magnitude between
`t = mbar` and `t = 7 mbar`; `|B_N|` sits at 0.0245 to 0.7436 of the null and is
exactly zero at `s = 1.75` where the null predicts 6.5e5 empty windows, which the source leads with as a caveat rather than as evidence, because it follows from G2 < x^1.75 at every level from x = 13 up (`gap-spectrum-01.md`:273-274) and so is not an independent falsification of the null. Sigma:
none for the deficit factor (a ratio of exact numbers); factor-2 and
`3 sqrt(count)` bands on the tail points. Blind: **pre-registered before the run**,
including the falsifier ("a slope above -1 in the top decade, or `|B_N|` above the
null at large `N`, at any level"), which ran and did not fire. Two things
explicitly not banked by the note itself: the far-tail slope's relaxation over the
last two decades exists at @31 only, and the whole reading says nothing about the
asymptotic exponent. `gap-spectrum-01.md` §1, §3a-§3d, §4b, §6c.

**D6. The ~20% extinction overprediction and the `M_p` field. REAL, and the only
one on this list with two independent sealed blind hits.** Sign: the law
overpredicts counts. Size: measured/predicted `N2` = 0.75, 0.82, 0.87, 0.82, 0.86
at five windows over four decades of `Y`; the ~20% aggregate correction is the
exposure-weighted mean of `M` over the scored folds. Sigma: the per-fold `+/-3
sqrt(lambda)` clause FAILED at 43.2%, and was replaced by
`X_p ~ Poisson(lambda_model * M_p)` with `M_p` deterministic in the fold and
Poisson dispersion around the corrected mean. Blind: two sealed pre-registrations,
each committed alone before its producer existed, scoring 33 of 37 and 34 of 37
folds inside the 90% bands (needed >= 28) with 0 of 37 outside 99.73%, and a
+25.4-nat margin over the constant-bias rival. Derived half: `M_p ~ k W1(theta_p)
exp(-delta theta_p/mbar_p)` with `W1` the exact endpoint comb of the two kill
classes, zero parameters, PROVEN residue counting; the free exponent on `ln W1`
reads 1.031 where the derivation says exactly 1. Custody residual on record: one
producer first exists in git 5m21s after its seal. `foldL-window5.md` §1, §2;
`perfold-error-model.md` §0; `mp-derivation.md` §0, §1.

**D7. The joint deficit's -0.41% to -0.48% offset. REAL as a residual, small, and
its quantifiers were restated.** Sign: the closed form `1 - J = 4 sum_(x<q<=sqrt W)
q^-2` over-reads. Size: the same relative offset at both new levels. Sigma: none
on the offset itself, and that is why it survives a restatement that killed the
old quantifiers: the registered `sigma_J` is a Poisson floor on the triple count
while the census walks natal slots whose triples are perfectly correlated, so it
understates by 2.11x at @29 and 2.12x at @31. Blind: the closed form is the last
law standing after two pre-registered rivals died at 2.99 and 9.80 sigma (6.35 and
20.81 on the registered sigma), with @29 a hit at `z = -0.90` registered and
`z = -0.43` corrected. `G2-STATE.md` §0; `history/staging/xchan-at29.md`.

**D8. The sub-Poisson rough-pair census error. MEASURED, and its control was never
run.** Sign: the error sits below `T` at every one of 1,206 anchors, its systematic
part is 0.1% at the top band with the favourable sign, and its exponent is 0.40
below the twin count's. Size: `chi^2/df = <E^2/Xmain>` reads 0.546 to 0.785 at
`u*` and 0.667 to 0.803 at the other depth, below 1 everywhere, with values as low
as 0.289. Blind: no. Control: **NOT RUN.** The note's own defects list says the
independent-thinning null that should return `chi^2/df = 1` was not run, and that
the dispersion has no mechanism. Load-bearing caveat carried by the same note: its
whole reading rests on the capture identity `floor_K = T - X(K)`, flagged there as
an UNVERIFIED PREMISE at the time of writing. `attack-roughpair-error.md` §0, the
`chi^2/df` table, and its defects list.

**D9. The pair correlation's forbidden band. REAL, PROVEN, and two-sided.** Sign:
neither repulsive nor attractive. Size: `g` takes 0 or a value `>= 2.38128` and
nothing in between; `g(2) = 0` by mod 3, and `g(6) = 6 prod_(5<=p<=x)(1 - 4/(p-2)^2)
= 2.661728` at `x = 11`. Sigma: none, exact. Control: exhaustive check to
`d = 2e6` at `x = 1009`. This closes both signs of association model and is
recorded in `REFUTED.md`. `import-repulsive.md` §1, §2.

**Two entries that fail their own controls, recorded so they are not banked.**
The zone tail's renewal surplus `t/R = 1.0619` at B4 has a bootstrap
[0.9937, 1.1321] containing 1, an exhaustive class-matched origin null gives the
same 1.0619, and three matched non-square endpoints see no difference at all (sign
tests `z` = 0.14, -0.54, 0.66, six paired intervals all containing zero), so
nothing there is a property of the endpoint being a prime square
(`zone-tail-01.md` §0). And the CRT-versus-independent excess sits in the **bulk**
(gaps 18, 30, 42 at every fold), never near the tail, which REFUTES the
pre-registered S5 in the opposite direction from the one predicted
(`import-thinning.md` §2.2).

---

## 4. Residue-level or interval-level

**The rule, and the expectation before applying it.** `THE-LENS.md` §5: a
statement phrasable in residues is free and probably classical; a statement
needing an interval, meaning a relation between the pattern and a stretch of the
number line, is hard, and the parity obstruction lives there. The expectation
going in was that nearly all of section 3 would come out residue-level. It does:
**seven of nine, plus both failed-control entries.** The two that need argument
are D3 and D5, and neither ends up carrying wall-relevant information, for
different reasons.

**D1, D2 (the origin deficit and `beta`'s descent): RESIDUE-LEVEL. Cannot touch
the wall.** The identity `origin(S)/mean(S) = rho_x(S)/rho_y(S)` looks
interval-level, since `rho_z(S)` is a count in the window `[0, S)`. The measured
content is what removes the interval: `rho_z(S)` depends on `u = ln S/ln z` and on
nothing else, and the same curve is returned by an arbitrary window of the same
size with no tile structure at all, to four decimals over the provable region
(`FOLD-PROFILE.md` §9a). So the window contributes only its length; nothing
distinguishes the origin's interval from any other, and the file's own conclusion
is that "the primorial window behaves exactly like an arbitrary window of the same
size ... the tile is a picture of it rather than a lever on it." `beta`'s descent
is the same constant reached by a Mertens correction series with zero parameters.
The corpus already banks this classification in the closure: "the origin as a
distinguished position at `S = x'^2`" is REFUTED and reversed
(`REFUTED.md`), and route B is CLOSED (`ZONE-POSTULATE.md` §6).

**D3 (Kourbatov's `b`): INTERVAL-LEVEL IN FORM, and blocked by a quantifier, so
still not wall-relevant. This is the entry that needs the most care.**

The object is a gap between actual twin primes, not a tile object: the ladder is
A113274/A113275, "the records are gaps between actual twin primes in the
integers" (`lit-kourbatov-shortfall.md` §3). So the statistic is a statement about
where twin primes sit on the number line, which is interval-level in form, and
that is why this entry cannot be dismissed the way D1 can.

Three lines decide how much of it is arithmetic rather than a property of the
trend's own finite-height form, and only the first has been run.

- **The null already carries some `b` of its own.** [ARITHMETIC on cited
  constants: `A_null = 0.9895` and `mean_k(1/L_k) = 0.06269`, both from
  `lit-kourbatov-shortfall.md` §4, §5.] Under the constant-`b` model
  `A(b) = 1 - b * mean_k(1/L_k)`, the null's own level implies `b_null = 0.167`
  and the data's implies `b_data = 1.125` in the same normalisation. So on the b scale the matched pure-Exp record process sits at 0.167 against the data's 1.125, about 15% of it. **State which baseline is meant: against a b = 0 baseline the null accounts for that 15%, while against the 6.06% deficit as the corpus measures it, which is measured relative to this null, the null accounts for none of it by construction. The remaining 0.96 on the b scale is not explained by the null's own level.** And the level itself is a 200-replicate simulation output, not a closed form. Custody, carried where the number is used: both inputs come from `lit-kourbatov-shortfall.md` §§4-5, whose producer carries no OUTPUT banner and is SCRATCHPAD-GRADE, so this arithmetic inherits that grade and none of it may leave staging until a producer carries a banner (redteam-0829-objects-zm.md §2 E10-E11). The
  hand arithmetic here is flagged, is a restatement of the note's own §5 table
  (which reads the same 6.06% deficit against the same null), and carries no
  new custody.
- **Whether the residual is a lattice artefact: NOT RUN.** Real twin gaps past the
  first are `0 mod 6` and the null draws a continuum; the effect is argued at
  1.7e-4 relative, two orders below the deficit, and no latticed null was written
  (`record-location-null.md` §3, §8).
- **Whether an ensemble comparison of this kind at `k = 2` already exists in
  print: NOT CHECKED**, and it is named as the largest open exposure in the note
  that closed the previous one (`lit-kourbatov-shortfall.md` §9,
  arXiv:1401.6959 skimmed only).

**Why it does not reach the wall even if the residual is arithmetic.** The
deficit is an average over 72 records, and the maximal-gap sequence is
conjecturally log-sparse, `N_c(x) < C log x`. Kourbatov-Wolf's own quantifier is
"a zero proportion of maximal gaps" are exceptions, and
`import-kw-zonegap.md` §2 states the consequence exactly: "the quantifier gap
between density-1 over a log-sparse record sequence and every `p` is unbridgeable
by any finite strengthening they offer", so one breaching record wholly inside
one zone breaks that zone. A statement about the average height of records
therefore cannot become an every-zone statement. Add that the whole comparison is
against a conjectural null (zero theorems in the source) and that the deficit is
6% of a polylog trend against a `p^2` window, and the entry is
**interval-level in form, wall-irrelevant in content, unexplained as a mechanism
in both corpora.** Grep for the deciding checks: `Q-record-deficit` in
`QUESTIONS.md` lists exactly two notes, `lit-kourbatov-shortfall.md` (ANSWERED)
and `record-location-null.md` (PARTIAL), and neither runs a latticed null, an
inhomogeneous-intensity null, or a height-decay test past 1e17.

**D5 (the lighter-than-renewal tile tail): RESIDUE-LEVEL. Cannot touch the wall,
and the reason is sharper than the classification.**

The gap spectrum of `T_x` over one full period is a census of the CRT product: the
histogram is a function of the residue pattern mod `x#` and needs no interval
input. Its leading structure is already classical in that sense, the mod-6 wheel
forcing `6 | g` and the alternation constraint putting the mode at 12 rather than
6 at every level (`gap-spectrum-01.md` §3a). Two further supports, both residue
statements:

- The steepness has a structural cause already proven here. Under the fold, two
  endpoints of a gap `g` die together only when `g = 0` or `+/-2 (mod p)`, in
  exactly `omega` of the `p` copies, and the qualifying gaps are all at least
  `theta = 2p - 2 eta`. So "CRT merges only at qualifying gaps, leaves the bulk
  alone, and makes far fewer of the long coalescences that build a heavy tail",
  while independent thinning "manufactures a tail out of nothing"
  (`import-thinning.md` §2.1, §2.2; the Merge Rate Identity PROVEN).
- The qualifying-gap fraction `f` is a singular-series comb on the minimal
  qualifying gap, and the diagonal is a staircase whose treads are the twin pairs
  (PROVEN, `U-FRAME.md` §12).

**The sharper reason.** Even granted in full, a statement about the SIZE
distribution of the tile's gaps is silent about PLACEMENT, and placement is what
the target needs. `TODO.md`'s TARGET rider says it in the corpus's own words:
past the point where counting certificates die, "the whole question is PLACEMENT,
whether the tile's rare wide gaps can sit exactly at the quadratic point". The
note's own §4c makes the same point mechanically: the exact identity
`G2 <= N + |B_N|` degenerates to `G2 <= N` on the whole grid, because the optimum
is always attained at the smallest `N` with `|B_N| = 0`, so the certificate "is
only small when `N` is already past `G2`" and never manufactures a bound. What
would decide the classification constructively, and has NOT run: whether the
deficit factor 2.087 / 2.241 derives at zero parameters from the qualifying-gap
constraint alone. Grep: `Q-gap-spectrum` is ANSWERED and derives nothing;
`Q-import-thinning` is ANSWERED with the deviation given as the moment
`Psi - Phi^2`, which is not a tail prediction.

**D4 (`Var/E`): the closed half is RESIDUE-LEVEL; the OPEN half is
interval-level, and it is still the wrong functional.** `Var/E = delta X` with
`X` a Fejer-weighted sum over shifts of the pair correlation `W(h)`, a product
over primes (`variance-note.md` Theorem 1, §8), and the model limit is a
generalised-Dickman statement about `ln n/ln y`. Both are residue-level. The one
unproven link, `Conjecture 1`, reduces to a weighted count of large `y`-smooth
divisors of `C(C^2 - 4)` averaged over a window of length `L = y^2`, whose owning
conventions are Ford's `H(x,y,z)`, Hooley's `Delta`, and the Erdos
multiplication-table problem: that is an interval statement, it is where the
difficulty sits, and the search has not been run
(`variance-note.md` §10, "the honest prior is against the estimate being available
at the precision needed"). But it is a second moment, and by the corpus's own
wrong-direction axes only `min_x N(x) >= 1` is the target. `anchored-note.md`
Proposition 1 makes the same point exactly: a bound admitting an exceptional
fraction `eps` decides the anchor only if `eps W < 1`, and the second-moment bound
misses that threshold by a factor 81 at @19, a figure that must never be quoted without naming its two ensembles, since the epsilon is the window ensemble's and the cardinality is the rotation ensemble's (`paper/wall-note.md`:261-262), with the gap growing like `ln^2 W`
(and the self-consistent re-readings of that pairing are larger misses, not
smaller, `wall-note.md` Face 1). So proving `Conjecture 1` would not touch the
wall either.

**D6 (`M_p`): RESIDUE-LEVEL.** The derived half is `W1`, the exact endpoint comb
of the two kill classes, obtained by counting the forbidden residue set
`{0, -2, -v, -v-2}` and its coincidences, PROVEN elementary residue counting with
zero parameters; the fold's `theta_p = 2(p - eta)` makes the classes the divisor
structures of `p - eta` and `p - eta -/+ 1` (`mp-derivation.md` §1). And the
identification is now exact rather than shaped: `W1` is the Hardy-Littlewood
singular-series ratio for `(0, 2, v, v+2)` over the twin series squared,
truncated to the folded primes and normalised by a `v`-independent constant,
PROVEN algebraically and VERIFIED as exact BigInt-rational equality
(`Q-w1-singular-series`, `history/staging/w1-singular-series.md`). A singular
series is a product over primes. Free.

**D7 (the joint-deficit offset): RESIDUE-LEVEL.** `1 - J = 4 sum_(x<q<=sqrt W)
q^-2` is a sum over primes and the offset is a residual on a census identity.
Free.

**D8 (the sub-Poisson rough-pair dispersion): INTERVAL-LEVEL IN FORM,
ELEMENTARY IN CONTENT.** The main term `C V_2(Q) rho(2)` is a product over
primes times the survival constant, hence residue-level; the error `E` is the
difference between an actual interval count and that main term, hence
interval-level in form. The control this row waited on RAN on 2026-08-29
(`measure-roughpair-null-0829.md`, HELD, red-teamed): the matched
independent-thinning null returns `1 - p` rather than 1, the deficit against it
survives at pooled `z = -5.87`, `-7.09`, `-11.39`, and a second null that makes
each prime's kill count in the window near-exact over-explains the deficit, the
measured value sitting 1.23 to 1.42 times above its prediction. The content is
therefore `floor(W/p)` against `W/p`, arithmetic of the window length and not of
the primes in it. Read at the rung the evidence supports and no higher: this is
MEASURED-based reasoning and not a theorem, the second null is a 40-anchor
subsample at 60 replicates that was not pre-registered, and it inserts two
things rather than one, an exact kill count AND exactly periodic kill positions
(`redteam-0829-measure-b.md` §1a A17, A19).

**D9 (the pair correlation's forbidden band): RESIDUE-LEVEL, exactly.** It is a
product over primes with `g(2) = 0` forced by mod 3.

**Summary.** Seven residue-level, one interval-level in form and blocked by a
quantifier, one interval-level in form and elementary in content. **Nothing on the list carries
interval-level information the wall could feel**, which is the starting position
of section 0 restated after the work rather than before it.

---

## 5. Direction: toward or away from the Zone Postulate

**The adverse ones first, and the corpus already states both.** The Zone
Postulate needs the largest gap SMALL relative to the window, so a deviation
points toward it when it makes the maximum smaller than the null and away when it
makes the density at the relevant width lower.

| deviation | direction | size | does the corpus already say it |
|---|---|---|---|
| D1 `rho(2) = 0.79305` | **AWAY** | the origin carries 20.7% less than the ensemble mean, and the zone width is exactly the argument where the curve bottoms out | yes, in three places: `TODO.md`:56 "`rho(2) = 0.793` is ADVERSE (the stretch sits at the survival minimum)"; `ZONE-POSTULATE.md` §6 "It reverses"; `REFUTED.md`, route closed and reversed |
| D2 `beta < 1` | **AWAY** for any argument wanting `beta >= 1`; NEUTRAL-to-favourable for Assumption A, which needs only `liminf beta > 0` | 1.156 -> 0.846 over ten levels, toward a conjectured positive limit `e^(2 gamma)/4` | yes: `anchored-note.md` §7 states the conditional theorem on positivity alone, and §9 prices that positivity as Hardy-Littlewood-strength |
| D3 the 6.0% record deficit | **TOWARD** | `Z2` runs 6% of trend, about 1.1 `abar`, below the pure-Exp model, and by `D = 0` this is a statement about `Z2` itself | yes, and with the right caveat: `record-location-null.md` §5, "the direction is the harmless one for the Zone Postulate, which needs `Z2` small. It has no proof value: 6% of a polylog trend does not touch the gap between polylog and `p^2`" |
| D5 the light tile tail | **TOWARD** | the maximum is a factor 2.087 to 2.241 below the renewal maximum; `\|B_N\|` is below the null everywhere it resolves; zero empty windows at `s = 1.75` where the null predicts 6.5e5 | yes: `gap-spectrum-01.md` §6c calls the heavy-tail route "closed at every level in reach, which is a statement about `x <= 31` and not about the asymptotics" |
| D4 `Var/E` sub-Poisson | TOWARD in the weak sense (less clumping, fewer empty windows) | 0.15 to 0.40 against Poisson's 1 | yes, and with the block: `anchored-note.md` Prop 1 proves measure-theoretic bounds cannot decide the anchored question |
| D6 the ~20% extinction overprediction | TOWARD | fewer multi-kill folds than the law predicts, so fewer long merges; the ratio to the independent-thinning null also falls with depth (2.5572 -> 0 across decades of `p`) | yes: `import-thinning.md` §1.4, "the true process is progressively further below independent thinning the deeper the fold, which is the safe direction" |
| D7 the joint-deficit offset | NEUTRAL | -0.41% to -0.48% | it is a residual on a census identity, not a statement about a gap |
| D8 the sub-Poisson rough-pair error | TOWARD on the numbers, and the same run moves the wall elsewhere | error below `T` at all 1,206 anchors, systematic 0.1% at the top band with the favourable sign, exponent 0.40 below the twin count's | yes, with the relocation stated in its own ledger verdict: the wall moves off the error term onto the DEPTH, where the slack at the crossing is 1.056 and falling and the main term alone is 5.6 times the twin count at the sifting limit |
| D9 the forbidden band in `g` | NEUTRAL | the tile is neither repulsive nor attractive, so no association model of either sign is available in either direction | yes: `import-repulsive.md` §0, "it buys nothing about the conjecture" |

**The margin, stated as budget and not as evidence.** Where the sign is
favourable the numbers are large and they are still budget: the zone margin at
the last published record is `p^2/(0.76 ln^3 p) = 1.12e29`
(`ZONE-POSTULATE.md` §4), the localized margin is measured at
`x^2/(3.5 ln^3 x)`, and `x^2/G2` on the eleven exact terms is flat at 2.08 to
3.26 while the certificate ladder's version climbs 2.6 -> 52.2 over a 108-fold
range in `x`. `TODO.md`:52-53 carries the standing marker, "Margin diverges like
`p^2/(3.9 ln^3 p)`: budget, never evidence", and
`two-class-lower-bounds.md` §10 carries the direction-of-inference warning that
must travel with the climbing curve: the certificate is a LOWER bound on `G2`, so
`x^2/certificate` is an UPPER bound on `x^2/G2`, and its growth does not by itself
prove `x^2/G2` grows. What the curve shows is that the best construction's share
of the window collapses, which is evidence for `ZONE-POSTULATE.md` §8 item 4 and
is not a proof and not a measurement of the truth.

**One asymmetry worth stating plainly.** The two adverse deviations, D1 and D2,
are the two whose direction is PROVEN or nearly so, and they sit at exactly the
width the target asks about. The favourable ones are all either confined to a
computable range (D5, `x <= 31`), the wrong functional (D4, a second moment), or
a few percent of a polylog (D3). That asymmetry is not a new finding; it is what
`REFUTED.md`'s closure of route B and `TODO.md`'s TARGET rider already say.

---

## 6. Inconsistencies found

**Six found, of which two are live-document defects, two are cross-note
disagreements the corpus has not reconciled, one is a stale range in a live
document that a sealed prediction will contradict when it scores, and one is a
framing error in the brief that this note declines to propagate.**

**I1. The zone tail's units are dropped in `TODO.md`.** `TODO.md`:51 reads
"tail ~ (0.58..0.77) `ln^2 p`". The source says those band means are in
`ln^2(p'^2)` units: `zone-tail-01.md`:19 ("band means 0.58..0.77 in
`ln^2(p'^2)` units, from `research/zonegap-01.js`'s `tailM: mean(z.tail /
l2(z.bound))`"), and the same file's table at :232 gives the B4 value in both
units, 0.7771 local and **3.1096 in `ln^2 p` units**, with :243 saying the
apparent factor of four "is `ln^2(p'^2) = 4 ln^2 p'` and nothing else". So the
live document understates the tail by a factor 4 against its own source. This is
the same defect class `maxgap-law.md` §4 names for `c`: report the coefficient
with its coordinates or do not report it.

**I2. `TODO.md`'s `Z2` band will be contradicted by a sealed prediction.**
`TODO.md`:50 reads "`Z2 ~ (3.4..4.0) ln^3 p` drifting".
`zonegap-03-prereg.md` T5, sealed at commit `f345adf` before any sweep past 1e11
exists, predicts new-band `c3 = 4.182 +/- 0.132` and full-decade `c3 = 4.117` at
`X = 1e12`, both above 4.0. The sweep is NOT RUN (LIGHT budget, priced at about
an hour), so this is a pending contradiction rather than a current one, and it is
recorded here so the range is updated when the prereg scores rather than quietly
left. A second, softer point in the same row: `zonegap-01`'s power-fit exponent
`e = 3.192` and the sealed whole-sweep `e = 3.332` are a different functional
from `c3` and must not be read as the same number.

**I3. Two in-house estimators of Kourbatov's `b` disagree by 15% on the same
data.** `lit-kourbatov-shortfall.md` §1 and §5: the `A` route reads 1.1251 and
the mean-`z` route 1.2981 on the same 72-record window, because `A` weights each
record by `1/L_k` and upweights the low records about sixfold, where the bottom
band carries `b = 0.713`. The note flags this itself and says only the median
route carries the four-digit match. It is recorded here because the headline
"6.0% deficit" and the headline "`b` matches to four digits" are two
normalisations of one dataset and are not two confirmations.

**I4. Two notes disagree on which published statistic the deficit matches, and
the earlier one was not corrected.** `record-location-null.md` §7 cites
Kourbatov 2013 Table 1's decade slopes (0.4576 -> 0.5628 against `log^3 p`) as
the in-print instance of the finite-height shortfall.
`lit-kourbatov-shortfall.md` §8 says that is a different statistic, a
least-squares zero-intercept trendline slope, and "the weaker of the two
available citations", the right ones being §5.1's `b` and §5.2's `mu*`. The
earlier note still reads as written; the correction lives only in the later note.
Same file, one further defect it records and the earlier note still carries:
`record-location-null.md` §3's mean-gap bullet cites an HL2 calibration ratio as
validating `abar`, where what it validates is `Li_2` and hence
Kourbatov-Wolf's `a_c(x)`, a different quantity that their eq (10) puts
`k/log x` away, 5% to 9% over this window.

**I5. The `Var/E` range is quoted without its window convention in one place.**
`GLOSSARY.md`:401-403 gives "Var/E drifting 0.152 -> 0.396 across @7..@37" and
`import-repulsive.md` §3 correctly separates the two ranges that exist,
"[0.152, 0.396] over `x = 7..37` on the comb diagonal" against
"[0.076, 0.845] over `u = 0.6..3.0` at `y = 401` on the full tile". The glossary
entry names the levels but not that it is the comb diagonal at `u = 2`, which is
the coordinate that distinguishes it from `variance-note.md` §6's table. Minor,
and the same class as I1.

**I6. A framing error in the brief, not in the corpus.** "The h2 control reading
1.57 where its truth is 1" conflates two objects: the control is one-class `h`,
reading 1.282 where its truth is 1, and 1.57 is `h2`'s control-corrected
exponent, whose truth is unknown with a proven floor of 1
(`exponent-control.md` §1, §3, §5). Recorded so it does not propagate.

**Where this note looked and found no inconsistency.** `G2-STATE.md` §3a against
`exponent-control.md` §5 (the exponent rows agree digit for digit, including the
raw 1.777 +/- 0.029 and the corrected 1.50 +/- 0.05).
`ZONE-POSTULATE.md` §4's `0.76 ln^3 p` against `import-kw-zonegap.md`'s
`1/C_(2,H) = 0.7574` (the same number, and the `C_2` notation collision is
flagged in both, plus in `lit-kourbatov-shortfall.md` §4).
`gap-spectrum-01.md` §3a's maxima against `G2-STATE.md` §2's exact ladder (the
producer asserts equality at every level and matches at all nine).
`origin-excess.md`'s 0.79305, `FOLD-PROFILE.md` §9's 0.7931 and
`anchored-note.md` §7's 0.793055 (one constant, three roundings, all cited to
`e^(2 gamma)/4`). The hyperuniformity vocabulary defect that
`import-repulsive.md` §3 recorded as unfixed HAS since been fixed in the two
live documents it named: `GLOSSARY.md`:422-445 now carries Torquato's definition
and the explicit "NOT hyperuniformity" cross-reference, and
`FOLD-PROFILE.md`:116 now reads "sub-Poisson dispersion in the copy index, and
not hyperuniformity in Torquato's sense"; `discrepancy-two-class.md` and
`level-ledger-tight.md` no longer contain the word;
`sift-limit-attack.md`:392 uses it in a literature citation, correctly. What
remains is one producer's header comments
(`natal-cap-29-sigma-plateau.js`:2, 7, 28), which are not a live document.

---

## 7. Cheap unknowns

**None was run, and section 0 says so.** The bar set for this note was: run one
only if it is decisive for section 4's classifications AND under about twenty
minutes AND its prediction and falsifier can be written down first. Ranked below
by what each would say about section 4, the top item fails the twenty-minute test
once a pre-registration and an output-custody producer are priced, and the second
fails the decisiveness test by the corpus's own order-of-magnitude argument. Each
carries the grep showing it has not run and a TPC-strength label read against
`attack-wrongdirection-audit.md` §1.

**C1. The inhomogeneous-intensity record null: how much of Kourbatov's `b` is the
trend's own finite-height form?** Replace the fixed-`abar` exponential of
`record-location-null.md` §4 with a Poisson process of intensity `1/abar(x)`
varying continuously across the window, re-derive the record process, and read
`b`. **What it would decide:** section 4's hardest classification. The matched
null already implies `b_null = 0.167` against the data's 1.125 [ARITHMETIC,
section 4], so this measures how much of the residual 0.96 is calculus on `abar`
rather than arithmetic on twin primes. **Grep showing it has not run:**
`Q-record-deficit` in `QUESTIONS.md` lists only `lit-kourbatov-shortfall.md` and
`record-location-null.md`; `grep -in "inhomogeneous" research/QUESTIONS.md`
returns nothing, and `record-location-null.md` §4's corrected-null formula fixes
`abar(x) = ln^2 x/(2 C_2)` as the local mean without varying it inside a record's
own span. **Cost:** roughly fifteen minutes of compute on the existing 15.4 s
producer, plus the prereg and the embed. **TPC-strength:** NONE, category (i)
strictly weaker: it is a null-side calibration and produces no statement about
`T`. **Not run here** because the note is a reading pass and the producer would
need a sealed prediction and an OUTPUT banner before any figure could leave the
file; the existing `record-location-null.js` is itself SCRATCHPAD-GRADE and
outside output custody, which is the standing constraint on this whole family.

**C2. The latticed record null.** Same ensemble with gaps drawn on `6Z`. **What it
would decide:** whether any of `b` is a lattice artefact. **Grep:**
`record-location-null.md` §8, "The deficit is the gap lattice. NOT RUN. Argued at
1.7e-4 relative, two orders below the effect. A latticed null would settle it and
has not been written." **Cost:** minutes. **TPC-strength:** NONE. **Not run:**
the note's own argument already bounds it two orders below the effect, so it is
not decisive for section 4.

**C3. A zero-parameter prediction of the tail-deficit factor.** Take the exact
compound-geometric thinning of the previous level's own histogram, which already
exists as an instrument (`import-thinning-01-nullmodel.js`, and the reference law
of `import-thinning.md` §2.2), carry the qualifying-gap constraint
`g = 0, +/-2 (mod p)` through the ladder, and predict the ratio of the tile's
maximum to the renewal maximum at @29 and @31 against the measured 0.446 and
0.479. **What it would decide:** whether D5's residue-level classification is
constructive rather than inferred. **Grep:** `Q-gap-spectrum` is ANSWERED and
derives nothing (its verdict measures the deficit); `Q-import-thinning` is
ANSWERED with the deviation given as the moment `Psi - Phi^2`, which is not a
tail prediction; no question id joins them. **Cost:** minutes at T23, about an
hour to reach T31 on the segmented lever. **TPC-strength:** NONE.

**C4. The control the rough-pair note names.** Run an independent-thinning null on
the same 1,206 anchors, which should return `chi^2/df = 1`, and compare against
the measured 0.546 to 0.803. **What it would decide:** section 4's one
unclassified row, D8. **Grep:** `attack-roughpair-error.md`'s own defects list,
"the sub-Poisson dispersion (`chi^2/df` as low as 0.289) has no mechanism ... an
independent-thinning null should return `chi^2/df = 1`; that control was not
run"; `Q-roughpair-error` in `QUESTIONS.md` is PARTIAL and its verdict does not
mention a null. **Cost:** under an hour. **RUN** 2026-08-29, 56.7 s
(`measure-roughpair-null-0829.md`, HELD, red-teamed); `Q-roughpair-error` stays
PARTIAL. **TPC-strength:** NONE for the control
itself; the surrounding item Z2 is labelled **(ii) TPC-strength** by
`attack-wrongdirection-audit.md` §3.1 and §3.8, so the control must be reported as
a null-side measurement and never as progress on the certificate.

**C5. The @37 gap spectrum, bounded-window form.** `gap-spectrum-01.md` §0 prices
the full walk at @37 as OUT OF BUDGET (1.24e12 cells), but the standing compute
lever makes a bounded-window version reachable. **What it would decide:** whether
the far-tail slope's relaxation over the last two decades at @31, which the note
explicitly refuses to bank as a one-level observation, survives. **Cost:** above
four hours in the full form; the bounded form is unpriced. **TPC-strength:** NONE.

**C6. `Var/E` at `x = 41`.** Priced at roughly forty times `x = 37` and declined
(`variance-note.md` §7, §10), and by its own registered forecast band it "would
retire one drift form and separate nothing else". Neither cheap nor decisive;
listed so it is not proposed again as cheap.

---

## 8. Questions not in QUESTIONS.md

**Understanding questions only, ranked by what they would clarify about sections
3 and 4. None re-proposes a route in `REFUTED.md`**, checked against all 67 rows:
in particular Q6 below does not reopen "the origin as a distinguished position at
`S = x'^2`" (REFUTED and reversed), and nothing here proposes a repulsive
point-process model (CLOSED, both signs) or thinning as a route (CLOSED).

**Q1. Does the null's own `b` have a closed form in the trend's parameters?**
Under `A(b) = 1 - b * mean_k(1/L_k)` the matched pure-Exp ensemble implies
`b_null = 0.167`, so isolating the arithmetic residual needs that number as a
function of the window and the trend rather than as a simulation output. **Grep:**
`grep -in "b_null" research/QUESTIONS.md` returns nothing; no id in the ledger
carries the null's own shortfall coefficient. **TPC-strength:** NONE.

**Q2. Does the tile's gap-spectrum body slope converge, and to what?** Two
statistics in the same file disagree about the answer: the by-decade body slope is
nearly flat (-1.3638 at @29, -1.3302 at @31), while the whole-range OLS slope
steepens at every step but one (-1.5484 at @13 to -2.0283 at @31). The first says
a shape parameter, the second says a mixture whose composition is moving. The note
does not reconcile them and the ledger does not ask. **Grep:** `Q-gap-spectrum`
asks for the distribution, the excess functional and the sifting onset; nothing
about the limit of the slope. **TPC-strength:** NONE.

**Q3. Are `M_p` and the tail's steepness the same object?** Both are the
qualifying-gap constraint `g = 0, +/-2 (mod p)` read once as a kill-pair weight
and once as a merge law, and `W1` is now identified exactly as the
Hardy-Littlewood singular-series ratio for `(0, 2, v, v+2)`
(`Q-w1-singular-series`). If they are one object, one derivation covers the
extinction law's ~20% systematic and D5's deficit factor together. **Grep:**
`Q-mp-derivation`, `Q-w1-singular-series` and `Q-gap-spectrum` are three separate
ANSWERED entries and none cites another. **TPC-strength:** NONE.

**Q4. Is the measured gap-spectrum dispersion consistent with the exact variance?**
`sd/mean = 0.7270` at @31 and `Var/E = 0.3876` on the comb diagonal at `x = 31`
are two second-moment readings of the same tile, and both are functionals of the
same pair correlation `W(h)` (`variance-note.md` Theorem 1). Whether they are
consistent at the matched window has not been checked, and a mismatch would be a
custody event on one of the two engines. **Grep:** no id joins `Q-varE-limit` and
`Q-gap-spectrum`. **TPC-strength:** NONE.

**Q5. Are `c` and `b` two readings of one surface?** `maxgap-law.md` §5 identifies
`c` as the reciprocal of the gap tail's exponential rate at the extreme, and
Kourbatov's `b` is a location shift on the same kind of extreme-value curve for the
twin-prime ladder. If they are the same surface at two heights, the corpus's own
"report `c` with its coordinates" rule applies to `b` as well, and `b`'s
non-monotone height profile (0.713, 1.816, 1.620, 0.937 across four bands) is band
composition rather than a trend. **Grep:** `Q-maxgap-law` and `Q-record-deficit`
never meet in `QUESTIONS.md`. **TPC-strength:** NONE, and the answer would be a
taxonomy statement.

**Q6. Are the 20.7% origin deficit and the 6.0% record deficit unrelated?** They
are different sizes and different objects (a density at `u = 2` against a height
against a trend), so the prior is that they are unrelated; nobody has asked, and
the answer "unrelated, for this reason" is worth one line in the corpus because
both are quoted as "the deficit" in different files. **Grep:** `Q-origin-excess`
and `Q-record-deficit` never meet. **TPC-strength:** NONE. This asks about two
measured constants and proposes no origin advantage.

---

*History layer: process record, staging. HELD, awaiting an adversarial pass;
nothing here is integrated into a live document, no existing file was edited and
no git command was run. See `research/history/CHANGELOG.md` for the corpus rule.*
