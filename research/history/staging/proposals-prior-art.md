# Prior-art risk for the paper-proposals registry

<!-- ledger
id: Q-proposals-prior-art
status: ANSWERED
todo: none
question: What is the prior-art risk for the six candidates in the paper-proposals registry?
verdict: None is clean: three are ADJACENT with the boundary drawn Holt-style (one of them breaking a sentence the corpus rests on), the thinning null is PRIOR ART FOUND under Hawkins' random sieve with the Fold Moment Identity NOT FOUND, and only the reverse-direction Suen import reads NOVEL-SO-FAR; every verdict names what was not searched.
-->

*Staging report, 2026-08-19. Search-status and per-proposal risk verdicts for the
six candidates being written up in `paper/proposals/`. **This file edits no live
document and writes nothing into `paper/proposals/`.** Verdicts are
**NOVEL-SO-FAR** (with the conventions named), **PRIOR ART FOUND** (with the
artifact that was read), or **ADJACENT** (with the boundary drawn Holt-style).
Every verdict names what was NOT searched. `research/SEARCH-CONVENTIONS.md` §1
governs: a clean negative in our own vocabulary is worth nothing.*

---

## 0. Channels, calibration, and what was actually read

| channel | calibration run in this session | result |
|---|---|---|
| arXiv API (`https` only) | `au:"Fred_B_Holt"` | 19 entries, 15 of them the prime-gaps programme |
| OpenAlex | `search=Bilinear forms with Kloosterman fractions` | `W2075483325`, DFI 1997, first hit |
| Semantic Scholar graph | `New versions of Suen's correlation inequality` | Janson 1998, 99 citations |
| Zenodo API | record `18509488` | full metadata + PDF |
| WebSearch / WebFetch | known positives returned throughout | live |

**Provenance.** Fifteen Holt / Holt–Rudd PDFs were downloaded from arXiv and
converted with `pdftotext -layout` for *scanning*; the load-bearing passages were
then **read as page images** (`pdftoppm`), because text extraction is not
reading. Page images read: **arXiv:1408.6002v1 pp. 25–26**, **arXiv:2502.20470v3
p. 5**, **arXiv:2605.19165v1 p. 11**. Two further PDFs were downloaded and read
in text: **Rivoal, *J. Théor. Nombres Bordeaux* 20 (2008) 799–809** (the JTNB
published PDF) and **Ojaroudi, Zenodo 18509488**. Everything else is an
authoritative abstract page (arXiv `/abs`, Project Euclid `.full`, author page)
and is marked as such; anything reaching me only through a subagent is marked
**[second-hand]** and is not to be quoted as verified.

---

## 1. Exact fold-L / alternation word statistic — **ADJACENT**

*(`attack-foldL-01-census.md`, `attack-foldL-02-bridge.md`: the
channel-compatibility lemma, the Alternation Lemma, and the run ceilings
LR / LP / LV / LVP.)*

**The adjacent territory is Holt's, and it is closer than the corpus records.**

**(a) The compatibility lemma is the two-class form of a published one-class
lemma.** arXiv:2502.20470v3 (Holt alone, 2025), §3, printed p. 5, **read as a
page image**:

> **Lemma 2.** *Let s = g₁g₂ … g_J be a constellation of length J. In step R3 of
> creating 𝒢(p^#), the fusions at γ_i and γ_j occur in the same image of s iff p
> divides the span |γ_i − γ_j| = Σ_{i+1}^{j} g_ι.*

Our lemma (`attack-foldL-01-census.md` §1) is that statement in the twin comb's
two classes: `g ≡ 0 (mod p′)` admits (A,A) and (B,B), `g ≡ −2` admits (A,B),
`g ≡ +2` admits (B,A). One class gives `p | span`; two classes give
`span ≡ 0, ±2`. **The mechanism is his. The ±2 branch, and the alternation it
forces, have no one-class counterpart.** The same page carries the multiplicity
parameter angle 3 reinvents: *"For a constellation s of length J the parameter
ν_p(s) is the number of residue classes mod p covered by any instance of s, with
1 ≤ ν_p(s) ≤ min{p, J+1}"*, and *"There are p − ν_p(s) admissible instances γ₀
for s, modulo p."*

**(b) The "L = 1 eventually" threshold is published, at `|s|/2`.**
arXiv:2605.19165v1 (Holt, 18 May 2026 — **a paper the corpus's fourteen-row Holt
sweep table does not list**), printed p. 11, **read as a page image**:

> *"We mark the thresholds J + 1 = 459 and |s|/2 = 1620 in the graph. … The
> second threshold marks the point – half the span of the constellation – at
> which all fusions of adjacent gaps must occur in separate images of s under
> the 3-step recursion."*

That is `L = 1 once p > |s|/2`, in print. For a window of span `Y` it is the
trivial ceiling (`p > Y/2`), and our census works two to seven orders of
magnitude below it — but it is the published ancestor of every "runs die once p
is large enough" sentence and must be cited as such.

**(c) What is NOT in Holt: the run itself.** All fifteen prime-gaps manuscripts
were scanned for `consecutive fusion`, `successive closure`, `adjacent
closures`, `run of fusions`, `longest run`, `multiple fusions`, `maximum number
of fusions`. **No statistic counts how many fusions land on consecutive slots,
and nothing bounds such a count.** Holt's coincidence bookkeeping is
`(J+1) − ν_p(s)`, the number of fusion coincidences in an instance, and it is
blind to whether the coinciding fusions are *adjacent in the gap word*. The
ordered-word ceilings LR, LP, LV, LVP and the Alternation Lemma's `6p` pair floor
have no counterpart there.

**Non-Holt conventions searched, all clean:** "consecutive fusions"; "gap
merging" under wheel/primorial sieves; Erdős–Rényi longest-run laws in arithmetic
settings; "runs of consecutive integers eliminated by the same prime"; the
Costello–Watts `π_min(m,k)` convention already in `SEARCH-CONVENTIONS.md` §1; and
**Ziller–Morack arXiv:1611.03310** (downloaded and scanned — its `ψ_min(m,k)` and
`ν_max(m,k)` count *total* deletions in `m` consecutive integers, never a run in
the surviving word).

**Verdict: ADJACENT.** Cite 2502.20470 Lemma 2 for the compatibility mechanism
and 2605.19165 p. 11 for the `|s|/2` threshold. The run statistic, the
alternation constant `6p`, and the four ceilings are not in the literature found.

**NOT searched:** Holt's self-published *Patterns among the Primes* (2022) beyond
the four proxies the corpus already read; the `Primegaps-v2` notebooks for an
unpublished run statistic; combinatorics-on-words literature on runs in Toeplitz
words specifically; non-English sources.

---

## 2. Tail-Count Transport — **ADJACENT, and it breaks a sentence the corpus rests on**

*(`attack-foldL-03-transport.md` §1: `N_new(θ) ≤ (q−2)·N(θ) + 2·Σ_{L≥1} Q_L(θ)`,
from the multiplicity bounds `ν_q(i,0) ≤ q−2` and `ν_q(i,L) ≤ 2`.)*

**The `(q−2)` multiplier, carried through the regime where fusions may collide,
has been in print since 2014 — as an identity, not an inequality.**
arXiv:1408.6002v1 (Holt and Rudd), §6.1, printed **p. 26**, **read as a page
image**. The statement it proves sits on p. 25: *"**Corollary 6.3.** Let g be a
gap. If for the prime q, q ∤ g, then Σ w_{g,j}(qN) = Σ w_{g,j}(N)."* The proof:

> *"If the condition g < 2p_{k+1} applies, then each of the closures occur in a
> separate copy of s … For the current result we do not know that the closures
> necessarily occur in distinct copies of s, and so we can't be certain of the
> lengths of the resulting constellations.*
>
> *However, we do know that of the q copies of s, two are eliminated as driving
> terms and q − 2 remain as driving terms of various lengths.*
>
> *Σ_j n_{g,j}(qN) = (q − 2) Σ_j n_{g,j}(N)."*

and Figure 4, p. 25: *"In the general dynamic system, when the condition
g < 2p_{k+1} may not be satisfied, the interior closures may not occur in
distinct copies of the constellation. However, the two exterior closures still
remove two copies from being driving terms for g."*

> ### CORRECTION REQUIRED IN `research/PRIOR-ART.md`
> The block headed "THE NOVELTY BOUNDARY, drawn sharply" says of Holt: *"his
> machinery is bounded by |s| < 2p1 throughout, which is exactly the regime a
> maximum gap leaves."* **That is false.** §6 of 1408.6002 is built precisely to
> leave that regime and says so in its own text, and 2605.19165 Lemma 2 (p. 10)
> runs population dynamics with `ρ_s = q − ν_q(s)` past `|s|/2` as well. Fix the
> sentence before any proposal cites it. This is a boundary correction, not a
> demotion of the transport.

**What remains ours, drawn precisely.** Holt's object is `Σ_j n_{g,j}`, the
population of driving terms of a *fixed sum g* summed over lengths, in the
one-class cycle, used to extract asymptotic *ratios* `w_{g,j}(∞)`. Ours is
`N(θ) = #{i : g_i ≥ θ}`, a **tail** count over a threshold, in the two-class
comb, stated as an **inequality with an explicit run-correction term**
`2Σ_L Q_L(θ)`, and used as a **certificate** that `G₂(x′#) < x′²`. Holt converts
no population identity into a bound on a maximum gap anywhere.

**Section list of arXiv:2603.25915v1, checked for anything transport-shaped:**
§1 Evolution of populations of constellations in 𝒢(p^#); §2 Estimating survival
through the sieve; §3 The quadratic density of constellations (3.1 η
non-decreasing, 3.2 g₃/p_k, 3.3 δ_s, 3.4 samples of short constellations); §4
Discussion of expected survival (4.1 Legendre, 4.2 future directions).
**Nothing is an inequality on tail counts.** §2 is a first-moment survival
estimate resting on Conjecture 2.1, the approximate-uniformity conjecture the
corpus already flags.

**B-free / Toeplitz side: NOT FOUND.** Searched "B-free numbers gap tail bound
transfer operator", "gaps between B-free / squarefree numbers upper bound
recursion", and the Filaseta–Trifonov squarefree-gap convention. That literature
bounds gaps on a *fixed* set by exponential-sum and divisor methods; **nobody
there iterates a level-to-level inequality on gap counts.**

**Verdict: ADJACENT.** Cite 1408.6002 Corollary 6.3 and Figure 4 (pp. 25–26) as
the one-class ancestor of the multiplier and of the "collisions do not break the
count" argument, and 2502.20470 §3 for `ν_p(s)`. The tail-count form, the
inequality, the run term and the certificate use are not found.

**NOT searched:** Holt's GitHub notebooks; any transport inequality in the
covering-systems literature; the point-process correlation literature, which is
handled in §3 below rather than here.

---

## 3. Thinning null + Fold Moment Identity — **PRIOR ART FOUND (the null); NOT FOUND (the identity)**

*(`import-thinning.md`. The note flags its own renewal attributions as
memory-sourced and says no owning convention was identified. One now is, and it
is the highest-risk finding in this report.)*

### 3a. The null model — PRIOR ART FOUND, and the owning convention is "Hawkins' random sieve"

**A sieve run as iterated independent thinning, with exactly geometric gaps at
every stage, has been in print since 1957 and formalised since 1979.** Read at
source: Tanguy Rivoal, *On the distribution of Hawkins' random "primes"*,
**J. Théor. Nombres Bordeaux 20 (2008) 799–809**, the published JTNB PDF
downloaded and read, p. 800:

> *"Hawkins [5, 6] wondered what would be the behavior of the following random
> version of Erathosthenes' sieve. Let A₁ be the set of integers ≥ 2, set p₁ = 2
> and delete independently the elements of A₁ \ {p₁} with probability 1/p₁.
> Denote A₂ the set of the remaining integers and by p₂ the smallest element of
> A₂ which is > p₁ and delete independently the elements of A₂ \ {p₁, p₂} with
> probability 1/p₂ and so on."*

and pp. 800–801, the Neudecker–Williams formalisation:

> *"The latter noticed that (p_n, m_n; F_n)_{n≥1} is a markovian process for the
> natural filtration F_n = σ(p_k, k = 1, …, n) defined by p₁ = 2, m₁ = 2 and*
> *P(p_{n+1} − p_n = j | F_n) = (1/m_n)(1 − 1/m_n)^{j−1} for all integers j ≥ 1
> and n ≥ 1."*

**That is our NULL LAW.** `import-thinning.md` §1.2 states *"Under independent
thinning the gap word of T_x has P(κ = k) = (1/α)ρ^{k−1}, ρ = 1 − 6/m̄, exactly,
at every level."* Neudecker–Williams (1979) have exactly that, one class per
prime, with `m_n` in place of `α`. Our version differs only in the deletion rate
(two classes, `2/p`, hence `α = Π q/(q−2)` rather than `Π q/(q−1)`).

**The corpus carries none of this: `Hawkins`, `Wunderlich`, `Neudecker`,
`random sieve` all return zero across the whole repository.** The tradition also
already contains a random twin-prime theorem — Rivoal p. 801 records Wunderlich's
*"# {1 ≤ k ≤ n : p_{k+1} − p_k = 1} ∼ n/log(n) a.s."* — and Bui–Keating on
bounded gaps, and Lorch's generalised random sieve. **This is an owning
convention for a whole branch of the corpus's framing, not just for this note.**

### 3b. The Möbius group law — PRIOR ART FOUND in substance, under other words

John Bunge, *Composition semigroups and random stability*, **Ann. Probab. 24
(1996), no. 3, 1476–1489**, DOI 10.1214/aop/1065725189. Abstract read at Project
Euclid, verbatim in part: *"These N-divisible and N-stable random variables arise
in a variety of stochastic models, **including thinned renewal processes** and
subordinated Lévy and stable processes."* The paper's subject is the
**composition semigroup of probability generating functions**; its Example 1 with
γ = 1 is reported [second-hand, from the Project Euclid PDF read by a subagent;
I could not fetch that PDF myself] to give `g_{ℓ,t}(s) = e^{−t}s/(1 − (1−e^{−t})s)`,
which is our `M_α` with `α = e^{t}`, so `M_a ∘ M_b = M_{ab}` is his semigroup
law. **Treat §1.2's group law as a re-derivation and cite Bunge.** The
`pgf-Möbius` phrasing and the two-sided *group* (as against semigroup) framing
were not found in print; that is a phrasing, not a theorem.

The classical thinned-renewal statement itself was verified [second-hand] against
two reachable sources — Gorenflo–Mainardi, *The Mittag-Leffler function in the
thinning theory for renewal processes*, Theory Probab. Math. Statist. 98 (2018)
100–108 (arXiv:1808.06563), whose eqs. (2) and (4) give
`g̃_q(s) = q f̃(s)/(1 − (1−q)f̃(s))` and attribute the approach to **Gnedenko and
Kovalenko (1968)**; and Sandhya, *On geometric infinite divisibility, p-thinning
and Cox processes* (arXiv:1409.5948) §3. **Daley–Vere-Jones was NOT reached** —
no section number was obtained, so `import-thinning.md` §1.1's attribution
remains unverified at that source and should be re-pointed at Gnedenko–Kovalenko
via Gorenflo–Mainardi, or at Bunge.

### 3c. The Fold Moment Identity and `Ψ − Φ²` — NOT FOUND

No published identity of the shape "adjacent-gap joint exponential moment minus
the square of the marginal moment" was located for B-free numbers, reduced
residues or any sieved set. Boundary, precisely: **the marginal side is studied
and the pair side is explicitly excluded.** Cohen et al., *Gaps Between
Consecutive Primes and the Exponential Distribution*, Experimental Math. 34
(2025) no. 2 [second-hand], studies exponential-family moments of prime gaps and
states *"This stochastic model of the primes and gaps intentionally omits the
discreteness of integers and the lack of independence of primes."*
Kurlberg–Rudnick's Poissonian m-level correlations for quadratic residues are a
zero-correlation limit, not a finite adjacent-pair identity, and were **not
opened at source**. Hooley and Montgomery–Vaughan 1986 own the reduced-residue
spacing conventions and were **not reached**.

**Verdict: PRIOR ART FOUND for the null model and the group law; NOT FOUND for
the Fold Moment Identity.** This candidate must be rewritten, not merely
annotated: its §0 headline sentence *"The fold recursion is an exactly solvable
thinning, and its null model is the geometric law"* is Hawkins–Neudecker–Williams
with a different deletion rate.

**NOT searched:** Daley–Vere-Jones, Cox–Isham, Rényi 1956/1976, Steutel–van
Harn, Klebanov–Maniya–Melamed at source; the Hawkins literature itself beyond
Rivoal's survey (Hawkins 1957/1974, Wunderlich, Neudecker–Williams 1979,
Bui–Keating, Lorch are all known only *through* Rivoal); whether any Hawkins
paper carries a two-class variant; MathSciNet review text; non-English (Russian
rarefaction school).

---

## 4. Suen import, reverse direction — **NOVEL-SO-FAR**

*(`import-suen.md` §11 already ran sieve → probability: full texts of FGKMT
1412.5029, FGKT 1408.4505, Maynard 1408.5110, FKMPT 1802.07604 and Banks–Ford–Tao
1908.08613, zero occurrences of Janson, Suen, local lemma or FKG. The unsearched
direction was probability → number theory.)*

**The citation graph was walked outward from Suen and Janson — the
reverse-citation move `SEARCH-CONVENTIONS.md` §2 prescribes.**

- **OpenAlex**, works citing `W1971079746` (Janson, *New versions of Suen's
  correlation inequality*, RSA 13 (1998)), `W4254821717` (its duplicate record)
  and `W1980948271` (Suen 1990): **97 distinct citing works, of which exactly two
  are number-theory-flavoured** — *Upper tails for arithmetic progressions in
  random subsets* (2017) and *An asymmetric random Rado theorem* (2022). Both are
  random-structure results about AP patterns in random subsets of `[n]`. Neither
  touches coprimality, sieves or Jacobsthal.
- **Semantic Scholar**, 99 citations of Janson 1998: the same picture, plus one
  item the corpus does not hold.

**The new near-miss, and it is nearer than Peres–Schlag.** Yuval Peres and Bohan
Yang, *Maximal Gaps for Dilated Lacunary Integer Sequences*, **arXiv:2606.28860**
(27 June 2026; math.NT / math.DS / math.PR), cites Janson 1998. Abstract read at
`arxiv.org/abs/2606.28860`, verbatim:

> *"Let (a_n)_{n≥1} ⊂ ℕ be a lacunary sequence, a_{n+1} ≥ q a_n for q > 1. For
> x ∈ 𝕋, we study the maximal empty circular gap G_N(x) of the finite orbit
> {a₁x, …, a_Nx}. We prove that, for Lebesgue-almost every x, ½ ≤ liminf
> N G_N(x)/log N ≤ limsup N G_N(x)/log N ≤ (q+1)/(q−1). If, in addition,
> a_n | a_{n+1} for every n, then this can be improved to
> lim N G_N(x)/log N = 1 for Lebesgue-almost every x."*

So by 2026 the correlation-inequality family has been carried into a
**maximal-gap** problem in number theory — one step nearer our import's shape
than the Peres–Schlag BLMS 2010 precedent `import-suen.md` §11 records. The
setting (dilations of a lacunary sequence on the torus) is not ours, and the
result is a typical-gap law rather than an extremal covering, so the boundary
holds. **Add it to §11's near-miss list.**

**Also checked:** arXiv:2603.07245 (Sason, *The Lovász Local Lemma: Foundations
and Applications*, 2026; abstract read at `arxiv.org/abs/2603.07245`) enumerates
its applications — edge-disjoint paths, SAT, Ramsey bounds, hypergraph colouring,
digraph structure, acyclic colouring — and **names no number-theoretic
application at all**. A survey is where one would be listed, so that negative
carries weight.

**Verdict: NOVEL-SO-FAR.** No application of Suen/Janson to consecutive-integer
coprimality or to a Jacobsthal-type problem exists in either citation graph.
Conventions searched: the Suen 1990 and Janson 1998 citation sets in two
independent graphs; "Janson inequality Jacobsthal"; "Lovász local lemma
Jacobsthal / coprime to a primorial"; the 2026 LLL survey's application list.

**NOT searched:** the citation graphs of the **lopsided** local lemma
(Erdős–Spencer 1991) and of Lu–Székely, which is where a number-theoretic
application would more plausibly sit; Google Scholar (unreachable); MathSciNet
review text (`mrlookup` is bibliographic only); any citing work indexed by
neither OpenAlex nor Semantic Scholar.

---

## 5. Two-class subshift complexity — **ADJACENT (the object is owned; its complexity is not)**

*(`import-bfree.md` §3.3, which flags itself: "those numbers must not be called
novel yet", and §10: "No owning-convention search was run for the two-class
complexity function.")*

**One-class side: PRIOR ART, and the corpus's citation needs one correction.**
The owning paper is **Kasjan, Lemańczyk and Zuniga Alterman**, *Dynamics of
ℬ-free systems generated by Behrend sets. I*, **Acta Arith. 209 (2023) 135–171**
= arXiv:2205.08273. Theorem 1.1, quoted [second-hand, from the arXiv PDF read by
a subagent] as

> (7) `cpx_{1ℙ}(n) ≪ (4 + o(1))^{n/log n}` and
> (8) `(2 + o(1))^{n/log n} ≪ cpx_{Xℙ}(n) ≪ (4 + o(1))^{n/log n}`,
> with (9) the matching lower bound for `cpx_{1ℙ}` **conditional on
> Hardy–Littlewood**.

**Two things to fix in `import-bfree.md` §3.3.** First, the author list is
**Kasjan–Lemańczyk–Zuniga Alterman**; Kułaga-Przymus is not an author of the
complexity paper (she is on *ℬ-free sets and dynamics*, arXiv:1509.08010, which
does not treat complexity). Second, equation (8)'s unconditional sandwich is for
**X_ℙ, the ℙ-admissible subshift** — which *is* our `cpx₁`, so the corpus's use
of it as the one-class control is sound, but the sentence should name X_ℙ rather
than "the B-free subshift", because for `1_ℙ` only the upper bound is
unconditional. The upper bound's engine is the **large sieve**
(Montgomery–Vaughan, Mathematika 20 (1973)), not Hensley–Richards or Granville.

**Two-class side: the object has a published home and a published name, and its
complexity is untouched.** Francisco Araújo, *Sarnak's Program for Erdős Sieves*
I and II, arXiv:2602.24031 / 2602.24034 (27 Feb 2026) — **already known to the
corpus** (`import-bfree.md` §10) — defines a **sieve** as a pair
`(B_R, (R_b)_{b∈B_R})` with `R_b` a *set* of congruence classes mod `b`,
explicitly covers the polynomial case `R_p^f = {x : f(x) ≡ 0 mod p²}`, and
defines *"We say a set A is R−admissible if for all b ∈ B_R we have
−A + R_b ≠ O_K, and write Ω_R for the set of all R−admissible sets"*
[second-hand, from both PDFs]. **`Ω_R` at `B_R = {pℤ}`, `R_p = {0, −2}` is
exactly our twin-admissible subshift, and Part I §5.1 poses the twin question in
that language.** But `grep -i complexity` returns **zero hits in either Part**:
Araújo's results on `Ω_R` are measure-theoretic and spectral (Part II: isomorphic
to an ergodic rotation of a compact abelian group, with computed spectrum), and
the only entropy computed is the measure-theoretic one, which is zero.

**Verdict: ADJACENT.** The subshift is owned and named (`Ω_R`, R-admissible sets
of an Erdős sieve, Araújo 2026); the complexity function of the one-class case is
owned (KLZ, Acta Arith. 2023, Thm 1.1); **the complexity function of the
two-class / polynomial case is not computed or bounded anywhere found.** The
§3.3 numbers may now be described as *"not found in the owning convention"*
rather than *"apparently unrecorded"* — but the honest novelty claim is narrower
than a new sequence: it is the **exponent shape**. One-class runs at
`c^{n/log n}`; a two-class large-sieve input (`ω(p) = 2`, so `σ(R) ∼ (log R)²/2`,
survivor bound `≍ 8N/(log N)²`) points at `2^{cN/(log N)²}`, a different shape.
That is the target worth registering, and it is a conjecture, not a computation.

**NOT searched:** the forward citation graph of arXiv:2205.08273 — the single
most likely home for a two-class follow-up, and the biggest remaining gap here;
MathSciNet / zbMATH, including the *published* Acta Arith. text, whose equation
numbers may differ from arXiv:2205.08273v1; Cellarosi–Sinai, Peckner,
Huang–Wang–Ye, Keller, Dymek's Toeplitz papers, Matomäki–Teräväinen individually;
Engelsma's *Permissible Patterns of Primes*; non-English literature.

**One methodological check before any comparison is published.** KLZ's `X_ℬ` is
**hereditary** — every subset of an admissible set is admissible — so their `cpx`
counts *all* admissible subsets of a window. Confirm `import-bfree.md` §3.3's
`p(n)` counts subsets and not maximal configurations before setting it beside a
`(c + o(1))^{n/log n}` shape.

---

## 6. The extinction scaling law — **ADJACENT (both halves owned, the composition not)**

*(`attack-foldL-06-scaling.md`: kill runs of length ≥ 2 go extinct past a
threshold fold, with the crossing at `2cp/m̄(p) > ln(kills in the window)`.)*

**Half one: the threshold `θ ≈ 2p` is Holt's, in print since 2014.** The corpus
already holds this (`lit-pdf-holt-rudd.md` §3a, verified against the PDF):
1408.6002v1 p. 11, *"the minimum distance between closures is 2 · p_{k+1}"*.
**Do not present `θ ≈ 2p` as ours.** And the *extinction threshold itself* has a
published trivial form — 2605.19165 p. 11's `|s|/2`, quoted in §1(b) above.

**Half two: the `ln N` term is the classical maximal-spacing law.** `ln(kills in
the window)` against a mean spacing is the largest-spacing statistic for
exponential spacings, whose owning convention runs Lévy (1939) → Devroye →
Deheuvels. Reachable source verified at the author's own page: **Luc Devroye,
*The Largest Exponential Spacing*, Utilitas Mathematica 25 (1984) 303–313**,
abstract verbatim: *"We consider the largest spacing M_n defined by n independent
exponentially distributed random variables. We give its limit law, obtain some
large deviation probabilities and derive some laws of the iterated logarithm."*
Read the crossing condition as *"the growing threshold 2p overtakes the largest
spacing a window of this length can supply"* and it acquires a named antecedent.

**The composition: NOT FOUND.** No source states a stage-indexed law for *when*
pair coincidences cease in a thinning whose collision threshold grows with the
stage. Conventions searched and clean: extinction time of a thinning process;
last occurrence of adjacent deletions; coincidences in thinned point processes;
records in thinned sequences; Poisson clumping / declumping and the Chen–Stein
method (Arratia–Goldstein–Gordon 1989, *Ann. Probab.* 17(1), read at Project
Euclid — it owns the *tool*, two moments for dependent indicators, not a
last-occurrence stage); Aldous's Poisson clumping heuristic (owns "clump", which
is our kill run); Erdős–Rényi and Erdős–Révész longest-run laws (own the *length*
statistic, not the cessation stage); RSA / Rényi parking / jamming.

