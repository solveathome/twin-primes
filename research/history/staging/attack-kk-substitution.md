# Attack 4: the Kalmynin–Konyagin substitution at D3, written as a proof

<!-- ledger
id: Q-kk-substitution
status: ANSWERED
todo: none
question: Does the Kalmynin-Konyagin construction survive substituting the two-class set Omega_p = {a_p, a_p - 2}, and what lower bound does it give?
verdict: The transfer stands and D3 is discharged: the trichotomy survives intact and yields G2(P(y)) >> y (ln y)^3 (lnlnln y)^2 / (lnln y)^4 for y >= y_0, with roughly half of K-K unconsumed; it is a LOWER bound, does not recover the classical case, and the novelty is narrow (their Theorem 1 is uncited by anyone).
-->

*2026-08-18/19, attack 4 of 10. Producer: `research/attack-kk-substitution.js`
(0.6 s, nine sections A–I, OUTPUT block written by `research/qc/embed.js` and
twelve readings written afterwards from that block). Direct continuation of
`research/history/staging/attack-lower-bound.md`, whose D1, D2 and D4 stand and
are not re-run. Legend: **[PROVEN]** published theorem with source;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical, finite
range; **[ABSENT]** searched and found nothing, with the channel and a
known-positive calibration probe run in the same session named; **[INFERRED]**
our deduction from sourced facts.*

---

## 0. The headline, in five lines

1. **The transfer stands, and D3 is discharged.** K–K's §2 trichotomy survives
   the substitution `Ω_p = {a_p, a_p − 2}` intact, and §2 below writes it out as
   a proof rather than as checks. The theorem it proves is
   `G₂(P(y)) ≫ y (ln y)³ (lnlnln y)² / (lnln y)⁴` for `y ≥ y₀`.
2. **Roughly half of K–K's paper is not consumed.** Case 2 is vacuous because
   `h_f = 0`, so Lemma 2, Chebotarev, Theorem 2, Lemma 3 (Birch–Swinnerton-Dyer)
   and every Galois group in the paper drop out. Case 3 needs no `M(f)`, no
   logarithmic average and no exceptional primes, because `|{1,−1}| = 2` at
   every odd prime. `p₀ = 5` is exact and comes from a resultant. **[VERIFIED]**
3. **The Mertens ledger is exactly the two terms the brief names**, and its
   `O(1)` is an identified constant, not a shrug: the `Ω^I` term's residual
   converges to `−2 ln 2 + 2M − 5/3 = −2.529967`, reached to `1.9e-5` at
   `√y = 10⁷`. The exponent assembly is an algebraic identity that collapses to
   zero coefficient by coefficient. **[VERIFIED]**
4. **A new number the paper never gives: `y₀`.** Every hypothesis is now an
   explicit inequality, and the binding one is `z₀ < z₁` — K–K's own band
   geometry, nothing to do with our substitution. At `A = 4.05`,
   `y₀ = 10^134.1`; at `A = 5`, `10^233.4`. **This is the complete explanation of
   why attack I's D4 lost to the greedy by 4.0–6.6 at `y = 4001`: at `y = 4001`
   the bands do not exist.** **[VERIFIED]**
5. **The bound is a floor on the method, not its ceiling.** K–K's Theorem 1 at
   `f(x) = x` is the ordinary Jacobsthal function and reads
   `j(P(y)) ≫ y ln y lll y/(ll y)²`, weaker by exactly `lnln y` than the FGKT
   bound they quote in their own introduction. The transferred two-class bound
   inherits that slack. **[VERIFIED]**

**The Zone Postulate is unaffected.** The threshold needs `G₂(x#) < x′²`, and
`x²/(x ln³x) = x/ln³x → ∞`. A stronger lower bound was the one thing that could
have threatened it from the construction side; it does not. The margin is still
`x^{1−o(1)}`.

---

## 1. The object, the source, and the construction

### 1a. Custody

The PDF read is arXiv:2302.00459v2, md5 `b5d7d2a23ffd902415057adebfe430b1`,
12 pages — byte-identical to the artifact of record in
`research/history/staging/lit-pdf-kalmynin-konyagin.md` §0, which checked it
against the published Izvestiya PDF (Izv. Math. **88**:2 (2024) 225–235,
DOI 10.4213/im9467e). Everything quoted below is from §2 of that PDF, pages 3–7,
which is the entire proof of Theorem 1.

### 1b. Their object and ours are different, and that has not changed

`j_f` shifts the **value**: the fibre at `f = x(x+2)` is `{−1 ± √(1−x_p)}`,
centre fixed at `−1`, separation varying. `G₂` shifts the **argument**: the pair
is `{a_p, a_p − 2}`, centre varying, separation fixed at 2. One may not apply
Theorem 1 at `f = x(x+2)` and read off a `G₂` bound, and
`lit-pdf-kalmynin-konyagin.md` §2 says so correctly. **Nothing below disturbs
that verdict.** What is transferred is the **method** — the bands, the
trichotomy, Corollary 1 and the ledger — instantiated on our own system. The
result is a different proof of a different theorem that happens to land on the
same right-hand side.

### 1c. The substituted construction, stated once

By `research/two-class-lower-bounds.md` §1 (**[PROVEN]**, elementary + CRT),
`G₂(P(y)) − 1` is the longest interval `[1,m]` coverable by choosing one residue
`a_p` per prime `p ≤ y` and deleting `{a_p, a_p − 2} mod p`.

Fix constants `A > 4` and `B` large in terms of `A`, and set

```
z₀ = (ln y)^A          z₁ = exp( lll y · ln y / (A · ll y) )
m  = (y/B) (ln y)³ (lll y)² / (ll y)⁴
```

which is K–K's `m` at `ℓ_f = 2, h_f = 0, M(f) = 2`. Choose:

