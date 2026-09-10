# Building the import map: what was searched, what was rejected, and at what verification level

<!-- ledger
id: Q-import-map-construction
status: ANSWERED
todo: none
question: What was searched, what was rejected, and at what verification level, in building IMPORT-MAP.md?
verdict: The reconnaissance record behind the map: candidates rejected with reasons (hypergraph containers for want of a supersaturation input; determinantal processes by a proof-level obstruction, the twin tile failing the pair inequality at d = 6), a per-attribution SOURCED / SOURCED-BIB / MEMORY ledger, and two results derived here and offered for adjudication.
-->

*Staging record, 2026-08-19. Companion to `research/IMPORT-MAP.md`, which is the
deliverable; this file is the reconnaissance record and holds the material the
map deliberately does not carry — the rejected candidates with their reasons,
the per-attribution verification level, and the proposed corrections to the
record. Nothing here is integrated into a live document. No script was written
and no number in the corpus was recomputed, with the two exceptions marked
DERIVED HERE in §4.*

**Calibration legend, used throughout.** **[SOURCED]** the statement itself was
read at a publisher page, an arXiv abstract page, or an authors' hosted full
text during this pass. **[SOURCED-BIB]** the bibliographic data was verified at
a publisher or registry record but the statement was not opened.
**[MEMORY]** written from memory and not reached at any source this pass. Every
attribution in `research/IMPORT-MAP.md` carries one of these, and §3 below is
the ledger.

---

## 0. Method

Seven reconnaissance lines ran in parallel, each briefed to name one importable
theorem per topic, state it, source it, and verify it at an authoritative level,
with an explicit instruction that text extraction from a secondary page is not
verification. None was allowed to grade a candidate; grading was done here,
against the five landed imports as the calibration set.

**The channel degraded partway through and the record should say so.** The
session's WebSearch budget was exhausted at 200 queries during the third line.
Two later lines therefore ran on the arXiv API, Crossref, publisher tables of
contents and direct fetches only. Three specific items did not reach
verification for that reason and are marked in §3: the Bohman–Holzman–Kleitman
and Barajas–Serra lonely-runner citations, and Janson's small-subgraph-
conditioning statement.

**Reading done before any search.** The five landed import records, the closure
index, the alternation lemma, the local-lemma wall address, the maximal law's
relocation, and the block-ladder closure. Two facts from that reading changed
the grading materially and are worth naming: `(L(v,y)+1)·m̄(T_v) = G₂(y#)`, so
the combined-block `L` is `G₂` in disguise and any row aimed at it is circular;
and `history/staging/attack-l1-residue.md`'s finding that the `L = 1` residue
count is the postulate in residue notation, which is the model for the
circularity column.

---

## 1. Rejected as VOCABULARY-ONLY

Twelve candidates. Each was carried far enough to name the theorem that would
have been imported, which is what makes the rejection reusable. Re-entry costs
new structural evidence, per the map's regrade rule.

