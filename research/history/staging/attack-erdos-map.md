# Attack J: locating `G2` on the map of known open problems (2026-08-18)

<!-- ledger
id: Q-erdos-map
status: ANSWERED
todo: none
question: Does the two-class object already occupy a numbered slot on somebody else's map of open problems?
verdict: It has no problem number and no name on erdosproblems.com, Ben Green's list or the OEIS citation graph, but it is not unposed: Erdos posed it himself in one sentence in the same paragraph as the $1000 offer, and our object is the r = 2, difference-2 instance of his own stated extension of #687.
-->

Web-enabled attack. The target was inheritance rather than invention: find the
slot our object already occupies in somebody else's numbering, so that its
difficulty is borrowed and a claim about it can be stated in a form a referee
already recognises.

**Verdict, first.** The two-class object has **no problem number and no name**,
on erdosproblems.com, on Ben Green's list, or in OEIS's citation graph — but it
is **not unposed**. Erdős posed it himself, in one sentence, in the same
paragraph as the $1000 offer, and that sentence is missing from the
erdosproblems.com entry that quotes the rest of the paragraph. Our object is the
`r = 2`, difference-2 instance of Erdős's own stated extension of **#687**.

---

## 0. Channels, and which of them were working

Rule of the house (`research/SEARCH-CONVENTIONS.md` §2): calibrate on the same
channel in the same session, or the day's negatives are void.

| channel | calibration probe | result |
|---|---|---|
| erdosproblems.com via `curl` + browser UA | `/search/Jacobsthal` must return #687 and #970 | **HIT**, "0 solved out of 2 shown", exactly those two |
| same, bulk route `/range/1-end` | must return 1217 problem boxes | **HIT**, 10.6 MB, 1217 `bib-container` ids, `1`…`1217` |
| OEIS `search?...&fmt=text` | `2,6,18,30,66,150,192,258` → A288815 | **HIT** |
| OEIS, same channel | `2,4,6,10,14,22,26,34,40,46,58,66` → A048670 | **HIT** (and A395279, see §5) |
| StackExchange API (MathOverflow) | question 88323 body + both answers | **HIT** |
| `users.renyi.hu/~p_erdos` PDF mirror | `1980-03.pdf`, 4.23 MB, `pdftotext` clean | **HIT** |
| Ben Green, `open-problems.pdf` | 2977 lines, §6 "Sieving" present | **HIT** |
| **arXiv API** | `all:"polynomial analogue of Jacobsthal"` → K–K 2302.00459 | **FAIL — HTTP 429/301, zero entries** |
| **WebSearch** | — | **UNAVAILABLE — session budget exhausted (200/200)** |

**Consequence, stated rather than hidden: no arXiv or web-search negative from
this session may be quoted.** Every absence below rests on the channels that
calibrated: the complete erdosproblems.com corpus read locally, OEIS,
MathOverflow, Green's list and the Erdős primary source.

**The `/search` 404 caveat is retired.** `research/SEARCH-CONVENTIONS.md` §3 and
`research/covering-dive.md` Q5 both record that the site's search endpoint 404s
to every automated route, and both flag the resulting absence as resting on one
agent's one pass. The route is **path-encoded, not query-string**: `/search/<term>`
(and `/range/<a>-<b>`, `/range/1-end`, `/go_to/<n>`, `/latex/<n>`, `/history/<n>`,
`/bibs/<key>`, `/forum/discuss/<n>`, `/forum/thread/<n>/proof-claims`). All
return 200 with a browser user-agent. The sweep §3 asks for has now been run in
full, mechanically, on all 1217 entries.

---

## 1. The three problems, verbatim at source

Read 2026-08-18 from the live pages and cross-checked against `/latex/<n>`,
which prints the unrendered TeX and the expanded bibliography.

### #687 — OPEN, **$1000**, tagged `number theory`

Statement, verbatim:

> Let $Y(x)$ be the maximal $y$ such that there exists a choice of congruence
> classes $a_p$ for all primes $p\leq x$ such that every integer in $[1,y]$ is
> congruent to at least one of the $a_p\pmod{p}$.
>
> Give good estimates for $Y(x)$. In particular, can one prove that
> $Y(x)=o(x^2)$ or even $Y(x)\ll x^{1+o(1)}$?

Sources line: `#687: [Er79d,p.79][Er80,p.106][Er96b]`. Banner: "OPEN — This is
open, and cannot be resolved with a finite computation." Last edited **06
December 2025**. Formalised statement: **No**. OEIS: **A048670, A058989**.
1 comment, 0 claimed proofs. Nobody has ticked any of the seven interest flags.

Remarks, verbatim:

> This function (associated with Jacobsthal) is closely related to the problem of
> gaps between primes (see [4]). The best known upper bound is due to Iwaniec
> [Iw78], \[Y(x) \ll x^2.\] The best lower bound is due to Ford, Green, Konyagin,
> Maynard, and Tao [FGKMT18], \[Y(x) \gg x\frac{\log x\log\log\log x}{\log\log
> x},\] improving on a previous bound of Rankin [Ra38].
>
> Maier and Pomerance have conjectured that $Y(x)\ll x(\log x)^{2+o(1)}$.
>
> In [Er80] he writes 'It is not clear who first formulated this problem -
> probably many of us did it independently. I offer the maximum of \$1000 dollars
> and $1/2$ my total savings for clearing up of this problem.'
>
> In [Er80] Erdős also asks about a weaker variant in which all except
> $o(y/\log y)$ of the integers in $[1,y]$ are congruent to at least one of the
> $a_p\pmod{p}$, and in particular asks if the answer is very different.
>
> See also [688] and [689]. A more general Jacobsthal function is the focus of
> [970].

Every reference the page carries, expanded from `/latex/687`:

- `[Er80]` Erdős, Paul, *A survey of problems in combinatorial number theory*.
  Ann. Discrete Math. (1980), 89-115. (MR 593525)
- `[FGKMT18]` Ford, Green, Konyagin, Maynard, Tao, *Long gaps between primes*.
  J. Amer. Math. Soc. (2018), 65-105.
- `[Iw78]` Iwaniec, Henryk, *On the problem of Jacobsthal*. Demonstratio Math.
  (1978), 225--231. (MR 499895)
- `[Ra38]` Rankin, R. A., *The Difference between Consecutive Prime Numbers*.
  J. London Math. Soc. (1938), 242-247.
- Sources not otherwise cited in the remarks: `[Er79d]` Erdős, *Some
  unconventional problems in number theory*, Acta Math. Acad. Sci. Hungar. (1979),
  71-80 (MR 515121); `[Er96b]` Erdős, *Some problems I presented or planned to
  present in my short talk*, Analytic number theory Vol. 1 (Allerton Park, IL,
  1995), (1996), 333-335 (MR 1399346).
- `[4]` is a **problem** cross-reference, not a bibliography key: Erdős #4, the
  $10000 large-prime-gaps problem, status **proved**.

The **one comment** is the load-bearing artifact of this whole attack. BorisAlexeev,
15:59 on 04 Dec 2025, quotes [Er80, p.106] in full and the site records "(The site
has been updated to address this comment.)" — that comment is where the $1000 and
the `[Er80,p.106]` reference came from. See §2.

### #689 — OPEN, no prize, tagged `number theory`

> Let $n$ be sufficiently large. Is there some choice of congruence class $a_p$
> for all primes $2\leq p\leq n$ such that every integer in $[1,n]$ satisfies at
> least two of the congruences $\equiv a_p\pmod{p}$?

Sources: `#689: [Er79d][Er80,p.108]`. Last edited **08 April 2026**. Formalised
statement: **Yes** (`google-deepmind/formal-conjectures`, `ErdosProblems/689.lean`).
**30 comments, 1 claimed proof.** The banner reads OPEN; the comment-activity
widget's active state is "A claimed solution has been posted in the comments" —
keep those two apart when quoting. No OEIS link. Interest flags: *likes* Alfaiz,
ebarschkis, Dogmachine; *looks tractable* **TerenceTao**, msawhney, Przemek,
ebarschkis, MalekZ; *looks difficult* nobody.

Remarks, verbatim, and they carry no references at all:

> One can ask a similar question replacing $2$ by any fixed integer $r$ (provided
> $n$ is sufficiently large depending on $r$).
>
> See also [687] and [688]. If we replace primes with all integers then this is
> [1205].
>
> This problem (with $2$ replaced by $10$) is Problem 45 on Green's open problems
> list.

**Status has moved since the corpus last read it, and the direction matters.**
Thomas Bloom pinned a comment at 16:31 on 02 Jun 2026, verbatim from the thread:

> This problem has now had two full solution claims posted by Chojecki and MalekZ,
> both using an earlier sketch developed here in comments mainly due to Sawhney
> and Tao. I think this is sufficient advertisement for those claims, and will not
> be allowing new comments along similar lines (using AI to generate a detailed
> proof from the Sawhney-Tao sketch).
>
> Given the subtleties and technicalities involved, I will await either publication
> of a solution in a peer-reviewed journal, or a careful look from an expert human
> (e.g. Sawhney or Tao), before updating the site.

So #689 is a problem with a live, contested, AI-assisted solution front and a
site owner who has closed the thread to further such claims. Two further facts
from that thread that bear on us directly:

1. **Tao's own upper-bound remark, 02:49 on 31 Oct 2025**, verbatim: "Just from
   the fact that $\sum_{p \leq n} n/p \sim n \log\log n$ and the pigeonhole
   principle it is clear that $r$ cannot exceed $(1+o(1))\log\log n$. But, to my
   surprise, I cannot improve upon this trivial bound at all!" That is the same
   shape as our own situation: a pigeonhole ceiling nobody can beat.