| step | primes | `a_p` | kill set `{a_p, a_p − 2}` |
|---|---|---|---|
| 1 | `p ≤ z₀` and `z₁ < p < y/2` | `0` | `{0, −2}` |
| 2 | `z₀ < p ≤ z₁` | `1` | `{1, −1}` |
| 3 | `y/2 ≤ p ≤ y` | greedy, one leftover `i` per prime | — |

and take `x ≡ −a_p (mod p)` for every `p ≤ y` by CRT. Then `p | x+i` iff
`i ≡ a_p`, and `p | x+i+2` iff `i ≡ a_p − 2`, so **`i` is killed by `p` exactly
when `i mod p` lies in the kill set.** If every `i ≤ m` is killed then no `i` in
`[1,m]` starts a twin pair coprime to `P(y)`, and `G₂(P(y)) ≥ m + 1`.

The sieve sets fed to Corollary 1 at `z = √y` are

```
Ω^I_p   = {0, -2}   for every p ≤ √y            the SIEVE form of the pair
Ω^II_p  = ∅         h_f = 0, no non-linear factor exists
Ω^III_p = {1, -1}   for z₀ < p ≤ z₁              the FREE TRANSLATE
Ω_p     = Ω^I_p ∪ Ω^II_p ∪ Ω^III_p
```

**The single structural observation that makes the transfer work.** Band 1 sets
`a_p = 0`, and at `a_p = 0` the covering form `{a_p, a_p − 2}` and the fixed
sieve pair `{0, −2}` **are the same set**. `research/qc/units.js` §5 records that
confusing these two formulations has already caused one error in this corpus;
the substituted proof never has to reconcile them, because it uses each in its
own band — the sieve form in band 1, the free translate in band 2, and nowhere
do the two roles meet.

---

## 2. The trichotomy, re-derived line by line

Throughout, `i ∈ [1, m]`, and "unkilled after steps 1 and 2" means no prime
assigned in step 1 or step 2 has `i mod p` in its kill set.

> **Proposition (substituted trichotomy).** If `i ≤ m` is unkilled after steps 1
> and 2, then at least one of:
> **(a)** `i ≤ √y + 2`;
> **(b)** `i` or `i + 2` is `z₁`-smooth;
> **(c)** `i mod p ∉ Ω_p` for every `p ≤ √y`.

*Proof.* Suppose (c) fails, so `i mod p ∈ Ω_p` for some `p ≤ √y`. Since
`Ω_p = Ω^I_p ∪ Ω^II_p ∪ Ω^III_p`, one of three cases holds.

### Case 1 — `i mod p ∈ Ω^I_p`

**Hypothesis.** `i ≡ 0` or `i ≡ −2 (mod p)` for some `p ≤ √y`; equivalently
`p | k` where `k := i` in the first case and `k := i + 2` in the second, so
`1 ≤ k ≤ m + 2`. This is exactly K–K's *"`k(i)` is divisible by `p` for some
linear factor `k(x)` of `f`"* (v2 p. 6) at `f(x) = x(x+2)`, whose linear factors
are `x` and `x + 2`.

**Conclusion.** (a) or (b).

*Proof of the case.* If `k = p` then `i ≤ p + 2 ≤ √y + 2` and (a) holds.
Otherwise `k` is composite (`k > p` and `p | k`; `k = 0` is impossible since
`i ≥ 1`).

Because `i` is unkilled at step 1, neither `i` nor `i + 2` has a prime factor
`q ∈ [2, z₀] ∪ (z₁, y/2)`: for such a `q` the step-1 choice `a_q = 0` gives kill
set `{0, −2}`, and `q | i` or `q | i+2` is precisely `i ≡ 0` or `i ≡ −2 (mod q)`.
So every prime factor of `k` lies in `(z₀, z₁] ∪ [y/2, ∞)`.

Let `P` be the largest prime factor of `k`.

- If `P ≤ z₁`, then `k` is `z₁`-smooth and (b) holds.
- If `P ≥ y/2`, then `k/P ≤ (m+2)/(y/2) < 2m/y`, while every prime factor of
  `k/P` exceeds `z₀`. Provided **`2m/y < z₀`**, `k/P` has no prime factor at
  all, so `k/P = 1` and `k = P` is prime — contradicting `k` composite. ∎

**What this case consumes.** One inequality, `2m/y < z₀`, and nothing else.

**What it costs, and it is less than theirs.** K–K state the same step as
`k(i) ≪ m ≪ y(ln y)^{ℓ_f + M(f)} = y(ln y)⁴`, "for large enough `A`". Our `m` is
`y(ln y)³(lll y)²/(ll y)⁴ ≤ y(ln y)³`, so the substituted version needs only
`A > 3` where theirs needs `A > 4`. §D of the script measures the margin
`A ln L − ln(2m/y)`: at `A = 3` it runs `5.309` at `L = 10` to `10.182` at
`L = 10⁶`, and at `A = 6` from `12.216` to `51.628`. Positive everywhere and
rising. **[VERIFIED]**

**Why this is the whole argument.** Case 1 is the only place in the proof where
`Ω^I_p` is charged to the ledger at primes where it was never chosen. In band 2
the actual kill set is `{1,−1}`, not `{0,−2}`; the two extra classes are paid for
by the smoothness dichotomy rather than by a choice. **That is where the whole
extra factor of `ln y` over `two-class-lower-bounds.md` §4b comes from**, and it
is K–K's idea, not ours.

### Case 2 — `i mod p ∈ Ω^II_p`

**Hypothesis.** *"… and for some irreducible non-linear factor `q(x)` of `f(x)`
we have `q(i) ≡ 0 (mod p)`"* (v2 p. 6; the elided clause is
`p ∈ [2, z₀] ∪ (z₁, √y)`).

