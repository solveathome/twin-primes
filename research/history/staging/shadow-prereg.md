# Pre-registration — the kill shadow as a band-averaged pair-Buchstab integral

<!-- ledger
id: Q-shadow-prereg
status: OPEN
todo: 5 (retired)
question: Is the kill shadow's 0.85 the band-average of the Unification-Law survival curve over the post-crystallization window?
verdict: Pre-registration only, written before any measurement: the candidate values are computed and frozen, the scoring rules are fixed in advance, no statistic may be promoted to a verdict after the fact, and the verdict rests on y >= 997.
-->

**Written 2026-08-19, TODO item 5, BEFORE any measurement was run and before any
comparison to a measured depth.** The candidate numbers below come from
`research/shadow-buchstab-01-candidate.js` (embedded output, pure computation,
no data in it). The instrument that will score them,
`research/shadow-buchstab-02-instrument.js`, did not exist when this file was
written.

## What is being tested

`research/anchored-windows.md` §5 records the **kill shadow**: the window just
past a level's crystallization edge holds ≈ 0.85 of the tile's fair twin-slot
share, at every level it measured. `attack2-05-07-integral-ladder.js` reading
A5-2 asserts — without computing it — that this 0.85 **is** the average of the
Unification-Law survival curve over that window:

    rho(u) = e^{2gamma}/u^2                 on 1 <= u <= 2   (exact under HL)
    rho(u) = (e^{gamma} omega(u))^2         on 2 <= u <= 3   (independence
                                                              conjecture)

with `u = ln x / ln y`, `omega` Buchstab's function, and the band
`[y^2, 2y^2]` equal to `u ∈ [2, 2 + ln2/ln y]`. The claim under test is that
the measured shadow depth equals the x-weighted average `B_x(y)` of `rho` over
that band.

## The candidate values (computed, then frozen)

Band anchored at the level's own square, `[y², 2y²]`, x-weighted:

| y | w = ln2/ln y | **B_x(y)** | B_u (flat in u) |
|---|---|---|---|
| 23 | 0.221065 | **0.873491** | 0.865981 |
| 97 | 0.151517 | **0.851659** | 0.846009 |
| 401 | 0.115641 | **0.839217** | 0.834695 |
| 997 | 0.100387 | **0.833670** | 0.829665 |
| 2999 | 0.086578 | **0.828512** | 0.824994 |
| 10007 | 0.075252 | **0.824182** | 0.821079 |
| y → ∞ | 0 | **0.793055** | 0.793055 |

Band anchored at the *next* prime's square (the configuration
`anchored-windows.md` §5 actually used — sieve level `p`, window
`[p'², 2p'²]`): 0.943056 (p=23), 0.862697 (97), 0.843619 (401), 0.836045 (997),
0.828629 (2999), 0.824213 (10007).

Predicted octile profile inside the band, normalised to the band mean (this
divides out any level-wide finite-size factor): rise from first to last octile
= **1.0769 at y = 997** and **1.0596 at y = 10007**.

## Scoring rules, fixed in advance

The scoring target is a **fresh measurement**, not the §5 table: that table's
producer (`scratchpad/anchored-check.js`) no longer exists, and
`anchored-windows.md`'s own header forbids quoting §5 without recomputation. The
§5 numbers (0.834 @ p=23, 0.850 @ 97, 0.853 @ 401, 0.856 @ 997) are used here
for one purpose only — to set the tolerance — and are declared read before this
file was written.

**Tolerance.** `tol = 0.011` absolute, on the ratio-to-fair-share scale. Reason:
half the spread of the four recorded depths (0.856 − 0.834 = 0.022). A candidate
that cannot resolve the levels better than the levels differ from each other has
not explained the levels; half the spread is the coarsest tolerance under which
"derived" still means something.

**Counting-noise floor, declared in advance.** Each band holds
`N ≈ delta(y)·y²` slots; the Poisson-scale relative error `1/sqrt(N)` is
≈ 17% at y = 23, ≈ 8% at y = 97, ≈ 3.5% at y = 401, ≈ 1.1% at y = 997,
≈ 0.15% at y = 10007. **Levels with `1/sqrt(N)` above the tolerance
(y = 23, 97, 401) cannot decide anything and are scored as INFORMATIVE ONLY.**
The verdict rests on y ≥ 997.

**D1 (magnitude).** `|B_x(y) − measured(y)| ≤ 0.011` at every deciding level.

**D2 (level trend).** The candidate is strictly decreasing in y (the band
narrows like `1/ln y`, so any average over it falls toward 0.793055). D2 holds
iff the measured band ratio also falls with y, by more than the noise floor.
This is a sign test the candidate cannot avoid: it does not depend on the value
of any constant.

**D3 (band shape).** Measured last-octile/first-octile ratio within
`±0.020` of 1.0769 at y = 997 and of 1.0596 at y = 10007. D3 is the sharp test:
it is insensitive to every level-wide normalisation, including whatever
finite-size factor separates measured `rho(2)` from 0.793055.

**Verdicts.**
- **DERIVED** — D1 and D2 and D3 all hold. The shadow is the band average and
  the object is closed.
- **SHAPE-ONLY** — D3 holds, D1 or D2 fails. The Buchstab curve governs the
  band's interior but not the shadow's level-dependence or its level; the
  residual is then a normalisation, not a mechanism.
- **MISS** — D3 fails. The shadow carries structure the band average does not
  know, and the residual's shape names it.

No other statistic will be promoted to a verdict after the fact.
