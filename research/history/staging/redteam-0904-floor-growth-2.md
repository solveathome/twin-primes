<!-- ledger
id: Q-redteam-0904-floor-growth-2
status: ANSWERED
todo: 0
question: Does the growth half of the adverse pointwise floor (Omega >> z^{16s/9}/ln^8 z from four-prime Rosser exit chains) survive a SECOND adversarial pass, and does a floor on the certificate at a CRT-planted window make REC(s,u0) false (a truth gap) or only unprovable by that certificate (a proof gap)?
verdict: SURVIVES, at the same rung and no higher: four new attacks and two unasked ones found no break, so the growth half stays DERIVED and red-teamed twice, which is two failed breaks on a derivation and not a proof; the proof-gap reading is REFUTED because REC is a statement about R_H, the remainder of the very certificate the floor bounds below, and the chain has no step where a certificate value must become a true remainder, so it is a truth gap for REC as the corpus states it; five corrections are owed to the record -- the REFUTED row is UNSCOPED and should read "on the Rosser vector-sieve lattice at equal levels" since only the Rosser instance is derived, the "falsity beyond z ~ 5.6e31" is an s = 2.698721 figure quoted without its s and the fitted crossing at the corpus's own measured family s = 3.0 is z ~ 10^15.3, the analytic p* window (4D^{1/27}, D^{1/9}/4) is neither necessary nor sufficient at reachable levels so the exact onset is 4.42e5 at s = 3.0 rather than the quoted 1.055e6, the four-prime construction has NO exit prime below z once s >= 7 so the first pass's "8 beyond s = 5" holds only on [5,7), and the first pass's escape-(a) density 1/W understates the planted class by the factor W/(n1n2) though the escape still fails by an exponential; the LP maximum 8s/9 is confirmed as an exact vertex and the corollary crossing reproduces 9beta2/16 to 4.4e-16, the pre-registered slope band held at a new s (top step 4.9025 at s = 3.0 against a model 4.8990), and no exponent moved.
-->

> **RIDER 2026-09-04 (orchestrator, from `redteam-0904-item0.md`).** Graded
> on independent code: every load-bearing number reproduces (18 of 18 A₁A₂
> cells, the LP vertex, the crossing 9β₂/16, the onsets, the s = 3.0
> crossing). Four rewordings owed. (1) §12's proposed scope clause "at equal
> levels D₁ = D₂ = z^s" is NARROWER than the derivation supports: over 1643
> admissible level splits the floor beats the decoupled window at every cell
> by at least 0.644444, so the scope is "every admissible level split", and
> the sibling rider "8s₁/9 + 8s₂/9 with s₁ + s₂ pinned" holds only while both
> s_i ≤ 3. (2) The 5.6e31 figure is u₀-specific as well as s-specific
> (10^31.68 at u₀ = 4.2165, 10^35.36 at u₀ = β₂, same s); quote both
> coordinates. (3) The onset correction is right numerically and wrong in
> wording: at the record's own s = 2.698721 the exact onset is 1.875e6, LATER
> than the quoted 1.055e6, not earlier. (4) §10's "L3–L10 untouched" is
> refuted in one row: L7's mechanism 2 (the sieve-on-holes transfer,
> `derive-0904-L7-transfer.md` §3) dies with L2; U1's ΔΦ₂ is the true-count
> discrepancy and survives. §0's "every almost-all statement survives" reads
> "the floor exhibits no obstruction to any almost-all statement".

# Second adversarial pass on the growth half of the adverse pointwise floor

*(2026-09-04, staging, HELD under the publication moratorium. Adversarial only.
Target: the GROWTH half of `attack-0830-rec-cheapest.md` §4.2-4.3, already
red-teamed once in `redteam-0830-floor-growth.md`. One new producer,
`research/history/staging/redteam-0904-floor-growth-2.js`, embedded via
`qc/embed.js`; it shares no code with any producer it attacks. No existing
file was edited; no git command was run beyond a read-only status. Every
figure below is in that producer's OUTPUT block, cited by section. Calibration
per `CLAUDE.md`: PROVEN, VERIFIED (exhaustive exact computation), MEASURED,
DERIVED (a written argument not adversarially checked), HEURISTIC, OPEN,
REFUTED.)*

## 0. Verdict, disconfirming half first

**Nothing here moves an exponent, and the pass did not raise the rung.**

1. **The growth half is still DERIVED.** Ten attacks have now failed to break
   it. A derivation that survives ten passes is a derivation that has survived
   ten passes; it is not PROVEN, and this note says so wherever the growth
   half is named. The whole adverse reading of item 0 still rests on a written
   argument that no one has turned into a proof.
2. **Nothing computable changed, and the gap is still enormous.** The best
   `log_z(A₁A₂)` reached here is **3.5742** at (s, z) = (3.0, 1e8), against the
   `u₀ ≈ 4.266` it has to pass — a deficit of 0.69 of exponent. At s = 2.7 the
   deficit is 1.18. No computation in reach falsifies REC, and none will.
3. **Five of the record's own sentences are wrong**, and one of them is wrong
   in the direction that flatters the floor (§12): the `REFUTED.md` row is
   **unscoped**, "z ≈ 5.6e31" is an s-specific figure quoted without its s, the
   analytic p* window is not the exact condition, "8 beyond s = 5" holds only
   on [5, 7), and the first pass's escape-(a) density understates the planted
   class by `W/(n₁n₂)`.
