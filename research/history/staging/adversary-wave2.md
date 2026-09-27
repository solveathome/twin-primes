# Adversarial pass on the four same-evening headlines

<!-- ledger
id: Q-adversary-wave2
status: ANSWERED
todo: none
question: Do the four same-evening headlines (kill shadow, scanstat, sofic, Shearer) survive a refute-first adversarial pass?
verdict: Nothing BROKEN: sofic SURVIVES and the other three SURVIVE WITH CORRECTIONS, the corrections being one verdict label a grade too high by the record's own prereg rule, three false custody sentences and an oversold prediction, a misdescribed extremal witness, and an atomicity hypothesis that is load-bearing and not shown.
-->

*Staging note, 2026-08-19. Refute-first verification of
[shadow-buchstab.md](shadow-buchstab.md), [import-scanstat.md](import-scanstat.md),
[import-sofic.md](import-sofic.md) and [import-shearer.md](import-shearer.md),
all four written and committed inside forty minutes of one evening. Producers,
all three formally embedded and `--check` clean:
[`../../adversary-wave2-01-shadow.js`](../../adversary-wave2-01-shadow.js)
(15.9 s), [`../../adversary-wave2-02-scanstat-sofic.js`](../../adversary-wave2-02-scanstat-sofic.js)
(0.2 s), [`../../adversary-wave2-03-shearer.js`](../../adversary-wave2-03-shearer.js)
(1.1 s). Every recomputation here is a deep-success validation under the standing
compute rule; nothing is re-derived that was not being attacked. **No live
document was edited and no proposed correction was applied. Proposals only.***

---

## 0. The four verdicts

| claim | verdict |
|---|---|
| 1. Kill shadow DERIVED + the drift law | **SURVIVES WITH CORRECTIONS** — the mathematics is right and better than stated; the verdict LABEL is one grade too high by the pre-registration's own rule |
| 2. Scanstat duality + exponent rule + identity refutation | **SURVIVES WITH CORRECTIONS** — the duality and the refutation are theorems; three custody sentences are false and the prediction's precision is oversold |
| 3. Sofic verdict | **SURVIVES** — every number reproduces, the strictly-sofic argument is airtight, and a paired test the record did not run makes its own headline stronger |
| 4. Shearer identity + family closure | **SURVIVES WITH CORRECTIONS** — the identity, the exponent, the floor and the closure all hold; the extremal witness is misdescribed and the atomicity leg needs its hypothesis or its citation changed |

**Nothing is BROKEN.** That is itself worth stating against a base rate of four
corrections in five same-day integrations: the arithmetic in all four records
reproduced from independent code, and every defect found is in a sentence rather
than in a number.

**Cross-contamination: NONE.** Every producer of the four waves cites only files
from its own wave. No scanstat script mentions a sofic artifact, no sofic script
mentions a shearer artifact, and the shadow pair cites only each other.

**Pre-registration custody is not uniform, and only one of the four is
git-provable.** `import-shearer-prereg.md` was committed alone at 19:59:19, six
minutes before its producer's mtime and sixteen before its record — the
pre-registration claim there is verifiable from the history. The other three
preregs were committed in the SAME commit as their records *and* their producer
scripts (20:15:48), so git cannot order them. What can be checked is weaker and
still real: the prereg files' own mtimes (19:58:59 shadow, 19:59:23 sofic,
20:12:15 scanstat) precede their records' (20:12:27, 20:08:27, 20:13:06), and
`import-scanstat-prereg.md` is machine-written by a producer that carries its own
embed. The honest grade is: **one PROVABLE pre-registration and three DECLARED
ones.** That belongs in each record's header rather than in the reader's head.

---

## 1. The kill shadow — SURVIVES WITH CORRECTIONS

### What held

