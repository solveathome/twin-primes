# The sixteen Y2 levels, recomputed on the corrected instrument

<!-- ledger
id: Q-y2-recompute
status: ANSWERED
todo: 1d
question: Does the sixteen-level Y2 ladder reproduce on the corrected instrument, and does Y2/x^2 fall?
verdict: The ladder reproduces exactly, sixteen of sixteen from sixteen independent processes, digit for digit against the published 2026-08-18 ladder, and Y2/x^2 falls at 15 of the 15 consecutive steps; this does NOT show that G2(x#)/x^2 falls, since the shortfall Y2/(G2-1) is unmeasured above x = 79.
-->

*2026-08-19. The leftover of TODO 1b §8, which priced this run and skipped it as
a cost decision. Feeds TODO 1d. Producer: `research/y2-ladder-recompute.js`,
formal embed, `code-sha256` and `out-sha256` bound to the single invocation
`node research/y2-ladder-recompute.js --collect`. The numbers themselves come
from sixteen detached runs of `research/two-class-lower-bounds.js`, which was
NOT modified. Two files were created: that assembler and this report. No live
document was edited. Nothing was committed or pushed. `node research/qc.js` was
run before and after.*

*Legend as in `research/sift-limit-attack.md`: **[PROVEN]** published theorem
with source; **[VERIFIED]** checked computationally here; **[MEASURED]**
empirical, finite range.*

---

## 1. Verdict

> **The ladder reproduces exactly, sixteen of sixteen, from sixteen independent
> processes.** Every `Y2` and every one-class `Y1` matches the published
> 2026-08-18 ladder digit for digit. Level independence stops being a claim in
> the instrument's header and becomes a measured property of it. **[VERIFIED]**

> **For item 1d: `Y2/x²` falls at 15 of the 15 consecutive steps, 0.38495 down
> to 0.02216, a factor of 17.4, log-log slope −0.6142 with se 0.0076. Applying
> the greedy-degradation calibration moves that slope by 0.0268 across its whole
> band, which is 4.4% of the effect.** The direction survives every calibration
> in evidence, and the direction is all it survives: `Y2` is a lower bound and
> nothing here measures `G₂` itself above `x = 37`. **[MEASURED]**

> **Cost: 39.1 minutes for the longest rung against the 71 minutes TODO 1b §8
> priced for it, and 105.0 minutes of summed process time against its ~235.**
> Sharding bought the whole ladder for the price of one rung, as §8 predicted.

---

## 2. Custody

**The instrument was not touched.** `research/two-class-lower-bounds.js`,
sha256 `726e5a4bef8f8241295d37b264ba575486cb5aaba76b37550c1d06d2004f4023`, is
byte-identical to the file the 2026-08-18 repair left behind. The assembler
computes nothing: it reads the sixteen shard logs, parses both old ladders out
of the files that own them, and prints the comparison.

**Neither old ladder was retyped.** OLD-A comes out of the `OLDY2` constant
inside the instrument, which exists precisely so the superseded 2026-08-17
numbers stay reproducible from the file. OLD-B comes out of the §5d table of
`research/two-class-lower-bounds.md`, sha256
`068b9acbf8b1918f7da7939b567e23c828326290e4075ea6e8e09e167562246e`. Both source
hashes are printed in the assembler's own output block.

**The sixteen invocations, verbatim:**

```
node research/two-class-lower-bounds.js --ladder-only --levels=<x>
  for x in 37 73 113 167 229 313 421 571 773 1009 1301 1699 2003 2503 3001 4001
```

All sixteen launched at once, each with `nohup` and `disown`, stdout to a
separate log. The assembler prints the byte count and sha256 of every log it
read, so a later reader can tell whether the logs in hand are the ones the tail
was bound to.

**The budget: one rule, sixteen levels, no per-level tuning.** The instrument's
own stock schedule `budget(np)`, with no `--force-budget`, no edited constants,
and `SEED_BASE = 20260818` throughout. The schedule is indexed by the prime
count, so `R` falls from 512 at `x = 37` to 2 at `x = 4001`; "uniform" here means
one rule applied to sixteen levels, never a knob turned at any one of them. That
is the same policy the published ladder ran under, which is what makes the two
columns comparable at all. Every row prints its own `R`, `W` and call count.

**Fragility, stated.** The shard logs live in a session scratchpad outside the
repo. When that is gone the tail no longer reproduces from the logs. What makes
the numbers recoverable anyway is that the instrument is deterministic: re-run
the sixteen invocations above and the same rows come back, which is exactly what
this run demonstrates.

---

## 3. The old sixteen, quoted before anything new was read

Two ladders carry that name and they are not the same, so both are quoted.

**OLD-A** is the 2026-08-17 ladder: bisection on a feasibility predicate that is
not monotone in `m`, deterministic tie-breaks, bracket chained from the level
below. Superseded at all sixteen levels by the 2026-08-18 repair.

**OLD-B** is that repair's published ladder, `two-class-lower-bounds.md` §5d,
produced in one process. It is what a sharded rerun has to reproduce.

| x | np | OLD-A (2026-08-17) | OLD-B (2026-08-18) | B/A | OLD-B Y1 |
|---|---|---|---|---|---|
| 37 | 12 | 355 | **527** | 1.485 | 65 |
| 73 | 21 | 1,211 | **1,440** | 1.189 | 182 |
| 113 | 30 | 2,501 | **2,823** | 1.129 | 311 |
| 167 | 39 | 4,210 | **4,728** | 1.123 | 462 |
| 229 | 50 | 6,748 | **7,372** | 1.092 | 658 |
| 313 | 65 | 10,469 | **11,682** | 1.116 | 1,000 |
| 421 | 82 | 16,453 | **17,280** | 1.050 | 1,391 |
| 571 | 105 | 25,469 | **26,303** | 1.033 | 2,005 |
| 773 | 137 | 39,277 | **40,644** | 1.035 | 2,906 |
| 1009 | 169 | 56,213 | **57,245** | 1.018 | 3,928 |
| 1301 | 212 | 81,986 | **82,013** | 1.000 | 5,469 |
| 1699 | 266 | 118,367 | 117,596 | 0.993 | 7,447 |
| 2003 | 304 | 144,712 | 143,942 | 0.995 | 8,938 |
| 2503 | 368 | 191,927 | **195,617** | 1.019 | 11,639 |
| 3001 | 431 | 245,270 | **247,877** | 1.011 | 14,324 |
| 4001 | 551 | 356,711 | 354,729 | 0.994 | 19,775 |

---

## 4. The pre-registration, sealed before the sixteen processes launched

Reproduced from the assembler's output block, where it is printed above every
result rather than beside them.

> **P1  AGAINST OLD-A.** The corrected instrument should read ≥ OLD-A at every
> level, since OLD-A bisected a predicate that is not monotone and can only have
> under-searched. **A decrease is not automatically a finding at three levels
> and the reason is on record before this run:** §5d already reports `x = 1699,
> 2003, 4001` landing below OLD-A, because OLD-A chained its bracket from the
> level below and the repaired search refuses that free information in exchange
> for level independence. So a decrease at 1699, 2003 or 4001 is EXPECTED. **A
> decrease at any other level would be new, and would be a real finding
> (instrument regression).**

> **P2  AGAINST OLD-B.** This is the sharp test and it is not a ≥ test. The
> repair made every level independent of every other, so a sharded rerun must
> reproduce OLD-B EXACTLY, all sixteen, in `Y1` and `Y2` alike. ANY difference
> is a finding: either the levels are not independent after all, or the
> published ladder does not come from the file that claims it. There is no noise
> channel here.

> **P3  THE DIRECTION.** `Y2/x²` is read as a monotone sequence and a slope with
> a band, never as a comparison of two means, and the greedy degradation
> measured in `greedy-oracle-validation.md` is applied as a correction band
> before any direction is declared.

---

## 5. The new sixteen, and the two comparisons scored

Every row replay-verified by the instrument's own independent verifier. Every
`Y2` is a certified **lower bound** on `G₂(x#) − 1`, never an estimate of it.

| x | np | R | W | calls | Y1 | **NEW Y2** | vs OLD-A | vs OLD-B | replay |
|---|---|---|---|---|---|---|---|---|---|
| 37 | 12 | 512 | 200 | 417,332 | 65 | **527** | +172 | **+0** | OK |
| 73 | 21 | 96 | 120 | 44,095 | 182 | **1,440** | +229 | **+0** | OK |
| 113 | 30 | 96 | 120 | 55,178 | 311 | **2,823** | +322 | **+0** | OK |
| 167 | 39 | 96 | 120 | 60,431 | 462 | **4,728** | +518 | **+0** | OK |
| 229 | 50 | 32 | 96 | 27,076 | 658 | **7,372** | +624 | **+0** | OK |
| 313 | 65 | 32 | 96 | 26,977 | 1,000 | **11,682** | +1,213 | **+0** | OK |
| 421 | 82 | 12 | 80 | 9,899 | 1,391 | **17,280** | +827 | **+0** | OK |
| 571 | 105 | 12 | 80 | 10,504 | 2,005 | **26,303** | +834 | **+0** | OK |
| 773 | 137 | 12 | 80 | 12,156\* | 2,906 | **40,644** | +1,367 | **+0** | OK |
| 1009 | 169 | 4 | 64 | 4,090\* | 3,928 | **57,245** | +1,032 | **+0** | OK |
| 1301 | 212 | 4 | 64 | 4,371\* | 5,469 | **82,013** | +27 | **+0** | OK |
| 1699 | 266 | 4 | 64 | 4,004\* | 7,447 | **117,596** | −771 | **+0** | OK |
| 2003 | 304 | 4 | 64 | 4,315\* | 8,938 | **143,942** | −770 | **+0** | OK |
| 2503 | 368 | 2 | 64 | 2,278\* | 11,639 | **195,617** | +3,690 | **+0** | OK |
| 3001 | 431 | 2 | 64 | 1,584\* | 14,324 | **247,877** | +2,607 | **+0** | OK |
| 4001 | 551 | 2 | 64 | 2,404\* | 19,775 | **354,729** | −1,982 | **+0** | OK |

`*` = the instrument's call cap bound that level, 8 of 16 rows, every level from
`x = 773` up. Those rows are weaker lower bounds than their budget row alone
suggests, and that is a property the published ladder shares, since it is the
same schedule.

**P1 scored: 13 of 16 at or above OLD-A, 3 below.** The three are exactly
`x = 1699, 2003, 4001`, the three P1 named in advance. **No level outside that
list moved down, so the instrument-regression flag never fires.** The gain over
OLD-A shrinks up the ladder, +172 at `x = 37` against +27 at `x = 1301`, which
is the search budget running out rather than the old search having been nearly
right at the top.

**P2 scored: 16 of 16 reproduce OLD-B exactly, and the one-class control
reproduces at 16 of 16 as well.** Sixteen separate processes, launched together,
agree digit for digit with the single process that produced §5d. **[VERIFIED]**

---

## 6. Item 1d: does `Y2/x²` fall over the corrected ladder?

### 6.1 The two traps, quoted and addressed

Both are quoted verbatim from `TODO.md` item 1d, which prices them as already
paid for on 2026-08-18.

> "never declare a trend from a comparison of means (0.278 → 0.277 was called
> 'falling')"

