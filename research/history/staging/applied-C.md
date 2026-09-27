# Wave 2, partition C: `paper/` — what was applied

<!-- ledger
id: Q-applied-C
status: ANSWERED
todo: none
question: Which wave-2 consistency findings were applied to the paper suite?
verdict: Applied across the seven paper/ files with post-edit line numbers, plus a CHRIS-DECIDES list, handoffs to other partitions and one unresolved item: two scopes for the Cov_adj anticorrelation exception count, both now printed, one of which should be checked and the other dropped.
-->

Scope: `paper/moire-primes.md`, `anchored-note.md`, `staircase-note.md`,
`beta2-note.md`, `PAPERS.md`, `variance-note.md`, `writing-style-math.md`.
Nothing outside `paper/` was edited. Nothing was committed. Line numbers below
are post-edit.

Sources read in full: `qc-CAMPAIGN.md`, `qc-papers2.md`; the paper-relevant
findings of `qc-refs.md`, `qc-status.md`, `qc-compound.md`, `qc-numbers.md`,
`qc-history.md`, `qc-arch.md`. Primary artifacts opened rather than trusted:
`research/natal-cap-02-fourier-budget.js` (header and readings 1-6),
`research/natal-cap-31-calm-vs-kill.js` readings 1-7,
`research/natal-cap-23-covadj-proof.md` §(iii), `research/covering-dive.md`
§§3.1-3.4 and 4.1-4.2, `research/sift-limit-attack.md` §0-§1,
`research/natal-cap-08-staircase.js` header.

## qc.js counts

| | refs | quotes | crosslinks | scripts | transfers | total |
|---|---|---|---|---|---|---|
| before | 7 | 1 | 0 | 2 | 12 | 22 |
| after | 5 | 2 | 0 | 2 | 12 | 21 |

The corpus was being edited by six other appliers throughout, so the totals
move for reasons that are not mine. What is mine: **`paper/` contributes zero
refs, zero quotes and zero crosslink findings, before and after**, and exactly
one transfers finding, unchanged (see "checked and left" below). No count I own
increased.

## paper/moire-primes.md

**Job 1, Door 2 (`:457-503`). Rewritten from the corrected artifact.** The old
text's two load-bearing claims, a certified budget "growing like 2ⁿ" and a miss
of the p = 11 zone "by only 18%", both came from `attack-04-fourier-budget.js`'s
`certified` column, which that file's own banner disclaims. The door now reads
in three labelled parts:

- *Mechanism*: the CRT factorization, verified against a direct DFT; smooth
  conspiracies spectrally dead; the 2ⁿ pointwise bookkeeping **stated with the
  hypothesis it needs** (it holds at frequencies no natal prime divides, since
  F_p(0) = p − 2); the measured L₁ mass (4/π)ⁿ per support class with the
  effective bases 1.165, 1.185, 1.195, 1.204; the comb frequencies reaching the
  census N exactly; and the correction that the certified budget is carried by
  the **diffuse** u ≥ 2 cloud rather than by structured modes.
- *Toll*: certified per prime at the four computed levels, zero violations
  against the true sliding-window deviation, losing to it by 1.7, 2.9, 4.7, 7.1
  and growing about 1.6× per level; per prime it is informative
  (deviation < N/q for every q ≤ 263 at x = 17, gross(19) ≤ 1,685 against 1,563).
- *Where it stops*: at x = 11 the oracle itself fails, cap 117.3 against N = 90;
  from x = 13 the gross strike total alone exceeds the census, 1,135 against 990
  and 22,132 against 14,850; the only positive oracle margin is x = 7 where the
  certificate misses by 15% and the level is moot.
- *Retracted, and left visible* (`:496-503`): what the door used to say, which
  file it came from, why that column is not a certificate, and that the
  corrected computation reverses the reading.

Citation is now `research/natal-cap-02-fourier-budget.js`; `attack-04` appears
only inside the retraction. **Door 2 is sound**: every number in it is read off
the corrected artifact and I checked each against the script's embedded output.

One correction to `qc-papers2`'s replacement text, which I did not copy
verbatim. It says the largest coefficients sit "at the rigid mod-6 comb
frequencies k = j·(W/30)", following the script's reading 2, which calls them
"the four comb frequencies". **There are five, not four.** Recomputing |S| from
the CRT factorization at x = 17 (scratch script, `comb.js`) gives |S| = N = 14,850
at k = 85,085, 170,170, 255,255, 340,340 **and 425,425**, i.e. at k = j·(W/30)
for j = 5, 10, 15, 20, 25; the script's printed "top |S|" line shows four
because it prints a top-4. The paper states the condition (5 | j) rather than a
count.

