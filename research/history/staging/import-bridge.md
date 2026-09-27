# Importing Ojaroudi's two elementary lemmas: both are true, and the chain buys nothing

<!-- ledger
id: Q-import-bridge
status: CLOSED
todo: none
question: Do Ojaroudi's Bridge and collision lemmas certify a number the corpus lacks?
verdict: Both lemmas are true and both proofs go through in three lines here, and the answer to the question the import was raised for is no: the certified-number verdict is zero by an identity rather than by a margin, and the per-prime nature is what stops it.
-->

**2026-08-19. Pre-registered at [import-bridge-prereg.md](import-bridge-prereg.md),
committed alone before either producer was written. Producers:
`research/import-bridge-01-verify.js` (101.7 s) and
`research/import-bridge-02-experiment.js` (23.6 s), both embedded by
`research/qc/embed.js`.**

`history/staging/ojaroudi-read.md` §6(d) named two elementary lemmas as importable:
the Bridge inequality and the universal collision bound. Both are proved here in our
own notation, both are verified on real tiles, and the answer to the question the
import was raised for is **no**.

---

## 0. Headline

- **Both lemmas are true and both proofs go through in three lines.** No repair needed
  on the Bridge. The collision bound's stated hypotheses (`ℓ` squarefree,
  `(ℓ, F_{i+1}) = 1`) are **not used by its own proof** and can be dropped; verified
  on 56 deliberate violations of them, zero failures.
- **The Bridge is not an `L²` → `L^∞` conversion.** Its left side is an aggregate over
  `2(p−1)` residue classes, not a sup. Run the identical proof with the block index
  restricted to one value and it collapses to `√(D_x(q))`, which is
  `research/level-ledger-tight.md` §4(a)'s Parseval sup route, already ours. The read's
  §6(d) sentence "converts … directly into a **pointwise** bound" overstates it, and
  that correction is the main thing this pass returns to the read.
- **Certified-number verdict: zero, and the reason is an identity, not a margin.**
  `BRIDGE_cert / TRI = √(q/(p−1))`, confirmed to `8.88e-16` over 280 `(x,q)` pairs, and
  every admissible `q` satisfies `q ≥ p`. The only certified `L²` input the corpus owns
  is the Level Ledger's own sup applied `q` times, so feeding it back through
  Cauchy–Schwarz cannot recover what Cauchy–Schwarz gave away. The chain is **circular**,
  not merely weak.
- **Even the strongest plausible `L²` input loses from `x = 17` on.** The binomial
  ceiling `D_x(q) ≤ D` — measured true at every cell here, proven nowhere — fed through
  the Bridge gives 8.49, 24.49, 80.50, 308.29, 1266.41, 5772.64, 29843.65 against the
  incumbent `TRI` = 22.80, 61.43, 159.43, 461.89, 974.27, 2376.52, 9069.43 at
  `x = 5 … 23`. It wins at the four smallest levels and loses at the three largest, and
  the crossover is permanent: `TRI` grows like `3^{π(x)}` and `2√((p−1)D)` like `√W`.
- **Slack: 20× to 160× the truth, not the 3× the read's 0.31 suggested.** The median
  `BRIDGE/TRUE` is 12.99, 32.76, 42.03, 82.14, 148.28, 93.63, 163.66 at `x = 5 … 23`.
  His 0.31, which reproduces here to the digit, is the best case at the smallest level.
- **The rider is verified and sharpened.** `Σ ℓ D_x(ℓ)` does diverge, and forced 0/1
  occupancy does force it, but the onset is governed by `|T_x|` and not by `F_i`: the
  binomial line is reached persistently at `L ≈ 10 D_x`, which is `0.4363 W` at `x = 17`
  and falling.

---

## 1. The two lemmas in our notation

Fix a level `x` (a prime, or `x = 3`). `W = x#`;
`T_x = {r mod W : r ≢ 0, −2 (mod q) ∀ q ≤ x}` is our twin-slot tile;
`D = |T_x| = ∏_{3≤q≤x}(q−2)`; `p` is the least prime above `x`, the **fold** prime.
The fold replicates `T_x` into blocks `a + bW`, `0 ≤ b ≤ p−1`, and deletes from block
`b` the **kill classes** `{a_p, a_p − 2}` with `a_p = −bW mod p`. His `T_i` is `T_x`,
his `F_i` is `W`, his `p_{i+1}` is `p`, his `|T_i|` column is our `D_x` to the digit.

