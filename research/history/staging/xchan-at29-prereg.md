# Pre-registration: the blind @29 test of the joint-deficit closed form

<!-- ledger
id: Q-xchan-at29-prereg
status: OPEN
todo: X
question: Does the joint-deficit closed form survive a blind test at @29?
verdict: Pre-registration only, committed alone before any producer existed: the statistic, the predictions adopted verbatim from the record, two acceptance bands, the validation gate the instrument must clear before any @29 number is reported, and what each verdict does to TODO item X.
-->

*Written 2026-08-19 and committed alone, before any producer script for this run
existed. Everything below is fixed in advance: the predictions, the acceptance
bands, the validation gate the instrument must clear before any @29 number is
reported, and what each verdict does to `TODO.md` item X. No @29 census exists at
the time of writing; `xchannel-triples.md` §7 names @29 as the level that would
decide R3 and prices it out of reach in memory.*

## 1. The statistic, stated so the new instrument is provably the same one

`research/natal-cap-39-triple-census.js` defines, for a level `x` with
`W = ∏_{p≤x} p`, natal set `N = {r ∈ [0,W) : r ≡ 11,17 (mod 30), p ∤ r, p ∤ r+2
for 7 ≤ p ≤ x}`, and scour primes `qs = {q prime : x < q, q² ≤ W}`:

- for a triple `Q = {q₁<q₂<q₃} ⊂ qs` and `ε ∈ {0,2}^Q`,
  `c(Q,ε) = #{r ∈ N : r ≡ −ε_q (mod q) ∀q ∈ Q}`;
- `cls = #{q : ε_q = 0}`; `cls ∈ {0,3}` are the two ALIGNED patterns, `cls ∈
  {1,2}` the six MIXED ones;
- **`J(x) = (Σ_{∏Q > W, mixed} c(Q,ε)) / (6·N̄·Σ_{∏Q > W} 1/∏Q)`.**

The in-memory instrument reaches the super-`W` part by the bridge
`mixed super-W obs = Σ_{r∈N}[C(a,2)b + a·C(b,2)] − (sub-W mixed obs)` with
`a(r) = #{q ∈ qs : q | r}` and `b(r) = #{q ∈ qs : q | r+2}`, and it materialises
three arrays of width `W` (`A`, `a`, `b`, 5 bytes per slot). At @29,
`W = 6,469,693,230`, so that is 32 GB for this instrument and 162 GB for
`natal-cap-35`'s 25-byte slot. That price, not the arithmetic, is what stopped
the series at @23.

**The identity the segmented instrument will use instead**, exact and with no
estimator, obtained by exchanging the order of summation in the bridge:

> `mixed super-W obs = Σ_{r∈N} #{(q₁<q₂ ∈ D_a(r), q₃ ∈ D_b(r)) : q₁q₂q₃ > W}`
> `                  + Σ_{r∈N} #{(q₁ ∈ D_a(r), q₂<q₃ ∈ D_b(r)) : q₁q₂q₃ > W}`

with `D_a(r) = {q ∈ qs : q | r}`, `D_b(r) = {q ∈ qs : q | r+2}`. Each `r`
contributes only through its own two divisor lists, `|D_a| ≤ 6` and `|D_b| ≤ 6`
at @29, so the sum is computable one segment of `[0,W)` at a time in memory
bounded by the segment. The denominator's second factor,
`Σ_{∏Q>W} 1/∏Q`, is a tail sum over the prime list alone and is computed
directly as a tail (not as `e₃` minus the sub-`W` sum), so no cancellation
enters it.

Aligned super-`W` obs must be exactly 0 at every level (P1, a theorem). It is
carried as an instrument check, not as a result.

## 2. The predictions, adopted verbatim from the record

`research/history/staging/import-stein.md` §3.2, "Forward prediction, on the
record before the level exists", gives the zero-parameter closed form
`1 − J = 4S₂`, `S₂ = Σ_{x<q≤√W} q^{−2}`, and its pre-computed values:

| level | scour primes | `F` (forced scale) | **predicted `1 − J`** | **predicted `(1−J)/F`** |
|---|---|---|---|---|
| **@29** | `K = 7,863` in (29, 80429] | 0.7537% | **0.028943** | **3.8399** |
| **@31** | `K = 37,534` in (31, 447829] | 0.6419% | **0.024784** | **3.8612** |

These are adopted here verbatim as the predictions of this test. They are not
recomputed and they will not be adjusted. Equivalently, the prediction is
`J(29) = 0.971057` and `J(31) = 0.975216`.

The record's own scored history, which fixes the yardstick:

| x | predicted `1−J` | measured `1−J` | `σ_J` | z | measured `(1−J)/F` |
|---|---|---|---|---|---|
| 17 | 0.051607 | 0.0975 | 0.0160 | +2.87 MISS | 7.040 |
| 19 | 0.041122 | 0.0401 | **0.0035** | −0.29 HIT | 3.686 |
| 23 | 0.033678 | 0.0341 | **0.0007** | +0.60 HIT | 3.867 |

