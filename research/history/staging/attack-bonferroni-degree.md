# What degree does the Boole-Fréchet certificate need? DP1's one consumer, finished

<!-- ledger
id: Q-bonferroni-degree
status: CLOSED
todo: none
question: What degree does the Boole-Frechet certificate need, and does raising the degree reach an asymptotic bound?
verdict: Dead for asymptotics on a loop that closes on itself: raising the degree divides the over-certification exponent by the number of pairs without removing it (measured slopes 0.5441, 0.5425, 0.2816, 0.2937, 0.1695 at k = 2..6 against the predicted 1/(2 floor(k/2))), and Theorem A gives k >= (theta(x) - O(1))/(log G2 + O(1)), so the better the G2 bound assumed the higher the degree needed.
-->

*(2026-08-18. Companion computation: `research/attack-bonferroni-degree.js`,
bound to its own output by `research/qc/embed.js`; every figure below is in that
file's OUTPUT block. Legend as in `research/sift-limit-attack.md`: **[PROVEN]**
published theorem with source; **[VERIFIED]** checked computationally in this
repository; **[MEASURED]** empirical, finite range; **[ABSENT]** searched and
found nothing, with the channel and a same-session calibration probe named;
**[INFERRED]** our deduction from sourced facts.)*

---

## 1. The headline

**Dead for asymptotics, and the reason is a loop that closes on itself.**

`research/history/staging/attack-DP1-mechanism.md` found the one mechanism that
consumes the data DP1 discards and measured degree 2 losing by a growing factor.
The question it left open was what a higher degree does. The answer, in three
parts:

1. **Raising the degree divides the exponent by the number of pairs. It never
   removes it.** The over-certification factor `6L/G₂` at fixed degree `k` grows
   like `exp(θ(x)/(2⌊k/2⌋))`, which is exponential in `x` at every fixed degree.
   Measured `d ln(ratio)/dθ(x)` = `0.5441, 0.5425, 0.2816, 0.2937, 0.1695` at
   `k = 2, 3, 4, 5, 6` against the predicted `1/(2⌊k/2⌋)` =
   `0.5, 0.5, 0.25, 0.25, 0.1667`. [MEASURED, 5–7 levels each]
2. **The degree the certificate needs at `L = L_crit` provably diverges.**
   THEOREM A (§5, proved) gives the unconditional bound
   `k ≥ (θ(x) − O(1)) / (log G₂(x#) + O(1))`. Any polynomial bound
   `G₂(x#) = O(x^B)` — and `4.2665` is one — turns this into
   `k ≥ (1+o(1))·x/(B log x)`, which diverges faster than any power of `log x`.
   **The bound is self-defeating: the better the `G₂` bound you assume, the
   higher the degree the certificate needs to reproduce it.** [VERIFIED]
3. **The input does not run out, so there is one cause of death and not two.**
   Every `k`-point correlation of the sifted set on the tile is an exact finite
   Euler product, for every `k`, by the same one-line CRT argument that gives
   `J₅`. Verified against direct full-period enumeration, exact in every row tried. §6.

Two things came free. `x = 29` was enumerated in full (`M = 1,078,282,205`
slots), which confirms `G₂(29#) = 258` by exhaustive cyclic search and makes
every growth reading eight levels instead of six. And THEOREM A turns out to be
the **proof of a piece of moment arithmetic the corpus already carried as an
assumption**: `research/sift-limit-attack.md`:186 states without proof that
upgrading almost-all to all positions by moments alone "needs the `k`-th moment
at `k ≳ 2·ln W / ln(δl)`". That shape is now a theorem, up to a constant.

**So the verdict on DP1's only known consumer is: provably dead as a route to an
asymptotic improvement, and alive only as a finite-range mechanism.** That closes
the door, which is worth what an opening would be worth.

---

## 2. THEOREM V, the classification that made the computation possible

Everything is on the 6-lattice in SLOTS (`research/qc/units.js` §2): slot `s`
carries `n = 6s+5`, sieve form of `{0,−2}` (units.js §5), period `M = x#/6`
slots, `X_a` = survivors in the window of `L` slots at position `a`,
`n_v = #{a : X_a = v}`. `L_crit = G₂(x#)/6` exactly, so "no empty window of `L`
slots" is literally "`G₂(x#) ≤ 6L`". `t = L·d` is the mean window count at the
SLOT density `d`, never the per-integer density `d/6`.

A degree-`k` certificate is a polynomial `P`, `deg P ≤ k`, with `P(0) ≥ 1` and
`P(v) ≥ 0` for every integer `1 ≤ v ≤ L`. The sharp value is
`V_k(L) = min { Σ_v n_v P(v) : P admissible }`, and the certificate proves
`G₂(x#) ≤ 6L` iff `V_k(L) < 1`.