| candidate | the theorem that would have been imported | why it is not a fit |
|---|---|---|
| Lovász theta and Delsarte LP bounds | Lovász, *IEEE Trans. Inform. Theory* 25 (1979) 1–7, the sandwich `α(G) ≤ θ(G) ≤ χ(Ḡ)` | θ relaxes a **packing** optimum. `G₂ − 1` is a **covering** optimum. Delsarte LP additionally wants an association scheme, and the residue-class incidence structure is not one |
| hypergraph containers | Balogh–Morris–Samotij, *JAMS* 28 (2015) 669–709; Saxton–Thomason, *Invent. Math.* 201 (2015) 925–992 | containers deliver counting and structure of independent sets, and an extremal conclusion only when fed an external supersaturation lemma. There is no independent-set formulation of the covered-interval question and no supersaturation input to feed it |
| three-distance theorem, continued fractions | Slater, *Math. Proc. Camb. Phil. Soc.* 63 (1967) 1115–1123 | the theorem is about a rotation orbit `{nθ}`. The positions whose partial sums fall in two fixed classes mod `p` are not an arithmetic progression and not a rotation orbit. The Ostrowski machinery has nothing to attach to |
| free probability | Voiculescu, *J. Funct. Anal.* 66 (1986) 323–346; asymptotic freeness, *Invent. Math.* 104 (1991) 201–220 | asymptotic freeness needs independent random matrices, unitary invariance and growing dimension. Holt and Rudd's `M_J` is one deterministic bidiagonal operator, and "duplicate then delete" is not a sum of two operators in a common tracial algebra |
| determinantal point processes | Soshnikov, *Russian Math. Surveys* 55 (2000) 923–975 | a **proof-level** obstruction, not a gap: a Hermitian determinantal measure has `P(i,j ∈ S) = K_ii K_jj − \|K_ij\|² ≤ P(i)P(j)`, so `g ≤ 1` at every pair. The twin tile fails this at its **first admissible separation, `d = 6`**, not at `d = 2` where `g` vanishes identically (mod 3 forces `6 \| d`): `g(6) = 6 ∏_{5≤p≤x}(1 − 4/(p−2)²)` reads 2.661728 at `x = 11` and never falls below 2.3812 at any level. The one-class analogue, the reduced residues, fails it at `d = 2` instead, with `g₁(2) = 2 ∏_{2<p≤x}(1 − 1/(p−1)²) = 1.3535` at `x = 11`. No Hermitian kernel can exist for either. The conclusion stands and the field has since re-entered the map as row 17, which closes it in both signs (`history/staging/import-repulsive.md` §1, §2, §5) |
| KPZ universality, last-passage percolation | Baik–Deift–Johansson, *JAMS* 12 (1999) 1119–1178; Johansson, *CMP* 209 (2000) 437–476 | the 1/3 exponent is produced by optimisation over exponentially many directed paths in two dimensions interacting with transversal wandering. A maximum of moving sums on a one-dimensional cyclic word is a maximum over `D` candidates with no path degrees of freedom. The measured 0.27–0.32 and the KPZ 1/3 are exponents of different objects, and matching the numerals is numerology |
| interval exchange transformations, Zorich deviation | Zorich, *ETDS* 17 (1997) 1477–1499; Forni, *Ann. of Math.* 155 (2002) 1–103; Avila–Viana, *Acta Math.* 198 (2007) | the theory does own anomalous Birkhoff-sum exponents `θ₂/θ₁` strictly between 0 and 1/2, which is the right shape. But the tile is a CRT cut-and-project object, not an IET orbit, and `θ₂/θ₁` has no closed form, so the theory permits an exponent near 0.28 and predicts nothing of the kind. Bounded-remainder-set theory (Kesten, *Acta Arith.* 12 (1966) 193–212) gives bounded rather than power-law deviation for the rotation models |
| `ℓ²` decoupling | Bourgain–Demeter, *Ann. of Math.* 182 (2015) 351–389 | the hypothesis is a positive-definite second fundamental form. A family indexed by moduli and additive frequencies has no curved manifold to decouple, and the `N^ε` loss would eat a `√log` saving even if it did |
| large sieve, Gallagher's larger sieve | Montgomery–Vaughan, *Mathematika* 20 (1973) 119–134; Gallagher, *Acta Arith.* 18 (1971) 77–81 | both are `ℓ² → ℓ²` devices, and the wall's address is `ℓ¹ → ℓ²`. Gallagher's larger sieve bounds the size of a set occupying few classes mod many primes, a different functional |
| combinatorics on words, Fine–Wilf and critical factorization | Fine–Wilf, *Proc. AMS* 16 (1965) 109–114 | Fine–Wilf constrains when two sequences of periods `h`, `k` must coincide. It says nothing about a **union** of periodic sets, whose only period is the lcm. Applied pairwise it gives `p + q` and iterated it gives `x#`, which is vacuous at the scale that matters |
| small subgraph conditioning | Janson, *Combin. Probab. Comput.* 4 (1995) 369–405 | definitionally about a random model: it needs joint Poisson limits of auxiliary counts and a second-moment ratio. `G₂` is a **maximum over adversary choices**, and the whole difficulty lives in the atypical adversary that an average-case method cannot see |
| polynomial method on the grid | Alon–Füredi, *European J. Combin.* 14 (1993) 79–83 | the killed set is a union of coordinate slabs restricted to a diagonal line through the CRT box, and the line fills the box only once `H ≈ x#`, far past the range of interest |

**Two of these were my own proposals and both were killed by reconnaissance, which
is the outcome the process is for.** KPZ was proposed here on the strength of
`0.27–0.32` sitting near `1/3`; the Zorich deviation spectrum was proposed as the
theory that owns anomalous exponents in `(0, 1/2)`. Both fell to a structural
objection rather than to a search negative.

