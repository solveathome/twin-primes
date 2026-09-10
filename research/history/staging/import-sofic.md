# Foreign import 2: constrained coding and symbolic dynamics on the Alternation Lemma

<!-- ledger
id: Q-import-sofic
status: ANSWERED
todo: none
question: Does constrained coding and symbolic dynamics identify the Alternation Lemma's shift, and does the import map's shape claim survive?
verdict: The identification is exact and better than the map states - the shift is strictly sofic, two states, four edges, Perron root exactly 2, and the graph's own per-step rate is 2/p rather than the 3/p the map divides by - and the pre-registered ratio test then kills the map's literal formula while the graph-corrected one survives only as a small-D transient spent by fold 37; the shape claim does not stand, and it fails in the corpus's favour.
-->


**ADVERSARIAL OUTCOME, 2026-08-19 (`adversary-wave2.md`): SURVIVES — the only
clean verdict of the four.** The strictly-sofic argument is airtight and the
adversary closed it for all M at once (w = (−2)0^M(−2) has exactly two
length-(M+1) subwords, both legal, so no M-step SFT excludes it); every
ratio-test number reproduces to four decimals; t = 2.690 at 5 df clears the
proper critical value 2.571; and a paired test this record did not run makes
the headline stronger — slope of (R_A − R_B) on ln p is −0.3588 ± 0.0253,
t = −14.18. What is NOT shown is that estimator A is flat (its CI contains
B's slope), consistent with this record's own A/B → 1 reading. Pointer fixes:
the L diagonal is `a3-05-bound-L.md` §9 (not §7, 8 folds); `a3-10` reading 1
stops at fold 29; the 288 is VERIFIED in `kappa-not-L.md`, not PROVEN; the
42-point census lives in `a3-03-f-from-census.js`. Pre-registration custody
DECLARED (same-commit; mtimes order correctly).

*2026-08-19. IMPORT-MAP top-five experiment 2 of 5. Pre-registration:
[import-sofic-prereg.md](import-sofic-prereg.md), written to disk before the
comparison. Producers: `research/import-sofic-01-graph.js` (2.7 s,
`code-sha256 96745e67`, `out-sha256 cc11bc03`, formal embed, ten numbered
readings) and `research/import-sofic-02-prediction.js` (0.1 s,
`code-sha256 d98b2c95`, `out-sha256 58476cff`, formal embed, ten numbered
readings). Legend as in `research/sift-limit-attack.md`: **[PROVEN]** published
theorem or a proof given here; **[VERIFIED]** checked computationally here;
**[MEASURED]** empirical, finite range; **[CITED]** taken from an embedded
artifact and not recomputed.*

**Assignment.** IMPORT-MAP row 2 claims the Alternation Lemma's legal language is
a sofic shift presented by a right-resolving two-state labelled graph, and that
the first-moment longest-run law over that graph predicts `L ≍ p/ln p`, the shape
the u-frame needs, where A5 Theorem B's proven `L ≤ 0.18 p` has the wrong shape.
Build the graph, verify the presentation, derive the prediction properly,
pre-register the flatness of the prediction-to-truth ratio, score it, and price
what would remain.

---

## 0. The verdict, up front

> **The identification is exact and it is better than the map states: the shift
> is STRICTLY SOFIC [VERIFIED], and the graph's own per-step rate is `2/p`, not
> the qualifying fraction `3/p` the map divides by. The pre-registered ratio test
> then splits the two: the map's literal formula is KILLED by its own criterion,
> the graph-corrected one survives on the ladder, and the survival is a
> small-`D` transient that is spent by fold 37. The shape claim does not stand,
> and it fails in the corpus's favour.**
>
> 1. **The presentation, VERIFIED on four criteria fixed in advance.** Two states,
>    four edges, right-resolving, adjacency `[[1,1],[1,1]]`, Perron root exactly
>    2, capacity `ln 2` nats per symbol and independent of `p`.
> 2. **Strictly sofic, not of finite type [VERIFIED constructively].** For every
>    `k ≤ 40`, `(−2) 0^k (−2)` and `(+2) 0^k (+2)` are forbidden while both halves
>    are legal, so no finite forbidden list presents the language.
> 3. **A correction to the map's rate.** From a state only 2 of the 3 qualifying
>    residues are legal, so the first-moment law is `ln(pD)/ln(p/2)`, not
>    `ln D/ln(p/3)`.
> 4. **The pre-registered ratio: KILL on the map's estimator, survives on the
>    graph's.** Slope on `ln p` is `0.888 ± 0.330` for `ln D/ln(p/3)` and
>    `0.529 ± 0.321` for the graph's, over the seven non-anomalous folds.
> 5. **An arithmetic correction to the map itself.** Its `28.7` at `p = 101` is
>    `p/ln(p/3)`, i.e. `ln D` replaced by `p`; the true `ln D(T₉₇) = 79.7729`,
>    ratio `0.7898`, and the corrected factor over the requirement is `3.172 to
>    5.175`, not `4.2 to 6.9`.
> 6. **And what would remain after a flat ratio is not a constant the measurement
>    supplies.** A flat ratio would have to be `3.4535 to 5.6346`; the measured
>    one is `2.1346`, short by `1.618 to 2.640`.

---

## 1. The graph, stated

States are which of the two strike classes the deleted slot is in: `Z` for
`r ≡ 0 (mod p)` and `M` for `r ≡ −2 (mod p)`. Letters are the gap class mod `p`.

    Z --(0)--> Z      Z --(−2)--> M      M --(0)--> M      M --(+2)--> Z

**Right-resolving [VERIFIED]:** the two labels leaving each state are distinct.
**Adjacency `[[1,1],[1,1]]`, Perron root exactly 2, capacity `ln 2 = 0.693147`
nats = 1 bit per symbol.** The capacity does not depend on `p`. `p` enters only
through the measure on the letters, never through the graph, and that is the
first thing the import settles: capacity cannot carry the `p`-dependence the
u-frame needs.

**The word count has a closed form: `2^{n+1} − 1` legal words of length `n`
[VERIFIED against brute force, `n = 1..12`]**, growth rate 2, consistent with the
Perron root. It is a count of words and not a length of windows, which is exactly
the caution IMPORT-MAP row 2 already carries and which this experiment did not
remove.

**STRICTLY SOFIC, not an SFT [VERIFIED, and the argument is one line].** For every
`k = 0..40`, `(−2) 0^k (−2)` and `(+2) 0^k (+2)` are rejected while `(−2) 0^k` and
`0^k (−2)` are both accepted. An `M`-step SFT containing both halves must contain
their glue at `k = M`. So the Alternation Lemma is a genuinely sofic constraint
and not a local rule — the precise version of `kappa-not-L.md`'s "the class word
is a two-state walk rather than merely a word avoiding three residues".

**The owning convention.** Letters `0, ±2` whose running sum is confined to a
window of two is the **bounded running digital sum**, the bounded-charge or
DC-free constraint of magnetic recording (Lind–Marcus, CUP 1995, ch. 4;
Marcus–Roth–Siegel). That is the family to search, and it is a
`SEARCH-CONVENTIONS.md` §1 row this corpus does not have.

## 2. The presentation against real tiles: VERIFIED, four criteria out of four

All four criteria were fixed in [import-sofic-prereg.md](import-sofic-prereg.md)
§6 before the check ran. Tiles `T₃..T₂₃` are built here by iterated folding;
`T₂₉` and `T₃₁` are not built, and their census is cited.

- **(a) [VERIFIED]** every maximal adjacent-kill run found by a full-period scan
  at folds 7..29 has a class word the graph accepts.
- **(b) [VERIFIED]** the graph's weighted count of legal 2-windows,
  `Σ_i acceptCount(class of d_i)`, reproduces the cited `PAIRS` census
  2, 0, 6, 72, 1088, 11870, 243822 **exactly** at all seven buildable folds. The
  weight-(1,1,2) multiplicity of `kappa-not-L.md` is not a separate rule: it *is*
  `acceptCount`, 2 for the all-zero word because both start states accept it and
  1 otherwise.
- **(c) [VERIFIED]** the graph's window counts equal the direct full-period
  counts at every length `ℓ = 1..5` at every one of the seven folds. Fold 23 has
  757350 kills, 11870 legal 2-windows and 62 legal 3-windows; **fold 29 has
  243822 2-windows and zero 3-windows**, which is `kappa-not-L.md`'s
  alternation-forced dip seen as a window count.
- **(d) [VERIFIED]** strictly sofic, §1 above.

The scan also reproduces the cited exact `L` at all seven folds. That is
validation of the instrument, not a measurement: **no exact `L` was recomputed for
citation**, per the standing compute rule.

## 3. The first-moment law, derived, and what `D` is

The scan runs over the **full period, `pD` slots, not `D`**
(`import-maxplus-01-mapping.js` reading 8: a one-copy cyclic scan reports `L = 2`
at fold 11 where the truth is 1). The count of kills in that period is exactly
`2D`, since every old slot is deleted in exactly two of the `p` copies. Here
`D = D(T_x) = ∏_{3≤q≤x}(q−2)`, `x` the prime before `p`; `D(T₃₁) = 6,226,553,025`
agrees with `operator-and-pair-count.md`.

**The rate is `2/p` and not `3/p`, and this is a correction to the map.** The
qualifying fraction is 3 residues in `p`, but from a given state only 2 of the 3
are legal: `0`, and one of `±2`. Weighting the graph's edges by `1/p` each gives a
weighted transfer matrix `(1/p)[[1,1],[1,1]]` with Perron root `2/p`. Hence

> **`L_A = 1 + ln(2D)/ln(p/2) = ln(pD)/ln(p/2)`**,

the two readings "kills times continuation" and "period length times marginal"
agreeing identically because the marginal kill rate `2/p` equals the conditional
one. The map's and `U-FRAME` §5a step 6's `ln D/ln(1/f)` with `f = 3/p` is the
wrong denominator for a first-moment run law on this graph.

Both forms are `≍ p/ln p`, since `ln D = θ(x) − 2 lnln x + O(1) ≍ p`, so the
**shape claim's arithmetic is right**. What is at issue is whether it is the
object's shape.

## 4. The pre-registered ratio test, scored

Ratio `R = L_pred / L_exact` against the cited `L = 2, 1, 2, 2, 2, 3, 2, 4, 4`.
Exclusions declared in advance: fold 11 (`T₇`'s gap set contains no 24, the one
legal qualifying value) and fold 29 (all adjacent qualifying pairs are `(60,60)`,
same class, forbidden by alternation). Both are PROVEN in `kappa-not-L.md`.

| estimator | set | n | mean `R` | slope on `ln p` | SE | t | verdict |
|---|---|---|---|---|---|---|---|
| A, `ln(pD)/ln(p/2)` | nine | 9 | 2.3931 | 0.5157 | 0.4385 | 1.176 | flat |
| A | seven | 7 | 2.1346 | 0.5292 | 0.3213 | 1.647 | flat |
| B, `ln D/ln(p/3)` (the map) | nine | 9 | 2.1249 | 0.9784 | 0.3828 | 2.556 | **KILL 1** |
| B | seven | 7 | 1.9340 | 0.8880 | 0.3301 | 2.690 | **KILL 1** |
| C, graph with measured weights | nine | 9 | 1.5511 | 0.4083 | 0.2609 | 1.565 | flat |
| C | seven | 7 | 1.4965 | 0.1353 | 0.1721 | 0.786 | flat |

**The map's own formula dies by the criterion the map wrote.** The graph's
corrected estimator survives it. And estimator C — the same first-moment law fed
the object's measured edge weight `f_edge = PAIRS/2D` — is the one that is really
flat, `slope 0.135 ± 0.172`, mean 1.4965. **So the sofic first-moment machinery
predicts the exact `L` to within a flat factor of about 1.5 once it is given the
true letter measure. The machinery is validated; the input is what was wrong.**

**The survival of A is a transient, and the same file shows it.**
`A/B = [ln(pD)/ln D]·[ln(p/3)/ln(p/2)]` falls 1.8743, 1.4370, 1.1930, 1.1250,
1.0610, 1.0376, 1.0282, 1.0046, **0.9989** across folds 7..37. The factor that
flattens A is spent by fold 37; beyond the ladder A and B are the same estimator
and A must inherit B's drift. Post-hoc and declared as such: over folds
17, 19, 23, 31, 37 alone every slope is negative and none is significant, so the
whole trend in B is carried by the two smallest folds, where `D` is 3 and 15.

## 5. Why the input is wrong: `3/p` is not the object's `f`

`f` measured against the uniform `3/p` reads **0.1924, 0.2748, 0.3091, 0.2384,
0.2968, 0.3865, 0.2269** at folds 13..37 [CITED `f` from `U-FRAME` §5a step 7,
ratio computed here]. The measured `f_edge = PAIRS/2D` is exactly half the
independently measured `f` at every fold, which is the consistency check between
this graph and that census.

And the gap widens. Over `f-decays.md`'s 42 exact census points `f` falls by a
factor of **170** from `x = 11` to `x = 199` while `3/p` falls by about **16** (the census behind the 170 is defective from x = 37 — the corrected factor is LARGER, so this verdict strengthens; `fdecay-deep.md`).
With `ln(1/f) = 1.001 + 1.451·(2p/m̄)` and `m̄` polylog, `ln(1/f) ≍ p/polylog(p)`,
so `L ≍ ln D/ln(1/f) ≍ polylog` — which is `f-decays.md`'s own conclusion,
`ln L = −1.884 + 2.892·lnln x`, `R² = 0.972`.

> **So IMPORT-MAP row 2's `p/ln p` is the shape of an input the corpus has
> already measured and refuted, and the object's own branch is better.** The
> row's sentence "the constrained coding prediction lands on the needed shape and
> leaves only a constant" is a downgrade of `U-FRAME` §12, not an advance on it.

## 6. The constant, checked, and what would remain

**The map's `p = 101` arithmetic, line by line.** The requirement is confirmed:
`101/ln 101 = 21.8846`, so `0.19` to `0.31` of it is `4.1581 to 6.7842`, the map's
"4.2 to 6.8". The prediction quoted as `28.7` is `p/ln(p/3) = 28.7217` — that is,
`ln D` replaced by `p`. The true `ln D(T₉₇) = Σ_{3≤q≤97} ln(q−2) = 79.7729`,
ratio to `p` of `0.7898`. **Corrected: `L_B = 22.6852` and `L_A = 21.5167`, a
factor `3.172 to 5.175` over the requirement, not `4.234 to 6.907`.** The map
used a Chebyshev asymptotic as an equality at a level where it is 21% off.

**What would remain between a flat ratio and a proof, stated exactly.**
`L_A/(p/ln p)` tends to 1 from below: 0.8751, 0.9832, 1.0326, 1.0590, 1.0706 at
`x = 31, 97, 199, 1009, 10007`. For a flat ratio `R` to convert `L_A` into
`L ≤ c·p/ln p` it must be at least that figure over `c`, i.e. **3.4535 at
`c = 0.31` and 5.6346 at `c = 0.19`**. The measured ratio is **2.1346**. So even
granting perfect flatness, granting the extrapolation, and granting the whole
u-frame chain, **the requirement is missed by 1.618 to 2.640**. "Only a constant"
is right in kind; the constant is short by about a factor of two.

**And `p = 101` is below the level that decides anything.** `gate-multiplies.md`
§8 puts burn/replenish at `2.6 ln³p/p` on the polylog branch, crossing 1 near
`p ~ 800`, so at `p = 101` no `L` clears the threshold and a factor quoted there
measures a level where the chain fails for a reason that is not `L`. Projected
with `f-decays.md`'s own fitted coefficients, `L` first falls below `0.31 p/ln p`
at `x = 773` and below `0.19 p/ln p` at `x = 2297` (corrected 2026-08-19,
`fdecay-deep.md`: the census these projections were fitted to is defective
from x = 37 — the deep-window remeasurement moves the form-1 crossings to
719 (range 509–757) and 1801 (range 1201–2039), with form 2 at 271/839; the
conclusion is unchanged and slightly earlier) — an independent arrival at
`gate-multiplies`' `p ~ 800`, from the `L` side. All three of these are
extrapolations of fitted laws far outside their range and none is a bound.

## 7. The proposed regrade of IMPORT-MAP row 2

Proposal only; no live document was edited by this pass.

> **status UNTRIED → LANDED. fit EXACT-IDENTITY, confirmed and strengthened
> (strictly sofic). circularity CLEAN, as graded — nothing here needed a
> hypothesis of postulate strength. payoff banked: DERIVED-CONSTANT +
> PUBLISHED-ANCHOR + WALL-ADDRESS. The shape claim in the row's paragraph does
> not stand and should be struck.**

- **DERIVED-CONSTANT, banked:** the graph's per-step rate is `2/p`, so the
  first-moment law is `ln(pD)/ln(p/2)`; capacity is `ln 2` and `p`-free; the
  legal-word count is `2^{n+1} − 1`; and the weight-(1,1,2) multiplicity is
  derived as `acceptCount` rather than assumed.
- **PUBLISHED-ANCHOR, banked:** bounded running digital sum / bounded-charge /
  DC-free constrained system is the owning convention, a new
  `SEARCH-CONVENTIONS.md` §1 row.
- **WALL-ADDRESS, banked:** capacity bounds word counts, never the longest legal
  factor of one given periodic word; and the object's `L` is governed entirely by
  the letter measure `f`, which is `f-decays.md`'s problem and not symbolic
  dynamics'.
- **Struck:** "the constrained coding prediction lands on the needed shape and
  leaves only a constant. That is the first time the shape gap has closed
  anywhere in this branch." It does not close: the input `f = 3/p` is refuted by
  the corpus's own 42-point census, and the residual constant is short by 1.6 to
  2.6 even if the shape were right.

## 8. Proposed edits elsewhere, none made

1. **`research/SEARCH-CONVENTIONS.md` §1** gains the bounded-running-digital-sum
   row for the alternation-legal window, refining the
   `constrained system / (d,k)-RLL / sofic shift` row that
   `import-map-construction.md` §5 already proposes: the constraint is a charge
   constraint, not a run-length one, and `(d,k)`-RLL is the wrong sub-family to
   search.
2. **`research/U-FRAME.md` §5a step 6 and `research/f-decays.md`** carry
   `L ≈ ln D/ln(1/f)`. The graph says the denominator is `ln(2/f_w)` with `f_w`
   the weighted fraction, i.e. `ln(p/2)` under uniform residues, and the numerator
   is `ln(2D)` with a `+1`. It is a small correction and it is the one that
   flattens the ratio over the reachable ladder, so it is worth making.
3. **`research/IMPORT-MAP.md` row 2** as in §7 above.
4. **`research/kappa-not-L.md`** could record that the Alternation Lemma's
   language is strictly sofic, with the one-line SFT-exclusion argument, since
   that is the precise reason no finite-window argument can capture it.

## 9. NOT REACHED

- **No prior-art search was run this pass.** IMPORT-MAP row 2 and
  `import-map-construction.md` §6 both record that nobody checked whether the
  identification of the Alternation Lemma with a sofic shift, or a theorem
  bounding the longest legal factor of a periodic word, is in print. That is
  still true, and the bounded-charge convention named in §1 above is a new place
  to look that has not been looked in.
- **`PAIRS` at folds 31 and 37 was cited, not checked.** `T₂₉` and `T₃₁` are not
  built here.
- **The Lind–Marcus theorem number is still unverified**, per
  `import-map-construction.md` §3; nothing here quotes it.
- **No bound is proved.** Every estimator is a heuristic first moment over a
  deterministic word; the ratio test has nine points and an exact `L` taking four
  distinct integer values; and everything past fold 37 is extrapolation.
