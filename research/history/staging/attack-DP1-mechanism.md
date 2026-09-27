# Attack D: does anything consume two-point data about a sifted set?

<!-- ledger
id: Q-DP1-mechanism
status: ANSWERED
todo: none
question: Does anything consume two-point data about a sifted set?
verdict: One consumer exists and is priced: the sharp degree-2 Boole-Frechet bound on empty windows is unconditional and concludes at every window position, but it over-certifies G2 with a log-log slope of +5.20 against x over x = 5..19, so the price of stopping at two-point data grows as a power of x rather than as a constant.
-->

*(2026-08-18, rewritten from the ground up after a salvage. Companion
computation: `research/attack-D-twopoint.js`, output mirrored to
`research/attack-D-twopoint.txt`. Legend as in `research/sift-limit-attack.md`:
**[PROVEN]** published theorem with source; **[VERIFIED]** checked
computationally in this repository; **[MEASURED]** empirical, finite range;
**[ABSENT]** searched and found nothing, with the channel and a calibration probe
named; **[INFERRED]** our deduction from sourced facts.)*

**Provenance warning, and it is the reason this file was rewritten.** The
2026-08-18 run that produced the first version of this document died on API
errors before it wrote a line of code. Its cited companion script did not exist,
its three literature children returned nothing to it, and every number in its
headline other than the two it quoted from other files was asserted without a
run. That version is retired to `research/history/CHANGELOG.md`; the draft entry
is §8 below. What follows is what the script actually shows.

---

## 1. The headline

**A mechanism exists, it consumes exactly the data DP1 discards, it concludes at
every window position, and it is priced.** [VERIFIED]

Work on the 6-lattice where the tile lives: slot `s` carries `n = 6s+5`, so `n`
and `n+2` are automatically coprime to 6. Sieve form of `{0,-2}` (the fixed pair,
`research/qc/units.js` §5). Let `X_a` be the number of survivors in a window of
`L` consecutive SLOTS at position `a`, over the full period of `M = x#/6` slots.
The certificate is the sharp degree-`k` Boole-Fréchet bound on the count of empty
windows, and its degree-2 member takes as input the survivor density and the pair
correlation function of the SIFTED SET, nothing else.

Four things are now measured rather than asserted:

1. **It is genuinely outside DP1.** Its inputs `S_1 = L·(#survivors)` and
   `S_2 = Σ_d (L−d)·N_2(d)` reproduce the direct pair-correlation count exactly at
   `x = 5, 7, 11, 13`, and neither is a function of the divisor-class vector
   `(|A_d|)`. [VERIFIED, script part B]
2. **The all-positions quantifier is not the barrier**, and this half of the
   inherited verdict survives intact. §6.
3. **It proves the exact truth at `x = 5` and nothing exact from `x = 7` on**,
   which is the boundary the inherited text named, reached by a different road
   and for a different reason. §5.
4. **It is not empty above `x = 5`; it degrades.** Degree 2 certifies
   `G₂(x#) ≤ 12, 114, 390, 2256, 18900, 117558` at `x = 5..19` against truths
   `12, 30, 42, 66, 108, 150`. The over-certification ratio runs
   `1.0, 3.8, 9.3, 34.2, 175.0, 783.7` with log-log slope **+5.20** against `x`.
   **The price of stopping at two-point data is not a constant factor; it grows
   as a power of `x`.** [MEASURED, six levels]

So DP1 moves from "no known consumer" to "one consumer, unconditional,
all-positions, and measurably worse than the sieve it is meant to beat". That is
a weaker headline than the one it replaces and a better-supported one.

## 2. The object, and the units that three of the four inherited claims failed

`research/sift-limit-attack.md` §1 names DP1 as the master discard: the sieve
sees only `(|A_d|)_{d|P(z)}`, so nothing about how survivors sit relative to each
other can enter. §7d prices it at **2.32 of the 3.2665 total, 71 per cent**,
against DP2+DP3's 0.95 (`research/sift-limit-attack.md`:618-619). §3 marks the
"known consumer" column **none** for every two-point asset in the repo.

Everything below is in SLOTS on the 6-lattice, never integers (`units.js` §2).
The script closes the loop with the published object first:

| `x` | `M = x#/6` | survivors | `d` | max cyclic gap, slots | ×6 | `G₂(x#)` |
|---|---|---|---|---|---|---|
| 5 | 5 | 3 | 0.600000 | 2 | 12 | 12 |
| 7 | 35 | 15 | 0.428571 | 5 | 30 | 30 |
| 11 | 385 | 135 | 0.350649 | 7 | 42 | 42 |
| 13 | 5005 | 1485 | 0.296703 | 11 | 66 | 66 |
| 17 | 85085 | 22275 | 0.261797 | 18 | 108 | 108 |
| 19 | 1616615 | 378675 | 0.234239 | 25 | 150 | 150 |
| 23 | 37182145 | 7952175 | 0.213871 | 34 | 204 | 204 |

Ladder values from `research/exact-g2-ladder.js`:34-41; the ×6 column is
recomputed by exhaustive enumeration of the whole period. [VERIFIED] So
`L_crit = G₂(x#)/6` exactly, and "certify no empty window of `L` slots" is
literally "certify `G₂(x#) ≤ 6L`".

**The certificate, stated so it can be computed.** A degree-`k` certificate is a
polynomial `P` of degree at most `k` with `P(0) ≥ 1` and `P(j) ≥ 0` for every
integer `1 ≤ j ≤ L`. Then `#{a : X_a = 0} ≤ Σ_a P(X_a) = Σ_{j≤k} c_j S_j` with
`S_j = Σ_a binom(X_a, j)` the `j`-point count of the sifted set inside a window.
The sharp value obtainable from `S_0..S_k` is the linear program

> `V_k(L) = max { ν_0 : ν ≥ 0 on {0..L}, Σ_v ν_v·binom(v,j) = S_j, j = 0..k }`

and since the number of empty windows is a non-negative integer, **the
certificate proves `G₂(x#) ≤ 6L` if and only if `V_k(L) < 1`.**

## 3. The four inherited claims, adjudicated

| claim | verdict |
|---|---|
| (i) works iff `max_r X_r ≤ k`, "an identity, not an estimate" | **RETRACTED.** False as an identity; the governing quantity is the range, not the maximum |
| (ii) degree 2 works iff `Var < (t−1)(2−t) + 2/M`, Fano below `1/6` | **CORRECTED.** Right shape, wrong constants; the `s = 1` special case presented as the general law |
| (iii) `natal5-variance.js` reading 2 puts the crossing between `x = 5` and `x = 7` | **RETRACTED as evidence.** The numbers reproduce; the comparison is a units error of 14× to 9.5×10⁴ |
| (iv) any degree needs `k ≥ max_r X_r` at `L = G₂/6`, order diverges polynomially | **SURVIVES**, with the density read per integer and the growth law flagged as unresolvable over this range |

**(i) is false, and the correct statement is sharper.** The attained set `{X_a}`
is always an integer interval `[X_min, X_max]`: sliding the window by one slot
changes the count by at most 1, so by discrete intermediate value over a cyclic
period every intermediate count occurs. [VERIFIED in every row tested] The
hard-zero certificate is `P(z) = Π_{v∈S}(z−v) / Π_{v∈S}(−v)`, admissible exactly
when the range `|S| = X_max − X_min + 1` is even, and the `1/M` integrality slack
pulls the true threshold below even that. Measured threshold `k*` against claim
(i)'s `max_r X_r`, over fourteen real rows: **they agree in two.** At `x = 13`,
`L = 44` slots the sharp threshold is `k* = 4` and the claim says 17. One
synthetic case settles it in a line: survivors every third slot, `L = 9`, so
`X ≡ 3` at every position and `max_r X_r = 3`, while `P(z) = (z−3)²/9` certifies
at degree 2. **What claim (i) drops is `X_min`.**

**(ii) has the right shape and the wrong constants.** The correct criterion,
derived from `P_s(z) = (z−s)(z−s−1)/(s(s+1))`, is

> `Var(X_L) < (t−s)(s+1−t) + s(s+1)/M` for some integer `s ≥ 1`,

