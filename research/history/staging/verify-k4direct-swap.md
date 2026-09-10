# Verifying the k4direct swap end to end before anyone makes it

<!-- ledger
id: Q-k4direct-swap
status: ANSWERED
todo: none
question: Does swapping the shipped Monte Carlo estimator for k4direct meet the @13 gate, and is the x3600 on record a speedup?
verdict: The swap meets the gate by x3632, but the margin on record is an ACCURACY margin and not a speedup: k4direct is a 4x to 8x SLOWDOWN, 93.5 s against 11.7 to 23.4 s, and the 198.9 s on record for it is 2.1x too expensive, which drags the @17 extrapolation from 8.5 days on ten cores to about 4.4.
-->

**Headline.** **The swap was made and the @13 gate is met, by ×3632 — and the
×3600 on record is an ACCURACY margin, not a speedup.** Measured today, same
machine, same truth, everything else identical: the shipped Monte Carlo gives
REL −1.021692e-9 (misses by 2.2%), `k4direct` gives REL −2.753038e-13 (met, with
3632x to spare). The two routines compute the same quantity, proved by exhausting
the estimator's own sampling universe rather than by comparing two
approximations. The exact routine is **93.5 s against 11.7 to 23.4 s, i.e. a 4x
to 8x SLOWDOWN**, which is the opposite sign from "an improvement of x3600";
it costs stage [L] 75 extra seconds and buys 3600x in error. Separately, the
198.9 s on record for `k4direct` is 2.1x too expensive, which drags the @17
extrapolation from 8.5 days on ten cores down to about 4.4.

Work done 2026-08-18 on the 10-core machine, node v22.21.0. Target:
`research/natal-cap-34-wrap-precision.js`:434, the one call site the corpus has
been saying all day closes the @13 gate. Nothing was edited until sections 1, 2
and 3 below had all passed.

---

## 0. WHAT THE CORPUS ACTUALLY CLAIMS, AND THE ONE THING IT DOES NOT

The claim on record is in three places, all saying the same thing:

- `research/natal-cap-34-wrap-precision.js`:972 — "the substitution closes the
  @13 gate by a factor of 3600"
- `research/history/staging/phase1-W2-cal4-routing.md`:37 — "**MET (by ×3600)**"
- `research/history/CHANGELOG.md`:74 — "**the gate MET by ×3600**"

**The ×3600 is an ACCURACY margin, not a speedup, and nothing in the corpus ever
said it was a speedup.** It is `1e-9 / 2.753038e-13 = 3632`: the gate threshold
divided by the relative error the swapped assembly achieves. Read as a cost
figure it inverts the truth — measured below, the exact routine is **five times
slower** than the Monte Carlo it replaces. The swap buys 3600x in error and
spends about 5x in time, and 5x of 18 seconds is a price nobody needs to think
about.

That distinction is the only thing about the claim that was misread, and it was
misread outside the corpus rather than inside it.

---

## 1. WHAT THE TWO ROUTINES ARE

`natal-cap-32-wrap-identity.js`:194-203, `k4MC(L,S,nSamp,seed)` — draws `nSamp`
ordered 4-tuples of distinct slots uniformly (rejection loop on a mulberry32
stream), averages the six-fold product `s_ij s_il s_iu s_jl s_ju s_lu`, and
scales by `C4(N)`. Returns `{k4, err}` with `err` the plug-in standard error.

`natal-cap-32-wrap-identity.js`:280-285, `k4direct(L,S)` — walks `i<j<l<u`
directly, Kahan-compensated, with two early exits that skip a quadruple once a
partial product is exactly zero. Returns a bare number.

Both are aimed at the K4-complete term of `assembleA`: the one coefficient of the
ten K4 subgraph shapes that the O(N³) shape sums cannot reach.

