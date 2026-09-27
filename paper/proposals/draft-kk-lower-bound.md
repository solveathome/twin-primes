# An unconditional lower bound for the two-class Jacobsthal function

*QUICK DRAFT, 2026-08-19. Sole author: Chris Benjaminsen. The
AI-assisted-research disclosure adopted for the suite is in `paper/PAPERS.md`
and governs this draft. Prose follows `paper/writing-style-math.md`.*

**What this document is.** A proposal draft, written so that a number theorist
can follow the argument end to end and check each step against the record. It is
not submission-grade: the implied constants are not tracked, two source readings
are unrepeated, and the bibliography is a list of what the proof consumes rather
than a survey. Everything it states is restated from
`research/two-class-lower-bounds.md` §4c and its two supporting reports, named
in §8. Nothing is re-derived here.

---

## 1. The statement

> **Theorem.** There is an absolute constant `y₀` such that for every `y ≥ y₀`
>
> ```
> G₂(P(y))  ≫  y (ln y)³ (lnlnln y)² / (lnln y)⁴
> ```
>
> with an absolute implied constant. Here `P(y) = ∏_{p ≤ y} p` and `G₂(N)` is the
> largest gap between consecutive twin-admissible slots modulo `N`, that is, the
> largest gap between consecutive `n` with `gcd(n(n+2), N) = 1`.

In the `x` frame, where `x` is the largest prime sieved and `P(y) = x#`, the same
statement reads `G₂(x#) ≫ x (ln x)³ (lnlnln x)²/(lnln x)⁴`.

**The hypotheses, stated exactly.**

1. `y ≥ y₀`. The proof is asymptotic in the sense that six explicit inequalities
   must all hold at once (§6). With every implied constant set to 1 they first
   hold together at `y₀ = 10^{134.1}`, at the parameter choice `A = 4.05`. That
   number is a **floor** on the true explicit `y₀`, not the value of it.
2. Two free parameters: `A > 4`, and `B` large in terms of `A`. The bound holds
   for every such pair, with an implied constant depending on neither.
3. The inputs listed in §8, all published: the fundamental lemma of sieve theory
   at sieve dimension `κ = 4`, Mertens with the Rosser and Schoenfeld error term,
   the standard smooth-number estimate in Hildebrand's range, and the Chinese
   remainder theorem.

**The status line, in full.** This is derived here from a published
construction, that of Kalmynin and Konyagin (*A polynomial analogue of Jacobsthal
function*, arXiv:2302.00459; Izv. Math. **88**:2 (2024) 225 to 235,
DOI 10.4213/im9467e). The construction is theirs. The substitution that carries
it to `G₂`, and the proof that the substitution goes through, are ours. Two
independent adversarial passes have checked it: the first re-derived every step,
read every load-bearing display from 200 dpi page images of the PDF of record,
and brute-forced the finite content of the key proposition over four million
values; the second re-derived the exponent assembly to machine precision and
reproduced the brute force from independently written code. It has **not been
refereed**. By this corpus's legend it carries **[INFERRED]**: our deduction from
sourced facts, complete and checked here, with the derivation named on every
quotation of it.

**What it does not do.** It does not approach the twin prime conjecture, it does
not move the standing upper bound `G₂ ≪_ε x^{4.26645+ε}`, and it leaves the Zone
Postulate's margin exactly where it was: the Postulate needs `G₂(x#) < x′²`, and
`x²/(x ln³x) → ∞`, so the margin is still `x^{1−o(1)}`. A stronger
construction-side bound was the one thing that could have threatened the
Postulate. This is not it.

---

## 2. Context

**The object.** Where Jacobsthal's `g(x#)` asks for the longest run of
consecutive integers each sharing a factor with `x#`, `G₂(x#)` asks the same of
twin slots: the longest run of `n` for which `n` or `n+2` shares a factor with
`x#`. It is OEIS **A144311**, shifted by one, recorded there since 2008 under
wording that uses none of our vocabulary, and `research/SEARCH-CONVENTIONS.md`
§1 carries the owning convention. Each prime now deletes two residue classes
rather than one, at fixed offset 2 and with the pair free to slide, which makes
`G₂` an adversarial covering problem:

> **Elementary, by the Chinese remainder theorem** (`research/two-class-lower-bounds.md` §1).
> `G₂(P(y)) − 1` equals the maximum length of an interval `[1, m]` that can be
> covered by choosing, for each prime `p ≤ y`, one residue `a_p` and deleting
> `{a_p, a_p − 2} mod p`.

**The previous best, and it was free.** Twin slots are a subset of the integers
coprime to `x#`, so any run with no coprime integer in it has no twin slot in it
either, giving `G₂(x#) ≥ g(x#)` pointwise with no sieve input at all. Feeding
that the Ford, Green, Konyagin, Maynard and Tao bound for `g` gives

```
G₂(x#)  ≥  g(x#)  ≫  x ln x lnlnln x / lnln x
```

which is proven, published on its right-hand side, and, per the audit in
`research/two-class-lower-bounds.md` §3, the first lower bound of any kind
recorded for a two-class Jacobsthal function. The theorem of §1 stands above it
by a factor `(ln x)² lnlnln x/(lnln x)³`, which is the sense in which it is two
logs higher. It also stands one log above the corpus's own earlier two-class
Rankin adaptation (`research/two-class-lower-bounds.md` §4b), which reached
`x ln²x lnlnln x/lnln x` and was conditional on a level of distribution for the
dimension-2 sieve that the new bound does not need.

**Where the three logs come from.** The exponent decomposes as
`ℓ_f + M(f) − 1 = 2 + 2 − 1 = 3`, and each part has a mechanism:

| source of a log | one class | two classes |
|---|---|---|
| Erdős and Rankin base, one survivor per large prime | 1 | 1 |
| survivor density after the small primes, `1/(ln z)^{ℓ_f}` at `ℓ_f = 2` | 0 | +1 |
| the band-2 device, `M(f) = 2` (§5 below) | 0 | +1 |
| Maier and Pomerance multi-kill, conjectural | +1 | +1 |
| **total exponent of `ln x` above `x`** | **2, conjectural** | **4 conjectural, 3 unconditional** |

The conjectural two-class ceiling is therefore `G₂(x#) = x (ln x)^{4+o(1)}`, one
log above the unconditional floor proved here, and still `x^{1+o(1)}`.

---

## 3. The construction

Fix `A > 4` and `B` large in terms of `A`, and set

```
z₀ = (ln y)^A
z₁ = exp( lnlnln y · ln y / (A · lnln y) )
m  = (y/B) (ln y)³ (lnlnln y)² / (lnln y)⁴
```

which is Kalmynin and Konyagin's `m` evaluated at `ℓ_f = 2`, `h_f = 0`,
`M(f) = 2`. Choose one residue `a_p` per prime `p ≤ y` in three bands:

| band | primes | `a_p` | kill set `{a_p, a_p − 2}` |
|---|---|---|---|
| 1 | `p ≤ z₀` and `z₁ < p < y/2` | `0` | `{0, −2}` |
| 2 | `z₀ < p ≤ z₁` | `1` | `{1, −1}` |
| 3 | `y/2 ≤ p ≤ y` | greedy, one leftover `i` per prime | one point |

Take `x ≡ −a_p (mod p)` for every `p ≤ y` by the Chinese remainder theorem. Then
`p | x+i` exactly when `i ≡ a_p`, and `p | x+i+2` exactly when `i ≡ a_p − 2`, so
`i` is killed by `p` exactly when `i mod p` lies in that prime's kill set. If
every `i ≤ m` is killed then no `i` in `[1, m]` starts a twin pair coprime to
`P(y)`, and `G₂(P(y)) ≥ m + 1`.

The sieve sets fed to the fundamental lemma at sifting level `z = √y` are

```
Ω^I_p   = {0, −2}    for every p ≤ √y        the sieve form of the pair
Ω^II_p  = ∅          h_f = 0, there is no non-linear factor
Ω^III_p = {1, −1}    for z₀ < p ≤ z₁         the free translate
Ω_p     = Ω^I_p ∪ Ω^II_p ∪ Ω^III_p
```