> **THEOREM V.** For `k ≤ L`, every vertex of the feasible set is
> `P(z) = Π_{i=1..m} (z−s_i)(z−s_i−1) / Π s_i(s_i+1)` for even `k = 2m`, and
> that same polynomial multiplied by `(L−z)/L` for odd `k = 2m+1`, with integers
> `s_i ≥ 1`, `s_i+1 ≤ L`.

The proof is four lines of sign analysis and is written out in the script's
header. It matters for two reasons. Computationally it turns an
`(L+1)`-variable LP into a minimisation over `⌊k/2⌋` integers, which is the only
reason degrees 3–6 at window lengths in the hundreds of thousands are reachable
at all. Structurally it says **the odd degree is nearly worthless**: the
odd-degree vertex is the even-degree vertex of the *same* `m` pairs multiplied by
`(L−z)/L ∈ [1 − X_max/L, 1]`, a factor that tends to 1 as the density falls. The
exponent is set by the number of PAIRS, not by the degree. That prediction is
confirmed in §4 to two decimals.

**Checked against the sharp LP.** The minimum over the vertex family agrees with
attack-D's exact BigInt-rational simplex on the full `(L+1)`-variable LP on
**59 of 59** rows to `1e−9`, and the restricted `s`-search agrees with an
exhaustive `s`-search on **59 of 59**. [VERIFIED]

---

## 3. The tile, one level further

| `x` | `M = x#/6` | survivors | `d` | `L_crit` slots | `6·L_crit` | `G₂(x#)` |
|---|---|---|---|---|---|---|
| 5 | 5 | 3 | 0.600000 | 2 | 12 | 12 |
| 7 | 35 | 15 | 0.428571 | 5 | 30 | 30 |
| 11 | 385 | 135 | 0.350649 | 7 | 42 | 42 |
| 13 | 5005 | 1485 | 0.296703 | 11 | 66 | 66 |
| 17 | 85085 | 22275 | 0.261797 | 18 | 108 | 108 |
| 19 | 1616615 | 378675 | 0.234239 | 25 | 150 | 150 |
| 23 | 37182145 | 7952175 | 0.213871 | 34 | 204 | 204 |
| **29** | **1078282205** | **214708725** | **0.199121** | **43** | **258** | **258** |

`x = 29` is new here and is an exhaustive full-period enumeration, not a sample.
It independently confirms `G₂(29#) = 258`. [VERIFIED]

---

## 4. TASK 1: what raising the degree buys, and the method it took to find out

### 4.1 Validity is not monotone in `L`, so a ladder is illegal

At `x = 17`, degree 2, the sharp value is `1.000818` at `L = 3149`, `0.987479`
at `L = 3150`, and `1.020035` at `L = 3151`. The degree-2 criterion carries the
term `frac(t)(1−frac(t))` with `t = L·d`, which oscillates with `L`, so the value
straddles 1 over a long stretch and dips below only at isolated `L`. A geometric
ladder with bisection — the obvious method, and the one tried first here —
returned `3386` instead of `3150`. **Every first-valid-`L` below is from an
exhaustive scan of consecutive `L`.** [VERIFIED]

### 4.2 Degree 2, exactly, at eight levels

Degree 2 needs only `m_1 = L·(#survivors)` and `m_2 = Σ_{|d|<L}(L−|d|)N_2(d)`
with `N_2(d) = Π_{5≤p≤x} ρ_p(d)` an exact integer, so `m_2` updates in `O(1)` per
`L` and the consecutive scan runs to `L ≈ 1.6·10⁶`. The recursion is validated
against the direct histogram on 16 of 16 rows; an off-by-one in its prefix sum
was caught exactly that way.

| `x` | first valid `L` | bound `6L` | true `G₂` | ratio | vs attack-D |
|---|---|---|---|---|---|
| 5 | 2 | 12 | 12 | 1.0 | agrees |
| 7 | 19 | 114 | 30 | 3.8 | agrees |
| 11 | 65 | 390 | 42 | 9.3 | agrees |
| 13 | 376 | 2256 | 66 | 34.2 | agrees |
| 17 | 3150 | 18900 | 108 | 175.0 | agrees |
| 19 | 19593 | 117558 | 150 | 783.7 | agrees |
| **23** | **202891** | **1217346** | **204** | **5967.4** | new level |
| **29** | **1614994** | **9689964** | **258** | **37558.0** | new level |

attack-D's degree-2 row is reproduced digit for digit at all six of its levels
and extended by two. The optimal pair is `s = ⌊t⌋` at every winning `L`,
confirmed against a wide `s` scan. [VERIFIED]

### 4.3 Degrees 3, 4, 5, 6

Exhaustive consecutive-`L` scan on the exact window histogram, with a fixed `L`
cap per level so the output is byte-reproducible; a degree not reached inside its
cap is reported as such.

