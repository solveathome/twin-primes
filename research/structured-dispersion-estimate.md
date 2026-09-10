# Cauchy in (m,q): the right prime-power factor kept outside the moment

<!-- ledger
id: Q-structured-dispersion-estimate
status: PARTIAL
todo: C
parity: Uses the exact convolution structure of the right coefficient b_u=A_right(gu), namely u=eq with e the original Mobius-weighted divisor and q the right prime power with Lambda(q)>=0, one Cauchy inequality over the pair (m,q), classical completion with Ramanujan and composite-modulus Weil bounds (grouped-divisor-moment (7), itself Pascadi Lemmas 3.2-3.3, rederived in the 2026-09-09 integration review), averaged gcd losses over the common divisor of the e-pair, and an elementary harmonic gcd average with the prime-power factor fixed (Lemma H). Both gcd branches, both endpoint conventions, all four coefficient sectors, prime powers, arbitrary harmonic subsets, the R=0 class, complete periods and the independent divisor twists are retained. No cancellation of any Mobius sign is used; the Lambda weights enter only through nonnegativity and Chebyshev. No parity obstruction or necessity claim is asserted; the failures recorded are failed upper bounds.
question: Can the actual coefficient structure of b_u=A_right(gu), preserved through one further factorization, improve the small-common-divisor cross term at (delta,nu)=(8/25,9/20) beyond the arbitrary-coefficient moment, and what does it buy regionally?
verdict: Derived 2026-09-08; read by the handler (research-round-validation section 10) and independently by reader V3, both verifying Lemma H and (D1) within stated scope, with grouped-divisor-moment (7) and the required separate-coefficient upstream block shape rechecked on 2026-09-09; one correction applied (the regional cut is a fourth simultaneous condition of W_dagger, not a substitute for the third). Writing u=eq and applying Cauchy over (m,q) instead of over m keeps every pair of the moment inside a common prime-power factor, so the completed modulus grows by q while the pair count is that of e; one elementary harmonic gcd lemma prices the fixed factor. The block bound (D1) saves x^(min(sigma,alpha)/4) on the cross term and costs x^(sigma/2), x^sigma on the zero and period terms. At the target box the worst sector exponent falls from 41/40 to 407/400 and the box is not controlled. (D1) controls the strip delta<71/100, delta+3nu<327/200 outside the existing region (245 of 36481 grid boxes); section 6 adds the concrete cut d<=floor(x^(141/200)), de^3<=floor(x^(1631/1000)), de>floor(x^(77/100)) as a fourth simultaneous condition of W_dagger through the Perron machinery, changing only the summation domain of E_dagger. The target box (407/400), the corner, the uniform product threshold 19/25, the sign of E_dagger and the global twin margin are unchanged; the margin remains OPEN.
-->

    Lane / stable question id: D / Q-structured-dispersion-estimate
    Starting commit / report commit or shared-checkout paths: 1285d47, shared checkout; this note and structured-dispersion-estimate-validation.js
    Disposition / exact claim / unproved hypotheses: (D1), Lemma H and the fourth residual condition are accepted at stated scope after the independent 2026-09-09 reading. Completion (7), the required separate coefficients and the Perron/density application were checked. No sufficient global signed margin follows.
    Changed step compared with the reviewed baseline: the first Cauchy inequality is taken over (m,q) with q the right prime power, not over m; the moment is over pairs of the original right divisor e with the same q. The structure-discarding step (R,q)<=q returns exactly the old 103/100.
    Source theorem and first unmatched hypothesis, if any: no new import. grouped-divisor-moment (7) (Pascadi Lemmas 3.2-3.3) reused at its recorded scope; Lemma H is elementary and proved here.
    Validation command, falsifier, result and compute used: node research/structured-dispersion-estimate-validation.js (1.1 s, one core, embedded); Lemma H exact on 62832 configurations, pair algebra and direct moment expansion exact, region grid 245 new boxes with closed form matching, six negative controls fire. Falsifiers in section 5. Zero enumeration.
    Independent reviewer / disposition (PENDING until actually reviewed): handler (first reading, research-round-validation section 10, committed 013f0dc) and reader V3 (independent proof of Lemma H, reconstruction of (D1), about 270k finite configurations): verified within stated scope. Section 6 as now written (fourth condition, lower product cut, inclusion-exclusion): PENDING.
    Full-consumer payoff and unpaid complement: none for the global margin. Regional only: a fourth simultaneous condition for W_dagger (section 6), derived through the existing Perron machinery; the target box stays uncontrolled by 7/400 in block exponent.
    Proposed shared-record changes / next bounded obligation: section 7; section 8.

**Twin-prime infinitude and the sufficient signed margin of
[RESEARCH-HANDOFF section 3](RESEARCH-HANDOFF.md) remain OPEN. This note
changes the summation domain of E_dagger by one added cut (section 6) and
nothing else: not the sign of E_dagger, not any signed margin, not the
target box, not the corner.** What follows is one derived block bound, its
elementary lemma, the exact rational bookkeeping of what it buys, the
step at which the generic exponent reappears when the structure is
discarded, and the application of the bound as a fourth condition of
W_dagger. The bound and the lemma were read by the handler and by reader
V3 on 2026-09-08 and verified within stated scope; the application in
section 6 was corrected then and independently re-read on 2026-09-09
with completion, coefficient separation and density inputs checked. A smaller deficit at one box and a strip of new region are not
evidence about the sign or size of the signed remainder.

