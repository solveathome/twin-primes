# The prime-regime cap_K asymptotic, written out: fundamental lemma plus BV

<!-- ledger
id: Q-capK-bv
status: ANSWERED
todo: 11 (retired)
question: Is the prime-regime cap_K over the full wheel an unconditional asymptotic via the fundamental lemma over Bombieri-Vinogradov?
verdict: PROVEN at short-note grade for q_K = W^{o(1)}, and EMPTY in every computable range (needs s >= 10.82, first cleared at x = 263; the lemma's floor s >= 10 is first reached at x = 239); the deep ladder is untouched.
-->

*(Staging note, 2026-08-28. TODO.md item 11, third prize. Task: turn
`research/bv-import-survey.md` §3.2's `[INFERRED: assembly of standard tools;
each step classical]` into a theorem with hypotheses and a proof, or show
where it fails. Sibling note, read first and carried: `thm-mod30-tail.md`
(S1 and S2, the fixed-modulus versions). Under the house publication
moratorium. This note edits nothing; its companion script is
`research/history/staging/thm-capK-bv.js`.)*

---

## 0. What fails, what is open, and only then what stands

**The assembly works and the theorem it produces is empty in every range
anyone will ever compute.** The fundamental lemma's error factor is
`1 + O(e^{9κ−s} K_dim^{10})` with `s = ln D / ln q_K` the sifting variable.
Measured (scratchpad-grade, §5 Block 2/3): `K_dim = 1.2000` for this sieve, so
the factor is below 1 only for `s ≥ 10.82`, and at depth `K = 0` with the
largest level BV allows, `D = T^{1/2}`, the sifting variable reads
**1.16 / 1.37 / 1.53 / 1.68 at @17 / @19 / @23 / @29** and **4.58 at @97**.
The first primorial level at which `s` clears the lemma's own factor-below-1
threshold 10.82 is **x = 263** (`W ≈ 10^105.6`); `s` first reaches the lemma's
floor `9κ + 1 = 10` at `x = 239`, where `W ≈ 10^96`, and the factor is still
above 1 there. Every certificate the engine has produced, and every march that
exists, sits at `s < 5`. The theorem below is a limit statement and nothing
else; it supplies no constant, no threshold, and no finite-level bound.

**It does not reach the depth the certificates need, by a factor of five in
the exponent.** At @97 the engine's bare-positivity depth is `K* = 7.41·10⁸`
with `q* = 1.67·10¹⁰` (`natal-cap-28-analytic-certificate.js` READINGS). Then
`ln q_K / ln T = 0.562`, so `q_K` is `T^{0.56}`, not `T^{o(1)}`, and the
theorem's hypothesis fails outright. Measured `s = 0.59` at `D = T^{1/3}` and
`0.89` at `D = T^{1/2}`. At the 90% depth `K_{0.9} = 2.98·10¹³` the ratio is
0.815. This is the survey's own last paragraph of §3.2, now with numbers: the
wall in the deep ladder is the sieve, and BV is not near it.

**It buys no effectivity.** BV's implied constant is ineffective, because the
standard proof feeds Siegel–Walfisz into the small moduli. So the survey's
implicit contrast with S2's Siegel ineffectivity is wrong. What is gained over
S2 is uniformity in `K` and in the truncation `P₀`, not effectivity.

**Two things the survey over-states, both harmless to the conclusion.**
Its density factor `∏(1 − 2/(q_i − 1))` is wrong for the same reason
`thm-mod30-tail.md` §5(i) gives, and is carried corrected here. Its "the
remainder is a divisor-weighted sum of AP errors … the same absorption of
divisor weights as in Chen's proof" over-names the machinery: the fundamental
lemma's weights satisfy `|λ_d| ≤ 1`, so the remainder is a plain sum of AP
errors and unweighted BV suffices. Chen's divisor-weight absorption is needed
for the linear sieve at level `T^{1/2}`, not here.

**What stands.** Theorem C of §2, at **PROVEN, short-note grade**, an assembly
of Friedlander–Iwaniec *Opera de Cribro* Lemma 6.8 (quoted verbatim in this
repo at `research/dhr-verification.md` §4.1, from arXiv:2301.07679 p. 33, read
there 2026-08-18) over Bombieri–Vinogradov, on top of the classification of
`thm-mod30-tail.md` §2(a) (proven there, exhaustively checked). No second
reader has seen the assembly. It is a statement about `cap_K`, an upper bound
on kills, and it says nothing about twin primes.

---

## 1. The sieve problem, stated exactly

Objects as in `paper/staircase-note.md` §1 and §7, and `thm-mod30-tail.md` §1.
Level `x` prime, `W = x#`, Natal@5 comb `N_x` (House 29 excluded by
construction; the hypothesis `r ∈ N_x` is required and is stated, per
`thm-mod30-tail.md` D3). Scour prime `q`, prime regime `q³ > W + 1`.
`A = ⌊(W−1)/q⌋`, `B = ⌊(W+1)/q⌋`, `T` for either. `q₁ < … < q_K` the first `K`
scour primes.

