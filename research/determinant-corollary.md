# The determinant corollary: a legal transfer that adds no region

<!-- ledger
id: Q-determinant-corollary
status: ANSWERED
todo: C
parity: The only arithmetic inputs are Bettin-Chandee Corollary 1 (a determinant-equation asymptotic for two arbitrary and two smooth weights), truncated Perron with a fixed height x^kappa, the exact identity beta_W(k)=log k-sum_{r|k,r<=W}Lambda(r), and the excluded-prime Mobius mean already used for the density. The transfer moves the prime-power detectors onto the arbitrary coefficient side, so the imported theorem's smoothness hypothesis is met and no cancellation of Mobius signs is used or needed. The resulting bound is an arbitrary-coefficient bound; its failure limits that bound only and asserts no obstruction to other methods, no parity claim and no optimality.
question: Does Bettin-Chandee Corollary 1, applied to d*k-e*t=2 after moving the non-smooth part of beta_V and beta_Z onto the coefficient side, control any part of the endpoint remainder that the current estimates do not?
verdict: The transfer is legal and exact: the smoothness hypothesis the literature scout recorded as the blocker is removable, at the cost eta=x^kappa and a boundary error O(x^(1-kappa)log^C x). Priced, it adds nothing. Requiring all four pieces and all bands gives 22max(a,b)+17min(a,b)<20, whose supremum of delta+nu is 2869/3900 < 19/25, so the region is strictly inside the already controlled delta+nu<19/25; the added area is exactly 0. A split by the size of the moved prime power also adds nothing, because every per-band budget is nondecreasing in the band exponents and the top band reproduces the full box. The log-log piece alone is controlled on 12.97 percent of the domain outside the current region, which is one of four pieces and changes nothing for R. W_dagger does not shrink, E_dagger is unchanged, and the sufficient twin margin remains OPEN.
-->

**Twin-prime infinitude and the sufficient margin C_2*x+E_dagger(x)>=c_0*x/log^K x
remain OPEN. Nothing here changes the controlled region, W_dagger, E_dagger or
the required saving in [grouped-divisor-moment.md (21)](grouped-divisor-moment.md).**
This note prices one literature interface and returns a negative. A larger
controlled exponent area would not be a lower bound on twins; that is said once
and applies to every region statement below.

The one thing this note does change is *which* obstruction is binding. The
wave-2026-09-06 literature scout located Bettin-Chandee Corollary 1 as an
asymptotic for our exact determinant equation with our exact Mobius coefficients,
failing on one hypothesis: our two cofactor weights are prime-power detectors,
not smooth. **That hypothesis failure is removable.** The identity
beta_W(k)=log k-sum_{r|k,r<=W}Lambda(r) moves the detector onto the arbitrary
coefficient side, where the corollary imposes no condition at all. What actually
stops the interface is the size of its error term.

## 1. The transfer and the four pieces

### 1.1 Two constraints are redundant

Throughout, x=2^j, J_x=(x/2,x] intersected with the integers, and the objects are
those of [RESEARCH-HANDOFF.md §3](RESEARCH-HANDOFF.md): U=V=floor(x^(6/25)),
Y=Z=floor(x^(1/20)), w=6/25, v=1/20, and

\[
 R(x)=\sum_{\substack{d>U,\ k>V,\ e>Y,\ t>Z\\ dk-et=2,\ dk\in J_x}}
       \mu(d)\mu(e)\beta_V(k)\beta_Z(t),\qquad
 \beta_W(k)=\sum_{r\mid k,\ r>W}\Lambda(r).
\]

Since beta_W(k)=0 for k<=W, the constraints k>V and t>Z may be deleted from the
summation without changing R(x). This is the step that makes the transfer
possible: after the split below, a retained k>V would be a sharp condition
coupling the smooth variable to the coefficient index, and no dyadic
decomposition of the coefficient would separate it. Deleting it first leaves
d>U and e>Y as the only sharp divisor conditions, and those sit on the arbitrary
coefficients, where they are free.

