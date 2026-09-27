# Novelty audit of the never-audited results (2026-08-18)

<!-- ledger
id: Q-novelty-postaudit
status: ANSWERED
todo: none
question: Of the ten results never covered by the 2026-08-13 prior-art audit, which are novel?
verdict: None survives as fully novel: two are outright prior art (one published thirteen years earlier with its headline claim contradicted by the source's own table), one is a two-line classical theorem mis-calibrated as a measurement, five are restatements or special cases of standard objects, and one names a lemma that does not exist.
-->

**Headline: of the ten results audited, none survives as fully novel — two are
outright prior art (one of them published thirteen years ago, with its headline
claim contradicted by the source's own table), one is a two-line classical
theorem mis-calibrated as a measurement, five are restatements or special cases
of standard objects, and one names a lemma that does not exist.**

`research/PRIOR-ART.md` is dated 2026-08-13 and stops there. Everything below
postdates it and had never been checked. The dominant failure mode is the one
the brief predicted: **our result is a special case, or a restatement, of
something standard**, and in three cases the standard thing is already cited
elsewhere in this repository.

---

## Search calibration (run first; a silent search proves nothing)

Four queries with known-correct targets, all of which the corpus cites:

| calibration query | expected hit | result |
|---|---|---|
| Ziller–Morack paired Jacobsthal | arXiv:1706.03668, OEIS A288815 / A072753 / A048670 | **PASS**, all four returned |
| Holt–Rudd, Eratosthenes sieve and the gaps between primes | arXiv:1408.6002 Thm 2.3, Lemma 3.1 | **PASS**, both returned verbatim |
| Kalmynin–Konyagin arXiv:2302.00459 | Izv. Math. 88:2 (2024) 225–235 | **PASS**, journal ref matches the brief exactly |
| Kourbatov maximal gaps between k-tuples | JIS 16 (2013) 13.5.2, OEIS A113274 | **PASS**, and see item 1 below |

Vocabulary discipline: every object was translated out of house terms before
searching (tile → primorial wheel / cycle of gaps; fold → sieve extension by the
next prime; natal set → the comb of twin residues mod 30; rotation ensemble →
random residue class per prime; loudness → strike variance; scour → the sifting
primes in (x, √W]). No paper uses our words and none was searched for by them.

---

## Ranked by consequence

### 1. max A = (0.49 ± 0.09)·ln³v — **PRIOR ART**, and the headline is refuted by the source

*Canonical translation.* Maximal gap between consecutive twin prime pairs below
v, binned by decade. Up to the endpoint convention (distance from p to the next
twin pair vs gap between consecutive twin pairs) this is **OEIS A113274, record
gaps between twin primes**.

*Queries.* "Kourbatov maximal gaps twin primes log^3 statistical approach";
"OEIS A113274 record gaps between twin primes conjecture 0.76 log^3"; "gaps
between twin primes 0.76 (log p)^3 upper bound"; plus full-text extraction of
the JIS paper.

*Found.* **A. Kourbatov, "Maximal Gaps Between Prime k-Tuples: A Statistical
Approach", Journal of Integer Sequences 16 (2013), Article 13.5.2**
(= arXiv:1301.2242, v1 10 Jan 2013, v3 14 Apr 2013). His **Table 1** gives
least-squares zero-intercept trendlines for maximal gaps between twin primes
against ξ = log³p, binned exactly the way our attack binned them:

| end-of-gap prime p | slope against log³p |
|---|---|
| 1 < p < 10⁶ | 0.4576 |
| 10⁶ < p < 10⁹ | 0.4756 |
| 10⁹ < p < 10¹² | 0.5203 |
| 10¹² < p < 10¹⁵ | 0.5628 |

Our `research/ZONE-POSTULATE.md`:138 records **"max A = (0.49 ± 0.09)·ln³v per
decade, flat over nine decades, band 0.321 to 0.571 with no trend."** Kourbatov's
four published slopes sit inside our band, centred on our central value.

**The consequential part is not the priority, it is the trend.** Immediately
under his table Kourbatov writes, verbatim:

> "Table 1 shows that, for a fixed k, record gaps between k-tuples farther from
> zero have a steeper trendline (when plotted against log^{k+1} p). This is not
> a 'one-slope-fits-all' situation!"

His slopes rise monotonically, 0.4576 → 0.4756 → 0.5203 → 0.5628, over the same
decades we call flat. Our "flat, no trend" is the fourth instance of the class
`research/natal-cap-31-calm-vs-kill.md` already names — a trend (here, a
non-trend) asserted on a short run — except that this one was refutable from
published data, not from a new computation.

He also gives the constant our band is drifting toward: the expected average twin
gap is **a = 0.75739 log²p** (0.75739 = 1/(2C₂)), and the estimator
**E3 = a log p = 0.75739 log³p**, of which he writes:

> "computations and heuristics suggest that a linear function of log^{k+1} p can
> serve as a convenient upper bound for gaps. For example: Maximal gaps between
> twin primes are less than 0.76 log³ p."

So 0.76 is the asymptotic ceiling and the sub-0.76 measured slope is the
`a·log(x/a)` deficit, published with its shape. And the plain linear-in-log³p
fit for twin gaps is older still: Kourbatov credits **L. Rodriguez and
C. Rivera, "Conjecture 66. Gaps between consecutive twin prime pairs"**, with
**R. Fischer, *Maximale Lücken (Intervallen) von Primzahlenzwillingen*,
preprint 2008** and **M. Wolf, *Maximal gaps between twin primes G₂(x) can be
expressed in terms of π₂(x)*** for the non-linear refinements.

*Aggravating.* **A113274 is already in `PRIOR-ART.md`** — it is listed at :161
among "existing relevant entries" from the 2026-08-17 OEIS sweep. The pointer was
in the file; nobody followed it.

*Action.* Retract "flat over nine decades ... with no trend". Cite Kourbatov
2013 (Table 1 and the 0.76 log³p bound) and A113274. Our number is a
re-measurement of his Table 1, on a range he covers, and it is the weakest kind
of result the corpus holds: unreproducible from this repository by its own
custody note, and now also not ours.

---

### 2. The Poisson law m₂/m₁ ~ e^γ·ln x/(2C₂) ~ 1.35 ln x — **PRIOR ART**, and it is a theorem, not a measurement

*Canonical translation.* The ratio of the mean gap between twin slots to the mean
gap between single holes in the wheel of modulus x#, i.e.
∏_{3≤q≤x}(q−1)/(q−2) — the Schemmel-totient mean gap over the Euler-totient mean
gap.

*Queries.* "asymptotic product (1−2/p) twin singular series Mertens 2C₂ e^{−2γ}
log²"; "Mertens third theorem Schemmel totient"; "twin primes constant C₂
singular series ∏ p(p−2)/(p−1)²".

*Found.* This is **Mertens' third theorem plus the twin singular series**, in two
lines, with no measurement involved:

- ∏_{p≤x}(1−1/p)⁻¹ ~ e^γ ln x  (Mertens 1874)
- ∏_{2<p≤x}(1−2/p)/(1−1/p)² → C₂ = ∏_{p>2} p(p−2)/(p−1)² (the twin-prime
  constant, OEIS A005597), so ∏_{3≤q≤x} q/(q−2) ~ (e^{2γ}/(4C₂))·ln²x, and
  x#/D_x = 2·that = (e^{2γ}/(2C₂))·ln²x = 2.4026 ln²x — the figure the Phase-1
  brief already carries as known.
- Dividing: m₂/m₁ ~ (e^{2γ}/(2C₂))ln²x / (e^γ ln x) = (e^γ/(2C₂))·ln x
  = 1.34898 ln x. Exactly the printed law.

*Verdict.* **PRIOR ART, and mis-calibrated.** `research/G2-STATE.md`:282 and
`research/two-class-lower-bounds.md`:718 both mark this **(MEASURED)**. It is
provable, elementary, and older than every other object in this corpus.

*Consequence, which is larger than the item.* `G2-STATE.md` §3d ("What the second
residue class costs") offers **"Three independent routes, one answer"** and lists
this as the third. It is not an independent route and it is not evidence — it is
an identity that any of the other two routes must reproduce or be wrong. §3d's
claim of triple confirmation is a claim of double confirmation.

---

### 3. Exact Invariance Lemma — **PRIOR ART (folklore)**, exactly as the brief predicted

*Canonical translation.* Fix an interval [A, B) ⊂ [0, W). Extending the sieve by
the next prime p replaces the wheel by p copies and deletes two residue classes
mod p; each surviving element of [A, B) has p images and exactly two are struck,
so the count of twin slots over the p copies of [A, B) is exactly (p−2)× the old
count. Both the band and the census scale by (p−2), so the band's *share* — the
"depth" — is frozen. **One line, CRT, unconditional.** The brief's guess was
right.

*Queries.* "periodicity of the sieve wheel local density invariant under adding a
prime"; Holt–Rudd cycle-of-gaps recursion; Grob/Grob–Schmitt "Cycles and Patterns
in the Sieve of Eratosthenes".

*Found, three ways.*

1. **It is the Copying Theorem restricted to a sub-interval**, and
   `PRIOR-ART.md`:16 already rules the Copying Theorem **classical** — H. J. S.
   Smith, *Proc. Ashmolean Soc.* 3 (1857) 128–131 (via Dickson, *History* I
   p. 439); Schemmel's totient (1869); OEIS A059861. The corpus therefore
   already declares this fact classical in one file and claims it as a lemma in
   another.
2. **Holt and Rudd, arXiv:1408.6002, Lemma 3.1** (retrieved via the ar5iv HTML
   rendering; wording as rendered there, not re-verified against the PDF):
   *"each instance of s in 𝒢(p_k#) generates p_{k+1}−j−1 copies of s in
   𝒢(p_{k+1}#)"*, with the population recursion
   *N_s(p_{k+1}#) = (p_{k+1}−j−1)·N_s(p_k#) + n_{s,j+1}(p_k#)*. A single gap is a
   length-j = 1 constellation, so the factor is **p−2**. That is our law, for
   every constellation, published in 2014.
3. **G. Grob and M. Schmitt, "Cycles and Patterns in the Sieve of
   Eratosthenes", arXiv:1905.03117**, Theorems 1, 3, 4 as reproduced in the
   sequel's appendix: *"Theorem 1. The distribution of n-primes is repeated every
   interval of Πpᵢ"*; *"Theorem 4. ... within each such cycle there are
   Π(pᵢ−2) ... twin pairs"*, with the sequel stating *"by Theorem 1, these
   results hold true for each subsequent cycle"*.

*Verdict.* **PRIOR ART.** `ATTACKS2.md`:31 calls it "one theorem-grade result",
"unconditional and proved independently twice". Independent rediscovery twice
in-house is not novelty; it is the corpus's own credential argument, and it
should be stated as such rather than as a result.

---

### 4. Beyond-Chebyshev ensemble bounds, and the X-limitation Theorem — **RELATED** (classical method, published ensemble)

Two items, one verdict, because they share both their ancestor and their gap.

*Canonical translation.* Both live on the **rotation ensemble** = a set of
integers formed by deleting a uniformly random pair of residue classes
{t, t−2} mod q for every sifting prime q. Item 5 bounds the lower tail of the
survivor count from exact moments; item 4 shows the first-order (strike) channel
cannot reach zero and the second-order (overlap) channel must.

*Queries.* "random residue class sieve probability no survivors second moment";
"Christoffel function bound on an atom, moment problem, Gram matrix";
"Bertsimas Popescu optimal inequalities in probability theory"; "Bonferroni
inequalities sieve overlap union bound Mertens twin".

*Found — the ensemble.* **W. Banks, K. Ford and T. Tao, "Large prime gaps and
probabilistic models"** define exactly this model:

> "the model R proposed here is comprised of integers that survive the sieve
> when a random residue class is selected for every prime modulus below a
> specific bound"

with, at (1.8)–(1.9), V_H(z) = P(H ⊂ S_z), S_z = Z \ ⋃_{p≤z}(a_p mod p), the a_p
independent uniform. That is our rotation ensemble in the one-class case, and
their §1.8 states the paper's Theorems 1.3–1.4 are proved "using first and second
moment bounds", with §§5–6 giving "probability estimates on |[0,y] ∩ S_w|" —
i.e. the survivor-count distribution over the ensemble. Their **Open Problem
1.7(3)** poses our two-class object:

> "what is the largest gap between elements of {n : n ∈ R, n + 2 ∈ R} below x?
> This should be a good predictor for the maximal gap between pairs of twin
> primes and likely will involve a different extremal sieve problem."

`research/two-class-lower-bounds.md`:169 already quotes that open problem. **None
of `natal-cap-19`, `natal-cap-21`, `natal-cap-31` or `anchored-calm.md` cites
Banks–Ford–Tao at all**, so the entire natal-cap layer is built on an ensemble
whose canonical reference lives in a different file.

*Found — the method (item 5).* The moment ladder is classical twice over:

- E[S²] = 2T₂+T₁, E[S³] = 6T₃+6T₂+T₁, … is the standard conversion between
  binomial (factorial) moments and power moments via Stirling numbers of the
  second kind, E[S^m] = Σ_k k!·S(m,k)·T_k. Textbook; the corpus's own proof says
  so.
- "the optimal polynomial-square bounds 1 − bᵀG⁻¹b (G the raw moment matrix)"
  is the **Chebyshev–Markov truncated moment problem**, and the sharp bound on
  the mass of a single atom is the **Christoffel function**
  λ_n(x₀) = 1/(z(x₀)ᵀM⁻¹z(x₀)), i.e. min{E[p(S)²] : deg p ≤ n, p(x₀) = 1}.
  Classical (Chebyshev, Markov, Stieltjes; Krein–Nudelman, *The Markov Moment
  Problem*; Shohat–Tamarkin). The modern optimisation statement is **D.
  Bertsimas and I. Popescu, "Optimal Inequalities in Probability Theory: A Convex
  Optimization Approach", SIAM J. Optim. 15 (2005) no. 3, 780–804**, which gives
  the sharp bound on P(X ∈ S) from k moments as a semidefinite program and
  explicitly "generalizes and improves upon the classical Markov and Chebyshev
  inequalities".

*Found — the mechanism (item 4).* "Strikes alone cannot annihilate" is, stripped
of the ledger, the classical statement that the Legendre/Eratosthenes sieve's
first-order term is useless at sifting level √W because
H = 2Σ_{q}1/q > 1 by Mertens, so survival is decided by the second Bonferroni
term. That is the reason Brun's sieve exists. `natal-cap-31` L1 derives the
identity S = N(1−H) + X − D honestly and the glossary already calls H > 1 "the
overlap-credit capacity excess", so the corpus knows this; what it does not do is
attach the classical name.

*Verdict.* **RELATED on both.** The numbers — P(S=0) ≤ 1.49e−6 at @11 and
1.898e−6 at @13 from exact T₄/T₆, the enumerated max VR at four levels, the
×271.7 margin at @19 — are computations and I found no prior instance of them.
The *frame* (random-residue-class ensemble), the *tail method* (Christoffel /
truncated moment problem) and the *obstruction* (Mertens ⇒ second-order term
binds) are all standard, and none is cited where the results are stated.

*One phrase to fix.* `natal-cap-21` §1 calls Theorem 2 "the Beyond-Chebyshev
Ensemble Bound, @11 — **the first anywhere**". Against Bertsimas–Popescu and the
Christoffel bound that phrase cannot stand as written. What is defensible is "the
first computed for this ensemble".

---

### 5. Staircase Theorem and the certified twin floors — **RELATED** (the exact classical structure is Meissel–Lehmer, uncited)

*Canonical translation.* Φ*(t, q) = #{m ≤ t : P⁻(m) ≥ q} is the **partial sieve
function Φ(t, q)**, the count of q-rough numbers up to t. Theorem 3's three
regimes split that count by the number of prime factors of the cofactor: the
"prime regime" (q³ > W, rough numbers below q² are prime) is the classical **P₂
term**, the "semiprime regime" is the **P₃ term**, and "general regime" is
Legendre's exact recursion.

*Queries.* "Meissel Lehmer method special leaves Φ(x,y) least prime factor";
"per-prime bound on integers first removed by p in a sieve"; "explicit lower
bound on twin primes in an interval by sieve pigeonhole".

*Found.* The decomposition π(x) = Φ(x,y) + a − 1 − P₂(x,y) − P₃(x,y) − … by
number of prime factors of the cofactor is the **Meissel–Lehmer method**;
modern reference **J. C. Lagarias, V. S. Miller and A. M. Odlyzko, "Computing
π(x): The Meissel–Lehmer Method", Math. Comp. 44 (1985) 537–560**, with the
Deléglise–Rivat refinement. `paper/staircase-note.md` §9 cites Halberstam–
Richert, Cojocaru–Murty, Fan–Pomerance, Weingartner and Holt — but **not
Meissel–Lehmer or LMO**, which is the one reference that is the same structure
rather than a neighbouring one.

*Verdict.* **RELATED, and the note is already honest about it.** §9 says "an
expert would regard Theorem 3 as an exercise; we have simply found no prior
statement of the per-remover cap in this per-tile, per-prime form", and that
survives my search. The certified twin floors (Theorem 8) and K* — 0, 0, 2, 10,
27, 69 at @11..@29 — I found no prior art for in any vocabulary. **They SURVIVE
as a form**, with the caveat the note itself states: the floors are weaker than a
direct march, so the object is the certificate, not the count.

*Action.* Add LMO to §9. It costs one line and removes the strongest available
objection to Theorem 3.

---

### 6. Theorem B, L ≤ 0.18p — **RELATED**; the one-class ancestor is Holt–Rudd, and `a3-05-bound-L.md` cites nothing at all

*Canonical translation.* L is the longest run of cyclically consecutive twin
slots of T_x whose residues mod p all lie in one pair {a, a−2} — equivalently the
maximum number of consecutive twin slots a single fold can delete, which is the
merge count in the maximal-gap recursion.

*Queries.* "longest run of consecutive elements of a sifted set in a union of two
residue classes"; Holt–Rudd fusion spacing; Ziller "differences between
consecutive numbers coprime to primorials" (arXiv:2007.01808 — checked, does not
touch runs).

*Found.* The one-class version is **Holt–Rudd, arXiv:1408.6002, Lemma 3.1 and
its corollary**: *"the minimum distance between closures is 2·p_{k+1}"* (via
ar5iv, as above), i.e. a stretch shorter than 2p admits at most one fusion — a
bound on L in the one-class alphabet, with the same mechanism (a run of merges
forces a run of large gaps). Our condition (ii) sharpens the per-gap floor from
≈2p to exactly 3p because the two classes differ by 2 and
min(class +2) + min(class −2) = 6p. So **Theorem B is the two-class refinement of
a published one-class spacing lemma.**

The corpus not only knows this, it already carries the sentence verbatim.
`PRIOR-ART.md`:124–128 quotes Lemma 3.1 of 1408.6002 as restated in 2603.25915
§1 — *"the minimum span between fusions is 2p_{k+1}. So provided that
|s| < 2p_{k+1}, the possible fusions in s all occur in separate images of s"* —
under the heading "The Localized Merge Lemma's mechanism is his", pointing at
`LOCALIZED-GAP.md` §9 for what remains ours. But
`research/a3-05-bound-L.md`, the 520-line file that asserts "This is a genuine
unconditional bound on L ... and it is the first one", contains **zero
references to any literature** (grep for Holt, Rudd, prior art, classical:
nothing). The claim "the first one" is made in the one file with no literature
contact in it.

*Verdict.* **RELATED.** The two-class alternation law (Lemma 1), the exact 3/2
from min(+2)+min(−2) = 6p, the numeric table and the ceiling argument of §7
(Theorem B can never prove L ≤ 1+m below G₂/(3p)) I did not find anywhere and
they look genuinely ours. "The first unconditional bound on L" should become
"the first two-class bound", with Holt–Rudd Lemma 3.1 cited as the one-class
ancestor.

---

### 7. Minus-Half Theorem — **RELATED**: the constant is an elementary integral, the one-class object is Montgomery–Vaughan

*Canonical translation.* Three things stacked:
(a) the autocorrelation of a periodic set vanishes off its difference set — the
difference set of {11, 17} mod 30 is {0, ±6}, and for a unit u mod 30 no h ≤ 5
has hu ∈ {0, ±6}; (b) hence the pushforward of the spectral measure integrates
trigonometric polynomials of degree ≤ 5 exactly as Lebesgue measure does — an
exact quadrature rule; (c) both test functions have degree 2, so the ratio equals
its uniform value.

*Queries.* "correlation between counts in adjacent intervals equals −1/2 MA(1)
first difference of white noise"; "Montgomery Vaughan distribution of reduced
residues variance covariance adjacent short intervals"; "autocorrelation
modulo 30 difference set vanishing lags admissible tuple".

*Found.*
- **The constant is a one-line integral.**
  ∫₀¹ sin²(πt)cos(2πt)dt / ∫₀¹ sin²(πt)dt = (−1/4)/(1/2) = **−1/2**. In the
  statistical vocabulary this is the textbook lag-1 autocorrelation of an MA(1)
  process with θ = −1, i.e. of the first difference of white noise, which is
  exactly −1/2. Whatever else Theorem 2 says, the number itself carries no
  arithmetic content.
- **The one-class ancestor is published.** H. L. Montgomery and R. C. Vaughan,
  "On the distribution of reduced residues", *Ann. of Math.* **123** (1986)
  311–333, computes the moments of the count of reduced residues mod q in short
  intervals, including the covariance between two intervals at a given
  separation; the earlier exact-variance reference is Hausman–Shapiro, *CPAM*
  **26** (1973). Both are already in `PRIOR-ART.md`:27 for "exact window-variance
  formula, one class". Our R(q) is the two-class adjacent-interval covariance
  ratio of the same family.

*Verdict.* **RELATED.** The exactness mechanism — the degree-5 immunity from the
mod-30 difference set, Prop. 1's pushforward identity and Prop. 3's reduction of
the deviation to two residue-class correlation sums — I did not find in any
vocabulary and it looks ours. But "the −1/2 correlation constant is exact" should
not be presented as though −1/2 were a discovered number; it is the uniform-measure
value, and the theorem is that the measure is uniform to degree 5.

---

### 8. Skeleton Collapse Theorem — **RELATED**: the collapse is the subset-expansion identity

*Canonical translation.* Write each local density as mean + fluctuation,
f_M = m̄_M + φ_M with E[φ_M] = 0, and expand the product over subsets. The whole
of Theorem A's proof is
Σ_{S⊆P} ∏_{p∈S}φ_p ∏_{p∉S}m̄_p = ∏_p(φ_p + m̄_p), the distributive law; the
2ⁿ terms "collapse" because they were an expanded product to begin with.

*Queries.* "Hoeffding ANOVA decomposition product measure subset expansion";
"Sobol decomposition sum over subsets product of independent factors";
"autocorrelation of a sifted set factorises by CRT Euler product".

*Found.* The decomposition being re-summed is the **Hoeffding / Sobol–ANOVA
decomposition** of a function on a product space, f = Σ_{S⊆D} f_S, which is
unique precisely when the measure is a product measure — the standard reference
family (Hoeffding 1948; Efron–Stein; the Sobol sensitivity literature; in
Boolean analysis, the Fourier–Walsh expansion). Its defining property is exactly
the one Theorem A uses. In number-theoretic dress the same step is the routine
CRT/Euler-product factorisation of the correlation function of a periodic sifted
set.

*Verdict.* **RELATED.** The *mechanism* is folklore and should be labelled as
such; the *object* — the mod-30 kernel K = 15C − 2P with the reading
K/P = +28 / +13 / −2 at m ≡ 0 / ±6 / other, and the reduction of the anchored
ledger to two AP-restricted correlation sums — I found nowhere. It stands, but
"a priori 2ⁿ ledger terms collapse to a single closed-form kernel" oversells: the
2ⁿ terms are an expansion of a product and re-contracting them is one line, which
is what the proof does.

---

### 9. "Fused-Window Calm Lemma" — **the named lemma does not exist**; Mirror-Phase Doubling is **RELATED**

*Before any literature search.* `research/GLOSSARY.md`:269 states, in terms:
**"There is no 'Fused-Window Calm Lemma'; the name is retired."** The two proven
objects in `natal-cap-19-calm-lemma.md` are the **Fusion Identity** (Lemmas 1–2)
and the **Mirror-Phase Doubling Lemma** (Lemma 3). The task list carries the
retired name. Nothing can be audited under it; flagging this is worth more than a
verdict on it.

*Canonical translation of what does exist.* The twin-slot set N mod W is
invariant under the involution r ↦ W−2−r. That induces stat(t) = stat(W−t) on the
phase ensemble, whose only fixed points are t = 0 and t = W/2, and the statistic
degenerates differently at each (concatenation vs duplication).

*Queries.* "palindromic symmetry of reduced residues mod n, n−x, twin residues";
Grob–Schmitt cycles and patterns; de Polignac diatomic series via Dickson.

*Found.* The symmetry is published, twice, and the corpus already knows one of
them:
- **`PRIOR-ART.md`:17** already rules the mirror **known-obscure and in print
  since 1849** — A. de Polignac's "diatomic series", *Comptes Rendus Paris* 29
  (1849) 397–401 and *Nouv. Ann. Math.* 8 (1849) 423–9, via Dickson, *History* I
  p. 439.
- **Grob and Schmitt, arXiv:1905.03117, Theorem 2** (quoted in the appendix of
  the sequel): *"N-primes are distributed symmetrically within every such
  interval Πpᵢ. That is, if x is an n-prime, so is Πpᵢ – x"*, with Theorem 2a the
  same for an arbitrary prime set M, and the sequel extending it to twin pairs:
  *"By Theorem 2, the centers of such twin n-primes or M-primes are located
  symmetrically within repetitive cycles."*

*Verdict.* **Mirror-Phase Doubling: RELATED** — the symmetry it rests on is
published (1849 and 2019); the fixed-point consequence (self-paired phases,
variance doubling at W/2) is an elementary orbit argument and I found no prior
statement of it. **Fusion Identity: SURVIVES, and is elementary** — it is the
same substitution r = qm that `paper/staircase-note.md` Lemma 1 makes, applied at
the anchor.

---

## Three collateral findings, each a custody defect the audit turned up

1. **`PRIOR-ART.md`:154 misattributes a paper.** It writes "**Grob and Schmitt**,
   arXiv:1905.03117 and arXiv:2107.06950". The title page of arXiv:2107.06950
   reads *"Cycles and Patterns in the Sieve of Eratosthenes—Part 2, Potential
   Twin Primes, George F. Grob, June 14, 2021"* — **Grob alone**. Schmitt is a
   co-author of 1905.03117 only. This is the author-list class of error the brief
   flagged, in the file that exists to prevent it.

2. **An absence claim in `GLOSSARY.md` is at risk.** :138 says of the two-class
   discrepancy ΔΦ₂: *"The two-class object does not appear in the literature; the
   one-class version is Holt's."* But Grob arXiv:2107.06950 §4 is titled **"A
   Legendre-like Function for Counting Twins"** and constructs, explicitly, a
   Legendre inclusion–exclusion counting function for twin candidates —
   *"We will adapt Adrien-Marie Legendre's formula for counting primes in order to
   construct a new formula for counting twin primes, twin n-primes, and twin
   M-primes"* — with a "Theorem 8a, Meissel's formula generalized" for the twin
   case. That is a two-class sifting function in print. I did **not** check
   whether he studies its signed discrepancy against the main term, which is the
   specific ΔΦ₂ object, so this is a flag and not a verdict. It is outside my ten
   items and it should be assigned.

3. **The Kalmynin–Konyagin refutation is right about the journal and needs
   restating about the content.** Verified: A. B. Kalmynin and S. V. Konyagin,
   "A polynomial analogue of Jacobsthal function", arXiv:2302.00459 (v1 1 Feb
   2023, v2 3 Dec 2023) = *Izv. RAN Ser. Mat.* 88:2 (2024) 33–43 = **Izv. Math.
   88:2 (2024) 225–235** — exactly as the brief has it. But their object is
   j_f(N) = max{m : for some x, (x + f(i), N) > 1 for all i ≤ m}, and the number
   of classes each prime removes is the size of the preimage f⁻¹(−x) mod p,
   governed by M(f), "the average size of the maximal preimage of a point under
   a map f : F_p → F_p ... computed in terms of certain Galois groups". So it is
   a **multi-class Erdős–Rankin lower bound with polynomially-determined
   classes**, not two freely chosen classes and not the twin pair {a, a−2}. It
   does refute "no Erdős–Rankin construction with more than one class per prime
   exists". It does **not** contain our case, and writing that it does would be
   a second error on top of the first.

---

## COVERAGE — what I did not reach, and where I am most likely wrong

**Not reached.**

- **No full-text read of the two Grob papers.** I extracted arXiv:2107.06950 to
  text and read the structural theorems and the section headings; I did not read
  §4's Legendre-like function line by line, and 1905.03117 I know only through
  the appendix of the sequel that restates its theorems. Finding 2 above is
  therefore a flag, not a verdict, and the same gap means I may be *under*-
  reporting how much of the natal/comb apparatus is in Grob.
- **Holt–Rudd Lemma 3.1 and Theorem 2.3 came from the ar5iv HTML rendering, not
  from the PDF.** The quotes read as verbatim but I did not re-verify them
  against the source PDF, and this repository has been burned by exactly that
  gap before. Anyone acting on item 3 or item 6 should re-check those two
  statements in `github.com/fbholt/Primegaps-v2` or the arXiv PDF first.
- **The 2022 Holt book, *Patterns among the Primes*, remains unread**, as
  `PRIOR-ART.md`:276 already says. It is the most likely single place for the
  spacing-between-gap-g-occurrences question to have been asked.
- **No zbMATH or MathSciNet sweep, no non-English search.** All searching was
  US-English web search plus arXiv/OEIS full text. Kourbatov's own bibliography
  points at Fischer's German preprint and Rivera's Spanish-language puzzle pages,
  neither of which I opened; the twin-gap constant literature is exactly the
  kind that lives there.
- **I did not check items 4 and 5 against the "long gaps in sieved sets"
  literature in detail** (Ford–Konyagin–Maynard–Pomerance–Tao, JEMS 2021), only
  against Banks–Ford–Tao. FKMPT allows C₀ classes per prime and is the closest
  published home for a two-class ensemble; if any of the natal-cap moment
  machinery is in print, it is there.
- **`natal-cap-30`'s Proposition C blockers and `natal-cap-36`'s Skeleton
  Equidistribution Conjecture** — the analytic door (equidistribution of ⌈W/q⌉
  mod 30 over the scour primes) is a Vinogradov-type question and I did not
  search for prior work on it at all. It is the one place in this set where a
  literature hit would be *useful* rather than deflationary.

**Where I am most likely wrong.**

1. **Item 1's identification could be too strong.** Our A is the *anchored*
   first-twin distance (max over a decade of the distance from p to the next
   twin), Kourbatov's is the record gap *between consecutive twin pairs*. These
   agree to within one gap and I am confident the objects coincide, but the
   constants are fitted against different normalising primes (start-of-gap vs
   end-of-gap), which moves a log³ slope by an O(1/ln v) factor. The **flatness
   refutation does not depend on this** — his slopes rise by 23% across the same
   range where we report no trend, and no endpoint convention produces that from
   a flat sequence — but the numerical agreement of 0.49 with his 0.4576–0.5628
   could be looser than it looks.
2. **Item 4's "RELATED" may be too generous to us.** I stopped at "the
   Christoffel/moment-problem method is classical and the ensemble is
   Banks–Ford–Tao's". I did not search for whether anyone has computed the lower
   tail of the survivor count for a *finite* sifted comb, which is what our
   numbers are. If someone has, item 4 and item 5 both drop to PRIOR ART.
3. **Item 8's "RELATED" may be too harsh to us.** Calling the collapse "the
   subset-expansion identity" is fair for the proof but possibly unfair to the
   kernel: the +28/+13/−2 reading and the reduction to two AP-restricted sums is
   a real reduction and my searches for it were the weakest of the ten, because
   I could not find a vocabulary that a paper would plausibly use. If any item
   here is more novel than I scored it, it is this one.
4. **I assumed `research/ZONE-POSTULATE.md`:138 is the only home of item 1's
   number.** I grepped for "0.49" and "ln³" and found that one site plus
   `attack-block-09-anchored.md`. If the constant has propagated into
   `paper/`, the retraction has more sites than I checked.
