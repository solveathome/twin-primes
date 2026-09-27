# Foreign import 4: max-plus (tropical) spectral theory and subadditive ergodic theory

<!-- ledger
id: Q-import-maxplus
status: ANSWERED
todo: none
question: Do max-plus (tropical) spectral theory and subadditive ergodic theory bound the fold recursion's growth exponent?
verdict: The mapping is exact rather than an analogy - the fold is p-fold cyclic duplication followed by max-plus state elimination and the copy theorem is a semiring identity, verified at 6 of 6 folds - but the tropical Perron root of the tile is the mean gap mbar, not G2, so the import delivers a structural negative, a sharpening of A5's Theorem A, and refuses the growth exponent.
-->

*2026-08-19. Import 4 of 5 on the fold recursion's growth exponent. Producers:
`research/import-maxplus-01-mapping.js` (4.0 s, `code-sha256 2388de5a`,
`out-sha256 1e23bdc9`, formal embed, streams stdout+stderr, eleven numbered
readings in the script's own tail) and
`research/import-maxplus-02-subadditivity.js` (0.9 s, `code-sha256 8ad8cb9e`,
`out-sha256 e383ddc7`, formal embed, eleven numbered readings). Legend as in
`research/sift-limit-attack.md`: **[PROVEN]** published theorem or a proof given
here; **[VERIFIED]** checked computationally here; **[MEASURED]** empirical,
finite range; **[INFERRED]** deduction from sourced facts.*

**Assignment.** Import max-plus linear algebra and subadditive ergodic theory
onto the fold recursion, and see whether either delivers a **convergence
theorem** — the normalized log growth of `G₂` has a limit — which would be the
first movement on TODO item 1d even without computing the limit. Stage 1: the
mapping, precisely, and what does not close. Stage 2: the subadditivity hunt.
Stage 3: the Perron question and the record words. Stage 4: the verdict.

---

## 0. The verdict, up front

> **The mapping is exact and it is not an analogy: the fold is `p`-fold cyclic
> duplication followed by max-plus state elimination, and the copy theorem is a
> semiring identity. [VERIFIED, 6 of 6 folds]. The import then delivers three
> things and refuses the fourth.**
>
> 1. **A negative that is structural.** The tropical Perron root of the tile is
>    the MEAN gap `m̄ = W/D`, Mertens, not `G₂`. `G₂` is the operator NORM. Max-plus
>    spectral theory applied to the natural operator answers a question the
>    corpus already answered, and the whole growth sits in `G₂/λ`, which runs
>    1.2000 to 7.2716 over `x = 5..23`. **[VERIFIED]**
> 2. **A sharpening of a proven theorem.** A5's Theorem A is min-plus
>    Perron–Frobenius on a two-state automaton, `c_min = 3p` is its eigenvalue,
>    and `c_min(j)` is not "about `3pj`" but exactly `3pj − (p+2)[j odd]` for
>    `p ≡ 1 (6)` and `3pj − (p−2)[j odd]` for `p ≡ 5 (6)`. **[VERIFIED, 11 primes,
>    j ≤ 6]** The record runs attain it at 6 of 6 folds with `L ≥ 2`.
> 3. **A measurement of the closure gap.** All `p` alignments of a fold share ONE
>    plain maxsum vector, so the alignment spread IS the information a
>    finite-dimensional max-plus state loses: 0.9163 nats at `x = 5` falling to
>    0.0834 at `x = 17`, and still 0.0901 at `x = 29`. **[VERIFIED / cited]**
> 4. **And no convergence theorem.** Kingman fails on non-stationarity, Fekete
>    fails on the absence of a composition. The one exact Fekete inequality in
>    the problem is max-plus norm submultiplicativity, whose limit is `m̄`. What
>    survives is a **CANDIDATE**, `G₂((st)#) ≤ C·G₂(s#)·G₂(t#)`, which holds at
>    104 of 104 testable pairs with `C = 2.9333` — and which, with any explicit
>    constant, is **TPC-implying**.

**One live warning for TODO 1d, and it is bookkeeping rather than a
measurement.** 1d's headline number `+0.05 ± 0.11` is one of four window
conventions in `attack-block-01-ladder.md` §6, three of which are negative, and
all four are **nine-term** readings taken before A144311's eight extra terms
were in play. On the eighteen-term window the same estimator — validated here
against four corpus figures — reads `−0.1818 ± 0.0319` for the slope of
`ln(G₂/x²)`, and that is `attack-growth-law.md`'s 1.546 restated, not a new
result. The Overshoot Budget's own slack column says the same thing in its own
units: `ln(x²/G₂)` rises 1.0581 at `x = 11` to 1.2946 at `x = 79`, monotone over
the last eight terms, where `gate-multiplies.md` §5 reads it as flat on fourteen.

---

## 1. Stage 1: the mapping, precisely

### 1a. The state that closes is the transfer matrix, not the maxsum vector

Write the tile `T_x` as its cyclic gap word `g_0..g_{D−1}`, `D = ∏_{3≤q≤x}(q−2)`.
Let `A(T)` be the `D × D` matrix over the max-plus semiring `(ℝ ∪ {−∞}, max, +)`
with `A[i][i+1 mod D] = g_i` and `−∞` elsewhere. Then

> **`‖A^{⊗m}‖_max = maxsum_m(T)` exactly, and `G₂ = maxsum_1 = ‖A‖_max`.
> [VERIFIED by DENSE max-plus matrix powers, `x = 5, 7, 11`, `m ≤ 8`]**

At every power the count of finite entries is exactly `D` and every one lies on
the `+m` diagonal, so the tile digraph is a single circuit and nothing else.

### 1b. The fold is duplication followed by max-plus state elimination

> **Step A.** Replace the circuit of length `D` by the circuit of length `pD`
> (`p` copies laid end to end; the copies abut exactly, because `g` is the
> *cyclic* gap word).
> **Step B.** In copy `k` eliminate the vertices whose old index has residue in
> `{−kw, −kw−2} (mod p)`, `w = W mod p`. Eliminating a degree-`(1,1)` vertex `v`
> in max-plus replaces `A[u][v], A[v][w]` by `A[u][w] = A[u][v] ⊗ A[v][w]`, the
> SUM of the two gaps. That is Gaussian elimination in the semiring.

**[VERIFIED, 6 of 6]** The word that comes out is the true fold, gap for gap,
with cyclic shift 0, at folds `3→5, 5→7, 7→11, 11→13, 13→17, 17→19`, the last of
which has 378,675 gaps.

So U-FRAME §5a step 2's copy theorem is not merely *reminiscent* of max-plus. It
is a max-plus identity, and this is the statement of which semiring and which
operation.

### 1c. What does NOT close, and by how much

The state that closes under folding is the **whole matrix**, equivalently the
whole gap word, of dimension `D = ∏(q−2)`. The finite reduction
`(maxsum_1, …, maxsum_M)` does not close, and the reason is exact: **the
elimination pattern is a function of the residues of the partial sums mod `p`,
which the maxsum vector does not carry.**

The defect is measurable without any modelling, and the argument is one line.
All `p` alignments of a fold act on **one** tile, so they share **one** plain
maxsum vector. Any reduction of the state to that vector must therefore predict a
**single** value of `Δ_m(x, p, a) = maxsum_m(T_x minus classes {a, a−2} mod p)`.
The observed spread across alignments is exactly what the reduction throws away.

| `x` | `p` | `min_a Δ_1` | `max_a Δ_1` | `max/min` | ln spread (nats) | source |
|---|---|---|---|---|---|---|
| 5 | 7 | 12 | 30 | 2.5000 | 0.9163 | recomputed here |
| 7 | 11 | 30 | 42 | 1.4000 | 0.3365 | recomputed here |
| 11 | 13 | 48 | 66 | 1.3750 | 0.3185 | recomputed here |
| 13 | 17 | 90 | 108 | 1.2000 | 0.1823 | recomputed here |
| 17 | 19 | 138 | 150 | 1.0870 | 0.0834 | recomputed here |
| 19 | 23 | 180 | 204 | 1.1333 | 0.1252 | recomputed here |
| 23 | 29 | 222 | 258 | 1.1622 | 0.1503 | **cited**, `attack-0c0e-01-deleted-family.js` (a) |
| 29 | 31 | 318 | 348 | 1.0943 | 0.0901 | **cited**, same |

**The defect shrinks with depth and does not vanish.** At the deepest measured
level it is still 0.09 nats. There is no finite-dimensional max-plus state for
this recursion at any truncation `M`, and the table is the measurement of by how
much. **[VERIFIED for `x ≤ 19`; the last two rows are cited, not recomputed]**

### 1d. The A9 connection, stated precisely

`U-FRAME.md` §11 records the histogram transfer operator as prior art (Holt and
Rudd 2014 §5, `M_J` bidiagonal). The precise relation is:

> **Holt's operator is the same object over the COUNTING semiring; the fold
> operator of §1a–1b is its TROPICALIZATION.** [INFERRED, from the two
> constructions]

The two Perron roots are the same Mertens fact in two semirings. The counting
operator multiplies the state's dimension by `p−2` (the `D` column reads
3, 15, 135, 1485, 22275, 378675, 7952175 — ratios 5, 9, 11, 15, 17, 21). The
tropical eigenvalue multiplies by `p/(p−2)` (the `λ` column reads 10.0000,
14.0000, 17.1111, 20.2222, 22.9185, 25.6148, 28.0543). **[VERIFIED]**

