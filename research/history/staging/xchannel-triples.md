# The mixed super-W triple census past @17: the joint deficit decays

<!-- ledger
id: Q-xchannel-triples
status: ANSWERED
todo: X
question: Does the joint deficit deepen or decay as the mixed super-W triple census is extended past @17?
verdict: It decays: J = 0.9025, 0.9599, 0.9659 at @17, @19, @23, so the deficit runs 9.7%, 4.0%, 3.4%, both new points land inside the pre-registered DECAYING FASTER THAN FORCED band, and the DEEPENING instinct is refuted by 3.50 sigma between @17 and @19 and a further 1.68 sigma to @23.
-->

*(2026-08-19. TODO item X's named first move, second half: "extend the mixed
super-W triple census past @17 ... which is the one instrument that sees the
joint deficit". Every figure below comes from
`research/natal-cap-39-triple-census.js` as embedded today, or is one-line
arithmetic on figures in that block, shown with its inputs. Calibration is
marked on every claim: MEASURED, DERIVED, INFERRED, REFUTED.)*

## Verdict

**J = 0.9025, 0.9599, 0.9659 at @17, @19, @23, so the joint deficit runs 9.7%,
4.0%, 3.4%. It decays, and from @19 onward it decays at the rate the CRT
construction forces, at about four times that scale.** Both new points land in
the pre-registered band DECAYING FASTER THAN FORCED, the series is monotone from
@17, and Chris's DEEPENING instinct is refuted in the strongest available way:
the statistic moved the other way, by 3.50σ between @17 and @19 and by a further
1.68σ between @19 and @23.

Four things the run settles that one point could not:

1. **The restriction costs nothing.** Restricting the enumeration to sub-W
   triples measures the *same* object, not a proxy, because the total census is
   free from the anchored joint law and P1 forces the aligned super-W count to
   zero. The bridge is checked against full C(K,3) enumeration at all five
   levels and agrees to the unit at every one. So 0.903 IS comparable across
   the restriction, and no calibration factor is needed.
2. **The origin-density steelman survives as a mechanism and dies as a
   constant.** At @23 the deficit is 63,756 coincidences short of CRT, 48.7 of
   its own Poisson σ from zero. It is not an artefact. But it is 3.4% and
   falling, not 9.7% and holding, and `verify-cofactor-convolution.md` §5's
   "measured at 0.903" is the small-count end of a decaying series.
3. **The m ≥ 3 migration in the X-gap is not this.** The m ≥ 3 share grows
   10.5% → 23.5% → 81.1% over exactly the levels on which the joint deficit
   shrinks. They cannot be the same phenomenon.
4. **P1 is now tested at @19 and @23** — a gap `xchannel-at23.md` §7 names —
   and the aligned super-W count is exactly 0 at all five levels.

---

## 1. Assignment, and what the @17 figure actually is

TODO item X: *"the surviving joint part is MEASURED at @17 — mixed super-W
triples at 0.903 of CRT, a 9.7% joint deficit invisible to any marginal — with
no level trend, because the triple census (`part5(·,3)`) is gated at x ≤ 17."*

**[MEASURED] The @17 figure reproduces from the bound tail, no re-run needed.**
`research/natal-cap-35-x-multiplicity.js`'s embedded @17 block reads

> `∏Q > W:  obs=3199 CRT=4726.4 ratio=0.677  vs P1 prediction (aligned share removed) 0.750`

and 0.677/0.750 = 0.9027. **[DERIVED] The "P1 prediction" is not a
measurement.** Six of the eight ε-patterns on a triple are mixed and all eight
carry the same CRT weight N̄/∏Q, so that column is the constant 3/4 at every
level. The statistic is therefore

> J(x) = (anchored mixed super-W coincidences) / (6·N̄·Σ_{∏Q>W} 1/∏Q)