**The observation that makes the substitution legal.** Band 1 sets `a_p = 0`, and
at `a_p = 0` the covering form `{a_p, a_p − 2}` and the fixed sieve pair `{0, −2}`
are the same set. The covering freedom is spent in band 2 alone. The two
formulations therefore never have to be reconciled, each being used in its own
band. `research/qc/units.js` §5 records that confusing them has caused one error
in this corpus before, which is why the point is made explicitly rather than
passed over.

**Our object is not theirs, and the transfer is of method only.** Kalmynin and
Konyagin's `j_f` shifts the value: at `f = x(x+2)` the fibre is
`{−1 ± √(1 − x_p)}`, centre fixed and separation varying. `G₂` shifts the
argument, centre varying and separation fixed at 2. Their Theorem 1 at
`f = x(x+2)` may not be applied and read off as a `G₂` bound. What transfers is
the construction, instantiated on our own system, and the result is a different
proof of a different theorem that lands on the same right-hand side.

---

## 4. The trichotomy

Throughout, `i ∈ [1, m]`, and "unkilled" means unkilled by bands 1 and 2.

> **Proposition.** If `i ≤ m` is unkilled after bands 1 and 2, then at least one
> of:
> **(a)** `i ≤ √y + 2`;
> **(b)** `i` or `i + 2` is `z₁`-smooth;
> **(c)** `i mod p ∉ Ω_p` for every `p ≤ √y`.

*Proof.* Suppose (c) fails, so `i mod p ∈ Ω_p` for some `p ≤ √y`. Since
`Ω_p` is the union of the three sets above, one of three cases holds.

**Case 1, `i mod p ∈ Ω^I_p`.** Then `i ≡ 0` or `i ≡ −2 (mod p)`, that is `p | k`
where `k = i` or `k = i + 2`, so `1 ≤ k ≤ m + 2`. If `k = p` then
`i ≤ p + 2 ≤ √y + 2` and (a) holds. Otherwise `k` is composite. Because `i` is
unkilled by band 1, neither `i` nor `i+2` has a prime factor in
`[2, z₀] ∪ (z₁, y/2)`, so every prime factor of `k` lies in
`(z₀, z₁] ∪ [y/2, ∞)`. Let `P` be the largest. If `P ≤ z₁` then `k` is
`z₁`-smooth and (b) holds. If `P ≥ y/2` then `k/P ≤ (m+2)/(y/2) < 2m/y`, while
every prime factor of `k/P` exceeds `z₀`, so under

```
2m/y < z₀
```

the cofactor `k/P` has no prime factor at all, `k/P = 1`, and `k = P` is prime,
contradicting `k` composite.

**Case 2, `i mod p ∈ Ω^II_p`.** The hypothesis is that some irreducible
non-linear factor `q` of `f` has `q(i) ≡ 0 (mod p)`, the source's `Ω^II_p` being
`{t : ∃ non-linear irreducible factor q(x) of f(x) with q(t) ≡ 0}`, read from the
PDF of record at p. 6. But `f(x) = x(x+2)` is a
product of two linear factors over `ℤ`, so `h_f = 0`, `Ω^II_p = ∅` at every
prime, and the case quantifies over an empty set. It is unsatisfiable and
contributes nothing.

**Case 3, `i mod p ∈ Ω^III_p`.** Then `z₀ < p ≤ z₁` and `i ≡ 1` or
`i ≡ −1 (mod p)`, which is exactly the band-2 kill set, so `i` was killed at
band 2, contrary to assumption. ∎

**What Case 1 consumes**, and it is the whole of what the case consumes, is the
single inequality `2m/y < z₀`. Since `m ≤ y (ln y)³`, that step alone asks only
`A > 3`. The proof as a whole still needs `A > 4`, from the smooth-number step of
§5, and the two must not be confused.

