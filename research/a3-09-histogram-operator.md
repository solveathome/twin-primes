# A9: the gap-histogram fold rule, as an exact transfer operator

<!-- ledger
id: Q-a9-histogram-operator
status: ANSWERED
todo: A9 (retired)
question: What is the exact evolution of the gap-size histogram under folding, as a transfer operator on count(d), and what is the tail P(gap >= 2p)?
verdict: The operator is derived and then verified by exact computation at every fold from T5 to T31 and the tail law is computed exactly, but the machinery is a rediscovery of Holt and Rudd arXiv:1408.6002 section 5 and may not be presented as new; only the G2 spacing beyond their |s| < 2p restriction is ours.
-->

*(2026-08-16, u-frame wave. Code, output and numbered readings in
`research/a3-09-histogram-operator.js`. Calibration: the operator is DERIVED and
then VERIFIED by exact computation at every fold from T5 to T31; the tail law is
computed exactly, the asymptotic reading at the end is EXTRAPOLATED and marked.)*

## What was asked

A9 asked for the exact evolution of the gap-size histogram under folding, as a
transfer operator on count(d), and then for the thing the whole L question turns
on: the tail P(gap >= 2p) as a function of x.

## PRIOR ART: the operator is Holt and Rudd 2014

**The transfer operator below is not new.** Fred B. Holt and Helgi Rudd,
arXiv:1408.6002 section 5, build the transfer matrix M_J on the cycle of gaps,
with its eigenstructure and binomial eigenvectors, in 2014. Their fusions are our
kills, their cycle of gaps G(p#) is our tile, and their R1/R2/R3 recursion
(Lemma 2.1) is our fold. This note is a rediscovery of that machinery in
two-class vocabulary, and nothing in the operator section may be presented as new
structure. See `research/PRIOR-ART.md` section "Holt and Rudd".

What is not in their corpus is the spacing between consecutive g = 2
occurrences, which is our G2: they restrict to spans |s| < 2p throughout, and a
maximum gap leaves that regime. So the head engine of the tail section, and the
diagonal it computes, are ours.

## The operator

Write the grain of T_p cyclically as g_0, g_1, ... with indices mod D and values
summed as integers, so that one full turn adds W. Partial sums from slot i are

    G_j(i) = g_i + g_{i+1} + ... + g_{i+j-1},   G_0 = 0.

A new gap is a maximal run: slot i survives the fold by q, the next L slots die,
slot i+L+1 survives, and the new gap has size d = G_{L+1}(i). Then

    count_q(d) = SUM_{i in [0,D)} SUM_{L >= 0} [ G_{L+1}(i) = d ] * nu_q(g_i, ..., g_{i+L})

with

    nu_q(g_i, ..., g_{i+L}) = # { a in Z/q :  G_j = a or a-2 (mod q) for j = 1..L,
                                              a not in {0, 2},
                                              a not in {G_{L+1}, G_{L+1}+2} }.

The three conditions are, in order: the interior of the run dies, the left
endpoint lives, the right endpoint lives.

### Why it is closed on the gap word alone

The fold is usually described copy by copy: copy k deletes the slots whose
residue mod q lies in the 2-set {-kw, -kw-2}. That description carries the
tile's residues around with it. It is not needed. The folded tile is Z/(qW) and
q strikes exactly the positions congruent to 0 or -2 there, so the strike is one
uniform rule and the copy index is bookkeeping. Shifting the alignment variable
by the residue of the run's left endpoint removes the last trace of absolute
position, and every condition becomes a condition on the gaps.

That is the misalignment principle in its sharpest form. As k runs over the q
copies the shifted alignment a runs over Z/q exactly once, so the operator
integrates over all alignments with weight one each. **The new histogram is a
function of the old gap word and of q, and of nothing else.** Not of W mod q,
not of the tile's residues, not of the copy order. The word itself does depend
on W mod q, since that fixes which copy comes next, but the histogram does not.

### The diagonal part is the pair correlation

At L = 0 the count is

    nu_q(g) = q - |{0, 2, g, g+2}| = q-2 if q | g,  q-3 if g = +-2 (mod q),  q-4 otherwise,

which is exactly the adapted pair correlation rho_q(g) that `grain-census.js`
already uses. So the operator splits as

    count_q(d) = rho_q(d) * count_p(d)  +  (merge terms, L >= 1),

verified size by size at every fold. The multiplicity is exact: of the q copies
of a given gap, exactly |{0, 2, g, g+2}|
in {2, 3, 4} have an endpoint struck, and the rest survive intact. The merge
share of the new gaps falls steadily, 22.2%, 17.8%, 13.0%, 11.5%, 9.4%, 7.3%,
6.8% at folds 11 through 31, sitting just above 2/q as it should.

### Why merges are rare, which is the whole point

