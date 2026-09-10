# Coherence pass across the 2026-08-29 live-layer edits: 24 facts, 16 live disagreements, 11 mechanical

<!-- ledger
id: Q-coherence-0829
status: ANSWERED
todo: none
question: After the 2026-08-29 edits, does every live document state each changed fact the same way, and do the papers still agree with the notes?
verdict: 24 changed facts checked at 63 live-layer sites: 16 live disagreements (11 APPLY, 5 HOLD) plus one count error inside a HELD note; the worst is the localized band 2.9 to 4.2 attributed to "two engines" when only one of the two reads it, the other reading 2.14 to 4.39; qc.js 1 finding, in a file another agent holds; audit-numbers 251/251.
-->

**Status: HELD, staging, 2026-08-29.** This is a COHERENCE pass, not a red team.
It checks the live layer against itself and against the records the day's
changelog entries name. It adjudicates no claim on its own merits and it
re-derives nothing.

**Fence observed.** One file written, this one. No existing file edited. No git
command run. `research/zonegap-01.js`, `research/zonegap-04-sweep-1e12.js` and
`research/history/staging/zonegap-03-score.md` were not touched; the qc finding
that lands on the second is reported and not investigated. Two scripts were
run, both read-only gates: `node research/qc.js` and
`node research/audit-numbers.js`.

**Scope.** The four 2026-08-29 entries of `research/history/CHANGELOG.md`
(lines 15 to 253), read in full; the live layer as the brief lists it; `paper/`
as the brief lists it; and, as records only, the HELD notes each entry cites.

---

## 0. Verdict, the disagreements first

**24 changed facts checked, at 63 live-layer sites. 16 disagreements stand in
the live layer, 11 of them mechanical and 5 needing Chris or a second reader.
One further count error sits inside a HELD note.** Nothing found here moves an
exponent, opens a route, or changes a rung. The gates are green apart from one
finding in a file another agent is editing.