**The sequence.** Fix a side and one of its two mod-30 classes. On the A-side
`v = qm ≡ 11` or `17 (mod 30)`, equivalently `m ≡ q⁻¹·11` or `q⁻¹·17
(mod 30)`; write `c` for the chosen class. Set

    𝒜 = 𝒜(q, c) = { m prime : q ≤ m ≤ A, m ≡ c (mod 30) },   X = |𝒜|.

That `m` is prime and `m ≥ q` is `thm-mod30-tail.md` §2(a), proven there from
`staircase-note.md` Lemma 1 and Theorem 3(i). B-side identical with
`{13, 19}`, `B`, and `+2` for `−2` throughout.

**The sifting set and the excluded classes.** For each prime `p` with
`7 ≤ p ≤ x` the A-side wheel condition `v ≢ −2 (mod p)` reads
`m ≢ −2q⁻¹ (mod p)`, one class, a unit since `p ∤ 2`. The companion condition
`v ≢ 0 (mod p)` is automatic (`p < q ≤ P⁻(m)`). For each `q_i`, `i ≤ K`,
the freshness condition `v ≢ −2 (mod q_i)` reads `m ≢ −2q⁻¹ (mod q_i)`, again
one class, and `v ≢ 0 (mod q_i)` is vacuous because `q_i ≠ q` and
`P⁻(m) ≥ q > q_i`. **One class per prime, not two.** Neither step needs `m`
prime: `P⁻(m) ≥ q` is `staircase-note.md` §7's own condition on `#A_K`, so the
one-class count holds at every scour prime and not only in the prime regime.
This is `thm-mod30-tail.md` §5(i), proven there and measured there against the
survey's factor (5.0% to 32.4% wrong, worsening with `K`).

So with `ω_p` denoting the single excluded class,

    𝒫 = { p prime : 7 ≤ p ≤ x } ∪ { q₁, …, q_K },   κ = 1,   g(p) = 1/(p−1),

and the object counted is `S(𝒜, 𝒫) = #{ m ∈ 𝒜 : m ≢ ω_p (mod p) ∀ p ∈ 𝒫 }`.
Summed over the two classes per side and both sides and with `s(q)` added,
this is exactly `cap_K(q)` of `staircase-note.md` §7, and at `K = 0` exactly
`cap₂(q)`, the object whose closed form
`natal-cap-28-analytic-certificate.js` line 179 codes as
`s + dP·(π(A) + π(B) − 2π(q−1))` with `dP = 0.25·∏_{7≤p≤x}(1 − 1/(p−1))`.

**Three structural facts, all verified in §5 Block 1.**