and J(17) = 3199/3544.79 = 0.9025 exactly, reproduced by the new instrument.
The same reading of cap-35's tail gives two more points free: J(11) = 0.5361 on
2 counts and J(13) = 1.0236 on 143. Both are informational only.

## 2. Instrument, and the bridge that makes the census affordable

`research/natal-cap-39-triple-census.js`, one new repo script. The full census
enumerates all C(K,3) triples, and C(1739,3) = 874,979,589 at @23; cap-35 gates
it at x ≤ 17 for that reason. The bridge removes the need for the enumeration
without approximating anything, from three facts:

- **(B1)** The total anchored j = 3 census is free. Σ_{Q,ε} c(Q,ε) = Σ_{r∈N}
  C(m_r,3), and m_r(0) = a(r) + b(r) with a(r) = #{q | r}, b(r) = #{q | r+2}.
  Carrying the anchored **joint** histogram cnt(i,j) = #{r ∈ N : a(r)=i,
  b(r)=j} over the natal set — one O(W) pass — gives the census *split by
  class* as well, since the number of 3-subsets drawing i coordinates from the
  r side is C(a,i)·C(b,3−i). Classes (3,0) and (0,3) are the aligned patterns.
- **(B2)** The sub-W part is small: 4,517,592 triples at @23 against
  874,979,589, a factor of 194. cap-35's own `part3` already counts them; its
  j = 3 "#subsets ∏Q<W" column IS that number, and its "missing mass" column IS
  the denominator's second factor.
- **(B3)** P1 is a theorem, so the aligned super-W observed count is exactly 0:
  for ∏Q > W the all-0 pattern forces r = 0, not natal, and the all-2 pattern
  forces r = ∏Q − 2 ≥ W − 1, which is either out of range or ≡ 29 (mod 30).

Hence **mixed super-W obs = Σ_{r∈N}[C(a,2)·b + a·C(b,2)] − (sub-W mixed obs)**,
exactly. **[DERIVED, then MEASURED]** — see §5, where the full enumeration is
run anyway at every level and agrees to the unit.

The kernel costs two modular inverses per triple rather than twenty-four: the
eight patterns are built by incremental CRT (2 → 4 → 8) and the inverses
inv(q₁ mod q₂, q₂) and inv(q₁q₂ mod q₃, q₃) are shared across them.

**One instrument defect found and fixed before the run.** cap-35 carries the
strike counts a and b as `Uint16Array`. A first draft here used `Uint8Array`,
which is wrong: a[0] = K, because every scour prime divides 0, and at @19
K = 435 wraps to 179. The wrap moved X̄ by 13.33 and (X̄−X(0))/S̄ from 0.2225 to
0.2222. It was caught by the reproduction gate, which is what the gate is for.

## 3. The price, derived before the run

The code counts its own work and prints the counts before each census runs.
At @23:

| leg | triples | scan units | stride steps beyond first hit |
|---|---|---|---|
| restricted (∏Q < W) | 4,517,592 | 229,643,312 | 193,502,576 |
| full C(K,3) | 874,979,589 | 7,193,339,288 | 193,502,576 |

Both triple counts were on record before this file ran: 4,517,592 is cap-35's
embedded part3 j = 3 "#subsets ∏Q<W" at @23, and 874,979,589 = C(1739,3).

**Two independent prices, both formed before the @23 census.**

- *In-code, two-term, from @19's fitted constants* (per-triple and per-stride,
  printed by the script itself): restricted **1.56 s**, full **154.77 s**.
- *Offline, from a timed prefix of the kernel at the real @23 array size*
  (scratch probe, i < 20 and i < 60 giving 252.9 and 210.0 ns/triple):
  full **184 to 221 s**.

**Outturn: restricted 3.172 s, full 161.798 s, @23 level 169.89 s, whole file
172.557 s, peak RSS 1.203 GB.** MEASURED. The in-code price was out by 4.3% on
the full leg and under-priced the restricted leg by a factor of 2.0, because
the stride constant fitted at @19 does not carry @23's main-memory penalty on a
223 MB comb. The offline prefix probe over-priced by 14 to 37%, because the prefix
it timed covers the small-q₁ triples that carry all of the sub-W scanning.

