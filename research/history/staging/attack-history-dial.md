# The history dial, priced: the class axis is linear at 2.90 survivors per prime read, so no bounded set of strike locations carries the floor — and the curve the brief asked for was already canonical state

<!-- ledger
id: Q-history-dial
status: ANSWERED
todo: A
question: Does revealing the scour primes' classes concentrate the floor on a bounded set of strike locations, and what is the history dial worth?
verdict: Disconfirming: the class axis is linear at 2.90 survivors per prime read, so no bounded set of strike locations carries the floor, and the touch-count ceiling is proven and tight; deliverable (1) of the brief already existed as canonical state (the forcing ladder 16 -> 45 at @11), so nothing new was bought there.
-->

*(2026-08-26. Producer `research/attack-history-dial-01.js`, formally embedded
(`node research/qc/embed.js research/attack-history-dial-01.js`, 231.4 s run,
295 lines of output); every number quoted below appears in that OUTPUT block
unless tagged [CITED], in which case it is quoted from a named embedded
artifact per the standing compute rule. Legend: **[PROVEN]** derived here;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical, finite
range; **[CITED]** quoted, not recomputed. HELD: one engine of my own plus two
prior engines on the calibration points, no adversarial pass. No live document
was touched.)*

---

## 0. What did not move, first

**Deliverable (1) of the brief already existed, and is canonical state.** The
exact floor-versus-anchored-prefix curve at @11 — "reveal the first j scour
primes' classes, minimise survivors over the rest" — is the **forcing ladder**
of `research/attack-anchored-01-unify.js` SEC 5, written 2026-08-20, quoted in
`research/G2-STATE.md` §5a, and already re-derived once by a red team. It reads

  16 → 20 → 20 → 22 → 23 → 25 → 30 → 35 → 38 → 42 → 45  (j = 0..10).

That file's SEC 5 also carries every *single*-prime anchoring. So the brief's
premise that these numbers "have never been assembled into a single curve" is
wrong at @11: they were assembled six days ago. What this session adds is a
third independent engine on them (all eleven reproduced, GATE G4) and three
things the forcing ladder does not contain — the full 1024-set lattice, the
bit re-indexing, and the sub-prime dial.

**The route the brief was testing is refuted at @11.** The hoped-for shape was
concave: a small fixed amount of class information buying most of the floor.
The measured shape is linear, and the number that kills the lemma-shaped
version is **24** — see §2.

**Everything exact here is exact at one level.** @11 has ten scour primes.
@13 has thirty-four and its dial's own bottom, advmin@13, is still PARKED at
the certified bracket [21, 152] [CITED, `attack-advmin-1113.md`]; this session
did not attempt it, by instruction. The @13 half of the answer covers
j = 18..34 only (§4).

**The brief's "history" is two axes, not one, and the concave one was already
measured and already judged.** See §5. That is the most likely way to
misread this report, so it is stated in its own section.

---

## 1. Calibration before anything is reported

Six gates, all hard aborts, all passed before a single dial number was
computed. [VERIFIED]

| gate | what it pins | result |
|---|---|---|
| G1 | @11 rebuild: W = 2310, N = 90, scour = 13..47 (ten primes), anchored survivors 45 | pass, against [STC] truth 45 |
| G2 | the cited adversarial witness [10,4,14,15,24,17,34,39,10,40] replays | 16 survivors, = advmin@11 [ADV] |
| G3 | **the engine's own free-class minimum**, which is the brief's named calibration | **16** in 6,836 nodes, = advmin@11 |
| G4 | the published forcing ladder, all eleven entries | reproduced exactly |
| G5 | the published single-prime anchorings, all ten | 20,17,18,17,17,18,18,17,18,17, reproduced exactly |
| G6 | a prune-free exhaustive enumerator (separate code path — no bound, no incumbent, no dedup) | agrees with the B&B on 4 of 4 sub-instances, up to 3,065,857 leaves |