**The worst, and it is one defect in two files.** The localized band was
corrected in five documents on 2026-08-29 to 2.9 to 4.2, and two of the five
attribute that band to **both** engines that measured the object.
`research/ZONE-POSTULATE.md`:246 says "2.9 to 4.2 on its two engines" and :281
says "between 2.9 and 4.2 on the two engines that measured it". The audit that
forced the correction says the opposite in its own finding: the two engines
read **2.93 to 4.20 and 2.14 to 4.39**
(`audit-cross-document-constants.md` A6, which prints both spans and says
"two engines give 2.93-4.20 and 2.14-4.39; the headline band quoted in four
documents is narrower than either"). The corrected band is one engine's, quoted
as two. `research/FOLD-PROFILE.md` carries the same defect in a sharper form:
line 604 states "M(x, x²) ~ 2.9 to 4.2·ln³x" and line 614, ten lines below,
prints that file's own engine reading **2.14, 3.85, 4.39, 3.44, 3.33**. Two of
the five readings printed beneath the band sit outside it. This is the exact
failure class A6 names in its own lessons list, "a stated band against the table
printed beside it", reproduced by the fix for it.

**Second, and mechanical.** `research/ZONE-POSTULATE.md`:114 still carries
"ratios 2.00 to 8.55" for `G2 ≥ g` where `research/THE-DIALS.md`:294 carries
"1.00 to 8.55" and `G2-STATE.md` §2's own table prints `G2/h = 1.00` at
`x = 2`. The 2026-08-29 edit dropped the stale count ("ten shared terms") and
raised 8.00 to 8.55 but left the lower endpoint at the old value.

**Third, and the one a reader would trip on.** `research/IMPORT-MAP.md` gained
rows 20 and 21; §2's preamble was amended to explain them, and the
"Counts (recounted 2026-08-28)" paragraph below the table was not. It still
reads "Seventeen rows, none UNTRIED" and tallies fits, circularity grades and
payoffs over seventeen, against a table that now holds nineteen.

**What is clean.** The tail's unit, the Z₂ band means, the x = 37 sentence, the
exponent's provenance independence, the Lemma V rung, the L = 1 rung, the
Euclid anchor's symbol, the factor-81 rider, the constant-shift wording, Z₂'s
routing, the 7.182 constant in the two markdown sites, the "≳ 0.4" replacement,
the Kourbatov bracket, the smooth-divisor row, and IMPORT-MAP rows 20 and 21
against the recon note and its red team, all agree across every site that
states them.

**The papers.** No contradiction found. `paper/wall-note.md` §2's opening
paragraph already states the exemption exactly as
`object-bridge-read-0829.md` §5 does, including the narrowing to Door 5 and the
exclusion of any sieve-weighted route. Two things the bridge note establishes
are absent from both papers rather than contradicted: the flat statement that
**no separation theorem exists on either side**, and the **grading of the three
killers** (killer 2 the theorem, killer 3 a measured pattern, killer 1 the
heuristic). Both would be one sentence each. Both are HOLD: moratorium, and the
prose is Chris's.

---

## 1. The fact-by-fact table

Sites read per fact are counted, not listed, where they agree.

| # | fact, as today's entries left it | sites | verdict |
|---|---|---|---|
| 1 | the localized band 2.9 to 4.2 | 5 | **DISAGREE** (D1, D2, D3) |
| 2 | the worst case `x²/(4.2 ln³x)`, 3.5 the midpoint | 5 | AGREE at all five (`ZONE-POSTULATE`:283, :555; `maxgap-law`:531; `LOCALIZED-GAP`:132; `FOLD-PROFILE`:604; `TODO`:58); the constant itself is D3 |
| 3 | the `M(x, x²)` label where `M(x, x′²)` stood | 6 | AGREE on the object. `FOLD-PROFILE`:575, :590, :614 keep `M(x, x′²)` correctly: `fold-profile-08-zone-localized-gap.js`:108 sets `Y = xp*xp` with `xp` the next prime, so that engine does measure `x′²`. The label split is right; what is wrong is the band carried across it (D2) |
| 4 | the tail's unit and coefficient | 1 | AGREE. `TODO`:55 carries both units, `(0.58..0.77) ln²(p′²)` = `(2.4..3.1) ln²p`, cited to `zone-tail-01.md` §3. No other live site states the tail law, so nothing can disagree |
| 5 | the tail coefficient 0.7522 at the top band | 2 | AGREE. `TODO`:237 against `zone-tail-02-0829.md`; HL's 0.7574 quoted as contained, not derived. `IMPORT-MAP` row 14's 0.7574 is the same published constant in its own convention |
| 6 | the Z₂ line and band constants | 1 | AGREE with `zonegap-03-score.md`: 78,497 zones to 1e12, `D ≡ 0`, means 3.43 / 3.68 / 4.02 / 3.93, non-monotone, the unmeasured decade and the unscored 4.18 both named (`TODO`:49-56). The old "(3.4..4.0) drifting" survives nowhere. But see D5 |
| 7 | G₂/Z₂ to 22 levels, 8.14 at x = 79 | 0 | AGREE by absence, and deliberately: no live document carries a G₂/Z₂ figure. The object sits in `object-bridge-read-0829.md`:270 and the HELD Z₂ draft, which is where Z₂'s routing (fact 15) sends it. `ZONE-POSTULATE`:266's "G₂/F, measured at roughly 7" is a different ratio (F is the zone head, `GLOSSARY`:95) and is not in conflict |
| 8 | `G2 ≥ g`, 22 shared terms, max 8.55 at x = 79 | 3 | **DISAGREE** on the lower endpoint (D4). The count 22 and the maximum 8.55 agree at all three |
| 9 | the x = 37 sentence | 3 | AGREE at `G2-STATE`:385-395 (three ratios sharing `G2(37#) = 528`, nine G₂-free instruments reading nothing high, `z = +6.58` the survivor) and at `TODO`:639 (c₂′ outlier). **DISAGREE** at `TODO`:505 (D11) |
| 10 | the exponent's provenance independence | 1 | AGREE. `G2-STATE` §6.1 :1055-1062 carries 1.533 custody-only, 1.498 all-22, block moves ≤ 0.035, control range 0.932 to 1.233, marked MEASURED and cited. Consistent with the changelog and with `measure-g2-provenance-0829.md` §3 |
| 11 | Lemma V's rung | 4 | AGREE where stated: `G2-STATE` §0:37-45 (mean-square PROVEN, unconditional, any `\|λ_d\| ≤ 1`; L1-L5 PROVEN, a period mean not a supremum, Lemma V proper untouched), `G2-STATE`:1163, `REFUTED`:42 (Opera de Cribro 6.18 "a published neighbour ... at s ≥ 9", not the source), `README`:79. **OMISSION** at `GLOSSARY`:449 (D13) |
| 12 | "prove window/G₂ is unbounded" carries the i.o.-Gap-Reformulation label | 2 | AGREE on the label at `ZONE-POSTULATE`:545 and `G2-STATE`:1234. **DISAGREE** on the pointer after the §8 fold (D6) |
| 13 | `ZONE-POSTULATE` §3's shared-term count | 1 | the count was fixed; the ratio was not (D4) |
| 14 | the L = 1 equivalence's rung | 2 | AGREE. `ZONE-POSTULATE`:340-345 and `REFUTED`:74 both state PROVEN EQUIVALENT with `T* = G₂` MEASURED at four of four windows and both name the measured equality as the operative direction |
| 15 | the Euclid anchor's symbol | 2 | AGREE. `TODO`:37-41 states it for `F(p)`; `zonegap-02-reduction.md`:122-123 states `F` unconditionally with the head form as the conditional corollary |
| 16 | the factor-81 ensemble rider | 2 | AGREE. `paper/anchored-note.md`:152-156 and `paper/wall-note.md`:261-270 both carry the mixed-ensemble warning and the same self-consistent readings, e^3025 at x = 19 in the window ensemble and 1,682 at x = 17 in the rotation ensemble |
| 17 | the constant-shift wording | 1 | AGREE. `README`:175-178 states the value `d = 2` as the structure and the constant-shift form as not structure, cited to `measure-g2-generic-0829.md` §1c and marked proven |
| 18 | Z₂'s routing | 3 | AGREE. `ZONE-POSTULATE`:44-52 disowns Z₂ and routes to the HELD draft; `research/README.md`:43 and :76 do the same in both tables, with promotion marked open |
| 19 | the covering-economy constant 7.182 | 3 | AGREE in the markdown (`REFUTED`:51 with the superseded 7.19 named, `sift-limit-attack`:524, both on `a = 3.5911`). **DISAGREE** inside `attack-hybrid-bound.js` (D12) |
| 20 | the "≳ 0.4" replacement | 1 | AGREE. `REFUTED`:86 now states the ratio criterion `C̃/K ≫ 100` with the measured shares beside it; no live site carries the underived 0.4 |
| 21 | Kourbatov's b as a bracket | 2 | AGREE. `TODO` Z5 clauses (a) to (e) match `measure-record-null2-0829.md` §8 and the generated `QUESTIONS.md` row: law-dependent, +0.1113 and −0.0060, 16.1% to 25.1%, residual 0.78 to 0.97 at 3.2 to 4.2 sd, shape open at 1.6 sigma. **DISAGREE** on the stale owed-checks sentence (D10) and against `IMPORT-MAP` row 16 (D14) |
| 22 | the sub-Poisson rough-pair reading, weakened | 2 | **DISAGREE** (D8). The note carries the correction; `TODO` does not |
| 23 | TODO Z4 / Z5 / Z7 against the notes they cite | 3 | Z4 AGREE on the tail law, t/R, independence and the win clause; **DISAGREE** on the bootstrap interval's custody (D9). Z5 as fact 21. Z7 AGREE on substance, **DISAGREE** on numbering (D16) |
| 24 | IMPORT-MAP rows 20/21, PRIOR-ART, escapes, SEARCH-CONVENTIONS | 4 | rows 20 and 21 AGREE with `recon-0829-farfields2.md` §§3c, 3e, 5, 6, 7 and `redteam-0829-measure-c.md` §§1h, 4c, 5g, including the SCRATCHPAD-GRADE marker on 2.82/ln z and the demotion of the anchor to the product form plus values plus rate. The sixteen escape labels landed inside the HELD note, so nothing crosses into the live layer. The smooth-divisor row AGREES with `lit-scourfield-2008.md` §0 and §8 row 8 and with `lit-smooth-divisors.md` §5 on all four axes. **DISAGREE** on the counts paragraph (D7) and on the REFUTED row count inside the escapes note (D15) |

---

## 2. The disagreements, with old → new

Grades: **APPLY** is mechanical, the record settles it and no judgement is
needed. **HOLD** is Chris's prose, a paper under moratorium, or a call about
which number is the right one.

### D1. The localized band attributed to two engines when it is one engine's, APPLY

- `research/ZONE-POSTULATE.md`:246: "**different object** from §5's localized `M(x, x²)/ln³x`, 2.9 to 4.2 on its two engines:"
- `research/ZONE-POSTULATE.md`:280-283: "sits between 2.9 and 4.2 on the two engines that measured it over a 47-fold range"
- against `research/history/staging/audit-cross-document-constants.md` A6: "Two engines give 2.93–4.20 and 2.14–4.39; the headline band quoted in four documents is narrower than either."

**Which side is right.** A6, on its own printed tables. The 2.9 to 4.2 span is
`maxgap-law.md` §8's table (x = 211 to 9973, seven rows, span 2.925 to 4.202).
The second engine is `FOLD-PROFILE.md` §12a's row at :614, produced by
`research/fold-profile-08-zone-localized-gap.js`, span 2.14 to 4.39 over
x = 101 to 4001. The "47-fold range" also belongs to the first engine only;
the second spans 40-fold.

**Old → new**, `ZONE-POSTULATE.md`:246:

> old: `2.9 to 4.2 on its two engines:`
> new: `2.9 to 4.2 on the engine that measures it directly to x = 9973 (maxgap-law.md §8; the second engine, FOLD-PROFILE.md §12a, reads 2.14 to 4.39 over a shorter range):`

**Old → new**, `ZONE-POSTULATE.md`:280-281:

> old: `sits between 2.9 and 4.2 on the two engines that measured it over a 47-fold range`
> new: `sits between 2.9 and 4.2 over a 47-fold range on the engine that measures it directly (maxgap-law.md §8), and between 2.14 and 4.39 on the second engine over a 40-fold range (FOLD-PROFILE.md §12a)`

### D2. FOLD-PROFILE states one engine's band ten lines above the other engine's table, APPLY

- `research/FOLD-PROFILE.md`:604: "localized: M(x, x²) ~ 2.9 to 4.2·ln³x against x′², **margin ~ x²/(4.2 ln³x) at the worst case → ∞** (band corrected 2026-08-29, `audit-cross-document-constants.md` A6)"
- `research/FOLD-PROFILE.md`:613-615: "Measured directly to x = 4001, M(x, x′²)/ln³x reads 2.14, 3.85, 4.39, 3.44, 3.33 at x = 101, 499, 1009, 2003, 4001, flat with no trend."

**Which side is right.** Both, on their own objects; the file does not say so.
Two of the five readings at :614 (2.14 and 4.39) sit outside the band the file
asserts at :604, and a reader has no way to tell that :604 quotes a different
producer. The fix is attribution, not a number change.

**Old → new**, `FOLD-PROFILE.md`:604:

> old: `> localized: M(x, x²) ~ 2.9 to 4.2·ln³x against x′², **margin ~ x²/(4.2 ln³x) at the worst case → ∞** (band corrected 2026-08-29, `audit-cross-document-constants.md` A6)`
> new: `> localized: M(x, x²) ~ 2.9 to 4.2·ln³x against x′², **margin ~ x²/(4.2 ln³x) at the worst case → ∞** (band corrected 2026-08-29, `audit-cross-document-constants.md` A6; that band is `maxgap-law.md` §8's engine, and this file's own engine at §12a below reads 2.14 to 4.39 on the x′² window)`

### D3. The "honest worst case" 4.2 excludes the 4.39 its own audit prints, HOLD

A6 concludes "the honest worst case on this data is **x²/(4.2 ln³x)**" while
the same finding prints 4.39 from the second engine two paragraphs above. On
the data as A6 states it, the worst case across both engines is
`x²/(4.4 ln³x)`, not `x²/(4.2 ln³x)`. Five live sites carry 4.2
(`ZONE-POSTULATE`:283, :555; `maxgap-law`:531; `LOCALIZED-GAP`:132;
`FOLD-PROFILE`:604) and `TODO`:58 carries it as the tile-localized figure.

**HOLD, and it is a judgement, not an error.** 4.2 is defensible if the
`maxgap-law` engine is the trusted one and the FOLD-PROFILE row is treated as
a coarser sample; it is not defensible as "the honest worst case on this data"
with 4.39 on the page. The choice is between (a) restating 4.2 as the trusted
engine's worst case, and (b) moving five sites to 4.4. **A6 itself is the
document that has to decide, and it went the other way nine days after
computing both spans.** Recommend a one-clause scoping in A6 first, then the
five sites follow it mechanically.

### D4. `G2 ≥ g`, the ratio's lower endpoint, APPLY

- `research/ZONE-POSTULATE.md`:113-115: "VERIFIED at every shared term of the trusted ladders, **ratios 2.00 to 8.55**; the count and the ratio table live at `G2-STATE.md` §2"
- `research/THE-DIALS.md`:293-294: "VERIFIED at all 22 shared terms of the trusted ladders, **ratios 1.00 to 8.55**"
- `research/G2-STATE.md`:343-356, the `G2/h` column: 1.00, 1.50, 2.00, 3.00, 3.00, 3.00, 4.15, 4.41, 5.10, 5.61, 6.00, 8.00, 7.38, 6.87 on the exact ladder

**Which side is right.** THE-DIALS, on G2-STATE's own table: `G2/h = 1.00` at
`x = 2`. The 2.00 is the value at `x = 5` and was the old ten-term reading's
floor. The 2026-08-29 edit updated the count and the maximum in this bullet and
left the minimum.

**Old → new**, `ZONE-POSTULATE.md`:114:

> old: `ratios 2.00 to 8.55;`
> new: `ratios 1.00 to 8.55;`

### D5. The zone-side margin denominator 3.9 against TODO's own band means, HOLD

- `TODO.md`:56-59: "Margin diverges like p²/(3.9 ln³p) — **budget, never evidence** (3.9 is the zone-side figure on 27,292 zones; the tile-localized worst case is x²/(4.2 ln³x) ...)"
- `TODO.md`:51-54, five lines above: "band means c3 = Z₂/ln³p read 3.43 (10²), 3.68 (10³), **4.02** (10⁴), 3.93 ([1e5, 3.16e5)) ... the sealed model predicts **4.18 ± 0.13**" in the unmeasured decade

**The inconsistency is one of method, not of arithmetic.** The tile side was
moved on 2026-08-29 from the midpoint to the maximum (A6's whole point). The
zone side still carries 3.9, which is the 1e11 figure inherited from
`zonegap-01.md` and is below the largest measured band mean (4.02) and well
below the sealed-but-unscored 4.18. For a margin `p²/(c ln³p)` the worst case
takes the largest `c`.

**HOLD.** Two judgements are entangled: whether the unscored 4.18 may enter a
worst case at all, and whether the zone-side and tile-side constants are one
object, which `TODO`:59-60 explicitly says is not settled. Recommended, if
Chris takes it: `p²/(3.9 ln³p)` → `p²/(4.0 ln³p)` on measured bands only, with
the 4.18 named as unscored and excluded. Not applied here.

### D6. Two pointers cite `ZONE-POSTULATE` §8 item 4 for text that is now item 3, APPLY

`ZONE-POSTULATE.md`:551-553 now reads "4. (Folded into item 3 on 2026-08-29;
the numbering is kept so older pointers to '§8 item 4' resolve.)" The
window/G₂ sentence moved into item 3 at :544-550.

- `research/G2-STATE.md`:1234-1235: "**4. Prove that window/G2 is unbounded.** `ZONE-POSTULATE.md` §8 item 4."
- `research/two-class-lower-bounds.md`:1066: "real evidence for ZONE-POSTULATE §8's item 4, \"a proof that the window/G₂ ratio is unbounded\""

**Which side is right.** ZONE-POSTULATE, which owns §8. The quoted string now
lives at item 3. The stub keeps the pointers resolving to a place, but both
sites send a reader to a line that no longer states the thing.

**Old → new**, `G2-STATE.md`:1235:

> old: ``ZONE-POSTULATE.md` §8 item 4.`
> new: ``ZONE-POSTULATE.md` §8 item 3 (folded there from item 4 on 2026-08-29).`

**Old → new**, `two-class-lower-bounds.md`:1066:

> old: `ZONE-POSTULATE §8's item 4, "a proof that the window/G₂ ratio is unbounded"`
> new: `ZONE-POSTULATE §8's item 3, "a proof that the window/G₂ ratio is unbounded" (item 4 until 2026-08-29)`

### D7. IMPORT-MAP's counts paragraph was not recounted with rows 20 and 21, APPLY

- `research/IMPORT-MAP.md`:176 onward: "**Counts (recounted 2026-08-28).** Seventeen rows, none UNTRIED ... Fits: seven EXACT-IDENTITY ... ten STRONG-ANALOGY ... twelve CLEAN, three TPC-STRENGTH (rows 2, 5, 7), two SPLIT (rows 14 and 15), **which is the seventeen**"
- against the table at :156-174, which now runs 1 to 17, 20, 21, which is nineteen rows

**Which side is right.** The table. §2's preamble at :142-151 was amended on
2026-08-29 and explains the numbering and the reserved 18 and 19, but it
addresses only the landing count; the fit, circularity and payoff tallies below
the table still sum to seventeen. Row 20's fit cell reads STRONG-ANALOGY with a
SPLIT circularity; row 21's reads EXACT-IDENTITY with CLEAN. Neither is in any
tally. `applied-0829-registries.md`:29 records the preamble amendment and does
not claim the counts paragraph.

**Old → new**, `IMPORT-MAP.md`:176 (a scoping clause is the cheap fix; a
recount is the thorough one):

> old: `**Counts (recounted 2026-08-28).** Seventeen rows, none UNTRIED:`
> new: `**Counts (recounted 2026-08-28; the seventeen original rows only, since rows 20 and 21 were added 2026-08-29 at recon grade and are not counted as landings; their own cells are STRONG-ANALOGY/SPLIT and EXACT-IDENTITY/CLEAN).** Seventeen rows, none UNTRIED:`

### D8. The rough-pair dispersion quoted against the reference the note retired, APPLY

- `TODO.md`:170-172: "the scatter is sub-Poisson at χ²/df = 0.546–0.785 fit-free"
- `research/history/staging/attack-roughpair-error.md`:165-176, as corrected 2026-08-29: "Below 1 everywhere, but **1 is the WRONG REFERENCE**: the matched independent-thinning null is binomial and returns `1 - p` exactly ... 0.9099 to 0.9609 at `u*` ... Against that reference the dispersion is still below at all 17 band-depth cells, pooled `z = -5.87`, `-7.09`, `-11.39`, so sub-Poisson stands as a direction and **its size is smaller than this sentence implies**"

**Which side is right.** The note, which ran the control
(`measure-roughpair-null-0829.md` §3a, red-teamed) that TODO's sentence
predates. The direction survives; the number as quoted overstates the effect
because it is normalised against 1.

**Old → new**, `TODO.md`:171:

> old: `the scatter is sub-Poisson at χ²/df = 0.546–0.785 fit-free,`
> new: `the scatter is sub-Poisson in direction but by less than the raw figure suggests (χ²/df = 0.546–0.785 fit-free, against the matched thinning null's 1 − p = 0.91 to 0.96 at u*, not against 1; pooled z = −5.87 to −11.39 across 17 cells, `attack-roughpair-error.md` §3 as corrected 2026-08-29),`

### D9. TODO Z4 quotes the scratchpad interval where a custody-bound one exists, APPLY

- `TODO.md`:252-254: "a cluster bootstrap puts the inflation at 4.10 (`redteam-0829-measure-b.md` §1c C15, scratchpad grade) and moves the interval to **[0.6840, 0.7681]**"
- `research/zone-tail-02.js`:860, embedded output: "CLUSTER bootstrap **[0.6848, 0.7692]** width 0.0843 (2000 resamples of 1910 clusters, seed 613009117)"
- `research/history/staging/zone-tail-02-0829.md`:278-279: "the interval reads [0.6848, 0.7692] here against its [0.6840, 0.7681], a difference of 0.0008 and 0.0011 at the two ends"

**Which side is right.** The producer, under the standing compute rule (cite
the embedded artifact, never the scratchpad recalculation). The two differ by a
seed and the changelog's late-night entry records that; the live document should
carry the custody-bound pair.

**Old → new**, `TODO.md`:254:

> old: `and moves the interval to [0.6840, 0.7681], still inside the registered [0.68, 0.78].`
> new: `and moves the interval to [0.6848, 0.7692] in the producer's own block (`zone-tail-02.js` SEC I; the red team's [0.6840, 0.7681] differs by a seed), still inside the registered [0.68, 0.78].`

### D10. TODO Z5 lists as owed the two checks that ran and are reported above it, APPLY

- `TODO.md`:307-312: "First move now: the mechanism question is unchanged and is the item. **Two cheap things are owed first** (that note's §7): a second lattice law to check that (c) is not a law-choice artefact, and a sigma for the mean-against-median contrast"
- against `TODO.md`:294-303, four lines above: clause (c) reports the second
  lattice law (nearest rounding, −0.0060 ± 0.0003) and clause (e) reports the
  mean-against-median contrast at 1.6 sigma.

**Which side is right.** The clauses. The late-night changelog entry states it
plainly: "the two owed checks on Kourbatov's b (`measure-record-null2-0829.md`
§8) ... WEAKENED that note's own headline ... TODO Z5's clause (c) rewritten as
the bracket, clause (e) added." The owed-checks sentence is the pre-run text and
was left standing under the post-run clauses.

