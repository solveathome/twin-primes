# Wave 3, partition H: applied

<!-- ledger
id: Q-applied-wave3-H
status: ANSWERED
todo: none
question: Were wave-3 partition H's U-FRAME sections 10-12 split into child documents?
verdict: Split and applied: U-FRAME falls 1,032 to 772 lines with three children created, but the corpus as a whole is 87 lines larger and that must not be reported as a shrink; refs and crosslinks stay at zero and no transfers finding exists between any stub and its child.
-->

*(Owns `research/U-FRAME.md` and the three child documents created here. Sources:
`qc-CAMPAIGN.md` "STATE AT THE END OF WAVE 2" item 1, `qc-arch.md` §2 and its
pointer census, `applied-B.md` §2. Changelog entries staged separately in
`changelog-add-H.md`.)*

## 1. What was done

`U-FRAME.md` §§10, 11 and 12 keep their numbers and their headings and lose their
bodies. Each body is now a child document, and each section is a stub that states
the claims and their calibration and points at the child.

| | before | after |
|---|---|---|
| `research/U-FRAME.md` | 1,032 | **772** |
| `research/kappa-not-L.md` | — | 162 |
| `research/operator-and-pair-count.md` | — | 87 |
| `research/f-decays.md` | — | 98 |

308 lines left `U-FRAME.md` and 48 replaced them. The working set for a reader who
wants the frame is down by a quarter; the corpus as a whole is 87 lines larger,
which is the header, footer and pointer cost of three files. Chris's goal is the
window a future researcher has to hold, not the total, so this is the right trade,
but the total did not shrink and should not be reported as if it had.

## 2. The children, and why these boundaries

The three sections were already self-contained claim bodies, because partition B
built them that way in wave 2. No boundary had to be invented; each `## N` body
moved whole.

**`research/kappa-not-L.md`** — old §10, 150 lines. The status of the L question in
one read: the closed form for qualifying gaps, the Alternation Lemma and the kill
graph, Theorems A, B and C, the wall, the proof that the lower bound never becomes
exact, and the verdict that the target is κ(m). Named for the verdict rather than
the object, and the capital L follows `a3-05-bound-L.md`'s precedent.

**`research/operator-and-pair-count.md`** — old §11, 74 lines. Two exact
instruments, the histogram transfer operator and PAIRS(T, p), plus the head engine
and the flagged FIT. Object-named rather than claim-named, deliberately: five live
inbound pointers reach this content by the words "transfer operator" or "pair
count", and a claim-shaped name like `exact-without-the-tile.md` would have made
those searches fail.

**`research/f-decays.md`** — old §12, 84 lines. Lemma B and the structural negative,
the 42 exact census points, the singular-series comb, the staircase theorem and the
caveats.

**Two children were considered for merging and were not merged.**
`operator-and-pair-count` and `f-decays` both measure the same receding threshold
and disagree on its slope (1.2992 against 1.451), which is an argument for keeping
them adjacent. They are different objects — an exceedance tail against f itself —
and `applied-B.md` §12 already carries the disagreement as an open item, so merging
would have buried a flagged inconsistency inside one file rather than leaving it
visible across two. Kept apart; the cross-pointers between them are explicit.

## 3. The pointer-safety rule, and how it was discharged

**Every `##` heading in the file is untouched, text included.** No heading was
sharpened, because no sharpening was worth the risk to 128 inbound pointers.

**Census, re-run before the split** (`grep` over `*.md`, `*.js`, `*.txt`, `*.html`,
excluding `research/history/` and `U-FRAME.md` itself). Live inbound pointers at
§§10-12: `ATTACKS3.md` :8, :88, :140, :203, :220, :244; `gate-multiplies.md`:454;
`PRIOR-ART.md`:117; `localized-04-maxsum.md`:291 and :305. All ten still resolve,
because the headings are still there.

**Sub-headings: nothing in the corpus points at one by name.** Checked "the wall,
located precisely", "Caveats, kept visible", "Where the L question stands", "The
Alternation Lemma", "42 exact points", "census law", "Run Cost", "Theorem B",
"Theorem C", "Lemma B", "pair count", "transfer operator", "staircase". The only
`file §Heading` pointer in the corpus is `anchored-calm.md`:31 →
`natal-cap-30-skeleton-bound.md` §Theorem B, which targets a different file. **The
grep was validated against known positives before the negatives were trusted**: the
same patterns returned `ATTACKS3.md`:141 for the Alternation Lemma and eleven sites
for Theorem B, so a zero result means zero.