The engine is a bitset branch-and-bound with two proven prunings only (a
union bound and an exact fresh-set state identity), no monotonicity assumption
anywhere. It is the third engine in the corpus to land on advmin@11 = 16, and
the first written against bitsets rather than counter arrays.

---

## 2. The disconfirming numbers, in the order they matter

### 2a. The touch-count ceiling [PROVEN here, and tight]

Define a **revelation** R = (S₁..S_n), 0 ∈ S_i ⊆ ℤ/q_i: the certificate is
told prime i's class lies in S_i. The class 0 must stay admissible because a
revelation is *true* information about the anchor. Let T(R) be the set of
primes R says anything at all about.

> **Theorem.** F(R) ≤ latF[T(R)] ≤ envJ[|T(R)|], where latF[T] is the exact
> adversarial minimum with T anchored and the rest free, and envJ[j] is its
> maximum over |T| = j.
>
> *Proof.* The class vectors with cls_i = 0 for i ∈ T(R) and cls_i arbitrary
> outside T(R) all lie in ∏S_i — 0 is admissible inside T, everything is
> admissible outside it. Their minimum is by definition latF[T(R)]. A minimum
> over a subfamily is at least the minimum over the whole. ∎ Tight: S_i = {0}
> on T attains it.

This is `REFUTED.md` row 77's argument at j > 0; **row 77 is its j = 0 case**,
and the route here therefore extends that row rather than colliding with it.
Row 77 closes caps quantified over *all* classes; this closes, quantitatively,
caps quantified over all classes of the primes they do not name.

The lattice was computed exhaustively — all 1024 anchor sets, exact minima,
104,114 B&B nodes, monotone, endpoints 16 and 45. [VERIFIED]

    envJ  =  16, 20, 22, 24, 27, 30, 34, 36, 40, 42, 45     (j = 0..10)

Read as a floor requirement:

| to certify a floor of | you must read the classes of at least |
|---|---|
| ≥ 17 (anything above the class-blind ceiling 16) | 1 of 10 |
| ≥ 23 | 3 of 10 |
| ≥ 31 | 6 of 10 |
| ≥ 35 (anything above the published staircase floor 34) | **7 of 10** |
| 45 (the truth) | **10 of 10** |

**The number that kills the lemma shape is envJ[3] = 24.** The brief's
hypothetical — "even if three primes' locations buy 80% of the floor" — is not
merely unmet; three primes' locations cap the certifiable floor at 24, which
sits **ten below the staircase's already-published anchored floor of 34** [STC].
A three-prime cap cannot reproduce what is in print, let alone improve it.

At one prime the ceiling is exact and separate: the minimum factorises when
only one prime is restricted, so the whole unconstrained one-prime dial is a
function of the 300-entry table f_i(a) (computed exactly, 710,238 nodes). The
strongest legal one-prime revelation is S_i = {0} and its floor is
**max_i f_i(0) = 20**, which is 13.8% of the 16 → 45 gap. An *untrue*
revelation would do marginally better — max over i and a of f_i(a) = 21, at
q = 13 class 11 — which is its own small finding: knowing where the anchor is
*not* is worth about as much as knowing where it is, and neither is worth much.

### 2b. The shape, on the prime axis

Envelope increments: **4, 2, 2, 3, 3, 4, 2, 4, 2, 3**. Mean 2.90 survivors per
prime read, range [2, 4], no downward trend, and the envelope never departs
from the straight line 16 + 2.9·j by more than **1.10 survivors** on a
29-survivor range (3.8%). Upper-half mean over lower-half mean = 1.071 — if
anything the *late* primes are worth slightly more. A concave dial shows large
early increments decaying toward zero; this shows none. [MEASURED, exact, one
level]

### 2c. The shape, on the bit axis

A scour prime's class costs log₂ q bits, so full anchoring at @11 costs
I_max = 47.919 bits against a 29-survivor gap: 0.6052 survivors per bit at the
linear price. Pre-registered diagnostic was area under the normalised envelope
(0.5 linear, > 0.5 concave, < 0.5 convex).

