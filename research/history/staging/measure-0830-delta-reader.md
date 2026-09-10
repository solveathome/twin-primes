# TODO 1d: a δ-reader that passes its control — the diagonal meter's failure diagnosed, four alternative readers pre-registered against synthetic laws and the one-class control, and scored

<!-- ledger
id: Q-delta-reader-0830
status: ANSWERED
todo: 1d
question: Can any instrument read the sign of the log-power correction delta in G2 ~ c n^beta (ln n)^delta at reach 79, passing the one-class control first?
verdict: No. Six readers were pre-registered against stepped synthetic laws and the one-class control; the four power-chain readers (the diagonal meter among them) are killed by the P(n) stepping alone, the joint fit is calibrated but reads the control's finite-reach delta NEGATIVE (-0.38 +- 0.14 at 64 terms) where its conjectured asymptotic delta is +2, and the one reader that passes does so by importing the exponent, its sign being the sign of (1.777 - beta_hat). delta's sign for G2 is unreadable at reach 79 by any instrument tried, and the control shows a finite-reach reading would not carry the asymptotic sign anyway; item 1d's all-bases form stays unattackable.
-->

*2026-08-30. Producer: `research/history/staging/measure-0830-delta-reader.js`
(formal embed via `research/qc/embed.js`). Arithmetic only: no enumeration,
no new `G₂` value; the three ladders are parsed at run time from the corpus
keepers named in `attack-0829n-hsubpow-K.md` §6 (`exact-g2-ladder.js`,
`import-interp-01-bgt-defect.js`, `exponent-control.js`). No existing file
edited, no git command run. HELD, awaiting the standing adversarial pass.
Legend as in `attack-0829n-hsubpow-K.md`: **[PROVEN]**, **[VERIFIED]**,
**[MEASURED]**, **[INFERRED]**, **[CITED]**, **[HEURISTIC]**.*

---

## 0. The verdict, up front

> **No reader of `δ`'s sign passes its controls at reach 79, and the
> control shows why none can: the one-class Jacobsthal ladder's
> finite-reach `δ`, read by five independent instruments, is NEGATIVE
> (`−0.36` to `−0.77`, each more than two standard errors below zero at 64
> terms)
> while its conjectured asymptotic `δ` is `+2`.** At these reaches the
> finite-reach log power does not carry the asymptotic sign, so a `G₂`
> reading from a perfect instrument would still not decide the sign lemma's
> condition. Item 1d's all-bases form stays unattackable by measurement.

What is open first: the sign of `δ` for `G₂`, exactly as before. What moved:

1. **The diagonal meter's failure is diagnosed, and the 2026-08-29
   calibration was on the wrong object.** The meter was calibrated on
   continuous laws; a ladder can only present a *stepped* law
   (`Ĝ(n) = V(P(n))`), and on a stepped exact law with `δ = 1` the meter
   reads `δ̂ = −0.29`, with `δ = 0` it reads `−0.34`: the `P(n)` rounding at
   `b²` (up to `−0.683` nats at `b = 10`) flattens its resolution below
   `δ ≈ 1`. Stepping alone does not flip a `δ = 2` law (reads `−2.12`), so
   the control's `+0.52` is not rounding; it is the object. **[VERIFIED]** (§2)
2. **Every power-chain reader dies of the same stepping.** R0, RA, RC2, RC
   all read a negative `δ̂` at true `δ = +1` on stepped synthetic laws in
   both geometries. Killed at the pre-registered S1/S2. **[VERIFIED]** (§4)
