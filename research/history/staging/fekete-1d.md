# TODO 1d: the bounded-defect Fekete route, probed at 47#

<!-- ledger
id: Q-fekete-1d-defect47
status: PARTIAL
todo: 1d
question: Does the bounded-defect Fekete route survive a probe at 47#?
verdict: The defect at 47# is ordinary and the 47# enumeration cannot move item 1d's TPC threshold whatever value it returns; the bounded-defect Fekete lemma is stated exactly and proved with every hypothesis except the candidate itself discharged, so the route reduces to one named inequality and is neither closed nor open beyond that.
-->

*2026-08-20. Producers: `research/attack-fekete-1d-01-defect47.js` (0.1 s,
`code-sha256 45554df4`, `out-sha256 afc6d190`, formal embed, seven numbered
readings) and `research/attack-fekete-1d-02-lemma.js` (0.2 s,
`code-sha256 62cb37d9`, `out-sha256 1c99d42b`, formal embed, six numbered
readings). Both fingerprints verified with `embed.js --check` after writing.
Nothing was committed or pushed; no existing corpus document was edited.
Legend as in `research/sift-limit-attack.md`: **[PROVEN]** published theorem or
a proof given here; **[VERIFIED]** checked computationally here; **[MEASURED]**
empirical, finite range; **[INFERRED]** deduction from sourced facts;
**[CERTIFIED]** follows from a replay-verified corpus certificate.*

---

## 0. The verdict, up front