### 1.2 The exact four-piece decomposition

Use the identity sum_{r|k}Lambda(r)=log k, i.e.
beta_W(k)=log k-sum_{r|k,\ r<=W}Lambda(r), on both cofactors, and the exact
bijection (d,r) -> l=dr of [endpoint-fourier.md §2](endpoint-fourier.md). Write
n_2 for the left coefficient index, m_1 for the left smooth variable, n_1 for
the right coefficient index, m_2 for the right smooth variable, so that the
equation is m_1*n_2-m_2*n_1=2 with Delta=2. Then, exactly,

\[
 R(x)=T_{11}-T_{10}-T_{01}+T_{00},                              \tag{1}
\]

with all four sums taken over m_1*n_2-m_2*n_1=2, m_1*n_2 in J_x, and

| piece | n_2 coefficient | n_1 coefficient | f(m_1) | g(m_2) |
|---|---|---|---|---|
| T_11 | mu(d)1_{d>U}, n_2=d | mu(e)1_{e>Y}, n_1=e | log m_1 | log m_2 |
| T_10 | B_V(n_2)=sum_{n_2=dr,\ d>U,\ r<=V}mu(d)Lambda(r) | mu(e)1_{e>Y} | 1 | log m_2 |
| T_01 | mu(d)1_{d>U} | A_Z(n_1)=sum_{n_1=er',\ e>Y,\ r'<=Z}mu(e)Lambda(r') | log m_1 | 1 |
| T_00 | B_V(n_2) | A_Z(n_1) | 1 | 1 |

Both aggregated coefficients are arbitrary complex numbers as far as the import
is concerned, and are pointwise bounded: |B_V(n_2)|<=sum_{r|n_2}Lambda(r)=log n_2,
|A_Z(n_1)|<=log n_1. Hence

\[
 \|\alpha\|\,\|\beta\|\ll\sqrt{N_1N_2}\,\log^2x.               \tag{2}
\]

The support is sparser than that bound uses -- n_2=dr with r a prime power in a
band has about N_2/log x admissible values, each of size about log x -- so the
sharper norm is sqrt(N_2 log x). That is a logarithmic gain only; there is no
power saving available from the sparsity, and none is claimed.

Identity (1) and the redundancy of k>V, t>Z are verified exactly on five small
parameter sets in [determinant-corollary-validation.js](determinant-corollary-validation.js),
with the negative control that re-imposing m_1>V, m_2>Z inside the four pieces
destroys the identity.

### 1.3 Supports

Decompose d~x^delta, e~x^nu dyadically as in
[residual-coverage.md §1](residual-coverage.md), and the moved prime powers into
bands r~x^rho, r'~x^zeta with rho in [0,w], zeta in [0,v] (rho=0 or zeta=0
meaning the piece with no moved prime power). Then

\[
 N_2\asymp x^{\delta+\rho},\quad N_1\asymp x^{\nu+\zeta},\quad
 M_1\asymp x^{1-\delta-\rho},\quad M_2\asymp x^{1-\nu-\zeta},   \tag{3}
\]

because m_1*n_2=dk lies in J_x and m_2*n_1=dk-2. Write A=delta+rho and
B=nu+zeta for the two coefficient exponents. The worst band, rho=w and zeta=v,
gives exactly the expanded exponents a=delta+6/25 and b=nu+1/20 of the existing
notes.

Two bookkeeping points. The product n_2=dr over dyadic d and dyadic r has ratio
four, so it splits into O(1) blocks of ratio at most two; a sharp restriction of
an arbitrary coefficient is free. The smooth variables need a partition of unity
into intervals [M/2,M]; that is exact, costs O(log x) pieces of which O(1) are
nontrivial, and has eta of order one.

### 1.4 No g in {1,2} branch, and the main term

