# Consumer comparison: the sufficient margin against the published routes

<!-- ledger
id: Q-consumer-comparison
status: ANSWERED
todo: C
parity: Literature reading and elementary logic only. The arithmetic inputs used here are the existing reduction S(x)=C_2x+E_dagger(x)+O_H(x/log^H x), non-negativity of S, the classical Selberg upper-bound sieve with Bombieri-Vinogradov, and quoted theorems read in their primary sources. No new estimate is derived, no cancellation is claimed, and no obstruction is asserted: nothing here names a method class with retained statistics, error tolerance and quantifiers, and no impossibility follows from any negative recorded below.
question: How does the sufficient margin C_2 x + E_dagger(x) >= c_0 x/(log x)^K compare logically with the published sufficient routes to twin primes, and what does the literature already own of the corner object?
verdict: The margin is the weakest hypothesis in the family. Murty-Vatwani's pair implies it (with an interval transfer derived here at medium confidence) and it implies neither half; Pintz's hypothesis set implies twins and is not implied by it; the Siegel-zero hypothesis implies it at K=0. The correct dictionary to Tao's scalar is the dyadic difference E_dagger(x)/x = C_2(2 delta_x - delta_{x/2} - 1) + o(1), the K>0 form is below that normalisation's o(1) resolution, the dyadic consumer at K=0 is strictly stronger than "delta_x bounded away from zero", and a strictly weaker block-summed sufficient consumer is available by elementary summation. The corner object of corner-correlation.md is Tao's 2016 GEH-conditional shape and Maynard's ICM Question 17 object, so it is novel to this repository and not novel; four wording flags on that note's D6 are recorded. Every route surveyed remains conditional, and the margin itself remains OPEN.
-->

**Twin-prime infinitude remains OPEN. The sufficient margin
C_2 x + E_dagger(x) >= c_0 x/(log x)^K on unbounded dyadic x remains OPEN.**
Nothing below is an estimate, and nothing below changes a budget, a region or a
cut. This note compares the target of [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md)
§3 with the published sufficient routes, fixes the dictionary to the literature's
own scalar, and records prior art for the object of
[corner-correlation.md](corner-correlation.md).

Notation follows the handoff: J_x=(x/2,x], S(x)=sum over n in J_x of
Lambda(n)Lambda(n-2), C_2=prod over p>2 of (1-1/(p-1)^2). The Hardy-Littlewood
prediction on J_x is C_2 x, and the singular series at shift 2 in the
Murty-Vatwani and Tao normalisations is S(2)=2 Pi_2=2 C_2.

Status labels: **PRIMARY**, the PDF or page was downloaded and the statement
read in extracted text; **SECOND SOURCE**, the statement was read verbatim
inside a different paper that was downloaded, the original not opened; **FETCH
FAILED**, a statement about the fetcher; **DERIVED HERE**, elementary reasoning
done in this note, with its confidence.

---

## 1. Murty-Vatwani, and which hypothesis is weaker

Murty and Vatwani, "Twin primes and the parity problem", J. Number Theory 180
(2017) 643-659, DOI 10.1016/j.jnt.2017.05.011. Read from the author-page PDF via
the Wayback capture 20250808094448 of `mast.queensu.ca/~murty/TwinPrimes-Parity.pdf`;
the live URL returns 404. **PRIMARY.**

Their two hypotheses:

- EH_Lambda(x^theta): for any A>0, sum over q<=x^theta of
  max_{y<=x} max_{(a,q)=1} of the absolute deviation of sum over n<=y,
  n=a mod q of Lambda(n) from y/phi(q) is <<_A x/(log x)^A. Their own remark:
  this "is true and is called the Bombieri-Vinogradov theorem when theta<1/2".
- EH_{mu_h}(x^eta): the same shape for Lambda(n)mu(n+h), with main term
  (1/phi(q)) times the full sum over n<=y. The main term is the unknown total,
  so the hypothesis does not presuppose sum Lambda(n)mu(n+h)=o(x).

