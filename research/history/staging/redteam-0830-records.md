# Red team, 2026-08-30: D* re-derived in exact rational arithmetic at 299 anchors and the record note's sieve re-sieved to 1e11 — both notes' numbers reproduce, four sentences do not, and REFUTED row 95 misnames the coordinate its own agreement figure lives in

<!-- ledger
id: Q-redteam-0830-records
status: ANSWERED
todo: Z2, Z5
question: Do attack-0829n-parity-dstar.md (CLOSED, HELD) and attack-0830-record-mechanism.md (PARTIAL, HELD) survive an adversarial pass on independent code, does REFUTED row 95 stand as worded, and is TODO Z5's new title supported?
verdict: Both notes' measurements reproduce on independent code and neither headline is refuted: D* is confirmed EXACTLY, by a BigInt rational simplex written here, at 299 of 376 anchors with 0 contradictions (the other 77 exceed the exact solver's size cap), the old range's 172-figure gate is re-derived exactly at all 43 anchors with 0 disagreements, and an independent 30-wheel sieve to 1e11 reproduces note (b)'s seven decade gap counts, CV^2 and far-tail slopes to every printed digit, with the counts also matching the published pi_2(10^k). Four sentences are wrong or over-stated and are replaced here: REFUTED row 95, note (a)'s ledger, its section 6 and TODO Z5 all attribute the null's 0.025 agreement to the WIDTH law when 0.025 is the ln Q slope difference (the width-slope difference on the same 84 matched anchors is 0.031); note (a) section 3's "the threshold sits in a gap of at least 0.25 at every anchor" is scoped in its own producer to the true arm and the null arm's exact gap is 0.1212; P6's HIT rests entirely on the decade-2 collapse that section 5 discounts as a sampler artefact when it discounts kill clause (a); and note (b)'s "d b_z = 1.0806 +- 0.0014" carries only the Monte Carlo pairing error, while moving the far-tail slope by 0.02 (against a spread of 0.0174 across six fit windows on the same decade and 0.1196 across decades) moves d b_z from 0.9888 to 1.1720, and continuing the law at slope 1 above the last resolved point still gives 0.7752. REFUTED row 95's CLOSED verdict stands on kill clause (b), which is better powered than the note presents it (paired s.e. 0.0401 against a 0.15 band), and the row needs two clauses reworded; TODO Z5's title is supported for "measured and not derived", and the resolved part of the law carries 72 per cent of the residual on its own with the extrapolation carrying the rest.
-->

*(2026-08-30. Staging note, internal, HELD under the publication moratorium.
Adversarial by mandate: refuted-until-re-derived. No existing file was edited,
no git command was run, `research/qc.js --full` was run at the end and is
reported in section 9. Companion producer, formally embedded:
`research/history/staging/redteam-0830-records.js` (four hashed inputs; one
`--force`, disclosed in section 9: the guard fired on a prose correction inside
this file's own section 6 and reported every figure of the replaced block as
reproduced). House format per `redteam-0829-theorem1.md` and
`redteam-0828-quadpoint.md`. Calibration marked per claim: VERIFIED by exact
computation, MEASURED, HEURISTIC, WEAKENED, REFUTED. Targets:
`attack-0829n-parity-dstar.md` (note **a**, CLOSED) and
`attack-0830-record-mechanism.md` (note **b**, PARTIAL), with `REFUTED.md`
row 95 and `TODO.md` item Z5.)*

---

## 0. VERDICT

**Read the caveats first.**

1. **77 of the 376 D\* were not re-derived.** The exact rational simplex is
   capped at 420 live rows after presolve; above that a BigInt tableau leaves
   the session's budget. The skipped anchors are the widest stretches — exactly
   the ones where a float engine is most likely to drift — so "0 contradicted"
   is a statement about 299 anchors, not about all of them. Decade 2 is the
   worst covered: 11 of 21 true anchors and 4 of 21 null anchors.
2. **Reproducing a number is not endorsing a design.** Note (b)'s null is a
   simulation of a conjectural process; every `d b_z` below is MEASURED ON A
   MODEL, and this pass agrees with note (b)'s numbers without moving that rung
   at all. The whole family remains a comparison against a conjectural null.
3. **Nothing here opens or closes a route.** Item Z2's certificate does not
   move; item Z5's coordinate does not move. Two REFUTED-row clauses and four
   sentences change.
