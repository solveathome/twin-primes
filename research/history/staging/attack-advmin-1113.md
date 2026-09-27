# The adversarial minimum prices the joint caps: at @11 the staircase floor is 18 ABOVE the class-blind ceiling

<!-- ledger
id: Q-advmin-1113
status: CLOSED
todo: none
question: Can joint caps quantified over classes recover the staircase-to-truth gap at @11 and @13?
verdict: CLOSED at @11: the adversarial minimum for the whole family is 16, below the class-blind ceiling and 18 under the staircase floor of 34, which also refutes the task's own framing that it would sit between floor and truth; at @13 the same family is priced at advmin <= 152.
-->

*(2026-08-20. Producer `research/attack-advmin-1113.js`, embedded (219 s run,
`--check` passes); every cited number is in its OUTPUT block unless explicitly
marked as a terminal state of a killed exploratory run. The long searches were
wound down by Chris's decision, recorded in §3.)*

## 0. The question Chris asked

Compute the EXACT adversarial minimum of Natal@5 survivors at @11 and @13 —
minimize survivors over ALL scour classes, every scour prime q in (x, sqrt(W)]
free to choose its class pair {a_q, a_q − 2} mod q independently — and compare
against the staircase's certified floors (>= 34 @11, >= 110 @13,
`paper/staircase-note.md` Theorem 8) and the anchored truths (45, 307). The
point: price the joint caps. Any cap family — per-prime or joint, however
clever — that quantifies over all class choices proves a floor valid at the
adversarial witness too, so the adversarial minimum is the exact CEILING on
what such a bound can ever certify.

## 1. The answer

| | @11 | @13 |
|---|---|---|
| comb N | 90 | 990 |
| scour primes | 10 (13..47) | 34 (17..173) |
| choice space | 266,186,053,068,611 | ~5.5e63 |
| first-order class-blind floor (union) | none (capacity 91 > 90) | none (1264 > 990) |
| dual-weight floor (root) | >= 5 | none (1017 > 990) |
| certified lower bound on advmin | 16 (exact) | >= 21 (head-6) |
| certified upper bound on advmin | 16 (exact) | <= 152 (witness, replay-proven each run) |
| **exact adversarial minimum** | **16** | **not reached — certified bracket [21, 152]** |
| staircase certified floor (anchored) | 34 | 110 |
| anchored truth | 45 | 307 |

**@11 verdict, exact.** advmin@11 = 16: an explicit, replay-verified choice of
one class pair per scour prime (witness in the OUTPUT block) kills all but 16
of the 90 comb slots, and the search proves no choice does better. Three
independent instruments corroborate at the same value: the head-8 ladder rung
certifies >= 16, the 13-shard minimum is 16, and a bar-16 run completes empty
while bar-17 finds the 16-leaf. Consequently NO bound that quantifies over
scour classes can certify survivors >= 17 — and the staircase's anchored floor
is 34. The floor sits **18 ABOVE the class-blind ceiling**. The "adversarial
slack" in the 34 -> 45 gap that class-quantified joint caps could recover is
not merely small, it is negative: the staircase already spends anchored
structure (Cofactor Rigidity is a divisibility statement about the classes
{0, −2}), and that anchoring carries the entire floor. Joint caps quantified
over classes are DEAD as a route to close 34 -> 45. Only anchored-aware
arguments remain.

**@13 verdict, bracketed.** advmin@13 in [21, 152], certified; the exact value
is PARKED (price in §3). The two ends are asymmetric in meaning:

- The **upper end** is a recorded witness (found by a 1,000,000-restart
  coordinate ascent; the heuristic is not the certificate — the witness is,
  and the embedded run re-proves survivors = 152 from scratch every run). So
  a class-quantified bound can add AT MOST 42 to the staircase floor 110,
  while the distance from floor to truth is 197. **At least 155 of those 197
  points — 79% — are anchored structure that no class-blind bound of any
  order can reach.** This conclusion needs only the witness and survives the
  unfinished exact search.
- The **lower end** (>= 21, head-6 instrument, 1.02e7 nodes) is weak. The bar
  ladder that would raise it never completed a rung (§3): every @13 bar must
  first traverse the ~2.5e8-node cross product of the six smallest scour
  primes before its bound differentiates, so even the weakest useful bar is
  a >= 1e9-node object.

## 2. Method, and the discipline items

Branch-and-bound maximization of coverage (survivors = N − coverage):