---

## 2. What was searched, by convention

Search was run in the owning convention rather than in house vocabulary, per
`research/SEARCH-CONVENTIONS.md`. The conventions used, and the outcome:

| object | convention searched | outcome |
|---|---|---|
| `maxsum_m`, the maximum of a moving sum | **scan statistic**; **MOSUM** | the owning convention exists (Glaz, Naus and Wallenstein, *Scan Statistics*, Springer 2001) and is absent from this corpus, per `research/SEARCH-CONVENTIONS.md` §1, which carries no row for it. A theorem statement was not reached; the channel was exhausted |
| the alternation-legal window | **constrained system**, **(d,k)-RLL**, **sofic shift** | capacity theory bounds the count of legal words and not the length of the longest window. No theorem bounding the longest word of a sofic shift that is also a factor of a given periodic word was located, per `research/SEARCH-CONVENTIONS.md`, and the reconnaissance line called that a genuine gap rather than a search failure |
| the local lemma's feasible region | **Shearer's region**, **independent-set polynomial**, **hard-core lattice gas** | found and verified. Scott–Sokal is the equivalence, and Shearer's tightness is the decisive clause |
| an `ℓ¹ → ℓ²` bound with a log saving over moduli | **bilinear forms with Kloosterman fractions**; **large sieve**; **decoupling**; **Weil/Deligne bounds** | one family only: the spectral route through the Kuznetsov formula. Four conventions were searched and three were excluded by a named hypothesis |
| covering an interval by classes, one or two per prime | **Jacobsthal's function**; **Erdős covering systems**; **view obstruction** | all three already in the corpus (`research/covering-dive.md`, `research/PRIOR-ART.md`), except view obstruction, which is new here and is map row 12 |
| deviation exponents of partial sums of primorial-coprime gaps | **bounded remainder sets**; **deviation of Birkhoff sums**; **distribution of reduced residues** (Hooley; Montgomery–Vaughan) | negative on every channel. Hooley and Montgomery–Vaughan own the **distribution** of these gaps; the reconnaissance line found nothing owning the correlation or deviation exponent of their partial sums, per `research/SEARCH-CONVENTIONS.md` |
| complexity of the covering optimum | **covering systems**, **NP-hardness of covering by residue classes** | one near-neighbour found and it is new to this corpus: see §4 |

---

## 3. The verification ledger

**Read at an authoritative source this pass, statement included [SOURCED].**
Moser–Tardos Theorem 1.2 and its variable-model setup, quoted verbatim from
arXiv:0903.0544v3. Scott–Sokal's equivalence, quoted verbatim from
arXiv:cond-mat/0309352, with the *J. Stat. Phys.* 118 (2005) 1151–1261 record.
Shearer's criterion and tightness as stated and proved in Scott–Sokal Theorem
4.1. Harvey–Vondrák's lopsided-association condition, verbatim from
arXiv:1504.02044. Regts, *PTRF* 186 (2023) 621–641 (arXiv:2111.04809). Spencer's
abstract, verbatim, from the publisher-deposited record for *Trans. AMS* 289
(1985) 679–706. Bourgain–Demeter's curvature hypothesis, verbatim, from the
*Annals* 182 (2015) 351–389 record. Montgomery–Vaughan's large sieve and the
Selberg and Gallagher constants, read in Montgomery's *Bull. AMS* 84 (1978)
547–567 survey full text. Nemhauser–Wolsey–Fisher, Fisher–Nemhauser–Wolsey,
Călinescu–Chekuri–Pál–Vondrák and Wolsey's submodular-cover guarantee, all four
read at their publisher pages. Cambie, arXiv:2508.18270, at the arXiv abstract
page. Bayati–Gamarnik–Tetali's hypotheses, from arXiv:0912.2444 full text with
the *Ann. Probab.* 41 (2013) 4080–4115 record. Balogh–Morris–Samotij and
Saxton–Thomason at Crossref and Springer. Slater at Cambridge Core. Soshnikov at
Math-Net.Ru. Fine–Wilf Theorem 1, verbatim, from the AMS full text.
BBMST Theorem 1.1, verbatim, from the arXiv PDF with the *Invent. Math.* 228
(2022) 377–414 record at Springer. Hough's Theorem 1, verbatim, from the
*Annals* PDF. Zorich at Cambridge Core; Forni at the *Annals* page; Avila–Viana
at Project Euclid. Kesten at the IMPAN table of contents. Flajolet–Sedgewick
Theorem VI.3, Theorem VI.1, Definition VI.1 and Proposition V.2, all verbatim,
from the authors' hosted `ch4567.pdf`. Berman, *Ann. Math. Statist.* 35 (1964)
502–516, at Project Euclid. Gordon–Schilling–Waterman, *PTRF* 72 (1986) 279–287,
at Springer. Talagrand's convex distance inequality and the certifiable-function
corollary, verbatim, from Bruhn–Joos arXiv:1504.02583 Theorems 8 and 10, which
cite Molloy–Reed p. 234 and Talagrand IHÉS 1995 directly.