4. **This pass reproduces the pairing design rather than auditing it from
   outside.** The record null's exact regime below 1e7 consumes a different
   number of draws under each law, so "paired index by index" is exact in the
   block regime (one draw per fixed `dln = 0.005` step) and approximate below
   1e7. That is a property of the design this file copied, and it is small: the
   window starts at 1e4 and almost every in-window record is in the block
   regime.

**What survives.** [VERIFIED, exact arithmetic] Note (a)'s central object is
right. `D*` is confirmed exactly at 299 of 376 anchors, both arms, both decades,
with **0 contradictions and 0 unresolved**, by a BigInt rational two-phase
simplex written here from the note's own definition. Note (a)'s section 7 lists
"an exact re-run of any single new anchor with the old BigInt simplex was not
performed" as a defect; that defect is now discharged for 299 anchors. The
43-anchor, 172-figure custody gate is stronger than the note claims: this pass
does not reproduce the old table, it **re-derives all 172 figures from the
arithmetic**, with 0 disagreements, so the 2007-vintage engine behind
`attack-parity-adversary-01.js` is confirmed as well. The hand-copied `OLD`
array inside note (a)'s producer matches the old producer's embedded OUTPUT at
all 215 figures.

[MEASURED] Note (b)'s sieve is right. An independent 30-wheel segmented sieve
to 1e11 returns the **same seven decade gap counts to the unit**, the same
`CV^2` to four decimals (0.7276 … 0.9295), the same far-tail slopes to four
decimals (1.0829, 1.1834, 1.0935, 1.0661, 1.0649, 1.0638) and the same `u_last`.
The counts also match the published `pi_2(10^k)` exactly, with the top decade
short by exactly one gap because the sieve stops at 1e11 — an external custody
check note (b) does not run and now passes. Rebuilding the record null with a
different generator returns `d b_z = 1.0375` and `1.0818` against note (b)'s
`1.0370` and `1.0806`.

**What does not survive as written.** Four sentences, and two clauses of
`REFUTED.md` row 95. The largest is a coordinate error that has propagated into
the live layer: the null's **0.025** is the difference in the **ln Q** slope,
not in the width law, and it is quoted as the width law's agreement in note (a)
section 6, in note (a)'s ledger verdict, in `REFUTED.md` row 95 and in
`TODO.md` item Z5. The width-law difference on the same 84 matched anchors is
**0.031**. The correction does not weaken the conclusion — the null still
reproduces the width law — but the sentence names the wrong coordinate, and the
whole point of the note is that the coordinate is the finding.

**Rulings the brief asked for.**

- **REFUTED row 95 stands as a closure, with two clauses reworded** (section 8).
  The CLOSED verdict rests on kill clause (b), and clause (b) is better
  supported than note (a) presents it: the paired standard error of the
  true-minus-null ln Q slope difference is **0.0401** on 84 matched decade-1
  anchors, so the registered band of 0.15 is about 3.7 paired standard errors
  wide and a real difference of 0.15 would have been seen. Two clauses must
  change: the "width law within 0.025" attribution, and the flat statement of a
  mechanism that note (a) itself grades HEURISTIC and not derived.
- **The score 5 HIT / 1 MISS is blind enough to carry the closure, but not
  every item is equally blind** (section 3). Decade 1 is blind on 227 of 250
  (90.8 per cent), and kill clause (b) lives entirely on decade-1 matched
  anchors. Decade 2 is blind on 18 of 21 and its population was fixed by a
  post-seal edit to the sampling rule, so P5, P6's operative clause and kill
  clause (a) are not blind in the same sense. The closure does not depend on
  them.
- **TODO Z5's new title, "b is the twin-prime gap law at height, measured and
  not derived", is supported** (section 7), with one number added: the resolved
  part of the law — everything at `u <= 14.70`, with the tail above continued
  at slope 1, i.e. with no lightness at all beyond the last measured point —
  carries **72 per cent** of the residual on its own. The remaining 28 per cent
  of the published effect is the extrapolation.

---

## 1. Claims table

Every row: the claim as its file writes it, what independent code returns, the
grade, and the sentence that should replace it. Line numbers are of 2026-08-30.

