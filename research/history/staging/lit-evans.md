# lit-evans — Evans, *Correlations of almost primes*, read at page level: the theorem does not reach y ≈ x^0.28, h is never fixed, and there is no secondary term to harvest

<!-- ledger
id: Q-lit-evans
status: ANSWERED
todo: none
question: Does Evans, Correlations of almost primes, reach y about x^0.28, does it ever fix h, and is there a secondary term to harvest for the depth law?
verdict: None of the three, and the item named the single highest-value unread item in the survey yields nothing for the depth law: over the whole 35-page extraction Buchstab, rough, sifting and omega(u) each occur zero times, so the paper has no sieve-depth coordinate, and its object is E2 numbers, a multiplicative condition rather than a roughness one.
-->

*(Literature read, 2026-08-27. Commissioned against
`research/history/staging/quadpoint-prior-art.md` §8 bullet 2, which named this
paper "the single highest-value unread item in this survey" and said "Read this
before any further work on the depth law." It has now been read. New file only.
No existing repo file edited, moved or deleted; no git command run; every
proposed correction stays in §5 of this file. Both source documents
(`quadpoint-identity-01.md`, `quadpoint-prior-art.md`) are HELD and have never
been red-teamed, so what this file leans on from them is re-checked in place
and marked. Calibration marker on every claim: PROVEN / VERIFIED / MEASURED /
HEURISTIC / CONJECTURED / REFUTED. Provenance marker on every source statement:
[SOURCED] = read at page image this session, [SOURCED-BIB] = bibliographic
record only, [MEMORY] = carried from the corpus without re-reading.)*

---

## Provenance: what was actually reached

**Full PDF, plus six pages checked against the page image.** [SOURCED]

| item | value |
|---|---|
| artifact | `https://arxiv.org/pdf/2102.12297` → `arXiv:2102.12297v3 [math.NT] 17 Jun 2022`, 35 pp., letter, `dvips + GPL Ghostscript` |
| sha256 | `810b4ca67bdd7f6b81bdbd1e26d5cd85469794710a74e558882e3557873e83b2` |
| extraction | `pdftotext -layout`, 2,625 lines, full document |
| page images | pp. **1, 2, 3, 7, 31, 35** rendered at 150–170 dpi with `pdftoppm` and read as images |
| published version | *Math. Proc. Camb. Phil. Soc.*, DOI **10.1017/S0305004122000251**, Vol. 174 (2023), online 9 Jun 2022 [SOURCED-BIB] (Crossref/OpenAlex/Semantic Scholar records, plus the Cambridge Core landing page from a web search) |

Every quotation in §1 was compared word for word against the page image, not
against the extraction. Everything else in this file that is attributed to
Evans comes from the full-document extraction, and where a claim is an
*absence* inside the paper it is a count over that extraction, stated as such.

**The extraction hazard the brief warned about is present in this paper, and it
is worse than the 𝔖 → 5 case.** [SOURCED] Evans writes the singular series as
`𝔖(h)` (`\mathfrak{S}`) and the exponential sum as `S(α)`. `pdftotext` renders
**both** as the bare letter `S`, so on p. 7 the extraction shows `S(h)` and
`S(α)` as the same symbol, and the Theorem 3.2 main term reads `S(h)X(...)²`
where the page says `𝔖(h)X(...)²`. No digit substitution occurred here, but two
distinct objects were merged. Confirmed at the p. 1 and p. 7 images. Anyone
quoting this paper from extraction will silently identify the singular series
with an exponential sum.

**Scratchpad-grade computation done this session, none of it a repo number:**
`scratchpad/drift.js`, `scratchpad/drift2.js`, `scratchpad/kappa.js`. No
embedded producer, no `qc` gate. Inputs are named at each use below. Nothing
from them may be quoted outside this file until it is re-derived inside an
embedded producer.

---

## §0. Verdict

### The disconfirming half, first

**(0.1) Evans's theorems do not reach y ≈ x^0.28, and there is no y in the
paper at all.** [SOURCED] Over the whole 35-page extraction: `Buchstab` occurs
**0** times, `rough` occurs **0** times as a term of art, `sifting` occurs **0**
times, `omega(u)` occurs **0** times, and the letter `u` appears once, as a
change of variables `u = x/p₁` in a routine integral (p. 16). The paper has no
sieve-depth coordinate. Its object is `E₂` numbers, integers with exactly two
prime factors, which is a *multiplicative* condition, not a roughness
condition.

The nearest thing to a depth in Evans is the smaller prime factor `p₁` of the
semiprime, and every theorem pins that at `X^{o(1)}`:

