# The engine's operative depth is not u = 2: `natal-cap-28`'s certificate crossing sits at u = 3.557 at @97 and is still falling, the three "u → 2" arrivals in the corpus are the same definition written three ways, and the quadpoint drift is a finite-size Mertens artefact

<!-- ledger
id: Q-u2-engine-depth
status: ANSWERED
todo: 8
question: Is the certificate engine's operative depth heading to u = 2, and does that make TODO item 8's payout form TPC-strength?
verdict: It is not: the measured operative depth runs u = 4.191 at @17 down to 3.557 at @97 and is still falling, so the brief's conditional does not fire and item 8 is shown neither TPC-strength nor safe; a WALL-ADDRESS in the weakest sense, every figure SCRATCHPAD-GRADE.
-->

> **RIDER 2026-08-30 (orchestrator, from the sealed fifth-decade test
> `blind-0830-quadpoint-c1c2.md` §§4, 6; this note stays HELD).** The
> exact-partial-product main term of §5 reproduces the ln y*/ln h band means
> to within ±0.0015 through Q = 316243 (blind, sealed rows, fourth and fifth
> decades) and is REJECTED as the main term at the sampling-error scale from
> B11 on, sitting above the data by 3.46, 8.83, 13.33 and 23.82 se at B11 to
> B14 with the same sign throughout (sealed D1 rows HIT at B13 and B14). The
> mechanism that tracks the data to 2 se on 17,702 blind anchors is
> `import-rough-anatomy.md` §2.1's ω-form, the crossing u·ω(u) = 2M with the
> Mertens ratio M inside it. So "the drift is a finite-size Mertens artefact"
> reads "the drift is the ω-at-finite-u crossing with the Mertens ratio; the
> Mertens product alone is off by 13 to 24 se by the fifth decade", and §5's
> "closes on the numbers" carries the precision at which it closes.