2. **Tao leans against `r ≥ 3`** (23:46 on 30 Oct 2025), on a sieve-survivor
   count, and says so in his own voice: "So I am now leaning towards the $r \geq
   3$ version of this claim actually being false."

### #970 — OPEN, no prize, tagged `number theory`

> Let $h(k)$ be Jacobsthal's function, defined to as the minimal $m$ such that,
> if $n$ has at most $k$ prime factors, then in any set of $m$ consecutive
> integers there exists an integer coprime to $n$. Determine the order of
> magnitude of $h(k)$. In particular, is it true that\[h(k) \ll k^2?\]

Sources: `#970: [Er65b]` — Erdős, *Some recent advances and current problems in
number theory*, Lectures on Modern Mathematics Vol. III (1965), 196-244 (MR
177933). This is the **only** reference the page carries in its sources line.
**The page carries no "last edited" line at all** — unlike #687, #688 and #689,
it has never been edited since creation. Formalised statement: **No**. OEIS:
**A048669**. 0 comments, 0 claimed proofs, no interest flags.

Remarks, verbatim:

> That $h(k)\ll k^2$ is a conjecture of Jacobsthal. Iwaniec [Iw78] proved\[h(k)
> \ll (k\log k)^2.\]The best lower bound known is\[h(k) \gg \frac{(\log
> k)(\log\log\log k)}{(\log\log k)^2}k,\]due to Ford, Green, Konyagin, Maynard,
> and Tao [FGKMT18].
>
> This is a more general form of the function considered in [687].

References: `[Iw78]` and `[FGKMT18]` exactly as at #687.

### #688, read because #687 and #689 both point at it

> Define $\epsilon_n$ to be maximal such that there exists some choice of
> congruence class $a_p$ for all primes $n^{\epsilon_n}<p\leq n$ such that every
> integer in $[1,n]$ satisfies at least one of the congruences $\equiv
> a_p\pmod{p}$.
>
> Estimate $\epsilon_n$ - in particular is it true that $\epsilon_n=o(1)$?

OPEN, `#688: [Er79d][Er80,p.106]`, last edited 07 April 2026, formalised
statement **Yes**, no OEIS link, 0 comments. Remark: "Erdős could prove
$\epsilon_n \gg \frac{\log\log\log n}{\log\log n}$. See also [687], [689], and
[1200]."

---

## 2. Where `G2` sits, exactly

### 2.1 The two indexings of the one-class function are the same theorem, and the site says so

Both #687 and #970 attribute their upper bound to `[Iw78]`, in different
currencies: `Y(x) ≪ x²` and `h(k) ≪ (k log k)²`. With `k = π(x) ~ x/log x` the
second gives the first. The site itself states the direction of generality:
#970's own remark, "This is a more general form of the function considered in
[687]" — general because `n` may use any `k` primes, not the first `π(x)`.
`research/covering-dive.md` §1.1 already carries the Hajdu–Saradha warning that
the two functions are **not equal** past `r = 24`, so "more general form" is the
right relation and "the same theorem" is a loose one. See §5.

### 2.2 `G2` is not a special case of any of #687, #689 or #970

Using `research/SEARCH-CONVENTIONS.md` §1's owning conventions.

| | classes per prime | freedom | what varies |
|---|---|---|---|
| **#687 / #970** | **one**, `a_p` | free | `a_p` |
| **#689** | **one**, `a_p` | free | `a_p`; the **2** is a covering *multiplicity*, each integer hit twice |
| **our `G2`** | **two**, `{a_p, a_p − 2}` | free centre, **separation locked at 2** | `a_p` |
| paired Jacobsthal `h₂` | **two**, independent | both free | both |

- **Against #687/#970:** `G2` deletes twice as much per prime. Sifting dimension
  goes 1 → 2, `∏(1 − 1/p)` → `∏(1 − 2/p)`, and the linear sieve's `u > 2`
  positivity threshold no longer applies. `G2(x#) ≥ g(x#)` pointwise and
  trivially, so `G2` is **strictly harder to bound above** than the $1000
  problem. Not a special case: a strengthening.
- **Against #689:** the resemblance is the digit 2 in two different slots. #689
  keeps one class per prime and asks for multiplicity ≥ 2 in the *covered* set;
  `G2` asks for two classes per prime and multiplicity ≥ 1. Neither implies the
  other. **`research/covering-dive.md` line 150 and `TODO.md` line 655 call #689
  "the double-covering cousin" and "the nearest active covering" — defensible as
  a neighbourhood claim, wrong if read as a specialisation.** It is a cousin, not
  a parent.
- **Against `h₂`:** our pair is a translate of `{0, −2}`, so `h₂ ≥ G2`, already
  in `research/covering-dive.md` Q2.1.

### 2.3 The thing that IS our problem, in Erdős's own hand

