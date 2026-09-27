# The defect-class hunt: every script against six numeric classes

<!-- ledger
id: Q-defect-class-hunt
status: ANSWERED
todo: none
question: Do the five bug classes this corpus has already been burned by, plus numeric precision, appear anywhere in its 247 scripts?
verdict: Confirmed defects in every class swept, with 2^53 overflow at five confirmed in seven files (an assert that cannot fail, an LCG of period 10,466) and wall-clock gating at eight, and not one of the five confirmed overflow defects is in a deep-level script, which refutes this file's own first-pass conclusion; no gate check lints for any of these.
-->

*(2026-08-20. A sweep of all 235 indexed scripts in `research/`, and of the qc
helpers beside them (247 `.js` files in all), for the five bug classes this
corpus has already been burned by, plus the numeric-precision class. Method: grep-driven triage per class, then the context of every hit read
— a hit is a suspicion, not a defect. Two findings were confirmed by
independent recomputation in a session scratchpad, authorised by the standing
compute rule's flagged-defective exception and by nothing else; no embedded
artifact was re-run, and every figure quoted below is either read from an
embedded OUTPUT or derived from one. No script or OUTPUT block was edited.
Legend: **[VERIFIED]** checked computationally here; **[READ]** established by
reading the code and the parameters it actually runs at; **[CITED]** taken from
an embedded artifact.

**Custody note.** The worktree was clean at the start of this sweep and is not
now: a concurrent "readings traceability" session committed twice during it
(`81593bf`, `5717e58`) and has ~34 further scripts modified. Nothing was written
or reverted from here beyond this file. Those edits are **pure additions with
zero deletions, and no non-comment line among them** [VERIFIED, `git diff
--numstat` and a non-comment filter over the added lines]; they append READINGS
text at the end of files, so no earlier line number moves. Every file:line
reference below was re-checked against the tree as it stands.)*

## The three-tier summary

| class | confirmed | latent | the one that matters |
|---|---|---|---|
| 1. 32-bit shift alias | 1 (already known) | 3 | the machine index cannot see a3-03's banner |
| 2. wall-clock gating | 8 | 7 | a 2000 ms timer sets the length of an OEIS draft |
| 3. 2^53 overflow | **5**, in 7 files | 9 | an assert that cannot fail, and an LCG of period 10,466 |
| 4. pooled error floors | 3 | 4 | `σ_J` understated up to 7.5x, and `lemmaV-parseval` runs the dangerous way |
| 5. popcount32 on q > 32 | 0 new | 1 | — |
| 6. neg. modulo / Int32 range | **0** | 1 | — |

## The gate does not lint for any of these

`research/qc/` runs eleven checks and every one is about provenance, citation,
quotation, calibration or search convention. **Not one reads code for a numeric
hazard** [VERIFIED: no `<<`, `2**53` or shift-related pattern appears anywhere
in `research/qc/*.js`]. Class 1 was caught by a human noticing a disagreement,
not by the gate, and the gate would not catch it again. Nor would it catch any
of the confirmed items below.

## Class 1 — the 32-bit shift alias

Every `<<` and every variable-count `>>`/`>>>` in the corpus was listed and
read. Only three scripts index a shift by a RESIDUE, which is the only shape that
aliases:

| site | verdict |
|---|---|
| `research/a3-03-f-from-census.js:86` | CONFIRMED, already known and quantified |
| `research/grain-census.js:86,103` | CLEARED today, LATENT |
| `research/fdecay-deep-01-census-defect.js:49` | CLEARED — a deliberate byte-for-byte reproduction of the defective evaluator, sitting beside its own alias-free replacement at :94 |

All other `1 << k` in the corpus index a SUBSET MASK over a short prime list
(6 to 14 primes), or use the correct `(i >>> 5)` word index with `(i & 31)`.
Every `& 31` site in the corpus pairs with a correct word index [VERIFIED, 5
sites: `attack-ab-coupling-01:214`, `attack-ab-coupling-02-lp:200`,
`localized-04-maxsum:102`, `fdecay-deep-01:94,95`].

**The threshold is exact, and it is q >= 37.** For q <= 31 every residue is
<= 30, so `1 << r` is faithful; 37 is the first prime with a residue 32 apart
from another avoided residue [VERIFIED, scratchpad `gc.js`: the single-word
mask reproduces the exact avoided-set size for q = 3..31 over all d <= 204, and
first departs at q=37/d=42, q=41/d=48, q=43/d=54].

### CONFIRMED 1 — `a3-03-f-from-census.js`, and the index does not surface it

The defect itself is known, quantified and correctly banner-ed in prose: the
producer's OUTPUT is exact for x <= 31 and wrong for x >= 37 by a factor in
[0.62474, 1.04904] over 34 levels, worst 0.61323 at x = 199 [CITED,
`research/fdecay-deep-01-census-defect.js` OUTPUT §2, an embedded artifact].
`research/a3-03-f-from-census.md` and `research/f-decays.md` both open with the
banner. **Nothing below is a new defect in the mathematics.**

**What is new is that the machine index cannot see it.**
`research/gen-scripts-index.js:10` builds `head = src.split('\n').slice(0, 40)`
and tests `/CORRECTION|SUPERSED|NOT a valid|⚠|WRONG/i` against it. a3-03's
banner sits at line 600, inside READINGS, and says "DEFECT" — a word not in the
regex — so a3-03 is absent from SCRIPTS.md's table "Read this first: scripts
whose header carries a correction", the table whose own instruction is **"Never
quote a figure from one of these without reading its banner first."**
[VERIFIED: the 51 rows of that table were extracted and a3-03 is not among
them.] The corpus's worst known numeric defect is the one case the warning
table omits.

Same shape, lower severity, also omitted: `a3-06-origin-vs-max.js:656`,
`a3-07-pane-overlap.js:730`, `attack-06b-difference-map.js:388,401`,
`attack-hm-basis.js:930,942`, `attack-L-law.js:637`, `a3-08-adjacent-pairs.js:317`.

### LATENT 1 — `grain-census.js`, one prime away

`rhoDirect` (:86) and `addOff` (:103) hold each prime's avoided set in one
32-bit word. They are correct only because every prime they are ever handed is
<= 23: `ALLP` stops at 23, `LEVELS` stops at 23, and `predicted`/`rhoDirect` are
called exclusively with `primesUpTo(p <= 23)` [READ, all six call sites incl. the
tail at :306-326]. `FUTURE = [29,31,37,41,43]` never reaches a shift — it is
consumed only by `projectStrata`, which is pure `(q - 2m)` arithmetic.

**Threshold: adding any prime >= 37 to `ALLP`/`LEVELS`.** The script is cited by
`paper/moire-primes.md`, `research/GLOSSARY.md`, `research/OBSERVATIONS.md`,
`research/ATTACKS3.md`, `web/bench/` and eleven more — extending its ladder is
exactly the natural next question, and it would corrupt a heavily-cited producer
with no error and no test failure (its own self-checks all live at x <= 23).

