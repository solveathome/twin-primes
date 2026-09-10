# Custody, overnight wave: the five tails priced OVER BUDGET

<!-- ledger
id: Q-custody-overnight
status: ANSWERED
todo: none
question: Can the five expensive artefacts every earlier custody wave skipped be bound to their outputs?
verdict: Two of the five were already bound and need only a --check; the other three cannot be bound at all, and the obstruction is shared and is a property of qc/tailfmt.js rather than of the files.
-->

**What this is.** The five artefacts that every earlier custody wave skipped on
cost, run serially through one night, cheapest first. Nothing here is a repair.
Each line records what was launched, what it cost, and whether the artefact's
recorded numbers came back. **No script change in this wave is committed**;
only this ledger is.

**Two of the five turned out to be already bound.** `lp-push-x43.js` and
`natal-cap-27-t4-at13.js` carry embed fingerprints dated 2026-08-19 (a later
wave than the TODO text that still prices them as unmigrated). For those two the
deliverable is not an embed but a `--check`: re-run the recorded invocation and
compare the fingerprint. That is the same work, one step further on.

**And three of the five cannot be bound at all, for one shared reason.** The
wave was briefed to bind what was mechanically bindable in cap-33, cap-34 and
cap-37. It is none of them, and the obstruction is the same in all three and is
a property of `qc/tailfmt.js`, not of the files: **a script has exactly one
tail.** `tailfmt.locate` scans backwards for the last `// OUTPUT`, takes
everything from there to the next `// READINGS` as the body, and `embed.js`
replaces that whole span with one invocation's stdout. All three files are
declared composites of several runs, and in all three the OUTPUT region also
opens with hand-written provenance prose. An embed would delete both. So the
work that landed on them is the next best thing and is worth as much: the runs
were made, and the pasted blocks were checked against them line by line under
the house normalisation. **cap-34 reproduces in full.** The precise binding
obstruction is recorded per file below, so nobody prices these again.

## Summary

| script | launched | wall | verdict |
|---|---|---|---|
| `lp-push-x43.js` | 06:45 `--check` | 24 min 50 s | **PASS.** `code-sha256` and `out-sha256` both match. Nothing to do. |
| `natal-cap-27-t4-at13.js` | 07:10 `--check`, 07:34 diagnostic re-run | 23 min 05 s, then 42 min 10 s | **MISMATCH, AND IT IS NOT A NUMBER.** `code-sha256` matches, `out-sha256` differs. Every load-bearing figure reproduces digit for digit. The tail is unreproducible BY CONSTRUCTION: a 120 s wall-clock progress ticker. |
| `natal-cap-34-wrap-precision.js` | 08:18, six stages in the recorded order | 37 min 30 s | **REPRODUCED, NOT BOUND.** All six stages digit-identical bar the scratch path the file already declares. Binding is destructive; see below. |
| `natal-cap-33-overnight.js` | 08:56 `smoke` only | 0.3 s | **NOT LAUNCHED, AND THE REASON IS STRUCTURAL.** Only RUN 3 is reachable, reaching it overwrites hand-written custody prose, and it first needs a 100 min RUN 2 to place an undeclared scratch file. 7 h buys a destroyed tail. |
| `natal-cap-37-at41-march.js` | 08:56 `smoke`, `audit`, `cost` | 59 s | **THE TAIL STAYS EXTERNAL.** The march self-drives but hardcodes `NSH=8` with no knob, over the half-the-cores budget; and its OUTPUT region is three logs plus prose. Everything except the march reproduced in-house today. |

**No load-bearing number moved anywhere in this wave.** Every figure that
differs from a pasted block is a wall clock, a throughput benchmark or a scratch
path. All of them are listed under "Every number that moved" at the foot.