`[Er80]` = Erdős, *A survey of problems in combinatorial number theory*, Ann.
Discrete Math. 6 (1980), 89-115. Read here from
`https://users.renyi.hu/~p_erdos/1980-03.pdf` (4,233,700 bytes, HTTP 200,
`pdftotext`), §6 "Some problems on sieve methods", Problem 1, printed page 106.
Verbatim below. **Two OCR restorations, both checked against BorisAlexeev's
independent transcription of the same passage in the #687 comment thread**: the
scan renders `x^{1/2}` as `x2'` and `½` as `z`. Erdős's hyphen before "probably"
is printed as `-`.

> 1. Let f(x) be the smallest integer so that there is a set of residues
> a_p (mod p), p < f(x)   (1)
> so that every integer n < x satisfies one of the congruence (1). In particular
> must f(x) be significantly larger than x^{1/2}? Also it would be very useful to
> estimate F(x) if we only require that the number of integers n < x not
> satisfying any of the congruences (1) is o(x/log x) (where p < F(x)). Is F(x)
> significantly smaller than f(x)? **These problems can of course be extended if
> more than one residue is omitted.**
> It is not clear who first formulated this problem — probably many of us did it
> independently. I offer max(1000 dollars, ½ my total savings) for clearing up of
> this problem. It is clear that many important problems could be attacked if we
> would know a little more.

The bolded sentence is the one this project has been looking for. It sits
**between** the `f(x)`/`F(x)` pair and the prize offer, one line above the
$1000. erdosproblems.com #687 reproduces the sentences on either side of it —
the `F(x)` variant became the "weaker variant" remark, the prize became the
quoted offer — and **does not reproduce it**.

So the precise placement is:

> **`G2` is the `r = 2`, difference-2 instance of the multi-residue extension of
> Erdős Problem #687 that Erdős states in [Er80, p.106] and that
> erdosproblems.com does not carry.**

Two honest qualifications, because this is exactly the kind of sentence this
project has learned to over-read:

1. **The extension is stated, not posed.** Erdős gives it one clause, no
   notation, no question mark, no conjecture. It is a licence, not a problem
   statement. It does not acquire the $1000: the offer says "for clearing up of
   this problem", singular, after the `f(x)`/`F(x)` pair.
2. **It is the free-two-classes extension, not ours.** "More than one residue is
   omitted" is `h₂`, both classes free. Our locked separation of 2 is a
   sub-case of Erdős's extension, and the sub-case is the one the twin problem
   needs. `research/covering-dive.md` Q2.1 already has `h₂ ≥ G2`.

### 2.4 The rest of the family map, verified at source

- **OEIS A144311** — read 2026-08-18 via `oeis.org/search?q=id:A144311&fmt=text`.
  Revision `#23 Dec 05 2024`. 22 terms, `1, 5, 11, 29, 41, 65, 107, 149, 203,
  257, 347, 527, 545, 617, 707, 869, 965, 1079, 1283, 1397, 1529, 1709`. Name
  exactly as `SEARCH-CONVENTIONS.md` §1 records it. Keywords `nonn,more,hard`.
  Andrew Carter, Sep 17 2008; a(8)-a(16) Max Alekseyev Nov 18 2009; a(17)-a(22)
  Jinyuan Wang Nov 26 2024. Links: one Mathematica StackExchange thread and
  Wang's C++ program. **`Cf. A048670, A049300, A058989`** — and note that
  **A048670 and A058989 are precisely the two OEIS sequences erdosproblems.com
  attaches to #687**. The forward path from our object to the $1000 problem
  already exists inside OEIS.
- **Reverse citation, run because `SEARCH-CONVENTIONS.md` §2 requires it:**
  `oeis.org/search?q=A144311` returns "Showing 1-1 of 1" — the sequence itself.
  **No OEIS sequence references A144311.** It is a leaf.
- **MathOverflow 88323** — read 2026-08-18 through the StackExchange API
  (`api.stackexchange.com/2.3/questions/88323?site=mathoverflow&filter=withbody`
  plus the `/answers` route). Title *Analogues of Jacobsthal's function*, Timothy
  Foo, 13 Feb 2012, score 2, 2 answers. Gerhard Paseman's answer is accepted,
  score 6. **See §5 — the corpus's description of this question is inaccurate.**

---

## 3. The systematic sweep of all 1217 Erdős problems

Method, so it is repeatable: `curl` `/range/1-end` (10,642,980 bytes), split on
the `problem-box` wrapper, key each block by its `bib-container<N>` id — 1217
blocks, ids `1`…`1217`, no gaps — then regex the lot locally. Metadata (status,
prize, tags, OEIS links) came from `data/problems.yaml` in
`github.com/teorth/erdosproblems`, the community database Bloom's site links.
Site-side `/search/<term>` was used to confirm the local counts.

**Global counts on that database, from its own README: 1217 problems, 106 with a
prize, 608 completely open, 22 tagged `covering systems`, 61 tagged `primes`.**

### 3.1 The decisive count

