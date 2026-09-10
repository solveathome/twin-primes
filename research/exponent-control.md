# The exponent of G2, measured against a control that knows the answer

<!-- ledger
id: Q-exponent-control
status: PARTIAL
todo: none
question: What is the growth exponent of G2, measured against a control that knows its own answer?
verdict: MEASURED 1.50 +/- 0.05 stat on 22 trusted terms after control correction, systematic unquantified; the raw fit's bias grows and sticks at +0.28, exponent 2 stays disfavoured but is not excluded, and the question is bias-limited rather than data-limited.
-->

*(2026-08-17. Script: `research/exponent-control.js`. Every number below is in
that file's pasted output and reproduces in about a second.)*

## What is hard here, first

The question is what exponent governs G2(x#), and the honest obstacle is not
that our ladder is short. It is that **the estimator does not work at these
sizes, and we can prove it does not, because the same estimator run on
fifty-eight terms of an object whose answer is known reports 1.282 when the
truth is 1.**

That is the whole content of this note. Everything else follows.

## The control

The ordinary Jacobsthal h(p#) is our object one dimension down. Iwaniec 1978
proves exponent at most 2; Maier and Pomerance conjecture p·(log p)^{2+o(1)},
so exponent 1 + o(1); Erdos 1962 is the ancestor and Holt's 1402.1970 tabulates
it as the maximum gap in the cycle. OEIS A048670 carries 64 terms, out to
p = 311 (58 on the entry face; the b-file tail a(59)..a(64) is Bozek's,
single-witness, adopted 2026-08-20 after an exact 58/58 overlap check — the
calibration fits of §1 to §4 are index-pinned to the first 58, and §5's
22-term refit reads its control off the full 64). The two-class objects are
Ziller and Morack's adversarial paired Jacobsthal h2 (A288815, 21 terms, out
to p = 73) and our own G2 — 12 exact custody terms out to p = 37, extended to
22 trusted terms out to p = 79 by the adopted A144311 ladder
(`research/a144311-full-ladder.js`, series rule of 2026-08-20) — with G2 ≤ h2
at every shared term.

**None of the objects is ours except G2.** The reduction "h2(n) < p_n² − p_n
implies TPC" is Ziller and Morack's, 2017.

Custody: the h/G2 ratio row of PRIOR-ART.md, the nineteen U-FRAME §6a margins,
the four THE-DIALS §2 margins, and A288815 = 6·A072753 + 6 all reproduce digit
for digit, and so do the three pilot numbers on record, 1.191, 1.282, 1.801.

## 1. The bias does not shrink. It grows, then sticks at +0.28.

Sliding windows of every width, over all 58 control terms, true exponent 1:

| width | windows | mean | sd | min | max | bias |
|---|---|---|---|---|---|---|
| 10 | 49 | 1.262 | 0.094 | 1.126 | 1.549 | +0.262 |
| 12 | 47 | 1.267 | 0.086 | 1.152 | 1.470 | +0.267 |
| 19 | 40 | 1.280 | 0.058 | 1.197 | 1.415 | +0.280 |
| 21 | 38 | 1.282 | 0.053 | 1.214 | 1.400 | +0.282 |
| 30 | 29 | 1.283 | 0.036 | 1.236 | 1.349 | +0.283 |

The scatter collapses by a factor of three. The centre does not move. **The
estimator converges, and it converges to 1.28.** Nested ranges say the same
thing: 1.191 on ten terms, 1.238 on nineteen, 1.282 on fifty-six, and 1.259 on
the disjoint tail [179, 271]. There is no drift toward 1 anywhere in the data.

Two immediate consequences. The +0.19 on record is an unlucky-low draw from a
distribution centred on +0.26; the window [5, 37] sits near the bottom of it.
And the correct correction to use is the distribution mean at matched width,
which moves G2's corrected reading from 1.610 down to 1.539.

## 2. Model discrimination, and the result is mostly negative

Residual structure, not R². Sign runs against the (n+1)/2 expected under white
noise, and lag-1 autocorrelation.

**Control, all 56 terms, p in [5, 271]:**

| model | k | rms | max | runs/exp | ac1 | AIC | param |
|---|---|---|---|---|---|---|---|
| c·p^a | 2 | 0.0552 | 0.159 | 27/28.5 | 0.118 | −320.3 | a = 1.282 |
| c·p·log^a p | 2 | 0.0840 | 0.239 | 17/28.5 | 0.495 | −273.4 | a = 1.000 |
| c·p·log²p | 1 | 0.2812 | 1.239 | 6/28.5 | 0.751 | −140.1 | c = 0.134 |
| c·p² | 1 | 0.7051 | 2.141 | 2/28.5 | 0.891 | −37.1 | c = 0.028 |
| c·θ^a | 2 | 0.0442 | 0.139 | 15/28.5 | 0.584 | −345.4 | a = 1.204 |
| c·θ² | 1 | 0.8303 | 2.650 | 2/28.5 | 0.890 | −18.8 | c = 0.037 |

Read that table with the answer in hand. **The pure power law wins by 47 AIC
units, its residuals are white (27 runs against 28.5 expected, ac1 = 0.118),
and its exponent is wrong by 0.28.** The family that contains the truth loses.
So a clean power-law fit with white residuals carries no evidence about the
asymptotic exponent at these sizes, and better diagnostics do not repair it.

The Maier-Pomerance shape is worse than imprecise here, it is refuted on this
range: frozen at log², rms 0.281 and a maximum log residual of 1.239, a factor
of 3.5. As a noiseless truth it would report 1.791 over [5, 37] and 1.540 over
[5, 271]; the data reports 1.191 and 1.282. Over the whole available ladder
h(p#) tracks p·log p (which would report 1.270), not p·log²p. The o(1) is
strongly negative below p = 271.

**That refutation is of the FROZEN log² shape, and the o(1) is not static.**
`research/maxgap-law.md` §6 measures the drift directly in the extreme-value
frame: the constant `c1` in `g(p#) = c1·m1·lnD` grows like `(log p)^{0.12 ± 0.02}`
on the top 47 exact terms, which is in Maier-Pomerance's direction at a tenth of
the rate their conjecture needs. A synthetic ladder built on the same p, m1 and
lnD to have exponent exactly 1 returns 0.981 ± 0.006 from the identical
estimator, so the shortfall is a measurement and not a resolution limit. Read
together: the shape is wrong on this range and the residual drift is real,
positive, and an order of magnitude too small to be the missing log.

**Two classes, best data, h2 on 19 terms, p in [5, 73]:**

| model | k | rms | runs/exp | ac1 | AIC | param |
|---|---|---|---|---|---|---|
| c·p^a | 2 | 0.1133 | 7/10.0 | 0.066 | −78.8 | a = 1.847 |
| c·p·log^a p | 2 | 0.1129 | 9/10.0 | −0.174 | **−78.9** | a = 2.448 |
| c·p·log²p | 1 | 0.1655 | 6/10.0 | 0.498 | −66.4 | c = 1.579 |
| c·p² | 1 | 0.1648 | 8/10.0 | 0.445 | −66.5 | c = 0.577 |
| c·θ^a | 2 | 0.0875 | 8/10.0 | 0.122 | −88.6 | a = 1.712 |

**c·p^1.847 and c·p·log^2.448 p are separated by 0.1 AIC units.** Those two
hypotheses differ by a factor of x^0.85 in the limit. Nineteen terms cannot
tell them apart, and ten terms of G2 spread all seven models across 15 AIC
units with no model showing clean residuals. The honest answer to "what is the
exponent" is that this data does not determine it.

One thing the comparison does say. At matched n and matched range the frozen
quadratic loses 74.7 AIC units on the control and only **12.2** on h2. Two
classes genuinely look far more quadratic than one, on the residuals. That is a
statement about model fit at these sizes and not a measurement of the exponent:
the same comparison run on the control prefers a model whose exponent is wrong
by 0.28.

## 3. Why exponent 2 is still disfavoured, and it is not the standard error

The nominal fit gives 1.847 ± 0.035, which puts 2 at 4.4 sigma. That number is
worthless: the control's fits have nominal errors of ±0.008 around a value that
is wrong by 0.28.

The real argument is one-sided-ness. The control's bias is positive in **all
40** windows, minimum 1.197. It arises because the truth carries a positive
power of log inside it, and any positive log power biases a finite-range power
fit upward. Nothing about the two-class object suggests a negative log power.
So the bias transfers in sign even if not in size, and the true exponent lies
**below** the raw 1.847, not above it.

Two hard checks pin the readings from the other side.

- **h2 ≥ h pointwise**, verified at all 21 terms, and elementary: the adversary
  choosing two classes per prime may take the first to be the one-class
  optimum. So exponent(h2) ≥ exponent(h) = 1 + o(1). This **refutes** the
  proportional-bias correction (scale the control's bias by the ratio of fitted
  effective log powers, 0.48 → 1.98), which returns 0.67 to 0.83. It overshoots.
- **G2 ≤ h2 pointwise**, verified at all 12 shared terms, so any upper bound on
  h2's exponent is one on G2's.

## 4. The transfer done structurally, which needs no bias

Divide each maximum gap by its **exact** mean gap: M1 = p#/φ(p#) ~ e^γ·log p
for one class, M2 = p#/∏(q−2) ~ c·log²p for two. That removes the entire
sieve-dimension difference. What remains,
Q = (h2/M2)/(h/M1), is the residual cost of the second class. If Q is bounded,
h2 and h share a power exponent.

| range | n | slope of Q |
|---|---|---|
| [5, 73] | 19 | 0.329 ± 0.028 |
| [17, 73] | 15 | 0.234 ± 0.025 |
| [23, 73] | 13 | 0.200 ± 0.033 |
| [41, 73] | 9 | 0.100 ± 0.069 |

and Q turns over at the end: 2.487, 2.511, 2.473, 2.392, 2.302.

**Do not bank this.** The turnover coincides with three large upward jumps in
the denominator h at p = 67 and 71 (local exponents 2.33 and 3.17), so it is
probably numerator-denominator noise. It is a hypothesis with nine points of
weak support, and its consequence if true is large: margin growing like x/log³x.

## 5. The answer, with error bars

| reading | value | what it rests on |
|---|---|---|
| raw fit, h2, 19 terms, x-frame | 1.847 ± 0.035 (nominal) | nothing, once §1 is read |
| raw fit, G2, 22 trusted terms, x-frame | 1.777 ± 0.029 (nominal) | same |
| control-corrected, h2 | **1.57 ± 0.06** stat, systematic unquantified | equal-bias transfer |
| control-corrected, G2, 22 terms | **1.50 ± 0.05** stat, systematic unquantified | equal-bias transfer at width 20 |
| θ-frame corrected, h2 | 1.49 | equal-bias transfer, θ frame |
| θ-frame corrected, G2, 22 terms | 1.43 | equal-bias transfer, θ frame |
| hard floor | ≥ 1 | h2 ≥ h, elementary |
| proportional-bias | 0.67 to 0.83 | **refuted** by the floor |
| structural, if Q bounded | 1 + o(1) | nine weak points |

The G2 rows are the 2026-08-21 refit on the 22-term trusted A144311 ladder
(script §S11), run with the same discipline as everything above: raw log-log
slope over p in [5, 79] (n = 20, p = 2 and 3 excluded as in every fit here),
the control's bias read off its sliding windows at the matched width 20
(+0.279 over the 64-term h, sd 0.052, 45 windows; the pinned 58-term windows
give +0.281 and move the corrected reading by 0.002), and the bracket as
[corrected − 2·window-sd, raw] rounded outward. Both moves of the refit push
the central DOWN: the raw fit fell 1.801 → 1.777 where the control's own raw
fit RISES with prefix length (1.191 at 10 terms, 1.238 at 19, 1.282 at 56),
and the matched-width bias grew (+0.262 at width 10 to +0.279 at width 20).

**Central estimate 1.50 on G2's own 22 trusted terms (h2's corrected figure
stays 1.57), practical bracket 1.3 to 1.8, hard floor 1, and exponent 2
disfavoured by the one-sided bias argument rather than excluded by the
data.** Chris's ~1.6 sits inside the bracket; the bias-transfer route to it
does not.

### 5a. The certificate ladder reads lower, and most of the difference is priced

`research/two-class-lower-bounds.md` §5 runs the same control-corrected estimator
on a certified greedy covering ladder to x = 4001, 108 times further out than the
exact terms, and reads **1.11 to 1.25, falling with range**. That is the same
object: by the CRT identity of that file's §1, G2(x#) − 1 is exactly the longest
interval coverable by choosing a residue pair per prime, and the greedy emits a
verified cover. So the two numbers are one exponent read through two proxies, not
two exponents.

Two measured effects account for most of the gap between them, and they point in
opposite directions.

| effect | size | source |
|---|---|---|
| a certified lower-bound ladder biases the exponent **down**, at a 28% terminal shortfall | −0.09 | `h2-scoping.md` §5b, priced on the control |
| the exact ladders stop at x = 73 and x = 79; the control's own reading rises with prefix length, 1.245 at 22 terms to 1.282 at 56 | up to +0.04 on the short ladders | §1 |

Adding the first back gives about 1.29 from the certificates against 1.50 for G2
on trusted terms. **Quote 1.57 for h2 and 1.50 for G2, note that the long
certificate ladder reads 1.2 and that about a third of the gap is the greedy's
own downward bias, and treat the residual 0.2 as unexplained.** It is small
against the 4.2665-to-2 gap it would be used on, and it does not change any
verdict in this note: every reading, corrected or raw, sits below 2 and above 1.

## 6. Consequence for the Zone Postulate margin

Two things about how the margin must be read, then the number.

**The index convention changes the sign of the trend.** With p_{n+1}² the h2
margin trend is −0.084 ± 0.045 over [5, 73]; with p_n² it is +0.154 ± 0.035.
The two agree asymptotically and disagree at n = 19, because the OLS slope of
log p_{n+1} on log p_n is 0.88 rather than 1 on this range: consecutive
log-primes crowd together as n grows. Any margin trend quoted from a short
ladder must say which convention it uses.

**The frame mixing overstates the comfort.** U-FRAME §6a's α = 1.653 on all 21
terms is the θ frame; the same 21 terms read **1.924** against x, and the Zone
Postulate threshold p_n² is an x-frame quantity. The control's bias is +0.282
in x and +0.220 in θ. **The corrected figures below are on a different range and
the range must travel with them**: the correction is applied to the [5, 73] fit,
19 terms rather than 21, whose raw x-frame slope is 1.847 and whose raw θ-frame
slope is 1.712. Subtracting the bias there gives 1.567 in x and 1.493 in θ,
and most of the disagreement cancels. Subtracting the bias from the 21-term
figures instead would give 1.642 and 1.433, which is why the two ranges must not
be quoted in one breath. The rule that follows: a θ-frame exponent
may not be quoted against the critical exponent 2, which is an x-frame
threshold.

**The margin itself, on 19 terms instead of 4.** Against p_{n+1}², h2 gives
2.72, 4.03, 2.56, 1.93, 1.88, 2.05, 2.30, 2.14, 2.40, 2.37, 2.07, 2.12, 2.19,
2.45, 2.25, 2.36, 2.30, 2.17, 2.38. Flat at 2.2, slope +0.018 ± 0.045 over
[23, 73], **minimum 1.880 at x = 17 and never revisited**. Our G2 sits above
that at 3.2 to 4.4.

Extrapolated margin against x'², anchored at x = 73 where h2's is 2.38:

| x | a = 1.847 (raw) | a = 1.567 (corrected) | x/log³x (structural) |
|---|---|---|---|
| 10³ | 3.55 | 7.39 | 7.8 |
| 10⁶ | 10.2 | 147 | 9.8e2 |
| 10⁹ | 29.4 | 2930 | 2.9e5 |

All three grow. None is proven. **The proven bound is still exponent 4.2665
(`paper/beta2-note.md`), and the job is still to bring an exponent down to 2.**

## 7. Three things this note settles for the rest of the repo

These are the readings any other file should be using. `research/THE-DIALS.md`
§0 carries all three.

1. **The exponent is not sitting at 2, and the frozen quadratic is the model the
   residuals reject.** On G2's own ten terms the two frozen quadratics are the
   worst two of seven models, AIC −32.3 for c·p² and −25.8 for c·θ² against
   −41.5 for the best, and c·θ² has rms 0.249 with two sign runs against 5.5
   expected and ac1 0.648. A fitted constant near 0.6 is right *for that model*
   (c = 0.656), which is exactly why quoting it as a law is misleading. The
   exponent is unresolved between 1.3 and 1.8 with a central estimate near
   1.50 on G2's own 22 trusted terms (§5).
2. **The margin is flat, not drifting.** A drift read off four rows is an
   artifact of the p_{n+1} index convention plus the x = 37 outlier, whose local
   exponent of the 29 to 31 step is 4.49 against a ladder mean near 2, and the 31 to 37 step reads 2.356; x = 37 is an outlier in the c2' column (0.594 against a 0.446 to 0.500 band), not in the local exponent. On 19 terms of the dominating
   sequence the margin against x′² is flat at 2.2, slope +0.018 ± 0.045, and its
   minimum of 1.880 at x = 17 is behind us.
3. **Quote the control line.** Any exponent read off a ladder in this repo is
   reported alongside what the same estimator does to A048670, whose answer is
   known: *58 terms, true exponent 1, measured 1.282 ± 0.008, no drift.*

## 8. What would change the answer

- **More exact terms — now tested in bulk, and the prediction held.** The
  per-term prediction (measured on 48 control cases: adding one term to a
  ten-term fit moves the exponent by 0.022 on average, 0.078 at worst) said
  single terms would not move the question. The ten trusted terms x = 41..79
  adopted from A144311 moved the corrected central by −0.04, from 1.54 to
  1.50 (§5) — inside one sliding-window sd. The question is bias-limited, not
  length-limited.
- **Extending h2 past 21 terms is not available and would not help.**
  `research/h2-scoping.md` reproduces eight terms digit for digit, then prices
  the frontier from Ziller's own cost curve: term 22 costs about 3.4 months on
  this hardware and term 25 about 85 years. And the diagnostic would not become
  readable in any case, because precision was never the constraint. Sliding-window
  sd is 1.05/width, so at 19 terms it is already 0.057 against a 0.5 question.
  The constraint is bias, and on nested control prefixes the wrong model's AIC
  lead grows monotonically from a tie at 10 terms to −47.0 at 56. **There is no
  reachable ladder length at which the exponent becomes readable.** Three cheaper
  proxies were tested and all three are refuted: a head window does not exist for
  h2, since by CRT an adversarial cover can be placed anywhere; a certified
  lower-bound ladder biases the exponent down about 0.09; randomised restarts
  bias it down 0.40.
- **Deciding whether Q is bounded** would settle the exponent outright, and it
  is capped at the 19 points now available.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
