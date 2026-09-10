# Red team 2026-08-28: the six literature and import notes, refuted until re-derived. One published range condition is misquoted in two notes and voids the theorem one of them banks; everything measured survives

<!-- ledger
id: Q-redteam-0828-litimports
status: ANSWERED
todo: Z5, 4 (retired)
question: Do the six notes of 2026-08-28 survive an adversarial pass, and which of their load-bearing claims are wrong?
verdict: Every measured number reproduces on independent code; Saffari-Vaughan Theorem 10's range exponent is 6/11 not 1/11, which voids import-fracparts's one banked THEOREM at fixed M and corrects row 15 twice; four further weakenings, one refuted verdict line, no note refuted whole.
-->

*(2026-08-28. Adversarial verification pass over the six notes written this
morning, before any of them reaches a live document. Method: refuted until
re-derived. Every decisive statistic recomputed on a code path that shares
nothing with the producers; every literature claim re-read at the page image or
on two independent extractions, with the sha256 recorded; every citation channel
recalibrated in the same session. Companion producer:
`research/history/staging/redteam-0828-litimports.js`, SCRATCHPAD-GRADE, 14.5 s.
Fence: this pass wrote these two files and nothing else, edited no existing
file, and did not run `research/qc.js`; one read-only git command was run
outside the fence and is disclosed in §9. Grades: CONFIRMED /
WEAKENED, with the corrected sentence / REFUTED, with the failing line.)*

---

## 0. Scoreboard

| note | verdict | the sentence that has to change |
|---|---|---|
| `import-fracparts.md` | **WEAKENED, one REFUTED claim** | Saffari-Vaughan Theorem 10 reads `x^{6/11+ε} < y ≤ x`, not `x^{1/11+ε}`. §3's "verbatim" block, §3's `ε < 9/22` and §6's fixed-`M` banked THEOREM all fail on it. The coverage measurement is untouched and reproduces exactly |
| `import-map-rows-15-17.md` | **WEAKENED** | Row 15 §1 carries the same `1/11` under a **[SOURCED, verbatim]** flag, and §6(b)'s `ε < 0.39` follows from it. Three counts of the rejected fields (5, 7, 6) contradict each other |
| `record-location-null.md` | **CONFIRMED, one wording defect** | §2's "applying an n_eff-style deflation on top of N0 would push the test to z ≈ −6.9" has the mechanism backwards: deflation widens sigma and shrinks the z |
| `lit-kourbatov-shortfall.md` | **CONFIRMED, one WEAKENED headline** | "The size matches in the repo's own A-normalisation" hides a 15% disagreement between two in-house estimators of the same `b` on the same window: 1.125 from `A`, 1.298 from mean `z` |
| `import-repulsive.md` | **CONFIRMED, two citation defects** | Torquato's bounded-variance sentence is at p. 25, §5.3.1, eq. (88), not p. 28, §5.5; and all its Torquato page numbers are arXiv-PDF pages carried on a *Physics Reports* citation whose article is only 95 pages long |
| `lit-vc-multiples.md` | **CONFIRMED, three WEAKENED** | "OpenCitations returned HTTP 301, channel dead" is a fetcher artefact: `curl -L` resolves it to HTTP 200 with an empty body, and the channel calibrates. The HSW paraphrase is a repaired copy of an ungrammatical sentence in Thomas, not a reading of HSW. The two versions do not "agree": 4 references against 6 |

No note is refuted whole. The one claim graded REFUTED is `import-fracparts.md`
§6's banked theorem, and the reason is a misread hypothesis rather than an
arithmetic error.

---

## 1. The correction that matters most: the range exponent is 6/11

**REFUTED.** Both `import-map-rows-15-17.md` §1 and `import-fracparts.md` §3
record Saffari-Vaughan II, *Ann. Inst. Fourier* 27 (1977), Theorem 10 as
requiring `x^{1/11+ε} < y ≤ x`, and `import-fracparts.md` §3 prints it inside a
block introduced as "Theorem 10 and (1.27), II p. 7, **verbatim**" and adds "The
range condition `x^{1/11+ε} < y ≤ x` is on the page exactly as row 15 recorded
it."

The PDF re-fetched this session is byte-identical to the one both notes hashed
(1,548,052 bytes, sha256 `26ea8606…`, and part I 951,862 bytes,
`8ec0e78a…`). Its text layer is corrupted OCR, so the page was rendered at
150 dpi and read as an image. Printed p. 7 reads:

> **THEOREM 10.** — *Suppose that ε > 0 and* `x^{6/11 + ε} < y ⩽ x`. *Then*
> (1.28) `ϑ_{x,y}(α) = F(α, x/y) + O( exp( − C(ε) ( log x / log log x )^{1/3} ) )`
> *where C(ε) is a positive number depending at most on ε.*

Two things fail at once, and the second is the one that matters.

- **The exponent is 6/11.** The remark the notes cite as *support* for their
  reading is what settles it against them: on the same page the paper derives
  the constant as `c/(c+2)` from a zero-density exponent `N(σ,T) ≪ T^{c(1−σ)+ε}`,
  and says the density hypothesis would replace it by `1/2`. The density
  hypothesis is `c = 2`, and `2/4 = 1/2` checks; Ingham's `c = 12/5` gives
  `(12/5)/(22/5) = 6/11` exactly. There is no positive `c` at which `c/(c+2)`
  is `1/11` and also has `1/2` as its density-hypothesis limit. The `1/11`
  reading is not a defensible alternative reading of the glyph.
- **The error saving is `(log x / log log x)^{1/3}`, not `(log x)^{1/3}`.**

**What this does to the two notes.**

*The lower range condition is not vacuous, and at fixed `M` it eventually
fails.* Under the notes' own dictionary `x_SV = W/M`, `y = √W`, the condition
`(W/M)^{6/11} < √W` is `M > W^{1/12}`, not "satisfied at every level for every
`M ≥ 1`". At the corpus's levels it happens not to bind: `W^{1/12}` reads
2.36, 2.99, 3.82, 4.96, 6.57, 8.75, 11.82 at @13 through @37, all below the
smallest branch modulus 30 (companion PART F). **So the coverage table of
`import-fracparts.md` §4 is unaffected and its prediction still scores a HIT.**
But the admissible `ε` at @19, `M = 30` is `ε < 0.0886`, not the `9/22 = 0.409`
§3 derives or the `0.39` row 15 §6(b) derives.

