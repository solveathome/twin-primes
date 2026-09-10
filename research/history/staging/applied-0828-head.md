# Applying the head red team: forty-two edits across the three notes, and four corrections owed outside the fence

<!-- ledger
id: Q-applied-0828-head
status: ANSWERED
todo: Z4
question: Were the head red team's corrections applied to the three HELD notes?
verdict: Applied. Every WEAKENED and REFUTED row of redteam-0828-head.md lands in the note it targets as 42 prose edits, and all three ledger verdict lines now carry the surviving chain; four corrections fall outside the fence and are owed elsewhere, the load-bearing one being destroyer-census-01 §6(b)'s R and its h/R = 1.09 -> 1.03.
-->

STATUS: HELD, staging. A record of edits, not a result. Nothing here is
measured or derived; every number moved into the three notes comes from
`research/history/staging/redteam-0828-head.md` and its embedded script, cited
in place as `redteam-0828-head.js`.

Scope: `head-residual-factor.md`, `head-residual-null.md`,
`head-residual-hl3.md`. Their `.js` producers are untouched, so where a script
prints a figure the prose now corrects, the divergence is listed in §3 rather
than fixed. No live document is touched.

---

## 1. What the corrections change, in one place

The surviving chain, now written into all three notes' `<!-- ledger -->`
verdict lines so that whichever note the index surfaces reads the same:

- h - R decomposes exactly, and A_forced = (E[g] - 2)/E[n] derives.
- h/R -> 1 follows from beta CV^2 being bounded. beta CV^2 -> 2 controls the
  RATE, not the limit; under that limit h - R -> D = -0.95, so the accepted fit
  +8.4661/ln^2 p is local and cannot be the limit law.
- R is the continuum functional. An integer-origin null sees R + 1/2 exactly,
  so "h - R = 5.679" depends on the unstated null population: 5.179 for the
  discrete uniform origin, 2.925 for the coprime-to-30 one primes occupy.
- The mod-30 answer is NO by a valid route, the class-reweighting term being
  -0.0001. The two old bounds were not bounds.
- Delta = 2 - beta is priced by Hardy-Littlewood to 5.3 percent with nothing
  fitted, and HL's own 1/ln x term absorbs the miss, so "5.5 s.e." is dropped.
- The asymmetry-as-mechanism claim and the [0.289, 0.361] bracket are refuted;
  hl3's 16 percent stands.
- beta_null is 1.898 for the discrete-consistent null and 2 in the continuum.
- The 72/28 split reads 81/19 in the other exact order of the same identity.
- c = 0.844 reads 0.722 on a subset, so it is pinned to about 15 percent.
- Delta_HL ln p/lnln p = 4.02 is a property of the prediction.
- The N4 plateau is not OPEN: sustaining it needs beta CV^2 = 2.71 at
  ln p = 17.9 rising to 6.63 at 100.

---

## 2. The edits

### `head-residual-factor.md` (14)

| Where | Was | Is |
|---|---|---|
| title | "the limit stays open" | "the rate stays open" |
| ledger verdict | h - R = A + B; A_forced derives; not mod-30 | the surviving chain of §1 |
| §0, second bullet | the limit turns on one product reaching 2 | the RATE turns on it; the limit needs only boundedness |
| §0, third bullet | the plateau "was not excluded", reported as the disconfirming reading | excluded by §3's identity unless beta diverges, needing beta CV^2 = 2.713 to 6.633 |
| §1, R bullet | "the mean forward recurrence a UNIFORM origin would see" | the CONTINUUM functional, with R + 1/2, R + 1, R + 2.754 for the three discrete origins |
| §1, the h - R list | 4.001 ... 5.679, comparator unstated | same list, stated as against R as written, with 5.179, 4.679, 2.925 at the top window |
| §3, beta's null | "a null of 2 - 2/ln p" | 2 - 2 lambda_bulk = 1.898 discrete, 2 continuum, and why 2 - 2/ln p over-counts |
| §3, closing | "so h/R -> 1 iff beta CV^2 -> 2" | "h - R is bounded iff"; the limit needs beta CV^2 = o(ln p) and D = o(ln^2 p); plus the sign-change paragraph on +8.4661/ln^2 p |
| §4 | three bounds, worst 0.563, "an order of magnitude short" | the class-reweighting term -0.0001 against h - R_cop30 = 2.9253, with the two old bounds dropped as not bounds |
| §5 | "reduces to exactly two limits: CV^2 -> 1 and h/R -> 1" | reduces to CV^2 -> 1 and c_g -> 1/(2C2), both HL; h/R -> 1 needs only bounded beta CV^2; HL noted as under-credited |
| falsification table, mod-30 row | "YES, three bounds, worst 0.563" | the -0.0001 class term, 0.002 percent, one window |
| falsification table, beta row | "beta -> 2, hence h/R -> 1 \| CONJECTURED" | split: beta CV^2 -> 2 hence h - R bounded (CONJECTURED), and a new h/R -> 1 row PROVEN from the identity given D = o(ln^2 p) |
| falsification table, last row | "h/R -> 1 rather than a plateau \| OPEN" | the plateau is not available, PROVEN from the identity unless beta diverges |
| defects | no entry for the census | a bullet: `destroyer-census-01.md` §6(b) reads h/R against a population no prime belongs to |