> **The defect at 47# is ordinary, the one unverified term cannot move any 1d
> reading, and — the sharpest thing this pass found — the 47# enumeration
> cannot move 1d's TPC threshold either, whatever value it returns. The
> bounded-defect Fekete lemma is stated exactly, proved, and every hypothesis
> except the candidate itself is now discharged. The route is reduced to one
> named inequality.**
>
> 1. **The defect at 47#, exactly.** Ten integer pairs land in `[47, 53)`. The
>    largest defect is `D = 1.0330` nats at `(4,12)` — second largest on the
>    whole 111-pair table, 0.0431 under the global sup `1.0761` at `(4,10)` —
>    and the all-prime pair `(7,7)` reads `−0.2400`. The 47-window ranks 3rd of
>    21 windows. Nothing about it is extreme. **[VERIFIED]**
> 2. **The 704-vs-708 discrepancy is immaterial.** The greedy's replay-verified
>    covering gives `G₂(47#) ≥ 705`; A144311 says 708. The worst shift any
>    defect reading can take from that bracket is `ln(708/705) = 0.00425`
>    nats — 66× below the smallest margin in play. A144311 would have to be low
>    by ≥ 32 (4.5%) before the reachable sup C moved. **[VERIFIED]**
> 3. **REFUTATION: 1c's "each new ladder-known x raises 1d's TPC threshold" is
>    false at 47#, and certified false — no enumeration outcome can change
>    it.** The custody integer threshold is `S(16) = ln(256/66) = 1.3555`, a
>    13#-fact. The 47-window's best is `S(52) = ln(2704/G₂(47#)) ≤
>    ln(2704/705) = 1.3443 < 1.3555`, capped from above by the certified
>    greedy floor. Same freeze at 53# (cap 1.3524) and 59# (cap 1.3280). The
>    first term that can raise it is x = 61, and a 61# enumeration is
>    ~146,969× the 43# run. **[CERTIFIED]**
> 4. **The defect reads BOUNDED on a second instrument, and custody-only.**
>    Per-window sup slopes: G₂ minus the constant-defect null =
>    `−0.0414 ± 0.0846` (22 terms) and `−0.0188 ± 0.1466` (14 custody terms) —
>    consistent with bounded both times, and the verdict does not lean on the
>    eight literature terms. **[MEASURED]**
> 5. **What a bounded defect buys, exactly.** The multiplicative Fekete lemma
>    (stated and proved in `attack-fekete-1d-02-lemma.js`, eight lines):
>    conditional on the candidate with ANY constant, `β = lim ln G₂(x#)/ln x`
>    **exists** and equals `inf_n (ln Ĝ(n) + K)/ln n`; and
>    `β < 2 ⟺ S(n) > K at a single integer`. Existence is the honest prize;
>    the explicit-constant version is TPC-strength. **[PROVEN, given the
>    candidate]**

---

## 1. What "probe 47#" can and cannot mean, priced

The exact enumeration at 47# is already priced by direct probe: **1.49 days per
run, two disjoint-mask runs required** (`phase1-T2b-exact-ladder.md`), so it was
not launched here — that is 1c's task, with 1c's Poisson-window
pre-registration discipline. What the corpus already holds at 47# is a bracket:

| source | value | grade |
|---|---|---|
| greedy covering of `[1, 704]`, replay-verified | `G₂(47#) ≥ 705` | CERTIFIED (`greedy-oracle-validation.md` §3) |
| OEIS A144311 a(15), Alekseyev 2009 | `G₂(47#) = 708` | literature, unverified here |

Every reading below is taken at both endpoints of that bracket, which is what
makes this a probe rather than a wait.

## 2. The defect at the 47-window

`D(s,t) = ln[Ĝ(st)/(Ĝ(s)Ĝ(t))] = S(s)+S(t)−S(st)` (the identity, PROVEN in
`import-interp.md` §3, re-verified here to `5.6e−16` at all pairs). The ten
pairs with `st ∈ [47, 53)`, at the published 708:

| pair | st | R | D (nats) |
|---|---|---|---|
| (4,12) | 48 | 2.8095 | **1.0330** |
| (5,10), (6,8) | 50, 48 | 1.9667 | 0.6763 |
| (3,16), (4,13) | 48, 52 | 1.7879 | 0.5810 |
| (2,24), (2,25), (2,26) | 48, 50, 52 | 1.7353 | 0.5512 |
| (3,17) | 51 | 1.0926 | 0.0886 |
| (7,7) | 49 | 0.7867 | −0.2400 |

The window's sup ranks **3rd of 21 windows** (behind p = 37's 1.0761, which is
the global sup, and p = 71's is 1.0202 just below); the running per-window sup
last rises at the p = 37 window and is flat over the ten windows after it.
**[VERIFIED]**

**Sensitivity.** At `G₂(47#) = 705` and at 708 alike: sup C stays 2.9333 at
(4,10), every threshold stays put, and the maximal shift of any D is 0.00425
nats. The flip value is `G₂(47#) ≥ 740` — pair (4,12) would then overtake
(4,10) — i.e. A144311 low by ≥ 32. Below 705 is excluded by the certificate.
**[VERIFIED]**

## 3. The threshold freeze, which corrects two records

TPC-implication for an explicit constant is `ln C < S(b)` at a ladder-known
integer base `b` (`import-interp.md` §4). The threshold column, recomputed:

| ladder | threshold `max_b S(b)` | at base |
|---|---|---|
| full 22-term (8 literature terms) | 1.3946 | b = 66 — **rests on Wang 2024's a(18), `G₂(61#) = 1080`** |
| custody-only, 14 exact terms | **1.3555** | b = 16 — rests on `G₂(13#) = 66` |
| custody + 47# verified (at 708 or 705) | 1.3555 | b = 16, unchanged |

Because `S(b) = ln(b²/Ĝ(b))` **falls** as `Ĝ` rises, a certified lower bound on
`G₂` is a certified **upper** bound on the window's best S. The greedy floors
therefore freeze the next three windows below the standing custody max:

| window | best base | cap `ln(b²/floor)` | can raise 1.3555? |
|---|---|---|---|
| [47,53) | 52 | 1.3443 | no, certified |
| [53,59) | 58 | 1.3524 | no, certified |
| [59,61) | 60 | 1.3280 | no, certified |
| [61,67) | 66 | 1.3992 | **yes** — fires iff verified `G₂(61#) ≤ 1123` (published: 1080) |

**Two corrections follow.** (i) TODO 1c's stated win "each new ladder-known x
raises 1d's TPC threshold, directly loosening the constraint" is wrong at 47#
— and not merely at the published value: **certified wrong for every possible
enumeration outcome**, and equally at 53# and 59#. The first riser is x = 61,
whose enumeration is `47·53·59 = 146,969×` the 43# run (~1 h on ten cores) —
out of reach by ~5 orders of magnitude. (ii) The corpus's quoted integer
threshold 1.3946 is a **literature-conditional** number (Wang 2024's a(18));
the custody-grade threshold is 1.3555 and is effectively frozen there.
**[CERTIFIED / VERIFIED]**

**The 1d position now stands on custody terms alone.** The reachable sup
`C = 2.9333` is attained at (4,10) from `G₂(7#) = 30` and `G₂(37#) = 528`, both
corpus-exact; the threshold 1.3555 is a 13#-fact. The candidate's TPC window is
`C ∈ [2.9333, 3.8788)`, `ln C ∈ [1.0761, 1.3555)` — 0.2794 nats wide — with no
literature term anywhere in it. Any proof of the candidate with a constant in
that window is a proof of `β < 2`. **[VERIFIED]**

**One domain-cap artifact repaired in passing:** the recorded integer floor-7
sup 1.5533 (`import-interp.md` §4) was taken under `st ≤ 79`; `Ĝ` is known on
`[2, 83)`, and the widest legal domain admits (8,10), st = 80, with
`R = 1.9000` — equal to the recorded real-form sup, so the real/integer split
at floor 7 was the cap, not structure. No verdict changes. **[VERIFIED]**

## 4. Is the defect bounded?

**Second instrument, same verdict as `import-interp.md` §5.** Per-window sup
`Wmax(p) = max{D(s,t) : st ∈ [p, p_next)}`, slope against `ln p`, nulls sampled
at the same primes and stepped the same way in the same pass:

| ladder | slope ± se | G₂ − POW contrast |
|---|---|---|
| G₂ full (22) | +0.1661 ± 0.0637 | **−0.0414 ± 0.0846 → consistent with bounded** |
| POW null, constant defect | +0.2075 ± 0.0558 | (the calibration: this IS what bounded looks like here) |
| LOG null, decreasing defect | −0.2415 ± 0.0554 | (the instrument is not pinned positive) |
| G₂ custody-only (14) | +0.2526 ± 0.1094 | **−0.0188 ± 0.1466 → consistent with bounded** |

G₂ reads *less* growing than the constant-defect null on both ranges, and the
custody-only row shows the bounded verdict does not lean on the eight
literature terms. **[MEASURED]**

**The instrument's blind spot, stated as a limit.** Every power-log law
`Ĝ ~ c·x^β (ln x)^δ` **with δ ≥ 0** has a bounded window-sup defect
(continuous limit `δ·ln(1/ln 2) − ln c`; for δ < 0 the k = 1 rung diverges
and the defect is unbounded, sign lemma PROVEN in
`attack-0829n-hsubpow-K.md` §3b, qualifier added 2026-08-29), because the
sup is driven by small-s pairs; an
unbounded defect would live on the diagonal, where the largest `√x` any ladder
offers is ~9. So "bounded" is the supported reading under every law the corpus
entertains, and is **not** a demonstrated fact about the true defect — which is
exactly why the honest Fekete target carries an unnamed constant.
**[INFERRED]**

## 5. The exact lemma, hypotheses discharged

> **Lemma (multiplicative Fekete with bounded defect).** Let
> `f : {2,3,4,…} → [0,∞)` satisfy **(H-sub)** `f(st) ≤ f(s) + f(t) + K` for all
> integers `s,t ≥ 2` and some constant `K ≥ 0`, and **(H-mono)** `f`
> nondecreasing. Then `lim f(n)/ln n` exists and equals
> `L = inf_{n≥2} (f(n)+K)/ln n ∈ [0, ∞)`.

Proved in eight lines in `attack-fekete-1d-02-lemma.js`'s header (liminf from
the definition of inf; limsup by iterating (H-sub) on powers of an arbitrary
base and bridging with (H-mono)). de Bruijn–Erdős Theorem 22 — the
growing-defect version — is **not needed**: the measured defect reads bounded
and plain-Fekete shape suffices, exactly as `import-interp.md` §6 anticipated.
**[PROVEN]**

**Why BGT's obstruction does not apply here:** the lemma never asks an integer
to factor. BGT's machine died on H1 (`π(st) ≠ π(s)+π(t)`, the ground set does
not split); this lemma uses (H-sub) on products only, and (H-mono) replaces the
additive ground set in the between-powers bridge. **[INFERRED]**