And the trade is the whole difficulty in one sentence. The counting operator is
**closed** on the histogram, which is why `U-FRAME` §11 calls it an exact
simulator and no source of bounds. The tropical operator would give bounds
directly and is **not closed** on the maxsum vector, by §1c. **Tropicalization
buys the bound and loses the closure.**

---

## 2. Stage 3: the Perron question, answered in both semirings

### 2a. The max direction: the Perron root is Mertens, and `G₂` is the norm

Karp's maximum cycle mean, run on the digraph without ever being told `W` or `D`,
returns `W/D` to nine decimals at `x = 5, 7, 11, 13`. The tile digraph is a single
circuit, so the max-plus **cyclicity is `D` and the transient is 0**: `maxsum_{m+D}
= maxsum_m + W` at all fifteen tested cells, exactly, including `m = 1` and
`m = D`. Fekete's limit `maxsum_m/m → m̄` is therefore attained at the period and
repeats, rather than being approached. **[VERIFIED]**

| `x` | `D` | `λ = m̄` | `‖A‖ = G₂` | `G₂/λ` | `λ/ln²x` |
|---|---|---|---|---|---|
| 5 | 3 | 10.0000 | 12 | 1.2000 | 3.8606 |
| 7 | 15 | 14.0000 | 30 | 2.1429 | 3.6973 |
| 11 | 135 | 17.1111 | 42 | 2.4545 | 2.9759 |
| 13 | 1485 | 20.2222 | 66 | 3.2637 | 3.0738 |
| 17 | 22275 | 22.9185 | 108 | 4.7123 | 2.8551 |
| 19 | 378675 | 25.6148 | 150 | 5.8560 | 2.9545 |
| 23 | 7952175 | 28.0543 | 204 | 7.2716 | 2.8536 |

