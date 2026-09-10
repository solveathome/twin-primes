# Custody: the scripts whose evidence is not one run of themselves

<!-- ledger
id: Q-custody-external
status: ANSWERED
todo: none
question: Which scripts carry an OUTPUT block that no single run of themselves produces, and is that evidence still reachable?
verdict: Sixteen scripts, 14 reproducible in one night, 2 longer than a night, 0 unreproducible, with six long runs re-earned figure for figure; the larger finding is the instrument, since tailfmt's outputText returns an empty body for 50 of the 113 scripts carrying a tail, so nearly half the pasted evidence is unread by the gate and the --force guard is inert on the same 50.
-->

**16 scripts carry an OUTPUT block that no single run of that file produces. By
state: (a) reproducible tonight — 14; (b) one leg longer than a night — 2;
(c) not reproducible at all — 0.** Every external log the corpus names is still
on this disk, and the file that pointed at a lost "run log" regenerates it in
half a second. **Six long runs were re-earned tonight, every figure
identical: S(37) = 7,998,394,865 and β(37) = 0.8530 (1.88 h),
R*(19) = 53.972817 by full exhaustion (66 min), E_med(31) = 60.90 (42 min),
`a3-08 --t31` (59 min), and all six `natal-cap-34` stages (56 min).** Still exposed: S(41) and
Var(37), one witness each, and three files whose record sits in one untracked
directory on one laptop.

**The larger finding is about the instrument.** `qc/tailfmt.js` `outputText()`
returns an empty body for **50 of the 113 scripts that carry a tail**, and every
check that reads a tail opens with `if (out === null || !out.trim()) continue`.
Nearly half the pasted evidence is unread by `embeds`, uncounted by the
migration counter, unranked by `readings-not-traceable`. Two causes: 23 tails
put the run inside `/* … */`; 27 have no rule under the OUTPUT title, so the
header terminator binds to the rule above READINGS. The counter reads 56; the
true legacy population is **106**.

**The same bug disables the `--force` guard on those 50 files.** Demonstrated,
not argued (§4.2): on a scratch copy of `natal-cap-36-skeleton-door.js`,
`embed.js` exited **0** and silently replaced a composite tail with a 31-second
default run, destroying the `P6 @29` row behind that file's headline "leg (iii)
is a THEOREM through x = 29". On `05-twin-jacobsthal.js`, whose body the parser
can read, the guard exited 3 and named the seven figures at risk.

**And the ranking that surfaced this class scored it for the wrong reason.**
`natal-cap-37` ranks at 58 of 64 readings-figures absent; body-aware it is **8
of 64**, and `natal-cap-34` moves 200/201 → 128/201. Their blocks are not "not
output at all": they are 178 and 135 real output lines in a block comment.

---

## 1. The class

Sixteen files whose OUTPUT block is not the output of one run of that file as it
stands. "What the tail says" is quoted from the file's own banner. **Every one of
them is honest about itself**; that is the point of counting them.

### 1.1 Group A — evidence outside version control (3)

| file | what its tail says its evidence is | where that evidence lives | present tonight? |
|---|---|---|---|
| `research/natal-cap-37-at41-march.js` | "OUTPUT — three real runs, PASTED FROM LOGS, NOT PRODUCED BY THIS PASTE … All three are copied byte for byte out of log files written by the runs of 2026-08-15, which live OUTSIDE this repo" | `~/Files/primeoire-runs/at41/{audit,cost,at41-run2,at41,gates}.log` and 24 shard JSONs, untracked | YES — 5 logs, 24 JSONs |
| `research/natal-cap-34-wrap-precision.js` | a provenance paragraph in place of a run banner: six stages, "EVERY ONE RUN TODAY"; "NOT COPIED FROM A LOG. The two archived logs are a reproduction target only" | `research/wave7-logs/cap34-exact13.log` (tracked) and `~/Files/primeoire-runs/chain/cap34-verify.log` (untracked) | YES, both |
| `research/natal-cap-35-x-multiplicity.js` | a provenance paragraph: "It is the THIRD run of this file. It reproduces, line for line and digit for digit, two earlier runs whose logs are on disk" | `research/wave7-logs/cap35-x-multiplicity.log` (tracked) and `~/Files/primeoire-runs/chain/cap35-default.log` (untracked) | YES, both |

### 1.2 Group B — composite: two or more separate invocations in one tail (9)

