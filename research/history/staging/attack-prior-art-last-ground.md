# Prior art: the last unsearched ground

<!-- ledger
id: Q-prior-art-last-ground
status: ANSWERED
todo: none
question: Is MathSciNet reachable, and does the two-class upper-bound absence survive a complete title enumeration?
verdict: MR Lookup answers author/title/journal/year queries free (bibliographic fields only, no review text or MSC), so SEARCH-CONVENTIONS section 5 needs correcting; the standing sentence survives, since the complete MathSciNet title record for Jacobsthal contains every published upper bound and every one is one class per prime, and Holt's 2022 book is in no bibliographic database.
-->

*Attack 6 of 10, overnight wave 2026-08-18/19. Script:
`research/attack-prior-art-last-ground.js` (embedded tail, `code-sha256`
`86b326e5…`, `out-sha256` `f85b022f…`, 203 network calls).*

---

## Summary

**MathSciNet is reachable, and `SEARCH-CONVENTIONS.md` §5 needs correcting.**
The subscription UI does redirect to LibLynx. The index does not: **MR Lookup**
(`https://mathscinet.ams.org/mrlookup`) answers author/title/journal/year queries
free, reports the **total** number of matching MathSciNet documents, and returns
three as BibTeX. Six calibration probes all returned their known positives. It
searches bibliographic fields only — no review text, no abstracts, no MSC — and
that limit is the honest statement of what remains uncovered.

**The one sentence still stands.** The complete MathSciNet title enumeration for
`Jacobsthal` (19 records for "Jacobsthal function" 1900–2026; 39 for
"Jacobsthal" pre-1990) contains **every published upper bound on the object, and
every one of them is one class per prime**: Erdős 1962, Kanold, Vaughan 1976/77,
Stevens 1977, Iwaniec 1978, Costello–Watts 2015. zbMATH's review-text search
adds nothing at two classes. Kalmynin–Konyagin 2024 is a **lower** bound
(abstract verified); FKMPT's `|I_p|` is "bounded and about 1 on average" and is
also a lower bound. `G₂(x#) ≪_ε x^{4.26645+ε}` remains the first published upper
bound of any exponent for the two-class problem.

**Holt's 2022 book is closed as far as any legitimate route reaches.** It is
**self-published** — Independently Published, 212 pp, ISBN 9798831607314 — which
is why MathSciNet, zbMATH and Crossref all return zero. Four of Holt's own
artifacts were retrieved and read instead: his 32-page exercise companion, the
JMM2024 talk of the same title, the JMM2025 talk, and the 2015 survey talk.
Across all four: **`Jacobsthal` 0, `maximum gap` 0, `upper bound` 0, `spacing`
0.** The novelty boundary is unchanged.

**`u_sup`, item H: half of it is folklore and now proved so.** L4's Fejér-mass
identity **is** the classical `Σ_{k=1}^{n−1} sin²(πkm/n)/sin²(πk/n) = m(n−m)`,
verified in-script for all `2 ≤ n ≤ 60`. Claim it as a re-derivation, never as
new.

---

## 1. MathSciNet: the channel, and the correction to §5

### 1a. What was found

`SEARCH-CONVENTIONS.md` §5 reads: *"**MathSciNet remains UNSEARCHED** — it is
paywalled and redirects to LibLynx, and **no substitute was run in its place**,
which is the honest form of that gap."* The first half is verified and the
conclusion is wrong. [VERIFIED here]

- `GET /mathscinet/search/publications.html?query=Jacobsthal` → HTTP 200 after
  redirect to `connect.liblynx.com/wayf/…`. The **UI** is gated. (§0a of the run.)
- `POST https://mathscinet.ams.org/mrlookup` with form fields
  `au, ti, jrnl, year, ipage, fpage, format=bibtex` → **HTTP 200 with
  MathSciNet records**. No subscription, no institutional proxy.