## 1. Question, disposition and what remains open

The lane asks whether retaining the structure of b_u=A_right(gu) through
one further factorization improves the small-common-divisor cross term of
[grouped-divisor-moment (21)](grouped-divisor-moment.md) at
(delta,nu)=(8/25,9/20), where the generic top-moment exponent is 3/2 and the
sufficient target needs an exponent strictly below 36/25.

Disposition. The only factorization the actual right coefficient carries
is u=eq: by [endpoint-fourier (4)-(5)](endpoint-fourier.md) and
[grouped-divisor-moment (13)](grouped-divisor-moment.md), the prime-power
term of A_1 is exactly the Dirichlet convolution of mu(.)(.)^(-s)1_J with
Lambda 1_[2,Z], Z=floor(x^(1/20)). Keeping that factorization and taking
the first Cauchy inequality over (m,q) rather than over m gives the block
bound (D1) below. At the target box it lowers the worst sector exponent from
41/40 ([left-divisor-signs section 4](left-divisor-signs.md)) to 407/400;
the box is not controlled. Regionally, (D1) controls the strip
delta<71/100, delta+3nu<327/200 outside the previous region, and section
6 adds the corresponding cut to W_dagger.

Open. Target (21) at the target box; every sufficient signed margin; the
corner a=b=1, where (D1) is worse than the grouped bound. The variant that
discards the structure, (R,q)<=q in the Weil term, returns exactly the
generic 103/100; that is the step identified by the stop rule, and it is
not taken here.

## 2. Exact statement

Notation follows [grouped-divisor-moment section 1](grouped-divisor-moment.md)
and [RESEARCH-HANDOFF section 4](RESEARCH-HANDOFF.md). Let x>=8; all lengths
are at most a fixed power of x and the constants may depend on that power
and on epsilon. Let M,E,Q,A>=1, let I_m be an integer subinterval of (M,2M],
H a subset of the integers in [A,2A], g in {1,2}, theta=2/g, sigma in
{-1,1}, and Phi_{u,h}(m), v=Ax/(MN), f=min(1,v) as in that section, with
N:=EQ. Let

\[
 \mathcal Q\subseteq[Q,2Q)\ \text{a set of prime powers},\qquad
 0\le\lambda(q)\le\log(2Q),\qquad
 \beta:(E,2E]\cap\mathbb Z\to\mathbb C,\ |\beta|\le1,
\]

and define the structured right coefficient and the block

\[
 b_u=\sum_{q\in\mathcal Q,\ q\mid u}\beta(u/q)\lambda(q),\qquad
 T=\sum_{m\in I_m}a_m\sum_{u}b_u\sum_{h\in H}c_h1_{(m,u)=1}
     e_u(\sigma\theta h\bar m)\Phi_{u,h}(m),                     \tag{1}
\]

with |a_m|<=log x and |c_h|<=C/A, C fixed. The support of b_u lies in
(N,4N]. In the application a_m=A_left(gm) and, for g=1, u=eq with
beta(e)=-mu(e)e^{-s}1_J(e), lambda=Lambda; the g=2 branch is the relabelling
of [left-divisor-signs section 1, item 3](left-divisor-signs.md), which
keeps the same shape with beta bounded by one and lambda(q)=log 2 on powers
of two. The sectors of A_right without a prime power (A_0 and the -mu log
term) are not of the form (1) with Q>1; they are handled by the grouped
bound with b=nu and are already controlled at every box considered below.

**Lemma H (harmonic gcd average with a fixed prime-power factor; derived
here).** Let q=p^k be a prime power, l_1,l_2>=1 coprime integers, A>=1,
H a subset of the integers in (A,2A] or in [A,2A] (the counts in the
proof hold on either interval with the same constants; section 2 above
and grouped-divisor-moment section 1 use the closed one). For h_1,h_2 in
H put R=h_1l_2-h_2l_1 and read (0,q)=q. Then

\[
 \sum_{h_1,h_2\in H}(R,q)^{1/2}(h_1,l_1)^{1/2}(h_2,l_2)^{1/2}
 \le(k+1)\tau(l_1)\tau(l_2)\bigl[4A^2+2^{3/2}A^{3/2}q^{1/2}\bigr].  \tag{2}
\]

**Block bound (D1; derived here).** Under the hypotheses above, for every
fixed epsilon>0,

\[
 |T|\ll_\epsilon x^\epsilon f\Bigl[M\Bigl(\frac{NQ}{A}\Bigr)^{1/2}
   +(1+v)^{1/2}\Bigl(M^{1/2}N^{3/2}\bigl(Q^{-1/4}+A^{-1/4}\bigr)+MQ\Bigr)\Bigr].
                                                                    \tag{3}
\]

