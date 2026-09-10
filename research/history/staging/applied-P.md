# applied-P.md — wave 4, partition P: the calibration axis on G's three files

<!-- ledger
id: Q-applied-wave4-P
status: ANSWERED
todo: none
question: Which calibration defects sit on a3-05-bound-L.md, localized-04-maxsum.md and level-ledger-tight.md, and were they fixed?
verdict: Fourteen defects found and fixed on the one axis wave 3 never ran, none of them reachable by any check in qc.js: two numbers contradicting the file's own pasted script output, one slot count against thirteen other sites and an exact closed form, one superseded sifting limit and three dropped scopes; the gate stayed at zero on all six checks.
-->

Files owned and edited: `research/a3-05-bound-L.md`,
`research/localized-04-maxsum.md`, `research/level-ledger-tight.md`. Nothing
outside that list was touched.

**Gate.** Before: refs 0, quotes 0, crosslinks 0, scripts 0, transfers 0,
calibration 0; `selftest.js` exit 0. After: **0, 0, 0, 0, 0, 0**; `selftest.js`
exit 0. `transfers` stayed at zero across the run, including after the edit to
`a3-05-bound-L.md` §7, which is one half of a near-duplicate of
`gate-multiplies.md` §8. No adjudicated pair lapsed and none was silenced.

**Lead with what matters.** Fourteen defects found on the one axis wave 3 never
ran here, none of them reachable by any check in `qc.js`. Two are numbers that
contradict the file's own pasted script output. One is a slot count that
disagrees with thirteen other sites and with an exact closed form. One is a
sifting limit that has been superseded in the literature and corrected
everywhere else in this corpus. Three are dropped scopes on measured laws. The
priced gap, the one number wave 3 probed, was already correct in all three files
and is the only thing here that was.

**Routed to the shepherd, outside my files:** §5.

---

## 1. Defects found and fixed

### `research/a3-05-bound-L.md`

**P-1. §3, a count that contradicts the script. FIXED.**
"They agree at all seven folds" preceded a list of **eight** qualifying sets at
eight named folds, 7 through 31. Reading 2 of `a3-05-bound-L.js` prints eight
rows, every one marked `[OK]`. Changed to "all eight folds". The neighbouring
"seven" in §4 is correct and was left: it counts folds with L ≥ 2, which
excludes fold 11.

**P-2. §7, the G2 growth exponent quoted as the h2 figure. FIXED.**
The sentence prices the ceiling off `G2 ≈ 0.55·(ln W)²` and then said the
exponent "in that reading" is "1.57 central". The home, `exponent-control.md`
§5, gives 1.57 ± 0.06 for h2 and **1.54 ± 0.09 for G2**, and issues an explicit
instruction: "Quote 1.57 for h2 and 1.54 for G2." `G2-STATE.md`:666 carries that
instruction verbatim. The reading in question is G2's. Now reads "1.54 for G2
against 1.57 for the h2 ceiling, practical bracket 1.3 to 1.9, hard floor 1"
with the section cited. The bracket and floor were already right.

**P-3. §7, a derivation reported as an equivalence. FIXED.**
"sum ln c(p) <= 2 ln x - ln 12 at every x, **equivalently** the sharp per-fold
rate ln c(p) <= 2 ln p / p". Neither home says equivalently. `U-FRAME.md` §3:
"differentiating it along the primes, one fold at a time, gives the sharp
per-fold rate". `gate-multiplies.md` §1: "obtained by differentiating the
partial-sum condition ... rather than dividing it by pi(u)". Changed to the
home's construction. This is the calibration-upgraded-in-transit shape at its
smallest: a one-way derivation restated as a two-way identity.

**P-4. §7, the threshold restated without its hypothesis. FIXED.**
The home states it as a box: "**The survivor, stated as a threshold (PROVEN,
given the measured G2, mbar and rho laws).**" `a3-05` asserted
`L <= 0.19 to 0.31 * p / ln p` flat, with no marker and no hypothesis, and
`gate-multiplies.md` §10 adds that three measured laws feed those constants at
once so they carry one significant figure. Both clauses restored inline. This is
the D-1 shape from wave 3 recurring on a different claim.