| theorem | where the smaller prime factor sits | `u = log X / log p₁` |
|---|---|---|
| Thm 1.1 (`E₂′`), branch 1 | `p₁ ∈ (P, P^{1+δ}]`, `P = log^{17+ε} X` | `→ ∞` (log X / (17+ε)loglog X) |
| Thm 1.1 (`E₂′`), branch 2 | `P = exp((loglog X)²)` | `→ ∞` (log X / (loglog X)²) |
| Thm 1.3 (`E₂`), via its own reduction (9.1) | `p₁ ≤ exp((log X)^{1−ε(X)})`, `ε(X) = o(1)` | `≥ (log X)^{ε(X)} → ∞` |

Our `y = X^{0.28}` is `X^{Θ(1)}`, so for every large `X` the pairs that make up
`X(y)` at `u ≈ 3.566` are **outside** every set Evans's theorems describe.
Theorem 1.3 does cover all `E₂` numbers, but its proof discards the
atypically-factorising ones as an `o(1)` fraction (9.1, quoted verbatim in
§1), and the rough semiprimes are exactly inside that discarded fraction: at
`u = u* = 3.5658` they are a proportion `ln(u−1)/loglog X = 0.9424/loglog X`
of `E₂` (**HEURISTIC**, standard Mertens arithmetic, scratchpad `drift.js`;
0.284 at `X = 10¹²`, 0.205 at `X = e¹⁰⁰`, `→ 0`). An asymptotic whose error is
`o` of the main term says nothing about a subset of relative size
`1/loglog X`. **VERIFIED at page image for the range statements; HEURISTIC for
the density fraction.**

**(0.2) `h` is averaged in every theorem, never fixed, and `h = 2` is
uncontrolled.** [SOURCED] Every result in the paper is of the form "for all but
at most `O(H log^{−B} X)` values of `0 < |h| ≤ H`". The corpus's `h` is the
single value 2. Evans's exceptional set is permitted to contain it. This alone
would disqualify the paper as a test of the depth law even if the ranges
matched, and it is the same objection `quadpoint-prior-art.md` §1.2 already
recorded from the abstract. Reading at page level did not soften it.

**(0.3) There is no secondary term anywhere in the paper.** [SOURCED] The
sharpest quantitative statement is Theorem 3.2 (p. 7): main term
`𝔖(h)X(Σ_{P<p≤P^{1+δ}} 1/p)²`, error `O(X / log^η X)` with `η = η(ε) > 0`
**unspecified**. Remark 3.3 improves the error to `O(X log^{−A} X)` for `A > 0`
in part of the range, still with no secondary term. The relative error is
therefore `1/log^η X` with `η` not named, which is weaker than a relative
correction of size `1/log X`. **The paper cannot supply a derived next-order
term, at any range.** The payoff the brief aimed at does not exist in this
source.

**(0.4) Evans's contribution is a range-and-error-term contribution, and the
rider applies.** [SOURCED] What she extends is *how short the shift-average may
be*: Mikawa needed `H ≥ X^{1/3+ε}` for primes, Matomäki–Radziwiłł–Tao
`X^{8/33+ε}`, and Evans reaches `log^{19+ε} X` for `E₂′` and `X^{1/6+ε}` for
prime × `E₂`. That is the sharpening of an averaging range, sitting on top of
a main term that is already the naive product. Per the standing correction
[MEMORY]: what binds the certificate is depth `s`, not the error term, since at
`β₂ = 4.2665` the main term alone gives `X/T = 3.054 → 5.631` and rising.
**An error-term improvement buys nothing here, and this is an error-term
improvement. It does not help.**

**(0.5) New disconfirming evidence, produced this session, that closes the
route independently of Evans.** The 0.935 → 0.984 drift is **not the shape a
`1/log` secondary term would have.** Modelling the correction as
`u·ω(u)·(1 + c/ln y) = 2` and solving for `c` at each of the six band means
gives `c = −0.181, −0.126, −0.118, −0.098, −0.092, −0.074`: a factor 2.45
across the bands, not a constant. The `1/ln h` form is no better (`c = −0.688 →
−0.267`, factor 2.58). A least-squares slope of `ln|r|` against `ln(ln h)`,
where `r = 2/(u·ω(u)) − 1` is the relative deficit at the measured crossing,
comes out **−2.70**, i.e. the residual decays faster than `1/ln h` and faster
than `1/ln²h`. **MEASURED-adjacent but weak, and the caveats are load-bearing:**
(i) six band means only; (ii) `ln h` per band was *reconstructed* as
`ln(y* mean)/(ratio mean)` from the embedded SEC 2 table, which mixes a mean of
ratios with a ratio of means and biases the fit by an unknown amount; (iii)
`ln h` spans 10.60 to 17.93, a lever of **1.69**, under one decade in `ln h`, on
which no power-law exponent is measurable. Treat `−2.70` as "faster than
`1/ln`", not as an exponent. Producer: scratchpad `drift.js` / `drift2.js`,
inputs cited (never recomputed) from the embedded `OUTPUT` block of
`research/attack-quadpoint-03.js` SEC 2. **Consequence: even a paper that did
supply a classical `1/log` secondary term would not explain this drift.** The
drift looks like finite-size or discreteness, not analysis.

