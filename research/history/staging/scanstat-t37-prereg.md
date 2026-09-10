# Pre-registration: scanstat-t37 — the seventh exact level of the moving-sum exponent

<!-- ledger
id: Q-scanstat-t37-prereg
status: OPEN
todo: none
question: What is the moving-sum exponent H at T_37, predicted before any producer for the pass existed?
verdict: Pre-registration only, sealed and committed alone: the prediction band, the criterion, the weak secondaries, the custody gates the producer must pass before reporting and the compute plan are fixed, and T_31 is explicitly excluded as another pre-registration's verdict.
-->

**Sealed before any producer for this pass was written, and committed alone**, with
message `prereg: scanstat-t37` and nothing else in the commit. `git log --stat` is
the proof. Every number in §1, §2 and §3 was computed from **already embedded**
corpus figures by a throwaway script kept outside the repository, so no producer file
existed when the predictions were fixed. The producer recomputes each of them from
the same published inputs and aborts on any mismatch, so the freeze is
machine-checkable after the fact as well as commit-ordered.

The target is `T₃₇`: `D = ∏_{5≤p≤37}(p−2) = 217929355875` slots over
`W = 37# = 7420738134810` positions, which is 1150 times the work of the T₂₉ run
that `import-scanstat-04-score.js` did in 38.9 s.

## 0. What this registers, and the T₃₁ disclosure

`import-scanstat.md` §6 named T₃₁ as the unreached sixth level. A sibling pass is
computing T₃₁ right now under `research/scanstat2-*` and its own sealed
pre-registration, `scanstat2-prereg.md` (commit `cde163a`). **Its result is not
available to this file and is not used anywhere in it.** The fit here therefore runs
on the **five committed levels T₁₃, T₁₇, T₁₉, T₂₃, T₂₉ only.**

That creates one asymmetry worth fixing in advance rather than arguing about later.
By the time T₃₇ lands, T₃₁ will exist, and a six-level refit will be available and
will look more informative than the five-level one. Refitting after seeing the target
is exactly the move pre-registration exists to forbid. So this file pre-commits to
reporting **both**, in this order and with these labels:

1. **`H*₅(T₃₇) = 0.381254`, the pre-registered prediction, band below.** This is the
   only number the verdict in §2 is read against.
2. **`H*₆(T₃₇)`, POST-HOC, computed after T₃₁ was known.** Reported for interest,
   never as the criterion, and always carrying the label. Its sensitivity is small
   and is registered here so a later reader can check nothing was tuned:
   `dH*₆/dH(T₃₁) = 0.723`, so a T₃₁ landing one standard error (0.008) off the line
   moves `H*₆(T₃₇)` by 0.006, a little over half the width of the band below. If
   T₃₁ lands exactly on the five-level line at 0.359402, the six-level law is
   numerically identical to the five-level one and `H*₆ = H*₅`.

## 1. Prediction: H(T₃₇)

### Inputs, all embedded, none recomputed

`H` at a level is the OLS slope of `ln sd_m` on `ln m` over the frozen grid
`M = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64]`, where `sd_m` is the exact standard
deviation of `slot[i+m] − slot[i]` over `i ∈ Z/D`.

| level | D = ∏_{5≤p≤x}(p−2) | ln D | H (published) | ln c (published or refit) | sd₁ (published) |
|---|---|---|---|---|---|
| T₁₃ | 1485 | 7.303170 | 0.2661 | 2.64446 | 12.0326 |
| T₁₇ | 22275 | 10.011220 | 0.2804 | 2.81034 | 14.5863 |
| T₁₉ | 378675 | 12.844434 | 0.3001 | 2.93725 | 17.1618 |
| T₂₃ | 7952175 | 15.888956 | 0.3216 | 3.05202 | 19.4656 |
| T₂₉ | 214708725 | 19.184793 | 0.3367 | 3.13670 | 21.4409 |

`H`, `ln c` and `sd₁` at T₁₃, T₁₇, T₁₉ are the embedded output of
`research/import-scanstat-03-prereg.js` (1). `H` and `sd₁` at T₂₃ and T₂₉ are the
embedded output of `research/import-scanstat-04-score.js` (1) and (2); `ln c` at
those two levels is not printed there, so it is refit here from the twelve published
`sd_m` values in the same output blocks, which are given to three decimals on
quantities of size 20 to 90, a rounding of order 1e-5 relative. The four decimals
printed for `H` are the inputs used, so this refit is reproducible by anyone holding
only the embedded record. Nothing here reads a tile.

