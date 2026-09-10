# The @31 σ calibration gap closed: seven known-truth control draws at the level of the detection, both statistics run

<!-- ledger
id: Q-sigma31-calibration
status: ANSWERED
todo: none
question: Is the sigma behind the @31 X-channel detection calibrated at @31 itself?
verdict: Calibrated at its own level for the first time: seven known-truth control draws give sigma_true/sigma_reported = 1.127 at the point, 95 percent bracket [0.745, 2.293] (pooled with the earlier draws, [0.772, 1.664]), which restates the detection at z = -2.06 under the point calibration and closes both T2.b findings; the detection weakens rather than dies.
-->

*(2026-08-21. Closes the two §T2.b findings of
[redteam-0820-empirical.md](redteam-0820-empirical.md): the level carrying the
offset's one detection (z = −2.32 at @31) had ZERO known-truth control draws
(SEEDS 31:[] in the producer), and the control statistic (J_ctrl − J_line)
cancels level-scale arithmetic fluctuation that the test statistic does not.
Producer, formally embedded (5519.5 s):
`research/attack-sigma31-01.js` — seven fresh random-mask draws AT @31, built
by the identical construction and statistic pipeline as the ≤@29 draws of
`research/attack-x-offset-02-profile.js`, scored with BOTH the cancelling and
a non-cancelling statistic. Every figure below is from that file's OUTPUT
block or one-line arithmetic on figures in it, inputs shown. The @37
pre-registration [xchan-at37-offset-prereg.md](xchan-at37-offset-prereg.md)
is SEALED at `0a7dd73`: nothing here touches anything it scores — this pass
calibrates the INSTRUMENT, and tensions are reported, not edited.)*

## Verdict

**The slot-clustered σ at @31 is now calibrated at @31 itself: seven
known-truth draws give σ_true/σ_reported = 1.127 at the point, 95% bracket
[0.745, 2.293] (pooled with the ≤@29 draws: [0.772, 1.664]) — the registered
factor-[0.65, 2.0] bound measured at the wrong levels is replaced by one
measured at the right one. At the point calibration the @31 detection
WEAKENS, z = −2.32 → −2.06, and it does not resolve inside the bracket
(−1.01 to −3.12); a 3σ reading requires r < 0.775, which the bracket
contains. And the red team's second flaw is now a measured number: the
cancelling control form removes a level-scale arithmetic term of 82.2σ_slot,
common to every draw, so the controls calibrate the SAMPLING σ only.** The
offset stays exactly what `item-x-offset.md` §1 called it — one 2.3σ-scale
sighting — now with its σ bounded at the level that carries it, and @37
remains the decider. Specifics:

1. **[MEASURED] The seven @31 draws: z_A = 0.75, 0.39, 1.37, −0.62, −0.82,
   −1.91, 1.25.** All inside 2σ of truth (E3 holds with margin), mean 0.058
   (the estimator is unbiased at random-mask truth), sd 1.215,
   Σz² = 8.888 ~ χ²₇ — fully consistent with a correctly-scaled σ, and
   equally consistent with a σ understated by up to the bracket's edge.
2. **[MEASURED] The construction is certified identical, not similar**: all
   seven ≤@29 draws of producer 02 reproduce to the printed digit (N, J_ctrl,
   σ, z — EXACT, seven times), and the natal record reproduces at all four
   levels (obs = 1653241687 exactly at @31). Same seeds → byte-identical
   masks → identical statistics: the certification is mechanical.
3. **[MEASURED] Both statistics ran.** The non-cancelling form
   z_B = (J_ctrl − 1)/σ scores each draw against its analytic smooth truth —
   the natal test's reference class. z_B − z_A = 82.2 on every draw;
   sd(z_B) = 1.212 vs sd(z_A) = 1.215. The level-scale term is measured, and
   measured to be invisible to any within-window control ensemble.
4. **[MEASURED] Pricing surprise**: 716.5 s mean per draw (657.3–776.4)
   against the ~420 s brief price — 1.7× over (716.5/420) — and 0.8× the
   naive W-scaling price (~900 s); rss peaked at 408 MB.

## 1. The gap this closes

`item-x-offset.md` §4 declared "the σ behind the @31 detection is calibrated"
on seven control draws — all at @19/@23/@29. The red team (§T2.b) graded
that WEAKENED on three counts: no control at the detection's own level; seven
draws bound the σ scale only to ~[0.65, 2.0] (so a 30%-understated σ, fully
consistent with those controls, moves 2.32σ to ~1.8σ); and the control
statistic cancels the one component the test statistic keeps. This pass
answers the first count directly (draws at @31), sharpens the second (the
bracket is now measured at @31, and doubled in count by pooling), and turns
the third from an objection into a measurement (§4 below).

