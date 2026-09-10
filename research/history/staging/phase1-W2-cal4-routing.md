# Phase 1, W2 — CAL4, the @17 price, and whether the standing plan points at the right obstruction

<!-- ledger
id: Q-cal4-routing
status: ANSWERED
todo: none
question: Does the standing certificate plan point at the right obstruction, and what is CAL4 worth at @17?
verdict: The plan is aimed at the wrong obstruction, but not for partition W's reason: the @13 1e-9 gate is met today only by an assembly containing the brute-force C(990,4) march whose @17 counterpart is 513 days on ten cores and is not codeable here, the @17 requirement is a ladder whose first useful rung is relT4 <= 5.05e-5, a factor of 7.9 rather than six orders, and CAL4 has no correct constant value.
-->

**Headline.** The standing plan is aimed at the wrong obstruction, but not for the
reason partition W gave: the @13 1e−9 gate is met today **only by an assembly that
contains the brute-force C(990,4) march**, whose @17 counterpart is 513 days on ten
cores and is not even codeable here (`pairMasks` asserts K ≤ 64; @17 has K = 120), so
the gate certifies nothing for @17; and the @17 requirement is not one number but a
**ladder whose first useful rung is relT₄ ≤ 5.05e−5, a factor of 7.9 from where
cap-32 already is, not six orders.** CAL4 has no correct constant value — 0.932164 is
@13's endpoint of a monotone drift cap-32 measured and under-extrapolated, and at @17
the entire CAL4 error is 4–8% of the published error bar.

All four of partition W's claims reproduce digit for digit. The redirection comes from
what they were read to mean, not from any number being wrong.

Work done 2026-08-18 on the 10-core machine, node v22.21.0. Files edited:
`research/natal-cap-34-wrap-precision.js`, `research/natal-cap-32-wrap-identity.md`.
Documentation only; **no executable line changed** and `node --check` passes. Fast QC
gate re-run after the `.md` edit: 0 findings across all seven checks. No commits, no
pushes.

---

## 1. THE THREE CONCLUSIONS THAT CHANGE WHAT SOMEBODY DOES

**C1. The @13 gate is five minutes of one core away, and closing it will still tell you
nothing about @17.** cap-34's best assembly misses 1e−9 only because of one Monte Carlo
shape — and cap-32 *already contains* an exact routine for that shape, `k4direct`
(`natal-cap-32-wrap-identity.js`:280-285), Kahan-compensated, validated at @7 in its
own `small` stage, and **never run above @7**. Ran at the full @13 today:
**k4 = 60234.496774278130 in 198.9 s on one core** (252.7 s and 319.9 s on two later
runs sharing the machine — call it 3 to 5 minutes). Then I rebuilt cap-34's whole best
assembly three times, everything else identical, and this is **measured, not inferred**:

| k4 source | T4 | REL vs certified | 1e−9 gate |
|---|---|---|---|
| **exact, `k4direct`** | 352253669.87614751 | **−2.753038e−13** | **MET (by ×3600)** |
| by difference, `A_exact − A_shapes` | 352253669.87618858 | −1.587185e−13 | MET |
| MC, n = 2e8, seed 4242 | 352253669.51634955 | −1.021692e−9 | not met |

(The third row reproduces cap-34's published figure exactly, so the comparison is
like for like.) What is left at −2.8e−13 is float noise in `assembleA`'s
non-compensated O(N³) shape sums, not mathematics. **But the same assembly takes Multi
EXACT from the C(990,4) march, and that borrow is the one that matters (C2, below).**

**C2. The @13 gate is not meetable by anything that could be re-run at @17, and the
gate's own arithmetic says so.** From cap-34's exact joint split, a scalable pipeline
that computes the 2-prime joint layer exactly still leaves e₃+e₄₊ = **−4.0643e−6 of
G**; one that computes 2-prime *and* 3-prime exactly still leaves e₄₊ =
**9.919035e−9 of G, ten times the gate.** So meeting 1e−9 at @13 without the march
requires exactness through **four-prime** joint terms, and cap-34 stage [J] prices
only the 2-prime contraction (WJ4 = 3.2818e+9 at @13, 4.0689e+13 at @17). Nobody has
priced e₃ or e₄ at any level. Meanwhile the march itself at @17 is C(14850,4) =
2.026e+15 quadruples against @13's 3.978e+10 in 1048 s on ten cores → **513 days on
ten cores**, and `pairMasks` refuses K > 64 anyway.