`λ/ln²x` descends toward `e^{2γ}/(2C₂) = 2.4009` from above. **The eigenvalue
carries none of the growth.** Everything is in `G₂/λ`, which has to grow like
`x^{β−o(1)}`. This is the import's first honest negative and it is structural,
not a failure of range: there is no version of max-plus Perron theory that makes
an operator norm into an eigenvalue.

### 2b. The eigenvector, and the fact that `G₂` is a small part of it

For a single circuit the max-plus eigenvector is the tilted partial-sum word
`u_i = S_i − i·m̄`, which is `D`-periodic because `Σg = W = D·m̄`. Then, exactly,

> `max_i u_i − min_i u_i = max over all windows of (window sum − m·m̄) = max_m (maxsum_m − m·m̄)`.

Verified against an independent `O(D²)` scan at all five levels where `D` allows
it. The reading is not what the assignment expected:

| `x` | spread`(u)` | argmax `m` | `G₂ − m̄` | spread`/G₂` | spread`/m̄` |
|---|---|---|---|---|---|
| 5 | 4.000 | 2 | 2.000 | 0.3333 | 0.400 |
| 7 | 28.000 | 7 | 16.000 | 0.9333 | 2.000 |
| 11 | 84.889 | 55 | 24.889 | 2.0212 | 4.961 |
| 13 | 138.222 | 251 | 45.778 | 2.0943 | 6.835 |
| 17 | 336.563 | 2081 | 85.081 | 3.1163 | 14.685 |
| 19 | 849.274 | 245506 | 124.385 | 5.6618 | 33.156 |
| 23 | 1507.536 | 232994 | 175.946 | 7.3899 | 53.736 |