| file | the legs, at the file's own recorded cost |
|---|---|
| `research/natal-cap-33-overnight.js` | **three** OUTPUT banners: `run1` 2,301.6 s, `run2` 5,980.9 s, `run3` 18,894.3 s |
| `research/natal-cap-32-wrap-identity.js` | `small` 19 s, `at13` 2.3 min, `at17` 11 min on 6+6 workers |
| `research/natal-cap-36-skeleton-door.js` | default 56–65 s, plus `--at29` 11.3 min (the two P6 rows) |
| `research/a3-02-diagonal-f.js` | `fast <deep results>` 35 s — the deep numbers arrive as argv — plus `deep` 179 s |
| `research/a3-08-adjacent-pairs.js` | default 89 s, plus "the separate detached run … `--t31`, 2,620 s, with 28 of its 31 progress lines elided" |
| `research/a3-10-lower-tightness.js` | **three** OUTPUT banners: `main` 21 s, `deep31` 10.3 s, `deep37` 519 s |
| `research/level-ledger-tight.js` | default 30.7 s, plus "R*(19) row from the --deep run, 2717.1 s" |
| `research/attack2-rankin2d.js` | default 2 m 42 s, plus "--deep results recorded from the deep runs of the same day" (n=10 586 s, n=13 20.5 min) |
| `research/05-twin-jacobsthal.js` | its own loop stops at p = 23; the p = 29 row is `05b-twin-jacobsthal-segmented.js`, and the tail says so |

### 1.3 Group C — the OUTPUT block is PROSE, not output (2)

The sharpest members of the class after Group A, and the ones the ranking never
saw, because a hand-written paragraph parses fine.

| file | what its OUTPUT block actually is |
|---|---|
| `research/lemmaV-parseval.js` | Six narrative paragraphs, S0–S5, headed "OUTPUT (run of 2026-08-18, 371 s. Full tables and their reading in `research/history/staging/attack-beta2-01-lemmaV-meansquare.md`)". **Not one line of the run's stdout.** The numbers are hand-rounded: the block says "rel 2.6e-15 and 1.4e-13 at z = 13 and 17"; the run prints `rel=2.64e-15` and `rel=1.37e-13`. See §4.8 |
| `research/lemmaV-sup-extension.js` | The same shape: S0–S6 paragraphs under "OUTPUT (run of 2026-08-18. Full tables and their reading in `research/history/staging/lemmaV-sup-extension.md`)" |

### 1.4 Group D — the tail defers a table to a sibling document (2)

| file | what it defers, and to where | reachable? |
|---|---|---|
| `research/sift-limit-attack.js` | "full table in `sift-limit-attack.md` sec 4.5" | YES; the block itself reproduces 21 of 21 in 4 s |
| `research/attack2-05-07-integral-ladder.js` | "abridged to the x=1e8 window (**1e6/1e7 in run log**, same shape with larger finite-size offsets)" | the log does not exist — **and does not need to**, see §2.3 |

### 1.5 The boundary, so nobody re-derives the class and gets 32

Sixteen more files declare an abridgement of **one** run of themselves
(`01`, `02`, `a3-03`, `a3-06`, `attack-beta2-04`, `lp-push-x43`,
`natal-cap-05/06/08/12/15/23/24/26/28/30`). Those are not in the class: the tail
is that file's own output with rows dropped, and a plain re-run restores them.

## 2. The three states

### 2.1 State (a) — reproduced or reproducible here tonight

Run tonight, on this machine, node v22.21.0, under a wave load that peaked at
133. "figures" counts the pasted block's numeric tokens found in the fresh
output.

| file / leg | recorded | tonight | figures |
|---|---|---|---|
| `natal-cap-35-x-multiplicity.js` | 80.3 s | **77.5 s** | **524 / 524** — only the five wall-clock lines differ. Fourth independent run. **EMBEDDED** |
| `a3-04-maxsum-recursion.js --t29` | 41.5 s | **42 s** | **440 / 440**. **EMBEDDED** |
| `attack-beta2-05-covering-prune.js --full` | 22.2 s | **21 s** | 207 / 214 — 3 `ms` cells and 4 prose figures (§4.3). **EMBEDDED** |
| `attack2-05-07-integral-ladder.js` | — | **0.5 s** | 50 / 52; the 2 are one reflowed sequence, present with different spacing. **EMBEDDED (`--force`, §2.3)** |
| `sift-limit-attack.js` | ~2 s | **4 s** | **21 / 21** |
| `05b-twin-jacobsthal-segmented.js` | ~3 min | **25 s** | 7 / 8; the 8th is "2.0e11" in prose |
| `05-twin-jacobsthal.js` | — | **1 s** | 39 / 46 — the 7 absent are exactly the p = 29 row, which is 05b's. Guard refused; **not forced** |
| `a3-10-lower-tightness.js main` | 21 s | **26 s** | **147 / 147** |
| `a3-10 deep31` | 10.3 s | **12 s** | 17 / 18 (the 18th is "214.7" in the banner prose) |
| `a3-10 deep37` | 519 s | **939 s** | 18 / 19 (the 19th is "6.23e9" in the banner prose) |
| `natal-cap-36-skeleton-door.js` default | 56–65 s | **31 s** | 138 / 158 — the 20 absent are the `--at29` rows |
| `natal-cap-36 --at29` | 658 s | **856 s** | **both P6 rows exactly**: `G30_agg=0.1176 margin 0.3824 dev_agg=0.1180 Cov>0: 1/7863 max|no30| 0.0054 (at q=1109) resonances: 173 (0.511)` |
| `natal-cap-32-wrap-identity.js small` | 19 s | **20 s** | 2 / 37 — the 35 absent are the `at13`/`at17` legs |
| `natal-cap-32 at13` | 138 s | **132.6 s** | **exact**: `T4(inst)=352241335.0767941 REL=-3.501681e-5`, `T3=4662898.943599455 REL=-1.001819e-5` |
| `a3-02-diagonal-f.js fast` (no argv) | 35 s | **54 s** | 206 / 309 — the 103 absent are the deep results passed in as argv |
| `a3-02 fast` **with the recovered argv** | — | **52 s** | all four PHASE C′ T31 rows byte-for-byte; the invocation is reconstructed in §4.9 |
| `a3-02 deep` | 179 s | **493 s** | reproduces the deep row exactly (`T31 \| 37 \| 32.2 \| 74 \| 2.30 \| 1.84e-2 \| 3.99 \| 1.738 \| 4 \| 22.6 \| 5.6`) |
| `attack2-rankin2d.js` default | 162 s | **172 s** | 101 / 131 — the 30 absent are the `--deep` and WalkSAT legs |
| `a3-08-adjacent-pairs.js` default | 89 s | **142 s** | 180 / 203 — the 23 absent are the `--t31` leg |
| `a3-08 --t31` | 2,620 s | **3,514 s** | with the default leg, **203 / 203** — the whole composite tail reproduced |
| `attack2-rankin2d.js --deep` | n=10 586 s, n=13 20.5 min | **2,220 s** | adds the deep levels; the residual 29 are hand-reformatted (§4.8) |
| `level-ledger-tight.js` default | 30.7 s | **40 s** | **455 / 455**, including the R*(19) row — see §4.5 for why that is subtler than it looks |
| `natal-cap-34-wrap-precision.js kurt` | 1.8 s | **2 s** | κ₄ = **−1.1063** @11 and **−0.4850** @13, exactly as pasted |