3. **The joint 3-parameter fit RD is calibrated (resolves `δ = ±1` with
   `P = 1.00` under the control's residual noise, sd `0.16` at 64 terms) and
   reads the real control `−0.38 ± 0.14`.** With four other readers agreeing
   on the sign, this is the finite-reach truth of the control in the readers'
   sense, and it has the wrong sign against the conjecture. On windows it
   swings `+1.12 ± 0.44` to `−1.16 ± 1.05`: no window-stable `δ`. Killed at
   C1/C2 by the pre-registration, and per §3b's pre-declared expectation the
   kill is the object's, not the instrument's. **[MEASURED]** (§4)
4. **The one reader that passes, RB, passes by importing the exponent.** Its
   `G₂` reading `0.80 ± 0.09` at `β̂ = 1.50` runs from `+1.38` to `−0.07`
   across the exponent bracket and crosses zero at `β̂ = 1.777`, the raw
   log-log slope of `exponent-control.md` §5 to three places. Its sign is the
   sign of the bias correction, which that note derives *from* a positive log
   power. Circular; reported, not banked. **[MEASURED, void on the sign]** (§5)
5. **A brief correction.** The control does not "know" `δ = 2`: the
   Maier–Pomerance statement is `x(log x)^{2+o(1)}` with the `o(1)` in the
   exponent unconstrained at finite reach (§1, fifth row). The pre-registration
   was written to demand the sign only. **[CITED]**

Nothing here moves the wall, and nothing here bounds `Ĝ` in any direction.

---

## 1. What is being read, and what the brief claims

Write `Ĝ(n) = G₂(P(n)#)`, `P(n)` the largest prime `≤ n`, `f = ln Ĝ`; the
control is `ĥ(n) = h(P(n)#)` on OEIS A048670 (64 terms to `p = 311`,
`exponent-control.md` "The control"). The object of interest is the sign of
`δ` in a law `Ĝ ~ c·n^β·(ln n)^δ`, by the sign lemma
(`attack-0829n-hsubpow-K.md` §3b, **[PROVEN]** for exact laws): the all-bases
(H-sub-pow) holds with finite `K` iff `δ ≥ 0`.

**The brief's claims, verified at their records before use.**

| claim in the brief | record | status |
|---|---|---|
| diagonal meter `D(b,1) = f(b²) − 2f(b)`, slope on `ln ln b` is `−δ` for an exact law | `attack-0829n-hsubpow-K.md` §2d, one line | VERIFIED (re-derived: `D = −ln c + δ ln 2 − δ ln ln b`) |
| control reading `+0.5157 ± 0.1969` on 16 bases | producer SEC E block of that note | VERIFIED at the record; reproduced digit for digit below (§2) |
| `G₂` reading `+0.0961 ± 0.4137` on 8 bases | same | VERIFIED; reproduced (§2) |
| "synthetic exact laws return δ to 1e−9" | same, check line | PARTLY: the `1e−9` check is on the `δ = 2` law only; the `δ = 0` and `δ = −1` laws are printed to four places. Immaterial. |
| the control's law "has δ ≈ 2" | `exponent-control.md` "The control"; `maxgap-law.md` §7 (FGKMT p. 4 verbatim, checked at source 2026-08-17) | **BRIEF IMPRECISE.** What is conjectured (Maier–Pomerance 1990, as stated by FGKMT, JAMS 31 (2018) p. 4) is `Y(x) ≪ x(log x)^{2+o(1)}`, an upper-bound conjecture with an unspecified `o(1)` in the exponent of the logarithm; the equality form `J(T) = T(log T)^{2+o(1)}` is Ford's 2018 Montreal slides. Neither fixes `δ = 2`, neither fixes a constant `c`, and the `o(1)` is unconstrained at any finite reach. The proven side is FGKMT's `Y(x) ≫ x log x log₃x/log₂x` (their eq. 1.2, **[CITED]** via `maxgap-law.md`), which gives no exact-law `δ` either. The corpus's own measurement at reach 311 (`exponent-control.md` §2): with `β` pinned at 1 the fitted log power is `1.000` on 56 terms, and the frozen `p·log²p` shape is "refuted on this range" (rms 0.281). So the control's `δ` **at its own reach** is not 2 and is not known; what is known is only that the asymptotic exponent of the logarithm is conjectured `2 + o(1)`. |
| "Hagedorn-type heuristics" as a source for the conjecture | not in the corpus | NOT CONFIRMED; Hagedorn 2009 is a computation of `h(n)`, `n < 50`, and is not cited here for the conjecture. Not used. |
| `G₂`'s 22 trusted terms reach `x = 79` | `import-interp-01-bgt-defect.js` `PR` array | VERIFIED (producer check line) |
| the one-class ladder is 64 terms to 311 in `exponent-control.js` | `const H` there | VERIFIED (producer check line) |

The consequence of the fifth row is carried through the whole design: **the
control does not "know" its δ at reach 311.** What the control knows, at the
level of a widely held conjecture, is the SIGN of `δ` (positive, `2 + o(1)`)
and the exponent (`1 + o(1)`). So a control criterion here can demand the
sign, and can only *report* the magnitude. That is weaker than the brief
supposed and it is the honest version.

## 2. Custody and diagnosis of the diagonal meter

**2a. Custody.** Producer SEC A–B: three ladders parse (14, 22, 64 terms),
the two `G₂` ladders agree on their 14 shared terms, last terms
`G₂(79#) = 1710`, `h(311#) = 1110`. R0 reproduces the 2026-08-29 block digit
for digit: control 16 bases `+0.5157 ± 0.1969`, control 8 bases
`+0.5298 ± 0.3018`, `G₂` 8 bases `+0.0961 ± 0.4137` (check lines pass at
`5e−5`). **[VERIFIED]**

**2b. Which bases, which reach (SEC C1–C2).** The control's slope is positive
at every reach `bmax = 5..17` (`0.286` to `0.735`), so the sign does not
flip with reach. Leave-one-out: dropping `b = 2` gives `0.733`, dropping
`b = 3` gives `0.349`, the other fourteen sit in `0.476` to `0.569`; no
single base carries the reading, the two smallest bases are the influential
ones. Tail-only windows `b ≥ 8` turn negative (`−0.633 ± 0.89`,
`−1.705 ± 1.00`, `−1.976 ± 1.36`) at about one standard error each, which is
not a flip. The `P(n)` rounding gap `ln(b²/P(b²)) − 2 ln(b/P(b))` reaches
`−0.683` at `b = 10` and `−0.478` at `b = 9`: the same order as the `D`
values it enters (`0.948`, `0.693`). All rungs are `k = 1` by construction of
the meter. **[MEASURED]**

**2c. Stepping isolated (SEC C3).** An exact law `c·p^β (ln p)^δ` with
`β = 1`, `c` matched to `1110` at `311`, sampled at the control's 64 primes,
integer-rounded, then stepped exactly as a real ladder is, gives R0 at
`b = 2..17`:

| `δ` | slope (se) | `δ̂` | exact (continuous) |
|---|---|---|---|
| 2 | `2.1178 (0.4405)` | `−2.12` | `−2.0000` |
| 1 | `0.2948 (0.3808)` | `−0.29` | `−1.0000` |
| 0 | `0.3398 (0.1584)` | `−0.34` | `−0.0000` |
| −1 | `1.1700 (0.0790)` | `−1.17` | `1.0000` |

So the 2026-08-29 line "synthetic laws return `−δ` to `1e−9`" is true of the
continuous law and false of the only object a ladder can present; the brief
carried that line forward. Stepping does not flip the sign of a `δ = 2` law
at this reach, but it collapses `δ = 0` and `δ = 1` onto each other
(`−0.34` against `−0.29`). **[VERIFIED]**

**2d. The `1 + a/ln n` family (SEC C4).** With a small-`n` factor on the
stepped law, the cells within one standard error (`0.197`) of the observed
`+0.516` are `(δ = 2, a = 30)` at `0.398`, `(δ = 1, a = 10)` at `0.376`,
`(δ = 1, a = 30)` at `0.321` and `(δ = 0, a = 0)` at `0.340`. A `δ = 2` law
reproduces the meter's control reading only with `a = 30`, which is not a
small correction anywhere on the ladder (`ln p` runs `2.40` to `5.74`,
`maxgap-law.md` §7, **[CITED]**). This is a model grid, not a fit.
**[HEURISTIC]** Read with `exponent-control.md` §2 (pinned `β = 1`, log
power `1.000` on 56 terms; frozen `p·log²p` "refuted on this range"): the
meter's reading is what the control's finite-reach shape produces, not an
instrument artefact on top of a `δ = 2` law.

## 3. PRE-REGISTRATION (written before any reader ran on any ladder)

### 3a. The readers

All readers take a ladder `(p_i, V_i)` and the step function
`Ĝ(n) = V` at `P(n)`. Every fit is ordinary least squares; error bars are
the OLS standard error; `p = 2, 3` are excluded from ladder-point fits as in
`exponent-control.md` ("p = 2 and 3 excluded as in every fit here").

- **R0, the diagonal meter** (the failed one, kept as custody):
  `D(b,1) = f(b²) − 2f(b)` on `ln ln b`, `b = 2..⌊√reach⌋`; `δ̂ = −slope`.
- **RA, second differences along power chains.** For an exact law,
  `f(b^{k+1}) − 2f(b^k) + f(b^{k−1}) = δ·ln(1 − 1/k²)` (**[PROVEN]**, two
  lines from `f(b^k) = ln c + βk ln b + δ ln k + δ ln ln b`; `c` and `β` both
  cancel). Regress the left side on `ln(1 − 1/k²)` through the origin over
  every `(b,k)` with `k ≥ 2`, `b^{k+1} ≤ reach`. Note the lever arm:
  `ln(1 − 1/k²)` is `−0.288, −0.118, −0.065, −0.041` at `k = 2..5`, so a
  rounding error of `0.1` nats in one `f` value moves `δ̂` by `0.35` to
  `2.5`. This reader is expected to be noisy; it is included because it is
  the one that cancels both nuisance parameters exactly.
- **RB, pinned exponent.** `δ̂ = ` slope of `f(p_i) − β̂ ln p_i` on
  `ln ln p_i` over ladder primes `p_i ≥ 5`, with `β̂` supplied externally.
  For `G₂`, `β̂ = 1.50` (the control-corrected central of
  `exponent-control.md` §5, **[CITED]**), scanned over the bracket
  `{1.3, 1.4, 1.5, 1.6, 1.777, 1.8}`. For the control, the control-corrected
  `β̂` is `1` by construction of the equal-bias transfer, so RB on the
  control is the `c·p·log^a p` fit of `exponent-control.md` §2 and is
  **circular as a control** (it assumes the exponent it is meant to test);
  stated, and scored anyway. Sensitivity: `∂δ̂/∂β̂ = −Σ(x−x̄)(u−ū)/Σ(u−ū)²`
  with `x = ln p`, `u = ln ln p`, printed by the producer.
- **RC2, the ratio reader on the base-2 chain only.** `r_k = f(2^{k+1}) −
  f(2^k) = β ln 2 + δ ln((k+1)/k)`; OLS of `r_k` on `ln((k+1)/k)` with
  intercept; `δ̂ = slope`. Five points at `G₂`'s reach (`k = 1..5`), seven
  on the control (`k = 1..7`).
- **RC, the ratio reader on all power pairs.** `r_{b,k} = f(b^{k+1}) −
  f(b^k) = β ln b + δ ln((k+1)/k)`; two-parameter OLS through the origin on
  `(ln b, ln((k+1)/k))` over all `(b,k)` with `b^{k+1} ≤ reach`; `δ̂` is
  the second coefficient. 15 pairs at `G₂`'s trusted reach, 29 on the control.
- **RD, the joint fit.** `f(p_i) = a + β ln p_i + δ ln ln p_i`, OLS over
  `p_i ≥ 5`; `δ̂` with its OLS standard error. The collinearity of `ln p`
  and `ln ln p` over the ladder is printed.

### 3b. What each reader must return (acceptance), and the kill rule

**(i) Synthetic laws with realistic rounding.** `V_i = max(2, round(c·p_i^β·
(ln p_i)^δ))` on the *control's* 64 primes (`β = 1`) and on `G₂`'s 22 primes
(`β = 1.5`), `c` fixed so that the last term matches the real ladder's last
term (`1110`, `1710`), for `δ ∈ {−1, 0, +1, +2}`; the step function is then
applied exactly as on the real ladders, so every reader sees the same
rounding a real sequence would impose.

- **S1 (must hold, control geometry, 64 terms):** `|δ̂ − δ| ≤ 0.5` for all
  four `δ`.
- **S2 (must hold, `G₂` geometry, 22 terms):** `|δ̂ − δ| ≤ 1.0` for all four
  `δ`, and the sign of `δ̂` correct for `δ = ±1, +2`.
- **S3 (reported, not scored): power under noise.** Multiplicative white
  log-noise of sd `0.055` (the control's power-fit residual rms,
  `exponent-control.md` §2 row 1, **[CITED]**) on the synthetic law before
  rounding, 400 seeded draws (mulberry32, seed 20260830): the sd of `δ̂` and
  the fraction of draws with the correct sign at `δ = ±1`, both geometries.
  A noise model is a modelling choice; it is stated so that "resolves the
  sign" has a number attached.

**(ii) The one-class control, real A048670.**

- **C1 (must hold):** at the control's full reach (64 terms), `δ̂ > 0` and
  `δ̂ − 2·se > 0`: the sign the conjecture asserts, resolved at two standard
  errors. Magnitude is reported against the soft band `[0.5, 2.5]` and is not
  scored, per §1.
- **C2 (must hold for the reader to be USED on `G₂`):** on the control
  truncated to `G₂`'s reach (22 terms, `p ≤ 79`, reach 82), `δ̂ > 0` and
  `δ̂ − 1·se > 0`. A reader that cannot see the control's sign at reach 82
  cannot be trusted to see `G₂`'s at reach 82.

**Kill rule.** A reader failing S1 or C1 is killed: its `G₂` reading is
withheld by the producer (printed as "withheld") and is not quoted. A reader
passing S1 and C1 but failing S2 or C2 is "calibrated at 311, blind at 82":
its `G₂` reading is withheld likewise. Only a reader passing all four is
reported on `G₂`, as MEASURED, with the OLS error bar and the caveat that a
log-power exponent at reach 79 is a bracket.

**Pre-declared expectation, so it can be scored too.** Given §1's fifth row
(the control's measured log power at pinned `β = 1` is `1.0` at reach 311 and
the local power-law exponent RISES with prefix length, `1.191 → 1.282`,
`exponent-control.md` §1), the finite-reach effective `δ` of the control may
itself be at or below zero in the readers' sense, in which case *no* reader
passes C1 and the failure is the object's, not the instrument's. That is the
base-rate outcome the brief names, and it would be scored as "unreadable",
not as "the readers are wrong".

## 4. Scores

**4a. Synthetic laws, stepped and rounded (SEC D; S1 tolerance `0.5` at 64
terms, S2 tolerance `1.0` and correct sign at 22 terms).** `δ̂` at true
`δ = −1, 0, +1, +2`:

| reader | control geometry (64) | S1 | `G₂` geometry (22) | S2 |
|---|---|---|---|---|
| R0 | `−1.170, −0.340, −0.295, −2.118` | FAILS | `−1.441, −0.804, −0.993, −3.001` | FAILS |
| RA | `−1.311, −0.563, −0.341, −1.721` | FAILS | `−1.810, −1.284, −1.286, −3.011` | FAILS |
| RB (true `β` supplied) | `−1.002, −0.001, 1.011, 1.908` | holds | `−0.999, 0.005, 1.001, 1.958` | holds |
| RC2 | `−1.128, −0.411, −1.293, −2.134` | FAILS | `−1.463, −0.920, −1.700, −3.151` | FAILS |
| RC | `−1.216, −0.353, −0.022, −1.599` | FAILS | `−1.639, −1.002, −0.949, −2.686` | FAILS |
| RD | `−1.018, −0.010, 1.071, 1.345` | FAILS (at `δ = 2` only) | `−1.006, 0.039, 1.025, 1.700` | holds |

Every power-chain reader reads a negative `δ̂` at true `δ = +1` in both
geometries, and R0 reads `−3.0` at true `δ = +2` in `G₂`'s geometry: the
`P(n)` stepping at `b^k` is fatal to the chain family at these reaches, not a
correction to it. RD is calibrated within `0.07` for `δ ∈ {−1, 0, 1}` at 64
terms and under-reads `δ = 2` by `0.655`, failing S1 on the letter; it is
carried forward as the one non-circular calibrated reader. RB with the true
exponent supplied is exact, which is what "supplied the answer" looks like.
**[VERIFIED]**

**4b. Power under noise (S3, reported, not scored).** Under white log-noise
of sd `0.055`, 400 seeded draws: RD resolves `δ = ±1` with `P(sign right)
= 1.00` in both geometries (sd `0.16` at 64 terms, `0.32` at 22); RB
likewise (sd `0.02`, `0.05`, exponent supplied); the chain readers at
`δ = +1` have `P = 0.00` to `0.45`. The lever arms of RA are `−0.2877,
−0.1178, −0.0645, −0.0408` at `k = 2..5`, so a `0.1`-nat error in one `f`
moves its `δ̂` by `0.35` to `2.45`, as pre-registered. **[MEASURED]**

**4c. The real control (SEC E).**

| reader | reach 312 (64 terms) | C1 | reach 82 (22 terms) | C2 |
|---|---|---|---|---|
| R0 | `−0.5157 ± 0.1969`, n = 16 | FAILS | `−0.5298 ± 0.3018`, n = 8 | FAILS |
| RA | `−0.7735 ± 0.2245`, n = 13 | FAILS | `−0.8562 ± 0.3371`, n = 7 | FAILS |
| RB, `β̂ = 1` | `+1.0235 ± 0.0399`, n = 62 | holds | `+0.6961 ± 0.0796`, n = 20 | holds |
| RC2 | `−0.3637 ± 0.1725`, n = 7 | FAILS | `−0.3341 ± 0.2364`, n = 5 | FAILS |
| RC | `−0.5939 ± 0.1462`, n = 29 | FAILS | `−0.7087 ± 0.2081`, n = 15 | FAILS |
| RD | `−0.3837 ± 0.1404`, n = 62 | FAILS | `−0.6207 ± 0.4889`, n = 20 | FAILS |

Five readers that fit or cancel the exponent agree on a negative sign at
reach 312 (RD's own `β̂` is `1.384`, RC's `1.469`, RC2's `1.405`: the rising
local exponent of `exponent-control.md` §1 seen from the other side). RB at
pinned `β̂ = 1.282`, the control's raw fit, reads `−0.010 ± 0.03`: RB's sign
is the sign of `(β_raw − β̂)`, sensitivity `−3.6662` per unit `β̂`
(`corr(ln p, ln ln p) = 0.9849`). RD on windows: `[23, 311]` `+1.12 ± 0.44`,
`[79, 311]` `−1.16 ± 1.05`, `[127, 311]` `+1.99 ± 2.44`; there is no
window-stable `δ` on the control. **[MEASURED]**

**Scoring against §3b's pre-declared expectation.** The expectation was that
the control's finite-reach `δ` might itself be at or below zero in the
readers' sense, in which case no reader passes C1 and the failure is the
object's. That is what happened: the calibrated reader RD, which resolves
`|δ| = 1` with certainty under the control's own noise level, reads the
control negative at more than two standard errors, and four uncalibrated
readers agree on the sign. The pre-registration's C1 was failable by the
object, and the object failed it.

## 5. `G₂`: one reader passed the gate, and what it read is not a sign

The gate (SEC F) withheld the `G₂` readings of R0, RA, RC2, RC and RD. RB
passed all four criteria and read, on the 22 trusted terms at reach 82,
`δ̂ = 0.8024 ± 0.0875` (OLS, n = 20, `β̂ = 1.50` from `exponent-control.md`
§5). Over the exponent bracket: `1.381` at `β̂ = 1.3`, `1.092` at `1.4`,
`0.802` at `1.5`, `0.513` at `1.6`, `0.001` at `1.777`, `−0.066` at `1.8`;
sensitivity `−2.8949` per unit `β̂`, `corr(ln p, ln ln p) = 0.9902`.

**How to read it, calibrated.** MEASURED, conditional on `β̂`: for
`β̂ = 1.50`, `δ̂ = 0.80`, with the OLS bar `±0.09` and a systematic from the
exponent bracket `[1.3, 1.8]` of `[−0.07, +1.38]`. The zero crossing sits at
`β̂ = 1.777`, which is the raw log-log slope of the same 20 terms
(`exponent-control.md` §5, `1.777 ± 0.029` nominal, **[CITED]**) to three
places, as the collinearity says it must. So `δ̂_B > 0 ⟺ β̂ < β_raw`, and
`β̂ < β_raw` is the equal-bias transfer, whose sign `exponent-control.md` §3
argues *from* "the truth carries a positive power of log inside it". RB
therefore returns the sign that was put into its `β̂`. It passed the
pre-registration on the letter (the pre-registration flagged it circular on
the control and scored it anyway, §3a), and it is **void as evidence on the
sign of `δ`**. It is not banked, and it is not "consistent with `δ ≥ 0`"
any more than the 2026-08-29 reading was.

**The caveat the brief asked for, and one more.** `G₂`'s 22 trusted terms
reach `x = 79`; a log-power exponent at that reach is at best a bracket, and
here even the bracket's sign is the exponent correction's sign. The further
caveat is the control's: at reach 311, four times `G₂`'s, an object whose
asymptotic `δ` is conjectured `+2` reads `δ < 0` on every instrument that
does not import its exponent (§4c). Whatever `G₂` reads at 79 would be a
finite-reach `δ`, and the one available witness says a finite-reach `δ` does
not carry the asymptotic sign.

**Verdict for item 1d.** `δ`'s sign for `G₂` is unreadable at reach 79 by
any instrument tried, and the control shows the unreadability is a property
of the reach, not of the instrument. The all-bases (H-sub-pow) form stays
unattackable by measurement; the fixed-base form at `b = 2` (item D) is the
one that sidesteps the sign condition, as `attack-0829n-hsubpow-K.md` §0
already says.

## 6. NOT REACHED, falsifiers, sources

**Not reached.**

- The sign of `δ` for `G₂`, by any reader. No reader was found that is both
  non-circular and passes the control.
- A reader that un-steps the ladder (interpolates `f` between primes before
  differencing) was not built; on the control it would still face §4c's
  negative finite-reach `δ`, so it could pass S1 and still fail C1.
- The second control (h2, A288815, 21 terms to `p = 73`) has less reach than
  `G₂` and was not used.
- The `1 + a/ln n` grid is a model demonstration; no law was fitted to the
  control and none is claimed.
- The noise model of S3 (white, sd `0.055`) is a choice; the control's
  residuals on the power fit are white by `exponent-control.md` §2, which is
  the only justification offered.
- Nothing past reach 82 on `G₂`; no enumeration; the control's b-file tail is
  used as adopted.

**Falsifiers, and whether each check has run.**

| claim | falsifier | has it run |
|---|---|---|
| R0 reproduces the 2026-08-29 readings | a digit off at `5e−5` | yes, three check lines pass |
| stepping alone does not flip a `δ = 2` law for R0 at reach 17 | a stepped `δ = 2` law reading a positive slope | ran; reads `2.1178`, i.e. `δ̂ = −2.12`, sign right |
| the chain readers die of stepping | a chain reader within tolerance at `δ = +1` on a stepped law | ran; none is, both geometries |
| RD is calibrated at reach 311 for `δ ∈ {−1, 0, 1}` | a miss above `0.5` | ran; largest miss `0.071`; `δ = 2` misses by `0.655` and is recorded |
| the control's finite-reach `δ` is negative | a non-circular reader reading positive at reach 312 | ran; all five read negative |
| RB's sign is the exponent correction's sign | a zero crossing away from `β_raw` | ran; crossing at `1.777` against `β_raw = 1.777` |
| "no reader passes" | a reader passing S1, S2, C1, C2 without an imported exponent | none produced |

**Sources.**

| artifact | what it carries |
|---|---|
| `research/history/staging/measure-0830-delta-reader.js` | custody (A), R0 reproduced (B), the diagnosis (C), the readers on synthetic laws and the noise study (D), the real control (E), the gate (F); nine readings |
| `research/history/staging/attack-0829n-hsubpow-K.md` §§2d, 3b | the failed meter, the sign lemma |
| `research/exponent-control.md` "The control", §§1–3, 5 | A048670, the rising raw exponent, the pinned-`β` log power `1.000`, the raw slopes `1.282` and `1.777`, the corrected `1.50` and its bracket |
| `research/maxgap-law.md` §7 | the Maier–Pomerance statement pinned to FGKMT p. 4 and Ford's slides; `ln p` from `2.40` to `5.74` |
| `research/history/staging/fekete-1d.md` §4 | where the corpus locates the risk on the diagonal |
| `research/import-interp-01-bgt-defect.js`, `research/exact-g2-ladder.js`, `research/exponent-control.js` | the three ladders, parsed at run time |

Reproduce with `node research/qc/embed.js --check
research/history/staging/measure-0830-delta-reader.js`; the fingerprint
matches as of 2026-08-30 (`code-sha256 d0e9da7e…`, `out-sha256 470e09a6…`,
`body-lines 126`).