The named objects Theorem A, Theorem B, Theorem C, the Run Cost, the Alternation
Lemma and Lemma B are cited by name from `ATTACKS3.md`, `gate-multiplies.md`,
`localized-04-maxsum.md`, `LOCALIZED-GAP.md` and `a3-05-bound-L.js`. All six names
survive verbatim in the children, and Theorem A, B, C and the Alternation Lemma are
named in the §10 stub as well.

**The internal forward references from §§1-9 were the binding constraint on stub
content.** Nine sites inside `U-FRAME.md` point forward at §10, §11 or §12 for a
specific fact, and each is now a two-hop path. The stubs were written so that the
first hop is still honest:

| site | what it promises | where the stub delivers it |
|---|---|---|
| §5:221-223 | §10 holds L's definition and proven bounds | first and third sentences of the §10 stub |
| §5a:287 | §10 gives the two mechanisms breaking exactness | "one of its two mechanisms being the permanent arithmetic event" |
| §5a:307 | §10 shows a constant is impossible | "no constant can replace the effective run length" |
| §5a:335 | §10's Theorem C carries the cap to κ | named |
| §5a:383, §7:593, §9:687 | §10 Theorem B's proven L ≤ 0.18 p | the number is in the stub |
| §5a:399 | §10 gives the fold-29 mechanism | "forces the fold-29 dip" |
| §5a:454, :481 | §12's staircase, 42 points | both in the §12 stub |
| §6a:570-575 | §11 is prior art, nothing new may be claimed | the instruction is in the §11 stub, in bold |
| §8:625 | §11's exact PAIRS(T₂₃, 29) | the formula is named; §8 already carries the number itself |

## 4. Verbatim, and how it was checked

Each body was cut to a scratchpad file before the split and word-diffed against the
finished child (`git diff --no-index --word-diff`). Reading was not trusted. The
complete set of word-level changes across all three children:

- 12 insertions of `U-FRAME` in front of a bare `§N`, so a section number inside a
  child cannot be read as the child's own;
- 9 replacements of a bare `§10` / `§11` / `§12` by the sibling's filename;
- 3 replacements of "this section" by "this note".

Nothing else. Every number, every table, every calibration marker and every caveat
is byte-identical to what stood in `U-FRAME.md`. §12's "Caveats, kept visible",
§10's "The wall, located precisely" and §10's "The lower bound never becomes exact,
so L cannot be made irrelevant" moved intact, sub-heading text included.

## 5. Judgement calls

**1. The stubs are longer than the brief's 4-to-10 lines.** §10's is 15 lines,
§11's 12, §12's 12. The reason is the table in §3: §10 alone has to keep six
distinct forward references honest, and a shorter stub would have made at least
three of them promises the file no longer keeps. The alternative was to edit §§5,
5a, 7, 8 and 9 to soften their forward references, which touches the two
most-referenced sections in the corpus to save nine lines. Not worth it.

**2. Cross-references between children are by filename, not by section number.**
Inside `kappa-not-L.md` a bare "§11" would have been unreadable. The three files
therefore name each other by path, which also makes them mutually reachable to
`crosslinks` rather than reachable only through the parent.

**3. The stub prose does not reuse the child's opening sentence.** The first drafts
of the §11 and §12 stubs opened with the child's own first sentence verbatim, which
is exactly the summary-layer duplication this campaign exists to remove. Both were
rewritten. The result is that **no `transfers` finding was produced between any stub
and its child**, which is worth recording because the brief expected one.

**4. The three children's provenance headers were made distinct on purpose.** The
first version used one boilerplate header differing only in the section number, and
`transfers` flagged all three pairs at j = 0.62 to 0.70. That is the check working:
identical boilerplate across sibling files is the shape it was written to catch.
Each header now says what its own file holds, and the findings are gone.

**5. Nothing was renumbered, no heading text was changed, and §§1-9 were not
edited at all.**

## 6. The redundancy brief was stale, and I did not act on it

The brief instructed me to fix four redundancies from `qc-arch.md` §2.1. **All four
were already fixed by partition B in wave 2**, and the line numbers in the brief
(`U-FRAME.md`:816 and :924) are pre-wave-2 addresses. Verified rather than assumed:

- **The Alternation Lemma** is stated once, at old §10. The "Alternation confirmed
  at fold 37" passage in old §11 is a verification at a deeper fold, not a
  restatement.
- **The qualifying-gap closed form** is stated once, at old §10, in the weights
  1, 1, 2 form. Old §12's two uses of it are references.
- **§12 as a 60% restatement of §5a's EXTENDED block** described the *old* §12,
  which B dissolved. The current §12 is old §§13 and 15, about f.
