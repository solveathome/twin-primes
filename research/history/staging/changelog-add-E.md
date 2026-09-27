# CHANGELOG entries from wave-2 partition E

<!-- ledger
id: Q-changelog-wave2-E
status: ANSWERED
todo: none
question: What changelog entries does wave-2 partition E owe research/history/CHANGELOG.md?
verdict: Staged entries covering covering-dive.md, two-class-lower-bounds.md, PRIOR-ART.md, sift-limit-attack.md, theta-ladder.md, maxgap-law.md and dhr-verification.md, led by the FKMPT constant moved across two files together.
-->

Merge into `research/history/CHANGELOG.md` under a single dated heading. Files
covered: `covering-dive.md`, `two-class-lower-bounds.md`, `PRIOR-ART.md`,
`sift-limit-attack.md`, `theta-ladder.md`, `maxgap-law.md`,
`dhr-verification.md`.

---

## 2026-08-17, wave 2: partition E — the FKMPT constant, the source checks, and four brief-response migrations

### research/covering-dive.md and research/two-class-lower-bounds.md — the FKMPT constant, moved together

**`C(ρ) := sup{δ : (4 + δ)·10^{2δ}/log(1/(2δ)) < ρ}` and `C(ρ) > e^{−1−4/ρ}`
(`covering-dive.md` §Q2.3), and `C(1/2) > 1/6001`
(`two-class-lower-bounds.md` §2a). RETRACTED VALUES, replaced by `6·10^{2δ}`,
`e^{−1−6/ρ}` and `C(1/2) > 1/325565`.**

**This value has now been edited three times and the record of why is the point
of this entry.** The sequence was: the corpus first carried 6; an earlier audit
wave (`research/history/staging/audit-campaign.md`) judged the 6 to be a stale
arXiv reading and moved `covering-dive.md`:59 to 4, writing its confidence into
a staging file; every later pass inherited that, including the wave-1 brief for
`qc-refs`. `qc-refs` W1 pulled all four arXiv PDFs and found the direction is
the opposite one, and this partition re-verified it from the same PDFs plus the
publisher record before applying.

The evidence, so no fourth edit is needed:

- arXiv v2 (2019-08-16) and v3 (2021-06-23) print `(4 + δ)·10^{2δ}` and
  `C(ρ) > e^{−1−4/ρ}`, and v3 prints `C(1/2) > 1/6001` in its own text.
- **arXiv v4 (2022-09-19) prints `6·10^{2δ}`, `C(ρ) > e^{−1−6/ρ}` and
  `C(1/2) > 1/325565`.** So `1/325565` is not our arithmetic; it is the
  paper's own corrected figure.
- v4 carries the corrigendum as its **Appendix A, "Corrigendum: changes made
  from the published version"**, which states the cause — errors in the
  exponents of H in the deduction of Theorem 2 from Theorem 3, forcing M > 6 —
  and enumerates the changes, item (1) being "the definition of C(ρ), the
  factor 4 + δ corrected to 6. Likewise, the corrected lower bound is
  C(ρ) > e^{−1−6/ρ}", item (4) being "In (1.7) and Corollary 2, the corrected
  bound is C(1/2) > 1/325565". Credited by the authors to Mikhail Gabdullin.
- **The corrigendum is published: J. Eur. Math. Soc. 25 (2023), no. 6,
  2483–2485, DOI 10.4171/JEMS/1305.** It appeared nowhere in this repository
  before this pass; it is now cited in both files.
- The direction is the ordinary shape of a corrected error: 4 → 6 *weakens* the
  bound, since e^{−1−6/ρ} < e^{−1−4/ρ}. The figure standing in the corpus was
  **54× too generous.**

The qualitative claim is unaffected: "two classes per prime on half the primes
is inside a published theorem" needs only `C(1/2) > 0`, which holds in every
version. Both files now state which version they quote.

**The method lesson, recorded because it is about this campaign.** Version
drift in a cited source is invisible to internal consistency: `covering-dive.md`
and its own bibliography agreed with each other perfectly while both carried the
retracted value. Only fetching the source caught it.

**`covering-dive.md`:58's "v3, dated 2024-12-03".** RETIRED. No version of
arXiv:1802.07604 is dated 2024-12-03 (v1 2018-02-21, v2 2019-08-16,
v3 2021-06-23, v4 2022-09-19); the file now cites v4 throughout with its correct
date, and the v2/v3 values in a parenthesis.

