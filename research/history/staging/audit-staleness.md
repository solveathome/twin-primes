# Staleness audit of the live layer against passes 26–48 (2026-08-20)

<!-- ledger
id: Q-audit-staleness
status: ANSWERED
todo: none
question: How much of the live layer is stale against changelog passes 26 to 48?
verdict: Eleven of the nineteen files in scope are clean and eight carry at least one stale sentence (U-FRAME three, G2-STATE two and others), with a separate list of upgrades the live layer has not absorbed; report only, nothing outside the report was edited.
-->

*(Report only. Nothing outside this file was edited. Ground truth: the
twenty-sixth through forty-eighth pass entries of `research/history/CHANGELOG.md`,
plus `research/REFUTED.md`, `research/IMPORT-MAP.md`, `research/PRIOR-ART.md`
and `research/SEARCH-CONVENTIONS.md`. `node research/qc.js` read TOTAL 0 before
and after.)*

Scope swept sentence by sentence: `research/U-FRAME.md`, `research/G2-STATE.md`,
`research/THE-DIALS.md`, `research/sift-limit-attack.md`,
`research/kappa-not-L.md`, `research/operator-and-pair-count.md`,
`research/covering-dive.md`, `research/GLOSSARY.md`, `research/ATTACKS2.md`,
`research/OBSERVATIONS.md`, `paper/PAPERS.md`, and the seven
`paper/proposals/prop-*.md` plus `paper/proposals/PROPOSALS.md`. Five further
live files were pulled in because a swept file pointed at them and the pointer
was stale: `research/ATTACKS3.md`, `research/a3-03-f-from-census.md`,
`research/ZONE-POSTULATE.md`, `research/theta-ladder.md`, `paper/wall-note.md`.

---

## 1. Stale sentences

