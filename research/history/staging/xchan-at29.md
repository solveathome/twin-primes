# The blind @29 test of the joint-deficit closed form, and the segmented census that made it possible

<!-- ledger
id: Q-xchannel-closedform
status: PARTIAL
todo: X
question: Does the zero-parameter closed form for the joint deficit survive its two blind tests at @29 and @31?
verdict: 1 - J = 4S2 is the only one of the three pre-registered laws left standing and it is not exact: a clean hit at @29, z = -0.90, and 4.93 sigma low at @31 where sigma_J falls to 0.000024, with the two rivals dying at 6.35 and 20.81 sigma; both blind levels agree on a stable relative offset of about half a percent, -0.41% and -0.48%, whose absolute residuals match to 2%.
-->

*(2026-08-19. TODO item X's `~3.8` constant had a zero-parameter closed-form
candidate with blind values pre-computed at two levels that did not exist, and a
census instrument that stopped at @23 for want of 162 GB. This file builds the
segmented instrument, validates it against the in-memory one at five levels to
the unit, and spends both blind tests. Pre-registration, written and committed
alone before any producer script existed:
[xchan-at29-prereg.md](xchan-at29-prereg.md). Producer, formally embedded:
`research/xchan-at29-01-segmented.js`. Every figure below is from that file's
OUTPUT block, or is one-line arithmetic on figures in it, shown with its inputs.
Calibration is marked on every claim: PROVEN, MEASURED, DERIVED, REFUTED.)*

## Verdict

**The closed form `1 − J = 4S₂` is the only one of the three pre-registered laws
left standing, and it is not exact.** At @29 it scores a clean HIT
(`z = −0.90`); at @31, where the count is 1.65 billion and `σ_J` falls to
`0.000024`, it is 4.93σ low. The two rivals the pre-registration fixed before the
run die at @31 at 6.35σ and 20.81σ. What the two blind levels agree on is a
**stable relative offset of about half a percent**, `d = −0.41%` at @29 and
`−0.48%` at @31, and the corresponding absolute residuals
`0.028943 − 0.028823 = 0.000120` and `0.024784 − 0.024666 = 0.000118` are the
same number to 2%.

**And the memory ceiling is gone.** The census now costs **62.0 MB of arrays at
every level**, and the level enters only the clock: @23 in **0.56 s** against the
in-memory instrument's 169.89 s, @29 in **15.07 s**, @31 in **596.78 s**. The
Named gap "@23 is the in-memory instrument's last level (@29 needs 162 GB)" is
closed by construction, not by buying memory.

Five things the run settles that the record could not:

1. `J` is now measured at **seven levels** and is monotone from @17 through @31:
   0.902452, 0.959855, 0.965932, **0.971177**, **0.975334**. Both new levels sit
   in `natal-cap-39`'s pre-registered DECAYING FASTER THAN FORCED band, so
   `xchannel-triples.md` R1's verdict rests on five points rather than three.
2. **P1 is directly tested two and three levels beyond where it had ever been
   tested.** Aligned super-`W` obs is exactly 0 at @29 and at @31.
3. The `1/lnW` reading of the decay, which was indistinguishable from the closed
   form at @23 and 0.4σ from it at @29, is **REFUTED at 20.81σ at @31**.
4. The "asymptote is exactly 4" reading gains nothing. The measured ratio
   `(1−J)/F` runs **7.0401, 3.6905, 3.8630, 3.8240, 3.8427** over @17..@31: it
   does not rise, while the closed form's own ratio rises monotonically
   3.7245 → 3.8612 over the same span.
5. The candidate's residual, invisible at every level that scored it, is now
   **measured**: one detection at 4.93σ (@31) and one consistent non-detection
   at 0.90σ (@29).

---

## 1. What the in-memory instrument measures, and why @29 cost 162 GB

`research/natal-cap-39-triple-census.js` defines, at level `x` with
`W = ∏_{p≤x} p` and natal set `N = {r ∈ [0,W) : r ≡ 11,17 (mod 30), p ∤ r,
p ∤ r+2 for 7 ≤ p ≤ x}` and scour primes `qs = {q : x < q, q² ≤ W}`:

