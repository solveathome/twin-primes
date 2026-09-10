# Reachability of the remaining endpoint domain under nonzero-kernel improvement

<!-- ledger
id: Q-reachability-coverage
status: ANSWERED
todo: C
parity: Rational bookkeeping over the grouped-moment block budgets, plus an elementary count of the corner's absolute term mass. No new arithmetic estimate is derived and no imported analytic input is revalidated. The ceiling established here is a property of one argument shape (arbitrary bounded coefficients, one Cauchy inequality in the left divisor, zero frequencies bounded absolutely); no universal parity obstruction, no impossibility theorem and no necessity of any particular future mechanism is asserted. The reduction of the corner to a binary Mobius correlation is algebra, not an obstruction claim.
question: Which part of the original divisor domain can no improvement to the grouped moment's nonzero kernel reach, in either orientation, and what would a uniform saving on that kernel actually buy?
verdict: The zero-frequency and complete-period budgets do not contain the cross term, so for every saving, including an unbounded one, the corner d>x^(19/25-2eta0) and e>x^(19/20-2eta0) stays uncontrolled in both orientations. A uniform total moment saving gamma reduces the leftover to that corner exactly at gamma=2 and at no smaller value; the current local target is gamma>3/50 at one box. Clearing either edge apart from the corner also costs gamma tending to 2. With eta0 of order loglog x/log x the unreachable set is the top O(loglog x) by O(loglog x) block of dyadic boxes, and a single top box carries absolute term mass with leading constant (log 2)^2 times x. The sufficient twin margin remains OPEN and nothing here changes it.
-->

**Twin-prime infinitude remains OPEN, and the sufficient margin
C_2*x+E_dagger(x) >= c_0*x/(log x)^K remains OPEN.** This note establishes
no arithmetic estimate. It prices the grouped-moment block budgets of
[grouped-divisor-moment.md](grouped-divisor-moment.md) against the domain
they have to cover, and identifies the part of that domain the budgets
cannot reach whatever happens to the nonzero kernel. A larger controlled
exponent area is not a lower bound on twins, and exponent area does not
measure remaining signed mass; that caveat applies to every table below.

The ceiling here is a limitation of one argument shape. It is not an
impossibility theorem, and it does not say that some other argument
cannot reach the same region.

Companion validator: [reachability-validation.js](reachability-validation.js),
artifact [reachability-validation.json](reachability-validation.json).
It is closed-form rational arithmetic over the stated inequalities and
validates none of the imported analytic estimates.

## 1. Coordinates, budgets and the two edges

Notation follows [residual-coverage.md §1](residual-coverage.md) and
[grouped-divisor-moment.md §4](grouped-divisor-moment.md): d~x^delta,
e~x^nu, a=delta+6/25, b=nu+1/20, with the original domain
delta in [6/25,19/25], nu in [1/20,19/20], so a in [12/25,1] and
b in [1/10,1]. The right block budgets after
[grouped-divisor-moment (14)](grouped-divisor-moment.md) are (1+a)/2
for the zero frequencies, a/2+3b/2 for the nonzero Weil term and a for
the complete periods; the left orientation swaps a and b.

Introduce the edge distances

\[
 p=\frac{19}{25}-\delta=1-a,\qquad
 q=\frac{19}{20}-\nu=1-b,\qquad
 0\le p\le\frac{13}{25},\quad 0\le q\le\frac9{10}.
\]

DERIVED, by substitution (validator section A, 2,438 rational boxes):

| orientation | zero | cross, generic | periods |
|---|---|---|---|
| right | 1 - p/2 | 2 - p/2 - 3q/2 | 1 - p |
| left | 1 - q/2 | 2 - q/2 - 3p/2 | 1 - q |

Since 1-p/2 >= 1-p for p>=0, **the zero budget dominates the period
budget everywhere in the domain**, so the period term never binds where
the zero term does not.

Let gamma>=0 denote a uniform total saving in the moment exponent
relative to the generic nonzero budget 3b on the right and 3a on the
left. The cross budgets become 2-p/2-3q/2-gamma/2 and 2-q/2-3p/2-gamma/2.

**Dictionary to the local target.** In
[grouped-divisor-moment (21)](grouped-divisor-moment.md) the target at
(delta,nu)=(8/25,9/20) is X_small <= C*x^(36/25-eta), and
36/25 = 3/2 - 3/50, so **gamma = 3/50 + eta_(21)**. That note's "needs
more than 3/50" is gamma>3/50 at that box. CHECKED: first Cauchy gives
sqrt(F^2 * X) with F^2 = M = x^(14/25), and
sqrt(x^(14/25)*x^(3/2-gamma)) = x^(103/100-gamma/2) = x^(a/2+3b/2-gamma/2),
which is x^(1-eta_(21)/2) at gamma = 3/50+eta_(21). Using eta_(21) in
place of gamma is a live error mode; it is an active negative control in
the validator (`wrongCauchyDictionary`).