**Old → new**, `TODO.md`:307-312:

> old: `First move now: the mechanism question is unchanged and is the item. Two cheap things are owed first (that note's §7): a second lattice law to check that (c) is not a law-choice artefact, and a sigma for the mean-against-median contrast, since the data's z distribution is nearly symmetric (b_med − b_z = 0.018) where the null's is skewed (0.211) and the location comparison assumes shape agreement.`
> new: `First move now: the mechanism question is unchanged and is the item. Both cheap checks that stood owed here ran on 2026-08-29 and are clauses (c) and (e) above: the second lattice law showed (c) IS law-dependent rather than a law-choice artefact, and the mean-against-median contrast reads 1.6 sigma and stays open.`

A second, smaller item in the same block: the clauses run (a), (b), (c), (e),
(d). Reordering (e) after (d) is cosmetic and is not proposed.

### D11. "x = 37 flagged five independent ways", HOLD

- `TODO.md`:505: "Assumption A's frame: `paper/anchored-note.md` §10; **x = 37 flagged five independent ways.**"
- against `research/G2-STATE.md`:384-395 as corrected 2026-08-29: "The three are not independent: all three are ratios carrying G2(37#) = 528, and of nine instruments free of that value none reads high at 37 ... What survives is one object: G2(37#) overshoots a blind seven-term extreme-value forecast by z = +6.58"

