# The lit-and-imports red team applied: six HELD notes corrected, one banked theorem struck, and the corrections the live layer still owes

<!-- ledger
id: Q-applied-0828-litimports
status: ANSWERED
todo: Z5, 4 (retired)
question: Were the lit/imports red team's corrections applied to the six HELD notes?
verdict: Applied, 64 substantive edits across the six notes: the Saffari-Vaughan range exponent is 6/11 in both import notes, the fixed-M THEOREM in import-fracparts is struck and the cap-36 MEASURED to PROVEN upgrade withdrawn, row 15 loses its theorem column and row 16 is regraded stale, and the six weakened sentences in the four literature notes now read as the audit requires; four claims are declined with reasons, and nine live documents plus two fenced staging notes are recorded here as owing corrections that this pass did not apply.
-->

*(2026-08-28. Application pass over `redteam-0828-litimports.md`. Fence: this
pass edited only the six audited notes and wrote only this file. It edited no
`.js` producer, no live document, no other staging note and not the red-team
note; it ran no git command and did not run `research/qc.js`. Every WEAKENED
and REFUTED verdict in the audit is either applied below or declined with a
reason in §4. Where the audit supplied a corrected sentence it is used; where
it did not, the minimal correct sentence is written. All six notes remain
HELD.)*

---

## 0. What is still open after this pass

**The strike rests on one image of one scan.** The whole of §1 below follows
from reading printed p. 7 of Saffari-Vaughan II at a 150 dpi rendering of the
Numdam digitisation, cross-checked against the paper's own `c/(c+2)` derivation
with its density-hypothesis limit `1/2`. No second digitisation exists in
circulation. If `6/11` is itself a misreading, the strike reverses and the
banked theorem comes back.

**Theorems 6 to 9 were not opened.** The fixed-`M` marginal may be rescuable
from the `y ≥ x` half of the same paper. Nobody has looked.

**Nothing in the live layer moved.** Eleven corrections the audit implies for
live documents are recorded in §5 and applied nowhere. `research/QUESTIONS.md`
is generated from the ledger blocks and was not regenerated here; at the time
of writing it is stale for `Q-record-deficit`, whose chain verdict changed.

**Custody is unchanged and still weak.** `record-location-null.js` and
`lit-kourbatov-shortfall.js` carry no OUTPUT banner, so every figure in those
two notes is hand-pasted. Each note now says so and says the numbers may not
leave it. Neither producer was touched.

---

## 1. `import-fracparts.md`, TODO item 4: 17 edits

The load-bearing correction is that Theorem 10 reads `x^{6/11+ε} < y ⩽ x` with
saving `exp(−C(ε)(log x/log log x)^{1/3})`, so the lower range condition is
`M > W^{1/12}` and is not vacuous. The coverage table is unaffected and its
prediction still scores a HIT; the banked theorem is void.

