# Lane W (second dispatch, 2026-09-08): custody of Halberstam and Richert 1974, Theorem 2.2

Worker report. Starting commit `1285d47`, tree clean. Read-only on the
repository; no file under `research/` or `paper/` edited. Active work about
20 minutes wall between 15:26 and 15:34 UTC on 2026-09-08. No compute.

    Lane / stable question id: W / Q-two-class-theorem2c-source-review (no new note; source custody only)
    Starting commit / report commit or shared-checkout paths: 1285d47 / this file only, under scratchpad/round-0908b/W/
    Disposition / exact claim / unproved hypotheses: UNREAD at the page. Theorem 2.2 reached only at OCR (Dover reprint search-inside index, tertiary custody) and at two same-author secondaries already in the record (Richert 1976 Thm 11.3, Mémoire 1971 Thm 3, both page image). Every hypothesis of the substitution discharges against the OCR-read statement; none fails. The 1974 page image is the owed item.
    Changed step compared with the reviewed baseline: none in the mathematics. Eleven access channels tried this pass (all logged below); the OCR of p. 68 now covers both clauses, the constant footnote and the full Remark; the "B3 / B / B5" label discrepancy between reports 08 and 10 is explained (three different OCR tokens on one page, one per clause and one in the footnote).
    Source theorem and first unmatched hypothesis, if any: Halberstam and Richert, Sieve Methods (Academic Press 1974, LMS Monographs 4, ISBN 0-12-318250-6; Dover reprint 2011, ISBN 978-0-486-47939-2), Theorem 2.2, Chapter 2 §5, pp. 68 to 69. No unmatched hypothesis at OCR level. Unverified: the printed page itself.
    Validation command, falsifier, result and compute used: none run; falsifier is the printed page differing from the OCR reconstruction; compute zero.
    Independent reviewer / disposition (PENDING until actually reviewed): PENDING (handler, lane V).
    Full-consumer payoff and unpaid complement: none; this lane is outside the twin target (residue-only) and establishes no twin estimate.
    Proposed shared-record changes / next bounded obligation: section 7 below (manuscript §11.2, §11.4, §12 reference entry; SEARCH-CONVENTIONS row; OUTCOMES limit line; optional report-11 wording). Next obligation: a reader with the physical book or a library scan quotes pp. 68 to 69 at page image.

## 1. Question, disposition, what remains open

Question (board section 6): locate the actual 1974 theorem page behind
Kalmynin and Konyagin's Lemma 1 (their citation "[5, Theorem 2.2]"), verify
its hypotheses and constants against the substitution as
`paper/kk-lower-bound.md` uses it, and record edition, page, a recoverable
locator and exactly what was read.

**Disposition: UNREAD at the page.** No page image, publisher text, library
scan or verbatim secondary with page citation was reached. What was reached,
and at what custody:

| custody level | artifact | what it gives |
|---|---|---|
| tertiary, OCR | Google Books search-inside index of the Dover reprint (volume ids `keKvAAAAQBAJ` and `sU_fhcpaL-IC`, identical snippets) | sentence-level OCR of pp. 29, 52, 68, 69 and the cross-references at pp. 71, 75, 77, 82, 83, 130, 133, 153, 156; the statement of Theorem 2.2, its footnote, its Remark and the opening of its proof |
| secondary, page image (prior passes) | Richert, Tata lectures 1976, Theorem 11.3 and chapter note; Halberstam and Richert, Mém. SMF 25 (1971), Theorem 3 | the same two-clause Brun-form bound under (Ω)/(Ω_2(κ)), (Ω_1), (R); not re-read here |
| primary, page image | Halberstam and Richert 1974 pp. 68 to 69 | **not reached** |

What remains open on this item: exactly the printed page. Nothing else in
Theorem 2c's chain is now consumed without a source read, per report 11
section 7, and that statement is unchanged by this pass.