`σ_J = √(mixed super-W obs)/CRT` is the Poisson fluctuation of the count, and it
is the error the record propagated to reach ±0.0035 and ±0.0007.

## 3. The acceptance band, and why it is two bands and not one

Propagating the record's errors forward is what fixes the band, and it produces
an awkwardness that has to be stated rather than smoothed over.

The two scored levels sit at −0.29σ and +0.60σ, which is a clean fit. But
expressed as fractions of the prediction those same residuals are **−2.49%** and
**+1.25%**, and they shrink only because `σ_J` shrinks: 0.0035 is 8.5% of the
@19 prediction, 0.0007 is 2.1% of the @23 prediction. At @29 the count is about
5.7·10⁷, so `σ_J ≈ 1.3·10⁻⁴`, which is **0.45%** of the predicted `1 − J`. The
@29 test is therefore between four and twenty times sharper in relative terms
than either level that scored the candidate, and a systematic error of the size
seen at @19 would read as five sigma.

So two bands, both fixed now, with the primary named in advance.

**TEST 1 (PRIMARY — the record's own yardstick, unchanged).**
`z = ((1−J)_meas − 0.028943)/σ_J`, `σ_J = √(obs)/CRT` computed by the run.

- **HIT**: `|z| ≤ 3`
- **MARGINAL**: `3 < |z| ≤ 6`
- **MISS**: `|z| > 6`

Test 1 is primary because it is exactly the test that produced the +2.87, −0.29
and +0.60 already on the record, and changing yardsticks between the fitted
levels and the blind one is how a candidate gets promoted by its scorer rather
than by the data.

**TEST 2 (SECONDARY — scale accuracy, which is what a MARGINAL result means).**
`d = (1−J)_meas/0.028943 − 1`.

- **TIGHT**: `|d| ≤ 1.25%` — at @29 the closed form is at least as accurate as
  it was at @23 (+1.25%).
- **CONSISTENT**: `1.25% < |d| ≤ 2.5%` — at least as accurate as at @19
  (−2.49%), the worse of the two scored levels.
- **DRIFTING**: `2.5% < |d| ≤ 5%` — worse at @29 than at either scored level,
  by up to a factor of two.
- **REFUTED AS THE CONSTANT**: `|d| > 5%`.

**COMBINED VERDICT, fixed now.**

| Test 1 | Test 2 | verdict written in the report |
|---|---|---|
| HIT | any | **HIT** — the closed form survives its first blind level |
| MARGINAL | TIGHT or CONSISTENT | **SURVIVES WITH A MEASURED OFFSET** — right to `d`, not right |
| MARGINAL | DRIFTING | **WEAK** — the scale law holds, the closed form is not the constant |
| MISS | DRIFTING or worse | **MISS** |
| MISS | TIGHT or CONSISTENT | impossible by construction; if it occurs the instrument is at fault |

**A fourth band on `J` itself, to catch the case where the object changes rather
than the constant.** If `J(29) < 0.94` or `J(29) > 1.00`, the report leads with
that and not with the score: the deficit would then have left the track it has
held since @19 (`J` = 0.9599, 0.9659), and the closed form's failure would be a
symptom rather than the finding.

## 4. What this test cannot do, registered before it runs

The candidate is **not separable at @29 from its two nearest rivals**, and the
numbers saying so are computed here, before the run:

| law | prediction for `1 − J` at @29 | distance from the candidate |
|---|---|---|
| **N1, the candidate** `4S₂` | **0.028943** | — |
| N2, constant multiple of `F`, `c` = @23's measured 3.8667 | 0.029145 | +0.70%, **1.6σ_J** |
| N3, `1 − J ∝ 1/lnW` anchored at @23 (lnW: 19.223 → 22.590) | 0.028990 | +0.16%, **0.4σ_J** |

**So a HIT at @29 confirms that the ~3.8 law continues past the in-memory
ceiling and fixes its scale to about half a percent. It does not single out
`4S₂`, and no claim that it does may be written.** Any of the three laws passing
means all three pass.

**@31 is where they separate, and that is registered too.** At @31 the candidate
predicts 0.024784, N2 predicts 0.024818 (+0.14%) and N3 predicts **0.025165**
(+1.54%), against `σ_J ≈ 2.3·10⁻⁵` ≈ 0.09%. N3 is therefore **≈ 16σ** from the
candidate at @31 while being 0.4σ from it at @29. If @31 is affordable it is run
and scored by the same two tests against 0.024784, with the added clause:
`(1−J)_meas` inside `0.024784 ± 3σ_J` **refutes N3**; inside
`0.025165 ± 3σ_J` refutes N1. N2 stays inseparable at @31 and is not tested.

## 5. The validation gate, which comes before any @29 number

The segmented instrument is a new instrument. Before @29 is computed it must
reproduce, **exactly and to the unit**, the embedded output of
`research/natal-cap-39-triple-census.js` at @17, @19 and @23 on every one of:

| quantity | @17 | @19 | @23 |
|---|---|---|---|
| `W` | 510510 | 9699690 | 223092870 |
| `N̄` | 14850 | 252450 | 5301450 |
| `K` | — | 435 | 1739 |
| `B₃` split (3,0)/(2,1)/(1,2)/(0,3) | 848/2729/2713/847 | 27377/85713/85449/27391 | 879225/2779604/2779107/879385 |
| sub-`W` triples `∏Q < W` | 5246 | 162982 | 4517592 |
| sub-`W` mixed obs | 2243 | 97097 | 3751046 |
| `Σ_{∏Q>W} 1/∏Q` | 0.039784 | 0.050943 | 0.058834 |
| **mixed super-`W` obs** | **3199** | **74065** | **1807665** |
| by orientation (2,1)/(1,2) | 1622/1577 | 37139/36926 | 904409/903256 |
| CRT denominator | 3544.79 | 77162.70 | 1871421.20 |
| **`J`** | **0.9025** | **0.9599** | **0.9659** |
| aligned super-`W` obs (P1) | 0 | 0 | 0 |

**If any integer-valued row differs by one unit at any of the three levels, no
@29 value is reported at all**, and the run is written up as an instrument
failure. This is the gate `natal-cap-39` itself used when a `Uint8Array` wrap
moved `X̄` by 13.33, and it is the reason that defect was caught.

At @29 the instrument's own internal identities are also checked and must hold:
`Σ_{r∈N} 1 = N̄ = 2∏_{7≤p≤29}(p−2) = 143,139,150`; `B₃` from the `(a,b)` counts
equals sub-`W` plus super-`W` from the divisor lists, class by class; aligned
super-`W` obs `= 0`; and the two orientations `(2,1)` and `(1,2)` agree to
within their own Poisson scale.

## 6. What each verdict does to TODO item X

Item X currently reads, on this point: *"the ~3.8 constant now has a
ZERO-PARAMETER closed-form candidate ... landing at −0.29σ (@19) and +0.60σ
(@23) with asymptote exactly 4 ..., and blind values pre-computed at @29 ... and
@31 .... It is a candidate, NOT a derivation ... so the derivation stays the
item's open analytic target, now with a target formula and two blind tests
waiting."* Its Named gaps carry *"@23 is the in-memory instrument's last level
(@29 needs 162 GB)"*, and its first move defers *"any segmented @29 rewrite"*.

- **HIT.** The first of the two waiting blind tests is spent and passed. Item X
  gains a fourth scored level and its first out-of-sample one; the phrase "two
  blind tests waiting" becomes "one blind test waiting, @31". The closed form
  stays a **candidate, not a derivation** — §4 forbids any promotion on @29
  alone, since N2 and N3 pass with it. The Named gap "@23 is the in-memory
  instrument's last level (@29 needs 162 GB)" is **closed by the instrument**:
  the level is reachable in bounded memory, and the item's deferral of "any
  segmented @29 rewrite" is spent. The item's open analytic target (derive the
  constant) is unchanged and is worth more, because the thing to be derived is
  now confirmed at a level the fit never saw.
