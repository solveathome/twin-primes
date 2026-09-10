# S1 and S2 written out: the mod-30 tail theorem and the fixed-truncation cap

<!-- ledger
id: Q-mod30-tail
status: ANSWERED
todo: 11 (retired)
question: Are the BV survey's S1 (mod-30 tail) and S2 (fixed truncation and depth) provable as stated?
verdict: Both PROVEN at short-note grade (no second reader) once S2's freshness factor is corrected to one class per prime, which needs only P^-(m) >= q > q_i and so holds at every scour prime, not only in the prime regime; tail constant 2 ln 2 -> (ln 2)/2; nothing in the head.
-->

*(Staging note, 2026-08-28. TODO.md item 11, first prize. Task: turn
`research/bv-import-survey.md` §3.1's two `[INFERRED from proven parts + SW;
a short-note-grade theorem]` statements into theorems with hypotheses and
proofs, or show they fail. Under the house publication moratorium. This note
edits nothing; its companion script is
`research/history/staging/thm-mod30-tail.js`.)*

---

## 0. What is open, what failed, and only then what stands

**The gain is a constant and the deficiency is a logarithm.** Even with S1 and
S2 proved, the tail cap is Θ(W/ln W) while the true survivor count is
≍ W/ln²W (`paper/staircase-note.md` §6, honest limit (b)). Dividing the tail
constant by 4, or by any fixed factor, does not change the power of the
logarithm. S1 and S2 make the tail bound a theorem in x rather than a
per-level computation. They do not make it a sharp bound, and they do not
approach the head.

**Three defects in the survey's formulation, one of them arithmetic.**

- **D1 [REFUTED, measured].** S2's density factor is written
  `∏_{i≤K}(1 − 2/(q_i − 1))`. It should be `∏_{i≤K}(1 − 1/(q_i − 1))`. The
  freshness condition `v ≢ 0 (mod q_i)` is void wherever `P⁻(m) ≥ q > q_i`,
  which `staircase-note.md` §7 imposes on `#A_K` at every scour prime, so one
  class is excluded per freshness prime, not two, in the head and the middle as
  well as in the tail; the prime regime is not needed. Proof in §5(i); measurement
  in §6. Every other place in the repo that prices this product uses one class
  (`natal-cap-08-staircase.js` line 162, `natal-cap-11-kstar23.js` line 197,
  `natal-cap-18-at29.js` line 176, `natal-cap-24-boundK-curve.js` §head,
  `natal-cap-28-analytic-certificate.js` line 60, `staircase-note.md` §8 factor
  (c)). The survey is the lone outlier.
- **D2 [defect, measured].** S1's displayed inequality writes
  `π(⌊(W−1)/q⌋; 30, ·)` with no subtraction of the primes below q. That is a
  valid cap on fresh(q) but it is *not* below cap₁, so the survey's framing of
  S1 as a refinement of the Staircase cap is wrong at the top of the tail.
  Measured, the survey's form exceeds cap₁ at 1 of 9, 5 of 29, 16 of 105 and
  60 of 396 tail primes at @11/@13/@17/@19. The sharp form, with
  `− π(q−1; 30, ·)` restored, is ≤ cap₁ at all 539 tail primes. The asymptotic
  is unaffected, since the subtracted mass is O(W/ln²W).
