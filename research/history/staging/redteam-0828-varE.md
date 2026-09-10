# Red team 2026-08-28 — Q-varE-limit, the lambda_2(2) = 0.45546 headline

<!-- ledger
id: Q-redteam-0828-varE
status: ANSWERED
todo: 9
question: Does the 2026-08-28 chain from the exact comb variance to lim Var/E = Pr[GD(2) > 2] = 0.45546 survive an adversarial re-derivation, and does the refutation of the 0.611 reading hold?
verdict: The constant survives at HEURISTIC and the 0.611 refutation is CONFIRMED and strengthened (the frozen out-of-sample half of the protocol also fails on the control); the correction is that TWO steps are open, not one, and that the theta=1 branch is an exact identity with a read theorem rather than a second-hand numerical match.
-->

*Adversarial pass, 2026-08-28, branch `opus-try`. Targets: `varE-spectral.md`,
`varE-asymptotic.md`, `varE-theta2-step.md`, `lit-dickman-variance.md`, and
their source `paper/variance-note.md` sections 6 and 7. Method:
refuted-until-rederived. Every load-bearing claim is graded CONFIRMED /
WEAKENED / REFUTED. Independent re-derivations live in this pass's own
producer `research/history/staging/redteam-0828-varE.js` (embedded,
`--check` clean, 77.6 s); no target script was edited and no target number was
taken on trust. Published mathematics was fetched this session and re-read at
the page, with one constant checked on a rendered page image. This file and
its producer are the pass's only repo writes. No git command was run.*

---

## 0. Verdict, and the correction that matters most

