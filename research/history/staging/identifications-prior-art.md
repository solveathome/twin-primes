# Prior art on the three unsearched identifications

<!-- ledger
id: Q-identifications-prior-art
status: ANSWERED
todo: none
question: Who owns the three identifications that were banked without a prior-art search?
verdict: All three are OWNED in their conventions: the complementary-window duality, maxsum_m as the largest m-spacing of a scan statistic, and the alternation language as a textbook charge constraint; the exponent law H = a + b ln D and the H* Shearer-threshold ladder come back NOVEL-SO-FAR on four calibrated channels.
-->

*2026-08-19. The three top-five imports that landed the day before banked
identifications without a prior-art search, and each record flagged its own
gap: `import-scanstat.md` §6 ("No prior-art search was run"),
`import-sofic.md` §9 ("No prior-art search was run this pass"), and
`import-shearer.md` §5, whose `H*` ladder and exponent were new numbers with
no OEIS or literature check. This pass searches the owning conventions named
by [../../SEARCH-CONVENTIONS.md](../../SEARCH-CONVENTIONS.md) §1, and where
§1 has no row for the object it finds the convention first and says so.
Nothing outside this file was edited. Every proposal below is a proposal.*

**Legend.** **[READ]** the artifact was opened and the sentence quoted from it;
**[BIB]** the bibliographic record was retrieved from an index, the text was
not; **[ABSENT]** searched on a channel calibrated in this session and nothing
returned; **[NOT-REACHED]** the channel failed or was never opened.

---

## 0. Channels, and the calibration each one passed in this session

**WebSearch was unavailable for the whole pass**: the session had spent its
budget (200 of 200 calls) before the first query, so no general web channel was
used and no result below rests on one. Everything was run on the indexes
directly.

| channel | calibrated on | returned |
|---|---|---|
| OEIS sequence search | `2,6,18,30,66,150,192,258` | A288815 |
| OEIS sequence search | `2,4,6,10,14,22,26,34,40,46,58,66` | A048670 (and A395279) |
| OEIS sequence search | `2,3,5,7,10,13,19,25,35,45,59,73` | A023192 |
| OEIS full text | `keyword:nice Shearer` | 10 hits |
| Crossref `query.bibliographic` | "Maximal gaps between prime k-tuples Kourbatov" | Kourbatov at rank 1 |
| OpenAlex `search` | "Le crible a vecteurs" | *Le crible à vecteurs*, Numdam, rank 1 |
| arXiv API, `https` only | `all:"repulsive lattice gas" AND all:"Lovasz local lemma"` | Scott–Sokal, one entry |
| zbMATH `api.zbmath.org` | `au:Kalmynin & au:Konyagin` | *A polynomial analogue of Jacobsthal function* |

A zero on OEIS's JSON endpoint comes back as a bare `null` body, which is why
the three calibration rows above are printed: they separate a real zero from a
dead channel. zbMATH answers a zero-result query with a null `result` field or
an HTTP 404, per `SEARCH-CONVENTIONS.md` §5, and both were seen here.

**MathSciNet `mrlookup` was attempted and NOT REACHED.** The POST returned the
lookup form rather than a result set, so no MathSciNet negative is claimed
anywhere below. **JSTOR, Project Euclid's download endpoint, MDPI and Springer's
book landing page all refused retrieval**, which is why several sources below
are graded [BIB] rather than [READ].

---

## 1. The complementary-window duality: OWNED

**Verdict: OWNED.** `maxsum_m + minsum_{D−m} = W` on a cyclic word of fixed
total is the complement identity of two conventions that both own it, and
neither of them is ours.

**The probability convention, which is the one that matters here.** The object
is `D` points on a circle of circumference `W`; `S_m(i)` is an **m-spacing**,
`maxsum_m` is the **largest m-spacing**, and the complement of the arc carrying
`m` consecutive spacings from `i` is the arc carrying `D − m` of them from
`i + m`. The owning convention is the **scan statistic on the circle**, and the
duality between a largest cluster and a smallest interval is the standard
device of that literature, carried in its titles:

