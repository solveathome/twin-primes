# The control the rough-pair note named and never ran: the independent-thinning null returns 1 minus p rather than 1, the measured dispersion deficit survives that correction at pooled z of 5.9 to 11.4 below the null, and a second null that only makes each prime's kill count exact in the window over-explains the whole deficit by about 30%, so D8 classifies interval-level in form and elementary in content

<!-- ledger
id: Q-roughpair-null
status: ANSWERED
todo: Z2
question: Does the independent-thinning null named in attack-roughpair-error.md's defects list return chi2/df = 1, and is the measured sub-Poisson dispersion of the rough-pair census error real or a normalisation artefact?
verdict: MEASURED, null-side, label (i), no bearing on the certificate: the independent-thinning null is binomial and returns 1 - p (0.8164 to 0.9808), not 1, so attack-roughpair-error.md's "below 1 everywhere: sub-Poisson" is WEAKENED and the registered F1 fires at u = 5; the deficit against the mean-matched null survives at pooled z = -5.87, -7.09, -11.39; and a CRT-exact null that only makes each prime's kill count exact in the window predicts 0.33 to 0.56, which the measured value EXCEEDS by 1.26 to 1.40, so D8 is interval-level in form, elementary in content, and not wall-relevant.
-->

*(2026-08-29. Staging note; nothing here is integrated into a live document.
HELD. Producer, formally embedded: `research/measure-roughpair-null-0829.js`.
Calibration marked per claim: MEASURED, DERIVED (exact within the null model),
OPEN. Nothing here is PROVEN about the arithmetic and nothing here is a TPC
claim.)*

## 0. Open first, and the label

**This is a NULL-SIDE measurement and it is label (i).** The object measured
below is the sampling variance of a model, not a bound and not a count of twins.
`attack-wrongdirection-audit.md` §3.1 fixes the surrounding item: item Z2's
certificate is `T >= X(K) + 1 >= 1`, which asserts a twin pair inside
`[Q^2, Q'^2)`, and holding it at infinitely many `Q` gives TPC, so **Z2 is
(ii) TPC-strength**. The same section fixes the residue this note falls into,
verbatim: "an upper bound on `X(y)` alone, or an asymptotic for the rough-rough
census with no comparison to `T`, is a sieve statement and is not TPC-strength."
A null model for the dispersion of `X` is weaker still, since it compares `X`
against a random model of `X` and never against `T`. **Nothing here is progress
on the certificate**, and no line below should be read as moving item Z2.

**Three inherited caveats, ahead of any number.**

1. **The UNVERIFIED PREMISE stands.** Everything that reads `X(y)` as a
   certificate rests on the capture identity `floor_K = T - X(K)`
   (`quadpoint-identity-01.md` §1, PROVEN elementary there and verified at every
   depth of all 1,227 anchors, but the note is HELD and un-red-teamed, and Z0's
   standing debt names it). This note does **not** re-verify the identity and
   does not need it: a null on the dispersion of `X` is a statement about `X`,
   and it survives unchanged if the identity falls.
2. **Two decades decide nothing asymptotic.** `Q <= 10007`, `h <= 1e8`, the same
   range as the note being controlled. Every number below is a range summary.
3. **The null is a model, and a null that returns the expected value proves
   nothing about the arithmetic.** It rules out one artefact and no others.

**What the corpus says is open here.** `object-models-read-0829.md` §4 leaves D8
as the one entry in its list whose residue-level / interval-level classification
is open, "and it is open because nobody ran a null, not because the question is
hard"; §7 C4 names the run and prices it under an hour.
`attack-roughpair-error.md` §8 names the same control in its own defects list:
"a matched independent-thinning null should return `chi2/df = 1`; that control
was not run." `QUESTIONS.md` carries `Q-roughpair-error` as PARTIAL with a
verdict that does not mention a null.

## 1. Pre-registration, written before the null was run

Committed to disk before `research/measure-roughpair-null-0829.js` existed and
before any null number was produced. **Custody caveat: timestamped by disk order
only, not sealed**, so this is weaker than a sealed pre-registration and is
recorded as such.