### LATENT 2 — `attack-theta-margin.js`, one row away

`ceilingAt` (:193, 208-213, 224) carries the smooth-number mask in a TWO-word
`(l, h)` pair with the correct `j < 32 ? ... : j - 32` split, so it is faithful
up to 64 primes. Its z-ladder is `[31, 43, 61, 101, 151, 211, 307]`, and z = 307
uses 61 odd primes — three short of the ceiling [VERIFIED]. **The next row of a
roughly geometric ladder aliases: z = 331 gives 65 odd primes.** The script's own
prose asks for more rows ("the last two columns ... still converging upward").

### LATENT 3 — `sift-limit-lemmaV.js:96`

`maskOf` packs one bit per prime below z into a single word and the gcd of two
moduli is then read off `mi & mk[j]` (:138). z runs to 47 (14 primes) [READ,
:481], so it is safe by a wide margin. **Threshold: z >= 138** (33 primes).

### CLEARED-NOTABLE, class 1

- **`natal-cap-34-wrap-precision.js:164`** carries `assert(K<=64, ...)` before
  its two-word mask. This is the model: the guard is executable, not a comment.
- **`natal-cap-21-beyond-chebyshev.js:184`** is the same two-word pattern with
  the bound stated only in a comment ("q <= 47 < 64"). Safe because
  `exactMoments56` is called once, at @11, where the scour primes stop at 47
  [READ, :440]. At @13 they run to 173 and it would alias — but @13 is handled
  by a different script, `natal-cap-27-t4-at13.js`, which uses a per-residue
  COUNT array with per-prime offsets and no mask at all. The corpus already
  worked around this wall once.
- **Three alias-free representations exist in-repo** and any of them is the fix
  for a3-03: `a3-09-histogram-operator.js:176-190` (`cnt[]` per residue plus a
  `dist[]` size), `natal-cap-27-t4-at13.js:108-121` (`CNT`/`OFF`/`F`), and
  `fdecay-deep-01-census-defect.js:80-96` (ceil(q/32) words per prime).
- Every remaining `1 << n`: subset enumeration over 6-14 primes
  (`BLOCK1`, `POOL`, `mids`, `primesTo(43)`), self-limiting because the loop is
  2^n. Worth one line only because at n = 31 `1 << 31` is negative and
  `for (m = 0; m < (1<<n))` silently runs zero times rather than crashing.

## Class 2 — wall-clock gating

464 `Date.now()` hits across 158 files; no `process.hrtime`, no
`performance.now`. **The known burn is closed:** `a3-09-histogram-operator.js`
and `a3-01-misalignment-ledger.js` carry no timing condition today (commit
`d6c5a9b`), and a3-09:366 now says in print that its diagonal stops at
`DIAGONAL_MAX_P = 139`, "not at a wall-clock budget".

Two facts make the rest legible. First, what the gate tolerates: `qc/tailfmt.js:50-61`
scrubs `[53.4s]`, a bare number followed by `ms|s|sec|secs|seconds`, quoted-key
timings, ISO dates, versions and MB/GB/KB, **and nothing else. `min`, `h`,
`hours`, `days`, bare unitless columns and derived rates are not scrubbed**
[VERIFIED by reading the list]. Second, `qc.js embeds` compares only
`code-sha256` against the head bytes; `out-sha256` is exercised only by
`qc/tails.js` and `embed.js --check`, neither of which is in `qc.js --full`.
So everything below is invisible to a green gate and surfaces the first time
anyone re-verifies on other hardware.

### CONFIRMED 2 — `natal-cap-04-packing-cap.js`, the clock decides the mathematics

`rho5BB(L, seed, budgetMs)` sets `const deadline = Date.now() + budgetMs` (:161)
and aborts the branch-and-bound at `:180`, returning `exact: !timedOut`. Three
call sites, three budgets: 4000 ms (:279), 8000 ms (:303), 2000 ms (:397).

What the clock chooses [VERIFIED by reading :255-290 and :393-402]:

1. **The staircase length.** `for (L = 1..400) { const r = rho5BB(L, prev, 2000);
   if (!r.exact) break; }` — the printed diameter list ends where the timer
   trips.
2. **The `exact` label on every row of the rho table**, hence the headline
   `exact for 83/184 lengths` (:287).
3. **The lower bounds themselves.** `:284 prevExact = Math.max(prevExact, lb)`
   feeds `:274 if (lb < prevExact) lb = prevExact`. A timeout at one L leaves
   `prevExact` behind, so **every larger L gets a weaker lower bound.** The
   numbers do not become wrong — they stay valid bounds — they become
   hardware-dependent and weaker on a slower box.

**The embedding run did not time out** [VERIFIED: no "timed out at L=" line in
the tail, and the staircase prints all 17 terms], so the published figures are
correct as produced. The defect is that nothing in the artifact says they are
contingent.

**Blast radius, and it reaches the publication layer:**

- `TODO.md:619`, under **"Held under moratorium: OEIS drafts"** — "two-class
  minimal diameters 2,8,32,38,62,86,… (natal-cap-04, new)". A proposed OEIS
  sequence whose term count is set by a 2000 ms timer.
- `research/natal-cap-04-packing-notes.md:63` (the 17-term list, searched
  against OEIS **by value**) and `:89-91` ("exact for all L <= 400 ... exact at
  83/184 sampled L up to 960").
- `research/NATAL-CAP-CAMPAIGN.md:57`; the script's own READINGS 6-7 (:659-678,
  "AN APPARENTLY NEW OBJECT ... NOT in OEIS"); SCRIPTS.md cited-by `TODO.md` +12.
- **No correction banner** — the header (:1-52) is plan only.

**The fix already exists in the repo, in the sibling OEIS-draft script.**
`attack2-rankin2d.js:136-139` runs the same shape of exhaustive search against a
`nodeBudget = 2e9` and returns `{m, exact: r.complete}` — a deterministic budget
with an honest exactness flag. Porting that to `rho5BB` (a node counter in `rec`
instead of `deadline`) makes the staircase reproducible without changing a
number, and lets the OEIS draft state its own extent.

### CONFIRMED 3 — `natal-cap-27-t4-at13.js:275-278`, the clock decides how many rows print

`setInterval(..., 120000)` writes a percentage line to **stdout** every two
minutes. The embedding run took 1537.1 s, so ~12 such rows are baked into a
custody-bound tail, carrying `2.0 min | 4.0 min | ...` — and `min` is not
scrubbed. `:286` prints `${X} min wall` likewise. `T4` itself is deterministic.
Cited by `TODO.md` +22. No banner. Fix: route the ticker to stderr.

### CONFIRMED 4-9 — wall clock IS the printed number, inside custody-bound tails

