# Does the parity adversary's killing level D* have a law in Q? A sealed pre-registration, the run past Q = 200, and the independent-thinning null beside it

<!-- ledger
id: Q-parity-dstar-law-0829n
status: CLOSED
todo: Z2
question: Does the exact-data parity adversary's killing level D*(Q) follow D* ~ Q^c with a stable c on the decades past Q = 200, and is c distinguishable from the independent-thinning null's?
verdict: No law in Q and CLOSED by the sealed kill rule (score 5 HIT, 1 MISS): MEASURED on 271 anchors 211 <= Q <= 13679, the Q-slope moves 1.446 to 1.204 to 0.575 across ranges while ln D* on ln width holds slope 1.097 +- 0.012 with a quarter of the scatter, D*/width about 0.5, and the independent-thinning null reproduces the width law within 0.025 in slope; the mechanism is that D* is where a modulus first reads a single position of the window, which is the wall survey's remainder statement in the stretch coordinate and names nothing new.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-records.md`, a BigInt
> rational two-phase simplex written from scratch).** D* is confirmed EXACTLY
> at 299 of 376 anchors, both arms and both decades, with 0 contradicted and
> 0 unresolved; the remaining 77 exceed that solver's 420-row cap (the widest
> stretches, the honest gap), so the float engine is now gated by an exact
> one. The 43-anchor, 172-figure custody gate was re-derived from arithmetic
> with 0 disagreements, discharging §7's own listed defect. Three clauses
> corrected: (i) the null's 0.025 is the LN-Q slope difference, not the width
> law's — the width difference on the same 84 matched anchors is 0.031
> (§6, this note's ledger, `REFUTED.md` row 95 and TODO Z5 all carried the
> error); (ii) "gap of at least 0.25 at every anchor" is true-arm only, the
> null arm's exact gap being 0.1212; (iii) P6's HIT rests entirely on the
> decade-2 collapse that §5 itself discounts as a sampler artefact. The
> closure stands: clause (b) is well powered, paired se 0.0401 against a 0.15
> band.

*(2026-08-29. Staging note; nothing here is integrated into a live document.
HELD. Producer, formally embedded:
`research/history/staging/attack-0829n-parity-dstar.js`. Calibration marked per
claim: PROVEN, VERIFIED (exact computation), MEASURED, HEURISTIC, OPEN, REFUTED.
Every figure below sits in that producer's OUTPUT block or is quoted from
`research/attack-parity-adversary-01.js`'s embedded OUTPUT by line; nothing is
transcribed by hand. This note edits no other file.)*

---

## 0. What is open first, and the label

**Label (i), diagnostic.** `attack-parity-adversary.md` §7 proves that
m\*(D(Q)) ≥ 1 uniformly in Q is the Zone Postulate itself, TPC-strength and
stronger. D\* is therefore a diagnostic's scale, never a sub-target, and no
line below moves item Z2's certificate. What the item can still deliver is
one of two honest ends: a MEASURED law D\* ≈ Q^c with c bounded away from 2
for a reason that can be named, or a c that drifts with Q or matches the null,
which confirms the wall with coordinates and closes the question.

**The prior against a twin-specific reading is already on record.** The same
note's §6 ran the random-class control and found ln D\*/ln Q = 1.139 against
the true arithmetic's 1.192 on 34 matched anchors (ratio 1.047): the D\*
behaviour was read there as sieve-generic. This note's control is the
different null the brief names, the independent-thinning null N-thin of
`measure-roughpair-null-0829.md` §1, and the pre-registration below predicts
the same outcome, agreement.

**The engine is floating-point and the old one was exact.** The 43 readings
at Q ≤ 200 were produced by an exact rational simplex. The producer here uses
a dense floating-point simplex with a presolve, rebuilt from the original data
every few hundred pivots and at every claimed optimum, because the first
version of it returned a non-monotone m\*(D) (a value of 71 at a level where
the exact value is below 1) and was thrown away. The gate that licenses the
new range is §1: 172 integer figures of the old OUTPUT reproduced, 0
failures, plus the four summary lines. The m\* margins at the two moduli that
bracket D\* are printed for every new anchor so a reader can see how far each
D\* sits from the threshold.