`lemmaV-parseval.js` also ran (**486 s**, recorded 371 s); its result is §4.8.
The only class member not exercised at all tonight is `natal-cap-32 at17`
(11 min on 6+6 workers) and `lemmaV-sup-extension.js`, the latter because a
sibling agent held it.

### 2.2 State (b) — one leg longer than a night (2 files)

| file / leg | cost | what it produces |
|---|---|---|
| `natal-cap-37-at41-march.js at41` | 22,176 s = **6.16 h** on ten *idle* cores | S(41) = 256,725,962,834, β(41) = 0.8455, E(41), N(41). Not attempted: the machine ran at load 133. Its `audit`/`cost`/`gates`/`smoke` modes were already re-run first-hand on 2026-08-18 (`qc-wave6-W.md` §2.3) |
| `natal-cap-33-overnight.js run3` | 18,894 s = **5.25 h** | Var(37) = 3,711,451,136, Var/E = 0.3958, the ninth point that separates the 1/lnW and 1/lnlnW fits |

**LONG RUNS STARTED AND CARRIED TONIGHT.** These are the point of the night, so
they are reported with where they got to rather than only whether they finished.

- **`natal-cap-33-overnight.js run2` — the @37 drift march.** Recorded 5,980.9 s;
  on this loaded box it paced at ~35 blocks/s of 247,358 and projected ~1.7 h.
  Its custody gates passed before the march began, which is the part that
  matters for provenance: `@7..@29` digit-for-digit against cap-22, and
  S(31) = 283,449,187. **FINISHED in 6,780.4 s (1.88 h) and REPRODUCES THE
  PASTED BLOCK.** S(37) = **7,998,394,865**, N(37) = 145,286,237,250,
  E(37) = 9,377,228,928.8, β(37) = **0.8530** — every one identical to the
  record. So is the whole ninth-drift-point table (nine rows of S/E, 1/lnW,
  classical, resid), the four on-record forecasts and their misses
  (classical+resid −0.0006, classical-raw +0.0010, free-linear +0.0051,
  pinned −0.0068), the refits (all-9 free c = 0.7860 rms 0.0294; last-4 free
  c = 0.7785, b = 2.196, rms 0.0004), the remaining gap 0.0599, the @41
  forecasts (0.8449 / 0.8459 / 0.8443 / 0.8488), and the 87 sampled survivors
  down to `(2725001,2725003)` first and `(7420738134529)` last. **The most
  load-bearing number in `paper/anchored-note.md` that could be re-earned in
  one night has been re-earned.**
- **`natal-cap-33-overnight.js run1` — the @31 window-excess measurement.**
  Recorded 2,301.6 s. **FINISHED in 2,544.1 s and REPRODUCES.**
  E min/med/max = 57.73 / 60.90 / 100.39, log-log slope 0.060, deficit side
  0.59, **E_med(31) = 60.90** against cap-29's a-priori 54.98, implied
  c = 1.074 — every figure as pasted. Its four custody gates passed first:
  E_med = 4.05 / 7.18 / 12.61 / 23.20 at @13/@17/@19/@23, all `= cap-17 ✓`.