For L >= 1 the candidate set A_L = {a : G_j in {a, a-2} for all j <= L} \ {0, 2}
has at most two elements and only shrinks. Nonempty A_L with L >= 2 forces every
interior gap of the run to be congruent to 0 or +-2 mod q. Grain gaps are
multiples of 6, so the smallest gap that can sit inside a run is about 2q. The
merge terms of order L therefore live on runs of L-1 consecutive gaps drawn from
the tail above 2q, and the operator's own structure says: **the L question is
the tail question, at threshold 2q, and nothing else.**

## Verification

Every check in the output is exact, on the nose, no fitting.

- The operator reproduces the true fold histogram size for size at
  T7 -> T11, T11 -> T13, T13 -> T17, T17 -> T19, T19 -> T23 and T23 -> T29,
  with the mass identity sum_d count_q(d) = D(q-2) holding exactly each time.
- Iterated from the T7 word alone, with no sieve, it walks up to T23 and
  reproduces the glossary censuses at every level, G2 = 42, 66, 108, 150, 204.
- Pushed two folds past the enumerable range it gives T29 (D = 214,708,725,
  G2 = 258) and T31 (D = 6,226,553,025, G2 = 348), both passing
  sum(d * count(d)) = W.

## The tail, computed rather than extrapolated

The operator says what to compute; it does not by itself hand over a closed
form. For that we extended the grain-census inclusion-exclusion into a head
engine that returns count(d)/D at ANY level, in doubles, with no tile in memory.
Two observations make it cheap. Primes q > d have |A_q| = 2m exactly, where m is
the number of forced slots, so they contribute a closed factor and only primes
q <= d need class bookkeeping. And ratios to D = prod(q-2) are formed factor by
factor, so nothing overflows at any level.

