# Red team C: the tail-deficit measurement, the Scourfield read, and the two 0829 recon notes

<!-- ledger
id: Q-redteam-0829-measure-c
status: ANSWERED
todo: none
question: Do the load-bearing claims of measure-tail-deficit-0829.md, lit-scourfield-2008.md, recon-0829-farfields2.md and recon-0829-escapes.md survive independent re-derivation at the record, and are their custody, prereg, provenance and (i)/(ii)/(iii) labels intact?
verdict: No verdict of the four notes is overturned; of 61 load-bearing claims 38 CONFIRMED, 14 WEAKENED, 6 REFUTED, 3 UNVERIFIED. Worst: lit-scourfield-2008.md line 79 quotes lit-smooth-divisors.md section 6 as saying the convention has "no asymptotic machinery in this range at all", a string absent from the repository and contradicted by that section's own words, and uses it to justify a correction; measure-tail-deficit-0829.md section 2 describes a superseded embed and does not disclose the --force the header records, although embed.js --check passes on all three hashes; and note 1's reported M-P1 failure at 19 -> 23 is a single-draw artefact, reversed here on 40 draws (shuffled 296.1 sd 29.1, Markov 264.0 sd 18.4, share 34.9 percent inside the registered band). Note 2's precision correction inverts a quantifier, the open step needing o(1/ln y) against Scourfield's O(1/log x); note 3's corpus does hold the per-prime eigenvalue at lit-pdf-holt-rudd.md line 259; note 3's section 3c re-prices a family already resident as the Vaaler completion of its own Lemma V remainder. Every verdict, and most of the arithmetic, otherwise reproduces on an independently written engine.
-->

*2026-08-29. Adversarial pass over four HELD notes written the same day. Internal,
HELD, publication moratorium in force. Calibration marked on every claim.
No file other than this one was written; no git command was run.*

---

## 0. Verdict first

**61 load-bearing claims opened at the record: 38 CONFIRMED, 14 WEAKENED,
6 REFUTED, 3 left UNVERIFIED by this pass.** No verdict of any of the four notes
is overturned. `D5` stays OPEN and C3's constructive route stays REFUTED;
Scourfield 2008 still DOES NOT DELIVER; neither recon note opens a route; the
exponent band `(2, 4.26645]` is untouched by all four and by this one.

**The worst finding, and it is a corpus-integrity finding rather than a
mathematical one.** `lit-scourfield-2008.md` line 79 quotes
`lit-smooth-divisors.md` section 6 as saying the convention has "no asymptotic
machinery in this range at all", and uses that quotation to justify a correction
to that file. **The string occurs nowhere in the repository except inside that
attribution**, and the cited section says the opposite in as many words: "Not
ABSENT-PER-CONVENTION either ... Scourfield 2008 is an asymptotic, with an error
term ... That is four of our statement's features at once." A quoted sentence
attributed to a corpus file that says the reverse is the one defect that
propagates, because the next pass will read the correction and not the source.

**The worst cluster, in one paragraph of one note.**
`measure-tail-deficit-0829.md` section 2 and 2a make three misstatements about
their own embed: they quote "222 lines of output, 132.9 s" and "133.0 s per the
embed header" against a header reading `body-lines: 268` and `elapsed: 141.0 s`;
they quote an invocation without `--force` against a header carrying
`forced: 2026-08-29, 1 of 433 figures in the replaced block not reproduced
(first: 112.6)`; and they say the per-level seconds "are scrubbed as wall clocks
by `qc/tailfmt.js`" when the block prints the whole column and the force fired
on one of its figures. The embed itself is clean: `embed.js --check` returns
code-sha256, body and out-sha256 all matching. The custody paragraph describes a
superseded embed and was not updated when section 7 grew the block.

**The one finding that changes what a note says about its own data.** Note 1
reports the registered prediction M-P1 as FAILED at the fold 19 -> 23, on a
share of -16.7 percent, and names in the same section the check that would price
it as "the cheap one, not run". Forty draws of each word were taken here with an
independently written sampler and an explicit fold: the shuffled maximum is
296.1 with sd 29.1 and the Markov maximum 264.0 with sd 18.4, so the note's 276
is the 32.5th percentile of one law and its 288 the 90th of the other, and the
share from the two draw means is 34.9 percent, inside the registered band and
beside the registered point of 40. **M-P1 and M-P2 hold at all three folds once
the statistic is averaged.** Note 1's own verdict is unaffected, since it rests
on the tail-count column, which reproduces here inside one standard deviation.

**Three smaller reversals, each affecting a summary line rather than a body.**
Note 1's "C rises with the abscissa at every level" is contradicted by its own
table at x = 31 (28.3, 38.8, 42.1, 39.4). Note 2's ledger says "three gaps, each
independently fatal" when its own section 6 records the third as AMBIGUOUS, and
its precision correction inverts a quantifier: the open step needs
`o(1/ln y)` and Scourfield supplies `O(1/log x)`, one epsilon short, so match
row 8's "MATCHES" is a near miss. Note 3's ledger says the corpus "carries no
eigenvalue" when `lit-pdf-holt-rudd.md` line 259 carries
`a_j = (p-j-1)/(p-2)` at page 18, verbatim.

**What reproduced exactly, and it is most of the arithmetic.** An independent
sieve, an independent explicit fold (copy `q` times, strike residues, histogram
the result, never touching the transfer operator), an independent M1 and an M2
written from the physics rather than from the note's `nu_q` count reproduced,
to the last printed digit: the whole six-row deficit table, the five-row
iterated model table, four of five one-fold rows including the share column, the
eight stage-split rows at x = 23 and x = 29, the `M2/truth` column at 23 -> 29,
and R1's hand evaluation. Note 3's `[SCRATCHPAD-GRADE]` `a2` table reproduced to
every printed digit on an independent sieve. Note 2's PDF digest, page count and
byte count reproduce, and its three page transcriptions are verbatim against
independently rendered images.

---

## 1. Claim by claim

### 1a. `measure-tail-deficit-0829.md`

Instruments used for the re-derivation, all written in the red team scratchpad
and none ported from the producer: a segmented mod-6 wheel sieve that strikes
`6j + 5` and `6j + 7` by modular inverse per prime, an explicit fold that copies
the grain `q` times and strikes the residues `0` and `q - 2` and then histograms
the result (so the transfer operator is never used), an independent M1, and an
independent M2 written from the physics (a survivor at residue `a` not in
{0, 2}, the slot at accumulated gap `6k` dying when `a + 6k` is `0` or `2` mod
`q`) rather than from the note's `nu_q` count. The two M2 formulations agree to
the last printed digit at every level, which is a second and model-free check on
R5.