This lane establishes no twin-prime estimate and does not change the
DERIVED-not-refereed status of Theorem B / Theorem 2c. No hypothesis of the
substitution fails against the statement as reached, so no downgrade is
proposed; no upgrade is proposed either, because OCR is not reading.

## 2. The theorem as reached (OCR reconstruction, with every uncertain token marked)

Source of every line below: the Dover reprint's search-inside OCR, fetched by
me on 2026-09-08 from `https://books.google.dk/books?id=keKvAAAAQBAJ&q=<query>&output=json`
(the JSON is now embedded inside an HTML wrapper; the `search_results` block
was extracted by regex). Page numbers are the Dover reprint's, which the
publisher describes as an unabridged republication of the 1974 text; the
identity of the pagination with the 1974 printing is asserted by the
publisher, not verified by me.

Chapter 2 "The combinatorial sieve", §5 "A general upper bound O-result",
p. 68:

    THEOREM 2.2. (Ω_1), (Ω_2(κ)), (R): For any† A (> 0),
        S(A; P, z) ≤ B X ∏_{p<z} (1 − ω(p)/p)    if z ≤ X^A,        (5.1)
        S(A; P, z) ≤ B X ∏_{p<X} (1 − ω(p)/p)    if z ≥ X^{1/A}.    (5.2)
    † B = B(A, A_1, A_2, κ).
    Remark. By virtue of Lemma 2.2, condition (Ω_2(κ)) may be replaced by
    (Ω). This facilitates the use of Theorem 2.2 for many applications.
    Proof. We begin with the trivial estimate, provided by (1.4.14), namely
    S(A; P, z) ≤ |A| ≤ X + |R_1| ≤ X + 1; here we have used condition (R)
    and the fact that ω(1) = 1. If X < 2^A this estimate implies both (5.1)
    and (5.2). We may suppose ...

p. 69 (fragments): "... (5.3) ... Theorem 2.2 is an easy consequence of
(5.3). We may now assume in both (5.1) and (5.2) that z ≥ X^{1/A} ... if
z ≤ X^A, and this proves (5.1). Finally, since W(X^{1/A}) ≤ W(X) for A ≥ 1,
(5.2) follows at once ..."; the section heading "6. Sifting by a thin set of
primes" follows.

Uncertain OCR tokens, verbatim as served: the constant label reads
`B3` in the (5.1) snippet, `B1` in the (5.2) snippet and `B5 = B5(A, A1,
A2, к)` in the footnote (Cyrillic к for κ); the exponents read `X ^`, `zx14`
and `X1 / 4` for X^A, z ≥ X^{1/A} and X^{1/A}; the trivial estimate reads
`S(A;P,z) < \\ X + |R1| X + 1`; the threshold reads `X < 24`. The
reconstruction above takes one label B for both clauses because the footnote
names one function of (A, A_1, A_2, κ); whether the book prints B_3, B_5 or a
subscript-free B in (5.1) and (5.2) is not decidable from the index. This
resolves the "B3 versus B" disagreement between reports 08 and 10: the two
reports quoted different snippets of the same page. The subscripts are
immaterial to the consumer, which uses only that the constant depends on
(A, A_1, A_2, κ).

The conditions as the book defines them, OCR of the same index:

- (Ω_1), p. 29: "0 ≤ ω(p)/p ≤ 1 − 1/A_1 for some suitable constant A_1 ≥ 1.
  In most cases this will be used in the form 1 ≤ 1/(1 − ω(p)/p) ≤ A_1."
  (fetched here)
- (Ω_2(κ)), p. 52: "Σ_{w≤p<z} ω(p) log p / p ≤ κ log(z/w) + A_2 if 2 ≤ w ≤ z",
  with A_2 ≥ 1. (fetched here)
- (Ω), p. 29 per report 08's OCR: ω(p) ≤ A_0. (not re-fetched here; the
  Remark on p. 68, fetched here, names it as the admissible replacement)
- (R), p. 30 per report 08's OCR: |R_d| ≤ ω(d) if μ(d) ≠ 0, (d, P̄) = 1. (my
  query for this line returned no snippet; taken from report 08)
