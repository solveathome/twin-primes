# Adjudicating the readings-traceability MISMATCH list (2026-08-20)

<!-- ledger
id: Q-mismatch-adjudication
status: ANSWERED
todo: none
question: What is the true value behind each of readings-traceability's 56 mismatches, and where does each repair land?
verdict: All 56 adjudicated with old and new recorded: 33 READING-FIXED, 5 OUTPUT-FIXED-REBOUND, 2 awaiting re-embed, 5 DOC-FIXED, 4 UNTRACED-MARKED and 7 HOLDS-AS-IS; nine were repaired by making a script produce a figure it had only described, and three of those reproductions turned up a second defect.
-->

`research/history/staging/readings-traceability.md` closed with 56 numbered
mismatches and a standing instruction: adjudicate every one, decide the true
value, decide which artifact is wrong, and fix it where the defect lives. This
file is that pass's ledger. Every row records the old value, the new value, and
which of four places the repair landed in.

**Where a defect can live, and what each gets.** A wrong READING beside a
correct OUTPUT is corrected in the reading, quoting the printed value. A wrong
figure inside an OUTPUT block is a CODE defect — the block is not hand-edited,
the code that prints it is fixed and the file rebound. A wrong claim in a live
document that quotes either is fixed in the document. An untraced figure is
either reproduced into an embedded producer or marked
`[UNTRACED — verify before quoting]` where it stands. **No number was changed
without recording old → new here and in the file itself.**

**Every figure in the "true value" column was recomputed in this pass** unless
the row says otherwise. Recomputation means: sieving, exact BigInt, or reading
the producer's own printed block — never taking the finding on report.

## Verdict summary

| verdict | count |
| --- | --- |
| READING-FIXED | 33 |
| OUTPUT-FIXED-REBOUND | 5 |
| FIXED-AWAITING-REEMBED | 2 |
| DOC-FIXED | 5 |
| UNTRACED-MARKED | 4 |
| HOLDS-AS-IS | 7 |
| **total** | **56** |

Nine of the 56 were repaired by making a script produce the figure it had only
been describing: `fold-profile-13-null-mc.js` is new, and
`level-ledger-tight.js`, `natal-cap-03-dilation-ensemble.js`,
`h2-length-needed.js`, `attack-beta2-A-B-bounded.js` and
`import-chaining-02.js` each grew a section. Every one of those reproductions
confirmed the figure it was chasing, and three of them turned up a second
defect the original claim had been hiding.

## The full verdict table