| # | claim, as the note states it | verdict | reason |
|---|---|---|---|
| 1 | producer formally embedded, block bit-honest | **CONFIRMED** | `node research/qc/embed.js --check research/measure-tail-deficit-0829.js` returns code-sha256 matches, body matches out-sha256, out-sha256 matches |
| 2 | §2a deficit table, 6 rows of `mbar`, `ln D`, `mbar ln D`, `delta` | **CONFIRMED** | 30 figures reproduced to the last digit from `W`, `D` and the ladder alone |
| 3 | §2b operator agrees with the sieve bin for bin, mass `D(q-2)`, max = ladder | **CONFIRMED at 3 of 5 folds** | the explicit fold gives 0 disagreeing bins, exact mass and max 108 / 150 / 204 at 13->17, 17->19, 19->23; 23->29 and 29->31 were not re-run here and rest on the embed |
| 4 | §3b, both models iterated from `h_13`, 5 levels | **CONFIRMED** | 144/138, 222/204, 318/288, 426/390, 552/510 and all ten `delta` columns reproduced exactly; mass 1.000000000 and mean equal to `mbar` at every fold for both models |
| 5 | §3c one fold from the true previous histogram, with the share column | **CONFIRMED at 4 of 5 folds** | 146.1/142.0, 215.8/198.8, 293.7/290.3, 377.2/335.8 and the shares 10.8, 25.9, 3.8, 34.7 percent reproduced exactly; 29->31 not re-run |
| 6 | §3d `M2/truth` = 308.7045 at the deepest abscissa of 23->29 | **CONFIRMED** | reproduced exactly, together with the whole `u = 4..8` column at that fold |
| 7 | §3e stage split, the 8 rows at x = 23 and x = 29 | **CONFIRMED** | 86.5/8.7/4.8, 73.1/10.0/16.9, 61.4/6.8/31.7, 46.9/4.8/48.2, 81.4/4.6/14.0, 66.5/6.3/27.2, 49.2/6.1/44.7, 38.8/6.6/54.6 reproduced exactly; all 12 rows sum to 100 percent |
| 8 | R1's hand evaluation 0.902, 0.907, 0.912 | **CONFIRMED** | 0.9022, 0.9071, 0.9119 |
| 9 | the headline: M2 above the measurement at all three levels, the "classification was wrong" arm fires, the vacuity falsifier does not | **CONFIRMED** | 0.6461, 0.6746, 0.7021 against 0.4577, 0.4463, 0.4791; separations 0.0673, 0.0623, 0.0578, all above 0.05 |
| 10 | §7b "M-P1 fails at 19->23", share -16.7 percent | **REFUTED** | see 1b below: over 40 independent draw pairs the shuffled maximum is 296.1 with sd 29.1 and the Markov maximum 264.0 with sd 18.4; the note's 276 is the 32.5th percentile of the shuffled law and its 288 the 90th of the Markov law, and the share from the two draw means is 34.9 percent, inside the registered band and beside the registered point 40 |
| 11 | §5b shuffled maxima 276, 354, 426 as a measurement | **WEAKENED** | three single draws. At 19->23 the draw sd is 29.1 over 40 draws against a shuffle-to-truth gap of 92. The SIGN is robust (minimum over 40 draws 246, still above the true 204) and the draw mean 296.1 exceeds the reported 276, so the order effect is if anything larger than the note reports; the SIZE is one draw wide |
| 12 | §7b tail-count share 69.9 / 41.1 / 27.8 at 19->23 | **CONFIRMED, with a scatter the note does not price** | 20 independent draw pairs give 72.3 (sd 8.8), 44.3 (sd 5.2), 32.5 (sd 4.6) percent at u = 5, 6, 7; the note's single-pair readings sit inside one sd at all three. The tail-count statistic survives where the maximum statistic did not |
| 13 | §3e stage B is "what the qualifying-gap constraint buys at fixed histogram" | **WEAKENED** | B is a NET of two opposing terms, see 1c |
| 14 | §3e "C rises with the abscissa at every level" | **REFUTED by the note's own table** | at x = 31 the C column reads 28.3, 38.8, 42.1, 39.4 over u = 6..9, so it falls at the last row; the A column is non-monotone there too (67.4, 57.2, 53.6, 55.5) |
| 15 | §7b "`c_tail` declines with the abscissa inside every fold" | **WEAKENED** | at 19->23 the printed row is 59.9, 69.9, 41.1, 27.8 over u = 4..7, so it rises first; the sentence starts its quoted decline at u = 5 without saying so |
| 16 | §5b "39.4 to 54.6 percent at the deepest abscissa" | **WEAKENED** | the truth tail counts at those rows, measured here and absent from the note, are 6 at x = 23 u = 7 and **2** at x = 29 u = 8. The top of the quoted range is a two-gap row; moving that count to 1 or to 5 moves C to 57.4 or 50.3 percent |
| 17 | §2 custody, "222 lines of output, 132.9 s", §2a "133.0 s per the embed header" | **REFUTED** | the header on disk reads `body-lines: 268` and `elapsed: 141.0 s`, and the block's own last line reads `elapsed 140.9 s` with `Total sieve time 113.4 s`. The note's figures match a superseded embed, not the one the file carries |
| 18 | §2's embed invocation, quoted without `--force` | **REFUTED as an omission** | the header carries `forced: 2026-08-29, 1 of 433 figures in the replaced block not reproduced (first: 112.6)`. The note never mentions the force. The substance is benign, 112.6 being the previous run's `Total sieve time`, but the disclosure is absent |
| 19 | §2a "the per-level seconds are scrubbed as wall clocks by `qc/tailfmt.js`" | **REFUTED** | the embedded block prints the `secs` column in full (0.0 ... 0.2, 3.2, 110.0) and the forced re-embed fired on exactly such a figure |
| 20 | §1b and §2a, "the reciprocals of `gap-spectrum-01.js`'s `null/true` column" | **WEAKENED** | the reciprocals are 0.4468, 0.4708, 0.4560, 0.4577, 0.4462, 0.4792; §2a's exact column is 0.4469, 0.4707, 0.4559, 0.4577, 0.4463, 0.4791. Five of six differ in the fourth place and §2a acknowledges only the x = 13 case. This is not evidence of back-filling, since both are computable from `W`, `D` and the ladder without the producer, but the provenance sentence as written is inaccurate |
| 21 | §7a "a point of 0.5437" in `delta` at @31 | **WEAKENED, arithmetic nit** | 395 / 726.414 = 0.5438, and the unrounded 394.8 gives 0.5435; 0.5437 is neither |

### 1b. The 19 -> 23 draw scatter, measured

The note's §7b closes with "a second Markov draw at a different seed would price
the scatter that §7b blames for the 19 -> 23 failure, and was not taken", and
the producer's reading 14 repeats it. This pass took 40 draws of each word, with
an independently written sampler (marginal start, cumulative row, binary search)
and the explicit fold rather than the `nu_q` operator [MEASURED, 40 draws, one
fold, one level]:

| statistic at 19 -> 23 | note, one draw | this pass, 40 draws |
|---|---|---|
| shuffled maximum | 276 | mean 296.1, sd 29.1, range [246, 384]; P(draw <= 276) = 0.325 |
| Markov maximum | 288 | mean 264.0, sd 18.4, range [234, 324]; P(draw >= 288) = 0.100 |
| share `c` | -16.7 percent, M-P1 FAILED | 34.9 percent from the two draw means, M-P1 and M-P2 both HELD |

**The reading.** The M-P1 failure at 19 -> 23 is a single-draw artefact of an
unlucky pair, a shuffled draw in the lower third of its law and a Markov draw in
the upper tenth of its. Averaged over draws the registered prediction holds at
all three folds rather than at two. This does not change §7's verdict, which
already rests on the tail-count column, and it does not touch §5's verdict at
all. It does mean the note reports a registered prediction as failed when the
statistic it failed on is dominated by scatter the note itself identified and
did not price [MEASURED].

**A consequence for the pre-registration.** §7a's registered M-P2 bands
([218, 269], [277, 344], [364, 418]) were computed FROM the single shuffled
draws 276, 354 and 426. A band whose endpoints are themselves an unpriced
one-draw statistic with sd 29 is not a fixed target, and the arithmetic that
declares 288 "MISSED high" against [218, 269] is comparing one draw to a band
built on another draw of a quantity 30 units wide. That is a defect of the
pre-registration, not of the run.

### 1c. Stage B is a net of two opposing terms

§1a of the note states that "each old slot has exactly two of its `q` copies
struck, so the per-slot death rate is exactly `2/q` in both models" and that the
models "differ only in the CORRELATION between adjacent deaths". The first half
is true unconditionally and false conditionally, which matters because the run
recursion is conditional. In the exact CRT thinning, conditional on the previous
slot surviving (its residue uniform on the `q - 2` admissible values), the next
slot dies with probability `2/(q - 2)` for a generic accumulated gap, not `2/q`.
M1's run recursion uses `2/q` at every step. So `ln(M1/M2)` carries an
elementary rate difference as well as the qualifying-gap correlation, and the
two have opposite signs.