| `x` | `k=2` | `k=3` | `k=4` | `k=5` | `k=6` |
|---|---|---|---|---|---|
| 5 | 2 | 2 | 2 | 2 | 2 |
| 7 | 19 | 13 | 5 | 5 | 5 |
| 11 | 65 | 35 | 17 | 7 | 7 |
| 13 | 376 | 315 | 35 | 33 | 22 |
| 17 | 3150 | 2660 | 162 | 139 | 49 |
| 19 | 19593 | 17250 | 518 | 418 | 133 |
| 23 | 202891 | not reached | 1805 | 1540 | 312 |
| 29 | 1614994 | — | — | — | — |

first valid `L`, in slots. Over-certification ratios `6L/G₂` at `x = 23`:
`5967.4` at `k = 2`, `53.1` at `k = 4`, `45.3` at `k = 5`, `9.2` at `k = 6`.
[MEASURED]

### 4.4 The headline, and it is not a slope

Fitting `ln(ratio)` against `x` on a log-log axis — what attack-D did, getting
`+5.20` — is fitting an exponential through a window six levels wide. The right
independent variable is `θ(x) = log(x#)`, and against it the relation is linear:

| `k` | levels | `d ln(ratio)/dθ(x)` | predicted `1/(2⌊k/2⌋)` | `1/k` | log-log slope vs `x` |
|---|---|---|---|---|---|
| 2 | 7 | 0.5441 ± 0.0140 | 0.5000 | 0.5000 | 6.82 ± 0.84 |
| 3 | 5 | 0.5425 ± 0.0320 | 0.5000 | 0.3333 | 5.52 ± 1.16 |
| 4 | 6 | 0.2816 ± 0.0140 | 0.2500 | 0.2500 | 3.31 ± 0.46 |
| 5 | 6 | 0.2937 ± 0.0219 | 0.2500 | 0.2000 | 3.35 ± 0.66 |
| 6 | 6 | 0.1695 ± 0.0140 | 0.1667 | 0.1667 | 1.92 ± 0.41 |

Three things are in that table. **The coefficient is `1/(2⌊k/2⌋)`, not `1/k`**,
exactly as THEOREM V predicts: `k = 3` behaves like `k = 2` (0.5425 against
0.5441) and `k = 5` behaves like `k = 4` (0.2937 against 0.2816). **The
certified bound is `~ (x#)^{1/(2⌊k/2⌋)}`**, exponential in `x` at every fixed
degree. And **the log-log slope does fall with degree**, `6.82 → 1.92`, which is
what the brief asked about — but it falls because the exponent of an exponential
is being divided, not because a power law is softening. Reading it as a slope is
what makes `+5.20` look like a growth law. It is a fit statistic.

**Consequence.** To hold the over-certification ratio bounded one needs
`2⌊k/2⌋ ≳ θ(x)/log G₂(x#)`, which is the same divergence §5 proves at `L_crit`,
arrived at from the opposite side. [INFERRED from the measured table]

---

## 5. TASK 2: the degree needed at `L = L_crit`, and THEOREM A

### 5.1 Eight levels

At `L = L_crit` the minimum window count is `X_min = 1`, forced: the record gap
is one slot longer than the longest empty run, so the window starting at the
survivor before it holds exactly one. The attained set is the integer interval
`[1, X_max]`.

| `x` | `L_crit` | `X_max` | `t` | `Var` | `k*` | `k* − X_max` |
|---|---|---|---|---|---|---|
| 5 | 2 | 2 | 1.2000 | 0.1600 | 2 | 0 |
| 7 | 5 | 3 | 2.1429 | 0.4653 | 4 | 1 |
| 11 | 7 | 5 | 2.4545 | 0.7674 | 5 | 0 |
| 13 | 11 | 7 | 3.2637 | 1.3039 | 8 | 1 |
| 17 | 18 | 9 | 4.7123 | 1.6633 | 10 | 1 |
| 19 | 25 | 11 | 5.8560 | 1.7302 | 12 | 1 |
| 23 | 34 | 13 | 7.2716 | 1.9925 | 14 | 1 |
| **29** | **43** | **16** | **8.5622** | **2.7099** | **16** | **0** |

`d log k*/d log x = 1.066 ± 0.099` over `x = 7..29` (7 levels), against
`1.127 ± 0.125` over the six levels attack-D had. `d log X_max/d log x =
1.208 ± 0.053`; `d log t/d log x = 1.091 ± 0.112`. [MEASURED]

**The growth law question is dissolved, not answered.** `t` has no free exponent
to fit: `t = (G₂(x#)/6)·d` with `d = Π_{5≤p≤x}(p−2)/p` exactly, verified to six
decimals at all eight levels. Fitting a power law to `t` is fitting a power law
to `G₂` itself, which is the open problem. The inherited candidate
`x^{1.70}/ln²x` overshoots `t` by a factor running `0.2969 → 0.3170` with no
trend — it is off by a constant near 3, and its local slope at the log-mean level
`x = 15.5` is `0.970` against a measured `1.091 ± 0.112`. Consistent, and
uninformative, exactly as attack-D said. **The claim should be dropped rather
than refined.**

