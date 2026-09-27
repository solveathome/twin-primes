# The excess chain's c: the compressed-tail max correction, derived and scored on eight levels

<!-- ledger
id: Q-excess-chain-c
status: CLOSED
todo: 10 (retired)
question: Does the excess chain's constant c pin to 1.074 via a compressed-tail max correction?
verdict: NO: for any FIXED correlation length the derived family tends to 1 and both named corrections lower the maximum, so 1.074 is not derivable from a compressed-tail max correction; c measures 1.05 +/- 0.07 (sd) over x = 17..31, MEASURED, which does not separate 1.05 from 1.074.
-->

**TODO item 10, executed 2026-08-28. Status: item stays OPEN. c is not pinned.**

Verdict first. The compressed-tail max correction that item 10 asks for has been
written down and tested. It fails to pin c. Worse than fails: it points the wrong
way. Both named corrections (Gumbel centering, sub-Gaussian tail compression)
lower the predicted maximum, while the measured c sits ABOVE the uncorrected
prediction at five of the eight levels. The zero-parameter correction predicts
c(x) = 0.763, 0.808, 0.838, 0.865, 0.884, 0.899, 0.911, 0.921 at x = 7..31 and
the measured c is 0.778, 0.877, 1.025, 0.933, 1.062, 1.094, 1.078, 1.075. The
residual is +2.0%, +8.6%, +22.3%, +7.8%, +20.1%, +21.7%, +18.2%, +16.7%. The
correction appears to account for the small-k transient at x = 7 only through the
asymptotic's own o(1/a_n) error: the exact E[max] at n = 10.5 is 5.8% below
b_n + γ/a_n, and with the exact maximum the x = 7 residual is +7.9%, not +2.0%.
The correction accounts for nothing at any level. Substituting exact maxima
throughout, the eight residuals read +7.9, +12.2, +24.9, +9.2, +21.2, +22.4,
+18.8, +17.1% and the zero-parameter log-rms worsens from 0.1489 to 0.1614.

And the limit is contradicted in kind, not only in size: at fixed ν every member
of the correction's family tends to 1 as the level grows, so 1.074 cannot be its
limit.
If 1.074 is a limit at all it is the limit of something this derivation does not
contain.

CALIBRATION: everything below is MEASURED (seven of the eight inputs imported
from embedded artifacts; the eighth, E_med(31), is read off the hand-pasted RUN 1
tail of `natal-cap-33-overnight.txt`, which `TODO.md` line 457 lists among the
three unbound hand-pasted tails) or HEURISTIC (the correction, which is classical
EVT applied to a null the chain assumes rather than proves). Nothing here is PROVEN. The
scoring is scratchpad-grade, from
`node research/history/staging/excess-chain-c.js` (~0.1 s; output embedded in
that file under custody, code-sha256 `a09b55d4c7a17297…`).

---

## 1. Orientation: what the objects are, with file and section

Five questions had to be answered before any derivation. All five, with sources.

**(i) The chain.** `research/natal-cap-25-excess-law.js` header and reading 1.
The object is `E_x(l) = M_x(l) − N·l/W`: the maximum sliding-window natal count
at depth x over a window of length l, minus the fair share. W = x#, N = 2·∏(p−2)
over 7 ≤ p ≤ x, and the grid of l values is cap-17's scour-length grid,
`l = ceil(W/q)` over the scour primes q with x < q, q² ≤ W, subsampled to about
140 values when the scour is large. The chain, in three links:

- **cap-25** measures that `E_x(l) ≈ c·σ_x(l)·√(2·ln(W/l))`, with σ_x(l) the
  exact standard deviation of the window count over all W rotations of the
  depth-x tile, and n_eff = W/l the effective block count.
- **cap-29** (`natal-cap-29-sigma-plateau.js`, readings 1 and 3) removes σ as a
  measured input: the variance plateau P = avg_l Var(l) has an exact BigInt
  closed form in 3·4^n CRT branch terms, and the pointwise
  `VarPred(l) = P − (2/π²)Σ_{j≤J₀}|S(j)|²(1/2 − sin²(πjl/W))/j²` reconstructs
  Var(l) on whole grids to about 1%.
