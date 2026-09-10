# Gate-repair finale — the verify-the-verifier repairs land (2026-08-20)

<!-- ledger
id: Q-gate-repair
status: ANSWERED
todo: none
question: Were the verify-the-verifier repairs landed with the gate ending fully green?
verdict: COMPLETE: node research/qc.js --full reads FULL GATE PASSED at the close, TOTAL 0 across the 11 checks, selftest 39 known positives firing and 32 controls silent, audit-numbers 246/246, and no bound tail left amber.
-->

Agent: gate-repair finale implementer, branch opus-try. Authorities: the three
committed verify-the-verifier reports (`verify-the-verifier-checks.md`,
`verify-the-verifier-numbers.md`, `verify-the-verifier-embeds.md`). Discipline:
repair → selftest fixture → gate green → next; the gate must end at FULL green
(`node research/qc.js --full`, TOTAL 0), and no bound tail is invalidated —
where a normalisation change moves a recorded hash, the affected tail is
re-embedded with its recorded invocation, never left amber.

STATUS: COMPLETE, 2026-08-20. `node research/qc.js --full` reads FULL GATE
PASSED at the close: TOTAL 0 across the 11 checks, selftest 39 known positives
firing and 32 controls silent, audit-numbers 246/246.

## Baseline (before any edit)

- `node research/qc.js`: TOTAL 0 (11 checks). Advisory: 161
  readings-not-traceable, 3 hand-pasted-tail (natal-cap-33-overnight,
  natal-cap-34-wrap-precision, natal-cap-37-at41-march — the three declared
  composites).
- `node research/qc/selftest.js`: 24 known positives fire, 14 controls silent,
  plus 6 tailfmt normalisation cases.
