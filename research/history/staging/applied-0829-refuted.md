<!-- ledger
id: Q-applied-0829-refuted
status: ANSWERED
todo: none
question: Were the four refuted-claims audits' APPLY row rewrites applied to REFUTED.md?
verdict: 25 of the 27 APPLY items are in the file, 1 more merged into a sibling's text at the shared boundary row, 1 deferred to the in-progress red team, 7 HOLD items untouched and listed here for Chris, 4 items owed outside REFUTED.md; the table still holds exactly 67 data rows and qc.js reports refs 0 and crosslinks 0.
-->

# Applying the four refuted-claims audits to REFUTED.md

*(2026-08-29. Internal, HELD under the publication moratorium. A record of an
edit, not of a finding: the mathematics in every rewrite below belongs to the
audit that derived it, and this note only says which strings went into the file
and which did not.)*

## §0. Counts

| outcome | n |
|---|---|
| APPLY items applied to `research/REFUTED.md` | 25 |
| APPLY items merged into a sibling's text at a shared boundary row | 1 |
| APPLY items deferred to a ruling in progress | 1 |
| HOLD items, not applied, listed at §2 | 7 |
| items owed outside `REFUTED.md`, listed at §3 | 4 |
| data rows in the table, before and after | 67 |

Cell edits: 26, across 25 rows (row 57 at line 83 takes two, its route cell and
its why cell). Rows whose verdict word changed: 1 (line 63, `CLOSED` to
`CLOSED, by three separate mechanisms`). Rows whose record pointer changed: 3
(line 67 gains `§4`, line 70 goes from `§2` to `§3.2`, line 72 gains `§1, §4`).
No row was added, deleted, split or wrapped; every row is still one line.

Every one of the 26 `old` strings matched the file verbatim and exactly once,
checked before any write. **No mismatch was found and none had to be repaired
by route text.** The unicode subscripts, the escaped table pipes in line 72 and
the em dashes the audits quoted are all present in the file as the audits gave
them.

## §1. One line per audit item

Row numbers are the audit's own data-row index; the file line is the line in
`research/REFUTED.md` before the edit, which is unchanged by it.

**Audit 1** (`refuted-audit-0829-1.md` §3, rows 1 to 17). Eight APPLY, one HOLD.