**Met by never forming a mean.** The reading below is a per-level sequence, a
step-by-step sign count over consecutive levels, and a log-log slope with its
standard error. No two averages are compared anywhere.

> "never compare slot-unit ratios across natals, since L·m̄/G₂ falls 0.985 →
> 0.531 across natals 5..23 at FIXED b = 37 and that fall is pure tile geometry"

**Met by the units.** `Y2` counts consecutive integers on the integer line, the
same unit at every level, divided by `x²`. Nothing here is measured in slots of
a tile, no quantity is held fixed at one natal while another varies, and each
level is its own natal. The tile-geometry channel that produced 0.985 → 0.531
has no entry point into this table.

### 6.2 The calibration, pre-registered

`greedy-oracle-validation.md` measures what the greedy loses: exact at 14 of 14
own levels and at `x = 53`, then a log-log fidelity slope of **−0.02353**, se
0.00706, band `[−0.03736, −0.00970]`, over `x = 13..79`. The corrected columns
divide `Y2` by `f(x) = (x/53)^slope` for `x > 53`, and by 1 at `x = 37`, where
`Y2 = 527 = G₂(37#) − 1` is the exact optimum and no correction is defensible.

| x | Y2 | Y2/x² | f central | corrected central | corrected steepest | corrected shallowest | Y2/(x ln²x) |
|---|---|---|---|---|---|---|---|
| 37 | 527 | 0.38495 | 1.0000 | 0.38495 | 0.38495 | 0.38495 | 1.0924 |
| 73 | 1,440 | 0.27022 | 0.9925 | 0.27226 | 0.27347 | 0.27106 | 1.0716 |
| 113 | 2,823 | 0.22108 | 0.9823 | 0.22506 | 0.22742 | 0.22271 | 1.1179 |
| 167 | 4,728 | 0.16953 | 0.9734 | 0.17417 | 0.17696 | 0.17143 | 1.0808 |
| 229 | 7,372 | 0.14058 | 0.9662 | 0.14550 | 0.14848 | 0.14259 | 1.0903 |
| 313 | 11,682 | 0.11924 | 0.9591 | 0.12433 | 0.12742 | 0.12131 | 1.1303 |
| 421 | 17,280 | 0.09749 | 0.9524 | 0.10237 | 0.10534 | 0.09947 | 1.1241 |
| 571 | 26,303 | 0.08067 | 0.9456 | 0.08531 | 0.08817 | 0.08256 | 1.1433 |
| 773 | 40,644 | 0.06802 | 0.9389 | 0.07245 | 0.07518 | 0.06981 | 1.1889 |
| 1009 | 57,245 | 0.05623 | 0.9330 | 0.06026 | 0.06277 | 0.05786 | 1.1859 |
| 1301 | 82,013 | 0.04845 | 0.9275 | 0.05224 | 0.05461 | 0.04998 | 1.2259 |
| 1699 | 117,596 | 0.04074 | 0.9216 | 0.04420 | 0.04637 | 0.04213 | 1.2512 |
| 2003 | 143,942 | 0.03588 | 0.9181 | 0.03908 | 0.04109 | 0.03716 | 1.2434 |
| 2503 | 195,617 | 0.03122 | 0.9133 | 0.03419 | 0.03606 | 0.03241 | 1.2763 |
| 3001 | 247,877 | 0.02752 | 0.9094 | 0.03027 | 0.03200 | 0.02862 | 1.2884 |
| 4001 | 354,729 | 0.02216 | 0.9033 | 0.02453 | 0.02604 | 0.02311 | 1.2888 |