The **lift** is the replication with the `b = 0` block dropped:

$$U_x = \{\, a + bW : a \in T_x,\ 1 \le b \le p-1 \,\} \subset (W, pW),
\qquad |U_x| = (p-1)D .$$

The AP counts and the AP variance are `level-ledger-tight.md` Thm 1's:

$$h_q(a) = \#\{r \in T_x : r \equiv a \ (q)\},
\qquad D_x(q) = \sum_{a \bmod q}\bigl(h_q(a) - D/q\bigr)^2 ,$$

and `B_q = #{n ∈ U_x : q | n or q | n+2}` is the kill count of an auxiliary modulus on
the lift.

### Lemma A (Bridge), proved

> For `q` coprime to `W`, `q > 2`:
> $$\Bigl|\, B_q - \tfrac{2}{q}|U_x| \,\Bigr| \;\le\; 2\sqrt{p-1}\,\sqrt{D_x(q)} .$$

*Proof.* `q` is odd, so no `n` is counted twice. `n = a + bW ≡ 0 (q)` iff
`a ≡ −bW`, and `n + 2 ≡ 0 (q)` iff `a ≡ −2 − bW`. Hence the window identity

$$B_q = \sum_{b=1}^{p-1}\bigl[\, h_q(-bW) + h_q(-2-bW) \,\bigr],$$

so with `u_b = h_q(-bW) - D/q` and `v_b = h_q(-2-bW) - D/q`,
`B_q - (2/q)|U_x| = Σ_b (u_b + v_b)`. Cauchy–Schwarz over the `p−1` blocks and
`(u+v)² ≤ 2u² + 2v²` give
`|Σ_b(u_b+v_b)| ≤ √(p−1)·√(2Σu_b² + 2Σv_b²)`. Now `b ↦ −bW mod q` is injective on
`b = 1..p−1`: every prime factor of `q` exceeds `x`, so `q ≥ p > p−1`. The `p−1` values
`−bW mod q` are therefore distinct residues, and `Σ_b u_b² ≤ Σ_{a mod q}(h_q(a)−D/q)² =
D_x(q)`; the same for `v`. ∎

**Three remarks the read did not carry.**

1. The injectivity requirement is real and it is free, exactly as the read's §5 argued.
   Measured: the smallest admissible `q` is 5, 7, 11, 13, 17, 19, 23, 29 at
   `x = 3 … 23`, against `p−1 = 4, 6, 10, 12, 16, 18, 22, 28`. It equals `p` every time.
2. **Coprimality is load-bearing**, which nothing in the read says. For `q ≤ x` the
   lemma fails at every level: `B_q = 0` by construction while `2|U_x|/q > 0`, and
   `28 of 28` control pairs violate it, at ratios 1.3416 (`x = 5, q = 5`) to 3.5753
   (`x = 23, q = 23`).
3. `q` need not be prime. The proof uses only `gcd(q, W) = 1` and `q` odd.

### Lemma A′ (composite `d`), the form a sieve would actually need — new here

> For `d` squarefree, `gcd(d, W) = 1`, with `ω(d)` prime factors and
> `B_d = #{n ∈ U_x : d | n(n+2)}`:
> $$\Bigl|\, B_d - \tfrac{2^{\omega(d)}}{d}|U_x| \,\Bigr| \;\le\; 2^{\omega(d)}\sqrt{p-1}\,\sqrt{D_x(d)} .$$

*Proof.* `d | n(n+2)` cuts out `2^{ω(d)}` residue classes mod `d` by CRT. Apply the
argument above once per class and add. ∎ Verified: 35 cases, 0 violations, max
`LHS/RHS = 0.064011`.

### Lemma B (collision), proved

> For `j ∈ {0,2}` let `b_j(a) = −(a+j)W^{-1} mod p` be the block in which `p` kills the
> copy of `a` through class `−j`, and `n_j(a) = a + W b_j(a)` that killed element. For
> **any** modulus `L`, with `k_{j,L}(r) = #{a ∈ T_x : n_j(a) ≡ r (L)}`:
> $$\sum_r k_{j,L}(r)^2 \;\le\; p \sum_r h_L(r)^2 \;=\; p\Bigl( D_x(L) + \tfrac{D^2}{L} \Bigr).$$