**P-5. §8, a superseded sifting limit. FIXED.**
"the sifting limit, which for dimension 2 is about **4.42**". The corpus settled
this: `dhr-verification.md` establishes β₂ = 4.26645028414864191641, rigorous
via Booker–Browning, and records at :284 that **4.42 is Ankeny–Onishi**, the
value the DH book itself compares β₂ against. `covering-dive.md` §36,
`discrepancy-two-class.md`:318, `exponent-control.md`:201, `bv-import-survey.md`
and `localized-04-maxsum.md` §0 and §10 all carry 4.2665 or 4.26645. `a3-05` was
the outlier by a wide margin: the whole point of the sentence is the distance
from 1 to the limit, and 4.42 overstates it. Now 4.26645, cited to the
verification file.

**P-6. §6, a band quoted without the tile it excludes. FIXED.**
"reading 7 fits lambda*mbar between 1.30 and 1.88 ... at every tile large enough
to fit one". Reading 7 fits eight tiles: T_5 returns NaN, T_7 returns **2.464**
on fifteen slots, and only T_11 through T_29 lie in [1.30, 1.88]. T_7 is large
enough to fit one, so the scope clause did not do the work it claimed. Rewritten
to name the six tiles and to say where T_7 sits, with the direction stated: the
excluded tile lies further from 1, so the omission was understating a reading
favourable to the route rather than overstating it.

**P-7. §10, the slot count of T_29. FIXED.**
"all **214,708,853** slots". Every other site in the corpus reads
**214,708,725**: `gate-multiplies.md` :9, :413, :417, :434, :532, `U-FRAME.md`
:694, `maxgap-law.md` :80, :161, :176, `discrepancy-two-class.md` :68,
`a3-09-histogram-operator.md` :103, `SCRIPTS.md` :131, plus three scripts. It is
also forced: `a3-04-maxsum-recursion.js`:666 records
`214,708,725 = 3·∏_{7≤q≤29}(q−2) on the nose`, which recomputes exactly. A
transcription slip, one digit pair, sitting in a custody sentence.

**P-14. §9, a prohibition on a script that was repaired the same day. FIXED, and
this is the campaign's dominant defect class in its purest form.**
§9 said: "`research/killrun.js` shares the routine and has been fixed;
**`research/Lgrowth.js` has not, and its sweep tables must not be quoted until it
is**". `research/Lgrowth.js` line 1 reads: "*** The old runFor() was REFUTED
2026-08-16 and has been corrected below. ***", and lines 15-22 carry the full
refutation, name the same bug and the same fold-29 symptom, and record the
corrected diagonal. The script was repaired; three documents went on telling
readers not to use it. The §9 heading, "a script that must not be quoted", said
the same thing in the table of contents.

Three corrections, all inside §9 and its intro, and each one was necessary
separately:
- The prohibition is now the accurate one. The file is usable; what is unsafe is
  **any L number taken from it before 2026-08-16**, which is exactly what its own
  banner says, and the corrected off-diagonal sweep out to p = 127 lives in
  `a3-08-adjacent-pairs.js` section [8], which found the bug independently.
- Reading 1's third route is described as "a verbatim copy of the run finder in
  `research/Lgrowth.js`". Opened today that comparison makes no sense, because the
  current routine agrees. `a3-05-bound-L.js`:224 keeps the **pre-fix** routine
  deliberately, labelled "verbatim copy … kept here because it is the source of
  the published diagonal and it turns out to disagree". The document now says the
  copy is of the routine as it then stood, so the disagreement stays legible as
  the discovery it was.
- The §9 heading was retitled. Grep confirms nothing anywhere cites it by text
  and the number is unchanged, so every inbound pointer still resolves.

The same stale prohibition stands in two files I do not own: see §5.

### `research/localized-04-maxsum.md`

