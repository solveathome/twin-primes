# Audit: the sources SEARCH-CONVENTIONS §5 lists as unreached

<!-- ledger
id: Q-unreached-sources
status: ANSWERED
todo: none
question: What is actually in the three sources SEARCH-CONVENTIONS section 5 lists as unreached?
verdict: The 2009 SeqFan thread on A144311 does not exist, now a read negative over 19,964 archived messages with zero hits; Paseman's n is the number of distinct prime factors and at that reading his shape is asymptotically weaker than our x^{4.2665}; MathSciNet stays paywalled and unswept.
-->

**Date:** 2026-08-18. **Scope:** the three items in `SEARCH-CONVENTIONS.md` §5
that had never been reached — the 2009 SeqFan thread, Paseman's heuristic on
MathOverflow 88323, and the zbMATH / MathSciNet / non-English sweep. Read-only
audit; no body document was edited.

**Headline.** The 2009 SeqFan thread on A144311 **does not exist**, and that is
now a read negative rather than an unread one: 141 months of the SeqFan archive
were recovered from the Internet Archive and searched — **19,964 messages,
zero hits** — including the complete November 2009 mailbox. Paseman's heuristic
has been decided: his `n` is the **number of distinct prime factors**, confirmed
four ways including from his own later paper, and at that reading his shape is
**asymptotically weaker than our `x^{4.2665}`** under every logarithm
convention. zbMATH is open and was swept; **MathSciNet is paywalled and was
not**; Fischer's German and Rivera's Spanish-proposer pages were retrieved in
full and are about a **different object** with the same symbol `G₂`.

**The unwelcome find is §2f.** MathOverflow 37679 answer 52890 (zeb, 2011)
already derives `j(x#) ≪ x^{4.032}` from a sieve's error exponent — our
statement's exact shape at dimension one, fifteen years old and public. The
upper-bound novelty claim survives, but it narrows: what is unpublished is the
**dimension-2 instantiation**, not the shape and not the technique. See §5 for
the wording that survives adversarial reading.

---

## 0. Calibration, before any negative below is read as evidence

Four channels were used. Each was proved live with a known positive in the same
session, on the same channel, before any negative was recorded.

| channel | form that works | known positive run | returned |
|---|---|---|---|
| OEIS | `curl "https://oeis.org/search?q=<seq>&fmt=text"` | `2,6,18,30,66,150,192,258` | **A288815**, full record |
| OEIS | same | `2,4,6,10,14,22,26,34,40,46,58,66` | **A048670**, full record |
| SeqFan mbox (Wayback) | `web.archive.org/web/<ts>if_/http://list.seqfan.eu/pipermail/seqfan/<month>.txt.gz` | message count in `2009-November` | **322 messages**, `Nov 1 00:53:59` → `Nov 30 23:04:17` |
| StackExchange | `api.stackexchange.com/2.3/...&filter=withbody` | MO 88323 | question + 2 answers + 9 comments |
| zbMATH Open | `api.zbmath.org/v1/document/_search?search_string=...` | `maximal gaps twin primes` | **Kourbatov, JIS 2013** (the §1 known positive) |
| zbMATH Open | same | `paired Jacobsthal` | **Ziller–Morack ×2** (the §1 known positive) |
| arXiv | `export.arxiv.org/api/query?...` (https, not http — http 301s) | `all:"Westzynthius"` | 1 entry, Paseman 1311.5944 |

Two channel facts worth recording so the next wave does not rediscover them:

- **`list.seqfan.eu` is dead from here.** DNS resolves to `92.243.17.179`;
  ports 80 and 443 both `Failed to connect`. `WebFetch` gets the same
  `ECONNREFUSED`. This is not the four Internet Archive 503s of the earlier
  attempt — the archive host itself is down. The route that works is the
  Wayback **CDX API** (`web.archive.org/cdx/search/cdx?url=...&output=text`),
  which was up throughout.
- **zbMATH's REST API returns HTTP 404 for a zero-result query**, and its
  `search_string` is an AND over all terms. A 404 therefore means "no document
  matches every term", not "the channel is down" and not "the subject is
  absent". Negatives below use two-word queries for this reason.

---

## 1. TARGET 1 — the 2009 SeqFan thread on A144311

### 1a. What was recovered

The `list.seqfan.eu` pipermail archive is preserved in the Internet Archive as
per-month gzipped mailboxes. The CDX API lists **160 monthly mailboxes**, from
`1999-February` to `2023-January`. **142 of the 160 were recovered** — **19,964
messages**, ~41 MB of plain text. (The 18 misses are Wayback rate-limiting, not
gaps in the archive; they retry successfully. Fetch with parallelism ≤ 3 —
`-P 8` gets throttled and silently writes zero-byte files, which then read as a
clean negative and are not one. That trap was hit once in this audit and caught
only because the `A048670` calibration went to zero with it.)

One more channel trap, recorded because it nearly cost the month either side of
the target: **`collapse=urlkey` returns only the FIRST snapshot of a URL, and
for a monthly mailbox the first snapshot is often a partial month.**
`2009-October.txt.gz` first appears at `20091001162347` at 2,242 bytes — the
mailbox as it stood on 1 October, 2 messages. Drop the collapse and take a later
timestamp (`20201229051659`) and it is 614,790 bytes, **309 messages, Oct 1
00:02:09 → Oct 31 23:03:13**. Same URL, same status 200, 275× the content.

