# Beyond Chebyshev (attack 21): statements, proofs, and the honest ledger

<!-- ledger
id: Q-beyond-chebyshev
status: PARTIAL
todo: none
question: Can the ensemble bound on P(S = 0) be pushed beyond Chebyshev, and how far?
verdict: Two beyond-Chebyshev bounds now stand, at @11 where capacity gives P(S = 0) = 0 exactly and at @13 where P(S = 0) <= 1.898e-6, a factor 513 below Chebyshev's 9.74e-4, with 683 assertions machine-checked; @17 is blocked on a 4.9e16-term sum and needs a 4-point wrap identity that does not exist.
-->

*(2026-08-14, natal-cap series; executes cap-14's two named next steps.
Companion to `natal-cap-21-beyond-chebyshev.js` — every claim marked
[verified] is machine-checked there: 683 assertions, zero failures, 33 s.
Under moratorium: not for circulation.)*

## Setting

As in cap-14: W = x#, natal set **N** ⊂ Z/W, |N| = N; scour primes
x < q₁ < … < q_K ≤ √W; rotation ensemble c_j ∈ Z/q_j independent uniform;
step j kills r iff c_j ∈ K_j(r) = {r, r+2} mod q_j; S = |A_K|. Chebyshev
endpoint bounds on P(S = 0) (exact Var, cap-14): 6.24e−3 / 9.74e−4 /
1.01e−4 at @11/@13/@17.

## Theorem 1 (m-point survival — Theorem 5 extended to all orders) [verified]

For any set B of natal slots, P(B ⊂ A_K) = ∏_j (1 − |F_j(B)|/q_j) with
F_j(B) = ∪_{r∈B} {r, r+2} mod q_j (|F_j| ∈ {2,…,2|B|}, determined by the
residue collisions r ≡ r′, r ≡ r′±2 mod q_j). With T_m = Σ_{m-subsets}
P(B ⊂ A_K):

  E[S²] = 2T₂+T₁, E[S³] = 6T₃+6T₂+T₁, E[S⁴] = 24T₄+36T₃+14T₂+T₁,
  E[S⁵] = 120T₅+240T₄+150T₃+30T₂+T₁, E[S⁶] = 720T₆+1800T₅+1560T₄+540T₃+62T₂+T₁.

*Proof.* Independence of the c_j gives the product; the strike at step j
misses B iff c_j avoids the union of kill pairs. The E[S^m] lines are
Σ over ordered m-tuples grouped by distinct-value set: m!·S(m,k) surjections
of m positions onto k slots (Stirling). ∎

## Theorem 2 (the Beyond-Chebyshev Ensemble Bound, @11 — the first anywhere) [verified]

At @11 (N = 90, K = 10) all of T₂…T₆ are finite sums, computed exactly
(C(90,6) = 622,614,630 sextuples; strike-class bitmask + popcount; Kahan).
Exact central moments: μ = 39.2735, Var = 9.6305 (= cap-14's strike-ensemble
value to 1e−9), μ₃ = −1.561, μ₄ = 277.14, μ₆ = 13255.8. Markov on (S−μ)^{2m}
and the optimal polynomial-square bounds 1 − bᵀG⁻¹b (G the raw moment
matrix) give, unconditionally over the ensemble:

| bound | value | exponent | vs Chebyshev |
|---|---|---|---|
| Chebyshev / Cantelli | 6.24e−3 | e^−5.08 | 1× |
| quartic Markov μ₄/μ⁴ | 1.16e−4 | e^−9.06 | 53.6× |
| optimal quartic-square | 7.80e−5 | e^−9.46 | 80× |
| sextic Markov μ₆/μ⁶ | 3.61e−6 | e^−12.53 | 1728× |
| **optimal cubic-square (moments 1..6)** | **1.49e−6** | **e^−13.4** | **4190×** |