**RSA is ADJACENT and the boundary is three-fold, so state it or a referee will:**
RSA *adds* non-overlapping objects where we *remove* points; RSA's exclusion
length is a **fixed** parameter where our qualifying spacing `θ ≈ 2p` **grows
with the stage**, which is the entire content of the law; and RSA's terminal
object is a jamming density where ours is an extinction *stage*.

**One structural warning to carry into the write-up.** Two same-prime deletions
being adjacent at stage `p` needs a gap `≥ 2p` in the already-sieved set, and
FKMPT *Long gaps in sieved sets* (arXiv:1802.07604) proves such gaps always exist
over a full period — `x(log x)^δ ≫ 2x`. **So the extinction is necessarily a
window / short-interval effect and can never be global.** `attack-foldL-06`'s §7
already says the test is localized; say it in the *headline* rather than the
caveats, because the global version is refutable in one line.

**Verdict: ADJACENT.** Both ingredients are owned and must be attributed; the
composition — a stage-indexed crossing of a growing threshold against a
growing-but-slower maximum spacing, with out-of-sample confirmation across three
decades of `Y` — was not found.

**NOT searched:** cooperative sequential adsorption with a *time-dependent*
exclusion range, the closest RSA variant and an obvious remaining home; Aldous's
book body (only the encyclopedia entry was opened); MathSciNet / zbMATH;
non-English; pre-1975 spacings literature beyond Devroye's own citations.

