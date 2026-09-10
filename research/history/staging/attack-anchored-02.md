# Anchored-arguments attack, second move: the unified ladder at @17 and @19 — the K = 0 gain dies, the family lead survives and grows, and truth's price is exactly the sole-killer pool

<!-- ledger
id: Q-anchored-ladder
status: ANSWERED
todo: A
question: Does the unified anchored ladder generalize past @11 and @13, and what does cheap K buy at each level?
verdict: It generalizes verbatim to @17 and @19, and the K = 0 unified floor is DEAD there (vacuous at -1262 and -55865); what survives and grows is the family lead at the classic certification depth K*, margin +2, +5, +26, +110 across @11 to @19.
-->

*(2026-08-21. Generalization move on anchored-01's NOT REACHED list. Producer
`research/attack-anchored-02-ladder17.js`, formally embedded
(`node research/qc/embed.js --timeout 120 research/attack-anchored-02-ladder17.js`,
0.7 s run, `--check` passes bit-honest), all self-tests pass; every cited
number is in its OUTPUT block or named to its source artifact in the CITED
block ([STC], [ADV], [AA1]). Legend as in `research/sift-limit-attack.md`:
**[PROVEN]** derived theorem; **[VERIFIED]** checked computationally here;
**[MEASURED]** empirical, finite range. This is a HELD headline awaiting its
adversarial pass: no live document was touched. Calibration: the engine
reproduces every certified @11/@13 number — floors 34/110, unified 36/115,
truths 45/307 at K = 8/28, plateaus 41/296, witness replays 16/152 — and
every [STC] Theorem 8 anchor at @17/@19 (Σcap₁ 99729/2025930, Σcap₂
16135/308401, K\* 2/10, floors 82/1877, truths 3099/38380), abort-on-mismatch,
before any new figure is produced. Everything below is an exact finite count:
nothing at these levels forced a sampled or one-sided bound.)*

---

## HEADLINE

**The unified ladder generalizes verbatim to @17 and @19 — and the
generalization reverses one headline and sharpens another.** The @11/@13
showpiece, a positive unified floor at K = 0 beating the published floor, is
DEAD at @17: ΣcapU₀ = 16112 > N = 14850, the depth-0 floor is vacuous there
and at @19 (−1262 and −55865). What survives — and grows — is the family
lead: at every level, at the classic family's own certification depth K\*,
the unified floor is already past the classic certified floor, and the margin
rises with the level.

| | @11 | @13 | @17 | @19 |
|---|---|---|---|---|
| scour size | 10 | 34 | 120 | 435 |
| classic certified floor (Thm 8, at K\*) | 34 (K\*=0) | 110 (0) | **82** (2) | **1877** (10) |
| unified floor at K = 0 | 36 | 115 | −1262 (vacuous) | −55865 (vacuous) |
| **unified floor at K = K\*** | **36** | **115** | **108** | **1987** |
| margin over classic at K\* | +2 | +5 | **+26** | **+110** |
| classic plateau (any K) | 41 | 296 | 3057 | 38219 |
| unified passes plateau at K (asc / greedy) | 2 / 2 | 15 / 14 | 67 / 64 | 281 / 273 |
| truth | 45 | 307 | 3099 | 38380 |
| K to truth (ascending / **exact minimal**) | 8 / **4** | 28 / **21** | 109 / **88** | 410 / **350** |

Second headline, the exact price of truth: **the minimal moduli pool that
reaches truth is pinned to the digit at all four levels — 4, 21, 88, 350 —
by a matching pair of bounds.** Lower bound [PROVEN]: a candidate with
exactly one killer forces that killer into any truth-reaching pool, and the
sole-killer primes number 4/21/88/350. Upper bound [VERIFIED]: the greedy
pool of exactly that size reaches truth. So anchored-01's "K = 8 of 10,
mostly deep scour" was an artifact of ascending order — the true @11 price
is 4 primes ({13, 17, 19, 41}) — but the *fraction* of the scour that truth
costs still grows with level: 0.40, 0.62, 0.73, 0.80.

## 1. The two new ladders (task a), and the margin identity [PROVEN]