**P-8. §4, a measured value attached to the wrong x. FIXED.**
"`localized-single-alignment.md` §5 carries the same object to x = 1613, where
M/ln³x reaches 6.41". The home reads: "It is 4.63 at x = 307, **6.41 at 739**,
6.34 at 1151, 5.51 at 1613. The excursion is one event, not a trend." So 6.41 is
at x = 739, and at x = 1613 the value is 5.51. The home's "one event, not a
trend" was also dropped, and it is the clause that keeps the breach from reading
as a growing violation. Both restored. The band's own scope, "measured on the
k = 3 ladder to x = 307", was already carried correctly and was left alone.

**P-9. §7, the excess factor mislabelled as R(m). FIXED.**
"the measured values sit above it by the factor **R(m) ≈ 1.35** that §3's growth
law supplies at m ∈ [32, 64]". §3's own table gives R(32) = 1.889 and
R(64) = 1.629 at x = 997, so a reader checking the reference finds 1.63 to 1.89,
not 1.35. The quantity actually at work is marginal, not average: the script
measures `d(maxsum_m)/dm` over m ∈ [32, 64], and the growth law supplies that as
`m̄ + σ·√(lnD/2m)`. Against the file's own m̄ that is 156.00/113.96 = 1.37,
233.06/163.40 = 1.43 and 387.75/261.39 = 1.48 at x = 997, 3499 and 16001,
reproducing the growth law's prediction to three digits at x = 997. Rewritten to
name the marginal quantity, give the three values, and say explicitly that it is
not R(m).

**P-10. §10, a scope dropped from the growth law. FIXED.**
"exact enough to predict maxsum_m **at any m** from two numbers". §3 measures it
over m ∈ [2 lnD, 1024] and says the opposite outside that range: "R/EV ≈ 3 there
because the Gaussian model is the wrong model at m = 1", with the m = 1 row of
its own table reading R/EV = 2.980. Now scoped to m above about 2 lnD, with the
m = 1 behaviour named.

**P-11. §10, the retired hole described as proven. FIXED.**
"retires U-FRAME §9's named hole, **a proven upper bound** on maxsum_m". The
phrase describes what the hole asked for, but it sits one clause away from "the
ladder exists, it is `1 + (σ/m̄)√(2 lnD/m)`", and a reader takes the adjective
onto the ladder. The delivered law is MEASURED and the home agrees: `U-FRAME.md`
§9's current text closes the hole with "measures ... unfitted, holding to 6
percent". Rewritten so the hole's requirement and the measurement that closed it
are separate sentences, with the marker attached.

### `research/level-ledger-tight.md`

**P-12. Lead paragraph, a constant attached to a seed that cannot produce it.
FIXED.** "that quantity computed by exhaustion up to **y = 17**, and a proven
constant factor of **81.0**". §3's table is unambiguous: y = 17 gives gain 53.96,
y = 19 gives 81.04, and the Corollary is built on R*(19) = 53.972817. The file's
own header says "R\*(19) from `--deep`, 2717.1 s, and folded in". The lead was
the pre-deep-run text with the post-deep-run number pasted into it. Now names
y = 19 and records that the cheap y = 17 seed gives 53.9, which is the trade the
Corollary already states further down.

**P-13. §4, an ET table cell contradicting the script's pasted output. FIXED.**
The x = 19 row's last column read **81.06** where the script prints **53.97**.
81.06 is `3·R*(17) = 3 × 27.019392`, the transfer bound from the y = 17 seed,
which is what that cell held before the deep run replaced it with the exact
value. The script's column header is `R*(x) (x<=19) or 3^{pi-8}R*(19)`, so for
x = 19 the exact R*(19) is what belongs there. Cell corrected and the doc's
column header narrowed to `R*(x)`, which is all the four rows need. The
conclusion drawn from the table is untouched: ET(19) = 442.58 exceeds the
competing bound either way.

---

## 2. Claims checked and found clean

Every row below was opened at its home and compared on the five axes in the
brief. "Home" is the document that owns the mathematics, not the one that
indexes it.