**The tile's largest excess over its own mean is 7.4 times `G₂` at `x = 23` and
growing, and it is realised by a window of 232,994 gaps rather than by the record
gap.** So `G₂` is a small part of the tropical eigenvector's amplitude. That is a
fact about the object no instrument in the corpus had reported, and it is the
reason the Perron reading does not transfer: the spectral object and the target
object are not the same object. **[VERIFIED]**

### 2c. The min direction: A5's Theorem A **is** a Perron theorem

`kappa-not-L.md`'s Alternation Lemma says a run is a walk on two states: from
class `a` only gaps `≡ 0` or `−2 (mod p)` are legal, from `a−2` only `0` or `+2`.
Grain gaps are multiples of 6, so the least legal gap in each class is exact.
Assemble them into the **min-plus** matrix

```
        B_p = [ [ 6p,      c(−2) ],
                [ c(+2),   6p    ] ],
        c(−2), c(+2) = 2p−2, 4p+2  (p ≡ 1 mod 6)   or   4p−2, 2p+2  (p ≡ 5 mod 6).
```

> **`c_min = 3p` is the MINIMUM CYCLE MEAN of `B_p`, i.e. its min-plus
> Perron root; the critical circuit is the 2-cycle `P → M → P` of weight `6p`;
> the min-plus eigenvector is `(0, 3p − c(−2))`.** **[VERIFIED at all 23 primes
> from 5 to 97, by Karp, plus the eigenvector equation at all 23]**

Two consequences, and the second is new.

**(i) The 3/2 is sharp because it is an eigenvalue.** `kappa-not-L.md` records
"the alternation condition is worth exactly 3/2 and no more: it raises the
per-gap floor from about `2p` to exactly `3p`, and the extremal runs attain it".
That is the sharpness of a Perron root. The only routes past `3p` are to change
the weights (arithmetic) or to add states; no re-derivation of the same automaton
can move it.

**(ii) `c_min(j)` is an identity, not an approximation.** Direct min-plus powers
give `c_min(j) − 3pj` alternating `−9, 0, −9, 0, −9, 0` at `p = 7`, and the same
shape at all eleven primes `7..43` for `j ≤ 6`:

> **`c_min(j) = 3pj − (p+2)·[j odd]` for `p ≡ 1 (mod 6)`, and
> `c_min(j) = 3pj − (p−2)·[j odd]` for `p ≡ 5 (mod 6)`.** **[VERIFIED]**

The correction is the min-plus eigenvector coordinate and nothing else. Theorem
A's "span `≥ c_min(L−1) ≈ 3p(L−1)`" can be written with equality in the correction
term.

### 2d. The record words are exact critical circuits, not approximate eigenvectors

Recomputed here on the **big** tile (see the warning below): at every fold with
`L ≥ 2`, the **cheapest** maximal run's span equals `c_min(L−1)` exactly.

| `x` | `p` | `L` | interior gap word | span | `c_min(L−1)` | attains? |
|---|---|---|---|---|---|---|
| 5 | 7 | 2 | 12 | 12 | 12 | yes |
| 7 | 11 | 1 | — | — | — | — |
| 11 | 13 | 2 | 24 | 24 | 24 | yes |
| 13 | 17 | 2 | 36 | 36 | 36 | yes |
| 17 | 19 | 2 | 36 | 36 | 36 | yes |
| 19 | 23 | 3 | 48+90 | 138 | 138 | yes |
| 23 | 29 | 2 | 60 | 60 | 60 | yes |

Fold 23's run is `48+90` with adjacent sum `138 = 6p`, the two-state critical
circuit itself; `kappa-not-L.md` records fold 31's as `60+126+60`, adjacent sums
`186 = 6·31`. **So the answer to the assignment's Perron question is stronger
than it asked for: the record words are not approximate max-plus eigenvectors,
they are exact min-plus critical circuits.** Every interior gap of every record
run qualifies mod `p`, checked. **[VERIFIED, 6 of 6]**