All carry `code-sha256` + `out-sha256`, none is headered, and in each case only
the timing-derived figure moves.

| file:line | the figure that survives `normalize()` |
|---|---|
| `scanstat-t37-02-validate.js:95-101` | `M slots/s`, and "single-threaded projection: X h"; per-shard `3.08 h, 0.77 h, 0.62 h, 0.51 h, 0.38 h` |
| `var41-price.js:245,260` | `1.104e+8 / 1.313e+8 / 1.441e+8 ops/s` and `421 h` — quoted back in its own READINGS :457-458 as a finding |
| `foldL-window5-01-extinction.js:137` | `3.734e+7 slots/s`, `4.312e+7 slots/s` |
| `attack-beta2-05-covering-prune.js:309` | a bare-integer ms column: `1,0,0,1,1,1,5,38,89,173,840,4867,18596` |
| `fdecay-deep-01-census-defect.js:179` | a bare `s` column (this file has a banner, but about the shift bug) |
| `verify-ladder-big.js:44` | `0.0 min, 1.4 min, 53.0 min`, plus stderr progress (embedded `--streams both`) |

**No document quotes any of these six figures**, so the damage is confined:
`embed.js --check` and `qc/tails.js` can never go green on them on any machine
but the one that embedded them.

### LATENT, class 2

- **`discrepancy-two-class.js:130`** — a 30 s stdout progress tick inside a
  custody-bound tail. Zero ticks fired on the embedding run (elapsed 13.3 s)
  [VERIFIED: the tick string appears once in the file, at its source line], so
  the tail is clean today. It is cited by `research/G2-STATE.md` +33 — the
  most-cited script carrying this shape.
- **`localized-04-maxsum.js:170`** and **`maxgap-law.js:158`** — identical 30 s
  ticks, safe only because neither has an embedded OUTPUT tail yet. Cited +38
  and +54. They break the day either is migrated to the embed format.
- **`natal-cap-39-triple-census.js:367`** and **`xchan-at29-01-segmented.js:281`**
  — a sub-class worth naming: `if (tF > tF0) { cTrip = ... }` self-calibrates a
  cost constant from wall clock and carries it level to level. On a machine fast
  enough that the elapsed rounds to 0 ms the constant stays `null` and the line
  flips to the string "no calibration yet (first level)". Both tails already
  contain both branches, and natal-cap-39 already prints
  `restricted 0.00 s predicted` — it is sitting on the boundary.
- **`h2-prototype.js:118,167`** — `deadline = timeoutSec ? ... : Infinity`, and
  on trip it prints `TIMEOUT at m=` and truncates the table. Safe because
  `--timeout-sec` defaults to 0 and the file has no embedded tail. Note it
  already accepts a `maxNodes` alternative in the same signature.