**Bibliographic data verified, statement not opened [SOURCED-BIB].** Shearer,
*Combinatorica* 5 (1985) 241–245: the DOI resolves and the reference is
verbatim in Scott–Sokal, but Springer redirected to authentication and zbMATH
returned 403, so Shearer's own text was not read. Beck–Fiala, *Discrete Appl.
Math.* 3 (1981) 1–8: record verified, `disc ≤ 2t−1` not opened. Banaszczyk,
*RSA* 12 (1998) 351–360: record verified, statement taken from the peer-reviewed
Dadush–Garg–Lovett–Nikolov and Bansal–Dadush–Garg papers. Lovász, *IEEE Trans.
Inform. Theory* 25 (1979) 1–7: via the Semantic Scholar record of the publisher
DOI, since IEEE Xplore returned 418 and 403. Lind–Marcus, CUP 1995, ch. 4, pp.
99–135: chapter, pages and content verified at Cambridge Core; **the theorem
number was not**, and one citing paper numbers it 4.3.3 in the 2021 edition
against 4.3.1 in the first, so it must be confirmed against a copy before being
quoted. Arratia–Goldstein–Gordon, *Ann. Probab.* 17 (1989) 9–25: abstract read
at Project Euclid, the `b₁`, `b₂`, `b₃` formulas and the constant 1.4 not.
Barbour–Holst–Janson, OUP 1992: ISBN and extent verified, no table of contents
surfaced. Leadbetter–Lindgren–Rootzén, Springer 1983: the `D`/`D′` conditions and
the extremal index were read verbatim from two independent full-text secondary
sources, and the **book's own theorem numbers were not verified**.
Deshouillers–Iwaniec, *Invent. Math.* 70 (1982) 219–288, and
Bombieri–Friedlander–Iwaniec, *Acta Math.* 156 (1986) 203–251: DOIs verified,
statements not opened. Pippenger–Spencer, *JCTA* 51 (1989) 24–42: Crossref
verified. Cusick, *Aequationes Math.* 9 (1973) 165–170: Crossref verified.
Janson, *CPC* 4 (1995) 369–405: Cambridge Core record and abstract read, the
theorem statement not, because the downloaded PDF is image-only.
Kolipaka–Szegedy, STOC 2011, DOI 10.1145/1993636.1993669: via dblp and a citing
peer-reviewed abstract, not the publisher page. Voiculescu 1986 and 1991,
Crossref only. Iwaniec, *Demonstratio Math.* 11 (1978) 225–231: multiple
secondary sources, publisher page not reached, and the corpus already carries
this citation independently.

**Named from memory, not reached at any source this pass [MEMORY].** Every one
of these is flagged because a memory-sourced attribution has cost this project
a correction before. Shannon's 1948 capacity theorem as "Theorem 1" of Part I of
the BSTJ paper. The `cap(S) = log λ(A_G)` formula at the
Marcus–Roth–Siegel page level: their chapter was fetched and its definition of
`cap(S)` confirmed, but the custom font encoding defeated recovery of the
theorem number and its verbatim statement. The sofic, right-resolving version of
the Lind–Marcus entropy theorem, which is the version an alternation-legal
language actually needs. Guerra–Toninelli, *CMP* 230 (2002) 71–79. The
Hough–Krishnapur–Peres–Virág determinantal reference. The exact-variance
identity `Var(S_m) = σ²m^{2H}` for fractional Gaussian noise at page level, and
the Mandelbrot–Van Ness *SIAM Review* 10 (1968) 422–437 attribution.
Denjoy–Koksma's inequality as a displayed formula, with Herman, *Publ. Math.
IHÉS* 49 (1979) 5–233 verified at Numdam only as a volume. Sós 1958 and Surányi
priority for the three-distance theorem. Hooley's sequels II and III and their
moment bounds. Montgomery–Vaughan's *Ann. of Math.* 123 (1986) 311–333 content,
the volume and pages being verified but the *Annals* publishing no abstract.
Banaszczyk's literal `5√(log n)` phrasing. Beck–Fiala's `2t−1`.
Bohman–Holzman–Kleitman and Barajas–Serra on the lonely runner. Janson's
small-subgraph-conditioning statement. Avila–Viana's page range 1–56. The
Molloy–Reed theorem number, since the quoting paper cites by page.