*Proof.* Partition `T_x = ⊔_{b=0}^{p-1} A_b` by the value of `b_j`. On `A_b` the map
`a ↦ n_j(a)` is the translation `a ↦ a + Wb`, so with
`c_b(s) = #{a ∈ A_b : a ≡ s (L)}` we have `k_{j,L}(r) = Σ_b c_b(r − Wb)`.
Cauchy–Schwarz over the `p` fibres gives `k_{j,L}(r)² ≤ p Σ_b c_b(r−Wb)²`; summing over
`r` and reindexing each fibre by its own translate,
`Σ_r k_{j,L}(r)² ≤ p Σ_b Σ_s c_b(s)² ≤ p Σ_s (Σ_b c_b(s))² = p Σ_s h_L(s)²`, the last
step dropping non-negative cross terms. Expanding the variance gives the right-hand
form. ∎

**Finding: the stated hypotheses are unnecessary.** No step uses `L` squarefree,
`gcd(L, W) = 1` or `gcd(L, p) = 1`; only `gcd(W, p) = 1`, which is automatic. Verified
on 56 deliberate violations (`L = q²`, `L | W`, `L = p`, `L` even), zero failures. They
are inherited from the surrounding sieve, not from the lemma.

**Finding: the constant `p` is best possible, and the excluded case is where it is
attained.** Under the stated hypotheses `p × ratio` has mean **0.99857** over 140 cases
(min 0.68000, max 1.35294), so the bound overshoots by exactly `p`. At `L = p`, which
the hypothesis excludes, every killed image lands in the single class `−j mod p`, the
left side is `D²`, and `p × ratio` reads 3.00000, 8.33333, 12.95309, 16.99111, 18.99994,
23.00000, 29.00000 at `x = 5 … 23` — that is `p` exactly, i.e. the inequality is an
equality to five figures from `x = 17` up. "Loose by a factor `p`" is the right reading
inside the hypothesis and the wrong reading about the constant.

---

## 2. Verification

`research/import-bridge-01-verify.js`. Tiles rebuilt from scratch and checked against
`discrepancy-two-class.md` §2's `D_x` column (3, 15, 135, 1485, 22275, 378675, 7952175)
and, at `x ≤ 17`, element by element against `import-chaining-02.js`.

| `x` | `p` | `q` range | pairs | violations | max `LHS/RHS` | at `q` | direct enumeration agrees |
|---|---|---|---|---|---|---|---|
| 3 | 5 | 5..293 | 60 | 0 | 0.308607 | 7 | 60/60 |
| 5 | 7 | 7..307 | 60 | 0 | 0.154508 | 29 | 60/60 |
| 7 | 11 | 11..311 | 60 | 0 | 0.086088 | 29 | 60/60 |
| 11 | 13 | 13..313 | 60 | 0 | 0.076665 | 17 | 60/60 |
| 13 | 17 | 17..317 | 60 | 0 | 0.166731 | 23 | 60/60 |
| 17 | 19 | 19..331 | 60 | 0 | 0.049535 | 31 | 60/60 |
| 19 | 23 | 23..337 | 60 | 0 | 0.067071 | 29 | 60/60 |
| 23 | 29 | 29..347 | 60 | 0 | 0.034426 | 71 | 2/2 |

**480 pairs, zero violations.** `B_q` was recomputed 422 times by walking every one of
the `(p−1)D` elements of `U_x` with no identity used, and agreed exactly with the window
identity every time, so §1's first display is measured and not assumed.

**His own check reproduces independently.** On his grid — `x ∈ {3,5,7,11,13}` times the
eleven smallest admissible moduli, 55 pairs — the maximum is **0.308607** against his
printed 0.31.

**The slack runs the wrong way for an import.** Per-level max `LHS/RHS` falls from
0.308607 at `x = 3` to 0.034426 at `x = 23`: roughly 3× loose at the smallest level and
29× loose at the largest. Lemma B's ratio column falls the same way, `1.43e-1` to
`3.45e-2`. Neither lemma tightens as the tile grows.