- **@17** (N = 14850, scour 19..709): unified turns positive first at
  K = 2 — the same rung as classic K\* — with floor 108 > 82; passes the
  classic plateau 3057 at ascending K = 67; reaches truth 3099 at ascending
  K = 109 of 120. Waste accounting closes on the digit: 58 allowances =
  23 wheel-excluded self slots + 19 twin-collision shadows + 16 fresh
  self-strikes; plateau 3057 = 3099 − 42 = truth − (58 − 16).
- **@19** (N = 252450, scour 23..3109): positive first at K = 10 = K\*, floor
  1987 > 1877; passes the plateau 38219 at ascending K = 281; truth 38380 at
  ascending K = 410 of 435. Waste: 213 = 86 + 75 + 52; plateau = truth − 161.
- **The margin identity** (the new small theorem; asserted at every depth of
  every level — all 599 scour primes, every K, zero violations):

  capC_K(q) − capU_K(q) = s(q) − [the m = 1 candidate is alive at depth K].

  Per level and depth, the unified lead over classic **equals the number of
  allowances the classic family is wasting at that depth**: at K = 0 that is
  the wheel-excluded count (2, 5, 23, 86), at full depth the whole waste
  (4, 11, 42, 161). The two @11/@13 blind spots of s(q) named in anchored-01
  are now priced at every level and every depth, not just at the endpoints.
- Hard-cap chain fresh ≤ capU_K ≤ capC_K and full-depth degeneration
  capU = fresh per prime: asserted everywhere, zero violations. [VERIFIED]

## 2. The cheap-K verdict (task b): cheap for the lead, dear for the plateau, deepest for truth

Efficiency (floor gained per rung, ascending): the curve is three regimes
deep at every level — to positivity 685 and 5785 per rung at @17/@19; from
positivity to the plateau-crossing 45.4 and 133.7 per rung; from there to
truth 0.93 and 1.22 per rung. A unit of K near the origin buys three orders
of magnitude more floor than a unit near truth.

**CONJECTURE (the cheap-K lead), stated precisely.** For every level x, at
the classic family's own certification depth K\*(x) — which is quarter-power
small, K\*/scour = 0.000, 0.000, 0.017, 0.023 here, per the staircase note's
K\* law — the unified floor strictly exceeds the classic certified floor,
with margin equal (by the proven identity) to the classic allowances wasted
within depth K\*, hence at least the wheel-excluded count. Measured margins
+2, +5, +26, +110; measured wheel-excluded counts 2, 5, 23, 86 — a
0.29–0.40 share of the allowances, 0.40 at both big levels. Since the margin formula is a
theorem, the conjectural content is exactly one clause: **the wheel-excluded
self slots never vanish** (their count grew at every computed level).

**NEGATIVE, with the same precision.** No level-independent or slowly
growing K reaches the classic plateau, let alone truth: the best measured
spend crosses the plateau at 0.20, 0.41, 0.53, 0.63 of the scour and reaches
truth at 0.40, 0.62, 0.73, 0.80 — both fractions grow at every level
[MEASURED]. The depth-cost curve does not improve with level; it worsens
toward all-of-scour. Anchored-01's open question ("whether the depth-cost
curve improves with level") is answered: **NO for plateau and truth, YES for
beating the classic family itself, which costs only K\*.**

## 3. The K-spend rule (task c), stated

- **Value is density, with a flat constant.** A pool prime q′ kills
  c · (2/q′) · (candidate mass above it) admissible cofactors, with
  c = 0.50–0.53 across the first twelve primes at @17 — no drift, and the
  largest positive residual over the model anywhere is 0.9 of a kill. There
  is **no fold-arithmetic bonus set in the marginal values**: smallest-first
  IS the greedy order through the whole useful range (greedy and ascending
  floors are identical through K = 15 at @17 and within 11 units
  everywhere). The @11 forcing ladder's "q = 13 alone costs the adversary
  +4" is a fact about the adversarial measure; in the cap-ladder measure the
  same prime is simply the densest.
- **Spend nothing on the dead tail.** 6/13/30/71 primes kill no admissible
  candidate (at @17/@19 the dead sets sit entirely in the top half of the
  scour: all ≥ 421, all ≥ 2003). Ascending truth-depth = the index of the
  largest killer prime (8th/28th/109th/410th, asserted), so ascending walks
  21 of its 109 rungs (@17) and 60 of 410 (@19) through primes outside the
  minimal pool.
