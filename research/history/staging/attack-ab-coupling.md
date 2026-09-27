# A/B coupling: what the two kill channels' rigidity buys the counting criterion

<!-- ledger
id: Q-ab-coupling
status: PARTIAL
todo: none
question: How much of the counting criterion's known slack does the rigidity of the two kill channels A = 0 mod p and B = -2 mod p close?
verdict: Priced and short on its own pre-registered terms: the coupling is worth a measured 61 slots at depth 0 and 27 at depth 2, pairwise-overlap awareness closes 8 of the 11-slot deficit and the instrument lands L <= 54 against the 51 it needed; the un-preregistered finding is that the missing 3 slots sit in the triples, where L <= 39 clears 51.
-->

*2026-08-19. Pilot on Chris's proposal: A = the lower twin member (kill class
`0 mod p`), B = the upper (kill class `−2 mod p`); the two channels are the SAME
set translated by 2, and the question is how much of the counting criterion's
known slack that coupling closes. Producer: `research/attack-ab-coupling-01.js`
(formal embed, `code-sha256`/`out-sha256` bound). Legend as elsewhere:
**[PROVEN]** / **[VERIFIED]** computationally here / **[MEASURED]** /
**[INFERRED]**.*

---

## 0. PRE-REGISTRATION (written before any optimization run)

This section was committed to the file before the producer script existed. It is
here so the measured numbers below can be read against a prediction rather than
against a memory of one.

### 0.1 The quantities, with units stated on every one

- `L(5, 23)` = combined `L` at block 1 = the longest run of consecutive **T₅
  slots** deleted by one two-class set `{a_p, a_p−2}` per prime `p ∈ (5, 25]`,
  every `a_p` free (COVERING form, `research/qc/units.js` item 5). **Units:
  slots.** Truth = **19 slots** (`research/block-L-first-dead.js` §1).
- The criterion's ceiling: first dead `l` = **63 slots**, so `L ≤ 62 slots`
  (`block-L-first-dead.js` §3; sums 62/62/62 across all three T₅ phases).
- The 529 requirement: `G₂(23#) = maxsum_{L+1}(T₅)` **in integers** must be
  `≤ 529 = 23²` **integers**. T₅ gap word (6, 12, 12), `m̄ = 10` integers/slot,
  so `maxsum_{3k}=30k`, `maxsum_{3k+1}=30k+12`, `maxsum_{3k+2}=30k+24`:
  `maxsum₅₂ = 522 ≤ 529 < 534 = maxsum₅₃`. Hence `L + 1 ≤ 52`, i.e.
  **`L ≤ 51 slots`** (`research/sift-limit-attack.md` §7a-ter).
- The deficit under attack: **62 − 51 = 11 slots**, factor **62/51 = 1.216**.

### 0.2 Predicted ceiling after adding pairwise-overlap awareness

**Prediction: new first-dead `l` = 60 slots, new ceiling `L ≤ 59 slots`; band
56 to 62 slots on the ceiling.** Reasoning stated in advance: at `l ≈ 62` the
six block primes carry `ΣK_p = 62` hits into 62 slots, and the mean pairwise
overlap under a uniform model is `Σ_{p<q}K_pK_q/l ≈ 25 slots` — but a perfect
matching of six primes exposes only THREE of the fifteen pairs, and each pair
has `p·q` phase choices (77 to 437) to dodge with, so the per-pair FORCED
overlap should be 0 to 2 slots. Three pairs, 0-2 each, is a 0-6 slot gain
against an 11-slot deficit.

**Therefore the pre-registered verdict is: pairwise awareness PRICES the idea
and does not clear 51.** Recorded here so that a clear is a surprise and not a
retrofit.

Secondary predictions:
- Uncoupled control (two FREE independent classes per prime) is **weaker** at
  every depth, because `max_a(c[a]+c[a−2]) ≤ c[top] + c[second]` pointwise.
  Predicted uncoupled depth-0 first-dead: 70 to 90 slots.
- One-class control (Jacobsthal, `{a_p}` only): predicted depth-0 first-dead
  32 to 40 slots — a different object, quoted only as scale.
