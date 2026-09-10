# Attack foldL-05: the direct 0c attack — bounding maxsum_m without counting kills

<!-- ledger
id: Q-foldL-maxsum-direct
status: CLOSED
todo: 0c
question: Can maxsum_m(T_x), plain and residue-deleted, be bounded above by an argument that never counts kills?
verdict: The brief's premise contradicts the corpus's own Bridge Floor (maxsum_k >= maxsum_1 = G2(T_x) for every k), so the bridge cannot convert far enough however good the bound is; all four routes close (R1 partial then closed, R2 tautological and quantitative, R3 busts the budget), and the order-m object is in print, so item 0c's absence sentence has to change.
-->

*2026-08-19. Attack angle 5 of 5 on the fold-multiplier complex, `TODO.md` item
0c verbatim: a proven upper bound on `maxsum_m(T_x)` (plain and residue-deleted)
that is not `G₂` itself, by an argument that never counts kills. Producer:
`research/attack-foldL-05-maxsum-direct.js`, formally embedded
(`node research/qc/embed.js --streams both --timeout 900`), 270.0 s, all
self-tests pass. Legend as in `research/sift-limit-attack.md`: **[PROVEN]**
derived or published theorem; **[VERIFIED]** checked computationally here;
**[MEASURED]** empirical, finite range; **[INFERRED]** deduction from sourced
facts.*

---

## HEADLINE

**The brief's premise contradicts a result this repository already proved, and
the correction has to come first.** The brief opens with *"today's session raised
its payoff: the bridge `L ≤ 1 + max{k : maxsum_k(T_x) ≥ k(2p′−2)}` converts any
maxsum bound directly into a fold-multiplier bound"*. It does convert — and it
cannot convert far enough, for a reason that has nothing to do with how good the
maxsum bound is, and that reason is **already in the corpus**:

> **The Bridge Floor.** `maxsum_k ≥ maxsum_1 = G₂(T_x)` for every `k`, so every
> `k` below `G₂(T_x)/(3p)` satisfies the bridge's inequality and the bridge's
> output is `≥ 1 + ⌊G₂(T_x)/(3p)⌋ ≈ 0.183x` **whatever upper bound on maxsum is
> supplied.** — `research/a3-05-bound-L.md` §7 (*"Theorem B can never prove
> L ≤ 1 + m for any m below G2(T_x)/(3p), no matter how the gap word behaves"*),
> and `research/kappa-not-L.md` §"The wall, located precisely", which adds that
> **Theorem C inherits the ceiling, so redirecting `L` to `κ(m)` does not move
> the wall.** [PROVEN, already in the corpus; re-derived independently here and
> tabulated at the eight exact levels]

So **solving 0c perfectly does not deliver the u-frame through the L-bridge, and
it does not deliver it through κ(m) either.** 0c's value has to be collected
through the copy theorem, which is an identity with index cost zero
(`U-FRAME.md` §5a step 2), and not through `L`, which is where the brief and the
branch keep routing it. **This is the finding this attack ranks first, and the
credit for the argument belongs to A3/A5, not to this run.** What this run adds
is the exact-level table (§3) and the demonstration that a *kill-count-free*
argument lands on exactly the same floor (§4, R3).

**What is new here, and it is one thing.** The threshold-`m` sieve certificate is
**unconditionally available, all-positions, and it amortises**: its overhead over
the truth is *additive*, not multiplicative, so the overshoot falls from 1.94 at
`m = 1` to 1.20 at `m = 8` (`z = 29`), and is **exactly 1.0000 at `z = 13`,
`m = 8`**. That is a proven upper bound on `maxsum_m` which is not `G₂` and which
costs almost nothing beyond the `m = 1` bound the corpus already ran — and its
asymptotic crossover sits at `z^{β₂}·V`, a growing power above where the branch
needs it.

**And two mean-square routes are closed, one of them tautologically.**

| route | verdict |
|---|---|
| R1 certificate at threshold `m` | **NEW, PARTIAL SUCCESS**, unconditional, exact at five levels; **CLOSED as a route to `L`** — crossover in the wrong place by `x^{β₂−1}·ln x` |
| R2 Chebyshev over **alignments** | **NEW, CLOSED, PROVEN, tautologically** — Samuelson forces the exceptional fraction `≥ 1/(p−1) > 1/p` |
| R2 Chebyshev over **positions** | **CLOSED, quantitatively** — `maxsum_m ≤ H` is emptiness, shortfall ~20× per fold; Lemma V's version vacuous by 810× to 3470× |
| R3 residue-deleted / Merge Lemma | **CLOSES into a well-posed recursion** (a genuine fixed point, kill-count free) **and then busts the Overshoot Budget** in ~20 folds; its arithmetic ingredients are A3's, re-derived |
| R4 prior art | see §6 |

**Pre-registration held on three of five.** R1 was rated most likely to yield an
unconditional partial result and did. R2-positions and R3 were predicted to close
with mechanism and did. Two predictions were WRONG and are left visible. **(P1)**
predicted the Merge index cost at `m = 1` to be `≈ 0.55p`, i.e. 6, 7, 9, 10, 13
at the five folds; the self-consistent solution gives **4, 5, 5, 6, 6**, because
the fixed point is reached well below the naive estimate — the recursion is
better than the prediction and still busts. **(P6)** predicted the brief's
per-gap `2p′−2` floor would prove too strong; it is **exactly right** as a
single-gap floor (`2p−2` for `p ≡ 1 mod 6`, `2p+2` for `p ≡ 5 mod 6`), merely
weaker than the `3p` pair rate — and both are A3's qualifying-gap law and
Alternation Lemma, which the disk already held and which the pre-registration
should have checked for before predicting anything.

## 1. THE OBJECT, FIXED

`T_x` is the set of twin slots mod `W_x = x#`, `D_x = ∏_{3≤q≤x}(q−2)`,
`m̄ = W/D`; `maxsum_m(T)` is the largest sum of `m` consecutive cyclic gaps.
Sieve form throughout (`qc/units.js` §5). Every twin slot is `≡ 5 (mod 6)` for
`x ≥ 3` [VERIFIED], so **every gap is a multiple of 6** — a fact §2 turns into a
theorem.

> **The window-count equivalence [PROVEN, VERIFIED].** For half-open windows,
> `min_t #{ slots in [t, t+H) } ≥ m  ⟺  H ≥ maxsum_m(T)`.

*Proof.* (⇐) given `t`, take `s_i` the largest slot `< t`; then
`s_{i+m} ≤ s_i + maxsum_m ≤ t−1+H < t+H`, and `s_{i+1}..s_{i+m}` all lie in the
window. (⇒) if `H ≤ maxsum_m − 1`, the window `[s_i+1, s_i+1+H)` at the extremal
`i` holds only `s_{i+1}..s_{i+m−1}`. ∎ Verified **both directions**, at
`H = maxsum_m − 1` and `H = maxsum_m`, over all `W` positions of `T_3, T_5, T_7,
T_11` for every `m ≤ 6`.

So a bound `maxsum_m ≤ H` **is** an all-positions window-count lower bound at
threshold `m`, with no slack in the translation. That is what makes R1 the right
first move: the sieve certificate speaks exactly this language.

---

## 2. THE KILL-GAP FLOOR — RE-DERIVED, AND IT WAS ALREADY PROVED HERE

This section was run as a fresh derivation before the disk was searched. **It
reproduces `research/kappa-not-L.md` in full and adds nothing to it.** Recorded
because an independent second route to a proven result is custody, and because
the campaign rule (`primeoire-campaign-lessons`) says an absence must check the
disk first — this one did not, and the check is here rather than hidden.

Fold `T_x` by `p`. The kills are exactly the slots in classes `{a, a−2} mod p`
(`U-FRAME.md` §5a step 1). So a kill-gap satisfies `d ≡ 0` or `±2 (mod p)` **and**
`6 | d`, because every twin slot is `≡ 5 (mod 6)` [VERIFIED here]. CRT gives the
cost of each transition exactly [VERIFIED here at `p = 5..43`]:

| transition | `p ≡ 1 (mod 6)` | `p ≡ 5 (mod 6)` |
|---|---|---|
| `a → a` and `a−2 → a−2` | `6p` | `6p` |
| `a → a−2` | `2p−2` | `4p−2` |
| `a−2 → a` | `4p+2` | `2p+2` |

That table **is** `kappa-not-L.md`'s qualifying-gap law
*"{2p−2, 4p+2, 6p} when p ≡ 1 (mod 6), and {2p+2, 4p−2, 6p} when p ≡ 5 (mod 6)"*,
**checked there against brute force at all 302 primes from 5 to 1999** — a range
25× wider than this run's twelve. Its Theorem A (Run Cost) is the pair floor
`6p`; the Alternation Lemma is the two-state walk that forces it; Theorem B is
the bridge; Theorem C carries all of it to `κ(m)`.

The one increment this run produces is the additive constant: maximising the
discount over `k` transitions with `|n₁ − n₂| ≤ 1` gives

> span of `k` consecutive kill-gaps `≥ 3pk − p − 2`,

against `kappa-not-L.md`'s `c_min(k) ≈ 3p(k−1)`. [VERIFIED here at the seven
folds `5→7 … 23→29` for every `k ≤ 24`: never violated; observed minimum single
kill-gap 12, 24, 24, 36, 36, 48, 60 against the floor 12, 20, 24, 32, 36, 44, 56.]
It is an additive constant on a bound whose branch is already settled, so it
changes nothing, and it is recorded at that size.

