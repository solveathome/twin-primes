# Red team of the three 08-29 measurement notes, wave B: the rough-pair null, Kourbatov's b, and the tail field

<!-- ledger
id: Q-redteam-0829-measure-b
status: ANSWERED
todo: none
question: Do the three 2026-08-29 HELD measurement notes (measure-roughpair-null-0829, measure-record-null2-0829, zone-tail-02-0829) survive independent re-derivation of their load-bearing claims, their custody and pre-registration integrity, their (i)/(ii)/(iii) labels, and their proposed edits to other documents?
verdict: 59 load-bearing claims checked, 44 CONFIRMED, 13 WEAKENED, 2 REFUTED, no data defect found and all three producers bit-honest under embed --check; the worst finding is custody clerical rather than numerical, measure-roughpair-null-0829.md:161 quoting code-sha256 4813584b against the producer's banner 5caaa5173b4c1561, a hand-transcribed hash that does not bind the artefact it names; the second is zone-tail-02's scope claim that every head bootstrap in the corpus is three times too narrow, REFUTED as written because destroyer-census-01.md publishes no bootstrap at all and head-residual-factor.js bootstraps over gaps rather than zones, while the defect itself is CONFIRMED on an independent engine (1,910 distinct a_first among 17,700 top-band zones reproduced exactly) and is LARGER than stated, a cluster bootstrap giving an inflation factor of 4.10 against the note's implied 3.04; measure-record-null2's exact cov identity reproduces to 1.4e-15 from the OEIS ladder and its lattice arithmetic reproduces at every row, but its headline "wrong by about three orders in b units" is unit-inconsistent and contradicts its own section 3e's "about one order below the effect"; no pre-registration shows any sign of post-run editing and none of the three can be shown NOT to have been, because all three preregs live inside note files whose mtimes necessarily postdate their producers'.
-->

*(2026-08-29. Staging note; nothing here is integrated into a live document.
HELD. Adversarial red team, wave B. No producer of its own: every
re-derivation below is either hand arithmetic on figures the reviewed notes
print, or scratchpad code written from the conventions rather than from the
reviewed producers, and is marked as such. Calibration marked per claim. No
file outside this one was edited and no git command was run.)*

---

## 0. Verdict first

**59 load-bearing claims checked. 44 CONFIRMED, 13 WEAKENED, 2 REFUTED.**
No arithmetic defect and no data defect was found in any of the three notes,
and all three producers pass `node research/qc/embed.js --check` on all
available lines, including a full 331 s re-run of `zone-tail-02.js`.

**The worst finding is custody clerical, not numerical.**
`measure-roughpair-null-0829.md`:161 states `code-sha256 4813584b...`. The
producer's own embedded banner, `research/measure-roughpair-null-0829.js`:548,
reads `code-sha256: 5caaa5173b4c1561863e4d4aa86a9a4247722ca84503d8cfe7589553fe2f2b46`.
The hash in the note binds nothing: it is a hand-transcribed prefix of a
superseded embed, left behind by the two disclosed `--force` re-embeds, and it
is the one thing in that note's custody section a reader can check in a second
and find false. `--check` is green, so no printed figure is affected. The
finding is that a custody sentence written by hand went stale in exactly the
way the embed tool exists to prevent [VERIFIED, both files read].

**The second finding is a scope claim.** `zone-tail-02-0829.md`'s ledger and
its :57 and :613 say every head bootstrap in this corpus, "`destroyer-census-01.md`'s
included", is about three times too narrow. The defect is real and this red
team reproduces its input exactly on an independent engine. The scope is not:
`destroyer-census-01.md` contains the string "bootstrap" zero times, and
`head-residual-factor.js`:235 and :441 bootstrap over GAPS, not zones. The only
published head interval in the corpus priced over zones that this pass can find
is the reviewed note's own, at :487. **REFUTED as written, CONFIRMED as a
defect, and understated as a size**: a cluster bootstrap over the 1,910
distinct `a_first` gives an inflation factor of 4.10, not the 3.04 the note's
own arithmetic implies.

**No pre-registration was edited after a run by any evidence available, and
no pre-registration can be shown not to have been.** In all three cases the
prereg is §1 of a note file whose mtime necessarily postdates its producer's,
so disk order settles nothing about the prereg specifically. Each of the three
notes says this itself, in the words "timestamped by disk order only, not
sealed". That calibration is correct and this pass can neither raise nor lower
it. §2 records what the mtimes do and do not show.

**Nothing in any of the three notes moves the wall, the certificate, or any
(ii) statement, and this pass finds no hidden (ii) content in any of them.**
Two of the three carry a self-assigned (i) label on items,
`TODO.md` Z4 and Z5, that `attack-wrongdirection-audit.md`:548 explicitly
lists as NOT AUDITED. §4.

---

## 1. Claim by claim

Verdicts: **CONFIRMED** the claim survives an independent re-derivation at the
record; **WEAKENED** the claim stands in direction but not at the size, scope
or ground stated; **REFUTED** the claim as written is false.

### 1a. `measure-roughpair-null-0829.md`