1. **The sifting set is contiguous.** The scour primes are the primes above
   `x`, marched ascending, so `{7 ≤ p ≤ x} ∪ {q₁,…,q_K}` is precisely the set
   of primes in `[7, q_K]`. Confirmed at @11 through @29 for
   `K ∈ {0,1,2,4,8}`, contiguity YES in all 30 cases. This makes the sieve's
   dimension condition an equality over an interval of primes rather than a
   bound over a gappy set.
2. **`q_K < q` for the whole tail, in the regime of the theorem.** Checked at
   @11..@29: it holds at every case except @11 with `K ≥ 2` and @13 with
   `K = 8`, where `q_K` overtakes the smallest tail prime and
   `staircase-note.md` §7's own truncation `q′ < q` bites. Under the
   theorem's hypothesis (`q_K = W^{o(1)}`, `q > W^{1/3}`) no truncation
   occurs for large `x`, and the hypothesis is stated to include it.
3. **`x ~ ln W ~ ln T`.** `ln W = θ(x) ~ x` (Chebyshev/PNT). Measured
   `x/ln W = 1.293 / 1.181 / 1.196 / 1.284` at @17/@19/@23/@29. In the tail
   `q = W^θ` with `θ ∈ (1/3, 1/2]`, so `ln T = (1−θ)ln W ∈ [ln W/2,
   2 ln W/3)`, hence `ln T ≍ ln W ≍ x` and the sifting primes are of size
   `q_K`, which for shallow `K` is `≍ ln T`.

---

## 2. Theorem C

**Hypotheses.** `x ≥ 7` prime, `W = x#`. `K = K(x) ≥ 0` an integer depth with

    ln q_K = o(ln W)   as x → ∞                                    (H1)

(equivalently `q_K = W^{o(1)}`; by the PNT this is `K ≤ exp(o(x))`, and
`q_K ≤ exp((ln W)^{1/2})` is a sufficient explicit form). `q` a scour prime
with

    W^{1/3} < q,   q² ≤ W/2.                                       (H2)

Sides, classes, `𝒜`, `𝒫`, `cap_K` as in §1, and `r ∈ N_x` throughout.
Put

    δ_K = (1/4) · ∏_{7≤p≤x} (1 − 1/(p−1)) · ∏_{i≤K} (1 − 1/(q_i − 1))
        = (1/4) · ∏_{7≤p≤q_K} (1 − 1/(p−1)).

**(a) Pointwise.** Uniformly in `q` subject to (H2) and in `K` subject to (H1),

    cap_K(q) = s(q) + (1 + o(1)) · δ_K · [ π(A) + π(B) − 2π(q−1) ],

where the `o(1)` depends only on `x` (through `min(s, ln T)`), not on `q`,
not on `K`, and not on the side or class.

**(b) Tail sum.** Under the same hypotheses,

    Σ_{q³ > W+1} cap_K(q) = (1 + o(1)) · 2 ln 2 · δ_K · W / ln W.

**(c) Corollary, the survey's headline.** Taking `K = 0`, the FULL wheel
version of the prime-regime `cap₂` closed form is an unconditional asymptotic:
`Σ_{q³>W+1} cap₂(q) = (1 + o(1))·(ln 2 / 2)·∏_{7≤p≤x}(1 − 1/(p−1))·W/ln W`.
This is the object `certificate-engine.md` §2 carries as the **Tail Comb
Equidistribution Conjecture [OPEN]**, in the shallow-`K` tail regime and in
the limit only. See §4 for what "in the limit only" costs.

---

## 3. Proof

**Step 1, the sieve setup.** Fix the side, the class `c`, and `q`. For
`m ∈ 𝒜` let `D(m) = ∏ { p ∈ 𝒫 : m ≡ ω_p (mod p) }`, a squarefree divisor of
`P := ∏_{7≤p≤q_K} p` (§1, fact 1). Then
`S(𝒜, 𝒫) = Σ_{m ∈ 𝒜} 1_{(D(m), P) = 1}`. For squarefree `d | P` put
`𝒜_d = #{ m ∈ 𝒜 : m ≡ ω_p (mod p) ∀ p | d }`, `h(d) = ∏_{p|d} 1/(p−1)`,
`r_d = 𝒜_d − h(d) X`.

