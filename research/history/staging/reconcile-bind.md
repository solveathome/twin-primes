# Reconcile-and-bind wave — ledger (2026-08-20)

<!-- ledger
id: Q-reconcile-bind
status: ANSWERED
todo: none
question: Can the unbound script tails be reconciled against their code and then bound by embed.js?
verdict: Six producers came back CLEAN-BOUND and one REBOUND with two documented label supersessions and identical results; nothing was DEFERRED and nothing DRIFTED outside the one pre-registered band move, fdecay-band-01's point 35.5 to 33.9 and band [30.8, 42.9] to [29.6, 38.3].
-->

Agent: reconcile-bind wave, branch opus-try. Rule: reconcile FIRST, then bind
with `node research/qc/embed.js`; never silently change a number. A DRIFTED
item gets its old→new recorded here and is NOT bound.

Initial survey (before any write):
- `research/exponent-control.js` — carries a `/* REAL OUTPUT, pasted */`
  C-comment block, lines 283–648. NOT a recognized `// OUTPUT` banner, so
  embed.js would silently no-op; needs banner conversion after reconcile.
- `research/origin-excess.js` — NO output tail at all (ends in code).
- `research/maier-matrix.js` — NO output tail at all (ends in code).
- `research/maxgap-law.js` — NO output tail (task item 4: add banners).
- `research/two-class-lower-bounds.js` — producer EXISTS, no output tail.
- `research/natal-cap-27-t4-at13.js` — the known gate finding
  (tail-does-not-belong-to-this-code, embedded 2026-08-19). Rebind LAST,
  detached, `--timeout 7200`.
- `research/fdecay-band-01.js` — to be built (f-decays L band on the
  corrected census; old band was fitted on the `<<` mod-32 aliased census).

Baseline gate: `node research/qc.js` TOTAL 1 — exactly the natal-cap-27
embeds finding. Advisory: 3 hand-pasted tails (discrepancy-two-class,
natal-cap-27, uframe-repro-02-maxgap-forensics), 150 readings-not-traceable.

## Items

| # | item | status |
|---|---|---|
| 1 | exponent-control.js | CLEAN-BOUND |
| 2a | origin-excess.js | CLEAN-BOUND |
| 2b | maier-matrix.js | CLEAN-BOUND |
| 3 | two-class-lower-bounds.js | CLEAN-BOUND (verify note in log) |
| 4 | maxgap-law.js | CLEAN-BOUND |
| 5 | natal-cap-27-t4-at13.js (rebind, detached, last) | REBOUND — gate finding cleared; two documented label supersessions |
| 6 | fdecay-band-01.js (new producer; band may MOVE) | BUILT + BOUND — band MOVED, see log |

## Item log

(updated as each item resolves)

### Item 1 — exponent-control.js: CLEAN-BOUND (2026-08-20)
- Fresh run (0.04 s, 241 stdout lines, empty stderr) matches the legacy
  `/* REAL OUTPUT, pasted */` block DIGIT FOR DIGIT (diff over
  whitespace-normalized lines: zero differences in the output section).
- The block was a C-comment, not a `// OUTPUT` banner, so embed.js would have
  been a silent no-op. Converted both blocks to the house `//` format
  (content unchanged), then bound with `node research/qc/embed.js
  research/exponent-control.js`. NO --force needed — the legacy-tail guard
  passed (every old figure reproduced).
- Fingerprint: code-sha256 ab68087b84ccd382…, out-sha256 97e682b3ea8c9926…;
  `--check` passes both.
- The 1.54/1.57 pair: fresh output prints 1.540, 1.549, 1.578 exactly as the
  corpus cites. 22 READINGS figures are not verbatim in the output — all
  prose arithmetic/rounding over printed values (1.239 = printed 1.2388,
  0.191 = 1.191 − 1, etc.), the known readings-not-traceable advisory floor;
  identical before and after the bind.

### Item 2b — maier-matrix.js: CLEAN-BOUND (2026-08-20)
- No output tail existed in the .js (embed.js would have silently no-opped).
  Fresh run 5.7 s, 174 lines, empty stderr.