> `J(x) = (Σ_{∏Q > W, mixed} c(Q,ε)) / (6·N̄·Σ_{∏Q > W} 1/∏Q)`,
> `c(Q,ε) = #{r ∈ N : r ≡ −ε_q (mod q) ∀q ∈ Q}`, `ε ∈ {0,2}^Q`,

with `cls = #{q : ε_q = 0}`, `cls ∈ {0,3}` ALIGNED and `cls ∈ {1,2}` MIXED. It
reaches the super-`W` part by the bridge
`mixed super-W obs = Σ_{r∈N}[C(a,2)b + a·C(b,2)] − (sub-W mixed obs)`, with
`a(r) = #{q | r}` and `b(r) = #{q | r+2}` carried as two `Uint16Array(W)` beside
a `Uint8Array(W)` natal mask. That is **5 bytes per slot of `[0,W)`**, and
`natal-cap-35`'s version of the same pass is 25. At @29,
`W = 6,469,693,230`, so 32 GB and 162 GB respectively — the number
`xchannel-triples.md` §7 records, and the reason the series stopped.

The bridge's second term is the other half of the price: the sub-`W` census
enumerates 4,517,592 triples at @23 and scans `A` at stride `∏Q` across the
whole of `[0,W)`, which is random access over the resident array by
construction.

## 2. The segmented instrument, and its two levers

`research/xchan-at29-01-segmented.js`. Two changes, and neither approximates
anything.

**(L1) Exchange the order of summation.** Summing over `r` on the outside
instead of over triples:

> `mixed super-W obs = Σ_{r∈N} #{(q₁<q₂ ∈ D_a(r), q₃ ∈ D_b(r)) : q₁q₂q₃ > W}`
> `                  + Σ_{r∈N} #{(q₁ ∈ D_a(r), q₂<q₃ ∈ D_b(r)) : q₁q₂q₃ > W}`

with `D_a(r) = {q ∈ qs : q | r}` and `D_b(r) = {q ∈ qs : q | r+2}`. Every `r`
contributes through its own two divisor lists and nothing else, so the census is
a sum of a bounded function of the local factorisation over a sieved interval —
exactly the shape the corpus's segmented-sieve lever handles, and the same shape
`research/import-scanstat-04-score.js` streams over these same 6.47e9 positions
for T₂₉ with a depth-64 ring buffer and no materialised gap word.
**[MEASURED] The lists are short**: `max |D_a| = 5, max |D_b| = 6` at @29 and
`6, 6` at @31, against the code's capacity of 7, which it checks.

**(L2) Sieve the compressed slot line.** Every `r ∈ N` is `≡ 11` or `17`
(mod 30), so only `W/15` of the line can matter. Indexing slots by `s = 2k + t`
with `r = 30k + (t ? 17 : 11)`, a scour prime `q` marks one class on one side at
`r ≡ CRT(class, side) (mod 30q)` — every `2q`-th slot. The marking cost falls by
the full factor 15. At @29 that is **431,312,882 slots and 994,345,351 scour
marks** where the uncompressed line would need 1.49e10.

**Exactness at the one inequality.** The kernel compares `q₁q₂q₃` to `W`. At @31
that product reaches 9.0e16 and is not exact in a double, so it is never formed:
`U[m] = ⌊W/q_m⌋` is precomputed with an integer correction (the division is not
trusted), and the test is `q₁q₂q₃ > W ⟺ q₁q₂ > U[m]`, valid because every scour
prime exceeds `x` so `q_m ∤ W` and `W/q_m` is never an integer. `q₁q₂ ≤ 2.0e11`
is exact.

**The denominator is computed as a tail, never as a difference.**
`Σ_{∏Q>W} 1/∏Q` is accumulated directly over the super-`W` triples by a monotone
pointer on the third prime, so no cancellation enters it. Its consistency with
the other route is printed anyway: `miss + sub = e₃` agrees with the elementary
symmetric function to eight decimals at every level (0.25113952 at @29,
0.33095269 at @31), and the triple counts sum to `C(K,3)` exactly
(80,993,070,011 at @29; 8,812,286,043,484 at @31).

**Memory.** `A` (1 byte) + `a` (1) + `b` (1) + two `Uint16` divisor lists of
capacity 7 (28) = **31 bytes per slot on 2²¹ slots = 62.0 MB, at every level**.
The level enters only the segment count: 206 at @29, 6,376 at @31.

