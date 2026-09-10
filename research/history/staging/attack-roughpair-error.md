# Truth-side vs proof-side on the fourth naming: the empirical error of the rough-pair census is sub-Poisson and 2.6% of the twin count at the top band, so Z2 is not dead on the numbers — and the same run moves the wall off the error term onto the DEPTH, where the slack at the crossing is 1.056 and falling and the main term alone is 5.6 times the twin count at the sifting limit

<!-- ledger
id: Q-roughpair-error
status: PARTIAL
todo: Z2
question: How big is the empirical error of the rough-pair census, and is Z2 dead on the numbers?
verdict: Not dead on the numbers - the error sits below T at every one of 1,206 anchors, its scatter is sub-Poisson, its systematic part is 0.1% at the top band with the favourable sign and its exponent is 0.40 below the twin count's - but the same run moves the wall off the error term onto the depth, where the slack at the crossing is 1.056 and falling and the main term alone is 5.6 times the twin count at the sifting limit.
-->

*(2026-08-23. Staging note; nothing here is integrated into a live document.
HELD for the end-of-day adversarial roundup. Producer, formally embedded:
`research/attack-roughpair-error-01.js` (0.8 s; code-sha256 c33973ff...;
out-sha256 7fd82f32...; `node research/qc/embed.js --check` passes
bit-honest — code, body and out-sha all match). Calibration marked per
claim: MEASURED, HEURISTIC, DERIVED-FROM-MEASURED, OPEN. Nothing here is
PROVEN and nothing here is a TPC claim. This executes TODO Z2 first move
(b), the half of it that was not asked: Z2 states what a PROOF needs from
the error term; this asks how big the error term actually is.)*

---

## 0. The premise this rests on, flagged before anything else

Everything below reads the census `X(y)` as "the certificate", and that
reading is the **capture identity** `floor_K = T − X(K)` from
`quadpoint-identity-01.md`. That note is **HELD and has never been
red-teamed** — Z0's standing debt names it explicitly as load-bearing and
asks for the proof to be checked line by line. So:

> **UNVERIFIED PREMISE.** `floor_K = T − X(K)`, and with it the statement
> "the certificate at (Q, y) is `X(y) < T`". Not verified in this session.
> `attack-quadpoint-01.md`, `-02.md` and `stretch-01.md` are HELD and
> un-red-teamed on the same footing.

What was verified here instead, cheaply and directly, is the narrower thing
this file actually needs — that its own window engine is the same engine.
SEC 0 asserts and reproduces, from an independently written sieve loop: the
25 cited `K*` values, `max K* = 46` at `Q = 9281`, the `K = 0` certificate
list `{7, 11, 13, 19, 23, 31, 37, 43}`, `X(full) = 0` at every one of the
1,227 anchors, and Z1's band means. It **does not** re-verify the identity
(cited from `attack-quadpoint-03.js`, standing compute rule). If the
identity falls, the census measured below is still the census; only its
reading as a certificate falls with it.

**REFUTED.md collision check: none.** All 83 rows were read. The nearest
neighbours are row 68 (the one-parameter extinction-density law, refuted as
a *fitting model*) and rows 74/75 (the tail factor and the linear exponent
rule, both refuted fits). Those are cautions about method, not collisions —
they are why every exponent below is quoted with its calibration control
beside it and why the split-half is reported even where it fails. No row
covers "the empirical size of the error term of a rough-pair count".

---

## 1. Disconfirming evidence first

**The error is not small at every anchor, and the certificate must hold at
every anchor.** At the crossing depth `u* = 3.5658`, over all 1,206 anchors
where the depth is defined:

- sup `|E|/T = 0.5628`, at `Q = 269`. At `u = 3` the sup is `0.5190`, same
  anchor.
- band maxima of `|E|/T` at `u*` run `0.5628, 0.4792, 0.2818, 0.3271,
  0.1949, 0.2054` across B3..B8 — **not monotone**: B6's `0.3271` is above
  B5's `0.2818`, and B8's `0.2054` is above B7's `0.1949`. The band *means*
  fall cleanly; the sup does not.

