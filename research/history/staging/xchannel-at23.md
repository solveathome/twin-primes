# The X-channel at @23: the fifth point of (X̄−X(0))/S̄

<!-- ledger
id: Q-xchannel-at23
status: PARTIAL
todo: X
question: What is the fifth point of the X-channel statistic, at @23, and does the monotone rise hold?
verdict: The fifth point is +0.2658 at @23, the rise holds at five levels and is larger than the four-point trend predicted, and the deficit has migrated into m >= 3, whose share of the X-gap runs 10.5, 23.5 and 81.1 per cent at @17, @19 and @23; the constant itself is not derived here.
-->

*(2026-08-19. TODO item X's named first move, carried out. Every figure below
comes from `research/natal-cap-35-x-multiplicity.js` as re-embedded today, or
from the two scratch instruments named in §2, which are not repo files.
Calibration is marked on every claim: MEASURED, DERIVED, INFERRED, REFUTED.)*

## Verdict

**The fifth point is `(X̄−X(0))/S̄ = +0.2658` at @23. The monotone rise holds at
five levels, and the rise is larger than the four-point trend predicted.**
The price was 18.9 s and 5.69 GB for the @23 level, 94.6 s for the whole file,
against a 4-hour ceiling: affordable by a factor of about 760.

Three things the run settles that four points could not:

1. **The deficit has migrated into m ≥ 3 and is now dominant there.** The
   m ≥ 3 share of the X-gap runs 10.5%, 23.5%, **81.1%** at @17, @19, @23. The
   file header's warning that the anchored deficit lives at m ≥ 3 was formed
   at @17, where the m = 2 cell was in fact carrying 89.5% of the gap. At @23
   the warning is true of the gap itself for the first time.
2. **The m ≥ 3 mechanism candidate is REFUTED as separate structure.** At the
   anchor, `ω_s(r)` and `ω_s(r+2)` are independent to 0.05% on X. There is no
   room left for "coincidences at multiples of products, dense at the origin"
   as a distinct effect: the one-sided cofactor law already carries 84% of the
   m ≥ 3 gap, and part4 gives that law in closed form.
3. **@23 is this instrument's last level, and the blocker is memory.** 25 bytes
   per slot × W. @29 would need 162 GB. A sixth point needs a rewrite, not a
   bigger budget.

---

## 1. Assignment