**What Case 2 takes with it.** Kalmynin and Konyagin's Lemma 2, their use of the
effective Chebotarev density theorem, their Theorem 2, their Lemma 3 and the
Galois groups `G_f` and `G_f⁺`, that is the whole of their §3, are consumed by
nothing here. Lemma 2 and Chebotarev drop because `Ω^II` is empty. Theorem 2,
Lemma 3 and the Galois groups drop for the Case 3 reason instead: they exist to
compute `M(f)`, and our `Ω^III_p` has exactly two elements at every odd prime,
with no logarithmic average and no exceptional primes. Roughly half the paper is
not needed.

**Three structural facts, and each is a resultant rather than a sweep.**

| what the method needs | what the substituted system gives | source |
|---|---|---|
| `\|Ω^I_p\| = ℓ_f` above some unquantified `p₀` | `\|Ω^I_p\| = 2` for every `p > 2` | `Res(x, x+2) = 2` |
| the three `Ω` pairwise disjoint above `p₀` | disjoint for every `p ≥ 5`; `p = 3` is the last overlap | `Res(x(x+2), (x−1)(x+1)) = −3` |
| a sieve dimension `κ`, theirs `3 deg f = 6` | `κ = 4` | `\|Ω^I\| + \|Ω^III\| = 4`, `Ω^II = ∅` |

The band-2 choice `a_p = 1` is also optimal: `Res(x(x+2), (x−a)(x−a+2)) = a²(a²−4)`,
the values `a ∈ {0, 2, −2}` are degenerate, and among the rest `a = ±1` minimise
`|Res|` at 3, which is the floor because `3 | a²(a²−4)` whenever `3 ∤ a`.

---

## 5. The sieve, and the Mertens ledger

Write `R` for the number of `i ≤ m` unkilled after bands 1 and 2. The
Proposition gives

```
R  ≤  S(m, Ω)  +  O(√y)  +  2 Ψ(m + 2, z₁)
```

the factor 2 on the smooth count because branch (b) is a statement about `i` or
`i + 2`.

**The fundamental lemma applies at `κ = 4`.** The corollary the construction uses
sees `Ω_p` only through `|Ω_p|`, and that is the single fact that makes the
substitution legal, because it is indifferent to whether the classes are fibres
of a polynomial or a free translate. In the source, read from the PDF of record
at p. 4:

> Suppose that for any `p ≤ z` the set `Ω_p ⊂ Z/pZ` contains `g(p)` elements …
> Then `S(X, Ω) ≪ X V(z)`.

Its hypotheses hold. `g(p) ≤ 4` everywhere, with
4 attained only on band 2. `g(p) < p` for `p ≥ 5`, and the two primes where a
band-2 count would fail, `p = 2` and `p = 3`, sit in band 1 where `g(2) = 1` and
`g(3) = 2`, because band 2 starts above `z₀ = (ln y)^A`. And `z = √y ≪ m`. A
smaller `κ` than theirs is a tightening, since `κ` enters only the implied
constant of the lemma.

**The Selberg support, which the source states as an asymptotic and a draft has
to state as an inequality.** *(Superseded 2026-09-07: not consumed; the source's
Lemma 1 is the Brun-form bound without a support parameter. See the current
manuscript `paper/kk-lower-bound.md` §6.2 and §11.2. Kept here as the draft's
history.)* An upper-bound sieve of dimension `κ` with support
`ξ` carries a remainder `Σ_{d ≤ ξ², d | P(z)} 3^{ω(d)} |r_d| ≪ ξ² (ln ξ)^{3κ−1}`,
and at `κ = 4` the exponent is `3κ − 1 = 11`. At the naive support `ξ = z = √y`
that is `y (ln y)^{11}` against a main term `y/(B ln y)`, too big by
`(ln y)^{12}`. At

```
ξ = √y / (ln y)⁷
```

the remainder is `y (ln y)^{−3}`, smaller than the main term by `(ln y)^{−2}`,
while the main term loses only a factor `(1 − 2K lnln y/ln y)^κ → 1`. Two riders
travel with that choice. First, `κ = 4` is load-bearing here rather than merely
tighter than their `κ = 6`: at `κ = 6` the exponent is 17 and the same support
fails. Second, the support must be named together with its sifting parameter,
since as written the condition is `ξ < z = √y`. The repair is free, sieve at
`z = ξ`, which changes `V(z)` by `1 + o(1)`.

