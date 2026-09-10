# Red team: the argmax note's positions, its nulls, and its scoring

<!-- ledger
id: Q-redteam-0904-argmax
status: ANSWERED
todo: none
question: Does measure-0904-argmax.md survive an adversarial re-derivation of its positions, its congruence null, its residue chi-square and its own pre-registration scoring?
verdict: Every positional number in the note reproduces exactly on an independent fold-replication engine at x = 11..31, including the argmax lists, m(x), the top-K sizes and components, the per-prime pair counts, the tail counts and the F6 drops, so the note's data survive. What does not survive is three things and the largest is the null: two random TWIN SLOTS are congruent modulo W/p with probability (p-3)/(D-1), not 1/M, so the note's "10^6 to 10^8 times the uniform null" is inflated by 6.9 to 29.1 at these levels and should read 10^4 to 10^6, and the statistic is not a random variable at all but a deterministic function of each window (translate lemma, proven here and checked against every argmax pair count), which makes a null ratio a category error rather than a small correction; the note's own "58 to 82 per cent are translates of another" reports K - components when its wording needs K - isolated, which is 83 to 98 per cent; and the custody table in §2 quotes a code-sha256 (3019147f...) that the producer does not carry (d53a3fd1...), while §2's body and §5(5) still describe a widths annotation the rider says was already deleted. The scoring is faithful in verdict and wrong in arithmetic: F3 and F7 are scored at four levels, not five, so F7's falsifier fired at three scored levels and F3's tally is 2 of 4; the brief's "three of eight" does not exist on disk, both the ledger and §0 say four, and four is right. The exponent is untouched and nothing here is a route.
-->

*(Producer `research/history/staging/redteam-0904-argmax.js`, one OUTPUT tail,
255 lines, 98.3 s, `code-sha256 2edf24a77e7ec0b8…`, `out-sha256
acd910a1635fc568…`, bound by `node research/qc/embed.js`, and
`node research/qc/embed.js --check` re-runs it and returns `out-sha256 matches`,
which it can because the producer prints no wall clock anywhere. HELD, internal,
publication moratorium in force. Target:
`research/history/staging/measure-0904-argmax.md` and its producer. Verdict
label **(i)** on every line: measurements on a finite object at `x ≤ 31`,
decidable by enumeration. Nothing below bears on the exponent, on the band
`(2, 4.26645]`, or on any infinitude statement.)*

## 0. What is wrong first

**The null is mis-specified, and not by a factor that a sentence can absorb.**
The note prices its central new fact against `C(K,2)/M`, the chance that two
uniform INTEGERS modulo `W` differ by a multiple of `M = W/p`. The objects are
not integers, they are twin slots. For `p ≥ 3` and a twin slot `s`, the `p`
translates `s + kM` agree with `s` modulo every prime `q ≠ p` and run over all
`p` residues modulo `p`, so exactly `p − 2` of them are twin slots. Counting
ordered pairs gives `D(p−3)`, so two uniform twin slots are congruent modulo
`M` with probability `(p−3)/(D−1)`, not `1/M`. That is **PROVEN** in three
lines (producer header, CONGRUENCE-TRANSLATE section) and **verified by
exhaustive enumeration** at `x = 11, 13, 17, 19`, all 26 rows agreeing to the
integer (SEC E). The correction is a factor `(p−3)/p · W/D`, measured at
**6.9 to 29.1** across the levels (SEC D, `slots/unif` column). So the note's
`10⁶` to `10⁸` becomes `10⁴` to `10⁶`: at `x = 31` the largest ratio falls from
`3.42·10⁷` to `1.29·10⁶`, at `x = 29` from `1.04·10⁶` to `4.49·10⁴`.

**And the correction is the smaller half of the problem.** The number of exact
congruence translates of a window is not a random variable. For a gap
`[s, s+g]` and a prime `p`, the shift by `kM` fixes the window's kill pattern
at every `q ≠ p`, so the translate is a gap of exactly the same length if and
only if the two endpoints avoid `{0, −2}` after the shift and every interior
offset killed by `p` ALONE lands back in `{0, −2}`. That is a deterministic
`O(g·π(x))` computation. Running it and halving the sum reproduces the observed
argmax pair counts exactly at all seven levels: `2, 10, 14, 22, 0, 0, 0` at
`x = 11, 13, 17, 19, 23, 29, 31` (SEC F). Quoting a p-value-shaped ratio against
a placement null for a quantity that a three-line lemma computes is a category
error, not a calibration slip. The phenomenon is real and it is reproduced here
in full; what is wrong is the way it is priced.