**Why one is cheaper per unit of answer.** `k4MC` is O(nSamp) with nSamp chosen
by the user; `k4direct` is O(N⁴) with early exits, which at @13 is
C(990,4) = 3.978e+10 quadruples. The Monte Carlo is cheaper in wall clock and
pays for it in variance; the exact routine is dearer and has no variance at all.
There is no regime where `k4direct` is faster. The corpus never claimed there
was.

---

## 2. DO THEY COMPUTE THE SAME QUANTITY? YES — ESTABLISHED BY ENUMERATION

This is the check the project asked for first, because it was burned earlier
today by a routine described under one name while another was being annotated.
Agreement of two approximations proves nothing, so the estimand was **exhausted**
rather than sampled.

**2a. The MC's own sampling universe, enumerated.** For small N, every ordered
distinct 4-tuple was enumerated and averaged — that is exactly the population
`k4MC` samples from — and the result multiplied by `C4(N)`:

| N | `k4direct` | naive unordered sum, no Kahan, no early exit | MC estimand, exhausted |
|---|---|---|---|
| 10 | 5.0699531287142808e-6 | rel −3.34e-16 | rel +2.00e-15 (5,040 tuples) |
| 14 | 1.5741269279851076e-4 | rel +1.72e-16 | rel −4.65e-15 (24,024 tuples) |
| 20 | 9.4927578275150540e-4 | rel +2.28e-16 | rel −3.34e-14 (116,280 tuples) |

So the two routines target the same number **identically**, not approximately:
the estimator is exactly unbiased by construction, and the Kahan/early-exit
machinery in `k4direct` changes nothing a plain sum would give.

**2b. The call site's own semantics.** The swap only matters if `k4direct` fills
the slot the call site adds it into, `Abest = Ashapes + k4`. Checked against
`AdirectT4`, cap-32's independent exhaustive A:

| level | N | `k4direct` | `assembleA(N,sh,k4direct)` vs `AdirectT4` |
|---|---|---|---|
| @7 | 10 | 0.015407407407407385 | rel 0.000000e+0 |
| @11 | 90 | 42.242440686504921 | rel −4.907374e-15 |
| @13[120] | 120 | 6.5118080227963802 | rel +2.314305e-15 |
| @13[240] | 240 | 150.47606866446412 | rel +6.249430e-15 |
| @13[500] | 500 | 3504.9415339741836 | rel +5.599007e-15 |

**2c. And it settles which of the two exact k4 values is the good one.** The same
table computed `A_direct − A_shapes`, the differencing route cap-34 uses for its
`k4exact`. That route disagrees with `k4direct` by −4.85e-9 at N=120, −9.43e-9 at
N=240, −7.05e-9 at N=500, while `A_shapes + k4direct` reproduces `A_direct` to
5.6e-15. The differencing error is float cancellation (subtracting two numbers of
order 6.9e+10 to get 6e+4), and `k4direct` is the accurate one. This is
independent confirmation of what cap-34 reading 6(a) asserts on structural
grounds.

**2d. Sampling agreement, 40 draws.** 5 levels × {2e6, 2e7} samples × 4 seeds,
z = (mc − exact)/err:

    mean z = 0.0389,  sd(z) = 1.2207,  one |z| > 3 (−3.324 at @7, N=10)

**2e. The one 3-sigma draw is a small-N error-bar artifact, not a disagreement.**
Chased with many seeds:

| level | N | seeds | mean z | sd(z) | reading |
|---|---|---|---|---|---|
| @7 | 10 | 24 | −0.988 ± 0.498 | 2.438 | unbiased, but **error bars understated 2.4x** |
| @13[240] | 240 | 24 | −0.178 ± 0.198 | 0.972 | unbiased, error bars honest |
| @13[990] full | 990 | 12 | +0.412 ± 0.242 | 0.840 | unbiased, error bars honest |

At N=10 the rejection loop throws away 49.6% of draws and the population is 210
quadruples with a heavily skewed product, so the plug-in sigma underestimates.
At the call site's own level (N=990, rejection rate 0.6%) sd(z) = 0.84 and the
bars are honest. **The mean z is consistent with zero everywhere: no bias at any
level.** Nothing here is a difference of quantity.