| item | row, line | route | outcome |
|---|---|---|---|
| Row 5, APPLY | 5, :31 | the accumulating-index family on the tile (A4, A10's m_eff) | applied |
| Row 6, APPLY | 6, :32 | TODO 0b as stated, ln c ≲ 2 ln²u/u ⟹ G2(u) < u² | applied |
| Row 8, APPLY | 8, :34 | the origin as a distinguished position at S = x′² | applied |
| Row 9, APPLY | 9, :35 | the certificate route (the θ ladder) as a road to TPC | applied |
| Row 12, APPLY | 12, :38 | Hagedorn's algebraic construction h(n) ≥ 2p_{n−1}, adapted | applied |
| Row 14, APPLY | 14, :40 | any twin-specific discrepancy law | applied |
| Row 16, APPLY | 16, :42 | Lemma V's mean-square form as the missing factor | **deferred** |
| Row 17, APPLY, nit | 17, :43 | `u_sup` as an unconditional worst-position bound | applied |
| HOLD, outside the row set | n/a | `G2-STATE.md`:35-38 PROVEN block | held, §2 |

Row 16 is deferred on the orchestrator's instruction: `redteam-0829-theorem1.md`
is ruling on that row's rung, and the audit's replacement asserts a rung
(`unconditional and uniform in s, INFERRED here`) that the ruling may move. The
row stands as written until that lands.

Row 17 is a boundary row and audit 2 proposed a wider rewrite of it at HOLD.
Audit 1's APPLY is the narrower of the two and is the one in the file; audit 2's
is at §2 and is not applied.

**Audit 2** (`refuted-audit-0829-2.md` §3, rows 17 to 34). Six APPLY, four HOLD.

| item | row, line | route | outcome |
|---|---|---|---|
| Row 21, APPLY | 21, :47 | fractional retention (Brady / Runbo Li) | applied |
| Row 22, APPLY | 22, :48 | "a floor at 4", and the band (4, 4.2665] | applied |
| Row 27, APPLY | 27, :53 | prior art on the `u_sup` representation | applied |
| Row 32, APPLY | 32, :58 | the A/B-coupling depth axis as a proof route | applied |
| Row 33, APPLY | 33, :59 | certificate monotonicity in L as a live defect class | applied |
| Row 34, APPLY | 34, :60 | the greedy oracle as an exact solver past x ≈ 53 | **merged** |
| Row 17, HOLD | 17, :43 | `u_sup` as an unconditional worst-position bound | held, §2 |
| Row 20, HOLD | 20, :46 | the loss-budget LP at x = 43 | held, §2 |
| Row 23, HOLD | 23, :49 | improving β₂ itself | held, §2 |
| Row 25, HOLD, producer first | 25, :51 | the covering economy asymptotically, and the hybrid | held, §2; owed, §3 |

**Audit 3** (`refuted-audit-0829-3.md` §3, rows 34 to 51). Five APPLY, one HOLD.

| item | row, line | route | outcome |
|---|---|---|---|
| §3.5, APPLY | 34, :60 | the greedy oracle as an exact solver past x ≈ 53 | applied, carrying audit 2's unit fix |
| §3.4, APPLY | 37, :63 | the local-lemma family as a route past the Mertens threshold | applied, verdict cell included |
| §3.3, APPLY | 41, :67 | chaining the Tail-Count Transport on the tile | applied, record pointer included |
| §3.1, APPLY | 44, :70 | recognizability-radius route: R_x < x′²−3 ⟹ Zone Postulate | applied, record pointer included |
| §3.2, APPLY | 46, :72 | bounding the anchored δ by the forced scale as a lemma | applied, record pointer included |
| §3.6, HOLD | 51, :77 | the bounded-differences family on the anchored deficit | held, §2 |

**Audit 4** (`refuted-audit-0829-4.md` §3, rows 51 to 67). Eight APPLY, one HOLD.

| item | row, line | route | outcome |
|---|---|---|---|
| 51, APPLY | 51, :77 | the bounded-differences family on the anchored deficit | applied |
| 54, APPLY | 54, :80 | the BGT interpolation machine for 1d limit existence | applied |
| 55, APPLY | 55, :81 | the sofic first-moment shape L ≍ p/ln p | applied |
| 57, APPLY, two cells | 57, :83 | the linear exponent rule H = a + b·ln D | applied, route cell and why cell |
| 58, APPLY | 58, :84 | the Chen-Stein route to the 3.8 and the extinction constants | applied |
| 60, HOLD | 60, :86 | manufacturing the smooth profile from sieve weights | held, §2 |
| 61, APPLY | 61, :87 | the Kowalski-Michel-Sawin branch for Lemma V | applied |
| 63, APPLY | 63, :89 | literature-owned special-level constructions | applied |
| 67, APPLY | 67, :93 | the QR refinement of the anchored-cap transplant | applied |

### The three boundary rows

- **Row 17 (:43).** Audit 1 APPLY (nit), audit 2 HOLD. The narrower APPLY is in
  the file: `it rises at all nine levels` became `it rises at all eight steps
  over nine levels`. Audit 2's wider version, which would also have added the
  MEASURED marker and rewritten the basis-independence clause, is at §2.
- **Row 34 (:60).** Both audits flagged APPLY with different texts, and the two
  differ on one point of substance. Audit 3's is the more specific rewrite (it
  adds that 43 and 53 were budget and that three of the eight misses were still
  moving with budget) and is the base of what went in. It carries the row's
  existing `slope −0.0235 ± 0.007 per level` forward, and audit 2 §2d shows that
  unit is wrong: the number is `d ln(ratio)/d ln x`, and read per level it
  mis-predicts the ratio at x = 79 by about a factor of four. Audit 3's own
  mechanism sentence (§1, line 60) calls it "the log-log ratio slope", so the two
  audits do not disagree about the object, only about which wording the row
  inherits. Applied: audit 3's text with audit 2's `log-log slope −0.0235 ±
  0.007 in ln x` in place of the `per level` clause. **This is the one place
  where the string in the file is not verbatim either audit's.** Audit 2's item
  is recorded as merged rather than applied. Its second narrowing, "at one seed
  base", was not carried over; audit 3's "at one fixed uniform budget" is what
  the row says, and the seed-base rider stays at the record.