- Framework, Chapter 1 as recalled and not re-read: A a finite sequence of
  integers, P a set of primes, P(z) = ∏_{p<z, p∈P} p, S(A;P,z) = #{a ∈ A :
  (a, P(z)) = 1}, |A_d| = (ω(d)/d) X + R_d for squarefree d composed of primes
  of P, ω(p) = 0 for p ∉ P, W(z) = ∏_{p<z}(1 − ω(p)/p). Marked [MEMORY].

Kalmynin and Konyagin's Lemma 1 as printed (TeX, report 10 §3.1, verbatim):
κ > 0, z ≥ 2, a_n ≥ 0, Σ_{n≡0 (d)} a_n = g(d) X/d + r_d for all d | P(z), g
multiplicative with g(p) ≤ κ and g(p) < p, |r_d| ≤ g(d), z ≪ X; conclusion
S(a, z) = Σ_{(n,P(z))=1} a_n ≪_κ X V(z), V(z) = ∏_{p≤z}(1 − g(p)/p). Proof:
"This is a version of the fundamental lemma of sieve theory. See, for
example, [5, Theorem 2.2]."

## 3. Prior work and the hypothesis matrix

Local prior work read: report 08 (access attempts and OCR statement), report
10 §2, §3.3 and §11 (four-route identification, Dover index re-fetched,
next move "a reader with the physical 1974 book quotes p. 68"), report 11
§0, §1, row 17, F8(i), §7 (Theorem 2.2 the one remaining unread input),
`research/research-round-validation.md` §5, `paper/kk-lower-bound.md` §11.1,
§11.2, §11.4, §12, `paper/two-class-jacobsthal.md` line 274,
`research/PRIOR-ART.md` (Corollary 2.4.1 UNREACHABLE after fourteen routes),
`research/SEARCH-CONVENTIONS.md` §1. The Dusart and Hildebrand–Tenenbaum
checks were not restarted.

Substitution as the manuscript uses it: Corollary 1 of Kalmynin and Konyagin
with Ω_p ⊂ Z/pZ, g(p) = |Ω_p|, a_n = 1_{n≤X}; Theorem B at κ = 4, z = √y,
X = m; Theorem A at κ = 2, z = √m, X = m. Discharge of Lemma 1's hypotheses
was re-derived in report 10 §3.2 and report 11 rows 5 to 8 and is not
repeated. The matrix below is the new step: Lemma 1's hypotheses against
Theorem 2.2's, as OCR-read, for the counting instance the manuscript consumes.

| H–R hypothesis (OCR) | supplied by | discharged for Theorem B (κ = 4) | note |
|---|---|---|---|
| framework: A finite sequence of integers, P a set of primes, |A_d| = ω(d)X/d + R_d | A = the integers n ≤ X, P = primes ≤ z, ω(p) = g(p) = |Ω_p|, with the CRT encoding of Corollary 1's proof turning "n mod p ∈ Ω_p for all p | d" into divisibility by d | yes; Corollary 1's a_n is an indicator, so the weighted generality of Lemma 1 (real a_n ≥ 0) is not consumed | H–R's A_d is "elements of A divisible by d"; the encoding that maps class-avoidance to divisibility is the one with the representative slip and its repair (manuscript §11.2). The consumer uses Corollary 1's statement, so this row is discharged at the statement level either way |
| (Ω_1): ω(p)/p ≤ 1 − 1/A_1 | g(p) < p, g integer-valued, g(p) ≤ κ | yes, A_1 = 5: p = 2, 3 in band 1 give 1/2, 2/3; p ≥ 5 gives ≤ 4/5 | in general A_1 = κ + 1 from g(p) ≤ min(κ, p − 1) |
| (Ω_2(κ)) or, by the Remark, (Ω): ω(p) ≤ A_0 | g(p) ≤ κ | yes, A_0 = 4 | the Remark itself is OCR; Lemma 2.2 (the (Ω) ⇒ (Ω_2(κ)) passage, presumably with A_2 = A_2(A_0)) unread at any custody |
| (R): |R_d| ≤ ω(d), μ(d) ≠ 0, (d, P̄) = 1 | |r_d| ≤ g(d) for d | P(z) | yes; with P = primes ≤ z, "squarefree and composed of primes of P" is exactly d | P(z), and the CRT count gives |r_d| < g(d) (report 10 §3.2) | H–R's (R) ranges over all such d, not only those below a level; no support parameter, matching report 10 §3.3 |
| range: z ≤ X^A for some fixed A > 0 | z ≪ X | yes, A = 1: z = √y ≤ m at every y ≥ y_0 (ratio above 10^67/B, report 10) | H–R's P(z) uses p < z; Lemma 1's V(z) uses p ≤ z; the two products differ by a factor in [1/A_1, 1] and are absorbed in B |
| conclusion (5.1): S ≤ B(A, A_1, A_2, κ) X W(z) | Lemma 1's ≪_κ X V(z) | matches: with A = 1, A_1 = κ + 1, A_0 = κ, B depends on κ alone (and on A_2(κ) through Lemma 2.2) | clause (5.2) is not consumed |

