# Reachability of W_dagger under nonzero-kernel improvement alone

**Questions.**
Q1 (derived, unconditional): which part of the original divisor domain is unreachable by ANY improvement to the nonzero (Weil/cross) kernel alone, in either orientation, and does the trivial MN<=x^(1-tau) branch or the density term cover it?
Q2 (derived): write the edge-strip contribution to E_dagger with the k=r*s / t=s'*r' structure explicit, and price the classical estimate shape it resembles at each edge, noting the U=V=x^(6/25) vs Y=Z=x^(1/20) asymmetry.
Q3 (conditional): with a uniform one-sided moment saving gamma>0 on the small-common-divisor kernel, what region is added, what remains of W_dagger, what is the new binding term, what are the exact coupled cuts, and is there a finite gamma whose leftover is only the Q1 edge strips?
Q4 (assessment): does a succession of local kernel improvements exhaust W_dagger, or does C_2*x+E_dagger >= c*x/log^K x require a different argument on the edge strips?

**Calibrations.**
- Q1: DERIVED, unconditional, inside the stated moment shape. It is a limitation of that shape, not an impossibility theorem for twins or for any other method.
- Q2: DERIVED for the algebraic reduction (structure of k, t, the resulting bilinear shape, the negligible proper-prime-power part). The estimate-class comparison and the required levels are ASSESSMENT/pricing only. No estimate is claimed.
- Q3: CONDITIONAL throughout. Every consequence of the assumed saving gamma is labelled conditional; the assumed saving is not promoted anywhere. The region arithmetic itself is derived rational bookkeeping.
- Q4: DERIVED parts flagged separately from JUDGEMENT parts, explicitly.
- Twin-prime infinitude remains OPEN. The sufficient margin C_2*x+E_dagger(x) >= c_0*x/(log x)^K remains OPEN. Nothing below changes either.
- **A larger controlled exponent area is not a lower bound on twins, and geometric area does not measure remaining signed mass.** Said once; it applies to every table here.

---

## 0. Coordinates and the three budgets (bookkeeping used throughout)

From [grouped-divisor-moment.md §4](~/Files/Git/primeoire/research/grouped-divisor-moment.md) and
[residual-coverage.md §1](~/Files/Git/primeoire/research/residual-coverage.md):
d~x^delta, e~x^nu, a=delta+6/25, b=nu+1/20, domain delta in [6/25,19/25],
nu in [1/20,19/20], so a in [12/25,1], b in [1/10,1].

Right-orientation block budgets after (14): (1+a)/2 (zero frequency),
a/2+3b/2 (nonzero Weil/cross), a (complete periods). Left swaps a,b.

Put the **edge distances**

    p = 19/25 - delta = 1 - a   (distance to the d-edge / k-near-V edge)
    q = 19/20 - nu   = 1 - b   (distance to the e-edge / t-near-Z edge)

with 0 <= p <= 13/25, 0 <= q <= 9/10. In these coordinates the budgets are exactly

| orientation | zero | cross (generic) | periods |
|---|---|---|---|
| right | 1 - p/2 | 2 - p/2 - 3q/2 | 1 - p |
| left  | 1 - q/2 | 2 - q/2 - 3p/2 | 1 - q |

Note 1-p/2 >= 1-p for all p>=0: **the zero budget always dominates the period
budget**, so the period term never binds where the zero term does not.

Let gamma >= 0 denote a *uniform total* saving in the moment exponent relative to
the generic nonzero budget 3b (right) / 3a (left); the cross budgets become
2-p/2-3q/2-gamma/2 and 2-q/2-3p/2-gamma/2. Dictionary to
[grouped-divisor-moment.md (21)](~/Files/Git/primeoire/research/grouped-divisor-moment.md):
(21)'s target X_small <= C*x^(36/25-eta) at (delta,nu)=(8/25,9/20) has
36/25 = 3/2 - 3/50, so **gamma = 3/50 + eta_(21)**. The note's "needs more than
3/50" is gamma > 3/50 there. Verified: first Cauchy gives block
= sqrt(F^2 * X) with F^2 = M = x^(14/25), so
sqrt(x^(14/25) * x^(3/2-gamma)) = x^(103/100-gamma/2) = x^(a/2+3b/2-gamma/2),
and at gamma=3/50 this is x^1, matching (21)'s "exponent at most 1-eta/2".

Fix a required strict margin eta_0>0 (all three budgets <= 1-eta_0). Then

    RIGHT usable  <=>  p >= 2*eta_0   AND   p + 3q >= 2 - gamma + 2*eta_0
    LEFT  usable  <=>  q >= 2*eta_0   AND   3p + q >= 2 - gamma + 2*eta_0        (*)

(The factor 2 on eta_0 in the zero condition is exact: (1+a)/2 <= 1-eta_0 is
a <= 1-2*eta_0, i.e. p >= 2*eta_0. The period condition p >= eta_0 is implied.)

---