| # | claim | home | verdict |
|---|---|---|---|
| 1 | priced gap **0.58 to 0.95 ln p** with both ends and the no-trend clause, a3-05 §7 | `gate-multiplies.md` §8 box, §10 | clean, both ends and the rho clause present |
| 2 | `L <= 0.19 to 0.31 p/ln p` **on average over the ladder**, a3-05 §7 and §8 | `gate-multiplies.md` §8 | scope clean; hypothesis missing → P-4 |
| 3 | the two rho readings 1.5 and 2.4, not monotone | `gate-multiplies.md` §8, §10; medians 1.33, 1.26, 1.15, 1.27, 1.71 | clean |
| 4 | polylog L clears the threshold from p ~ 800 | `gate-multiplies.md`:384, `U-FRAME.md`:474 | clean |
| 5 | step 4 is false, "fails outright at two of seven folds" | `U-FRAME.md` §5a step 4 table: 17 and 37 fail | clean, count exact |
| 6 | Zone budget `Σ ln c(p) ≤ 2 ln x − ln 12` | `U-FRAME.md` §3 | clean; the derivation word → P-3 |
| 7 | L diagonal 2, 1, 2, 2, 2, 3, 2, 4 | reading 1; `U-FRAME.md` §5a step 6 (which adds fold 37 = 4) | clean |
| 8 | L not monotone, 3 at 23 then 2 at 29 then 4 at 31 | `U-FRAME.md` §5a step 6 | clean |
| 9 | Lemma 2 table, class minima and the 6p identity | reading 2, all eight rows | clean; the count → P-1 |
| 10 | §4 extremal-run table, spans and c_min | reading 4, row for row | clean |
| 11 | §5 Theorem B table, condition (i) and (ii) rows | reading 5, row for row | clean |
| 12 | "sits 0 to 3 above the truth at every fold" | reading 5 slack column 0,1,0,2,2,1,3,2 | clean |
| 13 | Markov flat 0.32 to 0.44 | reading 6; `kappa-not-L.md` agrees | clean |
| 14 | fold 29 window fractions 9.4e-2 … 0 | reading 6 | clean |
| 15 | reading 6b, fourteen of sixteen nonzero ratios | recounted from the table: 16 nonzero, exceptions at folds 7 and 13 | clean |
| 16 | the two exception tiles have 3 and 135 slots | T_5 = 3, T_11 = 3·5·9 = 135 | clean |
| 17 | fold 31 ratios 9.5e-2, 2.4e-2, 3.6e-2, 3.3e-2 vs 1.4e-1 | reading 6b, fold 31 row and exp(−θ/m̄) = 0.1365 | clean |
| 18 | Theorem C, κ(m) ≤ max{k : maxsum_{m+k−2} ≥ c_min(k−1)} | `kappa-not-L.md`, both PROVEN | clean, marker agrees |
| 19 | "VERIFIED, reading 9 ... 56 cases" | reading 9 | clean |
| 20 | κ(m) ≤ L + 2 verified m ≤ 8 at five folds 13–29, REFUTED at fold 11 | `a3-04-maxsum-recursion.js`:716 | clean, scope intact |
| 21 | j*(1) strictly below L at three of five folds | `a3-04-maxsum-recursion.js`:740, :819 | clean |
| 22 | extremal run at fold 31 is 60, 126, 60 = 2p−2, 4p+2, 2p−2 | reading 4 | clean |
| 23 | `Lgrowth.js` unfixed, must not be quoted | `research/Lgrowth.js` banner, line 1 | **defect → P-14** |
| 24 | Deficit Lemma PROVEN | stated here, restated `LOCALIZED-GAP.md`:66, `G2-STATE.md`:333, both PROVEN | clean, marker agrees at all three |
| 25 | Traverse Bound PROVEN given m̄ ≍ ln²x | `LOCALIZED-GAP.md`:70 | clean, hypothesis carried both sides |
| 26 | short by 9.6 ln x, 93 at x = 16001 | `LOCALIZED-GAP.md`:72 | clean |
| 27 | route priced at π(x) ≈ x/ln x folds | `LOCALIZED-GAP.md` §4 | clean |
| 28 | `M/(k ln³x)` flat in 1.2 to 1.6, with its k = 3 / x ≤ 307 scope | `LOCALIZED-GAP.md`:102 | clean; the x = 1613 clause → P-8 |
| 29 | c is a surface, 1.083 → 0.446 inside x = 29 | `maxgap-law.md`:179 | clean |
| 30 | at fixed lnD, 0.577 (x=23) to 0.989 (x=6421) | `maxgap-law.md`:207, at lnD = 11.09 | clean, the fixed-lnD scope carried |
| 31 | whole tile gives c = 0.446 to 0.594 | `maxgap-law.md`:66, range [0.4463, 0.5939] | clean |
| 32 | "the two files agree; different curves through one surface" | `maxgap-law.md` §1.1, §4c REFUTED on the diagonal | clean, no over-claim |
| 33 | A9 FIT ln(1/tail) = −0.235 + 1.2992·(2p′/m̄) | `operator-and-pair-count.md`:40 | clean, marked FIT both sides |
| 34 | head tail heavier by 20 to 25%, rate 1.06/m̄ | `operator-and-pair-count.md`:68 | clean |
| 35 | "A9's fit should not be used past the range it was fitted on" | `operator-and-pair-count.md`:65 caution | clean |
| 36 | Theorem B structurally capped, quoted phrase | `kappa-not-L.md`:85 | clean, quotation exact |
| 37 | A10 safe band 2p/m̄ ≥ 4, tile of width 10⁵⁷ | `kappa-not-L.md`:111, `ATTACKS3.md`:249 | clean |
| 38 | gate-multiplies does not reach a chain that re-bases | `gate-multiplies.md` §1, :228 | clean, the exception carried |
| 39 | Hagedorn's Jacobsthal values exceed 2p | `PRIOR-ART.md`:136, :234 | clean |
| 40 | Merge Lemma hypothesis M ≤ (p−2)/4 at the **old** level | `LOCALIZED-GAP.md`:41, `G2-STATE.md`:321 | clean, the old/new distinction intact |
| 41 | x* ≈ 2.4×10⁴ at k = 3 | `localized-single-alignment.md`:151 | clean |
| 42 | Theorem B gives L ≤ 1 from x = 211/331/499 | `localized-04-maxsum.js`:518 | clean |
| 43 | growth law σ/m̄ ≈ 0.89 to 0.95, 6% over m ∈ [2 lnD, 1024] | this file §3; restated `U-FRAME.md` §9 with the same scope | clean at both ends |
| 44 | β₁ = 2, β₂ = 4.2665 in §0 and §10 | `dhr-verification.md` | clean (and §0 is a quoted prediction, not editable) |
| 45 | "right base, twice the exponent" VERIFIED | `discrepancy-two-class.md`:174 | clean, marker agrees |
| 46 | ΔΦ₂ 0.3000/−1.1000 .. 26.9038/−27.8325 | `discrepancy-two-class.md` §2 table rows 5 and 23 | clean |
| 47 | c near 0.830 one class, 0.687 two class | `discrepancy-two-class.md`:204 | clean |
| 48 | only proven statements about the sup are the ×2 and ×3 ceilings | `discrepancy-two-class.md` §10 | clean, marker agrees |
| 49 | §9's loose end settled, base √3 not 2 | `discrepancy-two-class.md`:300 | clean, and the home already records it as settled here |
| 50 | FOLD-PROFILE §3 maxima 2.87, 5.97, 12.03 | `FOLD-PROFILE.md`:114 | clean |
| 51 | ledger "dies at 47", last usable y = 43 | `FOLD-PROFILE.md`:377, :378, §9b | clean, quotation resolves |
| 52 | DHR reaches u = 4.26645, y = 91 in this window | `dhr-verification.md` | clean |
| 53 | √3 route reaches y = 107, CONDITIONAL | this file, marked CONDITIONAL | clean, marker present |
| 54 | R₂(p) → 3, √R₂ = 1.5967 … 1.6719 | `natal-cap-29-sigma-plateau.js` R_pred column 2.549 … 2.795, squares to the digit | clean |
| 55 | cap-25 lemma k = π(x) − 3, constant 0.97 | `natal-cap-25-excess-law.js`:28, :383 | clean |
| 56 | TODO 8(c) asks ~30× slack; REFUTED as unblocked | `TODO.md`:294 | clean, and the REFUTED is scoped to "as unblocked" |
| 57 | §6 rebuilt FOLD-PROFILE table, all six rows | recomputed from R*(y) and 3^{π−8}·R*(19); all six new bounds and gains reproduce | clean |
| 58 | R*(2) = 1 gives a free factor of 2 | this file §3 | clean |
| 59 | R*(19) breaks the √3 shape, mean 1.76788 | this file §3 and §7 agree | clean, internally consistent |
| 60 | 41# = 3 × 10^17 | recomputed | clean |

