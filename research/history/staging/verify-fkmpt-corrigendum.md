# The FKMPT corrigendum: read, and the corpus already had it right

<!-- ledger
id: Q-fkmpt-corrigendum
status: ANSWERED
todo: none
question: Does the 2023 FKMPT corrigendum change anything the corpus depends on?
verdict: Clean bill of health: the corrigendum changes four numerical constants and the parameter M, every one already carried at its corrected value here; the loudest finding is the opposite of the expected one, since the premise that nothing in this repository has read it is false and has been since 2026-08-18.
-->

*Attack C of 5, wave of 2026-08-19. Custody: every quotation below is read from a
rendered page image at 180–220 dpi, never from `pdftotext`. `pdftotext` was used
only to find which page to render.*

---

## Headline

**Clean bill of health, and the provisional marker comes off.** The 2023
corrigendum changes four numerical constants and the parameter `M`; every one of
them is already carried at its corrected value in this corpus. **No corpus claim
depends on anything the corrigendum changed in a way that is now wrong.**

**But the loudest finding is the opposite of the one the task expected.** The
premise at the top of `TODO.md`, repeated in `PRIOR-ART.md` and `G2-STATE.md` —
*"nothing in this repository has read it, every FKMPT quotation here predates
it"* — **is FALSE, and has been false since 2026-08-18.**
`research/covering-dive.md` §2.3 and `research/two-class-lower-bounds.md` §2a
both quote the corrigendum's own Appendix A, both print the corrected `6`, and
`research/history/staging/lit-pdf-fkmpt.md` records pulling the standalone JEMS
corrigendum PDF from `ems.press` and enumerates all seven leading items. The
alarm is stale by one day. It should be retired, not acted on.

**And one live regression must NOT be applied.**
`research/history/staging/attack-bonferroni-degree.md` proposes correcting
"Remark 7" to "Remark 4". **That correction is wrong for the version this corpus
cites** and would inject the exact defect it claims to remove. Both numbers are
right, for different artifacts — see §3.

---

## 1. Acquisition and hashes

All fetched 2026-08-19. SHA-256 over the bytes as retrieved.

| artifact | source | SHA-256 | pages |
|---|---|---|---|
| corrigendum-incorporated full paper | `ford126.web.illinois.edu/wwwpapers/gaps_sievedsets_Corrigendum.pdf` | `a8323d9a9b481efbf6f3cb64144279767b90b585aff42986b917a100f09ea72e` | 34 |
| arXiv **v4** (corrected) | `arxiv.org/pdf/1802.07604v4`, created 2022-09-20 | `f654a1bc16cffabe38e73e09bb5e79e77465be884090f2b948ab20a707528b58` | 34 |
| arXiv **v3** (pre-corrigendum) | `arxiv.org/pdf/1802.07604v3` | `6a0af5550b69d01739893f8ac2d1d6cd5b846b16a3cdfb552c63ab1361a2ce93` | 32 |
| Dartmouth preprint | `math.dartmouth.edu/~carlp/longgaps.pdf`, created 2018-02-20 | `c5d8df94544bbe0ce34fe9b4fef1549082acec194ec8822f88d228608b6f04f5` | 26 |
| BBMST *Erdős covering systems* | `arxiv.org/pdf/2211.01417` | `75559aa895b12761c48d362c0b7644b50f01d0f1491ea150a49f610fe8be3b69` | 8 |
| Hough, *Solution of the minimum modulus problem* | `arxiv.org/pdf/1307.0874` | `9c7c3b7ba40fb9541c831bc293400baa7bd9040d0e09efbc9527caf7798318c4` | 18 |

Bibliographic record, from the publisher page `ems.press/journals/jems/articles/10539594`:
**Ford, Konyagin, Maynard, Pomerance, Tao, "Corrigendum: Long gaps in sieved
sets", J. Eur. Math. Soc. 25 (2023), no. 6, 2483–2485, DOI 10.4171/JEMS/1305,
published 5 May 2023, CC-BY-4.0.** MathSciNet MR4592874. **[VERIFIED]**

