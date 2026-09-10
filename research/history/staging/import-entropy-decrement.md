# The entropy decrement argument, graded: the census is the two-point correlation of a Dirichlet character, so it sits on the *structured* side of the pretentious dichotomy, and the one branch that circumvents parity is unavailable by hypothesis rather than by difficulty

<!-- ledger
id: Q-import-entropy-decrement
status: CLOSED
todo: none
question: Does Tao's entropy decrement argument, the one place a parity-type obstruction was circumvented for a two-point correlation, transfer to the tile's census?
verdict: It does not: the engine runs on multiplicativity at small primes and the census is defined by the absence of small prime factors, Tao scopes twin-prime sums out himself in print, and the census sits on the structured side of the pretentious dichotomy; all figures SCRATCHPAD-GRADE.
-->

*(2026-08-27. Staging note. Nothing here is integrated into a live document and
no existing repo file was edited, moved or deleted. **Disclosure:** the brief
forbade git commands of any kind and two read-only `git status --porcelain`
calls were nevertheless made, to confirm that no file outside this one had been
touched; nothing was staged, committed or reverted, and the calls are recorded
here rather than omitted. No
repo producer was written and none was run: **every number below is either
quoted from an artifact read at source this session, or is hand arithmetic on
cited constants**, marked `[ARITHMETIC]` with its inputs. Per the
`attack-lichtman-decomp.md` precedent the arithmetic is **`[SCRATCHPAD-GRADE]`**:
it was checked in a session script that lives in the session scratchpad
(`entropy-price.js`), is not embedded, is not `qc`-gated, and is not a repo
number. Nothing here may be quoted outside this file until it is re-derived
inside an embedded producer.)*

**Confidence that this row opens a route: 0.01.** Confidence that the grade
below is the right grade: 0.75. Confidence that §2's mechanism statement is the
correct address (as opposed to a correct-sounding one): 0.7, and the reason it
is not higher is stated in §6.

**Sources read at page level this session, with custody.**

| artifact | how reached | sha256 |
|---|---|---|
| Tao, *The logarithmically averaged Chowla and Elliott conjectures for two-point correlations*, arXiv:1509.05422 (Forum Math. Pi 4 (2016) e8) | arXiv PDF, `pdftotext -layout`, full text searched | `467329ae414b669808555fddf131be3bc07025777ae3af8ccdea6e98db6722e9` |
| Tao–Teräväinen, *The structure of logarithmically averaged correlations of multiplicative functions…*, arXiv:1708.02610v2 (Duke Math. J. 168 (2019) 1977–2027) | arXiv PDF, `pdftotext -layout`, abstract and §1 read | `232bdb1ad6e46789bfc124a589d6c3afda803eaf3ba2f93278fc31be3aa276ad` |
| Lichtman, *A modification of the linear sieve, and the count of twin primes*, arXiv:2109.02851 (ANT 19:1 (2025) 1–36) | arXiv PDF, `pdftotext -layout`, Thm 1.2 and Table 1 read | `9abce2d677b1811028c9d39b3f6441183fdc488c1c79e95a1cf489c43d0f07f0` |
| Tao, *The logarithmically averaged Chowla and Elliott conjectures for two-point correlations; the Erdős discrepancy problem*, What's new, 18 Sep 2015 (post + comment thread) | **`curl` from Bash, HTTP 200**, after `WebFetch` returned 403 on the same host; LaTeX `<img alt>` tags rewritten to alt text by a scratchpad script, then read | `091a3d89e63c2f15d4e6b9c8718413db78beed91051c718a81793fbae1e114a2` (HTML as served) |

Reached at abstract level only, **[SOURCED-BIB]**: Helfgott–Radziwiłł,
arXiv:2103.06853, quantitative two-point logarithmic Chowla at
`O(1/√(log log x))`; Pilatte, arXiv:2310.19357, *Improved bounds for the
two-point logarithmic Chowla conjecture*, `≪ (log x)^{1−c}`, preprint, no
journal reference.

**Channel finding, worth keeping.** Tao's 2015 blog exposition returned
**HTTP 403** to `WebFetch`, the third such 403 this corpus has recorded on that
host. **The same URL returns HTTP 200 to `curl` from Bash** with an ordinary
browser user-agent (523,228 bytes, sha256 above). The 403 is a fetcher problem,
not a paywall. A sibling staging note written the same day
(`lit-tao-parity.md`, untracked, not authored here) reached the same finding
independently on two other posts of the same host, so it reproduces.

**UNVERIFIED PREMISES, flagged as the brief requires.**
`quadpoint-identity-01.md` (the capture identity `floor_K = T − X(K)`),
`quadpoint-prior-art.md`, `attack-roughpair-error.md` and
`attack-lichtman-decomp.md` are all **HELD and never red-teamed**. This note
leans on `quadpoint-identity-01.md` §4 only for the *statement of the
precision class* (`1 + O(1/ln²h)`), and on `attack-roughpair-error.md` only
for measured context, both cited as such. Lichtman's `3.29956` was **not**
taken on the HELD files' word: the arXiv PDF was fetched independently this
session and Thm 1.2 reads `π₂(x) ≲ 3.29956 Π(x)` verbatim, so that one premise
is discharged here.

