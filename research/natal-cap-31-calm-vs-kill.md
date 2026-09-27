# Calm vs Kill (attack 31): what the anchored calm buys against annihilation

<!-- ledger
id: Q-calm-vs-kill
status: PARTIAL
todo: none
question: What does the anchored calm buy against annihilation?
verdict: Two theorems, the @11 closure and the X-Limitation Theorem at @11, @13, @17 and @19, and two refutations, calm implying concentration and minimizer loudness; the overlap-floor candidate that would prove non-annihilation dies on the anchor's own drift, with the anchored rotation t = 0 its worst case at @17, leaving the X-floor open.
-->

*(2026-08-14, natal-cap series. Companion to `natal-cap-31-calm-vs-kill.js` —
full enumeration of the rotation ensemble at @11/@13/@17 (2,310 / 30,030 /
510,510 rotations), every identity below machine-verified, all counts exact
integers. Under moratorium: not for circulation.)*

The calm this file prices is a phenomenon with nine separately-graded
sub-claims; their statuses are in [anchored-calm.md](anchored-calm.md).

## The question

TPC failing at level x is the anchored rotation's survivor count S(0)
hitting zero — an extreme lower-tail event of S over the rotation ensemble.
The anchor is provably (cap-19 fusion) and measurably (VR rank 2/510510 @17,
14/9.7M @19) in the ensemble's low-variance family. The card to play:
*low-variance members hug their conditional mean, hence sit far from the
S = 0 tail*. This file makes the algebra exact, measures the rest, and
reports honestly which half of the intuition survives.

## The exact ledger

Per rotation t, with m_r = #{q : q strikes r at t}, all verified per
rotation and against brute recomputes:

- **L1 (strike ledger).** S(t) = N − M(t) + X(t), where M = Σ_q G(t,q)
  (strikes with multiplicity), X = Σ_r (m_r − 1)⁺ (overlap credit). With
  H = 2Σ_q 1/q and D(t) = Σ_q dev(t,q): M = HN + D, so
  **S(t) = N(1−H) + X(t) − D(t)** and
  Var(S) = Var(D) + Var(X) − 2Cov(D,X) exactly.
- **L2 (loudness bridge).** Cauchy–Schwarz: |D(t)| ≤ √(K·V̄·VR(t)),
  V̄ = Σ_q VarRot(q). Loudness VR controls the total strike surplus.
- **L3 (second order).** 0 ≤ X(t) ≤ P2(t) = Σ_r C(m_r,2)
  = Σ_{q<q′}|A_q ∩ A_q′|(t) — cap-12's S₂ read at rotation t; Bonferroni
  N − M ≤ S ≤ N − M + P2.
- **L4 (calm floor).** S(t) ≥ N(1−H) − √(K·V̄·VR(t)). When H < 1:
  **S(t) = 0 ⇒ VR(t) ≥ N²(1−H)²/(K·V̄)** — a proven annihilation-loudness
  bound. H < 1 holds only at @11 (H = 0.789; @13: 1.147, @17: 1.494 — the
  overlap-credit capacity excess of the glossary).

## Theorem 1 (@11 non-annihilation via calm — proven, new door)

At @11, H = 0.789 < 1, so L4 reads: **S(t) = 0 ⇒ VR(t) ≥ Δ²/(K·V̄) = 2.392**
(Δ = N(1−H) = 19.0). Enumeration: exactly 7 of the 2,310 rotations have
VR ≥ 2.392, and their survivor counts are 30–48 > 0. Hence **no rotation of
the @11 scour annihilates the natal set** — one inequality plus seven direct
checks. (cap-21 Theorem 3 closed the larger independent ensemble by a
1.63M-member exhaustion; this is the same conclusion for the diagonal
ensemble at the cost of a Cauchy–Schwarz line.) The door closes forever at
@13: H = 1.147, 1.494, … — the glossary's overlap-credit capacity excess.

## Theorem 2 (the X-Limitation Theorem, at @11, @13, @17 and @19 — annihilation is X-limited, not D-limited)

