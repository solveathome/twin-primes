# qc-refs — external citations and dead quotations

<!-- ledger
id: Q-qc-refs
status: ANSWERED
todo: none
question: Are the corpus's external citations and its quotations sound?
verdict: Nine dead quotations and eight wrong external citations, the worst being that the corpus sits on the retracted FKMPT constant, an OEIS crossref off by one twice in a document addressed to an OEIS editor, and a false premise ("Kanold, Stevens and Paseman all give exponent 2 + eps") under an open TODO item.
-->

Wave 1 diagnosis. Read-only over all 63 body files. No edits made to anything but this file.

Scope of the mechanical half is NOT repeated here: internal path/section/shorthand checking was
already done by scratchpad/refcheck.js (2 false-alarm dead paths, 0 unresolved shorthands, 1 real
broken section reference at research/maier-matrix.md:282 → origin-excess.md §6c, sequenced behind
the history migration).

Body file set = all *.md except research/history/** (63 files).

Status legend: [OPEN] needs a fix, [CONFIRMED-FIXED] earlier fix verified landed, [CLEAN] checked
and sound, [UNVERIFIABLE], [SUSPICIOUS].

## Counts

| bucket | count | note |
|---|---|---|
| Dead quotations, new | **9** (D1-D9, D12; D1-D6 are one cluster in one file) | plus O1-O15 from `qc-history.md`, of which I re-verified O6 (3 sites), O12, O13 and confirmed all correct |
| External — WRONG | **8** (W1-W8; W1 has 5 sub-items) | W1, W3, W5, W6, W7 are the substantive ones |
| External — INCONSISTENT | **2** (I1, I2) | |
| External — UNVERIFIABLE | **2** (U1, U2) | both already marked as such in the corpus; U1's statement is now triangulated four ways |
| External — SUSPICIOUS | **7** (S1-S7) | none disproven; S1 and S6 are the two worth a human's time |
| External — CLEAN | **9 groups** (C1-C9) | 10 arXiv paper identities, 28 OEIS A-numbers, Lichtman's 13-row table row by row, 5 quotations verbatim |
| Memory corrections | **6** (M1-M6) + M7 coverage | M1 is the one that would mislead a fresh session |

**The three worst:** W1 (the corpus stands on the retracted FKMPT constant, and `C(1/2) > 1/6001` is
54× too generous), W7 ("Kanold, Stevens and Paseman all give exponent 2 + ε" is false for all three and
is the premise of an open TODO), W5 (Fan–Pomerance quoted as `6x/log y` for `y ≤ x` when the paper says
`0.6x/log y` for `y ≤ √x`, in a paper draft). Runners-up, both in publication-track files: W3 (an
off-by-one in an OEIS submission draft) and D1-D6 (a whole audit file whose every quoted claim was
fixed, and which another audit cleared as clean).

Scratchpad artefacts, all kept: `deadquote.js` / `.txt` (dead-quotation extractor + output),
`extcite.js` / `.txt` (citation extractor + output), `fk_v{1,2,3,4}.pdf/.txt` (all four FKMPT versions),
`fgkmt.pdf` / `fgl.txt`, `bf.pdf/.txt` (Brüdern–Fouvry), `lich.pdf/.txt`, `west.pdf/.txt` (Paseman),
`vaughan.pdf/.txt`, `taf.pdf/.txt` (Táfula), `fp.xml` (Fan–Pomerance arXiv API), `A*.txt` / `n_A*.txt`
(28 OEIS entries), `e687.html` / `e970.html`.

---

## 1. DEAD QUOTATIONS

Method: `scratchpad/deadquote.js` extracts every quoted fragment (12-400 chars, straight and
curly quotes) that sits within a 5-line window of a named document, normalises for case,
dashes, backticks and whitespace, and reports the ones whose fragment no longer occurs in the
named target. 32 candidates over the 63 body files, 18 of them carrying an attribution verb.
Every candidate was then opened by hand in both files. Raw output:
`scratchpad/deadquote.txt`. The extractor recovers O6 (all three sites), O13 and O12 from the
`qc-history.md` list, which is the sample verification the brief asked for — see §1.9.

New findings are numbered **D1-…** to keep them distinct from `qc-history.md`'s O1-O15.

### D1-D6. `research/dhr-verification.md` is a spent audit report and every claim it quotes has been fixed [OPEN, the largest cluster in this pass]

**This whole file is the O1 shape at scale, and it was missed:**
`research/history/staging/audit-campaign.md`:11 lists `dhr-verification.md` under "Clean, no
change needed". It is not clean. `dhr-verification.md` is a source-verification report written
*against* `paper/beta2-note.md`; its §0 verdict table has a column literally headed "Claim in
beta2-note.md", and its §6 is a numbered list of "Recommended edits to beta2-note.md". **All
seven recommendations have since been applied to `beta2-note.md`**, so the report now quotes,
as live claims of that note, six statements the note no longer makes. A reader who follows the
citation finds the premise absent in every case.

Verified one by one against `paper/beta2-note.md`:

| # | dhr-verification says beta2-note claims | beta2-note.md now says | line |
|---|---|---|---|
| D1 | `dhr-verification.md:13` — "β₂ = 4.2665… is the DHR dimension-2 sifting limit", verdict "decimals corrected" | "Let β₂ = 4.26645… " and, in full, "β₂ = 4.26645028414864191641 (lower bound; add 10⁻²⁰ for an upper bound)". The string `4.2665…` occurs nowhere in the note; the only surviving `4.2665` is the deliberately-rounded interval endpoint "therefore (2, 4.2665]" | :62, :94, :238 |
| D2 | `:14` — Attribution "Franze's Table 1 … giving β₂ = 4.2665", and "the note's *4.5161*" | "Table 1, which tabulates the DHR sifting limits to 3 d.p., giving **β₂ = 4.266** at κ = 2 (Selberg's Λ²Λ⁻ gives the weaker 4.516 there)". Neither `4.2665` nor `4.5161` is attributed to Franze any more, and Booker–Browning is cited for the precise value exactly as recommended | :87-89 |
| D3 | `:15` — "Theorem shape: remainder weighted by μ²(d)·3^ν(d) at level D", verdict "convention-mismatch" | the note now carries `2 Σ_{m < y} μ²(m) 8^{ν(m)}` and `y log⁷y`, and itself explains that "the older Halberstam–Richert condition R(κ,α) carries 3^{ν(d)}" as a *contrast* | :116, :166, :265-266 |
| D4 | `:18` — "One nit: take z = pₙ+1, not z = pₙ" | the note already reads "z = pₙ + 1, X = H. (Not z = pₙ: S(A, P, z) conventionally sifts the primes p < z, so z = pₙ would fail to sift pₙ itself)" — the nit is quoted back verbatim from the fix | :121-123 |
| D5 | `:19` — Fundamental-Lemma fallback quoted as "u ≳ 9κ, exponent ≈ 18+ε", verdict "constant corrected" | "the level D = z^s requires **s ≥ 9κ + 1 = 19** at κ = 2 … positivity needs s > 9κ + 10 log K". `18+ε` occurs nowhere in the note | :284-286 |
| D6 | `:283-303` — §6, all seven "Recommended edits to beta2-note.md" | all seven are in the note: (1) 4.26645… + Booker–Browning + 4.516 `:87-94`; (2) "with an appendix by Galway; Richert (d. 1993) is a co-author of the underlying papers" `:78-83`; (3) 8^ν / log⁷ `:166`, `:266`; (4) product form `(Ω(κ,L)): ∏ (1 − ω(p)/p)^{−1} ≤ (log z₂/log z₁)^κ (1 + L/log z₁)` `:104`, `:137`; (5) z = pₙ+1 `:121`; (6) s ≥ 9κ+1 = 19 `:284`; (7) the note's status header now reads "sieve input FULLY VERIFIED against the primary source, no outstanding items" `:2-4` | — |

**Replacement text.** The mathematics in `dhr-verification.md` §§1-5 and §7 is all still live and
sourced (the source ledger in §7 is the most valuable table in the file and must stay). Only
the framing dies. Two edits:

- §0's table header column 2, currently "Claim in beta2-note.md", becomes "Claim as originally
  drafted". Add one line above the table: "**This table is the 2026-08-14 audit trail. Every
  correction below has been applied to `paper/beta2-note.md`; the middle column records what
  the note said before, not what it says now.**" Then no individual row needs rewriting, and
  the file stops asserting anything false.
- §6's heading becomes "## 6. Edits made to beta2-note.md (all applied)" and its lead line
  "Recommended edits to beta2-note.md" becomes "The seven edits this audit produced, all since
  applied — kept as the record of what changed and why." Verified applied 7/7.

Confidence high; every row grepped in both files.

### D7. `paper/PAPERS.md:25` gives Paper II a title the draft does not carry [OPEN, small]

`paper/PAPERS.md`:25 announces Paper II as **"Two-sided bounds for the twin Jacobsthal
function"**, "File: beta2-note.md". `paper/beta2-note.md`:1 is titled "**An upper bound for the
twin Jacobsthal function (draft note)**". The note *does* prove both sides (its own §"therefore
(2, 4.2665]" pairs the DHR upper bound with the trivial `G₂(x#) ≥ g(x#)` lower bound at `:224`),
so "two-sided" is defensible mathematics — but the two files disagree about the paper's name and
one of them is wrong. **Fix:** decide the title once and make both files carry it. If the
two-sided framing is wanted, `beta2-note.md`:1 should be retitled to match `PAPERS.md`; if not,
`PAPERS.md`:25 becomes "An upper bound for the twin Jacobsthal function". Recommend the second,
because the note's own abstract, status block and §6 are all organised around the upper bound and
the lower bound is one paragraph. Confidence high on the mismatch, no view on which is intended.

---

### D8. "one rung, no ladder" is a retired U-FRAME §9 phrase still quoted as live in four places [OPEN, exactly the O6 shape and not on the O-list]

`research/U-FRAME.md` §9 ("Honest status", `:553`) has been rewritten. It now reads "**Solid,
and a hole that has since closed.** The growth law of maxsum_m is no longer missing" and cites
`research/localized-04-maxsum.md` for the law. The words **"one rung, no ladder"** (in any
spelling) appear nowhere in `U-FRAME.md` — grepped across every body file and script, the only
occurrences are the four quoting sites. Worse, the framing is dead on a *second* axis: U-FRAME
§9's "**Not solid**" paragraph now names **L** as "the hole at exactly one point where
everything rests", so "the repo's named single hole" no longer denotes the maxsum growth law at
all.

Four sites, each attributing to U-FRAME §9 a statement it does not make:

- `research/localized-04-maxsum.md:392` — "the question U-FRAME §9 called \"one rung, no
  ladder\"". **Fix:** "the question U-FRAME §9 posed about the growth of maxsum_m, which §9 now
  records as closed by this file:".
- `research/G2-STATE.md:397-399` — "This retires `U-FRAME.md` §9's standing question, the repo's
  named single hole, described there as one rung with no ladder." **Fix:** "This is the result
  `U-FRAME.md` §9 records as the hole that has since closed. The ladder exists. It was never the
  obstruction; the surviving hole is L."
- `research/LOCALIZED-GAP.md:153-156` — "**This answers U-FRAME §9.** The repo's named single
  hole was a proven upper bound on maxsum_m … described there as one rung with no ladder."
  **Fix:** "**This is what U-FRAME §9 records as the closed hole.** The open question was a
  proven upper bound on maxsum_m as a function of x that is not G₂ itself. The ladder exists and
  is the law above. The repo's named single hole is now L."
- `research/G2-STATE.md:751` (the status table) — "retires U-FRAME §9's named single hole".
  **Fix:** "closes the maxsum-growth hole U-FRAME §9 records as closed".

Confidence high; grepped the phrase and read U-FRAME §9 in full. Note that unlike O6 this one is
*not* a quotation-marks-only problem: two of the four sites carry the dead claim in bare prose
("described there as"), which is why an extractor keyed on quotation marks alone under-reports
this class.

### D9. `research/maxgap-law.md:502` quotes a two-class formula with the wrong relation symbol [OPEN, cosmetic but it is a quotation]

`maxgap-law.md:502` audits "`two-class-lower-bounds.md` §8, \"measured law `~1.2 x ln^2 x`\"".
`two-class-lower-bounds.md:445` states it as `**G2(x#) ≈ 1.2 · x ln²x**` and `:451`/`:578` as
`≈ 1.2 x ln²x`. The target uses `≈` throughout and never `~`; in a corpus that distinguishes `~`
(asymptotic equality) from `≈` (measured approximation) — and whose whole point in this row is
that the law "must not be quoted as an asymptotic" — quoting it with a tilde inverts the
distinction the row exists to make. **Fix:** `maxgap-law.md:502` → "`two-class-lower-bounds.md`
§8, measured law `≈ 1.2 x ln²x`". Confidence high.

### D10. Verified-sound attributions (the rest of the 32 candidates)

Opened and confirmed the target still supports the claim, or confirmed a false alarm:

- `paper/anchored-note.md:364` — "\"the anchored ratio stays bounded away from 0 forever\" is
  named as Hardy-Littlewood-strength input in natal5-variance.js, reading 6". **CLEAN**:
  `research/natal5-variance.js:233-234`, reading 6(c), carries the sentence verbatim including
  the Hardy–Littlewood attribution. The extractor missed it only because the fragment spans a
  comment-line break.
- `research/covering-dive.md:108`, `:143` — "construction data", "unknown constant", "We are
  looking for a GPU approach". **Not internal citations**: the first two are scare quotes, the
  third is an external attribution to Morack and is handled in §5 below.
- `research/dhr-verification.md:13` fragment "is the correct 4-d.p. *rounding* but" — false
  alarm, that is dhr-verification's own prose, not a quotation. The real problem in that row is
  D1.
- `research/G2-STATE.md:751` "sharper than \"it does not work\"" — false alarm, a generic phrase
  and not attributed to U-FRAME.
- `research/level-ledger-tight.md:49` "Möbius bound" and `research/h2-scoping.md:28` "the
  highest-value computation available on this question" — already O12 and O13. Both re-verified
  against `FOLD-PROFILE.md:72` and `exponent-control.md:266`: the O-list readings are correct.
- `research/theta-ladder.md:5`, `research/G2-STATE.md:670`,
  `research/two-class-lower-bounds.md:655` "a second sighting worth watching" — already O6, all
  three sites re-verified: the phrase is absent from `ZONE-POSTULATE.md`. **O6 confirmed exactly
  as written, all three sites.**
- `research/maxgap-law.md:503` "\"`c1` should eventually grow like `ln x`\" and does not" —
  **CLEAN**. `two-class-lower-bounds.md:508-509` still says "so `c1` should eventually grow like
  `ln x`. It does drift upward, and by nothing like enough: `c1 ~ (log p)^{0.12 ± 0.03}`", and
  maxgap-law's verdict "grows like `(ln x)^{0.12}`" matches. The quotation compresses two
  sentences of the target but misrepresents nothing.
- `research/natal-cap-12-overlap-sign.md:4` "verify A/B/C" — **CLEAN**, the string is in
  `natal-cap-12-overlap-sign.js`.
- `research/theta-ladder.md:105` "TODO 00's \"z = 31 took 65.3 s\"" — **CLEAN**, `TODO.md`
  carries the costing; and see O4 for the *other* theta-ladder/TODO 00 costing, which is the
  dead one.
- `research/theta-ladder.md:436`, `:583` — "theta turns over below 2", "find an exponent",
  "prove one maximal inequality": the file's own branch labels and coinages, not attributions.
  False alarms.
- `web/bench/README.md:122` and `research/OBSERVATIONS.md:675` — "the grain census awaits a law".
  **CLEAN, and unusually well handled**: `bench/README.md` explicitly writes "GLOSSARY.md
  *still said* … which was true when written and stale by the time of the grain session; that
  line now points at the file that settled it." Past tense, self-dated, and the retirement is
  stated. This is the model for how the whole class should read.
- Remaining plain-quote candidates (`paper/moire-primes.md:132`, `research/ATTACKS3.md:188`,
  `research/FOLD-PROFILE.md:530`, `research/h2-scoping.md:386`,
  `research/level-ledger-tight.md:97`, `research/localized-04-maxsum.md:119`,
  `research/localized-single-alignment.md:21`, `research/origin-excess.md:677`,
  `research/README.md:112`, `research/theta-ladder.md:722`) — all checked, all either the file's
  own coinage, a scare quote, or a paraphrase the target still supports. No action.

### D12. `research/two-class-lower-bounds.md:119-124` logs a discrepancy that no longer exists, and all three of its excuses are now false [OPEN, and it is load-bearing]

The parenthetical reads: *"(Discrepancy logged: `covering-dive.md` §Q2.3 has `c = 6` and this
sweep read `c = 4` off the source. The version numbering of the paper's remarks also moved
between arXiv v1, v2 and the compiled JEMS version, so both may be right for different versions.
Nothing here depends on which, since the numeric consequence quoted below is theirs.)"*

Every clause has since gone wrong:

1. **"`covering-dive.md` §Q2.3 has `c = 6`"** — it does not. `covering-dive.md:59` now reads
   `(4 + δ)` and `e^{−1−4/ρ}`. Both files now say 4, so the discrepancy this note exists to log
   has been resolved by making both files agree — on the wrong value (W1a). Dead quotation.
2. **"both may be right for different versions"** — true, and now settled rather than
   speculative: 4 is arXiv v2/v3, 6 is arXiv v4 and the published JEMS corrigendum, and 6 is
   current. The remark numbering claim is also imprecise: it moved between **v2 (Remark 8) and
   v3 (Remark 7)**, and v1 has no such remark at all, so "between v1, v2 and the compiled JEMS
   version" is not where the move happened.
3. **"Nothing here depends on which"** — false. `C(1/2) > 1/6001` three lines below depends on it
   entirely, and is 54× off under the current constant (W1b).

**Replacement text** for `:119-124`, once W1a and W1b are applied:

> Theorem 1 gives a gap `>= x(log x)^{C(ρ) - o(1)}` with `C(ρ) > e^{-1-6/ρ}`. *(The constant
> moved: arXiv v2 and v3 print `(4 + δ)·10^{2δ}` and `e^{-1-4/ρ}`, arXiv v4 and the JEMS
> corrigendum (25 (2023) 2483-2485) print `6·10^{2δ}` and `e^{-1-6/ρ}`. The 6 is current. The
> twin-primes remark is Remark 8 in v2 and Remark 7 from v3 on.)*

Confidence certain, both PDFs read.

### D11. Coverage limits of this pass — what a future extractor should add

Stated so the next pass knows what is *not* covered. The extractor keys on quotation marks, so
it under-reports three sub-shapes, and D8 was found only because a hand-grep followed one hit
into its neighbours:

1. **Bare-prose attribution** ("described there as X", "as §N establishes", "per X"). D8's
   `G2-STATE.md:398` and `LOCALIZED-GAP.md:155` are of this kind and no quote-keyed tool sees
   them. Two of the fifteen O-items (O5, O11) are also of this kind.
2. **Spent instruction blocks** — "for the parent to apply", "should add", "worth
   cross-referencing", "needs that correction". These are attributions to a *future* state of a
   sister file. O10, O11, O12, O14 are all this. Grepping the corpus for the imperative
   ("should ", "must add", "worth ", "needs that", "for the parent") is a cheap high-yield
   sweep and it is how D1-D6 would have been found mechanically.
3. **Whole files that are audits of a named sister file.** There are exactly three in the body
   set, and all three carry this error: `dhr-verification.md` → `beta2-note.md` (D1-D6),
   `h2-scoping.md` → `exponent-control.md` (O13), `level-ledger-tight.md` → `FOLD-PROFILE.md`
   (O12). Three for three. Checked and cleared as *not* of this shape:
   `bv-import-survey.md` (audits the external BV/EH/GRH literature against our legs, no sister
   file quoted) and `discrepancy-two-class.md` (primary work, not an audit; its §9 "Loose end,
   since settled" is correctly past-tense). The generalisation: **a file whose job is to check
   another file becomes stale the moment its recommendations are acted on, and nothing in this
   repo's workflow retires it.** That is a process finding, not a text finding, and it is worth
   a convention — an audit file should open with a dated "APPLIED / OUTSTANDING" line.

The `should add`/`for the parent to apply` grep recommended in (2) was run: six hits in the body
set, of which four are the already-known O11 (`maxgap-law.md:521`, `:530`), O12
(`level-ledger-tight.md:47`) and D6 (`dhr-verification.md:283`), and two are benign present-tense
prose (`U-FRAME.md:594`, `OBSERVATIONS.md:560`). So that sweep is now complete and closed.

---

## 2. EXTERNAL CITATIONS — WRONG

Method: `scratchpad/extcite.js` over all 63 body `*.md` plus the 129 `*.js` (tagged separately),
extracting arXiv ids (48 distinct), OEIS A-numbers (28), DOIs (8), venue strings (148),
author-year pairs (30) and URLs (81). Raw: `scratchpad/extcite.txt`.

### W1. THE FKMPT VERSION QUESTION, RESOLVED AT SOURCE — and the corpus is on the retracted constant [OPEN, worst finding in this pass]

The brief's item (b) is now closed, definitively, from the actual PDFs. I downloaded all four
arXiv versions of `1802.07604` and ran `pdftotext` on each (`scratchpad/fk_v{1,2,3,4}.txt`).
Theorem 1 **changed between v3 and v4**, and the thing that changed is exactly the constant the
corpus imports:

| version | dated | Theorem 1's C(ρ) numerator | stated lower bound | the twin-primes remark | bibliography [7] |
|---|---|---|---|---|---|
| v1 | 2018-02-21 | **no C(ρ) at all** — the bound is `x(log x)^{1/exp(C·C₀)}` for a `C₀`-bounded system, no ρ-supportedness | — | absent | Ford, Green, Konyagin, Maynard, Tao, *Long gaps between primes*, **preprint** |
| v2 | 2019-08-16 | `(4 + δ)·10^{2δ}` | `C(ρ) > e^{−1−4/ρ}` | **Remark 8** | Halberstam & Richert, *Sieve Methods*, Academic Press, London, 1974 |
| v3 | 2021-06-23 | `(4 + δ)·10^{2δ}` | `C(ρ) > e^{−1−4/ρ}` | **Remark 7** | Halberstam–Richert 1974 |
| v4 | 2022-09-19 | **`6·10^{2δ}`** | **`C(ρ) > e^{−1−6/ρ}`** | Remark 7 | Halberstam–Richert 1974 |

And the reason: **the JEMS paper has a corrigendum that nothing in this repo mentions.** J. Eur.
Math. Soc. **25 (2023), no. 6, 2483-2485**, *Corrigendum: Long gaps in sieved sets*, whose
abstract states it "fixes a number of small errors/omissions" and that the fix affects "**the
numerical values of the exponents of log log x in Theorem 1 and its corollaries**". arXiv v4 is
the corrigendum-corrected text. Grepped the whole repo for "corrigendum": **zero hits.**

So, one item at a time:

**W1a. `research/covering-dive.md:59` carries the superseded constant.** It states
`C(ρ) := sup{δ ∈ (0, 1/2) : (4 + δ)·10^{2δ}/log(1/(2δ)) < ρ}` and `C(ρ) > e^{−1−4/ρ}`. That is
v2/v3. The current text of the paper — arXiv v4 and the published corrigendum — is `6·10^{2δ}`
and `e^{−1−6/ρ}`. **Fix:** replace with the v4 form and add the corrigendum to the citation:
"J. Eur. Math. Soc. 23 (2021) 667-700; **Corrigendum, JEMS 25 (2023) 2483-2485**", then
`**C(ρ) := sup{δ ∈ (0, 1/2) : 6·10^{2δ}/log(1/(2δ)) < ρ}**, and **C(ρ) > e^{−1−6/ρ}** (v4 /
corrigendum values; arXiv v2 and v3 print (4 + δ) and e^{−1−4/ρ})`. Confidence: certain,
read off both PDFs.

**Note for the brief: I think you have this one backwards.** The brief says an earlier audit
"traced a real constant error (C(rho) > e^{-1-4/rho}, a 4 not a 6) to exactly this kind of
version confusion" — reading as though 4 were the correction. It is the other way round: **6 is
the correct current value and 4 is the retracted one**, and whichever pass moved
`covering-dive.md:59` to 4 moved it to the superseded text. Worth knowing before anyone
"re-fixes" it.

**W1b. `research/two-class-lower-bounds.md:127`'s `C(1/2) > 1/6001` is wrong by a factor of 54,
and it is the only number the corpus imports from Theorem 1.** I solved the sup numerically both
ways (`node`, bisection on the increasing function):

| formula | C(1/2) | as 1/n | the paper's own weaker `e^{−1−c/ρ}` |
|---|---|---|---|
| `(4+δ)` (v2/v3) | 1.6665 × 10⁻⁴ | **1/6001** | `e^{−9}` = 1.2341 × 10⁻⁴ = 1/8103 |
| `6` (v4 / corrigendum) | 3.0716 × 10⁻⁶ | **1/325565** | `e^{−13}` = 2.2603 × 10⁻⁶ = 1/442413 |

The `(4+δ)` row reproduces `1/6001` to five significant figures, which independently confirms
that `1/6001` was computed from the v2/v3 formula and confirms the v3 provenance of
`covering-dive.md:59`. **Fix:** `two-class-lower-bounds.md:127` → "`C(1/2) > 1/325565` (v4 /
corrigendum values; the v3 text gave `1/6001`)". **The qualitative claim survives** — the whole
point of the passage, "two classes per prime on half the primes is inside a published theorem",
needs only `C(1/2) > 0`, which holds in every version — so nothing downstream breaks. But the
number as printed is 54× too generous and is presented as the paper's.

**W1c. `research/covering-dive.md:58`'s version date matches no version.** It says Theorem 1 was
"text-extracted verbatim from the arXiv PDF, **v3, dated 2024-12-03**". v3 is dated **2021-06-23**;
no version of this paper is dated 2024-12-03 (v1 2018-02-21, v2 2019-08-16, v3 2021-06-23,
v4 2022-09-19). Most likely 2024-12-03 is the date the PDF was *fetched* or the date stamped on
the recompiled arXiv PDF footer, but the file presents it as the version's date. **Fix:** drop
the date or label it "fetched 2024-12-03"; the version identifier is what carries the meaning and
v3 is correct for the text quoted.

**W1d. The `[7]` → `[Halberstam–Richert]` substitution is substantively RIGHT, and should be
marked.** Bibliography entry [7] in v2, v3 and v4 is verbatim "H. Halberstam and H.-E. Richert,
*Sieve Methods*, Academic Press, London, 1974". So `covering-dive.md:63`'s
`[Halberstam–Richert, Cor. 2.4.1]` is correct and `two-class-lower-bounds.md:134`'s `[7, Cor.
2.4.1]` is the literal source text. Both are defensible; only the *labelling* is wrong, since
`covering-dive.md:62` calls its version "quoted verbatim". **Fix:** in `covering-dive.md`, use
square-bracket editorial marking — `[7 = Halberstam–Richert, Cor. 2.4.1]` — which is the standard
convention for an interpolation inside a verbatim quotation and keeps the helpfulness.
Independently note that `[7]` in **v1** is a *different* work (the FGKMT preprint), so anyone
quoting `[7]` must say which version; recommend `two-class-lower-bounds.md:134` gain "(v3/v4
numbering)".

**W1e. The v3-vs-v4 split inside `covering-dive.md` is real but harmless, and now explained.**
`:58` cites v3 for Theorem 1, `:62` cites v4 for Remark 7, two lines apart. I diffed the remark
across versions: **Remark 7's text is byte-identical in v3 and v4**, so the quotation is sound
either way. The genuine hazard is the opposite one — the *only* substantive v3→v4 change in the
part of the paper this file uses is the Theorem 1 constant in the bullet immediately above, which
is W1a. **Fix:** cite one version throughout, v4, and note the v2/v3 differences in a parenthesis.
Also worth recording: the remark is **Remark 8 in v2 and Remark 7 in v3/v4**, so "Remark 7" is
correct for the current paper and every corpus site that says "Remark 7" is right on the number.

### W3. `research/oeis-G2-submission.md` has an off-by-one in the OEIS crossref it leans on, twice — in a document addressed to an OEIS editor [OPEN, second-worst finding]

Every A-number in the corpus was checked against oeis.org (fetched via `curl`, `fmt=text`;
WebFetch gets a 403 from oeis.org, worth knowing). Full dumps in `scratchpad/A*.txt` and
`scratchpad/n_A*.txt`. One hard error, and it is in the draft that is meant to go to an external
editor.

`research/oeis-G2-submission.md` says, twice, **`A059861(n-1)`** where the correct index is
**`A059861(n)`**:

- `:25-26` (COMMENTS) — "There are **A059861(n-1)** of them per period for n >= 2 (Schemmel
  totient)".
- `:54` (COMMENTS, the growth law) — "where **m = P/A059861(n-1)** is the mean gap between twin
  candidates".

A059861's own definition is `a(n) = Product_{i=2..n} (prime(i) - 2)`, offset **1,3**, so
`A059861(n) = ∏_{2<p≤pₙ}(p−2)`, which is exactly the twin-candidate census mod the n-th
primorial. Two independent confirmations:

1. **Direct count.** I enumerated the residues r mod P with `gcd(r,P) = gcd(r+2,P) = 1` for
   n = 1..6 and got 1, 1, 3, 15, 135, 1485 — which is `A059861(n)` term for term.
   `A059861(n-1)` gives 1, 1, 3, 15, 135 at those n, i.e. it is right at n = 2 and wrong from
   n = 3 on. OEIS's own comment on A059861 states it directly: "a(n) is the exact number of d=2
   and also d=4 differences in dRRS[modulus = **n-th** primorial]".
2. **The file's own fitted constant proves which index it meant.** With `m = P/A059861(n)`, the
   extreme-value fit `a(n) = c·m·(log P − log m)` gives **mean c = 0.4814 with CV 9.5%** over
   n = 5..12 — exactly the file's "c averages 0.48 … with a coefficient of variation of 10%", and
   exactly `maxgap-law.md:502`'s `c2' = 0.4814`. With `m = P/A059861(n-1)` it gives c = 0.0406
   with CV 65%. So the code used `A059861(n)` and only the prose is wrong.

**Fix:** both occurrences → `A059861(n)`. Confidence certain. **Priority: this one is externally
visible.** It sits in the COMMENTS field of a submission draft, next to a formula an OEIS editor
will check, and it makes the stated mean-gap wrong by a factor of `pₙ − 2`.

Everything else in that submission checks out and is worth recording as verified, since it is the
most externally exposed document in the repo:

- DATA `2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528` at OFFSET 1 — **reproduced
  independently** for n = 1..6 (2, 6, 12, 30, 42, 66) by brute-force cyclic maximal-gap
  enumeration. EXAMPLE for n = 3 ("twin candidates mod 30 are 11, 17, 29; cyclic gaps 6, 12, 12;
  a(3) = 12") verified exactly.
- **`a(n) >= A048670(n)` pointwise, offsets aligned** — the brief's specific concern. A048670 is
  offset **1,1** and reads 2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66 at n = 1..12; both
  sequences index by *number of primes*, so the offsets do align. Pointwise: 2≥2, 6≥4, 12≥6,
  30≥10, 42≥14, 66≥22, 108≥26, 150≥34, 204≥40, 258≥46, 348≥58, 528≥66. **Holds at all twelve.**
  The quoted ratio list "2.00, 3.00, 3.00, 3.00, 4.15, 4.41, 5.10, 5.61, 6.00, 8.00 at n = 3..12"
  reproduces to the digit (2.000, 3.000, 3.000, 3.000, 4.154, 4.412, 5.100, 5.609, 6.000, 8.000).
  **CLEAN.**
- **`a(n) <= A288815(n)` for all computed terms**, and the sample "(12 <= 18, 30 <= 30, 42 <= 66,
  …, 258 <= 450)" — A288815 is offset **1,1**, 21 terms, 2, 6, 18, 30, 66, 150, 192, 258, 366,
  450, …, 2622. The four sampled comparisons land at n = 3, 4, 5, 10 with the offsets aligned, and
  the inequality holds at all twelve. **CLEAN.**
- `a(n)/prime(n+1)^2` "from 0.222 at n = 1 to 0.314 at n = 12" — 2/9 = 0.2222, 528/41² = 0.3141.
  **CLEAN.**
- `a(n)/(p log²p)` "wobbles between 0.66 and 1.13 … mean 0.89" — reproduces as [0.664, 1.132],
  mean 0.889, **over n = 4..12**. The n-range is not stated in the file and the reader will assume
  it matches the "n = 5..12" of the sentence before, where the numbers are [0.664, 1.094] and mean
  0.859. **CLEAN but add "over n = 4..12".**

### W8. arXiv:1402.1970 is Holt **and Rudd**, and the corpus drops Rudd every time [OPEN]

Confirmed twice independently (arXiv abs page and NASA/ADS via search): **arXiv:1402.1970, *On
Polignac's Conjecture*, 2014, is by Fred B. Holt AND Helgi Rudd.** The corpus attributes it to Holt
alone in every one of its four appearances, while correctly saying "Holt and Rudd" for the sibling
paper 1408.6002:

- `paper/moire-primes.md:912` (the bibliography) — "Holt, F. B. *On Polignac's conjecture.*
  arXiv:1402.1970 (2014)", with Rudd credited only on the next line for 1408.6002.
- `research/PRIOR-ART.md:378` — "cited by Holt in 1402.1970".
- `research/exponent-control.md:20` — "Holt's 1402.1970 tabulates it as the maximum gap in the cycle".
- `research/G2-STATE.md:105` — "also tabulated by Holt (arXiv:1402.1970 §4)".

**Fix:** "Holt, F. B.; Rudd, H." in the bibliography, and "Holt and Rudd's 1402.1970" in the three
prose sites. This is exactly the FGKMT/FKMPT error class — a dropped co-author on one paper of a pair
by overlapping author sets — and it lands in a publication-track bibliography, where a missing
co-author on a prior-art citation is the kind of thing a referee notices. Confidence certain.

Note that `research/PRIOR-ART.md:103-112`'s correspondence table is careful and correct: it cites
1408.6002 for the cycle of gaps, Lemma 2.1, Thm 2.3, §4, §5 and §6, and 2603.25915 for fusions and the
interval of survival, all of which I verified against the abstracts. The 1402.1970 slip is the only
Holt-attribution error I found, and the ownership statement at `G2-STATE.md:717-725` matches
PRIOR-ART's table item for item.

### W7. "Kanold, Stevens and Paseman all give exponent 2 + ε with stated constants" is false for all three, and it is the premise of an open TODO [OPEN — the most actionable finding in this pass]

The claim appears in **six places** and is the entire basis of TODO item 000b:

- `TODO.md:44-46` — "**000b. An afternoon with three papers: does an explicit elementary bound
  already give g(x#) < x′²?** Q: Kanold, Stevens and Paseman (arXiv:1311.5944) each prove one-class
  exponent-(2+eps) bounds with stated constants. G2-STATE §9 calls this the cheapest item on the
  list."
- `research/G2-STATE.md:534-536`, `:776` — "all giving exponent 2 + ε with stated constants".
- `research/ZONE-POSTULATE.md:249-251`, `research/THE-DIALS.md:260`,
  `research/two-class-lower-bounds.md:611-613` — same wording, all "logged and not chased".
- `research/covering-dive.md:17` — "also Kanold (Math. Ann. 1965/67) and Stevens (1977, Bonferroni
  inequalities) gave elementary bounds **~ k^{2+ε}**".

**None of the three proves an exponent-(2+ε) bound.** Read directly off Paseman's own paper
(`arXiv:1311.5944v2`, `pdftotext -layout`, `scratchpad/west*.txt`), which states the whole history in
its abstract and §1:

| author | what is actually proved (Paseman's §1, verbatim) | as an exponent in k |
|---|---|---|
| Jacobsthal | `g(n) ≤ k·2^k + 2^k − k` | exponential |
| **Kanold** [3] | `2^k` for all k, and `2^{√k}` for k ≥ e^50 | **exponential**, `2^{√k}` |
| **Stevens** [4] (1977) | `g(n) < 2k^{2+2e·log k}` | **the exponent is 2 + 2e·log k and grows without bound**; `log₂` of the bound is `O((log k)²)`, i.e. `k^{Θ(log k)}` |
| **Paseman** (this paper) | `u(k) = O(log k · log log k)` in one form, `O(σ^{−1}(n)·log k)` in another, where `u(k) = log₂` of the bound | `k^{O(log log k)}` — an improvement on Stevens, still **not** `k^{2+ε}` |

Paseman's abstract says it in one sentence: "Letting u(k) be the base 2 log of this bound, Stevens
showed u(k) is O((log k)²), improving upon Kanold's exponent O(√k). We use elementary methods similar
to those of Stevens to get u(k) is O(log k(log log k)) in one form and O(σ^{−1}(n) log k) in another."
A bound whose *base-2 logarithm* is O((log k)²) is not a bound of the form k^{2+ε}.

**Where the k^{2+ε} shape actually comes from: R. C. Vaughan 1977.** Fetched and read the paper
(`Proc. Edinburgh Math. Soc. 20 (1975-77) 329-331`, `scratchpad/vaughan.txt`). Vaughan writes, of
Erdős's `g(n) < ω(n)^C`: "**The purpose of this short note is to show that in (4) C can be taken
arbitrarily close to 2.** Iwaniec (2, Theorem 2) has shown this in the special case when n is the
product of the first r primes." His Theorem is `g(n) < ω(n)²(log₂ω(n))^c`. So **Vaughan is the
`k^{2+ε}` result for general n and Iwaniec 1971 Theorem 2 is the primorial case**; Iwaniec 1978 then
gives `h(k) ≪ (k log k)²`. Vaughan also records the actual role of Kanold: "that any further
improvement must lie very deep is indicated by the work of **Kanold** (4), (5) which shows that
**Linnik's** celebrated theorem on the least prime in arithmetic progression follows easily from (4)
with C < 2" — Kanold's contribution is a *consequence* of an exponent below 2, not a bound at 2 + ε.

**Consequences, and this is why it matters more than a citation slip:**

1. **TODO 000b is void as written and should be closed, not done.** "An afternoon with three papers"
   would be spent on bounds that are `2^{√k}`, `k^{Θ(log k)}` and `k^{O(log log k)}`. At the primorial,
   `k = π(x) ~ x/log x`, so `g(x#) < x′² ≈ x²` needs `g ≪ (k log k)²` — exactly Iwaniec's shape and
   nothing weaker. None of the three can deliver it, by orders of magnitude. **Fix:** rewrite TODO
   000b as "**CLOSED by inspection of the sources.** Kanold (2^{√k}), Stevens (k^{Θ(log k)}) and
   Paseman (k^{O(log log k)}) are all far weaker than exponent 2; the only exponent-2 statements are
   Vaughan 1977 (general n, ω²(log₂ω)^c) and Iwaniec 1971 Thm 2 / 1978 ((k log k)²), both with
   inexplicit constants. The explicit-constant route to g(x#) < x′² does not exist in this
   literature."
2. **The "cheapest item on the list" framing in `G2-STATE.md` §9 is wrong** and should be replaced by
   the closure above. Same at `ZONE-POSTULATE.md:249`, `THE-DIALS.md:260`,
   `two-class-lower-bounds.md:611`, `G2-STATE.md:776` — all five "loose end, logged and not chased"
   blocks are now chased and the answer is no.
3. **`covering-dive.md:17` needs the attribution moved:** "Precursor: R. C. Vaughan, *On the order of
   magnitude of Jacobsthal's function*, Proc. Edinburgh Math. Soc. 20 (1977) 329-331 — **this is the
   k^{2+ε} result**, sieve-based, and Vaughan notes Iwaniec 1971 Thm 2 had already done the primorial
   case. Kanold (Math. Ann. 170 (1967) 314-326) and Stevens (*On Jacobsthal's g(n)-function*, Math.
   Ann. 226 (1977) 95-97, Bonferroni inequalities) give **explicit but far weaker** bounds, 2^{√k} and
   2^{O((log k)²)}; Paseman (arXiv:1311.5944) improves Stevens to 2^{O(log k log log k)}. Kanold's
   relevance is the converse direction: an exponent below 2 would give Linnik's theorem easily."
4. One bibliographic correction inside the same line: `covering-dive.md:17` gives Kanold as "Math.
   Ann. 1965/67". The Jacobsthal paper is **Kanold, *Über eine zahlentheoretische Funktion von
   Jacobsthal*, Math. Ann. 170 (1967) 314-326**; the 1965 Math. Ann. 157 paper is *Über Primzahlen in
   arithmetischen Folgen II*, a different work. Pick the 1967 one, or cite both explicitly.

Confidence: certain on Kanold/Stevens/Paseman (read from Paseman's own summary of all three) and on
Vaughan's "arbitrarily close to 2" (read from Vaughan's own page 329). The Vaughan Theorem's precise
inner exponent `c` in `(log₂ω(n))^c` did not survive `pdftotext` cleanly and should be read off the
PDF by a human before it is quoted with a number; `scratchpad/vaughan.pdf` is saved.

### W6. The "checked against the source so nobody re-checks it" FGKMT block is the one that needs re-checking [OPEN, and it is the passage a previous audit ruled must be preserved]

`research/maxgap-law.md:533-540` is §10 item 4, self-labelled "**The Maier-Pomerance statement,
checked against the source, so nobody re-checks it**". `qc-history.md`'s O11 ruled that this item is
"not a debt at all but a durable source check" and must be kept in the body, "the only place in the
corpus that pins FGKMT eq. 1.2, Ford's slides and the proven bound side by side". So I re-checked
it, against the actual PDF (`arXiv:1412.5029`, `pdftotext -layout`, page 3-4,
`scratchpad/fgl.txt`). One of its three legs is right and two are wrong.

**Leg 1, the Maier–Pomerance quotation: CORRECT, verbatim.** FGKMT p. 4: "The best upper bound known
is Y(x) ≪ x², which comes from Iwaniec's work [26] on Jacobsthal's function. **It is conjectured by
Maier and Pomerance that in fact Y(x) ≪ x(log x)^{2+o(1)}.** This places a serious (albeit
conjectural) upper bound…". maxgap-law quotes the middle sentence word for word. This also verifies
`covering-dive.md:16`'s "state verbatim: 'The best upper bound known is Y(x) ≪ x², which comes from
Iwaniec's work [Iw78] on Jacobsthal's function'" — exact for FGKMT (I did not pull the FGKT PDF, so
that half of the "both … state verbatim" claim is unchecked).

**Leg 2, the equation number: WRONG.** maxgap-law:535 says "with `Y(x) = j(P(x)) - 1` exactly (their
**eq. 1.2**)". In the paper, `Y(x) = j(P(x)) − 1` is **equation (1.3)**; `Y` itself is introduced in
**Definition 1**; and **(1.2)** is a different statement entirely — it is the proven lower bound.
**Fix:** "with `Y(x) = j(P(x)) − 1` exactly (their eq. **1.3**; `Y` is their Definition 1)".

**Leg 3, the proven bound: WRONG, and it understates FGKMT by a factor log₂x while crediting the
weaker form to them.** maxgap-law:538 says "The proven FGKMT bound is `Y(x) >= R·x·log x·log_3
x/(log_2 x)^2` for any `R` and sufficiently large `x`". The paper prints

> (1.2)  Y(x) ≫ x log x log₃x / **log₂x**

— a single power of log₂x — and says of it, in the next sentence, "This **improves on** the bound
Y(x) ≫ x log x log₃x/(log₂x)² obtained by **Rankin**". So the squared form maxgap-law calls "the
proven FGKMT bound" is precisely the bound FGKMT announce they beat. The "for any R" quantifier is
also not FGKMT's: their Theorem 1 is `G(X) ≫ log X log₂X log₄X/log₃X` with an *effective* implied
constant, and the arbitrary-constant statements belong to the earlier FGKT and Maynard papers in
Rankin's shape. **Fix:** "The proven FGKMT bound is their eq. (1.2), `Y(x) ≫ x·log x·log₃x/log₂x`,
which is a factor log₂x stronger than Rankin's `R·x·log x·log₃x/(log₂x)²`."

**The argument survives the fix, and this should be said in the same breath.** maxgap-law uses the
bound only to conclude it "sits BELOW the random-dart level e^γ x log x … and does not contradict
the law". With the correct bound the ratio is `log₃x/(e^γ log₂x) → 0`, so it still sits below and the
conclusion is unaffected. Nothing downstream breaks; the statement of someone else's theorem is what
is wrong.

**Consistency check across the corpus: maxgap-law is the lone outlier and the rest of the repo has
it right.** Fourteen sites import the FGKMT lower bound with the correct single `loglog x` —
`README.md:46`, `research/GLOSSARY.md:182`, `research/G2-STATE.md:158`,
`research/ZONE-POSTULATE.md:72`, `research/covering-dive.md:109`,
`research/two-class-lower-bounds.md:22`, `:200`, `:574`, `research/PRIOR-ART.md:23`,
`research/oeis-G2-submission.md:46-47`, `paper/anchored-note.md:355`, `paper/beta2-note.md:228`,
`paper/moire-primes.md:689`, `paper/PAPERS.md:31`. Only `maxgap-law.md` uses `(log_2 x)^2`, at `:52`,
`:390`, `:391`, `:538`. Of those, **`:52` and `:390` are CORRECT** — they attribute the squared form
to *Rankin* and to Rankin's `T1` construction term, which is where it belongs. Only **`:391` ("the
best proven bound") and `:538` ("the proven FGKMT bound")** misattribute it. Two-line fix.

**Also in the same block, an internal contradiction about whether a source was consulted.**
`maxgap-law.md:536-537` states "**Ford's slides** state the same as an equality, `J(T) = T(log
T)^{2+o(1)}`" — presented as read. `research/covering-dive.md:127` states "**Ford's slides**: not
located in this dive (his survey content is covered by the FGKT/FGKMT intros and Granville's note)".
One file cites the slides for a specific formula; the other says they were never found. The formula
itself is standard and appears in the OEIS A048670 comment ("Maier & Pomerance conjecture that
Max_{n ≤ x} A048669(n) = log(x)(log log x)^{2+o(1)}"), so nothing mathematical is at risk. **Fix:**
either give the slides a locatable citation (title, venue, date, URL) at `maxgap-law.md:536`, or
repoint the equality form to A048670's comment and drop the slides. Do not leave the corpus asserting
both. Confidence high.

### W5. Fan–Pomerance is misquoted twice — the constant is 0.6, not 6, and the range is y ≤ √x, not y ≤ x [OPEN, third-worst; one site is in a paper draft]

Fetched the authoritative abstract through the arXiv API (`export.arxiv.org/api/query`, saved at
`scratchpad/fp.xml`), which gives the LaTeX source of the abstract rather than a rendered page:

> Let Φ(x,y) denote the number of integers n ∈ [1,x] free of prime factors ≤ y. We show that but
> for a few small cases, **Φ(x,y) < .6x/log y when y ≤ √x**.
> — Steve Fan and Carl Pomerance, *An inequality related to the sieve of Eratosthenes*,
> arXiv:2306.03339, comment "to appear in the Journal of Number Theory".

The corpus states it wrong in both places it appears, and both errors are in the same direction of
carelessness (a dropped decimal point and a dropped square root):

- `research/PRIOR-ART.md:383-384` — "**Phi(x,y) < 6x/log y for y <= x** but for a few small cases."
- `paper/staircase-note.md:444-445` — "prove the explicit unconditional **Φ(x,y) < 6x/log y for
  y ≤ x** with finitely many exceptions".

**Fix, both sites:** "Φ(x,y) < 0.6x/log y for y ≤ √x, but for a few small cases". Note the
direction of each error, because they do not cancel: **0.6 vs 6 makes the theorem ten times
stronger than the corpus reports**, while **y ≤ x vs y ≤ √x makes the corpus claim a range twice as
wide as the theorem covers.** Both files then go on to say a comparison against our closed form "is
available and has not been made" — if anyone makes it, they would be starting from a bound that is
wrong in both the constant and the range. Confidence certain.

Two attached notes:

- The `.6` in the source is written with a **leading bare decimal point**, `<.6x/\log y`, which is
  exactly the kind of string a fetch-and-paraphrase pipeline drops. This is the second finding in
  this pass caused by reading a rendered page instead of the source (the first is W1). Recommend a
  house rule: for any numeric constant taken from an arXiv paper, quote from
  `export.arxiv.org/api/query?id_list=…` or the `pdftotext` output, never from a rendered HTML
  summary.
- The venue the corpus gives, "J. Number Theory **254** (2024)", is **CORRECT** — confirmed against
  ScienceDirect as J. Number Theory 254 (2024) 169-183, even though arXiv's own comment field still
  says only "to appear". So the bibliographic half of this citation is better than the arXiv record
  and only the mathematical content is wrong.

### W4. `research/PRIOR-ART.md:20` prints e^{2γ}/4 as 0.7935 [OPEN, trivial to fix, but it is in the prior-art table]

`e^{2γ}/4 = 0.7930553…`. PRIOR-ART:20 heads its row "e^{2γ}/4 ≈ **0.7935** twin Mertens-bias
constant". It is the **only** site in the corpus with 0.7935: across the 63 body files the constant
appears as 0.79305 (24 times), 0.793055 (3), 0.7931 (4), 0.79303 (6), 0.7932/0.7930 (1 each). So
this is a one-character slip in the single most citation-sensitive table in the repo. **Fix:**
"e^{2γ}/4 ≈ 0.7931". Confidence certain.

### W2. "FGKMT Remark 7" — the FGKMT/FKMPT fix did NOT land everywhere; three residual sites [OPEN]

The brief asks me to verify the FGKMT → FKMPT fix landed. **It did not.** Remark 7 belongs to
*Long gaps in sieved sets*, arXiv:1802.07604 = **FKMPT** (Ford, Konyagin, Maynard, Pomerance,
Tao) — confirmed above from the PDF, where Remark 7 sits in §1.1 of v3/v4. Three sites still
attribute it to FGKMT, the JAMS 2018 paper (arXiv:1412.5029, Ford, **Green**, Konyagin, Maynard,
Tao), which contains no such remark:

- `paper/moire-primes.md:683` — "**FGKMT's** Remark 7 expressly fences their machinery to
  dimension [one]". **Fix:** "FKMPT's Remark 7".
- `paper/beta2-note.md:311` — "**FGKMT** Remark 7 for the two-dimensionality". **Fix:** "FKMPT
  Remark 7".
- `research/attack2-rankin2d.js:467` — "This matches **FGKMT** Remark 7 (their …)". **Fix:**
  "FKMPT Remark 7".

Both of the first two are in `paper/`, i.e. in publication-track drafts, which raises the stakes.
Confidence certain. Counts: 30 `FGKMT` and 19 `FKMPT` occurrences in the body set; I read all 49
and these three are the only wrong ones. The **FGKT** label (Ford, Green, Konyagin, Tao,
arXiv:1408.4505, the earlier *Large gaps between consecutive prime numbers*) is used at
`covering-dive.md:29, :102, :127, :133, :153, :156` and is correct everywhere — a three-way
acronym distinction the corpus otherwise gets right, which is why the three misses are worth
fixing rather than tolerating.

---

## 3. EXTERNAL CITATIONS — INCONSISTENT

### I1. The Iwaniec bound is pinned to Erdős #687 in one file and #970 in another, and only one is right [OPEN]

Both Erdős problem pages were fetched (erdosproblems.com 403s WebFetch; `curl` with a browser
user-agent works — worth recording for the next pass) and read in full:

- **#970** — no prize, source [Er65b]. "That h(k) ≪ k² is a conjecture of Jacobsthal. Iwaniec
  [Iw78] proved h(k) ≪ (k log k)²." Related OEIS: A048669.
- **#687** — **$1000**, sources [Er79d, p.79] [Er80, p.106] [Er96b]. "The best known upper bound
  is due to Iwaniec [Iw78], Y(x) ≪ x². … Maier and Pomerance have conjectured that Y(x) ≪
  x(log x)^{2+o(1)}." Related OEIS: A048670, A058989.

So the `h(k) ≪ (k log k)²` form lives at **#970** and the `Y(x) ≪ x²` form at **#687**. They are
the same theorem in two currencies, and the corpus splits them correctly in one place and wrongly
in another:

- `research/covering-dive.md:14-15` — "Universally cited form (e.g. Erdős Problem **#970**):
  h(k) ≪ (k log k)² … with an **unknown (inexplicit) constant**." **CORRECT.**
- `research/PRIOR-ART.md:22` — "Iwaniec, *Demonstratio Math.* 11 (1978): h(k) ≤ C(k ln k)²,
  constant unknown; see Erdős Problem **#687**". **WRONG cross-reference**: the h(k) form is #970;
  #687 states the Y(x) form. **Fix:** "see Erdős Problem #970 (h(k) form; #687 is the same theorem
  as Y(x) ≪ x², and carries the $1000)".

Two smaller notes from the same pair of pages, both flagged rather than asserted:

- Neither #687 nor #970, as they read today, contains the phrase "unknown constant" or flags the
  constant as inexplicit. `covering-dive.md:143` says "the \"unknown constant\" flagged at Erdős
  #970"; `covering-dive.md:15` says "with an unknown (inexplicit) constant". The *fact* is true and
  standard (Iwaniec's constant is inexplicit) but the *attribution to the Erdős page* is not
  supported by the page's current text. **Fix:** state it without hanging it on #970, or hang it on
  MO 245539, which is where the explicitness question is actually raised. See S2.
- #970's source is **[Er65b]**, i.e. Erdős 1965, not the Erdős 1962 *Math. Scand.* paper the corpus
  cites at `PRIOR-ART.md:376-379` and `exponent-control.md:20`. Both references are real and
  distinct; nothing is wrong, but anyone consolidating them should not merge the two.

### I2. `1+√e` is printed as both 2.6487 and 2.649, and an unrelated quantity is also printed as 2.649 [OPEN, a readability trap rather than an error]

`1+√e = 2.64872127…`, so `2.6487` (`sift-limit-attack.md:29`, `theta-ladder.md:310`, `:633`) and
`2.649` (about fifteen sites) are both correct roundings and mutually consistent. The trap is
elsewhere: **`research/theta-ladder.md:178`** writes "must be compared to the null **2 + ⟨2/ln lnW⟩
= 2.649**, NOT to 2". That 2.649 is a *completely different quantity* — an empirical null for a
regression slope — that happens to land on the same three digits as the vector-sieve sifting
threshold discussed twenty lines later in the same file (`:310`, `:551`, `:560`, `:563`, `:602`).
No reader will keep them apart, and the surrounding sentence ("the ln² factor carries about 0.65
of slope over this range") makes clear it is a regression artefact, not a sieve constant. **Fix:**
at `:178`, name it — "the null 2 + ⟨2/ln lnW⟩ ≈ 2.649 (numerically a near-coincidence with the
unrelated vector-sieve threshold 1+√e = 2.6487 discussed in §7; the two have nothing to do with
each other)". Confidence high on the collision; I did not re-derive the 2.649 null because the
W values are not tabulated in the file, so treat that number as out of scope here and inside the
numbers audit's remit.

---

## 4. EXTERNAL CITATIONS — UNVERIFIABLE

### U1. Iwaniec 1978 itself: still inaccessible, but the statement is now triangulated three ways [no action needed]

`Iwaniec, On the problem of Jacobsthal, Demonstratio Math. 11 (1978), 225-231` is the single most
load-bearing external citation in the corpus (17 sites). `covering-dive.md:156` already flags it: "Iwaniec
1978 itself was not obtainable (De Gruyter paywall/robot-block)". **Confirmed, still true.** What I tried:
`degruyterbrill.com/document/doi/10.1515/dema-1978-0121/html` and the `degruyter.com` equivalent both
return HTTP 202 (a Cloudflare interstitial, not content); `sciendo.com` 404s. No open copy found.

**But the statement itself is now confirmed from three independent published sources, which I think
closes the practical risk:**

1. **Erdős Problem #970** (fetched in full): "Iwaniec [Iw78] proved h(k) ≪ (k log k)²."
2. **Erdős Problem #687** (fetched in full): "The best known upper bound is due to Iwaniec [Iw78],
   Y(x) ≪ x²."
3. **FGKMT, arXiv:1412.5029, p. 4** (read from the PDF): "The best upper bound known is Y(x) ≪ x²,
   which comes from Iwaniec's work [26] on Jacobsthal's function."

Plus a fourth, for the primorial special case: **Vaughan 1977, p. 329** (read from the PDF) — "Iwaniec
(2, Theorem 2) has shown this in the special case when n is the product of the first r primes",
where Vaughan's reference (2) is Iwaniec's *earlier* 1971 *Acta Arith.* 19 paper. That matches
`covering-dive.md:27`'s Granville footnote 3 exactly, and it is a useful independent corroboration of
that footnote. **Recommendation:** upgrade `covering-dive.md:156`'s caveat to say the *statement* is
confirmed from four independent published sources and only the *proof* is unread, which is a much
smaller residual risk than the current wording implies.

### U2. Two items the corpus already marks UNVERIFIED, both still unverifiable [no action needed]

- **Siebert 1976** (explicit constant and interval form) — `natal-cap-10-sieve-cap.md:201-202` marks it
  `[UNVERIFIED]`, "cited through Lichtman p. 3 and secondary web sources". I did not attempt a fresh
  paywall assault; Lichtman's Table 1 and p. 3 both check out (see C6), so the chain of custody is
  sound and the marking is honest.
- **The Diamond–Halberstam book (Cambridge Tracts 177)** — `dhr-verification.md` marks it
  `COULD-NOT-ACCESS` / `lending-locked` in four places and triangulates from four restatements. That
  discipline is exemplary and I have nothing to add except that the *framing* of the file is stale
  (D1-D6).

---

## 5. EXTERNAL CITATIONS — SUSPICIOUS

Flagged for human check, in the spirit of "twenty flagged suspicions over one silent fabrication".
None of these is disproven.

### S1. "H. J. S. Smith (1857)" — the year does not fit the man's bibliography

`research/PRIOR-ART.md:16` hedges it properly — "periodicity remarked by H.J.S. Smith (**1857, per
Dickson's *History***)" — a secondary-source citation, honestly labelled. But three other sites drop
the hedge and state it flat:

- `paper/moire-primes.md:349` — "periodicity of such patterns **was remarked by H. J. S. Smith in
  1857**." This is in the publication-track draft.
- `paper/moire-primes.md:824` and `research/README.md:133` — "periodicity per Smith 1857", "from
  H.J.S. Smith 1857 to Iwaniec 1978 to Táfula 2015".

**Why it smells:** Henry John Stephen Smith's *Report on the Theory of Numbers* ran 1859-1865, and his
well-known arithmetical-determinant paper is 1875/76. 1857 predates both. It is entirely possible
Dickson's *History* Vol. 1 cites an 1857 Smith item — Dickson is exactly the kind of source that
would — and I could not check Dickson. **Recommended action:** one person, ten minutes, with Dickson
Vol. 1 (the corpus already cites p. 439 of it via A048670, so it is in reach), to produce the actual
title and year. Until then, `paper/moire-primes.md:349` should carry PRIOR-ART's hedge rather than
assert the date, because a 170-year priority claim with a wrong year is worse than no claim.

### S2. "The 'unknown constant' flagged at Erdős #970"

`covering-dive.md:143`. I read #970 in full; it contains no such flag. The underlying fact (Iwaniec's
constant is inexplicit) is standard and true, and MathOverflow 245539 is where the explicitness
question is actually raised. **Fix:** attribute the flag to MO 245539, or state the fact without
attribution. Not a fabrication — a citation pointed one door along.

### S3. Two quotations inside quotation marks that are light paraphrases, not verbatim

Both are substantively faithful; both would fail a referee's spot-check because they are presented as
quotations. Recorded together because they are the same habit.

- `research/PRIOR-ART.md:322-323` quotes Cheer–Goldston as **"Maier used this result to show there is
  unexpected irregularity…"**. The source reads "Maier **has recently** used this result to show there
  is unexpected irregularity in the distribution of primes in short intervals." Silent deletion inside
  quotes. (The *other* Cheer–Goldston quotation on the line above, "introduced by Buchstab in
  connection with an asymptotic formula for the number of uncanceled terms in the sieve of
  Eratosthenes", is **exactly verbatim** — verified.)
- `research/PRIOR-ART.md:20` quotes Táfula as **"missing the constant by 4e^{−2γ}"**. The source
  (arXiv:1508.05702v5, §2, read from the PDF) reads "…agrees with Hardy & Littlewood's conjectured
  growth order, **missing its constant only by a factor of** 4e^{−2γ}". Substance and the number are
  right; the wording is not the source's.

**Fix for both:** either quote exactly, or drop the quotation marks and paraphrase openly.

### S4. Táfula's year range "(2015/2020)"

`research/PRIOR-ART.md:20` dates arXiv:1508.05702 "(2015/2020)". The PDF I fetched is **v5, dated 28
Aug 2019**. v1 is 2015, so the first half is right; I found no 2020 version, but I did not enumerate
the version list, so this is a flag and not a finding. **Fix:** "(2015, v5 2019)" unless someone
confirms a later version.

### S5. `covering-dive.md:16`'s "both … state verbatim" is half-checked

The line claims that *both* FGKT (arXiv:1408.4505) and FGKMT (arXiv:1412.5029) "state verbatim: 'The
best upper bound known is Y(x) ≪ x², which comes from Iwaniec's work [Iw78] on Jacobsthal's
function'". I verified it word for word in **FGKMT** (p. 4). I did not pull the FGKT PDF, so the
"both" is unchecked on one side. Low risk — the two papers share four authors and an introduction
structure — but a claim of *verbatim* identity across two papers should be checked on both.

### S6. `covering-dive.md:29`'s Iwaniec Lemma 1 reconstruction, and `:126`'s "possible error/typo"

`covering-dive.md:29` describes the internals of Iwaniec 1978's Lemma 1 ("a multiplicative bijection
l(·) between the divisors of…") on the strength of a MathOverflow transcription, and `:126` reports a
"possible error/typo inside the published proof". Since Iwaniec 1978 is unreadable (U1), **every
statement in the corpus about the paper's internals rests on a 2016 MathOverflow post by an amateur
whose own arXiv note the corpus also miscites (W7).** The file already says so at `:156`, which is why
this is a flag and not a finding. But `paper/beta2-note.md:193` uses it in a live argument
("Iwaniec's 1978 paper needs its Lemma 1 — the divisor-bijection transfer") and `paper/PAPERS.md:29`
sells Paper II partly on "avoiding Iwaniec's **contested** transfer lemma". Calling a published lemma
"contested" in a paper abstract, on the authority of one unanswered MO question, is a reputational
risk out of proportion to the evidence. **Recommended action:** soften `PAPERS.md:29` to "avoiding
Iwaniec's transfer lemma entirely" — the selling point is that the route does not need it, which is
true and does not require the lemma to be doubtful.

### S7. "A192870 (twins between squares)" is a loose OEIS label

Stated in full at the end of §6, where it sits beside the rest of the OEIS work. Summary: A192870 is
the *n-tuplet* generalisation, not the twin sequence; the twin-specific ones are A091591/A091592, which
the corpus cites correctly elsewhere. Affects `oeis-G2-submission.md:82` (a crossrefs field an OEIS
editor reads) and `PRIOR-ART.md:19`. Low severity.

---

## 6. EXTERNAL CITATIONS — CLEAN

Recorded so coverage is known. Each of these was opened at the source, not inferred.

### C1. Paper identities and the three-way FGKT / FGKMT / FKMPT split

- **arXiv:1802.07604** = Ford, Konyagin, Maynard, **Pomerance**, Tao, *Long gaps in sieved sets*, JEMS
  **23** (2021) **667-700** — author list, order, venue, volume and pages all confirmed from the abs
  page. `two-class-lower-bounds.md:87`'s "arXiv:1802.07604, JEMS 23 (2021) 667-700" is exact, page
  numbers included. **The FGKMT→FKMPT fix landed correctly in 16 of 19 places**; the three misses are
  W2.
- **arXiv:1412.5029** = Ford, **Green**, Konyagin, Maynard, Tao, *Long gaps between primes*, JAMS **31**
  (2018) **65-105** — confirmed. Every corpus site saying "FGKMT (JAMS 31, 2018)" is right.
- **arXiv:1408.4505** = the earlier Ford–Green–Konyagin–Tao paper, and the corpus's **FGKT** label for
  it (`covering-dive.md:29, :102, :127, :133, :153, :156`) is correct and consistently used. A
  three-way acronym distinction, got right everywhere.
- **arXiv:1408.6002** = Holt **and Rudd**, *Eratosthenes sieve and the gaps between primes*, 2014 —
  confirmed, and the abstract does describe "this recursion on the cycles of gaps across stages of
  Eratosthenes sieve", which is what PRIOR-ART cites it for.
- **arXiv:2308.07570** = Holt, *On the counts of p-rough numbers*, 2023 (v final Feb 2024) — confirmed,
  and it does introduce the signed discrepancy ΔΦ(x,p) as a bounded periodic function, exactly as
  `discrepancy-two-class.md` and `variance-note.md:169` use it.
- **arXiv:2603.25915** = Holt, *Surviving Eratosthenes sieve I: **quadratic density and Legendre's
  conjecture***, submitted 26 Mar 2026 — confirmed. The title independently corroborates
  `PRIOR-ART.md:140`'s "Holt's Legendre result (2603.25915 …, the quadratic density of a gap)". I did
  not open the full text, so the specific pointer "**Theorem 3.3**" is unchecked.
- **arXiv:2604.22058** = **Weingartner**, *A link between error terms when counting smooth and rough
  numbers*, April 2026 — confirmed, and `PRIOR-ART.md:386-390` describes it accurately ("Links the
  error terms for smooth and rough counting functions and turns Fan's explicit rough bound into an
  explicit bound for de Bruijn's smooth approximation"). Correctly *not* attributed to Holt, despite
  sitting next to Holt in both citing passages.
- **arXiv:1311.5944** = **Gerhard R. Paseman**, *Updating An Upper Bound Of Erik Westzynthius*, 2014 —
  confirmed. Author and title right everywhere; only the mathematical content is misdescribed (W7).
- **arXiv:2109.02851** = Lichtman, *A modification of the linear sieve, and the count of twin primes* —
  confirmed, and the corpus's id at `natal-cap-10-sieve-cap.md:26` is correct.
- **arXiv:1706.00317** = Ziller and Morack, *Divisibility in paired progressions, Goldbach's
  conjecture, and the infinitude of prime pairs*, 2017 — confirmed.

### C2. Ziller–Morack's bound really is conjectural, exactly as the corpus insists

The abstract states it plainly: "For this function, we conjecture a specific upper bound and prove
that this bound **would be** a sufficient condition for the truth of the Goldbach conjecture…" So
`PRIOR-ART.md:26` ("Ziller–Morack prove no unconditional bound (theirs is conjectural)"),
`covering-dive.md:55` ("Ziller–Morack's *conjectural* h₂(n) < pₙ² − pₙ"), `two-moire-argument.md:68`
and `G2-STATE.md:722-724` are all correct. Independently corroborated by A288815's OEIS comment:
"There is **a conjecture** about an upper bound on this sequence. … If a(n) < p_n^2 − p_n holds for
n>=3 then Goldbach's conjecture and the twin prime conjecture hold as well" — which also verifies
`G2-STATE.md:723-724`'s statement of the reduction, and the arithmetic at `covering-dive.md:107`
(p₂₁ = 73, 73² − 73 = 5256 ✓, h₂(21) = 2622 = A288815(21) ✓, ratio 0.499 ✓).

### C3. Brüdern–Fouvry, and the 1+√e figure derived independently

- **Brüdern and Fouvry, *Le crible à vecteurs*, Compositio Math. 102 (1996) 337-355** — confirmed
  (numdam, `CM_1996__102_3_337_0`), title included, exactly as `sift-limit-attack.md:220` and `:417`
  give it.
- **`1+√e = 2.6487…` as the vector-sieve positivity threshold: CORRECT, and I re-derived it.** The
  vector sieve's main term needs `2f(u)F(u) − F(u)² > 0`, i.e. `2f(u) > F(u)`; with the linear sieve's
  `F(u) = 2e^γ/u` and `f(u) = (2e^γ/u)·log(u−1)`, that is `2log(u−1) > 1`, i.e. `u > 1 + e^{1/2} =
  2.64872`. So `sift-limit-attack.md:29`, `:237`, `:243`, `theta-ladder.md:551`, `GLOSSARY.md:270`,
  `G2-STATE.md:516` and `moire-primes.md:634` are all right, and `2(1+√e) = 5.2974` and
  `5.2974/4.26645 = 1.2417` both check out arithmetically. The corpus is also consistently careful to
  frame full decoupling as a *road*, not a result.
- One observation worth a human eye, offered as context rather than a correction: **the BF paper's own
  Theorem gives θ(κ) → 0,2406 as κ → 0, and its §1 explicitly compares that to the DHR κ=2 route's
  θ < 1/4,2664 = 0,2343** — so in BF's own setting the vector sieve *beats* the dimension-2 sieve,
  slightly. `paper/moire-primes.md:629` says the vector sieve's 2(1+√e) = 5.297 being "worse than what
  we have … explains its absence from the literature". The two statements are about different
  problems (BF sieve `{p+2}` under a congruence condition; we want G₂), so I do not think this is an
  error — but "explains its absence" is a claim about the literature that BF's own introduction reads
  against, and it is in a paper draft. Worth one sentence of hedging.

### C4. Erdős problems #687 and #970: quotations and content

Both fetched in full (see I1). `covering-dive.md:116`'s `$1000` quotation — "It is not clear who first
formulated this problem…I offer the maximum of \$1000 dollars and 1/2 my total savings" — matches the
page word for word with an honest ellipsis, and the "(Erdős 1980)" attribution matches the page's
[Er80] source. `covering-dive.md:119`'s #970 quotation is verbatim. `covering-dive.md:102`'s
"Maier–Pomerance conjectured Y(x) ≪ x(log x)^{2+o(1)} (stated in FGKT/FGKMT and at #687)" is confirmed
on both legs. `covering-dive.md:117`'s #688 gloss ("Erdős proved ε_n ≫ logloglog n/loglog n") was not
checked.

### C5. Buchstab, Cheer–Goldston, Maier, Maier–Pomerance

- **The Buchstab delay equation** as `PRIOR-ART.md:320-321` states it — `ω(u) = 1/u` on `[1,2]` with
  `(uω(u))' = ω(u−1)` — is the standard form and is confirmed against Cheer–Goldston.
- **Cheer and Goldston, *A differential delay equation arising from the sieve of Eratosthenes*, Math.
  Comp. 55 (1990) 129-141** — confirmed, including pages. The Buchstab attribution sentence is
  verbatim (see S3 for the second quotation).
- **Buchstab, *Asymptotic estimates of a general number-theoretic function*, Mat. Sb. 44 (1937)**
  (`moire-primes.md:901`) — consistent with every secondary account; not independently verified.
- **Maier, *Primes in short intervals*, Michigan Math. J. 32 (1985) 221-225** — confirmed, DOI
  10.1307/mmj/1029003189. `moire-primes.md:916` gives volume and year correctly.
  `PRIOR-ART.md:293`'s "the tile is Maier's matrix … (Maier 1985)" is the right attribution for the
  matrix method, corroborated by the Wikipedia and Thorne survey accounts of the method's origin.
- **Maier and Pomerance, *Unusually large gaps between consecutive primes*, Trans. Amer. Math. Soc.
  322 (1990) 201-237** — confirmed via A048670's bibliography, matching
  `two-class-lower-bounds.md:90`'s "TAMS 322 (1990) 201-237" exactly. The conjecture statement is
  verified verbatim in FGKMT (W6, leg 1).

### C6. Lichtman's chronology table, verified row by row against the published PDF

`research/natal-cap-10-sieve-cap.md:22-52`. I fetched the published version (`msp.org/ant/2025/19-1/
ant-v19-n1-p01-p.pdf`) and read Table 1 and pp. 3-4. **Every row matches**: the year column reads
1919, 1947, 1964, 1966, 1978, 1983, 1984, 1986, 1986, 1990, 2003, 2004 and the value column
O(1), 8, 6, 4, 3.9171, 34/9 = 3.7777…, 64/17 = 3.7647…, 3.5, 3.454, 3.418, 3.406, 3.39951, against
Brun, Selberg [1952], Pan, Bombieri–Davenport, Chen, Fouvry–Iwaniec, Fouvry, BFI, Fouvry–Grupp, Wu,
Cai–Lu, Wu. The corpus's row "1947 | Selberg [publ. 1952]" is exactly right, **including** its note
(ii) explaining the 1947-vs-1952 split. **Theorem 1.2 confirmed: "π₂(x) ≲ 3.29956 Π(x)."** The
"2.94% refinement from the previous record bound of Wu [2004]" and "largest percentage improvement
since … 1986" phrases are both in the paper. The levels x^{4/7} (BFI) → 7/2, x^{7/12} (Maynard) and
x^{10/17} (Lichtman) all check, as does §1.3's verbatim "if one proves level of distribution x^{θ−ε}
then one immediately obtains π₂(x)/Π(x) ≲ 2/θ". **This is the best-sourced table in the corpus and it
holds up completely.**

Note for the brief: it lists "**Chen 1978**". Both dates in the corpus are correct in their places —
**1978** is Chen's row in Lichtman's Table 1 (the constant 3.9171), and **1973** is Chen's theorem,
which is what `OBSERVATIONS.md:412`, `:642`, `attack-09-chen-theta.js:4` and
`natal-cap-10-sieve-cap.md:64` (the switching principle) all refer to. No error here.

### C7. Selberg's parity problem and Tao's 2007 exposition

`research/PRIOR-ART.md:29` quotes "sieves **unable to provide non-trivial lower bounds**" for
fixed-parity sets, attributed to "Tao's 2007 exposition". Confirmed against Tao, *Open question: the
parity problem in sieve theory*, 5 June 2007: "If a set's elements are all products of an odd number
of primes (or all products of an even number of primes), then **sieve theory is unable to provide
non-trivial lower bounds** on the size of that set." Verbatim on the quoted fragment.
`moire-primes.md:418`'s gloss is faithful. Selberg 1949 as the origin of the parity obstruction is
standard.

### C8. Vaughan 1977

**R. C. Vaughan, *On the order of magnitude of Jacobsthal's function*, Proc. Edinburgh Math. Soc. 20
(1975-77) 329-331** — confirmed from the Cambridge PDF, including the page range as
`covering-dive.md:17` gives it. Its content is what W7 is about.

### C9. OEIS — 28 A-numbers, all checked for identity

Every A-number in the body set was checked against oeis.org. **`A510510` at
`research/attack2-rich-vein.js:82-86` is a false positive of my extractor** — it is a JavaScript
variable name for a mod-510510 aggregate, not an A-number. Of the remaining 27, names and offsets all
match the use, and the following carry claims that depend on the details, all verified:

- **A048670** "Jacobsthal function A048669 applied to the product of the first n primes (A002110)",
  offset 1,1 — and `exponent-control.md:22-23`'s "58 terms, out to p = 271" is exactly the length of
  the displayed DATA field, with the 58th prime = 271. (Bozek's b-file runs to n = 64; the corpus's
  count refers to the DATA field and is correct as stated.)
- **A288815** "Paired Jacobsthal function applied to the product of the first n primes", offset 1,1,
  21 terms ending 2622 — matches `exponent-control.md:23-24`'s "21 terms, out to p = 73" and every
  h₂(21) = 2622 use.
- **A072753** "Maximum gap in two-stage prime-sieves", offset **3,1**, 19 terms ending 436 = n = 3..21.
  `A288815(n) = 6·A072753(n) + 6` for n ≥ 3 is the OEIS's own formula and reconciles the two offsets;
  `covering-dive.md:107`'s "exact optima to n = 21" is right for both.
- **A059861** `a(n) = Product_{i=2..n}(prime(i) − 2)`, offset 1,3 — the census. `G2-STATE.md:44`,
  `GLOSSARY.md:27`, `moire-primes.md:154` and `d2-d4-bijection.md:21` all use the correct index. Only
  `oeis-G2-submission.md` is off by one (W3). Cross-check: `A059861(10) = 214,708,725` is the slot
  count of T₂₉ quoted at `U-FRAME.md`, and p₁₀ = 29. ✓
- **A060256** "Smallest multiple a(n) of n-th primorial q(n) such that a(n)q(n)−1 and a(n)q(n)+1 are a
  pair of twin primes", offset 1,1 — `ATTACKS2.md:20`, `:30` and `attack2-05-07-integral-ladder.js:186`
  identify the seam ladder m(n) with it and say it "carries **no formula**". Both correct: the terms
  are the multipliers k (verified by hand at n = 1..6: k = 2, 1, 1, 2, 1, 6 giving 3/5, 5/7, 29/31,
  419/421, 2309/2311, 180179/180181), and the OEIS entry has no `%F` line. The corpus's handling of
  the near-duplicate **A384545** ("the smooth-multiplier variant, differing first at n = 29") is also
  correct in substance — A384545(n) = A060256(n+1) on every term OEIS displays, and it is a genuinely
  different definition.
- **A091592** "Numbers n such that there are no twin primes between n² and (n+1)²" —
  `ZONE-POSTULATE.md:201-202` quotes the name verbatim and lists all twelve terms (1, 9, 19, 26, 27,
  30, 34, 39, 49, 53, 77, 122) correctly. **A091591**'s comment is quoted correctly too: the entry
  reads "It is conjectured that a(n)>0 for all n>122. Proving this would also prove the twin prime
  conjecture" plus T. D. Noe's Legendre remark, which is exactly what `ZONE-POSTULATE.md:205-207` and
  `GLOSSARY.md:290-292` report. **A113274** "Record gaps between twin primes" — name verbatim.
- **A002110, A048669, A058989, A049296, A014545, A057704, A057706, A087651, A087732, A060255,
  A292224, A023193, A020497, A008407, A001358, A014612, A014613, A192870** — names fetched and
  compared against every use; no mismatch beyond S7 below.

### S7 (belongs with §5). "A192870 (twins between squares)" is a loose label

`research/oeis-G2-submission.md:82` crossrefs "A192870 (twins between squares)" and
`research/PRIOR-ART.md:19` calls it "twin-Legendre (OEIS A192870)". A192870's actual name is "the
maximum integer M such that there are no prime **n-tuplets of any possible pattern** between M² and
(M+1)²" — a sequence over tuple-sizes n, whose n = 2 entry is 122. The twin-specific sequences are
**A091591/A091592**, which the corpus cites correctly elsewhere. Not wrong (A192870(2) is the twin
case, and 122 is the shared value) but imprecise in a crossrefs field an OEIS editor will read. **Fix:**
"A192870 (the n-tuplet generalisation; its n = 2 entry is the twin case)". Low severity.

---

## 7. MEMORY CORRECTIONS

Read `MEMORY.md` and all eighteen `prime-*` / `primeoire-*` / `chris-*` files at
`~/.claude/projects/-Users-benjaminsen-Files-Git-primeoire/memory/`. **Nothing
edited.** Listed worst-first. Note that several of these files are explicitly chronicles
(`prime-moire-theorems.md` in particular) where a later line supersedes an earlier one by design — I
have only listed cases where the *current, live* claim is wrong, not cases where an early line was
later corrected inside the same file.

### M1. `prime-u-frame-2026-08-16.md` names as "THE SINGLE HOLE" a hole the repo now records as closed [worst memory error]

Two lines, plus the index entry that points at them:

- `:25` — "**THE SINGLE HOLE, and it is circular:** to iterate, we need maxsum_m(T_x) as a function of
  x. The only proven bound on it is maxsum₁ = G₂ — the thing being bounded. **One rung, no ladder.**
  Everything today ended here."
- `:56` — "The live question: **find a proven upper bound on maxsum_m(T_x) as a function of x that is
  not G₂ itself.**"
- `MEMORY.md:8` — describes the file as "THE CURRENT FOCUS: what's proven, **the one circular hole**".

`research/U-FRAME.md` §9 now reads "**Solid, and a hole that has since closed.** The growth law of
maxsum_m is no longer missing", citing `research/localized-04-maxsum.md` for
**maxsum_m = m·m̄ + σ·√(2m·ln D)**, unfitted, holding to 6 percent over m ∈ [2 ln D, 1024] and three
decades of window size. And U-FRAME §9's "Not solid" paragraph now names **L** as the hole where
"everything rests". `LOCALIZED-GAP.md:153-155` and `G2-STATE.md:397-399` both say so explicitly.

**Corrected lines, for whoever next updates the memory:**
- `:25` → "**The hole that closed.** The maxsum_m growth law is no longer missing:
  `research/localized-04-maxsum.md` measures maxsum_m = m·m̄ + σ√(2m ln D), unfitted, to 6 percent
  over three decades of window size, and U-FRAME §9 records it as closed. **The repo's named single
  hole is now L**, which is TPC-hard by U-FRAME §9's own structural warning. The obstruction the
  ladder revealed is the gate, not the ladder."
- `:56` → "The live question is no longer maxsum_m. It is the gate, and L."
- `MEMORY.md:8` → "…what's proven, the hole that closed (maxsum_m) and the one that did not (L)…"

**Caveat, stated so the correction is not itself an overclaim:** the maxsum law is **MEASURED**, not
proven, so the literal question "find a *proven* upper bound" is still open. What has changed is the
repo's position on where the difficulty lives, and the memory should carry the repo's current position.

Same phrase, same problem, in the body files: this is finding **D8** above, four sites.

### M2. `primeoire-project.md`'s resume point is 27 commits stale, and two facts under it have moved

- "**Next step (resume here, updated 2026-08-17 late): branch `opus-try`, clean at `02b773d`.**" HEAD
  is now **`ea8fef4`**, **27 commits** further on (and the "(prior)" line's `1536446` is 29 back). The
  whole consistency campaign has happened since. **Corrected line:** "branch `opus-try`, clean at
  `ea8fef4`; the 2026-08-17 internal-consistency campaign is in `research/history/staging/qc-*.md`."
- "OEIS draft research/oeis-G2-submission.md with **ELEVEN** verified terms incl. a(11)=G₂(31#)=348".
  It now carries **TWELVE**: `research/oeis-G2-submission.md:16` reads
  `2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528`, with a(12) = G₂(37#) = 528. (The 12th term is
  recorded in `prime-moire-theorems.md:142`, so the memory system knows — just not in this file.)
  **Corrected line:** "…with TWELVE verified terms incl. a(12) = G₂(37#) = 528".
- Phase-4 item (e), "REFUTED our '≈0.2 constant' — Var/E drifts (0.25→0.32), stable law
  ln(Var/E)≈−(0.24u²+0.13u), **limit = open question**". `paper/variance-note.md:27` and `:310-311` now
  put the limit at **0.611 at u = 2**, approached along a `1/ln ln W` line, with the `0.44` form
  demoted 10:1. **Corrected line:** "…limit now placed near 0.611 at u = 2 along a 1/lnlnW line, with
  0.44 demoted; the *scaling* limit remains conjecture-shaped."

### M3. `prime-moire-theorems.md` carries the two citation errors this pass found in the body

Both are the memory faithfully mirroring a body-file error, so fixing the body without fixing the
memory would re-seed them:

- `:132` — "**FGKMT Remark 7** (verbatim in doc) expressly excludes 2-dim systems" and `:142` —
  "matches **FGKMT Remark 7**". Remark 7 belongs to **FKMPT** (*Long gaps in sieved sets*,
  arXiv:1802.07604); the JAMS 2018 FGKMT paper has no such remark. See **W2**. **Corrected:** "FKMPT
  Remark 7".
- `:95` — "Iwaniec g(q)≪ln²q (1978, unknown constant; **Erdős #687**)". The `h(k)` form and the
  inexplicit constant belong to **#970**; #687 is the `Y(x) ≪ x²` form and carries the $1000. See
  **I1**. **Corrected:** "…(1978, inexplicit constant; Erdős #970 for the h(k) form, #687 for Y(x))".
- `:95` also repeats "Copying (A059861, Schemmel 1869, **Smith 1857**)" — the unverified date flagged
  at **S1**. Not an error, but it will propagate; whoever settles the Smith date should fix it here too.

### M4. `prime-moire-theorems.md:85` states there are weaker-exponent two-class bounds; the dive found none

":85" says "for twins (ν=2 omitted residues/prime) **known generalized-Jacobsthal bounds have weaker
exponents** (literature dive needed — do NOT trust memory here)". The dive was done and the answer was
the opposite: `research/PRIOR-ART.md:26` and `research/covering-dive.md:64` both record **no published
upper bound at any exponent** for two classes per prime, which is exactly what makes the β₂ theorem
the project's first result. The line does self-flag "do NOT trust memory here", which is why this is
M4 and not M1, but the flag should now be replaced by the answer. **Corrected:** "for twins there are
**no** published upper bounds at any exponent — confirmed by the 2026-08-14 covering dive; ours
(G₂ ≪ pₙ^{4.267+ε}) is the first."

### M5. `prime-holt-prior-art.md` — two small things, one of them the W8 co-author slip

- `:57-58` — "(1402.1970 §4 tabulates h(p#), = A048670, and proves no upper bound)". **arXiv:1402.1970
  is Holt AND Rudd** (W8). The file's header does say "Fred B. Holt (with Helgi Rudd)", so this is
  venial here in a way it is not in `paper/moire-primes.md`'s bibliography — but the same fix applies.
- `:58-59`'s ratio table — "G₂/h at x=5..37: 2.0, 3.0, 3.0, 3.0, 4.15, 4.41, 5.10, 5.61, 6.00, 8.00" —
  **VERIFIED CORRECT.** I recomputed it from the DATA field of `oeis-G2-submission.md` against
  A048670's terms: 2.000, 3.000, 3.000, 3.000, 4.154, 4.412, 5.100, 5.609, 6.000, 8.000 at n = 3..12.
  No change needed. Recording it because it is the one quantitative claim in that file and it holds.
- `:44-46`'s "His Legendre result (Thm 3.3) rests on Conjecture 2.1, 'approximate uniformity',
  explicitly unproven" — consistent with `PRIOR-ART.md:140` and `:366`, and independently supported by
  the title of arXiv:2603.25915 (*Surviving Eratosthenes sieve I: quadratic density and Legendre's
  conjecture*). The specific "Thm 3.3" pointer is unverified — I did not open the full text. Flag only.

### M6. `prime-fold-profile-2026-08-17.md` is internally inconsistent about β₂ to one digit [low priority]

`:31` writes **β₂ = 4.26645** (the verified value); `:37` and `:41`, plus `MEMORY.md:7`, write
**4.2665**. Both are defensible as roundings and `4.2665` is the correct 4-d.p. value, so nothing is
wrong — but the file that records "the gap is an exponent 4.2665→2" should use the same digits as the
file that records the verified constant. `paper/beta2-note.md` has already been moved to `4.26645…`
throughout (D1), so the memory is now one convention behind. **Corrected:** use `4.26645` in all three,
or say "≈4.2665 (exactly 4.26645028414864191641)".

### M7. What I checked in memory and found sound

So coverage is known. `primeoire-no-push.md`, `primeoire-doc-convention.md`,
`chris-writing-style.md`, `chris-user-profile.md`, `agent-orchestration-lessons.md` and
`primeoire-vocabulary.md` contain no external citations and no repo-state claims that have moved;
`primeoire-vocabulary.md:41`'s "maxsum_m = largest sum of m consecutive gaps; maxsum₁ = G₂" matches
the body exactly. `prime-u-frame-2026-08-16.md:33`'s Ziller–Morack paragraph is **correct in every
particular**, including the OEIS comment quoted ("if a(n) < p_n² − p_n for n≥3 then Goldbach and TPC
both hold" — verbatim against A288815) and the A091592 facts (twelve terms, last 122, tested to 1e7).
`prime-u-frame-2026-08-16.md:39`'s "Ledger reads '4.267 proven, 1 needed'" matches
`research/ATTACKS3.md:188`. The four `prime-digest-folders-*` files are 2026-08-13 corpus digests of
Chris's original folders and are not claims about the current repo, so they cannot go stale in the
sense the brief means; I did not audit them.

---

## 8. UNRESOLVED / NEEDS A DECISION

### 8.1 Decisions only a human can take

1. **Which FKMPT version does the corpus stand on?** (W1) I recommend **v4 / the JEMS corrigendum**,
   i.e. the `6` constant, because it is the current text and the corrigendum is published. That makes
   `C(1/2) > 1/325565` rather than `1/6001`. The alternative — keep v3 and say so loudly — is defensible
   only if some argument depends on the larger value, and I found none. **Someone must choose, and the
   choice touches `covering-dive.md:58-59` and `two-class-lower-bounds.md:119-127` together.** Do not
   fix one without the other; they were made consistent once already and it went to the wrong value.
2. **The title of Paper II** (D7). `PAPERS.md` says "Two-sided bounds for the twin Jacobsthal
   function"; `beta2-note.md` says "An upper bound for the twin Jacobsthal function". Both are
   defensible readings of the same note. Chris's call.
3. **What replaces TODO 000b** (W7). My recommendation is to close it with the finding rather than
   delete it, because "no explicit-constant elementary route to exponent 2 exists" is a real negative
   result about the literature and the kind of thing this corpus keeps well. But it is a TODO the owner
   set, so closing it is his call.
4. **Whether `paper/PAPERS.md:29` should call Iwaniec's Lemma 1 "contested"** (S6). This is a
   reputational judgement, not a factual one.

### 8.2 Things I could not settle, with what I tried

- **Iwaniec 1978's actual text** (U1). De Gruyter 202s, Sciendo 404s. Statement triangulated four
  ways; proof unread. Chris has bought a book before to close a gap this size — this is a 7-page 1978
  paper and the same move would close the corpus's single most-cited external dependency permanently.
- **Vaughan 1977's inner exponent** — his Theorem is `g(n) < ω(n)²(log₂ω(n))^c` and `pdftotext`
  mangled `c`. The PDF is saved at `scratchpad/vaughan.pdf`; two minutes with human eyes settles it.
  Needed only if anyone wants to quote Vaughan's bound with numbers rather than as "arbitrarily close
  to 2", which is verbatim.
- **Dickson's *History* on Smith 1857** (S1).
- **Holt 2603.25915 Theorem 3.3** — abstract and title verified, theorem number not.
- **FGKT (arXiv:1408.4505) on the verbatim Iwaniec sentence** (S5) — verified in FGKMT only.
- **Erdős #688's "ε_n ≫ logloglog n/loglog n"** (`covering-dive.md:117`) — page not fetched.
- **`theta-ladder.md:178`'s 2.649 null** — the W values are not tabulated in the file, so I could not
  recompute it. It belongs to the numbers audit, not this one; I flagged only the digit collision (I2).

### 8.3 Sequencing, and one interaction with the history migration

Independent of everything else and safe to apply now: **W2, W3, W4, W5, W8, D7, D9, I1, S2, S3, S7**.

Coupled, apply together: **W1a + W1b + W1c + W1e + D12** (the FKMPT cluster — one decision, five
edits, and D12's replacement text assumes W1a and W1b are already in).

Coupled, apply together: **W7 across all six sites** — `TODO.md:44`, `G2-STATE.md:535` and `:776`,
`ZONE-POSTULATE.md:249`, `THE-DIALS.md:260`, `two-class-lower-bounds.md:611`, plus the attribution move
at `covering-dive.md:17`. Leaving any one behind re-seeds the claim.

**W6 interacts with the history migration.** `qc-history.md`'s O11 ruled that `maxgap-law.md` §10's
item 4 must be *relocated into §7* and the rest of §10 deleted. W6 says item 4 needs three corrections
before it moves. **Correct it first, then relocate it** — otherwise the migration carries a wrong
statement of FGKMT's theorem into §7 under the label "checked against the source, so nobody re-checks
it", which is the worst possible place for it.

**D1-D6 interacts with `audit-campaign.md`.** That file lists `dhr-verification.md` as "Clean, no
change needed". Whoever applies D1-D6 should also strike that line, or the next pass will re-clear a
file that is not clear.

### 8.4 Corrections to the brief

Offered because the brief asked for them.

1. **The FKMPT constant is backwards in the brief.** It says an earlier audit "traced a real constant
   error (C(rho) > e^{-1-4/rho}, a 4 not a 6) to exactly this kind of version confusion", reading as
   though `4` were the correction. From the PDFs: **`6` is current (arXiv v4 + the JEMS corrigendum)
   and `4` is the retracted v2/v3 value.** The corpus currently carries the `4`. Whoever "fixed" it
   moved it to the superseded text. (W1)
2. **`covering-dive.md:58` cites v3, not v4, for Theorem 1.** The brief says the file "labels its
   FKMPT Remark 7 quotation 'quoted verbatim from the arXiv v4 PDF'" — true, `:62` — "whereas
   `two-class-lower-bounds.md:134` keeps `[7]`" — also true — and "The same file's neighbouring bullet
   cites v3 for Theorem 1 while this one cites v4" — true. All three legs of the brief's item (b) are
   accurate. The one thing the brief did not anticipate is that **Remark 7's text is byte-identical in
   v3 and v4**, so the version split is harmless *there* and the real damage is one bullet up. (W1e)
3. **`research/killrun.js` is a `.js`, and O14/O15 are in `.js` files** — the brief scopes me to "every
   passage in a body *.md". I kept to `.md` for Job 1's extraction but included `.js` in Job 2's
   citation sweep, which is how `attack2-rankin2d.js:467`'s FGKMT/FKMPT error surfaced (W2). If the
   next dead-quotation pass excludes `.js` it will miss the same class there; qc-history already found
   two of its fifteen orphans in scripts.
4. **The brief says "Chen 1978"** among the load-bearing theorems. Both dates in the corpus are
   correct in their places: **1978** is Chen's row in Lichtman's Table 1 (the constant 3.9171), and
   **1973** is Chen's theorem and the switching principle. No error to fix. (C6)
5. **oeis.org 403s WebFetch; erdosproblems.com 403s WebFetch.** Both work with `curl -A "Mozilla/5.0"`.
   The arXiv API (`export.arxiv.org/api/query?id_list=…`) is the right tool for constants because it
   returns the abstract's LaTeX source — it is how W5 was caught — but it rate-limits hard after a few
   requests. Worth putting in the next brief; two of the three worst findings in this pass came from
   reading source text instead of a rendered page.
6. **`research/two-class-lower-bounds.md` already knew about the C(ρ) discrepancy** and logged it at
   `:119-124`, saying "both may be right for different versions". That note was correct in principle
   and is now resolvable in fact. The corpus's own instinct was right; it just never got the PDFs.
   Worth knowing that the repo's discrepancy-logging habit worked.

### 8.5 One process recommendation

Three of this pass's findings (D1-D6, O12, O13) are the same failure: **a file whose job is to audit
another file goes stale the moment its recommendations are applied, and nothing retires it.** Three
such files exist in the body set and all three carry the error. A one-line convention would end the
class: **an audit file opens with a dated `APPLIED:` / `OUTSTANDING:` line, and applying a
recommendation means moving it across that line in the same commit.** That is cheaper than any
extractor and it is the only one of my findings that prevents rather than fixes.