| family | AUC |
|---|---|
| exact all-or-nothing lattice (1024 revelations) | **0.4774** |
| published prefix chain on the same axis | 0.5184 |
| combined over all three families evaluated here | **0.5091** |

The diagonal test on the combined envelope, which is the best certified lower
bound on the unconstrained dial this session produced:

| fraction of I_max spent | floor bought | fraction of the 16 → 45 gap |
|---|---|---|
| 10% | 20 | 13.8% (above the diagonal) |
| 25% | 23 | 24.1% |
| 50% | 30 | 48.3% |
| 75% | 38 | 75.9% |
| 90% | 42 | 89.7% |

Flat on the diagonal, within a point, everywhere except the first tenth. The
verdict on the bit axis is **linear, not concave**, and it is the same verdict
the prime axis gives.

### 2d. Bits are the wrong currency, and the run says why

The touch-count ceiling is indexed by *primes named*, not by bits, and the two
come apart. Dropping a tenth of the classes at every prime (φ = 0.90) touches
all ten primes, so the touch-count ceiling permits 45 — and costs 1.201 bits,
against which the measured floor is 18. Conversely
anchoring the six best primes costs 26.723 bits and delivers 34, while
spending 30.784 bits spread thinly across all ten delivers 32. The honest
statement is two-part: **the ceiling is set by how many primes are named, and
within a fixed count the bits decide where in [16, envJ[j]] the floor lands.**

The greedy partial family is not a badly chosen one. Against a seeded random
control at identical bit cost: at 9.444 bits the f-greedy revelation floors at
23 while twelve random revelations of the same size run min 17, mean 18.50,
max 20; at 18.865 bits, 29 against mean 22.83; at 30.784 bits, 32 against mean
29.58. [MEASURED]

---

## 3. Scope, stated as a limit and not as a caveat

D(B) — the maximum floor over *all* revelations of cost ≤ B — is a max over
∏2^(q_i − 1) objects and was not computed. What was computed:

- **Exact upper bound**, valid for every revelation: the touch-count ceiling
  envJ (§2a). This is the only exact statement here about the unconstrained
  dial, and it is indexed by primes.
- **Exact lower bounds**: the 1024-set lattice, a greedy-choice partial
  family (19 budgets), and a mixed family (77 revelations), each floor exact
  for the revelation it names.

So "the dial is linear" means: its exact prime-axis ceiling is linear to
within 1.10 of 29, and the best lower bound this session found on its bit axis
sits on the diagonal to within a point. It does **not** mean some cleverer
revelation family cannot beat the combined envelope between the diagonal and
the touch-count ceiling. It does mean no revelation family whatsoever beats
envJ.

---

## 4. @13: what was computed, and the one shape statement that needs no unknown

By instruction the full @13 adversarial minimum was not attempted; it stays
PARKED at [21, 152] with its priced cost of 2–5 × 10¹⁰ nodes [CITED,
`attack-advmin-1113.md` §3]. The conditioned problem gets *cheaper* as j
rises, so the affordable end at @13 is the top of the ladder, not the bottom.

Computed exactly, node budget 8 × 10⁵ per rung, descent stopped at the first
trip (j = 17, NOT COMPLETED at 800,001 nodes):

    j = 18..34:  205, 213, 217, 221, 225, 229, 238, 246, 255, 259,
                 265, 272, 278, 285, 291, 300, 307

At j = 18 the certificate has been handed 99.32 of 211.75 bits (46.9%) and
stands at 205 against the truth 307; the staircase floor with no class
information at all is 110 [STC].

**The level of that curve decides nothing about shape**, because the dial's
own bottom is unknown: normalising at advmin@13 = 21 reads concave, at 152
reads convex, and both are inside the certified bracket. The run prints both
columns rather than picking one.

**One shape statement at @13 needs no unknown.** Concavity in j means the
increments decay as j rises. The sixteen computed increments are
8,4,4,4,4,9,8,9,4,6,7,6,7,6,9,7 — mean 6.38, lower-j half 6.25, upper-j half
6.50, ratio **1.040**. They do not decay; the last prime read (q = 173) is
worth 7, as much as any. That is the same non-decay @11's exact envelope
shows at ratio 1.071, obtained here without touching advmin@13. [MEASURED]