| # | claim, quoted, with file:line | this pass | grade | replacement |
|---|---|---|---|---|
| 1 | `attack-0829n-parity-dstar.md:45` "172 integer figures of the old OUTPUT reproduced, 0 failures" | all 172 figures **re-derived** in exact rational arithmetic at all 43 anchors, 0 disagreements; and the producer's hand-copied `OLD` array matches the old OUTPUT at 215 of 215 figures | **STANDS**, strengthened | "172 integer figures of the old OUTPUT reproduced, 0 failures; independently re-derived in exact rational arithmetic on 2026-08-30, 0 disagreements (`redteam-0830-records.js` S2b), so the old engine is gated too" |
| 2 | `attack-0829n-parity-dstar.md:380` (§7) "an exact re-run of any single new anchor with the old BigInt simplex was not performed" | exact re-run performed at **299 of 376** anchors, both arms, both decades: D\* confirmed, 0 contradicted, 0 unresolved; 77 skipped for LP size | **STANDS as written on 2026-08-29; now discharged** | "an exact re-run was performed on 2026-08-30 at 299 of 376 anchors with 0 contradictions; the 77 widest stretches remain unchecked" |
| 3 | `attack-0829n-parity-dstar.md:239` "the threshold sits in a gap of at least 0.25 at every anchor" | true on the true arm; on the **N-thin null arm** the exact gap falls to **0.1212** (note (a)'s own table prints `m*(below) = 0.879` at the null anchor Q = 293) | **WEAKENED**: the scope word is wrong | "the threshold sits in a gap of at least 0.25 at every TRUE-ARITHMETIC anchor; on the null arm the smallest gap is 0.121, at Q = 293" |
| 4 | `attack-0829n-parity-dstar.md:8, 338`; `REFUTED.md:95`; `TODO.md` Z5 — "the independent-thinning null reproduces the width law within 0.025 in slope" | 0.025 is `|c1(null) − c1(true)|`, the **ln Q** slope, on 84 matched decade-1 anchors; the **width-law** difference on the same anchors is **0.031** (true 1.0765 ± 0.0207, null 1.1075 ± 0.0214) | **REFUTED as worded**, conclusion unaffected | "the independent-thinning null reproduces the ln Q slope within 0.025 and the width-law slope within 0.031 on 84 matched decade-1 anchors" |
| 5 | `attack-0829n-parity-dstar.md:290` "There is a law in the interval length, and it is close to proportionality … slope 1.097 ± 0.012" | reproduced exactly by independent regression code (1.097 ± 0.012 textbook, **0.016 HC1**); but over the range's own span of `ln width` (6.82 to 10.29) the power fit and `D* ∝ width·(ln width)^k` differ in residual sum of squares by **2.4 per cent** | **WEAKENED** on the exponent, not on the law | "D\*/width rises slowly with width; a single exponent 1.097 ± 0.012 fits, and so does width times a power of ln width, with 2.4 per cent less residual — quote the ratio and its drift, not an exponent (cf. `REFUTED.md` row 83)" |
| 6 | `attack-0829n-parity-dstar.md:258` "P6 c moves … c₀ 0.093 dec1→dec2, c₁ 0.628; SE 0.069 … HIT" | the old→decade-1 move is **0.013** on this pass's exact D\* and 0.028 on the note's own table, both below the 0.069 bar; only the decade-2 clauses clear it, and §5 attributes that same collapse to the gap-selected sampler when it discounts kill clause (a) | **WEAKENED**: P6 and the clause-(a) discount rest on one number | "P6 HIT, carried entirely by the decade-2 collapse; the same collapse is attributed to the sampler in §5, so P6 adds no information the control has not already discounted" |
| 7 | `attack-0829n-parity-dstar.md:61` "blind on roughly 230 of 250 anchors and the decade-2 fits as blind on 16 of 21" | decade 1: 23 anchors seen (18-anchor development pass ∪ 6 disclosed) → blind on **227**; decade 2: 3 of the 11 disclosed are decade-2 anchors → blind on **18 of 21** | **WEAKENED** (decade 1 by 3 anchors), conservative on decade 2 | "blind on 227 of 250 decade-1 anchors and 18 of 21 decade-2 anchors" |
| 8 | `attack-0829n-parity-dstar.md:123-132` the post-seal "deviation … whose motive was compute" | the edit (CMAX 8000 → 6000, applied to both decades) **selects the decade-2 population**, and it was made with 11 anchors seen; every decade-2 reading therefore sits on a post-seal population, 14 per cent of it seen | **WEAKENED**, disclosure incomplete | add: "the deviation changes which anchors decade 2 contains, so P5, P6's operative clause and kill clause (a) are scored on a population fixed after the seal; the closure rests on clause (b), which is decade-1 matched" |
| 9 | `attack-0829n-parity-dstar.md:256, 266` P4 HIT and "the closure stands on (b) alone" | the paired standard error of the true-minus-null ln Q slope on the 84 matched decade-1 anchors is **0.0401**, 95% interval [−0.104, 0.053]; the band was 0.15 | **STANDS**, and is better powered than the note's own presentation (which quotes unpaired SEs of 0.065 and 0.068) | "P4 HIT: the matched difference is 0.025 with a paired standard error of 0.040, so the 0.15 band would have caught a real separation of its own size" |
| 10 | `attack-0829n-parity-dstar.md:344` mechanism, "[HEURISTIC, not derived]", restated flatly in `REFUTED.md:95` as "D\* is where a modulus first reads a single position of the window" | unchanged as mathematics; the registry drops the calibration the note carries | **WEAKENED** in `REFUTED.md`, correct in the note | row 95: "…and the heuristic offered for it, that D\* is where a modulus first reads a single position of the window, is the wall survey's remainder statement in the stretch coordinate and is not derived" |
| 11 | `attack-0830-record-mechanism.md:562-568` (§3b table): seven decade gap counts, `CV^2`, far-tail slopes, `u_last` | independent 30-wheel sieve to 1e11: **all seven counts identical to the unit**, `CV^2` and slopes identical to four decimals, and the counts match published `pi_2(10^k)` with the top decade short by exactly 1 | **STANDS** | unchanged; add "independently re-sieved 2026-08-30 and checked against `pi_2(10^k)`" |
| 12 | `attack-0830-record-mechanism.md:8, 337` "d b_z = 1.0370 and 1.0806 +- 0.0014 against 1.0833" | reproduced with a different generator: **1.0375** and **1.0818** on 600 replicates; but ±0.0014 is the Monte Carlo pairing error of one **fixed** law | **WEAKENED** on the error bar | "d b_z = 1.0370 and 1.0806, Monte Carlo pairing error ±0.0014; the law's own far-tail slope carries the dominant uncertainty and is not in that ± — ±0.02 in slope moves d b_z by ±0.09, and the slope's spread across decades is 0.12" |
| 13 | `attack-0830-record-mechanism.md:33` "fed into the record null with no parameter" | above `u_last` the law is exactly `u = u_last + (v − w_last)/slope`, one fitted number; continuing at slope 1 instead (no lightness beyond the last measured point) still gives **d b_z = 0.7752**, 72 per cent of the residual | **WEAKENED**: "no parameter" is false, the effect is mostly measured | "fed into the record null with one fitted parameter, the far-tail slope; 72 per cent of the residual is carried by the resolved range alone and 28 per cent by the extrapolation" |
| 14 | `attack-0830-record-mechanism.md:337` "All eleven registered bands held" with `2f`'s kill rule | with `b_z = 1.2981` and the published null at 0.2147, the kill fires only below `d b_z = 0.4343`; the flagship band's floor is **0.5**, so no in-band outcome could have fired the kill | **WEAKENED**: the kill rule was not independent of the bands | "all eleven bands held, and the flagship band's floor of 0.5 sits above the kill rule's own threshold of 0.434, so the kill rule could not have fired on any in-band result" |
| 15 | `attack-0830-record-mechanism.md:358` "about 2 sd below … scaling 0.2336 by sqrt(72/17) gives about 0.48" | measured per-band ensemble sd for the extension law's top band is **0.481**; the data sit at **z = −2.14** there and **+1.36** in `[1e8,1e11)` | **STANDS**; the guessed sigma is accurate | "the top band sits 2.1 measured ensemble sd below the transported law (band sigma 0.481, measured, not scaled)" |
| 16 | `attack-0830-record-mechanism.md:433` "the size is NOT computable from `Var/E`… 1.0573 against 0.6223" | reproduced: gamma **1.0585**, shifted exponential **0.6226** at the same `CV^2 = 0.93` | **STANDS** | unchanged |
| 17 | `attack-0830-record-mechanism.md:470` "every law is mean-normalised" | `E[U(V)]` for the two height laws as fed to the null is **0.999837** and **0.999746**; the induced bias in `d b_z` is about 0.004 | **STANDS** | unchanged |
| 18 | `attack-0830-record-mechanism.md:53, 3b` "`a_c/abar` tracks the measured `CV^2` to within 0.04 at all seven decades" | reproduced on this file's sieve: −0.0398, −0.0116, −0.0150, +0.0102, +0.0126, +0.0140, +0.0164 | **STANDS** | unchanged |
| 19 | `attack-0830-record-mechanism.md` §7 "the `[4,12]` slope agrees with `1/CV^2` to 0.012" | 1/0.9295 = **1.0758** against slope **1.0638**, difference **0.0120** | **STANDS** | unchanged |
| 20 | `attack-0829n-parity-dstar.md:311` "T_null/T = 1.259 … whose limit is 4·e^{−2γ}" | 4e^{−2γ} = **1.2609**; matched-anchor ratio on this pass's verified subset 1.2527 | **STANDS** | unchanged |

---

## 2. D\* in exact rational arithmetic [VERIFIED, producer S2 and S2b]

**The definition, unchanged.** For an anchor `Q` with `Q'` the next prime, the
channel positions of the stretch `[Q², Q'²)` fall into signature classes, and
for every squarefree `d | P(Q)` with `1 < d <= D` and `|A_d| > 0` the LP asks
for `min Σ_{twin} ν` subject to `Σ_{a ∈ A_d} ν(a) = |A_d|` and `Σ_a ν(a) = C`,
`ν >= 0`. Positions with the same signature set are interchangeable in every
constraint, so the LP collapses onto the classes without loss; this pass builds
the signatures by trial division of `a` and `a+2` rather than by striding
multiples, enumerates the moduli itself, applies the presolve (a row with one
unknown fixes it; a row with residual 0 fixes its unknowns at 0 — exact
implications over non-negative variables, not heuristics) and solves what is
left with a two-phase simplex over BigInt fractions.

**Why two LPs settle D\* completely.** `m*` is monotone non-decreasing in `D`,
because raising `D` only adds constraints. So `m*(D*) >= 1` together with
`m*(d_prev) < 1` at the modulus immediately below `D*` in the sorted list is a
complete proof of `D*`, and there is no need to bisect. Both are solved
exactly at every attempted anchor.

**Result.** 299 of 376 anchors confirmed, **0 contradicted, 0 unresolved**, 77
not attempted because the live LP after presolve exceeds 420 rows. The exact
`m*(D*)` agrees with note (a)'s printed float value at every attempted anchor to
the printed precision; the exact values are rationals such as `13/6`, `62/33`,
`7/2`, which is what the printed 2.167, 1.879, 3.500 are.

**The one margin correction.** Note (a) §3 reads "max m\*(modulus below D\*) =
0.7500; the threshold sits in a gap of at least 0.25 at every anchor". Its own
producer's summary line scopes that to the true arithmetic. The exact smallest
gap over the 299 verified anchors is **0.1212**, and note (a)'s own per-anchor
table prints `m*(below) = 0.879` at the N-thin null anchor `Q = 293`. The null
arm is the arm kill clause (b) rests on. The margin claim is still comfortable
— 0.121 is not a floating-point tolerance — but "at every anchor" is not what
was measured.

**The 172-figure gate, re-derived.** Note (a) reproduces four integer columns of
`attack-parity-adversary-01.js` at 43 anchors with its float engine. This pass
computes those columns from scratch: `m*(Q)`, `m*(width)`, `m*(Q²)` and `D*`,
by exact bisection over the full modulus list at each anchor. **172 figures, 0
disagreements.** That gates the old producer as well as the new one, which the
original gate could not do.

---

## 3. The seal, the contamination, and what the score can carry [MEASURED, S4]

**Blindness, recomputed.** The producer's hard-coded `SEEN` set holds 9 anchors;
the note discloses 11 seen; the development pass over every 12th decade-1
anchor added 18 more. Distinct decade-1 anchors seen: **23**, so decade 1 is
blind on **227 of 250** (the note says "roughly 230"; it is 3 optimistic). Only
3 of the 11 disclosed anchors are decade-2 anchors, so decade 2 is blind on
**18 of 21** (the note says 16 of 21; it is conservative).

**The post-seal edit is the real exposure, and it is not the one the note
frames.** The sealed rule said "every prime" for decade 1 and `C <= 8000` for
decade 2; after the seal, with 11 anchors seen, it became `C <= 6000` for both.
The note prices this as a bias toward small width. It is also a **change of
population**: which primes become decade-2 anchors is decided by the cap. So
P5, the operative clause of P6 and kill clause (a) are scored on a set fixed
after the seal.

**Effective band widths.** P1 scores HIT if `c1 ± 1 SE` overlaps `[1.20, 1.60]`;
with `SE = 0.069` that admits any `c1` in `[1.131, 1.669]`, a window 0.538 wide
against a nominal 0.40. P6 gives three chances against one bar. P4's band of
0.15 is the one that is honestly calibrated: the paired standard error of the
difference it tests is 0.0401.

**Is the closure blind enough?** Yes, for the clause it rests on.
`attack-0829n-parity-dstar.md:268` says "the closure stands on (b) alone", and
(b) is P4, computed on 84 matched decade-1 anchors of which at most 23 were
seen and none was seen in its null arm. The headline "5 HIT / 1 MISS on a
sealed sheet" is the part that over-states: two of the six items live on a
post-seal population, and one of them (P6) is carried by a number the note
itself calls a sampler artefact fifty lines later.

---

## 4. The width law, refitted [MEASURED, S3]

Independent regression code on note (a)'s complete per-anchor table (299 of
whose 376 D\* are confirmed exactly above) reproduces its summary lines
digit for digit: decade 1 `c0 = 1.257`, `c1 = 1.204 ± 0.069` rmse 0.644,
`c_w = 1.097 ± 0.012` rmse 0.163, `D*/w = 0.526`; decade 2 `c0 = 1.164`,
`c1 = 0.575 ± 0.134`, `c_w = 1.028 ± 0.061`.