### The confirming half

**(0.6) The product form is exactly the shape Evans proves, with no correction
factor.** [SOURCED, VERIFIED at page image] Theorems 1.1, 1.3 and 1.4 all
assert `correlation ~ 𝔖(h) × (density)²` (or the mixed product for Thm 1.4),
and Theorem 3.2 gives it with an explicit main term and no second term. So the
*form* the corpus assumes is a proven form in Evans's setting. This is a real
positive and a weak one: it is proven at `u → ∞` with `h` averaged, which is the
easy corner, and the corpus's "κ cancels exactly" is the same statement about
the same object (see 0.7).

**(0.7) The corpus's κ is Hardy–Littlewood's singular series with two factors
stripped, exactly.** [VERIFIED by exact rational identity plus 9-digit numeric
agreement, scratchpad `kappa.js`] Evans (1.2) at `h = 2` gives
`𝔖(2) = 2Π₂ = 1.320323632`. The identity note's
`κ = ∏_{p≥7} p(p−2)/(p−1)² = 0.938896806`. Then

> `2Π₂ = 2 · (3·1/2²) · (5·3/4²) · κ = (45/32) · κ = 1.40625 · κ`,

and `1.40625 × 0.938896806 = 1.320323633` against the literature's
`1.320323632`. So the "κ cancels between the rough-rough and prime-prime sides"
step is the standard Hardy–Littlewood singular-series cancellation, with the
`p = 3, 5` factors absorbed into the mod-30 channel normalisation. **No novelty
attaches to it**, and it is worth saying out loud that the object the corpus
calls κ has a name in Evans's own equation (1.2).

**(0.8) The structural placement is genuine, and unusable.** [HEURISTIC] The
corpus's `X(y)` at `u ∈ (2, 3]` is precisely the census of pairs `(n, n+2)` both
`E₂` with both prime factors above `y` (below `u = 2` a `y`-rough member is
prime; above `u = 3` the `E₃` stratum opens). So Evans's `E₂ × E₂` correlation
is the *leading stratum* of `X(y)` immediately above `u = 2`. That is the right
neighbourhood. It is not the right corner of it, per 0.1.

### Numeric confidence

**≤ 5%** that Evans changes any number in the depth-law work.
**≈ 0%** that Evans supplies a derived secondary term for the 0.935 → 0.984
drift; that is settled by 0.3, not estimated.
**~60%** that §0.5's finding (the drift is not a `1/log` shape) survives a
proper embedded re-derivation with per-anchor `ln h`; the reconstruction bias in
(ii) is the main way it could fail.

### Riders carried, as instructed

- A derived next-order term matching a measured drift over two decades would be
  a DERIVED-CONSTANT payoff, not progress on the exponent, and two decades
  decide nothing asymptotic. **Moot: no such term is available here.** And per
  0.5, two decades in `Q` is only a 1.69× lever in `ln h`, which is a shorter
  lever than "two decades" makes it sound.
- What binds the certificate is depth `s`, not the error term. Evans is an
  error-term/range paper. **It does not help.** Stated bluntly as requested.

---

## §1. The main theorems, as sourced, verbatim, with hypotheses

All four quoted at page image. `𝔖(h)` is Evans's singular series, her (1.2):
`𝔖(h) := 2Π₂ ∏_{p|h, p>2} (p−1)/(p−2)` for `h` even, zero for `h` odd, with
`Π₂ := ∏_{p>2}(1 − 1/(p−1)²)`.

**Abstract** (p. 1) [SOURCED]:

> "We prove that analogues of the Hardy-Littlewood generalised twin prime
> conjecture for almost primes hold on average. Our main theorem establishes an
> asymptotic formula for the number of integers `n = p₁p₂ ≤ X` such that `n + h`
> is a product of exactly two primes which holds for almost all `|h| ≤ H` with
> `log^{19+ε} X ≤ H ≤ X^{1−ε}`, under a restriction on the size of one of the
> prime factors of `n` and `n + h`. Additionally, we consider correlations
> `n, n + h` where `n` is a prime and `n + h` has exactly two prime factors,
> establishing an asymptotic formula which holds for almost all `|h| ≤ H` with
> `X^{1/6+ε} ≤ H ≤ X^{1−ε}`."