**`covering-dive.md`'s `[Halberstam–Richert, Cor. 2.4.1]` inside a quotation
labelled verbatim.** The substitution is substantively CORRECT — bibliography
entry [7] in v2, v3 and v4 is verbatim "H. Halberstam and H.-E. Richert, *Sieve
Methods*, Academic Press, London, 1974 — and it is now marked as an editorial
expansion, `[7 = Halberstam–Richert, Cor. 2.4.1]`, with the note that `[7]` in
v1 is a different work. `two-class-lower-bounds.md`'s bare `[7]` gains the
version numbering. Remark 7's text is byte-identical in v3 and v4 (Remark 8 in
v2), so the version split there was harmless; the damage was one bullet up.

### research/maxgap-law.md

**§10 item 4, "The Maier-Pomerance statement, checked against the source, so
nobody re-checks it".** Two of its three legs were WRONG, in a block whose
whole function was to discourage re-checking. Corrected against
`arXiv:1412.5029` before being relocated into §7, per the sequencing constraint:

- "`Y(x) = j(P(x)) − 1` exactly (their **eq. 1.2**)" → it is **eq. (1.3)**;
  `Y` itself is their **Definition 1**; and (1.2) is a different statement, the
  proven lower bound.
- "The proven FGKMT bound is `Y(x) >= R·x·log x·log_3 x/(log_2 x)^2` for any
  `R`" → FGKMT's (1.2) is `Y(x) ≫ x log x log_3 x/log_2 x`, a **single** power
  of log_2 x. The squared form is **Rankin's**, printed by FGKMT only in the
  sentence "This improves on the bound … obtained by Rankin". The "for any R"
  quantifier is not theirs either: their Theorem 1 is
  `G(X) ≫ log X log_2 X log_4 X/log_3 X` with an effective implied constant.
- Leg 1, the Maier–Pomerance quotation, is CORRECT and verbatim.

**The conclusion survives**, which is why this is a statement-of-someone-else's-
theorem defect and not a mathematical one: with the correct bound the ratio to
the random-dart level is `log_3 x/(e^γ log_2 x) → 0`, so it still sits below.
`maxgap-law.md`:391 carried the same misattribution and is corrected with it.
The other fourteen sites in the corpus already had the single `log_2 x`, and
`:52` and `:390` correctly attribute the squared form to Rankin.

The relocated block now says what was checked, against which version, and on
what date, which is what makes a "do not re-check" note usable.

**"Ford's slides: not located in this dive"** (`covering-dive.md` §Q5) against
`maxgap-law.md` §6 quoting them verbatim as read. RESOLVED by locating them:
Kevin Ford, *Large gaps between primes*, Talks 1–3, CRM Montreal workshop
*Probability in Number Theory*, 2018,
ford126.web.illinois.edu/montreal_talk{1,2,3}_primegaps.pdf. Talk 1's slide
"Proving large gaps: Jacobsthal's function" carries both quoted statements one
line apart, verbatim as `maxgap-law.md` §6 reports, and independently
corroborates FGKMT's single log_2 T. Both files now carry the citation.
`two-class-lower-bounds.md` §2c's "T(log T)^{1+c} under uniform Hardy–
Littlewood" is also verbatim on that slide and now carries the citation.

**§10 items 1, 2 and 3, "What this note owes other files".** All three debts
were paid before this pass and the list stated they were outstanding:
`localized-04-maxsum.md`:127-133 now carries the coordinates; `FOLD-PROFILE.md`
:486 now reads `M(x, x′²) ~ 3.5·ln³x` with margin `x²/(3.5 ln³x)`;
`exponent-control.md`:86 now carries `c1 ~ (log p)^{0.12 ± 0.03}`. Section
removed; §§11, 12 renumber to 10, 11. Verified first that no document cites
`maxgap-law.md` §10 or past it — the highest inbound section reference is §9.

**Brief-response framing.** The 2026-08-17-night date stamp, "this note …
corrects three things", "over a lever 41 times longer than the briefing
assumed", "the tension in the briefing", the READING 1 heading "The tightness
dispute", the quotation of the briefing's two spreads, and "Correction to the
briefing, and to both files" all RETIRED as framing. The mathematics is
unchanged: the two spreads are the same size on matched conventions, and the
one-class lever is a factor 41 with `c1` moving 22% over it.

### research/two-class-lower-bounds.md

