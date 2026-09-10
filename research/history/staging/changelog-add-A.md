# Changelog entries from wave-2 partition A

<!-- ledger
id: Q-changelog-wave2-A
status: ANSWERED
todo: none
question: What changelog entries does wave-2 partition A owe research/history/CHANGELOG.md?
verdict: Staged per-document entries for G2-STATE.md, LOCALIZED-GAP.md, maier-matrix.md and origin-excess.md, each naming the claim as it stood, what replaced it and the artifact that forced the change; a staging file for the parent to merge, not an edit to the changelog.
-->

*(Staging file. Merge into `research/history/CHANGELOG.md` under a wave-2
heading, keeping the per-document grouping below. Partition A owns
`research/G2-STATE.md`, `research/LOCALIZED-GAP.md`, `research/maier-matrix.md`,
`research/origin-excess.md`.)*

---

## 2026-08-17, wave 2: the consistency campaign applied (partition A)

### research/G2-STATE.md

**§4e stated the Origin Excess Lemma without `y′² > x`.** The hypothesis is in
`maier-matrix.md` §4 in bold and was lost in transfer, with the citation, the
`PROVEN, VERIFIED 14/14` marker and every number intact. Without it the quoted
lemma reads as applying to every y < x with S ≤ y′², and in the whole regime
y′² ≤ x it asserts nothing: D_x(S) = 0 for S ≤ x, so at S = y′² ≤ x it is 0 = 0.
RESTORED, as a labelled non-vacuity remark inside the boxed statement so it
cannot be quoted away again. Forced by `qc-shepherd.md` item 3b, re-verified
computationally three ways (`oel-hypotheses.js`).

**§4e's "the lemma carries an unstated third hypothesis".** RETIRED as a private
count. The lemma has one hypothesis, S ≤ y′²; the x < x\* threshold belongs to
the Origin Excess Corollary, not to the lemma. §4e now cites the canonical
enumeration at `maier-matrix.md` §4a.

**§4e, "The lemma's first form missed the m = y′² boundary case and failed 4 of
14".** MIGRATED here; the body states the surviving fact, that the m = y′²
boundary case is load-bearing and dropping it fails 4 of the 14 cells.

