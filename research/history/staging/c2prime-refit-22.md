# The 22-term refit, and why c₂′ drifts: the control drifts the same way, and ten points cannot measure the rate

<!-- ledger
id: Q-c2prime-drift
status: PARTIAL
todo: 1c (retired)
question: Why does c2' drift on the 22-term ladder?
verdict: Class-count-blind (attack-c2drift-01 §1); on item 1c's own band x >= 41 the ten-point rate is unresolvable: c2' 0.3745 +/- 0.1411 against c1's 0.3344 +/- 0.2358 on the same primes, a difference of 0.0401 = 0.12 of the control's ten-point window sd. Whether the drift is real is NOT closed here: attack-c2drift-01 measured it at p = 0.0053 on x >= 17 and left (i)' and (ii) alive. exponent-control §2/§4/§6 refit at 22 terms.
-->

*(2026-08-28. Producer `research/history/staging/c2prime-refit-22.js`, embedded
(0.1 s, `--check` passes, 12 custody guards). Every number below is in that
file's OUTPUT block. Scratchpad-grade: no ensemble nulls are run here, and the
spreads quoted are the control column's own sliding-window distribution, not
p-values. TODO item 1c, first move.)*

## 0. First: the brief is partly wrong, and the corrections come before the work

Three premises of item 1c do not survive contact with the repo.

**The 22-term refit is not entirely undone.** `exponent-control.md` §5 was
already refit on the trusted A144311 ladder on 2026-08-21 (script S11): raw
x-frame 1.777 ± 0.029, θ-frame 1.647 ± 0.021, control-corrected central 1.498,
bracket 1.3 to 1.8. Those are the file's headline numbers and they are 22-term
numbers today. What was still at ten terms is narrower and is what this file
refits: the §2 model-discrimination table for G₂ (quoted again in §7 item 1),
the §4 structural column Qg, and the §6 G₂ margin trend.