---

## 3. The experiment: does the chain certify one number the corpus lacks?

`research/import-bridge-02-experiment.js`. The incumbents are
`research/level-ledger-tight.md`'s, quoted and not recomputed:

- `LL(x) = R*(x) + D/W` (Thm 1 plus the §3 exhaustion), the certified bound on
  `max_a|h_q(a) − D/q|` uniform in every prime `q > x`: 1.900000, 3.071429, 6.642858,
  14.434066, 27.063025, 54.011857 at `x = 5 … 19`, and 161.954096 at `x = 23` through
  Thm 2's transfer `R*(23) ≤ 3R*(19)`.
- `TRI(x,q) = 2(p−1)LL(x)`, the incumbent bound on `|B_q − 2|U_x|/q|` by the triangle
  inequality over the `2(p−1)` counts the window identity exposes.
- `CERTD(x,q) = q·LL(x)²`, the only certified `L²` input the corpus owns beyond
  exhaustion.

### (a) The certified verdict: zero, by identity

$$\frac{\text{BRIDGE}_{\rm cert}}{\text{TRI}}
= \frac{2\sqrt{(p-1)q}\,LL(x)}{2(p-1)LL(x)} = \sqrt{\frac{q}{p-1}} ,$$

confirmed to `8.88e-16` over all 280 pairs. Since every admissible `q` has all prime
factors above `x`, `q ≥ p > p−1` always, and the ratio starts at 1.080123, 1.048809,
1.040833, 1.030776, 1.027402, 1.022475, 1.017700 at the smallest modulus of each level
and climbs from there. **New certified numbers: 0 of 280.**

The mechanism matters more than the count. `CERTD` *is* Theorem 1 applied `q` times, so
the chain takes the ledger's sup, squares it, sums it, and takes a square root: it can
only return what it was given, minus the `√(q/(p−1))`. Nothing about the Bridge is at
fault. The corpus simply has no `L²` input that is not the `L^∞` one in disguise, and
that is exactly the gap `discrepancy-two-class.md` §10 already names.

### (b) With the strongest plausible `L²` input, it wins low and loses high

| `x` | `2√((p−1)D)` binomial-fed Bridge | `TRI` | beats `TRI` |
|---|---|---|---|
| 5 | 8.49 | 22.80 | yes |
| 7 | 24.49 | 61.43 | yes |
| 11 | 80.50 | 159.43 | yes |
| 13 | 308.29 | 461.89 | yes |
| 17 | 1266.41 | 974.27 | no |
| 19 | 5772.64 | 2376.52 | no |
| 23 | 29843.65 | 9069.43 | no |

`D_x(q) ≤ D` holds at every cell measured here and is **proven nowhere**; it is used as
the optimistic surrogate, so this row is a ceiling on what the Bridge could ever deliver.
It crosses at `x = 17` and never comes back: `ln TRI ∼ π(x)\ln 3` against
`ln 2√((p−1)D) ∼ θ(x)/2`.

### (c) With exact `D_x(q)`, there is room, and the room closes

`BRIDGE_meas` beats `TRI` at 40 of 40 moduli at every level. But that is a
small-modulus statement: the condition is `D_x(q) < (p−1)LL(x)²`, and that threshold
falls from `7.22 D` at `x = 5` to `9.24e-2 D` at `x = 23`. Pushing the modulus up
geometrically finds the crossing:

| `x` | threshold `D_x(q) ≥` | first sampled `q` past it | `D_x(q)/D` there | `BRIDGE/TRI` |
|---|---|---|---|---|
| 5 … 13 | `7.22 D … 2.24 D` | none below 200000 | — | — |
| 17 | `1.318e4` | 24967 | 0.6740 | 1.0672 |
| 19 | `6.418e4` | 15737 | 0.1922 | 1.0650 |
| 23 | `7.344e5` | 95327 | 0.1032 | 1.0570 |

The pre-registration predicted the `x = 23` crossover at `D_x(q)/D ≈ 0.092`; the
computed threshold is `9.24e-2 × D` and the first sample past it is at `0.1032`. At
`x ≤ 13` the threshold exceeds `D` and no crossing can exist.