**Step 2, the fundamental lemma.** Extend `h` multiplicatively with
`h(2) = h(3) = h(5) = 0`, so `h : N → [0,1)`. The dimension condition of
*Opera de Cribro* Lemma 6.8(iii) at `κ = 1` asks for `K_dim` with
`∏_{w≤p<z₁}(1 − h(p))^{−1} ≤ K_dim · (ln z₁ / ln w)` for all `z₁ ≥ w ≥ 2`.
Since `h(p) = 1/(p−1)` on `p ≥ 7` and `(1−h(p))^{−1} = (p−1)/(p−2)`, and
`∏_p p(p−2)/(p−1)²` converges, `K_dim` is absolute; measured
`K_dim = 1.2000`, the supremum sitting at `w = 7`, `z₁ = 7⁺` (§5 Block 2).
Lemma 6.8 supplies `λ^±_d` with `|λ^±_d| ≤ 1`, supported on
`{d ≤ D : d | P}`, with `Σ_{d|n} λ^−_d ≤ 1_{(n,P)=1} ≤ Σ_{d|n} λ^+_d` and the
two one-sided inequalities `Σ_{d|P} λ^+_d h(d) ≤ (1 + e^{9κ−s} K_dim^{10})·V`
and `Σ_{d|P} λ^−_d h(d) ≥ (1 − e^{9κ−s} K_dim^{10})·V`, which is the form
Lemma 6.8(iii) states and which the sandwich above makes sufficient, where
`V = ∏_{p<z}(1 − h(p)) = ∏_{7≤p≤q_K}(1 − 1/(p−1)) = 4δ_K`, `D = z^s`,
`z = q_K + 1`. Evaluating at `n = D(m)` and summing over `m ∈ 𝒜`,

    S(𝒜, 𝒫) = X · V · (1 + O(e^{9−s} K_dim^{10})) + O( Σ_{d ≤ D, d | P} |r_d| ).

Take `D = T^{1/3}`. Then `s = ln D / ln q_K ≥ (ln W) / (6 ln q_K) → ∞` by
(H1) and `ln T ≥ (ln W)/2`, so the first error factor is `1 + o(1)`, with an
absolute implied constant. **This is the only place `K` enters the error, and
it enters only through `q_K`, which is why the `o(1)` is uniform in `K`.**

**Step 3, the remainder, by BV.** `d | P` is coprime to 30, so
`φ(30d) = 8φ(d)` and by CRT `𝒜_d = π(T; 30d, a_d) − π(q−1; 30d, a_d)` for the
single class `a_d` with `a_d ≡ c (mod 30)`, `a_d ≡ ω_p (mod p)` for `p | d`;
`gcd(a_d, 30d) = 1` since every constraint is a unit class. Writing
`E(t; k, a) = π(t; k, a) − Li(t)/φ(k)`, the `Li` parts cancel identically
against `h(d)X`'s, leaving

    r_d = E(T;30d,a_d) − E(q−1;30d,a_d) − φ(d)^{−1}[E(T;30,c) − E(q−1;30,c)].