- **SURVIVES WITH A MEASURED OFFSET.** Same as HIT on the instrument and the
  Named gap, but the item must carry the offset `d` in print beside the
  closed form, and "landing at −0.29σ and +0.60σ" must be extended with the @29
  z. A closed form claimed to have asymptote exactly 4 that drifts at the level
  where the test is sharpest is a weaker object than the record currently
  describes, and the item says so.
- **WEAK or MISS.** `4S₂` is struck from item X as the constant's closed form.
  What survives is only what the measured ratio series says: the item's ~3.8
  reverts to a measured multiple with a fourth point, and the sentence "its
  asymptote is exactly 4, which is AGG's neighbourhood count" loses its support
  and must be marked as an @11–@23 reading that the first blind level refused.
  The `import-stein.md` §3.2 prediction block is annotated in place, not
  deleted. The Named gap on the in-memory ceiling still closes: a MISS is a
  measurement, and it needed the same instrument.
- **The `J`-band clause fires (`J < 0.94` or `J > 1.00`).** The headline is the
  joint deficit's own trend, not the closed form. `xchannel-triples.md` R1's
  band classifier is re-applied to `J(29)` and the pre-registered bands there
  (DEEPENING / FLAT / DECAYING ON THE FORCED TRACK / DECAYING FASTER THAN FORCED
  / GONE OR REVERSED) decide what item X's "monotone DECAY" clause becomes.
- **The validation gate fails.** Nothing is reported about @29, item X is
  untouched, and the note records which row failed.

## 7. Scope

Producers: `research/xchan-at29-*.js`, embedded with
`node research/qc/embed.js`. Report: `research/history/staging/xchan-at29.md`.
This file. No live document is edited by this run; `TODO.md`, `IMPORT-MAP.md`
and the changelog are out of scope, and the item X update is **proposed in the
report, not applied**.