Hypotheses, for `f = ln Ĝ`:

| hypothesis | status |
|---|---|
| `f ≥ 0` | trivial, `Ĝ ≥ 2` |
| (H-mono) | **PROVEN one line + VERIFIED seven folds**: the twin-slot set of `T_next` is a subset of the periodized slot set of `T_x` (folding only deletes slots; deletion only merges gaps, so `G₂` is nondecreasing). Checked literally by direct sieve at every fold `2→3→…→19`, periods to `9,699,690 = 19#`, reproducing the exact ladder term by term; monotone at all 22 ladder terms |
| (H-sub) | **OPEN — the candidate itself.** Holds at all reachable pairs with `K = 1.0761`; unproven beyond; the route's entire remaining content |

**The conclusion formula, calibrated on known-truth controls** (campaign rule:
estimator on a control in the same pass). On `POW` (true β = 1.546, constant
defect) the finite-range inf reads 1.5901 at n = 10⁶, +2.9% and falling from
above; on `LOG` (true β = 1, δ = 2) it reads 1.5335, **+53%**, with its K
driven by the (2,2) pair. Both approach from above, as the inf-over-a-subset
argument requires. **So the lemma's value output is unquotable at any reachable
range; what it delivers is existence.** **[MEASURED]**

## 6. What a bounded defect buys, and the two faces

