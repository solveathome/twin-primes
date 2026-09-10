# Wave 2, partition E — applied

<!-- ledger
id: Q-applied-wave2-E
status: ANSWERED
todo: none
question: Which wave-2 partition E corrections were applied, and to which files?
verdict: Seven jobs applied across covering-dive, two-class-lower-bounds, PRIOR-ART, sift-limit-attack, theta-ladder, maxgap-law and dhr-verification, with refs and quotes at 0 in this partition before and after; one novelty verdict in a publication-track file is weakened by de Polignac 1849 and flagged for Chris.
-->

Seven files: `covering-dive.md`, `two-class-lower-bounds.md`, `PRIOR-ART.md`,
`sift-limit-attack.md`, `theta-ladder.md`, `maxgap-law.md`,
`dhr-verification.md`. Nothing outside them was edited. Changelog entries are in
`research/history/staging/changelog-add-E.md`.

## qc.js, before and after

| check | before | after | note |
|---|---|---|---|
| refs | 7 | 4 | my files: 0 before, 0 after |
| quotes | 1 | 1 | the one before was `maxgap-law.md`:502, **fixed**; the one after is `research/qc/README.md`:36, the framework's own documentation of that catch — see Handoffs |
| crosslinks | 0 | 0 | |
| scripts | 2 | 2 | neither is mine |
| transfers | 12 | 13 | the three pairs touching my files were all present at baseline and are adjudicated below; the +1 is three new `U-FRAME.md`:260 pairs from other partitions, minus two of theirs that closed |
| **TOTAL** | **22** | **20** | |

**My partition's refs and quotes findings are zero.** The counts moved under me
throughout, since six other appliers were live; the refs drop from 7 to 4 is
partition A's `origin-excess.md` §6c work, not mine.

---

## JOB 1 — the FKMPT constant is 6. Stated in full.

**Applied to `covering-dive.md` §Q2.3 and `two-class-lower-bounds.md` §2a in one
pass, as required.**

I did not take this on the report's authority. The four arXiv PDFs from wave 1
were still in the session scratchpad, and I read Theorem 1 out of each:

| version | dated | Theorem 1's numerator | stated lower bound | C(1/2) in its own text |
|---|---|---|---|---|
| v2 | 2019-08-16 | `(4 + δ)·10^{2δ}` | `C(ρ) > e^{−1−4/ρ}` | — |
| v3 | 2021-06-23 | `(4 + δ)·10^{2δ}` | `C(ρ) > e^{−1−4/ρ}` | **1/6001** |
| **v4** | **2022-09-19** | **`6·10^{2δ}`** | **`C(ρ) > e^{−1−6/ρ}`** | **1/325565** |

**Three pieces of evidence beyond what the report had.**

1. **`1/325565` is the paper's own printed figure, not our arithmetic.** v3
   prints `1/6001` at its (1.7)/Corollary 2 and v4 prints `1/325565` in the same
   places. `qc-refs` W1b solved the sup numerically and got the same number,
   which is a good independent check, but the corpus can now cite the paper for
   it rather than a computation.
2. **v4 carries the corrigendum inside it, as Appendix A**, headed "CORRIGENDUM:
   CHANGES MADE FROM THE PUBLISHED VERSION". It names the cause — "errors in the
   exponents of H in the deduction of Theorem 2 from Theorem 3 … force the
   parameter M to be somewhat larger than claimed, namely M > 6" — credits
   Mikhail Gabdullin, and enumerates the changes. Item (1): "In Theorem 1, the
   definition of C(ρ), the factor 4 + δ corrected to 6. Likewise, the corrected
   lower bound is C(ρ) > e^{−1−6/ρ}." Item (4): "In (1.7) and Corollary 2, the
   corrected bound is C(1/2) > 1/325565." Item (2), for completeness: C(1) > 1/835.
3. **The published corrigendum's bibliographic details, verified at the
   publisher:** *Corrigendum: Long gaps in sieved sets*, J. Eur. Math. Soc. **25**
   (2023), no. 6, **2483–2485**, DOI **10.4171/JEMS/1305**. It appeared nowhere
   in this repository. Both files now cite it.