## Q1. The unreachable set: DERIVED

### Q1.1 The decisive inequalities

The cross term enters neither the zero budget nor the period budget. Therefore,
**for every gamma, including gamma = +infinity**, (*) forces

    RIGHT unusable  if  p < 2*eta_0      (i.e. delta > 19/25 - 2*eta_0)
    LEFT  unusable  if  q < 2*eta_0      (i.e. nu    > 19/20 - 2*eta_0)

Hence the set no nonzero-kernel improvement can reach is exactly the corner

    S_0(eta_0) = { 19/25 - 2*eta_0 < delta <= 19/25 }
               ∩ { 19/20 - 2*eta_0 < nu    <= 19/20 }
               = { p < 2*eta_0, q < 2*eta_0 }.

In divisor terms, using D_0 = floor(x/(V+1)), E_0 = floor((x-2)/(Z+1)):

    d > x^(19/25 - 2*eta_0)  and  e > x^(19/20 - 2*eta_0),

equivalently, with k = n/d and t = (n-2)/e the two cofactors carrying the
beta-weights,

    V < k < x^(6/25 + 2*eta_0)      and      Z < t < x^(1/20 + 2*eta_0).

**S_0 is the set where both cofactors sit within a factor x^(2*eta_0) of their own
thresholds V and Z simultaneously.**

### Q1.2 S_0 lies inside W_dagger

W_dagger requires de>floor(x^(3/4)), d^5 e^2>floor(x^(49/20)), and
(d>floor(x^(151/200)) or de^3>floor(x^(321/200))). On S_0 with eta_0 < 1/400:

| condition | value on S_0 (exponent) | threshold | holds |
|---|---|---|---|
| de | 171/100 - 4*eta_0 | 3/4 | yes |
| d^5 e^2 | 57/10 - 14*eta_0 | 49/20 | yes |
| d | 19/25 - 2*eta_0 | 151/200 | yes for eta_0 < 1/400 |

So S_0 ⊂ W_dagger and its endpoint mass is part of E_dagger, not of an
already-controlled cut.

### Q1.3 Why the edge is structural, not a parameter choice

a = delta + w <= (1-w) + w = 1 for every admissible cutoff exponent w
(the constraint delta <= 1-w is k>V=x^w together with dk<=x); the same for
b = nu + v <= 1. Equivalently M <= 2*D_0*V <= 2x and N <= 2*E_0*Z <= 2x:
the expanded left divisor can be comparable to n itself, and the expanded right
divisor comparable to n-2. Raising w toward 1/4 (the ceiling from
prime-detection-spec §3: D=UV must stay below the BV level) or v toward 3/50
(the ceiling from shifted-prime-decomposition §2) moves the edge but never
removes a=1 or b=1. **The a=1, b=1 edges are invariant under the cutoff
choices; only the shape of the argument can move them.**

### Q1.4 Does anything else cover S_0?

| covering device | status on S_0 | reason |
|---|---|---|
| trivial branch MN <= x^(1-tau) | does NOT cover | a+b = 171/100 - 4*eta_0 >> 1, so MN >= x^(1.71-4*eta_0-o(1)) |
| untwisted density term | covers the density, but the density is NOT E_dagger | at fixed e the allowed d form the interval (x^(19/25-2eta_0), D_0]; the excluded-prime Mobius mean (signed-divisor-grouping §2 (7), valid uniformly for U/2<=t<=x) gives O_H(x/log^H x). E_dagger is the endpoint sum after that subtraction (residual-coverage (16)) |
| absolute (trivial) bound on the endpoint terms | does NOT cover | see Q1.5 |
| residual-coverage §3 budgets (the pre-grouped-moment estimates) | do NOT cover | at a=b=1 their zero budgets are 1/2+(a+b)/2-v/2 = 59/40 (right) and 1/2+(a+b)/2-w/2 = 69/50 (left), both above 1; the grouped moment's (1+a)/2 = 1 is strictly the best available at the edge |

### Q1.5 Absolute bounding on S_0 is quantitatively excluded

Two derived counts, both against the target x/log^K x:

1. Pair count. The number of (d,e) in S_0 is
   (D_0 - floor(x^(19/25-2eta_0)))*(E_0 - floor(x^(19/20-2eta_0))) = (1+o(1))*D_0*E_0.
   residual-coverage §4 bounds the total absolute unaggregated endpoint mass on the
   **whole** domain by O(x^2 log^C x) using exactly D_0*E_0*V*Z. So S_0 carries
   (1-o(1)) of that crude mass: in counting terms the "thin exponent strip" is
   nearly the entire domain, because exponents are logarithmic.