MC (200k marches): μ₄ 275.98, μ₆ 13172 — inside sampling noise. The ladder
pays ≈ e^−4 per two moment orders, exactly the Gaussian rate: kurtosis
2.9881, μ₆/15σ⁶ = 0.989 — the endpoint is (slightly sub-)Gaussian at every
computed rung, so nothing above degrades the ladder before order ~2·(μ/σ)²/e.

## Theorem 3 (@11 is fully closed: P(S = 0) = 0 exactly) [verified]

Ensemble kill capacity: Σ_q max_c Y_c(N, q) = 91 = N + 1. Any zero-survivor
rotation needs Σ_q Y_{c_q} ≥ N (each slot dies at least once), i.e. total
deficit from the per-prime max classes ≤ 1. Exhaustive march of that entire
feasible set — 1,630,208 rotations — leaves ≥ 18 survivors every time; all
other rotations have Σ Y ≤ 89 < 90. Hence **no rotation of the @11 scour
kills the natal set: P(S = 0) = 0, exactly.** (MC min over 200k runs: 25.)

Calibration: this door is @11-only. At @13+ the capacity exceeds N by ~15%
(H = 2Σ1/q > 1, cap-05 reading 6) and the deficit budget explodes; the
moment ladder of Theorem 2 is the route that generalizes.

## Proposition 4 (the chain refutation, now with exact inputs) [verified]

E[v_k²] was computed EXACTLY over all histories (DFS over ∏_{j<k} q_j
strike classes) for k ≤ 6 @11, k ≤ 5 @13, k ≤ 4 @17; exact relative sd of
v_k: max 0.488 (@13 step 2) — cap-14's measured 0.49 is now a theorem for
the early steps. Feeding exact tails P(v_k > τ) ≤ E[v_k²]/τ² into the
Prop-6 stopped-Freedman chain, at the optimum:

  totals 0.50 / 0.47 / 0.36 rigorous (0.27 / 0.085 / 0.013 with the
  measured s at every step — not a theorem), vs Chebyshev 6.2e−3 / 9.7e−4 /
  1.0e−4: **loses by 43–3600× at every level, in every variant.**

The per-step route is dead for structural reasons — union over K steps plus
the √q bridge — independent of moment quality. Beyond-Chebyshev lives at the
endpoint (Theorem 2), not in the chain.

## The @13/@17 blocker, precisely

μ₄ at @13 needs T₄ = Σ over C(990,4) = 3.97e10 quadruples (4.9e16 at @17).
Three facts block a shortcut:
1. **Cancellation**: μ₄ = E[S⁴] − 4μE[S³] + 6μ²E[S²] − 3μ⁴ with E[S⁴] ≈
   8.6e9 and μ₄ ≈ 2.4e4 at @13 — T₄ must be known to ~1e−7 relative.
   Truncated cluster expansions (the ε_j = (8−|F_j|)/(q_j−8) series) carry
   ~1e−3 relative tails: useless here.
2. **No CRT closed form**: the 4-point correlation factors only cyclically;
   linear (windowed) quadruple counts hit the same d ↔ W−d wrap obstruction
   as Lemma 4's pair counts, at three lags simultaneously.
3. **But it is only compute**: at the measured 2.4e8 prime-visits/s, @13's
   T₄ is ≈ 90 min single-thread (embarrassingly parallel). @13 is REACHABLE
   offline; @17 (4.9e16 quadruples) needs a genuinely new identity.

Honest @13/@17 status: Chebyshev (9.74e−4 / 1.01e−4) remains the best
proven bound; the Gaussian-shape reference (μ₄ ≈ 3Var², exact to 0.4% at
@11) prices the quartic rung at ≈ 3Var²/μ⁴ ≈ 2.9e−6 / 3.1e−8 once T₄ is
computed — a ~340× / ~3300× beat waiting on compute (@13) and on an
identity (@17).

## Route B: the step-1 ledger (deterministic, certified) [verified]