optimal at `s = ⌊t⌋`, where the first term is `frac(t)(1−frac(t)) ≤ 1/4`. The
inherited form is the `s = 1` member and is optimal only for `1 ≤ t ≤ 2`. Outside
that window its right-hand side goes **negative**: `−0.106` at `x = 7`, `−10.07`
at `x = 17`, so as stated it declares impossible a certificate that can still
work. The corrected closed form agrees with the sharp LP on **73 of 73** window
lengths swept at `x = 5, 7, 11, 13`. [VERIFIED]

The Fano restatement inherits the same defect. In general the threshold is
`frac(t)(1−frac(t))/t + O(t/M) ≤ 1/(4t)`, which **tightens as the window grows**.
`1/6` is that threshold at `t = 3/2` and at no other `t`. At `L_crit` it reads
`0.137, 0.107, 0.060, 0.044` for `x = 7, 11, 13, 17`.

**(iii) is a units error, and the numbers themselves are sound.** The script
re-implements the exact `J₅` rotation variance independently and reproduces
reading 2 to the digit: `Var/E = 0.152, 0.256, 0.299, 0.327, 0.347` at
`x = 7..19` (`research/natal5-variance.js`:205). But that table's window is
`L = W = x#` **integers**, where `t = E[N]` runs `6.92` to `41441`, not `3/2`.
Applying a `t = 3/2` threshold to those rows misses by:

| `x` | measured Fano | correct threshold at that `t` | too large by |
|---|---|---|---|
| 7 | 0.1521 | 1.03e-2 | 14.8× |
| 11 | 0.2563 | 5.06e-3 | 50.6× |
| 13 | 0.2995 | 6.66e-4 | 450× |
| 17 | 0.3268 | 7.70e-5 | 4240× |
| 19 | 0.3473 | 3.67e-6 | 94600× |

This is the slots-versus-integers confusion of `units.js` §2 wearing a different
hat. The inherited sentence "the threshold is crossed between `x = 5` and
`x = 7`" happens to be true when computed at the right `L` (§5), but nothing in
these rows shows it.

**(iv) survives, and it is the one that matters.** At `L = L_crit` the minimum
window count is 1 at every level measured, and it must be: the record gap is one
slot longer than the longest empty run, so the window starting at the survivor
before the record gap holds exactly one. Hence the range equals `X_max` there,
and "`k ≥ max_r X_r`" is correct **at `L = G₂/6` and only there.**

| `x` | `L_crit` | `X_min` | `X_max` | `t` | `k*` |
|---|---|---|---|---|---|
| 5 | 2 | 1 | 2 | 1.2000 | 2 |
| 7 | 5 | 1 | 3 | 2.1429 | 4 |
| 11 | 7 | 1 | 5 | 2.4545 | 5 |
| 13 | 11 | 1 | 7 | 3.2637 | 8 |
| 17 | 18 | 1 | 9 | 4.7123 | 10 |
| 19 | 25 | 1 | 11 | 5.8560 | 12 |
| 23 | 34 | 1 | 13 | 7.2716 | 14 |

`X_max ≥ ⌈t⌉` with `t = (G₂/6)·d` at every level, so the claim's `⌈G₂·δ⌉` is
right once `δ` is read as the density per INTEGER; read per slot it is 6× wrong.

**The growth law cannot be settled here, and the claim should not be quoted as
if it were.** Measured log-log slopes over `x = 7..23`: `d log k*/d log x = 1.13`,
`d log X_max/d log x = 1.26`, `d log t/d log x = 1.10`. The claimed
`x^{1.70}/ln²x` has local slope `1.70 − 2/ln x = 1.00` at the log-mean level
`x = 13.1`, so over this range it is **consistent with the measurement and
indistinguishable from any nearby law**. What six levels support is the
qualitative statement: the needed order climbs as a power of `x`, not as
`ln ln x`.

## 4. This is not `natal-cap-06`'s Bonferroni, and the two must not be substituted

`research/natal-cap-06-bonferroni.js` runs Bonferroni over the **sieve classes**
`A_q`. Its terms `|A_T|` are divisor-class counts, which is one-point data, which
is inside DP1. Its ladder depth is the hit multiplicity `h(r)` and its reading 5
measures needed depth `1, 3, 3, 5, 5, 7, …, 15` to `x = 127`, growing like
`ln ln W` (`research/natal-cap-06-bonferroni.js`:316).