MR Lookup exists so that a bibliography entry can be resolved to an MR number.
It is not advertised as a search interface, but it is one: it prints
`Retrieved first N documents out of M`, which hands over the **total count** for
any query, and it returns the three most recent as BibTeX with `MRNUMBER`,
`AUTHOR`, `TITLE`, `JOURNAL`, `YEAR`.

### 1b. Calibration, in the same session (all six PRESENT)

| probe | query | returned |
|---|---|---|
| C1 | `au=Iwaniec ti=Jacobsthal` | **MR499895**, *On the problem of Jacobsthal*, Demonstratio Math., 1978 |
| C2 | `ti=polynomial analogue of Jacobsthal function` | **MR4727548**, Kalmynin & Konyagin, Izv. Ross. Akad. Nauk Ser. Mat., 2024 |
| C3 | `au=Maynard ti=Long gaps between primes` | **MR3718451**, Ford–Green–Konyagin–Maynard–Tao, J. Amer. Math. Soc., 2018 |
| C4 | `ti=Long gaps in sieved sets` | **MR4195744** (JEMS 2021) **and MR4592874** (Corrigendum, JEMS 2023) |
| C5 | `au=Diamond ti=higher-dimensional sieve` | **MR2458547**, Diamond & Halberstam, 2008 |
| C6 | `au=Kourbatov ti=Maximal gaps between prime k-tuples` | **MR3065331**, J. Integer Seq., 2013 |

Every negative below was produced on a channel that returned all six.

**C4 is a finding in itself.** *Long gaps in sieved sets* carries a **2023
corrigendum, MR4592874**, which this corpus does not cite anywhere. Anything
resting on FKMPT should check which statement survives it.

### 1c. What MR Lookup does NOT cover — the residual gap, stated plainly

It searches **bibliographic fields only**. Not the review text, not abstracts,
not the MSC classification, and it returns at most three documents per query.
**A two-class bound proved inside a paper whose title does not announce it is
invisible to this channel.** That is exactly the failure mode
`research/SEARCH-CONVENTIONS.md` §2 warns about, and it is why §3 below runs
zbMATH's API, which *does* index review text, as the complement rather than as a
substitute. Full MathSciNet — reviewer prose, MSC browsing, citation graph —
remains unreached, and the honest form of that is: **the title index is now
searched; the review index is not.**

### 1d. The `year` field has two semantics

A bare year (`1978`) filters exactly. A range (`1900-1963`) is read as a **lower
bound**, `year ≥ 1900`. Verified: `ti="Jacobsthal function"` returns **19** for
`1900-1963`, **18** for `1964-2026`, **16** for `1996-2026` — monotone
decreasing, which a genuine range cannot be. Read as cumulative counts
`N(y) = #{docs with year ≥ y}`, the per-window count is `N(a) − N(b+1)`, and a
three-document window becomes a **complete enumeration** at logarithmic cost.
The script's `enumerateByYear` does this; the first version assumed a range and
silently reported three of nineteen.

---

## 2. The two-class upper bound: does the one sentence survive?

### 2a. The complete MathSciNet title record

`ti="Jacobsthal function"`, 1900–2026, **enumeration complete, 19 distinct MR
records** [VERIFIED]. The number-theoretic ones:

| year | MR | author | title |
|---|---|---|---|
| 1962 | MR146125 | Erdős | On the integers relatively prime to `n` and on a number-theoretic function considered by Jacobsthal |
| 1976/77 | MR453677 | Vaughan | On the order of magnitude of Jacobsthal's function |
| 1977 | MR427212 | Stevens | On Jacobsthal's `g(n)`-function |
| 2009 | MR2476571 | Hagedorn | Computation of Jacobsthal's function `h(n)` for `n < 50` |
| **2015** | **MR3315513** | **Costello & Watts** | **An upper bound on Jacobsthal's function** (Math. Comp. 84, 1389–1399) |
| 2018 | MR3783885 | Mercer | Dirichlet's theorem and Jacobsthal's function |
| 2024 | MR4727548 | Kalmynin & Konyagin | A polynomial analogue of Jacobsthal function |

