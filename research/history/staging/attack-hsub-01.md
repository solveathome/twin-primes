# TODO 1d: (H-sub) attacked — three proven reductions, the fold verdict, and no counterexample

<!-- ledger
id: Q-hsub-reductions
status: PARTIAL
todo: 1d
question: Can (H-sub) be proven or refuted, and what does the fold machinery reach?
verdict: Neither, but the statement is smaller: three reductions of the hypothesis are proven, the lemma consuming only power pairs so that it weakens to (H-sub-pow) with the conclusion unchanged, the fold machinery's inability to reach any of them is made exact, and the hunt over all 111 reachable pairs found no drifting family and no counterexample.
-->

*2026-08-20. Producer: `research/attack-hsub-01.js` (0.1 s,
`code-sha256 f14f5789`, `out-sha256 ee4e9643`, formal embed with input
hashing, seven numbered readings; fingerprint verified with `embed.js
--check` after writing). One defect was found in the producer's own first
run and repaired before this report's numbers were read: the proven-floor
check's slack accumulator initialized at 0, capping its printed minimum —
the could-not-fail class. The re-embed used `--force` (the tool's
corrected-code path); the override is stamped in the tail. Nothing was
committed or pushed; no existing corpus document was edited. HELD, not integrated — awaiting the standing one-pass
adversarial review. Legend as in `research/sift-limit-attack.md`: **[PROVEN]**
published theorem or a proof given here; **[VERIFIED]** checked
computationally here; **[MEASURED]** empirical, finite range; **[INFERRED]**
deduction from sourced facts.*

---

## 0. The verdict, up front

> **(H-sub) is not proven and not refuted, but it is now a smaller statement
> aimed at a wider window, and the pass found one target the trap cannot
> touch. Three reductions of the lemma's hypothesis are proven; the fold
> machinery's inability to reach any of them is made exact; and the hunt
> over all 111 reachable pairs found no drifting family and no
> counterexample.**
>
> 1. **The lemma consumes only power pairs.** Its own eight-line proof uses
>    (H-sub) at the pairs `(b^k, b)` and nowhere else, so the hypothesis
>    weakens to (H-sub-pow) with the conclusion unchanged. The record
>    defects 1.0761 at (4,10) and 1.0330 at (4,12) are not power pairs and
>    stop constraining the route: the trap window widens from
>    `[1.0761, 1.3946)` (0.3185 nats) to **`[1.0033, 1.3946)` (0.3913 nats,
>    trusted)** and `[0.9694, 1.3555)` (0.3861, custody-only). **[PROVEN /
>    VERIFIED]**
> 2. **One chain carries the TPC face; no chain carries existence.** A single
>    base `b₀` with chain defect `K < S(b₀)` forces `limsup < 2`; limit
>    existence needs chains at inf-realizing bases. And the chains that
>    decide the trap (bases 16 and 66) have **zero reachable pairs** — the
>    decisive family is dataless. **[PROVEN / VERIFIED]**
> 3. **The doubling slice is trap-free and prize-bearing.** `Ĝ(2s) ≤ C₂·Ĝ(s)`
>    gives `limsup ≤ log₂C₂`; its TPC line `C₂ < 4` is already excluded by
>    custody data (`C₂ ≥ 348/66 = 5.2727`), so no provable doubling constant
>    is TPC-implying through the slice's own conclusion — and every
>    `C₂ ∈ [5.2727, 19.2455)` lowers the proven
>    exponent ceiling 4.2665 to `log₂C₂ ∈ [2.3985, 4.2665)`. A 1.29-nat
>    landing zone with no trap in it. **[PROVEN the implication; VERIFIED
>    the window]**
> 4. **The fold machinery cannot reach (H-sub), exactly.** The fold step is
>    `×p_next/p ≤ 5/3 < 2` in Ĝ's argument coordinate — below the integer
>    floor `t ≥ 2` — so every admissible pair is multi-fold; (H-sub) is
>    identically a head-dominance statement about the nonnegative
>    fold-budget sequence, and the proven tools bound the defect from the
>    side it does not need. **[PROVEN / VERIFIED]**
> 5. **No counterexample.** Max `D = 1.0761` at (4,10), min `−0.2400` at
>    (7,7); the (4,t), (s,2) and diagonal families all read bounded against
>    the in-pass constant-defect null. **[MEASURED]**

---

## 1. Reduction 1: the hypothesis shrinks to power pairs, and the floor drops

Re-reading the proof in `attack-fekete-1d-02-lemma.js`: the limsup half
iterates `f(b^{k+1}) = f(b^k·b) ≤ f(b^k) + f(b) + K` — the pair `(b^k, b)` —
then bridges intervals with the proven (H-mono); the liminf half uses only
the definition of the inf. No other pair is ever consumed. So

