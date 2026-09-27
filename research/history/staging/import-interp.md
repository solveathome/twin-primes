# Foreign import row 9: the interpolation method (Bayati–Gamarnik–Tetali)

<!-- ledger
id: Q-import-interp
status: ANSWERED
todo: 1d
question: Does the Bayati-Gamarnik-Tetali interpolation method reach the G2 Fekete object?
verdict: No: BGT closes on hypothesis H1, since the constraint count never splits (pi(st) - pi(s) - pi(t) is zero at no pair with st >= 25, minimum 2, maximum 12, VERIFIED on 104 pairs), and the one coordinate that does split has limit +infinity; the row lands as WALL-ADDRESS plus the identity that the submultiplicativity defect is the Overshoot slack.
-->

*2026-08-19. IMPORT-MAP row 9, targeting TODO 1d. Pre-registration:
`research/history/staging/import-interp-prereg.md`, committed alone before any
producer existed. Producers: `research/import-interp-01-bgt-defect.js`
(0.1 s, `code-sha256 6a8cd602`, `out-sha256 7f798666`, formal embed, eight
numbered readings) and `research/import-interp-02-correction.js` (0.1 s,
`code-sha256 0026124e`, `out-sha256 b2e1a1a6`, formal embed, nine numbered
readings). Legend as in `research/sift-limit-attack.md`: **[PROVEN]** published
theorem or a proof given here; **[VERIFIED]** checked computationally here;
**[MEASURED]** empirical, finite range; **[INFERRED]** deduction from sourced
facts.*

---

## 0. The verdict, up front

> **BGT's random machine does not reach the object, and its own closing step
> does. The row lands as WALL-ADDRESS plus one reframing that is worth more than
> the machine was: the submultiplicativity defect is an IDENTITY on the
> Overshoot slack, so the whole of TODO 1d's live lead is a statement about the
> log correction in `G₂` and about nothing else.**
>
> 1. **BGT closes on hypothesis H1, and the failure is countable.** The
>    interpolation needs a ground set that splits as a disjoint union. In the
>    coordinate the exponent lives in, `u = ln x`, additivity is `x = st`, and
>    the constraint set is the primes `≤ st`. `π(st) − π(s) − π(t)` is zero at
>    **no** pair with `st ≥ 25`, never negative, minimum 2, maximum 12 at
>    `(5, 15)`. An interpolation path would have to create up to twelve
>    constraints from nothing. **[VERIFIED, 104 pairs]**
> 2. **The one coordinate that does split is worthless, which is the same
>    obstruction a second time.** In `n = π(x)` the disjoint-union structure is
>    real and Fekete needs no error term at all, and its limit is `sup L_n/n`,
>    carried to `14.2000` at `n = 20` and equal to `+∞` for every `β > 1`.
>    `π(x) ≍ x/ln x` is not linear in `ln x`, so the coordinate that composes and
>    the coordinate the exponent lives in are separated by an exponential.
>    **[VERIFIED]**
> 3. **The defect is an identity on the slack.**
>    `D(s,t) = ln Ĝ(st) − ln Ĝ(s) − ln Ĝ(t) = S(s) + S(t) − S(st)` with
>    `S(x) = ln(x²/Ĝ(x))`, to `8.88e−16` at all 104 pairs. The linear part of `S`
>    cancels identically, so the candidate is a statement about the SUBLINEAR
>    part of `ln G₂`. **[PROVEN, one line; VERIFIED]**
> 4. **TPC-implication is one inequality against a column the corpus already
>    keeps.** `ln C < ln(x_next²/Ĝ(x))`, which tops out at `1.3946` on integer
>    bases and `1.5041` on real ones. So "with any explicit constant the
>    candidate is TPC-implying" is not right as written, and the corrected form
>    is sharper and time-dependent: the threshold RISES as the ladder grows.
>    **[INFERRED, from VERIFIED ingredients]**
> 5. **The near-Fekete route is OPEN and IDLE.** BGT's own Proposition 5, which
>    they attribute to de Bruijn and Erdős, covers a defect growing like
>    `O(u^α)`. After calibration the reachable range supports a BOUNDED defect,
>    which Fekete already handles, and the relaxation inherits the explicitness
>    trap exactly. **[MEASURED, three ladders and two synthetic nulls]**

---

## 1. The theorem, and the five hypotheses

