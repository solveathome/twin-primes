# Audit staging: papers (agent `papers`, 2026-08-17)

<!-- ledger
id: Q-audit-papers
status: ANSWERED
todo: none
question: Are the paper suite and the root README consistent with their research homes?
verdict: Per-file corrections applied across the six paper/ files and README, with a Not fixed section naming what was deliberately left, including the exposition question the Holt attribution raises and one stylistic sentence of Chris's that was left alone.
-->

Files touched: `paper/moire-primes.md`, `paper/beta2-note.md`,
`paper/variance-note.md`, `paper/anchored-note.md`, `paper/staircase-note.md`,
`paper/PAPERS.md`, `README.md` (repo root). No other file edited.

---

### paper/moire-primes.md

**"What is ours is the lens as a system ... the questions were never asked,
because the vocabulary that makes them askable did not exist" (§1), and a §9
prior-art audit with three sweeps and no mention of Holt, Maier or Buchstab.**
REFUTED. Fred B. Holt's programme, about fifteen manuscripts since 2007, holds
a second vocabulary for the same system: the cycle of gaps (our tile), the
R1/R2/R3 fold recursion, fusions (our kills), Theorem 2.3 (our Copying and
Redundancy Lemmas together), N₂(p#) = ∏(q−2) (our census), the transfer matrix
with binomial eigenvectors, and the interval and horizon of survival (our zone
and frontier). Maier owns the tile as a proof technique since 1985; Buchstab
owns the survival curve ω(u), which is the analytic input to Maier's theorem at
exactly our window scale. §9 now opens with the correspondence, the boundary
(he never studies the spacing between consecutive occurrences of the gap 2,
which is G₂, and no upper bound on a maximum gap appears in his corpus), the
G₂/h ratio table, and the warning about his unproved Conjecture 2.1. §1, §2
(Crystallization, Copying), §4 (the Grain) and the abstract now cite it where
they use it, and the "candidate novelties" list is rewritten. Forced by
`research/PRIOR-ART.md`, both 2026-08-17 sections.

**"the worst gap anywhere ... growing like 0.8·p·ln²p" (§8).** RETIRED. The
exponent is not 1. Replaced with the control-corrected reading: raw fit
1.801 ± 0.074 on ten terms, control 1.282 ± 0.008 on 58 terms of an object
whose exponent is 1, corrected central estimate 1.57, practical bracket 1.3 to
1.9, floor 1, exponent 2 disfavoured by the one-sided bias rather than
excluded. Forced by `research/exponent-control.md` §5.

**"no upper bound was published at any exponent ... Paper II drafts the
corresponding first bound ... with its verification status honestly gated"
(§8).** NARROWED and updated. The sieve input is verified, so "drafts" became
"proves"; and the object is now bounded on both sides, G₂ ≥ g pointwise giving
G₂ ≫ x·log x·logloglog x/loglog x, per the audit the first lower bound of any
kind for a two-class Jacobsthal function. Open band stated as (2, 4.2665].
Forced by `research/two-class-lower-bounds.md` §3 and `research/G2-STATE.md` §8.

**"e^{2γ}/4 ≈ 0.7935" (§4).** NUMERICAL ERROR. The constant is 0.79305. The
same section's own trough measurement (0.788) and every other file in the repo
use 0.79305.

**"The seams as hotspots ... its Hardy-Littlewood twin likelihood is boosted by
E(P)" (§8).** NARROWED. The boost is real but its baseline is a random
*position*, and it is exactly the slot-density factor: against a random twin
slot the seam is not enriched at all. A seam position is about 25× more likely
than average to be a slot and no more likely than average to carry a twin
prime. Forced by `research/fold-profile-12-anatomy-survival.js` and the
GLOSSARY correction of 2026-08-17.

**"the anchored tile's z-score diverges (+1.05 → −25.52 across five levels)"
(§8).** SUPERSEDED. Nine certified levels, +1.05 at x = 7 to −22,633 at x = 37.

**"we have computed nine of them, through x = 37 at W = 7.4 × 10¹²" and "the
measured margin at x = 37 is S = 7,998,394,865" (§7A).** SUPERSEDED. Ten
levels through x = 41 at W = 3.04 × 10¹⁴, β from 1.156 to 0.846,
S(41) = 256,725,962,834.

**"Author line TBD" in the header, and no AI-disclosure statement.** The
authorship decision was made 2026-08-14 and PAPERS.md requires the statement in
every paper. Header and disclosure section added.

---

### paper/beta2-note.md

The central claim is correct and survives the audit unchanged:
G₂(n) ≤ C(ε)·pₙ^{β₂+ε} with β₂ = 4.26645028414864191641 (Booker–Browning
rigorous truncation), which is exactly what `research/G2-STATE.md` §3a and the
rest of the repo cite it as. Constant, sieve dimension, remainder form, error
exponent 1/6 and fallback all match their sources.

**"the data track ≈ 0.8 · pₙ · ln²pₙ (exponent 1 + o(1) in pₙ)" and "this
closes it down to (1 + o(1), 4.267]" (§5).** RETIRED, same reason as above.
Replaced with the control-corrected bracket and the open band (2, 4.2665].

**"at the largest computed level (pₙ = 31): 31^{4.26645} ≈ 2.3 × 10⁶; actual
G₂ = 348" (§5), and the eleven-term ladder in §1.** SUPERSEDED. Twelve terms
through 37#, and the sanity check restated at pₙ = 37: bound 4.9 × 10⁶ against
G₂ = 528.

**"No upper bound for G₂ at any exponent appears in the literature" (§1).**
Still true, and now sourced against the full Holt corpus rather than only
`covering-dive.md`; the sentence names his programme and says why it does not
reach the object.

**"The precise dependence of the implied constant on the Ω-condition constants
is part of the outstanding book check in item 1" (§6.3) against item 1's "no
outstanding items".** INTERNAL CONTRADICTION. There is no outstanding check;
the dependence is simply not made explicit in the sources, which is the same
inexplicitness item 4 records for C(ε), and nothing in §3 needs it.

**§7 "What would make this publishable" led with a check that is done.**
Rewritten to the four remaining presentation items plus the new one, folding
in the lower bound so the note brackets G₂ rather than capping it. Erdős 1962,
the one-class ancestor, added to the companion citations. AI-disclosure
statement added.

---

### paper/variance-note.md

§6 and §7 are current: the Var/E drift (0.251 → 0.321 at the zone exponent),
the stable law ln(Var/E) ≈ −(0.24u² + 0.13u), the nine exact diagonal levels
and the 0.611 hypothesis all match `research/G2-STATE.md` and the anchored
note. No claim retired.

**§5 "Relation to prior work" omitted the nearest one-class object.** Holt's
signed discrepancy ΔΦ(x,p) of the p-rough counting function (arXiv:2308.07570)
is that object; added, with the honest note that neither side has been compared
against the other. AI-disclosure statement added.

---

### paper/anchored-note.md

**"the gap to the limit is 60 times the deepest residual" (§11) against §10's
"0.0525, now 87 times the deepest residual".** SUPERSEDED. 60 was the reading
at the fourth residual collapse; the fifth landed at +0.0006. §11 now says 87.

**"our literature dive found no published lower bound of any exponent for a
two-classes-per-prime sifted set" (§9).** AMBIGUOUS after today. The statement
is about the *count* of a sifted set and remains true; the two-class *gap* now
carries a proven lower bound. Disambiguated in place, with the note that
nothing in the gap bound transfers to the count, which is where Assumption A
sits.

**Header revision log, and the retired 0.79325 rounding slip quoted beside the
sharp form in §7.** Removed per the doc convention; the slip stays on the
record in §11, which is the note's designated honesty section.

---

### paper/staircase-note.md

No claim retired. Its K* law (0, 0, 2, 10, 27, 69), its certified floors, its
parity floor 2 and its refutation record all match the current state.

**§9 "Related work" cited no current literature on Φ itself.** Added
Fan–Pomerance (JNT 254, 2024) for the explicit unconditional Φ(x,y) < 6x/log y,
Weingartner (2026) for the error term, and Holt (arXiv:2308.07570) for the
discrepancy, with the honest note that substituting Fan–Pomerance for the
Rosser–Schoenfeld closed form of §6 is a comparison we have not made.

---

### paper/PAPERS.md

**"Paper II (drafted; DHR verification in progress) ... STATUS GATE: does not
leave the house until the DHR statement is verified line-by-line (or the
Fundamental-Lemma fallback substituted with its honest ~18 exponent)."**
RETIRED on both counts. The verification closed 2026-08-14 with no outstanding
items, and the fallback exponent is ~19 (s ≥ 9κ + 1 at κ = 2), not 18. The
entry now also carries the lower bound and a retitled paper.

**Sequencing step 1 was the DHR gate.** REPLACED. The gate that now blocks
publication is the Holt reconciliation: no paper goes out until every borrowed
mechanism is attributed where it is used.

**Paper-grade assessment, dated 2026-08-15.** Items 1, 4 and 5 updated: Paper
II's gate is closed and it gained a second result for free; Paper I is now the
riskiest document in the suite, because a referee who knows the cycle-of-gaps
literature reads §9 first; Paper IV's 2D Erdős–Rankin material is narrowed to
what is actually ours, the two-class accounting and the certified ladder to
x = 4001. The authorship decision and the style rules are untouched.

---

### README.md (repo root)

**"Status (2026-08-15) ... plus the β₂ theorem pending one line-level book
check", and the map entry "(one book-check outstanding)".** RETIRED. The check
closed 2026-08-14.

**"measured at nine levels out to W = 7.4·10¹² and descending 1.156 to 0.853".**
SUPERSEDED. Ten levels, W = 3.04·10¹⁴, 1.156 to 0.846.

**The front door said nothing about G₂, nothing about the exponent gap, and
nothing about the Holt prior art.** Three additions: the status block now leads
with the hard thing (proven exponent 4.26645 against a target of 2, moved by
nobody), states the measured 1.57 with its bracket and its floor, records the
new two-sided bound, and carries an attribution paragraph naming Holt, Maier
and Buchstab. Map extended with G2-STATE.md, history/CHANGELOG.md and ATTACKS3.

---

## Not fixed, and why

- **Em dashes.** `paper/moire-primes.md` carries 99 and `paper/beta2-note.md`
  30, both written before the style rule of 2026-08-14. The other three papers
  are clean. Removing them is a mechanical pass that needs per-sentence
  judgment; it was not attempted here, and it is real debt against
  `paper/writing-style-math.md` §9.1. Chris's official positioning sentence
  contains one and was left alone deliberately.
- **`paper/moire-primes.md` §§2–4 as exposition.** With the Holt attribution
  in place, the question of how much of the spine survives as *our* exposition
  is a writing decision, not a consistency fix. Flagged in PAPERS.md item 4.
