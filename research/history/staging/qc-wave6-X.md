# QC wave 6, partition X — literature adjudication of the `[ABSENT]` / `[INFERRED]` / `[UNVERIFIED]` markers

<!-- ledger
id: Q-qc-wave6-absence
status: ANSWERED
todo: none
question: Do the corpus's [ABSENT], [INFERRED] and [UNVERIFIED] markers survive a check against fetched primary sources?
verdict: First web-enabled pass, no repository file edited: the exact-terms OEIS absence for the seam count sequence survives on both range conventions but a concept neighbour, A367739, goes unmentioned in the draft's crossrefs, and the note closes with an explicit list of what it could not reach, led by the MathSciNet citation graph of Iwaniec 1978.
-->

**Date:** 2026-08-18. **Scope as briefed:** every `[ABSENT]` marker in `research/covering-dive.md`;
`research/natal-cap-10-sieve-cap.md` §5; `[INFERRED]` markers and novelty claims in those two files;
remaining corpus `[ABSENT]` markers as stretch. **Plus a live cross-partition handoff** (two OEIS
absence claims from `research/ATTACKS2.md` row 10 / campaign verdict and `research/oeis-seam-submission.md`).

**I am the first agent in this campaign with web access.** Nothing below is an internal consistency
check; every verdict rests on a fetched primary or near-primary source.

**No file in the repository was edited. This report is the only file I created.**

---

## 0. Method and calibration

**Vocabulary translation done first.** The corpus's object is
`G₂(n) = max gap between consecutive r mod Pₙ# with gcd(r,Pₙ#) = gcd(r+2,Pₙ#) = 1`.
Canonical translations searched: *Jacobsthal function*, *paired / generalised Jacobsthal function*,
*polynomial analogue of Jacobsthal's function*, *maximal gap in a sifted set of dimension κ*,
*largest gap between admissible positions of a prime k-tuple mod a primorial*, *covering a finite
interval with two residue classes per prime*, *maximal run of consecutive n with n(n+2) not coprime
to P(z)*, *Erdős–Rankin construction for a two-dimensional sieving system*, *multiplicity-2 covering
system with prime moduli*.

**Calibration runs (query shape verified against known positives before trusting any null):**

| calibration target | query | result |
|---|---|---|
| Klein–Koukoulopoulos–Lemieux (corpus cites correctly) | `Klein Koukoulopoulos Lemieux "j-th smallest modulus" covering system` | HIT, first result, full text obtained; authors and IJNT 20 (2024) no. 2, 471–479 confirmed |
| Ziller–Morack paired Jacobsthal | `"paired Jacobsthal" ... Ziller Morack upper bound proof` | HIT, both arXiv items |
| arXiv API shape | `all:"Jacobsthal function"` sorted by date, 100 results | HIT, 17 entries returned, including items the corpus cites |
| **OEIS term-search shape** | OEIS search on A060256's own terms `2,1,1,2,1,6,8,11,4,16,22,4,74` | HIT, returned A060256 **and** A384545 — so a null from this endpoint is meaningful |

So: my null results are null results, not tooling failures.

**Access failures worth stating up front.** `oeis.org`, `erdosproblems.com` and
`api.semanticscholar.org` all refuse WebFetch directly (403 / 403 / 429). I recovered OEIS
through the `r.jina.ai` text proxy (`https://r.jina.ai/https://oeis.org/Axxxxxx/internal`), which
returns the **raw internal-format record** and is the right instrument for this job. The same proxy
reaches erdosproblems.com problem pages but **not** its comment threads or its search endpoint.
Semantic Scholar stayed unreachable.

**Tally: REFUTED 4 · WEAKENED 3 · SURVIVES 8 · UNRESOLVED 3.**

---

# A. REFUTED

## A1. `research/covering-dive.md:112` — "No Erdős–Rankin-type two-class paper exists"

**Claim text, verbatim:**
> "**Published asymptotic constructions: none.** The FKMPT machinery is expressly one-dimensional
> (Remark 7, quoted in Q2.3); its authors state the two-dimensional variant of their method would at
> best gain "a small power of log log" over trivial, and note the pigeonhole/Brun bound ≫ log²X for
> gaps between twin primes as the current best. **No Erdős–Rankin-type two-class paper exists.**
> **[ABSENT]**"