The month that matters was recovered in full:

- **`2009-November.txt.gz`**, Wayback timestamp `20141123141637`, 148,299 bytes
  compressed / **631,923 bytes plain, 18,166 lines, 322 messages**, running from
  `From njas at research.att.com  Sun Nov  1 00:53:59 2009` to
  `From franktaw at netscape.net  Mon Nov 30 23:04:17 2009`. **45 messages are
  dated 17–19 Nov 2009**, so the window around Alekseyev's 18 November credit is
  densely covered.

### 1b. The result

Searched the complete November 2009 mailbox for every form of the object:

| pattern | hits |
|---|---|
| `A144311` | **0** |
| `144311` (bare, in case of a typo or a URL) | **0** |
| `1 or -1` (the owning-convention phrase) | **0** |
| `primorial` | **0** |
| `Jacobsthal` (case-insensitive) | 2 lines, **both in an unrelated thread** |

The two `Jacobsthal` lines are in a floretion thread of Creighton Dement's about
the *Jacobsthal numbers* `1, 3, 5, 11, 21, 43, 85, 171, 341, 681, …` (A001045),
printed a few lines above as `4dia[I]forseq`. Nothing to do with the Jacobsthal
*function*. No message in the month carries a subject line containing
"Jacobsthal".

**Alekseyev's own traffic that month, by subject.** He posted **10 messages** to
SeqFan in November 2009:

```
Sun,  1 Nov  Re: A129066: First term non-multiple of 5?
Tue, 10 Nov  Re: Surprising Patterns in Tangent and Secant Numbers
Thu, 12 Nov  Re: Surprising Patterns in Tangent and Secant Numbers
Fri, 13 Nov  near duplicates A132209 and A142463
Mon, 16 Nov  Re: n-cycles for 24-cell and 16-cell graphs
Mon, 16 Nov  Re: Another error?
Thu, 19 Nov  Re: pebbles sequence
Sun, 22 Nov  Re: Generally known (to those who know of such things)
Thu, 26 Nov  Re: Primes p = nk-1 dividing Fibonacci( k )
Fri, 27 Nov  Re: Primes p = nk-1 dividing Fibonacci( k )
```

**He posted nothing at all on 18 November 2009**, and none of the ten messages
concerns A144311, primorials, Jacobsthal, or twin-prime-like admissible sets.

The adjacent months were recovered and searched the same way, with the same
result — `2009-October` (309 messages, Oct 1 – Oct 31), `2009-December` (290),
`2010-January` (193), `2008-October` (56): **zero hits for `144311` in all
four**.

### 1b′. The sweep was then widened to the whole archive, 1999–2023

Since the retrieval route worked, the negative was made as strong as the archive
allows. **142 months, 19,964 messages, ~41 MB, searched at once.**

Calibration on that same corpus, so the zero below is read against a live grep:

| pattern | hits |
|---|---|
| `Alekseyev` | 1033 |
| `primorial` | 192 |
| `A002110` | 40 |
| `Jacobsthal` | 30 |
| `A048670` | 1 |
| **`144311`** | **0** |
| `Andrew Carter` / `acarter09` | 0 |

The near-miss phrasings were then read by hand rather than counted.
`1 or -1` matches 22 lines across the archive; all 22 were opened and **none is
our object** — they are ±1 entries of an adjacency matrix, a Liouville-function
remark, `2^x - 3^y = ±1`, square roots mod 265, and so on. `consecutive
integers, each` matches nothing.

**Conclusion.** A144311 was never mentioned on the SeqFan mailing list, in any
month of it that survives, from 1999 to 2023 — not in 2009 when it was extended,
not in 2024 when Wang extended it further, and not by its author. The §5 bullet
is not "unread"; there is nothing to read.

### 1c. The A144311 revision history, all 23 revisions read

`https://oeis.org/history?seq=A144311` (plus `&start=10` and `&start=20`) yields
**every revision, #1 through #23**. All were read. The extension appears as:

- **#1**, `N. J. A. Sloane at Fri Jan 09 03:00:00 EST 2009` — 7 terms,
  `AUTHOR  Andrew Carter (acarter09(AT)newarka.edu), Sep 17 2008`.
- **#2**, `N. J. A. Sloane at Tue Jun 01 03:00:00 EDT 2010` — DATA goes from 7
  terms to 16, and the credit line
  `a(8)-a(16) from Max Alekseyev (maxale(AT)gmail.com), Nov 18 2009`
  appears in the same diff.

That is the whole of it. **No method note, no program, no algorithm, no
complexity remark and no bound appears anywhere in the 23 revisions.** There is
no OEIS Discussion entry before 2016. The published record likewise carries
nothing: the only `%C` line in the entry is `For n > 1, a(n) == 5 (mod 6)`.

The extension therefore reached OEIS by direct submission to Sloane in the
pre-wiki flat-file era, not through a list discussion. Revision #2's date of
Jun 2010 is a bulk re-publication, not the date of the work.

### 1d. Two by-catch findings from the revision log