**§10 "Corrections logged", five items.** MIGRATED. Four of the five quoted
sister documents that no longer say the quoted thing:

- item 3 quoted `covering-dive.md` §Q4.2's "realistic target 4" asking "does
  covered length scale like `c·p²/log`? like ZM's ≈ `p²/2` data?" — neither
  string is in that file. Its mathematics is not stated anywhere else in the
  file and has been moved into §6 as a plain paragraph.
- item 4 quoted `U-FRAME.md` §6a as reading the adversarial exponent "STABLE at
  about 1.62, comfortably below the critical 2"; `U-FRAME.md`:535 now reads
  "The fitted exponent is 1.62 in the theta frame and 1.924 against x". Its one
  non-duplicated sentence, the 1.2 greedy-ladder exponent, is already at §5.
- item 5 quoted `ZONE-POSTULATE.md` §5's "a second sighting worth watching",
  retired from that file. Its surviving content is the direction-of-inference
  warning, which is live and load-bearing.
- items 1 and 2 recorded briefing doubts whose answers are already the file's
  own headlines (`G2 ≥ g` at §1; "stronger by exactly log x", derived three
  ways at §4b, §5 and §6, and restated in §8's verdict).

**§10 is REPURPOSED rather than deleted, and §§11-12 keep their numbers.**
`ZONE-POSTULATE.md`:150 cites "`research/two-class-lower-bounds.md` §10" for
the climbing certificate ladder. Deleting §10 and renumbering would have broken
that pointer and required an edit in another partition's file. Instead §10 now
holds item 5's surviving content under the heading "The certificate ladder, and
how far it can be pushed", so the inbound pointer resolves to exactly the claim
it wants and no renumbering is needed anywhere.

**§9's "LOOSE END, not checked": Kanold, Stevens and Paseman "all of which give
exponent 2 + ε with stated constants".** FALSE for all three, and CLOSED rather
than done. From Paseman's own §1 (arXiv:1311.5944): Kanold gives `2^k` and
`2^{√k}` for k ≥ e^50; Stevens gives `g(n) < 2k^{2+2e·log k}`, whose log₂ is
`O((log k)²)`; Paseman improves that to `u(k) = O(log k·loglog k)`. As
exponents in k those are `2^{√k}`, `k^{Θ(log k)}` and `k^{O(loglog k)}` — none
is `k^{2+ε}`. The exponent-2 statements are **Vaughan 1977** (general n) and
**Iwaniec 1971 Theorem 2 / 1978** (primorials), both with inexplicit constants,
and the constant is what the question turns on. So the difficulty floor under
route A **stands**; it does not collapse. Matches the closure partition A
applied to `G2-STATE.md` §§5 and 9 and partition D to `TODO.md` 000b.
`covering-dive.md`:17 carries the same correction with the bibliography fixed:
Kanold's Jacobsthal paper is Math. Ann. **170** (1967) 314–326, not the 1965
Math. Ann. 157 paper, which is a different work.

**§8's "VERDICT: SAFE".** SCOPED at the point of use. It now reads "SAFE
against the construction side", the qualifier §9 already carried one section
later and that `G2-STATE.md`'s copy carried inline. Found by the `transfers`
check on the near-duplicate pair, which is what that check exists for.

**Brief-response framing.** §0's "the honest doubt", §1's "Correction to the
briefing" and §4a's quotation of the briefing RETIRED. Every mathematical
statement in them is retained as a statement of fact.

### research/PRIOR-ART.md

**"Phi(x,y) < 6x/log y for y <= x" (Fan and Pomerance).** WRONG in two
independent ways in one formula. The source's abstract, from the LaTeX via the
arXiv API, reads **"Φ(x,y) < .6x/log y when y ≤ √x"**. A dropped decimal point,
which made the theorem ten times weaker than it is, and a dropped square root,
which made the corpus claim a range twice as wide as the theorem covers. The
venue the corpus gives, J. Number Theory 254 (2024), is CORRECT. The same error
stands at `paper/staircase-note.md`:444, which partition C owns.

**"e^{2γ}/4 ≈ 0.7935".** RETIRED. `e^{2γ}/4 = 0.7930547…`, so 0.7935 is not a
rounding at any precision. Now 0.7931. This was the only site in the corpus
carrying 0.7935.

**"Iwaniec … see Erdős Problem #687" for the h(k) form.** WRONG cross-reference,
confirmed by reading both pages in full. #970 carries the `h(k) ≪ (k log k)²`
form and says of itself "This is a more general form of the function considered
in [687]"; #687 carries the `Y(x) ≪ x²` form and the $1000. Both are now named
for what each holds. The row's "constant unknown" is reworded to "inexplicit",
because neither page's text says the constant is unknown.

**"cited by Holt in 1402.1970", and the whole §"What 1402.1970 does have".**
arXiv:1402.1970, *On Polignac's Conjecture*, is **Holt AND Rudd**. The section
attributed its findings to "he" throughout. Corrected to Holt and Rudd; the
corpus's other three sites are in partitions A, C and G.

**Táfula's "missing the constant by 4e^{−2γ}" inside quotation marks.** It is a
paraphrase: the source reads "missing its constant only by a factor of
4e^{−2γ}". Restated without the quotation marks. Same for the Cheer–Goldston
"Maier used this result…" sentence, which silently deletes "has recently" from
inside a quotation; the paraphrase is now marked as one, and the *other*
Cheer–Goldston quotation on the line above is verbatim and stays.

**Táfula's date "(2015/2020)": CORRECT AS WRITTEN, and now unambiguous.**
arXiv:1508.05702 has v1 2015-08-24 through v5 2019-08-28 and no 2020 version,
but the paper was published in São Paulo J. Math. Sci. in 2020. Both halves are
right and the file now says which is which. Recorded so nobody "fixes" it.

**"twin-Legendre (OEIS A192870)".** IMPRECISE. A192870 is the n-tuplet
generalisation, whose n = 2 entry is the twin case; the twin-specific sequences
are A091591/A091592, which the corpus cites correctly elsewhere.

**"periodicity remarked by H.J.S. Smith (1857, per Dickson's *History*)":
CONFIRMED, and the citation is now primary.** The date was flagged as
suspicious because Smith's *Report on the Theory of Numbers* ran 1859–1865 and
his arithmetical-determinant paper is 1875/76. Dickson vol. I settles it and
cites the same paper twice:

- p. 439, "Diatomic Series": after deleting the multiples of 2, 3, …, p the
  survivors "form a periodic series of period 2·3…p; and similar theorems.
  **Like remarks had been made previously by H. J. S. Smith.**"
- p. 436: "**H. J. S. Smith gave a theoretical method of finding the primes
  between the xth prime P_x and P²_{x+1}, given the first x primes.**"

Footnote in both places: **Proc. Ashmolean Soc. 3 (1857) 128–131; Coll. Math.
Papers I, p. 37.** So the 1857 date is right, and the paper is a stronger prior
art item than the corpus recorded: the second entry is the zone (p, p′²) and
the p²-rule, stated as a method, in 1857. Added to the crystallization row.

**"Mirror/palindrome of the wheel — never foregrounded as an organizing
device".** WEAKENED on the same source. Dickson vol. I p. 439 records A. de
Polignac's "diatomic series" (Comptes Rendus Paris 29 (1849) 397–401; Nouv.
Ann. Math. 8 (1849) 423–9) as periodic with φ(πₙ) terms and with "the terms
after 1 of the period … symmetrically distributed (two terms equidistant from
the ends are equal)". The palindrome and the census, stated together, in 1849.
The claim is narrowed to the *use* as an organizing device. **This is a
novelty-verdict change and is flagged for Chris.**