**The gate.** `node research/qc.js` was at **TOTAL 0** when this wave started
(06:45) and reads **TOTAL 4** as it ends (09:01). **None of the four is this
wave's.** All four are `embeds / tail-does-not-belong-to-this-code`, and they
are the declared, intended residue of a concurrent adjudication wave that
committed code fixes and left the tails to be re-embedded — one of the four
being `natal-cap-27-t4-at13.js` itself, edited at 08:33, an hour after this wave
checked it. The `hand-pasted-tail` advisory likewise moved 3 to 5 without this
wave's help (`fold-profile-08-zone-localized-gap.js` and `natal5-variance.js`
joined it). `readings-not-traceable` is unchanged at 148. The three
`--check`-and-compare runs write nothing, and **none of the five scripts was
edited by this wave**: its entire diff is this file.

## Per script

### 1. `research/lp-push-x43.js` — PASS

`node research/qc/embed.js --check --timeout 5400 research/lp-push-x43.js`,
verified in the tail's own recorded mode (`stdout+stderr`):

```
  code-sha256  matches
  out-sha256   matches
```

1490 s against the tail's recorded `elapsed: 1998.5 s`, on an idle machine. The
fingerprint holds. This is the only one of the five that needed nothing.

### 2. `research/natal-cap-27-t4-at13.js` — the tail cannot pass `--check` on any machine but the one that wrote it

`--check` returns `code-sha256 matches`, `out-sha256 DIFFERS`. `--check` does
not say WHAT differs, so the run was made again with the capture reproduced
exactly as `embed.js` builds it and diffed against the pasted body under
`tailfmt.normalize`. The result is unambiguous:

> **identical once the wall-clock ticker and the wall-time figure are removed.**

Every load-bearing figure came back: `T2 = 46186.769663306746`,
`T3 = 4662945.6578926444`, **`T4 = 352253669.87624449`**, the error budget
(`7.55e-15`, `9.99e-15`, `E[S^4] = 8.623e+9`, amplification `24407 <- 4.93e+6x`,
`|dmu4|/mu4 <= 4.92e-8`), the MC line (`mu=304.30 m2=89.83 m3=7.1 m4=23915
zeros=0 minS=265`), `mu=304.2821 Var=90.1995 mu3=0.609 mu4=24407.37`,
`kurtosis = 2.9999`, `mu4/3Var^2 = 1.0000`, Chebyshev `9.74e-4`, Cantelli
`9.73e-4`, quartic Markov `2.85e-6` (x342), optimal quadratic-square `1.90e-6`
(x513), the theorem `P(S=0) <= 1.898e-6`, and `[23 checks passed]`.

**The cause, exactly.** Lines 274-277:

```js
const tick=setInterval(()=>{
  let done=0;for(const o of outs){try{done+=+fs.readFileSync(o+'.prog','utf8').split(' ')[1];}catch(e){}}
  console.log(`   ... ${(100*done/QTOT).toFixed(1)}% of quadruples, ${((Date.now()-t)/60000).toFixed(1)} min`);
},120000);
```

Three separate defects sit in those four lines, and each alone breaks `--check`:

1. **The percentage is machine speed.** The pasted block reads `7.8%` at
   2.0 min; today's run reads `8.4%`.
2. **The NUMBER OF LINES is machine speed.** The pasted run ticked 13 times, at
   24.9 min; today's ticked 20 times, at 41.0 min. No normalisation rule can
   repair a block whose line count moves.
3. **`min` was not a volatile unit.** `tailfmt.VOLATILE` normalised
   `ms|s|sec|secs|seconds` and stopped there, so `24.9 min wall` was hashed as
   a result. A concurrent agent added a careful `min|h|hours|days` rule to
   `tailfmt.js` on 2026-08-20 (uncommitted in the tree as this is written).
   **It half-fixes this file, and the measurement is below.**

Defect 3 also caught a **read race** worth recording on its own: the ticker sums
the workers' `.prog` files inside a `try/catch` that yields 0 for a file caught
mid-write, so today's run printed `38.9%` at 12.0 min and then **`4.5%` at
14.0 min** — the progress line goes backwards. The pasted block happens not to
show it. A reader would take it for a bug in the march; it is a bug in the
progress print.

