# Changelog entries from wave-2 partition B

<!-- ledger
id: Q-changelog-add-B
status: ANSWERED
todo: none
question: Which superseded text from wave-2 partition B belongs in the changelog?
verdict: The per-document entries for U-FRAME, ATTACKS3 and gate-multiplies, staged for the shepherd to merge in one pass; nothing was written to CHANGELOG.md here.
-->

*(Staging file. Merge into `research/history/CHANGELOG.md` under a wave-2
heading, keeping the per-document grouping below. Partition B owns
`research/U-FRAME.md`, `research/ATTACKS3.md`, `research/gate-multiplies.md`.)*

---

## 2026-08-17, wave 2: the consistency campaign applied (partition B)

### research/U-FRAME.md

**§§10-15 were titled by which attack produced the result** — "Attack A4's
corrections to this note", "Attacks A5 and A9", "Attack A10", "Attack A3",
"Attack A8", "A8's extension" — so the status of L was spread over six attack
sections and had to be synthesised by any reader who asked for it. RESTRUCTURED
by claim: the mathematics went into the sections that own each object (§5a, §6a,
§8) and the residue became three claim-named sections, §10 L and κ(m), §11 the
transfer operator and the pair count, §12 f and the staircase. §§1-9 keep their
numbers, because 128 inbound section pointers land on them and 15 of the citing
artifacts are scripts whose pointers sit in pasted output. Forced by
`qc-arch.md` §2. Nothing went to `history/`: the attack chronology already has a
home in `ATTACKS3.md`.

**§5a Step 3 and old §10 disagreed on strategy while agreeing on the facts.**
Step 3 stated maxsum₂ ≤ G₂(new) ≤ maxsum_{L+1} and read as an invitation to
bound L; §10, four hundred lines later, recorded that the sharp shift measures
strictly below L at three of five folds and that "a proof aimed at L is aiming
past the target". A reader who stopped at §5a took away the wrong strategy.
RESOLVED: the looseness verdict and the strategic verdict now sit in Step 3,
where L is defined, in the form **aim at κ(m), not at L**.

**The sharp shift j\*(1) and the effective run length were the same object under
two names**, measured over five folds in old §10 (j\*(1) = 1, 2, 1, 2, 2 against
L = 2, 2, 2, 3, 2) and over nine folds in §5a's EXTENDED block and old §12
(m_eff = 3, 2, 2, 3, 2, 3, 3, 3, 4 against L+1 = 3, 2, 3, 3, 3, 4, 3, 5, 5).
1 + j\*(1) = m_eff by definition and the five overlapping values agree. MERGED
into one statement in Step 3, with j\*(m) defined once.

**§5a Step 3's inline dated block, "EXTENDED to folds 31 and 37, and A10
answered NEGATIVELY (2026-08-16)", was a correction sitting beside the claim it
corrected.** FOLDED into the statement of the bound as present-tense fact: the
bound is verified at 329 (tile, prime) cells over folds 7 to 37, and the two
mechanisms that stop the lower half becoming exact live in §10 with the rest of
the A10 result.

**§5a Step 4 was stated twice, 90 lines apart**, once with the reason and once
with the table. MERGED into one statement carrying both. The Step 2 kill law's
copy theorem now also carries its family form, which lived in old §10 and which
`TODO.md` item 0c and `gate-multiplies.md` §9 both cite.

**One qualifying-gap closed form was stated three times** (old §§11, 13, 14),
one Alternation Lemma twice (old §§11, 14), and one fold-11 explanation twice.
COLLAPSED to one statement of each in §10, keeping every distinguishing detail:
the weights 1, 1, 2, the 3p window threshold, the check at all 302 primes from 5
to 1999, and the two-state walk as the proof sketch.

**The L(T₂₃, 29) = 2 custody note was stated three times, each claiming a
different ordinal** — "established independently five times" in §5, "the fourth
of five independent confirmations" in old §12, "confirmed here for the fifth
time" in old §14. The ordinals were per-attack bookkeeping and disagreed.
SETTLED as one custody statement in §8 naming all five confirmations (A4, A5,
A8, A9, A10) and dropping the ordinals. `Lgrowth.js`'s hazard warning and the
streaming custody moved into §8 with it.

**Old §11 held a prior-art finding.** The Holt and Rudd arXiv:1408.6002 §5
attribution and the instruction that nothing below may be presented as new
structure MOVED to §6a, the file's own prior-art section, which is why
`PRIOR-ART.md`:117 had to point into an attack section to find it.