No hypothesis fails. The one place where the identification leans on
something not seen at any custody is the Remark's "Lemma 2.2": Lemma 1 has
no (Ω_2(κ)) hypothesis, so the consumer needs the Remark (bounded ω(p)
suffices), and the Remark is OCR. The 1971 Mémoire Theorem 3 (page image,
report 10) states the same bound directly under (Ω) bounded, which covers
this independently of Lemma 2.2.

Novelty: none claimed; this is custody of a 1974 textbook theorem. A search
for a secondary reproducing Theorem 2.2 verbatim with page citation found
none (section 4).

## 4. The bounded attempt: channels tried, each with response and time (UTC, 2026-09-08)

| # | channel | request | response | outcome |
|---|---|---|---|---|
| 1 | Google Books API, volume records | `https://www.googleapis.com/books/v1/volumes/{keKvAAAAQBAJ, sU_fhcpaL-IC, pwXvAAAAMAAJ}` 15:26 | HTTP 200 with body `error.code 429`, "Quota exceeded ... Queries per day" for the unauthenticated consumer | no viewability data |
| 2 | Google Books page-image endpoint | `https://books.google.com/books/content?id=keKvAAAAQBAJ&pg=PA68&img=1&zoom=3&hl=en` and `pg=PA69`; same for `sU_fhcpaL-IC`; and `books.google.dk/books/publisher/content?id=keKvAAAAQBAJ&pg=PA68&img=1&zoom=3` 15:26 to 15:29 | HTTP 200, a 575×750 grayscale PNG of 9103 bytes, md5 `a64fa89d7ebc97075c1d363fc5fea71f` in all four cases; viewed: the text "image not available" | placeholder, not a page |
| 3 | Google Books page view via WebFetch | `books.google.com/books?id=keKvAAAAQBAJ&pg=PA68` → 302 → `books.google.dk/...&redir_esc=y` 15:27 | book metadata and purchase links; no page text, no preview label | no page |
| 4 | Google Books text mode | `books.google.dk/books?id=keKvAAAAQBAJ&pg=PA68&output=text` 15:29 | HTTP 403 "Sorry..." (bot interstitial) | no page |
| 5 | Google Books search-inside index | `books.google.dk/books?id=keKvAAAAQBAJ&q=...&output=json`, 16 queries 15:28 to 15:33; the JSON is embedded in an HTML wrapper (a change from the bare JSON of 2026-09-07) | HTTP 200; snippets for pp. 29, 52, 53, 54, 55, 68, 69, 71, 75, 77, 82, 83, 130, 133, 153, 156; the 1974 volume `pwXvAAAAMAAJ` returns no results block (no index) | OCR only; the reconstruction in section 2 |
| 6 | Internet Archive item `sievemethods0000halb` | metadata 15:26: `access-restricted-item: true`, collections `inlibrary, printdisabled`, files include `_djvu.txt`, `.pdf`, `_encrypted.pdf`; page image `download/.../page/n85_w1000.jpg` → 302 → `BookReaderImages.php` HTTP 403 "Item not available", md5 of the HTML `8553d84e8a48d8e103e7c50719df5eac`; `_djvu.txt` → 302 → HTTP 401 Authorization Required; the fulltext search endpoint did not resolve (curl exit, code 000) 15:27 | lending copy behind login and loan | not reachable without an archive.org account and a loan; a legitimate route Chris could take himself |
| 7 | Internet Archive search for a second scan | advancedsearch `title:"sieve methods"` and `creator:(halberstam)` 15:26 to 15:30 | only Richert's Tata lectures (already read), a 1997 proceedings volume, arXiv mirrors and unrelated Halberstams | no other scan |
| 8 | HathiTrust | catalog API `catalog.hathitrust.org/api/volumes/brief/isbn/0123182506.json`, catalog search, full-text search `babel.hathitrust.org/cgi/ls?...` 15:26 to 15:30 | HTTP 403 (Cloudflare) on all three, with a browser User-Agent | blocked from this host, as on 2026-09-07 |
| 9 | ScienceDirect (Academic Press backlist) | search page 15:26 | HTTP 403 | blocked; no evidence the 1974 LMS Monograph is digitised there |
| 10 | zbMATH Open | web 403; API `api.zbmath.org/v1/document/_search?search_string=ti:"sieve methods" au:halberstam` HTTP 200 15:27 | Zbl 0298.10026, review by Wolfgang Schwarz (German, 5020 characters); describes Chapter 2 as a new simpler presentation of Brun's method "worked out to generally applicable theorems", the fundamental lemma as a special case; does not state Theorem 2.2 | bibliographic confirmation only; md5 of the JSON `83097f5b1e402a0f51591fb75a75bfa7` |
| 11 | Montgomery's review, Bull. AMS 82 (1976) 846 to 853 | Project Euclid PDF `journalArticle/Download?urlId=bams%2F1183538334`, 817,487 bytes, md5 `ad97a927252bcaa38d4dca7d9662cfa2`, scanned with text layer 15:28 | a narrative of the combinatorial sieve with page ranges (pure Brun pp. 46 to 52, fundamental lemma pp. 82 to 89); no theorem of Chapter 2 stated; "2.2" absent from the text | not a verbatim secondary |
| 12 | secondaries that might reproduce the theorem | Ford, Sieve Methods lecture notes 2023 (`ford126.web.illinois.edu/sieve2023.pdf`, md5 `4c2f60a7632fe3279390f1772528839f`); Greaves, Sieves in Number Theory (Google Books `gxB87fHGteMC` search-inside); arXiv 2410.14133, 2503.04045, 2211.11012, 2606.17955, 1907.06393 (PDF md5s in the scratch directory) 15:27 to 15:30 | Ford states his own Theorem 3.6 (fundamental lemma) and never cites H–R Theorem 2.2; Greaves's index has no hit for "Halberstam" + "Theorem 2.2"; the five arXiv papers cite H–R Chapter 2, Theorem 3.1/3.2, 5.3, 9.1/9.2 or "Chapter 2" generically, none Theorem 2.2 | no verbatim secondary with page found |
| 13 | library holdings for a physical copy | OpenLibrary editions (works OL5909982W, OL16182641W, OL27997677W) HTTP 200; WorldCat `search.worldcat.org/search?q=isbn:0123182506` HTTP 200 (JavaScript shell, record id not extractable); bibliotek.dk search URL HTTP 404 15:30 to 15:32 | Academic Press 1974, L.M.S. Monographs 4, ISBN 0123182506, 364 pp.; Dover 2011, ISBN 0486479390 / 9780486479392, 384 pp.; Dover 2013 e-editions 9780486320809 and 9781306327312 | recoverable locators for the owed item |

