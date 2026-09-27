# T₃₇: the seventh exact level kills the linear rule, keeps the √m refutation, and certifies G₂(37#) exhaustively

<!-- ledger
id: Q-scanstat-t37
status: ANSWERED
todo: none
question: What does the seventh exact level T37 do to the linear-in-ln D rule for H, and to the sqrt(m) refutation?
verdict: The sealed prediction H*5(T37) = 0.381254, band [0.369866, 0.392641], misses the measured 0.356548 +/- 0.0068 by 3.63 of its own s.e., so per the seal the linear form was a coincidence of a short ladder; the exponent series still rises but is concave in ln D, and G2(37#) is certified exhaustively over 217,929,355,875 slots.
-->

*(2026-08-19 night. Pre-registration committed alone at `4782ef5` before the
producer existed: `scanstat-t37-prereg.md`, same folder — the criterion band
was sealed from the FIVE committed levels only, with T₃₁ in flight and used
nowhere. Run: 5 shards, 35.2 min each in lockstep, 217,929,355,875 slots
over W = 7,420,738,134,810 positions. Producer
`research/scanstat-t37-04-run.js`, embedded in `--combine-only` mode reading
the preserved shard moments in `research/t37-partials/` (the full run log is
`research/t37-partials/t37-run.log`). Validation: the engine reproduced all
48 published T₂₃/T₂₉ columns exactly, sharded = unsharded, before launch.)*

## 1. The pre-registered verdict: the linear-in-ln D rule is DEAD

| | value |
|---|---|
| sealed prediction H*₅(T₃₇) | 0.381254, 95% band [0.369866, 0.392641] |
| measured H(T₃₇) | **0.356548 ± 0.0068** |
| miss | 0.024706 = **3.63 of its own s.e. — OUTSIDE** |

Per the seal: **the linear form H = a + b·ln D was a coincidence of a short
ladder**, not a law. The exponent series over seven exact levels is now
0.2661, 0.2804, 0.3001, 0.3216, 0.3367, (T₃₁ pending), **0.3565** — still
rising, but concave in ln D: the growth is slowing against the line.

## 2. The registrations that survive

- **√m stays refuted at the seventh level**: H + 3·se = 0.3770 < 0.5.
- **Direction test holds**: H(T₃₇) > H(T₂₉), as registered.
- **The kill criterion goes the same way as always**: A′ (exponent) beats
  B′ (√m) on excess ln-RMS 0.4386 vs 0.4619 — closer than before
  (ratio 1.05), consistent with the concavity.
- The weak registrations both land just OUTSIDE their bands (sd₁ 25.16 vs
  [25.24, 38.60]; c 26.73 vs [26.74, 37.34]) — by hairs, and in the same
  concave direction as the headline.

## 3. The bonus with independent value

The custody gate `maxsum₁ = 528` is not only a check: this run scanned all
217,929,355,875 gaps of T₃₇, so it is an **independent exhaustive
maximality certificate for G₂(37#) = 528** — the twelfth ladder entry and
the corresponding A144311 term — from an engine sharing no code with the
exact-ladder producers. Slot count 217,929,355,875 = ∏_{5≤p≤37}(p−2) exact;
Σ gaps = W exact; the twelve window sums hit m·W exactly.

## 4. What replaces the dead rule

Nothing yet, and nothing should be fitted in a hurry: the record's own §1(d)
warning (the true m-dependence is a crossover with no fitted scale) now has
a level-axis twin — H(ln D) is concave with no fitted scale, and the honest
statement is the seven-point table, not a two-parameter curve. The POST-HOC
six-level refit (with T₃₁) is specified in the prereg and should be run when
the sibling's H(T₃₁) lands: `--combine-only --h31 <H(T31)>`. It is labelled
post-hoc and is not a criterion.
