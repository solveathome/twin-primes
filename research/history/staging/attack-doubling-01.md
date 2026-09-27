# The doubling attack's first move: the C₂ table complete, the mechanism named, eleven proven certificates, and two closures refuted

<!-- ledger
id: Q-doubling-C2
status: PARTIAL
todo: D
question: Does the doubling inequality hold on the base-2 chain, and can a bridging certificate prove it?
verdict: Not proven and not refuted: the exact C2 table has sup 5.2727 at s = 16, eleven proven finite-level bounds C2 <= K*+1 tight to a factor <= 2.91, two closures refuted outright, and the alarm is that K* drifts up (slope 0.6881 +/- 0.1328) while C2 does not (0.2018 +/- 0.1412).
-->

*2026-08-21. Producer: `research/attack-doubling-01.js` (0.3 s, `code-sha256
50418c06`, `out-sha256 b0ba3bd8`, formal embed with input hashing, eight
numbered readings; fingerprint verified with `embed.js --check` after
writing). One re-embed used `--force` (the tool's corrected-code path — a
hand-typed summary line was replaced by the computed value; 0 of 195 figures
in the replaced block changed); the override is stamped in the tail. A predecessor agent's session died mid-task; its orphaned draft was
salvaged CODE-first — every algorithm re-audited against the definitions
(fold kill classes r ≡ 0, −2 mod p; Ĝ(t) = G₂(P(t)#), P(t) the largest prime
≤ t; the bridging decomposition), its silent `Number()` conversion of BigInt
ladder positions replaced by a loud 2^53 width guard (`qc/widths.js`, the
WIDTH RULE class), and the file rebuilt fresh with three instruments the
draft did not have (overlap multiplicity, ground-density ρ, K* drift). All
of the draft's overlapping numbers reproduce. Nothing was committed or
pushed; no existing corpus document was edited. HELD, not integrated —
awaiting the standing one-pass adversarial review. Legend as in
`research/sift-limit-attack.md`: **[PROVEN]** proof given here or published;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical,
finite range; **[INFERRED]** deduction from sourced facts.*

---

## 0. The verdict, up front

> **The doubling inequality is not proven and not refuted. What this pass
> adds: the complete exact C₂ table (sup 5.2727 at s = 16, on the chain,
> custody-only); the mechanism a proof must bound, seen exactly at all
> eleven enumerable steps — the level-2s record is a run of k = 1..10
> consecutive level-s slots killed by the entering primes, assembled at
> ~98% covering efficiency on near-average ground; eleven proven
> finite-level bounds C₂ ≤ K*+1, tight to a factor ≤ 2.91; and two
> first-class refutations — the residue-density closure fails from the
> very first step and takes every constant-factor sharpening (unified-cap
> style included) down with it, and the "record sits over the old record"
> strategy is false at two steps. The honest alarm: the certificate
> quantity K* drifts up (slope 0.6881 ± 0.1328 in the level) while C₂
> does not (0.2018 ± 0.1412) — the bridging certificate route needs K*
> proven sublinear, or a bound that does not pass through K*.**

## 1. (a) The C₂ table, complete and exact

Every reachable integer s = 2..41 (trusted 22-term ladder; custody grade iff
2s ≤ 46), exact fractions in the producer. Headlines:

- **Range [2.0000, 5.2727]**: inf 12/6 = 2 at s = 3; sup **348/66 = 5.2727
  at s = 16 — ON the base-2 chain**, both terms corpus-exact, and the
  custody sup equals the trusted sup (no literature term carries it).
  Confirms redteam-0820-night §2b's "sup over the whole data range" claim
  from a third independent code path. **[VERIFIED]**
- The base-2 chain reads **3.0000, 5.0000, 2.2000, 5.2727, 3.1034**
  (s = 2, 4, 8, 16, 32): increments alternate + − + −, the sup is interior,
  the last trusted step falls (s = 32 rests on Wang's a(18)). **[VERIFIED]**
- Landing zone unchanged: any proven all-s C₂ must be ≥ 5.2727, and every
  C₂ ∈ [5.2727, 19.2455) gives limsup ≤ log₂C₂ ∈ [2.3985, 4.2665).
  **[VERIFIED, arithmetic]**

## 2. (b) The hood open: the mechanism is bridged kill-runs

Tiles to 13# materialized by fold recursion; 17#/19#/23# reached by kill-run
walks over base-tile copies (both paths re-derive G₂, least argmax and
multiplicity for all eight levels p ≤ 23, digit-for-digit against the parsed
ladder). At every one of the eleven distinct enumerable doubling steps:

- **The maximal window at level 2s is exactly a run of k consecutive
  level-s slot copies killed by the primes entering in (s, 2s]** (k = 1 at
  3#→5# up to k = 10 at 11#→23#), bridging k+1 consecutive level-s gaps;
  the length decomposition closes to the digit at every step, and every
  bridged copy is killed by an entering prime only. **[VERIFIED]**
- **Assembled, not inherited.** The largest single spanned level-s gap
  carries only 0.20 to 0.50 of the window's length — half to four fifths of
  every level-2s record is new damage. **[VERIFIED]**
- **Ordinary ground.** The spanned gaps average ρ = 1.000 to 1.461 times
  the tile's mean gap (nine of eleven steps below 1.2): the record is made
  by run-covering on near-average terrain, not by landing on pre-thinned
  terrain. **[MEASURED]**
- **Overlap-free zones.** Across all eleven argmax windows the entering
  primes spend 52 strikes for 51 kills — exactly one multi-killed copy
  (779 at 7#→19#, struck by 11 and 19). The corpus's global salvation
  mechanism (capacity exceeds census; survival rides on forced overlap
  credit) is precisely what is absent locally at a record: records are
  where the covering runs at ~98% efficiency. **[VERIFIED the count]**
- **The record does not anchor on the record.** At 8 of 11 steps the window
  contains a copy of the level-s record gap; at 11#→19# and 13#→23# it does
  NOT (max spanned 36 < 42, and 42 < 66) — the new record can assemble
  entirely from mid-size gaps, refuting any proof strategy that locates the
  new record over the old one. And the same physical window
  [76166567, 76166771] is the argmax against both 11# (C₂ = 4.8571, k = 10)
  and 13# (C₂ = 3.0909, k = 8): C₂ is a property of the pair of levels, not
  of the window. **[VERIFIED; refutation first-class]**

## 3. (c) The bound attempted: what is proven, what leaks

**Bridging Lemma [PROVEN, three lines].** Level-2s slots are a sub-pattern
of the (periodic) level-s slots, so every level-2s gap is a sum of k+1
consecutive level-s gaps, each ≤ Ĝ(s); hence **Ĝ(2s) ≤ (K*+1)·Ĝ(s)** with
K* the longest run of consecutive level-s slots all killed by the entering
primes.

- **Eleven proven certificates.** K* computed exactly (full cyclic walk):
  C₂ ≤ K*+1 = 3, 2, 5, 3, 4, 4, 6, 9, 7, 11, 9 across the steps — the first
  proven doubling bounds the corpus has, every one under 19.2455. Tight:
  cert/C₂ = 1.00 at the first three steps (equality — all bridged gaps are
  records) and never worse than 2.91; at 10 of 11 steps the argmax window
  realizes the longest run (exception 11#→19#: K* = 6 vs k = 5). Per-step
  facts only; no all-s statement follows. **[PROVEN per instance]**
- **REFUTED: the residue-density closure, from the first step.** The AP cap
  (an entering prime kills ≤ 2(⌊(L−2)/q⌋+1) copies in a window of length L;
  proven, never violated) closes the Bridging Lemma iff
  θ = 2Ĝ(s)·Σ_{q∈(s,2s]} 1/q < 1. Measured: θ = 1.3333 at 2#→3#, rising to
  20.45 at 13#→23#, growing like Ĝ(s)/s — fails everywhere, worsening
  polylogarithmically. **[VERIFIED]**
- **REFUTED with it: every constant-factor sharpening.** A density-cap
  refinement by constant factor c closes only where c < 1/θ = 0.750 at the
  first step, 0.049 at 13#→23#, → 0. Since θ → ∞ along s, no
  bounded-strength discount — unified-cap freshness conditions, overlap
  credits, anything of that family — proves any all-s C₂ through this
  route. The unified caps additionally bound kill COUNTS per level,
  history-blind, while the window needs kill PLACEMENT; their localized
  content is exactly the AP spacing already spent. Mirror-Sweep is symmetry
  (halves fingerprints, pairs a ↔ w−a) and carries no magnitude bound by
  its own statement. **[PROVEN the corollary given θ's growth; INFERRED
  the tool assessment]**
- **The self-similarity, named.** An a-priori K* bound is the entering
  primes' two-class covering-run problem on the level-s slot sequence — the
  same two-class Jacobsthal problem one level up. The doubling inequality
  is self-similar under its own natural decomposition; a proof must break
  the self-similarity with placement structure (mirror, seam, fold
  recursion), and no proven corpus tool does. **[INFERRED]**

## 4. (d) The drift hunt: C₂ flat, K* rising

- **C₂: no drift.** Against the in-pass constant-C₂ null (POW ladder
  1.84·p^1.546 on the same primes, whose continuous-limit C₂ is exactly
  2^1.546 = 2.9201): G₂-minus-POW slope reads **−0.0336 ± 0.0596** (full,
  s = 2..41 — reproducing hsub-01's (s,2)-family statistic digit for digit
  from independent code) and **0.0090 ± 0.1129** (custody, s ≤ 23). Both
  consistent with constant C₂. The moving null (LOG) reads −0.1313 ±
  0.0481, so the instrument is not pinned. **[MEASURED]**
- **K*: drifts up.** ln(K*+1) on ln P(2s) reads **0.6881 ± 0.1328** (raw —
  no null exists for K*; a POW ladder has no slot sequence) against C₂'s
  0.2018 ± 0.1412 on the same 11 points; cert/C₂ runs 1.00 → 2.91. The raw
  fit crosses 19.2455 near P(2s) ~ 69 (illustration, not a claim). The
  certificate route cannot land by computing K*: it needs K* proven
  sublinear in the level, or a C₂ bound that does not pass through K*.
  **[MEASURED]**

No reachable family shows C₂ growing; growth beyond s = 41 is neither seen
nor excluded.

## 5. Trap grading

Nothing here derives an explicit all-s constant, so nothing trips the
explicit-constant trap; the slice remains trap-free (TPC through it needs
C₂ < 4, excluded by the s = 16 datum 5.2727). The eleven K*+1 certificates
are finite-level theorems and imply nothing about limsup by themselves.

## 6. NOT REACHED

- **No all-s bound on C₂.** The inequality stands open in both directions
  past s = 41.
- **K* beyond 23#** is unenumerated: the next distinct steps need 29# and
  31# walks, orders of magnitude beyond this pass's 0.3 s budget (and 31#
  likely needs a streaming walk, not a materialized one).
- **The successor target is posed, not attacked**: bound the longest
  entering-prime covering run on the level-s slot sequence by PLACEMENT
  structure, or bound the local overlap deficit of §2 (records as
  overlap-free zones — the X-channel question at window scale).
- **Rows s ≥ 24 of the table** rest on A144311 literature terms
  (floor-certified only at 47..61); the chain rows s ≤ 16 are custody-exact
  and s = 32 rests on Wang's a(18).
- Whether the ρ and overlap-efficiency readings persist at 29#+ — the two
  new instruments have eleven points each, all at small levels.

## 7. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/attack-doubling-01.js` | everything above: the C₂ table, the walks, the decompositions, the certificates, the closures, the drift fits (§§1–4) |
| `research/history/staging/attack-hsub-01.md` Reduction 3; `redteam-0820-night-proofs.md` §2 | the doubling window's trap-free status and the verified endpoints this pass extends |
| `research/attack-fekete-1d-01-defect47.js` | the Ĝ instrument convention and the step-sampling artifact the nulls answer |
| `research/history/staging/attack-anchored-01.md` §2, §4 | the unified-cap machinery assessed in §3 |
| `research/history/staging/attack-0c-holesweep.md` §4 | the Mirror-Sweep Lemma assessed in §3 |
| `research/exact-g2-ladder.js`, `research/import-interp-01-bgt-defect.js` | the two ladders, parsed at run time, input-hashed by the embed |
| `research/dhr-verification.md` row 1a | β₂ = 4.26645…, the proven ceiling the landing zone lowers |

Reproduce with `node research/qc/embed.js --check research/attack-doubling-01.js`;
the fingerprint matches as of 2026-08-21.