**Theorem 1.1.** For fixed even h!=0, if EH_Lambda(x^theta (log x)^C) and
EH_{mu_h}(x^(1-theta)) hold for some fixed theta<1 and suitably large fixed C,
then (a) the assertions sum Lambda(n)Lambda(n+h) ~ S(h)x and
sum Lambda(n)mu(n+h)=o(x) are equivalent, and (b)
sum over n<=x of Lambda(n)Lambda(n+h) >= (1-o(1)) S(h)(1-A(h)) x with
A_h = prod over p not dividing h, p>2, of (1-1/(p(p-1))). **PRIMARY.**
Computed here over primes to 10^7: A_2=0.74791..., 1-A_2=0.25209..., so (b) at
h=2 gives a fixed fraction 0.2521 of the Hardy-Littlewood main term.

**The theta=1/2-eps reading.** Theorem 1.1 admits any fixed theta<1. At
theta=1/2-eps the first hypothesis is Bombieri-Vinogradov and the remaining
hypothesis is EH_{mu_2}(x^(1/2+eps)) alone; the error terms in their section 5,
O((x^eta+y)(log x)^2) with y=x^theta and eta=1-theta, stay o(x) at that choice.
**DERIVED HERE, high confidence**, and stated in print for the Goldbach analogue
by Huang and Li, "On the connection between the Goldbach conjecture and the
Elliott-Halberstam conjecture", Springer Proc. Math. Stat. 347 (2021), DOI
10.1007/978-3-030-67996-5_17 (arXiv:2005.03811v2), Corollary 1: "in view of the
Bombieri-Vinogradov theorem, the above conclusion holds if the conjecture
EH_mu(N^theta') is true for some theta' > 1/2". **PRIMARY.** Their EH_mu is the
Goldbach twist Lambda(n)mu(N-n) and their Theorem 1 carries the same A(N).

**The interval transfer. DERIVED HERE, medium confidence.** Conclusion (b) is
over [1,x] and does not by itself give the dyadic statement: subtracting the
best available upper bound at x/2, namely (4+o(1)) C_2 x from the Selberg sieve
with Bombieri-Vinogradov and (2+o(1)) C_2 x on EH, leaves the difference
unsigned. What transfers is the proof. Both hypotheses carry max_{y<=x}, so
applying them at y=x and at y=x/2 and subtracting gives their Lemma 3.4 and
Lemma 4.4 on J_x, and the bound on the absolute value of
sum over n in J_x of Lambda(n)mu(n+h) by sum over n in J_x of
Lambda(n)mu^2(n+h) ~ A_h x/2 is interval-local. That yields
S(x) >= (1-o(1))(1-A_2) C_2 x, which is the handoff consumer at K=0 with
c_0=0.2521 C_2. Three places where the range enters were checked; their full
argument was not re-run. This is a derivation this repository would own, not a
citation.

**Which is weaker.** The handoff consumer is weaker in both senses. As
hypotheses, the pair implies it by the transfer above and it implies neither
half: a single-scale lower bound on one correlation carries no information about
equidistribution of Lambda times mu_2 in progressions. As conclusions, theirs is
stronger, a positive proportion at every large x against c_0/(log x)^K on an
unbounded set of dyadic scales.

**Vatwani, Math. Z. 293 (2019) 285-317**, DOI 10.1007/s00209-018-2177-z. Abstract
read verbatim from the publisher page via the Wayback capture 20200212205018;
**body FETCH FAILED** (Springer redirects to an identity provider, and the arXiv
author trail carries no preprint of it). The abstract extends
Bombieri-Vinogradov type theorems to f(n)mu^2(n+h_1)...mu^2(n+h_k), that is to
squarefree indicators rather than to mu, formulates arithmetic-progression
analogues of Chowla and proves them "for some special cases", generalising
Siebert and Wolke, Math. Z. 122 (1971) 327-341. On the abstract alone it
supplies no case of EH_{mu_h} and cannot be priced. The Siebert-Wolke reference
is a lead for the Mobius Bombieri-Vinogradov citation gap; it was not opened.

No case of EH_{mu_h}(x^eta) for any fixed eta>0 was located in the owning
conventions **Mobius function in arithmetic progressions**, **bilinear sums over
shifted primes** and **Bombieri-Vinogradov** of
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md) section 1, and Murty and Vatwani
claim none. Cantarini, arXiv:2607.09110v1 (2026, unrefereed, **PRIMARY**),
studies weighted averages of the diagonal Goldbach-shaped version under GRH and
a weak Gonek-Hejhal conjecture, which is not a case of it. Carella,
arXiv:2206.12956v3, claims an unconditional bound for sum over p<=x of mu(p+a);
unrefereed, and refereed work of 2022 (Lichtman-Teravainen, Forum Math. Sigma 10
(2022) e57; Tao-Teravainen, JLMS 106 (2022)) treats that statement as open.
Hold at the door.