From L1–L2 and the enumerated ensemble maximum of VR: S(t) = 0 requires
D̂ − X̂ = S̄ where |D(t)| ≤ √(K·V̄·VRmax) = 20.5 / 97.8 / 542 / 2987 against
S̄ = 38.2 / 310.9 / 3614.9 / 49238.8 at @11/@13/@17/@19. At each of those levels
the strike channel is **provably too small to annihilate even at
ensemble-maximum loudness**; S = 0 requires overlap collapse
X̄ − X ≥ S̄ − max|D| = 213 (8.2 σ_X) @13, 3073 (14.7 σ_X) @17, and 46,252 @19.
The kill, if ever, is an overlap-credit event.

**The fence tightens with level**: max|D| is 53.5%, 31.5%, 15.0% and 6.1% of S̄
at the four levels. The strike channel is not merely too small, it is becoming
irrelevant.

**Scope, exactly.** The proof runs **per level**, from L2 plus the *enumerated*
ensemble maximum of VR. This file walks three levels in full, @11, @13 and @17
(2,310 / 30,030 / 510,510 rotations). **The fourth level is enumerated
elsewhere**: `natal-cap-19-calm-lemma.js` PART A walks all 9,699,690 rotations
at @19 and prints VR(W/2) = 2.293 at rank-from-top 0, and
[natal-cap-38-loudness-driver.js](natal-cap-38-loudness-driver.js) reproduces
that maximum independently and supplies the S̄ = 49,238.76 the theorem needs at
that level. The files agree on the shared level to three digits, cap-19's @17
printing 2.143 against this file's 2.14, cap-19 records "reproduction of
cap-05/13 @17: PASS", and cap-38 reproduces W, N, K, V̄, S̄, VR(0) and max VR
against this file's pasted output at all three of @11, @13 and @17 before it
reports @19. So it is one statistic across four levels and not three parallel
ones.

**Note the equivalence, because it is what makes the conjecture below the whole
question.** max_t VR < S̄²/(K·V̄) is, after multiplying out and taking a square
root, exactly √(K·V̄·VRmax) < S̄ — the inequality this theorem's proof needs.
The Loudness Ceiling Conjecture is therefore not a separate hope about
loudness: it is precisely the statement that this theorem's per-level proof
goes through at every level. Computing the @19 driver is what promoted @19
from conjecture to theorem here.

There is still no bound on max VR that holds for all x, here or anywhere in the
corpus, so the theorem is established at those four levels and nowhere else.
At @11 it is superseded by Theorem 1, which closes that level outright.

> **Loudness Ceiling Conjecture [OPEN].** For every x ≥ 13,
> max_t VR(t) < S̄²/(K·V̄) — the ensemble's loudest rotation stays below the
> squared driver, which is what extends the X-Limitation Theorem to all levels.

**Its two legs are not equal, and only one of them was ever load-bearing.** The
stated support was two measured trends over three points: max VR falls,
2.78 / 2.35 / 2.14, and the driver S̄/√(K·V̄) rises, 3.1 / 4.9 / 9.8. **The @19
enumeration gives max VR = 2.293, so max VR does not fall.** It runs 2.78, 2.35,
2.14, 2.293: down for two levels, then up, with the deepest level above the one
before it. That is the same shape as rho, where "rising with level" was asserted
on a short run and refuted by measurement, and it must not be restated as a
trend in either direction.

**The @19 driver is now computed, and the conjecture survives at @19 by a factor
of 272** ([natal-cap-38-loudness-driver.js](natal-cap-38-loudness-driver.js)).
S̄ at @19 is 49,238.76, so the driver is 24.96 and the threshold S̄²/(K·V̄) is
623.1, against an enumerated max VR of 2.293.

| | @11 | @13 | @17 | @19 |
|---|---|---|---|---|
| max VR | 2.777 | 2.352 | 2.143 | 2.293 |
| driver S̄/√(K·V̄) | 3.12 | 4.88 | 9.75 | **24.96** |
| threshold S̄²/(K·V̄) | 9.7 | 23.8 | 95.2 | **623.1** |
| margin threshold / max VR | ×3.5 | ×10.1 | ×44.4 | **×271.7** |

So the leg that broke was carrying almost none of the weight. The margin does
not merely grow, its growth accelerates — by factors of 2.9, 4.4 and 6.1 per
level — because S̄² outruns K·V̄ while max VR has stayed inside [2.14, 2.78]
across a factor of 4,200 in W. **The honest support is now one monotone
measured trend over four levels, with two orders of magnitude of headroom at
the deepest level that can be enumerated.**