| # | claim | verdict | the re-derivation, and the reason |
|---|---|---|---|
| A1 | producer is bit-honest, `--check` passes on all three lines | **CONFIRMED** | `node research/qc/embed.js --check research/measure-roughpair-null-0829.js` returns `code-sha256 matches`, `body matches out-sha256`, `out-sha256 matches`, exit 0, 56.7 s [VERIFIED, re-run] |
| A2 | the independent-thinning null is binomial and its `chi2/df` is `1 - p` EXACTLY | **CONFIRMED** | re-derived independently: `X_null ~ Bin(C, p)` gives `E[E^2] = C p (1-p)`, and `Xmain = C p`, so `E[E^2/Xmain] = 1 - p` with no approximation [ARITHMETIC, exact]. Cross-checked by a 200,000-replicate scratchpad binomial sampler: `(C, p) = (1000, 0.04810)` reads 0.9473 against `1 - p = 0.9519`, 1.4 sd of the mean; `(500, 0.18364)` reads 0.8151 against 0.8164 |
| A3 | the closed form `V2(K) - 2 V2(K) U(K) + V2(nR)` is the per-opener null probability | **CONFIRMED** | re-derived from the stated N-thin rule: survival to `K` has probability `V2(K)`; conditionally, `P(a killed above K and a+2 killed above K) = 1 - 2 U(K) + V2(nR)/V2(K)` by inclusion-exclusion on the two complements, the joint complement being `prod_{i>K}(1 - 2/p_i)`. Multiplying gives the stated form exactly [ARITHMETIC, exact] |
| A4 | all 17 `N2 exact 1 - p` entries in §3a | **CONFIRMED** | reproduced by hand from the note's own `p` column at all 17 cells, to the printed digit: 0.9519, 0.9654, 0.9716, 0.9750, 0.9784, 0.9808; 0.9099, 0.9302, 0.9414, 0.9497, 0.9565, 0.9609; 0.8164, 0.8236, 0.8559, 0.8646, 0.8792 |
| A5 | all 17 `z` entries in §3a | **CONFIRMED** | reproduced by hand as `(measured - MC mean)/sd` at all 17 cells. One rounding note: the `u*` pooled reads `-7.096` from the 4-dp inputs the note prints, against `-7.09` quoted, which the unrounded sd absorbs |
| A6 | pooled `z = -5.87, -7.09, -11.39` on `df` 1205, 1205, 1119 | **CONFIRMED** | present verbatim in the producer's SEC 3 POOLED block; the arithmetic checks from the pooled means and sds printed on the same lines |
| A7 | F1 fires at `u = 5` by the letter of the prereg | **CONFIRMED** | the registered trigger is a null return below 0.90; at `u = 5` the exact returns run 0.8164 to 0.8792, all five below 0.90; at `u*` three of six fall in [0.90, 0.95) and none below 0.90; at `u = 3` all six sit in the confirming [0.95, 1.0] |
| A8 | "of the 0.711 shortfall in that note's lowest quoted value, 0.176 is the normalisation" | **CONFIRMED** | `1 - 0.289 = 0.711` and the normalisation part is `p = 0.17638` at B5, `u = 5` [ARITHMETIC] |
| A9 | §3b's per-anchor variance table is internally consistent | **CONFIRMED** | at 8 of 8 quoted cells the three derived columns close on each other: `<Var_null>/Fano null` recovers `<Xmain>`, and `<E^2>/<Xmain>` then reproduces the Fano actual column to the printed digit (for example B8 at `u*`: 520.34/0.9611 = 541.40, and 386.28/541.40 = 0.7135) |
| A10 | the `chi2` on 1 df constants, median 0.4549 and `P = 0.6827` | **CONFIRMED** | `0.6744897502^2 = 0.4549` and `2*Phi(1) - 1 = 0.6827` [ARITHMETIC] |
| A11 | the 17 `N3` rows and the 3 pooled rows of §3d transcribe the OUTPUT | **CONFIRMED** | every one of the 17 `Var_N3/Var_binom`, `N3 predicts` and `measured, same anchors` entries and all three pooled rows match the producer's SEC 6 block digit for digit |
| A12 | the engine gate, "211 figures asserted, 0 failures" | **CONFIRMED** | the producer's SEC 1 prints the count and "failures so far: 0"; the tail prints "assertion failures: 0" and "ALL ASSERTIONS PASS" |
| A13 | label (i), and the `attack-wrongdirection-audit.md` §3.1 citation | **CONFIRMED** | the audit's §3.1 does label Z2 (ii) TPC-strength through the capture identity, and does carry the residue sentence verbatim, "an upper bound on `X(y)` alone, or an asymptotic for the rough-rough census with no comparison to `T`, is a sieve statement and is not TPC-strength". §4 |
| A14 | the `N3` excess is "1.26 to 1.40 times above" | **WEAKENED** | the three ratios use the 40-anchor SUBSAMPLE's measured value, which differs from the full-band measured by up to 8%: 0.7319 against 0.7456 at `u = 3`, 0.6556 against 0.6677 at `u*`, and 0.4724 against 0.4382 at `u = 5`. Reading the same `N3` predictions against the FULL-band measured gives 1.422, 1.281 and 1.229, so the band is 1.23 to 1.42 and the `u = 5` end falls by 0.10. Direction unchanged, size sensitive to a choice the note does not flag |
| A15 | the `+- 0.127`, `+- 0.115`, `+- 0.132` on those ratios | **WEAKENED** | the producer's own SEC 6 note says the band is `1.41/sqrt(n)`, the `chi2`-on-1-df sampling sd of the MEASURED value alone. `N3`'s own sampling error, from 40 anchors at 60 replicates, is not in it. The note's defect 3 says `N3` is a subsample; it does not say the quoted sigma prices only one of the two terms |
| A16 | §5.1, the mean-matched null "is built only from the per-prime densities `2/p`, which is exactly the residue content of the main term" | **WEAKENED** | true of N1 as written, not of N2. N2's `p` is `Xcorr/C`, which carries the fundamental-lemma correction `omega(u) e^gamma`, an analytic input outside the per-prime densities; only the VARIANCE form `C p (1-p)` comes from the densities. The conclusion is unaffected, the sentence is not accurate |
| A17 | §5.2, "`N3` changes exactly one thing ... it makes each prime's kill count in the window near-exact instead of binomial" | **WEAKENED** | `N3` draws one offset `t mod p` and kills `a = t` and `a = t - 2`, which fixes the kill count AND makes the kill POSITIONS exactly periodic. The periodicity is what breaks the openers' independence, and it is a second insertion, not a restatement of the first. The classification argument leans on "one fact and nothing else" and the honest version is "one arithmetic mechanism, carrying two consequences" |
| A18 | the two `--force` re-embeds, "0 of 513" and "0 of 512" | **WEAKENED** | the artefact records ONE `forced:` line, `2026-08-29, 0 of 512 figures in the replaced block not reproduced`. The "0 of 513" occasion has no trace in the producer; the note's own disclosure is the only record of it, which is better than silence and is not custody |
| A19 | D8 classifies "interval-level in form, elementary in content, not wall-relevant" | **WEAKENED** | the measurements the classification rests on are CONFIRMED above; the classification is a reasoning verdict on top of them, and it rests on `N3`, which is 40 anchors per band at 60 replicates with per-cell ratios spanning 0.858 to 1.774, was not pre-registered, and inserts two things rather than one (A17). The verdict is consistent with the evidence; it is not forced by it, and it should be recorded as MEASURED-based reasoning on a subsample, which the note's own §5 closing line does say |
| A20 | producer custody hash `code-sha256 4813584b...` | **REFUTED** | the banner reads `5caaa5173b4c1561863e4d4aa86a9a4247722ca84503d8cfe7589553fe2f2b46`. §0, and the APPLY edit in §3a |

### 1b. `measure-record-null2-0829.md`

Independent reproduction for this note was run from the OEIS arrays themselves,
`research/a113274-gap-records.js` (A113274 GAP and A113275 START, 82 terms each,
read as BigInt literals), on scratchpad code written from
`lit-kourbatov-shortfall.md` §4's definition table rather than from the reviewed
producer. Conventions used: `abar(x) = ln^2 x / (2 C2)`,
`trend(x) = abar(x) ln(x/abar(x))`, `E = START + GAP + 2`,
`z = (g - trend(E))/abar(E)`, `L = ln(E/abar(E))`, window `[1e4, 7.05e16]`.

