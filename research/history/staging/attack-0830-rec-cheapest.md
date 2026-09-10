# REC at its cheapest legal point: the saving asked is z^{1.031}, and the pointwise floor of the certificate says no accounting can supply it

<!-- ledger
id: Q-rec-cheapest-0830
status: PARTIAL
todo: 0
question: At the cheapest legal point of REC(s, u0), s -> 1+sqrt(e) and u0 -> beta_2, where the saving asked over the triangle inequality is only z^{1.031}, does any of the five dead routes close, does a mixed mean-square-plus-cap strategy close, and is the failure a proof gap or a truth gap?
verdict: No route closes and the failing step is yesterday's statement, so PARTIAL on the routes; but the step is located as a TRUTH gap, not a proof gap, asymptotically: the certificate's own value at a CRT-planted doubly-smooth window is cc(r) = -(A1A2 + A1B2 + B1A2) with every term a count of exit chains of the Rosser supports (PROVEN, checked exhaustively at z <= 73), the window bound T <= cc(r) + H - 1 is exact, and the exit-chain count is DERIVED (held) to grow like z^{16s/9 - o(1)} at four primes and z^{2s - o(1)} in the limit, so REC(s, u0) is false for every u0 < 16s/9 = 4.7088 at s -> 1+sqrt(e), the whole legal band (2, beta_2] included, and RML(alpha) with it; at every computable z it is a proof gap (Omega(z) exact to z = 73 reads 251 against z^{u0} = 1.05e6, and a certified lower bound 8.86e17 at z = 5e5 sits a factor 1.2e6 under z^{u0}); no exponent moved.
-->

> **RIDER 2026-09-04 (orchestrator, from `redteam-0904-floor-growth-2.md` §5
> and `redteam-0904-item0.md`).** §4.2's p* window (4D^{1/27}, D^{1/9}/4) is
> a convenience bound, neither necessary nor sufficient for family membership
> at reachable levels: on exact integers the construction's onset is
> z = 1.875e6 at this note's s = 2.698721 (the analytic 1.055e6 is early by
> 1.78×) and 4.39e5 at s = 3.0. The floor's crossing of H = z^{u₀} depends on
> both s and u₀ (5.6e31 is the (2.698721, 4.2165) cell; 10^15.3 at (3.0, β₂)).
> The growth half survived a second adversarial pass at every admissible
> level split (1643 splits, minimum margin 0.64); rung unchanged, DERIVED.

> **RIDER 2026-08-30 (orchestrator; both halves red-teamed on independent
> code).** EXACT half (`redteam-0830-floor-sign.md`): STANDS as PROVEN and is
> stronger than stated in two places (E3's identity holds at every position,
> 0 mismatches in 20.5M, not only at doubly non-rough points; sup|R₁| = Ω + M
> exactly, so sup|ρ̃| ≥ (Ω + M)/2, not (Ω − M)/2); E2 needs the hypothesis
> D ≥ z this note omits (it fails at s = 0.8; free in the legal band); Ω
> reproduced at all 26 tabled values and extended to 285, 441, 684, 990,
> 1155 at z = 79, 83, 89, 97, 101. Three sentences REFUTED as written: E1
> (L164) "every pair with gcd | 2 is realised" — exactly half are, the
> missing half being the pairs where 2 divides one side only; the ledger's
> and §0's "251 against z^{u₀} = 1.05e6" — 1.05e6 is HM(u₀), z^{u₀} at
> z = 73 is 7.188e7, so the gap is 68.3× larger than stated; §4.4's reason
> for λ⁺(P(z)) = 0 (0.24 exceeds 1/8; the closing figure is 0.1169–0.1199,
> under 1/8 by 4–7%, a near-miss). The exact half constrains REC at NO u₀ by
> itself, every exactly known log_z Ω being below 2. GROWTH half
> (`redteam-0830-floor-growth.md`): six attacks, no break, stays DERIVED;
> hypothesis s ≤ 3 added to the 16s/9 threshold; "0.012 → 0.35, rising" is
> the wrong description (falls 2.5× first); q ≈ z^{5.00} not z^{4.8}; the
> blind slope test tests the construction, not the law. Ruling: REC, F1, F2
> and RML below β₂ are false at rung derived-and-red-teamed-once, the route a
> truth gap at that rung (`REFUTED.md`, 2026-08-30), its falsity beyond
> z ≈ 5.6e31.