**It is still [OPEN], and four levels is still four levels.** What would
falsify the conjecture is max VR growing like S̄²/(K·V̄); what is measured is a
max VR that does not visibly grow at all. Neither is proven for any x > 19, and
this corpus has twice had a short-run trend refuted by the next point — rho, and
max VR itself. So "the X-Limitation Theorem holds from x = 13 upward" remains a
conjecture and must not be written as a proven scope. What has changed is the
size of the gap being conjectured across, not its status.

## The measurements (full enumeration, exact)

| | @11 | @13 | @17 |
|---|---|---|---|
| rotations / K / H | 2,310 / 10 / 0.789 | 30,030 / 34 / 1.147 | 510,510 / 120 / 1.494 |
| S̄, σ_S | 38.24, 3.70 | 310.9, 25.0 | 3614.9, 207.5 |
| Var split D + X − 2Cov | 15.0+15.1−16.3 | 120+669−163 | 1146+43654−1731 |
| corr(VR,S) / corr(VR,(S−S̄)²) | 0.088 / 0.113 | 0.004 / 0.014 | 0.002 / 0.001 |
| corr(X,S) | 0.48 | 0.91 | 0.99 |
| Var(S\|VR≤VR(0)) / Var(S) | 1.04 | 1.03 | 1.40 |
| min S (σ below mean) | 28 (2.8σ) | 248 (2.5σ) | 3033 (2.8σ) |
| S=0 depth in σ_S | 10.3 | 12.4 | 17.4 |
| minimizer VR percentiles | p26.5–p98.7 | p1.4–p92.4 | p19.7–p88.1 |
| min{VR : S ≤ q0.1%} vs VR(0) | 0.73 vs 0.34 | **0.55 vs 0.62** | 0.65 vs 0.55 |
| anchor S, D, X (z) | 45, +2.0, 28 (+2.3) | 307, −0.3, 452 (−0.2) | 3099, −50.8 (−1.5), 10381 (**−2.71**) |

Readings, compressed (full set in the .js):

1. **Calm does not concentrate S.** VR-decile means of S are flat to <0.5%;
   conditioning on the anchor's calm leaves Var(S) unchanged (@17 it grows:
   the 11-member calm family has the ANCHOR as its own S-minimum). The
   intuition's middle step — "low variance ⇒ near mean" — is false here
   because VR measures only the strike-surplus channel D, and Var(D) is
   2.7% of Var(S) at @17. S's fluctuation is overlap-credit fluctuation
   (corr(X,S) = 0.99).
2. **Minimizers are not loud.** At @13 two of the eight tied global
   minimizers are among the calmest 1.4% of the ensemble, and the loudness
   floor over near-minimal S sits *below* the anchor's own VR. The lemma
   "S = 0 requires VR ≥ v_min(x) with v_min growing" is refuted at @13+ as
   a mechanism; it survives only as the @11 pigeonhole (Theorem 1).
3. **The anchored drift lives in X.** The anchored S-deficit at @17 (−516,
   z = −2.49 in this ensemble) splits as −567 from overlap credit versus
   −51 from strikes. The anchor is calm in D and *drifting* in X — the two
   channels are different objects, and fusion speaks only about the first.

## The candidate lemma and where it dies

**Overlap-floor candidate.** If |X(t) − X̄| ≤ c·√(K·V̄·VR(t)) held with a
level-bounded c, then S = 0 ⇒ VR ≥ (S̄/(1+c))²/(K·V̄) = 1.9 / 3.9 / 10.2 —
exceeding the enumerated max VR (2.78 / 2.35 / 2.14 at these three levels, and
2.293 at @19 from cap-19) from @13 on: it would
prove non-annihilation for the *entire* ensemble, and the driver
S̄/√(K·V̄) = 3.12 / 4.88 / 9.75 / 24.96 grows with level, so it would scale
(the @19 value is cap-38's; c_obs is not computed at @19, so the candidate's
own price is unmeasured there). Measured
price: c_obs = 1.25 / 1.46 / 2.06 — growing, and at @17 the maximizing
rotation is **t = 0 itself**: the anchored X-drift is the candidate's own
worst case. The missing link dies on the anchor's drift — the β wall again.

## Calibration: the chain, link by link