**Definition of the restricted set** (p. 1–2) [SOURCED]: "Given `P > 0` and
fixed `δ > 0` we define `E₂′ := E₂′(P)` to be the set of integers `n = p₁p₂`
with exactly two prime factors such that `p₁ ∈ (P, P^{1+δ}]`."

**Theorem 1.1** (p. 2) [SOURCED]:

> "Let `ε > 0`, `A > 3` be fixed and let `log^{19+ε} X ≤ H ≤ X log^{−A} X`.
> Then, there exists some `η = η(ε) > 0` such that
> `(1/X) Σ_{X<n≤2X} 1_{E₂′}(n) 1_{E₂′}(n+h) ∼ 𝔖(h)((1/X) Σ_{X<n≤2X} 1_{E₂′}(n))²`
> holds for all but at most `O(H log^{−η} X)` values of `0 < |h| ≤ H`. Here we
> define
> `P := log^{17+ε} X` if `log^{19+ε} X ≤ H ≤ exp((log X)^{ε³})`,
> `P := exp((loglog X)²)` if `exp((log X)^{ε³}) < H ≤ X log^{−A} X`."

**Theorem 1.3** (p. 2) [SOURCED]:

> "Let `ε > 0`, `B > 0`, `A > 3` be fixed and let
> `exp((log X)^{1−ε}) ≤ H ≤ X log^{−A} X`. Then, we have that
> `(1/X) Σ_{X<n≤2X} 1_{E₂}(n) 1_{E₂}(n+h) ∼ 𝔖(h)((1/X) Σ_{X<n≤2X} 1_{E₂}(n))²`
> for all but at most `O(H log^{−B} X)` values of `0 < |h| ≤ H`."

**Theorem 1.4** (p. 2) [SOURCED]:

> "Let `ε > 0` be fixed sufficiently small, `B > 0`, `A > 5` be fixed and let
> `X^{1/6+ε} ≤ H ≤ X log^{−A} X`. Then, we have that
> `(1/X) Σ_{X<n≤2X} 1_ℙ(n) 1_{E₂}(n+h) ∼ 𝔖(h)((1/X) Σ_{X<n≤2X} 1_ℙ(n))((1/X) Σ_{X<m≤2X} 1_{E₂}(m))`
> for all but at most `O(H log^{−B} X)` values of `0 < |h| ≤ H`."

**Theorem 3.2** (p. 7) — the quantitative form, and the only place an error
term is written [SOURCED]:

> "Let `ε > 0`, `A > 3` be fixed and let `log^{19+ε} X ≤ H ≤ X log^{−A} X`.
> Then, there exists some `η = η(ε) > 0` such that for all but at most
> `O(H log^{−η} X)` values of `0 < |h| ≤ H` we have that
> `Σ_{X<n≤2X} ϖ₂(n) ϖ₂(n+h) = 𝔖(h)X(Σ_{P<p≤P^{1+δ}} 1/p)² + O(X / log^η X)`,
> where `𝔖(h)` is the singular series defined in (1.2)."

with `ϖ₂(n) = log p₂` if `n = p₁p₂` with `P < p₁ ≤ P^{1+δ}`, and 0 otherwise
(Definition 3.1, p. 7).

**The reduction that removes the rough corner**, §9, eq. (9.1) (p. 31)
[SOURCED]:

> "The problem can be reduced to the set of `E₂` numbers which factorise in the
> 'typical' way. By Mertens' theorem, almost all products of exactly two primes
> `p₁p₂ ≤ X` with `p₁ ≤ p₂` satisfy
> `p₁ ∈ [exp((log X)^{ε(X)}), exp((log X)^{1−ε(X)})] =: [P₁, P₂]`,
> where `ε(X) = o(1)`."

followed by the sandwich, verbatim from the image: the difference between the
full `E₂` correlation and the `E₂″` correlation is
`o(𝔖(h)(loglog X)²/(log X)²)`.

**Method statement**, §1.1 (p. 3) [SOURCED] — quoted in full because §3 leans
on it:

> "Integers with exactly two prime factors cannot be counted by sieve methods
> due to the parity problem - even assuming the Elliott-Halberstam conjecture -
> and we will instead apply the circle method as in previous works on
> correlations of primes [21], [24]."

---

## §2. The product form: confirmed in shape, at a range that does not cover ours, with no correction available

**Verdict: CONFIRMED as a form, NOT corrected, NOT refuted, and NOT a test of
our §3 heuristic.**

**(2.1) Confirmed as a form.** [SOURCED] Theorem 3.2's right-hand side is
`𝔖(h) × X × (density)²` exactly. There is no correction factor multiplying the
product, no `u`-dependent function, no Buchstab-type object. Whatever else the
paper does, it does not find that the naive product needs correcting in its own
setting.