**Job 2, Door 5 (`:539-577`).** Hough and BBMST are now stated with their
distinct-moduli hypothesis and with the fact that our classes violate it;
Klein-Koukoulopoulos-Lemieux (2024) Theorem 3 is cited as the theorem that
covers multiplicity 2, **with no numeric constant at s = 2 stated in bold**, and
our translation is marked inferred with the gap named (KKL is about ℤ, a zone is
a finite interval). The toll now separates the one-class p/ln p from the
two-class p/ln²p and says the latter rests on Ziller and Morack's measured
1.90·x·ln²x. The bolded "covering phenomenon of a fundamentally new kind" is
reduced to what the ABSENT marker supports. `:573-577` is a visible note that
the door wants an expert read. KKL added to the references (`:1083`).

**Job 3, Face 4 (`:777-793`).** "Missing exactly one ingredient" is gone. The
paper now states in place that at the measured working point s/u ≈ 1.2 sits
outside the range s ≤ u that Lemma V is stated in, so the operative assumption is
a **Gaussian maximal law for the sawtooth**, which is the whole price of the
route. The phrase now exists in the suite for the first time. Face 4 also gains
the ladder's ceiling (`:795-804`, suprema 1.9524, 1.9477, 2.0018, 2.0476 at
z = 19, 23, 29, 31, above 2.05 through z = 71 on the prefix), loses "nothing in
print blocks it" for the κ = 2 sifting limit that does block axiom-level
arguments (`:750-758`), and hedges "explains its absence from this problem"
against Brüdern-Fouvry's own introduction.

**Job 4, §8 versus Face 2 (`:910-916`).** §8's "unexplained structural bias in
the helpful direction" is replaced by the settled reading: the mechanism is
proven, the calm is uncorrelated with survival. Face 2's own text now says
"glue" rather than "fuse" and distinguishes our fused window from Holt's
fusions (`:690-693`).

**Job 5, sharpness and scope.** The abstract's "the matching lower bound"
(`:41-44`) becomes a lower bound "nowhere near matching", with the band as the
subject. Swept the suite for every other sharpness or matching claim: the
remaining ones are `beta2-note.md`:235 (the home, which refuses the claim) and
two "first upper/lower bound" claims that the prior-art audit supports.

Dropped hypotheses and scopes fixed, each against its home: the abstract's
p ≥ 17 and the o(1) quantifier, with the theorem restated in finite form
(`:29-33`, `:405-415`); moment order 6 versus degree 4 at x = 11 (`:702-708`);
the diagonal-versus-window ensemble for z = −0.30 and −2.71 (`:694-698`);
corr(X, S) as a ladder 0.48, 0.91, 0.99 (`:664-668`); "the anchor is in deficit"
which printed a surplus (`:679-681`); K*'s moduli pool and its home's withdrawal
of the word "law" (`:725-732`); 5μ per **two** degrees (`:506-515`); "at every
level" scoped to computed levels in three places (`:398`, `:452-453`, `:471`);
Door 3's "exactly 2.0×" to "almost exactly, at each of the three computed
levels" (`:589-590`).

Honesty items where the notes were ahead of the flagship: the certified floor
now prints the truth beside it, 31,327 against 12,307,838, 0.25% (`:718-722`);
Face 1 gains the parity block's measured gap, 2 against the needed 1.28 at
x = 17 (`:637-638`), and the z-ladder's nine-level scope (`:645-647`).

Attribution: FKMPT's Remark 7 (`:849`); Holt **and** Rudd on arXiv:1402.1970
(`:1079`); the FKMPT corrigendum cited (`:1071`); Brun added to the references
(`:1063`); Smith 1857 carries PRIOR-ART's Dickson hedge (`:349-351`); Maier
(1985) cited at Face 1's point of use (`:649-655`) and Brun 1920 at Face 3's
(`:713-714`), §7A having cited nothing outside the repo before.

Structure: the §7 preamble (`:428-446`) drops "five independent routes, each
rigorous until its last step", says which doors are the same object and which
fail early, and introduces the mechanism / toll / where-it-stops labelling that
all five doors now carry. The §7A preamble (`:599-603`) states that the faces
re-enter the doors, Face 2 being Door 4's overlap credit and Door 3's
certificates in another ensemble, which `qc-papers2` found a reader could not
learn anywhere.

Also settled here, from the script rather than from a report: **the
X-limitation theorem's scope** (`:670-682`). `natal-cap-31-calm-vs-kill.js`
reading 3 marks the result "proven, per level, from L2 + enumerated max VR", and
the enumerated maxima exist at @11, @13, @17 only. There is no level-uniform
bound on VRmax anywhere in that file. The paper now says proven at x = 13 and
x = 17 and names the two measured trends the extension rests on. This closes
`qc-papers2` Unresolved 1 and `qc-CAMPAIGN`'s "goes to verification" item in the
direction the report suspected: the home is right that it is per level, and
"upward" was the extrapolation.