**The null, stated precisely, and why it is the null the note names.** The main
term the census is priced against is the classical dimension-2 sifting main
term with `rho(2) = 1`, `rho(p) = 2` (Ford §1.7.2 through
`quadpoint-prior-art.md` §1.1). Its generative reading is a per-prime kill rule:
for each active prime `p` the pair `(a, a+2)` meets exactly two forbidden
residues mod `p`, one killing `a` and one killing `a+2`, and they are distinct
for `p > 2`. So the null is:

> **N-thin.** For each channel opener `a` in the anchor's own stretch window,
> independently of every other opener, and for each active prime `p_i`
> independently: with probability `1/p_i` the prime kills `a`, with probability
> `1/p_i` it kills `a+2`, with probability `1 - 2/p_i` it kills neither.
> `X_null(K)` counts the openers where neither member is killed by any
> `p_i, i <= K` and both members are killed by some `p_i, i > K`.

Two properties make this the right null rather than an arbitrary one. First, the
per-prime rule is exactly the sieve density `rho(p)/p` the main term is built
from, so nothing is inserted that the main term did not already assume. Second,
the only thing made independent is what the main term already treats as
independent: the primes across each other, and the openers across each other.
The measured quantity is therefore the cost of exactly that independence
assumption and of nothing else.

**Its closed form [DERIVED, exact within the model, to be verified by a
brute-force sampler in the producer].** Conditioning on survival to level `K`
and writing `U(K) = prod_{i>K}(1 - 1/p_i)`, `V2(K) = prod_{i<=K}(1 - 2/p_i)`,
the per-opener probability is `V2(K) - 2 V2(K) U(K) + V2(nR)`, which is
`Xnaive(K)/C` verbatim. So under N-thin, `X_null(K) ~ Binomial(C, p)` with
`p = Xnaive(K)/C`, and the openers-independent null is a binomial null.

**Two variants, because the note prices `E` against the corrected main term.**
The naive product carries the fundamental-lemma bias `omega(u) e^gamma` per
member, 26% at the depths in play (`attack-roughpair-error.md` §2), so a null
centred on `Xnaive` and scored against `Xcorr` would be reporting that bias and
not the dispersion. The two variants are run and both are reported:

- **N1 (uncalibrated):** `p = Xnaive/C`, scored as `E = X_null - Xcorr`.
- **N2 (mean-matched, the control the note asks for):** `p = Xcorr/C`, scored as
  `E = X_null - Xcorr`. This is the "matched independent-thinning null".

**The registered prediction.** The null returns `chi2/df = <E^2/Xmain> = 1
+- 0.05` on `df` of order 1,206 if the statistic is correctly normalised; the
measured 0.546 to 0.803 is then real dispersion below independent thinning.

**The registered falsifiers, both directions.**

- **F1.** If N2 also returns `chi2/df` well below 1, the sub-Poisson reading was
  an artefact of the normalisation and `attack-roughpair-error.md`'s
  "sub-Poisson" claim is **WEAKENED**, with the size of the weakening equal to
  the null's own shortfall.
- **F2.** If N2 returns 1 and the measured value stays below, **D8 classifies
  interval-level**: the actual count is more regular than independent thinning,
  which is a statement about the interval and not about the residues.
- **F3 (added at pre-registration time, not in the brief).** A binomial null has
  variance `C p (1 - p)`, not `C p`, so its `chi2/df` is `1 - p` exactly, and
  `p` here is `Xmain/C`, of order `T/C`. If `p` is not negligible the null will
  return something below 1 **by construction**, and the honest test is then the
  measured value against `1 - p` rather than against 1. This case is registered
  in advance so that a return near 0.98 is read as a near-hit on the prediction
  and not retro-fitted into one. The threshold registered: a null return in
  `[0.95, 1.0]` counts as confirming the normalisation; below 0.90 triggers F1.

**Registered statistics, fixed before the run.** `chi2/df = <E^2/Xmain>` per
band at `u = 3`, `u = u* = 3.5658` and `u = 5`, matching the note's own cuts;
the per-anchor null variance `C p (1 - p)` against the actual squared error, by
band; the Fano factor `Var(X)/E[X]` on the null against the actual read as
`<E^2>/<Xmain>`; and the Monte Carlo distribution of the band statistic over
`R = 200` replicates, from which the measured value's position is reported as a
z-score and as a fraction of replicates at or below it. **No other statistic is
promoted after the fact.**

## 2. Custody reproduction, before any null figure