---

## 7. Cross-cutting flags, in risk order

**(a) A 2026 preprint builds our exact frame, and the corpus does not know it.**
Javid Ojaroudi, *The Replication–Deletion Primorial Sieve: A Generative
Stage-Based Sieve (No Prelisted Inputs) and an Unconditional Twin-Prime Theorem*,
**Zenodo DOI 10.5281/zenodo.18509488**, v4, 6 February 2026, preprint, not peer
reviewed. Downloaded (692 KB, ~31.6k words) and scanned. Its abstract, read from
the PDF:

> *"At stage i the state is a set T_i ⊂ ℤ/F_iℤ of residue classes for which both
> a and a + 2 are coprime to F_i. The update from F_i to F_{i+1} = F_i p_{i+1} is
> fully explicit: each class lifts to p_{i+1} fibers and exactly two fibers are
> deleted, corresponding to divisibility of n or n + 2 by the new prime p_{i+1}."*

That is our tile and our fold, in someone else's preprint. **Good news for the
six candidates: it contains no Jacobsthal, no maximum gap, no run structure** —
`gap` occurs in it only as the constant `C_gap`. It goes after equidistribution
instead, via *"exact Fourier identities for the lift–deletion transition"*, a
*"Selberg-weighted discrepancy energy W_i(D)"*, and **bilinear Kloosterman
bounds** — i.e. straight into the corpus's own Lemma V territory, and (being a
Selberg-lower-bound argument) into the parity wall. Two consequences:
`research/discrepancy-two-class.md`'s claim to build *"the two-class analogue
that does not exist in the literature"* is an absence claim naming no convention
and now has a live competitor; and anyone writing the frame up should expect this
preprint to surface. **Not read in full; the twin-prime claim is untested here
and by base rates should be assumed wrong.**

