# changelog-add-P.md — the superseded text from partition P's three files

<!-- ledger
id: Q-changelog-add-P
status: ANSWERED
todo: none
question: Which superseded text from wave-4 partition P's three files belongs in the changelog, and what does calibration against the home document find?
verdict: Fourteen defects came out of the check wave 3 recorded it had not run, and none of them is reachable by any existing gate check; the removed or rewritten text is reproduced verbatim per file for the shepherd.
-->

Wave 4, partition P. Every block below was removed from or rewritten in a working
document and is reproduced verbatim with the file and section it came from.
Nothing here is a claim about the mathematics; it is the record of how the
mathematics got to where it is. To be folded into `research/history/CHANGELOG.md`
by the shepherd, indexed by document.

The axis is calibration against the home document. Wave 3 gave these three files
history migration and an orphan sweep but no such check, and recorded that it had
not. Fourteen defects came out. None of them is reachable by any check in
`qc.js`, and four of them are cases where a document disagreed with a table
printed a few hundred lines away in its own repository.

---

## research/a3-05-bound-L.md

**§3, the fold count (RETIRED, contradicted the script).** Verbatim:

> They agree at all seven folds.

Reading 2 of `a3-05-bound-L.js` prints eight rows, folds 7 through 31, each
marked `[OK]`, and the sentence's own list gives eight qualifying sets at eight
named folds. Now "all eight folds". The other "seven" in §4 is correct and stands:
it counts the folds with L ≥ 2, which excludes fold 11.

**§7, the G2 growth exponent (RETIRED, the h2 figure quoted for G2).** Verbatim:

> The exponent
> in that reading is not settled (1.57 central, bracket 1.3 to 1.9, floor 1;
> `research/exponent-control.md`), but the ceiling does not depend on settling it

"That reading" is `G2 ≈ 0.55·(ln W)²`. The home, `exponent-control.md` §5, gives
1.57 ± 0.06 for h2 and 1.54 ± 0.09 for G2, and instructs in terms: "Quote 1.57
for h2 and 1.54 for G2." `G2-STATE.md`:666 repeats the instruction verbatim. The
bracket 1.3 to 1.9 and the floor 1 were right and are kept. The corpus carries
the same slip at `README.md`:144, `oeis-G2-submission.md`:59,
`sift-limit-attack.md`:179 and `FOLD-PROFILE.md`:580, all outside this partition
and all reported to the shepherd rather than touched.

**§7, the Zone budget (RETIRED, a derivation stated as an equivalence).**
Verbatim:

> sum_{p<=x} ln c(p) <= 2 ln x - ln 12
> at every x, equivalently the sharp per-fold rate ln c(p) <= 2 ln p / p.

Neither home claims an equivalence. `U-FRAME.md` §3: "differentiating it along
the primes, one fold at a time, gives the sharp per-fold rate".
`gate-multiplies.md` §1: "obtained by differentiating the partial-sum condition
… rather than dividing it by pi(u)". The one-way construction is restored.

**§7, the priced threshold (RETIRED, hypothesis dropped).** Verbatim:

> Priced correctly through
> section 5a step 3, the branch goes through iff **L <= 0.19 to 0.31 * p / ln p**
> on average over the ladder (`research/gate-multiplies.md` section 8).

The home states it as a box headed "**The survivor, stated as a threshold
(PROVEN, given the measured G2, mbar and rho laws).**" and adds in §10 that three
measured laws feed the constants at once, so 0.19 to 0.31 carries one significant
figure. The scope clause "on average over the ladder" had survived; the
conditional marker and the significant-figure caveat had not. Both restored.
This is the D-1 shape of wave 3 recurring on a different claim in a different
file.

**§8, the dimension-2 sifting limit (RETIRED, superseded value).** Verbatim:

> Lower bounds require s above the sifting limit,
> which for dimension 2 is about 4.42.