**Verdict: affordable, by a factor of 64 against the 3-hour ceiling.** @23 was
run in full, so no level was dropped and the @23 price needs no separate report.

**Memory.** 5 bytes per slot against cap-35's 25: A (1) + a (2) + b (2), with
cap-35's Int32 prefix table replaced by two running counters for the triangular
weight. Inventory 1.115 GB, measured 1.203 GB, against cap-35's 5.69 GB at the
same level. MEASURED.

## 4. Pre-registration, quoted verbatim before the results

*From the header of `research/natal-cap-39-triple-census.js`, bound to the run
by the embed's `code-sha256`. It was written after the @19 timing probe had
printed J(19) and before any @23 census existed, and it says so.*

> HONESTY NOTE (the campaign rule exists for this; `xchannel-at23.md` §4 set
> the precedent). J(19) = 0.9599 printed on the timing probe BEFORE these
> bands were written, so for @19 they are a stated criterion, not a blind
> forecast. For @23 they are blind: no @23 census had been run. The arithmetic
> producing them uses only the three points already on record in cap-35's
> embedded tail, and is reproduced here so it can be checked.
>
> ON RECORD, from cap-35's embedded j = 3 census, no new run:
>   J(11) = 0.402/0.750 = 0.5361   (obs 2,    Poisson σ_J = 0.379)
>   J(13) = 0.768/0.750 = 1.0236   (obs 143,  σ_J = 0.086)
>   J(17) = 0.677/0.750 = 0.9025   (obs 3199, σ_J = 0.016)
> @11 and @13 are informational only. The anchor is @17.
>
> TWO DECAY REFERENCES, from those points only:
>   1−J ∝ Σ_{q>x} 1/(q(q−2))  (1.3856%, 1.0878%, 0.8817% at @17/@19/@23)
>        ⇒ J(19) = 0.9235, J(23) = 0.9379
>   1−J ∝ 1/lnW  (13.143, 16.088, 19.223)
>        ⇒ J(19) = 0.9204, J(23) = 0.9333
>
> BANDS (exhaustive; applied to J(19) and J(23) separately, and printed by the
> classifier below so the verdict cannot be retrofitted):
>   DEEPENING                      J < 0.887          below @17 by > its own 1σ
>   FLAT                           0.887 ≤ J ≤ 0.919  @17's 0.9025 ± 1σ
>   DECAYING, ON THE FORCED TRACK  0.919 < J ≤ 0.945  the two reference laws
>   DECAYING FASTER THAN FORCED    0.945 < J ≤ 0.995
>   GONE OR REVERSED               J > 0.995
> MONOTONICITY CLAUSE: a trend verdict requires J monotone from @17 onward.
> Otherwise the verdict is NO LAW — the ruling `xchannel-at23.md` R2 made on
> the increment ratios.
>
> WHAT EACH READING DOES TO ASSUMPTION A's DEPENDENCE TERM δ:
>   (a) FLAT near 0.90 — a constant joint correction. δ's forced-scale bound
>       stays true at the (0,0) cell, but a NON-decaying ~10% joint correction
>       lives at i+j = 3 and never enters X. `verify-cofactor-convolution.md`
>       §7's "both scales decay like 1/(x ln x)" must then be narrowed in print
>       to the (0,0) cell. The origin-density steelman survives as permanent
>       structure out of X's reach.
>   (b) DECAYING toward 1 — finite-size. The steelman is a small-W effect.
>       verify §3's DERIVED claim (P1 is one-sided, so mixed patterns keep
>       their CRT mass on average and the truncation lives entirely in the
>       marginals) is confirmed asymptotically, and δ's decaying story
>       generalises from the one cell X sees to the whole i+j = 3 joint.
>   (c) DEEPENING — structure at the origin, Chris's instinct. verify §3's
>       DERIVED claim is refuted: its uncontrolled averaging fails. δ's
>       smallness at (0,0) is then a cancellation, not a bound, and Assumption
>       A needs the joint controlled separately at i+j ≥ 3 — exactly where the
>       X-gap's m ≥ 3 share is migrating (10.5% → 23.5% → 81.1%).
>   (d) GONE OR REVERSED — the @17 0.903 was itself an artefact of 3199 counts
>       and the steelman is refuted rather than out of reach.
>
> THE δ SIGN-FLIP SUB-REGISTRATION. δ_model flips sign at @19 (+0.2997%,
> −0.2850%, +0.5175% at @17/@19/@23) and the flip is unexplained on record.
> If J is SMOOTH through @19 — |J(19) − the lnW-linear interpolation of J(17)
> and J(23)| ≤ 0.010 — then @19 is not a special level for the joint law, the
> flip is localised to the (0,0) cell, and it reads as finite-size
> cancellation, not structure. If J kinks at @19 by more than 0.010 against
> the trend, the flip is structural and shared across cells.