---

## 2. The dictionary to Tao's scalar

Source: Tao, "Notes on the Bombieri asymptotic sieve", blog post 2016-07-17.
Page HTML downloaded and text extracted with the LaTeX alt attributes retained.
**PRIMARY**, and a blog, not refereed.

Verbatim: "In particular, we have sum_{n<=x} Lambda(n)Lambda(n+2) =
(delta_x + o(1)) 2 Pi_2 x and the twin prime conjecture would be proved if one
could show that delta_x is bounded away from zero, while (1) is equivalent to
the assertion that delta_x is equal to 1+o(1). Unfortunately, no additional
bound beyond the inequalities 0 <= delta_x <= 2 provided by the Bombieri
asymptotic sieve is known, even if one assumes all other major conjectures in
number theory than the prime tuples conjecture and its variants (e.g. GRH, GEH,
GUE, abc, Chowla, ...)." Three hypotheses travel with that sentence. First,
delta_x is defined only "up to an error of o(1)". Second, the interval
0 <= delta_x <= 2 is supplied by the asymptotic sieve, whose axiom (iv) is an
Elliott-Halberstam hypothesis; unconditionally the available bounds are
delta_x>=0 and delta_x<=4+o(1) from the Selberg sieve with
Bombieri-Vinogradov. Third, his Remark 4 records that at a fixed level x^(1-c)
the asymptotics "are not determined by a single scalar parameter delta_x",
citing constructions of Ford, and the present reduction carries no
level-of-distribution hypothesis at all.

**The dictionary. DERIVED HERE, elementary.** Write T(y) for
sum over n<=y of Lambda(n)Lambda(n+2). Substituting m=n-2,
S(x) = T(x-2) - T(x/2-2) = T(x) - T(x/2) + O(log^2 x), each boundary window of
length 2 contributing O(log^2 x). Hence

    S(x) = C_2 x (2 delta_x - delta_{x/2}) + o(x),

    E_dagger(x)/x = C_2 (2 delta_x - delta_{x/2} - 1) + o(1).

Writing delta^(2)_x = 2 delta_x - delta_{x/2}, the object matched to E_dagger is
this dyadic difference, not delta_x. The single-scale form
E_dagger(x)/x = (delta_x - 1) C_2 + o(1) holds only if
delta_x - delta_{x/2} tends to 0, which no hypothesis here supplies.

Three consequences, all elementary and all sufficiency-side only.

1. **Resolution.** delta_x is defined up to o(1). The consumer with K>0 asks for
   S(x) >= c_0 x/(log x)^K, which is o(x), so it is below the resolution of that
   normalisation and cannot be phrased in it. In the lower direction the quoted
   sentence still covers it a fortiori, since nothing better than delta_x>=0 is
   recorded there.
2. **The dyadic consumer is strictly stronger than the literature's condition.**
   At K=0 it gives delta_x >= c_0/(2C_2) along an unbounded set of x. The
   converse fails: delta_x>=c for all large x gives
   T(x)-T(x/2) >= 2C_2 c x - T(x/2), and the available upper bound
   T(x/2) <= (4+o(1)) C_2 x, improving to (2+o(1)) C_2 x on EH, never closes for
   c<=2.