**The new `min` rule is not enough here, and it misses one hit.** Re-normalising
this wave's saved raw capture under the tailfmt now in the tree:

| | before the rule | with the rule |
|---|---|---|
| ticker trailing unit | `… 7.8% of quadruples, 2.0 min` | `… 7.8% of quadruples, TIME` — fixed |
| the wall figure | `24.9 min wall` | `24.9 min wall` — **still hashed** |
| differing lines | 43 of 48 | 43 of 48 |

Two things follow. The rule's negative lookahead `(?![ \t]*[A-Za-z(])` — there to
protect `2 min(j, W-j)` and `2 h dbar1`, which is the right instinct — also
rejects **`24.9 min wall`**, because `min` is followed by a letter. That case is
a wall clock and should be scrubbed; the rule's author verified it against 11
tails and this hit was not among them. And even with that fixed, cap-27 stays
red: **defects 1 and 2 are untouchable by any normalisation rule**, because a
percentage that reads `7.8` on one machine and `8.4` on another is not a unit,
and a block of 12 ticker lines against 20 is not a substitution. Only the code
change closes this file.

**This is the third stopwatch.** The fortieth pass killed two wall-clock gates
(`a3-09`'s 33 s diagonal budget, `a3-01`'s 30 s print gate) and reported the
class as cleared. It was not: this one survived because the file was bound the
same day and its tail was never re-checked. **A tail that is bound and never
`--check`ed is not custody, it is a hash.** The fix is the same shape as the
other two — tick on a chunk index, not on a clock — and it costs a 26 min
re-embed. **It was deliberately not made here**: editing the code would break
the `code-sha256` that currently matches, and this wave commits no script
change. It belongs on the TODO as a named, priced repair.

### 3. `research/natal-cap-34-wrap-precision.js` — reproduced in full; binding would destroy it

All six stages were run in the recorded order with the recorded environment,
`nice -n 15` throughout:

| stage | recorded | today | reproduces? |
|---|---|---|---|
| `exact13` (`NC34_WORKERS=10`) | 1466.0 s | 1555 s | yes, bar the scratch path |
| `layers` | 341.3 s | 351 s | **identical, 44 lines** |
| `c2` | 246.1 s | 303 s | **identical, 15 lines** |
| `kurt` | 1.8 s | 3 s | **identical, 21 lines** |
| `joint` | 4.1 s | 5 s | **identical, 21 lines** |
| `verify` (`NC34_WORKERS=2`) | 23.2 s | 33 s | **identical, 11 lines** |

`exact13`'s only differing line is `truth written to <path>`, the scratch
directory — which the file's own provenance block already names as the one line
that differs from the archived log. So **every printed digit of all six stages
reproduces**, including `T4 = 352253669.87624460` against cap-27's certified
`352253669.8762445` at `REL = 3.384189e-16`, `G = 65955633770.936089` over
`quads=39,782,707,965`, the four layers `A/C1/C2/C3`, `Multi = 44821955.443329073`,
the joint split (`e2 = 45090019.6365043`, `e3 = -268718.409425233`, 4-prime-and-up
`654.216249991616`), `implied CAL4 = 0.932164`, the `-3.501681e-5` rebuild of
cap-32's instance engine, and `[88520 checks passed]` in `verify`.

**Why it still cannot be bound.** `tailfmt.locate` reports one tail: body 174
lines, `bodyStart` at line 686, `outEnd` at 864. Those 174 lines are the
30-line hand-written PROVENANCE declaration **plus all six stage transcripts**.
`embed.js` accepts stage arguments (`-- exact13`), so the six invocations can
each be RUN through it — but each would write its ~20 lines over all 174,
deleting the provenance and the other five stages. Per-invocation binding needs
one tail per invocation, and the format gives a file one. Splitting cap-34 into
six files is a repo change, not a custody step, and is out of this wave's scope.

The honest form for this file is what it already has: a declared composite with
its provenance stated. What this wave adds is that **the declaration is now
true as of today**, checked mechanically rather than believed.