> **(H-sub-pow)** `f(b^{k+1}) ≤ f(b^k) + f(b) + K` for all integers `b ≥ 2`,
> `k ≥ 1`

implies the full conclusion — `lim f(n)/ln n = inf_n (f(n)+K)/ln n` exists,
and `β < 2 ⟺ S(n) > K at one integer` — by the existing proof, character for
character. **[PROVEN, by inspection of the existing proof]**

The consequence is a data statement. Only 15 power pairs are reachable
(9 custody), and the family's sup defect is

| grade | floor | at | rests on |
|---|---|---|---|
| trusted | **1.0033** | (16,4) — base-4 chain, k = 2 | `Ĝ(64) = G₂(61#) = 1080` (Wang 2024 a(18) — the same term as the 1.3946 ceiling) |
| custody | **0.9694** | (16,2) — base-2 chain, k = 4 | `G₂(31#) = 348`, `G₂(13#) = 66`, corpus-exact |

(4,10) and (4,12) are not of the form `(b^k, b)` (verified), so the two
worst defects on the 111-pair table no longer bound the constant the route
needs. **The trap window is now `ln C ∈ [1.0033, 1.3946)` at trusted grade —
0.3913 nats, 23% wider than the standing 0.3185 — and `[0.9694, 1.3555)`,
0.3861 nats, on custody terms alone.** Ceilings are unchanged: they belong
to the conclusion formula (`max_b S(b)`), not to the pair family.
**[VERIFIED]**

## 2. What a cofinal chain buys — the exact answer to the composition question

The task asked whether a proof on a cofinal sub-family, composed along the
ladder, feeds the lemma. Split by face:

- **Limsup face (which is the TPC face).** (H-sub-pow) at ONE base `b₀`
  gives `limsup f(n)/ln n ≤ (f(b₀)+K)/ln b₀`; so `K < S(b₀)` on one
  geometric chain forces `limsup < 2`. More generally a cofinal chain with
  two-sidedly pinned steps `a·n_j ≤ n_{j+1} ≤ b·n_j` (`a > 1`) and
  `f(n_{j+1}) ≤ f(n_j) + f(b) + K` gives `limsup ≤ (f(b)+K)/ln a`. Steps
  pinned only from above lose the denominator and give nothing. **[PROVEN]**
- **Existence face.** No single chain, and no base subset `B`, gives limit
  existence: `limsup ≤ inf_{b∈B}(f(b)+K)/ln b` but `liminf ≥ L` takes the
  inf over ALL `n`, and the two close only when `B` realizes the inf —
  unknowable in advance, so the clean sufficient family is all-bases power
  pairs (Reduction 1) and nothing smaller. **[PROVEN]**
- **The decisive chains are dataless.** No base `b ≥ 10` has a single
  reachable pair (`b² > 82`), so the chains at the threshold bases 16 and 66
  — the ones whose `K < S(b₀)` would be TPC — are constrained by no
  measurement the corpus owns; the trap-window floor comes entirely from
  bases 2..9. **[VERIFIED]**
- **The "fold-step family" (s a primorial level, t the next prime) does not
  exist inside the candidate.** See §4(i): the fold step is a sub-integer
  multiplier, and the corpus's own domain correction (real bases die at
  `ln C ≥ 2.01`, `import-interp.md` §4) forbids restating the candidate
  down there. **[INFERRED, from verified ingredients]**

## 3. The slice ladder: per-slice traps, and the doubling window

Fixing `t₀` and quantifying over `s` (the slice contains its own base chain
`(t₀^k, t₀)`) gives `limsup ≤ (f(t₀)+K_{t₀})/ln t₀`: TPC-implying iff
`K_{t₀} < S(t₀)`; improves the proven `β₂ = 4.26645` (`dhr-verification.md`
row 1a) iff `K_{t₀} < β₂ ln t₀ − f(t₀)`. Measured floors against both lines
(full table in the producer):

| t₀ | reachable sup D | S(t₀) | trap | improvement ceiling |
|---|---|---|---|---|
| 2 | 0.9694 (custody) | 0.6931 | **closed by data** | 2.2641 |
| 3 | 0.5810 | 0.4055 | closed | 2.8954 |
| 4 | 1.0761 | 0.9808 | closed | 4.1228 |
| 5 | 0.7697 | 0.7340 | closed | 4.3817 |
| 6 | 1.0415 (custody) | 1.0986 | **OPEN, width 0.0572** | 5.1595 |
| 7..13 | — | — | all OPEN, wider | — |

Two headlines fall out:

**The doubling window (t₀ = 2) — the pass's sharpest find.** In constant
form the slice is `Ĝ(2s) ≤ C₂·Ĝ(s)` and the conclusion is
`limsup ln G₂(x#)/ln x ≤ log₂C₂`. Custody data already force
`C₂ ≥ Ĝ(32)/Ĝ(16) = 348/66 = 5.2727 > 4`, so **no provable doubling constant
can be TPC-implying — the explicit-constant trap that guards every other
face of this route is void on the doubling slice**, and a soft proof is not
excluded by trap logic. Simultaneously every `C₂ ∈ [5.2727, 2^{β₂} =
19.2455)` lowers the proven exponent ceiling: `limsup ≤ log₂C₂ ∈ [2.3985,
4.2665)`. One inequality — a per-doubling growth cap on the twin-gap ladder
— with a 1.29-nat-wide landing zone in which every point is consistent with
all data, non-TPC, and an unconditional improvement of the corpus's
strongest proven upper bound. **[PROVEN the implication; VERIFIED the
window; the inequality itself is OPEN]**

**The t₀ = 6 slice trap is nearly shut.** Any explicit
`K₆ ∈ [1.0415, 1.0986)` — 0.0572 nats, floor at the custody-exact (4,6) —
is TPC-implying, with implied bound 1.9681 at the floor. This does not
displace the general trap window; it records that a single fixed-t
inequality at t = 6 is already TPC-strength on a margin five times thinner
than the general one. **[VERIFIED]**

## 4. Structure first: the exact reason the fold machinery falls short

**(i) The fold step is not an integer pair.** In Ĝ's argument coordinate the
fold `G₂(p_n#) → G₂(p_{n+1}#)` is multiplication by `p_{n+1}/p_n ≤ 5/3 < 2`
(max at 3→5; verified at all 21 steps). The candidate's floor `t ≥ 2` —
forced when real bases died at `ln C ≥ 2.01` — sits strictly above the
one-fold regime, so every admissible pair crosses
`π(st) − π(s) ≥ π(2s) − π(s) ≥ 1` folds (Bertrand), unboundedly many as `s`
grows (the (4,10) pair already spans 10 folds; verified minimum 1, at
(2,2)). A constant per-fold cap compounds to `exp(#folds)`: no one-fold
theorem composes into (H-sub). **[VERIFIED on the range; the Bertrand floor
is PROVEN]**

**(ii) (H-sub) in fold coordinates is head dominance.** With
`r_1 = ln G₂(2#)` and `r_i = ln[G₂(p_i#)/G₂(p_{i−1}#)] ≥ 0` — nonnegative
by the PROVEN (H-mono) — the identity
`f(st) − f(s) = Σ_{π(s) < i ≤ π(st)} r_i` holds (verified to max dev
1.78e−15 at all 111 pairs), so (H-sub) is exactly: **the budget spent in the
window `(s, st]` never exceeds the budget of the first `π(t)` folds
plus K.** The window holds ~`st/ln st` folds against the head's `π(t)`; the
candidate is a statement that late fold budgets thin out, which is global
regularity, not local structure. The three worst pairs decompose cleanly
(e.g. (4,10): 10-fold window budget 4.4773 vs 4-fold head 3.4012, excess =
D = 1.0761). **[PROVEN the identity; VERIFIED]**

**(iii) The proven tools point the wrong way.** The copy theorem and
(H-mono) (folding deletes slots, deletion merges gaps) and the block-ladder
record's disjoint-set super-additivity all give LOWER bounds on `Ĝ(st)` —
they prove `D(s,t) ≥ −min(f(s), f(t))` (one line from (H-mono); holds at
every pair with strictly positive slack, minimum 0.6931 at (2,3), and the
measured min D −0.2400 sits far above its floor −3.4012 at (7,7)). The
Mirror-Sweep Lemma is symmetry structure within ONE fold
(alignment `a` and `w−a` degrade equally); it halves fingerprints and
locates seam anomalies but carries no magnitude bound and nothing that
composes across folds. No named sub-family of (H-sub) is provable with the
corpus's current machinery, and this pass proves none. **[PROVEN the floor;
INFERRED the assessment]**

## 5. The hunt: no counterexample, no drift

Over all 111 reachable integer pairs (`st ≤ 82`, trusted 22-term ladder,
cross-checked against `attack-fekete-1d-01`'s headline numbers to four
places):

- **Extremes.** Max `D = 1.0761` at (4,10); the next four are (4,6) 1.0415,
  (4,12) 1.0330, (6,12) 1.0202, (4,16) 1.0033. Min `D = −0.2400` at (7,7);
  7 of 111 pairs are negative (the super-multiplicative side). **[VERIFIED]**