Target constants, exact: `D = 217929355875`, `W = 7420738134810`,
`ln D = 26.107437`, `mbar = W/D = 34.05112`, `√(2 ln D) = 7.2260`.

### The rule

OLS of `H` on `ln D` over **all five** committed levels. The frozen three-point law
of the first pass was `H = 0.220511 + 0.006140 lnD`; the five-point refit is

```
H = 0.220795 + 0.006146 * lnD          s = 2.4468e-3,  se(slope) = 2.6083e-4
residuals (T13..T29): +4.191e-4  -1.925e-3  +3.620e-4  +3.150e-3  -2.006e-3
```

which is bit-for-bit the same law the sibling pass froze for T₃₁, from the same five
published rows. Evaluated at `ln D = 26.107437`:

> **H\*₅(T₃₇) = 0.381254**

The superseded three-point law lands at 0.380811 at the same point, so the two fits
differ by 4.4e-4 here and this test cannot separate them. That is registered as a
limitation, not as a result.

### The band

Same construction as the sibling pass and as the adversarial review of the first
pass: the 95% **confidence band on the fitted line**,
`ŷ ± t_{n−2,0.975} · s · √(1/n + (x₀−x̄)²/Sxx)`, with `n = 5` and `t₃ = 3.182446`.

> **95% confidence band on the line at T₃₇: [0.369866, 0.392641]** (half-width
> 0.011387, `se_mean = 0.003578`)
>
> 95% prediction band, for reference only, not the criterion:
> **[0.367459, 0.395049]**

The extrapolation is 6.92 units of `ln D` past T₂₉, twice the reach of the T₃₁ step,
so the band is wider than T₃₁'s (half-width 0.008625) even with the same five points
behind it.

## 2. The criterion, and what each outcome supports

Let `Ĥ` be the measured OLS slope at T₃₇ on the same grid, with its own regression
standard error `se(Ĥ)` (0.0096 at T₂₃ and 0.0080 at T₂₉, so 0.008 or a little less
is expected).

- **INSIDE [0.369866, 0.392641]**: the linear-in-`ln D` rule is a *description* that
  holds over seven exact levels spanning `ln D` from 7.30 to 26.11, four of them out
  of sample and three blind, across a 7.4e12-position tile. It stays a description
  and not a law: §1(d) and §1(e) of `import-scanstat.md` still forbid extrapolating
  it to `H = 0.5`, since the true `m`-dependence is a crossover with no fitted scale
  and the duality forces the exponent to turn over at `m = D/2`.
- **OUTSIDE the band**: the linear form was a coincidence of a short ladder. Five
  points on a smooth monotone series admit many curves, and this is the longest
  extrapolation attempted. A miss falsifies the specific functional form, not the
  finding that `H < 0.5`.
- **Either way**, the `√m` kill stands or falls only on whether `Ĥ` is far from 0.5.
  **`√m` is refuted at T₃₇ if `Ĥ + 3·se(Ĥ) < 0.5`.** This is registered separately
  because it is a different claim from the shape of `H(ln D)`, and the first pass
  conflated their strengths once already.
- **Direction, registered separately.** `H` has risen at every level so far. **`Ĥ`
  is predicted to exceed 0.3367**, the T₂₉ value; a non-increase would be a
  qualitative break and is a bigger event than a band miss.

## 3. Secondary, weak, and registered as weak

The same five-level refits on `ln c` and on `ln sd₁`:

```
ln c    = 2.379851 + 0.041107 * lnD     s = 3.5883e-2
ln c*(T37)    = 3.453049   ->  c*   = 31.5966
95% confidence band on the line: [3.286050, 3.620048]  ->  [26.7371, 37.3394]

ln sd_1 = 2.177678 + 0.048380 * lnD     s = 4.5636e-2
ln sd_1*(T37) = 3.440754   ->  sd_1* = 31.2105
95% confidence band on the line: [3.228366, 3.653142]  ->  [25.2384, 38.5957]
```