- **cap-33 RUN 1** (`natal-cap-33-overnight.txt`) supplies the eighth level.

So the chain is: exact plateau → factored spectrum → VarPred → √(2 ln(W/l)) → c.
Only c is free.

**(ii) What c is, and how it is measured.** One sentence: c is the ratio of the
measured median window-excess to the median of the EVT prediction,
`c = E_med / P_med` with `P_med = med_l( σ_x(l)·√(2 ln(W/l)) )`, i.e. the single
scalar by which the extreme-value law of a sub-Poisson field misses the
measured maximum. Per-level c is printed in `natal-cap-25-excess-law.js`
PART 3. The two conventions in circulation are `c* = 0.972`, the geometric mean
over the seven levels x = 7..29, and `c ≈ 1.08`, cap-25 reading 6's guess that
the last four levels have settled.

**(iii) What "RUN 1 passed at 0.5%" tested.** `natal-cap-33-overnight.txt`
RUN 1. cap-29 PART 4 put `P_med(31) = 56.68` on record before any @31 window had
been measured, and with it two predictions: `E_med(31) = 54.98` on the c* = 0.97
convention and `61.22` on the c ≈ 1.08 variant. The 38-minute @31 march measured
`E_med(31) = 60.90`. Against 61.22 that is 0.995, hence the 0.5%. Against 54.98
it is 1.108, an 11% miss. So the 0.5% is a statement about the c ≈ 1.08 branch
only, and the implied constant is `c(31) = 60.90/56.68 = 1.0745`, which is where
the 1.074 in the TODO comes from. The a-priori part of that test is the chain
below c (plateau, spectrum, VarPred, log factor), not c itself.

**(iv) What "the compressed-tail max correction" refers to.**
`natal-cap-25-excess-law.js` reading 5, which is the only place the phrase is
grounded: "TAIL SHAPE: COMPRESSED, AS THE SUB-POISSON FIELD DEMANDS. Excess
kurtosis is negative at all six full enumerations (−0.02..−0.78); P(z≥3) ≤
Gaussian at 5 of 6 ... The compressed tail is why c* ≲ 1 rather than c* > 1: a
Gumbel centering correction (−(ln ln n)/2√(2 ln n), ~10–20% here) and the
sub-Gaussian compression roughly offset." The tail object is therefore the upper
tail of the window-count field C(s) over the complete rotation ensemble
s ∈ [0, W), and the correction asked for is the difference between the crude
`√(2 ln n)` and the true expected maximum of n such draws.

**(v) Which eight levels carry data.** x = 7, 11, 13, 17, 19, 23, 29, 31. The
first seven are cap-25 PART 3 (E_med and P_med) with median σ from cap-29 P0;
the eighth is cap-33 RUN 1 for E_med(31) = 60.90 and cap-29 PART 4 for
P_med(31) = 56.68, with med σ(31) = √132.83 from cap-29 PART 3. The three deeper
plateaus P(37) = 1464.77 and P(41) = 3971.26 are on record but carry no measured
E_med, so they are forecasts, not levels.

---

## 2. The correction, written out

**The tail object.** C(s) = #{natal slots in [s, s+l)}, s ranging over all W
rotations of the depth-x tile. Mean N·l/W exactly, variance σ²(l) exactly
(cap-25's J₅ pass, cap-29's closed form). Var(W) = 0 identically, which makes
σ²(l) W-periodic and puts the field in Torquato's class I by periodicity alone,
a classification that is exact and arithmetically empty; at the window scales
read here the counts are sub-Poisson, not hyperuniform (GLOSSARY, Hyperuniformity;
`import-repulsive.md` §3). cap-25's pre-registered discrepancy lemma caps every
deviation at 2·3^k with k the number of mid primes.

**The null the repo uses.** The maximum of n effectively independent Gaussian
blocks, n_eff = W/l. cap-25 reading 3 supports that count three ways, the
strongest being that the full-field autocorrelation decays on scale about l/2 and
turns negative by lag l.

**The correction.** Under that null the classical extreme-value normalisation is

    a_n = √(2 ln n),
    b_n = a_n − (ln ln n + ln 4π) / (2 a_n),
    E[max] = b_n + γ/a_n + o(1/a_n),   γ = 0.5772…