For comparison, [grouped-divisor-moment (14)](grouped-divisor-moment.md)
with the first Cauchy in m gives, in the same normalisation,
x^epsilon f[M(N/A)^(1/2)+(1+v)^(1/2)(M^(1/2)N^(3/2)+M)]. So (3) multiplies
the zero term by Q^(1/2), the period term by Q, and the cross term by
Q^(-1/4)+A^(-1/4).

**Exponents.** Write M=x^a, N=x^b, Q=x^sigma and alpha=a+b-1 for the top
harmonic band A=MN/x, where f=1 and v=1. The band that binds is the top one
(section 4, step 6). The block exponents of (3) are

\[
 \frac{1+a+\sigma}{2},\qquad
 \frac a2+\frac{3b}2-\frac{\min(\sigma,\alpha)}4,\qquad a+\sigma.      \tag{4}
\]

At the target box (delta,nu)=(8/25,9/20), top sector a=14/25, b=1/2,
sigma=1/20, alpha=3/50: the exponents are 161/200, 407/400, 61/100. The
cross exponent is 407/400 against 103/100 from the grouped moment, a saving
of exactly 1/80. The box is not controlled: the deficit is 7/400.

**Sector union at the target box.** With a=8/25+rho, b=9/20+sigma for the
left prime power r~x^rho, 0<=rho<=6/25, and the right one q~x^sigma,
0<=sigma<=1/20, and using for each sector the best of the grouped bound,
Lemma II of left-divisor-signs and (D1), the worst surviving sector
exponent is 407/400, attained at (rho,sigma)=(6/25,1/20); before this note
it was 41/40. The survivor set shrinks from 885 to 730 of the 40401 lattice
sectors and is nonempty.

**Region.** For a box (delta,nu) with delta+nu>=19/25 (every box outside
the existing region), alpha>=sigma=1/20 in the top sector, and (3)
controls the box, in the sense max of (4) below one with fixed margin,
exactly when

\[
 \delta<\tfrac{71}{100}\qquad\text{and}\qquad\delta+3\nu<\tfrac{327}{200}.
                                                                    \tag{5}
\]

The existing region is delta+nu<19/25, or 5delta+2nu<123/50, or
(delta<19/25 and delta+3nu<161/100). On the 191 x 191 rational lattice of
the validator, (5) minus the existing region has 245 boxes, for instance
(1/2,93/250) with (D1) exponents 179/200, 1981/2000, 79/100. The product
witness (8/25,11/25) has (D1) cross exponent 401/400 and stays
uncontrolled, so the uniform product threshold remains every fixed
exponent below 19/25. At the corner a=b=1 the (D1) zero budget is 41/40,
worse than the grouped value 1.

## 3. Prior-work and novelty check; source hypothesis matrix

**Local prior work read.** [grouped-divisor-moment](grouped-divisor-moment.md)
sections 1-6 (the moment, its proof, (12), (21));
[small-divisor-kernel](small-divisor-kernel.md) (reciprocity separation,
Bettin-Chandee 129/125, DFI 1267/1200, the coprime-pair localisation of the
deficit); [left-divisor-signs](left-divisor-signs.md) (sector split of the
LEFT coefficient, Lemma I, Lemma II, 41/40, the right-orientation Lemma II
at 207/200); [signed-moment](signed-moment.md) sections 0-6 (Lemmas A, B,
the arrangement table); [readiness review C](history/reviews-0906/21-readiness-review.md)
(joint Cauchy in (m,h) priced at 103/100, no region);
[structural-literature-audit](structural-literature-audit.md) sections 2-4;
the OUTCOMES entries for those five ids and for reachability-coverage.

**Why this variant.** The first-dispatch memory named joint Cauchy in
(m,h) as unpriced; readiness review C has since priced it at a+b/2,
a/2+3b/2, a, so 103/100 at the target box with no region, and the
signed-moment OUTCOMES entry says a new attempt must change an estimate or
hypothesis, not reprice joint Cauchy. The arrangement table of
signed-moment section 6 lists Cauchy in m, u, h, (m,h), Holder, and Type
I/II on mu(m); left-divisor-signs uses the convolution structure of the
LEFT coefficient only, and its right-orientation Lemma II is a Cauchy in e
with modulus m, a different object. No note in the corpus takes the first
Cauchy over (m,q) with q the right prime power while keeping the modulus
u=eq and the second moment over e. The deficit sector is exactly
q>x^(3/100) (left-divisor-signs section 4), so the factor is present with
a fixed positive exponent where the deficit sits. That is the reason for
the choice; it was fixed before any calculation.

**Technique provenance.** Applying Cauchy-Schwarz with a short factor of
the modulus held outside, so that the resulting moment runs over pairs
sharing that factor, is a standard device of the dispersion method and is
not claimed as new. The owning convention is the dispersion-method rows of
[SEARCH-CONVENTIONS section 1](SEARCH-CONVENTIONS.md) (Cauchy-Schwarz,
gcd sums, completion, composite-modulus Weil bound). No web search was run
in this pass and no locator for the device is recorded; the claim of this
note is only that the arrangement is new to this corpus and that its
pricing at this block is as stated.