Fix the required strict margin eta_0>0, meaning all three budgets of an
orientation are at most 1-eta_0. DERIVED and checked as an equivalence on
6,156 (box,gamma) pairs in validator section B:

\[
 \hbox{right usable}\iff p\ge2\eta_0\ \hbox{and}\ p+3q\ge2-\gamma+2\eta_0,
\]
\[
 \hbox{left usable}\iff q\ge2\eta_0\ \hbox{and}\ 3p+q\ge2-\gamma+2\eta_0.
                                                                  \tag{1}
\]

The factor 2 on eta_0 in the zero condition is exact: (1+a)/2 <= 1-eta_0
is a <= 1-2*eta_0. The period condition p >= eta_0 is implied by it.

## 2. The unreachable set

### 2.1 The corner, for every saving

The cross term appears in neither the zero nor the period budget.
Therefore, DERIVED from (1) for every gamma, including an unbounded one,
the right orientation is unusable when p<2*eta_0 and the left orientation
is unusable when q<2*eta_0. The set no nonzero-kernel improvement reaches
in either orientation is exactly

\[
 S_0(\eta_0)=\{p<2\eta_0\}\cap\{q<2\eta_0\}
  =\{d>x^{19/25-2\eta_0}\}\cap\{e>x^{19/20-2\eta_0}\},
                                                                  \tag{2}
\]

equivalently, with k=n/d and t=(n-2)/e the two cofactors carrying the
beta weights,

\[
 V<k<x^{6/25+2\eta_0}\quad\hbox{and}\quad Z<t<x^{1/20+2\eta_0}.
\]

**S_0 is the set where both cofactors sit within a factor x^(2*eta_0) of
their own thresholds V and Z at the same time.** The validator checks
directly that the corner (19/25,19/20) fails both usability tests at
fourteen values of gamma including gamma=1000.

### 2.2 S_0 lies inside W_dagger

W_dagger is defined by de>floor(x^(3/4)), d^5e^2>floor(x^(49/20)) and
(d>floor(x^(151/200)) or de^3>floor(x^(321/200)))
([grouped-divisor-moment (19)](grouped-divisor-moment.md)). On S_0:

| condition | exponent on S_0 | threshold | holds |
|---|---|---|---|
| de | 171/100 - 4*eta_0 | 3/4 | yes |
| d^5e^2 | 57/10 - 14*eta_0 | 49/20 | yes |
| d | 19/25 - 2*eta_0 | 151/200 | yes for eta_0 < 1/400 |

So the endpoint mass of S_0 belongs to E_dagger and not to an
already-controlled cut. The validator confirms membership for the corner
and for the four named edge points used below.

### 2.3 The edges are structural, not a choice of cutoff

a = delta + w <= (1-w) + w = 1 for every admissible cutoff exponent w,
because k>V=x^w together with dk<=x forces delta<=1-w; likewise
b = nu + v <= 1. Equivalently M <= 2*D_0*V <= 2x and N <= 2*E_0*Z <= 2x:
the expanded left divisor can be comparable to n itself and the expanded
right divisor comparable to n-2. Raising w toward 1/4, the ceiling from
[prime-detection-spec §3 (8)](prime-detection-spec.md) where D=UV must
stay under the BV level, or v toward 3/50, the ceiling from
[shifted-prime-decomposition §2](shifted-prime-decomposition.md), moves
where the edge sits but never removes a=1 or b=1. DERIVED.

### 2.4 What does not cover S_0

| device | status on S_0 | reason |
|---|---|---|
| trivial branch MN <= x^(1-tau) | does not cover | a+b = 2 - p - q > 2 - 4*eta_0, so MN is far above x^(1-tau) |
| untwisted density | covers the density, which is not E_dagger | at fixed e the allowed d form the interval (x^(19/25-2eta_0), D_0], so the excluded-prime Mobius mean of [signed-divisor-grouping §2 (7)](signed-divisor-grouping.md), uniform for U/2<=t<=x, applies. E_dagger is the endpoint sum after that subtraction, [residual-coverage (16)](residual-coverage.md) |
| absolute bound on the endpoint terms | does not cover | section 2.6 |
| the pre-grouped-moment budgets | do not cover | at a=b=1 the [residual-coverage §3](residual-coverage.md) zero budgets are 1/2+(a+b)/2-v/2 = 59/40 on the right and 1/2+(a+b)/2-w/2 = 69/50 on the left, both above one. The grouped moment's (1+a)/2 = 1 is the smallest available at the edge |

### 2.5 The correct size of S_0

