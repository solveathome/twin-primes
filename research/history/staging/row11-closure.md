# IMPORT-MAP row 11, closed formally: the (1 − 1/e) certificate cannot fire

<!-- ledger
id: Q-row11-closure
status: CLOSED
todo: none
question: Can the (1 - 1/e) greedy-coverage certificate of IMPORT-MAP row 11 ever fire?
verdict: No, and now on a producer rather than on prose: the map's paragraph-only pre-pricing reproduces exactly at all six figures it states and extends to the full ladder x = 5..79 with the certificate silent at every level under every constant that could be used, and the step from a density to an algorithm is proved in one line.
-->

*Staging-layer record. Proposal only: it edits no live document, and in
particular it edits neither `research/IMPORT-MAP.md` nor `research/REFUTED.md`.
The proposed texts for both are in §6 and are proposals. Producer:
`research/row11-closure-01-coverage.js`, output formally embedded (0.1 s).
Pre-registered in [row11-closure-prereg.md](row11-closure-prereg.md), committed
alone before the producer existed. Calibration marked on every claim.*

## 0. The answer

**Row 11 is dead, and now it is dead on a producer rather than on prose.** The
map pre-priced it dead with a computation that lived only in a paragraph. That
computation reproduces exactly, at all six of the figures it states, and it
extends to the full ladder `x = 5 … 79` with the certificate silent at every
level under every constant that could be used.

Three things the paragraph left implicit, and all three go the same way.

**The step from a density to an algorithm is exact.** `1 − ∏(1 − 2/p)` is the
density of a covered set; the certificate condition is about an algorithm's
value. The bridge is one line and it is [PROVEN]: for odd `p`, every `n` in
`[1, L]` lies in exactly two of the `p` candidate pairs for that prime, so the
offsets' marginal gains sum to exactly twice the uncovered count with no
boundary error, and the best offset takes at least a `2/p` share. The uncovered
count therefore falls by a factor of at most `1 − 2/p` at the round where `p` is
chosen, whatever order the greedy chooses in, so greedy's coverage of `[1, L]`
is at least `L·(1 − ∏(1 − 2/p))` for **every** `L`, not only for a long
interval. Verified at every level of the ladder.

**The threshold is not one number, and the largest of them still does not
fire.** The finite-`k` form `1 − (1 − 1/k)^k` runs from 0.703704 at `k = 3` down
to 0.640643 at `k = 22`, above `1 − 1/e = 0.632121` throughout, so it is the
strongest test available. Coverage beats it at every level, worst case 0.800000
against 0.703704.

**At the only length where a certificate would ever be run the greedy is within
a handful of the optimum, not within a constant factor of it.** At
`L = G₂(x#)`, the first uncoverable length, the plain greedy covers 11 of 12 at
`x = 5` and 1704 of 1710 at `x = 79`. The certificate is being asked to
distinguish 1.000000 from 0.996491 with a guarantee whose resolution is
0.640643. That is the closure in one sentence, and it is a statement about
resolution rather than about margin.

**One correction to the map falls out of opening the theorem.** Row 11 attaches
the `(1 − 1/e)` to Fisher–Nemhauser–Wolsey, *Math. Prog. Studies* 8 (1978)
73–87. That paper's bound is `1/(p + 1)`, which is `1/2` at a matroid. The
`(1 − 1/e)` for a **cardinality** constraint is Nemhauser–Wolsey–Fisher part I,
*Math. Prog.* 14 (1978) 265–294, and for the **partition** matroid row 11
actually has, it is Călinescu–Chekuri–Pál–Vondrák's, which the row also cites.
§3 has the exact hypotheses.

## 1. The object, and the identification

`research/greedy-oracle-validation.js`'s header states the identity this corpus
proves elsewhere:

> `G₂(x#) − 1` = the largest `m` for which `[1, m]` can be covered by choosing,
> for each prime `p ≤ x`, one residue pair `{a_p, a_p − 2}` mod `p`, with `a_p`
> free.

Row 11's identification of that as a submodular-maximisation instance is exact
and is not in dispute here:

- the ground set is `X = {(p, a) : p ≤ x, a ∈ Z/p}`, partitioned into blocks
  `X_p`, one per prime;
- `f(S) = |{n ∈ [1, L] : n ≡ a or n ≡ a − 2 (mod p) for some (p, a) ∈ S}|` is a
  coverage function, hence monotone submodular, with `f(∅) = 0`;
- the constraint `|S ∩ X_p| ≤ 1` for every `p` is a **partition matroid**;
- `[1, L]` is coverable if and only if `max_{S ∈ I} f(S) = L`.

The optima are OEIS A144311, 22 terms to `x = 79`, quoted from
`research/covering-dive.md` and never recomputed here.

## 2. The certificate as row 11 proposes it, written out

An algorithm `A` with a proven ratio `α` returns `ALG ≥ α · OPT`, hence
`OPT ≤ ALG/α`. To certify `[1, L]` **uncoverable** the corpus needs `OPT < L`,
so the certificate is

> **fire if `ALG < α · L`.**

The covering optimum sits on the `OPT` side of the guarantee, which is the side
the guarantee bounds from above only through a *small* `ALG`. So the certificate
is a test on the algorithm's own output, and the question is whether any
algorithm with a proven ratio ever returns less than `α · L` on this instance.

## 3. The theorem, at source, with its exact hypotheses

**[SOURCED, verbatim]** Călinescu, Chekuri, Pál and Vondrák, *Maximizing a
monotone submodular function subject to a matroid constraint*, published as
*SIAM J. Comput.* **40** (2011) 1740–1766; read at the authors' hosted full-text
PDF `theory.stanford.edu/~jvondrak/data/submod-matroid.pdf`, the version dated
September 21, 2009: the abstract on p. 1, the monotonicity convention on p. 2,
and the greedy discussion on p. 3. Their abstract:

> *"Let f : 2^X → R+ be a monotone submodular set function, and let (X, I) be a
> matroid. We consider the problem max_{S∈I} f(S). It is known that the greedy
> algorithm yields a 1/2-approximation [17] for this problem. For certain special
> cases, e.g. max_{|S|≤k} f(S), the greedy algorithm yields a
> (1 − 1/e)-approximation. It is known that this is optimal both in the value
> oracle model … and also for explicitly posed instances assuming P ≠ NP."*

Their hypotheses on `f`, p. 2 of the same PDF:

> *"We restrict attention to monotone (by which we mean non-decreasing)
> functions, that is f(A) ≤ f(B) for all A ⊆ B, and we assume f(∅) = 0."*

And the statement that separates the two constants, p. 3 of the same PDF:

> *"For the problem of maximizing a submodular function subject to a matroid
> constraint (special case of p = 1), the greedy algorithm achieves a ratio of
> 1/2. When the matroid is uniform, i.e. the problem is max{f(S) : |S| ≤ k}, the
> greedy algorithm yields a (1 − 1/e)-approximation and this is optimal in the
> value oracle model."*

Their reference [17] is Fisher–Nemhauser–Wolsey part **II**, *Math. Prog.
Study* **8** (1978) 73–87; their [36] is Nemhauser–Wolsey–Fisher part **I**,
*Math. Prog.* **14** (1978) 265–294; their [37] is Nemhauser and Wolsey, *Math.
Oper. Research* **3**(3) (1978) 177–188, the value-oracle optimality. Their
appendix B, p. 26 of the same PDF, records that FNW part II's greedy bound for a `p`-system
is `1/(p + 1)` and calls it tight.

**Four hypotheses, and where row 11's instance sits against each.**

| hypothesis | the instance |
|---|---|
| `f` monotone submodular, `f(∅) = 0` | **satisfied**, `f` is a coverage function |
| the constraint is a **matroid** | **satisfied**, a partition matroid |
| the constraint is **uniform** (a cardinality constraint), which is what the `(1 − 1/e)` greedy bound needs | **NOT satisfied**. One element per block is a partition matroid, uniform only when there is one block, i.e. one prime |
| the algorithm attaining `(1 − 1/e)` on a general matroid is CCPV's continuous greedy with pipage rounding, and it is **randomized** | satisfiable, but a randomized guarantee bounds `OPT` only in expectation or with high probability, so it certifies nothing deterministically |