### 5.2 THEOREM A, and it is the part that closes the door

> **THEOREM A.** Let `m = ⌊k/2⌋`. If a degree-`k` certificate succeeds at window
> length `L`, then
> > `M − κ_k  <  ( (X_max+1)(X_max+2)/2 )^m · (L/(L−X_max))^{[k odd]}`
>
> where `κ_k` is the largest total mass carried by any `k` values of the window
> histogram.

*Proof.* By THEOREM V the optimal `P` is the pair product, times `(L−z)/L` when
`k` is odd. For any integer `v ≥ 0` and integer `s ≥ 1` with `s ∉ {v−1, v}`, the
factor `(v−s)(v−s−1)` is a product of two integers of the same sign differing by
1, so it is `≥ 2`, and `(v−s)(v−s−1)/(s(s+1)) ≥ 2/((v+1)(v+2))`, minimised at
`s = v+1`. Let `U = ∪_i {s_i, s_i+1}`, so `|U| ≤ k`. Every `v` in the support
outside `U` therefore has `P(v) ≥ r^m` with `r = 2/((X_max+1)(X_max+2))`, times
the odd-degree factor. Since `Σ_v n_v P(v) < 1`, the mass outside `U` is below
`r^{−m}`. ∎

**Corollary.** `k ≥ 2·[log(M − κ_k) − log(L/(L−X_max))] / log((X_max+1)(X_max+2)/2)`.

The bound is unconditional and computable. Every `k` below `k_low` — the smallest
`k` for which (A) can hold at all — is *proved* unable to certify at `L_crit`.
At `k = k*` the `m` pairs already cover the whole support, so `κ_k = M` and (A)
goes vacuous; that is the theorem working, and the bite is one degree lower.

| `x` | `X_max` | `k_low` (proved floor) | `k*` measured |
|---|---|---|---|
| 5 | 2 | 1 | 2 |
| 7 | 3 | 2 | 4 |
| 11 | 5 | 3 | 5 |
| 13 | 7 | 4 | 8 |
| 17 | 9 | 5 | 10 |
| 19 | 11 | 6 | 12 |
| 23 | 13 | 7 | 14 |
| 29 | 16 | 8 | 16 |

`d log k_low/d log x = 1.021 ± 0.051` over `x = 7..29`. [VERIFIED]

**The asymptotic form.** The measured maximum point mass `p_max = n_max/M` runs
`0.51429` at `x = 7` down to `0.23031` at `x = 29`, so `κ_k ≤ k·M·p_max` and the
corollary reduces, whenever `k·p_max ≤ 1/2`, to
`k ≥ 2 log(M/2)/log((X_max+1)(X_max+2)/2)`. Now `log M = θ(x) − log 6 ∼ x` by the
prime number theorem, and `X_max ≤ L_crit = G₂(x#)/6`, so the denominator is at
most `2 log G₂(x#) + O(1)`. Hence

> `k*  ≥  (θ(x) − O(1)) / (log G₂(x#) + O(1))`.

Under `G₂(x#) = O(x^B)` this is `k* ≥ (1+o(1))·x/(B log x)`. **The Bonferroni
route is therefore dead for asymptotics, and the reason is stated rather than
measured: any bound the certificate is asked to prove feeds back into the degree
it needs, and the better the bound the higher the degree.** [VERIFIED]

Because the argument only ever uses `X_max ≤ L` and `log M ∼ x`, it does not
depend on our particular tile. It is a statement about degree-`k` moment
certificates on any set of density `→ 0` over a period of size `M`.

### 5.3 This proves an estimate the corpus already carried

`research/sift-limit-attack.md`:186 says, of upgrading almost-all to all
positions by moments alone, that it "needs the `k`-th moment at
`k ≳ 2·ln W / ln(δl)`". With `W = x#` integers and `δl = t` that is the same
shape as the corollary. THEOREM A proves the shape, and the measured `k*` sits
between the proved floor and the corpus estimate at every one of seven levels:

| `x` | THEOREM A floor | `k*` | corpus estimate `2 lnW/ln t` | `k*`/floor | `k*`/estimate |
|---|---|---|---|---|---|
| 7 | 3.088 | 4 | 14.032 | 1.295 | 0.285 |
| 11 | 3.911 | 5 | 17.251 | 1.279 | 0.290 |
| 13 | 4.754 | 8 | 17.432 | 1.683 | 0.459 |
| 17 | 5.665 | 10 | 16.957 | 1.765 | 0.590 |
| 19 | 6.563 | 12 | 18.204 | 1.829 | 0.659 |
| 23 | 7.491 | 14 | 19.378 | 1.869 | 0.722 |
| 29 | 8.269 | 16 | 21.040 | 1.935 | 0.760 |