- **`level-ledger-tight.js --deep` — the R*(19) exhaustion over 1,658,880
  dilation classes.** Recorded 2,717.1 s. The run asserts the recorded constant
  at `:514` (`|best − 53.972817| < 1e-6`), so it is a real verification of a
  state-(b) figure rather than a re-paste. **FINISHED in 3,987.3 s (66 min),
  assert passed, and it returns `R*(19) = 53.972817   step from
  R*(17) = 1.9976   gain vs 2*3^7 = 81.04`** — the pasted row at `:618` to the
  last digit. The constant that `level-ledger-tight.js` hardcodes is now
  independently re-derived.
- **`natal-cap-34-wrap-precision.js exact13` — the @13 exact decomposition, 6
  workers.** Recorded 1,466.0 s at 10 workers. This is the stage that produces
  every number cap-34 is cited for; its dependents `layers`, `c2` and `joint`
  all abort with `run stage exact13 first`, which is exactly why the six-stage
  tail cannot be re-created by any one command. **FINISHED in 1,915.8 s
  (32 min) at 6 workers, `[4 checks passed]`, and it reproduces the pasted block
  DIGIT FOR DIGIT**: T4 = 352253669.87624460, cap-27 REL = 3.384189e-16,
  A = 68943985960.279144, C1 = −2294790388.9899592, C2 = −184829668.85234207,
  C3 = −553554086.94408917, Multi = 44821955.443329073,
  G = 65955633770.936089, quads = 39,782,707,965, and the whole opened-up JOINT
  layer (e2 = 45090019.6365043, e3 = −268718.409425233, 4-and-up =
  654.216249991616, w = 1 giving −64.36% of the layer). The only differing lines
  are the worker count, the wall times and the scratch path. `layers` then
  reproduced 69 of 69 figures in 381 s, `c2` 26 of 26 in 315 s, `kurt` 34 of 34
  in 2 s, `joint` 37 of 37 in 7 s, and `verify` 23 of 23 with
  `[88520 checks passed]`. **All six stages of `natal-cap-34` were reproduced
  tonight**, which retires its provenance question outright: every figure it is
  cited for now has three independent productions — the 2026-08-15 archived log
  in `research/wave7-logs/`, the 2026-08-18 wave-6 run, and tonight's.

Whatever these return is a finding for the next reader, not a repair. No
recorded number was edited either way.

### 2.3 State (c) — not reproducible at all: **none**

The candidate was `research/attack2-05-07-integral-ladder.js`, whose tail reads
"abridged to the x=1e8 window (**1e6/1e7 in run log**, same shape with larger
finite-size offsets)". There is no such log in `research/wave7-logs/`, in
`~/Files/primeoire-runs/`, or anywhere the tail names.

**It does not matter, and that is the finding.** `:84` iterates
`[{x:1e6,D:2e5}, {x:1e7,D:1e6}, {x:1e8,D:1e6}]` in a single default invocation
that takes **half a second** and prints all three windows. The cross-scale
reading the file quotes — "0.852 (x=1e6) → 0.802 (1e7) → 0.788 (1e8) → 0.793
asymptote" — reproduces exactly. The "run log" reference is a fossil of an era
when the paste was made by hand; it named external evidence that the file had
never needed.

The whole abridged block is quoted in §4.6 and the file is now embedded with all
three windows, 78 lines, so the reference is gone and the evidence is in the
repository.

**So nothing in this class is unrecoverable.** Every external log the corpus
names is on this disk tonight, including all five `at41` logs and the 24 shard
JSONs.

## 3. What rests on evidence with a single witness

The honest list the brief asked for. Ranked by what breaks if the evidence goes.