Read at source this pass, statement included, **[SOURCED, verbatim, Appendix B
read as page images]**: Bayati, Gamarnik and Tetali, *Combinatorial approach to
the interpolation method and scaling limits in sparse random graphs*, *Ann.
Probab.* 41 (2013) 4080–4115, full text as arXiv:0912.2444v3, 37 pages.

The machine, in the paper's own words. The model is
`H(𝔾) = sup_{x∈[q]^N} H(x)` with
`H(x) = Σ_{i∈[N]} H_i(x_i) + Σ_{e∈E} H_e(x_e)` on a hypergraph `𝔾 = ([N], E)`.
The interpolating ensemble `𝔾(N, ⌊cN⌋, r)` is built by: "The first `r`
hyperedges `e_1,…,e_r` are selected u.a.r. from all the possible directed
hyperedges", and "For each `j = r+1,…,⌊cN⌋`, with probability `N_1/N`, `e_j` is
generated independently u.a.r. from all the possible hyperedges on nodes `[N_1]`,
and with probability `N_2/N`, it is generated u.a.r. from all the possible
hyperedges on nodes `[N_2]`." Proposition 2 is monotonicity in `r`, Theorem 5 is
the resulting super-additivity
`𝔼[H(𝔾(N,⌊cN⌋))] ≥ 𝔼[H(𝔾(N_1,ℳ_1))] + 𝔼[H(𝔾(N_2,ℳ_2))]`, and the closing step
is: "Namely the sequence `𝔼[H(𝔾(N,⌊cN⌋))]` is 'nearly' super-additive, short of
the `O(√N)` correction term. Now we use Proposition 5 in Appendix B for the case
`α = 1/2` to conclude that the limit … exists."

The five hypotheses, in the order they bind:

| | hypothesis | what it is for |
|---|---|---|
| H1 | additive ground set, `[N] = [N_1] ⊔ [N_2]`, model restricts | there is an `a_{N_1} + a_{N_2}` to write |
| H2 | hyperedges u.a.r. and independent, hence exchangeable | the parameter `r` indexes DISTRIBUTIONS, so a path exists at all |
| H3 | local objective over a fixed alphabet `[q]` | the convexity step compares empirical types |
| H4 | bounded differences in one hyperedge | `𝔼[H]` becomes `H` w.h.p. |
| H5 | fixed density `⌊cN⌋` | both halves are members of the same sequence |

**And Appendix B, verbatim, which is the half of the paper that matters here:**

> "To keep the proof of our main results self-contained, we state and prove the
> following proposition, used in proving several of the theorems presented in the
> earlier sections. However, Béla Bollobás and Zoltan Füredi kindly pointed out
> to us that the following proposition is a special case of a more general and
> classical theorem of de Bruijn and Erdös (see Theorem 22 on page 161 in [12]),
> which uses a weaker assumption on the additive term in the near
> super-additivity hypothesis; also see [11] and the Bollobás–Riordan percolation
> book [7] for more recent applications of this useful tool."
>
> "PROPOSITION 5. *Given* `α ∈ (0,1)`, *suppose a nonnegative sequence* `a_N`,
> `N ≥ 1` *satisfies* (24) `a_N ≥ a_{N_1} + a_{N_2} − O(N^α)` *for every*
> `N_1, N_2` *s.t.* `N = N_1 + N_2`. *Then the limit* `lim_{N→∞} a_N/N` *exists.*"

References [11] and [12] are de Bruijn and Erdős, *Some linear and some quadratic
recursion formulas*, I, Indag. Math. 13 (1951) 374–382, MR0047161, and II, Indag.
Math. 14 (1952) 152–163, MR0047162.

**The task asked whether determinism kills the interpolation and, if so, what the
deterministic toolbox offers instead. The paper answers both in one paragraph:
its closing step already IS the deterministic toolbox, and the authors say so.**
Proposition 5 needs only `a_N ≥ 0`, `α ∈ (0,1)`, and (24) at every split. No
ensemble, no exchangeability, no Gibbs measure.

**Sign conversion, recorded so it is not a gap.** Our object is sub-additive and
BGT's is super-additive. Set `a_N = C·N − b_N`, admissible when `b_N ≤ C·N` for
an a priori `C`, and here `b_N = g(u) = ln Ĝ(e^u)` with the proven sifting
exponent `β₂ = 4.26645028414864191641` as the a priori bound
(`research/dhr-verification.md` row 1a).

---