**Which side is right on the word.** G2-STATE, for the G₂-side instruments.
Whether TODO's five are those instruments cannot be settled from the live layer:
the five are not enumerated at :505, and `paper/anchored-note.md` §10, which the
same line cites, does not carry the phrase (checked; the section's x = 37
content is the @37 march, β(37) = 0.8530 and the z = −22,632.9 deviation).

**HOLD.** Either the five are named and each checked against
`measure-g2-provenance-0829.md` §4, or the clause is replaced by a pointer.
Suggested if Chris takes the second: `x = 37 flagged five independent ways.` →
`x = 37's status is G2-STATE.md §2 as corrected 2026-08-29: three of the
flags are ratios sharing G2(37#) = 528, and the survivor is the z = +6.58
forecast overshoot.` Not applied: it is a judgement about which flags were
meant.

### D12. `attack-hybrid-bound.js` carries both the corrected and the superseded root, APPLY, through embed.js

- `research/attack-hybrid-bound.js`:11: "7.182 lnln x"
- `research/attack-hybrid-bound.js`:61, :261, :428: "the relation beta ~ m ~ **3.594** W_T", "m0/W_T climbs toward the **3.594** of"

**Which side is right.** 3.5911, per `attack-beta2-05-covering-prune.js`:373-382
and :525, which now computes the root of `a·ln(a/e) = 1` instead of quoting it,
and `REFUTED.md`:51, which names 3.594 as superseded. `7.182 = 2 × 3.5911`, so
line 11 and lines 61/261/428 are the same constant at two values.