## 3. What I did NOT check, and why

Stated plainly, because G's version of this section is the only reason this
partition exists.

1. **The pasted script output inside the three `.js` files was used as the
   authority but not itself re-run.** All three scripts are expensive: 74 s for
   `a3-05-bound-L.js`, 100 s for the `localized-04` growth-law run, 2717 s for
   `level-ledger-tight.js --deep`. Where a document disagreed with its script I
   took the script, and where both agreed I took the pair as settled. If the
   pasted output is itself stale, nothing here would find it. P-13 is a case
   where the document and the script disagreed and the script was right; there
   is no evidence in this partition of the reverse, but there is also no test
   of it.
2. **`level-ledger-tight.md` §1's custody claims were checked against the source
   documents, not recomputed.** The row "looseness ratios 25.7, 36.0, 54.4, 124,
   186, 256, 479" lists **seven** values where its home,
   `discrepancy-two-class.md`:176, has **eight**, ending 801 at x = 29. The
   "reproduced" column bounds the claim honestly at "25.7 .. 479.5", so nothing
   asserted is false, but the target column silently truncates its source. I did
   not fix it because I cannot tell from the record whether the eighth value was
   out of the run's range or simply dropped, and inventing a reproduction is
   worse than leaving a bounded one. **Recommend it be resolved when
   `level-ledger-tight.js` is next run.**
