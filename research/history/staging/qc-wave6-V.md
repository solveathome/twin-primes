# Partition V: the sixteen fold-profile scripts, run and documented

<!-- ledger
id: Q-qc-wave6-V
status: ANSWERED
todo: none
question: Do the sixteen fold-profile scripts carry auditable evidence, and what do they show when run?
verdict: All sixteen were run and now carry a real OUTPUT block and a numbered READINGS block, each verified by re-running and diffing; eighteen findings follow, the highest being a lemma quoted as proven that is false as written in two documents while three scripts in this partition print the counter-example.
-->

Wave 6, 2026-08-18. Owned surface: `research/fold-profile-01..16`, sixteen files,
2,933 lines before this pass. Wave 5's partition S2 established (finding S2-21)
that **not one of the sixteen carried a pasted OUTPUT block or a READINGS
block**, against the house format `research/SCRIPTS.md`:9 states, so a third of
this family could not be audited against the summaries citing it.

**All sixteen were run. All sixteen now carry a dated OUTPUT block containing
the real, complete run and a numbered READINGS block.** Nothing was
reconstructed, extrapolated or tidied: every output block was written to its
file by a script that copies the captured bytes, and every one was then verified
by re-running the file and diffing the fresh run against the pasted text.

**Custody verification at hand-back.** For each of the sixteen: `node --check`
passes, and a fresh run diffed against the block pasted in the file is
**identical apart from the elapsed-time line** — sixteen of sixteen. This is now
true of 15 and 16 only because their controls were seeded today (finding V-2).

`node research/qc.js` was NOT run; the gate belongs to the adjudicator. No `.md`
was edited. No commit, no push.

---

## The sixteen, with route and outcome

| # | script | route | wall | outcome |
|---|---|---|---|---|
| 01 | `fold-profile-01-per-copy.js` | **ran** | 2.46 s | OUTPUT + 7 readings. Custody G₂(new) = 30, 42, 66, 108, 150, 204, 258 holds. Header promises off-ladder folds the code never runs (V-8). |
| 02 | `fold-profile-02-deviation-law.js` | **ran** | 2.30 s | OUTPUT + 8 readings. The file asks whether max\|N\| is p-independent and measures the p-carrying quantity (V-6). |
| 03 | `fold-profile-03-inside-copy0.js` | **ran** | 0.55 s | OUTPUT + 7 readings, **plus a correction block**. Header's A6 parenthesis refuted by the file's own S4 table (**V-1**). |
| 04 | `fold-profile-04-count-vs-damage.js` | **ran** | 2.58 s | OUTPUT + 6 readings. §6 of FOLD-PROFILE reproduces exactly. Advertised section S4 does not exist (V-9). |
| 05 | `fold-profile-05-survival-curve.js` | **ran** | 2.14 s | OUTPUT + 7 readings. Custody holds at both ends. Non-monotone Buchstab factor unremarked (V-10). |
| 06 | `fold-profile-06-scale-free.js` | **ran** | 7.33 s | OUTPUT + 7 readings. Its concluding check is algebraically vacuous (**V-4**), and it is the home of the "0.8929" wave 5 called a slip (**V-3**). |
| 07 | `fold-profile-07-impact-window.js` | **ran** | 2.51 s | OUTPUT + 8 readings. Wave 5's T₃₁ repair holds. 268 graduations verified independently. |
| 08 | `fold-profile-08-zone-localized-gap.js` | **ran** | 0.30 s | OUTPUT + 7 readings. S4 prose refuted by its own table (V-1); S5 prose refuted by its own first row (V-11). |
| 09 | `fold-profile-09-natal-dispersion.js` | **ran** | **0.09 s** | OUTPUT + 8 readings. Wave 5 left this one unrun as "NEEDS COMPUTE, unpriced"; it is the fastest file in the family (**V-5**). |
| 10 | `fold-profile-10-lineage-census.js` | **ran** | 1.23 s | OUTPUT + 7 readings. Last row of S2 is a category error printed as agreement (V-12). |
| 11 | `fold-profile-11-lineage-yield.js` | **ran** | 0.68 s | OUTPUT + 7 readings. Closing constant is a small-y fit, 12% high in the limit (V-13). |
| 12 | `fold-profile-12-anatomy-survival.js` | **ran** | 2.28 s | OUTPUT + 8 readings. Custody ties three files to the unit (V-14). Wave 5's S2-7 confirmed **CLOSED** in the doc layer. |
| 13 | `fold-profile-13-hotspot-sweep.js` | **ran** | 2.63 s | OUTPUT + 7 readings. Wave 5's open loose end S2-22 **settled by simulation** (**V-7**). |
| 14 | `fold-profile-14-underdispersion.js` | **ran** | 2.43 s | OUTPUT + 8 readings. Wave 5's seeding repair reproduces exactly. Control drifts where the effect is largest (V-15). |
| 15 | `fold-profile-15-variance-law.js` | **ran ×4** | 2.87 s | **Seeded (V-2)**, re-run, OUTPUT + 9 readings. Header's control claim refuted by its own column; subtracting the control flips two of three fits (**V-16**). |
| 16 | `fold-profile-16-is-it-the-tile.js` | **ran ×4** | 2.20 s | **Seeded (V-2)**, re-run, OUTPUT + 9 readings. S3 quotes two control values its own output contradicts (V-17). |