**Old → new** at all three sites: `3.594` → `3.5911`. **Line 261 is inside a
`console.log`, so the change alters the script's output**: it must go through
`node research/qc/embed.js`, not a hand edit of the comment at :428. Nothing
downstream consumes the constant (audit 2 §2, and the ledger's own note gives
0.08 per cent).

### D13. GLOSSARY's Lemma V entry does not carry the proven half, APPLY

- `research/GLOSSARY.md`:449-451: "**Lemma V** — the two-dimensional analog of Iwaniec's 1980 linear-sieve error term ... **NEEDED, NOT PROVEN.**"
- against `research/G2-STATE.md`:37-45 and `README.md`:79-81, both of which state the mean-square form as PROVEN, unconditional, and both of which state that Lemma V proper is untouched.

**This is an omission, not a contradiction.** The GLOSSARY entry is about
Lemma V proper, which is correctly NEEDED, NOT PROVEN. But GLOSSARY is where a
reader looks the term up, and the entry gives no sign that a named form of it
is now a theorem with no hypothesis.

**Old → new**, `GLOSSARY.md`:451:

> old: `NEEDED, NOT PROVEN.`
> new: `NEEDED, NOT PROVEN in the supremum form that the route needs. Its MEAN-SQUARE form is PROVEN and unconditional (G2-STATE.md §0; re-derived adversarially 2026-08-29, redteam-0829-theorem1.md §§2, 9), and that is a period mean, not a supremum, so it leaves Lemma V proper untouched.`

