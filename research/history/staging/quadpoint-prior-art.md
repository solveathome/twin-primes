# quadpoint-prior-art — the owning-convention survey for the capture identity, the rough-pair census and the crossing law

<!-- ledger
id: Q-quadpoint-prior-art
status: ANSWERED
todo: Z2
question: In the owning conventions, who holds the rough-pair census, the capture identity and the crossing law, and is any of it ours?
verdict: The object and the identity are standard (the dimension-2 twin sifting function plus Buchstab's identity; ADJACENT-STANDARD, no verbatim carrier, no novelty language); only the comparison X(y) < T and the crossing law stay ABSENT-PER-CONVENTION, and the Buchstab correction is 6.6% of the top-band residual, not 2%.
-->

*(Literature recon, 2026-08-22. Commissioned against
`research/history/staging/quadpoint-identity-01.md` §5, which records the
search as OWED and claims no novelty. Own new file only; PRIOR-ART additions
are PROPOSED in §6 and SEARCH-CONVENTIONS rows in §7, neither applied.
Nothing committed, nothing pushed. No existing file edited.)*

**Headline, stated before anything else: the central object is not ours, and
was never plausibly ours.** `X(y)`, the census of pairs `(a, a+2)` with both
members `y`-rough, is the classical dimension-2 sifting function `S(A, y)` for
`A_p = {n : p | n(n+2)}`, minus the pairs holding a prime. It is the first
worked example in every sieve course. What the survey could not find in print
is the *comparison* `X(y) < T` used as a certificate, and the crossing law that
locates it. Those two stay ABSENT-PER-CONVENTION, with the query lists below.

**The three objects.**

- **(A)** the rough-pair-vs-twin comparison: in `S_Q = [Q², Q′²)`, `X(y) < T`,
  where `X(y) = #{pairs both composite, both y-rough}` and `T = #twins`.
- **(B)** the crossing law: `δ_R(y) = 2δ_P` at `y* = h^{1/(2e^γ)}`,
  exponent `0.28073`.
- **(C)** the capture identity `floor_K = T − X(K)`, the collapse of the
  per-prime cap family onto the census.

**Channels used and calibrated this session** (per
`research/SEARCH-CONVENTIONS.md`):

| channel | calibration run in the same minutes | result |
|---|---|---|
| WebSearch | `Kourbatov maximal gaps between twin primes arXiv 1301.2242` | returned arXiv:1301.2242 on the first query |
| OEIS text API (`fmt=text`) | `2,6,18,30,66,150,192,258`; `2,4,6,10,14,22,26,34,40,46,58,66` | → A288815, A048670, both correct |
| zbMATH open API | `Chen's theorem twin`; `Buchstab function` | → Wu 2004, Li 2026, Tolev 1999; → Buchstab 1937/1943/1951, Iwaniec–van de Lune–te Riele 1980. **The §5 gotcha applies: a zero-result query answers HTTP 404, so a 404 here is a NEGATIVE, not a dead channel.** Long queries returned 404 where short ones returned records, exactly as `SEARCH-CONVENTIONS.md` §5 warns |
| PDFs at page image | `arxiv.org/pdf`, `msp.org`, `ford126.web.illinois.edu`, read with `pdftotext -layout` | sha256s in §5 |

---

## 1. Object (A), the rough-pair census — verdict: OWNED as an object, ABSENT-PER-CONVENTION as a comparison

### 1.1 The object is textbook, and the owning convention is "the twin-prime sieve problem, dimension 2"

Ford, *Sieve methods lecture notes, Spring 2023*, §1.7.2 (read at page image,
sha256 §5), sets up the exact object:

> "**Twin primes.** Take `A = [1, x] ∩ Z`, `X = x`, `A_p = {n ∈ A : p | n(n+2)}`.
> Here `S(A, √x + 2)` counts the number of twin prime pairs between `x + 2` and
> `x`."

and, after `ρ(p) = 2` for `p > 2`,

> "Thus, this is a sieve problem of dimension 2 (or sifting density 2)."

`S(A, z)` is `#{n ≤ x : n and n+2 both have no prime factor ≤ z}`. In our
vocabulary that is `T + M + X(z)` inside the window, `M` the mixed
prime-composite pairs. Three consequences, each of which was independently
derived in `quadpoint-identity-01.md` and each of which is standard:

1. **The full-depth bijection (identity note §2, bullet 2) is the sentence
   quoted above.** `S(A, √x) = π₂`-count, i.e. `X(√x) = 0`, because a
   `√x`-rough number below `x` is prime. This is the definition of the twin
   sieve at level `√x`, not a lemma of ours.
2. **The rough-rough pair count is what every lower-bound sieve actually
   produces.** Ford §3.0.1: `S(A, x^{1/7.9}) ≫ x/log²x`, and then
   > "We conclude that there are `≫ x/ log² x` integers `n ⩽ x`, such that each
   > of `n` and `n + 2` have at most 7 prime factors, as these factors are
   > `> z`."
   That is a lower bound on `T + M + X(z)`, phrased as an almost-prime-pair
   statement. Our `X(y)` is that count with the prime-bearing pairs deleted.
3. **The `u`-coordinate is the standard one.** Ford §1.7.1: "for fixed `c > 0`,
   one has `S(A, x^c) ∼ w(c) X V(z)`, where `w(·)` is the Buchstab function".
   (Stated there for the dimension-1 example; see §2.3 for why transporting it
   to the pair problem as `ω(u)²` is a hypothesis and not a citation.)

Halberstam–Richert, *Sieve Methods* (1974), Ch. 2 carries the same example and
Cor. 2.4.1 is its upper bound; the book is not full-text reachable here and is
cited through Ford and through FKMPT Remark 7 as the corpus already does
(`research/covering-dive.md`).

### 1.2 The nearest published *comparisons*, none of which is ours

| work | what it compares | why it is not (A) |
|---|---|---|
| **Lichtman, *A modification of the linear sieve, and the count of twin primes*, Algebra & Number Theory 19:1 (2025) 1–36**, Thm 1.2: `π₂(x) ≲ 3.299 56 𝔖(x)` | a sieve-derived upper bound for twins against the Hardy–Littlewood main term | compares `T` to its own conjectured size, not to `X`. Direction is the opposite of ours (upper bound on `T`, not lower). **Its Table 1 is the chronology this repo needed: Brun 1919 `O(1)`, Selberg 1947 `8`, Pan 1964 `6`, Bombieri–Davenport 1966 `4`, Chen 1978 `3.9171`, Fouvry–Iwaniec 1983 `34/9`, Fouvry 1984 `64/17`, BFI 1986 `3.5`, Fouvry–Grupp 1986 `3.454`, Wu 1990 `3.418`, Cai–Lu 2003 `3.406`, Wu 2004 `3.399 51`, Lichtman 2025 `3.299 56`.** See §4.1 — this number bears directly on the identity note's §4 wall statement |
| **Runbo Li, *On Chen's theorem, Goldbach's conjecture and almost prime twins II*, arXiv:2405.05727 (zbMATH 8166685, 2026)**: `D_{1,2}(N) ≥ 1.9728 C(N)N/(log N)²` | an almost-prime pair count against the Hardy–Littlewood constant `2` | Goldbach setting (`p + P₂ = N`), one almost-prime member, and the comparison is to a *conjectured constant*, not to a count in the same window |
| **Natalie Evans, *Correlations of almost primes*, Math. Proc. Camb. Phil. Soc. (arXiv:2102.12297)** — abstract read verbatim | asymptotics for `#{n = p₁p₂ ≤ X : n + h = p₃p₄}` and for `n` prime, `n+h` an `E₂` | the closest published *pair census of almost primes*. But `h` is averaged (`log^{19+ε}X ≤ H ≤ X^{1−ε}`), not fixed at `h = 2`; the count is `E₂ × E₂`, not `y`-rough at a free `y`; and the abstract makes no comparison with the twin count |
| **Gafni–Tao, *Rough numbers between consecutive primes*, arXiv:2508.06463** (Erdős problem #682) | rough numbers inside a prime gap | single rough numbers, not pairs; no comparison against a prime or twin count. Confirmed at source: "this work does not examine pairs of rough numbers" |
| **Brun 1919 / Chen 1973 / Wu 2004 / Cai–Lu** | `(P_r, P_s)` pairs at distance 2, existence and lower bounds | the whole tradition counts almost-prime pairs from below; none of it sets that count *against* the twin count in a fixed window |

### 1.3 The absence, with its convention and its queries

**ABSENT-PER-CONVENTION.** No published work was found that compares a count of
rough-rough (both-composite) pairs against the twin-prime count in the same
interval, in any interval, let alone in a prime-square window. Searched in the
conventions that own the object — **the twin-prime sieve problem of dimension 2
(`S(A,z)`, `A_p = {n : p|n(n+2)}`)**, **almost-prime pairs / Chen territory
(`(P_r, P_s)`, `D_{1,2}`)**, and **rough numbers / numbers free of small prime
factors (`Φ(x,y)`, Buchstab)** — per `research/SEARCH-CONVENTIONS.md`. Ten
distinct flips, all on channels calibrated in this session's §0 table:

| # | query | channel | result |
|---|---|---|---|
| A1 | `"rough numbers" pairs n and n+2 both free of prime factors below y counting asymptotic sieve` | WebSearch | Gafni–Tao (singles), Fan–Pomerance neighbourhood; no pair census |
| A2 | `"twin rough numbers" OR "rough twins" OR "consecutive rough numbers"` | WebSearch | zero as a term of art |
| A3 | `two-dimensional Buchstab function sifted pairs correlation Phi(x,y) twin` | WebSearch | zero; only physics pair-correlation noise |
| A4 | `sifting function S(A,z) twin primes pairs n n+2 both free of prime factors less than z count compared with number of twin primes` | WebSearch | → Ford's notes, i.e. the object, not the comparison |
| A5 | `Chen's theorem almost prime twins count P_2 pairs compared with conjectured number of twin primes ratio` | WebSearch | → Li arXiv:2405.05727 (§1.2) |
| A6 | `"almost-prime pairs" OR "(P_2, P_2)" pairs n n+2 both almost prime counting weighted sieve` | WebSearch | → Evans arXiv:2102.12297 (§1.2) |
| A7 | `"semiprime twins" OR "twin semiprimes" counting n and n+2 both semiprime asymptotic density compared twin primes` | WebSearch | recreational only; no asymptotic in the citable literature |
| A8 | `Brun 1919 pairs P_9 P_9 twin almost primes (P_r, P_s)` | WebSearch | history of the lower-bound tradition; no census comparison |
| A9 | `pairs of integers free of small prime factors` | zbMATH | one irrelevant record (polynomial factorization) |
| A10 | `pairs of rough numbers differing by 2`, `twin rough numbers`, plus the word-search probe | OEIS | nothing; A003586/A087907 are unrelated |

Also run, and recorded so it is not redone: the identity note's exact-anchor
list `{7, 11, 13, 19, 23, 31, 37, 43}` (the `CC < T` list) was searched in OEIS
at three indexings (bare, prefixed with 5, extended by 47) per the ±offsets
rule. Four hits, all unrelated (A192869 thin primes, A040116, A092581,
A132779). **This negative is weak and must not be quoted as "not in OEIS":** a
list of eight small primes is a low-information key, and the census ladders
themselves (`X(y)` per anchor, `CC` per anchor) were not searched because they
are not embedded anywhere yet. Per the `zonegap-prior-art.md` precedent, no
OEIS-absence claim about this family may be written until those ladders exist
in an embedded producer.

---

## 2. Object (B), the crossing law — verdict: ABSENT-PER-CONVENTION for the statement, ADJACENT for the constant

### 2.1 The constant is ubiquitous, which is exactly why its appearance proves nothing

`2e^γ = 3.562 145` and `e^{-γ} = 0.561 459` are load-bearing in three separate
places that have nothing to do with our crossing:

- **`F₁(1) = 2e^γ` in the Rosser–Iwaniec linear sieve** — the upper-bound sieve
  function at `s = 1`; the sieve main terms are written `2e^γ |A| W(z) G(s)`.
  Surfaced on query B2 below.
- **`ω(u) → e^{-γ}` as `u → ∞`** — the Buchstab limit; equivalently Mertens,
  `∏_{p≤y}(1 − 1/p) ∼ e^{-γ}/log y`.
- **`2e^{-γ} = 1.1229`** — Granville's constant against Cramér, already in the
  corpus through Kourbatov 2013 §6 (`zonegap-prior-art.md` §1).

`SEARCH-CONVENTIONS.md`'s own warning applies verbatim here: an occurrence of
the constant is not an occurrence of our statement. None of the three above is.

### 2.2 The exact crossing equation, and the correction it gives — scratchpad-grade

Written in the owning coordinate, the identity note's law is not
`y* = h^{1/(2e^γ)}` but the Buchstab equation

> `u ω(u) = 2`, with `u = log h / log y`,

because `δ_R(y)/δ_P = u ω(u)` exactly (Φ(x, x^{1/u}) ∼ ω(u) x/log y against
`1/log x`). `2e^γ` is the `u → ∞` form of that root, obtained by replacing
`ω(u)` with its limit `e^{-γ}`.

Solved numerically here (**scratchpad-grade: a session script, NOT an embedded
producer, not `qc`-gated, and nothing below is a repo number**), `ω` integrated
on a `10⁻⁵` grid from the delay equation:

| quantity | value |
|---|---|
| `ω(3)`, `3ω(3) = 1 + ln 2` | `0.564 382`, `1.693 147` (matches the closed form, a check on the integrator) |
| exact root of `u ω(u) = 2` | `u* = 3.565 845`, so `1/u* = 0.280 438` |
| asymptotic candidate `2e^γ` | `3.562 145`, so `1/(2e^γ) = 0.280 730` |

**So the Buchstab correction moves the predicted exponent DOWN by
`0.000 291`.** The identity note's measured band means climb
`0.2624 → 0.2763`, leaving a residual of `0.004 414` against the candidate at
the top band and `0.018 344` at the bottom. The correction is **6.6% of the
top-band residual**, and 1.6% of the bottom-band residual [MEASURED,
`redteam-0828-quadpoint.js` SEC F]. It points the right way and it does not
explain the drift. Anyone tempted to read the monotone climb as
convergence-with-a-Buchstab-correction should stop here: at 6.6% the
correction is still an order of magnitude short of the drift,
and the finite-size model is still missing (identity note §6, first bullet,
stands unchanged).

### 2.3 A hypothesis the note carries silently, named here

The derivation `X/C ≈ κ(δ_R − δ_P)²`, `T/C ≈ κ δ_P²` is a **product form**: the
two members are treated as independent once the local factor `κ` is extracted.
That is a heuristic about a *dimension-2* sieve problem, and the correct
correction function for `S(A, x^{1/u})` in dimension 2 is **not** `ω(u)²` — it
is a separate delay-differential object that this survey did not find computed
anywhere for the twin problem. Two things are worth recording:

- **The product form is exactly right at the one point where the truth is
  known.** At `u = 2` it predicts `δ_R/δ_P = 2ω(2) = 1`, i.e. `X(√h) = 0` — and
  that is Ford's §1.7.2 sentence, an identity. A one-point validation is a
  one-point validation and nothing more.
- **The nearest rigorous instance in print is Evans (§1.2), and it is not a
  test of this hypothesis** (read at page level 2026-08-27,
  `history/staging/lit-evans.md`). Her main term has exactly this shape,
  `𝔖(h) × (density)²`, with no correction factor (Thm 3.2). But her `E₂′` has
  its smaller prime factor at `X^{o(1)}`, so in the `u = log X/log p₁`
  coordinate her regime is `u → ∞`, the opposite corner from ours, and Thm
  1.3's proof discards the balanced (rough) factorisations as an `o(1)`
  fraction at its (9.1), so reading her result as "the sub-case `u < 3`" is
  wrong. Her `h` is averaged over `|h| ≤ H`, so `h = 2` is uncontrolled. The
  product form therefore stands validated at exactly one point for our problem
  (`u = 2`, Ford §1.7.2), plus a proven instance in a disjoint regime.

### 2.4 The absence, with its convention and its queries

**ABSENT-PER-CONVENTION.** No published statement was found of the form "the
`x^{1/u}`-rough density equals a prescribed multiple of the prime density at
`u = …`", nor of `u ω(u) = c` solved as a threshold, nor of the exponent
`1/(2e^γ) ≈ 0.2807` or `0.280 438` in any arithmetic role. Searched in the
convention that owns the object — **the Buchstab function `ω(u)` and the
rough-number counting function `Φ(x, y)`**, together with **the sifting-limit
literature (`β_κ`, the Rosser–Iwaniec `F`, `f`)** — per
`research/SEARCH-CONVENTIONS.md`.

| # | query | channel | result |
|---|---|---|---|
| B1 | `Buchstab function "u omega(u)" equals 2 sifted numbers twice as many as primes threshold` | WebSearch | nothing; the search engine said so explicitly |
| B2 | `"2e^gamma" OR "3.5622" sieve threshold exponent x^{1/(2e^gamma)} rough numbers` | WebSearch | → `F₁(1) = 2e^γ` in Rosser–Iwaniec (§2.1); no crossing statement |
| B3 | `Buchstab function omega(u) value where sifted numbers equal number of primes u = e^gamma 1.781` | WebSearch | nothing; only the standard `ω → e^{-γ}` |
| B4 | `"0.2807" OR "0.28073" exponent number theory sieve rough numbers threshold` | WebSearch | nothing |
| B5 | `Erdos problem rough numbers in an interval outnumber primes ratio u omega(u) Phi(x,y)/pi(x)` | WebSearch | → Erdős #682 / Gafni–Tao, a different question |
| B6 | `sifting limit dimension two`; `sifted set contains more almost primes than primes` | zbMATH | 404 = zero on both |
| B7 | `Buchstab iteration sieve limits` | zbMATH | → **Iwaniec–van de Lune–te Riele, *The limits of Buchstab's iteration sieve*, Indag. Math. 42 (1980) 409–417** (Zbl 0445.10035), and **Iwaniec, *Sieving limits* (1981)**. These are the closest *kind* of object in print: thresholds extracted from Buchstab-type delay equations. Neither was read at page level (§8), and neither is asserted to contain or exclude our equation |
| B8 | `sifting limit beta_kappa dimension kappa sieve "2 e^gamma" linear sieve F(1)` | WebSearch | the standard `β_κ` apparatus; nothing at `2e^γ` as a *threshold in `u`* |

**One repo-internal observation, calibrated as an observation and not as prior
art.** `u* = 3.5622` sits inside the band `(2, β₂ = 4.2665)` that
`research/bv-import-survey.md` §3.3 already identified as where our certification
depths land (`u` from 2.3 to 3.4). The certificate's usable range is
`u ∈ [2, u*)`, since `y ≤ Q` forces `u ≥ 2`. Whether that coincidence is
structural or arithmetic is untested and no claim is made either way.

---

## 3. Object (C), the capture identity — verdict: STANDARD SIEVE BOOKKEEPING, and saying so plainly is the finding

The identity note already predicted this ("elementary enough that independent
occurrence is likely; treat it as machinery"). The prediction is confirmed in
substance, though no verbatim carrier of `floor_K = T − X(K)` was found — which
is what one expects of bookkeeping that nobody has had a reason to name.

**The decomposition step is Buchstab's identity, stated for a general sieve
problem.** Ford, §3.2.1, Lemma 3.8 (read at page image):

> "**Lemma 3.8 (Buchstab's identity).** Consider a sieve problem, and
> `z > w ⩾ 2`. Then
> `S(A, z) = S(A, w) − Σ_{w<p⩽z} S(A_p, p − 1)`.
> *Proof.* Suppose that `A_q` does not occur for all primes `q ⩽ w`, but `A_p`
> does hold for some `p ∈ (w, z]`. Letting `p` be the smallest such prime and
> summing over `p` yields the lemma."

That is our proof step (i)+(ii) in one line: classify surviving elements by the
**least** prime `p` with the property `A_p`, and for the twin problem `A_p` is
`p | n(n+2)`, so `p` is the least prime factor of the *product* — that is,
`min(lpf(a), lpf(a+2))`, exactly the quantity `X(K)` conditions on. The
identity's "the depth condition reads the partner's lpf" is the same statement
read on the other member.

**The partner condition is adjacent to Chen's switching principle and is not
an instance of it.** Lichtman's own definition of switching, on the page, is to
"use a weighted sieve inequality to split the problem into multiple cases,
apply sieve bounds to `A = {p + 2 : p ⩽ x}` in certain cases, and then
reinterpret the remaining cases as new sieving problems for switched sets `B`"
— that is switching the sifted SET. The capture identity switches nothing: the
partner condition is already inside `A_p = {n : p ∣ n(n+2)}`, and reading
`min(lpf(a), lpf(a+2))` is Buchstab's identity for that dimension-2 problem,
which is the paragraph above. The Ford Lemma 3.8 attribution carries the whole
weight; the switching attribution is an analogy (red team
`redteam-0828-quadpoint.md` §6). Iterating Buchstab in the switching setting is
Fouvry–Grupp 1986 / Wu's double sieve (Wu, *Chen's double sieve, Goldbach's
conjecture and the twin prime problem*, Acta Arith. **114** (2004) 215–273,
arXiv:0705.1652). Lichtman 2025 §6 states the working form:

> "we apply the Buchstab identity in order to lower the sieve threshold down to
> `z = x^ε` for some tiny `ε > 0`"

with keywords on the paper's own front page: "linear sieve, well-factorable
weights, level of distribution, **switching principle, Buchstab identity**".
And his Lemma 6.1 is our `δ_R` with the Buchstab constant, inside the twin
problem, cited to Wu 1990 Lemma 12:

> "`Σ_{n ⩽ x, p|n ⇒ p ⩾ y} 1 = ω(u)·x/log y + O(x/(log y)²)`", `y = x^{1/u}`.

**Verdict: ADJACENT-STANDARD, with no verbatim carrier.** The ingredients —
least-prime-factor partition (Buchstab), the twin sieve as a dimension-2
problem, the partner condition (inside `A_p` itself) — are all textbook. The particular
collapse of *our* cap family onto the census is our bookkeeping over our own
pool convention, and is not a discovery in any sense. **No novelty language may
attach to §1 of the identity note.** Queries, in the owning conventions
(Buchstab identity / switching principle / vector sieve):

| # | query | channel | result |
|---|---|---|---|
| C1 | `"least prime factor" decomposition Buchstab identity for pairs twin prime sieve bookkeeping inclusion-exclusion` | WebSearch | → the standard identity; no pair-specific named variant |
| C2 | `Chen switching principle Buchstab identity applied to both n and n+2 least prime factor of the partner` | WebSearch | → Chen 1973, Wu 2004, Tao 254A Supplement 5, Lichtman |
| C3 | `"vector sieve" Bruedern Fouvry two sequences simultaneously sifted pairs` | WebSearch | the vector sieve exists and is multidimensional; it is an inequality apparatus, not this identity |
| C4 | `Buchstab identity k-tuples decomposition by least prime factor of one component partner condition` | WebSearch | → Lewulis, *Variants of the Selberg sieve, and almost prime k-tuples*, QJM 74 (2023) 327 — counts prime factors of the **product** of the forms, not of each component; no twin comparison |
| C5 | `A note on variants of Buchstab's identity` (arXiv:2504.07974, Li 2025) — abstract read | WebFetch | "variants of Buchstab's identity on sieve functions, refining the previous work on new iteration rules of Brady"; the abstract does not indicate a two-component variant. **Not read at page level** (§8) |
| C6 | Ford 2023 §3.2.1 Lemma 3.8 | page image | the general-sieve-problem statement quoted above; settles it |

---

## 4. What this changes about the identity note's own claims

### 4.1 §4's wall statement gets a published number, and it is worse than the note implies

The note says: "No sieve upper bound delivers a constant sharp to
`1 + O(1/ln²)`". True, and now quantifiable. The best published constant in the
adjacent (easier, dimension-1-after-switching) problem is **Lichtman 2025's
`π₂(x) ≲ 3.299 56 𝔖(x)`** — a factor `3.3` off, after 106 years and thirteen
recorded improvements (Table 1, §1.2), the last of which moved it by 2.94%. The
certificate needs a relative precision of `~1/ln²h` on a *short-interval*
rough-pair count. The gap is not "sharper than available", it is three-and-a-bit
orders of register away, and the published rate of progress on the constant is
about 3% per improvement. **This strengthens §4's reading rather than weakening
it, and it should be cited with the number rather than as a qualitative claim.**

### 4.2 The certificate has a clean classical restatement

From `T/C = κδ_P²`, `X/C = κ(δ_R − δ_P)²`, `S(A,y)/C = κδ_R²`:

> `X(y) < T` ⟺ `δ_R < 2δ_P` ⟺ **`S(A, y) < 4T` in the same window**,

i.e. "the dimension-2 sifting function at level `y` is less than four times the
twin count". Under the product heuristic `S(A, x^{1/u})/T = (u ω(u))²`, which
equals `4` at `u = u*`. This is derived here, is main-term only, and inherits
§2.3's product-form hypothesis. It is offered because it puts the certificate in
the vocabulary a sieve theorist would use — and because in that vocabulary the
statement is visibly hard: it is a two-sided control on `S(A,y)` at short-
interval scale.

### 4.3 The identity note's §5 can be closed

§5 says the search is OWED and no novelty is claimed. The search has now run.
Proposed replacement content is §6 below. **The correct outcome to record is
"the object is classical, the comparison was not found, the identity is
bookkeeping" — not "novel".**

---

## 5. Artifacts read at page image this session

Fetched to the session scratchpad, extracted with `pdftotext -layout`, and read
in extraction; every quote above comes from these files, not from search
snippets.

| artifact | source | sha256 |
|---|---|---|
| Ford, *Sieve methods lecture notes, Spring 2023*, ~60 pp. | `ford126.web.illinois.edu/sieve2023.pdf` | `a6e8462f1e76606614e5c2891b419515be408d5f11f0b82915f5c24e05c00e06` |
| Lichtman, *A modification of the linear sieve, and the count of twin primes*, Algebra & Number Theory **19**:1 (2025) 1–36, doi 10.2140/ant.2025.19.1 | `msp.org/ant/2025/19-1/ant-v19-n1-p01-p.pdf` | `1b64fc36e8a73993ae221505b8c87e27f6c9d01679efc15ee4b8aedf0a85327c` |

Abstracts read (not page images): arXiv:2102.12297 (Evans), arXiv:2405.05727
(Li), arXiv:2508.06463 (Gafni–Tao), arXiv:2504.07974 (Li), arXiv:2203.09432
(Lewulis), arXiv:2109.02851 (Lichtman preprint). zbMATH records read as JSON:
3695314 (Iwaniec–van de Lune–te Riele 1980, full bibliographic), 3700961,
1310358.

---

## 6. Proposed PRIOR-ART.md additions (NOT applied)

Proposed for the maintainer of `research/PRIOR-ART.md`. All four are prior art
we did not hold; none is a correction to an existing bullet.

1. **The twin sieve as the owner of the rough-pair census.** Ford's 2023 course
   notes §1.7.2 and §3.0.1, with the two quoted sentences: `S(A, √x+2)` counts
   the twin pairs (this is our "full-depth bijection"), and the `≫ x/log²x`
   almost-prime-pair conclusion (this is our `X`). The corpus already cites
   Ford's notes for `β₂ = 4.2665`; it does not cite them for the object.
2. **Lichtman, Algebra & Number Theory 19:1 (2025) 1–36**, Thm 1.2
   `π₂(x) ≲ 3.299 56 𝔖(x)`, plus **Table 1's full chronology of
   `π₂(x)/𝔖(x)` upper bounds 1919–2025**. This is the number that quantifies
   the identity note's §4 wall, and the chronology is the rate-of-progress
   evidence. It also lands the current level-of-distribution record `x^{10/17}`
   for well-factorable linear-sieve weights, which is a live comparison for the
   `SEARCH-CONVENTIONS.md` §1 Lemma-V row (Maynard `x^{7/12}`, Lichtman
   `x^{66/107}` — the ANT paper's `10/17` should be reconciled with the row's
   current entry by whoever owns it; **flagged, not resolved here**).
3. **Evans, *Correlations of almost primes*, MPCPS (arXiv:2102.12297)** — the
   nearest published almost-prime **pair census**, `E₂ × E₂` at distance `h`,
   asymptotic for almost all `h` in `log^{19+ε}X ≤ H ≤ X^{1−ε}`. Read at page
   level 2026-08-27; journal version *Math. Proc. Camb. Phil. Soc.* **174**
   (2023), DOI 10.1017/S0305004122000251. It is the nearest proven instance of
   the product-plus-singular-series form and **not a test of our depth law**,
   because `h` is averaged and the smaller prime factor is `X^{o(1)}` in every
   theorem. Its value here is (i) that the form is proven somewhere, (ii) that
   its §1.1 states the parity obstruction for `E₂` counting even under EH,
   which is the first stratum of our `X(y)` above `u = 2`, and (iii) that its
   (1.2) names our κ: `2Π₂ = (45/32)·κ`.
4. **The rough-number-vs-prime-gap neighbourhood**: Gafni–Tao arXiv:2508.06463
   (Erdős #682, almost all prime gaps contain a rough number, exceptional set
   `O(X/log²X)`, conditionally `cX/log²X` with `c ∈ (2.7, 2.8)`), sitting beside
   the corpus's existing Fan–Pomerance and Weingartner bullets. Not our object,
   but it is the live front in the rough-number convention and the next sweep
   will surface it again.

Optional fifth, lower value: **Iwaniec–van de Lune–te Riele, Indag. Math. 42
(1980) 409–417** and **Iwaniec, *Sieving limits* (1981)** as the tradition that
extracts thresholds from Buchstab-type delay equations — the nearest *kind* of
object to §2's `u ω(u) = 2`, unread at page level.

---

## 7. Proposed SEARCH-CONVENTIONS.md rows (NOT applied)

Three §1 rows, and two §3 rows. Note the file's own warning: a row added to make
a claim pass is a suppression wearing a table's clothes. Each of these is
proposed because it is genuinely the wording the literature uses.

**§1 table:**

| object | our name | canonical | **OWNING convention — search THIS** | where it lives |
|---|---|---|---|---|
| pairs `(a, a+2)` both free of prime factors `≤ y` | `X(y)`, the rough-pair census, "both-composite rough pairs" | almost-prime pairs at distance 2 | **the twin-prime sieve problem of dimension 2**: `A = [1,x] ∩ Z`, `A_p = {n : p ∣ n(n+2)}`, `ρ(p) = 2`, and the sifting function `S(A, z)`. The house phrase "rough pair" reaches nothing | Ford, *Sieve methods*, Spring 2023 notes §1.7.2, §3.0.1; Halberstam–Richert Ch. 2 and Cor. 2.4.1 |
| the ratio of the `y`-rough density to the prime density | `δ_R(y)/δ_P` | — | **`u ω(u)`**, `u = log x / log y`, `ω` the Buchstab function; the crossing is the root of `u ω(u) = c`, and `2e^γ` is only its `u → ∞` form. Searching for the constant `2e^γ` returns the Rosser–Iwaniec `F₁(1)` and is a false positive every time | Buchstab; Ford §3.2.1; Wu 1990 Lemma 12 via Lichtman ANT 19:1 (2025) Lemma 6.1. The `u*` numerics in §2.2 above are a session script, not a citation; arXiv:2607.21883 (Weingartner, *Explicit bounds for Buchstab's function*) is a real identifier, confirmed by fetch 2026-08-28, and is on point for certifying `u*`, but it is read nowhere in this file, appears in no query row and in no §5 artifact row, so it belongs in §6 as a proposed PRIOR-ART entry with its fetch recorded before it enters a convention row |
| decomposing a sifted count by least prime factor with a condition on the partner | the capture identity, `floor_K = T − X(K)` | — | **Buchstab's identity for a general sieve problem** (`S(A,z) = S(A,w) − Σ_{w<p≤z} S(A_p, p−1)`); the partner condition sits inside `A_p` itself, and Chen's switching principle (Chen 1973), which switches the sifted set, is adjacent rather than the owner | Ford §3.2.1 Lemma 3.8; Wu, Acta Arith. 114 (2004) 215–273; Lichtman ANT 19:1 (2025) §6 |

**§3 "searches already run" rows:**

| question | answer | do not redo |
|---|---|---|
| Does anyone compare a rough-rough pair count against the twin count in the same interval? | **None found**, ten flips in three owning conventions, channels calibrated in-session (this file §1.3) | the negative carries weight for the *comparison*; the *object* is textbook and must never be searched as if it were ours |
| Is the crossing `u ω(u) = 2` / the exponent `1/(2e^γ)` in print? | **None found**, eight flips (this file §2.4). `2e^γ` is `F₁(1)` in Rosser–Iwaniec and is a guaranteed false positive | do not re-search the bare constant |
| Is the capture identity a named result? | **No verbatim carrier, and it does not need one**: it is Buchstab's identity for the dimension-2 twin sieve, with the partner condition already inside `A_p` (this file §3) | settled; claim no novelty |

---

## 8. NOT-REACHED

Recorded so the next wave spends budget on what is left, per
`SEARCH-CONVENTIONS.md` §3's discipline.

- **Halberstam–Richert, *Sieve Methods* (1974), Ch. 2 and Ch. 11** — not read at
  page level, on any channel, again. The twin example and Cor. 2.4.1 are cited
  through Ford and through FKMPT's bibliography. If §1's "the object is
  textbook" verdict is ever challenged, this is where the primary sits.
  Same for **Friedlander–Iwaniec, *Opera de Cribro*** (Ch. 6 is reachable
  through the corpus's existing Lemma 6.8 quote; the twin/pair chapters are
  not).
- **Evans arXiv:2102.12297 is read and this item is closed** (2026-08-27,
  `history/staging/lit-evans.md`; v3, 35 pp., sha256 `810b4ca6…`, pp. 1, 2, 3,
  7, 31, 35 checked at page image). Her main term does have the
  product-times-singular-series form, exactly and with no correction factor
  (Thm 3.2: `𝔖(h)X(Σ_{P<p≤P^{1+δ}}1/p)² + O(X/log^η X)`). **It is not a test of
  the §2.3 hypothesis and cannot become one**, for two independent reasons:
  `h` is averaged in every theorem and `h = 2` may sit in the exceptional set,
  and the smaller prime factor is `X^{o(1)}` throughout (`P = log^{17+ε}X` or
  `exp((loglog X)²)` in Thm 1.1; `p₁ ≤ exp((log X)^{1−ε(X)})` in Thm 1.3's own
  reduction (9.1)), so the theorems never reach `y = X^{Θ(1)}`. There is also
  no secondary term to harvest: `η = η(ε) > 0` is never bounded below, so the
  relative error `1/log^η X` does not resolve a `1/log X` correction. The
  residual stands: the dimension-2 correction function is still not computed
  anywhere (the last bullet below).
- **Li arXiv:2504.07974, *A note on variants of Buchstab's identity*, not read
  at page level.** Abstract only. It is the one paper whose title could carry a
  two-component variant; the abstract does not suggest one.
- **Iwaniec–van de Lune–te Riele 1980 and Iwaniec 1981 not read.** The
  threshold-from-delay-equation tradition. Low probability of carrying our
  equation, non-zero probability of carrying the method for solving it
  rigorously.
- **MathSciNet `mrlookup` not exercised this session.** The channel is
  calibrated per `SEARCH-CONVENTIONS.md` §5 and was not used. Every absence in
  §1.3 and §2.4 rests on WebSearch + zbMATH + OEIS only.
- **The census ladders are not embedded**, so no OEIS numeric flip search on
  `X(y)` or `CC` per anchor could be run (§1.3). Until a producer embeds them,
  no OEIS-absence claim about this family may be written anywhere.
- **The exact dimension-2 Buchstab-type correction for `S(A, x^{1/u})`** was not
  found computed anywhere and was not derived here. §2.3's product form remains
  a hypothesis validated at exactly one point (`u = 2`).
- **`0.280 438` is scratchpad-grade.** No embedded producer, no `qc` gate. If it
  is ever quoted outside this file it must first be re-derived inside one.

---

## Summary

**Owned:** the object. `X(y)` is the classical dimension-2 twin sifting function
`S(A, z)` with the prime-bearing pairs removed, and the identity note's
"full-depth bijection" is the sentence "`S(A, √x + 2)` counts the number of twin
prime pairs" in a first course. The decomposition step is Buchstab's identity in
its general-sieve-problem form, and the partner condition is already inside
`A_p = {n : p ∣ n(n+2)}`, with Chen's switching principle adjacent to it rather
than its owner. Nothing in §1 or §2 of `quadpoint-identity-01.md` is novel, and the
note was right to predict that.

**Ours-so-far:** the *comparison* `X(y) < T` in a fixed window used as a
certificate, and the crossing law that locates it. Ten flips in three owning
conventions found no published rough-pair-vs-twin comparison in any interval;
eight flips found no `u ω(u) = c` threshold statement and no occurrence of the
exponent. Both absences are recorded with their conventions and query lists, and
both are worth exactly what an absence is worth — the OEIS lesson in
`SEARCH-CONVENTIONS.md` says a clean negative in the right convention still only
narrows the search, and MathSciNet and the two sieve books stayed unreached.

**Uncalibrated:** the depth law's product form, which treats a dimension-2 sieve
problem with a dimension-1 correction squared, is validated at one point and
nowhere else; the exact Buchstab root `1/u* = 0.280 438` closes 6.6% of the
top-band residual and 1.6% of the bottom-band residual, so the finite-size
drift is still unmodelled;
and the wall in §4 now carries a published number — the best constant in the
adjacent problem is `3.2996` after 106 years, against a certificate that needs
`1 + O(1/ln²h)` on a short interval.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md` for the corpus rule.*