- **Row 51 (:77).** Audit 3 HOLD, audit 4 APPLY. Audit 4's replacement is in the
  file. Audit 3's HOLD would have added a per-member sourcing grade and is at §2;
  it is not contradicted by what was applied, since audit 4's text closes on the
  ensemble/anchor divide rather than on the six readings.

## §2. The HOLD items, verbatim, for the orchestrator

Seven, none applied. Reproduced with the audit's own flag text so Chris can
rule without reopening the audits.

**Audit 1, HOLD, outside the row set.** `G2-STATE.md`:35-38 lists the Lemma V
item in its PROVEN block as one claim. Three rungs are bundled there: the
mean-square form (PROVED, `sift-limit-attack.md` §7e), the bound on B (INFERRED
chain, VERIFIED steps, `attack-AB-bounded.md` §1.1) and the never-binding
finding (VERIFIED at z = 13..47). Splitting the entry is a live-layer edit to a
canonical file and is Chris's call.

**Audit 2, row 23, `research/REFUTED.md:49`, HOLD.** A two-word qualifier that
restores the record's own wording. Chris may judge the bare row fine, since
nothing in the programme acts on it.

- old: `unimproved since Diamond–Halberstam 2008; everything after is worse at κ = 2 (Blight 4.45, Franze 4.516, Opera de Cribro 4.83)`
- new: `closed for us, not proven unimprovable: unimproved since Diamond–Halberstam 2008 and everything after is worse at κ = 2 (Blight 4.45, Franze 4.516, Opera de Cribro 4.83)`

**Audit 2, row 17, `research/REFUTED.md:43`, HOLD.** A counting slip and a
calibration word; the closure is not in question and the row is long already.

- old: `it rises at all nine levels on a flat ~2.05 per-prime factor, and the divergence is basis-independent, the (h,m) basis worse by a flat 7.26`
- new: `measured rising at all eight steps over nine levels on a flat ~2.05 per-prime factor, and not a basis artifact, the (h,m) basis being strictly more expensive by a flat 7.26`

Note for the ruling: the counting slip half of this is already fixed in the file
by audit 1's APPLY, so what remains open here is only the MEASURED marker and
the basis-independence rewording.

**Audit 2, row 20, `research/REFUTED.md:46`, HOLD.** Adds the calibration the
number carries at its record.

- old: `floor 3.3152, with DP1 carrying 71% of the loss against a measured losing consumer; θ is the only place left to push`
- new: `calibrated floor 3.3152 over 33 readings, error bar 0.62 to 0.98 and not converged, with DP1 carrying 71% of the loss; inside the LP's information class θ is the only place left to push`

**Audit 2, row 25, `research/REFUTED.md:51`, HOLD, and it is a producer fix
first.** The constant 3.594 in `research/attack-beta2-05-covering-prune.js`:370
and :608 is not the root of the equation the same lines declare. Correcting the
row without re-stamping the producer would put the file and the index out of
step, so the producer's header text should be corrected under
`research/qc/embed.js` and the row follow. If both are done: `β_pure diverges
like 7.19 lnln x` becomes `β_pure diverges like 7.18 lnln x`. Nothing else in
the corpus consumes the constant, checked by grep on 7.19 and 3.594.