**The note's own headline sentence measures a different quantity from the one
it words.** "58 to 82 per cent of near-maximal windows ARE exact congruence
translates of another" is computed as `K − components`, which is the number of
redundant copies, one representative per family removed. The number of windows
that actually have a congruence partner is `K − isolated`, and it is larger:
**98.1, 95.9, 93.0 and 83.1 per cent** at `x = 19, 23, 29, 31` against the
note's 82.1, 69.9, 65.6 and 57.6 (SEC D). The note understates its own
measurement while attaching the wrong quantity to the claim.

**The custody table in §2 does not match the producer on disk.** It states that
all three tails carry `code-sha256 3019147f2faa358a…`. Recomputing the hash
with `research/qc/tailfmt.js` over the bytes above the first tail gives
`d53a3fd1ace221b8…`, and that is what all three tails record (SEC K). The three
`out-sha256` prefixes the note quotes are all present and correct; only the code
hash is stale, left behind by the re-bind the §2 rider describes. Separately,
§2's body says the `// widths-ok` annotation "was NOT applied" and §5(5)
proposes applying it, while the rider two paragraphs later says it was deleted
and the tails re-bound. The annotation is absent from the file. §5's preamble
"Nothing below was applied" is therefore false for its own item (5).

**The pre-registration scoring is faithful in every verdict and wrong in its
arithmetic.** §1's custody paragraph and F9 both restrict F3 to F8 to the scored
levels `x = 19, 23, 29, 31`, with only F1 and F2 scored at `x = 37`. §0, §3b and
§3d then count `x = 37` among the scored levels for F3 and F7: "below 0.05 at
all five scored levels", "its own falsifier fired at four scored levels", and
the ledger verdict repeats the second. Corrected, F7's falsifier fired at
**three** scored levels (23, 29, 31) against a threshold of two, and F3's tally
is **2 of 4** (23 and 31) against a threshold of three. Neither verdict moves.
The brief's premise that the ledger says "three of eight" while §0 says four is
not what is on disk: both say four, and four is right.

**What survives, and it is most of the note.** Every positional number
reproduces exactly on an engine that shares no code and no method with the
target's. `G₂`, `m(x)`, the complete argmax position lists, `τ`-invariance with
zero fixed-point hits, the top-`K` sizes and component counts, every per-prime
exact-pair count printed at `x = 29` and `x = 31`, the `null(unif)` column to
its printed digits, `N(=G₂)`, `N(≥0.95G₂)`, `N(≥0.90G₂)`, `D^{0.05}`,
`D^{0.10}`, the second, third and fourth distinct gap values with their counts,
and the F6 drops. Agreement with `exact-g2-ladder.js`'s least attaining position
and `nmax` holds at all seven levels. [MEASURED, exhaustive over the whole
period at `x = 11..31`; `x = 37` was not run, so seven of the note's eight
levels are re-derived here and one is not.]

**Two things this red team did NOT check.** `x = 37` was out of the hour, so the
note's `x = 37` row, its `x = 41` price and its `top-124` statistics stand
unrechecked. That is one of the note's eight levels, and it is the one carrying
its largest quoted null ratio. And the note's kill-count correlation column, which is what its F3
falsifier turns on, was not recomputed here; the pinning verdict is examined for
well-posedness (SEC H, SEC I) and not for arithmetic.

## 1. The engine, and how independent it actually is

The target's producer is a **wheel-210 segmented striking sieve** on
`worker_threads`: a residue-major struck-flag buffer, two arithmetic
progressions per prime per wheel residue struck through modular inverses, shard
boundaries stitched in the main thread.

This producer does none of that. It carries the tile as a **gap word** (first
slot plus the cyclic list of differences) and builds level `x` by **fold
replication**: the `q` copies of `T_{x'}` inside `T_{x'q}`, with the two
forbidden residues struck by a running `r ← (r + g) mod q`. No bitmap, no wheel,
no modular inverse, no worker, no segment. `x = 31` is streamed from the stored
`T₂₉` gap word without materialising `6.23·10⁹` gaps. Independence from the
target is method-level, and a striking bug in the target cannot reach here.

**Disclosed rather than claimed away:** fold replication over a gap word is the
same METHOD FAMILY as `research/a3-01-misalignment-ledger.js`, which the target
also uses as a cross-check. This file shares no code, no constant table and no
statistic with it, and `a3-01` computes fold lineage, not the objects below.
Independence from `a3-01` is code-level only.