### `head-residual-null.md` (17)

| Where | Was | Is |
|---|---|---|
| ledger verdict | beta = 2 and CV^2 = 1 under the null, wrong sign | the surviving chain of §1 |
| §0, first bullet | the measured +8.4704/ln^2 p, quoted flat | the same, with 8.4661 named as the sibling's error model, and the law flagged as local because the identity sends h - R to D |
| §1, beta_null heading | "beta_null = 2 exactly" | "2 in the continuum, 1.898 discrete", with the convention stated |
| §1, the sibling's null | "2 - 2/ln p is not density-consistent" | the red team's corrected sentence: 1.898 in the measured convention, 1.887 off by 0.011 not 0.113 |
| §1, simulation | "all six statements are checked" | checked in the continuum convention |
| §1, closing | "the null settles the direction of the sibling's open question" | h/R -> 1 holds under the null but the identity gives it for any bounded product; the null adds only the rate and the sign, both wrong |
| §2, closing | the 72/28 split, unqualified | one of two exact decompositions; the other order reads 81/19; the rise survives both |
| §3, reading 2 | "the asymmetry is the mechanism naming itself" | withdrawn; the 381,332-pair direct measurement, 11.9752 against 11.9807 at 0.70 Poisson sd, plus the two binning causes |
| §3, reading 3 | 6 to 7.5 lambda_s, "roughly half", [0.289, 0.361] | 2 lambda_bulk = 0.1020 and 2 lambda_s = 0.0963, 14 to 16 percent; the 30/8 conversion does not belong |
| §3, closing | "everything in Delta is O(1/ln p)" | that reading, against O(lnln p/ln p) under HL, with the lever arm unable to separate them |
| §5 | "left-heavy, about half priced by discreteness" | symmetric once the binning is fixed, about a sixth priced, and the two rates |
| defects, bullet 1 | "the consistent value is exactly 2" | 1.898 in the script's own convention, 2 in the continuum, the script's 1.887 off by 0.011 |
| table, beta_null row | all exact | all exact in the continuum convention; discrete beta_null is 1.898 |
| table, 72/28 row | the split, unqualified | plus the 81/19 order |
| table, live-slots row | HEURISTIC, bracket [0.289, 0.361] | MEASURED from the statistic's own flat baseline, 14 to 16 percent |
| table, MS row | non-monotone shells as the ground | HL's shells are non-monotone too at r = 0.9518; only the accrual rate separates them |
| table, limit row | "beta -> 2 and CV^2 -> 1, hence h/R -> 1" | hence beta CV^2 -> 2 and h - R bounded; h/R -> 1 needs only boundedness |

### `head-residual-hl3.md` (11)