**§9's "the same ratio ρ is measured rising with level, 1.58, 1.78, 1.83, 1.41,
1.84, 2.39" and old §10's "about 1.3 at T₁₁ and about 1.7 at T₂₃, rising with
level" both named no statistic and both asserted a trend.** The two are
different statistics of one quantity, ρ = (maxsum_m − G₂)/((m−1)·m̄): §9 quotes
the per-level maximum over m ≤ 8, old §10 the per-level median. Both are
arithmetically right. **"Rising with level" is REFUTED for all three natural
statistics**: the median runs 1.33, 1.26, 1.15, 1.27, 1.71 at T₁₁ to T₂₃, the
mean the same shape, and the max dips 1.83 → 1.41 at T₁₉. Both sites now name
their statistic and neither claims a trend. Forced by `qc-numbers.md` Task 0,
which sieved T₁₁ to T₂₃ from scratch and reproduced both recorded maxsum tables
digit for digit.

**§9 said "we have seven integers" and listed eight**, omitting fold 37's value
that §5 carries. CORRECTED to nine, 2, 1, 2, 2, 2, 3, 2, 4, 4 at folds 7 to 37.

**"The gap is a factor 0.58 ln p, and it is the only gap" was the optimistic end
of a range.** 0.58 is 0.18/0.31; the other end of the corpus's own range,
0.18/0.19, is 0.95. CORRECTED at §7 and §9 to **0.58 to 0.95 ln p**, with the
note that the two ends are ρ = 1.5 and ρ = 2.4 and that ρ is not monotone in the
level, so neither end may be presented as the one a trend favours. Forced by
`qc-numbers.md` Q5.1 as amended in `qc-CAMPAIGN.md`.

**§7 item 3 priced G₂(41#) at about 37 hours with no alternative given.** The
lattice-walk figure stands as the lattice-walk cost; the streaming leg of §8,
which scales in slots rather than positions, prices the same term at about 6
hours. Forced by `qc-CAMPAIGN.md` Decision U1.

### research/ATTACKS3.md

**Five Landed verdicts pointed at U-FRAME sections that the restructure
retired** (§§10, 11, 12, 13, 14-15). REPOINTED to the sections that now hold the
mathematics, in the same edit as the restructure, which is why the restructure
did not move the chronology to `history/`.

**"min(N_P, N_M) still decays, so A5's hole remains" (A8's verdict) said the
opposite of what it meant** and of what U-FRAME's honest limit states. CORRECTED
to "nothing shows min(N_P, N_M) decays". The two halves of the sentence
contradicted each other: a decaying min would close the hole, not leave it open.

**The organising principle presented the additive chain
G₂(new) ≤ G₂(old) + L·m̄ as the live route.** That chain is §5a step 4 and is
REFUTED. The paragraph now states the interval difficulty on its own terms and
records that the chain the wave was framed around is dead, so the R/I marks read
as a statement about the attacks rather than about a live route.

### research/gate-multiplies.md

**§7 attributed to `U-FRAME.md` §§4 and 6a a claim those sections no longer
make** — "the multiplier uses only 15 to 45 percent of its budget and the
fraction is TRENDING DOWN" — while the numbers in the two files agreed. The
quotation was dead: a reader following the pointer found agreement rather than
the error being described. REWRITTEN to make the point against the softer
`2 ln² p/p` budget without attributing a retired claim to a document that no
longer holds it. Forced by `qc-history.md` O1.

**§8's "ρ MEASURED at 1.0 to 1.9 across T_11 to T_23 and rising with level"
named no statistic and asserted a trend the same file refutes sixty lines
later** at :424, which prints the dip 1.83 → 1.41 at T₁₉. The range is the
min/max over every (tile, m ≤ 8) cell, 1.015 at (T₁₉, m=4) to 1.839 at
(T₂₃, m=6). CORRECTED to name the statistic, give the per-level medians, and
drop the trend. §10's honest-limits note lost its "and it is rising" for the
same reason.

**§7 and §9 were written as a verdict on TODO item 0b as that item used to be
written**, and TODO.md has since been rewritten to the corrected form, so the
quoted premise is absent from the file cited. MIGRATED: §7's heading and opening
state the required rate as the fact it is, §8's heading and threshold box speak
of the surviving form, and §9 item 3 states the per-fold multiplier bound
without quoting the retired item or its retired win condition. Every number, the
VERIFIED table and the `ln x / 2` mechanism are unchanged.

**§10, "Where the corrections went", was pure process record** duplicating both
the standing footer and the CHANGELOG's own index by document. DELETED; §§11 and
12 renumber to 10 and 11. No working document pointed at either.

**§6's recursion table and §9 labelled their rows by the U-FRAME section that
held each object**, four of which moved. RELABELLED: A4's three recursions now
name §5a steps 2, 3 and 3a; A5's theorems and A10's effective run length name
§10; A9's operator stays at §11.
