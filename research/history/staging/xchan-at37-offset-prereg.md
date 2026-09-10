# Pre-registration: the @37 test of the offset-correction family for the ~3.8 law

<!-- ledger
id: Q-xchan-at37-offset
status: ANSWERED
todo: X
question: Does any registered offset-correction candidate for the ~3.8 law survive at @37?
verdict: Sealed and committed alone before any @37 census of any kind existed, fixing the candidates, the sigma model and its projection band, the scoring rule and what each verdict does to item X's offset clause; scored in xchan-at37-score.md, where every registered candidate is killed and the number survives an independent recount.
-->

*Written 2026-08-20 and committed alone, before any @37 census exists. The
producer instrument already exists — `research/xchan-at29-01-segmented.js` runs
any level by argument, and `research/attack-x-offset-02-profile.js` shares its
kernel and gate — but neither has ever been run at @37, no @37 census of any
kind exists in the corpus, and the level is priced only by extrapolation ("an
overnight run", `xchan-at29.md` §7c). Everything below is fixed in advance:
the candidate predictions, the σ model and its projection band, the scoring
rule, and what each verdict does to TODO item X's offset clause.*

## 1. What is being tested

`research/history/staging/xchan-at29.md` left `1 − J = 4S₂` the last law
standing and NOT exact: absolute residuals Δ = +1.201e−4 (@29) and +1.185e−4
(@31), relative offset −0.41% / −0.48%, one detection (z = −2.32 at @31 on the
slot-clustered σ) and one consistent non-detection (−0.43 at @29).
`research/attack-x-offset-01-terms.js` (embedded) priced the finite-level
correction family on those residuals; `research/attack-x-offset-02-profile.js`
(embedded) measured the mechanisms available at the existing levels. The @37
aggregate census decides between the surviving aggregate descriptions.

The statistic is unchanged and is the one the gate protects: J = obs/CRT with
obs the mixed super-`W` triple census over the natal set and
CRT = 6·N̄·Σ_{∏Q>W}1/∏Q, at x = 37, W = 7,420,738,134,810,
N̄ = 145,286,237,250, K = 198,274 scour primes in (37, 2724079].

## 2. The predictions, all from embedded arithmetic, none adjustable

From `research/attack-x-offset-01-terms.js` (its OUTPUT block; sums exact,
tail mass exact, fitted parameters frozen at their 2026-08-20 values):

| candidate | 1 − J at @37 | mechanism class |
|---|---|---|
| **N1** `4S₂` | **0.021863** | no correction: the offset was a fluctuation |
| **C1** `4S₂ − S₃` | **0.021785** | zero-parameter shrinking correction (POST HOC at @29/@31) |
| C2 `4S₂ − 2S₃` | 0.021707 | zero-parameter, twice C1's term |
| M-mult `4S₂(1 − 4.755e−3)` | 0.021759 | constant relative offset |
| M-abs `4S₂ − 1.186e−4` | 0.021744 | constant absolute residual |
| M-cS3 `4S₂ − 1.198·S₃` | 0.021770 | fitted S₃ multiple |
| M-ln `4S₂ − 0.491·S₂/lnW` | 0.021772 | fitted 1/lnW-scale correction |

C4, C8 (≥ 4S₃-size corrections) and the locality shape M-loc are already
REFUTED at the existing levels and are not carried.

**The error bar, fixed now.** σ_reg = √obs/CRT with CRT(37) = 6.1673e10 exact
gives σ_reg ≈ 3.98e−6. The slot-clustered inflation is PROJECTED at 2.14,
banded [2.12, 2.17] from the measured 2.078 → 2.106 → 2.124 (@23/@29/@31):
**σ_slot(37) ≈ 8.52e−6**, band [8.44e−6, 8.64e−6]. The run's own printed
σ_slot supersedes the projection; the projection exists so that the
separations below cannot be re-derived after the fact. **The σ estimator is
calibrated**: all seven known-truth control draws of
`research/attack-x-offset-02-profile.js` (random masks at natal density,
truth = the level's own J_line) landed inside 1.9σ, so the slot-clustered σ
neither manufactures nor hides an offset at the scale those draws can see.

**Separations at the projected σ.** N1 vs C1: 9.1σ. C1 vs C2: 9.1σ. C1 vs
M-abs: 4.8σ. C1 vs M-mult: 3.1σ. C1 vs M-cS3: 1.8σ. C1 vs M-ln: 1.5σ.
So @37 decides: (a) whether any correction is needed at all, (b) shrinking
vs constant-absolute, and (c) C1's coefficient against C2's — but NOT between
the members of the shrinking family (C1, M-cS3, M-ln, and M-mult only weakly),
and no claim of that kind may be written from @37 alone.

## 3. The scoring rule, fixed now

Compute z_c = ((1−J)_meas − pred_c)/σ_slot for every candidate, on the run's
own slot-clustered σ_slot.

- A candidate is **KILLED** by |z_c| > 3 and **ALIVE** otherwise; the family
  verdict names every survivor, sorted by |z_c|.
- **If N1 survives** (|z_N1| ≤ 3), the offset's status reverts to "not
  established as structure": two sharp levels plus a third failing to
  reproduce it means the @31 detection does not generalize, and TODO item X's
  offset clause must say so.
- **If N1 is killed and at least one shrinking-family member survives**, the
  offset is CONFIRMED as structure with a shrinking scale; C1's status
  upgrades from POST HOC to "survived one blind level" only if |z_C1| ≤ 3.
- **If only M-abs survives**, the residual is a constant-absolute anomaly, no
  candidate mechanism on file produces it, and the item must carry that.
- **J-band clause** (unchanged from `xchan-at29-prereg.md`): J(37) outside
  (0.94, 1.00] means the object changed; the report leads with that.
- **Gate**: the producer must reproduce its own embedded reference levels
  before @37 is reported (the same gate the @29/@31 run used); a gate failure
  reports an instrument failure and no @37 value.

## 4. Secondary, registered but not decisive

- **The line's lattice bias.** `attack-x-offset-02-profile.js` measured
  β = J_line − 1 = +9.88e−3, +7.44e−3, +5.38e−3, +4.03e−3 over @19..@31
  (z = 2.3, 8.7, 34.7, 147.6): positive, decaying, and 16–24% of the natal
  deficit's own size. If the @37 run also runs the line ensemble (roughly
  3–5× the natal cost, so it may be deferred), the registered reading is the
  continuation of that decay and of 1 − J/J_line (1.18× and 1.15× 4S₂ at
  @29/@31); no numeric band is fixed because no β model is on record. The
  sighting β/S₃ ≈ 39–43 over the four levels is recorded here so that, if a
  β model is ever fitted, this note is its provenance.
- **P1**: aligned super-`W` obs = 0 at @37, an instrument check as always.

## 5. Scope

Producer: `research/xchan-at29-01-segmented.js -- ... 37` or the profile
instrument at @37; either must be embedded via `node research/qc/embed.js`
with its gate green. Report: an extension of
`research/history/staging/item-x-offset.md` or a successor staging note. No
live document is edited by the @37 run; TODO item X's update is proposed in
the report, not applied. This file is committed alone before any @37 number
of any kind exists.