3. **The `f` and `θ` machinery reached from `a3-05` §7 was not audited.** The
   ceiling argument cites `exponent-control.md` and I checked the exponent it
   quotes, but I did not audit `exponent-control.md`'s own readings against
   `h2-scoping.md` or `two-class-lower-bounds.md`. Out of scope and owned
   elsewhere.
4. **Section-number pointers were left to `qc.js`.** `refs` covers them and
   reads zero; I did not independently walk every `§n` in the three files.
5. **The missing doc-convention footer on `level-ledger-tight.md`.** It is the
   only one of my three without the "This document states current understanding"
   line. Twenty-six other `research/*.md` also lack it, so this is a corpus-wide
   convention question and not a partition-P defect. Not touched. Reported in
   §5.
6. **Internal time figures in `level-ledger-tight.md` were not reconciled.** The
   header says the deep run took 2717.1 s, §3 calls it "the `--deep`
   exhaustion", §4 calls y = 19 "about 50 minutes" (2717 s is 45.3) and the
   Corollary calls it "an overnight run". Three descriptions of one 45-minute
   job. Cosmetic, no claim rests on it, and I avoided adding a fourth by not
   quoting a duration in the P-12 fix. Left as found.

## 4. Method note

Word diffs were run on three near-duplicate pairs, per the brief: `a3-05` §7
against `gate-multiplies.md` §8 (which produced P-4, and confirmed the priced
gap is clean at both ends), `U-FRAME.md` §9 against the same home (which
produced the routing item in §5), and `localized-04` §1 against `U-FRAME.md` §9
(clean; `localized-04` narrows its own evidence claim rather than widening it).
The other nine defects came from opening the home and from recounting against
the script, which is worth recording: **P-1, P-8, P-12 and P-13 are all cases
where the document disagreed with a table printed a few hundred lines away in
its own repository, and no diff would have surfaced any of them** because there
was no near-duplicate to diff against. A diff finds a dropped hypothesis. It
does not find a number that was never copied from anywhere.