**Read this beside commit `0620c0c` (08:56).** Four minutes after the last of
these six stages returned, a concurrent agent replaced the `joint` stage's `WJ`
accumulator with the house BigInt-flush pattern: at @19 the plain double
returned `56898887621686610` against BigInt's `56898887621686874`, off by 264,
under a printed label that said `exact`. That commit states the five printed
digits do not move, and `WJ = 5.6899e+16` is indeed unchanged, so the
reproduction recorded above stands at the printed precision. But it was made
against the pre-fix code, and anyone re-checking this file should start from
`0620c0c`, not from here.

### 4. `research/natal-cap-33-overnight.js` — three blocks, one reachable, and reaching it destroys prose

`smoke` passes (0.3 s): `all smoke asserts passed: MR(12 bases), march,
streaming excess, product-sieve`. The 7 h chain was **not** launched, on three
findings that make it worthless:

1. **Only RUN 3 is reachable.** The file carries OUTPUT/READINGS three times
   over (RUN 1 at 412, RUN 2 at 486, RUN 3 at 565). `tailfmt.locate` scans
   backwards for the last `// OUTPUT` and returns `outHead = 565`. RUN 1 and
   RUN 2 are not addressable by `embed.js` at all, at any price.
2. **Reaching RUN 3 overwrites hand-written prose, and the guard would NOT
   stop it.** `locate` returns `headerEnd = -1` for this tail — there is no
   machine-readable header, so the body starts on the line after `// OUTPUT`
   and the body's first four lines are the hand-written cross-run custody
   summary (`passed. Custody: product-sieve reproduced cap-16's Var within
   certified bars at ALL 8 prior levels — 1.0528 / 10.0645 / 91.1321 /
   1060.5414 / …`). `embed.js`'s legacy guard only refuses when the new run
   fails to produce the old block's FIGURES — and run3 prints those very
   figures itself, at those very precisions. **The guard would pass and the
   prose would go silently.** This is the destructive case TODO item 1
   reserves for a reader, and it is the sharpest example of it in the corpus.
3. **RUN 3 has an undeclared dependency on RUN 2.** Line 381 reads RUN 2's
   result from `$NC33_TMP/nc33-run2-result.json`; without it the cross-custody
   line and `z(37)` are replaced by `(RUN 2 result not on disk yet …)`. The
   file is absent. So RUN 3 must be preceded by RUN 2 (100 min) into the same
   scratch directory — and the tail `embed.js` would then write records
   `invocation: node research/natal-cap-33-overnight.js run3`, which is a
   FALSE provenance line: it omits the prerequisite that made the block
   possible. Binding it would manufacture exactly the defect the fingerprint
   exists to prevent.

So the price is not 5.25 h, it is 100 min + 5.25 h, and what it buys is a
destroyed tail carrying a false invocation. The prose must move to READINGS
first, by a reader, per TODO item 1 — and the fortieth pass's standing rider
applies: `locate` scans backwards, so a moved banner line below the real one
steals the tail. Indent and quote it.

### 5. `research/natal-cap-37-at41-march.js` — the march stays external, and now for a stated reason

`smoke` (0.1 s) and, against the pasted `[A]` and `[C]` blocks:

- **`audit`, 3 s: 66 of 70 lines identical.** The four that differ are the
  PART 0.5 micro-benchmark, which the file's own 2026-08-18 custody addendum
  already declares as the one part that moves. Every result line — the fourteen
  worst-case operand rows, the strike-budget arithmetic, the `2^53` verdict —
  came back.
- **`cost`, 56 s: every invariant identical, every timing moved.** The census
  the probe returns is reproduced exactly (`np=149975249 S=6818495` on all six
  block sizes, `probe span 268435456`, `strike budget on the span = 1.566e+9`).
  The block is otherwise a throughput table, and throughput is machine state.