**The hypothesis fails, and here is it failing.** `f(x) = x(x + 2)` is a product
of two linear factors over `ℤ`, so `f` has **no** non-linear irreducible factor:
`h_f = 0`. K–K's own definition then gives `Ω^II_p = ∅` at every prime, and the
hypothesis quantifies over an empty set. **The case is unsatisfiable and
contributes nothing.**

**What drops out with it.** Their conclusion in Case 2 is *"then `f(i)` is also
divisible by `p`, hence `p` must be sifted after the first step"* — an argument
that needs `Ω^II_p` to be non-empty to be about anything. Downstream, the
ledger's `Lemma 2` entry and the Theorem-1 factor `((ll y)²/lll y)^{h_f}` both
vanish identically. §A3 of the script evaluates them: the factor reads
`1.000000` at every `L` tested, and the ledger entry reads `0.000000` against
`5.849812` to `8.172412` at `h_f = 1`. **[VERIFIED]**

So **Lemma 2, Chebotarev's density theorem in its effective Lagarias–Odlyzko
form, Theorem 2, Lemma 3 (Birch–Swinnerton-Dyer), the Galois groups `G_f` and
`G_f⁺`, and the whole of K–K §3 are consumed by nothing.** Roughly half the paper
is not needed for the substituted proof.

### Case 3 — `i mod p ∈ Ω^III_p`

**Hypothesis.** `z₀ < p ≤ z₁` and `i ≡ 1` or `i ≡ −1 (mod p)`.

**Conclusion.** `i` is killed at step 2, contradicting the assumption. The step-2
choice `a_p = 1` has kill set `{1, −1}`, which is the hypothesis verbatim. ∎

**Why this is strictly stronger than theirs.** K–K's Case 3 reads *"`z₀ < p ≤ z₁`
and `f(i) ≡ y_p`. Then `i` is sifted after the second step"*, and to have a `y_p`
at all they must invoke the definition of `M(f)` (their Definition 1), prove it
exists (their Theorem 2, via Chebotarev and Birch–Swinnerton-Dyer), and settle
for control of `M_p(f)` on **logarithmic average** with exceptional primes
absorbed into an `O(1)`. Our `Ω^III_p` has exactly two elements at **every** odd
prime, with no average and no exceptions. §A of the script confirms it across all
78 498 primes below `10⁶`: zero odd `p` with `|Ω^III_p| ≠ 2`. **[VERIFIED]**

### The three structural facts, quantified

| K–K need | we get | source |
|---|---|---|
| `|Ω^I_p| = ℓ_f` for `p > p₀`, `p₀` unquantified | `|Ω^I_p| = 2` for every `p > 2` | `Res(x, x+2) = 2` |
| `Ω^I, Ω^II, Ω^III` pairwise disjoint for `p > p₀`, `p₀` unquantified | disjoint for every `p ≥ 5`, and `p = 3` is the last overlap | `Res(x(x+2), (x−1)(x+1)) = −3` |
| `κ = 3 deg f = 6` in Corollary 1 | `κ = 4` | `|Ω^I| + |Ω^III| = 4`, `Ω^II = ∅` |

All three **[VERIFIED]** at §A, both by the resultants (which make them proofs,
not sweeps) and by the sweep to `10⁶`, which agrees.

**`p₀ = 5` is also the best a two-class choice can do.** §B computes
`Res(x(x+2), (x−a)(x−a+2)) = a²(a²−4)` over `a`. The values `a ∈ {0, 2, −2}` are
degenerate; among the rest `a = 1` and `a = −1` minimise `|Res|` at `3`, and `3`
is the floor because `3 | a²(a²−4)` whenever `3 ∤ a`. So `a_p = 1` is optimal.
**[VERIFIED]**

---

## 3. The Mertens ledger, term by term

### 3a. Corollary 1 applies, and at a smaller `κ`

`R := #{i ≤ m unkilled after steps 1 and 2}`. The Proposition gives

```
R  ≤  S(m, Ω)  +  O(√y)  +  2 Ψ(m + 2, z₁)
```

the factor 2 on `Ψ` because case (b) is a statement about `i` **or** `i + 2`;
K–K carry one copy because their `k(i)` ranges over `ℓ_f` linear factors and they
absorb the count into the implied constant. It changes nothing.

Corollary 1 (v2 p. 4) is applied at `z = √y`, `X = m`, `g(p) = |Ω_p|`. Its
hypotheses, checked at §C:

- **`g(p) ≤ κ`**, with `κ = 4` against their `κ = 6`. A smaller `κ` is not worse:
  Lemma 1's implied constant depends on `κ` only.
- **`g(p) < p`**. `g(p) = 4 < p` for `p ≥ 5`. The two primes where band 2's count
  would fail are `p = 2` (`g = 2 = p`) and `p = 3` (`g = 3 = p`), and the **band
  structure** puts both in band 1, where `Ω^III_p = ∅` and `g(2) = 1`, `g(3) = 2`.
  Band 2 starts above `z₀ = (ln y)^A`, so this asks `(ln y)^A > 3`, i.e.
  `y > 3.475` at `A = 5`, which is vacuous against K–K's own `y ≥ 19`.
- **`z ≪ X`**: `√y ≪ m`, immediate.
- Their escape hatch *"If for some `p ≤ √y` we have `g(p) = p`, then clearly
  `S(m, Ω) = 0`"* is never triggered: §A finds zero primes with `g(p) ≥ p`.

`z = √y` and `X = m` are the same as theirs, so **the substitution introduces no
new analytic requirement anywhere.**

### 3b. The two contributions, and they are exactly the two the brief names