**The ledger has exactly two terms.**

```
Σ_{p ≤ √y} g(p)/p  =  Σ_{5 ≤ p ≤ √y} 2/p  +  Σ_{z₀ < p ≤ z₁} 2/p  +  O(1)
                   =  2 lnln y            +  2(lnln z₁ − lnln z₀)  +  O(1)
```

The first term is `Ω^I` charged over all `p ≤ √y`, with `|Ω^I_p| = 2` in place of
`ℓ_f`. The second is `Ω^III` over band 2, with `|Ω^III_p| = 2` in place of
`M_p(f)`. The middle term of the source's three-way split, the one carrying
`h_f`, is identically zero. Both surviving terms are plain Mertens sums over a
constant, where the second was an application of Chebotarev in the original.

The `O(1)` is an identified constant rather than a shrug. With Mertens' constant
`M = 0.2614972128476428` and `lnln √y = lnln y − ln 2`,

```
Σ_{5 ≤ p ≤ √y} 2/p − 2 lnln y  →  −2 ln 2 + 2M − 2(1/2 + 1/3)  =  −2.529967
```

reached to `1.9e-5` at `√y = 10⁷`. At the `y` where no computer can look, the
explicit form of Mertens' theorem does the same work: Rosser and Schoenfeld's
Theorem 5 gives `|Σ_{p ≤ x} 1/p − lnln x − M| < 1/(2 ln²x)` (the upper bound for
`x ≥ 286`), and Dusart's Theorem 6.10 (arXiv:1002.0442) sharpens it to
`1/(10 ln²x) + 4/(15 ln³x)` for `x ≥ 10372`; `M` cancels in a band difference,
leaving, in Dusart's form at `A = 5`, a bound that falls from `2.475e-4` at
`ln y = 10³` to `1.911e-5` at `ln y = 10⁹`.

**The assembly is an identity.** Writing `ll = lnln y`, `lll = lnlnln y`,
`llll = ln lnlnln y`,

```
lnln z₀ = ln A + lll                    lnln z₁ = llll + ll − lll − ln A
Σ g(p)/p = 4 ll − 4 lll + 2 llll − 4 ln A + O(1)
exp(−Σ) = (ln y)^{−4} (ll)⁴ (lll)^{−2} A⁴
S(m, Ω) ≪ m ∏_{p ≤ √y}(1 − g(p)/p) ≪ m exp(−Σ) = A⁴ y / (B ln y)
```

which is the source's own displayed `A^{2M(f) − 2h_f} y/(B ln y)` at `M(f) = 2`,
`h_f = 0`. Every coefficient cancels, in `ln L`, in `lll`, in `ll` and in `ln A`
separately. Since the implied constant depends on `κ` alone and not on `A` or
`B`, taking `B` large against `A` gives `S(m, Ω) ≤ y/(4 ln y)`.

**The smooth-number step is the one imported estimate**, and it is where `A > 4`
comes from. With `u = ln m/ln z₁ ~ A lnln y/lnlnln y`, the leading term of
`u ln u` is `A lnln y`, the `lnlnln y` cancelling, so `Ψ(m, z₁) ≈ m (ln y)^{−A}`
and `2Ψ(m+2, z₁) = o(y/ln y)` asks for `(ln y)^{3−A} (lnlnln y)²/(lnln y)⁴ = o(1/ln y)`,
that is `A > 4`. That is exactly the `ℓ_f + M(f) = 4` the source's own version of
this step asks for. The estimate is used well inside Hildebrand's range: the
slack `ln z₁/(lnln m)^{5/3}` runs from `6.364e-1` at `ln y = 10²` to `2.339e5` at
`ln y = 10⁹`.

Hence `R ≤ y/(4 ln y) + o(y/ln y) ≤ y/(3 ln y)`.