Two web searches (15:26 and 15:30) for the exact phrases "Theorem 2.2 of
Halberstam and Richert", "[HR, Theorem 2.2]" and the condition names returned
the same Google Books, numdam, Toledo and arXiv pages already in the record.

Not tried, and why: pirate mirrors (not a legitimate source; a page image
from one would still need re-verification against a library copy);
authenticated archive.org borrowing (needs Chris's account; recorded as the
first legitimate route below); Perlego (subscription; chapter list only, per
PRIOR-ART); interlibrary loan (a human action).

## 5. Validation and falsifier

Nothing here is a computation. The falsifier for the OCR reconstruction is
the printed page: if p. 68 prints a hypothesis other than (Ω_1), (Ω_2(κ)),
(R), or a conclusion carrying a remainder sum or a level parameter, the
identification of Lemma 1 with Theorem 2.2 fails and the manuscript's §6.2
remark (Selberg form) becomes the consumed route again. That check has not
run. Three independent OCR fetches (report 08, report 10, this pass) agree on
the hypothesis list and both clauses; two same-author secondaries at page
image state the same bound; that is consistent with, and does not prove, the
reconstruction.

Finite checks: none.

## 6. Payoff for the twin consumer

None. Residue-only; the lane is outside the twin target and the board says
so. No probability, onset or effective constant is computed; the previously
quoted onset y_0 = 10^{134.1} remains a floor with constants set to 1, and
nothing in this pass certifies it (board section 6).