```
Σ_{p ≤ √y} g(p)/p  =  Σ_{5 ≤ p ≤ √y} 2/p   +   Σ_{z₀ < p ≤ z₁} 2/p   +   O(1)
                   =  2 lnln y             +   2(lnln z₁ − lnln z₀)   +   O(1)
```

The first sum is `Ω^I` over **all** `p ≤ √y`, with `|Ω^I_p| = 2` replacing K–K's
`ℓ_f`. The second is `Ω^III` over **band 2**, with `|Ω^III_p| = 2` replacing
K–K's `M_p(f)`. The middle term of their three-way split — `Lemma 2`'s
`h_f(lnln y − lnln z₁ + lnln z₀)` — is identically zero by §2 Case 2.

**Both are now plain Mertens sums over a constant.** The first was already
Mertens for them. The second was Chebotarev for them and is Mertens for us,
which is the concrete form of "Case 3 is strictly stronger".

**The `O(1)` is an identified constant, not a shrug. [VERIFIED]** With
`M = 0.2614972128476428` and `lnln √y = lnln y − ln 2`,

```
Σ_{5 ≤ p ≤ √y} 2/p − 2 lnln y  →  −2 ln 2 + 2M − 2(1/2 + 1/3)  =  −2.529967
```

and §F1 measures the residual-minus-constant at `0.007876, 0.002472, 0.000609,
0.000078, 0.000019` for `√y = 10³ … 10⁷`. §F2 tracks the band sum against
`2(lnln z₁ − lnln z₀)` to within `0.002443` at `(z₀, z₁) = (10⁴, 2·10⁷)`.

**And the identity is rigorous at the `y` that matter, not only where a computer
can see them.** Rosser–Schoenfeld 1962 Thm 20 gives
`|Σ_{p≤x} 1/p − lnln x − M| < 1/(10 ln²x) + 4/(15 ln³x)` for `x ≥ 286`; `M`
cancels in a band difference. §F4 evaluates the resulting bound at the **real**
band endpoints: `2.475e-4` at `L = 10³` falling to `1.911e-5` at `L = 10⁹`.

§F3 assembles the full ledger at the largest `y` where the bands fit inside a
computable sieve range, and lands `0.12`–`0.21` from the identified constant
`−2 ln 2 + 2M − 1/2 = −1.363300`. That gap is `z₀` sitting at 14 to 32, an order
of magnitude below the `x ≥ 286` where Rosser–Schoenfeld applies. It is the
small-band artifact, not a defect in the decomposition.

### 3c. The assembly, which is an identity

```
S(m, Ω)  ≪  m ∏_{p≤√y}(1 − g(p)/p)  ≪  m exp(−Σ g(p)/p)
         ≍  m (ln y)^{−2} (ln z₀ / ln z₁)²
```

Expanding against K–K's own displayed `A^{2M(f) − 2h_f} y/(B ln y) = A⁴y/(B ln y)`,
every coefficient cancels:

```
(ln m − L) − 2 lnL + 2(ln ln z₀ − ln ln z₁) − 4 lnA + lnB + lnL
  = 3 lnL + 2 ln lll − 4 ln ll − lnL + 2(2 lnA + 2 ln ll − ln lll − lnL) − 4 lnA
  = 0        lnL: 3−1−2,  lll: 2−2,  ll: −4+4,  lnA: 4−4
```

§G evaluates that difference at 30 `(L, A, B)` triples from `L = 10²` to
`10³⁰⁰` and gets between `−5.684e-13` and `8.527e-14`, `max |ratio − 1| =
5.684e-13`. **[VERIFIED]** Since the implied constant depends only on `κ`, and
not on `A` or `B` — K–K's own remark, v2 p. 7 — taking `B` large against `A`
gives `S(m,Ω) ≤ y/(4 ln y)`.

### 3d. The smooth-number step, and the greedy

`2Ψ(m+2, z₁) = o(y/ln y)` is the one imported estimate K–K also assert without
proof. §E evaluates it. With `u = ln m/ln z₁ ~ A·ll y/lll y`, the requirement
holds at every `A ≥ 4` tested and fails at `A = 3` from `L = 10⁶` upward, which
is the crude `A > 4` showing up. The bisected least admissible `A` rises
`2.3196, 2.7134, 2.9068, 3.1093, 3.2709, 3.3666, 3.5879, 3.7460, 3.8185` across
`L = 10²` to `10³⁰⁰`, approaching 4 from below and never reaching it. **The
substituted proof needs `A > 4`, which is exactly the `ℓ_f + M(f) = 4` K–K's own
version of this step asks for.** The estimate is used well inside its range: the
Hildebrand slack `ln z₁/(lnln m)^{5/3}` runs `6.364e-1` at `L = 10²` to
`2.339e5` at `L = 10⁹`. **[VERIFIED]**

Hence `R ≤ y/(4 ln y) + o(y/ln y) ≤ y/(3 ln y)`.

Step 3 assigns each remaining `i` its own prime `p ∈ (y/2, y]` with `a_p ≡ i`.
§G2 makes the counting explicit rather than asymptotic: Rosser–Schoenfeld give
`π(y) − π(y/2) > y/L − 0.62753 y/(L − ln 2)`, which exceeds `y/(3L)` exactly when
`0.62753 L/(L − ln 2) < 2/3`, i.e. `L > 11.807294`, i.e. **`y > 1.3423e5`**.
Comfortably below every `y₀` in §5. **[VERIFIED]** The two-class system has slack
here that K–K do not: each band-3 prime could kill two leftovers if they happened
to differ by 2. Nothing uses that.

---

## 4. The theorem, with every hypothesis

> **Theorem.** There is an absolute `y₀` such that for all `y ≥ y₀`
>
> ```
> G₂(P(y))  ≫  y (ln y)³ (ln ln ln y)² / (ln ln y)⁴
> ```
>
> with an absolute implied constant.

