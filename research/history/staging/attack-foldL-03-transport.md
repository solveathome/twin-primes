# Attack fold-L, angle 3: the transportability audit, and a third object that transports

<!-- ledger
id: Q-foldL-transport
status: ANSWERED
todo: none
question: Is there a third invariant of the tile's gap alphabet that provably survives the fold recursion, alongside the sum rules and the maxsum family?
verdict: Yes: the tail-count profile transports (the Tail-Count Transport, PROVEN, verified to T29 at 214,708,725 twin slots) and is sharper per fold than the standing route by a factor of three to eight in nats, but it does not chain, dying on the same accumulating index gate-multiplies.md closes.
-->

*2026-08-19. The hunt was for a third invariant of the tile's gap alphabet that
provably survives the fold recursion, alongside the two known handles: the sum
rules (`research/kappa-not-L.md`, A5 Theorem A) and the maxsum family via the
copy theorem (`research/U-FRAME.md` §5a step 2). Producer:
`research/attack-foldL-03-transport.js`, formally embedded, 39 s, deepest object
T₂₉ streamed at 214,708,725 twin slots. Legend as in
`research/sift-limit-attack.md`: **[PROVEN]** derived theorem; **[VERIFIED]**
checked computationally here; **[MEASURED]** empirical, finite range;
**[INFERRED]** deduction from sourced facts.*

---

## 1. The answer first

**A third object transports, it is the tail-count profile, and it is sharper per
fold than the standing route by a factor of three to eight in nats.** It also
does not chain, and the reason it does not chain is the same accumulating index
that `research/gate-multiplies.md` §§2, 5 closes. Both halves are worth having,
and the second half is the more general finding, because it shows A5's structural
cap is coordinate-free.

> **The Tail-Count Transport [PROVEN].** Fold T_x by q. With
> `N(θ) = #{i : g_i ≥ θ}` and
> `Q_L(θ) = #{i : G_{L+1}(i) ≥ θ and g_{i+1}..g_{i+L−1} all qualify mod q}`,
>
> **`N_new(θ) ≤ (q−2)·N(θ) + 2·Σ_{L≥1} Q_L(θ)`  for every θ,**
>
> hence `G₂(new) < min{θ : RHS(θ) < 1}`. Closed on window tail counts of the old
> word alone. No kill count, no κ(m), no residue-deleted tile to evaluate.

It comes from A9's operator (`U-FRAME.md` §11, PRIOR ART: Holt and Rudd 2014 §5)
read as an inequality rather than as a simulator, using only the two multiplicity
bounds already in that section: `ν_q(i,0) ≤ q−2` and `ν_q(i,L) ≤ 2` for `L ≥ 1`.
`operator-and-pair-count.md` records the operator's honest limit as "an exact
simulator rather than a source of bounds". The truncation above is what turns it
into a source of bounds for one fold. That is an internal absence and not a
literature one: no other script in `research/` runs the operator as an
inequality, and no claim of literature novelty is made here
(`SEARCH-CONVENTIONS.md`).

**What it certifies [VERIFIED at six folds].**

| fold q | 11 | 13 | 17 | 19 | 23 | 29 |
|---|---|---|---|---|---|---|
| certificate | 42 | 66 | 108 | 150 | 204 | 270 |
| true G₂(new) | 42 | 66 | 108 | 150 | 204 | 258 |
| loss, nats | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.045 |
| `maxsum_{L+1}(old)`, the standing route | 42 | 96 | 138 | 168 | 228 | 300 |
| its loss, nats | 0.000 | 0.375 | 0.245 | 0.113 | 0.111 | 0.151 |

Exact at five of six folds and twelve units high at the deepest. Against `q²` the
margin reads 1.058, 0.940, 0.984, 0.878, 0.953, 1.136 nats where the truth's own
slack `ln(q²/G₂)` reads 1.058, 0.940, 0.984, 0.878, 0.953, 1.182: identical at
five folds and 0.046 short at the sixth. **The instrument certifies the Zone
Postulate at every fold in reach and gives away essentially none of the lifetime
budget doing it** (0.598 to 1.19 nats, `gate-multiplies.md` §5).