Self-tests, all `ok` at all seven levels (SEC A): slot count `= ∏_{3≤p≤x}(p−2)`,
`Σg = W`, gap count `= D`, maximum `=` the ladder value quoted from
`research/G2-STATE.md` §2 as an input. The largest value handled is
`W = 31# = 200,560,490,130` and the largest count `D(31) = 6,226,553,025`, both
below `2⁵³`. Runtime 98.3 s as `embed.js` measures it, almost all of it
`x = 31`. The producer prints no wall clock, so its block is byte-reproducible
under `--check`.

## 2. Item a, the multiplicity was already in the corpus: **CONFIRMED**

`research/exact-g2-ladder.js:31-46` carries an `nmax` column reading
`2, 2, 4, 12, 20, 20, 4, 2, 4, 2, 4, 8` at `x = 5..43`.
`research/measure-g2z2-0829.js:78-84` carries the identical table as TRUSTED
DATA 2, with the same least attaining positions. Both give `x = 19: 20`,
`23: 4`, `29: 2`, `31: 4`, `37: 2`, which is the note's table exactly, plus
`11: 4`, `13: 12`, `17: 20` at the lower levels. `research/ATTACKS3.md:72`
carries `2, 4, 12, 20, 20, 4, 2, 4 sites per fold` from
`a3-01-misalignment-ledger.js`.

`object-g2-read-0829.md:1000-1001` reads "Whether the positions are otherwise
generic, and whether the multiplicity grows, is unknown." The multiplicity half
of that is wrong, and the note is right to say so.

Independently re-derived here (SEC B): `m = 4, 12, 20, 20, 4, 2, 4` at
`x = 11..31`, least attaining positions `899, 731, 701, 659, 76166567,
1205437109, 8813641451`, every one agreeing with `exact-g2-ladder.js`'s
recorded pair. `τ`-invariance holds at all seven levels and neither fixed point
of `τ_{G₂}` is occupied at any of them. So the note's reproduction is itself
reproduced, now by a fourth engine at `x ≤ 31`.

**One overstatement.** §0 says the corpus holds the multiplicity "at every exact
level to `x = 43` in three places". `ATTACKS3.md:72` stops at `x = 31`; its
eight-term sequence is `x = 7..31`. Two of the three places reach 43, not three.

**A second, in the proposed fix.** §5(1) writes "The growth half is answered
too: the sequence does not grow." Twelve exact terms with no proof do not
answer whether a sequence grows. The defensible statement is that the
multiplicity does not grow over the twelve exact levels the corpus holds, with
minimum 2 attained at `x = 5, 7, 29, 37`.

## 3. Item b, τ-invariance and the argmax congruence pairs: **CONFIRMED**

SEC B and SEC C, at `x = 11, 13, 17, 19, 23, 29, 31`:

| x | m | τ-invariant | argmax at a fixed point | exact congruence pairs, by prime | total |
|---|---|---|---|---|---|
| 11 | 4 | yes | 0 | `p=11: 2` | 2 |
| 13 | 12 | yes | 0 | `p=11: 4`, `p=13: 6` | 10 |
| 17 | 20 | yes | 0 | `p=11: 4`, `p=13: 10` | 14 |
| 19 | 20 | yes | 0 | `p=11: 8`, `p=13: 10`, `p=19: 4` | **22** |
| 23 | 4 | yes | 0 | none at any `p ≤ x` | **0** |
| 29 | 2 | yes | 0 | none | **0** |
| 31 | 4 | yes | 0 | none | **0** |

The `x = 19` row matches the note's `p=11: 8, p=13: 10, p=19: 4`, total 22,
term for term. The zeros at 23, 29 and 31 match. The full argmax lists agree
(SEC B, second block); at `x = 31` they are `8813641451, 69494902091,
131065587689, 191746848329`.

**And the zeros are not a statistical fact, they are a computation.** SEC F,
second table: at `x = 23, 29, 31` the argmax windows produce `36, 20, 44`
`(window, prime)` cells; in `32, 18, 40` of them the offsets killed by `p` alone
use BOTH classes `0` and `p−2`, which forces the translate count to zero because
no single shift maps both classes back into `{0, p−2}`; and in the remaining
cells the endpoint conditions kill the rest. Zero cells out of 36, 20 and 44
admit a translate. So F7's outcome at `x ≥ 23` is decidable in a few thousand
operations per level and carries no distributional content.

## 4. Item c, the near-maximal congruence claim and its null: **WEAKENED**

