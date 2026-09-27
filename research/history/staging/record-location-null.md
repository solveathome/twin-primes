# The record-location deficit does not close on the null side: 6.0% survives four corrections, and the correction the item asked for was already applied

<!-- ledger
id: Q-record-deficit
status: PARTIAL
todo: Z5
question: Does the 6.0 percent record-location deficit survive the corrected null, and what is it?
verdict: Survives (z = -3.3, five window cuts); Z5's premises on 'location' and on n_eff were wrong; corrected-null formula in §4.
-->

*(2026-08-28. Staging note; nothing here is integrated into a live document.
Executes TODO item Z5. Producer: `research/history/staging/record-location-null.js`,
SCRATCHPAD-GRADE and outside output custody: `embed.js --check` finds no OUTPUT
banner, so every figure below is hand-pasted, and none of these numbers may
leave this file until the producer carries one. Every figure below comes from
`node research/history/staging/record-location-null.js`, 15.4 s, is
reproducible from the adopted ladder alone, and reproduces on an independent
re-implementation at 2,000 reps with a different RNG, block scheme and exact
inversion in place of the Gumbel form (`redteam-0828-litimports.md` §2a). No new census, no sieve, no
twin data beyond `research/a113274-gap-records.js`, whose arrays the producer
extracts from source at runtime. Calibration marked per claim.)*

## 1. Verdict

**The item does not close as a null-side resolution.** [MEASURED,
scratchpad-grade] The 6.0% trend-load deficit reported in
`zonegap-03-model.md` §3 survives every correction that could be applied to
the null from existing data, and one of the corrections makes it larger, not
smaller. The deficit is not a statistics artefact. It is also not new
structure that this session can claim: it is a location gap against a model
(twin gaps exactly exponential with local mean ln²x/(2C₂)) whose finite-height
failure Kourbatov already documents in the owning convention, and this note
does not establish that the in-house 6.0% is anything more than a controlled
restatement of that failure.

Two premises in the item's own wording are wrong, and correcting them is most
of the work:

- **"Location" in `zonegap-03-model.md` §3 is not position in the ladder.** It
  is the location parameter of the rescaled-exceedance distribution: how high
  the record gaps sit against the Kourbatov-Wolf upper trend
  T(x) = ā(x)·ln(x/ā(x)), read as A = mean_k g_k/T(e_k) and as z mean. Nothing
  about where a record sits in the ladder, or against a prime square, enters.
- **The n_eff run-correlation machinery in the sealed preregs does not apply
  to this test, and the correction it stands for was already applied.**
  `zonegap-03-prereg.md` §"Group S" prices n_eff = 5,076 pairs against 51,205
  zones for the HEAD field, because roughly 10.1 consecutive zones share their
  first in-zone pair. That is a per-zone field. The location test pools 72
  records, not zones, and its sigma is not an independence sigma at all: it is
  the spread of A across 200 matched simulated realisations of the whole
  record process, which already carries every correlation the record process
  has.

## 2. What the corrections do, with numbers [MEASURED, scratchpad-grade]

The producer first reproduces all 15 published figures of
`zonegap-03-model.js` §(b) digit for digit from the same seeds, as a gate;
the estimator and the null below are that file's, unmodified.

| null | null mean A | sigma | deficit | z |
|---|---|---|---|---|
| N0, as published, 200 reps | 0.9895 | 0.0182 | 6.06% | −3.30 |
| same, 5,000 fresh reps | 0.9891 | 0.0178 | 6.03% | −3.34 |
| N1, records treated as independent | 0.9895 | 0.00876 | 6.06% | −6.9 |
| N2, conditional on the observed N = 72 | 0.9833 | 0.0127 | 5.48% | −4.24 |
| N3, per-height marginals divided out first | 1.0014 | 0.0180 | 6.01% | −3.33 |

Data A = 0.9295 throughout. Reading each row:

- **N1 is the direction check.** An independence null, sd(g/T)/√72 = 0.00876,
  is 2.08 times NARROWER than the ensemble sigma (1.99 on an independent
  2,000-rep ensemble), so the record-process correlation Z5 asks about is
  already inside the published band. A test that ignored the correlation
  entirely reads z = −6.9, and that is what the N1 row is: the uncorrected
  number, not a deflated one. An n_eff deflation applied on top of N0 replaces
  n by n_eff < n, which WIDENS sd/√n_eff and can only move z toward zero. There
  is no correction of that family left to make, and none available in the
  direction the item assumed.
- **N2 makes the deficit worse.** A and the record count N are strongly
  anti-correlated across the ensemble, corr = −0.703, slope −0.00162 per
  record. The ladder has 72 records against a null 68.4 ± 7.9, so conditioning
  on the observed count lowers the null's expected A to 0.9833 and shrinks the
  residual sigma to 0.0127, giving z = −4.24. An unconditional band was the
  more forgiving of the two.
