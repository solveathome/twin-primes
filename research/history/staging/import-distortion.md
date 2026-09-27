# Foreign import, IMPORT-MAP row 8: the distortion method, priced on the window

<!-- ledger
id: Q-import-distortion
status: CLOSED
todo: none
question: Does the distortion method of covering systems speak at two classes per modulus, and what does it certify on the window?
verdict: It does speak at two classes, and the row's expected blocker was the wrong one: its economy sum 4/p^2 converges (sup 0.364545) where the union bound's sum 2/p dies at x = 13, but it charges in ambient length, its measures living on a CRT product so the certified window is at least a primorial and the only published bridge back to an interval is exponential in the number of progressions.
-->

**Date:** 2026-08-19. Pre-registration:
[import-distortion-prereg.md](import-distortion-prereg.md), committed `bf4b183`
before the producer existed. Producer:
[`research/import-distortion-01-ladder.js`](../../import-distortion-01-ladder.js),
2.3 s, output machine-embedded (`node research/qc/embed.js`). Score: 11 of 13
registered predictions confirmed, 1 refuted, 1 split, and both that moved were
errors in the pre-registration's own hand-arithmetic rather than in the method.

---

## 1. The headline, in four lines

1. **The deciding question has a clean answer, and it is the opposite of the one
   the row expected: the distortion method speaks at two classes per modulus.**
   BBMST's criterion carries no distinctness, no multiplicity and no
   minimum-modulus hypothesis. The one-vs-two-class wall is not this method's
   wall, and saying so in the covering-systems convention is the row's payoff.
2. **Its economy is `Σ 4/p²`, which converges (sup `0.364545`), where the union
   bound's `Σ 2/p` diverges and dies at `x = 13`.** This is the first import in
   the map to clear the Mertens wall that closed the covering economy.
3. **It charges for that in ambient length, and the charge is fatal.** The
   measures live on a CRT product; a window is a union of classes mod `∏p` only
   when it is at least that primorial; and the only published bridge from
   "does not cover `Z`" to "does not cover an interval" is exponential in the
   number of progressions. The cleanest true statement is
   `G₂(x#) ≤ 6·2^{2(π(x)−2)} + 6`, unconditional and constant-free, and
   superpolynomial. **And the small primes cannot be fed to the criterion at
   all** — `p = 2` and `p = 3` alone put the criterion's floor at `0.6944`, so
   the naive form over `2 ≤ p ≤ x` fails from `x = 17`; that is the structural
   content of every minimum-modulus hypothesis in this field.
4. **It certifies no `H` the exact ladders do not already dominate,** at any
   level from `x = 5` to `x = 79`, and its certified exponent is not an exponent:
   it grows like `2 ln 2 · x / ln²x`, reading `1155` at `x = 10⁵`.

**Verdict for the map row: CLOSED with mechanism, banking a WALL-ADDRESS, one
unconditional theorem that beats only the period bound, and two corrections to
the corpus's record.**

---

## 2. The engine, from the three theorem statements that carry the hypotheses

All read at source from the arXiv PDFs, not from abstracts and not from memory.

**BBMST, *On the Erdős covering problem: the density of the uncovered set*,
arXiv:1811.03547 = Invent. Math. 228 (2022) 377–414, Theorem 3.1**, verbatim:

> **Theorem 3.1.** *Let `A = {A_d : d ∈ D}` be a finite collection of arithmetic
> progressions, and let `δ_1, …, δ_n ∈ [0,1/2]`. If*
> `η := Σ_{i=1}^n min( M_i^{(1)}, M_i^{(2)}/(4δ_i(1−δ_i)) ) < 1`, *(9)*
> *then `A` does not cover the integers. Moreover, the uncovered set `R` has
> density at least*
> `P_0(R) ⩾ (1 − η) exp( −(2/(1−η)) Σ_{d∈D} ν(d)/d )`. *(10)*

with `M_i^{(1)} = E_{i−1}[α_i(x)]`, `M_i^{(2)} = E_{i−1}[α_i(x)²]`, `α_i(x)` the
fraction of the fibre over `Z/Q_{i−1}Z` covered by the progressions whose largest
prime factor is `p_i`, and `ν(d) = ∏_{p_j | d} 1/(1−δ_j)`.

