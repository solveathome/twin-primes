# Wave 2, partition A: applied

<!-- ledger
id: Q-applied-wave2-A
status: ANSWERED
todo: none
question: Which wave-2 partition A corrections were applied, and to which files?
verdict: Five jobs applied across G2-STATE.md, LOCALIZED-GAP.md, maier-matrix.md and origin-excess.md, with partition A's own qc columns at 0 on every check afterwards; handoffs to other partitions and one decision needing Chris are listed rather than guessed.
-->

Files owned and edited: `research/G2-STATE.md`, `research/LOCALIZED-GAP.md`,
`research/maier-matrix.md`, `research/origin-excess.md`. Nothing outside those
four was touched. No commit, no add, no push. Changelog entries are in
`research/history/staging/changelog-add-A.md`; `CHANGELOG.md` itself was not
opened for writing.

## qc.js, before and after

Run at start (commit `4293686` plus other partitions' in-flight edits) and again
at the end. The global totals move with six other appliers working concurrently,
so what matters is the partition's own column.

| check | global before | global after | partition A before | partition A after |
|---|---|---|---|---|
| refs | 7 | 5 | 1 (`maier-matrix.md`:282 → `origin-excess.md` §6c) | **0** |
| quotes | 1 | 2 | 0 | **0** |
| crosslinks | 0 | 0 | 0 | **0** |
| scripts | 2 | 2 | 0 | 0 |
| transfers | 12 | 12 | 7 | **5** |
| TOTAL | 22 | 21 | 8 | 5 |

The two transfers that left are the two dropped qualifiers: `G2-STATE`:403 vs
`maier-matrix`:198, and `G2-STATE`:534 vs `ZONE-POSTULATE`:248. The five that
remain are the pairs `qc-shepherd` item 4 adjudicated KEEP (four
`LOCALIZED-GAP` / `G2-STATE` pairs where G2-STATE's copy adds a citation, a
concluding step, an embedded measurement or a naming) plus the
`two-class-lower-bounds` VERDICT pair, which I word-diffed: G2-STATE narrows the
verdict to "SAFE against the construction side" and drops a rhetorical
tripling ("no construction in the literature, no construction we could build, no
heuristic"). Nothing conditional was lost in either direction. The check will go
on reporting these five; they are candidates, not defects.

The two new global `quotes` findings are in `covering-dive.md` and
`maxgap-law.md`, partition E's files, and appeared during their edits.

## Job 1: the two dropped qualifiers — DONE

**(a) `G2-STATE.md` §4e, `with y′² > x`.** Restored, and restored *inside the
boxed statement* rather than in the prose below it, as a line labelled
"*Non-vacuity, a remark and not a hypothesis*" carrying the reason (D_x(S) = 0
for S ≤ x, so at S = y′² ≤ x the lemma reads 0 = 0) and the fact that all
fourteen verification cells satisfy it. Putting it in the box is the part that
makes the defect hard to repeat: the box cannot now be transferred without it.
`maier-matrix.md` §4's box carries the identical line, so the two copies say the
same thing in the same shape.

Re-verified rather than taken on trust: I re-ran `oel-hypotheses.js` from the
session scratchpad. Case 2 confirms the identity HOLDS and is vacuous (0 = 0) in
6 of 6 cells with y′² ≤ x.

**(b) `G2-STATE.md` §5 route A, "at the needed constant".** Restored, and the
passage is now compatible with partition D's closure of TODO 000b: the four words
are back, the question they pose is named as the one that decides the floor, and
the answer is given, because the three papers do not supply an exponent-2 + ε
bound at all (Kanold 2^{√k}, Stevens k^{Θ(log k)}, Paseman k^{O(log log k)}). The
exponent-2 statements are Vaughan 1977 and Iwaniec 1971 Thm 2 / 1978, both with
inexplicit constants, so the floor stands. `G2-STATE.md` §9 item 2 got the same
treatment and lost "This is the cheapest item on the list", per `qc-refs` W7's
consequence 2. Both W7 sites in my files (`:535`, `:776` in the old numbering)
are done.

## Job 2: the decomposition by logical type — DONE

`maier-matrix.md` **§4a is the canonical enumeration** and says so: a four-row
table giving each statement, its logical type, what it needs and where it is
derived, followed by one paragraph per item.

| # | statement | type | needs |
|---|---|---|---|
| 1 | Origin Excess Lemma, PROVEN, VERIFIED 14/14 | the lemma, one hypothesis | S ≤ y′² |
| 2 | the non-vacuity condition y′² > x | a remark, not a hypothesis | nothing |
| 3 | Origin Excess Corollary, PROVEN | a corollary with its own threshold | x < x\*(y) |
| 4 | Scale Collision Proposition, PROVEN | a theorem about the parameters | y < x, x prime |

`origin-excess.md` §6 was retitled ("The lemma's one hypothesis, the corollary's
threshold, and the collision") and split into §6a, §6b, §6c, one per companion,
each pointing at §4a as the enumeration's home. `G2-STATE.md` §4e now states that
the lemma has one hypothesis and three companions, cites §4a and §§6a-6c, and
says in terms not to keep a private count. The three private counts are gone.

Verification numbers put in the body, from re-running `oel-hypotheses.js`: the
identity holds at 3 of 3 cells outside S ≤ y′² (case 3), and the strike
characterisation's bound L ≤ 2(π(x) − π(y) + 1) fails in **6 of the 8 test cells
with S > y′²** (case 4), the sharpest being L = 43 against a bound of 10 at
y = 7, x = 19, S = 1210.

**Calibration in the naming.** Both new names are of PROVEN objects (a corollary
of a proven lemma; a one-line consequence of y′ ≤ x < x′), so neither carries a
Measurement/Conjecture/Hypothesis suffix, per the standing policy's own
exclusion. Where the ~2.2 ceiling is stated I made its dependence explicit
instead: "MEASURED in one input, the flatness of ln x\*/ln y over two orders of
magnitude in y, and PROVEN from there."

## Job 3: history migration — DONE

**`origin-excess.md` §9 "Corrections to the record" (35 lines): removed, §§10-11
renumbered to §§9-10.** Per-bullet disposition, with the body fix each needed:

| bullet | disposition | body |
|---|---|---|
| three hypotheses, not one | deleted | superseded by §6 and §4a |
| disjointness owes nothing to the matrix | **kept, relocated** | became §6c, the Scale Collision Proposition |
| above y′² the advantage is negative | deleted, nothing to relocate | already in the body at §0 item 2, §3 (0.9343 at 3.5 y′²) and §4 (125% at v = 8) — I checked before deleting, and `qc-history` asked for exactly that check |
| "the measured factor is small" is the weak form | migrated | the stronger statement (bounded by an absolute constant, no improvement with scale) folded into §6b |
| the trough constant is the same number | migrated | already in the body at §5:417-423; nothing needed relocating |
| ZONE-POSTULATE §6's "not yet aimed here" | migrated | dead quotation dropped; the surviving fact is now §7's closing paragraph |

**`maier-matrix.md` §10 "Corrections to the briefing" (25 lines): removed, §11
renumbered to §10.** Bullet 1's mathematics was genuinely nowhere else and is now
in §2 ("free below x′² by crystallisation, the twin prime problem above it").
Bullet 2's surviving epigram is in §7 Q3.1. Bullet 3 was deleted outright: it
asserted a pending correction to `PRIOR-ART.md` that had already been applied and
logged.

**`maier-matrix.md`:503's heading** now reads "Granville-Soundararajan Corollary
1.4 is vacuous at every computable scale". Its closing sentence and reading 8
state the verdict without narrating the withdrawal; the withdrawal is in the
changelog entry.

**Beyond the brief, same class, same file set.** `G2-STATE.md` used "today" and
"tonight" at eight sites, including two section headings ("The routes, and what
closed today", "What closed today") and the header. A working document that says
"closed today" is dated by construction, which is the defect the convention
exists to prevent. All eight are now tense-free; §5b keeps its number, so no
inbound pointer moved. Also fixed: `maier-matrix.md` §1 ("recorded before the
work"), §7 Q3.1 ("The briefing is right that…"), `origin-excess.md` §1 ("The
briefing's numbers are all correct").

**Deliberately NOT changed:** `origin-excess.md`'s header parenthetical keeps
"His doubt, recorded before the work". Pre-registration is falsifiability
evidence, which is the reasoning `qc-CAMPAIGN` used in ruling U1 to keep
ATTACKS3's pre-registered "Win:" lines. The rule I applied, and it is worth
stating as a rule: **a file's provenance parenthetical may record
pre-registration; body prose states the fact.** That is why the same phrase went
from `maier-matrix.md` §1 (body prose) and stayed in `origin-excess.md`'s header.

## Job 4: `maier-matrix.md`:282 → `origin-excess.md` §6c — DONE

Sequenced as `qc-history` required: the statement was moved out of §9's second
bullet into §6 as a real subsection **first**, then the citation resolved
itself. §6c exists, is a heading (`### 6c.`, which is what `qc/corpus.js` parses
as a section label), and carries exactly the claim the citation asserts — that
the disjointness is a fact about the two parameters, so no better lemma repairs
it. `qc.js refs` reports zero findings in my files.

Side effect worth knowing: `research/qc/README.md`:35 uses this exact citation as
its worked example of a dead section reference, and that example no longer
reproduces. Handoff below.

## Job 5: the transfer pairs — DONE

**Backport applied.** `LOCALIZED-GAP.md` §4 now names the map B ↦ 2.4·R·B·ln x
and states its expansiveness for every x ≥ 2 as the reason there is no fixed
point, and gains "because the gate feeds back". The home document was the weaker
copy; it is not now.

**Word-diffed, the unchecked pairs in my files, all clean:**

- `G2-STATE`:483-486 vs `discrepancy-two-class`:212-215 — no loss. G2-STATE's
  copy is the better one: it labels the columns "sup, geometric mean per fold"
  and "sd per fold" and writes the ceilings as ×2 / ×3. The backport is
  `qc-shepherd` rec 10 and belongs to whoever owns `discrepancy-two-class.md`.
- `G2-STATE`:534-538 vs `ZONE-POSTULATE`:248-252 — the Job 1(b) defect. Fixed.
- `G2-STATE`:804-813 vs `U-FRAME`:174-179 — no loss; G2-STATE carries strictly
  more (the band split at 487/633, the 4% ledger drift).
- `G2-STATE`:613-620 vs `exponent-control`:155-160 — no conditional lost.
  G2-STATE adds "Do not bank it" and the noise explanation; it drops only the
  size of the consequence ("margin growing like x/log³x"), which it renders as "a
  large consequence if true". Home document is intact, so no action.
- `G2-STATE`:587-591 vs `two-class-lower-bounds`:587-593 — no loss; G2-STATE
  narrows the verdict to the construction side, which is a scope *gain*.

## Applied beyond the five jobs, and why

- **`qc-compound` CC-5, `G2-STATE.md` §8's ownership table.** `README.md` sends
  readers here on the promise of "a calibration marker on every line" and five
  rows carried two objects or two calibrations. I stated the table discipline at
  the head of the table and split those five rows into nine. I did **not** apply
  CC-5's proposed calibration for the ×3 ceiling on ΔΦ₂ — the report calls it
  MEASURED, and this file's own §4g calls the ×2 and ×3 ceilings proven, being
  the Möbius term counts. I split the row instead, keeping the ceiling PROVEN
  with §4g and putting the measured per-fold sup and sd ladder in its own row. If
  CC-5's MEASURED is right, that is a disagreement with §4g and it needs a
  ruling; flagged below.
- **`qc-arch` recommendation 1**, the three triage-rule citations in my files
  (`maier-matrix.md` twice, `G2-STATE.md` once), repointed from `OBSERVATIONS.md`
  to `THE-LENS.md` §5, the declared owner.
- **`qc-CAMPAIGN` decision U1**, the G₂(41#) repricing at `G2-STATE.md` §9 item
  6. Numbers carried across exactly as the campaign computed them: 519 s × 35 =
  5.05 h, and 5.6 h with the 41/37 deletion-state factor, with the 37-hour figure
  identified as the lattice walk over positions.
- **`qc-history` O6**, the dead quotation of ZONE-POSTULATE §5's "second sighting
  worth watching" at `G2-STATE.md`:670.

## Deliberately not changed

- **`G2-STATE.md` was not split**, though the brief allows it at 884 lines (926
  now). `qc-arch` C3 calls it the corpus's best-ordered document and recommends
  it as the first read after `ZONE-POSTULATE`; splitting would cost the reader
  the single-pass survey that is the whole point of the file, and there is no
  section in it whose owner is elsewhere. The decomposition work that was needed
  here was per-claim, not per-file, and that is what §8's table split does.
- **`G2-STATE.md` §9's numbering was left alone**, and closed items keep their
  slots marked CLOSED (item 8 already set that precedent). Renumbering would
  break the citations that address items by ordinal, and `qc-CAMPAIGN` U7 keeps
  renumbering to one mechanical pass at the end.
- **`LOCALIZED-GAP.md`:161-162's "structurally capped" qualifier** and
  §3's "out of computational reach by four decades" were left exactly as they
  are: `qc-compound` says the first is doing necessary work, and `qc-history`
  records the deliberate decision behind the second so that no pass "fixes" it.
- **No number was recomputed.** The only value that changed is the G₂(41#) cost,
  which came with its arithmetic from `qc-CAMPAIGN` U1.

## Handoffs to other partitions

1. **`research/qc/README.md`:35** (framework doc, no partition owns it) uses
   `maier-matrix.md`:282 → `origin-excess.md` §6c as its example of a dead
   section reference. §6c now exists, so the example no longer reproduces. It is
   written in the past tense ("found on day one"), so it is defensible as it
   stands; if the parent wants the table to stay reproducible, that row needs a
   new example.
2. **`research/discrepancy-two-class.md`:212** should take `G2-STATE.md`'s column
   labels for the same table: "sup, geometric mean per fold", "sd per fold", and
   ×2 / ×3 rather than bare 2 / 3, which read as absolute rather than
   multiplicative ceilings (`qc-shepherd` rec 10). Word-diffed and confirmed.
3. **`research/ZONE-POSTULATE.md`:248-252**, `research/THE-DIALS.md`:259-261 and
   `research/two-class-lower-bounds.md`:611-613** still carry the false premise
   that Kanold, Stevens and Paseman give exponent 2 + ε with stated constants
   (`qc-refs` W7). My two sites are done; leaving any of theirs re-seeds the
   claim. `qc-arch` rec 8 (give the loose end one owner) is now unblocked, since
   `qc-shepherd` rec 2 is applied.
4. **`research/GLOSSARY.md`** should gain entries for two objects that are now
   findable only inside `G2-STATE.md` §8's table: the ×3 ceiling on ΔΦ₂ and the
   driving-term route's REFUTED status (`qc-compound` CC-5(d)). It may also want
   the four names settled here: Origin Excess Lemma, the non-vacuity condition,
   Origin Excess Corollary, Scale Collision Proposition.
5. **`research/THE-LENS.md` §5 must keep its number.** Three citations in my
   files now point at it as the owner of the triage rule.
6. **`research/U-FRAME.md`'s streaming-leg custody note** (currently §12, "the
   streaming leg recovers G₂(31#) … in 519 s") is cited from `G2-STATE.md` §9
   item 6 by name rather than by section number, precisely because partition B is
   restructuring §§10-15. If that measurement moves, the sentence still resolves.
7. **`TODO.md`'s G₂(41#) entry** is priced at ~37 h in the Parked list and should
   move with `G2-STATE.md` §9 item 6 to about 6 hours (`qc-CAMPAIGN` U1). At six
   hours it is not a parked item.

## Unresolved / needs a decision

1. **The ×3 ceiling on ΔΦ₂: PROVEN or MEASURED?** `G2-STATE.md` §4g calls the ×2
   and ×3 ceilings proven, being the Möbius term counts; `qc-compound` CC-5's
   replacement table calls the ×3 ceiling MEASURED. I kept PROVEN and split the
   measured ladder into its own row. One of the two is wrong and the home
   document (`discrepancy-two-class.md`) should settle it.
2. **The 2.2 ceiling's calibration.** It is derived from a threshold whose
   flatness (ln x\*/ln y ≈ 1.44) is measured at nine levels, not proven. I have
   written it as "MEASURED in one input and PROVEN from there" and `qc-compound`
   CC-4 writes it as "PROVEN ≤ ~2.2". If anyone wants a single word, the honest
   one is MEASURED, and that would change four sites across two partitions.
3. **`G2-STATE.md` §9's ordering is now stale in one place.** Item 2 is closed,
   so the "ranked by what each would buy" order has a closed item at rank 2. I
   kept the slot rather than renumber. If the parent prefers, the closed items
   (2 and 8) could move to the bottom of §9 in the end-of-campaign mechanical
   pass, when inbound ordinal citations are being checked anyway.

## Corrections to the brief

1. **"the bound fails in 7 of 12 test rows once S > y′²" is not what the script
   prints.** `oel-hypotheses.js` case 4 has 12 rows, 4 of them inside S ≤ y′²
   (all pass) and 8 outside, of which **6** fail. So it is 6 of 8 outside the
   range, or 6 of 12 rows overall. The body carries the 6-of-8 form.
2. **The Kanold/Stevens/Paseman loose end is in `G2-STATE.md` §5, not §4.** The
   brief says "§4 (near line 534)"; line 534 sits inside §5, "The routes", under
   route A's second difficulty floor. The line number was right.
3. **The `origin-excess.md` §9 bullet on the negative advantage above y′² needed
   no relocation.** `qc-history` classed it "CURRENT NEGATIVE KEEP, relocate" and
   asked the applier to check first; the content is already in the body three
   times over, so relocating it would have created the duplication the migration
   exists to remove.
4. **The §9 bullet identifying the trough constant likewise needed no
   relocation** — §5:417-423 already states it, and states it better.
5. **`qc-history` lists more history-vocabulary sites in `maier-matrix.md` than
   the brief does** (§1:19-20, §7 Q3.1:471, §8:518-519, reading 8:584-585, in
   addition to the §10 block and the §8 heading). All are inside my partition and
   all are applied.
6. **A live ambiguity the migration would have created, avoided.** `qc-history`
   asks for the sentence "the origin's ceiling at the zone width and
   FOLD-PROFILE §9's trough constant are the same quantity" to be kept "where the
   ceiling is stated". Placed next to §6b's ~2.2 ceiling it reads as though 2.2
   and 0.7931 were the same object. They are not: one is the advantage's ceiling
   below y′², the other is the origin's value at the zone width, and it is a
   deficit. §6b now says so explicitly and §5 keeps the identification.