This file runs Boole-Fréchet over the **survivor events**. Its terms are
correlations of the sifted set, which is outside DP1, and its depth is the window
count `X_a`, which §3 measures growing as a power of `x`. **Two different
quantities on two different objects.** The apparent conflict between "diverges
polynomially" and "grows like `ln ln`" is not a conflict; substituting one depth
for the other is the error to avoid, and the first version of this document was
one paragraph away from making it.

## 5. What two-point data actually buys, priced

At `L = L_crit`, the sharp degree-2 value is `V_2 = 0` at `x = 5` and
`2.00, 33.3, 462.8, 5768` at `x = 7, 11, 13, 17`. So degree 2 proves the exact
truth `G₂(5#) ≤ 12` and proves nothing exact from `x = 7` on.

Degree 2 is not empty above `x = 5`. It certifies a weaker bound, and the first
window length at which it becomes valid is:

| `x` | `L_crit` | first valid `L` | bound proved | true `G₂` | ratio |
|---|---|---|---|---|---|
| 5 | 2 | 2 | 12 | 12 | 1.0 |
| 7 | 5 | 19 | 114 | 30 | 3.8 |
| 11 | 7 | 65 | 390 | 42 | 9.3 |
| 13 | 11 | 376 | 2256 | 66 | 34.2 |
| 17 | 18 | 3150 | 18900 | 108 | 175.0 |
| 19 | 25 | 19593 | 117558 | 150 | 783.7 |

`d log(ratio)/d log x = +5.20` over `x = 7..19`. [MEASURED, six levels] The long
sweep uses the §3 closed form, which matched the sharp LP on all 73 tested
lengths, and the crossing is re-checked against the exact LP at `L` and `L−1`
wherever the LP is affordable: `V_2(19) = 0.889` against `V_2(18) = 1.107`,
`V_2(65) = 0.945` against `V_2(64) = 1.004`, `V_2(376) = 0.966` against
`V_2(375) = 1.017`.

**This is the number the DP1 ledger wants.** An unconditional, all-positions,
two-point certificate exists and loses to the truth by a factor growing like
`x^5.2` over the range we can enumerate. It does not touch the `4.2665` exponent
from below; it is a mechanism, not a route.

## 6. The quantifier is not the barrier, and reading 6 is not violated

The inherited verdict's one piece that is independent of the arithmetic:

> the brief's hypothesis was that a certificate holding at every position cannot
> use average pair data by its own logic; that is false as stated, because over a
> finite period the number of bad positions is a non-negative integer, so a
> failure-density bound below `1/M` forces it to zero.

**The reasoning holds and the claim is kept.** [VERIFIED] The script runs it end
to end at `x = 5`: `Σ_a P_1(X_a) = 0` over the whole period of `M = 5` positions,
the count of empty windows is a non-negative integer, hence zero, and the direct
enumeration confirms zero. The conclusion covers **all** `M` positions, the
anchored one included, and yields `G₂(5#) ≤ 12` against the truth 12, from
one-point and two-point data only.

**Why this does not contradict `natal5-variance.js` reading 6.** Reading 6
(`research/natal5-variance.js`:227) says no almost-all bound can reach the
anchored tile by measure alone, because the anchored tile is a diverging-`z`
outlier of the rotation ensemble the theorem governs. That is a statement about
bounds of the form "the exceptional set has measure below `ε`". The step here is
different in kind: it drives the exceptional COUNT below one, and an exceptional
set of size zero has no outliers to escape into. Reading 6 is right about what it
addresses and does not block this. [INFERRED]

**Where the barrier actually is, priced.** The arithmetic, exactly as the
inherited verdict said, though not for the reason it gave. Chebyshev's failure
density `Var/E²` at `L_crit` misses `1/M` by `3.6, 49, 613, 6370, 81600` at
`x = 7..19`, and the sharp degree-2 value is worse than Chebyshev's because it is
exact rather than crude. The certificate's success condition at `L_crit` is a
statement about the window count's RANGE, and with `X_min = 1` forced there, the
range is the maximum, which two-point data cannot see.