- The Alternation Lemma and the Localized Merge Lemma are predicted to add
  **exactly nothing** on top of exact `K_p`, because `K_p` is already an exact
  maximum over the real T₅ difference word and therefore already obeys every
  single-prime law. Predicted delta: 0 slots. If this is right, the coupling's
  entire value must be CROSS-prime, which is what the pairwise object measures.

### 0.3 Decision bands (fixed in advance)

| new ceiling `L ≤` | verdict |
|---|---|
| ≤ 51 slots | **coupling closes it** — 529 becomes a counting consequence at block 1 |
| 52 to 61 slots | **prices the idea** — report the closed fraction of the 11-slot deficit |
| 62 slots | coupling buys nothing over depth-0 |

### 0.4 Calibration runs required before any refinement is trusted

1. **A5 Theorem A** and **A8's Alternation Lemma** verified computationally on
   T₅ and T₇ folds (known positives) before either is used as a constraint.
2. The window-overlap machinery must reproduce the depth-0 ceiling
   **62 / first-dead 63** EXACTLY, on its own code path, before it is refined.
3. The exact end of the hierarchy must reproduce the exact truth
   **L = 19 / first-dead 20**, or the hierarchy is not the right hierarchy.

Anything below this line was written after the runs.

---

## 1. The answer, up front

> **The A/B coupling is worth a measured 61 slots at depth 0 and 27 at depth 2,
> and pairwise-overlap awareness closes 8 of the 11-slot deficit — 73% — but not
> the last 3.** The pre-registered instrument lands the ceiling at
> **`L ≤ 54` slots** against the 51 it needed, so on its own terms this pilot
> **prices the idea and does not clear 51**, exactly as pre-registered. **[VERIFIED]**

> **What was not pre-registered, and is the finding: the missing 3 slots are in
> the TRIPLES.** The same construction taken one rung further —
> partitions into parts of size ≤ 3 rather than ≤ 2 — gives **`L ≤ 39` slots at
> block 1, which clears 51 with room, and `L ≤ 65` slots at the `x = 29` zone,
> which clears 83.** So `sift-limit-attack.md` §7a-ter's *"529 is closed, not
> unfinished … the counting criterion's ceiling is 62"* is a statement about the
> **depth-0** criterion only. At depth 3 the block-1 counting route to 529 is
> **open**. **[VERIFIED, and it wants an adversarial pass by someone who did not
> write it.]**

> **And the scope is bounded, from the same instrument.** The depth needed to
> clear `x²` at block 1 rises: **3, 3, 5, 5** at `x = 23, 29, 31, 37`, with
> depth 6 already past the probe's cost budget at `x = 37`. This converts a
> route recorded as CLOSED into one that is OPEN AND EXPENSIVE, with the price
> rising in `x`. It is not a proof route and nothing here suggests it becomes one.

Nothing in this contradicts `attack-block-00-ADJUDICATION.md`: the exact end of
the hierarchy reproduces the exact search (`L = 19` slots, 68 of 68 instances),
so the criterion is still never sharper than the search. What moved is how much
of the search the *relaxation* recovers.

---

## 2. The instrument, and why it is a legitimate refinement

Depth-0 adds hit counts and ignores that hits overlap. For any phase assignment
and any partition `π` of the block's primes,

> `l = |∪_p A_p| ≤ Σ_{B∈π} |∪_{p∈B} A_p| ≤ Σ_{B∈π} maxcov(B, l, f)`

so a dead run of `l` slots at phase `f` forces
`l ≤ min_π Σ_B maxcov(B, l, f)`. **Depth-k** restricts `π` to parts of size ≤ k.
Depth-1 IS Theorem D's `S(l,f)`; depth-n IS the exact search. Writing
`maxcov(B) = Σ_{p∈B} K_p − forcedOverlap(B)`, this is exactly the brief's
`Σ_p hits_p − minOverlap(l) ≥ l` with `minOverlap` the largest total forced
overlap any partition certificate can certify. **[PROVEN, one line]**

