# Literature audit in the A144311 vocabulary

<!-- ledger
id: Q-a144311-vocabulary
status: ANSWERED
todo: none
question: In the vocabulary the literature actually uses, is there a published upper bound for G2, and is beta2 still the best known kappa = 2 sifting limit?
verdict: The terms of art are the paired Jacobsthal function and Jacobsthal-type functions for polynomials, and in that vocabulary no published upper bound exists at any exponent, beta2 is unimproved since 2008, nothing is found on A144311's asymptotic growth, and an Erdős-Rankin lower bound is free; both load-bearing corpus claims survive.
-->

**Date:** 2026-08-18. Scope: search the *theory* of G₂ in the conventions the
literature actually uses, not ours. Five earlier waves searched "twin
Jacobsthal", "two-class", "primorial wheel" and returned calibrated negatives
because the vocabulary was wrong. This wave searches the right words.

**Headline:** the correct terms of art are the **paired Jacobsthal function**
(Ziller and Morack, 2017) and, for the general framework, a **"Jacobsthal-type
function for polynomials"** (Timothy Foo, MathOverflow, 2012), whose f(x) =
x(x+2) case *is* G₂. In that vocabulary the answer to (a) is unchanged:
**no published upper bound exists, at any exponent, for the difference-2 object,
its free-difference dominator, or the general bounded-classes-per-prime
family.** The answer to (b) is that **β₂ has not been improved since 2008.**
Both of our load-bearing claims survive this wave. Nothing here refutes the
corpus.

The one thing that changes is the shape of the negative. It is no longer "the
object appears unstudied": the object has a name, an OEIS entry from 2002, a
2017 pair of papers, and a 2012 MathOverflow thread that poses exactly our
question and answers it with an explicitly unproved heuristic. The claim to
make is not "nobody looked" but **"two people looked, wrote down a conjecture
and a feeling, and neither proved a bound."**

---

## 0. Calibration: the channel, proved before any absence claim

An absence claim is worthless from a silent channel. Three retrievals first.

`WebFetch` returns **HTTP 403 on oeis.org, erdosproblems.com and
stackexchange.com**. Every retrieval below used `curl` with a browser
User-Agent, or a public API. Channels that work, recorded so the next wave does
not rediscover them:

| channel | form that works |
|---|---|
| OEIS record, verbatim | `curl "https://oeis.org/search?q=id:A144311&fmt=text"` |
| OEIS full-text / reverse citation | `curl "https://oeis.org/search?q=A048670&fmt=text"` |
| StackExchange bodies | `api.stackexchange.com/2.3/questions/<id>?site=<site>&filter=withbody` |
| MathOverflow / math.SE search | `api.stackexchange.com/2.3/search/advanced?q=…&site=mathoverflow.net` |
| arXiv PDF | `curl https://arxiv.org/pdf/<id>` — **no version suffix**; `…/pdf/<id>v2` returns HTML, not PDF |
| citations to a paper | `api.semanticscholar.org/graph/v1/paper/arXiv:<id>/citations` |

**Calibration 1 — A144311 retrieved.** Full record obtained. Terms
`1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617, 707, 869, 965,
1079, 1283, 1397, 1529, 1709`. Author Andrew Carter, Sep 17 2008; a(8)–a(16)
Max Alekseyev Nov 18 2009; a(17)–a(22) Jinyuan Wang Nov 26 2024. Keywords
`nonn,more,hard`.

The record's *shape* is itself a finding: **A144311 has no `%D` reference
field, no `%F` formula field, and no asymptotic comment.** Its only two `%H`
links are the StackExchange thread and Wang's C++ program. There is no theory
attached to it anywhere in OEIS.