**Source matrix.**

| Import | Source, version, locator | Hypotheses | Discharge | Unmatched |
|---|---|---|---|---|
| Completion bound (7) of grouped-divisor-moment, for every subinterval, composite modulus c, any numerator r, G=(r,c) | [Pascadi, Lemmas 3.2-3.3](https://link.springer.com/article/10.1007/s00039-026-00746-0), read 2026-09-06 and re-read in the primary text on 2026-09-09 | complete Kloosterman sums S(t,r;c) with the Ramanujan and Weil bounds; finite Fourier completion of an interval | modulus c=qj l_1l_2 and numerator sigma theta R are integers, c polynomially bounded; same use as (7) | none; reuse at the recorded scope |
| Endpoint variation (6) | grouped-divisor-moment section 2, derived there | Phi as in (1), endpoints at most x | unchanged | none |
| Harmonic and common-divisor gcd averages (9) | grouped-divisor-moment section 3, derived there | alpha in [0,1], R nonzero for the j-average | used for the j_e average only; the q factor is handled by Lemma H | none |
| Collision count (4) of structural-literature-audit | derived there | u_i in (N,2N], h_i in (A,2A] | applied with e_i in (E,2E] | none |
| Lemma H | this note, section 4 | q prime power, (l_1,l_2)=1, H in (A,2A] | proved below; checked finitely | none |
| Chebyshev bound sum_{q<2Q}Lambda(q)<=4Q | elementary (psi(y)<=2y for y>=1, Rosser-Schoenfeld range not needed at this crudeness) | none | used once | none |

No modern bilinear, spectral or trace-function theorem is imported.

## 4. Proof of Lemma H and of (D1)

**Lemma H.** Write (R,q)^(1/2)<=sum_{0<=i<=k}p^{i/2}1_{p^i|R}: for R
nonzero with (R,q)=p^{i_0} the term i=i_0 alone is p^{i_0/2}, and for R=0
the term i=k is q^(1/2). Likewise (h,l)^(1/2)<=sum_{d|l, d|h}d^(1/2).
Hence the left side of (2) is at most

\[
 \sum_{i\le k}\ \sum_{d_1\mid l_1}\ \sum_{d_2\mid l_2}(p^id_1d_2)^{1/2}
 \,\mathcal N(i,d_1,d_2),\qquad
 \mathcal N=\#\{(h_1,h_2)\in H^2:\ d_1\mid h_1,\ d_2\mid h_2,\ p^i\mid R\}.
\]

Since (l_1,l_2)=1, p divides at most one of l_1,l_2. Suppose p does not
divide l_1 (the other case is symmetric under 1<->2, R->-R). For each h_1
the condition p^i | h_1l_2-h_2l_1 puts h_2 in one residue class modulo p^i,
because l_1 is invertible modulo p. Together with d_2 | h_2 the solutions
h_2 form one class modulo lcm(d_2,p^i) or none; an interval of length A
contains at most 2A/lcm(d_2,p^i)+1<=2A/max(d_2,p^i)+1 of them. The number
of h_1 in (A,2A] divisible by d_1 is at most 2A/d_1 (zero when d_1>2A, at
most A/d_1+1<=2A/d_1 when d_1<=A, at most 1<=2A/d_1 otherwise). If d_2>2A
there is no h_2, so d_2<=2A may be assumed. Therefore the contribution of
(i,d_1,d_2) is at most

\[
 (p^id_1d_2)^{1/2}\frac{2A}{d_1}\Bigl(\frac{2A}{\max(d_2,p^i)}+1\Bigr)
 \le\frac{4A^2}{d_1^{1/2}}+\frac{2A\,q^{1/2}(2A)^{1/2}}{d_1^{1/2}},
\]

using (p^id_2)^(1/2)<=max(d_2,p^i), p^i<=q and d_2<=2A. Summing
d_1^(-1/2) over the divisors of l_1 gives at most tau(l_1), summing 1 over
the divisors of l_2 gives tau(l_2), and there are k+1 values of i. This is
(2). The case p | l_1 exchanges the roles of the indices and gives the same
bound. QED.

**(D1).** Step 1, the Cauchy inequality over (m,q). By (1) and the
definition of b_u,

\[
 T=\sum_{m\in I_m}\sum_{q\in\mathcal Q}a_m\lambda(q)Y_q(m),\qquad
 Y_q(m)=\sum_{e\sim E}\beta(e)\sum_{h\in H}c_h1_{(m,eq)=1}
        e_{eq}(\sigma\theta h\bar m)\Phi_{eq,h}(m).
\]

The map (e,q)->u=eq need not be injective; that is immaterial, because the
inner expression depends on (e,q) only through u=eq and the double sum
equals the u-sum with coefficient b_u. Cauchy with the nonnegative weights
lambda(q) gives

\[
 |T|^2\le\Bigl(\sum_{m,q}|a_m|^2\lambda(q)\Bigr)
        \Bigl(\sum_{q\in\mathcal Q}\lambda(q)\,\mathfrak M_q\Bigr),\qquad
 \mathfrak M_q=\sum_{m\in I_m}|Y_q(m)|^2,                           \tag{6}
\]

and the first factor is at most M log^2 x times sum_q lambda(q), at most
MQ log^2 x log(2Q) since [Q,2Q) holds at most Q prime powers; the
logarithms are absorbed in x^epsilon.

Step 2, the moment for fixed q. Expand |Y_q(m)|^2 over ordered pairs
(e_1,h_1),(e_2,h_2). Put j=(e_1,e_2), e_i=jl_i, (l_1,l_2)=1, and
c=q j l_1 l_2=lcm(qe_1,qe_2). Since c/(qe_1)=l_2 and c/(qe_2)=l_1, the two
inverse phases combine exactly as in
[structural-literature-audit (1)](structural-literature-audit.md):

\[
 e_{qe_1}(\sigma\theta h_1\bar m)\overline{e_{qe_2}(\sigma\theta h_2\bar m)}
 =e_c(\sigma\theta R\bar m),\qquad R=h_1l_2-h_2l_1,                   \tag{7}
\]

with the inverse of m modulo c, valid for (m,c)=1, which is the
coprimality condition of both terms. Checked exactly in the validator (B1)
together with the direct expansion (B3). The pair kernel is
K=sum_{m in I_m,(m,c)=1}e_c(sigma theta R mbar)F(m) with
F=Phi_{qe_1,h_1}conj(Phi_{qe_2,h_2}), and by grouped-divisor-moment (6)
and (7), for R nonzero,

\[
 |K|\ll_\epsilon x^\epsilon f^2(1+v)\bigl[\sqrt{cG}+\tfrac Mc G\bigr],
 \qquad G=(\sigma\theta R,c)\le2(R,q)(R,j)(h_1,l_1)(h_2,l_2).           \tag{8}
\]

The gcd bound uses (R,ab)<=(R,a)(R,b) and (R,l_i)=(h_i,l_i), the latter
because (l_1,l_2)=1; prime powers shared by q, j and an l_i are covered
(validator B2).

Step 3, the R=0 class. By structural-literature-audit (4) with N replaced
by E, the number of ordered pairs with h_1e_2=h_2e_1 is at most
8EA H_{floor(2 min(E,A))}, and each contributes at most (C/A)^2 f^2 M
times an absolute constant. So the R=0 part of M_q is
O(f^2 (ME/A) log x), for every q, including unequal proportional pairs
such as (e_1,h_1)=(6,3),(e_2,h_2)=(10,5).

Step 4, the Weil part on a band j~J, for fixed q. With L=E/J and (8), the
absolute sum over the pairs of |beta beta c c| sqrt(cG) is at most

\[
 \frac{C^2}{A^2}\sum_{l_1,l_2\le2L}\sqrt{2q\,l_1l_2}
 \sum_{h_1,h_2\in H,\ R\ne0}(R,q)^{1/2}(h_1,l_1)^{1/2}(h_2,l_2)^{1/2}
 \sum_{j\sim J}\sqrt{j\,(R,j)}.
\]

For fixed (l_1,l_2,h_1,h_2) the integer R does not depend on j, so
grouped-divisor-moment (9) with alpha=1/2 gives
sum_{j~J}sqrt(j(R,j))<=2^(3/2)J^(3/2)tau(|R|)<=x^epsilon J^(3/2), R being
nonzero and polynomially bounded. Lemma H bounds the harmonic double sum by
x^epsilon A^2(1+(q/A)^(1/2)). The l-sum of sqrt(l_1l_2) over l_i<=2L is
O(L^3). Dropping the coprimality and interval restrictions only enlarges a
sum of nonnegative terms. Hence the Weil part of M_q on the band is

\[
 \ll_\epsilon x^\epsilon f^2(1+v)\,q^{1/2}\bigl(1+(q/A)^{1/2}\bigr)
   \frac{E^3}{J^{3/2}},                                               \tag{9}
\]

and the geometric sum over J gives the same with J=1.

Step 5, the period part. Use (R,q)<=q in (8): then
MG/c<=2M(R,j)(h_1,l_1)(h_2,l_2)/(j l_1l_2), the factor q cancels, and the
argument of grouped-divisor-moment (11) applies verbatim: the j-average
by (9) at alpha=1, the harmonic averages by (9) at alpha=1, and
sum 1/(l_1l_2)=O(1) per dyadic band. The period part of M_q is
O(x^epsilon f^2(1+v)M) for every q.

Step 6, assembly. Summing over q in Q with weights lambda(q), and using
sum_q lambda(q)<=4Q log(2Q) (there are at most 2Q prime powers below 2Q;
Chebyshev is not even needed at this crudeness), together with
sum_q lambda(q)q^(1/2)(1+(q/A)^(1/2))<<x^epsilon(Q^(3/2)+Q^2A^(-1/2)),

\[
 \sum_q\lambda(q)\mathfrak M_q\ll_\epsilon x^\epsilon f^2
 \Bigl[\frac{MN}{A}+(1+v)\Bigl(E^3\bigl(Q^{3/2}+Q^2A^{-1/2}\bigr)+QM\Bigr)\Bigr].
\]

Multiply by the first factor 4MQ log^2 x of (6), use E^3Q^(5/2)=N^3Q^(-1/2)
and E^3Q^3A^(-1/2)=N^3A^(-1/2), and take the square root. This is (3). On a
band A<A_top=MN/x one has f=v=A/A_top, and each of the four terms of (3)
is then at most its value at A_top: f M(NQ/A)^(1/2)=A^(1/2)M(NQ)^(1/2)/A_top,
f A^(-1/4)=A^(3/4)/A_top, and f<=1 on the other two. So the top band
binds, which gives (4). QED.

**Uniformity.** (3) sees a_m only through |a_m|^2, beta only through
|beta|<=1, and lambda only through nonnegativity and its sum. The Perron
twists d^(-s), (de^3)^(-t) of [residual-coverage section 4](residual-coverage.md)
and [grouped-divisor-moment section 5](grouped-divisor-moment.md) have
nonnegative real part and sit on the original divisors d and e, so they
multiply a_m and beta(e) by factors of modulus at most one; (3) is
therefore uniform in the twist heights. Both gcd branches, both endpoint
conventions (through Phi), arbitrary harmonic subsets, all coefficient
sectors and repeated prime powers are retained, as in the grouped moment.

**Where the generic exponent reappears.** Replacing Lemma H by the trivial
(R,q)<=q in step 4 gives q E^3 in place of q^(1/2)E^3 in (9); after step 6
the cross term of (3) becomes M^(1/2)N^(3/2) with no saving, and the block
exponent at the target box is exactly 103/100 again (validator D2). This
is the step that discards the structure: it treats the fixed prime-power
factor of the modulus as if it could divide the numerator for every
harmonic pair. Using the restricted bound
[grouped-divisor-moment (12)](grouped-divisor-moment.md) as a black box
with J_0=Q instead of the direct count is worse still, 417/400, because
(12) counts every common divisor in [Q,2Q), of which only a proportion 1/q
is a multiple of q (validator D3).

## 5. Independent validation, falsifier and outcome

[structured-dispersion-estimate-validation.js](structured-dispersion-estimate-validation.js)
(deterministic, 1.1 s, one core, output bound by `node research/qc/embed.js`)
checks: Lemma H exactly on 62832 configurations of (p^k, l_1, l_2, A, H),
including 14135 with p | l_1, 14169 with p | l_2, 18410 with a proper subset
H and 7382 containing R=0 pairs, maximum ratio 0.126974 of the bound;
identity (7) with the q factor and the gcd bound of (8) on 1396 random
configurations each; the direct expansion of sum_q Lambda(q)sum_m|Y_q(m)|^2
against the ordered-pair kernel form to relative difference 1.66e-16 on a
small complex model with q in {4,5,7,9}, the endpoint factor and the
coprimality; all exponents of section 2 in exact rationals; the 191 x 191
region grid with the closed form (5) matching the budget test on every
box with delta+nu>=19/25 (0 mismatches, 245 new boxes); and the 201 x 201
sector lattice at the target box (worst 41/40 -> 407/400, survivors 885
-> 730).

Negative controls, all firing: Lemma H without its q^(1/2) tail (3
violations, from q>A with R=0 pairs); the structure-discarding step
returns exactly 103/100; the black-box (12) variant gives 417/400;
dropping the first-Cauchy factor Q would add 277 boxes instead of 245;
dropping the delta<71/100 cut would add 329; the target box is not
controlled. Section E of the validator checks the four-condition domain
of section 6: it is contained in the old domain, misses every box of the
cut set C', has fixed slack at least 1/500 under (D1) and under the
grouped bound for the non-prime-power sectors on every grid box meeting
C' (minimum slacks 77/38000 and 273/9500), and the substitution the
first draft proposed would have re-admitted the witness (73/100,29/100)
together with 1543 grid boxes (928 under V3's region definition).

These finite checks certify the elementary inputs and the arithmetic. They
do not test the completion bound (7), which is reused, and they establish
no asymptotic rate, no effective onset and no lower bound on twins.

Falsifiers and review scope. The 2026-09-09 independent review
reconstructs Lemma H, the order of summation in step 4, completion (7),
the first Cauchy factor and the cut application. The factorization
on (m,q) is a_m lambda(q); a general jointly dependent coefficient would
not justify that step. The application has its joint dependence in the
phase and Phi through u=eq, with separate original divisor coefficients
as checked in endpoint-fourier (4)–(9). All eight cut intersections are
separated by the fixed-margin Perron construction; their untwisted density
uses the excluded-prime mean over clipped d intervals. An error in one
of these steps would invalidate its stated downstream scope. The finite
validator checks algebra and budgets, not those analytic theorems.

## 6. Payoff for the full twin consumer, or the regional limit

**Global margin: none.** (3) is an upper bound for a block; it says
nothing about the sign of E_dagger. The sufficient margin
C_2x+E_dagger>=c_0x/(log x)^K, the rescaled average and the dyadic-block
form remain OPEN exactly as in RESEARCH-HANDOFF section 3.

**Target box: not controlled.** The worst sector exponent is 407/400. In
the currency of a moment, a sufficient budget through (6) is
sum_q Lambda(q) M_q^x <= x^(139/100-2eta) for the nonzero-R, small-j_e
part, against the present bound x^(57/40): a deficit of 7/200 in that
moment's exponent, 7/400 in the block. Indeed Q^(3/2)E^3 has exponent 3(1/20)/2+3(1/2-1/20)=57/40,
and the Cauchy factor MQ has exponent 14/25+1/20=61/100. Their
half-sum is 407/400. By (9), restricting to j_e>x^(7/300+epsilon)
with fixed epsilon>0 pays this deficit with positive slack. The
remaining small-gcd range includes coprime e-pairs inside a common q, the
same shape as small-divisor-kernel section 1 one level down. The
factorization does not remove the coprime-pair deficit; it shrinks it.

**Regional gain: a fourth simultaneous condition for W_dagger.** Fix

\[
 \kappa'=\tfrac{141}{200},\qquad\lambda'=\tfrac{1631}{1000},\qquad
 \mu'=\tfrac{77}{100},
\]

and define, inside the full original domain U<d<=D_0, Y<e<=E_0,

\[
 \mathcal C'=\{d\le\lfloor x^{\kappa'}\rfloor,\ de^3\le\lfloor x^{\lambda'}\rfloor,\
              de>\lfloor x^{\mu'}\rfloor\}.                            \tag{10}
\]