**One published correction found, and it touches the corpus's own citation
practice.** The large sieve inequality with `A = N + δ^{-1}` is
Montgomery–Vaughan, *"The large sieve"*, *Mathematika* 20 (1973) 119–134. The
*J. London Math. Soc.* (2) 8 (1974) 73–82 paper of the same authors is
*"Hilbert's inequality"* and carries the individually-spaced refinement, a
different statement. Anyone citing the 1974 paper for the large sieve is citing
the wrong one of the two.

---

## 4. Two things derived here, and offered for adjudication

Neither is a literature finding and neither is asserted in
`research/IMPORT-MAP.md` as a result. Both are one-line arguments, written out
so a second reader can kill them cheaply.

**(a) The tile's autocovariances sum to exactly zero, so `σ√m` is impossible at
the top of the range. DERIVED HERE, not adjudicated.** Let `g_0..g_{D−1}` be the
cyclic gap word with `Σ g_i = W` and `m̄ = W/D`, and let
`γ(k) = (1/D) Σ_i (g_i − m̄)(g_{i+k} − m̄)`. Then

> `Σ_{k=0}^{D−1} γ(k) = (1/D) Σ_i (g_i − m̄) · Σ_k (g_{i+k} − m̄) = 0`,

since the inner sum is `W − D·m̄ = 0` for every `i`. Autocovariances summing to
exactly zero force `Var(S_m)/m → 0`, so the moving-sum standard deviation is
sub-diffusive in `m` as a matter of identity rather than of measurement, and the
law `maxsum_m = m·m̄ + σ√(2m ln D)` cannot hold with a single `σ`. This agrees
with the measured exponents 0.2661, 0.2804, 0.3001, 0.3216 of
`history/staging/import-chaining.md` §5, and it is the reason the two
reconnaissance lines disagreed about the destination of the drift: the exponent
is not heading for 0.5, and it is not fixed either, because `Var(S_D) = 0`
exactly. **Consequence for TODO 0c: fit `H` as a function of `D` and `m`, and do
not quote one number.** The definitions here are `import-chaining.md` §5's own;
if TODO 0c's `σ` and `D` are defined otherwise the arithmetic moves.

**(b) The constant-factor certificate for `G₂` cannot fire. DERIVED HERE.**
Coverage of `[1, L]` is monotone submodular and "one pair per prime" is a
partition matroid, so a `(1 − 1/e)` guarantee would certify `[1, L]` uncoverable
whenever an algorithm's coverage falls below `0.632 L`, and that would turn the
greedy oracle into a certified upper bound past `x = 79`. It cannot: the
achievable coverage of a long interval is `1 − ∏_{3≤p≤x}(1 − 2/p)`, computed
here as 0.666667, 0.800000, 0.857143, 0.883117, 0.901099 at `x = 3, 5, 7, 11,
13` and 0.959010 at `x = 79`. It is above 0.632 at every level from `x = 3`, so
the test never fires. The structural statement is worth keeping: the covering
question asks to distinguish 100% from 98%, and no constant-factor approximation
guarantee can see that difference.

---

## 5. Corrections and additions to the record

Proposals only. No live document was edited by this pass.

