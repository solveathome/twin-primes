# Red team, 2026-08-30: the doubling bridge and the doubling kill-run, re-derived on independent code — every number reproduces, both proofs hold, two sentences carry the wrong label, and a fifteenth step exists

<!-- ledger
id: Q-redteam-0830-doubling
status: ANSWERED
todo: D
question: Do attack-0829n-doubling-bridge.md and attack-0830-doubling-killrun.md survive an adversarial re-derivation on an engine sharing nothing with their producers, and do REFUTED rows 94 and 98 stand as worded?
verdict: The mathematics survives: the maxsum certificate Ghat(2s) <= maxsum_{K*+1}(T_s) and the product composition K*+1 <= prod(1+L_j) are each re-derived here and hold, the second at 21,641,346 nesting links over 6,012,804 killed runs with zero failures including the zero-kill fold, and every quoted figure reproduces digit for digit on a fresh engine (K*(16) = 17; G2(31#) = 348 @ 8813641451 x4 from both base tiles; sup msc 6.6364; the diagonal cells; the 2^N ratios 1.226/1.481/41.348). Row 94 STANDS and is if anything under-claimed, but its attribution is wrong in one direction: Lemma 1 at s = 128 alone clears the whole band, so the s = 16 walk corroborates rather than carries it. One statement is falsified: the bridge note's NOT-REACHED line puts 19#->37# out of reach, but column-major it returns here, reproducing the ladder row x = 37 and adding a FIFTEENTH step at s = 19, 20 (K* = 13, N = 4, C2 3.5200, certificate 3.8000), so the enumerable range ends at s = 20, not s = 18. Row 98 STANDS on its mathematics and is WEAKENED on one clause: "the truth sits under it everywhere (sup w/a = 0.8295)" attaches the CERTIFICATE's ratio to the word truth; the truth's sup is 0.6591.
-->

*(2026-08-30. Staging note, HELD. Adversarial pass commissioned under the
standing one-pass review debt against `attack-0829n-doubling-bridge.md` and
`attack-0830-doubling-killrun.md`, both HELD, and the two REFUTED rows built on
them. No existing file was edited; no git command was run; the publication
moratorium is respected. House method: refuted-until-re-derived, format per
`redteam-0829-theorem1.md` §0 and `redteam-0828-quadpoint.md` §0. Companion
producer, formally embedded:
`research/history/staging/redteam-0830-doubling.js` (181.9 s;
`code-sha256 f5d39eb6…`, `out-sha256 d04a0299…`, 219 body lines; `--check`
passes bit-honest; self-test failures 0). One forced stamp, on this pass's own
extension: the fifteenth step (§K) was added after the first embed, and the
guard's own report on the replaced block is `0 of 231 figures not reproduced`,
so nothing that stood changed. Calibration per `CLAUDE.md`. Nothing
here opens a route, closes a route, or moves the wall.)*

---

## 0. VERDICT

**Three caveats, before the confirmations.**

1. **A red team that reproduces is weak evidence about the OPEN part, and the
   open part is all of it.** Both notes are about a per-step inequality on
   fourteen enumerable steps and about what happens past them. `(D8)`, `(M8)`
   and `(R)` are untouched at every `s > 20` in both directions after this
   pass; the only thing that moved is that the enumerable range now carries
   fifteen points rather than fourteen, and the fifteenth agrees with the
   picture. What I checked is that those points and the two proofs are what the
   notes say they are.
2. **My engine and theirs share the corpus's ladder.** The two ladder keepers
   (`exact-g2-ladder.js`, `import-interp-01-bgt-defect.js`) are parsed by both
   passes, so an error inside the ladder itself would not be caught here. What
   is independent is everything downstream: tiles, sweeps, `K*`, `G₂` at 29#
   and 31#, `maxsum`, per-fold `L`, the composition. The 29# and 31# rows are
   re-derived and then compared to the ladder, not read from it.
3. **The `s = 64` rung of the killrun note's floor argument is
   literature-grade, and REFUTED row 98 does not say so.** `Ĝ(64) = G₂(61#) =
   1080` is OEIS A144311 `a(18)`, Wang 2024 (`PRIOR-ART.md` line 465), not the
   corpus-exact ladder, which stops at 43#. The note's §3 flags it correctly;
   the row does not.

**The ruling, per note.**

> **`attack-0829n-doubling-bridge.md`: SURVIVES.** Every figure reproduces on a
> column-major engine that shares no line with its producer: `K*(16) = 17`,
> `G₂(31#) = 348 @ 8813641451 (×4)` with census `6226553025` from **both** base
> tiles, the fourteen-step certificate list, `K*/N` 1.00 to 3.40, the sandwich
> at 14 of 14, `sup msc = 6.6364` at `s = 16`, `ρ = 1.147` on the record
> window, 15 strikes on its 14 slots, and the Cesàro identity at `k = 5`. The
> maxsum certificate's proof re-derives with no hypothesis; **PROVEN** is the
> right grade. Two wording defects, neither structural: the closure is
> attributed half to the exact walk when Lemma 1 at `s = 128` clears the whole
> band alone, and "the legal band `[4, 19.2455)`" is the trap-free band, not
> the achievable one, which starts at `5.2727` because the all-`s` form is
> bounded below by the sup of the exact table. One of its NOT-REACHED lines is
> **REFUTED**: 19#→37# is reachable, it returns on this engine, it reproduces
> the ladder row `x = 37` (`528 @ 544899485411 (×2)`, census
> `217929355875`), and it gives a fifteenth step at `s = 19, 20` with
> `K* = 13`, `N = 4`, `C₂ = 3.5200` and certificate `3.8000`. `(M8)` therefore
> holds at fifteen steps, not fourteen; the sup is still `6.6364` at `s = 16`;
> and `K*/N` reads `3.25` at the new point against `3.40` at `s = 16`, so the
> "rising" reading of `K*/N` does not continue.
>
> **`attack-0830-doubling-killrun.md`: SURVIVES, and its central theorem
> survives a harder test than it ran.** The product composition
> `K*+1 ≤ ∏(1+L_j)` re-derives line by line; the nesting link
> `m_{j−1}+1 ≤ (m_j+1)(1+L_j)` holds at **21,641,346** links over **6,012,804**
> killed runs at three steps with **0** failures (777,600 + 13,634,136 +
> 7,229,610 links over 194,400 + 3,408,534 + 2,409,870 runs), and the zero-kill
> fold the brief asked about occurs on 190,980, 3,370,002 and 2,348,618 of
> those runs and is not an exception —
> it is the trivial case `m_{j−1} = m_j`, `L_j ≥ 0`. The `L_j` are the per-fold
> `L` of `prop-exact-fold-L.md`, not a different statistic: computed here by a
> third route (a residue-2-set scan chained across the column seam) they give
> the same diagonal cells `7:2 11:1 13:2 17:2 19:2 23:3 29:2 31:4`. The sum
> form is false at 7 of 14; the `2^N` floor beats `8Ĝ(s)` at rungs 16, 32, 64
> at ratios 1.226, 1.481, 41.348; the truth-gap ruling holds. One clause is
> mislabelled, in the REFUTED row rather than the note.
>
> **REFUTED row 94 STANDS as worded** (and under-claims: the certificate
> exceeds every constant, not only those below 19.2455). **REFUTED row 98
> STANDS on its mathematics and is WEAKENED on one clause**, "the truth sits
> under it everywhere (sup w/a = 0.8295)": `0.8295` is the certificate's ratio
> to the allowance, the truth's is `0.6591`.

Numbers below are quoted from the producer's embedded OUTPUT block
(`redteam-0830-doubling.js`, lines 670 to 887) or cited by file and line; none
is typed from a run.

---

## 1. The claims table

Grades: **STANDS** (an attempt to break it on independent code failed),
**WEAKENED** (true as mathematics, wrong or over-wide as written),
**REFUTED** (false). Line numbers are as the files stand today.

| # | claim, quoted, with file:line | what the independent re-derivation gives | grade | replacement sentence, where one is owed |
|---|---|---|---|---|
| 1 | `attack-0829n-doubling-bridge.md:100`: "`K*(16) = 17` (13#→31#, walked here for the first time…)" | A column-major sweep over the 6,678,671 columns of 1485 level-13 slots gives `K* = 17`, and a second, byte-per-slot implementation agrees wherever both fit. `K*` over the fourteen steps: 2 1 4 2 3 3 5 8 6 10 8 10 17 13 | **STANDS** | — |
| 2 | `attack-0829n-doubling-bridge.md` §5: "re-derive `G₂(29#) = 258 @ 1205437109 (×2)` and `G₂(31#) = 348 @ 8813641451 (×4)` … the 31# row by two independent base tiles" | Reproduced: 258 @ 1205437109 (×2) with census 214708725; 348 @ 8813641451 (×4) with census 6226553025, from base 13# **and** from base 17#, both against the ladder row. The record windows carry `k = 14` and `k = 9` killed level-`s` slots | **STANDS** | — |
| 3 | `attack-0829n-doubling-bridge.md:33`: the maxsum bridge "is a per-step theorem, stays under 8 at all fourteen enumerable steps with sup 6.6364 at `s = 16`" | Proof re-derived with no hypothesis (§2 below). Holds at 14 of 14; the certificate list is identical to the note's, digit for digit; sup 6.6364 at `s = 16`; `msc/C₂` 1.0000 to 1.3276, `(K*+1)/msc` 1.0000 to 3.2727 | **STANDS** | — |
| 4 | `attack-0829n-doubling-bridge.md:149`: the sandwich `maxsum_{N+1}(T_s) ≤ Ĝ(2s) ≤ maxsum_{K*+1}(T_s) ≤ (K*+1)·Ĝ(s)` | Both halves re-derived (the left one needs only that Lemma 1's construction is placeable on **any** `N` consecutive slots, and that a killed run of length `N` forces a span of at least `N+1` consecutive gaps). Holds at 14 of 14 | **STANDS** | — |
| 5 | `attack-0829n-doubling-bridge.md:107`: "Lemma 1 … gives `K*(s) ≥ N(s) := π(2s) − π(s)` whenever `D_s ≥ N`", used to reach ≥ 14 at `s = 64` and ≥ 24 at `s = 128` | `N(64) = 13`, `N(128) = 23`, so the certificate reads ≥ 14 and ≥ 24. The hypothesis `D_s ≥ N` is met with room to spare at both (`D_s` is a product over all primes ≤ `s` of `p−2`). `N ≥ 8` first at `s = 34` (`N(33) = 7`), and `N ≥ 8` at every chain rung 64 to 1024 | **STANDS** | — |
| 6 | `attack-0829n-doubling-bridge.md:258`: "the K*-product bridge is CLOSED at every `C₂ < 19.2455` (by exact data at `s = 16` for `C₂ < 18`, by Lemma 1 at `s = 128` for the rest)" | The conclusion is earned; the attribution is not. `N(128)+1 = 24 > 19.2455`, so **Lemma 1 at `s = 128` alone** kills every `C₂` in the band, including every `C₂ < 18`. And since `N(256), N(512), N(1024) = 43, 75, 137` the certificate exceeds **every** constant, not only those below 19.2455 | **WEAKENED** (attribution over-narrow in one direction and under-claimed in the other) | "The K*-product bridge is CLOSED at every constant `C₂` whatsoever, by Lemma 1 alone: `K*+1 ≥ π(2s) − π(s) + 1`, which reads 24 already at `s = 128`, past the whole band, and diverges with `s` by the prime number theorem. The exact `K*(16) = 17` is a second, independent witness at the rung that carries the sup, not the load-bearing one." |
| 7 | `attack-0829n-doubling-bridge.md:65`: "`C₂ = 8`, inside the legal band `[4, 19.2455)`" | `[4, 19.2455)` is the **trap-free** band (below 4 the slice would be TPC-implying, `attack-wrongdirection-audit.md` §3.3). It is not the achievable band: the all-`s` form forces `C₂ ≥ sup_s C₂(s) = 348/66 = 5.2727` on the exact table `s = 2..41`, which is what `G2-STATE.md` §3a records as `[5.2727, 19.2455)` | **WEAKENED** (two bands named as one) | "`C₂ = 8` sits in the trap-free band `[4, 19.2455)` and in the achievable band `[5.2727, 19.2455)` of `G2-STATE.md` §3a; the all-`s` quantifier forces the lower end up to the exact table's sup." |
| 8 | `attack-0829n-doubling-bridge.md` §4: the Cesàro identity, "checked at `k = 6`: `β(64) = 1.6795` both ways" | Reproduced: direct 1.6795, Cesàro mean 1.6795, agreeing to 1e-12 at `k = 5` (six terms, `Ĝ(2)` plus five ratios — the note's "`k = 6`" counts terms, its formula indexes `j = 1..k` with `k = 5`) | **STANDS** | — |
| 9 | `attack-0829n-doubling-bridge.md` §2: "five entering primes deliver 15 strikes on 14 slots inside the record window", and §3 step 4's "`ρ = 1.147` at `s = 16`" | Reproduced slot by slot: 15 (prime, slot) incidences on the 14 slots (strike pattern 11121111111111), and `348/(15·ḡ(13)) = 1.1473` | **STANDS** | — |
| 10 | `attack-0830-doubling-killrun.md:105`: "**Theorem (product composition) [PROVEN]** … `K + 1 ≤ ∏(1+L_j)`" | Proof re-derived line by line (§2). Instance-checked far past the note's test: 0 failures over 777,600 + 13,634,136 + 7,229,610 nesting links at 7#→19#, 11#→23# and 13#→23#, covering **every** maximal killed run in those three periods, not only the longest, and `K+1 ≤ M` at every one of them | **STANDS** | — |
| 11 | `attack-0830-doubling-killrun.md` §2: the nesting chain, and the brief's question whether it is valid "when a fold kills zero slots on the run" | Valid, and trivially so: zero kills means `m_{j−1} = m_j` and the link reads `m_j+1 ≤ (m_j+1)(1+L_j)`, true for any `L_j ≥ 0`. Not a hypothetical: the case fires on 190,980, 3,370,002 and 2,348,618 runs at the three tested steps, with 0 link failures | **STANDS** | — |
| 12 | `attack-0830-doubling-killrun.md` §2: "the `L_j` … are the diagonal cells of `a3-05-bound-L.md` §4's table, `7:2 11:1 13:2 17:2 19:2 23:3 29:2 31:4`" | Same statistic, recomputed by a third route (for each column the killed set is a residue 2-set `{u, u−2}`, so `L` is a max of `q` linear scans chained across the column seam): identical cells, with `L(T_29, 31) = 4` obtained by streaming the 214,708,725 slots of `T_29` rather than materialising them. `L_j ≥ 1` at all ten folds | **STANDS** | — |
| 13 | `attack-0830-doubling-killrun.md:138`: "the sum form … is false on the data at seven of fourteen steps" | 7 of 14 exactly (3#→7#, 7#→19#, 11#→23#, 13#→23#, 13#→29#, 13#→31#, 17#→31#), and `maxsum_{1+ΣL_j}` falls below the truth at `s = 4` and `s = 10` | **STANDS** | — |
| 14 | `attack-0830-doubling-killrun.md:134`: "the composed certificate is never tighter than yesterday's maxsum certificate, at any `s`" | Follows from `K*+1 ≤ M` and monotonicity of `maxsum_m`; verified at 14 of 14 | **STANDS** | — |
| 15 | `attack-0830-doubling-killrun.md` §3: "That floor alone exceeds `8·Ĝ(s)` at `s = 16, 32, 64` by factors 1.226, 1.481 and 41.348" | Reproduced: 647.1 vs 528, 4122.9 vs 2784, 357249.1 vs 8640, ratios 1.226, 1.481, 41.348, with `ḡ` from the closed form `2∏_{3≤p≤x} p/(p−2)`. `maxsum_m ≥ m·ḡ` re-verified at 7 tiles to `m = 200` | **STANDS**, with the `s = 64` grade carried from the note into the row (§0 caveat 3) | — |
| 16 | `attack-0830-doubling-killrun.md:199`: "The crude count `N(s) > 3 + β₂ log₂ s` first holds at `s = 217`" | Arithmetic confirmed (216: 36 against 36.086; 217: 37 against 36.114) and it does not un-cross to `s = 3000`. But the ceiling it is paired with is `Ĝ(s) ≪_ε s^{β₂+ε}` with an unextracted implied constant (`G2-STATE.md` line 433), so 217 is not an effective threshold for the conclusion, only the crossing point of the count with the constant set to 1 and `ε = 0` | **WEAKENED** (as presented, not as arithmetic) | "The count `N(s) > 3 + β₂ log₂ s` first holds at `s = 217`; since the ceiling is `≪_ε` with no extracted constant, that figure locates the crossing rather than certifying a threshold, and the all-large-`s` claim rests on the limit, not on 217." |
| 17 | `attack-0830-doubling-killrun.md` §4: the kill check, "it is the Tail-Count Transport chain … the same chain fails at both ends of the index dial" | Consistent with `REFUTED.md` row 67 as worded there (a fixed index certifying 108/180/240/330 against a truth 66..258, with "the index must grow" priced as the cure) and with `attack-block-00-ADJUDICATION.md` attack 10 (an averaging recursion whose per-block target is exponent 2). Here no exponent is averaged and the per-step target stays `log₂ 8 = 3` | **STANDS** | — |
| 18 | `REFUTED.md:94`, the row as worded | Every clause checks: certificate 18 against 8 at `s = 16` where the truth is 5.2727; ≥ 14 at 64 and ≥ 24 at 128; the maxsum certificate surviving at sup 6.6364; the doubling target untouched | **STANDS** | — |
| 19 | `REFUTED.md:98`: "the composed certificate exceeds the allowance at 8 of 14 enumerable steps (20.83× at `s = 16`) while the truth sits under it everywhere (sup `w/a` = 0.8295)" | 8 of 14, first at `s = 9`, 20.830× at `s = 16`: all confirmed. But `w/a` is the ratio of the **certificate** `maxsum_{K*+1}/ḡ` to the allowance; its sup is 0.8295. The **truth's** ratio `w_true/a` has sup 0.6591. The row's own §1 in the note keeps them apart ("a margin of 17 percent … and the truth with a margin of 34 percent"); the row does not | **WEAKENED** (one clause mislabelled; the conclusion is unaffected, since `w_true ≤ w`) | "…while both the certificate and the truth stay under the allowance at every enumerable step, sup `w/a` = 0.8295 and sup `w_true/a` = 0.6591." |
| 21 | `attack-0829n-doubling-bridge.md` §7 NOT REACHED: "`K*` at 19#→37# and beyond needs walks over `D_19 = 378675` slots times four or more entering primes, hours in this engine rather than seconds" | Column-major the step is `23·29·31·37` columns of `D_19 = 378,675` slots and it returns inside a single `embed.js` run of the companion producer, under its 900 s timeout, alongside everything else in this note. It reproduces the ladder row `x = 37` exactly (`528 @ 544899485411`, ×2, census 217,929,355,875) and yields `K*(19) = 13`, `N = 4`, `k = 11`, `floor 1.8800`, `C₂ 3.5200`, `msc 3.8000`, `K*+1 = 14`. The sandwich holds; `(M8)` holds; `K* ≥ N`. So the enumerable range ends at `s = 20`, not `s = 18` | **REFUTED** as a statement about reach (true, as written, only of that engine) | "19#→37# is reachable column-major and is walked in `redteam-0830-doubling.js` §K; 19#→41# and 31#→61# are not. The enumerable range ends at `s = 20`." |
| 20 | `attack-0829n-doubling-bridge.js` custody, and its wall-clock columns on stdout | `embed.js --check` passes bit-honest on the bridge producer six days into the same repository state: `code-sha256`, `body`, `out-sha256` all match. Its walk table prints wall-clock seconds to stdout, which would make the tail machine-dependent, but `tailfmt.js`'s VOLATILE substitution `\d+(\.\d+)? s → TIME` normalises them before hashing (this is the volatile list, not `scrubSecsColumns`, whose scope needs a column literally headed `secs`). So the fingerprint reproduces — an attempted break that failed. The three wall figures quoted in the note's §5 prose are, correspondingly, not reproducible numbers | **STANDS** | — |

---

## 2. The two proofs, re-derived here

### 2a. The maxsum certificate `Ĝ(2s) ≤ maxsum_{K*+1}(T_s)` [PROVEN, re-derived]

Fix `s`, write `T_s` for the level-`s` slot set modulo `P(s)#` and `Q` for the
primes in `(s, 2s]`. A level-`2s` slot is a level-`s` slot surviving every
`q ∈ Q`, so the level-`2s` slots are a sub-sequence of the level-`s` slots.
Take two cyclically consecutive level-`2s` slots `a < b`. The level-`s` slots
strictly between them are `k ≥ 0` in number and every one of them is killed by
some `q ∈ Q`, so they form a run of `k` consecutive killed level-`s` slots and
`k ≤ K*(s)` by definition of `K*`. The distance `b − a` is the sum of the `k+1`
consecutive level-`s` gaps from `a` to `b`, hence at most `maxsum_{k+1}(T_s)`,
hence at most `maxsum_{K*+1}(T_s)` because `maxsum_m` is non-decreasing in `m`
(the gaps are positive). Taking the max over consecutive pairs gives the
certificate. ∎

Three things I looked for and did not find. (i) A degenerate case at `k = 0`:
the bound reads `Ĝ(2s) ≤ maxsum_1(T_s) = Ĝ(s)`, correct. (ii) A degenerate case
at `D_{2s} = 1`, where the single level-`2s` "gap" is the whole period: it
occurs at 2#→3#, and the certificate holds there with equality (`maxsum_3(T_2)
= 6 = G₂(3#)`). (iii) A wrap problem when `K*+1 > D_s`: the wrap convention
`maxsum_m = ⌊m/D⌋·P + maxsum_{m mod D}` keeps the inequality valid because the
window genuinely wraps whole periods. All three are exercised by the fourteen
steps and the sandwich holds at 14 of 14. The grade **PROVEN** in the bridge
note is right, and its scope — per step, no statement about `sup_s` — is stated
correctly there.

### 2b. The product composition `K*+1 ≤ ∏(1+L_j)` [PROVEN, re-derived]

Order `Q = {q_1 < … < q_N}`, fold in that order, and let `R` be a run of `K`
consecutive level-`s` slots all killed by `Q`. Let `m_j` be the number of slots
of `R` still alive after `q_1, …, q_j`, so `m_0 = K` and `m_N = 0`.

The `m_{j−1}` survivors of `q_1..q_{j−1}` inside `R` are **consecutive** slots
of the intermediate tile `T^(j−1)`: any `T^(j−1)` slot lying between two of
them is a level-`s` slot inside `R` that survived `q_1..q_{j−1}`, so it is one
of them. Among these `m_{j−1}` consecutive `T^(j−1)` slots, the `m_j` survivors
of `q_j` cut the killed ones into at most `m_j + 1` maximal stretches, each a
run of consecutive `T^(j−1)` slots killed by `q_j` and therefore of length at
most `L_j`. So `m_{j−1} ≤ m_j + (m_j+1)L_j`, that is
`m_{j−1} + 1 ≤ (m_j + 1)(1 + L_j)`. Multiplying from `j = N` down to `j = 1`
and using `m_N + 1 = 1` gives `K + 1 ≤ ∏_j (1 + L_j)`. ∎

The two edge cases the brief named:

- **A fold that kills nothing on the run.** Then `m_{j−1} = m_j` and the link
  reads `m_j + 1 ≤ (m_j + 1)(1 + L_j)`, true for every `L_j ≥ 0`. The nesting
  chain does not need a kill at each step; it needs only that the survivors
  stay consecutive, which they do. This is not a corner: on the three steps
  swept slot by slot the case fires on 190,980 of 194,400 runs, 3,370,002 of
  3,408,534, and 2,348,618 of 2,409,870, and no link fails at any of the
  777,600 + 13,634,136 + 7,229,610 links.
- **A fold that kills everything remaining** (`m_j = 0`). Then the killed slots
  form one stretch, `m_{j−1} ≤ L_j`, and the link reads `m_{j−1}+1 ≤ 1+L_j`.
  Also fine, and this is the last link of the chain at every step.

**Are the `L_j` the per-fold `L` of `prop-exact-fold-L.md`?** Yes. That note's
`L(T, q)` is the longest run of consecutive `T`-slots killed by `q`, scanned on
the big tile of period `P·q` rather than on one copy. My producer computes the
same object through a different door: in the copy with index `j ≡ c (mod q)`
the slots killed by `q` are exactly those whose residue mod `q` lies in
`{u, u−2}` with `u ≡ −c·P`, so `L` is the maximum over the `q` copies of a
linear scan, chained across the copy seam. The diagonal cells come out
`7:2 11:1 13:2 17:2 19:2 23:3 29:2 31:4`, the cells the killrun note quotes.
Nothing in either pass depends on `prop-exact-fold-L.md`'s alternation lemma,
which is graded PROPOSAL there; the killrun note says so and is right to.

### 2c. Why the composition cannot be repaired, checked in the same place

`L_j ≥ 1` for every fold, because the tile's period is coprime to `q_j`, so the
copies of any one slot meet every class mod `q_j` including 0. Hence
`M(s) ≥ 2^{N(s)}` in **every** fold order, and since
`maxsum_m(T_s) ≥ m·ḡ(s)` by averaging over the `D_s` cyclic starting positions,
the composed certificate is at least `2^N·ḡ(s)`. Against the allowance
`8·Ĝ(s)` that is 1.226, 1.481 and 41.348 at `s = 16, 32, 64`. The route is
closed for any per-fold statistic that is an upper bound on the true per-fold
run, which is what "closed as a route" should mean, and it is what the killrun
note claims.

---

## 3. The two REFUTED rows, as worded

**Row 94 (`REFUTED.md:94`) STANDS.** Every clause verifies. The only correction
owed is a strengthening plus an attribution fix, neither of which changes the
row's verdict: the certificate is dead at every constant, not only at those in
`[4, 19.2455)`, and Lemma 1 at `s = 128` alone does the whole job, so the exact
`K*(16) = 17` corroborates rather than carries it. If the row is ever
rewritten, the replacement sentence is claim 6's. **No route reopens.**

**Row 98 (`REFUTED.md:98`) STANDS on its mathematics, WEAKENED on one clause.**
The product composition, the `2^N` floor, the rung ratios, the 8-of-14 count,
the 20.83× at `s = 16`, and the Tail-Count-Transport identification all
verify. The clause "while the truth sits under it everywhere (sup `w/a` =
0.8295)" attaches the certificate's ratio to the word *truth*; the truth's
ratio has sup 0.6591 and the certificate's has sup 0.8295. The claim the row
makes is still true — `w_true ≤ w ≤ a` at every step — so the closure is
unaffected; only the number's label is wrong. Replacement sentence in claim 19.
The row should also carry the note's own grade on the `s = 64` rung: `Ĝ(64) =
1080` is OEIS A144311, not corpus-exact. **No route reopens.**

---

## 4. NOT REACHED, falsifiers, trap grading

**NOT REACHED.**

- `(D8)`, `(M8)` and `(R)` as statements. This pass adds no bound on `K*(s)`,
  on `ρ(s, m)`, or on `C₂(s)` for any `s` beyond the enumerable range, and no
  step of any argument. One extra data point is not an inequality.
- The reverse fold order at `s = 16` (the killrun note's `864` against `540`).
  Only 11#→23# was small enough to rebuild the non-diagonal intermediate tiles,
  where `72` against `108` reproduces with per-fold `L` of `1 2 2 3`. The
  `s = 16` reverse chain needs a tile of 415,103,535 slots and was not built;
  the note's conclusion does not depend on it, since no order can go below
  `K*+1` or `2^N`.
- Everything past `s = 20`, now that the fifteenth step is in (§K of the
  producer). The sixteenth, 19#→41#, multiplies the column count by 41 and was
  not attempted; 31#→61# stays out of reach by many orders of magnitude.
- The per-fold composition at the fifteenth step. It needs `L(T_31, 37)`, a
  stream over 6,226,553,025 slots, so §G stops at fourteen steps and the
  killrun note's tables are not extended.
- The ladder itself. Both passes read `G₂` for `x ≥ 37` from the same two
  keepers; an error inside those is invisible to this red team. The 29# and 31#
  rows are the only ones I re-derive.
- `prop-exact-fold-L.md`'s alternation lemma and its `3/2` constant: not
  re-derived, and not used by either producer for any number.

**One incidental, outside the two targets.** The ladder keeper
`research/import-interp-01-bgt-defect.js` lines 53 to 55 attributes "terms
15-22 (x = 47..79)" to "OEIS A144311 (Andrew Carter, 2008)", while
`research/PRIOR-ART.md` line 465 and `research/two-class-lower-bounds.md`
line 115 split the sequence three ways — Carter `a(1)-a(7)` 2008, Alekseyev
`a(8)-a(16)` 2009, Wang `a(17)-a(22)` 2024. The killrun note's "Wang's
literature-grade `G₂(61#) = 1080`" follows the finer attribution and is the
correct one; the keeper's comment is the loose one. Nothing computational
depends on it, and I did not edit the keeper.
- Whether a decomposition of a killed run **by killer rather than by fold**
  admits an additive law. The killrun note lists this as untried; it is still
  untried.

**What would falsify each ruling, and whether the check has run.**

| ruling | falsifier | has it run |
|---|---|---|
| `K*(16) = 17` | any independent sweep giving another value | yes: a column-major sweep of 6,678,671 columns, cross-checked against a byte-per-slot implementation at the eleven smaller steps |
| the maxsum certificate is a theorem | one step with `Ĝ(2s) > maxsum_{K*+1}(T_s)` | yes, 14 of 14, plus the three degenerate cases in §2a |
| the product composition is a theorem | one killed run with `K+1 > ∏(1+L_j)`, or one failing nesting link | yes: 0 failures over 21,641,346 links spanning every maximal killed run in three whole periods |
| the zero-kill fold does not break the chain | a run with `m_{j−1} = m_j` and a failing link | yes: the case fires on 5,909,600 runs across the three steps, 0 failures |
| row 94 stands | a `C₂` in the band the certificate does not exceed | yes: grid over `[4, 19.2455)`, none survives; and `N(s) → ∞` closes the rest |
| row 98's clause is mislabelled | `sup w_true/a = 0.8295` | no: `sup w_true/a = 0.6591`, `sup w/a = 0.8295` |
| the `2^N` floor beats the allowance at the rungs | arithmetic | yes, 1.226 / 1.481 / 41.348 |
| the bridge producer's embed is honest | `--check` disagreeing | no: `code-sha256`, `body` and `out-sha256` all match |
| the enumerable range ends at `s = 18` | one further step returning | yes: 19#→37# returns inside one producer run and reproduces the 37# ladder row |

**Trap grading.** `C₂ = 8 ≥ 4` throughout, and the all-`s` quantifier is kept
in every statement quoted or written here, per `attack-wrongdirection-audit.md`
§3.3. Nothing in this note derives or implies a constant below 4; the only
lower bounds used are on certificates and on runs (`K* ≥ N`, `M ≥ 2^N`,
`maxsum_m ≥ m·ḡ`), each of which closes a route and says nothing about `Ĝ` in
the TPC-relevant direction. This note proves nothing new about the doubling
inequality; it confirms two proofs, reproduces two tables, and corrects two
sentences.

---

## 5. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/history/staging/redteam-0830-doubling.js` | custody and the C₂ table (A), maxsum (B), the fourteen sweeps by two implementations (C), the sandwich (D), Lemma 1 and the band audit (E), the Cesàro identity (F), per-fold `L`, the product and the composed certificate (G), the `2^N` floor (H), the nesting chain on every killed run (I), the sup-step anatomy (J), the fifteenth step 19#→37# (K) |
| `research/history/staging/attack-0829n-doubling-bridge.md`, `.js` | the note under test, and the producer whose `--check` was re-run here |
| `research/history/staging/attack-0830-doubling-killrun.md`, `.js` | the second note under test |
| `research/REFUTED.md` lines 94, 98 | the two rows ruled on |
| `research/history/staging/hsubpow-explicit-K.md` §2b | Lemma 1 and its `D_y ≥ N` hypothesis, re-read at the record |
| `research/history/staging/attack-wrongdirection-audit.md` §3.3 | the all-`s` quantifier discipline and the trap window |
| `research/G2-STATE.md` §3a (line 433, and the doubling-window row) | the `≪_ε` ceiling with no extracted constant, and the achievable band `[5.2727, 19.2455)` |
| `research/REFUTED.md` line 67; `research/history/staging/attack-block-00-ADJUDICATION.md` attack 10 | the two closed chains the kill checks are run against |
| `research/exact-g2-ladder.js`, `research/import-interp-01-bgt-defect.js` | the two ladder keepers, parsed at run time by both passes |
| `paper/proposals/prop-exact-fold-L.md`; `research/a3-05-bound-L.md` §4 | the per-fold `L` and its diagonal table |

Reproduce with `node research/qc/embed.js --check --timeout 600
research/history/staging/redteam-0830-doubling.js` (about 70 s).