## 2. Which hypothesis our object violates, named

**H2 fails on the deterministic object and is repairable; H1 fails on both and
is not.**

`G₂(x#)` is one number, not an expectation, so there is no `r`-path: H2 is dead
on arrival. The map's row-9 phrasing anticipated this and routed to the rotation
ensemble, which is a genuine random model with i.i.d. uniform offsets per prime,
and that does repair H2. It does not repair H1, and H1 is the one that bites.

**H1 in coordinate A.** The exponent is `β = lim g(u)/u` with `u = ln x`, so the
additive size is `ln x` and the split is `x = st`. The model at `x` is the primes
`≤ x`, one constraint each. H1 asks for `π(st) = π(s) + π(t)`. Measured over the
104 reachable integer pairs: `Δπ = π(st) − π(s) − π(t)` is **never** zero at a
pair with `st ≥ 25`, never negative, minimum 2, maximum **12** at `(5, 15)`, with
`(7, 11) → 77` and `(8, 9) → 72` both at 12. **[VERIFIED]** At `(8, 9)` the split
pair carries eight constraints where the joint object carries twenty, and the
missing twelve are not something an interpolation creates. This is
`import-maxplus.md` §3d in a countable form: multiplying moduli names a third
prime set.

**H1 in coordinate B, where it holds.** Disjoint prime sets do compose, `L` is
super-additive on them (`attack-L-subadditivity.md` §1, PROVEN), and the
rotation ensemble over `P ⊔ Q` is the product of the ensembles over `P` and `Q`.
So on the rotation ensemble, in `n = π(x)`, H1 and H2 both hold and no error term
is needed at all. What Fekete then delivers is `lim L_n/n = sup L_n/n`, and the
ladder carries `L_n/n` to **14.2000** at `n = 20`, with `L ≍ x^β/6` and
`n ≍ x/ln x` making the supremum `+∞` for every `β > 1`. **[VERIFIED]**

**One obstruction, seen twice.** `π(x)` is not linear in `ln x`. The coordinate
that composes and the coordinate the exponent lives in are separated by an
exponential, so no Fekete-shaped lemma bridges them, and BGT's machine cannot
be aimed at the exponent by any change of the size parameter. **[INFERRED]**

*(A prediction that missed, recorded: the prereg said `L_n/n` would be increasing.
It is not even non-decreasing — it falls across the `x = 41` flat spot. The
substance survives, since the supremum is unbounded either way.)*

---

## 3. The identity, which is the row's real payoff

Since `g(u) = 2u − S(e^u)`,

> **`D(s,t) := ln Ĝ(st) − ln Ĝ(s) − ln Ĝ(t) = S(s) + S(t) − S(st)`,
> `S(x) = ln(x²/Ĝ(x))`. [PROVEN, one line]** Verified to `8.88e−16` at all 104
> reachable pairs. **[VERIFIED]**

Three consequences, and the third is the useful one.

**The candidate is a statement about the Overshoot slack.** `Ĝ(st) ≤ C·Ĝ(s)Ĝ(t)`
is exactly "`S` is super-additive up to `ln C` on the multiplicative semigroup".
The Budget's own column is the object the candidate constrains.

**The linear part cancels identically.** Writing `S(u) = (2−β)u + s(u)`, the
`(2−β)` term drops out of `D`. So the candidate says nothing about `β` and
everything about the sublinear remainder, which is the log correction in `G₂`.
Under any law `Ĝ ∼ c x^β (ln x)^δ` this is `D = −δ ln(u₁u₂/(u₁+u₂)) − ln c`,
bounded above for every `δ ≥ 0` and tending to `−∞` along the diagonal when
`δ > 0`. **The candidate is therefore true for cheap reasons under every law this
corpus entertains; its truth was never the hard part.**

**The object whose super-additivity is wanted has an unproven positivity.**
`S(x) > 0` for all `x` is `G₂(x#) < x²`, which is the Zone Postulate
(`ZONE-POSTULATE.md` §3). **[INFERRED]**

---

## 4. The TPC threshold is the slack column, term by term

Iterating the candidate from a base `x` gives `β ≤ (ln C + ln Ĝ(x))/ln x`, so

> **the candidate with an explicit `C` gives `β < 2` at base `x` if and only if
> `ln C < S(x)`; with a real base pushed to `p_next⁻`, if and only if
> `ln C < ln(p_next²/Ĝ(p))`.** **[PROVEN, given the candidate]**