**The measurement reproduces exactly.** The top-`K` set is defined in the target
producer as `KTOP = 100`, `topThr` = the largest gap value whose cumulative
count from the top reaches 100, floored at the scan threshold, and the set is
every gap of length `≥ topThr`. Reproduced (SEC D):

| x | topThr | topThr/G₂ | K | components | K − comps | note's pct | isolated | K − isolated | correct pct |
|---|---|---|---|---|---|---|---|---|---|
| 19 | 138 | 0.9200 | 106 | 19 | 87 | 82.1% | 2 | 104 | **98.1%** |
| 23 | 180 | 0.8824 | 146 | 44 | 102 | 69.9% | 6 | 140 | **95.9%** |
| 29 | 222 | 0.8605 | 128 | 44 | 84 | 65.6% | 9 | 119 | **93.0%** |
| 31 | 306 | 0.8793 | 118 | 50 | 68 | 57.6% | 20 | 98 | **83.1%** |

`K` and the component counts match the note at every level (`top-106/19`,
`top-146/44`, `top-128/44`, `top-118/50`). The per-prime exact-pair counts match
every printed row: `x = 29` gives `p=13: 17, p=17: 21, p=23: 24, p=29: 24`, and
`x = 31` gives `p=17: 20, p=19: 20, p=31: 16`. The `null(exact)` column matches
to its printed digits (`1.63e−5`, `2.14e−5`, `2.89e−5`, `3.64e−5` at 29;
`5.85e−7`, `6.54e−7`, `1.07e−6` at 31).

**What is wrong is the null, on two levels.**

*First, the arithmetic.* The note's null is uniform placement of integers. A
translate by `W/p` of a twin slot lands on a twin slot exactly when the shift
preserves both classes modulo `p`, which is `p − 2` of the `p` translates, and
the brief's suspicion is right: the matched null is translates among random twin
slots, `(p−3)/(D−1)` per unordered pair. PROVEN in the producer header, and
verified by exhaustive enumeration of `D(p−3)` at `x = 11, 13, 17, 19` with all
26 rows exact (SEC E). The matched null is larger by `slots/unif` = 6.9 to 29.1
(SEC D). Worked at the two largest levels:

| x | p | observed | note's ratio | matched ratio |
|---|---|---|---|---|
| 29 | 13 | 17 | `1.04e+6` | `4.49e+4` |
| 29 | 29 | 24 | `6.59e+5` | `2.44e+4` |
| 31 | 17 | 20 | `3.42e+7` | `1.29e+6` |
| 31 | 31 | 16 | `1.50e+7` | `5.15e+5` |

So the headline "`10⁶` to `10⁸` times the uniform null" reads `10⁴` to `10⁶`
against the matched null over the levels re-derived here. That is one to one and
a half orders of magnitude, not the orders that would kill it. **The
qualitative finding survives; the number in the ledger verdict does not.**

*Second, and this is the one that matters.* Neither null is the right object.
By the translate lemma the exact-translate count of a window is deterministic,
so the correct question is not "how unlikely is this placement" but "how many
of these windows admit a translate at all", and SEC F answers it directly: the
sum of translate counts over the top set, halved, is `128, 122, 86, 72` at
`x = 19, 23, 29, 31`, and the observed exact-pair totals are `140, 141, 106, 86`
(the excess is pairs whose translate is a SHORTER gap that still clears
`topThr`, which the lemma does not count). `104 of 106`, `128 of 146`,
`114 of 128` and `94 of 118` top windows have at least one same-length
translate. That is the mechanism, stated as arithmetic and not as a p-value.
The note's own §6 row for this claim says "a null that is not uniform placement"
would falsify it and records the check as PARTLY run; the check is now run, and
the finding is that the statistic was never distributional.

## 5. Item d, the extreme tail and the model column: **CONFIRMED**

SEC G reproduces the note's table row for row at the levels run:

| x | G₂ | N(=G₂) | N(≥0.95G₂) | N(≥0.90G₂) | D^0.05 | D^0.10 | obs/model | 2nd, 3rd, 4th distinct |
|---|---|---|---|---|---|---|---|---|
| 11 | 42 | 4 | 4 | 4 | 1.28 | 1.63 | 2.45 | 36×4, 30×22, 24×6 |
| 13 | 66 | 12 | 12 | 24 | 1.44 | 2.08 | 11.56 | 60×12, 48×20, 42×84 |
| 17 | 108 | 20 | 20 | 20 | 1.65 | 2.72 | 7.35 | 96×22, 90×24, 84×12 |
| 19 | 150 | 20 | 20 | 106 | 1.90 | 3.61 | 29.34 | 138×86, 132×26, 126×48 |
| 23 | 204 | 4 | 6 | 34 | 2.21 | 4.90 | 6.94 | 198×2, 192×8, 186×20 |
| 29 | 258 | 2 | 2 | 22 | 2.61 | 6.81 | 3.23 | 240×8, 234×12, 228×22 |
| 31 | 348 | 4 | 4 | 72 | 3.09 | 9.54 | 7.55 | 330×34, 318×34, 312×10 |