- `natal-cap-27:154` (opt-in progress FILE, no stdout, consumer reads only a
  monotone counter); `scanstat-t37-04-run.js:139` (`35.2 min`, read from on-disk
  shard JSON rather than the live clock, so stable — but it bakes a past
  machine's wall clock into a custody tail); `natal-cap-37-at41-march.js:568-594`
  (`1185e6/s => 13.9 h wall`, hardware-dependent but in a legacy hand-pasted
  block explicitly labelled a dated bench note).

### CLEARED-NOTABLE, class 2

~150 hits are the house elapsed-timer idiom
(`const el = () => ((Date.now()-T0)/1000).toFixed(1)+'s'`) across ~100 files,
emitting `[12.4s]` — directly matched by `VOLATILE`, never compared. 173 more
are bare `const t0 = Date.now()` anchors; each was traced by name into every
later comparison, and the only real consumers were the items above. `natal-cap-20-third-order.js:275`
prints `{"pn":...,"secs":N}` and looks unscrubbed but is not — `tailfmt.js:58-60`
added the quoted-key rule for exactly that shape, whose comment records it as
"the shape that made two 2026-08-19 embeds permanently fail --check". A dozen
`min`/`h` hits in custody tails are `min` meaning *minimum* or `h` as a math
variable. `ms` in `exact-g2-ladder.js:143`, `attack-L-law.js:795,826` and
`foldL-window5:340` is a maxsum array, not milliseconds. `qc/embed.js` refuses
to write a tail at all on ETIMEDOUT ("A tail is a record of a completed run or
it is not a record") — the harness is stricter than the scripts.
## Class 3 — 2^53 overflow in Number arithmetic

**Five distinct defects across seven files, and the way they were missed is the
lesson.** A first pass swept this class top-down, by asking which scripts reach
a primorial W >= 2^40, and concluded zero. That pass was wrong. **Not one of the
five lives in a deep-level script.** They live in scripts whose primorial level
is modest but which form a large integer for some other reason: `x²` at
x = 10⁹, an LCG multiplier, a strong-pseudoprime trap literal. A second,
pattern-driven pass over all 247 files — grepping the overflow SHAPES rather
than the deep levels — found all five.

**The corpus's headline numbers survive.** Every confirmed defect corrupts
low-order digits below print precision, a side-check, or the quality of a
search. None moves a certified theorem-level figure. But two of them make a
check VACUOUS, which is worse than a wrong digit, because a vacuous check reads
as a passing one.

### CONFIRMED 10 — `natal-cap-37-at41-march.js:399`, an assert that cannot fail

The fourth strong-pseudoprime trap is written as the literal
`3825123056546413051`, which is above 2^53 and so is **not the number the
program gets**. It rounds to `3825123056546413056` [VERIFIED here], an EVEN
number, so `assert(!isPrimeMR(v))` is satisfied by the `x % 2` shortcut before
the 13-base Miller-Rabin set is ever entered. The true literal is odd
(`BigInt("3825123056546413051") % 2n === 1n`).

The OUTPUT block at :700-701 and READINGS 7 at :926 both claim **"four classical
strong-pseudoprime traps"**. Three of the four are real tests. The fourth has
never run.

A corpus-wide scan of integer literals found this is the **only** unsafe literal
in executed code in all 247 files. It does not touch the @41 certification —
that engine's own PART 0 audit is correct and is separately cross-checked by
sieve and by BPSW. **Fix:** one character. Make it `3825123056546413051n`, or
pass it as a string.

The irony is worth recording: the script that contains the corpus's best 2^53
audit is the one whose 2^53 defect nobody found, because the defect is in a
literal and the audit tabulates expressions.

### CONFIRMED 11 — one broken LCG, copied into three files

`seed = (seed * 1103515245 + 12345) & 0x7fffffff` appears in
`h2-randomised.js:65`, `attack-theta-margin.js:55` and
`fold-profile-13-hotspot-sweep.js:132`. The product reaches
`0x7fffffff * 1103515245 + 12345 = 2.37e18`, which is **263 x 2^53**, so it is
inexact from the second call at every seed used. The `& 0x7fffffff` then masks
garbage low bits.

**The generator collapses** [VERIFIED here, independently: from seed 12345 the
state enters a cycle after a tail of 5938 and the **period is 10466**, against
~2^31 for a correct 31-bit LCG; `seed & 7` takes only **four of eight** values,
{0, 1, 4, 6}].

Consequences differ per file and none is fatal:

- **`h2-randomised.js`** is worst. Its 200,000 "random restarts" are a few
  hundred distinct ones. Its covers are verified witnesses, so **its lower
  bounds stand** — they were simply found by a far weaker search than the file
  claims. No embedded OUTPUT.
- **`fold-profile-13-hotspot-sweep.js`** — the three control rows in its
  embedded OUTPUT share ~5196 centres, so they are not the independent draws the
  table implies. Per-row statistics are not degenerate.
- **`attack-theta-margin.js`** — ~10,960 draws before the first revisit, so its
  embedded run never reused a state. The stream simply is not the LCG the code
  says it is.

None carries a banner. **Fix:** `Math.imul(seed, 1103515245)`, or the multiplier
1664525 that `discrepancy-two-class.js:401` already uses — that one peaks at
0.794 x 2^53 and is exact over 2e6 steps. One line, one constant away, and the
correct version is already in the corpus.

### CONFIRMED 12 — `a3-06-origin-vs-max.js:287`, wrong integers in the tail

`const win = xp * xp - 2` runs over landmarks up to x = 1,000,000,007 (:283),
where `xp²` reaches 1.0e18 = **111 x 2^53**. Two integers in the embedded OUTPUT
are wrong [VERIFIED here against BigInt]:

| line | printed | exact | off by |
|---|---|---|---|
| :516 | `10000007400001366` | `10000007400001367` | −1 |
| :518 | `1000000018000000100` | `1000000018000000079` | +21 |

Blast radius is contained: **no document quotes either integer**, and the
derived margins (1.00e9, 2.49e15, and the `ZONE-POSTULATE.md` §5 calibration)
are quoted to three significant figures and are unaffected. The same expression
at :299 runs only to x <= 29 and is safe. No banner. **Fix:** BigInt at :287, or
a note that the column is 3 s.f.

### CONFIRMED 13 — `window-check.js:38`, the whole top decade

`const w = pn * pn - p` with the default `N = 1e9` (:8). `pn * pn` exceeds 2^53
for every prime above **94,906,265** [VERIFIED: `ceil(sqrt(2^53))` = 94906266],
which is the entire top decade of the default run. 117 of 120 sampled pairs
above 5e8 print a wrong window, maximum error 102.

The margins and the VERDICT are ratios and are unaffected at ~1e-16 relative;
`ZONE-POSTULATE.md` §4 quotes windows to two significant figures only. There is
no embedded OUTPUT block and no banner. Worth flagging forward: the
`window-check.js 1e11` run recommended at `G2-STATE.md:1120` pushes windows to
~1e22, where errors grow to ~10³ and remain invisible at the quoted precision.

### CONFIRMED 14 — `natal-cap-34-wrap-precision.js:631`, a false "exact" label

`WJ += (T[s]*T[s] - T2[s]) / 2` at @19 accumulates to a final value of
6.3 x 2^53. Double gives `56898887621686610`; BigInt gives
`56898887621686874`, **off by 264**. The five printed digits (5.6899e+16) are
right; the label at :659 says `exact` and is not. Quoted in
`research/history/staging/qc-wave6-W.md:236`. The file has a correction banner,
for unrelated issues.

### LATENT, class 3 — with exact thresholds

The instructive pattern is that **the corpus keeps rediscovering this class and
fixing it locally without propagating the fix.**

- **`natal-cap-23-covadj-proof.js:147,156`** — `SAB`/`SwJ` integer accumulators
  feed `BigInt(SAB)` for an "EXACT sign verdict", with **no guard**. At x = 19
  they reach 1.17e15, 7.7x under. **Threshold x = 23: SAB ≈ 7.46e18 = 827 x
  2^53**, and the sign verdict goes silently wrong. Its sibling
  `natal-cap-26-minus-half.js:135` is the identical shape and IS guarded by
  `SI()` at :67, so it fails loudly at x = 23. Same shape, two files, one guard.
  **This is the one to fix before anyone runs @23.**
- **`natal-cap-30-skeleton-bound.js` `scan()`** — addend `w*C` = 4.078e13 at @23.
  **Threshold @29**, addend 2.99e16 = 3.32 x 2^53. Already known:
  `natal-cap-36-skeleton-door.js` documents it and fixes it with a split-weight
  accumulator (`w = 2^14·w_hi + w_lo`), reproducing @23 as a control.
- **`scanstat2-01-t31.js:113`** — `s2[t] += v*v` in plain Float64 ends at
  2.95 x 2^53 at T31 m=64 **and is nevertheless exact**, by an accident worth
  knowing: slots are odd, so every `v` is even, every addend is a multiple of 4,
  and multiples of 4 add exactly below 2^55. Margin 1.36x; threshold ≈ m = 75 at
  this level. T37 breaks the exemption at 28.8 x 2^55 — which is exactly why
  `scanstat-t37-01-engine.js` has its BigInt flush. Signature (b) confirmed and
  already closed upstream.
- **`attack-beta2-03-exact-strata.js:110`** — `(m*list[i]) % Q` with Q = 19#
  runs at 9.41e13. **Threshold: adding level 23**, which the file already has
  tiles for — Q² = 4.98e16 = 5.5 x 2^53, silent wrong residues.
- **`discrepancy-two-class.js:224`** — `k*W − N*pos[k−1]` peaks at
  N·W = 8.14e15 = **0.904 x 2^53** at x = 23. Exact, with 1.11x headroom, and
  the file prints its own `2^53 safe?` column. x = 29 throws loudly.
- Also: `import-suen-01-transfer.js` (threshold x = 43),
  `import-bridge-02-experiment.js:281` (0.51 x 2^53 at x = 17; adding x = 19 to
  RIDE goes 2900x over), `natal-cap-35:213` / `natal-cap-39:202` (`tot === N*W`,
  fails visibly rather than silently), `natal-cap-32:191` (`C4(n)` crosses at
  n = 9742; the at17 mode's N = 14850 is exactly representable, so the latent
  window is n in 9742-14847), `fdecay-deep-00-core.js:96` (hash exact only for
  seed <= 3,393,263; callers pass tiny seeds).

### CLEARED-NOTABLE, class 3

The defensive work in this corpus is genuinely good, which is why the five above
are surprising rather than typical.

- **`xchan-at29-01-segmented.js:52-57, 144-147` is the model.** It names the
  hazard ("q₁q₂q₃ ... is NOT exact in a double. It is never formed"), precomputes
  `U[m] = ⌊W/q_m⌋`, and **does not trust the division** —
  `while(u*qs[m]>W)u--; while((u+1)*qs[m]<=W)u++;` — so the test becomes
  `q₁q₂ > U[m]`, valid since no scour prime divides W, with `q₁q₂ <= 2.006e11`
  exact.
- **`natal-cap-37-at41-march.js:318-355`** — a PART 0 "2^53 AUDIT" tabulating all
  fourteen arithmetic paths at @41 with worst operands, worst result and ratio to
  2^53, an Int32 sub-audit, a live `assert(W < 2**53)` at :147, a BigInt second
  opinion on 20,000 tail classes, and the death point named (`43#` = 1.45 x
  2^53). The audit is correct; only the trap literal beside it is not.
- **`scanstat-t37-01-engine.js`** — Σv² flushed to BigInt at 4e15 per block,
  variance `(D·S2−S²)/D²` in BigInt, m = 64 moment at 115 x 2^53 handled
  correctly; `scanstat-t37-02-validate.js` EXERCISES the flush by forcing it at
  1e3 rather than assuming it.
- **`var41-price.js:45-46`** — `ratToNum(n,d) = Number(n*SCL/d)/SCLN` with
  `SCL = 2n**120n`: 120 bits of exact fixed point over a scale that is itself an
  exact power of two. The right way to turn a ratio of huge BigInts into a
  double.
- **`natal-cap-28-analytic-certificate.js:178`** branches on `q**3 > W+1`, which
  reaches ~9e16 and IS inexact far from the boundary — but the branch is only
  ever DECIDED near `q = W^(1/3)`, where `q³ ≈ W <= 3.043e14` [VERIFIED at all
  thirteen levels 2..41]. Exact precisely where it matters.
- `redteam-DP1-certificate.js:116` touches 1.42e18, says so in-code, and redoes
  the row in exact BigInt rationals. Likewise `exact-g2-ladder.js` (which
  demonstrates the boundary), `verify-ladder.js`,
  `attack2-04-10-hierarchy-oeis.js`, `natal-cap-29` (all-BigInt plateau).
- Real-valued intermediates above 2^53 correctly treated as rounding rather than
  overflow: `natal-cap-25:205` (2.99e16, error 2.2e-7 against a 2-dp print),
  `import-suen-01:343` (1.18e18 ratio, error 2.2e-16),
  `attack-10-anchored-origin` (P(97#) = 2.3e38 as a density),
  `attack-theta-margin:301`, `natal-cap-28:257`, `natal-cap-36:164`,
  `natal-cap-06` (C(399,15) as a Poisson weight), and the `q⁴` comparisons in
  `natal-cap-08`/`-18`, whose decision boundary sits at q ≈ W^(1/4).
- Everything at 41#-scale that must be exact was verified under 2^53:
  `var41-price`, `natal-cap-33` (counts <= 2.7e11, BigInt d²W², Kahan real sums),
  `verify-ladder-big` (the T37 census, max intermediate `P` = 7.42e12),
  `uframe-repro-01` (7.42e12 = 0.82 x 2^53), `theta-ladder-sup`.
- There is **no product of three variables anywhere in the corpus** [VERIFIED,
  non-comment grep], which is what rules out the `q₁q₂q₃` shape outside the one
  place it was avoided by design.

**Coverage:** all 247 files; per-file audits confirmed nothing else within 100x
of 2^53 on an exact-integer path.


## Class 4 — pooled error floors

This is the class the corpus is worst at and, oddly, also the class it has
thought hardest about. Several scripts price overlap correctly and one
(`natal-cap-25-excess-law.js`) measured the effective sample size three ways and
explicitly REFUTED `n_eff = W`. The failures below are places where that lesson
did not travel.

### The signature, taken from the original burn

`research/shadow-buchstab-02-instrument.js:143` computes
`sePoisson: mean(meas)/Math.sqrt(Ntot)`. The anatomy is worse than an oversight.
The header at :30-34 **correctly identifies the dependence** — "levels in a
cluster are NOT independent samples, they share almost all their sieving primes
and their bands overlap, so the scatter s.e. understates the true error" — and
then offers as the repair "the Poisson floor on the cluster's own slot total",
which is computed on the same overlapping pool and is wrong by the same
mechanism. **The diagnosis was right and the fix inherited the defect.** That is
the reusable signature: a script that names the overlap and then divides by the
pooled count anyway.

**And it is still unbannered.** `shadow-buchstab-02-instrument.js` is not among
the 51 banner-carrying scripts in `research/SCRIPTS.md`. The 4-6x correction
lives only in the record layer (`research/history/staging/shadow-amplitude.md:194`,
`shadow-buchstab.md:36`, `research/history/CHANGELOG.md:372`). By SCRIPTS.md's
own rule at :29 — a banner is "the only thing standing between a reader and a
runnable wrong number" — this script still prints a wrong `se(Poisson)` column
with no warning. `shadow-amplitude-01` and `-02` ARE bannered; the file that
carries the defect is not.

The exact pattern (sqrt of a count pooled over overlapping INTEGER RANGES) does
not recur elsewhere. `research/adversary-wave2-01-shadow.js:118` pools `Ntot`
only to reproduce shadow-buchstab's slot totals as a custody check, and its
part (C) is deliberately built as "one prime per rung, no pooling" (:30, :134).
That is the corpus's own repair and it works.

### CONFIRMED 15 — `sigma_J = sqrt(pooled triple count)/CRT`, understated 1.8x to 7.5x

Sites: `research/xchan-at29-01-segmented.js:286` and
`research/natal-cap-39-triple-census.js:359,385`. Registered in advance at
`research/history/staging/xchan-at29-prereg.md:70` as "the Poisson fluctuation
of the count", and the decision procedure at that file's :149-150 is a 3-sigma
rule built on it.

**Why it is not Poisson.** `supMx` is not a count of independent events. The
census (`xchan:226-244`) walks natal SLOTS, and at each slot enumerates every
triple among that slot's own a-side and b-side divisor lists, emitting
`C(av,2)*bv + av*C(bv,2)` counts from one slot at once. Triples sharing a slot
are perfectly correlated: all of them are decided by which scour primes hit that
one slot. The sample unit is the slot; the code counts triples.

**The factor, measured.** An independent re-implementation reproduces `supOmx`
EXACTLY at all five levels — 2, 143, 3199, 74065, 1807665 — so what follows is
measured, not modelled [VERIFIED, second sweep].

| level | @11 | @13 | @17 | @19 | @23 |
|---|---|---|---|---|---|
| compound-Poisson σ inflation (exact) | 1.000 | 1.845 | 1.933 | 2.087 | 2.158 |
| empirical block variance, 200 disjoint blocks | — | — | 1.975 | 3.034 | **7.472** |

The compound-Poisson figure is a **floor, not the answer**. At @17 the block
check agrees with it (1.98 against 1.93); by @23 spatial clustering pushes the
empirical figure to **7.5x**. A slot-level model calibrated independently on the
@29/@31 embedded figures (per-slot `Var/E` = 11.5 and 13.4, giving 1.9x-3.7x)
lands inside that range and is itself only a floor, for the same reason: it
prices within-slot correlation and not between-slot clustering.

**What moves, and in which direction.** `z = ((1−J)meas − pred)/σ_J`, so an
understated σ makes |z| too LARGE. Fits look worse than they are; separations
look sharper than they are.

| claim, as published | as printed | corrected | verdict |
|---|---|---|---|
| @17→@19 rise | **3.50σ** | **1.81σ** (fully measured) | refutes nothing at 3σ |
| @19→@23 rise | 1.68σ | below 1σ | — |
| @23 deficit from zero | 48.7σ | 7σ–26σ | **untouched** |
| @29 TEST 1 | z = −0.90 | −0.5 to −0.3 | HIT either way, **robust** |
| @31 TEST 1 | **z = −4.93 -> "MARGINAL"** | −2.6 to −1.3 | **flips to HIT** (T1 cuts at 3) |
| @31 rival N2 | **−6.35** | −3.3 to −1.7 | **stops being "dead" at the prereg's 3σ rule** |
| @31 rival N3 | −20.81 | −11 to −5.7 | still separates; not "≈16σ" |
| TEST 2, relative `d` | −0.41%, −0.48% | σ-free | **TIGHT stands untouched** |

**The pre-registered BAND verdicts survive.** The FLAT edges 0.887/0.919 are
literally "@17's 0.9025 ± 1σ_J" (`natal-cap-39-triple-census.js:94`), so they
inherit the defect and widen to [0.872, 0.933] — but re-classifying all five J
values against the wider edges changes **no** band. "DEEPENING is REFUTED"
survives through the classifier even though its "at 3.5σ" quantifier does not.
`xchannel-triples.md:236` already records that the 2.75σ reading is not
load-bearing, so 2.75σ → 1.42σ removes discrimination, not a conclusion.

**Blast radius, and it is in the live layer:**

- **`research/G2-STATE.md:54-58`** — "the last law standing after two
  pre-registered rivals died at **6.35σ and 20.81σ**", and "visible only where
  the error bar can see it". That last clause is exactly what a wider bar
  retracts. This is the live-layer hit.
- `TODO.md:512-515` — "rivals dead at 6.35σ and 20.81σ ... is itself NOT EXACT
  ... detected only at @31". The "not exact" detection IS the z = −4.93.
- `TODO.md:501-502` — "refuting the deepening reading at 3.5σ, while staying
  48.7σ from zero at @23". The 3.5σ is measured to be 1.81σ. The 48.7σ stands.
- `research/history/staging/xchan-at29.md:192` carries "@31: TEST 1 z = −4.93 →
  MARGINAL" into the record.

**The correction runs the safe way.** Every corrected number makes the candidate
`1 − J = 4S₂` look BETTER, not worse, and the reading that actually carries "not
exact" — TEST 2's relative offset `d`, the same residual −0.41% / −0.48% at both
new levels — has no σ in it. The residual is still there. What is gone is the
claim that it was detected at five sigma.

**The exact fix, and it is free.** The census already visits every slot and
already forms that slot's triple contributions. Accumulate a per-slot subtotal
`x` with `Σx` and `Σx²` alongside the existing counters (two lines in
`xchan:226-244` and in the matching loop of `natal-cap-39`), then report
`σ_J = sqrt(Σx² − (Σx)²/N̄)/CRT`, the exact slot-clustered standard error. At
@23 that still understates by the between-slot factor, so the disjoint-block
estimate is the honest one where it is affordable. The prereg's registered σ
should stand as registered, with the corrected σ reported beside it.

### CONFIRMED 16 — `lemmaV-parseval.js:203`, and this one runs the dangerous way

`sup/(rms*sqrt(2 ln W))` prices the extreme-value benchmark on W independent
draws. `R_H(x)` is a **moving-window sum of length H** walked over the full
period, so the number of effective draws is W/H, not W. The corpus already
established this: `research/natal-cap-25-excess-law.js` measured `n_eff = W/l`
three ways and explicitly refuted `n_eff = W`, and
`natal-cap-29-sigma-plateau.js` and `discrepancy-two-class.js:378` both use the
corrected form. The lesson did not reach this file.

Correcting to `sqrt(2 ln(W/H))` with H = 60/126/198/258 moves the published
tightness ratios:

| published | 0.5634 | 0.7279 | 0.9215 | 0.7935 |
|---|---|---|---|---|
| **corrected** | **0.8206** | **0.9990** | **1.1920** | **0.9806** |

`research/history/CHANGELOG.md:462`'s "`C_true = 0.5634–0.9215` sits BELOW" the
maximal law **does not survive**: corrected, the ratios sit at or above 1 at
every level. This is the only place in the sweep where fixing the sample count
turns "the law holds" into "the law is violated" — every other overlap error in
the corpus runs the conservative way.

**The binding verdict survives, for a structural reason.** `C_true/C_crit`
reduces algebraically to `need_sharp/z²`, in which the bracket cancels, and that
ratio is measured from the exact full-period walk with no Gaussian assumption in
it. So the conclusion stands and the quoted constants do not.

`research/sift-limit-lemmaV.js:367`, `research/theta-ladder-sup.js:274` and
`research/theta-ladder-row.js` carry the same moving-window benchmark but each
is explicitly labelled CONDITIONAL and superseded by the exact `need_true`, and
`research/theta-ladder.md:455` already flags the prefix version of exactly this
with correction factors 1.09/1.30/1.61 and says it is "NOT claimed". Only
`lemmaV-parseval.js` states it as a result.

### LATENT — OLS standard errors on nested ladder rungs

- **`research/greedy-oracle-validation.js:341-362`** — `se = sqrt(sse/(n-2)/sxx)`
  printed as `±1.96 se` and used for a SIGN verdict ("Sign, not size, is what
  the rule asks for"), with the band [−0.03736, −0.00970] excluding zero. Ladder
  residuals are autocorrelated: `research/redteam-growth-aicc.js` §3 measured
  lag-1 from −0.150 to +0.773 across ten families on this same ladder. **An AR(1)
  inflation above roughly 1.4x puts zero inside the band and flips the sign
  call.** The lag-1 for this particular fit was not measured, so the flip is
  shown to be possible, not actual. No banner. This is the one worth running.
- `research/attack-L-law.js:637` and `G2-STATE` — `1.801 ± 0.074` raw,
  `1.54 ± 0.09` control-corrected. The power-law family has ac1 = +0.130, VIF
  1.30, se x1.14; 1.54 against 2 goes 5.1σ to 4.5σ. Does not flip. The number is
  soft, not wrong.
- `research/fold-profile-04-count-vs-damage.js:135` self-diagnoses in its own
  READINGS 3 and 4 ("the p anchors within one cell are not independent draws...
  Nothing in the file estimates that width. UNRESOLVED"). Known, unquantified,
  no verdict rides on it.
- `research/04-crystallization-and-hl.js:53` — `(act−hl)/sqrt(hl)`, a Poisson bar
  on twin counts in nested windows (p, p²). Per-row rather than pooled, and no
  reading uses it.

### RETRACTED — `attack-l1-residue-01-middleband.js:363` (B6)

This sweep first read B6's `sd = sqrt(wsum)/N`, pooled across 237 fold primes
that each re-count the same window positions, as an instance of the class. **It
is not, and the argument against it is better than the argument for it.** `R`
pools Bernoulli trials across folds, and the same gap IS re-counted at many
folds — but the qualification events at distinct folds are "d ≡ 0, ±2 mod p" for
DISTINCT MODULI, hence independent by CRT. So
`Var(R) ≈ Σ n₂(p)(2/p)(1−2/p) ≈ wsum`, and `sqrt(wsum)` is a defensible counting
floor. A repeated gap does not inflate it the way a repeated SLOT inflates σ_J,
because a slot's primes all act on one object while a gap's folds act through
coprime moduli.

**What the sixteen OUTSIDE verdicts actually show is a defect in the null MEAN,
not the null sd.** Visible in the embedded output without any recomputation: the
ratios run 1.0622, 1.0671, 1.0602 at the small window and 0.9883, 0.9874, 0.9968
at the large ones — a two-sided systematic drift crossing 1.0 as the window
grows, with the sd shrinking faster than the residual bias. A plausible
mechanism is the selection effect that a gap only survives to fold p by having
failed to qualify at every earlier fold. That is worth chasing and it is a
different question from this hunt. Reading [5] is unaffected either way: it
rests on **B7** (:378), the per-fold version over distinct positions within one
fold, which is correct.

### CLEARED-NOTABLE, class 4

**The corpus mostly gets this right, and it owns the machinery.**
`natal-cap-25-excess-law.js` measures `n_eff = W/l` three ways and refutes
`n_eff = W`; `natal-cap-29-sigma-plateau.js` and `discrepancy-two-class.js:378`
use the corrected `sqrt(2 ln(W/l))`; `level-ledger-tight.js:306` normalises by
the genuine bin count against matched random controls; `origin-excess.js:366`
carries the covariance term into a joint z; `fold-profile-14` and `-15` route
around overlap by matched synthetic control and by disjoint windows;
`redteam-growth-aicc.js` §3 prices the AR(1) deflator explicitly;
`fold-succession-autocorr.js` uses permutation tests against a calibrated
level-noise null. `fold-profile-13-hotspot-sweep.js` self-diagnoses correctly,
naming "effective windows 25,000 (n/width)" in its own READINGS and retiring the
excess by Monte Carlo. The maxsum tail factor `sqrt(2 ln D)` and its
extremal-index repair are already refuted in `CHANGELOG.md:122`, and notably the
measurement sits ABOVE the θ ≤ 1 ceiling, so the overlap correction points the
wrong way to explain it.

**`var41-price.js:118`** — `sg = r => Math.sqrt(r*E41)`, a Poisson σ on a
forecast count feeding `z(41) = −134,180`. Five orders of magnitude past any
plausible correction, and the script already tests its own σ-sensitivity ("1% in
Var moves z by 0.5%").

**Dismissed on inspection:** `a3-07-pane-overlap.js` ("overlap" is the striker
overlap Ω, a deterministic bound with no statistics in it),
`natal-cap-12-overlap-sign.js`, and the remaining ~500 `Math.sqrt` calls
corpus-wide, which are geometry, norms, Pearson or Cauchy-Schwarz denominators,
or `sqrt(x)` sieve bounds. No bootstrap-with-replacement or wrong-n resampling
appears anywhere, and the permutation tests in `attack-ioslack-survey.js` and
`fold-succession-autocorr.js` are correctly constructed.

**The method note that matters.** Every instance above was caught by reading,
not by the harness — and the two that matter most were caught in the first place
because a LATER script bothered to count the distinct underlying units
(`shadow-amplitude-02`'s `N_dist`). That recount is the only thing that has ever
caught this class in this corpus.


## Class 5 — single-word popcount on q > 32

Only six files define a popcount [VERIFIED]. `grain-census.js` and
`a3-03` are the class-1 sites above. `fdecay-deep-01` is the deliberate
reproduction. `natal-cap-10-sieve-cap.js:71` uses a loop-based popcount over
subset masks of a short prime list. `attack-ab-coupling-01.js:196` and
`attack-ab-coupling-02-lp.js:194` apply `popc` PER WORD over multi-word coverage
arrays (`for (w = 0; w < W; w++) c += popc(acc[b + w])`) — correct. **No new
instance.** The one latent is `natal-cap-21`'s `pop32` above, and it is applied
to `lo` and `hi` separately, which is right.

## Class 6 — negative modulo, and Int32Array range

**Zero findings, and the corpus is disciplined here.**

- Every `%` whose left operand can be negative is guarded `((x % q) + q) % q`
  or is of the already-nonnegative form `(p - r) % p` with `r` in `[0, p)`
  [VERIFIED across every hit].
- Every ring-buffer index that looked like it could go negative is guarded by
  its own loop bound: `a3-04-maxsum-recursion.js:415` (`j <= t`),
  `attack-foldL-03-transport.js:152` (`m <= cnt`) and `:225`
  (`lim = min(cnt-1, mmax)`), `exact-g2-ladder.js:96`,
  `attack-frontier37-01-word.js:75`, `a3-10-lower-tightness.js:169,189`
  (all `+ MM + 1` biased).
- No `Int32Array` holds a value past 2^31. Slot POSITIONS at W >= 29# are
  carried in `Float64Array` everywhere they appear
  (`a3-08-adjacent-pairs.js:75`, `foldL-window5-01-extinction.js`,
  `localized-04-maxsum.js:107` with the comment "Float64 so Y may exceed 2^31");
  `Int32Array` holds only residues, gap words, indices and counts bounded by D.
- `audit-numbers.js:121,274` builds CRT lifts in an `Int32Array` and stops
  BOTH loops at q = 23 (mod <= 223,092,870), handling 29# by streaming instead.
  Deliberate.
- The extended-Euclid `(g/aa)|0` idiom appears in six files; every call site
  passes a single fold prime as the modulus, never a primorial [READ].

**One documented-but-unenforced boundary:** `localized-04-maxsum.js` needs
`Y < 2^32` for `W[j >>> 5]` and says so twice in prose (:44 usage note, :99
comment) but has no runtime assert. It runs at Y = 1e9. `natal-cap-34`'s
`assert` is the pattern this one is missing.

## Corrections to the record

Proposed, not applied — this file edits nothing. In priority order.

1. **`research/gen-scripts-index.js:10,76`** — the banner detector reads only
   the first 40 lines and only matches `CORRECTION|SUPERSED|NOT a valid|⚠|WRONG`.
   Add `DEFECT` to the pattern and scan the whole file, or require that a
   defect banner be repeated in the header. Until then SCRIPTS.md's warning
   table is silently missing a3-03, a3-06, a3-07, attack-06b, attack-hm-basis,
   attack-L-law and a3-08. Regenerating the index is the whole fix.

2. **`research/natal-cap-04-packing-cap.js`** — replace `budgetMs` with a node
   budget, copying `attack2-rankin2d.js:136-139`, then re-embed. Until that is
   done the file wants a banner saying the staircase extent, the `83/184`, and
   every `exact` label are machine-dependent, and `TODO.md:619` wants the same
   caveat on the OEIS draft. **The 17 published diameters are correct** — the
   embedding run did not time out.

3. **`research/xchan-at29-01-segmented.js` and
   `research/natal-cap-39-triple-census.js`** — report the slot-clustered
   standard error beside the registered Poisson one, as above. Then
   **`research/G2-STATE.md:54-58`** (live layer), `TODO.md:501-502` and
   `:512-515` want their sigma figures restated: "rivals died at 6.35σ and
   20.81σ", "visible only where the error bar can see it" and "refuting the
   deepening reading at 3.5σ" do not survive the correction; "48.7σ from zero"
   and TEST 2's `d` do.

4. **`research/lemmaV-parseval.js:203`** — use `sqrt(2 ln(W/H))`, the form
   `natal-cap-25-excess-law.js` already established and `natal-cap-29` already
   uses. Then `research/history/CHANGELOG.md:462`'s "`C_true = 0.5634–0.9215`
   sits BELOW the maximal law" wants withdrawing: corrected, the ratios sit at
   or above 1 at every level. The binding verdict is unaffected.

5. **`research/shadow-buchstab-02-instrument.js`** — the producer of the original
   4-6x burn carries no banner and still prints the wrong `se(Poisson)` column.
   Give it one. This is the plainest instance of item 1's failure mode.

6. **`research/greedy-oracle-validation.js:341-362`** — measure the lag-1
   residual autocorrelation of that specific fit before the `±1.96 se` sign
   verdict is quoted again. Above roughly 1.4x inflation the band admits zero.

7. **`research/natal-cap-23-covadj-proof.js:147,156`** — add the `SI()` guard
   its sibling `natal-cap-26-minus-half.js:67` already has, BEFORE anyone runs
   it at x = 23. At @23 `SAB` reaches 827 x 2^53 and the "EXACT sign verdict"
   goes silently wrong. This is the cheapest high-value fix in the list.

8. **`research/natal-cap-37-at41-march.js:399`** — one character: make the trap
   literal `3825123056546413051n`, or pass it as a string. Then the OUTPUT's
   "four classical strong-pseudoprime traps" and READINGS 7 become true.

9. **The three LCGs** (`h2-randomised.js:65`, `attack-theta-margin.js:55`,
   `fold-profile-13-hotspot-sweep.js:132`) — `Math.imul(seed, 1103515245)`, or
   the multiplier 1664525 that `discrepancy-two-class.js:401` already uses and
   that is verified exact. `h2-randomised` then wants a re-run, since its search
   was ~500x weaker than claimed; its existing bounds are verified witnesses and
   stand meanwhile.

10. **`research/a3-06-origin-vs-max.js:287` and `research/window-check.js:38`** —
   BigInt the `x*x` window, or state in the column header that it is 3 s.f.
   No document quotes the affected integers. Note before the `window-check.js
   1e11` run recommended at `G2-STATE.md:1120`: at that size the errors reach
   ~10³ and stay invisible at quoted precision.

11. **`research/natal-cap-34-wrap-precision.js:659`** — drop the word `exact`
   from the `WJ` label, or compute the accumulator in BigInt. The printed digits
   are right; the label is not. Also `qc-wave6-W.md:236`.

12. **`research/natal-cap-27-t4-at13.js:275`** — move the 120 s ticker to stderr.
   The six tier-1c files want one-line format fixes (append `s`, or route the
   figure to stderr) so `embed.js --check` becomes portable again.

13. **`research/qc/tailfmt.js:50-61`** — add `min|h|hours|days` to `VOLATILE`,
   and consider refusing to embed a printed rate whose denominator is a wall
   clock.

14. **Guards that should be executable, not prose.** `localized-04-maxsum.js`
   needs `assert(Y < 2**32)`; `grain-census.js` needs `assert(q <= 31)` inside
   `rhoDirect`/`addOff`; `attack-theta-margin.js` and
   `natal-cap-21-beyond-chebyshev.js` need `assert(ps.length <= 64)`.
   `natal-cap-34-wrap-precision.js:164` already shows the pattern.

## What this sweep did NOT establish

**Class 3 is the cautionary tale, and it is worth reading before the next
sweep.** The first pass worked top-down: identify every script whose parameters
reach a primorial W >= 2^40, read its arithmetic, conclude zero defects. That
conclusion was published in an earlier draft of this file and it was wrong.
**Not one of the five confirmed defects is in a deep-level script.** They are in
scripts that form a large integer for a reason no parameter constant reveals —
`x²` at x = 10⁹, an LCG multiplier, a pseudoprime trap literal. The draft even
named the gap ("a Number product hidden in a script that never advertises a deep
level would not have been caught") and rated it narrow. It was not narrow; it
was where the whole class lived.

The second pass found them by grepping the overflow SHAPES across all 247 files
regardless of advertised level. **Sweep by defect shape, not by where you expect
the defect to be.** The two passes fail independently, which is the only reason
the class is now closed to within 100x of 2^53 on every exact-integer path.

Class 4 WAS swept exhaustively (scanstat and import families, natal-cap 01-38,
fold-profile, fdecay, foldL, attack-*, a3-*, redteam-*, localized-*, h2-*,
verify-*), but from the `sqrt`/`sigma`/`se`/`Poisson` greps outward; an error
bar computed without any of those words in it would not have been caught. One
LATENT in it (`greedy-oracle-validation`) is shown to be possible rather than
actual, because measuring it needs a run.

**The standing recommendation.** Four of the six classes are mechanically
greppable, and most of the confirmed items would have been caught by a
twenty-line static check: a shift whose count derives from `% q`, a `Date.now()`
inside an `if`/`while`, and a `Math.sqrt` of a variable that was accumulated
with `+=` across a loop over something other than the sample unit. The gate has
eleven checks about where a number came from and none about whether it is right.
In particular **no check in `research/qc/checks.js` ever tests an independence
claim**, which is what class 4 is made of. The one thing that has ever caught
class 4 in this corpus is a later script bothering to count the distinct
underlying units, as `shadow-amplitude-02`'s `N_dist` did.