**An equivalent statement of it, which is the useful one.** The certificate is
the largest sum of consecutive old gaps whose interior gaps all qualify mod q. So

> **`G₂(x'#) < x'²`  ⟺  no window of the old word with qualifying interiors sums
> to `x'²` or more**, to within the 0 to 12 units measured.

Each interior is at least `2q−2` and each adjacent pair of them at least `6q`
(the Alternation Lemma), so such a window needs about `x'²/(3q)` qualifying gaps
in a row. That is a decay hypothesis on runs of qualifying gaps and nothing else,
which is exactly what `kappa-not-L.md` names as what remains, **reached without
L, without κ(m), and without a residue-deleted maxsum.**

## 2. Pre-registration, and how it scored

Written before any run, kept at
`/private/tmp/.../scratchpad/foldL3-prereg.txt` and reproduced here in full
substance.

| ranked candidate | pre-registered call | outcome |
|---|---|---|
| tail-count profile N(θ) and its window family | most likely to transport with bite; predicted the exact inequality form above | **right**, including the form |
| adjacent-large-pair / run-seed count at 6q | second | transports as a special case of the family; bite only in the vacuous direction |
| centered maxsum | third | **wrong direction predicted correctly**: centering makes the multiplier worse |
| alphabet density | fourth | transports with zero loss, wrong direction (lower bound) |
| class vector mod 6M | fifth, predicted no bite in one line | confirmed |
| Σg^k | predicted fails bite, required order ~q/2 | confirmed, required order measured `k*/lnD` = 1.11 down to 0.63 |
| Σexp(λg) | predicted circular | confirmed, and shown to be the tail-count profile in another basis |
| pattern of why | predicted a coarse/fine dichotomy, testable by shuffling | confirmed |

## 3. The candidate table

Per-fold loss is `ln(bound/truth)` growth per fold, in nats, against a sharp
per-fold budget `2 ln q / q` running 0.436 down to 0.273 over this ladder and a
total lifetime slack of 0.598 to 1.19 nats.

| invariant | transport | bite | per-fold loss, nats |
|---|---|---|---|
| **tail-count profile `N(θ)`, `S_m(θ)`** | **PROVEN one fold**, the inequality of §1; **FAILS to chain**, §4 | **best in the audit**: certificate exact at 5 of 6 folds | **0.000 ×5, then 0.045** |
| Σg^k, fixed k | transports (`Σ_a` identity, VERIFIED to 0.000000 relative at four folds) | **FAILS**: overshoot 6.157 (k=2), 2.493 (k=4), 0.898 (k=8) at T₂₃; 7.650 and 3.171 at T₂₉ | 0.934 to 1.317 at k=2; cumulative 5.449 over five folds |
| Σg^k, k growing | — | the least k inside a factor 2 of G₂ is 3, 4, 6, 7, 9, 10, i.e. `k*/lnD` = 1.11, 0.82, 0.82, 0.70, 0.70, 0.63 | at that order the moment **is** the max; no separate candidate |
| Σexp(λg) | same inequality as the tail count, being its Laplace transform | good: overshoot 0.090 at T₂₃ and 0.056 at T₂₉, cumulative excess 0.006 | index cost is `Z₂/Z₁`, measured 36.6, 322.2, 285.8, 510.6, 126.1, 83.9 with no stable value |
| gap-count vector mod 6M | irrelevant | **NO BITE, one line**: the vector is unchanged by moving 6M from one gap to another, which moves G₂ freely. χ²/dof 3.000 to 495546.191, so it is informative about everything except size | n/a |
| adjacent-large-pair count `S₂(6q)` | special case of the family | real but weak: `S₂(6q) = 0` forces `L ≤ 2`, and it is 0 at folds 11, 13, 17 where L was already ≤ 2; 124, 2192, 6104 thereafter | n/a |
| centered maxsum `C_M` | transports exactly (affine in maxsum, copy theorem) | **worse than G₂ itself**: `C₁` multiplies by 1.556, 1.839, 1.859, 1.462, 1.415 where G₂ multiplies by 1.400, 1.571, 1.636, 1.389, 1.360 | cumulative 0.481 over five folds, against a lifetime 0.598 |
| alphabet `A(T)` | **PROVEN, zero loss**: `A(new) ⊇ A(old)`, checked at five folds | nearly equivalent to G₂ in strength (`|A|/(G₂/6)` = 0.80, 1.00, 0.909, 0.944, 0.920, 0.971, and T₂₉ has 41 against 43) but only as a **lower** bound | 0 |
| any histogram marginal | **FAILS**, §5 | — | — |

