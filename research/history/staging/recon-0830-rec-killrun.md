# Recon 0830: REC(s, u₀) and the weighted kill-run against the literature that owns them, with the one Maier-type fact that bears on REC

<!-- ledger
id: Q-recon-0830-rec-killrun
status: ANSWERED
todo: 0, D
question: Does the literature hold, in its own conventions, a theorem whose hypotheses REC(s, u0) (the sup-versus-rms recovery of the level-D signed remainder over all positions, attack-0829n-rml-proof.md section 3) or the weighted kill-run K*(s) (the longest run of level-s slots the primes in (s, 2s] can kill, attack-0829n-doubling-bridge.md sections 0 and 3) satisfies as stated, or a Maier-type theorem that makes REC false for two-class sifted sets at some u0 below beta_2?
verdict: No theorem applies to either object as stated, on four calibrated channels searched in the owning conventions; every neighbour is graded NEAREST with its unmet hypothesis named, and neither object is on any refuted row. On the Maier question the answer is negative for REC as stated (the Maier family bounds the COUNT, i.e. the full-level remainder, never a level-D truncation) but carries one calibration: at one class and full level the REC-shaped inequality is FALSE asymptotically, by Buchstab's origin ratio against the Montgomery-Vaughan full-period variance ceiling, and the embedded arithmetic puts the level where that falsity first shows at log10 z between 16 and 141 depending on u0 and epsilon, so a finite-z margin of the kind the corpus measures cannot see a failure of this type; at two classes the same full-level statement is HL-conditional at u0 = 2 and unlocated in print at any u0. No exponent moved.
-->

> **RIDER 2026-08-30 (orchestrator, per `coherence-0830.md` D18; this note
> stays HELD).** This note's brief-error clause that "~75 candidates" is not
> on the record is itself wrong: the five `recon-0828-*` ledger verdicts sum
> 21 + 10 + 15 + 13 + 16 = 75; the sum here omitted `recon-0828-farfields`.
> README §Status's sentence stands. Two further corrections from
> `redteam-0830-imports.md` (2026-08-30, which reproduced this note's three
> crossing levels log₁₀ z* = 33.53, 68.80, 33.62 exactly): Halász–Montgomery
> is NOT APPLICABLE for the wrong reason (it is an abstract inner-product
> inequality, not a hypothesis mismatch), and FGKT's heuristic quote is on
> p. 4, not p. 3.

*(2026-08-30 recon wave, staging, HELD for the standing adversarial pass.
Producer: `research/history/staging/recon-0830-rec-killrun.js`, embedded
via `research/qc/embed.js`; it computes sizes only, and every number below
that is not quoted from a source by page or from a corpus artifact by file
and line is quoted from that producer's OUTPUT block by line. No existing
file was edited and no git command was run. Source legend follows
`research/IMPORT-MAP.md` §0: **[SOURCED]** read at a page image this session,
sha256 prefix in §6; **[SOURCED-TEXT]** read at a text extraction of a PDF
fetched this session, which is not reading and is labelled so; **[SOURCED-BIB]**
record verified at an index, statement not opened; **[CITED]** a corpus
artifact, not recomputed; **[ARITHMETIC]** hand arithmetic with its inputs
named. Every rung is PROVEN, MEASURED, HEURISTIC, OPEN or REFUTED as
`CLAUDE.md` requires, and when in doubt the lower one.)*

**Ledger debt, stated because this note cannot pay it.** `research/qc/questions.js`
requires TODO items 0 and D to carry `Ledger: Q-recon-0830-rec-killrun` on
their `Ledger:` lines. The fence forbids editing `TODO.md`, so the gate will
report this note as naming items that do not acknowledge it; the fix belongs
to the orchestrator.

---

## 0. The verdict, disconfirming half first

**Nothing found applies to either object as stated, and nothing lowers any
exponent.** This is the standing calibration of every import-style pass on
this record (`research/history/staging/recon-0828-rough.md` §0 counts it as
the twenty-second consecutive one; this is a later one still), and the brief
predicted it. The deliverable is therefore the calibrated form rule 7 asks
for: the nearest theorem per object with its unmet hypothesis named, and a
clean negative in the owning convention with the query list attached.

