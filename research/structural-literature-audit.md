# Literature structures for the signed endpoint remainder

<!-- ledger
id: Q-structural-literature-audit
status: ANSWERED
todo: C
parity: Signed Mobius divisor correlations, exact CRT endpoint phases and classical completion; theorem interfaces are checked for coefficient dependence, modulus, length and averaging. No universal parity obstruction is asserted.
question: Which established mathematical structures match the current endpoint remainder, and which concrete next estimate is justified by a broad literature audit?
verdict: Exact gcd/lcm normalization identifies dispersion coefficients, classifies equal frequencies and cancels the common-factor Mobius sign on the squarefree sector. The reviewed spectral, bilinear, trace-function, graph and correlation theorems do not directly close the residual. In the natural level diagnostic the structured spectral improvement disappears for common factors at most x^0.27. The grouped-divisor follow-up derives the proposed full moment using classical completion and controls the benchmark; its next small-common-divisor kernel and the global twin margin remain OPEN.
-->

**Checked 2026-09-06. No twin-prime lower bound is claimed.** The
[grouped-divisor follow-up](grouped-divisor-moment.md) consumes this
audit's proposed moment and derives an additional controlled region.
This note is a theorem-interface audit and a derivation
of reusable kernel identities. It is not an exhaustive bibliography, a
proof of optimality, or a claim that no other theorem applies. The relevant
successes and unsuccessful imports share one entry in [OUTCOMES](OUTCOMES.md).

## 1. What an imported result must actually do

[Residual coverage](residual-coverage.md), (16)--(20), is the current
specification. With w=6/25 and v=1/20 the original divisor exponents lie in
delta in [0.24,0.76] and nu in [0.05,0.95]. The controlled region is
delta+nu<0.76 or 5delta+2nu<2.46. The concrete remaining E_* retains
de>floor(x^0.75) and d^5*e^2>floor(x^2.45), including the margin strips.

For every fixed H the named inputs give

\[
 \sum_{x/2<n\le x}\Lambda(n)\Lambda(n-2)
 =C_2x+E_*(x)+O_H(x/\log^H x).
\]

An OPEN sufficient target is C2*x+E_*(x)>=c*x/log^K x on unbounded
dyadic scales, for fixed positive c,K. The precise rescaled average in
[endpoint-target-audit.md](endpoint-target-audit.md) is also sufficient.
An estimate on unweighted Liouville correlations is a different premise.

At delta=nu=2/5 the expanded lengths are M=x^(16/25), N=x^(9/20).
The critical harmonic length is A~MN/x=x^(9/100). The old right block
budgets are 0.895 (nonzero completion), 1.02 (equal frequency after an
extra Cauchy inequality), and 0.84 (complete periods). Thus improving
only the first term cannot close this box. In the specified right
first-power sector the signed cross-divisor moment needs an upper bound
O(x^(34/25-epsilon)); the current bound has exponent 7/5. More than
1/25 in the moment exponent is required. A moment improvement contributes
half as much to the final block exponent.

Every proposed import must retain composite moduli, actual coefficient
norms, both gcd branches, endpoint weights and their variation, complete
periods, and uniformity in the divisor twists used for exact cuts. The
full positive majorant already has a separate bound in
[endpoint-pairing.md §5](endpoint-pairing.md).

## 2. The exact dictionary: common factors, frequencies and signs

This section is derived here from the native phase, independently of the
newer theorem inputs. Write e_c(t)=exp(2*pi*i*t/c), theta=2/g, g in {1,2}.
For two reduced right divisors u1=e1*q1 and u2=e2*q2 put

\[
 j=(u_1,u_2),\qquad u_i=j\ell_i,\qquad(\ell_1,\ell_2)=1,
 \qquad c=[u_1,u_2]=j\ell_1\ell_2.
\]

For (m,c)=1, the two inverse phases combine exactly as

\[
 e_{u_1}(-\theta h_1\bar m)
 \overline{e_{u_2}(-\theta h_2\bar m)}
 =e_c(r\bar m),\qquad
 r=-\theta(h_1\ell_2-h_2\ell_1).                 \tag{1}
\]