| Where | Was | Is |
|---|---|---|
| title | "HL over-predicts it at five standard errors" | "the miss sits inside HL's own error term" |
| ledger verdict | over-predicting at 5.5 s.e. | the surviving chain of §1 |
| §0, first bullet | "a miss of 5.5 standard errors" | a 5.3 percent over-prediction; 5.49 OLS, 6.51 interleaved-jackknife, 3.31 contiguous-jackknife; 0.276 percent in alpha amplified 19.29x; inside HL's 1/ln x term; not evidence against HL |
| §0, third bullet | "c = 0.844 over [1e3, 2e5]" | over six points, 0.722 on a four-point subset, pinned to about 15 percent |
| §1 | "rho's own mean, which HL's normalisation forces to 1" | nothing forces it at finite g; a Gallagher-type average, and 0.9582 -> 0.9910 is the approach, not a check that passed |
| §4 | HL's reflection symmetry alone | plus the model-free 381,332-pair measurement, and "should be withdrawn" now reads as withdrawn |
| §5 | "4.022, 4.005, 4.025, flat to 0.5 percent" | flat by construction, a property of the prediction; the measured 3.506, 3.857, 3.822 is flat only over the top two |
| §6 | "0.033 out of 0.621, five standard errors" | 0.033 out of 0.621, 5.3 percent; the standard-error framing dropped and why |
| table, c row | D(T)/ln T swings 0.95 to 1.23 | plus c = 0.722 on a subset, 15 percent |
| table, HL-prices row | "miss 5.5 se at the top" | a 5.3 percent miss, 3.31 to 6.51 s.e. by error model, inside HL's 1/ln x term |
| table, rate row | flat to 0.5 percent over three windows | the prediction is flat by construction; the measured version is flat only over the top two |

---

## 3. Corrections owed outside the fence

| Target | What is wrong | The correction |
|---|---|---|
| `research/destroyer-census-01.md` §6(b) | R is called the mean forward recurrence a uniform origin would see, and h/R = 1.09 -> 1.03 is read against it | R is the CONTINUUM inspection-paradox functional. A discrete integer origin sees R + 1/2 exactly, an odd origin R + 1, a coprime-to-30 origin R + 2.754 at [1e7,1e8). The ratio is quoted against a population no prime belongs to, and h - R reads 5.679, 5.179 or 2.925 by choice of null. Owned by another agent this session |
| `TODO.md` item Z4 | its `Ledger:` line reads `Q-head-residual` only | the gate wants `Ledger: Q-head-residual, Q-redteam-0828-head` |
| `research/QUESTIONS.md` | generated; all three notes sit under one id and the index shows one note's verdict | the three verdict lines now agree, so a regeneration (`node research/qc.js --index`) makes the index read the surviving chain. Not run here |
| `research/GLOSSARY.md` | no entry for **opener**, **head**, **tail** | flagged by all three notes and by the red team; still true |

Script-level defects, left to their owners because the fence forbids editing
the producers:

- `head-residual-factor.js` SEC 2b prints the null as 2 - 2 lambda. The prose
  now reads 1.898 discrete and 2 continuum, so script and note diverge on that
  one printed figure.
- `head-residual-null.js` hard-codes the sibling's measured decade table
  (`decLnp`, `decBeta`, `decCV2`, `decEg`, `decEn`, `decHmR`, `decD`). The
  transcription is correct, and the corpus has a standing rule against
  hand-copied numbers inside a script.
- `head-residual-factor.js` and `head-residual-null.js` refit the same six
  points and print 8.4661 against 8.4704, and 8.127 against 8.518, differing
  only in the error estimate. The null note now says so; neither script does.
- `head-residual-null.js` SEC 2's `cntL` skips the forced pair and its right
  column's 30-shell is offset by two positions. That is the whole of the
  left-heaviness. The prose is corrected in three places; the accumulator is
  not.

---

## 4. What was not applied, and why

- The eleven CONFIRMED rows are left alone. Two carry a caveat worth stating
  and only one of the two is written in: row 23's "HL is under-applied" now
  appears in `head-residual-factor.md` §5, since A_forced rests on HL there.
  Row 13's "h - R = A + B asserted to 1e-9 is a tautology, since A and B are
  defined as h - h1 and h1 - R" is not written into that file's §2. The
  assertion tests floating point rather than content, and a reader of §2 will
  not learn that from the note.
- Row 16's jackknife refit figures (N1 8.4771 at chi2/df 0.832, N2 0.4943 at
  7.989, N4 at 0.700) are not carried into the factor note's fit table. They
  confirm the note's own bootstrap verdict and moving them in would mix two
  error models in one table.
- No script was run and no git command was issued, so nothing here is a fresh
  measurement and no embedded OUTPUT block moved.