| § | old reading | new reading |
|---|---|---|
| ledger `verdict` | "the theorem overpriced ... one cap-36 line upgrades MEASURED -> PROVEN" | "the THEOREM column is struck, not merely overpriced, because Theorem 10's range condition is x^{6/11+eps} < y, which fails at fixed M; no route; no cap-36 line is upgraded" |
| §1, prereg part 1 | quotes the range condition as `x^{1/11+ε} < y ≤ x` | the prereg's own words stand; a parenthetical records that the page reads `x^{6/11+ε}` and that the correction leaves the covered set unchanged at every computed level |
| §2, THEOREM pricing | "was too high, and this pass lowers it ... wrong for two reasons" | "is struck, not lowered ... three things are wrong with it", the first being the lower range condition failing at fixed `M` |
| §2, bullet 2 | saving `exp(−C(ε)(log x)^{1/3})`; `M ≪ exp(C(log W)^{1/3})` reads 10.6 to 22.1 at @17 to @37 | saving `exp(−C(ε)(log x/log log x)^{1/3})`; the condition reads 5.59 to 7.85, with the producer's coarser column noted as about three times too generous. The conclusion, that `M = 30` is admitted at no level, is unchanged |
| §2, still open | "TODO item 4, which this pass answers only in the 'restate' direction" | item 4 is not answered in the restate direction either, since the surviving statement lives on the growing window `W^{1/12} < M ≤ √W` |
| §3, custody | "read with `pdftotext -layout`; the extraction is imperfect" | the text layer is corrupted OCR and the decisive pages are read at a 150 dpi page image |
| §3, Theorem 10 block, flagged **[SOURCED, verbatim]** | `x^{1/11+ε} < y ≤ x`, `O(exp(−C(ε)(log x)^{1/3}))`, with the `1/11` defended from the zero-density remark | **[SOURCED at the page image]**, `x^{6/11 + ε} < y ⩽ x`, `O(exp(−C(ε)(log x/log log x)^{1/3}))`, with the `c/(c+2)` derivation shown to admit `6/11` at Ingham's `c = 12/5` and no reading giving `1/11` |
| §3, range condition | lower condition never binds; `ε < 9/22 = 0.40909`, row 15's `0.39` conservative | two-sided window `W^{1/12} < M_T ≤ √W`; `W^{1/12}` runs 2.36 to 11.82 at @13 to @37, below every branch modulus, so the covered set is unchanged and the coverage table stands; admissible `ε` at @19, `M = 30` is `ε < 0.0886`; at fixed `M` the lower condition fails |
| §3, main-term bullet | Theorem 1 and Corollary 1.3 errors `O(x^{1/2}y^{−1} log x)`; `F(α, ξ) = α + O(1/ξ)` derived by holding `ξ` fixed as `x → ∞` | both errors are `x^{1/3}`; holding `ξ` fixed violates Corollary 1.3's hypothesis `y/x → 0`, so the diagonal derivation is written out (`ξ_n → ∞` with `ξ_n x_n^{−2/3} log x_n ≤ 1/ξ_n`) |
| §3, error-term bullet and reach | `M ≪ exp(C(log W)^{1/3})` | `M ≪ exp(C(log W/log log W)^{1/3})`, available only inside `M > W^{1/12}` |
| §6, payoff | "**THEOREM [banked, one, asymptotic, marginal]** ... the marginal `⌈W/q⌉ mod 30` ... moves from MEASURED to PROVEN as an asymptotic" | "**NO THEOREM: the column is struck, not repriced**". The fixed-`M` statement is void because its hypothesis is `M > W^{1/12}`. What survives is the same statement on the growing window `W^{1/12} < M ≤ √W`, which upgrades nothing: the cap-36 Measurement D line is finite-level at nine named levels and an ineffective asymptotic certifies no finite level |
| §7, NOT REACHED | "the `x^{1/2}` in Theorem 1's error and the `1/3` in Theorem 10's are OCR readings" | replaced by the open item that matters: Theorems 6 to 9, the `y ≥ x` half, were not opened |
| §7, AP-version bullet | reach quoted as `exp(C(log W)^{1/3})` | `exp(C(log W/log log W)^{1/3})` |
| §8, draft regrade row | payoff "PUBLISHED-ANCHOR + WALL-ADDRESS + THEOREM (one, asymptotic, marginal, fixed `M`)" | "PUBLISHED-ANCHOR + WALL-ADDRESS; **no THEOREM**", with the reason in the cell |
| §8, landing paragraph | "The THEOREM was overpriced ... upgrades one measured line of cap-36 Measurement D ... TODO item 4's 'restate' in its smallest honest form" | the column is struck, no cap-36 line is upgraded, and item 4's "restate" is not executed |
| falsification list | "The banked THEOREM is falsified if `F(α, ξ)` does not tend to `α`" | two entries: the strike is falsified by a second digitisation or by Theorems 6 to 9 (PARTIALLY RUN and NOT RUN), and the surviving window statement carries the old `F(α, ξ)` falsifier |
| defects in passing | row 15's `ε < 0.39` called "conservative, harmless" | row 15's derivation comes from a misread exponent; the correct condition is two-sided and the row's THEOREM column does not survive |

---

## 2. `import-map-rows-15-17.md`: 15 edits