4. **One thing was NOT established.** That no sup-over-positions statement of
   any kind survives. What dies is the sup family **on the Rosser
   vector-sieve lattice at equal levels**; a different admissible weight pair
   is a different statement, and all this note has on that is a heuristic
   (§3, scope fact 1).

**The ruling.** **SURVIVES**, at rung **DERIVED, red-teamed twice on the growth
half** — explicitly **not PROVEN**. Six attacks, four of them from the brief
(the quantifier, the CRT step, the LP and the s ≤ 3 hypothesis, a different s)
and two unasked (the LP pattern's optimality at a reachable level; the planted
class against the PROVEN mean square, which was the only line that could have
broken the floor by contradiction with a theorem). No break.

On the brief's first question — **truth gap or proof gap** — the proof-gap
reading is **REFUTED**. `REC(s, u₀)` is a statement about `R_H`, the remainder
of the very certificate the floor bounds below (`T = H·M + R_H`, VERIFIED here
as `sup|R₁| = Ω + M` exactly at 8 (z,s) rows), and the sup it takes runs over
the same `ℤ/W` the planted position sits in. There is no step at which a
certificate value must become a true remainder. §3 writes the chain out with
every quantifier.

**The `REFUTED.md` row wording this note proposes** (replacing the four clauses
named in §12):

> ... is PROVEN ..., and its DERIVED growth `Ω ≫ z^{16s/9}/ln⁸z` (`s ≤ 3`;
> corollary `2 × capped-LP-max > β₂` for every `s > 2.3999`) **survived ten
> independent attacks across two adversarial passes on the growth half and one
> on the exact half, and stays DERIVED — two failed breaks are not a proof**;
> if the growth holds then `REC(s, u₀)`, F1, F2 and `RML(α)` are FALSE for
> every `u₀ < 16s/9 > β₂` **on the Rosser vector-sieve lattice at equal levels
> `D₁ = D₂ = z^s`** (no other admissible weight system is derived), so the
> route is false rather than hard; the falsity's level is **s-dependent** —
> `z ≈ 10^15.3` at `s = 3.0`, `z ≈ 10^25` at `s = 2.8`, `z ≈ 5.6e31` at
> `s = 2.698721` — and no computation reaches any of them ...

**What the pass buys the programme.** The scope of death, which is what item 0
actually wanted (§10): the sup-over-positions family on this lattice is dead
across the whole legal band, exactly **one** row leaves the legal open set
(L2, `RML(α)`, of `object-g2-read-0829.md` §4b), and **every
almost-all-positions statement survives untouched** — the planted class has
density `exp(−Θ(D^{1/3}))`, smaller than any polynomial fraction of `W`, so
Lemma V and every "for all but `O(W/z^A)` positions" form are not touched by
anything here.

## 1. What this pass does NOT repeat

`redteam-0830-floor-growth.md` §2 ran six attacks. This pass repeats **none of
them as its deliverable**, and says so per attack:

| first pass's attack | what it did | why not repeated |
|---|---|---|
| 1. a miscounted multiplicity | distinct 4-subsets give distinct exit chains; the parity split makes the two sides prime-disjoint | structural and already machine-checked against λ⁺ itself at z ≤ 41 |
| 2. a wrong exponent in the chain count | a 1200² grid over the two free LP coordinates returned 8s/9 | **partly re-run here by a different method** (exact vertex enumeration, not a grid; §4). A grid cannot certify a vertex, and it was the grid that missed nothing but could have |
| 3. a dropped log factor | the ratio to z^{16s/9}/ln⁸z flat at 2.930e-4 over 1e6..1e9 at one s | re-run only at a **different s** (§6), which the first pass listed as not reached |
| 4. an overlap between chains counted as disjoint | the p* window checked non-empty, ≥ 2 primes | not repeated; §5 checks a different thing (that every member of the family really is a first-exit chain, on exact integers) |
| 5. a sign that could cancel (E2) | 0 violations over all 2^{π(z)−1} divisors at z ≤ 41 | rebuilt here only as infrastructure for §5 and §7, and declared as a repeat |
| 6. the implication's quantifiers (two routes to u₀ < 16s/9) | Route 1 through C3–C6, Route 2 direct | **not repeated.** §3 attacks a different quantifier question: certificate value versus true remainder |