**Wang's `a(23) ≥ 1859` witness, in full.** §5's last bullet is confirmed and can
now be quoted exactly. Revision #18 discussion, `Tue Nov 26 10:42`, 2024:

> `162791254787456816384305457582341 starts a sequence of 1859 consecutive`
> `integers, each of which is congruent to 1 or -1 modulo at least one of the`
> `first 23 primes. It is estimated that it will take 12 days (which is too`
> `long for me) to calculate a(23)`

and revision #19 discussion, `Tue Nov 26 10:47`:

> `it takes me about 17 hours to compute a(22)`

Those two timings are the only cost data anyone has published on this object.
They put the exact-ladder frontier at `a(22) = 1709` for about 17 CPU-hours and
`a(23)` at roughly 12 days by Wang's method.

**The one thing Alekseyev DID say about a ±1-mod-first-n-primes object, three
years later.** The archive sweep turned up no A144311 discussion, but it did
turn up the nearest neighbour, and it is his. SeqFan, `Wed, 22 Aug 2012`,
thread `[seqfan] Re: A214089`, Max Alekseyev to Jonathan Stauduhar:

> `The algorithm relies on the fact that`
> `a(n) == +1 or -1 (mod prime(i))`
> `for every i=1,2,...,n.`
> `Basically it tries all 2^n possibilities of choosing +1/-1's in the`
> `above congruences, combine them with Chinese Remainder Theorem, and`
> `search for a prime in the corresponding remainder class modulo the`
> `product of n primes.`

**A214089** is *"Least prime p such that the first n primes divide p²−1"* — the
same ±1-per-prime residue structure as our natal comb, but asking for one point
rather than the longest run. Its `%C` line, Alekseyev, Aug 22 2012, is worth
having in the vocabulary table:

> `The system of congruences x == +1 or -1 (mod prime(i)), i=1,2,...,n, has`
> `2^(n-1) solutions modulo A002110(n)`

Two things follow. First, this is a **new entry for the owning-convention map**
that §1 of `SEARCH-CONVENTIONS.md` does not have: A214089, with `Cf. A073917,
A103783`. It is in our two-class world and neither it nor A144311 references the
other. Second, it is the only description Alekseyev ever published of how he
attacks this residue structure, and it is **exhaustive `2^n` CRT enumeration** —
which is consistent with his A144311 extension stopping exactly at `n = 16`.
That is a plausibility argument about his 2009 method, not a statement by him
about it, and it must not be quoted as though it were.

**A144311 has no inbound OEIS cross-references.** The OEIS full-text search
`q=A144311` returns exactly one record — A144311 itself. So the directedness
problem recorded in §2 is worse than stated there: A144311 is not merely
unreachable by walking forward from A048670, it is unreachable by walking
*inward* from anywhere, because nothing in OEIS points at it. Its own `%Y` is
`Cf. A048670, A049300, A058989`, added by Alekseyev in 2024.

### 1e. What is honestly still unread

- **The SeqFan pipermail archive has month gaps.** Of the 300 months from
  1999-01 to 2023-12, Wayback holds a monthly mailbox for **160**. The gaps are
  almost all of 1999–2007, `2008-January` through `2008-September`, and most of
  2021–2023. **2008-October through 2020-December is unbroken** — which is the
  window that matters, since it contains both the 2009 extension and every later
  year.
- **September 2008, the month Carter submitted, is a genuine gap.** The
  archived `2008-September` thread index (Wayback `20230116213835`) says
  `Starting: Mon Sep 1 21:01:24 CEST 2008 / Ending: Thu Sep 4 12:19:22 CEST 2008
  / Messages: 25` — the pipermail archive itself stops on 4 September 2008 and
  resumes in October. Carter's 17 September submission falls inside that hole.
  The 25 surviving messages were read; none concerns A144311. So the correct
  statement is: **searched the surviving 2008-September archive and found
  nothing, and 5–30 September 2008 is not archived anywhere I could reach.**

---

## 2. TARGET 2 — Paseman's heuristic, and the comparison

### 2a. The artifact

MathOverflow **88323**, *Analogues of Jacobsthal's function*, asked by **Timothy
Foo, 2012-02-13**, score 2, tags `nt.number-theory`. Retrieved in full through
`api.stackexchange.com/2.3/questions/88323?site=mathoverflow&filter=withbody`
plus the `/answers` and `/comments` endpoints. Two answers, both Paseman
(88332 of 2012-02-13, score 6; 110369 of 2012-10-22, score 3), nine comments,
one linked question (37679).

Foo's object, in his own notation, is exactly ours at two classes:

> Let $f\in \mathbb{Z}[x]$. Define $g_f(n)$ to be the length of the shortest
> interval so that there always exists an $m$ in that interval with
> $(f(m),n)=1$. When $f(x)=x$, we recover the original Jacobsthal's function.

and in the original question, the framing that names the general family:

> But let's say that for each $p$, the number of congruence classes deleted is
> bounded by a constant.

### 2b. WHAT PASEMAN'S `n` IS — decided

**It is the number of distinct prime factors.** Four independent confirmations,
listed weakest to strongest:

1. **In the same answer, one paragraph above the bound.** "try using this
   perspective to show that if all the primes dividing $m$ are greater than $n$,
   **with $n$ being the number of distinct prime factors of $m$**, then
   $j(m) = n+1$."