**(2.2) The correction's size and sign: there is none to report.** [SOURCED]
The entire departure from the product form lives inside `O(X / log^η X)`, `η`
unspecified beyond `η(ε) > 0`. Since the main term is of size `X` times a
constant (by Mertens, `Σ_{P<p≤P^{1+δ}} 1/p ~ log(1+δ)`), the *relative* error
is `1/log^η X`. **A correction of relative size `1/log X` is not distinguished
from zero by this theorem unless `η > 1`, and `η` is never bounded below by
anything.** So: no size, no sign, no `u`-dependence. This is not a criticism of
the paper, whose target is the range of `H`, not the second term.

**(2.3) The range does not cover ours, and this is the honest outcome the brief
asked for.** [SOURCED for the ranges; HEURISTIC for the translation into `u`]
Stated plainly: **Evans's theorems do not reach `y ≈ x^{0.28}`.** They do not
reach any `y = x^{Θ(1)}`. Their smaller prime factor is `X^{o(1)}` in all three
theorems, and their `h` is averaged rather than fixed at 2. Two independent
disqualifications, either sufficient.

**(2.4) What our product form actually assumes, restated after reading.**
`quadpoint-prior-art.md` §2.3 flags it correctly: the derivation
`X/C ≈ κ(δ_R − δ_P)²`, `T/C ≈ κδ_P²` treats the two members as independent once
`κ` is extracted, and the correct correction for a dimension-2 sifting function
`S(A, x^{1/u})` is not `ω(u)²`. **That flag stands, unweakened by this
reading.** Evans supplies no dimension-2 correction function because she has no
`u` and does not sieve. The item on `quadpoint-prior-art.md` §8's NOT-REACHED
list, "the exact dimension-2 Buchstab-type correction for `S(A, x^{1/u})` was
not found computed anywhere", is **not** closed by this session and remains the
live gap.

**(2.5) The one thing that did move.** §0.7: the corpus's κ is `(32/45)·𝔖(2)`
exactly, which names it in the literature's own notation and removes any
residual sense that the κ-cancellation is a house observation. **VERIFIED**,
scratchpad `kappa.js`, needs an embedded producer before it is quoted anywhere
else.

---

## §3. The `u = 2` question

**Verdict: Evans has no distinguished behaviour at `u = 2`, because Evans has no
`u`. But the paper does place the parity obstruction exactly at the first
stratum above `u = 2`, in her own words, and that is the most useful thing this
session found on the question.**

**(3.1) The direct answer is negative, and it is a count, not an impression.**
[SOURCED] `Buchstab`: 0 occurrences. `sifting`: 0. `rough`: 0 as a term of art.
`sifting limit`, `beta_kappa`, `f(u)`, `F(u)`: 0. There is no range boundary at
`u = 2`, no singularity at `u = 2`, and no `u`-indexed quantity of any kind. The
paper's boundaries are on `H` (the shift-average length) and on `P` (the size of
the smaller prime factor), and neither is a sieve depth.

