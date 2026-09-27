# Adversarial verification of the A/B-coupling pilot, and the fractional LP it named

<!-- ledger
id: Q-ab-coupling
status: ANSWERED
todo: none
question: How much of the counting criterion's known slack does the rigidity of the two kill channels A = 0 mod p and B = -2 mod p close?
verdict: The pilot survives, every held number reproducing on an independent code path, and the one correction is in its favour: the depth-3 ceiling is 38 slots, not 39; the LP answers NO, its exact depth-2 optimum over the full polytope being 54 slots, identical to the pilot's, so it prices the idea and does not clear 51.
-->

*2026-08-19. Independent second implementation of
`research/history/staging/attack-ab-coupling.md` / `research/attack-ab-coupling-01.js`,
written by a verifier who did not write the pilot. Producer:
`research/attack-ab-coupling-02-lp.js` (formal embed). Nothing is imported from
the pilot: where the pilot enumerates coupled phase tuples by bitmask recursion
and popcount, this file counts coverage through residue histograms and
inclusion-exclusion, and the two paths are then cross-checked against each
other. Legend: **[VERIFIED]** computationally here, **[PROVEN]**, **[MEASURED]**.*

*All runs complete. Total compute for this pass: about 4 minutes, well inside
the 60-minute budget.*

---

## 1. The answer, up front

> **The pilot survives.** Every held number reproduces on an independent code
> path. The one correction is in the pilot's own favour and does not change any
> verdict: the depth-3 ceiling is **38 slots, not 39**, once the fractional-cover
> LP the pilot named and did not run is actually executed.

> **The named unexecuted run has been executed, and it answers NO.** The exact
> depth-2 optimum over the FULL fractional-cover polytope, in exact rational
> arithmetic with a verified primal/dual certificate, is **54 slots — identical
> to the pilot's 54**. The depth-2 verdict stays as pre-registered: *prices the
> idea, does not clear 51*. The 3-slot gap is genuinely beyond pairwise, and
> §4 below shows *why* in closed form rather than by inspection.

> **One real error was found, and it is cosmetic.** The pilot's §6 says *"every
> one of the five deficits ≥ 1 involves `p = 7`"*. There are **six**, and
> `D(11, 19) = 1` does not involve 7. No ceiling moves; §9 has the full table.

---

## 2. Per-claim verdicts