| # | claim | verdict | the re-derivation, and the reason |
|---|---|---|---|
| B1 | producer bit-honest, `--check` passes including the hashed input | **CONFIRMED** | `code-sha256 matches`, `body matches out-sha256`, `input matches research/a113274-gap-records.js`, `out-sha256 matches`, exit 0, 94.9 s [VERIFIED, re-run] |
| B2 | the note's quoted hashes bind the artefact | **CONFIRMED** | `b77177d84d961e5a...`, `b7dfb359c691fe71...`, 129 body lines, `research/a113274-gap-records.js@b64796044e4b`, elapsed 94.9 s, every one matching the banner at :541-548. This is the counter-example to A20 and it is in the same wave |
| B3 | the estimator identity `b_A - b_z = cov(-z, 1/L)/mean(1/L)`, exact | **CONFIRMED, twice** | algebraically: `b_A = mean(-z w)/mean(w)` with `w = 1/L`, so `b_A - b_z = [mean(-z w) - mean(-z) mean(w)]/mean(w) = cov(-z, w)/mean(w)` [ARITHMETIC, exact]. Numerically on the ladder: `b_A - b_z = -0.1729476625`, `cov(-z, w)/mean(w) = -0.1729476625`, residual `-1.4e-15` [MEASURED, independent scratchpad] |
| B4 | the four base estimators on the 72-record window | **CONFIRMED** | independently: `n = 72`, `A = 0.929464`, `mean(1/L) = 0.062692`, `z mean = -1.298069`, `b_A = 1.125122`, `b_z = 1.298069`, `b_med = 1.315931`. Every published figure reproduces. One convention note, not a defect: the corpus's `z sd = 1.021` is the population sd; the sample sd on the same 72 values is 1.0285 |
| B5 | the cut correction, `b_med = 1.2597` at `n = 71` on the whole ladder and 1.3980 at `n = 61` inside the window | **CONFIRMED** | independently: whole ladder `e < 1e15` gives `n = 71`, `b_med = 1.2597`, `b_mean = 1.2006`; the same cut intersected with the window floor `1e4` gives `n = 61` and `b_med = 1.3980`. The correction the note claims is owed to the corpus is real, and its four-digit match with Kourbatov is convention-dependent exactly as stated |
| B6 | the `6Z` lattice law is mean-matched EXACTLY | **CONFIRMED** | `P(G = 6j) = (1-q) q^(j-1)` with `q = 1 - 6/abar` has mean `6/(1-q) = abar` identically [ARITHMETIC, exact]. Reproduced numerically at five heights from 1e2 to 1e16, worst relative error 1.8e-15 |
| B7 | the lattice is an exponential of scale `abar - 3 + O(1/abar)` | **CONFIRMED** | `P(G > 6j) = q^j`, so the scale is `s = -6/ln q`; expanding `ln(1 - 6/abar)` gives `s = abar - 3 + 3/abar + O(abar^-2)` [ARITHMETIC]. Numerically: `s = 61.2007` against `abar - 3 = 61.2497` at 1e4, and `1024.9919` against `1024.9949` at 1e16 |
| B8 | the `Delta z = -3(L - 1)/abar` table, all four rows | **CONFIRMED** | every `abar` and `L` reproduced independently (64.2497 and 5.047 at 1e4; 256.9987 and 12.871 at 1e8; 578.2471 and 21.273 at 1e12; 1027.9949 and 29.906 at 1e16), and the four predictions recomputed by hand as -0.1890, -0.1386, -0.1052, -0.0844 |
| B9 | the `3/abar` and `6/g_record` columns | **CONFIRMED** | `3/abar` reproduces at 4.67e-2, 1.17e-2, 5.19e-3, 2.92e-3; `6/35640 = 1.6835e-4`, the cited figure, reproduces |
| B10 | `2 C2 * int_100^1e7 dt/ln^2 t = 58,740.28` | **CONFIRMED** | independent Simpson at 200,000 panels returns 58740.28 |
| B11 | P2's first-order estimates, `+0.018`, `+8e-4`, `+0.117`, `+0.058` | **CONFIRMED** | all four recomputed by hand from `Delta z = g^2/(abar x ln x)` with `g = abar L`: 0.01777 at 1e4, 8.18e-4 at 1e6, 0.1167 at 100, 0.05767 at 1e3 |
| B12 | the §4 decomposition table's derived entries | **CONFIRMED** | 12 of 12 recomputed: residuals 0.8367, 0.9732, 0.7824; carried fractions 25.6%, 25.0%, 40.5%; N0-alone fractions 14.6%, 16.5%, 32.3%; the ratios `b_z/b_A` 1.1537 raw and 1.1631 on the residual; and the implied single-realisation sds 0.250, 0.232, 0.248, consistent with the note's own "about 0.25" |
| B13 | the two effects are exactly additive | **CONFIRMED** | `-0.0029 + 0.1273 = 0.1244` against the quoted 0.1245, and `-0.0012 + 0.1113 = 0.1101` [ARITHMETIC, rounding] |
| B14 | `d b_z = +0.1113` is 8.6% of `b_data` and 52% of the fixed-`abar` null's own `b_z` | **CONFIRMED** | `0.1113/1.2981 = 0.0857` and `0.1113/0.2147 = 0.518` [ARITHMETIC] |
| B15 | the right-skew exposure, `b_med - b_z = 0.211` null against 0.018 data | **CONFIRMED as arithmetic** | `0.4255 - 0.2147 = 0.2108` and `1.3159 - 1.2981 = 0.0178`. The note itself marks the contrast FLAGGED and NOT MEASURED, which is the correct rung: no sigma for it exists in the producer |
| B16 | the gate is 34 figures, 15 + 13 + 6 | **CONFIRMED as a count** | the three bullet lists carry 15, 13 and 6 items, summing to 34. Whether the producer asserts all 34 was not separately re-derived; the reproduction of the four estimators in B4 and the two cuts in B5 is the substantive check and it passes |
| B17 | `record-location-null.md` §8's argued `1.7e-4` "is wrong by about three orders in `b` units" | **WEAKENED** | the comparison is unit-inconsistent, and the note commits the category slip it diagnoses. The cited `1.7e-4` is a RELATIVE gap perturbation, not a `b`-unit shift; `0.1113/1.68e-4 = 662` is a ratio between two different quantities, and it is 2.82 orders, not three. Like for like: in relative-perturbation units the correct denominator gives `3/abar` against `6/g_record`, which the note's own S7 table puts at 15 to 17 times, one order. In deficit-share units, `d A = -d b_A * mean(1/L) = -0.1273 * 0.06269 = -0.0080`, which is 13.3% of the 0.0600 deficit, so "two orders below the effect" should read about one order below it: the argument is off by roughly 1.6 orders. **The note's own §3e says exactly this** ("becomes about one order below the effect"), so §0 and the ledger verdict contradict §3e. The measurement is CONFIRMED; the headline is the defect |
| B18 | "Category (i) throughout" | **WEAKENED, on provenance only** | the substance holds on this pass's own reading: a fitted coefficient of a conjectural record model compared against a simulated null makes no statement about `T` at infinitely many `Q`. But the label is self-assigned. `attack-wrongdirection-audit.md`:548 says "Items Z3, Z4, **Z5**, Z5b, Z6, 1c, 1, 4, 6, 9, 10, 11 were not audited", and the note does not cite the audit at all. §4 |

### 1c. `zone-tail-02-0829.md`

Independent reproduction was run on a scratchpad segmented sieve to 4e5 written
from `zonegap-01.js`'s stated conventions (a zone is a consecutive prime pair
`(p, p')` with `p'^2 <= X`; a pair is in it iff `p < a` and `a + 2 < p'^2`,
both strict; `head(p) = a_first - p`), not from `zone-tail-02.js`.

