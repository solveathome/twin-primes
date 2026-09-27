# Pre-registration: IMPORT-MAP row 11, the (1 − 1/e) certificate

<!-- ledger
id: Q-row11-closure-prereg
status: OPEN
todo: none
question: Does IMPORT-MAP row 11's (1 - 1/e) certificate reproduce, and does its test ever fire?
verdict: Pre-registration only, hand-written and committed before its producer existed: the claim being reproduced, what the producer must return, the pass criteria and the disclosed leaks are all fixed here, with the killing arithmetic still living only in prose.
-->

*Hand-written, and committed alone before its producer
`research/row11-closure-01-coverage.js` exists. Staging layer; it edits no live
document, and in particular it edits neither `research/IMPORT-MAP.md` nor
`research/REFUTED.md`.*

## 1. The claim being reproduced

`research/IMPORT-MAP.md` §11 prices row 11 dead, and the arithmetic that kills
it lives only in prose, in the map and in
[import-map-construction.md](import-map-construction.md) §4(b):

> The achievable coverage of a long interval is `1 − ∏_{3≤p≤x}(1 − 2/p)`,
> computed here as 0.666667, 0.800000, 0.857143, 0.883117, 0.901099 at
> `x = 3, 5, 7, 11, 13` and 0.959010 at `x = 79`. It is above 0.632 at every
> level from `x = 3`, so the test never fires.

The object is the corpus's own covering optimum, stated as an identity in
`research/greedy-oracle-validation.js`'s header: `G₂(x#) − 1` is the largest `m`
for which `[1, m]` can be covered by choosing, for each prime `p ≤ x`, one
residue pair `{a_p, a_p − 2}` mod `p`, with `a_p` free. Coverage of a fixed
`[1, L]` is monotone submodular with `f(∅) = 0`; one pair per prime is a
partition matroid.

## 2. What the producer must return

**R1 — the six quoted figures.** `1 − ∏_{3≤p≤x}(1 − 2/p)` reproduces
0.666667, 0.800000, 0.857143, 0.883117, 0.901099 at `x = 3, 5, 7, 11, 13` and
0.959010 at `x = 79`, each to six decimal places.

**R2 — the full ladder.** The same quantity at every prime level `x = 5 … 79`,
increasing at every step, so that the minimum over the ladder is attained at
`x = 5` and the record's "never below 0.632" is a statement about one endpoint
rather than about 20 separate numbers.

**R3 — the thresholds, with their hypotheses attached.** The certificate fires
only if some algorithm with a proven ratio `α` returns coverage below `α·L`.
Three candidate `α` are computed and each is labelled with the constraint class
it is proven for, not with the constraint class row 11 needs:
`1 − 1/e = 0.632…`; the finite-`k` form `1 − (1 − 1/k)^k` with `k` the number of
primes at that level; and `1/2`. Which theorem owns which is settled in §3 of
the closure record and not here.

**R4 — the induction that makes R1 a bound on an ALGORITHM.** The record
compares an algorithm's coverage against 0.632 but states only the density of a
covered set. The step that licenses the comparison is one line: at each greedy
round the chosen pair's marginal gain is at least the average over the `p`
offsets, which is `(2/p)` times the uncovered count, so the uncovered count
after the round is at most `(1 − 2/p)` times the count before, and by induction
greedy's coverage of `[1, L]` is at least `L·(1 − ∏(1 − 2/p))` for **every** `L`,
not only for a long interval. The producer verifies this numerically by running
the plain greedy on real intervals at every level of the ladder and checking
its achieved coverage against the density bound.

**R5 — the decisive length.** The only `L` at which a certificate would ever be
run is the first uncoverable one, `L = G₂(x#)`, one above the covering optimum
`G₂ − 1` (OEIS A144311, 22 terms to `x = 79`, quoted from
`research/covering-dive.md` and never recomputed here). The producer reports
the plain greedy's achieved coverage fraction at exactly that `L` at every
level.

## 3. Pass criteria, fixed here

- **C1** R1 reproduces all six figures to 1e−6. A miss means the map's prose is
  wrong and the closure has to be rewritten around the corrected numbers.
- **C2** The ladder of R2 is strictly increasing at every step from `x = 5` to
  `x = 79`.
- **C3** The plain greedy's achieved coverage fraction at `L = G₂(x#)` is
  **above every threshold of R3** at every level `x = 5 … 79`, and is at or
  above the density bound of R4 at every level.
- **C4** The certificate's firing condition, coverage `< α·L`, holds at **no**
  level and for **no** `α` in R3.

The row closes as **dead, formally** if C1 through C4 all hold. If any of them
fails, the row is not dead and the map's pre-pricing is wrong, which is a
larger finding than the closure.

## 4. Disclosed leaks

- **The theorem was opened before this file was written.** Călinescu, Chekuri,
  Pál and Vondrák's own text was read at the authors' hosted PDF, and it is the
  source for which constant belongs to which paper and to which constraint
  class. That reading is not blind and is reported as sourcing, not as a
  result. The map's prose numbers had also been read.
- **A144311's terms are quoted, not recomputed.** They are exact optima and
  recomputing them is a multi-hour job the standing compute rule forbids here.
- **One convention question is open before the run and is called now**: the
  record's product runs over `3 ≤ p ≤ x` and omits `p = 2`, while A144311's own
  definition uses the first `n` primes and therefore includes it. Including
  `p = 2` can only raise the coverage, since the pair `{a, a − 2}` mod 2 is one
  class of density 1/2. So the record's figure is the conservative one and the
  closure is a fortiori either way. The producer prints both columns and the
  closure record states which convention each number is in.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