Measured against a conditional-rate-matched uncorrelated control M1b, which is
independent thinning at `r = 2/(q - 2)` [MEASURED, two folds]:

| fold | u | B = `ln(M1/M2)` | rate term `ln(M1/M1b)` | correlation term `ln(M1b/M2)` |
|---|---|---|---|---|
| 19 -> 23 | 5 | 0.3112 (10.0 %) | -0.1384 (-4.4 %) | 0.4496 (14.4 %) |
| 19 -> 23 | 6 | 0.3324 (6.8 %) | -0.1760 (-3.6 %) | 0.5084 (10.5 %) |
| 19 -> 23 | 7 | 0.3435 (4.8 %) | -0.2015 (-2.8 %) | 0.5450 (7.7 %) |
| 23 -> 29 | 5 | 0.1292 (4.6 %) | -0.0859 (-3.1 %) | 0.2151 (7.7 %) |
| 23 -> 29 | 6 | 0.2738 (6.3 %) | -0.1138 (-2.6 %) | 0.3876 (8.9 %) |
| 23 -> 29 | 7 | 0.4336 (6.1 %) | -0.1347 (-1.9 %) | 0.5682 (8.0 %) |
| 23 -> 29 | 8 | 0.6935 (6.6 %) | -0.1554 (-1.5 %) | 0.8489 (8.1 %) |

**The caveat, first and it is real.** M1b is not a legitimate model of the fold:
its mean gap is 28.311 against the required 28.054 at q = 23 and 30.299 against
30.132 at q = 29, so it fails the mean-gap identity by about 0.9 and 0.6 percent
and exists only as a diagnostic that isolates the rate sensitivity. The split is
therefore [MEASURED] as a sensitivity, not as a decomposition with the standing
of A / B / C.

**What it says.** The qualifying-gap suppression read against a
conditional-rate-matched control is 7.7 to 14.4 percent of `ln(null/truth)`,
1.3 to 1.6 times the note's reported B of 4.6 to 10.0 percent, because the rate
term works against it. The note's conclusion is unchanged, since C reaches 44.7
and 54.6 percent at the same folds, but "4.0 to 10.0 percent" understates the
constraint and the ledger verdict quotes it as the constraint's size.

### 1d. One asymmetry in the headline comparison

The ledger verdict sets B's "4.0 to 10.0 percent" against C's "39.4 to 54.6
percent". B's range is a maximum over all twelve rows of §3e; C's is read only at
the deepest row of each level. At matched shallow rows the ordering reverses: at
x = 23, u = 4 the note's own table has B = 8.7 percent against C = 4.8 percent.
The claim that the constraint "is not where the deficit is" is a far-tail
statement and is not qualified as one in the verdict line [WEAKENED].

### 1e. `lit-scourfield-2008.md`

The named PDF survived in the session scratchpad. Its identity was re-checked
and its two load-bearing pages were re-rendered here at 200 dpi by `pdftoppm`
and read as images, independently of the note's own 170 dpi render, and the
zbMATH record was re-fetched from the API rather than read from the note's saved
JSON.

| # | claim | verdict | reason |
|---|---|---|---|
| 1 | PDF identity: 535,765 bytes, 22 pages, `sha256 862c1f51c8c125a0ee08c2a3461a4a87b4c0371c6bca0f89194b2763859143a1` | **CONFIRMED** | byte count, page count and digest all reproduce; the Lapkova artifact's `sha256 dcd6b8cc...` and 158,032 bytes also reproduce |
| 2 | (1.1) as transcribed, page 84 | **CONFIRMED verbatim** | the page image reads `sum_{n<=x} #{m <= x : m \| f(n)} = Cx(log x)^l (1 + O(1/log x))`, preceded by "When `f = prod_{i=1}^{l} f_i` where the `f_i` are pairwise coprime and of degree at least 2 we proved in [13] that" |
| 3 | the friable companion, `y >= exp((log log x)^{5/3+eps})`, `eps > 0`, and the Hanrot-Tenenbaum-Wu attribution | **CONFIRMED verbatim** | read at the image, including the `P(m) := max_{p\|m} p <= y` subscript that §3.3 says the text layer mangled |
| 4 | the standing hypothesis at page 83, "the degree of each irreducible factor is at least 2" | **CONFIRMED verbatim** | first line of section 1 on the rendered page |
| 5 | the page-84 display "each `f_i in Z[x]`, is irreducible and of degree `>= 2`, the `f_i` are pairwise coprime, and `1 <= r_1 <= ... <= r_l`" | **CONFIRMED verbatim** | rendered page |
| 6 | reference [13] is the 2008 chapter, LMS Lect. Note Ser. 352, CUP 2008, 286-311 | **CONFIRMED verbatim** | page 104 of the same PDF, rendered here |
| 7 | the zbMATH author summary, transcribed in §3.1 | **CONFIRMED verbatim**, with one omission | the API at `api.zbmath.org/v1/document/6093091` returns the identical text, MSC 11N37 / 11N25 / 11N64, and `reviewer.name: null`. The note's transcription drops the record's closing line "For the entire collection see [Zbl 1139.11002]", which is immaterial |
| 8 | gap 1, divisor range: (1.1) has `m <= x` against the open step's `n > 2L` | **CONFIRMED** | both author sources lock the divisor bound to the same `x` as the variable range; the open step's `|C| < L` with `n in (2L, L^3)` cannot be reached by any specialisation of a theorem whose two ranges are the same symbol |
| 9 | gap 2, weight 1 against the branch-dependent `w(n,C)` | **CONFIRMED** | (1.1) counts `#{m <= x : m \| f(n)}`, and the zbMATH summary says "the number of positive divisors"; neither is weighted |
| 10 | gap 3, degree `>= 2` against three linear factors | **CONFIRMED as AMBIGUOUS, and the note's own §6 says so; the ledger line does not** | see 1f |
| 11 | ledger and §0, "Three gaps, each independently fatal" | **WEAKENED** | §0 point 3 and §6 both record gap 3 as unresolved between two author-sourced statements. Two gaps are fatal; the third is ambiguous, and the note says so everywhere except in the two places a reader reads first |
| 12 | the correction to `lit-smooth-divisors.md` §5, quoting its §6 as saying the convention has "no asymptotic machinery in this range at all" | **REFUTED** | that string occurs nowhere in the repository except inside this note's own attribution of it. `lit-smooth-divisors.md` §6 says the opposite in as many words: "Not ABSENT-PER-CONVENTION either ... **Scourfield 2008 is an asymptotic, with an error term**, for a friability-restricted divisor sum over values of a squarefree reducible monic polynomial. That is four of our statement's features at once." The correction is offered against a quotation that does not exist |
| 13 | the narrow half of the same correction, that §5's precision row omits `O(1/log x)` | **CONFIRMED, and it is small** | §5's row does read "`(log y)^{o(1)}` (Tenenbaum A), `asymp` (Ford, Koukoulopoulos)" and does not carry Scourfield, although the same table's divisor-range row does ("`m <= x` (Scourfield)"). §5's prose already names the range, not the precision, as the wall |
| 14 | §4 row 8, precision "MATCHES" | **WEAKENED, and it partly retracts the correction** | see 1g |
| 15 | §1's "`varE-theta2-proof.md` section 6 and `paper/variance-note.md` section 10 carry the same display" | **WEAKENED** | `varE-theta2-proof.md` §6's display carries neither `(n,30) = 1` nor `n` squarefree; those two conditions come from `lit-smooth-divisors.md` §5. The note discloses them a paragraph later as "two further conditions ... carried by the display", which is not where they come from |
| 16 | §1's `u in (2, 6]` | **CONFIRMED, and it corrects the live document** | `n in (2L, L^3)` with `ln y = (1/2) ln L` gives exactly `u in (2, 6]`. `varE-theta2-proof.md` §6 says "with a smoothness constraint at `u = 2`", which is the lower endpoint only. The note is right and does not say that the source it cites is wrong |
| 17 | §2's ten channels | **NOT RE-RUN, except zbMATH** | one channel was re-run and reproduced. The other nine are recorded here as UNVERIFIED rather than confirmed; the note's own §6 already flags MathSciNet UNREACHED and no library holding tried |