**One acquisition failure, stated plainly.** The standalone 3-page JEMS
corrigendum PDF and the JEMS journal PDF of record were **not** retrievable this
session — `ems.press/content/serial-article-files/...` returned empty, MathSciNet
returned 403. The corrigendum text below is therefore read from **Appendix A of
the corrigendum-incorporated PDF**, which is the authors' own enumeration of the
same corrections. `lit-pdf-fkmpt.md` records a successful `ems.press` pull on
2026-08-18; its journal page numbers (Remark 7 at p. 674, §1.1 at p. 673) are
**[UNVERIFIED here]** and rest on that earlier session, not on this one.

---

## 2. What the corrigendum changes

**Verbatim, corrigendum-incorporated PDF p. 32, "Appendix A. Corrigendum: changes
made from the published version"** (image `v4-32.png`):

> "This document incorporates a number of corrections to the published version of
> the paper, JEMS **23** (2021), 667–700. The authors are grateful to Mikhail
> Gabdullin for pointing these out to us.
>
> The only error which affect the results of the paper are are [sic] errors in
> the exponents of `H` in the deduction of Theorem 2 from Theorem 3. When
> corrected, these force the parameter `M` to be somewhat larger than claimed,
> namely `M > 6`. This affects the numerical estimates for the exponents of
> `log log x` in Theorem 1 and corollaries."

Twenty-two numbered items follow. The four that carry numbers a reader could
import, verbatim from the same image:

| item | page (published) | correction |
|---|---|---|
| (1) | p. 669 | Theorem 1, definition of `C(ρ)`: **the factor `4 + δ` corrected to `6`**. Corrected lower bound **`C(ρ) > e^{−1−6/ρ}`**. Corrected asymptotic **`C(ρ) ∼ ½ e^{−6/ρ}` as `ρ → 0⁺`** |
| (2) | p. 669 | Example 1: **`C(1) > 1/835`** |
| (3) | p. 670 | Corollary 1: **`C(1/d) > e^{−(6d+1)}`** |
| (4) | p. 671 | (1.7) and Corollary 2: **`C(1/2) > 1/325565`** |

Items (5)–(7) fix `M`: "slightly larger than 6", `6 < M ⩽ 7`, `ε` satisfying
`M < 6 + 6ε`. Items (8)–(22) are proof-internal (missing factors of `K`, `⌊KH⌋`
for `KH`, summation ranges, a `q₁ = q₂` case in Theorem 3 (iii)) and change no
statement a citer would quote. **[VERIFIED from image]**

**The corrected Theorem 1, verbatim from p. 2 of the corrected PDF** (image
`v4thm-02.png`):

> **Theorem 1** (Main theorem). *Let `I` be a non-degenerate, `B`-bounded,
> one-dimensional, `ρ`-supported sieving system with `ρ > 0`. Define*
> `C(ρ) := sup{ δ ∈ (0, 1/2) : 6·10^{2δ} / log(1/(2δ)) < ρ }`.
> *The sifted set `Sₓ` contains a gap of length at least `x(log x)^{C(ρ)−o(1)}`,
> where the rate of decay of the `o(1)` bound depends on `I`. Moreover,
> `C(ρ) > e^{−1−6/ρ}`.*

**Version discrimination [VERIFIED].** v3 prints `(4 + δ)·10^{2δ}`,
`C(ρ) > e^{−1−4/ρ}` and `1/6001`; v4 prints `6·10^{2δ}`, `e^{−1−6/ρ}` and
`1/325565`. v3 has no Appendix A. **Anything numbered 4 from this theorem is the
retracted value.** The corpus already says exactly this.

**Load-bearing for this corpus? NO.** The one number imported is `C(1/2)`, at
`research/two-class-lower-bounds.md` §2a and `research/attack-lower-bound.js:563`
— and both already carry **1/325565**, the corrected value. `C(1/2) > 0` is all
the qualitative argument needs, and that holds in every version. Remark 7, the
sentence the sift-limit work actually leans on, is **untouched by the
corrigendum**: no item mentions it, and its text is identical in v3 and v4.

---

## 3. The remark number: it is **Remark 7**, and the proposed correction to
**Remark 4** is REFUTED for the cited version