**Why the march was not attempted.** It self-drives — `MODE==='at41'` runs the
gates, `spawnShards`, then `combineReport` with no outside orchestration. It was
still not launched, on two grounds, either of which is sufficient:

1. **`const NSH=8`, at line 437, with no environment override.** `at41` spawns
   eight shard processes on a ten-core box. The brief's ceiling for this run was
   half the cores. The `shard` and `combine` modes do take an explicit shard
   count, so five shards could be driven by hand — but `combineReport(41,5)`
   produces a structurally different block from the pasted eight-shard one, so
   the hand-driven run would not be a reproduction of the tail. **The
   orchestration the repository lacks is a shard-count knob**, and that is the
   reason the tail stays external.
2. **It could not be bound even if it ran.** The OUTPUT body is 215 lines: the
   hand-written PROVENANCE declaration naming three external logs, plus all
   three transcripts (`[A]` audit, `[C]` cost, `[R]` the 6.16 h march). One
   tail, three runs — the cap-34 obstruction again.

**A datum for whoever gives `S(41)` its second witness.** Today's `cost` run
measures the eight-shard aggregate at blockK 2^22 as **2627e6 strikes/s**
against the recorded **1357e6/s** — this box is now 1.94x the box that priced
the march. The recorded march took 6.035 h against that run's own 12.1 h
projection, so scaling by the same ratio puts a fresh march near **3.1 h**, not
six. The "6 h of ten cores" price on record is stale, and the second witness is
about half as expensive as the READINGS say.

## Three things this wave found that it was not looking for

**A number this wave reproduced is wrong, and no re-run could ever have caught
it.** At 08:33, an hour after the `--check` above, a concurrent agent committed
`4a9037f` to `natal-cap-27-t4-at13.js`. It replaces two hardcoded string
literals with computed binomials, because both were WRONG:

| | printed, and reproduced by this wave | true |
|---|---|---|
| `C(990,3)` | `160,940,540` | `161,226,780` |
| `C(990,6)` | `1.1e15` | `1.3e15` (`1.287912126756255e15`) |

The diagnostic run in item 2 above reproduced `C(990,3) = 160,940,540` exactly,
and was right to: it was a literal in the code, so the run could not have
printed anything else. **Reproduction proves a block came from its code. It says
nothing about whether the code is right.** That is the boundary of what a
fingerprint buys, and this is the cleanest demonstration of it in the corpus: a
figure that passes `code-sha256`, passes a line-by-line re-run, is quoted in a
reading, and is false. Neither figure feeds a computation — both are labels on
term counts — and reading 6 of that file already carried the correct `1.3e15`
against the block's `1.1e15`, which is how it was caught. **It was caught by a
reader, not by an instrument.**

**A concurrent fleet is working this tree.** From 07:45 a second agent ran
`embed.js --check --streams both` on `natal-cap-27-t4-at13.js` — the same target,
at the same time — while two more ran `--check` on
`import-talagrand-01-price-c.js`. Sixteen cap-27 workers shared ten cores and
the one-minute load average reached 130. This wave's own cap-27 diagnostic took
42 min against a 26 min baseline for that reason, and every wall time in the
table above is an upper bound, not a measurement. **Wall times measured on a
shared box do not belong in a tail**, which is the same lesson item 2 above
teaches from the other end.

**`research/natal-cap-37-at41-march.js` was modified at 08:22 by another agent,
mid-wave.** Not by this one, and not reverted by it. It is a real bug fix and it
is worth knowing about: the fourth classical strong-pseudoprime trap,
3,825,123,056,546,413,051, is above 2^53, so as a plain Number literal it became
the EVEN 3825123056546413056 and the `x%2` shortcut answered "composite" before
a single Miller-Rabin base ran. **The trap had been passing its own assert
without ever being tested.** `isPrimeMR` now takes a BigInt arm and the four
traps are passed as BigInt literals. The `audit` and `cost` runs recorded above
were made AFTER that edit, and the audit block still reproduces line for line,
so **the fix is output-neutral for the pasted block** — which is what a later
re-embed of this file will need to know. The file's tail is legacy and carries
no fingerprint, so `qc.js embeds` does not fire on the changed code and the gate
stayed at TOTAL 0.

