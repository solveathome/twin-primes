# The shallow half of the Buchstab transfer is a theorem and it is empty at every level the engine has been run at: the fundamental lemma reaches the conditioned ensemble only for scour primes below W^{1/23}, the band is empty until level 131, and the engine's B is a dimension-1 ratio standing in for a dimension-2 ensemble, defensible for the ratio and derived nowhere

<!-- ledger
id: Q-buchstab-transfer
status: ANSWERED
todo: 8
question: Is the certificate engine's Buchstab transfer provable in the shallow regime y = T^{o(1)}?
verdict: PROVEN conditional on the fundamental lemma and EMPTY at every run level (needs s >= 22.06; available 4.7 @23, 17.1 @97); the engine's B is a dimension-1 object, the survey's pair-Buchstab is dimension 2, the certificate needs a third.
-->

*(2026-08-28. **Staging note. HELD. No existing repo file was edited, moved or
deleted. No git command was run.** One producer was written and it lives beside
this note in staging, not in `research/`:
`research/history/staging/thm-buchstab-transfer-shallow.js`. It is **not**
embedded, **not** `qc`-gated, and every number it prints is marked
`[SCRATCHPAD-GRADE]` with the command that produced it. Nothing below may be
quoted outside this file until it is re-derived inside an embedded producer in
`research/`.)*

**Tags used.** `[CITED]` = a repo artifact quoted and not recomputed, per the
standing compute rule. `[CITED-REPO-PAGE]` = a literature statement quoted from
a repo file that recorded reading it at a page image or PDF page; not re-read
this session. `[MEMORY]` = a literature statement from memory, not verified this
session at any page. `[NOT REACHED]` = named, not seen. `[SCRATCHPAD-GRADE]` =
this note's producer. `[DERIVED]` = arithmetic or an argument carried out here.

**Command for every `[SCRATCHPAD-GRADE]` number below:**
`node research/history/staging/thm-buchstab-transfer-shallow.js` (~1 s, node
v22, no data files, nothing written).

---

## 0. Verdict, disconfirming half first

**The brief's premise (ii) survives, with two hypotheses it does not state, and
the theorem it yields is vacuous at every level the certificate engine has
actually run.** Six things, disconfirming first.

1. **The shallow theorem does not decouple, and the survey's hypothesis is not
   the operative one.** `bv-import-survey.md` §3.3 conditions on `y = T^{o(1)}`,
   the freshness depth. The engine's ensemble also carries `P⁻(m) ≥ q`, which is
   a sieve to depth `q`, and `q` runs up to `√W`. A sieve is only as shallow as
   its deepest sifting prime, so the fundamental lemma reaches the conditioned
   count only when **`q`** is shallow, not merely `y_K`. `[DERIVED]`, §3.
2. **In the one normalisation this repo has verified at page level, the theorem
   is empty at every computed level.** At `κ = 2` the fundamental lemma needs
   `s ≥ 9κ + 10 ln K + ln(1/δ)`, and with `K = 7/5` (the exact sup, §3.4) that is
   `s ≥ 22.06` for a 50% guarantee and `s ≥ 25.97` for 1%. The sifting parameter
   available at the **shallowest** scour prime of each level runs `2.639` at @13,
   `4.709` at @23, `17.142` at @97. Below threshold everywhere.
   `[SCRATCHPAD-GRADE]`, SEC 3.
3. **The band is empty until level 131 and never exceeds a tenth of the scour.**
   The hypothesis is `q ≤ W^{1/(1+s*)}` against a scour running to `W^{1/2}`.
   Least level with a non-empty band: `x = 131` at 50%, `x = 151` at 1%. At
   `x = 10007` the band still covers only `8.50%` of the log-depth interval
   `[ln x, ln √W]`. `[SCRATCHPAD-GRADE]`, SEC 4.
4. **Where the theorem does hold, the correction it certifies is smaller than
   the arithmetic that carries it.** The whole dimension-1 correction
   `c(u) = e^γ ω(u) − 1` is `−2.2e−6` at `u = 4` and at the grid's numerical
   floor (`~4e−10`) by `u = 8`. `[SCRATCHPAD-GRADE]`, SEC 1. The theorem
   certifies `B = 1` in a band where `|B − 1|` is below `10⁻⁵`. It says nothing
   about the `B = 0.890` that produces RESULT 2's measured improvement.
5. **The engine's `B` and the survey's "pair-Buchstab" are not the same object,
   and neither is what the certificate needs.** Three objects, §2. The engine's
   `B` is a ratio of **dimension-1** Buchstab densities for a single integer of
   size `n`. The survey's pair-Buchstab is the **dimension-2** count of `n` and
   `n+2` both `y`-rough at one common depth. The certificate's ensemble is a
   **two-class, two-depth** sieve: `κ = 2` up to `y_K`, `κ = 1` from `y_K` to
   `q`. `[DERIVED]`