**The measurement reproduces exactly, 10 of 10 clusters.** A sieve written on the
complementary formulation — mark a `y`-rough flag array, then AND it with itself
shifted by two, rather than marking `r ≡ 0` and `r ≡ −2 (mod p)` — returns the
same ratio to five decimals **and the same integer slot count** at every cluster,
including 266735 at `y ~ 1000` and 1779677 at `y ~ 26000`. Nothing in
`shadow-buchstab-02`'s part (B) is a defect. [VERIFIED]

**The 0.5573 is derived, not fitted, and it has a closed form the record does not
state.** `ρ(2+ε) = ρ(2)(1 + ε + O(ε²))` because `ω'(2) = 1/4`, so the band
average's first-order coefficient is the first moment of the `x`-weight over the
band:

> `∫₀¹ s·ln2·2^s ds = 2 − 1/ln 2 = 0.5573049591…`

reproduced to ten digits by quadrature and approached from below by the exact
integral as `w → 0`. **[PROVEN]**

**The Exact Invariance Lemma is CRT-complete.** The attack was to find the step
where band position interacts with the new primes' classes. It does not exist.
Over all 30030 classes mod `P₁₃` with 323 lifts each, the retention histogram has
exactly one entry — 255 lifts for every class, no exception — and a band's depth
is invariant to `1e-12` across a level change that `attack2-03-09` never tested.
The band *is* strongly non-uniform against the new primes as integers (19 and 18
of its 169 classes are themselves killed by 17 and 19), and the lemma does not
care, because it acts on the **lifts** of each class, where `gcd(P_b, p) = 1`
forces equidistribution uniformly in the class. **[PROVEN, attack failed]**

**The stale-premise claim holds.** `attack2-03-09-depth-formula.js`'s embedded
output does say what the record says it says: birth/predicted 0.849/0.852 at
b = 97, 0.855/0.834 at 997, 0.832/0.830 at 2003, 0.827/0.827 at 4999, and its
reading 2 already calls the match. TODO item 5's "CANDIDATE, unchecked" was
indeed stale. [VERIFIED against the embed]

**D2 is not cherry-binned.** On a binning the record never used — one prime per
rung of a fixed geometric ladder, no pooling — the fall is violated 2 times in 14
steps against the record's 1 in 9. The trend is a property of the object, not of
the author's cluster centres. [MEASURED]

### Corrections required before integration

1. **The verdict is SHAPE-ONLY, not DERIVED.** `shadow-prereg.md` writes D1 as
   "`|B_x(y) − measured(y)| ≤ 0.011` **at every deciding level**" and fixes the
   deciding set as `y ≥ 997`. The `y ~ 1000` cluster misses at 1.49× tolerance.
   D2 is written as a fall and one step rises. DERIVED requires D1 **and** D2
   **and** D3. "DERIVED above `y ≈ 1400`" narrows the deciding set *after* the
   measurement, which the prereg's own closing line — *"No other statistic will
   be promoted to a verdict after the fact"* — was written to prevent. The
   evidence is strong; the label is one grade too high, and the fix is to report
   SHAPE-ONLY with the strong D1 record above `y ~ 1400` stated beside it.

