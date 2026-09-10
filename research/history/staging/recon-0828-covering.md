# Recon 0828: the covering, logic and computation literature against G₂

<!-- ledger
id: Q-recon-0828-covering
status: ANSWERED
todo: 0
question: Does the interval-covering, automated-proof or extremal-combinatorics literature hold a method that bounds the length of an interval covered by two residue classes per prime, or that turns the exact G₂ ladder into a statement at all x?
verdict: No route. Fifteen angles examined, fourteen dead on arrival or already closed here; the best interval-covering bound in print is Crittenden-Vanden Eynden's own Lemma 2, which reads 1.02e12 against G₂(79#) = 1710 and is 8181x weaker than the corpus's own 4.2665 sieve bound at the same level; the one survivor, transplanting Costello-Watts's recurrent certificate to two classes, is a computation that certifies finitely many levels and whose analytic half is Erdős #970 at one class.
-->

*Staging note, HELD. Nothing here has had an adversarial pass. This note edits
no other file; the corrections it owes to `covering-dive.md` §3.4,
`SEARCH-CONVENTIONS.md` §3 and `TODO.md` item 0's `Ledger:` line are listed in
§5 and are NOT applied.*

---

## 0. The ask, and the bottom line first

Chris asked for angles that lower Z₂ and G₂. This note covers one half of that
search: interval covering by residue classes, automated or computer-assisted
proof of all-x statements from finite data, the combinatorial side of the
k-tuple literature, and the extremal combinatorics of the two-class kill
structure.

**Nothing found moves the exponent, and one angle survives as a producer.**
Fifteen angles are graded below. Fourteen are dead on arrival, dead by a
mechanism already recorded in `REFUTED.md`, or dead by a number computed here.
The fifteenth (A4, transplanting Costello–Watts's recurrent certificate to two
classes) is a rigorous certificate ladder, not a proof: it certifies finitely
many levels, and making it asymptotic at one class would settle Erdős problem
#970 up to a log.

**Three things that are not routes and are worth having.** The covering
literature's best inequality at this corpus's exact hypotheses is now located
and priced (§2). The free-shape two-class relaxation that A4 would have to solve
turns out to be a published sequence with a known ladder, so A4's loss is
measured at a factor 1.34 to 2.27 rather than guessed (§3 A4). And the
exponent-2 target itself is in print, as Ziller–Morack's Conjecture 6, on the
strictly larger object `h₂ ≥ G₂`, with the implication to the twin prime
conjecture proven there, which is a novelty calibration this corpus should
carry (§5 item 8).

**The number that settles the covering side.** The best interval-covering bound
in print, translated into this corpus's convention, is
`G₂(79#) ≤ 1.021 × 10¹²` against a true value of `1710`. The corpus's own
`x^4.26645` sieve bound reads `1.248 × 10⁸` at the same level. The covering
literature is **8181×** behind the instrument this programme already has, the
gap widens at every level of the ladder, and its effective exponent in `x`
climbs `3.23 → 6.33` over `x = 5 … 79` while the sieve's stays fixed at 4.2665.
That is the whole covering side in one line, and §2 carries the table.

---

## 1. Channels, calibrated before any negative was written

Per `SEARCH-CONVENTIONS.md` §2, each channel carries a known positive from the
same session.

| channel | calibration | state |
|---|---|---|
| OpenAlex | `/works/W129012938` returns Iwaniec, *ON THE PROBLEM OF JACOBSTHAL*, 1978. Conjunctive filter re-verified: `filter=title.search:covering system,publication_year:2022` returns 40 and the API echoes its own parse as `title has (covering system) and year is (2022)`, so the comma is an AND | LIVE all session |
| zbMATH | `ti:"Jacobsthal" & ti:"function"` returns 16 records including Iwaniec's tradition, Hagedorn 2009, Costello–Watts 2015, Ziller–Morack 2017, Kalmynin–Konyagin 2024 and both withdrawn Costello–Watts items | LIVE all session. `ti:"sieving system"` returns HTTP 404, which on this API is **zero results**, not a broken channel |
| arXiv export API | `abs:"Jacobsthal function"` returns **15** entries, matching the 15–17 recorded in `covering-dive.md` §2.2 | **DIED MID-SESSION.** The same calibration query returned 0 on ten consecutive probes over roughly three minutes, about ninety minutes in. Every arXiv negative taken after that point is void and none is recorded below |
| Semantic Scholar | first probe returned HTTP 429 | NEVER REACHED |
| WebSearch / WebFetch | live throughout | `link.springer.com` answers 303 to an identity provider, so the Acta Hungarica text of BBMST 2020 was never opened; its content here is SECONDARY |
| OEIS | `?fmt=text` on `id:A144311` returns the entry, and `id:A288815`, `id:A072753` likewise | LIVE. WebFetch answers 403 on OEIS and on the AMS journal pages; `curl` with a browser user-agent answers 200 on both, so those 403s are the fetcher and not the source, per the campaign rule |