Summing over `d ≤ D`, the first two terms are sub-sums of the
Bombieri–Vinogradov sum **in its `max_{y ≤ T}` form** at level
`30D ≤ T^{1/2}/(ln T)^B` (the moduli `30d` are distinct and `≤ 30D`), so each
is `≪_A T/(ln T)^A`. The `π(q−1)` term is covered by that inner maximum, since
`q ≤ T/2` by (H2); it is **not** a BV statement at the endpoint `q−1`, where the
level `30T^{1/3}` would be inadmissible, since `q > W^{1/3}` and `T < W^{2/3}`
give `T^{1/3} < W^{2/9}` against `q^{1/2} > W^{1/6}` and `2/9 > 1/6`. The third
term is
`≪ (ln D) · T·exp(−c√(ln T))` by PNT in progressions at the fixed modulus 30,
which is `o(T/(ln T)^A)`. Hence `Σ_{d≤D}|r_d| ≪_A T/(ln T)^A` for every `A`,
uniformly in `q` and in the class `a_d`, because BV takes the maximum over
residues. **That is the answer to the q-dependence question: the excluded
class `ω_p = −2q⁻¹ (mod p)` moves with `q` and BV does not care, since it
bounds `max_a`.** BV is applied separately at each `T = W/q`; it is a
statement about a single `T`, its constant is absolute given `A`, and
`ln T ≥ (ln W)/2` on the whole tail, so the bound is uniform there.

**Step 4, the main term dominates.** By (H2), `q ≤ T/2`, so
`X ≫ (T − q)/(8 ln T) ≫ T/(16 ln T)`, and `V ≍ 1/ln q_K ≫ 1/ln T`. So
`X·V ≫ T/(ln T)²`, and the remainder is `≪_A T/(ln T)^A`. Taking `A = 4`, the
relative remainder is `O((ln T)^{−2})`. Combining with Step 2,

    S(𝒜, 𝒫) = (1 + o(1)) · X · V,      V = ∏_{7≤p≤q_K}(1 − 1/(p−1)) = 4δ_K,

for each of the four (side, class) pairs, with `X` that pair's own count of
primes in `[q, T]` in its class mod 30.

Summing the four pairs, adding `s(q)`, and replacing the
class counts by `(1/4)(π(A) + π(B) − 2π(q−1))` via PNT in progressions at the
fixed modulus 30 (error `O(T exp(−c√ln T))`, uniform in the class, exactly the
input `thm-mod30-tail.md` §2(c) uses), gives (a). The `s(q)` term is `0` or
`1` and is left outside the asymptotic.

**Step 5, the sum.** Split the tail at `q² = W/2`. Above it, `cap_K ≤ cap₁`
and `Σ_{W/2 < q² ≤ W} cap₁(q) ≪ (W/ln W)·Σ 1/q ≪ W/(ln W)²` by Mertens, which
is `o(δ_K · W/ln W)` precisely because `δ_K ≍ 1/ln q_K` and `ln q_K = o(ln W)`
by (H1). **(H1) is doing double duty here: it makes `s → ∞` and it makes the
top-of-tail sliver negligible.** Below it, (a) applies uniformly, and the
evaluation is `thm-mod30-tail.md` §2(c)'s verbatim: write `q = W^θ`, use
`π(W/q) = (1+o(1))W/(q(1−θ)ln W)`, Mertens gives the measure `dθ/θ`, and
`∫_{1/3}^{1/2} dθ/(θ(1−θ)) = ln 2`. The four class-counts contribute
`δ_K·(π(A)+π(B))` in place of `2(π(A)+π(B))`, so the constant `2 ln 2` of
`staircase-note.md` Theorem 6 is multiplied by `δ_K`. Hence (b), and (c) is
`K = 0`. ∎

**Where the level `D` could be pushed and why it does not matter.** Any
`D = T^{c}` with `0 < c < 1/2` works; `c = 1/3` is the survey's choice and
`c → 1/2` is BV's ceiling. The choice changes `s` by a factor at most `3/2`
and changes nothing qualitative, since (H1) is what sends `s → ∞`. EH would
allow `c → 1`, buying another factor of 2 in `s`: nothing, exactly as the
survey says.

---

## 4. What the theorem costs in the finite range, and it is everything