The remaining twelve are the Jacobsthal *number/sequence* and *sum* literature —
`k`-Jacobsthal polynomials, bent functions, state complexity — a different
Jacobsthal entirely.

`ti="Jacobsthal"` pre-1990, **39 records**, adds the classical layer: **Kanold
MR209247 (Math. Ann. 1967), MR384670 (1975), MR453672 (Monatsh. Math. 1977)**,
Cohen MR147436 (1962/63), Cai MR1071110 (1990), and **Iwaniec MR499895 (1978)**.
*(One overflow: 1979 has 4 documents against a 3-document window; all four are
Jacobsthal-**sum** papers by Evans and by Berndt–Evans, so nothing is hidden
there.)*

**Every upper bound in that list is one class per prime.** [MEASURED over the
complete enumeration] Costello–Watts's own abstract, retrieved from the AMS
listing: *"The function `h(k)` represents the smallest number `m` such that every
sequence of `m` consecutive integers contains an integer coprime to the first
`k` primes."* One class per prime, by definition.

### 2b. The near misses, checked at source

- **Kalmynin–Konyagin 2024 is a LOWER bound.** Abstract, `arXiv:2302.00459` abs
  page: *"We prove a lower bound `j_f(P(y)) ≫ …`"*. No upper-bound theorem
  anywhere in the abstract. This confirms `PRIOR-ART.md`'s reading from the other
  direction: their object is not merely a different fibre, it is a different
  inequality.
- **FKMPT, *Long gaps in sieved sets*.** Abstract, `arXiv:1802.07604`: *"For each
  prime `p`, let `I_p ⊂ ℤ/pℤ` denote a collection of residue classes modulo `p`
  such that the cardinalities `|I_p|` are bounded and about 1 on average."*
  Bounded per prime — so a two-class instance is admissible — but the theorem is
  a **lower** bound on gaps. It does not bound `G₂` above.
- **Maier–Pomerance 1990, *Unusually large gaps between consecutive primes*, is
  the earliest two-classes-per-prime device in print, and it is also a lower
  bound.** zbMATH review, Zbl id 4158747, read this session: *"In previous
  approaches a sieve argument was used in which certain primes were employed to
  eliminate a single integer only. The new idea is to show that a finite
  proportion of these primes can in fact delete two integers."* This should be
  cited whenever the corpus describes two-classes-per-prime as an unusual
  configuration — it is not; it is thirty-six years old on the Erdős–Rankin side.
  It bounds nothing above.
- **Costello–Watts's withdrawn precursor**, `arXiv:1209.3464`, *Jacobsthal's
  function and a generalisation of Euler's totient*: withdrawn for an error on
  p. 6. Recorded so it is not mistaken for a live one-class improvement.

### 2c. Verdict on the standing question

**[ABSENT] No published upper bound, at any exponent, for a covering problem with
two residue classes per prime.** Channels: **MathSciNet's title index**, searched
by complete enumeration of `Jacobsthal` and of `Jacobsthal function`, and
**zbMATH's full record including review text**. Owning conventions from
`research/SEARCH-CONVENTIONS.md` §1 — A144311's *"longest sequence of consecutive
integers, each equal to 1 or −1 modulo at least one of the first n primes"*, the
*paired Jacobsthal function*, and MathOverflow 88323's *bounded number of residue
classes per prime* — were the queries, not our vocabulary. **Calibration for this
negative is the positive it sits beside**: the identical queries return every
ONE-class upper bound in existence (Iwaniec MR499895, Costello–Watts MR3315513)
and the whole two-class LOWER-bound literature (Maier–Pomerance, FKMPT,
Kalmynin–Konyagin). A channel that finds all of those and no two-class upper
bound is reporting an absence, not a failure.

