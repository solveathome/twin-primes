# QC: architecture, ordering, AI-readability (wave 1, diagnosis only)

<!-- ledger
id: Q-qc-arch
status: ANSWERED
todo: none
question: Is the corpus's architecture, ordering and file layout readable by a fresh agent at minimum context cost?
verdict: Diagnosis only, no existing file edited: the restructure plan of section 2 was accepted over the shepherd's, and the leading verdict is to leave OBSERVATIONS.md exactly as it is, in place, unsplit and off the reading path, taking out only four inbound citations that name it as the home of something it does not own.
-->

Agent: qc-arch. Read-only on all existing files. This file is the only write.
Status: **COMPLETE.** Written incrementally, worst-first. No existing file was
edited, created, moved or deleted; nothing was committed or pushed.

Primary reader assumed throughout: a fresh AI agent, no memory, needs to reach
current understanding of ONE specific question at minimum context cost, and must
not be misled by reading the wrong file first. Secondary reader: Chris.

## 0. Method / honesty note

**Read in full, every line:** `README.md`, `TODO.md`, `research/README.md`,
`research/GLOSSARY.md`, `research/G2-STATE.md`, `research/ZONE-POSTULATE.md`,
`research/THE-DIALS.md`, `research/THE-LENS.md`, `paper/PAPERS.md`,
`research/U-FRAME.md` (all 967 lines, twice for the restructure plan), and the
three inherited wave-1 reports' operative sections (`qc-shepherd.md` in full;
`qc-history.md`'s BULK RELOCATE list, size table and Unresolved section;
`qc-status.md`'s heading list and Unresolved section).

**Read in part, targeted:** `research/ATTACKS3.md` (organising principle, the ten
Landed verdicts), `research/FOLD-PROFILE.md` (heading list, §9 opening, §10
Reproduction block, lineage/dispersion greps), `research/OBSERVATIONS.md` (house
rules and heading list).

**Not read; classified from headings, first 30 lines, targeted greps and inbound
citations:** the remaining ~45 body files, including every `natal-cap-NN-*.md`,
all of `paper/` except `PAPERS.md`, `web/PROPOSAL.md`, `web/bench/README.md`,
`attestation/README.md`. The purpose inventory's one-liners for those files are
therefore **classifications, not readings**, and the three I am least confident
about are `origin-excess.md`, `two-class-lower-bounds.md` and `maxgap-law.md`,
where a file whose title states a live question may have closed it internally, or
the reverse.

**Not opened at all:** the 129 `research/*.js` bodies. (g) is a findability and
linkage finding built from filename greps, header samples and cross-reference
counts. I make no claim about any script's contents.

**Instruments used.** Reference counting by grep over `*.md` and `*.js` with
`research/history/` excluded, which is how §2.0's 128-pointer census, the
19-orphan-script list and the (a2) overlap table were produced. I did not run
`scratchpad/refcheck.js`; the counts here are targeted at section-level pointers
into specific files, which is a narrower question than that instrument answers.

**Delegation.** The purpose inventory's raw material and the five findability
questions in (e) and (g) were gathered by a read-only subagent. Every load-bearing
claim it returned that a recommendation depends on — FOLD-PROFILE's corrupt
heading order, OBSERVATIONS' zero citations from the three entry points, the
absence of any script index, the two unreferenced `natal-cap` files — I verified
myself before using it.

**Where I disagree with the brief, it is flagged in §8, and one of the five
corrections turned out to be my own error, left visible.**

## 1. Ordered recommendations

Ranked by benefit per unit of risk. Tags: **SAFE** = mechanical;
**MATH** = an applier must understand the content; **CHRIS** = his call.
"Blocks/blocked-by" notes the ordering constraints.

| # | move | tag | ordering |
|---|---|---|---|
| 1 | **Repoint the four triage-rule citations** from `OBSERVATIONS.md` to `THE-LENS.md` §5, the declared owner (`THE-LENS.md:184`). Sites: `ZONE-POSTULATE.md:326`, `maier-matrix.md:428`, `maier-matrix.md:579`, `G2-STATE.md:473`. | SAFE | none |
| 2 | **Move U-FRAME §11's A9 prior-art block (709-719) into U-FRAME §6a**, and repoint `PRIOR-ART.md:117`. A prior-art finding living inside an attack section is why the prior-art file has to cite an attack section. | SAFE | first step of the U-FRAME job; do before 12-17 |
| 3 | **Add a three-line "where this stands" block to `ZONE-POSTULATE.md`** after the title, in `G2-STATE.md` §0's shape: the target, verified to 1e11 zero failures, 4.2665 proven against 2 needed. Its own headline currently sits at line 90. No content moves. | SAFE | none |
| 4 | **Add the script filenames to `research/README.md`'s six-script measurement table.** Clears 5 of the 19 orphan scripts and makes "script 05" resolvable. | SAFE | do inside 5 |
| 5 | **Repurpose `research/README.md` from a stale summary into the directory's router**: two sentences of state, a question-to-file table, a file table with a live/spent/register status column, the six-script table with filenames, the existing house rule and `history/` warning. Delete the definitions layer, the proven-spine layer, the ten-attacks section and the prior-art section, replacing each with a pointer. **Highest-value single move in this report** — it is the file a fresh agent in `research/` opens, it names zero of the seven documents written since 2026-08-14, and it is the concrete instance of "misled by reading the wrong file first". | MATH (the status column and the question table need judgement; the deletions are SAFE) | after 1 and 4; before 6 |
| 6 | **Fix `README.md`'s Map**: add `ZONE-POSTULATE.md` (the programme's stated focus, absent), `U-FRAME.md` (the live route, absent), `THE-DIALS.md`, `THE-LENS.md`, `FOLD-PROFILE.md`, `TODO.md` (absent entirely); change the first-read pointer from GLOSSARY to the reading path in §4 below. | SAFE | after 5 |
| 7 | **Create `FOLD-PROFILE.md` §8, "The natal cohort: dispersion, and the lineage identity"**, holding the Natal Dispersion Lemma (VERIFIED) and the lineage identity (EXACT), with a Reproduction line naming `fold-profile-09/10/11`. Fills the file's empty numbering slot; zero inbound refs to §8 exist. **This supersedes the provisional §9 assignment** — §9 is Survival, a different subject. | MATH (transcription); placement SAFE | collides with qc-status decision 4 — one decision, not two |
| 8 | **Give the Kanold/Stevens/Paseman loose end one owner, TODO 000b.** Reduce `ZONE-POSTULATE.md:248-252`, `THE-DIALS.md:259-261` and `G2-STATE.md:534-538` to one sentence each plus a pointer. | SAFE | **BLOCKED** by qc-shepherd rec 2 (restore "at the needed constant" to G2-STATE); do that first |
| 9 | **Move `GLOSSARY.md`'s pane/corridor/overshoot block (288-335, 48 lines) to `THE-DIALS.md` §0 dial 1**, keeping three short definition entries behind. | MATH | collides with the GLOSSARY Lemma V truth fix; do the truth fix first, then this |
| 10 | **Move `ZONE-POSTULATE.md` §5a's verdict into its §6** beside route D, and its OEIS numbers into `PRIOR-ART.md`; make `THE-DIALS.md` §5 the owner of the window-exception table and have `G2-STATE.md` §1d and ZONE-POSTULATE quote its row. | MATH | after 3 |
| 11 | **Generate `research/SCRIPTS.md`** by script: filename, ALL-CAPS header title, companion prose if any. The one new document I recommend. Also fix the two head documents that stopped enumerating: `ATTACKS.md`'s wildcard and `FOLD-PROFILE.md:7`'s "01..04". | SAFE | after 5 |
| 12 | **U-FRAME: §8 becomes the custody section** — three L(T₂₃,29) statements (220-224, 816-819, 924-927) collapse to one, the `Lgrowth.js` hazard warning moves in from §5, §12's streaming custody joins it. | MATH | after 2 |
| 13 | **U-FRAME: kill the three duplicate lemma statements** — one Alternation Lemma (from 661-663 + 908-914), one qualifying-gap closed form (from 665-669 + 825-828 + 897-900), one fold-11 explanation (668-669 + 926-929). | MATH | after 12 |
| 14 | **U-FRAME: collapse §12 into §5a Step 3 and the m_eff statement.** §12 is ~60% a restatement of §5a's own EXTENDED block (275-292); the tile list and "6 of 24 misses" survive. | MATH | after 13 |
| 15 | **U-FRAME §5a's four surgical changes** (Step 2 gains the general copy theorem; Step 3 absorbs the EXTENDED block and gains the j\*(1) looseness verdict; new Step 3a for κ(m); Step 4's second copy deleted). **This is the edit that resolves the live §5a-versus-§10 contradiction.** | MATH | **BLOCKED** by `qc-numbers`' pending ρ fix at U-FRAME:646-648 |
| 16 | **U-FRAME: create §10 (L and κ(m)), §11 (the transfer operator and the pair count), §12 (f, the 42 points and the staircase)** from what remains; delete headings 13, 14, 15. Includes C2, the one-sentence forward pointer from §5a Step 7 to the staircase. | MATH | after 12-15 |
| 17 | **One combined inbound-reference sweep** for ~20 pointers to old U-FRAME §§10-15 plus the six-file renumber from qc-history U7. | SAFE | **LAST**. After every content edit in the campaign, per qc-history U7 |
| 18 | **Reduce `OBSERVATIONS.md`'s 33-line triage statement to its two-sentence operational form** plus a pointer to THE-LENS §5. Nothing else in the file is touched. | SAFE | after 1 |
| 19 | **Add a line at the top of `G2-STATE.md` §9** recording which of its nine ranked items have TODO entries (five do) and which exist only there (items 3, 4, 7, 8), so neither document reads as a subset of the other. | SAFE | none |
| 20 | **Document the naming convention in one line** in the repurposed `research/README.md`: ALL-CAPS = standing frame, lowercase-NN = script companion, lowercase = topic note; and note the three known exceptions (`gate-multiplies`, `h2-scoping`, `theta-ladder` are family heads). **Recommend no renames.** | SAFE | inside 5 |