---

## 5. The two dials are different axes, and the concave one was already judged

The brief reads Face 3's *history-blindness* and this attack's *class-blindness*
as one dial. They are two, and the repo carries a curve for each.

| axis | what varies | bottom → top | AUC | shape |
|---|---|---|---|---|
| **class** (this attack; [UNI] SEC 5) | which residue classes the cap's conclusion may name | 16 → 45 @11 | 0.4774 / 0.5091 | linear |
| **depth K** (Face 3's own; [UNI] SEC 3) | how many earlier primes enter the cap as freshness moduli | 36 → 45 @11, 115 → 307 @13 | **0.8264 / 0.8524** | front-loaded |

The depth dial is the concave one the brief hoped for: at @11 the unified-cap
floor runs 36, 40, 43, 44, 44, 44, 44, 44, 45, 45, 45, so eight of the nine
points of the 36 → 45 climb are bought by K = 3 of 10 [CITED, [UNI]].

That curve was measured on 2026-08-20 and its own producer already records why
it is not a route: at full depth capU(q) = fresh(q) exactly, so the family
degenerates into the march, and truth needs K = 8 of 10 at @11 and K = 28 of
34 at @13 (`attack-anchored-01.md` §4, §6). The front-loading is real and the
last rungs are the expensive ones. So the answer to "is there a concave dial
here" is yes, on the depth axis, and it has been on the books for six days
with its limitation attached.

Note also that the two axes are nested rather than orthogonal: the unified
ladder reads all ten classes at *every* K, which is exactly why its K = 0
floor of 36 already exceeds the class-blind ceiling of 16.

---

## 6. The circularity check, run explicitly

The brief asks whether supplying the strike locations is circular, since "the
anchor's locations are the arithmetic itself". The check comes back **negative,
and the premise needs correcting**.

**There is nothing to supply.** At the anchor a_q = 0 for every scour prime,
by definition of the arithmetic Scour: q strikes the multiples of q and the
multiples of q minus 2. No oracle, no enumeration, no unproven input is needed
to name those classes, and the unified-cap ladder already names them — which
is precisely why its floors (36 through 45) escape the class-blind ceiling of
16 [CITED, `redteam-0820-structural.md` §2d].

So the dial is **not** an information-acquisition cost. It is a
proof-complexity cost: how many distinct residue-class facts a cap's
conclusion has to name. The touch-count ceiling says that number is 6 of 10 to
reach the published floor, 7 of 10 to pass it, and 10 of 10 to reach truth.

**The Hagedorn failure mode does not apply.** `REFUTED.md` row 30 died because
the construction needed the first-twin-slot question, which is the postulate.
Nothing in this dial needs to know which slots survive in order to name a
class. Checked concretely: of the 29-survivor gap between the adversarial
witness and the anchor, only 3 lie below the Scour's protection radius 167 —
the part Cofactor Rigidity hands over for free — and 26 lie above it, so the
gain is not a restatement of what rigidity already proves. [VERIFIED]

**Nor is it a wrong-direction arrival.** The four sub-targets in this corpus
that turned out secretly TPC-equivalent (row 64's δ bound, row 65's H″ moment
form, row 66's L = 1 residue count, and the θ-ladder's sharp maximal law) all
share the shape "this weaker-looking statement implies the postulate". This
one has the opposite shape: it is a measured upper bound on what a family of
certificates can certify, and it makes the conjecture no easier.

**Where the real degeneracy sits, and it is not new.** A certificate that
names every scour prime's class and takes every earlier prime as a freshness
modulus is the march performed in different notation. That is not circularity
in the row-30 sense; it is the vacuity `attack-anchored-01.md` §4 already
recorded. This session's contribution is to price how far one can retreat from
it: not far — the ceiling falls 2.90 survivors for every prime not named.

---

## 7. Verdict

**The route is CLOSED as a lemma shape at @11**, on three numbers:

1. envJ[3] = 24 — three primes' classes cap the certifiable floor ten *below*
   the staircase's published 34. [PROVEN, tight]
2. Envelope increments mean 2.90, max deviation 1.10 of 29 from a straight
   line, upper/lower ratio 1.071. The price of history is proportional to the
   scour. [MEASURED, exact]
3. Combined bit-axis AUC 0.5091 against 0.5 for a linear dial. [MEASURED]

A cap needing only j = 3 primes' locations was the lemma-shaped target named
in the brief. At @11 it exists and it certifies 24, which is weaker than what
is already in print. The reverse question — how few primes may go unnamed
before the ceiling drops below the published floor — has the answer four:
naming six of the ten reaches 34 exactly, naming seven passes it.

**What would falsify the closure.** A level whose touch-count ceiling is
*sublinear* in j — where naming a vanishing fraction of the scour still
certifies a positive fraction of the truth. Producing that curve at @13
requires advmin@13 and the intermediate latF[T] values, which needs the parked
exact search; the descent here reached j = 18 and stopped. So the extension is
**priced, not decided**, exactly as it was on 2026-08-20. Nothing in the two
levels measured points toward sublinearity: the @11 ceiling is linear to 3.8%
and the @13 increments do not decay (ratio 1.040).

**No collisions.** Row 77 (class-uniform joint caps, advmin@11 = 16) is
*extended*, not re-proposed: it is the j = 0 case of §2a's theorem, and this
work stays inside the anchored-aware family that row explicitly leaves alive.
Row 82 (mirror symmetrization) is untouched — no symmetrization appears here.
Row 30 (Hagedorn circularity) is checked against in §6 and does not apply.

**Novelty, honestly.** §2a's theorem is a one-line monotonicity argument. It
is novel to this repo only in that nobody had written down the j > 0 case of
row 77's quantifier. The forcing ladder is not novel at all — it is six days
old and already canonical. The lattice, the bit indexing and the sub-prime
dial are new measurements on an old object.

---

## 8. NOT REACHED

- advmin@13 exact. Untouched; stays [21, 152] [ADV].
- @13 for j < 18, and every latF[T] at @13 with T not a prefix — so the @13
  touch-count ceiling does not exist.
- The unconstrained D(B). Bounded above only by envJ (exact, prime-indexed)
  and below by three families; the gap between the combined envelope and envJ
  is unexplored.
- Any level above 13. The @17 lattice needs the segmented-march engines, and
  its adversarial minimum is far past @13's parked price.
- Whether the touch-count fraction (6/10 and 7/10 at @11) is level-stable.
  That is the quantity that decides whether the certificate's information
  content grows like the scour, and it rests on one level.
- The depth axis was not recomputed; §5's AUC figures are derived from cited
  [UNI] curves, not re-measured.

---

## 9. Reproduction and custody

```
node research/attack-history-dial-01.js                        # 231.4 s, one process
node research/qc/embed.js --check --timeout 900 research/attack-history-dial-01.js
```

No wall-clock figure is printed anywhere in the producer, so the output is
byte-identical across runs and `--check` binds it. Custody inside the run: six
calibration gates abort before any dial number is computed (§1), including a
prune-free exhaustive enumerator on a separate code path; the lattice is
asserted monotone with both endpoints pinned to cited artifacts; every f_i(0)
is asserted against the published single-prime anchoring; the @13 rebuild is
asserted against N = 990 and truth 307; every incomplete search prints NOT
COMPLETED with its node count and certifies nothing. Cited constants carry
their source tags ([ADV], [STC], [UNI]) at the CITED block. The tail carries
code-sha256, out-sha256 and the exact invocation.

**Integration note for the orchestrator (not acted on here):** if §2a survives
an adversarial pass, `REFUTED.md` row 77 has a natural companion line (the
touch-count ceiling as its j > 0 generalisation) and TODO item A's
"cheap-K certificate question" gains a second axis with a measured negative on
it. This report edits neither.