**Audit 3, line 77, HOLD.** The honest scope is that three of the six named
members (Warnke, Kutin, Kim-Vu) are closed by the divergent-shape argument plus
Bruhn-Joos's own p. 15 assessment, not by having been read at source, and the
record's `[SOURCED-BIB]` tags already say so. The closure is not in doubt.
Held rather than applied because a REFUTED row is a one-line index and
per-member sourcing grades belong in `IMPORT-MAP.md` row 7 and in
`row7-recon.md` §0, where they already are. Chris's call if he wants the index
to carry reading levels; if he does, the clause to add is *"three of the six
named members are SOURCED-BIB, closed by the shape argument rather than at
source"*.

**Audit 4, row 60, line 86, HOLD, for Chris.**

- old: *Möbius-signed weights are Fourier-flat — every mode's share of the factor's mass is ≤ 2.8e−3 against the ≳ 0.4 a usable smooth component needs, and the exact blocking term is the high-frequency remainder of the completed expansion, which keeps 1 − o(1) of the ℓ² mass and is exactly as inadmissible as the original*
- new: `Möbius-signed weights are Fourier-flat: the aggregated low-frequency mass share sits at or below the flat null at every occupied block and at 31 of 31 fixed-s slices (0.57 to 1.15 times the null, median 0.82) where a usable smooth component needs it at scale C̃/K ≫ 100, and the largest single mode, k = 0 included, carries 2.8e−3; the exact blocking term is the high-frequency remainder of the completed expansion, which keeps 1 − o(1) of the ℓ² mass and is exactly as inadmissible as the original`

HOLD, not APPLY, because the fix removes a number (`≳ 0.4`) that two documents
now quote, and whoever removes it should decide at the same time whether
`attack-bilinear-transplant.md:419` is corrected or left as a HELD note with a
rider. The `≳ 0.4` has no derivation at any record; if it is kept it needs one.

**Deferred, audit 1 row 16, `research/REFUTED.md:42`.** Not a HOLD from the
audit, which flagged it APPLY. Deferred here by instruction pending
`redteam-0829-theorem1.md`.

- old: `B ≤ 9A²(E−1) = O((log z)⁸) is a theorem with no hypothesis, published as Opera de Cribro 6.18, and B was never the binding term`
- new: `B was never the binding term, the min taking the B2 branch at every z from 13 to 47; and B ≤ 9A²(E−1) = O((log z)⁸) is unconditional and uniform in s, INFERRED here from published inputs, with Opera de Cribro 6.18 the same shape at s ≥ 9 against this corpus's s in [2.0, 3.4]`

## §3. Owed outside REFUTED.md

Four, none touched by this pass, all raised by an audit and all outside the one
file this pass was allowed to edit.

1. **Producer, `research/attack-beta2-05-covering-prune.js`:370 and :608.** The
   header declares `a` as the root of `a·ln(a/e) = 1` and carries 3.594; audit 2
   computed the root as 3.5911214767 by bisection and notes that `a = 3.594`
   returns 1.00368. The correction is a producer edit that must be re-stamped
   under `node research/qc/embed.js`, and the row 25 rewrite at §2 follows it,
   not the other way round. Audit 2 records the arithmetic as its own and
   unstamped. Nothing else in the corpus consumes the constant.
2. **`history/staging/object-g2-read-0829.md`:296.** Carries the same "per level"
   unit for the greedy-oracle slope that has now been corrected in
   `REFUTED.md`:60. Audit 2 flags it as needing the same fix. It is another
   agent's note and was not read or touched here.
3. **`history/staging/object-bridge-read-0829.md`:77 and :213.** Carry the
   transposed anchored-δ clause ("δ exceeds the forced scale at 2 of 7") that
   audit 3 §2.4 shows is the opposite of the record's table, and that has now
   been corrected in `REFUTED.md`:72. Another agent's HELD note, flagged by
   audit 3 and not touched here.