fusion ⇒ anchored windows fuse [PROVEN, cap-19 L1–L2] ⇒ anchored VR small
[quantitative rank MEASURED: 2/510510 @17; the Cov_adj < 0 aggregate result,
cap-23] ⇒ |D(0)| ≤ √(K·V̄·VR(0)) [PROVEN, L2 — 276 = 8% of S̄ @17] ⇒
"cannot be zeroed" [**BREAKS**: needs the X-channel, which VR does not
constrain]. What this file adds as theorems: the @11 closure (Theorem 1) and
the X-Limitation Theorem at @11, @13, @17 and @19 (Theorem 2, the fourth level
supplied by cap-38). What it refutes:
calm ⇒ concentration, and minimizer loudness. The single missing statement,
exact:

> **X-floor (open).** S(0) > 0 ⟺ X̄ − X(0) + (D(0) − D̄) < S̄; with the
> strike term fenced by fusion+L2, TPC at level x reduces to: *the anchored
> overlap-credit deficit stays below (1 − ε)·S̄.*

Measured X(0)/X̄ = **1.4541 / 0.9908 / 0.9482 / 0.9558** at @11 / @13 / @17 /
@19 — **down for two levels, then up**. This is the X-face of the anchored bias
β(x) (anchored-note §6), but only over the first three levels; at @19 the two
part company, and that is the useful content of the entry. It is the
**X-Channel Restatement of
Assumption A** — a restatement with measured support, not a reduction:
Assumption A is relocated to a channel where the drift is visible, not removed
or weakened. Honest scaling verdict: the calm-vs-kill tension does not convert
fusion into non-annihilation at any level ≥ 13; its real yield is the fence
around the strike channel and the exact identification of where the drift
lives. Ensemble caveat: this diagonal ensemble's mean differs from both the
independent strike ensemble and the window ensemble (S̄ = 3614.9 vs 3245.5
@17); anchored z here (−2.49) is not cap-07's window z (−4.50). P2 (cap-12's
S₂) tracks X poorly (corr 0.59 / 0.13 / −0.21; anchored P2 z = −0.30 vs X
z = −2.71 @17): the anchored overlap deficit is multiplicity-structure
(m ≥ 3), not pair counts — a warning for T4-style routes to X-tails.

*(CORRECTED 2026-08-18, and the correction is worth more than the number.
The sentence read "Measured X(0)/X̄ = 1.45 / 0.991 / 0.948, **descending**",
three levels and a trend word. `natal-cap-35-x-multiplicity.js` added the
fourth: 0.9558 at @19, so the sequence goes down twice and then up. Note the
provenance, because it should travel with the figure: cap-35's @19 row is a
**u-form means row, not a brute-force sweep**. The u-form is checked against the
sweep at @11, @13 and @17 and passes at all three ("[u-form vs sweep: PASS]");
the @19 line carries no such tag because the sweep is exactly what the u-form
replaces there. Nor was the break a surprise — cap-35's own header P5 predicted
it in advance: "since X̄/S̄ grows like the overlap capacity, X(0)/X̄ must flatten
back toward 1 even while β keeps descending. Predicted: the 'descending through
1' reading of X(0)/X̄ = 1.45, 0.991, 0.948 breaks at @19."*

***This is the same shape, at the same level, as max VR, and this file already
records that one.*** The "Theorem 2" section above gives max VR as
2.78, 2.35, 2.14, **2.293** —
down for two levels, then up, at @19. So two independent monotone claims in
this document break at the fourth level and in the same direction, and one of
them was written up here as a correction while the other was left standing a
hundred lines further down. Wave 5 logged the ρ case as a third instance of the same class,
a trend asserted on a short run and refuted by the next point. **Treat @19 as
the level at which short-run trends in this family stop being trends**, not as
two coincidences.

***Do not carry the break over to β.*** β = S(0)/S_CRT reads 1.1458, 1.0089,
0.9549, 0.9261 at the same four levels and keeps falling, and
`paper/anchored-note.md` has it descending over ten levels, 1.156 down to 0.846
through @41, with no break. It is the X-channel that turns, not the anchored
bias, and (X̄−X(0))/S̄ — the form Assumption A is actually stated in — rises
monotonically at −0.2287, +0.0134, +0.1568, +0.2225. The X-face identification
above is therefore a three-level statement and is written as one.
Sites carrying the same figures, all corrected the same day:
`research/GLOSSARY.md`, `paper/anchored-note.md`, `paper/wall-note.md`.)*