> **A METHODOLOGICAL WARNING WORTH KEEPING.** A kill run must be scanned on the
> BIG tile, period `W·p`. `W` is not divisible by `p`, so crossing a copy
> boundary shifts the strike class by `w = W mod p`; a cyclic scan of ONE copy
> reports `L = 2` at fold 11, with interior gap 12, which is `1 (mod 11)` and
> does not qualify, where the truth is `L = 1`. The corrected scan returns
> 2, 1, 2, 2, 2, 3, 2 at folds 7..29, matching `research/qc.js` §W2 at all seven.
> This file made that mistake first and caught it against the gate.

---

## 3. Stage 2: the subadditivity hunt

### 3a. The one exact Fekete inequality is in the `m` direction, and its limit is Mertens

In `(max, +)` the operator norm is exactly submultiplicative with no dimension
factor: `(A ⊗ B)[i][j] = max_k (A[i][k] + B[k][j]) ≤ ‖A‖ + ‖B‖`. With `A` the tile
circuit this **is**

> **`maxsum_{m+m′} ≤ maxsum_m + maxsum_{m′}`. [PROVEN, one line in the semiring]**

`U-FRAME.md` §5a step 3a records this as "maxsum is subadditive with zero
violations, so Fekete gives convergence without monotonicity" — measured. It is a
theorem. **[VERIFIED, 496 pairs at each of seven levels `x = 5..23`, `m + m′ ≤ 32`,
zero violations.]**

And its Fekete limit is `m̄`, by §2a. **The direction is `m`, not `x`, and nothing
about the growth of `G₂` in `x` follows from it — ever.**

### 3b. The composition the fold actually supports points the wrong way

The honest composition in this problem is disjoint prime blocks, and there the
inequality is **super**-additive:

> `L(P ∪ Q) ≥ L(P) + L(Q)` for disjoint `P, Q` **[PROVEN,
> `history/staging/attack-L-subadditivity.md` §1]**, and
> **two** distinct primes `p, q ≥ 5` cover four consecutive integers — `p` takes
> the classes `{t+2, t}` and `q` takes `{t+3, t+1}`, legal for any `p, q` by CRT —
> while **one** prime covers only one, because its two classes are two apart
> **[PROVEN, one line here]**.

Concatenating those blocks over disjoint pairs of primes gives the
**concatenation floor**, with `k = π(y) − 2` the number of primes in `[5, y]`:

> `L(primes in [5,y]) ≥ 2k − [k odd]`, that is `G₂(y#) ≥ 6(2k − [k odd]) + 6`,

in the `T_3` coordinate (`attack-L-law.md` §1: `G₂ = 6L + 6`). It is also an
**equality** in the regime `2k < min(P)`, by a parity count: pairs at distance 2
are monochromatic in parity, `[1, 2k]` holds `k` odds and `k` evens, and covering
each parity costs `⌈k/2⌉` pairs, so `k` pairs suffice only for `k` even.

That is what Fekete-by-concatenation delivers with no arithmetic input at all,
and the reading is sharper than expected in one direction and hopeless in the
other. **The floor is TIGHT at the first two levels** — `12 = G₂(5#)` and
`30 = G₂(7#)`, so concatenation is optimal there and `G₂/floor` reads 1.000,
1.000. After that it reads 1.167, 1.222, 1.800, 1.923, 2.429, 2.529, 3.222,
4.190, 4.136, 4.120, 4.538, 5.000, 5.367, 5.455, 6.294, 6.297, 6.711, **6.951**,
rising at every step but the ladder's own 528 → 546 flat spot at `x = 41` and
the step beside it. **That growing excess is the whole content of Erdős–Rankin.**
Superadditivity alone cannot produce an exponent. **[VERIFIED]**

### 3c. Kingman's named failing step: the array is not stationary

Kingman needs `Λ(i, j)` to depend on `j − i` through a stationary ergodic driving
system. Here `Λ(i, j) = L({p_{i+1}..p_j})` depends on `i`: it equals `2(j−i)`
equal to `2(j−i) − [j−i odd]` while `2(j−i) < p_i`, and the same *number* of
primes is worth strictly more when the primes are smaller. Measured from the index side, with
`A_n = L(first n primes from 5)`:

`A_{n+m} ≥ A_n + A_m` holds at **190 of 190** pairs with `n + m ≤ 20`, but the
**excess grows with `n` at every `m`** — the `m = 1` row reads
2, 1, 3, 6, 6, 8, 8, 14, 29, 2, 11, 14, 26, 15, 18, 33, 18, 21, 29.
There is no stationary increment to average. **No Kingman.** **[VERIFIED]**