2. **The drift law's amplitude is off by a factor the record does not report.**
   Over the ladder the measured depth falls 0.03207 against a predicted 0.01211
   — a ratio of **2.65** — and 2.30 on the record's own clusters. Restricted to
   `y ≥ 2000` the ratio is 1.19. So the law's *form* is confirmed and its
   *amplitude* is not yet, which is consistent with the record's own small-`y`
   residual reading but is a number that reading does not give. §2's sentence
   "the honest statement is that the shadow depth is `0.793055·(1 + 0.5573
   ln2/ln y + O(1/ln²y))`" should carry it.

3. **State the coefficient in closed form**, `2 − 1/ln 2`, and fix
   `shadow-buchstab-01-candidate.js`, which hardcodes `0.5573013` — wrong in the
   sixth decimal. The displayed first-order column is affected in the eighth
   decimal only, so no published figure moves; it is a code correction, not a
   number correction.

4. **The cluster design is post-registration.** The prereg fixed the tolerance,
   the deciding levels and the three criteria, but not the measurement design:
   the ten `y`-centres, the ±12% pool and the 4e8 budget were all chosen after
   it, and the prereg's Poisson floor was computed for a *single* level while the
   score is run on pooled clusters. Neither changes a verdict — the pooling only
   sharpens the test — but the record should say the estimator, not only the
   criteria, was fixed late.

---

## 2. Scanstat — SURVIVES WITH CORRECTIONS

### What held

**The duality is a theorem, exact at every `m`, not on a grid.** On `T₇`, `T₁₁`
and `T₁₃`, `maxsum_m + minsum_{D−m} = W` holds with integer deviation **zero** at
all `D−1` values of `m`, and `sd_m = sd_{D−m}` to `1e-10`. The proof is one line:
the two windows partition the cycle, so `S_m(i) + S_{D−m}(i+m) = W` identically,
and `i ↦ i+m` is a bijection of the cycle. **[PROVEN, VERIFIED]**

**And it is a theorem about the CYCLIC word only.** Run the same test on the
non-wrapping window and it fails at 1371 of 1483 values of `m` on `T₁₃`, worst
deviation 114. Every producer in the corpus forms the window cyclically —
`a3-04-maxsum-recursion.js`, `attack-foldL-05-maxsum-direct.js`,
`import-chaining-02.js`, `a3-02-diagonal-f.js` and both new scanstat scripts all
close the cycle explicitly. But the **live** documents that state the growth law,
`../../U-FRAME.md` §5a and `../../TODO.md` item 0c, do not contain the word.

**The permutation refutation is sound**, and it is the cheapest kind: the
hypothesis `Σγ(k) = 0` is a function of `Σᵢcᵢ` alone and so is invariant under
every reordering, while `sd_m` is not. Nothing in it needs checking beyond the
arithmetic, which reproduces.

**`maxsum_1 = G₂` checks independently.** Tiles built from scratch return
`maxsum_1 = 30, 42, 66, 108` at `T₇, T₁₁, T₁₃, T₁₇`, which is
`exact-g2-ladder.js`'s `G₂(x#)` at those levels, with `D = 15, 135, 1485, 22275`
matching the corpus's slot counts. [VERIFIED]

### Corrections required before integration

1. **"T₂₉ had never been computed here for any moving-sum statistic" is false.**
   `../../a3-04-maxsum-recursion.js` (added 2026-08-16) publishes
   `maxsum_m(T₂₉)` for `m = 1..8` as 258, 330, 390, 420, 510, 540, 552, 582, and
   `../../attack-foldL-02-bridge.js` re-verifies `m = 1..6` five and a half hours
   before the scanstat commit. The new run reproduces those digit for digit.

2. **`maxsum_1 = 258` is therefore a reproduction, not an independent anchor.**
   "VERIFIED on two independent anchors" should become "reproduces the corpus's
   own `G₂` ladder and slot counts", which is a consistency check and still
   worth stating.

3. **The blindness of `H` nevertheless survives, and this is the finding that
   matters.** Backing an exponent out of the already-published `m = 1..8` row —
   `sd_m ≈ (maxsum_m − m·m̄)/√(2 ln D)` on the prereg's own grid — gives
   **0.2100 ± 0.0274**, nowhere near the measured 0.3367, precisely because the
   tail factor is not `√(2 ln D)`, which is the record's own finding. The
   published row does not leak `H`. **The blind validation stands; only the
   sentence and the anchor claim need correcting.**

4. **The prediction's precision is oversold.** The three-point fit carries **one**
   residual degree of freedom; its own 95% band at `T₂₉` is `[0.281, 0.396]`.
   Dropping `T₁₃` alone moves the prediction from 0.3383 to 0.3442, i.e. from
   0.20 to 0.94 measurement standard errors. "Predicted to within a fifth of a
   standard error" prices the miss against the *measurement's* error, not the
   *prediction's*. What is safe is the **kill**: Model B's `H = 0.5` is far
   outside the band, so the refutation of `√m` is unaffected. The claim to carry
   into TODO 0c is the refutation, not the precision.

5. **Two citation slips.** §0 says the duality was "VERIFIED at fifteen values of
   `m` on T₁₃"; the producer prints twelve (and the theorem is now checked at all
   1484). §3 attributes both `G₂` anchors to `exact-g2-ladder.js` *and*
   `05b-twin-jacobsthal-segmented.js`; 05b computes 29# only, and `G₂(23#) = 204`
   lives in `../../05-twin-jacobsthal.js`.

