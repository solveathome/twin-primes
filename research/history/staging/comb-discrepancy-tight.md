# Tightening the Comb Discrepancy Lemma's constant

<!-- ledger
id: Q-comb-discrepancy
status: PARTIAL
todo: 8
question: Can the Comb Discrepancy Lemma's constant 2*3^k be tightened (TODO 8c)?
verdict: The lemma IS the trivial per-block bound; the attained optimum is max G - min G, a computed number per level (slack 29x @23, 54x @29, growing); term-by-term pricing lifts the certified head share to about 28-29 percent, not the 50 hoped for.
-->

**TODO item 8(c), "tighten 2·3^k (~30× slack)". 2026-08-28.
Script: `research/history/staging/comb-discrepancy-tight.js`, 27.7 s, all asserts
passed. SCRATCHPAD-GRADE: the script carries no embedded OUTPUT block, so every
number below is quoted as a measurement of a finite deterministic quantity, with
the command that produced it, and not as a custody artifact.**

```
node --max-old-space-size=4096 research/history/staging/comb-discrepancy-tight.js
```

## 0. What is open, and what failed

**The engine channel is where the item lives, and it is the channel that moved
least.** The certificate engine (`natal-cap-28-analytic-certificate.js` RESULT 1)
prices *dilated* combs, so it needs a constant uniform over the dilation family.
The construction proven below, maximised over that family, is **worse** than the
standing seeded transfer of `level-ledger-tight.md` §6c: 91.79 against 26.68 at
@17, a factor 3.44 in the wrong direction. The grouping gain is a property of the
α = 1 classes, not of the family. Recorded as a negative.

**No exponent moves.** Every bound here still costs a factor near 3 per added
mid in the worst case; the measured per-fold step of the blocked bound at fixed
Y is about 2.4, and of the sharp constant about 1.82. Nothing here bears on
`REFUTED.md`'s discrepancy-theory rows, which are closed as routes; this is a
finite lemma's constant and stays that.

**The "~30×" in the item's title is now an exact number and it is level-dependent,
not a constant.** The slack 2·3^k / D_x reads 2.68 / 4.29 / 6.61 / 12.36 / 16.41 /
28.99 / 53.64 at @7..@29. The 30 that item 8(c) quotes is the @23 value and it is
growing, so "the slack" is not a single factor to be taken back once.

**Not evaluated.** The sharp per-dilation constant at @19 and @23 (the exact range
per dilation) is not computed: at @23 that is 14.9 M candidate steps per dilation
against about 1000 dilations. The blocked bound is used instead, so the engine
numbers in §5 are floors.

## 1. The lemma as proven, and where the 2 and the 3^k come from

Producer: `research/natal-cap-25-excess-law.js` header, lines 25-29, restated in
`certificate-engine.md`'s status table and cited in `level-ledger-tight.md` §6c.

The natal comb at level x is

    C_x = { r : r ≡ 11 or 17 (mod 30);  r ≢ 0 and r ≢ p−2 (mod p) for every mid 7 ≤ p ≤ x },

with W = x#, N = 2·∏(p−2), density ρ = N/W, and k = #mids = π(x) − 3.

**Comb Discrepancy Lemma (PROVEN).** For every integer s and every integer ℓ,
|#(C_x ∩ [s, s+ℓ)) − ρℓ| ≤ 2·3^k.

*Proof, reconstructed.* Expand ∏_p (1 − [r≡0] − [r≡p−2]) into 3^k signed terms,
one per pair (d, c) with d | M = ∏mids squarefree and c a choice from {0, p−2}
for each p | d, with sign (−1)^{ω(d)}. Each term, intersected with one of the two
unit classes mod 30, is a single arithmetic progression of modulus 30d by CRT,
so the comb's indicator is a signed sum of 2·3^k progression indicators. An AP
count in an interval is off its density share by less than 1. The shares sum to
ρℓ exactly, since Σ_{d,c} (−1)^{ω(d)}·2/(30d) = (2/30)·∏(1 − 2/p) = ρ. ∎

**So the 2 is the mod-30 unit pair and the 3 is the three terms 1, −[≡0],
−[≡p−2] per mid.** The 2 is *not* the two excluded classes: those are the second
and third term inside each factor of 3. The exponent is k = π(x) − 3, not
π(x) − 1, because 2, 3 and 5 are already spent on the mod-30 pair, which is why
`level-ledger-tight.md` §6c found this bound the tighter of the two to start with.

## 2. The constant has an exact optimum, and it is computable