| file | quoted sentence | superseded by | replacement |
|---|---|---|---|
| `research/U-FRAME.md` §7 item 1 | "multi-kills extinguish (a measured law, four windows, out-of-sample validated" | forty-sixth pass | "multi-kills extinguish (a measured law, five windows and four decades of Y, out-of-sample validated one decade blind at W = 2·10¹¹" |
| `research/U-FRAME.md` §5a step 7 | "it equally contains the 1.451 the 42-point census fit gives, which is why the two are not in conflict" | forty-fourth pass | "it equally contains the 1.4016 of the alias-free recomputation, since the published 42-point census fit was defective from x = 37 (`f-decays.md` header)" |
| `research/U-FRAME.md` §12 | "caps the method at x ≈ 200. The growth law is a fit over 42 exact points, not a theorem." | forty-fourth pass | "caps the CENSUS at x ≈ 200; the deep-window instrument measures f to x = 829, and L_win = 2 at every level 97..829, so a window can measure f but never L. The corrected growth law is a fit over 51 window levels, not a theorem." |
| `research/G2-STATE.md` §0 | "Fifteen routes and claims are closed, listed in §5b" | passes 34, 35, 41 and the rest of the wave | "Fifty routes and claims are closed, indexed one line each in `REFUTED.md`" (the file now carries fifty data rows) |
| `research/G2-STATE.md` §9 item 6 | "**6. Compute G2(41#), the thirteenth term.** … **Cost: about 6 hours by the streaming leg**" | 2026-08-18 exact terms, carried in this file's own §2 | mark CLOSED per §9's own rule: G2(41#) = 546 and G2(43#) = 618 are exact, both inside their pre-registered Poisson windows, and A144311 already published both |
| `research/GLOSSARY.md`, Lemma V entry | "full decoupling gives 1 + √e ≈ 2.649, with any partial decoupling past θ = 1.2417 beating our proven 4.2665" | `sift-limit-attack.md` §4.5 correction, carried in `G2-STATE.md` §5 | "…with any partial decoupling past θ_total = 1.2090 beating our proven 4.2665" |
| `research/theta-ladder.md`, break-even row | "\| break-even \| 1.2417 \| u > 4.26645 \| ties \|" | same | "\| break-even \| 1.2090 \| u > 4.26645 \| ties \|" |
| `paper/wall-note.md` | "θ = 1.2417 beats 4.2665, and full decoupling gives 1 + √e ≈ 2.649" | same | "θ_total = 1.2090 beats 4.2665, and full decoupling gives 1 + √e ≈ 2.649" |
| `research/GLOSSARY.md`, G₂ entry | "2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528 (T₂..T₃₇; OEIS draft pending)" | the A144311 finding, carried in `U-FRAME.md` §6a and `G2-STATE.md` §2 | "…, 348, 528, 546, 618 (T₂..T₄₃ computed here; the sequence is **A144311 + 1**, Carter 2008, 22 terms to x = 79, so `oeis-G2-submission.md` is a duplicate and must not be sent)" |
| `paper/PAPERS.md`, micro-publications | "OEIS: G₂ sequence (drafted, 12 terms through a(12) = G₂(37#) = 528; awaiting Chris's submission)" | same | "OEIS: G₂ sequence — WITHDRAWN, duplicate of A144311 (Carter 2008); what survives is a b-file, the twin-prime motivation, and cross-references to propose on A144311" |
| `paper/PAPERS.md`, Sequencing item 2 | "OEIS submissions (priority timestamps, zero cost)" | same, plus `ATTACKS2.md` row 10 | "OEIS: the G₂ submission is withdrawn as a duplicate; the seam-count submission waits on a search re-run in the owning convention" |
| `paper/PAPERS.md`, Paper IV | "verified G₂ ladder (T₂..T₃₇ machinery, twelfth-term hunt)" | same | "verified G₂ ladder to T₄₃, fourteen exact terms computed here against A144311's twenty-two" |
| `paper/PAPERS.md`, Lemma V paragraph | "so the almost-all exponent 2.649 is a candidate paper in its own right" | `sift-limit-attack.md` §7e item 2 and `G2-STATE.md` §0 | "the almost-all exponent the mean-square form delivers is **0** — the window is polylog, not a power, and the elementary second moment already owns that ground about 1.4× cheaper; 2.649 is the ALL-POSITIONS full-decoupling figure and does not follow from the mean-square theorem" |
| `research/covering-dive.md` Q4.2 | "**Until someone runs K–K §2 line by line with that substitution, the transferred exponent is a reading of a published proof, not a consequence of a published theorem.**" | the K–K substitution, carried out; `two-class-lower-bounds.md` §4c | "The substitution was carried out on 2026-08-19: K–K's §2 trichotomy was re-derived for Ω_p = {a_p, a_p−2} with Case 2 empty and |Ω^III_p| = 2 verified to 10⁶, adversarially checked twice, and it stands. The result is DERIVED HERE and NOT refereed (`two-class-lower-bounds.md` §4c)." |
| `research/covering-dive.md`, REALISTIC TARGETS #4 | "the target is no longer 'build a two-class construction', it is the much sharper … 're-derive K–K §2 with Ω_p = {a_p, a_p−2} and check their Case 1–3 dichotomy survives', which if it works turns an INFERRED exponent-3 lower bound into a proven one" | same | "that target was executed on 2026-08-19 and the result is `two-class-lower-bounds.md` §4c; what remains open is the referee gap, namely Halberstam–Richert Thm 2.2 and the Selberg remainder's ξ-versus-z condition at κ = 4" |
| `research/operator-and-pair-count.md` | "the tail slope 1.311 over the 30 shared levels plus the comb-share drift 0.366 gives 1.677, the f slope on those same levels" | forty-fourth pass | the f slope on those levels is census-derived and the census aliases from x = 37; the decomposition must be re-read against `fdecay-deep-01-census-defect.js`, or the sentence scoped to x ≤ 31 |
| `research/a3-03-f-from-census.md` | "f falls by a factor 170 across that range, so L is on the polylog branch" and "ln(1/f) = 1.529 + 1.482·(2p/m̄) − 1.025·ln s(d_min), R² = 0.964" and "x = 181 has d_min = 384 with s = 1 and f = 5.7e−5" | forty-fourth pass | this file is the .md companion of the defective producer and carries **no** defect header, where `a3-03-f-from-census.js` line 600 does. Corrected law: ln(1/f) = 1.917 + 1.4016·(2p/m̄) − 1.021·ln s(d_min), R² 0.9867 over 51 window levels; the factor from x = 11 to 199 is LARGER than 170 |
| `research/ATTACKS3.md` §A3 | "The expensive half costs exp(0.048p), reaching x ≈ 200 and no further. f is settled on 42 exact points" | forty-fourth pass | "The expensive census half costs exp(0.048p) and reaches x ≈ 200; the deep-window instrument settles f to x = 829, and the 42 published census points are defective from x = 37" |
| `research/ZONE-POSTULATE.md`, zone-frame paragraph | "the last kill-run of length ≥ 2 lands at p = 181, 331, 421, 457 in windows of 2·10⁷..2·10¹⁰ … validated out-of-sample across three decades of window size" | forty-sixth pass | "…lands at p = 181, 331, 421, 457, 631 in windows of 2·10⁷..2·10¹¹ … validated out-of-sample across four decades, the fifth window blind and in band [571, 877]" |
| `paper/proposals/prop-thinning-null.md` §1 | "Tested at three further windows against pre-registered bands and a pre-registered kill criterion: CONFIRMED on every criterion, with the last fold … running 181, 331, 421 and 457 across the four windows" | forty-sixth pass (already scored in this file's §5, never carried back into §1) | "Tested at four further windows … the sequence 181 → 331 → 421 → 457 → 631 holds across five windows and four decades. Two clauses are now known to fail: the per-fold ±3√λ clause at 43.2%, and the count is systematically ~20% high at five of five windows, which now belongs in the law" |
| `paper/proposals/prop-suen-import.md` §1 | "taking the graph complete kills the asymmetric local lemma from x = 7 onward, the seventh independent arrival at the Mertens wall and earlier than the covering-economy arrival at x = 13" | thirty-fourth pass | "on the complete dependency graph Shearer's EXACT criterion is the union bound (Scott–Sokal Ex. 3.1), so the wall is x = 13 as an identity and not merely an arrival; the x = 7 figure was the sufficient asymmetric LLL only, and its 'earlier than' rider was wrong twice" |
| `paper/proposals/prop-suen-import.md` §2 | "The wall's address is the most interesting and the least finished." | thirty-fourth pass; `REFUTED.md` local-lemma row | "The wall's address is finished in the closing direction: the whole local-lemma family (Shearer's exact criterion, Moser–Tardos, resampling oracles, entropy compression) is CLOSED by three mechanisms, and every member that beats Shearer buys it with structure costing H ≥ x#" |
| `research/sift-limit-attack.md` §7 | "That is the Mertens wall, and this is the **sixth** independent arrival at it." | thirty-fourth pass | true as written, but incomplete: on the complete dependency graph the exact local-lemma criterion IS the union bound, so the wall is an identity there rather than a coincidence of arrivals; the exact criterion is the eighth arrival (`import-shearer.md`) |
| `research/OBSERVATIONS.md` §2, first moves | "Read the jump word as a substitution system. … Establishing what it is instead would connect the corpus to symbolic dynamics." and "Check the cut-and-project framing against the literature before leaning on it." | thirty-fourth and twenty-fourth passes | both are done. The constraint graph is exact and strictly sofic with capacity ln 2, p-free (IMPORT-MAP row 2 LANDED), and the B-free/Sarnak dynamical import CLOSED with an exclusion in print: the limit comb is {−1}, entropy 0, not Toeplitz |
| `research/kappa-not-L.md`, Alternation Lemma | "**The Alternation Lemma (PROVEN, and it is the prize)**" | thirty-ninth pass | the lemma stands, but the LANGUAGE is a printed textbook object and the file carries no tag: it is the B = 1 charge constraint / alternate-mark-inversion, Marcus–Roth–Siegel §2.3 p. 47, with the capacity in their §3.2 table. What stays ours is the 3/p → 2/p rate correction, the weight-(1,1,2) multiplicity and the wall address |
| `research/GLOSSARY.md`, Unification Law; `research/ATTACKS2.md` row 5 | "shape SCORED on a pre-registered rule, and the amplitude's first term is DERIVED" / "now SCORED against a pre-registered rule, shape 10/10, magnitude 9/10" | thirty-sixth and thirty-eighth passes | neither site carries the verdict label. The thirty-sixth pass corrected the verdict DERIVED → **SHAPE-ONLY** by the prereg's own rule and the thirty-eighth confirmed it stays SHAPE-ONLY; the label belongs beside the score |

Three further sites were checked and came back clean where the ledger predicted
trouble. `research/f-decays.md` carries the census defect in a boxed header at
the top of the file with the corrected law and an explicit do-not-quote rule, so
its body's 42-point numbers are quarantined rather than stale. `research/THE-DIALS.md`
dial 4 already reads "all four channels closed" with the instrument-slack survey
and its Šidák figure, matching the sixteenth pass and `REFUTED.md`'s row.
`research/covering-dive.md` §6's knife-edge sentence already carries the
thirty-ninth pass's correction (the primes grow strictly faster than the BBMST
counterexample regime), and its FKMPT §2.3 quotation is the version the
forty-first-era withdrawal cleared. The `0.41625` digit is gone corpus-wide;
every live site reads `0.41621`.

---

## 2. Upgrades the live layer has not absorbed

| what the wave established | pass | where the live layer still understates it |
|---|---|---|
| G₂(37#) = 528 has an INDEPENDENT EXHAUSTIVE maximality certificate: maxsum₁ = 528 over all 217,929,355,875 gaps, from an engine sharing no code with the exact-ladder producers | forty-third | `U-FRAME.md` §8 cites only the streaming leg (519 s from T₃₁) and `G2-STATE.md` §2 and §8 cite only the streaming computation plus A144311 agreement. Neither knows the certificate exists |
| The complementary-window duality maxsum_m + minsum_{D−m} = W, verified EXACT at all 1484 m on T₁₃, and OWNED (the circular scan statistic's complement identity, Cressie 1977 / Naus / GNW 2001) | thirty-fourth, thirty-ninth, forty-fifth | carried only in `IMPORT-MAP.md` row 1. `U-FRAME.md` §5a's maxsum-family section, which is where a reader looks for identities on maxsum_m, does not carry it in either direction |
| G₂(P(y)) ≫ y (ln y)³ (lnlnln y)²/(lnln y)⁴ for y ≥ 10^{134.1}, derived here in full from Kalmynin–Konyagin, adversarially checked twice, NOT refereed | the K–K substitution wave | `G2-STATE.md` §0 carries it and `two-class-lower-bounds.md` §4c owns it, but `G2-STATE.md` §3a — the file's own "everything known, in one table" — has no row for it, so the table still tops out at the free FGKMT import and the INFERRED Rankin analogue. `G2-STATE.md` §8's ownership table has no row either |
| The extinction rate law's amplitude A is DERIVED, not fitted: A = 2.2091e-2 against the record's fitted 2.4312e-2, c at 0.37σ, beating the geometric null on both | thirty-seventh | `prop-thinning-null.md` §5 carries "**Upgrade to QUICK-DRAFT** if the amplitude is derived rather than fitted" as an OPEN trigger, and calls closing it "the sharpest objection the record raises against itself". The trigger has substantively fired and is unscored. `U-FRAME.md` §7's "a measured law" wording predates it |
| The extinction law spans five windows and four decades, with the ~20% hot systematic now IN the law and the per-fold ±3√λ clause failing at 43.2% | forty-sixth | `U-FRAME.md` §7 and `ZONE-POSTULATE.md` carry the four-window form (rows above) |
| f's corrected law over 51 window levels, and the deep-window instrument reaching x = 829 where the census walls at x ≈ 200 | forty-fourth | `U-FRAME.md` §12, `operator-and-pair-count.md`, `a3-03-f-from-census.md` and `ATTACKS3.md` §A3 all still present the 42-point census as the frontier (rows above) |
| The alternation language is a printed textbook object and the constraint graph is exact, strictly sofic, capacity ln 2, p-free | thirty-fourth, thirty-ninth | `kappa-not-L.md` and `U-FRAME.md` §10 carry the Alternation Lemma with no attribution tag; `U-FRAME.md` §11's prior-art instruction covers the transfer operator only |
| The linear-in-ln D exponent rule is dead at two blind levels (T₃₇ at 3.63 s.e., T₃₁ outside its own band), the DERIVED-CONSTANT claim withdrawn, and no single exponent should be quoted | forty-third, forty-fifth | `IMPORT-MAP.md` row 1 carries all of it correctly. No other live doc carries the rule, so nothing to correct — recorded here so the next audit does not re-open it |
| The Lonely Rabbit problem (Cusick 1972, proved Schark 1974, Rab(n) ~ e^{−2γ}/(n log log n)) — a closed-form extremal problem whose extremal object is a primorial wheel and whose constant is Mertens | forty-seventh | `PRIOR-ART.md` gained the section, which is the owning file. `G2-STATE.md` §8's ownership table has no line for it, and §8 is where a reader checks what is ours in the covering formulation |

---

## 3. How much of the live layer is clean

Nineteen files were in the assigned scope. Eleven of them are clean against
passes 26–48: `research/THE-DIALS.md`, `research/kappa-not-L.md` (one missing
attribution tag, no false sentence), `research/sift-limit-attack.md` (one
incomplete sentence, no wrong number), `paper/proposals/prop-kk-lower-bound.md`,
`paper/proposals/prop-tailcount-transport.md`,
`paper/proposals/prop-anchored-note.md`,
`paper/proposals/prop-staircase-note.md`, `paper/proposals/draft-kk-lower-bound.md`,
`paper/proposals/PROPOSALS.md` (accurate except that one grade's trigger is
unscored), `research/REFUTED.md` and `research/IMPORT-MAP.md`. The last two are
the wave's own output and are the most current documents in the corpus.

Eight carry at least one stale sentence: `U-FRAME.md` (3), `G2-STATE.md` (2 plus
two missing table rows), `GLOSSARY.md` (2 plus one missing label),
`PAPERS.md` (4), `covering-dive.md` (2), `operator-and-pair-count.md` (1),
`ATTACKS2.md` (1 missing label), `OBSERVATIONS.md` (1 pair of answered first
moves), and among the proposals `prop-thinning-null.md` (1) and
`prop-suen-import.md` (2).

Five files outside the assigned scope were pulled in by a stale pointer and each
carries one: `ATTACKS3.md`, `a3-03-f-from-census.md`, `ZONE-POSTULATE.md`,
`theta-ladder.md`, `wall-note.md`.

**Count: 27 stale sentences across 15 live files, against a swept surface of 24
files. Nine upgrades the live layer has not absorbed.** The single most
load-bearing miss on each side is `G2-STATE.md` §0's "fifteen routes" against a
`REFUTED.md` that now indexes fifty, and the absent exhaustive certificate for
G₂(37#), which is the strongest custody fact the corpus owns about its own
central object.

Two structural patterns are worth naming because both cost a whole class of
finding. The census defect propagated to four live sites and the defect header
was written at only one of them, so a producer's `.js` carries the warning while
its `.md` companion does not. And a proposal's §5 was updated with a scored
trigger while its own §1 kept the pre-trigger claim, which is exactly the defect
`PROPOSALS.md`'s regrade rule is written to catch, one section lower down.

---

*Report of a 2026-08-20 audit pass. Not a live document; the corrections above
belong in the files named, and this file records where they were found.*