The threshold rule is `g ≥ ceil(αG₂)`, which is what the target uses. `x = 37`
was not run here, so the note's `528: 2, 510: 4`, `N(≥0.90G₂) = 6` of
`217,929,355,875` is **not re-derived**. It is the only level of the eight left
unchecked by this red team.

**The model column is `D^{1−α}`**, from the note's F5 Poisson tail with
`λ = ln D / G₂`: `D^{0.05}` pairs with `α = 0.95` and `D^{0.10}` with
`α = 0.90`. The note does not claim it predicts anything. §3c says the model
"carries no predictive content at these sizes" and §6's second recorded defect
says F5's band was drawn from a model the same run measures to be useless. Both
readings are supported here: `obs/model` at `α = 0.90` runs 2.45, 11.56, 7.35,
29.34, 6.94, 3.23, 7.55 with no trend. One thing the note does not say and could:
the model is calibrated so that `α = 1` returns `D⁰ = 1`, while the measured
`N(=G₂)` is 2 to 20, so it is already wrong by the multiplicity at the point it
is anchored.

F5's falsifier firing is confirmed: `N(≥0.90G₂) = 72` at `x = 31` is outside the
registered band `[3, 40]`, and 106 at `x = 19` falls to 34 at `x = 23`, a factor
3.1 between consecutive levels above `x = 17`. `N(≥0.95G₂)` stayed in `[1, 12]`
at 29 (2) and 31 (4). F6's drops are 12, 6, 18, 18 at `x = 19, 23, 29, 31`,
exceeding the forecast 12 at three of four scored levels and never reaching the
falsifier's 30, which is what the note reports.

## 6. Item e, pre-registration honesty: **WEAKENED on arithmetic, CONFIRMED on verdicts**

**The premise in the brief is not on disk.** `grep` returns no "three of eight"
anywhere in the note. The ledger verdict line reads "four of eight
pre-registered forecasts failed (F3, F5, F6, F7) and two falsifiers fired (F5,
F7)"; §0 reads "four of the eight pre-registered forecasts failed". The two
agree. **Four is the right reading:** F1 (parity), F2 (size), F4 (gross
position) and F8 (gross clustering) held; F3, F5, F6 and F7 failed their
forecast clauses. F5's and F7's falsifiers fired; F3's and F6's did not.

Checked against the sealed wording in §1b and against the OUTPUT block:

| forecast | sealed clause | outcome | scoring faithful |
|---|---|---|---|
| F1 | `m` even at every scored level, no argmax at a fixed point of `τ_{G₂}` | held, re-derived at 11..31 | yes |
| F2 | `m ≤ 48`, not increasing at all three steps | held, `20→4→2→4→2` | yes |
| F3 | summed p `≥ 0.05` at every scored level, no prime below `0.05/π(x)` | failed | yes on the verdict, no on the level count |
| F4 | KS of `s/W` uniform, falsifier at 3+ levels below 0.05 | held, no level below 0.05 | yes |
| F5 | `N(≥0.9G₂) ∈ [3,40]` at 29 and 31; `N(≥0.95G₂) ∈ [1,12]`; both rise | failed, falsifier fired twice | yes |
| F6 | `G₂ −` second distinct `≤ 12` at every scored level | failed at 3 of 4; falsifier (30) did not fire | yes |
| F7 | at least one exact argmax congruence pair at each of 19, 23, 29, 31 | failed; falsifier (zero at 2+ levels) fired | yes on the verdict, no on the level count |
| F8 | min spacing and short-spacing count agree with the mirrored uniform null | held | yes |

**The one defect, twice.** §1 fixes the scored levels for F3 to F8 at
`x = 19, 23, 29, 31`, and F9 restates it: "Only F1 and F2 are scored at
`x = 37`." §0 and §3d nevertheless say F7's falsifier "fired at four scored
levels", counting `x = 37`; the correct count is three. §3b says F3's top-thin
p-value is "below 0.05 at all five scored levels" and tallies the kill-count
majority over five, including `x = 37`; the correct tally is 2 of 4. Both
verdicts are unaffected, since F7 needed two and got three, and F3 needed three
and got two either way. The ledger verdict carries the F7 version of the error.