Echoed at `covering-dive.md:142` ("The Erdős–Rankin smooth-number seeding has no two-class analog in
print") and load-bearing for Realistic Target 4 at `covering-dive.md:150`.

**Canonical translation.** *No published Erdős–Rankin / Westzynthius–Rankin construction produces a
long gap in a sifted set where each prime removes about two residue classes.*

**Queries run.** `large gaps between twin primes Erdos-Rankin construction lower bound`;
`"Jacobsthal" function generalization prime k-tuples admissible largest gap primorial`; arXiv API
`all:"Jacobsthal function"` full listing; arXiv API `abs:"sieved sets" OR abs:"sieving system"`;
`upper bound maximal gap sifted set dimension two sieve "Jacobsthal" analogue n(n+2) coprime primorial`.

**What I found — REFUTING SOURCE.**

> Alexander Kalmynin and Sergei Konyagin, *A polynomial analogue of Jacobsthal function*,
> **arXiv:2302.00459**, v1 1 Feb 2023, **v2 3 Dec 2023** (v2 is the version I read; no journal-ref
> listed as of 2026-08-18). Affiliations printed on the paper: HSE Moscow and Steklov Mathematical
> Institute. <https://arxiv.org/abs/2302.00459>

Abstract, verbatim from the v2 PDF:

> "For a polynomial f(x) ∈ Z[x] we study an analogue of Jacobsthal function, defined by the formula
> j_f(N) = max_m {For some x ∈ N the inequality (x+f(i), N) > 1 holds for all i ≤ m}. We prove a
> lower bound
> j_f(P(y)) ≫ y(ln y)^{ℓ_f−1} ((ln ln y)²/ln ln ln y)^{h_f} ((ln y ln ln ln y)/(ln ln y)²)^{M(f)},
> where P(y) is the product of all primes p below y, ℓ_f is the number of distinct linear factors of
> f(x), h_f is the number of distinct non-linear irreducible factors and M(f) is the average size of
> the maximal preimage of a point under a map f : F_p → F_p."

The construction, verbatim from §2 of the v2 PDF:

> "To prove our main result, we are going to choose a value x such that x + f(i) is not coprime to
> P(y) for many first values of i by choosing residues x_p mod p for all p ≤ y. We will choose x_p
> mod p for primes p ≤ y so that for all i = 1, …, m there is some p ≤ y for which f(i) + x_p ≡ 0
> (mod p)."

**Why this refutes the sentence as written.** For each prime p the choice of x_p removes the set
`{i : f(i) ≡ −x_p (mod p)}` — a **union of up to deg f residue classes in i-space**. The paper's own
parameter M(f) is defined as exactly the average number of classes removed per prime
(`Σ_{p≤X} M_p(f)/p = M(f)·ln ln X + O(1)`), and they record `M(f₂) = M(f₃) = 2` for `f_d(x) = x^d`.
So for a quadratic f this **is** an Erdős–Rankin construction in a two-classes-per-prime sieving
system, and the gain over Rankin is precisely the Rankin factor raised to the M(f)-th power — for
M = 2, the square. Their Remark 1 makes the two-class gain explicit:
`j_f(P(y)) ≫ y ln y` for every f of degree ≥ 2, "since M(f) = M(f_d) ≥ 2".

Note the shape: for `f = x²` this reads `j_f(P(y)) ≫ y (ln y ln ln ln y / (ln ln y)²)²`, i.e.
`≍ y ln²y` up to loglog factors — the same `c·x·ln²x` shape the corpus states as its own target at
`covering-dive.md:150`.

Their proof also uses a general κ-dimensional sifted-set upper bound stated as their Corollary 1:

> "Corollary 1. Let κ, z, g(d), V(z) and X be as above. Suppose that for any p ≤ z the set Ω_p ⊂
> Z/pZ contains g(p) elements. Let S(X, Ω) be the number of n ≤ X such that n mod p ∉ Ω_p for all
> p ≤ z. Then S(X, Ω) ≪ XV(z)."

**Caveat, stated plainly so the adjudicator can weigh it.** Their two classes are the fibre
`f^{-1}(−x_p)`, whose separation varies with p and with x_p. The corpus's system `I_p = {0, −2}` is
a *fixed* pair, the same for every p, and is **not** of the form `x + f(i)`. So this is not the twin
system. The claim that dies is the blanket sentence "No Erdős–Rankin-type two-class paper exists";
what remains true is the narrower "no Erdős–Rankin construction for the fixed pair {0, −2} exists".

**Severity: HIGH.** The co-author is Sergei Konyagin — the K of FGKMT and of FKMPT. A 2023 paper by
the FKMPT author list's own member, doing multi-class Erdős–Rankin, is the single most likely thing
a referee would raise against the corpus's Realistic Target 4. It also gives the corpus a live
comparison curve for its measured `c·x·ln²x`.

**Confidence: HIGH.** Basis: full PDF text extracted and read, abstract + construction + Remark 1 +
Theorem 1 + definition of M(f) all quoted from the source; version and date confirmed from the PDF's
own left-margin stamp `arXiv:2302.00459v2 [math.NT] 3 Dec 2023`.

---

## A2. `research/natal-cap-10-sieve-cap.md:79–90` and `:207` — "no primary reference for the interval bound with the explicit constant"

**Claim text, verbatim (§1.4):**
> "**[PROVEN in ≪-form via the verified FKMPT quote; the constant-8 interval form is standard but we
> did not locate a primary statement with the explicit 8 for intervals — UNVERIFIED at that level of
> precision.]**"

and

> "**The primary paper is paywalled; we could NOT verify whether Siebert states an interval version
> π₂(x+ℓ)−π₂(x) ≤ 8·(2C₂)·ℓ/log²ℓ — [UNVERIFIED].** … we flag that we found no primary reference
> stating it with the explicit constant."

and §5 item 3, verbatim:
> "3. Riesel–Vaughan 1983 Lemma 5 explicit bound: secondary sources only."

**Canonical translation.** *No published theorem gives an explicit constant for the number of twin
primes in an interval, uniformly in the interval's position.*

**Queries run.** `Riesel Vaughan "On sums of primes" Arkiv för Matematik 1983 Lemma 5 twin prime
upper bound explicit`; `Klyve explicit bounds twin primes Brun's constant Siebert Riesel Vaughan`;
`Siebert 1976 "Montgomery's weighted sieve for dimension two" ... explicit constant`;
`"Corollary 2.4.1" Halberstam Richert ...`.

**What I found — REFUTING SOURCE, read from the primary PDF.**