**Band 3 finishes it.** Each remaining `i` gets its own prime `p ∈ (y/2, y]` with
`a_p ≡ i`. Rosser and Schoenfeld give
`π(y) − π(y/2) > y/ln y − 0.62753 y/(ln y − ln 2)`, which exceeds `y/(3 ln y)`
exactly when `0.62753 ln y/(ln y − ln 2) < 2/3`, that is `ln y > 11.807294`, that
is `y > 1.3423e5`, far below any `y₀` in §6. Every `i ≤ m` is now killed, so
`G₂(P(y)) ≥ m + 1`, which is the theorem. ∎

---

## 6. The parameters, and what "for large enough `y`" costs

Every hypothesis above is an explicit inequality in `L = ln y`:

| condition | inequality |
|---|---|
| H1, `z₀ > 3` | `A ln L > ln 3` |
| H2, `z₀ < z₁` | `A² ln²L < L lnln L` |
| H3, `z₁ < √y` | `2 lnln L < A ln L` |
| H4, Case 1 | `ln 2 − ln B + 3 ln L + 2 ln lll − 4 ln ll < A ln L` |
| H5, smooth count | `ln 2 + ln(m/y) + ln ρ(u) + ln 3 + ln L < 0` |
| H6, band 3 | `L > 11.8073` |

Bisecting for the first `L` at which all six hold, with every implied constant
set to 1:

| `A` | `L₀ = ln y₀` | `y₀` | binding condition |
|---|---|---|---|
| 4.05 | `3.0867e2` | `10^{134.1}` | H2 |
| 4.5 | `4.0795e2` | `10^{177.2}` | H2 |
| 5 | `5.3747e2` | `10^{233.4}` | H2 |
| 7 | `1.2733e3` | `10^{553.0}` | H2 |
| 10 | `3.1008e3` | `10^{1346.7}` | H2 |

`B` does not move `y₀` to five figures, because it enters only H4, which is
slack. The binding condition is always H2, `z₀ < z₁`, which is a property of the
source's band geometry and has nothing to do with the substitution: their own
construction has the same `y₀` at the same `A`.

Two consequences. `10^{134.1}` is the floor a reader gets by setting every
implied constant to 1, so a genuine explicit `y₀` is larger by an amount not
known here. And band 2 is empty at every accessible `y`: at `y = 4001`,
`z₁ = 2.07` while `z₀ = 5.26e3` at `A = 4.05`. No finite computation in this
corpus can exhibit the construction working as designed, so the factor 4.0 to
6.6 by which a three-band certificate loses to a plain greedy search at
`y = 4001` (`research/history/staging/attack-lower-bound.md` D4) is not evidence
about this theorem in either direction.

**The bound is a floor on the method, not its ceiling.** Run the source's
Theorem 1 at `f(x) = x`, where `j_f` is the ordinary Jacobsthal function,
`ℓ_f = 1`, `h_f = 0`, `M(f) = 1`. It gives `j(P(y)) ≫ y ln y lnlnln y/(lnln y)²`,
weaker by exactly one factor of `lnln y` than the Ford, Green, Konyagin and Tao
bound quoted on their own page 2, the measured ratio running `4.6052` at
`ln y = 10²` to `20.7233` at `ln y = 10⁹`. The slack comes from a fixed `A` in
`z₀ = (ln y)^A` rather than an optimised Erdős and Rankin band choice, and the
transferred bound inherits it. An optimised band choice, or the Pintz and FGKMT
refinements imported into the substituted frame, should recover one or two
factors of `lnln x`. That is not attempted here and is not claimed.

---

## 7. Where each step is verified

The two supporting reports are `research/history/staging/attack-kk-substitution.md`
(the derivation, section by section, produced by
`research/attack-kk-substitution.js`) and
`research/history/staging/verify-kk-substitution.md` (the first adversarial pass,
produced by `research/verify-kk-substitution.js`). The second adversarial pass is
recorded in `research/history/CHANGELOG.md` under "The K–K substitution: second
adversarial pass".