6. **The pre-registered kill criterion names T₂₃ only.** The prereg's sentence is
   "Kill criterion: Model A must beat Model B on the ln-RMS of `excess_m` at
   `T₂₃`"; the T₂₉ table is tabulated but no decision rule is stated for it. "The
   pre-registered kill criterion is passed at both target levels" should say that
   T₂₉ was scored on the same rule, applied by extension.

7. **The duality's novelty needs a caveat.** It is the complement identity for a
   maximum over cyclic windows — the same identity that turns a maximum circular
   subarray into "total minus minimum subarray", which is standard in algorithms.
   §6 already records that no prior-art search was run; the proposal to promote
   it to the live layer as a banked **THEOREM** should carry that flag on the
   same line.

---

## 3. Sofic — SURVIVES

The only claim of the four that needs no correction to its substance.

**The strictly-sofic argument is airtight, and it is complete for every `M` at
once.** `(−2)0^k(−2)` and `(+2)0^k(+2)` are rejected and all four halves accepted
for every `k` up to 400, and the general argument closes it: `w = (−2)0^M(−2)`
has length `M+2` and therefore exactly **two** subwords of length `M+1`,
`(−2)0^M` and `0^M(−2)`, both legal. An `M`-step SFT forbids only words of length
`≤ M+1`, so it must contain `w`, which the language does not. True for every `M`.
The graph itself is forced by the arithmetic: a slot is deleted by `p` iff
`r ≡ 0` or `r ≡ −2 (mod p)`, and from `r ≡ 0` the next deleted slot needs
`g ≡ 0` or `−2`, from `r ≡ −2` it needs `g ≡ 0` or `+2`. **[PROVEN]**

**Every number in the ratio test reproduces to four decimals** from the cited
inputs alone: mean `R` 2.3931 / 2.1346 (A), 2.1249 / 1.9340 (B), 1.5511 / 1.4965
(C), slopes 0.5157, 0.5292, 0.9784, 0.8880, 0.4083, 0.1353 with the record's
standard errors and `t` values. The legal-word count is `2^{n+1} − 1` at
`n = 1..12`, matching Perron root 2. [VERIFIED]

**On the `t`-statistics attack.** `t = 2.690` on `n = 7` is 5 degrees of freedom,
where the two-sided 5% critical value is 2.571, so the kill is significant on the
proper `t` distribution too — and in any case the prereg fixed `|b| > 2·SE` in
advance, which fires on both readings. The kill is sound.

**A paired test the record did not run makes its headline stronger, not weaker.**
The concern was that "B dies at 2.69, A survives at 1.65" is two marginal numbers
landing either side of a threshold. It is not: the OLS slope of `R_A − R_B` on
`ln p` over the same seven folds is **−0.3588 ± 0.0253, t = −14.2**. The two
estimators genuinely differ in trend. What is *not* established is that A is
flat — A's own interval `[−0.297, 1.355]` contains B's slope — so "flat" here
means unrefuted, not shown. The record already says exactly this, in the sentence
about `A/B` falling to 0.9989 by fold 37.

**The 170× against 16× checks out** on the correct alignment. `f` falls
`4.444e−2 → 2.653e−4` from `x = 11` to `x = 199`, a factor 167.5 (the record's
"170" is that to two significant figures), while `3/p` at the corresponding
**fold primes** 13 and 211 falls by `211/13 = 16.23`. The comparison is only
right on the fold-prime reading, which is the census table's own indexing.

### Three citation corrections, none touching a verdict

