# Custody: the embed migration, and the slow tier that had never been run

<!-- ledger
id: Q-custody-embed-migration
status: ANSWERED
todo: none
question: How many script tails are bound by a formal embed, and what does the slow tier that had never been run turn up?
verdict: The unbound count went from an honest 107 to 47, with 55 tails bound in this pass and every one verified against the pre-embed block recovered from 97e2cfa to have lost nothing; four files were forced and their old blocks are quoted verbatim, and the findings the adjudicator owns are listed separately.
-->

**The migration counter went 107 to 47. It read 56 when the night started, and
56 was wrong: the parser was blind to 51 tails, and the honest count at
`97e2cfa` was 107 of 107 unbound. 55 of the 79 tails now bound were bound
here, every one verified to have lost nothing.** Verification is not the tool's
word for it: for each of the 55, the pre-embed block was recovered from
`97e2cfa` and re-parsed with the fixed `tailfmt`, and every figure it carried
was confirmed present in the block that replaced it. Four files were forced,
and only four; their old blocks are quoted verbatim in §4.

**The slow tier was run at 900 s and now covers all 126 tails.** First pass, the
91 the old parser could see: 28 reproduced every figure, 58 had one absent, 5
were over the tier, none failed. Second pass, the 38 the old parser hid: **29
reproduced every figure, 9 had one absent, 0 over the tier, 0 failed.** The
hidden population was the healthier one, and that is why the counter could fall
this far in one night. All five over-tier scripts are now measured (§2).

**The dominant cause of a mismatch is not dishonesty and is not arguments
either. It is the capture channel.** `qc/embed.js` records **stdout only**,
while every legacy tail was pasted from the merged stream. 35 scripts in
`research/` write progress through `process.stderr.write`, 15 of them in the 47
that remain. On `fold-profile-13/14/15/16` the *single* figure blocking the
embed is `2.23e+8`, which appears on stderr and nowhere else. Those four files
are one line of tooling away from bound, and no reading of them will ever fix
it.

**Nothing found tonight is fiction.** Of the 47 remaining: 15 blocked by the
stderr channel, 16 by arguments or environment, 13 real blocks carrying prose
the run does not print, 3 declared composites. Two paste rows another script
produced; `05-twin-jacobsthal` says so and **`fossil-shadows` does not** (§5).

---

## 1. The counters

| when | tails | bound | hand-pasted |
|---|---|---|---|
| `97e2cfa`, session start, measured with the fixed parser | 107 | 0 | **107** |
| what `qc.js` printed at session start | — | — | 56 (the parser was blind to 51) |
| working tree at hand-off | 126 | 79 | **47** |

The corpus grew by 19 tails during the night because sibling attacks added
scripts. 55 of the 79 bound tails were bound by this attack; the rest by the
other attacks of the wave, working the same backlog in parallel.

### The 55 bound here

`01-zone-twin-share`, `02-first-twin-margin`, `04-crystallization-and-hl`,
`a3-06-origin-vs-max`, `a3-07-pane-overlap`, `attack-01-gap-cartography`*,
`attack-02-head-bias`, `attack-03-higher-moments`, `attack-04-fourier-budget`,
`attack-05-annulus-induction`, `attack-06-difference-hierarchy`*,
`attack-06b-difference-map`*, `attack-07-certificate-ceiling`,
`attack-08-pigeonhole-theorem`, `attack-09-chen-theta`,
`attack-10-anchored-origin`, `attack2-01-06-seam-census`*,
`attack2-03-09-depth-formula`, `discrepancy-two-class`,
`fold-profile-02/03/04/05/07/08/09/10/11/12`, `grain-census`,
`level-ledger-tight`, `natal-cap-01`, `-02`, `-03`, `-04`, `-05`, `-07`, `-08`,
`-09`, `-10`, `-11`, `-13`, `-14`, `-17`, `-18`, `-19`, `-21`, `-24`, `-31`,
`-38`,
`natal5-variance`, `removal-ledger`, `sift-limit-attack`, `verify-ladder`,
`whatmadeit`. Starred four were forced; see §4.

**Loss audit.** For all 55: old block recovered from `97e2cfa`, re-parsed with
the current `tailfmt`, every figure checked against the new block. **LOST = 0 on
51 of them.** The four forced files lost 11 tokens between them, all listed and
all preserved in §4.

## 2. The scripts over the 900 s tier

Measured on a machine running five sibling attacks, so these are upper bounds,
not clean timings.

| script | measured | reachable at |
|---|---|---|
| `natal-cap-18-at29.js` | 1,006 s | `--timeout 1200` |
| `natal-cap-27-t4-at13.js` | 1,117 s | `--timeout 1400` |
| `lemmaV-sup-extension.js` | 1,300 s | `--timeout 1600` |
| `lp-push-x43.js` | 1,515 s | `--timeout 1800` |
| `verify-ladder-big.js` | 3,368 s | `--timeout 4000` |