## 2. The construction, certified identical

The producer is producer 02's control kernel slimmed of bins, marginals and
the line census — nothing in the mask construction or the statistic path is
new. A control draw at level x, seed s: sfc32 keyed
(0x9E3779B9^x, 0xC0FFEE, 0x20260820, s) drawn once per slot in segment order,
mask at exact natal density P = N̄/(W/15); the mixed super-W triple census
over the masked line; CRT = 6·N·miss with the exact integer U-test tail mass;
σ_slot from the per-slot excess spread — the pooled-floor fix's estimator,
unchanged. Truth for the cancelling statistic is the level's own line census,
cited from producer 02's embed (obs_line = 5481871992 at @31) over this
file's exact CRT_line (custody: reproduces the embedded 5459848120.06 to
rel 5.02e−14).

Certification is by reproduction, not by reading: the same seeds at
@19/@23/@29 regenerate producer 02's seven embedded draws to the printed
digit, and the natal gate reproduces the xchan record at all four levels
(CRT to rel ≤ 5.5e−8, obs/J/σ to the digit). Everything the ≤@29
calibration was, this is, at @31. Seeds 1–7 at @31 had never been run
(SEEDS 31:[] — that absence is the finding this file repairs).

## 3. The calibration

| seed | J_ctrl | z_A = (J_ctrl−J_line)/σ_slot | z_B = (J_ctrl−1)/σ_slot |
|---|---|---|---|
| 1 | 1.004071 | +0.75 | 82.98 |
| 2 | 1.004053 | +0.39 | 82.63 |
| 3 | 1.004101 | +1.37 | 83.60 |
| 4 | 1.004003 | −0.62 | 81.62 |
| 5 | 1.003993 | −0.82 | 81.42 |
| 6 | 1.003940 | −1.91 | 80.33 |
| 7 | 1.004095 | +1.25 | 83.48 |

**[MEASURED]** mean(z_A) = 0.058, sd = 1.215, Σz² = 8.888 ~ χ²₇. With
r = σ_true/σ_reported estimated as √(Σz²/7):

- **@31 alone (n = 7): r = 1.127, 95% bracket [0.745, 2.293]**
  (χ²₇ quantiles 1.690, 16.013, computed and self-tested in-file).
- **Pooled with the seven ≤@29 draws (n = 14): r = 1.055, [0.772, 1.664].**

The @31-alone bracket is WIDER than the registered [0.65, 2.0] at its top —
that is arithmetic, not deterioration: seven draws resolve a factor ~3
whatever their level, and Σz² came out 8.89 where the ≤@29 seven had 6.71.
What changed is what the bracket is ABOUT: it now bounds the σ at the level
that carries the detection, where before it bounded a projection from levels
that do not. P1 (aligned super-W ≡ 0) held on every draw, and every internal
count identity passed.

## 4. Both statistics: what the control can and cannot bound

The red team's third point was structural: J_ctrl − J_line cancels any
whole-window arithmetic fluctuation, while the test statistic (natal J
against an analytic formula) keeps it. Running the non-cancelling form on
the same draws turns that from an assumption into a number:

- **z_B − z_A = (J_line − 1)/σ_slot = 82.2 on every draw** — the window's
  arithmetic content stands 82 sampling-σ above the smooth model.
- **sd(z_B) = 1.212 = sd(z_A) = 1.215 to the third digit**: the term is
  COMMON to every draw in the window, so the between-draw spread cannot see
  it — proof by measurement that no within-window control ensemble, however
  large, bounds its fluctuation. Only its size can be stated, and now is.

So the calibration in §3 is a calibration of the SAMPLING σ. The natal
z = −2.32 is a statement about (window arithmetic − analytic formula) in
units of that sampling σ; its arithmetic component has no control at any
fixed level, because each level owns exactly one window. That is not a
defect of this pass — it is the measured reason the offset question can only
be settled by a NEW level, which is what the @37 prereg is.

## 5. Verdict arithmetic and the @37 prereg

**The @31 detection restated.** Registered: Δ = 1.1853e−4,
σ_slot = 0.000051, z = −2.32.

| calibration | z restated |
|---|---|
| point r = 1.127 | **−2.06** (weakens) |
| bracket low r = 0.745 (σ overstated) | −3.12 |
| bracket high r = 2.293 (σ understated) | −1.01 |