| § | old reading | new reading |
|---|---|---|
| ledger `verdict` | "Rows 15 ..., 16 (records theory; stale, Z5 closed under it) and 17 ... priced; six fields rejected" | row 15 is a wall address and an anchor and not a theorem; row 16 is stale with its experiment already executed and its prior-art half closed; row 17 lands as priced; six rejected and one promoted |
| §0 | "Eight candidate fields ... Five came back already spent ... Three survive" (against seven rows in §4 and "six" in the ledger) | "Ten candidate fields ... Six came back already spent ... a seventh, the determinantal candidate, is not rejected but promoted to row 17. Three survive" |
| §1, row 15, theorem cell, flagged **[SOURCED, verbatim]** | `x^{1/11+ε} < y ≤ x`, `O(exp(−C(ε)(log x)^{1/3}))` | `x^{6/11+ε} < y ≤ x`, `O(exp(−C(ε)(log x/log log x)^{1/3}))`, Theorem 1 and Corollary 1.3 errors given as `O(x^{1/3}y^{−1} log x)`, and the flag rewritten to say the reading is from a 150 dpi rendering and that the text-extraction reading does not survive the image |
| §1, row 15, payoff and status | "THEOREM (for the reachable branches) + WALL-ADDRESS + PUBLISHED-ANCHOR", **UNTRIED** | "WALL-ADDRESS + PUBLISHED-ANCHOR; **no THEOREM**", **LANDED 2026-08-28 (`import-fracparts.md`), no route; prediction HIT** |
| §1, row 16, payoff and status | "DERIVED-CONSTANT ... + WALL-ADDRESS", **UNTRIED** | "WALL-ADDRESS only", **STALE**, with the two notes that executed it named |
| §2, row 15 | "priced as a banked theorem and a wall ... If that arithmetic survives a second reader" | priced as a wall and an anchor and not a theorem; the arithmetic survived a second reader with one correction, and the row banks no theorem at all |
| §2, row 16 | ends on "this row is that move with the corrected null taken from print" | adds that the move has since run in house, names both notes, and says what is left of the row is the wall address |
| §3, preamble | "None of these has run." | none had run when the rows were priced; rows 15 and 17 have since run and row 16 was overtaken |
| §3, row 15 mapping | `x^{1/11+ε} < y ≤ x` | `x^{6/11+ε} < y ≤ x` |
| §5, verification ledger | "the error exponent in (1.28) is read as a cube-root-of-log saving and is flagged rather than quoted" | printed p. 7 read at a 150 dpi rendering, with the range condition and the saving both quoted |
| §6(b) | lower condition "satisfied at every level ... for `ε < 0.39`" | two-sided window `W^{1/12} < M_T ≤ √W`; complementarity with Proposition E stands, the theorem does not; run and scored in `import-fracparts.md` |
| §7, first bullet | "All three rows are UNTRIED" | none had run when priced; rows 15 and 17 have since run, row 16 was overtaken |
| falsification, row 15 | kill test NOT RUN; `F(α, x/y)` NOT RUN | kill test RUN and did not fire (0.20 / 0.70 / 5.68 / 1.10%); `F` derived from Theorem 1 and Corollary 1.3; the falsifier that did fire is the row's own reading of the range exponent |
| falsification, row 16 | NOT RUN | NOT RUN and moot, the row being stale |
| falsification, row 17 | NOT RUN, hand arithmetic at four `q` only | RUN in `import-repulsive.md`: `g` is 0 or at least 2.3812, never in `(0,1)`, `d = 6` the exact minimiser |

---

## 3. The four literature notes

### 3a. `record-location-null.md`, TODO Z5: 4 edits

| § | old reading | new reading |
|---|---|---|
| header | "SCRATCHPAD-GRADE, not formally embedded" | outside output custody, `embed.js --check` finds no OUTPUT banner, every figure hand-pasted, none may leave the file until the producer carries one; and the headline figures reproduce on an independent 2,000-rep re-implementation |
| §2, N1 bullet | "applying an n_eff-style deflation on top of N0 would push the test to z ≈ −6.9" | the mechanism runs the other way: `−6.9` is the uncorrected independence reading and is what the N1 row is, while an n_eff deflation widens `sd/√n_eff` and can only move `z` toward zero |
| §3, mean-gap bullet | the HL2 calibration ratios show "ā is right to 5e-5" | the ratios validate the cumulative pair count against `HL2 = 2C₂∫dt/log²t`, so `Li₂` and `a_c`, not `ā` as a local mean; the local statement comes from differencing the two calibrations across the decade, giving `1 + 3.0e-5` |
| §8, falsifier | "Falsified by the cited HL2 calibration ratios: RUN" | falsified by differencing them, with the note that the raw ratios on their own validate `Li₂` and `a_c` |