*(That test is not the proven theorem and is stronger than it: the theorem
compares the first `n` primes with a DISJOINT block, whereas `A_m` is the first
`m` primes, a strictly better set. It is reported because a failure would have
been informative; the 190 of 190 is not.)*

### 3d. Fekete's named failing step is sharper: the candidate has no mechanism

Fekete for an **exponent** needs additivity in `ln x`, because
`β = lim ln G₂ / ln x`. In the original variable that composition is
multiplication of the arguments, and **`ln s + ln t = ln(st)` is not a prime-set
operation**: multiplying the moduli does not compose the two prime sets, it names
a third one. So the candidate below is a **shape imposed by what Fekete needs**,
not by anything the fold does.

---

## 4. The convergence-theorem candidate, with its hypotheses explicit

> **CANDIDATE (CONJECTURE, tested, not proved).** There is a finite `C` with
> `Ĝ(st) ≤ C · Ĝ(s) · Ĝ(t)` for all real `s, t ≥ 2`, where
> `Ĝ(t) = G₂(P(t)#)` and `P(t)` is the largest prime `≤ t`.
>
> **CONSEQUENCE (PROVEN, given the candidate).** `g(u) = ln Ĝ(e^u)` satisfies
> `g(u+v) ≤ g(u) + g(v) + ln C`, so `g + ln C` is subadditive and Fekete gives
> `β := lim_{u→∞} g(u)/u` **EXISTS**, i.e. `G₂(x#) = x^{β+o(1)}` for a genuine
> `β ∈ [1, 4.26645]`. TODO item 1d would then read "is `β < 2`, `= 2`, or `> 2`"
> rather than "does a ratio wander".

**The evidence.** 104 of 104 pairs of integers with `2 ≤ s ≤ t` and `st ≤ 79`
satisfy it, with `C = 2.9333` and `ln C = 1.0761` nats. `R = Ĝ(st)/(Ĝ(s)Ĝ(t))`
exceeds 1 at 96 of the 104 and lies in `[0.7867, 2.9333]`. **[VERIFIED]**

**And the evidence is nearly worthless, which is the honest headline.** The
constant is set by the smallest arguments: `max R` is attained at `(s, t) = (4, 10)`,
i.e. at the primes 3 and 7 against 37. Stratified by `min(s, t)`:

| `min(s,t) ≥` | pairs | `max R` | attained at |
|---|---|---|---|
| 2 | 104 | 2.9333 | (4, 10) → 40 |
| 4 | 42 | 2.9333 | (4, 10) → 40 |
| 5 | 26 | 2.7738 | (6, 12) → 72 |
| 7 | 7 | 1.5533 | (8, 9) → 72 |
| 8 | 2 | 1.5533 | (8, 9) → 72 |

A power law `G₂ ~ c x^β` forces `R → 1/c` as both arguments grow, so the
asymptotic constant is `1/c` and **the ladder cannot see it**: with both
arguments `≥ 7` only seven pairs remain. The candidate is tested; the test has
almost no power about `C`.

**And with any explicit constant the candidate is TPC-implying.** Iterating gives
`β ≤ (ln C + ln Ĝ(s))/ln s` at every base `s`:

| base `s` | 11 | 23 | 31 | 37 | 43 | 53 | 71 | 79 |
|---|---|---|---|---|---|---|---|---|
| `β ≤` | 2.0075 | 2.0393 | 2.0176 | 2.0342 | **1.9947** | **1.9758** | **1.9516** | **1.9500** |

and 1.8992 at the best base of any kind (`Ĝ` is constant on `[p, p′)`, so a base
just below a prime is sharpest — a real feature of the real-variable form).
`β < 2` gives `G₂(x#) = o(x²)`, hence `G₂(x#) < x′² − 2` for all large `x`, hence
the Zone Postulate for all large `x`, hence — by `ZONE-POSTULATE.md` §3, where
the WEAK form is EQUIVALENT to TPC — **the twin prime conjecture.**

> **So the candidate has to be proved constant-free or not at all.** This is the
> same verdict shape TODO 1e reached for the sieve Gaussian maximal law, arrived
> at independently and by a different route. **[INFERRED, from PROVEN
> ingredients]**