**Deliberately NOT recommended**, so it is not rediscovered: renaming
`ATTACKS.md`/`ATTACKS2.md`/`ATTACKS3.md` (CHRIS if he wants it; the router row is
cheaper); renaming `gate-multiplies.md`, `origin-excess.md`, `localized-04-maxsum.md`
or `beta2-note.md` (each costs a reference sweep and buys a casing rule);
splitting or relocating `OBSERVATIONS.md`; renumbering U-FRAME §§1-9; editing any
script header or READINGS block; creating a current-state index document.

**Paper structure is untouched by all twenty.** `paper/PAPERS.md` §"Paper-grade
assessment" is explicitly "an assessment, not a decision; the moratorium holds and
the calls below are Chris's", and TODO item 12 (the Paper I restructure around
§7A) is CHRIS-DECIDES. I have no architecture recommendation inside `paper/`.

## 2. U-FRAME restructure plan

### 2.0 Three facts that change the shape of the job

I agree the defect is real and is the largest structural one. I disagree with two
parts of the proposed fix, on evidence neither earlier pass measured.

**FACT 1. U-FRAME is the most heavily section-referenced document in the corpus,
and the load is concentrated on exactly the sections that would move.** A sweep
of every `U-FRAME §N` / `U-FRAME section N` / `U-FRAME N` pointer outside
`research/history/` and outside U-FRAME itself:

| target | inbound pointers |
|---|---|
| §5a | **47** |
| §5 | **21** |
| §6a | 14 |
| §4 | 10 |
| §10 | 9 |
| §11 | 8 |
| §9 | 7 |
| §7 | 7 |
| §8, §6, §12, §14, §15 | 1 each |

Total **128 section-level pointers** across **14 body markdown files** (TODO.md,
ATTACKS3, gate-multiplies, G2-STATE, LOCALIZED-GAP, localized-04-maxsum,
localized-single-alignment, a3-05-bound-L, a3-03-f-from-census,
a3-09-histogram-operator, exponent-control, two-class-lower-bounds,
two-class-lower-bounds, PRIOR-ART, THE-LENS) and **15 scripts**. The scripts are
the harder half: their pointers sit inside pasted READINGS blocks that are the
recorded output of a dated run, so they cannot be "corrected" without editing an
artifact's record.

**Consequence, and it is the design constraint the plan must obey: §§1-9 must
keep their numbers.** Any plan that renumbers §5a or §5 costs 68 reference
repairs to buy a better heading, and about a third of them are inside script
output. That is a bad trade and it is why I am not proposing a clean-sheet
renumber.

**FACT 2. §§1-9 are already organised by claim. The disease is confined to
§§10-15.** Read the first nine headings without the last six: the problem with
stepping on p, fold on the odd numbers, the frame, what is measured, what makes
the maximum gap, the copy-theorem reformulation, what the reframing buys, prior
art, next, reproduction, honest status. Every one names an object or a question.
So the fix is not "restructure U-FRAME"; it is **absorb §§10-15 into the
claim-shaped skeleton that already exists, and give a claim name to the residue
that has no home there.** That is a materially smaller and more incremental job
than a rewrite, and it protects all 108 pointers into §§1-9.

**FACT 3. The attack chronology does not need to be created in `history/`,
because it already exists as `research/ATTACKS3.md`, and qc-history cleared that
file in writing.** ATTACKS3 is organised A1…A10, each entry carrying the
question, the first move, the pre-registered win, and a **Landed** verdict, and
five of those verdicts point straight at the U-FRAME section that would move
(`ATTACKS3.md:100` → §13, `:121` → §10, `:136` → §11, `:199` → §§14-15,
`:239` → §12). So U-FRAME §§10-15 are not the chronology's only home; they are a
*second* copy of ATTACKS3's organising principle, holding the mathematics.
**Nothing from U-FRAME §§10-15 goes to `history/` at all.** qc-history's own
size table agrees arithmetically and nobody drew the conclusion: of 61 flagged
lines in U-FRAME, **~9 leave the body** and 36 relocate inside the file. This is
a deduplication-and-relocation job, not a migration job.

### 2.1 The internal duplication, measured — this is the real prize

Nobody has counted this. §§10-15 do not merely sit under the wrong headings;
they **restate §5a and each other**, because six attacks each independently
re-derived the same three lemmas. Every row below is two or three statements of
one fact inside one file:

| fact | stated at | verdict |
|---|---|---|
| the Alternation Lemma (run classes strictly alternate, two-state walk) | 661-663 (§11, "Lemma (alternation, PROVEN)") and 908-914 (§14, "Alternation Lemma (PROVEN, and it is the prize)") | **ONE canonical statement.** §14's is the better one (it carries the 3p window threshold and the quantitative form); §11's two-state framing is the better proof sketch. Merge, keep both halves |
| the qualifying-gap closed form (d_min = 2p∓2; three classes mod 6p) | 665-669 (§11), 825-828 (§13 Lemma A), 897-900 (§14) — **three times** | **ONE statement.** §14's weights-1,1,2 form is the most complete; §13's "checked at all 302 primes 5 to 1999" is the custody; §11's η parameterisation is the same thing in other letters. §14 itself admits the duplication: "agreeing with A3's Lemma A by a different route" |
| the fold-11 anomaly (24 qualifies, T₇ has no gap of that size) | 668-669 (§11) and 926-929 (§14) | ONE statement |
| step 4 is false | 294-317 (§5a Step 4), **401-419 (§5a again, with the table)**, 750-752 (§11 A9), 808 (§12) | ONE statement plus cross-references. Note two of the four are inside §5a itself |
| m_eff = 3,2,2,3,2,3,3,3,4 and why a constant is impossible | 287-292 (§5a) and 803-814 (§12) | ONE statement |
| lower-bound excess 6,0,0,12,0,18,24,18,120 | 277-278 (§5a) and 785-786 (§12) | ONE statement |
| the divisibility mechanism for lower-bound misses (p divides G₂, G₂±2) | 280-284 (§5a) and 789-796 (§12) | ONE statement; §12 adds the tile list and "6 of 24 misses", which is the part worth keeping |
| L(T₂₃,29) = 2 custody, and maxsum₃ = 300 at fold 29 | 220-224 (§5), 816-819 (§12), 924-927 (§14) — **three times**, each claiming a different ordinal ("five times", "the fourth of five", "the fifth time") | ONE custody statement, in §8 Reproduction |

**§12 is roughly 60% a restatement of §5a's own EXTENDED block at lines 275-292.**
That block was written to absorb §12 and the absorption was never finished; both
copies are live. This is the single largest redundancy inside any file in the
corpus and it is invisible to a cross-file shingle scan, which is why the
shepherd's `dedup.js` did not surface it.

### 2.2 The proposed structure, section by section

Numbers §1-§9 unchanged. §§10-15 retired and replaced by three claim-named
sections at 10, 11, 12. Every move below carries its source lines.

**§1 The problem with stepping on p** — unchanged (11 lines).

**§2 Fold on the odd numbers** — unchanged. Owns the Inertness Lemma. (Cited by
`G2-STATE.md:754`.)

**§3 The frame** — unchanged. Owns the budget and the sharp rate ln c(p) ≤ 2 ln p/p.
(Cited by `gate-multiplies.md:46,352`, `G2-STATE.md:754`.)

