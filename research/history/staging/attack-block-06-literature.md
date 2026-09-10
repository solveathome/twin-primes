# Attack 6: the literature on the block object (2026-08-18)

<!-- ledger
id: Q-block-literature
status: ANSWERED
todo: none
question: Does the literature already own the range-restricted covering object behind the block v -> v^2?
verdict: FOUND, and it has a name: the range-restricted covering problem is Erdős Problem #688 and is OPEN, the bounded-capacity conjecture #1200 is a third trap of the same class as the brief's two, and the Kalmynin-Konyagin journal version that covering-dive.md says does not exist does; the remaining negatives are ABSENT-AFTER-COMPETENT-SEARCH on calibrated channels.
-->

Web-enabled literature attack on the BLOCK object of `BLOCK-BRIEF.md`. Sole attack
of the ten with web access. Every claim below carries the URL it came from and the
version/date I actually read.

---

## 0. The translation, done first and stated explicitly

House vocabulary out, canonical vocabulary in. Sources for the mapping:
`research/GLOSSARY.md`, `research/PRIOR-ART.md`.

| house term | canonical statement |
|---|---|
| tile `T_v` mod `v#` | the residues `r` mod `v#` with `gcd(r(r+2), v#) = 1`; the periodic **sifted set of the two-dimensional sieving system** `I_p = {0, -2} (mod p)`, `p <= v` |
| twin slot | element of that sifted set; "admissible position for the pair `(n, n+2)`" |
| fold at `u` | deletion of the residue pair `{a_u, a_u - 2}` mod `u` |
| BLOCK `v -> v^2` | the alphabet of moduli is **restricted to the range** `(v, v^2]`, i.e. to `(n^{1/2}, n]` with `n = v^2` |
| COMBINED `L` | the **covering optimum**: max length of a run of consecutive elements of the `v`-sifted set coverable by one residue pair per prime in `(v, v^2]` |
| `G2(x#)` | the **two-class (difference-2) Jacobsthal function** at the primorial; `G2(x#) - 1 = Y_2(x)` in Erdos's `Y(x)` currency |
| the zone `(v, v^2]` | the classical `p^2` crystallization interval; Holt's "interval of survival" |

So the object is: **a Jacobsthal / Erdos `Y(x)` extremal covering problem of
dimension 2 with a range-restricted prime alphabet.** In Erdos's own currency:
`Y(x)` with the primes restricted to `(x^eps, x]` rather than `[2, x]`, and with
two classes per prime rather than one.

That translation is what unlocked question 1. The canonical name for the
range-restricted regime is **the small sieve**.

---

## Calibration (rule: prove the method finds a known positive before claiming absence)

Run before any absence verdict. Four independent channels, each with a target this
corpus already cites correctly.

| channel | probe (known positive) | result |
|---|---|---|
| WebSearch | Ziller-Morack, arXiv:1706.00317 / 1706.03668 | **HIT**, correct titles, both ids |
| WebSearch | Kalmynin-Konyagin, arXiv:2302.00459 | **HIT**, and surfaced the journal version (see Q2) |
| OEIS via `curl .../search?q=...&fmt=json` | `6,10,14,22,26,34,40,46,58,66` | **HIT**, A048670 (Jacobsthal at primorials) with full comment block |
| OEIS, same channel | `A288815` | **HIT**, paired Jacobsthal, 21 terms |
| Semantic Scholar citations API | `arXiv:1802.07604` (FKMPT) | **HIT**, 8 citing works listed |
| OpenAlex `cites:` filter | Iwaniec 1978 (`W129012938`) | **HIT**, 83 citing works enumerated |
| arXiv API abstract search | `abs:"Jacobsthal function"` | **HIT**, 15 entries incl. all the ones we know |

One extraction-level calibration, which mattered: `pdftotext` silently drops the
`≪` / `≫` glyphs in the FKMPT PDF, rendering both as the byte `\x1c` / `\x1d`.
I read the paper's own notation paragraph to fix the mapping (`\x1c = ≪`,
`\x1d = ≫`) before quoting any inequality. Without that step I would have
reported FKMPT as proving an upper bound. It does not. See Q3.

---

## Q1. Is the RANGE-RESTRICTED version studied at all?

### VERDICT: **FOUND.** It has a name, a 1980 paper, a survey, and three open Erdos problems.