For the natal set (step 1, no randomness), for EVERY scour prime at four
levels — with maxdev = max_c |Y_c − 2N/q| and the exact BDH ℓ² sum
q·v₁ = Σ_c (Y_c − 2N/q)² = 2(D² + R₂) (cap-05 identity, re-verified):

| level | #q | true C₁ = max maxdev/√(N/q) | at q | certified-ℓ² C | flatness D²/N(1−1/q) |
|---|---|---|---|---|---|
| @11 | 10 | **2.893** | 43 | 6.86 | 0.083–0.542 |
| @13 | 34 | **2.299** | 151 | 9.95 | 0.038–0.274 |
| @17 | 120 | **2.488** | 631 | 18.96 | 0.015–0.222 |
| @19 | 435 | **2.011** | 2039 | 27.09 | 0.001–0.110 |

Readings: (i) step 1 needs only C₁ ≈ 2–2.9 — the marchwide constant 7.34 is
dominated by EVOLVED sets, not the natal start; C₁ does not grow with level.
(ii) The certified ℓ∞ ≤ √(q·v₁) bound beats the trivial √q·C₁√(N/q) by the
flatness factor √(2·flat) (natal sets are up to 60× flatter than
multinomial) but still pays √q against the truth: certified C grows like
√q·√flat while the true C₁ sits flat. The ℓ∞ mechanism at step 1 is NOT an
ℓ² phenomenon — same lesson as cap-14 reading 7, now at the deterministic
first step.

**Propagation (one step, exact).** Conditioned on c₁, A₁ = N minus one
class-pair mod q₁, so X_c(A₁) mod q₂ = X_c(N) − J(c₁,c) − J(c₁−2,c) with J
the natal joint-class table mod q₁q₂ — the object stays J₅/CRT-describable
with one extra modulus. Verified for ALL c₁ at @11 and @13 (D²(A₁,q₂)
reconstructed exactly; E_{c₁}[D²] = Theorem 5's closed form to 1e−9; range
over c₁ e.g. 33.8–159.7 at @13).

**Step-3+ blocker, measured**: exact description of A_k needs 3^k
joint-class terms (inclusion–exclusion over per-step kill pairs), and the
value of D²(A_k, q) randomizes around the exact Theorem-5 mean:
rel. spread 0.41 / 0.24 / 0.20 at k = 2/4/8 (@13, 400 histories). The LAW
stays exact; the PATHWISE certificate dies at k ≈ 3 where 3^k outruns the
usable moduli.

## Next steps

1. **DONE, by `natal-cap-27-t4-at13.js`.** @13's T₄ was summed over all
   39,782,707,965 quadruples in 24.9 minutes across eight workers — the wall
   time cap-27's tail prints today; 15.4 minutes on the unshared machine that
   first ran it, a difference that file's own traceability note records — 23
   checks passed, giving **P(S=0) ≤ 1.898e−6 at @13**, a factor of 513 below
   Chebyshev's 9.74e−4. That is the first beyond-Chebyshev bound **at a level
   where P(S=0) = 0 is NOT provable by capacity**, a different object from
   Theorem 2, which is the first such bound anywhere and sits at @11, where
   capacity already settles P(S=0) = 0 (Theorem 3). The expected value recorded
   here before the run, ≈ 3Var²/μ⁴ ≈ 2.9e−6, was borne out: cap-27's quartic
   Markov leg returned 2.85e−6, and the optimal quadratic-square then tightened
   it. `natal-cap-34` reproduces cap-27's T₄@13 to a relative 3.4e−16. **So the
   corpus holds two beyond-Chebyshev ensemble bounds, at @11 and @13.** Only the
   @17 rerun is outstanding.
2. Find the 4-point wrap identity (the analog of Lemma 4's lin/C split for
   quadruple lags) — the only route to @17's 4.9e16-term sum.
3. Step-1 ℓ∞ mechanism: C₁ ≤ 2.9 at four levels with NO growth — hunt the
   proof in the joint-class table J (Route B's propagation object), where
   the deterministic structure is complete.