The engine agrees with the exact enumerated tails at T7, T11, T13, T17, T19,
T23, T29 and T31 to 5e-16 absolute, which is round-off. It then gives
P(gap >= 2p') along the fold diagonal with no enumeration at all.

**The tail collapses, and the law is clean.** Along the fold diagonal
P(gap >= 2p') falls from 0.133 at T7 to 2.4e-3 at T139, and

    ln(1/P(gap >= 2p'))  =  -0.24  +  1.30 * (2p'/mbar),      R2 = 0.993, 31 points

with the same slope on the last 23 points alone (1.36, R2 = 0.994). So

    P(gap >= t)  ~  exp( -t / (0.77 * mbar) ).

That is confirmed independently at fixed level: fitting ln P(gap >= t) against t
over t in [1.5, 3.5] * mbar gives theta/mbar = 0.660, 0.675, 0.701, 0.725,
0.759, 0.758, 0.761 at T23, T29, T31, T41, T53, T71, T97, with R2 from 0.990 to
0.998. The tail is exponential, its scale is a fixed fraction of the mean gap,
and that fraction is settling near 0.76. Two different fits, one across levels
and one within a level, agree to three percent.

**The threshold recedes.** mbar/ln^2 p falls 3.70, 2.85, 2.61, 2.50, 2.49, 2.42
at p = 7, 23, 37, 97, 199, 2003, and it has essentially arrived. The Mertens
limit is

    mbar / ln^2 p  ->  e^{2 gamma} / (2 C_2)  =  2.4026,

from the twin-slot density (1/2)*prod_{2<q<=x}(1 - 2/q) = 2 C_2 e^{-2 gamma}/ln^2 x.
VERIFIED by exact computation of W/D: 3.6973, 2.8536, 2.6115, 2.4954, 2.5024,
2.4167, 2.4052, 2.4035 at x = 7, 23, 37, 97, 199, 2003, 20011, 200003, which
reproduces the six values above digit for digit and is within 0.6 percent of the
limit by x = 2003. **There is no slow drift left to happen.** The threshold in
the same units, 2p'/ln^2 p, rises without bound: 5.8, 5.9, 6.3, 9.7, 15.1, and
42.4 by p = 1009. The reduced threshold 2p'/mbar therefore grows roughly linearly
in p/ln^2 p, and the tail is exp of minus that. **The structural claim in the
brief is confirmed, over a range in x of 20 rather than 5.**

## What this says about L, and about the u-frame chain

The merge criterion f, the fraction of gaps congruent to 0 or +-2 mod p', is a
roughly constant fraction of the tail: f/P(gap >= 2p') = 0.20, 0.38, 0.35, 0.31,
0.33, 0.45, 0.31 at T11 through T31, so ln(1/f) = ln(1/tail) + about 1.1. Feeding
the tail law into U-FRAME step 6,

    L  ~  ln D / ln(1/f)  <=  ln D / ln(1/tail)  ~  theta(p) * 0.77 * mbar / (2p)  ~  0.4 * mbar,

and mbar is polylog, so L is polylog. Measured directly, ln D / ln(1/tail)
divided by ln^2 p sits at 0.36, 0.64, 0.68, 0.78, 0.85, 0.79, 0.87, 0.82 at
p = 7, 19, 37, 53, 71, 89, 107, 131. It is flat, near 0.8, over the whole range.
So the heuristic cap on L is about **0.8 ln^2 p**.

**What that is worth, priced against the sharp budget.** The route from L to
G2 is U-FRAME section 5a step 3, `G2(new) <= maxsum_{1+L}(old)`, and against the
sharp per-fold rate `ln c(p) <= 2 ln p / p` it goes through iff
**L <= 0.19 to 0.31 * p / ln p** on average over the ladder
(`research/gate-multiplies.md` section 8). A polylog L of 0.8 ln^2 p clears that
from about p ~ 800 onward, with the margin then growing like p / ln^3 p. So the
tail evidence puts us on the branch the route needs, for the reason the lens was
built on: the prime grows linearly while the mean gap grows like ln^2 x, so the
threshold 2p walks out into the tail and the tail is exponential.

**It does not close the route.** The sum `SUM_{p<=x} L(p)*mbar(p)` is U-FRAME
step 4, and step 4 is false: the absorbed neighbour of a record gap is drawn from
the same fat tail as the record, not from the mean, and the substitution fails
outright at two of seven folds. Any argument here that reaches x^2 through that
sum is void. What the tail evidence supports is a branch, and the branch is not a
proof: the cap above is a heuristic, and A5 Theorem B's proven bound is
`L <= 0.18 p`, linear. **The gap between what is measured and what is proven is a
factor 0.58 to 0.95 ln p, and it is the whole of the u-frame branch.**

## Honest limits

Three things are exact and three are not, and they should not be confused.

Exact: the operator, the fold histograms it produces at every level to T31, and
the head engine's count(d)/D, which agrees with enumeration to 5e-16 absolute.

Not exact, first: the tail LAW. Exponential decay with scale 0.77 mbar is a fit
over p = 7 to 139, not a theorem. The head engine computes the tail exactly at
each level, but the level is bounded by the inclusion-exclusion, whose leaf
count roughly doubles per prime step; at present cost p = 139 takes 80 seconds
and p = 200 is out of reach. Nothing here proves the fit continues.

Not exact, and it should not be transported: the tail LAW is fitted on the TILE.
Pushed through an extreme-value argument in the localized head it predicts
R(1) = M/mbar between 12.0 and 12.6 across the Y = 10^9 scan, against a measured
12.6 to 18.7, mean ratio 1.23. **The head's gap tail is heavier than this fit by
20 to 25 percent**, its own exponential rate being about 1.06/mbar rather than
1.2992/mbar, and that is the unhelpful direction
(`research/localized-04-maxsum.md` section 8). Do not use the fit outside the
range it was fitted on.

Not exact, second: the step from the tail to L. The relation L ~ ln D / ln(1/f)
is an independence heuristic, and the measured L (1, 2, 2, 2, 3, 2, 4 at folds 11
to 31) runs far below its cap (1.3, 3.3, 3.5, 5.1, 5.6, 6.7, 7.7). So the tail
law bounds L only under that heuristic. It bounds it very comfortably, which is a
different claim.

Not exact, third, and this one is not an approximation but an error: the sum
SUM L * mbar is U-FRAME step 4, and step 4 is FALSE, at two of seven folds by
direct check. No conclusion may be routed through it.

What the operator does establish outright is the shape of the reduction: no
merge of order L can occur without L-1 consecutive gaps congruent to 0 or +-2
mod q, hence all above 2q, so any genuine tail bound at 2p is a genuine bound on
merging. The interval difficulty has been pushed into one scalar,
P(gap >= 2p), which we can now compute exactly at any level within reach and
which is measured to be collapsing.

## Reproduction

    node --max-old-space-size=8000 research/a3-09-histogram-operator.js

201 s. The deep folds cost 27 s of that, the diagonal sweep the rest, and the
last level alone (p = 139) costs 76 s because the inclusion-exclusion roughly
doubles per prime step.

## The L diagonal, confirmed here independently

The operator gives the run-length spectrum directly, so it settles L without a
run finder. For T23 folded by 29 the spectrum stops at L = 2, and direct
enumeration over all 29 copies of the folded tile agrees. The diagonal is

    fold      7   11   13   17   19   23   29   31
    L         2    1    2    2    2    3    2    4

so **L is not monotone**: the dip at 29 is a second instance of the dip at 11.
This is one of five independent confirmations of that diagonal (A4, A5, A08, A9
here, A10). `research/Lgrowth.js` used to report 3 at fold 29 from the run-finder
bug it shared with `research/killrun.js`; both were corrected on 2026-08-16 and
it now returns 2, agreeing with the other four confirmations.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