- Reconcile: 112 distinct figures in `maier-matrix.md`; 103 verbatim in the
  fresh output. The 9 others (0.79303/0.79305/0.79475/0.79668/0.79863/0.79922,
  0.9343, 1.0043, 3.53) are all cross-citations the md itself attributes to
  `origin-excess.md` §§3-5 — verified verbatim in the fresh origin-excess run.
- Appended a house OUTPUT banner, bound with
  `node research/qc/embed.js --node-flag --max-old-space-size=6144
  research/maier-matrix.js` (the G2-STATE §10 documented invocation).
  Embedded body diffed identical to the reconciled scratchpad run.
  code-sha256 bd658d02a33ef9e9…, out-sha256 24ef9939be097823…; --check passes.

### Item 2a — origin-excess.js: CLEAN-BOUND (2026-08-20)
- No output tail existed in the .js. Fresh run 12.7 s under
  `--max-old-space-size=6144` (the script's own documented Run line);
  1984 stdout lines, 46 stderr progress lines.
- Reconcile: 454 distinct figures in `origin-excess.md`; 435 verbatim in
  stdout. The 19 others all classified as prose arithmetic/rounding over
  printed values, each verified by hand: 0.7948/0.7967 etc. are 4-dp
  roundings of the printed 0.79475/0.79668; the 1.1028…1.1319 sequence is
  the printed ratio columns divided (0.89766/0.79305 = 1.1319 etc.); the
  1.448…1.472 sequence is ln x*/ln y over the printed x* column
  (ln 359/ln 61 = 1.431); the −0.45…−0.31 correlations are 2-dp roundings
  of printed cells (−0.4497, −0.4439, −0.3920, −0.3850, −0.3476, −0.3082,
  −0.3059); 0.05 is the pooled λ_q/fair_q means (printed 0.0485/0.0439/
  0.0754) rounded. NO drift; every figure has a source in the fresh run.
- Bound stdout-only (every document figure lives on stdout; stderr is
  progress). Two runs identical modulo trailing whitespace and elapsed-time
  lines. code-sha256 f5596d519e20e7ed…, out-sha256 a8ec23862435607a…;
  --check passes.

### Item 4 — maxgap-law.js: CLEAN-BOUND (2026-08-20)
- No output tail existed. Fresh run of the documented headline invocation
  `node --max-old-space-size=8192 research/maxgap-law.js --big` (149 s idle
  in G2-STATE §10; 149 s here): 671 stdout lines, empty stderr.
- Reconcile: 371 distinct figures in `maxgap-law.md`; 366 verbatim in the
  fresh output. The 5 others: 1412.5029 is an arXiv identifier, not a
  figure; 0.577/0.587 are 3-dp roundings of the printed 0.5768/0.5866;
  1.083 of the printed 1.0827; 1.14 of the printed 1.135 (same sentence's
  0.92 is the printed 0.919). NO drift.
- Appended the house OUTPUT banner, bound with
  `node research/qc/embed.js --timeout 1800 --node-flag
  --max-old-space-size=8192 research/maxgap-law.js -- --big`. Embedded body
  diffs against the reconciled run only in inline elapsed-time values.
  code-sha256 18e784b3dea5916c…, out-sha256 558343ee25e36783….

### Item 6 — fdecay-band-01.js: BUILT AND BOUND; the band MOVED (2026-08-20)
- New producer `research/fdecay-band-01.js` for the f-decays x = 1000 L band,
  answering f-decays.md's UNTRACED banner (mismatch adjudication #35: the
  quoted point 35.5 and band 30.8–42.9 had no script custody, and were fitted
  on the defective `<<` mod-32 aliased census).
- Data: parsed at runtime from the embedded OUTPUT of
  `fdecay-deep-01-census-defect.js` (out-sha256 4d932d02…), 42 levels, both
  the published (defective) and alias-free first-term columns. No residue
  bitmask anywhere in the new script — float log arithmetic only, d = 2016
  well under 2^53; the alias-free data source was itself verified at levels
  ≥ 37 where the alias fires.
- Four hard-failing internal checks all pass: d_min closed form 42/42;
  T,S recomputed from fdecay-deep-00-core worst |Δ| 4.94e-4 (printed 3 dp);
  ln(1/f) column consistency worst |Δ| 5.02e-5; full-range OLS refits
  reproduce the embedded fdecay-deep-01 coefficients to |Δ| ≤ 8.7e-4.