*(2026-08-30 wave, staging. Producer:
`research/history/staging/attack-0830-rec-cheapest.js`, embedded via
`qc/embed.js`. No existing file edited, no git command run. Every number
below is in the producer's OUTPUT block or is quoted from an embedded
artifact cited by file and section. Calibration per claim: PROVEN, MEASURED,
DERIVED (a written argument not yet adversarially checked), HEURISTIC, OPEN,
REFUTED. HELD: no adversarial pass has run on §4.)*

## 0. What is open, first

- **Nothing here lowers any exponent, and no route closes.** At the cheapest
  legal point the five routes of `attack-0829n-rml-proof.md` §4 die at the
  same statement they died at yesterday (§2), and the mixed strategy of the
  brief is worth z^{0} (§3). On the brief's kill rule this is PARTIAL.
- **The new part is adverse to the item.** §4 shows the absolute-value
  accounting is sharp up to a polylog at one window that can be written
  down, so the saving REC asks for, z^{1.031} at the cheapest point and
  z^{2s − u₀} anywhere, is not a saving a proof has failed to find but a
  saving that is not there. The exact half of that (E1–E4 of §4.1) is
  PROVEN and machine-checked at z ≤ 73; the growth half (§4.2, exponent
  16s/9 − o(1), and 2s − o(1) in the limit) is DERIVED and HELD for one
  adversarial pass. If it stands, REC(s, u₀) is false at every u₀ < 16s/9,
  which at s ↓ 1+√e is 4.7088 > β₂, so no legal point survives; F1, F2 and
  RML(α) at every α < β₂ go with it, and rider 2's floor th(nP) exceeds β₂
  asymptotically. That is the event yesterday's §6 listed under "the floor
  crossing β₂: REC would be moot rather than false".
- **At every computable z it remains a proof gap.** Ω(z), the pointwise
  floor, is exact to z = 73 and reads 251 against z^{u₀} = 1.05e6 (S3); the
  certified lower bound at z = 5e5 is 8.86e17 against 1.07e24 (S4b), a
  factor 1.2e6 short, with the deficit falling 3.01 → 1.65 exponents over
  601..5e5 and needing to reach 0.58 before any window fails. No computation
  in reach falsifies REC; the falsity is a statement about the limit.
- **What was not done.** No exact sup at s near 1+√e beyond z = 29 (S2), no
  exact Ω beyond z = 73, no six-prime chains in the certified family (they
  would raise the exponent toward 2s and are dormant below z ≈ 1e5), no
  literature search for the pointwise-size fact, which is standard.

## 1. The cheapest point, written out (deliverable a)

Fix η > 0 and set s = 1 + √e + η, u₀ = β₂ − η, D = z^s, H = ⌊z^{u₀}⌋,
W = P(z). REC(1+√e+η, β₂−η) reads: there are ε > 0 and z₀ with

    sup_{x ∈ ℤ/W} |R_H(x)|  ≤  z^{(β₂−η)/2 − ε} · ⟨R_H²⟩^{1/2}     for all z ≥ z₀,