## 7. Files, and proposed record updates (verbatim; the handler integrates)

Files written: this report only,
`/private/tmp/claude-501/-Users-benjaminsen-Files-Git-primeoire/9058ffd0-271d-4adc-bdd5-dabb0916b242/scratchpad/round-0908b/W/W-report.md`.
Scratch artifacts in the same directory: `gb_PA68.png` (placeholder),
`gb_si_*.json`, `gb_q*.html`, `gb_other_*.html` (Google Books HTML with
embedded snippets), `ia_meta.json`, `ia_pg2.bin`, `ia_txt2.bin`,
`montgomery_review.pdf/.txt`, `ford_sieve2023.pdf/.txt`, `arxiv*.pdf/.txt`,
`zbapi.json`, `wc.html`, header files `*_hdr.txt`. Caches, not evidence.

**7.1 `paper/kk-lower-bound.md` §11.2, the paragraph "Source identification
2026-09-07".** Replace the sentence

`Halberstam and Richert's 1974 text remains UNREACHABLE (archive.org copy access-restricted).`

with

`Halberstam and Richert's 1974 text remains UNREACHABLE at the page: the archive.org copy (item sievemethods0000halb) is a lending copy behind login and loan (page image 403, text 401 on 2026-09-07 and 2026-09-08); Google Books serves an "image not available" placeholder for pp. 68 and 69 of the Dover reprint and no index for the 1974 volume; HathiTrust and ScienceDirect return 403; Montgomery's Bull. AMS review (1976), Schwarz's Zbl review, Ford's 2023 notes, Greaves's monograph and five arXiv papers citing the book do not reproduce Theorem 2.2 (thirteen channels, `scratchpad round-0908b/W/W-report.md` §4, to be filed under history/reviews-0907).`

and replace

`The printed page image of the 1974 book is still unread.`

with

`The printed page image of the 1974 book is still unread. The OCR now covers both clauses, the footnote $B = B(A, A_1, A_2, \kappa)$ and the full Remark ("By virtue of Lemma 2.2, condition $(\Omega_2(\kappa))$ may be replaced by $(\Omega)$"), and the three constant labels reported on 2026-09-07 and 2026-09-08 (B, B3, B5) are three OCR tokens of one page, one per clause and one in the footnote; which subscript the book prints is not decidable from the index and does not enter the consumer. Against the OCR-read hypotheses the substitution discharges with $A = 1$, $A_1 = \kappa + 1$, $A_0 = \kappa$ and $P$ the primes at most $z$, so that $(R)$ is exactly $|r_d| \le g(d)$ for $d \mid P(z)$; the only clause the consumer needs that is seen at no custody is Lemma 2.2 behind the Remark, which the 1971 Mémoire's Theorem 3 (page image) covers independently by stating the bound under bounded $\omega(p)$.`