**Direction check:** 4 → 6 weakens the bound, since e^{−1−6/ρ} < e^{−1−4/ρ} —
the ordinary shape of a corrected error, and the opposite of what my brief said.
The figure standing in the corpus was **54× too generous**. The qualitative
claim survives: the passage needs only `C(1/2) > 0`.

**Why this changed twice, recorded in the changelog so it does not change a
third time.** The corpus originally carried 6. An earlier audit wave judged the
6 stale, moved `covering-dive.md`:59 to 4, and wrote its confidence into
`audit-campaign.md`; every later pass inherited it, including the wave-1 brief
and mine. Both files now state the version they quote and cite the corrigendum,
so the next reader meets the version question before the number.

**Also applied, resolved:**
- `covering-dive.md`:58's "v3, dated 2024-12-03" matched no version. The file now
  cites v4 throughout with its correct date.
- `[7]` → `[7 = Halberstam–Richert, Cor. 2.4.1]`, editorial brackets marking the
  expansion inside a quotation labelled verbatim. Confirmed from the PDFs that
  entry [7] is verbatim "H. Halberstam and H.-E. Richert, *Sieve Methods*,
  Academic Press, London, 1974" in v2, v3 and v4, and a different work in v1.
  `two-class-lower-bounds.md`'s bare `[7]` gains the version numbering.
- Remark 7 diffed across v3 and v4: **byte-identical**, and Remark 8 in v2. Both
  files now say so, so the version split there is explained rather than latent.
- `sift-limit-attack.md` §4.4's FKMPT citation gains the corrigendum and the
  version, so all three of my files that cite the paper agree.

---

## JOB 2 — the "do not re-check this" block, re-checked

`maxgap-law.md` §10 item 4. Verified against `arXiv:1412.5029` (the wave-1 PDF,
re-read here), corrected, and *then* relocated into §7, honouring the sequencing
constraint.

- **Leg 1, the Maier–Pomerance quotation: CORRECT, verbatim.** FGKMT p. 4.
- **Leg 2: WRONG.** `Y(x) = j(P(x)) − 1` is **eq. (1.3)**, not 1.2. `Y` is their
  **Definition 1**, quoted here from the PDF: "Define Y(x) to be the largest
  integer y for which one may select residue classes a_p mod p …".
- **Leg 3: WRONG, and it understated FGKMT by a factor log₂x while crediting the
  weaker form to them.** Their (1.2) is `Y(x) ≫ x log x log₃x/log₂x`, a single
  power. The squared form is **Rankin's**: FGKMT print it only in "This improves
  on the bound Y(x) ≫ x log x log₃x/(log₂x)² obtained by Rankin [37]". The "for
  any R" quantifier is not theirs either — their Theorem 1 is
  `G(X) ≫ log X log₂X log₄X/log₃X` and the PDF adds "The implied constant is
  effective."

**The conclusion survives**, which is why the fix says so in the same breath:
with the correct bound the ratio to the random-dart level `e^γ x log x` is
`log₃x/(e^γ log₂x) → 0`. `maxgap-law.md`:391 carried the same misattribution and
is corrected with it; `:52` and `:390` were already right, attributing the
squared form to Rankin.

**The block keeps its usefulness**: it now says what was checked, against which
version, and on what date, which is the only form in which "so nobody re-checks
it" is safe.

**A second defect inside the same block, resolved by re-research rather than by
choosing.** `maxgap-law.md` §6 quotes Ford's slides verbatim as read;
`covering-dive.md`:127 said the slides were "not located in this dive". I located
them: Kevin Ford, *Large gaps between primes*, Talks 1–3, CRM Montreal workshop
*Probability in Number Theory*, 2018,
`ford126.web.illinois.edu/montreal_talk{1,2,3}_primegaps.pdf`. Talk 1's slide
"Proving large gaps: Jacobsthal's function" carries both quoted statements one
line apart, word for word as `maxgap-law.md` reports — **and independently
corroborates leg 3 from a second source**, printing "Lower bound (FGKMT, 2018).
J(T) ≫ T log T log₃T/log₂T" with the single log₂T. It also verifies
`two-class-lower-bounds.md` §2c's `T(log T)^{1+c}` under uniform
Hardy–Littlewood. All three files now carry the citation.

---