- **D3 [missing hypothesis].** S1 states the class lists {11, 17} and {13, 19}
  with no mention of which comb it is about. Those lists are correct only for
  the Natal@5 comb N_x, which excludes House 29 by construction
  (`staircase-note.md` §1: "two thirds of the full twin census, excluding the
  edge House 29"). **Answer to the third-class question:** the twin-slot class
  29 mod 30, whose partner is 31 ≡ 1, is absent from S1 because the *object*
  is absent, not because of any residue argument. Over the full mod-30 twin
  census the lists are {11, 17, 29} and {13, 19, 1}, three of eight classes per
  side, the tail factor is 8/3 rather than 4, and the constant would be
  (3/4)·ln 2, not (ln 2)/2. The statement as written must carry `r ∈ N_x`.

**Two naming corrections.**

- **D4.** The section heading "Provable now by Siegel–Walfisz" over-names the
  tool for S1. At the *fixed* modulus 30 the prime number theorem in
  arithmetic progressions (de la Vallée Poussin) is what is needed, and it
  gives effective constants at this modulus. Siegel–Walfisz is required only
  for S2, where the modulus grows with x. See §4.
- **D5 [correction to the task brief, not the survey].** The brief states that
  the S2 modulus grows like (ln W)^{K+π(P₀)}. It does not: `∏_{7≤p≤P₀} p` is a
  constant independent of x, so M ≍_{P₀} (ln W)^K, and Siegel–Walfisz with
  A = K + 2 suffices. The survey's own text, "M = O((log(W/q))^{K+O(1)})", is
  correct.

**Rungs reached.** S1: **PROVEN** at short-note grade, given
`staircase-note.md` Lemmas 1–2 and Theorem 3(i) (which are proven there), with
the asymptotic part (c) inheriting the same non-elementary ingredients as
Theorem 6 (PNT and Mertens). No second reader has seen this assembly. S2:
**PROVEN** at short-note grade *with the corrected density factor*; the
survey's stated factor is refuted. Both are statements about caps, not about
twin primes, and neither bears on the conjecture.

---

## 1. Objects, pinned to their owning files

All from `paper/staircase-note.md` §1 unless noted.

- **Level, tile.** x ≥ 7 prime, W = x# the primorial, the tile is [0, W).
- **Natal@5 comb.** N_x = { r ∈ [0, W) : r ≡ 11 or 17 (mod 30), and
  r mod p ∉ {0, p−2} for every prime 7 ≤ p ≤ x }. N = |N_x| =
  2·∏_{7≤p≤x}(p−2). House 29 is excluded by construction.
- **Scour, scour prime.** The primes q with x < q and q² ≤ W, marched
  ascending.
- **Strike, fresh strike, fresh(q).** q strikes r when r ≡ 0 or −2 (mod q); a
  strike is fresh when no smaller scour prime strikes r; fresh(q) counts the
  fresh strikes of q, which in the ascending march are exactly q's kills.
- **Self-strike, s(q).** A fresh strike of q on r = q or r = q−2.
  s(q) = 1 if q mod 30 ∈ {11, 13, 17, 19}, else 0. Lemma 2 proves q has at
  most s(q) self-strikes.
- **Prime regime.** The scour primes with q³ > W + 1 (Theorem 3(i)). Equivalently
  q > (W+1)^{1/3}. There are 9 / 29 / 105 / 396 of them at @11 / @13 / @17 /
  @19.
- **A-side, B-side.** `staircase-note.md` §7. A-side: victims with q | r, and
  v := r, subject to v ≡ 11 or 17 (mod 30) and v ≢ p−2 (mod p) for
  7 ≤ p ≤ x. B-side: victims with q | r+2, and v := r+2, subject to
  v ≡ 13 or 19 (mod 30) and v ≢ 2 (mod p). This is the same convention as the
  `comb_A` / `comb_B` of `research/natal-cap-28-analytic-certificate.js`
  RESULT 1, which reads
  `comb_A = {v: v=11,17 (30), v != -2 (p), 7<=p<=x}`,
  `comb_B = {v: v=13,19 (30), v != 2 (p)}`, with A = (W−1)/q, B = (W+1)/q.
- **cap₁, cap₂, cap_K.** cap₁ is Theorem 3's Φ*-cap; cap₂ = cap_0 folds in the
  side residue conditions with no freshness moduli; cap_K adds the freshness
  conditions for the first K scour primes (§7, Proposition 7). cap-28's
  tail prediction factor is `d(x) = (1/4)·∏_{7≤p≤x}(1 − 1/(p−1))`, coded as
  `const dP=0.25*mids.reduce((a,p)=>a*(1-1/(p-1)),1)`.
- **cap₃₀.** New here, named for this note: the cap that folds in the mod-30
  conditions and nothing else. It sits strictly between cap₁ and cap₂.

---

## 2. Theorem S1 (mod-30 tail theorem)

**Hypotheses.** x ≥ 7 prime; W = x#; N_x the Natal@5 comb; q a scour prime
with q³ > W + 1; fresh(q), s(q) as in §1. Write A = ⌊(W−1)/q⌋,
B = ⌊(W+1)/q⌋, and let q⁻¹ denote the inverse of q modulo 30, which exists
since q > 5.

**(a) Classification [PROVEN].** Let r ∈ N_x be a non-self fresh strike of q.
Then exactly one of the following holds.

- **A-side.** q | r. Put v = r. Then v = qm with m *prime*,
  q ≤ m ≤ A, and v ≡ 11 or 17 (mod 30); equivalently
  m ≡ q⁻¹·11 or q⁻¹·17 (mod 30).
- **B-side.** q | r+2. Put v = r+2. Then v = qm with m *prime*,
  q ≤ m ≤ B, and v ≡ 13 or 19 (mod 30); equivalently
  m ≡ q⁻¹·13 or q⁻¹·19 (mod 30).

In particular m falls in 2 of the 8 unit classes mod 30 on each side.

*Proof.* The dichotomy, the ranges, and P⁻(m) ≥ q are Lemma 1 of
`staircase-note.md` §2, verbatim; that lemma is what the survey calls "the
Staircase Theorem's injection", and it does say what the survey says it says.
The upgrade P⁻(m) ≥ q to "m prime" is Theorem 3(i) §4: under q³ > W + 1 one has
m ≤ (W+1)/q < q², while a composite m with P⁻(m) ≥ q satisfies m ≥ q², so m is
prime. Note m ≥ P⁻(m) ≥ q. The residue statements are the definition of N_x
transcribed: r ≡ 11 or 17 (mod 30) is the A-side condition on v = r, and adding
2 gives r + 2 ≡ 13 or 19 (mod 30) as the B-side condition on v = r + 2. Since
gcd(q, 30) = 1, v ≡ a (mod 30) is equivalent to m ≡ q⁻¹a (mod 30), and q⁻¹a is
a unit because a is. ∎

**(b) The cap [PROVEN].** With π(t; 30, a) the count of primes ≤ t congruent to
a mod 30,

    fresh(q) ≤ cap₃₀(q) := s(q)
      + Σ_{a ∈ {11,17}} [ π(A; 30, q⁻¹a) − π(q−1; 30, q⁻¹a) ]
      + Σ_{a ∈ {13,19}} [ π(B; 30, q⁻¹a) − π(q−1; 30, q⁻¹a) ].

A fortiori the survey's looser display, with the π(q−1; 30, ·) terms dropped,
is also an upper bound.

*Proof.* Lemma 2 caps the self-strikes at s(q). Every other fresh strike lands
in exactly one of the two cases of (a), and the maps r ↦ r/q (A-side),
r ↦ (r+2)/q (B-side) are injective by construction. By (a) the images consist
of primes in [q, A] lying in the two named classes, respectively primes in
[q, B] in the other two. The four bracketed differences count exactly those
four sets, or over-count them. This is Proposition 7's argument with only the
mod-30 conditions retained, so cap₃₀ is history-blind in the sense of §7. ∎

**(c) The tail sum [PROVEN, non-elementary].** Sum over the scour primes q in
the prime regime, that is over the primes q with (W+1)^{1/3} < q ≤ ⌊√W⌋. Then,
as x → ∞,

    Σ_{q³ > W+1} cap₃₀(q) = ( (ln 2)/2 + o(1) ) · W / ln W,

against the (2 ln 2 + o(1))·W/ln W of `staircase-note.md` Theorem 6 for the same
sum of cap₁. The factor is exactly 4.

*Proof.* Errors first. Σ s(q) ≤ π(√W) ≪ √W. The subtracted terms are
non-negative and bounded above by 4·π(√W)² ≪ W/ln²W. Both are o(W/ln W), so
the sharp and loose forms have the same asymptotic and it is enough to treat
Σ_q [ Σ_{a∈{11,17}} π(A; 30, q⁻¹a) + Σ_{a∈{13,19}} π(B; 30, q⁻¹a) ].

Modulus 30 is fixed, so the prime number theorem in arithmetic progressions
gives an absolute c > 0 with

    π(T; 30, a) = Li(T)/8 + O( T·exp(−c√(ln T)) ),

uniformly in T ≥ 2 and in the residue a coprime to 30. That uniformity in a is
what the proof needs, because the classes q⁻¹a move with q; uniformity in q
itself is not required, only uniformity in (T, a), and at a fixed modulus that
is the standard statement.

For a tail prime q ≤ √W both A and B exceed (W−1)/√W, so ln T ≥ (1/2)ln W and
the error for a single q is O( (W/q)·exp(−c′√(ln W)) ). Summing, and using
Mertens' second theorem in the form Σ_{W^{1/3} < q ≤ W^{1/2}} 1/q = ln(3/2) +
o(1), the total error is O( W·exp(−c′√(ln W)) ) = o(W/ln W).

Main term. Each of the four counts contributes Li(T)/8, so the four together
contribute (1/4)(Li(A) + Li(B)), which is exactly one quarter of the
π(A) + π(B) shape that Theorem 6 evaluates. Theorem 6's evaluation is
reproduced unchanged: write q = W^θ with θ ∈ (1/3, 1/2], use
π((W+1)/q) = (1 + o(1))·W/(q(1−θ)ln W) uniformly in that range, note that
Mertens gives the measure dθ/θ for {1/q}, and integrate,

    ∫_{1/3}^{1/2} dθ / (θ(1−θ)) = [ ln(θ/(1−θ)) ]_{1/3}^{1/2} = ln 2.

Hence the main term is (1/4)·(2 ln 2)·W/ln W = ((ln 2)/2)·W/ln W. ∎

**What the o(1) is.** A function of x alone tending to 0 as x → ∞. It is not
uniform in anything further, because the sum over q has already been taken.
The uniformity actually used inside the proof is uniformity of the
PNT-in-progressions error over T ≥ √W and over the residue class, both at the
single fixed modulus 30. No uniformity in the modulus, hence no
Siegel–Walfisz, is used here.

---

## 3. What S1 costs in the finite range

The sum in (c) runs over the prime-regime scour primes only. That is the
correct reading of the survey's "Σ_{q³>W+1} cap", and it matches the "tail
primes" column of `staircase-note.md` §6 (9 / 29 / 105 / 396). It does not
include the head q ∈ (x, W^{1/3}], and Corollary 4's pigeonhole needs the head
as well, so S1 by itself certifies no twin floor.

The comparison the survey makes to §8's factor (a) needs one correction of its
own. §8's factor (a) is a *heuristic tightness predictor* for the ratio
fresh/cap₁, and it is one of three factors there. S1 proves something
different: that the *cap* ratio cap₃₀/cap₁ tends to 1/4. The measured kill
ratio in the tail is much smaller than 1/4, namely 0.149 / 0.117 / 0.091 /
0.075 at @11 / @13 / @17 / @19 (`staircase-note.md` §6, "tail actual / cap₁"
column, reproduced by the companion script). So "exactly what S1 proves"
conflates a cap ratio with a kill ratio. The remaining slack, 0.25 down to
0.075 and still falling, is factors (b) and (c) of §8, which is what S2 and
§3.2 of the survey are about.

---

## 4. Which tool is needed, and at what rung

- **For S1: PNT in arithmetic progressions at a fixed modulus** (de la Vallée
  Poussin, 1896; Davenport, *Multiplicative Number Theory*, 3rd ed., §20).
  [PROVEN]. Siegel–Walfisz is strictly more than needed, since the modulus
  never grows.
- **Effectivity.** The ineffectivity in Siegel–Walfisz comes from a possible
  exceptional real zero. At a single fixed modulus that is a finite check, and
  for modulus 30 explicit constants are on record, so the S1 error constant is
  effective. This is a genuine difference from S2, where the constant is
  ineffective in K.
- **Explicit finite form.** Bennett, Martin, O'Bryant and Rechnitzer,
  *Explicit bounds for primes in arithmetic progressions*, Illinois J. Math.
  62 (2018), 427–532; arXiv:1802.00085v3. **[READ AT SOURCE, ABSTRACT ONLY,
  2026-08-28]**: `curl -sL https://arxiv.org/abs/1802.00085`, sha256 of the
  fetched page `0e05eb19c78529f8e125f045fae47b3b5a6cbd9ec497fd1005aee6c9570f96c6`.
  The abstract states, for gcd(a,q) = 1 and 3 ≤ q ≤ 10⁵,
  |θ(x; q, a) − x/φ(q)| < (1/160)·x/log x for all x ≥ 8·10⁹, with sharper
  constants for individual moduli, and "inequalities of the same shape" for
  π(x; q, a) and ψ(x; q, a). So the survey's "for W/q ≥ 8·10⁹" is the right
  threshold and modulus 30 is in range. **The π-form constant is not quoted
  here: only the abstract was read, not the body**, so any numerical use of the
  π version stays [MEMORY] until the paper itself is read.
- **Caveat on the explicit form, which the survey does not state.** The
  threshold 8·10⁹ applies to T = W/q, and in the tail the worst case is
  q ≈ √W, so the explicit form covers a whole level only once √W ≥ 8·10⁹, that
  is W ≥ 6.4·10¹⁹. The smallest primorial level meeting that is **x = 59**
  (W = 1.923·10²¹, scratchpad-grade, from the companion script's crossover
  block reasoning; the arithmetic is `√(59#) ≥ 8·10⁹`). At every level anyone
  can march today, @11 through @29, BMOR is inapplicable and the finite bounds
  must come from Rosser–Schoenfeld or from direct computation.

---

## 5. Theorem S2 (fixed truncation P₀, fixed depth K)

**Hypotheses.** Fix a prime P₀ ≥ 5 and an integer K ≥ 0, both independent of
x. Let x > P₀ be a prime level, W = x#, and let q_1 < … < q_K be the first K
scour primes of the level. Let q be a scour prime with q³ > W + 1 and
q > q_K. Define the depth-(P₀, K) cap by folding, into the counting of §2(b),

- the mod-30 conditions of §2(a);
- the wheel conditions for 7 ≤ p ≤ P₀ (A-side: v ≢ −2 (mod p); B-side:
  v ≢ 2 (mod p)), exactly `staircase-note.md` §7's side conditions truncated
  at P₀;
- the freshness conditions at q_1, …, q_K (A-side: v ≢ 0 and v ≢ −2 (mod q_i);
  B-side: v ≢ 0 and v ≢ 2 (mod q_i)).

Call the result cap^(P₀,K)(q). By Proposition 7's argument it is a hard cap on
fresh(q), and cap^(P₀,K)(q) ≤ cap₃₀(q) ≤ cap₁(q) in the sharp form.

**(i) The density factor [PROVEN; this is where the survey is wrong].** Set
M = M(x; P₀, K) = 30·∏_{7≤p≤P₀} p·∏_{i≤K} q_i. Then on each side the
admissible cofactors m form a union of residue classes mod M, all coprime to
M, and their number is

    2 · ∏_{7≤p≤P₀} (p−2) · ∏_{i≤K} (q_i − 2),

so their share of φ(M) = 8·∏_{7≤p≤P₀}(p−1)·∏_{i≤K}(q_i − 1) is, per side,

    δ(x; P₀, K) = (1/4) · ∏_{7≤p≤P₀} (1 − 1/(p−1)) · ∏_{i≤K} (1 − 1/(q_i − 1)).

That is the density the engine uses, and cap^(P₀,K)(q) is then
s(q) + δ·(π(A) + π(B)) up to the error terms of (ii) and (iii).

*Proof.* P⁻(m) ≥ q > q_K > P₀, hence m is a unit mod M (primality of m is not
needed for this step either).
Modulus 30: §2(a) gives 2 of the 8 unit classes per side.
Modulus p, 7 ≤ p ≤ P₀: the A-side condition is v ≢ −2 (mod p). The companion
condition v ≢ 0 (mod p) is automatic, since p ≤ x < q gives p ∤ q, and
P⁻(m) ≥ q > p gives p ∤ m; this is the parenthetical remark in §7, "the
remaining comb conditions, v ≢ 0 (mod p), are automatic". In m-coordinates
v ≢ −2 reads m ≢ −2q⁻¹ (mod p), which excludes exactly one class, and that
class is a unit since p ∤ 2. So p − 2 of the p − 1 unit classes survive.
Modulus q_i, i ≤ K: **both** conditions are stated in §7, but only one bites.
v ≡ 0 (mod q_i) means q_i | qm. Now q_i ≠ q, and P⁻(m) ≥ q > q_i, so q_i ∤ m.
Therefore v ≢ 0 (mod q_i) excludes **no** class of m at all. The
condition v ≢ −2 (mod q_i) excludes exactly one unit class, −2q⁻¹. So q_i − 2
of the q_i − 1 unit classes survive, and the factor is 1 − 1/(q_i − 1), not
1 − 2/(q_i − 1). **The step uses only P⁻(m) ≥ q > q_i, not the primality of m,**
so the one-class count is not a prime-regime fact: it holds at every scour
prime, since P⁻(m) ≥ q is part of §7's own definition of #A_K. The primality of
m is what S2's hypothesis q³ > W + 1 supplies, and the density δ below does not
depend on it.
The B-side is identical with +2 for −2 throughout. Multiplying the three
moduli's shares by CRT gives δ. ∎

This is the same factor `staircase-note.md` §8 assigns to its heuristic (c),
and the same one `natal-cap-24` and `natal-cap-28` code. The survey's
`(1 − 2/(q_i − 1))` is an error, measured in §6.

**(ii) The modulus is inside the Siegel–Walfisz range [PROVEN].** M does not
depend on q. By Chebyshev ln W = θ(x), and θ(x) ~ x, so x/ln W → 1 and
q_K = (1 + o(1))·x = (1 + o(1))·ln W for each fixed K. Hence
M ≤ C(P₀)·q_K^K ≪_{P₀,K} (ln W)^K. For a tail prime q the range satisfies
T ≥ √W, so ln T ≥ (1/2)ln W and M ≪_{P₀,K} (2 ln T)^K = O_{P₀,K}((log T)^K).
Siegel–Walfisz with A = K + 1 (take K + 2 for margin) applies:

    π(T; M, a) = Li(T)/φ(M) + O_{K}( T·exp(−c_K √(ln T)) ),

uniformly in a coprime to M. The residue classes depend on q through q⁻¹ but
the modulus does not, and SW is uniform in the class, which is what the
summation over q needs. The constant is **ineffective** in K (Siegel), unlike
S1's.

Measured check on q_K ~ ln W (scratchpad-grade, companion script's last
block): q_1/ln W runs 1.679, 1.649, 1.446, 1.430, 1.509, 1.372 at
x = 11, 13, 17, 19, 23, 29, then 1.166 at x = 101, 1.052 at x = 1009, 1.010 at
x = 10007; q_8/ln W runs 5.294 down to 1.019 over the same levels. So "the
first K scour primes are of size ~ ln W" is correct in the limit and loose by
a factor 1.4 to 5 at every level anyone can march. That looseness does not
affect the theorem, since only M ≪ (ln W)^{K+O(1)} is used.

**(iii) The asymptotic [PROVEN with the corrected δ].** For fixed (P₀, K),
as x → ∞,

    Σ_{q³ > W+1} cap^(P₀,K)(q) = ( 2 ln 2 · δ(x; P₀, K) + o(1) ) · W / ln W.

*Proof.* Identical to §2(c) with π(·; 30, ·) replaced by π(·; M, ·), the count
of admissible classes replaced by (i), the PNT-in-progressions input replaced
by (ii), and the same error accounting: the self and subtracted terms are
o(W/ln W) as before, and the SW error sums to O_K(W·exp(−c_K′√(ln W))). ∎

**Consistency checks.** At (P₀, K) = (5, 0), δ = 1/4 and the constant is
2 ln 2/4 = (ln 2)/2, which is S1. At P₀ = 7, K = 0, δ = (1/4)(1 − 1/6) = 5/24
and the constant is 2 ln 2 · 5/24 = (5/12)·ln 2, which is the survey's stated
modulus-210 value. At general fixed P₀ with K = 0 the constant is
((ln 2)/2)·∏_{7≤p≤P₀}(1 − 1/(p−1)), the survey's stated form.

**(iv) The limitation the survey does not state.** At fixed K the freshness
primes q_i grow with x, so ∏_{i≤K}(1 − 1/(q_i − 1)) → 1. **The fixed-depth
part of S2 contributes nothing to the limiting constant.** For every fixed K
the asymptotic tail constant is the same as at K = 0. Fixed depth buys a
finite-x refinement and no asymptotic one. Anything asymptotic from the
freshness ladder needs K → ∞ with x, which is outside S2 and, once q_K is a
power of T, outside Siegel–Walfisz as well (survey §3.2, second paragraph).

**(v) Where S2 stops.** The constant ((ln 2)/2)·∏_{7≤p≤P₀}(1 − 1/(p−1)) tends
to 0 as P₀ → ∞, but each fixed P₀ carries its own o(1) and the family is not
uniform in P₀. Taking P₀ = x, which is what the full comb wants, makes the
modulus 30·∏_{7≤p≤x} p = W itself, where SW is silent. That is exactly the
**Tail Comb Equidistribution Conjecture [OPEN]** of
`research/certificate-engine.md` §2, and S2 does not touch it. The survey's
own route to it is §3.2's fundamental-lemma-plus-BV assembly, which is a
separate claim at a separate rung and is not audited here.

---

## 6. Measured verification (scratchpad-grade)

Companion script `research/history/staging/thm-mod30-tail.js`, output embedded
by `node research/qc/embed.js research/history/staging/thm-mod30-tail.js`
(0.4 s), code-sha256 `35b061936437d264…`, out-sha256 `77bf42f71306175c…`. Every
number in this section is in that embedded block. Reproduce with
`node research/history/staging/thm-mod30-tail.js`.

**The refutation attempt on S1(a): exhaustive, and it survived.** The script
marches the Natal@5 comb at @11 / @13 / @17 / @19 and, for every non-self fresh
victim of every prime-regime scour prime, checks that v/q is an integer, that
it is prime, that it is ≥ q, and that v mod 30 lies in {11, 17} on the A-side
and in {13, 19} on the B-side. Victims checked: 30 + 312 + 3 888 + 54 025 =
58 255. Violations: **0**.

**Cross-checks against the repo before trusting the run.** Σ cap₁ over the tail
comes out 215 / 2 720 / 42 895 / 724 717, matching `staircase-note.md` §6's
table digit for digit; tail fresh/cap₁ comes out 0.149 / 0.117 / 0.091 / 0.075,
matching the same table's last column; the cap₁ crossover computed from the
exact finite products comes out x = 149, matching §6's stated crossover.

**The factor 4, measured.** Σ cap₃₀(sharp)/Σ cap₁ over the tail =
0.2558 / 0.2570 / 0.2514 / 0.2502 at @11 / @13 / @17 / @19, consistent with the
limit 1/4 of §2(c) and converging. The survey's loose form gives
0.4000 / 0.3739 / 0.3382 / 0.3162, converging to the same limit more slowly,
and it exceeds cap₁ at 1 / 5 / 16 / 60 of the 9 / 29 / 105 / 396 tail primes
(defect D2).

**Tail cap against the census.** Σ cap₃₀(sharp)/N = 0.611 / 0.706 / 0.726 /
0.718 against Σ cap₁/N = 2.389 / 2.747 / 2.889 / 2.871. The tail cap now sits
below N at every marchable level. This certifies nothing on its own, because
Corollary 4's pigeonhole sums the head too, and the head's cap₁ share is
roughly 0.8 / 2.4 / 3.8 / 5.1 of N (§6 and §7 tables of the staircase note).

**Crossover, scratchpad-grade.** Using the same exact-finite-product reckoning
that produces §6's x = 149 for cap₁, the S1 constant moves the crossover of
(tail cap)/N below 1 to **x = 17** (ratio 0.9065 there, 0.8277 at x = 19,
0.2442 at x = 149, 0.0628 at x = 997). The measured exact ratios at the
marchable levels, 0.611 to 0.726, are lower still, since the asymptotic form
overstates the cap at small x.

**D1, measured.** Exact count of A-side admissible prime cofactors with the
mod-30 classes and the depth-K freshness conditions, against the two candidate
predictors:

| level | K | exact | pred with ∏(1−1/(q′−1)) | ratio | pred with ∏(1−2/(q′−1)) | ratio |
|---|---|---|---|---|---|---|
| @17 | 1 | 5 037 | 5 039.6 | 0.9995 | 4 743.1 | 1.0620 |
| @17 | 2 | 4 802 | 4 810.5 | 0.9982 | 4 311.9 | 1.1137 |
| @17 | 4 | 4 474 | 4 484.1 | 0.9978 | 3 737.0 | 1.1972 |
| @17 | 8 | 4 043 | 4 059.1 | 0.9960 | 3 054.4 | 1.3237 |
| @19 | 1 | 86 390 | 86 387.3 | 1.0000 | 82 273.6 | 1.0500 |
| @19 | 2 | 83 313 | 83 302.1 | 1.0001 | 76 396.9 | 1.0905 |
| @19 | 4 | 78 294 | 78 288.5 | 1.0001 | 67 342.5 | 1.1626 |
| @19 | 8 | 71 478 | 71 492.2 | 0.9998 | 56 038.3 | 1.2755 |

The corrected factor is within 0.4% at @17 and 0.02% at @19 and improving with
level; the survey's factor is off by 5.0% to 32.4% and worsening with K. D1 is
refuted by measurement as well as by the proof in §5(i).

---

## 7. What S1 and S2 buy, and what they do not

**Buy.**

1. The proven tail constant drops from 2 ln 2 = 1.386 to (ln 2)/2 = 0.347 at
   modulus 30 (S1), and to ((ln 2)/2)·∏_{7≤p≤P₀}(1 − 1/(p−1)) at any fixed
   P₀ (S2), which is (5/12)·ln 2 = 0.289 at P₀ = 7.
2. The asymptotic crossover at which the proven tail cap sinks below the
   census moves from x = 149 to x = 17 (scratchpad-grade, §6).
3. A column of `natal-cap-28`'s tail regime that was carried as an unproven
   equidistribution assumption becomes, at every fixed (P₀, K), a theorem with
   an explicit error shape.

**Do not buy.**

1. **Nothing in the head.** The sums in S1(c) and S2(iii) run over
   q > (W+1)^{1/3}. The twin question inside a tile is carried entirely by the
   head q ∈ (x, W^{1/3}] (`staircase-note.md` §6; survey §3.1 last sentence).
2. **No new certified twin floor.** Theorem 8's floors come from the cap_K
   ladder, which already folds the mod-30 conditions in exactly, per level.
   S1 re-derives, as a theorem uniform in x, a fraction of what those
   computations already had exactly at @11 through @29.
3. **No change in the order of the deficiency.** The tail cap remains
   Θ(W/ln W) against a survivor count ≍ W/ln²W. A factor 4, or a factor
   ∏(1 − 1/(p−1)) at fixed P₀, is a constant against a logarithm.
4. **No approach to the full comb.** P₀ = x is exactly where the modulus
   becomes W and Siegel–Walfisz goes silent (§5(v)); that gap is the open Tail
   Comb Equidistribution Conjecture.
5. **Nothing about the twin prime conjecture.** These are upper bounds on how
   many comb slots a scour prime can kill. No statement here bears on
   infinitude, and none is claimed.

---

## 8. Defects noticed in passing

- `research/bv-import-survey.md` §3.1 attributes S1's gain to "the measured
  fresh/cap₁ ratio's factor (a)". §8 of the staircase note is a heuristic
  decomposition of a kill ratio; S1 proves a cap ratio. Different objects,
  §3 above.
- `research/bv-import-survey.md` §1 says BMOR "give explicit numerical bounds
  on π(T; k, a) for every modulus 3 ≤ k ≤ 10⁵ and T ≥ 8·10⁹". The abstract
  states the 1/160 constant for θ and says only that inequalities "of the same
  shape" hold for π; the π constant is not in the abstract. The claim is
  probably right and is not verified here.

---

## 9. What would falsify this, and whether that check has run

| Claim | What would falsify it | Has the check run |
|---|---|---|
| S1(a), the classification | one non-self fresh victim of a prime-regime scour prime with composite cofactor, or with v mod 30 outside {11,17} (A) / {13,19} (B) | **RUN**, exhaustive at @11/@13/@17/@19, 58 255 victims, 0 violations. NOT run at @23 or @29 |
| S1(b), cap₃₀ ≥ fresh | one q in the tail with fresh(q) > cap₃₀(q) | **RUN**, asserted at all 539 tail primes across the four levels, no failure. Assert is in the script, so a failure aborts |
| S1(c), the constant (ln 2)/2 | a level where Σ cap₃₀/Σ cap₁ walks away from 1/4 rather than toward it | **PARTIALLY RUN**: four levels give 0.2558, 0.2570, 0.2514, 0.2502, monotone toward 1/4 from @13 on. Four points are not a limit, and the proof, not the table, is the warrant |
| The proof of S1(c) | an error in the transfer of Theorem 6's Mertens/partial-summation step to the quartered main term, or a hidden non-uniformity in the PNT-in-progressions error over the class q⁻¹a | **NOT RUN**. No second reader. The step reused from Theorem 6 is itself flagged non-elementary in the staircase note |
| D1, the freshness factor | the exact depth-K counts matching ∏(1−2/(q′−1)) better than ∏(1−1/(q′−1)) | **RUN** at @17 and @19, K ∈ {1,2,4,8}: the corrected factor is within 0.4%, the survey's off by 5.0–32.4% |
| S2(i), one excluded class per q_i | an admissible cofactor m with P⁻(m) ≥ q for which v ≡ 0 (mod q_i) actually occurs | **RUN implicitly** by the D1 table, and by `redteam-0828-engine.md` §1.2's independent recount of the same eight cells. The proof is two lines (q_i ∤ q, and q_i ∤ m from P⁻(m) ≥ q > q_i), and it needs no hypothesis on the regime. Not separately instrumented |
| S2(ii), M inside the SW range | q_K growing faster than a power of ln W at fixed K | **RUN** as a measurement of q_K/ln W at nine levels; the ratio falls to 1.01 by x = 10007. The theorem needs only the Chebyshev bound, which is proven |
| S2(iii), the asymptotic | a level where Σ cap^(P₀,K) departs from 2 ln 2 · δ · W/ln W by more than o(1) | **NOT RUN.** No level has been marched with the full (P₀, K) cap summed against the closed form here; `natal-cap-28`'s Analytic-Swap Calibration measures a related but different overshoot, 2.15% / 1.16% / 0.64% of Σcap₂ at @17/@19/@23 |
| S2(iv), fixed K buying nothing asymptotically | a fixed K whose freshness product does not tend to 1 | cannot fail: q_i → ∞ at fixed K is Chebyshev |
| The BMOR threshold reading | the paper's π-form theorem carrying a different range or a different constant | **NOT RUN.** Abstract read at source (sha256 recorded, §4); body not read |
| "No new certified twin floor" | a pigeonhole closing at some level using cap₃₀ in the tail and cap₁ in the head | **NOT RUN as a search**, but the head's cap₁ share alone is 0.8–5.1·N from the staircase note's own tables, so the sum exceeds N at every marchable level |
