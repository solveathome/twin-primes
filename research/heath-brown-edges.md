# Is the a=1 edge an artefact of the two-cutoff Vaughan identity?

<!-- ledger
id: Q-heath-brown-edges
status: ANSWERED
todo: C
parity: The only inputs are exact Dirichlet-convolution identities (Vaughan, Heath-Brown at every level K, Vaughan for mu, Linnik), an elementary subset-sum lemma proved here, and rational bookkeeping over the block exponents (1+a)/2, a/2+3b/2, a that grouped-divisor-moment.md derives and this note takes as given. No arithmetic estimate is derived, no imported analytic theorem is revalidated, and no parity or impossibility claim is made. The conclusion is a statement about four named identities under one named argument shape, and its scope is exactly that.
question: Does the a=1 edge, and hence the corner S_0, come from the particular two-cutoff Vaughan identity in prime-detection-spec.md and shifted-prime-decomposition.md, or does an equivalent edge reappear under Heath-Brown's identity and the other standard decompositions of Lambda?
verdict: The exact identities and exponent simplex leave a=1 in separately bounded formal pieces, including Heath-Brown's balanced j=K configuration. This does not prove an intrinsic edge after identity-piece cancellation. The bounded-cofactor object has affine dilations, not literally F(n)F(n-2). Linnik's fixed truncation has a large term-wise absolute tail by an elementary counting proof; its signed tail is not thereby bounded below. Heath-Brown K=3 narrows the classical split band, with coefficient and Type I normalization obligations retained. No full alternative reduction, new region or twin margin follows.
-->

**Twin-prime infinitude and the sufficient signed margin remain OPEN.**
This classifies formal pieces under the grouped-moment argument. It
neither proves that those pieces survive signed recombination nor
excludes another decomposition. [Readiness review F8](history/reviews-0906/21-readiness-review.md)
corrects the identity-piece, bounded-cofactor and tail conclusions.

Companion validator:
[heath-brown-edges-validation.js](heath-brown-edges-validation.js),
49 checks, three active negative controls, 1.1 s. It checks the identities and
the combinatorics exactly and validates none of the imported analytic estimates.

Baseline: [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) sections 3-4, and the
budget table of [reachability-coverage.md](reachability-coverage.md) section 1,
which is used here as given and not re-derived.

---

## 0. What is being asked, and what would count as an answer

[reachability-coverage.md](reachability-coverage.md) proves, inside the
grouped-moment shape, that no improvement to the nonzero kernel of any size
reaches the corner

\[
 S_0=\{d>x^{19/25-2\eta_0}\}\cap\{e>x^{19/20-2\eta_0}\},
\]

because the zero-frequency budget is (1+a)/2 with a=delta+w, and a=1 makes it
exactly 1 while a kernel saving gamma enters only the cross budget. Its section
2.3 records that a=1 survives every admissible cutoff choice inside *that*
identity. The open question this note takes up is one step further out: is a=1
a property of Vaughan's two-cutoff identity, or of the twin sum?

An answer has to fix three things, because sloppiness on any one of them
produces a false positive:

1. **The identity.** Which decomposition of Lambda(n), and of Lambda(n-2).
2. **The shape.** Which argument consumes the pieces. Here it is the grouped
   moment of [grouped-divisor-moment.md](grouped-divisor-moment.md) section 1,
   whose budgets are the ones being priced.
3. **The definition of a.** a is *not* the split exponent of the bilinear form.
   It is the exponent of the variable carrying the arbitrary coefficient, and
   which variable that is is forced by the shape, not chosen.

Point 3 is where the false positive lives, and section 4 spells it out.

---

## 1. How a=1 arises in Vaughan, written as a statement about the identity

Notation of [RESEARCH-HANDOFF §3](RESEARCH-HANDOFF.md): x=2^j, J_x=(x/2,x],
w=6/25, v=1/20, U=V=floor(x^w), Y=Z=floor(x^v),
beta_W(k)=sum_{r|k, r>W} Lambda(r).