Every `maxcov` is EXHAUSTIVE over all `∏_{p∈B} p` coupled phase tuples, bitmask
union and popcount, no greedy, the only pruning an early exit at coverage `l`
which cannot move a maximum capped at `l`. The min over partitions is a subset
DP (`3^n` transitions), and it reproduces the independent enumeration path
digit for digit at every `l` on the block-1 table.

---

## 3. Calibration (all four gates passed before any refinement was read)

| gate | result |
|---|---|
| **A5 Theorem A** and **A8 Alternation**, every run at every fold, T₅ and T₇ | **0 violations** |
| depth-1 path reproduces Theorem D | `S(62) = 62`, `S(63) = 62`, first dead `l = 63` → `L ≤ 62` slots, **AGREES** |
| exact end of the hierarchy reproduces the exact truth | depth-6 first dead `l = 20` → `L ≤ 19` = truth, **AGREES** |
| **soundness**: 211 (instance, depth) ceilings against exactly known truths on 68 instances | **0 ceilings below the truth**, and top depth = truth in **68 of 68** |

The exact statements verified, quoted from `research/kappa-not-L.md`:

> **Alternation Lemma (PROVEN).** *"along a run the non-zero class gaps must
> strictly alternate between class +2 and class −2. One class is small (2p∓2)
> and the other large (4p±2), and they sum to exactly 6p."*

> **Theorem A (Run Cost, PROVEN; VERIFIED at ten primes).** *"Any two ADJACENT
> gaps of a run sum to at least 6p, because min(class +2) + min(class −2) = 6p
> exactly. Hence the span of a run of length L is at least c_min(L−1) ≈ 3p(L−1).
> Attained with equality at every fold with L ≥ 2, all seven."*

> **Localized Merge Lemma, Fact B (PROVEN)**, `research/LOCALIZED-GAP.md` §2:
> *"An interval of length below p − 2 contains at most one kill."*

The runs these govern are short on T₅ and T₇ — `L = 2` at fold 7 on T₅ and
`L = 1` at every other fold on both tiles — so the equality clause is vacuous
here. The laws hold; the tiles are too coarse for them to bind.

---

## 4. Stage 1 — the measured hierarchy at block 1 (T₅, primes in (5, 25])

| depth k | first dead `l` (slots) | ceiling `L ≤` (slots) | clears 51? |
|---|---|---|---|
| 1 (= Theorem D) | 63 | **62** | no |
| 2 (pairwise) | 55 | **54** | no |
| 3 | 40 | **39** | **YES** |
| 4 | 33 | 32 | YES |
| 5 | 23 | 22 | YES |
| 6 (= exact search) | 20 | **19 = the truth** | YES |

**Pre-registered depth-2 prediction: ceiling 59 slots, band 56–62. Measured: 54
slots.** The prediction was outside its own band on the good side; the reason it
was wrong is stated in §5.

**The 51-question, answered with a number.** Depth-2 closes **8 of the 11-slot
deficit (72.7%)**, leaving 3 slots and a factor 54/51 = 1.059. **Verdict:
PRICES THE IDEA at 54 slots.** Depth-3 clears at 39 slots.

---

## 5. Stage 2 — what the coupling itself is worth, against two controls

| model | depth-1 ceiling | depth-2 ceiling |
|---|---|---|
| coupled `{a, a−2}` (the object) | **62** | **54** |
| uncoupled `{a, b}`, two free independent classes | 123 | 81 |
| one class `{a}` (Jacobsthal control, a different object) | 12 | 8 |

- **Value of the A/B coupling at depth 1: 61 slots** (123 → 62), factor 1.984.
- **Value of the A/B coupling at depth 2: 27 slots** (81 → 54), factor 1.500.
- **Value of pairwise awareness, coupled: 8 slots** (62 → 54).
- **Value of pairwise awareness, uncoupled: 42 slots** (123 → 81).

**They are substitutes, not complements, and that is the sharpest thing here.**
Coupling alone buys 61 slots, pairwise alone buys 42, both together buy 69 — not
103. The two constraints overlap by 34 slots of explanatory power. The coupling
already costs the adversary most of what pairwise-overlap accounting would
otherwise have caught, which is exactly why the pre-registered prediction
overestimated the depth-2 gain: it priced pairwise overlap against an uncoupled
intuition.