So for the object row 11 actually has, the deterministic constant available is
`1/2` and the `(1 − 1/e)` is available only through a randomized algorithm. Both
are computed below and neither fires. **The map's citation pairing is the one
thing that needs correcting, and correcting it makes the row weaker rather than
stronger.**

**[SOURCED-BIB, not opened]** Fisher–Nemhauser–Wolsey part II and
Nemhauser–Wolsey–Fisher part I were not read at their own PDFs: Springer
redirected both DOIs to authentication. Their statements here are carried
through CCPV's text and are corroborated, not verified. The map's construction
record records all four as read "at their publisher pages", which for a
statement is an abstract-level reading; the `[SOURCED]` tag on the FNW row
should read `[SOURCED-BIB]` until a PDF is obtained.

## 4. The closure argument, in one paragraph

Coverage of `[1, L]` is monotone submodular with `f(∅) = 0` and one pair per
prime is a partition matroid, so the applicable guarantees are CCPV's randomized
`(1 − 1/e)` for a general matroid and FNW part II's deterministic `1/2` for the
greedy on the same; the `(1 − 1/e)` greedy bound of NWF part I needs a
cardinality constraint the instance does not have. Any of them certifies
`[1, L]` uncoverable only when the algorithm's own coverage falls below `α · L`.
It never does, and the reason is exact rather than empirical: for odd `p` every
integer of `[1, L]` lies in exactly two of that prime's `p` candidate pairs, so
the mean marginal gain over the offsets is exactly `2/p` of the uncovered count
and the greedy's chosen offset gains at least that, which forces the uncovered
count down by a factor `1 − 2/p` at each round and leaves greedy's coverage at
least `L·(1 − ∏_{p≤x}(1 − 2/p))` for every `L` and every level; that floor is
0.800000 at `x = 5` and rises to 0.959010 at `x = 79` in the map's convention,
against a largest usable threshold of 0.703704 falling to 0.640643. At the only
length a certificate would be run on, `L = G₂(x#)`, the plain greedy does far
better than the floor and covers 1704 of 1710 at `x = 79` against an optimum of
1709, so the certificate would have to separate 1.000000 from 0.996491 using a
constant of 0.64. **The problem is 100% against 99.6%, and constant-factor
approximation cannot see that difference at any level of the ladder, at any
interval length, and under any of the three constants** — and by
Nemhauser–Wolsey's value-oracle optimality and Feige's `P ≠ NP` hardness, both
recorded in CCPV's abstract, no better constant is coming.

## 5. What the producer returns

All figures are in the formally embedded tail of
`research/row11-closure-01-coverage.js`; none was typed by hand.

| criterion | result |
|---|---|
| **C1** the six quoted figures reproduce within 1e−6 | **PASS**, worst 3.3e−7, which is the rounding of the stated six decimals |
| **C2** the ladder increases over `x = 5 … 79` | **PASS**, steps falling from 0.133333 to 0.001065 |
| **C3** greedy above every threshold at `L = G₂(x#)` | **PASS**, fractions 0.916667 to 0.996491 |
| **C4** the firing condition holds nowhere on the ladder | **PASS** |

Coverage, thresholds and the greedy's achieved fraction at the decisive length,
at five levels of the twenty:

| `x` | `k` | coverage (from `p = 3`) | `1 − (1−1/k)^k` | `L = G₂(x#)` | greedy fraction |
|---|---|---|---|---|---|
| 5 | 3 | 0.800000 | 0.703704 | 12 | 0.916667 |
| 13 | 6 | 0.901099 | 0.665102 | 66 | 0.984848 |
| 31 | 11 | 0.937908 | 0.649506 | 348 | 0.991379 |
| 53 | 16 | 0.950920 | 0.643926 | 870 | 0.996552 |
| 79 | 22 | 0.959010 | 0.640643 | 1710 | 0.996491 |