4. **`TODO.md` Z3's `Ledger:` line.** Audit 4 reports a gate debt declared at
   `attack-z3-immune-01.md`:20-25: the line does not list `Q-z3-immune`, which
   `research/qc/questions.js` enforces. Not fixed here, since `TODO.md` was out
   of scope for this pass.

## §4. Gate and row count

`node research/qc.js` after the edit, 13 checks:

```
refs             0 finding(s)
quotes           0 finding(s)
crosslinks       0 finding(s)
scripts          0 finding(s)
transfers        0 finding(s)
calibration      0 finding(s)
absence          0 finding(s)
sourcing         0 finding(s)
embeds           0 finding(s)
widths           0 finding(s)
ledger           5 finding(s)
provenance       0 finding(s)
search-convention     1 finding(s)
TOTAL            6
```

**refs 0 and crosslinks 0, as required.** The three rewritten record pointers
(`import-bfree.md` §3.2, `import-suen.md` §1 and §4,
`attack-foldL-03-transport.md` §4) all resolve, and so does the
`anchored-note.md` reference the line 72 replacement introduces.

The six findings are all in `TODO.md`, which this pass did not touch, and all
six pre-date it: five `ledger-todo-unlisted` at `TODO.md`:260 (item Z5 not
listing `Q-applied-0828-litimports`, `Q-applied-0828-registries`,
`Q-record-deficit` twice and `Q-redteam-0828-litimports`) and one
`unconventioned-absence` at `TODO.md`:236. None is in
`research/REFUTED.md` and none was introduced by these edits.

**Row count: 67 data rows**, counted as the table lines after the header at
:25 and the separator at :26. Unchanged from before the edit. Every row is one
line; the only row with a pipe count other than six is line 72, whose two
escaped `\|δ\|` pairs are its own and were already there.

## §5. CHANGELOG paragraph, for the orchestrator to append

*(Not appended by this pass. `research/history/CHANGELOG.md` was not edited.)*

**2026-08-29, `research/REFUTED.md`.** Four audits re-derived every closure in
the index against its own record, its producers' embedded output and the
corrections landed through 2026-08-29:
`history/staging/refuted-audit-0829-1.md` (rows 1 to 17),
`-2.md` (rows 17 to 34), `-3.md` (rows 34 to 51) and `-4.md` (rows 51 to 67).
All 67 rows were re-derived and **no route reopened**; the verdicts split 40
SOUND and 30 SOUND-NARROWER, 70 verdicts over 67 rows because the three boundary
rows were audited twice, with zero WEAKENED and zero UNSOUND. Twenty-five row clauses were corrected in place, one verdict word was
widened (the local-lemma row, to name its three separate mechanisms) and three
record pointers were repaired. The corrections that changed a fact rather than a
scope were: the θ ladder row, which had printed a correction running in the
route's favour as a reason the route closed; the anchored-δ row, which had
transposed ρ into δ and stated `|δ| > F` at 2 of 7 levels where the record's
table has `|δ| < F` at 7 of 7; the recognizability-radius row, whose ratio
crosses 1 at x = 11 rather than the row's x = 13; the `u_sup` prior-art row,
whose "the search is finished" is contradicted twice by its own record; the
greedy-oracle row, whose slope is log-log in ln x rather than per level; and the
QR-refinement row, which had presented a reading its record labels POST HOC and
carrying no verdict as though it were the registered result. Seven HOLD items
were left for Chris and are listed in
`history/staging/applied-0829-refuted.md` §2, along with the Lemma V row, whose
rung is deferred to the red team in progress. Four items owed outside the index,
including the producer constant `a = 3.594` that is not the root of its own
declared equation, are at §3 of the same note. `node research/qc.js` returns
refs 0 and crosslinks 0 after the edit, and the table still holds 67 data rows.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