**The Alternation Lemma and the Merge Lemma contribute exactly 0.** Over 270 hit
sets and 2,232 hits (3 phases × 6 primes × every class, `l = 62`): 0
qualifying-law violations, 0 alternation violations, 0 Fact B violations. The
reason is structural, not numerical: `K_p` is an exact maximum over the real T₅
difference word, so every set it ranges over is already a genuine `{a, a−2}`
kill set and already obeys all three laws. **Imposing them as constraints cannot
change `K_p`.** Their content is single-prime; the criterion's slack is
cross-prime, which is why partition depth is the axis that moves it.

---

## 6. Where the remaining slack lives — measured, not guessed

At `l = 62` slots, phase `f = 0`, where `S = 62`:

| p | 7 | 11 | 13 | 17 | 19 | 23 | Σ |
|---|---|---|---|---|---|---|---|
| `K_p` (slots) | 18 | 12 | 10 | 8 | 8 | 6 | **62** |
| `2l/p` (slots) | 17.7 | 11.3 | 9.5 | 7.3 | 6.5 | 5.4 | 57.7 |

All fifteen forced pairwise overlaps `D_pq = K_p + K_q − maxcov({p,q})`: **min 0,
max 2, total 7 slots**, and every one of the five deficits ≥ 1 involves **p = 7**.
A perfect matching exposes only three of the fifteen, which is why depth-2 wins
8 slots and not more.

**The triples carry content the pairs cannot see.** `{7, 11, 13}` has a forced
overlap of **5 slots** against **2** from the sum of its three pairwise
deficits — **3 slots strictly beyond pairwise**, and it is the only triple with
a large excess (`{7,11,17}` gives 1, the other eight give 0). **The whole of the
remaining deficit sits on the densest prime and its two nearest neighbours.**

---

## 7. Stage 3 — scope, honestly

The requirement, derived here with units rather than quoted: `G₂(x#) =
maxsum_{L+1}(T₅)` **integers**, so `L ≤ (max{m : maxsum_m(T₅) ≤ x²}) − 1`
**slots**. At `x = 23`: `maxsum₅₂ = 522 ≤ 529 < 534`, so **`L ≤ 51` slots**
(reproduces the corpus). At `x = 29`: `maxsum₈₄ = 840 ≤ 841 < 852`, so the
block-1 requirement is **`L ≤ 83` slots** [DERIVED HERE].

Because feasibility is downward closed, the criterion failing at any single `l`
gives `L ≤ l − 1`; so the requirement question needs one probe window, at
`l = need + 1`, not a sweep. Probe values are `bound − l`; negative clears.

| `x` | block primes in (5, x] | Σ 2/p | need `L ≤` (slots) | d1 | d2 | d3 | d4 | d5 | d6 | clears at |
|---|---|---|---|---|---|---|---|---|---|---|
| 23 | 7…23 | 0.9312 | 51 | +3 | +1 | **−2** | −4 | −5 | −7 | **depth 3** |
| 29 | 7…29 | 1.0002 | 83 | +6 | +1 | **−3** | −5 | −9 | −12 | **depth 3** |
| 31 | 7…31 | 1.0647 | 95 | +15 | +9 | +5 | 0 | **−4** | −8 | **depth 5** |
| 37 | 7…37 | 1.1188 | 135 | +26 | +18 | +9 | +3 | **−1** | cost | **depth 5** |
| 41 | 7…41 | 1.1676 | 167 | +38 | +29 | +18 | +10 | +5 | cost | **not reached** |

Three readings, and the third is the one that bounds the whole pilot.

1. **The `x = 29` zone is where depth-0 stops existing as an instrument.**
   `Σ 2/p = 1.0002 > 1` there, so `S(l) − l` drifts *upward* and the depth-0
   criterion never dies at any `l` — no bound at all, at any sweep length
   (measured: still alive at `l = 190`). Depth-2 restores a finite ceiling
   (`L ≤ 124` slots) and depth-3 clears the requirement (`L ≤ 65` against 83).
   **Turning a vacuous criterion into a clearing one is the largest single thing
   the overlap accounting does anywhere in this pilot.**