**Inputs consumed, all [PROVEN] with source:**

| input | source |
|---|---|
| Lemma 1, the fundamental lemma of sieve theory, at `κ = 4` | K–K v2 p. 3, citing Halberstam–Richert Thm 2.2 |
| Corollary 1, which sees `Ω_p` only through `\|Ω_p\|` | K–K v2 p. 4 |
| Mertens' theorem, with Rosser–Schoenfeld Thm 20 for the explicit error | Rosser–Schoenfeld, *Illinois J. Math.* 6 (1962) |
| `Ψ(x,z) ≪ x ρ(u)` in Hildebrand's range | standard; asserted without proof by K–K too |
| `π(y) − π(y/2)` lower bound | Rosser–Schoenfeld, both directions |
| `G₂(P(y)) − 1` = longest coverable interval, one free pair per prime | `two-class-lower-bounds.md` §1, elementary + CRT |

**Inputs NOT consumed:** Lemma 2 and Chebotarev; Theorem 2 and the Galois groups
`G_f`, `G_f⁺`; Lemma 3 and Birch–Swinnerton-Dyer; the definition of `M(f)`; and
Theorem 3. All of K–K §3.

**What is conditional.** Nothing beyond the imported inputs. The deduction in
§§2–3 is written out here in full. The place a sceptic should push is the
smooth-number estimate of §3d, which K–K also assert; §E shows it is used with
five orders of magnitude of slack against its range condition at the parameters
that matter.

**Calibration, stated plainly.** This is a proof, not a citation. Every input is
published and sourced; the deduction has not been refereed. The corpus's own
practice is to write **[PROVEN]** for a complete elementary derivation from
published inputs (`two-class-lower-bounds.md` §1 does exactly this), and that is
the tag used here — but the honest reading is "derived here, complete, not
refereed", and it should be quoted that way outside the repo.

**Where it sits. [VERIFIED]**, §I2:

| statement | form | status |
|---|---|---|
| `two-class-lower-bounds.md` §4b unconditional base | `x ln x` | superseded |
| free, `G₂ ≥ g` via FGKMT | `x ln x lll x / ll x` | superseded, still **[PROVEN]** |
| `two-class-lower-bounds.md` §4b INFERRED analogue | `x ln²x lll x / ll x` | superseded, and it was **conditional** |
| **this theorem** | `x ln³x (lll x)² / (ll x)⁴` | **unconditional** |
| Maier–Pomerance, `two-class-lower-bounds.md` §4b ledger | `x ln^{3+o(1)} x` | **CONJ**, above |

Measured ratios: transferred/free runs `1.5637e2` at `L = 10²` to `1.5733e20` at
`L = 10¹²`; transferred/§4b runs `1.5637e0` to `1.5733e8`, which is the one
factor of `ln x` the brief predicted and which is worth only **1.56** at
`L = 10²`; transferred/MP runs `5.1856e-3` down to `1.8898e-5`.

**A lower bound sitting below a conjectured truth is the only consistent
arrangement**, and the ratio falls like `(lll x)²/(ll x)⁴`, so it never crosses.
Against the standing upper bound `G₂ ≪_ε x^{4.26645+ε}` there is no contact at
all, and nothing here moves that exponent.

**Note that the §4b analogue this supersedes was itself conditional** — §4b tags
it *"contingent on the Rankin/FGKMT refinements transferring, which is not free:
they need survivor counts in arithmetic progressions, that is, a level of
distribution for the dimension-2 sieve"*. The transferred bound needs no such
thing: Corollary 1 is an upper-bound sieve on `[1,m]` and asks for no level of
distribution. **So the new bound is one log higher AND on firmer ground.**

---

## 5. What "for large enough `y`" costs, and what it explains

K–K's proof is asymptotic and the paper never quantifies `A`, `B` or `y₀`. Every
hypothesis of the substituted proof is now an explicit inequality, so §H
bisects for `y₀`. **[VERIFIED]**

| condition | inequality in `L = ln y` |
|---|---|
| H1 `z₀ > 3` | `A ln L > ln 3` |
| H2 `z₀ < z₁` | `A² ln²L < L lnln L` |
| H3 `z₁ < √y` | `2 lnln L < A ln L` |
| H4 Case 1 | `ln2 − lnB + 3 lnL + 2 ln lll − 4 ln ll < A ln L` |
| H5 smooth count | `ln2 + ln(m/y) + ln ρ(u) + ln3 + lnL < 0` |
| H6 greedy | `L > 11.8073` |

| `A` | `L₀ = ln y₀` | `y₀` | binding |
|---|---|---|---|
| 4.05 | `3.0867e2` | `10^134.1` | H2 |
| 4.5 | `4.0795e2` | `10^177.2` | H2 |
| 5 | `5.3747e2` | `10^233.4` | H2 |
| 7 | `1.2733e3` | `10^553.0` | H2 |
| 10 | `3.1008e3` | `10^1346.7` | H2 |

`B` does not move `y₀` at all — `B = 10` and `B = 1000` give the same `L₀` to five
figures — because `B` enters only H4, which §2 Case 1 shows is slack.

**The binding condition is always H2, `z₀ < z₁`.** That is a property of K–K's
own band geometry and has nothing to do with the substitution: their construction
has the same `y₀` at the same `A`. Read it as the price of an asymptotic
Erdős–Rankin argument, not as a defect in one.

**It is also the complete explanation of attack I's D4.**
`attack-lower-bound.md` §4 records that the three-band construction certifies at
five accessible `y` but "loses to the §5d greedy by 4.0 to 6.6". At `y = 4001`
the bands do not exist — `z₀ = (ln y)^A` with `A > 4` is already `1.5e6`, past
`y`. **No finite computation can exhibit this construction working as designed,
so D4 was never evidence about the exponent in either direction.** That was
stated as a suspicion in attack I; it is now a computation.