| held claim | held | reproduced here | verdict |
|---|---|---|---|
| depth-0/1 coupled ceiling, block 1 | `L ≤ 62` | 62 (first dead `l` = 63) | **CONFIRMED** |
| depth-2 coupled ceiling (pilot family) | `L ≤ 54` | 54 (first dead 55) | **CONFIRMED** |
| depth-3 coupled ceiling (pilot family) | `L ≤ 39` | 39 (first dead 40) | **CONFIRMED** |
| depth-3 coupled ceiling, FULL LP | not run | **38** (first dead 39) | **CORRECTED, downward** |
| uncoupled depth-0/1 | 123 | 123 (first dead 124) | **CONFIRMED** |
| uncoupled depth-2 (pilot family) | 81 | 81 (first dead 82) | **CONFIRMED** |
| uncoupled depth-2, FULL LP | not run | **79** (first dead 80) | new |
| one-class Jacobsthal control | first dead 13 / ceiling 12 | 13 / 12 | **CONFIRMED** |
| A5 / A8 / Fact B add 0 beyond `K_p` | 0 slots | 0 slots, stronger test | **CONFIRMED** |
| `x = 29`: `Σ2/p > 1`, depth-0 never dies | never dies | never dies to `l = 1200` | **CONFIRMED** |
| `x = 29` depth-3 ceiling | `L ≤ 65` vs need 83 | 65, need 83 | **CONFIRMED** |
| `x = 29` depth-2 ceiling | `L ≤ 124` | 124 | **CONFIRMED** |
| the 51 and 83 requirements | 51, 83 | 51, 83 | **CONFIRMED** |
| soundness: any ceiling below truth | none | none, 4 independent tests | **CONFIRMED** |
| zone ladder: depth needed at `x = 23, 29, 31, 37` | 3, 3, 5, 5 | 3, 3, 5, 5, LP included | **CONFIRMED** |
| depth-2 LP would plausibly close the last 3 slots | predicted plausible | LP = 54, moves 0 | **REFUTED (the pilot's own prediction)** |

**No claim was REFUTED. No violating assignment exists to exhibit** — §5 shows
why, exhaustively rather than by sampling.

---

## 3. THE LP ANSWER

`min Σ_B c_B y_B` subject to `Σ_{B ∋ p} y_B ≥ 1`, `y ≥ 0`, over all subsets `B`
of the six block primes with `|B| ≤ k`, `c_B = maxcov(B, l, f)`. Solved by an
exact rational simplex (BigInt fractions, Bland's rule), with the primal
feasibility, dual feasibility and strong-duality equality all re-verified term
by term at every window. Self-tested first on two instances with hand-known
answers (a triangle whose LP is 3 against an integral 4; a two-variable
instance whose LP is 7).

| depth `k` | pilot's family `min(P_k, U_k)` | **FULL LP** | clears 51? |
|---|---|---|---|
| 2 | first dead 55, `L ≤ 54` | **first dead 55, `L ≤ 54`** | **no** |
| 3 | first dead 40, `L ≤ 39` | **first dead 39, `L ≤ 38`** | yes |

> **The depth-2 answer is NO: the true depth-2 optimum does not drop below 51.
> It does not move at all.** The pre-registered depth-2 verdict stands
> unflipped. This confirms the pilot's reading that the `{7, 11, 13}` triple's
> 3 slots are genuinely beyond pairwise reach.

At depth 3 the LP does bite, by exactly `1/3` of a slot at the decisive window,
and that third of a slot is enough to kill `l = 39` and move the ceiling from
39 to 38. The optimal cover there is genuinely fractional:

    l = 39, f = 0:  {7,11,13}×1/3 + {17}×1 + {7,13,19}×1/3 + {7,13,23}×1/3
                    + {11,19,23}×2/3     →   LP_3 = 115/3 = 38.33 < 39

At depth 2 the LP is provably unable to move, and §4 of the producer gives the
reason in closed form rather than by inspection. Writing
`D_pq = K_p + K_q − maxcov({p, q})` for the forced pairwise overlap, any cover
that puts weight `y` on the pair `{p, q}` pays `K_p + K_q − D_pq`, so

> `LP_2 = Σ_p K_p − (maximum-weight FRACTIONAL matching in K₆ with weights D_pq)`

and `P_2` is the same with the INTEGRAL matching. **The entire depth-2 LP gain is
the fractional-matching gap, which is non-zero only on odd cycles.** Measured at
all three decisive windows (`l = 52, 55, 62`) the two matchings coincide, so the
gap is **0 slots** and the depth-2 LP is exactly the pilot's number, not
approximately. **[VERIFIED]**

Over the whole depth-2 sweep the LP beats the pilot's family by at most **0.5
slots**, and only at `l = 3`; it is strictly better at 7 of 55 windows and at
none of the ones that matter. At depth 3 it beats it by at most **2/3 of a
slot**, at 5 of 40 windows, and one of those is `l = 39`, which is why the
depth-3 ceiling moves.

---

## 4. Job 1(b): the hierarchy's inequality direction, and the parity that is not there

The brief's worry is a Bonferroni sign error: a truncated inclusion-exclusion
alternates, so truncating at EVEN order gives a LOWER bound, and an invalid
even-depth "ceiling" would still agree with truth on easy instances.

**The object is not a truncated inclusion-exclusion, and its derivation has one
sign.** For any family `{(B, y_B)}` with `y_B ≥ 0` and `Σ_{B ∋ p} y_B ≥ 1`,

> `|∪_p A_p| = Σ_i 1 ≤ Σ_i Σ_{B ∋ p(i)} y_B ≤ Σ_B y_B |∪_{p∈B} A_p| ≤ Σ_B y_B maxcov(B, l, f)`

where `p(i)` is any prime killing slot `i`. Every coefficient is non-negative and
every step is an upper bound at every `|B|`, so there is no parity condition to
get backwards. Set partitions into parts of size ≤ k are the 0/1 points of that
polytope, the pilot's uniform cover is the point `y_B = 1/C(n−1, k−1)`, and the
LP is the whole polytope. **[PROVEN, four lines]**

Three consequences are checkable and a sign error breaks all three. Measured
over **every** subset `Q` of block 1 with `|Q| ≥ 2` (57 sub-instances), six
window lengths and all three phases, **3,348 (sub-instance, window, depth)
cells**, each against an exhaustively exact `maxcov(Q)`:

| test | result |
|---|---|
| (i) depths where `P_k` rose with `k` (must be 0) | **0**, monotone |
| (i) depths where `LP_k` rose with `k` (must be 0) | **0**, monotone |
| (ii) cells where a certificate fell BELOW the exact maximum | **0**, at every depth, odd and even |
| (iii) top-depth cells failing `LP_{|Q|} = P_{|Q|} = exact maxcov(Q)` | **0 of 1,026** |

Test (iii) is the sharp one. At `k = |Q|` the cover `y_full = 1` is feasible and
attains `maxcov(Q)`, and the inequality above says nothing beats it, so the
identity is forced. It holds exactly, in exact rational arithmetic, in every one
of 1,026 cells. **[VERIFIED]**

**And the parity object is exhibited rather than argued away.** Over 6,000 real
coupled assignments on 12 windows, the truncated inclusion-exclusion
`B_k = Σ_{|B|≤k} (−1)^{|B|+1} |∩_{p∈B} A_p|` behaves exactly as parity predicts:

| object | times below the true union (i.e. invalid as a ceiling) |
|---|---|
| Bonferroni order 1 | 0 of 6,000 (odd: valid) |
| **Bonferroni order 2** | **5,582 of 6,000 — an even-order truncation is NOT a ceiling** |
| Bonferroni order 3 | 0 of 6,000 (odd: valid again) |
| **the depth-2 certificate used here** | **0 of 6,000** |

The two objects are numerically distinguishable on this very instance, 93% of
the time, and the one in use is on the correct side at even depth. **A sign error
of the kind the brief asked about would have been caught by this test, and there
is none.** **[VERIFIED]**

---

## 5. Job 1(a): soundness and tightness, three independent ways

**Soundness is the lethal direction, and no violating assignment exists.** Not
"none was found": none exists, and that is established exhaustively rather than
by sampling.

1. **The exact truth.** Folding `T₅` over `23#` (22,309,287 slots) gives
   `L = 19`, reproducing the corpus. Exhaustive enumeration of all **7,436,429**
   coupled phase tuples confirms `l = 19` coverable, `l = 20` not. Every ceiling
   here is ≥ 19, so none of them can be beaten by any assignment.
2. **Exhaustive maxcov at every decisive window.** At `l = 39, 52, 55` and all
   three phases, the exact maximum coverage over all 7.4 M tuples is 34, 44–45
   and 45–46 respectively, against certificates of 38 to 54. **Every certificate
   at every decisive window dominates the exact maximum.** A certificate below
   the exact maximum would be an invalid bound; there is none.
3. **56 sub-instances with exactly known truths.** Every subset of block 1 with
   `|Q| ≤ 4`, truth by folding, ceilings at every depth under all three
   families: **468 (instance, depth, family) ceilings, 0 below the truth**, and
   the top depth reproduces the truth exactly in **56 of 56**.
4. **A randomised hunt with a power check.** 84,000 random phase assignments over
   21 windows: 0 beat the depth-2 partition certificate, 0 beat the depth-2 LP
   certificate, and **52,230 beat a deliberately sign-flipped certificate**, so
   the hunt demonstrably has power to catch a wrong bound.

**Tightness: the certificates are valid and loose, and the looseness is
measured.** At the depth-2 death window `l = 55` the exact maximum coverage is
46 while the certificate reads 54, so depth 2 is **8 slots slack at its own
death window**. The depth-3 LP ceiling of 38 is **2.0× the truth `L = 19`**; the
depth-2 ceiling of 54 is 2.84×; depth-0's 62 is 3.26×. The hierarchy is
monotone and ends exactly on the truth at depth 6.

**The full hierarchy, reproduced independently:**

| depth `k` | `P_k` first/ceil | pilot `min(P,U)` first/ceil | LP first/ceil | held | verdict |
|---|---|---|---|---|---|
| 1 | 63 / 62 | 63 / 62 | 63 / 62 | 62 | AGREES |
| 2 | 55 / 54 | 55 / 54 | 55 / **54** | 54 | AGREES |
| 3 | 40 / 39 | 40 / 39 | **39 / 38** | 39 | AGREES (LP corrects to 38) |
| 4 | 33 / 32 | 33 / 32 | not run | 32 | AGREES |
| 5 | 23 / 22 | 23 / 22 | not run | 22 | AGREES |
| 6 | 20 / **19** | 20 / **19** | not run | 19 | AGREES, = the truth |

The two algorithms are cross-checked before any of this is read: 840
(window, subset) comparisons of the histogram/inclusion-exclusion `maxcov`
against the brute-force tuple oracle over all subsets of size 1–3 at
`l ∈ {20, 40, 52, 55, 62}`, **0 mismatches**.

---

## 6. Job 1(c) and 1(d): the spot-verifications

**The two requirements, rederived.** `maxsum₅₂(T₅) = 522 ≤ 529 < 534`, so
`L ≤ 51` at `x = 23`; `maxsum₈₄(T₅) = 840 ≤ 841 < 852`, so `L ≤ 83` at
`x = 29`. Both **CONFIRMED**.

**`x = 29`, `Σ2/p > 1`.** Exactly `215701918/215656441 = 1.00021088`, which is
`> 1` as a rational, not as a float. The depth-1 criterion `Σ_p K_p` is **still
alive at every `l` up to 1,200 slots** (the pilot swept to 190), smallest slack
over the whole sweep 3. **CONFIRMED: at `x = 29` the depth-0 criterion gives no
bound at all.** Depth 2 restores a finite ceiling at **124** and depth 3 gives
**65** against the requirement 83, so it **CLEARS**. Pilot said 124 and 65.
**CONFIRMED**, and the LP moves neither.

**The uncoupled and one-class controls.**

| model | depth-1 first/ceil | depth-2 pilot first/ceil | depth-2 LP first/ceil | held |
|---|---|---|---|---|
| coupled `{a, a−2}` | 63 / 62 | 55 / 54 | 55 / 54 | 62, 54 — **CONFIRMED** |
| uncoupled `{a, b}` free | 124 / **123** | 82 / **81** | 80 / **79** | 123, 81 — **CONFIRMED** |
| one class `{a}` (Jacobsthal) | **13 / 12** | 9 / 8 | 9 / 8 | 13 / 12 — **CONFIRMED** |

The LP is worth 2 slots on the uncoupled control (81 → 79) and nothing on the
coupled one, which is itself evidence for the pilot's §5 reading that coupling
and pairwise-overlap accounting are substitutes: the coupling has already taken
most of what the pairwise object had to give.

**"The lemmas add exactly 0", tested the other way round.** The pilot checked
that no hit set violates A5 / A8 / Fact B. The stronger form is that `K_p`
computed WITH the three laws imposed as filters equals `K_p` computed without
them, at every `(l, f, p)`. Over 1,080 hit sets at `l ∈ {20, 40, 62, 84}` × 3
phases × 6 primes: **0 hit sets violate any law**, so the filter is the
identity, and **0 of 72 `(l, f, p)` cells change**. **CONFIRMED, with the
pilot's explanation confirmed too:** `K_p` is an exact maximum over the real
`T₅` difference word, so every set it ranges over is already a genuine
`{a, a−2}` kill set and already obeys all three laws.

---

## 7. The zone ladder, rechecked with the LP

The pilot's ladder (depth needed 3, 3, 5, 5 at `x = 23, 29, 31, 37`) is read off
single probe windows at `l = need + 1`, which is legitimate because feasibility
is downward closed. The place it could break is `x = 31`, where the depth-4
probe value is **exactly 0.0**: the partition bound equals `l` there, so the
window is alive by a hair and a fractional cover of the 162-subset polytope
could in principle kill it, moving the ladder to 3, 3, 4, 5. It was run.

| `x` | need | probe `l` | d1 | d2 P/LP | d3 P/LP | d4 P/LP | clears by depth 4? |
|---|---|---|---|---|---|---|---|
| 31 | 95 | 96 | +15.0 | +9.0 / +9.0 | +5.0 / **+4.5** | +0.0 / **+0.0** | **no** |
| 37 | 135 | 136 | +26.0 | +18.0 / +18.0 | +9.0 / +9.0 | +3.0 / not run | no |

The exact depth-4 LP value at `x = 31` is **96, against `l = 96`**: alive, by
exactly nothing, in exact rational arithmetic. **The ladder 3, 3, 5, 5 stands.**
The depth-3 LP does shave half a slot at `x = 31` and nowhere near enough.
**CONFIRMED.**

---

## 8. Drafted replacement for `research/sift-limit-attack.md` §7a-ter

**NOT APPLIED. Drafting only.** The sentence under replacement is:

> *"**529 is closed, not unfinished.** The counting criterion's ceiling is 62
> (proven, CRT), and 529 needs `L ≤ 51`: **a deficit of 11 slots, a factor of
> 1.216.**"*

Proposed replacement:

> **529 is closed at depth 0, and the counting criterion has a depth axis.** The
> depth-0 criterion's ceiling is 62 (proven, CRT) against the `L ≤ 51` that 529
> needs: a deficit of 11 slots, a factor of 1.216. That deficit is a property of
> depth 0 rather than of counting. Charging forced *pairwise* overlap brings the
> ceiling to **54** and closes 8 of the 11 slots, and the exact optimum over the
> full fractional-cover polytope at depth 2 is **also 54**, so pairwise genuinely
> stops 3 slots short; the residue sits on the `{7, 11, 13}` triple, whose forced
> overlap is 5 slots against 2 from its three pairwise deficits. One rung
> further, parts of size 3, gives **`L ≤ 38`** and clears 51 with room. So at
> block 1 the counting route to 529 is **open at depth 3, not closed**. It is
> also expensive: the depth needed to clear `x²` rises 3, 3, 5, 5 at
> `x = 23, 29, 31, 37`, the phase-tuple count at depth `k` is
> `Σ_{|B|≤k} ∏_{p∈B} p`, and `x = 41` is out of reach at every depth run. Open
> and expensive is not a proof route, and even at depth 3 the ceiling 38 is
> still 2.0× the truth `L = 19`. [`research/attack-ab-coupling-01.js`,
> `research/attack-ab-coupling-02-lp.js`; verified independently in
> `history/staging/verify-ab-coupling.md`.]


---

## 9. What the pilot's own record needs, if anything

Three edits, all small, and none touches its headline.

- **§4's hierarchy table.** The depth-3 row should read ceiling **38** under the
  full LP, with 39 kept as the value of the pilot's own certificate family. The
  §1 headline sentence "`L ≤ 39` slots at block 1, which clears 51 with room"
  stays true and becomes slightly stronger.
- **§6's pairwise-deficit sentence.** *"All fifteen forced pairwise overlaps
  `D_pq` … min 0, max 2, total 7 slots, and every one of the five deficits ≥ 1
  involves `p = 7`."* Min 0, max 2 and total 7 all reproduce at `l = 62`,
  `f = 0`. The count does not. The full table is

      D(7,11)=1  D(7,13)=1  D(7,17)=1  D(7,19)=2  D(7,23)=1  D(11,19)=1
      and the other nine are 0

  so there are **six** deficits ≥ 1, not five, and one of them, `D(11,19) = 1`,
  does **not** involve `p = 7`. Nothing downstream moves: the maximum matching
  weight at `l = 62` is 2 either way (`{7,19}` alone, or `{7,·} + {11,19}`), so
  the depth-2 ceiling is unaffected. §6's neighbouring claim about the triples
  *is* exact once its implicit scope is written down: over the ten triples that
  contain `p = 7`, `{7,11,13}` has forced overlap 5 against a pairwise sum of 2,
  `{7,11,17}` has excess 1, and the other eight have excess 0. Over all twenty
  triples there are six with positive excess at `f = 0`, so the sentence needs
  "of the triples containing 7" added to it.
- **§8's NOT REACHED, first bullet.** "The full LP … the single most valuable
  unexecuted run here" has now been run. Its answer at depth 2 is **no movement
  at all**, and §3 above gives the closed-form reason. The bullet should be
  replaced by a pointer to this file rather than deleted, because the sentence
  "the 3-slot gap to 51 is inside the range an LP could plausibly close" is the
  thing that turned out to be wrong, and the record is more useful with the
  wrong prediction visible next to its answer.

Nothing else in the pilot changes. In particular the pre-registration in its §0,
the calibration gates in its §3, the substitutes-not-complements reading in its
§5 and the scope caveats in its §7 all survive verification unaltered.

---

## 10. NOT REACHED

- **The LP above depth 3 at block 1.** Depths 4, 5, 6 are reported here under the
  pilot's own certificate family only (32, 22, 19). The exact rational simplex at
  those depths was not run in the sweep; it cannot lower the depth-6 answer,
  which is already the truth, but it could lower 32 and 22.
- **The depth-4 LP at `x = 37`**, where the probe value is +3.0 under partitions.
  A 162-subset fractional cover closing 3 whole slots is not plausible on the
  evidence here (the largest LP gain measured anywhere is 2/3 of a slot), but it
  was not run and so is not excluded.
- **`x = 41` at any depth**, and every zone above it.
- **The uncoupled control above depth 2**, and the one-class control above depth 2.
- **Any tile but `T₅`.** Everything here is block 1 on `T₅` and the four zone
  probes; nothing was attempted on `T₇`.
- **The residue-deleted maxsum object** of the 0c attack. The pilot's §7
  exportability paragraph is a statement, and it stays a statement.
- **No live document was touched.** §8 above is a draft only.

---

## Sources

The pilot under test: `research/history/staging/attack-ab-coupling.md`,
`research/attack-ab-coupling-01.js`. · Ground truth for the depth-0 ceiling and
downward closure: `research/block-L-first-dead.js`, `research/sift-limit-attack.md`
§7a and §7a-ter. · The exact `L = 19` and the sub-block instances:
`research/history/staging/attack-block-00-ADJUDICATION.md`. · A5 Theorem A, the
Alternation Lemma, Fact B: `research/kappa-not-L.md`, `research/LOCALIZED-GAP.md`
§§2–3. · Units and the covering form: `research/qc/units.js` items 2 and 5. ·
This file's producer: `research/attack-ab-coupling-02-lp.js`, formal embed,
`code-sha256` / `out-sha256` bound, 175 lines of output, 18.6 s.

---

*Staging document. Nothing here is integrated into a live document. The pilot's
headlines were HELD pending this pass; on the evidence here they can be released,
with the depth-3 ceiling quoted as 38 rather than 39.*
