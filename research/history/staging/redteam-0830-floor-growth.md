# Red team, 2026-08-30: the GROWTH half of `attack-0830-rec-cheapest.md` §4.2–4.3, re-derived on independent code

<!-- ledger
id: Q-redteam-0830-floor-growth
status: ANSWERED
todo: 0
question: Does the DERIVED growth half of attack-0830-rec-cheapest.md sec.4.2 (Omega >> z^{16s/9}/ln^8 z from four-prime Rosser exit chains) survive an adversarial re-derivation on independent code, does it really make REC(s, u0) false for every u0 < 16s/9, and does the blind slope test of blind-0830-omega-floor.md test the LAW or the CONSTRUCTION?
verdict: No break found in six attacks, so the growth half SURVIVES this pass and stays DERIVED (one failed break is not a proof, and the whole thing still rests on the exact half E1-E3 that this pass did not grade); but four claims are corrected - the threshold 16s/9 needs the unstated hypothesis s <= 3 (above it the four-prime LP maximum is 2(2s+2)/3, then 8, both below 16s/9, though the corollary that every legal u0 < beta_2 fails survives at every admissible s because 2 x LP-max > beta_2 for all s > 9beta_2/16 = 2.3999), the 2s - o(1) limit needs 3^k <= ln D / ln 8 so only k = 2 is available at every z below 1.1e9, A_i is >= not ~ the dyadic count, and the certified ratio does NOT rise monotonically (0.0118, 0.0128, 0.0101, 0.0057, 0.0051, 0.0093, 0.0336, 0.0801, 0.1658, 0.3545 on my own recount, which reproduces all ten S4b rows digit for digit); the blind test is ruled a test of the CONSTRUCTION's count and not of the law, since it cannot see E1-E3 or the CRT step; on the ruling Chris asked for, the floor does make the RML route a truth gap asymptotically and conditionally on E1-E4, and changes nothing computable, the literal construction first passing H = z^{u0} at z ~ 5.6e31 on the constant 2.93e-4 measured here; no exponent moved.
-->

> **RIDER 2026-09-04 (orchestrator, from `redteam-0904-floor-growth-2.md` §12
> and `redteam-0904-item0.md`).** Two corrections. (1) R3's "then 4" for the
> capped LP maximum above s = 5 holds only on [5, 7], inclusive at 7; from
> s ≥ 7 the four-prime construction has no exit prime below z at all, so the
> corollary's coverage there is by the s ≤ 3 clause and not by a value of the
> maximum. (2) §3's escape (a) prices the planted class at density 1/W; the
> planted class is larger by the factor W/(n₁n₂), and the two-sided version
> through λ⁺(n) ≤ 2^{ω(n)} brackets one split's contribution between
> 10^{−3.257e7} and 10^{−3.004e7} against B ≈ 10^{10.1}; one split is not the
> sum over splits, and the escape still fails by an exponential in D^{1/3}.
> Neither correction moves the verdict.