**Vaughan's identity** ([prime-detection-spec §4 (10)](prime-detection-spec.md)) is

\[
 \Lambda=\Lambda_{\le V}+\mu_{\le U}*L-\mu_{\le U}*\Lambda_{\le V}*1
        +\mu_{>U}*\Lambda_{>V}*1 ,
\]

and its last term is exactly
sum_{d>U, k>V, dk=n} mu(d) beta_V(k). Both statements are verified exactly in
validator section B, with the negative control that dropping the bilinear term
breaks the identity first at n=160.

**Statement V (scope: expanded envelopes).** The coefficient expansion
beta_V(k)=log k-sum_(r|k,r<=V)Lambda(r) introduces divisors l=d*r with
r<=V, of envelope scale D*V. Thus the separately bounded pieces permit
a=delta+w up to 1. This r is not the prime cofactor above V in the raw
residual. If k is prime above V the small-r sum is empty. If k=2r with
r<=V prime and k>V, away from powers of 2, beta_V(k)=0 and the expanded
terms cancel exactly. The formal a=1 envelope is therefore not a proof
that the original residual has unavoidable mass of that scale.

The validator's finite band-support measurements remain diagnostics.
They do not exclude cancellation between the log and small-prime terms.
The full aggregated coefficients, not either summand separately, must
be used in any proposed saving. No intrinsic-edge theorem is asserted.

---

## 2. Heath-Brown's identity

**Statement (imported).** For U>=1 and K>=1, valid on n <= U^K,

\[
 \Lambda=\sum_{j=1}^{K}(-1)^{j-1}\binom Kj\,
        \mu_{\le U}^{*j}*1^{*(j-1)}*L ,
\]

equivalently, with z=x^{1/K} and n<=x,

\[
 \Lambda(n)=\sum_{j=1}^{K}(-1)^{j-1}\binom Kj
   \sum_{\substack{m_1\cdots m_j n_1\cdots n_j=n\\ m_i\le z}}
    \mu(m_1)\cdots\mu(m_j)\log n_1 .
\]

*Derivation, for the record.* Let M(s)=sum_{m<=U} mu(m) m^{-s}. The Dirichlet
series 1-zeta(s)M(s) has n-th coefficient -sum_{m|n, m<=U} mu(m), which
vanishes for n=1 and for 1<n<=U, so it is supported on n>U and
(1-zeta M)^K is supported on n>U^K. Since
1/zeta = M/(zeta M) = M * sum_{j>=0}(1-zeta M)^j, and -zeta'/zeta is the
Dirichlet series of Lambda,

\[
 \Lambda \;=\; -\zeta'M\sum_{j=0}^{K-1}(1-\zeta M)^j
 \quad\hbox{on } n\le U^K ,
\]

and expanding the binomial with
sum_{j=i}^{K-1} binom(j,i) = binom(K,i+1) gives the display. Both forms are
verified exactly in validator section A for K=1..5, by resolving the logarithm
prime by prime (set log p=1 and log q=0; every value becomes an integer and the
identity is Z-linear in the vector (log p)_p, so this is exact and complete).
The negative control at K=2, U=8 shows a deviation of 12 above U^K=64, so the
range restriction is load-bearing.

**What the pieces contain, and what they do not.** A piece has j <= K Mobius
variables, each of size at most x^{1/K}, and j free variables, one carrying
log n_1 and the rest carrying 1. **There is no prime detector anywhere in the
identity**: no Lambda, no beta_W, no restriction to integers with a prime factor
above a cutoff. This is the first structural difference from Vaughan and it
answers one half of the brief's question directly.

**Answer to "is there an edge with one Mobius variable of size x^(1-1/K) whose
cofactor is a single prime?" — No, on both counts (derived).** Individual Mobius
variables are capped at x^{1/K}; a variable of size x^{1-1/K} exists only as an
*aggregate* of several, whose coefficient is a divisor-bounded convolution and
not mu. And no variable in the identity is prime-supported, so no cofactor is
forced prime. At the edge where an aggregate reaches x^{1-1/K}, its cofactor is
a free variable of size x^{1/K} running over a full interval with weight 1 or
log. That configuration is exactly the *good* one. The a=1 edge sits somewhere
else, and section 4 locates it.