- Control (old side reproduces): the a3-03 full-f law as quoted gives
  f = 2.28e-12, ln(1/f) = 26.81, L = 35.7 (document: 2.3e-12, 26.8, 35.5);
  the same half-refit method on the published first-term points gives point
  35.9, band [29.8, 43.1], bracketing the quoted [30.8, 42.9].
- **THE BAND, OLD → NEW: point 35.5 → 33.9; band [30.8, 42.9] → [29.6, 38.3]**
  (corrected alias-free points, same method: comb form ln(1/f) = a + b·T −
  c·S on full/lower-21/upper-21, evaluated at x = 1000, L = θ(1000)/ln(1/f)).
  Down and narrower: the correction makes f smaller at depth, so L falls and
  the top of the band falls hardest (43.1 → 38.3). Same direction as
  fdecay-deep's crossings. The polylog branch call HOLDS on every
  specification, old and corrected, under ln²x = 47.72, with the worst-case
  margin improving from ~10% to ~20%.
- Bound: code-sha256 06ead1c9567d0cc0…, out-sha256 b8a558c588d745b1…;
  READINGS written after the embed; --check passes.
- NOT done (by instruction): no edit to f-decays.md's header or any existing
  document — the UNTRACED banner and the old numbers stand in the live layer
  until the orchestrator lands the correction.

### Item 3 — two-class-lower-bounds.js: CLEAN-BOUND (2026-08-20)
- No output tail existed. Fresh default run (`node
  research/two-class-lower-bounds.js`, the md's documented invocation;
  537 s CPU under the parallel wave's load, docs say ~3 s idle at G2-STATE
  §10 vs "§1 custody + ladder to 229" at the md — that pre-existing doc
  discrepancy was not touched): 257 lines, empty stderr.
