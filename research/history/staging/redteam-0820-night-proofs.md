# Red-team pass, 0820 night: the two proof-heavy held headlines survive independent re-derivation

<!-- ledger
id: Q-redteam-0820-night-proofs
status: ANSWERED
todo: none
question: Do the two proof-heavy held headlines of the 0820 night, anchored-01 and hsub-01, survive independent re-derivation?
verdict: Both stand: zero refutations and zero corrections to any quoted number, with every digit re-derived from the staircase-note's own lemmas or recomputed from the definitions in independent code; the doubling inequality itself was not attempted and remains posed, open and trap-free.
-->

*(2026-08-20, adversarial verifier. Targets:
`research/history/staging/attack-anchored-01.md` + producer
`research/attack-anchored-01-unify.js`, and
`research/history/staging/attack-hsub-01.md` + `research/attack-hsub-01.js`
with `research/attack-fekete-1d-02-lemma.js`. Method: refuted-until-rederived.
Every graded claim was re-derived from `paper/staircase-note.md`'s own lemmas
or recomputed with independent scratchpad code written from the definitions —
not a re-run of the producers (`rt2-anchored-recompute.js`,
`rt2-hsub-recompute.js` in the session scratchpad; my own march, my own cap
enumeration with a sieve-SPF, my own branch-and-bound, my own pair table).
All three producers' embeds re-verified bit-honest with `embed.js --check`.
This file and the scratch scripts are this pass's only writes.)*

## 0. Verdict, up front

**Both headlines stand. Zero refutations, zero corrections to any quoted
number.** Every digit I recomputed — the floors 36/115, the truth depths
K = 8/28, the plateaus 41/296, the full forcing curve, the waste identities,
the power-pair floors 1.0033/0.9694, both window pairs, 348/66 = 5.2727,
2^β₂ = 19.2455, and the trap arithmetic — reproduced exactly from
independent code. The two graded notes below are semantic sharpenings, not
errors, and both target documents already state them.

## 1. Target 1 (anchored-01)

- **1a. Unified-cap lemma — CONFIRMED, re-derived from the note's proofs.**
  Theorem 3's injections r ↦ r/q, r ↦ (r+2)/q extend to m = 1 exactly as
  claimed: a fresh self-strike (r = q, A-side, q ≡ 11,17 mod 30; r = q−2,
  B-side, q ≡ 13,19) satisfies the §7 side conditions (v = q ≡ correct house;
  v ≢ p−2 resp. v ≢ 2 mod wheel p is the comb condition on the self slot;
  v ≡ 0 mod p impossible for prime q > x) and the depth-K freshness
  conditions verbatim (A: q ≢ 0, −2 mod q′ — 0 impossible, −2 is q′ | q+2;
  B: q ≢ 0, 2 mod q′ — 2 is exactly q′ | q−2, which is what kills the
  twin-collision shadow once q−2 enters the pool). P⁻(m) ≥ q is vacuous at
  m = 1 and Lemma 1's proof needs it only for m ≥ 2. Injectivity survives
  (one slot, one (side, m); Lemma 2 gives at most one self slot). The second
  inequality capU_K ≤ cap_K holds because the m = 1 term exists only in the
  four residues where s(q) = 1. Full-depth surjectivity also re-derives: an
  admissible v at K = full is a comb slot (B-side r ≡ p−2 ⟺ p | v is
  automatic), unstruck below q, struck by q — so capU_∞ = fresh exactly, the
  degeneration §4 of the md states plainly. The freshness-condition
  definition survives the merge unchanged.
- **1b. Floors 36 and 115 — CONFIRMED by independent recompute**, with the
  semantics stated precisely: they are floors on the **anchored** survivor
  count (Theorem 8's own quantifier), not class-uniform floors — the md is
  explicit about this and the 16-witness does not instantiate them, so
  36 > 16 is separation, not contradiction. My own cap enumeration gives
  K = 0 floors 36 (@11) and 115 (@13), fresh ≤ capU_K ≤ cap_K with zero
  violations at every K, every prime, both levels; truth reached first at
  K = 8 (@11) and K = 28 (@13). At the witness and its mirror twin: my march
  gives 16 and 16; the general-class (rigidity-free) family instantiated
  there is violation-free at all K and lands on exactly 16 at full depth —
  the DOA test passes as reported (and floor 17 at anchored K = 0, rigidity
  worth 19).
- **1c. Plateaus 41 and 296 — CONFIRMED, and they are proven, not
  asserted:** K is exhausted at the pool (all smaller scour primes), cap_K
  is constant beyond it, and the full finite range is computed — my
  independent ladder gives classic 41 @11 (all K ≥ 3) and 296 @13. "Forever"
  is legitimate by pool saturation plus exhaustion.
- **1d. Forcing ladder — CONFIRMED, and more than calibrated:** my own
  branch-and-bound (bound recomputed per node, union bound only) reproduces
  the **entire** curve 16→20→20→22→23→25→30→35→38→42→45, not just the three
  calibration points, plus single-prime q=13 → 20 and the co-anchored
  covariance check (a = w gives 20). One note: the j = 10 "calibration point"
  is degenerate (nothing is free; it checks the kill-set construction, not
  the search), and j = 1's 20 is corpus-internal ([ADV] shard row) rather
  than external — but the independent reproduction supersedes the
  calibration claim anyway.
- **1e. Digit accounting — CONFIRMED by independent recount.** @11:
  allowances 6, wheel-excluded {13, 47}, shadows {19, 43}, realized {17, 41}
  → 6 − 2 = 4 = 45 − 41. @13: allowances 17, wheel-excluded
  {47, 79, 131, 163, 167}, shadows {19, 43, 73, 103, 109, 139}, realized
  {17, 41, 71, 101, 107, 137} → 17 − 6 = 11 = 307 − 296. Both identities
  close on the digit.
- Mirror gains 0: CONFIRMED at the checked points (witness, mirror,
  co-anchored counts all transfer); the covariance itself is a one-line
  theorem (σ maps class-a strike sets to class-(w−a) strike sets and the
  comb to itself since House 29 is excluded), so the 0-gain is structural,
  not empirical.

## 2. Target 2 (hsub-01)

- **2a. Power-pair-only consumption — CONFIRMED by line-by-line re-read of
  the -02 proof.** The limsup half consumes exactly f(b^{k+1}) ≤ f(b^k) +
  f(b) + K, k ≥ 1 (the k = 1 case is the diagonal (b,b), included in
  (H-sub-pow) as stated); the bridge is (H-mono) alone; the liminf half uses
  only the definition of inf and no pair. The conclusion keeps the full
  L = inf over ALL n because every integer n ≥ 2 serves as a base, so
  limsup ≤ inf_b (f(b)+K)/ln b = L. β < 2 ⟺ ∃n S(n) > K survives unchanged.
  (Reduction 2's "no single chain gives existence" is a correct statement
  about the argument — liminf needs the inf over all n — argued at proof
  level, no counterexample function constructed; one is easy to build, so
  the claim is safe.)
- **2b. Windows — CONFIRMED, every endpoint re-derived.** Power pairs: 15
  trusted / 9 custody (my enumeration); floors sup D = 1.0033 at (16,4)
  (rests on Ĝ(64) = 1080 = A144311(18)+1, Wang) and 0.9694 at (16,2)
  (custody-exact 348, 66, and ln(348/(66·2)) = 0.9694 cross-checks the
  doubling floor to the digit); ceilings max_b S(b) = 1.3946 at 66 trusted,
  1.3555 at 16 custody. Widths 0.3913 / 0.3861; old width 0.3185; "23%
  wider" checks. Doubling: Ĝ(32)/Ĝ(16) = 348/66 = 5.2727 under the correct
  convention (largest prime ≤ 32 is 31 → G₂(31#) = 348; ≤ 16 is 13 → 66),
  and I verified the stronger fact the window needs: 5.2727 is the **sup of
  Ĝ(2s)/Ĝ(s) over the whole data range**, custody (s ≤ 23) and trusted
  (s ≤ 41) alike, and it sits on the base-2 power chain (s = 2⁴) — so every
  C₂ in the window really is consistent with all data even though Reduction
  3 needs the hypothesis only along (2^k, 2). 19.2455 = 2^β₂ with
  β₂ = 4.26645028414864191641 (dhr-verification.md row 1a, rigorous
  Booker–Browning value) — that is where 4.2665 enters: the window's ceiling
  and the "improvement" claim are relative to the corpus's proven exponent
  ceiling, which this pass did not re-derive (see §3).
- **2c. Trap-free — CONFIRMED by direct arithmetic.** log₂(348/66) =
  1.6625/0.6931 = 2.3985 > 2, so the slice's conclusion at the data floor
  already exceeds the TPC line limsup < 2; TPC through the slice needs
  C₂ < 4 < 5.2727 ≤ any true C₂. Properly scoped in the md ("through the
  slice's own conclusion"). And 2.3985 < 4.2665, so the whole window
  [5.2727, 19.2455) maps into [2.3985, 4.2665) — width ln(19.2455/5.2727) =
  1.2947 nats, as claimed.
- **2d. Bertrand / fold-step — CONFIRMED.** π(2s) − π(s) ≥ 1 is Bertrand;
  t ≥ 2 gives π(st) ≥ π(2s); my minimum over all 111 pairs is 1 fold (at
  (2,2)); max fold ratio 5/3 at 3→5 on the range, and p_next/p < 2 in
  general is Bertrand again — so no integer pair is a single fold step,
  given the corpus's t ≥ 2 domain floor (import-interp §4, taken as given).
  D ≥ −min(f(s), f(t)) is one line from (H-mono) (f(st) ≥ f(s) and ≥ f(t));
  min slack 0.6931 at (2,3) reproduces.
- **2e. Identity + no-drift — CONFIRMED.** The fold-budget identity is a
  telescope; my max deviation over all 111 pairs is 1.78e−15, matching
  theirs digit for digit, and the (4,10) decomposition (10 folds, 4.4773 vs
  head 3.4012, excess 1.0761) reproduces. My own OLS: (4,t) slope minus POW
  null −0.0020 ± 0.1143, (s,2) −0.0336 ± 0.0596 — both consistent with
  bounded; (4,t) peaks at t = 10 with every t ≥ 13 below it; the diagonal
  reads −0.5188 ± 0.3966 below the null, exactly as the md reports (leaning
  super-multiplicative, blind past b = 9).

## 3. Not reached

- β₂ = 4.2665's standing as the proven ceiling on limsup ln G₂(x#)/ln x is
  taken from corpus state (dhr row 1a verifies the constant, not the
  bridge); the doubling window's "prize" is conditional on that standing.
- The ladder values themselves (A144311 + 1, first 14 corpus-exact) are the
  cited custody input; I re-derived only G₂(5#) = 12 from scratch as a
  convention check.
- The exhaustive mirror checks (300/300 classes, 500 random vectors) were
  spot-checked, not exhausted; the covariance proof makes them redundant.
- SEC 6 (x = 37 secondary) and the cited [HSW]/[LAD] curves; advmin@13's
  [21, 152] bracket; anything at @17+.
- No attempt on the doubling inequality itself — it remains posed, open,
  and (per this pass) genuinely trap-free.
