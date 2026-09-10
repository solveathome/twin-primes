# Changelog entries from wave-3 partition H

<!-- ledger
id: Q-changelog-wave3-H
status: ANSWERED
todo: none
question: Which changelog entries does wave 3 partition H stage for CHANGELOG.md?
verdict: Entries for U-FRAME.md's split, in which sections 10, 11 and 12 keep their numbers and heading text and lose their bodies, plus the three new child documents kappa-not-L.md, operator-and-pair-count.md and f-decays.md.
-->

*(Staging file. Merge into `research/history/CHANGELOG.md` under a wave-3
heading, keeping the per-document grouping below. Partition H owns
`research/U-FRAME.md` and the three child documents created here.)*

---

## 2026-08-17, wave 3: the consistency campaign applied (partition H)

### research/U-FRAME.md

**The file grew during wave 2, 967 → 1,032 lines, which is the wrong direction.**
Partition B fixed the structural defect by absorbing the six attack-titled
sections into the claim-shaped skeleton, and recorded the cost in writing:
`applied-B.md`:63-71 states that the parent may reasonably ask for the three new
sections to become children with stubs, and that the change would be mechanical
because the sections are now self-contained. SPLIT, on that reading. **§§10, 11
and 12 keep their numbers and their heading text and lose their bodies:**

- §10 "L and κ(m): the proven bounds, and why L is not the target" →
  [research/kappa-not-L.md](../kappa-not-L.md)
- §11 "The exact machinery: the histogram transfer operator and the pair count" →
  [research/operator-and-pair-count.md](../operator-and-pair-count.md)
- §12 "f, the qualifying-gap fraction: 42 exact points and the staircase" →
  [research/f-decays.md](../f-decays.md)

308 lines left the file and 48 lines of stub replaced them, 1,032 → **772**. Each
stub states the section's claims with their calibration markers and links its
child, so a reader who never leaves `U-FRAME.md` still learns what §§10-12 claim
and at what strength.

**Nothing was renumbered and no heading text was changed**, for the reason
`qc-arch.md` §2 gives: 128 inbound section pointers land on this file and 15 of
the citing artifacts are scripts whose pointers sit inside pasted output. The ten
live inbound pointers at §§10-12 (`ATTACKS3.md`:8, :88, :140, :203, :220, :244;
`gate-multiplies.md`:454; `PRIOR-ART.md`:117; `localized-04-maxsum.md`:291, :305)
all still resolve. No document in the corpus points at a §§10-12 sub-heading by
name; checked against thirteen sub-heading phrases, with the grep validated on
known positives first.

**The moved bodies are verbatim.** Word-diffed rather than read. The only changes
across all three children are 12 insertions of `U-FRAME` in front of a bare `§N`,
9 replacements of a bare `§10`/`§11`/`§12` by the sibling child's filename, and 3
replacements of "this section" by "this note". No number, table, calibration
marker or caveat changed.

**Redundancy: the four items `qc-arch.md` §2.1 listed were checked and are already
gone.** The Alternation Lemma is stated once; the qualifying-gap closed form is
stated once in its weights 1, 1, 2 form; the "§12 is 60% a restatement of §5a's
EXTENDED block" finding described the *old* §12, which partition B dissolved. **The
L(T₂₃, 29) custody ordinals are settled and there is nothing left to adjudicate**:
the three disagreeing sites were old §5:220-224 ("five times"), old §12:816-819
("the fourth of five") and old §14:924-927 ("the fifth time"), and B replaced them
with one ordinal-free statement at §8 naming all five confirmations (A4, A5, A8,
A9, A10). Recorded here because the wave-3 brief asked for the third site to be
located: it was old §5.

**One duplication was found and deliberately kept.** The priced gap "L ≤ 0.19 to
0.31 p/ln p on average against a proven L ≤ 0.18 p, a factor of 0.58 to 0.95 ln p"
is stated in full at §5a step 4, §7 item 1 and §9, and §7's and §9's are
near-identical down to the parenthetical. §7 is the action list and has to be
actionable standing alone, and both `TODO.md`:79 and `qc-status.md`:435 reach for
§7 for exactly this number.

### research/kappa-not-L.md (new)

Old `U-FRAME.md` §10, moved whole. The status of the L question in one read: the
closed-form qualifying-gap law with weights 1, 1, 2, the Alternation Lemma and the
kill graph, Theorems A, B and C, the wall located precisely, the proof that the
lower bound never becomes exact from some level on, and the verdict that the target
is κ(m) and inside it the rarer ±2 class at 4p. Named for the verdict rather than
the object; the capital L follows `a3-05-bound-L.md`.

### research/operator-and-pair-count.md (new)

Old `U-FRAME.md` §11, moved whole. The histogram transfer operator, its honest
limit as an exact simulator rather than a source of bounds, the head engine's 31
exact diagonal tail points with the flagged FIT and the caution against
transferring it, the exact pair count PAIRS(T, p), and the alternation check at
fold 37. Object-named rather than claim-named on purpose: five live inbound
pointers reach this content by the words "transfer operator" or "pair count". The
operator is PRIOR ART (Holt and Rudd 2014, `U-FRAME.md` §6a) and the instruction
that nothing there may be presented as new structure travels with it.

### research/f-decays.md (new)

Old `U-FRAME.md` §12, moved whole. Lemma B and the structural negative that puts
the cheap half of the grain census law out of reach exactly where f lives, f on 42
exact points from x = 11 to 199 with no tile ever built, the singular-series comb
that resolves A2's scatter, the proven staircase whose treads are the twin pairs,
and the caveats kept visible.

**Kept separate from `operator-and-pair-count.md` deliberately.** Both measure the
same receding threshold and their slopes disagree, 1.451 against 1.2992, which
`applied-B.md` §12 already carries as an open item. They are different objects, f
against the exceedance tail, and merging them would bury a flagged inconsistency
inside one file instead of leaving it visible across two.