The new W_dagger is the set of original divisor pairs satisfying all four
of

\[
 \begin{gathered}
 de>\lfloor x^{3/4}\rfloor,\qquad d^5e^2>\lfloor x^{49/20}\rfloor,\\
 d>\lfloor x^{151/200}\rfloor\ \text{or}\ de^3>\lfloor x^{321/200}\rfloor,\\
 d>\lfloor x^{141/200}\rfloor\ \text{or}\ de^3>\lfloor x^{1631/1000}\rfloor
   \ \text{or}\ de\le\lfloor x^{77/100}\rfloor,
 \end{gathered}                                                     \tag{11}
\]

and E_dagger is the exact weighted compatible CRT endpoint sum of
[residual-coverage (16)](residual-coverage.md) over (11), with every
weight, compatibility test and endpoint convention unchanged. The fourth
condition is added alongside the third, not substituted for it:
kappa'<71/100<151/200, so C' is not a superset of the existing cut C, and
substituting would re-admit the boxes 71/100<=delta<151/200,
delta+3nu<321/200, for instance (delta,nu)=(73/100,29/100), which lies in
C, outside A and B, and outside C', with no estimate controlling it. On
the validator's grid the substitution re-admits 1543 boxes of C minus
(A union B) outside C'; under V3's definition, boxes controlled only by
the third region condition and not by the strip, the count is 928. The
first draft of this note proposed that substitution; the handler and
reader V3 caught it.