- **N3 is the repo's pooling rule applied here.** The null's own mean of g/T
  drifts with height (0.998 at the bottom of the window to 0.989 at the top,
  15 bins in ln e), and the ladder's 72 records sit at different heights from
  any one null realisation's. Dividing each record by that per-height marginal
  before pooling removes the composition confound. It moves the deficit by
  0.05 percentage points, to 6.01%.
- **Monte-Carlo tail, not a Gaussian extrapolation.** Over 5,000 fresh
  realisations, 1 had A ≤ 0.9295 under N3, 1 under N0. The null's A
  distribution is mildly right-skewed (skew 0.31), which if anything thins the
  left tail the data sits in.

## 3. Robustness: the deficit is not the window, and it is not the null's construction

[MEASURED, scratchpad-grade]

- **Window.** The lower cut WLO = 1e4 is a choice. Raising it: [1e4, 7.0e16]
  6.03% at z −3.34, n = 72; [1e6, ·] 6.50% at −4.26, n = 64; [1e8, ·] 5.95% at
  −4.28, n = 56; [1e10, ·] 5.68% at −4.07, n = 48; [1e12, ·] 4.01% at −2.65,
  n = 33. The deficit is present at every cut and never depends on the low
  records.
- **The null's block approximation.** The null is exact gap-by-gap only to
  1e7 and Gumbel block maxima above, which is a discretisation the location
  test is entitled to distrust. On the common range [1e4, 1e8] where both
  constructions run, 200 reps each: exact 0.9989 ± 0.0541, hybrid
  0.9956 ± 0.0566, difference −0.33% of A at 0.59 standard errors. The
  approximation carries no detectable location bias, and its sign is the wrong
  one to manufacture the deficit.
- **The mean-gap scale.** A mis-scaled ā(x) would move A directly. Cited, not
  recomputed (standing compute rule): `zonegap-03-model.js` S4 reads the HL2
  calibration ratio against the custody pair counts as 1.000046 at 1e10 and
  1.000032 at 1e11. What those two ratios validate directly is the cumulative
  pair count against HL2(x) = 2C₂∫₂^x dt/log²t, so they are a statement about
  Li₂ and therefore about Kourbatov-Wolf's below-x average a_c(x) = x/π₂(x),
  not about ā(x) = ln²x/(2C₂) as a local exponential mean; KW's eq (10) puts
  those two k/log x apart, 5% to 9% over this window. The local statement comes
  from differencing the two calibrations across the decade:
  1 + (ε₁₁·HL2(1e11) − ε₁₀·HL2(1e10))/(HL2(1e11) − HL2(1e10)) = 1 + 3.0e-5, so
  the local density over [1e10, 1e11] is right to 3e-5. It cannot be a 6%
  effect.
- **Gap lattice.** Real twin gaps past the first are 0 mod 6 and the null draws
  a continuum. At the top of the ladder the lattice spacing is 6 against gaps
  of 3.6e4, a 1.7e-4 perturbation. MEASURED 2026-08-29 and this argument is
  wrong (`measure-record-null2-0829.md` §3e, HELD, red-teamed): the governing
  ratio is the spacing over the MEAN gap, `3/ā`, not over the record gap, a
  factor of 15 to 17, and it enters multiplied by `L`. The mean-matched
  geometric on 6ℤ is an exponential of scale `ā − 3` rounded up, giving
  `dz = −3(L−1)/ā`; the ensemble reads `d b_z = +0.1113 ± 0.0003`, which moves
  `A` by 0.0080 against the 0.0600 deficit, 13.3%, about one order below the
  effect rather than two, and in the direction that helps the null.

## 4. The corrected null, stated for reuse