### D14. `IMPORT-MAP` row 16 calls Z5's null branch closed against TODO Z5 clause (e), APPLY

- `research/IMPORT-MAP.md`:171, row 16 status: "**Z5's null branch is closed**; its mechanism branch is open ... Both notes are outside output custody — no OUTPUT banner, figures hand-pasted — so their numbers stay in their files"
- against `TODO.md`:300-303: "(e) The shape assumption behind every b reading in this family is measured at 1.6 sigma and **stays open**", and `TODO.md`:281-283, which records `measure-record-null2-0829.js` as "the first member of this family inside output custody".

**Which side is right.** TODO, on the day's record. The row's status cell was
written on 2026-08-21 and last touched for the 2026-08-28 notes; today's
custody-bound note both narrows the null's share to a bracket and leaves the
shape assumption open, neither of which the row knows.

**Old → new**, `IMPORT-MAP.md` row 16 status, appended rather than rewritten:

> add: ` **Updated 2026-08-29:** the null branch is not closed as flatly as this cell says. `measure-record-null2-0829.md` (inside output custody, unlike the two notes above) makes the lattice share a law-dependent bracket, 16.1% to 25.1% of b, and leaves the shape assumption behind every b reading open at 1.6 sigma.`

### D15. A HELD note's REFUTED row count, APPLY, inside the note

- `research/history/staging/recon-0829-escapes.md`:38: "`REFUTED.md` carries **69** rows"
- against `research/REFUTED.md`, 67 data rows (counted); `README.md`:82 "67 closed routes"; `applied-0829-registries.md`:8 "the table stands at 67 rows"

**Old → new**: `69` → `67`. Nothing in the escapes note's argument turns on it;
it is quoted in a base-rate paragraph.

### D16. TODO Z7 carries two items numbered (3), HOLD

`TODO.md`:324-334 reads "(1) ...; (2) DONE on the laptop ...; the per-zone TAIL
item **that stood here as (3)** was discharged the same day ...; **(3)** β(37)
line ensemble ~20 h". The first (3) is the struck item's old number quoted in
prose, the second is the renumbering. Both are correct in intent and the
sentence reads as a contradiction on a first pass.

**HOLD**, readability only, Chris's file. Suggested: quote the struck number as
"the per-zone TAIL item that stood here as item (3)" and set the new one on its
own line.

### D17. README's in-body date against its own §Status header, HOLD

`README.md`:68 heads "## Status (2026-08-29)"; `README.md`:167 opens "The state
of the attack on the exponent, **as of 2026-08-28**"; the same paragraph then
reports 2026-08-29 work at :177 and :189. The 08-28 date is defensible as
scoping the three-day attack wave specifically, and it reads as stale beside the
header.