- Cressie, *On some properties of the scan statistic on the circle and the
  line*, **J. Appl. Probab. 14 (1977) 272–283**, DOI `10.1017/s0021900200104954`
  (also `10.2307/3212998`), Zbl 0364.60073. **[BIB]**, with the publisher's
  abstract retrieved through Crossref: *"An interesting link is forged between
  the circular scan statistic and Kuiper's statistic, which rids us of the
  trouble of estimating a nuisance parameter."* Kuiper's statistic is
  `D⁺ + D⁻`, the sum of a supremum and a negated infimum, and it exists because
  the circle forces exactly the max-plus-min pairing the duality states. This is
  the closest published relative found, and it is close.
- Naus, *Some probabilities, expectations and variances for the size of largest
  clusters and smallest intervals*, **JASA 61 (1966) 1191–1199**,
  DOI `10.1080/01621459.1966.10482203`. **[BIB]**
- Wallenstein and Naus, *Probabilities for the size of largest clusters and
  smallest intervals*, **JASA 69 (1974) 690–697**,
  DOI `10.1080/01621459.1974.10480190`. **[BIB]**
- Glaz, Naus and Wallenstein, *Scan Statistics*, Springer Series in Statistics,
  2001, chapter 17, *Number of Clusters: Ordered Spacings*. **[BIB]**, chapter
  title retrieved by Crossref DOI, §2 below.

**The algorithmic convention, where it is folklore rather than a theorem.**
The same identity is the standard trick for the circular maximum subarray:
the best wrapping window is the total minus the best non-wrapping window of the
complement. Searched in that convention and nothing owns it as a result:
zbMATH on `circular maximum subarray` returns one item, a proceedings volume,
and on `maximum subarray` returns six records, none of them circular; Crossref
title search on `circular maximum subarray` and `maximum sum subarray circular`
returns parallel-algorithm and k-maximum-sum papers only. **[ABSENT]** in the
circular-maximum-subarray convention: there is no research paper to cite, which
is what "folklore" means, and Kadane's own 2023 retrospective (*Algorithms* 16,
art. 519) could not be opened (MDPI returned HTTP 403). **[NOT-REACHED]**

**What this changes.** The identity is not new mathematics and should not be
carried as though it were. It is still a statement this corpus did not have,
which is what IMPORT-MAP's **THEOREM** grade actually means, so the grade can
stand with a prior-art tag attached. What must go is any sentence implying the
duality itself is a discovery.

**Not reached, and it is a real residual.** No printed sentence of the exact
form `max m-spacing + min (D−m)-spacing = circumference` was retrieved, because
every candidate carrier (JSTOR for Naus 1966 and Wallenstein–Naus 1974, Project
Euclid for the 1973 companion, Springer for the 2001 book) refused. The verdict
above rests on the convention being identified and on Cressie's abstract, not on
a verbatim match. **[NOT-REACHED]**

---

## 2. `maxsum_m` as a scan statistic, and the exponent law

### 2a. The identification: OWNED, and now actually sourced

**Verdict: OWNED.** `maxsum_m(T_x)` is the largest m-spacing of a point set on
a circle, which is the scan statistic's dual object under the standard relation
between "how many points fall in a window of length `w`" and "how short a window
holds `m` points". The scan-statistics literature was named as the owning
convention during map construction and never opened; it is opened here.

**Glaz, Naus and Wallenstein, *Scan Statistics*, Springer Series in Statistics,
2001, DOI `10.1007/978-1-4757-3460-7`.** Chapter structure, retrieved chapter by
chapter through Crossref at `10.1007/978-1-4757-3460-7_N` **[BIB]**:

| ch | title | ch | title |
|---|---|---|---|
| 1 | Introduction | 10 | Approximations for the Conditional Case |
| 2 | Retrospective Scanning of Events Over Time | 11 | Scanning Points in a Poisson Process |
| 3 | Prospective Scanning of Events Over Time | 12 | The Generalized Birthday Problem |
| 4 | Success Scans in a Sequence of Trials | 13 | Scan Statistics for a Sequence of Discrete I.I.D. Variates |
| 5 | Higher-Dimensional Scans | 14 | Power |
| 6 | Scan Statistics in DNA and Protein Sequence Analysis | 15 | Testing for Clustering Superimposed on a Nonuniform Density |
| 7 | Approaches Used for Derivations and Approximations | 16 | Two-Dimensional Scan Statistics |
| 8 | Scanning N Uniform Distributed Points: Exact Results | 17 | Number of Clusters: Ordered Spacings |
| 9 | Scanning N Uniform Distributed Points: Bounds | 18 | Extensions of the Scan Statistic |

**Chapters 8, 9 and 10 are the fixed-total case**, and the literature's name for
it is the **conditional scan statistic**, not "finite population". That naming
matters, because it is the difference between a calibrated negative and a
worthless one:

- zbMATH `ti: scan statistic & finite population` returns **zero**. **[ABSENT]**
- zbMATH `hypergeometric scan statistic` returns **zero**. **[ABSENT]**
- zbMATH `conditional scan statistic` returns six, headed by Fu and Wu,
  *Continuous, discrete, and conditional scan statistics* (2012), Loader (1991),
  Chen and Glaz (1999, 2002), Wu and Glaz (2013). **[BIB]**

So the fixed-sum population version of the scan statistic **is** in print, and
its name is the conditional scan statistic. The two search terms the assignment
proposed are both dead in the owning convention, which is exactly the failure
mode `SEARCH-CONVENTIONS.md` was written for.

Primary anchors, both confirmed bibliographically: Naus, *The distribution of
the size of the maximum cluster of points on a line*, **JASA 60 (1965) 532–538**,
and Naus, *Approximations for distributions of scan statistics*, **JASA 77 (1982)
177–183**.
**[BIB]** The MOSUM branch is alive and separate: the arXiv API returns a
current moving-sum change-point literature (multiscale bandwidth adjustment,
factor models, bootstrap intervals for moving-sum procedures). **[BIB]**

### 2b. The exponent law `H = a + b·ln D`: NOVEL-SO-FAR, with an adjacent owner elsewhere

**Verdict: NOVEL-SO-FAR in the scan convention, ADJACENT to hyperuniformity.**

**Why the conditional-scan literature cannot own it, as arithmetic rather than
as a search result.** A fixed total on its own does not produce a sub-`√m`
standard deviation. For an exchangeable word of `D` gaps summing to `W`, the
exact variance of a moving sum is `Var(S_m) = m σ² (D−m)/(D−1)`, which is
`σ√m` up to a factor that is `1 + O(m/D)`. `import-scanstat.md` §1(b) measures
that this correction is 20x to 4735x too small to explain the deficit, and the
ratio grows an order of magnitude per level. A finite population is therefore
the wrong owner by construction, and no amount of searching the conditional
scan statistic would have found the exponent, because the exponent is not a
consequence of the constraint that literature studies.

**The convention that does own sub-`√m` fluctuation is hyperuniformity, and it
has a published prime instance.** A point set whose window-count variance grows
more slowly than the window is called hyperuniform, and its statistic is the
**local number variance**. Torquato, Zhang and De Courcy-Ireland, *Hidden
Multiscale Order in the Primes*, **arXiv:1804.06279**, abstract retrieved from
the arXiv API, verbatim: *"Primes in dyadic intervals are the first examples of
what we call effectively limit-periodic point configurations. This behavior
implies anomalously suppressed density fluctuations compared to uncorrelated
(Poisson) systems at large length scales, which is now known as
hyperuniformity."* **[BIB, abstract from the arXiv API]** The companion is
*Uncovering Multiscale Order in the Prime Numbers via Scattering*.