s and u₀ fixed before z, u₀ never a function of z (the quantifier discipline
of `attack-0829n-rml-proof.md` §3, unchanged). Its truth gives G₂(z#) ≤
z^{β₂−η}, an exponent movement of exactly η. The point is legal for every
η ∈ (0, β₂ − 2): u₀ − 2 = 2.2165 at the working η (S0), fixed and never sent
to 2 (`attack-wrongdirection-audit.md` §3.10, row 10). It is the cheapest
point in one currency and the dearest in the other, and both are read off
S0 (constants 1+√e = 2.648721270700, β₂ = 4.26645028414864, difference of
the doubles 2(1+√e) − β₂ = 1.030992):

| η | s | u₀ | cap-currency ask 2s − u₀ | rms-currency ask u₀/2 | bought |
|---|---|---|---|---|---|
| 0 (limit, illegal: M → 0) | 2.6487 | 4.2665 | 1.0310 | 2.1332 | 0.00 |
| 0.01 | 2.6587 | 4.2565 | 1.0610 | 2.1282 | 0.01 |
| 0.05 (working point) | 2.6987 | 4.2165 | 1.1810 | 2.1082 | 0.05 |
| 0.10 | 2.7487 | 4.1665 | 1.3310 | 2.0832 | 0.10 |
| 0.35 (≈ yesterday's s = 3) | 2.9987 | 3.9165 | 2.0810 | 1.9582 | 0.35 |

- **Cap currency.** Against any absolute-value accounting (C3-triv, C3-cap of
  yesterday's §2, both PROVEN at exponent 2s + o(1)) the saving asked is
  z^{2s − u₀ − o(1)} = z^{1.030992 + 3η}. At η → 0 this is the
  2(1+√e) − β₂ gap of `sift-limit-attack.md` §4.5 and §7b (K_FH =
  5.297442541400 against β₂), the brief's z^{1.031}: correct to the digits
  the brief gives. It is the smallest saving any legal point asks for, and it
  buys the least, η.
- **Rms currency.** Against the PROVEN mean square (C1–C2) the recovery
  asked, sup/rms ≤ z^{u₀/2 − ε}, is LARGEST here: u₀/2 = 2.1332 − η/2 against
  1.5 at u₀ = 3. Cheap in one accounting is dear in the other, and the
  routes of §2 live in different currencies, which is why they have to be
  priced separately.
- **Main term at the point.** M ln²z is MEASURED 0.3332 → 0.2715 at z = 13..47
  at s = 2.698721 (S2, S3; the s = 3 family reads 0.3359–0.3772, S1), falling:
  the linear-sieve main term ln(s−1)² − 1 vanishes at s = 1+√e, so the
  consumer's HM − 1 is itself thinner here than anywhere else in the band.

## 2. The five routes at a demand of z^{1.031} (deliverable b)

Each route is re-priced at (s, u₀) = (2.698721, 4.216450) and at η → 0.

1. **Term-count cap (yesterday §4.1).** The cap delivers exponent 2s + o(1)
   by taking absolute values across the lattice, so its saving over itself
   is identically 1 at every (s, u₀). A demand of z^{1.031} is smaller than
   the z^{2.0} demand at (3, 4), but the route supplies zero saving at any
   positive demand, so it does not close and cannot close by lowering the
   demand. Measured at the point: u_cap is not re-tabled; §4 shows the cap
   is sharp up to a polylog, which is stronger than "not improved".
2. **Position union and moments (yesterday §4.2).** Price e^{θ(z)/q} at
   moment order q. Against the rms-currency ask z^{u₀/2}: with Gaussian-shaped
   moments ‖R‖_q ≤ C√q · rms the route needs e^{θ(z)/q}·√q ≤ z^{u₀/2 − ε},
   i.e. q ≥ θ(z)/((u₀/2) ln z)(1 + o(1)). The cheapest point asks the largest
   u₀/2, so the moment order needed is the SMALLEST of the band, z/(2.1332
   ln z) against z/(1.5 ln z) at u₀ = 3: a constant factor 1.42 on an order
   that still diverges. The only proven moment is q = 2 (I1); the failing
   step is a moment bound of unbounded order, the same step as yesterday.
   Against the cap-currency figure z^{1.031} the comparison is not even the
   right one: e^{θ(z)/q} ≤ z^{1.031} needs q ≥ z/(1.031 ln z) and then
   ‖R‖_q is unproven for every q > 2.
3. **Window smoothing and the P(y) lever (yesterday §4.3).** Polylog movers;
   at the cheapest point the reduced range of moduli (z^{u₀−δ}, z^{2s}] is
   only 1.181 + δ exponents wide, so there is less to remove, and the
   removed part was never the exponent. §4.3 below shows the counterexample
   window lives entirely inside the reduced range.
4. **The mean square (yesterday §4.4).** I1 is square-root cancellation at
   every level, s-uniform; not where the exponent is lost. Unchanged.
5. **The smooth-profile form (yesterday §4.5).** Disconnected at both ends;
   nothing at the point changes the hypothesis. Unchanged.

**The single failing step, at the cheapest point:** a bound on the signed
count of large-modulus lattice hits in one window, uniform in the window's
position, by o(H/ln²z), with H = z^{β₂−η} and the moduli up to z^{2s}. That
is the statement of yesterday's §4.3, the reduced arrow, at the point where
the modulus range is narrowest. It is the same statement, so by the brief's
kill rule the routes verdict is PARTIAL. §4 then says the statement is false.

## 3. The mixed strategy, with the arithmetic (deliverable c)

Split the moduli at z^{u₀−δ}. Below it, the ℓ¹ accounting is PROVEN to sit
under HM − 1 for large z (yesterday reading 4). Above it, the only two
instruments are the cap (sup ≤ CAP_big ≤ z^{2s} polylog, PROVEN) and the mean
square (⟨R²_big⟩ ≤ B_big H, PROVEN, almost-all only). A sup bound from the
pair {sup ≤ A, rms ≤ B} is exactly A: with no moment above the second, the
mean square contributes nothing to a bound at one position (Axis C of
`attack-wrongdirection-audit.md` §1: the density of bad positions it
controls is W·B²/λ², never zero). So every mixture "part from the mean
square, part from a cap over a restricted range" reduces to the cap on the
big moduli:

    saving = CAP_big / z^{2s} = z^{o(1)},  for every split point δ,

because the ℓ¹ mass sits at the top of the modulus range (yesterday S3:
the share of CAP above z^{3.5} at s = 3 reads 0.5684 at z = 37 and rising).
The mixed strategy reaches z^{0}, not z^{1.031}. There is no arithmetic to
do beyond this, and §4 makes the zero structural: the cap's exponent is the
true exponent of the certificate at a planted window.

## 4. The pointwise floor of the certificate (deliverable e, the new part)

Everything in §§2–3 dies at the same statement as yesterday. What is new is
the reason: the absolute-value accounting is not loose. Its exponent, up to a
polylog, is the true size of the certificate at one window, and the window
can be written down.

### 4.1 Four exact facts

Write λ^±(n) = Σ_{d | n, d ∈ D^±} μ(d) for the Rosser weights of level D
(`sift-limit-lemmaV.js` `rosserSupport`, the pilot's own support), P = P(z),
and for a position r let n₁ = gcd(r, P), n₂ = gcd(r+2, P). Then:

- **(E1) cc(r) is a function of (n₁, n₂) alone**, cc(r) = λ⁻(n₁)λ⁺(n₂) +
  λ⁺(n₁)λ⁻(n₂) − λ⁺(n₁)λ⁺(n₂), and every pair (n₁, n₂) of divisors of P with
  gcd(n₁, n₂) | 2 is realised by some r in ℤ/W (CRT: r ≡ 0 mod n₁,
  r ≡ −2 mod n₂, r ≢ 0, −2 mod every other odd prime). PROVEN, one line.
- **(E2) λ⁺(n) ≥ 0 and λ⁻(n) ≤ 0 at every n | P with n > 1.** The Buchstab
  boundary identity: for a prefix-closed support D, Σ_{d | n, d ∈ D} μ(d) =
  1_{n = 1} − Σ μ(d₀)·1[(n, P(p_m)) = 1], the sum over first-exit chains
  d₀ = p₁ ⋯ p_m | n (p₁ > ⋯ > p_m, p₁ ⋯ p_{m−1} ∈ D, d₀ ∉ D). D⁺ exits only at
  odd m (its conditions are p₁ ⋯ p_{m−1} p_m³ ≤ D at odd m; the size cap is
  implied at even m), so every boundary term has μ(d₀) = −1 and λ⁺(n) is a
  count; D⁻ exits only at even m, so λ⁻(n) is minus a count. Checked
  exhaustively over every divisor of P(z) at z = 13..73 (S3, `viol` = 0 at
  every level, both s). PROVEN.
- **(E3) At a doubly non-rough point, cc(r) = −(A₁A₂ + A₁B₂ + B₁A₂) with
  A_i = λ⁺(n_i) ≥ 0, B_i = −λ⁻(n_i) ≥ 0**, so cc(r) ≤ −A₁A₂. From (E1),
  (E2). PROVEN. (Where r+2 is rough, cc(r) = λ⁻(n₁) = −B₁; the S3
  maximisers at z ≤ 19 are of that kind, B₂ printed as −1.)
- **(E4) For every window (x, x+H] containing r: T(x) ≤ cc(r) + (H − 1)**,
  because cc(r′) ≤ θ(r′)θ(r′+2) ≤ 1 pointwise (Brüdern–Fouvry, PROVEN,
  `rho-maximal-law.md` §2 (iv)). PROVEN.

Define **Ω(z, s) = −min_r cc(r) = max over splits of (A₁A₂ + A₁B₂ + B₁A₂)**.
Then, for every H ≤ Ω(z, s): the window starting at r − 1 has T ≤ −1, so
**nP(z) > Ω(z, s)** (rider 2's floor), **F1 fails at H**, and since
R_1(x) = cc(x+1) − M, **sup|ρ̃| ≥ (Ω − M)/2**. Direction guard: every one of
these is a lower bound on a remainder or an upper bound on the certificate,
the adverse direction; none says anything about G₂ itself and none has TPC
content.

### 4.2 The exit-chain count, and its size

By the boundary identity, for n = P₁ with smallest prime p*,

    λ⁺(P₁) = #{ d′ ∈ D⁺ : d′ | P₁/p*, ω(d′) even, d′ > D/p*³ },

the chains that exit D⁺ exactly when p* is appended (the odd-m condition
d′·p*³ ≤ D fails). Take the sub-family ω(d′) = 4, d′ = p₁p₂p₃p₄ with
p₁³ ≤ D and p₁p₂p₃³ ≤ D (the two D⁺ conditions, both prefix conditions
implied). At the extremal exponent pattern (s/3, s/3, s/9, s/9) the product
reaches D^{8/9}, and it exits at any p* > (D/d′)^{1/3} ≈ D^{1/27}. Dyadic
ranges p₁ ∈ (D^{1/3}/2, D^{1/3}], p₂ ∈ (D^{1/3}/4, D^{1/3}/2], p₃ ∈
(D^{1/9}/2, D^{1/9}], p₄ ∈ (D^{1/9}/4, D^{1/9}/2] satisfy both conditions
identically, give d′ ≥ D^{8/9}/64, and exit at every p* > 4D^{1/27}. Split
the primes in each range by index parity into two halves and give each half
its own p*: two disjoint sets P₁, P₂, each with A_i ≍ D^{8/9}/ln⁴D by
Chebyshev's bounds on the four dyadic prime counts, whence

    Ω(z, s) ≥ A₁A₂ ≫ z^{16s/9} / ln⁸ z          (DERIVED, HELD).

The same construction with 2k primes at the pattern (s/3, s/3, s/9, s/9, …,
s/3^k, s/3^k) gives exponent 2s(1 − 3^{−k}), so **Ω(z, s) ≥ z^{2s − o(1)}**
for fixed s as z → ∞, the o(1) being O(3^{−k}) at the cost of a polylog
ln^{−4k} z. The 4-chain exponent already suffices for what follows.

What this is not: it is not new mathematics. That combinatorial sieve weights
take polynomially large values at smooth integers, and that absolute
remainder accounting is therefore sharp for sifting short intervals, is the
standard reason a level of distribution is needed at all. The corpus measured
the absolute side of this on 2026-08-18 (`sift-limit-attack.md` §7b (3), the
planted doubly-smooth n₀ at 0.978 of the trivial bound) and read the signed
side as small because at z = 13 it is: Ω(13) = 1 (S3). The signed side grows,
and the reason is (E2): at a planted point every term of cc has the same
sign, because both weights are counts of exit chains.

### 4.3 What it does to REC, F1, F2, RML and the floor

- **REC(s, u₀) is false for every u₀ < 16s/9, if §4.2 stands.** REC implies
  min_x T(x) ≥ 1 at H = z^{u₀} for all z ≥ z₀ (chain C3–C6, PROVEN), and
  (E4) with Ω ≥ z^{16s/9 − o(1)} gives a window with T ≤ −1 for all large z
  once u₀ < 16s/9. At s = 1+√e+η the threshold is 16s/9 = 4.7088 + 1.78η
  and the cheapest point u₀ = β₂ − η sits 0.4424 + 2.78η below it (S0);
  at s = 3 the threshold is 5.3333. So the whole legal band (2, β₂] is
  below the threshold at every admissible s, and the "cheapest" point is
  not cheaper in the only currency that turns out to matter.
- **F1 and F2 (`rho-maximal-law.md` §1) fail at every H < Ω(z)**, including
  the per-position form ∀x ∃H: the window starting at r − 1 has T ≤ −1 for
  every H ≤ Ω. **RML(α) fails for every α < 16s/9** through sup|ρ̃| ≥
  (Ω − M)/2, which is above β₂: the named legal target of item 0 cannot be
  true at any sufficient α. **Rider 2's floor th(nP) ≥ log_z Ω → ≥ 16s/9 >
  β₂**: the deliverable band [th(nP), β₂) is asymptotically empty. This
  decides the "two models, neither called" of `rho-maximal-law.md` reading 6
  in the direction of the room closing, not by either model but by a
  construction.
- **Where the counterexample lives.** The pairs (d₁, d₂) = (d′p*₁, d″p*₂)
  have q = d₁d₂ ≈ D^{16/9}·p*₁p*₂ ≈ z^{4.8}, inside yesterday's reduced
  range (z^{u₀−δ}, z^{2s}] and above the window: the reduced arrow of §4.3
  there is exactly where the certificate is negative.
- **What is NOT claimed.** Nothing about G₂(z#) itself moves: a certificate
  failing at one window says nothing about the count of admissible r in
  that window (the measured G₂ exponent stays ~1.5). Nothing about the mean
  square moves (planted windows are a vanishing fraction of the W
  positions; I1 stands). The Gaussian ρ law measured TRUE at z ≤ 37
  (`rho-maximal-law.md` §4) is a finite-z fact in the regime where the
  chains are dormant (Ω(37, 3.0) = 21 against 2 sup|ρ̃| − M = 104.410, S3).

### 4.4 The numbers behind §4.2

**Exact, both s (S3).** Ω(z, 2.698721) = 1, 2, 3, 6, 10, 18, 22, 30, 45, 63,
86, 111, 134, 168, 205, 251 at z = 13..73, log_z Ω from 0 to 1.2878; the
split enumeration reproduces the walked min cc at z = 13..29 (five MATCH
lines), λ⁺(P(z)) = 0 at every level (the D/8 slab is empty: max d/D ≤ 0.24
everywhere, so the two-prime and four-prime chains cannot reach it at these
z), and the maximisers are one band of middle primes with p* = 5 or 7
against the top three to five primes. At s = 3.0, Ω = 1, 2, 3, 3, 3, 9, 21,
36, 63, 100 at z = 13..47 and Ω − M ≤ 2 sup|ρ̃| holds at all seven cited
levels (`ok` at 13..37), the control that ties the enumeration to the
corpus's exact suprema. Against the consumer, Ω/HM reads 6.4e−5 to 3.8e−4
at s = 3 and 2.1e−4 to 4.0e−4 at the cheapest s: three and a half orders
short of a failing window.

**Hill-climb lower bounds (S4a).** Ω ≥ 6.840e2 at z = 89 rising to 2.108e6
at z = 601, log_z from 1.4543 to 2.2757, against z^{u₀}: ratio 3.7e−6 to 6.8e−6, no trend.
The maximisers switch from band splits to interleaved splits at z ≥ 151
(A₁, B₁, A₂ all in the hundreds by z = 601).

**Certified sub-family (S4b).** With the primes above 47 split by index
parity and the best p* ≤ 47 per side, exact counting of 2- and 4-chains
gives Ω ≥ 9.000e4 at z = 601 (control: the family count 300 equals the
exact λ⁺ of the same set, so no chain is double-counted) and 8.863e17 at
z = 5e5, log_z 1.7828 → 3.1493. Four-prime chains take over from z = 2e4
(1.56e5 of 2.29e5 at z = 2e4; all of it at 5e5, where the two-prime family
is empty because p* is capped at 47). The deficit 16s/9 − log_z Ω falls
3.0149 → 1.6485 across 601..5e5, and the bound tracks z^{16s/9}/ln⁸z at
0.012 of it at z = 601 and 0.35 at z = 5e5, rising: consistent with the
Chebyshev-count derivation and its ln⁸ z, and not decisive for it.

**Fits (S5).** ln Ω on ln z: 3.2825 ± 0.1205 on the exact points z = 29..73,
4.1394 ± 0.0898 on the hill-climb points 89..601 (4.1033 ± 0.1272 on
251..601), estimator returning 2.500000 on a synthetic z^{2.5}. The slopes
rise with z, as the corpus records for every sup-type instrument here
(`rho-exact-z31-01.md` §0), and the certified family is what the slope is
rising toward. At s = 3.0 the exact slope over 29..47 is 6.7327 ± 0.5818 on
six points, above the cited sup|ρ̃| slope 2.766 ± 0.212 on 13..37: the
pointwise floor is growing faster than the sup it sits under, as it must if
it is to become the sup.

## 5. The arrow where it can be seen (deliverable d)

**At the cheapest s, exact (S2).** s = 2.698721, H = ⌊z^{4.216450}⌋, full
period, R_H walked directly (no factor 2):

| z | H > W? | sup\|R_H\| | rms(R_H) | sup/rms | log_z(sup/rms) | allowance u₀/2 | log_z F |
|---|---|---|---|---|---|---|---|
| 13 | yes | 3.312 | 1.0567 | 3.134 | 0.4453 | 2.1082 | 2.5865 |
| 17 | yes | 5.996 | 1.9121 | 3.136 | 0.4034 | 2.1082 | 2.4801 |
| 19 | no | 9.649 | 2.4586 | 3.925 | 0.4644 | 2.1082 | 2.3114 |
| 23 | no | 14.334 | 3.1119 | 4.606 | 0.4871 | 2.1082 | 2.2563 |
| 29 | no | 27.971 | 5.8294 | 4.798 | 0.4657 | 2.1082 | 2.1679 |

The recovery the arrow asks for is z^{2.1082}; the measured recovery is
z^{0.40–0.49}, and min_x T runs 2517 → 41384 against HM 2520 → 41411: every
window certifies, by a margin F = (HM−1)/sup of z^{2.59} falling to z^{2.17}.
The z = 13, 17 rows have H > W and are calibration only.

**At s = 3.0, cited (S1).** need − ms = 0.9200 → 1.0765 over z = 13..47
(the rms-currency ask at these z, smaller than the asymptotic 2.1082 because
M and the polylogs bite), truth log_z(2 sup|ρ̃|) = 0.6458 → 1.2874 over
z = 13..37, log_z F = 2.4457 → 1.9394. No exact sup exists at z = 41, 43,
47 (only ⟨ρ̃²⟩; `rho-exact-z31-01.md` §0 prices those walks at 37× to
65,232× the z = 37 cost), so the brief's "z = 13..47" is 13..37 for the
sup and 13..47 for the rms. Margins fall with z at both s, by about 0.42 of
exponent from 13 to 29 at the cheapest s and 0.51 from 13 to 37 at s = 3,
the same drift as yesterday's table.

## 6. Proof gap or truth gap, and the falsifiers

**Proof gap at every computable z; truth gap in the limit, on §4.2.** The
two are not in tension: the exact Ω at z ≤ 73 is three and a half orders
under HM, the certified bound at z = 5e5 is six orders under z^{u₀}, and the
statement REC makes is about all z ≥ z₀, where the construction wins by a
power of z once the deficit 16s/9 − log_z Ω (1.65 at z = 5e5, falling)
drops below 16s/9 − u₀ = 0.5812. What would settle it, and whether it ran:

- **(E2) wrong: a divisor n of P(z) with λ⁺(n) < 0 or λ⁻(n) > 0.** RUN
  exhaustively over all 2^{π(z)} divisors at z = 13..73 (cheapest s) and
  13..47 (s = 3): zero violations. A failure at larger z would break §4.1
  and the standard theory of the Rosser sieve with it.
- **(E4) wrong: a window containing r with T > cc(r) + H − 1.** Cannot
  happen while Brüdern–Fouvry's pointwise inequality holds; checked
  implicitly by the S2 walks (min T ≥ Ω-consistent at five levels).
- **The split enumeration wrong.** RUN: it reproduces the walked min cc at
  z = 13..29 and respects Ω − M ≤ 2 sup|ρ̃| at the seven cited exact levels;
  the certified family at z = 601 equals the exact λ⁺ of its own set.
- **§4.2 wrong: the 4-chain count in the top slab not ≫ D^{8/9}/ln⁴D.** NOT
  proven here beyond the written argument; the certified counts rise from
  0.012 to 0.35 of z^{16s/9}/ln⁸z over 601..5e5 (S4b), consistent and not
  decisive. An adversarial re-derivation of the dyadic-range construction
  (the p* > 4D^{1/27} exit, the two prefix conditions, the parity split) is
  the pass this note is HELD for. The claim needs only Chebyshev-type
  bounds on prime counts in dyadic ranges.
- **A computable failing window.** Would need Ω(z) > z^{u₀}: out of reach at
  any z this producer or the box can hold (the deficit must fall by another
  1.07 exponents from z = 5e5). NOT RUN and not runnable; this is why the
  verdict is asymptotic.
- **Against the item's own instruments.** th(nP) measured 1.5963 → 1.8569 at
  z = 13..31 and ≥ 2.0106 at 47 (`rho-maximal-law.md` §2 rider 2) is
  consistent: nP > Ω ≥ 100 at z = 47, s = 3 (S3), far below the measured
  floor z^{2.0106} = 2.3e3, so the floor is not yet set by the chains.

## 7. Readings

1. **STATED (deliverable a).** REC(1+√e+η, β₂−η): cap-currency ask
   z^{1.030992 + 3η}, rms-currency ask z^{2.1332 − η/2}, exponent bought η;
   M ln²z measured 0.3332 → 0.2715 at z = 13..47 there (S0, S2, S3). The
   brief's z^{1.031} verifies.
2. **PARTIAL (deliverable b).** None of the five routes closes at the
   smaller demand: the cap supplies zero saving at any demand, the union
   route needs a moment of order z/(2.1332 ln z), a factor 1.42 smaller than
   at u₀ = 3 and still divergent, the rest are unchanged. The failing step is
   yesterday's reduced arrow, verbatim.
3. **ZERO (deliverable c).** A mixed mean-square-plus-cap strategy delivers
   the cap on the large moduli, z^{2s − o(1)}, at every split point: with no
   moment above the second the mean square adds nothing at one position.
4. **PROVEN, small, and machine-checked.** cc(r) at a doubly non-rough
   point is minus a sum of three products of exit-chain counts, every
   window containing r has T ≤ cc(r) + H − 1, and so nP > Ω, F1 fails below
   Ω, and sup|ρ̃| ≥ (Ω − M)/2; Ω exact at z ≤ 73 (251 at 73, cheapest s) and
   z ≤ 47 (100 at 47, s = 3), controls all pass (S3).
5. **DERIVED, HELD (deliverable e).** Ω(z, s) ≫ z^{16s/9}/ln⁸z by a dyadic
   four-prime construction, and z^{2s − o(1)} in the limit; then REC is
   false for every u₀ < 16s/9 (4.7088 at s ↓ 1+√e), the cheapest point and
   the whole band with it, RML(α) is false at every α < β₂, and rider 2's
   band is asymptotically empty. Certified lower bounds reach 8.863e17 at
   z = 5e5 (log_z 3.1493), 0.35 of the model and rising (S4b).
6. **MEASURED: proof gap at every computable z.** Ω/HM ≤ 4.0e−4 at z ≤ 73,
   Ω/z^{u₀} ≤ 8.3e−7 certified at z = 5e5; sup/rms at the cheapest s reads
   z^{0.40–0.49} against an allowance z^{2.1082} at z = 13..29 (S2). The
   slopes of ln Ω rise with z: 3.28 ± 0.12 exact (29..73), 4.14 ± 0.09 on the
   hill-climb range (S5).
7. **UNCHANGED.** No exponent moved; RML(α) stays OPEN as a question until
   the adversarial pass on §4.2 runs, at which point the item's named target
   is REFUTED rather than open.

## 8. Not reached, and corrections to the record

Not reached: an exact Ω past z = 73 (3^{π(z)} splits; z = 79 is 3× the
z = 73 cost and z = 89 27×); six-prime chains in the certified family (they
carry the 2s − o(1) limit and are empty below z ≈ 1e5 at this s); the
exact sup|R_H| at s near 1+√e beyond z = 29; a literature citation for the
pointwise size of Rosser weights at smooth integers (standard, not searched
under `SEARCH-CONVENTIONS.md`); the s-dependence of Ω beyond the two values
run; any re-pricing of the u₀ = 3 and u₀ = 4 forms, which §4.3 covers
without new numbers.

Corrections to the record (proposed, no live file edited):

- Brief, deliverable (d): "z = 13..47 where the data exist" — the exact
  sup|ρ̃| exists at z = 13..37 only; 41..47 carry ⟨ρ̃²⟩ alone
  (`rho-exact-z31-01.md` §0, §4.6).
- Brief, deliverable (b): "the position-union route, whose price e^{θ(z)/q}
  may or may not beat z^{1.031}" compares a rms-currency price with a
  cap-currency ask; the union route's ask is z^{u₀/2}, largest at the
  cheapest point (§2 item 2).
- `attack-0829n-rml-proof.md` §5 and reading 6, "proof gap, not truth gap":
  correct at every computable z, and to be read with §4 here for the limit.
- `rho-maximal-law.md` reading 6, "two models, neither called": §4.3 calls
  the room closing, conditional on §4.2 surviving its pass.
- `REFUTED.md`: a candidate row, HELD until the pass: "REC(s, u₀), F1, F2 and
  RML(α) below 16s/9 on the Rosser vector-sieve lattice — REFUTED (planted
  exit-chain window: cc(r) = −(A₁A₂ + A₁B₂ + B₁A₂), T ≤ cc(r) + H − 1,
  Ω ≥ z^{16s/9 − o(1)})".

*Gate: `node research/qc.js --full` result recorded in the closing report;
the producer's tail verifies under `qc/embed.js --check`.*