### 1f. The degree condition, weighed

Both readings the note offers are available and it declines to choose. The
evidence favours the zbMATH reading slightly, and the note does not say so:
the 2016 sentence opens "When `f = prod f_i` where the `f_i` are pairwise
coprime and of degree at least 2", inside a paper whose section 1 first line
already imposes "the degree of each irreducible factor is at least 2" on
everything it discusses, so the clause is doing the work of restricting to that
paper's own setting; the zbMATH summary, by contrast, is a summary of the 2008
chapter and imposes only monic and no repeated factor. That is an argument, not
a reading of the chapter, and it does not move the verdict, since gaps 1 and 2
are confirmed by BOTH author sources and either one settles it [CONJECTURED].

### 1g. The precision axis is one epsilon short, so the correction over-reaches

The open step's admissible error is `o(ln^2 y)` (the note's own §1: "for every
`eps > 0` there is `y_0` such that ... `|E(L,y)| <= eps ln^2 y`") against a main
term of order `ln^3 y`. The required RELATIVE precision is therefore
`o(1/ln y)`, not `O(1/ln y)`. The note's §1 writes "The required relative
precision is therefore `O(1/ln y)`, and no better", which inverts the ordering:
`o` is stronger than `O`, not weaker.

Equation (1.1) supplies relative `O(1/log x)`. An error term of exactly
`c/log x` with `c > 0` fixed produces an absolute error of order `c ln^2 y`,
which fails `|E| <= eps ln^2 y` for every `eps < c`. So on the precision axis
Scourfield's restatement is **near miss, not match**: it is the right register
and one epsilon short of the requirement, and §4 row 8's "MATCHES" and §0's
"exactly the relative precision the open step needs" both over-state it
[PROVEN, by the arithmetic of the two quantifiers as the note itself states
them]. The verdict DOES NOT DELIVER is unaffected, since rows 2 and 5 are
independent of this.

### 1h. `recon-0829-farfields2.md`, six wall-address rows opened at the record