**c₂′ is not a coefficient in a fitted exponent model.** It is a per-x ratio
column, c₂′ = G₂(x#)/(m·lnD) with D = ∏_{2<p≤x}(p−2) and m = x#/D, defined for
x ≥ 11 and given by `research/a144311-full-ladder.js`. Nothing in
`exponent-control.md`'s fits produces it. The "22-term refit of
exponent-control.md's fits" and "why does c₂′ drift" are two separate jobs, and
this file does both rather than treating one as the other.

**The mechanism question is narrower than the item implies, and it is not
settled.** `research/history/staging/attack-c2drift-01.md` (2026-08-21) already
ran it with 4000-replicate in-pass nulls and closed the twin-specific readings:
the one-class column c1 = h/(m1·lnD1) drifts the same way over A048670's 64
terms, so whatever drives the drift is class-count-blind. Its §3 then measured
the drift itself as real on x ≥ 17, b = 0.3351 ± 0.1098 with p_logn = 0.0053 and
p_EV = 0.0075 against those nulls, and left candidates (i)′ (finite limit) and
(ii) (polylog growth) both alive, declaring the data unable to decide. What that
file did not do is cut the item's own band, x ≥ 41, or calibrate a ten-point
slope estimator. Those two are here, and they leave the §3 question where it
was.

## 1. What is open, and what failed

**Open, and it cannot be closed at this ladder length (CONJECTURED).** Whether
the exponent is genuinely still moving, candidate (c). Twenty-two terms cannot
decide it, for the reason `exponent-control.md` §8 gives and this file
re-measures from a second direction: nominal error bars here understate the true
spread by a factor of 2.47 against the whole control column, and by 1.84 when the
null is built phase-matched on the post-dip range x ≥ 59 (§2).

**Failed, as a measurement (MEASURED).** The item's own band does not carry a
resolvable drift. On x ≥ 41 the c₂′ slope against ln ln x is b = 0.3745 with a
nominal se of 0.1411. The same ten-point estimator, run over all 51 sliding
ten-windows of the control column c1, has sd 0.3480 and reads **negative in 23
of 51 windows on a column that is genuinely drifting up**. c₂′'s 0.3745 sits at
rank 0.80 of that distribution, an ordinary draw. That null is built from the
whole c1 column including its descending head (x ≥ 11 slope −0.1091 ± 0.0335),
which §2's own phase argument says is not the legitimate comparison; built
phase-matched on x ≥ 59, 39 windows, the sd is 0.2602, the ratio to nominal is
1.84 rather than 2.47, and the negatives are 16 of 39 (41%) rather than 23 of 51
(45%). The conclusion survives the correction and the two quoted numbers do not.
Ten points establish nothing about a rate here, and the reader should note that
the same slope read against its nominal se alone would be 2.65 se from zero: the
choice of ruler decides the sentence, and this file has used the wide ruler
throughout without arguing for it.

**Failed, as a reading of the data.** "x ≥ 41 runs [0.4842, 0.5337], drifting
up" reads a level step as a slope. In x-order that band is 0.5123, 0.4916,
0.4842, 0.5179, 0.5059, 0.5019, 0.5337, 0.5233, 0.5188, 0.5281. It falls over
its first three terms. Leave-one-out on the ten-point slope runs 0.297 to 0.537,
so no single term carries it either.

**Weakened (MEASURED).** One sentence of `exponent-control.md` §2 comes out of
the refit less stable than it reads. "At matched n and matched range the frozen
quadratic loses 74.7 AIC units on the control and only 12.2 on h2. Two classes
genuinely look far more quadratic than one." That is a ratio of AIC penalties
against c·p^a in the same table. G₂'s penalty was 4.4 against the control's 34.9
at n = 10, which is 13%; at n = 20 it is 27.6 against 78.9, which is 35%. The
direction stands, the factor nearly tripled on ten new terms, and it should not
be quoted as a stable number.

## 2. What is established

**Nothing in the live layer needs revising (MEASURED).** The same seven models
keep the same best two and the same worst two at 22 terms as at 10, c·θ^a then
c·p^a at the top and c·p² then c·θ² at the bottom, but the middle is not
order-stable: ranks 3 and 5 swap in the table below, c·p·log²p falling from 6.3
to 23.9 while c·p·log^a p goes 8.3 to 21.0. The corrected central stays 1.50. The margin stays flat. Source
for all three: this file's §A and §B against `exponent-control.md` §§2, 5, 6.

**The model table, refit (MEASURED, n = 20, p ∈ [5, 79]).** ΔAIC is the penalty
against the best model in the same table, which is the only column comparable
across n.

| model | G₂ n=10 | G₂ n=20 | control n=10 | control n=20 | control n=56 |
|---|---|---|---|---|---|
| c·p^a | 4.8 | 9.2 | 15.2 | 16.0 | 25.0 |
| c·p·log^a p | 8.3 | 21.0 | 14.8 | 21.4 | 71.9 |
| c·p·log²p | 6.3 | 23.9 | 44.5 | 74.7 | 205.3 |
| c·p² | 9.2 | 36.8 | 50.2 | 94.8 | 308.3 |
| c·θ^a | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 |
| c·θ·log^a θ | 6.9 | 21.1 | 0.7 | 10.1 | 67.5 |
| c·θ² | 15.7 | 54.4 | 53.7 | 102.2 | 326.6 |

Fitted exponents on the refit: c·p^a gives a = 1.777, c·θ^a gives a = 1.647,
c·p·log^a p gives a = 2.250. The control at matched n = 20 gives 1.245, 1.154
and 0.696 against a truth of 1. The refit's residuals are no whiter than
before: c·θ^a has runs 9/10.5 and ac1 0.14, c·p^a has ac1 −0.31, and every
frozen form has ac1 above 0.4. The control does the same at every n, which is
`exponent-control.md` §2's point and is unchanged.

**Every form in the file survives the refit; none is killed and none is
promoted.** The spread across the seven models widens from 15.7 AIC units at
n = 10 to 54.4 at n = 20, and the control's spread widens from 53.7 to 102.2
over the same lengths, so the widening is the estimator gaining resolution
against wrong models, not the two-class object choosing one.

**The other two ten-term fits, refit (MEASURED).**

| fit | n = 10 | n = 20 (refit) | the file's h₂ row |
|---|---|---|---|
| Qg = (G₂/M₂)/(h/M₁), §4 | 0.2978 ± 0.0627 | 0.2549 ± 0.0274 | Q on [5,73] 0.3289 |
| Qg on [23, 79] | — | 0.1565 ± 0.0574 | Q on [23,73] 0.2000 |
| Qg on [41, 79] | — | 0.0473 ± 0.0711 | Q on [41,73] 0.0999 |
| G₂ margin vs p_{n+1}², §6 | −0.0806 ± 0.0469 | −0.0108 ± 0.0239 | h₂ [23,73] +0.0175 |

The two pre-refit n = 10 figures, Qg 0.2978 ± 0.0627 and margin
−0.0806 ± 0.0469, are cited to `exponent-control.md` §4 and §6 by section number
but live only in `exponent-control.js`, at lines 201 and 545: the `.md` §4 table
carries only Q on h₂ and §6 only the h₂ margin.

The tail shrinkage the file reports for h₂'s Q appears on G₂ too, and Qg's
ten-point tail slope is consistent with zero at one nominal sigma. That is not
evidence Q is bounded, for exactly the reason of §1: at n = 10 the nominal sigma
is the wrong ruler. The honest statement is that the "if Q bounded" hypothesis
is no worse supported at 22 terms than at 12.

The margin result is the one place the refit adds standing to a claim rather
than qualifying it. `exponent-control.md` §7 item 2 says the margin is flat, not
drifting, and rested that on h₂'s 19 terms because G₂ had ten ending on the
x = 37 outlier. On G₂'s own 22 terms the trend against p_{n+1}² is
−0.0108 ± 0.0239, flat and flatter than the ten-term −0.0806 ± 0.0469. G₂'s
margin over x = 41..79 runs 3.39 to 4.16 with a minimum of 3.386.

**The mechanism, phase-matched (MEASURED).** Both columns are U-shaped in x,
and the dips sit at different x: c₂′'s minimum is at x = 29 (0.4463), c1's is at
x = 59 (0.3359), which is also the global minimum of all 64 control terms. So on
a matched x-range the head-to-tail steps have opposite signs, and that is a
phase artifact, not a disagreement: c1 is still descending where c₂′ has already
turned. The c₂′ anchor is weak: c₂′(13) = 0.4469 against c₂′(29) = 0.4463 is a
gap of 0.03 of that column's own sd, so which of the two is the minimum is not
resolved by the data. The comparison that matches phase is post-dip slope against post-dip
slope.

| column | window | n | b per ln ln x |
|---|---|---|---|
| c₂′ | x ≥ 41 (the item's band) | 10 | 0.3745 |
| c1 | x = 41..79, same ten primes | 10 | 0.3344 |
| c1 | x ≥ 59 (post-dip) | 48 | 0.1553 |
| c1 | x ≥ 101 | 39 | 0.1524 |

The gap between c₂′'s ten-point band and c1's long post-dip lever is 0.2192,
which is 0.63 of the control's ten-point window sd, 0.84 of the phase-matched
0.2602, and 1.53 nominal σ. On the same ten primes the gap is much smaller:
0.3745 against 0.3344 is 0.0401, which is 0.12 of that window sd. **The two
rates are indistinguishable at this length on either pairing, and the 0.63
belongs to the long-lever pair, not to the matched one.**

**Candidate (b) is excluded for c₂′ by construction (PROVEN, trivially).** c₂′
divides by the exact finite product m·lnD, never by its Mertens asymptotic, so
no (ln ln) remainder is left in the normaliser. The size of what an asymptotic
normaliser would have injected is printed: the exact/asymptotic ratio moves
2.477 → 2.040 across x = 11..311, and none of that motion is in c₂′. Candidate
(b) remains live for the exponent fits, where it is precisely what the control's
+0.279 bias prices.

**Candidate (a), finite-size bias of the estimator, is what this band's data is
consistent with (MEASURED).** The control drifts the same way, at a rate this
ladder cannot separate from c₂′'s. `attack-c2drift-01.md` §1 found the drift
class-count-blind; its §3 measured it significant on x ≥ 17 and left two
object-level candidates alive, and this file does not touch that. What this file
adds is narrower: on item 1c's own ten-point band x ≥ 41 the rate is
unresolvable, which is a statement about that band, not about the drift.

## 3. The verdict

**Item 1c does not close here. What closes is one half of it: the drift is
class-count-blind and its rate is unmeasurable on the item's own band x ≥ 41.
MEASURED, not proven. Whether the drift is real stays where
`attack-c2drift-01.md` §3 left it, significant at p_logn = 0.0053 on x ≥ 17 with
(i)′ and (ii) both alive.** The refit changes no live number in
`exponent-control.md`; it qualifies one sentence of §2 and adds 22-term standing
to §7 item 2. The only genuinely new content is negative: on x ≥ 41 the
ten-point drift estimator has a true spread 2.47 times its nominal error against
the whole control column, 1.84 times phase-matched, and reads the wrong sign 45%
of the time on the whole column and 41% phase-matched on a column known to be
drifting, so the [0.4842, 0.5337] band supports a level step against the custody
band (+0.0465, 5.20 nominal sigma with x = 37 excluded from both) and does not
support a rate.

No new exponent rule is fitted here. `REFUTED.md` rows 28, 31 and 75 stand
untouched: extending h2 past 21 terms is still withdrawn, the proportional-bias
correction is still refuted, and no single exponent is quoted for a curve.

## 4. What would falsify this, and whether that check has run

- **"The two post-dip rates are indistinguishable" is falsified by more c₂′
  terms.** At n = 18 the c₂′ grid had 92.8% power against a true s = 0.30 drift
  (`attack-c2drift-01.md` §2); on the ten-point band alone the control's window
  sd of 0.3480 says the power against a 0.22 rate difference is near nothing.
  The check that would decide it is A144311 past x = 79. **Not run, and 47# is
  parked to paper phase.**
- **"The drift is class-count-blind" is falsified if c1 saturates while c₂′
  climbs through.** `attack-c2drift-01.md` §5 designed that test and it needs
  A048670 terms past p = 311. **Not run; no one has computed them.**
- **"The refit changes no live number" is falsified by any reading in
  `exponent-control.md` §§2, 5, 6 that this file's tables contradict.** Checked:
  twelve custody guards reproduce the file's pinned figures (1.282/−320.3 on the
  control, 1.801/−36.7 on G₂ at ten terms, 1.847 ± 0.035 on h₂, 1.777 ± 0.029
  and 1.647 ± 0.021 on the 22-term refit) before any new number prints. **Run,
  passed.**
- **"Candidate (b) is excluded for c₂′" is falsified if any producer computes
  c₂′ from an asymptotic m or lnD.** Checked in `a144311-full-ladder.js` line 61
  and `attack-c2drift-01.js`'s `frame()`: both use exact log-sums over the
  prime list. **Run, passed.**
- **Not checked, and it should be flagged.** Nothing here re-verifies the eight
  single-witness A144311 terms a(15)–a(22) or the six single-witness Bozek c1
  terms a(59)–a(64). Every §2 conclusion above rests on them. In-house
  verification remains the paper-phase deliverable it already was.

## Defects noticed in passing

- `research/exponent-control.md` §5 says "practical bracket 1.3 to 1.8" while
  §5's own table row and `exponent-control.js` READING 13 say "practical bracket
  1.3 to 1.9". The script's S11 block resolves it to 1.3 to 1.8 for the 22-term
  refit and 1.3 to 1.9 for the superseded ten-term reading, so the READINGS
  block carries the old bracket. One line, no consequence for any number.

---

*This is a history/staging record: a process document, superseded-in-place by
later work. The live claims travel with the producer's READINGS block.*