**§5 route A and §9 item 2, the Kanold/Stevens/Paseman loose end.** Two defects
in one passage. The four words "at the needed constant" were dropped in transfer
from `ZONE-POSTULATE.md`:248, and the constant is the whole question. And the
premise itself is false for all three papers: Kanold gives 2^{√k}, Stevens
k^{Θ(log k)}, Paseman (arXiv:1311.5944) k^{O(log log k)}, none of them exponent
2 + ε. The k^{2+ε} results are Vaughan 1977 for general n and Iwaniec 1971
Theorem 2 / 1978 at primorials, `g ≪ (k log k)²`, both with inexplicit
constants. So the item is CLOSED by inspection of the sources rather than open:
no explicit-constant route to g(x#) < x′² exists in this literature and route A's
second difficulty floor stands. "The cheapest item on the list" is retired with
it. Forced by `qc-shepherd.md` item 3d and `qc-refs.md` W7; paired with
`TODO.md` 000b.

**§9 item 6, "Cost: about 40× the 37# run" for G₂(41#).** REPRICED to about six
hours. The 37-hour figure is the lattice walk over positions, which is linear in
tile width; the streaming leg scales in slots, and T₃₇ holds 217,929,355,875
slots against T₃₁'s 6,226,553,025, a factor of exactly 35, so the measured 519 s
that produced G₂(37#) scales to 5.05 h and to 5.6 h with the 41/37 deletion-state
factor. The residual risk is memory, not time. Forced by the arithmetic in
`qc-CAMPAIGN.md` decision U1 against `U-FRAME.md`'s streaming-leg custody note.
The thirteenth term is a same-day falsifiable test of the Poisson law rather than
a parked overnight job.

**§7's quotation of `ZONE-POSTULATE.md` §5's "second sighting worth watching".**
DEAD QUOTATION removed; that phrase is no longer in ZONE-POSTULATE §5. The body
states the question and the answer without the retired framing. Forced by
`qc-history.md` O6.

**§8's ownership table fused five rows.** SPLIT, and the discipline is now stated
at the head of the table: one object per row, one calibration per cell, a subject
containing "and" is a defect, and a calibration cell containing "+" or "given"
names a second object. Rows split: the driving-term lemma from the refuted route;
the Overshoot Budget from the four-hypothesis no-fixed-point argument; Facts A
and B from the two-class Localized Merge Lemma; the discrepancy ΔΦ₂ from its
measured per-fold sup and sd ladder; and the Origin Excess Lemma from the
corollary's ceiling and from the measured reversal at the zone width. Forced by
`qc-compound.md` CC-5, which notes that `README.md` sends readers here on the
promise of a calibration marker on every line.

**"today" and "tonight" as the tense of a working document.** RETIRED at eight
sites (the header, §0 twice, §3b's house practice, §5's title and its status
line, route B, route D, §5b's title, §10). The document states current
understanding and reads as though it had always said it; the dates are here.

**§4f's citation of the `OBSERVATIONS.md` triage rule.** REPOINTED to
`THE-LENS.md` §5, which owns the rule and says so at `THE-LENS.md`:184. Forced by
`qc-arch.md` recommendation 1.

### research/maier-matrix.md

**§4's statement fused four objects of three logical types inside one boxed
"Lemma (PROVEN, VERIFIED 14/14)".** DECOMPOSED, and §4a is now the canonical
enumeration for the corpus: the **Origin Excess Lemma** with its one hypothesis
S ≤ y′²; the **non-vacuity condition** y′² > x, which is a remark and not a
hypothesis because the identity is bookkeeping and holds regardless (VERIFIED
3 of 3 outside the stated range); the **Origin Excess Corollary**, which owns the
advantage and its expiry at x < x\*(y); and the **Scale Collision Proposition**,
which is a theorem about the parameters and independent of the lemma. The reason
the split matters: the strike characterisation is what needs S ≤ y′², and its
bound L ≤ 2(π(x) − π(y) + 1) fails in 6 of the 8 test cells with S > y′². Three
documents previously kept three different counts of "the hypotheses", which is
how a qualifier went missing unnoticed. Forced by `qc-shepherd.md` item 3c and
`qc-compound.md` CC-4.

**§8's heading, "Chris's correction is right".** REWORDED to the verdict itself,
"Granville-Soundararajan Corollary 1.4 is vacuous at every computable scale". Who
was right about it is here; the same for §8's closing sentence and reading 8,
which now state that Corollary 1.4 is not an obstruction in this repo without
narrating the withdrawal. The withdrawn claim, for the record: GS Corollary 1.4
as a proven obstruction to the zone programme is WITHDRAWN, because
η = min(α/3, 1/100) caps at 1/100 for every sequence, forcing u ≥ 50,000 and
log x ≥ (5·10⁶)^200 (`scratchpad/holt/gs.txt` 313-325).

**§10 "Corrections to the briefing" (25 lines).** MIGRATED, section removed, §11
renumbered to §10. Its three bullets:
- The briefing offered q = x# on the ground that the slot count is identical in
  every row while the prime count is not. The ground is empty as a matrix
  statement. The surviving mathematics — the row-by-row count of prime slots is
  free below x′² by crystallisation and is the twin prime problem above it — was
  not stated in §2 in that form and is now there.
- The briefing's "Maier has to fight for his AP input, ours is exact and free"
  asymmetry is RETIRED as an encouraging reading: the premise is true and the
  inference is wrong, since GS's own history shows the AP input moving from
  GRH-conditional to unconditional without changing the size of the conclusion.
  The epigram that survives, "his fight with the AP input buys unconditionality;
  his fight with Buchstab buys the theorem", is now in §7 Q3.1.
- The bullet asserting that `PRIOR-ART.md`'s Maier-chain entry has the row and
  column sums the wrong way round is DELETED: `PRIOR-ART.md`:302-303 already
  carries the corrected version and `CHANGELOG.md`:396-400 already logs it. The
  bullet asserted a pending action that no longer existed.

**§1's "Chris's doubt, recorded before the work" and §7 Q3.1's "The briefing is
right that…".** REWORDED to state the fact and keep the attribution. The doubt
and who held it stay; the process framing is here.

**§4 and §9's citations of the `OBSERVATIONS.md` triage rule.** REPOINTED to
`THE-LENS.md` §5, the declared owner.

### research/origin-excess.md

**§6's title, "The three hypotheses of the Origin Excess Lemma, only one of which
was written down".** RETIRED, false twice over: `maier-matrix.md` §4 does state
the second, and two of the three were never hypotheses. §6 is now "The lemma's
one hypothesis, the corollary's threshold, and the collision", with §6a, §6b and
§6c deriving the three companions of the enumeration at `maier-matrix.md` §4a.

**§0's "the Origin Excess Lemma has an unstated third hypothesis".** RETIRED as
above; the threshold belongs to the corollary and the text now says so.

**§9 "Corrections to the record" (35 lines).** MIGRATED, section removed, §§10
and 11 renumbered to §9 and §10. Its six bullets:
- "The lemma carries three hypotheses, not one" is superseded by the
  decomposition and by §6; deleted.
- "The disjointness of the two regimes owes nothing to the matrix" is current
  mathematics and MOVED into the body as §6c, the Scale Collision Proposition.
  This is the statement `maier-matrix.md`:282 was citing when it cited the
  non-existent §6c; the citation now resolves.
- "Above y′² the advantage is negative" is current and already stated three times
  in the body (§0 item 2, §3, §4), so nothing needed relocating.
- "'The measured factor is small' is the weak form" RETIRED as our own earlier
  phrasing; the surviving and stronger fact, that the factor is bounded by an
  absolute constant near 2 and the bound does not improve with scale, is in §6b.
- The identification of `FOLD-PROFILE.md` §9's trough constant with ρ(2) is
  current and was already in the body at §5; the instruction to cross-reference
  it in three files is spent, since `FOLD-PROFILE.md`:300 and `GLOSSARY.md`:208
  carry it.
- The quotation of `ZONE-POSTULATE.md` §6 route B's "not yet aimed here" is a
  DEAD QUOTATION; that string is in no body file. The surviving fact, that three
  pieces of the origin's proven structure are aimed at route B and all three
  miss, is now the closing paragraph of §7.

**§1's "The briefing's numbers are all correct".** REWORDED to the custody fact:
every inherited number reproduces on an independent engine.

### research/LOCALIZED-GAP.md

**§4's unnamed map.** The home document left the gate feedback map anonymous
while `G2-STATE.md` §4c named it. BACKPORTED: the map B ↦ 2.4·R·B·ln x is named
and its expansiveness for every x ≥ 2 stated as the reason there is no fixed
point, together with "because the gate feeds back". Forced by `qc-shepherd.md`
item 4 and recommendation 10.
