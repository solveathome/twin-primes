# Where the maximum sits inside the tile, and with what multiplicity

<!-- ledger
id: Q-measure-0904-argmax
status: PARTIAL
todo: none
question: Where inside the tile is G2(x#) attained, with what multiplicity, and how thick is the near-maximal tail?
verdict: The multiplicity half was NOT open, and is reproduced here rather than found: exact-g2-ladder.js, measure-g2z2-0829.js and ATTACKS3.md already carry it at every level to x = 43, so object-g2-read-0829.md:1000's "unknown" is wrong. What is new, MEASURED exhaustively over the whole period at x = 11..37 by a third independent engine: the argmax set is tau-invariant with no fixed-point hit at all eight levels and carries ZERO congruence pairs from x = 23 up (refuting this note's own F7 at four scored levels), while 58 to 82 percent of the near-maximal windows ARE exact congruence translates of another by a multiple of W/p, at 10^6 to 10^8 times the uniform null; at x = 37 the maximum is 2 positions of 7,420,738,134,810 and only 6 gaps of 217,929,355,875 sit within 10 percent of it; four of eight pre-registered forecasts failed (F3, F5, F6, F7) and two falsifiers fired (F5, F7), and the exponent is untouched.
-->

> **RIDER 2026-09-04 (orchestrator, from `redteam-0904-argmax.md`).** Every
> positional number reproduces exactly on an independent fold-replication
> engine at x = 11..31 (argmax lists, m(x), top-K sizes and components, the
> per-prime pair counts, the tail counts); x = 37 was not re-run. Three
> corrections. (1) THE NULL: two random TWIN SLOTS are congruent modulo W/p
> with probability (p − 3)/(D − 1), not 1/M, so "10^6 to 10^8 times the
> uniform null" is inflated by 6.9× to 29.1× at these levels and reads 10^4 to
> 10^6; and the statistic is a deterministic function of each window (the
> translate lemma, proven in the red team and checked against every argmax
> pair count), so a null ratio is a category error rather than a small
> correction: the zeros in the argmax set are FORCED in 32 of 36, 18 of 20 and
> 40 of 44 (window, prime) cells by both only-p kill classes being present.
> (2) "58 to 82 per cent are translates of another" reports K − components;
> the wording needs K − isolated, which is 83 to 98 per cent. (3) Scoring
> arithmetic: F3 and F7 are scored at four levels, not five, so F7's falsifier
> fired at three scored levels and F3's tally is 2 of 4; four of eight
> forecasts failed, as §0 and the ledger say. Also: the residue chi-square's
> control is scored against the real set's mismatched null and is biased
> toward reassurance (a matched control gives 2 of 19 rows below 0.05, the
> nominal rate), "0.00005" is the Monte Carlo floor in 18 cells, and no
> correction across sets or levels was applied, so the pinning reading is
> WEAKENED to "rejects on independent code, control defective". §4's "what an
> argument would have to control" over-reaches; "the two halves point in
> opposite directions" is superseded by the translate lemma, which reconciles
> them. §5(1)'s "the sequence does not grow" is twelve terms, not an answer,
> and `ATTACKS3.md`:72 stops at x = 31, not 43. Nothing here is a route; the
> exponent is untouched.

*(Producer `research/history/staging/measure-0904-argmax.js`. HELD, internal,
publication moratorium in force. Answers `Q2` of
`research/history/staging/object-g2-read-0829.md` §8. Verdict label **(i)**: a
positional measurement on a finite object against a matched null. Nothing here
bears on the exponent, on the band `(2, 4.26645]`, or on any infinitude
statement.)*

## 0. What is open first

**What is wrong here first, and it is the largest thing in this note: M1 was
not an open question, and the note that posed it says it was.**
`research/history/staging/object-g2-read-0829.md:1000` states that whether the
multiplicity of `G₂` grows "is unknown". The corpus holds the multiplicity at
every exact level to `x = 43` in three places, none of them cited there:
`research/exact-g2-ladder.js:31-46` carries an `nmax` column,
`research/measure-g2z2-0829.js:78-84` carries the same table as TRUSTED DATA 2,
and `research/ATTACKS3.md:72` carries it as a landed measurement, "the record
is never attained at a unique place", with the sequence 2, 4, 12, 20, 20, 4, 2,
4 sites per fold, from `research/a3-01-misalignment-ledger.js`. The grep quoted at
`object-g2-read-0829.md:1005` was run against `research/QUESTIONS.md` only, and
`Q-attacks3-uframe`'s verdict line does not carry the multiplicity, so the
question index could not see it. **M1 of this wave is therefore a
reproduction, not a new fact**, and it is reported as one.

**Second: four of the eight pre-registered forecasts failed and two falsifiers
fired, including the forecast this note was most confident about.** F1, F2, F4
and F8 held; F3, F5, F6 and F7 failed; F5's and F7's falsifiers fired and F3's
and F6's did not. F7, the copying forecast, was written
after seeing the structure at `x = 13` and predicted at least one exact
congruence pair inside the argmax set at each of `x = 19, 23, 29, 31`. It fires
at `x = 19` and returns **zero** at `x = 23, 29, 31` and `37`, so its own
falsifier fired at four scored levels. F5's band failed at `x = 31` and its
monotonicity clause failed between `x = 19` and `x = 23`. F3's uniformity
forecast failed at every scored level on the near-maximal set. Nothing in this
note touches the exponent, the band `(2, 4.26645]`, or any infinitude
statement; every reading is verdict **(i)**.

**What the run does add, in order of how much it is worth.**