| # | claim | verdict | reason |
|---|---|---|---|
| 1 | the bank: Holt-Rudd print the full spectrum, `a_j = prod_{17<=q<=p}(q-j-1)/(q-2)`, and "this corpus's prior-art record ... carries no eigenvalue, no closed form and no rate" | **WEAKENED on "no eigenvalue"; CONFIRMED on the rest** | `research/history/staging/lit-pdf-holt-rudd.md:259` already carries, verbatim and page-numbered, "M_J written out as a bidiagonal matrix with `a_j = (p-j-1)/(p-2)`, `b_j = j/(p-2)`, p.18". For a bidiagonal matrix the diagonal entries are the eigenvalues, so the per-prime eigenvalue IS on disk. What is absent is the product-over-primes form, any numerical value and the rate. The note's grep covered `a3-09-histogram-operator.md` and `PRIOR-ART.md` and did not cover the corpus's own page-level reading of the same section 5.1 |
| 2 | `grep -i eigenvalue` over `a3-09-histogram-operator.md` and `PRIOR-ART.md` returns nothing | **CONFIRMED** | both return 0 |
| 3 | `grep -ri "spectral gap"` over `research/` and `paper/` returns one hit, in `import-bfree.md` | **CONFIRMED** | the only other hits are the two 2026-08-29 recon notes themselves |
| 4 | `PRIOR-ART.md` line 194 names "transfer matrix `M_J`, binomial eigenvectors, 'driving terms'" at 1408.6002 section 5, 2014 | **CONFIRMED verbatim** | line 194 reads exactly that |
| 5 | the `a2 . ln z` table 2.816534 / 2.819348 / 2.820118 / 2.820203 at `z = 1e4..1e7`, and `a2 = 0.3058012919 / 0.2448854878 / 0.2041269181` | **CONFIRMED** | reproduced here on an independent sieve to 3e6: `a2 = 0.3058012919, 0.2448854878, 0.2041269181` and `a2 ln p = 2.8167, 2.8194, 2.8201`, agreeing to every digit printed. The extrapolation `2.820203/ln(999999999989) = 0.1020657` against the printed `0.10206751799779` also reproduces at a relative `1.8e-5` [MEASURED, independent of the note's `a2rate.py`] |
| 6 | wall address 1, the mixing rate `1/ln z` against killer 2's `eps < 1/W` | **CONFIRMED** | `attack-wrongdirection-audit.md` section 1 Axis C reads verbatim "The line sits at empty-density `eps = 1/W = e^{-(1+o(1))w}`, not at any rate polynomial in `w`". The note writes `x` where the audit writes `w`; same object |
| 7 | wall address 1, "the state space truncates below `G2`", `a3-09` quoted as "they restrict to spans `\|s\| < 2p` throughout" | **CONFIRMED verbatim** | `a3-09-histogram-operator.md:33`, and its ledger verdict at line 8 says the same |
| 8 | wall address 2, the `l2 -> l2` versus `l1 -> l2` rejection, quoted from `import-map-construction.md` line 72 | **CONFIRMED verbatim at line 72** | "both are `l2 -> l2` devices, and the wall's address is `l1 -> l2`" |
| 9 | wall address 3, exponent pairs: `IMPORT-MAP.md` row 15's THEOREM column struck because Theorem 10's range condition reads `M > W^{1/12}` | **CONFIRMED** | row 15 at `IMPORT-MAP.md:165` says exactly that, and marks the row LANDED 2026-08-28 with no route |
| 10 | the `(ii)` labels on 3b, 3c, 3d rest on `attack-wrongdirection-audit.md` section 2 item 6, `need_sharp/z^2` = 0.4913 to 0.6144 at `z = 13..43` | **CONFIRMED verbatim** | audit line 83, including the split verdict (YES on `R_H` at the operative window, NO on the H-free potential) |
| 11 | `sift-limit-attack.md` supports the operative point `s = 3.0`, `u ~ 2.16 to 2.48`, the decoupled target 2.649, and "the almost-all exponent is 0" | **CONFIRMED** | lines 313, 296 and 557 of `research/sift-limit-attack.md`. The note cites the file bare; it lives at `research/`, not in staging, and the bare-name convention is the corpus's |
| 12 | "eight fields priced" | **WEAKENED, and the note discloses it** | section 0 point 3 says six of the eight collapse onto a landed row or onto section 2's two sentences. Only 3c and 3e carry new material, and 3c is itself a partial re-price (see section 5) |

### 1i. `recon-0829-escapes.md`, six wall-address rows opened at the record

| # | claim | verdict | reason |
|---|---|---|---|
| 1 | row 5a, Green-Tao print the twin system as infinite complexity, Annals 171 (2010) p. 1760 | **CONFIRMED verbatim in the corpus** | `import-transference.md:52-53` carries "The system `Psi(n_1) := (n_1, n_1+2)`, which counts twin primes, has infinite complexity", and line 55 the `t > 1` sentence. The note reads the corpus custody quote rather than the PDF and says so |
| 2 | row 5a, no minor arcs exist, `supp That = W` | **CONFIRMED** | `recon-0828-farfields.md` section 2a proves it in one line, checked here: the local factor `1 + e(2v/q)` vanishes only when `4v = q (mod 2q)`, impossible for odd `q` |
| 3 | row 4e, the boundary is `eps = 1/W`, and the measured `8.38e-6` against `1.03e-7` at @19, a factor 81 | **CONFIRMED** | the boundary at `attack-wrongdirection-audit.md` section 1 Axis C; the measured pair verbatim at `object-bridge-read-0829.md:365`, "measured 8.38.10^-6 at @19 against the decision threshold 1.03.10^-7, a factor 81". `paper/anchored-note.md` exists and the citation is a bare name, not a dangling one |
| 4 | row 4f, `d(q_1)` misses the tolerable slack by 174 at @11 rising to 70,576 at @23 | **CONFIRMED verbatim** | `row7-recon.md` ledger verdict and lines 20-21 and 250-254; the underlying figures are also in `import-talagrand-01-price-c.js` |
| 5 | row 5f, no spectral gap, `min \|fhat_q(v)\| >= 2 sin(pi/(2q))` at every frequency | **CONFIRMED verbatim** | `recon-0828-farfields.md` section 2a: "`min \|f-hat_q(v)\| = 2 sin(pi d_q / q)` for the `v` whose phase is nearest a quarter turn, which is at least `2 sin(pi/(2q))`". The twelve measured values there are `[SCRATCHPAD-GRADE]`; the note quotes only the closed-form bound, so the rung transfers correctly |
| 6 | "Hoheisel, absent from every markdown file, checked by grep across `research/` and `paper/`" | **CONFIRMED** | `grep -ril hoheisel research/ paper/` returns only `recon-0829-escapes.md` itself |
| 7 | Granville-Soundararajan is not killer 3 in print, is adverse-direction, and is already cited twice | **CONFIRMED as to the corpus half, UNVERIFIED as to the source** | the corpus does carry it, and `maier-matrix.md` section 8 plus `REFUTED.md` carry the `eta <= 1/100` withdrawal. The reading of the theorem's own scope rests on `special-levels-recon.md` section 1d's earlier custody, not on a page opened this pass, and the note says so in its section 1 channel table |
| 8 | the verdict's arithmetic, nineteen escapes, fourteen failing a hypothesis check, twelve on a corpus fact | **CONFIRMED as internally consistent** | section 6's table has nineteen rows; the five non-failures named in section 0 (3d OPEN, 3f no escape either way, 4c reversed, 5d adverse, 5e vacuous) leave fourteen |
| 9 | the `(i)/(ii)/(iii)` frame | **NOT USED IN THIS NOTE** | `recon-0829-escapes.md` carries no `(i)/(ii)/(iii)` labels at all. Its rows are graded by killer and by landing killer instead. That is a gap rather than an error: rows 3d and 3e in particular name conclusions ("an i.o.-and-some-pair conclusion suffices") whose audit label is settled at `attack-wrongdirection-audit.md` section 2 items 3 and 10, and carrying the label would cost one column. See section 3 |

---

## 2. Custody and prereg integrity

### 2a. `measure-tail-deficit-0829.md`, custody

**The embed is clean and the note's description of it is not.**

`node research/qc/embed.js --check research/measure-tail-deficit-0829.js`
returns three matches: `code-sha256 matches`, `body matches out-sha256 - the
pasted block is bit-honest`, `out-sha256 matches`. So every figure quoted from
the OUTPUT block is bound to a run of the code on disk [VERIFIED].

Three defects sit on top of that clean check.

1. **The note describes a superseded embed.** Section 2 reads "222 lines of
   output, 132.9 s"; section 2a reads "Runtime: **133.0 s for the whole run**,
   per the embed header". The header on disk reads `body-lines: 268` and
   `elapsed: 141.0 s`, and the block's own closing lines read
   `elapsed 140.9 s` and `Total sieve time 113.4 s`. The most likely reading,
   and it is the innocent one, is that section 2 was written against the embed
   that existed before section 8 (the Markov section) was added, and was never
   updated when the block grew from 222 lines to 268. It is still a
   hand-transcribed figure attributed to a header that does not carry it, which
   is the failure mode `CLAUDE.md` names by name.
2. **The `--force` is undisclosed.** The header carries
   `forced: 2026-08-29, 1 of 433 figures in the replaced block not reproduced
   (first: 112.6)`. Section 2 quotes the invocation as
   `node research/qc/embed.js --timeout 7200 research/measure-tail-deficit-0829.js`,
   with no `--force`, which could not have produced that header. The substance
   is benign: 112.6 is the previous run's `Total sieve time`, now 113.4, a wall
   clock and nothing else. The disclosure is the point, not the substance.
3. **Section 2a's account of why the wall clocks are safe is wrong.** It says
   the per-level seconds "are scrubbed as wall clocks by `qc/tailfmt.js`, so
   they are not quoted here". The block prints the whole `secs` column
   (`0.0 ... 0.2, 3.2, 110.0`) and prints `Total sieve time 113.4 s`, and the
   guard fired on precisely one of those figures. Nothing was scrubbed.

### 2b. `measure-tail-deficit-0829.md`, pre-registration

**The ordering claim cannot be checked by this pass, and the note says so.**
Section 0 and section 6 D6 both record that custody is by disk order and that
the file's own git history is the only evidence. No git command may be run here,
so the ordering of section 1 against the producer, and of section 7a against the
producer's section 8, is recorded as **UNVERIFIED** rather than confirmed.

What can be checked is whether either pre-registration contains a number that
only the run could supply. Both survive that test, with one provenance
inaccuracy and one structural defect.

- **Section 1b's target numbers do not come from where the note says.** It
  quotes 0.4577, 0.4463, 0.4791 "as the reciprocals of `gap-spectrum-01.js`'s
  `null/true` column". The reciprocals of the rounded column are 0.4468, 0.4708,
  0.4560, 0.4577, **0.4462**, **0.4792**; the exact values are 0.4469, 0.4707,
  0.4559, 0.4577, **0.4463**, **0.4791**. Five of the six differ in the fourth
  place and section 2a acknowledges only the `x = 13` case. **This is not
  evidence of back-filling**: all six are computable to any precision from `W`,
  `D` and the exact ladder, none of which needs the producer. The sentence is
  inaccurate, not the numbers.
- **Section 7a's registered band is built on an unpriced one-draw statistic.**
  M-P2's bands [218, 269], [277, 344] and [364, 418] are the shuffled maxima
  276, 354 and 426 minus 10 to 80 percent of the shuffle-to-truth gap. The
  shuffled maximum at 19 -> 23 is measured here at sd 29.1 over 40 draws, which
  is wider than the whole lower half of that band. A pre-registration whose
  target moves by 30 units between draws is not a fixed target, and the
  "MISSED high" verdict at 19 -> 23 is an artefact of comparing one draw to a
  band built on another (section 1b) [MEASURED].
- **Every other registered arm scores as the note scores it.** R1's band miss at
  @23, R2's three misses in the heavy direction, R2b's sign held and trend
  refuted, R3, R5, and the non-firing of the dominating vacuity falsifier were
  all reproduced here from the independent engine.

### 2c. Provenance, notes 2 to 4

| note | provenance check | verdict |
|---|---|---|
| `lit-scourfield-2008.md` | the named PDF survived in the session scratchpad; `sha256 862c1f51...`, 535,765 bytes, 22 pages all reproduce, and the Lapkova artifact's digest and byte count reproduce too. Pages 83, 84 and 104 were re-rendered here at 200 dpi and read as images; every transcription in sections 3.2 and 3.4 is verbatim. The zbMATH record was re-fetched from `api.zbmath.org` and its summary text, MSC list and null reviewer all reproduce | **CONFIRMED.** Custody is the strongest of the four notes |
| `lit-scourfield-2008.md`, the nine other channels | not re-run | **UNVERIFIED**, and the note's own section 6 already records MathSciNet UNREACHED, two mirrors declined, and no library holding tried |
| `recon-0829-farfields2.md` | the Vaaler PDF and the 1408.6002 PDF are hashed in section 6 and were not re-fetched here. The `a2rate.py` table, marked `[SCRATCHPAD-GRADE]`, was reproduced independently to every printed digit, which is stronger than its own label | **CONFIRMED where re-derivable**; the `[SOURCED]` verbatim quotations from 1408.6002 section 5.1 and Table 1 are **UNVERIFIED** here, since the PDF was not re-fetched |
| `recon-0829-escapes.md` | opens no PDF at all and says so; every row is a corpus citation or MEMORY. The six corpus citations opened here are verbatim at the cited file | **CONFIRMED as to the corpus half.** The MEMORY rows (Hoheisel's exponent, Linnik's `L`, the three Linnik principles) stay MEMORY |

---

## 3. Proposed edits

This note edits no file. Every edit below is a proposal for the holder of the
target file. No em dashes are used in any replacement text.

### 3a. To `research/history/staging/measure-tail-deficit-0829.md` (APPLY)

**E1, line 191, the superseded embed figures.**

old: ``research/measure-tail-deficit-0829.js`; 222 lines of output, 132.9 s, assertion``

new: ``research/measure-tail-deficit-0829.js --force`; 268 lines of output, 141.0 s by the header and 140.9 s by the script's own clock, assertion``

**E2, line 206, the runtime attributed to the header.**

old: `Runtime: **133.0 s for the whole run**, per the embed header, against the`

new: `Runtime: **141.0 s for the whole run**, per the embed header, of which 113.4 s is the sieve, against the`

**E3, line 209, the scrubbing claim, which is false.**

old: ``secs` column and are scrubbed as wall clocks by `qc/tailfmt.js`, so they are not``

new: ``secs` column, which is printed in full and is a wall clock, so a re-embed on different hardware needs `--force`; that is what the header's `forced` line records, and the one figure it names, 112.6, is the previous run's sieve total. The per-level seconds are not``

**E4, new sentence after line 209's paragraph, disclosing the force.**

new: `**The `--force`, disclosed.** The embed header carries `forced: 2026-08-29, 1 of 433 figures in the replaced block not reproduced (first: 112.6)`. One figure in 433 changed between runs and it is the sieve's total wall clock. `node research/qc/embed.js --check` on the file as it stands returns code-sha256, body and out-sha256 all matching, so the block is bit-honest against the code on disk [VERIFIED, red team C].`

**E5, line 116, the provenance of the target numbers.**

old: `0.4791 (@31) as the reciprocals of `gap-spectrum-01.js`'s `null/true` column,`

new: `0.4791 (@31), computed exactly from `W`, `D` and the ladder and agreeing with the reciprocals of `gap-spectrum-01.js`'s `null/true` column to that column's own rounding (the reciprocals read 0.4577, 0.4462, 0.4792),`

**E6, line 389, the monotonicity claim contradicted by the note's own table.**

old: `percent everywhere past `u = 5`** [MEASURED]. C rises with the abscissa at every`

new: `percent everywhere past `u = 5`** [MEASURED]. C rises with the abscissa at x = 23 and x = 29 and is non-monotone at x = 31 (28.3, 38.8, 42.1, 39.4 over u = 6..9), so it rises at two of the three`

**E7, line 390, the truth counts behind the headline range.**

old: `level, reaching 39.4 to 54.6 percent at the deepest resolvable point. The`

new: `levels, reaching 39.4 to 54.6 percent at the deepest resolvable point. Those two endpoints rest on truth tail counts of 218 (x = 31, u = 9) and **2** (x = 29, u = 8), and the second moves to 57.4 or 50.3 percent if that count is 1 or 5, so the top of the range is a two-gap row [MEASURED, red team C]. The`

**E8, line 629, the M-P1 verdict, which a scatter measurement overturns.**

old: `276, which no positive share can produce, so **M-P1 fails at that fold** and its`

new: `276, which no positive share can produce, so **M-P1 fails on that single draw** and its`

**E9, new paragraph after section 7b's maximum table, carrying the scatter.**

new: `**The 19 -> 23 failure is a draw artefact, measured.** Red team C took 40 draws of each word at that fold with an independently written sampler and an explicit fold: the shuffled maximum is 296.1 with sd 29.1 over [246, 384] and the Markov maximum 264.0 with sd 18.4 over [234, 324], so this note's 276 sits at the 32.5th percentile of the shuffled law and its 288 at the 90th of the Markov law. The share from the two draw means is 34.9 percent, inside the registered band [10, 80] and beside the registered point 40. **M-P1 and M-P2 hold at all three folds once the statistic is averaged over draws** [MEASURED, 40 draws, `redteam-0829-measure-c.md` section 1b]. The tail-count column, which is what this section reads, is unaffected: 20 draw pairs give 72.3 (sd 8.8), 44.3 (sd 5.2) and 32.5 (sd 4.6) percent at u = 5, 6, 7, and this note's single-pair 69.9, 41.1 and 27.8 sit inside one sd of all three.`

**E10, line 663, the second monotonicity claim.**

old: ``c_tail` declines with the abscissa inside`

new: ``c_tail` declines with the abscissa from u = 5 inside`

**E11, line 597, an arithmetic nit.** `0.5437` should be `0.5438` (395/726.414) or `0.5435` (394.8/726.414); pick whichever the producer prints.

**E12, section 3e, a caveat on stage B.** Add: `**What B is and is not.** M1's run recursion uses the unconditional death rate 2/q; the exact CRT thinning's death rate conditional on a surviving predecessor is 2/(q-2). So B is a NET of the qualifying-gap suppression and an elementary rate difference of the opposite sign. Against a conditional-rate-matched uncorrelated control (independent thinning at r = 2/(q-2), which fails the mean-gap identity by 0.6 to 0.9 percent and is therefore a diagnostic and not a model), the rate term is -1.5 to -4.4 percent of ln(null/truth) and the correlation term is +7.7 to +14.4 percent, so the constraint's own suppression is 1.3 to 1.6 times the reported B [MEASURED, red team C]. C still dominates at the far tail and the verdict is unchanged.`

**E13, the ledger verdict line.** Replace `carrying 4.0 to 10.0 percent of ln(null/truth) against the grain's ORDER at 39.4 to 54.6 percent` with `carrying 4.0 to 10.0 percent of ln(null/truth) at the far tail, or 7.7 to 14.4 percent read against a rate-matched control, against the grain's ORDER at 39.4 to 54.6 percent at the deepest abscissa each level resolves; at shallow abscissae the ordering reverses (B 8.7 against C 4.8 at x = 23, u = 4)`.

### 3b. To `research/history/staging/lit-scourfield-2008.md` (APPLY)

**E14, line 79, a quotation that does not exist.**

old: `the convention has "no asymptotic machinery in this range at all". Equation`

new: `the convention's precision register is recorded there without Scourfield's entry, although the same table's divisor-range row carries her. `lit-smooth-divisors.md` section 6 already says the opposite of a blanket absence, in its own words: "Not ABSENT-PER-CONVENTION either ... Scourfield 2008 is an asymptotic, with an error term". Equation`

**E15, line 146, the quantifier inversion.**

old: `therefore `O(1/ln y)`, and no better.`

new: `therefore `o(1/ln y)`, which is strictly stronger than `O(1/ln y)`.`

**E16, line 336, match row 8.**

old: `**MATCHES.** On the diagonal `log x_lit = log L = 2 ln y`, so the two are the same order. **This is the correction to `lit-smooth-divisors.md` section 5's precision row** |`

new: `**NEAR MISS, one epsilon short.** On the diagonal `log x_lit = log L = 2 ln y`, so the two are the same order, but (1.1) supplies `O(1/log x)` where the open step needs `o(1/ln y)`: an error of exactly `c/log x` gives an absolute `c ln^2 y`, which fails `\|E\| <= eps ln^2 y` for every `eps < c`. **The correction to `lit-smooth-divisors.md` section 5's precision row is therefore narrow: that row omits Scourfield, and the omission is worth fixing, but the precision axis is not cleared** |`

**E17, line 57 and the ledger verdict, "three independently fatal gaps".**

old (line 57): `**DOES NOT DELIVER**, on three independently fatal gaps, at the rung that a`

new: `**DOES NOT DELIVER**, on two independently fatal gaps and one ambiguous one, at the rung that a`

old (ledger): `Three gaps, each independently fatal.`

new: `Two gaps each independently fatal, plus a third that is AMBIGUOUS between two author-sourced statements and does not carry the verdict.`

**E18, ledger verdict, the precision clause.** Replace `which is exactly the relative precision the open step needs` with `which is the right register and one epsilon short of the `o(1/ln y)` the open step needs`.

### 3c. To `research/history/staging/recon-0829-farfields2.md` (APPLY)

**E19, line 466, the grep that was too narrow.**

old: `**The corpus does not hold this.** `grep -i eigenvalue` over`

new: `**The corpus half-holds this, and the half it holds is narrower than the bank.** `research/history/staging/lit-pdf-holt-rudd.md` line 259 already records, verbatim and page-numbered, "M_J written out as a bidiagonal matrix with `a_j = (p-j-1)/(p-2)`, `b_j = j/(p-2)`, p.18", and for a bidiagonal matrix those diagonal entries are the eigenvalues. What no file carries is the product-over-primes closed form `prod_{17<=q<=p}(q-j-1)/(q-2)`, any numerical value, or the rate. `grep -i eigenvalue` over`

**E20, the ledger verdict.** Replace `carries no eigenvalue, no closed form and no rate` with `carries the per-prime eigenvalue `(p-j-1)/(p-2)` at `lit-pdf-holt-rudd.md` line 259 but no product-over-primes closed form, no numerical value and no rate`.

**E21, section 3c, the undisclosed overlap.** Add to section 3c: `**The family is already partly inside the corpus, and that is not disclosed above.** The Lemma V remainder this angle targets is itself Vaaler-completed: `lemmaV-neighbours.md` states the sum "after Vaaler completion and the reciprocity split", and `smoothness-front.md` section 3.3 reads Vaaler 1985 through Graham-Kolesnik Theorem A.6 and records that `attack-sqrt-cancellation.md` section 2 uses the same statement. `smoothness-front.md`'s own verdict already prices that member's payoff: "the Vaaler coefficients clear Pascadi's condition maximally but buy nothing". So this angle prices a family one of whose members is in the working machinery and already measured to buy nothing; what is new here is the Selberg majorant of an interval indicator and the `1/delta` arithmetic, not the family.`

### 3d. To `research/history/staging/recon-0829-escapes.md` (APPLY)

**E22.** Add an `(i)/(ii)/(iii)` column to section 6's wall-address table, per
`attack-wrongdirection-audit.md` section 2, since two rows name conclusions the
audit has already labelled: row 3e's "an i.o.-and-some-pair conclusion
suffices" is audit item 3's and item 10's territory, and row 4c's reversed
direction is item 10's legal band. The note grades every row by killer and by
landing killer and carries no audit label at all.

### 3e. To live documents (HOLD)

**E23, `research/history/staging/varE-theta2-proof.md` line 411 (HOLD).**

old: ``u = 2`. `research/SEARCH-CONVENTIONS.md` applies: the words to search are`

new: ``u in (2, 6]`, since `n in (2L, L^3)` and `ln y = (1/2) ln L`. `research/SEARCH-CONVENTIONS.md` applies: the words to search are`

Reason: `lit-scourfield-2008.md` section 1 derives the range correctly and does
not say that the file it cites states only the lower endpoint. HOLD because
`varE-theta2-proof.md` is itself a HELD note under review elsewhere.

**E24, `research/history/staging/lit-smooth-divisors.md` section 5's precision
row (HOLD).** Add Scourfield's entry to the row, as
`lit-scourfield-2008.md` proposes, but at the corrected register: `O(1/log x)`
relative for the divisor-sum object, which is the right register and one epsilon
short of the `o(1/ln y)` the open step needs. HOLD until E15 and E16 are applied
to the source note, so that the two files do not disagree.

**E25, `research/SEARCH-CONVENTIONS.md` section 1 (HOLD).** The row proposed at
`lit-scourfield-2008.md` section 5 should carry the corrected precision clause
before it lands: as drafted it says "asymptotics with relative error
`O(1/log x)` DO exist in this convention ... so a negative searched on 'no
asymptotics here' is wrong", which is right, and it should add that the register
is still one epsilon short of the open step's `o(1/ln y)`, so that a future pass
does not read the row as clearing the precision axis.

---

## 4. Label audit

### 4a. `measure-tail-deficit-0829.md`, the (i)/(ii)/(iii) label

The note carries a single label for its whole content, type **(i)**, on the
ground that everything in it is about the SIZE distribution of the tile's gaps
and is silent about PLACEMENT. Checked against
`attack-wrongdirection-audit.md` section 2's definitions ((i) strictly weaker
than TPC, (ii) TPC-strength, (iii) undetermined) and against section 1's Axis D
("Only `min_x N(x) >= 1` is the target"):