## JOB 3 — Fan–Pomerance

`PRIOR-ART.md`:383. Verified from the arXiv API's LaTeX abstract (the saved
`fp.xml`): **"Φ(x,y) < .6x/log y when y ≤ √x"**. Two independent errors in one
formula, and they do not cancel: `6` for `.6` makes the theorem ten times weaker
than it is, and `y ≤ x` for `y ≤ √x` claims a range twice as wide as the theorem
covers. Fixed, with both errors named in the file so the next reader sees them.
The venue, J. Number Theory 254 (2024), is correct and stays.

**Handoff:** `paper/staircase-note.md`:444 carries the identical error and is
partition C's.

---

## JOB 4 — dead quotations

Every instance in my files, applied:

| id | site | disposition |
|---|---|---|
| D1–D6 | `dhr-verification.md` | see the decision below |
| D9 | `maxgap-law.md`:502 | `~1.2 x ln²x` → `≈ 1.2 x ln²x`, the target's own symbol; the row's whole point is that the law must not be read as an asymptotic, and the tilde inverted it. Clears the qc `quotes` finding. |
| D12 | `two-class-lower-bounds.md`:119-124 | the discrepancy note whose three clauses had all gone wrong. Replaced by the settled statement (Job 1). |
| O4 | `theta-ladder.md`:692-694, 710-724 | both TODO 00 costing blocks; measured cost table kept, comparisons against the retired estimate removed |
| O6 | `theta-ladder.md`:5, `two-class-lower-bounds.md`:655 | "a second sighting worth watching" — grepped, absent from `ZONE-POSTULATE.md`; only these two sites carried it, both mine, both now state what the pointer is for |
| O7 | `two-class-lower-bounds.md` §10 item 3 | `covering-dive.md` §Q4.2's "realistic target 4" question — neither "c·p²/log" nor "realistic target" is in that file. Its mathematics moved to §6. |
| O8 | `two-class-lower-bounds.md` §10 item 4 | U-FRAME's "comfortably below the critical 2" — `U-FRAME.md`:535 now reads "1.62 in the theta frame and 1.924 against x". Verified at both ends. |
| O11 | `maxgap-law.md` §10 items 1-3 | three paid debts stated as outstanding; verified all three paid at their targets |

**`dhr-verification.md`: decision and reasoning.**

I kept it in the body and brought it current, rather than converting it to a
short record with the detail in history. Three reasons:

1. **Its §§1–5 and §7 are not spent.** They are the primary-source ledger for β₂
   and DHR Theorem 9.1, the corpus's most load-bearing external chain, and
   `sift-limit-attack.md`:58 and :412 cite it live for exactly that. Nothing in
   them is superseded — the sources still say what they say. Only the framing
   died.
2. **The convention supports it.** A working document states current
   understanding; what this file currently understands is "here are the sources,
   here is what they say, and all seven recommendations are applied". That is a
   present-tense statement needing a heading change and an APPLIED line, not a
   relocation.
3. **It implements `qc-refs` §8.5's proposed convention as its first instance**
   — an audit file opens with a dated APPLIED / OUTSTANDING line — which is the
   only finding in that report that prevents the class rather than fixing it.

**And a staleness in it that no report caught, running the opposite way to
D1–D6.** §0 item 1e and §5 told a reader that the Diamond–Halberstam book was
lending-locked and that the literal hypothesis block of Theorem 9.1 was the
single remaining unverified step under the corpus's central theorem.
`paper/beta2-note.md`'s status header records that the book **has since been
obtained and read line-level**, with page numbers: Theorem 9.1 at pp. 103–112
carrying exactly the `2·Σ 4^{ν(m)}|r_A(m)|` remainder and the
`(log y)^{1/(2κ+2)}` error that this file predicted from Franze–Kao; Ω(κ)'s
working product form (5.2) at p. 44; Theorem 6.1 at pp. 67–68; **β₂ ≈ 4.266 in
print at p. 79**; α_κ ≥ β_κ+1 at p. 77. Every prediction the triangulation made
was borne out. Item 1e is now CLOSED, §5 records what the book settled, and the
source ledger row is corrected. Two documents disagreed about whether the
corpus's central citation was verified against its primary source, and the one
saying no was the audit trail the other one names.