Corollary 1 acts on the equation itself, so the compatibility bookkeeping of
[signed-divisor-grouping.md (15)-(18)](signed-divisor-grouping.md) does not
arise. Its main term already carries the condition (n_1,n_2)|Delta, which at
Delta=2 is exactly our g=(a,b) in {1,2}; pairs with (n_1,n_2) not dividing 2
contribute nothing to T because the equation has no solution, which is the same
exactness as "incompatible congruences contribute zero". The CRT origin n_0, the
inverse residue and the two gcd branches are never formed. This is a genuine
simplification of the bookkeeping relative to our own route; it is not a saving.

The corollary's main term is

\[
 \sum_{\substack{n_1,n_2\\ (n_1,n_2)\mid2}}
   \frac{(n_1,n_2)}{n_1n_2}\,\alpha_{n_1}\beta_{n_2}
   \int_{\mathbb R} f\!\left(\frac{y+2}{n_2}\right) g\!\left(\frac{y}{n_1}\right)dy.
                                                                \tag{4}
\]

Its density factor (n_1,n_2)/(n_1n_2)=g/(ab) and its compatibility condition are
**identical** to the density term M_> of
[signed-divisor-grouping.md §5](signed-divisor-grouping.md); the modulus in both
is the lcm [n_1,n_2]=ab/g. The two differ only in that (4) integrates the smooth
weights we inserted while M_> sums the sharp counted weights over integers of
J_x, and that difference is bounded by the same smoothing error priced in §2.
At fixed e, r, r' the n_2 sum in (4) is a coprimality-restricted sum of
mu(d)/d against a weight of bounded variation, which is precisely the shape
handled in [endpoint-fourier.md §3](endpoint-fourier.md) by the uniform
excluded-prime Mobius mean of
[signed-divisor-grouping.md §2 (7)-(8)](signed-divisor-grouping.md); partial
summation absorbs the smooth weight. So (4) is O_H(x/log^H x) for every fixed H,
by reuse, and the corollary would control the endpoint remainder on the pieces
where its error is below x^(1-eta'). **The main terms match; there is no
mismatch to report.** This reuse is DERIVED by citation, not rewritten line by
line here; nothing in the verdict depends on it, because the error term fails
first.

## 2. Meeting the smoothness hypothesis: cost eta=x^kappa

The remaining sharp condition is dk in J_x, which couples m_1 to n_2. Separate
it by truncated Perron rather than by blocking the coefficient, which would
multiply the error by the number of blocks.

**Order of operations.** Deleting k>V and t>Z in §1.1 leaves the four-variable
sum with no a priori upper bound on m_1 or m_2 except the one dk in J_x itself
supplies. So fix the dyadic boxes first: the sharp restrictions d~x^delta,
e~x^nu, r~x^rho, r'~x^zeta go onto the arbitrary coefficients (free), the
partitions of unity in m_1 and m_2 are inserted as smooth factors summing to one
over all positive integers, and only then is dk in J_x separated, inside that
fixed box. The partitions are exact over the whole range, so no mass is lost to
a box outside the O(1) that dk in J_x makes nontrivial; on those boxes
M_1N_2 and M_2N_1 are both within a bounded factor of x, which is what makes
R=O(1) below. Separating first and blocking afterwards would be circular, since
the box bound on m_1 is exactly what the separated condition supplies.

Fix kappa>0, put c=1/log x, T_P=x^kappa, and use, for n=m_1n_2 inside such a
box,

\[
 1_{n\le x}=\frac1{2\pi i}\int_{c-iT_P}^{c+iT_P}\left(\frac xn\right)^s\frac{ds}s
   +O\!\left(\left(\frac xn\right)^c\min\!\left(1,
        \frac1{T_P|\log(x/n)|}\right)\right).                   \tag{5}
\]

Two such integrals give 1_{n in J_x}. The total error from (5) over all terms of
R(x) is O(x^(1-kappa) log^C x): the terms with |n-x|>x/T_P contribute at most
T_P^{-1} sum_n |a_n| x/|n-x| and those with |n-x|<=x/T_P at most
sum_{|n-x|<=x/T_P}|a_n|, where |a_n|<=d(n)d(n-2)log^2x. The same bound holds by
smoothing the cutoff at relative scale x^(-kappa) instead; both routes give the
same eta.

Inside the integral, (x/n)^s=x^s*n_2^(-s)*m_1^(-s). The factor x^s has modulus
x^c=O(1); the factor n_2^(-s) has modulus at most one and joins the arbitrary
coefficient; the factor m_1^(-s) joins f. With a fixed bump phi supported in
[1/2,1],

\[
 f(m_1)=\phi(m_1/M_1)\,(m_1/M_1)^{-s},\qquad
 f^{(j)}\ll_j(1+T_P)^jM_1^{-j},                                 \tag{6}
\]

and |f|=O(1). So eta is of order x^kappa>1, as the corollary requires. The
log-weights are normalised the same way: log m_1=log M_1+log(m_1/M_1), the
constant log M_1<<log x comes out in front and the remainder is a smooth O(1)
function with eta of order one. The integration over |Im s|<=T_P costs O(log x),
and the band and box decompositions cost O(log^C x).

Finally R=M_1N_2/(M_2N_1)+M_2N_1/(M_1N_2)=O(1), because m_1n_2 and m_2n_1 both
lie within a bounded factor of x. This is the one structural advantage of the
determinant formulation here: the ratio parameter that usually degrades this
corollary is trivial for us.

## 3. The imported theorem and the decisive inequality

**Imported statement, read at the primary source.** [Bettin-Chandee, *Trilinear
forms with Kloosterman fractions*, arXiv:1502.00769v1](https://arxiv.org/abs/1502.00769)
(3 February 2015; Adv. Math. 328 (2018) 1234-1262), **Corollary 1**, read
2026-09-06 in the arXiv PDF extracted with `pdftotext -layout`. Let Delta != 0
and

\[
 T(M_1,M_2,N_1,N_2)
  =\sum_{\substack{m_1\in\mathcal M_1,m_2\in\mathcal M_2,
                   n_1\in\mathcal N_1,n_2\in\mathcal N_2\\
                   m_1n_2-m_2n_1=\Delta}}
    f(m_1)g(m_2)\alpha_{n_1}\beta_{n_2},
\]

with supports M_i=[M_i/2,M_i], N_i=[N_i/2,N_i], and assume
f^{(j)}<<eta^j M_1^(-j), g^{(j)}<<eta^j M_2^(-j) for all j>=0 and some eta>1.
Then T equals

\[
 \sum_{\substack{n_1\in\mathcal N_1,n_2\in\mathcal N_2\\(n_1,n_2)\mid\Delta}}
   \frac{(n_1,n_2)}{n_1n_2}\alpha_{n_1}\beta_{n_2}
   \int_{\mathbb R}f\!\left(\frac{y+\Delta}{n_2}\right)g\!\left(\frac y{n_1}\right)dy
 +O\!\left((\eta R)^{3/2}\|\alpha\|\|\beta\|
   (N_1N_2)^{7/20}(N_1+N_2)^{1/4+\epsilon}(M_1M_2)^{\epsilon}\right),
\]

R=M_1N_2/(M_2N_1)+M_2N_1/(M_1N_2), norms being L2.

**Hypotheses, checked against §§1-2.** Delta=2 is nonzero, which is all the
corollary asks; the proof (its §9) additionally observes that one may assume
|Delta|<=4(M_1N_2+M_2N_1), which holds with room. Supports are dyadic after the
O(1) resplit of n_2=dr. alpha and beta are arbitrary complex, so d>U, e>Y,
r<=V, r'<=Z, the Perron twists d^(-s), the sparse prime-power support, the
prime 2, repeated prime powers and every low sector are admissible without
further hypotheses. f and g satisfy (6) with eta=x^kappa>1. R=O(1). No
coprimality between n_1 and n_2 is required. **No hypothesis fails.** The
corollary is uniform in nothing that we need to be uniform in beyond what is
displayed; the sum over d|Delta inside its proof has two terms at Delta=2.

**Not checked, assumed:** the corollary's own proof, and Theorem 1 on which it
rests. Both were read as statements, not verified.

**Pricing.** With (2) and (3), one application costs

\[
 x^{\,3\kappa/2+\frac{17}{20}(A+B)+\frac14\max(A,B)+\epsilon},   \tag{7}
\]

and O(log^C x) applications plus the Perron error O(x^(1-kappa)log^C x) do not
change the exponent. Since kappa>0 is fixed but arbitrarily small, the
sufficient condition, with a fixed margin eta'>0, is

\[
 \boxed{\ \tfrac{17}{20}(A+B)+\tfrac14\max(A,B)<1
   \iff 22\max(A,B)+17\min(A,B)<20.\ }                          \tag{8}
\]

The equivalence is verified on a rational grid in the validator.

## 4. The region, in exact rationals

Because 22max+17min>=17(A+B)+(5/2)(A+B)=(39/2)(A+B), (8) forces
A+B<40/39. Requiring **every** piece and **every** band to pass means taking the
worst band A=a=delta+6/25, B=b=nu+1/20, so

\[
 \delta+\nu<\tfrac{40}{39}-\tfrac{6}{25}-\tfrac1{20}
           =\tfrac{2869}{3900}=0.735641\ldots<\tfrac{19}{25}.    \tag{9}
\]

The all-pieces region is therefore **strictly inside** the first of the three
already controlled regions, delta+nu<19/25. Its added area is exactly zero.

| object | condition on (delta,nu) | vertices | area | added area |
|---|---|---|---|---|
| all four pieces, all bands | 2200*delta+1700*nu<1387 **and** 1700*delta+2200*nu<1482 | (6/25,1/20), (651/1100,1/20), (266/975,361/780), (6/25,537/1100) | 342383/4290000 = 0.079810 | **0** |
| log-log piece only (rho=zeta=0) | 22*delta+17*nu<20 **and** 17*delta+22*nu<20 | (6/25,1/20), (19/25,1/20), (19/25,82/425), (20/39,20/39), (6/25,199/275) | 167659/729300 = 0.229890 | 17013209/280280000 = 0.060701 |

Domain area 117/250; the log-log added area is 12.97 percent of it. Its vertices
are (3263/4900,771/2450), (20/39,20/39), (6/25,199/275), (6/25,63/100),
(47/150,67/150), (67/200,17/40), and in the reachability report's coordinates
p=19/25-delta, q=19/20-nu (an area-preserving affine map)
(461/4900,3113/4900), (241/975,341/780), (13/25,249/1100), (13/25,8/25),
(67/150,151/300), (17/40,21/40).

Named points, with the error exponent of (7) at kappa=epsilon=0:

| point | a, b | all pieces | log-log piece | currently controlled |
|---|---|---|---|---|
| benchmark (2/5,2/5) | 16/25, 9/20 | 2173/2000=1.0865, fails | 39/50, passes | yes |
| next target (8/25,9/20) | 14/25, 1/2 | 1041/1000=1.041, fails by 41/1000 | 767/1000, passes | no |
| (1/2,1/2) | 37/50, 11/20 | 2563/2000=1.2815, fails | 39/40, passes | no |
| corner (19/25,19/20) | 1, 1 | 39/20=1.95, fails | 1691/1000, fails | no |
| diagonal delta=nu | -- | passes iff delta<1387/3900=0.35564 | passes iff delta<20/39=0.51282 | -- |

**What the log-log row does and does not mean.** T_11 on a single box is a
divisor-correlation object, and Corollary 1 does give it an asymptotic on a
region 12.97 percent of the domain larger than the current one. Summed over
*all* boxes with d>U, e>Y, T_11 reconstructs a truncated form of the twin sum
itself, so this is not a statement that the easy part got easier: it is a
statement about individual boxes, on three-quarters of which the other three
pieces are uncontrolled. It changes nothing about the region controlled for R,
which is governed by the worst piece.

Note also that the diagonal constraint a+b<40/39 is the same constraint that
[endpoint-fourier.md](endpoint-fourier.md)'s use of Bettin-Chandee **Theorem 1**
already forces (recorded in the wave review of residual-coverage). That is not a
coincidence: Corollary 1 is proved from Theorem 1 and inherits its
(N_1N_2)^(7/20)(N_1+N_2)^(1/4) bracket.

## 5. Splitting by the size of the moved prime power adds nothing

The remaining question is whether the small-r pieces can go to Corollary 1 while
the large-r pieces go to the existing dispersion estimates.

**What the existing notes give for a fixed band, derived here.** The owning
notes state their bounds for the full expanded box, not per band. The per-band
version is an immediate re-application, not a new estimate: the band coefficient

\[
 A_1^{(s),\rho}(\ell)=-\sum_{r\mid\ell,\ r\sim x^{\rho},\ 2\le r\le W}
    \mu(\ell/r)(\ell/r)^{-s}1_I(\ell/r)\Lambda(r)
\]

is pointwise bounded by sum_{r|l}Lambda(r)=log l, since it is a subsum of
nonnegative Lambda weights against coefficients of modulus at most one, and its
support is l<<D*x^rho. [grouped-divisor-moment.md (1),(3)](grouped-divisor-moment.md)
is stated for arbitrary M,N,A>=1 and arbitrary bounded coefficients, so it
applies verbatim with M=x^(delta+rho), N=x^(nu+zeta), giving right-orientation
budgets

\[
 \tfrac12(1+\delta+\rho),\qquad
 \tfrac12(\delta+\rho)+\tfrac32(\nu+\zeta),\qquad \delta+\rho,   \tag{10}
\]

and the left orientation swaps them. Likewise
[residual-coverage.md (9)](residual-coverage.md) per band replaces W by x^zeta
and N by x^(delta+rho). Summing O(log^2 x) bands with a uniform margin is free.
At the top band rho=w, zeta=v, (10) reproduces exactly the recorded conditions
delta<19/25 and delta+3nu<161/100 -- verified on a rational grid in the
validator.

**Why no split helps.** Every per-band budget above, and the Corollary 1
exponent (7), is nondecreasing in both rho and zeta (checked on a grid). So each
estimate's per-band admissible set is downward closed in (rho,zeta). A split
covers a point (delta,nu) exactly when every band is admissible for some
estimate; by downward closedness that happens exactly when the **top** band
rho=w, zeta=v is admissible for some estimate. The set of such (delta,nu) is
the union of the current region with the all-pieces Corollary 1 region, and by
(9) the latter is contained in the former. **The split region equals the current
region.** Verified on a rational grid.

Two things this does not close. It does not exclude a decomposition of beta
other than log-minus-Lambda, and it does not exclude an estimate that uses the
band structure jointly rather than band by band. It closes only the specific
"route small r here, large r there" proposal.

For the record, at the next local target (8/25,9/20) Corollary 1 does cover
rho<223/1100 when zeta=1/20, and zeta<3/1700 when rho=6/25; the top band misses
by 41/1000 in the exponent. Covering a sub-band does not reduce the saving
needed on the binding band, so this does not lower the >3/50 requirement of
[grouped-divisor-moment.md (21)](grouped-divisor-moment.md).

## 6. Effect on the global consumer, and the corner

Because the controlled region is unchanged, the cuts (17)-(19) of
[grouped-divisor-moment.md](grouped-divisor-moment.md) are unchanged: **W_dagger
does not shrink**, E_dagger is the same exact weighted compatible CRT endpoint
sum, and (20) reads exactly as before. The uniform product threshold is still
every fixed exponent below 19/25, and the witness (8/25,11/25) of
grouped-divisor-moment §5 is still outside the all-pieces region of §4
(22*(14/25)+17*(49/100)=413/20>20). Its log-log piece alone is inside
the log-log region, which is exactly the point of the previous paragraph: one
controlled piece out of four leaves the witness uncontrolled.

The corner (delta,nu)=(19/25,19/20) fails, and it fails for a reason no choice of
smoothing repairs. At delta=19/25 the cofactor k=n/d has size comparable to
V, and beta_V(k)!=0 forces the prime-power part of k to exceed V. In the
log-minus-Lambda decomposition that means the whole mass sits in the top band
rho=w, so A=a=1 and (7) gives at least 17/20*(1+B)+1/4>=11/10>1. In the direct
decomposition k=r*k' with r>V the same thing happens with N_2=dr>x^(19/25+6/25)
and m_1=k' short, so again A tends to 1. The literature scout's phrasing --
that Corollary 1 fails "on smoothness" -- is therefore right at the corner for a
sharper reason than smoothness: at the corner the weight cannot be moved to
either side without driving one coefficient exponent to 1, and the error term
then exceeds x. This is the same a=1, b=1 edge that the wave-2026-09-06 reachability report
(a session working file, not part of this repository) identifies in its Q1 as
unreachable by nonzero-kernel improvement; it is reached here by a different
route.

## 7. Was Corollary 1 already applied here?

No. The distinction matters because Theorem 1 of the same paper is used
repeatedly in this repository.

| where | what was imported | to which object |
|---|---|---|
| [endpoint-fourier.md §5](endpoint-fourier.md), [endpoint-pairing.md](endpoint-pairing.md), [coefficient-structure.md](coefficient-structure.md), [dispersion-range.md](dispersion-range.md), [prime-power-dispersion.md](prime-power-dispersion.md) | Bettin-Chandee **Theorem 1** and Remark 1 | the post-Vaaler trilinear Kloosterman fraction with the endpoint phase |
| [small-divisor-kernel.md §5A](small-divisor-kernel.md) | Bettin-Chandee **Theorem 1** and Remark 1; DFI 1997 bound (1.1) as quoted by them | the post-reciprocity kernel (7) of that note; priced at block exponent 129/125 and 1267/1200, adding no region |
| [structural-literature-audit.md §3](structural-literature-audit.md) | §3B is Blomer-Pascadi and Pascadi; §3F is Friedlander-Iwaniec's asymptotic sieve | neither mentions Bettin-Chandee at all |
| the wave-2026-09-06 literature scout report, section F (a session working file, not part of this repository) | Bettin-Chandee **Corollary 1**, read at source | our determinant equation; recorded the smoothness hypothesis as the blocker, did not attempt the transfer |

**New here:** the observation that the smoothness hypothesis is removable by the
log-minus-Lambda identity once k>V and t>Z are deleted, the resulting exact
four-piece decomposition (1), the pricing (7)-(9), and the split argument of §5.
All of it is negative.

**Duke-Friedlander-Iwaniec, primary sources.** Both attempts to reach the
primary text failed today, and that is a statement about the fetcher:
*Bilinear forms with Kloosterman fractions*, Invent. Math. 128 (1997) 23-43
(Springer, DOI 10.1007/s002220050135) returns the paywall page, and no open copy
of *Representations by the determinant and mean values of L-functions* (1995)
was located. Their statements are taken from Bettin-Chandee's own text, which
was read at the primary source: DFI 1997's bound is
B_a(M,N)<<||alpha||||beta||(a+MN)^(3/8)(M+N)^(11/48+epsilon) (their (1.1)), and
DFI 1995 obtained the determinant corollary with the error
(eta R)^(19/8)||alpha||||beta||(N_1N_2)^(3/8)(N_1+N_2)^(11/48+epsilon)(M_1M_2)^epsilon.
Priced the same way, the DFI 1995 version needs
(7/8)(A+B)+(11/48)max(A,B)<1: on the diagonal that is 48/95=0.505263 against
Bettin-Chandee's 20/39=0.512821, and its all-pieces region is contained in the
Bettin-Chandee one. The containment is not pointwise domination of the two
brackets -- 7/8>17/20 but 11/48<1/4 -- so it needs its line. With S=A+B and
M=max(A,B),

\[
 \Bigl(\tfrac78S+\tfrac{11}{48}M\Bigr)-\Bigl(\tfrac{17}{20}S+\tfrac14M\Bigr)
 =\tfrac1{40}S-\tfrac1{48}M
 \ge\Bigl(\tfrac1{40}-\tfrac1{48}\Bigr)S=\tfrac S{240}>0,               \tag{11}
\]

using M<=S. So the DFI 1995 exponent exceeds the Bettin-Chandee exponent at
every (A,B), its admissible set is contained in (8)'s, and it likewise adds
nothing. Reading the DFI originals would not change the verdict.

## 8. Uncontrolled sectors, and what would change the verdict

Everything in E_dagger remains uncontrolled; §§4-5 add no rectangle to
[grouped-divisor-moment.md (19)](grouped-divisor-moment.md). Within this note,
two dependencies are cited rather than rewritten: the identification of (4) with
M_> reuses [endpoint-fourier.md §3](endpoint-fourier.md) and the excluded-prime
Mobius mean, and the per-band budgets (10) are a re-application of
grouped-divisor-moment (1),(3) rather than a statement in that note. Neither
affects the verdict, which is driven by the error term.

The verdict would change if any of the following were established, and none is:

* an error term for the determinant equation of the shape
  ||alpha||*||beta||*(N_1N_2)^gamma*(N_1+N_2)^kappa with a smaller exponent. At
  the next target (8/25,9/20), where a=14/25 and b=1/2, the requirement is
  (1/2+gamma)(a+b)+kappa*a<1. Holding kappa=1/4, that needs gamma<33/106=0.31132
  against Bettin-Chandee's 7/20; holding gamma=7/20, it needs
  kappa<99/560=0.17679 against 1/4. Those are the same order as the
  improvements [small-divisor-kernel.md §5A](small-divisor-kernel.md) computes
  for Theorem 1 on its own object at the same box (gamma<9/28, kappa<27/140),
  which is what one expects from two consumers of the same bracket. At the
  benchmark (2/5,2/5), already controlled by other means, the deficit in (7) is
  173/2000;
* a version averaged over Delta (Bettin-Chandee point at one, citing
  Bettin-Chandee-Radziwill), which our fixed Delta=2 cannot use;
* a decomposition of beta_V other than log-minus-Lambda that keeps both
  coefficient exponents below the boundary of (8) at the top band;
* an estimate that exploits the band structure jointly rather than band by band.

A failed upper bound closes its own scope. Nothing above shows that the
determinant formulation is a dead end, that Mobius cancellation is necessary,
or that any other method is obstructed.

## 9. Validation

[determinant-corollary-validation.js](determinant-corollary-validation.js) runs
in 0.2 s and carries its output under `research/qc/embed.js` custody. It checks,
in exact BigInt rationals, the equivalence of the two forms of (8), the
half-plane form of both regions, the containment (9), the added areas and their
vertices, the named points, the band thresholds at (8/25,9/20), the
monotonicity of every per-band budget, that the top band of (10) reproduces
delta<19/25 and delta+3nu<161/100, that the current union is unchanged by the
top-band Corollary 1 condition, and the DFI 1995 comparison. In finite
enumeration it checks
beta_W(k)=log k-sum_{r|k,r<=W}Lambda(r), that beta_W vanishes below W, identity
(1) on five parameter sets, and |B_V(n_2)|<=log n_2. Four negative controls
fire: swapping max and min in the error term, using (delta,nu) in place of
(a,b), re-imposing m_1>V and m_2>Z inside the four pieces, and dropping the
norm factor from (7).

These certify exponent bookkeeping and finite identities. They cannot establish
an asymptotic saving, an effective onset, or anything about the sign or size of
E_dagger.
