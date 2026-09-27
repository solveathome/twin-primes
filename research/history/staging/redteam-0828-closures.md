# Red team 2026-08-28: the five closure notes, adversarial pass

<!-- ledger
id: Q-redteam-0828-closures
status: ANSWERED
todo: 10 (retired), 1c (retired), 1d, Z5b (retired), 0
question: Do the five 2026-08-28 closure notes stand, and do they stand for the reasons they give?
verdict: Three stand on corrected sentences (1d, Z5b, 0); one stands in half (10, the 1.074 counter-claim does not); one does not stand for its stated reason (1c, closed on a narrower window than the prior work's significant one, and its CLOSED has overwritten a PARTIAL in the generated index).
-->

*2026-08-28. Adversarial verifier, branch `opus-try`. Brief: break, before
integration, `hsubpow-explicit-K.md` (1d), `excess-chain-c.md` (10),
`c2prime-refit-22.md` (1c), `fold-ledger-forced.md` (Z5b),
`rho2-analytic-bound.md` (0). Method: refuted-until-rederived; every
load-bearing claim graded CONFIRMED / WEAKENED (with the corrected sentence)
/ REFUTED (with the counterexample or the failing line). Independent
re-derivations for 1d and 0 live in this pass's own producer,
`research/history/staging/redteam-0828-closures.js` (0.2 s, formal embed,
`--check` bit-honest, six numbered readings); those for 10, 1c and Z5b were
built in this session's scratchpad from independently reconstructed data and
independently coded estimators, sharing no code with the target producers.
`node research/qc/embed.js --check` was re-run on all five target scripts and
all five match. This file plus its producer are the pass's only repo writes.
No existing file was edited. No git command was run. `research/qc.js` was not
run. `natal-cap-33-overnight` was not re-run.*

*This note's ledger block names five TODO items. None of them carries
`Q-redteam-0828-closures` on its `Ledger:` line, because editing `TODO.md` is
outside this pass's fence. The gate will say so, correctly, until someone with
write access adds the id to items 0, 1c, 1d, 10 and Z5b.*

---

## 0. Verdict summary

**The most load-bearing correction, and it is a ledger correction rather than
a mathematical one:** `c2prime-refit-22.md` is graded `CLOSED` on TODO 1c, and
it shares the question id `Q-c2prime-drift` with `attack-c2drift-01.md`, whose
own block reads `PARTIAL`. `research/QUESTIONS.md` carries one status per id,
so the generated index now presents at lines 31 and 46 as settled a question
that `attack-c2drift-01.md` §3 explicitly left undecided (drift significant at
`p_logn = 0.0053` and `p_EV = 0.0075` on `x ≥ 17` against 4000-replicate nulls,
with candidates (i)′ finite-limit and (ii) polylog growth both alive). The new
note reaches its verdict on the shorter band `x ≥ 41`, `n = 10`, finds it
unresolvable there, and reports that as the answer, while printing the
resolved `x ≥ 17` figure `0.3351` in its own control block without naming what
the prior work concluded from it. That is window selection followed by closure
on the weaker window, and the `CLOSED` has propagated into the one file the
house rule says to read before briefing. Recommended status: `PARTIAL`.

Scoreboard, one line per note:

| note | TODO | does the closure stand? | for the reason it gives? |
|---|---|---|---|
| `hsubpow-explicit-K.md` | 1d | **YES.** Three mechanisms closed; the zone arithmetic reproduces digit for digit at both grades | **YES, on three corrected sentences** (§1) |
| `excess-chain-c.md` | 10 | **HALF.** "1.074 is not derivable from a compressed-tail max correction" stands; "c is 1.05, not 1.074" does not | **NO** for the counter-claim and the rms argument (§2) |
| `c2prime-refit-22.md` | 1c | **NO as `CLOSED`.** The refit half is done and correct; the mechanism half is where `attack-c2drift-01` left it | **NO** (§3) |
| `fold-ledger-forced.md` | Z5b | **YES.** Fifteen constraints, all proven, zero violations on all 1,226 rows | **YES, on five corrected sentences** (§4) |
| `rho2-analytic-bound.md` | 0 | **YES.** The premise-refutation and the constant both hold | **NO for §4's headline numbers** (§5) |

Detailed grades:

| # | claim | verdict |
|---|---|---|
| 1a | legal zone `[1.3946, 11.3568)` trusted, `[1.3555, 9.9082)` custody; sliver 0.0391; forfeit 3.7173; width 9.9622; traps 0.3913 / 0.3861 | **CONFIRMED**: all re-derived from a retyped ladder (R1) |
| 1b | Lemma 1, `K* ≥ π(y′) − π(y)`, three-line CRT | **CONFIRMED**: proof valid; holds at all eleven cited steps, `K*/N` 1.00..2.67 (R2) |
| 1c | "the floor breaks the cap at `y = 117` for `K = 1.3946`" | **REFUTED**: `y = 117` is the `K = 1.3555` row; `K = 1.3946` is `y = 122` (R2) |
| 1d | "`K*` is **not** sublinear" | **REFUTED as written**: `(b−1)y/ln y` is `o(y)`; what dies is boundedness (R2) |
| 1e | Lemma 2, defect finite iff `γ ≤ λ` | **WEAKENED**: the displayed proof line proves `≤` on the defect, not the `≥` in the statement |
| 1f | mechanism (c) IS `paper/beta2-note.md` | **CONFIRMED at source** |
| 1g | `θ_b` table and the `4.805 ln b ln y` growth law | **CONFIRMED**: every entry reproduces; `0.41621 = ½C₂·4e^{−2γ}` (R3) |
| 2a | Gumbel algebra `c(L;ν) = (b_n + γ/a_n)/√(2L)`; the sign argument | **CONFIRMED**: four sub-Gaussian families all lower `E[max]` |
| 2b | "the correction accounts for the small-k transient at `x = 7`" | **REFUTED**: it is the asymptotic's own 5.8% error at `n = 10.5` |
| 2c | log-rms 0.149 vs 0.115 as evidence | **REFUTED as an argument**: ΔAICc = 0.36, `F = 1.67` on (8,7) |
| 2d | "`c = 1.05 ± 0.06` flat over `x = 13..31`" | **WEAKENED**: the range is `17..31`, the ± is an sd, and 1.074 is not excluded |
| 2e | "better than 3% at six of eight levels" | **REFUTED**: five of eight |
| 2f | the `@31` read from cap-33 RUN 1 | **CONFIRMED as a read; WEAKENED on custody**: that tail is hand-pasted |
| 2g | cap-25 reading 5's "roughly offset" is wrong | **CONFIRMED**, and understated |
| 3a | all 22-term figures: 0.3745 ± 0.1411, 0.3344, 0.348 = 2.47×, 23 of 51 | **CONFIRMED**: reproduce to the printed digit |
| 3b | `c₂′` is a per-`x` ratio column, not a fit coefficient | **CONFIRMED** |
| 3c | the exponent-control §2/§4/§6 refit and §5's 08-21 citation | **CONFIRMED**; §4/§6 pre-refit figures live in the `.js`, not the `.md` |
| 3d | "the same verdict `attack-c2drift-01.md` §1 reached" | **REFUTED**: that file's §3 found the drift real and left two candidates alive |
| 3e | the 2.47× calibration | **WEAKENED**: not phase-matched; post-dip it is 1.84× and 41% |
| 3f | the ledger verdict line "gap 0.63 of the control's own sd" | **REFUTED**: 0.63 belongs to a different pair; the quoted gap is 0.0401 = 0.12 sd |
| 3g | the three advisory figures 0.279 / 1.880 / 4000 | **CONFIRMED**: all three trace to embedded artifacts |
| 4a | F1..F14 forced rather than expected | **CONFIRMED**: fifteen labelled, all proven, 0 violations on 1,226 rows |
| 4b | F7's `cum_added` short by 1,225 | **CONFIRMED as a mechanism**: 1,225 uncovered openers, one per gap, zero anomalous gaps |
| 4c | F1's "both sum to the same value" | **REFUTED**: 54 vs 60; the constraint survives on a corrected clause |
| 4d | F9's `q′/(q+q′)` fraction | **WEAKENED**: false at 51 of 293 folds; a two-integer overhang is missing |
| 4e | §0 "its share of the truth is falling band over band" | **REFUTED**: F12's band share rises 0.1500 → 0.4746 |
| 4f | "both monotone increasing" (four places, incl. the script's READINGS) | **REFUTED**: the sharpest-floor series dips at band 2 |
| 4g | the by_new bound and "forced max 5 vs measured 3" | **WEAKENED**: the interval step needs `q′` coprime to 30, unstated; 5 is a measured max |
| 4h | prefix-CRT shares 29.89 / 47.10 / 84.59% | **CONFIRMED**: one denominator, all three recomputed |
| 5a | `170.88 = (27/16)e^{8γ}`; FORM I ⇒ FORM I* | **CONFIRMED**: steps 1, 3, 4, 5 re-derived here; `81/48 = 27/16` (R4) |
| 5b | ratio bound/exact `3.213e+14` at `z = 47`; `log_z = 10.2054` | **CONFIRMED** (R4) |
| 5c | "the ABSOLUTE FLOOR (`C_L = 1` and `⟨ρ̃²⟩ = 1`)" | **REFUTED**: the cited column carries the measured `⟨ρ̃²⟩` (R5) |
| 5d | "misses by 1.474× @41, 5.000× @43, 15.346× @47" | **REFUTED for the absolute floor**: it clears at 41 and 43 and misses by 2.155× at 47 (R5) |
| 5e | Rosser–Schoenfeld quoted as `(1 + 1/(2 ln²x))`, "RS states `x > 1`" | **REFUTED in range**: false at `z = 109` and `z = 113` (R6) |
| 5f | "TODO 0's first move was already executed on 08-21" | **CONFIRMED**: `attack-rhoms-01.md` carries it |
| 5g | Chebyshev cannot reach RML; `e^{θ(z)/3}` beats every power | **CONFIRMED**: the mechanism is untouched by 5c/5d |

---

## 1. `hsubpow-explicit-K.md` (TODO 1d): CLOSED stands, on three corrected sentences

### 1.1 The trap window, which the brief asked to check with care: CONFIRMED

Re-derived in R1 from a ladder retyped here from OEIS A144311 and cross-checked
against `research/exact-g2-ladder.js` on all fourteen exact terms. The
quantifier argument is right: (H-sub-pow) is stated over all integer bases and
P2 concludes with an `inf` over all `n`, so a proven `K` is legal only if
`K ≥ max_b S(b)` and useful only if `K < max_b (β₂ ln b − f(b))`, and both are
argmaxes, not base 16's values. Every figure reproduces:

- trusted `[1.3946, 11.3568)`, argmaxes `b = 66` and `b = 82`, width 9.9622
- custody `[1.3555, 9.9082)`, argmaxes `b = 16` and `b = 46`
- `S(16) = 1.355523`, `β₂ ln 16 − ln 66 = 7.639457`
- TPC-implying sliver 0.0391 nats; forfeited legal room 3.7173 nats
- trusted trap `[1.0033, 1.3946)` width 0.3913; custody trap width 0.3861

The argmax bases are structurally right and not an artifact: `S` rises inside
each interval on which `P(n)` is constant, so the maximum in the `P = 61` block
sits at `n = 66` and in the `P = 79` block at `n = 82`. The floor rests on
`G₂(61#) = 1080` and the ceiling on `G₂(79#) = 1710`; both are checked in R0.

One reading hazard, not a defect. The note writes "no counterexample found over
the 111 reachable pairs, the power-pair sup defect is `1.0033`". 111 is the
unordered (H-sub) pair count `st ≤ 82`; (H-sub-pow) quantifies over 15 power
pairs. The same split explains an apparent cross-document conflict:
`redteam-0820-math.md` §1.2 gives the trap as `[1.0761, 1.3946)` and TODO 1d
gives `[1.0033, 1.3946)`. Both are right, since 1.0761 is the (H-sub) sup defect at
`(4,10)` and 1.0033 the (H-sub-pow) sup defect at `4²`, and neither document says
which hypothesis its number belongs to.

### 1.2 Lemma 1: CONFIRMED as a proof

The CRT argument is valid. Pick `N` consecutive level-`y` twin slots in
`[0,P)` (possible when `D_y ≥ N`), solve `n ≡ 0 (mod P)`, `n ≡ −s_i (mod q_i)`;
the moduli are pairwise coprime because every `q_i > y`. Then `n ≡ 0 (mod P)`
makes `n + s_1, …, n + s_N` consecutive level-`y` slots (the interval is shorter
than `P`), and `q_i | n + s_i` kills each. Since `K*` is a maximum over runs,
exhibiting one run lower-bounds it. Checked against all eleven cited doubling
certificates in R2: `K* ≥ π(2s) − π(s)` holds at every one, `K*/N` from 1.00 to
2.67, and `D_5 = 3 < N = 19` reproduces as the note's own small-`y` exception.

The closure this delivers is correctly scoped: it kills the *bound*
`Ĝ(y′) ≤ (K*+1)Ĝ(y)` as a source of a constant, not `Ĝ` itself.

### 1.3 Corrected sentence, §2c and the producer's READING 4: REFUTED as written

The producer's own SEC G prints four rows. `y = 117` is the `K = 1.3555` row;
the `K = 1.3946` row is `y = 122`. Both READING 4 and §2c quote 117 against
1.3946. Verified in R2 under the producer's own test (`N > cap`, not `N+1`).

> `gap:` unbounded, and quantitatively at `b = 16` the floor breaks the cap
> `66 e^K` at `y = 122` for `K = 1.3946` (chain rung 2), at `y = 117` for the
> custody floor `K = 1.3555` (also rung 2), at `y = 124,978` for `K = 7.6394`
> (rung 5) and at `y = 6,639,931` for `K = 11.3568` (rung 6).

The rung labels are unaffected: `⌈ln 117/ln 16⌉ = ⌈ln 122/ln 16⌉ = 2`. This is
the failure mode `embed.js` exists to stop, in the one form it cannot catch:
117 *is* in the block, on another row, so the figure-presence check passes.

### 1.4 Corrected sentence, §0 item 2 / §2c / SEC D: REFUTED as written

`K* ≥ π(by) − π(y) ~ (b−1)y/ln y` is `o(y)`, so Lemma 1 is consistent with
`K*` being sublinear in the level and refutes no such thing. What the route
needs, and what the note states correctly two lines earlier, is `K* + 1 ≤ e^K
Ĝ(b)`, a constant in `k`.

> That settles `attack-doubling-01.md` §4's open condition in the negative:
> `K*` is unbounded, so no constant `e^K Ĝ(b)` dominates it and the certificate
> route delivers no finite `K` at any base. (`attack-doubling-01.md` §4 asks
> for `K*` "proven sublinear in the level"; sublinearity is not the property
> the route needs, and Lemma 1's floor is itself sublinear at rate `y/ln y`.
> That rate is also what the measured drift `0.6881 ± 0.1328` in `ln P(2s)` is
> reading: `d ln(y/ln y)/d ln y = 1 − 1/ln y ≈ 0.67` at `y ≈ 20`.)

The closure is unchanged by this correction.

### 1.5 Lemma 2: WEAKENED

The lemma states `K ≥ sup_k[(γ−λ)k ln b + …]`; the one-line proof establishes
`≤` on the defect. The lemma is true as a statement about what that proof shape
can certify, but the displayed line does not prove the displayed inequality,
and closing the gap needs an admissible extremal `Ĝ` that the note does not
exhibit, which is non-trivial: `Ĝ` must stay non-decreasing and cannot alternate
freely between the two envelopes.

> **Lemma 2 (exponent gap).** Suppose a proof of (H-sub-pow) at base `b`
> proceeds only by an unconditional upper bound `Ĝ(n) ≤ A n^γ` applied at
> `b^{k+1}` and an unconditional lower bound `Ĝ(n) ≥ a n^λ` applied at `b^k`.
> The largest defect such a proof leaves unbounded is
> `(γ−λ)k ln b + γ ln b + ln(A/a) − f(b)`, so the smallest constant it can
> certify is the `sup` of that over `k`, finite if and only if `γ ≤ λ`.

The scoping is otherwise honest: §9 names the fourth mechanism (a ratio bound
through none of the three) as untouched.

### 1.6 Mechanism (c): CONFIRMED at source

`paper/beta2-note.md` is exactly the two-class adaptation the note describes:
`A = {r(r+2)}`, level `y = z^{β₂+ε/2}`, `H = z^{β₂+ε}`, DHR `κ = 2` lower-bound
sieve, its §3 on why the two-class remainder does not explode. The
identification stands and the note is right not to redo it.

---

## 2. `excess-chain-c.md` (TODO 10): the closure stands in half

The Gumbel algebra reproduces exactly to four decimals under an independent
rebuild (own sieve, own `⌈W/q⌉`, own median, own EVT quadrature), including the
grid sizes 435/139/143/145, `l_min(31) = 447851`, the `L` column, the `c`
column, all residuals and all five rms figures. The sign argument is confirmed
against four distinct sub-Gaussian families by exact order-statistic
quadrature: truncated normals at 4σ/3σ/2.5σ and symmetric bimodals with excess
kurtosis −0.74 to −1.68 all *lower* `E[max]` against Gaussian at
`n = 2.1e5`, by 13% to 51%. §5.1's escape hatch ("mid-tail heavier, far tail
lighter is the right sign to lift `c`") is refuted in every family built.

What does not survive:

**The rms argument.** Both rms are computed with `N`, not `N − k`, so the
one-parameter constant is charged nothing. Corrected sentence for §4:

> The zero-parameter correction has a higher raw log-rms than a fitted constant
> on all eight levels (0.1489 vs 0.1153), but the two are not distinguishable
> once the constant's free parameter is charged: ΔAICc = 0.36 in the constant's
> favour, `F = 1.67` on (8,7) against a 5% critical value near 3.7. Even for
> pure noise, fitting one location parameter reduces rms by `√(7/8) = 0.935` by
> construction. The rms comparison is not what carries the verdict.

What does carry it, and the note never computes it: under the chain's own null
the maximum is a single Gumbel draw with sd `1.2826/(2L)` in `c`-units, and the
eight residuals are `+0.06, +0.36, +1.29, +0.61, +2.02, +2.68, +2.73, +2.94` sd,
positive at 8 of 8 (sign test `p = 0.0039`). That strengthens the conclusion.

**The `x = 7` line.** At `x = 7`, `n_eff = 210/20 = 10.5`, where the asymptotic
`b_n + γ/a_n = 1.6309` over-predicts the exact `E[max of n iid N(0,1)] = 1.5388`
by 5.8%. Substituting exact maxima, the eight residuals become
`+7.9, +12.2, +24.9, +9.2, +21.2, +22.4, +18.8, +17.1%` and the zero-parameter
log-rms *worsens* from 0.1489 to 0.1614.

> The correction appears to account for the small-`k` transient at `x = 7` only
> through the asymptotic's own `o(1/a_n)` error: the exact `E[max]` at
> `n = 10.5` is 5.8% below `b_n + γ/a_n`, and with the exact maximum the
> `x = 7` residual is `+7.9%`, not `+2.0%`. The correction accounts for nothing
> at any level.

**The positive counter-claim, and this is the one that matters.** The five
values `0.933, 1.062, 1.094, 1.078, 1.075` are `x = 17..31`, not `13..31`;
`x = 13` reads 1.0253 and is not in the list. Over `x = 17..31`: mean 1.0482,
sample sd 0.0657, sem 0.0294, slope `+0.0069 ± 0.0048` per unit `x`
(`t = 1.44`, 3 dof). The ±0.06 is carried almost entirely by the single `@17`
point: over `x = 19..31` the four levels read `1.062, 1.094, 1.078, 1.075`,
mean **1.0772**, population sd **0.0114**, slope `+0.0004 ± 0.0017`. **1.074
sits 0.3% from that mean, well inside its scatter.** The note's counter-claim
depends entirely on where the window starts, and that choice is not argued.

> The honest statement is `c = 1.05 ± 0.07` (sd) over `x = 17..31`, with no
> detectable trend and almost no power to detect one at `n = 5`. The data do
> not separate 1.05 from 1.074: dropping the single `@17` point gives
> `1.0772 ± 0.0114` over `x = 19..31`, which contains 1.074. What is refuted is
> the *derivation* of 1.074 from a compressed-tail max correction, not the
> value.

**Custody count.** The `rel` column reads `6.4, −3.8, −0.2, 1.3, 5.6, −2.6,
−0.6, −1.3`. Five have `|rel| < 3%`, not six.

> …agrees to better than 3% at five of eight levels, and to better than 6.5% at
> all eight; the two failures are 3.8% at `x = 11` and 5.6% at `x = 19`, worst
> 6.4% at `x = 7` (a two-point grid).

**Custody on the `@31` input.** The read is correct: `natal-cap-33-overnight.js`
RUN 1, column `E = M − mean`, the `l = 825,818` row, `E_med(31) = 60.90`, the
8th of 15 sorted values under the cap-01 median convention; `60.90/56.68 =
1.07445` reproduces. But `TODO.md` line 457 lists that file among the three
hand-pasted tails still unbound, and the note's calibration line says all eight
inputs are "imported from embedded artifacts". The eighth is not. Sized here
for the first time: cap-33's 15-quantile median `l = 825,818` against cap-29's
145-length grid median `l = 953,421` is `dL = 0.144` on `L = 12.257`, about
±0.006 in `c`, and does not matter.

**The ledger verdict's limit clause.** "tends to 1 for any correlation length"
holds only for *fixed* `ν`; with `ν` growing in `L` the limit is
`√(lim ln n/L)`, and the note's own PART 3 measures `ln n/L` drifting to
1.32–1.41. The note also does not notice that its two fitted numbers are one
number: `A = 1.1445` and `ln n/L = A² = 1.3099`, and `A·Gumbel` beats a constant
by ΔAICc = 9.7, so the derived `L`-dependence is earning its keep and only the
normalisation is off by 14.5%.

`cap-25` reading 5's "roughly offset" is fairly represented and "wrong" is the
right grade, if anything understated: reading 5's own quoted centering size
(10–20% down) predicts `c* ≈ 0.80–0.90` against a measured `c* = 0.972`.

---

## 3. `c2prime-refit-22.md` (TODO 1c): CLOSED does not stand

Every figure reproduced under an independent rebuild (own sieve, own OLS, own
frames, data pulled from `research/a144311-full-ladder.js` and
`research/attack-c2drift-01.js` rather than from the target's copies):
`0.3745 ± 0.1411`, control `0.3344`, window sd `0.3480 = 2.47×` nominal,
negative in 23 of 51, `Qg 0.2978 → 0.2549 ± 0.0274`, margin
`−0.0806 → −0.0108 ± 0.0239`, the 13% → 35% figures (`4.4/34.9 = 12.6%`,
`27.6/78.9 = 35.0%`), and §5's `1.777 − 0.279 = 1.498` at
`exponent-control.js:291` header dated 2026-08-21. `c₂′` is confirmed a per-`x`
ratio column (`a144311-full-ladder.js:63`), with no equivocation. The three
figures `embed.js --check` flags as advisory, 0.279, 1.880 and 4000, all three
trace to embedded artifacts in other files and none is the repo's failure mode.

Three things fail, and they are reasoning rather than arithmetic.

**The cited agreement is not agreement.** `attack-c2drift-01.md` §1 found the
drift class-count-blind; its §3 found the drift *real*, `c₂′` on `x ≥ 17`
`b = 0.3351 ± 0.1098` with `p_logn = 0.0053` and `p_EV = 0.0075` against
4000-replicate nulls, and left (i)′ and (ii) both alive, declaring the data
cannot decide. Finite-size bias of the *estimator* is not that file's verdict.

> `attack-c2drift-01.md` §1 found the drift class-count-blind; its §3 measured
> it significant on `x ≥ 17` and left two object-level candidates alive, and
> this file does not touch that. What this file adds is narrower: on item 1c's
> own ten-point band `x ≥ 41` the rate is unresolvable, which is a statement
> about that band, not about the drift.

**The calibration is not phase-matched, and phase-matching is the note's own
move.** §C5 argues that only post-dip against post-dip is legitimate, then
builds the null from the whole `c1` column including its descending head
(`x ≥ 11` slope `−0.1091 ± 0.0335`). Applied consistently on `x ≥ 59`, 39
windows: sd 0.2602, ratio **1.84×** not 2.47×, negatives **16 of 39 (41%)** not
45%. The conclusion survives; the two quoted numbers do not.

**Ruler inconsistency, always toward "indistinguishable".** The nominal se is
declared the wrong ruler where it would make `c₂′`'s slope look resolved (2.65
se from zero), and the wide window sd is adopted where it makes the gap look
small. The `c₂′`/`c1` gap is 0.63 of the window sd, 0.84 phase-matched, and 1.53
nominal σ.

**The ledger verdict line is arithmetically wrong**, in both places it appears
(`c2prime-refit-22.md` and `QUESTIONS.md:31,46`): "0.334 vs 0.375 per ln ln x,
gap 0.63 of the control's own sd". Those two numbers differ by 0.0401, which is
0.12 of 0.3480. The 0.63 belongs to a different pair (0.3745 against `c1`'s long
post-dip lever 0.1553).

> **verdict:** Class-count-blind (attack-c2drift-01 §1); on item 1c's own band
> x >= 41 the ten-point rate is unresolvable: c2' 0.3745 +/- 0.1411 against
> c1's 0.3344 +/- 0.2358 on the same primes, a difference of 0.0401 = 0.12 of
> the control's ten-point window sd. Whether the drift is real is NOT closed
> here: attack-c2drift-01 measured it at p = 0.0053 on x >= 17 and left (i)'
> and (ii) alive. exponent-control §2/§4/§6 refit at 22 terms.

Two smaller items. §2's "the same seven models in the same order at 22 terms as
at 10" is refuted by the note's own table (ranks 3 and 5 swap). §2's phase
anchor "`c₂′`'s minimum is at `x = 29`" rests on an unresolved feature:
`c₂′(13) = 0.4469` against `c₂′(29) = 0.4463`, a gap of 0.03 of the column's own
sd. And §3's pre-refit `Qg 0.2978` and margin `−0.0806 ± 0.0469` are attributed
to `exponent-control.md` §4/§6; both live only in `exponent-control.js` at lines
201 and 545, since the `.md` §4 table carries only `Q` on `h₂` and §6 only the
`h₂` margin.

---

## 4. `fold-ledger-forced.md` (TODO Z5b): ANSWERED stands, on five corrected sentences

The central risk the brief named did not materialise. All fifteen labelled
constraints (the headline says fourteen; F4b is separate and the §6 table has
fifteen rows) were re-derived independently from the tile's mod-30 structure and
asserted row by row on all 1,226 csv rows: **zero violations anywhere**, and
every attached number reproduced: `B3` mean 1.271 / max 5, the slack histogram
`0:417 1:478 2:252 3:67 4:12`, the three shares, `min net = 2`. Nothing is a
data regularity dressed as a theorem, and the forced/measured axis does not
over-claim: `by_new = O(1)` is explicitly demoted to MEASURED and the demotion
is right.

**F1** re-derived from scratch: `lo, hi ≡ 1 or 19 (mod 30)` forces
`width ≡ 0, 12, 18`, exhaustively, with the case boundaries where the note says
and no class unrepresented (494/366/366 rows; all four endpoint pairs occur).
One justifying clause is false, since `10+16+28 = 54` and `10+22+28 = 60`:

> Counting the three channel classes over `W = width − 2` consecutive integers
> whose first is `≡ 1` or `19 (mod 30)` gives the offset multiset `{10,16,28}`
> in the first case and `{10,22,28}` in the second. The two differ only in 16
> vs 22, and for each of the three possible `W` classes those two offsets fall
> in the same count bracket, so the two endpoint cases give the same count:
> `3t+2, 3t, 3t+1` with `W = 30t + s`.

**F7 is a mechanism, not a fencepost artifact.** Exhaustive scan of the interior
gaps between consecutive stretch ranges `[lo, hi−3]`: 1,225 uncovered openers,
exactly one per gap, zero anomalous gaps; `hi−2` is an opener at 1,226 of 1,226
boundaries and `hi−1` at 0 of 1,226. The `1,226 − 1` is because the global range
terminates one integer below the last drop, which the note says.
`10,013,999 − 10,012,774 = 1,225` reproduced.

**F4b** (`cc ≤ by_old`) and **F10** (`#primes = 2·net + removed − cc`) both hold
exactly on all rows with real derivations. F10's step needs one uncited lemma
(no integer belongs to two contained channel slots, so the two-way count carries
no multiplicity; verified, 0 of the 8 coprime residues is both an opener and an
upper member).

**The `by_new` bound.** The endpoint re-derives: `Kmax ≤ q′ + g(1 + g/q)`,
verified at all 1,226 rows. But the `1 + ⌈(8/30)·g(1+g/q)⌉` step is false for an
arbitrary start (`(10,19]` holds 11, 13, 17, 19 = 4 > `⌈8·9/30⌉ = 3`) and
survives only because `q′` is coprime to 30. Checked exhaustively over all 8
coprime starts × all lengths to 600 and over every realizable `(q,g)`: 0
violations. The anchoring is load-bearing and the note does not state it. The
`5 vs 3` gap is honestly reported as slack; the phrase "the forced max B3 = 5"
should read "the largest value the forced bound takes in range, `B3 = 5` at
`q = 6173`", since `B3` has no forced maximum, being driven by `g`.

**The shares** all sit on one denominator, `Σ by_old = 9,571,582`, and recompute
to 29.89 / 47.10 / 84.59%. Not compared across denominators.

Two prose claims are refuted, both about direction:

> **§0 bullet 2.** No closed-form forced lower bound on `removed_by_old_moire`
> reaches the column. The best one found (F12) holds 47.10% of it in total, and
> its band share **rises** from 0.1500 to 0.4746 without approaching 1; the
> single-prime floor F11 holds 29.89% and its share falls to 0.2984, and the
> exact-union floor F13 holds 84.59% and its share falls to 0.8444.

(As written, "its share of the truth is falling band over band" contradicts §4
line 250 of the same note.)

> **§0 bullet 3, §5, the §6 F14 row, and the producer's READING 5.** Bound/net
> over the six bands reads `1.100, 1.018, 1.615, 2.506, 3.393, 4.517` with the
> sharpest floor available, and `2.250, 3.787, 5.997, 8.179, 10.321, 12.875`
> with closed forms only. The closed-form series is monotone increasing; the
> sharpest-floor series dips at the second band (where F13's `P` is still all of
> `[7,q)`) and then increases monotonically.

**F9** is weakened rather than refuted. The inequality as coded holds at 293 of
293, but the prose fraction is short by two integers: row 34 (`q = 157`,
`q′ = 163`) has its `by_new` slot at `(25589, 25591)` with `25591 = q·q′`, so the
opener `25589 = q·q′ − 2` sits below the stated cut, and so do 50 more.

> By Lemma A the smallest possible `k` is `q′`, so every `by_new` kill has
> `m ≥ q·q′` and hence opener `a ≥ q·q′ − 2`. The kill's opener therefore lies
> in the top `(q′·g + 2)/(g·(q+q′))` fraction of the stretch, which is
> `q′/(q+q′)` plus at most two integers; the two-integer overhang is attained at
> 51 of the 293 folds with `by_new > 0`, the earliest at `q = 157` (row 34).

One file:line is wrong: `research/fold-ledger-01.js`'s "the stretches
`S_q = [q², q′²)` partition the line" is at line 9, not line 27.

One unrun assertion, now checked and confirmed: the crude `8C₂` Selberg-form
constant makes the literature bound worse than F14 in *every* band, not only the
top (bound/net 6.430…8.841 against F14's 1.100…4.517).

---

## 5. `rho2-analytic-bound.md` (TODO 0): ANSWERED stands, §4's headline numbers do not

The premise-refutation is right: `attack-rhoms-01.md` does carry the analytic
bound, and `TODO.md` item 0 plus `rho-maximal-law.md` §7 are stale pointers.
MS1 re-derived here step by step in R4 and sound:

- step 1: `f(d̄) = (g²−1)/12 − d̄(g−d̄)/2` has max `(g²−1)/12` at `d̄ = 0` and min
  `−(g²+2)/24` at `d̄ = g/2`, and `(g²+2)/24 ≤ (g²−1)/12 ⟺ g² ≥ 4`. Tight at
  `g = 2`.
- steps 3–4: with `q = gu`, `q′ = gv` and `τ` multiplicative on squarefree
  arguments, `τ(q)τ(q′)g²/(qq′) = 4^{ω(g)}2^{ω(u)}2^{ω(v)}/(uv)`, and
  `Σ_{g≤X} 4^{ω(g)} ≤ X Π(1+4/p)` because `X/g ≥ 1` on the range.
- step 5: `q = [d₁,d₂] ≤ d₁d₂ ≤ D² = z^{2s}`.
- `81/48 = 27/16` exactly, so the constant is consistent between FORM I and
  FORM I*, and `(27/16)e^{8γ} = 170.8820`.
- `FORM I*/exact = 3.2134e+14` at `z = 47` and `log_z(FORM I*) = 10.2054`.

Two things fail.

### 5.1 The "absolute floor" is not the absolute floor: REFUTED

`attack-rhoms-01.js` defines its S4 `R1f` column as
`exp((ln 3 + lnW + ln ms)/3)`: `C_L = 1` with the **measured** mean square. The
note calls that column "the ABSOLUTE FLOOR of that route (`C_L = 1` and
`⟨ρ̃²⟩ = 1`, which no mean-square lemma can improve on)". Rebuilt both ways in
R5: the cited column matches the measured-`ms` form at all ten levels and never
the `ms = 1` form. `attack-rhoms-01.js` keeps the two objects apart in its own
S5, "R1 floor (`C_L = 1, ms = 1`): dies at `z = 47`" against "R1 floor with the
measured-model ms: dies at `z = 41`", and this pass agrees with S5.

The true absolute floor `(3W)^{1/3}` against `smax`:

| z | 31 | 37 | 41 | 43 | 47 |
|---|---|---|---|---|---|
| note's quoted ratio | 0.232 | 0.541 | **1.474** | **5.000** | **15.346** |
| true `C_L = ms = 1` ratio | 0.080 | 0.123 | **0.282** | **0.852** | **2.155** |

> So even at its floor the Chebyshev route already misses by a factor 2.155, or
> 0.1994 of exponent, at `z = 47`; at `z = 41` and `z = 43` the absolute floor
> still clears, and it is the `C_L = 1` floor with the *measured* mean square
> that fails from `z = 41` at 1.474×, 5.000× and 15.346×. The miss diverges
> either way: the union price is `e^{θ(z)/3}` with `θ(z) ≍ z`, which beats every
> fixed power of `z`.

The closure ("ingredient, not route") is untouched, since the divergence mechanism
is proven and independent of which floor is quoted, but §0's and §4's headline
numbers are attributed to the wrong object and overstate the floor's miss by a
factor 7.1 at `z = 47`.

### 5.2 The Rosser–Schoenfeld input is false in range: REFUTED

The note flags the RS closure `[MEMORY]` and lists opening it as NOT RUN, which
is the right calibration. This pass did not open RS either, but it did not need
to: the quoted inequality has counterexamples. Tested in R6 at every prime `z`
below `3.3e7` in the note's own `p < z` convention:

```
z = 109   prod = 8.556739   e^g ln z (1+1/(2 ln^2 z)) = 8.545456   ratio 1.001320
z = 113   prod = 8.635968   e^g ln z (1+1/(2 ln^2 z)) = 8.608198   ratio 1.003226
```

Two violations, both below 285, none above. The note's stated worst,
`0.998681` at `z = 19`, reproduces exactly; its sixteen sampled `z` simply did
not include 109 or 113, so the sampling passed, not the check.

> **[MEMORY] flag.** The one bound in the derivation not read at a page this
> session is Rosser–Schoenfeld 1962, `Π_{p≤x}(1−1/p)^{-1} < e^γ ln x
> (1 + 1/(2 ln²x))`. As stated it is FALSE at `x = 109` and `x = 113` (ratios
> 1.001320 and 1.003226 in this file's `p < z` convention) and holds at every
> prime `z` from 127 to 3.3e7. The RS bounds of this shape are published with a
> lower cutoff (`x > 285` for the direction that gives an upper bound on the
> reciprocal product) [MEMORY, unverified at a page], which is exactly what the
> two violations sit below. FORM I* therefore carries a validity floor, not
> "all `z`". Anyone integrating it must open Rosser–Schoenfeld.

Sensitivity, since the note says only that "the closed constant 170.88 is at
risk": it is not. `170.88 = (27/16)e^{8γ}` comes from the leading term of
Mertens' product and does not depend on the correction factor. What moves is the
`(1 + 1/(2 ln²z))⁸` factor and the validity range: substituting the safer
`(1 + 1/ln²z)⁸` raises FORM I* at `z = 47` from `1.1597e+17` to `1.4994e+17`,
29%, against a bound already `3.2e+14` above truth.

### 5.3 Two smaller items

"the measured truth grows at roughly half that rate": the measured `⟨ρ̃²⟩`
exponent between the cited endpoints `z = 13` and `z = 47` is 4.511, which is
75% of the stated `z⁶` and 44% of the effective 10.2054. The sentence is right
only under the second reading and does not say which. And "the ratio WIDENS
with `z`" is not monotone on the printed table: `1.745e+14` at `z = 29` exceeds
`1.653e+14` at `z = 31`.

---

## 6. What this pass did not reach

- The literature was not opened at a page for any note. Iwaniec 1978,
  Rosser–Schoenfeld 1962 and DHR Theorem 9.1 are all taken from the corpus's own
  readings and stay `[MEMORY]` here. The RS refutation in §5.2 is numerical and
  does not depend on that.
- `attack-rhoms-01.md`'s multiplicity cap `(9/2)τ(q)` (MS1 step 2) is cited, not
  re-derived. It is the one step of FORM I this pass did not check.
- `natal-cap-33-overnight` was not re-run, per the brief. The `@31` read was
  checked against its pasted RUN 1 tail only, which is the custody defect §2
  reports.
- No `G₂` value, no enumeration, no exponent. Nothing here moves any bound.
- Twelve of the fourteen `fold-ledger-forced` constraints were re-derived by an
  agent of this pass, not by the verifier directly; the derivations were graded
  independently of the note's, but a third reader has not seen them.

---

## 7. What would falsify this, and whether that check has run

| claim of this pass | falsifier | has it run |
|---|---|---|
| the 1d legal zone reproduces at both grades | a ladder term this pass retyped wrongly | yes: R0 checks the retyped A144311+1 against `exact-g2-ladder.js` on all 14 exact terms, and the three load-bearing terms 618/1080/1710 individually |
| `y = 117` belongs to `K = 1.3555`, not `1.3946` | a different threshold convention under which 117 is the 1.3946 row | no such convention: R2 reproduces the producer's own `N > cap` test and the producer's own SEC G table prints both rows |
| Lemma 1's proof is valid | a level-`y` slot in `[n+s_1, n+s_N]` that is not one of the `n+s_i` | impossible: `n ≡ 0 (mod P)` and the interval is shorter than `P`; checked against all eleven cited certificates as well |
| "`K*` is not sublinear" is false as written | a reading of "sublinear in the level" under which `y/ln y` is not sublinear | none offered; `attack-doubling-01.md` §4 does not define the term, which is the underlying defect |
| the cited `R1f` column is not the `C_L = ms = 1` floor | the column rebuilding from `ms = 1` | ran, R5: it rebuilds only with the measured `ms`, at all ten levels, and `attack-rhoms-01.js` S5 names the two floors separately |
| the true absolute floor clears at `z = 41` and 43 | a different `smax` or a different `W` convention | `smax` and `θ(z⁻)` both recomputed here from primes; `smax` matches the cited column to three digits at all ten levels |
| the quoted RS form is false at 109 and 113 | an arithmetic slip in the product | ran, R6, exhaustively at every prime `z < 3.3e7`; the note's own stated worst `0.998681` at `z = 19` reproduces from the same loop |
| RS's real statement carries `x > 285` | opening Rosser–Schoenfeld 1962 | **NOT RUN.** `[MEMORY]`. The counterexamples at 109 and 113 stand without it; only the *explanation* depends on it |
| `c₂′`'s closure rests on a narrower window than the prior work's | `attack-c2drift-01.md` §3 not saying what it is quoted as saying | ran: §3's `p_logn = 0.0053`, `p_EV = 0.0075` on `x ≥ 17` read at source, and the shared-id status collision read at `QUESTIONS.md:31,46` |
| 1.074 is inside the `excess-chain-c` measurement | the `x = 19..31` window being illegitimate | not settled: neither window is argued in either direction, which is the finding |
| all fifteen fold-ledger constraints hold on all 1,226 rows | one violating row | ran: each constraint asserted row by row in an independent script, 0 violations |
| the fold-ledger derivations are derivations | a constraint whose stated proof does not close | ran for all fifteen; five prose sentences failed, no constraint did |
| this pass's own arithmetic | `FAILS > 0` in the producer, or an `embed --check` mismatch | ran: `FAILS: 0`, `--check` bit-honest, one static input hashed |

**Trap grading.** Nothing here derives an explicit `K`, an exponent, or a bound.
The one number that moves in a direction anyone could mistake for progress is
§5.1's correction, and it moves *against* the corpus: it makes the Chebyshev
route look 7.1× less dead at `z = 47` than the note claims, while leaving the
proven divergence that actually closes it exactly where it was.

*History and superseded claims: `research/history/CHANGELOG.md`.*