And this row is **secondary by construction**: `D_x(q)` costs `O(D)` to compute exactly
and so does `B_q`, so a bound built on a measured `D_x(q)` certifies nothing that direct
exhaustion at the same level does not certify exactly. It measures room, not gain.

### (d) The slack, quantified

| `x` | 5 | 7 | 11 | 13 | 17 | 19 | 23 |
|---|---|---|---|---|---|---|---|
| min `BRIDGE/TRUE` | 6.47 | 11.62 | 13.04 | 6.00 | 20.19 | 14.91 | 29.05 |
| median | 12.99 | 32.76 | 42.03 | 82.14 | 148.28 | 93.63 | 163.66 |
| max | 73.97 | 1755.11 | 2245.44 | 967.64 | 1034.75 | 922.80 | 51952.48 |

The read's "factor ~3 loose per prime", read off `1/0.31`, is the *best* case at the
*smallest* level. The typical case is two orders worse, and the median grows with `x`.

### (e) The sup channel, which is where our gap actually is

The Bridge produces no sup bound. Its `s = 1` member does, and it is
`PAR = √(D_x(q))`, which is `level-ledger-tight.md` §4(a). Measured against the truth:

| `x` | `PAR`/true sup, min / median / max | `LL(x)`/true sup, min / max | `PAR < LL` at |
|---|---|---|---|
| 5 | 1.746 / 1.764 / 2.291 | 1.93 / 3.33 | 40 of 40 |
| 7 | 1.736 / 4.124 / 5.023 | 2.03 / 5.17 | 5 of 40 |
| 11 | 1.395 / 4.313 / 7.890 | 2.31 / 6.46 | 11 of 40 |
| 13 | 2.236 / 4.000 / 6.604 | 2.42 / 9.22 | 21 of 40 |
| 17 | 2.324 / 4.053 / 6.325 | 2.25 / 7.45 | 23 of 40 |
| 19 | 2.227 / 4.310 / 5.903 | 3.70 / 8.81 | 29 of 40 |
| 23 | 2.597 / 4.240 / 6.311 | 6.85 / 15.44 | 40 of 40 |

`PAR` sits about 4× above the true sup with no trend in `x`, and beats the Level Ledger
at a growing share of moduli — all 40 at `x = 23`. That is a fact about the corpus's own
§4(a) route, not about the import, and it is the one number-bearing thing this pass
would put in a live document.

---

## 4. Where the per-prime nature stops it

Not where the read guessed. The Bridge generalises to composite `d` for free (Lemma A′),
so "per-prime" is not the obstruction. Summing it is.

Sieve `U_x` by the primes in `(x, z]`. The remainder budget is
`R(z) = Σ_{d ≤ z, sf, (d,W)=1} 2^{ω(d)}·2√(p−1)·√(D_x(d))` and the main term is
`M(z) = |U_x| ∏_{x<q≤z}(1−2/q)`. With the optimistic `D_x(d) ≤ D`,

| `x` | `|U_x|` | `pW` | `z_max` with `R ≤ M/2` | `ln z / ln|U_x|` | `ln z / ln(pW)` |
|---|---|---|---|---|---|
| 5 | 1.80e+1 | 2.100e+2 | 6 | 0.6199 | 0.3351 |
| 7 | 1.50e+2 | 2.310e+3 | 12 | 0.4959 | 0.3208 |
| 11 | 1.62e+3 | 3.003e+4 | 22 | 0.4183 | 0.2998 |
| 13 | 2.38e+4 | 5.105e+5 | 52 | 0.3922 | 0.3006 |
| 17 | 4.01e+5 | 9.700e+6 | 150 | 0.3884 | 0.3115 |
| 19 | 8.33e+6 | 2.231e+8 | 568 | 0.3980 | 0.3299 |
| 23 | 2.23e+8 | 6.470e+9 | 2152 | 0.3993 | 0.3397 |

