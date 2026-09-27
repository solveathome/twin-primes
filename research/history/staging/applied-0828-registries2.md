# The queued registry corrections land: four owning-convention rows, five searches-already-run rows, the lambda-1 to lambda-2 comparand corrected in place, and one map count that did not add up to seventeen

<!-- ledger
id: Q-applied-0828-registries2
status: ANSWERED
todo: none
question: Which queued registry corrections were applied?
verdict: 15 edits across four files: SEARCH-CONVENTIONS gains four §1 rows (the census as a pretentious correlation with the Chowla warning, Boolean analysis on the CRT product, covering a cyclic group by translates, the fractional parts of N/n) and five §3 rows, plus one pipe fix that was hiding a clearing phrase from the gate; import-rough-anatomy's λ₁ → λ₂ comparand is corrected in four places, 12–23× becoming 2.11 to 2.86×; lit-dickman-variance §6.3's "row 15" is disambiguated to the drafted row it means; IMPORT-MAP's circularity and payoff tallies are recounted and now sum to seventeen; REFUTED.md needed no edit and got none.
-->

*(2026-08-28. Integration pass over the queue left standing by
`applied-0828-registries.md` §3 and `applied-0828-varE.md` §5. Fence: this pass
edited `research/SEARCH-CONVENTIONS.md`, `research/IMPORT-MAP.md`,
`research/history/staging/lit-dickman-variance.md` and
`research/history/staging/import-rough-anatomy.md`, and wrote only this file.
It ran no git command and did not run `research/qc.js` beyond the single
`search-convention` check, which reads only the file this pass owns. Every
number below is carried from the source notes; none is recomputed here, and the
source notes stay HELD.)*

---

## 0. What is still open after this pass

**Nothing was re-verified.** The `λ₂` figures 0.3403 and 0.2508 and the derived
factor 2.11 to 2.86 are `[SCRATCHPAD-GRADE]` in their own note and stay that
way here. `lit-dickman-variance.md` §9 lists the check that would settle the
residual factor of two, and it has not run: whether the corpus's `χ²/df` is a
variance-to-mean ratio of the same statistic, in the same coordinate, with the
same normalisation as Gorodetsky's `λ`. If it is not, the whole correction
applied below evaporates and the 12–23× reading was not wrong so much as
meaningless.

**The gate has not run in full.** `node research/qc.js search-convention` ran
before and after the `SEARCH-CONVENTIONS.md` edits, with the parsed vocabulary
rising from 83 owning conventions to 100 and no finding anywhere this pass
wrote. No other check ran. **One finding appeared between the two runs and it is not
this pass's**: `unconventioned-absence` at `TODO.md:347`, "nothing in print"
with no owning convention named in the paragraph, in a 2026-08-28 recon bullet
about `β₂` at `κ = 2`. `TODO.md` is outside this fence and was being written
concurrently while this pass ran, its mtime advancing after the last write
here; the absence-phrase total rose from 69 to 70 at the same time, which is a
phrase added to the corpus rather than a clearing phrase lost. Whoever holds
`TODO.md` should cite the conventions file or name the convention in that
paragraph. The ledger guard is the known exposure again: this note's id
is `Q-applied-0828-registries2` with `todo: none`, so no TODO item has to
acknowledge it, but `research/QUESTIONS.md` stays stale for it until
`node research/qc.js --index` runs.

**Four convention rows change what the gate accepts.** §1 of
`SEARCH-CONVENTIONS.md` is parsed at run time, so the four rows added below
widen the clearing vocabulary by 17 phrases. That is the intended effect of a
convention row and it is also the hazard §6 of that file names. Each of the
four names a wording the literature actually uses, and each says in its own
last column that the search in that wording has NOT been run, so no absence
rests on any of them.

**One queue item had no target and was not forced.** Item 2 asked for the
`λ₁ → λ₂` correction to be applied to `research/IMPORT-MAP.md` row 15's landed
status. The live map's row 15 is the fractional-parts row and carries no
Gorodetsky sentence; §3 below says where the sentence actually lives and what
was done with it instead.