1. **S(41) = 256,725,962,834 and β(41) = 0.8455 — ONE witness, 6.16 h, and no
   instrument recomputes it.** Carried by `paper/anchored-note.md`,
   `paper/wall-note.md`, `TODO.md`, `research/OBSERVATIONS.md`.
   `audit-numbers.js` recomputes the G2(41#) *band* (§6) and the G2(41#) = 546
   certificate (§ "by certificate"); it does not touch S(41), E(41) or β(41).
   The march ran once. The killed first attempt agrees digit-for-digit over
   ~1.3% of the tile, which establishes determinism, not correctness
   (`qc-wave6-W.md` F-37-3). Since 2026-08-18 the log is pasted into the script,
   so the repository holds a copy of the *output* — but the 24 shard JSONs,
   and therefore any independent re-fold of S(41), exist only in
   `~/Files/primeoire-runs/at41/`. **This is the most load-bearing single-witness
   number in the corpus and the most exposed.**
2. **Var(37) = 3,711,451,136 and Var/E = 0.3958 — one 5.25 h run.** Carried by
   `paper/variance-note.md`, `TODO.md`, `CHRONICLE.md`. State (b). It is the
   ninth point, and the point at which the variance law's model selection turns,
   so a second witness is worth 5.25 hours of some future night.
3. **S(37) = 7,998,394,865 — was one 100-minute run**, carried by
   `paper/anchored-note.md`. **No longer a single witness: re-run tonight in
   1.88 h and identical** (§2.2).
4. **cap-34's `exact13` decomposition at @13** — T4 = 352,253,669.87624460 and
   the C1/C2/C3/Multi split. One 24-minute stage, reproduced once on
   2026-08-18, archived in `research/wave7-logs/cap34-exact13.log`, which **is**
   tracked. **Re-run again tonight, all six stages, all digits identical**, so
   this one is fully retired.
5. **R*(19) = 53.972817 — was one 45-minute exhaustion**, hardcoded as a
   constant in `level-ledger-tight.js` so the 30-second run can print it.
   **No longer a single witness: the `--deep` exhaustion over all 1,658,880
   dilation classes was re-run tonight in 66 min and returns the same value**
   (§2.2).
6. **E_med(31) = 60.90 and the implied c = 1.074** — was one 38-minute run.
   **Re-run tonight in 42 min and identical** (§2.2).

## 4. Findings

### 4.1 The parser blindness (HIGH severity, HIGH confidence)

`research/qc/tailfmt.js`:

- `outputText()` keeps only lines matching `^\s*\/\/ ?(.*)$`, so a tail whose
  body is a raw `/* … */` block yields nothing. **23 files**, including all
  sixteen `fold-profile-*`, `natal-cap-07/13/14/19/31/38`.
- `locate()` sets `headerEnd` to the *first* `// ====` rule between the OUTPUT
  title and READINGS. A tail with no rule under its title binds that terminator
  to the rule *above* READINGS, so `bodyStart` lands at or past `outEnd` and the
  body is empty. **27 files**, including `verify-ladder-big.js`,
  `lp-push-x43.js`, `grain-census.js`, `natal-cap-23/26/30/36`.

Both consumers then skip the file outright — `research/qc/checks.js`:1108 and
:1153, `if (out === null || !out.trim()) continue;`.

Measured consequences:

- the `hand-pasted-tail` migration counter reads **56**; the true legacy count is
  **106** (56 counted, 50 skipped, and every one of the 50 is legacy);
- `readings-not-traceable` cannot rank 50 files at all;
- and `qc/tails.js`, which parses the tail independently, disagrees with
  `tailfmt` on 29 of them — see §4.7;
- the gated `embeds` check would not see a broken `code-sha256` on any of them.
  No live embed is affected today, because `embed.js` writes `//`-prefixed
  bodies; the exposure is against a hand-written fingerprint.

Rescored with a body-aware extractor over every script in `research/`:

| file | ranking says | corrected |
|---|---|---|
| `natal-cap-37-at41-march.js` | 58 of 64 (91%) | **8 of 64 (13%)** |
| `natal-cap-34-wrap-precision.js` | 200 of 201 (100%) | **128 of 201 (64%)** |
| `natal-cap-35-x-multiplicity.js` | not ranked | 5 of 73 |
| `a3-02-diagonal-f.js` | not ranked | 16 of 104 |
| `a3-03-f-from-census.js` | not ranked | 38 of 114 |
| `fold-profile-15-variance-law.js` | not ranked | 31 of 83 |

The custody fragility `qc/README.md` describes is real and is §1.1 above. What
the record does not support is the sentence that these two blocks "are not output
at all": they are 178 and 135 lines of real output, under a provenance note,
inside a block comment.

### 4.2 The `--force` guard is inert on the same 50 files (HIGH, HIGH)

`embed.js`'s guard is `if (!hadFingerprint && existing && existing.trim())`.
When `outputText()` is empty, `existing` is falsy, the guard never runs, and
there is no figure comparison, no exit 3 and no `--force` requirement.

Demonstrated on a scratch copy **outside the repository**:

```
$ node research/qc/embed.js <scratch>/natal-cap-36-skeleton-door.js
embedded <scratch>/natal-cap-36-skeleton-door.js
  52 lines of output, 31.4 s
$ echo $?
0
```

The 53-line composite tail was replaced by the 31-second default run, taking
both `P6` rows with it, including

```
// P6 @29: W=6469693230 K=7863    W·ΣNUMsk < 15·ΣV: CERTIFIED  G30_agg=0.1176  margin 0.3824  dev_agg=0.1180  ΣCov<0: YES  Cov>0: 1/7863  max|no30| 0.0054 (at q=1109)  resonances: 173 (0.511)   [658s]
```

— the 11-minute pass behind reading 7, "@29 IS NEW, AND LEG (iii) IS NOW A
THEOREM THROUGH x = 29". **The repository copy was not touched**, and that row
was independently re-run tonight (§2.1) and reproduces.

The contrast proves the guard is well designed and only blind:

```
$ node research/qc/embed.js research/05-twin-jacobsthal.js
research/05-twin-jacobsthal.js: REFUSING to overwrite a legacy tail that does not match this run.
  the pasted block carries 46 figures, 7 of which this run does not produce
  first: 6469693230, 214708725, 258, 1205437109, 961, 0.2685, 0.78
$ echo $?
3
```

Not forced. Those seven are `05b`'s p = 29 row and the tail says so.

### 4.3 A figure with no producer, inside an OUTPUT block, cited in a document (LOW-MED, HIGH)

Embedding `attack-beta2-05-covering-prune.js --full` dropped four figures beyond
timings. They were in this passage, which sat inside the old OUTPUT block:

```
// (G) residual deficit realised by the optimal adversary
// n=15 (x=47), L=117: |U_k| = 117, 18, 0 at k = 0, 7, 13 against the density
// prediction 117.00, 25.02, 17.90. Final deficit 17.90 = 15.3% of L.
// n=13 (x=41), L=90: final deficit 15.08 = 16.8% of L.
```

The n = 15 half is printed by the code and appears verbatim in the new block
(`15 | 47 | 117 | 13 | 0 | 17.90 | 17.90 | 0.000`). **The n = 13 half is not.**
`:408` reads `for (const n of [10, 11, topN])` with `topN = 15`, so no run of
this file has ever printed an n = 13 row of section (G). The figure is carried
as MEASURED in
`research/history/staging/attack-beta2-05-covering-pruning-bound.md`:204.

**The number is right.** Recomputed here independently:
90 · ∏(1 − 2/p) over the first eleven scour primes 5…41 = **15.08**, and
15.08/90 = 16.8%. This is the `05-twin-jacobsthal` shape — right number, broken
provenance — and it is now recomputed rather than asserted. No value needs
correcting; what is missing is a code path that prints it.

### 4.4 Three structural limits of the embed mechanism (MED, HIGH)

- **A composite tail cannot be embedded at all.** `embed.js` runs one invocation
  and replaces the whole block, so for the nine Group-B files a correct embed
  does not exist — nor for `natal-cap-34` (six stages) or `natal-cap-37` (three
  modes). **Eleven of the sixteen files in this class cannot leave the backlog
  without a multi-invocation embed.** This matters because "re-embed a
  script when you next touch it" reads as universal advice and is not.
- **`locate()` takes the LAST OUTPUT banner.** `natal-cap-33-overnight.js` and
  `a3-10-lower-tightness.js` carry three each. An embed on either would rewrite
  only the last leg and fold the two earlier legs into the region hashed as
  `code-sha256` — certifying pasted output as source code.
- **An embed deletes the provenance prose.** Everything between the OUTPUT title
  and the rule is replaced. For the three Group-A files that prose is the only
  in-repo statement of where their evidence lives, so `natal-cap-34` and
  `natal-cap-37` were deliberately **not** embedded tonight, and what the
  `natal-cap-35` embed cost is quoted in §4.6.

### 4.5 What a green fingerprint does not prove, from a good example (INFO, HIGH)

`level-ledger-tight.js` is the one file in Group B that has solved its own
composite problem, and it is worth copying. R*(19) = 53.972817 is stored as a
constant (`RSTAR[19]`) and printed by the *default* path with its provenance in
the printed line itself — `[--deep, 2717.1 s]` — while `--deep` recomputes and
asserts it (`:514`). The default run reproduces 455 of 455 pasted figures in 40
seconds.

The subtlety: an embed of the default invocation would bind a tail in which the
R*(19) row is a **literal echoed from source**, not a measurement. The
fingerprint would be green and the row would be evidence of nothing but its own
constant. The printed `[--deep, 2717.1 s]` marker is what saves it, and it is a
convention worth making explicit somewhere: **a constant printed into an output
block must carry the invocation that measured it, on the same line.**

`natal-cap-33-overnight.js` does the stronger version and should be the model.
Its `:304` prints the literal
`S(31)=283,449,187 reproduced; beta(31)=0.8626; 36 sampled survivors are twins`
— but `:302-303` assert `L31.S === 283449187`, `L31.R.toFixed(4) === '0.8626'`,
`L31.ns === 37534`, `L31.y === 447829` and `L31.E.toFixed(1) === '328601798.6'`
in the same run. The printed literal cannot be reached unless the recomputation
agrees, so the line is a measurement after all. **Assert, then print the
literal** is the pattern that makes a hardcoded number honest, and it is
already in the corpus.

### 4.6 The blocks that were replaced, quoted so they survive

`--force` was used **once**, on `attack2-05-07-integral-ladder.js`, whose whole
pre-existing block was:

```
// OUTPUT (2026-08-14), abridged to the x=1e8 window (1e6/1e7 in run log,
// same shape with larger finite-size offsets):
//
//   u=3.00 y=464     rho=1.008  pred=1.010
//   u=2.80 y=720     rho=1.016  pred=1.020
//   u=2.60 y=1194    rho=1.009  pred=1.014
//   u=2.40 y=2154    rho=0.974  pred=0.984
//   u=2.20 y=4329    rho=0.906  pred=0.916
//   u=2.10 y=6449    rho=0.856  pred=0.863
//   u=2.05 y=7988    rho=0.824  pred=0.830
//   u=2.00 y=10000   rho=0.788  pred=0.793   <- the zone-edge trough
//   u=1.80 y=27826   rho=0.972  pred=0.979
//   u=1.60 y=1e5     rho=1.229  pred=1.239
//   u=1.40 y=517947  rho=1.605  pred=1.618
//   u=1.20 y=4641589 rho=2.184  pred=2.203
// Convergence at u=2 across scales: 0.852 (x=1e6) -> 0.802 (1e7) -> 0.788
// (1e8) -> 0.793 asymptote.
//
// Seam ladder m(n), n=1..35:
// 2,1,1,2,1,6,8,11,4,16,22,4,74,24,37,28,14,11,242,11,91,20,83,91,35,80,48,
// 47,226,2,12,203,30,38,356 — m/predictedScale fluctuates 0.01..4.1
// (exponential waiting-time scatter) around a median ~0.8.
```

Every figure above is in the new 78-line block; the only two the checker could
not match are the reflowed sequence lines, which the fresh run prints as
`sequence m(n): 2, 1, 1, 2, …, 356` with spaces after the commas. Verified by
hand.

`natal-cap-35` needed no force — the guard was inert (§4.2) — so the overwrite
was checked by hand first: **524 of 524 figures of the old block are in the new
one.** The paragraph the ranking was pointing at is gone from the file, so here
it is verbatim from `HEAD`:

```
// OUTPUT (2026-08-18) — node research/natal-cap-35-x-multiplicity.js,
// full run pasted, 80.3 s, default levels [11,13,17,19].
// PROVENANCE: produced by this run, on this machine, today (10-core Apple Si,
// node v22). It is the THIRD run of this file. It reproduces, line for line
// and digit for digit, two earlier runs whose logs are on disk:
//   research/wave7-logs/cap35-x-multiplicity.log      (2026-08-15, 163.5 s)
//   ~/Files/primeoire-runs/chain/cap35-default.log    (2026-08-15, 101.1 s)
// The ONLY lines that differ across the three are the five wall-clock lines
// ("[level time ...]", "[total ...]"). Every number below is therefore
// reproduced three times independently.
```

Tonight's is the fourth run and it too differs only in those five lines.

`a3-04-maxsum-recursion.js` (440/440) and `attack-beta2-05-covering-prune.js`
(§4.3) lost nothing else.

### 4.8 Two OUTPUT blocks that are prose, and hand-rounded (MED, HIGH)

`lemmaV-parseval.js` and `lemmaV-sup-extension.js` head their tails "OUTPUT (run
of 2026-08-18 …)" and then carry six or seven narrative paragraphs. No line of
either is stdout. Re-running `lemmaV-parseval.js` tonight (**486 s**, recorded
371 s) reproduced 84 of the 108 figures in its block; the 24 misses are not
errors, they are **hand-rounded restatements**:

| block says | the run prints |
|---|---|
| "rel 2.6e-15 … at z = 13" | `z=13 H=60: brute=1.4276943835  meanSquare()=1.4276943835  rel=2.64e-15` |
| "1.4e-13 at … 17" | `z=17 H=126: … rel=1.37e-13` |

Both round correctly. That is the point: **nothing here is wrong, and a reader
still cannot tell an OUTPUT block from a summary of one.** It is precisely the
transcription step `embed.js` was built to delete, sitting under the banner that
tells a reader transcription has not happened. `attack2-rankin2d.js` is a third case of the same shape, milder. Its block
looks like a table but is a hand-reformatted one: it writes
`(3,100] #q=23 L=38 ends 0.93y^2 rho=0.871 pred 51.9 | shifted>=299 | L/y^2=3.8e-3`
where the run prints
`(x,y]=(3,100] #q=23: L_unshifted=38 (ends 9340 = 93.40y) rho=0.871 BernoulliPred=51.9 | shifted>=299 | L/y^2=3.80e-3 | tile=e^82 vs scan y^2=e^9.2`.
Same numbers, re-rounded and re-normalised by hand (`0.93y²` for `93.40y`), and
a whole column dropped. Running default **and** `--deep` (172 s + 2,220 s)
still leaves 29 of 131 figures unmatched, and every one of them is a
reformatting, not a discrepancy.