**And the specific object is still unclaimed.** The arXiv query
`abs:hyperuniform AND (abs:squarefree OR abs:"B-free" OR abs:sieve)` returns
**zero entries**, and `abs:hyperuniform AND (abs:Eratosthenes OR abs:"residue
classes" OR abs:"arithmetic progression")` returns **zero entries**, both on the
channel calibrated above (`abs:hyperuniform` alone returns a full page).
**[ABSENT]** in the hyperuniformity convention: nobody has measured a number
variance for a primorial-sieved residue set, twin-admissible or otherwise. The
`H` law and its `ln D` drift survive as ours, and they now have a convention to
be stated in.

---

## 3. The alternation language as a charge constraint: OWNED, in a textbook

**Verdict: OWNED, and more completely than `import-sofic.md` §1 supposed.** The
record proposed the bounded running digital sum as the right sub-family and
proposed removing `(d,k)`-RLL. Both are confirmed, and all three of the
record's structural claims turn out to be printed results about exactly this
constraint.

**Source, read at page level.** Marcus, Roth and Siegel, *Introduction to Coding
for Constrained Systems*, the authors' freely posted book, chapters downloaded
as PDFs from `personal.math.ubc.ca/~marcus/Handbook/` and read as rendered
pages. sha256 prefixes of the retrieved PDFs: chapter 1 `41d1333afc3ea4ff`,
chapter 2 `930456b4d61463c3`, chapter 3 `6792481c470ddcdc`. The text layer of
these PDFs is font-scrambled and unreadable by extraction, which is why the
pages were read rather than grepped, and it is why the "Lind–Marcus theorem
number still unverified" note in `import-map-construction.md` §3 stayed open so
long. **[READ]**

**(a) The family.** §1.5.4 *Spectral-null constraints*, p. 15, read from the
publisher-equivalent PDF named above: *"Sequences with a spectral null at
f = 0, often called dc-free or charge-constrained sequences"*. p. 16 defines
the **digital sum variation (DSV)** as the largest difference between two prefix
sums and states: *"The set of all sequences with DSV at most B is a constrained
system called the B-charge constraint; it is presented by the labeled graph of
Figure 1.14."* Figure 1.14 is the path graph on states `0..B` with `+` and `−`
edges. **[READ]**

Our graph is that constraint at `B = 1`, over the ternary alphabet `{+, 0, −}`
rather than the bipolar one, the `0` letter appearing as a self-loop at each
state. Under the letters this corpus uses that is `0` and `∓2`, and the
resulting language, nonzero letters alternating in sign with runs of zeros
between them, is the **alternate mark inversion** constraint of line coding.

**(b) Strictly sofic is a printed example, not a derivation.** §2.3, p. 47,
read from the same PDF, verbatim: *"Not every constrained system of interest is
finite-type. For example, the 2-charge constrained system described by Figure
2.6 is not. This can be seen easily by considering the condition above: the
symbol '+' can be appended to the word − + − + − + · · · − + but not to the word
+ + − + − + − + · · · − + ."* The same page continues: *"both the charge
constraint and the even constraint fall into a natural broader class of
constrained systems, called almost-finite-type systems"*. **[READ]** That is
`import-sofic.md` §1's one-line argument, for the same family, in print, with
the even shift beside it. The record's `(−2) 0^k (−2)` witness is the ternary
form of the book's `+ +` witness.