**One exponent control fails.** The split-half of the `rms(E)` fit at `u*`
gives low half `0.381 ± 0.051`, high half `0.535 ± 0.032` — a 2.5 s.e.
disagreement across the range. The `u = 3` split-half passes (`0.387 ±
0.073` vs `0.366 ± 0.051`). **So the `u*` exponent is a range summary and
must not be quoted as a law**, exactly the failure mode that killed the
linear exponent rule (REFUTED.md, refuted twice blind).

**The fit pipeline itself carries a bias.** On synthetic noise of known
`sqrt(Xmain)` scale the same binning and OLS returns `0.479 ± 0.024`
against a truth of `0.5`. Every measured exponent below inherits that
≈ `−0.02`.

**Two decades decide nothing asymptotic.** `Q ≤ 10007`, `h ≤ 10⁸`. Every
number below is a range summary. The relevant `ln h` here is about 18; the
quantities that decide the route go like `1/ln²h`, and 18 is not large.

---

## 2. The main term, its source, and its calibration

`X(y)` is not a sifting function. Inside a stretch, "prime" and "`Q`-rough"
coincide (finality, `stretch-01.md` §1 S2), so `X` is an exact
inclusion–exclusion of four of them:

> `X(y) = S(y,y) − S(y,Q) − S(Q,y) + S(Q,Q)`

The main term used is the **classical dimension-2 sifting main term**,
`|A| · ∏_{p≤z}(1 − ρ(p)/p)` with `ρ(2) = 1, ρ(p) = 2` — Ford's *Sieve
methods lecture notes, Spring 2023*, §1.7.2, cited through
`quadpoint-prior-art.md` §1.1, which is the owning convention for this
object. On the wheel-30 channel with `C` openers this is exactly
`S_main(A;y,y)/C = V₂(y) = ∏_{7≤p≤y}(1 − 2/p)`, and the four-term
combination gives the zero-parameter naive form

> `Xnaive(K)/C = V₂(K) − 2·V₂(K)·U(K) + V₂(nR)`, `U(K) = ∏_{i>K}(1 − 1/p_i)`

which vanishes identically at `K = nR`, matching `X(Q) = 0` exactly.

**The naive product is the fundamental-lemma main term and is known to be
biased at finite `u = ln h / ln y`** by the Buchstab factor `ω(u)e^γ` per
member (Ford §1.7.1's `w(c)`; `quadpoint-prior-art.md` §2.2's coordinate).
Applying it per member gives `Xcorr`, which at full depth is
`C·V₂(Q)·ρ(2)` with `ρ(2) = e^{2γ}/4 = 0.79305` — the Hardy–Littlewood twin
main term. `ω` is integrated here from the delay equation on a `10⁻⁴` grid
and gated against `ω(2) = 1/2`, `3ω(3) = 1 + ln 2 = 1.69315`, and
`ω(12) = 0.56146` against `e^{−γ} = 0.56146`; the root of `uω(u) = 2` comes
out `u* = 3.565847`, `1/u* = 0.280438`, matching the prior-art note's
scratchpad root to 6 digits (an independent reproduction of a
scratchpad-grade figure, not a repo number until now).

**Calibration at the one point where the truth of a pair count is known
[MEASURED]:**

| band | Q-range | n | ΣT | ΣTmain(corr) | T/Tmain | T/Tnaive |
|---|---|---|---|---|---|---|
| B3 | [101, 313] | 40 | 1017 | 1006 | 1.0109 | 0.8017 |
| B4 | [317, 997] | 103 | 7086 | 7036 | 1.0072 | 0.7987 |
| B5 | [1009, 1499] | 71 | 8332 | 8119 | 1.0262 | 0.8138 |
| B6 | [1500, 3163] | 208 | 42495 | 42115 | 1.0090 | 0.8002 |
| B7 | [3164, 5623] | 292 | 101763 | 101524 | 1.0024 | 0.7949 |
| B8 | [5624, 10007] | 491 | 280128 | 279608 | 1.0019 | 0.7945 |