---

## 5. Against `REFUTED.md`, and why limit-existence is not a bound

Three closures must not be re-opened, and none is.

**The accumulating-index family (CLOSED, the Overshoot Budget).** The candidate
carries no index. It is a two-point comparison between three levels of the same
object with a fixed constant; there is no `J`, no floor to stay above, and no
gate. `gate-multiplies.md` §6 already classes the copy theorem itself as the
branch's strongest survivor for exactly this reason, "the one object in the
family whose index does not grow under folding".

**The multiplicative recursion of TODO 0b (REFUTED).** That is
`G₂(u) ≤ 12·c^{π(u)}`, a product over `π(u)` folds against a fixed base, and it
died because the sharp per-fold rate is `ln c(p) ≤ 2 ln p / p` and the measured
multiplier already spends 106% of it. The candidate is not of that form: it does
not decompose the ladder into folds at all, and its constant is one constant for
the whole statement rather than one per fold.

**The Overshoot Budget (PROVEN, conditional).** It caps the total multiplicative
overshoot of *any chain of upper bounds ending in `G₂(x#) < x²`* at `x²/G₂(x#)`.
The constant-free candidate ends in nothing numeric: `(ln C + ln Ĝ(s))/ln s → β`
as `s` grows, so it delivers limit existence and no number at any level. **A
limit-existence statement is not a chain of upper bounds, so the Budget does not
apply to it.** That is the whole reason this route is allowed to exist.