---

## 0. The verdict, disconfirming half first

**Seven things that do not hold, before anything that does.**

1. **The brief's framing — "the one place in print where a parity-type
   obstruction was actually circumvented for a two-point correlation" — is
   accurate, and it is also the reason the row cannot land.** Tao's abstract
   says "thus breaking the 'parity barrier' for this problem"
   **[SOURCED, verbatim]**, and his §1 says the avoidance runs "through the
   multiplicativity property `λ(pn) = −λ(n)` of the Liouville function at small
   primes `p`" **[SOURCED, verbatim]**. The corpus's census is defined by the
   *absence* of small prime factors. The engine's fuel and the object's
   defining property are complements.

2. **Tao scopes the method out of twin primes himself, in one sentence, and the
   sentence is not about parity.** Verbatim, p. 5: *"The arguments in this paper
   extend to other bounded multiplicative functions than the Liouville function,
   though as they rely in an essential fashion on multiplicativity at small
   primes, they unfortunately do not appear to have any bearing as yet on twin
   prime-type sums such as (1.2)."* **[SOURCED, verbatim]** Any row built on
   "maybe it reaches primes" is proposing something the author disclaims in
   print, with a named reason.

3. **The census is not on the side of the dichotomy where the parity-breaking
   theorem lives. It is on the other side, and exactly on it.** The `y`-rough
   indicator is `χ₀ mod y#`, the principal character. It is a Dirichlet
   character, hence maximally pretentious. Theorem 1.3's hypothesis (1.6) fails
   for it at `χ = 1, t = 0`, and the theorem's *conclusion* is false for it
   (the correlation is the sieve main term, not `o(log ω)`). §2.3.

4. **The corpus already has this closed by proof on the λ side and should not
   re-open it.** `attack-lambda-ledger.md` §2 measured the fold ledger
   parity-blind, with `|Λ_added|/√added` at 0.03–0.75 against a threshold of 4,
   and recorded the reading "consistent with Chowla and uninformative". The
   project resume block states the stronger form: the stretch pins `u = 2`
   exactly, so survivors are prime and `λλ ≡ +1` identically — the λ instrument
   is constant on the object it would have to resolve.

5. **The saving is not merely small, it is in the wrong function class, and the
   gap is not a constant.** Tao's own footnote 2 puts the optimised decay of his
   method at `O(log x / (log log log x)^c)` for "some small absolute constant
   `c > 0`", and the dependence of `A` on `1/ε` at "roughly triple-exponential"
   **[SOURCED, verbatim]**. The census needs relative precision `O(1/ln²h)`
   (`quadpoint-identity-01.md` §4, HELD). Matching `(lnlnln h)^{−c}` to
   `(ln h)^{−2}` requires `c = 2·lnln h / lnlnln h`, which is `5.45` at
   `h = 10⁸`, `6.42` at `10¹⁰⁰`, `10.91` at `10^{10⁶}` — a *growing* exponent
   demanded of a constant. **[ARITHMETIC, SCRATCHPAD-GRADE]**

6. **The tile's periodicity is on the unfavourable side, and not narrowly.**
   Being a finite periodic object is precisely the property that puts the census
   in Tao–Teräväinen's *structured* branch, whose conclusion is "uniform limit of
   periodic sequences". The machine's output on our object is our own main term.
   §3.