The corrected form is right to 0.19% at B8; the naive form misses by
exactly the `ρ(2)` factor it is supposed to miss by (`0.7945` against
`1/ρ(2) = 1.2609`). **Only the corrected form is used to price `E`.** The
naive form is reported so the size of the fundamental-lemma bias is on the
record: it is 26%, which is two orders of register above the error being
measured, and any proof-side argument that stops at the naive main term is
already 26% wrong before it starts.

---

## 3. The measurement: how big is `E = X(y) − Xmain(y)` against `T`?

At the crossing depth `u* = 3.5658` [MEASURED, 1,206 anchors]:

| band | n | ⟨X/T⟩ | ⟨Xmain/T⟩ | ΣE/ΣXmain | ⟨\|E\|⟩/⟨T⟩ | max \|E\|/T | χ²/df = ⟨E²/Xmain⟩ |
|---|---|---|---|---|---|---|---|
| B3 | 40 | 0.7467 | 0.7903 | −0.0311 | 0.0934 | 0.5628 | 0.627 |
| B4 | 103 | 0.8734 | 0.8819 | −0.0089 | 0.0759 | 0.4792 | 0.785 |
| B5 | 71 | 0.9054 | 0.9044 | +0.0056 | 0.0462 | 0.2818 | 0.546 |
| B6 | 208 | 0.9115 | 0.9115 | −0.0044 | 0.0401 | 0.3271 | 0.665 |
| B7 | 292 | 0.9209 | 0.9268 | −0.0051 | 0.0298 | 0.1949 | 0.578 |
| B8 | 491 | 0.9486 | 0.9491 | −0.0012 | 0.0255 | 0.2054 | 0.718 |

Three readings, each MEASURED on this range and nothing more:

1. **The systematic part is a tenth of a percent at the top band and has
   the favourable sign.** `ΣE/ΣXmain = −0.0012` at B8: the census sits
   *below* its zero-parameter main term. The same at every other depth
   tested (`−0.0158` at `u = 2.5`, `−0.0046` at `u = 3`, `−0.0015` at
   `u = 4`, `−0.0013` at `u = 5`, all B8). There is no sign of a systematic
   excess that would eat the margin.
2. **The scatter is 2.6% of the twin count and falling** — `⟨|E|⟩/⟨T⟩` runs
   `0.0934 → 0.0255` across the six bands.
3. **The dispersion is at or below Poisson scale, fit-free.**
   `χ²/df = ⟨E²/Xmain⟩` is `0.546..0.785` at `u*`, `0.667..0.803` at
   `u = 3`, and never exceeds `0.931` at any band or depth in the run.
   Below 1 everywhere, but 1 is the WRONG REFERENCE: the matched
   independent-thinning null is binomial and returns `1 - p` exactly with
   `p = Xmain/C`, which is 0.9519 to 0.9808 at `u = 3`, 0.9099 to 0.9609 at
   `u*` and 0.8164 to 0.8792 at `u = 5`
   (`measure-roughpair-null-0829.md` §3a, RED-TEAMED and the identity
   re-derived). Against that reference the dispersion is still below at all 17
   band-depth cells, pooled `z = -5.87`, `-7.09`, `-11.39`, so sub-Poisson
   stands as a direction and its size is smaller than this sentence implies: of
   the 0.711 shortfall at B5, `u = 5`, 0.176 is the normalisation.
   This is the strongest single statement
   in the file because it needs no fit and no exponent.

**And 0 of 1,206 anchors at `u*` — and 0 of 1,216 at `u = 3` — have
`|E| ≥ T`.**

