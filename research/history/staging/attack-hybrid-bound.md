# Attack G (rerun): the hybrid bound — exact head, sieved tail

<!-- ledger
id: Q-hybrid-bound
status: CLOSED
todo: none
question: Does an exactly-handled head of small primes plus a sieved tail improve the certified exponent?
verdict: The glue closes and is a real theorem, and it buys one factor of 1.93 in x and nothing asymptotic: the window where the bound beats 4.2665 widens from x <= 227 to x <= 439 and never returns, the head can only reach x0 = O(ln x), and the literal glue the brief named (A144311 as base case) is dead on a type mismatch.
-->

**Producer:** `research/attack-hybrid-bound.js` (no arguments, ~25 s, exit 0,
run 2026-08-18). Every number below is in that file's `OUTPUT` block.

---

## Headline

The glue closes, it is a real theorem, and it buys **one factor of 1.93 in x
and nothing asymptotic**.

> **Theorem HY [VERIFIED — proof in the script banner, evaluated in §B].**
> Work in slot coordinates (`j ↔ 6j+5`; prime `p` kills `j ≡ r_p` and
> `j ≡ r_p − s_p (mod p)`, `s_p = 3⁻¹ mod p`, `r_p` free — the covering
> formulation of `two-class-lower-bounds.md` §1). Fix `5 ≤ x₀ ≤ x`, put
> `H = {p : 5 ≤ p ≤ x₀}`, `T = {p : x₀ < p ≤ x}`, `Q = ∏_{p∈H} p`, `n_T = |T|`,
> and for odd `m`
> `A_m = Σ_{j≤m} (−1)^j e_j({2/p}_{p∈T})`, `B_m = Σ_{j≤m} C(n_T, j) 2^j`.
> If `A_m > 0`, then no admissible choice of two-class pairs over the primes
> `5..x` covers `[1, L]` for any `L > Q·(B_m/A_m + 1)`.

Writing `β_hy(x) = min_{x₀, m} ln(6·Q·(B_m/A_m + 1)) / ln x`, in the same
convention `sift-limit-attack.md` §7 uses for `β_pure`:

| | pure Brun `β_pure` | hybrid `β_hy` |
|---|---|---|
| beats 4.2665 up to | **x = 227** | **x = 439** |
| first loss | x = 229 | x = 443 |
| returns? | never | never (5972 further primes swept to x = 60000) |
| x = 101 / 1009 / 10⁵ / 10⁶ | 3.983 / 5.383 / 8.418 / 8.878 | 3.408 / 4.655 / 6.501 / 7.303 |

**Is it worth having? Read §5 before answering — the short version is: as a
remark, yes; as a theorem, no.** At the crossover the whole improvement is a
factor of **1.27** in a bound already **6.8 orders of magnitude** above the
measured truth.

---

## 1. What the glue is, and why it is not a case split