## Every number that moved, with both values

Nothing here is a result. Listed in full so that no later reader has to wonder.

**`natal-cap-27-t4-at13.js`** — the progress ticker and the wall time:

| | pasted | today |
|---|---|---|
| ticker lines | 13 | 20 |
| first tick | `7.8% of quadruples, 2.0 min` | `8.4% of quadruples, 2.0 min` |
| the read race | (not visible) | `38.9%` at 12.0 min, then `4.5%` at 14.0 min |
| march wall | `24.9 min wall` | `41.0 min wall` |
| script elapsed | 1537.1 s (fingerprint) | 2530.4 s (shared box) |

**`natal-cap-34-wrap-precision.js`** — the scratch path and six wall times:

| | pasted | today |
|---|---|---|
| truth path | `…/43d455bc…/scratchpad/nc34/nc34-exact13.json` | `…/bf77f80e…/scratchpad/nc34dir/nc34-exact13.json` |
| `exact13` | 1466.0 s | 1555 s |
| `layers` | 341.3 s | 351 s |
| `c2` | 246.1 s | 303 s |
| `kurt` | 1.8 s | 3 s |
| `joint` | 4.1 s | 5 s |
| `verify` | 23.2 s | 33 s |

**`natal-cap-37-at41-march.js` `[A]`** — the PART 0.5 benchmark, four lines. The
2026-08-18 addendum's own third value is given too, because three readings of
the same line is the proof that it is a benchmark and not a result:

| | archived log | addendum, 2026-08-18 | today |
|---|---|---|---|
| Float64 cursor | 975e6/s | — | 1077e6/s |
| BigInt cursor | 32e6/s | 50e6/s | 106e6/s |
| BigInt penalty | 30.0x | 18.6x | 10.2x |
| blanket-BigInt march | `330 h, i.e. 14 days` | — | `112 h, i.e. 5 days` |
| E's product penalty | 14x | — | 9x |

**`natal-cap-37-at41-march.js` `[C]`** — the whole cost table is throughput.
Invariant and reproduced exactly: `np=149975249`, `S=6818495`, probe span
`268435456`, span strike budget `1.566e+9`.

| | pasted | today |
|---|---|---|
| serial optimum | 2^24 at 39.6 h | 2^24 at 33.0 h |
| 8-shard 2^21 | 1185e6/s => 13.9 h | 2278e6/s => 7.2 h |
| 8-shard 2^22 | 1357e6/s => 12.1 h | 2627e6/s => 6.3 h |
| 8-shard 2^24 | 838e6/s => 19.6 h | 1053e6/s => 15.6 h |

## What this leaves on the board

- **The counter does not move, and it was never 12.** TODO item 1 still prices
  this work as "12 hand-pasted tails left of 126". Wave three took it to **3**,
  and those 3 are exactly cap-33, cap-34 and cap-37; the TODO sentence is stale
  and should go at the next prune. What this wave changes is the price beside
  them: they are not "over budget", they are **blocked on a format limit** — one
  tail per file — and no amount of compute clears them.
- **`natal-cap-27-t4-at13.js` needs the third stopwatch removed**: tick on a
  chunk index, not a 120 s clock, and fix the `.prog` read race while there.
  26 min to re-embed. Until then its fingerprint is a hash nobody can verify.
- **The new `min|h|days` rule in `tailfmt.js` should also accept `24.9 min
  wall`.** Its lookahead rejects a unit followed by a letter, which correctly
  spares `2 min(j, W-j)` and `2 h dbar1` but wrongly spares a wall clock. One
  more measured hit for whoever owns that change; it does not clear cap-27 on
  its own either way.
- **The second witness for `S(41)` is about 3.1 h, not 6**, and it needs a
  shard-count knob on `NSH` before it can be run inside a core budget.