> **So the one sentence stands after this sweep.** `G₂(x#) ≪_ε x^{4.26645+ε}` is
> the first published upper bound of any exponent for the two-class problem.
> Two qualifications that were already true and are not weakened here: the
> *technique* is Brady's (MathOverflow 52890, dimension one), and the *object*
> is Carter's A144311 (2008) inside Erdős's stated multi-residue extension of
> #687. What is ours is the dimension-2 instantiation and the exponent.

### 2d. One correction to the record, found in passing

**Brady's thesis IS in MathSciNet: MR4239958, Zarathustra Elessar Brady,
*Sieves and Iteration Rules*, 2017.** `PRIOR-ART.md` records it as fetched from
`notzeb.com/phd-thesis.pdf` with no reviewed citation. It has one. The MR number
should go into that bullet.

---

## 3. Holt's 2022 book — TODO list 000

### 3a. Why no bibliographic database has it

| channel | query | result |
|---|---|---|
| MathSciNet | `ti="Patterns among the primes"` | **0** |
| MathSciNet | `au="Holt" ti="Eratosthenes"` | **0** |
| MathSciNet | `au="Holt Fred"` | **9 documents, all polytopes and random graphs** (MR2419218, MR2074846, MR1955718 …) |
| zbMATH | `Patterns among the primes Eratosthenes sieve` | **0** |
| zbMATH | `Holt cycle of gaps primorial` | **0** |
| Crossref | bibliographic query | no matching record |
| OpenLibrary | `Patterns among the Primes` | **1 edition** |

**OpenLibrary `/isbn/9798831607314.json`, read this session:** `"pagination":
"212"`, `"publish_date": "2022"`, `"publishers": ["Independently Published"]`,
`"title": "Patterns among the Primes"`, `"subtitle": "A Study of Eratosthenes
Sieve"`, `"ebook_access": "no_ebook"`, `"has_fulltext": false`.

**It is a KDP self-publication.** Holt cites it himself that way — `arXiv:2405.03540`
reference 4, from the PDF: *"F.B. Holt, Patterns among the Primes, KDP, June
2022."* That is why MathSciNet and zbMATH are silent: not reviewed, not
indexable. **MathSciNet adds nothing at all to this question**, and that is the
clean answer to whether the unsearched channel was hiding the book.

*Google Books returned HTTP 429 (daily quota exhausted for the shared project) on
every attempt this session, so that channel is **UNTESTED**, not negative. It is
the one route to a "look inside" table of contents that was not exercised.*

### 3b. What was read instead — four Holt artifacts, in full [CUSTODY]

Since the book itself cannot be read without buying it, the reachable proxies
were retrieved from his own site and read cover to cover.

| artifact | URL | pages | sha256 |
|---|---|---|---|
| *Discovering Patterns among the Primes — A book of exercises*, Edition 9 May 2024 | `primegaps.info/_files/ugd/c8e255_4866c3980fcd460d8cf94656e2882ed2.pdf` | 32 | `841da900…dee002bd` |
| JMM2024 talk, *Patterns among the Primes: Eratosthenes sieve as a discrete dynamic system*, Jan 2024 | `…c8e255_d9d51877e6444964834fc65d1a226000.pdf` | 16 | `e83de783…afe6cf8e` |
| JMM2025 talk, *All admissible k-tuples arise and persist in Eratosthenes sieve* | `…c8e255_91246f4b5ad24f97b28015e21c89f243.pdf` | 17 | `06ba8c05…5f2f770a` |
| *The combinatorics of gaps between prime numbers* (Simon Fraser, 2015), Holt with Rudd | `…c8e255_640efaa85743436193d6a8cab9b8590d.pdf` | 21 | `d67aef5e…c43d99f5` |

The exercise book is the companion to the 2022 book and carries the same title
and the same objective statement, quoted from its p. 1: *"Objective: to study
Eratosthenes sieve as a discrete dynamic system in order to develop models for
the relative populations of the gaps among the candidate prime numbers, across
stages of the sieve."*