**The label is correct and the note's own guard is the reason.** Every object in
the note is a count or an expected count over a fixed finite tile at `x <= 31`.
Audit item 4 settles the rung directly: a finite-level statement is decidable by
enumeration, so it cannot imply TPC. The note's guard sentence, that the
count-1 threshold is an expected-count crossing and not an extreme-value upper
bound, is the one place the label could have slipped, and it is stated three
times (header, section 5c, section 6 D3). Nothing in the note bounds `G2` from
above [CONFIRMED].

One refinement the note makes correctly and could state once more plainly:
section 5c extends the label to cover the grain's ORDER as well as the size
distribution. That is still (i), because the grain is a fixed finite word at
each level, but the extension is the substantive move of section 7 and it is
made in a subordinate clause.

**Calibration markers.** Every numbered claim carries one. Spot-checked against
the evidence: `[VERIFIED]` is used only where an exact computation is quoted and
the exact computations reproduce; `[MEASURED]` is used for every model output
and every share; `[CONJECTURED]` is used for the one mechanism offered without a
computation (section 4's reading of why M1 - M2 narrows); `[OPEN]` is used for
the residual left to order three and above. No claim is stated above its
evidence. The two rung slips found are not in the mathematics: the embed
description (section 2a) and the reciprocal provenance (section 1b), both marked
as fact rather than as recollection.

### 4b. `lit-scourfield-2008.md`

Uses a source-rung ladder rather than (i)/(ii)/(iii), which is correct for a
literature note: `[SOURCED]` at a page image, `[SOURCED-BIB]` for a record,
SECOND-HAND for an author's restatement, AMBIGUOUS for the unresolved
hypothesis. The ladder is applied consistently and the note's hardest label,
"(1.1) is the 2008 chapter's theorem: **SECOND-HAND**, the chapter is unread",
is the correct rung and is repeated in section 6 rather than softened
[CONFIRMED]. The two over-statements found (section 1e rows 11 and 14) are both
in the summary lines, not in the body, which is the same pattern as note 1.

### 4c. `recon-0829-farfields2.md`

Every angle carries an `(i)/(ii)/(iii)` label in its own heading, and each is
checked here against `attack-wrongdirection-audit.md` sections 1 and 2:

| angle | label as written | verdict |
|---|---|---|
| 3a Gowers / Green-Tao | **(i)** | **CORRECT.** A `U^k` norm at a fixed level is a finite computation, audit item 4's rung |
| 3b Bohr / Croot-Sisask | **(iii)** with a **(ii)** face | **CORRECT.** The (ii) face is the maximal law on `R_H`, audit item 6, quoted accurately |
| 3c Beurling-Selberg | **(i)** as stated, **(ii)** at the sup form | **CORRECT**, and the split is argued rather than asserted: Lemma V's decoupled payoff at `u > 2.649` sits inside audit item 10's legal band, and the sup form inherits item 6 |
| 3d exponent pairs | **(i)** / **(ii)** at the sup form | **CORRECT**, same object, same split |
| 3e Holt spectral gap | **(i)** | **CORRECT.** An eigenvalue of a finite matrix with an explicit product formula carries no hypothesis of postulate strength, and the functional it governs is a population ratio, not `min_x N(x)` |
| 3f martingales | **(i)** almost-all, **(ii)** all-positions | **CORRECT**, and it is audit Axis C restated |
| 3g large deviations | **(i)** ensemble, **(ii)** all-anchor | **CORRECT**, same axis |
| 3h Maker-Breaker | **(i)** | **CORRECT.** A potential-function union bound over a finite board is decidable |

Eight angles, eight labels, none misgraded [CONFIRMED]. The source-rung ladder
(`[SOURCED]`, `[SOURCED-BIB]`, `[MEMORY]`, `[SCRATCHPAD-GRADE]`, `[CITED]`,
`[DERIVED HERE]`) is also applied consistently, and the one place the note could
have inflated, the `a2 . ln z` table, is marked `[SCRATCHPAD-GRADE]` even
though it reproduces exactly here, which is the correct direction of error.

### 4d. `recon-0829-escapes.md`

**The (i)/(ii)/(iii) frame is absent from this note entirely.** No row carries
an audit label. That is not a misgrade, since nothing is graded wrongly, but it
is a gap: two rows turn on conclusions the audit has already labelled, and a
reader moving between the two 0829 recon notes will find one that labels every
angle and one that labels none. Proposed as E22.

The note's own ladders (`OPEN`, `CLOSED`, `priced`, `banked`, `MEMORY`,
`[SOURCED]` absent by design since no PDF was opened) are applied consistently,
and its section 1 channel table is unusually explicit that a corpus grep decides
only what is in this repository [CONFIRMED].