> H. Riesel and R. C. Vaughan, *On sums of primes*, **Arkiv för matematik 21 (1983), 45–74**.
> Full text: <https://archive.ymsc.tsinghua.edu.cn/pacm_download/116/7384-11512_2006_Article_BF02384300.pdf>
> Page range confirmed against Vaughan's own publication list, item 49:
> "with H. Riesel, On sums of primes, Arkiv för matematik 21(1983), 45-74."
> (<https://personal.science.psu.edu/rcv4/pubswww.pdf>)

**Lemma 5** (p. 53–54 of the paper; transcribed from the scanned PDF, OCR of a 1983 typescript, so
treat glyph-level detail as approximate but the structure as certain):

> "**Lemma 5.** Let
> (3.17)  R(x, a, b) = sup Σ_{p ∈ I, ap+b prime} 1
> where the supremum is taken over **all intervals I of length x**. Suppose that L and A = A(L) are
> related by the table below. Then, whenever x ⩾ e^L and ab ≠ 0 we have
>   R(x, a, b) < ( 8Cx / ((log x)(A + log x)) + 100x^{1/2} ) · ∏_{p | ab, p>2} (p−1)/(p−2)."

with the paper's (2.3)–(2.4) fixing

> "(2.3)  C = 2 ∏_{p>2} p(p−2)/(p−1)², the twin prime constant. Then (2.4) 1.320323 < C < 1.320324."

and the (L, A) table running L = 24 (A = 0) through L = 690 (A = 8.45).

**Consequences for the corpus, three of them.**

1. **The interval-uniform constant 8 now has a primary source.** Take a = 1, b = 2: `R(x,1,2)` is
   exactly `sup_I #{p ∈ I : p+2 prime}` over intervals of length x, and `8C = 8·1.320323 = 8·Π`'s
   constant, so the bound is `π₂(x+ℓ) − π₂(x) ≤ (8 + o(1))·2C₂·ℓ/log²ℓ`, uniform in position, with
   an explicit finite-x improvement `(A + log x)` in place of `log x`. This is precisely the statement
   `natal-cap-10` §1.4 says it could not source, and it is stronger than what the corpus asked for.
   **The `[UNVERIFIED]` flag on §1.4 bullet 2 and on §5 item 3 is refuted.**
2. **The secondary quotation in §1.4 is confirmed and its range condition recovered.** The corpus's
   "secondary sources state … Riesel–Vaughan as π₂(x) < 16C₂·x/((7.5+log x)·log x)" matches
   Lemma 5 exactly (`16C₂ = 8C`), with A = 7.5, which the table pairs with **L = 36**, i.e. valid
   for `x ⩾ e³⁶`. The corpus quotes the inequality without the range condition.
3. **The venue is wrong.** `natal-cap-10-sieve-cap.md:227` prints "Riesel–Vaughan, BIT 23 (1983)
   [not accessed]". The paper is **Arkiv för matematik 21 (1983), 45–74**, per Vaughan's own
   publication list and the paper's running heads. Riesel published in *BIT* often; this paper did not.

Two further notes on the mechanism, which the corpus states slightly off. The corpus calls the
position-uniform statement "the pure Selberg/beta-sieve bound". Riesel–Vaughan's Lemma 5 is derived
from **Corollary 1 of Montgomery and Vaughan, *The large sieve*, Mathematika 20 (1973)** — the paper
says so in §3: "It is a refinement of Lemma 8 of Vaughan [7] and likewise follows from Corollary 1
of Montgomery and Vaughan [4]." Large sieve, not Λ². And the `[1,y]` form of the same constant is
**Halberstam–Richert, *Sieve Methods*, Theorem 5.3**, not Corollary 2.4.1 — quoted verbatim by
Bordignon and Lee (below) as
`π_F(y) ≤ 2^g g! ∏_p ((p−ρ_F(p))/(p−1))(1−1/p)^{1−g} · y/log^g y · (1 + O_F(log log 3y / log y))`,
whose g = 2 constant is `2²·2! = 8`.

> Matteo Bordignon and Ethan Simpson Lee, *Explicit upper bounds for the number of primes
> simultaneously representable by any set of irreducible polynomials*, **arXiv:2211.11012v1**,
> 20 Nov 2022. <https://arxiv.org/abs/2211.11012>

**Severity: MEDIUM-HIGH.** The verdict of `natal-cap-10` does not move — Regime 2 still needs 1.28
and the parity floor is still 2 — but two of the six "could not verify" items in §5 are now
verifiable, one bibliographic entry is wrong, and the corpus's account of *which* sieve delivers the
uniform 8 is misattributed.

**Confidence: HIGH** for the existence and shape of Lemma 5 and for the venue correction (two
independent sources: the paper's own running heads and Vaughan's publication list).
**MEDIUM** for glyph-exact reproduction of the `+100x^{1/2}` term — the source is an OCR'd scan.

---

## A3. `research/natal-cap-10-sieve-cap.md:208–210` — Wu 2004's twin constant was read only at second hand

**Claim text, verbatim (§5 item 4):**
> "4. Wu 2004's twin constant 3.39951: read from Lichtman's Table 1 and Wu's own historical
> narrative (Wu's PDF pp. 1–3 verified; the twin-side theorem statement sits deeper in the paper
> than the pages we read)."

and §1.2 note (i), verbatim:
> "Wu's exact published value is 3.39951 (… twin constant per Lichtman's table — Wu's own PDF states
> the Goldbach side D(N) ≤ 7.8209·Θ(N) as Theorem 1, **twin side by halving**)."

**What I found.** Full text of the paper extracted and read.

> J. Wu, *Chen's double sieve, Goldbach's conjecture and the twin prime problem*, Acta Arith. **114**
> (2004) 215–273; arXiv:0705.1652. <https://arxiv.org/pdf/0705.1652>

- p. 4, verbatim: "**Theorem 3.** For sufficiently large x, we have π₂(x) ⩽ 3.3996 Π(x)."
- §8, end of the proof of Theorem 3, verbatim:
  "π₂(x) ⩽ S(B; P(2), x^{(1/2−δ)/2.1}) ⩽ 3.5(1 − 0.0287117) Π(x) ⩽ **3.39951 Π(x)**."
- p. 3, verbatim, with `Π(x) := Cx/(log x)²` and `C := 2∏_{p>2}(1 − 1/(p−1)²)`:
  "The methods of Selberg, Pan, Bombieri & Davenport and Chen work in a similar way and give upper
  bounds of this type (1.7) π₂(x) ⩽ {a + o(1)}Π(x), where **the constant a is half of the
  corresponding constant in the Goldbach problem**."

So §5 item 4 is refuted: the value **is** in Wu's paper, twice, and I have it at the primary source.
The corpus's numbers are right.

**But the parenthetical "twin side by halving" is wrong as a derivation.** Wu's Theorem 1 is
`D(N) ⩽ 7.8209 Θ(N)` and its proof line reads `⩽ 7.82085 Θ(N)`; half of that is 3.910, not 3.3996.
Wu proves Theorem 3 separately, in his §8, with a different numerical optimisation. The "half"
sentence Wu writes is a general remark about the family of methods, not the route to his own 3.3996.

Two further corpus quotations re-verified verbatim at the primary source while I was in the file:
- §1.2 note (ii): "In 1949 Selberg [25] proved (1.2) D(N) ⩽ {16 + o(1)}Θ(N) with the help of his
  well known λ²-upper bound sieve." — **exact**.
- §1.5 (ii): "A = B_ν := {n : 1 ⩽ n ⩽ x, Ω(n) ≡ ν (mod 2)} (ν = 1, 2), the upper and lower bounds in
  (1.3) are respectively attained by ν = 1 and ν = 2 (see [14], page 239)." — **exact**, including
  Wu's own idiosyncratic "(ν = 1, 2)" under a mod-2 congruence. The corpus transcribed it faithfully;
  a reader may think it a corpus typo, and it is not. Wu's [14] is
  "H. Halberstam & H.-E. Richert, *Sieve Methods*, Academic Press, London, 1974".

**Severity: LOW-MEDIUM** (status upgrade plus one wrong derivational aside).
**Confidence: HIGH**, full text extracted.

---

## A4. `research/covering-dive.md:36` — the "DHR book" is not by Richert

**Claim text, verbatim:**
> "(table in C. S. Franze, *Sifting limits for the Λ²Λ⁻ sieve*, [arXiv:1012.3809], J. Number Theory
> 2011, Table 1; **DHR book**, *A Higher-Dimensional Sieve Method*, Ch. 17: β_κ ≲ 2.44κ)."

**What I found.**

> *A Higher-Dimensional Sieve Method: With Procedures for Computing Sieve Functions*, by
> **Harold G. Diamond, H. Halberstam, with William F. Galway**, Cambridge Tracts in Mathematics 177,
> 2008 (online 2010).
> <https://www.cambridge.org/core/books/higherdimensional-sieve-method/6B47E695EF83A7E5E10EF9C70F4AA951>