Three things the note does not print.

1. **HC1.** The width fit's heteroscedasticity-consistent standard error is
   **0.016**, not 0.012, so the slope sits 6.0 robust standard errors above
   proportionality rather than 8.
2. **The exponent is not identified against a log factor.** Regressing
   `ln(D*/width)` on `ln width` gives `0.0968 ± 0.0120` with rmse 0.1634;
   regressing it on `ln ln width` gives `0.9063 ± 0.1062` with rmse 0.1615.
   The two one-parameter models differ by 2.4 per cent in residual sum of
   squares over a range of `ln width` spanning 6.82 to 10.29. A single
   exponent 1.097 should not be quoted as the law; this repository has already
   closed one route for exactly that error (`REFUTED.md` row 83, "H is a
   grid-dependent summary of a curve and no single exponent should be quoted").
3. **The estimator control does not reach the width fit.** `X3 = round(0.35
   width)` reproduces the through-origin drift, the Q-slope and the Q-scatter
   of `D*`, which is what discounts kill clause (a); on the width coordinate it
   returns `c_w = 1.0000` with rmse 0.0001. So reading 2's content is exactly
   two numbers: the residual scatter 0.163 and the excess 0.097 over
   proportionality. Neither is a structure, and both are what the note's own
   §6 says.

**P4 and the null arm.** On the 84 matched decade-1 anchors the paired ln Q
slope difference is `−0.0251 ± 0.0401`, 95 per cent interval `[−0.104, 0.053]`;
the width-slope difference is `−0.0310` (true `1.0765 ± 0.0207`, null
`1.1075 ± 0.0214`). Note (a) quotes unpaired standard errors of 0.065 and 0.068
for the two arms, which makes P4 look weaker than it is: the arms share `Q`,
`width` and `C`, so the paired error is 0.040 and the test resolves about 0.08.

---

## 5. The gap law at height, sieved again [MEASURED, S5]

An independent segmented sieve on the 30-wheel, marking by residue-class
strides rather than by modulus tests, to 1e11:

| decade | gaps here | note (b) | `pi_2` difference | `CV^2` here / note (b) | slope[4,12] here / note (b) |
|---|---|---|---|---|---|
| [1e4,1e5) | 1,019 | 1,019 | 0 | 0.7276 / 0.7276 | n/a |
| [1e5,1e6) | 6,945 | 6,945 | 0 | 0.8091 / 0.8091 | 1.0829 / 1.0829 |
| [1e6,1e7) | 50,811 | 50,811 | 0 | 0.8381 / 0.8381 | 1.1834 / 1.1834 |
| [1e7,1e8) | 381,332 | 381,332 | 0 | 0.8852 / 0.8852 | 1.0935 / 1.0935 |
| [1e8,1e9) | 2,984,194 | 2,984,194 | 0 | 0.9037 / 0.9037 | 1.0661 / 1.0661 |
| [1e9,1e10) | 23,988,173 | 23,988,173 | 0 | 0.9173 / 0.9173 | 1.0649 / 1.0649 |
| [1e10,1e11) | 196,963,368 | 196,963,368 | 1 | 0.9295 / 0.9295 | 1.0638 / 1.0638 |

The `pi_2` column is the published twin-prime counting function differenced
across decades; it is 0 everywhere and 1 at the top only because the sieve stops
at 1e11 and the last gap there is not closed. That check is external to both
corpora and note (b) does not run it. It passes.

The far-tail slope is a **fitted** number and note (b) prints it without an
uncertainty. Its OLS standard error on nested tail points understates the truth
because the points are cumulative, so the honest measure is its movement across
stated fit windows. On the extension decade, over `[4,8]`, `[4,10]`, `[4,12]`,
`[5,11]`, `[6,12]` and `[8,12]`, the slope spans 1.0560 to 1.0733, a range of
**0.0174**; across the six decades that resolve a slope at all it moves by
**0.1196** (1.1834 at `[1e6,1e7)` down to 1.0638 at the top). Over the top
three decades it is stable to 0.002.

---

## 6. What the height law is in the record regime [MEASURED, S6 and S7]

Records sit at `u` of 15 to 35. The extension decade's law is resolved to
`u_last = 14.70` (tail count 31 there); everything above is
`u = u_last + (v − w_last)/slope`. So the record regime is governed by one
fitted number.

Three measurements price it.

1. **How much of the effect is measured.** Continuing the law at slope 1 above
   `u_last` — no lightness at all beyond the last resolved point — still gives
   `d b_z = 0.7752`, **72 per cent** of the residual. The extrapolation carries
   the other 28 per cent. This is the number that supports TODO Z5's title:
   the bulk of the effect is in the resolved range.
2. **How sensitive it is.** Moving the far-tail slope by ±0.02 — larger than
   the 0.0174 spread across the six fit windows on the same decade, smaller
   than the 0.1196 spread across decades — moves `d b_z` from **0.9888** to
   **1.1720**, 92 to 109 per cent of the residual. The measured sensitivity is
   4.58 in `d b_z` per unit of slope; the first-order formula
   `d(d b_z)/d(slope) = −L/slope²` gives 15.0 and overstates it by a factor
   3.3, because `w_last = 15.66` sits inside the record regime and most of a
   typical record is in the resolved range.
3. **Whether it is mean-matched.** `E[U(V)]` for the two height laws is
   0.999837 and 0.999746, so the mean-normalisation claim holds to 2.5e−4 and
   the induced bias in `d b_z` is about 0.004.

**Replication of the ensembles.** With a different generator (sfc32, not
mulberry32) and 600 replicates: exponential baseline `b_z = 0.2241 ± 0.2401`
(note (b): 0.2147 ± 0.2350), residual 1.0739 (note (b): 1.0833); gamma at
`CV^2 = 0.93` gives `d b_z = 1.0585` (note (b): 1.0573); shifted exponential
0.6226 (0.6223); the registered-decade height law 1.0375 (1.0370); the
extension-decade height law 1.0818 (1.0806). Every figure reproduces.

---

## 7. The bands, the kill rule, and the per-band sigma [MEASURED, S7 and S8]

**The kill rule could not fire.** Note (b) §2f kills the item if the candidates
with a derivation leave more than half of `b` unexplained. With
`b_z = 1.2981` and the published null carrying 0.2147, that needs the best
candidate's `d b_z` below **0.4343**. The flagship candidate's registered band
is `[0.5, 1.5]`; its floor is above the threshold. Four of the seven registered
bands have this property. So once the bands were written, an in-band result
could not fire the kill, and a HIT was compatible with the mechanism carrying
anywhere from 46 to 138 per cent of the residual. Note (b) says the bands are
wide; what this adds is that their width is not independent of the rule they
were scored against.

**The owed sigma, measured.** Note (b) §3d prints band means only and scales
0.2336 by `sqrt(72/17)` to guess 0.48. The measured ensemble sd of the top
band's own `b_z` under the extension law is **0.481**, so the guess was right.
The data then sit at

| band | `[1e4,1e8)` | `[1e8,1e11)` | `[1e11,1e14)` | `[1e14,8e16)` |
|---|---|---|---|---|
| data | 0.713 (n=16) | 1.816 (n=15) | 1.620 (n=24) | 0.937 (n=17) |
| extension height law | 0.461 ± 0.448 | 1.097 ± 0.528 | 1.577 ± 0.458 | 1.968 ± 0.481 |
| z of data | +0.56 | +1.36 | +0.09 | **−2.14** |

The top band's `−2.14` is note (b)'s open falsifier, now with a measured sigma
rather than a scaled guess, and it is the same size. It is not decisive on 17
records, and it is in the direction the note says.

**Shape.** `z_D` moves from −1.49 (exponential) to −0.98 (extension height
law); note (b) reads −1.64 to −0.97. The conclusion is unchanged: the shape
exposure is eased, not closed.

---

## 8. `REFUTED.md` row 95 and `TODO.md` Z5, as worded

**Row 95 stands as a closure.** The route "a law `D* ≈ Q^c` for the parity
adversary's killing level, as a candidate for unnamed structure at the wall" is
closed, and the closure rests on kill clause (b), which is well powered. Two
clauses need to change.

- Replace "the independent-thinning null reproduces the width law within 0.025
  in slope" with "the independent-thinning null reproduces the ln Q slope within
  0.025 and the width-law slope within 0.031 on 84 matched decade-1 anchors".
- Replace "D\* is where a modulus first reads a single position of the window,
  the wall survey's remainder statement in the stretch coordinate, and names
  nothing new" with "the heuristic offered for it, not derived, is that D\* is
  where a modulus first reads a single position of the window, which is the
  wall survey's remainder statement in the stretch coordinate and names nothing
  new". The note grades that paragraph HEURISTIC; the registry drops the grade.

Optionally, the row's parenthetical "(sealed prereg, 5 HIT 1 MISS)" is worth
narrowing to "(sealed prereg; closed on the null-agreement clause, blind on 227
of 250 decade-1 anchors)", because two of the six scored items sit on a
post-seal population.