**What it controls.** The `P_n`-measure of the uncovered set, through a sequence
of measures `P_0, …, P_n` that are rebuilt prime by prime: on each fibre the
covered part's measure is zeroed when its proportion `α` is at most `δ`, and
merely capped by a factor `1/(1−δ)` otherwise. The whole method is the one line
`max{a − b, 0} ⩽ a²/4b` applied to `α` and `δ` (BBMST survey, arXiv:2211.01417,
proof of Lemma 3.2). A second moment goes in; non-covering comes out.

**Under what hypotheses on the moduli and classes: none.** Theorem 3.1's
hypotheses are exactly *a finite collection of arithmetic progressions*,
`δ_i ∈ [0,1/2]`, and `η < 1`. There is no distinctness hypothesis, no
multiplicity hypothesis, no squarefree hypothesis and no minimum-modulus
hypothesis. **Distinctness lives one level down**, in Theorem 3.2, the moment
bound, whose proof recovers a progression from its set of fixed coordinates and
therefore needs "no two parallel" (survey Lemma 4.3: *"the sets `F_i` determine
the hyperplanes `A_i ∈ A_k` uniquely, since no two of the hyperplanes of `A` are
parallel"*).

**KKL confirm the split in print.** Klein–Koukoulopoulos–Lemieux, arXiv:2212.01299v2
= Int. J. Number Theory 20 (2024) 471–479, work with covering systems of
multiplicity `s` (their Definition 2.2: `m(A) := max_d #{j : d_j = d}`), quote
Theorem 3.1 **unchanged** as their Lemma 3.1 — captioned "Theorem 3.1 in [4]" —
and write, verbatim:

> "Doing so is the context of Theorem 3.2 in [4], but this result is only valid
> for systems of congruences of multiplicity 1. We thus need to generalize it.
> This is rather straightforward, and we describe how to do it below."

Their Lemma 3.3 is the generalisation, and the cost of multiplicity is exactly
`s^k` in the `k`-th moment: `M^{(1)}_j ⩽ s Σ_{d ⩾ d_1, P⁺(d)=p_j} 1/d` and
`M^{(2)}_j ≪ s²(log p)⁶/p²`. The mechanism is one sentence of their proof:
*"there are at most `s^k` choices for `i_1, …, i_k` with `d_{i_ℓ} = g_ℓ p^{r_ℓ}`
(because we have assumed that `A` has multiplicity `s`)"* — i.e. the
non-parallel uniqueness of BBMST's Lemma 4.3 becomes an `s`-to-one count.

**The k-class answer, exactly.** KKL Theorem 3, verbatim: *"Let `A` be a covering
system of multiplicity `s`. Then there exists an absolute constant `c > 0` such
that its smallest modulus is `⩽ exp(c log²(s+1)/log log(s+2))`."* So:

- yes, the method is generalised to `k` classes per modulus, and `s = 2` is
  inside the statement;
- `c` is **unspecified**, so no numeric consequence at `s = 2` exists;
- the conclusion is about the **smallest modulus of a covering of `Z`**, not
  about an interval, at every `s`. Our system has smallest modulus 5, and no
  contradiction can be extracted from an unspecified constant.

---

## 3. The mapping, and the cleanest true statement with its constant

Our object: the adversary picks two residue classes mod `p` for every prime
`5 ≤ p ≤ x` and tries to cover a window of length `H`.

**Step 1 — the moments are exact, not bounded.** Every modulus is a prime, so the
fibre at `p` is `Z/pZ` and the two chosen classes occupy exactly two of its
points. Hence `α_p(x) = 2/p` **identically**, `M^{(1)} = 2/p`, `M^{(2)} = 4/p²`,
and no multiplicity-corrected moment lemma is needed at all: KKL's `s²` is the
general answer to a question that has an exact answer here.

**Step 2 — the criterion, with `δ_j = 1/2`.** `4δ(1−δ) = 1`, so

> `η(x) = Σ_{5≤p≤x} min(2/p, 4/p²) = Σ_{5≤p≤x} 4/p² < 4·(P(2) − 1/4 − 1/9) = 0.364545`

for every `x`, where `P(2) = Σ_p p^{−2}`. [VERIFIED — direct sum to `p ≤ 10⁷`
gives `0.364545212` with tail `< 4·10⁻⁷`, agreeing with the closed form to
`2.3·10⁻⁸`.] The union bound's `Σ_{5≤p≤x} 2/p` reads `0.867532` at `x = 11` and
`1.021379` at `x = 13` and diverges. **So the distortion criterion holds at every
level, with a margin that never degrades, exactly where the covering economy
died.**

**Step 3 — the bridge, which is the only one in print.** Crittenden–Vanden
Eynden, quoted verbatim inside KKL §1: *"if a set of `n` arithmetic progressions
does not cover `Z`, then it does not cover the interval `{1, 2, …, 2ⁿ}`"*. It
counts **progressions**, not distinct moduli, so multiplicity 2 is free here too.

**Step 4 — and the small primes must be removed first, which is not a detail.**
Since `δ_i ∈ [0, 1/2]`, the factor `4δ(1−δ)` is at most 1, so the smallest a term
of `η` can be made is `min(M¹, M²) = min(κ/p, κ²/p²)`. At `p = 2` the two classes
collapse (`0 ≡ −2 mod 2`), giving `κ = 1` and a floor of `1/4`; at `p = 3` two
classes give a floor of `4/9`. So on the full system `2 ≤ p ≤ x` the criterion's
floor is `0.6944` **before a single scour prime is added**, and the running floor
reads `0.992804` at `x = 13` and `1.006644` at `x = 17`. **The naive full-system
application is unavailable from `x = 17` on.** [VERIFIED] This is the structural
fact that every minimum-modulus hypothesis in this literature encodes: the method
has no purchase on small moduli, and Hough's `10¹⁶`, BBMST's `616000` and
Cummings–Filaseta–Trifonov's `118` are that fact wearing a number.

The repair is the corpus's own convention. Every survivor of the twin sieve is
`≡ 5 mod 6`, so writing `r = 6k + 5` turns the `p = 2` and `p = 3` conditions into
the change of variable itself and leaves exactly two classes mod `p` in `k` for
each `5 ≤ p ≤ x`. A gap `G` in `r` is a covered run of `G/6 − 1` in `k`.

**The statement.**

> **Theorem (distortion + CVE), unconditional and constant-free.** For every
> `x ≥ 5` and every choice of two residue classes mod `p` for each prime
> `5 ≤ p ≤ x`, the resulting `2(π(x) − 2)` progressions do not cover any
> `2^{2(π(x)−2)}` consecutive integers. After the `5 mod 6` comb this gives
> **`G₂(x#) ≤ 6·2^{2(π(x)−2)} + 6`.**

[PROVEN, by composition of two published theorems; the only steps of ours are the
exact evaluation `α_p = 2/p` and the comb, each a one-line count.]

---

## 4. The experiment: what it certifies against the exact instruments

Inputs cited and not recomputed (STANDING COMPUTE RULE): the `G₂` ladder from the
embedded block of `research/attack-0c0e-02-level-selection.js` (ours to `x = 43`,
OEIS A144311 read through `G₂ = a(n) + 1` above); the exact Shearer threshold
`H*(x)` from the embedded PART C block of `research/import-shearer-01-region.js`;
`β₂ = 4.26645028414864191641` from `research/dhr-verification.md` row 1a.

| `x` | `6·2^{n_nat}+6` | `G₂(x#)` | ratio | `2^{n_nat}` | `H*(x)` | ratio |
|---|---|---|---|---|---|---|
| 13 | 1 542 | 66 | 23× | 256 | 35 | 7.3× |
| 19 | 24 582 | 150 | 164× | 4 096 | 65 | 63× |
| 29 | 393 222 | 258 | 1.5e3× | 65 536 | 115 | 5.7e2× |
| 43 | 1.007e8 | 618 | 1.6e5× | 1.68e7 | 209 | 8.0e4× |
| 61 | 2.577e10 | 1 080 | 2.4e7× | 4.29e9 | 319 | 1.4e7× |
| 79 | 6.597e12 | 1 710 | 3.9e9× | 1.10e12 | 481 | 2.3e9× |

**Distortion certifies no `H` at any `x` that the exact ladders do not already
dominate**, and the loss ratio grows monotonically over the ladder from 2.5× at
`x = 5` to `3.86·10⁹×` at `x = 79`. [VERIFIED, all 20 levels in the embedded
output.]

**The exponent, which is the question that matters.**

| `x` | 13 | 19 | 29 | 31 | 37 | 43 | 61 | 79 | 10⁵ |
|---|---|---|---|---|---|---|---|---|---|
| `θ_G₂ = ln(6·2^{n_nat})/ln x` | 2.86 | 3.43 | 3.83 | 4.16 | 4.34 | 4.90 | 5.83 | 6.76 | ~1155 |
| `θ_Shearer = ln H*/ln x` | 1.39 | 1.42 | 1.41 | 1.42 | 1.40 | 1.42 | 1.40 | 1.41 | — |

`θ_G₂` grows like `2 ln 2 · x / ln²x`. It is **not an exponent**, so the method
does not compete in the polynomial regime at all and cannot address the
`4.2665 → 2` gap even in principle. It crosses the constant-free line `x^{β₂}` at
`x = 37` and never returns. [VERIFIED to `x = 10⁵`.] Reading the sieve bound
constant-free is a fiction — `G₂ ≪ (log p#)^{β₂+ε}` carries an unspecified
implied constant — so the `x ≤ 31` half of that crossing is a curiosity, not a
claim.

**The one thing it beats: the period.** `G₂ < x#` is the corpus's only bound that
needs no sieve hypothesis. `6·2^{2(π(x)−2)}` drops below `x#` at `x = 5` and stays
below, by `e^{40.73}` already at `x = 79`, and asymptotically by
`e^{x − 1.386 x/ln x}` since `2 ln 2 · π(x) ∼ 1.386 x/ln x` while `ln x# = θ(x) ∼ x`.
[VERIFIED to `x = 10⁵`.] That is the entire positive content of the row.

**The density half is dominated, and points the wrong way.** Optimising `δ`, the
bound (10) gives uncovered density `≥ 7.0·10⁻³` at `x = 13` and `3.5·10⁻⁹` at
`x = 10⁵`, against the exact `∏(1 − 2/p) =` `2.97·10⁻¹` and `1.88·10⁻²`: a
domination widening from 42× to `5.3·10⁶×`, because with prime moduli the
uncovered set **is** a product and needs no method. The direction is fatal
independently of the size: a density lower bound controls the *average* gap, and
`G₂` is the *maximum* gap. (The multiset form of (10) is [INFERRED,
mechanism-checked]: the only step of BBMST's Lemma 3.5 that touches `D` is a
union bound over the progressions revealed at stage `j`, which is indifferent to
repeated moduli.)

---

## 5. The wall address, which is what this row is graded on

The hybrid is the only route that could put distortion inside a window:
discipline the primes `5 ≤ p ≤ y` with the method, and union-bound the primes in
`(y, x]` against the surviving measure. Its arithmetic is
`2 Σ_{y<p≤x} 1/p < 1 − η`, i.e. `2 ln(ln x / ln y) < 1 − η`, i.e. `y ≥ x^c` with
`c = e^{−(1−η)/2} = 0.727801`, and then the window must exceed
`exp(θ(y)) = exp(x^{0.7278+o(1)})`: `10^{8.35}` at `x = 79`, `10^{1858}` at
`x = 10⁵`. **The seventh independent arrival at the Mertens wall**
(`sift-limit-attack.md` §7 counts six). The step is not carried out, because it
needs the untreated classes to equidistribute under the *distorted* measure,
which is unverified; what is computed is the arithmetic it would have to satisfy,
and that is already superpolynomial.

**The exchange rate, stated in the owning convention.**

> The union bound needs no ambient, is linear in the window, and pays a divergent
> `Σ 2/p`. The distortion method pays a convergent `Σ 4/p²` and buys it with
> ambient length: every prime it disciplines must have its modulus fully resolved
> inside the ambient, so the certified window is at least the primorial of those
> primes, and the only published bridge back to an interval is exponential in the
> number of progressions. The two economies price the same object at opposite
> ends and neither is polynomial in `x`. The number of classes per modulus enters
> the union bound as `κ/p` and the distortion criterion as `κ²/p²`, a factor 4 in
> a sum whose supremum at `κ = 1` is `0.0911`. **A method that prices classes
> quadratically and windows exponentially is not the method that decides a
> polynomial-window question, and the one-vs-two-class distinction is not what
> stops it.**

That last sentence is the deliverable. Every previous arrival at this field was
recorded as "the two-class case is the obstruction". In the distortion
convention it is not: two classes cost a factor 4 in a convergent sum, and the
obstruction is the ambient.

---

## 6. Two corrections to the corpus's record (report only, live docs untouched)

**(a) `covering-dive.md` §6 bullet 6 is wrong at source, and the survey says so
in one sentence.** The bullet reads *"BBMST's own Theorem 2.1 remark shows
`|S_k| ≍ k` (prime-sized alphabets) is exactly the critical growth where their
covering obstruction fails — the primes sit on the knife's edge of the distortion
method."* Theorem 2.1's hypothesis is `lim inf |S_k|/k > 3`, and with
`S_k = {1, …, p_k}` the ratio is `p_k/k ∼ log k`, which **diverges**. The survey
states the direction explicitly, verbatim: *"Note that `p_k ∼ k log k`, whereas
in Theorem 2.1 we allow the size of the sets `S_k` to grow only linearly. We
showed in [2] that Theorem 2.1 is close to best possible, since there exists a
sequence with `|S_k| ∼ k` for which the conclusion of the theorem fails."* The
`|S_k| ∼ k` counterexample is a sequence growing **more slowly** than the primes.
The primes clear the hypothesis with room to spare; they are not on any edge. The
same bullet's scale-mismatch conclusion survives — it just rests on the ambient
being a CRT product, not on a knife's edge that does not exist.

**(b) The distortion method's economy should be recorded as `Σ 4/p²`, not as a
degraded `e^{−4C}` density.** `IMPORT-MAP.md` §4 row 8 prices the row through
Theorem 1.1, whose `C = Σ µ(d_i)/d_i` diverges like `2 lnln x` and degrades the
density to about `(log x)^{−8}`. That reading is correct for Theorem 1.1 and
irrelevant for the row: Theorem 1.1 is the *packaged* corollary, and the
criterion under it (Theorem 3.1) prices second moments, which converge on prime
moduli. The row's real obstruction is the ambient, not the divergence of `C`.

---

## 7. Sourcing ledger

| source | how read | what was taken |
|---|---|---|
| BBMST, arXiv:2211.01417v1, *Erdős covering systems* (8 pp. expository) | full PDF text | Definition 3.1 of the measures, Lemma 3.2, Lemmas 4.1–4.3, Theorem 2.1 and its proof, Remark 5.1 |
| BBMST, arXiv:1811.03547 = Invent. Math. 228 (2022) 377–414 | PDF, §§1–3 and §8 | Theorem 1.1, Theorem 3.1 verbatim (both halves), Theorem 3.2, Lemma 3.5's proof, Theorem 8.1 |
| KKL, arXiv:2212.01299v2 = IJNT 20 (2024) 471–479 | full PDF text | Theorem 1, Theorem 3 verbatim, Definition 2.2, Lemma 3.1, Lemma 3.3 and its proof, the CVE quotation |
| Crittenden–Vanden Eynden | quoted inside KKL §1, verbatim | the `2ⁿ` interval-to-`Z` bridge |

The corpus's own prior reading of this field ([covering-dive.md](../../covering-dive.md)
§3.2–3.4) was checked against all four and is correct except for the knife's-edge
bullet corrected in §6(a). Its verdict *"no covering-systems result bounds the
length of a finite interval coverable by two classes per prime at polynomial
scale"* stands after this pass. [ABSENT — searched in the covering-systems
convention, the owning convention for minimum-modulus and uncovered-density
results, tabled in `research/SEARCH-CONVENTIONS.md` §3.]