---

## 5. What the notes missed

### 5a. Note 1 missed the check it named, and the check reverses one verdict

Section 7b closes with "a second Markov draw at a different seed would price the
scatter that section 7b blames for the 19 -> 23 failure, and was not taken", and
the producer's reading 14 repeats it. The draw costs seconds. Forty draws of
each word were taken here and they say the registered prediction held at that
fold. A note that identifies the cheap check that would decide its own reported
failure, prices it, and then reports the failure anyway has left the reader with
a conclusion its own next paragraph retracts.

### 5b. Note 1 never prints the truth counts behind its headline abscissae

The whole `39.4 to 54.6 percent` range, and the 27.8 / 34.6 / 62.0 of section 7,
are read at "the deepest abscissa the truth resolves", and "resolves" means
count at least 1. Measured here: the truth tail counts at those rows are 6
(x = 23, u = 7) and **2** (x = 29, u = 8). Two gaps carry the top of the range.
Defect D2 says "three levels for the headline" and D3 says the count-1 threshold
is an expectation; neither says that two of the three deepest rows are
single-digit counts. This is the cheapest possible disclosure and it is absent.

### 5c. Note 1's stage B mixes two effects of opposite sign

Section 1a's "the per-slot death rate is exactly `2/q` in both models" is true
unconditionally and false conditionally, and the run recursion is conditional.
Measured in section 1c: against a rate-matched control the constraint's own
suppression is 1.3 to 1.6 times the reported B. The conclusion survives; the
number that the ledger verdict quotes as "the constraint's size" does not.

