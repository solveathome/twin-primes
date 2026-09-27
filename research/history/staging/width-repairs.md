# Width repairs — the forward guards put on the five loaded containers

<!-- ledger
id: Q-width-repairs
status: ANSWERED
todo: none
question: Can the five loaded containers found by the width sweeps be guarded without invalidating any embedded figure?
verdict: Forward protection only: every repair is a widening or a bound check, storage-only by construction, no corpus figure was retroactively corrupt and none moved, with maxgap-law.js at 0 of 1389 figures unreproduced and attack-foldL-01-census.js byte-for-byte on the same out-sha256.
-->

Repair pass, 2026-08-21, acting on the two diagnostic sweeps
`research/history/staging/width-sweep-census.md` and
`width-sweep-attacks.md`. Those two swept; this one edits.

**No corpus figure was retroactively corrupt and none moved.** Every repair here
is a widening or a bound check, which is storage-only by construction, and every
re-run that has landed came back with its figures identical: `maxgap-law.js` at
0 of 1389 figures unreproduced, `attack-foldL-01-census.js` byte-for-byte on the
same `out-sha256`. This is forward protection and nothing else.

The constraint that shapes the whole pass: **a code edit invalidates the script's
tail hash, and clearing it means re-running the script.** So a two-line guard on a
script that costs 50 minutes to reproduce is a 50-minute repair, and the schedule
below is written in those terms rather than in lines of diff.

---

## TIER 1 — done, with the identical-figures check

### 1. `research/maxgap-law.js` — the gap histogram

`hist` was `Int32Array(HCAP + 1)` holding gap COUNTS. A bucket is bounded by D,
the tile's slot count, and D by the period P = x#. At x = 29 mode 1,
D = 1,021,870,080 against the int32 cap of 2,147,483,647: it fits, with a factor
2.1 to spare, so every figure at or below x = 29 is sound. At x = 31,
D = 3.07e10 and the modal bucket would have stored a **negative** count in
silence; `tail[g] = acc / T.D` reads it and the whole survival table comes out
wrong with nothing printed.

- **Changed.** `hist` widened to `Float64Array`, which holds every integer below
  2^53 = 9.007e15 exactly. That is the corpus's usual store for counts of this
  size (`natal-cap-18-at29`, `natal-cap-16/33`, `var41-price`,
  `fdecay-deep-00-core`), it covers D at x = 41 (P = 3.04e14), and it dies at
  x = 43 with the rest of the corpus, because 43# = 1.31e16 = 1.45 x 2^53.
  Uint32Array would have bought only one more level and would then have aliased
  in the other direction; Float64 puts the container's edge and the corpus's
  own exact-arithmetic edge at the same place, which is the point.
- **Guards at.** `if (!Number.isSafeInteger(P)) throw` before the allocation,
  naming x. Fires at x = 43. The comment names the class, the arithmetic and
  the level, per the `xchan-at37-01-census.js` house pattern.
- **Urgency.** A 64-term A048670 refit is queued for this exact script and its
  held drift is recorded in `research/history/CHANGELOG.md`; the refit is what
  would have taken it to x = 31.