The proved floor is low by a factor climbing `1.295 → 1.935`, and the corpus
estimate is high by a factor falling toward 1 (`k*`/estimate runs
`0.285 → 0.760`). **A line that was moment arithmetic is now a theorem, and the
estimate it stated is converging on the truth from above.** [VERIFIED]

---

## 6. TASK 3: the input does not run out

`S_k = Σ_a binom(X_a,k)` is `M` times the sum, over every `k`-subset of the
window, of the `k`-point correlation of the sifted set at the corresponding lag
vector. So degree `k` needs the `k`-point correlation, and the brief's hypothesis
was that our proven structure — the exact `J₅` pair correlation
(`paper/variance-note.md` Theorem 1) and the mod-30 five-lag rigidity — runs out
somewhere and kills the certificate a second, independent time.

**It does not.** The survivor set is cut out by independent local conditions, one
per prime, so for any slot-lag vector `(d_1..d_{k−1})` the `k`-point count over
the period is the exact integer

> `N_k = Π_{5≤p≤x} ρ_p(d)`,  `ρ_p(d) = p − |R ∪ (R−d_1) ∪ … ∪ (R−d_{k−1})|`

with `R = {r_0, r_1}` the two killed SLOT classes mod `p`. This is `J₅`'s
argument with `k` shifts instead of one, and it is available for every `k` with
no new theorem. Verified against direct full-period enumeration at `x = 7, 11,
13` for `k = 2, 3, 4, 5`: **`12/12` exact at `k = 2` and `40/40` exact at
`k = 3, 4, 5`, in every one of the twelve rows.** [VERIFIED]

*(The first draft of that table wrote `R = {0, −2}`, the INTEGER classes, on the
SLOT lattice. It passed every row at `x = 7` by coincidence and failed part of
every block at `x = 11` and `x = 13`. `units.js` §2 again, and it is worth
recording that the wrong lattice produced a plausible-looking partial agreement
rather than an obvious failure.)*

**What is expensive is the assembly, not the data.** Forming `S_{k*}` at `L_crit`
needs `C(L_crit−1, k*−1)` distinct lag vectors: `4, 15, 120, 2.43×10⁴,
2.50×10⁶, 5.73×10⁸, 9.87×10¹⁰` at `x = 7..29`. That is a cost, not an
obstruction, and it is dwarfed by §5's degree bound.

**TASK 3 VERDICT: there is one cause of death, not two.** The certificate dies of
the degree. Saying it also dies of missing input would be wrong.

---

## 7. Not `natal-cap-06`'s Bonferroni

`research/natal-cap-06-bonferroni.js` runs Bonferroni over the SIEVE CLASSES
`A_q`; its terms `|A_T|` are divisor-class counts, which is one-point data and
therefore inside DP1, and its depth is the hit multiplicity `h(r)`. Its reading 5
(`research/natal-cap-06-bonferroni.js`:319-320) records "needed depth marches
1,3,3,5,5,7,…,15 by @127. The depth itself grows only like `ln ln W`".

Everything above runs Boole-Fréchet over the SURVIVOR EVENTS; its terms are
correlations of the sifted set, which is outside DP1, and its depth is the window
count `k*`, which grows as a power of `x`. Two quantities, two objects, and the
script prints `k*` beside `natal-cap-06`'s own level anchors — depth 1 dies after
@11, depth 3 between @17 and @19, depth 5 by @29, 15 by @127 — **without
inventing a per-level alignment the source does not give**. The apparent conflict
between "diverges polynomially" and "grows like `ln ln`" is not a conflict, and
attack-D §4 is right to insist on it.

---

## 8. The literature, searched properly this time

attack-D §7 recorded that its three literature children and two grandchildren all
died without reporting, and retired its claim that the mechanism is unrepresented
in the sieve literature as unsupported. That claim is now settled, and **the
answer is that the mechanism IS represented**. Owning conventions per
`research/SEARCH-CONVENTIONS.md` §§1–2; every negative below names its channel
and a same-session calibration probe, and the ones that do not clear that bar are
marked as such rather than counted.

**Channels and calibration, all run 2026-08-18 in this session.**

- **arXiv Atom API** (`export.arxiv.org`). Calibration: `all:electron` →
  **185050**; `abs:"sifted set"` → **4**. Both match the values
  `attack-DP1-mechanism.md` §7 records from the dead session, so the channel is
  the same channel and it works. PASS.
- **zbMATH open API** (`api.zbmath.org`). Calibration: a search for the
  Diamond–Halberstam higher-dimensional sieve book returns it as hit 1 of 2.
  PASS. Metadata only; review text is not exposed.
- **WebSearch**, and **GDZ / Göttinger Digitalisierungszentrum** page images for
  *Math. Ann.* vol. 267, reached through zbMATH → EuDML → the GDZ IIIF manifest.

### 8.1 The precedent exists, and it is Friedlander