## 3. The validation gate — the instrument reproduces the in-memory one exactly

Prereg §5 fixed this before the producer was written: no @29 number is reported
unless the new instrument reproduces `natal-cap-39`'s embedded OUTPUT to the
unit at @11, @13, @17, @19 and @23. Fourteen integers and three rounded reals per
level, 85 comparisons in all.

| level | `N̄` | `B₃` split (3,0)/(2,1)/(1,2)/(0,3) | sub-`W` triples | sub-`W` mixed | **mixed super-`W`** | (2,1)/(1,2) | `Σ_{∏Q>W}1/∏Q` | `J` |
|---|---|---|---|---|---|---|---|---|
| @11 | 90 | 0/2/0/0 | 0 | 0 | **2** | 2/0 | 0.006909 | 0.536070 |
| @13 | 990 | 12/89/70/11 | 71 | 16 | **143** | 77/66 | 0.023518 | 1.023632 |
| @17 | 14850 | 848/2729/2713/847 | 5246 | 2243 | **3199** | 1622/1577 | 0.039784 | 0.902452 |
| @19 | 252450 | 27377/85713/85449/27391 | 162982 | 97097 | **74065** | 37139/36926 | 0.050943 | 0.959855 |
| @23 | 5301450 | 879225/2779604/2779107/879385 | 4517592 | 3751046 | **1807665** | 904409/903256 | 0.058834 | 0.965932 |

**[MEASURED] GATE: 5 reference levels checked, 0 mismatches.** Every integer,
and `Σ_{∏Q>W}1/∏Q`, the CRT denominator and `J` at the record's own printed
precision. The two instruments share no data structure: one enumerates triples
and scans a resident `W`-wide mask, the other sieves a compressed slot line in
62 MB segments and never enumerates a triple in the numerator at all.

Two further identities hold at every level including the two new ones:
`sub + sup = B₃` class by class (INTERNAL IDENTITY PASS), and the counted `N̄`
equals `2∏_{7≤p≤x}(p−2)` (143,139,150 at @29; 4,151,035,350 at @31).

## 4. The price, and what it now costs to go up a level

| level | slots | scour marks | segments | census | level total |
|---|---|---|---|---|---|
| @23 | 14,872,858 | 30,527,907 | 8 | 0.55 s | **0.56 s** (natal-cap-39: 169.89 s) |
| @29 | 431,312,882 | 994,345,351 | 206 | 13.02 s | **15.07 s** |
| @31 | 13,370,699,342 | 33,742,377,278 | 6,376 | 544.68 s | **596.78 s** |

Whole file, seven levels: **612.6 s**. The difference between the census column
and the level column is the denominator's `K²` pass, 2.05 s at @29 and 52.10 s
at @31.

**[MEASURED] The factor at @23 is 303.** The in-memory census needed 169.89 s and
1.203 GB there (`xchannel-triples.md` §3); this one needs 0.56 s and 62.0 MB, and
gets the same integers. The @31 leg cost 596.78 s, which is why the prereg's
conditional @31 clause was executed rather than deferred.

**Timings are the only thing here that moves.** The file was run twice end to end
on a machine shared with four concurrent siblings, and the two runs have the
**same normalised output hash** (`out-sha256 0c5f57087dd86f49…`): every integer,
every ratio and every verdict is identical, and only the wall clock differs.

## 5. @29 and @31, scored against the pre-registration

The predictions are `import-stein.md` §3.2's, adopted verbatim in prereg §2 and
hard-coded in the producer. **[MEASURED] Custody first:** `4S₂` recomputed here
from the level's own prime list is **0.028943** at @29 and **0.024784** at @31,
agreeing with the record's blind values to the printed digit. The prime lists are
`K = 7863` and `K = 37534`, which are the record's own counts, running 31..80429
and 37..447829 inside the intervals (29, 80429] and (31, 447829] it names, and
`F` likewise reproduces at 0.7537% and 0.6419%.