*(2026-08-27. **Staging note. No existing repo file was edited, moved or
deleted; no git command was run.** One producer was written, and it lives in
the session scratchpad, not in `research/`:
`…/scratchpad/u2-probe.js` (sha256 `999b949e…`), output captured at
`…/scratchpad/u2-probe.out` (sha256 `9fe26574…`), node v22.21.0.*

*__Custody convention, and why this one.__ The `attack-lichtman-decomp.md`
convention is used: the producer is scratchpad-resident, is **not** embedded,
is **not** `qc`-gated, and its figures are therefore marked
**`[SCRATCHPAD-GRADE]`** with their inputs and the script path. `embed.js` was
deliberately **not** used, because `embed.js` writes an OUTPUT block into the
script it runs and the script it would run is not a repo artifact — an embed
stamp on a file outside the corpus buys custody theatre and no custody. Nothing
below may be quoted outside this file until it is re-derived inside an embedded
producer in `research/`.*

*__What the producer actually does, since this is the load-bearing custody
point.__ It does not reimplement either engine and it does not modify either
engine. It reads the **code region** of two repo producers — every byte above
their embedded `OUTPUT` banner — **verifies that region's sha256 against that
file's own embedded `code-sha256`**, and only then runs it verbatim in a vm
context with a reporting tail appended after the last statement. Both matched
on the run reported here:*

| producer | region sha256 | file's embedded `code-sha256` | match |
|---|---|---|---|
| `research/natal-cap-28-analytic-certificate.js` | `dde56561f31370a97d3d66528050f78e4485788dbf669496c4f11f23f1fc8b73` | same | yes |
| `research/attack-quadpoint-03.js` | `5fa9bb3748e08800ce2f4c78bf7d78ab5747b76785dde106faa1d547f0da7af3` | same | yes |

*So every number in §2 and §5 comes out of code that the corpus's own embed
gate already binds, called with new arguments and read at a new field. The only
new code is arithmetic on `engine()`'s return value and, in §5, the main-term
comparator. **Grade: `[SCRATCHPAD-GRADE]` throughout — a measurement, never a
proof.** Pre-existing artifacts cited and not recomputed: `natal-cap-28`'s
`q*` column and `attack-quadpoint-03`'s SEC 2 band means, both quoted from
their embedded OUTPUT blocks and both reproduced here as a custody check
(§2, §5).*

---

## 0. The verdict, disconfirming half first

**The brief's conditional does not fire, and the reason is that its premise is
false at the depth the engine actually operates.**

1. **`u(x)` is not heading to 2 and is nowhere near 2.** At the engine's
   certificate crossing the measured operative depth runs
   `u = 4.191` at @17 down to **`u = 3.557` at @97** — decreasing at every
   step from @17 onward, still falling at the last level, and **1.557 above
   2** there.
   `[SCRATCHPAD-GRADE]`
2. **So TODO item 8's payout form is *not* shown to be TPC-strength by this
   measurement, and it is not shown to be safe either.** The brief's
   inference — "u → 2 ⟹ item 8 asks for what it cannot have" — is not
   available. Nothing here opens a route; it removes one proposed way of
   closing one. This is a WALL-ADDRESS in the weakest sense: it says the wall
   is not at *this* address.
3. **The convergence story it was meant to test does not survive contact with
   the definitions.** Three of the four claimed arrivals at `u = 2` —
   readings (i), (ii) and (iv) — are the **same structural fact stated in
   three coordinate systems**: *sift an interval of length ≈ y² by the primes
   up to y*, which is `u = 2` by construction, not by measurement. They are
   not independent, and two of them (ii and iv) contain no measurement at all.
   Detail in §4. **This is the disconfirmation the brief asked for and it is
   the most important line in the file.**
4. **The engine does contain a real `u = 2`, and it is not the one the brief
   named.** `natal-cap-28`'s Buchstab factor averages `ω(ln n / ln y)` over
   `n ∈ [q², W]` (`:305`), so its **lower** endpoint is `u = 2` at every level
   by construction, at every depth. Item 8's transfer therefore does need `ω`
   *down to* `u = 2` — but for a dimension-2 (shifted rough pair) object, where
   `u = 2` is not a Buchstab problem (ω is an asymptotic, not a bound, and
   `ω(2) = 1/2` exactly) but is squarely inside the region `attack-roughpair-
   error.md` §5 already priced. That note got there first and in the right
   coordinate; this measurement adds a second, non-independent read.
5. **The one thing that did move, and it is in the second item, not the
   first.** `quadpoint-identity-01.md` §6's first open bullet — the unmodelled
   `0.935 → 0.984` drift — **closes on the numbers**. A zero-parameter main
   term with the Mertens *asymptotic* replaced by the exact partial product
   reproduces the measured band-mean sequence as `0.923 → 0.984`: right sign,
   right size, residual `−0.0032 → +0.0000`, monotonically vanishing. The
   asymptotic form drifts the other way (`1.041 → 1.004`, from above). §5.
   `[SCRATCHPAD-GRADE]`

**Numeric confidence, stated as the brief requires.**

| claim | confidence | what would falsify it |
|---|---|---|
| the engine's crossing `u` at @97 is 3.557 ± 0.001, not 2 | ~0.97 | a different identification of `y_K` (§1); the check is that six levels' `y*` reproduce the embedded `q*` column digit-for-digit |
| `u` is still falling at @97 | ~0.9 | the last three increments are `−0.0085, −0.0061, −0.0029`, within the same order as the instrument wobble at the tail switch-on (§3) |
| the range cannot pin a limit | ~0.95 | a stable two-point extrapolation; the one measured is not stable (§3) |
| readings (i)/(ii)/(iv) are one definition, not three arrivals | ~0.95 | each is quoted at source in §4; the reading is mine and is falsifiable by reading them |
| the quadpoint drift is a finite-size Mertens artefact | ~0.75 | the agreement is band-mean only — per-anchor sd is 15× the mean residual (§5); and the main term is itself heuristic |

---

## 1. What `y_K` is in the code, and why

**The identification, stated before any number depends on it.**
`y_K` is the **depth variable of `engine()`'s `bound(ly)`**: `ly = ln y_K`, and
`y_K` is the largest enforced scour modulus. Three lines fix it and none of
them is a variable name:

- **`:54–55`** defines the object: `B(q,K) = <w(ln n/ln y_K)>/<w(ln n/ln x)>`,
  *"y_K = the largest enforced modulus"*. That is the header's own words.
- **`:204`**, in the exact-side `scanLevel`, realises it discretely:
  `Bk[j]=omAt(lnQ[j-1])/om0` — at depth `j` the argument is `ln Q[j−1]`, the
  `j`-th scour prime. So `y_K = q_K`, the K-th scour prime, exactly.
- **`:298`** (`Kof`) and **`:317`** (`bound=ly=>…`) carry the same quantity
  into the continuous engine, with `K = Li(y) − Li(x)` as the index↔depth map.
  `bound` is a function of `ln y_K` and of nothing else.

**Which `y_K` is "operative" is not unique, and the brief's phrasing hides
three different answers.** `engine()` evaluates `bound` at three depths:

| depth | line | what it is | resulting `u = lnW/ln y_K` |
|---|---|---|---|
| `y*` | `:329` `lyst=…bis(ly=>bound(ly),lnx,lnRt)` | the crossing: least depth at which the certificate is positive at all. Returned as `.yst`, and it is exactly the **`q*` column** of the embedded OUTPUT table | **measured, §2** |
| `y10` | `:330` `ly10=bis(ly=>Kof(ly)-0.10*lenK,…)` | the depth carrying `K = 10%` of the scour — the `f10` reading, the engine's headline in reading 6 | `→ 2`, **definitionally**, §3 |
| `√W` | `:328` `ceil_=bound(lnRt)` | the ceiling `Spred` | **`= 2` exactly, by construction** |

The brief's phrase "the engine's operative `u`" is read here as the **first**,
because `y*` is the only one of the three that is a *measurement*: it is where
the certificate turns positive, and nothing forces its value. The other two are
`√W` up to a bounded factor and so are arithmetic, not data. **Both readings
are reported anyway** (§2, column `u@y10`), because picking one silently is how
this programme has been bitten before.

**One structural fact, worth stating because it caps the whole question.** The
bisection interval is `[ln x, ln √W]` (`:329`), so
`u ∈ [2, lnW/ln x]` **always**, and `u = 2` ⟺ `y* = √W` ⟺ the certificate
needs the *entire* scour. `u → 2` would therefore be the certificate getting
*maximally expensive in depth*, not cheap. Reading 6 of `natal-cap-28` reports
the opposite direction (`K*/len` `0.88% → 0.002%`), and both are true at once:
`ln y*/ln √W = 2/u` rises `0.498 → 0.562` while `π(y*)/π(√W)` collapses.

---

## 2. The full table

`u(x) = lnW / ln y*`, `lnW = Σ_{p≤x} ln p`, `y*` = `engine(x,bias).yst`.
`_raw` is `bias = 0`; `_ctr` is the engine's declared central calibration
`b = c/ln³W`, `c = 47.4`; `u_lo`/`u_hi` are its `[45.4..48.8]` envelope.
All figures **`[SCRATCHPAD-GRADE]`**, producer `…/scratchpad/u2-probe.js`
SEC A, run of 2026-08-27, node v22.21.0.

|   x |      lnW |   K*_raw |     y*_raw |  u_raw |   K*_ctr |     y*_ctr |  **u_ctr** |   u_lo |   u_hi |       du |  1/u_ctr | u@y10 | Spred/N | tail? |
|----:|---------:|---------:|-----------:|-------:|---------:|-----------:|-------:|-------:|-------:|---------:|---------:|------:|--------:|:-----:|
|  13 | 10.30995 |        0 |     13.000 | 4.01955 |        0 |     13.000 | **4.01955** | 4.01955 | 4.01955 |     — | 0.248784 | 3.24886 | 2.94e−1 | no |
|  17 | 13.14317 |    2.507 |     28.997 | 3.90331 |     1.84 |     23.008 | **4.19130** | 4.19126 | 4.19133 | +0.17174 | 0.238590 | 3.18115 | 2.05e−1 | no |
|  19 | 16.08760 |    10.48 |     67.007 | 3.82601 |     9.26 |     61.004 | **3.91337** | 3.91329 | 3.91344 | −0.27793 | 0.255534 | 2.97757 | 1.50e−1 | no |
|  23 | 19.22310 |    28.76 |    163.21  | 3.77288 |    26.39 |    150.89  | **3.83194** | 3.83178 | 3.83204 | −0.08143 | 0.260965 | 2.75816 | 1.13e−1 | no |
|  29 | 22.59039 |    74.56 |    439.40  | 3.71222 |    69.35 |    408.91  | **3.75661** | 3.75626 | 3.75684 | −0.07533 | 0.266198 | 2.59566 | 8.51e−2 | no |
|  31 | 26.02438 |   182.5  |   1182.4   | 3.67821 |   171.1  |   1091.8   | **3.72009** | 3.71970 | 3.72036 | −0.03652 | 0.268810 | 2.48617 | 6.72e−2 | no |
|  37 | 29.63530 |   459.0  |   3341.6   | 3.65227 |   431.5  |   3121.1   | **3.68326** | 3.68231 | 3.68413 | −0.03684 | 0.271499 | 2.40707 | 5.38e−2 | no |
|  41 | 33.34887 |  1156    |   9433.8   | 3.64387 |  1090    |   8854.2   | **3.66929** | 3.66813 | 3.66997 | −0.01397 | 0.272532 | 2.34890 | 4.45e−2 | no |
|  43 | 37.11007 |  3030    |  2.7878e4  | 3.62559 |  2861    |  2.6157e4  | **3.64830** | 3.64741 | 3.64885 | −0.02099 | 0.274100 | 2.30492 | 3.72e−2 | **yes** |
|  47 | 40.96022 |  8148    |  8.3665e4  | 3.61374 |  7705    |  7.8694e4  | **3.63338** | 3.63248 | 3.63398 | −0.01492 | 0.275226 | 2.27016 | 3.16e−2 | yes |
|  53 | 44.93051 |  2.274e4 |  2.5901e5  | 3.60465 |  2.153e4 |  2.4400e5  | **3.62199** | 3.62130 | 3.62245 | −0.01139 | 0.276091 | 2.24180 | 2.71e−2 | yes |
|  59 | 49.00805 |  6.625e4 |  8.3129e5  | 3.59541 |  6.278e4 |  7.8444e5  | **3.61077** | 3.61012 | 3.61121 | −0.01122 | 0.276949 | 2.21829 | 2.34e−2 | yes |
|  61 | 53.11892 |  1.957e5 |  2.6867e6  | 3.58819 |  1.857e5 |  2.5383e6  | **3.60201** | 3.60142 | 3.60241 | −0.00876 | 0.277623 | 2.19883 | 2.04e−2 | yes |
|  67 | 57.32362 |  5.972e5 |  8.9165e6  | 3.58196 |  5.671e5 |  8.4364e6  | **3.59439** | 3.59386 | 3.59476 | −0.00762 | 0.278211 | 2.18222 | 1.80e−2 | yes |
|  71 | 61.58630 |  1.836e6 |  2.9623e7  | 3.57975 |  1.745e6 |  2.8066e7  | **3.59102** | 3.59055 | 3.59134 | −0.00337 | 0.278472 | 2.16801 | 1.60e−2 | yes |
|  73 | 65.87675 |  5.907e6 |  1.0267e8  | 3.57113 |  5.619e6 |  9.7371e7  | **3.58142** | 3.58099 | 3.58171 | −0.00960 | 0.279219 | 2.15578 | 1.43e−2 | yes |
|  79 | 70.24620 |  1.931e7 |  3.5997e8  | 3.56552 |  1.838e7 |  3.4174e8  | **3.57495** | 3.57455 | 3.57522 | −0.00647 | 0.279724 | 2.14504 | 1.28e−2 | yes |
|  83 | 74.66504 |  6.529e7 |  1.3012e9  | 3.55775 |  6.220e7 |  1.2363e9  | **3.56645** | 3.56608 | 3.56670 | −0.00850 | 0.280391 | 2.13558 | 1.15e−2 | yes |
|  89 | 79.15368 |  2.240e8 |  4.7552e9  | 3.55228 |  2.135e8 |  4.5219e9  | **3.56032** | 3.55998 | 3.56055 | −0.00613 | 0.280874 | 2.12717 | 1.04e−2 | yes |
|  97 | 83.72839 |  7.765e8 |  1.7499e10 | 3.55001 |  7.407e8 |  1.6656e10 | **3.55746** | 3.55714 | 3.55767 | −0.00286 | 0.281100 | 2.11960 | 9.32e−3 | yes |

**Custody check against the pre-existing artifact.** `y*_ctr` is the `q*`
column of `natal-cap-28`'s own embedded OUTPUT. Recomputed vs embedded, six
levels: `408.9 / 4.09e+2`, `1092 / 1092`, `3121 / 3121`, `8854 / 8854`,
`2.440e+5 / 2.440e+5`, `1.666e+10 / 1.666e+10`. Identical at the printed
precision. **@13–@23 and @43–@89 have no published `q*` and are new here**;
@29/@31/@37/@41/@53/@97 are reproductions.

**Calibration of the `u@y10` column** (it uses the engine's stated
`K = Li(y) − Li(x)` map rather than its discrete `Kof`, because `Kof` is not on
the return): `Kst` vs `Li(y*) − Li(x)` reads `1.0695` at @29, `1.0140` at @41,
`0.9999` at @97 — so that column is good to ~7% at @29 and to 4 digits by @97,
which is enough for its only job, which is to show the value approaches 2.

**Reference constants, recomputed on `natal-cap-28`'s own ω grid:** root of
`u·ω(u) = 2` is `u* = 3.565847`, `1/u* = 0.280438`; `1/(2e^γ) = 0.280730`;
`ω(2) = 0.500000`, `ω(3) = 0.564382`, `e^−γ = 0.5614594836`.

### 2b. Two instrument caveats that belong beside the table, not below it

- **The engine's validation band is @13–@23, and the deep levels run a code
  path that band never exercised.** `hasTail` is false whenever `√W ≤ 2e7`,
  which covers every validated level **and** @29–@41. The tail integral
  switches on at **@43**, and the increment *magnitudes* jump there
  (`−0.01397` at @41, `−0.02099` at @43) rather than continuing to shrink.
  They are non-monotone at four steps in all — @37, @43, @73, @83 — so the
  @43 step is not on its own evidence of a seam either; what it is, is a
  reason to read the `du` column at a precision no finer than `±0.005` and
  to treat the whole deep half as instrument-limited at that scale. `u`
  itself is monotone decreasing at every step from @17 onward; the only rise
  in the table is @13→@17.
- **The extrapolation dies between @137 and @151**, in this same engine, with
  no change to the code. `Spred/N` falls `9.32e−3` (@97) → `1.78e−3` (@137) →
  **`−3.54e−4` (@151)**: the ceiling `bound(ln√W)` goes negative, so the
  certificate has no crossing at any depth and the bisection saturates at its
  top, printing `u = 2.00000` as a **numerical artefact**, not a limit. This
  is the one place where a "u → 2" reading was available from this engine and
  it is spurious; anyone re-running SEC A must check `ceil_ > 0` before
  reading `u`. It also bounds `natal-cap-28` reading 6's "no efficiency
  collapse anywhere in the extrapolation" as a statement about the range that
  was run, not about the engine. `[SCRATCHPAD-GRADE]`

---

## 3. What this range can and cannot distinguish

**It can exclude `u → 2` in any accessible sense, and that is the whole
deliverable.** `u` is 3.557 at @97 with an envelope of ±0.0003, the gap to 2 is
1.557, and the per-level increments in the last decade run `−0.003` to
`−0.010`. Even taken as a constant per-level rate — which the table refutes,
since it is decaying — closing 1.557 needs of order 200–500 further levels. No
model consistent with these twenty points reaches 2.

**It cannot pin a limit, and the demonstration is that the extrapolation is
unstable.** Two-point solves of `u = u∞ + a/lnW` on consecutive measured
pairs, run only to test stability and **not offered as a fit or a limit**:

| pair | u∞ (1/lnW) | u∞ (1/ln²W) |
|---|---|---|
| @23→@29 | 3.3266 | 3.5589 |
| @37→@41 | 3.5578 | 3.6168 |
| @53→@61 | 3.4924 | 3.5518 |
| @79→@89 | 3.4449 | 3.5061 |
| @89→@97 | 3.5080 | 3.5334 |
| @109→@127 | 3.4509 | 3.4894 |
| @127→@137 | 3.4068 | 3.4633 |

`u∞` wanders over `[3.41, 3.56]` under one model and `[3.46, 3.62]` under the
other, non-monotonically, with no sign of settling. **So: the data cannot
distinguish "→ 3.41" from "→ 3.56" from "→ 3.62", and it cannot distinguish
any of those from a slow drift with no limit.** It *can* distinguish all of
them from 2, by a margin of about 1.5 in `u` and about 500 levels in `x`.
The corpus's own lesson applies and is why no fitted exponent appears above:
a fitted rule that passes its first blind test is not a rule.

**The `u@y10` column is a different matter and is not evidence.** It falls
`3.249 → 2.120` and *is* going to 2 — because `K(y10) = 0.10·π(√W)` puts
`y10` within a bounded factor of `√W`, so
`u@y10 = 2/(1 − O(1/lnW)) = 2 + O(1/lnW)` identically. The measured value
`2.1196` at @97 matches the leading term `2 + 2·ln10/ln√W = 2.110` to 0.5%.
**A quantity that is `√W` up to a factor of ten converges to `u = 2` whatever
the arithmetic does.** Anyone reading a "fifth arrival at u = 2" out of the
`f10` reading is reading a definition. That is the same trap as reading (iv),
and it is why §4 exists.

---

## 4. The four arrivals, compared

| # | object | what its "u" is | value | is it a measurement? |
|---|---|---|---|---|
| (i) | tile-side target `G₂(x#) < x′² − 2` | `ln(x′²)/ln x` = sifting range over sieve depth | `→ 2` from above, margin `→ 0` | **no** — `x′ ~ x`, so this is `2·ln x′/ln x → 2` by PNT alone |
| (ii) | fold-ledger stretch, `attack-lambda-ledger.md`:186 | `log(q²)/log(q)` | **`2` exactly**, at every fold | **no** — the note says so in its own words: *"the stretch definition pins u = 2"* |
| (iii) | TODO item 8 / `natal-cap-28`'s `B(q,K)` | `ln n / ln y`, `n ∈ [q², W]` | a **range** `[2, lnW/ln y]`, lower endpoint 2 by construction (`:305`) | the *endpoint* is not; the *upper end* is what §2 measures |
| (iv) | `attack-maxvr-uniform-01.js`:563 | `lnW/ln y`, `y = √W` | `2.0116, 2.0007, 2.0024, 2.0004, 2.0001` | **no** — `y` is the largest prime `≤ √W`, so the sequence is `2·(1 + O(gap/(√W ln√W)))` and `→ 2` by prime gaps, not by arithmetic |
| **(v)** | **this note**: `natal-cap-28`'s certificate crossing | `lnW/ln y*`, `y*` where `bound = 0` | **`4.191 → 3.557` over @17…@97** | **yes** |

**Reading, and it is the disconfirming one.** (i), (ii) and (iv) are one
sentence written three ways: *the range is the square of the depth, so
`u = 2`*. That is a coordinate choice in (ii) and (iv) and a target
specification in (i). None of them is a coincidence and none of them is
independent of the others. **"Four independent objects converged on u = 2" is
not what the record supports; three of the four never varied.** What is real
and remains real is that `u = 2` is where `f(2) = 0` kills the `κ = 1` lower
bound (`covering-dive.md` §1.2, Granville quoted verbatim there) — so
*designing* an object whose range is the square of its depth is designing an
object that sits on the sifting limit. That is a statement about the design,
and it is already the corpus's Face-4 reading of the wall.

**The engine's crossing is the one genuinely free number, and it does not land
at 2. It lands near 3.56, which is a constant the corpus already has.**
`1/u_ctr` reads `0.280391` at @83 and `0.280874` at @89, straddling
`1/u* = 0.280438`, the root of `u·ω(u) = 2` that `quadpoint-prior-art.md`
identified as the crossing law's exact form. Best agreement `0.017%` at @83.

**Three reasons not to read that as an arrival, in the order they matter.**

1. **It is a crossing, not a limit.** `1/u_ctr` keeps rising:
   `0.281100` (@97), `0.283160` (@109), `0.284480` (@137) — **1.44% past
   `1/u*` by @137** and still moving. A sequence that passes through a
   constant and keeps going is not converging to it. `[SCRATCHPAD-GRADE]`
2. **The two readings are not independent, and this is disqualifying.**
   `natal-cap-28`'s `bound()` has Buchstab's `ω` inside it (`:309`, `:319`),
   and `u·ω(u) = 2` is a statement about `ω`. Finding an `ω`-built engine
   crossing near a root of an `ω`-equation is one object, not two.
3. **The neighbouring read is in a different coordinate and got there
   first.** `attack-roughpair-error.md` §5 uses `u = ln h/ln y` (height over
   depth) and `s = lnW_stretch/ln y`, prices the certificate window at
   `s ≲ 2.317` at B8 drifting to `u*/2 = 1.783`, and shows `Xmain/T = 5.631`
   at `s = β₂ = 4.2665`. That note's conclusion — *"the precision class was
   misidentified … the coordinates are `s`, not `E`"* — is the finding; this
   note adds a tile-side read consistent with it and nothing more.

---

## 5. The `ln y*/ln h` check, run

**The queued correction's question, restated.** `quadpoint-identity-01.md` §6
lists the `0.935 → 0.984` drift as unmodelled;
`attack-roughpair-error.md` §6 says the drift is probably a finite-size Mertens
artefact and states plainly that *"the direct check at the level of
`ln y*/ln h` band means was not run"*. It is run here.

**The comparator, derived rather than assumed.** §3 of the identity note
writes `X/C ≈ κ(δ_R − δ_P)²`, `T/C ≈ κδ_P²`, and cancels κ. Redone as strict
inclusion–exclusion over channel positions the cancellation is **exact at
finite y**, and it is a two-line identity:

- pairs both rough beyond `y`: `A(y) = ∏_{7≤p≤y}(1 − 2/p)`;
- pairs with one member prime, partner rough beyond `y`:
  `P_pr(y) = δ_P·∏_{7≤p≤y}((p−2)/(p−1))`;
- `X(y) = A(y) − 2P_pr(y) + T` exactly, so `X < T ⟺ A(y) < 2P_pr(y)`;
- and `(1 − 2/p)·(p−1)/(p−2) = (p−1)/p`, so
  `A(y)/∏((p−2)/(p−1)) = ∏_{7≤p≤y}(1 − 1/p) =: P(y)`.

**Condition, exact:** `P(y*) ≤ 2δ_P = 7.5/ln h`, `h = Q²`.
The asymptotic `P(y) ~ (15/4)e^{−γ}/ln y` recovers `ln y*/ln h = 1/(2e^γ)`.
*A small correction to the note in passing:* the note's own form leaves a
`κ_y δ_P²` term against a true `T`, so κ cancels only asymptotically there;
in the form above it cancels identically. `y*` is discretised the same way the
measurement discretises it — the **least** active prime meeting the test.

**Result.** `[SCRATCHPAD-GRADE]`, producer SEC B, anchors and band edges taken
from `attack-quadpoint-03.js`'s own `rows`; the `measured` column reproduces
that file's embedded SEC 2 to four decimals.

| band | n | measured | main-term (exact Mertens) | asymptotic | meas/cand | **main/cand** | asym/cand | main − meas |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| [101,313] | 40 | 0.2624 | 0.2592 | 0.2923 | 0.935 | **0.923** | 1.041 | −0.0032 |
| [317,997] | 103 | 0.2705 | 0.2684 | 0.2852 | 0.963 | **0.956** | 1.016 | −0.0020 |
| [1009,1499] | 71 | 0.2720 | 0.2707 | 0.2840 | 0.969 | **0.964** | 1.012 | −0.0013 |
| [1500,3163] | 208 | 0.2740 | 0.2736 | 0.2831 | 0.976 | **0.975** | 1.009 | −0.0004 |
| [3164,5623] | 292 | 0.2749 | 0.2746 | 0.2828 | 0.979 | **0.978** | 1.007 | −0.0003 |
| [5624,10007] | 491 | 0.2763 | 0.2763 | 0.2819 | 0.984 | **0.984** | 1.004 | +0.0000 |

**Answer to the queued question: the main term accounts for the drift's size
and its sign.** Size: the measured deficit at B3 is `−0.065` of the candidate;
the main term's is `−0.077`. Sign: both approach from **below**; the
asymptotic-form comparator approaches from **above** (`1.041 → 1.004`), which
is the control that makes the reading mean something. Shape: the residual
`main − measured` is monotone and vanishes, `−0.0032 → +0.0000`. Mean band
`y*` agrees too: `15.60 / 32.32 / 47.56 / 68.96 / 99.32 / 141.30` against
measured `16.15 / 33.76 / 48.92 / 69.85 / 100.42 / 141.80`.

**Four caveats, ahead of the result.**

1. **The agreement is band-mean only.** Per anchor, `main − measured` has mean
   `−0.00061` but **sd `0.00925`** — fifteen times the mean — over 1219
   anchors, range `[−0.104, +0.049]`, with only 36.7% of anchors above zero.
   The main term predicts the *band mean*, not the anchor.
2. **The main term is heuristic**, not derived: it is the identity note's own
   factorised density model with the asymptotic swapped out. Nothing here is
   proven, and §3's derivation of the law is untouched.
3. **This closes §6's *first* bullet only** — the finite-size drift's model.
   §6's other bullets stand, and so does `attack-wrongdirection-audit.md` §3.2's
   correction: the law must be stated **conditionally**, on the set of `Q` with
   `T ≥ 1`, because `y*` is measured only where it is defined.
4. **This is not the `u·ω(u) = 2` correction.** That moves the target from
   `0.280730` to `0.280438` (0.10%); the Mertens finite-size effect measured
   here is 6.5% at B3 and 1.6% at B8. The two are independent and the second
   dominates in this range. A combined comparator was not run.

**A by-product with a consequence for a future prereg, printed but not
sealed.** The exact-Mertens main term forecasts `y* = 317` at `Q = 31607` and
`y* = 617` at `Q = 100003`, against the asymptotic `336` and `642` — **5.7%
and 3.9% lower**, with `ln y*/ln h = 0.2779` and `0.2790`. If item Z2's move
(c) blind test is ever sealed, these are the sharper zero-parameter numbers
and the asymptotic ones are known-biased upper edges. **Sealing is not done
here and this note seals nothing.**

---

## 6. Proposed text — `TODO.md` item 8

*Proposed only. It stays in this file. `TODO.md` was not edited.*
The status change is small and negative: the note's job was to test a
conditional that does not fire, so item 8 does not become TPC-strength, does
not become safe, and gains one measured coordinate and one pointer.

> **8. Prove the Buchstab transfer** (the certificate law's one heuristic;
>    natal-cap-28). Also: (b) prime-comb equidistribution in the tail
>    regime; (c) tighten 2·3^k (~30× slack).
>    DEPTH COORDINATE, MEASURED (`history/staging/u2-engine-depth.md`, HELD;
>    scratchpad-grade, not embedded): the transfer is needed over
>    `u = ln n/ln y ∈ [2, lnW/ln y]`, `n ∈ [q², W]` — the lower endpoint is
>    `u = 2` by construction at every level, and the upper end at the
>    engine's own crossing measures `u = 4.19 → 3.557` across @17…@97,
>    monotone and still falling. So the transfer is **not** legal at a fixed
>    `u > 2` as item 8 has been read: it needs `ω` down to `u = 2`, for a
>    **dimension-2** (shifted rough pair) object. `u = 2` is not a Buchstab
>    obstruction (`ω(2) = 1/2`, an asymptotic not a bound); it is the
>    dimension-2 sifting-limit region, which is exactly where
>    `attack-roughpair-error.md` §5 already prices the wall
>    (`s ≲ 2.317` at B8, `Xmain/T = 5.631` at `β₂`). **No status change: the
>    transfer stays unproven and the payout stays unquantified.** Do not
>    re-run the "does the engine's u tend to 2" question — it does not, and
>    the u = 2 readings in (ii)/(iv) and in the `f10` column are definitional,
>    not data. NOTE: Z2's analytic race will need exactly this
>    Buchstab-on-intervals machinery — coordinate.

---

## 7. Not reached

- No embedded producer. Everything here is scratchpad-grade and must be
  re-derived inside `research/` before it is quoted anywhere else.
- No red-team pass; this note is HELD and owes Z0's roundup.
- The engine's death between @137 and @151 (§2b) is diagnosed only to the
  level of "`ceil_` goes negative". Whether that is the head/tail split, the
  `b ~ c/ln³W` calibration leaving its warrant, or something real, is not
  determined here.
- The combined comparator (`u·ω(u) = 2` correction **and** exact Mertens)
  for §5 was not run.
- Whether the engine's crossing at `1/u ≈ 0.2804…0.2811` has any derivable
  relation to `u·ω(u) = 2` was not attempted; §4 records only that they are
  not independent objects.