---

## 6. What the bound is worth: K–K's Theorem 1 does not recover the classical case

This is the calibration that matters most for anyone tempted to treat the
transferred exponent as final. **[VERIFIED]**, §I1.

Take `f(x) = x`. Then `j_f` **is** the ordinary Jacobsthal function, `ℓ_f = 1`,
`h_f = 0`, and `M(f) = 1` (every fibre of the identity is a point; consistent
with their own Theorem 3(i), `M(x^d) = τ(d)`, at `d = 1`). Theorem 1 reads

```
j(P(y))  ≫  y (ln y)⁰ · ( ln y · lll y / (ll y)² )¹  =  y ln y lll y / (ll y)²
```

against the bound K–K themselves quote on their own page 2, from
Ford–Green–Konyagin–Tao: `j(P(y)) ≫ y ln y lll y / ll y`. **Their general theorem
is weaker than the known special case by exactly one factor of `lnln y`.** The
measured ratio is `4.6052, 6.9078, 9.2103, 13.8155, 20.7233` at `L = 10² … 10⁹`,
matching `lnln y` to every digit printed.

That is not an error in their paper — a general theorem is entitled to be weak at
a special case, and theirs generalises in a different direction. It comes from
using a **fixed `A`** in `z₀ = (ln y)^A` rather than the optimised Erdős–Rankin
band choice. **But the transferred two-class bound inherits the same slack**, so

> `x ln³x (lll x)²/(ll x)⁴` is a **floor on what this method gives**, not the
> method's ceiling.

**[INFERRED]** — an optimised band choice, or importing Pintz's or FGKMT's
refinements into the substituted frame, should recover one or two factors of
`lnln x`. That is not done here and is not claimed. It is the natural next
attack, and unlike everything else on the lower side it is a *paper* attack of
known size.

---

## 7. Novelty, re-verified this session with calibration

Every probe below was run in this session with `curl`, with a known-positive
calibration on the same channel and the same call shape. Standing negatives
already settled in `research/SEARCH-CONVENTIONS.md` §"do not redo" are **not**
re-run, per that file's own instruction.

### 7a. A144311 carries no formula and no reference. [ABSENT]

Channel: `oeis.org/search?q=id:A144311&fmt=text`, full record retrieved, 1193
bytes. **Zero `%F` lines and zero `%D` lines.** The record is `%I`, `%S/%T` (22
terms, `1,5,11,…,1709`), `%N`, one `%C` (*"For n > 1, a(n) == 5 (mod 6)"*), two
`%H`, one `%e`, `%Y` (*"Cf. A048670, A049300, A058989"*), `%K nonn,more,hard`,
`%O`, `%A` Andrew Carter Sep 17 2008, `%E` Alekseyev (a(8)–a(16), Nov 18 2009)
and Jinyuan Wang (a(17)–a(22), Nov 26 2024).

**Calibration, same channel, same call shape, same session:**
`oeis.org/search?q=id:A048670&fmt=text` returns 6364 bytes carrying **five `%F`
lines and one `%D` line**. So the channel does return formula and reference lines
when a record has them.

**Calibration 2, numeric:** `q=1,5,11,29,41,65,107,149,203` returns A144311.
Channel live on the object itself.

### 7b. A048670 carries the FGKMT bound, as a `%C`. [VERIFIED]

Verbatim from the retrieved record:

> `%C A048670 Ford, Green, Konyagin, Maynard, & Tao show that j(x#) >> x log x
> log log log x / log log x and hence a(n) >> n log^2 n log log log n / log log
> n. - _Charles R Greathouse IV_, Mar 29 2018`

Pintz's bound is present as both a `%C` and a `%F`. **One refinement to
`attack-lower-bound.md` §5b**, which does not say which tag the Maier–Pomerance
line carries: it is a **`%F`**, not a `%C` —

> `%F A048670 Maier & Pomerance conjecture that Max_{n <= x} A048669(n) =
> log(x)*(log log x)^(2+o(1)) which suggests a(n) = n*(log n)^(3+o(1)). -
> _Charles R Greathouse IV_, Mar 29 2018`

So the free bound is recorded for the **one-class** object and absent for the
two-class one, exactly as the corpus claims.

### 7c. Nobody has cited Kalmynin–Konyagin. [ABSENT]

| channel | query | result |
|---|---|---|
| OpenAlex, forward | `works/https://doi.org/10.48550/arxiv.2302.00459` → W4319049890 (2023) | `cited_by_count = 0` |
| OpenAlex, forward | `works/https://doi.org/10.4213/im9467` → W4393170300 (2024) | `cited_by_count = 0` |
| OpenAlex, forward | `works/https://doi.org/10.4213/im9467e` → W4393954820 (2024) | `cited_by_count = 0` |
| **OpenAlex, reverse** | `works?filter=cites:W4319049890` | **0 results** |
| **OpenAlex, reverse** | `works?filter=cites:W4393170300` | **0 results** |
| **OpenAlex, reverse** | `works?filter=cites:W4393954820` | **0 results** |
| Semantic Scholar | `paper/arXiv:2302.00459/citations?fields=title,year&limit=100` | **0 entries**, twice |

The OpenAlex reverse probe is **new this session**; attack I ran only the forward
`cited_by_count`. It is the stronger negative, because it enumerates the citing
set rather than reading a cached counter.

**Calibration, same channel, same call shape, same session.**

- **OpenAlex, forward:** `works/https://doi.org/10.4007/annals.2016.183.3.4`
  (Ford–Green–Konyagin–Tao, *Large gaps between consecutive prime numbers*)
  returns `cited_by_count = 46`.