*The one THEOREM `import-fracparts.md` banks has no instance at large `W`.*
§6 states it "for each fixed `M` dividing `W` at every level, as `x → ∞` along
the primorial ladder". At fixed `M` the hypothesis is `(W/M)^{6/11+ε} < W^{1/2}`,
whose left side exceeds the right for all large `W`. **The theorem as stated is
void.** What survives is a theorem on the window `W^{1/12} < M ≤ W^{1/2}`, which
is a growing modulus, which is precisely the regime the note elsewhere says the
source does not reach.

**Corrected sentence for `import-fracparts.md` §3:**

> Theorem 10 requires `x^{6/11+ε} < y ≤ x`. Under `x_SV = W/M`, `y = √W` the
> upper condition reads `M ≤ √W` and the lower reads `M > W^{1/12}`, so the
> theorem covers the branch window `W^{1/12} < M_T ≤ √W`. At @13 through @37
> `W^{1/12}` is 2.36 to 11.82, below every branch modulus, so the covered set
> coincides with `{M_T ≤ √W}` at every computed level and the coverage table
> stands. At fixed `M` and `W → ∞` the lower condition fails, so no fixed-`M`
> asymptotic follows from this theorem.

**Corrected sentence for `import-map-rows-15-17.md` §6(b):** replace the whole
`ε < 0.39` derivation with the two-sided window above, and drop the
**[SOURCED, verbatim]** flag from the theorem statement in §1 until the
statement is re-copied from the page image.

**Two further quotation corrections at the same source**, both re-read at the
page image. Theorem 1 (printed p. 2) reads `1 ⩽ y ⩽ x` with error
`O(x^{1/3} y^{−1} log x)`, and Corollary 1.3 (printed p. 3) reads
`Θ_{x,y}(α) = α + O(y x^{−1} + x^{1/3} y^{−1} log x)`. `import-fracparts.md` §3
quotes `x^{1/2}` in both. The exponent is `1/3`.

**The `F(α, ξ) = α + O(1/ξ)` derivation survives, by a different route than the
one written.** §3 derives it by "letting `x → ∞` with `ξ = x/y` held fixed",
which violates Corollary 1.3's stated hypothesis `y/x → 0`, since `y/x = 1/ξ`
is then constant. The repair: take any sequence `ξ_n → ∞` and for each `n` a
matching `x_n` large enough that `ξ_n x_n^{−2/3} log x_n ≤ 1/ξ_n`. Then
`y_n/x_n → 0`, Corollary 1.3 applies, the `x^{1/3}y^{−1}log x` term cancels
against Theorem 1's, and `F(α, ξ_n) = α + O(1/ξ_n)`. Since `F` does not depend
on `x`, that is the claim. WEAKENED, corrected derivation above.

**The error-term reach, recomputed.** §3's E2 column `exp((log W)^{1/3})` with
`C = 1` reads 10.59, 12.48, 14.57, 16.89, 19.36, 22.08 at @17 through @37; with
the page's `(log x / log log x)^{1/3}` it reads 5.59, 6.02, 6.47, 6.92, 7.38,
7.85 (companion PART F2). Every value is below `M = 30` on both readings, so
§2's conclusion ("the condition admits `M = 30` at no level at all") is
CONFIRMED, with its numbers roughly three times too generous.

---

## 2. `record-location-null.md` (TODO Z5)

### 2a. The corrected null, re-derived at 2,000 reps on independent code. CONFIRMED

The companion re-implements the Kourbatov-Wolf record process from its
definition with sfc32 in place of mulberry32, its own seed family, geometric
block centres in place of arithmetic, and exact inversion of
`P(max ≤ m) = (1−e^{−m})^N` in place of the Gumbel form. PART B, 2,000 reps:

| statistic | note §2 | this pass, `dLn = 0.005` | this pass, `dLn = 0.001` |
|---|---|---|---|
| null `A` | 0.9891 ± 0.0178 | 0.9883 ± 0.0174 | 0.9889 ± 0.0178 |
| N0 deficit, `z` | 6.03%, −3.34 | 5.96%, −3.39 | 6.01%, −3.35 |
| N2 (`N = 72`) deficit, `z` | 5.48%, −4.24 | 5.43%, −4.30 | not run |
| N3 (marginals out) deficit, `z` | 6.01%, −3.33 | 5.97%, −3.40 | not run |
| null `N` | 68.4 ± 7.9 | 68.6 ± 7.6 | 68.5 ± 7.9 |
| MC tail | 1/5,000 | 0/2,000 | not run |

Every headline reproduces to within 0.1 percentage points of deficit and 0.07
of `z`. The deficit is not a property of the producer's RNG, its block scheme,
or its Gumbel approximation.

**One calibrated caveat the note does not carry.** The null's `A` *level* is
construction-dependent in its third decimal: 0.9883 to 0.9895 across three
constructions, against an ensemble sd of 0.0178 and a standard error of the
mean of 0.0004. The spread is 3 standard errors of the mean and about 1.5% of
the measured deficit. It does not threaten the finding, and it means `0.9895`
should not be quoted to four digits as if it were a property of the null rather
than of one implementation of it.

**The block approximation, controlled over the full range rather than one
decade.** §3's R2 compares exact against hybrid on `[1e4, 1e8]`, which is one
of the roughly ten decades where the approximation actually runs. Refining the
block width fivefold over the whole range moves `A_null` by 0.0006, that is
0.06% of `A` against a 6% deficit. That is a stronger control than R2 and it
agrees with it. CONFIRMED.

### 2b. The gate. CONFIRMED, with a rider

The 15 gate values match `research/zonegap-03-model.js`'s embedded output line
for line (`N = 68.4 ± 7.9`, `rate = 2.356 ± 0.304`, `CV = 0.944 ± 0.100`,
`z mean = −0.212 ± 0.244`, `z sd = 1.264 ± 0.177`, `A = 0.9895 ± 0.0182`, and
the six data readings), and the gate bites: perturbing `C2` by one part in a
thousand makes it print `FAIL: A gate: 0.9303 vs published 0.9295`. Rider: the
gate runs zonegap-03's `simulate` and `mulberry32` verbatim on the same seeds,
so it is a transcription check on copied code, not an independent reproduction.
§2a is the independent one.