`Jacobsthal` appears in exactly **two** of 1217 problems: **#687 and #970.**
Confirmed twice, locally over the dump and at `/search/Jacobsthal`, which prints
"0 solved out of 2 shown". This is the search the corpus recorded as
irreproducible; it is now run, and its answer is the one the corpus assumed.

### 3.2 Every hit, by tier

**Tier 1 — the same function, one class per prime.**

| # | status | prize | what it is |
|---|---|---|---|
| **687** | open | **$1000** | `Y(x)`; = Green Problem 46 |
| **970** | open | — | `h(k)`; the `ω(n) ≤ k` indexing |
| **688** | open | — | truncated alphabet `(n^{ε}, n]` |
| **1200** | open | — | Erdős–Ruzsa: cover `[1,x]` with `∑1/p_i < C` |
| **929** | open | — | **the inverse question.** `S(k)` = least `x` with a positive-density set of `n` having `n+1..n+k` all `p ≤ x`-divisible; asks `S(k) ≥ k^{1-o(1)}`, the dual of #687's `Y(x) ≪ x^{1+o(1)}`. Rosser's sieve gives `S(k) > k^{1/2-o(1)}`; FGKMT gives the upper side |
| **854** | open | — | **the cycle of gaps itself.** `a_i` the integers coprime to the `k`th primorial; `max_i(a_{i+1} − a_i)` *is* A048670. Asks for the least even `t` not a gap, and whether `≫ max` even values occur. Erdős at Oberwolfach c. 1986; Lacampagne–Selfridge computation |
| **860** | open | — | Erdős–Pomerance distinct-multiples window `h(n)`; `h(n) ≪ n^{3/2}/(log n)^{1/2}` |
| **1181** | open | — | `q(n,k)`, least prime not dividing `∏(n+i)`; the `(log n)²` scale again |

**Tier 2 — multiplicity, not multi-class.**

| # | status | what it is |
|---|---|---|
| **689** | open (claimed solutions) | cover `[1,n]` twice, one class per prime; = Green Problem 45 at `r = 10` |
| **1205** | **solved** | the same with all integers as moduli. `F(x) ~ log x`, proved on the page by pigeonhole plus a random choice with Chernoff concentration, "inspired by the comments for [689]" |
| **467** | open | double cover with a **bipartition** `{p ≤ x} = A ⊔ B`, one class from each side per integer. `[ErGr80, p.93]`; the page warns the source is "missing some crucial quantifiers" |
| **1139** | open | gaps between integers with `Ω ≤ 2`; **Tao, 00:13 on 27 Jan 2026: "Progress on this problem may also help resolve [1139]"** — and Chojecki's reply spells out that a strong-form #689 cover produces `Ω(N+j) ≥ 3` intervals by CRT |

**Tier 3 — many classes per prime (large-sieve regime, not ours).**

**#1202** — **solved, in the negative, since the corpus last looked.** `(p−1)/2`
classes per prime; = Green Problem 44. The page reads: "This was resolved in the
negative by Price and GPT-5.4 Pro." Erdős had called it "intractable at present".
Also #25, #202 (solved, Lean), #278, #280 (disproved, Lean), #281 (proved, Lean),
#1190 (solved, Lean) — general-moduli packing and covering, `∑1/n_i` currency.

**Tier 4 — admissibility, the dual object.**

**#1204** — open. `A(k) = min a_k` over admissible `0 ≤ a_1 < … < a_k`; asks
`A(k) ~ k log k`. Known `(1/2+o(1))k log k ≤ A(k) ≤ (1+o(1))k log k`; Elliott,
Davenport, Hensley–Richert, rediscovered by Polymath8. Erdős's own §6 item 5.
Also **#429**, disproved in Lean: sparse admissible `A` with `n + a` all prime.

**Tier 5 — the `covering systems` tag, all 22, for completeness.**
2 (disproved), 7 (verifiable), 8 (disproved), 27 (disproved), 202 (solved), 203
(open), 204 (disproved), 273 (open), 274 (open), 275 (proved), 276 (open), 277
(proved), 278 (open), 279 (open), 280 (disproved), 281 (proved), 586 (disproved),
947 (proved), 1113 (open), 1188 (open), 1189 (open), 1190 (solved). #9 and #205
discuss covering systems in their remarks without carrying the tag. **None of
these 22 is about a bounded number of classes per prime covering a finite
interval** — they are min-modulus, density, structure and enumeration results on
covering all of `ℤ`, exactly as `research/covering-dive.md` Q3 already found by a
different route.

**Prime gaps and tuples, checked and cleared:** #4 (proved, $10000, large gaps),
#5, #15, #218, #855, #874, #875, #879, #946. None bears on the two-class object.

### 3.3 Erdős's own §6, mapped

`[Er80]` §6 "Some problems on sieve methods" is the source neighbourhood, and
the whole of it maps onto the database:

| [Er80] §6 item | erdosproblems.com |
|---|---|
| 1 (`f(x)`, `F(x)`, **the multi-residue clause**, the $1000) | **#687** + **#688** + **#1200**; **the clause is nowhere** |
| 2 (largest prime factor of `n+i`) | not identified here |
| 3 (`(p−1)/2` residues per prime) | **#1202**, now solved negatively |
| 4 (`V(n)`, `d(m)`, `p²`-free shifts) | not identified here |
| 5 (Elliott's admissible `A(k)`, `B(k)`) | **#1204** |
| 6 (`f(x)` ≥ 2 congruences; `F(x)` over all moduli) | **#689** + **#1205** |

Erdős's own line under item 6, verbatim from the PDF: "I can not even prove that
f(x) > 2 for x > x_0."

---

## 4. Does the problem have a recognised home?

### 4.1 What the one-class problem has, and we do not

Ben Green, *100 open problems*, `people.maths.ox.ac.uk/greenbj/papers/open-problems.pdf`,
read here in full (2977 lines, `pdftotext`); the document states "Most recent
update: December 2025". §6 is "Sieving". Problem 46, verbatim:

> **Problem 46.** What is the largest y for which one may cover the interval [y]
> by residue classes a_p (mod p), one for each prime p ⩽ x?
>
> **Comments.** This is the Jacobsthal problem, and it is somewhat notorious. It
> is known [121] that y ≫ x log x · log log log x / log log x, and any improvement
> upon this would lead to a better bound for the largest gap between consecutive
> primes. The best upper bound is y ≪ x², due to Iwaniec [176]. It seems very
> likely that one must have y ≪ x^{1+o(1)}. A proof of this would not give a
> better upper bound on gaps between primes, merely on the capability of one
> method for producing them.

*(Extraction note: `pdftotext` splits the displayed fraction, printing it as
three lines — `log log log x` / `known [121] that y ≫ x log xlog` / `log log x`.
The inequality above reassembles it; the rest of the block is byte-for-byte.
`[121]` is FGKMT, `[176]` is Iwaniec 1978 — both expanded from Green's own
bibliography, and both the same works erdosproblems.com cites at #687.)*

That is what a recognised home looks like: a name ("the Jacobsthal problem"), a
difficulty label ("somewhat notorious"), a number on a curated list, a $1000
prize, an entry in a database with a formalisation slot and a forum.

Green's §6 also contains **Problem 43** (residue classes for `N^{0.51} ≤ p < 2N^{0.51}`;
Green calls it "a kind of 'Kakeya problem in dimension 2 + ε'" and notes that
progress at `α ≈ 1` would imply the Kakeya conjecture), **Problem 44** = #1202,
**Problem 45** = #689 at `r = 10` (Green's comment, verbatim: "Erdős remarks that
he does not know how to answer it with 10 replaced by 2" — which is [Er80] §6.6's
"I can not even prove that f(x) > 2" seen from the other side; he adds "Update
2025: some discussion of this may be found at the Erdős problems website
https://www.erdosproblems.com/689"), and **Problems 47–48**, the inverse large and
small sieve problems. Green's comment on Problems 44 and 45 is worth recording
because it is the calibration for how cold this corner is: "I must admit that I
do not know anything about this problem other than what Erdős wrote nearly 40
years ago; this part of his paper does not appear to have been cited since. The
same comment applies to the next problem."

### 4.2 The calibrated negative

**Searched in the owning conventions of `research/SEARCH-CONVENTIONS.md` §1** —
A144311's wording, "bounded number of residue classes per prime", "paired
Jacobsthal", and Jacobsthal itself — across the complete 1217-problem Erdős
database, Green's 100-problem list, and OEIS forward and reverse citation:

- **No Erdős problem number** poses the multi-class version. The two Jacobsthal
  problems are #687 and #970 and both are one class per prime. Verified
  2026-08-18 mechanically over all 1217 entries, not by keyword luck.
- **No slot on Green's list.** Its Problem 46 is the one-class problem.
- **No name.** "Two-class Jacobsthal", "twin Jacobsthal" and `G2` are house
  terms; the only published name for anything in this family is Ziller–Morack's
  "paired Jacobsthal" `j₂` (`research/covering-dive.md` Q2.1), which is the
  free-two-classes function, not ours.
- **No citation neighbourhood.** A144311 has zero inbound OEIS references.
- **No formalisation slot, no forum thread, no interest flag.** #687 itself has
  not one of its seven interest flags ticked by anyone.

**What the negative does not cover, and it is the same blind spot the corpus
already carries:** arXiv and web search were unavailable this session (§0), so
this adds nothing to `research/covering-dive.md` Q2.2's separate finding on the
*published-bound* question. The two negatives are about different things — that
one is about whether a bound exists, this one is about whether a *problem*
exists — and neither substitutes for the other.

### 4.3 What that is worth, and the one move that would change it

The negative is now strong enough to be an asset rather than a hole: the object
has an Erdős sentence, an OEIS entry, a MathOverflow question and a published
neighbour function, and no number, no name and nobody working on it. That
combination is unusual and it is stateable. It also names the cheapest possible
contribution this project could make, which is not a bound:

**Post a comment on erdosproblems.com #687** carrying (i) the [Er80, p.106]
sentence the entry omits, (ii) the observation that its `r = 2` difference-2
instance is OEIS A144311 with 22 known terms, and (iii) the two-line reason it is
not reducible to #687 (dimension 1 → 2). The precedent is exact and one comment
old: BorisAlexeev's 04 Dec 2025 comment on the same problem quoted the same
paragraph, and the site adopted it — "(The site has been updated to address this
comment.)" That is the mechanism by which an object on this site acquires a
recognised home, and it costs one comment.