**Ran 16, recorded-as-unrunnable 0.** Sum of the sixteen first-pass wall times:
**34.6 s**. With the pre-seed pass, the two determinism re-runs, the two full
verification passes and the Monte Carlo of V-7, total compute for this partition
is about **4 minutes**. Not one file in this family needed a heap flag, despite
seven of them carrying `--max-old-space-size` in their Run: line.

---

## Findings

### V-1 (HIGH, script side and cross-file, PARTLY FIXED). A lemma quoted as proven is false as written, in two files, and three files in this partition print the counter-example

`research/fold-profile-03-inside-copy0.js`:8 reads, in full:

> `// quiet (A6: inside [0, p^2) copy 0 deletes at most the single slot p).`

`research/a3-06-origin-vs-max.js`:596-598 carries the same claim as a **displayed
block quote**:

> `//       > Any argument for the strong Zone Postulate that uses only the fold`
> `//       > structure at the origin is vacuous, because the fold acts on the`
> `//       > head by deleting at most the single slot p.`

Three scripts in this partition print the refutation:

- `fold-profile-03` S4: `T23 | 29 | kills in [0,p^2) = 2 | which = 29,839`
- `fold-profile-07` S1: the T₁₁ fold-29 row lists `29(t=1) 839(t=29)`
- `fold-profile-08` S4: `T23 | 29 | 2` kills in `[0,p²)`, and `T17 | 19 | 1`
  where neither 19 nor 17 is a slot of T₁₇, so the one kill is 359 = 19²−2

Verified exhaustively by direct enumeration below p² over the eleven ladder folds
(x,p) = (5,7) … (41,43): the kill sets are `[47] [11] [167] [17] [359] [] [29,839]
[] [1367] [41] [1847]`. In **six of eleven** the single kill is p²−2 and p is not
a slot at all; in one there are two. So "the single slot p" names the wrong slot
more often than the right one.

**The corpus already has the correct statement.** `research/FOLD-PROFILE.md`:144-150
is the **Head Lemma (PROVEN, VERIFIED at four folds)**: "copy 0's kills below p²
are contained in **{p, p²−2}**", with a four-line proof. A6's *conclusion* — the
head loses O(1) slots, so an origin-only argument for the strong Zone Postulate
is vacuous — is untouched.

Fixed in `fold-profile-03` with a dated CORRECTION block that leaves the original
wording standing and points at the Head Lemma. **`a3-06-origin-vs-max.js` is not
this partition's file and needs the same pointer.** `fold-profile-08`'s S4 gloss
("nothing below p^2 except the graduations {p-2, p}") is inside a `console.log`
and was deliberately not edited, because editing printed text would falsify the
output block pasted above it; it is logged in that file's READINGS 1.

Severity HIGH (a lemma quoted as proven, in a block quote, is false as stated).
Confidence: certain, exhaustively verified.

### V-2 (HIGH, script side, FIXED). Two more unseeded controls, the same defect wave 5 fixed next door

`fold-profile-15-variance-law.js`:100 (pre-fix) drew its synthetic twin set from
`Math.random()`. `fold-profile-16-is-it-the-tile.js`:69-70 (pre-fix) drew its
Poisson control from two bare `Math.random()` calls. Wave 5 found and fixed
exactly this in `fold-profile-14` (S2-12) and both siblings were missed.

The consequence is direct and it is why this partition could not simply paste and
walk away: **the SYNTH and control columns of 15 and 16 were a different number
on every run, so pasting them would have created a custody record that does not
reproduce.** Both are now seeded with 14's generator and 14's seed (mulberry32,
20260817), with a dated SEEDED note giving the before-and-after line. Two
consecutive runs of each are byte-identical apart from the elapsed timer, and
the measured columns are unchanged from the pre-seed run to four decimals — 15's
REAL Fano values and 16's A / B / B(1−p) columns did not move.

Severity HIGH for custody. Confidence: certain.

### V-3 (MEDIUM, corrects wave 5). "0.8929" is not a slip; it is fold-profile-06's number