Measured maxima over the ladder: **1.3946** on integer bases (`b = 66`) and
**1.5041** on real bases (just below 3). **[VERIFIED]**

**The stated candidate and the evidenced candidate are different statements.**
`import-maxplus.md` §4 states it "for all real `s, t ≥ 2`" and tests integer
pairs. `Ĝ` is constant on `[p, p_next)`, so the real form admits `s → p_next⁻`
and its supremum can only rise. Reachable sup `R`, both forms, by domain floor:

| floor `s₀` | integer sup `R` | real sup `R` | real `ln C` |
|---|---|---|---|
| 2 | 2.9333 | **7.5000** | 2.0149 |
| 3 | — | 5.6667 | 1.7346 |
| 5 | 2.7738 | 4.9167 | 1.5926 |
| 7 | 1.5533 | **1.9000** | 0.6419 |
| 11 | — | no evaluable pair | — |

**[VERIFIED]** The floor-2 real value `7.5` comes from `s, t ∈ [2,3)` with
`st ∈ [7,9)`, i.e. `30/(2·2)`, a legitimate instance of the statement as written.

**Only one direction of the resulting ceiling table is sound.** Every sup is
taken over the reachable range and is therefore a LOWER bound for the true `C`,
so a ceiling built from it is a lower bound for the true ceiling. "Ceiling `≥ 2`"
is a conclusion; "ceiling `< 2`" is the optimistic reading and is not
established.

| floor | real `ln C` | best base | `β ≤` | TPC-implying? |
|---|---|---|---|---|
| 2 | 2.0149 | `79⁻` | 2.1394 | no, soundly |
| 3 | 1.7346 | `67⁻` | 2.0737 | no, soundly |
| 5 | 1.5926 | `67⁻` | 2.0399 | no, soundly |
| 7 | 0.6419 | `67⁻` | 1.8138 | only optimistically; two interval pairs cannot bound `C` |

**[VERIFIED]** The prereg predicted every floor `≥ 5` would clear. Floor 5 gives
2.0399 and does not. **P5: MISS.**

**A suspicion this pass raised and then killed, recorded as killed.** The prereg
guessed that `import-maxplus.md` §4's "1.8992 at the best base of any kind" mixed
a real base with an integer constant. It does not. The best INTEGER base is
`b = 16` and it gives **1.8992** to four places, exactly as the record's own
parenthetical ("a base just below a prime is sharpest") predicts. The record is
internally consistent and needs no repair on that line. **[VERIFIED]**

**What does need one sentence of repair** is the domain. The candidate should be
stated for INTEGER `s, t`, which is the statement its evidence covers, which has
`ln C = 1.0761` and therefore clears the threshold, and which already carries the
payoff: `Ĝ` is a step function, so limit existence along the integers gives it
along the reals. **[INFERRED]**

**And the corrected trap statement is time-dependent, which the record's was
not.** "With any explicit constant the candidate is TPC-implying" is not right as
written. The correct form is `ln C < ln(x_next²/Ĝ(x))` at some `x` the ladder
knows, and that threshold RISES with the ladder. A constant just above today's
value becomes TPC-implying as soon as the ladder reaches a base whose column
entry passes it. **The constant-free requirement is a statement about where the
ladder stops, not a permanent barrier.** **[INFERRED]**

---

## 5. Which correction term the data supports, calibrated first

The question the near-Fekete route turns on: does the defect stay bounded (plain
Fekete, constant `C`) or grow like `u^α` (BGT Prop 5 / de Bruijn–Erdős)?

**The instrument.** The diagonal `D(√x, √x)` is useless here: the largest `√x`
any available ladder offers is **16.46**, so it compares an asymptotic argument
with a pre-asymptotic one. The instrument with range is the FIXED-`s` SLICE, `s`
held small and `t` running the ladder, which under any law
`F ∼ c x^β (ln x)^δ` obeys `D(s,t) = δ ln((a+u)/(au)) − ln c` with `a = ln s`:
bounded, converging, slope against `ln u` equal to `−δa/(a+u) → 0⁻`.

**Two synthetic nulls, because the estimator had to be calibrated before it was
believed.** `POW = c·p^1.216` has a defect that is EXACTLY CONSTANT in the
continuous limit, true slope zero. `LOG = c·p·(ln p)²` has one that genuinely
decreases. Both sampled at the same primes and stepped the same way.