- **The tail of the spend is forced, and foreseeable.** The shadow guarantee
  [VERIFIED 76/76 across all four levels, no exception]: whenever (q, q+2)
  are both scour and the comb contains slot q, the prime q is a killer — it
  must erase its twin's m = 1 ghost — no matter how large it is. That is the
  fold-arithmetic membership rule for the deep pool. Wheel-excluded self
  slots, by contrast, cost NO K at all: the unified family prices them out
  at depth 0, which is exactly where the classic-vs-unified margin starts.
- **The smallest instance, in full.** The @11 kill graph has 9 incidences on
  54 candidates: killers {13, 17, 19, 41} (13 by density — four composite
  cofactor kills; 17 kills 19's self ghost and two composites; 19 one
  composite; 41 exactly one kill, 43's self ghost — pure shadow duty), dead
  {23, 29, 31, 37, 43, 47}. The whole mechanism is visible at a glance.

## 4. Honest limits, stated plainly

- The greedy plateau-crossings (64, 273) are achievable depths — upper
  bounds on the optimal spend. The proven union-bound bracket is wide
  (19 ≤ K ≤ 64 at @17; 30 ≤ K ≤ 273 at @19); only the truth target has
  matching bounds. A tight plateau lower bound is open.
- "Every killer is a sole killer", clean at @11/@13, is FALSE at scale
  (2 redundant killers at @17, 14 at @19); the minimal-pool exactness
  survives because the sole count and the greedy pool size still coincide —
  that coincidence is asserted, not derived, and could in principle fail at
  some higher level (the gap killers − sole is where it would show first).
- Four levels are four data points; every growth statement above is
  MEASURED, not a law. K\* itself is cited from [STC]; nothing here extends
  the K\* law.

## 5. NOT REACHED

- @23 and @29: the engine is a direct march plus cofactor enumeration and
  would need the segmented machinery of natal-cap-11/18 (@23's march alone
  is 5.3M slots × 1863 primes); nothing conceptual blocks it.
- A forcing ladder (adversarial minima with anchored prefixes) at @17: the
  B&B that was exact at @11 does not price out at scour 120.
- A tight lower bound for the plateau-crossing depth (the union bound is
  loose by 3×–9×).
- Any statement about whether the truth-fraction 0.40 → 0.80 tends to 1, or
  about c ≈ 0.51 (the flat density constant) beyond the twelve measured
  primes at @17.
- Whether the redundant-killer count (0, 0, 2, 14) carries structure.

## 6. Reproduction and custody

```
node research/attack-anchored-02-ladder17.js                     # 0.7 s, one process
node research/qc/embed.js --check research/attack-anchored-02-ladder17.js
```

Custody inside the run: SEC 0 aborts unless the @11/@13 [STC]
sums, floors and truths, both [ADV] witness replays, and the [AA1] unified
benchmarks (K = 0 floors, truth depths, plateaus) all reproduce exactly; the @17/@19
[STC] anchors (Σcap₁, Σcap₂, K\*, certified floor, truth) are asserted
before any new figure at those levels; the hard-cap chain and the margin
identity are asserted at every depth and every prime; the minimal-pool claim
is a checked LB = UB coincidence, not an assumption; width guards
(`research/qc/widths.js`, per the WIDTH RULE) gate the slot/candidate stores
and pool indices at the level about to run. Quoted constants carry their
source tags ([STC], [ADV], [AA1]) at the CITED block per the standing
compute rule. The tail carries code-sha256/out-sha256 and the exact
invocation.

**Integration note for the orchestrator (not acted on here):** if this
survives its adversarial pass, anchored-01's NOT REACHED items 2 and 3 (the
ladder at @17+, the cheap-K certificate question) are settled and its §6
should say so; the TODO TOP ATTACK block's cheap-K question has an answer
(lead cheap at K\*, plateau/truth dear and worsening); and the staircase
note's §7 discussion of moduli-pool ordering has a quantitative companion
(ordering is worth 109 → 88 at @17, 410 → 350 at @19, and the order itself
is density-plus-shadow-guarantee). This report edits none of them.