The ledger verdict is unchanged: both premise corrections it names survive the
audit at source, and the record-process correlation finding is stronger, not
weaker, than the note wrote it.

### 3b. `lit-kourbatov-shortfall.md`, TODO Z5: 6 edits

| § | old reading | new reading |
|---|---|---|
| ledger `verdict` | "prior art as a measurement, unexplained as a mechanism in both corpora" | prior art DOCUMENTED and not explained, plus the 15% disagreement between the two in-house estimators of `b`, 1.125 from `A` against 1.298 from mean `z` |
| header | "SCRATCHPAD-GRADE, not formally embedded" | outside output custody, no OUTPUT banner, figures hand-pasted, numbers may not leave the file |
| §1, third bullet | "The size matches in the repo's own A-normalisation ... within one null sigma of two of the three" | the size is consistent and consistency is all it is; it is not an independent confirmation, the A-route's implied `b` is 1.125 against the median route's, and the two estimators agree only to about 15% |
| §1, what this does not close | "prior art as a *measurement*, not as a *mechanism*" | prior art *documented*, not *explained*, then the same sentence |
| §5, b-unit table | two rows, mean `z` 1.2981 and median `z` 1.3159 | third row added: `b` implied by `A`, 1.1251 |
| §5, new paragraph | absent | states the 15% disagreement, its arithmetic (`mean_k(1/L_k) = 0.06269`, `1 − A = 0.0705`), its explanation (the `1/L_k` weight upweights low records about sixfold and the bottom band carries `b = 0.713`), and that only the median route carries the four-digit match |

### 3c. `import-repulsive.md`: 9 edits

| § | old reading | new reading |
|---|---|---|
| ledger `verdict` | "periodic hence class I hyperuniform vacuously, sub-Poisson not hyperuniform at L = y^u" | every fixed level is class I and the statement is empty, while along the diagonal family `L = y^u` no member approaches a hyperuniform limit in `Var/E`, which is a statement about the family and not a class for any one tile |
| §0, taxonomy paragraph | "The correct word there is sub-Poisson, not hyperuniform" | the same, restated as a property of the diagonal family rather than of the tile |
| §3, bounded-variance quote | attributed to "p. 28", quoted in truncated form | §5.3.1, arXiv p. 25, eq. (88), quoted in full, with two riders: the right-hand side is `B_N(R)` and not the constant `B̄_N` of eq. (87), and the statement is an ensemble average |
| §3, class-I quote | "Torquato §5.5, p. 28" | "§5.5, arXiv p. 28" |
| §3, taxonomy at its rung | "at window scale `L = y^u` the tile is **sub-Poisson and not hyperuniform**, MEASURED" | hyperuniformity classifies one configuration by its large-`R` asymptotics, so the `L = y^u` reading is a statement about a diagonal family, one configuration per level; no member approaches a hyperuniform limit in the measured ratio |
| §6, verification ledger | page numbers listed against the *Physics Reports* citation | every page number declared an arXiv:1801.06924 page, of 113, against a journal article of 95 pages on different pagination; `§5.3.1 eq. (88) arXiv p. 25` added and split from `§5.5 arXiv p. 28` |
| §7, regrade row citation | "*Physics Reports* **745** (2018) 1–95, §5.3 p. 23, §5.5 p. 28, eq. (14) p. 10, eq. (252) p. 78 **[SOURCED at the author's arXiv full text]**" | the same journal reference, with the pages declared as arXiv pages and eq. (88) p. 25 added, and the flag saying these are not the journal's page numbers |
| §7, status text | "the tile is class I hyperuniform only because it is periodic ... the correct word is sub-Poisson" | each fixed level is class I; the family statement is what "sub-Poisson" names |
| §8, taxonomy word | "Sub-Poisson but not hyperuniform at the window scales that matter" | sub-Poisson along the `L = y^u` family, with no member approaching a hyperuniform limit |