### research/theta-ladder.md

**"Run 2026-08-17. Brief: TODO item 00, feeding TODO item 0."** and the
eighteen sites where "the brief" or "TODO 00" is the grammatical subject.
MIGRATED to statements of fact. Nothing mathematical changed. The superseded
estimates that were being corrected are retired with them: TODO 00's
"z = 31 took 65.3 s" against the measured 36.7 s, and TODO 00's costing
"z = 59 is 1 to 2 h, z = 71 several hours, z = 100 is days" against the measured
z = 59 ≈ 5 h and z = 71 ≈ 36.5 h. Both corrections had already been applied to
`TODO.md`:71-72 and logged at `CHANGELOG.md`:276-277; the measured cost table
stays in §9 under a plain "**Cost.**" heading.

**"`research/ZONE-POSTULATE.md` §5 ('a second sighting worth watching')".**
Dead quotation; that phrase is no longer in ZONE-POSTULATE §5. Replaced by what
the pointer is actually for.

**Conditional-theta caveat discipline.** Every place a reader meets the
conditional column now carries, at the point of use, that it rests on an
**unproven** Gaussian maximal law for the sawtooth: §0's definition, §0's
headline answer, §2's table, and §6's "the conditional column agrees and more
loudly". §5b's exact column is marked as the one that owes nothing to it.