`ln z_max / ln|U_x|` settles onto **1/2**, and the arithmetic says why:
`Σ_{d≤z}2^{ω(d)} ≈ (6/π²) z\ln z`, so `R(z) ≈ 2\sqrt{|U_x|}·(6/π²)z\ln z` against
`M(z) ≈ |U_x|·8C_2/\ln^2 z`, giving `z ≈ |U_x|^{1/2}/\ln^3 z`. **Level 1/2 with no
averaging over the residue class is the trivial level** — it is what the triangle
inequality on a square-root-cancellation-free remainder always gives, and it is below
Bombieri–Vinogradov, which at least averages. Against the interval object the same `z`
is `ln z/ln(pW) = 0.3397` at `x = 23`, where twins need `1/2` of `ln(pW)`.

So the honest statement of the cost: **summing Bridge bounds over moduli costs a factor
`Σ_{d≤z}2^{ω(d)} ≍ z\ln z` against a main term linear in `|U_x|`, and that trade caps
the reachable level at `|U_x|^{1/2}` no matter how good the `L²` input is.** The
`sqrt(D_x(d))` inside is not the binding constraint; the absence of cancellation in the
`d`-sum is.

---

## 5. The rider: the unweighted `Σ ℓ D_x(ℓ)` does diverge, and it starts earlier than he says

The read's §7 records the observation and notes the corpus has not written it down.
Verified exactly, using `Σ_r h_L(r)² = D + 2·#{pairs a<a′ ∈ T_x with L | a′−a}` from the
full difference multiset, so every `L` up to `3W` is exact.

| `x` | `W` | `D` | max diff | `L* = 1 + maxdiff` | `L*/W` | persistent onset `L₀` | `L₀/D` | `L₀/W` |
|---|---|---|---|---|---|---|---|---|
| 5 | 30 | 3 | 18 | 19 | 0.6333 | 20 | 6.67 | 0.6667 |
| 7 | 210 | 15 | 198 | 199 | 0.9476 | 140 | 9.33 | 0.6667 |
| 11 | 2310 | 135 | 2292 | 2293 | 0.9926 | 1340 | 9.93 | 0.5801 |
| 13 | 30030 | 1485 | 30012 | 30013 | 0.9994 | 14838 | 9.99 | 0.4941 |
| 17 | 510510 | 22275 | 510480 | 510481 | 0.9999 | 222738 | 10.00 | 0.4363 |

`L*` is the least `L` beyond which occupancy is forced `0/1` for **every** larger `L`,
and it equals `1 + (max T_x − min T_x)` exactly. His "past `ℓ > F_i`" is precisely that,
up to the 12 the tile's endpoints give up. Beyond `L*`, `L D_x(L) = LD − D²` exactly, so
`Q(L) = Σ_{L′≤L} L′D_x(L′)` grows like `D L²/2`: measured
`Q/(ρ(DL²/2 − D²L)) = 1.025450, 1.004627, 1.001301, 1.000842, 1.000716` at `L = 3W` for
`x = 5 … 17`, with `ρ` the density of `L` coprime to `W`. **The sum diverges.**

**Sharpening.** `L₀`, the last coprime `L` at which `D_x(L)` still falls below the
binomial line `0.9·D(1−1/L)`, is `≈ 10D` — that constant is the 0.9 threshold read
against the exact forced form `D − D²/L`, so the content is the `D` and not the 10. Its
share of `W` falls 0.6667, 0.6667, 0.5801, 0.4941, 0.4363, and from `x = 13` on `L₀` sits
strictly inside the collisions-possible range. **The divergence is governed by `|T_x|`,
not by `F_i`,** and `F_i` is a pessimistic place to put the boundary.

---

## 6. Pre-registration scorecard

| | prediction | outturn |
|---|---|---|
| P1 | both proofs go through; Lemma B's hypotheses unused | **held**, both parts |
| P2 | ≥ 400 pairs, zero violations, his grid 0.25–0.40, extended ≤ 0.6 | **held**: 480, 0, 0.308607, 0.308607 |
| P3 | coprimality load-bearing, violations at every `x ≥ 11` | **held and exceeded**: fails at every `x ≥ 5`, 28 of 28 |
| P4 | ratio `= √(q/(p−1))`, zero new certified numbers | **held**: `8.88e-16`, 0 of 280 |
| P5 | crossover exists at `x = 23` near `D_x(q)/D ≈ 0.092` | **held**: threshold `9.24e-2 D`, crossing found at 0.1032 |
| P6 | the Bridge is not a pointwise bound; its `s=1` member is §4(a) | **held** |
| P7 | `p × ratio` in `[0.7, 1.3]`, max ≤ 1.5 | **held on the mean (0.99857), missed on the band**: min 0.68000 at `(x,L) = (7,23)`, max 1.35294 at `(7,17)`, both at the smallest level |
| P8 | forced `0/1` past `L*`; `Q ∼ DL²/2`; onset far below `W` | **held**, and the onset law `L₀ ≈ 10D` was not anticipated |

