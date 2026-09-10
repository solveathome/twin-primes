# The localized gap: the merge structure, and why the chain does not close

<!-- ledger
id: Q-localized-gap
status: CLOSED
todo: none
question: Does the Localized Merge Lemma close a chain from the localized twin-slot gap to a bound on the maximal gap?
verdict: The chain does not close, and it fails on a one-line averaging argument rather than on any sieve question; what survives is the growth law of maxsum_m and the boundary question, closed at (a)/(b) = (a)/(c) = 1.0000 at every x and every m <= 1024.
-->

*(Calibration marked throughout: PROVEN, VERIFIED by exact computation,
MEASURED, PRIOR ART. Scripts: `research/localized-01-ladder.js`,
`-02-fixed-window.js`, `-03-merge-lemma.js`, `-04-maxsum.js`. All run in under a
minute. Change history in `research/history/CHANGELOG.md`.)*

Read `research/PRIOR-ART.md` §"Holt and Rudd" first. The fusion mechanism below
is theirs, published 2014. Ours is the two-class form and the application to a
maximum gap, and that application is on Holt's own list of open problems.

## 1. The verdict

The chain does not close, and it fails on a one-line averaging argument rather
than on any sieve question. What survives is the growth law of §6, which answers
a question U-FRAME §9 had left open since 2026-08-16.

## 2. Two elementary facts

**Fact A (PROVEN).** For x ≥ 3, no two twin slots of T_x are 2 apart. If s and
s+2 were both twin slots then s, s+2 and s+4 would all be x-rough, and those
three cover every residue class mod 3.

**Fact B (PROVEN).** Folding T_x by p deletes exactly the slots in classes
{0, −2} mod p, which are 2 apart. In an interval shorter than p − 2, two kills
would have to be either p apart, impossible inside the interval, or exactly 2
apart, which Fact A forbids. **An interval of length below p − 2 contains at most
one kill.**

## 3. The Localized Merge Lemma

Write M(T_x, Y) for the largest twin-slot gap of T_x among gaps starting below Y,
and maxsum_m for the largest sum of m consecutive such gaps.

> **Lemma (PROVEN).** If M(T_x, Y) ≤ (p − 2)/4 then M(T_p, Y) ≤ maxsum₂(T_x, Y).

*Proof.* Write M = M(T_x, Y). A new gap G fuses j+1 consecutive old gaps and so
contains j kills, giving G ≤ (j+1)M. Suppose G ≥ p − 2. Partition G into
⌈G/(p−2)⌉ subintervals each shorter than p − 2; by Fact B each holds at most one
kill, so j ≤ ⌈G/(p−2)⌉ ≤ G/(p−2) + 1. Then G ≤ (G/(p−2) + 2)M, so
G(1 − M/(p−2)) ≤ 2M, and with M ≤ (p−2)/4 this gives G ≤ (8/3)M ≤ (2/3)(p−2),
contradicting G ≥ p − 2. So every new gap is shorter than p − 2, holds at most
one kill, and fuses at most two old gaps. ∎

The boundary question, whether a fused gap starting below Y can end above it, is
settled and empty: see §8.

**Why it must be localized.** On the full tile M = G₂, and the computed ladder
puts G₂ between x′²/4.5 and x′²/3.2 at every level, against a hypothesis that
asks for G₂ ≤ (x′−2)/4. The hypothesis fails at every level and by a growing
margin. In the head M ≈ c·k·ln³x against p ≈ x, so it holds from some point on.

**Where it actually turns on.** At Y = 10⁹, that is k = 2.17, the hypothesis
first holds at **x = 13933** (VERIFIED), against 13,630 predicted by solving
x* = 9.6·ln²x*·ln(Y/m̄). At k = 3 that is x* ≈ 2.4·10⁴ with Y ≈ 1.4·10¹³, **out
of computational reach by four decades.** The lemma is true and the regime where
it applies is not one we can survey.

## 4. Why the chain does not close

The telescope is M(x_n, Y) ≤ maxsum_{n+1}(T_{x₀}, Y), one index per fold, against
A5 Theorem B's proven L ≈ 0.18x on the full tile. The per-fold index cost of 1 is
real, and it is the right way to read Chris's localization payoff. The chain fails
on the number of folds it can traverse.