| level | mixed super-`W` obs | CRT | `J` | `1 − J` | `σ_J` | predicted `1−J` | **z** | **d** |
|---|---|---|---|---|---|---|---|---|
| @19 | 74,065 | 77,162.70 | 0.959855 | 0.040145 | 0.003527 | 0.041122 | −0.28 | −2.38% |
| @23 | 1,807,665 | 1,871,421.20 | 0.965932 | 0.034068 | 0.000718 | 0.033678 | +0.54 | +1.16% |
| **@29** | **53,660,192** | **55,252,747.16** | **0.971177** | **0.028823** | **0.000133** | **0.028943** | **−0.90** | **−0.41%** |
| **@31** | **1,653,241,687** | **1,695,051,393.52** | **0.975334** | **0.024666** | **0.000024** | **0.024784** | **−4.93** | **−0.48%** |

(The @19 and @23 rows are this instrument's own reproduction of the record; the
record scores them −0.29 and +0.60 from its rounded `1−J`.)

**PRE-REGISTERED VERDICTS, printed by the producer's own classifier.**

- **@29: TEST 1 `z = −0.90` → HIT. TEST 2 `d = −0.41%` → TIGHT.** Combined
  verdict, prereg §3: **HIT**. The J-band clause does not fire.
- **@31: TEST 1 `z = −4.93` → MARGINAL. TEST 2 `d = −0.48%` → TIGHT.** Combined
  verdict, prereg §3: **SURVIVES WITH A MEASURED OFFSET — right to `d`, not
  right.** The J-band clause does not fire.

**[MEASURED] R1 — the offset is the finding, and it is one detection, not two.**
`d` is −0.41% at @29 and −0.48% at @31, and the absolute residuals
`0.028943 − 0.028823 = 0.000120` and `0.024784 − 0.024666 = 0.000118` agree to
2%. But `σ_J` is 0.000133 at @29, so **@29 does not detect the offset** — it is
consistent with it at 0.90σ and equally consistent with zero. The detection is
@31's alone, at 4.93σ. The honest statement is: *one level measures a residual
of 1.18e−4, a second level is consistent with the same residual and cannot
resolve it, and the two levels that fitted the closed form had error bars
0.003527 and 0.000718, respectively 30 and 6 times too wide to have seen it.*
No closed form is proposed for the residual here; two points, one of them a
non-detection, do not license one.

**[REFUTED] R2 — the two rival laws, fixed in prereg §4 before the run.**

| law | @29 prediction | z at @29 | @31 prediction | z at @31 |
|---|---|---|---|---|
| N1, the candidate `4S₂` | 0.028943 | **−0.90** | 0.024784 | **−4.93** |
| N2, constant multiple of `F` fixed at @23 | 0.029145 | −2.43 | 0.024818 | −6.35 |
| N3, `1 − J ∝ 1/lnW` anchored at @23 | 0.028990 | −1.26 | 0.025165 | −20.81 |

Prereg §4 registered in advance that @29 could not separate these — N3 sits 0.4σ
from the candidate there — and that @31 could. It did. **N3 is refuted at 20.81σ
and N2 at 6.35σ, and the candidate is nearer than either at both blind levels.**
The closed form is the last law standing, and it is also refuted as exact.

**[MEASURED] R3 — the ratio does not rise, and "asymptote exactly 4" gets no
support.** The measured `(1−J)/F`, on the producer's own `F`:

| x | 17 | 19 | 23 | **29** | **31** |
|---|---|---|---|---|---|
| measured `(1−J)/F` | 7.0401 | 3.6905 | 3.8630 | **3.8240** | **3.8427** |
| `4S₂/F` | 3.7245 | 3.7804 | 3.8189 | **3.8399** | **3.8612** |

The closed form's ratio rises monotonically toward 4 by construction; the
measured one falls from @23 to @29 and rises again to @31, inside a spread of
0.04. **None of that shape is resolved**: the @23 ratio's own bar is ±0.081
(`xchannel-triples.md` R3), which swallows the whole spread. What IS resolved is
the vertical offset at the two sharp levels, where `σ_J/F` is
0.000133/0.007537 = 0.018 and 0.000024/0.006419 = 0.0037: the measured ratio sits
0.0159 below the formula's at @29 and 0.0185 below it at @31, which is the
primary test's 0.90σ and 4.93σ read in another column. So the "asymptote
exactly 4" clause in `import-stein.md` §3.2 is a property of the formula and not
a measured trend, and the one thing the measurement does say about it is that
the formula runs high.