**Verbatim from the corrected PDF, page 7** (image `v4rem-07.png`):

> *Remark* 7. Unfortunately our methods only seem to give good results in the
> one-dimensional case. Consider for instance the set `{n ∈ P : n + 2 ∈ P}` of
> (the lower) twin primes. This corresponds to a two-dimensional system in which
> `I_p = {0 (mod p), 2 (mod p)}` for all primes `p`. The "trivial" bound coming
> from these methods would give a bound of `≫ log X log log X` for the largest
> gap between lower twin primes up to `X` (or between the largest such twin prime
> and `X`), and one could possibly hope to improve this bound by a small power of
> `log log X` using a variant of the methods in this paper. However, a sieve
> upper bound (e.g., [7, Cor. 2.4.1]) combined with the pigeonhole principle
> already gives a bound of `≫ log² X` in this case.

**Verbatim from the Dartmouth preprint, page 5** (image `dart-05.png`):

> *Remark* 4. Unfortunately our methods only seem to give good results in the
> one-dimensional case. … `I_p = {0 (mod p), 2 (mod p)}` … would give a bound of
> `≫ log X log₂ X` … and one could possibly hope to improve this bound by a small
> power of `log₂ X`; however, a sieve upper bound (e.g., [9, Cor. 2.4.1])
> combined with the pigeonhole principle already gives a bound of `≫ log² X` in
> this case.

**Verdict.** Both numbers are correct, for different artifacts. **Remark 7** in
the published JEMS text and in arXiv v3/v4 — which is what every corpus citation
names. **Remark 4** in the Feb-2018 Dartmouth preprint, where the bibliography
marker is also different (`[9]`, not `[7]`), the trivial bound is written `log₂`,
and the closing clause omits "using a variant of the methods in this paper".
**Remark 4 in the corrected text is a different remark entirely** — it says the
conclusion of Theorem 1 is equivalent to the existence, for any `δ < C(ρ)`, of
some gap of a given length. **[VERIFIED from images, both artifacts]**

**Does it say what we say it says? YES.** `PRIOR-ART.md:308-310` renders it as "a
two-dimensional variant beating the trivial twin-gap bound by a small power of
log log is plausible but open". That is a fair reading of "one could possibly
hope to improve this bound by a small power of `log log X` using a variant of the
methods in this paper". The two long verbatim blocks on disk
(`covering-dive.md` §2.3, `two-class-lower-bounds.md` §2a) are **exact against my
page image**, with the single elision `…` correctly marking the dropped
parenthetical "(or between the largest such twin prime and `X`)". `[7 =
Halberstam–Richert]` is marked as an editorial expansion, as it should be.
**[VERIFIED]**

**One nuance nobody has recorded.** FKMPT write `I_p = {0, 2 (mod p)}`; this
corpus paraphrases it as `I_p = {0, −2}` (e.g. `covering-dive.md:132`). For the
*lower* twin primes `n` with `n + 2` prime, sieving out `n ≡ 0` and `n ≡ −2` is
the mathematically right pair, so the corpus paraphrase is correct and the
source's `{0, 2}` is a harmless sign slip on FKMPT's part. The corpus is safe
because it never presents `{0, −2}` inside the verbatim block. Leave as is; do
not "fix" the quotation to match the paraphrase.

---

## 4. "Hough's Lemma 3.2" is BBMST Lemma 3.2 — CONFIRMED, plus a second defect

**Verbatim, BBMST arXiv:2211.01417, page 4** (image `bb-4.png`):

> **Lemma 3.2.** *Let `A` be a collection of hyperplanes in `Q = S₁ × ⋯ × Sₙ`. If*
> `(1/(4δ(1−δ))) Σ_{k=1}^{n} E_{k−1}[α_k(x)²] < 1`, (3) *then `A` does not cover `Q`.*

That is character-for-character the statement `attack-DP1-mechanism.md:289` §7
attributes to Hough. **The misattribution is VERIFIED.** The paper is Balister,
Bollobás, Morris, Sahasrabudhe and Tiba, **"Erdős covering systems"**, arXiv
v1 2 Nov 2022 — an expository note on the distortion method (title page image
`bbtitle-1.png`). Hough's own paper numbers its lemmas 2, 4, 5 and 7 and uses
bias statistics `β_k(i)`; it contains no "Lemma 3.2". **[VERIFIED]**