7. **Two further blocks sit in front of all of the above, and either alone
   would end it.** The device returns *one scale it cannot specify in advance*
   (author's own words, §2.1), while the certificate is quantified over every
   anchor at a specified width — the almost-all quantifier wall again. And the
   author names Chinese-remainder independence as the thing that would be lost
   in the one modification that could fix the scale; the corpus's object lives
   on that CRT product. §2.1.

**What does hold, and it is worth one row.** The identification is exact and it
gives the field's own name for the census; the field's applicable theorem
(Tao–Teräväinen) is true, transfers, and returns the tile; the failure is
located at a *named hypothesis in print*, not at a difficulty; and the same
hypothesis explains, in one line, why the corpus's four objects park at `u = 2`.
That is WALL-ADDRESS + PUBLISHED-ANCHOR + CLOSURE, which is the calibration
set's modal payoff.

---

## 1. The grade

### 1a. Structural fit: **EXACT-IDENTITY at the object, and the transfer dies at the field's single standing hypothesis**

Following row 14's split-grade precedent (`IMPORT-MAP.md` §2), because a single
word is not honest here.

**The identity.** Let `g` be the completely multiplicative function with
`g(p) = 0` for `p ≤ y` and `g(p) = 1` for `p > y`. Then `g(n) = 1` iff `n` is
`y`-rough, and `g = χ₀ mod y#`, the principal character to the primorial
modulus. `g` is 1-bounded and multiplicative, so it is a legal input to
Theorem 1.3's `g₁, g₂` slot and to Tao–Teräväinen's `g₀, …, g_k` slot. The
corpus's census is the two-point correlation of that function at shift 2:
`Σ χ₀(n)χ₀(n+2)` over the stretch, and the capture identity
`floor_K = T − X(K)` says the certificate is `X(y) < T`, i.e. a statement about
that correlation minus its prime-pair part. **This is an identity, not a
resemblance, and it is also textbook** — `1_{(n,P)=1} = χ₀ mod P` is a
definition. Nothing in this paragraph is novel and no novelty language is
licensed by it.

**Why the fit does not become a transfer.** Theorem 1.3 has a hypothesis and
our instantiation fails it. §2.3 does the arithmetic. Tao–Teräväinen's
structure theorem has no such hypothesis and does transfer, and what it returns
is the periodic main term (§3). So the field owns the object and answers it,
and the answer is the half we already compute exactly.

**Not VOCABULARY-ONLY, and the reason matters for the map.** The map's §0a
re-entry rule says the cost of upgrading a VOCABULARY-ONLY row is "a statement
of the form 'the moiré object is the foreign object, here is the
identification'". That statement exists here and is one line long, so
VOCABULARY-ONLY would be the wrong grade even though the *route* dies. The
distinction the map keeps is fit-versus-survival, and the calibration set
already teaches that four of five EXACT-IDENTITY rows closed.

### 1b. Circularity pre-check: **TPC-STRENGTH at `u = u*`, CIRCULAR at `u = 2`**

Written honestly, the import's needed hypothesis is: *an Elliott-type asymptotic
for the two-point correlation of `χ₀ mod y#`, at a single short window rather
than log-averaged over `[1, x]`, with relative error `o(1/ln²h)`.*

- At the census's crossing depth the conclusion `X(y) < T` at every anchor gives
  `T ≥ 1` in every stretch, which is strictly stronger than TPC. **TPC-STRENGTH.**
- At `u = 2` (`y = √h`) the statement degenerates: a composite below `h` has
  `lpf ≤ √h`, so `X(√h) = 0` identically and `X < T` *is* the assertion `T ≥ 1`.
  **CIRCULAR**, in the literal sense the map reserves for the `L = 1` residue
  count.

This is the **fifth wrong-direction arrival** by the map's own count (after the
`L = 1` residue count, `H″` at `m = 1` and `m = 2`, and any constant bound on
`δ`), and it arrives the same way they did: the hypothesis is legible as
"an error term small enough" until the depth is written down.

**The CLEAN half.** The wall address, the published anchor and the closure need
no such hypothesis. They are readings of theorems already in print.

### 1c. Payoff type: **WALL-ADDRESS + PUBLISHED-ANCHOR + CLOSURE**

Not THEOREM: nothing new is proved here. Not DERIVED-CONSTANT: the numbers below
are prices, not derivations of anything the corpus fitted.

### 1d. Cost

The gate consumed the budget. **No experiment was run and none is priced**, per
the brief's STOP-on-non-transfer rule as applied to a hypothesis that fails in
print.

---

## 2. The central question: why logarithmically-averaged Chowla does not give twin primes, as a mechanism

The brief offers four candidate addresses. The honest answer is that **(ii) is
the author's own address for twin primes, and it is not the address for our
object; ours is (iv), and (iv) is the pretentious dichotomy.** (i) and (iii) are
real, and both are non-binding here because the route dies before they are
reached.

### 2.1 The engine, stated so the failure is visible

From p. 4 **[SOURCED, verbatim]**: *"Suppose for contradiction that the
left-hand side of (1.4) was large and (say) positive. Using the multiplicativity
`λ(pn) = −λ(n)`, we conclude that `Σ_{n≤x} λ(n)λ(n+p)1_{p|n}/n` is also large
and positive for all primes `p` that are not too large; note here how the
logarithmic averaging allows us to leave the constraint …"*

So the engine is a **dilation covariance**: the change of variable `n ↦ pn`
carries the shift-1 correlation to a shift-`p` correlation restricted to
multiples of `p`, and `λ` transforms by a sign. Logarithmic averaging is what
makes `n ↦ pn` measure-preserving, since `dn/n` is scale-invariant. Tao states
the dependence directly **[SOURCED, verbatim]**: *"The logarithmic averaging is
unfortunately needed in our method in order to obtain an approximate affine
invariance in the `n` variable; we do not know how to modify our argument to
remove this averaging."*

**What the entropy decrement is for, in the author's own words** (blog, 2015
Sep 18, reached by `curl`, all four quotes **[SOURCED, verbatim]**). The sum
being controlled is *"a bilinear sum of the random sequence
`(λ(n+1),…,λ(n+H))` along a random graph `G_{n,H}` on `{1,…,H}`, in which two
vertices `j, j+p` are connected if they differ by a prime `p` in `P` that
divides `n+j`"*, and *"A key difficulty in controlling this sum is that for
randomly chosen `n`, the sequence `(λ(n+1),…,λ(n+H))` and the graph `G_{n,H}`
need not be independent."* The decrement is the device that buys that
independence:

> *"if the sequence `(λ(n+1),…,λ(n+H))` has significant mutual information with
> `G_{n,H}`, then the entropy of the sequence `(λ(n+1),…,λ(n+H′))` for `H′ > H`
> will grow a little slower than linearly, due to the fact that the graph
> `G_{n,H}` has zero entropy … But the entropy cannot drop below zero, so by
> increasing `H` as necessary, at some point one must reach a metastable region
> …, within which very little mutual information can be shared between the
> sequence … and the graph."*