**The fundamental lemma's error factor stays above 1 below `x = 263`,
scratchpad-grade (§5).** With `K_dim = 1.2000`, FI Lemma 6.8's error factor
`e^{9κ−s}K_dim^{10}` is below 1 only for `s ≥ 10.82`, below 1/2 for
`s ≥ 11.52`, below 1/100 for `s ≥ 15.43`. The lemma's own floor is
`s ≥ 9κ + 1 = 10`. The measured `s` at `K = 0`, `z = x` (Step 2's `z = q_K + 1`
read at `K = 0`, the convention `thm-sharp-sieve-range.md` §1 states for this
table), `D = T^{1/2}`, worst tail case `T = √W`. `D = T^{1/2}` is BV's ceiling
and not the proof's own level: at Step 2's `D = T^{1/3}` every `s` below is two
thirds of the printed value, so the table is the generous reading and emptiness
is worse under the proof's own `D`.

| level | @11 | @13 | @17 | @19 | @23 | @29 | @97 | @199 | @401 | @1009 |
|---|---|---|---|---|---|---|---|---|---|---|
| `s` | 0.81 | 1.00 | 1.16 | 1.37 | 1.53 | 1.68 | 4.58 | 8.91 | 15.71 | 34.81 |

First `s ≥ 10` at `x = 239` (`W ≈ 10^96`), first `s ≥ 10.82` at `x = 263`
(`W ≈ 10^105.6`, `s = 10.9132`, re-derived independently in
`redteam-0828-engine.md` §3.2 on this table's own convention), first `s ≥ 12`
at `x = 283` (`W ≈ 10^118`). Every level in the marchable range and every level in the
engine's prediction range (@29 to @97) sits at `s < 5`. Halberstam–Richert
Theorem 2.5's `1 + O(u^{−u/2})` form is formally valid from `u ≥ 1`, but its
implied constant is not written in any source read here
(`dhr-verification.md` §4.2, which reads it from Wikipedia's summary, not the
book), so it does not rescue a finite statement either.

**Consequence for `certificate-engine.md` §2.** The Tail Comb Equidistribution
Conjecture is used there at finite levels, with a measured 0.0% to 1.1%
envelope. Theorem C does not supply that envelope. What it converts is the
*limit* claim, from OPEN to proven-but-ineffective, and it leaves the
finite-level control exactly where the Tail Envelope Measurement left it. The
honest ledger line is "asymptotically closed, ineffectively, at shallow depth;
the measured envelope is still the only finite-level statement."

---

## 5. Measured checks (scratchpad-grade)

Companion script `research/history/staging/thm-capK-bv.js`, output embedded by
`node research/qc/embed.js --force research/history/staging/thm-capK-bv.js`
(1.1 s), code-sha256 `fff18ac8e5414a8f…`, out-sha256 `895e5c4005db1870…`,
74 body lines. Reproduce with `node research/history/staging/thm-capK-bv.js`.
`--force` was used once, to add the `N` and `Σs(q)` columns to Block 4; the
embed records `0 of 202 figures in the replaced block not reproduced`.

**Cross-checks run before trusting anything.** The A-side mod-30-only counts
come out **5336 at @17** and **90501 at @19**, matching
`thm-mod30-tail.js`'s independently written `K=0 base` digit for digit. The
census comes out `N = 14850 / 252450 / 5301450` at @17/@19/@23, matching
`staircase-note.md` Theorem 8's table. The tail-prime counts come out
105 / 396 at @17/@19, matching §6 of the same note.

**Block 4, the full wheel against the product, at three levels and five
depths.** `pred1` is cap-28's own tail form `dP·freshprod·(π(A)+π(B)−2π(q−1))`;
`pred2` replaces the mod-30 count by its exact value, isolating the sieve part
from the mod-30 equidistribution.

| level | K | exact | exact/pred1 | exact/pred2 | (exact+s)/N |
|---|---|---|---|---|---|
| @17 | 0 | 6 938 | 1.0050 | 1.0030 | 0.4706 |
| @17 | 8 | 5 262 | 1.0020 | 1.0000 | 0.3578 |
| @19 | 0 | 110 245 | 0.9999 | 0.9999 | 0.4375 |
| @19 | 8 | 86 979 | 0.9986 | 0.9986 | 0.3453 |
| @23 | 0 | 2 120 470 | 0.9999 | 0.9999 | 0.4001 |
| @23 | 8 | 1 725 506 | 1.0004 | 1.0004 | 0.3256 |

(The full `K ∈ {0,1,2,4,8}` grid is in the embedded block; the largest
deviation anywhere in it is 0.67%, at @17 `K = 1`.) The `K = 0` column agrees
with `certificate-engine.md` §2's Tail Envelope Measurement, aggregate error
0.0% to 1.1% of tail mass, and with `bv-import-survey.md` §3.1's "the measured
cap₂ tail is 0.44–0.49·N already at x = 11–19" (measured 0.4706 at @17,
0.4375 at @19).