**The arXiv death is corroborated.** Two delegated sweeps run in parallel hit the
same failure independently, and one of them names the detection: the API answers
**HTTP 429 with an empty body**, which parses exactly like a zero-result page,
and the tell is the missing `arXiv Query:` echo line in the feed. One of the two
sweeps recorded four false zeros before catching it and discarded them. **Any
arXiv zero taken on 2026-08-28 without a same-minute calibration is void.**

**Reading grade for the delegated sweeps.** Two parallel sweeps covered the
k-tuple side (A10–A12) and the extremal-combinatorics side (A13–A15). Their
readings are one delegated reader each and were **not** re-read here except
where §3 says otherwise; three of their citations were spot-checked at source
and one was wrong (§5 item 6).

**A gotcha worth carrying into `SEARCH-CONVENTIONS.md`.** On the arXiv API a
space *inside* a quoted phrase must be encoded `+`, not `%20`.
`search_query=abs:%22Jacobsthal%20function%22` returns **zero** and
`search_query=abs:%22Jacobsthal+function%22` returns **fifteen**, same second,
same channel. A `%20` negative on that API is a silent false zero and looks
exactly like a clean one.

---

## 2. The covering side, settled by arithmetic

### 2a. What is actually in print, at the hypotheses this corpus needs

`covering-dive.md` §3.4 records Crittenden–Vanden Eynden's theorem (any `n`
arithmetic progressions covering `{1,…,2ⁿ}` cover all of `ℤ`) and records the
targeted negative: no covering-systems result bounds a finite interval coverable
by two classes per prime at polynomial scale. **The theorem half is right and
the negative is too coarse.** The CVE paper's own **Lemma 2** is a bound at
exactly this corpus's hypotheses, and it is not recorded anywhere here.

R. B. Crittenden and C. L. Vanden Eynden, *Any n arithmetic progressions
covering the first 2ⁿ integers cover all integers*, **Proc. Amer. Math. Soc. 24
(1970) 475–481**. [SOURCED, verbatim, at the page image; AMS free PDF,
sha256 `b40f684030dabc11764c7464d634bb02a9adab17ec9980eff0dd69416f256111`.]

> **Lemma 2.** Suppose that `S₁, S₂, …, S_t` are sets of integers such that `S_i`
> consists exactly of `k_i` residue classes modulo `b_i`, `i = 1, 2, …, t`, and
> that `(b_i, b_j) = 1` if `i ≠ j`. Suppose `n` is a positive integer, and let
> `N` be the number of integers `x`, `1 ≤ x ≤ 2ⁿ`, such that `x` is in none of
> the `S`'s. Then if `1 ≤ s ≤ t`, we have
>
> `N > 1 + 2ⁿ (1 − Σ_{i=1}^{s} k_i/b_i) ∏_{i=s+1}^{t} (1 − k_i/b_i) − (1 + Σ_{i=1}^{s} k_i) ∏_{i=s+1}^{t} (1 + k_i)`

Read the hypotheses. `k_i` residue classes per modulus, **any** `k_i`, moduli
**pairwise coprime**. That is the two-class system at `k_i = 2`, `b_i = p_i`,
verbatim, with no distinctness clause to pay and no CRT ambient to escape. The
proof (pp. 477–478) is a truncated inclusion–exclusion keeping every term with
at most one subscript `≤ s`, with the error bounded by `∏(1 + k_i)` through the
Chinese remainder theorem, and `2ⁿ` enters only as the interval length, so the
inequality holds for any `L`.

Two further things in the same paper correct a natural objection. **Lemma 1**
(p. 476) reduces any counterexample to one whose moduli are all **prime** (B)
and where a prime `p` used `k` times satisfies `2k < p` (C). So the exponential
threshold is not an artifact of a doubling chain of prime-power moduli that
coprime prime moduli cannot realise: CVE's own minimal counterexample lives in
the prime-modulus, bounded-multiplicity normal form, and two classes mod every
`p ≥ 5` sits inside it. The hope that restricting to prime moduli should buy a
much smaller interval threshold is not supported by the source that owns the
threshold.

### 2b. The translation, computed

Take `k_i = 2` for odd `p ≤ x` and `k_i = 1` for `p = 2` (the classes `{0,−2}`
coincide mod 2), minimise the resulting threshold over `s`, and compare against
the exact ladder `A144311 + 1` (`research/a144311-full-ladder.js`), against the
CVE theorem's own `2ⁿ` with `n = 1 + 2(π(x) − 1)`, and against `x^4.26645`.