| # | claim | verdict | the re-derivation, and the reason |
|---|---|---|---|
| C1 | producer bit-honest, `--check` passes on all three lines | **CONFIRMED** | `code-sha256 matches`, `body matches out-sha256`, `out-sha256 matches`, exit 0, on a full 331 s re-run [VERIFIED, re-run] |
| C2 | 27,292 zones, `p = 2 .. 316219`, band counts 4 / 21 / 143 / 1061 / 8363 / 17700 | **CONFIRMED** | reproduced exactly on the independent engine, together with `pi(1e5) = 9592` and `pi(316227) = 27293`, so the top band's 17,700 is `27292 - 9592` and closes by hand |
| C3 | per-decade `headMax` 6, 30, 150, 210, 630, 924 | **CONFIRMED** | reproduced exactly, all six |
| C4 | `c_head` (ratio of sums) 0.9863, 0.6859, 0.7177, 0.7251 on the four upper bands | **CONFIRMED** | reproduced exactly, all four, to 4 dp |
| C5 | 1,910 distinct `a_first` among 17,700 top-band zones, 1,019 among 8,363, 171 among 1,061 | **CONFIRMED** | reproduced exactly on the independent engine, all three. Zones per distinct head at the top reads 9.27 against the note's 9.3 |
| C6 | `c_local / HL` column, all six bands | **CONFIRMED** | `1/(2 C2) = 0.757390` recomputed, and all six ratios reproduced by hand: 0.8417, 0.7570, 0.9926, 1.0119, 0.9792, 0.9931 |
| C7 | the unit factor is 4 at the top band and above 4 below it | **CONFIRMED** | `c_p / c_local` reads 6.61, 4.21, 4.02, 4.0018, 4.0004, 4.0000 across the six bands, which is `4 * Sum ln^2 p' / Sum ln^2 p` falling to 4, exactly as the note states |
| C8 | the worst-case table, all six rows | **CONFIRMED** | every `/ln^2(p'^2)`, `/ln^2 p`, `/width` and `max/mean` entry recomputed by hand from the `max tail` and `at p` columns. The width convention is `width = p'^2 - p`, forced by `14/114 = 0.1228` at `p = 7` and confirmed globally by `228,644,641 - 228,629,534 = 15,107 = p`. The global maximum 6.840 at `p = 15107` and its 27.365 in `ln^2 p` units both reproduce, and their ratio is 4.0007 |
| C9 | the extremal scaling argument, `4.007 * ln(27292)/ln(1225) = 5.8` | **CONFIRMED** | 5.756 recomputed. The note's "18% low" is 5.8 read as the base; against the measured 6.840 as the base it is 16% |
| C10 | the top-band renewal row, `t/R` at all four comparators | **CONFIRMED** | `447.26/434.31 = 1.0298`, `/434.33 = 1.0298`, `/441.91 = 1.0121`, `/440.36 = 1.0157`, all four reproduced by hand; and the 10^4 row likewise |
| C11 | the class-null offset `440.36 - 434.31 = 6.05`, 1.39% | **CONFIRMED as arithmetic** | `6.05/434.31 = 1.393%`. The classes are also confirmed: `p^2 mod 30` for `p >= 7` takes exactly the values {1, 19}, and that grid's spacings alternate 18 and 12 for a mean 15 and a half-spacing of 7.5 |
| C12 | detrended pooled `r = -0.0009` against null s.e. 0.0061, `r/s.e. = -0.15` | **CONFIRMED** | `1/sqrt(27267) = 0.006056`. The 27,267 also confirms the convention: `27292 - 25`, the two lowest bands dropped, matching the independent count of zones with `p >= 100` |
| C13 | the R0 shares 1.40% / 92.80% / 5.81% at the top band | **CONFIRMED** | reconstructed independently from the note's own published coefficients at `ln p = 12.2`: head `0.7251 ln^2 p = 108`, tail 447, `Z2 = 3.930 ln^3 p = 7133`, giving 1.40% / 92.78% / 5.82% |
| C14 | the head-bootstrap defect exists | **CONFIRMED** | C5 establishes the redundancy exactly, and a cluster bootstrap confirms it bites. See C15 for the size and C16 for the scope |
| C15 | the quoted head intervals are "too narrow by roughly a factor of three" | **WEAKENED, and in the direction that costs the note** | measured, not argued: on the same 17,700 top-band zones, a zone bootstrap at 2,000 resamples reproduces the note's own published interval, [0.7147, 0.7356] here against [0.7147, 0.7353] at :487, sd 0.00527; a bootstrap resampling the 1,910 `a_first` CLUSTERS instead gives sd 0.02159 and [0.6840, 0.7681]. The inflation factor is **4.10**, not the `sqrt(9.27) = 3.04` the note's arithmetic implies. The reason is that cluster sizes are unequal and cluster mean head is correlated with cluster size, a longer twin gap holding both more primes and larger heads, so the design effect exceeds the mean cluster size. Two consequences the note does not carry: the head field is NOT perfectly redundant within a cluster either (one-way ANOVA puts only 51.6% of the head variance between clusters), so "effective sample size 1,910" is the wrong description of a real effect; and P6's registered [0.68, 0.78] still HITs on the corrected interval, by 0.004 at the lower end [MEASURED, independent scratchpad, 2,000 resamples, seed 20260829] |
| C16 | "every head bootstrap in this corpus, `destroyer-census-01.md`'s included" | **REFUTED** | `grep -c bootstrap research/history/staging/destroyer-census-01.md` returns **0**; its §6(b) at :208-210 quotes 0.7064, 0.7177, 0.7236, 0.7192, 0.7344 and the 0.669 to 0.753 half-decade span with no interval of any kind, so there is nothing there to be too narrow. `research/history/staging/head-residual-factor.js`:235 and :441 read "bootstrap over gaps (B=200)", so `head-residual-factor.md`'s six half-decade windows and its `chi2/df` model comparison are immune. `research/zonegap-01.js` carries no bootstrap. `research/zone-tail-01.js`:293, :301 and :494 bootstrap tail quantities over zones only, and its head column at `zone-tail-01.md`:227 carries no interval. The single published head interval this pass can find that the defect affects is the reviewed note's own, `zone-tail-02-0829.md`:487 |
| C17 | P4's registered ground | **WEAKENED** | the BAND hits: 1.39% against a registered 2%, falsifier at 5%. The GROUND registered for it does not. §1 (P4) says the two comparators should agree "since the discrete correction `R + 1/2` is 0.5 against `R` near 480 there", which predicts 0.1%; the measured 1.39% is 14 times that. §3 then explains the measured offset with a different mechanism introduced after the run, half the mean spacing of the {1, 19} mod 30 grid at 7.5, which itself over-predicts the measured 6.05 by 24%. A prediction whose band holds and whose stated reason is off by an order is a weaker test than the §5 table's bare HIT suggests |
| C18 | P7's model figure, "about 0.016 on this zone list" | **WEAKENED** | evaluated independently on the note's own 27,292-zone list, `Var(L)/(2 E[L^2] - E[L]^2)` with `L = ln^2 p` reads **0.0285**, not 0.016. The 0.0168 is the value on the TOP TWO BANDS only, 26,063 zones. The measured 0.0326 is pooled over all 27,292. Compared on the same list the model is 14% low, not "a factor of two low", so §4's reading that this is "a note about the model" is itself the artefact of a mismatched zone set. P7 still HITs |
| C19 | the renewal table's rows are homogeneous in their zone set | **WEAKENED, undisclosed** | the `t/R_band` column of the 10^2 row is `113.65/114.62 = 0.9916`, computed on all 143 zones, while `mean tail`, `t/R_shell`, `t/R_bin` and `t/classNull` in the same row are computed on the 23 zones the caption names; at 10^3, `218.86/218.16 = 1.0032` on 1,061 zones against the row's 223.27 on 924. §7 defect 7 discloses that the 10^2 row uses 23 of 143 zones; it does not disclose that one column of that row uses all 143. The top band and 10^4 rows use the whole band throughout and are unaffected, so the headline is untouched |
| C20 | "(i) throughout" | **WEAKENED, on provenance only** | as B18: the substance holds, and the note's §5 closing paragraph and §7 last bullet correctly state that a bound below the width on head, `Z2` or tail at infinitely many `p` would be (ii). But `attack-wrongdirection-audit.md`:548 lists **Z4** among the items not audited, and the note cites no audit. §4 |
| C21 | the tail has no comparable redundancy | **CONFIRMED as argued, not as counted** | the shell argument reproduces: at the top band a shell is about 5.1e6 wide against a mean twin gap near `R_shell = 434`, so roughly 11,700 gaps per shell, and the `p'^2` values are separated by about `2 p g_p ~ 5e6`. The distinct `a_last` count was NOT computed by the producer, though the same accumulator that produced 1,910 would produce it; the claim is therefore argued at the same grade the note's own §4 gives it |

---

## 2. Custody and pre-registration integrity, per note