I also re-verified all seven recommendations landed, independently of the report,
by grepping `paper/beta2-note.md` for each: 4.26645 + Booker–Browning + 4.516 at
:62/:88-94; Galway/Richert at :78-80; 8^ν and log⁷ at :183/:267; z = pₙ+1 at
:121-123; s ≥ 9κ+1 = 19 at :285-287; the status header at :3-5. **7 of 7.**

**`maxgap-law.md`:502 versus `two-class-lower-bounds.md` §8 — my brief is wrong
here and it matters.** The brief says "that file contains no 1.2 at all" and
"the measured constant on the record is c ~ 1.90". Neither is right:
`two-class-lower-bounds.md` states `≈ 1.2 · x ln²x` at :445 and again in §8's
table, so the reference resolves and the number agrees; the only defect was the
relation symbol (D9). And **1.90 is a constant for h₂, Ziller–Morack's
free-choice object, not for G₂**, which is what §8's row is about. The two
objects differ by roughly a factor 1.7 and conflating them would have put a
wrong number into the home document. Checked before writing, as the brief asked.

**Which turned up a genuine cross-file disagreement, in two files I own.**
`covering-dive.md`:108 attributed to `two-class-lower-bounds.md` §6 "the measured
growth of h₂ over all 21 exact terms is c·x·ln²x with **c ≈ 1.90**". §6 gives
2.04 for h₂, not 1.90. I computed the ratio from the exact A288815 terms:
h₂/(x ln²x) is **not constant** — it runs 1.04 at x = 11 up to 1.95 at x = 73,
mean 1.63 over all 21 terms, OLS-through-origin 1.81. So 1.90 is roughly the
top-of-ladder value and is not a 21-term measurement, and §6's 2.04 is the
Poisson-form coefficient, a different estimator. `covering-dive.md` now states
the trend with the level attached and attributes §6's number to §6. **1.90 is
preserved as a figure**, correctly scoped; nothing was deleted.

---

## JOB 5 — attribution

**arXiv:1402.1970 is Holt AND Rudd.** My brief and `qc-refs` W8 both list four
sites; there are **more than four**, and two of the extra ones are mine:

- `two-class-lower-bounds.md` §7 was titled "Holt's driving terms", opened
  "`arXiv:1402.1970` §4 gives …", and said "He concludes", "cleaner than Holt's",
  "in Holt's hands" — while the same file's §11 correctly credits "the
  driving-term mechanism (Holt and Rudd)". An in-file inconsistency. Fixed.
- `PRIOR-ART.md` §"What 1402.1970 does have" attributed the whole section to "he"
  ("He records", "He also gives", "**He proves no upper bound**") and labelled a
  table column "h(x#), one class (**his**)". Fixed, with the joint authorship
  stated at the top of the section. `PRIOR-ART.md`:378's "cited by Holt in
  1402.1970" fixed.

W8's grep keyed on the word "Holt" next to the arXiv id, which is why prose that
names only the id, or that says "he" a paragraph later, was missed. Worth knowing
for the remaining sites.

**FGKMT → FKMPT verification.** Confirmed the distinction is right in all my
files: arXiv:1802.07604 is Ford, Konyagin, Maynard, **Pomerance**, Tao (Remark 7
belongs here), and arXiv:1412.5029 is Ford, **Green**, Konyagin, Maynard, Tao
(the JAMS 2018 large-gaps paper, eq. 1.2/1.3, Theorem 1). Zero wrong sites in my
seven. **One residual "FGKMT Remark 7" survives corpus-wide**,
`research/attack2-rankin2d.js`:467 — the two `paper/` sites the brief mentioned
have already been fixed by partition C.

---

## JOB 6 — caveat discipline and the Lemma V authority

**Conditional theta.** The site `qc-numbers` Q6.2 names is `G2-STATE.md`:692-694,
which is partition A's, not mine — a small correction to the brief. But the
principle applies to my files and I applied it at every point of use in
`theta-ladder.md`: §0's definition of the quantity, §0's headline answer, **§2's
table** (a new line under the table, since that is where a reader meets the
column), and §6's "the conditional column agrees and more loudly" all now carry
that the column rests on an **unproven** Gaussian maximal law. §5b is marked as
the column that owes nothing to it. `sift-limit-attack.md`'s summary gains the
same word.