**C3. The @17 requirement is a ladder and the corpus quotes only its last rung.**
Derived below. The first rung — a beyond-Chebyshev bound at @17 *at all* — is
relT₄ ≤ **5.047439e−5**, a factor of 7.9 from the published ±4e−4. And 94% of the
**@13 block-mode** error budget — which is where the @17 ±4e−4 comes from, it is not
an independent @17 measurement — is the block engine's C1 and C3, which the instance
engine already makes exact at @13 to 1e−13. So the @13 work is relevant to @17 —
**through the engine it validates, not through the gate it meets, and at a tolerance
five orders looser than the one on record.** (That 94% is a @13 share carried to @17
by the same assumption that carries the ±4e−4 itself; nobody has measured the block
engine's layer split at @17.)

---

## 2. THE FOUR CLAIMS, CHECKED AT THE ARTIFACT

Re-run today from my own scratch directory, not from partition W's JSON on disk. What
each claim needed:

| claim | stages needed | my wall | verdict |
|---|---|---|---|
| P1 layer split (Multi −4.531943e−5 vs C2 +1.056084e−5) | `exact13` + `layers` | 1048.0 s + 322.4 s | **reproduces, digit for digit** |
| CAL4 = 0.932164 implied | `exact13` + `layers` | same run | **reproduces** |
| best assembly REL −1.021692e−9, k4 8.290660e−10 | `exact13` + `layers` | same run | **reproduces** |
| `kurt` prices @17 at relT₄ ≤ 3.055646e−10 | `kurt` alone | 2.0 s | **reproduces** |

Notes on the reproduction:

- `exact13` returned T4 = 352253669.87624460, REL 3.384189e−16, G = 65955633770.936089,
  and every layer digit-identical to the block pasted in cap-34. This is the **third**
  independent run of that march (cap-34's archived log, partition W's re-run, mine).
  Wall 1048.0 s against partition W's 876.1 s: same machine, mine sharing cores.
- `layers` reproduced every printed figure including the model 48083774.2789 against
  the exact 44821955.4433 (a 7.28% overshoot — "right to 7%" is right), the rebuild
  352241335.077 at REL −3.501681e−5, and `GATE 1e-9: not met even with Multi exact`.
- `kurt` reproduced to the last digit at 2.0 s.
- **The 8.290660e−10 is a one-sigma MC standard error, not a realised deviation.** The
  code prints `k4mc.err/t.G`. Separately I measured the realised deviation of that
  exact draw (n = 2e8, seed 4242): **−1.021534e−9 of G**, which is essentially the
  whole −1.021692e−9 of the assembly. So the reading is right in substance; the phrase
  "contributing 8.29e−10" conflates σ with the draw.

**One thing in the artifact contradicts itself and I fixed it.** cap-34's header
(PLAN vs CODE) and reading 12 both said "the @13 gate ... was met, by six orders",
while reading 6 and the pasted OUTPUT say "misses the 1e−9 gate by 2%" and "GATE 1e-9:
not met". The six orders are stage [E]'s 3.384189e−16 — the exact march, i.e. the
truth the gate is measured *against*, not a pipeline. Corrected in place.

---

## 3. CAL4 — SETTLED

**Is 0.932164 right?** Yes as a measurement, no as a constant.

**Is 0.87 wrong?** Yes, and wrong in the direction cap-32's own data predicted.
`natal-cap-32-wrap-identity.js`:724-726 adopts 0.87 "with ±0.05 uncertainty carried in
the error budget", extrapolated from stage `cal` at N = 100/140/180/240. I reproduced
that stage by **two independent codes** (cap-32's own `BsemiDirect`/`AdirectT4` route
and cap-34's `exactPass`, which agree to every printed digit) and extended it:

| N | 100 | 140 | 180 | 240 | 320 | 400 | 500 | 990 = all of @13 |
|---|---|---|---|---|---|---|---|---|
| CAL4 fitted | 0.750232 | 0.804732 | 0.856591 | 0.873041 | 0.892792 | 0.900349 | 0.909235 | **0.932164** |
| CAL4, 2-prime only | 0.752751 | 0.807997 | 0.860510 | 0.877378 | 0.897541 | 0.905221 | 0.914238 | 0.937740 |
| e₃/Multi | −0.336% | −0.406% | −0.458% | −0.498% | −0.533% | −0.542% | −0.551% | −0.5995% |

(The 100/140/180/240 row reproduces cap-32's recorded 0.750/0.805/0.857/0.873 exactly.)

Monotone, no plateau, and the true endpoint **0.932164 sits outside cap-32's own ±0.05
band** (upper edge 0.92). 0.87 is the N = 240 reading adopted as if it were the limit.

**The drift is in the slot count, not the level** — partition W could not tell these
apart and flagged it as the cheap test to run. Implied CAL4 at *fixed* subset size:

| n | @13 | @17 | @19 |
|---|---|---|---|
| 100 | 0.750232 | 0.772365 | 0.857381 |
| 140 | 0.804732 | 0.819008 | 0.837051 |
| 180 | 0.856591 | 0.836656 | 0.860460 |

(and the full small levels: @7, N = 10 → 1.605830; @11, N = 90 → 0.786011, which sits
exactly where @13's N-curve puts N = 90.) By n = 180 the three levels agree to ±0.012
while the drift with n over that range is 0.106, and the level ordering is not even
monotone. Fitting **1 − CAL4 = k/√N** over N ≥ 180 gives k = 1.9943 (spread
1.918–2.134); the same k predicts 0.8514 at n = 180 against 0.837/0.857/0.860
*measured at three different levels*. Extrapolated: **CAL4 ≈ 0.984 at @17**
(N = 14850), ≈0.996 at @19. Read that as a one-parameter extrapolation from one
level's subsets, not a law — k is still creeping up over the last three points.

So partition W's suspicion is confirmed in direction: **CAL4 at @17 is further from
0.87 than at @13.** The size still does not matter (below).

**Why 0.932164 must not be hardcoded either:**

1. **It fits one level at one N.** The same fit at N = 100 gives 0.750. Nothing
   measures it at @17, where N = 14850 is 15× larger and the drift has not turned over.
2. **It conflates two physically different corrections.** The pure 2-prime correlation
   defect is Multi₂/model = 0.937740. The fitted 0.932164 also absorbs the 3-prime
   joint term, which is −0.5995% of the layer at @13 **and grows with N** (row 3
   above). Transplanting 0.932164 to @17 transplants @13's 3-prime term with it.
3. **It is not the binding error anywhere.** At @13 in block mode the budget is
   C1 −1.796335e−4, C3 −1.229796e−4, C2 +2.552517e−5, Multi −4.531943e−5: CAL4 is
   **14%** of the total and the block engine's C1+C3 are **94%**. At @17, moving CAL4
   from 0.87 to anywhere in [0.932164, 1.0] moves T4 by **+1.586e−5 to +3.317e−5**
   relative — 4% to 8% of the published ±4e−4 bar; at the fitted 0.984, 2.901e−5 =
   7.3%. (Computed from cap-32's own `multi/G = 2.22e-4` at @17: shift =
   (CAL4\*/0.87 − 1)·2.22e−4.)

**So the half of partition W's suspicion that mattered does not survive.** It suspected
"cap-32's @17 T₄ may be *biased* rather than merely imprecise, and the ±4e−4 would be
an understatement". The bias is real and is now measured at ≈2.9e−5 — **7% of the bar,
not an understatement of it.** What *is* an understatement risk at @17 is a different
thing entirely and worth naming: the ±4e−4 is not an error bound at all, it is the @13
block-mode error rounded up and **assumed** to transfer
(`natal-cap-32-wrap-identity.js`:779,
`const REL4=4e-4; // budget: @13 block-mode measured error (-3.9e-4), rounded up`).
Nothing checks the block engine at @17.

**The fix is not a better constant.** cap-34 stage [J] already identifies it: compute
the 2-prime joint layer exactly and delete CAL4. 3.2818e+9 operations at @13,
4.0689e+13 at @17.

### Blast radius of 0.87 — every site, none edited outside my two files

| site | what it is |
|---|---|
| `research/natal-cap-32-wrap-identity.js`:727 | `const CAL4=0.87` — the definition |
| `research/natal-cap-32-wrap-identity.js`:724-726 | the comment adopting it, "drifting toward ~0.87-0.92 at large N ... ±0.05 uncertainty carried in the error budget". The truth is 0.932164, above its own upper guess and outside its own band. |
| `research/natal-cap-32-wrap-identity.js`:746 | `run13` — produces the published @13 T4 = 352,241,335.08 |
| `research/natal-cap-32-wrap-identity.js`:777 | `run17` — **produces the published T4@17 = 4,616,850,623,332** |
| `research/natal-cap-32-wrap-identity.js`:826-827 | OUTPUT block quoting it ("multi model/truth = 0.77-0.87", "at13 (instance engine, CAL4=0.87)") |
| `research/natal-cap-32-wrap-identity.md` §"The calibration constant" | **edited** — replaced with the drift table, the level test and the √N fit |
| `research/natal-cap-34-wrap-precision.js`:20, :408-409, :417, :425, :441 | prediction text, the implied-CAL4 print, the budget label and two rebuilds |
| `TODO.md`:253, `research/natal-cap-32-wrap-identity.md`:71, `research/history/CHRONICLE.md`:205, `research/history/NIGHT-LEDGER-2026-08-14-15.md`:132 | quote T4@17 = 4,616,850,623,332, which is a CAL4 = 0.87 number (grep `4,616,850,623,332` over `*.md`; four live sites plus four staging reports) |
| `README.md`:100-101 | quotes the ±4e−4 bar without the value |

**Consequence for the published numbers: none large enough to retract.** T4@13 would
move from 352,241,335.08 to about **352,257,298** — from REL −3.501681e−5 to
**+1.030e−5** against the certified value, *worse in magnitude only by luck's absence*:
today's −3.5e−5 is a partial cancellation of the multi error against the C2 error, and
fixing one of the two uncovers the other. T4@17 would move by +1.6e−5 to +3.3e−5
relative, inside its own bar. **Do not re-fit the constant; delete it.**

---

## 4. THE @17 PRICING — DERIVED, NOT QUOTED

Method: μ and Var at @17 exact from `thm5` (independent path, reproduces cap-21's
Chebyshev to the last digit); T3, T4 from cap-32; the assembly checked at @11 and @13
first, where it reproduces cap-34's `kurt` (μ4 = 277.1352 / 24407.3737, 3Var² =
278.2415 / 24407.8586) and cap-27's bounds (quartic 1.16e−4 / 2.85e−6, SOS 7.80e−5 /
1.898e−6) exactly. Script:
`<scratch>/w2/price17b.js`.

**The sensitivity.** μ4 = 24·T4 + (36−24μ)·T3 + (14−24μ+12μ²)·T2 + (1−4μ+6μ²)·T1 − 3μ⁴,
so

```
dμ4 = 24·T4·relT4 + |36 − 24μ|·T3·relT3
```

with 24·T4c = **1.108044e+14** and |36−24μ|·T3c = **4.43311e+14** per unit relative
error. (cap-32 uses (36+24μ); the two differ by 0.09%, conservatively.)

**Two facts the corpus does not state.**

1. **T3 hurts four times as much as T4 per unit relative error**, and at the published
   bars the two legs are *equal to three digits*: 4.43218e+10 from T4 at 4e−4,
   4.43311e+10 from T3 at 1e−4. Total dμ4 = 8.865302e+10 (cap-32 printed 8.9e10).
   **Fixing T4 alone caps the total gain at ×2.** `README.md`:101 and `TODO.md`:255
   state the requirement in T4 only.
2. **μ3@17 and μ4@17 are currently noise, and cap-32 computed both and printed
   neither.** From cap-32's own T3c, T4c: μ4 = **3.396776e+9** against 3Var² =
   3.385791e+6 — a factor 1003 — and μ3 = **−9.686878e+5**. But dμ4 = 8.87e10 is 26×
   that μ4, and dμ3 = 6·T3c·1e−4 = 3.416e+6 is 3.5× that μ3. Neither is distinguishable
   from zero. Confirmation that they are junk rather than a signal: μ3 = −9.69e+5 is
   inconsistent with μ4 = 3Var² by Cauchy–Schwarz, which needs |μ3| ≤ √(Var·μ4) =
   5.998e+4. At ±4e−4 the @17 moment pair is not yet a moment pair.

**cap-34 `kurt`'s printed numbers double-count.** It sizes relT4 and relT3 so that
*each term alone* equals tol·3Var²; satisfying both gives dμ4 = 2·tol·3Var². Carrying
both legs with relT3 = relT4/4 (cap-32's ratio), the sensitivity is **2.216326e+14**
per unit relT4, and the honest figure for `kurt`'s own 1% target is
**relT4 ≤ 1.527659e−10, not 3.055646e−10.**

**The ladder** (relT3 = relT4/4 throughout; μ4_true taken at the 3Var² scale, as it is
at @11 and @13):

| certified P(S=0) at @17 | dμ4 budget | required relT4 | factor from ±4e−4 |
|---|---|---|---|
| beat Chebyshev 1.008562e−4 at all | 1.118677e+10 | **5.047439e−5** | **7.9** |
| 1e−5 (×10 Chebyshev) | 1.106129e+9 | 4.990825e−6 | 80 |
| 1e−6 (×100) | 1.075657e+8 | 4.853336e−7 | 824 |
| 1e−7 (×1000) | 7.709360e+6 | 3.478442e−8 | 1.1e4 |
| 6.103190e−8 = 2× the shape reference | 3.385791e+6 | 1.527659e−8 | 2.6e4 |
| 3.356754e−8 = reference +10% | 3.385791e+5 | 1.527659e−9 | 2.6e5 |
| 3.082111e−8 = reference +1% | 3.385791e+4 | 1.527659e−10 | 2.6e6 |

**So: is the requirement 3.06e−10 or 3e−9? Neither.** Both are points on this ladder
corresponding to arbitrary quality targets (μ4 to 1% and to 10%), and both are ~2×
loose because they price one leg at a time. The *requirement*, if the word means "what
it takes to produce a result the corpus does not already have", is **5.05e−5**. The
six-orders figure is the price of landing on the ×3300 win specifically, and that is a
real number for that target.

**A caveat that cuts against the optimistic reading.** All of this prices *precision*.
For a theorem you need a *certified* error bound, and cap-32's ±4e−4 is an empirical
transfer, not a bound. Likewise the k4 Monte Carlo gives a probabilistic bar and can
never appear in a proof, however small σ gets. The road to a certified @17 bound is
exact layers plus a rigorous remainder, not tighter sampling.

---

## 5. THE ROUTING VERDICT

**Committed answer: meeting the @13 gate does not bring @17 materially closer. They
are separate obstructions, and the plan should be split into two independently priced
items.** The @13 work is not wasted, but the mechanism by which it helps is not the one
the plan states.

**Why the gate does not transfer.** The assembly that gets @13 to 1e−9 has four parts.
Priced at @17:

| part of the @13 assembly | @17 cost | basis |
|---|---|---|
| **Multi EXACT** (from stage [E], the march) | **513 days on ten cores**, and uncodeable (`pairMasks` asserts K ≤ 64; @17 has K = 120) | counted: 2.026e+15 quadruples vs @13's 3.978e+10 in 1048 s |
| C1, C3 exact (instance engine) | order **a week on ten cores**, plus 1.76 GB for `Pmatrix` and 1.76 GB for S | counted instances: V4 6.0653e+13 vs 1.7588e+9; useTP leg (V3·N) 1.3559e+15 vs 3.1794e+10; @13 measured 126 s |
| C2 factorised exact | order **162 h** on the O(N) leg alone, O(nnz) leg scales worse | 1.5·N³·Σ1/q scales 4.396e+3×; @13 measured 132.8 s |
| k4 exact (`k4direct`) | **8.5 days on ten cores** | measured 198.9 s at @13; n^3.92 fit over five subset sizes |

The one layer that gets @13 to 1e−9 is the one that cannot exist at @17. And the
scalable substitutes do not reach the gate even at @13 (§1 C2). **The gate is
therefore a test that the exact march passes and no transferable pipeline does.**

**Why the @13 work still matters, and what to do instead.** 94% of the @13 block-mode
error is C1 and C3, which the instance engine already fixes. The first @17 rung needs
only 5.05e−5. So a realistic @17 programme, all with machinery that exists or is
priced:

1. C1, C3 exact at @17 (instance engine) — removes 3.03e−4 of the 3.22e−4 budget.
2. C2 factorised exact (cap-34 stage [C2]) — removes 2.55e−5.
3. Multi from the exact 2-prime joint layer (cap-34 stage [J], 4.07e13 ops) — deletes
   CAL4; leaves the 3-prime term, extrapolated at order 1e−6 to 3e−6 of G (**not
   measured — see coverage**).
4. `k4direct` for the K4 shape — removes the only Monte Carlo.

Landing zone relT4 ≈ 1e−6 (dominated by the unbounded 3-prime remainder), which on the
ladder is a certified bound near **2e−6, about 50× Chebyshev**. Order one month on this
machine. That is a theorem the corpus does not have, and it needs nothing from the
1e−9 gate.

**And the ×3000 win is not on this road at any price.** It requires μ4 to land on
3Var², i.e. κ4@17 small — a statement about the truth, not about precision. No amount
of T4 accuracy establishes it. **κ4 = μ4 − 3Var² is the fourth cumulant**, and the word
"cumulant" appears nowhere in this corpus (grep over `research/` and `paper/`; known
positive: `kappa4` hits 17 lines, all in cap-34 and its citers). A cumulant is exactly
the object in which the seven-order cancellation that defeats the T4 road is done
*analytically*. That is where the unwritten stage [17] should go.

**What would change this verdict:**

- A scalable exact route to the 3-prime and 4-prime joint layers. That would make the
  @13 gate meetable by a transferable pipeline and the whole plan would come back to
  life as written. Nobody has priced e₃ or e₄ at any level; this is the single cheapest
  thing that could overturn me.
- A measurement showing the @17 3-prime joint share is much smaller than the @13 one,
  which would let the 2-prime layer alone carry @17 past 5e−5 without step 3's
  remainder being bounded.
- Evidence that the instance engine does not in fact scale to @17 (memory, not
  arithmetic — I counted operations and did not run it). That would kill step 1 and
  leave @17 with no route at all on the T4 road.

---

## 6. THE k4 MONTE CARLO, PRICED

Asked for because partition W named it the last obstruction at @13. It is — of that
assembly — and it is the cheapest thing in this report to remove.

**Measured throughput at @13** (`k4MC`, single core): 2e7 samples in 2.2 s
(σ/G = 2.579668e−9), 2e8 in 35.3 s (σ/G = 8.290660e−10, realised deviation
−1.021534e−9). Sampling cost to shrink σ, at 5.7e6 samples/s:

| σ/G target | samples | one core | ten cores |
|---|---|---|---|
| 5e−10 | 5.50e+8 | 97 s | 10 s |
| 2e−10 | 3.44e+9 | 607 s | 61 s |
| 1e−10 | 1.37e+10 | 2430 s | 4 min |
| 1e−11 | 1.37e+12 | 67.5 h | 6.8 h |
| 1e−12 | 1.37e+14 | 6748 h | 675 h |

**But the right answer is not to sample harder.** cap-32 already ships an exact
routine, `k4direct` (`natal-cap-32-wrap-identity.js`:280-285), Kahan-compensated and
validated at @7 by cap-32's own `small` stage (`assertClose(A7s, A7, 1e-12)`). It has
never been run above @7. Run today:

```
@13 FULL k4direct = 60234.496774278130   [198.9s single core]
vs cap-34's A_exact - A_shapes = 60234.5044708   (rel -1.2778e-7)
```

The 1.3e−7 disagreement is float cancellation in the *difference* route (A ≈ 6.9e10,
so A_exact − A_shapes carries ~1e-6 relative at best); in G units the gap is 1.2e−13,
irrelevant to the gate. **`k4direct` is the more accurate of the two** — Kahan over
strictly non-negative terms, so no cancellation at all — **and it is not circular**: it
needs only S, not the exact13 truth. cap-34's reading 6 was wrong to say a cheap
pipeline "cannot help itself to it". The measured gate result is in §1 C1: REL
**−2.753038e−13**, gate met by ×3600.

Cost elsewhere, probed at five subset sizes (150/200/250/300/350, 0.14–3.03 s, fitted
exponent 3.92 against a theoretical 4): **@13 full 199 s measured; @17 8.5e+1 days
single core = ~8.5 days on ten cores** — the cheapest of the four @17 exact legs.

**Named work item, bounded and precise.** *In `natal-cap-34-wrap-precision.js` stage
[L], replace `C32.k4MC(L,S,2e8,4242)` in the best-assembly block with
`C32.k4direct(L,S)`. Costs 199 s at @13 and takes the assembly from REL −1.021692e−9
to −2.753038e−13. One call site, no new mathematics, and it removes the last
probabilistic object from the @13 pipeline — which matters beyond the gate, because a
Monte Carlo error bar can never appear in a proof however small σ gets.* I did not make
this edit: it changes what the script computes, and the brief for this partition is
adjudication, not engine work.

---

## 7. EDITS MADE

`research/natal-cap-34-wrap-precision.js` (954 → 1133 lines, `node --check` passes,
no executable line changed):

- header PLAN-vs-CODE: the "@13 gate ... was met, by six orders" claim removed and
  replaced with the gate's actual status, because it contradicted the file's own
  OUTPUT block and reading 6.
- reading 5: corrected and extended — the double-counted `kurt` pair, the T3 leg, the
  ladder, and the noise status of μ3@17/μ4@17.
- reading 6: corrected in both directions — `k4direct` removes the MC for 199 s and
  closes the gate at a measured −2.753038e−13 (the circularity note was wrong), and the
  assembly's larger borrow is Multi from the march (which the note missed).
- reading 10: the sentence "4e−6 of G — comfortably inside the 1e−9 gate's needs"
  corrected; 4e−6 is four thousand times outside a 1e−9 gate.
- reading 12: the same "met by six orders" claim corrected.
- readings 13 and 14 added: CAL4 is not a constant; the routing verdict with the
  counted @17 component prices.

`research/natal-cap-32-wrap-identity.md` (65 → 119 lines, rewritten in place per the
doc convention — present tense, claims edited rather than annotated):

- the calibration line replaced with the measured drift table and what to do instead.
- "the honest wall" rewritten: the **±2e2 on μ4 figure was wrong** (the correct dμ4 is
  8.87e10, a factor 2.6e4 over 3Var², which cap-32's own OUTPUT block states as
  "~2.6e4x too coarse" two lines from the reading that says 2e2); the single "~3e-9"
  replaced by the ladder; the κ4/cumulant road named.

`research/history/staging/phase1-W2-cal4-routing.md` — this report.

**A judgement call on the doc convention, flagged so it can be overruled.** The
convention ("working docs state the latest full understanding; corrections go to
CHANGELOG") I applied strictly to the `.md` — claims edited in place, present tense, no
correction blocks. I did **not** apply it to the `.js` READINGS, where I kept dated
correction notes, because those readings sit beside a pasted OUTPUT block that literally
prints `mu4 to 1% needs relT4 <= 3.055646e-10`. Silently rewriting the reading to say
1.53e−10 would leave the file contradicting its own output with no way for a reader to
reconcile them, and the alternative — editing the code and re-pasting — changes what the
script computes. Every other `natal-cap-*.js` in the corpus carries dated notes for the
same reason. If the adjudicator wants those migrated too, the code line to change is
`natal-cap-34-wrap-precision.js`:598-600 (the `for(const tol of ...)` loop, which sizes
`rel4` and `rel3` independently) and stage `kurt` re-runs in 2 seconds.

**Reproduction.** Everything above comes from six runs of the corpus's own stages plus
five scratch scripts that `require` cap-32 and cap-34 unmodified (the same
compile-with-an-appended-export-line trick cap-34 uses on cap-32, so every figure is
produced by the published code). Scratch dir:
`/private/tmp/claude-501/-Users-benjaminsen-Files-Git-primeoire/43d455bc-6530-4df2-9970-05f6622affcb/scratchpad/w2/`.

| what | command | wall |
|---|---|---|
| the truth | `NC34_DIR=<w2> NC34_WORKERS=10 node research/natal-cap-34-wrap-precision.js exact13` | 1048.0 s |
| the layer split | `NC34_DIR=<w2> node research/natal-cap-34-wrap-precision.js layers` | 322.4 s |
| the @17 pricing inputs | `node research/natal-cap-34-wrap-precision.js kurt` | 2.0 s |
| the ladder, derived | `node <w2>/price17b.js` | 3 s |
| level scaling constants | `node <w2>/scale.js` | 4 s |
| class-engine instance counts | `node <w2>/engcost.js` | 1 s |
| CAL4 drift by N | `node <w2>/cal4.js` | ~25 min |
| CAL4 across levels | `node <w2>/cal4lvl.js` | ~10 min |
| k4 MC ladder + exact probes | `node <w2>/k4.js` | ~1 min |
| k4 exact at full @13 | `node <w2>/k4full.js` | 198.9 s |
| the gate, with each k4 | `node <w2>/gate.js` | ~16 min |

**CHANGELOG entries owed** (I do not own `research/history/CHANGELOG.md`):

> `research/natal-cap-32-wrap-identity.md`, 2026-08-18 (W2). Retired: "±4e-4 on T4
> becomes ±2e2 on μ4". The correct figure is dμ4 = 8.87e10, a factor 2.6e4 above
> 3Var² = 3.39e6; the file's own OUTPUT block already said 2.6e4. Retired: "Certifying
> it needs the identity at ~3e-9 relative" as a single requirement — replaced by the
> seven-rung ladder, whose first rung (beat Chebyshev) is 5.05e-5. Retired:
> "CAL4 = 0.75→0.87 drift measured over N" — the exact @13 endpoint is 0.932164, which
> is outside cap-32's own ±0.05 band.

---

## 8. UNRANKED — THINGS I TRIPPED OVER, NOT SWEPT FOR

1. **`natal-cap-32-wrap-identity.js`:877 is the home of the ±2e2 error** and I did not
   edit it (the `.md` descends from it). Its reading 5 also carries the "~3e-9" single
   number. The same reading's neighbouring OUTPUT block, :840-841, says "~2.6e4x too
   coarse" — the file contradicts itself two lines apart.
2. **Sites quoting "~3e-9" as the @17 requirement**, all descending from cap-32
   reading 5: `README.md`:101, `TODO.md`:255, `research/natal-cap-21-beyond-chebyshev.js`:50,
   `research/natal-cap-32-wrap-identity.js`:841 and :880,
   `research/history/NIGHT-LEDGER-2026-08-14-15.md`:198,
   `research/history/staging/qc-scripts-S1.md`:119, `research/qc/checks.js`:629
   (an ABSENCE_VERIFIED ledger note, so it will need its text updated when TODO does).
   One home, eight repeats — agreement here is not independence.
3. **`TODO.md`:255-259 asserts "The @13 precision gate is MET, and so is the @13 bound
   itself ... What is met on precision is T₄'s accuracy, with six orders to spare."**
   Same conflation as cap-34's header: the six orders belong to the march. The bound
   claim is separately true (cap-27).
4. **`natal-cap-34`'s `exactPass` is capped at K ≤ 64 primes** (`pairMasks`:154) and
   its e₂/e₃ accumulator keeps only the first 16 κ values per quadruple (:223). @13
   has K = 34 and maxK = 12, so both are safe there and neither is documented as a
   limit. @17 has K = 120.
5. **cap-32's ±4e−4 at @17 is not an error bound.** `natal-cap-32-wrap-identity.js`:779:
   `const REL4=4e-4; // budget: @13 block-mode measured error (-3.9e-4), rounded up`.
   Nothing checks the block engine above @13. Every downstream sentence that reads
   ±4e−4 as an interval is reading an extrapolation as a certificate.
6. **The SOS ("optimal quadratic-square") bound, which is what cap-27's @13 *theorem*
   actually uses, is absent from every @17 pricing.** It gains ×1.5 over quartic Markov
   at @13 (1.898e−6 vs 2.847e−6). It does not change the order of anything above, but
   the @17 ladder is stated in the conservative bound, not the one the corpus proves
   with.

---

## 9. COVERAGE — what I did not reach, and where I am most likely wrong

**Most likely wrong, in order.**

1. **The @17 component prices are counted operations times a measured @13 rate, and
   that is a linear model of a memory-bound problem.** At @17 the instance engine wants
   two 1.76 GB dense matrices; @13's fit in L3-ish working sets. Every one of "a week
   on ten cores", "162 h", "8.5 days" could be 3–10× worse. They cannot be much
   *better*: the operation counts are exact. **The 513-day Multi figure is the safest
   of them** because it is a quadruple count, and it is the one the routing verdict
   rests on.
2. **"Order 1e−6 to 3e−6 of G" for the @17 3-prime joint residual is an extrapolation
   from one level.** At @13, e₃/Multi = −0.5995% and Multi/G = 6.796e−4 → e₃/G =
   −4.07e−6. At @17, Multi/G ≈ 2.2e−4, and e₃/Multi grows with N (I measured it growing
   from −0.336% to −0.551% over N = 100→500 within @13). I have no @17 measurement.
   Step 3 of the programme in §5 is the shakiest step, and it is the one that sets the
   landing zone.
3. **The ladder assumes μ4_true lands at the 3Var² scale.** That is measured only at
   @11 (κ4 = −1.1063) and @13 (−0.4850). If κ4@17 is large the whole ladder shifts and
   the first rung gets easier, not harder (a bigger μ4 means Chebyshev is beaten
   sooner or never). I did not model the "never" branch.
4. **The cumulant direction in §5 is a named direction, not a result.** I did not check
   whether κ4 has a connected-diagram expression in the A + Lin + Multi layers. The
   only evidence is that κ4 is *definitionally* the fourth cumulant and that cumulants
   are where such cancellations are analytic. Somebody should spend an hour on it
   before anybody spends a month on the T4 road.

**Not reached.**

5. **I did not run the instance engine, `c2`, or `joint` at @17.** All three are
   priced, none is measured. The `c2` and `joint` stages are cheap enough at @13 that a
   partial @17 probe (a prime subset) would convert three estimates into measurements
   for maybe an hour of compute. Worth doing before committing the month.
6. **The cross-level CAL4 comparison reaches only n ≤ 180**, because `BsemiDirect` is
   a C(n,4) march and @19 at n = 180 already costs 336.6 s. Three points per level is
   enough to say the level dependence is small and non-monotone; it is not enough to
   rule out a level term that only bites at large N, which is exactly the regime the
   √N fit extrapolates into. The fit's own residual (k creeping 1.918 → 2.134 over the
   last four points) says the form is approximate. **CAL4@17 ≈ 0.984 should be read as
   "somewhere in 0.95–0.99", and nothing in this report depends on which.**
7. **I did not verify cap-32's T3@17 = 5,693,984,348.13 or T4@17 = 4,616,850,623,332
   by any independent route.** Everything in §4 conditions on them. Given §4's finding
   that T3 and T4 contribute equally to dμ4, T3@17 deserves the same scrutiny T4 has
   had and has had none.
8. **`natal-cap-32-wrap-identity.js` I read but did not edit**, though the brief
   allowed it. The two defects in it (the ±2e2 and the single 3e-9) are the *home* of
   the corpus-wide repeats, so fixing the `.md` alone leaves the source of the error in
   place. That was a judgement call about diff surface on the file every published
   number descends from; the adjudicator may want the opposite.
9. **I did not audit partition W's other two files** (cap-35, cap-37) or re-check its
   `.md` disagreement list. Its coverage section flags the @41 single-witness problem
   and the untracked `~/Files/primeoire-runs/` directory; neither is mine and both
   still stand.