**§4 What is measured** — unchanged in scope, one deletion. It currently holds the
multiplier ladder, the lifetime slack, the exponent α with its control, and the
G₂(41#) pricing. All four belong to "growth", which is what the section is.
*Collides with a known truth fix*: `gate-multiplies.md:332-334` misquotes this
section's retired reading (qc-history O1) — do not touch line 115 while that fix
is in flight.

**§5 What makes the maximum gap** — keeps the mechanism table and the
adjacent-kill table. **Loses two things.** (i) Its L diagonal at line 220 and its
five-fold custody sentence move to the new §10, which is where L lives; §5 keeps
one sentence naming L and pointing at §10. (ii) The `Lgrowth.js` hazard warning
(lines 225-230) moves to §8 Reproduction, which is the custody section. NOTE: 21
inbound pointers, most of them to the mechanism table and the "merged sub-gaps"
column (e.g. `a3-10-lower-tightness.js:808`), and those stay in §5, so the
pointers stay valid. `a3-05-bound-L.md:102` and `a3-09-histogram-operator.js:594`
point at §5's *L table* specifically and will need repointing to §10 — 2 sites.

**§5a The copy-theorem reformulation** — the biggest and most-referenced section
(199 lines, 47 pointers). **Do not renumber and do not resequence Steps 1-7.**
Four surgical changes:

- *Step 1 (the kill law)*: unchanged.
- *Step 2 (the exact reformulation, m = 1)*: **absorb §10's exact copy theorem for
  the whole family** (lines 622-626, VERIFIED 40/40). Step 2 is the m = 1 case of
  it, `a3-04-maxsum-recursion.js:29` says so explicitly, and stating the general
  form where the special case lives is what makes the section answer the question
  it is asked. This is where TODO item 0c's object gets its home, and TODO:103's
  pointer to §10 must move to §5a Step 2 in the same edit.
- *Step 3 (the two-sided bound)*: fold the inline dated EXTENDED block (275-292)
  into the statement, as qc-shepherd item 3 already asks. Then **add the
  looseness verdict here, from §10 lines 640-644**: j\*(1) measures 1, 2, 1, 2, 2
  against L = 2, 2, 2, 3, 2, so the upper bound is loose, and *a proof aimed at L
  aims past the target*. **This is the single most important edit in the whole
  restructure**, because it is what stops a reader taking §5a Step 3 as an
  invitation to bound L, which is the live contradiction. Also add §10's lower
  recursion (628-630) here, since it is the chaining half of the same bound.
- *New Step 3a, "the family closes and L generalises to κ(m)"*: §10's lines
  616-620 and 632-638 (the closure, the refuted variants, Fekete). Numbered 3a so
  that Steps 4-7 keep their numbers — 12 scripts point at "step 4", "step 6",
  "step 7" by name.
- *Step 4*: delete the second copy at 401-419, keep the table, merge into the
  first statement at 294-317. Add §10's ρ slope reading (646-648). **BLOCKED**:
  `qc-numbers.md` has a pending replacement for exactly lines 646-648 (the ρ
  disagreement with `gate-multiplies.md:359`); that fix must land first.
- *Steps 5, 6, 7*: unchanged in place. Step 6's forward reference "§14 gives the
  mechanism" repoints to §10. Step 7's wobble paragraph (381-387) gains one
  sentence from §15: the real reason f stalls is that twin folds share
  d_min = 2(p+1), so the diagonal is a staircase whose treads are the twin pairs.
  Right now a reader who stops at Step 7 gets the weaker "the bin repeats"
  explanation and never learns the proven one 570 lines later.

**§6 What the reframing buys** — unchanged.

**§6a PRIOR ART** — **gains §11's A9 prior-art block (lines 709-719)**, the Holt
and Rudd arXiv:1408.6002 §5 attribution and the "nothing below may be presented
as new structure" instruction. A prior-art finding belongs in the prior-art
section; leaving it inside an attack section is why `PRIOR-ART.md:117` has to
point at §11 to find it. This is the clearest ownership violation in the file and
the cheapest to fix. Repoint `PRIOR-ART.md:117` in the same edit.

**§7 Next** — unchanged (7 pointers).

**§8 Reproduction** — **becomes the custody section.** Gains the three scattered
L(T₂₃,29) custody statements as one, the `Lgrowth.js` hazard warning from §5, and
§12's streaming custody (818-819). Keeps its honest "the tables came from a
scratchpad that no longer exists" admission, which TODO 11b depends on.

**§9 Honest status** — unchanged in position and role (7 pointers, and it is the
section `LOCALIZED-GAP.md:16,153` and `G2-STATE.md:397` answer). One factual
repair rides along: line 577 says "seven integers, 2, 1, 2, 2, 2, 3, 2, 4" and
lists **eight**, omitting the fold-37 value that §5 line 220 carries. That is a
numbers item, flagged here because it is caused by L's status being stated in
five places.

**§10 (NEW) — "L and κ(m): the proven bounds, and why L is the wrong target."**
Absorbs, in this order: L's definition and the criterion g ≡ 0, ±2 (mod p); the
single canonical qualifying-gap closed form (merged from 665-669 + 825-828 +
897-900); the single canonical Alternation Lemma (merged from 661-663 + 908-914);
the kill graph (902-906); A5 Theorems A, B, C (671-684); "the wall, located
precisely" (686-701); the fold-29 dip mechanism (916-922); the L diagonal and its
five-fold custody (from §5:220-224); κ(m) ≤ L+2 refuted at fold 11 (703-705);
m_eff and why a constant is impossible (single copy, from 803-814); the closing
verdict that the target is κ(m) and the rarer ±2 class at 4p, not L (650-655 +
931-936). **This is the section that answers "what is the current status of the L
question" in one read**, which is the question the brief correctly identifies as
the one an agent will ask.

**§11 (NEW) — "The exact machinery: the histogram transfer operator and the pair
count."** Absorbs A9's operator (721-733), its tail engine and the 31 exact
diagonal points with the flagged FIT (735-747), the caution against transferring
the fit to the head (759-764), the exact PAIRS formula and table (883-896), and
PAIRS extended to fold 37 with the fold-37 alternation check (955-963). Rationale:
these are computational instruments with no tile in memory, they are what makes
the f and L questions measurable at any level, and three of the eight old-§11
pointers (`gate-multiplies.md:445`, `localized-04-maxsum.md:291,305`) are about
exactly this content, so they **stay correct without editing**.

**§12 (NEW) — "f, the qualifying-gap fraction: 42 exact points and the
staircase."** Absorbs A3's Lemma B and the structural negative (830-844), f
settled on 42 points with both regressions (851-859), the singular-series comb
resolving the scatter (861-871), A3's caveats (873-879), and §15's staircase
theorem (940-953). Leaves §5a Step 7's seven-row diagonal table **where it is**,
because 12 script pointers name it, and cross-references it from here. Old §13's
single pointer (`ATTACKS3.md:100`) repoints from §13 to §12.

**Retired:** §§13, 14, 15 as numbers. Old §12's one pointer
(`ATTACKS3.md:239`) repoints to §5a Step 3, where A10's answer now lives. Old
§10's nine pointers repoint to §5a (Step 2 or Step 3a as appropriate). Old §11's
remaining five pointers repoint to §10 (Theorem B) or §6a (prior art).

### 2.3 Order of application — seven independently landable steps

Each step leaves the file self-consistent. Nothing here is a big bang.

1. **§6a gains A9's prior-art block; repoint `PRIOR-ART.md:117`.** Smallest,
   cleanest, zero mathematical risk, and it removes the worst ownership
   violation. SAFE.
2. **§8 becomes the custody section**: three L(T₂₃,29) statements collapse to one,
   `Lgrowth.js` warning moves in, §12's streaming custody moves in. SAFE.
3. **Kill the three duplicate lemma statements**: one Alternation Lemma, one
   qualifying-gap closed form, one fold-11 explanation. These are *merges of
   provably identical content* and can be verified by reading the three copies
   against each other. NEEDS-MATH-JUDGEMENT (light — the merge must not drop the
   3p window threshold or the weights 1,1,2).
4. **Collapse §12 into §5a Step 3 / the m_eff statement.** The 60% overlap goes;
   the tile list and "6 of 24 misses" survive. NEEDS-MATH-JUDGEMENT.
5. **§5a's four surgical changes**, in the order Step 2, Step 3, Step 3a, Step 4.
   Step 4 is BLOCKED on `qc-numbers`' ρ fix. NEEDS-MATH-JUDGEMENT, and it is the
   step that resolves the live contradiction.
6. **Create §10 from the residue of §§11, 14 and §5's L material.** By now
   §§11-15 have been stripped of everything that belonged elsewhere, so this is
   assembly rather than triage. NEEDS-MATH-JUDGEMENT.
7. **Create §11 and §12 from what remains; delete the old headings; sweep the ~20
   inbound pointers to old §§10-15 in one pass.** The sweep must be one pass, not
   file by file, for the reason qc-history U7 gives. SAFE once 1-6 have landed.

**Relative-order constraints.** Step 7's sweep must come after all of 1-6 AND
after the six-file renumber pass qc-history U7 describes, because
`gate-multiplies.md` and `two-class-lower-bounds.md` are both losing a §10 of
their own and both carry U-FRAME pointers. One combined reference pass at the end
of wave 2, covering both renumbers, is the only safe arrangement.



## 3. Verdict on OBSERVATIONS.md

**VERDICT: leave it exactly as it is, in place, unsplit and unshortened. Do not
add it to the reading path. Take exactly one thing out of it — not text, but four
inbound citations that name it as the home of something it does not own.**

Reasoning, in the order the evidence arrived.

**1. It is already outside the default reading path, and nobody noticed.**
`README.md`, `research/README.md` and `TODO.md` mention `OBSERVATIONS.md` **zero
times** between them (checked all three). Its only inbound references from body
markdown are seven lines in five files, and they split cleanly in two:

| citing site | what it cites OBSERVATIONS for |
|---|---|
| `ZONE-POSTULATE.md:326` | the triage rule |
| `maier-matrix.md:428` | the triage rule |
| `maier-matrix.md:579` | the triage rule |
| `G2-STATE.md:473` | the triage rule |
| `web/PROPOSAL.md:363` | entry 5, the box construction |
| `web/bench/README.md:27` | entry 5, the box construction |
| `web/bench/README.md:46` | entry 5a, k-box numbers |

So the question the brief poses — "does a sightings notebook belong in the
reading path at all" — is already answered by the corpus: it is not in it. No
agent following any entry point will load it. **The 688 lines are not being paid
by anyone.** Moving it out of a path it is not in would buy nothing and cost
seven reference repairs.

**2. But the four triage-rule citations are wrong, and that is the real finding
here.** OBSERVATIONS does not own the triage rule. `THE-LENS.md` §5 does, and it
says so in writing: `THE-LENS.md:184` — "What is ours is … **the triage rule of
§5**." THE-LENS §5 is titled "What the lens does not buy, and the rule that keeps
us honest", states the rule, states the working test, and carries the Holt
Conjecture 2.1 payout. That is the canonical home, it is the better statement,
and it is 188 lines rather than 688 — a reader sent there pays a quarter of the
tokens for a better answer.

**3. The rule is stated three times in full, at three altitudes, and no earlier
pass caught it.** This is not in the shepherd's 45-pair shingle inventory nor in
his seven-pair to-diff list:

- `OBSERVATIONS.md:14-46` (33 lines) — the rule, the two kinds, the boundary
  cases, the Holt payout.
- `THE-LENS.md:130-154` (25 lines) — the rule, the completeness argument for why
  it is sharp, the working test, the Holt payout.
- `ZONE-POSTULATE.md:324-345` (22 lines) — the rule attributed to OBSERVATIONS,
  the residue list, the failure mode, the Holt payout again.

Three copies of the Holt Conjecture 2.1 story, ~80 lines total. By Chris's rule
two of the three restatements do earn something: ZONE-POSTULATE's copy applies
the rule to *its own* target ("The Zone Postulate is an interval statement"),
which is a use rather than a repetition, and OBSERVATIONS' copy is the bench's
own working instruction. What none of them earns is **three independent
statements of the Holt payout**, which is a single fact about a single published
paper and is drifting already: OBSERVATIONS calls it "the best evidence it is not
just a slogan", THE-LENS "the reason to run it on our own arguments first",
ZONE-POSTULATE "the strongest evidence available". Same fact, three self-assessments.

**4. The rest of OBSERVATIONS is cheap and occasionally pays.** Ten entries, nine
live, one REFUTED and correctly kept marked. Its house rules (lines 7-12) pre-date
the 2026-08-17 convention and agree with it, including the discipline that an
entry becoming real work "leaves for a research artifact and keeps only a forward
pointer here" — which is the convention's own mechanism, invented independently in
this file. Entry 5 is the sole documentation of the box construction that
`web/bench/` and `web/PROPOSAL.md` both build on, so it is load-bearing for the
web layer. And its cheapness is measurable: at zero inbound references from any
entry point, the file's cost to a fresh agent is zero unless the agent goes
looking, which is exactly what a notebook should cost.

**The one thing I would change, and it is three lines of edit.** Repoint the four
triage-rule citations from `OBSERVATIONS.md` to `THE-LENS.md` §5, and in
OBSERVATIONS' own header replace the 33-line statement of the rule with the
two-sentence operational form plus a pointer to THE-LENS §5. That leaves the
bench's working instruction where the bench needs it, puts the authority where
the corpus already says it belongs, and removes one of the three Holt-payout
copies. It does not touch a single sighting. SAFE.

**What I would NOT do, and why.** Not split live from spent sightings: nine of
ten are live, so the split yields a 650-line file and a 35-line file. Not move it
to `history/`: qc-history cleared it in writing and it is not a process record.
Not shorten the entries: entry 4 (lucky numbers as a falsification control) and
entry 7 (where capacity alone dies) are the kind of negative result the campaign
exists to protect. Not add it to a reading path: a sightings notebook read by an
agent chasing a specific question is 688 lines of other people's hunches.



## 4. Recommended reading paths

For a fresh agent with one specific question. Line counts are what the path costs.
These are the table recommendation 5 should install in `research/README.md`.

**The universal first two, and they are cheap.** `README.md` §Status (48 lines)
then `research/G2-STATE.md` §0 (23 lines). Seventy-one lines buys: the central
object, the 4.2665-against-2 gap, the fact that no route has moved it, and the
warning that three of the programme's quantities are surfaces rather than
constants. Nothing else in the corpus delivers that in under 300 lines. **Do not
send a fresh agent to `research/GLOSSARY.md` first** — 353 lines, and its Lemma V
entry currently states the wrong open problem.

| the question | read, in this order | cost |
|---|---|---|
| what is the target, and what is its exact logical status | `ZONE-POSTULATE.md` §§1-2, then §3 | ~80 |
| what is the state of G₂ | `G2-STATE.md` §0, then the section named in §10's table | 23 + one section |
| why is the tile the right object at all | `THE-LENS.md` (whole; it is 188 lines and it is the frame) | 188 |
| which variable should I push | `THE-DIALS.md` §3 (the summary table), then §4, then the one dial | ~40 |
| what is proven and what is Holt's | `PRIOR-ART.md`, then `G2-STATE.md` §8 | ~470 |
| what is closed — do not retry this | `G2-STATE.md` §5b (the closed table), then `ATTACKS3.md` for the u-frame wave, then `ATTACKS.md`/`ATTACKS2.md` for the earlier ones | ~40 + 307 |
| what should I work on | `TODO.md` §Now, and nothing else in TODO | ~150 |
| the live route, and its one gap | `U-FRAME.md` §§1-3 (the frame), §5a Step 3 (the bound), then the L section | ~150 |
| what does this word mean | `GLOSSARY.md`, the entry only | ~10 |
| the exponent, and why the fits cannot be trusted | `exponent-control.md`, then `G2-STATE.md` §3b | ~320 |
| the anchored / β side | `paper/anchored-note.md`, then `GLOSSARY.md` §"The anchored layer" | ~560 |
| how do I reproduce a number | `G2-STATE.md` §10's command block, or the owning file's Reproduction section | ~40 |
| the history of a specific claim | `history/CHANGELOG.md`, indexed by document — **and nothing else in `history/`** | as needed |

**The two paths a fresh agent takes today, for contrast.** Following README:
GLOSSARY (353) → THE-LENS (188) = 541 lines, never arrives at G2-STATE, and
acquires the wrong open problem from GLOSSARY's Lemma V entry. Following TODO:
ZONE-POSTULATE (374) + G2-STATE (884) = 1,258 lines, correct but eighteen times
the cost of the 71-line opening above.

## 5. File-by-file purpose inventory

One line each: what the file is FOR. Class: **ORIENT** / **LIVE** (a live topic
note) / **SPENT** (the question it was written to answer is answered; the artifact
is the record) / **REG** (register or scoreboard) / **SUB** (submission draft) /
**PAPER**. Method for the class column is stated in §0; it is a content judgement,
not an in-repo marker, because **no in-repo marker exists** (the words SPENT and
CLOSED appear nowhere in any body markdown).

### Orientation layer (read in full)

| file | lines | what it is FOR | class |
|---|---|---|---|
| `README.md` | 81 | the repo's front door: the Map and a one-paragraph state | ORIENT |
| `research/README.md` | 157 | nominally the research programme's front page; in fact a 2026-08-13 summary. Its live job should be routing (rec 5) | ORIENT |
| `research/GLOSSARY.md` | 353 | the adopted vocabulary, one term per object, with canonical aliases | ORIENT |
| `research/THE-LENS.md` | 188 | why the tile is the right object: completeness, exact recursion, misalignment, the triage rule, the five one-number reformulations | ORIENT |
| `research/ZONE-POSTULATE.md` | 374 | the target: statement, weak⟺TPC biconditional, what is proven toward it, the 1e11 verification, the four routes | ORIENT |
| `research/G2-STATE.md` | 884 | the central object's consolidated state, every claim calibrated and sourced; best-ordered document in the corpus | ORIENT |
| `research/THE-DIALS.md` | 275 | which variables this programme can actually push: seven dials, u as the master variable, margin is not a dial | ORIENT |
| `TODO.md` | 396 | forward-only: what to try next, each item with question, first move, and what a win buys | ORIENT |
| `paper/PAPERS.md` | 180 | the four-paper architecture, official positioning, the paper-grade assessment awaiting Chris | ORIENT |
| `paper/writing-style-math.md` | 164 | house style for all primeoire prose: voice, calibration ladder as grammar, banned constructions | ORIENT |

### Live topic notes

| file | lines | what it is FOR | class |
|---|---|---|---|
| `research/U-FRAME.md` | 967 | **the live route**: the Zone Postulate as one inequality in one variable; the frame, the copy theorem, L | LIVE |
| `research/theta-ladder.md` | 740 | does the all-positions exponent θ turn over below 2? Exact suprema say no, and rising | LIVE |
| `research/two-class-lower-bounds.md` | 709 | the adversary's side: how large can G₂ be forced? The certified ladder and the Poisson law | LIVE |
| `research/FOLD-PROFILE.md` | 628 | where a fold's damage lands inside the tile: the Level Ledger, the Mirror Ledger, survival | LIVE |
| `research/maxgap-law.md` | 594 | c is a surface, not a constant; plus the register of which repo extrapolations inherit the old error | LIVE + REG |
| `research/gate-multiplies.md` | 521 | does the no-fixed-point argument close the whole u-frame branch? No; and the Overshoot Budget | LIVE |
| `research/sift-limit-attack.md` | 431 | where the dimension-2 sieve discards our structure; the refinement inventory from 4.2665 toward 2 | LIVE |
| `research/level-ledger-tight.md` | 426 | can the Level Ledger exponent be tightened? R\*(y) by exhaustion; the exponent does not move | LIVE |
| `research/bv-import-survey.md` | 371 | which open legs become theorems under BV / EH / GRH | LIVE |
| `research/discrepancy-two-class.md` | 341 | the two-class signed discrepancy, its ×3 ceiling, and the Level Ledger's true looseness | LIVE |
| `research/exponent-control.md` | 284 | the exponent measured against a control whose answer is known: the estimator is biased at these sizes | LIVE |
| `research/a3-09-histogram-operator.md` | 249 | the gap-histogram fold rule as an exact transfer operator (= Holt-Rudd 2014) and the computed tail law | LIVE |
| `research/d2-d4-bijection.md` | 90 | first proof of Labos's 2001 A059861 remark, #d=2 = #d=4, by explicit bijection | LIVE |

### Spent campaign artifacts (the question is answered; the file is the record)

| file | lines | what it is FOR | class |
|---|---|---|---|
| `research/origin-excess.md` | 784 | can the Origin Excess Lemma reach S = x′²? No, and the scale collision is structural | SPENT |
| `research/maier-matrix.md` | 635 | Maier's matrix on the twin-slot set: complete classification, and it yields nothing | SPENT |
| `research/a3-05-bound-L.md` | 457 | A5: the first unconditional bound on L, and the wall it cannot pass | SPENT |
| `research/localized-04-maxsum.md` | 414 | the maxsum growth law, the Deficit Lemma, the Traverse Bound | SPENT |
| `research/h2-scoping.md` | 409 | pricing an extension of A288815: infeasible and non-diagnostic | SPENT |
| `research/dhr-verification.md` | 321 | verifies beta2-note's Diamond-Halberstam citations against primary sources | SPENT |
| `research/LOCALIZED-GAP.md` | 215 | the Localized Merge Lemma and why the localized chain does not close | SPENT |
| `research/localized-single-alignment.md` | 181 | the single-alignment recursion for M(x, x³); route closed | SPENT |
| `research/covering-dive.md` | 160 | literature dive on Jacobsthal and covering systems; source of the PROVEN/CONJ/ABSENT legend | SPENT + REG |
| `research/a3-03-f-from-census.md` | 139 | A3: two lemmas pinning f from the grain census law, and where the law stops | SPENT |
| `research/anchored-windows.md` | 137 | formalizes anchored-vs-random windows; superseded by `paper/anchored-note.md` | SPENT |
| `research/two-moire-argument.md` | 79 | Chris's two-moiré formulation of TPC, adjudicated assertion by assertion | SPENT |
| 11 of the 12 `research/natal-cap-NN-*.md` | 65-229 each | one campaign attack apiece: sieve cap, overlap sign, discrepancy lemma, calm lemma, beyond-Chebyshev, cov-adj proof, minus-half, skeleton bound, calm-vs-kill, wrap identity, skeleton door | SPENT |
| `research/natal-cap-04-packing-notes.md` | 104 | literature: does a two-class dense-packing function exist in print? Apparently not | SPENT |

### Registers, submissions, papers, web

| file | lines | what it is FOR | class |
|---|---|---|---|
| `research/PRIOR-ART.md` | 422 | the novelty audit: every claim as classical / known-obscure / possibly novel, with sources | REG |
| `research/ATTACKS3.md` | 250 | the u-frame wave's route-status register, A1-A10, each with a Landed verdict | REG |
| `research/NATAL-CAP-CAMPAIGN.md` | 100 | the natal-cap campaign's scoreboard, convergent findings, ranked opens | REG |
| `research/ATTACKS2.md` | 34 | the copy-geography wave's scoreboard | REG |
| `research/ATTACKS.md` | 23 | the first wave's scoreboard, ten rows; highest information density per token in the corpus | REG |
| `research/OBSERVATIONS.md` | 688 | bench sightings recorded before they are chased, each triaged residue/interval | REG |
| `research/oeis-G2-submission.md` | 118 | ready-to-paste OEIS draft for G₂, with term provenance | SUB |
| `research/oeis-seam-submission.md` | 119 | ready-to-paste OEIS draft for primorial-seam twins | SUB |
| `paper/moire-primes.md` | 928 | Paper I, the flagship draft: the tile, the family, the wall as five doors, §7A's four faces | PAPER |
| `paper/staircase-note.md` | 537 | per-prime hard caps on the Scour, certified twin floors, the K\* law | PAPER |
| `paper/anchored-note.md` | 529 | the conjecture compressed to the positivity of β, with Assumption A priced | PAPER |
| `paper/variance-note.md` | 361 | the exact window variance over a primorial period, and the open Var/E limit | PAPER |
| `paper/beta2-note.md` | 325 | Paper II: the two-sided bounds on the twin Jacobsthal, G₂ ≪ p^{4.2665+ε} | PAPER |
| `web/PROPOSAL.md` | 608 | build proposal for the public scroll page: aha ladder, instrument bench, cost, open decisions | ORIENT (build brief) |
| `web/bench/README.md` | 146 | how to open and read the local instrument bench | ORIENT |
| `attestation/README.md` | 64 | the OpenTimestamps priority ritual and backup policy | ORIENT |

## 6. Diagnosis (a)-(g)

### (a) ENTRY PATH

**Verdict: a fresh agent does NOT know what to read first, and the three
candidate entry points disagree. This is the second-largest architectural defect
after U-FRAME, and unlike U-FRAME it is cheap to fix.**

Three documents each act as an entry point and each names a different first read:

| Entry point | Says read first | Line |
|---|---|---|
| `README.md` (repo root) | `research/GLOSSARY.md` — "Read this first" | 18 |
| `research/GLOSSARY.md` | `THE-LENS.md` — "read [THE-LENS.md] first" | 3-6 |
| `research/README.md` | nothing; it is itself a summary with no "read next" | — |
| `TODO.md` | `research/ZONE-POSTULATE.md` then `research/G2-STATE.md`, "Read those before starting anything below" | 18-21 |

So the pointer chain from the root is README → GLOSSARY → THE-LENS, three hops
before any mathematics, and it never arrives at `G2-STATE.md`, which is the
document that actually holds the current state of the central object. TODO.md,
which is where an agent asked "what should I work on" naturally lands, points
straight at ZONE-POSTULATE + G2-STATE and skips the vocabulary layer entirely.
Both paths are defensible; having both, unreconciled, is what costs tokens,
because an agent that follows README's path pays ~540 lines (GLOSSARY 353 +
THE-LENS 188) before it learns what the open problem is.