**(c) The capacity is a printed formula and `ln 2` is one of its entries.**
§3.2, p. 75, read from the same PDF: Figure 3.2 is the Shannon cover of the
2-charge constrained system, *"with eigenvalues ±√2 and 0. Hence, the capacity
of the 2-charge constrained system is log √2 = 1/2."* And, verbatim: *"More
generally, if G_B is the Shannon cover in Figure 1.14 of the B-charge
constrained system, then λ(A_{G_B}) = 2 cos(π/(B+2))"*, with Table 3.2 printing
`log λ` for `B = 1..12` as `.0000, .5000, .6942, .7925, .8495, .8858, .9103,
.9276, .9403, .9500, .9575, .9634`. **[READ]** Adding the `0` self-loop that
makes the alphabet ternary adds `1` to every eigenvalue, so the ternary
`B`-charge Perron root is `1 + 2cos(π/(B+2))`, and at `B = 1` that is
`1 + 2cos(π/3) = 2`, capacity `ln 2`, one bit per symbol. The bipolar entry at
`B = 1` is `.0000`, which is the printed statement of why the `0` letter is
doing all the work. So `import-sofic.md`'s capacity result is a one-line
instance of a tabulated formula, not a derived constant.

**(d) The record's proposed removal of `(d,k)`-RLL is right, and the literature
has the hybrid anyway.** §1.5.5 *Combined charge–runlength constraints*, p. 17:
*"The B–(d,k)-charge–RLL (CRLL) constraint is the set of binary sequences z
that satisfy the (d,k)-RLL constraint with the additional restriction that the
corresponding precoded bipolar sequence w has DSV no larger than B."* **[READ]**
So charge and run-length are separate axes with a named product, and the
alternation language sits purely on the charge axis. Primary sources for the
capacity of the family, bibliographically confirmed: Chien, *Upper Bound on the
Efficiency of dc-Constrained Codes*, **Bell System Technical Journal 49
(1970)**, and Norris and Bloomberg, *Channel capacity of charge-constrained
run-length limited codes*, **IEEE Trans. Magnetics 17 (1981)**. **[BIB]**

**(e) The longest-run law: the machinery is owned, the object is not.** Crossref
returns a settled first-moment and distributional literature for the longest run
in a Markov-dependent word: Vaggelatou, *On the length of the longest run in a
multi-state Markov chain*, **Statist. Probab. Lett. (2003)**; Fu, Wang and Lou,
*On exact and large deviation approximation for the distribution of the longest
run in a sequence of two-state Markov dependent trials*, **J. Appl. Probab.
(2003)**; Eryilmaz, **Appl. Math. Comput. (2006)**. **[BIB]** Two-state is our
graph exactly. What none of them is about, and what zbMATH `ti: charge
constrained & sequences` returns nothing for, is the longest legal factor of one
given deterministic periodic word. **[ABSENT]** in the charge-constrained-code
convention and in the longest-run-in-a-Markov-chain convention: the deterministic
question is not posed there, which is `import-sofic.md` §7's WALL-ADDRESS
arriving from the literature side rather than from ours.

---

## 4. The `H*` Shearer-threshold ladder: NOVEL-SO-FAR

**Verdict: NOVEL-SO-FAR.** Nothing found, on four channels, each calibrated in
this session.

**OEIS, six indexings, on the channel calibrated by A288815, A048670 and
A023192 in the same minutes.** All six return the empty body:

| query | result |
|---|---|
| `35,55,65,91,115,209,319,481` | none |
| `35,55,65,91,115` (five-term prefix) | none |
| `34,54,64,90,114,208,318,480` (offset −1) | none |
| `36,56,66,92,116,210,320,482` (offset +1) | none |
| `0,0,0,0,35,55,65,91,115,209,319,481` (padded for `x ≤ 11`) | none |
| `5,7,11,13,23,19,29,37` (the cofactor `H*/p_min`) | none |

**[ABSENT]** in the OEIS prime-pattern owning convention (`SEARCH-CONVENTIONS.md`
§1, the A023189–A023192, A035326 family). The `SEARCH-CONVENTIONS.md` §2
convention-flip rule was applied: every `H*(x)` is a semiprime,
`35 = 5·7, 55 = 5·11, 65 = 5·13, 91 = 7·13, 115 = 5·23, 209 = 11·19,
319 = 11·29, 481 = 13·37`, so the cofactor indexing was searched as well and is
also empty.