- Reconcile: headline figures all reproduce — c1 mean 0.3718 (corpus
  quotes 0.372), c2 0.8511 (0.851), the repaired Y2 ladder row
  1,5,11,29,41,65,107,149,203,257,347,527,545,611 (md §ladder line 503
  verbatim), band 476–633 central 513, G2(41#) = 546. The corpus's TWO c2'
  values are both consistent: 0.4814 is deliberately retained as the
  historical n=8 x∈[11,37] value inside the prediction narrative
  (maxgap-law.md 66-67, G2-STATE 305/360), 0.4983 is the current full value
  and the fresh run prints it with identical sd 0.0369 / cv 7.4% / range
  [0.4463, 0.5939] (two-class-lower-bounds.md 775, G2-STATE 855). One
  pre-existing prose miscount noted, NOT introduced here and no doc edited:
  md says "20" terms where the script prints n=18; identical mean/sd/range
  pins both to the same data.
- Bound: code-sha256 726e5a4bef8f8241…, out-sha256 a429ad391ce9b946…
  (546 s embed re-run). Body diffs against the reconciled run ONLY in the
  ladder table's per-row wall-clock column — headed literally `secs`, values
  printed bare ("12.2") — which tailfmt VOLATILE does NOT scrub (it scrubs
  unit-suffixed forms and the JSON `"secs":` key form, not a bare table
  column). CONFIRMED: `embed.js --check` re-run reports code-sha256 matches,
  out-sha256 DIFFERS, on exactly that column. This is the known "printed
  figure IS a wall clock" class (tailfmt.js comment, 2026-08-20): the tail
  is a true record of its run but can never go re-verify green until either
  the script prints the column with a unit or VOLATILE learns the bare
  `secs`-column shape. All mathematical figures identical between runs.
  Flagged for the orchestrator rather than patched: code edits to producers
  are outside this wave's write scope.

### Item 5 — natal-cap-27-t4-at13.js: rebind launched (2026-08-20)
- The gate finding is understood: commit 4a9037f (2026-08-20, mismatch
  adjudication B) replaced two WRONG hardcoded binomial labels with computed
  ones and deferred the rebind to a quiet machine. EXPECTED old→new in the
  tail, sanctioned and documented in that commit: C(990,3) label
  160,940,540 → 161,226,780; C(990,6) label 1.1e15 → 1.3e15
  (1.287912126756255e15). C(990,4) = 39,782,707,965 was correct and stays.
  Neither label feeds any computation; T2/T3/T4/µ4 and the P(S=0) theorem
  numbers are expected UNCHANGED.
- Launched detached: `nohup node research/qc/embed.js --streams both
  --timeout 7200 research/natal-cap-27-t4-at13.js` (the tail's recorded
  invocation and streams mode). Load at launch 5.64/10 cores; the job is
  exact deterministic summation on 8 workers, so contention affects wall
  time only. If it cannot finish, this item flips to DEFERRED and the
  embeds finding remains.

### Item 5 — natal-cap-27-t4-at13.js: REBOUND, gate finding cleared (2026-08-20)
- The detached rebind completed in 1409.8 s (8 workers, launched at load
  5.64; a mid-run load spike to 88 stretched nothing that matters — the
  computation is exact deterministic summation).
- Old-vs-new tail diff, normalized, verified line by line. EXACTLY as
  pre-registered from commit 4a9037f:
  - `C(990,3) = 160,940,540` → `161,226,780` (label on T3's term count)
  - `C(990,6) = 1.1e15` → `1.3e+15` (label in the NEXT line)
  - progress-percentage snapshots and wall-clock text (run-varying)
  - EVERYTHING ELSE IDENTICAL, including T2 = 46186.769663306746,
    T3 = 4662945.6578926444, T4 = 352253669.87624449, µ4 = 24407.37,
    kurtosis 2.9999, and the theorem P(S=0) ≤ 1.898e-6.
- No working document quotes either superseded label (corpus-wide grep:
  zero hits outside the script itself), so the supersession is contained.
- The tail's readings already carried the CORRECT values (the 2026-08-20
  adjudication put a "FIXED, AWAITING RE-EMBED" banner there); that banner
  and the one present-tense adjudication passage were updated to record the
  completed rebind. New fingerprint: code-sha256 188dc7bab66079aa…,
  out-sha256 68f313a0205533a0… (streams stdout+stderr).
- `node research/qc.js embeds`: 0 findings — the wave's one pre-existing
  gate finding is cleared.

## Closing gate (2026-08-20)

- `node research/qc.js`: TOTAL 1 — the single finding is `uncited-script
  research/attack-advmin-1113.js`, an untracked file another live agent of
  the parallel wave is still writing; none of this wave's files are flagged.
  embeds 0 (was 1 at baseline).
- `node research/qc/selftest.js`: all 24 positives fire, 14 controls silent.
- `node research/audit-numbers.js`: 242/242 checks passed (210.4 s).
- Advisory tier: natal-cap-27 left the hand-pasted-tail list. The list now
  reads natal-cap-33-overnight, natal-cap-34-wrap-precision,
  natal-cap-37-at41-march (count 3) — its composition changed DURING this
  wave because other live agents were binding and adding tails concurrently
  (the baseline trio discrepancy-two-class / natal-cap-27 /
  uframe-repro-02-maxgap-forensics no longer matches). None of the three
  remaining is in this wave's scope.

## Verdicts

| item | verdict |
|---|---|
| exponent-control.js | CLEAN-BOUND (pasted block reproduced digit for digit) |
| origin-excess.js | CLEAN-BOUND (435/454 md figures verbatim, 19 classified prose arithmetic) |
| maier-matrix.js | CLEAN-BOUND (103/112 verbatim, 9 owned by origin-excess, verified there) |
| two-class-lower-bounds.js | CLEAN-BOUND (bare `secs` column makes --check amber forever; flagged) |
| maxgap-law.js | CLEAN-BOUND (--big invocation; 366/371 verbatim, rest roundings + one arXiv id) |
| natal-cap-27-t4-at13.js | REBOUND (two documented label supersessions, all results identical) |
| fdecay-band-01.js | NEW PRODUCER; band MOVED: point 35.5 → 33.9, band [30.8, 42.9] → [29.6, 38.3] |

Nothing was DEFERRED and nothing DRIFTED outside the one pre-registered,
commit-documented supersession of item 5. No corpus document was edited.
