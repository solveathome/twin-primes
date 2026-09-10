# The consolidation wave: five cost-class embeds, the composite class, and

<!-- ledger
id: Q-consolidation-wave
status: ANSWERED
todo: 11b (retired)
question: Can the five cost-class scripts be bound to their own output, and can U-FRAME's two lost tables be rebuilt?
verdict: All four runnable cost-class embeds are bound and the hand-pasted-tail counter falls 19 to 15 with the gate at TOTAL 0; three needed --force at a cost of 24 tokens out of 211 with no value changed anywhere, and natal-cap-33-overnight.js is a three-run composite that should never have been on the cost list.
-->

# U-FRAME's two lost tables rebuilt

*(2026-08-19. Custody migration remainder plus TODO item 11b. Nothing here is
committed and nothing is pushed.)*

**Headline. All four runnable cost-class embeds are bound and the hand-pasted-tail
counter fell 19 to 15**, with the gate at TOTAL 0. Three of the four needed a
`--force`, and between them the force cost **24 tokens out of 211**: nine from a
hand-written convergence paragraph, one pooled mean, one re-rounding, nine from
two adjudication rows and a derived column whose inputs keep custody in another
file, and **four clock readings**. No value changed anywhere — §1.3 itemises all
24 against the fresh blocks, with the pre-embed text recovered from
`git show HEAD:` first, and confirms the code above each tail byte-identical so
none of it is the consequence of an edit.

`natal-cap-33-overnight.js` was **not** embedded and should never
have been on the cost list: it is a three-run composite, `tailfmt.locate` binds
only its RUN 3 block, and RUN 3 costs 5.25 h. Embedding RUN 1 there, at the 38
minutes the brief priced, would have written run 1's output into run 3's slot
and destroyed the record it replaced. §1.5.

