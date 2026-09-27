# Scourfield 2008, run down on ten channels: the chapter itself stays unread, its own author restates it in 2016, and the restatement does not reach the open step

<!-- ledger
id: Q-lit-scourfield-2008
status: ANSWERED
todo: 9
question: Does Scourfield, Smooth divisors of polynomials (LMS Lect. Note Ser. 352, CUP 2008, 286-311), supply the divisor-distribution estimate that varE-theta2-proof.md section 6 leaves open?
verdict: DOES NOT DELIVER, at SECOND-HAND rung, and the chapter is still UNREAD at the page: ten channels were attempted, nine answered, and every one that answered is closed, degraded or paywalled, but the author's own restatement of the 2008 theorem, read at the page image of Scourfield, Funct. Approx. 55.1 (2016) 84 eq. (1.1), counts divisors m <= x of f(n) for n <= x with weight 1, for f a product of pairwise coprime irreducible factors each of degree at least 2, and the open step needs divisors n > 2L above the window, carrying a branch-dependent weight of total mass 4^omega, for the product of three LINEAR factors C(C-2)(C+2). Two gaps each independently fatal, plus a third that is AMBIGUOUS between two author-sourced statements and does not carry the verdict. One correction to lit-smooth-divisors.md is earned: the precision register of the owning convention is not uniformly (log y)^{o(1)} or order-of-magnitude, since (1.1) is an asymptotic with relative error O(1/log x), which is the right register and one epsilon short of the o(1/ln y) the open step needs. Step 1 of Var/E does NOT become conditional on a citation, and no absence may be written, since the chapter's interior lemmas were not read.
-->

*Staging note, 2026-08-29. Literature pass on the single owed artifact named in
`lit-smooth-divisors.md` section 3.8 and in the RESUME list as item (a).
Nothing is computed; no number in this repository is recomputed; no existing
file is edited. Held under the publication moratorium.*

## 0. Verdict, the unread half first

**The chapter was not obtained, and nothing below is a page reading of it.**
Ten channels were attempted and nine answered (section 2). Every one that
answered is closed, degraded, or paywalled: Unpaywall reports `oa_status: closed` with an empty
`oa_locations` list; Semantic Scholar returns the record with the abstract
elided by the publisher and `openAccessPdf.status: CLOSED`; Cambridge Core
serves the chapter page with the line "A summary is not available for this
content so a preview has been provided" and "Book purchase Temporarily
unavailable"; the Internet Archive copy is `access-restricted-item: true` and
its full-text endpoint answers 403 without a lending session; Google Books
shows no preview. So this note cannot say what is inside pages 286-311, and
`lit-smooth-divisors.md` section 3.8's status **OWED** is only partly
discharged.

**What was obtained instead is second-hand, and its rung is second-hand.** The
author restates her own 2008 theorem in the introduction to Scourfield,
*Exact divisors of polynomials with prime variable*, Funct. Approx. Comment.
Math. **55**:1 (2016) 83-104, page 84, equation (1.1). That PDF was obtained
in full and the sentence was read at a rendered page image, not at a text
extraction. An author's restatement of her own theorem is stronger than a
reviewer's summary and weaker than the theorem. It is also **incomplete by
construction**: it carries the hypotheses relevant to the 2016 paper's own
setting, and the chapter may prove more.

**A hypothesis conflict between two author-sourced statements is left
unresolved.** The zbMATH author summary (Zbl 1334.11078) says `f` is monic and
"not necessarily irreducible but has no repeated factor", with **no degree
condition**. The 2016 restatement says "the `f_i` are pairwise coprime and of
**degree at least 2**". Whether the degree condition belongs to the 2008
theorem or to the 2016 context cannot be decided without the chapter. This is
the single point on which the verdict below could move, and it is flagged in
section 6 as the live falsifier.

**Nothing here touches the conjecture.** `variance-note.md` section 4 already
records that `Var/E` over a uniformly random window says nothing about the one
anchored window the twin problem needs. Nor does anything here move step 2, the
model's own limit theorem, which is PROVEN in `varE-limit-theorem.md`.

With that said, the verdict on the match:

**DOES NOT DELIVER**, on two independently fatal gaps and one ambiguous one, at
the rung that a
second-hand restatement supports.

1. **Divisor range.** Equation (1.1) counts divisors `m <= x` of `f(n)` for
   `n <= x`. The open step needs divisors `n > 2L` of `C(C^2-4)` for
   `|C| < L`. Above the sampling range, not inside it. This is the same wall
   `lit-smooth-divisors.md` section 5 records for Ford and for both Tenenbaum
   papers, and Scourfield does not cross it.