**Evidence that the entry path carries real weight, and gets it wrong.** The
known GLOSSARY defect (qc-status A-1: GLOSSARY:265 calls Lemma V "the one
missing ingredient on the exponent road" while TODO item 0 and
`sift-limit-attack.md` say the operative unproven input is the Gaussian maximal
law for the sawtooth, and that at θ ≈ 2.5 the ratio s/u = 1.2 is outside the
range Lemma V is even stated in) is a defect *in the file README tells you to
read first*. An agent that reads only the file it was told to read first
acquires the wrong open problem. That is the cost of the entry path being a
glossary.

**The maps do match the files.** Checked every path in README.md's Map table and
every file path named in `research/README.md`: all resolve. The shepherd's
`refcheck.js` pass independently found only 2 dead file paths corpus-wide, both
false alarms in `web/PROPOSAL.md` (planned artifacts). So the entry-path defect
is about *ordering and completeness*, not broken links.

**The maps are incomplete in one way that matters.** README.md's Map lists 13
paths. It does not name `research/ZONE-POSTULATE.md` — the document TODO.md
calls "THE PROGRAMME'S FOCUS" — nor `research/THE-DIALS.md`, `research/THE-LENS.md`,
`research/FOLD-PROFILE.md`, or `research/U-FRAME.md`, the repository's live route.
A reader who trusts README's Map does not learn the programme's stated focus
exists. Meanwhile `research/README.md` is structured around the *2026-08-13 ten
attacks* (§"The ten attacks", 31 lines) and the six-script measurement table,
which is the state of the work as of four days before the current head; it never
mentions the u-frame, the natal-cap campaign's nine theorems, β, the anchored
layer, or the 4.2665 exponent. It is an accurate document about an earlier
altitude, presented as the research program's front page.