> **Deficit Lemma (PROVEN).** For 1 ≤ m ≤ D/2, maxsum_m ≥ m·m̄·(1 − O(m/D)), by
> averaging and nothing else.
> VERIFIED: min R = 1.187, 1.280, 1.296 across the scan, never below 1.

> **Traverse Bound (PROVEN).** Given the Deficit Lemma, the telescope's own
> hypothesis caps a block at j ≤ x/(9.6 ln²x) folds **for any constant C,
> including C = 1**, against the π(x) ≈ x/ln x folds needed. Short by 9.6·ln x,
> which is 93 at x = 16001 and grows.

**MEASURED chain survival: 0 folds for every x ≤ 12143 at Y = 10⁹, and exactly 1
fold at x = 13933 and x = 16001, against the 1863 that π(16001) requires.**

**The obvious repair is closed (PROVEN).** Weakening the gate to M ≤ α·p fails at
every α, because the gate feeds back. If the chain proves M ≤ B(x), Fact B permits
B/x kills per gap, the telescope index is B/ln x, and the bound returned is about
2.4·R·B·ln x. **The map B ↦ 2.4·R·B·ln x is expanding for every x ≥ 2**, so there
is no fixed point. **The obstruction is not the size of the gate. It is that the
gate multiplies wherever the index accumulates against a fixed base.**