| step | where it is checked | what the check found |
|---|---|---|
| the bridge from `G₂` to a covering problem | `research/two-class-lower-bounds.md` §1, re-derived in the first pass | elementary, holds |
| the corollary sees `Ω_p` only through `\|Ω_p\|` | read at the source, PDF of record, first pass | true as printed |
| `Ω^II = ∅`, Case 2 vacuous | read at the source; the `h_f` factor evaluates to `1.000000` at every scale tested | holds |
| `\|Ω^III_p\| = 2` at every odd prime | sweep of all 78,498 primes below `10⁶` | zero exceptions |
| `κ = 4`, and `g(p) < p` | enumeration of every prime to 1000 | only `p = 2, 3` overlap, both in band 1 |
| the Proposition itself | exhaustive brute force, `i = 1 … 4·10⁶` at `y = 200000`, `z₁ = 300` | see below |
| the Mertens constant | residual against `−2.529967` at `√y = 10³ … 10⁷` | `0.0079` falling to `1.9e-5` |
| Mertens at real band endpoints | Rosser and Schoenfeld bound evaluated there | `2.475e-4` at `L = 10³`, `1.911e-5` at `L = 10⁹` |
| the exponent assembly | 30 parameter triples out to `ln y = 10³⁰⁰`, and a second pass at machine precision | `max \|ratio − 1\| = 5.684e-13` |
| the smooth-number step | least admissible `A` bisected at each scale | rises `2.3196 … 3.8185`, approaching 4 from below |
| `y₀` and the binding condition | bisection over the six inequalities, reproduced independently | H2 binding at every `A` |

**The brute force, stated with its correct reading.** At `y = 200000`,
`z₁ = 300`, `m = 4·10⁶`, so the Case 1 threshold is `2m/y = 40`:

| `z₀` | `2m/y < z₀` | unkilled `i ≤ m` | counterexamples to the Proposition |
|---|---|---|---|
| 100 | yes | 16985 | 0 |
| 60 | yes | 14381 | 0 |
| 45 | yes | 13164 | 0 |
| 30 | no | 11228 | 235 |
| 20 | no | 10372 | 799 |
| 10 | no | 9086 | 2921 |

The hypothesis Case 1 claims to consume is **sufficient** at finite scale,
counterexample-free wherever it holds, and violating it far enough breaks the
Proposition. It is not necessary: violations near the boundary produce no
counterexamples, measured in three parameter families. The run also rules out a
covering or sieve leak, since a leak would surface as a counterexample.

---

## 8. What the proof consumes

| input | source |
|---|---|
| the fundamental lemma of sieve theory at `κ = 4`, and its corollary | Kalmynin and Konyagin, arXiv:2302.00459v2, pp. 3 and 4, citing Halberstam and Richert Thm 2.2 |
| Mertens' theorem with an explicit error | Rosser and Schoenfeld, *Illinois J. Math.* **6** (1962), Thm 20 |
| `Ψ(x, z) ≪ x ρ(u)` in Hildebrand's range | standard, and asserted without proof in the source too |
| `π(y) − π(y/2)`, both directions | Rosser and Schoenfeld |
| the covering reformulation of `G₂` | `research/two-class-lower-bounds.md` §1, elementary with CRT |

Not consumed: the source's Lemma 2 and its Chebotarev input, its Theorem 2 and
the Galois groups, its Lemma 3 and the Birch and Swinnerton-Dyer input, the
definition of `M(f)`, and its Theorem 3.

**Provenance of every quotation and reading from the source.** The artifact of
record is the arXiv PDF `arXiv:2302.00459v2`, 12 pages, 148,566 bytes, md5
`b5d7d2a23ffd902415057adebfe430b1`, checked against the published Izvestiya PDF,
which was pulled separately and is a distinct artifact. Section 2 of the paper,
pages 3 to 7, is the entire proof of their Theorem 1. The load-bearing displays,
`m`, `z₀`, `z₁`, the `S(m, Ω)` line, the assembly on page 7 and
`π(y) − π(y/2)`, were re-read from 200 dpi page images rather than from text
extraction, and one of those five re-readings reversed a finding. The custody
record is `research/history/staging/lit-pdf-kalmynin-konyagin.md` §0.