The brief distinguishes the trivial glue ("below `X₀` use the certificate,
above it use the sieve") from the non-trivial one that feeds the finite result
*into* the asymptotic argument. HY is the second kind, and the mechanism is
one line: **the head-survivor set is a union of `K = ∏_{p∈H}(p−2)` residue
classes mod `Q`, and on each such class `a + Qt` the tail primes act as an
ordinary two-class sift in `t`**, because `Q` is invertible mod every `p ∈ T`.
So Brun's truncation applies verbatim to a line whose head is already handled
exactly, with no head terms in `A_m` or `B_m` at all.

The head therefore enters through **one number**, `Q = e^{θ(x₀)}`, and through
nothing else. HY is a single inequality with `x₀` a free parameter, valid at
every `x`: **uniform, not a case split.** What *is* a case split is the
comparison against 4.2665 — `min(β_hy(x), 4.2665)` improves the exponent only
on `x ≤ 439` — but that is a statement about which of two bounds is smaller,
not about HY's form.

`β_hy ≤ β_pure` at every `x` by construction (`x₀ = 0`, the empty head, is in
the sweep), so the glue never loses.

---

## 2. The measured result

Section B of the script. `x₀*` is the optimal head, `m` the Bonferroni depth.

| x | `β_pure` | `x₀*` | m | `θ(x₀*)/ln x` | `β_hy` | gain |
|---|---|---|---|---|---|---|
| 13 | 2.806 | 5 | 1 | 0.627 | 2.484 | 0.322 |
| 101 | 3.983 | 5 | 3 | 0.349 | 3.408 | 0.575 |
| 227 | 4.253 | 7 | 3 | 0.655 | 3.709 | 0.544 |
| **439** | 5.202 | 11 | 3 | 0.978 | **4.227** | 0.975 |
| 443 | 5.210 | 13 | 3 | 1.398 | 4.278 | 0.932 |
| 1009 | 5.383 | 7 | 5 | 0.514 | 4.655 | 0.728 |
| 10⁵ | 8.418 | 13 | 7 | 0.740 | 6.501 | 1.918 |
| 10⁶ | 8.878 | 23 | 7 | 1.262 | 7.303 | 1.575 |

Custody: section A recomputes `β_pure` from scratch and returns
2.80, 3.98, 4.25, 5.38, 8.88 at x = 13, 101, 199, 1009, 10⁶ and the crossover
227 / 229 — the published values of `sift-limit-attack.md` §7, digit for digit,
so the hybrid column is comparable to a number already in the corpus.

---

## 3. Why there is no asymptotic gain, measured rather than asserted

**The cap is the primorial.** The crude "one error per residue class" is the
only bound available for a `Q`-periodic set inside a window shorter than `Q`,
so exactness over `H` costs `Q = e^{θ(x₀)}` — exponential in the head's reach.
Requiring the head price alone to stay under a bounded exponent forces
`θ(x₀) ≤ β·ln x`, hence `x₀ = O(ln x)`. Measured (§D2): `x₀*/ln x` = 1.08,
1.01, 1.85, 1.13, 1.66 across x = 101 … 10⁶, with no drift.

**The head can only reach a vanishing share of the Mertens mass.** The depth is
set by `W_T = Σ_{p∈T} 2/p`; primes below `O(ln x)` carry `2 lnlnln x + O(1)`
against the `2 lnln x + O(1)` of all primes to `x`. The removable fraction is
`lnlnln x / lnln x → 0` **[INFERRED, from `x₀ = O(ln x)`]**. Over the accessible
range it has not turned over: measured 0.204 → 0.324 across x = 101 … 10⁶,
which is what that ratio looks like below 10⁶ and is flagged rather than read
as growth.

**The floor that makes it a divergence.** `B_m ≥ C(n_T,m)2^m ≥ (2n_T/m)^m`, and
`A_m ≤ δ_T ≤ 1` because an odd-order Bonferroni truncation under-counts
(checked at every row, §D3). So `β_sieve ≥ m₀·ln(2n_T/m₀)/ln x`, where `m₀` is
the first admissible depth. Measured floor against achieved: 1.775/3.059,
3.029/4.141, 4.813/5.761, 5.076/6.041. With `m₀/W_T` climbing (1.92 → 2.52 over
the range, toward the 3.594 that `attack-beta2-05` (E2) verifies exactly to
`W = 1024`), the floor grows like `W_T` and `W_T` loses only `lnlnln x` to the
head. **`β_hy` diverges at the same leading rate as `β_pure`**; the glue moves a
`lnlnln x` term, not the `lnln x` one **[INFERRED]**.

**The gain is a staircase, not a curve.** §D1, at x = 10⁶: removing 11 and
removing 23 each cut the depth by 2 and pay net +1.186 and +0.946 of exponent;
every other head prime pays between −0.075 and −0.281. Cost `ln p/ln x` is
smooth; gain only arrives at a depth drop. That is why `x₀*` jumps around
(5, 7, 11, 13, 17, 19, 23) instead of tracking a smooth optimum.

---

## 4. The literal glue the brief named — A144311 as base case — is dead, on a type mismatch

The brief's DP3 slot wants the *certified finite bound* used as the base case.
Done in §C, and it fails for a reason worth recording.

A head certificate is **order** information: A144311 says the head cannot cover
`m₀` consecutive slots, so every window of `m₀+1` slots holds a head survivor
and `[1,L]` holds at least `⌊L/(m₀+1)⌋` of them. Bonferroni cannot consume that
— it needs counts in arithmetic progressions, i.e. **congruence** information —
so a gap bound can only be spent against the Theorem P union count of
`attack-beta2-05`, which needs `1/(m₀+1) > W_T`.

Measured: at every `x₀` from 11 to 79, the **first** tail prime alone already
exceeds the budget. At `x₀ = 79`: `1/(m₀+1) = 3.509e−3` against `2/83 = 2.410e−2`.

| x₀ | 11 | 23 | 43 | 79 |
|---|---|---|---|---|
| largest x reached | 11 | 23 | 43 | 79 |

The route admits **not one further prime** at any level. It buys strictly
nothing beyond the exact term it starts from.

This is `sift-limit-attack.md` §7c's wall seen from the other side. There the
dilation was an isomorphism of *congruence* structure and not of *order*, and
the sieve was asking an order question. Here the certificate carries *order*
and the sieve is asking a congruence question. Same mismatch, opposite
direction.

---

## 5. What a finite-range improvement buys, and what it does not

Attack E measured the object: `G₂(x#) ≈ 0.762 x ln²x lnln x` over x = 11..79
**[MEASURED]**, pure power law excluded by 10.6 AICc units
(`history/staging/attack-growth-law.md`). That changes what counts as a win
here, so, head on:

§E of the script, with the sieve side idealised at constant 1 — the convention
§7 already uses for `β_pure`, and the reason the last column is a floor on the
sieve's real weakness rather than the sieve's actual bound:

| x | exact `G₂` | law `0.762 x ln²x lnlnx` | hybrid certificate | log₁₀(cert/truth) | log₁₀(x^4.2665/truth) |
|---|---|---|---|---|---|
| 13 | 66 | 6.14e1 | 5.85e2 | 0.9 | 2.9 |
| 79 | 1710 | 1.70e3 | 2.24e6 | 3.1 | 4.9 |
| 101 | — | 2.51e3 | 6.77e6 | 3.4 | 5.2 |
| 227 | — | 8.61e3 | 5.47e8 | 4.8 | 6.1 |
| 439 | — | 2.24e4 | 1.48e11 | 6.8 | 6.9 |

**Is it a theorem worth writing down?** As a remark in the covering section,
yes. As a theorem of its own, no. It is elementary — the head-survivor line is
a two-class sift and Brun applies to it unchanged — and no novelty is claimed
for the move.

**What would it let the corpus claim that it cannot claim today?** Only this:
*the covering economy's unconditional window against 4.2665 runs to x = 439,
not x = 227.* Nothing else. It does not touch the asymptotic exponent, it does
not touch `β₂`, it does not touch any statement about `G₂`'s growth law, and it
does not touch the twin wall.

**Is the glued statement uniform or a case split?** HY itself is uniform (§1).
The *improvement over 4.2665* is a case split on `x ≤ 439`.

**And the honest arithmetic on the window.** Exact terms run to x = 79, so the
only range where HY is simultaneously the best available bound and the truth is
unknown is `(79, 439]`. In that range the bound is wrong by 3.4 to 6.8 orders
of magnitude, and attack E's law already describes the object to within a
factor of about two. At the crossover itself the improvement is
`1.880e11 / 1.479e11 = 1.27` — a 21% cut in a bound seven orders of magnitude
too large.

**Verdict: the glue buys little.** It is worth one paragraph in
`sift-limit-attack.md` §7 updating "227" to "439 with an exact head", and it is
worth the §4 negative, which is the more durable half.

---

## 6. Regress, and whether the range grows with effort

**No regress.** §7c killed exact strata because exactness at level `j` needs
the upper sieve function of a dilated tile at level `j−1` — it terminates at
every finite `z` and at no uniform `z`. HY has no recursion and no re-entry: it
is one closed-form inequality. It escapes the regress precisely *because* it
buys exactness at one scale outright and pays cash (`θ(x₀)`) rather than
borrowing. Bounded price, bounded gain — the two are the same fact.

**The range does not grow with effort.** §F: the certificate at x = 439
evaluates in under a millisecond. There is no search to deepen and no ladder to
extend. `x = 439` is where `θ(x₀)` overtakes the depth saving, not where the
compute ran out. The brief's target shape — "certified below `x^{4.2665}` for
all `x ≤ N`, with `N` reachable by `C` hours of compute" — **is not the shape of
this result**: `N` is closed form and `C` is zero.

---

## 7. One methodological note on the head price

§G exists because the head price *is* the result. Pricing the head at
`3^{π(x₀)}/∏(1−2/p)` instead of at `Q` under-prices it by 1.83e1 at `x₀ = 13`,
3.27e4 at `x₀ = 29`, and **1.89e19** at `x₀ = 79`, because `θ(x₀) ~ x₀` while
`1.0986 π(x₀) ~ 1.0986 x₀/ln x₀`. Any hybrid whose head cost grows slower than
the primorial is not bounding the CRT error of a `Q`-periodic set inside a
window shorter than `Q`, and no such bound exists. The distinction decides
whether the crossover is 439 or a number in the tens of thousands.

---

## Draft CHANGELOG entry (not applied — this agent may not edit CHANGELOG.md)

> **2026-08-18 — the hybrid bound: exact head, sieved tail (attack G rerun).**
> `research/attack-hybrid-bound.js`; write-up
> `history/staging/attack-hybrid-bound.md`. Theorem HY glues an exactly-handled
> head of primes onto Brun's truncated tail: the head-survivor set is
> `∏(p−2)` classes mod `Q = x₀#`, and on each class the tail acts as an ordinary
> two-class sift, so no head term appears in `A_m` or `B_m`. Uncoverable for
> `L > Q(B_m/A_m + 1)`. It widens the covering economy's window against 4.2665
> from **x ≤ 227 to x ≤ 439** (first loss 443, never returns to x = 60000) and
> gains 0.29 to 2.01 of exponent over `β_pure` across x = 13..10⁶, but does not
> change the divergence rate: exactness costs `e^{θ(x₀)}`, so the head reaches
> only `x₀ = O(ln x)` (measured `x₀*/ln x` = 1.01 to 1.85) and removes only
> `lnlnln x` of the `lnln x` Mertens mass that sets the Bonferroni depth. The
> literal "A144311 as base case" glue is **dead on a type mismatch**: a
> certificate is order information, Bonferroni needs congruence information, and
> spent against Theorem P the certificate admits not one further prime at any
> `x₀` from 11 to 79. Verdict: worth updating §7's "227" to "439"; nothing else.
> At the crossover the improvement is a factor 1.27 in a bound 6.8 orders of
> magnitude above attack E's measured law.

---

## Suggested edit to `research/sift-limit-attack.md` §7 (not applied)

The sentence "It **beats 4.2665 for x ≤ 227**, loses from x = 229, never
returns" should gain: "An exactly-handled head of primes below `x₀` replaces
the head's Bonferroni terms at a cost of `x₀#`, which widens that window to
`x ≤ 439` (`attack-hybrid-bound.js`) and changes nothing asymptotic: the head
can only reach `x₀ = O(ln x)`."