**HOLD.** Chris's canonical prose, and the changelog records that this
paragraph's date and closing were already touched today.

---

## 3. The papers

Checked: `paper/wall-note.md` §2, `paper/moire-primes.md` §7 and §7A, against
`object-bridge-read-0829.md` §4 (the grading of the three killers) and §5 (no
separation theorem on either side; the tile form exempt from the parity
obstruction, the zone form not). Also read for the day's other facts:
`paper/anchored-note.md`, `paper/beta2-note.md`, `paper/variance-note.md`,
`paper/staircase-note.md`.

**No contradiction was found in either paper.** Everything below is an absence,
and every proposal is HOLD.

### 3a. The exemption: already stated, and stated correctly

`paper/wall-note.md`:170-190 carries the bridge note's §5 reading in full and
independently of it: the obstruction runs on the property's extension, not on
how it is written; a congruence-defined property forbids no sign pattern, so
"the bare tile statement, G₂(x#) < x′² − 2, does not satisfy the obstruction's
hypothesis and no parity theorem names it"; the zone form's extension is the
twin prime pairs and "the obstruction applies to it in full"; and the exemption
"covers Door 5 ... and it does not cover any route that proves the zone
statement by bounding sums against a non-negative sieve weight". That is the
bridge's §5 conclusion, sentence for sentence. **No sentence is needed here.**

### 3b. `moire-primes.md` §7 states the obstruction without the exemption

`paper/moire-primes.md`:431-435 opens the door survey with the flat classical
statement, "sieve-type arguments cannot distinguish numbers with an odd number
of prime factors from an even number, hence cannot lower-bound populations
defined by exact primality of both members", and §7 never mentions that the
tile form is outside the obstruction's hypothesis while the zone form is inside
it. §7 does route the reader to `wall-note.md` §1 for the doors, and §7A routes
to §2 for the faces, so the exemption is reachable in two hops and is nowhere
denied.

**Do the papers need a sentence? One, and only in §7.** The honest reason is
that §7's own conclusion, the Scour/Grain misalignment statement, is a
residue-layer statement, and a reader who has just been told sieves cannot
reach exact primality has no way to know that the obstruction's hypothesis does
not bind the form §7 ends on.