Write G(u) = #(C_x ∩ [0,u)) − ρu on integers u ∈ [0, W]. G is W-periodic, since
G(0) = G(W) = 0.

**Theorem A (Sharp Window Constant, PROVEN).** For all integers s, ℓ,
#(C_x ∩ [s, s+ℓ)) − ρℓ = G(s+ℓ) − G(s), hence

    sup over integer s, ℓ of |#(C_x ∩ [s, s+ℓ)) − ρℓ|  =  max G − min G  =:  D_x,

and the supremum is attained with ℓ ≤ W: take s at the argmin and ℓ reaching the
argmax, or the reverse for the negative sign.

Theorem A is one line and it says the lemma's constant is not open-ended. D_x is
the floor under every bound of this shape, so the only questions left are its
value and whether a formula for it exists.

**Theorem B (Blocked Legendre Bound, PROVEN).** Group the expansion of §1 by the
divisor d. For fixed d all 2^{ω(d)} class terms carry the same sign (−1)^{ω(d)},
and their supports are distinct residues mod d, hence disjoint. They therefore
merge into a single periodic set A_d of period 30d carrying exactly 2^{ω(d)+1}
points, and

    D_x  ≤  Σ_{d | M} range(A_d),

with range taken over integer u. More generally, for any subset Y of the mids
kept unexpanded,

    D_x  ≤  Σ_{d | M∖Y} range(A_{d,Y}),

where A_{d,Y} has period 30·W_Y·d and N_Y·2^{ω(d)} points, N_Y = 2·∏_{p∈Y}(p−2).

Two consequences worth stating. First, **bounding each block's range by its own
point count 2^{ω(d)+1} returns 2·3^k exactly**, since Σ_{d|M} 2^{ω(d)+1} = 2·3^k.
The standing lemma *is* the trivial per-block bound, and the whole of the
available gain is the difference between a block's point count and its actual
range. Second, the bound costs N_Y·3^{k−|Y|} point-operations, not O(W), so it is
evaluable at levels no tile enumeration reaches, and it is exact when Y is the
whole mid set.

Theorem B works entirely in the original coordinate and never rescales an
interval, which is why the integer-u range is the right quantity. That
distinguishes it from `level-ledger-tight.md` Theorem 2, whose sub-intervals have
rational endpoints and which therefore needs the continuous-u range; the two
differ by up to one block density (1.6 against 1.5333 at y = 5).

## 3. Avenue (c), the maximal empty run, is a lower bound and it is weak

A run of length g with no comb member gives a window with count 0 against share
ρg. The quantity that run measures is the maximal *empty* run, one less than the
maximal member-to-member gap g_max, since a window of length g_max contains one
member and not none: at @7 the comb is {11, 17, 41, 71, 101, 107, 137, 167, 191,
197}, the maximal gap is 30 and the maximal empty run is 29. So the valid bound
is **D_x ≥ ρ·(g_max − 1)**, exactly. Measured: ρ·(g_max − 1) = 1.381 / 2.299 /
2.934 / 4.509 / 5.596 / 7.676 at @7..@23 against D_x = 2.238 / 4.195 / 8.165 /
13.102 / 29.619 / 50.295; at @29 the corrected value is one ρ (0.0221) below the
9.425 the ρ·g_max form gives and it is not re-derived here. The maximal empty run
explains 61.7% of D_x at @7 and about 11.5% at @29, falling at every level. As a
route to the constant it is dominated; as a certificate that D_x cannot be small
it is cheap and it holds. The overstatement is one ρ and the slack is large, so
the printed inequality held numerically at every level and no downstream number
moves; the derivation and the percentages do.

## 4. The table

Measured, `comb-discrepancy-tight.js` Parts 1, 2, 4. "cap-25 maxE" is the
embedded grid maximum from `natal-cap-25-excess-law.js`'s OUTPUT block, which is
a maximum over a scour-length grid and so is a *floor* under D_x; the script
asserts that ordering at all six levels where it exists.