---

## 1. The edits, by file

### 1a. `research/SEARCH-CONVENTIONS.md` §1, four rows added and one pipe fixed

| row | what it now says |
|---|---|
| the two-point correlation of the `y`-rough indicator at shift 2 (the census) | the `y`-rough indicator IS `χ₀ mod y#`, so the owning conventions are "correlations of multiplicative functions", "pretentious multiplicative functions", the Halász–Montgomery–Vaughan distance, and for the short-interval half "multiplicative functions in short intervals". Carries the warning the queue asked for: the object is on the pretentious side of the dichotomy, the Chowla / Elliott / entropy-decrement side hypothesises the opposite, so a negative searched there is guaranteed and worthless, the same trap as the existing `level of distribution` row. Carries the Matomäki–Radziwiłł locator caveat (the arXiv record prints no volume and no pages) and the almost-all quantifier. NOT SEARCHED as of 2026-08-27. Source: `import-entropy-decrement.md` §9 |
| the depth-`J` truncation of the tile's inclusion–exclusion on the CRT product | owning conventions are the Hoeffding, Sobol–ANOVA and Efron–Stein decompositions, the Fourier–Walsh expansion and "low-degree function on a product space", with the small-alphabet caveat owned by lambda-biased hypercontractivity and global functions. Carries the equivariance reason the field cannot reach the anchor. Records that the Hoeffding/ANOVA identification is already folklore inside this corpus, and that whether depth-equals-degree is in print in the SIEVE literature is not searched. Source: `import-boolean-analysis.md` §4 |
| the set relaxation of the covering optimum, `τ_set` | owning conventions are "covering a finite abelian group by translates of a set", "covering code" and the Rogers–Stein covering bound; the group is the CRT product and the interval case, which is ours, is the max gap of `D` and is A144311. NOT SEARCHED as of 2026-08-27. Source: `import-vc-nets.md` §§4, 8 |
| the distribution of the fractional parts of `N/n` and `N/p` | owning conventions are "the distribution of the fractional parts of x/n", "fractional parts of x/p over primes" and van der Corput's method of exponential sums; the statistic is Saffari–Vaughan's `Θ*_{x,y}(α)` read at `x = W/M_T`, `y = √W`, `α = j/M_T`, and the range condition `x^{6/11+ε} < y ≤ x` reads `W^{1/12} < M_T ≤ √W`, which is why map row 15's THEOREM column is struck. Records that `Saffari` appears nowhere in this repository outside map row 15 and that the novelty question is not searched. Source: `import-fracparts.md` §6 |

**The pipe fix, and why it is not cosmetic.** The variance row added earlier
today carried `∏_{p\|q}` inside its OWNING column. The gate splits that table
on `|` without honouring the backslash, so the row parsed as six cells and
everything after the escaped pipe fell into the `where it lives` column, from
which no clearing phrase is taken. The consequence was that **"the distribution
of `k`-tuples of reduced residues", the owning convention that row exists to
record, was not in the clearing vocabulary at all.** The product is now written
without a pipe and the phrase parses. Three older rows (the `L²` spread row,
the adjacent-kill row, the thinning row) have the same shape and were left
alone: they are outside this queue, and each still yields its lead phrase from
the surviving fragment of its OWNING cell.

### 1b. `research/SEARCH-CONVENTIONS.md` §3, five rows added

The five drafted at `lit-dickman-variance.md` §6.2, which
`applied-0828-registries.md` §3 left: the `θ = 2` short-interval sifted
variance asymptotic is not in print on six calibrated channels with four legs
owed; Gorodetsky names neither `GD(θ)` nor sieve dimension nor tuples;
Montgomery–Soundararajan supply no sieve-level analogue; Gorodetsky's paper has
one citing work across three citation indexes and it is a bootstrap-diagnostics
statistics paper; and "twin smooth" and "pairs of rough numbers" are false
friends, with the arXiv-web-search caveat that voids any negative on a query
containing "rough". Each row carries its 2026-08-28 date, since the table's
header dates its rows 2026-08-18 unless noted. §3 is read by people and not by
the check, so nothing in the gate turns on them.