---

## 3. The classical Type I / Type II classification, with the lemma proved

**Lemma G (derived, and checked exhaustively).** *Let K>=3 and let
v_1,...,v_r>0 sum to 1 with every v_i <= 1-1/K. Then some subset of the v_i has
sum in [1/K, 1/2].*

*Proof.* Sort descending and let i be least with P_i = v_1+...+v_i >= 1/K; such
an i exists since the total is 1. Put s' = P_{i-1} < 1/K and s = P_i. If
s <= 1/2 the subset {1,...,i} works. Otherwise s > 1/2. If i=1 then
v_1 = s > 1/2, and since v_1 <= 1-1/K the complement 1-v_1 lies in [1/K, 1/2).
If i>=2 then v_1 <= s' < 1/K and v_i <= v_1, so s < 2/K; for K>=4 this
contradicts s>1/2, and for K=3 it gives s in (1/2, 2/3), whose complement lies
in (1/3, 1/2) = (1/K, 1/2). QED

Validator section D: exhaustive over rational compositions, 2,368 at
denominator 30 with cap 2/3, no failure; lifting the cap to 1 produces 94
failing compositions, so the hypothesis v_i <= 1-1/K is not decorative. The
same statement at [1/K,1/2] under cap 1-1/K checks on 195,009 compositions at
K=4 and 195,299 at K=5. The lemma fails at K=2 (0.4, 0.4, 0.2 has no subset
summing to exactly 1/2), which is why K>=3 is in the hypothesis.

**Corollary C1 (derived, classical).** *Fix K>=3 and dyadically decompose a
Heath-Brown piece. Either some free variable exceeds x^{1-1/K}, in which case
every other variable together is below x^{1/K} and the piece is a Type I sum
with arbitrary-coefficient modulus d < x^{1/K} and a single long free variable
carrying 1 or log; or no variable exceeds x^{1-1/K}, and by Lemma G the piece
admits a split n = m*l with min(m,l) in [x^{1/K}, x^{1/2}], a Type II sum.*

The first branch uses that the Mobius variables are at most x^{1/K} <= x^{1-1/K},
so a variable above x^{1-1/K} is always free. Note that the Type I branch has
*exactly one* long variable, so no Type III (several long smooth variables)
configuration arises there; the log, if it sits on a short variable, is
absorbed into the coefficient at a cost of one factor log x.

**Front-end comparison (derived; validator section I).** With the Type I input
supplied by Bombieri-Vinogradov at level x^{1/2}:

| front end | Type I level required | hard Type II band (min part) |
|---|---|---|
| Vaughan, U=V=x^{6/25} (the programme's current choice) | x^{12/25} | [6/25, 1/2] = [0.24, 0.5] |
| Vaughan, best under a Type I level of x^{1/2} (u=v=1/4) | x^{1/2} | [1/4, 1/2] |
| Heath-Brown K=3 | x^{1/3} | [1/3, 1/2] |
| Heath-Brown K=4 | x^{1/4} | [1/4, 1/2] |
| Heath-Brown K=5 | x^{1/5} | [1/5, 1/2] |

For Vaughan with U=x^u, V=x^v the bilinear piece has d>U and k>V, so its splits
have min part exponent at least min(u,v), and min(u,v) is maximised at
u=v=1/4 subject to the Type I level u+v <= 1/2. So **the narrowest hard band a
two-cutoff Vaughan can leave is [1/4, 1/2], and Heath-Brown K=3 leaves the
strictly narrower [1/3, 1/2] while asking Bombieri-Vinogradov for less.** That
is the classical reason the Heath-Brown identity is preferred, and it is not
novel; it is recorded here because the programme's current front end is at 6/25,
below even the best Vaughan value.

The coefficients in the Heath-Brown Type II pieces are divisor-bounded
convolutions. Their normalization must be included in an actual estimate;
x^epsilon division is not free against only fixed logarithmic savings.

---

## 4. The moment-shape parameter a, and where the edge actually sits

**What the shape requires.** The grouped moment of
[grouped-divisor-moment §1](grouped-divisor-moment.md) bounds blocks of

\[
 \sum_{m}A_{\rm left}(gm)\,Y(m),\qquad
 Y(m)=\sum_{u\sim N}b_u\sum_{h\in H}c_h1_{(m,u)=1}
       e_u(\sigma\theta h\bar m)\Phi_{u,h}(m),
\]

with Phi carrying the phase e(h z'/(g m u)). That phase is the Fourier
expansion of the sawtooth counting n <= z with m | n and u | n-2. So the sum
being estimated is

\[
 \sum_{m}\sum_{u}\alpha_m\beta_u\cdot
   \#\{n\le x:\ m\mid n,\ u\mid n-2\}\ (\hbox{endpoint part}),
\]

**and the two cofactors n/m and (n-2)/u are summed freely inside that count.**
They carry no coefficient. Any weight on a cofactor is outside this shape.
Consequently, for a piece of any identity:

\[
 \boxed{\,a=1-\max_i\nu_i\,}
\]

where the maximum runs over the *free* variables (coefficient 1, or log, which
partial summation and the split log n_1 = log n - log(rest) both accommodate:
this is exactly how A_1 in [RESEARCH-HANDOFF §4](RESEARCH-HANDOFF.md) is
written). Everything else is absorbed into the divisor. **a is one minus the
largest free-variable exponent, not the split exponent of the bilinear form.**
Reading a as the split exponent is the false positive this section exists to
block: under that misreading Heath-Brown K=3 would give (a,b)=(2/3,1/3),
budgets 5/6, 5/6, 2/3, all below 1, and hence a proof of the twin prime
conjecture. It does not, because a Mobius variable cannot serve as the
unweighted cofactor.

**Supremum of a over Heath-Brown pieces (derived).** A piece has exponents
mu_1..mu_j <= 1/K and nu_1..nu_j >= 0 with sum mu + sum nu = 1. Then
sum nu >= 1 - j/K, so max_i nu_i >= (1-j/K)/j = 1/j - 1/K, and

\[
 a\le\min\Bigl(1,\ 1-\frac1j+\frac1K\Bigr),
\]

attained by mu_i = 1/K for every i and equal nu_i. Validator section E
confirms this closed form on an exhaustive rational grid for K=3,4 and every
j <= K.

| K | j | sup a | zero budget (1+a)/2 | configuration attaining it |
|---|---|---|---|---|
| 3 | 1 | 1/3 | 2/3 | one mu at x^{1/3}, one free variable at x^{2/3} |
| 3 | 2 | 5/6 | 11/12 | two mu at x^{1/3}, two free at x^{1/6} |
| 3 | 3 | **1** | **1** | three mu at x^{1/3}, every free variable bounded |
| 4 | 1 | 1/4 | 5/8 | |
| 4 | 2 | 3/4 | 7/8 | |
| 4 | 3 | 11/12 | 23/24 | |
| 4 | 4 | **1** | **1** | four mu at x^{1/4}, every free variable bounded |
| K | K | **1** | **1** | K Mobius variables at x^{1/K}, all free variables bounded |

**The exponent simplex has sup a=1 only at j=K, all Mobius
variables of exponent 1/K and all free variables of exponent zero.**
Exponent zero permits subpower growth as well as bounded variables;
this classification does not rule out signed cancellation between pieces. The edge is not removed; it is relocated, from "long Mobius times one
prime just above a cutoff" to "balanced K-fold Mobius convolution times a
bounded cofactor". The free variables are bounded but not all equal to 1, since
log n_1 = 0 when n_1 = 1; n_1 >= 2 of bounded size is what survives, and the
per-term weight there is O(1) rather than the (log r)(log r') of the Vaughan
corner.

**The edge is a block, not a single dyadic box.** For any eta_0>0 the
configurations with every free variable below x^{2*eta_0} have
a > 1 - 2*eta_0 and zero budget above 1 - eta_0, so with
eta_0 = C*loglog x/log x, the affected set is geometrically a block of
dyadic configurations that never empties. This choice has not been
justified analytically: [reachability-coverage §2.5](reachability-coverage.md)
and independent review F3 identify the unpriced x^epsilon losses. Nothing here depends on the free variables
being literally bounded.

Applying the identity to Lambda(n-2) as well puts b=1 at the mirror
configuration, so **(a,b)=(1,1) reappears**. Validator section F, the decisive
row:

| configuration | zero | cross | periods | uniform saving gamma required |
|---|---|---|---|---|
| Vaughan corner S_0, (a,b)=(1,1) | 1.0000 | 2.0000 | 1.0000 | unbounded |
| Heath-Brown K=3 corner, (1,1) | 1.0000 | 2.0000 | 1.0000 | unbounded |
| Heath-Brown K=4 corner, (1,1) | 1.0000 | 2.0000 | 1.0000 | unbounded |
| Heath-Brown K=3 second worst, (5/6,5/6) | 0.9167 | 1.6667 | 0.8333 | 4/3 |
| Heath-Brown K=4 second worst, (11/12,11/12) | 0.9583 | 1.8333 | 0.9167 | 5/3 |
| Vaughan benchmark, (16/25,9/20) | 0.8200 | 0.9950 | 0.6400 | 0 (controlled) |
| Vaughan target box, (14/25,1/2) | 0.7800 | 1.0300 | 0.5600 | 3/50 |

The corner rows are identical across the identities because gamma never enters
the zero budget, which is [reachability-coverage §2.1](reachability-coverage.md)
verbatim. Even setting the corner aside, the second-worst Heath-Brown
configurations ask for 4/3 and 5/3 against the 3/50 currently sought at one box,
that is 22 and 28 times.

**A caveat that limits this transplant.** The moment bound
[grouped-divisor-moment (2)](grouped-divisor-moment.md) holds for arbitrary
bounded coefficients, so its *exponents* transfer to Heath-Brown pieces without
further hypotheses. The surrounding reduction does not transfer for free: the
coupled cut separation, the density subtraction and the endpoint conventions of
[residual-coverage §4](residual-coverage.md) are written for R(x) and would have
to be redone. The table above is therefore an ASSESSMENT of what the same shape
would give, at the level of exponents, not a re-derivation.

---

## 5. The object at the Heath-Brown corner

Fix the free variables on each side and put l=product n_i,
l'=product n'_i. The actual correlation is

    sum_(l*m-l'*m'=2) F(m)F'(m') log n_1 log n'_1,

with all original product and interval restrictions retained. Even when
l,l' are bounded, they cannot be replaced by 1: log n_1 vanishes at
n_1=1. This is a bounded-affine-form correlation, not literally
F(n)F(n-2) multiplied by O(1). For subpower free variables the affine
parameters grow and need their own uniform estimates.

The validator's four finite F_3 measurements are single-coefficient
absolute masses and a random-sign diagnostic. They prove neither
asymptotic mass of this two-factor correlation nor the absence of
identity-piece cancellation. No complexity ordering of the full corner
and this coefficient family follows.

---

## 6. The other route: keep Lambda(n-2), and Maynard's Question 17

[Maynard's ICM article, §6 Question 17](https://www.mathunion.org/fileadmin/IMU/Prizes/Fields/2022/jm.pdf)
asks for Type II estimates for arbitrary bounded coefficients against
Lambda(nm+2); the subsequent discussion also addresses decomposing both
prime variables. These are research questions, not impossibility theorems.
The source and Lemma 18 were checked again in the local readiness review.

Two readings, both calibrated as literature import, not as theorems about our
coefficients.

**(i) The programme's B(x) is already a Question 17 object.** Before the second
decomposition, [prime-detection-spec §4 (11)](prime-detection-spec.md) has
B(x) = sum_{d>U, k>V} mu(d) beta_V(k) w(dk), which is Question 17's shape with
alpha = mu, beta = beta_V and min split exponent 6/25. Under Heath-Brown K=3
the analogous requirement would be Question 17 for min part in [1/3, 1/2],
strictly narrower.

**(ii) R(x) is the four-variable shape Maynard flags.**
[RESEARCH-HANDOFF §3](RESEARCH-HANDOFF.md)'s
R(x) = sum_{dk-et=2} mu(d) mu(e) beta_V(k) beta_Z(t) is exactly
sum_{nm+2=rs} alpha beta gamma delta with our four specific coefficients. Our
coefficients are not arbitrary, so this is not a refutation of the second
decomposition; it is a recorded calibration point against it, from a primary
source, and it agrees with what
[reachability-coverage §5.2](reachability-coverage.md) reached independently.

**Research comparison, not an ordering by logical strength.** The
pre-second-decomposition bilinear object is a possible place to seek a
new input. Its arbitrary-coefficient asymptotic, if supplied with the
needed Type I estimates, would imply the target, but no reverse
implication is established. The full-corner bound is equivalent to the
sufficient margin only after assuming its still-open complement. These
facts do not prove that one object is logically smaller, or that the
second decomposition lost mathematical information. Both are open
research formulations; a useful next move must supply an estimate
rather than repeat the classification. See the independent handoff
review and the exact full-corner identity in corner-correlation (4).

Maynard's Lemma 18 (same article, section 6.1, read at the source) records the
Vaughan bookkeeping: a Type I range [0, gamma] and a Type II range
[alpha, alpha+beta] with beta+gamma>1 give the asymptotic. With gamma=1/2 from
Bombieri-Vinogradov and the reflection [alpha,beta] -> [1-beta,1-alpha], this
needs Type II down to alpha < 1/4, consistent with the third row of the table
in section 3.

---

## 7. Linnik's identity, for completeness

Linnik's identity is exact:
Lambda(n)/log n=sum_(k>=1)(-1)^(k-1)d_k^(>=2)(n)/k.
Its variables are free; the k-th formal piece has a<=1-1/k.
The validator verifies the finite identity but its growth measurements
alone do not establish a large asymptotic tail.

A proof for the **term-wise absolute** tail is available: after a fixed
truncation K, retain k=K+1. Choose the first k-1 factors in
[2,x^(1/(2(k-1)))] and the last in (x/(2d),x/d], where d is their
product. There are gg_K x*(log x)^(k-1) such tuples. Multiplying by
log n/k gives gg_K x*(log x)^k absolute tail mass for Lambda on J_x.
This closes discarding the tail term by term, not estimating its signed
sum. The full proof is in readiness review F8.

Vaughan's identity for mu also creates formal pieces with no free
cofactor. Neither identity analysis excludes cancellation on recombination.

---

## 8. Consequence and reuse conditions

The exact identity, subset-sum lemma and exponent simplex are reusable.
Their formal a=1 configuration survives a change of front end under
separate bounds, but it is not an intrinsic obstruction for all arguments.
The joint-Cauchy arrangement has now been priced in readiness review C
and adds no region. The full alternative Heath-Brown density subtraction,
cut separation and Type I/II estimates have not been derived here.

The 1/2 in the BV comparison table is a limiting exponent with logarithmic
slack. An untrimmed U=V=x^(1/4) is not available at that endpoint. Also,
dividing divisor-bounded coefficients by x^epsilon is not automatically
harmless for a bound giving only arbitrary fixed logarithmic savings:
the coefficient loss must be priced in the actual application.

A future attempt must change an estimate or exploit an explicit
cancellation identity. Repeating the simplex or citing finite absolute
mass as a lower bound for a signed correlation is not a new attempt.
A weighted-cofactor moment would be a different theorem: its budgets
cannot be inferred by substituting a new split exponent into the existing
CRT kernel. No numerical value for that hypothetical theorem is claimed.

---

## 9. Imported sources, with version and hypotheses

| source | what is taken | checked where | hypotheses that matter |
|---|---|---|---|
| D. R. Heath-Brown, *Prime numbers in short intervals and a generalized Vaughan identity*, Canad. J. Math. **34** (1982), no. 6, 1365-1377, DOI 10.4153/CJM-1982-095-9 | the identity of section 2 | bibliographic details and abstract confirmed at the publisher's page (Cambridge Core, fetched 2026-09-06); the identity itself is derived in section 2 above and verified exactly in validator section A, not taken on trust | valid only for n <= U^K; the negative control shows it fails above that |
| Iwaniec-Kowalski, *Analytic Number Theory*, AMS Colloq. Publ. 53 (2004), Prop. 13.3 | the same identity, stated there at K=10 with the log on the last free variable | **NOT checked at the primary source.** Located only at second hand in a web search summary. The placement of the log is immaterial by symmetry of the free variables, and validator section A checks both placements | flagged as an unverified citation; the identity does not depend on it |
| Tao, *What's new*, Heath-Brown identity tag | the convolution form Lambda = sum_j (-1)^{j-1} C(K,j) mu_{<=U}^{*j} * 1^{*(j-1)} * L, valid up to U^K | fetched and read 2026-09-06; agrees with section 2 | none beyond U^K |
| J. Maynard, *Counting primes*, ICM 2022 (Fields Medal article), section 6 | Question 17 verbatim, the four-variable remark verbatim, the Type I/II definitions (6.1)-(6.2), Lemma 18 | fetched as PDF and read at the source, 2026-09-06 | Question 17 and Lemma 18 are stated for 1-bounded sequences and a comparison set B; our coefficients are divisor-bounded, so the normalisation differs by x^epsilon |
| Bombieri-Vinogradov, as used by the programme | Type I level x^{1/2} in section 3's table | not revalidated here; see [prime-detection-spec §3](prime-detection-spec.md) | the level is x^{1/2-epsilon} with a fixed logarithmic loss, which is what the table uses |
| [grouped-divisor-moment.md](grouped-divisor-moment.md), [reachability-coverage.md](reachability-coverage.md) | the block budgets (1+a)/2, a/2+3b/2, a and the fact that gamma enters only the cross budget | taken as given, not re-derived | if the budget list is wrong or incomplete, section 4's table is wrong; [reachability-coverage §5.3](reachability-coverage.md) lists that verification as still outstanding there |

Friedlander-Iwaniec, *Opera de Cribro*, chapters 16 and 18 were **not** reachable
in this session and are not cited. No claim in this note depends on them.

---

## 10. Validation and limits

[heath-brown-edges-validation.js](heath-brown-edges-validation.js) checks, with
integer or exact-rational arithmetic throughout: the Heath-Brown identity for
K=1..5 in both the convolution and the expanded 2j-variable form; Vaughan's
identity at three cutoff pairs and the equality of its bilinear term with the
beta_V form; the counted density of the Vaughan a=1 configuration; Lemma G
exhaustively over rational compositions at four denominators and at K=4,5; the
closed form for sup a on an exhaustive grid at K=3,4; the budget table; Linnik's
identity to N=400,000 with its truncation mass; the measured mass and sign
control of the Heath-Brown balanced configuration; and the front-end comparison.
49 checks, 0 failures.

Three active negative controls, all of which fire: the Heath-Brown identity
deviates by 12 above U^K when the range restriction is violated; dropping
Vaughan's bilinear term breaks the identity at n=160; lifting Lemma G's cap
from 1-1/K to 1 produces 94 failing compositions.

**Limits.** The identity checks are at n <= 900 (Heath-Brown, Vaughan) and
n <= 400,000 (Linnik); they establish the identities as identities, not any
asymptotic. The density and mass figures in sections 1 and 5 are measured at
X <= 2^22 and are diagnostics, not rates. The budget arithmetic revalidates
none of the analytic inputs behind those budgets. The transplant of the budgets
to Heath-Brown pieces is at the level of exponents only. Nothing here adds a
controlled region, and the sufficient twin margin remains OPEN.