**Two things the run adds that the prose does not have.**

**The convention question, called.** The record's product runs over
`3 ≤ p ≤ x` and omits `p = 2`, while A144311's own definition uses the first `n`
primes and includes it. Including `p = 2` raises coverage from 0.959010 to
0.979505 at `x = 79`, since the pair `{a, a − 2}` mod 2 is a single class of
density 1/2. **The record's figure is the conservative one and the closure holds
under either convention.**

**The two levels below the ladder fire, correctly and uselessly.** At `x = 2`
there is one prime and one class, coverage 0.500000, and a `1/2`-certificate
fires; at `x = 3` the inapplicable finite-`k` rider fires, threshold 0.750000
against coverage 0.666667. Both are certifying that a long interval cannot be
covered by two or three primes, which is not in doubt, and neither is a level at
which `G₂` is unknown. They are reported rather than excluded, because a scored
range that quietly drops the only rows where something happens is the defect
this corpus's gate exists to catch.

## 6. Proposed edits, not applied

**`research/IMPORT-MAP.md` row 11, status cell.** Replace
`UNTRIED, **pre-priced dead**, see the paragraph` with:

> **CLOSED 2026-08-19, dead on arithmetic** — the certificate cannot fire at any
> level, any interval length, or any of the three usable constants: greedy's
> coverage is at least `L(1 − ∏(1−2/p))` for EVERY `L` by an exact
> average-marginal argument, which is 0.800 at `x = 5` rising to 0.959 at
> `x = 79` against a largest threshold of 0.704 falling to 0.641, and at
> `L = G₂(x#)` the plain greedy reaches 1704 of 1710 at `x = 79` against the
> optimum 1709, so the test would have to separate 1.000 from 0.9965 with a
> constant of 0.64; **the citation pairing needs one correction, since the
> `(1 − 1/e)` is Nemhauser–Wolsey–Fisher part I's and only for a cardinality
> constraint, while FNW part II gives `1/2` for the matroid this instance has**;
> `history/staging/row11-closure.md`

**`research/IMPORT-MAP.md` row 11, theorem cell.** Add
Nemhauser–Wolsey–Fisher, *Math. Prog.* 14 (1978) 265–294 as the owner of the
`(1 − 1/e)` cardinality bound, demote the two 1978 papers to `[SOURCED-BIB]`
since neither was opened at its own PDF, and keep
Călinescu–Chekuri–Pál–Vondrák as `[SOURCED, verbatim]`, which is what it now
is.

**`research/REFUTED.md`, one row:**

| route | verdict | why, in one clause | closed | record |
|---|---|---|---|---|
| a constant-factor submodular certificate for a finite-level `G₂` ceiling (IMPORT-MAP row 11) | CLOSED | greedy's coverage is at least `L(1 − ∏(1−2/p))` for every `L`, which is 0.800 to 0.959 along the ladder and 0.9167 to 0.9965 at the decisive lengths, so no `α ≤ 1 − 1/e` test ever fires | 2026-08-19 | `research/row11-closure-01-coverage.js`; `history/staging/row11-closure.md` |

## 7. What this does not show

The closure is about **certificates**, not about the greedy. Whether the tuned
oracle of `research/two-class-lower-bounds.js` finds the covering optimum is a
separate question already settled the other way in `research/REFUTED.md`, whose
row records it as exact at 13 of 13 and 14 of 14 sealed-scope terms but 1 of
8 on the published optima `x = 47 … 79`. The plain greedy run here is a different and
weaker algorithm, chosen because it is the one the guarantees attach to; it is
not offered as an oracle and its shortfalls at `x = 31` and `x = 37`, 345 of 348
and 523 of 528, are consistent with that record rather than in tension with it.

Nothing here says anything about `G₂`'s growth. The ladder stops at `x = 79`
because A144311 does, and the argument's floor `1 − ∏(1 − 2/p)` only rises with
`x`, so no larger level can be the one where the certificate starts firing.

## 8. Reproduction

```
node research/row11-closure-01-coverage.js        # 0.1 s, the whole ladder
```

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