## 3. THE BRIDGE FLOOR, TABULATED AT THE EIGHT EXACT LEVELS

`L(x,p) ≤ 1 + max{ k ≥ 1 : maxsum_k(T_x) ≥ 3pk − p − 2 }` — A5 Theorem B with
§2's constant [VERIFIED against the true `L` at all seven folds]. And then:

| `x` | `G₂(T_x)` | bridge floor | u-frame need `0.31p/ln p` | floor / need | source |
|---|---|---|---|---|---|
| 11 | 42 | 2 | 1.42 | **1.406** | exact, A144311 |
| 13 | 66 | 3 | 1.57 | **1.909** | exact |
| 17 | 108 | 3 | 1.86 | **1.613** | exact |
| 19 | 150 | 4 | 2.00 | **2.000** | exact |
| 23 | 204 | 4 | 2.27 | **1.759** | exact |
| 29 | 258 | 4 | 2.67 | **1.498** | exact |
| 37 | 528 | 6 | 3.18 | **1.889** | exact |
| 79 | 1710 | 8 | 5.60 | **1.427** | exact |
| 101 | 4292.5 | 15 | 6.78 | 2.211 | model `0.55·θ(x)²` |
| 1009 | 510224.5 | 169 | 45.22 | 3.737 | model |
| 10007 | 5.396e7 | 1798 | 336.79 | 5.339 | model |
| 10⁶ | 5.483e11 | 182779 | 22438.55 | 8.146 | model |

**Read the two halves differently, and the note says so rather than blurring
them.** The eight exact rows are the finding: the bridge's floor is above the
u-frame's need at **every level anyone can compute**, and the ratio has **no
trend** across them (1.406 to 2.000, non-monotone). The model rows add only the
direction, and they inherit `maxgap-law.md`'s caveat that `0.55` is a
whole-period constant with a fitted exponent bracket of 1.3 to 1.9
(`exponent-control.md` §5). **Nothing here proves the divergence; what is proven
is failure at every computable level, plus the algebra
`0.183x / (0.31x/ln x) = 0.59 ln x` that says which way it goes.**

**What is new in this section is the table, not the argument.**
`a3-05-bound-L.md` §7 states the ceiling and its exponent caveat; this run puts
it beside the u-frame's own requirement level by level, which had not been done.

**Consequence for `TODO.md` 0c, stated plainly.** 0c is worth doing, and it must
not be collected through `L`. The bridge is a lossy channel with a floor; the
copy theorem `maxsum_m(T_{x′}) = max_a Δ_m(x,x′,a)` is a lossless channel with
index cost zero (`U-FRAME.md` §5a step 2). Any future 0c work should target
`max_a Δ_m` directly and should not quote a bridge-derived `L` as its payoff.

---

## 4. THE FOUR ROUTES

### R1 — the certificate at threshold `m`. PARTIAL SUCCESS, then closed as a route.

`research/theta-ladder-sup.js` (rewritten today, window from the caller) reports
`minT_H`, the certified all-positions minimum of the vector-sieve count over the
**full period**. By §1, `minT_H ≥ m` **is** `maxsum_m(T_{z−}) ≤ H`, where `z−` is
the largest prime below `z` (the script sieves by primes `< z`). Driven here on a
stride-6 grid (12 at `z = 23`, 48 at `z = 29`), 203 full-period walks:

| `z` | tile | `H_cert/maxsum_m` at `m = 1` | at `m = 4` | at `m = 8` | overhead `H_cert − maxsum_m`, `m = 1..8` |
|---|---|---|---|---|---|
| 13 | `T_11` | 1.4286 | 1.1667 | **1.0000** | 18, 6, 12, 18, 12, 6, 6, 0 |
| 17 | `T_13` | 1.9091 | 1.1538 | 1.1842 | 60, 42, 18, 24, 30, 24, 30, 42 |
| 19 | `T_17` | 1.8333 | 1.5152 | 1.4375 | 90, 78, 102, 102, 150, 132, 132, 126 |
| 23 | `T_19` | 1.7200 | 1.6053 | 1.2857 | 108, 96, 96, 138, 108, 114, 90, 108 |
| 29 | `T_23` | 1.9412 | 1.5517 | 1.2045 | 192, 210, 192, 192, 198, 174, 138, 108 |