The consumer needs O_H(x/log^H x) over O(log^2 x) boxes, so eta_0 need not
be fixed. Taking eta_0 = C*loglog x/log x gives a saving x^(-c*eta_0) of
(log x)^(-cC), which exceeds any required fixed logarithmic power once C
is chosen large. DERIVED, with the following consequences:

- Dyadic steps in delta have size log 2/log x, so S_0 covers
  2*eta_0*log x/log 2 = 2C*loglog x/log 2 boxes per side, that is an
  **O(loglog x) by O(loglog x) block of dyadic boxes at the top corner**,
  rather than a strip of fixed width. Sample counts at C=3, from the
  validator: 56 by 56 boxes at x=2^1024 out of 532 d-boxes, and 236 by 236
  at x=2^(2^40) out of 5.7e11 d-boxes. The block is a vanishing fraction of
  the boxes and is never empty.
- The block does not disappear. The last dyadic box has p = O(1/log x),
  hence right zero budget 1 - log 2/(2 log x), giving x^(1-O(1/log x)),
  which is a constant multiple of x and not O(x/log^H x).

### 2.6 Absolute bounding on S_0, quantified

Two counts, both against the target x/log^K x.

**Pair count, DERIVED.** The number of (d,e) in S_0 is
(D_0-floor(x^(19/25-2eta_0)))*(E_0-floor(x^(19/20-2eta_0))) = (1+o(1))*D_0*E_0.
[residual-coverage §4](residual-coverage.md) bounds the total absolute
unaggregated endpoint mass on the whole domain by O(x^2 log^C x), using
exactly D_0*E_0*V*Z. So S_0 carries 1-o(1) of that crude mass: because
exponents are logarithmic, a thin strip in exponents is nearly everything
in counts.