**"the null 2 + ⟨2/ln lnW⟩ = 2.649" at §3.** Kept and now named. That 2.649 is
an empirical regression null and is a numerical near-coincidence with the
unrelated vector-sieve threshold `1+√e = 2.6487` discussed in §7; the file now
says so where the collision occurs.

**§7's Lemma V paragraph.** Repointed at the home: `sift-limit-attack.md` §§3
and 4.5 is the authority for "Lemma V is not the operative assumption at the
measured working point". The TODO 0 statement it derived is already applied to
`TODO.md`:63-66 and is now stated as fact rather than as a correction to carry.

### research/sift-limit-attack.md

**The Lemma V calibration.** No claim changed. The file is the home and the
authority for the fact that Lemma V is not the operative assumption at the
measured working point and the Gaussian maximal law is, and it now says so in
those words, because `GLOSSARY.md`, `theta-ladder.md`, `TODO.md` and
`G2-STATE.md` all point here for it. The conditional column's introduction
gains the word **unproven**.

**The FKMPT citation** gains the corrigendum and the version, matching
`covering-dive.md`.

**§3's discard-map row "Fusion / anchored calm (PROVEN (i),(ii); MEASURED
(iii),(iv), cap-19/23/26)".** STALE in the conservative direction, which is the
rarer kind: it graded as MEASURED a leg that is a certified theorem. The row now
names the five PROVEN objects (Mirror-Sibling Identity, Fusion Identity,
Mirror-Phase Doubling, Minus-Half, Skeleton Collapse), the Aggregate
30-Skeleton Bound as **CERTIFIED at six levels @11..@29 as an exact integer
inequality**, and the Anchored Typicality Measurement as MEASURED, and points at
the new status-only parent `research/anchored-calm.md` rather than at the three
cap-files whose competing status tables partition F retired. Understating our own
result is still a defect. Handed over by partition F.

### research/dhr-verification.md

**The file was a spent audit whose every quoted claim had been fixed, and
`research/history/staging/audit-campaign.md`:11 lists it as "Clean, no change
needed".** All seven of its §6 recommendations were applied to
`paper/beta2-note.md` before this pass, so its §0 table asserted as live claims
of that note six statements the note no longer makes (verified applied 7/7
again here, against the note's current text).

**Decision: the file STAYS in the body, brought current, rather than moving to
`history/`.** Its §§1–5 and §7 are the primary-source ledger for β₂ and DHR
Theorem 9.1 — the corpus's most load-bearing external chain — and
`research/sift-limit-attack.md`:58 and :412 cite it live for exactly that.
Nothing in it is superseded: the sources still say what they say. What died was
the framing. It now opens with a dated **APPLIED / OUTSTANDING** line, its §0
column reads "Claim as originally drafted", and §6 becomes "The seven edits
this audit produced, all since applied". This is the first instance of the
convention `qc-refs` §8.5 proposes for audit files, and it is the cheap fix for
the whole class.

**And a staleness no report caught, running the other way.** §0 item 1e and §5
told a reader the Diamond–Halberstam book (Cambridge Tracts 177) was
lending-locked and that the literal hypothesis block of Theorem 9.1 was the
single remaining unverified step in the corpus's most load-bearing citation.
`paper/beta2-note.md`'s status header records that the book has since been
obtained and read line-level, with page numbers — Theorem 9.1 at pp. 103–112
carrying exactly the `2·Σ 4^{ν(m)}|r_A(m)|` remainder and the
`(log y)^{1/(2κ+2)}` error this file predicted from Franze–Kao; Ω(κ)'s working
product form (5.2) at p. 44; Theorem 6.1 at pp. 67–68; **β₂ ≈ 4.266 in print at
p. 79**; α_κ ≥ β_κ+1 at p. 77. Every prediction this file's triangulation made
was borne out. §0 item 1e is now **CLOSED**, §5 is retitled and records what
the book settled, and the source ledger's "lending-locked — NOT verified
line-by-line" row is corrected. Two documents disagreed about whether the
corpus's central citation had been verified against its primary source, and the
one that said no was the audit trail the other one names.