**Contamination disclosure.** While timing the engine, before the seal, six
anchors of the new range were run and their D\* seen (Q = 211, 401, 601,
809, 1009, 2003, in the session transcript). Between the seal and the run,
for timing again, five more were seen (Q = 1499, 5003, 5227, 6967, 10007),
and a development pass over every 12th anchor of decade 1 (18 true anchors,
6 null anchors, killed before it reached decade 2) was seen as well. The
pre-registration in §2 was written after the first six and was not edited
after anything seen later, except for the sampling deviation recorded at the
top of §2, whose motive was compute. The producer's SEEN set excludes the
first six plus 1499, 5003 and 10007 from the "minus SEEN" fits; 5227 and
6967 and the development pass are NOT excluded there, and a reader should
treat the decade-1 fits as blind on roughly 230 of 250 anchors and the
decade-2 fits as blind on 16 of 21.

---

## 1. D\* restated exactly, and the custody gate

**Definition (unchanged from `attack-parity-adversary-01.js` SEC 2).** Anchor
Q prime ≥ 7, Q′ the next prime, stretch S_Q = [Q², Q′²), channel positions
a ∈ S_Q with a ≡ 11, 17, 29 (mod 30) and a + 2 < Q′². C = #channel, T =
#twins. sig(a) = { p ∈ [7, Q] : p | a(a+2) }; sig(a) = ∅ iff a is a twin
(finality). For squarefree d | P(Q) with |A_d| = #{a : d | a(a+2)} > 0:

> m\*(D) = min { Σ_{a twin} ν(a) : ν ≥ 0, Σ_{a ∈ A_d} ν(a) = |A_d| for all
> 1 < d ≤ D, Σ_a ν(a) = C },
>
> D\*(Q) = the least such d, in the sorted list of moduli d ≤ Q², with
> m\*(d) ≥ 1.

m\* is monotone non-decreasing in D (more constraints). The old engine
bisected on the full divisor list; this one restricts the list to d ≤ Q²
(D\* ≤ Q² at all 43 old anchors, and an anchor with m\*(Q²) < 1 is reported as
not scorable rather than assigned a D\*). The threshold is m\* ≥ 1 − 10⁻⁶ for
the float engine.

