# Siebert 1983, *Sieve methods and Siegel's zeros*: dimension one only, so the `κ = 2` extremal row stands

<!-- ledger
id: Q-lit-siebert
status: ANSWERED
todo: 0
question: Is Siebert's 1983 result stated for general sieve dimension kappa, or for kappa = 1 only, and does it therefore already contain the kappa = 2 extremal example that SEARCH-CONVENTIONS section 3 records as not found?
verdict: kappa = 1 ONLY, on three independent statements of the theorem (the chapter's own publisher abstract, Granville 2020 section 1, Friedlander-Iwaniec 2022 page 20), all naming the LINEAR sieve and the Jurkat-Richert f and F; the chapter's full text was NOT reached, so this is testimony not primary reading, and the SEARCH-CONVENTIONS section 3 "no published kappa = 2 extremal example" row needs no correction.
-->

*(2026-08-28. Staging note. Literature assignment, single deliverable. **No
existing repo file was edited, moved or deleted; no git command was run;
`qc.js` was not run** and no producer was written. The brief permitted exactly
one new file, so this note sits outside the gate and must not be quoted from a
gated document until someone with write access re-checks it.)*

**Gate debt this note creates, stated so it is not discovered later.** The block
above names TODO item **0**, whose `Ledger:` line does not list `Q-lit-siebert`.
The gate (`node research/qc.js ledger`) will refuse this note until that one id
is added to item 0's `Ledger:` line. The brief forbade editing `TODO.md`, so the
debt is recorded here rather than paid.

---

## 0. Bottom line, caveat first

**The chapter itself was NOT reached.** No route returned the text of pp. 659 to
668. Every statement below is second-hand: the publisher's own abstract as
carried by OpenAlex metadata, and two published accounts by people who read the
chapter. The verdict rests on testimony, and its rung is **SOURCED-BIB plus
third-party statement**, never *read*.

**Verdict: `κ = 1` ONLY.** Three independent statements of what Siebert proves
all name the **linear** sieve and the **Jurkat-Richert** pair `f(u)`, `F(u)`,
which is the `κ = 1` sieve and nothing else. The word Granville uses, "broader",
refers to the *sequence being sifted* (arithmetic progressions instead of
intervals), not to the dimension. So:

- The `κ = 2` extremal example is **not** in Siebert 1983 on any available
  reading of it.
- `research/SEARCH-CONVENTIONS.md` §3's row *"Published `κ = 2` **extremal
  example** ... **None found**"* is **not** shown wrong, and needs **no
  correction**. No draft row is supplied, because the condition the brief
  attached to supplying one (COVERED) did not occur.
- `research/sift-limit-attack.md` §2's reading of the band and
  `paper/wall-note.md` §2 Face 4's "no barrier result" are unaffected.
- `recon-0828-jacobsthal.md` A13, which called this "the cheapest decisive check
  in the area", is answered in the negative direction: the check was cheap and it
  closed, and A13 should be marked CLOSED rather than LIVE. A12 is not a
  rediscovery of Siebert.

**One premise of the brief is wrong and is corrected here.** The brief said the
sibling recon "found the zbMATH entry; read the review text in full". There is
**no zbMATH review and no zbMATH abstract**. Zbl 0519.10035 is a bare
bibliographic stub: `editorial_contributions: []`, `keywords: []`,
`references: []`. A review does exist, by **Masako Izumi**, in MathSciNet
(MR820259), and its text was **not** reachable. Whatever was read in the sibling
session, it was not a zbMATH review of this chapter.

---

## 1. Provenance: exactly what was reached, and how

| artifact | route | HTTP | sha256 | what was read |
|---|---|---|---|---|
| **OpenAlex `W72214602`**, the chapter record, carrying the **publisher abstract** | `https://api.openalex.org/works/doi:10.1007/978-3-0348-5438-2_56` | **200** | `8268367c5266544d87397d8af192473fa1bd97064f19ca06e59564d42557369c` | **[SOURCED-METADATA]** the full `abstract_inverted_index`, reconstructed to running text by position. **This is not a page image**, see the mangling caveat in §2 |
| **Granville, *Sieving intervals and Siegel zeros*, arXiv:2010.01211** (published Acta Arith., DOI `10.4064/aa201002-25-6`) | `https://arxiv.org/pdf/2010.01211` | **200**, 222 744 B, 15 pp | `35a6aa6a7dac4b1af9b6c66dd1dc564270649be763253bb9b5a1d0b9a78d79ac` | **[SOURCED]** full `pdftotext -layout`; §1 p. 3 and the footnote on p. 3; reference [15] p. 15 |
| same paper, author's own copy | `https://dms.umontreal.ca/~andrew/PDF/Sieve.Remark.20.09.26.pdf` | **200**, 376 359 B | `a5403b56e7aab8dd2f66bbc776e049e1ac470bc8a948abd65d8fe2b6c250281b` | **[SOURCED]** extraction; the Siebert sentence is **byte-identical in wording** to the arXiv one, so the two channels agree |
| **Friedlander and Iwaniec, *Exceptional zeros, sieve parity, Goldbach*, Essential Number Theory 1 (2022) 13 to 39** | `https://msp.org/ent/2022/1-1/ent-v1-n1-p02-s.pdf` | **200**, 3 282 771 B | `bcb8c55f3d4d391f7b69b0c024770a39a2c71a6faefd3e57f65c20994928e00e` | **[SOURCED]** full extraction; §3 p. 20 (the two Siebert paragraphs) and the bibliography p. 38 |
| **Xi and Zheng, *On the Brun-Titchmarsh theorem. I*, arXiv:2404.01003** (Trans. AMS, DOI `10.1090/tran/9727`) | `https://arxiv.org/pdf/2404.01003` | **200**, 829 262 B | `d21357faca8178bf638284c642e6c3d6dcf0a481cc641caa673dac91c65f7555` | **[SOURCED]** extraction; the single `[Si83]` citation on p. 9 and the reference entry |
| **MathSciNet `mrlookup`**, BibTeX record | `POST https://mathscinet.ams.org/mrlookup`, `au=Siebert`, `ti=Sieve methods and Siegel`, `year=1983`, `format=bibtex` | **200** | `2e3949839c2b3d2304d0c1ead795ea7e574f3dcab525b07e3ade309013d93d14` | **[SOURCED]** the whole record: `MR820259`, `MRCLASS = {11M56 (11M20 11N35)}`, `MRREVIEWER = {Masako Izumi}`, `ISBN = {3-7643-1288-2}`, pp. 659 to 668. **No review text; mrlookup carries bibliographic fields only** |
| **zbMATH API**, record `Zbl 0519.10035` | `https://api.zbmath.org/v1/document/3821860` | **200** | `7582a04aa9359be62d232d7fa11428b04c043f4fa7bcf45e0404294deb4274b6` | **[SOURCED]** whole record. MSC 11N35 Sieves, 11M06, 11N05. **Empty review, empty abstract, empty keywords** |
| **OpenAlex forward-citation graph** of `W72214602` | `https://api.openalex.org/works?filter=cites:W72214602` | **200** | `a7c44c2975e2100c65ba4bd8a3ed9f1f5436df40e3c49fa77eabe2ff0b96e086` | **[SOURCED]** complete list, **8 works**, every title read; see §4 |

Working copies of all of the above are in this session's scratchpad only. They
are not in the repo and are not embedded.

---

## 2. What the theorem states, in the three places it is stated

### 2.1 Siebert's own abstract, via OpenAlex `W72214602`

**Caveat on the text before the text.** OpenAlex stores abstracts as an inverted
index (word to positions). Reconstructing by position recovers **word order
faithfully** but **destroys the display mathematics and the punctuation inside
it**: the Brun-Titchmarsh display comes back as the run of tokens
`π(x,k,l):= ∑ p≦ p=l( mod k) 1≦ 2 ϕ(k) · x log(x/k) ,1≦k 0`, and `f(u) F(u)`
has lost the comma between them. **Prose outside the displays is reliable; no
symbol inside a display may be quoted from this reconstruction.** Reconstructed
prose, the operative sentence:

> "The purpose of this paper is to give a proof of this fact and to prove a
> general result of this kind (Theorem 7 below) showing that the **linear
> Selberg sieve in the version of W. B. Jurkat and H.-E. Richert** ([1],
> Theorem 5, p. 230) in the same sense just fails to give assertions on Siegel
> zeros for every value of the parameter α ∈ (0, 1). The proof also yields a
> direct arithmetic interpretation of the functions f(u) F(u) occurring in the
> Jurkat-Richert sieve."

The opening of the same abstract sets up the target: it is "well known" that
Siegel's theorem would be effective for every `ε ∈ (0, 1/2]` if the constant 2 in
Brun-Titchmarsh could be lowered, an observation the abstract attributes to
**K. A. Rodosskii**, and the paper's first job is to prove that folklore claim.

**Reading.** The named object is the **linear** Selberg sieve, the cited
authority is **Jurkat and Richert 1965, Theorem 5, p. 230**, and the functions
are the linear pair `f(u)`, `F(u)`. The word "general" in "a general result of
this kind" quantifies over the **level parameter α ∈ (0, 1)**, not over
dimension. Nothing in the abstract mentions `κ`, dimension, two residue classes
per prime, or a higher-dimensional sieve.

### 2.2 Granville, arXiv:2010.01211 §1 p. 3, verbatim from the hashed file

> "Siebert in [15] proved a similar result though with a slightly broader sieve
> problem (he allowed sieving arithmetic progressions), and he obtained a
> slightly weaker conclusion because he did not realize that an estimate as
> strong as (7) was at his disposal."

The "similar result" is Granville's own Corollary 1, which is stated for the
**linear** sieve functions `f(v)`, `F(v)` with `F(u) = 2e^γ/u` and
`f(u) = (1/u)∫₁^{u−1}F(t)dt`. **"Broader" is the sequence axis, and Granville
names which axis in the same parenthesis: arithmetic progressions rather than
intervals.** Granville's own text contains zero occurrences of "dimension 2" or
any higher-`κ` statement, which the sibling recon already checked mechanically
and which this pass did not re-run.

### 2.3 Friedlander and Iwaniec, ENT 1 (2022) 13 to 39, §3 p. 20, verbatim

Two consecutive passages, the second being the one that settles the dimension:

> "The proof of this result (in somewhat weaker form) is found in [Siebert 1983]
> with a deeper, more precise, statement in [Granville 2020]. The basic idea is
> to combine (3-1) and (3-2), the latter having been adjusted to a bound for
> ψ(x; q, a)."

> "Moreover, using more sophisticated ideas, Siebert and then, in definitive
> form, Granville show this result to be a special case of the following more
> general statement. **The linear sieve produces specific upper and lower bound
> functions F(s) and f(s) respectively, first discovered by Jurkat and Richert
> [1965]**, (see Section 12.1 of [Friedlander and Iwaniec 2010]), which apply
> when we are dealing with a sequence (aₙ), n ≤ x satisfying the linear sieve
> axiom (2-8) and we are sieving by a set of primes p ≤ D^{1/s}. It is known
> that these functions F, f are optimal in general, although the specific
> sequences which provide a counterexample do not resemble arithmetic
> progressions. **Siebert, respectively Granville, show that a fixed improvement
> of the value of either F(s), f(s) for any value of s, again in the case of
> arithmetic progressions and with x larger than a sufficiently large power of
> q, implies that exceptional zeros do not exist.**"

This is Friedlander and Iwaniec, who wrote *Opera de Cribro*, describing
Siebert's general statement in their own words, and the sieve they name is the
**linear** one, with its axiom (2-8) and its `F`, `f`. The pointer "Section 12.1
of [Friedlander and Iwaniec 2010]" is *Opera de Cribro* §12.1, which is the
**linear sieve** chapter. That is the closest this pass got to the *Opera de
Cribro* remark the brief asked for: the authors' own 2022 survey, citing their
own §12.1, in the same paragraph as Siebert.

---

## 3. The statement, its dimension, its hypothesis

Assembling the three accounts, and flagging that this is a reconstruction from
testimony and **not** a quotation of Siebert's Theorem 7:

- **Statement (contrapositive direction, the one Siebert states).** For the
  sequence `{n ≤ x : n ≡ a (mod q)}`, sifted by primes up to `D^{1/s}` at level
  `D` under the linear sieve axiom, the Jurkat-Richert upper and lower bound
  functions `F(s)` and `f(s)` cannot be improved by any fixed amount at any
  single value of `s`, uniformly for `x` larger than a sufficiently large fixed
  power of `q`, without implying that exceptional (Siegel) zeros do not exist.
  Equivalently, in the direction Granville states: if there are infinitely many
  Siegel zeros, the linear sieve bounds `f`, `F` are **attained** on arithmetic
  progressions.
- **Dimension: `κ = 1`.** Named as "linear" by the chapter's own abstract, by
  Granville, and by Friedlander and Iwaniec. The Jurkat-Richert `f`, `F` are the
  dimension-one sieve functions; the `κ = 2` functions `f₂`, `F₂` with the
  sifting limit `β₂ = 4.2665` are Diamond-Halberstam objects and appear nowhere
  in any of the three accounts.
- **Hypothesis: an exceptional real zero of `L(s, χ)` for a primitive real
  character `χ mod q`**, with `x > q^A` for a sufficiently large `A`, in an
  infinite sequence of such `q`. Same hypothesis class as Granville's
  Proposition 1, weaker conclusion because Siebert did not use the strong
  Brun-Titchmarsh-type estimate that Granville's (7) supplies.
- **What is "general" in it.** Level `s`, or equivalently `α ∈ (0, 1)`, and the
  sifted sequence class (arithmetic progressions, not just intervals). Not `κ`.

---

## 4. The forward-citation graph, read completely

OpenAlex `cites:W72214602` returns **8 works, total count 8**, every title read:

| year | work | relevance |
|---|---|---|
| 1985 | Grupp and Richert, *The functions of the linear sieve (summary)*, `10.1007/bfb0075754` | linear sieve, `κ = 1` |
| 1986 | Grupp and Richert, *The functions of the linear sieve*, JNT, `10.1016/0022-314x(86)90070-3` | linear sieve, `κ = 1` |
| 1986 | **Grupp, *On difference-differential equations in the theory of sieves*, JNT, `10.1016/0022-314x(86)90099-5`** | **the one citing work whose own subject is `κ`-general. NOT READ: ScienceDirect returned HTTP 403, no abstract in OpenAlex. This is the single live residual, see §5** |
| 2011 | *The Last Period*, `10.1007/978-0-85729-532-3_6` | a book chapter, not sieve-technical |
| 2013 | *Number Theory*, `10.1007/978-1-4614-4081-9_8` | book chapter |
| 2022 | Granville, *Sieving intervals and Siegel zeros*, `10.4064/aa201002-25-6` | read, §2.2 |
| 2022 | Friedlander and Iwaniec, *Exceptional zeros, sieve parity, Goldbach*, `10.2140/ent.2022.1.13` | read, §2.3 |
| 2022 | `10.2140/ent.2022.1-1` (the ENT issue record, no title) | duplicate of the above |

Xi and Zheng, arXiv:2404.01003, cite Siebert too (Semantic Scholar's graph has
it, OpenAlex's does not), and their use is the same convention. Their p. 9:

> "The phenomenon that such improvements over the Brun-Titchmarsh theorem
> eliminate Landau-Siegel zeros seems first observed by Klimov [Kl61, Remark 1];
> see also [Si83] and [Gr22] for related results."

**Reading of the graph as a whole.** Forty-three years of citations, and every
one of them lands in the linear sieve or in Brun-Titchmarsh. No paper cites
Siebert for a dimension-`κ` or dimension-2 statement. That is weak evidence
rather than proof, but it is evidence in the same direction as the three explicit
accounts.

---

## 5. What would falsify this verdict, and whether that check has run

- **Reading pp. 659 to 668 and finding Theorem 7 quantified over `κ`.** NOT RUN.
  The chapter was not reached on any channel (§6). This is the only decisive
  check and it requires an interlibrary retrieval or a physical copy of
  Birkhäuser 1983, ISBN 3-7643-1288-2.
- **Reading Grupp, JNT 1986, *On difference-differential equations in the theory
  of sieves*, and finding it cites Siebert for a `κ`-general fact.** NOT RUN,
  ScienceDirect 403. This is the cheapest remaining probe and it is indirect:
  the paper's subject is the DDE system that carries the general-`κ` functions
  `F_κ`, `f_κ`, so its reason for citing Siebert is worth knowing. A `κ = 1`
  reason would harden this note; a `κ`-general reason would reopen it.
- **Reading the MathSciNet review by Masako Izumi (MR820259).** NOT RUN, the
  review text is behind subscription and behind a JavaScript client challenge.
- **Probability assessment, stated as a judgement and not as a measurement.**
  The three accounts are independent (the chapter's own publisher abstract; a
  2020 paper that reproves it; a 2022 survey by the authors of *Opera de
  Cribro*), and all three name the linear sieve. A dimension-2 theorem hiding
  inside a chapter whose own abstract advertises only the linear sieve, unnoticed
  by Friedlander and Iwaniec, is possible and is not likely. This note's
  confidence in `κ = 1 ONLY` is high but not certain, and the residual is exactly
  the unread text.

---

## 6. Every route tried, with its outcome

| route | URL or method | outcome |
|---|---|---|
| Springer chapter page | `https://link.springer.com/chapter/10.1007/978-3-0348-5438-2_56` | **HTTP 200 but NO CONTENT.** 3 038 bytes of Client Challenge JavaScript bot wall. Retried with cookie jar and browser user-agent: same 3 038 bytes |
| Springer via DOI | `https://doi.org/10.1007/978-3-0348-5438-2_56` | redirects to the same page, same wall |
| Springer via the `WebFetch` fetcher | same URL | **HTTP 303** to `idp.springer.com/authorize`, a cookie-auth hop, not followed |
| **Crossref** | `api.crossref.org/works?query.bibliographic=...` | **HTTP 200.** Supplied the DOI `10.1007/978-3-0348-5438-2_56`, container *Studies in Pure Mathematics*, pp. 659 to 668. Bibliographic only |
| **OpenAlex by DOI** | `api.openalex.org/works/doi:10.1007/978-3-0348-5438-2_56` | **HTTP 200, and this is the route that worked.** `W72214602`, cited-by 8, **with the publisher abstract**. The sibling recon's `title.search` returned zero for this record; **the DOI lookup does not**, and that is a channel lesson worth carrying |
| OpenAlex citation graph | `api.openalex.org/works?filter=cites:W72214602` | **HTTP 200**, 8 works, §4 |
| **zbMATH API, search** | `api.zbmath.org/v1/document/_search?search_string=au:Siebert & ti:Siegel` | **HTTP 200**, exactly 2 records, confirming the sibling recon's count |
| **zbMATH API, record** | `api.zbmath.org/v1/document/3821860` | **HTTP 200.** Zbl 0519.10035. **No review, no abstract, no keywords.** The brief's premise that a zbMATH review exists is wrong |
| zbMATH HTML | `zbmath.org/3821860` and `zbmath.org/?q=an:0519.10035` | **HTTP 403** both, Cloudflare |
| **MathSciNet mrlookup** | `POST mathscinet.ams.org/mrlookup` | **HTTP 200.** MR820259, MRCLASS 11M56 (11M20 11N35), reviewer Masako Izumi. Bibliographic only, no review text, as `SEARCH-CONVENTIONS.md` §5 already records |
| MathSciNet review page | `mathscinet-getitem?mr=0820259`, `relay-station?mr=820259` | **HTTP 200 but NO CONTENT**, 10 512 bytes of "frontend doesn't work properly without JavaScript" plus subscription wall |
| **Google Books API** | `googleapis.com/books/v1/volumes?q=isbn:3764312882`, and a title query, and a phrase query | **HTTP 429 on all three**, quota exhausted for the day at the project level. This matches the standing residual in `SEARCH-CONVENTIONS.md` §5 ("Google Books returned HTTP 429 for the whole session") |
| Semantic Scholar API, record | `api.semanticscholar.org/graph/v1/paper/a1c752...` | **HTTP 429** twice, rate limited. The citations endpoint answered **200** once and gave 8 citing papers, matching OpenAlex plus Xi-Zheng |
| Semantic Scholar page | `semanticscholar.org/paper/...` | **HTTP 202, zero bytes**, bot wall |
| scholar.archive.org phrase search | `scholar.archive.org/search?q="Sieve methods and Siegel's zeros"` | **HTTP 200 but NO CONTENT**, Archive-It JavaScript bot protection |
| ScienceDirect, Grupp 1986 DDE paper | `sciencedirect.com/science/article/pii/0022314X86900995` | **HTTP 403** |
| **Granville arXiv PDF** | `arxiv.org/pdf/2010.01211` | **HTTP 200**, read in full |
| **Granville author copy** | `dms.umontreal.ca/~andrew/PDF/Sieve.Remark.20.09.26.pdf` | **HTTP 200**, read, agrees verbatim with the arXiv text on the Siebert sentence |
| **Friedlander-Iwaniec ENT PDF** | `msp.org/ent/2022/1-1/ent-v1-n1-p02-s.pdf` | **HTTP 200**, read in full |
| **Xi-Zheng arXiv PDF** | `arxiv.org/pdf/2404.01003` | **HTTP 200**, read at the citation |
| *Opera de Cribro* itself, and Iwaniec-Kowalski Ch. 6 | not attempted beyond the above | **NOT REACHED.** Both are copyrighted monographs with no open location. What substitutes, and is stated as a substitute rather than as the thing asked for, is Friedlander and Iwaniec's own 2022 survey, which cites *Opera de Cribro* §12.1 (the linear sieve chapter) in the same paragraph as Siebert. **The `κ = 2` sifting-limit-example question in those two books is a different question from this one and remains where `sift-limit-attack.md` §2 left it** |

**University mirrors.** None found. The volume is a 1983 Birkhäuser memorial
collection with no open deposit; searching for it surfaces only the Springer
chapter landing pages and the Amazon listing for the unrelated Halberstam and
Richert *Sieve Methods* reprint.

---

## 7. Consequence for the repo, stated but not applied

No file was edited. What a writer with the mandate should do:

1. **`research/SEARCH-CONVENTIONS.md` §3, the row "Published `κ = 2` extremal
   example ... None found":** no correction. Optionally, one clause added to its
   "what was actually searched" cell recording that **Siebert 1983 was checked
   on 2026-08-28 and is `κ = 1`** (linear Selberg sieve, Jurkat-Richert `f`,
   `F`), so that the next wave does not spend the same budget. The row's
   substance is unchanged.
2. **`paper/wall-note.md` §2 Face 4, "no barrier result":** unchanged, no
   citation owed.
3. **`research/sift-limit-attack.md` §2:** unchanged.
4. **`recon-0828-jacobsthal.md` A13:** mark CLOSED, `κ = 1` only, pointing here.
   Its §"not checked at all" bullet on Siebert is discharged in the testimony
   sense and still open in the read-the-text sense.
5. **`TODO.md` item 0's `Ledger:` line:** add `Q-lit-siebert` (see the gate-debt
   note at the top).

*This note states current understanding, is HELD pending an adversarial pass,
opens no route, and closes one check. Its verdict rests on three third-party
statements and not on the chapter, and any future contradiction from the chapter
itself outranks everything here.*
