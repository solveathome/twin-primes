# Audit staging: campaign archive (2026-08-17)

<!-- ledger
id: Q-audit-campaign
status: ANSWERED
todo: none
question: Does the campaign archive layer - the natal-cap notes, ATTACKS, covering-dive and their neighbours - hold internal inconsistencies?
verdict: Six files and eight of the natal-cap notes are clean and need no change; the remainder carry per-file findings recorded in place, and this is a diagnosis pass rather than an edit.
-->

Files: `research/natal-cap-*.md`, `research/NATAL-CAP-CAMPAIGN.md`,
`research/ATTACKS.md`, `research/ATTACKS2.md`, `research/ATTACKS3.md`,
`research/anchored-windows.md`, `research/covering-dive.md`,
`research/bv-import-survey.md`, `research/dhr-verification.md`,
`research/sift-limit-attack.md`, `research/two-moire-argument.md`,
`research/d2-d4-bijection.md`, `research/oeis-G2-submission.md`,
`research/oeis-seam-submission.md`, `research/README.md`.

Clean, no change needed: `bv-import-survey.md`, `dhr-verification.md`,
`two-moire-argument.md`, `d2-d4-bijection.md`, `oeis-seam-submission.md`, and
the natal-cap notes 04, 12, 19, 21, 23, 26, 31, 32.

---

### research/covering-dive.md

**"C(ρ) > e^{−1−6/ρ}" in the FKMPT main theorem.** WRONG NUMBER, now settled at
the source. Text-extracted from the arXiv:1802.07604 v3 PDF, Theorem 1 reads
`C(ρ) := sup{δ ∈ (0,1/2) : (4 + δ)·10^{2δ}/log(1/(2δ)) < ρ}` and
`C(ρ) > e^{−1−4/ρ}`. The constant is **4**, and it appears twice, once in the
sup and once in the bound. The 6 came from an earlier arXiv version, which
ar5iv still renders; the PDF text is the authority. Both the definition and the
bound are now quoted in full, with the non-degeneracy and ρ-supportedness
hypotheses spelled out. This closes the item the brief flagged UNRESOLVED.

**"Ford–Green–Konyagin–Maynard–Tao (FGKMT)" as the author list of *Long gaps in
sieved sets*.** ATTRIBUTION ERROR, eight occurrences. arXiv:1802.07604 / JEMS
23 (2021) is Ford, Konyagin, Maynard, **Pomerance**, Tao: FKMPT, no Green. The
file's own source index already had it right, so the body contradicted its own
bibliography. Remark 7, the JEMS 2021 citations and the "machinery is expressly
one-dimensional" line are now FKMPT; the JAMS 2018 large-gaps references stay
FGKMT. Same fix applied in `natal-cap-10-sieve-cap.md` (4 places) and
`sift-limit-attack.md` (2 places).