**Literature, in the owning convention `SEARCH-CONVENTIONS.md` §1 already
carries for this object, which is "Shearer's region" and the independent-set
polynomial.**

- zbMATH `Shearer & sieve`: **zero**. **[ABSENT]**
- zbMATH `"Shearer's bound"`: five, all graph-theoretic and algorithmic
  (Moser–Tardos beyond Shearer's bound; quantum Lovász local lemma;
  variable-version LLL; Moser and Tardos meet Lovász; an independence survey).
  Nothing arithmetic. **[ABSENT]**
- zbMATH `Shearer & primes`: one, *Lower bounds for small diagonal Ramsey
  numbers* (1986), a different Shearer result. **[ABSENT]**
- arXiv `abs:"Shearer" AND (abs:primes OR abs:sieve OR abs:"twin prime")`: one
  entry, a binary constant-weight code paper. **[ABSENT]**
- OEIS full text `Shearer local lemma prime`: **zero**, against a text channel
  that returns ten for `keyword:nice Shearer`. **[ABSENT]**

So no published instance of an exactly computed Shearer region on an arithmetic
event family was found, and `θ ≈ 1.41` has no owner. The proven floor `2/√e`
is a Mertens consequence and is ours to state; nothing in print collides with
it. The one caveat worth keeping is that MathSciNet was not reached, so the
negative rests on zbMATH, arXiv and OEIS rather than on all three indexes.

---

## 5. Proposed rows for `SEARCH-CONVENTIONS.md`

Proposals. No edit was made to that file.

### 5a. New §1 rows

| object | our name | canonical | **OWNING convention — search THIS** | where it lives |
|---|---|---|---|---|
| max of a moving sum over the cyclic gap word | `maxsum_m(T_x)` as a fluctuation object (distinct from the §1 `π_min(m,k)` row, which owns it as a counting function) | largest m-spacing | **"the scan statistic on the circle"**; the fixed-total case is the **"conditional scan statistic"**, never "finite population" or "hypergeometric scan", both of which return zero; the max/min pairing is **"largest clusters and smallest intervals"** | Cressie, *J. Appl. Probab.* **14 (1977) 272–283**; Naus, *JASA* **60 (1965) 532–538** and **61 (1966) 1191–1199**; Wallenstein–Naus, *JASA* **69 (1974) 690–697**; Glaz–Naus–Wallenstein, *Scan Statistics*, Springer 2001, chs. 8–10 and 17; Fu–Wu 2012 |
| sub-`√m` growth of the moving-sum standard deviation | the exponent `H` | anomalously suppressed density fluctuations | **"hyperuniformity"** and **"local number variance"**. NOT the scan literature, whose fixed-total correction is `(D−m)/(D−1)` and cannot produce `H < 1/2` | Torquato–Zhang–De Courcy-Ireland, arXiv:**1804.06279**, and *Uncovering Multiscale Order in the Prime Numbers via Scattering*; no sieved-set instance exists, searched |
| the alternation-legal language of the old gap word | the `L` language, "the two-state walk" | sofic shift | **"charge-constrained"**, **"dc-free"**, **"spectral-null at f = 0"**, **"running digital sum"**, **"digital sum variation (DSV)"**, **"the B-charge constraint"**; the ternary instance is **"alternate mark inversion"**. `(d,k)`-RLL is a DIFFERENT AXIS, and its product with this one is named **"B–(d,k)-charge–RLL"** | Marcus–Roth–Siegel, *Introduction to Coding for Constrained Systems*, §1.5.4 p. 15–16, §1.5.5 p. 17, §2.3 p. 47, §3.2 p. 75; Chien, *BSTJ* **49 (1970)**; Norris–Bloomberg, *IEEE Trans. Magn.* **17 (1981)**; Lind–Marcus, CUP 1995 |
| longest legal run over that graph | `L`, first-moment estimate | longest run | **"the longest run in a multi-state Markov chain"**, **"longest run in two-state Markov dependent trials"**. Owns the RANDOM-word law only; the longest legal factor of ONE given periodic word is posed nowhere | Vaggelatou, *Statist. Probab. Lett.* (2003); Fu–Wang–Lou, *J. Appl. Probab.* (2003); Eryilmaz, *Appl. Math. Comput.* (2006) |