**The general result first, and it is a negative.** None of the three
pre-registrations can be shown to have preceded its producer's first run by
file evidence, and none can be shown not to have. In all three cases the
pre-registration is §1 of the note file, and a note file's mtime is set by the
last edit to any part of it, which in all three cases postdates the producer.
So the mtimes below establish only that no producer was edited after its note
was last written, which `embed.js --check` establishes more strongly anyway.
Each of the three notes states this exposure in its own words ("timestamped by
disk order only, not sealed"). That is the correct rung and this pass leaves it
where it is.

| file | mtime | note file | mtime | gap |
|---|---|---|---|---|
| `research/measure-roughpair-null-0829.js` | 09:13:28 | `measure-roughpair-null-0829.md` | 09:16:41 | 3 m 13 s |
| `research/measure-record-null2-0829.js` | 09:27:23 | `measure-record-null2-0829.md` | 09:29:13 | 1 m 50 s |
| `research/zone-tail-02.js` | 09:34:44 | `zone-tail-02-0829.md` | 09:35:14 | 30 s |

The three producers' embedded `elapsed` figures are 56.7 s, 94.9 s and 330.9 s,
summing to 8 minutes against the 22-minute span from the first producer's mtime
to the last note's. That leaves room for the stated order and is not evidence
of it.

**One positive signal exists and it is worth naming, because it is stronger
than disk order.** The pre-registered bands of two of the three notes live
inside the producers' own code, ABOVE the OUTPUT banner, so they are covered by
`code-sha256` and any later edit to them would break `--check`:

- `research/measure-record-null2-0829.js`:47-52 carries P1 through P4 with
  their bands and both falsifiers verbatim (`|Delta b| <= 0.05` and the 0.20
  falsifier for C1; `+0.08..+0.19` and the 0.02 falsifier for C2; "about 25%").
  `--check` reports `code-sha256 matches`, so those bands were in the file when
  the bound OUTPUT was produced [VERIFIED].
- `research/measure-roughpair-null-0829.js`:14-22 carries the F3 clause and
  states that it was registered in advance with its thresholds, likewise above
  the banner and likewise bound [VERIFIED].
- `research/zone-tail-02.js`:32-36 points at the prereg section and repeats the
  disk-order caveat, but does NOT encode the bands, so zone-tail-02's ten
  registered intervals have no custody beyond the note file itself [VERIFIED].

This does not date the prereg against the FIRST run, only against the embed
that produced the bound block. It is the strongest evidence available in a wave
with no commits, and it is available for two of the three notes.

**Per note.**

**`measure-roughpair-null-0829.md`.** `--check` green on all three lines,
56.7 s. Engine gate substantive: the producer at :240 hard-codes
`attack-roughpair-error-01.js`'s SEC 2 grid as literal strings and asserts
against them, so the 211-figure claim is a real gate and not a description.
**One defect, and it is this pass's worst finding:** the note's :161 quotes
`code-sha256 4813584b...`, the banner reads `5caaa5173b4c1561...`. **One
lesser defect:** the note discloses two `--force` re-embeds; the artefact
records one, `0 of 512`. Both are clerical, neither touches a figure, and the
first is exactly the hand-transcription failure `embed.js` exists to remove.

**`measure-record-null2-0829.md`.** `--check` green on all four lines,
including the hashed input `research/a113274-gap-records.js@b64796044e4b`,
94.9 s. Every hash and count the note quotes matches the banner. The
reproduction gate is independently substantiated: this pass recomputed the four
base estimators and both cuts from the OEIS arrays on scratchpad code and
matched every published figure (§1b B4, B5). **The best-custodied of the three,
and the only one whose prereg bands are inside a bound hash.**

**`zone-tail-02-0829.md`.** `--check` green on all three lines on a full 331 s
re-run. The custody table's claims that this pass could check independently all
hold: zone count, top origin, band counts, `headMax`, and the head coefficients
(§1c C2 to C4). The two disclosed elapsed figures, 330.8 s in the note against
330.9 s in the banner, are reconciled in the note itself. **The weakest prereg
custody of the three**, since none of its ten bands is inside a hashed artefact,
and the note carries no producer hashes at all.

**What no note claims and none should.** None of the three is sealed against a
git object, and `zonegap-03-prereg.md`'s sealed custody at `f345adf` remains the
only prereg in the corpus with that grade. All three say so.

---

## 3. Proposed edits

Nothing below is applied. This pass edited no file but this one. Every APPLY is
a correction this red team re-derived; every HOLD names what the maintainer has
to decide that this pass cannot.

### 3a. To the three reviewed notes (APPLY)

**A-EDIT-1. `research/history/staging/measure-roughpair-null-0829.md`:161.**
The hash does not bind the artefact. APPLY.

> old: `**Producer custody.** `code-sha256 4813584b...`, `out-sha256` as stamped,`
>
> new: `**Producer custody.** `code-sha256 5caaa5173b4c1561...`, `out-sha256 f2907aa4ed30dde5...` as stamped,`

**A-EDIT-2. Same file, §3d's pooled table and §4's third reading.** The three
excess ratios are computed against the subsample's own measured value. APPLY a
one-sentence rider after the §3d pooled table:

> new: `The measured column in this table is the SUBSAMPLE's, on the same 40 anchors per band the N3 replicates use. Against the FULL-band measured value the same N3 predictions give 1.422, 1.281 and 1.229, so the excess reads 1.23 to 1.42 rather than 1.26 to 1.40 and the u = 5 end falls by 0.10. Direction unchanged; the size is sensitive to which measured value is paired with N3.`

**A-EDIT-3. Same file, §3d's `+-` and §6 defect 3.** APPLY, appended to
defect 3:

> new: `The `+-` on the three pooled ratios is `1.41/sqrt(n)` times the ratio, the chi2-on-1-df sampling sd of the MEASURED value alone. N3's own sampling error, 40 anchors at 60 replicates, is not in it, so the quoted band understates the uncertainty on the ratio by an unmeasured amount.`

**A-EDIT-4. Same file, §5 point 2, "`N3` changes exactly one thing".** APPLY:

> old: `**What is acting is a counting fact about intervals, and it is free.** `N3` changes exactly one thing relative to the first null: it makes each prime's kill count in the window near-exact instead of binomial.`
>
> new: `**What is acting is a counting fact about intervals, and it is free.** `N3` inserts one arithmetic mechanism relative to the first null, a single random offset `t mod p` per prime, and that mechanism carries two consequences, not one: each prime's kill count in the window becomes near-exact, AND the kill positions become exactly periodic. The second is what makes the openers dependent, and it is the one that does the variance work.`

**A-EDIT-5. Same file, §5 point 1, "built only from the per-prime densities".**
APPLY:

> old: `The mean-matched independent-thinning null is built only from the per-prime densities `2/p`, which is exactly the residue content of the main term,`
>
> new: `The mean-matched independent-thinning null takes its VARIANCE form from the per-prime densities `2/p`, which is exactly the residue content of the main term, and its centring from `Xcorr`, which additionally carries the fundamental-lemma factor `omega(u) e^gamma`;`

**B-EDIT-1. `research/history/staging/measure-record-null2-0829.md`, the ledger
verdict and §0's third bullet.** The "three orders" figure is unit-inconsistent
and contradicts the note's own §3e. APPLY, in both places:

> old (ledger): `record-location-null.md section 8's argued 1.7e-4 lattice bound is wrong by about three orders in b units`
>
> new (ledger): `record-location-null.md section 8's argued 1.7e-4 lattice bound is wrong by about one order as a share of the deficit, the lattice moving A by 0.0080 against a 0.0600 deficit, 13.3 percent, where the argument put it two orders below; in its own relative-perturbation units the cited number uses the record gap where the governing denominator is the mean gap, a factor of 15 to 17`
>
> old (§0): `[MEASURED] C2, the 6Z lattice, carries `d b_z = +0.1113 +- 0.0003`, and `record-location-null.md` §8's argued `1.7e-4` bound on it is wrong by about three orders in `b` units.`
>
> new (§0): `[MEASURED] C2, the 6Z lattice, carries `d b_z = +0.1113 +- 0.0003`, which is 13.3% of the 6.0% A-deficit against the "two orders below the effect" that `record-location-null.md` §8 argues, so that argument is off by about 1.6 orders; the ratio `0.1113/1.7e-4 = 662` is not the right comparison, because the cited figure is a relative gap perturbation and not a `b`-unit shift, and in its own units the error is the factor of 15 to 17 between `6/g_record` and `3/abar`.`

The same substitution is owed at §3e's heading, which currently reads "three
orders above the argued bound", and at §5's P3 row. §3e's own closing sentence,
"about one order below the effect", is correct as written and needs no change.

**B-EDIT-2. Same file, the "Category (i) throughout" paragraph.** APPLY, one
clause:

> new: `The label is this note's own: `attack-wrongdirection-audit.md` §5 records that Z5 was NOT among the ten items audited, so no audited label exists for the surrounding item and (i) here is self-assigned.`

**C-EDIT-1. `research/history/staging/zone-tail-02-0829.md`:57-58, and the same
sentence in the ledger verdict and at :613.** The scope is false and the size
is understated. APPLY:

> old (:57-58): `Every head bootstrap in this corpus, `destroyer-census-01.md`'s included, prices about three times more independent draws than the field holds.`
>
> new (:57-58): `This note's own head interval prices 17,700 independent draws where the field holds 1,910 clusters. A cluster bootstrap over those 1,910 distinct `a_first` gives sd 0.0216 against the zone bootstrap's 0.0053, an inflation factor of 4.10, not the `sqrt(9.27) = 3.04` the redundancy alone implies: cluster sizes are unequal and the cluster mean head rises with cluster size, so the design effect exceeds the mean cluster size. The corrected top-band interval is [0.6840, 0.7681]. The scope of this defect is ONE published interval, this note's own §5 P6: `destroyer-census-01.md` publishes no bootstrap of any kind, `head-residual-factor.js` bootstraps over GAPS rather than zones, `zonegap-01.js` has no bootstrap, and `zone-tail-01.js` bootstraps only tail quantities.`
>
> old (:612-613): `distinct heads at the top band, bootstraps priced at 17,700.`
>
> new (:612-613): `distinct heads at the top band, bootstraps priced at 17,700; a cluster bootstrap measures the inflation at 4.10 and moves the top-band head interval to [0.6840, 0.7681], inside §1 (P6)'s registered [0.68, 0.78] by 0.004.`

**C-EDIT-2. Same file, §1 (P7) and §4's raw-correlation paragraph.** APPLY:

> old (§4): `measured 0.0326, HIT, and the model figure is a factor of two low, which is a note about the model and not about the data.`
>
> new (§4): `measured 0.0326, HIT. The 0.016 quoted in §1 is the model evaluated on the TOP TWO BANDS, 26,063 zones; on the full 27,292-zone list the same formula gives 0.0285, so on the same zone set the model is 14% low rather than a factor of two, and the apparent factor of two was a mismatched zone set.`

**C-EDIT-3. Same file, §3's renewal table caption.** APPLY, appended:

> new: `The `t/R_band` column is the ONLY one computed on the whole band: at 10^2 it is `113.65/114.62` on 143 zones while every other column of that row uses the 23 the caption names, and at 10^3 it is `218.86/218.16` on 1,061 against the row's 924. The 10^4 and top-band rows use the whole band throughout.`

**C-EDIT-4. Same file, §5's P4 row.** APPLY:

> new: `P4's BAND holds at 1.39% against a registered 2%; the GROUND registered for it does not. §1 (P4) grounds the band on `R + 1/2 = 0.5` against `R` near 480, which predicts 0.1%, fourteen times below the measured offset; §3's `7.5` is a different mechanism introduced after the run and itself over-predicts the measured 6.05 by 24%.`

**C-EDIT-5. Same file, the Label paragraph.** APPLY, as B-EDIT-2:

> new: `The label is this note's own: `attack-wrongdirection-audit.md` §5 records Z4 as NOT audited, so no audited label exists for the surrounding item.`

### 3b. To other HELD notes

**APPLY. `research/history/staging/attack-roughpair-error.md`:167.** The
correction is exact and independently re-derived here (§1b A2, A4).

> old: `   Below 1 everywhere: sub-Poisson. This is the strongest single statement`
>
> new: `   Below 1 everywhere, but 1 is the WRONG REFERENCE: the matched independent-thinning null is binomial and returns `1 - p` exactly with `p = Xmain/C`, which is 0.9519 to 0.9808 at `u = 3`, 0.9099 to 0.9609 at `u*` and 0.8164 to 0.8792 at `u = 5` (`measure-roughpair-null-0829.md` §3a, RED-TEAMED and the identity re-derived). Against that reference the dispersion is still below at all 17 band-depth cells, pooled `z = -5.87`, `-7.09`, `-11.39`, so sub-Poisson stands as a direction and its size is smaller than this sentence implies: of the 0.711 shortfall at B5, `u = 5`, 0.176 is the normalisation. This is the strongest single statement`

**APPLY. Same file, :348-352.** The control ran and does not return 1.

> old: `- The sub-Poisson dispersion (`χ²/df` as low as 0.289) has no mechanism / offered. It may be the exact constraint `T + M + X + singles = C`, it may / be the fold structure, it was not investigated. Falsifiable: a matched / independent-thinning null should return `χ²/df = 1`; that control was not / run.`
>
> new: `- The sub-Poisson dispersion (`χ²/df` as low as 0.289) had no mechanism offered here. THE CONTROL RAN 2026-08-29 (`measure-roughpair-null-0829.md`, HELD, red-teamed): the matched independent-thinning null returns `1 - p`, not 1, and neither guess above is needed. A second null that gives each prime an exact kill count in the window predicts 0.33 to 0.56 and the measured value sits 1.23 to 1.42 times ABOVE it, so the mechanism is elementary equidistribution of residue classes in an interval and it over-explains the deficit; the residual excess is unattributed and prime-prime dependence is a candidate, not a demonstration.`

**APPLY. `research/history/staging/record-location-null.md`:124-127 and
:212-214.** Both carry the argued `1.7e-4`, and the measured replacement is
independently confirmed here (§1b B6 to B9). Use the unit-consistent figure,
NOT the reviewed note's "three orders".

> old (:126-127): `of 3.6e4, a 1.7e-4 perturbation. Not measured, argued; it is two orders below / the effect and no measurement was run.`
>
> new (:126-127): `of 3.6e4, a 1.7e-4 perturbation. MEASURED 2026-08-29 and this argument is wrong (`measure-record-null2-0829.md` §3e, HELD, red-teamed): the governing ratio is the spacing over the MEAN gap, `3/abar`, not over the record gap, a factor of 15 to 17, and it enters multiplied by `L`. The mean-matched geometric on `6Z` is an exponential of scale `abar - 3` rounded up, giving `d z = -3(L-1)/abar`; the ensemble reads `d b_z = +0.1113 +- 0.0003`, which moves `A` by 0.0080 against the 0.0600 deficit, 13.3%, about one order below the effect rather than two, and in the direction that helps the null.`
>
> old (:212-214): `- **The deficit is the gap lattice.** NOT RUN. Argued at 1.7e-4 relative, two / orders below the effect. A latticed null would settle it and has not been / written.`
>
> new (:212-214): `- **The deficit is the gap lattice.** RUN 2026-08-29 (`measure-record-null2-0829.md` §3e), and it does not fire: the latticed null carries `d b_z = +0.1113 +- 0.0003`, 13.3% of the deficit, and leaves it at 3.2 to 4.2 ensemble sd. The 1.7e-4 argument above is wrong by about one order as a share of the deficit and by a factor of 15 to 17 in its own units.`

**HOLD, and specifically DECLINE. `research/history/staging/destroyer-census-01.md`.**
`zone-tail-02-0829.md` proposes that its head intervals are three times too
narrow. That note publishes no bootstrap and no interval: `grep -c bootstrap`
returns 0, and §6(b) at :208-210 quotes five window figures and a half-decade
span bare. **No edit is owed and none should be made.** A pointer is legitimate
if the maintainer wants one, but it must not say the intervals are wrong,
because there are none.

**HOLD, and specifically DECLINE. `research/history/staging/head-residual-factor.md`.**
Its companion bootstraps over GAPS (`head-residual-factor.js`:235, :441), so
the six half-decade windows and the `chi2/df` model comparison between the
one-parameter and two-parameter laws are unaffected by the zone-redundancy
defect. No edit owed.

**HOLD. `research/history/staging/zone-tail-01.md`.** `zone-tail-02-0829.md`
retires that note's band-wide `t/R` convention. The retirement is justified by
the numbers (0.9916, 1.0032, 0.9686, 1.0121, moving around 1 with no pattern),
but a HELD note is not corrected by a successor's preference. A one-line
pointer at :227-232 is enough and the body should stay as it stands.

**APPLY. `research/history/staging/object-models-read-0829.md` §4's D8 row and
§7's C4.** D8's classification and C4's status both change, and both are the
reviewed note's own deliverable. The wording should carry §1a A19's discount:
the classification rests on a 40-anchor subsample that inserts two things, and
it is MEASURED-based reasoning, not a theorem. §4's summary line "Seven
residue-level, one interval-level in form and blocked by a quantifier, one
unclassified with an unrun control" becomes "... one interval-level in form and
elementary in content", and C4's "**Cost:** under an hour" gains "**RUN**
2026-08-29, 56.7 s".

### 3c. To live documents

**HOLD, with a required correction before any application.
`TODO.md`:227-232, Z4's tail clause and its Ledger line.**
`zone-tail-02-0829.md` §6 proposes a replacement whose penultimate paragraph
carries the scope claim REFUTED in §1c C16 and the size WEAKENED in C15. The
measurement half of the proposal is CONFIRMED by this pass and can go in as
written. The defect half must not.

> proposed by that note: `One defect discovered in the pass is owed elsewhere: the head field's effective sample size is 1,910 distinct a_first among 17,700 top-band zones, so every head bootstrap in this corpus, `destroyer-census-01.md`'s included, prices about three times more independent draws than the field holds.`
>
> corrected: `One defect discovered in the pass is owed to that note itself: the head field holds 1,910 distinct a_first among 17,700 top-band zones, so its own head interval is priced over 17,700 draws the field does not have. A cluster bootstrap measures the inflation at 4.10 (redteam-0829-measure-b.md §1c C15) and moves the interval to [0.6840, 0.7681], still inside the registered [0.68, 0.78]. The corpus scope is one interval: destroyer-census-01.md publishes no bootstrap, head-residual-factor.js bootstraps over gaps, zonegap-01.js has none, and zone-tail-01.js bootstraps only tail quantities.`

The rest of that §6 block is CONFIRMED at every figure this pass could check
(0.7522, [0.7410, 0.7630], 0.7574, 1.0298, [1.0156, 1.0443], 1.0157,
[1.0013, 1.0308], `r = -0.0009`, 0.0061, 0.8920, 0.9990) and may be applied.

**APPLY. `TODO.md`:265, Z7's queue item (3).** "the per-zone TAIL field data the
1e8 census could not reach" is discharged: the 1e11 range ran on 2026-08-29 at
330.9 s inside custody. Strike it from the box queue and renumber.

**HOLD, with the "three orders" phrase replaced.
`TODO.md`:250-255, Z5's First-move paragraph, and :258, its Ledger line.**
`measure-record-null2-0829.md` §6 proposes a replacement. Everything in it that
this pass could check independently is CONFIRMED digit for digit: the identity,
`cov(-z, 1/L)/mean(1/L) = -0.1729476625`, `b_z = 1.2981`, `b_med = 1.3159`,
`b_A = 1.1251`, `d b_z = -0.0012` and `+0.1113`, 25.6% / 25.0% / 40.5% against
14.6% to 16.5%, and the residual at 3.2 to 4.2 ensemble sd. **One clause must
change before it lands**, its (c):

> proposed: `record-location-null.md §8's argued 1.7e-4 is wrong by about three orders in b units: it divides the spacing by the RECORD gap where the governing ratio is the spacing over the MEAN gap, and that ratio enters b multiplied by L.`
>
> corrected: `record-location-null.md §8's argued 1.7e-4 is wrong because it divides the spacing by the RECORD gap where the governing ratio is the spacing over the MEAN gap, a factor of 15 to 17, and that ratio enters b multiplied by L. In the unit the argument was stated in, a share of the deficit, the lattice moves A by 0.0080 against 0.0600, 13.3%, so "two orders below the effect" should read about one order below it.`

The Ledger append of `Q-record-null2` is APPLY as written.

**No edit to `README.md` §Status or `research/G2-STATE.md` §0.** Nothing in the
three notes moves the certificate, the wall, the exponent or any (ii)
statement, and all three say so. This pass finds no reason to touch either.

**No hand edit to `research/QUESTIONS.md`.** It is generated from the
`<!-- ledger -->` blocks; the two registry moves the notes propose
(`Q-zone-tail` PARTIAL to ANSWERED, `Q-roughpair-error` staying PARTIAL) follow
from the blocks and from `research/qc/questions.js`, not from an editor.
On `Q-zone-tail`, **HOLD with a wording condition**: its verdict left the
coefficient unsettled, and the coefficient is still unsettled after this pass
(0.7518, 0.7664, 0.7416, 0.7522, non-monotone). ANSWERED is defensible only if
the new verdict says the coefficient is MEASURED and not converged, which
`zone-tail-02-0829.md`'s own ledger does say.

---

## 4. Label audit

The audit's scale, `attack-wrongdirection-audit.md` §2: **(i)** strictly weaker
than TPC and a legitimate stepping stone, **(ii)** TPC-strength, **(iii)**
undetermined.

| note | label claimed | audited? | verdict |
|---|---|---|---|
| `measure-roughpair-null-0829.md` | (i), null-side, no bearing on the certificate, citing the audit §3.1 | **YES**, the surrounding item Z2 is audit row 1 and row 8, both **(ii)** | **CONFIRMED.** The citation is verbatim and correct: §3.1 derives `T >= X(K) + 1 >= 1` from the capture identity and does carry the residue sentence the note quotes. A null on the dispersion of `X` compares `X` against a model of `X` and never against `T`, so it sits strictly inside the legal residue. The note's §0 is the model of how a (i) measurement under a (ii) item should be framed |
| `measure-record-null2-0829.md` | (i) throughout | **NO.** `attack-wrongdirection-audit.md` §5 lists Z5 among "Items Z3, Z4, **Z5**, Z5b, Z6, 1c, 1, 4, 6, 9, 10, 11 were not audited" | **WEAKENED on provenance, CONFIRMED on substance.** This pass's own reading: `b` is a fitted coefficient of a conjectural heuristic and the note compares it against a simulated null; there is no comparison to `T` and no quantifier over zones anywhere in it. The note also states the quantifier gap correctly, that an almost-all over a log-sparse record sequence cannot give an every-zone statement. But the label is self-assigned and the note cites no audit |
| `zone-tail-02-0829.md` | (i) throughout | **NO.** Same §5 list carries **Z4** | **WEAKENED on provenance, CONFIRMED on substance.** Every statement in the note is distributional on measured fields. The note correctly identifies the (ii) boundary in two places, §5's closing paragraph and §7's last falsifier bullet: a bound below the width on head, `Z2` or tail at infinitely many `p` would be (ii) through the Gap Reformulation, and none is made. The `width/(head + Z2 + tail)` divergence to 4.3e6 is correctly called the square-window artefact and not evidence, citing `ZONE-POSTULATE.md` §5a |

**One drift risk worth recording, at (iii) grade.** `zone-tail-02-0829.md` §4
answers Q5 in the negative and reads that as support for
`zonegap-02-reduction.md` §2's "separately attackable". Independence of head
and tail is (i). But "separately attackable" is a claim about a PROOF strategy
whose payout, a bound on each of the three pieces, is (ii) by (R1). The note
does not make that step and says so explicitly, twice. The risk is that a later
note quotes "no dependence at 27,292 zones" as licence for the strategy without
re-stating that the strategy's conclusion is TPC-strength. **Recommendation:
carry the one-line label from `attack-wrongdirection-audit.md` §4's pattern into
`TODO.md` Z4 when the tail clause is next edited**, and note that Z4 has never
been audited.

---

## 5. What the notes missed

Ordered by how cheaply each could have been closed inside the wave that wrote
them.

1. **Note C did not measure the design effect it discovered.** The producer
   already holds the `a_first` vector that yields 1,910; a cluster bootstrap
   over it costs the same seconds as the zone bootstrap already run, and it
   returns 4.10 rather than the `sqrt(9.27) = 3.04` the note asserts from the
   ratio alone (§1c C15). The note published an arithmetic estimate of a
   quantity its own data measures, which is the shape of error the corpus's
   own rules exist to stop. **This is the largest single omission in the three
   notes** [MEASURED here, 2,000 resamples].

2. **Note C did not check the scope of the defect it raised, and named two
   files that carry nothing to correct.** One `grep -c bootstrap` on
   `destroyer-census-01.md` returns 0; one `grep -n bootstrap` on
   `head-residual-factor.js` returns "bootstrap over gaps". Both take seconds
   and both were owed before a corpus-wide claim was written into a ledger
   verdict and a TODO proposal (§1c C16).

3. **Note C evaluated a registered model on a different sample from the
   measurement it scored it against.** P7's 0.016 is the top two bands; the
   measured 0.0326 is all 27,292 zones; on the same list the model gives 0.0285
   (§1c C18). Recomputing the formula on the note's own zone list is one line.
   The consequence is that the note reports its own model as "a factor of two
   low" when it is 14% low, which understates a heuristic that happens to work.

4. **Note C did not count the tail's distinct `a_last`.** It argues the tail
   has no redundancy from a shell-width estimate. The same accumulator that
   produced 1,910 would have produced the tail's number and turned an argued
   claim into a measured one in the same sweep (§1c C21).

5. **Note A's `N3` excess is quoted against the subsample's own measured
   value, and the alternative pairing is not reported.** Both numbers are in
   the producer's SEC 6 block, on adjacent columns. Reading the full-band
   measured against the same `N3` predictions moves the `u = 5` ratio from
   1.325 to 1.229 (§1a A14). The note printed both columns and read only one.

6. **Note A's sigma on that excess prices one of its two sampling terms.**
   `N3`'s own 40-anchor, 60-replicate error is absent from the quoted `+-`
   (§1a A15). A replicate-level sd of the `N3` prediction is free from the same
   loop.

7. **Note A did not split `E` by side (A/B), for the second time.** The
   controlled note carried it on its NOT REACHED list; this note carries it
   forward again. It is the same engine and the same sweep.

8. **Note A ran no anchor-level control.** All three nulls are per-anchor and
   the pooled statistics treat 1,205 anchors as independent draws, but
   consecutive anchors `Q` share primes and their stretches are adjacent. A
   pooled `z` of `-11.39` prices no anchor-anchor dependence at all. This is
   the same class of defect note C found in its own head field and did not look
   for in a neighbouring note.

9. **Note B's paired deltas have no unpaired cross-check inside custody.** The
   note says so in its §7b and prices the check at minutes. It was not run, and
   it is the one control that would show the common-random-numbers construction
   is not carrying the `-0.0012`.

10. **Note B attributes the whole `b_A` against `b_z` gap to `b` varying with
    height and never measures the profile.** The sign of `cov(-z, 1/L)` gives
    the direction; a height profile of `b` over the 72 records is one pass over
    a vector the producer already builds. `lit-kourbatov-shortfall.md` §5 does
    quote `b = 0.713` in the bottom band, so the ingredient exists in the
    corpus and was not carried in.

11. **Note B's median normalisation is reported as a caution and dropped.**
    `b_med` is the estimator Kourbatov's own 1.2597 is stated in, and it is the
    one where the fullest null carries 40.5% and the residual falls to 0.78.
    The §0 bullet and the ledger verdict quote only the z route's 25% and 0.97.
    A reader of the ledger alone gets the least favourable of the three
    numbers, which is the safe direction, but not the one the literature's own
    estimator gives.

12. **None of the three searched the owning convention for its null.** Note B
    names the exposure (arXiv:1401.6959's Cramer-model ensemble, still unread,
    "the family's largest prior-art exposure") and does not close it. Notes A
    and C do not raise the question at all: an independent-thinning null on a
    sifting main term and a renewal comparator for a backward recurrence time
    are both objects the literature owns under names this corpus does not use,
    and `research/SEARCH-CONVENTIONS.md` discipline is owed before either is
    called novel. **None of the three claims novelty**, so this is an omission
    and not an error.

13. **Notes A and C each retire or reclassify a standing item on one sweep of
    one engine.** Note A retires `object-models-read-0829.md` §4's last open
    row on a 40-anchor subsample that was not pre-registered; note C proposes
    `Q-zone-tail` to ANSWERED on one sweep with no second engine above 1e8, and
    its own §7 defect 1 names that as "the obvious red-team target". Neither
    retirement is wrong on the evidence. Both are thinner than the word
    "retire" carries.

14. **A structural remark on the wave rather than on any note.** Two of the
    three notes carry a pre-registration whose bands are inside the producer's
    hashed code, and the third does not (§2). That difference costs nothing to
    remove: putting the registered bands above the OUTPUT banner binds them to
    `code-sha256` and is the only prereg custody available in a wave with no
    commits. It should be the wave's default, not two cases out of three.

---

*Adversarial red team, wave B, no producer. Re-derivations run on scratchpad
code written from the conventions rather than from the reviewed producers:
an independent segmented sieve to 4e5 for the zone list, band counts,
`headMax`, `c_head`, the distinct-`a_first` counts and both bootstraps; an
independent extraction of A113274 and A113275 for the `b` estimators and the
cov identity; independent Simpson integration for `2 C2 int dt/ln^2 t`; an
independent binomial sampler for the `1 - p` identity. CITED, never
recomputed: the capture identity, `beta_2 = 4.2665`, Ford §1.7.2 through
`quadpoint-prior-art.md`, Kourbatov-Wolf's trend and Gumbel forms, and
`ZONE-POSTULATE.md` §5a. No file outside this one was edited and no git command
was run. History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