The name is **the small sieve**: sifting by a set of primes whose reciprocal sum
is bounded, as opposed to an initial segment. Andrew Granville states the
identification for our exact case, verbatim, in the opening of
[arXiv:2010.01211v1](https://arxiv.org/abs/2010.01211) *Sieving intervals and
Siegel zeros* (2 Oct 2020; published Q. J. Math. 2022):

> "This question is an example of problems that can be attacked by the small
> sieve (as is, for example, **estimating pairs of integers that differ by 2,
> which have no small prime factors**)."

That parenthesis is our tile.

### The exact range-restricted covering problem is Erdos Problem #688, and it is OPEN

<https://www.erdosproblems.com/688> (page last edited 07 April 2026), sources
[Er79d], [Er80, p.106], verbatim:

> "Define `eps_n` to be maximal such that there exists some choice of congruence
> class `a_p` for all primes `n^{eps_n} < p <= n` such that every integer in
> `[1,n]` satisfies at least one of the congruences `= a_p (mod p)`.
> Estimate `eps_n` - in particular is it true that `eps_n = o(1)`?"
> ... "Erdos could prove `eps_n >> log log log n / log log n`."

Set `n = v^2`. Then the alphabet `(n^{1/2}, n]` **is** `(v, v^2]`. **Erdos #688 at
`eps = 1/2` is the one-class, full-length version of our block.** Our object is
the two-class version of the same alphabet, asking for the extremal run length
rather than the yes/no at length `n`.

### The bounded-capacity conjecture is #1200, and it is Trap 1 in print

<https://www.erdosproblems.com/1200> (last edited 08 April 2026), [Er80, p.106]:

> "There exists a constant `C` such that for all large `x` there is a collection
> of primes `p_1 < ... < p_k < x` with `sum 1/p_i < C` together with a system of
> congruences `a_i (mod p_i)` such that every integer `n < x` satisfies at least
> one of these congruences."
> ... "certainly proving `eps_n >= c` would prove this conjecture (**taking P to
> be all primes in `[x^c, x]`**)."

That parenthetical is the formal link: **range-restriction and bounded capacity
are the same problem.** Our block has `sum_{v < p <= v^2} 2/p -> 2 ln 2 = 1.3863`,
the constant `BLOCK-BRIEF.md` Trap 1 computes. In the one-class case the same sum
is `ln 2 = 0.693 < 1`, below the union-bound threshold, which is exactly why the
second residue class is what puts this alphabet above the covering threshold at
all. Trap 1 is not a quirk of our setup. It is the defining feature of the small
sieve, and Erdos priced it at $100 for the density version.

### The density half of the small sieve is SOLVED; the maximal-run half is not

- **P. Erdos and I. Z. Ruzsa, "On the small sieve. I. Sifting by primes",
  J. Number Theory 12 (1980) 385-394.**
  <https://static.renyi.hu/~p_erdos/1980-29.pdf> ·
  <https://www.sciencedirect.com/science/article/pii/0022314X80900323>
  Main theorem: if `P` is a set of primes with `sum 1/p <= K`, the count of
  `n <= x` divisible by no element of `P` is `>= c(K) x`.
- Sequel: **"On the small sieve. II. Sifting by composite numbers",
  J. Number Theory 14 (1982) 260-268.**
- **A. Hildebrand, "Extremal problems in sieve theory"**, in *Analytic number
  theory (Japanese) (Kyoto, 1994)*, Surikaisekikenkyusho Kokyuroku **958** (1996)
  1-9. Cited by Ben Green as the survey for this exact object.
- Sharp form, now settled: Erdos Problem **#783** (<https://www.erdosproblems.com/783>,
  status SOLVED) records that Hildebrand [Hi87b] proved the extremal density is
  `rho(e^C)` (Dickman) for prime alphabets, answering Erdos-Ruzsa, and that Tao
  has since resolved the general asymptotic. **#784** (SOLVED) is the
  `x/(log x)^c` variant, with `H_1(x) ~ x/log x` from Ruzsa 1982 (lower) and
  Saias 1998 (upper), refined by Weingartner 2025.