1. **The near-maximal windows sit in congruence families across folds, and the
   argmax positions do not.** [MEASURED, exhaustive, `n` = the whole period at
   seven levels.] Among the top-`K` near-maximal windows at `x = 31` there are
   **86 pairs** whose difference is an exact multiple of `W/p` for some prime
   `p ≤ x`, against a uniform null of `2.4·10⁻⁷` to `1.1·10⁻⁶` per prime, and
   the 118 windows fall into **50** congruence components. At `x = 37` there
   are 98 such pairs against nulls of `7·10⁻⁹` to `4·10⁻⁸`, and 124 windows
   fall into **46** components. The argmax set itself has zero such pairs at
   every level from `x = 23` up. So the fold structure is visible in the
   shoulder of the distribution and absent at its tip.
2. **The maximum is attained at 2 positions out of `7.42·10¹²` at `x = 37`, one
   mirror pair, and 6 gaps out of `2.18·10¹¹` lie within 10% of it.**
   [MEASURED, exhaustive; the multiplicity itself was already on file, the
   near-maximal count is new.] That is the quantitative form of the quantifier
   killer's own coordinate, and it is as lossy as the corpus's `§4a` reading
   supposed.
3. **The residues of near-maximal left endpoints are strongly non-uniform on
   the endpoint null even after the congruence structure is thinned out, at
   `x = 23, 29, 31, 37`**, at Monte-Carlo p-values of `0.00155, 0.00005,
   0.00005, 0.00005`, while the matched control (rejection-sampled real
   positions with the same two endpoint conditions, same `n`, same pipeline)
   returns `0.321, 0.969, 0.942, 0.211`. The elementary kill-count explanation
   covers this at `x = 29` and `x = 37` and does not at `x = 23` and `x = 31`.
   [MEASURED. The pre-registered pinning falsifier needs three levels with both
   conditions and gets two, so it did NOT fire; the rule did not say which of
   the four reported rows scores it, and that under-specification is this
   note's own defect, recorded in §6.]
4. **A third independent exhaustive certificate** for `G₂` at
   `x = 19, 23, 29, 31, 37`, from a wheel-210 engine sharing no code with
   `05b-twin-jacobsthal-segmented.js`, `a3-01-misalignment-ledger.js` or the
   `scanstat-t37` engine, with the slot count against `∏(p−2)`, the gap sum
   against `W`, the gap count against the census and the maximum against the
   ladder all exact at every level.

**The ledger verdict, in one line:** the multiplicity question was already
answered in the corpus and is reproduced here; what is new is that near-maximal
windows are congruence translates of each other across folds at `10⁶` to `10⁸`
times the uniform null while the argmax set is not, and that at `x = 37` the
maximum is 2 positions out of `7.42·10¹²` with 6 gaps within 10 percent.

## 1. Pre-registration, written before the producer had ever been run

**Custody, stated without appeal to git.** The producer carries three OUTPUT
tails. Tail 1 is `--stage seal`: it prints the forecasts and the falsifiers
below, the quoted ladder, the model figures behind F5 and the null's own
definition, and it computes nothing about positions. Tails 2 and 3 are
`--stage run`. Every tail carries the same `code-sha256`, because `embed.js`
hashes the bytes above the FIRST tail for every tail of a multi-tail file, so
the code that produced the runs is byte-identical to the code that printed the
seal. Tail 1 was bound before either run tail existed, and each tail's
`embedded:` and `elapsed:` fields are in the file.

**What that custody statement does NOT cover, said plainly and first.** The
engine was developed and validated against a brute-force full-period sieve in a
scratchpad directory outside this repository before the seal was bound. That
validation ran at `x = 7, 11, 13, 17` and it agreed with brute force on the
slot count, the whole gap histogram, the maximum and the argmax set at all
four. In doing so it PRINTED the multiplicities `m(7#) = 2`, `m(11#) = 4`,
`m(13#) = 12`, `m(17#) = 20` and the argmax positions, and reading those
positions showed that several argmax positions at `x = 13` differ by exactly
`W/11 = 2730`. **Those four levels are SEEN**, the forecasts below were written
after seeing them, and no forecast is scored at any of them. The scored levels
are `x = 19, 23, 29, 31` for F1 to F8 and `x = 37` for F1 and F2. Nothing at
`x ≥ 19` was run in any form before the seal tail was bound.

### 1a. The objects

`W = x#`. A twin slot is `s` with `gcd(s, W) = gcd(s + 2, W) = 1`, that is `s`
not congruent to `0` or `−2` modulo any `p ≤ x`. The census is
`D = ∏_{3≤p≤x}(p − 2)`. Gaps are taken cyclically, so there are exactly `D` of
them and they sum to `W`. `G₂(x#) = max gap`, quoted from `research/G2-STATE.md`
§2 and used only as a threshold input and a self-test, never recomputed as a
claim. The **argmax set** is the set of LEFT endpoints `s` of gaps of length
`G₂`, and `m(x)` is its size.

**The mirror, derived here so the parity forecast is checkable.**
`σ(s) = W − 2 − s`. If `s` is a twin slot then `gcd(W − 2 − s, W) = gcd(s + 2, W) = 1`
and `gcd(W − s, W) = gcd(s, W) = 1`, so `σ(s)` is a twin slot; `σ` is an
involution and reverses the cyclic order, so it carries the gap `[s, s + G]` to
the gap `[W − 2 − G − s, W − 2 − s]`. The induced action on LEFT endpoints is
`τ_G(s) = W − 2 − G − s (mod W)`, the set of left endpoints of gaps of any fixed
length `G` is `τ_G`-invariant, and `τ_G` has exactly two fixed points modulo `W`,
at `(W − 2 − G)/2` and that plus `W/2`, both integers since `W` and `G` are
even. [PROVEN, one line, from the Mirror-Sweep Lemma the corpus already holds.]

**The null, and why the obvious one is wrong.** A left endpoint `s` of a gap of
length `g` satisfies TWO slot conditions, not one: `s` is a twin slot and `s + g`
is a twin slot. So modulo `p` its residue avoids FOUR classes, `0, −2, −g, −g−2`,
not two. The minimal honest null is therefore uniform on
`A_p(g) = Z/p ∖ {0, −2, −g, −g−2}`, independently across primes, which is exact
by CRT for the two endpoint conditions. `A_p(g)` is closed under the involution
`c ↦ −2−g−c` induced by `τ_g`, so the mirrored null is well defined on it.
Testing against the two-class null instead rejects trivially, because `s + g`
being a slot is part of the definition of a gap. This correction was made before
the seal, after the first draft of the producer used the two-class null.

**What the null still ignores, so a rejection is not over-read.** `A_p` carries
the two endpoint conditions and nothing about the window interior, which must be
entirely non-slot. Two things can therefore reject it without any positional
pinning being present. The first is the elementary kill count
`kill(p, c, g) = #{1 ≤ j ≤ g−1 : c + j ≡ 0 or −2 (mod p)}`, a deterministic
function of the phase `c = s mod p`; phases that kill more make a long gap
easier. The second is the copying structure of F7: two argmax positions
differing by a multiple of `W/p` agree modulo every prime except `p`, so their
residues are not independent draws. The producer reports a **congruence-thinned**
row, one representative per congruence component, and that is the row to read
for pinning.

### 1b. The forecasts and their falsifiers, as sealed

The base rate here is the corpus's own: `Q-measure-g2-generic` (ANSWERED) found
`G₂` generic in the class-position coordinate at percentile 13.70 to 26.35, and
the honest prior is that the argmax is generic in the positional coordinate too.

**F1 (parity).** `m(x)` is even at every scored level, and no argmax left
endpoint equals a fixed point of `τ_{G₂}`.
*Falsifier:* any odd `m(x)`, or any argmax at a fixed point.

**F2 (size).** `m(x) ≤ 48` at each of `x = 19, 23, 29, 31`, and `m` is not
increasing at all three consecutive steps. Context, not a forecast: `2, 4, 12,
20` at the seen levels and `8` at `x = 43` from `Q-g2-43-term`, so the sequence
is already known to be non-monotone.
*Falsifier:* `m(x) > 48` at any scored level, or a monotone increase across all
of `19, 23, 29, 31`.

**F3 (residue classes).** Against the `A_p(g)` endpoint null with a mirrored
Monte Carlo, the residues of the argmax set and of the top-`K` set are uniform.
Forecast: the summed chi-square p-value is at least 0.05 at every scored level
and no single prime is below `0.05/π(x)`; and if that fails, the failure is
explained by the kill count, in the sense that the Pearson correlation between a
class's observed excess and `kill(p, c, G₂)` is positive at a majority of the
primes.
*Falsifier of the generic reading:* a summed p below 0.05 at three or more
scored levels WITH the kill-count correlation not positive at a majority of
primes. That is pinning, and it is the only positional coordinate an argument
could hold.

**F4 (gross position).** `s/W` over the top-`K` set is uniform on `[0,1)`,
tested by Kolmogorov-Smirnov against the mirrored uniform null. The argmax set's
mean position is forced to `(W − 2 − G₂)/2` by the mirror and carries no
information, so only the spread is tested.
*Falsifier:* a KS p-value below 0.05 at three or more scored levels.

**F5 (near-maximal tail).** With `λ = ln D / G₂` the Poisson tail model gives
`N(≥ αG₂) ≈ D^{1−α}`. Forecast: `N(≥ 0.9·G₂)` in `[3, 40]` at `x = 29` and
`x = 31` (the model reads 6.8 and 9.5), `N(≥ 0.95·G₂)` in `[1, 12]` there (2.6
and 3.1), and both rise overall from `x = 11` to `x = 31`.
*Falsifier:* either count outside its band at `x = 31`, or a fall of more than a
factor 2 between consecutive levels above `x = 17`.

**F6 (isolation).** `G₂` minus the second largest distinct gap value is at most
12 at every scored level.
*Falsifier:* a drop of 30 or more at any scored level. That is the outcome that
would matter: an isolated maximum standing 30 above a smooth tail is a single
distinguished position out of `W`, which is exactly where an L¹ count over
positions is most lossy.

**F7 (the copying test, named in advance).** `T_x` is the folded tile, so two
positions differing by a multiple of `W/p` agree modulo every prime except `p`.
Statistic: pairs `i < j` in a set whose difference is an exact multiple of `W/p`,
for each prime `p ≤ x`, and the same within `±G₂` of a multiple. Forecast,
informed by the seen level `x = 13`: the exact form FIRES, with at least one
exact-multiple pair inside the argmax set at each of `x = 19, 23, 29, 31`.
*Falsifier:* zero such pairs in the argmax set at two or more scored levels.

**F8 (clustering at gross scale).** Beyond the congruence structure of F7 the
top-`K` positions carry no clustering: the minimum spacing and the count of
spacings below `W/(10n)` agree with the mirrored uniform null.
*Falsifier:* a Monte-Carlo p-value below 0.05 at three or more scored levels.

**F9 (reach).** `x = 37` is attempted; `x = 41` and `x = 43` are priced and not
run. Only F1 and F2 are scored at `x = 37`.

### 1c. What is deliberately NOT claimed

None of F1 to F8 is a route. A null result on all eight is the expected outcome
and would say that killer 2's own coordinate is generic, which is a description
of a finite object and not a bound on it. A hit on F3, F6 or F7 is a fact about
a tile at `x ≤ 37` and carries no infinitude content. Nothing in this note bears
on the exponent or on the band `(2, 4.26645]`.

## 2. The producer and its check

`research/history/staging/measure-0904-argmax.js`, three OUTPUT tails bound by
`node research/qc/embed.js`, all three carrying the same `code-sha256`
`d53a3fd1ace221b8…` (the first embed's `3019147f2faa358a…` predates the
annotation deletion recorded in the rider below):

| tail | invocation | elapsed | out-sha256 |
|---|---|---|---|
| 1 | `--stage seal` | 0.1 s, 71 lines | `561419f722de5a55…` |
| 2 | `--stage run --levels 11,13,17,19,23,29,31` | 22.3 s, 215 lines | `7d77a93b06db6100…` (re-bound, see the rider below) |
| 3 | `--stage run --levels 37` | 525.8 s, 73 lines | `e3e990410c0b1aef…` (re-bound, see the rider below) |

Bound in that order: tail 1 before the code had ever been run at any level
above `x = 17`, tail 2 next, tail 3 last. `node research/qc.js` reports the
`embeds` check clean, which is what says each block hashes to its own record
and to the code above it.

**Method.** A wheel-210 segmented scan. Only the 15 residues of every 210 that
survive the twin conditions at `p = 2, 3, 5, 7` are stored; the primes `11..x`
are struck as two arithmetic progressions each, per wheel residue, per segment
of 65536 blocks. Shards are contiguous block ranges on eight
`worker_threads`; the gaps straddling a shard boundary and the wrap gap are
stitched in the main thread. All arithmetic is exact integer arithmetic in
doubles: the largest value handled is `W = 37# = 7.42·10¹²` and the largest
count is `D = 2.18·10¹¹`, both below `2⁵³ = 9.007·10¹⁵`. Measured throughput
14.17·10⁹ to 14.97·10⁹ positions/s at eight workers (tails 3 and 2 of the re-bound run; the first run read 14.43·10⁹).

**Checks that ran, and passed.**

- Engine validation against a brute-force full-period sieve at `x = 7, 11, 13,
  17`, before the seal: identical slot count, identical whole gap histogram,
  identical maximum, identical argmax set. That validation is what makes those
  four levels SEEN, and it is disclosed in §1.
- Per level, inside the producer: slot count `= ∏_{3≤p≤x}(p−2)`, `Σ g = W`,
  number of gaps `= D`, max `=` the quoted ladder value. All `ok` at all eight
  levels run (SEC A).
- The argmax set is `τ_{G₂}`-invariant at all eight levels, including `x = 17`
  and `x = 19`, where `a3-01-misalignment-ledger.js:371` records that its own
  12-site buffer truncated and the mirror pairing there "is an assumption, not
  a measurement". It is now a measurement, from a different engine.
- Cross-check against the corpus's recorded positions: the argmax positions
  agree exactly with `a3-01-misalignment-ledger.js`'s max-site lists at
  `x = 11, 13, 23, 29, 31`, with `05b-twin-jacobsthal-segmented.js`'s recorded
  `at r=1205437109` at `x = 29`, and with `exact-g2-ladder.js`'s least
  attaining position and `nmax` at every level to `x = 37`.
- The residue test's matched control: rejection-sampled real positions `s` with
  `s` and `s + G₂` both twin slots, same `n`, same chi-square, same Monte-Carlo
  calibration. It returns p-values 0.211 to 0.999 at every level and set,
  which is what says the rejections in SEC D are not a pipeline artifact.

**What was NOT checked.** No second implementation of the statistics in SEC D
to SEC H exists; only the scan engine is cross-validated. The Monte Carlo is
seeded and reproducible but was not run at a second seed.

**One gate finding is left standing on purpose, and it is this note's, not the
corpus's.** `node research/qc.js` reports `widths` with one finding:
`measure-0904-argmax.js:235`, `widths-ok-matches-nothing`. The annotation sits
as a trailing comment on `buf[j] = 1`, and the checker's five-line window
(`research/qc/checks.js:1586`) looks for `new …Array(`, a shift, a `*=` or a
bracketed product, none of which is on that line or the four below it. The
store itself is sound: `buf` is a `Uint8Array` holding a 0/1 struck flag, cap
255, and with the annotation deleted no GATED widths rule fires
(`narrow-store-over-cap` and `narrow-store-from-length` do not apply). The
one-line fix is to delete the annotation or move it onto
`const buf = new Uint8Array(SEGB * NR);`. **It was not applied because any byte
changed above tail 1 re-hashes all three tails, and re-binding them would
require `--force` on tails 2 and 3 (the throughput line in SEC I is a wall
clock the normaliser does not scrub) and would destroy the seal-before-run
ordering §1 rests on.** The trade is stated so whoever applies it can decide;
§5 carries it as a proposed change.

> **RIDER 2026-09-04 (orchestrator).** The dangling `// widths-ok` annotation
> at producer line 235 was deleted (the store it sat on is not a flagged
> pattern) and all three tails were re-bound the same afternoon: tail 1 with
> the SAME `out-sha256` `561419f722de5a55…` (the seal's content is unchanged),
> tails 2 and 3 with `--force`, where the only figures that moved are the
> wall clocks, the throughput and the `x = 41` price derived from it (3 of 531
> and 3 of 88 figures respectively, stamped `forced` in the tails). Every
> count, position, multiplicity and test statistic reproduced exactly. What
> this costs is TIMING custody only: the seal tail's `embedded` stamp is now
> after the run tails' in disk order, and the seal-before-run ordering of §1
> rests on the first embed, which git does not hold (the wave was not
> committed between the two embeds). Content custody is intact: the seal's
> hash is the first embed's hash. This is the same limit every sealed prereg
> in the corpus carries (`redteam-0830-floor-growth.md`, "a seal's TIMING is
> unverifiable by content hashes").


## 3. Readings, per measurement, each with its `n`

Every figure below is in the producer's OUTPUT blocks. `n` is the whole period
at each level: `D` gaps, with `D = 378675, 7952175, 214708725, 6226553025,
217929355875` at `x = 19, 23, 29, 31, 37` (SEC A, each checked against
`∏_{3≤p≤x}(p−2)`).

### 3a. M1, the multiplicity (F1, F2): REPRODUCTION, both forecasts held

| x | G₂ | m | even | τ-invariant | mirror pairs | at a fixed point | status |
|---|---|---|---|---|---|---|---|
| 11 | 42 | 4 | yes | yes | 2 | 0 | SEEN |
| 13 | 66 | 12 | yes | yes | 6 | 0 | SEEN |
| 17 | 108 | 20 | yes | yes | 10 | 0 | SEEN |
| 19 | 150 | 20 | yes | yes | 10 | 0 | scored |
| 23 | 204 | 4 | yes | yes | 2 | 0 | scored |
| 29 | 258 | 2 | yes | yes | 1 | 0 | scored |
| 31 | 348 | 4 | yes | yes | 2 | 0 | scored |
| 37 | 528 | 2 | yes | yes | 1 | 0 | scored |

**F1 held** at all five scored levels: `m` even, the set `τ_{G₂}`-invariant, no
argmax at either fixed point of `τ_{G₂}`. **F2 held**: `m ≤ 48` everywhere and
the sequence falls `20 → 4 → 2` and then moves `2 → 4 → 2`, so it is not
monotone. **[MEASURED, exhaustive, and a REPRODUCTION of
`exact-g2-ladder.js`'s `nmax` column and `ATTACKS3.md:72`'s sequence at every
one of these levels.]** The one thing the run adds is the `τ` check at `x = 17`
and `x = 19`, which `a3-01` could not make.

The argmax set at `x = 37` is `{544899485411, 6875838648869}`, and
`6875838648869 = W − 2 − 528 − 544899485411`, so it is exactly one mirror pair.

### 3b. M2, position (F3, F4)

**F4 held.** The Kolmogorov-Smirnov statistic of `s/W` against the mirrored
uniform null gives p-values, over argmax and top-`K` sets, of `0.206/0.451` at
`x = 19`, `0.196/0.855` at 23, `0.743/0.646` at 29, `0.793/0.954` at 31 and
`0.282/0.586` at 37. No level is below 0.05, so the gross position is
consistent with uniform. **[MEASURED; the sets are small, `n = 2` to `4` on
the argmax rows at `x ≥ 23`, so this is a weak test there.]**

**F3's uniformity forecast failed.** Chi-square against the `A_p(g)` endpoint
null, mirrored Monte Carlo, 20000 replicates:

| x | set | n | p(total) | worst prime | p(prime) | 0.05/π(x) | kill-corr | control p |
|---|---|---|---|---|---|---|---|---|
| 19 | argmax | 20 | 0.00005 | 5 | 0.00005 | 0.00625 | 3/5 | 0.824 |
| 19 | argmax-thin | 4 | 0.00135 | 19 | 0.02630 | 0.00625 | 4/5 | 0.838 |
| 19 | top-106 | 106 | 0.00005 | 5 | 0.00005 | 0.00625 | 3/5 | 0.865 |
| 19 | top-thin | 19 | 0.04060 | 7 | 0.01165 | 0.00625 | 3/5 | 0.995 |
| 23 | argmax | 4 | 0.21499 | 23 | 0.10219 | 0.00556 | 2/4 | 0.533 |
| 23 | top-146 | 146 | 0.00005 | 11 | 0.00005 | 0.00556 | 2/5 | 0.484 |
| 23 | top-thin | 44 | 0.00155 | 23 | 0.00055 | 0.00556 | 1/5 | 0.321 |
| 29 | top-128 | 128 | 0.00005 | 13 | 0.00005 | 0.00500 | 2/7 | 0.960 |
| 29 | top-thin | 44 | 0.00005 | 23 | 0.00005 | 0.00500 | 4/7 | 0.969 |
| 31 | argmax | 4 | 0.01840 | 23 | 0.10049 | 0.00455 | 2/7 | 0.651 |
| 31 | top-118 | 118 | 0.00005 | 5 | 0.00005 | 0.00455 | 2/7 | 0.896 |
| 31 | top-thin | 50 | 0.00005 | 23 | 0.00005 | 0.00455 | 3/7 | 0.942 |
| 37 | top-124 | 124 | 0.00005 | 7 | 0.00005 | 0.00417 | 4/6 | 0.501 |
| 37 | top-thin | 46 | 0.00005 | 37 | 0.00005 | 0.00417 | 4/6 | 0.211 |

The argmax rows at `x = 29` and `x = 37` have `n = 2` and were not tested. The
control column is the disconfirming evidence for any over-reading: on
rejection-sampled real positions of the same size through the same pipeline the
p-values are 0.211 to 0.995, so the pipeline does not manufacture rejections.

**The pre-registered pinning falsifier did not fire, on the strict wording.**
It required a summed p below 0.05 at three or more scored levels together with
the kill-count correlation not positive at a majority of primes. On the
`top-thin` row the p-value is below 0.05 at all five scored levels, but the
kill-count correlation is a majority at `x = 19` (3/5), `x = 29` (4/7) and
`x = 37` (4/6), leaving only `x = 23` (1/5) and `x = 31` (3/7). Two levels, not
three. **The honest verdict is that the near-maximal residues are measured
non-uniform beyond both the copying structure and the elementary kill count at
two of five scored levels, and that the rule as written did not say which row
scores it.** [MEASURED; the shortfall is this note's, not the data's, and it is
recorded in §6.]

The occupancy figures make the size of the effect concrete without a p-value.
At `x = 19` all 20 argmax positions occupy **one** of the 3 classes of `A_5(150)`
and one of the 3 classes of `A_7(150)`; at `x = 31` the four argmax positions
occupy 4 of the 27 classes of `A_29(348)` and 4 of the 27 of `A_31(348)`, which
is what four independent draws would do. Against that, the 20
positions at `x = 19` fall into only **4** congruence components, so they are
not 20 independent draws.

### 3c. M3, the extreme tail (F5, F6)

| x | G₂ | N(=G₂) | N(≥0.95G₂) | N(≥0.90G₂) | D^0.05 | D^0.10 | 2nd, 3rd, 4th distinct |
|---|---|---|---|---|---|---|---|
| 11 | 42 | 4 | 4 | 4 | 1.28 | 1.63 | 36×4, 30×22, 24×6 |
| 13 | 66 | 12 | 12 | 24 | 1.44 | 2.08 | 60×12, 48×20, 42×84 |
| 17 | 108 | 20 | 20 | 20 | 1.65 | 2.72 | 96×22, 90×24, 84×12 |
| 19 | 150 | 20 | 20 | 106 | 1.90 | 3.61 | 138×86, 132×26, 126×48 |
| 23 | 204 | 4 | 6 | 34 | 2.21 | 4.90 | 198×2, 192×8, 186×20 |
| 29 | 258 | 2 | 2 | 22 | 2.61 | 6.81 | 240×8, 234×12, 228×22 |
| 31 | 348 | 4 | 4 | 72 | 3.09 | 9.54 | 330×34, 318×34, 312×10 |
| 37 | 528 | 2 | 6 | 6 | 3.69 | 13.61 | 510×4, 462×2, 432×2 |

**F5's falsifier fired twice.** `N(≥0.90·G₂) = 72` at `x = 31` is outside the
registered band `[3, 40]`, and the sequence falls from 106 at `x = 19` to 34 at
`x = 23`, more than a factor 2 between consecutive levels above `x = 17`.
`N(≥0.95·G₂)` stayed in its band `[1, 12]` at both `x = 29` (2) and `x = 31`
(4). Read against the model column in the same table, the measured `N(≥0.90·G₂)`
is 106 against 3.61 at `x = 19`, 34 against 4.90 at 23, 22 against 6.81 at 29,
72 against 9.54 at 31 and 6 against 13.61 at 37: above the model at four levels
and below it at the fifth, with no trend, so the Poisson tail model calibrated
at the maximum carries no predictive content at these sizes. **[MEASURED, exhaustive
at eight levels; no law is fitted and none should be.]**

**F6's forecast failed at three levels and its falsifier did not fire.** The
drop from `G₂` to the second largest distinct gap is 12 at `x = 19`, 6 at 23,
18 at 29, 18 at 31 and 18 at 37, so it exceeds the forecast 12 at three of the
five scored levels but never reaches the falsifier's 30. The top of the
spectrum at `x = 37` is the thinnest on the ladder: `528:2  510:4` and then
nothing until 462.

### 3d. M4, clustering (F7, F8)

**F8 held.** Minimum spacing and short-spacing counts of the top-`K` set
against the mirrored uniform null give p-values `0.575/0.969` at `x = 19`,
`0.327/0.929` at 23, `0.677/0.251` at 29, `0.892/0.168` at 31 and
`0.149/0.227` at 37. Nothing below 0.05 at any level, so at gross scale the
near-maximal windows are placed as uniform points.

**F7's falsifier fired.** Exact congruence pairs inside the ARGMAX set:

| x | pairs, by prime | total |
|---|---|---|
| 19 | p=11: 8, p=13: 10, p=19: 4 | 22 |
| 23 | none at any p ≤ x | 0 |
| 29 | none | 0 |
| 31 | none | 0 |
| 37 | none | 0 |

Zero at four scored levels against a forecast of at least one at each, so the
copying structure in the argmax set is a small-level phenomenon that stops at
`x = 23`. The forecast was made after seeing it at `x = 13`, and it was wrong.

**The same statistic on the near-maximal set goes the other way, and this is
the run's one substantive new fact.** Exact congruence pairs among the top-`K`
windows, with the uniform null in the same row:

| x | n | p | W/p | exact pairs | null(exact) |
|---|---|---|---|---|---|
| 29 | 128 | 13 | 497668710 | 17 | 1.63e−5 |
| 29 | 128 | 17 | 380570190 | 21 | 2.14e−5 |
| 29 | 128 | 23 | 281291010 | 24 | 2.89e−5 |
| 29 | 128 | 29 | 223092870 | 24 | 3.64e−5 |
| 31 | 118 | 17 | 11797675890 | 20 | 5.85e−7 |
| 31 | 118 | 19 | 10555815270 | 20 | 6.54e−7 |
| 31 | 118 | 31 | 6469693230 | 16 | 1.07e−6 |
| 37 | 124 | 19 | 390565164990 | 19 | 1.95e−8 |
| 37 | 124 | 29 | 255887521890 | 34 | 2.98e−8 |
| 37 | 124 | 37 | 200560490130 | 14 | 3.80e−8 |

The congruence components of the whole top set read 19 of 106 at `x = 19`, 44
of 146 at 23, 44 of 128 at 29, 50 of 118 at 31 and 46 of 124 at 37. **So the
majority of near-maximal windows at every scored level, 87 of 106, 102 of 146,
84 of 128, 68 of 118 and 78 of 124, are exact congruence translates of another
near-maximal window by a multiple of `W/p`: the same window seen in a different
fold of the same prime.** [MEASURED, exhaustive, `n` = the whole period; the null is uniform
placement, which the F8 spacing test says is otherwise adequate.]

### 3e. M5, reach

`x = 37` was reached in about nine minutes of scan on eight workers (569.5 s on the first run, 525.8 s on the re-bound run) and is included above.
`x = 41` prices at **5.65 to 5.96 h** on the re-bound run (5.86 to 6.49 h on the first run) at the measured throughput, which is
outside this wave's two-hour budget. `x = 43` is out of reach for this engine
entirely: `43# = 1.3083·10¹⁶` exceeds `2⁵³ = 9.007·10¹⁵`, so positions cannot
be held exactly in doubles and the engine would have to move to BigInt or to a
split representation.

## 4. What this says about the quantifier killer

Verdict label **(i)** on every line below, per the wrong-direction audit's
scheme in `object-g2-read-0829.md` §4b: each is a measurement on a finite
object, strictly weaker than TPC, decidable by enumeration, and none of them is
a route. Nothing here is verdict (ii); nothing here is undetermined in the
sense of (iii).

**(i) The loss factor at the extreme, quantified.** `object-g2-read-0829.md`
§8 Q2 says "a maximum attained once over `W` positions is where an L¹ count
over positions is most lossy". That is now a number rather than a phrase: at
`x = 37` the maximum is attained at 2 of `W = 7.42·10¹²` positions, and 2 of
`D = 2.18·10¹¹` gaps; at `x = 29`, 2 of `6.47·10⁹` positions. The multiplicity
does not grow with `x` over the twelve exact levels the corpus holds
(`2, 2, 4, 12, 20, 20, 4, 2, 4, 2, 4, 8` at `x = 5..43`), and half of it is
forced by the mirror, so the number of independent maximal windows is 1 or 2 at
the largest levels. An L¹ count over positions therefore pays the whole width against a
multiplicity of 2, and the run gives no reason to expect that to improve at
larger `x`. [MEASURED for the counts, PROVEN for the mirror's factor
2.]

**(i) But the maximum is not an isolated spike, and the near-maximal band is
where the structure is.** `N(≥0.90·G₂)` reaches 106 at `x = 19` and 72 at
`x = 31`, and most of the top-`K` windows are exact congruence translates of
one another by `W/p`. The picture the run gives is a small number of parent
configurations, each appearing in several folds of one prime, with the
tip of the distribution sitting on top of that. That says something specific
about what an argument would have to control: at a threshold slightly below
`G₂` the objects to control are not `W` independent positions but a much smaller
number of congruence families. It does NOT say the same about `G₂` itself,
because the argmax set has zero congruence pairs at every level from `x = 23`
up. The two halves point in opposite directions and the run does not reconcile
them. [MEASURED; `n` = the whole period at five levels; no mechanism derived.]

**(i) The class positions are not generic in the near-maximal band, and the
corpus's earlier generic reading is not contradicted.**
`Q-measure-g2-generic` (ANSWERED) found `G₂` generic in the CLASS-CONFIGURATION
coordinate at percentile 13.70 to 26.35. This run measures a different
coordinate, the POSITION of the maximum inside a fixed tile, and finds the
near-maximal residues non-uniform against the endpoint null at all five scored
levels, with roughly half of that traceable to the copying structure and, at
`x = 23` and `x = 31`, some of it not traceable to either the copying structure
or the elementary kill count. The two results are about different coordinates
and neither bears on the other.

**What none of this does.** It does not weaken killer 1: the run consumes P1
and P4 of `object-g2-read-0829.md` §4a and nothing else, and P4's three tested
uses all returned nothing at the anchor. It does not weaken killer 2: knowing
that the maximum sits at 2 positions is a statement about a computable level,
and every level this engine can reach is below `x = 41`. And it supplies no
positional argument: a congruence family is a statement about which windows are
translates of which, not a bound on any of them.

## 5. What this note contradicts in the live layer, with file:line, NOT applied

Nothing below was applied; the wave's rules made every existing file read-only.
Ranked by what a reader would get wrong.

**(1) `research/history/staging/object-g2-read-0829.md:1000` states an open
question that the corpus has already answered.** The line reads "Whether the
positions are otherwise generic, and whether the multiplicity grows, is
unknown." The multiplicity is on file at every exact level to `x = 43`:
`research/exact-g2-ladder.js:31-46` (`nmax` column, `2, 2, 4, 12, 20, 20, 4, 2,
4, 2, 4, 8` at `x = 5..43`), `research/measure-g2z2-0829.js:78-84` (the same
table, as TRUSTED DATA 2), and `research/ATTACKS3.md:72` as a landed measured
result from `research/a3-01-misalignment-ledger.js`. The growth half is
answered too: the sequence does not grow, and its minimum 2 is attained at
`x = 29`, `x = 37` and at both ends. *Proposed:* replace the "unknown" clause
with the sequence and the three sources, and keep only the positional half of
Q2 as open.

**(2) `research/history/staging/object-g2-read-0829.md:1005` presents a grep of
`research/QUESTIONS.md` as if it settled what the corpus holds.** The grep is
correct as stated and the inference from it is not: `Q-attacks3-uframe` is
ANSWERED and its verdict line does not mention the multiplicity, so a
question-index grep cannot see a fact that lives in an attack file's landed
paragraph. *Proposed:* add to `research/ATTACKS3.md` §A1 a `Ledger:` pointer,
or extend `Q-attacks3-uframe`'s verdict with the multiplicity sequence, so the
index carries it. This is a mechanism defect in the question ledger, not a
mathematical one.

**(3) `research/a3-01-misalignment-ledger.js:371-373` records an unverified
assumption that is now measured.** It says its twelve-site buffer truncated at
folds 17 and 19 and that the "up to mirror" figure there "is an assumption, not
a measurement". This run verifies `τ_{G₂}`-invariance of the full 20-element
argmax set at both folds, from an engine sharing no code with it. *Proposed:*
one line in that file's READINGS, or in `ATTACKS3.md` §A1, recording that the
assumption held when measured.

**(4) `research/G2-STATE.md:410-414` and
`research/history/staging/object-g2-read-0829.md:287` list the exhaustive
maximality certificates and name only `x = 37`.** The wheel-210 engine now
certifies the maximum exhaustively at `x = 11, 13, 17, 19, 23, 29, 31, 37` in
one run, with four independent identities checked at each level. *Proposed:*
add a row to the certificate table naming the third engine and the eight
levels. This strengthens custody and moves no number.

**(5) This note's own producer leaves the gate at TOTAL 1.**
`research/history/staging/measure-0904-argmax.js:235` carries a
`// widths-ok:` annotation that the checker's window does not match, so
`widths` reports `widths-ok-matches-nothing`. *Proposed:* delete the trailing
annotation, or move it onto line 223, `const buf = new Uint8Array(SEGB * NR);`,
and re-embed all three tails, tail 1 as a no-op refresh (its output is
unchanged, so its `out-sha256` must still read `561419f722de5a55…`, which is
the check that the seal text did not move) and tails 2 and 3 with `--force`.
Not applied here, for the reason in §2.

**(6) No live file prices `x = 41` for a positional scan; nothing is
contradicted, a figure is missing.** `object-g2-read-0829.md:560` row L8 and
`TODO.md:791` both already have the arithmetic ceiling right (`1.308e16` is
`43#`, and "paths leave 2^53 at @43"). What no file carries is what a
whole-period positional scan at `x = 41` costs. Measured here: 5.65 to 6.49 h
across two runs at 14.2 to 15.0·10⁹ positions/s on eight cores, which is a laptop overnight rather
than a compute-box job. *Proposed:* add that figure beside L8, since L8 is the
row a future wave would price from.

## 6. What would falsify this note, and whether that check ran

| claim | rung | falsifier | did the check run |
|---|---|---|---|
| the multiplicity sequence and the argmax positions to `x = 37` | MEASURED, exhaustive | a fourth engine disagreeing on any position or count | RAN, three ways: brute force at `x ≤ 17`, `a3-01`'s max-site lists at `x = 11, 13, 23, 29, 31`, `exact-g2-ladder.js`'s `nmax` and least position at every level to 37. No disagreement |
| `m(x)` even and `τ_{G₂}`-invariant at all eight levels | MEASURED; the parity is PROVEN from the Mirror-Sweep Lemma | an odd `m`, or an argmax at a fixed point of `τ` | RAN, at all eight levels, including the two `a3-01` could not check |
| near-maximal residues non-uniform on the endpoint null | MEASURED | the matched control rejecting at the same rate | RAN: the control returns p = 0.211 to 0.995 at every level and set |
| the non-uniformity is not entirely the copying structure | MEASURED, WEAK | the congruence-thinned row losing significance | RAN and it does not, at `x = 23, 29, 31, 37`. But the thinning removes only EXACT congruences and the near form is larger at every level, so part of the residual dependence is unremoved. **This is the weakest claim in the note.** |
| the non-uniformity is not the elementary kill count | MEASURED, WEAK | the kill-count correlation positive at a majority of primes | RAN: majority at `x = 19, 29, 37`, not at `x = 23, 31`. So the claim stands at two levels of five and the pre-registered falsifier needed three |
| near-maximal windows are congruence translates far above the uniform null | MEASURED | a null that is not uniform placement | PARTLY. The uniform null is checked at gross scale by F8 (spacings, all p ≥ 0.149) but no renewal or congruence-aware null was built. The excess is `10⁶` to `10⁸`, so a mis-specified null would have to be very wrong |
| the argmax set has no congruence pairs at `x ≥ 23` | MEASURED, exhaustive | a pair | RAN at four levels, none found |
| `x = 41` costs 5.65 to 6.49 h across two runs | MEASURED extrapolation | running it | DID NOT RUN, out of budget |

**Two defects of this note's own design, recorded rather than hidden.**

1. **F3's falsifier did not say which of the four reported rows scores it.** The
   run produces `argmax`, `argmax-thin`, `top-K` and `top-thin` rows, and the
   verdict differs between them (`argmax` rejects at two levels, `top-thin` at
   five). A pre-registered rule that admits four readings is not fully
   pre-registered, and the note therefore reports all four rather than choosing
   after the fact.
2. **F5's band was set from a model the same run then measures to have no
   predictive content**, reading 106 against 3.61 at `x = 19` and 6 against
   13.61 at `x = 37`. A band drawn from such a model is not a real test, and
   F5's "failure" carries correspondingly little information. What survives is
   the measured table, not the verdict on the band.

**The one thing that would change the reading here.** Reaching `x = 41` would
give a sixth scored level for the congruence statistic and a seventh
multiplicity. It costs about six hours on this laptop and it is the cheapest
open extension. `x = 43` needs a representation change first.