1. **`import-sofic-prereg.md` §3 cites `a3-05-bound-L.md` §7 for the `L`
   diagonal.** It is in §9, and §9 covers eight folds, not nine. It also cites
   `a3-10-lower-tightness.js` reading 1 for folds 31 and 37; reading 1 stops at
   fold 29. Fold 37's `L = 4` comes from that file's `deep37` block and its
   READINGS item 1. No value disagrees anywhere — this is a pointer defect.

2. **The prereg says both exclusions are "PROVEN in `kappa-not-L.md`".** That
   file marks the Alternation Lemma PROVEN and the fold-29 count of 288 as
   **VERIFIED**, on a single script (`a3-08-adjacent-pairs.js`). The fold-11
   exclusion likewise rests on an enumerated census fact. The exclusions are
   sound; "PROVEN" is one grade high for the counts they rest on.

3. **The 42-point census lives in `a3-03-f-from-census.js`**, not in
   `f-decays.md`, which summarises it. Citing `f-decays.md` for the count is
   defensible (it states 42 on its own line); citing it for the values is not.

---

## 4. Shearer — SURVIVES WITH CORRECTIONS

### What held

**The identity is right, checked without the record's recursion.**
`Z_{K_n[S]}(−p)` computed by enumerating independent sets equals
`1 − Σ_{v∈S} p_v` to machine precision over every subset at `n = 2..8`, with
deliberately unequal marginals; the minimum is at `S = V`; the criterion
collapses to `Σ p_v < 1`. Two lines, and they are correct. **[PROVEN]**

**The factor `e` is exact, not bookkeeping.** Shearer's boundary on `K_n` is
`1/n`, the local lemma's is `(1/n)(1−1/n)^{n−1}`, and the ratio
`(1−1/n)^{−(n−1)}` reproduces the record's 2.0000, 2.2500, 2.3704, 2.4414,
2.4883, 2.5465 exactly and climbs to `e`. **[PROVEN]**

**`H*(x)` and the exponent reproduce exactly** from an independent feasibility
scan: 35, 55, 65, 91, 115, 209, 319, 481 at `x = 13..79`, `θ` running 1.3861 to
1.4386 with no trend. The producer's own table does carry all seventeen levels
`x = 13..79`, so "flat over seventeen levels" is accurate even though the record
prints eight of them. [VERIFIED]

**The `2/√e` floor is sound and its derivation is correct.** Primes in
`(√H, x]` are pairwise adjacent under `p ∼ q ⟺ pq > H`, so the identity applies
to them as a clique and forces `Σ_{√H<p≤x} 2/p < 1`; Mertens turns that into
`θ ≥ 2e^{−1/2} = 1.2130613194`. Recomputing the clique-only necessary condition
from **exact prime sums** rather than Mertens reproduces the record's 1.111542,
1.188678, 1.199746, 1.208307, 1.210244, 1.212133 and converges from below.
**[PROVEN, VERIFIED]**

**The "matching graph feasible forever" reading is correctly quarantined.** §4
names it `import-suen.md` §8(i)'s wrong proof of the conjecture, §5 sharpens it
to "proves something an order of magnitude stronger than the conjecture", and
neither is offered as evidence for anything. That is the right handling.

**On whether completeness is forced.** It is, *given the modelling frame the row
inherits*: the events are divisibility conditions on a uniform variable in an
interval, and the local lemma requires **exact** mutual independence, which an
interval does not supply for any pair `p ≠ q` unless `pq | H`. Refusing
approximate independence therefore does force the complete graph, and the choice
is disclosed. The closure that rides on it is correspondingly scoped — §6 says
"no argument whose only inputs are the dependency graph and the per-event
marginals", which is the right quantifier.

### Corrections required before integration