**Weighted term mass, DERIVED.** Restrict to k=r prime in
(x^(6/25), x^(6/25+2eta_0)] and t=r' prime in (x^(1/20), x^(1/20+2eta_0)],
with d=n/r and e=(n-2)/r' both squarefree. Fix such a coprime pair r,r'.
By CRT the n<=x with r|n and r'|n-2 form one progression modulo r*r' with
x/(r r')+O(1) terms. Within it, for each prime P not dividing r r', the
condition P^2 | n/r has density 1/P^2 and so does P^2 | (n-2)/r', while
for P | r r' the densities are no larger. The union bound over all primes
costs at most 2*sum_P 1/P^2 = 2*0.45224... = 0.90449... < 1, leaving
density at least 0.09 and hence >> x/(r r') admissible n. Summing,
sum_r 1/r = log(1+(25/3)*eta_0)+o(1) and sum_{r'} 1/r' = log(1+40*eta_0)+o(1)
by Mertens, and each term carries
beta_V(k)*beta_Z(t) = (log r)(log r') >= (3/250)*log^2 x. Hence the sum of
absolute values of the terms of R restricted to S_0 is

\[
 \gg\eta_0^2\,x\log^2x
\]

with an absolute implied constant. Numerically, at eta_0=1/100 and
x=2^1024 the leading count before the squarefree factor is 162.8*x.

**One top dyadic box, DERIVED.** Take a single dyadic band on each side,
r in (R,2R] with R=x^(6/25) and r' in (Z',2Z'] with Z'=x^(1/20). Mertens
gives sum 1/r = log(1+log 2/log R)+o(1) and likewise for r'. The
logarithmic weights (log r)(log r') cancel the two log x factors exactly,
leaving leading absolute mass (log 2)^2 * x = 0.4805...*x before the
squarefree factor. Validator: 0.4801*x at x=2^16384, tending to
(log 2)^2 = 0.4805.

The consequence is the same in all three readings: a triangle-inequality
treatment of S_0 misses x/log^K x by a factor log^(K+2). This bounds
absolute term mass and says nothing about the signed value. It localises
[singleton-fiber-audit.md](singleton-fiber-audit.md)'s c*x*log x lower
bounds on each sign's ungrouped mass.

### 2.7 Exactly which limitation this is

Three ingredients produce the ceiling, all of them properties of the
argument shape and not of the arithmetic.

1. **Arbitrary bounded coefficients.** Equations (2) and (3) of
   grouped-divisor-moment hold for any |b_u|<=B, and no Mobius sign of
   b_u is used.
2. **One Cauchy inequality in the other divisor**, costing
   F = (sum_m |A_left(gm)|^2)^(1/2). That note bounds F by sqrt(M)*log x;
   the actual second moment of the dominant prime-power sector is of order
   M*log x, so F is of order sqrt(M log x). The exponent a/2 is the same
   either way, and the exponent is what the region arithmetic uses.
3. **Zero frequencies bounded absolutely.**
   [grouped-divisor-moment §2 (5)](grouped-divisor-moment.md) applies the
   triangle inequality to the R=0 class and states that no cancellation is
   claimed there. That class contains u_1=u_2, h_1=h_2, whose contribution
   is sum_u sum_h |b_u|^2 |c_h|^2 sum_{m,(m,u)=1} |Phi_{u,h}(m)|^2 >= 0,
   of exact order B^2 C^2 f^2 MN/A, which reaches x on the band A ~ MN/x.
   So the moment bound f^2*MN/A <= x is attained and not wasteful.

Items 2 and 3 together give a right block bound of at least
sqrt(M*x) = x^((1+a)/2) for any treatment of the nonzero frequencies. The
loss sits entirely in item 2, that is in discarding the correlation
between A_left's Mobius signs and Y(m). DERIVED, inside this shape only.

## 3. Structure of the edge strips

### 3.1 The d-edge: k is essentially one prime just above V

On p<2*eta_0, k lies in (V, x/d] with x/d <= x^(6/25+p), and
beta_V(k)!=0 forces a prime power r>V dividing k, so k = r*s with
s < x^(1-a) = x^p < x^(2*eta_0). Since k < V^2 for eta_0<3/25, exactly one
prime power above V divides k. Proper prime powers r=P^j with j>=2 force
P>x^(3/25) and cost at most sum_{P>x^(3/25)} x/P^2, that is
O(x^(22/25) log^C x), which is below x/log^H x for every fixed H. So r is
prime and beta_V(k) = log r. DERIVED.

Write C_{Y,Z}(N) = sum over e|N with e>Y, N/e>Z, e<=E_0 of
mu(e)*beta_Z(N/e), the exact right-hand coefficient of R. The d-edge strip
contribution to R, and after subtracting its controlled density to
E_dagger, is

\[
 \sum_{s\le x^{2\eta_0}}\ \sum_{r\ \rm prime>V}(\log r)
 \sum_{d\ \rm in\ strip,\ drs\in J_x}\mu(d)\,C_{Y,Z}(drs-2)
 \;+\;O(x^{22/25}\log^Cx),
\]

and aggregating the long variable as Q=d*s, with
|lambda_s(Q)| = |mu(Q/s)| <= 1,

\[
 =\sum_s\sum_{Q,\ s\mid Q}\lambda_s(Q)
   \sum_{r\ \rm prime,\ Qr\in J_x}(\log r)\,C_{Y,Z}(Qr-2)+O(x^{22/25}\log^Cx),
                                                                  \tag{3}
\]

with Q of size x^(19/25) up to x^(19/25+2*eta_0) and r of size x^(6/25).

### 3.2 The e-edge: t is essentially one prime just above Z

Symmetrically t = r'*s' with r' a prime power above Z and
s' < x^(1-b) = x^q < x^(2*eta_0). Proper prime powers here cost
sum_{P>x^(1/40)} x/P^2, that is O(x^(39/40) log^C x), which is again below
x/log^H x for every fixed H, so this class is negligible and needs no
separate treatment. Then

\[
 \sum_{s'}\sum_{E,\ s'\mid E}\lambda'_{s'}(E)
   \sum_{r'\ \rm prime>Z}(\log r')\,C'_{U,V}(Er'+2),\qquad
 C'_{U,V}(N)=\sum_{d\mid N,\ d>U,\ N/d>V,\ d\le D_0}\mu(d)\beta_V(N/d),
                                                                  \tag{4}
\]

with E of size x^(19/20) and r' of size x^(1/20). DERIVED.

### 3.3 The corner: both sides degenerate at the same time

On S_0 the determinant relation becomes d*r - e*r' = 2 with d~x^(19/25),
e~x^(19/20), r~x^(6/25), r'~x^(1/20). For fixed coprime (r,r'), the
condition r' | d*r-2 fixes d modulo r'; writing d = d_0 + r'*m and
e = c_0 + r*m, the inner sum is

\[
 \sum_{m\sim x^{71/100}}\mu(d_0+r'm)\,\mu(c_0+rm),                \tag{5}
\]

weighted by (log r)(log r') and summed over the two prime bands. The
corner is therefore an averaged binary Mobius correlation along two
independent linear forms with dilations r~x^(6/25) and r'~x^(1/20) and
inner length x^(71/100); the total mass is x^(29/100) parameter pairs
times x^(71/100) inner length, that is x. This is algebra. It is not an
obstruction claim.

### 3.4 Pricing the shapes

ASSESSMENT only. No estimate is claimed, and the levels below are what
the shapes would require, not what any theorem supplies.

| edge | object | nearest known class | level or split required | comment |
|---|---|---|---|---|
| d-edge, general nu | (3) | Type II bilinear against a shifted divisor-type coefficient, the Deshouillers-Iwaniec, Drappeau, Topacogullari, Pascadi input class | split (19/25, 6/25) = (0.76, 0.24); the short variable exponent 6/25 sits just below 1/4 | U=V=x^(6/25) was chosen as an interior point below 1/4 so that D=UV<=x^(12/25) stays under the BV level ([prime-detection-spec §3 (8)](prime-detection-spec.md)); the split inherits that choice |
| d-edge, read as BV | equidistribution of alpha(n)=sum_{n=Qr} lambda(Q) log r on n congruent to 2 modulo e, e up to E_0 | Bombieri-Vinogradov and large-moduli extensions | level 19/20 | far beyond BV at 1/2 and beyond well-factorable extensions. This reading over-demands: the true object carries mu(e) and a further t-sum, so it is bilinear, not an absolute-value average |
| d-edge, read as dispersion in r | Cauchy in Q, then pairs (r_1,r_2) with sum_Q C(Qr_1-2) conj C(Qr_2-2) | Linnik dispersion, BFI | completion length Q~x^(19/25) against joint modulus e_1e_2 up to x^(19/10) | concrete failure point: when e_1e_2 exceeds Q there is no complete period to remove, and that is exactly the sub-range e near E_0, the corner |
| e-edge, general delta | (4) | same class | split (19/20, 1/20) = (0.95, 0.05) | harsher on the short variable, and v may be raised only to below 3/50 |
| corner | (5) | Chowla-type, or averaged Chowla; the Matomaki-Radziwill-Tao averaging is over additive shifts, not multiplicative dilations | log^(K+2) cancellation on average over x^(29/100) dilation pairs | no interface reviewed in [structural-literature-audit.md](structural-literature-audit.md) closes it. The average over (r,r') is a genuine resource whose transfer from additive shifts to dilations is not established in anything read here |

The two edges are the same phenomenon at different scales: residual prime
x^(6/25) at the d-edge against x^(1/20) at the e-edge, a factor 4.8 in
exponent. That asymmetry shows up in the required savings of section 4.

## 4. CONDITIONAL: what a uniform saving would buy

**Everything in this section assumes an unproved estimate.** Assume that
for every retained box and harmonic band, in both orientations, the
nonzero small-common-divisor kernel obeys a one-sided bound improving the
moment exponent by a fixed gamma>0 uniformly. The actual open target
[grouped-divisor-moment (21)](grouped-divisor-moment.md) is one box, one
orientation, gamma = 3/50 + eta_(21). Uniformity across the domain is a
much larger assumption and is not implied by (21). Nothing below is a
theorem.

### 4.1 Added region and the four leftover pieces

From (1), the added region is

\[
 \{\delta<19/25\ \hbox{and}\ \delta+3\nu<161/100+\gamma\}\ \cup\
 \{\nu<19/20\ \hbox{and}\ 3\delta+\nu<123/100+\gamma\},
\]

and the leftover decomposes into four overlapping pieces, with
S_0 contained in both strips:

| piece | definition | binding terms | empties when |
|---|---|---|---|
| S_0, corner | p<2eta_0, q<2eta_0 | right zero and left zero | never |
| S_R, d-edge strip | p<2eta_0, 3p+q<2-gamma+2eta_0 | right zero, left cross | gamma >= 2 |
| S_T, e-edge strip | q<2eta_0, p+3q<2-gamma+2eta_0 | left zero, right cross | gamma >= 2 |
| B, bulk | p+3q<2-gamma+2eta_0 and 3p+q<2-gamma+2eta_0 | both cross terms | gamma >= 2+2eta_0 |

The strip thresholds are DERIVED and exact: S_R minus S_0 requires
q>=2*eta_0 and 3p+q<2-gamma+2*eta_0 with p<2*eta_0, whose infimum of
3p+q is 2*eta_0, so the piece is nonempty precisely when gamma<2. The
same holds for S_T. **The values 11/10 and 37/25 below are the cheapest
single points of the two edges, not clearing thresholds**; clearing
either edge apart from the corner costs gamma tending to 2, the same as
clearing the bulk.

### 4.2 Required saving at named boxes

gamma_req is the minimum, over the orientations whose zero budget is
usable, of 2-p-3q on the right and 2-3p-q on the left, equivalently of
delta+3nu-161/100 and 3delta+nu-123/100. Exact rationals, validator
section D:

| (delta,nu) | (p,q) | right | left | gamma_req | note |
|---|---|---|---|---|---|
| (2/5, 2/5) | (9/25, 11/20) | -1/100 | 37/100 | already controlled | benchmark, right budget 199/200 |
| (47/150, 67/150) | (67/150, 151/300) | 13/300 | 47/300 | 13/300 | old frontier meeting point |
| (8/25, 9/20) | (11/25, 1/2) | 3/50 | 9/50 | 3/50 | the current local target box |
| (1/2, 1/2) | (13/50, 9/20) | 39/100 | 77/100 | 39/100 | |
| (6/25, 63/100) | (13/25, 8/25) | 13/25 | 3/25 | 3/25 | old product-supremum point |
| (1/2, 7/10) | (13/50, 1/4) | 99/100 | 97/100 | 97/100 | interior, expensive direction |
| (19/25, 9/20) | (0, 1/2) | right unusable | 3/2 | 3/2 | on the d-edge, inside W_dagger |
| (19/25, 1/2) | (0, 9/20) | right unusable | 31/20 | 31/20 | on the d-edge, inside W_dagger |
| (19/25, 1/20) | (0, 9/10) | right unusable | 11/10 | 11/10 | cheapest point of the d-edge |
| (6/25, 19/20) | (13/25, 0) | 37/25 | left unusable | 37/25 | cheapest point of the e-edge |
| (19/25, 19/20) | (0,0) | unusable | unusable | unbounded | the corner S_0 |

Over the whole d-edge gamma_req runs over [11/10, 2), and over the whole
e-edge over [37/25, 2). The validator samples 286 edge points; 180 d-edge
points exceed 11/10 and 104 e-edge points exceed 37/25, which is the
active control against reading either cheapest value as a threshold.

### 4.3 Leftover as gamma grows

Exact rational vertices and areas of the bulk B, taken at the limiting
region boundaries 19/25 and 123/50 and with eta_0 tending to 0. Domain
area 117/250. This is bookkeeping over inequalities, not a measurement.

| gamma | bulk B vertices (delta,nu) | area | percent of domain |
|---|---|---|---|
| 0 | (6/25,63/100) (6/25,19/20) (19/25,19/20) (19/25,17/60) (67/200,17/40) (47/150,67/150) | 35347/120000 | 62.9 |
| 3/50 | (6/25,63/100) (6/25,19/20) (19/25,19/20) (19/25,91/300) (101/325,589/1300) | 27863/97500 | 61.1 |
| 1/5 | (6/25,71/100) (6/25,19/20) (19/25,19/20) (19/25,7/20) (31/100,1/2) | 651/2500 | 55.6 |
| 39/100 | (6/25,9/10) (6/25,19/20) (19/25,19/20) (19/25,31/75) (143/400,219/400) | 25871/120000 | 46.1 |
| 1/2 | (13/50,19/20) (19/25,19/20) (19/25,9/20) (77/200,23/40) | 3/16 | 40.1 |
| 1 | (32/75,19/20) (19/25,19/20) (19/25,37/60) (51/100,7/10) | 1/12 | 17.8 |
| 11/10 | (23/50,19/20) (19/25,19/20) (19/25,13/20) (107/200,29/40) | 27/400 | 14.4 |
| 3/2 | (89/150,19/20) (19/25,19/20) (19/25,47/60) (127/200,33/40) | 1/48 | 4.5 |
| 37/25 | (44/75,19/20) (19/25,19/20) (19/25,233/300) (63/100,41/50) | 169/7500 | 4.8 |
| 7/4 | (203/300,19/20) (19/25,19/20) (19/25,13/15) (279/400,71/80) | 1/192 | 1.1 |
| 2 | the single point (19/25,19/20) | 0 | 0 |

The row at 37/25 exceeds the row at 3/2 because the two rows are clipped
by different domain edges; the sequence of sets is nested and the areas
are not monotone in that clipping.

**These areas are taken at the limiting boundaries, not at the concrete
cuts.** In (p,q) the concrete cuts of W_dagger read p+q<24/25 and
5p+2q<13/4, while the limiting boundaries read p+q<=19/20 and
5p+2q<=81/25. The genuine W_dagger, with the concrete cuts 3/4, 49/20 and
the disjunction (d>x^(151/200) or de^3>x^(321/200)), is a union of two
convex pieces with exact area 141979/480000 + 93/80000 = 142537/480000 =
0.296952, that is 63.45 percent of the domain, against 35347/120000 =
0.294558, that is 62.94 percent, at the limiting level. The table above is
internally consistent at the limiting level; the genuine figure is the
larger one.

Two flat readings. First, the entire currently sought saving gamma=3/50,
applied uniformly across the whole domain and both orientations, which is
far more than (21) asks for, removes about 3 percent of the leftover area,
62.9 to 61.1. Second, the bulk B is nonempty for every gamma<2, since it
contains p = q = (2-gamma+2*eta_0)/4.

### 4.4 Exact coupled cuts for the next E

With a saving gamma, choose fixed kappa<19/25, lambda<161/100+gamma,
rho<19/20, sigma<123/100+gamma and set

\[
 \mathcal A=\{de\le\lfloor x^{3/4}\rfloor\},\qquad
 \mathcal B=\{d^5e^2\le\lfloor x^{49/20}\rfloor\},
\]
\[
 \mathcal C=\{d\le\lfloor x^{\kappa}\rfloor\ \hbox{and}\
              de^3\le\lfloor x^{\lambda}\rfloor\},\qquad
 \mathcal D=\{e\le\lfloor x^{\rho}\rfloor\ \hbox{and}\
              d^3e\le\lfloor x^{\sigma}\rfloor\}.
\]

E_new is then the exact weighted compatible CRT endpoint sum of
[residual-coverage (16)](residual-coverage.md) restricted to the
complement of the union, namely

\[
 de>\lfloor x^{3/4}\rfloor,\quad d^5e^2>\lfloor x^{49/20}\rfloor,
\]
\[
 (d>\lfloor x^{\kappa}\rfloor\ \hbox{or}\ de^3>\lfloor x^{\lambda}\rfloor),
 \quad
 (e>\lfloor x^{\rho}\rfloor\ \hbox{or}\ d^3e>\lfloor x^{\sigma}\rfloor).
\]

Separation follows [residual-coverage §4](residual-coverage.md) without
change: up to four truncated Perron integrals with real part 1/log x,
height x^10 and half-integer-shifted thresholds; the combined twist is
d^(-s1-5s2-s3-3s4) e^(-s1-2s2-3s3-s4), all of nonnegative real part, so
the endpoint bounds apply uniformly in the imaginary parts; the cost is
O(log^4 x) and the indicator error
O(x^(2+max(3/4,49/20,kappa,lambda,rho,sigma)-10) log^C x). The untwisted
density is bounded before separation, since at fixed e each of the four
sets restricts d to an interval and unions and intersections take maxima
and minima of endpoints.

A concrete choice at gamma=1/10 is kappa=151/200, lambda=341/200,
rho=189/200, sigma=265/200, which puts the (8/25,9/20) box, where
de^3 = x^(167/100), inside C. At gamma=3/50 exactly, lambda would have to
equal 167/100 and that box sits on the boundary with no fixed slack, which
is the note's "equality leaves no fixed slack" restated as a cut.

### 4.5 The threshold is gamma=2, and only gamma=2

CONDITIONAL, derived from (1). At gamma=2 the added region is
{p>=2*eta_0} union {q>=2*eta_0}, since the cross conditions reduce to
p+3q>=2*eta_0 and 3p+q>=2*eta_0 and are implied there. The leftover is
then exactly S_0. For every gamma<2 both the bulk B and the two strips
minus S_0 are nonempty. So a finite gamma does reduce the leftover to the
Q1 corner, and that value is 2 and no smaller.

What gamma=2 asks for. At the corner a=b=1, the generic nonzero budget is
N^3 = x^3 and the zero part is x, so gamma>=3b-1 = 2 is exactly the
statement that the nonzero frequencies contribute no more than the
diagonal. HEURISTIC diagnostic: full square-root cancellation across the
roughly N*A pairs would leave N^2/A, and at the corner A ~ MN/x = x and
N = x, so N^2/A = x and the heuristic best possible gamma is 3-1 = 2. At
the corner the heuristic ceiling on gamma therefore coincides with the
requirement, with no slack, while the zero budget is simultaneously
exactly 1, also with no slack. At the current local target box the same
heuristic gives an available 3/2 - 47/50 = 14/25 against a requirement of
3/50, so that box has heuristic room and the corner has none. This is
heuristic and assumes square-root cancellation across coupled pairs, which
is exactly what is unproved.

## 5. Assessment

### 5.1 Derived

1. For every gamma, including an unbounded one, S_0 is uncontrolled by
   this moment shape in both orientations, because the cross term appears
   in neither the zero nor the period budget.
2. gamma=2 is the exact threshold at which the leftover reduces to S_0;
   for every gamma<2 the bulk and both edge strips minus S_0 are nonempty.
3. The distance between what is currently sought and what would be needed:

| goal | gamma needed | multiple of the current 3/50 target |
|---|---|---|
| the single box (8/25,9/20) | above 3/50 | 1 |
| the interior point (1/2,7/10) | 97/100 | 16.2 |
| the d-edge point (19/25,9/20) | 3/2 | 25 |
| the whole d-edge apart from the corner | tending to 2 | tending to 33.3 |
| the whole e-edge apart from the corner | tending to 2 | tending to 33.3 |
| leftover reduced to S_0 | 2 | 33.3 |

4. Absolute bounding on S_0 misses x/log^K x by log^(K+2): section 2.6.
5. Neither the trivial MN<=x^(1-tau) branch nor the density term reaches
   E_dagger on S_0.
6. The a=1 and b=1 edges survive every admissible cutoff choice,
   w in (0,1/4) and v in (0,3/50).
7. With eta_0 of order loglog x/log x the unreachable set is the top
   O(loglog x) by O(loglog x) block of dyadic boxes, it never empties, and
   a single top box carries absolute term mass with leading constant
   (log 2)^2.
8. The corner reduces algebraically to (5), plus two prime-power classes
   of sizes x^(22/25) and x^(39/40), both negligible against x/log^H x.

### 5.2 Judgement

These are opinions, flagged as such, and are not results.

- A succession of local kernel improvements does not exhaust W_dagger.
  This is items 1 and 2 restated: the programme of moving the frontier
  lines delta+3nu = 161/100+gamma and 3delta+nu = 123/100+gamma outward
  has a hard stop at S_0, and reaching even that stop asks for gamma=2
  uniformly, 33 times the saving currently priced at one box. Confidence
  high, conditional only on the three-budget list being correct and
  complete for this argument, which was re-derived here from (14) but not
  from (2).
- The global consumer therefore needs a different argument on S_0. Inside
  this framework the thing that must change is the first Cauchy inequality
  in the left divisor: the moment is diagonal-dominated and the left norm
  is sharp, so at a=1 the whole loss is that step. That points at
  [residual-coverage §6 (19)-(20)](residual-coverage.md)'s signed
  cross-divisor sum, which keeps mu(ge_1)mu(ge_2) before the extra step,
  rather than at further kernel work. Confidence medium-high. Caveat: that
  target is written for one sector at (2/5,2/5), its analogue at a=b=1 is
  not written anywhere in this corpus, and the corner is where both
  divisors degenerate at once, which section 6 there does not address.
- The one-sided or scale-averaged consumer of
  [endpoint-target-audit.md](endpoint-target-audit.md) is a more likely
  route for S_0 than any absolute bound, since it needs only a lower bound
  on E_dagger restricted to S_0. Item 4 says even that needs log^(K+2) of
  genuine cancellation there, so it is not a free reduction. Confidence
  medium.
- On the pricing in section 3.4, the d-edge is the one with a recognisable
  estimate shape; the e-edge split (19/20, 1/20) is worse on the short
  variable and its clearing price is no better. Confidence medium, and
  this is triage, not a result.
- No obstruction theorem for S_0 was found and none is asserted. The
  reduction to (5) is suggestive of the standard parity difficulty, but an
  obstruction claim needs its own method, statistics, error tolerance and
  quantifiers, and (5) carries an average over x^(29/100) dilation pairs,
  which is the kind of resource that has broken related correlation
  problems elsewhere. S_0 is OPEN and hard, not closed.

### 5.3 What would falsify this

- A block-budget list for this moment shape whose zero-frequency term is
  below (1+a)/2: an argument that does not pay the left norm at the first
  Cauchy inequality, or one that extracts cancellation from the R=0 class.
  Either would invalidate item 1 as stated. **This check has not been run**;
  the three exponents of (14) and the nonnegativity of the diagonal were
  verified, but no attempt was made to construct such an argument.
- A demonstration that the top dyadic boxes carry o(x/log^K x). Section
  2.6's third count addresses exactly the last box and gives leading
  absolute mass (log 2)^2 * x, so this would have to come from signed
  cancellation, not from counting.
- Any error in the imported budget list, in the dictionary
  gamma = 3/50+eta_(21), or in the claim that the R=0 class is bounded
  absolutely in the current derivation.

## 6. Validation, controls and limits

[reachability-validation.js](reachability-validation.js) checks, in exact
BigInt rationals: the budget identities and the domination of the period
budget by the zero budget on 2,438 boxes; the equivalence of the
(delta,nu) and (p,q) usability forms on 6,156 (box,gamma) pairs; the
unreachability of the corner at fourteen values of gamma up to 1000; the
leftover vertices and areas at twelve values of gamma; the concrete-cut
W_dagger area as a union of two convex pieces; the required savings at
eleven named boxes; the range of gamma_req along both edges over 286
sampled points; the dyadic block size under eta_0 = 3*loglog x/log x; and
the two mass constants.

Active negative controls, all of which fire: dropping the zero-budget
conditions wrongly clears the corner at gamma=9/4; treating 11/10 and
37/25 as clearing thresholds is contradicted by 284 sampled edge points;
the limiting boundaries and the concrete cuts give different areas; using
eta_(21) in place of gamma = 3/50+eta_(21) fails to clear the target box;
using the period budget rather than the zero budget as the binding one
wrongly declares 41 edge boxes reachable; and dropping the vertical cut
delta<19/25 wrongly clears 12 edge boxes.

Limits. Everything here is bookkeeping over inequalities that other notes
derived. It revalidates none of them: not the moment bound (2)-(3), not
the pre-grouped-moment region of [residual-coverage (11)](residual-coverage.md),
not the Pascadi Kloosterman inputs, not the Vaaler majorant argument of
[endpoint-pairing §5](endpoint-pairing.md), and not the excluded-prime
Mobius mean. A finite rational check establishes no asymptotic rate and no
onset. The sufficient twin margin remains OPEN.