2. **In the sentence that introduces the bound.** "I would look at data using
   small numbers first, **with $n$ the number of distinct prime factors of $m$**
   being slowly ramped up … should give you an upper bound for your analogous
   function like $O(2^{C\log n \log\log n})$".
   Note that the modulus is `m` throughout that answer, never `n` — so the two
   letters are not interchangeable in his text, and `n = ω(m)`.
3. **His own comment, 2016-02-10**, disambiguating for a reader who had made
   precisely the mistake of reading the bound against `log m`: "@Doug, note that
   the $m$ in the quote is special. The conclusion $j(m)=n+1$ for these special
   $m$ is a theorem of Jacobsthal."
4. **His own later paper.** arXiv **1311.5944v2**, *Updating an upper bound of
   Erik Westzynthius*, 2013-11-23, 17pp, which cites MO 88323 by number in its
   reading list. The abstract, from the PDF: "**Let $k > 2$ be the number of
   distinct prime divisors of a positive integer $n$.** … Letting $u(k)$ be the
   base $2$ $\log$ of this bound, Stevens showed $u(k)$ is $O((\log k)^2)$ …
   We use elementary methods similar to those of Stevens to get $u(k)$ is
   $O(\log k(\log\log k))$". That is the MO answer's `2^{C log n log log n}`
   with the letter changed from `n` to `k` and the meaning stated outright.

The 2013 paper is the follow-through Paseman promised in answer 110369, and it
carries the shape to an explicit constant. Its p. 12 gives

> a general bound of $g(n) < k^{3+3.81\log\log k}$ for $k > 2$

with `k = ω(n)`. That paper proves the **one-class** case only; it does not
prove the multi-class analogue, so the MO statement remains, as he wrote,
"a lengthy opinion … I have no proofs to offer at this time."

### 2c. The comparison, arithmetic shown

Setting. `m = x#`, so `k = ω(m) = π(x)`, `log m = θ(x) ~ x`, and `x ~ k log k`.

Our theorem: `G₂(x#) ≪ x^{4.2665}`.

Paseman's heuristic for the analogue: `2^{C log k log log k}`.

**Put both as a power of `k`.** This is the base-free form and it decides the
question on its own.

```
ours     :  x^4.2665 = (k log k)^4.2665      = k^(4.2665 + o(1))      exponent BOUNDED
Paseman  :  2^(C ln k ln ln k)               = k^((ln 2)·C·ln ln k)   exponent UNBOUNDED
```

The exponent of `k` in our bound is a constant, `4.2665`. The exponent of `k` in
his is `0.693·C·ln ln k`, which tends to infinity. So

```
Paseman / ours = k^(0.693·C·ln ln k − 4.2665)  →  ∞.
```

**Verdict: Paseman's heuristic is asymptotically weaker than our proven bound.**
This holds for every fixed `C > 0` and under every logarithm convention, because
`log log k → ∞` regardless of base.

The reading of `n` does not change the verdict either. Under the two wrong
readings:

- `n = log m ~ x`: `2^{C ln x ln ln x} = x^{0.693·C·ln ln x}` — again a power of
  `x` with unbounded exponent, against our fixed `4.2665`. Weaker.
- `n = m = x#`: `ln m ~ x`, so the bound is `2^{C·x·ln x}`, superexponential in
  `x` against our `x^{4.2665}`. Very much weaker.