**The most load-bearing correction. `varE-spectral.md` section 0 opens with
"One step is unproven, and it is the whole gap", and its ledger verdict says
"one named unproven step". Two steps are open, not one, and the second one is
the one that produces the constant.** Step 1 is the decoupling replacement,
which the note names and prices. Step 2 is the limit theorem for the model
itself: that `E[{L/n}(1-{L/n}) n/L] -> Pr[GD(2) > u]`. That needs the
convergence of `ln n / ln y` to `GD(2)`, which is routine and is nowhere
written down here, and it needs the `n <= L` band to vanish, which the note's
own section 4 says is "**not** evaluated here". The note's body admits both
(section 0's "second gap", section 4's parenthesis, section 11's row), so this
is a correction to two summary sentences and to the line that QUESTIONS.md
carries, not to the analysis. Corrected sentence in section 8.

**Does 0.45546 survive?** Yes, at HEURISTIC, with two open steps rather than
one. Nothing in this pass moved the number, and three independent routes and
one published theorem now stand behind the parts of the chain that are not
open.

Scoreboard, most load-bearing first.

| # | claim | verdict |
|---|---|---|
| 2 | `varE-spectral` sec.7: the 0.611 reading is an artefact of the fit form, not a limit | **CONFIRMED and STRENGTHENED** (sec.4 below: the frozen out-of-sample half also fails on the control, which the note's control never ran) |
| 1a | `lambda_2(2) = 1 - e^{-2gamma}(9/2 - 4 ln 2) = 0.45545648` | **CONFIRMED** to 2.9e-11 by three independent routes (sec.1) |
| 1b | the density `f_2` and the delay equation `t f' = (theta-1) f - theta f(t-1)` | **CONFIRMED**, re-derived from the Laplace transform (sec.1) |
| 1c | "the diagonal is `u = ln L / ln y = 2` exactly" (`variance-note.md` sec.7) | **WEAKENED**: `u = 2.0847` at x=7, `2.0116` at x=11, `2.000x` from x=13 (sec.2) |
| 1d | the decoupled sum at `theta = 1` reproduces Gorodetsky's `lambda(u)` | **CONFIRMED, and the rung is too low**: it is an exact identity with his (1.5)/(1.6), and his Lemma 1.5 makes the primorial window his own case (sec.3) |
| 1e | `varE-spectral` sec.0/ledger: "one named unproven step" | **WEAKENED**: two steps (sec.0, sec.8) |
| 2b | the control's intercepts 0.6151 / 0.4463 and the bias-corrected `[0.4488, 0.4551]` | **CONFIRMED** within the note's own MC noise; corrected to 0.6164 / 0.4468 and `[0.4471, 0.4546]` with an exact model column (sec.4) |
| 2c | reading 7, "bias-corrected, the seven forms agree" as evidence | **WEAKENED**: the agreement is bounded a priori by `\|\|c\|\|_1 * max\|data-model\|`, and the observed gaps sit inside that bound (sec.4) |
| 3a | `Var/E = delta X` exactly; `delta ln^2 W -> 16 C_2 e^{-2gamma}/3 = 1.109905` | **CONFIRMED**, nine-level column and the 9.19e-5 gap at x=37 reproduced (sec.5) |
| 3b | the MS main term is exactly `L` prime by prime | **CONFIRMED**, 0 failures over 1117922 primes; it is the single identity `p(p-4)+4 = (p-2)^2` (sec.5) |
| 3c | `variance-note` sec.7's fits were on six points, not eight | **CONFIRMED** to every printed digit (sec.5) |
| 4a | `(p-1)(p-4)+2 = (p-2)(p-3)`, and the `3^omega(n)` lag structure | **CONFIRMED** (identity; sec.6) |
| 4b | `X/X_dec` = 1.009802 at x=13 and 1.003895 at x=17 | **CONFIRMED** by an independent route to every printed digit (sec.6) |
| 4c | the `O(1/ln y)` reading of the replacement error | **CONFIRMED as stated** (order only, coefficient not established) (sec.6) |
| 5a | Gorodetsky arXiv:2111.00853 is `kappa = 1` only | **CONFIRMED at source**, abstract, (1.5)/(1.6), Thm 1.1, Thm 1.3, sec.1.6.1, and the eight greps (sec.7) |
| 5b | Aryan, Mathematika 61 (2015), Lemma 1.2 | **CONFIRMED at source** with one transcription defect: the exponent is `P^{-2^{ks}+ks}`, not `P^{-2ks+ks}` (sec.7) |
| 6 | `varE-spectral` sec.8: the model's x=41 value 0.40184, "at the bottom edge of the band" | **WEAKENED**: 0.402364 +- 0.000075 on two seeds at N=2e7, mid-band (sec.4) |

Two things this pass did **not** do. It did not attempt the decoupling proof,
and it did not search for a published `lambda_k` at `k >= 2` beyond the two
papers named. `varE-spectral` section 11's "do not call it new before that
search" stands unchanged.

---

## 1. The constant, re-derived three ways

The closed form was re-derived here from the Laplace transform rather than
read off the note. From `L(s) = exp(theta * int_0^1 (e^{-sw}-1) dw/w)` follows
`s L'(s) = -theta L(s)(1-e^{-s})`, hence `(t f(t))' = theta(f(t) - f(t-1))`,
hence `t f'(t) = (theta-1) f(t) - theta f(t-1)`. That is the note's delay
equation, CONFIRMED. On `(0,1]` the equation gives `f = c t^{theta-1}`; at
`theta = 2` the branch on `(1,2]` solves as `(g/t)' = -2/t + 2/t^2` with
`g = f/c`, so `g = 3t - 2t ln t - 2` after `g(1) = 1`, which is the note's
`f_2(t) = e^{-2gamma}[t(3-2 ln t) - 2]`. Integrating,
`int_0^2 f = c(1/2 + 4 - 4 ln 2) = c(9/2 - 4 ln 2)`.

Three routes to the number:

| route | `lambda_2(2)` | uses |
|---|---|---|
| closed form re-derived here | 0.45545647997104444 | `e^{-2gamma}` and `ln 2` only |
| Simpson solve of the delay equation, h = 1e-4 and h = 2.5e-5 | 0.455456480 (both) | the density, `int f = 1`, mean = 2 |
| Monte Carlo of the limit process, N = 4e6 | 0.45580 +- 0.00025 | neither the density nor `e^{-2gamma}` |

The third route samples the points of a Poisson process of intensity
`2 dw/w` on `(0,1]` and sums them, which is the limit object itself, so it
tests the normalising constant rather than assuming it. It sits 1.4 standard
errors high. The full tail rows at `u = 0.6 .. 3` reproduce the note digit for
digit at both `theta = 1` and `theta = 2`. The note's quoted 0.45545648 is
correct to 2.9e-11.

CONFIRMED. The number is not where the risk is.

---

## 2. The normalisation: which `u`, which `y`, which `L`

`variance-note.md` section 7 defines the diagonal as `L = W = x#` with `y` the
largest prime `<= sqrt(W)`, and states "`u = ln L / ln y = 2` exactly". That
is false at every finite level, because `y` is the largest prime below
`sqrt(W)` rather than `sqrt(W)` itself:

| x | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 |
|---|---|---|---|---|---|---|---|---|---|
| `u = ln L/ln y` | 2.0847 | 2.0116 | 2.0007 | 2.0024 | 2.0004 | 2.0001 | 2.00001 | 2.000004 | 2.000001 |
| `lambda_2(u)` | 0.4232 | 0.4510 | 0.4552 | 0.4545 | 0.4553 | 0.4554 | 0.45546 | 0.45546 | 0.45546 |

WEAKENED, and the load is small: the model is evaluated at the true `L` and
`y`, so no model number changes, and from x=13 up the coordinate error moves
`lambda_2` by less than 0.001. The corrected sentence is in section 8.

A second normalisation point, and it is worth stating because the notes put
two tables side by side. `variance-note.md` section 6 is a different object in
a different coordinate: the set `A` (all three mod-30 houses, `alpha_5 = 3`)
with `L = y^u` and `y = p_n` the sieve level, so `u` there is exact by
construction. `varE-spectral` section 6b says this. The comparison in 6b and
6c therefore tests the model at finite `y`, not the limit: at `y = 401` and
`u = 2` the model reads 0.2944 against `lambda_2(2) = 0.4555`. That is what
the note says, and it is right.

---

## 3. The `theta = 1` branch is an exact identity, and the paper is now read

`varE-spectral` section 9 grades `lambda_1 = ` Gorodetsky's `lambda` as
MEASURED, records that the paper was not read, and calls the identification
second-hand. Both halves can be replaced.

Gorodetsky, arXiv:2111.00853v3 (fetched this session, sha256
`069d1a4cd91db35c3ef618c5b64a16ea30e33fe2773d844383f4bb84360ca7a8`, 24 pp),
eq. (1.5) and (1.6), page 2:

    M(H,y) = prod_{2<p<=y}(1 - 2/p) * sum_{n>=1} g_y(n) {H/2n}(1 - {H/2n}),
    g_y multiplicative on squarefrees, g_y(p) = p/(p-2) for 2 < p <= y, else 0.

The notes' decoupled formula at one excluded class is
`Var = delta * L * E[{L/n}(1-{L/n}) n/L]` with `pi_p = (p - alpha_p)/(p-1) =
1/(p-1)` and `delta = P_y`. Because `pi_2 = 1`, every `n` is even; writing
`n = 2n'` supplies his factor 2, `P_y * prod_{2<p<=y}(p-2)/(p-1) * 2 =
prod_{2<p<=y}(1 - 2/p)` supplies his prefactor, and
`n' * prod_{p|n'} 1/(p-2) = prod_{p|n'} p/(p-2)` is his `g_y`. Checked
numerically at `(y,H) = (13,210), (13,2310), (29,30030)`: relative difference
1.7e-16, 0, 1.3e-16. It is the same expression, not a numerically close one.

Two consequences.

- His Lemma 1.5 (page 5, read) states `V_{q_y}(H) = M(H,y)` **exactly** for a
  primorial window, which is the corpus's window, with no hypotheses; his
  Theorem 1.3(1) then gives `M ~ H P_y lambda(u)` for
  `y >= exp((log log H)^{5/3+eps})`, which the diagonal `y = sqrt(H)`
  satisfies. So at `theta = 1` the whole chain from the exact finite-level
  variance to `lambda_1(u)` is a published theorem about exactly this object,
  not an analogy.
- His (1.12), read at the page, is `lambda(u) = 1 - e^{-gamma} u` on `[0,1]`.
  That gives 0.663124 at `u = 0.6` and 0.438541 at `u = 1`, which are the
  note's PART 3 numbers to six decimals. The `theta = 1` column is therefore
  checked against the page, not against memory.

CONFIRMED, and the rung on that row can go up from MEASURED to PROVEN for the
`theta = 1` specialisation. The value of this to the `theta = 2` claim is
limited and should be stated as such: it shows the construction is the right
one at `theta = 1`, where the decoupling step is vacuous because
`hat f_p(nu != 0) = 1/(p-1)^2 = gamma_p` identically (checked). It says
nothing about `theta = 2`, where the step is the gap.

---

## 4. The 0.611 refutation, reproduced and extended

This is the claim the brief flags as reaching a paper abstract, so it got the
most attention.

**The protocol was applied identically, on the right set.**
`variance-note.md` section 7 runs two things: (i) fit two forms on a frozen
set, forecast `x = 37`, and read the 10:1 separation; (ii) refit on the larger
set and read the rms improvement and intercept stability.
`varE-spectral` section 7's control runs (ii) only, on `x = 13..37`, which is
the set the refit actually used. So the control matches (ii) exactly. It does
not run (i), which is the half section 7 leans on hardest.

**Reproduction of (ii).** The note's control column is Monte Carlo at
`N = 4e5`, standard error 7e-4, which `varE-theta2-step` section 6 already
showed is up to 0.0017 off. This pass rebuilt the model column with the
**exact** value at `x = 13, 17, 19` (real-space `V`-sum, section 6 below) and
Monte Carlo at `N = 2e7` elsewhere, standard error 1.0e-4:

| form | on the model | bias vs 0.455456 | on the data | data minus bias | `\|\|c\|\|_1` | gap vs its bound |
|---|---|---|---|---|---|---|
| `a + b/lnW` | 0.4468 | -0.0086 | 0.4454 | 0.4540 | 2.60 | 0.0014 <= 0.0076 |
| `a + b/lnlnW` | **0.6164** | +0.1609 | 0.6108 | 0.4499 | 6.91 | 0.0056 <= 0.0201 |
| `a + b/sqrt(lnW)` | 0.5402 | +0.0848 | 0.5366 | 0.4518 | 4.96 | 0.0036 <= 0.0144 |
| `a + b/lnW^(1/3)` | 0.6337 | +0.1783 | 0.6279 | 0.4496 | 7.43 | 0.0059 <= 0.0216 |
| `a + b/(lnW lnlnW)` | 0.4219 | -0.0336 | 0.4211 | 0.4546 | 2.03 | 0.0008 <= 0.0059 |
| `a + b/lnlnW^2` | 0.4833 | +0.0278 | 0.4809 | 0.4531 | 3.48 | 0.0023 <= 0.0101 |
| `a + b *` (inert Mertens share) | 0.7281 | +0.2727 | 0.7198 | 0.4471 | 9.83 | 0.0083 <= 0.0286 |

The note's 0.6151 and 0.4463 are CONFIRMED within its own Monte Carlo noise;
the exact-column values are 0.6164 and 0.4468. The bias-corrected range is
`[0.4471, 0.4546]`, width 0.0075, against the note's `[0.4488, 0.4551]`, width
0.0063. Same reading, and the note's width is the tighter of the two only
because its model column is noisier at the two ends.

**The half the control does not run, run here.** Fit on `x = 13..31`, freeze
the coefficients, forecast `x = 37`, on the model and on the data:

| form | model forecast | model residual | data forecast | data residual |
|---|---|---|---|---|
| `a + b/lnW` | 0.39281 | +0.00276 | 0.39259 | +0.00321 |
| `a + b/lnlnW` | 0.39596 | **-0.00039** | 0.39567 | +0.00013 |

The model's own value at `x = 37` is `0.395567 +- 0.000106`, so the -0.00039 is
resolvable. On a sequence whose limit is 0.455456 by construction, the frozen
`1/lnlnW` forecast beats `1/lnW` by a factor 7, in the same direction and at
the same in-sample ordering as the data's factor 25. **So section 7's
out-of-sample argument carries no information about the limit either.** That
is a stronger statement than `varE-spectral` makes, and it closes the one
opening its control left.

CONFIRMED, and strengthened. The corpus should stop quoting 0.611.

**One caution on reading 7.** "Bias-corrected, the seven forms agree" is
mostly forced. The intercept is a linear functional `a = sum_i c_i y_i` with
`sum_i c_i = 1`, and the last column of the table above is
`0.455456 + (a_data - a_model)`, so its width is the spread of
`a_data - a_model`, which is bounded a priori by
`\|\|c\|\|_1 * max\|data - model\|`. With `max\|data - model\| = 0.00291` and
`\|\|c\|\|_1` between 2.03 and 9.83, the bound runs 0.0059 to 0.0286, and every
observed gap sits inside it. So the last column restates that the model tracks
the data pointwise. `varE-spectral` section 7 reading 3 already says this is a
consistency check and not an independent measurement; the producer's reading 7
does not, and it is the one that would get quoted.

**x = 41.** The note registers `0.40184 +- 0.00075` and calls it "the bottom
edge of the registered band". At `N = 2e7` on two seeds the model gives
`0.402364 +- 0.000075`, which is inside `[0.4013, 0.4040]` and near its
middle. The note's central value is 0.7 of its own standard error away, so
this is noise rather than an error, but the registered forecast should carry
the tighter number.

---

## 5. `varE-asymptotic`: the identities and the fit-set defect

- `Var/E = delta X` with `X = sum_{|d|<L}(1-|d|/L)(W(d)-1)`: CONFIRMED.
  Rebuilt from `J_5` by direct enumeration at five levels; `delta X` returns
  0.152075, 0.256267, 0.299499, 0.326772, 0.347302 at `x = 7..19` against
  section 7's 0.1521, 0.2563, 0.2995, 0.3268, 0.3473.
- `delta ln^2 W -> 16 C_2 e^{-2gamma}/3`: CONFIRMED. With `C_2` from its own
  product to 1.7e7, `kappa = 1.109905424`. The nine-level column reproduces as
  0.9426, 1.0198, 1.0770, 1.0982, 1.1058, 1.1082, 1.1093, 1.1096, 1.1098, and
  the relative gap at `x = 37` is 9.19e-5 against the note's 9.2e-5.
- The main term is exactly `L` prime by prime: CONFIRMED, 0 failures over
  1117922 primes. It is one identity seen twice: `p(p-4) + 4 = (p-2)^2` gives
  `1 + 4/(p(p-4)) = (p-2)^2/(p(p-4))`, which cancels `1 - 4/(p-2)^2` outright.
- "section 7's fits were on six points, not eight": CONFIRMED to every printed
  digit. On `x = 13..31`: `0.4435 - 1.5085/lnW` at rms 1.84e-3 and
  `0.6106 - 0.7284/lnlnW` at rms 8.10e-4, which are section 7's published
  coefficients. On the eight points section 7 names, `x = 7..31`, the fits are
  `0.4462 - 1.5424/lnW` at rms 4.22e-3 and `0.6347 - 0.7951/lnlnW` at rms
  5.25e-3, so on the named set the `lnlnW` form is the worse of the two. On
  all nine: 0.4467 at 4.01e-3 and 0.6321 at 5.10e-3. The refit section 7
  reports is `x = 13..37`: 0.4454 and 0.6108 at rms 7.51e-4.
- The frozen forecast table reproduces: 0.3926 (+0.0032) and 0.3957 (+0.0001).
  `variance-note.md` prints 0.3955 and +0.0003 for the `lnlnW` form; that is
  its own rounded `b = 0.729` rather than 0.7284, not a separate defect.
- The `X` column of `varE-asymptotic` section 1 carries four figures, not
  more: 15.08 against the exact 15.073187, 51.40 against 51.400255.
  `varE-theta2-step` section 6 already says so. `varE-spectral.js`'s header
  says its `PTS` `X` values are read from `variance-note.md` section 7, but
  section 7 has no `X` column; they come from the sibling. Provenance nit.

---

## 6. `varE-theta2-step`: the ratios, by an independent route

The exact objects were rebuilt here by direct per-`h` factorisation over the
primes `7 <= p <= y`, with no sieve, which is a different implementation from
the target's multiplicative sieve over `k = h/6`:

| x | `delta X` | `delta X_dec` | `X/X_dec` | `delta(X-X_dec) ln y` |
|---|---|---|---|---|
| 7 | 0.152075 | 0.178193 | 0.853427 | -0.06699 |
| 11 | 0.256267 | 0.266839 | 0.960382 | -0.04070 |
| 13 | 0.299499 | 0.296592 | **1.009802** | +0.01498 |
| 17 | 0.326772 | 0.325504 | **1.003895** | +0.00832 |
| 19 | 0.347302 | 0.346800 | 1.001448 | +0.00404 |

Every figure matches the target to the last printed digit, including the two
the brief singled out. `X` itself: 4.612929, 15.073187, 29.557928, 51.400255,
81.289135. CONFIRMED.

- `(p-1)(p-4) + 2 = (p-2)(p-3)`: CONFIRMED as exact integer arithmetic at
  1117922 primes, and it is the same one-line identity as section 5's.
- The `3^omega(n)` lag structure and the `c = 0` group: the algebra is right
  and the reduction is real. The group where every prime takes `p | h` is the
  only one with CRT class 0, and it carries `pi_p = 2/(p-2)` against the
  model's `2/(p-1)`, differing in `E[ln n]` by
  `sum 2 ln p/((p-1)(p-2)) = O(1)` against `ln L = 2 ln y`. CONFIRMED.
- The `O(1/ln y)` reading: CONFIRMED **as stated**, which is an order and not
  a coefficient. The note is explicit that the net 0.0046 is the difference of
  a +0.1334 and a -0.1288 and must not be quoted. Worth adding: over
  `x = 13..23` the net is 0.01498, 0.00832, 0.00404, 0.00459, which is falling
  rather than settling, so the evidence is for `O(1/ln y)` or better, and the
  only failure mode the four levels exclude is growth.
- The correction to `varE-spectral` section 6a is right: with the exact model
  column the residuals at `x = 13..23` are +0.00291, +0.00130, +0.00050,
  +0.00063 (this pass's numbers), against the note's +0.0020, +0.0010, +0.0009,
  +0.0022. Add one caution the target does not state: `variance-note.md`
  section 7 quotes `Var/E` to four decimals, so the measured column carries a
  rounding of +-5e-5, which is comparable to the residuals at `x >= 29`
  (+0.00036, +0.00025, +0.00023). Residual structure at the top three levels is
  at the quantisation floor and should not be read as signal.

---

## 7. `lit-dickman-variance` at source

Both papers were fetched this session and read from the PDF of record.

**Gorodetsky, arXiv:2111.00853v3**, sha256 `069d1a4c…`, 24 pp. CONFIRMED on
every point the note makes:

- `alpha_y(n) = 1` iff every prime factor exceeds `y`, one excluded class per
  prime. The abstract says "integers without prime factors below `y`".
- (1.5), (1.6) as quoted, verbatim, including `g_y(p) = p/(p-2)`.
- Theorem 1.1's hypotheses `y >= (2+eps) log H` and (1.7), and the conclusion
  `V ~ M`. Theorem 1.3(1)'s hypothesis `y >= exp((log log H)^{5/3+eps})` and
  `M ~ H P_y lambda(u)` with `lambda(u) = e^{-gamma} int_u^inf rho`, (1.10) and
  (1.14). Parts (2), (3), (4) as described.
- Lemma 1.4 at general `k >= 1` with main term `X prod_{p<=y}(1 - nu_p(h)/p)`,
  applied at `k = 1, 2` only, and the page-5 sentence "Lemma 1.4 with `k >= 3`
  paves the way to studying higher moments … and we hope to study such moments
  in future work" verbatim.
- Section 1.6.1's priority sentence, Hausman-Shapiro (1.21), and Lemma 1.5.
- The eight greps: `tuple` 0, `twin` 0, `admissible` 0, `generalized` 0,
  `sieve dimension` 0, `dimension` 0, `Poisson` 0, `Dickman` 2. All reproduced.

So `kappa = 1` only: CONFIRMED.

**Aryan, arXiv:1302.2296v2**, sha256 `4a45903a…`, 18 pp (the Mathematika 61
(2015) 72-88 version was not reached; the arXiv v2 of 23 Jul 2014 was). Lemma
1.2 says what the note says, with one defect:

- The object is as quoted: `M_k^D(q,h) = sum_{n=0}^{q-1} ( sum_{m=1}^{h}
  k_q(n+m+h_1)...k_q(n+m+h_s) - h prod_{p|q}(1 - nu_p(D)/p) )^k`. The paper
  writes it without absolute-value bars; the note adds them. At `k = 2` that is
  the same object, so no load.
- **The exponent is wrong in the note.** Checked on a rendered page image of
  page 5: the bound is `M_k^D(q,h) << q h^{k/2} P^{-2^{ks}+ks}`, a nested
  exponent. The note writes `P^{-2ks+ks}`, which simplifies to `P^{-ks}` and is
  a different statement. WEAKENED; corrected sentence in section 8.
- Remark 1.1 records `nu_p(D) = s` for `p > h_s - h_1`: CONFIRMED.
- Upper bound only, no asymptotic: CONFIRMED. Greps for `variance`, `Dickman`,
  `asymptotic`, `rough` all return 0.

**One mis-transcription in the note's own headline correction.** Section 0
gives "a factor of 2.11 to 2.86 rather than 13.9 to 22.7". The 2.11 and 2.86
are `0.718/lambda_2(s)` at `s = 2.317` and `2.608`, which reproduce
(`lambda_2` there is 0.3403 and 0.2508, scratchpad-grade, confirmed here).
But `import-rough-anatomy.md` section 0.6's "13.9, and 12.0 to 22.7 across the
six bands" attaches 22.7 to a different band's `chi^2/df`, not to 0.718 at
`s = 2.608`; the matching figure at 0.718 is 25.2. The comparison mixes one
band's statistic with six bands' range. Both sides are `[SCRATCHPAD-GRADE]`,
so the load is low, but the sentence overstates the shrinkage slightly.

---

## 8. Corrected sentences

For `varE-spectral.md` section 0, first bold line:

> **Two steps are unproven, and together they are the gap.** The evaluation
> below replaces the local Fourier coefficient `hat f_p(nu)` by its mean over
> the `p-1` nonzero frequencies, which is an identity at one excluded class and
> false pointwise at two. Separately, the passage from the decoupled sum to
> `Pr[GD(2) > u]` is a limit theorem about the model that is asserted and not
> derived here: it needs the convergence of `ln n / ln y` to `GD(2)`, which is
> routine and unwritten, and it needs the `n <= L` band to vanish, which
> section 4 states as `O(1/ln W)` and does not evaluate.

For the same note's ledger `verdict:` field, replace "one named unproven step
(the theta=2 mean-coefficient replacement)" with "two open steps (the theta=2
mean-coefficient replacement, and the model's own limit theorem)".

For `paper/variance-note.md` section 7, "The diagonal":

> so that `u = ln L / ln y = 2` in the limit, and `2.0847`, `2.0116`, then
> `2.000x` from `x = 13` up, at the computed levels.

For `varE-spectral.md` section 8, the `x = 41` paragraph: replace
"0.40184 +- 0.00075 (MC)" with "0.402364 +- 0.000075 (MC, N = 2e7, two seeds)"
and drop "which sits at the bottom edge of the registered band".

For `varE-spectral.md` section 9, the `theta = 1` bullet: the identification is
an exact identity with Gorodetsky (1.5)/(1.6), verified to 1.7e-16, and his
Lemma 1.5 makes the primorial window his own case with no hypotheses, so the
row's rung goes from MEASURED to PROVEN for `theta = 1` and the "second-hand"
qualifier can be dropped. `lit-dickman-variance.md` already reads the paper;
`varE-spectral.md` has not been updated to match.

For `lit-dickman-variance.md` section 2, second bullet:

> What he proves is an upper bound only, `M_k^D(q,h) << q h^{k/2}
> P^{-2^{ks}+ks}` with `P = phi(q)/q`, the implied constant depending on `k`
> and `s`.

For `research/qc` producer `varE-spectral.js` reading 7: add that the
bias-corrected spread is bounded a priori by `\|\|c\|\|_1` times the pointwise
model-data gap, and is therefore a restatement of pointwise tracking rather
than an independent estimate of the constant.

---

## 9. What would falsify this, and whether that check has run

| claim of this pass | rung | falsifier | has the check run |
|---|---|---|---|
| `lambda_2(2) = 0.45545648` is the tail of `GD(2)` at `u = 2` | PROVEN (arithmetic) | a fourth route disagreeing, or an error in the delay equation | YES, three routes, one of which uses neither the density nor `e^{-2gamma}` |
| the `theta = 1` decoupled sum IS Gorodetsky's `M(H,y)` | PROVEN | a `(y,H)` where the two sums differ | YES, three pairs, to 1.7e-16; algebra given in sec.3 |
| `lim Var/E = lambda_2(2)` on the diagonal | HEURISTIC, two open steps | a proof that either step shifts the limit, or a new level where the model fails | NO. No level beyond `x = 37` exists; the decoupling error is measured `O(1/ln y)` on six levels only |
| sec.7's fit comparison, both halves, does not estimate the limit | MEASURED (control) | a control tracking the data as well and reproducing its own limit under BOTH halves | YES, this pass; the frozen half was not previously checked |
| the bias-corrected spread is mostly forced | PROVEN (bound) + MEASURED | an observed gap exceeding `\|\|c\|\|_1 * max\|data-model\|` | YES, all seven forms inside the bound |
| `X/X_dec` at `x = 13..19` | MEASURED, exact arithmetic | a third implementation disagreeing | YES, two independent implementations agree to the last digit |
| Gorodetsky is `kappa = 1` only | PROVEN at source | a statement at `k >= 2` in the paper | YES, full text read, eight greps |
| Aryan's exponent is `P^{-2^{ks}+ks}` | PROVEN at source | the published Mathematika version differing from arXiv v2 | PARTLY. arXiv v2 read at a page image; the journal version was not reached |
| no published `lambda_k` at `k >= 2` exists | NOT CLAIMED | any such statement | NO. Not searched by this pass; `lit-dickman-variance` sec.4's owed channels stand |
| the model's `x = 41` value is 0.402364 | MEASURED (forward, MC) | a measured `r(41)` outside `0.4024 +- a few 1e-3` | NO. `Var(41)` priced and declined, TODO item 2 |

The one line worth carrying out of this pass: 0.45546 stands at HEURISTIC with
two open steps rather than one, the refutation of 0.611 is complete rather than
half, and the `theta = 1` branch is a theorem about this exact object rather
than an analogy.