---

## 9. What would break it

Three residuals are on the record, and a referee should go to them first.

**1. The two load-bearing readings of the source.** The proof rests on two
sentences of someone else's paper: that their corollary's conclusion depends on
`Ω_p` only through `g(p) = |Ω_p|`, and that their `Ω^II_p` is defined by the
non-linear irreducible factors of `f`, so that it is empty for `f = x(x+2)`. Both
were read from page images of the PDF of record by the first adversarial pass.
The second pass had no PDF and could not re-read them. If either reading is
wrong the substitution does not go through, and no amount of computation here
would show it.

**2. Halberstam and Richert Thm 2.2, at source.** Nobody in this corpus has read
it. *(2026-09-07: identified through Richert's Tata lectures as the Brun-form
bound with no support parameter; the correction below is about a different
theorem. See the current manuscript.)* The Selberg support correction of §5 uses the standard shape of the
dimension-`κ` remainder and the standard repair `z := ξ`, both stated from
general knowledge of upper-bound sieves rather than from the printed hypotheses.
The exponent `3κ − 1 = 11` and the choice `ξ = √y/(ln y)⁷` are load-bearing, and
a different hypothesis on `ξ` against `z` in the printed theorem would need a
different repair. The direction of the risk is known: at `κ = 6` this support
fails, so the margin is one sieve dimension wide.

**3. The implied constants.** Every constant in this draft is set to 1 where an
explicit statement would carry a number: the fundamental lemma's constant at
`κ = 4`, the smooth-number constant, the `O(√y)`, and the `O(1)` in the ledger,
which is identified but not bounded uniformly below `x = 286` where Rosser and
Schoenfeld starts. So `y₀ = 10^{134.1}` is a floor and not a value, and the
theorem as stated is ineffective until that pass is done.

None of the three touches the exponent. All three touch whether the statement can
be published as written.

---

## 10. Keep-holding criteria

This is a draft rather than a submission because it is two days old and two of its
readings are unrepeated. What would move it, in each direction:

**Upgrades it to a paper.**

- A referee-grade re-reading of residuals 1 and 2, by someone with the printed
  Halberstam and Richert and the Kalmynin and Konyagin PDF side by side. That is
  a bounded job, a day of work, and it is the whole gate.
- An explicit-constants pass producing a real `y₀`, which turns an asymptotic
  statement into an effective one. The six inequalities of §6 are written
  already, and what is missing is the constants to put into them.
- An optimised band choice recovering the `lnln y` the method gives away (§6).
  That is an improvement rather than a repair, and it is a known-size piece of
  work on a bound that already stands.
- The bound continuing to sit below the conjectural `x (ln x)^{4+o(1)}` ceiling,
  which it does, with the ratio falling like `(lnlnln x)²/(lnln x)⁴`.

**Downgrades or kills it.**

- A prior-art hit. The claim to novelty is narrow: the multi-class Erdős and
  Rankin construction is Kalmynin and Konyagin's, and what is new is the
  instantiation at the free-translate difference-2 system. Searches in the owning
  conventions of `research/SEARCH-CONVENTIONS.md` found nothing on calibrated
  channels, and as of 2026-08-19 no work cites the source paper on OpenAlex in
  either direction or on Semantic Scholar, each calibrated against Ford, Green,
  Konyagin and Tao in the same session on the same call shape (expiry: re-run on the source paper's DOI, never its arXiv id, at the next audit). A
  hit in any convention that file lists, the A144311 wording, the paired
  Jacobsthal function, the bounded-residue-classes-per-prime formulation, or
  `j_f` itself, retires the novelty claim, though not the theorem.
- A failure at residual 1 or 2. Residual 1 kills the substitution. Residual 2
  costs the `ξ` repair and would need the sieve step rebuilt, with `κ = 4` the
  only reason the current repair fits.
- A published bound stronger than this one, at which point the move is to cite it
  and keep the exponent ledger of §2, which is ours regardless.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in
[research/history/CHANGELOG.md](../../research/history/CHANGELOG.md), indexed by
document.*