`research/measure-roughpair-null-0829.js` writes its own engine (primes,
actives, the per-anchor window sieve, the `omega` integrator, the two main
terms) and asserts, before it is allowed to print a single null number:

- the `omega` gates `w(2) = 1/2`, `3w(3) = 1 + ln 2`, `w(12) = e^-gamma`, and
  `u* = 3.565847` to six places;
- the engine gate of `attack-roughpair-error-01.js`: the 25 cited `K*` values,
  `max K* = 46` at `Q = 9281`, the `K = 0` certificate list
  `{7, 11, 13, 19, 23, 31, 37, 43}`, `X(full) = 0` at all 1,227 anchors, and
  Z1's band means for `K*` and `K*/pool`;
- **the whole of that file's SEC 2 grid, digit for digit**: 5 depths
  (`u = 2.5, 3, u*, 4, 5`) x 6 bands x 7 columns (`n`, `<X/T>`, `<Xmain/T>`,
  `sumE/sumXmain`, `<|E|>/<T>`, `max|E|/T`, `chi2/df`), plus both SUP lines
  (`n = 1216` at `u = 3` and `n = 1206` at `u*`, `max |E|/T = 0.5190` and
  `0.5628` both at `Q = 269`, 0 anchors with `|E| >= T`).

**211 figures asserted, 0 failures** [MEASURED,
`research/measure-roughpair-null-0829.js` SEC 1]. The script exits before SEC 2
if any one of them disagrees. So the 0.546 to 0.803 being controlled is the same
number in both files, and the `chi2/df` values the null is compared against are
custody-bound rather than transcribed.

**Not re-verified, and deliberately.** The capture identity `floor_K = T - X(K)`
is CITED from `attack-quadpoint-03.js` under the standing compute rule. It is
not needed: everything below is the dispersion of `X`, which is unchanged if the
identity falls.

**Producer custody.** `code-sha256 5caaa5173b4c1561...`, `out-sha256 f2907aa4ed30dde5...` as stamped,
elapsed 56 s, `node research/qc/embed.js --check` passes bit-honest on all three
lines. **Two disclosures.** The tail was re-embedded with `--force` twice: once
to move the progress lines from stdout to stderr so the embedded stream is
deterministic, once to print the SUP figures the READINGS cite; the embed tool
records `0 of 513` and `0 of 512` figures in the replaced block not reproduced
on the two occasions, so no printed figure changed. Seed `20260829`, printed in
the OUTPUT.

## 3. Tables

### 3a. The null's own `chi2/df`, exact and Monte Carlo, against the measured value

`N2` is the mean-matched null: `X_null ~ Binomial(C, p)` with `p = Xcorr/C`,
scored as `E = X_null - Xcorr`. Its `chi2/df` is `1 - p` exactly. `R = 200`
replicates per anchor; the Monte Carlo column recomputes the whole band
statistic per replicate, so its sd is the sd of the band statistic itself.
[MEASURED, SEC 3.]

| depth | band | n | `p = Xmain/C` | N2 exact `1 - p` | N2 Monte Carlo | measured | z |
|---|---|---|---|---|---|---|---|
| u = 3 | B3 | 40 | 0.04810 | 0.9519 | 0.9389 +- 0.2092 | 0.8030 | -0.65 |
| u = 3 | B4 | 103 | 0.03460 | 0.9654 | 0.9798 +- 0.1333 | 0.6670 | -2.35 |
| u = 3 | B5 | 71 | 0.02835 | 0.9716 | 0.9721 +- 0.1630 | 0.7770 | -1.20 |
| u = 3 | B6 | 208 | 0.02502 | 0.9750 | 0.9933 +- 0.0890 | 0.6856 | -3.46 |
| u = 3 | B7 | 292 | 0.02159 | 0.9784 | 0.9864 +- 0.0928 | 0.7600 | -2.44 |
| u = 3 | B8 | 491 | 0.01918 | 0.9808 | 0.9844 +- 0.0618 | 0.7697 | -3.47 |
| u* | B3 | 40 | 0.09010 | 0.9099 | 0.9021 +- 0.1979 | 0.6270 | -1.39 |
| u* | B4 | 103 | 0.06977 | 0.9302 | 0.9375 +- 0.1348 | 0.7855 | -1.13 |
| u* | B5 | 71 | 0.05861 | 0.9414 | 0.9601 +- 0.1723 | 0.5456 | -2.41 |
| u* | B6 | 208 | 0.05027 | 0.9497 | 0.9508 +- 0.0948 | 0.6647 | -3.02 |
| u* | B7 | 292 | 0.04353 | 0.9565 | 0.9590 +- 0.0777 | 0.5785 | -4.90 |
| u* | B8 | 491 | 0.03911 | 0.9609 | 0.9636 +- 0.0672 | 0.7184 | -3.65 |
| u = 5 | B4 | 57 | 0.18364 | 0.8164 | 0.8236 +- 0.1506 | 0.4850 | -2.25 |
| u = 5 | B5 | 71 | 0.17638 | 0.8236 | 0.8308 +- 0.1393 | 0.2887 | -3.89 |
| u = 5 | B6 | 208 | 0.14411 | 0.8559 | 0.8609 +- 0.0830 | 0.4292 | -5.20 |
| u = 5 | B7 | 292 | 0.13540 | 0.8646 | 0.8722 +- 0.0762 | 0.4392 | -5.68 |
| u = 5 | B8 | 491 | 0.12081 | 0.8792 | 0.8706 +- 0.0572 | 0.4576 | -7.23 |