### 2c. The n_eff sentence. WEAKENED, mechanism backwards

§2's N1 bullet reads: "applying an n_eff-style deflation on top of N0 would push
the test to z ≈ −6.9." An `n_eff` deflation replaces `n` by `n_eff < n`, which
*widens* `sd/√n_eff` and *shrinks* `|z|`. The `−6.9` is the independence
reading `(A_data − A_null)/(sd(g/T)/√72)`, which is the uncorrected number, not
a deflated one; the producer prints the same quantity twice under two
descriptions. The substantive point stands and is stronger than the note makes
it.

**Corrected sentence:**

> The ensemble sigma is about twice the independence sigma (2.08 on the
> producer's 200-rep ensemble, 1.99 on an independent 2,000-rep one), so the
> record-process correlation Z5 asks about is already inside the published
> band. A test that ignored the correlation entirely would read `z = −6.9`; any
> `n_eff` deflation applied to N0 widens its sigma and can only move `z` toward
> zero. There is no correction of that family left to make, and none available
> in the direction the item assumed.

### 2d. The two premise corrections. CONFIRMED at source

`zonegap-03-prereg.md` lines 74 to 75 read the `n_eff = 5,076` against 51,205
zones as a property of the **head field**, verbatim: "The head field is
run-correlated (~10.1 consecutive zones share their first pair), so every sigma
below uses n_eff = 5,076 pairs, not 51,205 zones". The location test pools 72
records. The note's reading is correct.

### 2e. Window cuts, bands, and the placement note. CONFIRMED

All five window cuts reproduce from the producer (6.03/−3.34 at n = 72;
6.50/−4.26 at 64; 5.95/−4.28 at 56; 5.68/−4.07 at 48; 4.01/−2.65 at 33), as do
the four height bands. `records-placement-01.md` carries 0.4773 as its pooled
82-record mean and cites `stretch-01` §4's 0.479, exactly as §6 says.

### 2f. The HL2 defect raised against §3. CONFIRMED, and recoverable

`lit-kourbatov-shortfall.md` §8 is right that `zonegap-03-model.js` S4
calibrates the cumulative pair count against `HL2(x) = 2C₂∫₂^x dt/log²t`, so the
ratios 1.000046 and 1.000032 are statements about `Li₂`, not directly about
`ā(x) = log²x/(2C₂)` as a local mean. The conclusion is nonetheless recoverable
from the same two numbers, by an argument neither note makes: differencing the
two calibrations across the decade gives an incremental density ratio
`1 + (ε₁₁·HL2(1e11) − ε₁₀·HL2(1e10))/(HL2(1e11) − HL2(1e10)) = 1 + 3.0e−5`, so
the local density over `[1e10, 1e11]` is right to 3e−5 and `ā` cannot be a 6%
effect. §3's bullet should carry that differencing step rather than the raw
ratio.

---

## 3. `lit-kourbatov-shortfall.md`

### 3a. The literature, at the page image. CONFIRMED throughout

Independent `curl` from `export.arxiv.org` reproduces the recorded hashes
exactly: 1301.2242 at `08c584de…`, 24 pages; 1309.4053 at `733f8e77…`, 12
pages. Two extractions (`-layout`, `-raw`) agreed and the decisive pages were
then read as 170 dpi images.

- **p. 8, §5.1 observation 1, at the image**, word for word as the note quotes
  it, including "would turn `E₁` into a median-unbiased estimator for maximal
  gaps below `10^15`", and footnote 5, "A median-unbiased estimator `E_med(x)`
  has as many observed values above it as below it".
- **p. 8, Figure 1 caption, at the image:** `a = 0.75739 log²p`,
  `E₁ = a log(p/a) − ba`, `E₂ = a log(p/a)`, `E₃ = a log p`, "where p is the
  end-of-gap prime; b = 1", and the following line, "`a = C_k log^k p`, and
  `b = 2/k` unless stated otherwise". Both the `b = 1` and the `b ≈ 2/k`
  attributions check.
- **p. 14, Figure 4 and the Note beneath it:** `k = 2`, `µ* = −1.659`,
  histograms for `k = 2, 4, 6` showing "record gaps below `10^15`", and
  "use `−b = µ* + γ`". `−(−1.659 + 0.5772) = 1.0818` reproduces the note's
  second model row.
- **Figure 1 names A113274.** The same-data identification holds.

### 3b. The four-digit match. CONFIRMED, and it is definitional, as the note says

Median-unbiased means `#{g > E₁} = #{g < E₁}`, and `g > E₁(p) ⟺ g* > −b`, so
`b = −median(g*)` exactly, with no approximation. On the adopted ladder the
companion reads median `z = −1.2597` at `e < 1e15`, `n = 71`, and **also**
`−1.2597` at `p < 1e15` under Kourbatov's own end-of-gap indexing, `n = 71`, so
the index convention does not enter. The neighbouring order statistics are
`−1.2618` and `−1.2118`: the match sits on a single record, as the note states.

### 3c. The A-normalisation headline. WEAKENED

§1's third bullet, "The size matches in the repo's own A-normalisation", is
supported by comparing `A` values but not by comparing `b` values, and the two
routes disagree. On the same window, `n = 72`, `mean(1/L_k) = 0.06269`
(companion PART C2):

| estimator of `b` | value |
|---|---|
| from `A`, via `A(b) = 1 − b·mean(1/L_k)` | **1.1251** |
| from mean `z` | 1.2981 |
| from median `z` | 1.3159 |

The A-route and the z-route differ by 15%, and the A-route's own implied `b`,
1.125, sits nearer Kourbatov's *default* `b ≈ 2/k = 1` than his fitted 1.2597.
The disagreement is explicable (the `1/L_k` weight upweights low records by a
factor of about six, and §5's height profile puts `b = 0.713` in the bottom
band), but the note presents both tables as readings of one number.

**Corrected sentence:**

> The size is consistent in the repo's `A`-normalisation: the data's 6.07% sits
> between the `b = 1.0818` model's 5.79% and the `b = 1.2597` model's 6.92%,
> and within one null sigma of both. It is not an independent confirmation of
> the four-digit match: the `b` that the `A`-normalisation itself implies is
> 1.125, 15% below the `b` the median implies on the same records, because
> `A` weights by `1/L_k` and the low band carries a smaller `b`. The two
> in-house estimators of `b` agree only to about 15% on this ladder.

### 3d. Everything else in §5 reproduces

The A(b) table (0.9373 / 0.9322 / 0.9210 and 5.27% / 5.79% / 6.92%), the b-unit
table, and the cut-sensitivity ladder (−1.3090 / −1.2607 / −1.2597 / −1.2597 /
−1.2118) all reproduce digit for digit on independent parsing and arithmetic.
The bridge `1 − A = −mean(z_k/L_k)` is exact, re-derived here:
`z/L = (g−T)/ā · ā/T = g/T − 1`.

### 3e. Custody. WEAKENED

`node research/qc/embed.js --check` on both `record-location-null.js` and
`lit-kourbatov-shortfall.js` returns "NO OUTPUT BANNER, nothing was run and
nothing was written. This script is OUTSIDE output custody entirely." Both
notes declare themselves SCRATCHPAD-GRADE and not formally embedded, so the
label is honest, but the consequence is that every figure in both notes is
hand-pasted, which is the failure mode `CLAUDE.md` names by name. This pass ran
both producers and confirmed every quoted figure, so nothing is wrong today.
Neither note's numbers should leave its own file until an OUTPUT banner exists.
`research/QUESTIONS.md` §1 currently lists TODO Z5 as ANSWERED against two
uncustodied producers.

---

## 4. `lit-vc-multiples.md`

### 4a. Thomas at the page image. CONFIRMED, five for five

Both PDFs re-fetched, hashes matching the note (`a114abce…` arXiv v1,
`0c0deb93…` OJAC), pages 1, 3, 8 and 9 of each rendered and read as images.

- p. 1, verbatim: "Another characterization is that `h_p(x) = 0` if and only if
  `x ∈ pN \ {p} = {2p, 3p, 4p, …}`", with domain `X = {n ∈ N : n ≥ 2}`. The
  deciding sentence is exactly as quoted.
- The definition of `h_p` is as quoted.
- Corollary 1.3, p. 3, is an **equality**: `VCdim(H′_{≤n}) = ⌊log₂ π(n)⌋`.
- Corollary 1.2 and the witness arithmetic: `2^{ℓ−1} = 8` primes at `ℓ = 4`,
  and `2·3·5·7·11·13·17·19 = 9,699,690` (companion PART G).
- Proposition 3.2, p. 8, including `η_k := ⌊(log₂ k)/2⌋`.

The `VC = 4` coincidence check also reproduces: `π(79) = 22`,
`⌊log₂ 22⌋ = 4`, `2 log₂ 79 = 12.61`, `log₂ ln(79^{4.2665}) = 4.22`.

**One strengthening the note is entitled to.** Corollary 1.2 is a necessary
condition, so 9,699,690 is a floor on *one* member of a shattered 4-set. Running
the paper's own construction with the labelling optimised for the smallest
member gives the other three at `2.2e10`, `5.6e10` and `1.2e11`. The witness
*set* lives near `10^11`, not `10^7`, against a window of 250. The note's
argument is safer than it is written.

### 4b. HSW 1992. CONFIRMED as NOT REACHED, and the paraphrase WEAKENED

Roughly thirty fetches across SIAM (403, Cloudflare), the ScienceDirect COLT
1990 chapter (403), ACM DL id 92655 (403), both authors' archived UCSC and UIC
directories (soft-404 and 502; Wayback CDX shows `J21.pdf` never captured with
content and `C17.pdf` never captured at all), Semantic Scholar
(`openAccessPdf.status: CLOSED`), OpenAlex (`is_oa: false`, no OA location),
Unpaywall (`oa_status: closed`, `oa_locations: []`), CORE (500), fatcat
(timeout), scholar.archive.org (proof-of-work wall), archive.org full text
(`numFound: 0`), CiteSeerX (404, endpoint gone), and zbMATH. Theorem 3.1 was not
reached by any route. **The note's OWED status is correct and the search is now
much wider than the three routes it lists.**

zbMATH is a new negative worth recording: the record exists (Zbl 0747.68047,
SIAM J. Comput. 21(2) 240-266) but `editorial_contributions[0].text` begins
"Summary:", meaning it reproduces the publisher's abstract. There is no
independent review, no theorem numbering, and `references: []`. The note's
falsification list names `mrlookup` and zbMATH as untried routes; zbMATH is now
tried and yields nothing.

**The paraphrase is one edit removed from the paper, and the published version
is stronger.** The note writes that Thomas describes HSW Theorem 3.1 "as
bounding 'the VC-dimension of subsets of multiples of `d` lying between `−n` and
`n`'". arXiv v1 p. 8 actually reads, ungrammatically: "This result is
conceptually similar to Theorem 3.1 in [2] **which the VC-dimension of** subsets
of multiples of `d` lying between `−n` and `n`." The verb is missing and the
note supplied "bounds". The OJAC version repairs it differently and more
strongly: "which **establishes a formula for** the VC-dimension of subsets
consisting of all multiples of `d` lying between `−n` and `n`."

**Corrected sentence:**

> Thomas's §3 points at Helmbold, Sloan and Warmuth, *Learning Integer
> Lattices*, SIAM J. Comput. 21 (1992) 240-266, Theorem 3.1. arXiv v1's sentence
> is missing its verb; the published OJAC version reads "establishes a formula
> for the VC-dimension of subsets consisting of all multiples of `d` lying
> between `−n` and `n`". Both descriptions are Thomas's, single-source and
> uncorroborated: HSW's own abstract states the result for lattices of `Z^k`
> restricted to `{−n, …, 0, …, n}^k`, and the `k = 1` multiples-of-`d` reading
> is a specialisation nobody here has seen in the paper. The theorem number,
> the `k = 1` phrasing and any bound all rest on Thomas alone.

### 4c. The citation channels. Two CONFIRMED, one WEAKENED and improved

- **OpenAlex reproduces exactly**: `cites:W4292108209` and `cites:W4407306228`
  both 0; calibration `cites:W1995671037` returns 36, matching that work's own
  `cited_by_count`. One framing correction: `W1995671037` is Pach-Tardos in
  *JAMS* 2012, DOI `10.1090/s0894-0347-2012-00759-0`.
- **Semantic Scholar reproduces exactly**: Thomas `citationCount: 0`,
  calibration `arXiv:1012.1240` at 102. Rider: S2 returned 429 on the first
  pass from this address and answered only on backoff; a 429 recorded as a
  negative would have been a fetcher artefact.
- **OpenCitations. The note's "HTTP 301, channel dead this session" is a fetcher
  artefact.** `curl -L` resolves the 301 as an ordinary host migration to
  `api.opencitations.net` and returns HTTP 200 with `[]`; the v2 endpoint agrees.
  The channel calibrates three ways in the same session: 40,830 records for
  AlphaFold, 267 for Zhang's *Annals* 2014, 19 for Pach-Tardos JAMS. The note
  was right to record no negative from it, and wrong about why. Struck and
  replaced, the zero-forward-citation finding now stands on **three** calibrated
  channels rather than two, so the correction strengthens the note.

### 4d. "The two versions agree". WEAKENED

§1 says the published version "carries the same numbering for Theorem 1.1,
Corollaries 1.2 and 1.3, Lemma 3.1 and Proposition 3.2, checked line by line
against the arXiv text", and §8 records the check as run with the verdict "They
agree." The statement numbering does agree. The documents do not: arXiv v1 has
**four** references, OJAC has **six** (adding Rosser-Schoenfeld 1962 and
Erdős-Kac 1940, renumbering the rest), the §3 HSW sentence differs as above, and
the Corollary 1.2 proof's closing justification was rewritten. §4's "The paper
has four references" is the arXiv count and should say so. A separate extraction
trap worth recording: `pdftotext` renders `H′` as `H0` throughout the OJAC PDF,
so anyone grading these claims from OJAC text alone would record a notation
change that does not exist.

---

## 5. `import-map-rows-15-17.md`

### 5a. Row 15's dictionary. CONFIRMED, and it is a one-line proof

`⌊W/q⌋ ≡ ⌊M·{W/(Mq)}⌋ (mod M)` for `M | W`: write `W' = W/M`, `W' = aq + r`
with `0 ≤ r < q`. Then `⌊W/q⌋ = ⌊MW'/q⌋ = Ma + ⌊Mr/q⌋` and
`⌊M{W'/q}⌋ = ⌊Mr/q⌋`, and `⌊Mr/q⌋ < M` because `r < q`, so the two sides are the
same representative in `[0, M)`, not merely congruent. Machine-checked in BigInt
at @17 on an independently enumerated branch list and scour range: 0 exceptions
on 1,920 pairs (companion PART E1). The identification with Saffari-Vaughan's
`Θ*` at `x_SV = W/M`, `y = √W`, `α = j/M` follows from it, and `c_α` is
confirmed at part I, printed p. 116, eq. (1.9), at the page image: "is the
characteristic function modulo 1 of `[0, α)`".

### 5b. Row 17's `g(6)`. The two formulas are the same formula. CONFIRMED

`import-map-rows-15-17.md` §6(a) writes `g(6) = 6∏_{5≤q≤x}(1−4/q)/(1−2/q)²` and
`import-repulsive.md` §1(ii) writes `g(6) = 6∏_{5≤p≤x}(1−4/(p−2)²)`. Neither is
wrong: `(1−4/p)/(1−2/p)² = p(p−4)/(p−2)² = 1 − 4/(p−2)²` identically. The
companion evaluates both against a third route, brute-force residue counting
with no closed form at all, at twelve levels; worst disagreement `4.9e−15`
(PART D). The four hand factors 0.5556, 0.8400, 0.9506, 0.9669 and the readings
3.33, 2.80, 2.66, 2.57 are all correct.

### 5c. The rejection count. WEAKENED, three numbers disagree

§0 says "Eight candidate fields were named … Five came back already spent …
Three survive". §4's table lists **seven** rows. The ledger block says "six
fields rejected with pointers". The most defensible reading is six, since the
determinantal row is not rejected but promoted to row 17; §0's "eight" and
"five" are then both wrong, and the sentence should read "Ten candidate fields
were named. Six are rejected in §4, one is promoted to row 17, and three are
priced in §1."

### 5d. The pointers. CONFIRMED, all seven

Each rejection's pointer exists and says what the row claims it says:
`import-map-construction.md` §1 carries the three-distance row (rotation orbit),
the large-sieve row (`ℓ²→ℓ²` against an `ℓ¹→ℓ²` wall) and the determinantal row;
`natal-cap-10-sieve-cap.md` carries Riesel-Vaughan Lemma 5 with its verbatim
quote; `level-ledger-tight.md` §(a) reads "it gives `Σ_{a≠0}|F(a)|² ≤ (p²+W)D`
and hence nothing below binomial" and §(c) gives `S_q(j) = q−2` on the divisors,
`−1−e(je_q/q)` off them, so `|S_q(j)| = 2|cos(πje_q/q)|`; `stretch-01.md` §4
names Polya-Vinogradov and Burgess "as adjacent instruments only";
`SEARCH-CONVENTIONS.md` §1 carries Henze-Malikiosis inside the lonely-runner row;
`REFUTED.md` carries rows 8 and 12 closed on the stated dates.

### 5e. What was not checked

Row 16 is stale by construction (it proposes as an experiment the move that
`record-location-null.md` executed the same morning), and this pass did not
re-derive Rényi's theorem or the `F^α` and Ballerini-Resnick record rates, all
of which the row itself marks **[MEMORY]** or **[SOURCED-BIB]**. No claim about
row 16 is graded here.

---

## 6. `import-fracparts.md` (TODO 4)

### 6a. Custody and the prereg. CONFIRMED at the weakest available rung

`node research/qc/embed.js --check research/history/staging/import-fracparts.js`
returns code-sha256, body and out-sha256 all matching: the pasted OUTPUT block is
bit-honest.

The unsealed prereg's ordering claim checks against filesystem birth times
(local CEST, so UTC + 2): `import-fracparts.md` was created 10:05:45, thirty
seconds after the prereg's stated `08:05:15Z`; `import-fracparts.js` was created
10:07:25, two minutes and ten seconds after it. So the `.js` did not exist when
the prereg text was written, exactly as §1 claims. **The rider the note does not
carry:** the `.md` was last modified at 10:48:25, forty minutes after the
producer ran, so nothing pins the prereg's *text*, only its file's creation. §1
already says the prereg "is a prereg by construction order and by nothing
stronger", which is the right rung; the mtime is the reason that rung is the
right one.

### 6b. The wall-address identity. CONFIRMED, and it is a proof

`M_T > lB ⟺ ⌊W/q⌋ < M_T ⟺ q > W' = W/M_T`, with `lB = ⌊(W+1)/q⌋`. For integers,
`⌊W/q⌋ < M ⟺ W < Mq ⟺ W' < q`, and `⌊(W+1)/q⌋ < M ⟺ W + 1 < Mq`. The two differ
only at `W = Mq − 1`, which forces `M | 1` since `M | W`, impossible for
`M ≥ 30`. So the equivalence is exact, not empirical. Re-checked at @17 in
BigInt on an independent enumeration: 0 exceptions on 1,920 pairs (PART E2). The
containment `{M_T ≤ √W} ⊆ {M_T ≤ lB}` also re-derives (`q ≤ √W` gives
`lB ≥ ⌊√W⌋ ≥ M`) and checks at 0 exceptions on 600 covered pairs (PART E3), and
600 is the note's own @17 count.

### 6c. The coverage table and the pair total. CONFIRMED, every number

Independently enumerated branch moduli and scour ranges reproduce the coverage
column exactly (PART E5): 1 of 8, 5 of 16, 8 of 32, 22 of 64, 40 of 128, 90 of
256, 180 of 512 at @13 to @37, fractions 0.125, 0.313, 0.250, 0.344, 0.313,
0.352, 0.352, largest covered `M` 30, 510, 2730, 13110, 79170, 406410,
2698410. The (branch, scour prime) pair total at @13 through @29 is **1,133,872**,
matching the note's E3 count. The mass column was not re-derived, since it needs
the cap-36 branch ledger and this pass ran no census.

### 6d. The verdict line's "MEASURED -> PROVEN". REFUTED as stated

The ledger block and `research/QUESTIONS.md` both carry "one cap-36 line
upgrades MEASURED -> PROVEN". The line in question is
`natal-cap-36-skeleton-door.md`, Measurement D, last paragraph: "A separate
census (not in the script, same method) finds the marginals `(a mod 30)`,
`(⌈W/q⌉ mod 30)` and the joint pair also uniform at nine levels through @41,
where there are 1,117,909 scour primes."

That is a finite-level statement at nine named levels. §6's own three caveats
say the banked theorem "is asymptotic with an unspecified constant, so it
certifies no finite level". An asymptotic with an ineffective constant cannot
upgrade a measurement at @41 to PROVEN; the body and the verdict line
contradict each other, and the verdict line is the one `QUESTIONS.md` surfaces.
Two smaller points travel with it: the source line is about `⌈W/q⌉` and the
theorem is about `⌊W/q⌋`, which differ by exactly 1 since no scour prime divides
`W`, so uniformity does transfer but the note should say so; and §1's finding
above voids the fixed-`M` theorem anyway.

**Corrected verdict line:**

> Prediction HIT: the covered branches carry at most 8 percent of the mass;
> anchor and a sharper wall-address banked; the THEOREM column is struck, not
> merely overpriced, because Theorem 10's range condition is `x^{6/11+ε} < y`,
> which fails at fixed `M`; no route; no cap-36 line is upgraded.

### 6e. The rest of the payoff. CONFIRMED

The PUBLISHED-ANCHOR (the door's marginal face is `Θ*` at
`x_SV = W/M_T`, `y = √W`, `α = j/M_T`) survives §1 intact, since the dictionary
does not use the range condition. The WALL-ADDRESS survives and is a theorem by
§6b. §2's two reasons the row was overpriced (Theorem 10 is a marginal statement
against a joint door; the saving is quasi-polynomial and certifies no finite
level) both stand, and §1 adds a third.