The existing §1 row for Shearer's region needs no change; it is the right
convention and it was searched in.

### 5b. New §3 rows, "searches already run"

| question | answer | do not redo |
|---|---|---|
| Is the complementary-window duality in print? | **Yes in convention, no verbatim.** It is the complement identity of the circular scan statistic and of the circular maximum subarray; Cressie 1977's link to Kuiper's statistic is the closest retrieved statement. No paywalled carrier (JSTOR, Project Euclid, Springer) could be opened | redo only if a text copy of Naus 1966 or Wallenstein–Naus 1974 becomes reachable |
| Is `maxsum_m` a scan statistic in print? | **Yes.** Largest m-spacing, dual to the scan statistic; fixed-total case is Glaz–Naus–Wallenstein chs. 8–10 | settled |
| Is the fixed-sum scan called "finite population" or "hypergeometric"? | **No.** Both return zero on zbMATH. The term is **conditional scan statistic** | settled; never search the other two again |
| Does the conditional-scan literature carry a sub-`√m` law? | **No, and it cannot**: exchangeability forces `Var(S_m) = mσ²(D−m)/(D−1)` | settled by arithmetic, not by search |
| Is the alternation language's constraint family in print? | **Yes, in a textbook.** Charge-constrained / dc-free, the `B`-charge constraint, Marcus–Roth–Siegel §1.5.4 | settled |
| Is "charge constraints are strictly sofic" in print? | **Yes**, Marcus–Roth–Siegel §2.3 p. 47, with the same appendability argument | settled; stop deriving it |
| Is the capacity in print? | **Yes**, `λ = 2cos(π/(B+2))` with Table 3.2, Marcus–Roth–Siegel §3.2 p. 75; the ternary variant adds 1 to the root, giving `ln 2` at `B = 1` | settled |
| Is the `H*` ladder in OEIS? | **No**, six indexings including the semiprime-cofactor flip, calibrated same session | the negative carries weight |
| Any published exactly-computed Shearer region on an arithmetic family? | **None found** on zbMATH, arXiv and OEIS full text, searched as "Shearer's region" | MathSciNet still unreached |

---

## 6. IMPORT-MAP lines whose novelty wording needs changing

Report only. [../../IMPORT-MAP.md](../../IMPORT-MAP.md) was not edited, and
neither were the three staging records.

**Row 1, the THEOREM.** The banked payoff reads **THEOREM (the
complementary-window duality)**. The grade itself is defined in
`IMPORT-MAP.md` as "a proved statement the corpus did not have", which is a
corpus-internal claim and survives. What must change is the surrounding
language: `import-scanstat.md` §0 calls the duality *"not previously written in
this corpus"*, which is accurate, but §4.3's proposal to move it into the live
layer would carry it upward without the tag. **Proposed: keep THEOREM, append
"standard complement identity, owned by the circular scan statistic and by the
circular maximum subarray; see `identifications-prior-art.md` §1", and forbid
any live-layer sentence presenting it as new.**

**Row 1, the PUBLISHED-ANCHOR.** It currently names Leadbetter and Berman, which
are the extreme-value half. **Proposed: add Glaz–Naus–Wallenstein 2001 chs. 8–10
and 17, Naus 1965 and 1982, and Cressie 1977 as the scan-statistic anchor, and
change `[SOURCED-BIB]` for the book to name the chapters actually retrieved.**

**Row 1, the DERIVED-CONSTANT.** `H = 0.2205 + 0.0061 ln D` is unclaimed and can
now say so. **Proposed wording: searched in the conditional-scan convention and
absent there, and absent by arithmetic rather than by luck, since a fixed total
alone gives `√m`; the adjacent convention is hyperuniformity, where no
sieved-set number variance exists.** That sentence clears the
`search-convention` gate on its own terms.