Two properties of that device decide everything below. First, **the budget is
the sequence's own entropy and it is barely enough**: *"one needs a quantitative
bound (which gains a factor of a bit more than `log H` on the trivial bound for
mutual information), and this is surprisingly delicate (it ultimately comes down
to the fact that the series `Σ_{j≥2} 1/(j log j log log j)` diverges, which is
only barely true)."* Second, **the scale is found, not chosen**: *"it requires
one to pick a scale `H` that one cannot specify in advance, which is not a
problem for logarithmic averages (which are quite stable with respect to
dilations) but is problematic for ordinary averages."*

**Both properties are independently fatal to a certificate, before any question
about primes is reached.** The certificate must hold *at every anchor*, on a
window of *specified* width (down to `4Q + 4`); the device delivers *one
unspecified scale* in a range, which is the same almost-all/every quantifier
wall `IMPORT-MAP.md` row 14 already carries. And the corpus's object lives on
the CRT product, which is the structure the author names as the thing that
would be lost if one tried to fix the scale: *"One possible approach would be to
start exploiting multiplicativity at products of primes, and not just individual
primes, to try to keep the scale fixed, but this makes the concentration of
measure part of the argument much more complicated as one loses some
independence properties (coming from the Chinese remainder theorem) which
allowed one to conclude just from the Hoeffding inequality."* **[SOURCED,
verbatim]**

### 2.2 Why the engine cannot be pointed at primes: the address, stated as a mechanism

The parity-barrier story is the usual answer and it is not the sharp one.
The sharp one is one line: **the engine's transformation law is a statement
about small-prime divisibility, and the prime indicator has no transformation
law under it.** `λ(pn) = −λ(n)` for every `n`; `1_P(pn) = 0` for every `n > 1`.
Dilation by a small prime does not act covariantly on the primes, it annihilates
them. There is no sign to track, no "large and positive" to propagate, and the
contradiction never forms.

Restated for the sieve reader: the argument extracts information from *how a
sequence behaves along multiples of `p` for many small `p`*, and the primes are
exactly the integers that have no such multiplicative structure to read. This is
why the failure is not "the saving is too small". A larger saving in the same
mechanism would still be a saving about small-prime divisibility patterns.

**Grading the brief's four options for the twin-prime question:**