Conditional on (H-sub) with **some** constant, never named:

- `β = lim ln G₂(x#)/ln x` **exists** — along integers, hence along reals,
  since `Ĝ` is a step function. 1d's central question becomes well-posed:
  `β < 2` forces `G₂(x#)/x² → 0`, `β > 2` forces it to ∞, and only `β = 2`
  leaves the sublinear part to decide. **[PROVEN, given (H-sub)]**
- `β < 2 ⟺ S(n) > K` at a single integer. This one equivalence is the trap and
  the prize at once: an explicit `K < 1.3555` is TPC-implying (no soft proof
  should be expected), an unnamed `K` buys existence without touching TPC. The
  corpus's `1.8992` at base 16 (`import-interp.md` §4) is this formula at the
  reachable K, reproduced exactly. **[PROVEN given (H-sub); cross-check
  VERIFIED]**

Not bought: any value of β, any movement on `4.2665 → 2`, any unconditional
statement.

## 7. NOT REACHED

- **The 47# enumeration itself.** Priced at 1.49 days per run, two runs
  (`phase1-T2b-exact-ladder.md`); not launched. The bracket `[705, ∞) ∩
  {published 708}` is what this pass used, and §2-§3 show nothing 1d needs
  from the enumeration beyond what the bracket already certifies.
- **No proof of (H-sub), no counterexample, no bound on the true K.** The
  pairs that would decide it need both arguments large; the ladder has none
  (largest `√x` ≈ 9).
- **No exclusion of a growing defect.** §4's verdict is consistency with
  bounded, on an instrument blind to diagonal growth; a non-power-log law
  could hide there.
- **de Bruijn–Erdős Theorem 22 remains unopened** (as in `import-interp.md`
  §9); it is not needed for the bounded shape, and nothing here cites its
  content.
- **The real-base form of the candidate** was not re-examined; the corpus
  instruction to state the candidate on integer bases stands
  (`import-interp.md` §4).
- **Whether 61# could ever be reached by a smarter engine** than direct
  enumeration (the only riser base in reach of the freeze analysis) was not
  investigated; at direct-enumeration scaling it is ~146,969× the 43# hour.

## 8. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/attack-fekete-1d-01-defect47.js` | the 47-window pairs, sensitivity at 705/708, flip values, the threshold freeze, the per-window boundedness instrument with nulls (§§2-4) |
| `research/attack-fekete-1d-02-lemma.js` | the lemma with proof, (H-mono) verified at seven folds, the control calibration, the conditional application (§§5-6) |
| `research/exact-g2-ladder.js` | the 14 custody terms, parsed at run time |
| `research/import-interp-01-bgt-defect.js` | the corpus's A144311 copy, parsed at run time; the headline numbers cross-checked here |
| `research/history/staging/greedy-oracle-validation.md` §3 | the replay-verified greedy floors 705/870/954/1075 |
| `research/history/staging/phase1-T2b-exact-ladder.md` | the 47# price: 1.49 days per run |
| `research/history/staging/import-interp.md` §§3-7 | the identity, the trap statement, the slice-instrument boundedness reading this pass confirms |

Reproduce with `node research/qc/embed.js --check
research/attack-fekete-1d-01-defect47.js` and `node research/qc/embed.js
--check research/attack-fekete-1d-02-lemma.js`; both fingerprints match as of
2026-08-20.