- **OpenAlex, reverse:** `works?filter=cites:W2964097236` returns **48 results**,
  first *"Long gaps between primes"*.
- **Semantic Scholar, identical endpoint and parameters:**
  `paper/arXiv:1408.4505/citations?fields=title,year&limit=5` returns **5
  entries** (2026 Gilbreath, 2026 quantum processors, 2026 bounded gaps, 2026
  Goldbach, 2025 random polynomials). The record endpoint
  `paper/arXiv:1408.4505?fields=title,citationCount` returns
  `citationCount = 80`.

All three probes are live and return non-zero on the neighbouring literature.
Semantic Scholar's calibration required a 200-second backoff — its record
endpoint returned HTTP 429 repeatedly, and the two negatives quoted above come
from calls that returned HTTP 200 with an empty `data` array, not from a
rate-limited call.

### 7d. No two-class lower bound turns up on a topical sweep. [ABSENT]

Channel: OpenAlex `works?search=Jacobsthal function primorial lower bound`,
5 results. None is a lower bound for the two-class object. The nearest is
Ziller–Morack, *On differences between consecutive numbers coprime to
primorials*, arXiv:2007.01808 (2020), whose abstract was retrieved in full: it
studies **which even numbers fail to occur** as a difference below `j(p_k#)`,
not the size of `G₂`. Same channel, same call shape; calibration is 7c's.

### 7e. Channels that failed, with no negative claimed from them

- **arXiv API.** `export.arxiv.org/api/query` returned **zero bytes** on the
  known-positive calibration query `all:"Jacobsthal function"`. Channel dead,
  the same failure attack I's producing session found. **No negative is quoted
  from it.**
- **Semantic Scholar's record endpoint** `paper/{id}?fields=citationCount`
  returned HTTP 429 on every attempt for the K–K id, including after two
  backoffs, so **no `citationCount` figure is quoted for K–K.** Its *citations*
  endpoint did answer, is calibrated in §7c, and is the only Semantic Scholar
  channel quoted.

### 7f. What is and is not novel, stated narrowly

`SEARCH-CONVENTIONS.md` already settles that the **multi-class Erdős–Rankin
construction is Kalmynin–Konyagin's, not ours** (row: *"Is our multi-class
Erdős–Rankin claim novel? **No** — Kalmynin–Konyagin"*). Nothing here reopens
that, and §1c credits the mechanism to them throughout.

What §7a–7d support is narrower and, given 7c, close to mechanical:

> **[INFERRED]** K–K's method has not been instantiated at the free-translate
> difference-2 system, and the resulting bound for `G₂` is not in print. The
> reason is not that anyone tried and failed: **nobody has built on the paper at
> all**, on the strongest citation channel available and in both directions.

`covering-dive.md` §4.2 named the open step verbatim — *"substituting an
arbitrary 2-element set requires re-deriving that trichotomy for
`Ω_p = {a_p, a_p − 2}`"*. **That step is discharged by §2 above.**

---

## 8. What this changes in the corpus

Four edits. **None is applied here**; this is a staging report and it may not
edit the corpus.

**(a) `two-class-lower-bounds.md` §3's headline sentence is now false.** It reads
*"This is the strongest lower bound available for `G₂` today"* of the free bound
`x ln x lll x/ll x`. §4 above is two logs above it. The **[PROVEN]**-with-source
status of §3's bound is untouched and it remains the strongest bound with a
published left-hand side; the sentence needs the qualifier.

**(b) `two-class-lower-bounds.md` §4b's INFERRED analogue is superseded, and by
something unconditional.** §4b lands at `x ln²x lll x/ll x` and tags itself
contingent on a level of distribution for the dimension-2 sieve. §4 above lands
one log higher and needs no such thing. §4b's three-row ledger — base 1,
survivor density +1, Maier–Pomerance +1 — should gain a fourth reading: **K–K's
band-2 device buys the survivor-density log a second time**, because `Ω^I` is
charged at band-2 primes and paid for by smoothness rather than by a choice. That
is the mechanism §4b's accounting does not have.

**(c) `covering-dive.md` §4.2's named blocker is discharged.** The file records
the trichotomy re-derivation as the unchecked step. §2 above is that
re-derivation, and §2's Case-2 paragraph is the answer to why it was easier than
the file expected.

**(d) `ZONE-POSTULATE.md` §3, line 100, survives with one word changed.** The
claim *"apparently the first lower bound recorded for the two-class Jacobsthal
problem"* was about the free bound; the corpus now has a stronger one, so the
sentence should point at §4 above instead. **The Postulate's safety is
unaffected and should be restated with the new number**: the threshold needs
`G₂(x#) < x′²`, and `x²/(x ln³x) = x/ln³x → ∞`, so the margin is still
`x^{1−o(1)}`. A stronger construction-side bound was the one thing that could
have threatened it. It does not.

### Draft CHANGELOG entry

*(For `research/history/CHANGELOG.md`. Not applied.)*