**Term counts across all four, case-insensitive** [MEASURED]:

| term | exercise book | JMM2024 | JMM2025 | SFU 2015 |
|---|---|---|---|---|
| `Jacobsthal` | 0 | 0 | 0 | 0 |
| `maximum gap` / `maximal gap` / `largest gap` | 0 | 0 | 0 | 0 |
| `upper bound` | 0 | 0 | 0 | 0 |
| `spacing` | 0 | 0 | 0 | 0 |
| `twin` | 0 | 0 | 1 | 2 |
| `horizon` | 3 | 0 | 0 | 0 |

### 3c. The book's shape, from the video series named after it

Holt's YouTube playlist `PL-EGF_Bj6IWuyOee3j7M19oXtx7zh12U1` is eight parts, each
titled *Patterns Among the Primes N*, resolved through the oEmbed endpoint:

> 1 Intro · 2 Cycles of Gaps · 3 Dynamics · 4 relative populations ·
> 5 Survival · 6 k tuples · 7 constellation models · 8 expected last digits

That is the arXiv corpus in book order, and it maps one-to-one onto what
`PRIOR-ART.md`'s correspondence table already assigns to him. **There is no
chapter on maximum gaps, none on the Jacobsthal function, and none on twin-slot
spacing.**

### 3d. Where the book is actually used, in his own papers

The book appears in the reference lists of `2603.25915` [6], `2405.03540` [4],
`2502.20470` [4] and `2605.19165` [Hol22]. **In-text it is cited exactly once**,
in `2605.19165` p. 5250 of the extracted text: *"Recall from our earlier work
[Hol22, Hol25] that the relative populations can only be compared across
admissible constellations of the same length J."* Relative populations — the
thing the corpus already attributes to him.

And his one engagement with the Jacobsthal function, from `2603.25915` §4.1
(extracted text lines 34256–34260, 34292–34296): *"The maximum gap `g_max(p_k#)`
in the cycle `G(p_k#)` defines Jacobsthal's function [3]"* — where **[3] is
Hagedorn's 2009 computation**, one class per prime — followed by *"From
Jacobthal's function we know that large gaps do occur in the cycles `G(p#)`. If
Legendre's conjecture holds, then the largest gaps `g ≥ 4p + 6` have to occur
beyond the horizon of survival."* He then poses `g_max(ΔH(p), p)` as a
**curiosity**: *"What are the trends of the maximal gaps `g` that occur within
`ΔH(p)`?"* A question, not a bound.

### 3e. Verdict

**The novelty boundary is unchanged**, and now rests on the book's own author's
description of it rather than on inference from the arXiv corpus alone:

> The cycle, the recursion, the fusions, the population models, the survival
> interval and the k-tuple work are his. **The twin-slot SPACING is not in his
> corpus, and no upper bound on a maximum gap is either** — searched in the
> convention that owns the object, `research/SEARCH-CONVENTIONS.md` §1's row for
> the two-class Jacobsthal at primorials, and against his own titles, his own
> slides, his own exercise companion and his own chapter list.

**TODO list 000 can be closed as "closed by proxy, one route untested"**: the
book is unreviewed and self-published, four of the author's own artifacts
covering the same material were read in full, and the only unexercised route is a
Google Books preview blocked by an API quota. Buying it would settle the last
percent; nothing in the reachable evidence suggests it would change the answer.

---

## 4. `u_sup` and the Fejér-mass identity — TODO item H

Item H: *"a mean-square estimate for signed Rosser weights over a complete period
is close to standard large-sieve and mean-value territory, and the Fejér-mass
identity `Σ_{a ≢ 0 mod e} F_H(a/e) = h(e−h)` is elementary enough to be folklore.
**Assume both are known until searched.**"*

### 4a. The Fejér-mass identity is folklore, and this is now proved rather than suspected

`F_H(a/e)` depends on `H` only through `h = H mod e`, so L4 of
`attack-beta2-01-lemmaV-meansquare.md` is, term for term, the classical identity