**Row 2, the DERIVED-CONSTANT.** The banked list is *"the graph's per-step rate
is `2/p` ... capacity is `ln 2` and `p`-free; the legal-word count is
`2^{n+1} − 1`"*, and `import-sofic.md` §0 leads with **"the shift is STRICTLY
SOFIC [VERIFIED]"** as a strengthening of the map. **Proposed: strictly sofic
and capacity `ln 2` are both REPRODUCTIONS of printed results about the
`B`-charge constraint (Marcus–Roth–Siegel §2.3 p. 47 and §3.2 p. 75), not
derived constants.** What stays genuinely banked in row 2 is the rate
correction from `3/p` to `2/p`, the identification of `acceptCount` with the
weight-`(1,1,2)` multiplicity, the seven-fold `PAIRS` reproduction, and the
WALL-ADDRESS, which the longest-run literature independently confirms by not
posing the deterministic question.

**Row 2's proposed `SEARCH-CONVENTIONS.md` edit, in `import-sofic.md` §8.1.**
Confirmed and sharpened: the constraint is a charge constraint, `(d,k)`-RLL is
the wrong sub-family, and the reason is that the two are orthogonal axes whose
product the literature names `B–(d,k)-charge–RLL`. The row wording is in §5a
above.

**Row 3.** `θ ≈ 1.41` and the `H*` ladder 35..481 come back clean and may now
carry an absence sentence, provided it names the convention on its own line.
**Proposed wording: "no published exactly-computed Shearer region on an
arithmetic event family was found, searched as Shearer's region and the
independent-set polynomial on zbMATH, arXiv and OEIS full text, each calibrated
in session; MathSciNet not reached."** The `2/√e` floor needs no tag.

**One thing that does not need changing.** `import-shearer.md` §9's [ABSENT]
block about Shearer's own *Combinatorica* text is unaffected: that is an
availability statement about one article, not a novelty claim, and it stands.

---

## 7. Not reached

- **WebSearch, for the whole session.** The budget was spent before this pass
  began, so no general web channel was consulted and the algorithmic-folklore
  verdict in §1 rests on index searches only.
- **MathSciNet.** `mrlookup` returned its form rather than results. Every
  negative above is a zbMATH, arXiv or OEIS negative, and §4's verdict would be
  stronger with a third index behind it.
- **Naus 1966, Wallenstein–Naus 1974, Wallenstein–Naus 1973, Cressie 1977.**
  Bibliographic records only. JSTOR, Project Euclid's download endpoint and
  Cambridge were all refused, so no verbatim statement of the max-cluster and
  min-interval duality was obtained.
- **Kadane, *Two Kadane Algorithms for the Maximum Sum Subarray Problem*,
  Algorithms 16 (2023) art. 519.** MDPI returned HTTP 403 twice. It is the one
  recent retrospective that might state the circular complement trick in a
  refereed venue.
- **Chien 1970 and Norris–Bloomberg 1981.** Bibliographic only. The capacity
  formula was read instead from Marcus–Roth–Siegel, which is a textbook
  restatement rather than the primary source.
- **Marcus–Roth–Siegel Figure 2.6 and Figure 1.14 themselves** were named on
  pages that were read but were not separately inspected, and Problem 3.20, the
  exercise the `2cos(π/(B+2))` formula is deferred to, was not opened.
- **The ternary `1 + 2cos(π/(B+2))` root** is a one-line consequence of the
  printed bipolar formula and was not found stated anywhere in print. Searching
  for it in the alternate-mark-inversion convention was not done.
- **Lind–Marcus, CUP 1995.** Still unread. Marcus–Roth–Siegel covers the same
  ground and was read instead, so `import-map-construction.md` §3's open note
  about an unverified Lind–Marcus theorem number is now answerable from a
  different book, but not from that one.