Suggested, **HOLD** (moratorium; Chris's prose; a paper sentence):

> after `moire-primes.md`:437, "hence cannot lower-bound populations defined by
> exact primality of both members": `Where the obstruction binds is one step
> narrower than that sentence reads, and the narrowing matters to this survey:
> the test runs on a property's extension, so the bare tile form carries no
> forbidden sign pattern and no parity theorem names it, while the zone form's
> extension is the twin prime pairs and the obstruction applies to it in full.
> The exemption reaches Door 5 alone and reaches no route that bounds sums
> against a non-negative sieve weight (paper/wall-note.md §2).`

### 3c. Neither paper grades the three killers, and §7A grades no face

`moire-primes.md`:481-489 says of the four faces that "the framework's claim on
this chapter is not that any face is close to falling. It is that each face now
has coordinates". That is a calibrated statement and it is not wrong. What it
does not do, and what `object-bridge-read-0829.md` §4 does, is say which of the
three killers is a theorem and which are not: killer 2, the almost-all
quantifier, has an exact-counting core and is the theorem; killer 3, the
equivariance wall, is a measured pattern over the attack fleet with two proven
components; killer 1, the class-blind cap at 4.26645, is the heuristic, with a
proven number inside it and no barrier theorem behind it. `README.md`:169-175
states the three the same way the papers do, as a list, without the grading.

**HOLD**, and this one is a judgement call rather than a defect: the four faces
of §7A and the three killers of the bridge note are two decompositions of one
wall and are not in one-to-one correspondence, so a grading sentence in §7A
would need its own mapping. If Chris wants it, the cheapest correct form is a
clause in `wall-note.md` §2's "What the four faces have in common" paragraph
naming which faces rest on a theorem and which on a measured pattern, since §2
is where the numbers already live.

### 3d. The absent separation theorem

`object-bridge-read-0829.md` §5 states, at PROVEN for the non-existence-here and
OPEN as mathematics, that no theorem says a residue-only statement cannot reach
the zone statement, and that the one statement of that shape running the other
way is the Gap Reformulation itself. Neither paper asserts a separation, so
neither is wrong. Neither states the non-existence either.

**HOLD**, and the recommendation is not to add it to a paper: it is a statement
about this corpus's own searched state, which belongs in `ZONE-POSTULATE.md` §3
or `THE-LENS.md` §5 rather than in outward-facing prose. Flagged here so the
decision is on the record.

### 3e. Everything else in `paper/` that the day's facts touch

- `paper/anchored-note.md`:152-156, the factor-81 ensemble rider, present and
  matching `wall-note.md`:261-270 on both self-consistent readings. AGREE.
- `paper/wall-note.md`:245-254, the parity floor 8 at κ = 2 against the
  dimension-1 figure 2, with the three distinct 2s separated. Untouched today
  and consistent with `REFUTED.md`:49 and `dhr-verification.md`. AGREE.
- `paper/beta2-note.md`, the 4.2665 bound, cited from six live sites today and
  quoted identically at each. AGREE.
- `paper/variance-note.md` and `paper/staircase-note.md`, the Var/E constant and
  the two-class freshness reading were the 2026-08-28 pass's items and were not
  edited on 2026-08-29. Not re-checked here; see §5.

---

## 4. The gates

Both run in this session, on the tree as it stood, read-only.

### `node research/qc.js`

**1 finding, total 1**, in the embeds check:

```
  tail-does-not-belong-to-this-code  (1)
    research/zonegap-04-sweep-1e12.js:352
        code changed since the tail was embedded (2026-08-29)
        the output beside this code was produced by different code
```

**This file is one of the three the brief fences off**, as an agent is still
updating it. The finding is reported and not investigated, and no fix is
proposed here beyond the obvious one: the owning agent re-runs
`node research/qc/embed.js` on that file when its edit settles. The other
twelve checks are clean: refs, quotes, crosslinks, scripts, transfers,
calibration, absence, sourcing, widths, ledger, provenance, search-convention,
all 0 findings. The ledger check reports 451 of 451 notes carrying a block, 424
question ids, 18 TODO items, which matches the late-night entry's "regenerated
at 424 questions over 451 notes" exactly. Re-run after this note was written, the same gate reads 452 of 452 with the ledger check still at 0 findings and the embeds finding unchanged.

Four advisories stand and are not part of the total, all pre-existing:
embed-backlog (181 readings-not-traceable, 34 no-output-block, 3
hand-pasted-tail), sourcing-backlog (240 unsourced-section), widths-scan (70
across six classes), ledger-backlog (0 of 451).

**None of the sixteen disagreements in §2 was found by qc.js, and that is
expected**: qc's own closing note says it is silent by construction where
meaning or arithmetic is at stake, naming "a consistent wrong constant across
documents" and "a stale count in prose" as the human and audit-numbers concern.
D4, D5, D7 and D10 are exactly those two classes.

### `node research/audit-numbers.js`

**251 of 251 checks passed, 169.6 s.** No finding. Nothing in §2 is contradicted
by it, and nothing in §2 would have been caught by it: every disagreement above
is a wording, attribution, pointer or scope defect rather than a recomputable
number, with the single exception of D12, whose two values are both correct
arithmetic of two different roots and so pass any check that recomputes either.

---

## 5. What was not checked

Stated so the pass is not read as wider than it is.

1. **Nothing was re-derived and no number was recomputed** beyond counting
   `REFUTED.md`'s rows (67) and reading the two gates' output. Where §2 says a
   side is right, it means that side's own record says so, not that this pass
   verified the record.
2. **The margin-band arithmetic was read off A6's printed tables**, not
   recomputed from `research/maxgap-law.js` or
   `research/fold-profile-08-zone-localized-gap.js`. D1 and D3 would both be
   settled harder by a producer that prints the two spans side by side, and no
   such producer exists.
3. **The three fenced artifacts were not opened for content**:
   `research/zonegap-01.js`, `research/zonegap-04-sweep-1e12.js`,
   `research/history/staging/zonegap-03-score.md`. The Z₂ band means at
   `TODO`:52 were checked against the changelog's statement of the score note,
   not against the note.
4. **The day's HELD notes were read only where the brief named them.** Read:
   `object-bridge-read-0829.md` §§4-5, `audit-cross-document-constants.md` A6,
   `attack-roughpair-error.md`, `measure-record-null2-0829.md` (through TODO and
   QUESTIONS), `lit-scourfield-2008.md`, `lit-smooth-divisors.md`,
   `recon-0829-escapes.md` §0 and §6 references, `recon-0829-farfields2.md`,
   `applied-0829-registries.md`, `zone-tail-02-0829.md` §§67, 278. Not read, and
   so not cross-checked against each other or against the live layer: the other
   roughly twenty notes of 2026-08-29, including all four `refuted-audit-0829-*`
   files, the three `redteam-0829-*` files except where cited above, the three
   `applied-0829-measure-*` files except `-b`, `measure-tail-deficit-0829.md`,
   `measure-g2-generic-0829.md`, `measure-g2z2-0829.md`,
   `z2-state-draft-0829.md`, `object-g2-read-0829.md`,
   `object-models-read-0829.md`, `session-0829-summary.md`.
5. **The 25 rewritten `REFUTED.md` clauses were not audited against their
   records.** Two of them (rows 42 and 51) were checked because the brief names
   them; the other 23 were taken as applied.
6. **`research/QUESTIONS.md` is generated** and was used as a lookup only. Its
   424 rows were not audited against the notes they index; the ledger check
   covers the TODO side and nothing here adds to that.
7. **The papers were checked for the day's facts only.** No pass was made over
   `paper/kk-lower-bound.md`, `paper/proposals/`, Paper III, or the parts of
   `moire-primes.md` outside §7 and §7A, and none of `paper/variance-note.md`
   or `paper/staircase-note.md` beyond confirming that 2026-08-29 did not touch
   them. The 2026-08-28 pass's Var/E and freshness-density items are outside
   this pass and their status is `coherence-0828.md` §0.
8. **Whether any of the sixteen disagreements matters to a result was not
   assessed.** On the face of the records none does: the band attribution (D1,
   D2), the ratio floor (D4), the pointers (D6), the counts (D7), the custody
   preference (D9) and the stale sentences (D10, D14) change no exponent, no
   rung and no verdict. D3 and D5, the two constants, would change a stated
   margin by 5% and 3% respectively and neither is load-bearing on any proof
   chain. That reading is this pass's, and it is a judgement rather than a
   check.
9. **No absence claim is made about the live layer.** Every "no other live site
   states this" above rests on a grep over `README.md`, `TODO.md`,
   `research/*.md` and `paper/*.md` for the object's own strings, which is the
   corpus's known-weak scope: a site that states the same fact in different
   words is invisible to it.