Indeed the inverse modulo c reduces to each smaller modulus, and
c/u1=ell2, c/u2=ell1. The endpoint factor multiplying (1) is

\[
 \Phi_{u_1,h_1}(m)\overline{\Phi_{u_2,h_2}(m)},\quad
 \Phi_{u,h}(m)=e\left(\frac{hz_0}{gmu}\right)
             -e\left(\frac{hz}{gmu}\right).             \tag{2}
\]

The reciprocal orientation instead uses the opposite inverse sign and
both shifted endpoints z0-2,z-2. Formula (1) also applies to general
aggregated divisors u, without a squarefree assumption.

**Equal frequencies.** For positive harmonics,

\[
 r=0\ \Longleftrightarrow\
 (h_1,h_2)=t(\ell_1,\ell_2),\qquad t\in\mathbb Z_{>0}. \tag{3}
\]

This follows from coprimality of the ell_i. If u_i~N and h_i~A, such
pairs require j>N/(2A). At the benchmark this means j of scale at
least x^0.36, up to constant factors. Equal frequencies can have
different original divisors and different primes: u1=6,u2=10,
h1=3,h2=5 is an example. Zero *integer numerator* in (3) must be
distinguished from a nonzero numerator divisible by c; the latter still
needs its full gcd loss.

A useful elementary count is

\[
 \#\{u_i\in(N,2N],h_i\in(A,2A]:h_1u_2=h_2u_1\}
 \le 8NA\,H_{\lfloor2\min(N,A)\rfloor},                \tag{4}
\]

where H_k=sum_(s<=k)1/s, for N,A>=1. To prove this, write the solutions
as u_i=j*ell_i,h_i=t*ell_i with coprime ell_i. For k=max(ell1,ell2)
there are at most 2k ordered pairs; the numbers of possible j,t are at
most floor(2N/k),floor(2A/k). Sum 8NA/k. Dropping the lower interval
endpoints only enlarges the count. This is a derived count, not an
estimate for the entire signed moment.

**Common-factor signs.** In the squarefree first-power sector, q_i is
odd, q_i does not divide e_i, and mu(g*e_i) is nonzero. Consequently
u_i is squarefree and j,ell1,ell2 are pairwise coprime. Then

\[
 \mu(ge_1)\mu(ge_2)=\mu(u_1)\mu(u_2)
                         =\mu(\ell_1)\mu(\ell_2).      \tag{5}
\]

For g=2 the live e_i are odd; the two mu(g) factors cancel. Thus there
is no oscillating mu(j) left in this particular product. There are
still squarefreeness restrictions on j, prime-divisor conditions,
interval cuts, logarithmic weights and divisor twists. Formula (5)
does **not** make the full modulus weight constant or well-factorable.

**Nonzero gcds.** With R=h1*ell2-h2*ell1 nonzero,

\[
 (\theta R,j\ell_1\ell_2)
 \le2(R,j)(h_1,\ell_1)(h_2,\ell_2).                  \tag{6}
\]

Use (R,ab)<=(R,a)(R,b), then coprimality of ell1,ell2. This inequality
does not require j coprime to either ell_i, so repeated prime powers
are included. For J>=1 and 0<=sigma<=1,

\[
 \sum_{J<j\le2J}(R,j)^\sigma\le2J\tau(|R|).         \tag{7}
\]

Expand the gcd power using its divisors as an upper bound; a divisor
d<=2J contributes at most 2J/d multiples. This is invalid at R=0,
which is why (3)--(4) precede it.

**Completion.** For a finitely supported weight F, let
Fhat(t)=sum_m F(m)e_c(-tm). Then exactly

\[
 \sum_{(m,c)=1}F(m)e_c(r\bar m)
 =\frac1c\sum_{t\bmod c}\widehat F(t)S(t,r;c),
 \quad S(t,r;c)=\sum_{a\bmod c}^{*}e_c(ta+r\bar a). \tag{8}
\]

Fourier inversion proves (8). In this application F includes (2), so
Fhat depends on both harmonics and divisors. Separate arbitrary
coefficients in a bilinear theorem do not include an arbitrary matrix
of these dependencies.