**What this measurement is and is not evidence for.** It is evidence that
`δ_K` is the right density, which is a §1 counting statement and was never in
doubt. It is **not** evidence for Theorem C's error term, because at these
levels `s < 1.6` and the fundamental lemma asserts nothing. A reader who takes
the 0.02% agreement at @23 as validating the theorem has validated the wrong
object.

---

## 6. What this buys, and what it does not

**Buys.**

1. `certificate-engine.md` §2's Tail Comb Equidistribution Conjecture becomes
   a theorem in the limit, unconditionally, for the FULL wheel (`P₀ = x`,
   which is where S2 of `thm-mod30-tail.md` §5(v) stops) and for any depth
   with `ln q_K = o(ln W)`. That is one of cap-28's two named unproven
   ingredients, in one of its regimes.
2. Uniformity in `K` and in the truncation. S2's Siegel–Walfisz constant is
   ineffective *in K* and its family is not uniform in `P₀`; Theorem C's
   fundamental-lemma error depends on `K` only through `s`, with an absolute
   constant.
3. The correct dimension is settled: `κ = 1`, one excluded class per sifting
   prime, throughout the shallow regime. The survey's `∏(1 − 2/(q_i − 1))` is
   refuted (`thm-mod30-tail.md` §5(i) and its measurement).

**Does not buy.**

1. **Anything finite.** §4. `s < 5` at every level anyone can reach or
   predict.
2. **Anything effective.** BV's constant is ineffective. GRH would make the
   remainder pointwise and effective, as the survey says, but the
   fundamental-lemma factor is unaffected and §4's threshold stands.
3. **Anything in the deep ladder.** `ln q_{K*}/ln T = 0.562` at @97. The
   theorem's hypothesis (H1) is false there by a wide margin, and the binding
   constraint at that depth is the sifting limit, not the remainder
   (`bv-import-survey.md` §3.3, `covering-dive.md`).
4. **Anything in the head.** The sum runs over `q > (W+1)^{1/3}`. Corollary 4's
   pigeonhole needs the head, whose `cap₁` share alone is 0.8 to 5.1 times `N`.
5. **Anything about twin primes.** `cap_K` is an upper bound on how many comb
   slots a scour prime can kill. No statement here bears on infinitude, and
   none is claimed.

---

## 7. Defects noticed in passing

- `research/bv-import-survey.md` §3.2 says the remainder needs "the same
  absorption of divisor weights as in Chen's proof, Halberstam–Richert
  Ch. 11". The fundamental lemma's weights are bounded by 1 (FI Lemma 6.8(i)),
  so unweighted BV suffices; the divisor-weight machinery belongs to the
  linear sieve at level `T^{1/2}`, not here. Over-naming, not an error in the
  conclusion.