**How 1.18 was obtained there.** It is the plain mean of ln D\*/ln Q over 43
anchors 7 ≤ Q ≤ 199 (`research/attack-parity-adversary-01.js` OUTPUT SEC 2,
the line "D\* exponent ln D\*/ln Q over 43 anchors: min 0.812, mean 1.181, max
1.439"), not a regression; call that the through-origin estimator c₀. It is
biased toward 1 by any constant factor in D\* (a factor e^a contributes
a/ln Q), which is one reason the old note refused to call it a law.

**Custody gate, passed [VERIFIED].** Producer SEC 1 reproduces, at every one
of the 43 anchors, the four integer columns m\*(Q), m\*(width), m\*(Q²) and
D\* of the old OUTPUT, 172 figures, 0 failures, with the largest float
departure from an integer 0.0e+0, and the four summary lines min 0.812, mean
1.181, max 1.439, D\*/width mean 0.321. The old block's figures are hard-coded
in the producer as the OLD table and asserted; the script aborts before SEC 2
on any disagreement.

**The two estimators on the old range, Q ≥ 31 (n = 36), for the seal
[MEASURED, SEC 1]:** c₀ = 1.229; OLS ln D\* on ln Q slope 1.446 ± 0.214,
intercept −0.989, rmse 0.679; OLS on ln T slope 1.071 ± 0.172, rmse 0.709;
OLS on ln width slope 1.182 ± 0.085, rmse 0.401. The width fit has half the
scatter of the Q fit on the same 36 anchors: most of the spread of D\* at
fixed Q is the prime gap Q′ − Q, which sets the interval length.

---

## 2. Pre-registration, SEALED before SEC 2 existed in the producer

**Seal.** The producer was embedded with only SEC 1 in it, invocation
`node research/history/staging/attack-0829n-parity-dstar.js --stage A`,
code-sha256 `4a44582b6f7d3043b0d4c71a6249ad52ef52060eef7da49ac44274626ed2414b`,
out-sha256 `2e20ee2199d835ccf3ac0a79f813a1c0710bc399929337ecd722d21aa35e6200`,
and this section was written to disk against that embed before any SEC 2
code was written. Custody caveat, as in `measure-roughpair-null-0829.md` §1:
sealed by disk order and by the transcript of the session, not
cryptographically. The final embed replaces that block and therefore needs
`--force`, which the embed tool stamps into the artefact; the disclosure is
carried in §3.

**Deviation recorded before the run, after the seal.** The rule below says
"every prime" for decade 1 and C ≤ 8000 for decade 2. A dense-tableau
engine cannot hold the widest stretches of decade 1 inside the compute
budget (the anchor Q = 1669, gap 24, ran past four minutes on a single
sub-threshold LP in the development pass), so before the full run started
the cap was set to C ≤ 6000 and applied to BOTH decades. The producer prints
the decade-1 anchors this excludes, with their C, and the decade-2 targets
that have no anchor under the cap. The bias is the one the rule already
declared for decade 2: wide stretches, hence large T, are missing at the top
of each decade. The pre-registered time cap of 900 s stays as well.

**Ranges and sampling rule, fixed now.**

- Decade 1: every prime Q with 200 < Q < 2000 (the anchor at 1999 needs Q′ =
  2003 and is included), true arithmetic. Expected about 260 anchors.
- Decade 2: 2000 ≤ Q < 20000, sampled. Targets t_k = 2000 · 10^{k/24} for
  k = 0, …, 23; the anchor for t_k is the first prime Q ≥ t_k whose stretch
  has C ≤ CMAX channel positions, with CMAX fixed at 8000 (a dense-tableau
  engine cannot hold the LP of a stretch ten times wider). This selects short
  prime gaps at the top of the range and is a declared bias toward small
  width and small T; the width fit is reported beside the Q fit for that
  reason. If the run does not fit the compute budget, decade 2 stops at the
  last completed target and the note says where.
- Null: N-thin (§0) at every 3rd anchor of decade 1 in index order and at
  every decade-2 anchor, one draw each, seed 20260829 + Q, same window and
  channel ground set as the true arithmetic. T_null is the draw's own.
- Segmentation: each anchor prints its own line as it completes; a crash
  leaves the completed lines in the run log. Per-anchor wall-clock cap
  900 s; an anchor over the cap prints CAP and is excluded from every fit,
  and the count of CAP anchors is a reported defect.

**Estimators, fixed now.** On each population (decade 1 true, decade 1 null,
decade 2 true, decade 2 null) and on the union of decades:

- c₀ = mean of ln D\*/ln Q (the old note's estimator);
- c₁ = OLS slope of ln D\* on ln Q, with its standard error, intercept and
  rmse;
- c_w = OLS slope of ln D\* on ln width, with rmse; c_T = OLS slope of ln D\*
  on ln T, with rmse;
- the ratio D\*/width (mean, median) and D\*/Q² (mean, median).

**Predictions, with bands.** Under the naive extrapolation of the old range
(c₁ = 1.446 ± 0.214 on 36 anchors, c₀ drifting up from 1.181) and the six
seen anchors:

- P1 (decade 1, c₁): 1.40, band [1.20, 1.60].
- P2 (decade 1, c₀): 1.28, band [1.20, 1.38]; and c₀ on decade 1 exceeds the
  old range's 1.181 (drift up continues).
- P3 (decade 1, the width law): c_w in [1.05, 1.35] and rmse(width fit) <
  rmse(Q fit). This is the mechanism claim: D\* tracks the interval length,
  through T, rather than Q.
- P4 (the null): |c₁(null) − c₁(true)| ≤ 0.15 on the matched anchors of
  decade 1, and the null's mean D\*/width within a factor 1.5 of the true
  arithmetic's. Prediction: the null agrees, D\* is sieve-generic.
- P5 (decade 2, c₀): 1.33, band [1.22, 1.45]; and c₀(decade 2) >
  c₀(decade 1) (the drift continues).
- P6 (no law with a fixed c): the through-origin c₀ moves between the old
  range, decade 1 and decade 2 by more than the standard error of c₁ on
  decade 1. Predicted: yes, it moves.

**Scoring rule.** Each of P1–P5 is HIT if the measured value lies inside its
band (for P1, c₁ ± 1 SE must overlap the band; for the inequality clauses the
inequality must hold as printed), MISS otherwise, NOT SCORABLE if the
population has fewer than 10 anchors. P6 is scored as stated.

**Kill rule (fixed now).** The item CLOSES on the numbers, and the verdict is
"D\* has no law in Q that the wall survey has not already named", if EITHER
(a) c₀ or c₁ moves between decade 1 and decade 2 by more than 2 SE of the
decade-1 c₁ (an exponent moving with Q), OR (b) P4 is a HIT (the null
reproduces c within its bar: the law, whatever it is, is a property of any
two-class sieve on any interval and carries no twin content). The item stays
PARTIAL only if c is stable across the old range and both decades within the
bars AND the null's c differs from the true one by more than 2 combined SE;
that outcome is the one this pre-registration predicts against, at about
20%.

**Predicted null exponent, stated before the run.** Under N-thin every
signature is an independent draw with P(p ∈ sig) = 2/p, the same density
the true arithmetic has on average; the LP sees the same class structure in
expectation. Predicted c₁(null) = c₁(true) ± 0.10, c₀(null) = c₀(true) ±
0.05. If the null's D\* were systematically LOWER than the true one at fixed
width (the true arithmetic's certificate was the more fragile in the old
note's θ_min reading), the sign is: D\*(null) ≤ D\*(true) on more than half
the matched anchors. No band is placed on that sign; it is recorded as a
post-hoc reading if it appears.

**The estimator control, fixed now.** The same three estimators are run on a
quantity whose exponent is known by construction, on the same anchors:
X₁ = Q² (exponent exactly 2, no scatter), X₂ = width (asymptotic exponent 1
with a ln Q factor), and X₃ = round(0.35 · width), the constant-ratio
surrogate. c₀ on X₃ should show the same upward drift as D\* if D\* tracks
width; c₁ on X₁ must return 2.000 ± 0.000. A reader who sees c₀(X₃) drift
like c₀(D\*) has seen the through-origin estimator's bias, not a law.

---

## 3. The run [MEASURED, producer SEC 2]

**Populations.** Decade 1: 250 anchors, Q = 211 .. 1999, with 7 anchors
excluded by C > 6000 (Q = 1327, 1637, 1669, 1759, 1913, 1933, 1951; their C
is printed on the OUTPUT's "decade 1" line). Decade 2: 21 of 24 targets have
an anchor under the cap, Q = 2003 .. 13679; the three top targets have none,
so decade 2 stops at Q = 13679, short of 20000, and this note says so. Null:
84 decade-1 anchors and all 21 decade-2 anchors. 376 anchor runs, 0 CAP, 0
anchors with m\*(Q²) < 1; every run has a D\* below Q².

**Compute and custody.** The embed was forced twice, and both are stamped in
the artefact. First over the stage-A seal: "0 of 169 figures in the replaced
block not reproduced", so every seal-time figure survives. Second after
`--check` found the full block irreproducible: the first full block printed
per-anchor wall-clock seconds to stdout, which no re-run can match; they were
moved to stderr and the block re-embedded, and the figures that second force
lists as not reproduced ("37 of 1834") are those timings (the two ledger-relevant counts,
simplex iterations and rebuilds, are deterministic and stay). Wall clock for
the whole run was under half an hour. Float margins, true arithmetic, new range: min
m\*(D\*) = 1.0000, max m\*(modulus below D\*) = 0.7500; the threshold sits in
a gap of at least 0.25 at every anchor and the readings are not tolerance
artefacts. 170 of 271 true-arithmetic anchors have m\*(D\*) < 1.5: at most
anchors D\* is the modulus at which exactly one unit of twin mass is first
forced.

**Segmentation.** Each anchor printed its own line as it completed; the
sealed rule's crash provision was not needed.

---

## 4. Score against the pre-registration [MEASURED, producer SEC 3]

| Item | Prediction | Measured | Score |
|---|---|---|---|
| P1 decade-1 c₁ | band [1.20, 1.60] | 1.204 ± 0.069 | HIT (at the band's edge) |
| P2 decade-1 c₀ | [1.20, 1.38], above 1.181 | 1.257 | HIT |
| P3 width law | c_w in [1.05, 1.35], rmse(width) < rmse(Q) | 1.097 ± 0.012; 0.164 vs 0.647 | HIT |
| P4 null | \|c₁ null − true\| ≤ 0.15, D\*/w ratio in [0.667, 1.5] | 0.025; 0.981 | HIT |
| P5 decade-2 c₀ | [1.22, 1.45], above decade 1 | 1.164, below decade 1's 1.257 | MISS |
| P6 c moves | moves by more than SE(c₁) | c₀ 0.093 dec1→dec2, c₁ 0.628; SE 0.069 | HIT |

Five HIT, one MISS, on a sealed sheet. The MISS is P5, the one item that
predicted the through-origin exponent would keep rising into decade 2; it
fell instead, to 1.164. §5 shows why the fall is the sampler's, not D\*'s.

**Kill rule.** (a) fires: c₁ moves between decades by 0.628 against the
2 SE threshold 0.138. (b) fires: the null reproduces c within its bar (P4
HIT). **The item is CLOSED by its own pre-registered rule**, on both clauses.
Clause (a) is discounted below on the control's evidence and clause (b) is
not; the closure stands on (b) alone.

---

## 5. Fits, the null, and the estimator control

**The fits, true arithmetic [MEASURED, SEC 3].**

| Population | n | c₀ | c₁ (ln Q) | c_w (ln width) | c_T (ln T) | D\*/width mean |
|---|---|---|---|---|---|---|
| old range Q ≥ 31 | 36 | 1.229 | 1.446 ± 0.214, rmse 0.679 | 1.182 ± 0.085, rmse 0.401 | 1.071 ± 0.172 | 0.359 |
| decade 1 | 250 | 1.257 | 1.204 ± 0.069, rmse 0.647 | 1.097 ± 0.012, rmse 0.164 | 1.162 ± 0.028 | 0.526 |
| decade 1 minus SEEN | 244 | 1.256 | 1.218 ± 0.070 | 1.098 ± 0.012 | 1.167 ± 0.029 | 0.527 |
| decade 2 (gap-selected) | 21 | 1.164 | 0.575 ± 0.134, rmse 0.357 | 1.028 ± 0.061, rmse 0.126 | 1.022 ± 0.138 | 0.707 |
| both decades | 271 | 1.250 | 1.017 ± 0.052 | 1.115 ± 0.012, rmse 0.169 | 1.211 ± 0.030 | 0.540 |

Three readings, in the order of their weight:

1. **There is no exponent in Q.** The ln Q fit has rmse 0.647 on decade 1
   (a factor 1.9 in D\* at fixed Q) and its slope moves from 1.446 (old
   range) to 1.204 (decade 1) to 0.575 (decade 2); the through-origin c₀
   moves 1.229 → 1.257 → 1.164. Nothing is stable in the Q coordinate.
2. **There is a law in the interval length, and it is close to
   proportionality.** ln D\* on ln width: slope 1.097 ± 0.012 with rmse 0.164
   on 250 anchors, 1.028 ± 0.061 on decade 2, 1.115 ± 0.012 on all 271;
   D\*/width has mean 0.526 and median 0.517 on decade 1. The ratio rises
   slowly, 0.359 (old) → 0.526 → 0.707 (decade 2, gap-selected, so its 0.707
   is partly the sampler), which is what a slope slightly above 1 says.
3. **T is the second-best coordinate**, c_T = 1.162 ± 0.028 with rmse 0.347:
   twice the width fit's scatter. D\* tracks the interval, not the twin
   count; the old note's T-mechanism guess (§2, P3's gloss "through T") is
   the weaker of the two and is dropped.

**The null [MEASURED, SEC 3].** On the 105 matched anchors: c₁ true 0.896
± 0.065 against null 0.856 ± 0.068 (difference 0.041); c₀ 1.229 against
1.223; D\*/width mean 0.561 against 0.530 (ratio 0.945). On decade 1 alone
the matched difference in c₁ is 0.025 and the ratio 0.981. The independent
thinning null, with no arithmetic in it at all, has the same D\* law to the
bar. Two post-hoc readings, no test, no band, recorded because they were
seen: D\*(null) < D\*(true) at 61 of 105 (mean ln ratio −0.052, the same
sign as the old note's θ_min separation and just as unprotected); and
T_null/T = 1.259 on average, the null holding a quarter more twins than the
arithmetic. The second is the classical Mertens discrepancy, the sieve main
term ∏(1 − 2/p) over the true twin density at x = Q² with z = Q, whose
limit is 4·e^{−2γ}; it is prior art, it is the D8 content of
`measure-roughpair-null-0829.md` §5 seen from the other side, and it means
the null arm carries more T at matched width, which confounds the 61-of-105
sign in the direction observed.

**The estimator control [MEASURED, SEC 3].** On the same 250 decade-1
anchors: X₁ = Q² returns c₀ = 2.000 and c₁ = 2.000 ± 0.000 (the estimator
is not broken). X₂ = width returns c₀ = 1.356 and c₁ = 1.017 ± 0.066 with
rmse 0.621, and X₃ = round(0.35·width) returns c₀ = 1.200, c₁ = 1.017 ±
0.066: a quantity that is by construction a constant fraction of the
interval length shows a through-origin "exponent" of 1.20, a Q-slope of
1.02, and an rmse of 0.62 in Q, all three within reach of what D\* shows
(1.257, 1.204, 0.647). On the old range X₃ gives c₀ = 1.247 against D\*'s
1.229. **On decade 2 X₃ gives c₁ = 0.521 ± 0.130**, the same collapse as
D\*'s 0.575: the decade-2 sampler picks gap-2 anchors at the top, so width
grows slower than Q across that sample and every width-proportional
quantity loses half its Q-slope. Kill clause (a) fired on that artefact and
is discounted; P5's MISS is the same artefact.

---

## 6. Verdict, mechanism, falsifiers

**Verdict [MEASURED, 271 anchors 211 ≤ Q ≤ 13679, one seed, sealed
score 5 of 6].** D\* has no law in Q. It has a law in the interval length:
D\* ≈ 0.5 · width with a slope 1.097 ± 0.012 in ln width on decade 1, and
the independent-thinning null reproduces it within 0.025 in slope and 2% in
ratio. By the pre-registered kill rule the item is CLOSED; the wall is
confirmed with coordinates, not moved. The question the brief asked, "c
bounded away from 2 for an identifiable reason", is answered: c is not a
constant, and the reason D\* sits where it sits is not twin-specific.

**Mechanism [HEURISTIC, not derived, one line].** A row d pins a class when
it holds one position. In the 30-wheel channel |A_d| ≈ C · 2^{ω(d)}/d for
d coprime to 30, and C = width/10, so |A_d| falls to order one at d of order
width: the moduli that kill the adversary are the moduli whose multiples
appear once or twice in the window, which is the old note's "the
information is in the remainder" with the coordinate attached. The fact that
m\*(D\*) = 1 exactly at most anchors (170 of 271 below 1.5) is the same
statement: the first forced unit of twin mass arrives with the first row
that reads a single position. Nothing in this is new to the wall survey:
it is `paper/wall-note.md` §1 Door 1's budget and §2 Face 3's history-blind
depth, priced in the stretch coordinate. **What would falsify the
heuristic:** a population where D\*/width is not of order 1 while |A_d|
at d = D\* is far from 1; the null already fails to falsify it, which is the
point.

**What this closes and what it does not.** Closed: the hope, left open in
`attack-parity-adversary.md` §9, that the D\* trend past Q = 200 might name
a structure. It names the interval length. Not touched: the y < Q sweep, the
dual certificates themselves, and the θ_min separation, all still listed in
that note's §9 and none of them moved here.

---

## 7. Not reached, and defects

- **One seed, one draw per null anchor.** The null's bars are the fit's,
  not a replicate spread. A second seed family would cost 30 minutes and was
  not run.
- **The decade-2 sample is gap-selected** (C ≤ 6000 forces gap 2 above
  Q ≈ 9000) and is 21 anchors; its c₁ is an artefact by the control and its
  c_w = 1.028 ± 0.061 is the only decade-2 number worth reading.
- **Seven decade-1 anchors are missing**, the widest ones (C from 6210 to
  9138); if D\*/width behaves differently on wide stretches this run cannot
  see it. The old note's Q = 113 hold-out (m\*(Q²) < T) has no analogue in
  the new range, where 0 anchors lack a D\* below Q².
- **The engine is floating-point.** Custody is the 172-figure gate plus the
  margin gap of 0.25 at every anchor; an exact re-run of any single new
  anchor with the old BigInt simplex was not performed.
- **Two forced re-embeds.** Disclosed in §3; the first lost 0 figures, the
  second lost only wall-clock timings.
- **Post-hoc readings** (the 61-of-105 sign, the 1.259 Mertens ratio) are
  labelled and untested.
- **The prior-art search of the old note's §5 and §9** is still owed; this
  note adds no claim that needs one.

---

*Producer and custody: `research/history/staging/attack-0829n-parity-dstar.js`,
embedded, final block forced over the stage-A seal with 0 figures lost.
Cited, never recomputed: the 43-anchor SEC 2 table of
`research/attack-parity-adversary-01.js` (asserted digit for digit in SEC 1)
and the N-thin definition of `measure-roughpair-null-0829.md` §1. HELD for
the adversarial roundup (TODO Z0). History layer: process record, staging.*