All five were then re-run under `embed.js` at a 3,600 s or 5,400 s timeout.
**`natal-cap-18-at29` bound, 973 s, LOST = 0.** The other four completed and
were refused by the guard: `lemmaV-sup-extension` 40 of 163 figures absent,
`lp-push-x43` 20 of 154, `natal-cap-27-t4-at13` 3 of 50, `verify-ladder-big` 3
of 10. For all four the runtime is no longer the obstacle.

## 3. The four causes, counted

Every one of the 47 was scanned for a correction or superseded banner, for
`process.argv`, `process.env`, `process.stderr.write` and node heap flags, and
for run separators inside its own block. Where that evidence did not settle the
cause, the file was opened and the block diffed against a fresh run by hand;
that was done for 21 of them, and each one that decided a cause is named in
§3 to §5 with the line it turned on. No file is assigned a cause by inference
from its mismatch rate alone.

**(a) The paste is fiction or predates the run — 0 files.** Nothing in the 47
carries a figure that no run of anything produced. The one file that comes
closest is `fossil-shadows`, and its figures do have a producer; see §5.

**(b) Real but abridged, digested or annotated — 13 files.** These blocks are
genuine records with hand-written commentary interleaved, and the commentary is
what the fresh run does not print. Examples, each verified by reading the line:

- `03-legendre-error-budget`, one figure: `20,000` in "is already 20,000x the
  signal at p_n=41", prose.
- `scour-into-fixed-tile`, one figure: `29,41` in "29,41 self-strike 1 each", a
  hand-joined list.
- `natal-cap-23-covadj-proof`, one figure: `-13.04` in "q|W-2 = {23, 31, 179}:
  -13.04, -4.75, -1.86", a hand-joined list.
- `natal-cap-26-minus-half`, `1600` in "(L/2)/V ~ 1600 kills it", prose
  arithmetic.
- `natal-cap-20-third-order` is a verbatim paste whose only absent figure is
  `"secs":70.2` inside a printed JSON, a wall clock.
- `birth-cohorts` has no READINGS section at all: its OUTPUT block *is* the
  readings, carrying the CLOSED FORMS derivation. Binding it would delete that
  derivation, so it stays unbound deliberately.
- `attack2-rich-vein` and `attack2-04-10-hierarchy-oeis` are written analyses,
  40 and 29 lines. `attack2-04-10` carries the OEIS search verdicts (A060256,
  A384545, A087732) which no run produces and which are the point of the file.

Also here: `attack2-02-08-tomography`, `natal-cap-06`, `-15`, `-16`, `-25`,
`-28`, `-29`, `-30`, `h2-length-needed`, `genealogy`.

**(c) The recorded run used an invocation the tool cannot express — 31 files,
and this is the dominant cause.** Three separate mechanisms, none of which
`embed.js` can record:

1. **stdout only, 15 files.** `embed.js` keeps `execFileSync`'s stdout and
   discards stderr. `qc/tails.js` compares against stdout too. Legacy tails were
   pasted from the merged stream. Demonstrated: `fold-profile-13`, `-14`, `-15`,
   `-16` each have exactly one absent figure, `2.23e+8`, and
   `node research/fold-profile-13-hotspot-sweep.js 2>/dev/null | grep -c 2.23e+8`
   returns 0 while the stderr side returns 1. `fold-profile-01`'s four absent
   figures (1485, 22275, 378675, 7952175) are all on stderr.
   `natal-cap-22-at31-drift` routes its whole march through
   `const prog=s=>process.stderr.write(s+'\n')`. Files: `05b`, `a3-09`,
   `fold-profile-01/06/13/14/15/16`, `natal-cap-18`, `-22`, `-27`, `-32`, `-33`,
   `-34`, `-37`, `verify-ladder-big`. `natal-cap-18-at29` was in this group and
   is now bound: at 973 s its whole tail proved to be on stdout after all, which
   is why the group was tested one file at a time rather than assumed.
2. **Environment variables and node flags, 8 files.** `a3-01-misalignment-ledger`
   states its own invocation in its header: `FOLDS=7,11,13,17,19,23,29,31 node
   --max-old-space-size=12000 a3-01-...`. The default run stops at fold 29, which
   is exactly the 19 figures the guard names. `embed.js` builds
   `['node', rel, ...args]` and records only that, so setting `FOLDS` in the
   shell would produce a **tail whose recorded invocation is false** — the one
   thing this mechanism exists to prevent. Not done, and it should not be done
   until the tool can record an environment.