Pooled over all bands: `0.9838 +- 0.0406` null against `0.7456` measured,
`z = -5.87`, at `u = 3` on `df = 1205`; `0.9558 +- 0.0406` against `0.6677`,
`z = -7.09`, at `u*`; `0.8643 +- 0.0374` against `0.4382`, `z = -11.39`, at
`u = 5` on `df = 1119`.

**The uncalibrated variant N1 is reported for the record and is not used.**
Centring on `Xnaive` while scoring against `Xcorr` returns `chi2/df` of 2.006 to
33.243, which is the 26% fundamental-lemma bias squared and divided by the main
term, not a dispersion. It is printed so the reason the mean-matched variant is
the control is visible rather than asserted.

### 3b. Per-anchor null variance against the actual squared error, and the Fano factor

`Var_null = C p (1 - p)` is exact per anchor. The actual has one observation per
anchor, so its analogue is `E^2`, whose expectation under the null is exactly
`Var_null`; under the null `E^2/Var_null` is `chi2` on 1 df, mean 1, median
0.4549, and `P(E^2 < Var_null) = 0.6827`. [MEASURED, SEC 4.]

| depth | band | `<Var_null>` | `<E^2 actual>` | ratio | median `E^2/Var_null` | Fano null | Fano actual | frac `E^2 < Var_null` |
|---|---|---|---|---|---|---|---|---|
| u = 3 | B3 | 9.95 | 8.59 | 0.863 | 0.4037 | 0.9531 | 0.8230 | 0.725 |
| u = 3 | B5 | 48.88 | 38.24 | 0.782 | 0.3692 | 0.9717 | 0.7601 | 0.718 |
| u = 3 | B8 | 260.41 | 194.50 | 0.747 | 0.3506 | 0.9809 | 0.7326 | 0.749 |
| u* | B5 | 98.31 | 50.08 | 0.509 | 0.2727 | 0.9413 | 0.4795 | 0.803 |
| u* | B7 | 307.64 | 185.09 | 0.602 | 0.3200 | 0.9568 | 0.5756 | 0.822 |
| u* | B8 | 520.34 | 386.28 | 0.742 | 0.3180 | 0.9611 | 0.7135 | 0.749 |
| u = 5 | B5 | 256.49 | 88.82 | 0.346 | 0.1930 | 0.8241 | 0.2854 | 0.915 |
| u = 5 | B8 | 1476.11 | 717.59 | 0.486 | 0.2689 | 0.8794 | 0.4275 | 0.845 |

(Six rows are elided for width; the full 17-row table is in the producer's
OUTPUT, SEC 4.) Across all 17 cells the ratio `<E^2>/<Var_null>` runs 0.346 to
0.863, the median `E^2/Var_null` runs 0.1761 to 0.4538 against the null's
0.4549, the null Fano factor runs 0.8152 to 0.9809 and the actual Fano factor
runs 0.2854 to 0.8230, and the fraction of anchors with `E^2 < Var_null` runs
0.699 to 0.915 against the null's 0.6827.

### 3c. The systematic offset is not what produces the deficit