## 4. Why the tail-count family does not chain, priced

To iterate, the whole window family has to be carried. By the same alignment
count,

> `S_m'(θ) ≤ q·S_m(θ) + Σ_{K≥1} c(m,K)·S_{m+K}(θ)`, with `c(1,K) = 2` (the kills
> of one new gap form a run, so `|A_L| ≤ 2`) and `c(m,K) = 2(m+K−1)` for `m ≥ 2`
> (the kills need not be consecutive).

Carrying M profiles from the exact T₁₁ and dropping every term with `m+K > M` is
optimistic, and even so [VERIFIED]:

| M | 4 | 8 | 12 | 16 |
|---|---|---|---|---|
| `maxsum_M(T₁₁)`, the ceiling | 108 | 180 | 240 | 330 |
| chain's certificate at folds 13..29 | 108 at every level | 180 at every level | 240 at every level | 330 at every level |
| truth 66, 108, 150, 204, 258 | FALSE from fold 19 | FALSE from fold 23 | FALSE from fold 29 | BUSTS q² at 13 and 17 |

`S_M` has nothing feeding it, so its support never grows and the chain prints a
constant against a diverging truth. **A fixed index certifies a constant. The
index must grow with the level**, and the rate is priced in the next paragraph.

**And the rate is A5's cap, in a coordinate that never mentions a kill run
[PROVEN, MEASURED].** A window of sum θ carrying K kills needs K−1 mutual
qualifying spans, each at least `2q−2`, and by the Alternation Lemma each
adjacent pair of them sums to at least `6q`. So `K ≤ 1 + θ/(3q)`. Measured, the
index the certificate actually spends is K = 1, 1, 2, 2, 3, 3 against that cap at
2.27, 2.69, 3.12, 3.63, 3.96, 4.10, i.e. 44% to 76% of it, and beside it A5
Theorem B's `G₂/(3q)` reads 1.27, 1.69, 2.12, 2.63, 2.96, 2.97.

> **The 0.18p wall is coordinate-free.** It is not an artifact of the maxsum
> coordinate or of the kill-run formulation. It arrives in the counting
> coordinate from the Alternation Lemma alone, with the same constant.

## 5. The pattern, which is the finding when everything fails

**Coarse ⇒ blind. Fine ⇒ not closed.** Stated sharply:

1. **What transports has one of two shapes, and only two.** The fold is q
   residue-class deletions on one word, so windows map to windows and the two
   exact shapes are `max_a Φ(T \ {a,a−2}) = Φ(new)` (the copy theorem) and
   `Σ_a Ψ(T \ {a,a−2}) = Ψ(new) + boundary` (the count shape). The count shape is
   [VERIFIED] here to 0.000000 relative at folds 13, 17, 19, 23 on slot count,
   total span, Σg² and N(θ) at three thresholds; its only non-zero is 0.005598 at
   fold 11, the copy-boundary term at D = 15. Everything that transports at index
   cost zero is one of these two.

2. **The merge condition is a condition mod q, and q changes every level.** A
   gap merges only when `g ≡ 0, ±2 (mod q)`. Any invariant read at a FIXED
   modulus, or at a fixed moment order, cannot see that condition. To see it at
   every level an invariant would have to carry the residue data at every prime,
   which by CRT is the gap value itself: the full histogram.