**(b) `research/PRIOR-ART.md`'s Holt boundary sentence is wrong** — see §2's
correction box.

**(c) The Holt sweep table is one paper short.** `research/PRIOR-ART.md` says
*"All fourteen arXiv manuscripts were downloaded"*; the arXiv API returns
**fifteen** prime-gaps manuscripts under `au:"Fred_B_Holt"`, and the missing one
is **2605.19165, *On nonconvex constellations among primes II*, 18 May 2026** —
which is exactly where the `|s|/2` fusion-extinction threshold is stated. It
existed three months before the sweep.

**(d) Withdrawn prior attempt on the Zone route, worth one line in the record.**
Jens Oehlschlägel, *Reasoning about Primes (II)*, arXiv:1411.6582 (math.GM,
20 Nov 2014, **withdrawn 9 Aug 2015 for "a crucial error in Lemma 8.4"**;
abstract read at `arxiv.org/abs/1411.6582`) claims *"the exact upper bound on the
greatest gap … g(P) = 2p−5 … at least in the subregion [1, p′²] where no other
primes have influence"* and derives Legendre from it. One-class, and retracted —
but it is a published attempt at precisely our zone argument, and its retraction
is a useful datum.

**(e) One unread Jacobsthal item, outside these six candidates.**
arXiv:1306.1064, *A short note on Jacobsthal's function*, returns zero hits
across the repository.

