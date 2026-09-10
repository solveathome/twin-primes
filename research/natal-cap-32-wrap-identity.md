# natal-cap 32 — the wrap identity: T4 without quadruple enumeration

<!-- ledger
id: Q-wrap-identity
status: ANSWERED
todo: none
question: Can T4 be computed without enumerating quadruples?
verdict: Yes: the 4-point wrap identity exists and is verified through @13 against the certified value, turning @17's dead T4 (4.9e16 quadruples) into an 11-minute computation, but at a precision that certifies T4 itself and not yet the quartic bound.
-->

**One line.** The 4-point identity cap-27 asked for exists, is verified through
@13 against the certified value, and turns @17's "dead" T4 (4.9e16 quadruples)
into an 11-minute computation — but at a precision that certifies T4 itself,
not yet the quartic bound.

## The identity

For an m-subset B and scour prime q (tokens = the 2m values r_i, r_i+2 mod q):

```
|F_B(q)| = 2m − c_B(q),   c_B(q) = Σ_v max(g_v − 1, 0)
T_m = Π_q (1 − 2m/q) · Σ_B Π_q (1 + c_B(q)/(q − 2m))
```

and the big sum decomposes into three computable layers:

* **A** — pull each pair's collision factors into a weight
  s_p = Π_colliding q (1 + e/(q−2m)) − 1; then A = Σ_B Π_pairs (1+s_p) is an
  **exact** sum over the 10 subgraph shapes of K4 (graph moments, O(N³));
* **B** — per-prime residuals live on collision **components**
  (1+κ = Π(1+μ_comp)·(1+ν)); components sit on residue-class *chains*
  v, v+2, v+4, ..., so they are counted from class lists, not subsets;
* **multi** — multi-prime κ-products, independence model × measured calibration.

**The wrap dissolves.** The d ↔ W−d obstruction (Lemma 4) never appears:
every constrained count is a histogram count of natal *representatives* mod q.
The wrap only blocks the difference-class-mod-W route. Verified per pair, per
prime (`checkWrapFree`).

## Verification chain

| level | test | result |
|---|---|---|
| @7, @11 | per-(B,q) identity, algebra, shapes, μ/ν | exact (machine ε) |
| @11, @13sub | class engines C1/C3 vs semi-direct truth | exact to 1e-13 |
| @13 full | T4 vs cap-27's 352,253,669.87624449 | **−3.5e-5** (1.8 min, 1 core) |
| @13 full | T3 vs cap-27's 4,662,945.6578926444 | −1.0e-5 |
| @17 | T1, T2, Chebyshev vs thm5 / cap-21 | exact / 1.0086e-4 = 1.01e-4 |

Approximate layers (all measured): C2 coupling truncation (−1.7% of C2),
multi-prime calibration, K4 shape (MC, ~5e-7 of G).

**The calibration constant.** CAL4 is a fitted ratio, not a constant. Measured
against the exact @13 truth (`natal-cap-34` stages [E] and [L]) it drifts
monotonically with the number of slots and does not plateau:

| N | 100 | 140 | 180 | 240 | 320 | 400 | 500 | 990 (all of @13) |
|---|---|---|---|---|---|---|---|---|
| CAL4 | 0.750 | 0.805 | 0.857 | 0.873 | 0.893 | 0.900 | 0.909 | **0.932164** |

The drift is in the slot count, not the level. At fixed subset size the levels
agree: n = 180 gives 0.857 / 0.837 / 0.860 at @13 / @17 / @19, a spread of
±0.012 against a drift of 0.106 over the same range of n. Fitting
1 − CAL4 = k/√N over N ≥ 180 gives k = 1.994 (spread 1.92–2.13), which predicts
0.851 at n = 180 across all three levels and extrapolates to **≈0.984 at @17**
(N = 14850) and ≈0.996 at @19.

The engine here uses 0.87, which is the N = 240 reading. At @13 that is a
−4.53e-5 error on T4, 14% of the block-mode budget; at @17 it moves T4 by
+2.9e-5 relative at the fitted CAL4, 7% of the ±4e-4 bar. The endpoint 0.932164
is @13's and should not be hardcoded either: it fits one level at one N, and it
absorbs the 3-prime joint term (−0.60% of the layer at @13, growing with N)
along with the 2-prime correlation defect (0.937740). The fix is to compute the
2-prime joint layer exactly and delete the constant — `natal-cap-34` stage [J]
prices that at 3.28e9 operations at @13 and 4.07e13 at @17.

## @17 — first values

* T4@17 = **4,616,850,623,332 ± 4e-4 rel** (block engine; budget = measured @13 block error)
* T3@17 = **5.6940e9 ± 1e-4 rel**
* μ = 3245.5126, Var = 1062.3544 (exact), μ/σ = 99.6, Chebyshev = 1.0086e-4

## The honest wall

μ4 = M4 − 4μM3 + 6μ²M2 − 3μ⁴ cancels about seven orders at @17 against the
Gaussian scale (24·T4/3Var² ≈ 3e7). Carrying both legs,

```
dμ4 = 24·T4·relT4 + |36 − 24μ|·T3·relT3
```

and at the published bars the two legs are equal to three digits: 4.432e10 from
T4 at ±4e-4, 4.433e10 from T3 at ±1e-4. So dμ4 = **8.87e10** against a
Gaussian-scale μ4 ≈ 3Var² = 3.39e6, a factor 2.6e4, and **neither μ3@17 nor
μ4@17 is currently distinguishable from zero.** The quartic bound is NOT
certified at @17; Chebyshev 1.01e-4 stands. Per unit *relative* error T3 hurts
four times as much as T4, so improving T4 alone caps the gain at ×2.

There is no single precision requirement, only a ladder (relT3 = relT4/4
throughout, μ4 assumed to land at the 3Var² scale as it does at @11 and @13):

| certified P(S=0) @17 | needs relT4 | factor from ±4e-4 |
|---|---|---|
| beat Chebyshev at all (1.0086e-4) | 5.05e-5 | 7.9 |
| 1e-5 (×10 Chebyshev) | 4.99e-6 | 80 |
| 1e-6 (×100) | 4.85e-7 | 824 |
| 6.10e-8 (2× the shape reference) | 1.53e-8 | 2.6e4 |
| 3.08e-8 (the shape reference to 1%) | 1.53e-10 | 2.6e6 |

The shape-reference *prediction* (not a theorem; exact to 0.01% at @13) is
quartic ≈ 3Var²/μ⁴ = 3.05e-8, ×3300 below Chebyshev. It assumes μ4 lands on
3Var², i.e. that κ4 = μ4 − 3Var² is small at @17; κ4 is measured only at @11
(−1.11) and @13 (−0.485), both negative. Reaching 3.05e-8 through T4 costs six
orders. Reaching it through the *sign* of κ4 costs no precision at all, and κ4
is the fourth cumulant — the object in which this cancellation is analytic
rather than numerical.

Making the identity exact means: multi-prime joint-config counts (2D class
histograms over prime pairs, identified and priced in `natal-cap-34` stage [J]
at 4.07e13 operations at @17), C2 order-3 (done exactly in `natal-cap-34` stage
[C2]), and an exact K4-shape sum (`k4direct`, 199 s at @13, ~8.5 days on ten
cores at @17). Same gap gates T5/T6@13 (the sextic rung): computable at ~1e-4
by this engine, bound-grade not yet.

*File: research/natal-cap-32-wrap-identity.js (all stages + workers, CLI:
small | at13 inst|block | at17 | cal). Ensemble statements only; moratorium
respected: no commits, no circulation.*