**(3.2) A convention warning that the corpus needs before it reads anything
into `f(2) = 0`.** [MEMORY, re-read at `research/covering-dive.md` §1.2 this
session] Granville's `f(2) = 0` is the **κ = 1** sifting limit: `f(u) = 2e^γ
log(u−1)/u` for `2 ≤ u ≤ 4` is the *linear* sieve's lower-bound function, and
`β₁ = 2` is optimal there by Selberg's Liouville examples. The corpus's twin
census `X(y)` is a **dimension-2** problem whose sifting limit is `β₂ = 4.2665`,
not 2. **Quoting `f(2) = 0` as the explanation of a `u = 2` boundary in a
dimension-2 problem is a convention error**, and `covering-dive.md` §1.3 already
says so in its own words ("for κ = 2 the ... `f`, `F` functions and their `u > 2`
positivity threshold simply do not apply"). Whatever explains the four-object
convergence on `u = 2`, `f(2) = 0` is not automatically it.

**(3.3) What is actually sitting at `u = 2`, enumerated.** [HEURISTIC, my
reading; none of this is Evans's claim]

1. **The finality boundary.** A `√h`-rough number below `h` is prime, so
   `X(√h) = 0`. Elementary, and the identity note's own §2 bullet 2 uses it.
   This is `u = 2` for a reason that has nothing to do with sieve theory.
2. **The `E₁`/`E₂` stratum boundary.** Below `u = 2` the `y`-rough members are
   primes; the first stratum above it is exactly `E₂ × E₂`. Same number,
   different reason.
3. **`β₁ = 2`, the linear sifting limit**, optimal by parity. Same number, third
   reason, and per 3.2 it is the wrong dimension for our census.

These three coincide numerically at 2. That is not by itself a mechanism, and
this file does not claim one.

**(3.4) The one substantive thing Evans adds.** [SOURCED for the quotation,
HEURISTIC for the reading] Her §1.1 sentence, quoted in full in §1, says `E₂`
numbers "cannot be counted by sieve methods due to the parity problem - even
assuming the Elliott-Halberstam conjecture". Combined with 3.3(2): **the first
stratum of `X(y)` above `u = 2` is exactly the stratum that no sieve can count,
even under EH, and that is why the only published asymptotic for it comes from
the circle method with `h` averaged.** So `u = 2` in the corpus's coordinate is
the point where the census stops being sieve-countable. That is a statement about
why the wall stands where the identity note (§4) says it stands, and it is
consistent with the standing reading rather than a new route out of it.

**Falsification.** 3.4 would be broken by any published sieve-theoretic
asymptotic (not bound) for `E₂ × E₂` pairs at fixed `h`. None was found here,
and none is claimed to have been searched exhaustively; the search that was run
is `quadpoint-prior-art.md` §1.3's ten flips, which this session did not redo.

**Bluntly on the brief's hope:** "the most valuable thing in your session" was
to be a distinguished behaviour at `u = 2` inside Evans's dimension-2 analysis.
There is no dimension-2 analysis in Evans. The `u = 2` convergence across the
four corpus objects is **not explained by this paper**, and remains open.

---

## §4. Provenance check on the two claimed absences

`quadpoint-prior-art.md` claims (A) the comparison `X(y) < T` and (B) the
crossing law `u·ω(u) = 2` (root `u* = 3.565845`) are ABSENT-PER-CONVENTION.
This session tested those claims against Evans only, on both edges of the
citation graph, per `research/SEARCH-CONVENTIONS.md`.

**(4.1) Backward edge — Evans's own bibliography: the absence SURVIVES, and it
is now verified at page image rather than inferred.** [SOURCED] All 30
references read on the p. 35 image. Neither (A) nor (B) appears, and the
bibliography does not even reach the conventions that own them: **no Buchstab,
no Halberstam–Richert, no Diamond–Halberstam, no Chen, no Selberg, no Iwaniec
sieve paper, no sifting-limit literature, no `Φ(x,y)` / rough-number
reference.** The one sieve monograph present is Friedlander–Iwaniec, *Opera de
Cribro* [6], and the extraction shows it cited once, alongside Davenport [3],
purely as a reference for the Elliott–Halberstam conjecture (p. 3). The
bibliography is a circle-method and multiplicative-functions-in-short-intervals
bibliography: Gallagher, Mikawa, Matomäki–Radziwiłł, Matomäki–Radziwiłł–Tao,
Teräväinen, Koukoulopoulos, Jutila, Harman–Watt–Wong, Vaughan. **Evans does not
own either object and does not point at anyone who does.**

**(4.2) Forward edge — the citing graph: NOT TESTED, because no calibrated
channel was found, and the zeros must not be quoted.** [SOURCED for the channel
behaviour] Three channels were tried on the published DOI
`10.1017/S0305004122000251` and on the OpenAlex work ids:

| channel | result | calibration |
|---|---|---|
| OpenAlex (`filter=cites:W3131420433` and `cites:W4287323893`) | 0 citing works | **FAILED.** The same channel reports **17** citing works for Matomäki–Radziwiłł, *Multiplicative functions in short intervals*, *Ann. of Math.* 183 (2016), which is off by more than an order of magnitude. A zero here is worthless. |
| Semantic Scholar graph API | `citationCount: 1`, and the single record is `"PSP volume 174 issue 3 Cover and Back matter"` | **FAILED.** That is an indexing artifact, not a citation. |
| OpenCitations index API | `[]` (HTTP 200 after following the 301; note the API 301s on `http`-style paths, same trap as the arXiv API row in `SEARCH-CONVENTIONS.md` §3) | uncalibrated; no known positive was run against it in-session |

Three candidate citers surfaced by web search were fetched and grepped
directly: **Tao–Teräväinen, arXiv:2512.01739** (`ω(n)`, `Ω(n)`, `τ(n)`
correlations; does not cite Evans; not our object), **arXiv:2207.05038,
*Almost primes in almost all short intervals II*** (does not cite Evans; uses
Buchstab's `ω`, but for *single* almost primes in short intervals, not pairs,
and carries no `u·ω(u) = c` threshold), and **arXiv:2506.21642** (does not cite
Evans). None carries (A) or (B).

**Net:** `quadpoint-prior-art.md`'s absence claims are **strengthened on the
backward edge** (page-image-verified for this one paper) and **untouched on the
forward edge**. Per `SEARCH-CONVENTIONS.md` §2's discipline, the forward-edge
result is a channel failure, not a negative, and must be recorded as such
rather than counted as coverage. **A calibrated citing-graph channel is now a
named gap for this corpus** (MathSciNet's `mrlookup`, per §5 of that file, is
bibliographic-only and does not carry citations either).

**(4.3) A reproduction discrepancy worth one line.** [VERIFIED, both sides
scratchpad-grade] `quadpoint-prior-art.md` §2.2 prints the root of `u·ω(u) = 2`
as `u* = 3.565845`. An independent integrator built this session (delay
equation, `10⁻⁵` grid, bisection to machine precision) gives **3.565847**, with
its own closed-form checks passing to 9 decimals: `3ω(3) = 1.693147181` against
`1 + ln 2 = 1.693147181`, `ω(2) = 0.500000000`, `ω(10) = 0.561459484` against
`e^{−γ} = 0.561459484`. The two disagree at `2 × 10⁻⁶`, which is inside the
sixth decimal both documents print. **Neither is a repo number**; whoever
embeds this must resolve it before either value is quoted. `1/u* = 0.280438`
agrees to six decimals either way.

---

## §5. Exact proposed corrections (NOT applied; all text stays in this file)

Six. Each names the file, the location, the current text and the replacement.
Both target files are HELD and un-red-teamed, so these are proposals into a
queue, not fixes.

### 5.1 `quadpoint-prior-art.md` §8, second bullet — the item is closed

**Current:** "**Evans arXiv:2102.12297 not read at page level.** Whether her
main term has the product-times-singular-series form that §2.3 flags as our
unexamined hypothesis is the single highest-value unread item in this survey.
**Read this before any further work on the depth law.**"

**Proposed replacement:**

> ~~**Evans arXiv:2102.12297 not read at page level.**~~ **CLOSED 2026-08-27,
> read at page level (`history/staging/lit-evans.md`; v3, 35 pp., sha256
> `810b4ca6…`, pp. 1, 2, 3, 7, 31, 35 checked at page image).** Her main term
> *does* have the product-times-singular-series form, exactly and with no
> correction factor (Thm 3.2: `𝔖(h)X(Σ_{P<p≤P^{1+δ}}1/p)² + O(X/log^η X)`).
> **It is not a test of our §3 heuristic and cannot become one**, for two
> independent reasons: `h` is averaged in every theorem and `h = 2` may sit in
> the exceptional set, and the smaller prime factor is `X^{o(1)}` throughout
> (`P = log^{17+ε}X` or `exp((loglog X)²)` in Thm 1.1; `p₁ ≤ exp((log X)^{1−ε(X)})`
> in Thm 1.3's own reduction (9.1)), so the theorems never reach `y = X^{Θ(1)}`.
> There is also no secondary term to harvest: `η = η(ε) > 0` is never bounded
> below, so the relative error `1/log^η X` does not resolve a `1/log X`
> correction. *Residual: the dimension-2 correction function is still not
> computed anywhere (bullet 7 below stands).*

### 5.2 `quadpoint-prior-art.md` §2.3, third paragraph — the claim is wrong on two counts

**Current:** "**The nearest rigorous test in print is Evans (§1.2)**, whose
asymptotic for `E₂ × E₂` correlations at distance `h`, on average over `h`, is a
check of precisely this product-plus-singular-series shape in the sub-case
`u < 3`. Whether her main term has the product form was NOT read at page level
(§8)."

**Proposed replacement:**

> **The nearest rigorous instance in print is Evans (§1.2), and it is not a
> test of this hypothesis** (read at page level 2026-08-27,
> `history/staging/lit-evans.md`). Her main term has exactly this shape,
> `𝔖(h) × (density)²` with no correction factor. But calling it "the sub-case
> `u < 3`" is wrong: her `E₂′` has its smaller prime factor at `X^{o(1)}`, so in
> the `u = log X/log p₁` coordinate her regime is `u → ∞`, the opposite corner
> from ours, and Thm 1.3's proof explicitly discards the balanced (rough)
> factorisations as an `o(1)` fraction at (9.1). Her `h` is averaged over
> `|h| ≤ H`, so `h = 2` is uncontrolled. The product form therefore remains
> validated at exactly one point for our problem (`u = 2`, Ford §1.7.2), plus a
> proven instance in a disjoint regime.

### 5.3 `quadpoint-prior-art.md` §6, proposed PRIOR-ART item 3 — reword before it is ever applied

**Current:** "**Evans, *Correlations of almost primes*, MPCPS
(arXiv:2102.12297)** — the nearest published almost-prime **pair census**,
`E₂ × E₂` at distance `h`, asymptotic for almost all `h` in
`log^{19+ε}X ≤ H ≤ X^{1−ε}`. Nearest rigorous test of the
product-plus-singular-series form our §3 heuristic assumes."

**Proposed replacement:** keep the item, replace the last sentence with:

> Read at page level 2026-08-27. Journal version *Math. Proc. Camb. Phil. Soc.*
> **174** (2023), DOI 10.1017/S0305004122000251. The nearest published
> almost-prime **pair census**, and the nearest proven instance of the
> product-plus-singular-series form; **not a test of our depth law**, because
> `h` is averaged and the smaller prime factor is `X^{o(1)}` in every theorem.
> Its value to this corpus is (i) that the form is proven somewhere, (ii) that
> its §1.1 states the parity obstruction for `E₂` counting even under EH, which
> is the first stratum of our `X(y)` above `u = 2`, and (iii) that its (1.2)
> names our κ: `2Π₂ = (45/32)·κ`.

### 5.4 `quadpoint-identity-01.md` §3 — name κ in the literature's notation

**Proposed addition**, at the end of the paragraph that introduces κ:

> κ is the Hardy–Littlewood singular series with the `p = 3, 5` factors absorbed
> into the mod-30 channel normalisation: `𝔖(2) = 2Π₂ = (45/32)·κ = 1.320324`
> against `κ = 0.938897` (Evans arXiv:2102.12297 eq. (1.2) for the definition of
> `𝔖`; VERIFIED as an exact rational identity, scratchpad-grade numerics in
> `history/staging/lit-evans.md` §0.7, no embedded producer yet). The
> "κ cancels exactly" step is the standard singular-series cancellation and
> carries no novelty.

### 5.5 `quadpoint-identity-01.md` §6, first bullet — the drift now has a disconfirming measurement against the obvious model

**Current:** "No proof of the depth law; the κ-cancellation is a main-term
statement and the finite-size drift (0.935 → 0.984) has no model."

**Proposed replacement:**

> No proof of the depth law; the κ-cancellation is a main-term statement and the
> finite-size drift (0.935 → 0.984) has no model. **What it is probably not:** a
> classical `1/log` secondary term. Modelling the correction as
> `u·ω(u)(1 + c/ln y) = 2` and solving for `c` at each band gives
> `−0.181 → −0.074` (factor 2.45); the `1/ln h` form gives `−0.688 → −0.267`
> (factor 2.58); neither `c` is stable, and the relative deficit falls off
> faster than `1/ln²h`. **Scratchpad-grade and weak** (six band means, `ln h`
> reconstructed from the SEC 2 table rather than per anchor, and `ln h` spans
> only 10.60 → 17.93, a lever of 1.69): see
> `history/staging/lit-evans.md` §0.5. Before this is treated as closed it needs
> an embedded producer that emits per-anchor `ln h`.

### 5.6 `research/SEARCH-CONVENTIONS.md` §5 — a new residual, proposed for whoever owns that file

> **Citing-graph channels are UNCALIBRATED for this corpus and their zeros must
> not be quoted.** Checked 2026-08-27 on `10.1017/S0305004122000251`: OpenAlex
> returns 0 citing works and simultaneously reports **17** for
> Matomäki–Radziwiłł, *Ann. of Math.* **183** (2016), which is wrong by more
> than an order of magnitude; Semantic Scholar returns 1, and that record is a
> journal cover-and-back-matter page; OpenCitations returns `[]`, uncalibrated.
> Until a citing channel is calibrated on a known-positive in the same session
> (the §2 rule), forward-edge silence is a channel failure and not a negative.
> `mrlookup` does not fill this gap: it is bibliographic-only.

---

## §6. NOT REACHED

- **Halberstam–Richert Ch. 2 / *Opera de Cribro*** still unread at page level
  (`quadpoint-prior-art.md` §8 bullet 1 stands, untouched).
- **The dimension-2 Buchstab-type correction for `S(A, x^{1/u})`** still not
  found computed anywhere and still not derived. This session did not attempt
  it. It is the object that would actually answer §2.4, and Evans is not it.
- **The forward citation edge of Evans**, per §4.2: no calibrated channel.
- **`Li arXiv:2504.07974`, `Iwaniec–van de Lune–te Riele 1980`, `Iwaniec 1981`**
  all still unread (`quadpoint-prior-art.md` §8 bullets 3–4).
- **The `u = 2` convergence across four corpus objects is unexplained.** Evans
  does not explain it; §3.3 enumerates three distinct objects that sit at 2 and
  declines to claim a mechanism.
- **`research/history/CHANGELOG.md` entry for this file is owed** and was not
  written, because the brief permits exactly one new file and no edits.
- **`qc.js` was not run**, for the same reason: this session made no edit to any
  gated file, and running the gate is a read-only action that was outside the
  brief's single-file constraint on writes. Whoever integrates any of §5 must
  run `node research/qc.js --full` before and after.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md`
for the corpus rule. HELD, never red-teamed. Scratchpad producers named in the
provenance block are session-local and are not repo artifacts.*