**7.2 `paper/kk-lower-bound.md` §11.4, the Theorem 2.2 row.** Replace

`Richert Tata Theorem 11.3 read at page image 2026-09-08 ("cf. l.c. Theorem 2.2"); Mémoire 1971 Theorem 3 read at page image; the 1974 page unread; shared with Theorem A. §11.2`

with

`Richert Tata Theorem 11.3 read at page image 2026-09-08 ("cf. l.c. Theorem 2.2"); Mémoire 1971 Theorem 3 read at page image; Dover OCR of pp. 29, 52, 68, 69 (both clauses, footnote, Remark) re-fetched 2026-09-08 and the hypothesis matrix written; the 1974 page unread after thirteen channels; shared with Theorem A. §11.2`

**7.3 `paper/kk-lower-bound.md` §12, the reference entry.** Replace

`- H. Halberstam and H.-E. Richert, *Sieve Methods*, 1974, Theorem 2.2. [MEMORY]`

with

`- H. Halberstam and H.-E. Richert, *Sieve Methods*, London Mathematical Society Monographs 4, Academic Press, London and New York, 1974, ISBN 0-12-318250-6 (Dover reprint 2011, ISBN 978-0-486-47939-2, described by the publisher as unabridged), Theorem 2.2, Chapter 2 §5, pp. 68 to 69. [OCR ONLY: statement, footnote and Remark reached at the Dover search-inside index on 2026-09-07 and 2026-09-08; page image unread]`

and in the "Footnote on [MEMORY]" replace

`Three entries above are marked [MEMORY]: Rankin 1938, Pintz 1997, and Halberstam and Richert's *Sieve Methods* Theorem 2.2.`

with

`Two entries above are marked [MEMORY]: Rankin 1938 and Pintz 1997. Halberstam and Richert's *Sieve Methods* Theorem 2.2 is marked [OCR ONLY]: its bibliographic details are confirmed (OpenLibrary and Zbl 0298.10026) and its statement is reached at an OCR index, which is not a reading; the page image is the owed item (§11.2).`

**7.4 `paper/two-class-jacobsthal.md` line 274, the Theorem 2c row.** In the
"what would falsify" cell leave the text; in the last cell replace
`the 1974 page unread; a referee has not` with `the 1974 page unread after a second bounded access pass (2026-09-08, thirteen channels); a referee has not`.

**7.5 `research/SEARCH-CONVENTIONS.md` §3 (or the source-access table the
handler prefers), one row.**

`| Where can Halberstam and Richert, *Sieve Methods* (1974), be read at the page? | archive.org item `sievemethods0000halb` is a lending copy (login + loan; page image 403, djvu text 401 anonymously); Google Books Dover volumes `keKvAAAAQBAJ`/`sU_fhcpaL-IC` give a search-inside OCR index only (JSON now wrapped in HTML; page images return a 9103-byte "image not available" placeholder); the 1974 volume `pwXvAAAAMAAJ` has no index; HathiTrust, ScienceDirect and zbMATH web are 403 from this host (zbMATH API works: Zbl 0298.10026); no secondary reproduces Theorem 2.2 verbatim (Montgomery Bull. AMS 1976, Ford 2023 notes, Greaves, arXiv 2410.14133, 2503.04045, 2211.11012, 2606.17955, 1907.06393 checked). Physical: Academic Press 1974 ISBN 0123182506 (LMS Monographs 4, 364 pp.); Dover 2011 ISBN 9780486479392 (384 pp.) | 2026-09-07 (`history/reviews-0907/08`) and 2026-09-08 (Lane W second dispatch); OCR is not reading; the page remains the owed item |`

