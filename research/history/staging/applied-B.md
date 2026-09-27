# Wave 2, partition B: applied

<!-- ledger
id: Q-applied-wave2-B
status: ANSWERED
todo: none
question: Which wave-2 partition B corrections were applied to U-FRAME.md, ATTACKS3.md and gate-multiplies.md?
verdict: Applied with the U-FRAME section map preserved (128 inbound pointers, 47 on 5a, nothing renumbered), the strategic contradiction resolved, statistics corrected, one dead quotation removed and two further corrections to the record found on the way; section 12 lists what stayed unresolved.
-->

*(Owns `research/U-FRAME.md`, `research/ATTACKS3.md`,
`research/gate-multiplies.md`. Sources: `qc-CAMPAIGN.md` (governing),
`qc-arch.md` §2 (the restructure plan, accepted over the shepherd's),
`qc-numbers.md` Task 0 and Q5.1, `qc-history.md` O1 and the gate-multiplies
table, `qc-shepherd.md`, `qc-status.md`, `qc-refs.md`. Changelog entries staged
separately in `changelog-add-B.md`.)*

## 1. The new U-FRAME section map, before and after

**§§1-9 keep their numbers and their identities.** 128 inbound section pointers
land on this file, 47 on §5a and 21 on §5, and 15 of the citing artifacts are
scripts whose pointers sit inside pasted output. Nothing was renumbered.

| before | after | what moved |
|---|---|---|
| §§1-4 | unchanged | — |
| §5 What makes the maximum gap | unchanged in scope, two deletions | the L-diagonal prose and its five-fold custody sentence go to §8; the `Lgrowth.js` hazard warning goes to §8. The mechanism table, the adjacent-kill table and the L column stay, so every §5 pointer stays valid |
| §5a Step 1 | unchanged | — |
| §5a Step 2 (m = 1 copy theorem) | **gains the family copy theorem** | from old §10: `maxsum_m(new) = max over the p 2-sets of maxsum_m(old minus those classes)`, VERIFIED 40/40, plus the index-cost-zero reading and the TODO 0c pointer |
| §5a Step 3 (the two-sided bound) | **gains the strategic verdict; the dated EXTENDED block is folded in** | the bound is now stated at 329 (tile, prime) cells over folds 7 to 37 as present-tense fact; gains the lower recursion and the looseness verdict from old §10; the two exactness mechanisms go to new §10 |
| — | **§5a Step 3a (NEW): the family closes and L generalises to κ(m)** | from old §10 and old §11: κ(m) ≤ L refuted, κ(m) ≤ L+2 not universal (fold 11), the L-free form dying at m = 10, Fekete, and what κ(m) buys |
| §5a Step 4, **stated twice** (294-317 and 401-419) | one statement | the second copy's table merged into the first; the ρ slope reading arrives from old §10 with its statistic named |
| §5a Step 5 | unchanged | — |
| §5a Step 6 | unchanged, one repoint | "§14 gives the mechanism" → §10 |
| §5a Step 7 | custody trimmed, staircase gained | the streaming-custody paragraph goes to §8; one sentence arrives from old §15 so a reader who stops here learns the proven explanation of the wobble rather than the weaker one |
| §6 | unchanged | — |
| §6a PRIOR ART | **gains the Holt and Rudd attribution** | from old §11 A9: arXiv:1408.6002 §5, the same-object finding, and "nothing may be presented as new structure". This is why `PRIOR-ART.md`:117 had to point into an attack section |
| §7 Next | three repairs | 0.58 → 0.58 to 0.95 ln p; the §10 pointer → §5a step 2; G₂(41#) gains the streaming price |
| §8 Reproduction | **§8 Reproduction and custody** | gains the single L(T₂₃, 29) custody statement, the `Lgrowth.js` hazard from §5, and the streaming custody from old §12 and §5a step 7. The scratchpad admission is kept and scoped to the tables it applies to, so `TODO.md`:322 stays true |
| §9 Honest status | three repairs | the ρ series named as the max over m ≤ 8 and the trend claim dropped; "seven integers" listing eight → nine; 0.58 → 0.58 to 0.95 ln p |
| §10 Attack A4's corrections to this note (2026-08-16) | **dissolved into §5a** | steps 2, 3, 3a and 4 |
| §11 Attacks A5 and A9 (2026-08-16) | **split three ways** | A5 → new §10; A9's operator and tail → new §11; A9's prior art → §6a |
| §12 Attack A10 | **dissolved** | the exactness result and m_eff → new §10; the streaming custody → §8 |
| §13 Attack A3 | **split** | Lemma A → new §10 (merged with two other copies); Lemma B, the structural negative, the 42 points and the comb → new §12 |
| §14 Attack A8 | **split three ways** | the pair count → new §11; the Alternation Lemma, kill graph and fold-29 dip → new §10; the custody → §8 |
| §15 A8's extension | **split** | the staircase theorem → new §12; PAIRS at fold 37 and the fold-37 alternation check → new §11 |
| — | **§10 (NEW) L and κ(m): the proven bounds, and why L is not the target** | the section that answers "what is the current status of the L question" in one read |
| — | **§11 (NEW) The exact machinery: the histogram transfer operator and the pair count** | |
| — | **§12 (NEW) f, the qualifying-gap fraction: 42 exact points and the staircase** | |

Old §§13, 14, 15 are retired as numbers. §§10, 11, 12 exist and hold claims, so
every inbound pointer at those numbers still resolves; the ones that pointed at
the wrong claim were repointed (below).

## 2. No child files: the decision, and why

Splitting is allowed and the brief flagged this as the partition where it might
pay most. **I did not split, and the reason is that `qc-arch.md` §2 was accepted
over the shepherd's plan precisely on this question**, with a measurement behind
it: the disease was confined to §§10-15, §§1-9 were already claim-shaped, and the
prescribed fix is absorption into the existing skeleton plus three claim-named
sections. That plan was adjudicated *after* Chris's splitting ruling, in
`qc-CAMPAIGN.md`, which records the 128 pointers as "the live constraint on how it
splits".

The findability goal is met without children: an agent asking about L reads §10,
one section, instead of six attack sections. A child-file layout would additionally
require repointing `localized-04-maxsum.md`:291 and `TODO.md`:103, neither of which
I own, and would leave those pointers hanging until another partition ran.

**Cost, stated plainly: the file did not get shorter.** 967 → 1,032 lines. The
three new sections are 28 lines *shorter* than the six they replace, but §5a
(+50), §8 (+27) and §6a (+12) absorbed material that used to live in §§10-15, and
the merged statements carry a little navigational framing that the attack sections
did not need. Under Chris's rule ("line count is evidence, never the goal") that
is the right trade, but it is the one place where the parent may reasonably
overrule me and ask for `u-frame-L.md`, `u-frame-operator.md` and `u-frame-f.md`
as children with stub sections at 10, 11 and 12. That change would be mechanical
from the current state, since the three sections are now self-contained.

## 3. The strategic contradiction, resolved (Job 3)

§5a Step 3 stated the bound and read as an invitation to bound L. Old §10, four
hundred lines later, recorded that the sharp shift measures strictly below L and
that "a proof aimed at L is aiming past the target". No factual conflict, a real
strategic one, and a reader who stopped at §5a took away the wrong strategy.

**The verdict now sits in Step 3, where L is defined: aim at κ(m), not at L.**
The EXTENDED block is folded into the statement of the bound as present-tense
fact.

**And the two halves turned out to be one measurement under two names, which
`qc-arch` did not catch.** The sharp shift j\*(1) (old §10: 1, 2, 1, 2, 2 against
L = 2, 2, 2, 3, 2 over five folds) and the effective run length (§5a's EXTENDED
block and old §12: 3, 2, 2, 3, 2, 3, 3, 3, 4 against L+1 over nine folds) satisfy
1 + j\*(1) = m_eff by definition, and the five overlapping values agree exactly.
They are now one statement, with j\*(m) defined once and the nine-fold sequence
quoted. This is the single largest genuine deduplication in the file and it was
invisible while the two lived under different attack headings.

## 4. Redundancy cut, and what was kept (Job 4)

Chris's rule applied: a restatement that teaches stays, one that does not goes.

| duplicate | verdict | reasoning |
|---|---|---|
| Alternation Lemma, old §§11 and 14 | **merged to one**, in §10 | §14's quantitative form (3p window threshold, the #(3-windows) bound) and §11's two-state framing (the better proof sketch) are both kept — they are two halves, not two copies |
| qualifying-gap closed form, old §§11, 13, 14 — **three times** | **merged to one**, in §10 | §14's weights-1,1,2 form is the complete one; §13's check at all 302 primes 5 to 1999 is the custody and is kept; §11's η parameterisation is the same statement in other letters and goes |
| fold-11 anomaly, old §§11 and 14 | **one statement**, in §10 | |
| step 4 is false, four sites | **one statement plus references** | two of the four were inside §5a itself |
| m_eff and why a constant is impossible, §5a and old §12 | **one statement**, split by role | the comparison against L+1 belongs in §5a step 3 with the bound; the proof that a constant cannot exist belongs in §10 with the rest of A10 |
| lower-bound excess 6, 0, 0, 12, 0, 18, 24, 18, 120, §5a and old §12 | **one statement**, in §5a step 3 | §10 keeps the exactness rates and the closed form, which are a different fact |
| divisibility mechanism, §5a and old §12 | **one statement**, in §10 | old §12's tile list and "6 of 24 misses" are the part worth keeping and are kept |
| L(T₂₃, 29) custody, §5 + old §12 + old §14, **each with a different ordinal** | **one statement**, in §8 | the ordinals ("five times", "the fourth of five", "the fifth time") were per-attack bookkeeping and genuinely disagreed. Settled by naming all five confirmations (A4, A5, A8, A9, A10) and dropping the ordinals, which removes the thing that drifted |
| the p ≈ 800 crossing and the p/ln³p margin, §5a step 7 and old §11 | **one statement**, in §5a step 7 | §11 keeps the part that is about A9's own bound and points at step 7 for the schedule |
| Ziller-and-Morack multiplier row, §4 and §6a | **kept in both** | §4 reads it against our budget, §6a against their sequence's own trend. Different lessons |
| the misalignment paragraph, `ATTACKS3.md`:26-29 and `THE-LENS.md`:91-92 | **kept in both**, checked | flagged by `transfers`; word-diffed, no hypothesis dropped. ATTACKS3 derives it, THE-LENS uses it. `THE-LENS.md` is partition D's file |

**§12 was about 60% a restatement of §5a's EXTENDED block.** Both copies are gone
as copies: the EXTENDED block is folded into Step 3's statement, and old §12's
distinctive content (the exactness rates, the divisibility closed form, the tile
list, the "6 of 24 misses", the reason a constant m_eff cannot exist) is in §10.

## 5. Statistics corrected

**ρ (Job 5), three sites, two of them not in the brief.**

| site | before | after |
|---|---|---|
| `gate-multiplies.md` §8 | "MEASURED at 1.0 to 1.9 across T_11 to T_23 and rising with level" | named as the min/max over every (tile, m ≤ 8) cell, 1.02 to 1.84, extremes at (T_19, m=4) and (T_23, m=6); per-level medians given; trend claim dropped |
| `U-FRAME.md` §5a step 4 (was §10) | "about 1.3 at T₁₁ and about 1.7 at T₂₃, rising with level" | named as the median over j ≤ 8, 1.33 and 1.71, with the cell range and the T₂₉ reading; trend claim dropped |
| **`U-FRAME.md` §9** — *not in the brief* | "the same ratio ρ is measured **rising** with level, 1.58, 1.78, 1.83, 1.41, 1.84, 2.39" | named as the max over m ≤ 8, which is `gate-multiplies.md`:424's own row; trend claim dropped, and the row prints its own dip at T₁₉ |
| **`gate-multiplies.md` §10 honest limits** — *the brief said this site already had the honest version* | "rho's trend is measured on six tiles **and it is rising**. … Do not extrapolate rho in either direction" | it carried the trend claim too; now gives both statistics and states there is no trend. The "do not extrapolate" caution is kept |

**0.58 ln p (Job 7), my four sites.** `U-FRAME.md` §7 and §9 now read **0.58 to
0.95 ln p (0.18/0.31 and 0.18/0.19)**, with the note that the two ends are ρ = 1.5
and ρ = 2.4 and that ρ is not monotone, so neither end is the end a trend favours
— per `qc-CAMPAIGN`'s amendment striking the report's own justification.
`gate-multiplies.md`:378's box legitimately fixes ρ = 1.5, so 0.58 stays there
with the alternative added in parentheses; `gate-multiplies.md` §9's box, which
states the range and then collapsed it, gets the full range.

**Counts.** `U-FRAME.md` §9's "seven integers, 2, 1, 2, 2, 2, 3, 2, 4" listed
eight and omitted fold 37's value, which §5's table carries. Now nine,
2, 1, 2, 2, 2, 3, 2, 4, 4.

## 6. The dead quotation (Job 6)

`gate-multiplies.md`:332 attributed to `U-FRAME.md` §§4 and 6a a claim they no
longer make. The numbers in the two files agree; only the quotation was dead, so a
reader following the pointer found agreement rather than the error being
described. The paragraph now makes its point against the softer `2 ln² p/p`
budget without attributing a retired claim to a document that no longer holds it,
and names §4 for the reading it does hold. `qc.js`'s `quotes` check was written
against this site.

## 7. History migration in `gate-multiplies.md` (Job 8)

Applied as MIGRATE, meaning both the changelog entry and the corrected body text.

- **§10 "Where the corrections went" DELETED** (7 lines). Pure process record,
  duplicating the standing footer and the CHANGELOG's own index by document.
  §§11 and 12 renumber to 10 and 11. **Checked before renumbering: no working
  document points at `gate-multiplies` §11 or §12.** The live inbound pointers are
  to §§2, 5, 6, 7, 8, 9 and are untouched.
- **§7's heading and opening** no longer state the file as a verdict on TODO 0b
  as that item used to be written. TODO.md has since been rewritten, so the quoted
  premise is absent from the file cited — a live staleness defect, not just a
  migration. Every number, the VERIFIED table and the `ln x / 2` mechanism are
  unchanged.
- **§7's "corrected item" → "required rate"**, **§8's heading → "What the
  surviving form needs, priced"**, **§8's threshold box → "the surviving form"**,
  **§9 item 3** restated as the per-fold multiplier bound without quoting the
  retired item or its retired win condition.

## 8. Pointer repairs made inside partition B

| site | before | after |
|---|---|---|
| `ATTACKS3.md`:8 | "Full results in U-FRAME §§10-15" | "§5a and §§10-12" |
| `ATTACKS3.md` A2 | U-FRAME §15 | §12 |
| `ATTACKS3.md` A3 | U-FRAME §13 | §§10, 12 |
| `ATTACKS3.md` A4 | U-FRAME §10 | §5a steps 2, 3 and 3a |
| `ATTACKS3.md` A5 | U-FRAME §11 | §10 |
| `ATTACKS3.md` A8 | U-FRAME §§14-15 | §§10-12 |
| `ATTACKS3.md` A9 | (none) | §11 for the engine, §6a for the attribution |
| `ATTACKS3.md` A10 | U-FRAME §12 | §10 |
| `gate-multiplies.md` §6 table | rows labelled 10 (A4) ×3, 11 (A5) ×2, 12 (A10) | 5a step 2 / 5a step 3 / 5a step 3a, 10 (A5), 10 (A10). A9's row stays at 11 and is still correct |
| `gate-multiplies.md` §9 item 1 | U-FRAME section 10 | section 5a, step 2 |
| `gate-multiplies.md` §9 item 2 | U-FRAME section 11 | unchanged — new §11 is exactly the transfer operator |
| `gate-multiplies.md` §11 custody | "U-FRAME sections 5a, 10 and 12" | "sections 5a and 8" |
| `U-FRAME.md` §5a step 6 | §14 | §10 |
| `U-FRAME.md` §7 item 2, §9 | §10 | §5a step 2 |
| `U-FRAME.md` §7 item 1, §9 | "A5 Theorem B" | "§10 Theorem B" |

## 9. Two corrections to the record found on the way

**`ATTACKS3.md` A8's verdict said the opposite of what it meant.** "min(N_P, N_M)
still decays, so A5's hole remains" — a decaying min would *close* the hole. The
two halves of the sentence contradicted each other, and U-FRAME's honest limit has
it right ("nothing here shows min(N_P, N_M) decays"). CORRECTED.

**`ATTACKS3.md`'s organising principle presented a refuted chain as the live
route.** "The chain G₂(new) ≤ G₂(old) + L·m̄ closes iff L is polylog" is §5a step
4, which is REFUTED. The paragraph now states the interval difficulty on its own
terms and records that the chain the wave was framed around is dead, so the R/I
marks read as a statement about the attacks rather than about a live route. The
four pre-registered blocks per attack (Q, first move, Win, Landed) are untouched,
per `qc-CAMPAIGN` decision U1.

## 10. qc.js, before and after

Run before starting, after each structural move, and at the end. Other partitions
were editing concurrently, so the corpus totals move for reasons that are not
mine; the partition-B column is what this report is accountable for.

| check | corpus before | corpus after | partition B findings, before → after |
|---|---|---|---|
| `refs` | 7 | 5 | **0 → 0** |
| `quotes` | 1 | 1 | **0 → 0** |
| `crosslinks` | 0 | 0 | **0 → 0** |
| `scripts` | 2 | 2 | 0 → 0 |
| `transfers` | 12 | 13 | 1 → 4 |

**Pointer integrity confirmed.** `refs` and `crosslinks` are zero for
`U-FRAME.md`, `ATTACKS3.md` and `gate-multiplies.md`. Every `§N` reference inside
the three files resolves to a heading that exists, checked by grep as well as by
`refs`, since `refs` only tests the `file.md §N` shape and much of this file's
internal navigation is the bare `§N` form.

**The four `transfers` hits in partition B were opened and word-diffed. None is a
dropped hypothesis.**

- `U-FRAME.md`:260 vs `gate-multiplies.md`:232 and :445, and vs `TODO.md`:98 —
  three statements of the family copy theorem. Similarity is low (j = 0.05 to
  0.09) and driven by the formula itself; each copy adds something different (the
  theorem, the NFP verdict, the open question). U-FRAME's is the most specific
  ("VERIFIED 40 of 40, over five folds and m ≤ 8"). Three of these are new,
  because moving the theorem from old §10 into §5a step 2 reformatted it as a
  blockquote and the shingles now match.
- `ATTACKS3.md`:26 vs `THE-LENS.md`:91 — pre-existing, checked, both earn their
  place under Chris's rule.

## 11. Handoffs to other partitions

**Pointers into U-FRAME that I do not own.** Both still resolve, so neither is
broken; both now point at the wrong claim within the file.

| site | owner | fix |
|---|---|---|
| `TODO.md`:103 | D | "the exact copy theorem for the whole maxsum family (U-FRAME §10, VERIFIED 40/40…)" → **§5a step 2**, which is where the family copy theorem now lives |
| `localized-04-maxsum.md`:291 | G | "U-FRAME §11 records that Theorem B is structurally capped" → **§10**. `:305`, on A9's exact tail fit, needs no change: new §11 is that content |
| `PRIOR-ART.md`:117 | E | "`research/U-FRAME.md` §11 presents the histogram transfer operator as new structure" → **§6a** holds the attribution now, §11 holds the engine. `qc-arch` recommendation 2 asked for exactly this repoint |

**The 0.58 ln p range, my four sites done, four sites outstanding** (`qc-numbers`
Q5.1): `TODO.md`:85-86 (D), `a3-09-histogram-operator.md`:170-184,
`a3-05-bound-L.md`:251-254, `a3-03-f-from-census.md`:110-112 (G). All four pair
the range 0.19-0.31 with the single factor 0.58.

**"Priced against the *corrected* budget"** — `U-FRAME.md`:314's instance is fixed
(the budget is not "corrected" any more, it is the budget). `qc-history` records
the same defect at `a3-09-histogram-operator.md`:167, which is not mine.

**G₂(41#) repricing.** `U-FRAME.md` §7 item 3 now carries both prices, the lattice
walk at ~37 h and the streaming leg at ~6 h. `TODO.md`'s Parked entry and
`G2-STATE.md` §9 are the sites `qc-CAMPAIGN` Decision U1 names (partitions D and
A). If they land only one of the two figures the three files will disagree in
appearance, so they should carry the same both-instruments form.

**`a3-09-histogram-operator.js`:594's pasted output** reads "T23 --29--> : 2 | 2
agree | 3 <-- U-FRAME DISAGREES, the true value is 2". U-FRAME has carried the
corrected 2 for some time, so the comment is stale — but it sits inside a script's
recorded output and is exempt per `qc-CAMPAIGN` correction 3. Recorded so nobody
"fixes" it.

**`U-FRAME.md` §5's qualifying-gap table has blanks at folds 31 and 37** while
`a3-05-bound-L.md`:99-101 records the sets ({60, 126, 186, 246} at 31). Filling
them is a numbers job in my file that no report asked for and that would need the
fold-37 set computed; left alone deliberately, flagged here.

## 12. Unresolved

**Three regressions of the same shape, with three different slopes, now sit in one
file and a reader could mistake them for one number.** Stated explicitly in §12
rather than left to be tripped over, but not reconciled:

- §5a step 7: ln(1/f) on 2p/m̄, **slope 1.062**, intercept 1.357, R² 0.730, on the
  seven tile-verified diagonal points, 2p/m̄ ∈ [1.52, 2.30].
- §12: ln(1/f) on 2p/m̄, **slope 1.451**, R² 0.902, on 42 census points to x = 199;
  with the singular-series comb term, 1.482.
- §11: ln(1/tail) on 2p′/m̄, **slope 1.2992**, R² 0.993, on 31 operator points.

The third is a different object (the exceedance tail, not f). The first two are
the same object over different ranges, and §12's own quarterly ratios (1.83, 1.80,
1.74, 1.58) show the relation drifting, so a single slope is not the right summary
of either. **Nobody has checked whether the seven-point fit and the 42-point fit
agree on the seven shared points.** That is a half-hour of compute and it would
either retire the seven-point fit or expose a real disagreement.

**§9 still says "the difficulty is localized to one named, cheaply measurable
quantity" and names L**, while §5a step 3 and §10 now say the target is κ(m). Not
a contradiction, since κ(1) = L and the difficulty is the same one, but §9 is the
section a reader reaches for the summary and it names the older coordinate. Left
as it stands because rewriting §9's verdict is a mathematical judgement, not a
restructure.

**The 37-hour figure for G₂(41#).** I added the streaming price rather than
replacing the lattice-walk one, on `qc-CAMPAIGN` Decision U1's arithmetic
(519 s × 35 slots × 41/37 ≈ 5.6 h). The brief did not assign U-FRAME §7 this fix;
it assigned `TODO.md` and `G2-STATE.md`. If the parent wants only the two named
sites changed, this one clause in §7 should come back out.