**[MEASURED] R4 — `J` itself, seven levels, monotone from @17.** 0.536070,
1.023632, 0.902452, 0.959855, 0.965932, **0.971177**, **0.975334**, with
increments from @17 of +0.057403, +0.006077, **+0.005245**, **+0.004157**. Both
new levels classify DECAYING FASTER THAN FORCED under `natal-cap-39`'s
pre-registered bands (0.945 < J ≤ 0.995), and the monotonicity clause holds. The
deficit is still large in its own units: at @31 the shortfall is
1,695,051,393.52 − 1,653,241,687 = **41,809,706.52 coincidences, more than
1,000 σ_J from zero**. Decaying is not absent, and two more levels do not make
it absent.

**[PROVEN, now MEASURED twice more] R5 — P1 holds at @29 and @31.** Aligned
super-`W` obs is **exactly 0** at both, by direct enumeration of the divisor
lists rather than by the bridge subtraction that produced the @19 and @23 zeros.

**[MEASURED] R6 — the two orientations stay symmetric.** (2,1) and (1,2) split
26,827,582 / 26,832,610 at @29 (0.019% apart) and 826,645,240 / 826,596,447 at
@31 (0.006% apart), against 27,626,373.58 and 847,525,696.76 each. The deficit
is not carried by one orientation at either new level.

## 6. What this does not show

- **No derivation.** `import-stein.md` §3.3 killed the Chen–Stein route
  (`b₃/(b₁+b₂) = 73.4` at @23) and §3.4 refuted the super-`W` decomposition
  route. Nothing here revives either. The closed form is still a formula that
  fits, now known to be accurate to about half a percent and no better.
- **The residual is not identified.** One 4.93σ detection at one level. Any
  closed form fitted to it now would be fitted to a single number.
- **N2 is not fully separated from N1 by structure, only by value.** A constant
  multiple with the constant re-fitted at @29 or @31 rather than at @23 would
  track the measurements as well as `4S₂` does; what @31 refutes is the specific
  constant the prereg fixed at @23.
- **The `σ_J` error model is inherited, not derived.** These counts are exact
  arithmetic; `√obs/CRT` is the record's own Poisson proxy for their
  fluctuation, and every z here depends on it. A different fluctuation model
  moves the 4.93σ.
- **`j = 4` is still untouched**, and the steelman is stated at `i + j ≥ 3`.
  Its missing mass at @23 is 0.040035, and the same instrument would reach it.
- **No σ_X, no rotation ensemble, no `m`-decomposition.** This file computes the
  joint census and nothing else; `natal-cap-39`'s other columns are not
  reproduced here and are not claimed.
- **No live document carries any of this.** `TODO.md` item X, `paper/anchored-note.md`,
  `research/moire-theorems.md`, `import-stein.md` and `xchannel-triples.md` were
  not touched. §7 proposes the item X edit; it is not applied.

## 7. Proposed update to TODO item X (report only, not applied)

Three edits, and one Named gap to close.

**(a) The closed-form clause.** Replace *"the `~3.8` constant now has a
ZERO-PARAMETER closed-form candidate ... landing at −0.29σ (@19) and +0.60σ
(@23) with asymptote exactly 4 ..., and blind values pre-computed at @29 ... and
@31 .... so the derivation stays the item's open analytic target, now with a
target formula and two blind tests waiting"* with:

> **BOTH BLIND TESTS SPENT, 2026-08-19** (`research/history/staging/xchan-at29.md`,
> pre-registered in `xchan-at29-prereg.md` and committed alone before the
> producer existed). `1 − J = 4S₂` measures **0.028823 at @29 against the
> predicted 0.028943 (z = −0.90, HIT)** and **0.024666 at @31 against 0.024784
> (z = −4.93, d = −0.48%)**. It is the **only survivor of the three laws the
> prereg fixed**: a constant multiple of the forced scale fixed at @23 dies at
> 6.35σ and `1 − J ∝ 1/lnW` at 20.81σ, both at @31. It is also **refuted as
> exact** — the two blind levels share a relative offset of −0.41% and −0.48%,
> absolute residuals 1.20e−4 and 1.18e−4, detected at 4.93σ at @31 and only
> consistent at 0.90σ at @29. **"Asymptote exactly 4" is untested and gains
> nothing**: the measured ratio runs 7.0401, 3.6905, 3.8630, 3.8240, 3.8427 over
> @17..@31 and does not rise, while the formula's rises 3.7245 → 3.8612. The
> derivation remains the item's open analytic target and now has to produce the
> half-percent offset as well as the leading term.