**Where the crossover sits is not determinable**, and it should not be quoted as
if it were: `C` is unspecified ("My feeling is that C will be proportional to
the bound you put on the number of classes removed for each prime $p$"), and the
base of `log` is unspecified. Taking `C = 2` — the natural reading for our two
classes per prime — the crossover `0.693·C·ln ln k = 4.2665` sits at
`k ≈ 2.7 × 10⁹` primes under natural logs, and at `k ≈ 21` primes under base-2
logs. Two conventions, eight orders of magnitude apart. The asymptotic verdict
is robust; the finite-range verdict is not, and nothing should be built on it.

For orientation only, `log₂` of each bound at a few `x`, our `4.2665·log₂ x`
against `C = 2` in both conventions and against Paseman's *proved* one-class
`k^{3+3.81 ln ln k}`:

| `x` | `k = π(x)` | ours | `C=2`, ln | `C=2`, log₂ | 1-class explicit |
|---|---|---|---|---|---|
| 1e2 | 2.85e1 | 28.3 | 8.1 | 22.0 | 36.7 |
| 1e6 | 7.84e4 | 85.0 | 54.6 | 130.8 | 198.8 |
| 1e9 | 5.08e7 | 127.6 | 102.1 | 239.5 | 357.3 |
| 1e12 | 3.76e10 | 170.1 | 155.5 | 360.8 | 532.7 |
| 1e18 | 2.47e16 | 255.1 | 274.1 | 628.1 | 916.7 |
| 1e30 | 1.47e28 | 425.2 | 541.2 | 1225.4 | 1768.1 |

(Numbers produced ad hoc in this audit from `π(x) ≈ x/ln x · (1 + 1/ln x +
2/ln²x)`; they are illustrative of the shapes, and no claim rests on them.)

### 2d. The finding that actually matters, and it is not the verdict above

**Paseman also wrote down our shape, and got it right.** In the same paragraph,
before the `2^{C log n log log n}`:

> I too would expect some power of $\log m$ to be an upper bound for the maximum
> length of an interval of consecutive integers which happen to lie in the union
> of the removed classes.

At `m = x#`, `log m = θ(x) ≍ x`, so "some power of `log m`" **is** `x^{O(1)}`,
which is exactly the shape of our theorem. Our contribution against that
sentence is not the shape. It is the exponent and the proof.

That gives the correct three-line placement of our result:

| | one class | two classes |
|---|---|---|
| conjectured | `ω(n)^{1+ε}` — Vaughan, quoted by Foo in the question | — |
| proved | `j(n) ≪ (log n)^2`, i.e. `j(x#) ≪ x²` — Iwaniec 1978 | **`G₂(x#) ≪ x^{4.2665}` — ours** |
| expected, unproved | — | "some power of `log m`" — Paseman 2012 |
| proved, explicit but weak | `g(n) < k^{3+3.81 log log k}` — Paseman 2013 | — |

### 2e. Answer 110369, which had never been read here, contains a usable lemma

Paseman's second answer is not a bound on the analogue, but it hands over a
transference inequality attributed to Kanold's 1967 *Math. Annalen* 170 paper:

> for squarefree $n$ and nice divisor $d$ of $n$, let's write $f=n/d$, note that
> $f$ and $d$ are coprime, and finally that any $g(d)$ consecutive members of the
> sequence $1+tf$ as $t$ ranges over the integers have at least one member
> coprime to $d$ as well as coprime to $f$. This immediately leads to
> $g(n)\leq fg(d)$.

He states it for the one-class `g`, and states in the same answer that he
"suspect[s] Timothy can use them for his analogues, once he finds the right
maps". Whether `G₂(n) ≤ f·G₂(d)` survives the two-class version of that argument
is not settled here and is flagged as a lead, not a result.

### 2f. THE FIND THAT MOST AFFECTS OUR NOVELTY CLAIM — MO 37679, answer 52890

Foo's question links one other thread, and Paseman's own paper is named after it:
MathOverflow **37679**, *Erik Westzynthius's cool upper bound argument: update?*,
asked by Paseman 2010-09-04. It had never been opened here. It contains six
answers. Answer **52890**, by user **zeb**, **2011-01-23**, score 4, says this:

> According to the result in the paper, using the full power of Brun's sieve …
> we get that the number of numbers in an interval of length $x$ that are
> relatively prime to the first $n$ primes is at least
> $x(\prod_{p\le p_n}(1-\frac{1}{p}))(1-2\frac{\lambda^{2b}e^{2\lambda}}{1-(\lambda e^{1+\lambda})^2}(1+o(1)))+O\left(p_n^{2b-1+\frac{2}{e^{2\lambda}-1}+\epsilon}\right)$ …
> **If we plug in $b = 1$ and $\lambda = 0.2533$, we get that for sufficiently
> large $n$, any interval of size $O(n^{4.032})$ contains a number relatively
> prime to the first $n$ primes.**

**The exponent sits on `p_n`, not on `n`.** zeb's closing sentence writes `n`,
but his own error term carries `p_n`, and the number confirms it:

```
2b - 1 + 2/(e^{2λ} - 1)   at b = 1, λ = 0.2533
  = 1 + 2/(e^0.5066 - 1) = 1 + 2/0.65965 = 1 + 3.0320 = 4.0320   ✓ exactly his 4.032
```

So the claim is `j(x#) ≪ x^{4.032}`, `x` the largest sifting prime — **our
statement's exact shape, at dimension one, posted publicly in January 2011.**

Why this matters, stated without softening. The move "take a sieve, read off the
exponent at which its error term stops beating the main term, conclude that an
interval that long must contain a survivor, and express the result as a power of
the largest prime" is **not a new move**. It was written down on MathOverflow
fifteen years ago for the one-class case. Our `x^{4.2665}` is that move carried
to `κ = 2` with the Diamond–Halberstam sifting limit in place of a hand-tuned
Brun parameter.

Two things stop this from being prior art for our claim, and they should be
stated as precisely as the finding:

- **It is the one-class object.** zeb bounds `j(x#)` — survivors coprime to `x#`
  — not `G₂(x#)`. Nothing in his answer removes two classes per prime.
- **The numerical near-coincidence `4.032` vs `4.2665` is an accident and must
  never be presented as a comparison.** zeb's 4.032 is a *suboptimal* exponent
  for `κ = 1`, where the sifting limit is `β₁ = 2` and Iwaniec's `(log n)²`
  already gives `j(x#) ≪ x²`. Our 4.2665 is the *sharp* sifting limit at
  `κ = 2`. The two numbers are close for no reason at all; a document that puts
  them in the same table without this sentence is inviting a wrong inference.

The honest consequence: our contribution is the **dimension-2 instantiation**,
not the technique. Any wording that implies the technique is ours is wrong, and
`zeb, MathOverflow 37679, answer 52890, 2011-01-23` is the citation that makes
it wrong.

The same thread also contains, in Paseman's answer 56610, the sentence that
places the whole family: *"there is other work giving provable upper bounds on
the order of $2^{\text{polylog}(n)}$"* — which is the quasi-polynomial shape of
§2c, named as the state of the art for explicit constants, with Iwaniec better
asymptotically but non-explicit.

---

## 3. TARGET 3 — zbMATH, MathSciNet, non-English

### 3a. Access, stated plainly

- **zbMATH Open is NOT paywalled for search.** The REST API at
  `https://api.zbmath.org/v1/document/_search?search_string=…` answers without
  credentials and returns full metadata. Only the *review text* is
  license-restricted on some records, returning the literal string
  `zbMATH Open Web Interface contents unavailable due to conflicting licenses.`
  — which is what came back for all three Ziller / Ziller–Morack records.
  The HTML front end at `zbmath.org` is behind Cloudflare and gives `403` to
  `curl` ("Just a moment... Enable JavaScript and cookies to continue"); use the
  API.
- **MathSciNet IS paywalled.** `https://mathscinet.ams.org/mathscinet/search/…`
  redirects to `https://connect.liblynx.com/wayf/…`, the institutional
  sign-in chooser. **No MathSciNet search was run, and nothing below should be
  read as covering MathSciNet.** A web search was *not* substituted for it.

### 3b. What the zbMATH sweep returned

Calibrated as in §0. New records this project had not seen:

| record | note |
|---|---|
| **Paseman, *Updating an upper bound of Erik Westzynthius*, arXiv 1311.5944 (2013)** | the written form of the MO heuristic; see §2b |
| Costello–Watts, *An upper bound on Jacobsthal's function*, **Math. Comp. 2015** | one class |
| Ziller, *New computational results on a conjecture of Jacobsthal* (2019) | one class |
| Ziller, *On differences between consecutive numbers coprime to primorials* (2020) | one class, at primorials |
| Ziller–Morack, *Algorithmic concepts for the computation of Jacobsthal's function* (2016) | method |
| Foo, *WITHDRAWN: Jacobsthal's function and a short proof of the density of a set in the unit hypercube* (2007) | withdrawn by the author |
| Stevens, *On Jacobsthal's g(n)-function*, Math. Ann. (1977) | the argument Paseman's heuristic is built on |
| Kanold, six papers 1964–1977 | incl. Math. Ann. 170 (1967), the source of §2e |

None of these is an upper bound for the two-class object. Every bound among them
is for the one-class `g`/`j`.

### 3c. German

Ran two-word German queries on the zbMATH API, so a 404 could not be an artefact
of AND-ing too many terms:

- `Primzahlzwillinge` → 12 records, incl. Selmer–Nesheim 1943, Barban 1964,
  Fouvry–Iwaniec 1980. Channel live.
- `Primzahlenpaare` → 4 records, incl. Brun 1919 and two Koutský papers of 1932.
  Channel live.
- **Neither returned anything by R. Fischer, and no record in either result set
  is an upper bound on maximal intervals between prime pairs.**

Stated the safe way: **searched zbMATH for Fischer's German preprints by the
routes above and found nothing.** Their absence from zbMATH is expected of
self-published preprints and is not evidence they do not exist. See §4 for the
retrieval attempt on the artifacts themselves.

### 3d. The informal English convention, closed out

Mathematica StackExchange **114758** (2016), linked from A144311 itself, was
read in full through the SE API — question plus three answers. It is the
"relative twin primes" wording of §1 of the conventions file: "consecutive odds
relatively prime to {2,3,5}", "the largest possible twin prime gap relative to
just {2,3,5}". **It is entirely computational.** Four Mathematica
implementations, timings, memory complaints, a chunking scheme. **No bound of
any kind is asserted, conjectured or referenced anywhere on that page.**

---

## 4. Fischer and Rivera — the non-English artifact hunt

Both targets were **retrieved in full**, not merely searched for. Calibration for
this leg: `primepuzzles.net/conjectures/conj_030.htm` (Firoozbakht, cited by
Kourbatov) returns HTTP 200 / 69,141 bytes, where the site's 404 page is 1,251
bytes — so the 404s recorded below are genuine misses, not a dead channel.

### 4a. Fischer — the host is `fermatquotient.com`, not `fischer-net.de`

Author is **Richard Fischer**, AG/Switzerland; the site is live. Kourbatov's
entries, taken from the **PDF** of arXiv:1301.2242 (= JIS 16 (2013) 13.5.2) via
`pdftotext -layout`, refs [5] and [6]:

> `[5] R. Fischer, Maximale Lücken (Intervallen) von Primzahlenzwillingen, web`
> `page (in German) http://www.fermatquotient.com/PrimLuecken/ZwillingsRekordLuecken (2008).`
>
> `[6] R. Fischer, Maximale Intervalle von Primzahlenpaaren, web page (in German).`
> `Maximal gaps between twin primes are G2(p) ≈ (1.32032)^-1 (log p − (2/3) log log p)^3.`
> `Maximal gaps between prime triplets are G3(p) ≈ (2.8582)^-1 (log p − (3/4) log log p)^4.`
> `http://www.fermatquotient.com/PrimLuecken/Max Intervalle (2006).`

Both artifacts were fetched: `PrimLuecken/Max_Intervalle.txt` (8,219 B, signed
`12.09.2006 Richard Fischer`, unrevised since) and
`PrimLuecken/ZwillingsRekordLuecken.txt` (8,592 B, now signed `30.07.2026`); the
**2008 text Kourbatov actually cited** survives in Wayback at
`20130825234257id_`, signed `10.01.2008`.

**Verdict: records and heuristic approximations, no upper bound.** Fischer's own
words are all expectation verbs — *dürften, meistens, im Mittel, zu wartende* —
and the relation is `≈`, never `≤`:

> `Nach heutigem Stand meiner Analysen, dürften bei Primzahlenpaaren die`
> `maximalen Intervallausreisser meistens bei etwa a*ln Q liegen`

And decisively, **his own table exceeds his own normalisation** — differences 90
and 180 give ratios `1.0320` and `1.0738` — and he says so:

> `So wie es aussieht hat man mit Primzahlenpaaren deren Differenz durch 6`
> `teilbar ist, eindeutig eine grössere Aussicht die relative "Schallmauer" von`
> `1 zu durchbrechen.`

A quantity whose author documents his own curve being broken is not a bound.

### 4b. Rivera / Rodríguez — Conjecture 66, and there is no Spanish site

`primepuzzles.net/conjectures/conj_066.htm`, 100,866 B, retrieved. Title
*"Conjecture 66. Gaps between consecutive twin pairs"*, proposer **Luis
Rodríguez**. **The page is in English**; only the proposer's name is Spanish.

> `…I search for a formula that would give the approximate value of the maximum`
> `gap between twin primes. I propose 0.45 (Log N)^3 . This produces acceptable`
> `numbers.` … `Gap ~ k.(ln(p1))3, k ~ 0.45` … `Q1. Can you justify this`
> `Conjecture or suggest a better one?`

An approximation with an open question attached, over gaps between **actual twin
pairs**. Rivera's own table of champion gaps below `2^32` peaks at
`Gap/(ln p1)³ = 0.570`. No bound.

The Spanish-language version was looked for three ways and does not exist:
direct path probes (`/esp/`, `/espanol/`, `/spanish/`, `/es/`, `/conjeturas/`,
`/index_esp.htm` — all 404 against a 200 calibration), Wayback CDX enumeration
of `primepuzzles.net*` (4,343 distinct URLs, zero matching
`esp|spanish|castell|conjetur|/es/`, while `conj_066` is present in the same
listing), and reading the conjectures index (112 entries, no localisation).
**Searched primepuzzles.net by direct probe, CDX enumeration and index read;
found no Spanish version and no page touching the two-class object.**

### 4c. THE NAME COLLISION, which is the real result of this leg

Kourbatov's and Fischer's **`G₂(p)` is not our `G₂(x#)`**. Theirs is the maximal
gap between *actual twin primes* below `p`, magnitude `≈ 0.76 log³ p`, so about
35,000 at `p ≈ 10¹⁵`, indexed by `p`. Ours is the two-class Jacobsthal value at
a primorial — `1, 5, 11, 29, 41, 65, …` — indexed by `n`. Fischer, Rodríguez,
Rivera and Kourbatov are all describing the sibling quantity. **None of this
leg is prior art for an upper bound on our object**, and every bound-shaped
statement in the whole lineage is explicitly conjectural, including Kourbatov's:

> `Maximal gaps between prime k-tuples are O(log^{k+1} p): g_k(p) < M_k`
> `log^{k+1} p, where M_k ≈ C_k (and possibly M_k = C_k).`

with his own §4 caveat, *"As far as rigorous proofs are concerned, we do not
even know whether there are infinitely many k-tuples of a given type."*

**The live conjectural bound for our actual object stays Ziller–Morack**,
`h₂(n) < p_n² − p_n` for `n ≥ 3` (A288815's own comment), verified
computationally only and never proved.

German, Spanish and French keyword sweeps on the object itself
(`"Jacobsthal" Funktion Primorial obere Schranke`; `"función de Jacobsthal"
primos cota superior primorial`; `"fonction de Jacobsthal" primorielle
majoration nombres premiers jumeaux`) each returned only the same
English-language Ziller / Morack / Hagedorn / Sorenson / Westzynthius items.
**Searched those three languages by those routes and found no non-English source
carrying an independent bound.**

---

## 5. What this changes in SEARCH-CONVENTIONS §5

Three of the five bullets can be retired or rewritten. Proposed replacements,
not applied — this is a staging document:

1. **"The 2009 SeqFan archive thread on A144311 is UNREAD"** → retire. The
   thread does not exist. Replace with: *the complete SeqFan November 2009
   mailbox (322 messages, Nov 1 – Nov 30) was recovered from the Internet
   Archive and searched; A144311 appears nowhere in it, and Alekseyev's ten
   posts that month are on other subjects. The extension was a direct OEIS
   submission and carries no method note in any of the 23 revisions. Route:
   Wayback CDX, since `list.seqfan.eu` itself is dead.* Note the residual gap:
   5–30 September 2008 is not archived.
2. **"Paseman's heuristic … has not been compared"** → retire. Compared in §2c.
   His `n` is `ω(m)`, four-ways confirmed; his heuristic is asymptotically
   weaker than `x^{4.2665}` under every convention.
3. **"No zbMATH, no MathSciNet, no non-English search"** → rewrite. zbMATH has
   now been swept and is open through its API. Fischer's and Rivera's artifacts
   were retrieved in full and neither contains a bound; both concern the sibling
   quantity, §4c. **MathSciNet has still never been searched and is paywalled
   here.**
4. **Wang's `a(23) ≥ 1859`** → keep, but it is now quotable verbatim with its
   witness and its two timings, §1d.
5. **Holt's *Patterns among the Primes*** → untouched by this audit, still
   unread.

Three rows should also be **added** to the §1 owning-convention map:
**OEIS A214089** (`x ≡ ±1 mod each of the first n primes`, single point rather
than longest run, with Alekseyev's `2^{n-1}` CRT comment, §1d);
**MathOverflow 37679** (the Westzynthius-update thread, which is where the
sieve-exponent technique lives, §2f); and **arXiv 1311.5944** (Paseman's paper
form of the 88323 heuristic, §2b).

**The novelty claim, restated honestly.** "No published upper bound exists for
`G₂(x#)` at any exponent" survives every route run here. What does *not* survive
is any wording implying that nobody articulated the target or invented the
technique. The defensible sentence has three clauses, not one:

> Paseman (MathOverflow 88323, 2012) stated the expectation that a power of
> `log m` bounds the maximal interval when a bounded number of classes is
> removed per prime, and sketched — opening "I have no proofs to offer" — a
> quasi-polynomial `2^{C log ω(m) log log ω(m)}` which is asymptotically weaker
> than a fixed power. The technique of reading such a bound off a sieve's error
> exponent is also not ours: zeb (MathOverflow 37679, 2011) ran it at dimension
> one and got `j(x#) ≪ x^{4.032}`. What appears to be unpublished is the
> **dimension-2 instantiation**: no proof of any upper bound on the two-class
> object, at any exponent, was found on any route in this audit.

That is a real claim, it is smaller than "first", and it survives adversarial
reading in a way that "first" does not. It should replace "first" wherever
"first" currently stands unqualified. The claim now rests on a *proved-bound*
absence, which is the narrowest and most defensible form of it — but it is still
an absence, and §6 of `SEARCH-CONVENTIONS.md` is right that nothing mechanical
can verify it. The routes are listed in §6 below so the next wave can attack
them rather than repeat them.

---

## 6. Artifact ledger — which file each fact came from

| fact | artifact | route |
|---|---|---|
| 23 A144311 revisions, extension credit, Wang witness | `oeis.org/history?seq=A144311` + `&start=10` + `&start=20` | `curl`, browser UA (`WebFetch` 403s on oeis.org) |
| A144311 published record, no bound comment | `oeis.org/search?q=id:A144311&fmt=text` | `curl` |
| A144311 has no inbound OEIS references | `oeis.org/search?q=A144311&fmt=text` → 1 of 1 | `curl` |
| SeqFan Nov 2009, 322 messages | `2009-November.txt.gz`, Wayback `20141123141637` | CDX + `web/<ts>if_/` |
| SeqFan Dec 2009 / Jan 2010 / Oct 2008 | same pattern | CDX + `web/<ts>if_/` |
| SeqFan whole archive, 142 months / 19,964 messages | 142 monthly `.txt.gz`, Wayback | CDX list + `web/<ts>if_/`, parallel ≤3 (8 saturates and returns empties); do NOT `collapse=urlkey` |
| Alekseyev's `2^n` CRT method note | `2012-August.txt`, thread `[seqfan] Re: A214089` | same |
| A214089 definition and `2^(n-1)` comment | `oeis.org/search?q=id:A214089&fmt=text` | `curl` |
| zeb's `j(x#) ≪ p_n^{4.032}` | MO 37679 answer **52890**, 2011-01-23 | SE API, `filter=withbody` |
| Fischer's two German pages | `fermatquotient.com/PrimLuecken/Max_Intervalle.txt`, `…/ZwillingsRekordLuecken.txt`; 2008 text at Wayback `20130825234257id_` | `curl` |
| Kourbatov's refs [5],[6] verbatim | **PDF** `arXiv:1301.2242` | `pdftotext -layout` |
| Conjecture 66, and no Spanish site | `primepuzzles.net/conjectures/conj_066.htm`; CDX enumeration of `primepuzzles.net*` (4,343 URLs) | `curl` + CDX |
| Sep 2008 stops on Sep 4, 25 messages | `2008-September/thread.html`, Wayback `20230116213835` | CDX + `web/<ts>if_/` |
| Foo's `g_f(n)`, Paseman's two answers, 9 comments | SE API, `filter=withbody` | `api.stackexchange.com/2.3` |
| Paseman `k = ω(n)`, `g(n) < k^{3+3.81 log log k}` | **PDF** `arxiv.org/pdf/1311.5944v2`, 17pp, p. 12 | `curl` + `pdftotext -layout` |
| MO 88323 cited in that PDF's reading list | same PDF, p. 11 | same |
| zbMATH records | `api.zbmath.org/v1/document/_search` | `curl`, JSON |
| MathSciNet is paywalled | redirect to `connect.liblynx.com/wayf/…` | `curl -L`, final URL |
| Mathematica SE 114758 is computational only | SE API, `site=mathematica` | `api.stackexchange.com/2.3` |