### 1c. `research/history/staging/import-rough-anatomy.md`, four places corrected

The `λ₁ → λ₂` comparand correction, from `lit-dickman-variance.md` §0 and §6.3
as corrected by that note's §4:

| place | old reading | new reading |
|---|---|---|
| §0, item 6's headline | the published theory "misses its size by an order of magnitude" | it misses by a factor of two to three once the right member of its family is used |
| §0, item 6's closing figures | `λ(2.317) = 0.0515` against `χ²/df = 0.718`, a factor 13.9, and 12.0 to 22.7 across six bands | Gorodetsky's theorem excludes one class per prime, so his `λ` is `λ₁` while the census counts rough pairs and its comparand is `λ₂`; `λ₂` reads 0.3403 and 0.2508 at the corpus's band coordinates `s = 2.317` and `s = 2.608` against the same 0.718, a factor of **2.11 to 2.86**; the like-for-like `λ₁` figures at 0.718 are 13.9 and 25.2, and the 22.7 first recorded here is a six-band maximum attaching to a different band's `χ²/df`, so it is not the comparand; the shrinkage is 6.6 to 8.8× and **does not close**; the verdict, that the transplant is invalid or the objects differ and either way the constant is not derived, is unchanged |
| §8.1, the DRAFTED map row's status cell | "his `λ(s)` is 12–23× below the measured `χ²/df`" | his `λ` is `λ₁`, the census's comparand is `λ₂`, and that sits 2.11 to 2.86× below, with the correction and its date named in the cell |
| §8.4, the drafted `SEARCH-CONVENTIONS.md` §3 row | the same 12–23× | the same correction, so the row cannot carry the superseded figure into the live file if it is ever applied |
| §9, the NOT REACHED bullet pointing at §0.6 | "§0.6's 12–23× mismatch" | "§0.6's residual mismatch, 2.11 to 2.86× as corrected" |

The `λ₂` values stay `[SCRATCHPAD-GRADE]` in every one of those cells, and the
direction of the correction is downward: it makes the note's disagreement with
the literature smaller, not larger.

### 1d. `research/history/staging/lit-dickman-variance.md` §6.3, disambiguated

The section head and its opening paragraph now say which row they mean. The
live map's row 15 is the fractional-parts row, landed 2026-08-28, and carries
no Gorodetsky sentence; the row meant is the one numbered 15 in
`import-rough-anatomy.md` §8.1, drafted there and never applied, whose number
the fractional-parts row took. The paragraph names the four places the figure
sat and records that all four were corrected in place today, so the amendment
sentence below it is spent and is kept as the wording that was applied.

### 1e. `research/IMPORT-MAP.md` §2, the Counts paragraph

**Verified and unchanged:** seventeen rows; seven EXACT-IDENTITY (1, 2, 3, 11,
14, 15, 17) and ten STRONG-ANALOGY (4, 5, 6, 7, 8, 9, 10, 12, 13, 16), which is
the seventeen; twelve CLEAN and three TPC-STRENGTH under the file's own
convention of grading a cell by the grade it leads with. §0's calibration-set
sentence (five imports, carried as the calibration set) and §0a's four-added
rows sentence are both correct against the table and were left alone.

**Corrected, because the tallies did not sum to seventeen and two were wrong:**