**Second defect, not previously flagged.** `attack-DP1-mechanism.md:289` also
gives Hough as *"The least modulus of a covering system with distinct moduli",
Ann. of Math. **183 (2016)***. **Both the title and the volume are wrong.** It is
Bob Hough, **"Solution of the minimum modulus problem for covering systems",
Ann. of Math. (2) **181** (2015), no. 1, 361–382** — which is what
`covering-dive.md:98` already has right. BBMST's own §1 states the result as
Theorem 1.1 (Hough, 2015). **[VERIFIED]**

The mathematical caveat that file records is also right and should survive the
correction: BBMST's `α_k(x)` is the fraction of a single fibre covered in one
round, a one-point quantity, and their hyperplanes carry one residue class per
modulus, so the lemma is the right logical shape and the wrong input for a
two-class system.

---

## 5. Every FKMPT citation in the corpus, one row per site

Verdict key: **OK** = says what the source says, post-corrigendum. **STALE** =
true statement about the world that is no longer true about this repo.
**WRONG** = must be corrected.

| # | site | what the corpus claims | verdict |
|---|---|---|---|
| 1 | `covering-dive.md:73-86` §2.3 | Theorem 1 hypotheses; `C(ρ)` with the **6**; `C(ρ) > e^{−1−6/ρ}`; Appendix A item (1) quoted; items (2)–(7) enumerated; Remark 7 verbatim; `[7]` = Halberstam–Richert; Dartmouth = Remark 4 warning | **OK.** Exact against my images, including the Appendix A quotation and all four constants. The best FKMPT entry in the corpus |
| 2 | `covering-dive.md:126` | one-dimensional systems get gaps `≥ x(log x)^{C(ρ)−o(1)}` | **OK** |
| 3 | `covering-dive.md:130` | authors state the 2-D variant gains at best "a small power of log log" over trivial; pigeonhole/Brun `≫ log²X` is "the current best" | **OK on the quotation.** Minor: FKMPT say the sieve+pigeonhole bound "already gives" `≫ log²X`, they never call it "the current best". Non-load-bearing wording |
| 4 | `covering-dive.md:132` | `I_p = {0, −2}` is the sifting picture, Remark 7 | **OK** — paraphrase, correctly outside the verbatim block; see §3 nuance |
| 5 | `covering-dive.md:170` | "only seem to give good results in the one-dimensional case" (Remark 7, verbatim); can't beat pigeonhole `log²X` for twins | **OK**, verbatim confirmed |
| 6 | `covering-dive.md:178` | Remark 7 states beating trivial "by a small power of log log" is plausible-but-open | **OK** |
| 7 | `two-class-lower-bounds.md:93` | row 1: exact hypotheses PROVEN; source arXiv v4 + JEMS 23 + Corrigendum JEMS 25 | **OK** |
| 8 | `two-class-lower-bounds.md` §2a | Definition 1 bullets verbatim with a custody note; `C(ρ) > e^{−1−6/ρ}`; **`C(1/2) > 1/325565`**; v3 gave 1/6001; Remark 8 in v2, Remark 7 from v3 on; Remark 7 verbatim | **OK.** Every constant matches my images; the v2/v3/v4 discrimination matches my v3 nav check. Page numbers (p. 674, p. 673) **[UNVERIFIED here]** — journal PDF unretrievable this session |
| 9 | `attack-lower-bound.js:563, 928, 1093` | `C(1/2)` order `1/325565` | **OK**, corrected value |
| 10 | `natal-cap-10-sieve-cap.md:74-76` | the `≪` interval bound is what FKMPT cite as "[Halberstam–Richert, Cor. 2.4.1]" in Remark 7 | **OK** |
| 11 | `natal-cap-10-sieve-cap.md:251-266` | `[7]` = HR *Sieve Methods* in two bibliographies; Remark 7 vs Dartmouth Remark 4; Cor. 2.4.1 is not the explicit-constant source | **OK.** This file already had the Remark 4 answer |
| 12 | `sift-limit-attack.md:237-243` §4.4 | Remark 7 states the one-dimensionality restriction and the pigeonhole `log²X` fallback; cites Corrigendum JEMS 25 + arXiv v4 | **OK** |
| 13 | `sift-limit-attack.md:944` | "FKMPT Remark 7 there too, §2.3" | **OK** |
| 14 | `paper/moire-primes.md:532` | "FKMPT's Remark 7 expressly fences their machinery to dimension one" | **OK** |
| 15 | `paper/moire-primes.md:773` | bibliography: JEMS 23 (2021); corrigendum ibid. 25 (2023), 2483–2485, "the corrigendum's constant 6 is the one to use" | **OK**, and it is the model entry |
| 16 | `paper/beta2-note.md:185-189, 372` | cites JEMS 23 (2021) Remark 7 + corrigendum 25 (2023) 2483–2485 for two-dimensionality | **OK** |
| 17 | `PRIOR-ART.md:29` | FKMPT "needs ~1 class per prime on average — does not cover 2 per prime" | **OK.** Remark 1's `ρ ≥ 1/B` and Remark 7 both support it |
| 18 | `PRIOR-ART.md:303-311` | **"this corpus has never cited it… every FKMPT quotation predates it… treat as provisional"** | **STALE — correct in §6** |
| 19 | `G2-STATE.md:64-66` | **"nothing in this corpus has read [the corrigendum]… treat them as provisional"** | **STALE — correct in §6** |
| 20 | `TODO.md` item 1 | **"Nothing here has read it… our 'Remark 7' may be Remark 4"** | **STALE + the Remark 4 half is WRONG — correct in §6** |
| 21 | `history/CHANGELOG.md:137-140, 456-458` | same two claims, as history | **Leave.** History records what was believed then; §6 adds the resolving entry |
| 22 | `attack-bonferroni-degree.md:437-445` | **"The remark our object appears in is Remark 4, not Remark 7"** | **WRONG — do not apply. See §3** |
| 23 | `attack-bonferroni-degree.md:431-436` | "Hough Lemma 3.2" is BBMST arXiv:2211.01417 Lemma 3.2 | **OK, CONFIRMED at source (§4)** |
| 24 | `attack-DP1-mechanism.md:289-296` §7 | Lemma 3.2 attributed to Hough, *Ann. of Math. 183 (2016)*, under a wrong title | **WRONG on all three — correct in §6** |
| 25 | `qc.js:107`, `qc/checks.js:735`, `PRIOR-ART.md:83`, `lit-provenance.js:10` | "the FKMPT constant, retracted at source" as a provenance cautionary tale | **OK.** The retraction is real: `4 → 6` |