Both bands are ±18% to ±24%, so these predictions can barely be failed and are
registered only so that a wild miss is on the record. `sd₁` is a property of the gap
multiset, not of the word's order, and there is no reason on file to expect it linear
in `ln D`.

The two frozen model tables at T₃₇, on `maxsum_m = m·mbar + sd_m·√(2 ln D)` with
Model A `sd_m = c* m^{H*}` and Model B `sd_m = sd_1* √m`:

| m | A: sd_m | A: maxsum_m | B: sd_m | B: maxsum_m |
|---|---|---|---|---|
| 1 | 31.597 | 262.4 | 31.210 | 259.6 |
| 2 | 41.154 | 365.5 | 44.138 | 387.0 |
| 3 | 48.034 | 449.2 | 54.058 | 492.8 |
| 4 | 53.602 | 523.5 | 62.421 | 587.3 |
| 6 | 62.562 | 656.4 | 76.450 | 756.7 |
| 8 | 69.815 | 776.9 | 88.277 | 910.3 |
| 12 | 81.486 | 997.4 | 108.116 | 1189.9 |
| 16 | 90.932 | 1201.9 | 124.842 | 1446.9 |
| 24 | 106.133 | 1584.1 | 152.900 | 1922.1 |
| 32 | 118.436 | 1945.5 | 176.553 | 2365.4 |
| 48 | 138.235 | 2633.3 | 216.233 | 3196.9 |
| 64 | 154.260 | 3294.0 | 249.684 | 3983.5 |

Model A's row at `m = 1` predicts 262.4 against the known exact answer 528, which
prices the tail factor's failure rather than the exponent's: `excess/sd_m` is 9.039
at `m = 1` at T₂₃ and 10.628 at T₂₉, not `√(2 ln D)`. **No claim is made that these
maxsum tables are close.** What is registered is the comparison, unchanged from the
first pass: **A′ = `sd₁·m^{H*}` must beat B′ = `sd₁·√m` on the ln-RMS of
`excess_m = maxsum_m − m·mbar` over the frozen grid**, both anchored at the measured
`sd₁(T₃₇)`, which is unknown until the run.

## 4. Custody gates the producer must pass before it reports anything

1. **Slot count = 217929355875 exactly.** This is the Copying Theorem product
   `∏_{5≤p≤37}(p−2) = 3·5·9·11·15·17·21·27·29·35`, and the run counts slots
   independently by streaming, so the two must agree to the digit. Written out:
   `3·5 = 15`, `·9 = 135`, `·11 = 1485` (T₁₃), `·15 = 22275` (T₁₇),
   `·17 = 378675` (T₁₉), `·21 = 7952175` (T₂₃), `·27 = 214708725` (T₂₉),
   `·29 = 6226553025` (T₃₁), `·35 = 217929355875` (T₃₇).
2. **`maxsum₁(T₃₇) = 528 = G₂(37#)`**, the twelfth exact ladder entry, as carried by
   `research/exact-g2-ladder.js` (x = 37, pos = 544899485411) and OEIS A144311.
   Note what this gate is worth on its own: the ladder's maximality at 37# rests on
   a filter argument, `maxsum_THRESH(T_v) < G₂`, while this run scans every one of
   the 217929355875 gaps. A pass is an **independent exhaustive maximality
   certificate** for the ladder entry; a value above 528 would refute the ladder and
   the OEIS term, and a value below 528 would mean the engine is broken, since 528
   is exhibited by trial division.
3. **`Σ_i gap_i = W = 7420738134810`**, i.e. `mbar·D = W` exactly, in integers.
4. **`Σ_i (slot[i+m] − slot[i]) = m·W` exactly for all twelve m**, in exact integer
   arithmetic, since each gap is counted `m` times on the cycle. This is a per-`m`
   gate, and it is the one that catches a sharding error: a dropped or double-counted
   window fails it at every `m` at once.
5. **The same engine, run first at T₂₃ and T₂₉, must reproduce the embedded columns
   of `research/import-scanstat-04-score.js` exactly**, both `maxsum_m` and `sd_m` to
   the three decimals printed there, at all twelve m, and must return
   `maxsum₁` = 204 and 258 and `D` = 7952175 and 214708725. This is a deliberate
   recomputation of embedded artifacts, permitted under the standing compute rule as
   validation of a success before it is extended, and it is the only way to check a
   new engine against a known answer.