P7's band is the one miss, and it is a band miss at the smallest tile, not a mechanism
miss: the mean over 140 cases is 0.99857 and the mechanism claimed in advance (the `p`
fibres are near-equidistributed, so Cauchy–Schwarz costs its full `p`) is what the
numbers show.

---

## 7. Proposed live-document pointers (report only; nothing edited)

1. **`research/level-ledger-tight.md` §4(a)** — the Parseval sup route is stated there
   and then set aside as needing pair correlation. It has never been *measured*. §3(e)
   above is that measurement: `√(D_x(q))` sits at median 4× the true sup with no trend
   in `x`, and beats the certified `LL(x)` at 40 of 40 moduli at `x = 23`. That is a
   number-bearing addition to a section that currently carries only the identity.
2. **`research/level-ledger-tight.md` §4** — a fifth closed route belongs on the list:
   feeding the ledger's own certified sup back through an `L² → L¹` Cauchy–Schwarz is
   circular, and the loss is exactly `√(q/(p−1))`.
3. **`research/discrepancy-two-class.md` §10** — the third bullet of the honest-residuals
   list can now name what the missing `L²` input is worth: the summed-Bridge ceiling
   caps at level `|U_x|^{1/2}` regardless of the input's quality (§4 above), so a better
   `L²` bound on `D_x(q)` alone does not move the interval object.
4. **`research/history/staging/ojaroudi-read.md` §6(d)** — one sentence to correct
   ("converts … directly into a **pointwise** bound"), one hypothesis to relax (Lemma B's
   squarefreeness and coprimality are unused), one to add (Lemma A's coprimality is
   load-bearing, 28 of 28 controls fail without it), and the sharpened rider for §7.
5. **`research/SEARCH-CONVENTIONS.md`** — unchanged by this pass. The `L²`-AP-variance
   convention row the read asked for is still the gate on any absence claim about
   `D_x(ℓ)`-shaped objects, and nothing here is written as an absence.

---

## 8. Honest residuals

- `D_x(q) ≤ D` is measured at every cell here and **proven nowhere**. §3(b) leans on it
  as an optimistic surrogate and is labelled as such; if it were proven it would be a
  genuine `L²` input, and the Bridge would then still lose to `TRI` from `x = 17` on.
- `LL(23)` uses Thm 2's transfer because `R*(23)` needs 36,495,360 dilation classes and
  is out of reach. Every `x = 23` comparison inherits that looseness, in the incumbent's
  disfavour, so the negative verdict at `x = 23` is if anything understated.
- The level-of-distribution table in §4 uses the surrogate `D_x(d) ≤ D` for every `d`,
  including small `d` where the measured value is two orders below it. That makes `z_max`
  an upper bound on what the summed Bridge can reach, which is the direction the argument
  needs, but it is not a measurement of the true `z_max`.
- Nothing here tests the collision bound in its intended role. It is verified as an
  inequality and priced as one; whether `p·(D_x(ℓ) + D²/ℓ)` is a *useful* ceiling
  depends on the weighted energy `W̃_i` that the read says not to import, and that was
  not touched.

---

**Artifacts.** `research/import-bridge-01-verify.js` (101.7 s, 285 lines of output,
code-sha256 `6d21a94dbaddb8bd…`, out-sha256 `ad10c72c3e52dd0d…`) and
`research/import-bridge-02-experiment.js` (23.6 s, 247 lines, code-sha256
`c8f372cc93fe66d3…`, out-sha256 `066ce1b099de65dd…`), both embedded by
`research/qc/embed.js`. Pre-registration: [import-bridge-prereg.md](import-bridge-prereg.md).

*History and superseded claims: `research/history/CHANGELOG.md`.*