Why the lower product cut mu'. The (D1) cross budget on a box meeting C'
with delta+nu near 3/4 has min(sigma,alpha)=alpha=delta+nu-71/100, and at
(31/100,11/25) it equals exactly 1; the old first condition de>floor(x^(3/4))
does not by itself leave a fixed slack. With de>floor(x^(77/100)) every
box meeting C' has alpha>=sigma up to the dyadic slop, and on every grid
box meeting (10) the maximum of (4) is at most 1-77/38000 (grid maximum); on the continuous set the fixed slack is 1/500 (cross term, on de^3=x^(lambda')) and alpha-sigma>=1/100, so min(sigma,alpha)=sigma throughout C' (reader V3).
The boxes with 19/25<=delta+nu<77/100, delta<71/100, delta+3nu<327/200
outside the previous region (50 grid boxes) are controlled by (D1) but
are not removed by (10); they stay in W_dagger. This is a choice of
concrete constants, not a limit of the estimate.

**Claim.** For every fixed H>0, with E_dagger now over (11) and E_* the
sum of [residual-coverage (16)](residual-coverage.md),

\[
 E_*(x)-E_\dagger(x)=O_H(x/\log^Hx),\qquad
 \sum_{x/2<n\le x}\Lambda(n)\Lambda(n-2)=C_2x+E_\dagger(x)+O_H(x/\log^Hx).
                                                                    \tag{12}
\]

**Derivation.** Write W_3 for the three-condition domain of
[grouped-divisor-moment (19)](grouped-divisor-moment.md) and W_4 for
(11). Then W_4=W_3 minus (W_3 intersect C'), so the new E_dagger differs
from the old one by the exact endpoint sum R over W_3 intersect C'. With
A, B, C the cut sets of residual-coverage (13) and grouped-divisor-moment
(17)-(18), W_3 intersect C' is C' minus C' intersect (A union B union C),
and inclusion-exclusion writes R over it as a signed sum of the eight
sums R over C' intersect S, S ranging over the Boolean intersections of
A, B, C. Each of these sets is contained in C', so every dyadic box
meeting it meets C'. The old reduction gives E_*-E_dagger^(old)=O_H;
what has to be shown is R(C' intersect S)=O_H(x/log^H x) for each S.

Three inputs, all existing.

1. Endpoint part on a box meeting C'. The right-orientation block bound
   (3) applies to every prime-power sector with fixed slack: by the
   validator's section E, on every grid box meeting (10) the maximum of
   (4) is at most 1-77/38000, and (4) is monotone in the sector exponents
   (rho,sigma), so the top sector bounds every sector. The sectors without
   a prime power (A_0 and the -mu log term, b=nu) are covered by the
   grouped bound (14) of grouped-divisor-moment, whose budgets (1+a)/2,
   a/2+3nu/2, a are at most 1-273/9500 on the same boxes. Both bounds are
   uniform in the Perron twist heights (section 4, Uniformity), in both
   gcd branches and both endpoint conventions, and absorb dyadic and
   floor constants in the fixed slack, exactly as grouped-divisor-moment
   section 5 argues for C.

2. Separation of the cuts. Each condition in (10), (13) and (17)-(18) is
   a threshold on a monomial in d and e. residual-coverage (14) separates
   each indicator by a truncated Perron integral with real part 1/log x,
   height T_P=x^10 and the half-integer shift: 1_{q<=K}=P_K(q)+O((K+1)/T_P).
   The lower cut de>floor(x^(mu')) is 1 minus such an indicator. The
   monomials d, de^3, de, d^5e^2 give twists d^(-s), (de^3)^(-t),
   (de)^(-w), (d^5e^2)^(-r) with nonnegative real parts, which sit on the
   original divisors d and e and multiply A_left(gm) and beta(e) by
   factors of modulus at most one; input 1 is uniform in them. The
   indicators are separated on each dyadic box meeting C' intersect S;
   boxes not meeting it contribute zero exactly, so the "1" term of the
   lower cut never runs over boxes without slack. An
   intersection of at most seven threshold conditions costs at most seven
   Perron integrals, O(log^7 x). The pointwise indicator errors are
   O(x^(kappa')/T_P), O(x^(lambda')/T_P), O(x^(mu')/T_P) and the older
   ones; the absolute mass of the unaggregated endpoint terms is
   O(x^2 log^C x) by residual-coverage section 4, so the total separation
   error is O(x^(2+49/20-10) log^C x), negligible.

3. Density part. At fixed e, the admissible d for C' intersect S form
   one interval per S (reader V3) with lower endpoint at least
   max(U/2, x^(mu')/e) and upper endpoints among floor(x^(kappa')),
   floor(x^(lambda'))/e^3 and the older thresholds, clipped with U, D_0.
   The uniform excluded-prime Mobius lemma of
   [signed-divisor-grouping](signed-divisor-grouping.md) applies on each
   interval, as in residual-coverage section 4 and grouped-divisor-moment
   section 5, and the outer harmonic sums cost fixed logarithms. Each
   untwisted density is O_H(x/log^H x); no twisted Mobius estimate at
   large height is used.

Combining inputs 1-3 gives R(C' intersect S)=O_H(x/log^H x) for each of
the eight S, hence for W_3 intersect C', hence (12). The scope statement
of grouped-divisor-moment section 5 carries over unchanged: this is a
smaller summation domain for E_dagger, not a monotonicity statement about
its signed value, and the sufficient margins of RESEARCH-HANDOFF section 3
remain OPEN with the new E_dagger substituted. The uniform product
threshold stays at every fixed exponent below 19/25, because (8/25,11/25)
remains uncontrolled at 401/400, and the corner is untouched. The target
box stays at 407/400.


## 7. Validation and integration

The owning validator is
[structured-dispersion-estimate-validation.js](structured-dispersion-estimate-validation.js).
It checks Lemma H, pair algebra, moment expansion, rational regional
budgets and the fourth-condition correction with negative controls.
The independent exponent regression is in
[research-round-validation.js](research-round-validation.js). No research
census or new data is needed. The 2026-09-09 review and source scope are
in [research-round-validation.md section 10](research-round-validation.md).
OUTCOMES and the handoff now use the four-condition domain and corrected
small-gcd target; there is no outstanding documentation dispatch.

## 8. One justified next move, or the reopening condition

The 2026-09-09 independent reading accepts (D1) and the fourth condition
at their stated scope: Lemma H, completion (7), the separate divisor
coefficients in endpoint-fourier (4)–(9), Perron separation of the eight
intersections and the untwisted density intervals were checked. The
exact exponent control in research-round-validation.js checks the
corrected target below. A future attempt must name a mechanism that
saves this remaining exponent before another region scan.

Reopening condition for the target box: an estimate for the coprime
e-pair class inside a common prime power q, with j_e<=x^(7/300+epsilon), saving
more than x^(7/200) over the majorant Q^(3/2)E^3 of (9) in the moment
sum_q Lambda(q)M_q; equivalently more than 7/400 in the block exponent at
the top sector (rho,sigma)=(6/25,1/20). The left Mobius signs mu(d), the
right signs mu(e) and the left Lambda(r) are still used only through
absolute values here; any of them is an unexploited input.

History of this note: research/history/CHANGELOG.md.