**The error term barely moves the crossing [MEASURED].** Main-term-predicted
`K*` band means `3.92, 8.27, 12.10, 16.82, 23.30, 31.15` against measured
`3.88, 8.42, 12.20, 16.88, 23.34, 31.22`; mean signed difference `+0.09` at
B8; a fraction `0.902` of B8 anchors lands within 2 of the prediction that
uses the true `T`. The depth cost is a main-term phenomenon.

---

## 4. The exponent, with its control, and the gap as a number

Pipeline: bin the 1,194 anchors with `W ≥ 1000` by `ln W` into 10
log-spaced bins, take `rms` per bin, OLS `ln rms` on `ln W`. The identical
pipeline is run first on synthetic noise of **known** scale, because this
corpus has been burned by fits at small n.

| quantity | `u = 3` | `u = u*` |
|---|---|---|
| measured exponent of `rms(E)` in `W` | **0.405 ± 0.022** | **0.413 ± 0.022** |
| CONTROL: synthetic `sqrt(Xmain)`-scale noise (truth 0.5) | 0.479 ± 0.024 | 0.483 ± 0.025 |
| CONTROL: synthetic `Xmain`-scale noise (truth = Xmain's) | 0.823 ± 0.026 | 0.832 ± 0.025 |
| reference: exponent of `rms(T)` in `W` | 0.812 ± 0.018 | 0.812 ± 0.018 |
| reference: exponent of `rms(Xmain)` in `W` | 0.839 ± 0.015 | 0.847 ± 0.014 |
| SPLIT-HALF on measured `E` (low / high) | 0.387±0.073 / 0.366±0.051 | 0.381±0.051 / **0.535±0.032** |
| **gap: exponent(T) − exponent(E)** | **0.407** | **0.399** |

The two synthetic classes are cleanly separated by the pipeline, so the
estimator can tell "error grows like the square root of the count" from
"error grows like the count" at this n. The measured value sits in the
Poisson class and about 3 s.e. below even the Poisson control, consistent
with the fit-free `χ²/df < 1`.

**The gap a proof must close, as a number: 0.40 in the exponent.** Over two
decades of window width, the true error grows at roughly the square root of
the rate the twin count grows. The bolded caveat from §1 applies to the
`u*` column: its split-half fails, so `0.413` there is a range summary, and
the `u = 3` column (`0.405`, split-half consistent) is the one to lean on.

---

## 5. The proof side, where the numbers turn — and the wall moves off the error term

Define `slack(y) = T / Xmain(y)`: the multiplicative looseness an upper
bound on `X` may carry at depth `y` and still certify `X(y) < T`. Reported
against the sieve's own coordinate `s = ln W / ln y`, because a bound at
depth `y` has to be produced by sifting an interval of length `W`.

| band | n | ⟨lnW/lnh⟩ | min | slack at `u*` | `s` at `u*` | ⟨u⟩ where slack = 3.29956 | ⟨s⟩ there |
|---|---|---|---|---|---|---|---|
| B3 | 40 | 0.709 | 0.621 | 1.310 | 2.608 | 2.792 | 1.980 |
| B4 | 103 | 0.691 | 0.602 | 1.154 | 2.514 | 2.786 | 1.924 |
| B5 | 71 | 0.669 | 0.595 | 1.118 | 2.419 | 2.770 | 1.855 |
| B6 | 208 | 0.665 | 0.586 | 1.102 | 2.388 | 2.758 | 1.833 |
| B7 | 292 | 0.653 | 0.580 | 1.084 | 2.350 | 2.750 | 1.797 |
| B8 | 491 | 0.647 | 0.575 | **1.056** | 2.317 | 2.747 | 1.778 |

and, at the dimension-2 sifting limit itself:

| band | n | ⟨u⟩ at `s = β₂ = 4.2665` | ⟨Xmain/T⟩ | certificate needs |
|---|---|---|---|---|
| B5 | 1 | 5.607 | 3.054 | < 1 |
| B6 | 43 | 6.098 | 4.032 | < 1 |
| B7 | 149 | 6.481 | 4.924 | < 1 |
| B8 | 399 | 6.733 | **5.631** | < 1 |

Four readings:

1. **The slack at the crossing is 1.056 and falling toward 1**
   (`1.310 → 1.056` across B3..B8). At the depth the census actually
   crosses, a proof-side bound may be 5.6% loose and no more, on this
   range, with the allowance shrinking.
2. **Lichtman-grade looseness suffices only at `s = 1.778`.** Lichtman
   2025's `π₂ ≲ 3.29956·𝔖` is the standing distance (CITED,
   `quadpoint-prior-art.md` §1.2: a factor 3.3 after 106 years, thirteen
   recorded improvements, the last worth 2.94%). Buying that much slack
   here means going to `⟨u⟩ = 2.747`, which is sifting parameter
   `⟨s⟩ = 1.778` at B8 and falling with the band.