2. **Weight.** Her divisors carry weight 1. The open step's carry
   `w(n,C) = D_y prod_{p|n} (2 or 1)/(p-4)`, branch-dependent, of total mass
   `prod p^2/(p-2)^2` measured at `0.0579 ln^4 y`
   (`varE-theta2-proof.md` section 5, PART E). Nothing in the restatement is a
   weighted count.
3. **Polynomial degree.** `C(C^2-4) = C(C-2)(C+2)` is a product of three
   **linear** factors. The restatement requires each irreducible factor to have
   degree at least 2. Under the zbMATH summary's wording this gap disappears;
   under the 2016 wording it is fatal. Unresolved (section 6).

**One correction to `lit-smooth-divisors.md` is earned, and it narrows that
note rather than overturning it.** Its section 5 precision row reads
"`(log y)^{o(1)}` (Tenenbaum A), `asymp` (Ford, Koukoulopoulos)" against a need
for "asymptotic with relative error `O(1/ln y)`", and
the convention's precision register is recorded there without Scourfield's entry,
although the same table's divisor-range row carries her. `lit-smooth-divisors.md`
section 6 already says the opposite of a blanket absence, in its own words: "Not
ABSENT-PER-CONVENTION either ... Scourfield 2008 is an asymptotic, with an error
term". Equation
(1.1) is an asymptotic with relative error `O(1/log x)`, and on the diagonal
`L = y^2` gives `log x_lit = log L = 2 ln y`, so **`O(1/log x)` is the right
register and one epsilon short of the `o(1/ln y)` the open step asks for**: an
error of exactly `c/log x` gives an absolute `c ln^2 y`, which fails
`|E| <= eps ln^2 y` for every `eps < c`. The precision axis is therefore not
cleared, and the correction that survives is the narrow one, that section 5's
precision row omits an entry the same table's divisor-range row carries. The
range axis and the weight axis are the obstruction, and they are enough.

**Two hypotheses the open step does satisfy**, recorded because the scout so far
has found none:

- **Friability.** The restatement's smooth-divisor version is "valid for
  `y >= exp((log log x)^{5/3+eps})` with `eps > 0`". The open step has
  `y = L^{1/2} = x_lit^{1/2}`, which is inside that range by an enormous margin.
- **Shape of the sum.** It is a divisor **sum** over polynomial values, not the
  set count `H_F(x,y,z)`. `lit-smooth-divisors.md` section 1 feature 1 names the
  set-count mismatch as the first thing lost in translation; Scourfield's object
  does not lose it.

**What stays open.** Everything that was open before. `varE-theta2-proof.md`
section 6's mixed-lag estimate is not supplied by any read theorem;
`lim Var/E = 0.45546` stays HEURISTIC on step 1; and because the chapter's
interior lemmas were not read, **no absence may be written and the reduction may
still not be called new** (`varE-theta2-proof.md` section 8, last row, stands
unchanged).

## 1. The open step, stated with every quantifier

`varE-theta2-proof.md` section 6 and `paper/variance-note.md` section 10 carry
the same display. Stated here with the quantifiers made explicit, because that
is the object any source has to be matched against.

**Setting.** Fix the diagonal of `variance-note.md` section 10: `L = W = x#`
the primorial, and `y` the largest prime `<= sqrt(W)`, so `L = y^2` up to the
Mertens correction and `ln y = (1/2) ln L (1 + o(1))`. Put
`delta := Var/E`'s normaliser, with `1/delta` asymptotic to `ln^2 y / 0.2775`
(`varE-theta2-proof.md` section 4). Put
`D_y := prod_{7<=p<=y} (1 - 2/(p-2))`, the tile's local density product over the
primes in play.

**The moduli.** `n` runs over the integers that are simultaneously (i)
squarefree, (ii) coprime to 30, (iii) `y`-smooth, `P^+(n) <= y`, and (iv)
strictly larger than `2L`. Since `n | C(C^2-4)` and `|C| < L`, the upper end is
`n < L^3 = y^6`, so the friability parameter `u = ln n / ln y` runs over
`(2, 6]`.

**The weight.** For such an `n` and an integer `C`, `n | C(C^2-4)` factors
uniquely as `n = n_0 n_+ n_-` with `n_0 | C`, `n_+ | C+2`, `n_- | C-2`, and

    w(n,C) = D_y prod_{p | n} (2 or 1)/(p-4),

the numerator being `2` at each `p | C` and `1` at each `p | C -+ 2`. So `w` is
branch-dependent: it depends on which of the three roots `0, +2, -2` the CRT
class takes at each prime of `n`, not on `n` alone. Its total mass over all
`(n,c)` is `prod_{7<=p<=y} p^2/(p-2)^2`, measured at `0.0579 ln^4 y`.