Fitting one relative offset per band, `E = b * Xcorr`, and removing it
[MEASURED, SEC 5]: the largest move is B3 at `u = 3`, `0.8030` to `0.7377`; at
B8/`u*` the move is `0.7184` to `0.7177`; at B5/`u = 5` it is `0.2887` to
`0.2886`. The offset part `<E>^2/<Xmain>` is at most 0.0266 and is 0.0009 at
B8/`u*`. **The deficit is scatter, not bias.**

### 3d. The second null: CRT-exact thinning

`N3` keeps the primes independent of each other but gives each prime a uniformly
random offset `t mod p` and kills exactly the openers with `a = t` and
`a = t - 2`, so each prime's kill count in the window is `W/p + O(1)` as
arithmetic's is, rather than `Binomial(C, 1/p)`. 40 anchors per band, 60
replicates, same seed family. Sampler gate: `<mean_N3>/<Xnaive>` runs 0.9975 to
1.0059 at every cell. [MEASURED, SEC 6.]

| depth | band | `Var_N3/Var_binom` | N3 predicts `chi2/df` | measured, same anchors | measured / N3 |
|---|---|---|---|---|---|
| u = 3 | B3 | 0.5484 | 0.5227 | 0.8030 | 1.5364 |
| u = 3 | B4 | 0.5102 | 0.4920 | 0.6648 | 1.3511 |
| u = 3 | B5 | 0.5403 | 0.5249 | 0.8344 | 1.5897 |
| u = 3 | B6 | 0.5729 | 0.5585 | 0.6018 | 1.0776 |
| u = 3 | B7 | 0.5159 | 0.5047 | 0.8010 | 1.5870 |
| u = 3 | B8 | 0.5528 | 0.5422 | 0.6863 | 1.2657 |
| u* | B3 | 0.5383 | 0.4905 | 0.6270 | 1.2782 |
| u* | B4 | 0.5380 | 0.4989 | 0.6904 | 1.3838 |
| u* | B5 | 0.5534 | 0.5207 | 0.5603 | 1.0761 |
| u* | B6 | 0.5553 | 0.5273 | 0.6157 | 1.1676 |
| u* | B7 | 0.5608 | 0.5364 | 0.4601 | 0.8578 |
| u* | B8 | 0.5750 | 0.5525 | 0.9800 | 1.7736 |
| u = 5 | B4 | 0.4068 | 0.3328 | 0.5252 | 1.5781 |
| u = 5 | B5 | 0.4209 | 0.3433 | 0.3239 | 0.9432 |
| u = 5 | B6 | 0.4173 | 0.3567 | 0.5140 | 1.4410 |
| u = 5 | B7 | 0.4172 | 0.3603 | 0.5170 | 1.4350 |
| u = 5 | B8 | 0.4434 | 0.3899 | 0.4819 | 1.2360 |

Pooled over the subsample bands, which is the only level these ratios are read
at because a single cell of 40 anchors carries a `chi2`-on-1-df sampling sd of
about a fifth of its own value:

| depth | anchors | N3 predicts | measured, same anchors | ratio |
|---|---|---|---|---|
| u = 3 | 240 | 0.5242 | 0.7319 | 1.396 +- 0.127 |
| u* | 240 | 0.5211 | 0.6556 | 1.258 +- 0.115 |
| u = 5 | 200 | 0.3566 | 0.4724 | 1.325 +- 0.132 |

The measured column in this table is the SUBSAMPLE's, on the same 40 anchors per
band the `N3` replicates use. **The second pairing, against the FULL-band
measured value, is now computed inside the same producer** (SEC 7; origin of the
question: `redteam-0829-measure-b.md` §1a A-EDIT-2 through
`applied-0829-measure-b.md`, whose figure was scratchpad-authority and is
superseded here by an embedded one). [MEASURED, SEC 7.]

| depth | N3 pooled, subsample weights | measured pooled, full-band weights | ratio A | N3 pooled, full-band weights | ratio B |
|---|---|---|---|---|---|
| u = 3 | 0.5242 | 0.7456 | 1.4224 | 0.5300 | 1.4068 |
| u* | 0.5211 | 0.6677 | 1.2815 | 0.5357 | 1.2464 |
| u = 5 | 0.3566 | 0.4382 | 1.2288 | 0.3701 | 1.1839 |