| ladder | slices | positive slope at 1σ | min slope | max slope | sup `D` (floor 7) |
|---|---|---|---|---|---|
| `POW` (true slope 0) | 6 | **6** | +0.0584 | +0.1845 | 0.7793 |
| `LOG` (true slope < 0) | 6 | 0 | −0.7616 | −0.1513 | 3.2488 |
| `h` = A048670, 58 terms | 6 | 6 | +0.1920 | +0.4854 | 0.9478 |
| `h2` = A288815, 21 terms | 4 | 0 | −0.6168 | +0.0826 | 1.0055 |
| `G₂`, 22 terms | 4 | 2 | +0.1574 | +0.3516 | 0.6419 |

**[MEASURED]**

**The reading.** Taken at face value the slice slopes say the defect GROWS on
`G₂` and on the control, which would make Fekete-with-a-constant FALSE. The null
refuses that: `POW`, whose defect is constant by construction, reads +0.06 to
+0.18 with 6 of 6 slices positive at 1σ, purely from step sampling. A positive
slice slope of that size is what a bounded defect looks like on this instrument.
The instrument is not blind, which is what makes the null usable: `LOG` reads
−0.15 to −0.76 on all six slices and carries sup `D = 4.2183` against `POW`'s
`0.7793`. `h`, `h2` and `G₂` all sit with `POW` on both statistics and nowhere
near `LOG` on either.

> **The reachable range supports a BOUNDED defect: the correction term is `O(1)`
> and plain Fekete is the right shape.** **[MEASURED]**

**Two riders, both load-bearing.** The measurement cannot EXCLUDE growth slower
than the artifact, so "bounded" is a supported reading and not a demonstrated
fact. And the control does not look like its own conjectured asymptotic law on
the reachable range: Maier–Pomerance's `h ∼ c p (ln p)^{2+o(1)}` is literally the
`LOG` row, and A048670 reads with `POW` instead. That is
`research/exponent-control.md`'s +0.28 finite-range bias in a second coordinate,
arrived at here independently, and it is the reason no growth reading on `G₂` is
believable. **[MEASURED]**

*(Prereg P7 predicted negative control slopes. Zero of six are negative at 1σ.
**MISS on the sign, HIT on the substance**, reached through the null rather than
through the slope, which is the outcome the calibration rule exists to produce.)*

---

## 6. Does the near-Fekete relaxation escape the trap? No, by the same arithmetic

Halving from a base `u₀ = ln x` under `D ≤ K u^α` gives

> `β ≤ g(u₀)/u₀ + K·u₀^{α−1}/(2^{1−α} − 1)`, so `β < 2` at base `x` if and only
> if `K·u₀^α/(2^{1−α} − 1) < S(x)`. **[PROVEN]**

Halving also needs every intermediate size above the domain floor, so the base
must be at least `s₀²`. Admissible `K`, best base over the ladder:

| `α` | best base | `S(x)` | `K` must be below |
|---|---|---|---|
| 0.25 | 59 | 1.2819 | 0.6151 |
| 0.50 | 59 | 1.2819 | **0.2630** |
| 0.75 | 59 | 1.2819 | 0.0845 |
| 0.90 | 59 | 1.2819 | 0.0260 |

**[VERIFIED]** At base 79 with `α = 1/2` the bound is **0.2565**, which is the
prereg's hand-computed number to four places. **P6: HIT.**

Both forms are inequalities against the SAME slack column. So an explicit error
function of BGT's shape is TPC-implying by exactly the arithmetic that makes an
explicit constant TPC-implying, and the prize is unchanged: **limit existence
with no named error, of any shape.**

And after the calibration of §5, the relaxation is not even needed. A bounded
defect is `O(v^α)` for every `α > 0`, so Proposition 5 covers it and returns
precisely what Fekete already returned. **The near-Fekete route is AVAILABLE and
IDLE. It would earn its keep only if the defect grew, and nothing survives the
null that says it does.** **[INFERRED, from MEASURED ingredients]**

---

## 7. What is open, in the form worth attacking

> `β = lim ln G₂(x#)/ln x` **EXISTS** if `S(x) = ln(x²/G₂(x#))` is super-additive
> up to a bounded error on the multiplicative semigroup of integers `≥ 2`, **with
> the error never named.**