2. Weighted term mass. Restrict to k=r prime in (x^(6/25), x^(6/25+2eta_0)] and
   t=r' prime in (x^(1/20), x^(1/20+2eta_0)], d=n/r and e=(n-2)/r' squarefree.
   For fixed coprime r,r' the count of n<=x with r|n, r'|n-2 and both cofactors
   squarefree is >> x/(r r'). Summing,
   sum_r 1/r = log(1 + (25/3)*eta_0) + o(1),  sum_{r'} 1/r' = log(1 + 40*eta_0) + o(1),
   and each term carries beta_V(k)*beta_Z(t) = (log r)(log r') >= (3/250)*log^2 x.
   Hence the sum of absolute values of the terms of R restricted to S_0 is
   **>> eta_0^2 * x * log^2 x** with an absolute implied constant.
   (This bounds absolute term mass, not the signed value; it is the statement that
   a triangle-inequality treatment of S_0 misses the target by log^(K+2).)

This is consistent with, and localises, singleton-fiber-audit's c*x*log(x) lower
bounds on each sign's ungrouped mass: S_0 needs genuine cancellation, of order
log^(K+2), not a bound.

### Q1.6 Exactly what limitation this is

The three ingredients that produce the ceiling, all of them properties of this
moment shape and not of the arithmetic:

1. **Arbitrary bounded coefficients.** (2)-(3) hold for any |b_u|<=B; no Mobius
   sign of b_u is used (grouped-divisor-moment §1, explicit).
2. **First Cauchy in the other divisor**, costing
   F = (sum_m |A_left(gm)|^2)^(1/2) << sqrt(M)*log x (§4). This factor is sharp:
   A_left is supported on ~M values of size ~log x.
3. **Zero frequencies bounded absolutely.** §2 (5) counts the R=0 class with the
   triangle inequality and states "for this class no cancellation is claimed".
   That class contains the sub-class u_1=u_2, h_1=h_2, whose contribution is
   sum_u sum_h |b_u|^2 |c_h|^2 sum_{m,(m,u)=1} |Phi_{u,h}(m)|^2 >= 0 and is of exact
   order B^2 C^2 f^2 MN/A, which reaches x on the band A ~ MN/x. So the moment
   bound f^2*MN/A <= x is attained, not wasteful.

Combining 2 and 3: the right block bound is at least sqrt(M * x) = x^((1+a)/2)
for *any* treatment of the nonzero frequencies. The loss is entirely in step 2,
i.e. in discarding the correlation between A_left's Mobius signs and Y(m).
**This does not show that S_0 is out of reach of some other argument.** It shows
that inside "aggregate, Cauchy once in the left divisor, expand the second
moment", improving the kernel cannot help there.

---

## Q2. Structure of the edge strips and what estimate class they resemble

### Q2.1 The d-edge: k is essentially one prime just above V

On p < 2*eta_0, k = n/d lies in (V, x/d] with x/d <= x^(1-delta) = x^(6/25+p).
beta_V(k) != 0 forces a prime power r>V with r|k, and k = r*s with

    s = k/r < x^(1-a) = x^p < x^(2*eta_0).

Since k < x^(6/25+2*eta_0) < V^2 for eta_0 < 3/25, exactly one prime power above V
divides k. Proper prime powers r=P^j (j>=2) with r>V force P>x^(3/25) and cost
at most sum_{P>x^(3/25)} x/P^2 << x^(22/25), i.e. O(x^(22/25) log^C x) with the
weights: negligible against x/log^H x. So up to that error, **r is prime** and
beta_V(k) = log r.

Write C_{Y,Z}(N) = sum_{e|N, e>Y, N/e>Z, e<=E_0} mu(e)*beta_Z(N/e), the exact
right-hand coefficient of R. The d-edge strip contribution to R (hence, after
subtracting its controlled density, to E_dagger) is

    R_edge = sum_{s <= x^(2*eta_0)} sum_{r prime, r>V}  (log r)
             sum_{d: x^(19/25-2eta_0) < d <= D_0, d*r*s in J_x}  mu(d) * C_{Y,Z}(d*r*s - 2)
             + O(x^(22/25) log^C x).

Aggregating the long variable as Q = d*s (|lambda_s(Q)| = |mu(Q/s)| <= 1):

    R_edge = sum_{s} sum_{Q, s|Q}  lambda_s(Q)
             sum_{r prime, Q*r in J_x}  (log r) * C_{Y,Z}(Q*r - 2)   + O(x^(22/25) log^C x),

with Q ~ x^(19/25) up to x^(19/25+2*eta_0) and r ~ x^(6/25).

### Q2.2 The e-edge: t is essentially one prime just above Z

Symmetrically, on q < 2*eta_0, t = (n-2)/e = r'*s' with r' a prime power above Z,
s' < x^(1-b) = x^q < x^(2*eta_0). Here Z = x^(1/20), so k' := t < x^(1/20+2eta_0) < Z^2
for eta_0 < 1/40, again a single prime power; proper powers cost
sum_{P>x^(1/40)} x/P^2 << x^(39/40) log^C x, which is **not** negligible against
x/log^H x on its own and must be carried as an explicit separate class (unlike the
d-edge, where 22/25 gives room). Modulo that class,

    R'_edge = sum_{s'} sum_{E, s'|E} lambda'_{s'}(E)
              sum_{r' prime, r'>Z} (log r') * C'_{U,V}(E*r' + 2),
    C'_{U,V}(N) = sum_{d|N, d>U, N/d>V, d<=D_0} mu(d)*beta_V(N/d),

with E ~ x^(19/20) and r' ~ x^(1/20).

### Q2.3 The corner S_0: both sides degenerate at once

On S_0, k = r (prime ~ V) and t = r' (prime ~ Z) up to the two error classes
above and the s,s'>1 terms. The equation d*k - e*t = 2 becomes

    d*r - e*r' = 2,   d ~ x^(19/25), e ~ x^(19/20), r ~ x^(6/25), r' ~ x^(1/20).

For fixed (r,r') with (r,r')=1, r'|d*r-2 fixes d modulo r'; writing
d = d_0 + r'*m, e = (d*r-2)/r' = c_0 + r*m, the inner sum is

    sum_{m ~ x^(71/100)}  mu(d_0 + r'*m) * mu(c_0 + r*m),                        (**)

weighted by (log r)(log r') and summed over the two prime bands. **The corner is
an averaged binary Mobius correlation along two independent linear forms with
dilations r ~ x^(6/25), r' ~ x^(1/20), inner length x^(71/100)**; the total mass is
x^(29/100) parameter pairs times x^(71/100) inner length = x.

### Q2.4 Pricing the shapes (ASSESSMENT, no estimate claimed)

| edge | object | nearest known class | level / split needed | comment |
|---|---|---|---|---|
| d-edge, general nu | sum_Q lambda(Q) sum_{r~V prime} (log r) C_{Y,Z}(Qr-2) | Type II bilinear against a shifted divisor-type coefficient (Deshouillers-Iwaniec / Drappeau / Topacogullari / Pascadi input class) | split (19/25, 6/25) = (0.76, 0.24); the short variable exponent 6/25 = 0.24 sits just below 1/4 | U=V=x^(6/25) was chosen "a convenient interior point below 1/4" so that D=UV<=x^(12/25) stays under the BV level (prime-detection-spec §3 (8)). The Type II split at this edge inherits that choice |
| d-edge, read as BV | equidistribution of alpha(n)=sum_{n=Qr} lambda(Q) log r on n = 2 (mod e), e up to E_0 | Bombieri-Vinogradov / BFI large-moduli | level 19/20 = 0.95 | far beyond BV (1/2) and beyond BFI/Zhang-type well-factorable levels (1/2+small). But the honest object has mu(e) and a further t-sum, so this reading over-demands: it is a bilinear, not an absolute-value, average |
| d-edge, read as dispersion in r | Cauchy in Q, expand over (r_1,r_2): sum_Q C(Qr_1-2) conj C(Qr_2-2) | Linnik dispersion / BFI | completion length Q ~ x^(19/25) vs joint modulus e_1 e_2 up to x^(19/10) | concrete failure point: whenever e_1 e_2 > Q there is no complete period to remove. That is exactly the sub-range e near E_0, i.e. the corner |
| e-edge, general delta | sum_E lambda'(E) sum_{r'~Z prime} (log r') C'_{U,V}(E r' + 2) | same class | split (19/20, 1/20) = (0.95, 0.05) | strictly harsher: the short variable is x^(1/20), and v may be raised only to below 3/50 (shifted-prime-decomposition §2). Also the proper-prime-power class costs x^(39/40) here and must be handled, not discarded |
| corner S_0 | (**): averaged binary Mobius correlation along two dilated linear forms | Chowla-type / averaged-Chowla (Matomaki-Radziwill-Tao style averaging is over additive shifts, not multiplicative dilations) | needs log^(K+2) cancellation on average over x^(29/100) dilation pairs | no interface reviewed in structural-literature-audit closes it. I am NOT asserting a parity obstruction: the averaging over (r,r') is a genuine resource whose transfer from additive shifts to dilations is simply not established in anything read here |

**The asymmetry, quantified.** The two edges are the same phenomenon at different
scales: residual prime x^(6/25)=x^0.24 at the d-edge, x^(1/20)=x^0.05 at the
e-edge, a factor 4.8 in exponent. It shows up directly in Q3's numbers: clearing
the whole d-edge costs gamma >= 11/10, clearing the whole e-edge costs
gamma >= 37/25.

---

## Q3. CONDITIONAL: what a uniform saving gamma buys

**This entire section assumes an unproved estimate. Nothing in it is a theorem.**
Assume: for every retained box and harmonic band, in both orientations, the
nonzero small-common-divisor kernel obeys a one-sided bound improving the moment
exponent by a fixed gamma>0 uniformly. (The actual open target
[grouped-divisor-moment (21)](~/Files/Git/primeoire/research/grouped-divisor-moment.md) is one
box, one orientation, gamma = 3/50 + eta_(21). Uniformity across the domain is a
much larger assumption and is not implied by (21).)

### Q3.1 Added region and leftover, exactly

From (*), with gamma:

    added(gamma) = { p >= 2*eta_0 and p+3q >= 2-gamma+2*eta_0 }
                 ∪ { q >= 2*eta_0 and 3p+q >= 2-gamma+2*eta_0 }

In (delta,nu): { delta < 19/25 and delta+3nu < 161/100+gamma }
             ∪ { nu < 19/20 and 3delta+nu < 123/100+gamma }.

Leftover(gamma) = domain ∩ {p+q <= 19/20} ∩ {5p+2q <= 81/25}   [the old
de<=x^(3/4) and d^5e^2<=x^(49/20) cuts, in p,q]  ∩ complement of added(gamma),
which decomposes into exactly four overlapping pieces:

| piece | definition | binding term(s) | vanishes when |
|---|---|---|---|
| S_0 (corner) | p<2eta_0, q<2eta_0 | right zero AND left zero | never |
| S_R (d-edge strip) | p<2eta_0, 3p+q < 2-gamma+2eta_0 | right zero + left cross | gamma >= 11/10 - 4*eta_0 (full edge cleared) |
| S_T (e-edge strip) | q<2eta_0, p+3q < 2-gamma+2eta_0 | left zero + right cross | gamma >= 37/25 - 4*eta_0 (full edge cleared) |
| B (bulk) | p+3q < 2-gamma+2eta_0 AND 3p+q < 2-gamma+2eta_0 | both cross terms | gamma >= 2 + 2*eta_0 |

(S_0 ⊂ S_R ∩ S_T. The domain clips are p<=13/25, q<=9/10, which is why S_T needs
2-gamma > 13/25 and S_R needs 2-gamma > 9/10.)

### Q3.2 Required saving at named boxes (exact rationals)

gamma_req = min over usable orientations of {2-p-3q (right, needs p>0),
2-3p-q (left, needs q>0)} = min{delta+3nu-161/100, 3delta+nu-123/100}.

| (delta,nu) | (p,q) | right gamma | left gamma | gamma_req | note |
|---|---|---|---|---|---|
| (2/5, 2/5) | (9/25, 11/20) | -1/100 | 37/100 | already controlled | benchmark, right budget 199/200 |
| (47/150, 67/150) | (67/150, 151/300) | 13/300 ≈ 0.0433 | 47/300 | 13/300 | old frontier meeting point |
| (8/25, 9/20) | (11/25, 1/2) | 3/50 = 0.06 | 9/50 | 3/50 | the current target box |
| (1/2, 1/2) | (13/50, 9/20) | 39/100 | 77/100 | 39/100 | |
| (6/25, 63/100) | (13/25, 8/25) | 13/25 | 3/25 = 0.12 | 3/25 | old product-supremum point |
| (1/2, 7/10) | (13/50, 1/4) | 99/100 | 97/100 | 97/100 | interior worst-case direction |
| (19/25, 1/20) | (0, 9/10) | right unusable | 11/10 = 1.1 | 11/10 | cheapest point of the d-edge |
| (6/25, 19/20) | (13/25, 0) | 37/25 = 1.48 | left unusable | 37/25 | cheapest point of the e-edge |
| (19/25, 19/20) | (0,0) | unusable | unusable | +infinity | the corner S_0 |

### Q3.3 Leftover as gamma grows (exact vertices of the bulk B, eta_0 -> 0)

Computed exactly in rationals (scratchpad `poly.js`, exact BigInt fractions;
this is bookkeeping arithmetic, not a measurement of mass). Domain area 117/250.

| gamma | bulk B vertices (delta,nu) | area of B | fraction of domain |
|---|---|---|---|
| 0 | (6/25,63/100) (6/25,19/20) (19/25,19/20) (19/25,17/60) (67/200,17/40) (47/150,67/150) | 35347/120000 | 62.9% |
| 3/50 | (6/25,63/100) (6/25,19/20) (19/25,19/20) (19/25,91/300) (101/325,589/1300) | 27863/97500 | 61.1% |
| 1/5 | (6/25,71/100) (6/25,19/20) (19/25,19/20) (19/25,7/20) (31/100,1/2) | 651/2500 | 55.6% |
| 39/100 | (6/25,9/10) (6/25,19/20) (19/25,19/20) (19/25,31/75) (143/400,219/400) | 25871/120000 | 46.1% |
| 1/2 | (13/50,19/20) (19/25,19/20) (19/25,9/20) (77/200,23/40) | 3/16 | 40.1% |
| 1 | (32/75,19/20) (19/25,19/20) (19/25,37/60) (51/100,7/10) | 1/12 | 17.8% |
| 11/10 | (23/50,19/20) (19/25,19/20) (19/25,13/20) (107/200,29/40) | 27/400 | 14.4% |
| 37/25 | (44/75,19/20) (19/25,19/20) (19/25,233/300) (63/100,41/50) | 169/7500 | 4.8% |
| 7/4 | (203/300,19/20) (19/25,19/20) (19/25,13/15) (279/400,71/80) | 1/192 | 1.1% |
| 2 | {(19/25,19/20)} only | 0 | 0% |

Two flat readings of this table:
- The **entire currently sought saving**, gamma = 3/50, applied *uniformly across
  the whole domain and both orientations* (far more than (21) asks for), removes
  about 3% of the leftover area (62.9% -> 61.1%).
- The leftover bulk B is nonempty for every gamma < 2: it always contains
  p = q = (2-gamma+2*eta_0)/4 > 0, i.e.
  (delta,nu) = (19/25 - (2-gamma)/4, 19/20 - (2-gamma)/4) as eta_0 -> 0.

### Q3.4 Exact coupled cuts defining the next E

With saving gamma, choose fixed
kappa < 19/25, lambda < 161/100+gamma, rho < 19/20, sigma < 123/100+gamma and set

    A = { de <= floor(x^(3/4)) }                          (existing)
    B = { d^5 e^2 <= floor(x^(49/20)) }                   (existing)
    C = { d <= floor(x^kappa)  and  d e^3 <= floor(x^lambda) }        (right, new)
    D = { e <= floor(x^rho)    and  d^3 e <= floor(x^sigma) }         (left, new)

Then E_new is the exact weighted compatible CRT endpoint sum of
residual-coverage (16) restricted to the complement W_new of A ∪ B ∪ C ∪ D:

    de > floor(x^(3/4)),
    d^5 e^2 > floor(x^(49/20)),
    ( d > floor(x^kappa)  or  d e^3 > floor(x^lambda) ),
    ( e > floor(x^rho)    or  d^3 e > floor(x^sigma) ).

Separation cost, following residual-coverage §4 verbatim: up to four truncated
Perron integrals with c=1/log x, T_P=x^10 and half-integer-shifted thresholds;
the combined twist is d^(-s1-5s2-s3-3s4) e^(-s1-2s2-3s3-s4), all Re >= 0, so §§2-3
apply uniformly in the imaginary parts; cost O(log^4 x); total indicator error
O(x^(2+max(3/4,49/20,kappa,lambda,rho,sigma)-10) log^C x). The untwisted density is
bounded before separation: at fixed e each of A,B,C,D restricts d to an interval,
and unions/intersections take max/min of endpoints, so the excluded-prime Mobius
mean applies. Concretely with gamma = 1/10: kappa = 151/200, lambda = 341/200,
rho = 189/200, sigma = 265/200 (and then the (8/25,9/20) box, de^3 = x^(167/100),
is inside C). With gamma = 3/50 exactly, lambda would have to equal 167/100 and
the (8/25,9/20) box sits on the boundary with no fixed slack — the note's
"equality leaves no fixed slack" restated as a cut.

### Q3.5 The answer to "is there a finite gamma?"

**Yes: gamma = 2, and no smaller value.** DERIVED (conditional on the assumed
saving existing at all):

- At gamma = 2, added(2) = {p >= 2eta_0} ∪ {q >= 2eta_0} up to the cross conditions
  p+3q >= 2eta_0 and 3p+q >= 2eta_0, both implied there. Leftover = S_0 exactly.
  (Verified in exact rationals: B collapses to the single point (19/25,19/20).)
- For every gamma < 2 - 8*eta_0, B contains p = q = (2-gamma)/4 > 2*eta_0, a point
  outside S_0. So no gamma < 2 reduces the leftover to the edge strips.

**What gamma = 2 would mean, and why it is not a small ask.** At the corner
(a=b=1) the generic nonzero budget is N^3 = x^3 while the zero part is x, so
gamma >= 3b-1 = 2 is exactly "the nonzero frequencies contribute no more than the
diagonal". HEURISTIC diagnostic: full square-root cancellation across the
~N*A pairs would give N^2/A; at the corner A ~ MN/x = x, N = x, so N^2/A = x and
the heuristic best-possible gamma is exactly 3-1 = 2. So at the corner **the
heuristic ceiling on gamma coincides with the requirement, with zero slack**,
while the zero budget is simultaneously exactly 1 with zero slack. At the current
target box the same heuristic gives available gamma = 3/2 - log_x(N^2/A)
= 3/2 - 47/50 = 14/25 = 0.56 against a requirement of 3/50 = 0.06 — that box has
heuristic room; the corner has none. (Heuristic, not derived: it assumes square-root
cancellation across coupled pairs, which is exactly what is not proved.)

### Q3.6 What else blocks even at gamma = 2

Even granting gamma = 2 uniformly, S_0 remains, and by Q1.5 it cannot be handled
by absolute bounds. So the answer to "is the remaining region only the Q1 edge
strips" is yes at gamma = 2, and the remaining region is then precisely the object
Q1 says this moment shape cannot touch at all.

---

## Q4. Assessment

### Q4.1 Derived

D1. For every gamma, including gamma = +infinity, S_0(eta_0) is uncontrolled by
    this moment shape, in both orientations. (Q1.1; the cross term appears in
    neither the zero nor the period budget.)
D2. gamma = 2 is the exact threshold at which the leftover reduces to S_0; every
    gamma < 2-8*eta_0 leaves bulk points outside the edge strips. (Q3.5.)
D3. The gap between what is sought and what would be needed:
    | goal | gamma needed | multiple of the current 3/50 target |
    |---|---|---|
    | the single box (8/25,9/20) | > 3/50 | 1x |
    | the interior point (1/2,7/10) | 97/100 | 16.2x |
    | the whole d-edge | 11/10 | 18.3x |
    | the whole e-edge | 37/25 | 24.7x |
    | leftover = S_0 only | 2 | 33.3x |
D4. Absolute bounding on S_0 misses by log^(K+2): the term-by-term absolute mass
    of R restricted to S_0 is >> eta_0^2 * x * log^2 x, and S_0 carries (1-o(1))
    of the crude O(x^2 log^C x) endpoint mass. (Q1.5.)
D5. Neither the trivial MN <= x^(1-tau) branch nor the density term reaches
    E_dagger on S_0. (Q1.4.)
D6. The a=1 / b=1 edges survive every admissible choice of the cutoffs
    w in (0,1/4) and v in (0,3/50). (Q1.3.)
D7. The corner reduces algebraically to an averaged binary Mobius correlation
    along two dilated linear forms, (**) in Q2.3, plus two explicitly sized
    prime-power classes (x^(22/25) at the d-edge, x^(39/40) at the e-edge).

### Q4.2 Judgement (mine, flagged as such)

J1. A succession of local kernel improvements does **not** exhaust W_dagger. This
    is D1 plus D2: the programme of moving the frontier lines delta+3nu = 161/100+gamma
    and 3delta+nu = 123/100+gamma outward has a hard stop at S_0, and to get even
    that far requires gamma = 2 uniformly, 33x the saving currently being priced
    at one box. My confidence in J1 is high — it is D1/D2 restated — conditional
    only on the budget table (1+a)/2, a/2+3b/2, a being the correct and complete
    list of block budgets for this argument, which I re-derived from (14) but did
    not re-derive from (2).
J2. The global consumer therefore requires a different argument on S_0. Inside
    this framework the specific thing that must change is the **first Cauchy in
    the left divisor**: the moment is diagonal-dominated (Q1.6 item 3) and
    ||A_left||_2 = sqrt(M)(1+o(1)) is sharp, so at a=1 the whole loss is Cauchy
    itself. That points at residual-coverage §6 (19)-(20)'s signed cross-divisor
    sum X — keeping mu(ge_1)mu(ge_2) before the extra step — as the structurally
    right target, rather than at any further kernel work. Medium-high confidence.
    Caveat: §6's X is written for one specific sector at (2/5,2/5); its analogue
    at a=b=1 is not written down anywhere I read, and the corner is where both
    divisors are degenerate simultaneously, which §6 does not address.
J3. The one-sided / scale-average consumer (endpoint-target-audit, handoff §3)
    is the more likely route for S_0 than any absolute bound, because it only
    needs a lower bound on E_dagger|_{S_0}, not cancellation in absolute value.
    But D4 says even that needs log^(K+2) of genuine cancellation there, so it is
    not a free reduction. Medium confidence.
J4. On Q2's pricing: I would not spend the next attempt on the e-edge. Its split
    (19/20, 1/20) is worse than the d-edge's (19/25, 6/25) on every axis, its
    proper-prime-power class alone costs x^(39/40) and must be carried, and its
    clearing price gamma = 37/25 is the largest in the table. If an edge is
    attacked, the d-edge is the one with a recognisable estimate shape. Medium
    confidence; this is a triage opinion, not a result.
J5. I did not find, and do not assert, an obstruction theorem for S_0. The
    reduction to (**) is suggestive of the standard parity difficulty, but per
    the repository rule an obstruction claim needs its own method, statistics,
    errors and quantifiers, and (**) comes with an average over x^(29/100)
    dilation pairs which is exactly the kind of resource that has broken related
    correlation problems elsewhere. Treat S_0 as OPEN and hard, not as closed.

### Q4.3 What would falsify the Q1 ceiling

- A block budget list for this moment shape whose zero-frequency term is below
  (1+a)/2 — e.g. an argument that does not pay sqrt(M) at the first Cauchy, or one
  that extracts cancellation from the R=0 class. Either would invalidate D1 as
  stated. This check has NOT been run: I verified (14)'s three exponents and the
  diagonal's nonnegativity, but I did not attempt to construct such an argument.
- A demonstration that the top dyadic boxes (delta within O(1/log x) of 19/25 and
  nu within O(1/log x) of 19/20) are empty or carry o(x/log^K x). Q1.5 argues the
  opposite for fixed eta_0; I did not check the O(1/log x) regime separately, and
  that is a real gap in Q1.5's coverage of the very last box.

---

## Imported facts: owning note, location, checked vs assumed

| fact | owning note and location | checked here? |
|---|---|---|
| Moment bound (2)-(3) for arbitrary bounded b_u | grouped-divisor-moment.md §1 (2),(3) | ASSUMED (used as given; §§2-3's derivation not re-verified) |
| Block budgets (1+a)/2, a/2+3b/2, a from (14); left swaps a,b | grouped-divisor-moment.md §4, eq. (14) and the paragraph after | CHECKED (re-derived exponents of sqrt(Mx), x^(3tau/2)sqrt(M)N^(3/2), x^(3tau/2)M with M=x^a, N=x^b) |
| a = delta+6/25, b = nu+1/20 | grouped-divisor-moment.md §4; residual-coverage.md §1 | CHECKED |
| Right region (15): delta<19/25 and delta+3nu<161/100 | grouped-divisor-moment.md (15) | CHECKED by algebra from the budgets |
| Left grouped condition 3delta+nu<123/100 contained in old left region for small gamma | grouped-divisor-moment.md §4 after (15) | CHECKED, and refined: containment 5delta+2nu<123/50 holds while gamma < 3/25 |
| Domain delta in [6/25,19/25], nu in [1/20,19/20]; O(log^2 x) boxes | residual-coverage.md §1 (1) | CHECKED |
| Old controlled region delta+nu<19/25 or 5delta+2nu<123/50 | residual-coverage.md (11)-(12) | ASSUMED (§§2-3 dispersion budgets not re-derived) |
| residual-coverage §3 budget table (used only to show it is worse at a=b=1) | residual-coverage.md §3 table | CHECKED arithmetically at a=b=1: 59/40 and 69/50 |
| W_dagger / E_dagger definition (19) and the reduction (20) | grouped-divisor-moment.md (19),(20); residual-coverage.md (16) | CHECKED as set/definition arithmetic |
| Perron separation of coupled cuts, cost O(log^2 x) per pair, error O(x^(2+max-10)) | residual-coverage.md §4 (13)-(14) | CHECKED as a template; the Perron lemma itself ASSUMED |
| Total absolute unaggregated endpoint mass O(x^2 log^C x) via D_0 E_0 V Z | residual-coverage.md §4 | CHECKED |
| Untwisted density controlled on any set that is a d-interval at fixed e | residual-coverage.md §4 last paragraph; signed-divisor-grouping.md §2 (7) | CHECKED for applicability to S_0; the Mobius-mean lemma ASSUMED |
| Zero (R=0) class bounded absolutely, no cancellation claimed, count 8*N*A*H_floor(2 min(N,A)) | grouped-divisor-moment.md §2 (5) | CHECKED (and the u_1=u_2,h_1=h_2 nonnegativity derived here from (1),(4)) |
| Trivial branch MN <= x^(1-tau) costs O(x^(1-tau) log^C x) | grouped-divisor-moment.md §4 | CHECKED |
| Target (21): X_small <= C x^(36/25-eta), contribution 1-eta/2, needs > 3/50 | grouped-divisor-moment.md §6 (21) | CHECKED, incl. the dictionary gamma = 3/50 + eta_(21) |
| Large-j pairs already controlled by (12), block 397/400 at (8/25,9/20) | grouped-divisor-moment.md §3 (12), §6 | ASSUMED |
| beta_W(k) = sum_{r|k,r>W} Lambda(r), 0 <= beta_W <= log k, zero for k<=W | prime-detection-spec.md §4; handoff §3 | CHECKED |
| U=V=floor(x^(6/25)) chosen below 1/4 so D=UV<=x^(12/25) is under the BV level | prime-detection-spec.md §3 (8) | CHECKED |
| Y=Z=floor(x^(1/20)); any equal exponent alpha in (0,3/50) fits the same budget | shifted-prime-decomposition.md §2, end | CHECKED |
| Exact residual R(x) and the four-variable determinant relation dk-et=2 | shifted-prime-decomposition.md §1 (2); handoff §3 | CHECKED |
| Sufficient OPEN consumer C_2 x + E_dagger >= c_0 x/(log x)^K | RESEARCH-HANDOFF.md §3 | CHECKED as a statement (it is OPEN) |
| Pascadi Lemmas 3.2-3.3 (Ramanujan/composite-modulus Weil) | grouped-divisor-moment.md §3, external | ASSUMED (external import, not verified) |
| Full positive Vaaler majorant controlled by the divisor-count argument | endpoint-pairing.md §5 | ASSUMED |
| Both signs' ungrouped masses >= c x log x | singleton-fiber-audit.md | ASSUMED (used only as consistency context for Q1.5, which is derived independently) |

**Scratchpad artifact:** `poly.js` in this directory (exact BigInt rational
polygon vertices and areas, plus the gamma_req table). It is rational bookkeeping
over the budget inequalities, not a numerical measurement of any arithmetic sum.