The chain's prefactor is `E[max] / (σ √(2L))` with `L = ln(W/l)`, so the derived
c, at n_eff = ν·W/l, is

    c(L; ν) = ( b_n + γ/a_n ) / √(2L),      ln n = L + ln ν,

and at ν = 1 this is zero-parameter. Its expansion is the honest statement of
the correction's sign and size:

    c(L; 1) = 1 − (ln L + ln 4π − 2γ) / (4L) + O(L⁻²)
            = 1 − (ln L + 1.3766) / (4L) + O(L⁻²).

**Two consequences that decide the item before any arithmetic.**

1. The correction is NEGATIVE and vanishing: c approaches 1 from below, at rate
   (ln L)/(4L). Any fixed ν only shifts ln n by a constant and does not change
   the limit. So the derived family has limit exactly 1 at fixed ν, and 1.074 is
   outside it. The clause is only that strong at fixed ν: if ν grows with L the
   limit is √(lim ln n/L), and PART 3 below measures ln n/L drifting to
   1.32–1.41, so the limit-1 statement is about the family as derived, not about
   the measured field.
2. **The compression mechanism has the same sign.** A sub-Gaussian upper tail
   lowers the maximum relative to the Gaussian one. Gumbel centering lowers it
   too. Two downward corrections add; they do not offset. cap-25 reading 5's
   phrase "roughly offset" cannot be right as an account of two corrections that
   both push the same way. What reading 5 is actually explaining is why the
   seven-level geometric mean c* = 0.972 came out below 1, and that number is
   held below 1 by the two small-k levels (c = 0.78 and 0.88); the five deep
   levels average 1.049 and four of them exceed 1.

That second point is the derivation's central result, and it is negative: the
compressed-tail correction cannot close a gap whose sign is upward.

**The lattice correction, for completeness.** C(s) is integer, so the exceedance
level solving P(C ≥ m) = 1/n carries a continuity correction,
m = μ + 1/2 + σ z_n, and in c-units the shift is exactly 0.5/P_med. This is the
one correction that pushes upward. It is largest where it is least wanted:
+0.327 in c at x = 7, +0.009 at x = 31.

---

## 3. Scored on all eight levels at once

Scratchpad-grade, `node research/history/staging/excess-chain-c.js`. The grid
rule is recomputed from scratch in that script (sieve, ceil(W/q), cap-01 median
convention) and it reproduces cap-25's and cap-29's own grid sizes: 435 lengths
at @19, 139 at @23, 143 at @29, 145 at @31, and l_min(31) = 447,851. Custody on
L: the independently computed `L = ln(W/l_med)` agrees with the chain's own
implied `(P_med / med σ)²/2` to better than 3% at five of eight levels, and to
better than 6.5% at all eight; the two failures are 3.8% at x = 11 and 5.6% at
x = 19, worst 6.4% at x = 7 (a two-point grid).

| x | L | c measured | c derived (ν=1) | residual | c derived + lattice | residual |
|---|---|---|---|---|---|---|
| 7 | 2.351 | 0.7778 | 0.7627 | +2.0% | 1.0895 | −28.6% |
| 11 | 3.363 | 0.8766 | 0.8075 | +8.6% | 1.0203 | −14.1% |
| 13 | 4.418 | 1.0253 | 0.8380 | +22.3% | 0.9646 | +6.3% |
| 17 | 5.802 | 0.9325 | 0.8649 | +7.8% | 0.9299 | +0.3% |
| 19 | 7.265 | 1.0623 | 0.8844 | +20.1% | 0.9265 | +14.7% |
| 23 | 8.831 | 1.0943 | 0.8994 | +21.7% | 0.9229 | +18.6% |
| 29 | 10.525 | 1.0776 | 0.9114 | +18.2% | 0.9263 | +16.3% |
| 31 | 12.257 | 1.0745 | 0.9208 | +16.7% | 0.9296 | +15.6% |