**The producer's ratio A agrees with the red team's figure to the digits it
quoted** (1.422, 1.281, 1.229 against 1.4224, 1.2815, 1.2288), so nothing is
carried here that differs from it. **Ratio A mixes two weightings, though**: the
`N3` prediction is pooled with equal weight per band, 40 anchors each, while the
measured value is pooled by true band size. Ratio B pools both by band size and
is the consistent pairing; it reads **1.18 to 1.41**. So three bands are now on
the record for the same excess, 1.26 to 1.40 (subsample pairing), 1.23 to 1.42
(ratio A), 1.18 to 1.41 (ratio B), the direction is the same in all three and
every one of the nine numbers is above 1. The per-band `ratio full` column of
SEC 7 shows the spread that makes the pooling choice matter: 0.8409 to 1.5743
across the 17 cells.

## 4. Readings against the pre-registration

**The disconfirming half first: the registered prediction is wrong as stated,
and one registered falsifier fires.**

**F3 is the case that occurred, and it was registered in advance.** The null
does **not** return 1. It returns `1 - p` exactly, `p = Xmain/C`, because the
independent-thinning null is a binomial null and a binomial has variance
`C p (1 - p)`. The registered threshold was: a null return in `[0.95, 1.0]`
confirms the normalisation; below 0.90 triggers F1. At `u = 3` the null returns
0.9519 to 0.9808, inside the confirming interval. At `u*` it returns 0.9099 to
0.9609, so B3, B4 and B5 fall below 0.95 and none falls below 0.90. **At
`u = 5` it returns 0.8164 to 0.8792, entirely below 0.90, so F1 fires at that
depth by the letter of the pre-registration.** The consequence, stated as
registered: `attack-roughpair-error.md`'s sentence "Below 1 everywhere:
sub-Poisson" is **WEAKENED**, because 1 is the wrong reference. The correct
reference is `1 - p`, and the size of the correction is 2% at `u = 3`, 4 to 9%
at `u*`, and 12 to 18% at `u = 5`. Of the 0.711 shortfall in that note's lowest
quoted value (0.289 at B5, `u = 5`), 0.176 is the normalisation.

**F2's substance holds anyway, and this is the second reading.** Against the
mean-matched null the measured value is still below, at every one of the 17
band-depth cells. Pooled: `z = -5.87` at `u = 3`, `-7.09` at `u*`, `-11.39` at
`u = 5`. Two cells are not individually distinguishable from the null (B3 at
`u = 3`, `z = -0.65`, `n = 40`; B4 at `u*`, `z = -1.13`, `n = 103`), and the
Monte Carlo's own range shows why: the band statistic on 40 anchors has an sd of
0.21. **So the dispersion deficit is real at the pooled level and is not an
artefact of the normalisation, but its size is smaller than the note's framing
implied** [MEASURED, two decades, 1,205 anchors at `u = 3` and `u*`].

**Third reading, and it changes the classification rather than the size.** The
deficit has a mechanism, and the mechanism over-explains it. `N3` inserts one
fact and nothing else: a residue class mod `p` meets an interval of length `W`
in `W/p + O(1)` openers, so a prime's kill count is near-deterministic where the
independent-openers null makes it binomial. That single change cuts the null's
variance to 0.4068 to 0.5750 of the binomial null's, and the `chi2/df` it
predicts is 0.4905 to 0.5585 at `u = 3` and `u*` and 0.3328 to 0.3899 at
`u = 5`. **The measured value is not below that. It is above it**, by pooled
ratios `1.396 +- 0.127`, `1.258 +- 0.115` and `1.325 +- 0.132` at the three
depths, consistent across depths and 2 to 3 sd above 1 in each. Those three
ratios pair `N3` against the subsample's own measured value; the two full-band
pairings, computed in the same producer (SEC 7), give 1.4224, 1.2815, 1.2288
under the red team's mixed weighting and 1.4068, 1.2464, 1.1839 under the
consistent one, so the excess band across all three pairings is 1.18 to 1.42 and
its lower end sits at `u = 5` (§3d).

**Fourth reading, on what the deficit is not.** It is not the systematic offset:
removing a per-band relative offset moves `chi2/df` by at most 0.0653 (B3,
`u = 3`) and by 0.0007 at B8/`u*`. It is not carried by a few anchors: the
fraction of anchors with `E^2` below the null variance runs 0.699 to 0.915
against the null's own 0.6827, and the median of `E^2/Var_null` runs 0.1761 to
0.4538 against the null's 0.4549, so the whole distribution is shifted rather
than its tail.

