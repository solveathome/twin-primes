# Z2 decomposed: D is identically zero, the per-zone field is the record ladder wearing zone coordinates, and the blind tests for [1e11, 1e12] are sealed

<!-- ledger
id: Q-zonegap-model
status: ANSWERED
todo: none
question: What is Z2 once decomposed, and does the per-zone field carry anything the record ladder does not?
verdict: Z2(p) = env(p) with D(p) identically zero (PROVEN conditional on the adopted ladder, VERIFIED 204 ways), so the per-zone field is the record ladder wearing zone coordinates and the u bimodality is closed; the blind tests for the [1e11, 1e12] decade are sealed and the sweep itself is not run.
-->

*(2026-08-21. Staging note; nothing here is integrated into a live document.
Producer, formally embedded: `research/zonegap-03-model.js` (1.2 s;
code-sha256 94361acf..., out-sha256 805cbcbe...; parsing + fitting +
controls only — no sieve beyond base primes to 1e6, per the LIGHT compute
budget). Inputs: the embedded 27,292-zone dataset of `research/zonegap-01.js`
(sha-bound dependency), the adopted A113274/A113275 ladder
(`research/a113274-gap-records.js`), and `research/tos-twin-gaps-1e16.txt`
through zonegap-01's custody. Preregistration for the unswept decade sealed
and committed alone BEFORE any sweep past 1e11 exists:
`research/history/staging/zonegap-03-prereg.md`, commit f345adf. Calibration
marked per claim: PROVEN (conditional as stated), VERIFIED, MEASURED.)*

## 1. The theorem: Z2(p) = env(p), D(p) = 0 [PROVEN conditional on the adopted ladder; VERIFIED 204 ways]

zonegap-01's NOT-REACHED posed the model Z2 = envelope-at-p'^2 + a
below-record correction field D(p) <= 0. The correction field does not
exist. Two lines, conditional only on A113274 being the true running max
(which zonegap-01's CUSTODY 1/2 verified in-range):

- (<=) Every in-zone gap is a gap between consecutive twin pairs lying
  wholly below p'^2, and the largest twin gap wholly below any bound is the
  last record before it: Z2(p) <= env(p).
- (>=) Wherever the env record's start satisfies s_k > p, its two bounding
  pairs are in-zone and consecutive there: Z2(p) >= g_k = env(p).

The premise s_k > p holds at ALL 27,292 swept zones, and s_k^2 > e_{k+1}
holds at all 79 ladder transitions from record 3 on (tightest ratio 4.74;
records 1-2 own only the zones p = 2, 3, checked directly) — so the identity
runs through the entire published ladder, to e_82 = 7.05e16.

VERIFIED: the producer reproduces every Z2 aggregate in zonegap-01's
embedded output digit for digit from the ladder + base primes alone — six
band c3 means AND sds, all 39 envelope-step rows (p, Z2, gapStart, u to 4
decimals), the exact u-decile vector, mean u = 0.7071, and the power-fit
e = 3.192 — 204 equality assertions, zero free parameters, no twin data.
Fraction of zones with Z2 = env exactly: 27,292/27,292 = 1.0000.

Consequences. (i) zonegap-01's "law" numbers were never measurements of twin
data: e = 3.192 is a deterministic functional of the record ladder,
recomputable in about a second. (ii) The prereg-miss mechanism is fully
resolved: the per-zone series is not "heavily correlated", it is 100%
redundant given the ladder. (iii) The honest statistical objects are the
record process and the boundary fields (head, tail) — nothing else.

## 2. The u bimodality is closed [VERIFIED, deterministic]

The u histogram is a mixture of per-record sweeps: the step owned by record
k sweeps u from ~1 down to a floor r_k ~ s_k/e_{k+1}, with zone density
rising toward the floor like u^(-3/2). From the producer's table: 17 steps
never reach below u = 0.6 and own 15,209 of the 27,267 zones (the dip band
is unreachable for over half the mass); the 7 deep steps (r_k < 0.4)
overweight their own floor band 3,872 : 2,638, feeding the 0.2-0.4 hump;
only the few mid-floored steps pad 0.4-0.6. The dip at u ~ 0.4-0.6 is the
floor-spectrum structure of records 30-41 — no randomness, no null model
needed. The brief's candidate reading (env-binding vs D-binding zones) is
moot: there are no D-binding zones.

## 3. The record process, statistics done right [MEASURED, controls in-pass]

The one live statistical object. Estimators (window e in [1e4, 7.05e16], 72
records) read AFTER the controls passed: deterministic recovery (trend
ladder reads A = 1.000000, z = 0), injection (abar halved reads A ratio
0.525 vs truth 0.500), and a 200-rep matched Kourbatov-Wolf null
(exponential gaps at abar = ln^2 x/(2C2), Gumbel block maxima, same window,
same estimators, seeded).

- SHAPE FITS: count 72 (null 68 ± 8), rate 2.562 per ln x (null
  2.356 ± 0.304), spacing CV 0.908 (null 0.944 ± 0.100), z sd 1.021 (null
  1.264 ± 0.177) — all inside the null 95%.
- LOCATION FAILS: z mean = -1.298 (null -0.212 ± 0.244), trend load
  A = 0.9295 (null 0.9895 ± 0.0182). The published records run ~1.1 abar
  BELOW the pure-Exp record process — the finite-height non-exponentiality
  of real twin gaps, measured in-house at 6% of trend.
- The compute gap priced: the null puts 5.33 ± 2.11 record endpoints per
  decade at (1e11, 1e12]; the ladder has 8 there (records 42..49), a dense
  patch at 1.3 null-sd. This ensemble sigma — not a Poisson guess — is the
  prereg's record-count error model.

## 4. The sealed blind tests [committed alone, f345adf]

`zonegap-03-prereg.md` seals, for X = 1e12, fitted on the <= 1e11 sweep +
adopted tables only: Group T (sigma = 0, misses are custody events): 78,497
zones; 8 new records with all five fields of each envelope step exact;
envelope 11,388 at the top; Z2 = env fraction 1.0000; whole-sweep e = 3.332,
mean u = 0.7913, exact deciles; new-band c3 = 4.182 ± 0.132. Group S (blind,
sigma models with the head field's run correlation priced at n_eff = 5,076
pairs): new-band head 0.7275 ± 0.0155; whole-sweep head 3-sigma
[0.696, 0.756]; worst head load in [0.7218, 0.90] with P(unchanged) = 0.80;
pi2(1e12) = 1,870,593,490 ± 26,264 (4-sigma sealed). The brief's five
requested quantities all landed in Group T — the model's finding is that
they were never statistical.

## 5. NOT REACHED

- The tail field: no per-zone tail data exists in the embedded corpus
  (band means only); not modeled, not predicted.
- The record-process location deficit (§3) is measured, not explained; its
  height-dependence (does A rise toward 1?) needs records beyond 1e17 or a
  second-order null, neither reachable here.
- No blind record-process prediction below e_82 = 7.05e16 is possible —
  the ladder covers the entire reachable range; validation of §3's fit
  lives beyond 1e17.
- The TOS F(g) table beyond its 75 starred rows is still unused except
  through zonegap-01's custody guards; fitting the first-occurrence cloud
  against the KW trend (with its own controls) remains open.
- The 1e12 sweep itself: not run (LIGHT budget; ~1 h on the incoming box);
  the prereg scores when it lands.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md`
for the corpus rule.*