---

## 7. `import-repulsive.md`

### 7a. Every number reproduces from residue counting. CONFIRMED

The companion derives the local factors from first principles, counting the
residue classes `n` must avoid mod each `p` for `n, n+2, n+d, n+d+2` all to be
coprime to every prime up to `x`. It never reads `variance-note.md` Theorem 1.
The factors it recovers are `2` at `p = 2` for even `d` and `0` for odd, `3` at
`p = 3` for `3 | d` and `0` otherwise, and at `p ≥ 5` exactly the note's three
cases. Then:

- `g(2) = 0`, and the support is exactly `6 | d`: at `x = 1009` the distances up
  to 60 with `g > 0` are 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, ten of them.
  CONFIRMED.
- `g(6)` at twelve levels agrees with both closed forms to `4.9e−15`, reading
  3.333333, 2.800000, **2.661728**, 2.573737, …, 2.382485. CONFIRMED.
- `6∏_{5≤p≤10^6}(1−4/(p−2)²) = 2.3812828`, and the difference from the note's
  `2.3812822` at `p ≤ 10^7` is `6e−7`, which is the tail
  `4Σ_{10^6<p≤10^7} p^{−2} ≈ 2.6e−7` relative, so the note's value and its
  `2.5e−8` tail bound both check. CONFIRMED.