Everything in this note that the audit graded CONFIRMED is untouched: `g(2) = 0`,
`g(6) = 2.661728` at `x = 11`, the two closed forms agreeing to `4.9e−15`, the
exhaustive sweep to `d = 2·10⁶`, the level-uniform lower bound as a proof, and
the `import-map-construction.md` product evaluating to zero as written.

### 3d. `lit-vc-multiples.md`: 13 edits

| § | old reading | new reading |
|---|---|---|
| §0, HSW leg | Thomas "describing it as bounding 'the VC-dimension of subsets of multiples of `d` lying between `−n` and `n`'" | arXiv v1's sentence is missing its verb and is quoted as such; OJAC's stronger repair, "establishes a formula for", is quoted; both descriptions are Thomas's, single-source and uncorroborated against HSW's own `Z^k`-in-a-box abstract |
| §0, forward citations | "zero, on two channels" | "zero, on three channels" |
| §1, venue bullet | the published version "carries the same numbering ... checked line by line against the arXiv text" | the numbering agrees and the documents do not: four references against six, the HSW sentence repaired differently, the closing justification of Corollary 1.2's proof rewritten |
| §1, extraction discipline | ends at "Both confirmed at the image." | adds the `pdftotext` trap that renders `H′` as `H0` throughout the OJAC PDF |
| §4, opening | "The paper has four references." | "arXiv v1 has four references; OJAC has six", with the two additions named |
| §4, HSW bullet | order-of-growth comparison, "not a check" | the same, plus the note that the `k = 1` multiples-of-`d` reading is Thomas's alone |
| §5, OpenAlex calibration | Pach-Tardos, `W1995671037` | the same, with the venue and DOI, *J. Amer. Math. Soc.* 25 (2012), `10.1090/s0894-0347-2012-00759-0` |
| §5, Semantic Scholar | no rider | adds the 429-on-first-pass rider, since a 429 recorded as a negative would be a fetcher artefact |
| §5, OpenCitations | "returned HTTP 301 ... **Channel dead this session, no negative recorded from it**" | the 301 is a fetcher artefact: `curl -L` resolves it to `api.opencitations.net`, HTTP 200 with `[]`, the v2 endpoint agrees, and the channel calibrates three ways (40,830 / 267 / 19), so its zero is a third calibrated negative |
| §5, closing line | "Two citation channels agreeing on zero" | "Three citation channels agreeing on zero" |
| §7, novelty phrasing | "zero citing works on two calibrated channels" | "three calibrated channels" |
| §8, HSW falsifier | "Routes not yet tried: MathSciNet `mrlookup` ..., zbMATH, ..." | roughly thirty routes have failed; zbMATH is tried and yields nothing (Zbl 0747.68047 carries only the publisher's summary, no theorem numbering, no references); the remaining routes are institutional SIAM, ACM DL id 92655, `mrlookup`, or interlibrary |
| §8, versions and channels falsifiers | "They agree"; "two channels ... A third channel, OpenCitations, was dead" | the statements agree and the documents do not; three calibrated channels |

The ledger verdict is unchanged. DISJOINT at theorem level, HSW Theorem 3.1
still OWED at abstract level, and the reachable-neighbourhood negative is now
carried on three channels instead of two.

---

## 4. Declined, with reasons

- **The audit's claim that `import-map-rows-15-17.md` §1 carries the same
  Torquato page numbers under the same journal citation.** It does not. That
  note's row 17 cell cites Soshnikov and Torquato-Zhang-De Courcy-Ireland
  (arXiv:1804.06279) and contains no page number and no occurrence of "745".
  The offending page numbers live only in `import-repulsive.md` §6 and §7, and
  both are corrected there. Nothing was edited in the rows note on this count.
- **The audit's §2a caveat that the null's `A` level is construction-dependent
  in its third decimal, so 0.9895 should not be quoted to four digits.** Graded
  CONFIRMED, not WEAKENED, and it does not threaten the finding. Not applied,
  and recorded here so the next holder of `record-location-null.md` can decide.
- **The audit's §4a strengthening, that Thomas's shattered 4-set lives near
  `10^11` rather than `10^7`.** A strengthening of an argument already safe at
  `10^7` against a window of 250, not a weakened claim. Not applied.
- **`record-location-null.md` §7 and §8 still record "the deficit is already in
  the literature: NOT CHECKED" as the note's largest open exposure**, which
  `lit-kourbatov-shortfall.md` closed the same morning. That staleness predates
  the audit and is graded nowhere in it, so it is left for the note's holder
  rather than repaired here.

---

## 5. Live-document corrections collected, none applied

### 5a. The corrections

| document | what it owes | source |
|---|---|---|
| `research/IMPORT-MAP.md` | rows 15, 16 and 17 are not in the map, which ends at row 14. The regrade texts are §5b below | `import-fracparts.md` §8, `import-repulsive.md` §7, `import-map-rows-15-17.md` §1 |
| `research/QUESTIONS.md` | generated from the ledger blocks and not regenerated here; stale for `Q-record-deficit` at the time of writing. `node research/qc.js --index` is the regeneration | this pass |
| `TODO.md` | already satisfied and recorded for completeness: item Z5 (line 223) and item 4 (line 441) both list `Q-redteam-0828-litimports` on their `Ledger:` lines, so the gate consequence the audit's §9 predicted is closed | `TODO.md` |
| `research/natal-cap-36-skeleton-door.md` | Measurement D's separate-census line is NOT upgraded to PROVEN by anything in this corpus; the audit's strike is the reason. Also its `.js` P4 computes `sSh[dep]` and never prints it, so the covered-side per-depth profile cannot be recovered from the embedded artefact | `import-fracparts.md` §6, §Defects |
| `research/GLOSSARY.md` | the Hyperuniformity entry defines the word as sub-Poisson `Var/E` drift, which is not hyperuniformity in Torquato's sense; it should say sub-Poisson, or split into two entries | `import-repulsive.md` §3 |
| `research/level-ledger-tight.md`, `research/FOLD-PROFILE.md` §3, `research/discrepancy-two-class.md`, `research/sift-limit-attack.md`, `research/natal-cap-29-sigma-plateau.js` | the same loose use of "hyperuniformity" for a sub-Poisson variance ratio | `import-repulsive.md` §3 |
| `research/SEARCH-CONVENTIONS.md` | three proposed rows: the distribution of the fractional parts of `N/n` and `N/p` (Saffari-Vaughan I and II as anchor, Graham-Kolesnik as method); the record-location statistic as Kourbatov's `b` coefficient with its search terms; the twin tile as the sieved-set instance the hyperuniformity row records as absent | `import-fracparts.md` §6, `lit-kourbatov-shortfall.md` §7, `import-repulsive.md` §5 |
| `research/REFUTED.md` | the one-line index closing the repulsive family in both signs | `import-repulsive.md` §7 |
| `research/PRIOR-ART.md` | the Kourbatov-Wolf bullet owes one line: the 2013 paper already quantifies the finite-height location shortfall for twins at `b ≈ 1.2597` and `µ* = −1.659` below `10^15`, and the repo's record-location statistic is that `b` | `lit-kourbatov-shortfall.md` §7 |

Two further corrections belong to staging notes this pass was fenced out of and
are recorded for their holders: `import-map-construction.md` §1 (the
determinantal rejection's distance is 6 and not 2, and its quoted product
evaluates to zero as written), and `import-vc-nets.md` §6 (the
`arXiv:2208.06442` bullet may move to "PRIOR ART, CLEARED AT THE PAPER;
NEIGHBOURHOOD ONE PAPER SHORT", and the title should read "multiples of the
primes").

### 5b. The IMPORT-MAP regrade rows, corrected

Three rows, in the map's own format, for whoever holds `research/IMPORT-MAP.md`.
Row 15 is the row the strike changes; row 16 should not land as priced; row 17
lands as priced with its citation repaired.

**Row 15**, as `import-fracparts.md` §8 now carries it:

| # | field | the importable theorem, and where its statement lives | moiré object | target hole | fit | circularity | payoff | cost | status |
|---|---|---|---|---|---|---|---|---|---|
| 15 | the distribution of the fractional parts of `x/n` and `x/p` | Saffari–Vaughan II, *Ann. Inst. Fourier* **27** (1977) 1–30, DOI 10.5802/aif.649, **Theorem 10 (p. 7)** and **(1.27)**; `c_α` defined in part I (1.9), DOI 10.5802/aif.634 **[SOURCED, both re-fetched and hashed 2026-08-28]** | the branch phase `⌊W/q⌋ mod M_T`, which cap-36 reduces to `⌊M·{W'/q}⌋`, `W' = W/M_T` | the Skeleton Equidistribution Conjecture; TODO item 4 | **EXACT-IDENTITY at the marginal face**, confirmed at the page: `x_SV = W/M_T`, `y = √W`, `α = j/M_T`. The joint face has no theorem in the source | **SPLIT, unchanged.** CLEAN where the theorem reaches, and measured to be worth `≤ 5.68%` of one branch there; the deep half stays UNRESOLVED, read at the lower rung as **suspected TPC-STRENGTH** | PUBLISHED-ANCHOR + WALL-ADDRESS; **no THEOREM**, the column struck because Theorem 10's lower range condition reads `M > W^{1/12}` and fails at every fixed `M` | 4 h, spent | **LANDED, no route; prediction HIT** |

**Row 16.** Stale by construction: it proposes as an experiment a move that had
already run. Its payoff and status cells now read as below, and the row is
offered for the map only as a record that the field was priced and spent, not
as an UNTRIED row to schedule.

| # | field | the importable theorem, and where its statement lives | moiré object | target hole | fit | circularity | payoff | cost | status |
|---|---|---|---|---|---|---|---|---|---|
| 16 | the theory of records | Rényi's record theorem: for an i.i.d. sequence with continuous marginal the record indicators are independent with `P(record at n) = 1/n`, so every record-TIME statistic is distribution-free (Rényi, *Théorie des éléments saillants d'une suite d'observations*, Aarhus colloquium 1962, 104–117 **[MEMORY]**; the same statement as developed in Arnold–Balakrishnan–Nagaraja, *Records*, Wiley 1998, DOI 10.1002/9781118150412 **[SOURCED-BIB]**, and restated in the survey Godrèche–Majumdar–Schehr, *J. Phys. A* **50** (2017) 333001, DOI 10.1088/1751-8121/aa71c1 **[SOURCED-BIB]**). The trended replacements: the `F^α` scheme, Deheuvels–Nevzorov, *J. Math. Sci.* **81** (1996) 2368–2378 and **88** (1998) 29–35, DOIs 10.1007/bf02362342 and 10.1007/bf02363259 **[SOURCED-BIB]**; Ballerini–Resnick, *Records from improving populations*, *J. Appl. Probab.* **22** (1985) 487–502, DOI 10.1017/s0021900200029272, and *Records in the presence of a linear trend*, *Adv. Appl. Probab.* **19** (1987) 801–828 **[SOURCED-BIB]** | the record ladder of `Z₂`, which `zonegap-03-model.md` §1 makes the whole of the object (`D ≡ 0`, so `Z₂ = env` exactly), read as a record process rather than as an envelope | **TODO Z5**, the 6.0% record-location deficit: `z` mean `−1.298` against a matched-null `−0.212 ± 0.244` and trend load `A = 0.9295` against `0.9895 ± 0.0182`, measured against one specific null (exponential gaps at `ābar = ln²x/(2C₂)`, Gumbel block maxima, 200 reps) | **STRONG-ANALOGY.** The theorems are for independent draws and the twin-gap sequence is neither independent nor stationary; the modification the row names is that the import is used to price the NULL, never the object | **CLEAN.** A record-time law is a statement about the observed prime record sequence and carries no bound on `G₂`; it cannot imply an every-window statement in either direction. The row-14 caution applies in its instrument form and is adopted verbatim: legitimate as an instrument, never as a link in a proof chain | WALL-ADDRESS only; the DERIVED-CONSTANT half is spent elsewhere and is not banked here | 4 h | **STALE.** The row proposes as an experiment a move that had already run: `record-location-null.md` executed the null side on 2026-08-28 and the 6.0% survives every correction available from the ensemble at `z` between −3.3 and −4.3, and `lit-kourbatov-shortfall.md` closed the prior-art half the same day by identifying the deficit with Kourbatov's published `b`. Z5's null branch is closed; its mechanism branch is open |

**Row 17**, as `import-repulsive.md` §7 now carries it, with the Torquato page
numbers declared as arXiv pages:

| # | field | the importable theorem, and where its statement lives | moiré object | target hole | fit | circularity | payoff | cost | status |
|---|---|---|---|---|---|---|---|---|---|
| 17 | repulsive point processes, and hyperuniformity as the surviving half | the two-point inequality for Hermitian determinantal measures, `P(i,j∈S) = K_ii K_jj − \|K_ij\|² ≤ P(i)P(j)`, proven in house from the `2×2` determinant and anchored in Soshnikov, *Russian Math. Surveys* **55** (2000) 923–975 and Lyons, *Publ. Math. IHÉS* **98** (2003) 167–212 **[SOURCED at abstract, theorem numbers MEMORY]**; the positive half is the Torquato–Stillinger classification by the growth of the local number variance, Torquato, *Physics Reports* **745** (2018) 1–95, read at the author's arXiv full text and cited by ITS pages, not the journal's: arXiv:1801.06924 eq. (14) p. 10, §5.3 p. 23, §5.3.1 eq. (88) p. 25, §5.5 p. 28, eq. (252) p. 78 **[SOURCED at the page image; the published article is 95 pages on different pagination and these are not its page numbers]** | the tile `T_x ⊂ ℤ/W` as a stationary point process under a uniform translate, with pair correlation `g = W(d)` (`variance-note.md` Thm 1) and structure factor `S(ν) = δ∏_p f̂_p(ν_p)` (`varE-spectral.md` §1) both exact | the family of routes modelling the survivor process as repulsive, and the owning-convention row for the local number variance | **EXACT-IDENTITY at the statistic; NEGATIVE at the model**, and two-sided rather than one-sided | **CLEAN.** A pair-correlation evaluation at a fixed level is a finite computation | CLOSURE (a family, both signs, with a mechanism) + PUBLISHED-ANCHOR | 2 h | **LANDED 2026-08-28** |

---

## 6. What would falsify this pass, and whether that check has run

- **A verdict in the audit was missed.** Falsified by re-reading
  `redteam-0828-litimports.md` §§1 to 7 against §§1 to 3 above. **RUN**, once,
  by the agent that wrote this file. Every line the audit grades WEAKENED or
  REFUTED is either in a table above or in §4 with a reason. A second reader
  has not checked it.
- **A correction was applied in the wrong direction.** Falsified by comparing
  each new reading against the audit's own corrected sentence. **RUN** for the
  seven places where the audit supplies one; the remainder are minimal
  sentences written here and are not the audit's words.
- **An edit broke a ledger block.** Falsified by parsing the six blocks against
  the format at the top of `research/qc/questions.js`. **RUN**, locally: all six
  parse, all six carry `id`, `status`, `question` and `verdict`, and every
  status is one of the five allowed. `research/qc.js` was NOT run, per the
  fence, so the gate's own verdict on these files is unknown.
- **The fence was breached.** Falsified by anything outside the six notes and
  this file having changed. **NOT RUN**: checking it means a git command, and
  the fence forbids one. What can be said is that every write in this pass named
  one of those seven paths.
- **The `6/11` reading is wrong**, in which case most of §1 and §2 reverses.
  **PARTIALLY RUN** and inherited from the audit, not re-run here: one 150 dpi
  image of one scan, cross-checked against the paper's own `c/(c+2)` derivation.

---

*This document states current understanding at 2026-08-28. It edits no live
file. All six audited notes remain HELD; the corrections in §5 are drafts for
whoever holds those documents.*