2. **Every zone tested through `x = 37` clears, at a depth that rises: 3, 3, 5, 5.**
3. **`x = 41` is not reached**: depth 5 is still +5 at the probe window and depth 6
   costs more than the 4·10⁹-tuple budget. The instrument does not scale — the
   count of phase tuples at depth `k` and zone `x` is `Σ_{|B|≤k} ∏_{p∈B} p`, which
   is about `x^k/(k! ln^k x)` per window per phase, and the depth demanded is
   itself rising. **This is an open-and-expensive route, not a proof route,** and
   four points do not support any law for how the demanded depth grows.

### Exportability to the residue-deleted maxsum object (statement only)

The 0c attack's object deletes exactly one coupled pair. Every constraint used
here survives that deletion, and the reason is that the certificate never names
a prime: the inequality `l ≤ Σ_{B∈π} maxcov(B, l, f)` needs only that the window
is covered by the union of the surviving kill sets, and each surviving set is
still one of the `p` translates `{i : d_i ≡ a or a−2 mod p}`. Deleting a coupled
pair removes one set from the union, so every partition and every fractional
cover over the remaining primes stays valid verbatim and the resulting ceiling
can only fall. What does NOT export is (i) the depth-0 total `Σ K_p`, which is
specific to the prime set and loses a term, so all five ceilings above must be
recomputed rather than carried, and (ii) the `x = 29` reading in §7 reading 1,
which depends on `Σ 2/p` crossing 1 for that exact prime set and moves as soon
as a prime leaves it. The §5 finding — that A5, A8 and Fact B add nothing beyond
`K_p` — exports unchanged, since it is a statement about a single prime's class
pair and is indifferent to which other primes are present. **No implementation
was attempted.**

---

## 8. NOT REACHED

- **The full LP.** Only two families of certificates were minimised over: exact
  set partitions with parts ≤ k, and the uniform fractional cover by all size-k
  subsets. The true depth-k object is the fractional-cover LP over all subsets of
  size ≤ k, which can only be lower. **The depth-2 ceiling of 54 slots may not be
  the depth-2 optimum, and the 3-slot gap to 51 is inside the range an LP could
  plausibly close.** This is the single most valuable unexecuted run here.
- **The uncoupled control above depth 2** (cost: `C(p,2)` choices per prime puts
  depth-3 triples at ~1.5·10⁷ tuples per window per phase).
- **`x = 41` at depth 6**, and every zone above 41 at any depth.
- **First-dead sweeps at `x = 31, 37, 41`**: those rows are single-point probes at
  `l = need + 1`, which answers the requirement question but does not give a
  ceiling. §9's sweep there stops at `need + 40` and reports `>` accordingly;
  §7's `x = 29` sweep, which runs to `l = 190`, is the authoritative one for that
  zone (`L ≤ 124` slots at depth 2).
- **Any tile but T₅ above depth 5**, and any second tile for the zone ladder.
- **No live document was touched.** Nothing here has been integrated anywhere; the
  §1 headline has had exactly one adversarial pass, by its own author, through
  the 211-ceiling soundness check, and the campaign rule asks for another.

---

## Sources

Criterion and branch-and-bound ground truth: `research/history/staging/attack-L-law.md` §1–2,
`research/attack-L-law.js`. · Proven block-1 ceiling and downward closure:
`research/block-L-first-dead.js` §§1–5, `research/sift-limit-attack.md` §7a. ·
The 51 requirement and the "closed with a number" reading:
`research/sift-limit-attack.md` §7a-ter. · A5 Theorem A, the Alternation Lemma
and the qualifying law: `research/kappa-not-L.md`, `research/a3-05-bound-L.js`,
`research/a3-08-adjacent-pairs.js`, `research/U-FRAME.md` §10. · Localized Merge
Lemma and Fact B: `research/LOCALIZED-GAP.md` §§2–3. · Units and the covering
form: `research/qc/units.js` items 2 and 5. · Closures respected:
`research/history/staging/attack-block-00-ADJUDICATION.md`.

---

*Staging document. Nothing here is integrated into a live document, and the §1
headline has not been read by anyone but its author.*