**TODO Z5's title is supported.** "b is the twin-prime gap law at height,
measured and not derived" is exactly what this pass finds: the law is measured
to 1e11 on independent code, digit for digit; the resolved part of it carries
72 per cent of the residual with no extrapolation at all; and nothing in either
corpus derives why twin gaps at height are under-dispersed with a tail 6 per
cent steeper than exponential. The one word to watch is "the": the top height
band's `−2.14` says the transported law over-predicts `b` where the data are
thinnest, so "the gap law at height carries `b` in the low and middle bands and
over-predicts it at the top" is the safer form until there are more records.

---

## 9. Gate, defects, and what was not reached

**Producer.** `research/history/staging/redteam-0830-records.js`, embedded, four
hashed inputs. **Two `--force` embeds.** The artefact's
fingerprint carries one `forced` line, the second one; the first is on record
only here, which is itself a limit of the stamp. The first replaced a block after a prose correction in this file's
own S6: a sensitivity sentence carried figures from a `--quick` development run
and was wrong by a factor 3. The second replaced a block after a second prose
correction in S7: a sentence called ±0.02 "smaller than the spread across fit
windows" when the measured window spread is 0.0174. Both times the guard's own
report on the replaced block was that **every figure reproduced** (0 of 551 not
reproduced on the first force) and the difference was prose. No figure was lost
in either force. Recorded here because a red team that hides its own two forced
stamps has no standing to grade anyone else's.