### 6.3 The reading

**1. The sign count.** `Y2/x²` fell at **15 of the 15** consecutive steps,
0.38495 down to 0.02216, a factor of **17.4**. Under a null of independent
coin-flip steps that is `p = 3.05e-5`. **[MEASURED]**

**2. The slope, with the band applied.**

| column | log-log slope of Y2/x² against x | se |
|---|---|---|
| raw | **−0.6142** | 0.0076 |
| corrected, central slope −0.02353 | −0.5914 | 0.0073 |
| corrected, steepest edge −0.03736 | −0.5780 | 0.0072 |
| corrected, shallowest edge −0.00970 | −0.6048 | 0.0075 |

**The whole calibration band moves the slope by 0.0268 against a fall of 0.6142,
i.e. 4.4% of the effect.** The correction is real and it is not where the answer
lives.

**3. The certified column, which is not the same column.** Both the 2026-08-17
and the 2026-08-18 certificates replay clean, so the certified lower bound at
each level is the larger of the two, the convention `G2-STATE.md` §5a already
uses. On that column `Y2/x²` fell at 15 of 15 steps as well, slope −0.6133 with
se 0.0075, 0.38495 down to **0.02228**, a factor of 17.3. Three rows differ from
the new column: `x = 1699, 2003, 4001` keep their 2026-08-17 values.