That last qualifier is the whole reach of the argument.
`research/gate-multiplies.md` §2 states it as four hypotheses and tests every
recursion in the repo against them: it closes this chain and A4's tile analogue,
and it does not touch a chain that re-bases at every fold, because there the
running bound cancels out of the cost instead of compounding. What closes the
tile analogue is a different and simpler statement, the Overshoot Budget
(`gate-multiplies.md` §5): any chain of upper bounds ending in G₂(x#) < x² has a
total multiplicative overshoot capped at x²/G₂(x#), measured flat at 0.88 to 1.19
nats over the whole computed ladder.

## 5. MEASURED: the localized gap

`research/localized-01-ladder.js`, k = 3, window Y = x³, 61 folds to x = 307, in
0.64 seconds.

| quantity | reading |
|---|---|
| M(x, x³) / (k·ln³x) | flat in 1.2 to 1.6 across the ladder |
| M(x, x³) / x² | falls monotonically, 0.4155 at x = 19 to **0.00923** at x = 307 |
| folds moving M at all | 20 of 61 |
| mean increment per fold | 14.16, max 144 |

`research/localized-02-fixed-window.js` holds Y fixed, which isolates fold damage
from window growth. Folds past x > √Y are frozen by the Impact Lemma.

| Y | folds | folds moving M | mean increment | max | final M |
|---|---|---|---|---|---|
| 10⁴ | 44 | 10 | 4.64 | 42 | 210 |
| 10⁵ | 113 | 18 | 5.52 | 132 | 630 |
| 10⁶ | 301 | 25 | 4.80 | 234 | 1,452 |
| 10⁷ | 781 | 28 | 2.20 | 210 | 1,722 |
| 3·10⁷ | 781 | 41 | 2.80 | 246 | 2,190 |

The increment is additive and small, and most folds do nothing.

**The M/ln³x reading is confirmed independently and it is the one that governs
the zone.** `research/maxgap-law.md` §8 measures M(x, x²) directly by a third
engine out to x = 9973 and gets M/ln³x between 2.9 and 4.2 over a 47-fold range in
x, which is this row read at k = 2. So the localized max gap is polylog in x, and
the localized margin against the zone is **x²/(4.4 ln³x)** at the worst case across both engines (4.2 on this engine alone; 3.5 was the midpoint; `audit-cross-document-constants.md` A6), growing. Anything
that projects the localized gap as linear in x is wrong by a factor x/ln²x.

**Carry the coordinates with the constant.** The law behind the row is
M(x, Y) ≈ c·m̄·ln(Y/m̄) and c is a surface c(x, lnD), not a constant
(`maxgap-law.md` §4). Every c here is measured off the diagonal, at lnD ≈ 11 to 16
and x ≈ 10²·⁵ to 10⁴, where it runs 0.74 to 1.17. The same object read on the
whole tile, where lnD = θ(x) − ln m̄, gives 0.46. The two are the same surface, not
a disagreement, and neither number may be carried to the other's window.

The merge lemma's conclusion holds well before its sufficient condition does. At
k = 2, across all 820 folds to x = 6323, M(new) ≤ maxsum₂(old) never failed, and
the kill count per fused gap measured 1 or 2 and never more.

## 6. The growth law of maxsum_m

`research/localized-04-maxsum.js`, custody-checked against `localized-01` digit
for digit at x = 307 by a different engine, ladder to x = 16001 in 18 seconds.

> **maxsum_m = m·m̄ + σ·√(2m·ln D)**, so R(m) = 1 + (σ/m̄)·√(2 ln D / m),
> with σ/m̄ = 0.892, 0.920, 0.949 at x = 997, 3499, 16001.

Not fitted. Over m ≥ 2·ln D it holds to R/R_EV ∈ [0.981, 1.110], [1.038, 1.119],
[0.990, 1.064]. R(m) → 1 and never plateaus. Below m ≈ 2 ln D the maximum is a
single tail event, the same patch for m = 1 through 10; above it the argmax
migrates and the behaviour is bulk √m concentration. So sup R = R(1), and
**R(1) ≈ ln D is a property of the window rather than of the level**:
R(1)/ln D ∈ [0.736, 1.170] across Y = 10⁷, 10⁸, 10⁹ and x from 89 to 16001.

**This answers U-FRAME §9,** which records the hole as closed and points back
here. The repo's named single hole was a proven upper bound on maxsum_m as a
function of x that is not G₂ itself, one rung with no ladder. The ladder exists
and is the law above. It is not where the difficulty lives.

## 7. Cross-checks against A5 and A9

**A5 agrees independently.** Theorem C transplanted gives κ(m) = 1 for all m ≤ 6
at every x ≥ 997, and Theorem B gives L ≤ 1 from x = 499 at Y = 10⁹. Localization
repairs Theorem B by moving its ceiling rather than by a better argument:
G₂/(3p) ≈ 0.18x on the tile becomes M(x,Y)/(3p) ≈ 0.8·ln²x·ln D/x in the head,
dropping below 1 from x ≈ 470.

**A9 departs by about 20% and should not be extrapolated.** Its tile fit rate
1.2992/m̄ predicts R(1) between 12.0 and 12.6 across the scan; measured is 12.6 to
18.7, mean ratio 1.23. The head's own rate is about 1.06/m̄. The far tail is
better: A9 predicts 1.1e−3 gaps of size ≥ 2p′ at x = 1009, and there is one.

## 8. The boundary question is closed

Three rules computed in one pass: gaps with left endpoint below Y, buffered, and
fully contained. **(a)/(b) = 1.0000 and (a)/(c) = 1.0000 at every x, every
m ≤ 1024, at Y = 10⁷, 10⁸ and 10⁹.** Optimal windows overshoot Y by zero; edge
windows reach at most 76 to 83 percent of maxsum.

## 9. Attribution

The fusion mechanism is Holt and Rudd 2014, Lemma 3.1 of arXiv:1408.6002,
restated in arXiv:2603.25915 §1: *"the minimum span between fusions is 2p_{k+1}.
So provided that |s| < 2p_{k+1}, the possible fusions in s all occur in separate
images of s."* Their minimum span is 2p because the minimum gap between
generators is 2. Ours is p − 2 because the two kill classes sit 2 apart, which is
why the two-class version needs Fact A.

Not found in their work or elsewhere: the two-class form, and the use of the
bound as an upper chain on a maximum gap inside a localized window. Holt
restricts to spans below 2p throughout and records that Jacobsthal values exceed
2p_k, which is §3's "why it must be localized" from the other side.

## 10. The compute observation, which outlives the lemma

Every localized object needs a segmented sieve of [0, x^k) and never the tile of
width x#. The ladder is capped by x^k, not by x#. The runs above cover 820 folds
to x = 6323 in 27 seconds, against the nine-point ladders the rest of the repo
works with. Any question here phrased about a bounded window rather than the
whole tile can be asked three decades further out than it currently is.

## 11. Reproduction

```
node research/localized-01-ladder.js 3e7 3        # 0.6 s
node research/localized-02-fixed-window.js        # 44 s
node research/localized-03-merge-lemma.js 4e7 2   # 27 s
node research/localized-04-maxsum.js              # 18 s
```

Custody: the k = 2 runs reproduce known maximal twin-prime gaps, since below x′²
the slots are twin primes. M(x, 10⁷) = 1,722 and M(x, 3·10⁷) = 2,190 at the top
of the ladder, both consistent with the tabulated record twin gaps.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