**Lemma V, per `qc-status` A-1.** `sift-limit-attack.md` was already correct and
detailed on this at three places; it now says in terms that **it is the home and
the authority** for the fact that Lemma V is not the operative assumption at the
measured working point and the Gaussian maximal law is, because four other
documents point here for it. `theta-ladder.md` §7(ii) repoints at that home
instead of restating it as a correction to carry into TODO 0.

**I2, the 2.649 collision**, also applied: `theta-ladder.md` §3's regression null
`2 + ⟨2/ln lnW⟩ = 2.649` is now named as an empirical null and as a numerical
near-coincidence with the unrelated vector-sieve threshold `1+√e = 2.6487` of §7.

---

## JOB 7 — history migration

**`two-class-lower-bounds.md` §10 "Corrections logged" (37 lines).** Migrated,
and **§10 is repurposed rather than deleted**, which is a deliberate improvement
on the report's plan. `ZONE-POSTULATE.md`:150 cites "§10" of this file for the
climbing certificate ladder. The report's plan (move item 5 into §5, delete §10,
renumber §11→§10) would have broken that pointer and required an edit in
partition D's file. Instead §10 now holds item 5's surviving content under
"The certificate ladder, and how far it can be pushed", so the inbound pointer
resolves to exactly the claim it wants, §§11-12 keep their numbers, and no
renumbering happens anywhere. Item 3's mathematics moved into §6; items 1, 2 and
4's content was verified already present in §§1, 4b, 5, 8 before deletion.

**Correction to `qc-history`:** it warns that "`ZONE-POSTULATE.md`:150 and
`research/G2-STATE.md` both cite '§10' of this file". G2-STATE does not — it
cites §§1, 3, 4b, 5, 6, 7 and 9. Enumerated all inbound section pointers; only
ZONE-POSTULATE cites §10.

**`maxgap-law.md` §10 (27 lines).** Items 1-3 are the three paid debts; each was
checked at its target before deletion. Item 4 is the durable source check, which
**`qc-history` O11 correctly ruled must stay** — corrected first (Job 2), then
relocated into §7 beside the Maier–Pomerance discussion. Section removed and
§§11, 12 renumbered to 10, 11, after verifying that no document in the corpus
cites `maxgap-law.md` §10 or past it (the highest inbound reference is §9). This
is the condition `qc-history` U7 sets for renumbering, tested rather than assumed.

**`theta-ladder.md`'s two costing blocks (17 lines).** Reading 13 and §9's
"CORRECTION TO TODO 00's COSTING". The measured cost table stays in §9 under a
plain "**Cost.**" heading; every comparison against the retired estimate goes.
Both retired estimates were already applied to `TODO.md`:71-72 and logged at
`CHANGELOG.md`:276-277, so nothing is lost. The corpus body now contains no
occurrence of the retired "65.3 s".

**The whole brief-response problem in both files.** All 18 sites in
`theta-ladder.md` and all 7 in `maxgap-law.md` where "the brief" or "the
briefing" or "TODO 00" is the grammatical subject are now statements of fact.
Grep for "the brief", "briefing" and "TODO 00" in both files returns nothing.
**Every block was checked for VERIFIED content that must stay**: the VERIFIED and
REFUTED reading labels are preserved (readings 1, 2, 6, 8, 10 in theta-ladder;
READING 3 and READING 7 in maxgap-law), as is `maxgap-law.md` §9's
SAFE/REFUTED/UNAFFECTED scoping table, which `qc-history` flags as
history-adjacent and is not.

---

## The SUSPICIOUS bucket (S1–S7): dispositions