| x | π(x) | G₂(x#) | CVE Lemma 2 | best s | CVE theorem 2ⁿ | x^4.26645 | eff. exponent of Lemma 2 |
|---|---|---|---|---|---|---|---|
| 5 | 3 | 12 | 1.800e+02 | 0 | 3.200e+01 | 9.597e+02 | 3.227 |
| 11 | 5 | 42 | 2.772e+03 | 0 | 5.120e+02 | 2.774e+04 | 3.306 |
| 17 | 7 | 108 | 3.342e+04 | 0 | 8.192e+03 | 1.777e+05 | 3.677 |
| 23 | 9 | 204 | 3.681e+05 | 0 | 1.311e+05 | 6.453e+05 | 4.087 |
| 31 | 11 | 348 | 3.804e+06 | 0 | 2.097e+06 | 2.306e+06 | 4.412 |
| 43 | 14 | 618 | 1.197e+08 | 0 | 1.342e+08 | 9.314e+06 | 4.945 |
| 53 | 16 | 870 | 1.169e+09 | 0 | 2.147e+09 | 2.273e+07 | 5.259 |
| 67 | 19 | 1284 | 3.483e+10 | 0 | 1.374e+11 | 6.178e+07 | 5.773 |
| 79 | 22 | 1710 | 1.021e+12 | 0 | 8.796e+12 | 1.248e+08 | 6.328 |

Three readings, and each is a closure.

1. **The optimiser picks `s = 0` at every level of the ladder.** The union-bound
   head that Lemma 2 offers is worth nothing at any `x` this corpus can check,
   because `Σ 2/p` crosses 1 immediately. That is the Mertens wall arriving
   inside a 1970 lemma, and it is the same wall six independent routes reach in
   `sift-limit-attack.md` §7 and the local-lemma family reaches as an identity.
2. **The bound is exponential.** With `s = 0` the threshold is
   `∏_{p ≤ x}(1 + k_p) / ∏_{p ≤ x}(1 − k_p/p) ≍ 3^{π(x)} · ln²x`, so it grows
   like `exp(1.0986 · x/ln x)` up to polylog, and its effective exponent in `x`
   climbs `3.227 → 6.328` across the ladder rather than converging.
3. **It is a depth-1 Bonferroni truncation, and this corpus has already run the
   family at optimal depth and closed it.** Deepening the truncation is Brun's
   pure sieve, whose measured `β_pure` reads `2.80` at `x = 13`, beats 4.2665
   for `x ≤ 227`, loses from `x = 229` and diverges like `7.182 lnln x`
   (`sift-limit-attack.md` §7, `history/staging/attack-hybrid-bound.md`,
   `REFUTED.md` row "the covering economy asymptotically, and the hybrid").
   CVE Lemma 2 is the weak end of a family this programme has already priced,
   and the exact-head repair of that family reaches only `x₀ = O(ln x)`. **No
   member of this family can pass 4.2665 asymptotically, because at optimal
   depth the family IS the sieve and the `κ = 2` sifting limit is 4.2665,
   unimproved since Diamond–Halberstam 2008** (`SEARCH-CONVENTIONS.md` §4).
   That last sentence is INFERRED here, not published.

**Best interval-covering bound in print, stated once.**
`G₂(x#) ≤ min_s [(1 + Σ_{i≤s} k_i) ∏_{i>s}(1 + k_i)] / [(1 − Σ_{i≤s} k_i/p_i) ∏_{i>s}(1 − k_i/p_i)]`,
which at `x = 79` reads `1.021 × 10¹²`. (Convention, and it is the conservative
one: the threshold solved for is `L·A·B ≥ num` rather than the lemma's exact
`> num − 1`, so the number quoted is at most one unit too large and the
inequality it certifies is valid.) It beats the row-8 distortion yield
`6·2^{2(π(x)−2)} + 6 = 6.597 × 10¹²` by 6.46× and the CVE theorem's
`2⁴³ = 8.796 × 10¹²` by 8.62×, and it is 5.97 × 10⁸ times the true value and
8181× weaker than this corpus's own `x^4.26645`.

### 2c. The forward citation graph of the theorem that owns the object

Walked on OpenAlex, both records of the 1970 paper (`W4239836556`, 8 citers;
`W2002396773`, 14 citers), every title read, union 17 distinct works. The
mathematical descendants are: Simpson, *On a conjecture of Crittenden and Vanden
Eynden concerning coverings by arithmetic progressions*, J. Austral. Math. Soc.
(1997) [SOURCED-BIB]; Sun Zhi-Wei, *Covering the integers by arithmetic
sequences* I and II (1995, 1996) and *On covering multiplicity*, Proc. AMS 127
(1999) 1293–1300 [SOURCED at abstract: `m`-covers of `ℤ`, subset identities, no
interval statement]; Balister–Bollobás–Morris–Sahasrabudhe–Tiba, *Covering
intervals with arithmetic progressions*, Acta Math. Hungar. **161** (2020)
197–200 [SECONDARY, Springer 303s to an IdP: a simpler proof of the same `2ⁿ`
theorem, not a new bound]; the BBMST survey (2024); and Wang, *On an Erdős-type
conjecture on `F_q[x]`* (2025), which transplants the CVE argument to polynomial
rings. **None bounds an interval at polynomial scale.** With the neighbourhood
complete and every title read, `covering-dive.md` §3.4's negative now carries
the weight of a closed citation graph rather than a keyword sweep, restricted to
polynomial scale as §2a requires.

---

## 3. The angles, one paragraph each

Grading follows `IMPORT-MAP.md` §0: what the theorem bounds in its own
convention, the translation to `G₂(x#)`, circularity, and why the closures
already recorded here do or do not kill it.

### A1. Crittenden–Vanden Eynden's theorem, as an interval-to-ℤ transfer

Theorem [SOURCED, verbatim, sha256 above]: any `n` arithmetic progressions
covering `{1,…,2ⁿ}` cover `ℤ`, and `2ⁿ` is best possible in general by the
example `x ≡ 2^{i−1} (mod 2^i)`. Translation: `2π(x) − 1` progressions with
pairwise-coprime prime moduli can never cover `ℤ`, since the uncovered density
`∏(1 − k_p/p)` is positive, so `G₂(x#) ≤ 2^{2π(x)−1}`, which at `x = 79` reads
`8.796 × 10¹²` against 1710. Exponent: NONE, the bound is exponential in
`x/ln x`. Circularity: CLEAN. Killed by: its own arithmetic, and it is the same
shape as `REFUTED.md`'s distortion row (`import-distortion.md`), which lands at
`6·2^{2(π(x)−2)} + 6`. **Do not re-propose interval-to-ℤ transfer.**

### A2. CVE Lemma 2, the hybrid inequality at `k` classes per coprime modulus

Covered in §2. Payoff realised: PUBLISHED-ANCHOR for the corpus's own hybrid,
plus a correction to `covering-dive.md` §3.4. Exponent: NONE. Circularity:
CLEAN. Killed by: `REFUTED.md`'s hybrid row, which prices the same family at
optimal Bonferroni depth and finds it diverging like `7.182 lnln x`. The one
thing gained is that the corpus can now cite a printed inequality with its exact
hypotheses instead of deriving the hybrid from scratch.

### A3. The Crittenden–Vanden Eynden conjecture at moduli ≥ k

Statement [SECONDARY, via the Simpson paper's abstract and the AMS/Cambridge
landing pages; the 1997 text was not opened]: if `n` progressions with all
moduli at least `k` cover `1 … k·2^{n−k+1}`, they cover `ℤ`; proved by CVE for
`k = 1, 2` and **open for `k ≥ 3`**, with Simpson 1997 giving necessary
conditions on a counterexample. Translation at `k = 3`: `G₂(x#) ≤ 3·2^{2π(x)−3}`,
a factor 2.67 better than A1 and identical in shape. Exponent: NONE, even if the
conjecture were proven. Circularity: CLEAN. Killed by: exponential scale, and by
CVE's own Lemma 1 (B)(C), which puts the prime-modulus bounded-multiplicity case
(this corpus's case) inside the normal form where the exponential threshold is not known to
be slack.

### A4. Costello–Watts's recurrent certificate, transplanted to two classes

**The one angle not dead on arrival, and it is a producer rather than a route.**
Fintan Costello and Paul Watts, *An upper bound on Jacobsthal's function*,
Math. Comp. **84** (2015) 1389–1399, MR3315513, preprint arXiv:1208.5342.
[SOURCED, verbatim, at the UCD repository copy of the accepted manuscript,
sha256 `514d333c8e11805ef7da9bf2494e54b8f67a8e90a981be8707cf181f7fde0779`.
**Citation hygiene: that copy carries its own pagination 1–11 and its own
theorem numbers, and the numbers below are that copy's, not the journal's
1389–1399.**]

Their Theorem 4.4 is an explicit recurrent **lower** bound on `π_min(m, k)`, the
least count of `P_k`-coprimes in `m` consecutive integers, and `π_low(m,k) > 0`
certifies `h(k) ≤ m`. Run as a linear search in `m`, it yields
`h(k) ≤ 0.27749612254 k² log k` for `50 ≤ k ≤ 10000`. That is worth stating
against what else exists: their §1 records the only explicit all-`k` bounds in
print as Kanold's `h(k) ≤ 2^k` and Stevens's `h(k) ≤ 2k^{2+2e log k}`, whose
exponent is unbounded, while Iwaniec's `h(k) ≪ (k log k)²` has an **unknown**
constant. **Costello–Watts is the only published machine that certifies a
Jacobsthal-type function below a quadratic at a named level**, and it does so by
computation.

The transplant, checked structurally here and not run: their Theorems 3.1, 3.2
and 3.3 carry to `I_p = {a_p, a_p − 2}` unchanged in shape, with the multiplicity
count `ω_k(a)` becoming `#{p ≤ x : p | a(a+2)}` and the composite step branching
four ways instead of one at each pair `p_i p_j`. **The step that does not carry
is Theorem 2.1**, the dilation that maps the sub-progression of multiples of `d`
back to a consecutive window: under `a = a₀ + t·p_i p_j` the pair spacing `−2`
becomes `−2·(p_i p_j)^{-1} mod q`, which depends on `q`, so the recursion closes
only on the larger family of *arbitrary* two classes per prime. That family's
optimum is `≥ G₂ − 1`, so the resulting certificate is still a valid upper bound
on `G₂`, just a looser one.

**And the loss is measured, not guessed, because that larger family has its own
published ladder.** It is **OEIS A072753**, "Maximum gap in two-stage
prime-sieves", whose `%F` line is the free-shape statement verbatim: `a(n) =
max{m : ∃ c(k), d(k), k = 3..n, ∀ i ∈ {1..m} ∃ j : i ≡ c(j) or d(j) mod p(j)}`,
no constraint on `d − c` [SOURCED at the OEIS entry today], carried to the
`2`-and-`3` wheel as **A288815** `= 6·A072753 + 6`, which is Ziller–Morack's
`h₂`. Against the exact `G₂` ladder `A144311 + 1`:

| n | p | G₂ | h₂ | h₂/G₂ |
|---|---|---|---|---|
| 5 | 11 | 42 | 66 | 1.571 |
| 6 | 13 | 66 | 150 | 2.273 |
| 12 | 37 | 528 | 708 | 1.341 |
| 16 | 53 | 870 | 1422 | 1.635 |
| 21 | 73 | 1530 | 2622 | 1.714 |

The free-shape relaxation costs a factor between **1.34 and 2.27** across
`n = 3 … 21`, flat rather than growing. So the transplant's target is not a
different-order object; it is the same object with a small, measured, published
overhead, and a rigorous ceiling on `h₂` past `n = 21` would be a ceiling on
`G₂` past `x = 79` at the same cost. Both sequences are tagged `hard,more` and
both were last extended by exhaustive or ILP search (Resta's binary-ILP
formulation, A072753 `%C` 06 Aug 2015; Morack's GLPK runs for `a(17)`–`a(19)`;
Wang's C++ for A144311 `a(17)`–`a(22)`, Nov 2024).

Circularity: **CLEAN**, it is a finite computation with no hypothesis. Exponent:
**NONE, and the reason is decisive.** Making the recursion asymptotic at one
class would give `h(k) ≪ k² log k`, which is Erdős problem **#970** up to a log
and is open there; at two classes it is strictly harder. So this angle cannot
reach the exponent unless it also settles an open Erdős problem. What it can buy
is a rigorous ceiling for `G₂(x#)` at levels past `A144311`'s `x = 79`, at
seconds of compute, from a *proven* inequality rather than from the greedy
oracle that `REFUTED.md` closes past `x ≈ 53`. Not checked here: whether the
four-way branching keeps the recursion tractable, and whether the certificate at
`x` beats the `x^{4.26645}` bound at that `x`. Both are cheap.

### A5. Walnut and automatic-sequence decision procedures

DEAD ON ARRIVAL, with a reason. Walnut decides first-order statements about
`k`-automatic sequences, which requires a fixed numeration base and a fixed
finite alphabet. `G₂` is indexed by the primes, its alphabet of residues grows
with `x`, and no numeration system makes "the first `π(x)` primes" a regular
predicate. The corpus's own row 2 already holds the fold as a fixed two-state
automaton, and it already recorded the limit that matters: capacity bounds the
**count** of legal words of length `n`, never the length of the longest legal
window of a given periodic word, and no theorem bounding the longest legal
factor of a sofic shift that is also a factor of one given periodic word was
found (`IMPORT-MAP.md` §3 row 2). Exponent: NONE.

### A6. Proof by exhaustive check plus periodicity, and induction from a finite base

DEAD, twice over and already recorded. The tile is periodic in the window
coordinate at period `x#` and there is no periodicity in `x`, so no finite check
speaks about levels it did not compute. Induction across the fold is the
bootstrap, and `REFUTED.md` closes it as a mechanism: the map
`B ↦ 2.4·R·B·ln x` is expanding at every `x`, so there is no fixed point at any
`α`, and blocks do not compose (`localized-04-maxsum.md` §§7, 10). On the
literature side, nothing in the Jacobsthal computational tradition proves an
all-`n` statement from finite data: Hagedorn (Math. Comp. 78 (2009) 1073–1087),
Ziller–Morack, *Algorithmic concepts for the computation of Jacobsthal's
function*, arXiv:1611.03310, and Ziller, arXiv:1903.11973 are enumerations and
heuristic searches [all SOURCED-BIB, abstracts read]; the all-`n` bounds in print
(Kanold 1967, Stevens 1977, Iwaniec 1978) come from structural arguments, not
from finite computation. Exponent: NONE.

### A7. SAT or ILP infeasibility certificates for the covering instance

DEAD. An exact infeasibility proof at level `x` is exactly what the exhaustive
computation behind `A144311` already performs, and it says nothing about
`x' > x`. A relaxation-based certificate has to separate 100% coverage from
99.65% at `L = G₂(x#)` and cannot: `REFUTED.md`'s row 11 closure shows greedy's
coverage is at least `L(1 − ∏(1−2/p))` for every `L`, reading 0.9167 to 0.9965
at the decisive lengths against a largest usable threshold of `1 − 1/e`. Search:
`abs:"SAT solver" AND abs:"covering system"` returned **zero** on the arXiv API
while it was calibrated. Exponent: NONE.

### A8. Restricted-moduli non-covering theorems (Hough–Nielsen, Hopper, Filaseta–Trifonov, Dalton–Jones)

DEAD, wrong ambient. Hough–Nielsen, *Covering systems with restricted
divisibility*, Duke Math. J. **168** (2019) 3261–3295 [SOURCED at abstract]:
every distinct covering system has a modulus divisible by 2 or 3. Hopper, *On
covering systems of integers* [SOURCED at abstract]: every covering system has a
modulus divisible by a prime `≤ 19`. Dalton–Jones, arXiv:2506.11359 (2025)
[SOURCED at abstract]: no distinct covering with all moduli in `[n, 10n]`,
extending the Filaseta–Trifonov line from `[n, 6n]` and `[n, 8n]`. Every one of
these is a statement about covering `ℤ`, which is free here (`∏(1−2/p) > 0`
already proves the system does not cover `ℤ`), and none carries an interval
statement. The dyadic-band shape of the Filaseta–Trifonov family also runs into
`REFUTED.md`'s block-composition closure. Exponent: NONE.

### A9. Two-class upper bounds in print, re-checked for anything new

Re-run today in the owning conventions. zbMATH `ti:"paired progressions"`
returns exactly the two Ziller–Morack items of 2017; `any:"paired Jacobsthal"`
returns one; `ti:"Jacobsthal" & py:2024-2026` returns twenty records of which
every number-theoretic one is Kalmynin–Konyagin's polynomial analogue, already
carried. **`covering-dive.md` §2.2's negative stands as of today: no published
upper bound on a two-classes-per-prime Jacobsthal function at any exponent.**
Ziller–Morack's Conjecture 6 (`h₂(n) < p_n² − p_n`) remains the only
quantitative two-class statement and remains a conjecture with nothing proven
about it. Exponent: NONE.

### A10. Hensley–Richards, and the only upper bound their frame carries

DEAD, and the reason is a change of object that is easy to miss. Richards,
Bull. AMS **80** (1974) 419–438, DOI 10.1090/S0002-9904-1974-13434-8, with the
proofs in Hensley–Richards, *Primes in intervals*, Acta Arith. **25** (1974)
375–391, DOI 10.4064/aa-25-4-375-391 [SOURCED at page images by the delegated
sweep, not re-read here]. Their `ρ*(x)` is the **maximum number of admissible
points** in an interval of length `x`, a count, and their theorem is a **lower**
bound on it: `ρ*(x) ≥ π(x) + (log 2 − ε)·x/(log x)²` (Acta p. 380, Bull. AMS
Thm 4.1 p. 435). The only upper bound their frame carries is Montgomery–Vaughan's
`ρ₁(x) ≤ 2π(x)` (*The large sieve*, Mathematika **20** (1973) 119–134), quoted
by them at Acta p. 377, and it bounds **how many** points fit, never **how long**
an interval can be. There is one Jacobsthal-type object in the paper, Acta
Lemma 3's `T(t)`, the least `T` such that one class per prime `≤ T` covers an
interval of length `t`, and they prove `T(t) = o(t)`, which says covering is
easy. Wrong direction, twice. `TODO.md`'s parked "two-class Hensley–Richards
question" can now be graded: the owning convention is `ρ*`, it is a count, and
the corpus's object is not in it. Exponent: NONE.

### A11. Dense and narrow admissible tuples

DEAD, different object. Gordon–Rodemich, ANTS-III, LNCS **1423** (1998) 216–225,
DOI 10.1007/BFb0054864 [SOURCED by the delegated sweep]: `π(x) + (log 2 −
o(1))x/log²x ≤ ρ*(x) ≤ 2π(x)`, plus computation of `ρ*` for `x < 1631`. Polymath8b,
*Variants of the Selberg sieve, and bounded intervals containing many primes*,
Res. Math. Sci. **1**:12 (2014): `H(k)`, the least diameter of an admissible
`k`-tuple, is bounded **above**, but `H(k)` is a minimum over tuples and `G₂` is
a maximum over positions, so a bound on `H(k)` says nothing about the largest gap
between admissible twin slots. Engelsma's and Sutherland's tables are
constructions, hence lower bounds on nothing this corpus needs. Exponent: NONE.

### A12. Kourbatov and Kourbatov–Wolf on maximal k-tuple gaps

DEAD as a source of any bound, and this independently re-confirms
`IMPORT-MAP.md` row 14's `CONJECTURE-ONLY` grade. Kourbatov, JIS **16** (2013)
13.5.2 [SOURCED, full text, by the delegated sweep]: the word "Theorem" occurs
five times and every occurrence names someone else's, its own results are
Conjectures (A)–(E), and §7 states *"this is not a proof: we have relied on
unproven assumptions."* Kourbatov–Wolf, *Mathematics* **7** (2019) 400: zero
theorems, zero propositions, zero lemmas. Exponent: NONE, structurally.

### A13. Hitting sets, transversals, ε-nets, and the covering LP

DEAD, and one half of it is a real gap in the literature rather than a search
failure. The integer program **is** in print, as an OEIS comment: Giovanni Resta,
A072753 `%C` 06 Aug 2015 [SOURCED at the entry today] writes the instance as
binary ILP with `x_{i,j} = 1` iff `a_i = j` or `b_i = j`, and Morack solved
`a(17)`–`a(19)` with GLPK. **No LP relaxation, no duality bound and no
integrality gap for this instance exists anywhere**, on zbMATH
(`ti:"set cover" & ti:"arithmetic progressions"` = 0;
`ab:"integrality gap" & ab:"residue classes"` = 0;
`ti:"exact cover" & ti:"residue classes"` = 0) or on the arXiv API while
calibrated (`all:"set cover" AND all:"arithmetic progressions"` = 0;
`all:"integrality gap" AND all:"arithmetic progression"` = 0;
`all:"hitting set" AND all:"arithmetic progressions"` = 1, hypergraph colouring).
The ε-net side is worse than absent, it is dual: Haussler–Welzl bounds the size
of a **transversal**, and a transversal bound never upper-bounds the length of a
coverable interval. And any LP-relaxation certificate meets `REFUTED.md` row 11's
arithmetic head on, since it must separate 1.000 from 0.9965 at `x = 79`.
Exponent: NONE. The gap is real and nobody has exploited it, which is weak
evidence that it is hard rather than overlooked.

### A14. The Erdős–Graham covering problems, enumerated

DEAD, and now completely enumerated rather than sampled. All **22** problems
tagged *covering systems* on erdosproblems.com were pulled and read [SOURCED by
the delegated sweep; the site's path-encoded routes and the bulk-page
misattribution trap are already documented in `SEARCH-CONVENTIONS.md` §3].
**Exactly one concerns an interval: #275**, which is the `2^r` consecutive-integers
result, best possible via `x ≡ 2^{i−1} (mod 2^i)`. **No Erdős or Erdős–Graham
problem asks about covering `[1, N]` at polynomial scale.** The nearest
neighbours are #278 (maximum density covered over `ℤ`, open) and **#279 (one
class `a_p` per prime, open)**, which is the one-class shadow of this corpus's
question and is itself an open Erdős problem. That last fact is the calibration
worth keeping: the *easier* version of the covering question, at one class, is
an open problem with a name. Exponent: NONE. This supersedes nothing in
`SEARCH-CONVENTIONS.md` §3's Erdős-corpus row, which asked a different question
(does a problem pose two-class Jacobsthal directly) and answered it correctly.

### A15. Discrepancy of arithmetic progressions

DEAD, and the brief's own suspicion is confirmed. Roth's `≫ n^{1/4}` and the
matching Matoušek–Spencer `≪ n^{1/4}` (*Discrepancy in arithmetic progressions*,
J. Amer. Math. Soc. **9** (1996) 195–204) [SOURCED-BIB] are both two-colouring
statements. Roth says every 2-colouring leaves *some* progression imbalanced,
with no control over which; Matoušek–Spencer says a colouring exists with all
progressions balanced. Neither produces "some point of `[1, L]` lies in no
`A_p`", which is what an upper bound on `G₂` is. **Roth-type results are lower
bounds on an imbalance and are the wrong direction, as the brief suspected.**
zbMATH's twelve discrepancy-of-progressions titles include none restricting the
differences to primes. Independently, the instance's total density is
`≈ 2 lnln x ≫ 1`, so the obstruction is the Mertens wall again rather than
anything discrepancy-theoretic. Exponent: NONE. This also matches the corpus's
own `REFUTED.md` row closing "any twin-specific discrepancy law" on a
random-class control.

---

## 4. Where this leaves the two objects

**On `G₂`.** The covering literature is not a source of an upper bound at
polynomial scale and the reason is now quantified rather than asserted: its best
inequality at this corpus's hypotheses is a depth-1 Bonferroni, its optimal-depth
completion is Brun's pure sieve, and the sieve's `κ = 2` limit is the 4.2665
this corpus already holds and `SEARCH-CONVENTIONS.md` §4 closes as unimprovable.
The exponent gap `4.2665 → 2` is not going to be attacked from the covering
side.

**On `Z₂`.** Nothing in this recon reaches `Z₂` at all. `Z₂` is the record
envelope of a zone (`TODO.md` §THE TARGET), a statement about actual twin
primes, and the covering and automated-proof literatures speak about residue
systems, not about primes. The one place they touch is the tile-side form
`G₂(x#) < x′² − 2 ⟹ Zone Postulate at x`, and A4 can certify that at
individual computed levels and at no others, which by the corpus's own R2
reading gives finitely many twins and therefore nothing.

**Honest read on the ask.** "Punch through this hole" is not what any of these
fields is holding. The single most useful thing found is a calibration: the
programme's own instruments (the `4.2665` sieve bound, the `β_pure` hybrid at
optimal depth, the exact `A144311` ladder) already dominate everything the
covering, automated-proof and restricted-moduli literatures have in print for
this object, by four orders of magnitude at `x = 79` and by a widening margin.
That is worth knowing before another wave is spent looking outward.

---

## 5. Corrections this note owes to other documents, and does not apply

Behind the fence; listed so they are not lost.

1. `covering-dive.md` §3.4's "Answer to the targeted question: NO" needs the
   qualifier **at polynomial scale**: CVE Lemma 2 *is* a covering-systems result
   bounding a finite interval coverable by `k` classes per pairwise-coprime
   modulus, at exponential scale, and it is in the same paper §3.4 already
   cites.
2. `SEARCH-CONVENTIONS.md` §3 wants a row for the arXiv `%20`-inside-quotes
   false zero, and §1 wants the two-class interval object pointed at CVE
   Lemma 2 as its printed carrier.
3. `SEARCH-CONVENTIONS.md` §5 wants the note that the arXiv API died mid-session
   on 2026-08-28 after being calibrated live, so same-day negatives split.
4. `IMPORT-MAP.md` wants a graded row for A4 before it runs, under §0a's rule.
5. `TODO.md` item 0 needs `Q-recon-0828-covering` on its `Ledger:` line, or this
   note's ledger block should read `todo: none`. The gate will report the
   mismatch until one of those happens. The `todo: 0` above follows the brief
   literally and creates that mismatch knowingly.
6. **A citation defect in this session's own brief, and it is corrected here.**
   The brief attributes *Dense admissible sets* to Gordon–Rodemich at DOI
   `10.1090/S0025-5718-01-01348-5`. That DOI is **Clark and Jarvis, *Dense
   admissible sequences*, Math. Comp. 70 (2001) 1713–1718**, checked at OpenAlex
   today. Gordon–Rodemich is ANTS-III, LNCS **1423** (1998) 216–225,
   DOI 10.1007/BFb0054864. Anything in the corpus carrying the first pairing is
   wrong.
7. `TODO.md`'s parked "two-class Hensley–Richards question (natal-cap-04)" can
   be unparked and closed on A10's reading: the owning convention is `ρ*(x)`, a
   count, its only upper bound is Montgomery–Vaughan's `ρ₁(x) ≤ 2π(x)` on that
   count, and the corpus's length object is absent from the frame. That is the
   owning-convention search the parked line said had to run first.
8. `PRIOR-ART.md` wants the Ziller–Morack position stated once, plainly:
   **the exponent-2 target and its implication to the twin prime conjecture are
   already in print**, as A288815's own `%C` line and as ZM Conjecture 6 with
   their Theorem 4.1, on the strictly larger object `h₂ ≥ G₂` (measured factor
   1.34 to 2.27 over `n = 3 … 21`, §3 A4). What is not in print is any upper
   bound at any exponent, and the corpus's `4.2665` remains, as far as four
   channels reach, the only one anywhere.

---

## 6. What would falsify this, and whether that check has run

- **The §2 arithmetic.** Falsified by a recomputation of CVE Lemma 2's threshold
  that disagrees with the table, or by a reading of the lemma under which `2ⁿ`
  is structurally rather than incidentally the interval length. The table was
  computed once here, in a scratchpad script, and has **not** been reproduced on
  independent code and has **no** embedded producer, so every number in it is
  scratchpad-grade. The lemma's proof was read at the page image and its `2ⁿ`
  does enter only through `[2ⁿ/b_i]k_i ≤ Σ C(S_i)(r) ≤ [2ⁿ/b_i]k_i + k_i`, which
  is an interval-length statement; that reading has one reader.
- **The §2b claim that the family cannot pass 4.2665.** Falsified by a
  covering-side inequality that is not a Bonferroni truncation of the same
  inclusion–exclusion. None was found, and the search that would settle it is
  the one `SEARCH-CONVENTIONS.md` §4 already ran on the sifting limit. The
  inference is one reader's and is labelled INFERRED in §2b.
- **A4's structural verdict.** Falsified by a form of Costello–Watts Theorem 2.1
  that preserves a fixed pair spacing under dilation, or by an asymptotic
  analysis of their Theorem 4.4 that does not imply `h(k) ≪ k² log k`. Neither
  check has run. The transplant itself has **not** been implemented; the claim
  that Theorems 3.1–3.3 carry and 2.1 does not is a paper argument by one
  reader, and it is the single most likely thing in this note to be wrong.
- **The completeness of §2c.** Falsified by a citer of CVE 1970 that OpenAlex
  does not hold. Not cross-checked on any second citation graph; Semantic
  Scholar was 429 all session and OpenCitations was not tried.
- **The arXiv negatives.** Every arXiv query taken after the channel died is
  void and none is recorded here. The queries that ran while calibrated and
  returned zero are the SAT-solver one in A7, the coprime-moduli covering ones,
  and the four listed in A13; those stand, and every other arXiv-side question
  in this note is **owed**.
- **A10–A15 rest on delegated readings.** Each of those six paragraphs has one
  reader and that reader is not the author of this note. Three of the six
  sweeps' citations were spot-checked here at source: A072753's `%F` and `%C`
  lines and A288815's `%F` reproduce exactly, and the third check found the
  Gordon–Rodemich DOI wrong (§5 item 6), which is one defect in three samples.
  Falsified by re-reading any of the six at its page image and finding the
  direction of the bound different from what is stated. That check has **not**
  run for Hensley–Richards Acta Lemma 3, for Montgomery–Vaughan's `ρ₁ ≤ 2π(x)`,
  or for the erdosproblems enumeration at 22.
- **The h₂/G₂ ratio table.** Both ladders were pulled from OEIS in this session
  and the ratio computed here in a scratchpad script. Falsified by an index
  misalignment between A288815 (offset 1,1) and A144311 (offset 1,2); both were
  checked to start at `n = 1, p = 2` and both give `2` there, which is the only
  alignment check run.