> **Statement R1 [VERIFIED, unconditional, all positions].** At `z = 13, 17, 19,
> 23, 29` the two-class vector-sieve certificate proves `maxsum_m(T_{z−}) ≤
> H_cert(z,m)` at every one of the `W = P(z)` positions of the period, for
> `m ≤ 8`, with the values tabulated in the producer's §4.

**The mechanism, and it is the one useful thing this attack found.** The
certificate's cost over the truth is `≈ sup|R_H|/M`, which is **additive** and
grows only slowly with `H`, while `maxsum_m` grows linearly in `m`. So the
threshold-`m` certificate costs **almost nothing beyond the `m = 1` one**: the
`m = 1` certificate is the expensive one, and it is the only one the corpus had
ever run. Where the truth is `528` (`T_23`, `m = 8`) the certificate says `636`;
where the truth is `204` (`m = 1`) it says `396`. **No quantifier price is paid
for the `m` threshold** — the certificate is all-positions by construction, so
the `C^{π(z)}` wall that closed `u_sup` (`sift-limit-attack.md` §7e) is not
re-opened and is not touched: that wall is the price of turning a *mean-value*
estimate into a *sup*, and the certificate never takes that step.

**And it is closed as a route to `L`.** Asymptotically the unconditional
`κ = 2` sieve certifies `N(t) ≫ H·V` for every `t` once `H ≥ z^{β₂+ε}`
(`β₂ = 4.26645028414864191641`, DHR; the two-class assembly is
`covering-dive.md` §"point 3", **[INFERRED from PROVEN ingredients]**). The
threshold-`m` certificate therefore sits at `H ~ z^{β₂}` for every
`m ≤ m* = z^{β₂}·V`, and only above `m*` becomes the linear `maxsum_m ≪ m·m̄`.
The L-bridge needs `maxsum_k < 3pk` from `k ≈ 0.19x/ln x` upward. Measured:

| `x` | 23 | 101 | 1009 | 10007 | 10⁶ |
|---|---|---|---|---|---|
| `m* = x^{β₂}·V` | 2.300e4 | 6.680e6 | 5.655e10 | 5.711e14 | 8.655e22 |
| needed `0.19x/ln x` | 1.394 | 4.158 | 27.717 | 206.419 | 13752.659 |
| `m*/needed` | 1.65e4 | 1.61e6 | 2.04e9 | 2.77e12 | 6.29e18 |

The ratio grows like `x^{β₂−1}·ln x`. **The certificate is in the right language
and at the wrong exponent — the 4.2665-against-2 wall in threshold
coordinates.** The amortisation is genuine and it does not reach.

**Where the certificate's own soundness is checked.** `H_cert ≥ maxsum_m` at all
40 `(z,m)` cells, with equality at exactly one. A single cell below 1 would
falsify the pointwise minorant `Λ₁⁻Λ₂⁺ + Λ₁⁺Λ₂⁻ − Λ₁⁺Λ₂⁺ ≤ θ₁θ₂` that the whole
certificate rests on; none is. (The sandwich itself is machine-verified in
`research/sift-limit-attack.js`, not re-verified here.)

### R2, alignment form — CLOSED, PROVEN, and the closure is tautological.

The copy theorem's quantifier is `max` over the `p` 2-sets. The brief's ask was
exact: *"an almost-all bound survives a max over `p` items if the exceptional
fraction is `< 1/p` — price exactly that."* Priced:

> **[PROVEN, one line].** Samuelson's inequality gives `max − mean ≤ sd·√(p−1)`
> for **any** list of `p` numbers. So the Chebyshev exceptional fraction
> `sd²/(max−mean)²` is `≥ 1/(p−1) > 1/p` **always**. A Chebyshev bound over the
> alignments can therefore **never** be upgraded to the max by a union bound over
> the `p` 2-sets, at any level, for any tile.

[VERIFIED] at all 18 cells tested: `sd²/(max−mean)²` reads 0.1207 to 12.0000
against `1/p` = 0.0345 to 0.0909. The column is `NO` everywhere, by necessity
rather than by accident. **This is not a measurement that came out badly; it is
an identity, and it closes the alignment-averaging idea permanently.**