---

## 8. Proposed IMPORT-MAP row 8 update

Report only; no live-doc edit was made by this pass. Proposed replacement row:

> | 8 | Erdős covering systems, the distortion method | BBMST, *Invent. Math.* 228 (2022), **Thm 3.1** (the criterion, not Thm 1.1); KKL, *IJNT* 20 (2024) Thm 3 | the adversary's free translate `a_p` per prime | the ambient, not the class count | STRONG-ANALOGY | CLEAN | WALL-ADDRESS **[LANDED, closed]** | 4 h | **RAN 2026-08-19**, `history/staging/import-distortion.md`: the engine speaks at two classes (Thm 3.1 has no distinctness hypothesis; KKL pay `s^k` in the `k`-th moment), the economy `Σ4/p² < 0.3646` clears the Mertens wall, and it dies on the ambient: `G₂(x#) ≤ 6·2^{2(π(x)−2)}+6` is the whole yield, beating only the period bound |

And the paragraph's replacement claim, in one line: *the row was priced on the
two-class hypothesis being the blocker; it is not — two classes cost a factor 4
in a convergent sum, and what blocks is that the method's measures live on a CRT
product, so its certified window is at least a primorial and the only published
bridge back to an interval is exponential in the number of progressions.*

---

## 9. Files touched

- `research/import-distortion-01-ladder.js` — new, output embedded, 18 self-tests pass.
- `research/history/staging/import-distortion-prereg.md` — new, committed alone before the producer.
- `research/history/staging/import-distortion.md` — this file.