**F5's forecast has a clause the note does not score.** "Both rise overall from
`x = 11` to `x = 31`" is false for `N(≥0.95G₂)`, which reads 4 at `x = 11` and 4
at `x = 31`. It does not change the verdict, F5 having already failed.

**One thing the note gets right and should keep.** §1's disclosure that the
engine was validated against brute force at `x = 7, 11, 13, 17` before the seal,
that the multiplicities and the `x = 13` congruence structure were SEEN, and
that F7 was written after seeing them, is the kind of custody statement that
makes the F7 result readable. The seal's timing custody is separately limited by
the rider, and the rider says so.

## 7. Item f, the residue chi-square: **WEAKENED**

**Well-posedness first, because the obvious objection does not bite.** Expected
cell counts on the row the note reads for pinning are far below 5:
`min E = 0.19` at `x = 19`, `0.72` at 23, `0.56` at 29, `1.22` at 31 (SEC H),
and the per-prime expectations run `p5: 6.33` down to `p19: 1.19` at `x = 19`
and `p31: 1.85` at `x = 31`. This is **not** a defect. Neither the note nor this
producer uses the asymptotic Pearson distribution or any degrees of freedom; the
p-value is Monte-Carlo, calibrated under the same `A_p(g)` null the statistic is
measured against, so it is exact up to replicate noise whatever the cell counts
are. Recorded here so the reading is not over-corrected.

**The rejection reproduces.** An independent implementation, cells the union of
`A_p(g)` over the set, `E = Σ 1/|A_p(g)|`, statistic summed over `5 ≤ p ≤ x`,
Monte Carlo with 20000 replicates and NO mirror pairing (the note's pairing
reduces the effective draws and makes rejection harder, so this test is the more
liberal one):

| x | set | n | p(tot), this engine | note's p(tot) |
|---|---|---|---|---|
| 19 | top-thin | 19 | 0.04400 | 0.04060 |
| 23 | top-thin | 44 | 0.00140 | 0.00155 |
| 29 | top-thin | 44 | ≤ 5.0e−5 | 0.00005 |
| 31 | top-thin | 50 | ≤ 5.0e−5 | 0.00005 |

So the note's `p ≤ 0.0016` at `x = 23, 29, 31` is confirmed on independent code.

**Three defects, in order of size.**

1. **The control is scored against a mismatched null.** The producer computes
   `cP = pval(mc.tots, chi2(ctl, r.x).tot)`, where `mc.tots` is the Monte-Carlo
   null distribution built from the REAL set's gap multiset and its mirror
   pairing, while the control is drawn with `g = G₂` for every element and is
   not mirror-paired. For the `top-K` and `top-thin` rows the real set has many
   distinct `g`, so its cell union is larger and its chi-square lives on a
   different scale; the control's smaller statistic is then read against the
   larger null, and the bias runs toward reassurance. Rebuilt with a control
   scored against its OWN matched Monte-Carlo null, 2 of the 19 rows tested here
   fall below 0.05 (`x = 19` top-thin, 0.0207; `x = 23` argmax, 0.0257), which is
   the nominal false-positive rate for a valid test. **The note's conclusion
   survives** (the pipeline does not manufacture rejections) **and its control
   p-values do not** (0.211 to 0.995 at every row is an artefact of the scale
   mismatch, not evidence of an unusually quiet control). The range itself is
   also quoted two ways: §0 and §3b say "0.211 to 0.995", §2's checklist says
   "0.211 to 0.999", and 0.995 is the largest value in the producer's own
   control column. §2's figure is wrong.
2. **`0.00005` is a floor, not a value.** With 20000 replicates and
   `p = (c+1)/(n+1)` the smallest attainable p-value is `1/20001 = 5.0·10⁻⁵`.
   §0 reports "Monte-Carlo p-values of `0.00155, 0.00005, 0.00005, 0.00005`" and
   §3b's table prints `0.00005` in eighteen cells, nine in `p(total)` and nine in
   `p(prime)`. Every one of those means
   "`≤ 5.0·10⁻⁵`". The distinction matters because the note also compares those
   entries against `0.05/π(x)`, which at `x = 37` is `0.00417`, so the
   comparison is safe; but reporting a censored value as a measurement is the
   kind of thing this repository's own rules forbid elsewhere.