Wave 5's S2-19 recorded `FOLD-PROFILE.md`:393 — "(e^{2γ}/4)·(S/HL) = 0.8912
against **0.8929**" — as a digit slip, reasoning that "`fold-profile-06` gives
0.8927 at exactly u = 2.000, a different sampling point, so **neither figure is
0.8929**".

`fold-profile-06`'s pasted run contains, in its closing block:

> `     23#: S(sqrt W) =   895,790,  S/P = 0.8929,  S/HL = 1.1238,  (e^{2g}/4)*(S/HL) = 0.8912`

So 0.8929 has a real home. The quantity has **three published values at three
sampling conventions**: 0.8926 (fold-profile-05, at y = 14,929, the last prime
below the root), 0.8927 (fold-profile-06's u = 2.000 table row), 0.8929
(fold-profile-06's y = sqrt(W) summary). `FOLD-PROFILE.md`:385 quotes the first
in a table and :393 quotes the third in prose eight lines later, **naming neither
script and neither convention**. The defect is a missing citation, not a wrong
digit. Recorded in both 05 and 06's READINGS so the next sweep does not re-open it.

Severity MEDIUM. Confidence: certain.

### V-4 (MEDIUM, script side, EVIDENCE). fold-profile-06's concluding check contains no information about its own subject

The file closes by comparing measured `S/P` (0.9241, 0.8929, 0.8881) against
`(e^{2g}/4)*(S/HL)` (0.9195, 0.8912, 0.8867), and reads the 0.2-0.5% agreement as
support for the claim that the u = 2 spread across windows is a finite-size
Hardy-Littlewood effect. **S cancels:**

    (S/P) / [(e^{2g}/4)(S/HL)]  =  4·HL / (P · e^{2gamma})

which is the twin-Mertens theorem `prod_{3<=q<=y}(1-2/q) ~ 4·C2·e^{-2gamma}/ln²y`
evaluated at y = sqrt(W), against the Hardy-Littlewood constant. It is a true and
useful check of the product law and it says nothing whatever about survival. The
scale-free conclusion is still probably right — the spread does shrink with W
(0.0353 across windows spanning 9.7e6 to 5e8) — but it rests on three points,
not on the printed check. Logged, not fixed: the fix is a different statistic.

Severity MEDIUM. Confidence: certain on the algebra, confirmed numerically
(the ratio is 1.0050, 1.0019, 1.0016, converging to 1 with W).

### V-5 (MEDIUM, corrects wave 5, method lesson). The one unpriced script was the cheapest in the family

Wave 5's "What was not reached" item 1 reads: "`fold-profile-09-natal-dispersion.js`
**was not re-run**. It trial-divides past 4.9e11 with a 700,000-prime table over
the natal cohorts on the ladder to p = 31, and I could not price it from the
source without running it. … **NEEDS COMPUTE, unpriced.**"

Measured: **0.09 s**, the fastest of the sixteen. The cohorts are p−3 members
wide (28 at the largest row) and trial division stops at sqrt(2e11) = 4.5e5, so
S1 is a few thousand divisions. The estimate was off by four orders of magnitude.

The lesson for the campaign method: **pricing from source is unreliable in the
expensive direction as well as the cheap one, and a 30-second probe beats any
reading of the code.** The header's own `--max-old-space-size=8000` invited the
overestimate; the script allocates one 700 KB sieve.

Severity MEDIUM (as a method finding). Confidence: certain.

### V-6 (MEDIUM, script side, EVIDENCE). fold-profile-02 asks the right question of the wrong quantity

S2 is headed "IS max|N| INDEPENDENT OF p?" and the table answers no: at T₂₃,
max|N| runs 430 to 8,706 over the p-sweep with 70 distinct values. But
N(a) = p·h(a) − D carries a factor of p by construction. Dividing the pasted T₂₃
grid through by p gives **16.9, 22.2, 20.4, 10.5, 20.3, 22.8, 19.0, 12.6, 13.5,
18.4, 19.4, 18.4, 20.0, 22.6, 20.1** across p = 29…401 — flat over a 14× range in
p. T₁₇ likewise (3.6 … 7.5). So the invariant is max_a |h(a) − D/p|, and that IS
p-independent at a fixed tile. That column is not in the output.

Related: the per-tile summary prints `2^pi(x)` and `3^pi(x)` side by side but
only one ratio (to 2^π). max|N| **exceeds the 3^π(x) column** at T₁₃ (1,445 vs
729) and T₁₇ (3,027 vs 2,187). Nothing is violated — the elementary Möbius
majorant is on h(a) − D/p, i.e. |N| ≤ 2p·3^{π(x)−1} — but the header advertises
S3 as testing "the elementary Mobius majorant" and prints a bare 3^π(x) with no
p in it. A reader comparing adjacent columns concludes the bound fails.

Severity MEDIUM. Confidence: certain (arithmetic on the pasted table).

### V-7 (MEDIUM, script side, CLOSED by simulation). fold-profile-13's surviving positive excess is nothing, and the threshold is the reason

Wave 5's S2-22 logged this as an open loose end: 13's summary ends
`T23 | 8 | 199690 | 0.96 | 4.90 | 4.75 | *** ABOVE ***` followed by "A positive
excess survived. **Investigate.**" and no document records whether anyone did.

Investigated here. Null model: twin primes placed **independently** at rate
p = 0.112681 in each slot, windows of s = 318 slots (8 bins × 1,116 positions at
the measured slot density), pushed through the file's own flank estimator and its
own sd formula, sampled exactly. Over 60 replicates:

| effective window count | max-z p10 | median | p90 | fraction of replicates with max-z ≥ 4.90 |
|---|---|---|---|---|
| 25,000 (= n / width, the correlated-field count) | 4.28 | **4.70** | 5.30 | **33%** |
| 199,690 (as the file counts them) | 5.01 | **5.38** | 5.95 | **95%** |

A maximum of 4.90 is the **typical** outcome of this sweep under pure
independence. The excess is retired.

**The mechanism is skew, not miscounting.** `thr = zsd * Math.sqrt(2*Math.log(n))`
is the expected maximum of n standard *normals*, rescaled by the measured
dispersion. Measured on the null, the statistic has sd **1.007** — the rescaling
is right — but skewness **+0.312**, because at width 8 a window holds about 36
twin primes and a binomial count that small has a heavy right tail. The threshold
is therefore too low at the smallest width, which is the only width where a
positive ever appeared. At widths 80, 800 and 8000 the counts are 10× to 10,000×
larger and the threshold is sound.

Severity MEDIUM. Confidence: high (a simulation of the file's own estimator, 60
replicates; the independence null is an idealisation and the real slot spacing is
not exchangeable, but the conclusion has a factor of ~30 of margin).

### V-8 (LOW, script side, EVIDENCE). fold-profile-01 promises off-ladder folds and has none

Header line 19: "WHAT THIS SCRIPT MEASURES, for every fold on the ladder **and
off it**". Line 151: `const LADDER = DEEP ? [7,11,13,17,19,23,29,31] : [7,11,13,17,19,23,29];`
Both branches are the prime ladder; DEEP adds 31, the next rung. There is no
off-ladder fold in either mode. Logged rather than fixed, because the phrase may
mean the composite-modulus case and the intent cannot be read off the code.

Also in 01: S1's title claim "Total is always exactly 2D" is enforced by
`if (T.D !== D * (p - 2)) throw new Error('census law broken')` at line 217 and
is never displayed — the table prints mean, K(0), min and max, from which the sum
cannot be recovered. And the custody line "(custody: G2(new) column must read 30,
42, 66, …)" is an **instruction to the reader**, not a check: nothing compares
the column to the expected septet.

### V-9 (LOW, script side, EVIDENCE). fold-profile-04 advertises a section that does not exist

Header line 20: "`S4  the same for maxsum-style near-records: top-3 damage
anchors`". There is no top-3 code in the file and no such block in the output.
S1, S2 and S3 exist but are unlabelled — the run prints one table and one
AGGREGATE block — so output cannot be matched to the advertised sections.

Also in 04, and more interesting: the file prints "cells with |corr| > 2/sqrt(p):
**11 of 48**". 2/sqrt(p) is the two-sigma width for a Pearson r over p points, so
a pure null gives about 2.2 of 48. Eleven is five times that. The honest reading
is not "no relationship" but "a relationship of random sign, cell by cell, that
averages to nothing" — which kills the proxy just as dead and is a different
statement. Caveat: the p anchors within a cell are not independent draws, so the
sampling width of r may exceed 1/sqrt(p−1); nothing in the file estimates it.

### V-10 (LOW, script side, EVIDENCE). The pair-Buchstab factor is non-monotone in 05 and 06 and neither says so

`S/P` in the 23# window: flat at 1.0000 to y = 89, dips to 0.9992 at 151, **rises**
to a peak 1.0138 at y = 701, falls to a **minimum of 0.8604 at y = 10,007**, then
**rises again** to 0.8926 at u = 2. Two turning points, a 1.4% overshoot and a 14%
undershoot. The same shape appears in all three of fold-profile-06's windows,
including the structureless [0, 5e8), so it is a property of the two-dimensional
sieve and not of primorial windows. Consequence worth flagging: **the value at
u = 2 is not the minimum of the curve**, so quoting 0.8926 as "the depth of the
deficit" understates it by 3.7%.

Two cosmetic notes in 05: the 3^π(y) column overflows to `Infinity` for the last
eleven rows (π(5003) = 669, 3^669 ~ 1e319) — harmless, every such row is already
DEAD; and the sieve ends at y = 14,947, the first prime **above** sqrt(W), so
u = 1.9999 rather than exactly 2.

### V-11 (LOW, script side, EVIDENCE). fold-profile-08's S5 prose is refuted by its own first row

S5 says the natal cohort's lowest member sits "astronomically above the zone" and
concludes "the creation ledger (Natal@X) and the zone-localized target are
disjoint". The table's first row is `7 | 49 | 29 | 5.92e-1` — at p = 7 the lowest
natal position (29) is **below** the zone top (49), and at p = 11 the ratio is
1.73. Disjointness begins at p = 13. The monotone-attrition argument above the
table is correct and does not depend on the ratio, so only the adverb is wrong.

Also in 08: S3's projection says "using M ~ c·ln Y with c = G2/theta(x) measured
above" and then writes "G2 ~ c·theta(x) ~ 0.6·x²", which requires c ~ 0.6x, i.e.
c growing. The measured slopes (10.17, 12.09, 12.16 at x = 17, 19, 23) track the
mean twin-slot gap instead: c/(W/D) = 0.444, 0.472, 0.433, flat to 5%. The file's
law is `maxgap-law.js`'s M ~ 0.44·m̄·ln Y with m̄ absorbed into c, and the
absorption is what makes "c" look constant while being used as if it grows. And
S5 is not in the header's section list at all.

### V-12 (LOW, script side, EVIDENCE). fold-profile-10's last S2 row is a category error printed as 3.8% agreement

`birth level 29 | 1 slot | measured 1.2575e-7 | predicted 1.2109e-7 | ratio 1.038462`.
T₂₃ has no level-29 cohort. That slot is the **eternal edge** r = W−1, which is
−1 modulo every primorial and has no finite birth level; S1's own footnote names
it. The 3.8% "agreement" is exactly D_29 = 27·D_23 against cohort 26, i.e.
27/26 = 1.038462, and would print the same at any level. Nothing is measured.
`FOLD-PROFILE.md`:318-320 handles this correctly by not printing the row and
naming the residue as the eternal-edge lineage — the .md is the more careful
artifact here, which is the opposite of the usual direction, and the same is true
of the 440,311 / 440,312 twin count (`FOLD-PROFILE.md`:320-321 explains that the
440,312nd pair is (3,5), below the comb; the script prints the bare 440,311).

### V-13 (LOW, script side, EVIDENCE). fold-profile-11's closing constant is a small-y fit, 12% high in the limit

The file closes "a later-born lineage is individually BETTER by the factor
m̄(y) ~ **2.7 ln² y**". Measured m̄(y)/ln²y (scratch computation): 2.8536 at
y = 23, then 2.5014, 2.4195, 2.4086, 2.4041, 2.4028 at y = 101, 1009, 10007, 1e5,
1e6. The limit is `e^{2gamma}/(2·C_2) = 2.4026`, reached to four places. 2.7 is
the value near y = 23-50. The qualitative conclusion (m̄ grows like ln²y, y#
grows like e^y, rarity wins overwhelmingly) is untouched.

Also in 11: S1's level-23 row shows 8.965 opportunities and 0 survivors, so S2
prints yield ratio 0.0000. The expected count is 0.98 and zero is the single most
likely Poisson outcome; the row reads as the law collapsing and is an empty draw.
And S3's "match: EXACT" at all seven rows is the identity
((y−3)/y#)·(y#/D_y) = (y−3)/D_y — nothing could disagree.

### V-14 (positive, custody). Three files close to the unit on the twin count of T₂₃

- `fold-profile-12` reports **896,062** twin primes below W = 23#.
- `fold-profile-05` ends its sieve with **895,790** survivors: the pairs with both
  members above sqrt(W) = 14,936.
- `fold-profile-07` counts **268** t = 1 graduations: the pairs (p, p+2) with
  29 ≤ p ≤ 14,947. Counted independently by scratch sieve: there are 272 twin
  pairs with p ≤ 14,947 and exactly **268** with p ≥ 29.
- The four remaining pairs below the mod-6 comb are (3,5), (5,7), (11,13), (17,19).

**895,790 + 268 + 4 = 896,062.** Three independent code paths, exact.

Similarly `fold-profile-03`'s copy-0 totals (32,930 and 548,411 with deviations
+1.74 and −14.86) reproduce `fold-profile-01`'s K(0) column and its K(0)−mean
column, and `fold-profile-07`'s first fold removes the same 548,411.

### V-15 (LOW, script side, EVIDENCE). fold-profile-14's control drifts where its effect is largest

S2's SYNTH chi²/dof reads 1.0206, 1.0123, 1.0473, 1.0797, 1.1287, **1.3194**,
0.9483 as the width grows. Against the chi-square null those are +2.3, +1.0,
+2.4, +2.0, +2.0, **+2.5**, −0.3 sd (sd = sqrt(2/dof), dof 24,988 down to 49).
Six of seven are high and the drift grows with width, so the control is mildly
over-dispersed exactly where the real deficit is deepest, and the printed
`real/synth` column divides by it. The **real** column alone (0.9093 → 0.4702) is
the trustworthy series; `real/synth` at widths 800 and 2000 (0.4488, 0.4959)
should not be quoted.

Also: S1's three rows are not equally strong. The five synthetic replicates have
sem 0.0015, 0.0035, 0.0248, so the real value sits 30.9, 20.9 and **5.0** of those
below the synthetic mean. The 800-bin row carries the largest effect and is a
5-sigma statement resting on a standard error from five draws.

Trivial: wave 5's own report says the seeded control's replicates "run 0.886 to
**1.030**". The seeded run gives 0.886 to **1.020**, which is what wave 5 actually
wrote into 15 and 16's correction blocks. The report prose, not the files, has
the typo.

### V-16 (MEDIUM, script side, EVIDENCE). fold-profile-15's fits ignore its own control, and using it flips two of three

Header: "the statistic is trend-free by construction and is its own control.
**Synthetic replicates confirm the null lands at 1.**" In the seeded run the
SYNTH Fano column lands at 0.9483, **0.5169**, 0.9733 (T₁₇), 0.9842, 0.9892,
1.0145, 0.9688, **0.6260**, **0.7405** (T₁₉) and 0.9998 … 0.8479 (T₂₃). It lands
at 1 where the pair count is large and nowhere else: at T₁₇ with 48 pairs the
*control* reports a 48% deficit; at T₁₉ with 61 pairs, 37%.

Every fitted slope is unweighted OLS on the REAL column alone. Subtracting the
control row by row:

| tile | real − synth deficits | slope | R² | printed slope |
|---|---|---|---|---|
| T₁₇ | 0.0008, −0.3043, 0.4167 | 0.228 | 0.32 | 0.21750, R² 0.9546 |
| T₁₉ | 0.1089, 0.1171, 0.1367, 0.1371, −0.0223, −0.1277 | **−0.050** | 0.63 | +0.02305, R² 0.1925 |
| T₂₃ | 0.0457, 0.0631, 0.0818, 0.1684, 0.1551, 0.1747, 0.1790, 0.1977 | 0.0247 | 0.87 | 0.03805, R² 0.7951 |

T₁₉'s corrected slope changes **sign**; T₁₇'s corrected series is not a line
(R² 0.32 against a printed 0.9546). Only T₂₃ survives with its shape intact. Its
clean rows (52,984 down to 3,532 pairs, control within 2% of 1) give slope 0.0373
uncorrected and 0.0430 corrected against a predicted 1/ln W = 0.0520, i.e. 0.72
and 0.83 of the prediction. **Right shape, constant low by 20-30%, one tile.**
That is the honest state of the Montgomery-Soundararajan identification from this
file, against a printed measured/predicted of 2.859 / 0.371 / 0.731.

S3 (which exists only because of wave 5's S2-9 repair) is a clean negative the
file prints no verdict for: T₁₇/T₂₃ measures 1.145, 2.694, 4.747 against a flat
prediction of 1.463, and the deficit is not even monotone in W at fixed h
(0.0525, 0.1247, 0.0459 at h = 2,000, the **middle** tile largest).

### V-17 (MEDIUM, script side, EVIDENCE). fold-profile-16's verdict quotes two control values its own output contradicts

S3 prints: "at h = 10,000 the Fano is 0.9006 against a Poisson control at
**1.003**; at h = 30,000 it is 0.8954 against a control at **0.9906**". The Fano
values are computed live and are right. The two control values are **string
literals in the source**, frozen from an unseeded run. S1's control column in the
same output reads **0.9985** and **0.9952**. Now that the generator is seeded
(V-2) the literals are permanently wrong. Not edited, because they sit inside a
`console.log` and changing them would falsify the pasted output block. The
correct sentence makes the deficit slightly **larger**, not smaller.

Also in 16: S2's title claims the deficit "should depend on the HEIGHT, not the
tile" and its A column falls 1.2562, 1.0393, 0.9217, 0.9006 as ln X rises. But
the four bands span multiplicative ranges of 10×, 5×, 2× and 2.23×, and the file's
own CAUTION paragraph says within-band density trend is what inflates Fano. The A
column tracks band **width** at least as well as height, and the h = 100,000 row
makes it plain (5.5455, 2.3175, 0.9608, 1.0407). Nothing in S2 separates the two,
and it prints no verdict. Against that, 16's S1 is the best-calibrated section in
the family: it states A = B/(1−p) as an **identity** rather than dressing it as
agreement, and it flags its own 3.38 as a trend artifact.

### V-18 (structural, EVIDENCE, doc layer). FOLD-PROFILE.md's reproduction index still stops at 11

`research/FOLD-PROFILE.md`:692-726, "## 10. Reproduction", lists
`fold-profile-01` through `-11` and closes "**All eleven run in seconds.**"
Verified true: all eleven ran in 0.09 s to 7.33 s. **Scripts 12 through 16 are
absent from the index and 13, 14, 15 and 16 have no prose home anywhere in the
body layer** — wave 5's S2-19 and S2-20, still open. Those four carry a real
negative result (the twin-prime variance deficit in these tiles is the classical
short-interval variance and **not** a tile phenomenon) that exists only inside
unlinked scripts and one session file.

Two small ones in the same document, both LOW:

- `FOLD-PROFILE.md`:200 says the running ledger reads "…1.002, 0.993 at
  Y = p², 2p², … 512p², and **1.0000 from Y = 10³p² to the end of the copy**".
  Verified: the ten quoted values match `fold-profile-03`'s output exactly
  (0.9667, 1.3182, 1.2500, 1.2033, 1.1108, 1.0389, 0.9878, 0.9823, 1.0021,
  0.9927 rounding to 0.97 … 0.993). But the next row after 10³p² is 0.9989, not
  1.0000.
- `FOLD-PROFILE.md`:393's "against 0.8929" is V-3.

Everything else in §§5, 6, 8, 9, 9a, 11, 11a and 12 that I could check against a
live run reproduces exactly, including the §8 lineage tables, the §9 survival
ladder, the §11 fold budget and cofactor split, and the §12 margin table.

---

## COVERAGE: what I ran but only partly trust, and what I did not reach

### Files I ran but only partly trust, and why

1. **`fold-profile-15`, the whole of S1 and S2.** Its estimator visibly fails
   below about 150 window pairs, and eleven of its twenty-one rows are under that.
   I trust T₂₃'s first four rows and nothing else in the file. The fits are
   unweighted OLS over 3, 6 and 8 points with errors ranging over a factor of 50,
   and I did not refit them properly (weighted, control-subtracted, with a
   bootstrap) — I only did the unweighted control-subtracted version in V-16.
   **A weighted refit is the single most valuable follow-up in this partition.**
2. **`fold-profile-16` S2.** Confounded (V-17) and I did not disentangle it. The
   right experiment is bands of EQUAL multiplicative width at different heights,
   which is a code change, not a re-run.
3. **`fold-profile-08` S3's projection.** I reconstructed the implicit c ~ 0.6x
   and offered c ≈ 0.44·m̄ as the better reading, from three tiles. Three points
   is not a law and I did not extend the tile ladder to test it.
4. **`fold-profile-04`'s exceedance count** (11 of 48 against ~2.2 expected). I
   flagged it as evidence of sign-random per-cell structure but did NOT estimate
   the true sampling width of r under the dependence in each cell. If that width
   is 1.5× the naive one the excess mostly evaporates. **Unresolved, and it is
   the one place in this partition where I state a five-fold excess without
   having measured its null.**
5. **`fold-profile-13`'s V-7 simulation.** The null is independent placement at a
   constant rate in a constant number of slots. Real windows vary in slot count
   and the slot pattern is not exchangeable. The margin is large (median null
   max-z 4.70 against an observed 4.90) so I am confident in the conclusion, but
   the honest test would re-run 13's actual sweep on a synthetic tile.
6. **Every "no error bar" note.** I attached sampling sds where I could compute
   them from printed counts. In several places (03's S3 shift test, 08's slope
   fits, 12's S5 dyadic scan) the script prints no counts per bin, so I could
   only say the test cannot be scored, not score it.

### Numbers in the .md layer I noticed and did not chase

- **`research/a3-06-origin-vs-max.js`:596-598** carries V-1's false lemma as a
  displayed block quote. Not my file. I did not check whether A6's *numeric*
  results depend on it (I believe not — the conclusion is a vacuity claim), and I
  did not grep the rest of the corpus for other restatements beyond the two hits
  for "single slot p".
- **`FOLD-PROFILE.md` §10** (V-18) needs five entries added and "All eleven" made
  "All sixteen". I have the runtimes for all sixteen and they are in the table at
  the top of this report.
- **`FOLD-PROFILE.md`:393** (V-3) needs the two sampling conventions named.
- **`FOLD-PROFILE.md`:200** (V-18) "1.0000 from Y = 10³p²" against a measured
  0.9989 one row later.
- **`FOLD-PROFILE.md` §5's Head Lemma is right and §12, §11, §9, §8 all check
  out.** I did NOT audit §§1-4, 6, 7, 9b, 11a or 13 against live runs, only the
  sections whose numbers my sixteen scripts produce.
- **`research/SCRIPTS.md`** is generated and reports "Scripts: **128**" while
  wave 5 opened 131. I did not run `gen-scripts-index.js` (not my file), and my
  edits should not change any extracted title, but that is an assumption I did
  not verify.

### What I would run next, in priority order

1. **A weighted, control-subtracted refit of `fold-profile-15`**, with bootstrap
   errors on each Fano point and the h-grid extended downward at T₁₇ and T₁₉
   where pair counts are adequate. The Montgomery-Soundararajan identification
   currently rests on four rows of one tile.
2. **Re-run `fold-profile-13`'s actual sweep against a synthetic tile** rather
   than my analytic null, and replace `sqrt(2 ln n)` with an empirical threshold
   from that synthetic. This would make the sweep self-calibrating and would have
   caught the 4.90 without anyone investigating.
3. **`fold-profile-02` with a max|N|/p column.** Cheap, and it turns the file's
   negative answer into a positive one (V-6).
4. **`fold-profile-16` S2 with equal-multiplicative-width bands.** Cheap, and it
   is the only way to separate height from band width.
5. **A `fold-profile-01` DEEP=1 run**, which nobody has pasted; and an actual
   off-ladder fold, which the header has promised since the file was written.
6. **`fold-profile-08` over more tiles.** Its zone-localized margin is the input
   to the Zone Postulate route and it currently rests on three tiles, one Y each,
   at a sample point where M nearly doubles over the next factor of 2 in Y.

### What I suspect and could not prove

- **The variance-deficit trilogy (14, 15, 16) probably supports a weaker claim
  than 15's header wants.** 14 and 16 both give a clean deficit growing with h;
  15 tries to pin the slope to 1/ln W and, once its own control is subtracted,
  gets +0.23, −0.05 and +0.025 across three tiles. My suspicion is that the true
  slope is close to 1/ln W at T₂₃ and that T₁₇ and T₁₉ simply have no statistics,
  but with three tiles I cannot distinguish that from "the law is wrong".
- **`fold-profile-04`'s sign-random correlations may be the mirror symmetry.**
  `fold-profile-02` S4 shows the ledger is mirror-paired to within 1 at every
  cell; a mirror-symmetric kills vector against a non-symmetric damage vector
  would produce exactly this signature — real per-cell correlation of arbitrary
  sign averaging to nothing. I did not test it.
- **The head-kill set {p, p²−2} may have a third element off the ladder.** The
  Head Lemma's proof uses "on the ladder there is no prime in (x, p)". For a fold
  by p well above x, t can be any x-rough number below p, so kills below p² are
  not confined to two slots. In practice every such slot has already been removed
  by an earlier fold (sequential sieving), which is why `fold-profile-07`'s tables
  show nothing extra — but the LEMMA as stated is a ladder statement and the
  files that quote it do not say so.
- **`fold-profile-12`'s tile mean is contaminated at the fourth decimal.** Its
  twin count includes (3,5), (5,7), (11,13), (17,19), which are not slots, which
  is why its first band reports a survival of 1.5000. Four pairs in 896,062, so
  it changes nothing — but the same definitional mismatch in a smaller window
  would not be harmless, and the mismatch is not documented anywhere.

---

## Method note

**Two of the three worst things I found were invisible to reading and visible
only to running.** V-2 (unseeded controls in two files) cannot be seen without
running twice. V-7 (the surviving positive excess is a skew artifact) cannot be
seen without simulating the file's own estimator. Wave 5 read these files
carefully and re-ran twelve of them, and found neither, because the question
"does it reproduce?" is different from "does it run?" and different again from
"is its threshold right?".

**The direction of correction inverted twice in this partition.** V-3 corrects
wave 5's finding rather than the corpus, and V-5 corrects wave 5's cost estimate
by four orders of magnitude. Both times the wave-5 claim was a reasonable
inference from the source that a thirty-second run refutes. The campaign's own
lesson list should carry it: **an inference from source is a hypothesis, and in a
repo where everything runs in seconds it is a hypothesis with no excuse.**

**Editing printed prose would have destroyed the artifact I was building.**
Three files (03, 08, 16) contain `console.log` sentences that their own output
refutes. Fixing those strings would have made the pasted OUTPUT block stale the
moment it was written. The rule this partition adopted, and which the next one
should inherit: **once a file carries a pasted output, only comments are
editable; any change to printed text requires a re-run and a re-paste.** Where I
did change printed behaviour — the two seedings of V-2 — I stripped the stale
block, re-ran twice to prove determinism, and re-pasted.