Richert is **not** an author of the book. The name "DHR sieve" for the sieve itself is legitimate
(Diamond–Halberstam–Richert), but the book is Diamond–Halberstam(–Galway), and Galway is dropped.
This is the same failure mode as "arXiv:1402.1970 is Holt AND Rudd".

Chapter 17 **is** correct: the published table of contents lists "Chapter 17: The parameters of α_κ
and β_κ".

Franze checks out as printed: **Craig S. Franze**, *Sifting limits for the Λ²Λ⁻ sieve*,
J. Number Theory **131** (2011), issue 10, 1962–1982, arXiv:1012.3809 (single version, 17 Dec 2010),
DOI 10.1016/j.jnt.2011.04.008. His abstract's own framing — "for all κ ≥ 3 the Λ²Λ⁻ sieve is
superior to competing combinatorial sieves" — is consistent with the corpus using **DHR** (4.266)
rather than Λ²Λ⁻ (4.516) at κ = 2.

**Severity: MEDIUM** (author list, the campaign's declared sore spot). **Confidence: HIGH.**

---

# B. WEAKENED

## B1. `research/covering-dive.md:51` — "Semantic Scholar lists exactly one citation … No follow-up, no refereed version"

**Claim text, verbatim:**
> "**Isolation of this literature:** Semantic Scholar lists exactly **one** citation of
> arXiv:1706.00317 — the authors' own computation note — and none for the note. No follow-up, no
> refereed version. **[ABSENT]**"

**Status of the citation count: UNRESOLVED.** `api.semanticscholar.org` returned HTTP 429 on every
attempt and the HTML paper page returned empty through WebFetch. I could not re-run the count.

**What I could establish, and it cuts both ways.**

*Supporting the claim.* Mario Ziller's own two later papers do **not** cite the paired-progressions
work:
- Mario Ziller, *New computational results on a conjecture of Jacobsthal*, arXiv:1903.11973 (2019).
- Mario Ziller, *On differences between consecutive numbers coprime to primorials*,
  **arXiv:2007.01808v1**, 3 Jul 2020 — I extracted its full reference list; it cites Costello–Watts,
  de Polignac ×2, Erdős (Math. Scand. 10, 1962), Gassko, Hagedorn, Hajdu–Saradha, Jacobsthal, Kanold,
  Ziller–Morack arXiv:1611.03310, and Ziller arXiv:1903.11973. **Neither 1706.00317 nor 1706.03668
  appears.** The author himself did not build on it.

*Weakening the claim.* The OEIS entries are alive and the family has grown:
- **A288815** (`%I #19 Apr 12 2026`) — "Paired Jacobsthal function applied to the product of the
  first n primes", `%A Mario Ziller, Jun 17 2017`, carrying both arXiv links and the conjecture as
  a comment. Terms `2,6,18,30,66,150,192,258,366,450,570,708,894,1044,1284,1422,1656,1902,2190,2460,2622`
  — 21 terms, unchanged; `%F a(n) = 6*A072753(n) + 6, for n>=3`.
- A new neighbour exists that the corpus has never seen: **A384545** (`%I #22 Apr 04 2026`),
  "Smallest prime(n)-smooth multiplier, m, such that both m*(prime(n)#)-1 and m*(prime(n)#)+1 are
  prime". This is 2025/2026-era activity in the primorial-twin family.

**Verdict: WEAKENED on "no follow-up"; UNRESOLVED on the citation count.**
**Severity: LOW.** **Confidence: HIGH** on the Ziller-2020 reference list (extracted from PDF),
**N/A** on the count.

## B2. `research/covering-dive.md:14` — "Jacobsthal's own conjecture … is open"

**Claim text, verbatim:** "Jacobsthal's own conjecture h(k) ≪ k² is open (Erdős #970, tagged 'open')."

That is correct as stated. But there is a **second, distinct** conjecture of Jacobsthal in the same
literature and it has been **disproved**, which a reader of this line will not know:

> Lajos Hajdu and N. Saradha, *Disproof of a conjecture of Jacobsthal*, **Mathematics of Computation
> 81 (2012), no. 280, 2461–2471** (recorded as reference [7] of Ziller arXiv:2007.01808).

Ziller arXiv:1903.11973's abstract, verbatim in substance: Jacobsthal's conjecture "has been
disproved by counterexample a few years ago", he "found various new counterexamples", and "the
conjecture of Jacobsthal only applies to several small k".

**Verdict: WEAKENED** — the line is true but ambiguous; "Jacobsthal's own conjecture" now names two
things in the literature, one open and one dead. **Severity: LOW.** **Confidence: HIGH.**

## B3. Handoff item 2 — `research/oeis-seam-submission.md` "the count sequence is NOT in OEIS"

**Claim text, verbatim** (`ATTACKS2.md` row 10 and campaign verdict; `oeis-seam-submission.md`):
> "min-k = A060256 (exists); the count sequence is NOT in OEIS → draft in oeis-seam-submission.md."
> "This draft covers only the count sequence, which is absent from OEIS in both range conventions
> (k <= prime(n+1) and k < prime(n+1))."

**First, I reproduced the data independently** (own Miller–Rabin, 12 fixed bases, scratchpad only,
nothing written to the repo):

- closed range `k ≤ prime(n+1)`, n = 1..20: `2, 4, 4, 3, 4, 6, 2, 1, 7, 1, 1, 2, 0, 1, 1, 1, 3, 1, 0, 4` — **exact match** to the draft's DATA.
- n = 21..30: `0, 2, 1, 1, 2, 1, 1, 1, 0, 1` — **exact match** to the draft's extension.
- n = 4 witnesses `{2, 5, 11}` — **exact match**.
- open range `k < prime(n+1)`: `1, 3, 4, 2, 4, 6, 2, 1, 7, 1, 1, 2, 0, 1, 1, 1, 3, 1, 0, 4`.
- minima per n agree with A060256 wherever a witness exists in range.

**Then I searched OEIS on both conventions** (via the calibrated proxy endpoint):
- `2,4,4,3,4,6,2,1,7,1,1,2,0,1,1,1,3,1,0,4` → "Sorry, but the terms do not match anything in the table."
- `1,3,4,2,4,6,2,1,7,1,1,2,0,1,1,1,3,1,0,4` → "Sorry, but the terms do not match anything in the table."

**So the exact-terms absence claim SURVIVES.** But a name-and-concept search turned up a prior-art
neighbour the draft's CROSSREFS does not mention:

> **A367739** (`%I #8 Nov 29 2023`, `%A Jon E. Schoenfield, Nov 28 2023`, `%K nonn,tabl`, `%O 1,3`):
> "**Table read by ascending antidiagonals: T(n,k) is the number of k-bit numbers m such that
> m*prime(n)# is the average of a twin prime pair**, where prime(n)# is the n-th primorial A002110(n)."
> `%Y Cf. A014574, A095017.`
> <https://oeis.org/A367739>

That is the same counting object — how many multipliers m of the n-th primorial land a twin pair —
binned by bit-length of m rather than by `m ≤ prime(n+1)`. It is a genuinely different sequence, so
the submission is still new; but it is the crossref an OEIS editor will ask for, and its existence
means the counting idea is not unstudied.

**Verdict: SURVIVES on the exact terms (both conventions), WEAKENED on novelty of the concept.**
**Severity: MEDIUM for the draft** (missing CROSSREF that an editor will request), **LOW for the corpus's
mathematics.** **Confidence: HIGH.**

Two further findings on the same draft, both favourable:
- **No off-by-one in the A059861 usage.** `A059861 %N a(n) = Product_{i=2..n} (prime(i) − 2)`,
  `%O 1,3`, terms `1, 1, 3, 15, 135, 1485, 22275, 378675, …`. I recomputed the twin-slot count mod
  `A002110(n)` directly: `1, 1, 3, 15, 135, 1485, 22275, 378675` for n = 1..8. The draft's
  "density A059861(n)/P with P = A002110(n)" is **index-correct**. The earlier wave's
  `A059861(n−1)` bug is not present here.
- **A060256's cited data matches**: `%S 2,1,1,2,1,6,8,11,4,16,22,4,74,…` — the draft's
  "(2, 1, 1, 2, 1, 6, 8, 11, 4, 16, 22, ...)" is right.

---

# C. SURVIVES (searched competently, claim stands)

## C1. `research/covering-dive.md:55` — no published upper bound for a two-classes-per-prime Jacobsthal function at any exponent

**Claim text, verbatim:**
> "**We found no published upper bound for a two-classes-per-prime Jacobsthal function at any
> exponent — matching the audit.** The only quantitative statements are (i) ZM's Conjecture 6 [CONJ]
> and (ii) trivialities. **[ABSENT]**"

**Vocabularies searched (six, beyond the corpus's own list):** *polynomial analogue of Jacobsthal's
function*; *maximal gap in a κ-dimensional sifted set*; *least n with n and n+2 both free of prime
factors ≤ z*; *largest gap between admissible k-tuple positions mod a primorial*; *DHR /
higher-dimensional sieve applied to Jacobsthal*; *paired Jacobsthal upper bound / h₂ proved*.
Also a full arXiv-API sweep of every paper whose abstract contains "Jacobsthal function"
(17 items, all triaged), and a full sweep of `abs:"sieved sets" OR abs:"sieving system"` (8 items).

**Result: nothing. The claim survives, and it is now positively corroborated.** The strongest single
piece of evidence is the silence of the experts: Kalmynin–Konyagin (2023), writing a paper whose
entire subject is a multi-class generalisation of the Jacobsthal function, state only the κ = 1
upper bound and attribute it to Iwaniec —

> "As for the upper bounds for j(N), H. Iwaniec showed [2] that **Theorem.** For all natural N the
> inequality j(N) ≪ ln²N holds." (their reference [2] = "H. Iwaniec, *On the problem of Jacobsthal*,
> Demonstratio Math. 11 (1978), no. 1, 225–231")

— and prove no upper bound of any kind for their own j_f. If a multi-class upper bound existed,
Konyagin would have cited it.

**Severity of the survival: this is a real and useful result**, and it is the single largest
supporting fact for the corpus's Realistic Target 1.
**Confidence: MEDIUM-HIGH.** Basis: broad multi-vocabulary search with a calibrated method, plus the
expert-silence corroboration. It is not a database-complete search — see Coverage.

## C2. `research/covering-dive.md:69` — no Jacobsthal-type upper-bound companion for general sieving systems at any dimension ≠ 1

Claim text, verbatim: "**Companion upper-bound literature for FKMPT sieved sets: none.** … the
natural upper-bound companion (a Jacobsthal-type theorem for general sieving systems) does not exist
in print for any dimension other than the classical κ = 1 Iwaniec case. **[ABSENT]**"

**SURVIVES.** The one thing I found in that direction is Kalmynin–Konyagin's Corollary 1 (quoted in
A1 above): a general "g(p) classes per prime" sifted-set **density** bound `S(X, Ω) ≪ X V(z)`,
proved from the fundamental lemma. That is a density estimate in the FL regime, not a gap bound at
the critical exponent, so it does not touch the claim; it is, however, the nearest published object
and the natural citation for the corpus's synthesis point 3.

I also confirmed the FKMPT limitation quote directly at source. Terence Tao, *Long gaps in sieved
sets*, blog post, **21 February 2018**, announcing the paper of **Kevin Ford, Sergei Konyagin, James
Maynard, Carl Pomerance and Terence Tao**, verbatim:

> "One can consider other dimensions also, but unfortunately our methods seem to give results that
> are worse than a trivial bound when the dimension is less than or greater than one."

(<https://terrytao.wordpress.com/2018/02/21/long-gaps-in-sieved-set/>) — the corpus's paraphrase at
`covering-dive.md:68`, flagged there as possibly loose, is faithful.

**Confidence: MEDIUM-HIGH.**

## C3. `research/covering-dive.md:97` — no covering-systems result at polynomial interval scale with ≤ 2 classes per prime

Claim text, verbatim: "**Answer to the targeted question: NO.** We found no covering-systems result
that bounds the length of a finite interval coverable by ≤ 2 classes per prime from a range (x, y]
at any polynomial scale. … **[ABSENT]**"

**SURVIVES.** Searched: `covering finite interval arithmetic progressions prime moduli "two residue
classes" each prime quantitative length polynomial bound sieve`; the Crittenden–Vanden Eynden
conjecture literature; the KKL / BBMST / Cummings–Filaseta–Trifonov / function-field cluster.
Everything found is either "covers ℤ" or the exponential 2ⁿ interval-to-ℤ transfer, exactly as the
corpus says.

Three corroborations and two updates while I was there:

- **KKL Theorem 3 verified verbatim** from the published PDF
  (<https://dms.umontreal.ca/~koukoulo/documents/publications/covering-systems.pdf>):
  > "**Theorem 3.** Let A be a covering system of multiplicity s. Then there exists an absolute
  > constant c > 0 such that its smallest modulus is ⩽ exp(c log²(s + 1)/ log log(s + 2))."
  and their Definition 2.2: `m(A) := max_{d∈N} #{1 ⩽ j ⩽ n : d_j = d}`. The corpus's editorial gloss
  "[each modulus appears ≤ s times]" is correct, and the `[INFERRED]` translation at
  `covering-dive.md:92` (two classes per prime = multiplicity 2, so KKL forbids covering ℤ but says
  nothing about a finite interval) is sound. Authors: **Jonah Klein, Dimitris Koukoulopoulos, Simon
  Lemieux**; **Int. J. Number Theory 20 (2024), no. 2, 471–479**; the PDF is dated June 26, 2023.
- **Crittenden–Vanden Eynden's conjecture is still open for k ≥ 3.** I looked specifically for a
  counterexample or a disproof and found none; the literature has only necessary conditions on a
  hypothetical counterexample. The corpus's §3.4 statement is current.
- **Publication update:** Cummings–Filaseta–Trifonov is no longer only a preprint. **M. Cummings,
  M. Filaseta, O. Trifonov, "An upper bound for the minimum modulus in a covering system with
  squarefree moduli", Acta Mathematica Hungarica 175 (2025), 1–25**, DOI 10.1007/s10474-024-01496-x.
  The bound **118 survived to publication** — I checked this specifically because of the FKMPT
  lesson. `covering-dive.md:82` cites only arXiv:2211.08548.
- Owens' min-modulus-42 record and Nielsen's 40 both confirmed. Hough Ann. of Math. (2) **181**
  (2015), no. 1, 361–382 and BBMST Invent. Math. **228** (2022), no. 1, 377–414 both confirmed
  against KKL's bibliography.

**Confidence: MEDIUM-HIGH.**

## C4. `research/covering-dive.md:140` — nobody has written down G₂(n) ≪ pₙ^{4.266+ε}

Claim text, verbatim: "… yields a two-class Jacobsthal bound of shape **G₂(n) ≪ pₙ^{4.266+ε}** …
**We found no paper stating this** (consistent with the audit): it appears to be folklore-available
but unwritten. **[INFERRED from PROVEN ingredients; absence sourced]**"

**SURVIVES**, on the same searches as C1/C2 and on a dedicated search of the DHR/higher-dimensional
sieve applications literature. Nothing states a κ = 2 Jacobsthal exponent.

**Confidence: MEDIUM.** This is the claim I would most like a MathSciNet reviewer to double-check —
see Coverage.

## C5. `research/covering-dive.md:114` and `:149` — G₂ has no OEIS sequence

Claim text, verbatim (Realistic Target 3): "we found no OEIS sequence for max gap between twin
candidates mod pₙ# — a candidate new sequence with clean twin-prime motivation."
Also `:114`, "**[PROVEN, trivially, and absent from the literature and from A288815/A072753]**".

**SURVIVES, and I now have the terms.** I computed G₂(Pₙ#) directly from the definition at
`covering-dive.md:4` (largest cyclic gap between r mod Pₙ# with gcd(r,Pₙ#) = gcd(r+2,Pₙ#) = 1):

| n | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| pₙ | 2 | 3 | 5 | 7 | 11 | 13 | 17 | 19 |
| slots | 1 | 1 | 3 | 15 | 135 | 1485 | 22275 | 378675 |
| **G₂** | **2** | **6** | **12** | **30** | **42** | **66** | **108** | **150** |

(The slot counts reproduce A059861 exactly, which is an independent check on my computation.)

OEIS search on `2,6,12,30,42,66,108,150` → **"No results."** The sequence is genuinely absent.

Sanity check on `covering-dive.md:48`'s `[INFERRED]` claim that G₂ ≤ h₂: against A288815's
`2,6,18,30,66,150,192,258` the inequality holds term by term, with equality at n = 1, 2, 4. The
inference is confirmed numerically.

**Confidence: HIGH** for the OEIS absence (calibrated endpoint, exact terms).

## C6. `research/covering-dive.md:50` — the A072753 / A288815 description

Not an absence claim, but in scope as a novelty-adjacent citation, and it is the kind of thing that
has moved during this campaign. **Fully verified, no changes needed.** A072753 internal record
(`%I #79 Aug 02 2017`, `%K hard,more,nonn`, `%A Mario Ziller, Jul 10 2002`) contains Giovanni Resta's
ILP formulation verbatim as a comment, the explicit optimal class-pairs for a(11)–a(14), Morack's
"We are looking for a GPU approach" verbatim, the extension credits through
"a(19) corrected and a(20)-a(21) added by Mario Ziller, Jun 17 2017", and
`%F a(n) = (A288815(n) - 6)/6`. Every detail the corpus asserts about these two entries is correct,
including the `hard,more` keywords.

## C7. `research/natal-cap-10-sieve-cap.md:211–213` — "no formal theorem excludes every conceivable sieve axiom system" (parity floor 2)

Claim text, verbatim (§5 item 5): "'2 is exactly the parity floor for π₂ upper bounds':
rigorous-folklore status (Tao 2007 wording + Selberg's examples + 2/θ at θ=1); no formal theorem
located that excludes every conceivable sieve axiom system."

**SURVIVES.** I found no such theorem. What I did confirm at primary source is Wu 2004's statement
of Selberg's parity examples (quoted in A3 above), which is the strongest form in print of the
"cannot beat 2" folklore for this specific problem. Nothing formalises it.
**Confidence: MEDIUM-HIGH.**

## C8. Handoff item 1 — "A060256 exists but carries NO formula"

**Claim text, verbatim** (`ATTACKS2.md` row 7 and campaign verdict):
> "Sequence = OEIS A060256 (known, but carries **NO formula** — our scale is contributable as a comment)."
> "min-k turned out to be A060256, formula-less — our scale contributable."

**Fetched the raw internal record**, reproduced here in full so the adjudicator does not have to
re-fetch:

```
%I #15 Nov 09 2024 17:28:28
%S 2,1,1,2,1,6,8,11,4,16,22,4,74,24,37,28,14,11,242,11,91,20,83,91,35,
%T 80,48,47,226,2,12,203,30,38,356,54,266,108,305,227,173,1185,738,13,
%U 382,277,455,433,173,1303,926,1162,164,298,69,121,702,1670,36,570,170,204
%N Smallest multiple a(n) of n-th primorial q(n) such that a(n)*q(n)-1 and a(n)*q(n)+1 are a pair of twin primes.
%H Pierre CAMI, <a href="/A060256/b060256.txt">Table of n, a(n) for n = 1..500</a>
%e 30030*j-1 or 30030*j+1 are not both primes for j=1,2,3,4,5. But for j=6 {180179,180181} are twin primes. So a(6)=6.
%t smp[n_]:=Module[{k=1},While[!PrimeQ[k*n+1]||!PrimeQ[k*n-1],k++];k]; Table[ smp[n],{n,FoldList[Times,Prime[Range[70]]]}]
%o (PARI) a(n)=p=vecprod(primes(n));for(k=1,+oo,ispseudoprime(k*p+1)&&ispseudoprime(k*p-1)&&return(k))
%Y Cf. A001359, A002110, A060229-A060232, A060255, A057706.
%K nonn
%O 1,1
%A _Labos Elemer_, Mar 22 2001
%E Corrected and extended by _Ray Chandler_, Apr 03 2009
```

**Verdict: SURVIVES, cleanly.**
- It exists, and it **is** the right sequence: `%N` and `%e` confirm a(n) is the multiplier k, with
  a(6) = 6 against the 6th primorial 30030 — the corpus's reading is correct, and the corpus's
  min-k list matches `%S` term for term.
- There is **no `%F` line and no `%C` line**. Formula-less and comment-less, exactly as claimed.
- **Not stale.** The record's own revision stamp is `#15 Nov 09 2024`, i.e. nothing has been added in
  21 months, and certainly nothing since 2026-08-14. The corpus's four-day-old, one-witness claim
  holds.
- **One thing the corpus should know anyway:** `%H` carries **Pierre Cami's b-file with 500 terms**
  (n = 1..500). `ATTACKS2.md` row 7's "m(n) computed to n=35 … another equivalent wall-form but new
  data" is not new data — it is the first 7% of a published b-file. The *growth-scale reading*
  m(n) ~ (pₙ/(e^γ ln pₙ))² remains contributable as a comment; the terms do not.

**Severity: LOW for the claim, MEDIUM for the "new data" framing in row 7.**
**Confidence: HIGH** (raw internal record, including its revision date).

---

# D. UNRESOLVED

## D1. `research/covering-dive.md:125` — "No Erdős problem … poses 'Jacobsthal with two residue classes per prime' directly"

`erdosproblems.com` returns HTTP 403 to WebFetch and its **search endpoint 404s through the
r.jina.ai proxy**, so I could not run the site search the claim rests on. What I could do:

- Problem **#689** is reachable through the proxy and confirms **status: open**, last updated
  **8 April 2026**, statement as the corpus gives it (choose one class mod each prime so that every
  integer in [1,N] satisfies at least two congruences), cross-listed to #687, #688, #1205 and Ben
  Green's problem list, with a Lean formalisation, and "tractable" votes. **The comment thread does
  not render through the proxy**, so I can neither confirm nor deny the corpus's "a claimed solution
  has been posted in the comments (30 comments)".
- Web searches for a two-class Jacobsthal Erdős problem surfaced nothing beyond #687/#688/#689/#970.

**Verdict: UNRESOLVED.** The claim is not contradicted by anything I found, but I did not reproduce
the search it rests on.

## D2. `research/natal-cap-10-sieve-cap.md:201–202` — Siebert 1976

Claim text, verbatim (§5 item 1): "Siebert 1976 (paywalled): explicit constant and any interval form
— **[UNVERIFIED]**; cited through Lichtman p. 3 and secondary web sources."

**Still UNVERIFIED.** H. Siebert, *Montgomery's weighted sieve for dimension two*, Monatshefte für
Mathematik **82** (1976) 327–336, DOI 10.1007/BF01540603 — Springer paywall, and I found no paper
quoting his inequality verbatim. Springer's own landing text confirms only the scope: "an upper
estimate for a certain class of two-dimensional sieve problems, including bounds for the number of
'twin primes' and 'Goldbach representations'". **However, item 1's practical purpose is now moot**:
Riesel–Vaughan Lemma 5 (A2) supplies the interval-uniform explicit constant that Siebert was being
cited for, and Halberstam–Richert Theorem 5.3 (quoted verbatim by Bordignon–Lee) supplies the
`[1, y]` form of the 8.

## D3. `research/natal-cap-10-sieve-cap.md:204–206` — Halberstam–Richert Corollary 2.4.1 and p. 239

**Still UNVERIFIED.** The Internet Archive holds *Sieve Methods* (`sievemethods0000halb`) but it is
lending-restricted: both the `_djvu.txt` derivative and the search-inside endpoint return 403.
No paper I found quotes "Corollary 2.4.1" with its statement.

What changed: I can now say with confidence that the **[1,y] constant-8 statement is HR Theorem 5.3,
not Corollary 2.4.1**, because Bordignon–Lee quote Thm 5.3 verbatim and its g = 2 specialisation is
exactly `2^g g! = 8`. FKMPT's "[7, Cor. 2.4.1]" is being cited only for a `≪` bound in an interval,
which is a weaker statement, so both attributions can be right; but the corpus should not assume
Cor. 2.4.1 is the explicit-constant statement.

---

# E. Bibliographic corrections found in passing (not absence claims)

Listed so the adjudicator can decide; each is verified.

1. `natal-cap-10-sieve-cap.md:227` — "Riesel–Vaughan, BIT 23 (1983)" → **Arkiv för matematik 21
   (1983), 45–74**. Two sources (paper running heads; Vaughan's own publication list item 49).
2. `covering-dive.md:36` — "DHR book, *A Higher-Dimensional Sieve Method*" → the book is
   **Diamond, Halberstam, with Galway**, Cambridge Tracts in Mathematics 177, 2008. Ch. 17 is right.
3. `natal-cap-10-sieve-cap.md:47` — "twin side by halving" is not how Wu gets 3.3996; he proves
   Theorem 3 separately. Half of Theorem 1's 7.8209 is 3.910.
4. `covering-dive.md:82` — Cummings–Filaseta–Trifonov is now published: **Acta Math. Hungar. 175
   (2025), 1–25**, DOI 10.1007/s10474-024-01496-x; the 118 survived.
5. `covering-dive.md:61` — the corrigendum attributes the M > 6 correction to "errors in the
   exponents of H on **pages 685–686**", not to "the deduction of Theorem 2 from Theorem 3".
   Verbatim from the published corrigendum: "The most serious are errors in the exponents of H on
   pages 685–686, which, when corrected, force the parameter M to be somewhat larger than claimed,
   namely M > 6." Everything else in the corpus's §2.3 corrigendum paragraph is **exact**, including
   "the factor 4 + δ should be 6" and "the corrected lower bound is C(ρ) > e^{−1−6/ρ}".
   Full citation confirmed from the PDF's own header: **J. Eur. Math. Soc. 25, 2483–2485 (2023),
   DOI 10.4171/JEMS/1305, © 2022 EMS, received September 19, 2022**, authors **Kevin Ford, Sergei
   Konyagin, James Maynard, Carl Pomerance, Terence Tao**. The main paper is **JEMS 23 (2021),
   no. 2, 667–700** — corpus correct.
   *Two corrected numbers the corpus does not record, in case they are used anywhere:*
   corrigendum item (2) **C(1) > 1/835**, item (3) **C(1/d) > e^{−(6d+1)}**, item (4)
   **C(1/2) > 1/325565**. `research/two-class-lower-bounds.md:125` already uses the corrected
   1/325565 — good.
6. `covering-dive.md:17` — Vaughan, PEMS **20 (1976-7), 329–331**, confirmed verbatim against
   Vaughan's own publication list item 28.
7. `covering-dive.md:36` — Franze is **Craig S. Franze**, J. Number Theory **131** (2011), issue 10,
   **1962–1982**. The corpus's "C. S. Franze" is right; `sift-limit-attack.md:120`'s "JNT 131 (2011)"
   could carry the page range.
8. `oeis-seam-submission.md` CROSSREFS — should list **A367739** (count of multipliers by bit-length)
   and probably **A384545** (smooth-multiplier variant, `%I` Apr 2026).
9. `ATTACKS2.md` row 7 — A060256 has a **500-term b-file by Pierre Cami**; "m(n) computed to n=35 …
   new data" overstates.
10. `covering-dive.md:22` — Granville's "Sieving intervals and Siegel zeros" is
    **arXiv:2010.01211** (submitted 2 Oct 2020); the corpus cites only a PDF on his homepage and
    "published version: … 2020s". The arXiv id would make it checkable.

---

# F. COVERAGE — what I could not resolve, and why

**Blunt list of failures.**

1. **Semantic Scholar was never reachable** (429 on every call, HTML page empty). The one absence
   claim that is literally a database count — `covering-dive.md:51`, "exactly one citation" — is
   therefore untested. Anyone with a working S2 or Google Scholar session closes this in 30 seconds.
2. **erdosproblems.com's search endpoint is unreachable** (403 direct, 404 through the proxy). So
   `covering-dive.md:125` is unverified, and I could not read #689's comment thread to check the
   "claimed solution posted in the comments" line. A human browser settles both immediately.
3. **Siebert 1976 stayed paywalled** and **Halberstam–Richert stayed lending-locked.** Two of the six
   items in `natal-cap-10` §5 are still exactly where the corpus left them. A subject expert with a
   university library closes both in an afternoon, and Cor. 2.4.1 in particular deserves it, because
   FKMPT's Remark 7 — the single most load-bearing quote in `covering-dive.md` — hangs off it.
4. **I could not read Iwaniec 1978 either.** De Gruyter still blocks. Everything in `covering-dive.md`
   §1.2 about the paper's internals (Lemma 1's divisor bijection, the possible sign error) remains
   second-hand, exactly as the corpus's own caveat says. I add one small corroboration: Kalmynin and
   Konyagin cite it as "H. Iwaniec, *On the problem of Jacobsthal*, Demonstratio Math. **11** (1978),
   no. 1, 225–231" and state the result as `j(N) ≪ ln²N` for **all** natural N — a fourth independent
   confirmation of the statement, still not of the proof.
5. **The searches I know were weak.**
   - *Non-English literature.* Every query I ran was in English. The Jacobsthal problem has a German
     line (Jacobsthal 1960 in D.K.N.V.S. Forhandlinger, Kanold in Math. Ann., Stevens) and a Russian
     line (Konyagin, Kalmynin). A two-class upper bound could exist in a Russian-language journal and
     I would not have seen it. This is my biggest single blind spot on C1.
   - *Books.* I searched papers and preprints. A κ = 2 Jacobsthal exponent is exactly the kind of
     thing that lives as an unnumbered remark in Chapter 10 of the Diamond–Halberstam–Galway book
     ("Some applications of Theorem 9.1"), or in Greaves' *Sieves in Number Theory*, and no web
     search reaches inside those. **If C4 (`G₂ ≪ p^{4.27}` unwritten) is wrong, that is where it is
     wrong**, and I could not check it.
   - *The covering-systems polynomial-scale question (C3).* I am least confident here because I
     could not find a settled canonical name for "interval coverable by k classes per prime from a
     range". If that object has a name I did not guess, my null is worth little.
6. **What I suspect but cannot prove.**
   - The Kalmynin–Konyagin method almost certainly adapts to a *fixed* pair `{0, −2}` per prime.
     Their gain is `(Rankin factor)^{M(f)}` with M = 2 for a quadratic; the fixed-pair system has the
     same per-prime class count. If that adaptation is routine, then the corpus's Realistic Target 4
     is not just weakened but largely pre-empted, and someone should check whether Kalmynin or
     Konyagin has a follow-up. I found none, but I could not search their Russian-language output.
   - The corpus's `π₂` "8 vs 4" distinction (`natal-cap-10` §1.4 bullet 1: sub-8 constants do not
     transfer to position-uniform interval bounds) is *probably* right but I did not stress it. The
     large sieve is position-uniform and Pan 1964 got 6 on the twin side "by applying Linnik's large
     sieve method" (Wu p. 2, verbatim). Whether Pan's 6 is interval-uniform is a real question I did
     not resolve, and if it is, `natal-cap-10` §2 Regime 2's "Available constants: 8
     (interval-uniform)" understates what is available. It would not change the verdict (1.28 is
     still out of reach and the parity floor is still 2), but the ordering table at §4 would.
7. **What a subject expert with database access would find that I could not:** the citation graph of
   Iwaniec 1978 (MathSciNet "Citations" tab), which is the one query that would settle C1 and C4
   outright; Zentralblatt reviews of Siebert 1976 and of the DHR book chapter 10; and whether any
   thesis — Klyve's Dartmouth 2007 thesis on explicit twin-prime bounds is the obvious candidate —
   states the interval-uniform π₂ constant more sharply than Riesel–Vaughan's 8.

**Unreached list, ranked by what it would buy:**
1. MathSciNet citation graph of Iwaniec, *On the problem of Jacobsthal* (settles C1, C4).
2. Halberstam–Richert Corollary 2.4.1, exact statement (settles D3; underwrites FKMPT Remark 7).
3. Diamond–Halberstam–Galway Chapter 10, "Some applications of Theorem 9.1" (settles C4).
4. Semantic Scholar / Scholar citation count for arXiv:1706.00317 (settles B1).
5. erdosproblems.com site search for "Jacobsthal" and #689's comment thread (settles D1).
6. Siebert 1976 full text (closes `natal-cap-10` §5 item 1 formally).
7. Russian-language search for a two-class Jacobsthal upper bound.