**J. B. Friedlander, "Moments of sifted sequences", Math. Ann. 267 (1984)
101–106** (Zbl 0516.10041, MSC 11N35 / 11N05 / 11L03; bibliographic record
retrieved first-hand on the zbMATH API this session). Owning convention: sieve
methods, moments of gaps in a sifted sequence.

Read from the GDZ page images of pp. 101–102 by the literature agent this
session: the main theorem is that for `S(α)` the integers with no prime factor
below `m^α`, there is `α₀ > 0` such that for `0 < α < α₀` and fixed
`0 ≤ γ < 2`, `Σ_{s_n ≤ X} (s_{n+1} − s_n)^γ ≪ X log^{γ−1} X`; and its
Proposition 1 is a **second-moment bound for the count of survivors in short
intervals**, `∫_X^{2X} |Σ_{y<n≤y+Δ} θ_n − Δ Σ_d λ_d/d|² dy`, integrated over the
starting point, which is then fed forward to the gap-moment bound.

**That is our mechanism at `k = 2`, in print, in 1984**: a variance of the
sifted-set count over window positions, used as an upper bound to control gaps.
The direction is the same as ours (an upper bound on fluctuation converted into
a statement about gaps), not the opposite. [PROVEN, with the caveat below]

*Custody caveat, and it is real.* The bibliographic record I verified myself. The
theorem statement and Proposition 1 come from a literature agent's reading of the
GDZ page images in this session; **I did not open the page images myself**, so
this is one remove from a page image rather than zero. It should be re-read
before it is quoted in the paper.

### 8.2 The rest of the map

- **Gorodetsky, "The variance of integers without small prime factors in short
  intervals", arXiv:2111.00853, Math. Z. (2024).** Abstract read first-hand.
  Computes the variance of a sifted count in short intervals unconditionally, and
  finds it "asymptotically smaller than the naive probabilistic prediction once
  the length of the interval is at least a power of `y`" — that is the
  sub-Poisson behaviour we measure, in print, unconditional. It does not do gaps.
  **This is the live modern home of our variance object, and it does not use the
  word "sifted" in its abstract**; the owning convention is "integers without
  prime factors below `y`". That is a `SEARCH-CONVENTIONS.md` §1 row we do not
  have and should.
- **Brady, "A semidefinite framework for the sieve", arXiv:2112.02722.** Its
  decision variable is `A_ij = P_μ[i ∈ X ∧ j ∈ X]`, a genuine pairwise
  correlation matrix of the sifted set, generalising the Large and Larger Sieves
  and explicitly handling `κ_p > 1` classes per modulus. Its abstract states "no
  new sieve-theoretic bounds are proved". **A framework with our input and no gap
  output.** The repo's closed-route list names "Brady/Li fractional retention",
  which is a different result of the same author and does not close this one.
- **The "Hough Lemma 3.2" in attack-D §7 is misattributed.** The statement "if
  `(1/(4δ(1−δ)))·Σ_k E_{k−1}[α_k(x)²] < 1` then `A` does not cover `Q`" is
  Lemma 3.2 of **Balister–Bollobás–Morris–Sahasrabudhe–Tiba, "Erdős covering
  systems", arXiv:2211.01417** — an expository note on the distortion method,
  which I confirmed first-hand is exactly that. Hough's Annals paper numbers its
  lemmas 2, 4, 5, 7 and uses bias statistics `β_k(i)`, not this notation. And the
  quantity being squared there is `α_k(x)`, the **fraction of a single fibre
  covered in one round** — a one-point per-fibre quantity, not a pair correlation
  of the uncovered set. Its ambient must be a CRT product and its hyperplanes
  carry **one** residue class per modulus. **So it is the right logical shape and
  the wrong input, and it does not apply to a two-class system as stated.**
- **FKMPT, "Long gaps in sieved sets", JEMS 23 (2021).** The remark our object
  appears in is **Remark 4**, not Remark 7; verbatim it names the two-dimensional
  system `I_p = {0, 2 mod p}`, gives the trivial bound `≫ log X log₂ X` there,
  and says "a sieve upper bound … combined with the pigeonhole principle already
  gives `≫ log² X`". Verified by a literature agent against the Dartmouth-hosted
  PDF this session.
- **Paseman, arXiv:1311.5944.** Uses Bonferroni inequalities on Jacobsthal's
  function, but the Bonferroni sums run over **subsets of the prime divisors** —
  divisor-lattice events, inside DP1. A cousin of `natal-cap-06`, not of this.
- **Ziller–Morack, arXiv:1706.03668** (paired Jacobsthal computation to primes
  ≤ 73) surfaced again and is already in the corpus (`research/U-FRAME.md`:615).
  No new prior art there.

### 8.3 The negatives, with channels

All on the arXiv Atom API with the calibration above passing, run this session:

| query | hits |
|---|---|
| `abs:"Bonferroni" AND cat:math.NT` | 1 (Paseman 1311.5944) |
| `all:"Hunter-Worsley"` | 0 |
| `abs:"binomial moment" AND abs:"sieve"` | 0 |
| `abs:"large gaps" AND abs:"sifted"` | 0 |
| `abs:"variance" AND abs:"sifted" AND cat:math.NT` | 0 |
| `all:"moments of sifted sequences"` | 0 |

On zbMATH, `Bonferroni sieve` returns 10 records of which exactly one is MSC 11
(Tao 2024, on an Erdős alternating series, not this).

**The last negative is the instructive one.** `abs:"variance" AND abs:"sifted"`
in `math.NT` returns zero, and Gorodetsky's paper — which is precisely that
object — is one of the things it misses, because its abstract says "integers
without prime factors below `y`". This is the `SEARCH-CONVENTIONS.md` failure
mode reproducing itself in a new place: a clean, calibrated negative that is
worthless because it was run in the wrong vocabulary. **[ABSENT] is therefore
NOT claimed for the mechanism.** The honest statement is: the degree-2 member is
published (Friedlander 1984, Gorodetsky 2024), the pair-correlation-as-SDP
framing is published (Brady 2021), and **no source found does the degree-`k`
Boole-Fréchet member with `k ≥ 3` on a sifted set** — a negative I record as
unresolved rather than clean, because the owning convention for "degree-`k`
Bonferroni" lives in probability (Galambos–Simonelli, *Bonferroni-type
Inequalities with Applications*, Springer 1996, which advertises prime-number
applications and which nobody has opened), and that book was not read.

---

## 9. Corrections to the record, drafted here and not applied

1. **`attack-DP1-mechanism.md` §1.4 and §5: "log-log slope +5.20" should not be
   quoted as a growth law.** The numbers are right and are reproduced here. The
   relation is `ln(ratio)` linear in `θ(x)` with coefficient `1/(2⌊k/2⌋)`;
   `+5.20` is that exponential fitted on a log-log axis over six levels. The
   value re-measured here over seven levels is `6.82 ± 0.84`, which moves with
   the range because it is a fit statistic and not a slope.
2. **`attack-DP1-mechanism.md` §5: the "first valid `L`" search needs its
   monotonicity caveat.** Validity is not upward closed in `L` (`1.000818`,
   `0.987479`, `1.020035` at `L = 3149, 3150, 3151`, `x = 17`). attack-D's linear
   scan is correct; the document does not say that a ladder would not be, and it
   should.
3. **`attack-DP1-mechanism.md` §2 and the brief both price DP1 at "2.32 of the
   3.2665 total, 71 per cent".** The live body of `research/sift-limit-attack.md`
   gives `DP1 = +2.1945` and `DP2+DP3 = +1.0719` of `4.2665` (line 603-604) and
   restates it as "DP1 is 2.19 of the 3.27 and DP2+DP3 together are 1.07" (line
   613-614), i.e. **67 per cent**. The `2.32 / 71%` pair appears only inside a
   draft-changelog blockquote at lines 661-662. One of the two is stale and the
   file should not carry both. Flagged, not adjudicated.
4. **`attack-DP1-mechanism.md` §7: "Hough … Lemma 3.2" is misattributed** to
   Hough, Ann. of Math. 183 (2016). It is Lemma 3.2 of BBMST arXiv:2211.01417,
   and its second-moment input is a one-point fibre-coverage fraction, not a
   correlation of the uncovered set.
5. **`attack-DP1-mechanism.md` §7: FKMPT's remark is Remark 4, not Remark 7.**
6. **`attack-DP1-mechanism.md` §3(iv) and §9: the `x^{1.70}/ln²x` candidate law
   should be dropped, not carried as unresolved.** `t = (G₂(x#)/6)·d` exactly, so
   fitting an exponent to `t` is fitting one to `G₂`. There is no free parameter
   to resolve.
7. **`attack-DP1-mechanism.md` §9's reach ("to `x = 23`") is superseded**: the
   full period at `x = 29` (`M = 1,078,282,205` slots) is enumerated here, and it
   confirms `G₂(29#) = 258`.
8. **`research/SEARCH-CONVENTIONS.md` §1 wants a new row.** Object: the variance
   of a sifted count in short intervals. Owning convention: **"integers without
   prime factors below `y`"**, "`y`-rough numbers", *not* "sifted set". Home:
   Gorodetsky arXiv:2111.00853; Friedlander, Math. Ann. 267 (1984) 101–106. A
   second row: degree-`k` Bonferroni / Boole-Fréchet bounds are owned by
   probability (Galambos–Simonelli 1996), and searching them in a number-theory
   category returns near-silence that is not evidence.

---

## 10. Draft entry for `research/history/CHANGELOG.md`