3. **At the sifting limit the certificate fails on the main term alone.**
   Set `s = β₂ = 4.2665` — comfortable territory for a dimension-2 sieve —
   and `Xmain/T` is already `5.631` at B8 and **rising** across bands
   (`3.054 → 4.032 → 4.924 → 5.631`). No control of the error term reaches
   that; the main term itself is on the wrong side.
4. **So the certificate lives only in a narrow, shrinking `s`-window.**
   `s = u·(lnW/lnh)`, and the main term permits `X < T` only for `u < u*`,
   so the window is `s < u*·(lnW/lnh)` = `2.317` at B8 measured, drifting
   toward `u*/2 = 1.783` as `lnW/lnh → 0.5` (the band minima `0.621 →
   0.575` are the twin-`Q` minimal-width stretches, `W = 4Q + 4`).
   [DERIVED-FROM-MEASURED: the identity `s = u·(lnW/lnh)` is arithmetic;
   the numbers in it are measured.]

**This is a correction to Z2's own statement of the wall, and it is the
main thing this run buys.** Z2 says: "beat the twin density in the error
term of a rough-pair count on a short interval." On this range **the error
term is not the binding constraint.** It is sub-Poisson, its systematic part
is a tenth of a percent, it never reaches `T` at any of 1,206 anchors, and
its exponent sits 0.40 below the twin count's. What binds is the **depth**:
the certificate is a statement about a dimension-2 sifting function at
sifting parameter `s ≲ 2.3` on an interval of length `h^{0.575..0.65}`,
with permitted multiplicative looseness between `1.056` and `3.3` depending
where in that window you stand, and `β₂ = 4.2665` is nowhere near it.

No claim is made here about the value of any dimension-2 upper-bound sieve
function at `s ≈ 1.8`; that number was not looked up and is not invented.
What is measured is the configuration a proof would have to work in.

---

## 6. Consistency with Z1's reproduction target — checked, no flag

Z1 (`attack-quadpoint-02.md`, HELD) fixed `m6/m7/m8 = 0.050/0.040/0.032`
and the `K*` growth `12.20 → 31.22` as the target any analytic bound must
hit. Both are reproduced here twice: once as an **engine gate** (asserted
digit-for-digit in SEC 0, from an independently written sieve loop), and
once **from the zero-parameter main term alone**:

| band | measured K* | main-term K* | measured K*/pool | main-term K*/pool | ratio |
|---|---|---|---|---|---|
| B3 | 3.88 | 3.92 | 0.093 | 0.093 | 1.013 |
| B4 | 8.42 | 8.27 | 0.075 | 0.074 | 0.983 |
| B5 | 12.20 | 12.10 | 0.061 | 0.060 | 0.992 |
| B6 | 16.88 | 16.82 | 0.050 | 0.050 | 0.996 |
| B7 | 23.34 | 23.30 | 0.040 | 0.040 | 0.998 |
| B8 | 31.22 | 31.15 | 0.032 | 0.032 | 0.998 |

**No inconsistency to flag.** The two readings agree to 0.2% at B8. An
analytic bound that hits the main term computed here hits Z1's target
automatically — which also says Z1's target is a weaker test than it looks,
since a zero-parameter main term passes it.