- **Annotation added.** `// widths-ok:` on `let P = 1; for (const p of ps) P *= p;`
  — the primorial accumulated in a `Number`, which `widths-scan` flags. The
  reason states the bound (41# exact, 43# not) and points at the throw four
  lines down. `widths-scan` fell 57 -> 56; gated `widths` stayed 0.
- **Re-embed: DONE.** `node research/qc/embed.js --force --timeout 900
  --node-flag --max-old-space-size=8192 research/maxgap-law.js -- --big`,
  148.1 s. **Figures identical: `forced: 0 of 1389 figures in the replaced block
  not reproduced`.** The only lines that moved in the whole 671-line block are
  elapsed timings and sieve progress percentages (`98.4s` -> `97.3s`,
  `96%` -> `98%`). D = 1021870080, mbar = 6.331 and 30.132, G2 = 46 and 258,
  and every MATCH verdict are unchanged.
  - `--force` was required and is not a symptom: the block prints `el()` on
    every tile row, so its `out-sha256` moves on any re-run whatever the code
    does. embed.js's first refusal reported `every old figure reproduces; the
    difference is elsewhere`, which is the same verdict the forced stamp then
    recorded exactly.
  - Total price on this file was three runs of ~148 s: one refused (the
    `--force` lesson above), one for the widening, one for the annotation. Both
    of the two that wrote reported `0 of 1389 figures not reproduced`.

### 2. `research/attack-advmin-1113.js` — the branch-and-bound sort key

`keys[m++] = (c << 12) | a`, recovered as `key & 4095`. `a` is a residue class
mod a scour prime q, and 12 bits is a literal that was never derived from the
instance: the field holds q <= 4096. At @11 (max q = 43) and @13 (max q = 199),
the only two levels this script has run, that is 20x and 4x of margin. **It
fires at @23, where the largest scour prime is 14929** — three and a half times
the field. Past the edge `c` and `a` overlap, the search explores the wrong
classes, and every node and leaf COUNT identity in the file still passes.

- **Changed.** The pack width is now derived from the instance:
  `AW = 32 - Math.clz32(MAXQ - 1)` bits for `a`, `AMASK = 2**AW - 1`, key
  `c * 2**AW + a` recovered as `key & AMASK` and `(key - a) / 2**AW`. `MAXQ` is
  already computed on the line above from `all`, the level's own prime list.
- **Guards at.** `if (n * 2 ** AW + MAXQ >= 2 ** 31) throw`, naming the level —
  the second half of the pack, the count `c <= n`, has to keep fitting the
  `Int32Array` too, and that bound was previously carried by the same untested
  comment.
- **Storage-only.** The pack is an internal sort key. The recovered `(c, a)`
  pair is unchanged and the ordering the walk depends on (ascending c, then a)
  is unchanged, so no figure can move.
- **Re-embed: DONE.** `node research/qc/embed.js --force --timeout 900
  research/attack-advmin-1113.js`, 227.2 s (recorded price 219.0 s). **Figures
  identical in the strongest available sense: the `out-sha256` did not move**
  (`9a80b6f4cce3c429…` before and after), so the whole block is byte-for-byte
  the block that was there. That is a full re-run of the branch-and-bound with
  the repacked key, and it lands on the same optimum, the same witness and the
  same node counts. `--force` was passed but did nothing: an unchanged
  `out-sha256` is a no-op refresh and no `forced:` line was written.
  - Pre-existing and not mine: embed.js reports `5 figure(s) in the existing
    READINGS are not in this output: 1.6e9, 2e10, 5e10, 100, 0.55e9`. The output
    is byte-identical to the block that was already bound, so this note predates
    this pass.

### 3. `research/attack-foldL-01-census.js` — the alphabet histogram

`hist = new Int32Array(4096)` indexed `hist[g / 6]`. An index at or above
`hist.length` is an **out-of-bounds typed-array write, which JavaScript discards
in silence**, so the failure mode is an alphabet that loses its own tail while
`nGaps` and every other count stays right. The container fits any gap below
6 x 4096 = 24576; the largest G2 anywhere in this corpus is 1710 at x = 79,
index 285, so the margin at every level run is 14x.

- **Changed.** A bound check on the index in `push`, throwing with the gap, the
  index, the bucket count and the largest gap the container can hold.
  `pushReplay` guards its decrement the same way. The literal 4096 is left as
  it is: it is not wrong, it was merely unrelated to the data, and the throw is
  what supplies the relation.
- **Guards at.** a maximum gap of 24576, i.e. G2 > 24570 — far past x = 79.
- **Re-embed: DONE.** `node research/qc/embed.js --force --timeout 900
  --streams both research/attack-foldL-01-census.js`, 150.2 s (recorded price
  236.9 s). **Figures identical in the strongest available sense: the
  `out-sha256` did not move at all** (`1b0e5deb4d9fc60b…` before and after), so
  the 510-line block is byte-for-byte the block that was there. Only
  `code-sha256`, `embedded` and `elapsed` changed in the fingerprint.
  - Pre-existing and not mine: embed.js reports `1 figure(s) in the existing
    READINGS are not in this output: 12,12`. The output is byte-identical to the
    block that was already bound, so this note predates this pass and belongs to
    the READINGS section, which was not touched.

---

## TIER 2 — the two carrying the exact census defect

Both are the `la`/`lb` shape: a `Uint16Array` holding an **INDEX into the
scour-prime array `qs`**, read back as `qv[ia[i]]` and `U[ia[k]]`. This is the
identical mechanism, in the identical role, as the `xchan-at37-01-census.js`
defect repaired at `605ce83` on 2026-08-21, which cost five hours of overnight
compute and read as a clean refutation of a pre-registered law. Both are widened
to `Uint32Array` with a throw on K, matching the repaired sibling line for line.

### 4. `research/attack-x-offset-02-profile.js` — code fixed, re-embed QUEUED

| level | W = x# | K | max index | Uint16 cap | margin |
|---|---|---|---|---|---|
| @19 | 9,699,690 | 435 | 434 | 65535 | 151x |
| @23 | 223,092,870 | 1,739 | 1,738 | 65535 | 38x |
| @29 | 6,469,693,230 | 7,863 | 7,862 | 65535 | 8.3x |
| @31 | 200,560,490,130 | 37,534 | 37,533 | 65535 | **1.75x** |
| @37 | 7,420,738,134,810 | 198,274 | 198,273 | 65535 | **ALIASES** |

- **Changed.** `la`/`lb` -> `Uint32Array`, plus
  `if (K > 0xFFFFFFFF) throw ... at @${L.x}` before the allocation.
- **Guards at.** @37 and every level above it. The file's own conclusions name
  @37 as the next separation, so this was a loaded trap.
- **What it was masked by, and why that is not protection.** Line 105 carries
  `if (W * 2**(NQ-1) >= 2**53) throw`, and with NQ = 12 at @37 that is
  7.42e12 x 2^11 = 1.52e16 >= 9.007e15, so the run dies loudly before it reaches
  the sieve. That guard is on an unrelated quantity — the octave table — and it
  throws first by arithmetic accident. Lower NQ to make @37 run, or raise NQ
  without touching `la`, and the silent alias is immediately behind it. The
  at-37 history is exactly the story of a guard on a different quantity being
  raised and the alias coming out from behind it.
- **Verified without paying for the full re-embed.** The file parses, and a
  short level list reproduces the embedded tail's own low-level sections
  **exactly**: `node research/attack-x-offset-02-profile.js 19` and
  `... 23` were diffed line by line against the `===== @19` and `===== @23`
  blocks of the embedded OUTPUT and are identical on every figure (N-bar, obs,
  CRT, J, sigma_slot, all sixteen Q1-bin and pi-Q-bin rows for both natal and
  line, the control draw, and `GATE vs xchan-at29-01 embedded OUTPUT: ALL PASS`).
  Only elapsed timings differ.
- **Re-embed: QUEUED. Price 2950 s (49 min), recorded elapsed 2948.2 s.**
  `node research/qc/embed.js --force --streams both --node-flag
  --max-old-space-size=8192 --timeout 3600 research/attack-x-offset-02-profile.js`
  — `--force` because the block prints elapsed times, so its `out-sha256` moves
  on any re-run. Until it lands, `embeds` carries
  `tail-does-not-belong-to-this-code` on this file.

### 5. `research/xchan-at29-01-segmented.js` — code fixed, re-embed QUEUED

Same store, same repair. The default ladder tops out at @31 with K = 37,534,
**57% of the Uint16 cap**, and this script takes its level list on the command
line, so `-- 37` is one word away from K = 198,274 and a silent alias. It was
protected at @37 only by the `LC = 7` throw — a guard on a *different* quantity,
the per-slot divisor-list capacity — which is precisely the configuration that
produced the five-hour incident in the @37 sibling.

- **Changed.** `la`/`lb` -> `Uint32Array`, plus
  `if (K > 0xFFFFFFFF) throw ... at @${L.x}`.
- **Guards at.** @37 and above.
- **Verified without paying for the re-embed.** `node
  research/xchan-at29-01-segmented.js 11 13 17 19 23` reproduces the embedded
  tail's `@11`, `@13`, `@17`, `@19` and `@23` blocks with **every figure
  identical**; the only differing lines are the elapsed timings and the
  self-predicted price line that is computed from them.
- **Re-embed: QUEUED. Price 443 s, not hours.** The file's own tail records
  `elapsed: 442.7 s` for the full default ladder @11..@31, so
  `node research/qc/embed.js --force --timeout 900
  research/xchan-at29-01-segmented.js` is a seven-minute job, an order of
  magnitude cheaper than the estimate this repair pass was briefed with. It was
  not started here because the brief said not to start it; it is the cheapest
  outstanding item on this page by a wide margin and should be run first.

### A defect the two widenings introduce, in both of them and in the repaired sibling

`census()` returns `bytes: MS * (3 + 2 * 2 * LC)`, and the inner `2` is
bytes-per-element for the `Uint16Array` that `la`/`lb` used to be. After the
widening the printed `MEMORY: 62.0 MB of arrays` line under-reports: the true
figure is 93.0 MB. **This is already true of `xchan-at37-01-census.js`,** which
was repaired on 2026-08-21 and whose `bytes` formula was not touched either.

It is left alone deliberately. Correcting it MOVES an embedded figure, which is
the one thing this pass is not allowed to do quietly, and the figure is a
self-reported diagnostic rather than a measured result. Queue it as a separate
one-line change to all three files, to ride along with the next re-embed each of
them needs anyway, with the old and new numbers stated: 62.0 -> 93.0 MB.

---

## TIER 3 — recorded, not edited, with the level each fires at

Nothing below was touched. Each is safe at every level it has been run at and
each has a named threshold above it.

| script | store | fires at | note |
|---|---|---|---|
| `attack-beta2-04-loss-budget.js` | `const total = 1 << n`, n = pi(x), at two sites | **x >= 127** (pi = 31) | `ALLP` stops at x = 79, so n <= 22 and `1 << 22` is an ordinary int32. At pi(x) = 31 the expression is -2147483648, the loop `mask < total` never runs, `bins` comes back all zero and nothing throws. The A144311 note contemplates extending this ladder, which is what makes it live. Fix is `2 ** n` plus an assert on `ps.length` |
| `attack-foldL-04-genealogy.js` | `nbirth` `Uint8Array` holding the fold PRIME p | **p >= 257** | `FOLDS` ends at 29. A prime in a byte is the census bug's shape. Also `nsrc` `Uint32Array` holding a slot index: fold 29 needs N = 214,708,725 (20x under 2^32), fold 31 needs 6.23e9 and would alias — but line 165 says fold 31 is statistics-only and no tile is built |
| `attack-foldL-04-localized.js` | `nxt`,`prv` `Int32Array(M)` | **WIN ~ 1.29e10** | M = 3.33e8 at the WIN = 2e9 that was run, 6.4x under 2^31 |
| `attack-foldL-04-localized.js` | `key`,`birth` `Uint16Array` holding the fold prime q | **QMAX >= 65536** | QMAX is an ENV OVERRIDE defaulting to 1500, so this one is settable from the command line without touching the file |
| `natal-cap-19 / -13 / -31 / -38` | `W >> 1`, `W >> 2` | **@29** | Correct through @23 (W = 223,092,870). At @29, W = 6,469,693,230 and `W >> 1` coerces to int32 first, giving -2120241362. Catastrophic and silent |
| `a3-06-origin-vs-max.js` | `fold()` `out` `Int32Array` holding an absolute slot position | **fold to 29** | 223,092,869 at fold 23, 10% of 2^31; folding to 29 would store 6,469,693,229 as -2,120,241,363, and the only check in the function, `if (n !== out.length) throw`, is a COUNT identity and still passes. **Verified this pass: no embedded figure descends from that path.** `fold()` is called only over `foldPrimes = [3,5,7,11,13,17,19,23]`, and fold 29 goes through `streamStats()`, which never materialises the tile and carries positions as plain Numbers (`base + S[i]`, exact to 2^53). The G2 = 258 custody row at x = 29 comes from the streaming path. Materialising the 29 fold is a one-line change and is what would break it |
| `uframe-repro-02-maxgap-forensics.js` | `hist*` `Float64Array(200)` gap/6 histograms | **G2 > 1194, x ~ 61-67** | 88 at T_37, 2.3x of the container. Out-of-range writes are DISCARDED, so pushing the fold ladder past T_37 loses the histogram tail with no error and no failing identity |
| `import-stein-02-strikes.js` | `keys[k] = h1 * 2^21 + (h2 >>> 11)` | **any widening of `SH` or the tag** | Correct by design and **exactly saturated at 2^53 - 1, 100% of the container**. It is right and it has no headroom at all: widen the tag width or `SH` and two distinct signatures collide, and the class-count identity would not see it. Worth a comment at the line rather than a guard, since the guard would be `assert(0 === 0)` |
| `xchan-at*` | `C3(n) = n(n-1)(n-2)/6` | **K ~ 2.1e5, just past @37; breaks at @41** | At K = 198,274 the intermediate product is 7.79e15 against 2^53 = 9.007e15 — **87% of the container**. At @41, K = 1,117,909 and it is gone. **And the identity that checks it is a tautology**: `C(K,3) = … vs …` computes both sides the same way, so it cannot notice its own overflow. Any repair here must move the check to a different derivation, not widen the store |
| corpus-wide | a primorial held as a `Number` | **x = 43** | 41# = 3.04e14 = 0.034 x 2^53, and **43# = 1.31e16 = 1.45 x 2^53**. `natal-cap-37-at41-march.js` already asserts this; `widths-scan` lists 18 further `P *=` sites over a prime list in files with no BigInt |

---

## The advisory, and what a sign-off is for

`node research/qc.js widths-scan` stood at 57 entries and now stands at 56. That
is a **work queue, not a defect list**, and zeroing it is not the goal: every
entry is "correct at the level it was last run, unproven at the level it will be
run next", which is a reading order for a human.

One annotation was added, on `maxgap-law.js`'s primorial product, and it states
the bound and points at the throw that makes the edge loud. The rule the check
enforces is that **the annotation IS the audit trail** — a bare `// widths-ok:`
with no reason signs nothing off and is itself a gated finding, as is an
annotation that has drifted away from any store.

Two further sites in this pass are genuinely safe and were NOT annotated, for a
mechanical reason worth recording. `attack-x-offset-02-profile.js:245` and `:251`
read `xsb[binOf[...]]`, and `binOf` is a `Uint8Array` written once, at line 113,
as `let b = Math.floor(NB * log(q/q0)/lw); if (b >= NB) b = NB - 1;` with NB = 8,
so it holds 0..7 and can never index `xsb` out of range. The bound is provable
from the source in four lines. But the check suppresses only the five lines below
an annotation, and it requires a fixed-width store, a shift or a stride within
those five lines before it will accept one; neither read site has any of those
nearby, so an annotation placed to cover them would itself be reported as
`widths-ok-matches-nothing`. The bound is recorded here instead. Placing the
annotation on the STORE at line 110 would be accepted but would clear nothing.

Also observed, and it is a property of the advisory rather than of any script:
the scanner keys narrow containers **by name across the whole file**, so
`a3-10-lower-tightness.js` lines 86 and 142 are reported as
`Uint8Array R (holds at most 255)` when the `R` on those lines is an
`Int32Array`; the file's only `Uint8Array R` is the one at line 317. Two of the
thirteen `narrow-store-mod-variable` entries are that collision. The real one at
line 318 holds `t.S[i] % 29 <= 28`.

## QC state at hand-off

`node research/qc.js` reads **TOTAL 5**, and every one of the five is accounted
for:

- `embeds: tail-does-not-belong-to-this-code` x3.
  `research/xchan-at37-01-census.js` is the ONE red this pass inherited and did
  not touch; the live 5-hour census re-run clears it when it writes its tail.
  The other two, `attack-x-offset-02-profile.js` and
  `xchan-at29-01-segmented.js`, are this pass's and are exactly the two QUEUED
  re-embeds in Tier 2. They clear on the re-runs priced there.
- `scripts: uncited-script` x2, `research/attack-doubling-01.js` and
  `research/attack-w1hl-01.js`. **Neither is this pass's.** Both are untracked
  files that appeared in `research/` at 08:00 and 08:05 on 2026-08-21, while
  this repair was running; the baseline `qc.js` taken before the first edit here
  read `scripts 0`. They belong to whoever is writing them and need a document
  reference from that author.

Gated `widths` reads 0, as it did before. `widths-scan` reads 56, down one, and
the drop is the single annotation described above.

`node research/qc/selftest.js` passes: all 49 known positives fire and all 39
controls stay silent, so the checks still see the defects they were built on.
`node research/audit-numbers.js` was NOT run: it is a ~400 s recompute that would
contend with the 5-hour census for a core, and no edit here changes a number for
it to check — every re-run that landed reproduced its figures exactly.

## NOT REACHED

- **The two Tier 2 re-embeds**, by design and by budget: 2950 s for
  `attack-x-offset-02-profile.js` and 443 s for `xchan-at29-01-segmented.js`.
  Both files' code is repaired and both were checked against their own embedded
  tails at short level lists. Until the re-embeds land, `embeds` reports
  `tail-does-not-belong-to-this-code` on each — those two reds are this pass's,
  and they clear on the re-run.
- Every Tier 3 item. Each is a real repair and each costs its script's full
  re-run, so they belong to a scheduled pass rather than to this one. In
  ascending price the cheapest and most live are
  `attack-beta2-04-loss-budget.js` (the ladder is being extended past 79) and
  `attack-foldL-04-localized.js` (QMAX is settable from the environment).
- The `bytes:` under-report described under Tier 2, in all three census files.
- Whether any `.md` in the corpus quotes a figure that would move under any
  Tier 3 repair. None can move today, since none of those containers has been
  run past its threshold; the question only arises when a repair changes a
  reported number, and the only one that does is the 62.0 -> 93.0 MB memory line.