| # | claim | disposition |
|---|---|---|
| **S1** | "H. J. S. Smith (1857)" — the year does not fit the man's bibliography | **CONFIRMED, and upgraded to a primary citation.** Fetched Dickson's *History* vol. I in full text. It cites the same Smith paper twice: p. 439 (Diatomic Series) — after deleting the multiples of 2, 3, …, p the survivors "form a periodic series of period 2·3…p; and similar theorems. **Like remarks had been made previously by H. J. S. Smith**"; and p. 436 — "**H. J. S. Smith gave a theoretical method of finding the primes between the xth prime P_x and P²_{x+1}, given the first x primes.**" Footnote in both places: **Proc. Ashmolean Soc. 3 (1857) 128–131; Coll. Math. Papers I, p. 37.** The date is right. `PRIOR-ART.md` now carries the primary citation, and the p. 436 entry is added to the crystallization row, because a method for the primes between P_x and P²_{x+1} **is** our zone, in 1857. |
| **S2** | "the 'unknown constant' flagged at Erdős #970" | **CONFIRMED as a wrong attribution.** Read #970 in full: it says "Iwaniec [Iw78] proved h(k) ≪ (k log k)²" and gives the FGKMT lower bound; it contains no flag about the constant. The *fact* is standard and true. `covering-dive.md`:15 and :143 now state it without hanging it on the page, and point at MO 245539, where the explicitness question is actually raised. |
| **S3** | two paraphrases presented as quotations in `PRIOR-ART.md` | **CONFIRMED, both fixed.** Táfula's "missing the constant by 4e^{−2γ}" (source: "missing its constant only by a factor of") and Cheer–Goldston's "Maier used this result…" (source: "Maier **has recently** used this result…"). Both restated outside quotation marks. The *other* Cheer–Goldston quotation on the line above is verbatim and is now marked as such. |
| **S4** | Táfula's year range "(2015/2020)" | **REFUTED as a defect — correct as written.** arXiv:1508.05702 has v1 2015-08-24 through v5 2019-08-28 and no 2020 version, but the paper was **published in São Paulo J. Math. Sci. in 2020**. Both halves are right. The file now says which is which, so nobody "fixes" it. |
| **S5** | `covering-dive.md`:16's "both … state verbatim" half-checked | **CONFIRMED CORRECT on the unchecked side.** Fetched arXiv:1408.4505 and read it: FGKT p. 4 carries "The best upper bound known is Y(x) ≪ x², which comes from Iwaniec's work [23] on Jacobsthal's function", word for word identical to FGKMT's except the reference number ([23] vs [26]). The file now records that both sides are checked and marks `[Iw78]` as the editorial expansion of each paper's own marker. |
| **S6** | `covering-dive.md`:29's Iwaniec Lemma 1 reconstruction, and :126's "possible error/typo" | **UNVERIFIABLE, and now calibrated in place.** Iwaniec 1978 is still not obtainable (De Gruyter 202, Sciendo 404, re-attempted). The file's §"Caveats on sourcing" now states explicitly that the *statement* is confirmed from four independent published sources while only the *proof* is unread, so every claim about the paper's **internals** — Lemma 1 and the possible typo — rests on Granville plus one MathOverflow post and should be read at that calibration. `paper/PAPERS.md`'s "contested" is partition C's. |
| **S7** | "A192870 (twins between squares)" | **CONFIRMED as imprecise.** A192870 is the n-tuplet generalisation whose n = 2 entry is the twin case; the twin-specific sequences are A091591/A091592. `PRIOR-ART.md`:19 fixed. `oeis-G2-submission.md`:82 is another partition's. |

### Beyond the bucket: one novelty verdict weakened, and Chris should see it

Hunting S1 in Dickson turned up prior art for a second row. Dickson vol. I
p. 439 records **A. de Polignac's "diatomic series"** (Comptes Rendus Paris 29
(1849) 397–401; Nouv. Ann. Math. 8 (1849) 423–9) as periodic with φ(πₙ) terms
and with "the terms after 1 of the period … **symmetrically distributed** (two
terms equidistant from the ends are equal), while the middle term is 3". That is
the palindrome and the census, stated together, in 1849. `PRIOR-ART.md`'s mirror
row said "Never foregrounded as an organizing device" and cited only a Wikipedia
line; it is now narrowed to claim the *use* as an organizing device rather than
the observation. **This is a novelty-verdict change in a publication-track file
and is flagged for a decision rather than treated as settled.**

---

## Also applied from the reports, in my files