**(b) The `J` series.** *"the mixed super-W joint deficit runs J = 0.9025,
0.9599, 0.9659 at @17/@19/@23"* becomes *"...0.9025, 0.9599, 0.9659, 0.9712,
0.9753 at @17/@19/@23/@29/@31, monotone at all five, all three post-@17 levels
in the DECAYING FASTER THAN FORCED band, and P1 (aligned super-W ≡ 0) now
directly enumerated at @29 and @31 as well."*

**(c) Named gaps.** Strike *"@23 is the in-memory instrument's last level (@29
needs 162 GB)"* and replace with:

> The census is segmented (`research/xchan-at29-01-segmented.js`): **62.0 MB of
> arrays at every level**, @23 in 0.56 s against the in-memory instrument's
> 169.89 s and to the same integers, @29 in 15.07 s, @31 in 596.78 s. The memory
> ceiling is gone and the clock is what is left: @29 → @31 cost a factor of 40
> for a factor of 31 in `W`, so @37 is an overnight run rather than an
> impossibility (extrapolated, not priced).

**(d) The first move.** *"decide whether δ's sign flip is finite-size or
structure before any segmented @29 rewrite"* is spent: the rewrite exists and
was cheaper than the decision it was gated behind. The cheap next instrument
named there, *"j = 4's own census, missing mass 0.040 at @23"*, is unchanged and
is now reachable at @29 and @31 by the same code path.

## 8. Files touched

- `research/history/staging/xchan-at29-prereg.md`: new, committed **alone**
  before the producer existed (`27dc709`, "prereg: xchan-at29").
- `research/xchan-at29-01-segmented.js`: new. Tail embedded with
  `node research/qc/embed.js --timeout 1800 research/xchan-at29-01-segmented.js`.
  **The file carries a PRESENTATION NOTE in its header and the reason is on the
  record inside it.** Each blind level was computed once before the canonical
  embed run, with these predictions and these bands already hard-coded and the
  pre-registration already committed, so neither figure was ever produced by an
  unclassified run. @29 was first computed on a revision differing only in two
  OUTPUT lines (the custody line, and a corrected scour-mark work count, which is
  printed and not used); @31 was first computed on the present revision, before
  the default level list gained 31. No band, rule, threshold, prediction or
  computed quantity changed at any point, and the embedded block reproduces both
  first runs digit for digit. The file was embedded twice: the first embed's
  header quoted the @31 probe's own census time, which the canonical run does not
  reproduce because the machine is shared with four concurrent siblings, so the
  figure was replaced by a pointer to the block's own price and the file re-ran.
- `research/history/staging/xchan-at29.md`: this file.

No live document was edited.

## 9. Gate

**Before:** `node research/qc.js` TOTAL = **0**.

**After:** the count **oscillates between 0 and 6** depending on the minute it
is read, and every finding in it is `uncited-script`. `node research/qc.js
--full` reports **117/117 checks passed** and fails the gate only on whatever
that TOTAL happens to be.

**Reporting "0 before, 0 after, unchanged" would be true of a number and false
of the fact.** The tree is shared with four concurrent siblings, as
`xchannel-triples.md` §9 describes, and the finding set moved four times while
this ran: six (five siblings' scripts and this session's
`research/xchan-at29-01-segmented.js`, waiting for the report that cites it),
then four (one sibling's `fdecay-deep` family), then zero, then four again as
that sibling's tree changed under the reading. **Since this file was written,
none of the findings has been this session's**: it cites its own producer, and
the `refs`, `quotes`, `crosslinks`, `scripts`, `transfers`, `calibration`,
`absence`, `sourcing`, `embeds`, `provenance` and `search-convention` checks are
all clean on both files this session wrote. `embeds` in particular is clean
after the numbered READINGS were appended below the OUTPUT banner, which is what
confirms the `code-sha256` binding was not disturbed by them.

`node research/qc/embed.js --check --timeout 1800
research/xchan-at29-01-segmented.js`: **code-sha256 matches, out-sha256
matches**, on a third full execution of the file.
