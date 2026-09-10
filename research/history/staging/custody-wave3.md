# Custody wave three: the two stopwatches are gone, and the last judgement cases are bound

<!-- ledger
id: Q-custody-wave3
status: ANSWERED
todo: none
question: Can the remaining hand-pasted script tails be bound to the code that produced them?
verdict: Nine of the twelve are now bound by qc/embed.js and the counter falls from 12 to 3; the three that remain are the three priced over budget and each carries a recorded reason, with qc.js at TOTAL 0 for this wave's scope throughout.
-->

**Counter: 12 hand-pasted tails to 3.** Nine of the twelve are now bound by
`research/qc/embed.js`. The three that remain are the three priced over budget,
and each has a recorded reason below. Every file touched here was verified with
`node research/qc/embed.js --check` after its embed, and `node research/qc.js`
stayed at TOTAL 0 for everything in this wave's scope throughout.

The classes this wave had to clear were the ones wave two left because they need
a reader: two tails whose content depended on a WALL CLOCK, one tail that
asserted a table its code had never printed, and seven tails carrying
hand-written prose or a second invocation's output inside the OUTPUT region,
where an embed would silently destroy it.

---

## 1. The two stopwatches

Both are fixed the same way: the gate that decided what the tail contained is
now a property of the arithmetic, not of the machine.

**`research/a3-09-histogram-operator.js`.** The fold diagonal ran to `p <= 160`
and broke out when a level cost more than 33 wall-clock seconds, so the number
of points in its two regressions was set by machine load. Wave two measured the
consequence: a loaded machine stops at `p = 137` and reads `0.767` and `0.729`
where the pasted tail reads `0.770` and `0.738`.