**Object 1, REC(s, u₀).** No published theorem bounds the sup over ALL
positions of a sieve remainder at a level exceeding the window, against
anything smaller than the trivial term count. The nearest theorems, graded in
§2: Iwaniec's every-interval sieve (level below the window, the trivial
remainder `|r_d| ≤ 1`), the Montgomery–Vaughan and Aryan variance bounds (the
mean-square rung, wrong quantifier), Bettin–Chandee's priced position-uniform
bound (already in the corpus's map), and the Maier family.

**Object 1(c), the Maier question.** No Maier-type theorem in print refutes
REC as stated, because every one of them (Maier 1985, Friedlander–Granville–
Hildebrand–Maier 1991, Granville–Soundararajan 2007, Granville 2022) speaks
about the COUNT of a sifted set in an interval, which is the remainder at FULL
level `D = W`, and REC is a statement about the truncation at level `D = z^s`
with `s = 3 < u₀`. What the family does establish, unconditionally and at one
class, is that the REC-shaped inequality at full level is false: at the origin
the one-class count in `[1, z^u]` sits at `ω(u)e^γ` times its mean (Buchstab;
`0.8905` at `u = 2`, producer line 129), the full-period rms is at most the
Poisson `√(HP)` (Montgomery–Vaughan 1986, quoted at Gorodetsky p. 6), and the
ratio therefore grows like `z^{u/2}` up to a logarithm, past any
`z^{u/2−ε}`. **The calibration that matters for the corpus's measured margins
is that this asymptotic falsity is invisible at every computable level:** the
crossing sits at `log₁₀ z* = 33.5` at `(u, ε) = (3, 0.10)` and `68.8` at
`(4, 0.10)` (lines 149, 152), against the corpus's `z ≤ 47`. At two classes the
same full-level statement is HL-conditional at `u₀ = 2` (the corpus's own
`origin/mean = e^{2γ}/4 = 0.79305`, `REFUTED.md` row "the origin as a
distinguished position") and no two-class Maier theorem was located at any
`u₀`. Rung: PROVEN for the one-class full-level falsity given the two cited
theorems and Buchstab; MEASURED-calibration for the crossing levels (asymptotic
constants evaluated at finite `z`); OPEN for REC itself, in both directions.

**Object 2, the weighted kill-run.** Clean negative in the owning conventions
(§3): the long-gap literature names the object (Ford–Green–Konyagin–Tao's
`Y(x)`, "sieve out the whole interval `[y]`", and the second and third sieving
stages of the Erdős–Rankin construction) and proves only LOWER bounds on it,
one kill per prime (Rankin) up to `≫ log₂ x` kills per prime (FGKMT 2018 via
hypergraph covering); the one upper bound it states is Iwaniec's `Y(x) ≪ x²`
with the Maier–Pomerance conjecture `x(log x)^{2+o(1)}` beside it (FGKT p. 3,
page image), which at two classes is the corpus's own `z^{β₂}` route and not a
bridge. The covering-systems side was settled by `recon-0828-covering.md` §2a
two days earlier and is not re-walked; the one thing added is that Crittenden–
Vanden Eynden's Lemma 2 counts INTEGERS in the run and the kill-run counts
SLOTS, so its hypothesis is unmet for object 2 even where it is met for `G₂`.

**Brief errors found at the record (§4).** Three, none load-bearing: the
"~75 candidates over two waves" count is not on the record (the recorded counts
are 21 + 21 attacks and 59 recon angles); Bettin–Chandee has no row of its own
in `REFUTED.md`; and "Opera de Cribro §6.18" is not a section, the book's
chapter 6 ending at §6.10 "Extremely Short Intervals" (TOC, §6).

---

## 1. Channels, calibrated before any negative was written

Per `research/SEARCH-CONVENTIONS.md` §2 and the campaign rule that a 403 or an
empty result is a claim about the fetcher: every channel below was probed on a
known positive in the same session, by `curl` from Bash, before any negative
from it was counted.

| channel | how reached | calibrator | result |
|---|---|---|---|
| arXiv API | `https://export.arxiv.org/api/query?search_query=…` | `ti:"Long gaps in sieved sets"` returns arXiv:1802.07604; `abs:"Jacobsthal function"` returns 15 records including Kalmynin–Konyagin 2302.00459 and Ziller–Morack 1706.03668 | **PASS**, after one HTTP 429 episode (twelve consecutive 429s mid-session; every query that 429'd was re-run at 6 s spacing and is reported from the re-run) |
| OpenAlex | `api.openalex.org/works`, `filter=title.search:` and `filter=cites:` (comma-conjunctive, never `AND`) | `title.search:long gaps in sieved sets` returns 2, `W2788886212` first | **PASS**; the free-text `search=` endpoint returns cross-disciplinary noise (37,228 hits for "Maier matrix method sieve short intervals", none relevant on page 1) and no negative rests on it |
| zbMATH Open | `api.zbmath.org/v1/document/_search` | `sifting limit` returns "Sifting problems, sifting density, and sieves" at rank 1 | **PASS**; two queries answered HTTP 404, which on this channel is a zero-result negative (`SEARCH-CONVENTIONS.md` §5); two review-text fetches answered HTTP 502 and are owed (Hildebrand–Maier 1989) |
| MathSciNet `mrlookup` | `POST mathscinet.ams.org/mrlookup`, bibliographic fields only | `au=Kalmynin&ti=Jacobsthal` returns MR4727548 | **PASS**; used for locators only, it carries no statements |
| PDFs at page image | `arxiv.org/pdf/<id>` via curl, `pdftoppm` at 100 dpi, read as images | Gorodetsky p. 5 reproduces the corpus-hashed file (`35a6…`, `069d…` prefixes match `recon-0828-rough.md` §9) | **PASS**; sha256 prefixes in §6 |

**Unreached, stated so coverage is not mistaken for absence.** The AMS journal
PDF of Friedlander–Granville–Hildebrand–Maier 1991 answers HTML to curl under
two header sets (its statement is taken from the zbMATH review and from
Gorodetsky's quotation of Theorem B1 at p. 6, page image); Maier 1985 at
Project Euclid answers a JavaScript shell (zbMATH review read instead);
Iwaniec 1978 at De Gruyter answers HTTP 202 with an empty body (the corpus
already records it as not freely retrievable, `covering-dive.md` source
index); Pintz 1997 at ScienceDirect answers 403 (review read at zbMATH);
*Opera de Cribro* itself is unread here beyond its table of contents. Google
Scholar and Semantic Scholar were not used.

**The query list, per object, with counts.** arXiv API unless marked; `0`
means HTTP 200 with zero results after the 429 episode.

Object 1: `ti:"short intervals" AND abs:sifted` 0; `abs:"short intervals" AND abs:sifted` 0; `abs:Maier AND abs:tuples AND abs:primes` 0; `abs:Maier AND abs:tuples` 1 (off-topic); `abs:"Maier matrix"` 1 (Ford–Maynard–Tao, *Chains of large gaps*); `ti:irregularities AND abs:primes AND abs:intervals` 0; `abs:irregularities AND abs:prime AND abs:tuples` 0; `abs:"twin primes" AND abs:"short intervals" AND abs:irregular*` 0; `abs:"prime k-tuples" AND abs:"short intervals"` 3 (none on irregularities); `abs:"uncertainty principle" AND abs:"arithmetic sequences"` 0 (GS 2007 predates the phrase's indexing; located by direct id); `abs:sieve AND abs:"short intervals" AND abs:uniformly AND abs:gap` 0; `abs:sieve AND abs:"short intervals" AND abs:uniform` 2 (off-topic); `abs:"reduced residues" AND abs:intervals` 7 (none relevant); `abs:"reduced residues" AND abs:tuples` 5 (Aryan arXiv:1302.2296 at rank 1); `abs:Buchstab AND abs:irregularit*` 0; `abs:Buchstab AND (abs:twin OR abs:tuples)` 1 (off-topic); `abs:"Halász" AND abs:sieve AND abs:"short intervals"` 0; `abs:sieve AND abs:remainder AND abs:"every interval"` 0; `abs:"all positions" AND abs:sieve` 1 (off-topic); `abs:sifting AND abs:oscillat*` 2 (signal processing); `abs:"sieving intervals" OR abs:"sieving an interval" OR abs:"sieving short intervals"` 1 (Granville–Koukoulopoulos–Matomäki *When the sieve works*, one class, κ ≤ 1 by its own scope, not opened); `abs:"Jurkat" AND abs:interval` 0. zbMATH: `irregularities distribution primes short intervals` 10 (Maier 1985, Hildebrand–Maier 1989, GS 2007, FGHM 1991, Granville 1995 survey among them); `oscillation theorems sifting functions` 2 (FGHM 1991 at rank 1); `distribution of reduced residues short intervals` 2 (neither relevant); `sieve short intervals uniformly in position` HTTP 404 = 0; `prime tuples short intervals irregularities` HTTP 404 = 0. mrlookup: FGHM 1991 MR1080647; Maier 1985 MR783576; Hildebrand–Maier 1989 MR993220; Montgomery–Vaughan 1986 MR835765; Aryan 2015 MR3333962; Friedlander–Granville I/III/IV MR986796/MR1145606/MR1133852.

Object 2: `abs:covering AND abs:"residue classes" AND abs:consecutive AND abs:primes` 0; `all:"Erdos-Rankin"` 1 (Maynard 1408.5110; the hyphenated phrase is tokenised unreliably); `abs:Erdős AND abs:Rankin AND abs:gaps` 4 (Pintz 2014, Ford 2025 survey, two off-topic); `abs:Rankin AND abs:gaps AND abs:primes` 7 (Pintz, Maynard, Banks–Freiberg–Maynard among them); `abs:Rankin AND abs:limit AND abs:method` 24 (all off-topic); `abs:Rankin AND abs:"smooth numbers"` 0; `abs:"sieved set" OR abs:"sieved sets"` 8 (none an upper bound); `abs:"sifted set" AND abs:gap` 1 (FKMPT); `abs:consecutive AND abs:"residue class" AND abs:"each prime"` 1 (FKMPT); `ti:"long gaps" AND abs:sieve` 0; `abs:hypergraph AND abs:covering AND abs:primes` 8 (FGKMT at rank 5); `abs:"Pippenger" AND abs:primes` re-run pending the 429 and not counted; `abs:"two residue classes" AND abs:prime` 2 (off-topic); `abs:"covering system" AND abs:multiplicity` 14 (the KKL / function-field family; no interval statement); `abs:Jacobsthal AND abs:sieve*` 0; `abs:"rough numbers" AND abs:gap*` 1 (off-topic); `abs:gaps AND abs:"coprime to" AND abs:consecutive` 2 (off-topic); `abs:"residue class" AND abs:survivors` 0; `abs:"residue classes" AND abs:sieve AND abs:"almost all" AND abs:gaps` 0. zbMATH: `Erdős-Rankin method` 5 (Maynard 2016, Pintz 2014 among them); `covering residue classes primes multiplicity` 1 (off-topic); `gaps sieved sets` 3 (FKMPT, its corrigendum, Ford–Gabdullin 2025). OpenAlex forward walks: FGKMT `W2964307401`, 73 citing works, every title read, none an upper bound on `Y(x)` or on a sieved-set run (the nearest are Konyagin 2025, already `recon-0828-jacobsthal.md` A11, and Ford–Gabdullin 2025, one class); Kalmynin–Konyagin, three OpenAlex records (`W4393954820`, `W4319049890`, `W4393170300`), `cited_by_count` 0 on each, so no two-class successor is indexed there.

---

## 2. Object 1: REC(s, u₀)

**The object, as stated, and the brief's numbers verified at the record.**
`attack-0829n-rml-proof.md` §3 lines 145–153: fix `s > 1 + √e` and
`u₀ ∈ (2, β₂)`; there exist `ε > 0`, `z₀` such that for every prime `z ≥ z₀`,
with `D = z^s`, `H = ⌊z^{u₀}⌋`, `W = P(z)`, the signed sawtooth remainder of
the level-`D` vector-sieve lattice satisfies
`sup_{x ∈ ℤ/W} |R_H(x)| ≤ z^{u₀/2−ε}·⟨R_H²⟩^{1/2}`, the mean over one full
period, the sup over ALL positions. Since `R_H(x) = Σ_j w_j (N_j(x) − H/q_j)`
with `N_j` the count of the class `c_j mod q_j` in `(x, x+H]` (the same
section's definition of `R_H` through `ψ`), this is the standard weighted
sieve remainder `Σ λ_d r_d` at joint level `D² = H^{2s/u₀}`, which exceeds
`H` at every legal `(s, u₀)`: `2s/u₀ = 1.5` at `(3, 4)` (§3, "In sieve
currency"). Its measured state: TRUE at every computable level with certified
margin `z^{1.72}` to `z^{1.92}` at `u₀ = 4` over `z = 19..37`, slope of the
truth `2.7660 ± 0.2120` on seven points under one octave (§5). **[CITED]**

### 2.1 Owning conventions

In the literature's words REC is one of four things, and each was searched
under its own name (§1): (i) *sieving an interval* uniformly in its position,
Selberg's phrase, whose sharp form is the Jurkat–Richert `f, F` pair for
intervals (Granville 2022 p. 2, page image: "In [12], Selberg asked 'is it
possible that these quantities [the best possible upper and lower bounds for
sieving an interval] behave significantly differently [from the bounds in the
general linear sieve problem]? … We do not know the answer'"); (ii) *the
distribution of reduced residues in short intervals*, the Hooley /
Hausman–Shapiro / Montgomery–Vaughan line, whose object is the full-period
moment `M_k(q; h)` of the one-class count; (iii) *irregularities in the
distribution of primes in short intervals* and *oscillation theorems for
sifting functions*, the Maier family; (iv) *large values of Dirichlet
polynomials* (Halász–Montgomery), the only "sup against L²" literature, whose
hypothesis is a Dirichlet polynomial and not a periodic sawtooth sum on
`ℤ/W`. The corpus's existing rows for the bilinear branch (Kloosterman
fractions, `SEARCH-CONVENTIONS.md` §1 row "the vector-sieve bilinear
remainder") and for `level of distribution` (guaranteed-negative, `θ < 1`)
were not re-run.

### 2.2 Candidates, graded against the object as stated

| candidate | what it proves, in its convention | hypothesis checked against REC | grade |
|---|---|---|---|
| Iwaniec 1978, *On the problem of Jacobsthal*, Demonstratio Math. 11, 225–231, MR499895 **[SOURCED-BIB; statement via Granville 2022 p. 2–3, page image]** | `S(x, y, z) ≥ (f(u) − c/log y)·∏_{p≤z}(1−1/p)·y` uniformly in `x`, for `2 < u ≤ 3`, hence `J(P(z)) ≪ z²` | the remainder is `|r_d| ≤ 1` per modulus, so the level is `y^{1−ε} < H`; REC needs level `D² = H^{2s/u₀} > H` | **NEAREST**, unmet: level above the window. This is the every-interval theorem `recon-0828-rough.md` §2 already identifies as the linear sieve at `β₁ = 2`; at two classes it is the corpus's `z^{β₂}` |
| *Opera de Cribro* §6.10 "Extremely Short Intervals", p. 80, and §13.4 "Short Intervals", p. 267 (TOC, `bookstore.ams.org/coll-57-toc.pdf`, text-extracted) **[SOURCED-BIB]** | unread here; the corpus carries Prop. 6.26 / Cor. 6.28 (almost-all) and result 6.18 (mean-square, one class, `s ≥ 9`) second-hand | the two known results carry the almost-all and the mean-square quantifier respectively | **NOT APPLICABLE on the known content**; the sections themselves are OWED |
| Montgomery–Vaughan 1986, *On the distribution of reduced residues*, Ann. of Math. 123, 311–333, MR835765, Zbl 0591.10042 **[SOURCED-BIB; the bound at Gorodetsky arXiv:2111.00853v3 p. 6, page image]** | `H(φ(q)/q)(1 − ∏_{p\|q, p>H}(1−1/p) + O(φ(q)/q)) ≤ V_q(H) ≤ H φ(q)/q`, `V_q(H)` the full-period variance of the one-class count in windows of length `H`, `q` squarefree; the review adds `M_k(q;h) ≪ q(hP)^{k/2}` and that `M_2 ≤ qhP` is sharp for `h ≤ exp(cP)` | the mean-square rung REC already has (`REFUTED.md` "Lemma V's mean-square form"); says nothing about the sup | **NEAREST**, unmet: the quantifier. Used below only as the rms CEILING in the Maier arithmetic |
| Aryan 2015, *The distribution of k-tuples of reduced residues*, Mathematika 61, 72–88, MR3333962 = arXiv:1302.2296v2 **[SOURCED, Lemma 1.2 at p. 5, page image]** | `M_k^D(q,h) ≪ q h^{k/2} P^{−2ks+ks}`, the `k`-th full-period moment of the `s`-tuple count, `D` admissible, `q` squarefree, implied constant depending on `k, s` | the two-class mean square at Poisson order in `h`; the exponent of `P` printed at the page is `−2ks+ks` and is not interpreted here; the corpus already records this lemma as the general-tuple upper bound (`SEARCH-CONVENTIONS.md` §1, the `θ = 2` variance row) | **NEAREST**, unmet: the quantifier |
| Bettin–Chandee, arXiv:1502.00769, Remark 1 **[CITED]** | position-uniform trilinear Kloosterman-fraction bound at price `(1 + hx/MN)^{1/2}` | `O(1)` only for `x ≪ H^{1.212157}`; ours reaches `exp(H^{0.2344})` | **NEAREST**, priced, `SEARCH-CONVENTIONS.md` §3 row "Position-uniform interval version"; not re-reported |
| Halász–Montgomery large-values inequalities **[MEMORY; zero hits on the sieve/short-interval combination, §1]** | large values of a Dirichlet polynomial against its mean square | hypothesis: a Dirichlet polynomial in `t` or in characters; `R_H` is a sum of sawtooths on `ℤ/W` with frequency support on every `a/q`, `q ≤ D²` | **NOT APPLICABLE** by hypothesis. The Cauchy–Schwarz form that does apply, `sup ≤ (#frequencies)^{1/2}·rms`, is the term-count cap `z^{2s+o(1)}` the rml-proof note already names (§4.1) |
| Granville–Soundararajan 2007, *An uncertainty principle for arithmetic sequences*, Ann. of Math. 165, 593–635 = arXiv:math/0406018v1, Corollary 1.1 at pp. 3–4 **[SOURCED, page image]** | for `𝒫` with `#{p ∈ 𝒫 : p ≤ y} ≫ π(y)` on `(√z, z]` and any `u ≪ √z`, intervals `I±` of length `≥ z^u` with `S(I+, 𝒫, z) ≥ {1 + (c/(u log u))^u}\|I+\|∏(1−1/p)` and `S(I−) ≤ {1 − (c/(u log u))^u}\|I−\|∏(1−1/p)`, of length `≤ z^{u+2}` when `u ≤ (1−o(1)) log log z/log log log z`; Corollary 1.2 (p. 4) gives the reduced-residue form with deviation `1/u^{c₂u}` at `h = log^A q` for any `A` | one class; the object is the COUNT; the deviation is a lower bound on `sup\|count − mean\|`, which is the OPPOSITE side of REC's inequality | **NOT APPLICABLE to REC as stated**; load-bearing for §2.3 |
| Friedlander–Granville–Hildebrand–Maier 1991, *Oscillation theorems for primes in arithmetic progressions and for sifting functions*, J. Amer. Math. Soc. 4, 25–86, MR1080647, Zbl 0724.11040 **[SOURCED-BIB; Thm B1 as quoted at Gorodetsky p. 6, page image; review text read]** | Theorem B1 (as quoted): for `y ≥ (log X)^{6/5+ε}` and `v = log X/log y ≥ C_ε` there are `y′ ∈ [min{y/2, y^{1−2/(v+2)}}, y]` and `X′ ∈ [X(1 − 1/log X), X]` with `\|X′^{−1}Σ_{n≤X′} α_{y′}(n) − P_{y′}\| ≥ P_{y′} v^{−v(1+o(1))}` | one class, the count at the ORIGIN window `[1, X′]`, deviation a constant fraction at fixed `v` | **NOT APPLICABLE to REC as stated**; load-bearing for §2.3 |
| Maier 1985, *Primes in short intervals*, Michigan Math. J. 32, 221–225, MR783576, Zbl 0569.10023; Hildebrand–Maier 1989, Crelle 397, 162–193, MR993220 **[SOURCED-BIB, review text read for Maier; HM review owed, HTTP 502]** | `π(x + (log x)^λ) − π(x) = (log x)^λ/log x + Ω±((log x)^λ/log x)` | primes, not a sifted set; the sieve-side input is Buchstab's `ω` | **NOT APPLICABLE**; the corpus's `PRIOR-ART.md` "THE MAIER CHAIN" already holds it |
| Granville 2022, *Sieving intervals and Siegel zeros*, Acta Arith. 205, 1–19 = arXiv:2010.01211, Corollary 1 p. 3 **[SOURCED, page image]** | assuming infinitely many Siegel zeros, for each fixed `v > 1` there are arbitrarily large `x, X, y, z` with `y = z^v` and `S(x,y,z) = (F(v)+o(1))G(z)y`, `S(X,y,z) = (f(v)+o(1))G(z)y` | conditional on a hypothesis believed false; one class; the count | **NOT APPLICABLE**; `recon-0828-rough.md` §7 and `recon-0828-jacobsthal.md` A12 already carry it |

### 2.3 Deliverable (c): does any Maier-type result make REC false below β₂

**The answer for REC as stated is no, and the reason is structural.** Every
theorem in the family bounds `count(x) − mean`, which is the remainder of the
FULL inclusion–exclusion (`D = W`), from BELOW at some position. REC bounds
the remainder of the truncation at `D = z^s` from ABOVE at every position. A
lower bound on the full-level remainder implies nothing about the truncated
one: `count(x) − T(x)` (the discarded tail plus the sieve inequality's slack)
is free to carry the whole deviation. No theorem located treats the truncated
object, and none of the twenty-two object-1 queries in §1 surfaced one.
**[PROVEN as a statement about the literature searched; the search is the
evidence and §5 says what it cannot see]**

**What the family does prove, at one class and full level, is that the
REC-shaped inequality is false, with the witness at the origin.** Write the
full-level, one-class analogue as `sup_x \|N(x) − HP\| ≤ z^{u/2−ε}·rms`, `N(x)`
the count of `z`-rough integers in `(x, x+H]`, `H = z^u`, `P = ∏_{p≤z}(1−1/p)`,
rms over `ℤ/P(z)`. Then:

- at `x = 0`, `N(0)/(HP) → ω(u)e^γ` (Buchstab's asymptotic for
  `Φ(z^u, z)`, CITED via `PRIOR-ART.md` "THE MAIER CHAIN" item 3 and
  Cheer–Goldston 1990; FGHM Theorem B1 above is the published `Ω`-form of the
  same origin deviation, relative size `v^{−v(1+o(1))}`). The producer's
  section A evaluates `ω` from the delay equation, self-checked against
  `ω(3) = (1 + ln 2)/3`: `ω(u)e^γ = 0.8905362, 1.0052059, 0.9999978, 1.0001078`
  at `u = 2, 3, 4, 4.26645`, deviations `1.0946e−1, 5.2059e−3, 2.2121e−6,
  1.0775e−4` (lines 129–132). **[MEASURED on a cited asymptotic; the `u = 4`
  deviation is four orders below the others because `ω − e^{−γ}` changes
  sign near `u = 4`]**
- `rms ≤ √(HP)` for every `H`, by the Montgomery–Vaughan upper bound quoted
  above (`V_q(H) ≤ Hφ(q)/q` with `q = P(z)`). **[CITED at page image]**
- hence `sup/rms ≥ dev(u)·√(HP) = dev(u)·z^{u/2}·(e^{−γ}/ln z)^{1/2}(1+o(1))`,
  which exceeds `z^{u/2−ε}` for every fixed `ε > 0` once `z^ε` exceeds
  `dev(u)^{−1}(ln z·e^γ)^{1/2}`. **[ARITHMETIC, inputs the two bullets above
  and Mertens]**

So at one class the full-level analogue of REC is FALSE for every fixed
`u > 1` with `ω(u) ≠ e^{−γ}` and every `ε > 0`. **[PROVEN, given the cited
theorems]** Two consequences, both calibrations rather than results:

1. **The falsity is invisible at every computable level.** Producer section B
   (lines 138–145) evaluates the floor `dev·√(HP)` with `P(z)` exact against
   the allowance `z^{u/2−ε}`: at `z = 37`, `u = 3` the floor is `0.452`
   against `156.8` at `ε = 0.10` (line 141); at `u = 4` it is `0.001` against
   `954.1` (line 145). Section C solves for the crossing under Mertens:
   `log₁₀ z* = 33.53` at `(3, 0.10)`, `68.80` at `(4, 0.10)`, `33.62` at
   `(4, 0.20)` (lines 149, 152, 153); with FGHM's `v^{−v}` in place of the
   Buchstab deviation, `34.86` at `(4, 0.10)`. The corpus's REC data stop at
   `z = 47`. **A REC-shaped statement that is false by exactly the mechanism
   the literature proves at one class would pass the finite-`z` margin test of
   `attack-0829n-rml-proof.md` §5 at every level anyone can run.** That is not
   evidence against REC (the mechanism has not been shown to survive the
   truncation) and it is not evidence for it; it fixes what the measured
   margins `z^{1.72}` to `z^{1.92}` can and cannot exclude.
2. **At two classes the same full-level statement is HL-conditional at
   `u₀ = 2` and unlocated at every other `u₀`.** The corpus's own origin ratio
   `e^{2γ}/4 = 0.79305`, measured `0.79303` to `0.79922` (`REFUTED.md` row "the
   origin as a distinguished position", `origin-excess.md` §2, §5), is the
   two-class Buchstab value at `u = 2`; its exact value counts twin primes to
   `z²` and is HL-conditional. For `u₀ ∈ (2, β₂)` the origin count is a
   twin-almost-prime count with no asymptotic in print, the sieve bounds
   `f₂(u₀) < 0 < 1 < F₂(u₀)` straddle the mean and decide no sign, and the
   only general theorem that reaches the two-class sequence is GS Corollary
   1.4, which `maier-matrix.md` §8 reads at source as a dichotomy activating
   only at `u ≥ 5/η² ≥ 50,000`. No two-class Maier theorem was located (§1,
   the `tuples`/`twin` queries). **[OPEN]**

**Bottom line for (c).** No truth-gap finding. REC is not touched by any
theorem in print; the nearest published fact runs the opposite way from what
the chain needs (a lower bound on a sup) at the wrong level (full) and the
wrong dimension (one), and its one transferable content is that item 0's
finite-`z` margins are blind to this failure class by 30 to 140 decades in
`z`.

## 3. Object 2: the weighted kill-run K*(s)

**The object, as stated, verified at the record.** `attack-0829n-doubling-bridge.md`
§3, notation block and step 5: `T_s` the level-`s` tile, `N(s) = π(2s) − π(s)`
the entering primes, `K*(s)` "the longest run the two residue classes of each
prime in `(s, 2s]` can jointly cover on the slot sequence", anywhere in the
level-`2s` period (§2), weighted through `maxsum_{K*+1}(T_s) = (K*+1)·ḡ(s)·ρ(s, K*+1)`
with `ρ_run` measured `1.000` to `1.440` over fourteen steps; the inequality
item D needs is `(R)`: `K*(s) + 1 ≤ 8·[Ĝ(s)/ḡ(s)]/ρ(s, K*+1)` for every `s`, and
"Upper bound on `K*(s)`: OPEN. The only a-priori handle is residue counting,
which closes iff `θ = 2Ĝ(s)Σ_{q∈(s,2s]} 1/q < 1`; `θ ≥ 1.3333` at the first step
and `θ → ∞`". The floor is `K* ≥ N(s)` (Lemma 1 of `hsubpow-explicit-K.md`
§2b, cited there), `K*(16) = 17` against `N = 5` by exact walk (§2, producer
line 536), with "five entering primes deliver 15 strikes on 14 slots inside
the record window". The brief's "each prime `p` kills the slots in two residue
classes mod `p`, and `p > s` so its classes are free" is exact in the sense
the note gives it: the classes are `{0, −2} mod p` and the freedom is the
maximum over positions, which CRT turns into a free choice of the pair's
placement per prime. **[CITED]**

### 3.1 Owning conventions

The literature never writes "kill-run", "slot" or "tile". It names the
object three ways, and each was searched (§1):

- **`Y(x)`, "sieve out the whole interval `[y]`"**: Ford–Green–Konyagin–Tao,
  *Large gaps between consecutive prime numbers*, Ann. of Math. 183 (2016)
  935–974 = arXiv:1408.4505, Definition 1 p. 3 (page image): "Define `Y(x)`
  to be the largest integer `y` for which one may select residue classes
  `a_p (mod p)`, one for each prime `p ≤ x`, which together 'sieve out'
  (cover) the whole interval `[y] = {1, …, y}`", with Lemma 1.1
  `G(P(x) + Y(x) + x) ≥ Y(x)` and the remark `j(P(x)) ≥ Y((1+o(1))x)`. This
  is the one-class, all-primes-`≤ x`, consecutive-INTEGER form of the
  kill-run; `K*` is its two-class form on a SPARSE sequence (the level-`s`
  slots) with the primes restricted to the band `(s, 2s]`.
- **the second and third "sieving stages"**: FGKT p. 3 and FGKMT
  arXiv:1412.5029 §1.2 (text-extracted): after the small and medium primes
  take the class `0`, the survivors are killed by primes in `(δx, x]` or
  `(x/2, x]`, each prime removing one survivor (Rankin), two (Maier–Pomerance
  1990, via "a kind of 'twin primes on average' result"), two for almost all
  primes (Pintz 1997, "nearly perfect matching", zbMATH review Zbl-record
  read), `r` for any fixed `r` (FGKT, progressions of primes with prime
  common difference), `≫ log₂ x` (FGKMT, "each `n_p mod p` contains about
  `log₂ x` of the primes in `Q ∩ S(ã)`", with the overlap handled by a
  generalised Pippenger–Spencer covering, Theorem 3 there). The kills-per-
  prime is the quantity the corpus measured as "15 strikes on 14 slots by
  five primes".
- **"long gaps in sieved sets"**: FKMPT, JEMS 23 (2021) 667–700, the
  `(I_p)`-sieved-set frame, one-dimensional by hypothesis, with Remark 7's
  two-class disclaimer; already in `covering-dive.md` §2.3 and
  `two-class-lower-bounds.md` §2a and not re-read.
- The covering-systems conventions (distinct moduli, multiplicity `s`,
  interval-to-`ℤ` transfer) are `recon-0828-covering.md` §2a, A1–A3, A8 and
  `covering-dive.md` §3.3–3.4 and were not re-walked.

### 3.2 Candidates, graded against the object as stated

| candidate | what it proves | hypothesis checked against `K*(s)` | grade |
|---|---|---|---|
| FGKT 2016 p. 3 **[SOURCED, page image]**: "The best upper bound known is `Y(x) ≪ x²`, which comes from Iwaniec's work [23] on Jacobsthal's function. It is conjectured by Maier and Pomerance that in fact `Y(x) ≪ x(log x)^{2+o(1)}`. This places a serious (albeit conjectural) upper bound on how large gaps between primes we can hope to find via lower bounds for `Y(x)`" | the ONLY upper bound on a coverable run the long-gap literature states, and it is Iwaniec's sieve bound; the conjectural one is Maier–Pomerance's | one class, all primes `≤ x`, integers; at two classes on the slot sequence the same route is `Ĝ(2s) ≤ (2s)^{β₂+o(1)}`, the corpus's own exponent, and the bridge `K*+1 ≤ Ĝ(2s)/6` it yields is circular for item D | **NEAREST**, unmet: dimension, prime band, and the run being counted in slots; and it is the target, not a bridge |
| Rankin 1938 / Maier–Pomerance 1990 (Trans. AMS 322, 201–237, MR972703, PDF fetched, text-extracted, no "limit of the method" statement found in it) / Pintz 1997 (JNT 63, MR1443763, review) / FGKT 2016 / FGKMT 2018 (J. Amer. Math. Soc. 31, 65–105 = arXiv:1412.5029, Theorems 2–5, text-extracted) | LOWER bounds on `Y(x)`: kills per prime `1, 2, ≈2, r, ≫ log₂ x` | one class; a full interval `[y]` sifted at the origin; the survivors' distribution in classes mod `p` is controlled by sieve upper bounds valid because `y ≫ p·(level)`; here the run's stretch is `≈ K ḡ ≈ s ln s` and `L/p ≈ ln s`, below any sieve's reach | **NEAREST, wrong direction**: the family proves the run CAN be long; item D needs that it cannot |
| FGKT p. 3, the heuristic **[SOURCED, page image]**: "Assuming that `V` is a 'random' subset of `[y]`, for every prime `p ∈ (δx, x]` there should in fact be a residue class `a (mod p)` containing `≫ log x/(log₂ x)^{O(1)}` elements of `V`. (Roughly, the heuristic predicts that the sizes of the sets `V ∩ (a (mod p))` are Poisson distributed with parameter `≈ \|V\|/p`.) Whilst we cannot establish anything close to this…" | the max-load-per-prime heuristic, stated as unproven by its authors | this is the mechanism behind the corpus's `K* ≈ s/ln ln s` heuristic (`doubling-bridge.md` §3 step 5); an UPPER bound on the max load is exactly what (R) needs and the field marks it as beyond reach | **HEURISTIC in print, no theorem**; it names the wall in the field's own words |
| Kalmynin–Konyagin 2024 (Izv. Math. 88:2, MR4727548; `two-class-lower-bounds.md` §4c) **[CITED]** | two-class Erdős–Rankin: a LOWER bound on `G₂(P(y))` | direction; and no successor: OpenAlex `cited_by_count` 0 on all three records | **NEAREST, wrong direction**; not re-imported |
| FKMPT 2021 Theorem 1, Remark 7 **[CITED]** | gap lower bounds for one-dimensional sieved sets; "our methods only seem to give good results in the one-dimensional case" | `I_p = {0, −2}` is two-dimensional by their own hypothesis; and `covering-dive.md` §2.3 records that no upper-bound companion exists for any dimension but `κ = 1` (`[ABSENT]` there, searched in the sieved-set convention) | **NOT APPLICABLE** |
| Crittenden–Vanden Eynden 1970 Lemma 2 (`recon-0828-covering.md` §2a, verbatim there) **[CITED]** | `N > 1 + L(1 − Σ_{i≤s} k_i/b_i)∏_{i>s}(1 − k_i/b_i) − (1 + Σ_{i≤s} k_i)∏_{i>s}(1 + k_i)` uncovered INTEGERS in a run of length `L`, `k_i` classes per pairwise-coprime `b_i` | the run in object 2 is counted in SLOTS; the lemma's count of integers in the classes says nothing about how many of them are slots, which is the concentration the counting bound `θ` cannot control | **NOT APPLICABLE** to `K*`; the recon note that found it already grades it depth-1 Bonferroni for `G₂` |
| Klein–Koukoulopoulos–Lemieux 2024, Theorem 3 (`covering-dive.md` §3.3; arXiv:2212.01299 fetched, text-extracted: "Let `A` be a covering system of multiplicity `s`. Then there exists an absolute constant `c > 0` such that its smallest modulus is `⩽ exp(c·log²(s+1)/log log(s+2))`") | a multiplicity-2 prime-modulus system with all moduli `> s₀` cannot cover `ℤ` | `ℤ`, not a run; and covering `ℤ` is free here (`∏(1 − 2/p) > 0`) | **NOT APPLICABLE**; already so graded at `covering-dive.md` §3.3 |
| Costello–Watts 2015, Thm 4.4 (`SEARCH-CONVENTIONS.md` §1 row `π_min(m,k)`; `recon-0828-covering.md` A4) **[CITED]** | a recursion across levels for the one-class order-`m` function, evaluated at `m = 1` | the one published cross-level recurrence for a Jacobsthal-type object; one class, and A4 prices its two-class transplant as a finite-level certificate ladder, not an all-`s` bound | **NEAREST in shape**, unmet: dimension and uniformity in `s` |
| Konyagin 2025 (`recon-0828-jacobsthal.md` A11) **[CITED]** | `ρ_*(x; A) = inf_y ρ(x, y; A)` for general `A` | infimum over windows, the opposite quantifier | **NOT APPLICABLE** |
| Ford–Gabdullin 2025, *Long strings of consecutive composite values of polynomials*, Trans. AMS 378, 1261–1282 (zbMATH record; OpenAlex citer of FGKMT) **[SOURCED-BIB]** | lower bounds, `κ = 1` by Chebotarev on average (per `covering-dive.md` §2.3's reading of arXiv:2310.20449) | direction and dimension | **NOT APPLICABLE** |

### 3.3 Verdict for object 2

Clean negative in the owning conventions, with the query list in §1: no
theorem in print bounds from above the longest run of consecutive elements of
a sieved sequence that a band of primes with two classes each can cover, at
any exponent, other than through the sieve bound on the next level's gap,
which is the target. The literature holds the object under the names `Y(x)`,
"sieve out the whole interval", and the "third sieving stage", proves it long
(one class: Rankin through FGKMT; two classes: Kalmynin–Konyagin), states its
only upper bound as Iwaniec's `x²` beside a Maier–Pomerance conjecture, and
marks the per-prime load, the quantity `(R)` needs bounded, as a heuristic it
"cannot establish anything close to" (FGKT p. 3). The absence is searched in
the field's own vocabulary and is recorded per `research/SEARCH-CONVENTIONS.md`;
its expiry condition is a published upper bound on `Y`-type functions below
Iwaniec's, or a published upper bound on the maximal residue-class load of a
sifted set over stretches shorter than `p·(level)`. **[ABSENT]**

**Rows this note would add to `SEARCH-CONVENTIONS.md` §1, not applied under
the fence.** (a) For the kill-run: *"`Y(x)`, the largest `y` for which one may
select residue classes `a_p (mod p)`, one for each prime `p ≤ x`, which
together sieve out the whole interval `[y]`"* (FGKT Def. 1) and *"the third
sieving stage"* / *"each prime `p` sifts out `r` elements of `V`"*, with the
direction warning that everything under these names is a lower bound. (b) For
REC's full-level shadow: *"oscillation theorems for sifting functions"* and
*"the distribution of reduced residues in short intervals"*, with the warning
that the sup they bound is bounded BELOW.

---

## 4. Brief claims verified at the record, and the three that fail

Every number and formula in the brief was checked before use (rule 6).
**Hold:** `β₂ = 4.26645` (`SEARCH-CONVENTIONS.md` §4, twenty decimals at
`dhr-verification.md`); the REC statement, quantifiers, `H = z^{u₀}`,
`u₀ ∈ (2, β₂)`, `D = z^s` (`attack-0829n-rml-proof.md` §3); `N(s) = π(2s) − π(s)`,
`K*(16) = 17`, the two classes per entering prime, the weighting by
`maxsum` (`attack-0829n-doubling-bridge.md` §§2–3); "Opera de Cribro's
mean-square analogue is already known here" (`REFUTED.md`, row "Lemma V's
mean-square form", which names result 6.18 at `s ≥ 9`); Kowalski–Michel–Sawin
CLOSED (`REFUTED.md`, its own row); the Kalmynin–Konyagin import and its
direction (`two-class-lower-bounds.md` §4c). **Fail, none load-bearing:**

1. *"0 of ~75 candidates over two waves delivered a lowering theorem."* The
   record reads 21 attacks and 0 routes over the 08-19 and 08-27 import waves
   and 21 attacks and 0 routes on 08-28 (memory `primeoire-campaign-lessons`,
   2026-08-27 lesson 1 and 2026-08-28 lesson 1), plus 59 recon angles on 08-28
   (21 + 10 + 15 + 13 across the four `recon-0828-*` notes). "~75" matches no
   line; the direction of the claim (zero routes) is exactly right.
2. *"Bettin–Chandee … (see REFUTED.md rows)."* There is no Bettin–Chandee row.
   The name occurs inside the Kowalski–Michel–Sawin row only; its standing
   record is `SEARCH-CONVENTIONS.md` §1 (the vector-sieve row) and §3
   ("PRICED, not absent").
3. *"their §6.18 mean-square analogue."* The book's chapter 6 runs §6.1 to
   §6.10 ("Extremely Short Intervals", p. 80) per the AMS table of contents
   (§6); 6.18 is a numbered result, not a section, and the corpus's row writes
   it without the sign.

---

## 5. What would falsify this note, and whether that check ran

- **A published theorem bounding `sup_x` of a sieve remainder at level above
  the window against its rms, at any dimension.** Would falsify §2's negative.
  Ran: 22 object-1 queries on four calibrated channels (§1). Did not run: the
  arXiv full-text leg (the API indexes metadata), Google Scholar, MathSciNet
  review text, *Opera de Cribro* §6.10 and §13.4 at the page, and any
  non-English literature. A paper that never writes "short intervals",
  "reduced residues" or "sifting" in its abstract is invisible to this sweep.
- **A published two-class Maier theorem at fixed `u₀ ∈ (2, β₂)`.** Would turn
  §2.3's item 2 from OPEN to a full-level truth statement (still not REC).
  Ran: the `tuples`/`twin`/`irregularities` queries, zero relevant. Did not
  run: reading GS 2007 §6 ("further new examples") at the page for a
  two-class example; Hildebrand–Maier 1989 (review HTTP 502).
- **A published upper bound on `Y(x)`-type functions below Iwaniec's, or on
  the maximal residue-class load of a sifted set over stretches of length
  `≪ p·(level)`.** Would falsify §3.3. Ran: 20 object-2 queries plus the FGKMT
  forward walk (73 titles) and the Kalmynin–Konyagin citation count. Did not
  run: Semantic Scholar, Google Scholar, the Maier–Pomerance 1990 text beyond
  a grep for limit-of-method language (none found; the paper's own §1 was not
  read at the page).
- **An error in the producer.** Its self-checks (`ω(3)` closed form, `ω(2)`,
  the twelve-factor `P(37)`, monotonicity of the crossing in `ε`) pass (line
  161); the Buchstab asymptotic and the Montgomery–Vaughan ceiling are cited,
  not derived, and the crossing levels use Mertens for `P(z)` where the
  finite-`z` rows use the exact product. A reader who re-derives `ω(4)` and
  finds a deviation of order `10^{−3}` rather than `2.2e−6` would move the
  `(4, ε)` crossings down by roughly `3/ε` decades and change nothing else.
- **REC itself.** Nothing here bears on its truth. The corpus's falsifier
  list is `attack-0829n-rml-proof.md` §6 and is unchanged.

---

## 6. Sources, with what was actually read

| source | what was read | sha256 (16) |
|---|---|---|
| Granville–Soundararajan, arXiv:math/0406018v1 (Ann. of Math. 165 (2007) 593–635) | pp. 3–4 page image (Cor. 1.1, 1.2); pp. 6–7 text extraction (Cor. 1.3, 1.4, Example 5) | `f48c1a1187151b89` |
| Ford–Green–Konyagin–Tao, arXiv:1408.4505 (Ann. of Math. 183 (2016) 935–974) | p. 3 page image (Def. 1, Lemma 1.1, Thm 2, the `Y(x) ≪ x²` sentence, the third-sieving paragraphs) | `cb1fed1ba4bd9e56` |
| Ford–Green–Konyagin–Maynard–Tao, arXiv:1412.5029 (J. Amer. Math. Soc. 31 (2018) 65–105) | §1.2 and the theorem statements, text extraction | `6a2c86f06946315f` |
| Maynard, arXiv:1408.5110 (Ann. of Math. 183 (2016) 915–933) | grep for limit-of-method language only, text extraction; nothing quoted | `1b99c6e9d8cc3c8f` |
| Granville, arXiv:2010.01211 (Acta Arith. 205 (2022) 1–19) | pp. 2–3, 5–6 text extraction (Selberg's question, Cor. 1, Cor. 3, Prop. 2); hash equals `recon-0828-rough.md` §9's | `35a6aa6a7dac4b1a` |
| Gorodetsky, arXiv:2111.00853v3 (Math. Z. 308 (2024) Paper 59) | pp. 5–6 page image (§1.6.1 the Montgomery–Vaughan bounds, §1.6.2 FGHM Thm B1 as quoted); hash equals `recon-0828-rough.md` §9's | `069d1a4cd91db35c` |
| Aryan, arXiv:1302.2296v2 (Mathematika 61 (2015) 72–88) | pp. 4–5 page image (Remark 1.1, Lemma 1.2); p. 2 text extraction (Thm 0.1) | `4a45903af6c16715` |
| FKMPT, arXiv:1802.07604v4 (JEMS 23 (2021) 667–700) | grep only, text extraction; statements taken from `covering-dive.md` §2.3 | `f654a1bc16cffabe` |
| Hough, arXiv:1307.0874; BBMST, arXiv:1811.03547; KKL, arXiv:2212.01299 | grep for interval / multiplicity statements, text extraction; KKL Thm 3 quoted from the extraction | `9c7c3b7ba40fb954`, `9a1bcfe9f28b5e33`, `3a3b67b9780c0ba1` |
| Maier–Pomerance, Trans. AMS 322 (1990) 201–237, AMS PDF | grep for limit-of-method language, text extraction; nothing quoted | `5f715ebb96520be0` |
| *Opera de Cribro*, AMS Colloq. Publ. 57, table of contents (`bookstore.ams.org/pspdf/coll-57-toc.pdf`) | text extraction of the TOC only | `27d66be980804324` |
| zbMATH reviews: FGHM 1991 (Zbl 0724.11040), Maier 1985 (Zbl 0569.10023), Montgomery–Vaughan 1986 (Zbl 0591.10042), Pintz 1997 (J. Number Theory 63, 286–301, MR1443763), Granville–Pomerance 1990 (*On the least prime in certain arithmetic progression*, J. London Math. Soc. (2) 41, 193–200) | review text at the API record | — |
| locators written from memory and then verified at `mrlookup` or the arXiv API this session: FGKMT J. Amer. Math. Soc. 31 (2018) 65–105 (MR3718451); FGKT Ann. of Math. 183 (2016) 935–974 (MR3488740); Granville–Koukoulopoulos–Matomäki as the authors of arXiv:1205.0413 | bibliographic fields | — |
| mrlookup records | bibliographic fields only (§1) | — |

*(All fetched files live in the session scratchpad, not the repository.)*