3. **Multiple comparisons are corrected across primes only.** The `0.05/π(x)`
   column is a Bonferroni over the primes inside one row. There is no correction
   across the four sets or the five levels. Fourteen printed rows would need
   `p ≤ 0.05/14 = 3.57·10⁻³` for a family-wise 0.05, which the top-thin rows at
   29, 31 and 37 clear and `x = 23`'s 0.00155 clears, while `x = 19`'s 0.0406
   does not (SEC I). The note's pre-registered "three or more scored levels"
   rule is itself a multiplicity guard, so this is a reporting gap rather than an
   inference error.

**Does the pinning scoring follow the sealed rule?** Yes on the rule as written,
no on the count. The sealed falsifier needs a summed p below 0.05 at three or
more scored levels TOGETHER WITH the kill-count correlation not positive at a
majority of primes. On the top-thin row that is `x = 23` and `x = 31`, two
levels of the four F3 is scored at. The note reaches the same verdict by
counting five levels and getting two, which is right by accident. And the note's
own §6 records the real problem: the rule never said which of the four reported
rows scores it, and `argmax` and `top-thin` disagree. That admission is correct
and should stay.

## 8. Item g, §4's language: **REWORD, three sentences**

No sentence in §4 uses route language. The section opens by fixing verdict label
**(i)** on every line, closes with "What none of this does", and says plainly
that a congruence family "is a statement about which windows are translates of
which, not a bound on any of them". `grep` finds no claim of a route, a bound,
or an infinitude consequence. Three sentences still read above their rung.

1. §4, second bullet: *"That says something specific about what an argument
   would have to control: at a threshold slightly below `G₂` the objects to
   control are not `W` independent positions but a much smaller number of
   congruence families."* This is a design constraint on a hypothetical argument,
   asserted from seven levels with no statement holding at any larger `x`. It is
   the closest thing in the note to route language. **Reword:** "At the levels
   measured, `x ≤ 37`, the near-maximal windows at a threshold slightly below
   `G₂` fall into `19 to 50` congruence families rather than `K` independent
   positions. Whether that persists is not measured and not derived.
   [MEASURED at seven levels; no extrapolation.]"
2. §4, same bullet: *"The two halves point in opposite directions and the run
   does not reconcile them."* Superseded. Both halves are the same deterministic
   criterion: the translate count of a window is fixed by which classes its
   only-`p` interior kills occupy, and at `x ≥ 23` every argmax `(window, prime)`
   cell fails it (SEC F). **Reword:** "The two halves are computed by the same
   deterministic criterion (the congruence-translate lemma), so they are not in
   tension; whether the criterion is systematically stricter for maximal windows
   is not established at `m = 2` to `4`."
3. §4, first bullet: *"An L¹ count over positions therefore pays the whole width
   against a multiplicity of 2, and the run gives no reason to expect that to
   improve at larger `x`."* The first clause is fine at the levels measured; the
   second is an extrapolation from twelve terms and carries no rung.
   **Reword:** add "[HEURISTIC, from twelve exact terms]" to the second clause,
   or drop it.

One more, in §0 rather than §4: *"it is as lossy as the corpus's §4a reading
supposed"* asserts that a supposition was confirmed. At `x = 37` the maximum
sits at 2 of `7.42·10¹²` positions, which is a measurement; whether it confirms
§4a's supposition is a reading, and should be marked as one.

## 9. Item h, the six proposed live-layer changes