Not FKMPT and out of scope, listed so nobody re-greps them: `oeis-G2-submission.md:69-137`, `maxgap-law.md:48, 360`, `ZONE-POSTULATE.md:98, 444`, `wall-note.md:131` and `paper/moire-primes.md:772` all cite **FGKMT**, *Long gaps between primes*, JAMS 31 (2018) — a different paper with a different author list (Green, not Pomerance). All read correctly.

---

## 6. Exact corrections to draft

**C-1. `research/PRIOR-ART.md:303-311`** — replace the whole bullet with:

> - **FKMPT's 2023 corrigendum has been read, and every quotation survived it.**
>   `Corrigendum: Long gaps in sieved sets`, **J. Eur. Math. Soc. 25 (2023),
>   no. 6, 2483–2485, DOI 10.4171/JEMS/1305, MR4592874**. It corrects the factor
>   `4 + δ` to `6` in `C(ρ)`, hence `C(ρ) > e^{−1−6/ρ}`, `C(1) > 1/835`,
>   `C(1/d) > e^{−(6d+1)}` and `C(1/2) > 1/325565`, and forces `6 < M ⩽ 7`; the
>   rest is proof-internal. **Remark 7 is untouched by it** and its text is
>   identical in arXiv v3 and v4. Verified against rendered page images
>   2026-08-19, `history/staging/verify-fkmpt-corrigendum.md`. The corpus already
>   carried every corrected constant; the **provisional marker on FKMPT
>   quotations is retired**. Anything numbered `4` from this theorem is the
>   retracted value.