1. **`research/SEARCH-CONVENTIONS.md` §1 gains four rows.** For `maxsum_m`, the
   owning convention in probability is **scan statistic** and in change-point
   analysis **MOSUM** (Glaz, Naus and Wallenstein, *Scan Statistics*, Springer
   2001); the existing `π_min(m,k)` row is the number-theory convention for the
   one-class object and does not reach the probabilistic literature. For the
   alternation-legal window and the per-fold `L`, the owning convention is
   **constrained system / (d,k)-RLL / sofic shift** (Lind–Marcus, CUP 1995;
   Marcus–Roth–Siegel). For the local lemma's feasible region, it is
   **Shearer's region** and **the independent-set polynomial's zero-free
   polydisc** (Scott–Sokal). For the adversarial-shift covering object, it is
   **the density of the uncovered set** (BBMST), which `covering-dive.md`
   already carries but `SEARCH-CONVENTIONS.md` §1 does not.
2. **A new near-neighbour Erdős problem: #278.** `covering-dive.md` §2 records
   the complete sweep that found `Jacobsthal` in exactly #687 and #970, and
   `TODO.md` parks #689. Cambie, arXiv:2508.18270, *"Proving it is impossible;
   on Erdős problem #278"*, adds a fourth: Erdős and Graham asked for the
   minimum density missed by one chosen residue class per modulus from a
   prescribed list, and Cambie proves that for binary-encoded lists with
   repetitions allowed, deciding whether the minimum is zero is **NP-hard**.
   That is not this corpus's problem — one class per modulus, repetitions
   allowed, density rather than interval length — but it is the closest
   complexity statement in print and it belongs in `covering-dive.md` §2 and in
   `PRIOR-ART.md`.
3. **`research/PRIOR-ART.md` gains a complexity line, with its absence
   qualified.** No NP-hardness or inapproximability result for the two-class
   Jacobsthal problem was located, searched in the covering-systems convention
   per `research/SEARCH-CONVENTIONS.md` §1; #278 above is the nearest published
   statement.
4. **BBMST is the clean replacement citation wherever FKMPT is load-bearing.**
   BBMST reprove the relevant FKMPT conclusion by an independent and simpler
   route and separately answer FKMPT's `Σ 1/d_i < C` question in the negative.
   `history/staging/verify-fkmpt-corrigendum.md` already resolved the corrigendum
   alarm; this is a citation-hygiene note rather than a live risk.
5. **A citation correction, if the large sieve is ever cited here.** See the end
   of §3: the `A = N + δ^{-1}` large sieve is Montgomery–Vaughan *Mathematika*
   20 (1973), not the *JLMS* 1974 "Hilbert's inequality" paper. The corpus
   currently cites Montgomery–Vaughan only for reduced-residue distribution
   (*Ann. of Math.* 123, 1986), which is a third paper and is cited correctly.
6. **`research/TODO.md` item 0c should carry the derivation in §4(a).** The
   `√m` factor is not merely disputed by measurement; there is a one-line
   identity that forbids it at the top of the range. That changes the item's
   first move from "check the definitions" to "fit `H` as a function of `D` and
   `m`", if the identity survives a second reader.

---

## 6. NOT REACHED

- **No experiment was run.** Every row in `research/IMPORT-MAP.md` is UNTRIED,
  including the two that are pre-priced dead. The map is a plan, and the five
  landed rows are the only evidence in it.
- **Three attributions did not reach verification because the search channel was
  exhausted**: Bohman–Holzman–Kleitman and Barajas–Serra on the lonely runner,
  and Janson's small-subgraph-conditioning statement. All three are marked
  [MEMORY] in §3 and none is load-bearing.
- **Achlioptas–Iliopoulos, *JACM* 63 (2016) art. 22, was not priced.** Their
  abstract claims a framework that works when the underlying state space is
  entirely unstructured, which if true would be the one member of the
  algorithmic local-lemma family that Shearer's tightness does not obviously
  dispose of. Their main theorem's hypotheses were not opened. This is the
  single largest unresolved question in the map's row 10.
- **The scan-statistics literature was not read.** The owning convention was
  identified and a theorem statement was not reached. Map row 1's experiment
  should begin there rather than with the Leadbetter machinery.
- **Shearer's own paper was not read**, only its statement as developed in
  Scott–Sokal. The tightness clause is load-bearing for row 3's closure of the
  algorithmic local-lemma family, and it should be read at source before that
  closure is written into `REFUTED.md`.
- **No prior-art search was run on the map itself**, meaning on whether anyone
  has published the identification of the alternation lemma with a sofic shift,
  or of `maxsum_m` with a scan statistic. Both are natural enough that they may
  be in print, and neither was searched, per `research/SEARCH-CONVENTIONS.md`.