**4. The matched control, which takes the estimator's fidelity out of the
exponent.** `Y1` is the identical repaired search on the one-class problem at the
identical budget, and its true exponent is 1, so whatever fidelity the search
loses up the ladder it loses on both sides.

```
one class   Y1 ~ x^1.1986      [TRUTH: exponent 1]
two class   Y2 ~ x^1.3858
excess apparent exponent 0.1872, control-corrected reading 1.1872
Y2/Y1 ~ (ln x)^1.084, se 0.048
```

That reproduces `two-class-lower-bounds.md` §5d's `[37, 4001]` regression row and
`G2-STATE.md` §6.1's certificate-ladder entry. **The second class buys one
logarithm, not a power of `x`.**

**5. The shape.** `Y2/(x ln²x)` moves 1.0924 to 1.2888, a factor of 1.18 the
other way, over exactly the range where `Y2/x²` falls 17.4-fold, and
`Y2/x ~ (ln x)^2.246` with se 0.032. The construction is `x · polylog`.

**6. What flatness would cost.** If `G₂(x#)/x²` were flat at its `x = 37` value,
where `Y2 = 527 = G₂(37#) − 1` exactly, then `G₂(4001#) − 1` would be
`0.38495 × 4001² = 6,162,280` against the certified 354,729. The greedy would
have to be short by a factor of 17.4, a fidelity of **0.0576**, where its largest
measured shortfall anywhere is **1.045** at `x = 79`. This is the
unrestricted-frame twin of the block-frame **0.0117** already on record in
`attack-block-04-greedy.md` §7. It is not a proof and is not offered as one: the
shortfall above `x = 79` is unmeasured. It is the size of the thing that would
have to be true.