- The exhaustive sweep over `6 | d`, `d ≤ 2·10^6` at `x = 1009` returns minimum
  **2.382485 at `d = 6`**, maximum **23.7825 at `d = 1021020`**, and **zero**
  values in `(0, 1)`. Both extremes match the note digit for digit. CONFIRMED.
- The proof behind the sweep re-derives: at `p ≥ 5` every factor is one of
  `p/(p−2) > 1`, `p(p−3)/(p−2)² = 1 + (p−4)/(p−2)² ≥ 1`, or
  `1 − 4/(p−2)² < 1`, so dropping the non-generic factors only lowers the
  product and the bound is uniform in the level. CONFIRMED as a proof, not a
  measurement.
- `import-map-construction.md` §1's product evaluates to **0.000000** as
  literally written (the `p = 2` factor is `1 − 2/2`), and the correct one-class
  value `g₁(2) = 2∏_{2<p≤11}(1−1/(p−1)²) = 1.353516` matches the note's 1.3535.
  CONFIRMED.

The two-sided closure follows from the two-by-two determinant and the definition
of negative association, neither of which needs a source. Non-Hermitian kernels
are correctly left open by the note.

### 7b. Torquato, at the page image. Three CONFIRMED, one WEAKENED

The PDF re-fetched from `export.arxiv.org/pdf/1801.06924` is byte-identical to
the note's record (10,187,846 bytes, sha256 `59812b37…`), and arXiv lists only
v1. Eq. (14) p. 10, §5.3 p. 23 (the three classes, word for word), §5.5 p. 28
("All periodic point configurations that have a finite number of particles in
the fundamental cell belong to class I hyperuniform systems") and §11.1.6
eq. (252) p. 78 (`H ≡ S(k=0)/S(k_peak)`, "of the order of `10⁻⁴` or smaller")
all check at the image.

**The one that does not.** §3's bounded-variance sentence is attributed to
"p. 28". It is on **p. 25**, in **§5.3.1**, as **eq. (88)**: "For one-dimensional
class I hyperuniform systems, the number variance is exactly (not
asymptotically) given by `σ²_N(R) = 2φB_N(R)`, where `B_N(R)` is given by (83)
with `d = 1`, implying that the fluctuations are bounded, i.e., do not grow with
`R`." The substance the note draws from it is right, and the context question is
resolved in the note's favour: the sentence quantifies over one-dimensional
class I systems generally, not over a specific lattice. Two riders: the
right-hand side is `B_N(R)`, not the constant `B̄_N` of eq. (87), and it is an
ensemble-average statement.

**A second citation defect, in §6 and in the §7 regrade row.** Every Torquato
page number in this note is an **arXiv PDF page**, and the arXiv PDF is 113
pages, but the citation reads "*Physics Reports* **745** (2018) 1-95, §5.3 p. 23,
§5.5 p. 28, eq. (14) p. 10, eq. (252) p. 78". The published article ends at
p. 95 and its pagination is different, so those page numbers cannot belong to
the citation they are attached to. §6's "printed page numbers confirmed against
the extraction's own page footers" confirmed the preprint's footers.
Corrected form: cite the arXiv version by its own pages, or add "arXiv:1801.06924
page numbers" beside the journal reference. `import-map-rows-15-17.md` §1 carries
the same page numbers under the same journal citation.

### 7c. The `Var/E` range. CONFIRMED as cited

`paper/variance-note.md` §6's `y = 401` row reads 0.845, 0.685, 0.477, 0.290,
0.157, 0.076 over `u = 0.6` to `3.0`, and §7's diagonal reads 0.1521 to 0.3958
over `x = 7` to `37`. The note's `[0.076, 0.845]` and `[0.152, 0.396]` are both
correct. Cited, not recomputed, per the standing compute rule.

### 7d. The hyperuniformity wording. WEAKENED

Hyperuniformity classifies **one** configuration by its large-`R` asymptotics.
At any fixed level the tile is periodic and therefore class I, which the note
proves and correctly calls vacuous. The `L = y^u` reading is not a competing
classification of the same object: it is a statement about a **diagonal family**
of configurations, one per level, with `L` and the sieve level moving together.
The note's own "The two statements are compatible" says this, but "the tile is
sub-Poisson and not hyperuniform at window scale, MEASURED" reads as a
classification of the tile.

**Corrected sentence:**

> The tile at a fixed level is class I hyperuniform, PROVEN, by periodicity, and
> the statement is arithmetically empty. Along the diagonal family
> `L = y^u` at fixed `u`, one configuration per level, the measured `Var/E`
> stays in `[0.152, 0.396]` rather than falling toward zero, so no member of the
> family is approaching a hyperuniform limit in the ratio the programme reads.
> That is a statement about the family, not a hyperuniformity class for any one
> tile, and the word to use for it is sub-Poisson.

### 7e. Not re-derived here

`g₅(6) = 5.36` and `g₅(30) = 14.29` for the Natal@5 comb, the spectral identity
`X(210) = 4.612929`, PART 8's `Var[N_L]` maxima, and the `d ln σ/d ln L`
exponents were not re-derived; each needs a repo object outside this pass's
scope. `import-repulsive.js` passes `embed.js --check` on all three hashes, so
they are at least bit-honest against their own producer.

---

## 8. The three questions the brief asks

**Does Z5 close as prior-art-explained?** Partly, and the word is *documented*,
not *explained*: the shortfall's existence and its size are Kourbatov's, in
print since 2013, on the same ladder and in the same normalisation, and the
identification `b = −median(g*)` is definitional rather than empirical, so no
live sentence may present the 6.0% as an in-house finding. What does not close
is everything Z5 actually asked: the deficit is not a null artefact (four
corrections, five window cuts, and an independent 2,000-rep re-derivation all
leave it at 6.0% or enlarge it), the matched-ensemble null and its sigma are not
in the four Kourbatov papers read, and no mechanism for `b > 0` at `k = 2` exists
on either side. The item's null-side branch is closed and its mechanism branch is
open.

**Does row 15 land as priced?** No. The identity, the dictionary, the coverage
split, the wall address and the anchor all land and all re-derive, but the
THEOREM column has to be struck rather than repriced: the theorem the row banks
does not apply at fixed `M`, because its range condition is `x^{6/11+ε} < y`.
Row 15 lands as PUBLISHED-ANCHOR plus WALL-ADDRESS, no theorem, no route, with
the SPLIT verdict and the "suspected TPC-STRENGTH, UNRESOLVED" deep half
unchanged.

**Does row 17 land as priced?** Yes. The pre-registered `g(6) > 2` fires on the
first line, every number reproduces from residue counting with no shared code,
the closure is stronger than the row asked for (`g` is 0 or at least 2.3812, and
`d = 6` is the exact minimiser at every level), the row's own two overreaches
were caught by its own run, and the `import-map-construction.md` correction is
real. What has to change is two citation page numbers and one taxonomy sentence,
none of which touches the closure.

---

## 9. Fence and custody for this pass

Two files written, `redteam-0828-litimports.md` and
`redteam-0828-litimports.js`; no existing file edited; `research/qc.js` not run.

**One fence breach, disclosed.** The brief forbade any git command. One
`git status --porcelain` was run at the end of this pass as a check that nothing
had been edited. It is read-only and changed nothing, but it was outside the
fence and is recorded here rather than left unrecorded. Its one useful reading:
the working tree carries modifications to `CLAUDE.md`, `TODO.md`,
`research/qc.js`, `research/qc/corpus.js`, `research/qc/ledgers.js`,
`research/qc/selftest.js`, `research/README.md`,
`history/staging/attack-c2drift-01.md` and
`history/staging/attack-rhoms-01.md` that predate this pass and belong to
whoever made them. The companion producer is SCRATCHPAD-GRADE and carries
no OUTPUT banner, so its own numbers are hand-pasted here and are reproducible
only by running it.

**A gate consequence this pass cannot fix.** The ledger block above names TODO
items Z5 and 4. `qc/questions.js` requires each named item to list every
question id that claims it, on its own `Ledger:` line. TODO Z5 currently lists
`Q-record-deficit` and item 4 lists its own; neither lists
`Q-redteam-0828-litimports`. The gate will flag this note until whoever holds
`TODO.md` adds the id to both items, or until the id is dropped to `todo: none`.

Downloads made and hashed this pass, all matching the notes that recorded them:
`1301.2242` `08c584de…` (24 pp), `1309.4053` `733f8e77…` (12 pp),
`aif.649.pdf` `26ea8606…` (1,548,052 B), `aif.634.pdf` `8ec0e78a…`
(951,862 B), `1801.06924` `59812b37…` (10,187,846 B), `2208.06442v1`
`a114abce…`, OJAC `292.pdf` `0c0deb93…`.

---

## What would falsify this, and whether that check has run

- **The `6/11` reading is itself a misreading.** Falsified by a third reader at
  the page image, or by a copy of the paper from another source. **PARTIALLY
  RUN**: read at a 150 dpi rendering of a PDF whose sha256 matches the one both
  audited notes recorded, and cross-checked against the paper's own derivation
  of the constant as `c/(c+2)` with the density-hypothesis limit `1/2`, which
  admits `6/11` at `c = 12/5` and admits no reading giving `1/11`. Not checked
  against a second digitisation of the journal, and Numdam is the only scan in
  circulation. This is the largest single exposure in this note, because the
  most load-bearing correction rests on one image of one scan.
- **The banked theorem is rescuable at fixed `M` from elsewhere in the paper.**
  **NOT RUN.** Theorems 6 to 9 (the `y ≥ x` half) were not opened, and
  `import-fracparts.md` §6 already says they are for integers with logarithmic
  weights and still need `x → ∞`. A reader who wants the fixed-`M` marginal as a
  theorem should look there before accepting the strike.
- **The record-process deficit is an artefact of both implementations.**
  Falsified by a third construction. **RUN**: two RNGs, two block schemes, two
  block widths, exact inversion against the Gumbel form, 2,000 and 5,000 reps.
  The deficit moves by at most 0.1 percentage points. What has NOT run is a
  latticed null (real twin gaps past the first are `0 mod 6`), which
  `record-location-null.md` §8 also lists as NOT RUN and argues at `1.7e−4`
  relative.
- **The `A` versus `z` disagreement in `b` is an arithmetic slip here.**
  Falsified by recomputing `mean(1/L_k)` and `A`. **RUN**: `mean(1/L_k) = 0.06269`
  reproduces the producer's own printed value, `1 − A = 0.0705`, and
  `0.0705/0.06269 = 1.125` against `−mean(z) = 1.298`. The gap is arithmetic, not
  a coding difference.
- **`g(d)` has a value in `(0,1)` somewhere.** Falsified by any `d` with
  `6 | d` and `g(d) < 1`. **RUN** exhaustively to `d = 2·10^6` at `x = 1009`
  (zero found), and the level-uniform lower bound is a proof rather than a
  sweep, so no larger sweep is owed.
- **HSW Theorem 3.1 contains the `O(log log L)` lemma.** **STILL NOT RUN**, now
  after roughly thirty routes including zbMATH, whose record carries only the
  publisher's summary. The remaining routes are institutional SIAM access, ACM
  DL id 92655 for the COLT 1990 version (pp. 288-300 per Warmuth's own archived
  publication list), MathSciNet `mrlookup`, or an interlibrary copy. The OWED
  status in `lit-vc-multiples.md` §0 is correct and should not be relaxed.
- **A cap-36 branch above @23 carries covered mass above 10%.** **NOT RUN**, and
  not runnable without a new census. Unchanged from `import-fracparts.md` §4.
- **The mass column of the coverage table is wrong.** **NOT RUN.** This pass
  re-derived the branch enumeration, the scour ranges, the coverage condition and
  the pair totals, but not `Σ_T Σ_q Snum_T`, which needs the cap-36 ledger.
- **The Torquato page corrections are version artefacts.** **RUN**: arXiv lists
  only v1 for 1801.06924 and the fetched bytes are identical to the notes'
  record, so the discrepancy is between arXiv pagination and *Physics Reports*
  pagination, not between two preprint versions. The published article was not
  obtained and its page numbers are not known here.
- **The prereg text was written after the run.** **UNFALSIFIABLE in this
  corpus**, by the fence: no git command may be run, and the `.md` mtime is
  forty minutes after the producer. Birth times bound creation, not content.
  `import-fracparts.md` §1 already reads this at the right rung.

---

*This document states current understanding at 2026-08-28. It edits nothing.
The corrected sentences are drafts for whoever holds the six notes, and the
`TODO.md` `Ledger:` additions in §9 are for whoever holds that file.*