This is the same lead TODO 1d already carries, restated through §3's identity,
and the restatement is worth having for three reasons. The linear part cancels,
so the target is the log correction alone and not the exponent. The error may
now grow like `u^α` and still suffice, by BGT Prop 5 / de Bruijn–Erdős Theorem
22, which widens the class of provable inequalities even though the data says the
widening is idle. And the naming constraint is now a checkable inequality against
a column the corpus already keeps, rather than a blanket prohibition.

---

## 8. Prereg scorecard

| | prediction | outcome |
|---|---|---|
| P1 | `Δπ > 0` at every pair with `st ≥ 25`, max in [10, 18] | **HIT** (0 zeros, max 12 at `(5,15)`) |
| P2 | identity `D = S+S−S` to `1e−12` | **HIT** (`8.88e−16`) |
| P3 | `L_n/n` increasing, above 14 at `n = 20` | **MISS** as worded (falls at `x = 41`); 14.2000 lands |
| P4 | real sup `R` = 7.5 at floor 2, 1.9 at floor 7 | **HIT**; the floor-5 side-guess (`≤ 2.6`) **MISS** (4.9167) |
| P5 | every floor `≥ 5` TPC-implying at base 79 | **MISS** (floor 5 gives 2.0399) |
| P6 | `K < 0.2565` at `α = 1/2`, relaxation buys nothing | **HIT** on both |
| P7 | control slopes negative at 1σ, `O(1)` correction | **MISS** on sign (0 of 6), **HIT** on the correction via the null |
| extra | the record's 1.8992 mixes coordinates | **the suspicion was WRONG**; `b = 16` is an integer base |

Four hits, three misses, one killed suspicion. The three misses are all
predictions about SHAPE that the data corrected, and two of them (P5, P7) changed
the record's conclusions rather than decorating them.

---

## 9. NOT REACHED

- **No proof of the candidate, in any form, and no counterexample.** The pairs
  that would decide it need both arguments large and the ladder has none.
- **No bound on the true `C`.** Every constant here is a reachable sup and
  therefore a lower bound. At floor 7 the reachable sup rests on two interval
  pairs.
- **No reading on whether `S(x)` is bounded.** Its positivity is the Zone
  Postulate and is untouched here.
- **The rotation ensemble's own exponent was not measured.** Row 9's map entry
  offers "a theorem about the ensemble's exponent" as a fallback payoff; §2 shows
  H1 fails there too in coordinate A and the coordinate-B limit is `+∞`, so
  the fallback was not pursued past that point.
- **de Bruijn–Erdős Theorem 22 itself was not opened.** It is cited here exactly
  as BGT cite it, with BGT's own characterisation of what it weakens, and the
  bibliographic record (Indag. Math. 14 (1952) 152–163, MR0047162) is theirs.
  **[SOURCED-BIB]**
- **The `4.26645 → 2` gap is untouched.** Nothing here bears on it.

---

## 10. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/import-interp-01-bgt-defect.js` | H1 in both coordinates, the identity, the defect by domain floor, the TPC threshold column (§2, §3, §4) |
| `research/import-interp-02-correction.js` | the two synthetic nulls, the fixed-`s` slices on three ladders, the near-Fekete admissible `K` (§5, §6) |
| `research/history/staging/import-interp-prereg.md` | the pre-registration, committed alone before either producer existed |
| `research/history/staging/import-maxplus.md` §3, §4 | the candidate, the integer-pair evidence, the stratification |
| `research/gate-multiplies.md` §5 | the Overshoot Budget's slack column |
| `research/exponent-control.md` §1, §3 | the control, its 58 terms, and the +0.28 finite-range bias |
| `research/exponent-control.js` | `A048670` and `A288815`, quoted verbatim |
| `research/dhr-verification.md` row 1a | `β₂ = 4.26645028414864191641`, the a priori linear bound |
| `research/ZONE-POSTULATE.md` §3 | the weak form's equivalence with TPC |
| Bayati–Gamarnik–Tetali, *Ann. Probab.* 41 (2013) 4080–4115 (arXiv:0912.2444v3) | the interpolation construction and Proposition 5 |
| de Bruijn–Erdős, Indag. Math. 13 (1951) 374–382 and 14 (1952) 152–163 | the general near-super-additivity theorem BGT reduce to |

Reproduce with `node research/qc/embed.js --check
research/import-interp-01-bgt-defect.js` and `node research/qc/embed.js --check
research/import-interp-02-correction.js`; both fingerprints match as of
2026-08-19.