> **2026-08-18/19 — Attack 4: the Kalmynin–Konyagin substitution is finished at
> D3, and the two-class lower bound gains a log.** `covering-dive.md` §4.2's
> named blocker — re-derive K–K's Cases 1–3 for `Ω_p = {a_p, a_p−2}` — is
> discharged in `research/history/staging/attack-kk-substitution.md` §2, written
> as a proof rather than as checks. **New theorem:**
> `G₂(P(y)) ≫ y (ln y)³ (lnlnln y)²/(lnln y)⁴` for `y ≥ y₀`, derived here from
> PROVEN inputs (K–K's Lemma 1 / Corollary 1 at `κ = 4`, Mertens with
> Rosser–Schoenfeld, the standard smooth-number estimate, CRT) and **not
> refereed**. **Case 2 is vacuous** (`h_f = 0`), so Lemma 2, Chebotarev,
> Theorem 2, Lemma 3 and all of K–K §3 are consumed by nothing; **Case 3 is
> strictly stronger**, `|Ω^III_p| = 2` at every odd prime rather than on
> logarithmic average, verified across all 78 498 primes below 10⁶;
> **`p₀ = 5` is exact**, from `Res(x(x+2), (x−1)(x+1)) = −3`, and `a_p = 1` is
> the optimal band-2 choice. **Case 1 reduces to the single inequality
> `2m/y < z₀`**, needing `A > 3` where K–K need `A > 4`. **The Mertens ledger
> decomposes exactly as `2 lnln y + 2(lnln z₁ − lnln z₀) + O(1)`**, with the
> `O(1)` identified as `−2 ln 2 + 2M − 5/3 = −2.529967` and reached to `1.9e-5`
> at `√y = 10⁷`; the exponent assembly is an algebraic identity that collapses
> to zero coefficient by coefficient, checked to `5.684e-13` at 30 parameter
> triples out to `ln y = 10³⁰⁰`. **New number the paper never gives:** `y₀`,
> `10^134.1` at `A = 4.05` rising to `10^1346.7` at `A = 10`, with `z₀ < z₁`
> always binding — a property of K–K's own band geometry. **That retires
> `attack-lower-bound.md` D4's factor-5 loss to the greedy as evidence of
> anything**: at `y = 4001` the bands do not exist and no finite computation can
> exhibit the construction. **Calibration that limits the claim:** K–K's
> Theorem 1 at `f(x) = x` is the ordinary Jacobsthal function and lands
> `y ln y lll y/(ll y)²`, weaker by exactly `lnln y` than the FGKT bound they
> quote in their own introduction, so the transferred bound is a floor on the
> method and not its ceiling. **Supersedes:** `two-class-lower-bounds.md` §3's
> "strongest lower bound available today" and §4b's INFERRED
> `x ln²x lll x/ll x`, the latter also being conditional on a dimension-2 level
> of distribution the new bound does not need. **The Zone Postulate is
> unaffected**: `x²/(x ln³x) → ∞`, margin still `x^{1−o(1)}`. **Prior art**
> re-verified this session on calibrated channels: A144311 carries zero `%F` and
> zero `%D` (calibrated against A048670's five `%F` and one `%D`, same call
> shape); all three OpenAlex records for K–K report `cited_by_count = 0` and the
> **reverse** probe `filter=cites:` returns 0 results for each, calibrated
> against FGKT at 46 and 48. Semantic Scholar's
> citations endpoint returns 0 entries for K–K against 5 for FGKT on the
> identical call. **No negative is quoted from the arXiv API**, which returned
> zero bytes on a known-positive query.

---

## 9. What this report does not claim

- **It does not move 4.26645.** Nothing on the lower side can.
- **It does not prove Lemma 1 or the smooth-number estimate.** Both are imported
  as **[PROVEN]** with their sources, exactly as K–K import them. §E shows the
  second is used with five orders of magnitude of range slack; it does not prove
  it.
- **It does not claim the construction is novel.** The multi-class
  Erdős–Rankin construction is Kalmynin–Konyagin's, as `SEARCH-CONVENTIONS.md`
  already settles. What is discharged here is the *substitution*, which
  `covering-dive.md` §4.2 named as the open step.
- **It does not claim a refereed theorem.** §4's calibration paragraph says so
  explicitly, and any statement of it outside this repo should carry that.
- **It does not verify the construction at any `y`.** §5 shows no computable `y`
  exists at which it could be verified, which is itself the finding.
- **It does not re-litigate the measured growth law.** `attack-lower-bound.md`
  §3 settles that the transferred bound and attack E's
  `0.762 x ln²x lnln x` agree on the x-exponent, do not cross until
  `x = 10^7327`, and are different kinds of statement. Nothing here disturbs it,
  and §4's table is consistent with it: the transferred bound sits **below** the
  Maier–Pomerance conjectural size at every computable `x`.
- **It quotes no negative from an uncalibrated channel.** §7e names the two that
  failed and what is not being claimed from them.

---

## 10. Reproduction and gate

```
# the PDF of record, md5 b5d7d2a23ffd902415057adebfe430b1
curl -sSL -o kk_v2.pdf https://arxiv.org/pdf/2302.00459
pdftotext -layout kk_v2.pdf -            # section 2 is pages 3-7

# the script, and the only sanctioned way to put its run into it
node research/attack-kk-substitution.js
node research/qc/embed.js research/attack-kk-substitution.js
node research/qc/embed.js --check research/attack-kk-substitution.js

# the probes of section 7
curl -s "https://oeis.org/search?q=id:A144311&fmt=text"
curl -s "https://oeis.org/search?q=id:A048670&fmt=text"
curl -s "https://api.openalex.org/works/https://doi.org/10.48550/arxiv.2302.00459"
curl -s "https://api.openalex.org/works?filter=cites:W4319049890"
curl -s "https://api.semanticscholar.org/graph/v1/paper/arXiv:2302.00459/citations?fields=title,year&limit=100"
```

Script tail: `code-sha256 eeeb366a016925a5…`, `out-sha256 0be2b9d1f40d6ba5…`,
444 lines of output, node v22.21.0, 0.6 s; `--check` reports both matching.

`node research/qc.js` **contributes 0 findings across all eleven checks for both
files added here**, before and after. The gate's non-zero TOTAL during this wave
is entirely `uncited-script` and `no-banner-title` on scripts written by the
other nine attacks running concurrently; `attack-kk-substitution.js` appears in
none of them. `node research/qc/selftest.js`: all 22 known positives fire, all 14
controls silent.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