- `research/audit-numbers.js`: 243 checks (per the reconcile-bind ledger's
  closing gate it read 242; section X’s A048670 extension added one on
  2026-08-20 — the exact count is re-measured at this pass's close).
- One untracked file from a concurrent reader agent:
  `research/history/staging/redteam-0820-structural.md`. Not touched.

## Batch plan

| batch | contents | status |
|---|---|---|
| A | tailfmt: OUT_HEAD tighten, writer/reader closing-rule clash, min-rule lookahead ("24.9 min wall"), Q6 secs-column widening, tokenizer false positives (hyphen-range, OEIS/DOI ids, exponent variants), raw body reader for the static out-sha check | DONE |
| B | embed.js: static body verdict on --check, loud no-banner failure, --force stamp, inputs hashes, --check by recorded invocation, argv scope past `--`, env/node comparison, re-embed of a bound tail requires --force | DONE |
| C | checks.js: embeds body-vs-out-sha (B1), binding-lost, no-output-block advisory count; refs whole-§ labels + section-into-unsectioned + fenced-example skip (B2/M26); adjudicated-pair-vanished (B3); quotes contiguity tier (B4); per-§ sourcing advisory (B5); calibration marker synonyms (B6); crosslinks real pointers (B7); absence-stale review dates (B8); paragraphIndex char class (B9); search-convention row scoping stated (B10); provenance mixed-provenance (B11); tails.js recorded-invocation parse | DONE |
| D | migration/re-embeds forced by the normalisation change + acceptance tests | DONE (two-class --check verification in flight) |
| E | multi-tail composite support (locateAll, embed --tail, embeds awareness, fixtures) | DONE (mechanism + fixtures; the 3 composites themselves not restructured — see below) |
| F | audit-numbers: 6 echo→first-principles, new checks, tautology deletions, W1 phase-max | DONE (full-run verification in flight) |
| G | mutation suite rebuilt from checks report §2/§6, re-run against the repaired gate; detection rate measured | DONE |

## Batch records

### A — tailfmt (the parser and the normalize rules)

- `OUT_HEAD` tightened to `/^\s*\/\/\s*OUTPUT\s*(?:$|[—\-(])/`. Surveyed every
  banner first: zero real banners move; the one prose line the loose form
  matched (`h2-length-needed.js:27`) is excluded. The 1c42a16 wrap-steal shape
  (`//   OUTPUT, which is a cross-check …`) can no longer capture a banner.
- The min-rule's lookahead now lets `wall` through: `24.9 min wall` scrubs,
  `2 min(j` and the aligned-column `6   min` stay data.
- Q6 implemented as settled (CHANGELOG 2026-08-20, "WIDEN the volatile list,
  timing-only"): a bare number under a table column literally headed `secs`
  (last header token) scrubs, scope ending at the first non-row line. The
  two-class ladder and import-stein §C3 shapes; a data table below a secs
  table is untouched (fixture).
- Tokenizer classes closed in `figures()`/`presentIn()`: identifier digits
  (A048670, arXiv ids, DOI paths yield no token), hyphen-ranges (`1.54-2.27`
  never yields `-2.27`; a real `= -2.271` keeps its sign), exponent spellings
  (`3.0e8` matches `3.0e+08`). The readings advisory fell 161 → 156 on the
  spot.
- New readers for the static custody check: `outputTextRaw` (rules KEPT — 62
  bound bodies contain real rule lines), `outputBodyCandidates` (the legacy
  printed-READINGS ambiguity), `bodyMatchesRecorded` (the one-line static
  verdict), and a `body-lines:` fingerprint field that ends the READINGS-scan
  guessing for every new bind.
- The perfold discovery: `attack-perfold-01/02` PRINT their readings on
  stdout, so the reader truncated their bound bodies at the printed READINGS
  line — 2 honest tails reading as unverifiable. Candidate parsing +
  `body-lines` stamps fixed both without re-running anything.

### B — embed.js (all nine ranked repairs)

1. `--check` now prints FOUR verdicts: code (static), body (static, against
   the block's own bytes), inputs (static), run. The forged-tail demonstration
   of the embeds report §1.4 now fails at `body` with nothing executed.
2. No banner: loud on BOTH streams, own exit code 4; `embed-backlog` counts
   the population (27 scripts today, was invisible at 3-of-40).
3. `--force` stamps `forced: <date>, k of n figures in the replaced block not
   reproduced (first: …)` into the fingerprint. The two-class re-embed's stamp
   reads exactly the three wall-clock figures.
4. `inputs: path@sha12 …` recorded at bind for statically-resolvable
   `require`/`readFileSync` targets; `--check` compares them before running —
   the scratch dependency-edit demonstration now reads `input DIFFERS`.
5. `--check` re-runs the RECORDED invocation (env, node flags, args), warns
   when the caller's differs, scales its timeout from the recorded `elapsed`,
   and compares the recorded node version (warning). `qc/tails.js` gained the
   same authoritative-invocation parse (it used to re-run
   `node foo.js foo.js` on node-flag tails).
6. Flag scope stops at `--`: `-- --force` and `-- --check` reach the script,
   never the tool (verified on scratch).
7. Ambient environment guard: a bind refuses (exit 5) when the code reads an
   env var the shell sets undeclared; `--env` declares intent and lands in
   the invocation. Ubiquitous shell vars exempt.
8. Re-embedding a BOUND tail that changes the block requires `--force` and
   prints the figure diff first; an identical re-embed stays a no-op refresh.
9. The two consolidation-wave ledger corrections are recorded below rather
   than by editing history.

### C — the checkers

- `embeds` now: code-sha per tail (multi-tail aware, code = bytes above the
  FIRST banner), body-vs-out-sha static verdict (`output-block-hand-edited`),
  and `binding-lost` for any file saying `OUTPUT — EMBEDDED` that no longer
  parses as bound (the 1c42a16 regression class fires the moment it lands).
- `refs`: whole-label §s (dotted, lettered, `Theorem B` pairs), bold-led
  sub-item labels (`**4.5 …**`) and glossary-entry labels (`- **Stratum …**`)
  as addressable sections, `§§1-3` ranges, `§Q4.2` aliases, one-stopword
  prose (`in section 47`), `section-into-unsectioned-file` as its own kind,
  fenced examples skipped. Calibrating surfaced 13 live findings: 11 were the
  checker's own label-model gaps (fixed in the model), 2 were REAL dead
  pointers, both repaired: `IMPORT-MAP.md:404` §4 → §4.1 (Pippenger–Spencer
  lives under covering-dive §4.1), `origin-excess.md:696` `maier-matrix.md §F`
  → `maier-matrix.js` §F (the label names the SCRIPT's output part).
- `transfers`: `adjudicated-pair-vanished` — every ADJUDICATED key matching no
  live candidate pair is a finding. Eight superseded re-keys moved to a new
  `ADJUDICATED_RETIRED` archive in ledgers.js, reasons intact, consulted by
  nothing. Description now states the check's honest scope.
- `quotes`: the 95%-of-long-words tier is REPLACED by a contiguity tier
  (exact; or split-on-elision, all parts exact in order; or two exact halves
  with one bounded gap), and the description counts fuzzy clears. Calibrating
  surfaced 4 live firings: 2 were qc/README documenting its own examples (qc/
  now excluded, same rule as `absence`), 2 were mention-shaped quote marks in
  live docs, both edited to stop quoting what they only name
  (SEARCH-CONVENTIONS.md:145, covering-dive.md:17).
- `sourcing`: per-SECTION scope implemented as the `sourcing-backlog`
  ADVISORY (220 sections on landing day — a queue that size gated would teach
  everyone to ignore red; the counter should only fall, gate it in the tens).
  The gated file-level rule states its known weakness in its description.
- `calibration`: `unmarked-strength-word` for ALL-CAPS settled-sounding words
  outside the vocabulary (ESTABLISHED, SETTLED, DEMONSTRATED, CONFIRMED, …).
- `crosslinks`: reachability needs a real pointer (basename.md, backticked or
  bracketed stem, or a distinctive hyphenated stem ≥ 7 chars);
  `reachability-unprovable` for short-stem topic-word collisions.
- `absence`: `absence-stale` when an ABSENCE_VERIFIED entry is older than 14
  days (the suppression keeps suppressing; the staleness fires beside it).
- `paragraphIndex`: a bullet needs its trailing space; `**Bold lead.**` no
  longer scopes its paragraph line-by-line (B9, the M08 false-positive root).
- `provenance`: `mixed-provenance` when a note carries BOTH vocabularies —
  "p. 4" beside "ar5iv rendering" no longer clears silently.
- `search-convention`: table rows were already row-scoped via paragraphIndex;
  the prose-paragraph limit is now stated in the description (B10).

### D — the normalize migration, and the two acceptance tests

Changing VOLATILE moves hashes, so every bound tail whose recorded out-sha no
longer reproduces from its own bytes was handled explicitly, never left amber:

- 12 tails RESTAMPED after their bodies were verified byte-authentic under the
  normalize IN FORCE AT BIND TIME (9 pre-min-rule, 1 min-no-wall-rule
  natal-cap-27 — avoiding its 2 h re-run as instructed, 1 import-stein secs
  shape, 1 attack-growth-law closing-rule clash where the sha did not move).
  Each carries `body-lines:` and, where the hash moved, a dated `restamped:`
  note naming the rule it was verified under. A body matching NO bind-era rule
  would have been REPORTED, not restamped; there were none.
- `two-class-lower-bounds.js` RE-EMBEDDED per the acceptance test (520.4 s,
  --force, stamp lists exactly the 3 bare-secs wall clocks); a full `--check`
  of the new binding is running at this batch's close.
- Acceptance test 1 PASSED: `embed.js --check research/external-ladders-01.js`
  is flag-free — all four verdicts green, no readings advisory — without any
  edit to that file's prose ("048670" and hyphen-range tokens no longer
  exist to flag).
- Static custody state at batch close: 219/219 bound tails green under
  `bodyMatchesRecorded` (218 before the two-class re-embed landed).

### E — multi-tail composites

`tailfmt.locateAll` + `embed.js --tail N` + multi-tail-aware `embeds`. Each
tail binds independently; the code hash covers the bytes above the FIRST
banner for every tail; `--check --tail N` verifies one tail; binding without
`--tail` on a multi-tail file refuses with a listing (exit 6). Selftest
carries a two-tail fixture bound twice over (control) and with the second
tail's block edited (fires on that tail alone). The three composites
themselves (cap-33, cap-34, cap-37) are NOT restructured here: cap-33's
reachable run needs a 100-minute prerequisite, cap-37's march is external by
declaration, and cap-34's six stages cost ~37 minutes — the mechanism now
exists for the wave that re-runs them.

### F — audit-numbers.js

- U1: the Poisson-window check consumes the certificate walk's own `n - r0`.
- U2: the printed `theta(x) − ln m = lnD` identity is now a check — `lnBig`,
  eleven checks' single point of failure, is under the gate.
- U3: the two `e^{2g}/(kC2)` checks consume the COMPUTED C2; their §U
  duplicates deleted.
- U4: 1.847 recomputed by `slope()` over A288815's nineteen terms n = 3..21
  (the window was identified numerically: 1.847 is terms 3..21), with a
  21-term array-length pin.
- U5: the G2/h ratio table moved to the ladder section and divides the
  ladder's COMPUTED G2 by the COMPUTED h (h(31#)/h(37#) labelled TRANSCRIBED).
- U6: `L.got[31] = max(internal, boundaryCheck(...))` — the discarded return
  value now participates, matching its three siblings.
- NEW: A144311(n)+1 against our own FOURTEEN exact terms (12 computed in-run,
  2 gap-certified); f(x, next-prime) by direct %-sieve at the five UNAFFECTED
  diagonal levels — 0.044444/0.048485/0.048844/0.031119/0.030660 reproduce
  a3-03 §3 exactly, and a second mod-32-class alias in any producer of that
  layer now disagrees here; `lastMulti < 499` (extinction vs out-of-range were
  one answer); the pi_2(1e10) anchor promoted from print to check; Y2(37) =
  computed G2(37#) − 1 by covering duality (a_p = 0 covers exactly the
  non-slots), replacing the `527 <= 527` tautology pair.
- W1 phase-max: the T5 word is DERIVED by sieving Z/30 and the counting
  criterion runs at all three phases — 63/62/62, ceiling = max = 63; a future
  re-derivation from origin 17 or 29 can no longer redden the gate on a
  correct number.
- DELETED (tautology list, all 9): `43·43/41·41`, `527 <= 527`,
  `528 − 1 === 527`, "the two differ", "capacity BELOW 19", the seam `/2`
  echo, the duplicate seam sum, and the two `e^{2g}` duplicates. The
  retired-number regression banners all stand (the retired /2, the retired
  475/487, the retired 1.2417, the retired indexing).

### G — the mutation suite, re-run against the repaired gate

The suite was rebuilt from verify-the-verifier-checks.md §2 (41 mutations —
the report's 44 minus three subsumed variants; M09c is covered by M13b's
same-wrong-number-both-sides shape). Each ran on a fresh APFS clone of a 17 MB
snapshot of this tree (TOTAL 0 on its own), scored by the delta in gated
findings and advisory counts. Driver and per-mutation results:
session scratchpad `mut/drive.js`, `mut/results.json`.

**Headline, before → after.** The report measured 11 of 44 firing, 31
invisible, 2 false positives. The rebuilt suite measures:

- **23 of 41 fire in the GATE** (56%; was 25% counting controls) — every
  mutation of a class the repairs targeted now fires: the hand-edited bound
  block (M02), the banner steal (M17), the inserted "not" (M05), the changed
  number inside a quote (M05c), the dotted/lettered/unsectioned/stopword
  references (M06/M27/M24/M07), the vanished adjudication (M09f), the marker
  synonym (M12c), the page-beside-a-rendering note (M22), the short-stem
  orphan (M25).
- **4 more are advisory-visible** (M01 readings figure, M10 pasted literature
  row, M15b deleted tail → no-output-block, M21 fabricated section →
  unsourced-section): 27 of 41 visible somewhere (66%).
- **0 false positives** — the report's two (M26 fenced path, M08 bold-scoped
  convention) are both fixed and both now controls that stay silent. M28 (a
  dead quotation inside a CORRECTION paragraph) is silent BY THE HOUSE RULE
  (refutations stay visible), reclassified as a control.
- All 12 re-run controls (M06b, M07b, M12, M14, M15f, M25b, M33, M34, M05b,
  M08, M26, M28) behave.

**The 11 that still evade, each with its reason:**

| # | mutation | why it evades |
|---|---|---|
| M03 | digit inside a LEGACY block | no fingerprint exists to bind it; only a re-run sees it. The fix is the migration backlog (3 composites left), not a check |
| M04 | stale count word in prose | no producer for a count word; audit concern (report B12) |
| M08b | convention-about-A clears ABSENT-about-B in a PROSE paragraph | stated limit of paragraph scoping (B10); table rows are row-scoped and covered |
| M09b | hypothesis dropped from a single-sited claim | no pair to diff; outside `transfers` by construction, now said in its description |
| M11 | live doc citing a spent staging report | no layer rule: 18 live docs legitimately cite history paths (measured), so a hard rule would misfire; stays a named-uncovered class |
| M12b | single-sited overstatement vs its own artifact | needs the artifact read; structurally outside a cross-document check (B6) |
| M13 | the same wrong constant in TWO documents | nothing diffs a document against a producer; audit-numbers holds its own literals. The corpus's largest unguarded class, named (B12) |
| M21b | fabricated numbers beside `et al.` in the same section | the literature marker exempts its own section even under per-section scoping; scoping it tighter would fire on genuine literature sections |
| M23 | invented ADJUDICATED entry whose key MATCHES the live pair | the ledger's reasons are the only audit for a fresh lie; `adjudicated-pair-vanished` covers stale keys, not invented ones |
| M30 | absence claim naming no artifact | not checkable against a directory; dropped by design and now stated |
| M32 | code edited + code-sha hand-recomputed, block internally consistent | any hash a tool computes a hand can compute. STATIC evasion only: `embed.js --check`'s run verdict reads `out-sha256 DIFFERS` on it |

One incidental: M19 (a new artifact falsifying a dated absence) fires
`uncited-script` on the new artifact — visibility by coincidence, not
coverage; the mechanical falsification of a dated absence remains impossible,
which the ledger and the `absence-stale` interval now both say.

## Ledger corrections carried here rather than by editing history

Per the doc convention the history layer is not edited. The embeds report §6
item 9 records two corrections to `consolidation-wave.md` §2's table; they are
restated here as the finale's record:

- `a3-08-adjacent-pairs.js` is bound with the plain default invocation
  (89.6 s); the `-- --t31` + `--node-flag --max-old-space-size=8192` leg lives
  in its READINGS, not in the fingerprint.
- `attack2-rankin2d.js` is bound with the plain default invocation (168.3 s);
  the `-- --deep` leg lives in its READINGS.

## Close

**The gate at the close** (`node research/qc.js --full`, FULL GATE PASSED):

- Fast gate: TOTAL 0 across all 11 checks. Advisory tier: 156
  readings-not-traceable (was 161 — the tokenizer fixes), 27 no-output-block
  (newly counted; was invisible), 3 hand-pasted-tail (the three declared
  composites), 220 unsourced-section (newly counted per-section custody
  queue). The gate now states on every run what a zero certifies — a fast
  syntactic verdict — per the checks report §7.
- Selftest: **39 known positives fire, 32 controls silent** (was 24/14).
  Every repair in this pass landed with its fixture in the same batch; the
  new positives cover output-block-hand-edited, binding-lost, no-output-block,
  multi-tail, the three tokenizer classes, the Q6 and min-wall normalize
  rules, body-lines parsing, dotted/lettered/unsectioned sections, the
  negated and exponent-mutated quotations, adjudicated-pair-vanished,
  unsourced-section, unmarked-strength-word, reachability-unprovable,
  absence-stale, mixed-provenance, the M26 fence control and the M08 bold
  control.
- audit-numbers: **246/246 checks pass** (was 243: nine tautologies deleted,
  twelve first-principles checks added, six echoes converted in place).
- Static custody: **all 219 bound tails hash to their own recorded out-sha**
  from bytes on disk, nothing executed; the two acceptance tests pass
  (`--check external-ladders-01.js` flag-free; the re-embedded
  two-class-lower-bounds fully green and stable under `--check`).
- Mutation suite: **23/41 gated-caught, +4 advisory-caught, 0 false
  positives, 11 documented evaders** (§G above; report baseline was 11/44
  with 2 false positives).

**NOT reached / left open, deliberately:**

- The three composites (cap-33, cap-34, cap-37) still carry hand-pasted
  tails: the multi-tail mechanism now exists, but their runs cost 100 min to
  7 h and one is external by declaration. Pricing and per-file obstructions
  are in custody-overnight.md; binding them is a run-budget decision, not a
  tooling gap any more.
- The 220-section sourcing queue and the 27 no-output-block scripts are
  counters that should only fall; gate them when they reach the tens.
- The M11 layer rule (live doc citing spent staging) stays unimplemented on a
  measurement: 18 live docs legitimately cite history paths.
- `qc/tails.js`'s substring figure-matching and 30 s default tier are
  unchanged beyond the invocation fix; the static body check has taken over
  its main job for bound tails.
- The embeds report's §5.2 "observed inputs" variant (an fs/require shim
  logging what a run actually touches) was not built; the static `inputs:`
  field covers every literal dependency, not computed shard paths.
- audit-numbers' §7.2 items priced "defer": the survival-trough triple
  (needs the curve) and a full A048670 h(31#) stream (offline job).
- The environment guard whitelists ubiquitous shell variables by name; a
  script reading an exotic-but-common variable would still need `--env`
  discipline.

**Restamp custody note.** Twelve out-sha256 values moved in this pass, every
one on a body first verified byte-authentic against the normalize rule in
force when it was bound, and every one now carries `body-lines:` plus a dated
`restamped:` line in its own fingerprint. The alternative — leaving twelve
tails permanently amber under rules adopted after they were written — is the
state the embeds report §6 calls a checker people stop running.
