# The transfer operator and the pair count: exact at any level, with no tile in memory

<!-- ledger
id: Q-operator-pair-count
status: ANSWERED
todo: none
question: Can the histogram transfer operator and the pair count be evaluated exactly at any level with no tile in memory?
verdict: Both instruments are exact and neither needs a tile resident: the operator is PROVEN and VERIFIED exactly at six folds and the pair count at every fold; the tail carries a FIT beside them that must not be used past the range it was fitted on.
-->

*Parent: `research/U-FRAME.md` §11, which carries these claims in summary. Two
exact instruments, neither needing a tile in memory, and one FIT that must not be
used past the range it was fitted on.*

*Both instruments are implemented in `research/a3-09-histogram-operator.js` —
the operator as a histogram recurrence and the pair count alongside it — which
is why neither needs a tile resident in memory.*

Two instruments, both exact, neither needing a tile in memory, and together they
are what make the f and L questions measurable at any level in reach. The
operator is PRIOR ART (Holt and Rudd 2014, U-FRAME §6a) and nothing here may be
presented as new structure; what is ours is the head engine and the numbers it
produces.

### The histogram transfer operator (PROVEN, VERIFIED exactly at six folds)

The new gap histogram is generated from the old gap word by a transfer operator
whose three clauses are: the interior of a run dies, the left end lives, the right
end lives. It reproduces every measured histogram size for size, satisfies the
mass identity Σcount = D(q−2), and iterated from the T₇ word alone with no sieve
it walks to T₂₃ reproducing every glossary census, then past enumeration to T₂₉
and T₃₁ with D and G₂ both correct.

**The structural consequence, and it is Chris's misalignment principle in its
sharpest form.** The new histogram is a function of the old gap word and q, **and
of nothing else**: not of W mod q, not of the tile's residues, not of the copy
order. Shifting the alignment by the left endpoint's residue removes absolute
position entirely.

**The honest limit** is that the operator is closed on the gap **word**, not on
the histogram, so it is an exact simulator rather than a source of bounds:
reading G₂ off it still means running it (`research/gate-multiplies.md` §6).

### The tail at any level, and the fit that goes with it

Extending the grain-census inclusion-exclusion into a head engine gives
count(d)/D at any level with no tile in memory, agreeing with enumeration to
5e−16, and yields **about 31 exact diagonal tail points over a range of 20 in x**
against the seven U-FRAME §5a step 7 has from tiles. The count is not an
identifier: the engine stops on a per-level time budget, so it is
machine-dependent and moves between runs. FIT, flagged as such:
ln(1/tail) = −0.235 + 1.2992·(2p′/m̄) with R² = 0.993, cross-checked within each
level to 3%.

**These points measure a different object from f, and the two fits are not
comparable.** The tail here is the unconditional P(gap ≥ 2p′); f is the
comb-restricted sub-tail inside it. Their ratio f/tail runs 0.032 to 0.454 and
drifts, which is exactly why the slopes differ. The decomposition closes: the
tail slope 1.311 over the 30 shared levels plus the comb-share drift 0.366 gives
1.677, the f slope on those same levels. So 1.2992 is not a third estimate of
§5a's slope and must never be averaged against it.

**QUARANTINE on the three numbers in that decomposition (2026-08-19).** The
"f slope on those same levels" is CENSUS-derived, and the census producer aliased
residues for primes above 32, so every f point from x = 37 up is wrong by a factor
0.62–1.05 (`research/f-decays.md` header, `history/staging/fdecay-deep.md`). The
30 shared levels run past x = 37, so 1.311, 0.366 and 1.677 are all contaminated
and none of the three may be quoted. **What survives is the structural point, not
the arithmetic**: the tail and f measure different objects and their slopes must
differ, so 1.2992 is still not a third estimate of §5a's slope. Read the
decomposition either scoped to x ≤ 31, where the census is unaffected, or
re-computed against the alias-free numbers embedded in
`research/fdecay-deep-01-census-defect.js`.

**The structural claim is confirmed.** m̄/ln²p falls 3.70 → 2.42 and has
essentially arrived: the Mertens limit is e^{2γ}/(2C₂) = **2.4026**, and exact
W/D gives 2.4195 at x = 1009, 2.4086 at x = 10007 and 2.4035 at x = 200003.
There is no further drift to come. Meanwhile 2p′/ln²p rises 5.8 → 69.6, so the
threshold does recede from the bulk, and lnD/ln(1/tail) divided by ln²p is flat
near 0.8 across p = 7 to 131, giving **L ≲ 0.8 ln²p**.

**But that does not close the route, and the reason is worth carrying with the
number.** Turning L ≲ 0.8 ln²p into "the route closes" goes through Σ L·m̄, which
is U-FRAME §5a step 4, and step 4 is false. What the reading does buy is the
branch: L ≲ 0.8 ln²p sits comfortably inside the required 0.19 to 0.31·p/ln p on
the schedule U-FRAME §5a step 7 gives. The tail evidence says which branch, not
that the route closes.

**One caution on transferring the tail fit.** The FIT above is measured on the
tile. Pushed through an extreme-value argument in the localized head it predicts
R(1) = 12.0 to 12.6 across the Y = 10⁹ scan against a measured 12.6 to 18.7, so
the head's gap tail is **heavier** than the tile's fitted law by 20 to 25
percent: the head's exponential rate is ≈ 1.06/m̄ against 1.2992/m̄ here. That
1.06 is the localized head's rate and has nothing to do with §5a step 7's
seven-point slope of 1.062, which the digits otherwise invite a reader to
connect. Do not use the fit past the range it was fitted on.

### The exact pair count (PROVEN, VERIFIED at every fold)

Verified against two independent enumerations that never mention gaps:

> PAIRS(T, p) = 2·Σ_{d ≡ 0 (mod p)} count(d) + Σ_{d ≡ ±2 (mod p)} count(d)

| fold | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 |
|---|---|---|---|---|---|---|---|---|---|
| pairs | 2 | 0 | 6 | 72 | 1,088 | 11,870 | 243,822 | 8,025,014 | **114,874,436** |

The weight 2 on the p-divisible sizes is the multiplicity factor of
`research/kappa-not-L.md`, and a naive
Σcount(d) misses by exactly 86 at fold 23 and 6 at fold 29. The deepest point is
T₃₁ with 6,226,553,025 slots, three-way agreement across 12.45 billion kills in
2,620 s detached.

**Alternation confirmed at fold 37**, which is the deepest test the Alternation
Lemma of `research/kappa-not-L.md` has.
The complete list of long-run words is 72+150, 150+72, 72+222, 222+72, 150+222,
222+150, 72+150+72, 150+72+150, where for p = 37 the three classes are 2p−2 = 72,
4p+2 = 150 and the neutral 6p = 222. Not one word repeats a non-neutral class,
and 72 + 150 = 222 = 6p exactly.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