A 3σ reading requires r < 0.775 and the bracket contains 0.775; a sub-2σ
reading requires r > 1.16, which it also contains. **So the calibrated
verdict is: the detection WEAKENS at the point estimate and stays a
consistent-with; calibration at @31 excludes neither "fluctuation" nor "3σ
structure".** One draw deserves its own sentence: seed 6, a pure random
mask, scored z_A = −1.91 — an excursion of the detection's own order showed
up once in seven null draws. The 2026-08-20 record's framing ("one
detection plus one consistent non-detection, essentially one measured
number") survives unchanged and slightly chastened.

**What this does to the @37 prereg — reported only; it is sealed at
`0a7dd73` and its scoring rule stands as registered.** The prereg's
σ_slot(37) projection 8.5228e−6, READ at the @31 bracket, spans
[6.350e−6, 1.955e−5]:

- The primary separations survive the whole bracket: N1 vs C1 and C1 vs C2,
  registered 9.1σ, read 4.0σ at the bracket's weakest end — @37 still
  decides "is any correction needed" and "C1's coefficient vs C2's" under
  any σ miscalibration these draws allow.
- The secondary separations do not: C1 vs M-abs registered 4.8σ reads
  2.1σ–6.4σ across the bracket, and C1 vs M-mult 3.1σ reads 1.4σ–4.2σ. At
  the weak end, @37 separates {no correction | shrinking} but NOT
  {shrinking | constant-absolute}. If the @37 run's own printed σ_slot
  (which supersedes the projection by the prereg's own clause) lands near
  the projection while the true σ sits at the bracket's top, a 3σ kill
  under the registered rule corresponds to as little as 3/2.293 = 1.31σ of
  true significance — the registered |z| > 3 kills should be READ with this
  file's bracket beside them, exactly as the standing rule reads z = −2.32
  with it.

## 6. Pricing

Registered before the run: the brief priced an @31 draw at ~420 s; naive
W-scaling of producer 02's @29 controls (~29 s × W₃₁/W₂₉ = 31) said ~900 s.
Measured: **657.3–776.4 s, mean 716.5 s per draw**, rss ≤ 408 MB (the
instrument's memory is level-free by construction; only the clock scales).
The brief's price was optimistic by 1.7× (716.5/420); the W-scaling was
pessimistic by 1.26× (900/716.5). Mechanism: a control draw pays the full
line regardless of mask density — one rng call per slot (W/15 = 1.34e10
calls) plus the whole-line marking walk — so it costs more than a natal pass
(422.9 s here) even at the same active count. For future preregs: an @31
control ensemble prices at ~12 min per draw, ~84 min for seven, on this
instrument. One operational note for the session record: the first batch
attempt was killed externally at four draws in; the producer is
deterministic per seed, and the four landed draws reproduced byte-identically
on the second, complete, bound run — nothing was lost and nothing had to be
guessed.

## 7. Gate

**Before:** `node research/qc.js` TOTAL = 3 — the standing
`xchan-at37-01-census.js` embeds red (the @37 census running in another
session; not this session's), an `uncited-script` on another session's
`attack-c2drift-01.js`, and an expected `uncited-script` on this file's own
producer before this report existed.

**After:** TOTAL = **1** — only the standing census red remains; it belongs
to the live @37 run and is not this session's to clear. The producer is
formally embedded (`node research/qc/embed.js --streams both`, 5519.5 s,
code-sha256 `e19d99d9…`, out-sha256 `1cb7292c…`), READINGS appended below
the OUTPUT banner, and the static `embeds` check verifies the binding.

## 8. Not reached

- **No control at @37.** Extrapolating this file's price by W₃₇/W₃₁ = 37
  puts one @37 draw at ~7 h; a seven-draw ensemble there is a ~2-day
  compute decision nobody has taken. The @37 run's σ will rest on its own
  clustering estimate plus this @31 bracket.
- **The level-scale arithmetic term is sized, not controlled** — §4 shows
  no within-window ensemble can do better; a cross-level null does not
  exist because each level owns one window.
- **Seven draws resolve a factor ~3.** Narrowing the @31 bracket to, say,
  ±25% needs ~30 draws (~6 h); not run, and the pooled 14-draw bracket
  [0.772, 1.664] is the best current bound.
- **Producer 02's 2948 s `--check` re-execution was not re-run**; its
  binding is verified statically, as `item-x-offset.md` §9 records.
- **Nothing scored by the @37 prereg was touched, recomputed, or
  re-projected** beyond reading its frozen numbers against the measured
  bracket in §5.