New here: §3 (the quantifier, certificate versus truth), §5 (the CRT step and
the family's membership on exact integers, at several levels rather than one),
§6 (the count at a **different s**, pre-registered), §7 (the planted position's
density against the PROVEN mean square — a consistency test the first pass ran
only in its crudest form), §8 (the corollary's constant re-derived), §9 (scope
of death).

## 2. Pre-registration (written before the producer ran)

Falsifiers and forecasts, fixed in advance. The producer is
`research/history/staging/redteam-0904-floor-growth-2.js`; it shares no code
with `attack-0830-rec-cheapest.js`, `redteam-0830-floor-growth.js`,
`redteam-0830-floor-sign.js`, `blind-0830-omega-floor.js` or
`research/sift-limit-lemmaV.js` (own sieve, own statement of the Rosser
conditions, own λ by direct Möbius summation, own chain enumeration, own
segmented prime counting, own CRT).

- **P1 (LP, exact vertices).** The four-prime capped LP maximum is exactly
  `8s/9` for `s ≤ 3`, `(2s+2)/3` for `3 ≤ s ≤ 5`, `4` for `s ≥ 5`.
  FALSIFIER: a feasible vertex above those values at any tested s.
- **P2 (LP with the exit window).** Adding the constraint that the p* window
  be non-empty in exponent, `3a_last > s − Σa`, does not lower the optimum at
  any `s ∈ [2.4, 10]`. FALSIFIER: a strict drop at any tested s.
- **P3 (2k-prime LP).** The capped 2k-prime maximum equals
  `min(s(1 − 3^{−k}) doubled-per-side value, the cap)`; concretely the
  per-side optimum is `s(1 − 3^{−k})` while `s·3^{−k} ≥ ...` and the a_i ≤ 1
  cap binds from `s > 3`. FALSIFIER: a vertex above the closed form.
- **P4 (the corollary's constant).** `2 × cappedLPmax(s) > β₂` holds for every
  `s > 9β₂/16` and fails for every `s < 9β₂/16`, with the crossing at
  `s* = 2.3998782...`; `1+√e = 2.6487` clears it by `0.2489`. FALSIFIER: a
  crossing anywhere else, or a legal s at which the doubled maximum is under
  β₂.
- **P5 (CRT count).** The number of positions `r ∈ ℤ/W` with
  `gcd(r,P) = n₁`, `gcd(r+2,P) = n₂` is exactly `∏_{odd p < z, p ∤ n₁n₂}(p−2)`
  for coprime odd `n₁, n₂`, and is `≥ 1` always. FALSIFIER: any disagreement
  with a brute-force walk of ℤ/W at z ≤ 23, or a zero count.
- **P6 (identity of objects).** `T(x) = H·M + R_H(x)` with
  `R_H(x) = ρ(x) − ρ(x+H)` on my own ρ, and `sup|R₁| = Ω + M` exactly, at
  every tested (z, s). FALSIFIER: any mismatch beyond 1e−9.
- **P7 (family membership, exact integers).** At every level where the literal
  dyadic construction is non-empty, **every** member of the family is a
  first-exit chain of D⁺ ending at p*: `d′ ∈ D⁺`, `ω(d′) = 4`, `d′ > D/p*³`,
  `d′p* ∉ D⁺`, `p* < min(d′)`. FALSIFIER: one failure, and I record the
  minimum margin in ln units so a near-miss is visible.
- **P8 (a different s, forecast).** At `s = 3.0` the step slope of
  `ln(A₁A₂)` between consecutive levels in `[1e6, 1e8]` lies in **[4.0, 6.0]**,
  and the top step (3e7 → 1e8) lies in **[4.6, 5.6]** against the model
  `16s/9 − 8/ln z = 5.333 − 8/ln z ≈ 4.90` there. FALSIFIER: a top step
  outside [4.6, 5.6]. A slope near `2s = 6` or above would say the count is
  not the four-chain count.
- **P9 (onset at s = 3).** The p* window `(4D^{1/27}, D^{1/9}/4)` is non-empty
  from `z > 16^{27/(2s)} = 16^{4.5} = 262144` at s = 3, against 1.055e6 at
  s = 2.698721; the first level holding **two** primes is larger and is
  reported. FALSIFIER: a non-empty window below that bound.
- **P10 (density against the PROVEN mean square).** The planted positions'
  own contribution to `⟨R₁²⟩` is `(count/W)(Ω+M)²`, and with
  `count/W ≈ 1/(n₁n₂)` and `n₁n₂ = exp(Θ(D^{1/3}))` this is smaller than the
  Lemma V constant `B = O(ln⁸z)` by an **exponential** in `D^{1/3}`, not
  merely by `1/W`. FALSIFIER: a level at which the contribution approaches B,
  which would put the floor in contradiction with a PROVEN theorem and break
  the growth half outright.

## 3. Attack (a): the quantifier. Certificate value or true remainder?

**The suspicion.** REC/RML are statements about a signed remainder over
positions; the floor is a statement about the certificate's own value at one
CRT-planted doubly-smooth window. If the second is not the first, the floor
shows only that *this certificate* cannot prove REC — a proof gap — and the
`REFUTED.md` row is mis-worded.

**The chain, with every quantifier written out.** Fix a prime `z`, `W = P(z)`,
`s > 1+√e`, `D = z^s`, and the Rosser–Iwaniec weights `λ^±` of level `D` for
the two systems `{r ≡ 0 (p)}`, `{r ≡ −2 (p)}`, `p < z`. Write
`n₁ = gcd(r, P)`, `n₂ = gcd(r+2, P)`,

    cc(r) = λ⁻(n₁)λ⁺(n₂) + λ⁺(n₁)λ⁻(n₂) − λ⁺(n₁)λ⁺(n₂),
    T(x)  = Σ_{x < n ≤ x+H} cc(n),   M = ⟨cc⟩,   R_H(x) = T(x) − H·M.

REC(s, u₀): **∃**ε>0 **∃**z₀ **∀** primes z ≥ z₀:
`sup_{x ∈ ℤ/W} |R_H(x)| ≤ z^{u₀/2−ε}·⟨R_H²⟩^{1/2}` at `H = ⌊z^{u₀}⌋`
(`attack-0829n-rml-proof.md` §3, verbatim).

| step | statement | quantifier | rung |
|---|---|---|---|
| Q1 | there is `r* ∈ ℤ/W` with `cc(r*) = −Ω(z,s) ≤ −A₁A₂` | **∃**r*, for each z past the onset | CRT + E1–E3; §5 here |
| Q2 | for every window `(x, x+H]` containing `r*`: `T(x) ≤ cc(r*) + H − 1` | **∀**x | PROVEN (E4); 0 violations over four complete periods with the wrap, six H each, both s (S3) |
| Q3 | at `x = r*−1`: `R_H(x) = T(x) − H·M ≤ −Ω + H − 1 − H·M`, so `sup_x |R_H(x)| ≥ Ω − H + 1 + H·M` | the sup is over the **same** `ℤ/W` REC ranges over | identity `T = H·M + R_H`; VERIFIED at `H = 1` as `sup|R₁| = Ω + M` exactly, 0 mismatches at 8 (z,s) rows (S3) |
| Q4 | `⟨R_H²⟩ ≤ B·H`, `B = O(ln⁸z)` | ∀z | PROVEN (Lemma V) |
| Q5 | REC ⟹ `sup|R_H| ≤ z^{u₀/2−ε}(B·H)^{1/2} = z^{u₀−ε}·O(ln⁴z)` | ∀z ≥ z₀ | arithmetic |
| Q6 | contradiction once `log_z Ω > u₀ − ε + o(1)`, hence for all large z when `u₀ < 16s/9` is fixed | ε and u₀ fixed **before** z | conditional on the growth half |

**Where "certificate value" would have to become "true remainder": nowhere.**
`R_H` *is* the remainder of this certificate, by the definition
`T = H·M + R_H` — and REC is a statement about `R_H`, not about the count of
twins in the window. The floor bounds `R_H` below at a position the sup ranges
over. So the implication is: growth half true ⟹ **REC(s, u₀) false**, a truth
gap, not a proof gap. **NO HOLE FOUND.** The brief's suspicion would be right
if REC were a statement about the true twin count in `(x, x+H]`; it is not,
and `attack-0829n-rml-proof.md` §3 states it about `R_H` explicitly.

**Direction guard on Q4/Q5.** To refute REC one needs an **upper** bound on
the rms, and `√(B·H)` is the PROVEN one. `redteam-0830-rml.md` records the true
`⟨R_H²⟩^{1/2}` sitting 36.53× to 200.45× **under** `√(B·H)` because the mean
square saturates in H. A smaller true rms makes REC's allowance smaller and
the contradiction **easier**. The chain is therefore conservative at its one
inequality that could have gone the wrong way.

**Three scope facts the chain carries and the live layer does not.**

1. **REC and RML are indexed by the weight system, and the row is not.** The
   floor is derived for the Rosser β = 2 support at **equal** levels
   `D₁ = D₂ = z^s`. Two riders. (i) Asymmetric levels do not escape: the
   exponent becomes `8s₁/9 + 8s₂/9` with `s₁ + s₂` pinned by the joint level
   `2s`, so the threshold is unchanged — DERIVED here, one line, not
   machine-checked. (ii) The mechanism is **not obviously** Rosser-specific:
   for any admissible pair `λ⁻ ≤ θ ≤ λ⁺` the vector combination contains
   `−λ⁺(n₁)λ⁺(n₂)`, and at a doubly smooth point both factors are the upper
   sieve's value at a very smooth integer. That is HEURISTIC — the sign fact
   E2 that removes all cancellation is Rosser's, and nothing here derives an
   analogue for Selberg's `Λ²`. **So the row should carry the clause "on the
   Rosser vector-sieve lattice at equal levels", which
   `attack-0830-rec-cheapest.md` §8 itself proposed and `REFUTED.md` did not
   take up.** Without it the row reads as killing every sup-over-positions
   statement for every admissible weight, which is not derived.
2. **The route dies; the conclusion does not.** `G₂(z#) ≤ z^{u₀}` is untouched.
   `REFUTED.md` says this correctly ("false rather than hard" is about the
   route); no defect there.
3. **The planted position is exponentially rare** (§7), so only *true sups*
   die. Every almost-all-positions form survives. That is §10 and it is
   nowhere in the live layer.

**Verdict on (a): the proof-gap reading is REFUTED; it is a truth gap for
REC(s, u₀) as the corpus states it, conditional on the growth half.** The one
correction owed is the missing scope clause.

## 4. Attack (c): the LP, re-derived by exact vertices rather than a grid

The first pass found `8s/9` with a 1200² grid. A grid finds a value; it cannot
certify a vertex, and it cannot see a constraint that was never written down.
This pass sets up the LP independently — maximise `Σa_i` under `3a₁ ≤ s`,
`a₁+a₂+3a₃ ≤ s` (the odd-m Rosser conditions), `a₁ ≥ a₂ ≥ a₃ ≥ a₄ ≥ 0` and
`a_i ≤ 1` — and enumerates **every** basic feasible vertex (all
`C(10,4) = 210` active sets, and `C(20,8) = 125970` at `2k = 8`).

- **P1 HELD.** 0 deviations from `8s/9` (s ≤ 3), `(2s+2)/3` (3 ≤ s ≤ 5), `4`
  (s ≥ 5) at 16 values of s, largest residual 4.4e−16 (S1). The optimal vertex
  is `(s/3, s/3, s/9, s/9)` at every `s ≤ 3` — printed, not assumed.
- **The 2k pattern.** `s(1 − 3^{−k})` reproduces exactly at `2k = 2,4,6,8` and
  both s: 1.8667/2.4889/2.6963/2.7654 at s = 2.8, and 2/2.6667/2.8889/2.9630
  at s = 3.0 (S1).
- **NEW, and a correction to the first pass's R3.** The LP as the first pass
  wrote it omits the constraint that a legal exit prime `p*` exist **below z**:
  the exit needs `d′·p*³ > D` with `p* < min(d′)`, i.e. `Σa + 3a_last > s` in
  exponent. Adding it never lowers a finite optimum (P2 HELD), but it can
  empty the polytope: at the four-prime optimum `Σa + 3a₄ = 7` for every
  `s ≥ 5`, so **the four-prime construction has no exit prime at all once
  `s ≥ 7`** (S1, P2b). The first pass's R3 says the threshold is "8 beyond
  s = 5"; that is available only on `5 ≤ s < 7`. Longer chains carry it past
  there: the all-ones `2k` pattern is feasible iff `2k+1 ≤ s` and `2k+3 > s`,
  giving a doubled threshold 12 at s = 7, 16 at s = 9, 36 at s = 20 (S1, P2c),
  never below β₂. **The corollary survives; R3's sentence needs the
  qualification.**
- **The true exponent on (2.3999, 3].** `16s/9`, confirmed as a vertex.
  4.7088 at `1+√e`, 4.8 at 2.7, 4.9778 at 2.8, 5.1556 at 2.9, 5.3333 at 3.0
  (S7).
- **NEW: is the LP shape also the best at a REACHABLE level?** The LP is
  asymptotic; at finite z the four boxes carry different logs and the optimum
  could reorder. An exhaustive search over **all** dyadic quadruples
  `(2^{t−1}, 2^t]`, `t₁ > t₂ > t₃ > t₄`, with every Rosser and exit condition
  checked in exact integer arithmetic on the real primes, returns
  `(26, 25, 9, 8)` at s = 3.0, z = 1e8 and `(24, 23, 9, 8)` at s = 2.8 — in
  both cases an adjacent pair at `D^{1/3}` and an adjacent pair at `D^{1/9}`,
  the LP shape, found by a search that was not told the answer. The note's own
  boxes (not power-of-two aligned) beat the best aligned quadruple by 0.4702
  dex at s = 3.0 and 0.1313 dex at s = 2.8 (S4, P1b). **NO BREAK.**

## 5. Attack (b): the CRT step and the family's membership, on exact integers

**The construction dissolves the brief's question.** "Are the four-prime chains
counted actually all realised inside one window of length `H = z^{u₀}`?" — the
chains are **divisors of `n₁` and `n₂`**, not positions. Exactly one position
`r*` is needed; E4 then gives the bound to every window containing it.
Recorded so the question is not re-asked.

**The CRT system, re-derived.** `r ≡ 0 (n₁)`, `r ≡ −2 (n₂)`, and
`r ≢ 0, −2 (p)` for every other odd `p < z`, with `r` odd. Solvable iff
`gcd(n₁,n₂) = 1` and `2 ∤ n₁n₂` — the second is exactly
`redteam-0830-floor-sign.md`'s E1 correction (2 divides one side iff it
divides the other), and the construction takes `2` in neither. The number of
solutions in `ℤ/W` is

    #{r} = ∏_{odd p < z, p ∤ n₁n₂} (p − 2),

a product of **positive integers**, hence `≥ 1` for every admissible pair.
**Existence needs no estimate at all** — no sieve bound, no density argument,
no error term. VERIFIED against a brute-force walk of the whole of `ℤ/W` at 8
(z, s) rows to z = 23 and at 4 explicit planted splits: 0 mismatches (S3,
S3b). At the planted split of z = 23, s = 2.7 the position is r = 5,285,553,
the class has exactly 1 member, and the formula agrees.

**Membership: is every counted chain really a first-exit chain?** The first
pass checked `λ⁺(P_i) ≥ (family count)` numerically at **one** level
(z = 601). That is the weaker check. What the inequality actually needs is
that the family is a **subset** of the set `λ⁺` counts, and every term of that
count is `+1` (E2). This pass verifies the subset relation directly, in exact
integer arithmetic, at **twelve** (s, z) levels:

- **corner check (P7).** All conditions are monotone in each `p_i`, so the
  extreme corners decide the box: `p₁³ ≤ D`, `p₁p₂p₃³ ≤ D`, ordering
  `min B₁ > max B₂ > … > max p*`, exit `d′_min·p*³ > D` for **both** `p*`,
  `d′_max ≤ D`, and `p₁ < z`. Every comparison is done as `X^B ≤ z^A` with
  `s = A/B` rational (s = 3, 14/5, 27/10), so **no floating-point boundary
  decides a membership**. Result: ALL PASS at 12 of 15 (s, z) rows, the three
  failures being the levels below the onset where the family is genuinely
  empty (S4).
- **random sample (P7b).** 400 real tuples per level drawn from the actual
  prime lists and each checked as a genuine first-exit chain: **0 failures at
  every one of the 12 live levels**, minimum ln-margin on the exit condition
  0.3588 (S4). A monotonicity error in the corner argument would show here.

**NEW DEFECT.** The analytic p* window `(4D^{1/27}, D^{1/9}/4)` of §4.2 is
**neither necessary nor sufficient** at reachable levels. The exact condition
is `d′_min·p*³ > D` with `p* < min(B₄)`. At (s, z) = (3.0, 1e6) the analytic
window holds {17, 19, 23} but 17 **fails** the exact exit condition; at
(2.7, 1e7) the exact admissible set is {19, 23} while the analytic window is
(20, 31) and so **misses** 19 (S4). Consequence for the derivation: none — it
needs existence, and the exact set is non-empty **earlier** than the analytic
one. Consequence for the record: any onset figure computed from the analytic
window is wrong in both directions.

**NEW: the exact onset.** First z at which the exact family is non-empty with
two admissible `p*`, scanned on a 0.5% log grid (S4, P7c):

| s | exact onset | the analytic figure the record quotes |
|---|---|---|
| 3.0 | z ≈ 4.42e5 | — |
| 2.8 | z ≈ 1.12e6 | — |
| 2.7 | z ≈ 1.86e6 | 1.055e6 at s = 2.698721 (`redteam-0830-floor-growth.md` §0 caveat 2) |

So the record's single "empty below z = 1.055e6" is an analytic figure at one
s, and it is **optimistic by 1.8×** at that s while being **pessimistic by
2.4×** at the corpus's own measured family s = 3.0. **NO BREAK; two figures
corrected.**

## 6. Attack (d): the count at a different s, against a pre-registered band

The first pass measured only `s = 2.698721` and listed the s-dependence as not
reached. This pass computes the literal dyadic family at **s = 3.0 and
s = 2.8** (and 2.7 as a bridge to the first pass's regime) on an independent
odd-only bitset sieve to 1.01e8, with `A_i = ∏_j ⌈c_j/2⌉` and
`∏_j ⌊c_j/2⌋` from exact box prime counts (S5).

| s | z | A₁A₂ | log_z(A₁A₂) | step slope | model 16s/9 − 8/ln z |
|---|---|---|---|---|---|
| 3.0 | 1.000e6 | 7.300e18 | 3.1439 | — | 4.7543 |
| 3.0 | 3.000e6 | 1.877e21 | 3.2844 | 5.0512 | 4.7969 |
| 3.0 | 1.000e7 | 5.537e23 | 3.3919 | 4.7237 | 4.8370 |
| 3.0 | 3.000e7 | 1.072e26 | 3.4813 | 4.7933 | 4.8687 |
| 3.0 | 1.000e8 | 3.924e28 | 3.5742 | **4.9025** | 4.8990 |
| 2.8 | 3.000e6 | 1.549e19 | 2.9627 | — | 4.4414 |
| 2.8 | 1.000e7 | 3.038e21 | 3.0689 | 4.3845 | 4.4814 |
| 2.8 | 3.000e7 | 5.119e23 | 3.1709 | 4.6667 | 4.5131 |
| 2.8 | 1.000e8 | 9.790e25 | 3.2488 | **4.3636** | 4.5435 |

**P8 HELD.** Every step slope lies in the pre-registered [4.0, 6.0]; the
pre-registered top step at s = 3.0 lands at 4.9025 inside [4.6, 5.6], against
a model 4.8990 — a residual of +0.0035. At s = 2.8 the top step reads 4.3636
against 4.5435, a residual of −0.18. Nothing near `2s = 6`, which is what a
count that was not the four-chain count would have shown.

**Read this at its rung.** Four steps at each s over two decades is a
consistency reading of the count, not evidence for the law. It shares the
first pass's §4 limitation exactly: it tests the family the derivation builds.

**The disconfirming half.** The floor is still nowhere near a computable
failing window. `log_z(A₁A₂)` reaches 3.5742 at (3.0, 1e8) against the
`u₀ ≈ 4.266` it must pass — a deficit of **0.69 of exponent**, and at s = 2.7
a deficit of 1.18. No computation in reach falsifies REC.

**NEW, and it moves a live-layer figure.** Fitting `A₁A₂ = C·z^{16s/9}/ln⁸z`
on the measured levels gives `C = 1.121e−4` at s = 3.0 and solving
`A₁A₂ = z^{β₂}` puts the crossing at **z ≈ 10^15.30**, against 10^25.01 at
s = 2.8 and the record's 5.6e31 at s = 2.698721 (S8). The record's "the
falsity lives beyond z ≈ 1e31" is an **s = 2.6987 figure quoted without its
s**, and at the corpus's own measured family (s = 3.0, `rho-maximal-law.md`
§1) the crossing sits sixteen orders of magnitude earlier. Direction guard:
`A₁A₂` is a lower bound on Ω (six-chains and other splits are not counted), so
the true crossing is earlier still — the correction is adverse to REC, not
favourable.

## 7. New attack: the planted class against the PROVEN mean square

This is the one line of attack that could have broken the growth half by
contradiction with a **theorem** rather than by finding an error. Lemma V gives
`⟨R₁²⟩ ≤ B = O(ln⁸z)`, PROVEN. If the planted positions were common enough,
their own contribution `(density)·(Ω+M)²` would exceed `B` and the floor would
be false outright.

The first pass computed the contribution as `H(Ω + H·M)²/W` — i.e. treating
the planted set as **one position out of W**. That is the wrong density. The
planted class has `∏_{p ∤ n₁n₂}(p−2)` members, so its density is `≈ 1/(n₁n₂)`
up to the factor `∏(1−2/p)`, and `n₁n₂` is the product of the primes in the
four boxes — **exponentially smaller than W**: `ln(n₁n₂) = 7.499e7` at
(s, z) = (3.0, 1e8) against `ln W = θ(z) ≈ 1e8`. The correct upper bound is
`(A₁A₂)²/(2·n₁n₂)`, and it reads (S6):

| s | z | ln(n₁n₂) | log₁₀(A₁A₂) | log₁₀ of the contribution to ⟨R₁²⟩ |
|---|---|---|---|---|
| 3.0 | 1.000e6 | 7.490e5 | 18.863 | −3.25253e5 |
| 3.0 | 1.000e8 | 7.499e7 | 28.594 | −3.25692e7 |
| 2.8 | 1.000e8 | 2.196e7 | 25.991 | −9.53710e6 |

Against `B = O(ln⁸z) ≈ 10^{10.6}` at z = 1e8. **The escape fails by an
exponential in `D^{1/3}`, and the first pass's own figure was too small — it
understated the only quantity that could have broken the floor**, by the
factor `W/(n₁n₂)`. The conclusion is unchanged and the arithmetic is
corrected. **NO BREAK.**

## 8. Attack (e): the corollary and its constant

"`2 × capped-LP-max > β₂` for every `s > 2.3999`" is what kills the whole legal
band, so its constant is load-bearing. Re-derived here without reading the
first pass's derivation: solve `2·cappedLP₄(s) = β₂` by bisection on the
exact-vertex LP. Result `s* = 2.3998782848`, against `9β₂/16 = 2.3998782848`,
agreeing to **4.4e−16** (S1). `1+√e = 2.6487` clears it by **0.248843**, and
0 of 10 tested legal s have a doubled threshold at or below β₂. With the exit
window enforced (§4) the doubled threshold stays above β₂ at every legal s
including `s ≥ 7`, where the four-prime family is empty and the all-ones `2k`
chains carry it. **P4 HELD, extended.**

The identity `s* = 9β₂/16` is exact and one line: `2·(8s/9) = β₂ ⟺ s = 9β₂/16`.
It holds only on `s ≤ 3`; above 3 the doubled threshold is larger still, so the
inequality is not tight anywhere in the legal band.

## 9. Infrastructure repeated on purpose: the sign facts

Declared as a repeat of the first pass's attack 5 and of
`redteam-0830-floor-sign.md` row 2, rebuilt here only because §5 and §7 stand
on it. Own support built from the prefix conditions, own λ by direct Möbius
summation over divisors, exact integer comparisons: over all `2^{π(z)−1}`
divisors at `z = 13..41` and at **three** values of s (2.7, 2.8, 3.0),
**0 negative λ⁺, 0 positive λ⁻, 0 disagreements between λ⁺ and the
first-exit-chain count, 0 even-length exits from D⁺, 0 odd-length exits from
D⁻** (S2, 24 rows). The maximisers at these z have one rough side, where
`B = −λ⁻(1) = −1` and E3's non-negativity does not apply — exactly
`redteam-0830-floor-sign.md` row 3's rider, reproduced here (S3).

## 10. Attack (f): the scope of death

Conditional on the growth half (DERIVED) and the exact half (PROVEN), and on
the Rosser vector-sieve lattice at equal levels:

**Dead.**

| statement | for which parameter | why |
|---|---|---|
| `REC(s, u₀)` | every fixed `s > 1+√e` and every fixed `u₀ < 2·cappedLP(s)`, which is ≥ 4.7088 at every admissible s — hence **the whole legal band `u₀ ∈ (2, β₂]`** | §3's chain |
| `RML(α)` = **L2** of `object-g2-read-0829.md` §4b | every `α < 2·cappedLP(s)`, hence every `α < β₂` | `sup\|ρ̃\| ≥ (Ω+M)/2` at **H = 1**; this needs no window and no E4 at all |
| `F2` | every `H ≍ z^{β₂−ε}` | implied by REC's failure at the same H |
| `F1` | once `Ω ≥ z^{β₂−ε}`; F1 is existential in H, so it survives until then (`redteam-0830-floor-sign.md` row 5) | E4 removes every candidate `H ≤ Ω` |
| `F4` (Gaussian form) | a fortiori | F4 ⟹ REC |

**Alive, and this is the part the programme wants.** The floor lives on a class
of density `≈ 1/(n₁n₂) = exp(−Θ(D^{1/3}))` (§7). So:

- **Every almost-all-positions statement survives untouched.** Lemma V itself
  is a mean square and is PROVEN; any recovery of the form "for all but
  `O(W/z^A)` positions, `|R_H| ≤ …`" is not touched by anything here, because
  the planted class is smaller than any polynomial fraction of W.
- **The legal open set loses exactly one row, not the family.** Of
  `object-g2-read-0829.md` §4b: **L2 dies**. L1 (any unconditional
  `G₂(x#) ≪ x^{α+ε}`) is untouched — the floor is about a certificate, not
  about `G₂`, and the measured `G₂` exponent stays ~1.5. L3–L10 are different
  objects and are untouched; U1–U3 untouched.
- **What is NOT established:** that no sup-over-positions statement of any kind
  survives. The family that dies is the sup family **on this lattice**. A
  different admissible weight pair is a different statement (§3, scope fact 1),
  and the only thing on file about it is a heuristic.

So the honest one-line answer to (f): *the sup-over-positions family on the
Rosser vector-sieve lattice at equal levels is dead across the whole legal
band, one row (L2) leaves the legal open set, and every almost-all-positions
statement — including Lemma V, the thing that is actually proven — is
untouched.*

## 11. What would falsify THIS note

- **The growth half broken by a seventh, eighth, ninth or tenth attack.** Ten
  attacks have now run (six there, four plus two new ones here) and none
  found a break. That is ten failed breaks on a derivation, not a proof; the
  base rate says a derivation that survives ten passes is still a derivation.
- **An error in E2 above z = 41** would collapse §5 and §7 to statements about
  a count of subsets. RUN exhaustively to z = 41 at three s: none. NOT RUN
  above 41 by this pass.
- **A level at which the exact family fails a membership condition.** RUN at
  12 (s, z) levels by corners and by 400 random tuples each: none, min
  ln-margin 0.3588. NOT RUN above z = 1e8.
- **A step slope outside the pre-registered band.** RUN: all inside.
- **The scope clause of §3 turning out to be empty**, i.e. a proof that any
  admissible `λ⁺` has the same floor: would make the `REFUTED.md` row's
  unscoped wording correct after all. NOT RUN; no derivation attempted here.
- **A computable failing window.** Needs `log_z Ω ≥ u₀ ≈ 4.27`; the best
  reached here is 3.5742 at (3.0, 1e8), a deficit of 0.69. NOT RUNNABLE at any
  level this laptop or the box can hold; §6's fit puts the s = 3.0 crossing at
  z ≈ 10^15.3.
- **The `A₁A₂` fit's constant.** `C = 1.121e−4` is fitted on the top measured
  level alone; a different C moves the 10^15.3 figure by `Δln C / (16s/9 − β₂)`
  ≈ 0.94 of a natural log per unit of ln C. The crossing figure is
  order-of-magnitude, not a number to quote to two places.

## 12. What this note contradicts in the live layer (file:line, NOT applied)

Nothing below is edited. Each line is what a later pass would have to change.

| file:line | current wording | what this note says |
|---|---|---|
| `research/REFUTED.md:99` | "red-teamed **once** on each half" | red-teamed **twice** on the growth half (§§3–8), once on the exact half. Rung is **still DERIVED, not PROVEN** — a second failed break is a second failed break |
| `research/REFUTED.md:99` | "survived **six** independent attacks" | ten: six there, four here (the quantifier, the CRT/membership step, the LP by exact vertices, a different s), plus two the brief did not ask for (the reachable-level pattern optimality, the planted class against the proven mean square) |
| `research/REFUTED.md:99` | "REC(s, u₀), F1, F2 and RML(α) are FALSE" — **unscoped** | add "**on the Rosser vector-sieve lattice at equal levels D₁ = D₂ = z^s**". As written the row reads as killing every sup-over-positions statement for every admissible weight system; only the Rosser instance is derived (§3, scope fact 1) |
| `research/REFUTED.md:99` | "the falsity lives beyond **z ≈ 5.6e31**" | that is the `s = 2.698721` figure. At s = 3.0, the corpus's own measured family, the fitted crossing is **z ≈ 10^15.3** (§6). The sentence needs its s, or the s = 3.0 figure |
| `TODO.md:28` (board row 1) | "growth half survived **six** attacks … falsity lives beyond **z ≈ 1e31**" | ten attacks; and the crossing is s-dependent, 10^15.3 at s = 3.0 |
| `TODO.md:680–687` | "survived six attacks and stays DERIVED"; "the falsity lives beyond z ≈ 1e31 (the literal construction is empty below z = 1.055e6 and first passes H = z^{u₀} at z ≈ 5.6e31)" | ten attacks, still DERIVED; the exact onset is **4.42e5 at s = 3.0**, 1.12e6 at 2.8, 1.86e6 at 2.7 (§5), and 1.055e6 is an *analytic-window* figure at one s that is optimistic by 1.8× at its own s |
| `TODO.md:29` (board row 1, next move) | "a second adversarial pass on the growth half, or a non-two-class input (none known)" | the second pass has run and found no break; the next move is now only the non-two-class input |
| `TODO.md:658–661` | "(i) the threshold 16s/9 needs the hypothesis s ≤ 3 (above it the capped LP max is (2s+2)/3, then 4)" | true, and incomplete: above `s ≥ 7` the four-prime construction has **no exit prime below z at all** (`Σa + 3a₄ = 7`), so "then 4" is available only on `5 ≤ s < 7`; longer chains carry `s ≥ 7` with a larger threshold (§4) |
| `README.md:234` | "its growth half survived **six** attacks" | ten |
| `research/G2-STATE.md:186–192` | "the growth half survived six attacks and stays DERIVED, with the hypothesis s ≤ 3 added … its falsity lives beyond z ≈ 1e31 … reopening it needs a second adversarial pass to break the growth half" | ten attacks; the s-dependence of the crossing; and **the second adversarial pass has now run and did not break it**, so this sentence's own reopening condition is spent |
| `research/history/staging/redteam-0830-floor-growth.md` R3 (staging, not live) | "for s > 3 the same construction gives the smaller threshold 2(2s+2)/3 up to s = 5 and **8 beyond it**" | 8 only on `5 ≤ s < 7`; the four-prime family is empty from s = 7 (§4) |
| `research/history/staging/redteam-0830-floor-growth.md` §3 escape (a) (staging) | "their own contribution to ⟨R_H²⟩ is at most H(Ω + HM)²/W" | the planted class has `∏_{p∤n₁n₂}(p−2)` members, so the density is `≈ 1/(n₁n₂)`, exponentially **larger** than 1/W; the corrected bound is `(A₁A₂)²/(2n₁n₂)`, log₁₀ = −3.257e7 at (3.0, 1e8), and the escape still fails (§7) |
| `research/history/staging/attack-0830-rec-cheapest.md` §4.2 | the p* window "(4D^{1/27}, D^{1/9}/4)" | a convenience bound, neither necessary nor sufficient at reachable levels; the exact condition is `d′_min·p*³ > D` with `p* < min(B₄)` (§5) |

*Gate: `node research/qc.js --full` result recorded in the closing report; the
producer's tail verifies under `qc/embed.js --check`.*