**`node research/qc.js --full`** was run after the note and producer were
written. 251/251 numeric checks pass; the gate reports 8 findings, none of them
this pass's producer or note except the two that are structural: `TODO.md`
items **Z2** and **Z5** do not list `Q-redteam-0830-records` on their
`Ledger:` lines. That is the re-run guard firing exactly as designed, and it
can only be cleared by editing `TODO.md`, which this brief forbids; whoever
integrates this note owes those two `Ledger:` entries. The other six findings
belong to notes landed by other agents in the same window
(`redteam-0830-rml.js` has lost its embed binding; five more `ledger-todo-unlisted`
rows for `Q-redteam-0830-doubling`, `-floor-sign`, `-rml`, `-slack`). Neither
this note's producer nor its embed appears anywhere in the findings, and
`node research/qc/embed.js --check` on the producer returns code-sha256,
out-sha256, body and all four inputs matching — the pasted block is
bit-honest.

**Defects of this pass, in order of size.**

- **77 of 376 anchors unchecked** (section 0, caveat 1), the widest ones, and
  decade 2 is the worst covered.
- **The presolve is shared logic.** It is exact implication, but it is the same
  reduction note (a) uses, so a bug in the *idea* of the presolve would be
  invisible to both. What is genuinely independent is the LP solve, the
  signature construction, the modulus enumeration and the arithmetic.
- **The null arm's draws are note (a)'s draws.** Comparing `D*` per anchor is
  impossible otherwise. This checks the LP on null data, not the generator.
- **The record null's design is copied, not audited.** Caveat 4.
- **600 replicates, not 2,000**, and one generator family.
- **No prior-art search was performed.** Nothing here is claimed as novel.
- **Not reached:** an exact re-derivation at the 77 skipped anchors (a sparse
  exact LP, or an exact certificate check seeded from a float basis, would do
  it); a sieve to 1e12, which note (b) prices at about two hours and which
  would push `u_last` to about 19 and cut the extrapolated 28 per cent; and any
  statement about whether `CV^2 → 1`.

---

*History layer: process record, staging. Producer and custody:
`research/history/staging/redteam-0830-records.js`, embedded. Cited, never
recomputed: `REFUTED.md` row 95 and `TODO.md` item Z5 as they read on
2026-08-30. HELD.*