**VERDICT ON 2: PASS.** Same quantity, proven by exhausting the estimator's own
universe, not by agreement.

---

## 3. THE COSTS, MEASURED

Single core, machine otherwise idle, `buildLevel(13)` + `sMatrix` (0.02 s) done
once and excluded. Full @13, N=990, K=34.

| routine | runs | measured |
|---|---|---|
| `k4direct(L,S)` | 3 | **94.21 / 93.98 / 93.49 s** |
| `k4MC(L,S,2e8,4242)` — the call site as shipped | 6 | **11.70 / 12.08 / 16.92 / 18.53 / 22.59 / 23.37 s** |
| `k4MC(L,S,2e7,777)` — the throughput figure on record | 1 | 2.37 s |

`k4direct` at full @13 returns **60234.496774278130**, reproducing the corpus
figure to all seventeen digits, on every run.

**Two corrections to the cost record, and they point opposite ways.**

**(a) `k4direct` is 2.1x CHEAPER than the corpus says.** The record is 198.9 s
(cap-34 reading 6(a), phase1-W2 §1, CHANGELOG). Measured today on an idle
machine: 93.5 s, three runs inside 0.8% of each other. The 198.9 s figure and its
252.7 / 319.9 s companions were all taken while the machine was shared. Given
this repo's history of cost estimates wrong in the cheap direction — fold-profile
by four orders, cap-34 itself by 4x, G2(41#) by 880x — a figure wrong in the
expensive direction is worth recording as such.

**(b) The swap is a 4x to 8x SLOWDOWN, median 5.1x.** `k4MC` at 2e8 varies a lot
(11.7 to 23.4 s; the variance is core migration on Apple Si, the answer is
bit-identical every time). Against `k4direct`'s stable 93.5 s that is a
**+75 s cost on one core**, on a stage that already runs 348 s. Immaterial, and
the opposite sign from "an improvement of x3600".

**Spot check on the @17 extrapolation, not part of the swap.** Reading 6(a)
prices `k4direct` at @17 as 8.5e+1 days on one core from an n^3.92 fit. Scaling
the measured 93.5 s by (14850/990)^3.92 = 4.08e+4 gives 44 days on one core; by a
pure N⁴ it gives 55 days. Both are under the 85 days on record, consistent with
(a). Not re-fitted here.

**VERDICT ON 3: the ×3600 is real and is an accuracy factor. There is no
speedup, and the corpus never claimed one. The cost is 75 extra seconds.**

---

## 4. WHAT THE GATE ACTUALLY IS, AND THE MEASURED MARGIN

**The threshold, precisely.** `natal-cap-34-wrap-precision.js`:446:

    Math.abs((Tbest - T4KNOWN) / T4KNOWN) <= 1e-9

with `T4KNOWN = 352253669.87624449`, cap-27's certified @13 value carried at a
1e-14 error budget. `Tbest` is `baseProd(L,4)` times
`A(shapes + k4) + C1(instance) + C2(factorised + V4) + C3(instance) + Multi(exact)`.
In absolute terms the gate allows |ΔT4| ≤ 0.352254.

**Where 1e-9 comes from, and what it is worth.** The file header: "The mu4
assembly cancels ~7 orders at @17, so the beyond-Chebyshev rung needs T4 to
~1e-9 relative." It is a round number from that one line of reasoning, and this
same file's reading 5(c) has since superseded it for @17 — the @17 requirement
is a ladder whose first useful rung is relT₄ ≤ 5.047439e-5, and reading 14
establishes that meeting the @13 gate certifies nothing about @17 because the
assembly that meets it borrows Multi from the C(990,4) march. **So the gate is
worth meeting as a validation of the engine, not as a step toward @17.** That
was already the file's position and the swap does not change it.

**Measured today, both sides, same machine, same truth JSON, everything else
identical:**

| k4 source | stage wall | T4 | REL vs certified | gate |
|---|---|---|---|---|
| `k4MC(L,S,2e8,4242)` as shipped | 265.9 s | 352253669.51634955 | −1.021692e-9 | **misses by 2.2%** |
| `k4direct(L,S)` | 341.3 s | 352253669.87614751 | **−2.753038e-13** | **MET** |

**Margin: 1e-9 / 2.753038e-13 = ×3632.** The corpus said ×3600. It reproduces.

The baseline row above is my own re-run of the unmodified file before I touched
it, and it is digit-for-digit identical to the block that was already pasted in
cap-34, so the comparison is like for like and the pasted block was not stale.

**VERDICT ON 4: PASS.** Threshold 1e-9, achieved −2.753038e-13, margin ×3632.

---

## 5. THE SWAP, MADE

All three checks passed, so the swap was made. One call site,
`natal-cap-34-wrap-precision.js`:436 in `STAGES.layers`:

    -  const k4mc=C32.k4MC(L,S,2e8,4242);
    -  const Abest=Ashapes+k4mc.k4;
    +  const k4best=C32.k4direct(L,S);   // EXACT K4 shape, Kahan over non-negative terms
    +  const Abest=Ashapes+k4best;

plus the two log lines that consumed `k4mc` (the label and the `k4mc.err`
report, which no longer exists — it now prints the exact k4 and its agreement
with `A_exact − A_shapes`). **The other three `k4MC` calls in the same stage were
deliberately left alone**: lines 392 and 417 measure the MC layer's own error for
the budget table, and line 424 reproduces cap-32's published instance pipeline.
Replacing those would have destroyed what they measure.

**The script's own self-checks, all re-run after the edit:**

| stage | result |
|---|---|
| `verify` (NC34_WORKERS=2) | **88,520 checks passed**, every digit identical |
| `exact13` (10 workers) | 4 checks passed, every digit identical, 1466.0 s |
| `c2` | 6 checks passed, every digit identical |
| `kurt`, `joint` | every digit identical |
| `layers` | 0 checks (the stage has no asserts); gate now MET |

Every number in every stage other than the [L] best-assembly block is
bit-identical before and after, which is the check that the substitution touched
one thing.

**The gate, all three commands:**

| command | before my edit | after |
|---|---|---|
| `node research/qc.js` (first 8 checks) | 3 findings, all in `research/PRIOR-ART.md` and `research/lemmaV-sup-extension.js` | 1 finding, `TODO.md:272` vs `research/U-FRAME.md:260` |
| `node research/qc/selftest.js` | 21 positives fire, 12 controls silent | **21 / 12, unchanged** |
| `node research/audit-numbers.js` | **108/108** | **108/108** |

**No finding names `natal-cap-34-wrap-precision.js` before or after.** The tree
moved under me while I worked — other partitions edited `TODO.md`, `U-FRAME.md`,
`PRIOR-ART.md`, `SEARCH-CONVENTIONS.md`, `qc.js` and eight more — which is why
the first-8 count moved in both directions on files I never opened. `git diff`
confirms my only tracked change is `research/natal-cap-34-wrap-precision.js`,
and every hunk of it is in the call site, the header gate note, the pasted
OUTPUT, or readings 6, 12 and 14.

**The pasted OUTPUT block is fresh.** All six stages were re-run and the pasted
blocks were diffed line by line against the six logs: identical. The PROVENANCE
note now carries the six wall times, records that only the [L] best-assembly
block moves, and says which printed figures are timing extrapolations that drift
by construction.

---

## 6. CORRECTIONS TO THE RECORD

Fixed in `natal-cap-34-wrap-precision.js` in this pass:

1. The header GATE STATUS and readings 6 and 12 said the best assembly **misses**
   the gate. It meets it. Rewritten in present tense.
2. Reading 6(a) priced `k4direct` at **198.9 s** on one core at @13. Measured
   93.5 s on an idle machine, three runs inside 0.8%. The 198.9 / 252.7 / 319.9 s
   figures on record were all taken on a shared box.
3. Reading 6(a) and reading 14 priced `k4direct` at @17 as **8.5e+1 days on one
   core, ~8.5 on ten**, scaled from the 198.9 s. Rescaled from the measured
   93.5 s by the same n^3.92 fit: 44 days on one core, ~4.4 on ten (a pure N⁴
   gives 55 and 5.5).
4. Reading 6(a) said `k4direct` was "validated at @7 in cap-32's `small` stage".
   cap-32's `small` is its DEFAULT MODE, not a stage, and its `main()` exercises
   `k4direct` at **@7 (N=10), @11 (N=90) and @13[120] with real @13 moduli**,
   asserting `assembleA == AdirectT4` at 1e-11 at each. The routine was better
   validated than the record said.

Owed elsewhere, and deliberately not touched because they are other partitions:

5. `research/gen-scripts-index.js`:229-231 says `k4direct` "had been written,
   validated at @7, and never run above it. It took **199 s** on one core and
   moved the assembly from missing the gate by 2% to meeting it by x3600." Two
   fixes: the cost is 93.5 s, and the validation reached @13[120]. The narrative
   is otherwise exactly right and is the reason the swap was findable at all.
6. `research/SCRIPTS.md`:305 (generated from the above) says `k4direct` "was
   exercised at @7 and @11 and never above". It reaches @13[120] in cap-32 and,
   as of this pass, the full @13 in cap-34.
7. `research/history/` carries the pre-swap framing in CHANGELOG.md:71-74,
   qc-CAMPAIGN.md:1626-1629, qc-wave6-W.md:190 and phase1-W2-cal4-routing.md.
   **Left alone on purpose**: history is the process record and is supposed to
   hold superseded claims.
8. A CHANGELOG.md entry is owed for the swap. Ready to paste:

   > **natal-cap-34-wrap-precision.js — the @13 gate, MET (2026-08-18).** Stage
   > [L]'s best assembly took the K4 shape from `k4MC(L,S,2e8,4242)`; it now
   > takes it from cap-32's exact `k4direct`. T4 goes from 352253669.51634955
   > (REL −1.021692e-9, missing the 1e-9 gate by 2%) to 352253669.87614751
   > (REL −2.753038e-13, met by ×3632). Equivalence of the two routines proved
   > by exhausting the MC's own sampling universe, not by agreement; costs
   > measured, not quoted (93.5 s against 11.7–23.4 s, so the swap is a 5x
   > slowdown buying 3600x in accuracy). Retired: "misses the 1e-9 gate by 2%",
   > "the residual obstruction is the single Monte-Carlo shape k4", `k4direct`
   > at 198.9 s and at 8.5 days on ten cores at @17, and "validated at @7 and
   > never run above".

Two operational notes, neither a defect in the mathematics:

9. **`c2` and `joint` degrade silently without `NC34_DIR`.** Run without it,
   `c2` throws at `loadTruth` after 2 s of useful work, and `joint` prints
   "(stage exact13 not run yet)" and drops its entire @13 comparison block while
   still exiting 0 and still printing "[0 checks passed]". The pasted command
   list showed `NC34_DIR` only on `exact13`. It now shows it on all three stages
   that need it.
10. **`k4MC`'s plug-in error bar is understated 2.4x at N = 10** (section 2e).
    Honest from N = 240 up. Anyone quoting `mc.err` at a small level should know
    that; at @13 and above it is sound.

---

## 7. WHAT THIS DOES NOT CHANGE

The @17 story, which is the only reason the @13 gate was ever wanted. The
assembly that now meets the gate still takes Multi EXACT from stage [E]'s
C(990,4) march, which at @17 is 2.026e+15 quadruples (513 days on ten cores) and
is structurally impossible in this code anyway (`pairMasks` asserts K ≤ 64; @17
has K = 120). Reading 14 said the @13 gate certifies nothing about @17 before the
swap and it still says it after. **What the swap buys is a validated engine at
@13, not a rung at @17.**