3. **A strictly weaker sufficient consumer.** Summing the reduction over dyadic
   blocks, T(2^j) = 2 C_2 2^j + sum over i<=j of E_dagger(2^i) + O_H(2^j/j^H),
   the accumulated errors being dominated by the top block. It therefore
   suffices to prove

       2 C_2 2^j + sum over i<=j of E_dagger(2^i) >= c_0 2^j / j^K

   on an unbounded set of j. Since S>=0 this is implied by the per-scale
   consumer and is strictly weaker than it, because the mass may be spread over
   the top O(1) blocks. At K=0 it is exactly "delta_x bounded away from zero
   along an unbounded set of x", the object the literature names. Sufficiency
   only; the estimate is untouched and remains OPEN.

---

## 3. Published routes from a two-point Mobius object to twins

Searched in the owning conventions **two-point Mobius correlations**, **averaged
Chowla**, **logarithmically averaged Elliott** and **Mobius function in
arithmetic progressions** of [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md)
section 1, plus the phrasings "Chowla conjecture implies twin prime", "parity
barrier Chowla twin primes" and "Liouville function and twin primes". On the
channels used, no theorem over the integers of the form "a quantitative bound on
the two-point Mobius or Liouville correlation at a fixed shift implies
infinitely many twin primes" was found, and none in the converse direction.