**What is left of the alignment route, and it is one instrument.** Samuelson
itself, used forwards: `max_a Δ_m ≤ mean_a Δ_m + sd_a·√(p−1)`, exact and
unconditional. NEW here (`sd_a` is not in
`research/attack-0c0e-01-deleted-family.js`, whose min/mean/max this run
reproduces exactly as custody). Priced over 48 `(fold, m)` cells:
**Samuelson/max = 1.0391 to 1.3497**, best at `(17→19, m = 6)`, worst at
`(7→11, m = 2)`. It is never near-tight — `(max−mean)/sd` runs 0.289 to 2.878
against `√(p−1)` = 3.162 to 5.292, so the extremal one-outlier configuration
never occurs. **Verdict: it converts one unproven object (`max_a Δ_m`) into two
(`mean_a` and `sd_a`) at a cost of 4 to 35 percent. Worth recording, not worth
pursuing** — the two new objects are maxima over positions themselves, so nothing
has been quantifier-reduced.

### R2, position form — CLOSED, quantitatively.

Chebyshev at threshold `m` over positions is unconditional and exact here (the
tile's second moment is computed exactly from the pair-distance distribution).
The tile is **under-dispersed**: Fano `Var/mean` = 0.267, 0.350, 0.403, 0.454,
0.501 at `T_7 … T_19` for `m = 1`, and 0.185 to 0.250 at `m = 4`. Chebyshev
over-states the true bad fraction by about 5× (0.25140 against 0.05199 at
`T_19`, `m = 1`).

**None of that is the obstruction.** By §1, `maxsum_m ≤ H` is the statement that
the bad set is **EMPTY**, so the fraction must be pushed below `1/W`, not below
any constant. Measured, `Cheb/(1/W)` = **2.80e1, 4.07e2, 6.12e3, 1.15e5, 2.44e6**
at `x = 7, 11, 13, 17, 19` — about 20× lost per fold, forever. An almost-all
statement over positions is not a partial result on the way to `maxsum_m`; it is
a different quantity, and the gap between them is `W`.

**Lemma V's mean square at threshold `m`, with explicit constants.** The proved
form `⟨R²⟩_H ≤ B(z,s)·H` (`B ≤ 9A²(E−1) = O((log z)^8)`, unconditional,
`history/staging/attack-AB-bounded.md`) gives

> `frac{ x : T_H(x) < m } ≤ B·H/(H·M − m)²`, and with `H = A·m/M` this is
> `A·B/(M·m·(A−1)²)`.

All positions needs that below `1/W`, i.e. `m > A·B·W/(M(A−1)²)`. At `A = 2` and
the measured `B(z,3.0)`:

| `z` | 13 | 19 | 29 | 37 | 41 |
|---|---|---|---|---|---|
| `m` needed | 1.094e5 | 3.357e7 | 1.835e10 | 1.923e13 | 7.562e14 |
| `m/D` | **810** | **1510** | **2310** | **3090** | **3470** |

A threshold above `D` is not a statement about the tile at all. **The
almost-all/all gap is `W`, and Lemma V's mean square does not begin to pay it —
by three orders and widening.** This reproduces, in threshold coordinates,
`attack-beta2-01`'s own verdict that *"the almost-all exponent is 0"* and
`sift-limit-attack.md` §7e's *"almost-all is not the currency this problem trades
in"*.

**And the u-frame's "average" is over FOLDS, not positions.** `gate-multiplies.md`
§8's threshold `L ≤ 0.19–0.31 p/ln p` is stated *"on average over the ladder"* —
the average runs over levels `p ≤ x`, and **each level's term still needs the
worst position at that level**. So there is no averaging slot for an
almost-all-positions statement to fill. That is the precise gap the brief asked
for, and it does not close: the chain is
`almost-all positions → (needs emptiness, gap W) → worst position at level p →
(averaged over p) → the u-frame`, and the failure is at the first arrow.

### R3 — the residue-deleted structure. CLOSES, then busts the budget.

§2 inverted is the kill-count-free inequality the brief asked for: a
window of span `S` holds at most `1 + ⌊(S+p+2)/(3p)⌋` kills, so

> `S := maxsum_m(T_p) ≤ maxsum_{ m + 1 + ⌊(S+p+2)/(3p)⌋ }(T_x)`,

an implicit inequality in `S` alone, with no kill count anywhere.

**It closes.** [VERIFIED] the least fixed point above `maxsum_m(T_x)` exists at
every cell tested, reached in a few iterations, at index 4 to 13 — no runaway.

**And then it busts.** Cost against the truth: 1.3077 to 2.0909, i.e.
**0.2683 to 0.7376 nats per fold**, against a per-fold replenishment
`2 ln(p/x)` of 0.2225 to 0.9040 nats. At `m = 1` the burn exceeds the
replenishment at **three of the five folds** (0.7376 vs 0.3341; 0.4700 vs
0.2225; 0.3857 vs 0.3821). The **LIFETIME** Overshoot Budget is 0.88 to 1.19
nats in total (`gate-multiplies.md` §5), so the chain is exhausted inside about
twenty folds. *(Note the definitional difference: "burn" here is
`ln(bound/truth)` per fold; `gate-multiplies.md` §8's burn is
`ρ·m̄·L/G₂`. The two are not the same number and are not compared.)*

**Why it cannot be repaired, in one line.** The index cost per fold is
`⌊(S+p+2)/(3p)⌋ ≈ G₂/(3p) ≈ 0.183p` — the Bridge Floor again, in its other
costume. The `3p` of §2 is the *worst-case* kill spacing; two of every `p`
slots are killed, so the *average* kill spacing is `p·m̄/2`, which is `406.8` at
`T_23 → 29` (`m̄ = 28.054`) against the worst case `3p = 87`. The over-count factor is `m̄/6`, which
is `4.68` at `T_23` and grows like `ln²p`. **A kill-count-free argument pays for
being kill-count-free with exactly that factor**, and it is the same
`ln p`-shaped deficit the branch has met at every entrance.

---

## 5. THE SINGLE BEST SURVIVING STATEMENT

> **Theorem candidate (threshold-`m` certificate).** Let `z ≥ 3`, let `T` be the
> set of `r` with `r` and `r+2` coprime to `P(z) = ∏_{p<z} p`, and let
> `V = ∏_{p<z}(1 − 2/p)` for odd `p` (times `1/2` at `p = 2`). Then for every
> `m ≥ 1`,
>
> > `maxsum_m(T) ≤ C · max( z^{β₂+ε}, m/V )`,
>
> with `β₂ = 4.26645028414864191641` the dimension-2 sifting limit and `C, ε`
> absolute.
>
> **Hypotheses, all of them.** (i) The Diamond–Halberstam two-dimensional
> lower-bound sieve at `κ = 2` [PROVEN, Cambridge Tracts 177, Table 17.1].
> (ii) Trivial interval remainders at level `H^{1−ε}`, uniform in window
> position [PROVEN, this corpus, `beta2-note` §3]. (iii) The assembly of (i)+(ii)
> into a two-class Jacobsthal-type bound, which is folklore-available and
> **unwritten** [INFERRED from PROVEN ingredients, `covering-dive.md` §"point 3",
> absence sourced]. (iv) Nothing conditional: no EH, no GRH, no maximal law, no
> quantifier trade — the certificate is all-positions by construction.
>
> **What is new here.** The `m` in the statement. The corpus had only the `m = 1`
> case. The `max` says the threshold-`m` bound equals the `m = 1` bound for every
> `m ≤ z^{β₂}·V` — a saving of a full factor `m` over the trivial `m·G₂` — and
> becomes linear in `m` above it.
>
> **Exact support** [VERIFIED, no hypotheses at all]: the full-period certificate
> at `z = 13..29` gives `H_cert/maxsum_m` falling from 1.43–1.94 at `m = 1` to
> 1.00–1.29 at `m = 8`, with additive overhead.
>
> **Why it does not close the branch.** Its crossover `m* = z^{β₂}·V` exceeds the
> L-bridge's needed `0.19z/ln z` by 1.65e4 at `z = 23`, growing like
> `z^{β₂−1}·ln z`.

---

## 6. R4 — PRIOR ART

The order-`m` object is the natural generalisation of the Jacobsthal function
("smallest `H` such that every `H` consecutive integers contain at least `m`
coprime to `n`"). `SEARCH-CONVENTIONS.md` §1 owns the `m = 1` case in three
conventions (A144311 for the two-class primorial object; A048670 for the
one-class one; MathOverflow 88323 for the general framing). **The order-`m`
question was run in this session as a separate owning-convention search; its
result is recorded in §6a below and must be read before any "absent" sentence
about `maxsum_m` is written anywhere in the corpus.**

Boundary check the brief asked for, and it holds: Holt's machinery is bounded by
spans `< 2p_{k+1}` throughout (`LOCALIZED-GAP.md` §9, quoting arXiv:2603.25915
§1) and never bounds a maximum gap. That restriction is about the *span*, not
about the *threshold*, so it applies to `maxsum_m` for every `m` exactly as it
applies to `maxsum_1`: any `maxsum_m` at full-tile scale is `≫ 2p`, hence outside
their range. **The boundary is confirmed to carry over.**

### 6a. The order-`m` object IS in print, and 0c's absence sentence has to change

**PRESENT.** Fintan Costello and Paul Watts, *An upper bound on Jacobsthal's
function*, **Math. Comp. 84, no. 293 (2015) 1389–1399**, MR3315513,
DOI S 0025-5718(2014)02896-2, preprint [arXiv:1208.5342](https://arxiv.org/abs/1208.5342).
Their §2 defines our object **in the inverse indexing** — exactly the convention
flip `SEARCH-CONVENTIONS.md` §2 warns about:

> `π(b, m, i)` = the number of integers `b+1, …, b+m` coprime to `P_i`;
> `π_min(m, i)` = the lowest value of `π(b, m, i)` across all `b`.

and their abstract states it in words: *"π_min(m, k) … represents the smallest
number x such that every sequence of m consecutive integers contains at least x
integers coprime to P_k."* That is §1's `min_t N([t, t+H))`, and
`π_min(m,k) ≥ x ⟺ maxsum_x ≤ m`. **The owning convention for `maxsum_m` is
`π_min`, and this repository had no row for it.**

Their Theorem 4.4 lower-bounds `π_min(m,k)` for **all** `m` and `k`. Two limits
matter for us: (i) it is a **recursion evaluated by PARI**, not a closed form,
and **no asymptotic in `m` is stated anywhere**; (ii) the authors only ever use
it at the `m = 1` threshold (`0 < π_min(m,k) ⇒ h(k) ≤ m`), giving
`h(k) ≤ 0.27749612254 k² log k` for `50 ≤ k ≤ 10000`. **Values of `π_min(m,k)`
for `m > 1` appear nowhere in print**, and the paper has only 2 citing works
(Mercer, INTEGERS 18 (2018) #A26; Ziller, arXiv:2007.01808), neither taking
`π_min` up for `m > 1`. **One class per prime, primorials only.**

**The near-hit is withdrawn, and the search run refuted it independently.**
Costello–Watts, *Jacobsthal's function and a generalisation of Euler's totient*,
[arXiv:1209.3464v1](https://arxiv.org/abs/1209.3464) (2012), Theorem 2.3, is the
closed-form order-`m` bound one would want — `m·φ(Q_k)/Q_k ± k(k+1)/2` — which
would give `maxsum_m ≤ (m + k(k+1)/2)·n/φ(n)` directly, and at `m = 1` would beat
Iwaniec by a log with an explicit constant. **That is the tell, and it is
withdrawn**: the arXiv record carries *"This paper has been withdrawn due to an
error on page 6"*, zbMATH carries it as `WITHDRAWN`, and the search run located
the error (page 6 asserts `⌊φ(Q_{i−1})·m/(Q_i q_j)⌋ ≤ φ(b, F, Q_{i−1})` where the
valid chain gives only `φ(Q_{i−1})·⌊m/(Q_i q_j)⌋`) and refuted the conclusion by
exhaustive computation: at `k = 11`, `b = 100279391410`, `m = 1707309`, the
deviation is **66.146264 > 66 = k(k+1)/2**. Do not resurrect it.

**Erdős 1962 does not contain the object.** Read in full from the primary PDF
(users.renyi.hu/~p_erdos/1962-12.pdf). He defines `g(n)` (order 1), `C(r) =
max g(n) − 1` over `ω(n) = r`, and a two-argument object `φ_n(x, x+B)` which is
the **counting function**, not a Jacobsthal-type minimum; he never inverts it and
never bounds `min_x φ_n(x, x+B)`. His Theorem III is an **averaged** statement
with an exceptional set of `ηn` positions — the wrong quantifier, exactly as §4's
R2 says. That averaged line is owned by Hooley (Acta Arith. 8 (1963) 343–347) and
Montgomery–Vaughan (*On the distribution of reduced residues*, Ann. of Math. (2)
**123** (1986) 311–333), all averaged over `q` or `x`, none worst-case.

**Two-class order-`m`: ABSENT**, and it compounds `covering-dive.md` §2.2's
existing absence rather than contradicting it. Ziller–Morack (1706.00317,
1706.03668), Ziller (1903.11973, 2007.01808), Kalmynin–Konyagin (2302.00459),
Paseman (1311.5944) grepped in full-text PDF for "at least k/m/two integers",
"π_min", "order": zero hits in all.

**Channels and calibration** (all in one session, all calibrated): arXiv API
(https only; `abs:"Jacobsthal function"` → 16 entries), MathSciNet `mrlookup`
(`au=Iwaniec&ti=Jacobsthal` → MR499895), zbMATH Open (`ti: Jacobsthal` → 324
records), OpenAlex (`title.search:Jacobsthal` → 62 works), WebSearch. The
decisive query was WebSearch on *"Jacobsthal function" generalization "at least
k" integers coprime to n consecutive integers upper bound* — **an
owning-convention query, not a house-vocabulary one**, which is the whole point.

**Residual gaps, stated so they are not read as coverage.** Iwaniec, Demonstratio
Math. 11 (1978) is still not obtainable; Kanold 1967 was assessed from the zbMATH
review rather than the GDZ full text (`PPN=GDZPPN002297787`); **Kanold 1975 and
Kanold 1977** (*Neuere Untersuchungen über die Jacobsthal-Funktion g(n)*,
Monatsh. Math. 84, 109–124) have no zbMATH reviews and **were not read** — the
one place a German-language order-`k` variant could still hide. Books remain
unsearchable.

### 6b. WHAT THIS OBLIGES THE CORPUS TO CHANGE (not done here — staging only)

1. **`TODO.md` item 0c's sentence** *"nobody has tried bounding the residue-deleted
   maxsum directly. That 'nobody' is this repository, not the literature"* is
   still true for the **two-class** object and is now **wrong as a blanket
   statement about `maxsum_m`**: the one-class order-`m` object has a published
   upper-bound machine.
2. **`SEARCH-CONVENTIONS.md` §1 needs a row**, and its absence is why five waves
   could not reach this:

   | object | our name | **OWNING convention — search THIS** | where it lives |
   |---|---|---|---|
   | order-`m` max span of `m` consecutive survivor gaps | `maxsum_m` | **`π_min(m, k)`**, *"the smallest number x such that every sequence of m consecutive integers contains at least x integers coprime to P_k"* | Costello–Watts, Math. Comp. **84** (2015) 1389–1399 |

3. **`covering-dive.md` §2.2** records Costello–Watts 2015 inside the 82 titles of
   the Iwaniec citation graph and triaged it as *"a one-class `h(k)` bound"*.
   That triage is correct about the paper's **conclusion** and missed its
   **machinery**: `π_min` is invisible from the title. Worth a sentence there,
   because it is the exact shape of failure that file exists to prevent.

---

## 7. WHAT THIS ATTACK DID NOT REACH

- **`T_29` alignments beyond `m = 8`, and `T_29 → T_31`.** The fold `23→29` is
  the deepest alignment family computed here; `29→31` needs the streaming
  technique of `research/gate-multiplies-03.js` and was not run.
- **A stride-1 certificate scan at `z = 29`.** The grid there is stride 48
  (14 full-period walks at 11 s each). `H_cert` at `z = 29` is therefore the true
  threshold rounded up by at most 47. The rounding is relatively *larger* at
  large `m`, so it understates the amortisation rather than manufacturing it.
- **`z = 31` and above.** `W(31) = 6.47e9`; one walk is minutes. The
  `theta-selfconsistent.md` run reached it for `m = 1` only.
- **A proven bound on `mean_a Δ_m` or `sd_a Δ_m`.** Samuelson needs both and
  neither was attacked.
- **The `κ(m)` coordinate is NOT open** — it was listed as unreached in a draft
  of this note and that was wrong. `kappa-not-L.md`'s Theorem C already transfers
  the ceiling to `κ(m)`: *"Theorem C inherits the ceiling, so redirecting L to κ
  does not move the wall."* Nothing here needs to be run.
- **The threshold-`m` certificate against `κ(m)` rather than `L`.** R1's
  amortisation was priced against the L-bridge only. Whether it pays anywhere in
  the `κ(m)` formulation was not asked.

---

## 8. REPRODUCTION AND CUSTODY

```
node research/attack-foldL-05-maxsum-direct.js        # 270 s, 203 full-period walks
node research/qc/embed.js --streams both --timeout 900 research/attack-foldL-05-maxsum-direct.js
```

Custody, all inside the run: `D(T_x) = ∏(q−2)` and the `G₂` ladder
6, 12, 30, 42, 66, 108, 150, 204 reproduced from a generator that never sieves;
the same eight terms cross-checked against **OEIS A144311 + 1**; the copy theorem
`max_a Δ_m = maxsum_m(T_p)` re-verified for `m ≤ 8` at five folds; and
`min_a/mean_a/max_a` reproduce `research/attack-0c0e-01-deleted-family.js`'s
embedded table figure for figure. All self-tests pass.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in
[../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