The reproduction gates were pre-registered with it: (X̄−X(0))/S̄, the m ≥ 3
share, δ_model, the missing mass, aligned super-W obs = 0, and bridge = full
census. **All passed at all five levels.** §6 lists them.

## 5. Readings

**R1 [MEASURED] The trend, with the band verdict the classifier printed.**

| x | lnW | mixed super-W obs | CRT | J | σ_J | pre-registered band |
|---|---|---|---|---|---|---|
| 11 | 7.745 | 2 | 3.73 | 0.5361 | 0.3791 | DEEPENING (informational) |
| 13 | 10.310 | 143 | 139.70 | 1.0236 | 0.0856 | GONE OR REVERSED (informational) |
| 17 | 13.143 | 3,199 | 3,544.79 | 0.9025 | 0.0160 | FLAT |
| 19 | 16.088 | 74,065 | 77,162.70 | **0.9599** | 0.0035 | **DECAYING FASTER THAN FORCED** |
| 23 | 19.223 | 1,807,665 | 1,871,421.20 | **0.9659** | 0.0007 | **DECAYING FASTER THAN FORCED** |

Increments +0.4876, −0.1212, +0.0574, +0.0061. Monotone from @17, so the
monotonicity clause is satisfied. **Candidate (b), decaying, is the reading;
candidate (c), DEEPENING, is REFUTED.** The @17→@19 rise is 3.50σ on the
combined Poisson scale and the @19→@23 rise is 1.68σ.

**R2 [MEASURED] The deficit is real and it is large in its own units.** At @23
the shortfall is 1,871,421.20 − 1,807,665 = 63,756 coincidences, 48.7σ_J from
zero. "Decaying" is not "absent", and any statement that the origin-density
mechanism does not exist is refuted by this level's own count.

**R3 [MEASURED] From @19 the deficit is a constant multiple of the forced
mutual-exclusion scale.** The block carries the ratio as its own column, beside
the 1−J it is formed from and the forced scale it is divided by:

| x | 1−J | Σ_{q>x} 1/(q(q−2)) | ratio |
|---|---|---|---|
| 17 | 0.0975 | 1.3856% | 7.040 ± 1.152 |
| 19 | 0.0401 | 1.0878% | 3.691 ± 0.324 |
| 23 | 0.0341 | 0.8819% | 3.863 ± 0.081 |

@19 and @23 agree to **0.52σ**; @17 sits **2.75σ** above @23. That ratio column
is printed in the block, not derived here. Two readings of it are compatible and
neither changes the conclusion: either @17 is a 2.75σ-high point on a series
that has always run at about 3.8 times the forced scale, or the multiple
genuinely fell once between @17 and @19 and has held since. Both say the joint
dependence at i + j = 3 decays at the rate the CRT construction forces at the
(0,0) cell, at about four times its size.