## 7. The literature, and an honest account of what was and was not searched

**Nothing was searched this session.** No search channel was opened, no
calibration probe was run, and therefore **no `[ABSENT]` claim is made anywhere
in this document.** What follows is recovered from the transcripts of the five
literature agents that died on 2026-08-18 without reporting, and it is evidence
about a search, not a search. Owning conventions per
`research/SEARCH-CONVENTIONS.md` §1.

**The sweep never reached the parent.** All three of attack D's literature
children and both grandchildren terminated on a weekly-limit message, none
produced a final report, and the parent's three agent-launch results contain only
the launch acknowledgement. So the first version of this document's claim about
the sieve literature rested on no search at all. The Bonferroni framing itself
came from inside the repo: the word appears at `research/sift-limit-attack.md`:180
and throughout `natal-cap-06`, and in none of the five transcripts.

**Three leads that were found and never followed, and they are the deliverable of
§7.**

- **Brady, "A semidefinite framework for the sieve", arXiv:2112.02722** (owning
  convention: the large sieve, and semidefinite relaxation). Its decision
  variable is literally `A_ij = P_μ[i ∈ X ∧ j ∈ X]`, a covariance matrix of the
  sifted set, and its conclusion is an upper bound on `|X|` with the Large Sieve
  and the Larger Sieve as special cases. This is the closest published object to
  "a method that consumes two-point data about a sifted set to prove an upper
  bound" that the sweep found, and it is the natural home of the LP in §2.
  **Not read this session; the repo's closed-route list names "Brady/Li
  fractional retention", which is a different result of the same author and does
  not close this one.**
- **Hough, "The least modulus of a covering system with distinct moduli",
  Ann. of Math. 183 (2016)** (owning convention: Erdős covering systems, the
  distortion method). Lemma 3.2 in the form the dead agent verified against the
  PDF: if `(1/(4δ(1−δ)))·Σ_k E_{k−1}[α_k(x)²] < 1` then `A` does not cover `Q`.
  Second-moment input, non-covering output. That is exactly the logical shape of
  a `G₂` upper bound. Caveats the same agent recorded: the ambient is
  `Q = S_1 × … × S_n` via CRT rather than an interval, and Theorem 2.1 wants one
  residue class per modulus, where our object has two.
- **Friedlander, "Moments of sifted sequences", Math. Ann. (1984)** and
  **Huxley, "Irregularity in sifted sequences", J. Number Theory (1972)**.
  Surfaced by Crossref, titles squarely on the target object, never opened.

**Two published statements that should enter the ledger as adverse**, both
recovered verbatim from the transcripts and both **unverified against the source
this session**:

- **FKMPT, "Long gaps in sieved sets", JEMS 23 (2021), Remark 7**, states that
  the two-dimensional system `I_p = {0, 2 (mod p)}`, our exact object, is the
  case their method abandons, that their trivial bound there is
  `≫ log X log log X`, and that "a sieve upper bound combined with the pigeonhole
  principle already gives `≫ log²X`". That is an independent blessing of the
  DHR-plus-pigeonhole route and an explicit published statement that the
  correlation machinery of that paper does not improve our case.
- **Polymath8b §8** gives the Liouville-weight parity obstruction to anything
  using only `(|A_d|)`-type axioms and names **bilinear** hypotheses, not
  two-point statistics of the sifted set, as the escape. Read together with
  **Friedlander-Iwaniec's asymptotic sieve for primes, Ann. of Math. 148 (1998),
  axiom (B)**, the precedent for "a second hypothesis slot exists" is real, but
  the slot the literature actually opens takes a bilinear form in the ambient
  coefficient sequence, not a pair correlation of the sifted set.

**What the sweep recorded on the negative side**, on the arXiv Atom API channel
with `all:electron → 185050`, `all:"sifted set" → 4`, and
`abs:"pair correlation" AND abs:"sieve" → 4` as its passing calibration probes:
ten queries returned zero, including `all:"pair correlation sieve"`,
`all:"correlations of sifted"`, `all:"second moment sieve"`,
`all:"variance of sifted"`, `all:"gaps in sifted sets"` and
`abs:"hypergraph container" AND abs:sieve`. **Those probes were run in the dead
session, not this one, so under this repo's legend they do not clear the
calibration bar and are recorded here as transcript evidence only.** One probe in
that sweep provably failed: `abs:"relative Szemeredi" → 0` is a known false
negative caused by the accent in "Szemerédi", which voids two further negatives
from the same batch.