- **The L(T₂₃, 29) custody ordinals.** The brief asked me to find the third site and
  settle the ordinal. There is no live disagreement to settle. The three sites were
  old §5:220-224 ("five times"), old §12:816-819 ("the fourth of five") and old
  §14:924-927 ("the fifth time"), and B collapsed them into one ordinal-free
  statement now at §8:618-628, which names all five confirmations (A4, A5, A8, A9,
  A10) instead of counting them. The record is at `CHANGELOG.md`:733-735 and
  `applied-B.md`:106. **The third site the brief could not locate was old §5.**

**What redundancy is actually left in the file**, neither of which I cut:

- The lower-bound excess sequence 6, 0, 0, 12, 0, 18, 24, 18, 120 appears in §5a
  step 3 and again in `kappa-not-L.md`, with two different readings: §5a reads it
  as "the recursion is not determined by maxsum₂", the child as "it does not
  shrink, and the deepest reachable fold is by far the worst". Two facts from one
  sequence. KEPT under Chris's rule.
- The priced gap **L ≤ 0.19 to 0.31 p/ln p against a proven L ≤ 0.18 p, a factor of
  0.58 to 0.95 ln p** is stated in full three times, at §5a step 4 (382-384), §7
  item 1 (592-595) and §9 (687-691), and §7's and §9's are near-identical down to
  the parenthetical "(0.18/0.31 and 0.18/0.19)". This is a real duplication and it
  is worth about three lines. **I left it.** §7 is the action list and has to be
  actionable standing alone; `TODO.md`:79 and `qc-status.md`:435 both reach for §7
  for exactly this number. Cutting it degrades a high-traffic section to save three
  lines. Flagged for the parent to overrule if it disagrees.

## 7. Handed over: not my files

1. **`research/README.md`** — the file index at lines 60-100 does not list the three
   new children. `crosslinks` is satisfied because `U-FRAME.md` links them, but the
   README table is the discovery surface a new agent reads. Three rows to add,
   under the LIVE u-frame group.
2. **`research/PRIOR-ART.md`:117** — "`research/U-FRAME.md` §11 presents the
   histogram transfer operator as new structure". Partition B handed this to E in
   wave 2 and it was not applied. It is now visibly false at the target: §11's stub
   states in bold that the operator is prior art and that nothing there may be
   presented as new structure. Correct repoint is §6a for the attribution and
   `research/operator-and-pair-count.md` for the engine.
3. **`research/localized-04-maxsum.md`:291** — quotes "structurally capped, since
   maxsum_m ≥ G₂ always, so it can never prove L below G₂/(3p) ≈ 0.18x" and
   attributes it to U-FRAME §11. That sentence has been in §10 since wave 2 and is
   now in `research/kappa-not-L.md`. Handed to G by B, not applied. Repoint to
   `research/kappa-not-L.md`.
4. **`research/localized-04-maxsum.md`:305** — "U-FRAME §11's exact tail engine
   gives FIT ln(1/tail) = −0.235 + 1.2992·(g/m̄)". Still correct at the §11 stub,
   which names the FIT; the equation itself now lives in
   `research/operator-and-pair-count.md`. Optional repoint, not a defect.
5. **`research/ATTACKS3.md` and `research/gate-multiplies.md`** — six and one
   pointers respectively at §§10-12. All still resolve to the stubs, so nothing is
   broken. A reader chasing the mathematics now takes two hops. If either file is
   opened for another reason, the deeper pointer is worth adding.

## 8. qc.js, before and after

Run before starting and after finishing. `research/qc/checks.js` was edited by a
concurrent partition mid-run (the quotes check gained a "quoted in order to be
corrected" exemption), and other partitions were editing their own files, so the
corpus totals move for reasons that are not mine.

| check | corpus before | corpus after | partition H, before → after |
|---|---|---|---|
| `refs` | 0 | **0** | 0 → 0 |
| `quotes` | 1 | 1 | 0 → 0 |
| `crosslinks` | 0 | **0** | 0 → 0 |
| `scripts` | 2 | 2 | 0 → 0 |
| `transfers` | 13 | 13 | 0 → 0 |

The gate holds: `refs` and `crosslinks` are still zero. `quotes` moved between 0
and 3 during the run as `checks.js` and `FOLD-PROFILE.md`, `OBSERVATIONS.md` and
`two-class-lower-bounds.md` changed under me; it settled at one finding,
`OBSERVATIONS.md`:675, which is not a file I own. **No `transfers` finding exists
between any stub and its child**, so the summary/body exemption the brief
anticipated is not needed.