- **W7** (`qc-refs`'s second-worst finding), two of its six sites are mine and
  the report requires all six to move together:
  `two-class-lower-bounds.md` §9's "LOOSE END … Kanold, Stevens, or Paseman, all
  of which give exponent 2 + ε with stated constants" is CLOSED with the finding,
  and `covering-dive.md`:17's attribution is moved to Vaughan 1977. Read off
  Paseman's own §1: Kanold `2^{√k}`, Stevens `k^{Θ(log k)}`, Paseman
  `k^{O(loglog k)}` — none is exponent 2. **The difficulty floor under route A
  stands rather than collapsing.** Matches the wording partitions A (G2-STATE
  §§5, 9) and D (TODO 000b) applied; I checked A's text against mine and they
  agree in substance and in every figure.
  Bibliography fixed in the same line: Kanold's Jacobsthal paper is Math. Ann.
  **170** (1967) 314–326; the 1965 Math. Ann. 157 paper is a different work.
- **W4 / `qc-numbers` Q3.1:** `PRIOR-ART.md`:20's `e^{2γ}/4 ≈ 0.7935` → 0.7931.
  0.7935 is not a rounding of 0.7930547 at any precision, and this was the only
  site in the corpus carrying it.
- **I1:** `PRIOR-ART.md`:22's Erdős #687 → #970 for the h(k) form, verified by
  reading both pages in full. #970 says of itself "This is a more general form of
  the function considered in [687]"; #687 carries `Y(x) ≪ x²` and the $1000.
- **U1:** `covering-dive.md`:156's Iwaniec caveat upgraded, per `qc-refs`'s
  recommendation, to say the statement is confirmed four ways and only the proof
  is unread — a much smaller residual than the old wording implied.
- **`qc-compound`'s row**, handed over by partition F mid-task:
  `sift-limit-attack.md`:159 graded a certified theorem as MEASURED and pointed
  at three cap-files whose status tables F retired. Row rewritten against
  `research/anchored-calm.md`'s table, naming the five PROVEN objects, the
  Aggregate 30-Skeleton Bound as CERTIFIED at six levels @11..@29, and the
  Anchored Typicality Measurement as MEASURED.
- **`PRIOR-ART.md`'s Erdős 1962 entry** gains a note that it is distinct from the
  [Er65b] source #970 lists, so a later consolidation does not merge them.

---

## What I left, and why

- **`covering-dive.md` §Q3 and §Q4's covering-systems content, and the Door 5 /
  KKL question.** `qc-papers2` P-11 is about how much `paper/moire-primes.md`
  claims on the strength of KKL. `covering-dive.md` §3.3 already states the
  theorem correctly, marks our translation [INFERRED], and records that no
  numeric constant is available at s = 2. The home is right; the paper is
  partition C's.
- **`PRIOR-ART.md`'s Zone Equivalence row.** `qc-status` C-3 names this file as
  HOME / AUTHORITY and the instruction "Present Zone Equivalence as a framing
  device, not a result" is already here and correct. The three files that
  contradict it are elsewhere. Left untouched deliberately, and note that Chris
  has an open decision on whether it leaves the proven-spine list at all.
- **All numbers not covered by verified evidence.** The theta ladder, the
  certificate ladder, the c-surface tables, the Poisson constants, the cost
  tables: not one figure was changed. The three numeric changes I made
  (`1/6001` → `1/325565`, `0.7935` → `0.7931`, and the h₂ ratio's scope) each
  rest on a source or an exact computation recorded above.
- **The three `transfers` pairs touching my files**, all present at baseline,
  all adjudicated as non-defects after word-diffing:
  1. `covering-dive.md`:59-65 vs `two-class-lower-bounds.md`:138-147 — the same
     verbatim Remark 7. The only difference is the `[7]` marker, which is now
     explained in both files.
  2. `PRIOR-ART.md`:64-70 vs `U-FRAME.md`:521-522 — the A288815 comment,
     identical and both faithful to OEIS.
  3. `G2-STATE.md`:604-608 vs `two-class-lower-bounds.md`:603-610 — the
     VERDICT: SAFE block. **This one was not a non-defect**: the diff showed
     G2-STATE's copy carried the scope qualifier "against the construction side"
     inline while the home document stated it only in the next section. I
     backported it. The `transfers` check earning its keep, exactly as designed.

---

## Handoffs to other partitions

1. **`paper/staircase-note.md`:444 (partition C).** The same Fan–Pomerance error
   as `PRIOR-ART.md`:383, in a paper draft: `6x/log y for y ≤ x` should read
   `.6x/log y when y ≤ √x`. Verified from the arXiv API's LaTeX abstract.
2. **`research/attack2-rankin2d.js`:467 (partition G).** The last surviving
   "FGKMT Remark 7" in the corpus. Remark 7 is FKMPT's.
3. **`research/qc/README.md`:36 (partition G, or the framework's owner).** Its
   illustrative example quotes the defect it caught — `maxgap-law.md`:502's
   "measured law `~1.2 x ln^2 x`" — which the `quotes` check now flags, because I
   fixed the defect. Either reword to past tense ("`maxgap-law.md`:502 quoted …")
   or, better, exempt `research/qc/**` from the evidence corpus the way
   `history/` and generated files already are, since the framework's own
   documentation citing defects it fixed is a permanent source of self-flags.
   `research/qc/README.md`:35 has the same shape for the `origin-excess` §6c
   example. **This is the corpus's one remaining `quotes` finding.**
4. **`research/history/staging/audit-campaign.md`:11 (whoever merges).** It lists
   `dhr-verification.md` as "Clean, no change needed". It was not, and it has now
   been substantially changed. Strike or annotate the line, or the next pass
   re-clears a file that was not clear. `qc-refs` §8.3 asks for this too.
5. **`research/oeis-G2-submission.md`:82 (partition G).** A192870's crossrefs
   label, same fix as `PRIOR-ART.md`:19 — it is the n-tuplet generalisation.
   Externally visible, in a submission draft.
6. **The other two Holt/Rudd sites**, `research/exponent-control.md`:20 and
   `paper/moire-primes.md`:912 (the bibliography). Note that W8's four-site count
   is an undercount; grep for `1402.1970` and read the surrounding prose for
   "he"/"his", which is how I found two more in my own files.
7. **`research/covering-dive.md` is cited by `paper/beta2-note.md`:54 and
   `paper/moire-primes.md`:569** and its FKMPT numbers have changed. Partition C
   should confirm neither paper repeats the old constant. I grepped: neither
   quotes `C(ρ)` or `1/6001`, so I believe this is clean, but it is C's file.

---

## Unresolved

1. **Iwaniec 1978 remains unread** and is the corpus's most-cited external
   dependency (17 sites). De Gruyter returns HTTP 202 behind Cloudflare, Sciendo
   404s; re-attempted this pass. The *statement* is now triangulated four ways
   and the files say so. Buying the 7-page 1978 paper would close the corpus's
   single largest external risk permanently — `qc-refs` §8.2 makes the same
   recommendation and it is worth acting on.
2. **Vaughan 1977's inner exponent `c` in `g(n) < ω(n)²(log₂ω(n))^c`.** I quote
   Vaughan only as "arbitrarily close to 2", which is verbatim from his p. 329,
   and did not put a number on `c`. `pdftotext` mangles it; two minutes with the
   PDF and human eyes settles it, and it is needed only if anyone wants to quote
   the bound numerically.
3. **The de Polignac 1849 palindrome finding weakens a novelty verdict** in a
   publication-track file. I applied the narrowing because leaving `PRIOR-ART.md`
   asserting something my own source check contradicts is worse, but the judgement
   of how much the corpus still claims for the mirror is Chris's.
4. **The `covering-dive.md` / `two-class-lower-bounds.md` h₂ constant.** I scoped
   1.90 correctly rather than replacing it, because the underlying quantity is not
   constant and the right presentation is a judgement call. Someone may prefer a
   single quoted figure with a stated range; if so, the exact ratios are 1.04 at
   x = 11 rising to 1.95 at x = 73, mean 1.63 over 21 terms.
   `qc-papers2`:1014 quotes `c ≈ 1.90` for the same object in a paper context and
   should be checked against whatever is decided.
5. **`two-class-lower-bounds.md` §10's position.** The section now sits between
   §9 (the caveat) and §11 (what is new), which is not where its subject naturally
   falls; it is there because `ZONE-POSTULATE.md`:150 points at "§10". If a
   later mechanical pass repoints that reference, the section can move beside §5
   where the ladder itself is.