**The statement.** For every `eps > 0` there is `y_0` such that for `y > y_0`,

    sum_{0 < |C| < L} (1 - |C|/L) * sum_{n | C(C^2-4), n > 2L, P^+(n) <= y,
                                        (n,30) = 1, n squarefree} w(n,C)
      =  L * sum_{n > 2L} sum_{c != 0 mod n} w(n,c)/n
         +  E(L,y),      with   |E(L,y)| <= eps * ln^2 y.

That is the display of `varE-theta2-proof.md` section 6 with its
`O(ln y * (something o(ln y)))` written out: the admissible error is
**`o(ln^2 y)`**, against a main term whose size is measured at order `ln^3 y`
(`varE-theta2-proof.md` section 5, `Phi` with local exponent 2.62 then 2.53 in
`ln y` over the top three of six levels). The required **relative** precision is
therefore `o(1/ln y)`, which is strictly stronger than `O(1/ln y)`.

**The four features that decide every match**, restated from
`lit-smooth-divisors.md` section 1 because they are what a source is checked
against:

1. a weighted sum over **every** admissible divisor, not a count of integers
   possessing at least one;
2. the divisor **above** the sampling range, `n > 2L` against `|C| < L`;
3. **branch-dependent** weights, not weight 1 and not `omega(m)` with the roots
   weighted equally;
4. an **asymptotic** with relative error `O(1/ln y)`, not an order of magnitude
   and not `(log y)^{o(1)}`.

Two further conditions are carried by the display and are minor by comparison,
recorded so the match in section 4 is complete: the Fejer weight `(1 - |C|/L)`
on the window, which comes off by partial summation given a theorem uniform in
the sampling range; and the restriction of `n` to squarefree integers coprime to
30, which is a sub-sum of the divisors the literature counts.

## 2. Channels, and what each returned

Every channel was run this session. Per `research/SEARCH-CONVENTIONS.md`, a
negative on a channel that did not demonstrably work is not recorded as a
negative; the calibration column says what the channel proved it could do in the
same session.

| # | channel | calibration, same session | result |
|---|---|---|---|
| 1 | Crossref REST, `api.crossref.org/works?query.bibliographic=` | returned the target as hit 1 with pages 286-311 | **PASS, bibliographic.** Exact citation confirmed: DOI `10.1017/CBO9780511721274.019`, container *Number Theory and Polynomials*, pages 286-311 |
| 2 | OpenAlex, `api.openalex.org/works` | returned the target as hit 1 for the title query | **PASS, bibliographic.** Work `W1780498272`; `open_access.is_oa: false`, `oa_status: closed`, `any_repository_has_fulltext: false`; sole location is the DOI landing page with `pdf_url: null`; `cited_by_count: 3` |
| 3 | OpenAlex forward citations, `filter=cites:W1780498272` | the filter returned exactly 3 records | **PASS, and it is the productive channel.** The three are Lapkova, *Monatsh. Math.* (2017) counted twice (journal DOI and arXiv `1704.02498`), and **Scourfield's own 2016 sequel**, which restates the 2008 theorem (section 3) |
| 4 | zbMATH open API, `api.zbmath.org/v1/document/6093091` | the document endpoint returned the full record | **PASS.** Author summary retrieved verbatim (section 3.1); `Zbl 1334.11078`; MSC 11N37, 11N25, 11N64; `editorial_contributions` carries a `summary` and **no reviewer**, so no independent review text exists to fall back on. The zbMATH **HTML** front end returns 403 behind a Cloudflare interstitial; the API is the working leg |
| 5 | Unpaywall, `api.unpaywall.org/v2/10.1017/CBO9780511721274.019` | returned a populated record for the DOI | **PASS, negative.** `is_oa: false`, `oa_status: closed`, `best_oa_location: null`, `oa_locations: []`, `has_repository_copy: false` |
| 6 | Semantic Scholar graph API, by DOI | returned the paper record (the earlier 429 that blocked `lit-smooth-divisors.md` did not recur on the DOI endpoint; the free-text `/paper/search` leg still 429s) | **PASS, negative.** `openAccessPdf.status: CLOSED`, empty URL, and the disclaimer "the following paper fields have been elided by the publisher: {'abstract'}" |
| 7 | Cambridge University Press, publisher of record | the DOI resolved through two redirects to the chapter page, HTTP 200, 735 KB | **PASS, negative.** The page carries "A summary is not available for this content so a preview has been provided", "Book purchase **Temporarily unavailable**", and a site-wide banner "Temporary Disruption ... we have suspended some of our systems and services". Print year 2008, online 04 May 2010, editors McKee and Smyth. **No abstract and no preview text on the publisher's own page** |
| 8 | Internet Archive | `advancedsearch.php` located the volume, and the ISBN query `isbn:9780521714679` returned the same identifier | **PASS locating, negative on text.** Item `numbertheorypoly0000unse`, 374 page images, `access-restricted-item: true`, collections `internetarchivebooks` and `printdisabled`. The full-text endpoint `fulltext/inside.php` returns **403 "Item not available"** without a lending session; `ia-pub-fts-api.archive.org` does not resolve from here (curl exit 6). `_djvu.txt` is listed in the manifest and is not served |
| 9 | Google Books | the ISBN page rendered | **PASS, negative.** No preview and no snippet view for this volume. The Books API is separately unusable: `quota_limit_value: 0` without a key |
| 10 | MathSciNet `mathscinet-mref` | not obtained | **UNREACHED.** The endpoint answers 302 to a login. It is bibliographic-only in any case (`SEARCH-CONVENTIONS.md` section 5), and channel 4 already supplies the author summary |