## paper/anchored-note.md

**Job 7, the @29 row (`:379-411`).** Six certified levels, @11 through @29, at
0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176; "the leg is a theorem for
x ≤ 29"; the @29 row attributed to this campaign's reproduction. The sentence
"the deepest level also the lowest, which softens the earlier worry" is deleted
and replaced by the true reading: the minimum is 0.0945 at @23, the values are
flat within their own spread after @11, and the worry is back.

Same paragraph: the parent name "the anchored-calm lemma" is gone, since its
parts carry four calibrations; it now points at `research/anchored-calm.md` for
the status table (partition F's file, see handoffs) and states that the
**uniform-in-q form of the anticorrelation is refuted**, 595 of 599 scour primes
anticorrelating with four cataloged exceptions, so only the aggregate form is
claimed. `:180` no longer says "the two remaining legs".

X-limitation scope corrected as in the flagship (`:434-443`), and the 97% /
corr(X, S) figures given as a ladder with their enumeration basis (`:425-430`).
`:296-299` now says positivity suffices and no converse is claimed. `:522` credits
Proposition 1's part (i) rather than Proposition 1, which part (ii)'s own caveat
four lines later contradicted.

## paper/staircase-note.md

Fan-Pomerance corrected to Φ(x,y) < 0.6x/log y for y ≤ √x (`:450-451`), a
dropped decimal point and a dropped square root in one formula. Honesty item 1
corrected from four to six finite computations (`:477`). New status paragraph
(`:15-20`) fixing what the title's name covers: the Staircase Theorem is
Theorem 3 and nothing else, the floors are Theorem 8 at six levels, the tail
bound is Theorem 6 and is the note's one non-elementary ingredient. "Verified at
all levels" scoped to computed levels (`:59`).

Word-diffed Theorems 3, 6 and 8 and Corollary 4 against
`natal-cap-08-staircase.js`'s header: **no dropped hypothesis in either
direction.** Theorem 3 carries s(q), the three regime inequalities and the
Rosser-Schoenfeld input; Theorem 8 carries its moduli pool. This closes part of
`qc-papers2`'s stated coverage gap.

## paper/beta2-note.md

Two FGKMT → FKMPT fixes, at `:152` and `:312`, with the corrigendum (JEMS 25
(2023), 2483-2485) cited at the first. **`:152` is a fourth residual site that
`qc-refs` W2 did not list**, because it writes the venue out ("cf. FGKMT, J.
Eur. Math. Soc. 23 (2021), Remark 7") rather than the phrase the grep matched.
Three of the four were in `paper/`, not two.

## paper/PAPERS.md

Paper II's title follows the note, "An upper bound for the twin Jacobsthal
function" (`:26-30`). "Contested" dropped from Iwaniec's Lemma 1, replaced by
the plain note that we avoid the lemma and that an explicit-constant or
formalised exposition would be useful (`:32-36`). "The matching lower bound"
becomes "a lower bound, far from matching" (`:37`). Zone Equivalence moved out
of "the spine theorems" into a framing-device clause (`:18-19`). OEIS G₂ draft
corrected from eleven terms to twelve (`:63-64`). The Lemma V positioning
(`:150-157`) now carries the maximal-law qualification, and the positivity
finding is labelled an analysis of the sieve's discard points rather than a
theorem.

## paper/variance-note.md, paper/writing-style-math.md

Unchanged, deliberately. Two independent reports call the variance note the
best-calibrated document in the suite; the sharpness sweep and the level-scope
sweep both came back clean on it. The style guide is not a claim-bearing
document.

## Checked and left

- **The transfers finding `anchored-note.md`:26-27 vs `staircase-note.md`:32-33.**
  Word-diffed: both define N_x with identical conditions; the staircase version
  adds the gcd(r(r+2), W) = 1 form and the House-29 exclusion. Nothing is lost in
  transfer, and two standalone drafts each need the definition. I added a pointer
  from the terser copy to the fuller one (`anchored-note.md`:30-31) rather than
  deleting either. The check will keep reporting the pair, correctly.
- **The protected honesty passages**: the two K* reversals, both left standing
  (now `moire-primes.md`:731-740, moved by the edits above, not touched by them),
  and the refuted "divergent enrichment" reading retained in place (now `:306-316`), and
  every dated attribution and refuted-claim record in `paper/`. Untouched, per the
  ruling that `paper/` is exempt from history migration. Where a paper was *less*
  honest than its note, I moved the paper toward the note, never the reverse.
- **`beta2-note.md`'s 4.267.** `qc-numbers` cleared the eleven renderings of
  4.26645 as legitimate. I aligned the flagship's §8 sentence to 4.2665 only
  because the same sentence carries the band (2, 4.2665]; the note's own theorem
  statement is left alone.
- **The staircase note's title.** `qc-compound` CC-9 recommends renaming the file
  title. Not done: `README.md`:30 reproduces it and belongs to partition D, so a
  unilateral rename creates the mismatch the campaign exists to remove. The
  name-scope defect is fixed in prose instead. See CHRIS-DECIDES 6.

## Handoffs to other partitions

1. **The 18% claim survives outside `paper/`.** `research/ATTACKS.md`:14 and
   `research/README.md`:120 still carry it. Fixing only the paper leaves the
   defect a re-entry path. Owners: G and D. Replacement facts are in the Door 2
   text above and in `natal-cap-02` reading 4.
2. **`research/anchored-calm.md` must exist.** `README.md`:107 (already edited by
   another partition) and `paper/anchored-note.md`:382 both point at it, and
   `qc.js refs` currently reports it as a dead path. Owner: F.
3. **The six-level ladder and the @29 row** belong in
   `research/natal-cap-30-skeleton-bound.md` and in the new status table. Owner: F.
4. **`natal-cap-02-fourier-budget.js` reading 2 says "the four comb
   frequencies"; there are five** (evidence above). A factual slip in a reading,
   the O14/O15 class, not a correction banner. Owner: whoever holds the scripts.
5. **`research/PRIOR-ART.md`:383-384** carries the same Fan-Pomerance
   misquotation I fixed at `staircase-note.md`:450. Owner: E.
6. **Rudd is still dropped** at `PRIOR-ART.md`:378, `exponent-control.md`:20 and
   `G2-STATE.md`:105. Owners: E and A.
7. **`README.md`:28's "matching"** and **`TODO.md`:230's "proven from x = 13
   upward"** are the two out-of-partition sites of B-4 and of the X-limitation
   scope. Owner: D. The X-limitation evidence is in this report; TODO should read
   "proven at @13 and @17".
8. **KKL is now cited in a paper.** `research/covering-dive.md` §3.3 is its only
   research home and marks the translation INFERRED; if partition E touches that
   file, the paper and the note should keep the same wording. The FKMPT
   corrigendum is now cited in two paper files.

## CHRIS-DECIDES

1. **Whether `paper/moire-primes.md` splits.** It is 1,096 lines and §7 plus §7A
   is about 390 of them, a clean parent-and-child cut. I did not make it:
   `qc-arch` explicitly declined to recommend structure inside `paper/`, and
   `PAPERS.md`'s own proposal that §7A become the paper's spine is a sequencing
   call reserved to you. The overlap defect that a split would have addressed is
   now addressed in prose instead.
2. **Does Door 2 survive as a door?** It now reads as a route whose certificates
   are real per prime and dead in aggregate. Kept, corrected, and shorter on
   claims than before. The alternative is folding it into Door 1, since both are
   inclusion-exclusion bookkeeping.
3. **Door 5 after KKL.** My ruling was to cite KKL, state that no constant exists
   at s = 2, and weaken the door. It is now the weakest door in the section and
   carries a request for an expert read. If that reads as too weak to keep, the
   alternative is to demote it to a paragraph in the survey's conclusion.
4. **"Fusion".** Annotated, not renamed: our fused window is distinguished from
   Holt's fusions at the point of use. Renaming would touch `natal-cap-19`, `-23`,
   `-26` and the glossary and is a vocabulary decision.
5. **Whether the abstract carries the Hardy-Littlewood equivalence.** Not added;
   `PAPERS.md` recommends it for the anchored note, and it is the single sentence
   that most changes how a referee reads the flagship.
6. **The staircase note's title** (`qc-compound` CC-9's proposal: "Per-prime hard
   caps on the Scour: the staircase, the tail, and certified twin floors"). Needs
   `README.md`:30 to move with it.

## Unresolved

1. **KKL's author initials** are not in the corpus and I did not fetch the
   paper. The bibliography entry says so in place rather than inventing them.
2. **The two-class shortfall p/ln²p** rests on a measured construction law over
   21 exact terms, not on a proven bound. Stated with that caveat. `qc-papers2`
   Unresolved 2 asks whether a measured law belongs in a sentence about what the
   adversary can provably do; I kept it and labelled it.
3. **Smith 1857** is now hedged to Dickson in the paper, which is all the
   evidence supports. The primary check is still open.
4. **The uniform-in-q exception count, now three different numbers.**
   `qc-compound`'s draft status table said "5 counterexample primes known"; the
   home (`natal-cap-23-covadj-proof.md`:175-179) says 595 of 599 anticorrelate at
   @11 through @19, so four there; partition F's `research/anchored-calm.md`:33,
   written during this wave, says six over six levels and 10,201 primes. The
   paper now gives both scopes explicitly and points at F's table, so nothing
   disagrees, but one of the two counts should be checked and the other dropped.