**A by-product for the depth law [MEASURED, not a resolution].**
`quadpoint-identity-01.md` §6 lists the finite-size drift of `ln y*/ln h`
(band means `0.935 → 0.984` of the candidate `1/(2e^γ)`) as unmodelled. The
main term used here — exact partial products in place of the Mertens
asymptotic, plus the per-member Buchstab factor — reproduces the measured
`K*` band means to within 1.7% (0.2% at B8), which is where that drift
lives. That is evidence the drift is a finite-size artefact of the Mertens
asymptotic rather than structure. The direct check at the level of
`ln y*/ln h` band means was not run; until it is, this stays a by-product,
not a closure of §6's first bullet.

---

## 7. The verdict, stated as the two situations the question posed

- **Not situation (ii).** The route is **not** dead on the numbers. The
  empirical error sits well below `T` at every one of 1,206 anchors, its
  scatter is sub-Poisson, its systematic part is 0.1% at the top band with
  the favourable sign, and its exponent is 0.40 below the twin count's.
  **Z2 should not be closed on truth-side grounds.**
- **Situation (i), with a correction.** The truth is favourable and the
  obstruction is entirely technique — but the technique that is missing is
  **not** error-term control, which is where Z2 currently points. It is a
  main-term-grade dimension-2 upper bound at `s ≲ 2.3` on an interval of
  length `h^{0.575..0.65}`, with 5.6% of looseness at the crossing.
- **Net for Z2's first move (b).** The honest answer to "decide whether any
  machinery reaches that precision class" is: **the precision class was
  misidentified**. Nothing in sight reaches the *depth* class either, and
  that is a harder statement, not a softer one, because the shortfall is
  now visible in the main term (`Xmain/T = 5.631` at `β₂`) rather than
  hidden in an error term nobody had measured. **The deliverable of this
  frame is the wall's fourth naming with coordinates**, exactly as Z2's own
  alternative anticipated — and the coordinates are `s`, not `E`.

No route is opened. No TPC claim. Route B closed; `ρ(2)` adverse; occupancy
on this range was never in doubt.

---

## 8. NOT REACHED

- The capture identity is not verified here (Z0's debt stands).
- No value for any dimension-2 upper-bound sieve function at `s` in the 1.8 to 2.3 range
  was obtained; the literature was not searched for one this session, and
  `SEARCH-CONVENTIONS.md` discipline would be owed before quoting one.
- Nothing past `Q = 10007`. The `u*` exponent's split-half failure would be
  the first thing a decade extension resolves.
- The sub-Poisson dispersion (`χ²/df` as low as 0.289) had no mechanism
  offered here. THE CONTROL RAN 2026-08-29
  (`measure-roughpair-null-0829.md`, HELD, red-teamed): the matched
  independent-thinning null returns `1 - p`, not 1, and neither guess above is
  needed. A second null that gives each prime an exact kill count in the window
  predicts 0.33 to 0.56 and the measured value sits 1.23 to 1.42 times ABOVE
  it, so the mechanism is elementary equidistribution of residue classes in an
  interval and it over-explains the deficit; the residual excess is
  unattributed and prime-prime dependence is a candidate, not a
  demonstration.
- `E` was not split by side (A/B), carried from v1's NOT REACHED, and the
  QR refinement (Z3) stays unused.
- No prereg. Nothing here is a blind test; the depth-law forecast test
  (`y* ≈ 336` at 31607) is untouched.

---

*Producer and custody: `research/attack-roughpair-error-01.js`, embedded,
`--check` bit-honest. CITED, never recomputed: the capture identity
(`attack-quadpoint-03.js`), the 25 `K*` values and Z1's band means
(`attack-quadpoint-01/02.js` embedded OUTPUT, asserted here as an engine
gate), Lichtman 2025's 3.29956 and Ford's §1.7.2/§1.7.1 through
`quadpoint-prior-art.md`, `β₂ = 4.2665`, and the prior-art scratchpad root
`3.565845`. History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