4.42 is Ankeny–Onishi. The corpus settled on β₂ = 4.26645028414864191641,
rigorous via Booker–Browning, in `research/dhr-verification.md`, which records at
:284 that the DH book prints β₂ ≈ 4.266 at p. 79 "with the book's own comparison
against 4.42 (Ankeny–Onishi) and 4.834 (Rosser–Iwaniec)". Every other site reads
4.2665 or 4.26645, `localized-04-maxsum.md` included. The sentence's whole point
is the distance from s = 1 to the limit, so the stale value overstated it. The
same 4.42 stands at `kappa-not-L.md`:90 and is reported rather than fixed.

**§6, the tail-fit band (RETIRED, a scope clause that did not exclude what it
claimed to).** Verbatim:

> and reading 7 fits lambda*mbar between 1.30 and 1.88 rather than 1 at
> every tile large enough to fit one.

Reading 7 fits eight tiles. T_5 returns NaN. T_7 returns 2.464 on fifteen slots,
outside the quoted band and large enough to fit a line. Only T_11 through T_29
lie in [1.30, 1.88]. The replacement names the six tiles, gives T_7's value, and
records the direction: the excluded tile lies further from 1, so the omission was
understating a reading favourable to the route.

**§9, the slot count of T_29 (RETIRED, transcription).** Verbatim:

> Fold 31 is confirmed at 4 by streaming T_29, all 214,708,853 slots

The count is 214,708,725, at thirteen other sites and forced by
`a3-04-maxsum-recursion.js`:666: "214,708,725 = 3 * prod_{7<=q<=29}(q-2) on the
nose".

**§9, the prohibition on `Lgrowth.js` (RETIRED, the script was repaired the same
day).** Verbatim, the heading:

> ## 9. The diagonal, by three routes, and a script that must not be quoted

and, in the body:

> `research/killrun.js` shares the
> routine and has been fixed; **`research/Lgrowth.js` has not, and its sweep tables
> must not be quoted until it is**, since the same routine generates the whole off
> diagonal sweep.

and, in §"What came out of it":

> Section 9 establishes the L diagonal by three independent routes and locates the
> state-machine fault that makes `research/Lgrowth.js` unusable until it is fixed.

`research/Lgrowth.js` line 1 reads "*** The old runFor() was REFUTED 2026-08-16
and has been corrected below. ***", and its lines 15 to 22 carry the refutation,
name the same bug and the same fold-29 symptom, and record the corrected diagonal
L = 2, 1, 2, 2, 2, 3, 2, 4. What remains true is narrower and is now what the
document says: any L number taken from that file **before 2026-08-16** is unsafe,
and the corrected off-diagonal sweep out to p = 127 lives in
`a3-08-adjacent-pairs.js` section [8], which found the bug independently.

One consequence had to be fixed with it. Reading 1's third route was described as

> a verbatim copy
> of the run finder in `research/Lgrowth.js`.

A reader who opens `Lgrowth.js` today finds a routine that agrees, so the
recorded disagreement reads as an error rather than as a discovery.
`a3-05-bound-L.js`:224 keeps the pre-fix routine on purpose, labelled "verbatim
copy of the run finder in research/Lgrowth.js, kept here because it is the source
of the published diagonal and it turns out to disagree". The document now says
the copy is of the routine as it then stood.

The same stale prohibition remains at `U-FRAME.md`:638 and
`a3-09-histogram-operator.md`:244, both outside this partition and both reported.
`research/history/staging/audit-uframe.md`:57 also repeats it and is correctly
frozen, being a wave-1 report.

---

## research/localized-04-maxsum.md

**§4, the M/ln³x excursion (RETIRED, value attached to the wrong x, and a scope
clause dropped).** Verbatim:

> `research/localized-single-alignment.md` §5 carries the same
> object to x = 1613, where M/ln³x reaches 6.41 and the crude band fails while the
> m̄·ln(Y/m̄) form holds.

The home reads: "It is 4.63 at x = 307, 6.41 at 739, 6.34 at 1151, 5.51 at 1613.
The excursion is one event, not a trend." So 6.41 sits at x = 739, the value at
x = 1613 is 5.51, and the home's "one event, not a trend" is the clause that
stops the breach reading as a growing violation. All three restored.