**Do not do this from here.** It is an external publication with the project's
name on it, and it belongs to Chris.

A second, smaller one: `github.com/teorth/erdosproblems` solicits OEIS links by
PR, and #970 currently links only A048669 while the sequence for its `h(k)` now
exists — see §5.

---

## 5. Corpus corrections

Ordered by cost of leaving them.

### 5.1 `research/SEARCH-CONVENTIONS.md` §1 misdescribes MathOverflow 88323

The row reads: `bounded number of residue classes per prime`; `g_f(n)` at
`f(x) = x(x+2)` | MathOverflow **88323** (Foo, 2012). Read at source through the
StackExchange API on 2026-08-18: **MO 88323 never writes `x(x+2)`, or any
quadratic.** It defines `g_f(n)` for general `f ∈ ℤ[x]` and its only worked
instances are `f(x) = x` and `f(x) = x⁵ − x + 5r`. The instantiation at
`x(x+2)` is ours.

The instantiation is nonetheless **correct**: `(f(m), n) = 1` with `f = x(x+2)`
is exactly `m` and `m+2` both coprime to `n`, so `g_f(x#) = G2(x#)` on the nose,
and the free centre comes from translating the window (CRT). The defect is
attribution, not mathematics. Two fixes needed:

1. The `g_f` half of that cell is our reading of Foo's definition, not Foo's
   statement, and the table should say so. **The task brief that launched this
   attack repeated the misattribution verbatim**, which is how a table entry
   becomes a fact.
2. **The bottom half of MO 88323 is what actually owns our object**, and it is
   the half the table's first phrase already points at: "let's say that for each
   p, the number of congruence classes deleted is bounded by a constant … should
   one expect that a power of log n is reasonable as an upper bound". That is the
   sentence to quote, and it is Foo's.

### 5.2 Paseman's 2012 answer contains our CRT lemma, and the corpus does not cite it

`research/two-class-lower-bounds.md` §1 proves, PROVEN (elementary, CRT), that the
free-centre form of the pair is equivalent to the fixed form. Paseman's accepted
answer at MO 88323, read at source, states it:

> I believe (and it should be easily confirmed), that if one were to take just one
> different residue class other than 0 for each prime p dividing m, that the
> Chinese Remainder Theorem shows you are just considering the same problem with
> a different offset. So you might standardize things by always removing the 0
> class along with whatever other residue classes you might consider removing.

This is prior art for that lemma, in print since 22 Oct 2012, and it is stated in
exactly the generality we need (0 plus whatever else). It should be cited where
the lemma is proved. The same answer is also the closest thing in the literature
to a stated expectation for our function: "I too would expect some power of log m
to be an upper bound for the maximum length of an interval of consecutive
integers which happen to lie in the union of the removed classes. However, I
would look at data using small numbers first". No bound is offered in either
answer.

### 5.3 The `/search` 404 caveat is stale in two files

- `research/SEARCH-CONVENTIONS.md` §3, the row "An **Erdős problem** posing
  two-class Jacobsthal directly?" — its "**Not reproducible**" clause and its
  "a human with a browser settles it in one query" are both now discharged. The
  answer stands; the caveat should be replaced with the working route and the
  mechanical sweep, and the evidence upgraded from "those five, plus web search"
  to "all 1217 entries".
- `research/covering-dive.md` line 153, same claim, same caveat, plus the
  parenthetical at line 151 ("its `/search` endpoint 404s"). The endpoint does
  not 404; the path form is `/search/<term>`.

### 5.4 `research/covering-dive.md` line 150 and `TODO.md` line 655 overstate #689's kinship

`covering-dive.md`: "the double-covering cousin of the two-class problem".
`TODO.md`, verbatim: "Erdős #689 (double coverings; Tao: 'tractable') — nearest
active covering problem to **our multiplicity-2 structure**; no current angle of
ours." The TODO line is wrong twice: it reads as if #689 were a variant of ours,
and it calls *our* structure multiplicity-2 when multiplicity-2 is #689's
structure and ours is class-count-2 at multiplicity 1. Per §2.2 the two do not
imply each other. Both lines want one clause saying which slot the 2 sits in.

#689's status also needs updating in both: two full solution claims, thread
closed to further AI-assisted claims by the site owner on 02 Jun 2026, awaiting
expert or journal verification.