- `research/bv-import-survey.md` §3.2 describes the deep ladder as having "two
  excluded classes per large freshness prime, dimension 2 in the range
  `(x, q_K]`". For `q_i < q` the condition `v ≡ 0 (mod q_i)` is vacuous
  (§1), so the dimension is 1 wherever `q_i < q`; only freshness primes
  exceeding `q` could contribute a second condition, and even there
  `v ≡ 0 (mod q_i)` selects the single value `m = q_i`, not a class. Whether
  the deep-ladder object the survey means is the same object is not settled
  here. **NOT AUDITED, one line as required.**
- `research/natal-cap-28-analytic-certificate.js` line 13 abbreviates
  `cap2(q) = s(q) + #{2<=m<=A: qm in comb_A} + …` with no `P⁻(m) ≥ q`
  condition, while `staircase-note.md` §7's `#A_K` carries it. In the prime
  regime the two agree; outside it they need not. Comment-level only.

---

## 8. What would falsify this, and whether that check has run

| Claim | What would falsify it | Has the check run |
|---|---|---|
| §1, one excluded class per sifting prime, `κ = 1` | a prime-regime admissible `m` with `v ≡ 0 (mod p)` or `(mod q_i)` for some `p ≤ x`, `q_i < q` | **RUN**, by `thm-mod30-tail.js`'s D1 table and by Block 4's agreement to within 0.01–0.67%; the proof is two lines |
| §1 fact 1, the sifting set is the primes in `[7, q_K]` | a gap between the wheel primes and the scour primes | **RUN**, 30 cases at @11..@29, contiguity YES in all |
| Theorem C(a), the pointwise asymptotic | a proof error in Step 3's cancellation, or a hidden non-uniformity in BV over the moving class `ω_p = −2q⁻¹` | **NOT RUN.** No second reader. The `max_a` in BV is the load-bearing clause and it is quoted from `bv-import-survey.md` §1, not read at a page here |
| Theorem C, the `K_dim = 1.2000` constant | a `(w, z₁)` pair outside the searched range with a larger ratio | **PARTIALLY RUN**: sup over `w` up to the 4000th prime and `z₁ ≤ 10⁵`; the sup is attained at the smallest admissible `w = 7` and the ratio decreases in `w`, so the search is very likely complete, but "very likely" is not a proof |
| Theorem C(b), the tail sum | a level where `Σ cap_K` over the tail departs from `2 ln 2·δ_K·W/ln W` by more than `o(1)` relatively | **NOT RUN as a sum against the closed form.** Block 4 checks the per-`q` densities, not the Mertens/partial-summation evaluation, which is inherited unchanged from `staircase-note.md` Theorem 6 |
| (H1) as the right admissible range | a depth with `ln q_K = o(ln W)` at which the sliver argument of Step 5 fails, or a depth violating (H1) at which the theorem nevertheless holds | **NOT RUN.** (H1) is sufficient, and no attempt was made to find the necessary condition |
| §4, `s < 5` at every reachable level | a level below @97 with `s ≥ 10` at `D = T^{1/2}` | **RUN**, at eleven levels; the `s ≥ 10` crossing is at `x = 239` and the `s ≥ 10.82` crossing at `x = 263` (`redteam-0828-engine.md` §3.2, which swept every prime level and reproduced this note's ten printed `s` values) |
| §0, the deep ladder is out of scope | `ln q_{K*}/ln T → 0` along the engine's own `K*` curve | **RUN at @97 only**, giving 0.562. The `K*` value itself is `natal-cap-28`'s PREDICTED extrapolation, not a march, so this row inherits that rung |
| "buys no effectivity" | an effective form of BV at level `T^{1/2}/(ln T)^B` | **NOT RUN as a literature search.** The ineffectivity of BV's constant is standard [MEMORY]; no source was read at a page here |
| FI Lemma 6.8's statement as used | the book's Lemma 6.8 differing from the quotation carried in `dhr-verification.md` §4.1 | **NOT RUN.** The quotation is from arXiv:2301.07679 p. 33 (Matomäki–Teräväinen quoting it), read 2026-08-18; *Opera de Cribro* itself has not been opened here |