| # | target | verdict | what to change |
|---|---|---|---|
| 1 | `object-g2-read-0829.md:1000` | **REWORD** | The core is right and verified three ways. Two corrections to the proposal: `ATTACKS3.md:72` carries the sequence only to `x = 31` (its eight terms are `x = 7..31`), so say "two of the three sources reach `x = 43`"; and replace "the sequence does not grow" with "the multiplicity does not grow over the twelve exact levels the corpus holds, minimum 2 at `x = 5, 7, 29, 37`" |
| 2 | `object-g2-read-0829.md:1005` | **SURVIVES verbatim** | Verified: `research/QUESTIONS.md` returns zero hits for "argmax" and zero for "position of the maximum", `Q-attacks3-uframe`'s verdict line carries no multiplicity, and `ATTACKS3.md` carries one `<!-- ledger -->` block and no `Ledger:` pointer. The grep is correct as stated and cannot see a fact living in an attack file's landed paragraph. The proposed fix (extend the verdict, or add the pointer) is the right one |
| 3 | `a3-01-misalignment-ledger.js:371-373` | **SURVIVES verbatim** | Confirmed independently: the full 20-element argmax sets at `x = 17` and `x = 19` are `τ_{G₂}`-invariant with no fixed-point hit (SEC B), from a second engine. The "assumption, not a measurement" line can record that the assumption held when measured, twice |
| 4 | `G2-STATE.md:410-414` and `object-g2-read-0829.md:287` | **REWORD** | `G2-STATE.md:410-414` is cited correctly. `object-g2-read-0829.md:287` is the certificate table's HEADER row; the `x = 37` row is `:289`. And the new row should say what the independence is: the target's engine is method-independent of the two exact-ladder producers and is brute-force validated only at `x ≤ 17`. This red team adds a further exhaustive certificate at `x = 11..31` from a fold-replication engine, which the row can name alongside |
| 5 | `measure-0904-argmax.js:235`, the widths annotation | **REFUTED as written** | The annotation is absent from the producer; the §2 rider says it was deleted and all three tails re-bound. §5(5) proposes a change that no longer exists, §2's body still says it "was NOT applied", and §5's preamble "Nothing below was applied" is false for this item. The live-layer action is to fix §2 and delete §5(5), not to apply anything. Also fix §2's `code-sha256`: it reads `3019147f2faa358a…` and the producer carries `d53a3fd1ace221b8…` (SEC K) |
| 6 | `object-g2-read-0829.md:560` (L8), the `x = 41` price | **REWORD** | The figure is not reproduced here: `x = 37` was not run, and this engine cannot reach `x = 41` at all (it would need the `T₃₁` gap word, 12.4 GB, and `9.4·10¹²` inner steps). Record it as "5.65 to 6.49 h across two runs of `measure-0904-argmax.js` on eight cores of one laptop, extrapolated from measured throughput, never run", so a future wave prices from an engine and a machine rather than from a bare number. The `TODO.md:791` citation in §5(6) is also off: the arithmetic-ceiling item is `TODO.md:798-801`; line 791 sits inside item 1d's Records paragraph |

## 10. What would falsify this red team

| claim | rung | falsifier | did the check run |
|---|---|---|---|
| the argmax sets, `m(x)`, top-`K` sets and tail counts at `x = 11..31` | MEASURED, exhaustive over the whole period | a fifth engine disagreeing on any position or count | RAN, four self-tests per level plus agreement with `exact-g2-ladder.js`'s least position and `nmax` at all seven levels. No disagreement |
| the matched null is `(p−3)/(D−1)` per pair | PROVEN, three lines | the enumerated count of ordered congruent slot pairs differing from `D(p−3)` | RAN, exhaustively at `x = 11, 13, 17, 19`, 26 rows, all exact |
| the exact-translate count of a window is deterministic | PROVEN, one lemma | the halved sum of translate counts differing from the observed argmax pair count | RAN at all seven levels: `2, 10, 14, 22, 0, 0, 0` both ways. For the top-`K` sets the lemma count is a LOWER bound by construction (a translate can be a shorter gap that still clears `topThr`), and it is: `128 ≤ 140`, `122 ≤ 141`, `86 ≤ 106`, `72 ≤ 86` |
| the note's chi-square rejection is not a pipeline artefact | MEASURED, WEAK | a correctly-matched control rejecting systematically | RAN: 2 of 19 rows below 0.05, the nominal rate. But the control is drawn at a single seed per row and this producer's Monte Carlo was not re-run at a second seed, exactly the gap the target records for itself |
| §2's `code-sha256` does not match the producer | MEASURED, mechanical | the hash recomputing to the quoted prefix | RAN, `research/qc/tailfmt.js` over the bytes above the first tail (SEC K) |
| the note's `x = 37` row | NOT CHECKED | running `x = 37` on this engine | DID NOT RUN. `x = 37` is out of the hour and out of this engine's memory shape; one of the note's eight levels stands unrechecked here |
| the F3 kill-count correlation column | NOT CHECKED | recomputing `kill(p, c, G₂)` and the Pearson correlation | DID NOT RUN. The pinning falsifier turns on this column and this red team examined only its well-posedness and its level count |
| this red team's own multiplicity | MEASURED | a Bonferroni over its own 21 nominal SEC H rows | The two control rejections at 0.021 and 0.026 do not survive `0.05/21 = 2.4·10⁻³`, which is the point: they are noise, and they are reported as noise |

**The one thing that would change the reading here.** Running `x = 37` on a
second engine would close the one unrechecked level, which is the `top-124` row
carrying the note's largest quoted null ratio. Nothing in this red team
needs `x = 41`.