**Fifth reading, the one the controlled note asked for and did not have.** Its
NOT REACHED list says the sub-Poisson dispersion "has no mechanism offered. It
may be the exact constraint `T + M + X + singles = C`, it may be the fold
structure, it was not investigated." Neither guess is needed. The mechanism
measured here is elementary equidistribution of residue classes in an interval,
and it accounts for the deficit with about 30% to spare in the opposite
direction [MEASURED for the accounting, HEURISTIC for the attribution: no model
of the residual 30% was fitted, and prime-prime dependence is only the natural
candidate, not a demonstrated one].

## 5. D8's classification

`object-models-read-0829.md` §4 left D8 as the single row whose residue-level /
interval-level classification was open, on the grounds that "the main term
`C V_2(Q) rho(2)` is a product over primes ... hence residue-level; the error
`E` is the difference between an actual interval count and that main term, hence
interval-level in form; whether its dispersion carries anything beyond the
residue-level main term is exactly what the missing control would say."

**Classification: INTERVAL-LEVEL IN FORM, ELEMENTARY IN CONTENT, NOT
WALL-RELEVANT.** The same shape as D3's verdict, reached by a different route.
The argument, in the order the evidence forces:

1. **The dispersion is not explained by the residue-level main term alone.**
   The mean-matched independent-thinning null takes its VARIANCE form from the
   per-prime densities `2/p`, which is exactly the residue content of the main
   term, and its centring from `Xcorr`, which additionally carries the
   fundamental-lemma factor `omega(u) e^gamma`; and
   it returns 0.816 to 0.981 while the actual returns 0.289 to 0.803. Pooled
   `z = -5.87` to `-11.39`. So something outside the product over primes is
   acting [MEASURED].
2. **What is acting is a counting fact about intervals, and it is free.** `N3`
   inserts one arithmetic mechanism relative to the first null, a single random
   offset `t mod p` per prime, and that mechanism carries two consequences, not
   one: each prime's kill count in the window becomes near-exact, AND the kill
   positions become exactly periodic. The second is what makes the openers
   dependent, and it is the one that does the variance work. That is the
   statement "a residue class mod `p` meets an interval of length `W` in
   `W/p + O(1)` elements", which is elementary and needs no equidistribution
   input beyond division with remainder. It reproduces the entire deficit
   [MEASURED, `Var_N3/Var_binom` 0.4068 to 0.5750].
3. **After that fact is in the null there is no regularity left to explain, in
   either direction that would matter.** The actual is 1.26 to 1.40 times *more*
   dispersed than `N3`, not less. A count that is more dispersed than an
   equidistribution model is the ordinary situation: the primes are not
   independent of each other, and `N3` assumes they are. Nothing in the residual
   points at extra structure in the placement of primes; it points at the model
   being too simple in the direction everybody expects [MEASURED for the ratio,
   HEURISTIC for the attribution].
4. **Therefore the deviation carries no interval-level information the wall
   could feel.** By `THE-LENS.md` §5's rule the phrase that matters is "a
   relation between the pattern and a stretch of the number line". The relation
   demonstrated here is `floor(W/p)` against `W/p`, which is arithmetic of the
   window length and not of the primes in it. The parity obstruction does not
   live there, and no bound on `X` follows from a variance statement in any
   case.

**This retires §4's one open row.** Section 4's summary read "Seven
residue-level, one interval-level in form and blocked by a quantifier, one
unclassified with an unrun control." It now reads: the unclassified row
classifies interval-level in form and elementary in content, and
`object-models-read-0829.md`'s conclusion that "nothing on the list carries
interval-level information the wall could feel" is unchanged, with one fewer
gap in it [the classification is MEASURED-based reasoning, not a theorem].

**What this is not.** It is not a statement about `T`, not a bound on `X`, and
not a change to the wall. `attack-roughpair-error.md` §5's relocation of the
wall onto the depth (slack 1.056 at the crossing, `Xmain/T = 5.631` at
`beta_2 = 4.2665`) is untouched by anything here: the null measures the scatter
of `X` about its main term, and the wall that note found is in the main term.