The gate is now `const DIAGONAL_MAX_P = 139`, stated in the code with the
reason. **139 rather than 137 is the load-bearing choice.** It is the level the
2026-08-16 run actually reached, it is the last affordable one (the
inclusion-exclusion roughly doubles per prime step, so `p = 139` costs about
75 s of the script's 198 s and `p = 149` would add about 150 s more), and it
makes the diagonal 31 points on every machine. **Both fitted constants
reproduce exactly**: `all 31 points (p=7..139): a=-0.235 b=1.2992 R2=0.99292 ->
tail ~ exp(-2p'/(0.770*mbar))` and `p>=37 only (23 points): a=-0.452 b=1.3550
R2=0.99355 -> tail ~ exp(-2p'/(0.738*mbar))`. So no document in the corpus
carries a stale constant from this file, and the forecast in TODO item 2 and in
the thirty-first pass entry — that the constants would move — is superseded
rather than confirmed. The alternative bound, 137, would have moved them for no
gain.

One further change was needed to make the block re-checkable. The diagonal's
last column is the level's cost in seconds and was printed as a bare number, so
`qc/tailfmt.js` could not see it as volatile and every re-run would have failed
`--check`. It now prints with an `s`, the header column is renamed `s` to
`cost`, and `tailfmt` normalises it. The 14 figures the guard flagged as
missing on the first attempt were exactly those 14 cost values; nothing else in
the block moved, and a line-by-line diff of the old and new blocks shows only
timing brackets and the replaced stopping line.

**`research/a3-01-misalignment-ledger.js`.** Its fold progress lines printed
whenever 30 wall-clock seconds had passed, which is why wave two saw `copy
9/31`, `18/31` and `27/31` vanish on a loaded machine. The gate is now
`const PRINT_EVERY_KTH_COPY = 9`, tested on the copy index. At fold 31 that is
copies 9, 18 and 27 of 31, so the 2026-08-16 tail reproduces digit for digit
(`1807708938`, `3615417901`, `5423126831` at the three copies, and `G2=348 at 4
site(s)`). Folds 11 through 29 now print one to three progress lines of the same
kind, which is new output and destroys nothing. The embed took no `--force`:
every figure of the legacy block is in the new run. The banner's own prose about
the original run's cost moved into the file header, verbatim and quoted, because
an embed header can only state the run it made.

## 2. `genealogy.js`: the table was right, the limit was not

The tail asserted a six-entry convergence table with no code behind it and
closed it at `0.41625`. The code now computes the table — `delta(p) = D(p)/p#`
accumulated as `prod (1 - 2/q)/2`, sieved to 9973 — and prints it. **All six
entries reproduce exactly**: `0.3253 (13), 0.3661 (31), 0.4007 (97), 0.4093
(499), 0.4140 (1999), 0.4150 (9973)`. Nine of eleven figures were sourceless and
all nine are now sourced, which is the good half of the finding.

The limit is not. `2*C2*e^{-2gamma} = 1.3203236316937248 * e^{-1.1544313298} =
0.4162145328309681`, so the fifth decimal is 1 and not 5. The code has always
printed `0.41621`; only the paste and the header comment said `0.41625`. This is
the single figure the embed guard refused on, and the embed was forced after the
old block was quoted here:

```
// OUTPUT (2026-08-14):
// p=5:  slots=3    orphans=0 edge-children=3  (Seam Lemma: 3)
// p=7:  slots=15   orphans=0 edge-children=5  (Seam Lemma: 5)
// p=11: slots=135  orphans=0 edge-children=9  (Seam Lemma: 9)
// p=13: slots=1485 orphans=0 edge-children=11 (Seam Lemma: 11)
// delta*ln^2(p): 0.3253 (13), 0.3661 (31), 0.4007 (97), 0.4093 (499),
//                0.4140 (1999), 0.4150 (9973) -> 0.41625 (2*C2*e^{-2gamma})
```

The file also had no READINGS banner. It has one now, with the custody note in
it. **`0.41621` is the bound truth from this file onward.** The other sites that
carry `0.41625` are listed in §5; they are not edited here.

## 3. Prose and second invocations, moved out of OUTPUT

The rule applied in every case: the OUTPUT region is a recording of one run, so
anything a reader wrote and anything a *different* invocation produced moves
above it or into READINGS, verbatim, with a provenance line naming the
invocation that does produce it. Nothing was deleted, and nothing was reworded
except to indent it and put it in quotation marks, which is necessary because
`qc/tailfmt.js` finds the OUTPUT banner by scanning backwards for the last line
matching `// OUTPUT`, and a moved banner line below the real one would capture
the tail.

| file | what was inside OUTPUT | where it went | what the tail is now |
|---|---|---|---|
| `attack-beta2-04-loss-budget.js` | the entire eight-section summary, hand-written from a 531-line run; nothing printed it | READINGS 0, with the roundings it performs named | the 531-line run, 9.8 s |
| `a3-08-adjacent-pairs.js` | section `[6b]`, the T31 leg from a separate detached `--t31` run of 2,620 s with 28 of 31 progress lines elided | READINGS 0, invocation named | the default run, 89.6 s |
| `a3-10-lower-tightness.js` | the `deep31` and `deep37` legs, two further modes that `process.exit(0)` before the main leg | READINGS 0b, both invocations named | the main leg, 27.6 s |
| `attack2-rankin2d.js` | sections (A) to (F), a hand summary of the default run and of `--deep` | READINGS 0, both invocations named | the default run, 168.3 s |
| `natal-cap-32-wrap-identity.js` | a hand summary of `small`, `at13` and `at17`, the last fanning out to 6 + 6 workers | READINGS 0, all three invocations named | `small`, 50.4 s |
| `a3-02-diagonal-f.js` | two invocations pasted together, `fast <deep results>` and `deep` | see below: unified, not moved | one run of mode `all`, 268.1 s |

**`a3-02-diagonal-f.js` is the one composite that dissolved.** Its mode `all`
runs the fast leg and the deep leg in one process, and PHASE C' takes the deep
leg's five results from the command line, so a single invocation reproduces both
halves and PHASE D then recomputes from scratch the five numbers PHASE C' was
handed. That makes the tail self-checking.

**A precision finding came out of it.** Passing the deep results as the block
prints them (`1.844e-2`, `32.2105`) reproduces every table cell but moves PHASE
E's two `ln(1/f)` intercepts by 0.001, to `1.357` and `1.601` against the pasted
`1.358` and `1.602`. Passing them at full precision — `f = 114848070/6226553025
= 0.018444887490538957`, `mbar = 200560490130/6226553025 = 32.21051668952904` —
reproduces `1.358` and `1.602` exactly. So the 2026-08-17 run was fed the exact
values, the pasted block is right, and the invocation is now recorded in the
file header where the next reader will find it. No value moved.

## 4. The three left, and why

| file | cost | reason |
|---|---|---|
| `natal-cap-33-overnight.js` | ~38 min | four separate run modes (`run1|run2|run3|smoke`), priced over budget by TODO item 1 and untouched here. A concurrent wave is working the over-budget tier (`custody-overnight.md`); this file belongs to that wave, not this one. |
| `natal-cap-34-wrap-precision.js` | ~35 min over six stages | a six-command chain sharing a scratch directory through `NC34_DIR`, with `exact13` alone at 1466 s. `embed.js` binds one invocation and this needs six in order. Its OUTPUT header already carries a full provenance declaration naming all six commands and their costs, which is the honest form for a tail of this shape. |
| `natal-cap-37-at41-march.js` | 6.16 h | the `@41` march itself, pasted byte for byte out of three log files that live outside the repository at `~/Files/primeoire-runs/at41/`. Not reproducible inside a migration budget. Its header already declares every block's source log, date and elision. |

## 5. What the corpus still carries

**`0.41625` for `2*C2*e^{-2gamma}`, five live sites.** The value is wrong in the
fifth decimal at every one of them, and `audit-cross-document-constants.md`
already found this and called it "one wrong digit, uniformly, which is precisely
the class a cross-document check can never catch". Nothing below is edited by
this wave.

| line | what it says |
|---|---|
| `paper/moire-primes.md`:266 | `2C₂e^{−2γ} = 0.41625…` |
| `paper/beta2-note.md`:183 | `with 2C₂e^{−2γ} = 0.41625…` |
| `paper/beta2-note.md`:185 | the numerical verification sentence, `0.41625` |
| `research/sift-limit-attack.md`:201 | `G₂ ≲ (2F/0.41625)·pₙ·ln²pₙ` |
| `research/history/staging/attack-block-08-secondmoment.md`:352 | `G2 <~ (2F/0.41625) p_n ln^2 p_n` |

`research/attack-beta2-04-loss-budget.js`:183 prints `(the 0.41625 that
maxgap-law.md carries)`. `maxgap-law.md` no longer carries it, so that string is
stale in two ways at once and is a code change, not a document one.

**`0.770` and `0.738` need no change anywhere.** Outside `a3-09` itself the only
occurrences are `TODO.md`:73 and `CHANGELOG.md`:856, and both are forecasts that
these constants WOULD move once the stopwatch was replaced. They did not, because
the bound was set at 139. Those two sentences are now wrong in their prediction
and should be retired when TODO is next pruned.

## 5b. The nine, verified

Every one re-ran under `node research/qc/embed.js --check` after its embed and
returned `code-sha256 matches` / `out-sha256 matches`. For the two stopwatch
files that is the whole point of the wave: a3-09's 31-point diagonal and a3-01's
`copy 9/31 | 18/31 | 27/31` lines came back identical on a second, differently
loaded run.

| file | invocation the tail records | wall |
|---|---|---|
| `a3-01-misalignment-ledger.js` | `FOLDS=7,11,13,17,19,23,29,31 node --max-old-space-size=12000 …` | 115.1 s |
| `a3-02-diagonal-f.js` | `node --max-old-space-size=8000 … all 0.018444887490538957 32.21051668952904 6226553025 348 4` | 268.1 s |
| `a3-08-adjacent-pairs.js` | `node research/a3-08-adjacent-pairs.js` | 89.6 s |
| `a3-09-histogram-operator.js` | `node --max-old-space-size=8000 …` | 197.7 s |
| `a3-10-lower-tightness.js` | `node --max-old-space-size=4096 …` | 27.6 s |
| `attack-beta2-04-loss-budget.js` | `node research/attack-beta2-04-loss-budget.js` | 9.8 s |
| `attack2-rankin2d.js` | `node research/attack2-rankin2d.js` | 168.3 s |
| `genealogy.js` | `node research/genealogy.js` | 0.1 s |
| `natal-cap-32-wrap-identity.js` | `node research/natal-cap-32-wrap-identity.js` | 50.4 s |

## 6. Riders for the next wave

- **`tailfmt.locate` scans BACKWARDS for the last `// OUTPUT`.** Any prose moved
  into READINGS that begins a line with that word silently steals the tail. Five
  files in this wave needed the moved banner indented and quoted for that reason.
- **The `readings-not-traceable` advisory rises when this work is done right.**
  It went 137 to 139 across the wave, and the increase is entirely material that
  moved from OUTPUT into READINGS with a provenance declaration. The advisory
  counts figures a reading quotes that the block does not print; a declared
  second invocation is exactly that, by construction. It is not a defect and
  should not be driven down by deleting the declarations.
- **A bare number that is really a duration breaks `--check` forever.** Print it
  with an `s`. `tailfmt`'s volatile list matches `\d+(\.\d+)?\s*(ms|s|sec|secs|
  seconds)` and nothing else.
- **The gate showed 5 `uncited-script` findings during this wave**, all from
  untracked scripts written by a concurrent import wave (`fdecay-deep-00-core`,
  `import-interp-01`, `import-interp-02`, `scanstat2-02-crossover` and one
  more). None are this wave's and none were touched.