| count | old reading | new reading |
|---|---|---|
| circularity | "twelve CLEAN, three TPC-STRENGTH (rows 2, 5, 7; rows 2, 4 and 15 carry split cells), zero CIRCULAR", which sums to fifteen and omits row 14 | twelve CLEAN, three TPC-STRENGTH (rows 2, 5, 7), two SPLIT (rows 14 and 15), which is the seventeen; no row is graded CIRCULAR outright, though row 14's split half is CIRCULAR in any proof chain; four cells are split rather than single, rows 2, 4, 14 and 15, and rows 2 and 4 are counted under the grade they lead with |
| payoff as priced | "four THEOREM, five DERIVED-CONSTANT, nine WALL-ADDRESS, five PUBLISHED-ANCHOR, four CLOSURE" | counted as the payoff column now reads: three THEOREM (rows 1, 9, 13), four DERIVED-CONSTANT (rows 1, 2, 4, 7), ten WALL-ADDRESS, six PUBLISHED-ANCHOR, four CLOSURE, with the note that row 15 was priced with a THEOREM before the range exponent was read at the page image, so the as-first-priced THEOREM count was four, and that row 16's cell names DERIVED-CONSTANT only to say it is **not** banked, so it is not counted |

Three of those five were wrong for one reason each. The old WALL-ADDRESS and
PUBLISHED-ANCHOR figures were the pre-row-14 tallies with rows 15 to 17 added
and row 14 never picked up, so each was short by exactly row 14's contribution.
The old DERIVED-CONSTANT figure counted row 16, whose cell contains the string
only in a negation.

---

## 2. What is not claimed

No route opened, no exponent moved, no measurement was made. The one number
that moves is the rough-anatomy note's mismatch against Gorodetsky, and it
moves toward the literature and still does not close. Four convention rows are
added and not one of them carries a search, so the corpus now knows where to
look on four objects and has looked on none of them.

---

## 3. Declined, with reasons

- **The `λ₁ → λ₂` correction to `research/IMPORT-MAP.md` row 15.** No target
  exists. The live row 15 is the fractional-parts row; the sentence the queue
  quotes lives in `import-rough-anatomy.md`, where it is now corrected (§1c),
  and the reference that pointed the queue at the map is now disambiguated
  (§1d). Applying the sentence to the fractional-parts row would have written
  Gorodetsky into a row about Saffari–Vaughan.
- **A `SEARCH-CONVENTIONS.md` §1 row for sieved sets in short intervals.**
  Already there: the `θ`-class sifted-count variance row landed earlier today
  and owns that object at `θ = 1` and at `θ ≥ 2`. The separate candidate from
  `import-repulsive.md` §7 is an amendment to the existing hyperuniformity
  row's "no sieved-set instance exists, searched" rather than a new row, and it
  is still blocked behind the GLOSSARY holder's sub-Poisson decision, exactly
  as `applied-0828-registries.md` §3 recorded. Not applied.