### 5.5 `research/PRIOR-ART.md` line 25: "#687 is the same theorem in the `Y(x) ≪ x²` currency"

The relation the site states is generality, not identity: #970's own remark says
"This is a more general form of the function considered in [687]", and
`research/covering-dive.md` §1.1 already records, from Hajdu–Saradha, that the
primorial function and the `ω(n) = r` maximum **differ from `r = 24`**. The
Iwaniec bound is stated for both and the `h(k)` form implies the `Y(x)` form; the
converse is not claimed by anyone. "Same theorem" should become "the same bound
in the other currency; #970's function is the more general one". This is the
same defect class as the #687/#970 conflation `PRIOR-ART.md` already corrects
once — the conflation was fixed, the residue of it in the wording was not.

**I checked for further instances of that defect and found none.** Every other
corpus mention of #687 — `research/ZONE-POSTULATE.md` line 344,
`research/THE-DIALS.md` line 277, `research/G2-STATE.md` line 589,
`research/two-class-lower-bounds.md` lines 348 and 904, `paper/beta2-note.md`
line 337 — says only that the constant is inexplicit and that #687 pays $1000 for
`o(x²)`, and every one of those is accurate against the page as read today.

### 5.6 Two OEIS facts the corpus does not have

- **A395279**, *"Jacobsthal's function H(n); the maximum, over all t having
  exactly n distinct prime divisors, of A048669(t)"*, Jeffrey Shallit, **18 Apr
  2026**, revision `#21 Apr 19 2026`, 43 terms, keywords `nonn,more`. This is
  precisely the `H(r)` that `research/covering-dive.md` §1.1 had to define by
  hand for want of an entry, and its comment block states the `h`/`H`
  distinction and the Hajdu–Saradha counterexample `H(24) = 236 ≠ 234 = h(24)`
  with the witness `A002110(21)·73·89·101`. **#970 links only A048669; A395279 is
  its actual sequence.** That is a one-line PR to `teorth/erdosproblems`.
- **#854 links A389839 and A048670**, and #854 is the primorial cycle-of-gaps
  problem. The corpus's `tile` / cycle-of-gaps object therefore has an Erdős
  number after all — the one-class one, #854 — which nothing in the corpus
  records.

### 5.7 Not a correction, but do not let it rot

`research/covering-dive.md` line 149 describes #688 as "almost-covering [1,n]
with one class per prime (density defect ε_n)". Read at source, #688 has **no
density defect**: it is an exact cover of `[1,n]` by primes restricted to
`(n^{ε_n}, n]`, and `ε_n` is the truncation exponent. The density-defect variant
is the `F(x)` half of #687. Small, but it is the kind of slip that sends a future
agent to the wrong problem.

---

## 6. Method notes for whoever comes next

The erdosproblems.com routes, all 200 with `curl -A "Mozilla/5.0 …"`:

| route | what it gives |
|---|---|
| `/<n>` | one problem, rendered |
| `/latex/<n>` | unrendered TeX **plus the expanded bibliography** — always read this, the rendered page prints bare keys |
| `/range/<a>-<b>`, `/range/1-end` | bulk. `1-end` is the whole corpus in one 10.6 MB page |
| `/search/<term>` | **path-encoded**, not `?q=`. Prints "N solved out of M shown" |
| `/history/<n>`, `/bibs/<key>`, `/tags/<tag>`, `/lists`, `/prizes` | as named |
| `/forum/discuss/<n>`, `/forum/thread/<n>/proof-claims` | comments; these carry the live mathematics |
| `github.com/teorth/erdosproblems`, `data/problems.yaml` | status, prize, tags, OEIS links for all 1217, machine-readable, PR-able |

Parse the bulk page by splitting on `problem-box` and keying each block by its
`bib-container<N>` id. 1217 blocks, no gaps.

**Gate state, and why it is not zero.** This document contributes **0 findings
across all ten checks**; it adds no script and no number of ours. The counter is
nonzero because sibling attacks are mid-flight and `scripts / uncited-script`
fires on any script whose companion report has not landed yet. It moved twice
while I worked: at 18:04 it was `research/attack-growth-law.js` (Attack E), which
cleared when that report landed; at 18:10 it was
`research/attack-beta2-A-B-bounded.js` (Attack A) and
`research/attack-lower-bound.js`. All three are untracked files from other
agents. **I have deliberately not referenced any of them from here.** Naming
another attack's script in an unrelated report to zero a counter is a
suppression, and `research/SEARCH-CONVENTIONS.md` §6 names that failure mode:
"a row added to make a claim pass is a suppression wearing a table's clothes."
The counter reached zero on its own once the sibling reports landed. **Final
state: `node research/qc.js` reads 0 across all ten checks, and
`node research/qc/selftest.js` reports "All 21 known positives fire and all 12
controls stay silent."** The transient nonzero was the check doing exactly what
it was built to do.