## 8. Draft entry for `research/history/CHANGELOG.md`

> **2026-08-18. Attack D's DP1 headline: one claim retracted, one corrected, one
> withdrawn as evidence, one kept.** The 2026-08-18 report
> `history/staging/attack-DP1-mechanism.md` was written by an agent that died
> before writing its companion script, and its four load-bearing claims were
> asserted without a run. `research/attack-D-twopoint.js` now computes all four.
>
> RETIRED: "the degree-`k` certificate proves no empty window if and only if
> `max_r X_r ≤ k`; that is an identity, not an estimate". False. The governing
> quantity is the RANGE `X_max − X_min + 1`, not the maximum; the two agree in 2
> of 14 measured rows, and a set with a survivor every third slot has
> `max_r X_r = 3` with threshold degree 2. The claim is true at `L = G₂/6` alone,
> where `X_min = 1` is forced.
>
> RETIRED: "degree 2 works iff `Var(X_L) < (t−1)(2−t) + 2/M`, i.e. Fano below
> `1/6`". That is the `s = 1` member of `Var < (t−s)(s+1−t) + s(s+1)/M`, optimal
> only for `1 ≤ t ≤ 2`; outside it the stated right-hand side is negative
> (`−10.07` at `x = 17`). The Fano threshold is
> `frac(t)(1−frac(t))/t ≤ 1/(4t)`, not the constant `1/6`.
>
> RETIRED AS EVIDENCE: "`natal5-variance.js` reading 2's Fano 0.152 → 0.347 puts
> the crossing between `x = 5` and `x = 7`". The Fano values reproduce exactly,
> but they are measured at `L = W = x#` INTEGERS where `t = 6.92 … 41441`, and
> the `1/6` threshold holds only at `t = 3/2`. The comparison is off by 14× to
> 9.5×10⁴. The conclusion is separately true at `L = G₂/6` and is now measured
> there.
>
> RETIRED: the claim that the mechanism is classical and unrepresented in the
> sieve literature. No search supported it. Attack D's three literature children
> and two grandchildren all died without reporting, and the parent received
> nothing from them.
>
> KEPT: the quantifier argument. Over a finite period the count of bad positions
> is a non-negative integer, so a failure density below `1/M` forces it to zero,
> and this does not contradict `natal5-variance.js` reading 6, which constrains
> almost-all bounds rather than exceptional-count bounds.
>
> NEW: two-point data has a consumer and it is priced. Degree-2 Boole-Fréchet
> over the survivor events certifies `G₂ ≤ 12, 114, 390, 2256, 18900, 117558` at
> `x = 5..19` against truths `12, 30, 42, 66, 108, 150`, ratio `1.0 → 783.7`,
> log-log slope `+5.20`.

## 9. Reach, and what is not established

Exact full-period enumeration to `x = 23` (`M = 37,182,145` slots). The next
level needs `M = 29#/6 = 1.08×10⁹` slots and was not run. Every growth statement
above rests on six levels and is marked [MEASURED] for that reason.

The float simplex silently lost the answer at `k ≥ 9`, reporting `V_10 ≥ 1` at
`x = 17, L = 18` where an explicit degree-10 polynomial gives `V_10 = 0`. Every
LP in the script therefore runs on BigInt rationals, cross-validated against
brute-force enumeration of every basic support on 24 of 24 cases. Anyone
re-running a moment LP of this shape in doubles should check the same way.

Not established, and not to be quoted as if it were: that the needed degree
diverges as `x^{1.70}/ln²x` specifically. Six levels cannot separate that from
any nearby law. Not established: that no certificate does better than the LP of
§2 by using data the LP does not encode; the LP is sharp for `S_0..S_k` and says
nothing about, for instance, the spectral form of the same information. Not
established: anything at all about the literature, for the reason §7 gives.