The two lemmaV files are single-invocation
and cheap enough to embed; the prose belongs in READINGS, where it would be
honest and where the ranking would then score it.

**Deliberately not embedded tonight.** An embed replaces the whole block, and
these blocks are sixty lines of careful interpretation that nothing else holds.
Moving them to READINGS first is an owner's edit, not a custody repair, and
`lemmaV-sup-extension.js` was in use by a sibling agent while this ran. The
right order is: move the prose down, then embed.

### 4.9 One undocumented invocation, recovered (INFO, HIGH)

`a3-02-diagonal-f.js` is the corpus's purest case of "argument-driven, run with
arguments nobody recorded". `:213` reads

```
  // optional 7th point, supplied from the detached deep run:
  //   node a3-02-diagonal-f.js fast <f> <mean> <D> <G2> <L>
```

so the T31 row of the `fast` table is five numbers **typed on a command line**
by whoever read them off the `deep` run. There is a hand-transcription step
inside the invocation itself, and nothing recorded which five numbers were used.

Recovered tonight. Running `deep` (493 s) prints
`f = 1.844e-2`, `mean gap m̄ = 32.2105`, `D = 6226553025`, `G2 = 348`, `L = 4`.
Feeding exactly those back:

```
node --max-old-space-size=8000 research/a3-02-diagonal-f.js fast 1.844e-2 32.2105 6226553025 348 4
```