| level | k | 2·3^k | ET(x) | blocked Y≤5 | blocked Y≤13 | blocked Y≤19 | **D_x (sharp)** | cap-25 maxE | 2·3^k / D_x |
|---|---|---|---|---|---|---|---|---|---|
| @7  | 1 | 6 | 9.919 | 3.3 | - | - | **2.2381** | 1.2 | 2.68 |
| @11 | 2 | 18 | 26.590 | 7.4 | - | - | **4.1948** | 2.7 | 4.29 |
| @13 | 3 | 54 | 64.948 | 18.3 | 8.2 | - | **8.1648** | 5.9 | 6.61 |
| @17 | 4 | 162 | 162.044 | 41.0 | 17.1 | - | **13.1021** | 10.1 | 12.36 |
| @19 | 5 | 486 | 398.659 | 110.3 | 49.0 | 29.6 | **29.6189** | 21.5 | 16.41 |
| @23 | 6 | 1,458 | not run | 247.7 | 110.1 | 61.2 | **50.2952** | 34.4 | 28.99 |
| @29 | 7 | 4,374 | not run | 578.9 | 249.4 | 140.9 | **81.5492** | - | 53.64 |
| @31 | 8 | 13,122 | not run | 1,333.0 | 555.6 | 328.8 | out of reach | - | - |
| @37 | 9 | 39,366 | not run | 3,246.5 | 1,384.6 | 832.5 | out of reach | - | - |

**Sharpest at every level where it exists: D_x**, by Theorem A, and there is
nothing below it. Where D_x is out of reach the sharpest is the blocked bound at
the deepest affordable Y: 328.8 at @31 and 832.5 at @37 with Y ≤ 19, gains of
39.9 and 47.3 over 2·3^k. The largest level with an exact answer is **@29:
D_29 = 81.5492 against 2·3^7 = 4374, a factor 53.64, with the blocked Y ≤ 19
bound at 140.9, itself 1.73× above sharp.**

Remaining slack of the best *formula-free but computable* bound against sharp:
1.00× at @19, where Y ≤ 19 is already the whole mid set, 1.22× at @23, 1.73× at
@29. Remaining slack of the
sharp constant against the strongest lower bound available, ρ·(g_max − 1): 5.3×
at @19, 6.5× at @23, 8.7× at @29, widening.

**Avenue (b), Erdős-Turán with the exact Fourier coefficients, loses on both
axes.** ET(x) is *worse* than the standing lemma up to @17 (ratios 0.60, 0.68,
0.83, 1.00) and only ×1.22 better at @19; its per-fold step is about 2.45 against
3, so it crosses late, and it costs O(W) to evaluate against the blocked bound's
N_Y·3^{k−|Y|}. This is the natal-object analogue of `level-ledger-tight.md`
§4(c), which found the same shape on the twin tile and the same L¹ floor beneath
the whole family. Consistent with that file; it is not independent evidence.

**Growth, measured, not derived.** D_x steps by 1.874, 1.946, 1.605, 2.261,
1.698, 1.621 over @7 → @29, geometric mean 1.8208 against √3 = 1.7321. That sits
above √3 in the same direction and by about the same margin as
`level-ledger-tight.md`'s R\*(19) surprise, and for the same unseparated reason:
D_x is a maximum, and no closed form for it is offered here.

**A measured regularity with no proof attached.** sup|G| / D_x reads 0.5106,
0.5046, 0.5020, 0.5011, 0.5004, 0.5002, 0.5001 at @7..@29, so the anchored
(one-endpoint) channel is half the two-endpoint one to four digits and
tightening. G is antisymmetric about its own centre to that precision. No
derivation is offered and none was attempted; flagged as measured only.

## 5. What the tighter constant buys the certificate engine

`natal-cap-28-analytic-certificate.js` RESULT 1 certifies a prime q, of index
j = idx(q), when 2^{j+1}·(2·3^k + 1) ≤ ½·(main − s). The 2^{j+1} is two sides
times 2^j divisors d | P_j, and each term is a count of the comb dilated by
(q·d)^{−1}. Replacing the universal 2·3^k by a per-dilation blocked bound gives

    | cap₂(q) − main |  ≤  Σ_{sides} Σ_{d | P_j} ( B(α_{side,q,d}) + 1 ),

which is the same theorem with a computed constant per term. Running cap-28's own
certification test against it, with Σcap₂ taken from cap-28's embedded K0 anchors
and the old counts and shares asserted to reproduce:

| level | certified primes, old | share of Σcap₂, main-term mass, old | certified primes, new | share, main-term mass, new | mean per-term constant, max over certified primes |
|---|---|---|---|---|---|
| @17 | 1 | 9.69% | **4** | **28.14%** | 17.4 against 2·3^4 = 162 |
| @19 | 3 | 17.37% | **6** | **27.97%** | 47.9 against 2·3^5 = 486 |
| @23 | 6 | 22.88% | **9** | **29.40%** | 112.1 against 2·3^6 = 1458 |