1. **Proven pruning only.** Two bounds, proven in the script header, used as
   their min: the union bound (each remaining prime contributes at most its
   best class's fresh coverage on the current uncovered set) and an
   integer-scaled dual-weight bound (a five-line weak-duality argument;
   integer arithmetic end to end; the weights are tuned by subgradient
   descent, which affects tightness only — validity is re-established exactly
   from the final rounded weights). One further reduction is a proven state
   identity, not a heuristic: child classes of the branching prime with the
   same fresh set produce byte-identical engine states and are deduplicated
   by exact slot list. No monotonicity assumption appears anywhere: the
   repo's greedy-feasibility mistake (two-class-lower-bounds.js maxM) cannot
   recur here by construction.
2. **Calibration before trust.** A prune-free exhaustive enumerator
   (independent code path, plain bitset unions, no counts machinery) agrees
   EXACTLY with the branch-and-bound on @7 full (143 assignments, min 4),
   @11 head-4 (96,577, min 45) and @11 head-6 (86,822,723, min 33); the run
   aborts on any disagreement; enumeration leaf counts are asserted against
   the BigInt products.
3. **Witness replay.** Every optimum and every construction is re-verified by
   a from-scratch residue test sharing no state with the incremental engine.
4. **Instrument cross-checks at @11, where the exact answer is known.**
   Head-k ladder rungs 2/4/6/8 certify >= 7/13/14/16; shard minima over the
   first prime's 13 classes reproduce 16; bar-16 completes empty, bar-17
   finds the 16-leaf. All asserted in the embedded run.
5. **BigInt hygiene.** Choice-space sizes are BigInt; node counters are
   Numbers asserted < 9e15; no 32-bit shift touches any count.

## 3. The @13 exact search: wound down by decision, with its terminal states

Chris, 2026-08-20 afternoon: *"this is not worth our CPU and we are not in a
place right now to do multi-day runs. Kill and see what we have learned so
far."* All seven searches were killed at 14:30 with their logs preserved; the
terminal states below are the last progress lines of runs that did NOT
complete — they certify nothing and are recorded as price data and as
consistency observations only.

| run (all KILLED-BY-DECISION 2026-08-20 except as noted) | terminal state |
|---|---|
| full 34-prime exact search, seed 153 | 2.7e8 nodes, no leaf below 153; superseded by the seeded shard, killed earlier for cores |
| shard q=17:a=0 (1/17 of the space), seed 152 | 1.61e9 nodes, depth ~15, no leaf below 152 |
| bar 50 | 2.96e8 nodes, no leaf below 50 |
| bar 70 | 4.42e8 nodes, no leaf below 70 |
| bar 80 | 4.57e8 nodes, no leaf below 80 |
| bar 90 | 3.92e8 nodes, no leaf below 90 |
| bar 100 | 5.55e8 nodes, no leaf below 100 |
| bar 111 (the decision bar) | 1.1e8 nodes when killed earlier for cores; never relaunched |
| head-8 ladder rung | COMPLETED ITS BUDGET HONESTLY: NOT COMPLETED at 3.0e8 nodes (no certificate) |
| head-4 / head-6 rungs | COMPLETED: bounds −30 (vacuous) and >= 21 (the certificate quoted in §1) |

Measured single-core rate ~1.7e5 nodes/s quiet, ~0.5-1.0e5 under the
7-process afternoon load. Scaling the incomplete shard by its 17 siblings
prices the full exact proof at plausibly 2e10-5e10 nodes — 1.5 to 4 days
single-threaded, hours only with ~8-way sharding — and that is an estimate
from an INCOMPLETE shard in a repo where cost estimates have erred cheap by
four orders of magnitude. The open decision **"does advmin@13 exceed the
staircase floor 110?" is PRICED, NOT DECIDED**: bar-111 is the instrument,
its cost is bounded below by bar-100's unfinished 5.5e8 nodes, and no bar
found any leaf below its level — consistent with a minimum near 152, but
that is an observation, not a certificate.

## 4. What this closes, and what it does not

- CLOSES (@11): "recover the staircase-to-truth gap with joint caps
  quantified over classes." The ceiling for that entire family is 16 < 34.
  The result also refutes the task's own framing: the adversarial minimum
  was expected to sit between floor and truth, and it sits below the floor.
- PRICES (@13): the same family tops out at advmin@13 <= 152; at most 42 of
  the 197-point floor-to-truth gap is even in principle recoverable
  class-blind; at least 155 points are anchored-only.
- LEAVES OPEN (@13): the exact adversarial minimum, and the bar-111 decision
  (whether ANY class-blind slack above the floor exists at @13).
- Does NOT touch: anchored-aware joint caps (arguments using the {0,−2}
  classes and divisibility structure, like the staircase itself). Those are
  the only family this result leaves alive for closing floors toward truth.
- Cross-reference: the free-class adversary is the adversary of Ziller and
  Morack's h2 (A288815; GLOSSARY "two-class maximum gap" entry), but the
  object differs — min survivors of the anchored Natal@5 comb over one full
  tile, not max covered run length.

**TODO note for the orchestrator:** Chris asked for this item to be added to
TODO; the orchestrator makes that edit, not this report.