6. **Sharded and unsharded must agree at T₂₃ and T₂₉**, on every printed digit of
   every column, before the sharded run at T₃₇ is trusted.

Any gate failing aborts the run. A partial green is a defect.

## 5. The compute plan, registered in advance

Registered here so that no part of it is a post-hoc choice.

**Grid.** `M = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64]`, unchanged from the first
pass. `m_max = 64`.

**Engine.** The T₂₉ lever streams the slot sequence through a ring buffer of depth 64
and never materialises the gap word. T₃₇ is 1150 times that work, so the engine is
rewritten with the same interface and three changes: the small primes up to 13 are
carried as a 30030-position candidate wheel of 1485 offsets instead of being sieved,
so only the primes 17 to 37 are marked and only 1485 of every 30030 positions are
ever examined; the segment is sized to stay inside cache; and the moment
accumulators are exact, the sums in integers below 2^53 and the sums of squares in
BigInt, since `Σ v²` at `m = 64` reaches 1.0e18 and would lose 2.4% to Float64
rounding at this depth. Statistics are recovered as
`Var = (D·Σv² − (Σv)²)/D²` in exact integers, so the reported `sd_m` carries no
accumulated error.

**Sharding, and the overlap argument.** The position range `[0, W)` is cut into `N`
contiguous ranges on multiples of 30030. Shard `s` **owns** the windows whose
starting slot lies in `[start_s, end_s)`, so every one of the `D` windows is owned by
exactly one shard and none is owned twice. A window of `m ≤ 64` slots reaches at
most 64 slots past its start, so shard `s` continues streaming past `end_s` until it
has emitted exactly **64 further slots**, and scores only the windows it owns. The
overlap is stated in slots rather than positions on purpose: it is exact and needs no
bound on the gap, whereas a position-length overlap would need `maxsum₆₄ < overlap`,
which is the very quantity being measured. The last shard's continuation wraps to
position 0 with `W` added, which is the cyclic completion the unsharded engine does
with its `head` array. `maxsum` and `minsum` combine by max and min over shards,
`Σv` and `Σv²` by addition, and gate 4 checks the combination.

**Target.** N chosen from the measured throughput of the T₂₃ and T₂₉ validation runs
so the wall time is at most 12 h at `nice -n 15`, on a 10-core machine already
running other jobs.

## 6. Not predicted here

- The T₃₇ `maxsum_m` values themselves, beyond `maxsum₁ = 528` which is a gate and
  not a prediction. The tail factor is unexplained (`import-scanstat.md` §6) and any
  maxsum prediction inherits that.
- `se(Ĥ)` at T₃₇. It has fallen from 0.0096 to 0.0080 across the last two levels and
  is expected to fall again, but no number is registered.
- Anything about T₃₁. Its verdict belongs to `scanstat2-prereg.md`, and this file's
  criterion does not move whatever T₃₁ returns.

## 7. Producers

Added in a second commit, after the seal, and changing no number, no rule and no
criterion above: the file names of the code that carries this out. `git log --stat`
separates the two commits, and the first one contains this file alone.

- [`../../scanstat-t37-01-engine.js`](../../scanstat-t37-01-engine.js) — the engine
  (module, no output of its own): wheel in candidate-index space, exact moments,
  sharding by slot ownership.
- [`../../scanstat-t37-02-validate.js`](../../scanstat-t37-02-validate.js) — gates 5
  and 6: the engine against the embedded T₂₃ and T₂₉ columns, parsed from
  `import-scanstat-04-score.js` rather than retyped, plus the forced BigInt-flush
  check and the T₃₇ throughput projection.
- [`../../scanstat-t37-03-shard.js`](../../scanstat-t37-03-shard.js) — one shard.
- [`../../scanstat-t37-04-run.js`](../../scanstat-t37-04-run.js) — the driver: forks
  the shards, combines the partial moments, runs gates 1 to 4, and scores this file's
  frozen predictions after re-deriving every one of them from the embedded inputs and
  aborting on any mismatch.