Both column labels say what the producer computes, and neither is the thing its
old label named. The share column accumulates `cap = main + s` with
`main = (A+B)·NW·Pj`, the analytic main term, not the exact cap₂: on exact cap₂
mass the new share at @17 is **28.21%**, and the old column is 9.693% either way,
which is why the custody assert against cap-28's 9.69% passes and hides the
difference (`redteam-0828-engine.md` §6.4, exact cap₂ counts). The constant
column is `errNew/2^{j+1} − 1`, an average over the `2^{j+1}` terms, so it is the
maximum over certified primes of the *mean* per-dilation constant; at @17 that
maximum is 17.41, at `q = 23`, while the maximum single-dilation range is 18.369,
at `q = 31`. Both are far below `2·3^4 = 162` and the reading is unchanged.

The old shares reproduce cap-28's embedded 9.69 / 17.40 / 22.93% to 0.05
percentage points, which is the custody check on the main-term arithmetic; the
old counts 1 / 3 / 6 are asserted exactly.

Read this at the right register. The certified head quadruples in count at @17,
from 1 to 4, doubles at @19, and moves from 22.88% to 29.40% at @23. cap-28's own next-step
(iii) predicted that a proven sub-3^k bound would push the certified share "past
50% at @29+"; at the three levels reachable here it does not reach 50%, and the
gain at @23 is the smallest of the three. The counts are floors: at @19 and @23
the per-dilation constant used is the blocked bound with Y ≤ 13, above the sharp
per-dilation range, and at @17 alone the two coincide. Nothing here touches the
engine's two unproven ingredients, so the engine's outputs keep the status of
their weakest input, which remains the Buchstab Transfer Hypothesis, HEURISTIC.

## 6. Status of item 8(c)

**Partly answered, and not in the channel that pays.** For the α = 1 window
channel the constant is now exact at @7..@29 and computable at any level, with a
gain over 2·3^k that grows rather than staying flat. For the dilation-uniform
channel, which is the one the certificate engine consumes, the best proven bound
is still `level-ledger-tight.md` §6c's 3^{k−4}·26.682612, a constant gain of
6.07, and the construction here does not improve it. What the engine actually
gains, §5, comes from pricing each of its own finitely many dilations rather than
from a better uniform constant, and that is a computation at each level, not a
formula.

## Defects noticed in passing

- `certificate-engine.md`'s status table gives the Comb Discrepancy Lemma the
  scope "every Legendre term is off its share by at most 2·3^k". Each term is off
  by less than 1; the sum of the 2·3^k terms is off by at most 2·3^k. Wording,
  one cell, no downstream number affected.
- `natal-cap-28-analytic-certificate.js`'s embedded OUTPUT at @13 prints
  "agg NaN%" for the certificate line, a 0/0 when cert.n = 0. Cosmetic.

## What would falsify this, and whether that check has run

- **Theorem A is false if some window beats D_x.** The check is the assertion
  that cap-25's six embedded grid maxima all sit at or below D_x. RUN, passes at
  all six.
- **Theorem B is false if the blocked bound ever falls below D_x.** The check is
  the identity blocked(Y = all mids) = D_x, since a Y that keeps everything has
  the single block d = 1. RUN and asserted to 1e−9 at @7..@23; not run at @29,
  where W_Y = W is not enumerable by that path.
- **The census could be wrong, making every D_x wrong.** The check is that the
  ascending pass counts exactly N = 2·∏(p−2) members. RUN, asserted at all seven
  levels.
- **§5's arithmetic could be wrong.** The checks are that the old certified
  counts reproduce cap-28's 1 / 3 / 6 exactly and the old shares reproduce
  9.69 / 17.40 / 22.93% within 0.6 points. RUN, both pass.
- **The new counts in §5 could be capped rather than real.** The check is whether
  the divisor walk stopped on a certification failure or on the search cap
  JCAP. RUN: it stopped on a failure at all three levels, so JCAP was not
  binding.
- **Unchecked, and flagged as such.** No independent re-derivation of D_x by a
  second method exists at @29; the α = 1 pass is the only witness there. At
  @7..@23 a second, independently written pass reproduces every D_x, the census
  and the sup|G|/D_x column (`redteam-0828-engine.md` §6.1), and it also
  reproduces the §5 @17 row with exact cap₂ counts and sharp per-dilation ranges
  (§6.4 there); @29 was outside that pass's compute budget too. The
  sup|G| / D_x → ½ regularity of §4 has no proof and no control. The per-dilation
  §5 constants are not compared against the sharp per-dilation ranges at @19 and
  @23, so the true engine gain at those two levels is larger than reported by an
  unmeasured amount.