**7.6 `research/OUTCOMES.md`, the Theorem 2c source-review entry, Limits
line.** After `Halberstam and Richert Theorem 2.2, cited by the source's Lemma 1, is unread at the page (shared with Theorem A; Lane V).` add
`A second bounded access pass on 2026-09-08 (thirteen channels) reached no page image and no verbatim secondary; the OCR-read hypotheses (Ω_1), (Ω_2(κ)) or (Ω), (R) and both clauses are discharged by the substitution with A = 1, A_1 = κ + 1, A_0 = κ; the owed item is a page image of pp. 68 to 69 (Academic Press 1974 or Dover 2011), obtainable by an archive.org loan or a library copy.`

**7.7 `research/history/reviews-0907/11-two-class-theorem2c-source-review.md`
(history layer; the handler decides whether history files are touched).**
If edited: in the ledger verdict, after `unread at the page (Lane V)` add
`; second access pass 2026-09-08 also unread, OCR hypotheses discharged`. In
F8(i), replace `not checked at the page by anyone (Lane V; `reviews-0907/08`
reaches the Brun form through the Dover OCR index and the 1971 Mémoire).`
with `not checked at the page by anyone after two bounded access passes
(`reviews-0907/08`; Lane W second dispatch 2026-09-08 reaches both clauses,
the constant footnote and the Remark at the Dover OCR index and discharges the
OCR-read hypotheses; the 1971 Mémoire at page image states the same bound).`
Recommendation: leave report 11 unchanged and file this report as
`history/reviews-0907/12-halberstam-richert-second-access.md`, adding a
README row: `| 12-halberstam-richert-second-access.md | Lane W (2026-09-08, second dispatch) custody pass on H–R 1974 Theorem 2.2: thirteen channels, no page image, OCR of both clauses, footnote and Remark, hypothesis matrix against the substitution, recoverable locators | paper/kk-lower-bound.md §11.2, §11.4, §12; research/SEARCH-CONVENTIONS.md |`

**7.8 CHANGELOG entry (2026-09-08, Lane W second dispatch).**
`**Halberstam and Richert Theorem 2.2 custody (paper/kk-lower-bound.md §11.2, §11.4, §12).** The claim as it stood: the 1974 text UNREACHABLE (archive.org access-restricted), statement reached at OCR and two same-author secondaries, constant label uncertain between "B" and "B3". What replaced it: a second bounded pass over thirteen channels reached no page image and no verbatim secondary; the OCR now covers both clauses, the footnote B = B(A, A_1, A_2, κ) and the Remark replacing (Ω_2(κ)) by (Ω); the label discrepancy is three OCR tokens on one page; the substitution discharges every OCR-read hypothesis (A = 1, A_1 = κ + 1, A_0 = κ, P = primes ≤ z). Status of Theorem 2.2 in the manuscript changes from [MEMORY] to [OCR ONLY]; the page image remains the owed item. No number moves; Theorem 2c stays DERIVED, not refereed.`

## 8. Next move or reopening condition

One justified next move, a human action rather than an agent one: borrow the
archive.org lending copy (`archive.org/details/sievemethods0000halb`, collections
`inlibrary` and `printdisabled`; needs an account and a loan, terms not
checked here) or open a library copy (Academic Press
1974, ISBN 0123182506; Dover 2011, ISBN 9780486479392), photograph pp. 68 to
69, and check against section 2 of this report: the hypothesis list, the
absence of a remainder sum and of a level parameter in (5.1), the footnote,
and the Remark. That closes the "conditional on the 1974 page" qualifier on
Lane V's claim 1 for both Theorems A and B. Reopen the identification only if
the page differs from the reconstruction; reopen the access question only if
a new channel appears (a HathiTrust full view, a Dover preview change, or a
paper that quotes the theorem with page).

Footer: history in research/history/CHANGELOG.md.