| source | statement | what the hypothesis actually is | status |
|---|---|---|---|
| Pintz, Proc. Steklov Inst. Math. 276 (2012) 222-227, DOI 10.1134/s008154381201018x = arXiv:1004.1067v1, Thms 1-3 | Thm 1: with theta>3/4, if the Bombieri-Vinogradov shaped bound at level theta holds for all five of log p, lambda(n), lambda(n)lambda(n+h), lambda(p+h)log p and lambda(p-h)log p, then p+h is prime for infinitely many p. Thm 2 at theta>=0.7284 gives a count >= c S_0(h) N/log^2 N. Thm 3 at theta>=0.7231 gives arbitrarily long progressions | equidistribution in progressions to level above 3/4, not a bound. His Problem 1 states that even sum over n<=x of lambda(n)lambda(n+2) < (1-c)x is open | PRIMARY |
| Murty-Vatwani Thm 1.1 | section 1 above | equidistribution of Lambda times mu_h in progressions | PRIMARY |
| Heath-Brown, Proc. LMS (3) 47 (1983) 193-224 | the twin asymptotic with error O(1/log log eta) inside a window pinned to the conductor of an exceptional character | a Siegel zero, not a correlation bound | original FETCH FAILED (publisher 403, no capture). Quoted in Tao-Teravainen arXiv:2109.06291v2 Thm 1.5(i) as q^250<=x<=q^300 and in Matomaki-Merikoski arXiv:2112.11412 section 1 as X in [q^250, q^500]; the two ranges disagree, so treat the upper exponent as unverified. SECOND SOURCE, twice |
| Tao-Teravainen, JLMS 106 (2022) 3317-3378 = arXiv:2109.06291v2, Thm 1.6 and Cor 1.8 | given a Siegel zero of quality eta, the mixed Lambda and lambda correlations equal the singular series (zero when a lambda is present) with error O(log^(-1/(10 max(1,k))) eta) for q^(10k+1/2+eps) <= x <= q^(eta^(1/2)); Cor 1.8(i) is the twin case with error O(log^(-1/20) eta) for q^(41/2+eps) <= x <= q^(eta^(1/2)) | a Siegel zero. Chowla-type and Hardy-Littlewood-type conclusions are parallel consequences of that third hypothesis, neither deduced from the other; the paper records that only the k+l<=1 cases are known even on GRH | PRIMARY |
| Friedlander-Iwaniec, "Twin primes via exceptional characters", arXiv:1607.03261 | Thm 1 for x>=D^3500 with error O(L(1,chi) x log x + x/log x); Corollary 1.1: infinitely many exceptional characters give infinitely many twin primes | an exceptional character; Thm 1 is unconditional but carries no content unless L(1,chi) is small | PRIMARY |
| Sawin-Shusterman, Ann. of Math. 196 (2022) no. 2 = arXiv:1808.04001v2 | Thm 1.1 gives the twin asymptotic in F_q[T] for q a power of an odd prime p with q>685090 p^2; Thm 1.3 gives Chowla for k shifts when q>p^2 k^2 e^2 | not an implication from Chowla to twins: both come from one geometric input, and the twin half additionally needs a function-field Fouvry-Michel estimate giving Lambda level 1/2+delta with delta<1/126, which has no integer analogue | PRIMARY, section 6 read |
| Matomaki-Merikoski, arXiv:2112.11412 (IMRN 2023) Cor 1.2; Friedlander-Goldston-Iwaniec-Suriajaya, J. Number Theory 233 (2022) 78-86 | a two-sided Goldbach bound delta S_h h <= sum <= (2-delta) S_h h forces a zero-free region | converse-direction results, but for Goldbach and needing both sides; the conclusion is a zero-free region, not a Chowla bound | PRIMARY |
| Tao, arXiv:1509.05422 / Forum Math. Pi 4 (2016) e8, section 1 | "The arguments in this paper extend to other bounded multiplicative functions than the Liouville function, though as they rely in an essential fashion on multiplicativity at small primes, they unfortunately do not appear to have any bearing as yet on twin prime-type sums such as (1.2)" | the author of the strongest two-point log-averaged result records the non-transfer | PRIMARY |
| Frantzikinakis, Discrete Analysis 2017:19 = arXiv:1611.09338; Sarnak, "Three Lectures on the Mobius Function, Randomness and Dynamics" | ergodicity of the Liouville system implies log-averaged Chowla; Chowla implies Sarnak (Sarnak's Theorem 5) | neither paper contains the word "twin"; Sarnak gives the structural reason, that his conjecture "refers only to correlations of mu with deterministic sequences and avoids the difficulties associated with self correlations" | PRIMARY, checked by grep |

**Methodological flag.** Both integer-side conditional routes require the
Mobius or Liouville object to be *equidistributed in arithmetic progressions* to
a high level, not merely bounded. A brief that proposes "prove a two-point
cancellation bound" matches neither hypothesis; the uniformity in q, to level
above 3/4 for Pintz and to x^(1-theta) for Murty-Vatwani, is where the
difficulty sits in both papers, and neither claims otherwise.

**Calibration of the Chowla clause.** The "even if one assumes ... Chowla"
clause in Tao's 2016 post carries no reference, link or argument anywhere in the
post body or its comments; in the raw HTML "GUE" and "abc" are hyperlinked and
"Chowla" is not. It is an informed assertion at blog rung, not a theorem, and no
paper proving it was located in the conventions **two-point Mobius
correlations** and **averaged Chowla** of [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md)
section 1.

---

## 4. The logical map

Statements: **(P)** the handoff consumer at fixed c_0,K>0 on an unbounded set of
dyadic x; **(P0)** the same at K=0; **(P')** the block-summed form of section 2;
**(A)** E_dagger(x)=o(x); **(MV)** the Murty-Vatwani pair; **(MVb)** their
conclusion (b); **(T0)** delta_x bounded away from zero; **(HL)** the
Hardy-Littlewood twin asymptotic; **(SZ)** the Siegel-zero hypothesis with
unbounded quality; **(PZ)** Pintz's five-sequence hypothesis set; **(CH2)** a
rate for the natural-average two-point Chowla sum at shift 2; **(D6)** the
one-sided corner target and **(D4abs)** the absolute corner target of
corner-correlation.md, each taken together with that note's unproved complement
hypothesis.

| pair | relation | ground |
|---|---|---|
| (P) to twin infinitude | implies | endpoint-target-audit (4) |
| twin infinitude to (P) | unknown | infinitude supplies no count |
| (P) to (P') | implies; (P') to (P) does not follow | S>=0; mass may spread over the top O(1) blocks |
| (P0) to (T0) | implies; (T0) to (P0) does not follow | section 2, item 2 |
| (A) and (HL) | equivalent | the reduction, both directions |
| (MV) to (MVb) | implies | their Thm 1.1(b) |
| (MVb) to (P0) | does not follow directly | the x/2 upper bound does not close |
| (MV) to (P0) | implies, by the transfer of section 1 | DERIVED HERE, medium confidence |
| (P) to (MV), or to either half | unknown, no route visible | different objects, different quantifiers |
| (PZ) to twin infinitude | implies | Pintz Thm 1; Thm 2 gives the (P0) shape on [1,N], with the same interval caveat as (MVb) |
| (P) to (PZ) | unknown, no route visible | (PZ) is equidistribution of four objects this reduction never forms |
| (CH2) to (PZ) | does not follow | (PZ) needs uniformity in q; Pintz's Problem 1 leaves even the one-sided bound open |
| (SZ) to (P0) | implies | section 6 below, DERIVED HERE, medium-high confidence |
| (P) to any statement about (SZ) | does not follow | section 6 below |
| (CH2) to (P) or to (HL) | no implication located | section 3, in the conventions named there |
| (HL) to (CH2) | unknown | not located in those conventions |
| (D6) and (P), given the complement | equivalent | substitution; correct as stated in corner-correlation.md |
| (D4abs) and (HL), given the complement | equivalent | same substitution |

---

## 5. Prior art for the corner object, and four flags on D6

[corner-correlation.md](corner-correlation.md) D4 identifies the corner, on its
s=s'=1 sub-family, with sum over n of mu(n)mu(n-2)L(n)L'(n-2), L and L'
non-negative prime-band weights. That shape is in print. Tao's 2016 post,
verbatim: "on GEH the asymptotic (1) is equivalent to the asymptotic
sum_{n<=x} mu(n) 1_R(n) mu(n+2) 1_R(n+2) = o(x/log^2 x) for some fixed alpha>0,
and similarly with 1_R replaced by other sieves", R being "the set of numbers
that are rough in the sense that they have no prime factors less than x^alpha".
He continues: "the recent progress on the Chowla conjecture relies heavily on
the multiplicativity of mu at small primes, which is completely destroyed by
inserting a weight such as 1_R, so this does not yet yield a viable path towards
the twin prime conjecture even assuming GEH". **PRIMARY**, blog, GEH-conditional
throughout, asserted in the post rather than proved there, and reached by two
applications of the Bombieri asymptotic sieve rather than by a Vaughan or
Heath-Brown split. Maynard, "Counting primes", ICM 2022 Proceedings vol. 1, DOI
10.4171/icm2022/206, Question 17 poses the four-variable determinant-2 sum with
arbitrary 1-bounded coefficients on all four variables and adds that "the
natural Cauchy-Schwarz argument leads to conditions like n_1 s_2 - s_2 n_1 = d
for some d dividing 2n_2 - 2n_1, and little appears to have been gained"; the
index typo is in the source. **PRIMARY.** He draws no link to Chowla.

So the corner framing is an independent rediscovery: novel to this repository,
not novel. Two differences must travel with the attribution. First, Tao's 1_R is
a rough-number indicator, which does remove the small-prime multiplicativity his
non-transfer sentence relies on, whereas L is a large-prime-factor weight that
leaves n's small prime factors unrestricted, so his stated reason would have to
be re-argued here rather than inherited. Second, the required savings differ:
his sum has trivial size of order x/log^2 x, from the Buchstab density of
x^alpha-rough numbers squared, against a target o(x/log^2 x), an o(1) relative
saving, while corner-correlation.md D5 puts the corner's term-wise mass at order
eta_0^4 x log^4 x against a target o(x), a relative saving of order
log^(-4-eps). The present decomposition therefore asks for about log^4 more
relative cancellation than the closest published reduction of the same shape.
That difference is arithmetic and checkable; whether a different decomposition
could reach the cheaper shape is not addressed here.

Searched for an identification of the leftover two-Mobius Type II remainder with
weighted two-point Chowla in the owning conventions **minimal Type II range**,
**two-point Mobius correlations**, **determinant equation** and
**prime-factor bilinear forms** of [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md)
section 1, plus "parity obstruction bilinear form twin primes" and "Bombieri
asymptotic sieve twin primes bilinear": none found on the channels used.
Friedlander-Iwaniec's hypothesis (B), Ann. of Math. 148 (1998) 1041-1065
(**PRIMARY**), carries one Mobius factor and an absolute value in the outer
variable, and at a_n=Lambda(n-2) it is a twin-prime bilinear hypothesis but not
the two-Mobius object; the paper states "we have no idea how to prove that the
relevant sequence satisfies the condition (B)". Murty-Vatwani Theorem 1.1(a) is
a refereed equivalence of the same family with one Mobius factor and two
conditionals.

Four flags on corner-correlation.md D6. None is an error in its derivation.

1. The labels invert the strength ordering. Given the same complement
   hypothesis, the one-sided target is equivalent to a quantitative twin lower
   bound and the absolute target is equivalent to the full Hardy-Littlewood
   asymptotic, so the absolute target is strictly stronger, not "the one that
   behaves like a lemma". The note's own "far more than needed" is consistent;
   the label is not. The defensible triage is by convention, not by strength:
   the absolute target is a recognisable open problem in the convention
   **two-point Mobius correlations** of
   [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md) section 1, while for the
   one-sided target that convention returned nothing on the channels used.
2. D6 is a property of the framing, not of S_0. The equivalence holds verbatim
   for any subregion whose complement is controlled to O_H with H>K, including
   E_dagger itself and every piece of any exhaustive decomposition.
3. The equivalence is conditional on an input harder than anything priced: the
   complement needs a uniform moment saving gamma=2 against the 3/50 priced at
   one box. A downstream summary that drops the conditional overstates D6 by
   that whole gap.
4. "With no arithmetic input at all" is true of the inequality but not of the
   reduction it rests on, which is the entire chain of the campaign.

---

## 6. Consistency with the Siegel-zero world

**DERIVED HERE, medium-high confidence.** Apply Tao-Teravainen Corollary 1.8(i)
with the pair {0,2}, whose singular series is 2C_2, at x and at x/2, both inside
[q^(41/2+eps), q^(eta^(1/2))]; that range is long in log-scale once eta is
large, so dyadic x with both endpoints inside it exist. Subtracting,
S(x) = C_2 x + O(x/log^(1/20) eta), so S(x) >= C_2 x/2 once eta is large, and
the conductors escape to infinity because eta <<_eps q^eps. Hence (SZ) implies
the consumer at K=0.

Two consequences for the campaign. Any argument for the consumer must remain
valid in the Siegel-zero world, so an argument that silently assumes no
exceptional characters is incomplete until it says so. And a proof of the
consumer would not disprove Siegel zeros: the known converse-direction results
listed in section 3 all require a two-sided bound, and a one-sided lower bound
of this size is what a Siegel zero predicts.

---

## 7. What was not opened, and how to read the negatives

Every literature-absence sentence above names its owning convention or cites
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md) section 1, and each means not
found on the channels used, which is not the same as absent from the literature.
Channels used: web search, DuckDuckGo HTML, the arXiv API on title, abstract and
comment only, direct PDF fetches and the Wayback Machine. Not used: Google
Scholar, MathSciNet, zbMATH review text, Semantic Scholar (HTTP 429) and arXiv
full-text search.

FETCH FAILED, stated as failures: Heath-Brown 1983 in the original (Oxford
Academic 403, Wiley 403, no capture), so its range exponent stands unresolved
between two citing sources; Vatwani, Math. Z. 293 (2019), body; Opera de Cribro
chapter bodies, its table of contents having been read and carrying no chapter
on twin primes and Siegel zeros, the relevant chapters being 3, 16 (including
16.4 "The Parity Phenomenon"), 18 and 24; Bombieri's 1975 and 1976 asymptotic
sieve papers; and Ng, J. Number Theory 40 (1992) 329-335, the reference Tao
credits in the 2016 post, identified through Crossref but not read.