1. **"Lay the `2K` events out as disjoint intervals" is false in exactly the
   regime it is invoked for.** Once `Σ 2/p > 1` there is no room: `2K` pairwise
   disjoint sets of total measure above 1 do not fit in `[0,1)`. The construction
   that works is arcs laid **end to end on `ℝ/ℤ`**, disjoint only until they close
   the circle. Measured coverage is 0.400000, 0.685715, 0.867533 at `x = 5, 7, 11`
   and exactly 1 from `x = 13` on, so `P(survive) = 0` from `x = 13` — the
   conclusion is untouched and the sentence must change. Within-prime exclusion
   survives the repair because `2/p ≤ 1` keeps each prime's two arcs consecutive
   and disjoint.

2. **The atomicity leg needs either its hypothesis or its citation changed.** The
   lemma is correct and its hypothesis is load-bearing: on an explicit 12-state
   instance the atomic construction gives `1/A_f = μ(f) = 0.5` and the non-atomic
   one gives `1/A_f = 0.0833 < μ(f) = 0.5`. So the record owes an argument that
   **its** instance is atomic — one flaw per prime on the slots of a window,
   addressed by moving the slot, is atomic only if distinct killed slots never
   move to the same slot, which is not established and is implausible for an
   action set that "changes the residue modulo every other prime". **The closure
   survives regardless**, through the citation the record already carries:
   Achlioptas–Iliopoulos's own sequel states `γ_i ≥ μ(f_i)` *always*, with no
   atomicity hypothesis. §1 item 5 and §8f should name that as the mechanism.
   A second unstated hypothesis: `μ(f) = |f|/|Ω|` presumes `μ` uniform.

3. **"At `H ≥ x²` the cross-prime edges all vanish and the graph is a perfect
   matching" is too generous, and it is generous in the record's own disfavour.**
   Exact independence of `{p|r}` and `{q|r+2}` on a window of `H` consecutive
   integers needs `pq | H`, and simultaneously for all pairs that is
   `∏_{5≤p≤x} p | H` — the primorial, not `x²`. The defect is inherited from
   `import-suen.md` §8 and it *strengthens* the closure rather than weakening it,
   which is why it must be fixed rather than left: as written it understates how
   far the legitimate matching graph is from `H = x²`, and the record's own §8b
   already prices the honest threshold at `H ≥ x#`.

4. **§1 item 5 grades the Achlioptas–Iliopoulos closure above its own §8d.** §8d
   tags the "this object does not supply a sparser graph" step `[INFERRED from
   their sourced theorem statements]`, which is right — it is an assertion about
   all possible action sets, not a proof. The headline should carry that tag; as
   written, "closed by three mechanisms" reads as three proofs.

---

## 5. What the four records get right that is worth naming

- **Every arithmetic claim tested here reproduced**, in three cases from code
  sharing no line with the original: the shadow's ten cluster ratios *and* their
  integer slot counts, the sofic ratio table to four decimals, the Shearer `H*`
  ladder and `θ_c` column.
- **Each record volunteers its own worst number.** The shadow prints its one D1
  failure and its one D2 failure; scanstat discloses the `T₂₃` leak unprompted;
  sofic kills the map's own formula and then shows its own survivor is a
  transient; shearer refutes half of its own pre-registration.
- **The four ran concurrently and did not touch each other.** No shared artifact,
  no borrowed number, no citation across waves.

## 6. Not reached

- **No prior-art search was run in this pass**, on the complementary-window
  duality, the bounded-charge convention, or Shearer's region. Each record's own
  §6/§9 already flags its channel as unsearched, and this pass adds nothing to
  those absences and makes no absence claim of its own.
- **The `[2,3]` branch of the Unification Law** remains the independence-squared
  conjecture, so the shadow's identification inherits it. Nothing here moves it.
- **`import-shearer-01-region.js`'s `H*` scan was reproduced only to `x = 79`,**
  which is its own ceiling; the levels beyond it were not attempted.
- **The scanstat tail factor** — `excess/sd_m` running 10.6 to 5.7 against
  `√(2 ln D) = 6.19` — is the whole residual and was not attacked here, because
  the record already declares it unexplained.

---

*This document states current understanding. Superseded claims and the reasons
they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