---

## 8. Risk ranking

**Highest-risk proposal: candidate 3, the thinning null.** Its headline —
*"The fold recursion is an exactly solvable thinning, and its null model is the
geometric law"* — is **Hawkins' random sieve with Neudecker–Williams' geometric
gaps**, published 1957/1979 and surveyed in a 2008 JTNB paper, differing from
ours only in the deletion rate; and its group law is Bunge's composition
semigroup (Ann. Probab. 1996). The corpus contains **zero** mentions of Hawkins,
Wunderlich, Neudecker or "random sieve". The note's own flag was right and the
answer is worse than it feared. What survives: the two-class rate, the CRT-versus-
independent total-variation measurement, the Fold Moment Identity, and `Ψ − Φ²`
as the first-order deviation — none of which was found in print.

**Safest proposal: candidate 4, the Suen import.** Both directions are now
searched — sieve → probability by the note itself (five full texts, zero hits)
and probability → number theory here (two independent citation graphs, 97 and 99
citing works, zero on-point) — and the 2026 LLL survey lists no number-theoretic
application. The one caveat is scope: what is clean is the *import*, not the
constant `e^{2γ}/4`, which `PRIOR-ART.md` already books to Táfula as
known-obscure.

Ranking the middle four by residual risk: **6 (extinction)** and **1 (fold-L)**
are ADJACENT with two owned ingredients each and a clean composition; **2
(transport)** is ADJACENT but sits closest to a published identity and forces a
correction to `PRIOR-ART.md`; **5 (complexity)** is ADJACENT with the object
itself owned and named by Araújo, so it must be presented as a computation inside
someone else's framework, not as a new object.