*(Correction, second session. The first draft made this claim before the runs
that justify it. At the point the first session was killed exactly one of the
embeds existed on disk, `lemmaV-sup-extension.js`, and the counter stood at 18,
not 15. The number is now the same but it is read off the gate rather than off
the plan, and the three embeds behind it are timed, itemised and named in §1.1.
A headline written ahead of its evidence is the defect this whole wave exists to
catch, and it was in the report's own first line.)*

**U-FRAME's §§2, 4 and 5 tables now have custody.** Two scripts,
`research/uframe-repro-01-fold-ladder.js` and
`research/uframe-repro-02-maxgap-forensics.js`, rebuild them from nothing: no
ladder, no attaining position and no L value is read out of another file. **Of
the tabulated numbers checked one by one, all but two reproduce exactly.** The
two that fail are §5 table 2's fold-17 qualifying share, recorded as 4.9 per cent
where the exact value is 72/1485 = 4.8485, and §4's closing caveat "drop it and
the fit from x = 19 is 1.98", where the value with the point dropped is 1.716
and 1.98 is the value with it kept. §3. U-FRAME.md is untouched; the
orchestrator integrates.

**One §2 prose figure does not reproduce either.** §2 says the folds by 4, 6, 8,
9 and 25 balloon the tile "from 30 to 162,000". The product is 30 · 4 · 6 · 8 ·
9 · 25 = 1,296,000. 162,000 is 30 · 4 · 6 · 9 · 25, the same list **without the
8**. §3.1.

**And U-FRAME's ladder is two terms shorter than the repo's.** §4 fits "our
twelve levels" and §7 item 3 still lists G₂(41#) as an unmade 37-hour
measurement, while `research/G2-STATE.md` §6.1 holds fourteen terms with
G₂(41#) = 546 and G₂(43#) = 618, and U-FRAME's own §6a says the 546 is already
published. Not a wrong number, a stale section. §3.2.

**The composite class needs one extension and it is small.** Of the nine files,
two already fit the machinery as it stands, by an invocation whose output is a
superset of the pasted block, one comes within a single sentence of fitting, and
six cannot fit any single-invocation tool.
§2 gives the per-file verdict and §2.3 the smallest extension that would cover
the rest: a tail that records a LIST of invocations and concatenates their
outputs under per-run markers.

---

## 1. Part A: the five cost-class embeds

### 1.1 The table

Baseline at the start of the second session: gate TOTAL 1, embed-backlog
`hand-pasted-tail` **18**, `readings-not-traceable` 118. The one TOTAL finding
is `uncited-script` on `research/attack-ab-coupling-02-lp.js`, an untracked file
belonging to another agent's live wave; it is not this wave's and was not
touched.

**The gate moved under this wave, and neither move is this wave's.** Partway
through, `scripts` fell to 0 — the other agent embedded and cited its file — and
`transfers` rose to 1: `transferred-claim` at `TODO.md:264`, "TODO.md:264-287 vs
research/U-FRAME.md:260-261 (j=0.03 c=0.90), near-duplicate that DIFFERS". This
wave has not edited `TODO.md` or `U-FRAME.md` and will not; §3 deliberately
leaves U-FRAME alone even where it has found errors in it. **Reported, not
fixed**, per the standing rule on a persistent nonzero you did not cause. TOTAL
is 1 before and 1 after, on two different findings.

| file | invocation | wall | force? | gone-figures verdict | backlog after |
|---|---|---|---|---|---|
| `lemmaV-sup-extension.js` | `node research/lemmaV-sup-extension.js` | ~22 min | *(first session)* | — | **18** |
| `lp-push-x43.js` | `node research/lp-push-x43.js` | 1,998.5 s | **yes** | 20 of 154 — prose, pooling and two hand-carried rows; no wrong value. §1.2, §1.3 | **17** |
| `natal-cap-27-t4-at13.js` | `node research/natal-cap-27-t4-at13.js` (self-spawns 8 workers; `NC27_WORKERS` defaults to 8 at line 262, `NC27_DIR` to `os.tmpdir()`) | 1,537.1 s | **yes** | 3 of 50, all three clocks. §1.4, §1.3 | **16** |
| `natal-cap-33-overnight.js` | **NOT RUN** — composite, §1.5 | — | — | — | — |
| `verify-ladder-big.js` | `node research/verify-ladder-big.js` | 3,271.7 s | **yes** | 1 of 7, the 2024 stopwatch. §1.3 | **15** |

All embeds used `--streams both`, which is what makes the stderr-only group of
`custody-embed-migration.md` §3 cause (c)1 bindable at all. **Gate after the two
that landed: TOTAL 0**, down from the baseline's 1 — the `uncited-script` and the
`transferred-claim` both cleared under other agents' work, neither by anything
done here. The hand-pasted-tail counter went **18 → 17 → 16 → 15**, and the gate reads
**TOTAL 0** at the close, with `node research/qc/selftest.js` green (24 known
positives fire, 14 controls silent) and `node research/audit-numbers.js` at
**108/108**.

`readings-not-traceable` rose 118 → 123 over the three embeds, and that is
the honest cost of a force rather than a regression: `lp-push-x43`'s READINGS
quote 8 figures the new block no longer contains, `natal-cap-27`'s quote 16 and
`verify-ladder-big`'s quote 2.
Both sets are hand-derived from figures the block does have — differences, rates
and pooled means in the first, error-budget arithmetic in the second — and both
are recorded below the tail in each file so the derivation is on record without
disturbing the fingerprint. That is the same device `lemmaV-sup-extension.js`
already carries.

**What was already known about these four before a byte was run.**
`research/history/staging/custody-embed-migration.md` §2 had measured all five
under `embed.js` at a long timeout and recorded what the guard said: figures
absent from the fresh run were **40 of 163** for `lemmaV-sup-extension`, **20 of
154** for `lp-push-x43`, **3 of 50** for `natal-cap-27-t4-at13` and **3 of 10**
for `verify-ladder-big`. Its §3 cause (c)1 then names `natal-cap-27`,
`natal-cap-33` and `verify-ladder-big` among fifteen files whose absent figures
are **on stderr**, discarded because the old `embed.js` kept stdout only. That
is the whole reason this wave's invocations carry `--streams both`, and it is
the prediction the runs below test: for those two the guard should have little
or nothing left to complain about, while `lp-push-x43`, which is in the
abridged-and-annotated class instead, should still need a force.

`lemmaV-sup-extension.js` was verified rather than re-run: its tail carries a
complete fingerprint (`code-sha256 870cd2e0…`, `out-sha256 22498dce…`,
`streams stdout+stderr`) at line 698, a non-empty body, and READINGS at 1005.
The 2026-08-19 narrowing of reading 2 — "if it plateaus, it plateaus above
beta_2" is family-dependent, and the closure rests instead on the flat ~2.05
per-prime growth factor of Ssat — is present as a CORRECTION block appended
**below** the tail, so the fingerprint is untouched. Nothing to add there.

### 1.2 `lp-push-x43.js`, and the 20 figures a force costs

The plain pass was refused exactly as `custody-embed-migration.md` §2 predicted:
**"the pasted block carries 154 figures, 20 of which this run does not produce"**,
first eight `0.390, 0.130, 0.087, 0.269, 0.014, 0.093, 0.045, 0.279`. Those
eight are all one sentence of the block's section 3:

> Raw s90(kappa=2) rose +0.390 over x = 13..23 (+0.130 per level) and +0.087
> over x = 23..41 (+0.022 per level). Raw s99 rose +0.269 then +0.014. After
> calibration the spread over x = 23..43 is 0.093 for the s90 route and 0.045
> for the s99 route, against 0.279 and 0.211 over x = 13..23.

That is hand-written analysis of the run's own table, not a line the program
prints — the differences and per-level rates are read off the section 2 grid by
a person. So this file is `custody-embed-migration.md` §3 cause (b), "real but
abridged, digested or annotated", and the price of binding it is the digest.

**The old block was recovered from `git show HEAD:research/lp-push-x43.js`
before anything was overwritten** — 154 figures, the same count the guard
reports — so the pre-embed text is not lost whatever the force does. §1.3 lists
every one of the 20 against the fresh run, so the loss is itemised rather than
asserted.

### 1.3 The itemised loss, file by file

Method: recover the pre-embed OUTPUT block with `git show HEAD:<file>`,
re-tokenise it with the gate's own `research/qc/tailfmt.js` — `figures` and
`presentIn`, the same two functions the guard uses — and list every token the
new block does not contain. That is the **complete** list, not the guard's
first eight. For both files the code above the tail was confirmed byte-identical
to HEAD first (`headText(old) === headText(new)`), so nothing below is a
consequence of an edit to the program.

**`natal-cap-27-t4-at13.js`: 3 of 50, and all three are clocks.**

| token | the line it sat on | what it is |
|---|---|---|
| `11.5` | `... 11.5% of quadruples, 2.0 min ...` | progress at a wall-clock tick |
| `50.7` | `... 50.7%, 8.0 min ...` | progress at a wall-clock tick |
| `15.4` | `T4 = 352253669.87624449 (8 workers, 15.4 min wall ...)` | the wall time |

`T4 = 352253669.87624449` reproduced to all seventeen digits, and so did
`T2 = 46186.769663306746`, `T3 = 4662945.6578926444`, the four bounds and the
theorem line `P(S=0) <= 1.898e-6`. **`[23 checks passed]` both times.** The new
wall is 24.9 min against the recorded 15.4 because this ran with three sibling
jobs on the same ten cores; that is the only thing that moved.

**`lp-push-x43.js`: 20 of 154, in three groups, and no wrong value among them.**

*Group 1, nine tokens, section 3's CONVERGENCE paragraph* — `0.390`, `0.130`,
`0.087`, `0.269`, `0.014`, `0.093`, `0.045`, `0.279`, `0.211`. Every one is a
difference or a per-level rate read off the section 2 grid by hand. The program
prints the grid; it does not print the differences. **This is the real loss of
the force** and the paragraph is quoted in §1.2 so it survives here.

*Group 2, two tokens, hand-pooled summaries* — `3.2513` ("Like for like over the
seven levels with all four routes") and `0.9513` ("DP1 2.3152 against DP2+DP3
0.9513"). The second is not lost, only re-rounded: the new block's budget table
prints `DP2+DP3: adversarial omega + truncation +0.9512`. The first has no
counterpart, because the fresh run reports pooled means over x = 13..23 and
x = 13..43 and a per-level column, not a like-for-like seven-level mean.

*Group 3, nine tokens, section 5's adjudication table.* Six of them are the
whole x = 7 and x = 11 rows (`2.1372`, `1.9448` in column B, and the derived
`1.2227`, `1.1131`, `0.2227`, `0.1131`); three are the `|B/L - 1|` column at
x = 17, 19 and 23 (`0.0321`, `0.0116`, `0.0011`). **Neither was ever producible
by this program.** Line 459 is
`const B = new Map([[13, 1.9638], [17, 1.9812], [19, 2.0028], [23, 2.0260]]);`
— column B is a four-entry hard-coded citation, so x = 7 and x = 11 have no
source in the file, and the fresh block's section 5b prints `B - L` and `ratio`
where the old one printed `|B/L - 1|`.

**And the two orphan values are sound, they were just carried by hand.**
`2.1372` at x = 7 and `1.9448` at x = 11 are the u\* stable readings of
`research/attack-beta2-03-exact-strata.js` line 946, whose full row is
`2.1372 1.9448 1.9638 1.9812 2.0028 2.0260`, and they appear in that attack's
staging report and in `sift-limit-attack.md` §7. So the old block quoted a
six-level row from a file that the code cites only four levels of. **Nothing
here is a wrong number**; what the force costs is one hand-written convergence
paragraph, one pooled mean, and two rows of a comparison whose inputs keep their
custody elsewhere. Recorded rather than silently dropped, and the fresh output
wins, per the standing rule.

**`verify-ladder-big.js`: 1 of 7, and it is the stopwatch.** The guard's whole
complaint is `54.1`, the minutes the T37 leg took on 2026-08-14. Everything the
file exists to say came back: `width=6469693230 census=214708725`,
`width=200560490130 census=6226553025` and
`width=7420738134810 census=217929355875` — the last being the value Chris
hand-derived in his 2024 folder-09 notes. **This is the clearest confirmation of
`custody-embed-migration.md`'s stderr diagnosis in the wave.** That report
measured this file at 3 absent of 10 under stdout-only; under `--streams both`
it is 1 absent of 7, and the two that came back are exactly the progress lines
`census` writes to stderr through
`console.error(\`T${upto}: ${...}%  (${...} min)\`)` at line 42.

**No REAL value change was found in any of the three files.** Every figure the
old blocks asserted and the new runs still produce, they produce identically:
`T4` to seventeen digits, all three censuses exactly, and every cell of
`lp-push`'s section 2, 4 and 5 grids that the current code computes.

### 1.4 `natal-cap-27-t4-at13.js`, where the force costs three clock readings

The guard's whole complaint: **"the pasted block carries 50 figures, 3 of which
this run does not produce"**, and it names all three, `11.5, 50.7, 15.4`. They
are one progress line and one wall time:

> ... 11.5% of quadruples, 2.0 min ... 50.7%, 8.0 min ... 90.1%, 14.0 min
>
> T4 = 352253669.87624449  (8 workers, **15.4 min** wall; partition sum-checks exact)

The percentages move because the driver prints on a wall-clock cadence over a
round-robin split, so which fraction of C(990,4) is done at the two-minute mark
depends on the machine's load; the 15.4 is the wall itself. **The result does
not move.** `T4 = 352253669.87624449` is not in the gone list, which means the
fresh run produced that seventeen-digit value again, and so are `46186.769663306746`,
`4662945.6578926444`, the moments, the four bounds and the theorem line. This is
the cleanest force in the wave: three clock readings against a seventeen-digit
sum reproduced exactly.

### 1.5 `natal-cap-33-overnight.js` is a composite, not a cost-class file

The brief priced this file at 38 minutes, which is RUN 1's recorded wall time.
The file does not have one tail. It has **three OUTPUT blocks and three READINGS
blocks**, one pair per run:

| line | header | recorded invocation | recorded wall |
|---|---|---|---|
| 412 | `OUTPUT — RUN 1 (2026-08-14)` | `node --max-old-space-size=6144 ... run1` | 2,301.6 s |
| 486 | `OUTPUT — RUN 2 (2026-08-14)` | `node ... run2` | 5,980.9 s |
| 565 | `OUTPUT — RUN 3 (2026-08-15)` | `node ... run3` | 18,894.3 s |

*(Line numbers re-checked in the second session: 412, 486, 565, with the three
READINGS blocks at 444, 522 and 594. The structure is as described.)*

`tailfmt.locate` takes the **last** OUTPUT header and the first READINGS after
it, so the tail of this file is RUN 3 and nothing else. Two consequences, and
both are why nothing was written:

1. Embedding at RUN 1's price would have put run 1's output into run 3's slot.
   The @37 variance table, the frozen-fit residuals (0.3926 / 0.3955 against a
   measured 0.3958) and the anchored z-ladder would have been overwritten by an
   unrelated run's window-excess table. `embed.js`'s legacy guard would have
   caught it — 89 figures in the block, almost none of them produced by `run1` —
   but the correct action is not to force past that guard.
2. Embedding the tail honestly means running `run3`, at 5.25 h. That is outside
   any budget this wave had and it is a decision for whoever owns the schedule.

**Recommendation.** Move `natal-cap-33-overnight.js` out of the cost class and
into the composite class of §2, where it is the clearest case in the set: three
declared invocations, three self-labelled blocks, and a file that is already
formatted the way §2.3's extension would want it.

---

## 2. Part B: the declared composites

A "declared composite" is a tail whose pasted block was produced by more than
one invocation and which says so.

*(The class is larger than the migration report drew it. `custody-embed-migration.md`
§3 names five — `natal-cap-34`, `natal-cap-37`, `attack2-rankin2d`, `a3-08` and
`05-twin-jacobsthal`. Four more belong: `a3-02-diagonal-f` (fast and deep, and
its header states both invocations), `a3-10-lower-tightness` (three OUTPUT
headers, lines 525, 772 and 786, against one READINGS), `natal-cap-32` (three
modes with three recorded wall times in one header) and `natal-cap-36` (default
P1-P5 versus `--at29`'s P6, which runs instead of them, not after). Adding
`natal-cap-33` from §1.5 makes ten. Every one of the five extra was confirmed by
opening the file and reading the dispatch line, not inferred from a banner.)* The machinery has exactly one slot for an
invocation: `embed.js` writes one `invocation:` line, one `code-sha256`, one
`out-sha256` and one `streams` mode, and `tailfmt.locate` recognises one tail
per file, the last one. `--env` and `--node-flag` (added 2026-08-19) widen what
a single invocation can express; they do not make it two.

### 2.1 The two that already fit, and the one that nearly does

| file | the one invocation that subsumes the block | cost | what it needs |
|---|---|---|---|
| `a3-02-diagonal-f.js` | `all 1.844e-2 32.2105 6226553025 348 4`, with `--node-flag --max-old-space-size=8000` | ~215 s | `--force` |
| `a3-08-adjacent-pairs.js` | `-- --t31`, with `--node-flag --max-old-space-size=8192` | ~44 min | `--force` |
| `attack2-rankin2d.js` | `-- --deep` covers every DATA row but not one comparative sentence; see below | ~30 min | `--force`, and one figure is lost for good |

**`a3-02-diagonal-f.js`.** The file already has the mode the job needs and
nobody used it. `MODE` is read at line 58; line 156 runs the fast phase when
`MODE !== 'deep'` and line 301 runs the deep phase when `MODE === 'deep' || MODE
=== 'all'`. So `all` runs both, in one process, and the block's two banners
(`mode=fast` at line 356 and `mode=deep` at line 488) become one. The five
trailing arguments are PHASE C's seventh point, which the file's own comment at
line 213 documents as `node a3-02-diagonal-f.js fast <f> <mean> <D> <G2> <L>`;
the values are in the deep block itself (f = 1.844e-2, m̄ = 32.2105, D =
6,226,553,025, G2 = 348, L = 4).
**Why it was not done here.** Its OUTPUT header carries six lines of correction
provenance — "RE-RUN 2026-08-17 with the corrected L scanner ... L(T23, 29),
which read 3 and is 2, and the four quantities derived from it" — and those
lines sit inside the tail, so `--force` deletes them. That is a §4-of-the-
migration-report situation (quote the old text out, then force), not a clean
embed, and it is the orchestrator's call rather than a consolidation agent's.

**`attack2-rankin2d.js`, and why it stops one line short.** *(Cost corrected in
the second session: the file's own line 42 says "--deep adds FREE n=10 exact
(~10 min), PAIRED n=13 exact (~20 min)", so the deep run is about 30 minutes,
not the 12 first recorded here.)* `--deep` is a strict widening, not a different
run: line 145 is `const hiFree = DEEP?10:9, hiTwin =
DEEP?13:12`, and the block's FREE row `m = 2, 4, 10, 24, 31, 42, 60, 74` is
n = 3..10, the deep range, which contains the default's n = 3..9. Every data row
in the block, including the `(10 s)` n = 9 node count the header attributes to
the default run, comes out of one `--deep` run.
**One sentence does not.** Section (F) reads "PAIRED exact slope: 1.69
(p=13..37, default); 1.68 incl. deep p=41". The script prints exactly one slope,
at line 361, over whatever range the flag selected. So the block juxtaposes two
runs' answers to the same statistic in one line, and no single invocation can
print both. It is a comparative digest, not an abridged run, and forcing an
embed over it would delete 1.69 with nothing to replace it. That is a
one-figure loss and it is a real one; either the sentence moves into the
READINGS, where prose belongs, or this file waits for §2.3.

**`a3-08-adjacent-pairs.js`.** Section [6] runs unless `--no-deep`, and section
[6b] runs iff `--t31` (lines 454-461). So `--t31` produces [1] through [6b] in
one process, which is exactly the block. The header says as much without drawing
the conclusion: "Section [6b] comes from the separate detached run ...
Everything else is one run of the file as it stands." The 2,620 s price and the
28 elided progress lines are the only obstacles, and the second is what `--force`
is for.

**Every claim in §2.1 and §2.2 was re-checked against the files in the second
session**, on the line rather than on the summary. `a3-02`'s `MODE` at 58 with
the fast branch at 156 (`MODE !== 'deep'`) and the deep branch at 301
(`MODE === 'deep' || MODE === 'all'`), so `all` runs both; its header at 349-354
carrying the six lines of correction provenance and naming its two invocations
at 35 s and 179 s. `attack2-rankin2d`'s line 145 `const hiFree = DEEP?10:9,
hiTwin = DEEP?13:12` and its single printed slope at 361; its line 42 prices
`--deep` at ~10 + ~20 min. `a3-08`'s 454-461, and its 2,620 s and 28 elided
progress lines at 592-593. `natal-cap-32`'s dispatch at 813-816, with `w17`,
`at13`, `at17` and `cal` and no mode that runs all three. `natal-cap-34`'s six
commands at 689-694 and their six `=== node ... ===` markers at 717, 740, 786,
803, 826 and 849. `natal-cap-36`'s line 283, `if(process.argv.includes('--at29'))
{P6(23);P6(29);process.exit(0);}`, against 65.2 s for P1-P5 and 11.3 min for P6.
`natal-cap-37`'s line 640, "The @41 march itself was NOT re-run for this block:
6.16 h of 10-core". `05-twin-jacobsthal`'s hard-coded driver at line 54. Nothing
in §2.1 or §2.2 rests on a claim that was not opened and read.

### 2.2 The six that cannot fit

| file | why one invocation cannot produce the block |
|---|---|
| `05-twin-jacobsthal.js` | the block's `p=29` row is 05b's. This file's driver is `for (const p of [5,7,11,13,17,19,23]) run(p)`, hard-coded, and `run(29)` would need a 6.47e9-byte sieve, which is why 05b exists. Two scripts, not two invocations. |
| `natal-cap-32-wrap-identity.js` | one block over three modes, `small` (19 s), `at13` (2.3 min) and `at17` (11 min, 6+6 workers). `MODE` dispatch at line 811 has no mode that runs all three. |
| `natal-cap-34-wrap-precision.js` | the header names **six** commands in order, four of them carrying `NC34_DIR` or `NC34_WORKERS`. `--env` can express any one of them; nothing expresses six. |
| `natal-cap-36-skeleton-door.js` | `--at29` calls `P6(23); P6(29); process.exit(0)` at line 283, so it runs *instead of* P1-P5, not after them. Default gives P1-P5 (65.2 s), `--at29` gives P6 (11.3 min), and the block is both. |
| `natal-cap-37-at41-march.js` | the block declares itself "PASTED FROM LOGS, NOT PRODUCED BY THIS PASTE": three logs from outside the repo, one of them a 6.16 h `at41` march that the header says was not re-run. Even a multi-invocation tool would have to re-run 6 h to bind it. |
| `a3-10-lower-tightness.js` | three OUTPUT headers (lines 525, 772, 786) and one READINGS. `locate` binds the **last** only, so an embed would fingerprint the `deep37` leg (519 s) and leave the `main` and `deep31` legs as unattested prose above it while the backlog counter went green. A partial bind that reads as a full one is worse than an honest legacy tail. |

`natal-cap-33-overnight.js` (§1.5) belongs in this table as a seventh.

### 2.3 The smallest extension that would cover the class

Not implemented; specified.

**The shape.** One tail, N recorded invocations, N output sections under
markers, one fingerprint over the concatenation.

```
node research/qc/embed.js research/<file>.js \
  --run "small" \
  --run "at13" \
  --run "--env NC34_WORKERS=10 -- exact13"
```

* `--run <spec>` is repeatable and ordered. Each spec is parsed with the flag
  vocabulary `embed.js` already has (`--env`, `--node-flag`, `--` for script
  args), so nothing new is invented; a spec is just today's argument list minus
  the file name.
* The runs execute **sequentially**, in the order given. Sequential matters:
  several of these files write to a shared scratch directory and the later
  stages read what the earlier ones wrote (`natal-cap-34`'s `joint` reads
  `exact13`'s truth JSON).
* The block is the concatenation, each section preceded by a marker line that
  carries that run's own invocation and elapsed time:

```
// ───── run 2 of 3: node research/natal-cap-34-wrap-precision.js layers ─────
```
  This is the same device `--streams both` already uses for the stderr marker,
  so `tailfmt` needs no new parsing concept, only one more literal.
  **And the class already writes markers by hand.** `natal-cap-34`'s pasted
  block separates its six runs with lines reading
  `=== node research/natal-cap-34-wrap-precision.js exact13 ===` at 717, then
  `layers` at 740, `c2` at 786, `kurt` at 803, `joint` at 826 and `verify` at
  849, and its header at 689-694 lists the same six with their wall times. The
  extension is therefore not inventing a convention, it is machine-reading one
  that the largest file in the class already follows.
* The header gains `invocations:` as a numbered list where `invocation:` is
  today, and keeps a single `out-sha256` over the whole concatenated,
  normalised text. `code-sha256` is unchanged: one file, one code hash.
* `--check` re-runs all N in order and compares the concatenation. A tail
  written by the single-run path stays byte-identical, because with one `--run`
  the marker is suppressed and the header keeps the singular `invocation:` line.

**What it deliberately does not do.** It does not let a tail record a run of a
*different* file (05-twin-jacobsthal's `p=29` row stays unbindable, correctly,
because the honest fix there is to cite 05b rather than to paste it), and it
does not import an external log file (`natal-cap-37`). Both of those are
provenance problems, not tooling gaps, and a tool that papered over them would
be manufacturing custody rather than recording it.

**What it would clear.** Six of the ten — `natal-cap-32`, `natal-cap-34`,
`natal-cap-36`, `attack2-rankin2d` (two `--run`s, default then `--deep`, which is
what makes the 1.69/1.68 sentence recoverable), `a3-10` (three `--run`s, one per
leg, which also repairs the partial-bind hazard) and `natal-cap-33` — plus the
two of §2.1 that need nothing new. That leaves two, `05-twin-jacobsthal` and
`natal-cap-37`, both for the reason above.

---

## 3. Part C: TODO item 11b, U-FRAME's §§2, 4 and 5 tables

U-FRAME §8: "The fold ladders and the max-gap forensics of §§2, 4 and 5 were
generated from short scripts in a session scratchpad that no longer exists, and
the repo holds no script that regenerates them. Until one is written (TODO,
under 'Consolidation & writing'), treat those tables as recorded-not-reproducible
and do not quote them elsewhere."

Two scripts now regenerate them.
`research/uframe-repro-01-fold-ladder.js` (§2 and §4, 172.5 s) and
`research/uframe-repro-02-maxgap-forensics.js` (§5 and the §7 item 4 question,
256.2 s). Both are deterministic, take no arguments and read no environment.

**Determinism is measured, not asserted.** Both tails were re-run under
`node research/qc/embed.js --check --streams both` in a second session, on a
different day and a cold cache. `uframe-repro-01-fold-ladder.js` came back
`code-sha256 matches / out-sha256 matches`: the whole block, stderr progress
lines included, reproduced byte for byte under the normalisation. That is the
strongest statement the machinery can make about a tail, and it is the one §8
was asking for. **No
ladder value, no attaining position and no L value is imported**; each is
recomputed by folding, which is the only thing that makes the comparison worth
anything.

### 3.0a The whole comparison on one page

Every printed U-FRAME quantity §§2, 4, 5 and §7 item 4 contain, and whether a
from-scratch recomputation lands on it. "Figures" counts the individual numbers,
not the rows.

| U-FRAME site | what it records | figures | verdict |
|---|---|---|---|
| §2 table | 8 fold rows: composite flag, kills, G₂ after | 16 | all 16 match |
| §2 prose | folds 4, 6, 8, 9, 25 kill nothing, G₂ stays 12 | 10 | all 10 match |
| §2 prose | "the tile width balloons from 30 to **162,000**" | 1 | **FAILS** — 1,296,000 |
| §4 line 1 | 9 multipliers c(p), @5→@7 to @31→@37 | 9 | all 9 match |
| §4 line 1 | geometric mean over the last eight, 1.43 | 1 | matches |
| §4 line 2 | 9 budget fractions ln c(p)/(2 ln p/p) | 9 | all 9 match |
| §4 line 2 | the range read as a percentage, 77 to 214 | 2 | matches |
| §4 slack | 8 lifetime slacks ln(x²/G₂), x = 11..37 | 8 | all 8 match |
| §4 slopes | 11 local slopes | 11 | all 11 match |
| §4 α table | 5 window fits: 1.476, 1.674, 1.861, 1.983, 2.170 | 5 | all 5 match |
| §4 caveat | the jump 348 → 528 at local slope 3.21 | 3 | matches |
| §4 caveat | "Drop it and the fit from x = 19 is **1.98**" | 1 | **FAILS** — 1.716 |
| §5 table 1 | 7 rows: new G₂, kills, merged sub-gaps, old G₂ | 40 | all 40 match |
| §5 table 1 | "in four of seven folds the winning stretch contains the old maximum" | 1 | matches |
| §5 table 1 | the refuted guess: first fold 12 → 30, not 24 | 3 | matches |
| §5 table 2 | qualifying gap SETS, folds 7 to 29 | 12 | all 12 match |
| §5 table 2 | shares, folds 7, 11, 13, 19, 23, 29 | 6 | all 6 match |
| §5 table 2 | share at fold 17, **4.9%** | 1 | **FAILS** — 4.8485% |
| §5 table 2 | L diagonal 2, 1, 2, 2, 2, 3, 2, 4, 4 at folds 7 to 37 | 9 | all 9 match |
| §5 prose | max kills 3 against max L 4 | 2 | matches |
| §7 item 4 | the last folds assemble rather than extend, from 3 or 4 gaps | — | confirmed, and it is **four** folds (23, 29, 31, 37), not three |

**Three fail out of 150 checked figures.** None of the three is load-bearing:
§2's is a tile width in a sentence arguing the width does not matter, §4's is a
caveat that gets sharper when corrected, and §5's is a rounding in a column
whose point is that the share is small. The two that the brief singled out,
**1.349 at @29→@31 and 1.517 at @31→@37**, both reproduce exactly, as 348/258
and 528/348.

A fourth item is not a figure at all but a staleness: §4 fits twelve levels and
§7 item 3 prices a thirteenth as unmade, while the repo holds fourteen. §3.2.

### 3.0 How the deep folds are reached at all

T_37 has 217,929,355,875 slots and is never enumerated. Three engines, each
checked against the one below it before it is used alone:

* **list fold**, exact, through T_23 (7,952,175 slots);
* **gap-array fold**, exact, for T_29 (214,708,725 slots as a 215 MB Uint8Array
  of gap/6; every gap is a multiple of 6 and G2(29#)/6 = 43 fits a byte);
* **run fold**, exact, for T_31 and T_37. Folding by p turns each maximal run of
  old slots deleted by one and the same copy into one new gap, and copy j
  deletes only the two residues −jW and −jW−2 (mod p). So two adjacent old slots
  die together only if their distance is 0 or ±2 (mod p), which is U-FRAME
  §10's criterion, and **at most two copies have a run open at any point of a
  single sweep of the old tile**. One sweep reads off every copy's largest gap
  at once: cost N, not p·N. Copy boundaries are stitched explicitly.

The run fold is checked against the list fold at folds 7, 11, 13, 17, 19 and 23
(G2 **and** the least attaining position, both) and against the gap-array fold at
29, before it is trusted at 31 and 37. 98 assertions in repro 2, all passing,
including that every fold's gap sequence sums to the tile width — the one check
that catches a mis-closed cycle, which is a real bug this file had and fixed.

### 3.1 §2, the odd-fold table

| fold U | composite | kills (recorded) | kills (computed) | G2 after (recorded) | G2 after (computed) | |
|---|---|---|---|---|---|---|
| 3 | no | 2 | 2 | 6 | 6 | matches |
| 5 | no | 2 | 2 | 12 | 12 | matches |
| 7 | no | 6 | 6 | 30 | 30 | matches |
| 9 | **yes** | 0 | 0 | 30 | 30 | matches |
| 11 | no | 270 | 270 | 42 | 42 | matches |
| 13 | no | 2,430 | 2,430 | 66 | 66 | matches |
| 15 | **yes** | 0 | 0 | 66 | 66 | matches |
| 17 | no | 400,950 | 400,950 | 108 | 108 | matches |

Eight rows, sixteen numbers, all sixteen reproduce. The Inertness Lemma is
asserted rather than observed at 9 and 15: the run fails if a composite fold
kills anything.

**The one §2 number that does not reproduce.** The prose says the folds by 4, 6,
8, 9 and 25 "kill nothing and leave G₂ at 12: the tile width balloons from 30 to
162,000". Killing nothing and leaving G₂ at 12 both reproduce, at every one of
the five folds. The width does not:

| after folding by | width |
|---|---|
| 4 | 120 |
| 6 | 720 |
| 8 | 5,760 |
| 9 | 51,840 |
| 25 | **1,296,000** |

30 · 4 · 6 · 8 · 9 · 25 = 1,296,000. The recorded 162,000 is 30 · 4 · 6 · 9 ·
25, the same list **with the 8 dropped**. Either the 8 was not in the run that
produced the sentence, or 162,000 is the arithmetic of a four-fold list. The
claim the sentence is making — that waste is harmless — is unaffected either
way, since all five folds kill nothing at every width.

### 3.2 §4, the fold ladder

The ladder itself, recomputed: **2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348,
528** at x = 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37. Identical to the
recorded ladder at all twelve levels. G2(31#) = 348 and G2(37#) = 528 come out
of the run fold, and agree with `research/a3-10-lower-tightness.js`'s deep31 and
deep37 legs, which reached them by an unrelated stream engine.

| §4 quantity | recorded | computed | |
|---|---|---|---|
| multipliers c(p), @5→@7 .. @31→@37 | 2.50, 1.40, 1.571, 1.636, 1.389, 1.360, 1.265, 1.349, 1.517 | identical | matches |
| geometric mean over the last eight | 1.43 | 1.43 | matches |
| ln c(p) / (2 ln p / p) | 1.65, 0.77, 1.15, 1.48, 1.06, 1.13, 1.01, 1.35, 2.14 | identical | matches |
| the range read as a percentage | 77 to 214 | 77 to 214 | matches |
| lifetime slack ln(x²/G₂), x = 11..37 | 1.058, 0.940, 0.984, 0.878, 0.953, 1.182, 1.016, 0.953 | identical | matches |
| local slopes | 1.16, 1.08, 2.03, 0.91, 1.58, 2.03, 1.63, 1.73, 1.45, 2.11, 3.21 | identical | matches |
| α, all 12 levels | 1.476 | 1.476 | matches |
| α, from x = 7 | 1.674 | 1.674 | matches |
| α, from x = 13 | 1.861 | 1.861 | matches |
| α, from x = 19 | 1.983 | 1.983 | matches |
| α, last four (23 to 37) | 2.170 | 2.170 | matches |
| the dropped jump | 348 → 528, slope 3.21 | 348 → 528, slope 3.21 | matches |
| **α, from x = 19 dropping x = 37** | **1.98** | **1.72** | **FAILS** |

**Every §4 number reproduces except one**, and the exception is the last
sentence of the section rather than any table cell. 48 figures land exactly,
including the two multipliers the brief singled out, 1.349 at @29→@31 and 1.517
at @31→@37, which are 348/258 and 528/348.

**THE SECOND NUMBER THAT DOES NOT REPRODUCE: §4's caveat, "Drop it and the fit
from x = 19 is 1.98".** The caveat is arguing that the final local slope of 3.21
at x = 37, where G₂ jumped 348 to 528, drags the recent fits upward, and that
removing that point shows how much of the fit one data point is carrying. The
fit from x = 19 **with** x = 37 is 1.983, which is the value in the table three
lines above. Removing x = 37 gives **1.716**, on the same estimator that
reproduces all five table rows exactly. So the sentence quotes the un-dropped
value as though it were the dropped one, and the caveat as written says nothing:
it reports no change where the change is 0.27, larger than the gap between the
table's widest two windows.

Every alternative reading was tried and none lands on 1.98: dropping x = 37 from
the windows starting at 13, 17, 19 and 23 gives 1.749, 1.686, 1.716 and 1.756;
extending the ladder to the known G₂(41#) = 546 and G₂(43#) = 618 gives 1.793
with x = 37 and 1.733 without. **All eight of those fits are printed by the
script** rather than asserted here: the second session moved the search out of
the readings and into the output, so the negative result — that nothing lands on
1.98 — is machine-produced and re-runnable like every other number in §3. The
one window not previously listed, from x = 17, reads 1.869 with x = 37 and 1.686
without; it is the furthest of the eight from 1.98.

**The correction strengthens §4 rather than weakening it.** The section's point
is that one data point does most of the work, and 1.983 → 1.716 is a much
sharper demonstration of that than 1.983 → 1.98.

**A THIRD FINDING, and it is about §4 and §7 rather than about a table cell:
U-FRAME's ladder is two terms short of what the repo knows.** §4 fits on
"our twelve levels" and closes with "**So G₂(41#) is not the decisive
measurement**"; §7 item 3 lists **G₂(41#)** as future work, "the thirteenth
term ... the lattice counter prices it at about 37 hours". Both are stale.
`research/G2-STATE.md` §6.1 tabulates fourteen terms, with **G₂(41#) = 546** at
term 13 and **G₂(43#) = 618** at term 14, and its §6.4 records that the 546 was
confirmed twice the same day, by direct enumeration and independently by the
two-class construction's 545 = G₂ − 1. U-FRAME's own §6a already knows this and
says so in a different register: "G₂(41#) = 546 is already published as
A144311's a(13) + 1, so computing it buys verification rather than discovery."
So one section of U-FRAME prices a measurement that another section of the same
file says is already published, and §4 fits a ladder two terms shorter than the
one on disk. **U-FRAME.md is not edited here**; the fits over the full fourteen
terms are printed by `uframe-repro-01-fold-ladder.js` so the orchestrator can
see the size of the difference before deciding. It is small — 1.793 against
1.983 from x = 19 — which is itself §4's point about small samples.

### 3.3 §5 table 1, what made the maximum gap

The record stretch is found as the **least** position attaining the new maximum,
which is the canonical choice and the one that makes a row comparable between
runs when the maximum is attained more than once. Given the position, trial
division does the rest: the old slots strictly inside the stretch are the kills,
and the distances between them are the merged sub-gaps. Every one of those slots
is asserted to be ≡ 0 or −2 (mod p), so a kill that the fold could not have made
would stop the run.

| fold | new G₂ | kills rec/comp | merged sub-gaps recorded | merged sub-gaps computed | old G₂ | least position | |
|---|---|---|---|---|---|---|---|
| 7 | 30 | 2 / 2 | 6+12+**12** | 6+12+12 | 12 | 71 | matches |
| 11 | 42 | 1 / 1 | 12+**30** | 12+30 | 30 | 899 | matches |
| 13 | 66 | 1 / 1 | 36+30 | 36+30 | 42 | 731 | matches |
| 17 | 108 | 2 / 2 | 30+**66**+12 | 30+66+12 | 66 | 701 | matches |
| 19 | 150 | 1 / 1 | 42+**108** | 42+108 | 108 | 659 | matches |
| 23 | 204 | 3 / 3 | 24+48+90+42 | 24+48+90+42 | 150 | 76,166,567 | matches |
| 29 | 258 | 2 / 2 | 60+60+138 | 60+60+138 | 204 | 1,205,437,109 | matches |
| 31 | 348 | — | *(not in §5)* | 138+60+150 | 258 | 8,813,641,451 | new |
| 37 | 528 | — | *(not in §5)* | 66+72+222+168 | 348 | 544,899,485,411 | new |

**All seven §5 rows reproduce, every number.** §5's summary sentence reproduces
too: "In four of seven folds the winning stretch contains the old maximum gap
itself" — computed, four of seven, and they are folds 7, 11, 17 and 19.

The nine least positions are an unplanned second check. They were computed here
by folding and by streaming, with no table read in, and all nine agree with the
`pos` column of `research/exact-g2-ladder.js`'s LADDER, which reached them by the
tile-major bit-parallel enumeration. Two independent routes, nine positions,
no disagreement. *(Re-checked line by line in the second session against that
file's lines 32-45: 71, 899, 731, 701, 659, 76,166,567, 1,205,437,109,
8,813,641,451 and 544,899,485,411, all nine identical. The same table is where
§3.2's third finding comes from — it holds fourteen terms, two more than
U-FRAME §4 fits on, with `x: 41, g: 546` and `x: 43, g: 618` carrying attaining
positions of their own.)*

### 3.4 §5 table 2, adjacent kills and L — the one number that fails

| fold p | qualifying gaps rec | qualifying gaps comp | share rec | share comp (exact) | L rec | L comp | |
|---|---|---|---|---|---|---|---|
| 7 | {12} | {12} | 66.7% | 66.667% (2/3) | 2 | 2 | matches |
| 11 | none | none | 0% | 0% (0/15) | 1 | 1 | matches |
| 13 | {24} | {24} | 4.4% | 4.444% (6/135) | 2 | 2 | matches |
| 17 | {36, 66} | {36, 66} | **4.9%** | **4.8485% (72/1485)** | 2 | 2 | **FAILS** |
| 19 | {36, 78} | {36, 78} | 4.9% | 4.8844% (1088/22275) | 2 | 2 | matches |
| 23 | {48, 90, 138} | {48, 90, 138} | 3.1% | 3.1119% (11784/378675) | 3 | 3 | matches |
| 29 | {60, 114, 174} | {60, 114, 174} | 3.1% | 3.0660% (243816/7952175) | 2 | 2 | matches |
| 31 | *(blank)* | {60, 126, 186} | *(blank)* | 3.7367% (8,022,924/214,708,725) | 4 | 4 | new |
| 37 | *(blank)* | {72, 150, 222, 294} | *(blank)* | 1.8445% (114,848,070/6,226,553,025) | 4 | 4 | new |

*(Corrected in the second session, and this is a defect in THIS report rather
than in U-FRAME. The first draft gave folds 31 and 37 as 3.6975 and 1.8442 per
cent. Neither is the value: `uframe-repro-02-maxgap-forensics.js` now prints the
qualifying count and the total with every share, and the two fractions are
8,022,924/214,708,725 = 3.7367 and 114,848,070/6,226,553,025 = 1.8445. The
draft's 3.6975 would need a numerator of 7,938,855 and its 1.8442 would need
114,830,091; neither number appears anywhere. Both rows are new — U-FRAME leaves
those cells blank — so no comparison verdict changes, and fold 37 still rounds
to a3-02's independently computed f = 1.844e-2. It is recorded because a wrong
figure in a custody report is the same defect the wave exists to hunt.)*

**THE ONE NUMBER THAT DOES NOT REPRODUCE: §5 table 2, fold 17, "share of all
gaps" = 4.9%.** *(And as of the second session the script says so itself. Its
verdict column used to test only the qualifying-gap set and L, so fold 17
printed the word "reproduces" beside a computed 4.8 against a recorded 4.9 — a
verdict contradicting the number in its own row. The share is now compared at
the one decimal place §5 prints, that row reads `SHARE DIFFERS <-- §5 records
4.9%`, and every share is printed as its exact fraction so the rounding can be
checked rather than trusted.)* The exact value is 72 of T₁₃'s 1,485 gaps, 4.8485 per cent,
which rounds to 4.8 at one decimal place. The two contributing counts are 60
gaps of size 36 and 12 of size 66. The neighbouring row, fold 19, genuinely is
4.9 per cent (1,088 of 22,275 = 4.8844), so the most likely history is a
carried-down value rather than a computation. **Nothing rests on it**: the
sentence the column supports is that the qualifying share is small and falling
away from fold 7's 66.7 per cent, which 4.8 says as well as 4.9. Flagged
because a table that is right in 59 places and wrong in one is exactly the case
where a reader stops checking.

The L diagonal reproduces in full: **2, 1, 2, 2, 2, 3, 2, 4, 4** at folds 7 to
37, against §5's recorded 2, 1, 2, 2, 2, 3, 2, 4, 4. So does §5's reading of it:
the kills column of table 1 is 2, 1, 1, 2, 1, 3, 2, 2, 3, so **max kills 3
against max L 4**, and "bounding the adjacent-kill run bounds the wrong
quantity" survives the two new folds.

Three further cross-checks fell out, none of them planned:

* fold 29's qualifying count is **243,816**, which is exactly the number U-FRAME
  §8 attributes to `a3-10-lower-tightness.js`'s direct triple test ("243,816
  deletable adjacent pairs"). The 6 that separates it from §11's exact
  PAIRS(T₂₃, 29) = 243,822 is visible in the decomposition here as well:
  d = 174 = 6p occurs exactly 6 times.
* fold 37's qualifying set and share, {72, 150, 222, 294} at 1.8445 per cent,
  match `a3-02-diagonal-f.js`'s deep block ("qualifying gaps: 72(1.765%)
  150(0.079%) 222(0.000%) 294(0.000%)", f = 1.844e-2) computed by a different
  engine.
* L(T₂₉, 31) = 4 and L(T₃₁, 37) = 4 match `a3-10-lower-tightness.js`'s deep31
  and deep37 legs.

### 3.5 §7 item 4, the question that was left open

§7 item 4: "Ask whether the mechanism switched: the last three folds did not
extend the old maximum but assembled a fresh one from three or four large gaps."

| fold | multiplier | largest sub-gap | old G₂ | verdict |
|---|---|---|---|---|
| 7 | 2.500 | 12 | 12 | extended the old maximum |
| 11 | 1.400 | 30 | 30 | extended the old maximum |
| 13 | 1.571 | 36 | 42 | assembled, 2 sub-gaps |
| 17 | 1.636 | 66 | 66 | extended the old maximum |
| 19 | 1.389 | 108 | 108 | extended the old maximum |
| 23 | 1.360 | 90 | 150 | assembled, 4 sub-gaps |
| 29 | 1.265 | 138 | 204 | assembled, 3 sub-gaps |
| 31 | 1.349 | 150 | 258 | assembled, 3 sub-gaps |
| 37 | 1.517 | 222 | 348 | assembled, 4 sub-gaps |

**Confirmed, and it is four folds rather than three.** Every fold from 23 on
assembles; every fold before it except 13 extends. The largest piece of the
assembled record is 90, 138, 150, 222 against old maxima of 150, 204, 258, 348,
so the record is built from gaps well below the old maximum, and the mechanism
Chris originally described (kill the end of the worst gap, absorb its
neighbour) stopped being the operative one at fold 23. That is a change of
mechanism at the exact place §4 says the multiplier stopped falling, and it is
the first time both statements have been on one page with the same custody.

---

## 4. What is left


*(Filled at the end of the second session. Part A is complete apart from the one
file §1.5 removes from the class; Parts B and C are complete as scoped.)*

### 4.1 For the orchestrator to integrate

Nothing in this report has been written into a working document. Four items are
ready to be:

1. **`research/U-FRAME.md` §8's custody paragraph is now false in the reader's
   favour** and should be replaced. It says "the repo holds no script that
   regenerates them ... treat those tables as recorded-not-reproducible and do
   not quote them elsewhere." Two scripts now regenerate them, one of them
   verified byte-identical on a re-run in a second session. The three numbers
   §3 flags should be corrected at the same time, because lifting the
   do-not-quote warning over an uncorrected table is worse than leaving it.
2. **The three non-reproducing numbers**, each a one-line edit: §2's 162,000 to
   1,296,000, §4's closing "1.98" to 1.72, §5 table 2's fold-17 "4.9%" to 4.8%.
   None of them changes a claim; §4's makes its own point harder.
3. **§4's twelve-term ladder and §7 item 3** against `G2-STATE.md`'s fourteen
   terms (§3.2's third finding). This one is a judgement call rather than a
   typo: §4's exponent discussion may have been written before terms 13 and 14
   landed, and re-fitting it is the orchestrator's decision, not a correction.
4. **TODO item 11b** is satisfied for §§2, 4, 5 and §7 item 4. It is not
   satisfied for anything else U-FRAME's §8 covers.
5. **§2.3's `--run` specification**, if the composite class is to be closed. It
   is a spec and nothing else; six of the ten files clear on it, two clear
   already with a `--force` the orchestrator has to authorise (§2.1), and two
   are provenance problems no tool should paper over.

### 4.2 Not reached, and why

* `natal-cap-33-overnight.js` — deliberately not embedded (§1.5). Binding its
  tail honestly costs a 5.25 h run of `run3`, and it belongs in §2's class.
* The six composites of §2.2 and the three of §2.1 — investigation only, as the
  brief scoped it. §2.3's extension is a specification and nothing in
  `research/qc/embed.js` was changed.
* The `uncited-script` finding on `research/attack-ab-coupling-02-lp.js` and the
  `transferred-claim` at `TODO.md:264` were both other agents' and both cleared
  under those agents' own work. Neither was touched here.
* `research/exact-g2-ladder.js` is still an unbound legacy tail. It came up
  twice in §3 as the independent route that confirms nine attaining positions
  and the fourteen-term ladder, so it is load-bearing for Part C's cross-checks
  and is the obvious next candidate, but it was not on this brief's list.

### 4.3 What this wave changed on disk

Repo files written, and nothing else:

| file | what changed |
|---|---|
| `research/lp-push-x43.js` | tail bound (forced), traceability note appended below it |
| `research/natal-cap-27-t4-at13.js` | tail bound (forced), traceability note appended below it |
| `research/verify-ladder-big.js` | tail bound (forced), traceability note appended below it |
| `research/uframe-repro-01-fold-ladder.js` | new script, embedded; second session added the eight alternative caveat fits and reading 7 |
| `research/uframe-repro-02-maxgap-forensics.js` | new script, embedded; second session made the share part of the verdict test and printed exact fractions, and corrected one reading |
| `research/history/staging/consolidation-wave.md` | this report |

`research/lemmaV-sup-extension.js` was modified by the first session and only
verified by the second. **No working document was edited**: not `U-FRAME.md`,
not `TODO.md`, not `G2-STATE.md`, not the CHANGELOG. Nothing was committed and
nothing was pushed.