**Calibration 2 — Mathematica StackExchange 114758 retrieved** (title "OEIS
A144311 Generating function", asked 2016-05-10). Full question body and all
three answers read. The thread is **pure Mathematica code-golf**: no bound, no
asymptotic, no reference beyond the sequence itself. It does confirm the
identification, in the asker's own words: *"what is the largest possible twin
prime gap relative to just {2,3,5}? … 11 is the max fails for {2,3,5}."*

**Calibration 3 — a positive control.** The searches below did return live
literature (Ziller–Morack; Erdős #687/#970; Kalmynin–Konyagin), so the channel
finds things when they exist. The negatives are therefore informative.

---

## 1. The right vocabulary, and what it is attached to

The literature's name for this family is **"paired progressions"** and the
**"paired Jacobsthal function"**. The whole relevant corpus is two 2017 arXiv
preprints by Mario Ziller and John F. Morack, plus three OEIS entries.

**Ziller and Morack, "Divisibility in paired progressions, Goldbach's
conjecture, and the infinitude of prime pairs", arXiv:1706.00317** — read in
full from the PDF. Definition 2.1 gives the paired Jacobsthal function j₂(n);
Definition 2.2 gives the primorial paired Jacobsthal function h₂(n) = j₂(pₙ#).

**Ziller and Morack, "A short note on the computation of the generalised
Jacobsthal function for paired progressions", arXiv:1706.03668** — read in
full, plus its ancillary `full_details.pdf` (31 pp.), which contains the
algorithms and the complete data.

Their quantifier is *"∀ (a,b) ∈ Z² with 2 | (b−a)"* — the difference b−a ranges
over **all even values**, not just 2. So h₂ is the worst case over every even
difference, and our G₂ is its difference-2 slice:

> **G₂(pₙ#) ≤ h₂(n),** and an upper bound on h₂ would bound G₂. None exists.

### Verified, not assumed

Both identifications were recomputed here from scratch rather than taken on
trust:

| check | result |
|---|---|
| A144311(n) = G₂(pₙ#) − 1, n = 1..9 | **exact agreement** with the OEIS terms at every n |
| h₂(n) as max over all even d, n = 1..5 | reproduced **2, 6, 18, 30, 66** = Ziller–Morack Table 1 |
| h₂ ≥ G₂ | holds, **strictly** at n = 3 (18 vs 12) and n = 5 (66 vs 42) |
| G₂(pₙ#) ≥ j(pₙ#), n = 1..7 | holds; j recomputed and matches A048670 |

The last row is the inclusion argument: twin-admissible ⊆ coprime, and the
maximal gap of a *subset* dominates that of its superset. It is one line and
unconditional.

---

## 2. The four questions

### (a) Is there any published upper bound, at any exponent? — **No.**

Ziller and Morack prove **no** upper bound. What they have is:

- **Conjecture 6** (their numbering): *"Let n ∈ ℕ≥3. Then h₂(n) < p²ₙ − pₙ."*
  Read from the PDF of arXiv:1706.00317, §4. Their own §4 introduces it as one
  of *"three new conjectures"* they *"alleged"*, and their Figure 1 caption
  marks the new conjectures in grey.
- **Theorem 4.1**: *"The conjectured upper bound of the primorial paired
  Jacobsthal function is sufficient for the truth of the Goldbach conjecture and
  of the infinitude of prime pairs for every even difference."* This is an
  **implication**, not a bound. Its proof is stated as following from
  Propositions 3.2 and 3.5 and Corollaries 3.1 and 3.4.

The ancillary `full_details.pdf` was grepped for `bound|theorem|asymptot|sieve|
Iwaniec`: every hit is either the *conjectured* bound, or a combinatorial bound
used to prune the search tree during computation. There is no analytic bound.

The one-class sibling, for contrast, does have one, and it is the exponent-2
benchmark our exponent-4.2665 result is the dimension-2 analogue of. From
**Erdős Problem #687** (erdosproblems.com/687, retrieved; status OPEN, $1000):

> *"The best known upper bound is due to Iwaniec [Iw78], Y(x) ≪ x². The best
> lower bound is due to Ford, Green, Konyagin, Maynard, and Tao [FGKMT18],
> Y(x) ≫ x·log x·log log log x / log log x, improving on a previous bound of
> Rankin [Ra38]. Maier and Pomerance have conjectured that Y(x) ≪ x(log x)^{2+o(1)}."*

Erdős #970 carries the same theorem in the h(k) currency: *"Iwaniec [Iw78]
proved h(k) ≪ (k log k)²."*

### The closest prior statement, and why it is not a bound

**MathOverflow 88323, "Analogues of Jacobsthal's function"** (Timothy Foo,
Feb 2012; two answers by Gerhard Paseman). Retrieved and read in full via the
API. This is the nearest miss in the entire wave and must be recorded precisely,
because it states our problem's general form four years before the
StackExchange thread OEIS does cite.

Foo's original question asks for exactly the bounded-classes-per-prime
Jacobsthal function:

> *"I would like to replace (Z/pZ)\* here by some other subset of Z/pZ formed by
> deleting other congruence classes modulo p (not necessarily pZ). But let's say
> that for each p, the number of congruence classes deleted is bounded by a
> constant. … we want an upper bound for a function analogous to j(n)."*

At two deleted classes per prime that is our regime. His later edit defines a
**"Jacobsthal-type function for polynomials"**:

> *"Let f ∈ Z[x]. Define g_f(n) to be the length of the shortest interval so that
> there always exists an m in that interval with (f(m), n) = 1. When f(x) = x, we
> recover the original Jacobsthal's function."*

**At f(x) = x(x+2), g_f(pₙ#) is precisely G₂(pₙ#)**, since gcd(f(m), n) = 1 iff
gcd(m(m+2), n) = 1. This is the correct polynomial framing of our object — and
it is the one Kalmynin–Konyagin's j_f (§3) is *not*.

What Foo has is a **question**, not a result: he asks *"what's a good
conjectural … upper bound on g_f(n)"*, and opens with the disclaimer
*"Everything here is redundant. There is probably nothing written here that has
not been expressed in better form in the language of sieve theory."*

Paseman's answer (score 6) is the only thing resembling a bound anywhere in the
two-class literature, and he disclaims it in his first line — *"I have no proofs
to offer at this time"*:

> *"I too would expect some power of log m to be an upper bound … I imagine an
> argument like that of Stevens combined with an aggressive attitude of error
> control that I brought to the argument should give you an upper bound for your
> analogous function like O(2^{C log n log log n}), which is worse than Iwaniec's
> but is easily made explicit. My feeling is that C will be proportional to the
> bound you put on the number of classes removed for each prime p."*

That is a sketch of a shape, unproved and never carried out, in a
quasi-polynomial currency rather than a power of x. **It is not an upper bound at
any exponent**, and it is a forum opinion rather than a publication. It does not
displace our claim, but it is the honest answer to "has anyone even tried": yes,
informally, in 2012, and it stopped at a feeling.

One independent confirmation from the same answer, worth keeping because this
wave derived it separately: *"if one were to take just one different residue
class other than 0 for each prime p dividing m, … the Chinese Remainder Theorem
shows you are just considering the same problem with a different offset."* That
is why the one-class problem has no free-choice/fixed-choice distinction while
the two-class problem does — the gap between A144311 (classes forced to differ
by 2) and A072753/A288815 (classes free).

**Verdict on our claim.** "The first upper bound at any exponent for the
two-class problem" **survives this wave**, now tested in the vocabulary that
owns the object. Two honesty constraints, both of which the corpus already
observes:

1. Our bound is on the **difference-2 slice** G₂, not on h₂. It does not touch
   Ziller–Morack's Conjecture 6, which quantifies over all even differences.
2. Our exponent 4.2665 is **worse than their conjectured exponent 2**. We prove
   at 4.2665 what they conjecture at 2. That is a real result and a real gap,
   and the sentence should not be allowed to imply otherwise.

### (b) Is β₂ = 4.2665 still the best known κ = 2 sifting limit? — **Yes, unimproved.**

**β₂ = 4.26645028414864191641…** (α₂ = 5.35772744559446184227…). Source of the
20-decimal value: the ancillary data page of **Booker and Browning,
"Square-free values of reducible polynomials"**, Discrete Analysis 2016:8
(`arxiv.org/src/1511.00601v2/anc/dhr.html`), which states the values are
truncated at the 20th decimal so the displayed number is a lower bound and
adding 10⁻²⁰ gives an upper bound. Original source: **Diamond, Halberstam and
Galway, *A Higher-Dimensional Sieve Method*, Cambridge Tracts 177 (2008),
Table 17.1, p. 227**. That table was *not* verified by direct sight — Cambridge
Core returned 500s — but four independent secondary reproductions agree to every
digit given (Booker–Browning; Blight's Rutgers thesis citing "[1, p.227]";
Franze JNT 131 (2011); Kao arXiv:1606.03505).

Everything published after 2008 is **worse at κ = 2**:

| work | year | β₂ | vs 4.2665 |
|---|---|---|---|
| Blight, Rutgers PhD thesis | 2010 | < 4.45 | worse |
| Franze, Λ²Λ⁻ sieve, JNT | 2011 | 4.516 | worse |
| Booker–Browning | 2016 | recomputes DHR to 20 dp | same |
| Brady, Stanford PhD thesis | 2017 | improves κ = 3/2 only | κ=2 untouched |
| Friedlander–Iwaniec, *Opera de Cribro* β-sieve | 2010 | ≈ 4.83 | worse |

Booker–Browning state the boundary explicitly: *"recent work of Franze [12] and
Blight [1] has shown that lower-bound sieves that are superior to the DHR sieve
are possible once κ ⩾ 3"* — that is, **not** at κ = 2.

The cleanest "still best known" citation is **Kevin Ford, *Sieve Methods
Lecture Notes, Spring 2023*** (ford126.web.illinois.edu/sieve2023.pdf), §3.1
Table 1 "Known upper bounds on the sieving limit β(κ)", listing κ=2 → 4.2665,
with the text *"The very complicated combinatorial sieves given in [28] give the
best known upper bounds on β(κ) for small κ"* ([28] = DHR 2008). Ford also
notes *"The exact value of β(κ) is known only for κ ∈ [0, 1/2] ∪ {1}"* — so
4.2665 is a best-known **upper bound** on the sifting limit, not the limit.
Selberg's conjecture β(κ) = 2κ would give β₂ = 4.

Maynard–Tao does **not** move β_κ: searched and found nothing claiming it does,
which is structurally expected since β_κ is a lower-bound-sieve quantity. Every
post-2013 paper needing β₂ (Kao 2016, Booker–Browning 2016, Johnston–Thomas
2025, Dudek–Dunn 2026) still cites the 2008 number.

**Digit caution for our corpus.** β₂ = 4.2664**5**028…, so `4.2665` is a valid
round-**up** and safe as an exponent, but `4.26650` would be a wrong statement of
the constant. The corpus was grepped: it uses `4.2665` (243×), `4.26645` (88×),
`4.26645028414864191641` (20×) and `4.26645028414864191642` (2×, the
Booker–Browning +10⁻²⁰ upper bound). **No occurrence of the erroneous
`4.26650`.** Nothing to fix.

### (c) Has anyone studied the asymptotic growth of A144311? — **Nothing found.**

Searched, found nothing. Specifically:

- A144311 itself carries no formula field and no asymptotic comment.
- A288815 (the h₂ sequence) carries only the Ziller–Morack conjecture.
- The `full_details.pdf` section that looked like a growth study is **growth of
  computation time**, not of the function; its Figure 2 is a timing plot.
- No paper, note, or forum post proposing a growth law for either sequence was
  located through any channel below.

The only published growth conjectures in the neighbourhood are for the
**one-class** sibling: A048670 carries *"Maier & Pomerance conjecture that
Max_{n ≤ x} A048669(n) = log(x)(log log x)^{2+o(1)} which suggests
a(n) = n(log n)^{3+o(1)}"*, and MO 88323 cites **R. C. Vaughan, "On the order of
magnitude of Jacobsthal's function", Proc. Edinburgh Math. Soc. 20, 329–331**
for the belief g(n) ≪ ω(n)^{1+ε}. Nothing analogous has been written down for
two classes. Our measured x·ln²x-to-x·ln³x band with a falling exponent has, as
far as this wave can determine, no published counterpart to agree or disagree
with.

The one unpublished datum that bears on it is Wang's a(23) ≥ 1859 (§4), which
is a lower bound on one further term, not a growth law.

### (d) Is there a published Erdős–Rankin lower bound for this object? — **No, but one is free.**

No lower-bound construction for the paired/two-class object was found. However
the inclusion G₂(pₙ#) ≥ j(pₙ#) (§1, verified n = 1..7) transfers the FGKMT
bound immediately:

> G₂(x#) ≫ x · log x · log log log x / log log x, from Ford, Green, Konyagin,
> Maynard and Tao, *J. Amer. Math. Soc.* 31 (2018) 65–105.

This is a one-line corollary of published work. It is correct to call it the
first such bound *recorded* for the two-class object, and correct that neither
OEIS entry nor Ziller–Morack states it — but it must stay labelled trivial, as
`G2-STATE.md` already labels it ("PROVEN, trivial"). It is not a new theorem.

---

## 3. A near-miss ruled out, so it is not rediscovered

**Kalmynin and Konyagin, "A polynomial analogue of Jacobsthal function",
arXiv:2302.00459** (Steklov / HSE, revised Dec 2023). The title is a direct hit
on our search terms and the paper must be positively excluded. Read from PDF:

> j_f(N) = max_m { For some x ∈ ℕ the inequality (x + f(i), N) > 1 holds for all i ≤ m }

with, in their own words, *"instead of the intervals not containing numbers
coprime to N we study shifts of polynomial sequences."* This sieves the values
of a **shifted polynomial sequence** x + f(i). Our object requires **two shifted
linear forms simultaneously** non-coprime, gcd((x+i)(x+i+2), N) > 1, which is
not of the form x + f(i) for any f. **Their j_f does not express G₂.** Their
Theorem 1 is a **lower** bound only; the paper states no upper bound for j_f.
Their ℓ_f ("number of distinct linear factors") is what makes the title look
like our reducible n(n+2), and it is not.

---

## 4. The three people behind the sequence

Lead 1 of the brief was that **Max Alekseyev** is where our novelty claim was
most likely to die, since he extended a(8)–a(16) in Nov 2009 and publishes
professionally. **He did not write anything about this object.** This is the
most thoroughly searched negative in the wave:

- arXiv author listing (33 papers): **zero** titles containing Jacobsthal,
  primorial, prime gap, twin, coprime, sieve or covering.
- His full publications page, `blogs.gwu.edu/maxal/pubs/` (158 entries): the
  strings `Jacobsthal`, `primorial`, `coprime`, `sieve`, `gap` — and even the
  substring `prime` — appear **zero times**. DBLP (75 entries) agrees.
- MathOverflow (user 7076): `q=jacobsthal user=7076` returns **no results**.
  He has never used the word on MO; the MO Jacobsthal discussion belongs to
  Gerhard Paseman and Timothy Foo (§2), and Alekseyev did not participate.
- OEIS wiki gpscripts page and GitHub (24 repos): nothing adjacent.
- All 23 revisions of A144311's history read: his 2009 edit carries **no
  comment, no formula, no note, no link**. His only other touch is Dec 2024,
  adding `Cf. A049300`.

His work here was purely computational: A048670 a(21)–a(24) (2006), A049300
(Nov 14 2009) and A144311 a(8)–a(16) (Nov 18 2009) — four days apart, evidently
one primorial-covering search pointed at both.

**Jinyuan Wang** has no note, paper, blog or repo; his OEIS user page is three
lines. But the **revision-history discussion log for revisions #18–#20 (Nov 26
2024), which is not visible on the published sequence page**, yields a real
datum:

> *"162791254787456816384305457582341 starts a sequence of 1859 consecutive
> integers, each of which is congruent to 1 or −1 modulo at least one of the
> first 23 primes. It is estimated that it will take 12 days (which is too long
> for me) to calculate a(23)"* — and *"it takes me about 17 hours to compute
> a(22)"*.

So there is an **unpublished lower bound a(23) ≥ 1859 with an explicit
witness**, i.e. G₂(83#) ≥ 1860. It is consistent with the mod-6 structure
(1859 = 6·309 + 5). This is a free extra data point for our ladder, and it is
not in the sequence data, so it should be cited to the revision log, not to
A144311.

His `a144311.cpp.txt` is a hand-rolled branch-and-bound DFS with no library and
no citations. It works in a 6-compressed coordinate (primes 2 and 3 handled
structurally, answers emitted as `6*maxm + 5`, which is what forces the known
a(n) ≡ 5 mod 6), and encodes the twin constraint through `pskip`, defined by
the comment `6 * pskip[i] == 2 (mod plist[i])`. That line is load-bearing
confirmation that **A144311 is the difference-exactly-2 case**, not the
free-pair case.

**Andrew Carter**, the 2008 submitter, has no user page (404) and exactly three
OEIS sequences, all from 2008 under `acarter09(AT)newarka.edu`. No writeup, no
motivation, no other trace. The original submission had 7 terms and a bare
example block.

**One gap left open, disclosed rather than papered over:** the 2009 SeqFan
mailing-list archive is the one place an Alekseyev methodological note could
still hide. `list.seqfan.eu` is dead; the archived mbox at
`web.archive.org/web/20141123141637/http://list.seqfan.eu/pipermail/seqfan/2009-November.txt.gz`
was attempted **four times** and returned HTTP 503 ("Internet Archive services
are temporarily offline") every time. No mirror exists (mail-archive.com 404,
marc.info 204, Google Groups carries only the post-migration archive).
**Searched, blocked by an outage, not verified.**

---

## 5. What was searched, including the dead ends

**Reverse-citation searches — the class of search five earlier waves never ran.**
Earlier waves only walked cross-references *forward*, which is how the object
was missed.

| query | result |
|---|---|
| OEIS full text `A144311` | **only A144311 itself.** No OEIS sequence anywhere references it |
| OEIS full text `A048670` | A056169, A048669, A058989, A049300, A072752, A132468, A128707, A329815, A331118 |
| OEIS full text `A049300` | A048670, A058989, A144311, A292023 |
| OEIS full text `A058989` | A072752, A132468, **A009190**, **A013581**, A292023 |
| OEIS full text `"paired Jacobsthal"` | **A288815** |
| Semantic Scholar, citations to arXiv:1706.03668 | **zero** citing papers |
| Semantic Scholar, citations to arXiv:1706.00317 | **one**, its own companion note |

Three OEIS entries surfaced this way that the forward walk never reached:

- **A288815** "Paired Jacobsthal function applied to the product of the first n
  primes" (Ziller, Jun 2017) — the h₂ sequence, 21 terms, keyword `hard,more`.
  Its comment states the Goldbach/twin implication. **It does not cross-reference
  A144311, and A144311 does not cross-reference it.** The two entries are
  disconnected in OEIS, which is the mechanical reason the forward walk failed.
- **A072753** "Maximum gap in two-stage prime-sieves" (**Mario Ziller, Jul 10
  2002**) — six years older than A144311. Its formula field is literally the
  brief's "covering systems where each prime is used once with two residue
  classes", and Giovanni Resta's comment restates it exactly: *"a(n) is the
  maximal value m such that there exist n−2 pairs 0 ≤ a_i, b_i < prime(i) …
  such that each number between 1 and m is either a_i or b_i mod prime(i)."*
  Related by a(n) = (A288815(n) − 6)/6.
- **A013581** (Paw Hermansen) — max_e min{i ≥ 0 : both e+i and e−i coprime to
  pₙ#}. A *symmetric two-sided* variant, 10 terms, no references. Adjacent, not
  ours.

**Vocabulary searches run** (all four bullets from the brief, plus variants):
"longest run of consecutive integers each congruent to 1 or −1 modulo some
prime"; "consecutive integers covered by residues ±1 mod the first n primes";
covering systems with two residue classes per prime; "relative twin primes";
Jacobsthal function for admissible k-tuples / for pairs / twin analogue;
maximal gaps between twin candidates / potential twin primes / twin residues;
the reducible polynomial n(n+2) and its Jacobsthal-type function; Erdős–Rankin
with two classes per prime; "paired Jacobsthal" + upper bound + sieve; Ziller
Morack asymptotic growth since 2017.

**MathOverflow and math.stackexchange — and a correction to my own negative.**
Four queries were run against **both** sites via the API: `paired Jacobsthal`,
`twin Jacobsthal function`, `Jacobsthal twin primes primorial gap`,
`consecutive integers congruent 1 or -1 modulo primes`. Every one returned zero
relevant results.

**That negative was wrong, and the way it was wrong is the lesson of this
wave repeating itself.** A parallel search on the plain phrase *"analogues of
Jacobsthal's function"* found **MO 88323** (§2), which states our problem's
general form and contains the only bound-shaped claim in the two-class
literature. My four queries all carried our vocabulary — "twin", "paired",
"primorial", "1 or −1" — and the thread uses none of those words. A negative
from a query set is only ever a negative about that query set.

Two further computational threads were found, neither linked from OEIS except
the second:

- **math.SE 1779109** — **Robert Israel** gives a clean **ILP formulation** of
  A144311 (0-1 variables x_{p,a}, cover constraint
  `Σ_p Σ_{a ≡ i±1 mod p} x_{p,a} ≥ 1`) and reports CPLEX proving m = 527
  feasible and m = 528 infeasible for n = 12 in about 22 seconds; **joriki**
  gives a brute-force/greedy hybrid with explicit complexity counts. This is
  the same ILP framing Giovanni Resta used on A072753, independently
  rediscovered and never connected to it.
- **mathematica.SE 114758** — the thread OEIS does cite; three answers, all
  naive sieving, none reaching past n ≈ 10 (§0).

**Could not access, and did not infer around:** DHR 2008 Table 17.1 itself
(Cambridge Core HTTP 500); Halberstam–Richert *Sieve Methods* 1974 (lending
only); the ScienceDirect PDF of DHR 1988 JNT (403).

---

## 6. Net effect on the corpus

**Nothing in the corpus is refuted by this wave.** The relevant `PRIOR-ART.md`
rows and the `G2-STATE.md` ledger already hold Ziller–Morack, A288815, A072753,
A144311, Erdős #687/#970 and Iwaniec 1978, and already label the lower bound
trivial. This wave is an independent confirmation of those rows, obtained in the
literature's own vocabulary rather than ours, plus:

1. **MO 88323 (Foo, 2012)** — the general form of our problem, and the
   polynomial framing g_f with f(x) = x(x+2) that *is* G₂, together with
   Paseman's explicitly unproved O(2^{C log n log log n}) sketch. This is the
   nearest thing to prior art on the upper bound and it is not a bound. It
   should be cited in `PRIOR-ART.md` row 26 alongside Ziller–Morack, because
   "no published bound found" is stronger and more defensible when it also says
   where someone tried and stopped.
2. The reverse-citation result that **nothing cites A144311** and that A144311
   and A288815 are mutually unlinked in OEIS — the mechanical cause of the
   five-wave miss, now diagnosed rather than merely regretted.
3. **A072753 (2002)** as the oldest entry in the two-class family, predating
   A144311 by six years.
4. **Alekseyev wrote nothing** — the brief's highest-risk lead, closed as a
   thoroughly documented negative (§4).
5. **Wang's unpublished a(23) ≥ 1859**, with witness, recoverable only from the
   OEIS revision log — a free extra rung.
6. Independent recomputation of both identifications (§1) rather than
   citation-trust.
7. A positive exclusion of Kalmynin–Konyagin as a different generalisation.
8. The β₂ digit check across the corpus, clean.

**One caution carried forward.** The §5 correction — four MathOverflow queries
returning a confident zero while the relevant thread sat under a phrase none of
them contained — is the same failure as the original five-wave miss, at smaller
scale, inside the wave sent to fix it. The rule it argues for: a negative is
reportable only as a negative *about the queries run*, and the queries must be
listed. This report lists them.