- **A. Granville and K. Soundararajan, "The number of unsieved integers up to x",
  [arXiv:math/0308009v1](https://arxiv.org/abs/math/0308009) (1 Aug 2003)** is the
  modern treatment of the same extremal density.
- **Ben Green, "100 Open Problems"**
  <https://people.maths.ox.ac.uk/greenbj/papers/open-problems.pdf>, Problem 46 is
  Jacobsthal, and its comment carries the small-sieve variant verbatim: "Erdos
  and Ruzsa [114] and Hildebrand [173] mention the following elegant problem of a
  similar type: can one cover `[x]` with residue classes `a(p) (mod p)`, `p <= x`,
  at most one for each prime `p`, and with `sum 1/p <= K`? Erdos and Ruzsa suggest
  that in fact the answer is no, and moreover that the uncovered set should have
  size at least `c(K)x`."

### The other range-restricted line: distinct moduli in `(N, KN]`

**M. Filaseta, K. Ford, S. Konyagin, C. Pomerance, G. Yu, "Sieving by large
integers and covering systems of congruences", J. Amer. Math. Soc. 20 (2007)
495-517**, <https://www.math.kent.edu/~yu/research/covering.pdf>. Erdos-Graham
Conjecture 2, stated on p.496: moduli drawn from `(N, KN]`, one class each, the
uncovered set must have density `>= d_K`. They prove strong forms. Also
`arXiv:1811.03547` (Balister-Bollobas-Morris-Sahasrabudhe-Tiba, density of the
uncovered set) and `arXiv:2506.11359` (2025, non-existence intervals).

Their p.496 remark is the published statement of why capacity counting is vacuous
for us, verbatim:

> "If `n_1, n_2, ..., n_l` are pairwise coprime, **there is no mystery about
> `delta`.** Indeed, the Chinese remainder theorem implies that for any choice of
> residues `r_1, ..., r_l`, `delta = prod (1 - 1/n_i)`, which is necessarily
> positive if each `n_i > 1`."

Our moduli are distinct primes, hence pairwise coprime, hence "no mystery". The
`prod(1 - 2/p) -> 1/4` of Trap 1 is that sentence.

### What is NOT in the literature

The range-restricted **maximal-run** quantity, at any dimension. Every source
above measures the **density** of the uncovered set. Nobody I found asks for the
longest covered interval with a range-restricted alphabet. That is the gap our
`L` sits in, and it sits between a solved problem (density, Hildebrand/Tao) and an
open Erdos problem (full covering at fixed `eps`, #688).

### The consequence: a THIRD trap, of the same class as the two in the brief

**THE ERDOS TRAP.** Any lower-bound construction for the block object -- any
argument of the form "primes in `(v, v^2]` CAN cover a run of length `f(v)`" with
`f` large -- is progress on Erdos #688 in the direction he asked about, and by
#1200's own parenthetical would bear directly on the $100 Erdos-Ruzsa small-sieve
conjecture. Erdos's best is `eps_n >> lnlnln n / lnln n`, which tends to 0; nobody
has a construction at fixed `eps`. So the construction side of the block is
already an open Erdos problem at dimension 1, and dimension 2 is strictly richer.
This does not block an UPPER bound on `L`, which is the direction we want, but it
does mean **any attack that needs a matching construction to be tight is dead on
arrival**, and any claim that the block's covering optimum is nearly achieved
needs to explain why it is not settling #688.

---

## Q2. Kalmynin-Konyagin follow-up, and range-restrictability

### VERDICT: **FOUND** on all three sub-questions. One correction to the corpus, one structural answer.

### 2a. THE JOURNAL VERSION EXISTS. `covering-dive.md` says it does not.

`research/covering-dive.md:112` states "no journal reference as of 2026-08-18".
That is wrong, and the arXiv record is why: **arXiv:2302.00459 carries no
`journal-ref` field**, checked directly at <https://arxiv.org/abs/2302.00459>
(v1 Wed 1 Feb 2023 14:03:58 UTC, 9 KB; v2 Sun 3 Dec 2023 11:00:18 UTC, 10 KB;
comments "12 pages, mistakes and misprints corrected in version 2";
MSC 11N25, 11N32; DOI field is only the arXiv DataCite DOI). The paper was
nonetheless published sixteen months ago:

> A. B. Kalmynin and S. V. Konyagin, **"A polynomial analogue of Jacobsthal
> function"**, *Izvestiya: Mathematics* **88**:2 (2024) 225-235.
> Russian original: *Izv. RAN. Ser. Matem.* **88**:2 (2024) 33-43.
> DOI **10.4213/im9467e** · MR **4727548** · Zbl **07838021**.
> Received 9 February 2023, revised 12 June 2023, published 4 April 2024.
> <https://www.mathnet.ru/php/archive.phtml?wshow=paper&jrnid=im&paperid=9467&option_lang=eng>

Cite the Izvestiya version. The methodological lesson is worth keeping: **an
absent `journal-ref` on arXiv is not evidence of an unpublished paper**, and for
Steklov authors it is close to no evidence at all.

### 2b. Citations and follow-ups: essentially none, and I checked three ways

- Semantic Scholar `arXiv:2302.00459/citations`: **empty list**. Same endpoint
  returns 8 for FKMPT (calibration above), so the endpoint works.
- OpenAlex: the Izvestiya record `W7117111366`-adjacent entries appear in the
  Iwaniec-1978 citing set but nothing cites them back.
- arXiv API, all Kalmynin output, sorted by date: after 2302.00459 his only
  solo paper is **arXiv:2504.10202v2, "On additive irreducibility of
  multiplicative subgroups"** (14 Apr 2025, rev 28 May 2025), a Stepanov-method
  paper with no sieve content. Nothing by either author extends `j_f`.

The nearest live descendants, none of which cite 2302.00459:

- **K. Ford and M. R. Gabdullin, "Long strings of consecutive composite values of
  polynomials", [arXiv:2310.20449v1](https://arxiv.org/abs/2310.20449)
  (31 Oct 2023, 22 pp., dated 1 Nov 2023, no journal-ref as of today).** Improves
  FKMPT's `(log x)(log log x)^{c_f}` to `(log x)(log log x)^{1/835}` with an
  absolute exponent. **Verified: it cites [5] FGKMT and [6] FKMPT and does NOT
  cite Kalmynin-Konyagin.** Still `|I_p|` of average 1 -- one-dimensional.
- **R. Dietmann, C. Elsholtz, A. Kalmynin, S. Konyagin, J. Maynard, "Longer gaps
  between values of binary quadratic forms", IMRN 2023, no. 12, 10313-10349**
  <https://academic.oup.com/imrn/article-abstract/2023/12/10313/6595488> ·
  <https://www.math.tugraz.at/~elsholtz/WWW/papers/papers77large54.pdf>
  (all five authors; Richards' `1/4` improved to `390/449 = 0.868...` for sums of
  two squares). This is the paper whose Theorem 5 K-K name as their motivation.
- **B. Zmija, "Large gaps between values of several binary quadratic forms",
  [arXiv:2509.15365v1](https://arxiv.org/abs/2509.15365) (18 Sep 2025)** --
  "improves and generalises a result by Dietmann, Elsholtz, Kalmynin, Konyagin,
  and Maynard".
- **A. B. Kalmynin and S. V. Konyagin, "Large gaps between sums of two squares"
  (2019)** -- the predecessor in the same programme, newly noted here.
- **S. V. Konyagin, "On the local distribution of elements of subsets of the set
  of positive integers", Math. Notes 118 (2025) 752-763; Mat. Zametki 118:4
  (2025) 515-528, DOI 10.4213/mzm14596** (received 2 May 2025, accepted
  10 May 2025). Abstract verbatim: *"For an infinite set `A subset N`, let the
  function `rho(x,y;A)`, where `x in N` and `y+1 in N`, be defined as the length
  of a maximal interval `(alpha,beta) subset (y, x+y)` disjoint from `A`. We
  study the function `rho_*(x;A) = inf_{y+1 in N} rho(x,y;A)`."* This is a
  Jacobsthal-type function for a **general** set, by the K of FKMPT, in 2025.
  It is the *infimum* over positions, so it is not our sup, and the worked case is
  the squarefrees. **New to this corpus, and the clearest evidence that the
  general-set gap function is live territory for exactly the people who would
  find our object.**

### 2c. Is the K-K construction range-restrictable to `(v, v^2]`? **NO, and the obstruction is quantitatively Trap 1.**

Read from the v2 PDF (left-margin stamp `arXiv:2302.00459v2 [math.NT] 3 Dec 2023`),
proof of Theorem 1, §2. The construction is a **three-band** Erdos-Rankin with

  `z_0 = (ln y)^A`,  `z_1 = exp( ln y / (A ln ln y) )`

- **Step 1**: `x_p = 0` for `p <= z_0` and for `z_1 < p < y/2`. Purpose: force
  `|k(i)|` to be prime or `z_1`-smooth. **Needs the small primes.**
- **Step 2**: `z_0 < p <= z_1` only. This is the sole band where the multi-class
  fibre `Omega_p^III = {t : f(t) = y_p (mod p)}` of size `M_p(f)` is used.
- **Step 3**: greedy mop-up using the `pi(y) - pi(y/2) = (2+o(1))y/ln y` primes
  left in `(y/2, y]`, one leftover integer at a time.

Their entire gain over Rankin is the third Mertens sum, verbatim from p.6:

> `sum_{z_0 < p <= z_1} M_p(f)/p = M(f) (ln ln z_1 - ln ln z_0) + O(1)`

**Now restrict to our band.** Put `z_0 = v`, `z_1 = v^2`, `M(f) = 2`:

  `M(f) (lnln v^2 - lnln v) = 2 ln 2 = 1.3863`

That is **exactly the Trap 1 constant** in `BLOCK-BRIEF.md`. Their machinery,
evaluated on our alphabet, produces a **bounded** exponent, so the Rankin factor
`(ln z_1 / ln z_0)^{M(f)}` collapses to `2^2 = 4`, a constant. All three of their
bands are also structurally unavailable to us: we have no small primes (`p <= v`
is the sieve already done, not free choice), no smoothness lever, and no separate
mop-up band. **DEKKM (IMRN 2023) has the same shape** -- four bands
`X_1 < X_2 < X_3 < 4Y`, checked in their §7 case analysis.

So the answer is a clean structural one: **the published multi-class
Erdos-Rankin gain is a function of the log-log width of the prime alphabet, and
a squaring band has log-log width `ln 2`. The literature confirms Trap 1 from the
construction side.** This is independent corroboration, not a restatement.

---

## Q3. Is there any published UPPER bound for a two-class Jacobsthal at any exponent?

### VERDICT: **ABSENT-AFTER-COMPETENT-SEARCH.** The claim survives, and it survives the one query the previous audit said it could not run.

`research/history/staging/qc-wave6-X.md` §C1 marked this SURVIVES at
MEDIUM-HIGH confidence and listed, as item 7 of its coverage caveats, the single
query that would settle it: *"the citation graph of Iwaniec 1978 (MathSciNet
'Citations' tab), which is the one query that would settle C1 and C4 outright."*

**I ran it, via OpenAlex, which is free and does not need MathSciNet.**
`https://api.openalex.org/works?filter=cites:W129012938` -- W129012938 is
*ON THE PROBLEM OF JACOBSTHAL* (1978). **83 citing works, all enumerated.**
The number-theoretic ones are: Kalmynin-Konyagin 2024 (both language versions),
Kalmynin-Konyagin 2019 (sums of two squares), Konyagin 2025 (local distribution),
Granville 2022 (Siegel zeros), FGKMT 2016 and 2017, Maier-Pomerance 1990,
Hagedorn 2008, Costello-Watts x4 (2012-2014, all one-class computational),
Chadozeau 2008, Pomerance 1980, Greg Martin 1997, McCurley 1986, Pritchard x3,
Granville 2008 (smooth numbers), Ribenboim 1996, Narkiewicz 2011, Li-Pratt-Shakan
2017, plus a long tail of unrelated algebra/CS/graph-theory hits that cite it for
the state-complexity or primitive-root corollaries.

**Not one of the 83 is a multi-class upper bound.** Konyagin himself, who has
cited Iwaniec 1978 in 2019, 2024 and 2025, has never stated one.

Secondary channels, all negative:
- zbMATH Open API, `ti: Jacobsthal`, 324 records, top 100 read. The
  number-theoretic subset is Iwaniec 1978, Kanold 1967, **Vaughan 1977**,
  Hagedorn 2009, Ziller-Morack 2016, Ziller 2019, Mercer 2018, Kalmynin-Konyagin
  2024, Borosh-Hensley-Hobbs 1997, Pighizzini-Shallit 2002. Every one of those is
  already in `research/covering-dive.md` §1. No new item, no two-class bound.
- arXiv API `abs:"Jacobsthal function"`: 15 entries, all triaged, all one-class.
- arXiv API `abs:"sieved set" OR abs:"sieving system"`: 8 entries, none relevant.

### The one thing that looked like a counterexample, and why it is not

FKMPT's twin remark reads, in the `pdftotext` output, as if it announced an upper
bound. It does not. **Verified at the byte level** against the paper's own
notation paragraph. Published/Revision-2 text, verbatim:

> **Remark 7.** "Unfortunately our methods only seem to give good results in the
> one-dimensional case. Consider for instance the set `{n in P : n+2 in P}` of
> (the lower) twin primes. This corresponds to a two-dimensional system in which
> `I_p = {0 (mod p), 2 (mod p)}` for all primes `p`. The 'trivial' bound coming
> from these methods would give a bound of **`>>` log X log log X** for the
> largest gap between lower twin primes up to X (or between the largest such twin
> prime and X), and one could possibly hope to improve this bound by a small power
> of log log X using a variant of the methods in this paper. However, a sieve
> upper bound (e.g., [7, Cor. 2.4.1]) combined with the pigeonhole principle
> already gives a bound of **`>>` log^2 X** in this case."

Both are `>>`: **lower** bounds on the gap, from pigeonhole against a sieve upper
bound on the *count*. `covering-dive.md`'s reading is faithful. Two custody notes:

1. **The remark is number 7 in the published/Revision-2 text and number 4 in the
   earlier preprint** at <https://math.dartmouth.edu/~carlp/longgaps.pdf>. The
   corpus cites "Remark 7", which is right for the version that matters. Anyone
   checking against the Dartmouth `longgaps.pdf` will look at the wrong remark
   and should be told to use `gaps_sievedsets_Revision2.pdf` instead.
2. **`[7, Cor. 2.4.1]` is identified.** Revision 2's bibliography line 1666:
   `[7] H. Halberstam and H.-E. Richert, Sieve Methods, Academic Press, London,
   1974.` This closes the open identification in `research/natal-cap-10-sieve-cap.md`
   §5, where the source of Cor. 2.4.1 was recorded as lending-locked and
   unconfirmed. It is Halberstam-Richert, confirmed from FKMPT's own reference
   list. (Still not *read* -- the book remains lending-locked.)

### One free improvement to `paper/beta2-note.md`, and one that is not

- The note says DHR's `beta_2 = 4.26645...` is "the BEST kappa=2 sifting limit",
  comparing 4.42 Ankeny-Onishi and 4.834 Rosser-Iwaniec, and cites Franze's 4.516
  for `Lambda^2 Lambda^-`. **New supporting datum: Sara E. Blight, *Refinements of
  Selberg's Sieve*, PhD thesis, Rutgers 2010 (advisor Iwaniec),
  <https://rucore.libraries.rutgers.edu/rutgers-lib/27420/>, obtains
  `beta_2 < 4.45`, `beta_3 < 6.458`, `beta_4 < 8.47` using Selberg's
  three-prime-factor weights.** 4.45 is an improvement on Franze's 4.516 and is
  **still worse than DHR's 4.26645**, so the note's choice stands and its
  superlative gets a third data point. Blight is not currently cited anywhere in
  this repo and should be, as a completeness citation in §2.
- The note's own absence sentence -- *"No upper bound for `G_2` at any exponent
  appears in the literature"* -- **survives this attack**, now with the Iwaniec
  citation graph behind it. Raise its confidence from MEDIUM-HIGH to HIGH.

Remaining blind spot, unchanged from wave 6 and I could not close it: **books.**
Diamond-Halberstam-Galway Ch. 10 "applications" and Greaves' *Sieves in Number
Theory* are not full-text searchable from here. If the claim is wrong, that is
where it is wrong.

---

## Q4. Is the `v -> v^2 -> v^4` squaring ladder used as a proof device?

### VERDICT: **ABSENT-AFTER-COMPETENT-SEARCH**, with one caveat that is already in the corpus.

Vocabularies tried, all negative for a *squaring* recursion: iterated sieve /
bootstrap ladder `z -> z^2`; self-improving sieve bound; recursion on the
primorial `h(p_{n+1}#)` from `h(p_n#)`; sieving level squaring; `y -> y^2`
self-similar induction. Nothing.

What the literature does instead, uniformly, is a **one-shot multi-band
decomposition**, not a ladder. K-K use three bands, DEKKM four, FKMPT/FGKMT the
Erdos-Rankin smooth/prime/greedy split. In every case the bands are traversed
once and the ranges are chosen to optimise a single Mertens sum. Nobody feeds the
output of the band `(z_0, z_1]` back in as the input to `(z_1, z_1^2]`.

The one genuinely close object is **already in `research/PRIOR-ART.md`**: Holt's
`Delta-H(p_k) = [p_k^2, p_{k+1}^2]`, the "interval of survival" with the "horizon
of survival" `p_{k+1}^2` (arXiv:2603.25915). That is the squaring geometry, used
as a *coordinate system* and a *density statement*, and Holt's Theorem 3.3 rests
on his unproved Conjecture 2.1. It is not used as an induction that transports a
gap bound from level `v` to level `v^2`.

Honest reading of the absence: this is the sort of idea that is absent because the
step does not close, not because nobody thought of it. Erdos #688's parameter
`eps_n` is precisely "how far down can the band go", and Erdos's own answer
(`eps_n >> lnlnln n / lnln n`, tending to 0) is the statement that a band of fixed
logarithmic width is too thin to do the job. A ladder of fixed-width bands is
therefore a ladder of rungs each of which is known to be weak, and the literature
knows this at dimension 1. **I would flag Q4's absence as informative rather than
as an opportunity.**

---

## Q5. Maximal gap between twin CANDIDATES mod a primorial; the OEIS check

### VERDICT: **ABSENT** for the sequence, **ABSENT** for the object, both calibrated.

OEIS, via `curl "https://oeis.org/search?q=<terms>&fmt=json"` (WebFetch gets 403
from OEIS; curl works). Every query below returned literal `null`, which is
OEIS's zero-results response:

| query | result |
|---|---|
| `12,30,42,66,108,150,204,258,348,528` | **NO RESULTS** |
| `12,30,42,66,108,150,204,258` | **NO RESULTS** |
| `12,30,42,66,108,150` | **NO RESULTS** |
| `2,6,12,30,42,66,108,150,204,258,348,528` | **NO RESULTS** |
| `6,15,21,33,54,75,102,129,174,264` (G2/2) | **NO RESULTS** |
| `2,5,7,11,18,25,34,43,58,88` (G2/6) | **NO RESULTS** |
| name search `maximal gap twin primorial` | **NO RESULTS** |

Calibration on the same channel in the same session: `6,10,14,22,26,34,40,46,58,66`
returns **A048670** with its full comment block, and `A288815` returns the paired
Jacobsthal with 21 terms and A072753 alongside. **The method finds what exists.**

Cross-check while there, since the corpus asserts `G2 <= h_2` termwise:
A288815 `= 2,6,18,30,66,150,192,258,366,450,570,708,...` against our
`G2 = 2,6,12,30,42,66,108,150,204,258,348,528`. Holds at all twelve shared
terms. Consistent with `research/PRIOR-ART.md` and `research/U-FRAME.md` §6a.

**On the object rather than the sequence.** The published "maximal gap between
twin primes" literature is about actual twin primes, empirically: Kourbatov and
Wolf, *Predicting maximal gaps in sets of primes*,
[arXiv:1901.03785v4](https://arxiv.org/abs/1901.03785) (v1 12 Jan 2019, v4 23 Nov
2020; **published: Mathematics (MDPI) 7(5), 400, 2019**), plus OEIS A113274
(maximal gaps between twin primes) and A002386/A000101 for primes. These use
Hardy-Littlewood plus extreme-value statistics on the primes themselves and never
touch the residue-class object mod a primorial. Grob and Schmitt's
"potential twin primes" (arXiv:1905.03117, 2107.06950) have the census
`prod(p-2)` and no gap. Holt's corpus has the gap `g = 2` population and never
the spacing between its occurrences -- the boundary `research/PRIOR-ART.md`
already draws, and this attack found nothing to move it.

---

## TALLY

| Q | subject | verdict |
|---|---|---|
| 1 | range-restricted variant studied? | **FOUND** -- it is the small sieve; Erdos #688 is our alphabet at dimension 1; Erdos #1200 is Trap 1 as a $100 conjecture; the density half is solved, the maximal-run half is nobody's |
| 2 | K-K follow-up and range-restrictability | **FOUND** -- journal version exists (Izv. Math. 88:2 (2024) 225-235, DOI 10.4213/im9467e), zero citations, no author follow-up on `j_f`, and the construction is NOT restrictable: its gain is `(lnln z_1 - lnln z_0)`, which for `(v, v^2]` is exactly `2 ln 2` |
| 3 | published two-class Jacobsthal upper bound | **ABSENT-AFTER-COMPETENT-SEARCH** -- and this time with the Iwaniec-1978 citation graph (83 works, OpenAlex) that wave 6 named as the decisive missing query. Confidence HIGH |
| 4 | `v -> v^2 -> v^4` squaring ladder as proof device | **ABSENT-AFTER-COMPETENT-SEARCH** -- the literature uses one-shot multi-band splits, never a ladder; Holt's interval of survival is the geometry without the induction |
| 5 | twin-slot gaps mod primorial; the G2 sequence in OEIS | **ABSENT**, calibrated against A048670 and A288815 on the identical channel |

### Corrections this attack owes the corpus

1. `research/covering-dive.md:112` -- "no journal reference as of 2026-08-18" for
   arXiv:2302.00459 is **wrong**. Izv. Math. 88:2 (2024) 225-235.
2. `research/natal-cap-10-sieve-cap.md` §5 -- FKMPT's `[7, Cor. 2.4.1]` is
   **Halberstam-Richert, Sieve Methods (1974)**, identified from Revision 2's
   bibliography. Still not read.
3. `paper/beta2-note.md` §2 -- add Blight (Rutgers 2010, `beta_2 < 4.45`) as a
   completeness citation; it does not beat DHR's 4.26645 and therefore
   strengthens the note.
4. Citation hygiene -- anyone verifying FKMPT Remark 7 must use
   `gaps_sievedsets_Revision2.pdf`, not the Dartmouth `longgaps.pdf`, where the
   same text is Remark 4.

---

## COVERAGE: what I did not reach, what I suspect, where I am wrong

**Did not reach.**
- **Books, again.** Diamond-Halberstam-Galway Ch. 10, Greaves, Halberstam-Richert
  Cor. 2.4.1, Holt's 2022 *Patterns among the Primes*. Four items, all named as
  blind spots in earlier audits, all still blind. No web method reaches them. If
  the Q3 absence claim is false, it is false inside one of these four.
- **The Erdos-Ruzsa 1980 paper itself.** I have the URL
  (<https://static.renyi.hu/~p_erdos/1980-29.pdf>) and the theorem statement from
  three secondary sources, but I did not read the paper. In particular I did not
  check whether Erdos and Ruzsa ask a maximal-run question anywhere in it. **That
  is the single highest-value unread document this attack surfaced**, and it is
  free -- ten pages, open PDF at Renyi.
- **Hildebrand's "Extremal problems in sieve theory" survey (Kokyuroku 958,
  1996).** Green links a tinyurl for it; I did not fetch it. This is the one
  document most likely to contain a range-restricted maximal-gap statement, since
  it is a survey specifically of extremal sieve problems.
- **Erdos [Er79d] and [Er80, p.106-110] in the original.** Everything I have on
  #688/#689/#1200 is via erdosproblems.com, which is Bloom's transcription. The
  brief's own rule about primary sources applies and I did not honour it here.
- **MathSciNet and zbMATH reviews.** zbMATH's API returns
  "contents unavailable due to conflicting licenses" for a large fraction of
  records; I read titles and authors only, never a review body.
- **Russian-language search.** Wave 6 named this its biggest blind spot on the
  Q3 absence claim. I partly closed it by going through Konyagin's own citation
  graph and mathnet.ru, which indexes Izvestiya and Mat. Zametki in both
  languages, but I ran no Russian-language query strings.

**What I suspect and cannot prove.**
- Erdos-Ruzsa 1980 §1 probably contains a remark about the longest covered
  interval, because the density theorem is proved by exhibiting long uncovered
  stretches. If so, Q1's "the maximal-run half is nobody's" weakens, and the
  small-sieve literature owns more of the block than I credited.
- The `2 ln 2` coincidence between Trap 1 and the K-K Mertens band is, I believe,
  not a coincidence but the same computation viewed from the construction and the
  capacity side. I did not prove they are the same object; I observed that the
  numbers agree and that the mechanism looks identical.
- Konyagin's 2025 `rho_*` paper is the kind of paper that gets a sequel with
  `rho^*` (the supremum, which is our quantity). If it appears, the block object
  acquires an owner. Worth a standing check.

**Where I think I am wrong.**
- **Q1's verdict may be too generous.** I have graded it FOUND on the strength of
  the *framework* having a name and a set of Erdos problems, while the *exact
  extremal quantity* is still not in print. A stricter grader would call it
  RELATED. I chose FOUND because the Erdos Trap in §Q1 is a real consequence for
  our attack plan and would be lost under a RELATED grade, but the reader should
  know the grade is a judgement call, not a finding.
- **Q4's absence is the weakest of the five.** "Squaring ladder" has no canonical
  name that I could guess, and my method for Q4 was pure keyword search with no
  calibrated positive control -- I could not construct one, because I do not know
  a paper that does use such a ladder. By the brief's own rule, **a search with no
  known positive proves nothing, and Q4 is exactly that case.** Treat the Q4
  verdict as unsupported and downgrade it if anyone finds a name for the device.
- **The Erdos Trap argument has a hole I could not close.** I argued that lower
  bound constructions for the block bear on #688. The direction we actually want
  is an upper bound on `L`, and I asserted without proof that #688 does not block
  it. The trivial capacity computation (`sum 1/p = ln 2 < 1` at dimension 1) shows
  #688 at `eps = 1/2` is negative for free at dimension 1, which is a hint that
  the upper-bound direction really is unobstructed -- but at dimension 2 the same
  sum is `2 ln 2 > 1` and that free argument evaporates. **Someone should check
  whether an upper bound on our two-class `L` would imply `eps_n < 1/2` at
  dimension 2, and whether that is known.** If it would, the Erdos Trap fires on
  the direction we care about and this attack has understated the danger.
