# The fourteen script defects: the repair record

<!-- ledger
id: Q-defect-repairs
status: ANSWERED
todo: none
question: Were the fourteen script defects repaired, and what moved in each output?
verdict: Repaired with the state named per item rather than hidden: the broken LCG was in FIVE files not three, item 8 is left FIXED-AWAITING-REEMBED with an honest code-sha256 mismatch, one of six format fixes was applied and five skipped with reasons, and the gate ends at one finding belonging to a concurrent session.
-->

*(2026-08-20. The repair pass against `defect-class-hunt.md`, which found the
defects and edited nothing. This file records what was changed, what was
re-embedded, what moved in each output, and what was deliberately left alone.
Item numbers are that file's "Corrections to the record" list.*

*Custody: the gate was clean (0 findings, all eleven checks) before the first
edit. A concurrent "readings traceability" session holds `TODO.md` and
`research/audit-numbers.js` modified; nothing here reverts or rewrites another
session's work.)*

## Status legend

- **FIXED-AND-REBOUND** — code repaired and the tail re-embedded with its
  recorded invocation, the output diff read against the hunt's prediction.
- **FIXED-AWAITING-REEMBED** — code repaired, re-embed costs more than ~30 min,
  so the tail is knowingly left stale. A `code-sha256` mismatch is the honest
  state and it is listed rather than hidden.
- **FLAGGED** — the output moved in a way the hunt did not predict; both values
  recorded, nothing published on it.
- **SKIPPED** — with the reason.

## The log

### Item 1 — `gen-scripts-index.js`, the warning table that omitted its own worst case  ·  FIXED-AND-REBOUND

The detector read `src.split('\n').slice(0, 40)` and matched
`/CORRECTION|SUPERSED|NOT a valid|⚠|WRONG/i` against it. a3-03's DEFECT banner
sits at line 600, so the corpus's worst known numeric defect was the one file
the warning table omitted.

**Not fixed the way the hunt proposed.** Adding `DEFECT` and scanning the whole
file case-insensitively matches **148 of 238 scripts** [VERIFIED here], because
ordinary prose says "wrong" and "corrected"; a warning table covering 62% of the
corpus is a worse instrument than one that misses a3-03. What was done instead:
the header test is unchanged, and a SECOND, case-sensitive whole-file test was
added for markers that are written on purpose —
`⚠|DEFECT|DEFECTIVE|CORRECTION|CORRECTED|SUPERSEDED` — rendered as its own
table, "Read this too: scripts whose correction sits BELOW the header", with the
line number of the first notice. 52 in the header, **39 below it**, and all
seven files the hunt named are now listed (a3-03 :600, a3-06 :663, a3-07 :730,
a3-08 :511, attack-06b :388, attack-hm-basis :930, attack-L-law :1438).

### Item 2 — `natal-cap-04-packing-cap.js`, a clock that decided an OEIS draft  ·  FIXED-AND-REBOUND

`budgetMs` and `Date.now() > deadline` replaced by a node counter, porting
`attack2-rankin2d.js:136-139`. Budgets 2e6 / 4e6 / 8e6, keeping the old 2:4:8
ratio at 1000 nodes to the millisecond.

**And the run was nowhere near the clock.** The deepest single `rho5BB` search
in the whole file uses **288 nodes** [MEASURED, printed to stderr by the new
diagnostic]. The staircase, the `exact` labels and the `83/184` were never in
danger of the timer on this machine; they were simply contingent on it, and are
not now. Output diff: the four `[N.Ns]` markers, nothing else. `exact for
83/184 lengths` and all seventeen diameters `2, 8, 32, 38, ...` reproduce
identically, and `out-sha256` is unchanged.

### Item 5 — `shadow-buchstab-02-instrument.js`, the unbannered producer  ·  FIXED-AND-REBOUND

Header banner added, carrying the 4x-6x understatement, the 35.84x oversample at
`y0 = 2900`, the two measured floors (0.00746 against 0.00165; 0.00405 against
0.00070) and the anatomy: the header states the dependence correctly and then
offers as its repair the Poisson floor on the same overlapping pool.
`out-sha256` unchanged.

### Item 7 — `natal-cap-23-covadj-proof.js`, the unguarded exact accumulator  ·  FIXED-AND-REBOUND

`SI()` added, copied from `natal-cap-26-minus-half.js:67`, and applied to `SAB`
and `SwJ` before the `BigInt()` that carries the EXACT sign verdict. At x = 23
`SAB` reaches 827 x 2^53 and the verdict would have gone silently wrong; it now
throws. `out-sha256` unchanged: at the levels this file runs, both accumulators
are inside the safe range.

### Item 8 — `natal-cap-37-at41-march.js:399`, the assert that could not fail  ·  FIXED-AWAITING-REEMBED

**And the hunt's one-character fix does not work.** Writing the literal as
`3825123056546413051n` makes `isPrimeMR` throw at `x % p === 0` (BigInt mixed
with Number); passing it as a string is worse, because `"3825…" % 2` coerces
back to the rounded even double and the assert passes vacuously exactly as
before. `isPrimeMR` was given a BigInt arm (`mrCore` factored out, small-prime
trial division over `MRB` in BigInt) and all four trap literals are now BigInt.

**Verified in a scratchpad** [the flagged-defective exception to the standing
compute rule]: the fourth trap is now actually tested, and it is caught by
**base 37 — the twelfth of the thirteen**. It fools 2, 3, 5, 7, 11, 13, 17, 19,
23, 29 and 31, which is right: 3,825,123,056,546,413,051 is ψ₉ = ψ₁₀ = ψ₁₁. The
trap the corpus never ran needed the last two bases of the set to catch it.
Number-arm and BigInt-arm both agree with a full sieve, zero disagreements.

No re-embed: this file's tail is external-log custody for a six-hour march, and
the fix changes no printed character (the four `console.log` lines are literal
strings). No `code-sha256` fingerprint exists on it, so no gate finding arises.

### Item 9 — the broken LCG  ·  FIXED-AND-REBOUND, and it is in FIVE files, not three

`seed = (seed * 1103515245 + 12345) & 0x7fffffff`. The product reaches 2.37e18 =
263 x 2^53, so it is inexact from the second call and the mask then keeps
garbage low bits. Replaced everywhere by `Math.imul(seed, 1103515245)`, which
reproduces the exact LCG mod 2^31 step for step [VERIFIED here against a BigInt
reference over 200,000 steps].

The collapse, reproduced independently: from seed 12345 the state has a tail of
5938 and a **period of 10,466**, and from seed 20260818 a tail of 2907 and the
same period. Worse than the hunt recorded on the low bits: over 80,000 draws
`seed & 7` lands in bucket 0 **79,661 times**, against 10,000 each for the fixed
generator.

**Two files the hunt's list does not name carry the identical two lines**, found
by grepping the constant after fixing the three:

| file | what it is | after the fix |
|---|---|---|
| `attack-ab-coupling-02-lp.js:746,788` | two separate generators, both seeded | `5582 → 5536 of 6000` at order 2, `52230 → 52212` power check; **both verdicts unchanged** ("THE PARITY IS REAL", "the hunt has power") |
| `attack-ford-halberstam.js:120` | `% 2147483648` variant, same overflow; its 200,000 "random" A1 trials were a few thousand | A1 max deviation `3.553e-15 → 5.329e-15`, A2 `6.821e-13 → 1.364e-12`, A3 min gap `7.859e-6 → 1.109e-6`, **violations still 0** |

The three the hunt named:

| file | output movement |
|---|---|
| `h2-randomised.js:65` | no embedded tail, nothing to re-embed. Its bounds are verified witnesses and stand; the search that found them was ~500x weaker than the file claims and now is not |
| `fold-profile-13-hotspot-sweep.js:132` | the six control rows moved (control mean, sd, z); **all six verdicts stay "consistent with the null"**. No document quotes any of the twelve moved figures [VERIFIED by grep] |
| `attack-theta-margin.js:55` | search-quality figures moved; see the FLAG below |

### Item 10 — the `x*x` windows  ·  FIXED-AND-REBOUND (a3-06), FIXED (window-check)

**`a3-06-origin-vs-max.js:287`.** `winB = BigInt(xp)*BigInt(xp) - 2n` is what the
column now prints; `win = Number(winB)` still feeds the two ratios, where 1e-16
matters to nothing. The output diff is **exactly the two integers the hunt
predicted and nothing else**:

| line | was | now |
|---|---|---|
| `x = 100000007` | `10000007400001366` | `10000007400001367` |
| `x = 1000000007` | `1000000018000000100` | `1000000018000000079` |

Both derived margins (`1.00e+8 / 3.33e+14`, `1.00e+9 / 2.49e+15`) are unchanged,
as the hunt said, and no document quotes either integer.

**`window-check.js:38`.** The margin `m = w/d` keeps the cheap double, because it
is a ratio. Every window that is PRINTED (`worstW`, and each decade's `dec[e].w`)
is re-formed by `winExact(pn, p) = BigInt(pn)*BigInt(pn) - BigInt(p)`, which
costs nothing: the two minima update a handful of times over the whole run. No
embedded tail, so nothing to re-embed; smoke-tested at N = 1e5. This also
retires the hunt's forward flag about the `window-check.js 1e11` run recommended
at `G2-STATE.md:1120` — at 1e11 the windows are now exact.

### Item 11 — `natal-cap-34-wrap-precision.js`, the false `exact` label  ·  FIXED, no re-embed needed

Not fixed by dropping the word. `WJ` is now accumulated with the house
BigInt-flush from `scanstat-t37-01-engine.js`: a small exact partial emptied into
a BigInt at 4e15. Every addend is an exact integer (`T²−T2` is even, being twice
a sum over unordered pairs), so the accumulator is now genuinely exact and the
label is true.

**The printed characters do not move**, which was the point of choosing this fix
over the relabel: the joint stage re-run gives `WJ = 1.3198e+9 / 7.9777e+12 /
5.6899e+16` and `WJ4 = 3.2818e+9 / 4.0689e+13 / 5.3882e+17`, identical to the
hand-pasted OUTPUT. So the block is not stale, and `qc-wave6-W.md:236`'s quote of
5.6899e+16 with the label `exact` becomes correct rather than needing withdrawal.

### Item 14 — guards that should be executable  ·  FIXED (three files)

| file | guard | effect on output |
|---|---|---|
| `localized-04-maxsum.js:97` | `YTOP + 66 < 2**32` before the bitset is sized; the file said this twice in prose and nothing stopped a run | no tail |
| `grain-census.js` | `q > 31` throws, in both `rhoDirect` and `addOff`, naming the alias-free replacement in `fdecay-deep-01-census-defect.js:80-96` | `out-sha256` unchanged |
| `natal-cap-21-beyond-chebyshev.js` | `assert(q<=64)` per scour prime in `exactMoments56`; the bound lived only in a comment | `683 → 693 checks passed`, ten new asserts at @11's ten scour primes. Nothing else moved, and no document quotes the check count |
| `attack-theta-margin.js` | `ps.length > 64` throws in `ceilingAt`, naming z = 331 as the next row of its own ladder that would alias | folded into the LCG re-embed |

### Item 3 — `σ_J`, the pooled Poisson floor  ·  FIXED-AND-REBOUND (xchan), PARTIAL (natal-cap-39)

**`xchan-at29-01-segmented.js`** got the exact fix the hunt prescribed, and it is
two additions per slot. The census already walks natal slots and already forms
each slot's triple contributions, so `SX` and `SX2` accumulate the per-slot
mixed super-W subtotal and `sqrt(SX2 − SX²/N̄)/CRT` is the exact slot-clustered
standard error. `SX === supMx` is asserted at every level, which is what makes
the decomposition checkable rather than asserted.

The registered σ stands as registered and the corrected one is printed beside it,
in the per-level lines, in the blind score and as two new summary columns.
**MEASURED inflation, per level:**

| level | @11 | @13 | @17 | @19 | @23 | @29 | @31 |
|---|---|---|---|---|---|---|---|
| ×σ_J | 0.989 | 1.806 | 1.876 | 2.015 | 2.078 | 2.106 | 2.124 |

Close to but not identical with the hunt's compound-Poisson model (1.000, 1.845,
1.933, 2.087, 2.158): this is the exact empirical slot variance, not a model.

**What moved, and every one of the hunt's predictions holds:**

| claim | registered | corrected | hunt predicted |
|---|---|---|---|
| @29 TEST 1 | z = −0.90, HIT | z = −0.43, HIT | −0.5 to −0.3, robust ✓ |
| @31 TEST 1 | z = −4.93, **MARGINAL** | z = −2.32, **HIT** | −2.6 to −1.3, flips to HIT ✓ |
| @31 rival N2 | −6.35 | **−2.99** | −3.3 to −1.7, stops being dead at 3σ ✓ |
| @31 rival N3 | −20.81 | **−9.80** | −11 to −5.7, still separates ✓ |
| TEST 2, `d` | −0.41%, −0.48% | σ-free, unchanged | TIGHT stands ✓ |

**`natal-cap-39-triple-census.js` — PARTIAL, and the reason is structural.** The
hunt asks for the same two lines "in the matching loop". There is no matching
loop: this file gets its super-W count by SUBTRACTION (`B_3` from the anchored
joint law, minus the restricted census), and its `tripleCensus` walks TRIPLES
`(q₁,q₂,q₃)`, not slots. A per-slot subtotal of super-W triples does not exist in
it to accumulate, and manufacturing one needs a W-sized array (W = 2.2e8 at @23
alone). So the file was relabelled honestly instead: the printed figure now says
it is a floor on the wrong sample unit, the header carries the measured inflation
range and the widened band edges `[0.872, 0.933]`, and both point at xchan for
the corrected figure. **No J value and no BAND verdict moved.**

Its re-embed also caught the hunt's own LATENT live: `restricted no calibration
yet (first level)` flipped to `restricted 0.00 s predicted`, because the box was
loaded and the elapsed no longer rounded to 0 ms. The hunt said this file "is
sitting on the boundary"; it crossed it.

**Live-layer restatements applied:** `research/G2-STATE.md` §"joint deficit"
(rivals 6.35σ/20.81σ → 2.99σ/9.80σ, the "visible only where the error bar can
see it" clause retired and replaced by TEST 2's σ-free offset), `TODO.md`'s
"refuting the deepening reading at 3.5σ / 48.7σ from zero" and "rivals dead at
6.35σ and 20.81σ ... detected only at @31". In every case the CLASSIFICATION
survives and only the quantifier was restated.

### Item 4 — `lemmaV-parseval.js:203`  ·  FIXED-AND-REBOUND, and the hunt's doc consequence is a MISREADING

The code fix is the hunt's: `R_H(x)` is a moving-window sum of length H walked
over the period, so the draws number W/H. The file now prints both benchmarks.
The corrected ratios come out at **0.8206 / 0.9990 / 1.1920 / 0.9806**, which is
the hunt's predicted table to four digits, and the T4-form column still
reproduces `0.5634 / 0.7279 / 0.9215 / 0.7935` digit for digit, so the file keeps
doing its reproduction job.

**But the hunt's item 4 then says `CHANGELOG.md`'s "`C_true = 0.5634–0.9215` sits
BELOW the maximal law" wants withdrawing, and it does not.** The line it points
at does not say that. It says `C_true` sits below **`C_crit = 1.358–2.225`**, and
`C_crit` is defined against the same `rms·√(2 ln W)` bracket
[`import-l1l2.md`:204, from `phase1-T4-maximal-law.md` §2(c)]. Correcting the
draw count rescales both by the same factor, so the comparison is invariant —
which is the hunt's OWN structural argument, that `C_true/C_crit` reduces to
`need_sharp/z²` with the bracket cancelling. A grep finds **no document anywhere
in the corpus claiming `C_true < 1`**; the only occurrence of "sits BELOW the
maximal law" is inside the hunt report itself. So nothing was withdrawn.
`IMPORT-MAP.md:132` and `import-l1l2.md` carry the same comparison and are
likewise untouched.

What IS retired, and the file's own READINGS now say so, is reading those four
numbers as an ABSOLUTE tightness against the maximal law: on the right draw count
they reach 1.19.

### Item 6 — `greedy-oracle-validation.js`, the sign verdict's independence claim  ·  measured

`regress()` now computes the residual lag-1 autocorrelation, the AR(1) deflator
`n_eff = n(1−r)/(1+r)` that `redteam-growth-aicc.js` §3 already uses, the
inflated `se`, and prints whether zero enters the ±1.96 se band on it. The
DEGRADATION VERDICT block reports it for both fits, so the sign call now carries
its own independence check instead of assuming one.

**Item 6, MEASURED.** The hunt could not settle this without a run and said so:
"An AR(1) inflation above roughly 1.4x puts zero inside the band and flips the
sign call ... shown to be possible, not actual." It is now measured on the fit
that carries the verdict, the one over all exact levels x = 13..79, whose
uncorrected band is the hunt's `[−0.03736, −0.00970]`:

- **lag-1 = +0.46629, VIF 2.747, se ×1.658** — above the hunt's 1.4x threshold.
- The corrected band is **[−0.04646, −0.00061]**, and **zero is still outside
  it**, by 0.00061. The sign verdict SURVIVES.
- The margin is now on the record: zero enters at lag-1 **0.4864**, which is
  0.0201 above what this ladder measures. The verdict is real and it is thin.

The hunt's 1.4x estimate of the flip point was low; the true one is ×1.702 on
the se. And the first run of the fix exposed something else worth keeping: the
rule's OWN scope (x = 13..41) is a degenerate fit — greedy equals the optimum at
all eight levels, slope and every residual exactly zero — so it printed
`lag-1 NaN, VIF Infinity` and a verdict about a fit that does not exist. That is
now handled explicitly rather than divided by nothing.

### Item 12 — the six tier-1c format fixes  ·  ONE FIXED, five SKIPPED with reasons

- **`attack-beta2-05-covering-prune.js:309` — FIXED-AND-REBOUND.** The bare
  integer ms column now prints ` ms`, which its own header column already
  named, so the existing `TIME` rule scrubs it. Every mathematical column
  (`nodes`, `prunes`, `leaves`, `m`, `6m+5`, the A144311 match) is identical.
- **`natal-cap-27-t4-at13.js` — SKIPPED, twice over.** A concurrent session has
  it modified with an open `code-sha256` mismatch (its edits sit at :219, :265,
  :271, :319, above the OUTPUT banner); re-embedding from here would sign
  another session's in-flight code. And it no longer needs the stderr routing:
  the item-13 rule scrubs its twelve `2.0 min … 24.0 min` ticker rows, which is
  the same portability outcome without touching the file or spending 25 minutes.
- **`verify-ladder-big.js` — SKIPPED, and no longer needed.** 55 min to
  re-embed; its `0.0 min / 1.4 min / 53.0 min` are scrubbed by item 13 with no
  code change at all.
- **`fdecay-deep-01-census-defect.js` — SKIPPED.** 37 min, over the budget. A
  cosmetic format change is not worth leaving a real `code-sha256` mismatch in
  the tree, so the file was not edited and the status quo is preserved exactly.
- **`scanstat-t37-02-validate.js`, `var41-price.js`,
  `foldL-window5-01-extinction.js` — SKIPPED for their RATE columns, on
  principle.** Each rate is quoted back in the file's own READINGS as a finding
  (`19.66 M slots/s` at `scanstat-t37-02:207`, the `ops/s` row at
  `var41-price:457-458`). Routing a reported result to stderr to satisfy a
  checksum deletes the finding to make the hash portable, which is the wrong
  trade. Their `h` and `days` figures ARE now scrubbed by item 13, which is the
  part that could be fixed without cost.

### Item 13 — `qc/tailfmt.js`  ·  FIXED, but NOT as proposed

The hunt asks for `min|h|hours|days` in `VOLATILE`. **Applied bluntly that is a
regression, and the hunt's own text contains the counter-evidence** ("a dozen
`min`/`h` hits in custody tails are `min` meaning *minimum* or `h` as a math
variable"). A blunt rule scrubs `W / (2 min(j, W-j))` in `level-ledger-tight`,
`Theta*(e)^2 h(e-h)` in `lemmaV-parseval` and `e(-2 h dbar1/d2)` in
`attack-theta-margin`, which would make `--check` blind to a real change inside a
printed formula: worse than the defect being fixed.

The rule shipped instead requires **exactly one space** (an aligned table column
has several: `6   min` in `attack-foldL-01` is a minimum) and a **negative
lookahead for a letter or an opening paren** (`2 h dbar1`, `2 min(j`). Verified
against every tail in `research/`: it matches **11 tails and every hit in all
eleven is a wall clock** — natal-cap-03, -07, -14, -27, -31, -37,
scanstat-t37-02, scanstat-t37-04, var41-price, verify-ladder-big,
y2-ladder-recompute. The three formula files and the three `min`-means-minimum
files are untouched.

`qc/selftest.js` stays fully green after the change: all 24 known positives
fire, all 14 controls silent.

## Flags: output that moved where a document still quotes the old figure

Per the repair brief, a fixed output whose changed figures are quoted somewhere
is FLAGGED rather than rewritten, unless the hunt says the old figure was wrong.
The hunt does not say that about any of these, so nothing was rewritten.

**`attack-theta-margin.js` — `research/history/staging/attack-theta-last-gap.md`
quotes four figures that the corrected LCG moved.** The stream is now the
generator the code always claimed; the old numbers were produced by a stream of
period 10,466 and are not reproducible from the committed code.

| where | was | now |
|---|---|---|
| `:102-103` | `u = 4.697691` at `u*P = 0.0063` | `u = 4.695059` at `u*P = 3.6701` |
| `:103` | apparent gain `0.4604` | `0.4630` |
| `:171` | ceiling at z = 61, `3.681e3` | `3.558e3` |
| `:171` | `0.00856` | `0.00827` |

**No conclusion in that file moves**: the trap it illustrates is still a trap
(the apparent gain is still ~0.46 and still the formula read outside its range),
the free-exponent fit goes 1.4090 → 1.4099, the last-four-z fit is unchanged at
1.3325, the crossing moves 3.725e+19 → 3.726e+19, and "the colouring constraint
is a CONSTANT, not a power" survives (0.0065 0.0078 **0.0083** 0.0091 0.0095
0.0096 0.0094). The ceiling is a max over random restarts, so it is an achieved
witness either way; this seed simply found a slightly worse local maximum.

**`attack-ab-coupling-02-lp.js` — its own READINGS at :1221 and :1235 quote
`5582` and `52230`,** now `5536` and `52212`. Both verdicts are unchanged
("inclusion-exclusion is below the true union", "its silence means something").
This file is not in the hunt's list at all, so there is no authority to rewrite
its readings; flagged.

No document quotes any figure that moved in `fold-profile-13-hotspot-sweep.js`,
`a3-06-origin-vs-max.js`, `natal-cap-21-beyond-chebyshev.js` or
`attack-ford-halberstam.js` [VERIFIED by grep over the whole tree].

## What was left alone, and why

- `research/natal-cap-27-t4-at13.js`, `attack-02-head-bias.js`,
  `level-ledger-tight.js`, `natal-cap-29-sigma-plateau.js`,
  `research/ATTACKS.md`, `research/audit-numbers.js` are modified by a
  concurrent "readings traceability" session. Nothing here reverted, rewrote or
  re-embedded any of them. The one `embeds` finding this repair pass leaves
  behind, `natal-cap-27-t4-at13.js:338`, is that session's, not this one's.
- `TODO.md` carries a two-line addition from that session at :54-58 (wave
  records for `custody-wave3.md`). The item-3 restatements had to go into the
  same file, so that hunk is co-committed here. It is complete, additive and
  theirs; it is named so nobody has to guess.
- **Five of these repairs are already in history under someone else's commit
  message.** The concurrent session committed on paths that included this
  session's in-flight work, so `a3-06-origin-vs-max.js`,
  `natal-cap-37-at41-march.js` and `grain-census.js` landed in `b1fdd8e`,
  `natal-cap-34-wrap-precision.js` in `0620c0c` and
  `fold-profile-13-hotspot-sweep.js` in `f466a68`, complete with their
  re-embedded tails. Nothing was lost and nothing needs redoing; the trail is
  recorded here because the commit messages do not carry it.

## The ledger

| # | item | status |
|---|---|---|
| 1 | `gen-scripts-index.js` banner detector | FIXED-AND-REBOUND, redesigned: a second table, not a wider regex |
| 2 | `natal-cap-04` wall-clock budget | FIXED-AND-REBOUND, no number moved; deepest search is 288 nodes |
| 3 | `σ_J` pooled floor | FIXED-AND-REBOUND (xchan, exact); PARTIAL (natal-cap-39, relabelled — no per-slot subtotal exists there); three live-layer restatements applied |
| 4 | `lemmaV-parseval:203` | FIXED-AND-REBOUND; the hunt's CHANGELOG withdrawal is a misreading and was not made |
| 5 | `shadow-buchstab-02` banner | FIXED-AND-REBOUND, `out-sha256` unchanged |
| 6 | `greedy-oracle-validation` AR(1) | MEASURED: lag-1 +0.46629, se ×1.658, zero still outside by 0.00061 |
| 7 | `natal-cap-23` `SI()` guard | FIXED-AND-REBOUND, `out-sha256` unchanged |
| 8 | `natal-cap-37:399` trap literal | FIXED-AWAITING-REEMBED (external-log custody, no fingerprint); the one-character fix does not work |
| 9 | the LCG | FIXED-AND-REBOUND in **five** files, not three |
| 10 | `a3-06:287`, `window-check:38` | FIXED-AND-REBOUND / FIXED; exactly the two predicted integers |
| 11 | `natal-cap-34` `exact` label | FIXED by making it true; no printed character moves |
| 12 | six tier-1c format fixes | ONE fixed (`attack-beta2-05`), five SKIPPED with reasons |
| 13 | `qc/tailfmt.js` VOLATILE | FIXED narrowly; the blunt version is a regression |
| 14 | executable guards | FIXED, four files |

**Gate at the end.** `node research/qc.js --full`: eleven checks, one finding,
and it is `natal-cap-27-t4-at13.js:338`, the concurrent session's committed
code/tail mismatch. `qc/selftest.js` all 24 positives firing and all 14 controls
silent. `audit-numbers.js` 242/242.