## 3. The closest analytic structures, with their interfaces

Sources below are primary papers; the indicated statements were read,
not inferred from titles. Version labels identify what was checked.
Statements are imported only where explicitly said; resemblance alone
does not supply an estimate.

### A. Spectral large sieves for dispersion coefficients

[Pascadi, *Large sieve inequalities for exceptional Maass forms and the
greatest prime factor of n²+1*, arXiv:2404.04239v3](https://arxiv.org/html/2404.04239v3),
Theorem 3, treats coefficients

\[
 a_n=\sum_{h_1\ell_1-h_2\ell_2=n}
 \Phi_1(h_1/H)\Phi_2(h_2/H)e(h_1\alpha_1+h_2\alpha_2),
\]

with coprime ell_i~L, smooth fixed-derivative weights and level q>=constant*L².
Its exceptional-spectrum bound has right side
(qaH)^epsilon*(1+aK/q)*(||a_n||²+gcd(a,q)*K*(H/L+H²/L²)),
where n~K. The permitted spectral weight is

\[
 X_{\rm sp}\ll\max(1,q/(aK))
 \max\left(1,\frac{KH}{(H+L)L\mathcal D}\right),\quad
 \mathcal D=\min_{t\ge1,\ i=1,2}(t+(K/L)\|t\alpha_i\|).
\]

Theorem 2 handles single exponential sequences. These are estimates for
the exceptional Maass spectrum; a full Kuznetsov application also has
regular, continuous and, where present, holomorphic contributions.

**Our translation and a limitation.** Equation (1) supplies the same
linear difference after swapping the ell labels. On j~J, take L=N/J,
H=A, numerator length K~HL. A possible level is q~L², but its actual
Kuznetsov realization still needs proof. Even granting that realization,
a=1 and the most favorable phases alpha_i=0, when H<=L the additional
factor is comparable to max(1,H²/L). For L>=H² it contributes no power
improvement over the general large sieve's max(1,q/K,q²/K³).

At the benchmark L=x^0.45/J,H=x^0.09. Thus **J<=x^0.27 has no such
structured advantage** in this diagnostic. Smaller numerator bands do
not improve that factor. Large J may benefit, but its contribution is
also cheaper in the provisional classical-completion budget below.
Arbitrary spectral levels, new factorizations or another orientation
could change this conclusion. It is not a closure of spectral methods.
Before applying this source, construct the modulus average, price the
squarefree j weight and all endpoint separations, then compare total
budgets. An earlier G₂ theorem comparison did not perform this match.

### B. Composite-modulus bilinear sums and quadratic characters

[Blomer--Pascadi, *Bilinear forms with Kloosterman sums via quadratic
characters*, arXiv:2607.24311v1](https://arxiv.org/html/2607.24311v1),
27 July 2026 preprint, Theorem 1.1, applies to all positive moduli c,
separate complex coefficient sequences on intervals of length <=B<=c,
and a unit a modulo c. With (m,n,c)=1 its bound for sum alpha_m beta_n
S(am,n;c) is

\[
 \|\alpha\|_2\|\beta\|_2c^{1+o(1)}
 (B^{1/8}c^{-3/32}+B^{5/16}c^{-3/16}+B^{2/3}c^{-7/18}).
\]

At B=sqrt(c) this saves c^(-1/32). The coprimality constraint can be
omitted for both intervals {1,...,B}. Theorem 5.5 gives an unequal-length
variant. Theorem 1.6 also improves a general exceptional-spectrum bound.

**Match still missing:** (8) has coupled Fhat and variable c; neither is
covered just by choosing separate alpha,beta. At small J, c~x^0.9/J.
Even a hypothetical one-for-one saving c^(-1/32) at J~1 corresponds to
only x^(-9/320), less than the old required moment saving x^(-1/25).
This is a budget warning, not a legal application or a bound on what
repeated amplification could accomplish. Investigate after locating a
genuinely separated short bilinear piece.

[Pascadi, *Non-Abelian Amplification and Bilinear Forms with Kloosterman
Sums*, published version](https://link.springer.com/article/10.1007/s00039-026-00746-0),
Theorems 1.1--1.2, offers another interface: general-modulus savings and
stronger savings using a suitable factorization of c. For squarefree c
with a balanced divisor, Theorem 1.2's displayed factor can save c^(-1/12)
at square-root lengths. This is potentially more useful than the uniform
exponent, but the required lengths, coprimality and coefficient separation must be
paid. Its Lemmas 3.2--3.3 are the classical Ramanujan/Weil inputs already
used here. The full-dual-spectrum operator obstruction in
[prime-band-completion.md](prime-band-completion.md) remains valid at
its stated scope; it does not exclude a restricted structured application.

### C. Centered dispersion and convolution structure

[Pascadi, *Smooth numbers in arithmetic progressions to large moduli*,
arXiv text](https://arxiv.org/html/2304.11696), Theorem 4.1 and §5,
treats convolutions of three bounded sequences with explicit restrictions
on their lengths and the modulus range. Its power-saving error subtracts
**all characters of conductor <=D**, not just the principal character.
For D=1 the displayed error does not give a power saving. The
deamplification step retains the centered combination
S1-2*Re(S2)+S3 before estimating it. The journal version numbers the
triple-convolution theorem differently; use the arXiv numbering here.

This suggests checking whether the density comparator can be retained
inside an earlier dispersion moment, or whether a useful extra factor
can be exposed. Neither our determinant equation nor (5) automatically
provides the required three independent sequences. Small-conductor
character terms would become an additional obligation, not a free main
term. This is a structural alternative if direct completion stalls.

[Fouvry--Radziwiłł, *Level of distribution of unbalanced convolutions*,
Theorem 1.1](https://arxiv.org/pdf/1811.08672), is a second interface:
it keeps an explicit progression-distribution error E*(beta,N,Q) and
requires an unbalanced length range, including M>Q*(MN)^epsilon.
That error must be bounded for the actual coefficient. Its improved
distribution level is not a theorem for every bounded convolution.

[Pascadi, *On exponents of distribution of primes and smooth numbers*,
Definition 1.1 and Theorem 1.3](https://arxiv.org/html/2505.00653),
gives fixed-residue prime distribution with triply well-factorable
weights through X^(5/8-epsilon). The definition requires bounded
convolution representations for **every** factorization of the level
into three prescribed sizes. One convenient factorization does not
suffice. The associated twin-prime application is an upper bound.
Neither a missing lower bound nor the needed well-factorability of our
signed weights is supplied. This extends the line of
[Maynard's well-factorable estimates](https://arxiv.org/abs/2006.07088)
(abstract used for this bibliographic link only).

### D. Trace functions and multiplicative orthogonality

[Fouvry--Kowalski--Michel--Sawin, *Bilinear forms with trace functions*,
arXiv:2511.09459v3, Theorem 1.1](https://arxiv.org/html/2511.09459v3),
gives power savings for prime-modulus trace-function bilinear sums with
M,N<=q/2, M>=q^delta and MN>=q^(3/4+delta). Its simplified statement
requires irreducible geometric monodromy, with a simple algebraic
identity component or a finite quasisimple group. The bounded-complexity
sheaf and those hypotheses must be
identified for the actual transformed kernel. Our variable composite
lcm modulus is not that input. CRT alone does not control the resulting
weights or establish the geometric hypothesis. Retain this as a possible
tool for a prime-modulus piece, not for (8) without further work.

[Korolev--Shparlinski, *Sums of algebraic trace functions twisted by
arithmetic functions*, Theorem 2.1](https://arxiv.org/pdf/1804.01337),
does retain mu(n): for a nonexceptional isotypic trace function of
bounded conductor modulo prime p, and N>=p^(1/2+epsilon), it bounds the
sum by O(epsilon^(-1)*N*loglog(p)/log(p)). This is a **logarithmic**
saving. It cannot by itself pay the fixed exponent deficit of the
benchmark, even if the modulus and function hypotheses were supplied.
No statement here excludes a later use at a logarithmic boundary.

[Bourgain--Sarnak--Ziegler, *Disjointness of Möbius from horocycle flows*,
Theorem 2](https://arxiv.org/pdf/1110.0992), replaces multiplicative
orthogonality by estimates of F(p1*m)*conj(F(p2*m)) for distinct small
primes. It gives a concrete alternative way to preserve mu instead of
discarding it by Cauchy. The paper's horocycle consequence concerns a
fixed dynamical system; it gives no uniform rate for our growing moduli
and scale-dependent observables. A determinant-2 matrix description is
not by itself a transfer to that theorem. Use the criterion only after
exhibiting and bounding its dilation correlations.

### E. Divisibility graphs, parity correlations and weaker averages

[Helfgott--Radziwiłł, *Expansion, divisibility and parity*, Main Theorem](https://arxiv.org/html/2103.06853),
studies the centered operator

\[
 Af(n)=\sum_{p,\sigma=\pm1}
             (1_{p\mid n}-1/p)f(n+\sigma p)
\]

on an interval, with endpoint restrictions. After deleting a quantified
exceptional set its norm is O(sqrt(K*sum_p 1/p)), for the stated
subpower-sized prime ranges. This is a concrete link between exact
divisibility arrangements and signed correlations. It uses centered
adjacency and trace estimates, not independent random prime strikes.
Our endpoint operator has different edges and weights. Applying this
method would require a transfer identity, a norm estimate and a bound
for the prime-detection mass on the deleted set.

[Pilatte, *Improved bounds for the two-point logarithmic Chowla
conjecture*, Theorem 1.1](https://arxiv.org/html/2310.19357v2),
uses this direction of ideas, including products of primes and
non-backtracking methods, to obtain
sum_(n<=x) lambda(n)*lambda(n+1)/n=O((log x)^(1-c)) for some c>0.
The prime-conditioned quantity we need is not that correlation. This
is the most relevant longer-term connection to the original fold
viewpoint, but it currently has a larger translation gap than (1)--(8).

[Tao--Teräväinen, *Quantitative correlations and some problems on prime
factors of consecutive integers*, arXiv:2512.01739v2, Theorem 3.1](https://arxiv.org/html/2512.01739v2),
April 2026 version, gives quantitative correlations of 1-bounded
multiplicative functions outside a small set of logarithmic scales.
Its nonpretentious/equidistribution axioms are explicit; progression
moduli and shifts are bounded by a small power of a parameter <=log X.
Remark 3.2 includes Liouville correlations for linear forms with
polylogarithmic coefficients. This quantifier pattern is relevant to our
averaged sufficient target. Our polynomially growing coefficients,
inverse-residue phases and truncated divisor weights do not satisfy
that interface merely by normalization. An average over scales does
not remove these discrepancies or replace prime detection by parity.

### F. Asymptotic sieve: the consumer, not a missing input for free

[Friedlander--Iwaniec, *Asymptotic sieve for primes*, Theorem 1 and
hypotheses (R),(B)](https://arxiv.org/pdf/math/9811186),
turns distribution plus a signed bilinear hypothesis into a prime
asymptotic for a nonnegative sequence. The displayed distribution level
satisfies x^(2/3)<D<x; (B) is an additional cancellation hypothesis on
mu(mn)*a_(mn), with specified truncated-divisor weights and lengths.
Choosing a_n=Lambda(n-2) does not establish either hypothesis. This is
a useful template for recognizing what extra arithmetic buys a prime
conclusion; invoking it with an unproved bilinear axiom would only
rename our remaining problem. The existing prime-detection specification
already supplies a consumer adapted to this project.

## 4. Research order changed by the audit

**The full grouped-moment test is completed in the follow-up.** The
1.02 term arose after an extra Cauchy step. The
[written classical-input proof](grouped-divisor-moment.md) improves it
without assuming Mobius cancellation in the moment.
Retain the whole aggregated right coefficient b_u, whose pointwise
logarithmic bound is already derived, and examine

\[
 \mathfrak M=\sum_{m\sim M}\left|
   \sum_{u\sim N}b_u\sum_{h\sim A}c_h1_{(m,u)=1}
       e_u(-\theta h\bar m)\Phi_{u,h}(m)\right|^2.     \tag{9}
\]

The resulting **derived estimate**, for the actual coefficients and
endpoint weights on retained bands, is

\[
 \mathfrak M\ll x^\epsilon
              [x+x^{3\tau}(N^3+M)].                  \tag{10}
\]

Here |c_h|<=constant/A, the polynomial cutoff is
ceil(x^(2*tau)*max(1,MN/x)), and the original convolution classes and
divisor twists are all included in the follow-up's proof. Its argument
uses the classical completion inputs; (10) is not an application of an
unmatched modern bilinear theorem.

The proof of (10) uses (4), with the paired endpoint envelope
f=min(1,Ax/(MN)), for a zero contribution of size
f²*MN/A times logarithms, at most x times logarithms. For nonzero
numerators, (6)--(8) allow summing over j~J and ell_i~N/J before
forgetting their common-factor geometry. The classical square-root
term has budget N³/J^(3/2); complete periods have budget M, up to
arbitrarily small losses. The follow-up proves the general harmonic
gcd averages and endpoint variation bound uniformly, including repeated
prime powers in the full aggregated coefficient.

First Cauchy with ||alpha||²<=M times logarithms gives block exponents

\[
 (1+a)/2,\quad a/2+3b/2,\quad a,
 \qquad a=\log_x M,\quad b=\log_x N.                 \tag{11}
\]

At a=16/25,b=9/20 these are 0.82,0.995,0.64, before small losses.
The follow-up consumes every box and the exact extra cut
d<=floor(x^(151/200)), de³<=floor(x^(321/200)). This controls the
full benchmark, with small losses paid. Finite checks are separate from
that derivation. The global twin margin is not proved and the combined
uniform product threshold has not increased.

**Next: estimate the remaining small-common-divisor kernels.** At
delta=8/25,nu=9/20 the follow-up's (21) needs more than 3/50 in the
moment exponent; all pairs with common divisor above x^(1/20) are
already controlled. Match a complete Kuznetsov formula and price §3A on the relevant
j ranges. Consider §3B only for a separated short bilinear subexpression,
using the factorization of c where available. A theorem's headline
saving is never a multiplier to insert into an unrelated bound.

**Third: consider a centered dispersion or graph reformulation if the
analytic translation remains too expensive.** For §3C specify the
convolution and small-conductor correction. For §3E first write a
prime-detection transfer with its exceptional-set error. These are
bounded mathematical deliverables, not requests for a larger prime run.
Do not restart the earlier local residue sweeps, full-spectrum norm
test, or fixed-coefficient Chowla comparison without a changed input.

## 5. Validation and falsifiers

[structural-literature-validation.js](structural-literature-validation.js)
checks (1), (3), (5), (6) with exact integer arithmetic, tests the
collision parametrization and bound (4), and compares direct weighted
inverse sums with the complete Fourier formula (8). Negative controls
use the product in place of the lcm, omit theta=2, and extend the
squarefree sign identity outside its hypotheses. Rational arithmetic
checks the spectral diagnostic and the conditional exponent budgets.
The deterministic summary is retained in
[structural-literature-validation.json](structural-literature-validation.json).

These tests can detect indexing, phase and budget errors, but do not
verify the imported papers' proofs. The separate proof and validator for
(10) are in the follow-up. A counterexample to
any exact identity, an overlooked hypothesis in a cited statement, or
a power loss invalidating the moment assembly would change the priority
decision. The source comparison is scoped to the displayed interfaces;
no theorem-absence or novelty assertion is made.

Verification on 2026-09-06: the custody-bound validator completes in
0.2 seconds; all fourteen strict QC gates have zero findings, and the
verifier self-test passes its 58 positive and 47 negative controls.
The existing independent [numerical audit](audit-numbers.js) passes
251/251 checks in 164.2 seconds. These checks cover their stated finite
and documentation scopes; they are not a substitute for the follow-up's
analytic proof of (10).