**§7, the excess over the Deficit Lemma floor (RETIRED, mislabelled quantity).**
Verbatim:

> the
> measured values sit above it by the factor R(m) ≈ 1.35 that §3's growth law
> supplies at m ∈ [32, 64].

§3's own table gives R(32) = 1.889 and R(64) = 1.629 at x = 997, so a reader
following the reference finds 1.63 to 1.89, not 1.35. The quantity at work is
marginal, not average. The script measures d(maxsum_m)/dm over m ∈ [32, 64], and
the growth law supplies exactly that as m̄ + σ·√(lnD/2m). Against the file's own
m̄ it reads 156.00/113.96 = 1.37, 233.06/163.40 = 1.43 and 387.75/261.39 = 1.48 at
x = 997, 3499 and 16001, and the growth law's prediction at x = 997 reproduces
155.9 against the measured 156.00. The replacement names the marginal quantity,
gives the three values, and says in terms that it is not R(m).

**§10, what survives (RETIRED, scope dropped and a marker misplaced).** Verbatim:

> **What survives.** The growth law of §3, which is new, exact enough to predict
> maxsum_m at any m from two numbers (m̄ and σ), and which retires U-FRAME §9's
> named hole, a proven upper bound on maxsum_m as a function of x that is not G₂
> itself: the ladder exists, it is
> `1 + (σ/m̄)√(2 lnD/m)`, and it is not the obstruction.

Two problems in one sentence. "At any m" contradicts §3, which measures the law
over m ∈ [2 lnD, 1024] and says the opposite outside it: "R/EV ≈ 3 there because
the Gaussian model is the wrong model at m = 1", with its own m = 1 row reading
R/EV = 2.980. And "a proven upper bound" describes what the hole asked for, but
sits one clause from "the ladder exists, it is …", where a reader takes the
adjective onto the delivered law. The law is MEASURED. The home agrees:
`U-FRAME.md` §9 closes the hole with "measures … unfitted, holding to 6 percent",
and never says proven. The replacement scopes the law to m above about 2 lnD,
names the m = 1 behaviour, and separates the hole's requirement from the
measurement that closed it, with the marker attached.

---

## research/level-ledger-tight.md

**Lead paragraph, the exhaustion depth (RETIRED, a constant attached to a seed
that cannot produce it).** Verbatim:

> What replaces the exponent is an exact reduction of the Level Ledger to a single
> finite quantity, that quantity computed by exhaustion up to y = 17, and a proven
> **constant** factor of 81.0 uniform in x, p and a.

§3's table is unambiguous: y = 17 gives gain 53.96 and y = 19 gives 81.04, and
the Corollary is built on R\*(19) = 53.972817. The file's own header records
"R\*(19) from `--deep`, 2717.1 s, and folded in". The lead was the pre-deep-run
sentence with the post-deep-run number pasted into it. It now names y = 19 and
records that the cheap y = 17 seed gives 53.9, which is the trade the Corollary
already states.

**§4, the ET comparison table, x = 19 row (RETIRED, superseded by the deep run).**
Verbatim, the row and its column header:

> | x | ET(x) | 2·3^{π−1} | gain | step | true sup | R\*(x) or transfer |
> | 19 | 442.58 | 4374 | 9.88 | 2.490 | 17.08 | 81.06 |

81.06 is 3·R\*(17) = 3 × 27.019392, the transfer bound from the y = 17 seed. The
script prints **53.97** in that cell, under the header "R\*(x) (x<=19) or
3^{pi-8}R\*(19)", because for x = 19 the exact R\*(19) is what belongs there. The
cell was the value it held before the deep run replaced it. Corrected, and the
column header narrowed to "R\*(x)", which is all four rows need. Nothing drawn
from the table changes: ET(19) = 442.58 exceeds the competing bound either way,
and the sentence about ET crossing the transfer bound near x = 41 stands.