## 5. Routed to the shepherd, outside my files

1. **The stale `Lgrowth.js` prohibition of P-14 has two more copies, and one is
   in the frame document.** `U-FRAME.md`:638 opens a paragraph with
   "**`research/Lgrowth.js` must not be quoted until it is fixed.**" and
   `a3-09-histogram-operator.md`:244 says "`research/Lgrowth.js` still reports 3
   at fold 29 and must not be quoted". Both are false as of 2026-08-16: the file's
   own line 1 records the correction. `research/history/staging/audit-uframe.md`:57
   repeats it too, but that is a wave-1 report and correctly frozen. **This is
   worth more than a cleanup**: the prohibition is the kind of instruction a
   future agent obeys without checking, and it would send them to regenerate a
   sweep that already exists in `a3-08-adjacent-pairs.js` section [8]. Two files,
   one sentence each.
2. **`kappa-not-L.md`:90 carries the same superseded 4.42** that P-5 fixed: "a
   two-dimensional lower-bound sieve at sifting parameter 1+o(1) against a limit
   of about 4.42". It is a descendant of the `a3-05` sentence. Everything else
   in the corpus reads 4.2665 or 4.26645. One number, one file, not mine.
3. **`gate-multiplies.md`:504 flattens the priced gap.** "The branch of the
   answer, `0.58 ln p` against a target of O(1), does not depend on them." Nine
   lines above, its own §8 box reads 0.58 to 0.95. This is the wave-3 §8 finding
   surviving in §10 of the same file. It is arguably reading the *shape* rather
   than the constant, which is why it survived, but it is the exact string wave 3
   went hunting for. Adjudication yours.
4. **`U-FRAME.md` §9 drops the same hypothesis P-4 restored.** The word diff
   against `gate-multiplies.md` §8 shows U-FRAME's "The hole, priced" paragraph
   carrying the range, both rho readings and the no-trend clause correctly, but
   not "(PROVEN, given the measured G2, mbar and rho laws)". It does add its own
   context ("the most favourable reading the proven machinery allows"), so this
   may be a KEEP under Chris's restatement rule. Flagged rather than fixed.
5. **`LOCALIZED-GAP.md` states the same band twice at different values.** :102
   gives `M/(k ln³x)` flat in 1.2 to 1.6, which at k = 3 is `M/ln³x` in 3.6 to
   4.8; :122 gives `M/ln³x` flat at 3.2 to 3.7 out to x = 9973. The two overlap
   but do not agree, and `localized-single-alignment.md` §5 registers the band as
   [3.6, 4.8] and REFUTES it. Three statements of one band. Not mine, and it
   wants the owner of `LOCALIZED-GAP.md`.
6. **Twenty-seven `research/*.md` lack the doc-convention footer**, including one
   of mine. Either the convention is scoped to files with migrated history, in
   which case say so, or the twenty-seven want a sweep. Cheap to settle, and it
   is the sort of thing that should not be decided one partition at a time.
7. **The corpus quotes 1.57 as the G2 growth exponent in at least four places**
   outside my files, against `exponent-control.md` §5's explicit "Quote 1.57 for
   h2 and 1.54 for G2": `README.md`:144, `oeis-G2-submission.md`:59,
   `sift-limit-attack.md`:179, `FOLD-PROFILE.md`:580. `G2-STATE.md` and
   `PRIOR-ART.md` get it right. I fixed only my own (P-2). **`oeis-G2-submission.md`
   is an external-consequence artifact** and is the one that matters, which puts
   this alongside wave 3's finding that the OEIS drafts sit outside every
   instrument.