**R4 [MEASURED] The bridge is exact, and it is validated at five levels.** The
full C(K,3) enumeration was run at every level and reproduces the bridge's
mixed super-W count to the unit — 2, 143, 3199, 74,065, 1,807,665, all PASS —
and the census total equals B_3(0) read off the anchored joint law (I2 PASS at
all five). **So the restricted census measures exactly what the full one does,
and 0.903 is comparable across the restriction with no bridge factor.** The
answer to the assignment's calibration question is: no calibration is needed,
and this is demonstrated rather than assumed.

**R5 [MEASURED] P1 is tested directly at @19 and @23 for the first time.** The
aligned super-W observed count is exactly 0 at all five levels, by the bridge
and independently by direct enumeration. `xchannel-at23.md` §7's "P1 is not
tested at @23" is closed.

**R6 [MEASURED] The two orientations are symmetric.** Mixed super-W splits
(2,1) = 904,409 and (1,2) = 903,256 at @23 against 935,710.60 each (0.13%
apart), and 37,139 / 36,926 against 38,581.35 at @19. The deficit is not
carried by one orientation, so it is not an artefact of the +2 shift.

**R7 [MEASURED] The whole anchored joint law converges to its own marginals,
cell by cell.** The new instrument carries cnt(i,j) on the natal set, so the
ratio cnt(i,j)·N̄/(row_i·col_j) is available at @19 and @23 for the first time:

| cell | @17 | @19 | @23 |
|---|---|---|---|
| (2,2) | 1.8207 | 1.6945 | 1.2139 |
| (1,2) | 0.7342 | 0.8548 | 0.9456 |
| (2,1) | 0.7732 | 0.8610 | 0.9474 |
| (0,2) | 1.1082 | 1.0609 | 1.0387 |
| (0,0) | 0.9970 | 1.0029 | 0.9949 |

Every off-unit cell moves toward 1. This is R3's decay seen in a second and
independent presentation, and it is the strongest single piece of evidence for
candidate (b).

**R8 [INFERRED] The m ≥ 3 migration in the X-gap is not the joint deficit.**
The m ≥ 3 share of the X-gap grows 10.5% → 23.5% → 81.1% over exactly the three
levels on which the joint deficit at i + j = 3 shrinks 9.7% → 4.0% → 3.4%. Two
quantities moving in opposite directions are not the same phenomenon, so the
migration `xchannel-at23.md` R7 measured is a **marginal** effect — the
one-sided cofactor law, as its §6 concluded — and not a growing joint
dependence. Inferred, not proven: the X-gap runs over all j and this census is
j = 3.