### 5d. Note 2's correction is aimed at a sentence that does not exist

`lit-smooth-divisors.md` section 6 does not say the convention has "no
asymptotic machinery in this range at all". It says the opposite. The narrow
correction that survives, that section 5's precision row omits an entry the same
table's range row carries, is worth making and is one line.

### 5e. Note 2 inverts a quantifier and does not notice that it costs the match

`o(ln^2 y)` against `Theta(ln^3 y)` is `o(1/ln y)`, not `O(1/ln y)`, and
Scourfield's `O(1/log x)` therefore does not reach it. Both halves of the note's
own section 1 are correct; only the sentence joining them is wrong, and the
whole precision correction rests on that sentence.

### 5f. Note 3's one bank overlaps a corpus file it did not grep

`lit-pdf-holt-rudd.md` line 259 carries `a_j = (p-j-1)/(p-2)` at page 18,
verbatim and page-numbered. The bank is the product-over-primes form, the
numerical values and the rate, all of which are genuinely absent; "carries no
eigenvalue" is not.

### 5g. Duplicate pricing, named

**The one duplicate the notes do not name is note 3's section 3c.** The
Beurling-Selberg / Vaaler extremal-function family is not a far field with
respect to this corpus: the Lemma V remainder that section 3c targets is itself
**Vaaler-completed**. `lemmaV-neighbours.md` states the sum "after Vaaler
completion and the reciprocity split"; `smoothness-front.md` section 3.3 reads
Vaaler 1985 through Graham-Kolesnik Theorem A.6, writes out the coefficients
`c_h = (2 pi i h)^{-1} Jhat(h/(A+1))`, and records that
`attack-sqrt-cancellation.md` section 2 uses the same statement; and
`smoothness-front.md`'s own ledger verdict already prices that member's payoff,
"the Vaaler coefficients clear Pascadi's condition maximally but buy nothing".
Section 3c cites `sift-limit-attack.md` section 4.5 for the remainder and names
neither of those three files. The new material in section 3c is real (the
Selberg majorant of an interval indicator, the `1/delta` arithmetic against
`D_1 D_2`, and the Vaaler survey fetched and hashed), but the field was not
unpriced, and the CLOSURE is a closure of a family already partly resident.

**Every other overlap is disclosed by the notes themselves.** Note 3 section 0
point 3 states that six of its eight collapse onto a landed row or onto section
2's two sentences, and names them (3a onto two landed closures, 3b onto
`recon-0828-jacobsthal.md` A8 `[DOA]`, 3f onto row 7 and
`natal-cap-14-discrepancy-lemma.md`, 3g onto the ensemble quantifier, 3h onto
row 3, and the renewal angle onto the landed thinning row). Note 4 marks rows
3a, 3c, 3e, 4b, 4d, 5b, 5e as "priced", 4f and 4g as "CLOSED", 4c as "banked",
5c as "dial 4 CLOSED", and 5d as "cited twice already". Checked by grep: none of
these is presented as new. `Beurling-Selberg` as a phrase, `Maker-Breaker` and
`positional game` are absent from `IMPORT-MAP.md` and from every
`recon-0828-*.md`; `Gowers norm` is in `import-transference.md` and
`recon-0828-sieve.md`, both cited; `Croot` and `Bohr set` are in
`recon-0828-farfields.md` as well as `recon-0828-jacobsthal.md`, and note 3
cites only the second, which is a small citation gap rather than a duplicate.

### 5h. What all four notes missed together

None of the four carries a number that moves the exponent band, and none claims
to. The band `(2, 4.26645]` is where it was. The one thing a reader of all four
would want and does not get is a single line saying which of the four, if any,
changes what a future pass should do first. On this pass's reading it is note 1
section 6's Markov-window successor (the `L`-gap window of the Tail-Count
Transport), because note 1's section 7 measured 38 to 72 percent of the far-tail
order effect as unaccounted and named the next object, and because the two
recon notes between them establish that nothing in the far fields opens a route
at all.

---

*Total claims checked: 61. CONFIRMED 38, WEAKENED 14, REFUTED 6, UNVERIFIED 3.
No file other than this one was written. No git command was run.*