### (a2) THE SIX-SUMMARY PROBLEM, the entry path's underlying cause

The entry path cannot be fixed by adding one pointer, because **seven documents
totalling 2,279 lines are all written at summary altitude about the same
programme** and none declares a scope that excludes the others.

| document | lines | its stated job, in its own words |
|---|---|---|
| `README.md` §Status | 48 | the repo's one-paragraph state |
| `research/README.md` | 157 | "the research program: proven spine, measurements, the wall" (README's Map) |
| `research/GLOSSARY.md` | 353 | the vocabulary — but its entries carry full status paragraphs |
| `research/THE-LENS.md` | 188 | "why the tile is the right object" |
| `research/ZONE-POSTULATE.md` | 374 | "the programme's stated focus … **the thing every other artifact in the repo should be able to point at**" |
| `research/THE-DIALS.md` | 275 | "every variable this programme can actually push" |
| `research/G2-STATE.md` | 884 | "the state of the object … **assembles what is known** from eleven notes" |

Two headers explicitly claim to be the hub (`ZONE-POSTULATE.md:5`,
`G2-STATE.md:3-4`). Both are true of their own subject. README points at neither.

**Measured overlap** — occurrences of the same load-bearing item:

| fact | README | res/README | GLOSS | LENS | ZONE-P | DIALS | G2-STATE | TODO |
|---|---|---|---|---|---|---|---|---|
| the 4.2665 exponent | 2 | – | 4 | 1 | 4 | **13** | 8 | 3 |
| the 1.57 measured exponent | 1 | 2 | 1 | – | 1 | 3 | 4 | – |
| the control line (1.282 on 58 terms) | – | – | – | – | 1 | 1 | **4** | – |
| Kanold/Stevens/Paseman loose end | – | – | – | – | 1 | 1 | 2 | 1 |
| Erdős #687 / the $1000 | – | – | – | – | 1 | 1 | 1 | – |
| ρ(2) = e^{2γ}/4 = 0.79305 | – | 1 | 1 | – | 1 | – | 5 | 1 |
| the infinitely-often slack | – | 1 | – | – | 4 | 4 | 2 | 3 |

**Most of this is not a defect and I am not proposing to cut it.** Chris's rule
holds: `THE-DIALS.md` §6 states the 4.2665-against-2 gap as a *price*, answering
his question "if we can produce a formal max-gap bound smaller than the zone, are
we home free?" That is a different thing from `G2-STATE.md` §0 stating it as the
object's status, and both earn their tokens.

**What IS a defect is the Kanold/Stevens/Paseman row.** Four documents state one
unchecked to-do item in full and independently — `ZONE-POSTULATE.md:248-252`,
`THE-DIALS.md:259-261`, `G2-STATE.md:534-538` plus again at §9 item 2, and
`TODO.md` 000b — and one of the four has already drifted: qc-shepherd 3d shows
G2-STATE's copy dropped "at the needed constant", which is the whole question.
**TODO 000b is the correct owner** (forward-looking item, forward-only charter);
the other three should state the consequence in one sentence and point at it.

**And this explains the entry path.** Because seven documents summarise, no one of
them can be named the first read without being wrong about something, which is why
README fell back to naming the glossary.

### (b) ALTITUDE CONFUSION

Ranked by what a reader pays for the mixture.

**B1. `research/README.md` mixes five altitudes and one is four days stale.** A
*definition* layer (§Definitions used throughout, 16 lines, duplicating
GLOSSARY — and it points at GLOSSARY on line 29 and then restates anyway); a
*theorem* layer (§The proven spine, 7 items with proofs-in-a-paragraph,
duplicating THE-LENS §§1-2); a *measurement record* (§The measurements,
six-script table); a *campaign record* (§The ten attacks, 31 lines about a single
day, 2026-08-13); a *positioning* layer (§Prior art & novelty, 21 lines,
duplicating PRIOR-ART.md). **Where each belongs:** definitions → delete, the
pointer already exists; proven spine → THE-LENS §§1-2 owns the mathematics and
G2-STATE §8 owns the attribution; six-script table → **keep**, it is the only
index of scripts 01-06 that exists anywhere and five of those scripts are
otherwise unreferenced (see (g)); ten attacks → ATTACKS.md owns it, replace with a
pointer; prior art → PRIOR-ART.md owns it, replace with a pointer.

**B2. `research/GLOSSARY.md` is a glossary that became a status register.** Seven
entries run past 15 lines carrying current measurement with calibration markers:
**Seam** (36-51, 16 lines, four measured survival ratios with z-scores and a
script citation), **Overlap credit** (78-86), **Unification Law** (154-159), **G₂**
(175-184), **anchored bias β** (202-210), **the X-channel** (228-235), and the
**pane/corridor/overshoot** trio (288-335, **48 lines**, six tables' worth of
numbers plus the A7 verdict). That last block is not vocabulary; it is
`THE-DIALS.md` §§0-1 restated inside a definition list. **Where it belongs:** the
pane's definitions (pane, pane slot, corridor) stay as three short entries; the
Pane Bound verdict, the corridor's closing rate and the overshoot's
double-logarithm move to `THE-DIALS.md` §0 dial 1, which already owns the pane's
adjudication and already says "The pane is closed twice over now". This is also
where GLOSSARY's known Lemma V defect lives (line 265): **a glossary that carries
route status goes stale at the speed of the routes, and it has.** That is the
structural lesson behind the truth finding the brief already knows about.

**B3. `research/G2-STATE.md` mixes state with plan, and it is the good case.** §9
"Open questions, ranked" is 81 lines of plan in a state document, and `TODO.md` is
the plan document. I checked for contradiction and found none: of §9's nine items,
five have TODO counterparts (0, 000b, 0e, parked G₂(41#), and item 1 = TODO 0) and
**four exist only here** (items 3, 4, 7, 8). **Verdict: leave it**, because §9 is
ranked "by what each would buy" while TODO ranks by what to try next, and deleting
it would lose four items. One edit: a line at the top of §9 saying which items
have TODO entries, so an agent does not read §9 as a subset of TODO or vice versa.

**B4. `research/ZONE-POSTULATE.md` §5a is a prior-art finding inside the
obstruction section.** Lines 185-224 (40 lines) answer Chris's narrower-window
question, find OEIS A091592/A091591/A113274, and conclude the tight square window
is TPC-hard. That is an attack-surface verdict plus a prior-art finding, sitting
between §5 "The obstruction, named" and §6 "The attack surface". **Where it
belongs:** the verdict into §6 beside route D; the OEIS numbers into
`PRIOR-ART.md`. Its content also appears in `THE-DIALS.md` §5 with the fuller
table (exceptions 12/1/0, custody line, min-count/HL column) and a third time in
`G2-STATE.md` §1d. **THE-DIALS §5 should be the owner** — it has the measurement
and the custody; the other two quote its row and point.

**B5. `research/FOLD-PROFILE.md` has corrupt section numbering**, which is an
altitude problem in the literal sense: the reader cannot tell where they are.
Heading order is 0, 1, 2, 3, 4, 5, 6, 7, **9, 11, 12, 10** — there is no §8, and
§10 (Reproduction) sits physically last, after §§11 and 12. Inbound references
cite §2, §3, §4, §5, §9, §9a, §9b, §11, §12b, so "FOLD-PROFILE §10" is ambiguous
between position and label for any future citation. **Zero inbound references to
§8 or §10 exist** (checked), so this is repairable at no reference cost, and it
matters for (d) below.

**B6. `research/U-FRAME.md` §§10-15** — the largest instance; treated in §2 above.

### (c) ORDERING WITHIN DOCUMENTS

I ranked candidates by (lines a reader must traverse before the statement they
need) × (traffic). Four pay; the rest do not, and I am not listing 63.

**C1. `research/U-FRAME.md` §5a, Step 4 stated twice with Steps 5-7 in between.**
Step 4 is declared FALSE at lines 294-317, then Steps 5, 6 and 7 run for 84 lines,
then lines 401-419 return to Step 4 and declare it false again *with the table
that should have been in the first statement*. A reader meets the conclusion,
leaves it, and meets it again. **Fix:** table joins the first statement; the second
block goes. This is inside restructure step 5 above.

**C2. `research/U-FRAME.md` §5a Step 7's wobble explanation is superseded 570
lines later and the reader is not told.** Lines 381-387 explain f's
non-monotonicity as "the bin repeats across consecutive folds" plus
Hardy-Littlewood comb noise. §15 (940-953) proves the actual reason: twin folds
share d_min = 2(p+1), so **the diagonal is a staircase whose treads are the twin
pairs**, VERIFIED at all 18 twin pairs below 300, and it names T₂₉ and the 17/19
pair as the specific cases §5a could not explain. A reader who stops at Step 7 —
which is what 12 script pointers direct them to — gets the weaker account.
**Fix:** one sentence into Step 7 pointing forward. Highest benefit-to-risk ratio
of any single edit in U-FRAME.

**C3. `research/G2-STATE.md` is the corpus's best-ordered document and should be
the template.** §0 "What is hard here, first" is 23 lines and answers "what is the
state" before any derivation; §10 is a source table with reproduction commands.
Recording this because the ordering recommendations below are all "do what
G2-STATE §0 does", and because it means **G2-STATE §0 is the right first read for
the central question and no new document is needed for it** (see (f)).

**C4. `research/ZONE-POSTULATE.md` buries its own headline.** The document is
"the programme's stated focus", and the single most useful sentence in it for a
fresh agent — the postulate holds for every prime to 10¹¹, 4,118,054,813 primes,
zero failures — is at line 90, after 89 lines of statement and logical status. Its
§1 and §2 are correct and load-bearing (the weak-form biconditional is the
programme's logical spine) so they should not move. **Fix:** a three-line
"where this stands" block after the title, in G2-STATE §0's shape: the target, the
verification, the proven bound, the gap. Cheap, no content moves.

**C5. Not worth doing, recorded so nobody spends time:** `theta-ladder.md`,
`maxgap-law.md`, `origin-excess.md`, `two-class-lower-bounds.md` and
`maier-matrix.md` all put a verdict block near the top and derivations after it. I
sampled their first 40 lines and their heading lists; the ordering is sound. The
corpus's ordering discipline is generally good, which is why (c) has four items
and not twenty.

### (d) OWNERSHIP BOUNDARIES

**D1. The Natal Dispersion Lemma and the lineage identity. I do not confirm
FOLD-PROFILE §9, and I have a better answer: FOLD-PROFILE §8, the empty slot.**

The brief's provisional assignment collides with what §9 is. `FOLD-PROFILE.md:253`
§9 is "Survival: what is left in the window after every later prime is folded in",
backed by `fold-profile-05-survival-curve.js`, and its subject is a fixed window
under continued folding. The Natal Dispersion Lemma's subject is different: *can
the later primes kill a whole natal cohort* — its home artifact is
`research/fold-profile-09-natal-dispersion.js`, whose proof sits in its comments
(`qc-status.md:405`). The lineage identity (rarity × quality = share, EXACT at
every level) belongs with `fold-profile-10-lineage-census.js` and
`fold-profile-11-lineage-yield.js`. Putting a cohort lemma inside a window section
recreates exactly the ownership problem being fixed.

**Why §8 is the right slot, and it is better than a new section anywhere:**

1. **§8 does not exist** (B5 above), so this fills a numbering hole rather than
   creating one, and **zero inbound references point at §8**, so it breaks nothing.
2. It sits immediately before §9 Survival, which is the correct reading order:
   the cohort and its dispersion, then what survives.
3. **It gives three orphan scripts their first prose home.** FOLD-PROFILE.md cites
   `fold-profile-01` through `-08` and no further; scripts 09, 10, 11, 13, 14, 15
   and 16 have no markdown home at all, and 10, 11, 13, 14, 15, 16 are on the
   corpus-wide orphan list (see (g)). Documenting 09, 10 and 11 in §8 converts
   half the family's undocumented tail into a documented block.
4. FOLD-PROFILE is already the right *file*: the brief is correct about that, and
   §§4-5 (the Mirror Ledger, the head deficit) are the natural neighbours.

Suggested heading: **"§8. The natal cohort: dispersion, and the lineage
identity"**, holding the lemma with its VERIFIED marker, the identity with its
EXACT marker, and a Reproduction line naming scripts 09, 10, 11. NEEDS-MATH-JUDGEMENT
for the transcription; the placement is SAFE.

**D2. The triage rule is cited to `OBSERVATIONS.md` by four documents while
`THE-LENS.md` §5 owns it and says so.** Full treatment in §3 above. This is the
clearest ownership violation in the corpus after U-FRAME §11's prior-art block,
because two of the four citing sites are `G2-STATE.md:473` and
`ZONE-POSTULATE.md:326` — the corpus's most-trusted summary and its stated focus.

**D3. `research/U-FRAME.md` §11 holds a prior-art finding that `PRIOR-ART.md`
has to reach into an attack section to cite.** `PRIOR-ART.md:117` says "A9 is
demoted. `research/U-FRAME.md` §11 presents the histogram transfer operator…".
The Holt and Rudd arXiv:1408.6002 §5 attribution, and the instruction "Nothing
below may be presented as new structure", belong in U-FRAME §6a, the file's own
prior-art section. Restructure step 1.

**D4. `research/GLOSSARY.md`'s 48-line pane block is `THE-DIALS.md` §0's
content.** See B2.

**D5. The Kanold/Stevens/Paseman loose end has four owners.** See (a2).

**D6. `research/maxgap-law.md` holds a register that is not its subject.**
qc-shepherd and qc-status both treat it as a topic note, and its own job is
reconciling the two max-gap constants by showing c is a surface. It also carries
"which repo extrapolations inherit the error", which is a corpus-wide register
entry. Not worth moving — one place is better than five — but worth knowing that
`maxgap-law.md` is where that register lives, because its name does not say so.

### (e) NAMING AND DISCOVERABILITY

**E1. The families are coherent except in one respect: casing is the only signal
distinguishing a standing frame from a script companion, and it is undocumented
and violated three times.** Present convention, inferred: ALL-CAPS =
frame/campaign head (`U-FRAME`, `G2-STATE`, `ZONE-POSTULATE`, `THE-DIALS`,
`THE-LENS`, `GLOSSARY`, `FOLD-PROFILE`, `LOCALIZED-GAP`, `PRIOR-ART`,
`OBSERVATIONS`, `ATTACKS*`, `NATAL-CAP-CAMPAIGN`, `TODO`); lowercase-with-NN =
prose companion to the script of the same stem (all 12 `natal-cap-NN-*.md`,
`a3-03`, `a3-05`, `a3-09`, `localized-04-maxsum`); lowercase-without-NN =
standalone topic note (`maier-matrix`, `origin-excess`, `theta-ladder`, …).
**The three violations are family heads wearing topic-note names:**
`gate-multiplies.md` is the head of `gate-multiplies-01/02/03.js`;
`h2-scoping.md` heads four unnumbered `h2-*.js`; `theta-ladder.md` heads two
`theta-ladder-*.js`. **Recommendation: document the convention in one line rather
than rename anything.** `gate-multiplies.md` alone carries 20+ inbound references
and is cited from TODO 0b; renaming it to buy a casing rule is a bad trade.

**E2. A reader CANNOT tell a live topic note from a spent campaign artifact by
name, and no in-repo marker exists either.** By content, roughly 14 of the 28
non-`natal-cap` research notes are spent (`origin-excess`, `maier-matrix`,
`a3-05-bound-L`, `localized-04-maxsum`, `h2-scoping`, `dhr-verification`,
`a3-03-f-from-census`, `LOCALIZED-GAP`, `localized-single-alignment`,
`anchored-windows`, `two-moire-argument`, and 11 of the 12 `natal-cap-NN`) while
14 are live. **The words SPENT and CLOSED appear nowhere in any body markdown**,
so the taxonomy has no in-repo counterpart. **I am not recommending renames.** The
right instrument is the one that already exists in embryo: `G2-STATE.md` §10's
"file | what it holds" table. Extend that pattern into the repurposed
`research/README.md` as a router with a status column, and the distinction becomes
readable without touching a filename. Renames cost a reference sweep each and buy
nothing a router row does not.

**E3. Two renames I would still consider, and only two.** `research/ATTACKS.md`
(23 lines) and `research/ATTACKS2.md` (34 lines) are scoreboards for two different
waves and their names say only the ordinal. qc-history calls ATTACKS.md "the
highest information density per token in the corpus", which is exactly why an
agent should be able to tell from the name that it is a scoreboard, not a
narrative. But `research/README.md:97` points at ATTACKS.md and PRIOR-ART cites
both, so even this cheap-looking rename needs the `refcheck.js` sweep.
**CHRIS-DECIDES, and my own recommendation is to skip it** and let the router row
carry the description. Recorded so the option is on the record rather than
rediscovered.

**E4. Two research/*.md are unreferenced from any markdown**:
`natal-cap-04-packing-notes.md` and `natal-cap-32-wrap-identity.md`. Both are
named from their sibling `.js` headers and both are reachable in prose only by the
"cap-04" / "cap-32" shorthand. `NATAL-CAP-CAMPAIGN.md` is the natural place to
list all twelve `natal-cap-NN-*.md` by filename; it currently does not.

### (f) THE MISSING DOCUMENTS

**Verdict: do not create a new current-state index. It would become the eighth
summary (see (a2)) and the corpus already contains two-thirds of it in two
places.** Concretely:

- `G2-STATE.md` §0 (23 lines) is already a current-state opening: what is hard,
  the 4.2665-against-2 gap, the three quantities that are not constants, and the
  warning that two apparent contradictions were missing coordinates. Nothing a new
  document would say about the central object improves on it.
- `G2-STATE.md` §10 (36 lines) is already a "file | what it holds" index for the
  eleven load-bearing notes, plus six older ones, plus runnable reproduction
  commands. It is scoped to G2 rather than to the repo, which is its only defect
  as an index.

**So the missing document is not missing; it is `research/README.md`, and it is
occupied by a stale summary.** Repurposing it costs one file's content and creates
nothing new. The router it should hold:

1. Two sentences of state, or a pointer to `README.md` §Status. No third summary.
2. **A question-to-file table** — the thing that does not exist anywhere and is
   what the primary reader needs: "what is the target and its logical status" →
   ZONE-POSTULATE §§1-2; "what is the state of G₂" → G2-STATE §0 then the section;
   "why these objects" → THE-LENS; "which variable to push" → THE-DIALS §3;
   "what is ours and what is Holt's" → PRIOR-ART then G2-STATE §8; "what is closed,
   do not retry" → G2-STATE §5b then ATTACKS3; "what to do next" → TODO; "what a
   word means" → GLOSSARY; "the live route" → U-FRAME.
3. **A file table with a status column** (live / spent / register / submission),
   which is the only thing that fixes E2.
4. The six-script table it already has, which is the only index of scripts 01-06.
5. The house rule at the top, which is already there and correct, and the pointer
   telling readers not to load `history/`, which is also there and correct.

**One genuinely missing document, and it is small: a script index.** See (g).

### (g) THE SCRIPT CORPUS

**Findability is the weak point, and the number is 19.** Of 129 `research/*.js`,
110 are named in some markdown and **19 are not reachable except by `ls`**:
`01-zone-twin-share.js`, `02-first-twin-margin.js`,
`03-legendre-error-budget.js`, `a3-04-maxsum-recursion.js`,
`attack-01-gap-cartography.js`, `attack-02-head-bias.js`,
`attack-03-higher-moments.js`, `attack-05-annulus-induction.js`,
`attack-06-difference-hierarchy.js`, `attack-07-certificate-ceiling.js`,
`attack-08-pigeonhole-theorem.js`, `fold-profile-10-lineage-census.js`,
`fold-profile-11-lineage-yield.js`, `fold-profile-13-hotspot-sweep.js`,
`fold-profile-14-underdispersion.js`, `fold-profile-15-variance-law.js`,
`fold-profile-16-is-it-the-tile.js`, `gen-natal5-17tile-scour.js`,
`lucky-control.js`.

Three observations that matter more than the count.

**G1. The wildcard pointers are doing real work and they are load-bearing.**
`research/ATTACKS.md:7` says artifacts land as `attack-NN-*.js` and
`research/README.md:97` says "see ATTACKS.md + attack-NN-*.js" — that wildcard is
the *only* pointer seven orphan `attack-0N-*.js` files get. `FOLD-PROFILE.md:7`
says "`research/fold-profile-01..04-*.js`", which does not cover 10 through 16.
**So the orphan list is largely the tail of two families whose heads stopped
enumerating**, and the repair is at the head document, not per script.

**G2. "Can an agent find the script behind a given number?" Yes for shorthands, no
for the earliest scripts.** qc-shepherd's mechanical check found **zero** script
shorthands (natal-cap-NN, fold-profile-NN, attack-NN, cap-NN, a3-NN) resolving to
nothing, across all 63 files — unusually good, and I confirm it. **But the
pre-shorthand scripts fail:** `research/README.md` and `anchored-windows.md:3`
refer to "script 05", "script 06", "(script 04: 8/8)", and those shorthands do not
resolve to a filename by any rule. Five of the six scripts in
`research/README.md`'s measurement table are on the orphan list for exactly this
reason: the table's leftmost column says "01", "02", "03", "04", "05/05b", "06"
and never gives the filenames. **Fix: put the filenames in that table.** One edit,
clears 5 of the 19 orphans, and it is in the file (f) is repurposing anyway.

**G3. No index exists, and one 30-line file would pay for itself.** There is no
`SCRIPTS.md`, no manifest, no `package.json` script map. G2-STATE §10's
reproduction block is the closest thing and covers 11 scripts. The header
convention is strong (78-char rule, ALL-CAPS title as a question, rule, prose;
followed by ~110 of 129) but carries **no machine-parseable fields** — no
`@companion`, no `@runtime`, no `@status`. The `natal-cap-NN` variant is the best
of the family: `natal-cap-30-skeleton-bound.js:3` carries "Companion prose:
natal-cap-30-skeleton-bound.md" and "Successor to …js", which is exactly the field
an agent needs. **Recommendation:** a generated `research/SCRIPTS.md`, one line
per script — filename, the ALL-CAPS title from its header, companion prose if
any — produced by a script so it never goes stale. This is the one new document I
would create, and it is the only place I disagree with "no new documents": 129
artifacts with no index is the corpus's largest findability gap, and the fix is
mechanical because the titles are already in a consistent place.

**Not recommended: touching script headers or READINGS blocks.** The exemption is
right and I have nothing to add to it beyond one datum: `killrun.js` opens with a
correction banner rather than a title, so its first eight lines describe a past bug
instead of what the file does. That is the exemption working as designed — the
banner is the guard qc-history describes — and it should stay. qc-history's U5
(may READINGS be reworded) should be answered "no", for the reason it gives.

## 7. Unresolved / needs a decision

**A1. Is `research/README.md` allowed to stop being a summary?** Recommendation 5
deletes about 100 of its 157 lines (the definitions layer, the proven-spine layer,
the ten-attacks section, the prior-art section) on the grounds that every one is
owned by a document written later. But the proven-spine list is the only place the
seven spine items appear together as *proofs in a paragraph each*, and Chris's rule
says a passage earns its keep by teaching. My reading: THE-LENS §§1-2 teaches the
same thing better and G2-STATE §8 carries the attribution, so this is duplication
rather than teaching. **But it is 100 lines of Chris's own framing and it is his
call, not mine.** If he wants the spine kept, keep it and delete only the
ten-attacks and prior-art sections; the router still works.

**A2. Do the seven summary documents get declared scopes?** (a2) establishes that
seven documents summarise the same programme and that two of them each claim in
their own header to be the hub. The cheap fix is one sentence per header stating
what that document owns and what it does not. The expensive fix is consolidation,
which I am not recommending. **Chris should decide whether the header sentences are
worth seven edits**, because it changes how every future document positions itself.

**A3. Does the U-FRAME job get done at all, given what it costs?** §2.0 measures
128 inbound section pointers across 29 artifacts. My plan protects §§1-9 and
touches only ~20 of those pointers, so the answer is yes as scoped. **But if the
plan is modified to renumber §5 or §5a, the cost jumps to 68 repairs, 15 of them
inside script output blocks, and at that point I would advise against the job
entirely.** Whoever applies steps 12-17 must be told that constraint explicitly, or
the natural instinct to "clean up the numbering" will destroy the trade.

**A4. `research/SCRIPTS.md` — one new document, against the campaign's grain.**
Recommendation 11 is the only place I propose creating a file. 129 artifacts with
no index is the corpus's largest findability gap and the header titles are already
in a consistent place, so the file can be generated and regenerated. But the
campaign's premise is that the corpus has too much text, not too little.
**CHRIS-DECIDES.** If the answer is no, recommendations 4 (filenames in the
six-script table) and the fix to `ATTACKS.md`'s and `FOLD-PROFILE.md:7`'s wildcards
recover most of the value at zero new files.

**A5. Where does `research/maxgap-law.md`'s corpus-wide register belong?** (D6) It
holds "which repo extrapolations inherit the c-as-a-constant error", which is a
register entry about other documents, in a file whose name says max-gap law. I did
not recommend moving it, because one place is better than five and the alternative
is a new register. Flagging it because the next agent will notice the same thing
and may reach the opposite conclusion.

**A6. Overlap with qc-status decision 4.** The Natal Dispersion Lemma placement
(rec 7) is an open decision in `qc-status.md` too. **It must be decided once.** My
answer differs from the provisional one in the brief: FOLD-PROFILE **§8**, the
empty slot, not §9, which is Survival. Evidence in (d) D1.

**A7. Not decided by me, and it is qc-history's U1**: whether `ATTACKS3.md`'s
pre-registered "Win:" lines should be folded into "Landed" now that all ten have
landed. My §2.0 FACT 3 depends on ATTACKS3 remaining the attack chronology's home,
and compressing it by ~25 lines does not threaten that. So U1 is independent of
everything here and can be decided either way.

## 8. Corrections to the brief

Five, in descending order of how much they change the work.

**C1. "The attack chronology going to `history/`" is not needed, because the
chronology already has a home: `research/ATTACKS3.md`.** The brief and
qc-shepherd both propose moving U-FRAME's attack chronology to `history/`. But
ATTACKS3.md is organised A1…A10 with a Landed verdict per attack, and five of those
verdicts already point at the U-FRAME sections in question (`:100`→§13,
`:121`→§10, `:136`→§11, `:199`→§§14-15, `:239`→§12). qc-history cleared ATTACKS3 in
writing as "the corpus's best single artifact for 'do not retry this'". So U-FRAME
§§10-15 are a *second* copy of ATTACKS3's organising principle, and the restructure
needs to create nothing in `history/` at all. **Nothing from U-FRAME §§10-15 goes
to `history/`.** qc-history's own size table agrees arithmetically — 61 lines
flagged, ~9 leaving the body — and nobody drew the conclusion.

**C2. The Natal Dispersion Lemma should go to `FOLD-PROFILE.md` §8, not §9.**
§9 is "Survival: what is left in the window after every later prime is folded in",
a window question backed by `fold-profile-05`. The lemma is a cohort question
backed by `fold-profile-09`. FOLD-PROFILE has **no §8** and **zero inbound
references to §8**, so the empty slot is free, correctly ordered before Survival,
and it gives three orphan scripts their first prose home. Detail in (d) D1.

**C3. WITHDRAWN — this was my error, not the brief's.** I first recorded the body
count as 62 against the brief's 63, from a `wc -l` glob that silently dropped one
file. `find . -name "*.md" -not -path "./research/history/*"` returns **63**, and
the brief, qc-history and qc-shepherd all agree. Left visible because a
miscount in a report about consistency is exactly the thing that should not be
quietly deleted.

**C4. "No bulk-relocate candidate" is correct and I found nothing the earlier
passes missed — but the reason is worth stating differently.** I hunted the same
ground from the architecture side (which files are unreachable from any entry point,
which have no distinct job) and the answer is that **only two `research/*.md` are
unreferenced from any markdown at all** (`natal-cap-04-packing-notes.md`,
`natal-cap-32-wrap-identity.md`), and both are cited from their sibling scripts. So
the corpus is well connected, and the file with the least distinct job left is
`research/README.md` — which is not a relocation candidate, it is a repurposing
candidate. That is the one thing I would add to the cleared list.

**C5. One correction to the brief's framing of the U-FRAME defect, and it is in the
brief's favour.** The brief describes §§10-15 as "titled by the attack that
produced them rather than by what is true". That is accurate but understates it:
the deeper defect is that the six attacks each independently re-derived the same
three lemmas, so §§10-15 restate §5a and each other **eight times over** (the table
in §2.1), including a ~60% overlap between §12 and §5a's own EXTENDED block. The
headings are the symptom; the redundancy is the disease, and fixing the headings
without merging the duplicates would leave the file just as expensive to read.

---

*Wave 1 diagnosis. Nothing here has been applied to any body file. Findings that
conflict with other wave-1 reports are adjudicated in `qc-CAMPAIGN.md` before
wave 2 applies anything. The one hard ordering constraint this report adds:
recommendation 17, the combined inbound-reference sweep, must be the last edit of
the campaign, and whoever applies recommendations 12-16 must be told that U-FRAME
§§1-9 keep their numbers (§2.0 FACT 1).*