- **The (4,t) family** — carrier of both record defects — peaks at t = 10
  (the 37-spike) and every `t ≥ 13` sits below the peak. Slope against
  `ln t`: `+0.0808 ± 0.0957` raw, `−0.0020 ± 0.1143` against the in-pass
  constant-defect null (POW, same primes, same step construction).
  **Consistent with bounded; no drift.** **[MEASURED]**
- **The doubling family (s,2)**, s = 2..41: `−0.0336 ± 0.0596` against the
  null. Consistent with bounded. **[MEASURED]**
- **The diagonal (b,b)**, b = 2..9 — the one place an unbounded defect could
  live under a power-log law: reads `−0.5188 ± 0.3966` BELOW the
  constant-defect null (1.3 σ, 8 points), i.e. leaning toward the
  decreasing-defect (super-multiplicative) side. The diagonal remains blind
  past `√82 ≈ 9`, exactly as `attack-fekete-1d-01` reading 7 recorded; this
  pass adds data consistent with "not growing" and cannot exclude growth.
  **[MEASURED]**

An honest "the defect grows along family F" would have killed the route; no
reachable family shows it.

## 6. Trap grading of everything this pass produced

No explicit K was derived (nothing here proves an instance of (H-sub)), so
nothing trips the trap. What moved are the WINDOWS, graded per the standing
rule against `[1.0761, 1.3946)` trusted / `[1.0761, 1.3555)` custody:

| object | window | grade | status vs trap |
|---|---|---|---|
| power-pair candidate (Reduction 1) | `ln C ∈ [1.0033, 1.3946)` | floor rests on Wang a(18); ceiling likewise | trap WIDENED 0.3185 → 0.3913 nats |
| power-pair candidate, custody | `ln C ∈ [0.9694, 1.3555)` | fully custody | 0.3861 nats |
| single-chain TPC face (base 16 / 66) | any `K < 1.3555 / 1.3946` | custody / trusted | TPC-implying; family dataless |
| t = 6 slice | `K₆ ∈ [1.0415, 1.0986)` | custody | TPC-implying, width 0.0572 |
| doubling slice | `C₂ ∈ [5.2727, 19.2455)` | custody floor | **trap-free**: TPC needs `C₂ < 4`, excluded by data; every point improves 4.2665 |

## 7. NOT REACHED

- **No instance of (H-sub) proven, for any family.** The three reductions
  are quantifier surgery on the lemma — they change what must be proven, not
  what is proven. The route's gap is smaller and better lit, still open.
- **The doubling inequality `Ĝ(2s) ≤ C₂·Ĝ(s)` is posed, not attacked.** It
  is the natural next target (trap-free, prize-bearing); this pass did not
  attempt a proof and does not know whether one is soft.
- **No new defect data.** The reachable pair set is capped at `st ≤ 82`
  until the ladder grows; the first riser enumeration (61#) remains
  ~146,969× the 43# run.
- **The diagonal stays invisible past b = 9.** Growth of the true defect on
  the diagonal is neither seen nor excluded; the -01 blind spot stands.
- **de Bruijn–Erdős Theorem 22 remains unopened**, consistent with the
  bounded reading; nothing here cites its content.
- **Whether the reductions compose** (e.g. power pairs at prime bases only,
  giving the prime-base threshold `max_q S(q) = 1.2946` trusted) was
  computed in exploration but not carried into the producer; the all-bases
  form of Reduction 1 is the operative statement.

## 8. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/attack-hsub-01.js` | everything above: the three reductions (proofs in the header), the power-pair table, the slice ladder, the fold-budget identity, the traces with in-pass nulls (§§1–6) |
| `research/attack-fekete-1d-02-lemma.js` | the lemma whose proof Reduction 1 inspects; (H-mono) proven + verified |
| `research/attack-fekete-1d-01-defect47.js` | the 111-pair table this pass cross-checks; the threshold freeze |
| `research/history/staging/fekete-1d.md`, `redteam-0820-math.md` §1 | the route's state and the trusted-ladder trap window this pass widens |
| `research/history/staging/import-interp.md` §§3–4 | the defect identity; the real-base death that forces `t ≥ 2` |
| `research/history/staging/attack-0c-holesweep.md` §4 | the Mirror-Sweep Lemma assessed in §4(iii) |
| `research/dhr-verification.md` row 1a | `β₂ = 4.26645028414864191641`, the proven ceiling the doubling window lowers |
| `research/exact-g2-ladder.js`, `research/import-interp-01-bgt-defect.js` | the two ladders, parsed at run time, input-hashed by the embed |

Reproduce with `node research/qc/embed.js --check research/attack-hsub-01.js`;
the fingerprint matches as of 2026-08-20.