**R9 [MEASURED, and the pre-registration's letter disagrees with its intent]
The δ sign-flip sub-test fires, and what it fires on is a rate, not a sign.**
The lnW-linear interpolation of J(17) and J(23) at @19 is 0.9332 against a
measured 0.9599, deviation +0.0267 against the pre-registered threshold 0.010,
so the printed verdict is KINK. The threshold is not merely detecting
concavity: either reference decay law deviates from its own chord by only
+0.0039 (forced) or +0.0030 (1/lnW). **But the mechanism the sub-test was
written to detect is absent.** δ_model runs +0.2997%, −0.2850%, +0.5175% while
J rises monotonically at every one of those levels. What @19 changes in the
joint law is a rate; what it changes in the (0,0) cell is a sign. The honest
statement is narrower than either branch of the sub-registration: **the
i + j = 3 joint does not share the flip, and the flip remains unexplained.**
The one thing this removes is the worst reading — that the flip is a symptom of
joint structure turning over at @19 — because the joint does not turn over.

**R10 [MEASURED] The m-decomposition, recorded alongside.** Reproduced exactly
at all five levels: X-gap anchored − ensemble = 8.74, −4.18, −566.70,
−10,954.81, −216,803.55, splitting into m = 2 cells 10.71, 3.16, −507.46,
−8,378.24, −40,916.72 and m ≥ 3 cells −1.96, −7.34, −59.24, −2,576.56,
−175,886.83. (X̄−X(0))/S̄ = −0.2287, +0.0134, +0.1568, +0.2225, +0.2658 and
δ_model = −2.0247%, +0.4264%, +0.2997%, −0.2850%, +0.5175%, both matching the
record to the digit. Nothing here is new; it is the gate that lets the new
numbers be believed.

## 6. What it does to Assumption A's δ story, and to the steelman

**[MEASURED, then DERIVED] The pre-registration's branch (b) is the outcome,
with one correction to it.** Branch (b) said the decaying reading would confirm
`verify-cofactor-convolution.md` §3's DERIVED claim and let δ's decaying story
generalise from the (0,0) cell to the whole i + j = 3 joint. That is what
happened, and R3 makes it quantitative in a way the pre-registration did not
anticipate: the generalisation holds with a **multiplier of about four**, not
one. Written out:

> `verify-cofactor-convolution.md` §7 states that the residual dependence at
> the (0,0) cell is of the size the construction forces, |δ| = 0.29% to 2.02%
> against a mutual-exclusion scale of 0.88% to 2.11%, and that both scales decay
> like 1/(x ln x). **The i + j = 3 joint obeys the same law with a constant of
> about 3.8**: 1−J = 0.0341 against a forced scale of 0.8819% at @23, and the
> ratio is stable to 0.52σ between @19 and @23.

So Assumption A's dependence term keeps its bound and its decay, and the bound
now covers a cell X cannot see rather than only the one it can. The claim
"δ is bounded by, and decays like, Σ_{q>x} 1/(q(q−2))" does **not** need the
narrowing to the (0,0) cell that branch (a) would have forced. What it needs is
the constant stated: at (0,0) the ratio |δ|/forced runs 0.96, 0.25, 0.22, 0.26,
0.59 and stays below 1; at i + j = 3 it runs about 3.8 and is bounded, not
below 1. A single sentence in the note covers both: the dependence is O of the
forced scale, with a cell-dependent constant of order 1 to 4.

**[MEASURED] The origin-density steelman: survives, demoted, and now dated.**
`verify-cofactor-convolution.md` §5 states it as *"the anchored joint law is
truncated at ∏Q > W beyond what its marginals are truncated at, by a factor
measured at 0.903 on the mixed super-W triples at @17."* Three edits are now
owed to that sentence:

1. **"at @17" was load-bearing and was not known to be.** The factor is 0.9599
   at @19 and 0.9659 at @23. Quoting 0.903 without the level overstates the
   effect by a factor of three at the current top level.
2. **The mechanism is confirmed, at 48.7σ at @23** (R2). It is a genuine
   dependence between the two orientations, it does live at i + j ≥ 3, it is
   invisible to any marginal, and X is still blind to it. Every clause of the
   steelman except the constant is now measured at three levels instead of one.
3. **It is not the m ≥ 3 story.** R8 rules out the reading that the joint
   deficit drives the X-gap's migration into m ≥ 3.

**[REFUTED] Chris's instinct that the deficit deepens.** It was the sharpest of
the three candidates and it is the one the data contradicts: the deficit halved
between @17 and @19 and has been flat-to-falling since. The instinct was not
unreasonable — @13's 1.024 to @17's 0.902 is a fall, and it was the only
two-point trend available — but the fall was inside the @13 error bar (σ_J =
0.086 on 143 counts) and the direction reversed the moment the counts got large.

## 7. What this does not show

- **Three usable levels is not a law.** R3's constant multiple rests on two
  points agreeing and a third sitting 2.75σ off. @29 would decide it, and this
  instrument needs 32 GB of arrays there against cap-35's 162 GB — but the full
  C(K,3) leg at @29 has K = 7863 and is a different problem, ~93× this level's
  875 million triples. (Corrected 2026-08-20: K was written ≈ 6800 and the
  multiple ~60×. The @29 scour length is 7863, printed by
  `natal-cap-18-at29.js` as "scour 7863 primes (31..80429)"; C(7863,3) =
  8.099e10 against 8.75e8.)
- **No j = 4 census.** The steelman is stated at i + j ≥ 3; only j = 3 is
  measured. j = 4 has its own missing mass, 0.040035 at @23, and is untouched.
- **No σ_X, no z-scores, no custody sweep.** This file computes no rotation
  ensemble beyond the u-form. The 8-to-15-σ_X framing is still @13-and-@17,
  exactly as `xchannel-at23.md` R6 left it.
- **The u-form ensemble column is not verified against brute force here.** It
  reproduces cap-35's figures at all five levels, and cap-35 checks it against
  the sweep at @11, @13, @17 only.
- **The decay rate is measured, not derived.** verify §3's argument that mixed
  patterns keep their CRT mass on average is consistent with R3 and is still
  not a controlled estimate. The factor of 3.8 has no derivation at all.
- **The @19 δ sign flip is still unexplained.** R9 removes one candidate
  explanation and supplies none.
- **No live document carries any of this.** `TODO.md` item X,
  `paper/anchored-note.md` §10, `research/moire-theorems.md` and
  `research/history/staging/verify-cofactor-convolution.md` §5 and §7 all quote
  0.903 with "no level trend"; none were touched.

## 8. Files touched

- `research/natal-cap-39-triple-census.js`: new. Tail embedded with
  `node research/qc/embed.js research/natal-cap-39-triple-census.js --streams
  both --timeout 900`; numbered READINGS appended below the OUTPUT banner, so
  the `code-sha256` binding is untouched and `--check` reconfirms both hashes.
  **The file was embedded twice, and the reason is on the record inside it.**
  The first embed's tail carried a per-triple nanosecond figure that
  `qc/tailfmt.js`'s volatile-substitution table does not cover, so `--check`
  could never pass on it. That figure was removed, the summary's (1−J)/forced
  column was added at the same time, and the file re-ran. A PRESENTATION NOTE
  in the header says so. No band, rule, threshold or computed quantity changed
  between the two runs, and every J is identical across them.
- `research/history/staging/xchannel-triples.md`: this file.

No live document was edited.

## 9. Gate

**Before:** `node research/qc.js` TOTAL = **4**, all `uncited-script`, on
`research/attack-frontier37-01-word.js`,
`research/attack-frontier37-02-transport.js`,
`research/attack-l1-residue-01-middleband.js` and
`research/y2-ladder-recompute.js`. None are this session's.
`node research/qc.js --full` reported 117/117 checks passed and failed the gate
on that same TOTAL of 4.

**After:** `node research/qc.js` TOTAL = **4**, all `uncited-script`, on
`research/import-maxplus-01-mapping.js`, `research/import-suen-01-transfer.js`,
`research/import-thinning-01-nullmodel.js` and
`research/import-thinning-02-coalescence.js`.

**The count is the same as before and the files are entirely different, because
the tree is shared with four concurrent siblings and the finding set moved three
times while this ran** (4 files at the start, then 2, then these 4, then 2 again
on the last reading taken before this file was closed). Every one
of them is a sibling's script waiting for its own report. That is worth stating
plainly rather than reporting "4 before, 4 after, unchanged", which would be
true of the number and false of the fact.
`research/natal-cap-39-triple-census.js` has never been among them: this file
cites it, and the `scripts`, `embeds`, `refs`, `quotes` and `provenance` checks
are all clean on it. `node research/qc.js --full` reports 117/117 checks passed
and fails the gate only on that TOTAL.

`node research/qc/embed.js --check --timeout 900
research/natal-cap-39-triple-census.js`: **code-sha256 matches, out-sha256
matches**, verified in the tail's recorded mode (stdout+stderr).