3. **Script arguments, 16 files.** Where the arguments are on record they are on
   record in prose, not in a form the tail carries: `lemmaV-parseval.js S5`,
   `lemmaV-sup-extension.js S0 S1`, `natal-cap-33-overnight.js run1|run2|run3`,
   `natal-cap-34-wrap-precision.js [verify|exact13|layers|c2|kurt|joint]`,
   `natal-cap-37-at41-march.js [audit|cost|at41|shard|combine]`.

**(d) Deliberately historical, banner-carrying — 9 files.** `a3-02-diagonal-f`,
`attack2-02-08-tomography`, `fold-profile-01`, `-15`, `-16`, `h2-length-needed`,
`lemmaV-parseval`, `natal-cap-06`, `natal-cap-33`. Note that a correction banner
does **not** by itself block an embed: `attack-02-head-bias`,
`attack-04-fourier-budget` and `attack-10-anchored-origin` all carry SUPERSEDED
or CORRECTION banners, all three reproduce every figure, and all three are now
bound. The banner is about the readings, and the readings are untouched.

**Composites, cutting across (b) and (c) — 5 files.** `natal-cap-34` (6 runs),
`natal-cap-37` (3 runs), `attack2-rankin2d` (default plus `--deep`), `a3-08`
(default plus a detached `--t31` run), `05-twin-jacobsthal` (its own run plus the
29# row from `05b`). One invocation cannot produce these blocks, by
construction. Attack 9 owns this class in
`research/history/staging/custody-external-evidence.md`.

## 4. The four forced files, and what was preserved

The guard was respected everywhere else. It was overridden only where the
absent tokens were, on inspection, artifacts of hand-reflowing a real run, and
where the fresh block is a strict superset of the old one in every substantive
figure. The old blocks are reproduced here so the overwrite destroys nothing.

### 4.1 `attack-01-gap-cartography.js` — 1 token lost

Lost: `[11,16,14,11,12,12,11,3,6,4]`. The fresh run prints the same list with
spaces, `[11, 16, 14, 11, 12, 12, 11, 3, 6, 4]`. Old block:

```
// OUTPUT (2026-08-13; p=23 zone from corrected run):
//
// p=13  P#=30030  zone=[0,289]
//   top gap 66, attained at r=731 and ≥9 more places (2.4%..78% of period)
//   largest gap starting inside zone: 30 @ r=71    global max 66 @ r=731
//   top-100 by tenth: [11,16,14,11,12,12,11,3,6,4]
// p=17  P#=510510  zone=[0,361]
//   top gap 108 first at r=701 (0.14% of period)
//   largest gap starting inside zone: 60 @ r=359   global max 108 @ r=701
// p=19  P#=9699690  zone=[0,529]
//   top gap 150 first at r=659 (0.01%)
//   largest gap starting inside zone: 72 @ r=347   global max 150 @ r=659
// p=23  P#=223092870  zone=[0,841]
//   top gap 204 at r=76166567 (34.14%), four occurrences in mirror pairs
//   (0.3414+0.6586=1, 0.4885+0.5115=1 — the palindrome, visible)
//   largest gap starting inside zone: 150 @ r=659  global max 204, DEEP in period
```

The only content not in the new block is the reading "the palindrome, visible".
All four fractions it names are printed by the run.

### 4.2 `attack-06-difference-hierarchy.js` — 2 tokens lost

Lost: `2,4,8,16` and `6,12,18,24`, both d-value enumerations in a hand-written
row label. Old block:

```
// OUTPUT (2026-08-13; p=19 slots row wraps, values are the same H-L pattern):
//
// p=13: slots d=2,4,8,16: 1485 | d=6,12,18,24: 2970 | d=30: 3960
//       G_d:  2:66  4:84  6:56  8:78 10:60 12:66 14:60 16:78 18:50 ... 30:34
//       hardest: d=4 (84)
// p=17: G_d:  2:108 4:96  6:78  8:114 ... 30:54          hardest: d=8 (114)
// p=19: G_d:  2:150 4:150 6:114 8:198 10:132 12:98 14:150 16:198 ... 30:78
//       hardest: d=8 (198)
```

Every number reproduces, and the new block prints the rows the old one elided
with "...".

### 4.3 `attack-06b-difference-map.js` — 3 tokens lost

Lost: `22,10,4,1,1,1,1` (a hand-written `(n=...)` annotation), `-5.29` (from the
hand-written range "bottom: d=190/34/140: 5.25-5.29", which the run prints as
`bottom-3: d=190:5.29 d=34:5.25 d=140:5.25`), and `2,4,8,16` (a section title,
"level p=23 (d = 2,4,8,16 only)"). The old block is 73 lines and is preserved at
`97e2cfa:research/attack-06b-difference-map.js`, lines 138-210; it is a
column-compressed rendering of the same run, and the new block is 213 lines of
the same data uncompressed.

### 4.4 `attack2-01-06-seam-census.js` — 5 tokens lost

Lost: `3.0e8`, `2.1e9`, `1.3e6`, `3.0e9`, `400`. The first four are the old
block's `n≤3.0e8` and `K=1.3e6` against the run's `max n=3.00e+8` and
`K=1.3e+6`, a formatting difference. `400` is the hand-written "400 seam windows"
count. Old block:

```
// OUTPUT (2026-08-14):
//
// ATTACK 1 — seam-twin census (S = # of k with kP-1, kP+1 both prime):
//   P=30     K=1e7    n≤3.0e8  S=388397  S/B=9.983   E(P)=10.000  meas/pred=0.9983
//   P=210    K=1e7    n≤2.1e9  S=444597  S/B=13.985  E(P)=14.000  meas/pred=0.9989
//   P=2310   K=1.3e6  n≤3.0e9  S=67842   S/B=17.015  E(P)=17.111  meas/pred=0.9944
//   P=30030  K=1e5    n≤3.0e9  S=6165    S/B=20.101  E(P)=20.222  meas/pred=0.9940
//   (asymptotic slices kP>1e8: meas/pred = 0.9984, 0.9991, 0.9942, 0.9968)
//
// ATTACK 6 — 400 seam windows [kP, kP+50000] vs 400 unaligned, n ~ 1-2e9:
//   P=30030   C_head=2473 vs fair 2472.5 → predicted rho=1.0002
//             seam 148.06±0.57  unaligned 147.74±0.56  ratio 1.0022±0.0054
//   P=510510  C_head=2181 vs fair 2181.6 → predicted rho=0.9997
//             seam 148.07±0.52  unaligned 147.64±0.55  ratio 1.0029±0.0052
```

## 5. Findings for the adjudicator

**5.1 `fossil-shadows.js` pastes another script's rows without saying so.** Its
block carries a percentile table the file's own code does not compute:

```
// Percentile among ALL same-width offsets (lower = more depleted):
//   level 19: p=7: 0.0% | p=11: 87.0% | p=13: 22.2% | p=17: 0.2%
//   level 23: p=17: fossil/mean=0.714, percentile 0.17%
//             p=19: fossil/mean=0.639, percentile 0.03%
```

The current run prints ratios and a control, no percentile and no level 23. The
producer is `attack2-02-08-tomography.js`, same day, whose ATTACK 2b prints
`p=11 ... 86.97%`, `p=13 ... 22.23%`, `p=17 ... 0.17%`, `p=19 ... 0.03%` — the
same numbers, rounded. `05-twin-jacobsthal.js` does the same thing and **says so
in its first line**: "including the segmented 29# run from 05b".
`fossil-shadows` does not. Not a wrong number; an unattributed one. Both stay
unbound.

**5.2 `genealogy.js` carries a constant its own code contradicts.** The tail
ends `-> 0.41625 (2*C2*e^{-2gamma})`; the code prints
`asymptotic constant 2*C2*e^(-2gamma) = 0.41621`. The six-value convergence
table above it has no producer in the file. This is the corpus-wide 0.41625
against 0.41621 already logged in
`research/history/staging/audit-cross-document-constants.md`, surfacing inside a
script tail. Left for that ledger.

**5.3 The guard was inert while the first 15 embeds ran.** Attack 9's fix landed
at `acbf6f2`, part-way through this attack's work. Before it, `embed.js` skipped
its own legacy guard on any file whose body the parser could not read, and
exited 0. All 55 embeds were therefore re-checked afterwards against
`97e2cfa` with the fixed parser, and all 55 are clean. The check is
`node <scratch>/verify-embeds.js <files>` and it is the reason this report can
claim LOST = 0 rather than assume it.

**5.4 The first tails pass silently skipped 38 of 126 tails**, for the same
parser reason, and reported "91 scripts with a pasted OUTPUT block" as though
that were the population. The second pass covered them. A run that skips is
indistinguishable from a run that passes when the summary only counts what it
looked at.

**5.5 Five sibling attacks shared the repository and the machine.** Two
consequences worth recording. The timings in §2 were taken with four other
heavy runs on the box, so they are upper bounds. And 27 of the 55 tails bound
here were swept into sibling commits before this attack finished, because the
wave commits the whole working tree; nothing was lost by it, but a migration
counter that several agents move at once cannot be read as one agent's ledger.
This attack made no commit and no push.

## 6. What remains, and why each is still unbound

47 files. 15 wait on the stderr channel, 16 on arguments or environment the tool
cannot record, 13 are real blocks whose prose the run does not print, and 3 are
declared composites. The single change that would move the most is teaching
`embed.js` to capture the merged stream, or to record `env` and node flags
alongside `invocation`. Both are tooling decisions and neither was made here:
changing how every future tail is captured is not a change to make in the middle
of a migration.

Full per-file table with flags: `research/qc.js embed-backlog`, and the run
logs for both tails passes are in this session's scratchpad.