*(Internal, HELD under the publication moratorium. Adversarial only. One new
producer, `research/history/staging/redteam-0830-floor-growth.js`, embedded via
`qc/embed.js`; it shares no code with `attack-0830-rec-cheapest.js`,
`blind-0830-omega-floor.js` or `research/sift-limit-lemmaV.js` (own sieve, own
statement of the Rosser conditions, own λ by direct Möbius summation, own
chain enumeration, own loop order, own segmented sieve). No existing file was
edited; no git command was run. Every figure below is in that producer's OUTPUT
block, cited by line. Calibration per `CLAUDE.md`. The sign lemma and the exact
enumeration (E1–E4) are the sibling pass's target and are NOT graded here.)*

## 0. VERDICT

**Six attacks, no break. That is a survived pass, not a proof, and the base
rate here says one clean pass is worth about one.** The growth half stays
**DERIVED**. It cannot rise above that until the exact half (E1–E3: that
cc(r) = −(A₁A₂ + A₁B₂ + B₁A₂), hence Ω ≥ A₁A₂) is ruled, and that is the
sibling's file, not this one. Everything below is conditional on it.

**Four caveats, before the survival.**

1. **A missing hypothesis, s ≤ 3.** The threshold "16s/9" is the doubled
   four-prime LP maximum *only while every prime of the chain can divide
   P(z)*, i.e. while s/3 ≤ 1. Above s = 3 the exact capped maximum is
   (2s+2)/3 per side for 3 ≤ s ≤ 5 and 4 for s ≥ 5 (lines 546–555), both
   strictly below 8s/9. The note states 16s/9 with no upper bound on s.
2. **Nothing computable changes, and the crossing is further out than the
   note's own framing suggests.** The literal construction of §4.2 is EMPTY
   for z < 1.055e6 (its p\* window (4D^{1/27}, D^{1/9}/4) is void until
   D^{2/27} > 16, line 582), and on the constant measured here, 2.930e-4
   flat over three decades (line 612), its A₁A₂ first exceeds H = z^{u₀} at
   z ≈ 5.6e31 (line 613).
3. **One measurement is described in the wrong direction.** §4.4's "0.012 at
   z = 601 and 0.35 at z = 5e5, rising" quotes two endpoints of a sequence
   that falls by a factor 2.5 in between (line 622–634). Over 1e4..5e5 the
   step slopes run 4.84 → 5.42 → 5.34 → 5.17 → 4.99 against
   16s/9 − 8/ln z = 3.96 → 4.17 (lines 641–645): an excess of +0.83 to
   +1.40, the four-chains turning on, not the model being tracked.
4. **The blind test tests the construction, not the law.** Ruled below (§4).

**What survived.** The boundary identity the whole thing runs on
(λ⁺(n) = #{first-exit chains of D⁺ ending at the least prime of n}) is
re-derived here and machine-checked against a direct Möbius sum over EVERY
subset of the primes below z, at z = 13..41 and both s: **0 mismatches, 0
sign violations, 0 even-length exits from D⁺, 0 odd-length exits from D⁻**
(lines 528–541). The exponent pattern (s/3, s/3, s/9, s/9) is the *exact* LP
optimum for four primes at every s ≤ 3, not a lucky guess (lines 546–550),
and the 2k-prime pattern s(1 − 3^{−k}) is optimal too at s ≤ 3 (558–567).
The construction's own dyadic count, recomputed from exact segmented-sieve
prime counts at z = 2e6..1e9, has step slopes 4.60, 4.16, 4.49, 4.14, 4.52,
4.43 against a model slope 4.26 → 4.40 (lines 593–599): the count does grow
at 16s/9 up to logs, on code that shares nothing with the source. All ten of
the source's S4b rows reproduce **digit for digit** on a different loop
order, and z = 601 and 1000 also reproduce under an O(n⁴) brute force
(lines 620–634). Both routes from Ω to a contradiction with REC land on the
same threshold u₀ < 16s/9 (lines 649–676), and both escapes the brief names
fail quantitatively (lines 678–687).

**The ruling Chris asked for.** *Yes, conditionally and asymptotically.* If
E1–E4 hold, then at every s the note prices the floor makes REC(s, u₀), F1,
F2 and RML(α) below β₂ **false**, not merely unproven, so the route is a
truth gap and not a proof gap. Two things keep that from being final: the
conditioning on E1–E3, which this pass did not grade; and the fact that the
falsity is a statement about z beyond 1e31, so no computation distinguishes
it from the proof-gap reading at any reachable level.

## 1. Claims table

Quoted from `research/history/staging/attack-0830-rec-cheapest.md` by line.
"Lines" in the re-derivation column are lines of
`research/history/staging/redteam-0830-floor-growth.js`.

| # | Claim, quoted | Independent re-derivation | Verdict |
|---|---|---|---|
| G1 | L167–174 (E2): "D⁺ exits only at odd m … the size cap is implied at even m" | Re-derived: at even m the prefix satisfied p₁⋯p_{m−2}p_{m−1}³ ≤ D and p_m < p_{m−1}, so p₁⋯p_m < p₁⋯p_{m−2}p_{m−1}² ≤ D. Machine-checked over every subset at z = 13..41, both s: 0 even-exits from D⁺, 0 odd-exits from D⁻ (528–541) | **STANDS** |
| G2 | L193–195: "λ⁺(P₁) = #{d′ ∈ D⁺ : d′ \| P₁/p\*, ω(d′) even, d′ > D/p\*³}" | Re-derived from Σ_{d\|n}μ(d) = 1_{n=1} with the first-exit split; the indicator 1[(n, P(p_m)) = 1] forces p_m = least prime of n. Checked as an identity, both signs, every subset, z ≤ 41: 0 mismatches (528–541) | **STANDS** |
| G3 | L198–201: "At the extremal exponent pattern (s/3, s/3, s/9, s/9) the product reaches D^{8/9}" | The LP max of Σa_i under 3a₁ ≤ s, a₁+a₂+3a₃ ≤ s, a₁≥a₂≥a₃≥a₄, **a_i ≤ 1** is 8s/9 for s ≤ 3, attained at that pattern; a 1200² grid returns 8s/9 to six places at every s ≤ 3 and (2s+2)/3 above it (546–555), matching the analytic vertex | **STANDS** (s ≤ 3) |
| G4 | L201–207: the four dyadic boxes, "exit at every p\* > 4D^{1/27}", "each with A_i ≍ D^{8/9}/ln⁴D" | Every corner inequality asserted on real integers at z = 2e6..1e9 and passed (0 assertions failed, line 704). But **≍ is wrong**: A_i = λ⁺(P_i) also counts 6-, 8-chains, so only ≥ is derived | **WEAKENED** (see R1) |
| G5 | L209: "Ω(z, s) ≥ A₁A₂ ≫ z^{16s/9}/ln⁸z (DERIVED, HELD)" | Survives, conditional on E1–E3. The implied constant is measured 2.930e-4 and flat over 1e6..1e9 (612); the literal construction is empty below z = 1.055e6 (582) | **STANDS** (s ≤ 3, on E1–E3) |
| G6 | L211–214: "Ω(z, s) ≥ z^{2s−o(1)} … the o(1) being O(3^{−k}) at the cost of a polylog ln^{−4k}z" | k is not free: the smallest box is (D^{3^{−k}}/4, D^{3^{−k}}/2], so 3^k ≤ ln D/ln 8. Only k = 2 is available at every z < 1.1e9; k = 3 needs z > 1e12, k = 4 needs z > 1e27 (604–610). The limit still holds (3^k ≍ ln D gives deficit O(1/ln z) and cost z^{o(1)}), but the stated cost accounting is not the binding one | **WEAKENED** (see R2) |
| G7 | L228–229: "REC(s, u₀) is false for every u₀ < 16s/9, if §4.2 stands" | The implication's arithmetic is right and the threshold is confirmed twice over (650–676). But 16s/9 is the four-prime maximum only at s ≤ 3; at s = 3.5 the capped LP max doubled is 6.0000 against 16s/9 = 6.2222, at s = 5 it is 8.0000 against 8.8889 (552–554, 656–658) | **WEAKENED** (see R3) |
| G8 | L233–235: "the whole legal band (2, β₂] is below the threshold at every admissible s" | True, but the note's reason only covers s ≤ 3. Corrected reason: 2 × (capped four-prime LP max) > β₂ for every s > 9β₂/16 = 2.3999, and 1+√e = 2.6487 > 2.3999 (546–555, 650–658) | **STANDS**, reason replaced (R4) |
| G9 | L245–248: "q = d₁d₂ ≈ D^{16/9}·p\*₁p\*₂ ≈ z^{4.8}" | 16s/9 + 2s/27 = 4.9976 at s = 2.698721, not 4.8 (615). Conclusion unaffected: 4.9976 still sits inside (z^{4.2165−δ}, z^{5.3974}] | **WEAKENED**, numeric (R5) |
| G10 | L186 and L378: "sup\|ρ̃\| ≥ (Ω − M)/2" | At the planted r, R₁ = cc(r) − M = −Ω − M, so \|R₁\| = Ω + M and the bound is (Ω + M)/2. The note's form is true but slack in the safe direction | **WEAKENED**, slack (R6) |
| G11 | L284–286: "the bound tracks z^{16s/9}/ln⁸z at 0.012 of it at z = 601 and 0.35 at z = 5e5, rising" | Independent recount of the same object: 0.0118, 0.0128, 0.0101, 0.0057, 0.0051, 0.0093, 0.0336, 0.0801, 0.1658, 0.3545 (622–634). It falls 2.5× first; the rise is the four-chain turn-on, with step-slope excess +0.88 to +1.40 over the model (641–645) | **WEAKENED** (R7) |
| G12 | L277–286 (S4b's ten rows, A₁, A₂, Ω ≥ A₁A₂, log_z) | Reproduced digit for digit on a different loop order, p\* fixed at (47, 43) with the monotonicity in p\* checked by explicit scan at z = 601, 5000, 50000; z = 601 and 1000 also reproduced by O(n⁴) brute force (620–634) | **STANDS** |
| G13 | §4.3's use of `blind-0830-omega-floor.md` (slope 4.85 → 4.38 onto 16s/9 − 8/ln z) as support for §4.2 | A slope test on the family the derivation constructs sees only the family's asymptotic count. It cannot see E1–E3, cannot see the CRT realisation, and checked λ⁺ ≥ family at one level only (z = 601). It does discriminate an exponent error in the count: a control family built by dropping one D⁺ condition slopes 6.34 → 5.49 against the family's 3.71 → 5.34 (693–697) | **WEAKENED** as evidence (R8) |

### Replacement sentences

- **R1** (§4.2, L205–207): "two disjoint sets P₁, P₂, each with
  A_i = λ⁺(P_i) ≥ #(the dyadic four-chain sub-family) ≫ D^{8/9}/ln⁴D by
  Chebyshev's bounds on the four dyadic prime counts (λ⁺ also counts the
  longer chains, so no matching upper bound is claimed), whence"
- **R2** (§4.2, L211–214): "The same construction with 2k primes at the
  pattern (s/3, s/3, s/9, s/9, …, s/3^k, s/3^k) gives exponent 2s(1 − 3^{−k}),
  legal only while the smallest box (D^{3^{−k}}/4, D^{3^{−k}}/2] can hold a
  prime, i.e. 3^k ≤ ln D / ln 8; taking 3^k ≍ ln D gives a deficit O(1/ln z)
  at a polylog cost ln^{4k}z = z^{o(1)}, so **Ω(z, s) ≥ z^{2s − o(1)}** for
  fixed s ≤ 3 as z → ∞. At every z below 1.1e9 only k = 2 is available, so
  the four-chain exponent 16s/9 is the whole of what any reachable level can
  show, and it is what the rest of this note uses."
- **R3** (§4.3, L228): "**REC(s, u₀) is false for every u₀ < 16s/9 at every
  s ≤ 3, if §4.2 stands** (the four-prime pattern needs p₁ ≈ D^{1/3} ≤ z; for
  s > 3 the same construction gives the smaller threshold 2(2s+2)/3 up to
  s = 5 and 8 beyond it, which is still above β₂)."
- **R4** (§4.3, L233–235): "So the whole legal band (2, β₂] is below the
  threshold at every admissible s: the doubled four-prime maximum exceeds β₂
  for every s > 9β₂/16 = 2.3999, and every admissible s exceeds
  1+√e = 2.6487; and the 'cheapest' point is not cheaper in the only currency
  that turns out to matter."
- **R5** (§4.3, L245–248): "The pairs (d₁, d₂) = (d′p\*₁, d″p\*₂) have
  q = d₁d₂ ≈ D^{16/9}·p\*₁p\*₂ ≈ z^{16s/9 + 2s/27} = z^{5.00}, inside
  yesterday's reduced range (z^{u₀−δ}, z^{2s}] = (z^{4.2165−δ}, z^{5.3974}]"
- **R6** (§4.1, L186): "and since R₁(x) = cc(x+1) − M, **sup|ρ̃| ≥ (Ω + M)/2**."
- **R7** (§4.4, L284–286): "and the bound reads 0.012 of z^{16s/9}/ln⁸z at
  z = 601, falls to 0.0051 at z = 1e4, and rises to 0.35 at z = 5e5 as the
  four-prime chains turn on; over that rise the step slopes run 4.84 → 4.99
  against a model slope 3.96 → 4.17, an excess of +0.83 to +1.40, so this
  range records the family switching on and is not a test of the ln⁸z model."
- **R8** (§4.3 / reading 5): where the note leans on the blind test, add:
  "the blind test measures the asymptotic count of the family the derivation
  itself builds; it is a check on that count and on the code, and it is
  silent on E1–E3, on the CRT realisation, and on λ⁺ ≥ the family count
  above z = 601."

## 2. The six attacks, and why each failed

1. **A miscounted multiplicity.** Each d′ = p₁p₂p₃p₄ gives exactly one chain
   d₀ = d′p\*, and distinct prime sets give distinct d₀, so the four dyadic
   half-boxes contribute Π(half-counts) with no double count. The two sides
   are disjoint by the parity split, so no chain is shared. Checked
   structurally, and checked against λ⁺ itself: the identity of G2 holds on
   every subset at z ≤ 41 (528–541).
2. **A wrong exponent in the chain count.** The 8s/9 is the LP optimum, found
   by a 1200² grid that was not told the note's pattern and returns it to six
   places (546–555). This is where the scope defect surfaced instead: the LP
   optimum equals 8s/9 only under a_i ≤ 1.
3. **A dropped log factor.** A_i ≍ D^{8/9}/ln⁴D uses four dyadic prime
   counts, so the product carries ln⁸D = s⁸ln⁸z, absorbed by ≫. The measured
   ratio of the literal construction to z^{16s/9}/ln⁸z is 2.930e-4 and flat
   over three decades with local slopes straddling the model's (593–599,
   612): a wrong log power would show as a drift, and does not.
4. **An overlap between chains counted as disjoint.** The p\* window
   (4D^{1/27}, D^{1/9}/4) is checked non-empty and to hold ≥ 2 primes at
   every live level (583–590, and the assertion p\* < box B4), so p\*₁ ≠ p\*₂
   and the two sides are prime-disjoint.
5. **A sign that could cancel.** This is the load-bearing one and it is E2's:
   because D⁺ exits only at odd m, every boundary term carries μ(d₀) = −1 and
   λ⁺ is a count with no cancellation, so a sub-family is a lower bound.
   0 counterexamples over all 2^{π(z)} divisors at z ≤ 41, both s (528–541).
6. **The implication's quantifiers.** Two independent routes, same threshold
   (§3).

## 3. The implication, and both escapes the brief names

**Route 1, the note's.** REC ⟹ sup|R_H| ≤ z^{u₀/2−ε}·rms; C1–C2 give
rms ≤ z^{u₀/2}(ln z)⁴O(1) with B = O(ln⁸z), PROVEN
(`attack-0829n-rml-proof.md` §2, `redteam-0829-theorem1.md`); so
sup|R_H| ≤ z^{u₀−ε}ln⁴z < HM − 1 ≍ c z^{u₀}/ln²z, hence min_x T ≥ 1. E4 gives
T(r−1) ≤ −Ω + H − 1 ≤ −1 once H ≤ Ω. The step needs only
B < c²z^{2ε}/ln⁴z, i.e. z^{2ε} > ln¹²z, finite for every fixed ε > 0
(664–668). It is not effective: at ε = 0.05 the z₀ is 10^{348}. That is a
property of REC's own unquantified z₀, not a defect of the note.

**Route 2, independent of C4–C6.** sup|R_H| ≥ Ω − H + 1 + HM directly, so
sup/rms ≥ z^{16s/9 − u₀/2 − o(1)} against REC's allowance z^{u₀/2 − ε}. The
contradiction needs 16s/9 − u₀/2 > u₀/2, i.e. u₀ < 16s/9: **the same
threshold, reached without C4, C5 or C6** (671–676). Two routes agreeing is
the strongest thing this pass found in the note's favour.

**Escape (a), "the rms is as large".** It cannot be. The planted windows are
H positions out of W = P(z), so their own contribution to ⟨R_H²⟩ is at most
H(Ω + HM)²/W, whose log₁₀ is −3.7e2 at z = 1e3 and −4.3e8 at z = 1e9
(681–683). And the rms is capped above by C1–C2, which is a theorem.

**Escape (b), "a floor at one position, an rms at another H".** Not
available: E4 bounds T(x) for every window containing r at the same
H = z^{u₀}, and REC's sup runs over all W positions at that same H.

## 4. Does the blind test test the law or the construction?

**The construction.** Its object is A₁A₂ for a family whose membership rule
*is* the derivation's own combinatorics; measuring its log-slope and finding
16s/9 − 8/ln z measures whether the count of 4-subsets of primes under three
inequalities has the asymptotics the derivation computes for it. That is a
real check of one step and of the code — the control family here, built by
dropping the condition p₁p₂p₃³ ≤ D, slopes 6.34, 5.89, 5.64, 5.49 against
the family's 3.71, 4.84, 5.42, 5.34 (693–697), so an exponent error of ~0.6
would be visible once the transient is over.

**What it cannot reach**, and therefore what a HIT does not license: that
λ⁺(P_i) ≥ the family count (checked at z = 601 only, source line 409); that
Ω ≥ A₁A₂, which is E1–E3 and carries no z-dependence a slope could see; and
that some r ∈ ℤ/W realises the split, which is CRT. The blind note says as
much in its own §0 ("consistency, not proof"); the correction is to §4.3 and
reading 5 of the source, where the certified counts are offered as support
for the growth law rather than for the count.

**One further caution on the discriminating power.** In 5e4..1e5 — the range
where the source's "0.012 → 0.35" lives — the family and the control differ
by only 0.22 and 0.16 of slope (696–697), because both are in transient. The
blind test was right to place its decisive row at 1e8 → 1e9.

## 5. What would falsify the verdicts here, and whether it ran

- **G1, G2 wrong**: a subset n of the primes below z with λ⁺(n) ≠ #(first-exit
  chains of D⁺ ending at min n), or an even-length exit from D⁺. RUN
  exhaustively over all 2^{π(z)} subsets at z = 13..41, both s: none (528–541).
  Not run above z = 41; a failure there would break standard Rosser theory.