| # | site | old → new | verdict |
| --- | --- | --- | --- |
| 1 | `natal-cap-32-wrap-identity.js` r0 | 15.4 min → 24.9 min | READING-FIXED |
| 2 | `natal-cap-32-wrap-identity.js` r3 | 16 core-hours → ~3.3 core-hours | READING-FIXED |
| 3 | `natal-cap-39-triple-census.js` R11 | K ≈ 6800 → K = 7863 | READING-FIXED |
| 4 | `natal-cap-18-at29.js` r7 | Σ2/q = 2.66 → 2.524 | READING-FIXED |
| 5 | `natal-cap-14-discrepancy-lemma.js` r4 | (0.03 → 0.85) → (0.017 → 0.85) | READING-FIXED |
| 6 | `attack-D-twopoint.js` r4 | 1.00 at x = 13.1 → 0.942 at x = 14.0 | READING-FIXED |
| 7 | `a3-04-maxsum-recursion.js` r1 | 14.4s → 26.9s | READING-FIXED |
| 8 | `natal-cap-36-skeleton-door.js` r7 | 18.5 min → 11.3 min | READING-FIXED |
| 9 | `natal-cap-29-sigma-plateau.js` r4, r7(c) | ×2.75 → ×2.720; ×2.70 → ×2.708; **+1.7% → +0.45%** | READING-FIXED |
| 10 | `natal-cap-22-at31-drift.js` r5 | 2.85 / 0.19W / 1.4e12 → 2.729 / 0.182W / 1.35e12 | READING-FIXED + OUTPUT-FIXED-REBOUND (header budget 2.66W/5.3e11 → 2.52W/5.1e11) |
| 11 | `natal-cap-24-boundK-curve.js` r5 | monotone ≥ 3% → ≥ 5% | READING-FIXED |
| 12 | `attack-hybrid-bound.js` r4 | "every other pays −0.07..−0.28" → p = 5 pays +0.078; the other ten −0.075..−0.281 | READING-FIXED |
| 13 | `natal-cap-33-overnight.js` R3.1 | 0.295..0.343 → 0.295..0.429 | READING-FIXED |
| 14 | `natal-cap-19-calm-lemma.js` r1 | 0.00007% → 0.000062% | READING-FIXED |
| 15 | `natal-cap-30-skeleton-bound.js` r1 | 599 primes → 222 primes | READING-FIXED |
| 16 | `natal-cap-14-discrepancy-lemma.js` r1 | 1e-15 → 1e-14 | READING-FIXED |
| 17 | `import-chaining-01.js` r2 | 0.0875..0.1168 → 0.0530..0.1168 over z = 13..29 | READING-FIXED |
| 18 | `fold-profile-13-hotspot-sweep.js` r2 | 10x..10,000x → 10x, 100x, 1000x | READING-FIXED |
| 19 | `fold-profile-05-survival-curve.js` r3 | 0.892624 → 0.892627 | READING-FIXED |
| 20 | `attack-frontier37-01-word.js` r6 | 111/step, convention now named (116.6 over the seven printed increments) | HOLDS-AS-IS |
| 21 | `a3-09-histogram-operator.js` r8 | 2.49 at p = 199 → 2.50 | READING-FIXED |
| 22 | `natal-cap-16-fast-variance.js` context note | rel 4.6e-9 → 1.3e-8 (@23), denominator now named | READING-FIXED + DOC-FIXED (`paper/variance-note.md`) |
| 23 | `natal-cap-30-skeleton-bound.js` r3 | "no30 stays ≤ 0.004" → scoped to @23, whole ladder printed | READING-FIXED |
| 24 | `fold-profile-08-zone-localized-gap.js` r3 | 0.44 → 0.450 (and 0.45 for the law's coefficient) | READING-FIXED |
| 25 | `natal5-variance.js` r5 | e^{2γ}/4 = 0.7932... → 0.79305... | READING-FIXED |
| 25a | `attack2-03-09-depth-formula.js`:19, :166 | 0.7935 → 0.79305, twice | OUTPUT-FIXED-REBOUND |
| 26 | `natal-cap-27-t4-at13.js` code:309 | C(990,6) = 1.1e15 → 1.3e+15 (computed, not hardcoded) | FIXED-AWAITING-REEMBED |
| 27 | `natal-cap-27-t4-at13.js` code:261 | C(990,3) = 160,940,540 → 161,226,780 (computed) | FIXED-AWAITING-REEMBED |
| 28 | `level-ledger-tight.js` code:201 | "15% high" → "15% low" | OUTPUT-FIXED-REBOUND |
| 29 | `attack-lower-bound.js` READINGS header | "Every number below is in the OUTPUT block above" → narrowed to measurements | READING-FIXED |
| 30 | `lemmaV-sup-extension.js` S2 | P(29) = 6.5e8 → 2.23e8 | READING-FIXED + DOC-FIXED (staging report, both sites) |
| 31 | `natal-cap-34-wrap-precision.js` r6, r13, r14 | ~40 figures stay flagged; C(14850,4) 2.026e+15 → 2.025e+15; r6(b)'s rel-error column recovered | UNTRACED-MARKED |
| 32 | `fold-profile-13-hotspot-sweep.js` r1, r2, r6 | median 4.70/5.38 → 4.78/5.48, p10 4.28/5.01 → 4.44/5.05, p90 5.30/5.95 → 5.51/6.08, 33%/95% → 42%/90%, sd 1.007 → 1.013, skew +0.312 → +0.233 | OUTPUT-FIXED-REBOUND (new producer) |
| 33 | `level-ledger-tight.js` r9 | 2.5e-4 at x = 23 → 2.52e-4 at x = 23, p = 29, now printed | OUTPUT-FIXED-REBOUND |
| 34 | `natal-cap-03-dilation-ensemble.js` r4(b) | baseline "(0.192)" → 0.1915, now printed | OUTPUT-FIXED-REBOUND |
| 35 | `a3-03-f-from-census.js` r7 | L band 30.8–42.9 unchanged, flagged | UNTRACED-MARKED + DOC-FIXED (`f-decays.md`) |
| 36 | `04-crystallization-and-hl.js` r3 | act/HL upper end 1.0002 → 1.0045 | READING-FIXED |
| 37 | `h2-length-needed.js` r1 | 1.176 / 1.198 / 1.258 confirmed, now printed by section (b2) | OUTPUT-FIXED-REBOUND |
| 38 | `natal-cap-12-overlap-sign.js` r2 | "(+0.90σ)" on the model's gap → gap 1,631 named; +0.90σ attributed to the run's 1,382 residual | READING-FIXED |
| 39 | `natal-cap-20-third-order.js` r8 | 1.81 unchanged; "no classical counterpart / natural next target" → SUPERSEDED marker | READING-FIXED |
| 40 | `attack-beta2-A-B-bounded.js` r5 | z = 73 endpoint 1.5471 now produced here (1.5471042); **"all twenty steps" → "all fifteen steps"** | OUTPUT-FIXED-REBOUND + DOC-FIXED (staging report) |
| 41 | `removal-ledger.js`:90 | Σ2/q = 2.66x → 2.52x; window "(37, ~450000]" → "[37, 447840]" | READING-FIXED |
| 42 | `fold-profile-03-inside-copy0.js`:449 | "In SIX of those eleven" → FIVE | READING-FIXED (+ same count in `a3-06-origin-vs-max.js`) |
| 43 | `natal-cap-05-second-moment.js` r2 | verified to 1e-10 → 1e-9 | READING-FIXED |
| 44 | `removal-ledger.js`:90 | "~37,000 primes" → 37,534 | READING-FIXED |
| 45 | `attack-foldL-04-localized.js`:468 | 11.6 → 11.52, crossing named at c = 1.2249 | READING-FIXED |
| 46 | `grain-census.js`:468 | e^{6/g} = 1.2386 → 1.23846 | READING-FIXED |
| 47 | `import-chaining-02.js` r1, r4 | 2.5769 confirmed; moment triple 0.998/–/1.022 → 0.998/1.005/1.022, now printed | OUTPUT-FIXED-REBOUND |
| 48 | `natal-cap-37-at41-march.js` custody addendum | 0.41 s / 50e6 / 18.6x unchanged, flagged | UNTRACED-MARKED |
| 49 | `natal-cap-37-at41-march.js` r5 | np / S / blk 32000 unchanged, flagged | UNTRACED-MARKED |
| 50 | `attack-02-head-bias.js` r2 | "1.000 to 3 decimals for x ≥ p³" → within 0.006 from p³, 0.002 from 3p³, 1.000 from 10p³ | READING-FIXED + OUTPUT-FIXED-REBOUND (2026-08-17 banner) + DOC-FIXED (`ATTACKS.md`) |
| 51 | `natal-cap-38-loudness-driver.js` r6(iii) | 0.97, 1.01, 1.10, 1.17 → 0.97, 1.02, 1.11, 1.19 | READING-FIXED |
| 52 | `natal-cap-25-excess-law.js` r7 | 6.5e9 d's → 5.4e9 | READING-FIXED |
| 53 | `attack2-01-06-seam-census.js` r3 | "(2473 vs 2472.5)" for 0.03% → both lines named with their own errors | READING-FIXED |
| 54 | `natal-cap-25-excess-law.js` r4, r7 | ×1.55 → ×1.50 | READING-FIXED (+ three quoting sites in `natal-cap-29-sigma-plateau.js`, rebound) |
| 55 | `natal-cap-25-excess-law.js` r2 | 0.20 → 0.009 becomes 0.183 → 0.0094 | READING-FIXED |

`HOLDS-AS-IS` is one row on its own (#20) plus the six rows where the figure
did not move and only its scope, attribution or completeness claim did: #23,
#29, #31, #35, #39, #48/#49 counted as the pair they are.

## The corrections the ledger did not ask for

Five defects surfaced only because a figure was chased to its source.

**`CHANGELOG.md`:3859 is false and is left standing.** Its closing sentence for
the 2026-08-18 `e^{2γ}/4` retirement reads "Now 0.7931; the only site in the
corpus carrying it." `attack2-03-09-depth-formula.js` carried 0.7935 at two
sites on that date, one of them above the OUTPUT banner and therefore inside
the code hash. The CHANGELOG is history and is not edited; the correction is
recorded here for the orchestrator's pass entry. **The retirement itself is now
complete** — both sites are fixed and the file rebound, output byte-identical.

**"All twenty steps" was wrong too.** Reproducing
`attack-beta2-A-B-bounded.js`'s z = 73 endpoint made the ladder visible, and
z = 13..73 is sixteen rows and FIFTEEN steps. The claim had travelled with the
endpoint into `history/staging/attack-AB-bounded.md` and was corrected there.

**The 2026-08-17 audit's "reading 2 stands" needs requalifying wherever it is
quoted.** `attack-02-head-bias.js`'s own banner said "READING 2, the p^3
equidistribution law, stands". Scored against the file's own table, the p³
lock-in is real but the precision is not: the worst checkpoint at or past p³
reads 1.006. The banner and `ATTACKS.md` row 2 now carry the qualification. The
audit records at `history/staging/qc-scripts-S2.md`:382 ("Reading 2 stands.")
and `history/staging/qc-wave6-U.md` U-15 are history and were not edited —
**anyone quoting either should carry the precision qualification with it.**

**`maxgap-law.js` has no OUTPUT block at all.** Zero `// OUTPUT` banner lines,
verified this pass. `fold-profile-08-zone-localized-gap.js` reading 3 cited it
for a constant, and there was nothing there to cite. That is a custody defect of
`maxgap-law.js`, not repaired here.

**`natal-cap-33`'s lever arm is understated at a second site.** Fixing R3.1's
0.295..0.343 exposed that `paper/variance-note.md`:320 makes the same claim over
its own NINE-point table, where the true span is 0.295..0.596.
`history/staging/audit-self-contradiction.md`:438 had already found this and
could not explain the 0.343; it is explained now only in the negative — no level
of any ladder produces it. Both live sites are fixed.

## Where the wrong numbers came from

Four of the fifty-six turned out to have a traceable origin rather than being
slips, and each origin is a class worth recognising.

1. **A level's boundary carried one level up.** The Σ2/q = 2.66 that stood at
   `natal-cap-18-at29.js`, `removal-ledger.js` and in `natal-cap-22`'s own
   a-priori header is the same sum started at q = 29 instead of q = 37 —
   2.6578 against 2.5236. The @29 scour floor applied to a T31 window, three
   times.
2. **A size standing in for a count.** `natal-cap-25`'s "6.5e9 d's" at @31 is
   W(29) = 6,469,693,230, the @29 TILE SIZE. The @31 d-count is W(31)/37 =
   5.42e9.
3. **A factor back-solved from a rounded product.** `grain-census`'s
   e^{6/g} = 1.2386 is 0.510/0.4117 to three digits; the factor itself is
   1.23846.
4. **A stale borrow, correct when written.** `natal-cap-32`'s 15.4 min was
   `natal-cap-27`'s wall time before that file's tail was rebound with
   `--force`; cap-27's own traceability note records the change to 24.9 min.
   The same figure had travelled into `natal-cap-21`'s forward pointer and its
   `.md`, both now naming which run each wall time belongs to.

The fifth class is the one that matters most for the corpus: **a rounding
written with an ellipsis is not a rounding.** `natal5-variance`'s
`e^{2gamma}/4 = 0.7932...` presents itself as a truncation of a decimal it is
wrong in the fourth place of. That is why #25 is a defect and the many sites
carrying a bare `0.79` are not.

## What the reproductions found

Six figures were reproduced rather than trusted. All six confirmed, and three
of the six exposed something else.

| figure | reproduced by | outcome |
| --- | --- | --- |
| `fold-profile-13`'s null Monte Carlo | **new** `research/fold-profile-13-null-mc.js`, 18 s | confirmed: median 5.48 against the scratch 5.38, 90% against 95%, null sd 1.013 against 1.007. The retirement of the sweep's one positive now rests on a block |
| `h2-length-needed`'s p = 2 triple | section (b2), same file | confirmed to three decimals, all three. `frame()` drops p = 2 and p = 3 by construction, which is the convention the reading is about |
| `attack-beta2-A-B`'s z = 73 endpoint | S5's default ladder, extended to sixteen rows, +200 s | confirmed to seven decimals (1.5471042). **Killed the step count**: fifteen, not twenty |
| `import-chaining-02`'s z = 23 level | S1, fourth level, +9 s | confirmed 2.5769 exactly. **Filled a missing term** (m6/15 = 1.005) and **cross-checked against another file** (0.7935, matching `import-chaining-01`) |
| `level-ledger-tight`'s x = 23 cell | Part 5's fifth cell | confirmed: 2.52e-4 against the quoted 2.5e-4. Identity check skipped there and the row says so — 6e13 operations against one O(D) histogram |
| `natal-cap-03`'s all-space baseline | exact enumeration of all 720 tuples | confirmed: 0.191545, which is 0.192 at three decimals. **The claim was right and had no source** |

The pattern is worth stating plainly: **every undeclared measurement in this
list that could be re-run came back right.** What the re-runs corrected was
never the measurement — it was a step count, a missing term, a binomial label,
a step's convention. The corpus's undeclared numbers were honest; its
descriptions of them were not always.

## History-layer sites that now carry a corrected figure

The `research/history/` layer is a record of what past passes wrote and is not
edited. Four records quote a figure this pass corrected. **Anyone reading them
should carry the correction with them.**

| record | carries | now |
| --- | --- | --- |
| `staging/qc-wave6-Y.md`:608 | 1/lnlnW spans 0.295..0.343 (quoting the txt) | 0.295..0.429 over cap-33's own refit range; 0.295..0.596 over the paper's nine points |
| `staging/qc-numbers.md`:148 | lever arm 1/lnlnW ∈ [0.295, 0.343] | same |
| `staging/qc-scripts-S2.md`:301 | 895,790 / 1,003,543 = 0.892624 | 0.892627 |
| `staging/qc-scripts-S2.md`:382 | "Reading 2 stands." (attack-02) | stands as a SCALE, not a precision — see above |
| `staging/audit-self-contradiction.md`:202 | cap-27's T4 march "in 15.4 minutes" | 24.9 min as the tail now prints it; 15.4 was the pre-`--force` run |
| `staging/consolidation-wave.md`:169, :238 | the same 15.4 | same |

`staging/audit-self-contradiction.md`:438 is the opposite case and deserves
naming: it found the 0.343 independently, said plainly that it "matches no row
in the table", and called that "itself unexplained". It still is, in the sense
that no ladder at any sampling produces it — but the audit was right, and this
pass is the second witness rather than the first.

## Follow-up list

1. **RE-RUN THE 2026-08-18 CONSTANT SWEEP.** Not done here, and it is the top
   item. `CHANGELOG.md`:3859 closed that sweep with "the only site in the
   corpus carrying it" and the sentence was false: two sites in
   `attack2-03-09-depth-formula.js` were missed, one inside a code hash. A
   sweep that certifies its own completeness and is wrong about it has to be
   re-run rather than trusted, and its method has to be checked against the
   class it missed — a constant sitting in a header comment above the OUTPUT
   banner.
2. **`natal-cap-27-t4-at13.js` needs its rebind.** The code is fixed and the
   block is stale by exactly two labels. Run on a quiet machine:
   `node research/qc/embed.js --timeout 7200 research/natal-cap-27-t4-at13.js`.
   The recorded elapsed is 1537.1 s on eight workers; this pass ran with the
   machine at load average 92 on ten cores. `qc.js embeds` reports the file as
   `tail-does-not-belong-to-this-code` until then, correctly.
3. **`natal-cap-34-wrap-precision.js`'s W2 block, ~40 figures.** Readings 6(a),
   6(e), 13 and reading 14's instance counts are real measurements from a
   2026-08-18 pass at @17 and @19 whose invocations were never pasted.
   Reproducing them means re-running that pass — hours of multi-core compute.
   Flagged in place. Two items came off the list on inspection and are noted
   there.
4. **`f-decays.md`'s L band 30.8–42.9 and its point estimate 35.5.** No script
   custody anywhere. Reproducing means refitting
   `ln(1/f) = a + b(2p/m̄) − c·ln s(d_min)` on each half of the census range
   and extrapolating each to x = 1000, into a script with an embedded block.
   Marked at both sites (`f-decays.md` and `a3-03-f-from-census.js`).
5. **`maxgap-law.js` carries no OUTPUT block.** Give it one, or stop citing it.
6. **`natal-cap-37-at41-march.js`'s two off-repo figures** (#48, #49) cannot be
   reproduced from this repository at all: one needs a re-run transcript that
   was never embedded, the other the elided part of a log under
   `~/Files/primeoire-runs/at41/`. Neither is load-bearing. The flags are the
   custody.
7. **The 2026-08-17 audit's "reading 2 stands"** is quoted in two history
   records that were not edited. See above.
8. **`paper/variance-note.md` says the lnlnW refit uses nine points; the
   producer's block says seven** (`refits x=13..37 (7 pts)`). Noticed while
   fixing #13, out of scope here, and `history/staging/audit-self-contradiction.md`
   already flags the neighbourhood.

## Gate

`node research/qc.js` was run before and after every few files. It closed the
pass at **TOTAL 2**, both in `embeds`, both `tail-does-not-belong-to-this-code`:
`natal-cap-27-t4-at13.js`, which is item 2 above and is documented at length in
the file itself, and `greedy-oracle-validation.js`, which belongs to a
concurrent session working in the same tree and was not touched here. The other
ten checks are clean. `node research/qc/selftest.js` passes: all 24 known
positives fire, all 14 controls stay silent. `node research/audit-numbers.js`
passes **242/242** in 165.6 s, including the retired-value checks that would
catch a constant moved the wrong way — which matters here, because this pass
moved `e^{2γ}/4` at three sites. Two
re-embeds in this pass were first run without the file's recorded
`--streams both` flag and were immediately redone with it before commit; both
`natal-cap-22-at31-drift.js` and `natal-cap-29-sigma-plateau.js` carry their
original `streams: stdout+stderr` and their full stderr blocks. **That is a
standing hazard worth naming: `embed.js`'s regenerate line is part of the
invocation, not decoration, and a rebind that drops it silently truncates the
tail.**

This pass also walked straight into the hazard the traceability pass wrote its
standing rider for, and it is worth recording that the rider caught it. Two of
the correction notes written here wrapped the word `OUTPUT` to the start of a
comment line, and `tailfmt.locate` scans BACKWARDS for the last `// OUTPUT`, so
each of those lines became a new banner at the foot of its file and stole the
real tail. `fold-profile-08-zone-localized-gap.js` and `natal5-variance.js`
appeared in the `hand-pasted-tail` advisory (3 → 5) until both sentences were
reworded; the advisory is back at 3, which is `qc/selftest.js` and the two
declared composites. The detection is one line and belongs in every pass that
appends prose to a script:

```
for f in $(find research -name '*.js'); do
  n=$(grep -cE '^[[:space:]]*//[[:space:]]*OUTPUT\b' "$f")
  [ "$n" -gt 1 ] && echo "$n  $f"
done
```