3. **But the histogram is not closed.** Shuffling the old gap word fixes its
   histogram exactly. At fold 23 the true new G₂ is 204 and five shuffles give
   282, 324, 276, 330, 324, while new Σg² moves only from 9.2718598e+9 to
   9.2893051e+9 and new `N(≥120)` only from 22790 to 21095. **The bulk statistics
   are nearly histogram-determined and the record is not.** So no marginal of the
   histogram can carry a transport for G₂.

That is the whole paradox, resolved: the two known handles are not two lucky
facts, they are the complete list of index-cost-zero shapes, and every finer
statistic either is a histogram marginal (not closed) or pays an index that grows
at A5's rate. The tail-count profile is the sharpest object on the boundary: it
is a window count, so it has the right shape, and its per-fold price is the
lowest measured anywhere in the branch.

*(Caveat on the shuffle test, stated so it is not over-read: a shuffled word is
not a tile, so this refutes histogram-closure at the level of WORDS, which is the
level every candidate here is defined at. It does not by itself exclude an
argument that uses arithmetic structure a shuffle destroys. What it does exclude
is any proof whose only input about the old level is a histogram marginal.)*

## 6. Calibration, all of it passing

The audit's own machinery reproduces both known positives before any negative
above is believed.

- D and G₂ ladders 3/12, 15/30, 135/42, 1485/66, 22275/108, 378675/150,
  7952175/204 from a generator that never sieves; D(T₂₉) = 214,708,725 and
  G₂(T₂₉) = 258 by streaming, nothing stored.
- **Copy theorem**, this file's own machinery, at two folds: m1:66/66 m2:96/96
  m3:138/138 m4:156/156 and m1:150/150 m2:186/186 m3:210/210 m4:228/228. The full
  40/40 family table is CITED from `research/attack-0c0e-01-deleted-family.js`,
  embedded 2026-08-19, and not recomputed.
- **True L** reads 1, 2, 2, 2, 3, 2 at folds 11, 13, 17, 19, 23, 29, matching the
  recorded row. Residues mod q are not periodic with period W, so L cannot be
  read off one copy taken cyclically; the copies must be walked in order.
- **The 6q sum rule** is attained with EQUALITY at fold 23: the minimum sum over
  run-legal adjacent qualifying pairs is 138 = 6·23. The raw qualifying-pair
  minimum there is 96, below 6q, so the Alternation Lemma is doing the whole of
  the lift.
- **The transport inequality itself** is checked at every θ and not only at the
  endpoint: 0 violations at five folds, with `max N_new/RHS` = 1.0000, 1.0000,
  0.8881, 0.8975, 0.9180.

## 7. Honest limits

- The certificate is a per-level computation, not a theorem about all levels. It
  turns "bound L" into "bound the longest qualifying-interior window", which is a
  first-moment object rather than an extreme-value one, and that is the whole of
  what has moved. Nothing here proves the required decay.
- The 0 to 12 unit sharpness is measured at six folds and the one loss is at the
  deepest of them, which is the unhelpful direction. Do not extrapolate it.
- The chain result in §4 uses an optimistic truncation, so it is a lower bound on
  any honest certificate; the conclusion drawn from it is a negative, which the
  optimism only strengthens.
- The `Σ_{L≥1}` in the inequality is truncated at L ≤ 8 in the run. That is
  sound only while the true longest kill run stays under the truncation, which it
  does at every fold here (L ≤ 3), and §6's every-θ check is what guards it. A
  level with L > 8 would need the truncation raised, and the truncation point is
  exactly the index §4 shows must grow.
- Nothing here touches the parity wall or the sifting parameter. The relocation
  in §1 is a relocation, exactly as `TODO.md` 0b's structural warning says of the
  whole L question.

## 8. Reproduction

```
node research/attack-foldL-03-transport.js 23     # 39 s, everything above
```

Custody inside the run: the D and G₂ ladders, the copy theorem at two folds, true
L at six folds, the 6q rule with equality at fold 23, the count-shape identity to
0.000000 relative, the transport inequality at every θ, and D(T₂₉) with G₂(T₂₉)
from a stream that never stores the tile. All self-tests pass.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