- **G3 wrong**: a four-prime pattern with a_i ≤ 1 beating 8s/9 at some s ≤ 3.
  RUN on a 1200² grid over the two free coordinates: none (546–555). Not run
  as a symbolic LP proof.
- **G5 wrong**: a level at which the literal dyadic count falls below
  c·z^{16s/9}/ln⁸z with a falling c. RUN at eight levels 1e6..1e9: the ratio
  is flat at 2.930e-4 (593–612). Three decades is not an asymptotic.
- **G7's scope claim wrong**: an s > 3 at which a four-prime chain of primes
  below z reaches D^{8/9}. Impossible by p₁ ≤ z alone; the LP confirms
  (551–555). What is NOT ruled out is that longer chains recover more than
  2(2s+2)/3 at s > 3; the hill-climb rows there are unconverged and only
  place the ceiling.
- **G11, G12 wrong**: a disagreement with the source's S4b counts. RUN on all
  ten rows with a different loop order, and on two of them with an O(n⁴)
  brute force: none (620–634).
- **The §3 implication wrong**: a proven mean square larger than B = O(ln⁸z),
  or a planted-window contribution to ⟨R_H²⟩ that is not negligible. The
  first is `redteam-0829-theorem1.md`'s object and stands; the second is
  computed here at −4.3e8 in log₁₀ at z = 1e9 (681–683).
- **The whole thing wrong through E1–E3**: not checked here by mandate. If
  cc(r) is not −(A₁A₂ + A₁B₂ + B₁A₂) at a planted point, every verdict above
  that names Ω collapses to a statement about a count of subsets.

## 6. Not reached

The exact half E1–E4 (the sibling's pass), so every verdict above that
mentions Ω rather than A₁A₂ is conditional. Exact Ω at any z (not recomputed
here). The s-dependence of the certified family beyond s = 2.698721. Whether
Chebyshev's bounds are the sharpest available input (they are standard and
sufficient; not searched under `SEARCH-CONVENTIONS.md`). The hill-climb
values for 2k > 4 at s > 3 in lines 568–577 are a search lower bound, not
converged, and are printed to place the ceiling rather than to value it.

*Gate: `node research/qc.js --full` result recorded in the closing report; the
producer's tail verifies under `qc/embed.js --check`.*
