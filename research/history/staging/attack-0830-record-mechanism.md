# A mechanism attack on the residual of Kourbatov's b: sub-Poisson dispersion, the tile's gap law, and Kourbatov's own k = 1 heuristic, each pre-registered and scored

<!-- ledger
id: Q-record-mechanism-0830
status: PARTIAL
todo: Z5
question: Which of three candidate mechanisms (sub-Poisson gap dispersion, the tile's exact gap law, Kourbatov's k = 1 conspiracy heuristic transported to k = 2) carries the residual 0.78 to 0.97 of Kourbatov's b, at what derived size, and what fraction of b is left?
verdict: The residual is carried by the twin-prime gap law AT HEIGHT and by nothing else tried: a new sieve to 1e11 measures that law under-dispersed (CV^2 rising 0.7276 to 0.9295 over seven decades) with a far tail steeper than exponential (log-slope 1.0638 at the top decade), and fed into the record null it carries 95.7 to 99.8 percent of the residual (d b_z = 1.0370 and 1.0806 +- 0.0014 against 1.0833, MEASURED on a model, paired, 2000 replicates); the tile's period-wide law (d b_z = 8.10) and Kourbatov-Wolf's k = 1 bin-count heuristic (4.20) overshoot by 4 to 7x and are closed as posed; the transport of a bare CV^2 is family-dependent (0.62 against 1.06 at CV^2 = 0.93), so "computable from Var/E" is false as stated; Kourbatov-Wolf's second-order scale a_c/abar tracks the measured CV^2 to within 0.04 at every decade with no parameter and is an ansatz, not a derivation; the shape statistic moves a third of the way toward the data (z_D from -1.64 to -0.97); what is left with no derivation is the gap law itself, and the top height band's b (0.937 measured against 1.69 to 1.98 predicted on 17 records) is the open falsifier.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-records.md`).** An
> independent 30-wheel sieve to 1e11 returns this note's seven decade counts
> to the unit and its CV² and far-tail slopes to four decimals, and those
> counts match the published π₂(10^k) — an external check neither corpus had
> run. The record null rebuilt with a different generator gives d b_z =
> 1.0375 / 1.0818 against this note's 1.0370 / 1.0806. Two corrections: the
> ±0.0014 is Monte-Carlo error ONLY, and a ±0.02 shift in the far-tail slope
> moves d b_z from 0.9888 to 1.1720, so the systematic dwarfs the quoted
> interval; and the note's kill rule could not fire, the flagship band's
> floor 0.5 exceeding the kill threshold 0.4343. TODO Z5's title is supported
> — the resolved range alone carries 72% of the residual.

*(2026-08-30. Staging note, HELD; nothing here is integrated into a live
document. Producer: `research/history/staging/attack-0830-record-mechanism.js`,
to be formally embedded by `node research/qc/embed.js`. Custody: section 2 is
written and saved to disk BEFORE the producer exists; disk order only, not a
seal, the same weaker custody `measure-record-null2-0829.md` §1 discloses. No
twin data beyond `research/a113274-gap-records.js`, except that section 2d
registers a NEW sieve of twin primes to a stated height whose only purpose is a
gap histogram at height; it is priced there. Calibration marked per claim.
Category (i) throughout, self-assigned as in `measure-record-null2-0829.md`:
`attack-wrongdirection-audit.md` §5 records Z5 as not audited. Nothing below is
a statement about T, the tile's G2 exponent, or the Zone Postulate, and Z5 is
off the exponent's critical path; every inequality used here is a statement
about a simulated record process and is labelled with its direction where it
appears.)*

## 0. What is still open, and what this note is

Read before the numbers.

- **The mechanism is now located, not derived.** [MEASURED on a model] The
  residual of `b` sits in the twin-prime gap law at height, which this note
  measures directly for the first time in the corpus (§3b) and which, fed
  into the record null with no parameter, reproduces the data's `b_z` to
  0.3 to 4 per cent of the residual (§3c). Why twin gaps at height are
  under-dispersed with a tail 6 per cent steeper than exponential is a
  question about the correlation structure of twin primes that nothing in
  either corpus derives. The item's coordinate moves from "records sit low
  and nothing carries it" to "the gap law at height carries it and nothing
  derives the gap law".
- **The transport is height-stationary in `abar` units, and the law is not
  stationary.** `CV^2` rises from 0.7276 at `[1e4, 1e5)` to 0.9295 at
  `[1e10, 1e11)` (§3b), so the law measured at one decade and applied at all
  72 record heights is a hypothesis. Its visible cost is the height profile:
  the transported law predicts `b_z` rising to 1.90 to 1.98 in the top band
  where the data read 0.937 on 17 records (§3d). Not resolved here.
- **The far tail in the record regime is extrapolated.** The measured law is
  resolved to `u = 12.85` (tail count 30) and records sit at `u` of 15 to 35,
  so the load-bearing assumption is that the `[4, 12]` log-slope of 1.0649
  continues. A sieve to 1e12 would push the resolved range to about `u = 19`
  and is priced in §7.
- **Kourbatov-Wolf's second-order scale is a fit that tracks, not a
  derivation.** `CV^2 = a_c(x)/abar(x)` matches the measured `CV^2` to within
  0.04 at all seven decades with no parameter (§3b), and as a gap law it
  carries 115 per cent of the residual (§3c), slightly over. HEURISTIC.
- **Two of the brief's three candidates overshoot by 4 to 7x and are closed
  as posed** (§3c): the tile's period-wide law and the `k = 1` bin-count
  heuristic. The brief's claim that the sub-Poisson effect is "computable
  from the measured Var/E" is false as stated: the same `CV^2` gives 0.62 or
  1.06 depending on the family (§6).
- **The whole family is a comparison against a conjectural null**, unchanged
  from all three predecessors, and category (i) throughout.

## 1. b, defined exactly, and the in-house values (deliverable a)

[VERIFIED by citation; the producer gates on reproducing every figure here]

Kourbatov's definition, JIS 16 (2013) 13.5.2 eq. (1), page-verified in
`lit-kourbatov-shortfall.md` §7 and re-read from the arXiv v3 text this
session (sha256 `08c584de...`, matching that note's §2 table): the estimator
`E_1(G_k(p)) = max(a, a log(p/a) - ba)` with `a = C_k log^k p`, `C_2 = 0.75739`
(his reciprocal Hardy-Littlewood constant; the repo's `1/(2C2)`). So `b` is the
number of average gaps by which the record gap sits below the EVT trend
`a log(p/a)`. In the repo's variables, with `abar(x) = ln^2 x/(2C2)`,
`T(x) = abar(x) ln(x/abar(x))` and `z_k = (g_k - T(e_k))/abar(e_k)` at each
record's end `e_k = s_k + g_k + 2`:

- `b_z = -mean_k z_k` over the window `e in [1e4, 7.05e16]`, `n = 72`: this is
  Kourbatov's mean-unbiased `b`;
- `b_med = -median_k z_k`, his median-unbiased `b` (2013 §5.1 footnote 5);
- `b_A = (1 - A)/mean_k(1/L_k)` with `A = mean_k g_k/T(e_k)` and
  `L_k = ln(e_k/abar(e_k))`, the repo's trend-load summary, which
  `measure-record-null2-0829.md` §1b proves is the `1/L`-weighted mean of the
  same `-z_k` and therefore a poor estimator of a constant `b`.

The in-house values are cited from the embedded block of
`research/measure-record-null2-0829.js` (S1, S5, S6; file lines 690-706 and
738-786): `b_A = 1.1251`, `b_z = 1.2981`, `b_med = 1.3159`,
`mean_k(1/L_k) = 0.06269`, `b_med = 1.2597` at Kourbatov's own cut `e < 1e15`
on `n = 71`, and the published null's own `b_z = 0.2147 +- 0.2350` (ensemble
sd; standard error 0.0053). The producer reproduces all of these digit for
digit before it runs anything new, including the null at the same seeds; the
reproduction is printed in its S1.

**The residual this note attacks.** [cited] After the fullest null of the
predecessor (C12, both nulls), the residual is 0.8367 (A), 0.9732 (z), 0.7824
(median), at 3.16 to 4.19 ensemble sd. After the published null alone it is
`1.2981 - 0.2147 = 1.0834` in the z normalisation, which is the baseline every
delta below is measured against, because each candidate below replaces the
gap law and is run against the same N0e baseline on common random numbers.

## 2. Pre-registration: three candidates, each a model with a derived d b, written before the producer exists

*(Saved to disk before `attack-0830-record-mechanism.js` was created. Every
band below is a declared band, not a measurement; the producer prints the
formula evaluations and the ensemble readings, and section 3 scores them.)*

### 2a. The transport, common to all candidates, and its direction

The null draws gaps at height `x` from a law with mean `abar(x)` and measures
records at their end. Replacing the exponential by a law with survival
`S(u)`, `u = g/abar`, changes the record at `n = e^L` gaps to the `u*` with
`S(u*) = e^{-L}`, so the shift is `d z = u*(L) - L` and `d b = -d z`, averaged
over the null's own record heights. Direction, stated once: a law whose tail
is LIGHTER than `e^{-u}` at the relevant `u` has `u* < L`, records fall,
`d b > 0`, and the null moves TOWARD the data. A candidate with `d b` larger
than the residual has overshot and is closed as posed, not counted as a hit.
The residual is the target: `1.08` on the z route against N0e (section 1).
Every ensemble is 2,000 replicates on the predecessor's two seeded streams
(`0x7E5100 + r`, `0x9B1000 + r`), exact regime below `1e7`, block regime
above, so every delta is PAIRED against N0e exactly as in
`measure-record-null2-0829.md` §3a.

### 2b. Candidate (i): sub-Poisson dispersion

**The derivation.** A body dispersion `CV^2 = Var(g)/E(g)^2 < 1` constrains
the far tail only inside a parametric family, so the transport is
family-dependent and two families are run to bracket it.

- Gamma family, `Gamma(alpha, s)` with `alpha s = abar`, `alpha = 1/CV^2`.
  Its survival is `Q(alpha, u alpha) ~ (u alpha)^{alpha-1} e^{-u alpha}/Gamma(alpha)`,
  so `u* alpha = L + (alpha-1) ln(u* alpha) - ln Gamma(alpha)` and
  `d b = (1 - CV^2) L - CV^2 [(alpha - 1) ln L - ln Gamma(alpha)]` to first
  order, growing linearly in `L`.
- Shifted-exponential family, `g = delta + Exp(abar - delta)`,
  `delta = abar(1 - CV)`: `u* = (1 - CV) + CV L`, `d b = (1 - CV)(L - 1)`.

**Which CV^2.** The brief names "Var/E below 1 on the tile". The tile's own
number is `gap-spectrum-01.md` §3a: `sd/mean = 0.7270` at @31, i.e.
`CV^2 = 0.5285`, over the WHOLE period at mean gap 32.2, which is not the
height object. The height object's dispersion is in the corpus under another
name: `zone-tail-02-0829.md`'s renewal comparator `R = E[g^2]/(2E[g])` over the
measured twin-gap process at the top band reads `R_shell = 434.31` against a
mean tail of `447.26 = 0.9931 abar` (that note's tables at lines 310 and
375), so `R/abar = 0.9643` and, since `R/abar = (1 + CV^2)/2` for a renewal
law with mean `abar`, `CV^2 = 0.93` at heights near 1e11 [ARITHMETIC on cited
figures; the local `E[g]` is not printed there, so this carries a few per cent
of slack, band `[0.88, 0.98]`]. A second reading, the tail field itself
against the exponential, `0.9931 = (1 + CV^2)/2`, gives `CV^2 = 0.986`
(bootstrap `[0.957, 1.015]` from `c_local in [0.7410, 0.7630]`).

**Predictions, z route, paired against N0e, over the null's record heights
(mean `L` about 17).**

| model | CV^2 | predicted d b_z | band | reading if inside band |
|---|---|---|---|---|
| gamma, tile period-wide | 0.5285 | about 6 | `[4, 10]` | OVERSHOOT by 4 to 10x: the tile's period-wide law is not the height law; closed as posed |
| gamma, height (R route) | 0.93 | about 1.0 | `[0.6, 1.4]` | the right order for the residual, family-dependent |
| shifted exp, height (R route) | 0.93 | about 0.6 | `[0.4, 0.8]` | the lower end of the family bracket |
| gamma, height (tail-field route) | 0.986 | about 0.2 | `[0.05, 0.35]` | a fifth of the residual |
| gamma, `CV^2(x) = a_c(x)/abar(x)` (section 2e) | 0.76 to 0.95 across the window | about 1.2 | `[0.9, 1.6]` | lands on the residual with no free parameter, no derivation |

**Falsifier for the sub-Poisson story as a whole:** the direct height
histogram of section 2d shows a far-tail log-slope in `u` of `-1.02` or
shallower over `u in [4, 12]` while `CV^2 < 0.95`; then the dispersion sits
in the body and cannot move the records, and (i) is closed at height too.

### 2c. Candidate (ii): the tile's exact gap law replacing the exponential

**The law.** `gap-spectrum-01.js`'s embedded @31 tail table (file lines
815-831; 15 points, `u = t/mbar` from 0.5 to 12, `D = 6,226,553,025`),
rescaled to mean `abar(x)` at height, log-linear in `-ln S(u)` between
points, and beyond `u = 10` extrapolated with that table's last-decade slope
`-1.9126` (file line 895); a second variant hard-caps the law at the tile's
own `max/mean = 10.804`.

**The derivation.** From the table, `-ln S(u)` reads about 7.3 at `u = 5`,
10.1 at 6, 12.6 at 7, 14.9 at 8, 17.2 at 9, 18.9 at 10. A record needs
`-ln S(u*) = L`, so `u* = 7.2` at `L = 13` where the exponential has 13, and
`u* = 11` at `L = 21`. **Predicted `d b_z` about 6, band `[4, 10]`, and
larger under the hard cap.** That is an overshoot by 4 to 10x, so the
reading registered in advance is: the tile's period-wide gap law is far
lighter than the twin-prime gap law at height; the data's own records reach
`g/abar = 18.6` at 1e8 and `34.7` at the top of the ladder
(`4770/257`, `35640/1028`, cited arithmetic on the ladder), where the tile at
6.2e9 gaps never exceeds 10.8 means. Candidate (ii) is expected to close
before it runs, and it runs so that the size is a measurement.

### 2d. Candidate (ii'), the corrected object: the twin-prime gap law AT HEIGHT, measured by a new sieve

No histogram of twin-prime gaps at height exists in the corpus (checked:
`gap-spectrum-01`, `measure-tail-deficit-0829`, `operator-and-pair-count` are
all tile objects; `zone-tail-02` carries only `R`). **Price:** a segmented
sieve to `X_s = 1e10`, twin gaps lesser-to-lesser, each gap normalised by
`abar` at its own start, histogrammed in `u` at width 0.05 per decade of
height; estimated 5 to 20 minutes single-thread, under the 4-hour rule.
Custody: the pair count per decade is checked against `2C2 Li_2` and the
per-decade maximum against the adopted ladder before any reading.

**Predicted [registered]:** top decade `[1e9, 1e10)`: `CV^2 in [0.88, 0.98]`;
far-tail OLS slope of `ln S(u)` against `u` over `u in [4, 12]` in
`[-1.15, -1.00]`; the ratio `S(u)/e^{-u}` monotone decreasing above `u = 2`.
Then that decade's `S(u)` (extrapolated beyond its last resolvable `u` by its
own far-tail slope) replaces the exponential in the record null: **predicted
`d b_z` in `[0.5, 1.5]`, point 1.0.** If it lands inside and the shape checks
hold, the honest label is MEASURED-on-a-model with the height-stationarity
of `S(u)` in `abar` units as the unproven hypothesis.

### 2e. Candidate (iii): Kourbatov's own mechanism, transported

**What the source says.** Kourbatov-Wolf, Mathematics 7 (2019) 400 §2.3.2,
eqs (22)-(33), read from the arXiv text this session (sha256 `7d69b356...`,
byte-identical to the corpus's record): for `k = 1` only, "primes conspire
together", each prime lowering the maximal gap by about `p^{-1} log x`,
`sum 1/p ~ log log x`. Mechanism: the gap histogram
`tau(d, x) ~ P(d) B(x) e^{-d A(x)}` with `A, B` fixed by the count (24) and
the total length (25), giving `A = pi/x`, `B = c pi^2/(sx)` (29), and the
maximal gap read off as the `d` where `tau(d, x) = 1` (31), so
`G ~ (x/pi)(log(pi^2/x) + log c)` (32). Two ingredients, separable:

- (iii-S) the histogram's scale is the AVERAGE gap below `x`, `x/pi`, the
  lower-trend `a_c` of their Definition 2, which by their eq (10) sits
  `k/log x` below the local `abar`; this is the only Hardy-Littlewood
  second-order term in the source;
- (iii-B) the bin-count criterion `tau = 1`, which sits `a log(a/c)` below
  the EVT maximum `a log n` of an exponential sample, because it asks where
  the histogram bin of width `c` holds one gap rather than where the number
  of gaps above `d` is one.

For `k >= 2` the source says the EVT formulas "work well" and fits `b`
empirically; it offers no mechanism at `k = 2`.

**Predictions.** (iii-B) transported to `k = 2` with `c = 6`:
`d b = mean_k ln(abar_k/6)`, about 2.4 at 1e4 rising to 5.1 at 1e16,
**mean about 4.2, band `[3.5, 5.5]`**: overshoot by 3 to 5x, closed as
posed, and the data's band profile of `b` (`lit-kourbatov-shortfall.md` §5:
0.713, 1.816, 1.620, 0.937) does not rise by 2.7 across the window.
(iii-S) as a trend swap, `T_c` for `T-bar_c`: not a mechanism, because the
residual is data minus a simulated null under the SAME trend and is
invariant up to a composition term `mean_null(Delta/abar) - mean_data(Delta/abar)`,
**predicted `|composition| < 0.10`**. (iii-S) as a gap-law statement, mean
`abar` (forced by the pair count, calibrated to 3e-5) with tail scale
`a_c(x)`: this is the last row of 2b's table, `CV^2(x) = a_c/abar`,
`d b = mean_k eps_k (L_k - ln L_k - gamma)` with `eps = 1 - a_c/abar`,
**about 1.2, band `[0.9, 1.6]`**.

### 2f. Deliverable (d), the shape statistic, and the kill rule

`D = mean(z) - median(z)` reads 0.0179 in the data against 0.2108 +- 0.1179
in N0 (cited). Under a gamma law the record's `z` is compressed by `CV^2`
with its skew unchanged, so **predicted `D` about `0.21 CV^2`, i.e. 0.19 to
0.20 for the height candidates and no candidate below 0.10**, except possibly
the truncated tile law, for which no prediction is made. Kill rule, fixed:
if the candidates with a derivation together leave more than half of `b`
unexplained, the item's coordinate is "b has no mechanism in any model this
corpus can build". A candidate counts toward the explained fraction only if
its `d b` lands inside its band AND it does not overshoot the residual.

## 3. Results

*(Producer embedded 2026-08-30: code-sha256 `b6119e50...`, out-sha256
`72394a91...`, 120 body lines, two hashed inputs (`a113274-gap-records.js`,
`gap-spectrum-01.js`). Disclosure: a smoke test at 1e9 and 40 replicates ran
before the embedded run; §2 was saved before the producer existed and was not
edited after either run. The sieve ran to 1e11, above the registered 1e10,
because the timing test showed it affordable; the registered predictions are
scored on the registered decade `[1e9, 1e10)` and `[1e10, 1e11)` is reported
as an extension.)*

### 3a. Custody [VERIFIED, 12/12 and 7/7]

S1 reproduces, digit for digit and at the predecessor's seeds, the data's
`b_A = 1.1251`, `b_z = 1.2981`, `b_med = 1.3159`, `mean(1/L) = 0.06269`,
`b_med = 1.2597` at the `e < 1e15` cut on `n = 71`, and the N0e null's
`0.1639 / 0.2147 / 0.4255` with ensemble sd 0.235 and `N = 68.4`, through the
generalised law `U(v) = v`; the baseline residual is 1.0833. S3's sieve
matches the adopted ladder's running maximum at all seven decade ends
(630, 1452, 1722, 2868, 4770, 6030, 8040) and its pair counts sit at
0.98502 to 1.00604 of `2C2 Li_2` per decade, 1.00003 at the top. S2's trend
arithmetic reproduces `lit-kourbatov-shortfall.md` §5's scratchpad-grade
`mean T_c/T-bar = 0.9114`, `mean (T-bar - T_c)/abar = 1.483` and "32 of 72
below `T_c`", which puts those three figures inside output custody.

### 3b. The twin-prime gap law at height [MEASURED, sieve to 1e11]

| decade of `p` | gaps | mean `u` | `CV^2` | `a_c/abar` (ansatz) | `1 - 6/abar` (lattice) | slope `[4,12]` | `u_last` |
|---|---|---|---|---|---|---|---|
| `[1e4, 1e5)` | 1,019 | 1.0170 | 0.7276 | 0.7674 | 0.9262 | n/a | 3.10 |
| `[1e5, 1e6)` | 6,945 | 1.0077 | 0.8091 | 0.8207 | 0.9506 | 1.0829 | 4.85 |
| `[1e6, 1e7)` | 50,811 | 0.9940 | 0.8381 | 0.8531 | 0.9646 | 1.1834 | 6.55 |
| `[1e7, 1e8)` | 381,332 | 1.0007 | 0.8852 | 0.8750 | 0.9734 | 1.0935 | 8.95 |
| `[1e8, 1e9)` | 2,984,194 | 1.0002 | 0.9037 | 0.8910 | 0.9793 | 1.0661 | 10.70 |
| `[1e9, 1e10)` | 23,988,173 | 0.9999 | 0.9173 | 0.9033 | 0.9834 | 1.0649 | 12.85 |
| `[1e10, 1e11)` | 196,963,368 | 1.0000 | 0.9295 | 0.9131 | 0.9864 | 1.0638 | 14.70 |

Registered checks on `[1e9, 1e10)`: `CV^2 = 0.9173` in `[0.88, 0.98]` HIT;
far-tail slope 1.0649 in `[1.00, 1.15]` HIT; `S(u)/e^{-u}` monotone
decreasing above `u = 2` HIT (1.01429 at 1, then 0.96541, 0.91437, 0.85749,
0.80306, 0.74733, 0.69657, 0.65887, 0.59215, 0.57297, 0.56160, 0.49529 at
`u = 2..12`, resolved to tail counts of 73 at `u = 12`). The falsifier for the
sub-Poisson story (slope at or above `-1.02` with `CV^2 < 0.95`) did not fire.

Three readings, caveat first. (1) The law is not height-stationary: `CV^2`
rises monotonically through the seven decades and is still rising at the top,
and the `[4, 12]` slope falls from 1.18 to 1.06; whether `CV^2 -> 1` is not
settled by this range. (2) The `CV^2 = 0.93` this note read from
`zone-tail-02-0829.md`'s `R` before the sieve (§2b) is confirmed by the direct
measurement at `[1e10, 1e11)`, 0.9295. (3) Kourbatov-Wolf's second-order
scale `a_c/abar` tracks the measured `CV^2` at every decade: measured minus
ansatz reads `-0.040, -0.012, -0.015, +0.010, +0.013, +0.014, +0.016`
[ARITHMETIC on the table], with the 6Z lattice's geometric `CV^2` accounting
for only 0.01 to 0.07 of the shortfall from 1. That is a zero-parameter
agreement of a heuristic with a measurement, HEURISTIC, and it says nothing
about why. The top decade's slope 1.0638 against `1/CV^2 = 1.076`
[ARITHMETIC] says the far tail is close to a gamma of that `CV^2`.

### 3c. The candidates scored [MEASURED, 2,000 paired replicates; `d b_z` against N0e, s.e. 0.0003 to 0.0095]

| candidate | registered `d b_z` | measured `d b_z` | share of the residual 1.0833 | verdict |
|---|---|---|---|---|
| (i) gamma, tile period-wide `CV^2 = 0.5285` | about 6, `[4, 10]` | 7.2268 | 667.1% | inside band, OVERSHOOT 6.7x: closed as posed |
| (i) gamma, height `CV^2 = 0.93` | about 1.0, `[0.6, 1.4]` | 1.0573 | 97.6% | HIT, no overshoot (0.0261 left) |
| (i) shifted exp, `CV^2 = 0.93` | about 0.6, `[0.4, 0.8]` | 0.6223 | 57.4% | HIT, the lower end of the family bracket |
| (i) gamma, tail-field `CV^2 = 0.986` | about 0.2, `[0.05, 0.35]` | 0.2111 | 19.5% | HIT |
| (i)/(iii-S) gamma, `CV^2(x) = a_c/abar` | about 1.2, `[0.9, 1.6]` | 1.2479 | 115.2% | inside band, overshoots the residual by 0.1646 (0.7 ensemble sd of a single `b_z`) |
| (ii) tile @31 law, extrapolated | about 6, `[4, 10]` | 8.0960 | 747.3% | inside band, OVERSHOOT 7.5x: closed as posed |
| (ii) tile @31 law, hard cap 10.804 | larger | 16.9085 | 1560.8% | pathological (`N = 1449.8` records per replicate): closed |
| (ii') HEIGHT law `[1e9, 1e10)`, registered | `[0.5, 1.5]`, point 1.0 | 1.0370 | 95.7% | HIT, no overshoot (0.0464 left) |
| (ii') HEIGHT2 law `[1e10, 1e11)`, extension | as above | 1.0806 | 99.8% | HIT, no overshoot (0.0027 left) |
| (iii-B) KW bin-count at `k = 2`, `c = 6` | 4.2, `[3.5, 5.5]` | 4.2037 (arithmetic) | 388% | OVERSHOOT 3.9x: closed as posed |
| (iii-S) trend swap `T_c` for `T-bar` | composition `< 0.10` | `-0.0190` | n/a | not a mechanism, as registered |

Ensemble means of `b_z` for the two height laws are `1.2517 +- 0.2324` and
`1.2954 +- 0.2336` against the data's 1.2981; the `b_A` and `b_med` routes
land at `0.9718 / 0.9878` against 1.1251 and `1.4036 / 1.4407` against 1.3159,
i.e. the height law reproduces the z-route exactly and the other two routes
to within 0.15, which is the estimator-weighting spread `measure-record-null2-0829.md`
§1b pinned. All eleven registered bands held; the two candidates registered
as overshoots overshot, and the three registered to land landed. That every
band held is a criticism of the bands' width, not evidence of anything.

### 3d. The height profile, the open falsifier [MEASURED, 400 replicates per band, means only]

| law | `[1e4, 1e8)` | `[1e8, 1e11)` | `[1e11, 1e14)` | `[1e14, 8e16)` |
|---|---|---|---|---|
| data (n = 16, 15, 24, 17) | 0.713 | 1.816 | 1.620 | 0.937 |
| N0e | 0.081 | 0.162 | 0.194 | 0.252 |
| gamma 0.93 | 0.519 | 1.048 | 1.496 | 1.969 |
| shifted exp 0.93 | 0.366 | 0.694 | 0.950 | 1.229 |
| gamma `a_c/abar` | 1.106 | 1.403 | 1.556 | 1.694 |
| HEIGHT `[1e9, 1e10)` | 0.537 | 1.049 | 1.461 | 1.896 |
| HEIGHT2 `[1e10, 1e11)` | 0.491 | 1.124 | 1.548 | 1.978 |

Every candidate predicts `b_z` rising with height, because under a fixed
sub-exponential law the shortfall grows like `(1 - CV^2) L`; the data's top
band falls to 0.937. No band sigma is printed by this producer (owed). Scaling
the printed 72-record ensemble sd of `b_z`, 0.2336, by `sqrt(72/17)` gives
about 0.48 for a 17-record band [ARITHMETIC, a rough guide only], so the top
band sits about 2 sd below the stationary transport and about 1.6 below the
`a_c/abar` law, and the `[1e8, 1e11)` band about 1.5 above. This is the
discriminator between "the height law carries `b`" and "it carries the low
and middle bands only", and 17 records cannot settle it; it is the same
question `zonegap-03-model.md` §5 and both predecessors leave NOT REACHED.

## 4. Attribution bracket (deliverable c)

[MEASURED on models; the bracket is over which stated model is believed]

Of `b_z(data) = 1.2981`:

- 0.2147 is the published null's own level, calculus on the trend
  (predecessor, cited).
- The 6Z lattice's `[-0.006, +0.111]` (predecessor, law-dependent) is NOT
  additive with the height law: real gaps are on 6Z, so the sieve's law
  already contains whatever the lattice does, and the geometric lattice
  `CV^2` column of §3b shows it is 0.01 to 0.07 of the shortfall from 1.
- The height gap law carries `1.0370` to `1.0806` of the 1.0833 residual, as
  the measured law; `0.6223` to `1.0573` as a bare `CV^2 = 0.93` transported
  through two families; `1.2479` as Kourbatov-Wolf's `a_c/abar` ansatz.

So the fraction of `b` carried by a stated, checkable model runs from 64 per
cent (`0.2147 + 0.6223` over 1.2981, the shifted-exponential transport of the
dispersion alone) to 99.8 per cent (`0.2147 + 1.0806`, the measured law).
What no model carries with a derivation is the gap law itself: the corpus can
measure that twin gaps at height have `CV^2 = 0.93` and a far tail 6 per cent
steeper than exponential, and can note that `a_c/abar` predicts that `CV^2`
to 0.04 with no parameter, but it cannot derive either. **The kill rule of §2f
does not fire**: the candidates with a stated model leave 0.3 to 36 per cent
of `b` unexplained depending on the model, not more than half. The item's
coordinate is therefore not "b has no mechanism in any model this corpus can
build" but "b is the finite-height gap law of twin primes, which this corpus
can measure to 1e11 and cannot derive; the top height band is the open
falsifier".

## 5. Shape (deliverable d)

[MEASURED, 2,000 replicates] Data `D = 0.0179`, `sd(z) = 1.0213`,
`skew(z) = 0.5446`.

| law | `D`, mean +- sd | `z_D` | `sd(z)` | `skew(z)` |
|---|---|---|---|---|
| N0e | 0.2108 +- 0.1179 | -1.64 | 1.2487 +- 0.1771 | 1.0415 +- 0.5158 |
| gamma 0.93 | 0.1469 +- 0.1302 | -0.99 | 1.2979 +- 0.1751 | 0.7743 +- 0.4714 |
| gamma `a_c/abar` | 0.1647 +- 0.1107 | -1.33 | 1.1563 +- 0.1575 | 0.9350 +- 0.5040 |
| HEIGHT `[1e9, 1e10)` | 0.1519 +- 0.1288 | -1.04 | 1.2877 +- 0.1749 | 0.8010 +- 0.4777 |
| HEIGHT2 `[1e10, 1e11)` | 0.1453 +- 0.1317 | -0.97 | 1.3041 +- 0.1740 | 0.7664 +- 0.4685 |

The height candidates move `D` a third of the way toward the data and the
contrast from `-1.64` to about `-1.0` sigma; skew falls from 1.04 to about
0.78 against the data's 0.54; `sd(z)` does not move. §2f's registered point
(`D` about 0.19 to 0.20 under the height laws) MISSED by 0.05, inside the
ensemble sd; its floor ("no candidate below 0.10") held. The shape exposure
of the predecessor's §8d is eased, not closed: with the height law as the
null the data's shape sits at 1 sigma, which is nothing.

## 6. Brief errors recorded

- The brief's "(iii) a Cramér-model correction with the Hardy-Littlewood
  second-order term (Kourbatov's own conjectured source)". Checked at the
  source, section 2e: Kourbatov-Wolf's only mechanism is stated for `k = 1`,
  its second-order ingredient is `a_c = x/pi` against `abar` (their eq (10)),
  and for `k >= 2` the source offers no mechanism. The brief's description is
  not what the source says at `k = 2`; the candidate is run in the two forms
  the source actually contains.
- The brief's "(ii) the exact gap-length distribution of the tile ... the
  tile's gap law is NOT exponential at finite level and its tail is lighter
  or heavier by a computable amount". True of the tile, but the tile's
  period-wide law is not the object the record process samples; section 2c
  registers the expected overshoot and section 2d supplies the corrected
  object.
- The brief's "(i) ... a record process over a sub-Poisson point process has
  smaller extremes than the Poisson-matched one, and the size of that effect
  is computable from the measured Var/E". The direction is right and the size
  is NOT computable from `Var/E`: at the same `CV^2 = 0.93` the gamma
  transport gives `d b_z = 1.0573` and the shifted-exponential transport
  0.6223 (§3c), because a body dispersion fixes the far tail only inside a
  family. What is computable is the effect of the measured law, which is what
  §3c then does.
- Every other number in the brief was verified at its record before use
  (`measure-record-null2-0829.js` embedded block; `lit-kourbatov-shortfall.md`
  §5; `record-location-null.md` §2), and none was found wrong.

## 7. What would falsify this, and whether the check has run

- **The height law's match is an artefact of the extrapolated tail.**
  PARTIALLY RUN. Records sit at `u` of 15 to 35; the law is resolved to
  `u = 12.85` (tail count 30) and extrapolated at the `[4, 12]` slope. The
  gamma of the same `CV^2` (a different extrapolation) lands within 0.02 of
  it, and the `[4, 12]` slope agrees with `1/CV^2` to 0.012, so the two
  descriptions of the tail agree where both are measured. Settling it needs
  the tail one or two decades deeper: a sieve to 1e12 (about 2 hours on this
  machine by the 1e11 timing, under the 4-hour rule, NOT RUN) resolves to
  about `u = 19`.
- **The law is not height-stationary and the match is a coincidence of the
  window's mean height.** NOT SETTLED, and it is the live exposure. `CV^2`
  rises 0.7276 to 0.9295 over seven decades; the top band's data `b_z`
  (0.937) sits about 2 rough sd below every transported profile (§3d). The
  check that would settle it, records past 1e17, is unreachable; the cheaper
  check, per-band sigmas from the ensemble, is owed and is a 20-minute
  re-embed.
- **The sieve law contains the data's own records, so the match is
  circular.** RUN, in the negative: the histogram's resolved range stops at
  `u = 12.85` in the registered decade while that decade's own record
  (6030 at `abar` near 330, `u` about 18 [ARITHMETIC]) lies beyond it, and 63
  of the 72 window records lie outside `[1e9, 1e11)` altogether. The match
  is out of sample in both `u` and height.
- **The transported `CV^2` was read wrongly from `zone-tail-02-0829.md`.**
  RUN: the direct measurement at `[1e10, 1e11)` reads 0.9295 against the
  0.93 read from that note's `R` (§2b). Consistent.
- **The two overshooting candidates were mis-scaled.** RUN by construction:
  every law is mean-normalised (`mean u` is 0.9940 to 1.0170 raw and
  rescaled to 1 before use; the tile table is parsed from its embedded
  block). The overshoot is the tail, not the mean.
- **The whole comparison is against a conjectural null.** Standing and
  unfalsifiable here, as in every predecessor.
- **Someone has already measured the twin-gap law at height and its `b` in
  the owning convention.** NOT CHECKED beyond the four Kourbatov papers on
  disk; Wolf's 1990s preprints, which `lit-kourbatov-shortfall.md` §9 names
  as the standing hole, model exactly this histogram for `k = 1` and were
  not fetched. Nothing here is claimed as novel; the `a_c` scale is theirs.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md`
for the corpus rule.*