[the item's deliverable, MEASURED calibration on its inputs] For any statistic
S of the record process on this ladder, the null band is

  z = ( S_data − E[S | N = N_obs] ) / sd[S | N = N_obs]

with both moments taken over a matched ensemble of at least 1,000 seeded
realisations of the Kourbatov-Wolf process on the same window with the same
estimator, where (i) any per-record quantity is divided by the ensemble's own
height marginal μ(ln e), binned in ln e, before it is pooled, and (ii) the
conditioning on N is an OLS of S on N across the ensemble, evaluated at the
observed count, with the residual spread as sigma.

Inputs: the window [WLO, EMAX], ā(x) = ln²x/(2C₂), T(x) = ā·ln(x/ā), the rep
count, and N_obs. Guard, and the reason this is worth writing down: never use
sd(per-record)/√n as the sigma. On this object it is 2.08 times too narrow,
and the item's own premise pointed at deflating it further.

## 5. What survives, and its size

[MEASURED, scratchpad-grade] The published twin-gap records sit 6.0% of trend,
about 1.1 ā, below a matched pure-exponential record process, at z between
−3.3 and −4.3 depending on which correction is applied, with 1 of 5,000
matched realisations reaching the data's value.

By D ≡ 0 (`zonegap-03-model.md` §1, PROVEN conditional on the adopted ladder)
this is a statement about Z₂ itself: Z₂(p) = env(p) at every zone, so the
ladder's heights are the Z₂ field, and Z₂ runs 6% low against the pure-Exp
model. The direction is the harmless one for the Zone Postulate, which needs
Z₂ small. It has no proof value: 6% of a polylog trend does not touch the gap
between polylog and p², and the statement is conditional on a null that is
itself a conjecture (nothing in Kourbatov-Wolf is proven; `zonegap-prior-art.md`
§1 verified the word "Theorem" does not occur in the 2019 paper).

Height profile, disjoint bands, read as a profile only because n per band is
15 to 24: [1e4, 1e8] 6.88% at z −1.24; [1e8, 1e11] 10.39% at −3.16;
[1e11, 1e14] 6.29% at −2.75; [1e14, 7.0e16] 2.43% at −1.33. The top band is
the smallest deficit, which is the shape `zonegap-03-model.md` §5 asked about
("does A rise toward 1?"), but at 1.3 sigma on 17 records it is not a
measurement of a trend and is not reported as one. That question stays NOT
REACHED.

Per the item's instruction, no mechanism is hunted here.

## 6. `records-placement-01.md` does not carry this decision

[checked] It is a different statistic. `records-placement-01.md` (HELD,
records 76–82, UNIFORM-CONSISTENT on all three sealed readings) measures the
placement fraction f = (F − q²)/(q′² − q²) of a record's START inside its
prime-square stretch, and scores square-anchor coupling. That is horizontal
position. The location deficit is vertical: gap size against trend. The two
are compatible and neither implies the other; a record process can be
perfectly square-blind in position while sitting uniformly low in height, and
that is what the two notes jointly measure. Nothing there is redone here, and
its 0.479 and 0.4773 are cited, not recomputed.

## 7. Novelty position

[not established] The finite-height shortfall of maximal twin gaps against
their conjectured asymptote is in print: Kourbatov 2013 Table 1's four decade
slopes rise 0.4576 → 0.5628 against log³p while the Shanks-type asymptote is
0.7574, and he states the "not a one-slope-fits-all" caveat himself
(`zonegap-prior-art.md` §1, page-verified). The in-house 6.0% against a
matched simulated pure-Exp process may be the same fact in a different
normalisation. Whether Kourbatov or Kourbatov-Wolf run the analogous
simulated-ensemble comparison, and report a number for it, was NOT CHECKED in
this session. Until that is checked, this is novel to this corpus and not
claimed as novel.

## 8. What would falsify this, and whether that check has run

- **The deficit is a sigma artefact.** Falsified by N1/N2/N3: RUN. Every
  correction available from the ensemble either leaves the deficit at 6.0% or
  enlarges it to z −4.2.
- **The deficit is the null's block approximation.** Falsified by R2 on the
  common range [1e4, 1e8]: RUN, −0.33% at 0.59 s.e., wrong sign.
- **The deficit is the window.** Falsified by R1 at five cuts: RUN, present at
  all five.
- **The deficit is a mis-scaled ā.** Falsified by differencing the cited HL2
  calibration ratios across the decade: RUN (the ratios are
  `zonegap-03-model.js` S4's, cited here; the differencing step is §3, and the
  raw ratios on their own validate Li₂ and a_c rather than ā).
- **The deficit is the gap lattice.** RUN 2026-08-29
  (`measure-record-null2-0829.md` §3e), and it does not fire: the latticed null
  carries `d b_z = +0.1113 ± 0.0003`, 13.3% of the deficit, and leaves it at
  3.2 to 4.2 ensemble sd. The 1.7e-4 argument above is wrong by about one order
  as a share of the deficit and by a factor of 15 to 17 in its own units.
- **The deficit is already in the literature under its own normalisation.**
  NOT CHECKED. §7. This is the largest open exposure in this note.
- **The deficit vanishes at height** (A → 1, so the effect is a low-record
  artefact of a range the model does not govern). NOT SETTLED: the top band
  reads 2.43% at 1.3 sigma on 17 records, which neither confirms nor refutes
  it. Settling it needs records past 1e17, unreachable here, or a
  second-order null, which is mechanism work this item defers.
- **The whole comparison is against a conjectural null.** Standing, and
  unfalsifiable in this corpus: Kourbatov-Wolf's trend, Gumbel shape and
  O(log x) record count are all conjectures. Any reading of this deficit is
  conditional on them.

## 9. Defects noticed in passing

- `zonegap-03-model.md` §3 writes "measured in-house at 6% of trend" and the
  producer prints 6.06%; the rounding is fine, but the same paragraph calls it
  "the finite-height non-exponentiality of real twin gaps", which is a
  mechanism claim carried at the register of a measurement. The measurement is
  the deficit; the non-exponentiality is one candidate explanation among
  several and is not tested anywhere in that file.
- `zonegap-03-model.js`'s endpoint comment (just above line 125) says
  "+2 for its upper member is NOT added" while the line itself,
  `E = START.map((s, i) => s + GAP[i] + 2n)`, does add it; the code matches zonegap-01's cut and the comment
  describes the zone condition, but the two read as contradictory in place.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md`
for the corpus rule.*