**7. The second, wider calibration.** `two-class-lower-bounds.md` §5c brackets
the ladder's fidelity at `x = 4001` by its two measured proxies at
`[0.47, 0.73]`. At the worst edge of that bracket `x = 4001` reads **0.04715**
against `x = 37`'s exact 0.38495, still a factor of **8.2** down. No calibration
in evidence anywhere closes the gap.

---

## 7. Cost against the pricing

| | TODO 1b §8 price | measured here |
|---|---|---|
| longest rung, `x = 4001` | ~71 min | **39.1 min** |
| summed process time, all sixteen | ~235 min | **105.0 min** |
| wall clock for the ladder | ~71 min | **~39.4 min** |

Sixteen processes were launched together on a ten-core machine, so the small
rungs finished under contention and the top rung finished alone. The §8 pricing
was measured under a load average of 250 to 300 and is an upper bound by its own
statement; this run started at a load average of 3. **The shape of the price
held: the ladder costs the longest rung, not the sum.**

---

## 8. What this does NOT show

1. **It does not show that `G₂(x#)/x²` falls.** `Y2` is a lower bound on
   `G₂ − 1` and the instrument's own banner says so. A falling `Y2/x²` does not
   prove a falling `G₂/x²`, because the shortfall `Y2/(G₂−1)` is unmeasured
   above `x = 79` and could in principle fall as fast as the ratio does.
2. **The correction band is a FLOOR on the shortfall, not a bracket on it.** It
   was measured at `R = 2048` restarts on 22 primes. This ladder runs at
   `R = 512` down to `R = 2` on up to 550 primes, a budget thinner by orders of
   magnitude, so the true shortfall at the top is larger than the band says and
   the corrected column is still a lower bound.
3. **The band is an extrapolation** of a fit over `x = 13..79` out to
   `x = 4001`, a range it was never measured on, on a curve not established as a
   power law (`greedy-oracle-validation.md` §9.3).
4. **Nothing here is a new certificate at any level.** Sixteen of sixteen rows
   reproduce the published ladder, which is the result. The certified lower bound
   at `x = 1699, 2003, 4001` remains the larger 2026-08-17 number, exactly as
   §5d already recorded.
5. **It says nothing about the exact ladder.** No exact `G₂` term was computed
   or checked here. TODO 1c remains the only route to a new one.

---

## 9. Corrections to the record (proposed, not applied)

No live document was edited. These are for the parent session to adjudicate.

1. **`REFUTED.md`, TODO 1b's row.** The greedy-oracle row is accurate as it
   stands. What could be added is the leftover's closure: the sixteen Y2 levels
   were recomputed on 2026-08-19 and reproduce exactly, so §8's SKIPPED-cost note
   is now discharged rather than outstanding.
2. **`two-class-lower-bounds.md` §5d.** The table is confirmed reproducible from
   sixteen independent processes. A one-line note to that effect would convert
   "the levels are independent" from a header claim into a checked one, and would
   name this report as the check.
3. **`G2-STATE.md` §5a** carries `"At x = 43 it reaches 611 against the optimum
   617, ratio 0.990"`. `greedy-oracle-validation.md` §4 supersedes that: at
   `R = 2048` the greedy reaches **617** exactly, and the 611 was budget, not
   rule. That sentence is stale and is not this run's finding, but it sits in the
   same section as the ladder this report recomputes.
4. **`G2-STATE.md` §5a** also still carries a ⚠ correction block about the
   under-searched ladder, which the doc convention's 2026-08-17 rule sends to
   `CHANGELOG.md` with the body edited to state the current understanding.

---

*History and supersessions: `research/history/CHANGELOG.md`.*