reproduces all four pasted PHASE C′ rows byte for byte:

```
| T31 | 37 | 32.2 | 74 | 2.30 | 1.84e-2 | 3.99 | 1.738 | 4 | 22.6 | 5.6 |
| T31 | 37 | 72 | 0.973 | 32.21 | 2.235 | 3.993 | 1.681 | 0.077 | 348 | 0.213 |
| T31 | 37 | 3.978 | 3.993 | 1.004 | 4 | 22.6 | 0.177 | 11.79 | 0.339 |
| T31 | 37 | 4 | n/m | 528 (ladder) | n/m | | | 477 | *** FAILS *** |
```

That line is the file's missing provenance and belongs in its tail. It is also
the sharpest argument for the `invocation` field: here, recording the invocation
records the transcription, because the transcription *is* the invocation.

### 4.7 Two parsers, and the file that forbids exactly this (MED, HIGH)

`research/qc/tailfmt.js`'s own banner says it is

> "Shared by `qc/embed.js` (writes tails), `qc/tails.js` (re-runs and compares)
> and `qc/checks.js` (the static checks). One parser, so the writer and the
> checker cannot drift apart — which is the same class of defect this whole
> framework exists to catch, and it would be embarrassing to build it in here."

`research/qc/tails.js` requires only `fs`, `path` and `child_process`. It does
**not** require `./tailfmt`. It defines its own `outputBlock`, its own
`figures` and its own `recordedInvocation`.

They already disagree. Of the 50 tails `tailfmt` cannot read, **`tails.js` reads
29 of them** — its `outputBlock` starts immediately after the OUTPUT title and
never computes a header terminator, so the "no rule under the title" cause does
not bite it. The remaining 21 are blind to both, because `tails.js` also keeps
only `//` lines.

(That 29/21 is the same 50 as §4.1's 27/23, split by *parser behaviour* rather
than by *structural cause*. The two splits differ by two files —
`natal-cap-34` and `natal-cap-37` — whose `/* … */` bodies sit under a few `//`
provenance lines, so `tails.js` sees those lines and nothing else. Which is how
the ranking came to score those two files on their provenance notes alone.)

So the dynamic checker and the static checker are looking at different text on
29 files, and the file asserting that this cannot happen is the file it happens
in. Worth fixing at the same time as §4.1, and worth fixing by deletion —
`tails.js` should import `tailfmt`.

## 5. Files changed

Four tails bound. No code changed, no `.md` edited outside this report, and
**this work issued no commit and no push**. (Three commits by other agents of
the same wave landed in this repository between 22:17 and 22:34 and swept these
four files and this report into `HEAD` as a side effect. Recorded here because
a later reader will see them in the log against work that did not commit.)

| file | invocation now recorded in the tail | lines | elapsed |
|---|---|---|---|
| `research/natal-cap-35-x-multiplicity.js` | `node research/natal-cap-35-x-multiplicity.js` | 237 | 79.4 s |
| `research/a3-04-maxsum-recursion.js` | `node research/a3-04-maxsum-recursion.js --t29` | 251 | 72.3 s |
| `research/attack-beta2-05-covering-prune.js` | `node research/attack-beta2-05-covering-prune.js --full` | 114 | 27.9 s |
| `research/attack2-05-07-integral-ladder.js` | `node research/attack2-05-07-integral-ladder.js` | 78 | 0.5 s |

`--force` used once, on the last of these, with the replaced block quoted in
full at §4.6.

## 6. What to do next, cheapest first

1. **Fix `outputText()`** to keep every body line and strip `//` only where
   present, and bound `headerEnd`'s search to a few lines below the OUTPUT
   title. Both are one-line changes; both were verified here against all 149
   scripts. The migration counter should then read 106 and only fall.
2. **Re-run `readings-not-traceable`** after that fix and read the new top of
   the ranking. `natal-cap-34` at 128 of 201 is the file to open first.
3. **Make `qc/tails.js` import `tailfmt`** rather than re-implement it (§4.7).
4. **Make the guard fire when the existing body is empty but the block region is
   not** — the one case it is blind to, and the case where the most expensive
   tails live.
5. **Teach `embed.js` several invocations under one fingerprint**, or the nine
   Group-B tails stay legacy permanently.
6. **Copy `~/Files/primeoire-runs/` somewhere else.** The at41 shard JSONs are
   the only independent handle on S(41), the corpus's most load-bearing
   single-witness number.
7. **Adopt `level-ledger-tight.js`'s convention** (§4.5): a constant printed into
   an output block carries the invocation that measured it, on the same line.