Extend `(X̄−X(0))/S̄` from four levels to five. TODO item X names the edit
(`for(const x of [11,13,17,19])`) and the discipline ("Price the run, not the
plumbing"). Standing state before the run:

| x | (X̄−X(0))/S̄ | X(0)/X̄ | S(0)/S̄ | β | S_CRT/S̄ |
|---|---|---|---|---|---|
| 11 | −0.2287 | 1.4541 | 1.1768 | 1.1458 | 1.0271 |
| 13 | +0.0134 | 0.9908 | 0.9875 | 1.0089 | 0.9788 |
| 17 | +0.1568 | 0.9482 | 0.8573 | 0.9549 | 0.8978 |
| 19 | +0.2225 | 0.9558 | 0.7795 | 0.9261 | 0.8416 |

Assumption A, in the channel it actually lives in: *the anchored overlap-credit
deficit stays below (1−ε)·S̄*, which is the first column staying below 1.

## 2. Instrument

`research/natal-cap-35-x-multiplicity.js`, one line changed:
`for(const x of [11,13,17,19,23])`. Tail re-embedded with
`node research/qc/embed.js research/natal-cap-35-x-multiplicity.js --streams
both --timeout 600`; `--check` reconfirms both hashes. The file's previous tail
was a real embed, not a legacy hand-paste: `qc.js embed-backlog` classed it
`readings-not-traceable` (advisory, 5 of 73 figures, all prose arithmetic), not
`hand-pasted-tail`.

Two scratch instruments, in the session scratchpad and deliberately not repo
files, since the task's edit budget is one line:

- `xchan-price-params.js` counts the work each leg does at each level, and
  `xchan-probe.js` times the two dominant kernels at @19 and @23 array sizes.
  Both are pricing tools; §3 is their output.
- `xchan-m3-closedform.js` runs the anchored-independence test of §7. It
  rebuilds the level from the same definitions rather than importing them, so
  its S(0) and X(0) are an independent recomputation, and they agree with the
  embedded block at all five levels.

**What the instrument computes at @23 and what it does not.** `part0`, the
full W-rotation custody sweep, is gated on cap-31 having published a reference
for the level, which it did only for x ∈ {11,13,17}. So @23, like @19, gets no
sweep: no per-rotation variances, **no σ_X**, every `z(anch)` NaN, no CUSTODY
line. `part5(·,3)`, the j = 3 coincidence census, is gated at x ≤ 17, so the
direct aligned-versus-mixed test of P1 is not extended either.

## 3. The price, derived before the run

The only superlinear leg is the custody sweep, O(W·N̄·H). At @23 that is
2.23e8 rotations × 5.30e6 slots and is dead by roughly fourteen orders. It does
not run, so the price is the u-form path, whose legs and their exact work
counts fall straight out of the code:

| leg | what it counts | @19 | @23 | ratio |
|---|---|---|---|---|
| `level` | O(W) sieve + comb build | 9.70e6 | 2.23e8 | 23.0 |
| `uform` | `W·H` strided increments | 1.73e7 | 4.58e8 | 26.4 |
| `part3` | O(W) + subsets with ∏Q < W | 261,332 | 6,385,817 | 24.4 |
| `part4` | `W·Σ(1/q)` + a sieve to W | 8.66e6 | 2.29e8 | 26.4 |
| `part5` j=2 | `4·W·Σ_{pairs}1/(q₁q₂)` | 1.53e7 | 4.66e8 | 30.6 |

W goes ×23, and every leg goes ×23 to ×31 because H = Σ2/q grows from 1.7857 to
2.0526 and the pair sum from 0.39343 to 0.52243 on top of W. K goes 435 → 1739,
which touches only the O(K²) legs, and those are milliseconds. DERIVED.

Measured @19 per leg on the timed scratch copy: `level` 0.03 s, `part0` 0.00,
`uform` 0.14, `part2` 0.01, `part3` 0.04, `part4` 0.32, `part5j2` 0.16, total
0.70 s. Work-scaled to @23 leg by leg: 0.69 + 3.70 + 0.98 + 8.45 + 4.90 =
**18.7 s**. MEASURED, then DERIVED.

Work-scaling is only honest if the memory hierarchy does not punish the larger
arrays, which grow from about 240 MB at @19 to 5.6 GB at @23. The probe timed
the two dominant kernels at both sizes: the u-form increment goes 3.9 → 5.9
ns (×1.5) and the part4 factor-extraction iteration goes 21.7 → 23.9 ns (×1.1).
Constant-stride access stays prefetcher-friendly, so the penalty is small.
Predicted window **19 to 28 s**, ceiling with a 3× safety factor 75 s. Peak
memory from the array inventory, 25 bytes per slot × W, **5.58 GB** on a 64 GB
machine. MEASURED.

**Verdict: affordable, by a factor of about 760 against the 4-hour ceiling.**

**Outturn.** @23 level time **18.878 s**, peak RSS **5.69 GB**, whole file
**94.6 s**. The derivation was out by 1%, the memory inventory by 2%. MEASURED.

This also grades reading 10 of the file's 2026-08-18 tail, which estimated
"tens of seconds, not hours" before the array was edited. CONFIRMED.

## 4. Pre-registration

**Honesty note first, because the campaign rule exists for this.** The headline
number printed on the pricing run before this file was written, so the bands
below are a stated criterion, not a blind forecast. What can be checked is that
the arithmetic producing them uses only the four points on record and cannot
have been steered by the answer; it is reproduced in full so a reader can
verify that.

From the four points, with lnW = 7.745, 10.310, 13.143, 16.088 and lnW(23) =
19.223:

- increments +0.2421, +0.1434, +0.0657; ratios 0.592, 0.458
- slope per unit lnW 0.09439, 0.05062, 0.02231; ratios 0.536, 0.441

Continuing the increment geometrically at the last ratio gives +0.0301 and a
fifth point of 0.2526; continuing the *ratios'* own decay gives +0.0233 and
0.2458. The slope route gives 0.2533 and 0.2478 the same two ways. So a
saturating four-point extrapolation lands in **0.246 to 0.253**.

| band | fifth point | reading |
|---|---|---|
| BROKEN | ≤ +0.2225 | the monotone rise ends |
| FLATTENING | +0.2225 to +0.2450 | increment below the geometric continuation |
| LEAD CONTINUES, ON TREND | +0.2450 to +0.2550 | the extrapolation's own window |
| LEAD CONTINUES, SATURATION NOT BITING | > +0.2550 | increment above the continuation |

The monotone lead predicts a fifth point above +0.2225. Anything at or below
that would be the first turn in the statistic since @11.

## 5. Readings

**R1 [MEASURED] The fifth point is +0.2658.** Band four: the lead continues and
saturation is not yet biting. The increment is +0.0433 against the predicted
+0.023 to +0.030.

Full row, from the embedded block:

| x | lnW | S(0) | S̄ | S_CRT | β | S_CRT/S̄ | S(0)/S̄ | X(0)/X̄ | (X̄−X(0))/S̄ | classical |
|---|---|---|---|---|---|---|---|---|---|---|
| 23 | 19.223 | 597,475 | 815,732.55 | 669,028.80 | 0.8930 | 0.8202 | 0.7324 | 0.9661 | **+0.2658** | 0.8884 |

with X(0) = 6,179,192, X̄ = 6,395,995.55, X_CRT = 6,249,291.79, N̄ = 5,301,450,
K = 1739 (29..14929), H = 2.0526, W = 223,092,870.

**R2 [MEASURED] The increment ratios are not monotone, so no saturating law
fits.** 0.592, 0.458, **0.659**. Per unit lnW the slope ratios read 0.536,
0.441, **0.619**. The four-point sequence invited a clean geometric decay and
the fifth point refuses it. "The lead continues" and "the lead is decaying to a
limit near 0.26" are different claims, and only the first survives.

**R3 [MEASURED] X(0)/X̄ rises for the second consecutive level.** 1.4541,
0.9908, 0.9482, 0.9558, **0.9661**. P5 predicted this flattening back toward 1
and now has two rises rather than one. The paper's §10 sentence about a
crossing followed by a turn has a second point of turn and can drop its
"one turning point on four points" hedge.

**R4 [MEASURED] The factorisation closes and the truncation factor keeps
falling.** S_CRT/S̄ = 1.0271, 0.9788, 0.8978, 0.8416, **0.8202**, monotone at
five points. β·(S_CRT/S̄) = 0.8930 × 0.8202 = 0.7324 = S(0)/S̄ exactly as
printed. The classical column reads 0.8884 against β = 0.8930, residual
+0.0046.

**R5 [MEASURED] The @23 β leg is a reproduction gate, and it passed.**
S(0) = 597,475, S_CRT = 669,028.80, β = 0.8930 match `paper/anchored-note.md`
§3's @23 row and `research/OBSERVATIONS.md`'s exact table (0.8930483 against
classical 0.8884421, residual 4.606e−3). So @23's survivor leg was already on
record and this run recomputes it by a different path. **What is new at @23 is
the rotation-ensemble side**, S̄ = 815,732.55 and X̄ = 6,395,995.55, which no
other instrument computes.

**R6 [MEASURED] σ_X is not computed at @23.** Nor is any z-score, nor a custody
line. Same gate as @19: `part0` runs only for x ∈ {11,13,17}. Reading 7 of the
file's tail now covers two levels. The 8-to-15-σ_X framing of the annihilation
requirement is still a @13-and-@17 measurement and has never been extended.

**R7 [MEASURED] The m-multiplicity decomposition, and the migration.**

X-gap anchored − ensemble = **−216,803.55** = m=2 cell **−40,916.72** + m≥3
cells **−175,886.83**. Per cell, (k−1)·[anchored − ensemble]:

| k | anchored | ensemble | ratio A/E | (k−1)·[A−E] |
|---|---|---|---|---|
| 2 | 1,369,538 | 1,410,454.72 | 0.971 | −40,916.72 |
| 3 | 817,704 | 1,063,505.93 | 0.769 | −491,603.86 |
| 4 | 678,479 | 575,779.43 | 1.178 | +308,098.70 |
| 5 | 152,659 | 223,074.25 | 0.684 | −281,660.99 |
| 6 | 90,320 | 45,135.78 | 2.001 | +225,921.08 |
| 7 | 12,301 | 2,159.12 | 5.697 | +60,851.26 |
| 8 | 393 | 25.32 | 15.52 | +2,573.79 |
| 9 | 2 | 0.03 | 66.7 | +15.79 |

The m ≥ 3 share of the gap runs **10.5% @17, 23.5% @19, 81.1% @23** (at @11 and
@13 the two channels have opposite signs and a share is meaningless). The k=3,
4, 5 ratios are stable across two levels, 0.789/1.185/0.698 at @19 against
0.769/1.178/0.684 at @23, while the tail excess grows without bound.

**R8 [MEASURED] P4's surviving half fails at @23.** At @17 the m ≥ 3 cells were
"large gaps that mostly cancel": −59.24 left of a −751.28 largest cell, 8%. At
@23 they leave −175,804 of a −491,604 largest cell, 36%. Cancellation is
weakening as the channel takes over.

## 6. The candidate mechanism at m ≥ 3, tested

TODO item X names the candidate: *anchored classes {0, −2} put multi-prime
coincidences at multiples of products, which are dense at the origin*. Read
literally that is a claim of **dependence between the two strike orientations
at the anchor**: a product q₁q₂q₃ that sits near the origin should show up in
both the r class and the r+2 class together, and the anchored spectrum should
then carry excess at large k beyond what its own two marginals allow.

The test is the anchored analogue of part3's convolution test, which the file
only ever runs on the ensemble. Build the anchored joint law over the natal set,
cnt(i, j) = #{r ∈ N : ω_s(r) = i, ω_s(r+2) = j}, take its marginals, and compare
the true anchored spectrum n_k(0) against the independent product of those
marginals.

| x | X(0) exact | X from independent marginals | rel err | m=2 residual | m≥3 residual |
|---|---|---|---|---|---|
| 11 | 28 | 27.09 | −3.254% | +7.29 | −6.38 |
| 13 | 452 | 453.31 | +0.290% | +26.90 | −28.21 |
| 17 | 10,381 | 10,390.29 | +0.089% | +277.90 | −287.19 |
| 19 | 236,625 | 236,515.60 | −0.046% | +2,461.98 | −2,352.58 |
| 23 | 6,179,192 | 6,182,284.06 | **+0.050%** | +25,287.24 | −28,379.29 |

**[REFUTED] The candidate is not there, at the resolution X can see.** At @23
the independent-marginal model reproduces X(0) to 0.050%, against the ensemble's
3.39% miss: a factor of 68 better. Of the −175,887 the m ≥ 3 channel loses
against the ensemble, only −28,379 survives against the anchor's own marginals,
so **84% of the m ≥ 3 gap is the one-sided cofactor law and not a coincidence
structure at the origin**. The two orientations at the anchor are, if anything,
*more* independent than the ensemble's are: on n_0 at @23 both models
over-count, the ensemble's by +0.81% and the anchor's by +0.52%.

**[MEASURED] What the closed form actually is.** Part4's one-sided law already
has one: #{r ∈ N : ω_s(r) = i} = p_nat·(Π_i + room_i), with ratios 0.999, 1.001,
1.000, 0.998 at i = 1..4 at @23 and p_nat = 0.14526. Convolving that law with
itself gives X(0), and hence (X̄−X(0))/S̄, without any m ≥ 3 coincidence input.
That is a composite closed form for the channel, and it is the cofactor
trichotomy read twice rather than new arithmetic at the origin.

**[INFERRED] Where the candidate could still be hiding.** X is a
first-moment-weighted statistic and it weights the bulk. In the extreme tail
the independent model is visibly worse than in the bulk: k = 7, 8, 9 read
0.938, 0.750, 1.340 against 0.98 to 1.02 at k = 2..5. Two of those cells hold
393 and 2 slots. If the origin-density mechanism exists, that is where to look,
and X will not find it.

## 7. What this does not show

- **Five points is still not a law.** The increment ratios are non-monotone
  (R2), so nothing here fits a limit, and Assumption A needs the statistic below
  1−ε at *every* level. Five values below 0.27 is a lead with one more point on
  it, and the value is still rising.
- **No σ_X, no z-scores, no custody sweep at @23** (R6). Anyone quoting @23 as a
  fifth point of cap-31's "pair statistics cannot see this" argument would be
  quoting a number that was never computed. That argument remains @17-only.
- **The @23 ensemble column is unverified against brute force.** The u-form is
  checked against the sweep at @11, @13 and @17 and rests on the identity
  holding below at @19 and @23. Its survivor leg is separately confirmed (R5);
  its X̄ and S̄ are not.
- **P1 is not tested at @23.** `part5(·,3)` is gated at x ≤ 17, so the anchored
  aligned-versus-mixed j = 3 census, which is the direct instrument for the
  origin-density claim, has no @23 row. §6 refutes the candidate through
  independence, which is a different and weaker cut than the census would be.
- **The refutation in §6 is about X, not about the spectrum.** Individual cells
  still miss the independent model by ±25,000 to ±29,000; what cancels is the
  total. A statistic weighting the cells differently would see structure X does
  not.
- **No sixth point from this instrument.** The per-slot array inventory is 25
  bytes (A 1, a and b 2 each, C 4, om 2, sp 8, isP and its sieve 2, piC 4). @23
  needs 5.58 GB and measures 5.69 GB. @29 has W = 6,469,693,230 and needs
  **162 GB**; its CPU cost would be about ten minutes. The wall is memory, and
  a segmented or streaming rewrite clears it.

## 8. Files touched

- `research/natal-cap-35-x-multiplicity.js`: levels array `[11,13,17,19]` →
  `[11,13,17,19,23]`; tail re-embedded via `research/qc/embed.js --streams both
  --timeout 600`; a dated READINGS ADDENDUM appended below the block (it sits
  after the OUTPUT banner, so the `code-sha256` binding is untouched, and
  `--check` confirms both hashes still match).
- `research/history/staging/xchannel-at23.md`: this file.

No live document was edited. TODO.md item X, `paper/anchored-note.md` §10 and
`research/moire-theorems.md` all carry four-point sequences that R1 to R4
supersede, and none of them were touched.