(The measured c column is recomputed from the rounded E_med and P_med table
entries, so it differs from cap-25's printed c in the third decimal.)

**Model comparison, log-space rms, all eight levels and the last five.**

| model | parameters | rms (8) | rms (last 5) |
|---|---|---|---|
| Gumbel, ν = 1 | 0 | 0.1489 | 0.1610 |
| Gumbel + lattice | 0 | 0.1703 | 0.1354 |
| constant c = 0.9838 | 1 | 0.1153 | 0.0851 |
| A · Gumbel, A = 1.1445 | 1 | 0.0629 | 0.0471 |
| Gumbel, ν fitted = 2.14 | 1 | 0.1167 | 0.1171 |

Read that table in this order, and read the rms column knowing that both rms are
computed with N, not N − k, so the one-parameter constant is charged nothing. The
zero-parameter correction has a higher raw log-rms than a fitted constant on all
eight levels (0.1489 vs 0.1153), but the two are not distinguishable once the
constant's free parameter is charged: ΔAICc = 0.36 in the constant's favour,
F = 1.67 on (8,7) against a 5% critical value near 3.7. Even for pure noise,
fitting one location parameter reduces rms by √(7/8) = 0.935 by construction. The
rms comparison is not what carries the verdict.

What carries it is the residual sign, which this file's own table gives and does
not score. Under the chain's own null the maximum is a single Gumbel draw with sd
1.2826/(2L) in c-units, so the eight residuals sit at +0.06, +0.36, +1.29, +0.61,
+2.02, +2.68, +2.73, +2.94 sd, positive at 8 of 8 (sign test p = 0.0039). The
derived correction is low at every level, not merely noisy against a constant.

Adding the lattice correction makes it worse again overall, because it
over-corrects exactly the two levels the Gumbel term already handled. Letting the block count float lands on ν = 2.14,
which is the physically right number (the measured correlation length is about
l/2) and which buys nothing: rms 0.1167 against a constant's 0.1153, and it is
worse than a constant on the deep levels. The only model that improves on a
constant is `A·Gumbel` with A fitted at 1.1445, which beats the constant by
ΔAICc = 9.7, and A = 1 is precisely the derived claim. A and the fitted block
count are one number, since ln n/L = A² = 1.3099, so the derived L-dependence is
earning its keep and only the normalisation is off by 14.5%. That model renames
c; it does not pin it.

**What the measured c demands of the block count.** Inverting the correction at
free ν per level gives ν = 1.07, 1.58, 5.57, 2.16, 14.68, 37.25, 38.06, 49.69,
i.e. an effective correlation length of l/50 at x = 31. That contradicts the
measured autocorrelation decay scale of about l/2 (cap-25 reading 3c) by a factor
near 25, and the implied exponent ln n / L drifts 1.03 → 1.32 rather than sitting
at 1. So the shortfall lives in the n_eff leg, not in the tail-shape leg, and no
constant repairs it.

**Is 1.074 reproduced, approached, or contradicted.** Contradicted as a limit of
the derived family, which tends to 1 (at L = 12, 20, 40, 100, 1000 the derived c
reads 0.9196, 0.9453, 0.9683, 0.9850, 0.9979). Not reproduced at any level. What
the eight measurements support, and only at MEASURED rung, is a flat c over the
last five levels, x = 17..31: 0.933, 1.062, 1.094, 1.078, 1.075, mean 1.0482,
sample sd 0.0657, sem 0.0294, slope +0.0069 ± 0.0048 per unit x (t = 1.44, 3 dof).
Given that cap-29 reading 5 shows single-level plateau steps swinging ×1.9 to
×4.2 on twist luck (|S(1)|² swings ×240 across levels), that scatter is
consistent with twist noise, and the honest statement is c = 1.05 ± 0.07 (sd)
over x = 17..31, with no detectable trend and almost no power to detect one at
n = 5. The data do not separate 1.05 from 1.074: the ±0.07 is carried almost
entirely by the single @17 point, and dropping it gives 1.0772 ± 0.0114 over
x = 19..31, which contains 1.074. Where the window starts decides the comparison
and neither choice is argued here. What is refuted is the DERIVATION of 1.074
from a compressed-tail max correction, not the value.

---

## 4. What pinning c would buy, and what it does not

Nothing about the twin prime conjecture. E_x(l) is a maximum window count inside
a fixed-depth periodic tile; the conjecture lives in the placement question at
the quadratic point, and the excess law never touches it. Per
`research/IMPORT-MAP.md` §0 this is DERIVED-CONSTANT grade and CLEAN on the
circularity pre-check: the payoff needs no hypothesis of postulate strength.

What it would buy, concretely: a zero-parameter forecast of E_med at @37 and @41,
where the plateaus P(37) = 1464.77 and P(41) = 3971.26 are already on record but
the marches are not run; and the last free number in a chain that is otherwise
exact from CRT branch sums up. That is a reproduction target, not a lever.

What this session actually banked: the correction is written down, it is
zero-parameter, and it is scored and rejected. The item's premise, that the
compressed tail explains the residual, is refuted by sign. The residual is
relocated to n_eff.

---

## 5. What would falsify this, and whether that check has run

1. **The sign argument.** Falsified if the sub-Gaussian compression can raise a
   maximum. It cannot for a tail uniformly lighter than Gaussian, but the six
   enumerated rows in cap-25 PART 4 are not uniformly lighter: P(z≥2) exceeds the
   Gaussian 0.0228 at four of six rows (0.0332, 0.0244, 0.0362, 0.0443) while
   P(z≥3) is below Gaussian at six of six. Mid-tail heavier, far tail lighter, is
   a different object from "compressed", and this file proposed it as the right
   sign to lift c. CHECKED and refuted in every family built: exact
   order-statistic quadrature over truncated normals at 4σ/3σ/2.5σ and symmetric
   bimodals with excess kurtosis −0.74 to −1.68 all LOWER E[max] against Gaussian
   at n = 2.1e5, by 13% to 51% (`redteam-0828-closures.md` §2). The six rows are
   also lattice-dominated: the z-lattice spacing 1/σ is 0.75 at @13 and 0.45 at
   @17, so the z ≥ 1, 2, 3 thresholds are coarse. A tail enumeration at @23 or
   deeper, where 1/σ ≤ 0.2, is still the direct check and has not run.
2. **The n_eff relocation.** Falsified if a direct count of effectively
   independent blocks at @23 or @29 comes out near W/l rather than 30 to 50 times
   it. NOT RUN. The cheap version is a block-maximum bootstrap on the enumerated
   field at @17, which is 510,510 windows and fits in seconds.
3. **The imported measurements.** Falsified if E_med or P_med at any level is
   misquoted. Each of the eight is sourced in §1(v) and carried in the script's
   provenance block, with the standing exception that E_med(31) comes off a
   hand-pasted tail. The custody check in §3 (independent L against the chain's
   own implied L) passed at better than 3% on five of eight and at better than
   6.5% on all eight.
4. **The flatness of c over the last five levels.** Falsified by a ninth level.
   @37 needs a march at roughly 41 times the @31 cost, so this will not be
   checked soon, and the reproduction target is on record: with P(37) = 1464.77,
   a flat c = 1.05 ± 0.06 forecasts E_med(37) inside a band that the march would
   settle in one run.

---

## Defects noticed in passing

- `natal-cap-25-excess-law.js` reading 5 says the Gumbel centering correction and
  the sub-Gaussian compression "roughly offset". Both corrections lower the
  predicted maximum, so they add rather than offset; the sentence's conclusion
  (c* ≲ 1) is carried by the two small-k levels, not by the mechanism it names.
  Quantified: reading 5's own quoted centering size, 10–20% down, predicts
  c* ≈ 0.80–0.90 against the measured c* = 0.972.
- The @31 c = 1.0745 is a ratio of medians taken over two different grids:
  E_med(31) from cap-33's 15 median-preserving q-index quantiles, P_med(31) from
  cap-29's 142 spot-augmented rows of a 145-length grid. cap-33 states the
  quantile grid is median-preserving, so the comparison is intended, and the two
  medians are not medians of the same list. Sized: cap-33's 15-quantile median
  l = 825,818 against cap-29's 145-length grid median l = 953,421 is dL = 0.144
  on L = 12.257, about ±0.006 in c, so it does not matter.