**C-2. `research/G2-STATE.md:64-66`** — replace with:

> **The FKMPT citation risk is closed.** The 2023 corrigendum (MR4592874) was
> read against page images on 2026-08-19; it changes four constants, all of which
> this corpus already carried at their corrected values, and it leaves Remark 7
> untouched. The provisional marker is retired.
> `history/staging/verify-fkmpt-corrigendum.md`.

**C-3. `TODO.md` item 1** — **delete the item entirely** (the charter says an
attempted item leaves the file). Its Remark 4 clause is refuted; do not carry it
into any successor item.

**C-4. `TODO.md` item 6** — narrow to the half that is real: the Hough/BBMST
misattribution is confirmed; the FKMPT half is closed and should be struck.

**C-5. `research/history/staging/attack-DP1-mechanism.md:289-291`** — the source
line becomes:

> - **Balister, Bollobás, Morris, Sahasrabudhe and Tiba, "Erdős covering
>   systems", arXiv:2211.01417, Lemma 3.2 (p. 4)** (owning convention: Erdős
>   covering systems, the distortion method). *(This bullet formerly attributed
>   the lemma to Hough, "The least modulus of a covering system with distinct
>   moduli", Ann. of Math. 183 (2016) — wrong on attribution, title and volume at
>   once. Hough's paper is "Solution of the minimum modulus problem for covering
>   systems", Ann. of Math. (2) **181** (2015), 361–382, and it numbers its lemmas
>   2, 4, 5, 7 with bias statistics `β_k(i)`; it has no Lemma 3.2.)*

**C-6. `research/history/staging/attack-bonferroni-degree.md:437-445`** — strike
the "Remark 4, not Remark 7" correction and replace with:

> - **FKMPT's twin remark is Remark 7 in every text this corpus cites, and the
>   "Remark 4" reading is an artifact of the Dartmouth preprint.** Published JEMS
>   23 (2021) and arXiv v3/v4: **Remark 7**, bibliography marker `[7]`, trivial
>   bound written `log log X`. Dartmouth `longgaps.pdf` (Feb 2018): the identical
>   passage is **Remark 4**, marker `[9]`, bound written `log₂ X`. Remark 4 in the
>   published text is about the equivalence of Theorem 1's conclusion and says
>   nothing about twins. Verified from page images, 2026-08-19.

**C-7. `research/covering-dive.md:130`** — optional, one clause: "and note the
pigeonhole/Brun bound `≫ log²X`… **as the current best**" attributes to FKMPT a
ranking they do not make. Their word is "already gives". Rewrite as "…and note
that a sieve upper bound plus pigeonhole *already* gives `≫ log²X` for gaps
between twin primes, which is why they do not pursue the two-dimensional
variant."

**C-8. `research/history/CHANGELOG.md`** — add the resolving entry recording that
the corrigendum premise was already satisfied by the 2026-08-18 pass, that the
Remark 4 proposal was refuted at source, and that the Hough attribution carried
three defects rather than one.

---

## 7. Method notes for the next agent

- **`pdftotext` is safe for navigation and unsafe for quotation, and this session
  is a clean demonstration of both.** It found "Remark 7" on page 7 in seconds;
  the page image is what proved that FKMPT write `{0, 2 (mod p)}` where this
  corpus paraphrases `{0, −2}`, a difference no line-oriented extraction would
  have made visible as a *notation* question rather than a transcription error.
- **The trap that caught the previous attack is real and cheap to fall into.**
  Searching "FKMPT long gaps" surfaces the Dartmouth preprint as readily as the
  arXiv record, and its remark numbering is off by three. Any future FKMPT check
  must name the artifact before it names the remark.
- **Ford's `gaps_sievedsets_Corrigendum.pdf` is the single most useful artifact
  here**: 34 pages, the fully corrected body *plus* Appendix A enumerating all 22
  corrections against published page numbers. It is freely retrievable, which the
  JEMS PDFs were not this session.