- **A `SEARCH-CONVENTIONS.md` §1 row for the next-order term of a rough-number
  count** (de Bruijn's `μ_y(u)`), drafted at `import-rough-anatomy.md` §8.4.
  Not in the queue, not applied.
- **Any edit to `research/REFUTED.md`.** Today's two rows, the repulsive
  point-process closure and the QR refinement of the anchored-cap transplant,
  both carry the table's five columns in the right order, both are dated
  2026-08-28, and both name a record. The file has no header count sentence, so
  there is nothing to keep in step. The queue said add nothing else, and
  nothing else was added. One older row, the anchored-`δ` row of 2026-08-19,
  splits into seven fields on a naive counter because its `\|δ\|` escapes render
  as literal pipes; it renders correctly and no check parses this table, so it
  was left.
- **Three older `SEARCH-CONVENTIONS.md` §1 rows with the same pipe shape as the
  one fixed in §1a.** Outside the queue and outside today's writing; each still
  yields its lead clearing phrase. Listed here so the next holder of that file
  can decide.

---

## 4. What would falsify this pass, and whether that check has run

- **A convention row was written in words the literature does not use.**
  Falsified by comparing each row against its source note's draft. **RUN**, by
  the agent that made the edits; the census, covering and Boolean rows are the
  source drafts with the queue's additions folded in, and the fractional-parts
  row is written here from `import-fracparts.md` §6, which drafted the object
  and the anchors but no row.
- **A table broke, or the gate stopped parsing.** Falsified by re-parsing §1
  with the gate's own splitter and by re-running the check. **RUN**: the four
  new rows parse at exactly five cells, `search-convention` reads 0 findings
  before and after, and the parsed vocabulary rises 83 to 100.
- **A recounted tally is still wrong.** Falsified by recounting from the table.
  **RUN**, mechanically, over the `fit`, `circularity` and `payoff` columns of
  all seventeen rows; row 5's cells were read by hand because unescaped pipes in
  its moiré-object cell defeat a naive split.
- **The `λ₂` comparand is the wrong reading.** **NOT RUN**, and it cannot be
  run here: it needs the corpus's census definition read at its producer, which
  `lit-dickman-variance.md` §9 records as NO.
- **The fence was breached.** **NOT RUN**: checking it means a git command and
  the fence forbids one. Every write named one of the five paths in the header.

---

## 5. CHANGELOG entry text

*(For `research/history/CHANGELOG.md`, appended by the primary agent. Not
written by this pass.)*

> **2026-08-28, registries, second pass.** The convention and import registries
> take the corrections the first pass left at the door.
> `research/SEARCH-CONVENTIONS.md` §1 gains four owning-convention rows: the
> rough-pair census as a two-point correlation of `χ₀ mod y#`, whose owning side
> is pretentious multiplicative functions and whose Chowla / Elliott side is
> recorded as a guaranteed-and-worthless negative
> (`history/staging/import-entropy-decrement.md` §9); the Bonferroni depth
> truncation as a low-degree function on the CRT product, with the equivariance
> reason no theorem in that field reaches the anchor
> (`import-boolean-analysis.md` §4); the set relaxation `τ_set` as covering a
> finite abelian group by translates, with the Rogers–Stein bound and A144311 as
> the interval case (`import-vc-nets.md` §§4, 8); and the fractional parts of
> `N/n` and `N/p` as Saffari–Vaughan's `Θ*`, with the range condition that
> strikes map row 15's THEOREM column (`import-fracparts.md` §6). All four
> record that no search has been run in the named convention. §3 gains the five
> searches-already-run rows drafted at `lit-dickman-variance.md` §6.2. One
> escaped pipe in the variance row added earlier the same day was hiding "the
> distribution of `k`-tuples of reduced residues" from the gate's parser and is
> removed; the parsed vocabulary reads 100 owning conventions against 83 before,
> and `search-convention` stays at 0 findings.
> `history/staging/import-rough-anatomy.md` has its comparand corrected in four
> places: Gorodetsky's `λ` is the one-class `λ₁` and the census's comparand is
> `λ₂`, so the recorded 12–23× mismatch becomes 2.11 to 2.86× against the
> like-for-like `λ₁` figures 13.9 and 25.2, the 22.7 is a six-band maximum on
> another band and not the comparand, and the shrinkage of 6.6 to 8.8× does not
> close the gap (`lit-dickman-variance.md` §§0, 4, 6.3; `λ₂` values
> `[SCRATCHPAD-GRADE]`). `lit-dickman-variance.md` §6.3's "IMPORT-MAP row 15" is
> disambiguated: it means the row numbered 15 in `import-rough-anatomy.md` §8.1,
> drafted and never applied, not the live map's fractional-parts row.
> `research/IMPORT-MAP.md` §2's Counts paragraph is recounted: the circularity
> tallies summed to fifteen and omitted row 14's split cell, and the payoff
> tallies had missed row 14 entirely while counting row 16's negated
> DERIVED-CONSTANT, so they now read three THEOREM, four DERIVED-CONSTANT, ten
> WALL-ADDRESS, six PUBLISHED-ANCHOR, four CLOSURE, with row 15's struck THEOREM
> noted as an as-first-priced fourth. The seventeen-row, seven EXACT-IDENTITY,
> ten STRONG-ANALOGY and twelve CLEAN figures were verified against the table and
> stand. `research/REFUTED.md` was checked and needed no edit: today's two rows
> carry the right five columns and the file has no count sentence.
> Record: `history/staging/applied-0828-registries2.md`.

---

*This document states current understanding at 2026-08-28. The source notes
remain HELD. Nothing here was measured; every figure is carried from the note
named beside it.*