## 6. Defects, and what would falsify

**Defects.**

1. **The pre-registration is timestamped by disk order, not sealed.** §1 was
   written before the producer existed and before any null number was produced,
   but the only evidence of that is file ordering in this session. Weaker than a
   sealed prereg and recorded as such. The F3 clause in particular was written
   before the run, and a reader is entitled to weigh it as if it were not.
2. **The registered prediction failed and the fallback clause carried it.** A
   prereg whose main prediction misses and whose escape clause fits is worth
   less than one whose prediction hits. The honest summary is: the brief's
   expectation of `1 +- 0.05` was wrong at two of three depths, and the reason
   was foreseeable arithmetic rather than a discovery.
3. **`N3` is a subsample.** 40 anchors per band and 60 replicates against the
   measured value's full 1,205. The per-cell ratios in §3d range 0.858 to 1.774
   and are read only pooled. A full-anchor `N3` at `u*` was priced at roughly
   `4.5e10` opener-prime operations and not run. The `+-` on the three pooled
   ratios is `1.41/sqrt(n)` times the ratio, the `chi2`-on-1-df sampling sd of
   the MEASURED value alone. `N3`'s own sampling error, 40 anchors at 60
   replicates, is not in it, so the quoted band understates the uncertainty on
   the ratio by an unmeasured amount.
4. **The residual 30% is unattributed.** Prime-prime dependence is the natural
   candidate and was not fitted. Two alternatives were not excluded: a finite-`W`
   effect in `N3`'s `O(1)` term, and a mis-centring of the Buchstab-corrected
   main term that would inflate `E^2` at fixed variance.
5. **Two decades.** `Q <= 10007`. `p = Xmain/C` falls with `Q` (0.0481 to
   0.0192 across bands at `u = 3`), so the size of the normalisation correction
   itself is height-dependent and the reading at `Q -> infinity` is not
   available here.
6. **No blind forecast.** The `N3` comparison was not pre-registered; it was
   added after the first null returned, precisely because the first null's
   answer invited the question. It is reported as an exploratory second stage,
   not as a registered test, and its 1.26 to 1.40 excess should be re-run blind
   before it is leaned on.
7. **`E` was not split by side (A/B)**, carried forward from the controlled
   note's own NOT REACHED list and still not done.

**What would falsify each claim, and whether the check has run.**

| claim | falsifier | run? |
|---|---|---|
| the null's `chi2/df` is `1 - p` exactly | a Monte Carlo mean outside the closed form's Monte Carlo error | RUN: `R = 200`, agrees at all 17 cells |
| the closed form is the right null | a per-prime brute-force sampler disagreeing in mean or variance | RUN: 6 small anchors, 4,000 replicates, ratios 0.978 to 1.047 |
| the measured deficit against N2 is real | pooled `z` above -2 at any depth | RUN: -5.87, -7.09, -11.39 |
| the deficit is scatter, not bias | removing the per-band offset closes it | RUN: largest move 0.0653, at B3 |
| equidistribution explains the deficit | `N3` variance not below the binomial null's | RUN: 0.4068 to 0.5750 of it |
| nothing extra-regular remains | measured below `N3`'s prediction | RUN: measured is 1.26 to 1.40 times **above** it |
| the residual excess is prime-prime dependence | a null with real primes and random window placement returning the same excess | **NOT RUN** |
| the reading survives height | a decade extension past `Q = 10007` | **NOT RUN** |
| `N3`'s subsample is representative | full-anchor `N3` at one depth | **NOT RUN**, priced at `4.5e10` operations |

**One line for the ledger.** `Q-roughpair-error` should stay PARTIAL on its own
question, which was about the size of the error and not about its dispersion;
what changes is that its "sub-Poisson" phrasing now needs the reference `1 - p`
rather than 1, and its NOT REACHED entry "that control was not run" is
discharged.

---

*Producer and custody: `research/measure-roughpair-null-0829.js`, embedded,
`--check` bit-honest, two `--force` re-embeds disclosed in §2 with `0 of 513`
and `0 of 512` figures unreproduced. CITED, never recomputed: the capture
identity (`attack-quadpoint-03.js`), the 25 `K*` values and Z1's band means
(asserted here as an engine gate), Ford's §1.7.2/§1.7.1 through
`quadpoint-prior-art.md`. History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