```
    sum_{k=1}^{n-1} sin^2(pi k m / n) / sin^2(pi k / n)  =  m(n - m),      0 <= m <= n.
```

The script verifies the identification rather than asserting it: **all
`2 ≤ n ≤ 60` and `0 ≤ m ≤ n`, max absolute error `1.296e-11`**; and the four
`(H, e)` reductions `(85,13) → 42`, `(169,30) → 209`, `(40,7) → 10`,
`(529,23) → 0` land on `h(e−h)` to `7.11e-15` or better. [VERIFIED]

That identity is orthogonality on `ℤ/nℤ` counting pairs — it is the same
computation as `Σ_{a mod e} F_H(a/e) = e·#{(m,n) ∈ [1,H]²: e | m−n}`, which is
the proof L4 already gives. **This is textbook, and no channel needs to certify
it**; the corpus should present L4 as a re-derivation of a standard identity, in
the same voice it uses for the Copying Theorem and Schemmel. The one thing L4
does add is stated correctly already: it **proves (V1) and (V2) with the equality
case**, which `sift-limit-lemmaV.js` asserts without proof. That corollary is
work; the identity under it is not.

### 4b. The mean-value half: standard territory, and the searches say so

MathSciNet's title index: `ti="mean value of sieve weights"` **0**,
`ti="large sieve Rosser"` **0**, `ti="linear sieve mean value"` **0**,
`ti="remainder term Selberg sieve mean square"` **0**,
`ti="variance of sifted sequences"` **0**. What it does return is the shape of
the neighbourhood: `ti="Rosser sieve"` **8 documents**, `ti="bilinear forms error
term sieve"` **2** — Salerno MR1133234, *Iwaniec's bilinear form of the error
term in the Selberg sieve*, Acta Arith. 1991, and Salerno–Vitolo MR1283373.
zbMATH `large sieve sieve weights` returns **34**, headed by Bombieri–Friedlander–
Iwaniec (Acta Math. 1986), Iwaniec–Laborde (1981) and GPY (Ann. Math. 2009).

**These title-level zeros are NOT an absence claim** and must not be read as one:
`research/SEARCH-CONVENTIONS.md` §1 carries **no owning-convention row for the
`u_sup` representation**, and a technique that lives inside a paper about
something else has no title to be found under. What the searches establish is
weaker and still useful: the object sits in the middle of a dense, named,
century-old neighbourhood (large sieve, bilinear error terms, Barban–Vehov /
Motohashi / Graham mean squares of Selberg weights), and **item H's instruction
to assume it known is the right default**.

### 4c. What this costs, which is nothing

The `u_sup` route is **already closed** — it rises at all eight steps over
`z = 13..43` to 3.2026 and its bounded family's best asymptote is 5.46, above
`β₂` (`sift-limit-attack.md` §7e). So the novelty of the representation is moot
for the exponent. The reason to settle it anyway is publication hygiene: **the
mean-square Lemma V and its L1–L5 chain must be presented as an assembly of
standard parts** — Parseval, Ramanujan sums, the Fejér kernel, a triangle
inequality — whose only claim is (V1)/(V2) with the equality case, plus the
measured `B(z,s) ∈ [1.27, 1.68]`. Item H's `B` half is already discharged to
*Opera de Cribro* Lemma 6.18 and Friedlander `arXiv:2607.05707`; the Fejér half
is discharged here, to the sine identity.

---

## 5. Corrections and additions the adjudicator should apply

**To `research/SEARCH-CONVENTIONS.md` §5**, replacing the MathSciNet bullet:

> - **MathSciNet: PARTIALLY SEARCHED 2026-08-18/19.** The subscription UI is
>   gated (it redirects to LibLynx), but **MR Lookup**,
>   `POST https://mathscinet.ams.org/mrlookup` with `au/ti/jrnl/year/format=bibtex`,
>   is free, answers against the MathSciNet index, prints the **total** match
>   count and returns three records as BibTeX. Six calibration probes pass
>   (MR499895, MR4727548, MR3718451, MR4195744, MR2458547, MR3065331). Gotcha:
>   `year=1900-1963` is a **lower bound**, not a range, so cumulative counts give
>   a complete enumeration by differencing. **It searches bibliographic fields
>   only — no review text, no abstracts, no MSC — so a result proved inside a
>   paper whose title does not announce it is still invisible.** The complete
>   title enumerations for `Jacobsthal function` (19 records) and `Jacobsthal`
>   pre-1990 (39) are in `history/staging/attack-prior-art-last-ground.md` §2a.

**To §5, replacing the Holt bullet:**

> - **Holt's 2022 book: closed by proxy 2026-08-18/19, one route untested.** It
>   is **self-published** (Independently Published / KDP, 212 pp,
>   ISBN 9798831607314), which is why MathSciNet, zbMATH and Crossref all return
>   zero — Holt's entire prime programme is unreviewed. Four of his own artifacts
>   were read in full instead (exercise companion, JMM2024, JMM2025, SFU 2015);
>   across all four, `Jacobsthal` 0, `maximum gap` 0, `upper bound` 0,
>   `spacing` 0. His eight-part video series named after the book gives its
>   chapter order: Intro, Cycles of Gaps, Dynamics, relative populations,
>   Survival, k-tuples, constellation models, expected last digits. **Untested:
>   a Google Books preview (HTTP 429, quota, all session).**

**To §5, a new bullet:**

> - **zbMATH's API returns HTTP 404 for a zero-result query**, with
>   `internal_code: "successful access. No results found."`. That is a negative,
>   not a broken channel. Separately its matching narrows sharply with query
>   length — `Jacobsthal function` returns 187 and includes Ziller–Morack, while
>   `paired Jacobsthal function` returns 0 for a record whose title contains all
>   three words. **Long-query zeros on zbMATH are not evidence of absence.**

**To `research/PRIOR-ART.md`**, three additions:

1. The Brady bullet: add **MR4239958** — the thesis is reviewed in MathSciNet,
   which that bullet implies it is not.
2. The FKMPT reference wherever it appears: there is a **2023 corrigendum,
   MR4592874, J. Eur. Math. Soc.**, uncited anywhere in this corpus.
3. A new row under the two-class discussion: **Maier–Pomerance, *Unusually large
   gaps between consecutive primes*, 1990** — the earliest two-classes-per-prime
   sieve device in print (zbMATH review, quoted in §2b above). Lower bound only,
   but it retires any suggestion that the configuration is novel.

**To `TODO.md`:** item **000** closes (see §3e); item **H**'s Fejér half closes
(see §4a), leaving only the standing instruction that the `u_sup` mean-value
estimate be written as standard-parts assembly.

---

## 6. What this attack did not reach

- **MathSciNet review text, abstracts and MSC.** MR Lookup does not index them.
  This is the residual, and it is where a two-class bound buried in a paper about
  something else would still be.
- **Google Books.** HTTP 429 for the whole session on the shared API project. The
  only untested route to the 2022 book's actual table of contents.
- **The book itself.** Not bought, per the brief.
- **Semantic Scholar.** Not run; OpenAlex and Crossref were, and both are
  strictly worse than zbMATH for review-level coverage of pre-2000 number theory,
  which is where the classical Jacobsthal literature lives.

---

*Ledger note: `research/attack-prior-art-last-ground.js` carries the embedded
run and nine numbered readings, and `node research/qc.js embeds` is clean on it.
Every `qc.js` finding open while this document was written sits in `scripts` and
belongs to a sibling attack in this wave whose report was not yet filed
(uncited-script, no-banner-title); the count fell from 13 to 6 as siblings landed
during the session. **This document's own script is referenced here, titled, and
embedded, and contributes nothing to the total.***