**"the optimum two-class covering already reaches ≈ p²/2".** SMALL-NUMBER
ARTIFACT. h₂(21) = 2622 against p₂₁² − p₂₁ = 5256 is 0.499 at the top computed
term and nowhere near a law. The measured growth over all 21 exact terms is
**c·x·ln²x with c ≈ 1.90** (1.90 × 73 × ln²73 = 2552 against the exact 2622),
and x ln²x/(x²/2) → 0. Stated as a crossing near x = 73, not a shape. The same
figure was driving the target form in REALISTIC TARGETS §4 ("does covered length
scale like c·pₙ²/log? like ZM's ≈ p²/2 data?"); that now names c·x·ln²x.

**"known bounds bracket G₂ between ~pₙ (trivial) and — nothing".** SUPERSEDED on
the lower side. `two-class-lower-bounds.md` §1 proves G₂(x#) ≥ g(x#) pointwise
in one line, which imports the whole Erdős–Rankin literature: G₂(x#) ≫
x·log x·logloglog x/loglog x by FGKMT (JAMS 31, 2018) via Rankin 1938 and Pintz
1997, and x(log x)^{2+o(1)} under Maier–Pomerance. The upper side is still
empty at any exponent.

### research/sift-limit-attack.md

**"reports one live route" / "the one live route" / "the single most promising
entry".** REPRICED, not deleted. The vector sieve is still the only mechanism in
the literature that consumes any structure the set has, but it is an
exponent-improvement programme and not a road to TPC. Added the theta ladder's
verdict in the summary, in §4.5 and in §6: the exact full-period suprema of the
all-positions exponent are **1.9524, 1.9477, 2.0018, 2.0476 at z = 19, 23, 29,
31**, with a 4·10⁹-position prefix supremum holding it above 2.05 through
z = 71. The Gap Reformulation needs theta < 2; the requirement fits the zone
budget only at the two smallest points available and misses by at least half
again from z = 43 on. Conditional column 2.159 to 2.482 across z = 19 to 47,
still rising, margin below the full-decoupling target 2.649 now 0.17 and
closing at 0.57 per unit ln z. Forced by `research/theta-ladder.md` §§2, 7, 8.

**Lemma V presented as the operative assumption of the theta column.** FRAME
ERROR. With D₁ = D₂ = z^s, H = z^u and θ_total = 2s/u, the ladder's family
(s = 3.0, u = theta ≈ 2.16 to 2.48) sits at θ_total ≈ 2.4 to 2.8, i.e. ABOVE
full decoupling, with **s/u ≈ 1.2 to 1.25 > 1** — outside Lemma V's stated
range s ≥ (0.63+δ)u up to s = u − ε. So the column is not "Lemma V suffices"; it
assumes a Gaussian maximal law for the sawtooth, which §3 of the same file
already names as the parity wall in concentration clothing. The two open items,
the drift and the maximal law, are not independent halves: the maximal law is
the whole price. Recorded in the summary, in §4.5 and in the closing
calibration, and the "first lemma to try" list now points at the exact-supremum
direction instead of more conditional rows.

**"within a factor of about two of the measured 0.8·pₙ·ln²pₙ" (§3).** RETIRED as
an asymptotic law. The direct ratio G₂/(x ln²x) wobbles between 0.66 and 1.13
with no trend, mean 0.89; the law is c(x, lnD)·m̄·lnD with c a surface, and the
control-corrected growth exponent is **1.57** central, bracket 1.3 to 1.9, floor
1. From `exponent-control.md` §5 and `maxgap-law.md` §1.

**"below the Ziller-Morack p² line" (pilot table reading).** NARROWED to "below
the Ziller-Morack conjectural p² ceiling", with the exact-supremum ladder
attached: the true all-positions requirement at z = 19 and 23 is 1.9524 and
1.9477, inside the zone budget, and it crosses 2 by z = 29 and never returns.

### research/oeis-G2-submission.md

**"Computed terms satisfy a(n) < 0.31 * prime(n+1)^2 (the ratio stays near
1/4)".** ARITHMETIC ERROR. a(12)/41² = 528/1681 = **0.3141**, which exceeds
0.31. The twelve ratios run 0.222, 0.240, 0.245, 0.248, 0.249, 0.228, 0.299,
0.284, 0.243, 0.268, 0.254, 0.314. Restated as < 0.32 with the endpoints given.

**"Empirically a(n) is close to 0.8 * p * log(p)^2".** RETIRED. Replaced with
the extreme-value form c·m·(log P − log m) where m = P/A059861(n−1), c averaging
0.48 over n = 5..12 at cv 10%; the direct-ratio wobble 0.66 to 1.13, mean 0.89,
flagged as a description of the computed range and not an asymptotic law; and
the control-corrected exponent 1.57, bracket 1.3 to 1.9, floor 1. This is the
constant G2-STATE §6.2 named as needing a decision, decided in favour of the
Poisson form.

**No lower bound stated.** ADDED, as the brief required. a(n) ≥ A048670(n)
pointwise, offsets verified to align (A048670 offset 1, terms 2, 4, 6, 10, 14,
22, 26, 34, 40, 46, 58, 66 against our 2, 6, 12, 30, 42, 66, 108, 150, 204, 258,
348, 528; ratios 2.00, 3.00, 3.00, 3.00, 4.15, 4.41, 5.10, 5.61, 6.00, 8.00 at
n = 3..12), with the one-line subset argument, and the imported
FGKMT/Rankin/Pintz and Maier–Pomerance consequences. FGKMT added to LINKS,
A048670 relabelled in CROSSREFS as a term-by-term lower bound. Still under
moratorium; not submitted.

**Verified unchanged:** the DATA line 2, 6, 12, 30, 42, 66, 108, 150, 204, 258,
348, 528 matches the repo ladder exactly, and the A288815 comparison
(12 ≤ 18, 30 ≤ 30, 42 ≤ 66, …, 258 ≤ 450) checks against the eight terms
`h2-scoping.md` reproduces from Ziller and Morack's table 1.

### research/README.md

**"G₂ ≈ 0.8·p·ln²p, only ~25% of the zone, through 29#" (measurements table).**
RETIRED. Now G₂(x#)/p'² runs 0.222–0.314 over the twelve exact terms, never near
1, with the growth exponent ~1.57, bracket 1.3–1.9, and the explicit note that
it is not a constant times p·ln²p.

**"the early '≈0.2 constant' reading was refuted by deeper computation".**
CONVENTION. The claim was already current; the sentence carried its own history.
Rewritten to state Var/E's drift and the ln(Var/E) ≈ −(0.24u² + 0.13u) law
without reference to what it used to say. Same for "its sub-Poisson ≈0.2
constant" in the prior-art paragraph.

**"then divergent enrichment" (anchored origin).** REFUTED, and refuted by our
own `anchored-windows.md` §3 on the same archive. Anchored enrichment is bounded
by e^{2γ} = 3.172 and mortal, crashing to 0 as p_n → x; the trough has
asymptotic depth e^{2γ}/4 = 0.79305 at the zone edge; and at S = x'² the origin
carries **21% LESS** than mean density.

**Prior art paragraph listed three surviving novelties with no mention of
Holt.** NARROWED. Added: Holt and Rudd own the cycle of gaps, the fold
recursion, fusions, the closure theorem, the transfer operator, the population
models, the interval of survival and the one-class discrepancy; Maier owns the
tile-as-matrix; Buchstab owns ω(u). Also added that the lower side of the Gap
Reformulation is not open, since G₂ ≥ g imports Erdős–Rankin for free.

### research/ATTACKS.md

**Attack 10, "divergent enrichment".** REFUTED, same fix as README: trough of
asymptotic depth e^{2γ}/4 = 0.79305, enrichment bounded by e^{2γ} = 3.172, then
a crash to 0; and the origin's 21% deficit at S = x'² noted.

**Attack 2, "universal dip ~0.90 near x~10³, suspiciously ≈ e^γ/2".** RESOLVED
in the archive itself and never carried back. The 0.89–0.90 is a finite-size
blend; the asymptotic dip constant is e^{2γ}/4 = 0.79305 and the resemblance to
e^γ/2 = 0.8905 is a coincidence (`anchored-windows.md` §4).

### research/ATTACKS2.md

**Attack 1, "Seams are real twin hotspots — as POINTS".** NARROWED. The measured
E(P) = 2·∏p/(p−2) enrichment is against random integers and is entirely the
singular-series factor, i.e. slot-level. Conditional on being a twin slot a seam
is not enriched: survival 1.016, 0.980, 1.007, 0.986 × the tile mean at
half-widths 300 to 3e5 against 400 random controls each, and 1 genuine twin pair
from 20 seam slots against 2.25 expected. A seam position is 25× more likely
than average to be a SLOT and no more likely than average to be a twin PRIME.
Forced by `fold-profile-12-anatomy-survival.js`, 2026-08-17.

### research/ATTACKS3.md

**The wave was written as a live plan and never carried its outcomes.** Ten
"Landed" verdicts added, sourced from `U-FRAME.md` §§10-15,
`a3-01-misalignment-ledger.js` and `THE-DIALS.md`. The five that matter:

- **A5, "the attack that matters most", bounding L.** Theorem B is PROVEN and is
  the first unconditional bound on L, and it is **structurally capped at the
  linear branch** — maxsum_m ≥ G₂ always, so it can never prove L below
  G₂/(3p) ≈ 0.18x, and Theorem C inherits the ceiling. Bounding L is no longer
  the target and the naive (L+1)·G₂ recursion is closed (A4's win condition was
  also not met). The alternation condition is worth exactly 3/2 and no more.
- **A9's transfer operator.** PRIOR ART, and the same object rather than a near
  miss: Holt and Rudd, arXiv:1408.6002 §5 (2014), transfer matrix M_J on the
  cycle of gaps, eigenstructure and binomial eigenvectors included. Marked
  "nothing here may be presented as new structure"; what is ours is the exact
  head engine and its numbers.
- **A7's pane.** CLOSED, twice. The pane sits at u → 1 and needs u > 4.26645
  against the zone's 2: "4.267 proven, 1 needed" (`THE-DIALS.md` §§1-2).
- **A10's exactness.** ANSWERED NO. 3 of 9 folds, 0.927 over 329 cells, and the
  ladder is pinned in the worst 2p/m̄ band, reaching the safe band only near
  x ≈ 130 (width 10⁵⁷).
- **A6's origin recursion.** CLOSED, via `origin-excess.md`: the (ln x/ln y)²
  factor is capped by an absolute constant ~2.2, measured max 1.372; the real
  advantage is G₂/F ≈ 7 because window/F is capped at x' and saturated.

**"House rules apply: … refutations stay visible."** CONVENTION. The house rule
is now the doc convention: bodies state current understanding, refutations live
in the changelog. Header updated.

**"corrected 2026-08-16 by A7; first written 4.95, too big by 3/2" (A7).**
CONVENTION. Inline correction removed; the corridor width 5·C2/ln²n = 3.301/ln²n
now stands on its own.

### research/natal-cap-10-sieve-cap.md

**Verified, no change to the mathematics.** The parity floor is stated as **2**
throughout, at §1.5, §2 Regime 2, §4's ordering and §5's caveat list; 4 is
correctly identified as the 2/θ rule at the BV level θ = 1/2, a technology wall
breached by Chen since 1978 and by Lichtman's 3.29956 in 2025. The campaign
verdict also stands: C*(x) = 1/Σ_{x<q≤√W} 2/q drops below 1 permanently between
x = 11 and x = 13 and falls like 1/(2 ln x), so no per-prime cap of any strength,
including an oracle for the exact gross(q), closes the first-order union bound
from x = 13 on.

**Four correction-block framings migrated.** The §1.5 heading was "the brief's
'no constant below 4' is WRONG; the floor is 2"; §2's was "two regimes, and the
brief conflated them"; §1.2 note (i) opened "The attack brief's 'Wu 2004 ~4.5 /
3.3996' is corrected"; §1.4 closed on "The brief's recollection of an interval
statement in Siebert". All four now state the fact directly. No number moved.

### research/NATAL-CAP-CAMPAIGN.md

**§"Corrections to our own record (house rule: refutations stay visible)".**
CONVENTION. Retitled "Standing notes on the artifacts" and rewritten as present
fact: `attack-04-fourier-budget.js`'s "certified" column is not a valid
certificate (missing the k·(W/p)⁻¹ index twist), and the campaign's reference
figures are given as figures rather than as corrections to a brief. The
scoreboard's inline "**old attack-04 'certified' column was invalid**" went the
same way. The campaign verdict itself is unchanged and stands.

### research/anchored-windows.md

**"Var ≈ 0.2·δ_n L" (§1).** REFUTED. Var/E is not a constant: it drifts with the
level, 0.25 → 0.32 at zone scale, and the stable empirical law is
ln(Var/E) ≈ −(0.24u² + 0.13u) in the window exponent u.

**§3 "The corrected life-cycle law (this corrects attack 10)" and §4
"Resolution: the attack-2 dip is …, not e^γ/2".** CONVENTION. Both sections
state the same mathematics; the headings and opening sentences were correction
blocks against ATTACKS.md. Retitled and rewritten as statements. The status
summary carried the same framing and was rewritten with it. No number moved:
e^{2γ}/4 = 0.79305 at the zone edge, cap e^{2γ} = 3.172, kill shadow ≈ 0.85.

### research/natal-cap-30-skeleton-bound.md and research/natal-cap-36-skeleton-door.md

**Prop C(a): "every per-branch triangle bound is Θ(L/Vg), vacuous exactly
because the calm is real".** REFUTED by cap-36, which held the refutation in an
inline block while cap-30 went on asserting the wrong thing — exactly the trap
the convention names. cap-30 now states the truth: the per-branch bound is
**Θ(1/Vg) with an L-free constant**, the window length is not the obstruction,
and it is vacuous for two other measured reasons (constant growing like 8^{π(x)}
off the deepest branch; aggregate calm ratio ΣV/Σ(Lδ) = 0.2349, 0.1149, 0.0505,
0.0198, 0.0080 at @11 through @23). cap-36's correction block removed.

### research/natal-cap-14-discrepancy-lemma.md

**"(and a correction to cap-07, which cited the full window-rotation values …)".**
CONVENTION. The two ensembles are simply different and close; stated as such. No
qualitative cap-07 reading changes, as the file already said.