> **2026-08-18. The Boole-Fréchet certificate's required degree is proved to
> diverge, and DP1's only known consumer is closed for asymptotics.**
> `research/attack-bonferroni-degree.js` finishes the verdict
> `history/staging/attack-DP1-mechanism.md` half-reached.
>
> NEW, THEOREM V: every vertex of the degree-`k` certificate polytope is
> `Π_i (z−s_i)(z−s_i−1)/Π s_i(s_i+1)` for even `k`, times `(L−z)/L` for odd `k`.
> Verified against the exact rational simplex on 59 of 59 rows. Consequence: one
> extra ODD degree is worth a bounded factor `1/(1−d+o(1))` and nothing more.
>
> NEW, THEOREM A: a degree-`k` certificate at window length `L` forces
> `M − κ_k < ((X_max+1)(X_max+2)/2)^{⌊k/2⌋}·(L/(L−X_max))^{[k odd]}`, hence
> `k* ≥ (θ(x) − O(1))/(log G₂(x#) + O(1))`. Under any polynomial `G₂ = O(x^B)`
> this is `≥ (1+o(1))x/(B log x)`. **The Bonferroni route is dead for
> asymptotics**, and the reason is that the bound feeds back into the degree.
> This also proves, up to a constant, the moment arithmetic
> `research/sift-limit-attack.md`:186 already carried as an assumption.
>
> NEW, MEASURED: over-certification ratio `6L/G₂` at fixed degree grows like
> `exp(θ(x)/(2⌊k/2⌋))`. Measured `d ln(ratio)/dθ(x)` = `0.5441, 0.5425, 0.2816,
> 0.2937, 0.1695` at `k = 2..6` against predicted `0.5, 0.5, 0.25, 0.25, 0.1667`.
>
> NEW LEVEL: `x = 29` enumerated in full, `M = 1,078,282,205` slots. Confirms
> `G₂(29#) = 258`. `k*` = 2, 4, 5, 8, 10, 12, 14, 16 at `x = 5..29`,
> `d log k*/d log x = 1.066 ± 0.099`.
>
> RETIRED: "raising the degree might reduce the slope toward 0". It divides the
> exponent of an exponential by `2⌊k/2⌋`. The log-log slope does fall,
> `6.82 → 1.92` over `k = 2..6`, and that is a fit statistic, not a growth law.
>
> RETIRED: the hypothesis that the `k`-point input runs out. Every `k`-point
> correlation of the sifted set on the tile is an exact Euler product,
> `N_k = Π_p ρ_p(d)` with `ρ_p` counted over the SLOT classes, verified against
> direct enumeration and exact in all twelve rows tried. There is one cause of
> death.
>
> RETIRED: "the mechanism is unrepresented in the sieve literature". Friedlander,
> *Moments of sifted sequences*, Math. Ann. 267 (1984) 101–106 is the degree-2
> member in print — a second moment of the sifted count over window positions,
> fed forward to a bound on gap moments. Gorodetsky arXiv:2111.00853 is the
> modern unconditional variance. Brady arXiv:2112.02722 is the pairwise
> correlation as an SDP, with no gap output. The `k ≥ 3` member is not found, and
> that negative is recorded as unresolved because Galambos–Simonelli was not
> read.
>
> CORRECTED: "Hough's Lemma 3.2" is BBMST arXiv:2211.01417 Lemma 3.2, and its
> second-moment input is a one-point fibre-coverage fraction. FKMPT's remark on
> `I_p = {0, 2 mod p}` is Remark 4, not Remark 7.
>
> METHOD: validity of the certificate is NOT monotone in `L`
> (`1.000818 / 0.987479 / 1.020035` at `L = 3149/3150/3151`, `x = 17`, degree 2),
> so a geometric ladder overshoots the first valid `L` — it returned 3386. Every
> first-valid-`L` figure must come from a consecutive scan.

---

## 11. Reach, and what is not established

Exact full-period enumeration to `x = 29`, `M = 1,078,282,205` slots. `x = 31`
needs thirty-one times that and was not attempted. Every growth statement rests on at
most eight levels and is marked [MEASURED] for that reason; the two theorems are
not, and hold for every `x`.

**Not established.** That `k*` equals `X_max` or `X_max+1` in general — it does
at all eight levels, and THEOREM A only brackets it from below by about a factor
2. That degree 3 at `x = 23` and any degree above 2 at `x = 29` reaches a valid
`L` where this scan stopped; those rows say "not reached" and mean it. That the
`k ≥ 3` Boole-Fréchet member is absent from the literature — Galambos–Simonelli
1996 was identified as its owning convention and not opened, and until it is that
negative stays unresolved. That Friedlander's Proposition 1 says what §8.1 says
it says at the level of a page image I read myself; one agent read it, and it
should be re-read before publication.

**Not touched.** THEOREM A constrains the certificate at `L = L_crit`. It says
nothing about certificates that use data the moment LP does not encode — the
spectral form of the same correlations, for instance — and nothing about the
`4.2665` exponent from below. This is a closed door, not a new route.

*History for every claim in this file: `research/history/CHANGELOG.md`.*