And there is no contradiction in the other direction either, for a reason worth
stating in one line: **the Budget is explicitly conditional on the measured law
`G₂ ~ 0.55(ln W)²`** (`gate-multiplies.md`: "The Overshoot Budget is conditional
on the measured G2 law"), i.e. on exponent exactly 2. A theorem giving `β < 2`
would falsify the Budget's premise rather than violate its conclusion.

**A note the Budget's own owners should see.** Its slack column `ln(x²/G₂)`,
reproduced here exactly at `x = 11..37` (1.058, 0.940, 0.984, 0.878, 0.953,
1.182, 1.016, 0.953), does **not** stay flat on the eight A144311 terms: it rises
to 1.1379, 1.1721, 1.2819, 1.2370, 1.2516, 1.2826, 1.2479, **1.2946** at
`x = 47..79`, monotone over the last eight. `gate-multiplies.md` §5's "flat over
the whole reachable ladder" was true of the fourteen-term ladder. **[VERIFIED]**

---

## 6. Custody on the estimator, and what is not claimed about 1d

Nothing here fits a model, and the AICc work on this ladder is
`attack-growth-law.md`'s and is not repeated. The slope routine used in §0's
warning was validated first, against four figures the corpus already carries, on
the corpus's own windows, computed from the ladder and nothing else:

| window | `n` | quantity | here | corpus | source |
|---|---|---|---|---|---|
| [11,41] | 9 | slope `ln(G₂/x²)` | −0.0694 ± 0.0747 | −0.069 ± 0.075 | `attack-block-01-ladder.md` §6 |
| [11,41] | 9 | `d ln G₂/d ln x` | 1.9306 ± 0.0747 | 1.931 ± 0.075 | same |
| [5,41] | 11 | `d ln G₂/d ln x` | 1.7975 ± 0.0639 | 1.797 ± 0.064 | same |
| [11,79] | 18 | `d ln G₂/d ln x` | 1.8182 ± 0.0319 | 1.818 (PW fit) | `attack-growth-law.md` §1 |

Across windows the same estimator reads, for the slope of `ln(G₂/x²)`:
−0.2025 ([5,41], 11), −0.0694 ([11,41], 9), −0.0810 ([11,43], 10),
−0.1818 ([11,79], 18), −0.2640 ([23,79], 14), −0.3489 ([31,79], 12),
−0.3124 ([43,79], 9).

**HOUSE CONTROL LINE, as required.** The same estimator on the one-class control
`h(x#) = A048670`, whose `x`-exponent is 1, reads 1.272 at the **matched** window
`x = 11..79` and 1.282 ± 0.008 on 58 terms, positive bias in all 40 windows
(`exponent-control.md` §1, `attack-growth-law.md` §4). Subtracting the matched
bias +0.272 from 1.8182 returns **1.546**, which is `attack-growth-law.md`'s own
answer. **NO TREND IS DECLARED HERE.** The eighteen-term reading is not new; what
is new is the bookkeeping in §0, that TODO 1d's headline is a nine-term reading
in one of four conventions.

**Ladder provenance, on every table.** Terms 1–14 (`x = 2..43`) are corpus-exact
(`G2-STATE.md` §2). Terms 15–22 (`x = 47..79`) are OEIS **A144311** (Andrew
Carter, September 2008), `G₂ = A144311 + 1`; `G2-STATE.md` §8 records them as
"ours to verify, not to claim", and every row in both scripts carries its source.

---

## 7. NOT REACHED

- **No proof of the candidate, in either direction.** No counterexample either;
  the ladder cannot produce one, because the pairs that would matter need both
  arguments large.
- **No estimate of `C`.** §4's stratification shows the reachable pairs are
  dominated by `min(s,t) ≤ 6`.
- **No max-plus Lyapunov exponent for the fold, and none is available.** Products
  of max-plus matrices have a Lyapunov theory (Cohen 1988; Mairesse 1997;
  Bousch–Mairesse 2002) for FIXED dimension under a stationary ergodic driving
  sequence. Here the dimension multiplies by `p−2` at every fold and the
  eigenvalue itself moves by `p/(p−2)`, so there is no fixed-dimension matrix
  product and no stationary driver. The tetris-heap model fails for the same
  reason: its alphabet of pieces is fixed and ours grows with `p`.
- **The localized frame does not rescue it.** `LOCALIZED-GAP.md` §5's fixed
  window freezes past `x > √Y` (the Impact Lemma), so the process terminates
  rather than running to a Lyapunov exponent.
- **Levels above `T_23` in memory.** The alignment spread at `x = 23` and `29` is
  cited from `attack-0c0e-01-deleted-family.js`, not recomputed; the `x = 29`
  tile (214.7M slots) was never built here.
- **`c_min(j)` for `j > 6` and `p > 43`** was not tabulated, though the closed
  form is an eigen-identity and there is no reason to expect it to stop.
- **The 4.26645 exponent is untouched.** Nothing in this import bears on it.

---

## 8. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/import-maxplus-01-mapping.js` | the mapping (§1), the closure gap (§1c), both Perron readings (§2), the record runs; formal embed, `--streams both`, arg `23` |
| `research/import-maxplus-02-subadditivity.js` | the four subadditivity tests (§3), the candidate and its stratification (§4), the Overshoot column and the estimator custody (§5, §6); formal embed |
| `research/U-FRAME.md` §5a, §11 | the copy theorem and the histogram operator |
| `research/kappa-not-L.md` | the Alternation Lemma and Theorems A, B, C |
| `research/attack-0c0e-01-deleted-family.js` | the deleted family's table (a), cited for `x = 23, 29` |
| `research/history/staging/attack-L-subadditivity.md` §1 | the proven superadditivity on disjoint prime sets |
| `research/history/staging/attack-L-law.md` §1 | `G₂ = 6L + 6` in the `T_3` coordinate |
| `research/history/staging/attack-block-01-ladder.md` §6 | the four window conventions and the nine-term slopes |
| `research/history/staging/attack-growth-law.md` §1, §4 | the eighteen-term AICc ranking and the matched control bias |
| `research/gate-multiplies.md` §5, §6 | the Overshoot Budget and its conditionality |
| Baccelli, Cohen, Olsder, Quadrat, *Synchronization and Linearity* (Wiley 1992) ch. 3 | max-plus Perron–Frobenius, cyclicity, transient |
| Karp, *Discrete Math.* 23 (1978) 309–311 | the maximum cycle mean algorithm used for `λ` and `c_min` |
| Cuninghame-Green, *Minimax Algebra* (Springer 1979) | the semiring and the eigenproblem |
| Cohen 1988; Mairesse 1997; Bousch–Mairesse 2002 | max-plus Lyapunov exponents, named in §7 as the theory that does not apply |

Reproduce with `node research/qc/embed.js --check --streams both
research/import-maxplus-01-mapping.js -- 23` and
`node research/qc/embed.js --check research/import-maxplus-02-subadditivity.js`;
both fingerprints match as of 2026-08-19.
