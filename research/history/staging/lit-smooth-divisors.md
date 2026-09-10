# The divisor-distribution estimate behind lim Var/E, searched in the Ford/Hooley convention: the machinery is in print, the statement is not

<!-- ledger
id: Q-varE-limit
status: PARTIAL
todo: 9
question: Does lim Var/E on the diagonal window exist, and what is it?
verdict: PARTIAL, and not ABSENT. The owning convention is H_F(x,y,z) (Tenenbaum's localisation des diviseurs de F(n)), Hooley's Delta-function, and Koukoulopoulos's localized factorizations, searched on three channels each calibrated in session; no theorem in print bounds the residual with the needed saving, because every located result is a SET count (integers with at least one divisor in an interval) at a divisor range strictly BELOW the sampling range (y <= x^{1-eps}, Tenenbaum I with reducible F; y <= x/2, Tenenbaum II with F irreducible only; y <= sqrt x, Ford), at order-of-magnitude or (log y)^{o(1)} precision, while the statement needs a weighted sum over EVERY divisor ABOVE the range with relative error O(1/ln y) — and Ford's own 2008 open problem (i) is that no asymptotic exists even for H(x,y,2y). Friability changes nothing: the friable literature bounds Delta (a maximum, never a cancellation) or restricts to positive-density prime sets. ONE artifact could still change the answer and was not obtained: Scourfield, Smooth divisors of polynomials, LMS Lect. Notes 352 (2008) 286-311, whose author summary claims an asymptotic with error term for friable divisors m <= x of f(n) with f squarefree monic reducible — abstract-only here, so no absence is written and the reduction may NOT be called new.
-->

*Staging note, 2026-08-28. Literature scout for the one open step of
`varE-theta2-proof.md` §6. Nothing computed; nothing in this repository is
recomputed. Search log below, with sha256 and full-text/abstract status per
artifact.*

## 0. Verdict, the weak half first

**No absence is asserted, and one artifact could overturn the reading.**
Scourfield, *Smooth divisors of polynomials* (LMS Lect. Notes 352, CUP 2008,
286-311) is **abstract-only** here: her own summary claims an asymptotic with a
good error term for the number of divisors `m <= x` of `f(n)` summed over
`n <= x`, and for those divisors free of large prime factors, with `f` monic
squarefree and not necessarily irreducible. That is four of our statement's
features at once. Until it is read at the page, this note supports no sentence
of the form "not in print", and `varE-theta2-proof.md` §6's warning stands: the
reduction may **not** be called new.

**One channel of four never answered.** Semantic Scholar returned HTTP 429 on
its own calibration query, and MathSciNet was not run. Forward-citation walks on
Ford 2008 and on Tenenbaum I/II were **not run**, so a 2008-2026 successor
supplying the missing asymptotic would not have been seen by this pass.

**Nothing here moves either open step, and nothing here touches the
conjecture.** `variance-note.md` §4 already records that `Var/E` over a
uniformly random window says nothing about the one anchored window the twin
problem needs.

With that said: **PARTIAL.** The convention that owns the object was found and
searched, the tools in it are real, and the exact statement is not in it.

- The owning convention is `H_F(x,y,z)`, Hooley's `Delta`-function, and
  localized factorizations `H^{(k+1)}`; the smoothness word is **friable**, and
  `"smooth divisors"` as a title phrase is algebraic geometry (§2).
- Every located theorem counts integers with **at least one** divisor in an
  interval, at a divisor range **strictly below** the sampling range — Ford
  `y <= sqrt x`, Tenenbaum I `y <= x^{1-eps}`, Tenenbaum II `y <= x/2`,
  Scourfield `m <= x` — while our divisors satisfy `n > 2L`. **Above the range,
  not inside it.** (§3, §5)
- Precision in that convention is order of magnitude (Ford, Koukoulopoulos) or
  `(log y)^{o(1)}` (Tenenbaum's Théorème A). Our statement needs relative error
  `O(1/ln y)`. Scourfield 2008, read second-hand through her 2016 restatement
  (`lit-scourfield-2008.md`, 2026-08-29), carries relative error `O(1/log x)`
  for the divisor-sum object under a friability restriction: the right
  register, one epsilon short of the `o(1/ln y)` the open step needs, and at a
  divisor range `m <= x` below ours. **Ford's own §1.6 open problem (i) is "Strengthen Theorem 1 to an
  asymptotic formula."** (§3.1)
- The one theorem that reaches `y <= x/2` requires `F` **irreducible**; ours is
  the reducible cubic `(C-2)C(C+2)`. The one that allows reducible `F` is the
  one with the weakest range and the weakest precision. (§3.7, read at page
  images)
- **Friability does not change the answer.** The friable literature either
  bounds `Delta`, a maximum and never a cancellation, or restricts to
  positive-relative-density prime sets, which `y`-smooth is not. (§4)
- The missing lemma is named in §5, with the six axes on which it differs from
  what is in print, and a route through the complement `sum_{all n} - sum_{n<=2L}`
  that is **suggested and not costed**.

## 1. The statement being searched, quoted, not paraphrased

`varE-theta2-proof.md` §6 states the object. Quoted verbatim from that note so
that nothing is lost in restatement: for
`w(n,C) = D_y prod_{p|n} (2 or 1)/(p-4)` according as `p | C` or `p | C -+ 2`,

    sum_{0<|C|<L} (1 - |C|/L) sum_{n | C(C^2-4), n > 2L, P^+(n) <= y} w(n,C)
      =  L sum_{n > 2L} sum_{c != 0} w(n,c)/n  +  O(ln y * (something o(ln y))),

that is: **the weighted count of large `y`-smooth divisors of `C(C^2-4)` agrees
with its expected count to one logarithm better than trivially, on average over
a window of length `L = y^2`.**

Four features of that sum decide every translation below, and three of them are
easy to lose:

1. **It is a divisor SUM, not a set count.** Every divisor `n` of `C(C^2-4)`
   above `2L` is counted, with a weight. The owning literature's headline
   object, `H(x,y,z)` and `H_F(x,y,z)`, counts the integers that have **at
   least one** divisor in the interval. Those are different functions and the
   set count is the harder of the two.
2. **The divisor is LARGER than the sampling range.** `|C| < L` and `n > 2L`.
   In the literature's coordinates that is `y_lit > x_lit`, and §3 shows that
   every polynomial-value theorem located here stops at `y_lit <= x_lit/2` or
   `y_lit <= x_lit^c, c < 1`.
3. **The weights are branch-dependent.** `w(n,c)` depends not only on `n` but
   on which of the three roots `0, +2, -2` is taken at each `p | n`, through
   the factor `2/(p-4)` against `1/(p-4)`. Unweighted divisor counts and
   `omega(m)`-weighted root counts are both in print; this weighting is not the
   same object.
4. **What is needed is an asymptotic with a one-logarithm saving.** The main
   term is of size `ln^3 y` (`varE-theta2-proof.md` §5, measured, local
   exponent 2.6 then 2.5 over six levels), the admissible error is
   `o(ln^2 y)`, so the relative precision required is `O(1/ln y)`. The owning
   literature's results in this range are **orders of magnitude**, and where
   asymptotics exist they are for a different range.

**The convention flip, spelled out**, because our letters and theirs collide:

| ours | theirs | note |
|---|---|---|
| `L = y^2`, the window over which `C` runs | `x`, the sampling range | our `y` is a smoothness bound, theirs is a divisor size |
| `n`, the divisor, `n > 2L` | `d in (y_lit, z_lit]` with `y_lit = 2x_lit` | **above** the range, not inside it |
| `C(C^2-4) = (C-2)C(C+2)` | `F(n)`, monic, squarefree, degree 3, reducible | reducible is allowed by Tenenbaum I, excluded by Tenenbaum II |
| `P^+(n) <= y = L^{1/2}` | friability of the divisor at `u = ln n/ln y in (2, 6]` | a real restriction: `C, C+-2 < y^2` may each carry a prime `> y` |
| `w(n,c)`, branch-dependent | at best `omega(m)`, the root count | the literature weights roots equally |

## 2. Channels, and the calibration each carries

Every channel below was calibrated on a known positive **in the same session**,
per `research/SEARCH-CONVENTIONS.md`. A negative on an uncalibrated channel is
not recorded.

| channel | calibration positive, same session | result |
|---|---|---|
| arXiv API, `https://export.arxiv.org` | `all:"divisor in a given interval"` returns Ford math/0401223 and math/0607473 | PASS. **`http://export.arxiv.org` 301s and returns nothing** — the `https` gotcha of `SEARCH-CONVENTIONS.md` §3 is live and cost a query here |
| zbMATH open API | `ti:"divisor in a given interval"` returns Ford, *Ann. Math.* (2) 168 | PASS. Its "conflicting licenses" placeholder hides some summaries; a review is often present where the summary is not |
| OpenAlex, comma-conjunction | `distribution of integers with a divisor in a given interval` returns Ford 2008 first | PASS, but its relevance ranking degrades badly on conjunctive queries and no negative rests on it alone |
| Google Scholar via WebSearch | see §3.6 | used for the asymptotic question only |

| Semantic Scholar graph API | none — **HTTP 429 on the calibration query itself** | **UNREACHED.** No negative rests on it; owed |
| MathSciNet `mrlookup` | not run this pass | **UNREACHED**; owed, and it is bibliographic-only anyway (`SEARCH-CONVENTIONS.md` §5) |

Two false friends found and recorded, so they are not searched again:

- **"smooth divisors"** as a title phrase is algebraic geometry. Seven of the
  nine zbMATH hits on `ti:"smooth divisors"` are about divisors on
  hypersurfaces and hyperkähler manifolds. The arithmetic word is **friable**,
  or the phrase **"divisors free of large prime factors"**. The one arithmetic
  hit is Scourfield (§3.7), and it is the most relevant item in this note.
- **"divisors of polynomial values"** as a phrase returns one arXiv record and
  it is over function fields. The literature says **`H_F(x,y,z)`**, "la
  localisation des diviseurs de `F(n)`", and, for the tool, **Hooley's
  `Delta`-function**.

## 3. What is in print, read, and translated onto the statement

### 3.1 Ford, *The distribution of integers with a divisor in a given interval*, Ann. of Math. (2) **168** (2008) 367-433

Read in full, arXiv:math/0401223v5,
`sha256 4d88888aeeb4c8fb6079309908c01914ca12fc2e21a76c57525b8e5242eb7d98`.

**What it proves.** Theorem 1 gives the **order of magnitude** of
`H(x,y,z) = #{n <= x : n has a divisor in (y,z]}` for all `x, y, z`; the
headline case is `H(x,y,2y) asymp x/((log y)^delta (log log y)^{3/2})` for
`100 <= y <= sqrt x`, `delta = 1 - (1+log log 2)/log 2 = 0.086071...`. Also
`H_r` for `r >= 2` in a stated range.

**Translation onto our sum.** Nothing, and for four independent reasons, any
one of which is fatal: (i) it counts integers with **at least one** divisor in
the interval, ours sums over **every** divisor with a weight; (ii) `F` is the
identity, ours is a cubic; (iii) `y <= sqrt x`, ours needs the divisor above
`x`; (iv) no smoothness. And the one thing our statement needs above all is an
asymptotic: **Ford's own §1.6, open problem (i), reads "Strengthen Theorem 1 to
an asymptotic formula."** That is a statement about a different and harder
function, so it does **not** by itself close our route; what it does establish
is that the owning convention has, as of its own author's list, no asymptotic
machinery in this range at all.

### 3.2 Ford, *Integers with a divisor in (y,2y]*, arXiv:math/0607473v5

Read in full, `sha256 557728b84918d0e1082536d380bfc03bc1e69e2144eefd627dd2a5dd98f776b0`.
A short proof of the central case of 3.1. Same order-of-magnitude status,
same four mismatches. Nothing.

### 3.3 Ford, *Rough integers with a divisor in a given interval*, J. Aust. Math. Soc.; arXiv:1901.02548v2

Read in full, `sha256 f667e9d2402b725fff486cc8ced724cf2f94f3fb695d1fa480de48561aef9184`.
Counts `n <= x` with no prime factor `<= w` and a divisor in `(y,2y]`, "up to
multiplicative constants", uniformly in `x,y,w`.

**Translation.** The prime-factor restriction is on the **integer `n`**, ours
is on the **divisor**. That is the opposite axis, and the paper is order of
magnitude besides. Nothing. Worth naming explicitly because the title is the
closest false match in the corpus to what our §6 needs.

### 3.4 Koukoulopoulos, *Localized factorizations of integers*, Proc. LMS (3) **101** (2010) 392-426

zbMATH review read (`id 5788157`), full text not retrieved. Bounds
`H^{(k+1)}(x, ybar, 2ybar)`, the count of `n <= x` admitting a factorization
`d_1 ... d_k | n` with each `d_i in (y_i, 2y_i]`. Upper bound
`<<_{k,delta} (log y_k/log y_1)^{k+1} x/((log y_1)^{Q(1/log rho)}(log log y_1)^{3/2})`
with `rho = (k+1)^{1/k}`, `Q(u) = u log u - u + 1`, valid when
`2^{k+1} y_1...y_k <= x/y_1^delta`; matching lower bound only when
`y_k <= y_1^c`.

**Translation.** This is the **structurally closest** published object: our
`n | C(C^2-4)` with `n` squarefree and coprime to 30 factors uniquely as
`n = n_0 n_+ n_-` with `n_0 | C`, `n_+ | C+2`, `n_- | C-2`, so we are asking a
`k = 2`, three-factor localization question about the shifted triple
`(C-2, C, C+2)`. Three mismatches: (i) the hypothesis
`2^{k+1}y_1 y_2 <= x/y_1^delta` puts the **product of the parts below the
sampling range**, and our product is `> 2L`; (ii) set count, not weighted
divisor sum; (iii) order of magnitude with an unmatched
`(log y_k/log y_1)^{k+1}`. Nothing for the saving; useful as the right name for
the shape.

### 3.5 Koukoulopoulos, *On the number of integers in a generalized multiplication table*, J. reine angew. Math. **689** (2014) 33-99

zbMATH record read (`id 6296365`); its summary is withheld by the licence
placeholder, and the full text was not retrieved. Same family, same
order-of-magnitude register per the citing literature. Nothing.

### 3.6 Koukoulopoulos, *Divisors of shifted primes*, IMRN **2010** no. 24, 4585-4627

Author summary read at zbMATH (`id 5841659`). Lower bounds for the number of
`p + s <= x` with a divisor in `(y,z]`, complementing Ford's §14.

**Translation.** The shifted-prime axis replaces our arithmetic input with
primes in progressions. Our `C` runs over **all** integers of a window; the
paper's difficulty (level of distribution for primes) is not our difficulty and
its conclusion is a one-sided bound. Nothing.

### 3.7 Tenenbaum, *Sur une question d'Erdős et Schinzel* I and II — the owning result for polynomial values

**II read at page images**, GDZ scan of *Invent. Math.* **99** (1990) 215-224,
`sha256 75676b53ce6fe3812aa5910d5822bf3c84cf96fff338b80d3335e39f1acddcef`
(GDZ `PPN356556735_0099/LOG_0023`; the file carries no text layer, so pages 216
and 217 were read as images. **The neighbouring `LOG_0021` is a Kleinian-groups
paper** — the GDZ log numbers are not article numbers and the first guess
retrieved the wrong article; check the page range on the header line before
quoting.) **I read only through E. J. Scourfield's zbMATH review** (`id 4173122`);
the volume is *A Tribute to Paul Erdős*, CUP 1990, 405-443, and no open copy was
located.

With `H_F(x,y,z) := #{n <= x : exists d | F(n), y < d <= z}`, the two statements
that matter, transcribed from the page:

- **Théorème A** (= Part I, quoted in II as ref. [11]): with
  `delta := 1 - (1+log_2 2)/log 2 = 0.08607`, for each fixed `eps > 0`,
  `H_F(x, y, 2y) = x(log y)^{-delta + o(1)}` as `x, y -> infinity` in the domain
  **`y <= x^{1-eps}`**. Part I determines `H_F(x,y,z)` "sans restriction de
  primalité concernant le polynôme `F(X)`" for `z = y(1+(log y)^{-beta})`,
  `0 <= beta = beta(y,z) << 1`, **with an uncertainty factor `(log y)^{o(1)}`.**
- **Théorème 1** (Part II): `eta > log 4 - 1`; for each `F` **irreducible** in
  `Z[X]`, `H_F(x,y,2y) > x(log x)^{-eta}` in the domain **`y <= x/2`**.
- **Théorème 3** (Part II, the key step): for `F` irreducible and each `t >= 1`,
  `sum_{n<=x} Delta(F(n))^t <<_t x(log x)^{beta(t)-1} L(log x)^{sqrt(2t)+o(1)}`
  with `beta(t) = 2^t - t`, `L(z) = exp{sqrt(log z log_2 z)}`.
- **Lemme 2.1**: with `rho(n)` the number of roots of `F` mod `n`,
  `sum_{n<=x} rho(n) = A x + O(x^{1-a})`, `A, a > 0` depending on `F`, via
  `sum rho(n)n^{-s} = zeta_K(s)Phi(s)`.

**Translation onto our sum, and it fails on three axes at once.**

1. **Range.** Ours needs divisors `n > 2L` of `F(C)` with `|C| < L`, i.e.
   `y_lit >= 2 x_lit`. Théorème A reaches `y <= x^{1-eps}`; Théorème 1 reaches
   `y <= x/2`. **Both stop strictly below the sampling range and ours starts
   strictly above it.** This is not a technical eps: for a cubic, divisors above
   `x` are the regime where the "expected count" heuristic our §6 writes down is
   exactly what is unproven.
2. **Reducibility.** `C(C^2-4) = (C-2)C(C+2)` is reducible. Part I explicitly
   allows that; Part II's Théorème 1 and Théorème 3 both require `F` irreducible,
   and Théorème 1 is the only one that reaches `y <= x/2`. So the one statement
   that gets near our range excludes our polynomial.
3. **Precision.** Théorème A carries `(log y)^{o(1)}`, weaker than an order of
   magnitude. We need a relative error `O(1/ln y)`. That is two registers away.

**What Part II does give us that is worth carrying:** Lemme 2.1's shape. The
"expected count" side of our §6 identity is exactly a `rho`-type root count, and
Tenenbaum's proof of Lemme 2.1 is a Dedekind-zeta argument with a power-saving
error. That is the right technique for the **main term** of our statement; it
says nothing about the window, which is where our difficulty is (see §5).

### 3.8 Scourfield, *Smooth divisors of polynomials*, LMS Lecture Note Series **352** (CUP 2008) 286-311 — the closest match found

**Author summary read at zbMATH (`id 6093091`); full text NOT obtained.** The
volume is *Number Theory and Polynomials* (McKee et al., eds.), CUP; no open
copy was located on any calibrated channel, and the only full-text hits were
book-piracy mirrors, which were not used. So this item is **ABSTRACT-ONLY** and
nothing below is a page reading.

The summary, in the author's words: `f` monic over `Z`, not necessarily
irreducible, **no repeated factor**; `omega(m)` the number of solutions of
`f(n) = 0 mod m`. She establishes an asymptotic formula with a good error term
for `sum_{m<=x} omega(m)`, and derives asymptotic formulae for **the number of
positive divisors `m <= x` of `f(n)` summed over `n <= x`**, and, using
Hanrot-Tenenbaum-Wu (*Proc. LMS* (3) **96** (2008) 107-135), **for the number of
these divisors `m` with no large prime factors**.

**Translation.** This is the only item located that is simultaneously (a) a
**divisor sum**, not a set count, (b) over **polynomial values** of a squarefree
reducible `f`, (c) **with a friability restriction on the divisor**, and (d) an
**asymptotic with an error term**. On all four features it matches our §6
statement, and it is the item that would have to be read at the page before any
absence is asserted. It nevertheless does not close the step, on two mismatches
that the summary itself makes explicit:

- **Range, again.** Divisors `m <= x` of `f(n)` for `n <= x`. Ours are `n > 2L`
  with `|C| < L`: above the range, not below it. Whether the method transfers is
  not decidable from an abstract.
- **Weights.** Her divisors are counted with weight 1 (equivalently, roots with
  weight 1 through `omega(m)`). Ours carry `w(n,c) = D_y prod_{p|n} (2 or 1)/(p-4)`,
  a **branch-dependent** multiplicative weight of size `4^{omega(n)}` in total
  mass. Nothing in the summary suggests the weighted version.

**Status of this item: OWED.** It is the single highest-value unread artifact
for this question.

### 3.9 The upper-bound toolkit: Hooley's `Delta`, Nair-Tenenbaum

- Hooley's `Delta(n) = max_u #{d | n : e^u < d <= e^{u+1}}`; Hall-Tenenbaum,
  *Divisors*, Cambridge Tracts **90** (1988) — Theorem 21 there is the `F(X)=X`
  case that Tenenbaum I generalizes (per Scourfield's review of I).
- Nair-Tenenbaum, *Short sums of certain arithmetic functions*, Acta Math. **180**
  (1998) 119-144 (zbMATH `id 1172070`): the standard uniform upper bound for
  `sum_{x<n<=x+z} F(|Q(n)|)`, `F` non-negative sub-multiplicative.
- The current `Delta` mean-value line: Koukoulopoulos-Tao, *Proc. LMS* (3) 2023
  (upper); Ford-Koukoulopoulos-Tao, *Proc. LMS* (3) 2024 (lower);
  de la Bretèche-Tenenbaum, *Sci. China Math.* 2023 and *Acta Arith.* 2025;
  Ford-Green-Koukoulopoulos, *Invent. Math.* **232** (2023) 1027-1160
  (`Delta(n) >= (log log n)^{0.3533...}` for almost all `n`, disproving the
  Maier-Tenenbaum conjectured optimality).

**Translation.** Every one of these bounds `Delta` or a moment of it, i.e. the
**maximum** number of divisors in a window. `varE-theta2-proof.md` §5 already
records that the maximum-versus-mean gap is precisely the missing logarithm
(`4^omega` against `2^omega`), and that taking absolute values after the one
split the kernel offers is **measured lossy** at all six levels. So an upper
bound on `Delta` cannot produce the cancellation our §6 needs — it is the wrong
kind of statement, not a weak version of the right one. This is the same trap
`SEARCH-CONVENTIONS.md` §1 records for `level of distribution`: a guaranteed and
worthless negative if searched as if it were the right tool.

## 4. The smoothness axis: does friability change the answer?

Our divisors satisfy `P^+(n) <= y` with `n > 2L = 2y^2` and
`n <= |C(C^2-4)| < L^3 = y^6`, so `u = ln n/ln y` runs over `(2, 6]`. This is
the moderately-friable regime, not an extreme one; and it is a **real**
restriction, since each of `C, C+2, C-2` is below `y^2` and may carry a prime
factor above `y`.

Four items read, and the answer is that friability does **not** rescue the step.

- **Martin-Tenenbaum-Wetzer, *On the friable mean-value of the Erdős-Hooley
  delta function*, Indag. Math. (N.S.) 2024 = arXiv:2307.05530v5.** Read in full,
  `sha256 0022dac29c7d9a1295654ccc7f3ad0c9b4c2197a0d2f053d457541d9511b47da`.
  Uniform upper **and** lower bounds for the mean value of `Delta(n)` over
  friable integers. **Translation:** the friable version of §3.9, and it inherits
  §3.9's verdict — `Delta` is a maximum, our need is a cancellation. Nothing.
- **Schlitt, *Multiplication Tables for Integers with Restricted Prime Factors*,
  arXiv:2603.19212v2.** Read in full,
  `sha256 8b862a95cc64887be7b4cf40588822065bcb0ce50f1768b05ec70759c4e564c8`.
  Counts `n <= x` with all prime factors in a set `Q` and a divisor in `(y,2y]`,
  order of magnitude for all relative densities `delta in (0,1]`, with a phase
  transition at `delta = 1/log 4`. **Translation: the restriction is the wrong
  one.** His hypothesis (1.2) is `|#(Q ∩ [1,x]) - delta x/log x| <= kappa x/(log x)^2`,
  a **positive-relative-density** prime set. The primes `<= y` are not such a set,
  so `y`-smoothness is outside his family; and the result is order of magnitude.
  Nothing. Worth naming because the title is the nearest miss on this axis.
- **Drappeau-Tenenbaum, *Distribution laws of divisors of friable integers*,
  Math. Z. **288** (2018) 1299-1326 (zbMATH `id 6860658`); Basquin, *Mean
  distribution law for the divisors of friable integers*, JTNB **26** (2014)
  281-305 (`id 6431207`).** Records read, summaries withheld by the licence
  placeholder, full texts not retrieved. **Translation: the quantifiers are
  inverted.** These describe how the divisors of a **friable integer** are laid
  out. Ours are the friable **divisors of a value of a cubic** whose own large
  prime factors are unrestricted. Nothing, and the inversion is the kind of
  near-miss `SEARCH-CONVENTIONS.md` exists to catch.
- **Hanrot-Tenenbaum-Wu, *Averages of certain multiplicative functions over
  friable integers, II*, Proc. LMS (3) **96** (2008) 107-135 (zbMATH
  `id 5248998`).** Record read only. This is the machinery Scourfield's summary
  names as the input to her smooth-divisor asymptotic. **Translation:** it is a
  friable mean-value theorem for multiplicative functions, i.e. the right kind
  of input for the **main term** of our statement, and it is stated over friable
  integers, not over friable divisors of polynomial values.

**Verdict on axis 2: friability changes nothing about the obstruction.** It is
handled in print, by Hanrot-Tenenbaum-Wu through Scourfield, at the level of the
main term. It does not supply, and no friable-divisor result located supplies, a
saving in the window.

## 5. The lemma the literature does not state

Stated so it can be checked, disputed, or found.

**What is missing.** An asymptotic, with a relative error `O(1/ln y)`, for

    N(L, y) := sum_{0<|C|<L}(1-|C|/L) sum_{n | C(C^2-4), n > 2L, P^+(n) <= y, (n,30)=1, n squarefree} w(n,C),
    w(n,C) = D_y prod_{p|n} (2 or 1)/(p-4)  as  p | C  or  p | C -+ 2,

against its CRT-expected value `L sum_{n>2L} sum_{c != 0} w(n,c)/n`, at
`L = y^2`.

**Why nothing in §3 covers it, in one sentence per axis.**

| axis | what the literature has | what the statement needs |
|---|---|---|
| object | `H_F`: integers with **at least one** divisor in an interval | a **weighted sum over every** large divisor |
| divisor range | `y <= x^{1-eps}` (Tenenbaum I), `y <= x/2` (Tenenbaum II), `m <= x` (Scourfield) | `n > 2x` |
| polynomial | reducible allowed only where the range is weakest (Tenenbaum I) | reducible cubic `(C-2)C(C+2)`, at the strongest range |
| weight | 1, or `omega(m)` roots equally | branch-dependent `w(n,c)`, total mass `4^{omega}`-sized |
| precision | `(log y)^{o(1)}` (Tenenbaum A), `asymp` (Ford, Koukoulopoulos) | asymptotic with relative error `O(1/ln y)` |
| smoothness | friable **integers** (Hanrot-Tenenbaum-Wu, Martin-Tenenbaum-Wetzer), positive-density prime sets (Schlitt) | friable **divisors** of a polynomial value at `u in (2,6]` |

**The precise character of the obstruction, restated in the owning convention.**
For `n > 2L` a residue class mod `n` meets the window `|C| < L` at most once, so
the sum is not an average of a divisor function at all: it is the count of
**incidences** between a window of length `L` and the CRT-combined root classes
of `(C-2)C(C+2)` modulo the friable moduli `n > 2L`, weighted, compared against
the expected density `L/n` which is `< 1/2` for every modulus in play. Every
theorem in §3 averages over a range **longer** than the divisors it counts;
ours averages over a range **shorter** than every modulus. That is the same
structural wall the corpus has hit before, and stating it in the owning
convention does not lower it.

**A route the literature does leave open, and it is not costed here.** The
complement `sum_{n > 2L} = sum_{all n} - sum_{n <= 2L}` moves the difficulty to
two sums each of which is an average over a range **at least as long** as the
moduli, which is the regime Scourfield's summary claims an asymptotic in. What
that route needs is (i) Scourfield's theorem read at the page, (ii) the same
theorem with the branch-dependent weight `w(n,c)` in place of the plain divisor
count, and (iii) enough uniformity in the friability parameter at `u in (2,6]`
to survive the subtraction of two quantities of size `ln^3 y` down to `o(ln^2 y)`.
None of (i)-(iii) has been done. **This is a suggestion, not a plan, and the
honest prior stated in `varE-theta2-proof.md` §6 stands: a one-logarithm gap in
a divisor problem of this shape is usually the whole difficulty.**

## 6. Verdict, and the draft `SEARCH-CONVENTIONS.md` §1 row

**PARTIAL.** The owning convention was identified and searched on three
calibrated channels; the machinery exists and the exact statement does not.
Specifically:

- **Not PUBLISHED.** No theorem located bounds the residual with the needed
  saving. The nearest results are order of magnitude (Ford; Koukoulopoulos) or
  `(log y)^{o(1)}` (Tenenbaum), for a different function (`H_F`, a set count),
  in a divisor range strictly below ours, without our weights, and Ford's own
  §1.6 open problem (i) is that an asymptotic is missing even in the plainest
  case. So `varE-theta2-proof.md` step 1 does **not** become PROVEN CONDITIONAL
  on a citation.
- **Not ABSENT-PER-CONVENTION either**, and this is the half a negative would
  have hidden: **Scourfield 2008 is an asymptotic, with an error term, for a
  friability-restricted divisor sum over values of a squarefree reducible
  monic polynomial.** That is four of our statement's features at once. It is
  abstract-only here, and until it is read at the page no absence may be
  written and no claim that the §6 reduction is new is available.

**Draft row for `research/SEARCH-CONVENTIONS.md` §1** (proposed; this note edits
no existing file):

| object | our name | canonical | **OWNING convention — search THIS** | where it lives |
|---|---|---|---|---|
| weighted count of large `y`-smooth divisors of `C(C^2-4)`, averaged over a window `\|C\| < L = y^2` (the CRT-mixed lag residual of the `theta = 2` decoupling step) | the mixed lags, `Xmix`; "the divisor-distribution statement" | distribution of divisors of polynomial values in a range | **`H_F(x,y,z) = #{n <= x : exists d \| F(n), y < d <= z}`**, "la localisation des diviseurs de `F(n)`"; the tool is **Hooley's `Delta`-function**, `Delta(n) = max_u #{d\|n : e^u < d <= e^{u+1}}`; the three-factor shape is **`H^{(k+1)}(x, ybar, zbar)`, "localized factorizations"**; the smoothness word is **friable**, never "smooth" (`ti:"smooth divisors"` is algebraic geometry, 7 of 9). **Our range `y_lit > x_lit` is outside every located theorem**, and "asymptotic" is outside the whole convention: Ford's own open problem (i) | Ford, *Ann. of Math.* (2) **168** (2008) 367-433, Thm 1 and §1.6(i); Tenenbaum, *A Tribute to Paul Erdős* (CUP 1990) 405-443 (reducible `F`, `y <= x^{1-eps}`, `(log y)^{o(1)}`) and *Invent. Math.* **99** (1990) 215-224, Thms 1 and 3 (irreducible `F`, `y <= x/2`); Hall-Tenenbaum, *Divisors*, Cambridge Tracts **90** (1988) Thm 21; Koukoulopoulos, *Proc. LMS* (3) **101** (2010) 392-426 and *Crelle* **689** (2014) 33-99; Ford, arXiv:1901.02548 (roughness of the **integer**, the opposite axis). **Friable side**: Hanrot-Tenenbaum-Wu, *Proc. LMS* (3) **96** (2008) 107-135; Martin-Tenenbaum-Wetzer, arXiv:2307.05530; Schlitt, arXiv:2603.19212 (positive-density prime sets, **not** friability). **OWED and highest value: Scourfield, *Smooth divisors of polynomials*, LMS Lect. Notes **352** (CUP 2008) 286-311** — abstract-only, claims an asymptotic with error term for friable divisors `m <= x` of `f(n)`, `f` squarefree monic reducible. `history/staging/lit-smooth-divisors.md` |

## 7. What would falsify this, and whether that check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| the owning convention is `H_F(x,y,z)` / Hooley `Delta` / localized factorizations, not our wording | MEASURED (search) | a theorem on this object living under wording not in §6's row | PARTLY. Three channels calibrated in session (arXiv `https`, zbMATH, OpenAlex); Semantic Scholar 429 on its own calibration query, MathSciNet not run |
| Ford 2008 gives order of magnitude only, and names the asymptotic as open | PROVEN (read) | a later paper supplying the asymptotic for `H(x,y,2y)` | PARTLY. Read at §1.6 of arXiv:math/0401223v5. Forward-citation walk on Ford 2008 **NOT RUN**; a 2008-2026 successor would not have been seen |
| Tenenbaum I reaches only `y <= x^{1-eps}` and II only `y <= x/2`, and II needs `F` irreducible | PROVEN (read) | a stated range above `x`, or a reducible-`F` version of II's Thm 1 | YES for II, read at the page images of pp. 216-217. NO for I: **review only**, the CUP volume was not obtained |
| our range `n > 2L` is outside every located theorem | PROVEN, conditional on the readings above | any theorem with `y_lit > x_lit` | YES against what was read; NO against Scourfield, which is abstract-only |
| Scourfield 2008 does not close the step | **CONJECTURED, and this is the weak point of the note** | the paper covering divisors above the range, or extending to branch-dependent weights | **NO. Abstract-only.** No page was read. Any claim of absence here is not yet earned |
| friability does not change the answer | MEASURED (search) | a friable-divisor-of-polynomial-value result with a window saving | PARTLY. Four items; two read in full, two records only |
| the `Delta` toolkit cannot supply the saving | PROVEN, by the corpus's own measurement | a `Delta` bound that yields cancellation rather than a maximum | YES, and it is `varE-theta2-proof.md` §5's measured flat/active loss, not a search result |
| `lim Var/E = 0.45546` | HEURISTIC | either open step failing | NO. This note moves neither step; it prices the search around one of them |

The one line worth carrying out of this pass: the reduction in
`varE-theta2-proof.md` §6 lands in a convention that is well developed and that
stops, uniformly, one range short of where our sum lives — divisors below the
sampling range, not above it — and stops one register short of the precision we
need, since the convention has no asymptotics at all in this range by its own
authors' accounting. Whether the reduction is **new** remains unanswerable until
Scourfield 2008 is read at the page.