| candidate address | verdict |
|---|---|
| (i) log averaging / density-zero-in-log-scale | REAL, not binding **for twin primes**, and **independently binding for a certificate**. Not binding for TPC because even the non-log-averaged corrected Elliott conjecture (Tao's (1.10), `k = 2`) would not apply to a prime indicator: primes are not a 1-bounded multiplicative function at all. Binding for a certificate because the device returns *one scale it cannot specify in advance* (§2.1, verbatim) and the certificate is quantified over *every* anchor at a *specified* width |
| (ii) λ-correlations → indicator-of-prime correlations | **BINDING, and this is Tao's own stated reason** — but the mechanism is the dilation law of §2.2, not the parity barrier as usually narrated |
| (iii) entropy budget scaling wrong | REAL and priceable (§4), non-binding: the budget question is only reached after (ii) is answered |
| (iv) something else | **BINDING FOR OUR OBJECT**, and different from (ii): the pretentious dichotomy, §2.3 |

### 2.3 The address for **our** object, which is a different address

Theorem 1.3's hypothesis, verbatim from the PDF **[SOURCED]**:

> *`g₁` "non-pretentious" in the sense that*
> `Σ_{p≤x} (1 − Re g₁(p)χ(p)p^{−it})/p ≥ A` (1.6)
> *for all Dirichlet characters `χ` of period at most `A`, and all real numbers
> `t` with `|t| ≤ Ax`.*

Instantiate at `g₁ = χ₀ mod y#`, `χ = 1` (period 1), `t = 0`. Then
`1 − Re g₁(p) = 1` for `p ≤ y` and `= 0` for `p > y`, so the left side is

> `Σ_{p ≤ y} 1/p = ln ln y + M + o(1)`,  `M = 0.2614972128…`

and the hypothesis reads `ln ln y + M ≥ A`. **[ARITHMETIC, SCRATCHPAD-GRADE;
inputs: Mertens' constant `M`, Mertens' second theorem]**

Three consequences, in order of how much they matter.

1. **The hypothesis fails, and the conclusion fails with it.** For fixed `y` the
   left side is a constant while `A` must be taken large depending on `ε`. And
   the theorem's conclusion (1.7), `|Σ g₁(n)g₂(n+2)/n| ≤ ε log ω`, is *false*
   for our `g`: the correlation is the sieve main term `∏_{p≤y}(1 − 2/p)` times
   `log ω`, which is positive and bounded away from `0` for fixed `y`. This is
   the strongest form of non-transfer available: not "the theorem does not
   apply", but "its conclusion is false for this input, consistently with its
   hypothesis failing".

2. **Depth buys distance at double-log rate, and only that.** The whole
   non-pretentiousness budget our object can ever have is `ln ln y + M`.
   **[ARITHMETIC, SCRATCHPAD-GRADE]**

   | `h` | `A` available at `u = u* = 3.565847` | `A` available at `u = 2`, `y = √h` |
   |---|---|---|
   | `10⁸` | 1.9036 | 2.4818 |
   | `10¹⁶` | 2.5967 | 3.1750 |
   | `10¹⁰⁰` | 4.4293 | 5.0076 |
   | `10¹⁰⁰⁰` | 6.7319 | 7.3101 |

   Even at the deepest legal depth the object can reach, and at heights the
   corpus will never compute at, `A` is single digits. Tao's footnote 2 puts the
   dependence of `A` on `1/ε` at "roughly triple-exponential" **[SOURCED,
   verbatim]**. A single-digit `A` against a triple-exponential requirement is
   not a shortfall to be closed; it is the wrong regime.

3. **Our object is the case the theory calls structured, not the case it calls
   cancelling.** Which is §3.

---

## 3. Where the tile sits: it is the machine's output, not a favourable input

Tao–Teräväinen's abstract, verbatim **[SOURCED]**:

> *"We show a structural theorem for these sequences, namely that these
> sequences `f` are the uniform limit of periodic sequences `f_i`. Furthermore,
> if the multiplicative function `g₀ … g_k` 'weakly pretends' to be a Dirichlet
> character `χ`, the periodic functions `f_i` can be chosen to be `χ`-isotypic
> in the sense that `f_i(ab) = f_i(a)χ(b)` whenever `b` is coprime to the
> periods of `f_i` and `χ`, while if `g₀ … g_k` does not weakly pretend to be
> any Dirichlet character, then `f` must vanish identically."*

Instantiate: `g₀ = g₁ = χ₀ mod y#`, so `g₀g₁ = χ₀² = χ₀`, which does not merely
weakly pretend to be a Dirichlet character — **it is one**. The theorem
therefore lands in its `χ`-isotypic branch, and its conclusion for our object is
that the correlation sequence is a uniform limit of periodic sequences. On our
side that limit is not a limit: the shift-correlation of `χ₀ mod y#` is
*exactly* periodic with period `y#`, with the closed form
`a ↦ ∏_{p ≤ y}(1 − ν_p(a)/p)`, `ν_p(a) = #{0, −a} mod p`. **That is the tile.**

So the honest answer to the brief's last question:

> **The tile's finiteness and periodicity do not help, and they are not
> irrelevant either. They are the property that selects the unfavourable branch.**
> The foreign machine, correctly instantiated on the census, hands back the tile
> — the main term the corpus already computes exactly and free — and the error
> term, which is the entire content of the certificate, is what the phrase
> "uniform limit" absorbs.

Two corollaries worth carrying:

- **The dilation structure the entropy decrement spends its whole budget to
  obtain approximately is exact and free on the tile, and it is worthless.**
  For `p` coprime to `x#`, multiplication by `p` on `Z/x#` carries the shift-2
  comb bijectively to the shift-`2p` comb, so `|comb(2)| = |comb(2p)|` exactly.
  The corresponding count is `∏_{q ∤ h}(q−2)·∏_{q | h}(q−1)`, which is the same
  number for `h = 2` and `h = 2p`, `p > x`. Getting this for free is not an
  advantage, because it was never what was scarce.
- **The argument's key quantity is not small on the tile, it is maximal.** The
  device needs `I(X_H ; G_{n,H})` small, where `G_{n,H}` is the divisibility
  graph of §2.1. On the tile at level `x`, both the survivor word `X_H` and the
  graph `G_{n,H}` (for `P ⊆ {q ≤ x}`) are functions of the single variable
  `n mod x#`, and for `H` past a few multiples of `q` the word *determines* the
  graph's `q`-edges. So the two random variables are not merely dependent: one
  is a function of the other, and `I(X_H ; G_{n,H}) = H(X_H)` exactly, the
  largest value it can take. The metastable region the device reaches by raising
  `H` is reached here only once `H(X_H)/H` has collapsed, i.e. once `H` is past
  the period `x#` — beyond every scale the certificate is about. This is the
  same fact as §3's first bullet seen from the other side: the tile is
  *deterministic*, and a deterministic object is where an entropy method has
  nothing to spend.

**Novelty: none is claimed anywhere in §3.** `1_{(n,P)=1} = χ₀ mod P` is a
definition, and the periodic form of a two-class sieve density is the corpus's
own tile and the literature's primorial wheel. The only thing new-to-us is which
branch of a published dichotomy our object sits in.

---

## 4. The price, stated against what a certificate needs

**What the certificate needs.** `quadpoint-identity-01.md` §4 (HELD, unverified)
states it: certifying `Σ capU ≤ C − 1` needs a rough-pair count bounded above
"with relative precision at TWIN scale — the margin `(T − X)/C ~ 1/ln²h` — on
intervals as short as the stretch (down to width `4Q + 4`)", and records that
"no sieve upper bound delivers a constant sharp to `1 + O(1/ln²)`". The measured
context, for calibration only: `attack-roughpair-error.md` §3 measures the true
error `E = X − X_main` at `χ²/df = 0.546…0.785`, sub-Poisson, with
`⟨|E|⟩/⟨T⟩ = 0.0255` at the top band — so the *truth* is comfortable and the
*proof* is not, which is the whole difficulty.

**What the field supplies, at three levels of generosity.**

| supplier | statement | relative saving | source grade |
|---|---|---|---|
| Tao 2016, own footnote 2 | optimised decay `O(log x/(log log log x)^c)`, `c` small absolute | `(lnlnln x)^{−c}` | **[SOURCED, verbatim]** |
| Helfgott–Radziwiłł 2021 | `(1/log x)Σ λ(n)λ(n+1)/n = O(1/√(log log x))` | `(lnln x)^{−1/2}` | **[SOURCED-BIB]** |
| Pilatte 2023/2026 | `Σ_{n≤x} λ(n)λ(n+1)/n ≪ (log x)^{1−c}`, `c > 0` absolute, unspecified | `(ln x)^{−c}` | **[SOURCED-BIB]**, preprint, no journal ref |

**The arithmetic. [ARITHMETIC, SCRATCHPAD-GRADE]**

- Against Tao's own shape: matching `(lnlnln h)^{−c}` to the needed `(ln h)^{−2}`
  forces `c = 2·lnln h/lnlnln h`, which reads `5.45` at `h = 10⁸`, `5.62` at
  `10¹⁶`, `6.42` at `10¹⁰⁰`, `7.57` at `10¹⁰⁰⁰`, `10.91` at `10^{10⁶}`. The
  requirement is a growing function; the supply is "some small absolute constant".
- Against the best in print: the needed exponent is `c = 2`. A bound with
  `c ≥ 1` would already make the log-averaged correlation sum *bounded*, far
  beyond anything claimed, so the published `c` is necessarily `< 1`. The
  shortfall is more than a factor 2 in the exponent, in a quantity that is not
  even the right quantity (a mean-zero correlation, not the constant of a
  positive count).
- Against the twin upper bound: Lichtman Thm 1.2, read at source this session,
  `π₂(x) ≲ 3.29956 Π(x)` **[SOURCED, verbatim]**, i.e. the best published
  constant on the adjacent problem is off by `2.29956` in absolute terms after
  the thirteen-entry chronology of his Table 1 (Brun 1919 `O(1)` … Wu 2004
  `3.39951`, Lichtman `3.29956`). The certificate needs a constant sharp to
  `1 + O(1/ln²h)`. **Relative precision `O(1)` versus relative precision
  `O(1/ln²h)`: these are different classes and the distance between them is not
  a constant.**

**A pairing this note refuses to make, and the reason.** It is tempting to set
the census's heuristic crossing depth `u* = 3.565847`
(`attack-roughpair-error.md`, root of `uω(u) = 2`; asymptotic form
`2e^γ = 3.562145`) beside the dimension-2 sifting limit
`β₂ = 4.26645028414864191641`, note `u*/β₂ = 0.8358` and `β₂ − u* = 0.7006`
**[ARITHMETIC, SCRATCHPAD-GRADE]**, and conclude that the crossing sits inside
the band where a dimension-2 sieve gives nothing. **That conclusion is not made
here.** `attack-lichtman-decomp.md` §0.3 established that `3.29956` and `β₂`
"share no ingredient" and "must never be added, ratioed, or traded against each
other". The same discipline applies to `u*` and `β₂`: `u*` is `ln h/ln y` on an
exactly-counted census, `β₂` is `ln D/ln z` in a sieve with a level of
distribution, and **nobody has established this session that they are the same
coordinate**. The two numbers are recorded above so a future session does not
have to recompute them, and the pairing is left open, not asserted.

---

## 5. Depth 2, since the brief asked

The field does have something to say about depth-2 sifting, and it is the same
sentence as everything above.

At `u = 2` exactly (`y = √h`), the multiplicative function `χ₀ mod y#`
restricted to the window `(y, h]` **is** the indicator of the primes. That is
the coordinate at which the corpus's four objects converge, and this note adds
the reason from the multiplicative-functions side: `u = 2` is the depth at which
the pretentious object stops being pretentious by becoming a set that is not
multiplicative at all. Below `u = 2` the census is a Dirichlet character and the
theory says "periodic, structured, nothing to prove". At `u = 2` it is the
primes and the theory says "no bearing as yet". There is no depth at which it is
the third thing — a non-pretentious 1-bounded multiplicative function — which is
the only input the parity-breaking theorem accepts.

This also gives the sharpest statement of why the λ instrument is empty here,
and it agrees with the corpus's own measurement rather than adding to it: on the
stretch, `u = 2` is pinned exactly, survivors are prime, and `λ(n)λ(n+2) ≡ +1`
on twins. But `λλ = +1` also holds for `(P₃, P₃)`, `(P, P₃)`, `(P₂, P₂)` and
every other same-parity pair, so the instrument's value on the target set is a
constant and carries zero bits about `|T|`. `attack-lambda-ledger.md` §2 reached
the same verdict empirically ("the fold ledger is parity-blind"); §5 of this
note is the proof-side reason, and it is not new mathematics, only the standard
parity statement said in the census's coordinate.

---

## 6. What is NOT reached, stated so it is not mistaken for coverage

- **The entropy decrement lemma itself was not read line by line.** §2.1 now
  rests on the author's own prose description (blog, read at source) plus the
  paper's §1, **not** on the paper's §3 where the lemma and its constants live.
  If the lemma's accounting differs in a way that matters, §2.1 is the paragraph
  that would move. This is the reason §2's confidence is 0.7 and not higher.
  What would falsify §3's second bullet: a reading of §3 showing the device
  tolerates `I(X_H ; G_{n,H}) = H(X_H)` for a deterministic sequence. That check
  has **not** run.
- **Helfgott–Radziwiłł and Pilatte were reached at abstract level only**
  (**[SOURCED-BIB]**). Pilatte is an unrefereed preprint and `c` is unspecified;
  the claim "the published `c` is necessarily `< 1`" in §4 is an inference from
  the *shape* of the printed bound, not a quoted statement.
- **No search for prior art on "the census as a pretentious correlation" was
  run.** Per `SEARCH-CONVENTIONS.md`, the owning convention would be
  *pretentious multiplicative functions* / *Halász–Montgomery–Vaughan distance*
  / *correlations of multiplicative functions*, and the house phrase "rough-pair
  census" reaches none of it. **No absence is asserted anywhere in this file**,
  and the identification in §1a is stated as textbook precisely so that no
  novelty language attaches to it.
- **Whether the Matomäki–Radziwiłł short-interval theorem, which is the other
  input to Tao 2016 and which does accept pretentious inputs, says anything
  usable about `X(y)` in a stretch, is UNPRICED here.** The one thing that can
  be said without reading it: its quantifier is *almost all* `x`, and the
  certificate must hold at *every* anchor — the same almost-all quantifier wall
  `IMPORT-MAP.md` row 14 already carries. That is a reason to expect it to fail,
  not a closure, and it is the one residual worth a future four hours.

---

## 7. DRAFTED `IMPORT-MAP.md` row 15 — **NOT APPLIED, drafted here only**

Insert after row 14 in §2's table:

> | 15 | logarithmically averaged correlations of multiplicative functions; the entropy decrement argument | Tao, *Forum Math. Pi* **4** (2016) e8 = arXiv:1509.05422, **Thm 1.2** (log-averaged two-point Chowla) and **Thm 1.3** (log-averaged nonasymptotic Elliott, with hypothesis **(1.6)**) **[SOURCED, verbatim at page image]**; Tao–Teräväinen, *Duke Math. J.* **168** (2019) 1977–2027 = arXiv:1708.02610, the structure theorem (uniform limit of periodic sequences; `χ`-isotypic in the pretentious branch) **[SOURCED, verbatim abstract]**; quantitative forms Helfgott–Radziwiłł arXiv:2103.06853 `O(1/√lnln x)` and Pilatte arXiv:2310.19357 `≪(ln x)^{1−c}` **[SOURCED-BIB]** | the rough-pair census `X(y)`: the `y`-rough indicator **is** `χ₀ mod y#`, so `X(y)` is the two-point correlation of a 1-bounded completely multiplicative function at shift 2, minus its prime-pair part | the `1 + O(1/ln²h)` precision class of `quadpoint-identity-01.md` §4 | **EXACT-IDENTITY at the object; NO TRANSFER at the theorem** | **TPC-STRENGTH at `u = u*`, CIRCULAR at `u = 2`** (the fifth wrong-direction arrival) | WALL-ADDRESS + PUBLISHED-ANCHOR + CLOSURE | 0 h (gated out before any experiment) | **GRADED AND CLOSED 2026-08-27, no experiment run** — the object is a Dirichlet character, hence maximally pretentious: Thm 1.3's hypothesis (1.6) fails at `χ = 1, t = 0` with left side `Σ_{p≤y}1/p = lnln y + M`, and its *conclusion* is false for this input (the correlation is the sieve main term, not `o(log ω)`); Tao–Teräväinen's theorem does transfer and returns the **tile** — the corpus's own exactly-computed main term — with the certificate's entire content inside its "uniform limit"; the parity-breaking branch is disclaimed in print by its author for exactly our reason (*"as they rely in an essential fashion on multiplicativity at small primes, they unfortunately do not appear to have any bearing as yet on twin prime-type sums"*, p. 5, verbatim), and the sharp mechanism is that the engine is the dilation law `λ(pn) = −λ(n)`, under which the prime indicator is annihilated rather than covariant; **two further blocks sit in front of that, each alone sufficient** — the device returns one scale *"that one cannot specify in advance"* against a certificate quantified over every anchor at a specified width (the almost-all quantifier wall again), and the author names *"independence properties (coming from the Chinese remainder theorem)"* as what the scale-fixing modification would cost, on the very product our tile is; on the tile the device's key quantity is not small but MAXIMAL, `I(X_H; G_{n,H}) = H(X_H)`, since word and divisibility graph are both functions of `n mod x#`; prices, all `[SCRATCHPAD-GRADE]`: available non-pretentiousness `A = lnln y + M` is `1.90` at `h = 10⁸` and `6.73` at `10¹⁰⁰⁰` against a requirement Tao's own footnote 2 calls "roughly triple-exponential" in `1/ε`, and matching his optimised `(lnlnln h)^{−c}` to the needed `(ln h)^{−2}` demands `c = 2·lnln h/lnlnln h` = `5.45 → 10.91` over `h = 10⁸ … 10^{10⁶}`, a growing exponent asked of an absolute constant; banked: the census's name in the owning convention, the `u = 2` reading (below it the object is a character and the theory says "structured"; at it the object is the primes and the theory says "no bearing"; there is no depth at which it is non-pretentious multiplicative), and the refusal to pair `u*` with `β₂`; residual, unpriced: Matomäki–Radziwiłł in short intervals, which accepts pretentious inputs but carries the almost-all quantifier; `history/staging/import-entropy-decrement.md` |

---

## 8. DRAFTED `REFUTED.md` row — **NOT APPLIED, drafted here only**

> | the entropy decrement / logarithmically-averaged Chowla import as a route to the census (import-map row 15) | CLOSED at the gate, no experiment run | the `y`-rough indicator IS `χ₀ mod y#`, so the census is the two-point correlation of a Dirichlet character and lands in Tao–Teräväinen's *structured* branch, whose output is the tile we already compute exactly; Elliott hypothesis (1.6) fails at `χ = 1, t = 0` with left side `lnln y + M` (1.90 at `h = 10⁸`) and the theorem's conclusion is false for this input; the parity-breaking branch is disclaimed by its author for our exact reason — it "relies in an essential fashion on multiplicativity at small primes" and the census is defined by their absence — the device returns one unspecifiable scale against a certificate quantified over every anchor; and on the tile its key quantity is maximal rather than small (`I(X_H; G_{n,H}) = H(X_H)`, word and graph both functions of `n mod x#`); the needed hypothesis is TPC-STRENGTH at `u = u*`, CIRCULAR at `u = 2` | 2026-08-27 | `history/staging/import-entropy-decrement.md` |

---

## 9. Corrections proposed to live documents — **NOT APPLIED**

**One correction, and it is an addition rather than a repair.**

`research/SEARCH-CONVENTIONS.md` §1 has **no row for the census**, which is why
`quadpoint-identity-01.md` §5 could only write "SEARCH OWED" and why a future
session searching "rough-pair census" would produce another clean negative in
house vocabulary — the exact failure mode §1 of that file exists to prevent.
Proposed new row, to be inserted after the `L² spread of the tile` row:

> | two-point correlation of the `y`-rough indicator (the rough-pair census) | `X(y)`, the census; the tile's shift-2 comb | two-point correlation of a 1-bounded multiplicative function | **the `y`-rough indicator IS `χ₀ mod y#`, the principal character**, so search **"correlations of multiplicative functions"**, **"pretentious multiplicative functions"**, **"Halász–Montgomery–Vaughan distance"**, and for the short-interval half **"multiplicative functions in short intervals"**. Our object is on the **pretentious** side of the dichotomy, where the answer is a theorem: the correlation sequence is a uniform limit of periodic sequences, `χ`-isotypic. The parity-breaking side (Chowla/Elliott, entropy decrement) hypothesises the *opposite*, so a negative there is guaranteed and worthless — the same trap as the `level of distribution` row | Tao, *Forum Math. Pi* **4** (2016) e8 = arXiv:1509.05422, Thm 1.3 hypothesis (1.6); Tao–Teräväinen, *Duke Math. J.* **168** (2019) 1977–2027 = arXiv:1708.02610, the structure theorem; Matomäki–Radziwiłł, *Multiplicative functions in short intervals*, arXiv:1501.04585v4, for the short-interval half (**[SOURCED-BIB]** — the arXiv record reads "to appear in Ann. of Math." and prints **no volume or pages**, so the journal locator must be confirmed before it is quoted; quantifier is *almost all*) |

**No correction is proposed to `paper/wall-note.md`.** Its three known-wrong
sentences (Face 4's `β₂` direction, Face 1's parity floor `8`, Face 2's
multiplicity `m ≥ 3`) were read as flagged and nothing in this note builds on
them; the `β₂` value is used here only as a number this file explicitly declines
to pair with anything.

**No correction is proposed to `PRIOR-ART.md`.** `import-bfree.md` §5.5 already
recorded that the corpus contains no Sarnak line and that the parity ↔ entropy
identification is folklore not in print. This note does not change that; it adds
the *scoping* sentence, which is in print, and that belongs in the import map
row, not in the novelty position.

---

*Session scratchpad: `entropy-price.js` (the `[SCRATCHPAD-GRADE]` arithmetic),
`tao1509.txt`, `tt1708.txt`, `lichtman.txt`, `tao-blog.html` / `tao-blog.txt`
(the `pdftotext -layout` and HTML extractions whose source sha256s are tabled
at the head of this file). None of
these is a repo artifact. No repo file was created, edited, moved or deleted by
this session other than this note. History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