**Two mirrors located and not used.** A general web search surfaced two
full-book scans of *Number Theory and Polynomials* on a document-sharing host.
`lit-smooth-divisors.md` section 3.8 declined the same class of source ("the only
full-text hits were book-piracy mirrors, which were not used"), and that
precedent is followed here. The consequence is stated plainly rather than hidden:
**the chapter's interior is unread, and it is unread by choice as well as by
paywall.** Any future pass that obtains the volume through a library holding can
overturn section 4 on the point flagged in section 6.

**One channel that did work and was not tried by the previous pass.** The
forward-citation walk (channel 3) is exactly what `lit-smooth-divisors.md`
section 0 recorded as owed ("Forward-citation walks on Ford 2008 and on
Tenenbaum I/II were not run"). Run here on Scourfield 2008, it has three hits and
one of them is the author restating the theorem. The walk on Ford 2008 and on
Tenenbaum I/II remains **NOT RUN**.

**Provenance of the one artifact obtained.**

| artifact | how obtained | identity |
|---|---|---|
| Scourfield, *Exact divisors of polynomials with prime variable*, Funct. Approx. Comment. Math. **55**:1 (2016) 83-104, DOI `10.7169/facm/2016.55.1.6` | `curl` of the Project Euclid legacy download path `download/pdf_1/euclid.facm/1474301231` with a browser user agent and a referer; the modern Project Euclid article path is behind an Incapsula challenge and returns a 1.1 KB HTML interstitial | PDF 1.6, 535,765 bytes, 22 pages, `sha256 862c1f51c8c125a0ee08c2a3461a4a87b4c0371c6bca0f89194b2763859143a1`. Page 84 additionally rendered to PNG at 170 dpi and read as an image |
| Lapkova, *Explicit upper bound for the average number of divisors of irreducible quadratic polynomials*, arXiv:1704.02498v3 | `curl https://arxiv.org/pdf/1704.02498v3` | PDF, 158,032 bytes, `sha256 dcd6b8ccc43c3e67bfa3149fb5ac6c1008ca2b6a733de22984d65828a29d723a`. **Cites Scourfield 2008 in the bibliography only** (reference [23]); the body's Scourfield citation at page 1 is to her 1961 quadratic paper [22]. Nothing usable |

Both files are in the session scratchpad and neither is in the repository.

## 3. The source, at second hand, with page numbers

### 3.1 The author summary (zbMATH `Zbl 1334.11078`, record id 6093091)

Transcribed from the API response, with the LaTeX decoded and nothing else
changed. This is the same text `lit-smooth-divisors.md` section 3.8 paraphrased;
it is given verbatim here so that the conflict recorded in section 3.4 can be
checked.

> Summary: Let `f` be a monic polynomial over the integers that is not
> necessarily irreducible but has no repeated factor, and let `omega(m)` denote
> the number of solutions of the congruence `f(n) = 0 (mod m)`. We establish an
> asymptotic formula with a good error term for `sum_{m <= x} omega(m)`, and
> derive asymptotic formulae for the number of positive divisors `m <= x` of
> `f(n)` summed over `n <= x` and, using a result of G. Hanrot et al. [Proc.
> Lond. Math. Soc. (3) 96, No. 1, 107-135 (2008; Zbl 1195.11129)], for the
> number of these divisors `m` with no large prime factors.

The record carries `"reviewer": {"name": null}` and a single editorial
contribution of type `summary`. **There is no reviewer's text**, so the
review-grade fallback that the brief allows does not exist for this item; the
summary is the author's.

### 3.2 The author's own restatement, Funct. Approx. **55**:1 (2016), page 84

Read at a rendered page image of the obtained PDF, not at a text extraction
(section 3.3 records why that mattered). Transcribed verbatim, with `∏`, `⩽`
and the displayed fraction written in ASCII and the equation number kept:

> additional property. When `f = prod_{i=1}^{l} f_i` where the `f_i` are
> pairwise coprime and of degree at least 2 we proved in [13] that
>
>     sum_{n <= x} #{m <= x : m | f(n)} = C x (log x)^l ( 1 + O( 1/log x ) )   (1.1)
>
> where `C` is a constant, and we obtained an asymptotic formula for the
> corresponding sum when `P(m) := max_{p|m} p <= y`, valid for
> `y >= exp((log log x)^{5/3 + eps})` with `eps > 0`, so `m` is a smooth or
> friable divisor of `f(n)`. The proof of this latter result is related to and
> depends on ideas in [4] by Hanrot, Tenenbaum and Wu.

Reference [13] of that paper is, from its bibliography on page 104, transcribed
verbatim:

> [13] E.J. Scourfield, Smooth Divisors of Polynomials, Number Theory and
> Polynomials, LMS Lecture Note Series 352, J. McKee, C. Smyth (eds.), CUP,
> Cambridge, 2008, 286-311.

So (1.1) is the 2008 chapter's divisor-sum theorem as its author states it eight
years later, and the sentence after it is the 2008 chapter's friable theorem as
its author states it. Neither is the chapter.

The same page fixes the paper's own standing hypothesis, one paragraph earlier
(page 83, first line of section 1):

> Let `f in Z[x]` where `f` is not necessarily irreducible but the degree of
> each irreducible factor is at least 2.

and one paragraph later, page 84:

> where each `f_i in Z[x]`, is irreducible and of degree `>= 2`, the `f_i` are
> pairwise coprime, and `1 <= r_1 <= ... <= r_l`.

### 3.3 Text extraction was not reading, and here is where it failed

`pdftotext -layout` on the obtained PDF mangled three things on page 84, each of
which would have changed a reading:

- the subscript of the maximum, `P(m) := max_{p|m} p <= y`, extracted as
  `P (m) := maxp ⩽ y` with `p|m` orphaned onto the next line, which reads as a
  different definition;
- the friability exponent `5/3 + eps` extracted as a bare `5` on one line with
  the `3` and a **blank where the epsilon glyph is**, so the range condition was
  unreadable from the text layer;
- the Erdos bounds `x log x << sum tau(f(n)) << x log x` extracted with both
  Vinogradov symbols dropped, which reads as an equality.

All three were resolved by rendering page 84 at 170 dpi and reading the image.
The friability range is `y >= exp((log log x)^{5/3+eps})`, `eps > 0`, confirmed
at the image.

### 3.4 What the chapter's interior is known to contain, and it is one line

Page 90 of the 2016 paper, attached to its Lemma 3.1, reads verbatim:

> This is well known; for example, see Lemma 2 and equation (2.19) of [13].

Lemma 3.1 there is the Dedekind-zeta factorisation

    zeta_i(s) = prod_{q >= p_0} (1 - q^{-s})^{-rho_i(q)} h_i(s),

with `h_i` analytic in `Re s > 1/2` and `h_i(1) > 0`, where
`K_i = Q(theta_i)`, `f_i(theta_i) = 0`, `rho_i(q)` the number of roots of `f_i`
mod `q`. So the 2008 chapter contains, at its Lemma 2 and equation (2.19), the
same root-count-to-Dedekind-zeta dictionary that Tenenbaum's Lemme 2.1 supplies
in `lit-smooth-divisors.md` section 3.7, and its main-term machinery is a
zeta-factorisation argument. That is the whole of what is known about the
chapter's interior from a read page, and it is a statement about the **main
term**, which is not where the open step's difficulty lives.

**The unresolved conflict.** The zbMATH author summary (3.1) imposes monic and
squarefree and **no degree condition**. The 2016 restatement (3.2) imposes
pairwise coprime and **degree at least 2** on each irreducible factor. One
plausible reading is that the chapter proves the general case and the 2016
sentence quotes the sub-case its own paper needs; another is that the degree
condition is genuine, since `theta_i notin Q` is exactly what makes `K_i` a
proper number field in the Lemma 3.1 machinery. Both readings are available and
neither is checkable from here. Recorded as **AMBIGUOUS**; section 6 carries it
as the live falsifier.

## 4. The match, hypothesis by hypothesis

Section 1's statement against section 3.2's restatement. The convention flip is
`lit-smooth-divisors.md` section 1's: the note's `L` is the literature's sampling
range `x_lit`, the note's `y` is a smoothness bound and not a divisor size, and
the note's `n` is the literature's divisor `m`.

| # | axis | what (1.1) and its friable companion have | what section 1 needs | verdict |
|---|---|---|---|---|
| 1 | object | a **divisor sum**, `sum_{n<=x} #{m <= x : m \| f(n)}` | a weighted sum over every admissible divisor | **MATCHES in shape.** Not a set count `H_F`; this is the first item in the scout that clears feature 1 |
| 2 | divisor range | `m <= x`, the divisor at most the sampling range | `n > 2L`, the divisor **above** twice the sampling range, up to `L^3` | **FATAL.** The same wall as Ford (`y <= sqrt x`), Tenenbaum I (`y <= x^{1-eps}`), Tenenbaum II (`y <= x/2`). Scourfield sits at the top of that list and still below it |
| 3 | polynomial, shape | `f` monic, squarefree (3.1); a product of pairwise coprime irreducible factors (3.2) | `C(C-2)(C+2)`, monic, squarefree, factors pairwise coprime in `Q[x]` (the pairwise resultants are `+-2, +-4`, all nonzero) | **MATCHES**, on both wordings |
| 4 | polynomial, degree | each irreducible factor of degree `>= 2` (3.2); no degree condition (3.1) | three factors of degree **1** | **FATAL under 3.2, VACUOUS under 3.1. AMBIGUOUS.** See 3.4 |
| 5 | weight | each divisor counted once; the root count `omega(m)` weights the roots equally | `w(n,C) = D_y prod_{p\|n} (2 or 1)/(p-4)`, branch-dependent, total mass `prod p^2/(p-2)^2` measured at `0.0579 ln^4 y` | **FATAL.** A `4^omega`-sized weight that distinguishes the root `0` from the roots `+-2` is not a divisor count, and the restatement offers no weighted version |
| 6 | smoothness, parameter range | `y_lit >= exp((log log x)^{5/3+eps})`, `eps > 0`, where `y_lit` is the friability bound on the divisor | `y = L^{1/2}`, i.e. `log y = (1/2) log x_lit` | **SATISFIED, with room.** The condition is a lower bound on the friability parameter and ours is at the extreme upper end of it |
| 7 | smoothness, what is friable | the **divisor** `m` of `f(n)` | the **divisor** `n` of `C(C^2-4)` | **MATCHES.** This is the axis on which Drappeau-Tenenbaum and Basquin invert the quantifiers (`lit-smooth-divisors.md` section 4) and Scourfield does not |
| 8 | precision | `1 + O(1/log x)` relative | relative `O(1/ln y)`, since the admissible error is `o(ln^2 y)` against a main term measured at order `ln^3 y` | **NEAR MISS, one epsilon short.** On the diagonal `log x_lit = log L = 2 ln y`, so the two are the same order, but (1.1) supplies `O(1/log x)` where the open step needs `o(1/ln y)`: an error of exactly `c/log x` gives an absolute `c ln^2 y`, which fails `\|E\| <= eps ln^2 y` for every `eps < c`. **The correction to `lit-smooth-divisors.md` section 5's precision row is therefore narrow: that row omits Scourfield, and the omission is worth fixing, but the precision axis is not cleared** |
| 9 | uniformity | not displayed in the restatement: whether `C` and the implied constant are uniform in the friability parameter, and whether (1.1) holds uniformly in `x` | uniformity in `x_lit` is needed to strip the Fejer weight `(1-\|C\|/L)` by partial summation; uniformity in the friability parameter is needed for any subtraction | **UNKNOWN.** Not decidable from a restatement. Would need the chapter |
| 10 | sub-sum | all divisors `m` | only `n` squarefree, coprime to 30 | **MINOR.** A restriction of this kind is normally absorbed by a bounded Euler factor, and no located result forbids it. Not costed here |

**Answer to the brief's question, at the lowest honest rung: DOES NOT DELIVER.**
Row 2 alone settles it, row 5 settles it independently, and row 4 settles it
under one of the two available readings of the hypotheses. Step 1 of `Var/E`
does **not** become CONDITIONAL on this citation, and no conditional statement
of the form "assuming Scourfield's Theorem N" is available, because the theorem
as restated does not contain the needed count under any specialisation of its
parameters.

**The one route the match does leave open, unchanged and still uncosted.**
`lit-smooth-divisors.md` section 5 proposed the complement,

    sum_{n > 2L} = sum_{all n} - sum_{n <= 2L},

on the ground that both halves are then averages over a range at least as long
as the moduli. Section 3.2 sharpens what that route would need, without costing
it any further:

- the head sum `sum_{n <= 2L}` is at Scourfield's own cutoff up to the factor 2,
  so **the range axis is cleared for the head half**, which is new;
- the tail-free half `sum_{all n | C(C^2-4), P^+(n) <= y} w(n,C)` is a
  multiplicative function of `C(C^2-4)` summed over a full window, which is the
  Nair-Tenenbaum / Shiu shape rather than a localisation problem;
- but Scourfield's error on the head half is `O(main / log x)`, an **absolute**
  quantity, and whether that is `o(ln^2 y)` **for the tail** depends on the ratio
  of the head to the tail, which is computed nowhere in this corpus. The head is
  presumably the larger of the two by at least a logarithm, in which case the
  subtraction loses exactly the saving it was meant to buy;
- and rows 4, 5 and 9 apply to the head half unchanged: degree-1 factors,
  branch-dependent weights, and unstated uniformity.

So the complement route now has one of its four obstacles removed and three
standing, and the honest prior recorded in `varE-theta2-proof.md` section 6
stands: a one-logarithm gap in a divisor problem of this shape is usually the
whole difficulty.

## 5. Proposed row for `research/SEARCH-CONVENTIONS.md` section 1

**HOLD for the orchestrator. This note edits no existing file.** The row below
replaces the draft in `lit-smooth-divisors.md` section 6, which was written
before Scourfield was reachable at second hand; the changes are the Scourfield
entry moving from OWED to SECOND-HAND, the precision clause narrowing, and the
addition of the forward-citation instruction that produced this pass's one
artifact. Column format copied from the existing table.

| object | our name | canonical | **OWNING convention — search THIS** | where it lives |
|---|---|---|---|---|
| weighted count of large `y`-smooth divisors of `C(C^2-4)`, averaged over a window `\|C\| < L = y^2` (the CRT-mixed lag residual of the `theta = 2` decoupling step) | the mixed lags, `Xmix`; "the divisor-distribution statement" | distribution of divisors of polynomial values in a range | **`H_F(x,y,z) = #{n <= x : exists d \| F(n), y < d <= z}`**, "la localisation des diviseurs de `F(n)`"; the tool is **Hooley's `Delta`-function**, `Delta(n) = max_u #{d \| n : e^u < d <= e^{u+1}}`; the three-factor shape is **`H^{(k+1)}(x, ybar, zbar)`, "localized factorizations"**; the smoothness word is **friable**, never "smooth" (`ti:"smooth divisors"` is algebraic geometry, 7 of 9). Two traps. **(a) Our divisor range `y_lit > x_lit` is outside every located theorem**, without exception, and that is the wall, not the precision: **asymptotics with relative error `O(1/log x)` DO exist in this convention** for the divisor-sum object over polynomial values with a friability restriction (Scourfield), so a negative searched on "no asymptotics here" is wrong. **(b) Search the DIVISOR-SUM object (`sum_{n<=x} #{m <= x : m \| f(n)}`), not only the set count `H_F`**; they are different functions and the set count is the harder one. **Method note: the forward-citation walk is the productive channel here** (OpenAlex `filter=cites:<work id>`), since the load-bearing chapter is closed access and its author restates it in her own later papers | Ford, *Ann. of Math.* (2) **168** (2008) 367-433, Thm 1 and section 1.6(i) (order of magnitude; "strengthen Theorem 1 to an asymptotic formula" is his own open problem); Tenenbaum, *A Tribute to Paul Erdős* (CUP 1990) 405-443 (reducible `F`, `y <= x^{1-eps}`, `(log y)^{o(1)}`) and *Invent. Math.* **99** (1990) 215-224, Thms 1 and 3 (irreducible `F`, `y <= x/2`); Hall-Tenenbaum, *Divisors*, Cambridge Tracts **90** (1988) Thm 21; Koukoulopoulos, *Proc. LMS* (3) **101** (2010) 392-426 and *Crelle* **689** (2014) 33-99; Ford, arXiv:1901.02548 (roughness of the **integer**, the opposite axis). **Friable side**: Hanrot-Tenenbaum-Wu, *Proc. LMS* (3) **96** (2008) 107-135; Martin-Tenenbaum-Wetzer, arXiv:2307.05530; Schlitt, arXiv:2603.19212 (positive-density prime sets, **not** friability). **The divisor-sum-over-polynomial-values object is Scourfield, *Smooth divisors of polynomials*, LMS Lect. Notes **352** (CUP 2008) 286-311**, DOI `10.1017/CBO9780511721274.019`, Zbl 1334.11078, closed access on every channel tried, **UNREAD at the page**, restated by its author at *Funct. Approx.* **55**:1 (2016) 84 eq. (1.1) as `sum_{n<=x} #{m <= x : m \| f(n)} = Cx(log x)^l(1 + O(1/log x))` with a friable companion valid for `y >= exp((log log x)^{5/3+eps})`; divisors at most `x`, weight 1, factors of degree `>= 2`. `history/staging/lit-smooth-divisors.md`, `history/staging/lit-scourfield-2008.md` |

## 6. What would falsify this, and whether the check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| the exact citation is LMS Lect. Note Ser. **352**, CUP 2008, pp. 286-311, DOI `10.1017/CBO9780511721274.019`, Zbl 1334.11078 | PROVEN (record) | a differing page range or DOI on the publisher's own page | YES. Crossref, OpenAlex, zbMATH and Cambridge Core agree on all four fields |
| the chapter is closed access with no open copy | MEASURED (search), ten channels attempted, nine answered | any repository, author page, or library copy serving the text | PARTLY. Unpaywall `oa_locations: []`, Semantic Scholar `CLOSED`, OpenAlex `is_oa: false` and `any_repository_has_fulltext: false`, CUP "Book purchase Temporarily unavailable", IA lending-restricted, Google Books no preview. **MathSciNet UNREACHED. Two piracy mirrors located and declined. No library holding was tried, and that is the obvious next channel** |
| (1.1) as transcribed in section 3.2 is what the 2016 paper prints on page 84 | PROVEN (read at page image) | the page image disagreeing with the transcription | YES. Page 84 rendered at 170 dpi and read as an image; the text extraction was wrong in three places and is recorded in 3.3 |
| (1.1) is the 2008 chapter's theorem | **SECOND-HAND** | the chapter proving something else, or something more general, at that display | **NO. The chapter is unread.** The evidence is the author's own attribution "we proved in [13]" |
| the 2008 theorem requires each irreducible factor to have degree `>= 2` | **AMBIGUOUS, and this is the live falsifier** | the chapter stating the theorem without a degree condition, which the zbMATH author summary's wording permits | **NO.** Two author-sourced statements disagree (section 3.4). If the summary's reading is right, match row 4 becomes vacuous. **Rows 2 and 5 still settle the verdict, so the overall answer does not turn on this** |
| the divisor range `m <= x` is the theorem's, and the open step's `n > 2L` is outside it | SECOND-HAND, and consistent with every other item in the convention | a version of the theorem with the divisor above the sampling range | NO for the chapter. YES against the rest of the convention, where the range ceiling is uniform (`lit-smooth-divisors.md` sections 3.1-3.7) |
| the weights are the obstruction independently of the range | PROVEN, from our side | a reading of `w(n,C)` as a plain divisor count | YES, by inspection: `w` distinguishes the root `0` from `+-2` through `2/(p-4)` against `1/(p-4)`, and its total mass is `4^omega`-sized, measured at `0.0579 ln^4 y` |
| the friability range is satisfied by `y = L^{1/2}` | PROVEN, given 3.2 | the condition being an upper bound rather than a lower bound on the friability parameter | YES, read at the page image: `y >= exp((log log x)^{5/3+eps})` |
| the precision register of this convention includes `O(1/log x)` relative, contra `lit-smooth-divisors.md` section 5 | SECOND-HAND | (1.1) not being the chapter's | NO beyond 3.2. **This is a correction offered to that note, not applied; this note edits nothing** |
| Scourfield 2008 does not close `varE-theta2-proof.md` section 6 | **CONJECTURED, upgraded from the previous pass's "abstract-only"** | an interior lemma of the chapter covering divisors above the sampling range, or a weighted version | **NO. The chapter is unread and its interior is known only through one citation of its Lemma 2 and equation (2.19)** (section 3.4), which is main-term machinery |
| the reduction in `varE-theta2-proof.md` section 6 is new | **NOT CLAIMED, unchanged** | the chapter, or a paper found by the un-run forward walks on Ford 2008 and Tenenbaum I/II | NO. Those walks are still **NOT RUN** |
| `lim Var/E = 0.45546` | HEURISTIC on step 1 | step 1 failing | NO. This note moves neither step; step 2 is PROVEN in `varE-limit-theorem.md` and step 1 is untouched here |

The one line worth carrying out of this pass: the owed artifact was chased down
to its author's own restatement and the restatement fails the open step on the
same axis every other item in the convention fails it, the divisor being counted
below the sampling range rather than above it, so the wall named in
`lit-smooth-divisors.md` section 5 is now confirmed at the top of the
convention's precision register rather than only at its bottom, and the one
thing that would change the answer, the chapter's interior, is behind a paywall
and a declined mirror.