---

## 9. NOT REACHED, across the whole pass

- **MathSciNet review text and zbMATH** — no access this session; the `mrlookup`
  route is bibliographic only. This includes the *published* Acta Arith. text of
  KLZ and the FKMPT corrigendum MR4592874 (the latter is already read and cleared
  elsewhere in the corpus).
- **Google Scholar** — unreachable; no forward-citation walk from
  arXiv:2205.08273, which §5 names as the biggest single remaining gap.
- **Daley–Vere-Jones, Cox–Isham, Rényi 1956/1976, Steutel–van Harn,
  Klebanov–Maniya–Melamed, Gnedenko–Kovalenko 1968** — none reached at source;
  §3's classical attributions rest on two reachable intermediaries.
- **The Hawkins literature itself** — Hawkins 1957/1974, Wunderlich,
  Neudecker–Williams 1979, Bui–Keating, Lorch are known only through Rivoal's
  survey. Nobody has yet checked whether any of them carries a **two-class**
  variant, which is the question that decides how much of candidate 3 survives.
- **Holt's `Primegaps-v2` notebooks** and the self-published 2022 book beyond the
  four proxies already read.
- **Ojaroudi's preprint in full** — scanned, not read; its twin-prime claim is
  untested here.
- **The lopsided-LLL citation graph** (Erdős–Spencer 1991, Lu–Székely).
- **Cooperative sequential adsorption with time-dependent exclusion range.**
- **Non-English literature** anywhere in this pass.
- **Aldous's *Probability Approximations via the Poisson Clumping Heuristic*
  body**; **Hooley** and **Montgomery–Vaughan 1986** at source;
  **Kurlberg–Rudnick** at source.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