6. **The survey's remainder claim is right only in the formulation that puts the
   comb inside the sieve.** "The remainder of integers ≡ a mod d in an interval
   is O(1), unconditionally and trivially" holds for the joint sieve. Conditioned
   on the natal comb as an ambient set, the repo's own bound is `2·3^k` per
   Legendre term (`natal-cap-25-excess-law.js`, Comb Discrepancy Lemma), not
   `O(1)`, and that is exactly what makes the Certified-Head Theorem head-only.
   §3.3. `[DERIVED]` against `[CITED]`.

**The confirming half, and it is one theorem with a narrow scope.** For scour
primes `q ≤ W^{1/(1+s*)}` the conditioned freshness count equals the independence
product to within `δ`, uniformly in `K`, by the fundamental lemma at `κ = 2` with
remainders that are trivially `O(d^ε)` because the objects counted are integers
in an interval. So `B(q,K) = 1 + O(δ)` there, and Buchstab's `ω` enters only when
the sifting parameter is bounded. Statement and proof in §3. **Rung: PROVEN,
conditional on the fundamental lemma as quoted in `lit-pdf-halberstam-richert.md`
§3, which is `[CITED-REPO-PAGE]` and not re-read here.**

**Numeric confidence.**

| claim | confidence | rung |
|---|---|---|
| Theorem 1 (§3.5) is correct as stated | 0.85 | PROVEN modulo the cited fundamental lemma |
| the engine's `B` is a dimension-1 object, the certificate's ensemble is not | 0.92 | DERIVED from the code and `paper/staircase-note.md` §7 |
| the survey's pair-Buchstab is a third object, not the engine's `B` | 0.88 | DERIVED |
| `q` shallow, not just `y_K`, is required | 0.90 | DERIVED |
| the certified band is empty below level 131 | 0.80 | SCRATCHPAD-GRADE, and it moves with the normalisation |
| this note opens any route | 0.01 | it closes one paragraph of an item and narrows two others |

---

## 1. What "the Buchstab transfer" asserts, from the engine's own definitions

**The victim ensemble.** `paper/staircase-note.md` §7 `[CITED]`. Fix level `x`,
tile `W = x#`, scour prime `q` with `x < q ≤ √W`, and `j = idx(q)`. On the A side
put `T = ⌊(W−1)/q⌋` and count cofactors `m` with `2 ≤ m ≤ T`:

- `P⁻(m) ≥ q` (the victim is *fresh* for `q`: no smaller prime divides it);
- `v = qm ≡ 11` or `17 (mod 30)`;
- `v ≢ −2 (mod p)` for every mid `7 ≤ p ≤ x` (the natal comb's partner tooth);
- depth-`K`: `v ≢ 0` and `v ≢ −2 (mod q_i)` for the first `K` scour primes.

`#A_K` is that count, `#B_K` is the mirror with `⌊(W+1)/q⌋` and `v ≡ 13, 19 (30)`,
`v ≢ 2 (mod p)`, and `cap_K(q) = s(q) + #A_K + #B_K`, with `cap₂ := cap_0`.

**One of the two depth-`K` congruences is void, and this is where the dimension
is decided.** `v ≡ 0 (mod q_i)` with `v = qm`, `q_i ≠ q` and `P⁻(m) ≥ q > q_i`
is impossible. So among fresh victims exactly **one** class per freshness prime
can fire, which is why `natal-cap-28`'s independence factor is `1/(q_i − 1)` and
not `2/q_i`: among the `q_i − 1` classes left after `P⁻(m) ≥ q` removes `m ≡ 0`,
exactly one gives `q_i | v + 2`. `[DERIVED]` from
`natal-cap-28-analytic-certificate.js:167` (`F = 1/(q−1)`) and `:184`
(`if(t===0||t===Q[j]-2)`). The redundancy is harmless as a bound and it is not a
defect in `cap_K`; it does hide the dimension count, and `research/GLOSSARY.md`
inherits it ("the two forbidden freshness residues").

**What `B` multiplies.** RESULT 2's corrected predictor
`[CITED, natal-cap-28 header]`:

```
bound_pred2(K) = N − SUM_q [ s + (cap2(q) − s) · PROD_{i<K'} (1 − 1/(q_i − 1)) · B(q,K') ]
```

so `B` multiplies the **independence product for the freshness classes only**,
applied to the full-depth cap `cap₂ − s`. The transfer asserts that the true
conditional survival ratio `(cap_K − s)/(cap₂ − s)` equals that product times

```
B(q,K) = <ω(ln n / ln y_K)> / <ω(ln n / ln x)>,   n in [q^2, W],  weight 1/ln(n/q)
```

with `y_K = q_K` the largest enforced scour modulus (`u2-engine-depth.md` §1
`[CITED]`, three code lines) and `ω` Buchstab's function. Implementation:
`natal-cap-28:200–205`, `NB = 24` midpoint bins uniform in `n`, `Bk[j] =
omAt(lnQ[j−1])/om0`.

**The product form is exactly the mixed-dimension sieve density, and that part
is arithmetic, not a model.** `(1 − 1/p)(1 − 1/(p−1)) = 1 − 2/p` identically, so

```
(N/W) · PROD_{x<p<q}(1 − 1/p) · PROD_{x<p<=y_K}(1 − 1/(p−1))
  = (2/30) · PROD_{7<=p<=y_K}(1 − 2/p) · PROD_{y_K<p<q}(1 − 1/p)
```

`[DERIVED]`. The right-hand side is the density of a sieve with **two** excluded
classes per prime up to `y_K` and **one** above it. So the engine's product is
already the `κ = 2 → κ = 1` sieve density; only the correction factor `B` is
imported from elsewhere.

**RESULT 1 and RESULT 3, for scope.** RESULT 1 is the Certified-Head Theorem,
`|cap₂(q) − main| ≤ 2^{j+1}(2·3^k + 1)`, PROVEN, and by `certificate-engine.md`'s
own status table it certifies 1 / 3 / 6 primes at @17 / @19 / @23 carrying
9.69% / 17.40% / 22.93% of `Σcap₂` `[CITED]`. RESULT 3 is the Li-integral
evaluator, whose outputs are PREDICTED and carry the status of their weakest
input. Theorem 1 below lives in the same head-shaped region as RESULT 1, for the
same reason: both die when `2^j` or `s` gets away from them.

---

## 2. Which object `B` models, and whether the survey's pair-Buchstab is it

Three distinct objects. They agree in the limit `s → ∞` and nowhere else.

**(a) The engine's `B`: dimension 1, at value-size `n`.** `ω(ln n / ln y)` is the
Buchstab density of integers of size `n` free of prime factors `≤ y`: one excluded
class per prime, the partner integer alone, no shift, no companion. The ratio
`ω(u_K)/ω(u_x)` is the factor by which that density changes when the roughness
requirement deepens from `x` to `y_K`, relative to the Mertens product between
them. `B → ω(2)/e^{−γ} = e^γ/2 = 0.890536` and `e^γ ω(3) = 1.005206`
`[SCRATCHPAD-GRADE]`, SEC 0, which reproduce the header's `0.890` and its
mid-curve bump.

**(b) The survey's pair-Buchstab: dimension 2, one depth.** "Counts of `n` in a
range with `n` and `n + 2` both `y`-rough" (`bv-import-survey.md` §3.3 `[CITED]`).
That is `S(𝒜, y)` with `𝒜_p = {n : p | n(n+2)}`, two excluded classes per prime
`p > 2`, `κ = 2`. `import-rough-anatomy.md` §5.4 `[CITED]` states the consequence
that knowing this function down to `u = 2` is the twin prime conjecture. The
corpus does hold a model of this object and this note must not claim its absence:
the **Unification Law** `ρ(u) → (e^γ ω(u))²`, MEASURED to ~1% and
Hardy-Littlewood-conditional, with its `[2,3]` continuation resting on an
independence-squared step that `attack2-05-07-integral-ladder.js` calls a
conjecture in terms (`research/ATTACKS2.md` campaign verdict `[CITED]`), and
identified with the kill shadow in `history/staging/shadow-buchstab.md` (HELD).
A measured square of a dimension-1 function is a model of the dimension-2
correction, not the dimension-2 sifting function.

**(c) What the certificate actually needs: two classes, two depths.** In the
cofactor variable `m ≤ T`, after fixing one of the two admissible classes mod 30:

| prime range | excluded classes for `m` | source | `ω(p)` |
|---|---|---|---|
| `7 ≤ p ≤ x` | `0` and `−2q^{-1}` | `P⁻(m) ≥ q`; the comb's partner tooth | 2 |
| `x < p ≤ y_K` | `0` and `−2q^{-1}` | `P⁻(m) ≥ q`; freshness | 2 |
| `y_K < p < q` | `0` | `P⁻(m) ≥ q` | 1 |

`[DERIVED]` from §1. The `ω(p) = 2` here and the one class per prime of §1 are
the same object counted in two formulations, not a disagreement: §1 counts
victims that already carry `P⁻(m) ≥ q`, where `m ≡ 0 (mod p)` is void, while this
table *sifts* for that roughness, where it is a real second class. Where
roughness is assumed the dimension is 1, which is `thm-capK-bv.md` §1's `κ = 1`;
where it is sifted it is 2. So the object is `κ = 2` up to `y_K` and `κ = 1` from
`y_K` to `q`: a shifted rough pair `(m, qm+2)` sifted to depth `y_K`, intersected with
`m` rough to the deeper depth `q`. It is **not** (a), because the partner's
roughness is entangled with the cofactor's own roughness beyond the first order.
It is **not** (b) either, because (b) has a single depth on both members while
here the two depths differ by the whole interval `(y_K, q)`, which at the deep
end of the scour is most of the range.

**Which one the certificate needs: (c).** The engine uses (a). The survey
proposes (b). Neither is (c). The first-order part of the entanglement is
already inside the engine's product (the `1/(p−1)` rather than `1/p`, §1), so the
error the engine makes by using (a) instead of (c) is second order and could well
be small; that is a measurable question and the measurement has not been made.

**Two further model choices in `B`, both unstated in the header.** `[DERIVED]`,
argued, not proven:

- **The argument.** `B` evaluates `ω` at `ln n / ln y`, the size of the value.
  The count being estimated is the number of `m ≤ T` for which the linear form
  `qm + 2` is `y`-rough, which is a sieve of an interval of length `T`, so the
  sifting parameter available is `ln T / ln y = ln(n/q) / ln y`, smaller by
  `ln q / ln y ≥ 1`. At the tail (`q ≈ √W`) the two arguments differ by a factor
  of 2. Smaller argument means deeper into the region where `ω` oscillates, so
  the correction the model applies is evaluated further from the wall than the
  sieve says it should be.
- **The weight.** `wgt = 1/ln(n/q)` is the density of **primes** at the cofactor,
  which is the correct victim density only in the tail regime `q³ > W+1` where
  `m` is forced prime. It is applied at every `q`, including the head and middle
  where the cofactor is merely `q`-rough and the density is
  `ω(ln(n/q)/ln q)/ln q`. `natal-cap-28:202`.

Neither is a proven error. Both are places where the transfer's "heuristic" tag
is doing real work.

**(d) Why the first power and not the square, which is the one place the engine's
choice is defended by the measurement.** If the certificate's object were (b),
the corpus's own Unification Law would model its correction as `(e^γω(u))²`, so
the K-dependent ratio would be `B²` rather than `B`, and the deep deficit would
be about `1 − 0.890² = 21%` instead of the measured `11%`. The engine uses the
first power, and §2(c) says why that is the structurally right choice for a
*ratio*: the cofactor's own class `m ≡ 0` is sifted to depth `q` at every `K`, so
it cancels between numerator and denominator, and only the partner's single class
deepens with `K`. So the object is `κ = 2` but the K-derivative of it is
one-class, and a first-power correction is the natural model.
**Rung: HEURISTIC, argued here, not derived.** The check that would settle it is
to re-run the engine with `Bk[j]` squared and confirm the residual blows up as
predicted; it has **not** run.

---

## 3. The shallow-regime theorem

### 3.1 The sieve problem, stated

Fix `x`, `W = x#`, a scour prime `q` with `x < q ≤ √W`, and `K ≤ idx(q)`; put
`y_K = q_K` (`y_0 := x`) and `T = ⌊(W−1)/q⌋`. For `a ∈ {11q^{-1}, 17q^{-1}} mod 30`
let

```
  A_a = { m : 1 <= m <= T,  m == a (mod 30) },     X = |A_a| = T/30 + O(1)
```

and sift `A_a` by the residue systems of §2(c): for each prime `7 ≤ p < q`,
`Ω_p = {0} ∪ {−2q^{-1}}` if `p ≤ y_K`, else `Ω_p = {0}`. Write
`z = q`, `ω(p) = |Ω_p| ∈ {1,2}`,

```
  V(z) = PROD_{7<=p<z} (1 − ω(p)/p) = PROD_{7<=p<=y_K}(1−2/p) · PROD_{y_K<p<q}(1−1/p).
```

Then `#A_K = Σ_a S(A_a, z)` exactly, with no approximation: the sifted set is the
depth-`K` admissible set of §1. `[DERIVED]`

Two structural notes. The primes `2, 3, 5` are not sifted; they are fixed by the
choice of `a`, which is why `κ = 2` and not something larger. The two classes are
distinct for every `p ≥ 7` since `p ∤ 2q`. `[DERIVED]`

### 3.2 The level, and why the remainder is trivial

For squarefree `d | P(z)` and a choice of class per prime dividing `d`, the set
`{m ∈ A_a : m ≡ c_p (mod p) ∀ p | d}` is a single residue class mod `30d`, so

```
  |A_{a,d}| = X · ω(d)/d + R_d ,      |R_d| <= ω(d) <= 2^{#{p|d}} << d^eps .
```

Hence `Σ_{d ≤ D, d | P(z)} |R_d| ≪ D log D ≪ D^{1+ε}` with no equidistribution
input of any kind. **This is the survey's point (i) and it is correct in this
formulation**: nothing here counts primes, so `BV`, `EH` and `GRH` are inert.
`[DERIVED]`

Take `D = T^{1−ε}` and `s = ln D / ln z = (1−ε) ln T / ln q`.

### 3.3 The correction the survey's point (i) needs

The remainder is `O(d^ε)` **because the comb is inside the sieve** (the mids
appear as the `ω(p) = 2` primes with `p ≤ x`). If instead the natal comb is
treated as the ambient sequence and only the freshness primes are sifted, the
remainder is the discrepancy of a comb in a progression, and the repo's own
bound is `2·3^k` per Legendre term (Comb Discrepancy Lemma,
`natal-cap-25-excess-law.js` `[CITED]`), with `k = #mids`. That is the bound
whose `2^{j+1}(2·3^k+1)` accumulation makes the Certified-Head Theorem head-only.
So the survey's "unconditionally and trivially `O(1)`" is a statement about the
formulation, not about the object. `[DERIVED]`

### 3.4 The fundamental lemma used, and its constant

**[CITED-REPO-PAGE]**, from `research/history/staging/lit-pdf-halberstam-richert.md`
§3, which records reading it from the PDF of Matomäki and Teräväinen,
arXiv:2301.07679, p. 33, Lemma 9.1, and which flags that the same normalisation's
attribution to Friedlander–Iwaniec, *Opera de Cribro*, Lemma 6.8, is **not**
verified (the book is paywalled and was not reached). Not re-read this session.

> **Lemma 9.1 (Fundamental lemma of the sieve).** Let `κ ≥ 1` be fixed. Let
> `z ≥ 2` and let `D = z^s` with `s ≥ 9κ + 1`. There exist coefficients `λ±_d`
> such that: (i) `|λ±_d| ≤ 1` for every `d ∈ N`, supported on
> `{d ≤ D : d | P(z)}`; (ii) for every `n ∈ N`,
> `Σ_{d|n} λ⁻_d ≤ 1_{(n,P(z))=1} ≤ Σ_{d|n} λ⁺_d`; (iii) if `h : N → [0,1)` is
> multiplicative and, for some `K ≥ 1`,
> `Π_{w₁≤p<z₁}(1 − h(p))^{−1} ≤ K (log z₁/log w₁)^κ` for any `z₁ ≥ w₁ ≥ 2`, then
> `Σ_{d|P(z)} λ⁺_d h(d) ≤ (1 + e^{9κ−s}K^{10}) Π_{p<z}(1 − h(p))` and
> `Σ_{d|P(z)} λ⁻_d h(d) ≥ (1 − e^{9κ−s}K^{10}) Π_{p<z}(1 − h(p))`.

Other statements of the same lemma are **not** used here and are not verified:
Halberstam–Richert Ch. 2 is corroborated at chapter level only in the same repo
file `[CITED-REPO-PAGE]`; the theorem number 2.5 is `[MEMORY]`;
Friedlander–Iwaniec *Opera de Cribro* Thm 6.9 / Cor 6.10 and Iwaniec–Kowalski
Cor 6.10 are `[NOT REACHED]`. The constant-free form
`S = XV(z)(1 + O(e^{−s log s}))` is `[MEMORY]` and, because its implied constant
is unspecified, it certifies nothing at a finite level either.

**The constant `K` for this problem is `7/5`, exactly.** With `h(p) = ω(p)/p ≤ 2/p`
for `p ≥ 7` and `h(p) = 0` for `p ≤ 5`, the sup of
`Π_{w≤p<z}(1−2/p)^{−1}/(log z/log w)²` over `z ≥ w ≥ 2` is attained in the
degenerate limit `w = 7`, `z → 7⁺`, where the product is `(1−2/7)^{−1} = 7/5` and
the ratio of logs is 1. Numerically confirmed as a sup over all prime pairs to
`2·10⁵`: `K = 1.400000` at `(7, 7⁺)` `[SCRATCHPAD-GRADE]`, SEC 2. So
`e^{9κ−s}K^{10} ≤ δ` requires

```
  s >= 9κ + 10 ln(7/5) + ln(1/δ) = 18 + 3.365 + ln(1/δ)     (κ = 2)
```

giving `s ≥ 22.06 (δ = 0.5)`, `23.67 (0.1)`, `25.97 (0.01)`, `28.27 (0.001)`,
each above the lemma's own `9κ + 1 = 19`. `[SCRATCHPAD-GRADE]`, SEC 2.

### 3.5 Theorem 1 (shallow-depth Buchstab transfer)

> **Theorem 1.** Let `x` be a level, `W = x#`, `q` a scour prime with
> `x < q ≤ √W`, `T = ⌊(W±1)/q⌋`, and `K ≤ idx(q)` arbitrary. Fix `ε ∈ (0,1)`,
> `δ ∈ (0,1)`, and set `D = T^{1−ε}`, `s = ln D/ln q`. If
>
>   `s ≥ 18 + 10 ln(7/5) + ln(1/δ)`   (equivalently `ln q ≤ (1−ε) ln T / s*(δ)`),
>
> then, with `V(z)` as in §3.1,
>
>   `| #A_K − (T/15) V(z) | ≤ δ · (T/15) V(z) + O(T^{1−ε} log T)`,
>
> uniformly in `x`, `q` and `K`; the same holds for `#B_K`. Consequently, for any
> two depths `K' ≤ K ≤ idx(q)` in the same range,
>
>   `(cap_K(q) − s(q)) / (cap_{K'}(q) − s(q)) = PROD_{y_{K'} < p ≤ y_K} (1 − 1/(p−1)) · (1 + O(δ))`,
>
> that is, **`B(q,K) = 1 + O(δ)`**: the independence product is already the
> asymptotic, and Buchstab's `ω` does not enter.

*Proof.* `[DERIVED]`, each step tagged.

1. `#A_K = Σ_{a} S(A_a, z)` over the two classes `a` mod 30, exactly, by §3.1.
   **[PROVEN, definitional.]**
2. For `m ∈ A_a` let `n_m = Π{ p < z : m mod p ∈ Ω_p }`. Then `m` survives the
   sieve iff `(n_m, P(z)) = 1`, and `#{m ∈ A_a : d | n_m} = Xω(d)/d + R_d` with
   `|R_d| ≤ ω(d)` by §3.2. **[PROVEN, elementary.]**
3. Apply Lemma 9.1 (iii) with `h(p) = ω(p)/p`, `κ = 2`, `K = 7/5` (§3.4):
   `Σ_m Σ_{d|n_m} λ±_d = X Σ_d λ±_d ω(d)/d + Σ_d λ±_d R_d`, and (ii) sandwiches
   `S(A_a, z)` between the two. The main terms are
   `X V(z) (1 ± e^{18−s}(7/5)^{10})`, the error terms are bounded by
   `Σ_{d≤D} |R_d| ≪ D log D`. **[PROVEN, conditional on the cited lemma.]**
4. `e^{18−s}(7/5)^{10} ≤ δ` is the hypothesis. Summing the two classes `a` gives
   `X_total = 2(T/30) + O(1) = T/15 + O(1)`. **[PROVEN.]**
5. The `O(T^{1−ε} log T)` remainder is negligible against the main term:
   `V(z) ≫ (ln W)^{−3}` and `ln W = θ(x)`, while `T ≥ W^{1/2}`, so the ratio is
   `≪ T^{−ε}(log T)(ln W)³ → 0`. **[PROVEN, crude but sufficient.]**
6. The ratio statement follows by applying the display at `K` and at `K'` and
   dividing; `V(z,K)/V(z,K') = Π_{y_{K'}<p≤y_K}(1 − 1/(p−1))` by the identity of
   §1. The `s(q) ∈ {0,1}` self-strike term is absorbed. **[PROVEN.]** ∎

**Rung: PROVEN, conditional on a fundamental lemma that this session did not
read at a page.** The conditionality is not decorative. If the constants in
Lemma 9.1 (iii) differ from what `lit-pdf-halberstam-richert.md` §3 recorded, the
threshold `22.06` moves and §4's emptiness verdict moves with it. The *shape* of
the theorem does not depend on the constants; only its scope does.

### 3.6 Consistency with the engine's use of `B`

The header says `B → 0.890` as `y → √n` and `B > 1` near `u ≈ 3`. Theorem 1 says
`B = 1 + O(δ)` when `s ≥ 22.06`. These are consistent because they are statements
about disjoint regions: `e^γω(u) − 1` is `−1.095e−1` at `u = 2` and `+5.206e−3` at
`u = 3`, and is at the grid floor `~4e−10` by `u = 8` `[SCRATCHPAD-GRADE]`, SEC 1.
**The theorem certifies the transfer exactly where the transfer does nothing.**
The measured `3.4% → 0.2%` improvement at @23 is produced entirely by the region
Theorem 1 does not reach, and RESULT 2's HEURISTIC tag is unchanged by this note.

---

## 4. What the theorem does not reach, in numbers

`s_head = ln(W/q₀)/ln q₀` at the shallowest scour prime `q₀` of each level, the
best case for the hypothesis `[SCRATCHPAD-GRADE]`, SEC 3:

| x | ln W | q₀ | s_head | u_top = ln W/ln x | e^γ⟨ω(ln n/ln x)⟩ |
|---|---|---|---|---|---|
| 13 | 10.310 | 17 | 2.639 | 4.020 | 1.000508 |
| 17 | 13.143 | 19 | 3.464 | 4.639 | 0.999962 |
| 19 | 16.088 | 23 | 4.131 | 5.464 | 1.000005 |
| 23 | 19.223 | 29 | 4.709 | 6.131 | 1.000000 |
| 29 | 22.590 | 31 | 5.578 | 6.709 | 1.000000 |
| 53 | 44.931 | 59 | 10.019 | 11.317 | 1.000000 |
| 97 | 83.728 | 101 | 17.142 | 18.302 | 1.000000 |

Threshold `22.06`. Not met at any level the engine has been run at, including
the deepest prediction level @97. The last column is the engine's own
denominator `⟨ω(ln n/ln x)⟩e^γ` on the same 24-bin midpoint rule; it is within
`5e−4` of 1 at @13 and indistinguishable from 1 from @19 up, so at `K = 0` the
whole of `B`'s departure from 1 comes from the numerator as `y_K` climbs.

Band, `q ≤ W^{1/(1+s*)}` against a scour running to `W^{1/2}`
`[SCRATCHPAD-GRADE]`, SEC 4: empty at @97; least level with a non-empty band
`x = 131` at `δ = 0.5` and `x = 151` at `δ = 0.01`; at `x = 199 / 499 / 1009 /
10007` the band covers `3.24% / 6.22% / 7.34% / 8.50%` of `[ln x, ln √W]`. The
fraction of `Σcap₂` carried by that band has not been measured and this note did
not measure it.

---

## 5. The deep regime, located but not attacked

**One paragraph, no attempt.** In the owning convention the open statement is:
*for the sieve of §3.1 with bounded `s = ln D/ln z`, is there an asymptotic
`S(A,z) = XV(z)(W₂(s) + o(1))` with `W₂` computable?* Upper bounds exist at every
`s` (Brun, Selberg) and lower bounds are positive only above the
Diamond–Halberstam–Richert sifting limit `β₂ = 4.26645`, whose exact value is
unknown in print and for which no published lower bound exists (Ford, *Sieve
methods*, Spring 2023, §3.1 Def. 2 and Table 1, `[CITED-REPO-PAGE]` via
`import-rough-anatomy.md` §5.3, page image, sha256 recorded there). At `s = 2`
the statement is the twin prime conjecture with its Hardy–Littlewood constant
(`bv-import-survey.md` §3.3, `import-rough-anatomy.md` §5.4, both `[CITED]`), so
the open band is `2 < s < 4.26645` and this note adds nothing to it.

**Axis cross-check with `attack-roughpair-error.md` §5, which this note does not
re-derive.** That note reports in `s = ln W/ln y` with `W` the window length and
`y` the depth. That is the same axis as `s = ln D/ln z` here, because for a count
of integers in a window the level of distribution *is* the window length up to
`(1−ε)`, by §3.2. Its measured coordinates are `s ≲ 2.317` at the crossing (B8),
drifting toward `u*/2 = 1.783`, with `Xmain/T = 5.631` already at `s = β₂`
`[CITED]`. Putting the engine on that axis requires the correction of §2: the
engine's `u = ln W/ln y_K` must become `s = ln(W/q)/ln y_K`. At @97, with
`ln W = 83.72839` and `y* = 1.666·10¹⁰` (`u2-engine-depth.md` §2, itself a
reproduction of `natal-cap-28`'s embedded `q*` column, `[CITED]`), the engine's
`u = 3.557` becomes `s = 3.361` at the head prime `q = 101` and `s = 1.779` at
the tail `q ≈ √W` `[DERIVED, arithmetic on cited values]`. **So the two notes
agree**: the certificate's operative window is `1.78 ≲ s ≲ 3.36`, inside
`attack-roughpair-error.md`'s `s ≲ 2.3` band at its deep end, below `β₂` at every
`q`, and below the identity point `s = 2` at the tail. One numerical coincidence,
recorded and not explained: the engine's crossing `u` passes `3.5658` (the
census's `u*`, root of `uω(u) = 2`) at about @83 and keeps falling. Two crossing
conditions of similar shape; no derivation links them and none is offered here.

---

## 6. What remains heuristic in RESULT 2

One line each, after Theorem 1.

1. **The correction function.** `B` uses the `κ = 1` Buchstab `ω`; the ensemble
   is `κ = 2` up to `y_K` and `κ = 1` above it (§2c). The corpus's only model of
   the `κ = 2` correction is the Unification Law's `(e^γω)²`, MEASURED and
   HL-conditional with a conjectural `[2,3]` branch; the true `κ = 2` sifting
   function is unknown in print and knowing it at `s = 2` is TPC (§2b, §5).
2. **The argument of `ω`.** `ln n/ln y_K` (value size) where the sieve offers
   `ln(n/q)/ln y_K` (range length), a gap of `ln q/ln y_K ≥ 1`, up to a factor 2
   at the tail (§2).
3. **The averaging weight.** `1/ln(n/q)` is the prime-cofactor density, correct
   only in the tail regime `q³ > W+1`, applied at every `q` (§2).
4. **The averaging measure.** `n` uniform on `[q², W]` in 24 midpoint bins, not
   the victim measure; the victims are not uniform in `n`.
5. **The base count in the ratio.** `B` is a correction to a ratio whose
   denominator `cap₂` is itself proven only for the head (RESULT 1) and
   conjectural in the tail (Tail Comb Equidistribution Conjecture, OPEN); the
   transfer inherits that.
6. **The transfer's own scope.** Theorem 1 covers `q ≤ W^{1/23}`; the engine
   applies `B` at every `q` up to `√W`, and the deviation it prices lives at the
   far end.
7. **`e^{−s log s}` versus an explicit constant.** The constant-free fundamental
   lemma has an unspecified implied constant, so no version of it validates a
   measured `0.2%` residual at a specific level; only the `s`-asymptotics are
   available.

---

## 7. Defects noticed in passing

- `bv-import-survey.md` §3.3 bullet 1 says the shallow case "covers the B-factor
  in the band where cap-28 validated it best". Unsupported and probably
  inverted: in the shallow band `|B − 1| < 10⁻⁵` and the uncorrected product was
  already accurate; the validation payoff comes from the deep end. One line.
- `bv-import-survey.md` §3.3's "the remainder ... is `O(1)`, unconditionally and
  trivially" needs the qualifier of §3.3 above, since conditioning on the comb
  gives `2·3^k` per Legendre term by the repo's own Comb Discrepancy Lemma.
- `certificate-engine.md` §3's "provable now at `y = T^{o(1)}`" needs the second
  hypothesis `q = T^{o(1)}`, without which the ensemble is not in the
  fundamental-lemma regime at all.
- `research/GLOSSARY.md` ("the two forbidden freshness residues") is a dimension
  count and is wrong as one: only the `v ≢ −2 (mod q′)` residue can fire under
  `P⁻(m) ≥ q`, so the density factor is `∏(1 − 1/(q′−1))`, one class per prime.
  The line needs the scope clause of §2(c) with it, or it will read as
  contradicting that section's `κ = 2` table.
- `paper/staircase-note.md` §7 carries the same `v ≢ 0 (mod q′)` condition, and
  there it is a definition rather than a dimension count: the set it defines with
  two conditions equals the set defined with one, since the second is void on the
  domain `P⁻(m) ≥ q`, and no `cap_K` value moves. Redundant, not wrong.

---

## 8. What would falsify this, and whether that check has run

| claim | what would falsify it | has the check run |
|---|---|---|
| Theorem 1 as stated | a counterexample to the sieve setup of §3.1, i.e. a fresh victim not counted by `Σ_a S(A_a,z)`, or a class-count error in the table of §2(c) | **no**; the cheap check is to instrument `natal-cap-28`'s `scanLevel` to assert `#A_K` against the sifted count at one small level, and the fence forbade editing it |
| the threshold `s ≥ 22.06` | a different normalisation of the fundamental lemma with a smaller constant; the constant-free `e^{−s log s}` form with an explicit implied constant would move it a long way down | **no**; `Opera de Cribro` Lemma 6.8 and HR Thm 2.5 are `[NOT REACHED]` / `[MEMORY]` |
| the band is empty below level 131 | the same as above; the number is a direct function of the threshold | ran, `[SCRATCHPAD-GRADE]` SEC 4 |
| `B` is dimension 1 while the ensemble is dimension 2 | a demonstration that the entanglement beyond the `1/(p−1)` first order vanishes identically | **no** |
| the first power, not the square, is the right ratio model (§2d) | re-running the engine with `Bk[j]²` and finding the residual **improves** | **no**; one changed expression, one 12 s run |
| the argument of `ω` should be `ln(n/q)/ln y` | re-running the engine with the shifted argument and finding the `0.2%` residual at @23 **degrades** | **no**, and this is the single cheapest decisive experiment in this note: one changed expression at `natal-cap-28:204`, one 12 s run |
| the weight should be the rough-cofactor density in the head and middle | same experiment, second variant | **no** |
| the shallow theorem is where `B ≈ 1` | a level where `s_head ≥ 22.06` and `|B − 1|` is not negligible; §4 says none exists below @97 | ran for the levels in §4 only |

**Nothing here moves any exponent, and nothing here opens a route.** It converts
one of `TODO.md` item 8's two heuristics into a theorem with a stated scope, and
the scope excludes every level at which the heuristic has ever been used.

---

## 9. Source ledger

| item | tag | where |
|---|---|---|
| Fundamental lemma, `s ≥ 9κ+1`, error `e^{9κ−s}K^{10}` | `[CITED-REPO-PAGE]` | `history/staging/lit-pdf-halberstam-richert.md` §3, quoting Matomäki–Teräväinen arXiv:2301.07679 p. 33 Lemma 9.1; FI *Opera de Cribro* Lemma 6.8 attribution flagged unverified there |
| Halberstam–Richert fundamental lemma, Ch. 2 | `[CITED-REPO-PAGE]` at chapter level; Thm number `[MEMORY]` | same file, §"Item 3" |
| FI *Opera de Cribro* Thm 6.9 / Cor 6.10; Iwaniec–Kowalski Cor 6.10 | `[NOT REACHED]` | named in the brief, not seen |
| `β(2) ≤ 4.2665`, exact value unknown, no published lower bound | `[CITED-REPO-PAGE]` | Ford, *Sieve methods* Spring 2023 §3.1 + Table 1, via `import-rough-anatomy.md` §5.3 |
| `u = 2` is TPC for the `κ = 2` correction function | `[CITED]` | `import-rough-anatomy.md` §5.4; `bv-import-survey.md` §3.3 |
| `s ≲ 2.317`, `u*/2 = 1.783`, `Xmain/T = 5.631` at `β₂` | `[CITED]`, not recomputed | `history/staging/attack-roughpair-error.md` §5 |
| engine crossing `u = 3.557` at @97, `y* = 1.666e10`, `ln W = 83.72839` | `[CITED]`, not recomputed | `history/staging/u2-engine-depth.md` §§1–2 |
| RESULT 1/2/3, `B`'s definition, `0.890`, the `3.4%→0.2%` envelope | `[CITED]` | `natal-cap-28-analytic-certificate.js` header; `certificate-engine.md` §§1–4 |
| `cap_K` definition, A/B side conditions, Proposition 7 | `[CITED]` | `paper/staircase-note.md` §7 |
| Unification Law `(e^γω(u))²`, MEASURED ~1%, HL-conditional, `[2,3]` branch conjectural | `[CITED]` | `research/ATTACKS2.md` campaign verdict; `history/staging/shadow-buchstab.md` (HELD) |
| Comb Discrepancy Lemma, `2·3^k` | `[CITED]` | `natal-cap-25-excess-law.js`; `certificate-engine.md` status table |
| `K = 7/5`, thresholds, `s_head` table, band table, `c(u)` table | `[SCRATCHPAD-GRADE]` | `history/staging/thm-buchstab-transfer-shallow.js`, SEC 0–4 |
