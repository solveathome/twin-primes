# The squarefree coefficient core and the sparse exceptions

<!-- ledger
id: Q-coefficient-structure
status: ANSWERED
todo: C
parity: Exact prime-factor formulas split the aggregated coefficients into a low-divisor term, a squarefree Mobius-signed prime sum, and a sparse nonsquarefree term. Elementary support bounds and the full Vaaler/Bettin-Chandee endpoint budget remove all but the squarefree-squarefree sector on a specified rectangle. Ordinary PNT proves that the squarefree coefficient norms have no uniform power saving; this does not exclude cancellation in their signed inverse-residue correlation. The sufficient twin input remains OPEN.
question: Does the arithmetic structure of the aggregated coefficients reduce the endpoint estimate beyond the previous rectangle, and can smaller coefficient norms alone supply the remaining power saving?
verdict: Exact classification gives a nonsquarefree L2 norm of size at most sqrt(D)*W^(1/4) times logarithms, while the squarefree top-band energy is at least a constant times D*W*log(W). At d~x^0.277, e~x^0.467 every endpoint sector except the squarefree-squarefree prime sum has a power saving. This reduces that rectangle to one explicit endpoint correlation; prime-dispersion.md supplies the remaining estimate and controls the full rectangle. Finite algebra, CRT sectors and archived prefixes are checked separately.
-->

**The sufficient twin estimate remains OPEN.** This note simplifies a
further rectangle of the remainder; [prime-dispersion.md](prime-dispersion.md)
now establishes cancellation of that entire rectangle by consuming this
reduction. The controlled rectangles in
[endpoint-fourier.md](endpoint-fourier.md) and
[endpoint-pairing.md](endpoint-pairing.md) remain available. The latter
also improves the generic QQ Fourier budget by keeping endpoints paired.

There are two outcomes. The nonsquarefree coefficients are sparse enough
to remove more endpoint terms. The squarefree coefficients do not have
a uniform power saving in their individual norms. Further progress on
the remaining term must use more than that proposed norm improvement.
All asymptotic statements below are written derivations using the stated
inputs, separate from the finite validation.

## 1. Exact formulas on a dyadic divisor interval

For I=(D,2D] and integer W>=1 use A_0,A_1 from endpoint-fourier.md (4).
The contribution at an expanded divisor l is A_0(l)log n+A_1(l).
Define

$$
 L_0(\ell)=\mu(\ell)1_I(\ell),\qquad
 L_1(\ell)=-\mu(\ell)1_I(\ell)\log\ell,
$$

$$
 Q(\ell)=\mu(\ell)1_{\ell>2D}
       \sum_{p\mid\ell,\ p\le W,\ \ell/p\in I}\log p,
 \qquad B(\ell)=A_1(\ell)1_{\mu(\ell)=0}.                 \tag{1}
$$

The p sum is over primes. Then, exactly,

$$
 A_0(\ell)\log n+A_1(\ell)
       =L_0(\ell)\log n+L_1(\ell)+Q(\ell)+B(\ell).       \tag{2}
$$

For squarefree l only r=p can survive in the convolution defining A_1,
and mu(l/p)=-mu(l). If l is in I, then l/p<=D for every p>=2, so its
prime sum is empty. Outside I the nonzero squarefree terms lie above
2D and have the form Q. All terms inside Q(l) have the same sign.

If l has two distinct repeated prime factors, removing a power of one
prime cannot make l/r squarefree, so B(l)=0. Otherwise write
l=p^a m with a>=2, m squarefree and p not dividing m. Only r=p^(a-1)
and r=p^a can survive. Their signs give

$$
 B(p^a m)=\mu(m)\log p\left(
   1_{p^{a-1}\le W}1_I(pm)-1_{p^a\le W}1_I(m)\right).     \tag{3}
$$

The two interval indicators cannot both be one: if m>D, then pm>2D.
Thus each nonzero B is exactly plus or minus log p. Its sign is not
constant, and it is not identically zero. For I=(5,10], W=4, the exact
witnesses are B(12)=-log 2 and B(28)=+log 2.

The low terms have support at most 2D. Q and B have support in
(2D,2DW]. These supports and squarefreeness separate the cases, and
the original bound |A_1(l)|<=2log l can be sharpened to |A_1(l)|<=log l.
This constant improvement itself does not change a power budget.

## 2. A smaller norm for the nonsquarefree part

Count representations l=d p^k that can contribute to B, allowing
overcounting. For k=1, d must be divisible by p. There are at most

$$
 \sum_{p\le\min(W,2D)}
       \left(\lfloor2D/p\rfloor-\lfloor D/p\rfloor\right)
                       \ll D\log(2W)                         \tag{4}
$$

such representations. Indeed the summand is at most D/p+1<=3D/p
for p<=2D; the harmonic sum over all integers suffices. For k>=2
there are O(sqrt(W)log(2W)) possible prime powers and at most D
choices of d for each. Consequently

$$
 \#\operatorname{supp}B\ll D\sqrt W\log(2W),\qquad
 \|B\|_2\ll D^{1/2}W^{1/4}\log^{3/2}(2DW).                \tag{5}
$$

These are global support and norm bounds, so they hold after restriction
to any expanded-divisor box or to l=gm with g in {1,2}. They also hold
for |B| in the Fourier error majorant. On a box of length M use the
smaller of (5) and the pointwise bound O(sqrt(M)log x).
No cancellation between different B coefficients is assumed.

## 3. Why the squarefree norm cannot gain a fixed power

Let D=floor(x^delta), W=floor(x^w), for fixed delta,w>0. Define the
top band T=(DW/2,2DW]. The following lower bound is derived, not fitted:

$$
                  \sum_{\ell\in T}|Q(\ell)|^2
                           \gg D W\log W.                    \tag{6}
$$

To prove it, take p in (W/2,W], d in I, d squarefree and p not dividing d.
Then l=dp belongs to T, is squarefree, and contributes log p to the
positive magnitude inside Q(l). Repeated representations of l cannot
cancel: (sum log p)^2>=sum (log p)^2. Thus

$$
 \sum_{\ell\in T}|Q(\ell)|^2
 \ge \sum_{W/2<p\le W}(\log p)^2
                  \#\{d\in I:\mu(d)^2=1,\ p\nmid d\}.     \tag{7}
$$

The elementary identity mu(d)^2=sum_{r^2|d}mu(r) gives
#squarefree d in I=D/zeta(2)+O(sqrt D), by summing the floors and
bounding the tail of sum mu(r)/r^2 absolutely. Excluding multiples of
p removes at most 3D/p when p<=2D, and none when p>2D. Therefore
the count in (7) is at least a fixed positive multiple of D, uniformly
for these primes once x is large enough.

Ordinary PNT gives sum_{W/2<p<=W}(log p)^2 asymptotic to
(W/2)log W. The only analytic input for this step is the ordinary
prime number theorem, available in
[Tao, Notes 2, Corollary 39 and Exercise 40](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/).
This proves (6). The pointwise upper bound |Q(l)|<=log l gives

$$
 \|Q1_T\|_2=x^{(\delta+w)/2+o(1)},\qquad
 \#\{\ell\in T:Q(\ell)\ne0\}\gg DW/\log x.              \tag{8}
$$

In particular no bound ||Q1_T||_2<<x^((delta+w)/2-epsilon) with fixed
epsilon>0 is possible. T is the union of two multiplicative dyadic
boxes, so a uniform such norm saving on all boxes is also excluded.
This closes a **specific norm-only improvement**, not cancellation in
the two-coefficient phase sum. It does not rule out logarithmic gains,
special ranges, coprimality effects or a one-sided estimate.

## 4. Insert the sparse norm into the complete endpoint budget

Keep x dyadic, V=floor(x^(6/25)), Z=floor(x^(1/20)). Use I=(D,2D],
J=(E,2E], with D=floor(x^delta), E=floor(x^nu), delta>6/25 and nu>1/20.
Put a=delta+6/25, b=nu+1/20 and assume a,b<1. Use separate copies of
L_0,L_1,Q,B on the two sides.

For a pair of coefficient types, let a',b' be their support exponents
and rho,sigma their L2 norm exponents. Logarithmic factors are omitted
in the following table, not in the proof:

| type on side (D,W)=(x^delta,x^w) | support exponent | norm exponent |
|---|---:|---:|
| L_0 or L_1 | delta | delta/2 |
| Q | delta+w | (delta+w)/2 |
| B | delta+w | delta/2+w/4 |

The [Bettin–Chandee Theorem 1 and Remark 1](https://arxiv.org/pdf/1502.00769)
application already checked in endpoint-fourier.md now has exponents

$$
 b_1'=\rho+\sigma+{7\over20}(a'+b')+{1\over4}\max(a',b'),
 \quad
 b_2'=\rho+\sigma+{3\over8}(a'+b')+{1\over8}\max(a',b').    \tag{9}
$$

To check the transfer, on an expanded-divisor box of sizes M,N and a
harmonic box of size A, keep the factor
(1+Ax/(MN))^(1/2). The divisor norms multiply the Fourier norm
O(A^(-1/2)); the two terms before the divisor norms are
(MN)^(7/20)(M+N)^(1/4)A^(-3/20) and
(MN)^(3/8)(M+N)^(1/8), up to epsilon losses. They increase with M,N,
so the global norm bounds and upper supports give (9) on every box.
Here b_2'<=b_1' as in the preceding note.

Choose fixed tau>0 with b_1'+3tau<1. For MN<=x^(1-tau) the direct
discrepancy bound still costs O(x^(1-tau)) times logarithms. On the
remaining boxes keep T=ceil(x^(2tau)max(1,MN/x)). The full Vaaler
majorant's zero mode is bounded by O(MN/T) times logarithms; its
nonzero modes have the same norm bound as the main Fourier terms.
The perturbation costs at most x^(3tau/2), and a sufficiently small
fixed theorem epsilon costs at most x^(tau/2). Thus (9) gives the
same endpoint power saving O(x^(1-tau)log^C x) as before.
Splitting gcd=1,2 and partial summation of the explicit log n and
log(n-2) weights are unchanged. The zero mode and the sparse norm
are both retained; sparsity does not justify deleting the majorant.

Write mathfrak b=(17/20)(a+b)+(1/4)max(a,b). Replacing a Q by B
decreases the first exponent by w/4. Replacing it by either low term
decreases it by at least (17/20)w. It follows that **every sector
except QQ has a power saving** whenever

$$
             \mathfrak b-{\min(6/25,1/20)\over4}<1.          \tag{10}
$$

This assertion concerns endpoint errors of the expanded expression.
It does not say each corresponding raw correlation or density is small.

## 5. One remaining term on an additional rectangle

Take delta=277/1000 and nu=467/1000. The expanded exponents are
a=b=517/1000. The separate-endpoint QQ first exponent is 20163/20000>1; the largest
of all other sector exponents is 19913/20000<1, attained by QB.
With tau=1/1000, the latter plus 3tau is 19973/20000<1.
These comparisons are checked with exact rationals by
[coefficient-structure-validation.js](coefficient-structure-validation.js).

Let Delta_{l,j}(x) be the exact CRT count minus density from
endpoint-fourier.md (8), zero when gcd(l,j) does not divide 2. Define

$$
 E_{QQ}(x)=\sum_{\ell,j}Q_{I,V}(\ell)Q_{J,Z}(j)
                                  \Delta_{\ell,j}(x).        \tag{11}
$$

The whole rectangle's density M_{I,J} is O_H(x/log^H x), by the
uniform excluded-prime Möbius argument; a,b<1 ensures the cofactor
cutoffs are automatic eventually. Summing the other endpoint sectors
therefore gives the derived reduction

$$
                 R_{I,J}(x)=E_{QQ}(x)+O_H(x/\log^H x)
                       \quad\hbox{for every fixed }H.        \tag{12}
$$

Up to this point only the **total** density has been discarded using
that proof. The QQ density remains inside Delta in (11). There is also
a separate uniform argument for this particular density, as follows.

Write C_QQ for the raw correlation obtained by replacing Delta in (11)
with the CRT count. Its density M_QQ=C_QQ-E_QQ is exactly

$$
 M_{QQ}={x\over2}\sum_{p\le V,q\le Z}(\log p)(\log q)
       \sum_{d\in I,e\in J\atop p\nmid d,q\nmid e}
       \mu(d)\mu(e){\gcd(dp,eq)\over dp\,eq}
                       1_{\gcd(dp,eq)\mid2}.               \tag{12a}
$$

Fix p,e,q and write d=2^epsilon t, t odd, epsilon in {0,1}.
If p=2, the condition p not dividing d forces epsilon=0.
For odd p, compatibility first requires p coprime to the odd part of
eq; the remaining odd d restriction excludes the prime factors of
both p and eq. For each allowed epsilon the numerator of the density
is constant, at most 2. The d sum is therefore a constant of magnitude
at most 2/(epq) times an excluded-prime mu(t)/t sum, with parameter
m=2p(eq)_odd and t in (D/2^epsilon,2D/2^epsilon].

Here m<=2V*(2EZ)<=x^2 eventually, since b<1 and V<=x^(6/25).
The lower endpoint is at least U/2 and the upper endpoint is below x.
The uniform lemma in signed-divisor-grouping.md section 2 applies.
After this signed d sum is bounded, the outer sums over e,p,q cost
only fixed powers of log x: sum 1/e and sum_{p<=V}(log p)/p suffice,
and the restriction q not dividing e can only reduce those absolute
costs. Consequently M_QQ=O_H(x/log^H x) for every fixed H.

Thus (12) also holds with C_QQ in place of E_QQ. This is an
asymptotic density estimate with a written proof; M_QQ is not exactly
zero. The exact finite object (11) retains the subtraction.

The rectangle has de of order x^(744/1000), outside the old de<=x^0.70
region and disjoint from the previously controlled d~x^0.27 rectangle,
eventually. Equation (12) simplifies this further region; the bound on E_QQ
is now supplied by [prime-dispersion.md](prime-dispersion.md). No uniform product
cutoff is extended. If E_rest is the remainder in endpoint-fourier.md
(15), set

$$
 E_{\rm other}=E_{\rm rest}-(R_{I,J}-M_{I,J}).
$$

Then S=C_2x+E_other+E_QQ+O_H(x/log^H x). Both E_other and the necessary
joint one-sided improvement remain OPEN. Establishing E_QQ=o(x) alone
on this rectangle would not complete a proof of twins.

## 6. Validation and the next arithmetic question

The validator checks 172,584 exact log-prime coefficient identities,
including 4,403 nonzero nonsquarefree coefficients and 9,718 inputs
with two repeated primes that vanish. It checks the support allowance
(4) plus the higher-prime-power count, the squarefree witness inequality
(7), and all 16 CRT sectors on a full toy interval. There are 1,619
compatible cells, including 595 with gcd=2. At x=4096 in that toy,
the total endpoint error is 6.147204950 but the QQ endpoint is
-6.294308087; omitting the other sectors is not an exact finite identity.
The density is 455.504935205 and is explicitly retained.
An independent prime-factor enumeration also reproduces (12a) and
the QQ endpoint, including the primitive prime restrictions.

Three archived factor prefixes are reused. Their raw QQ/partner values
are 0, 0.009877710 and -0.000297641. These are **raw prefix correlations**,
not (11): the density has not been subtracted, and neither the full
dyadic interval nor an asymptotic rate is measured. Finite norms likewise
validate inequalities, not their limiting exponents. The bound output
and [retained artifact](data-reuse/coefficient-structure.json) distinguish
these quantities and include the input hash.

The classification would fail if an allowed prime-power exponent or
an interval endpoint were lost. The norm transfer would fail if the
smaller norm were claimed without its wider support, or if a density
were silently set to zero. Equations (1)–(12) and the finite controls
check these points. The analytic imports and asymptotic applications
are written arguments, not conclusions of the scripts.

The remaining prime structure can be written exactly as

$$
 E_{QQ}=\sum_{p\le V,\ q\le Z}(\log p)(\log q)
   \sum_{d\in I,e\in J\atop p\nmid d,\ q\nmid e}
             \mu(d)\mu(e)\Delta_{dp,eq}(x),                 \tag{13}
$$

where p,q are primes and incompatible CRT pairs contribute zero. The
coprimality restrictions make dp and eq squarefree whenever their
Möbius factors are nonzero. This identity preserves the prime averages;
estimating every p,q separately would reintroduce the norm loss already
documented in endpoint-fourier.md.

The remaining correlation retains the prime averages in (13).
[Endpoint pairing](endpoint-pairing.md) improves
the relevant first power budget: on the top expanded boxes, the
remaining deficit is 61/20000 near h~MN/x~x^0.034, before strict
losses. The lowest frequencies there are already power-saving.
The full majorant is controlled by the elementary divisor-count bound
in that note's section 5; do not discard it or identify its absolute
coefficients with the signed QQ coefficients.
[Prime-band completion](prime-band-completion.md) removes the small
distinguished primes and low harmonics uniformly, then derives an exact
transform with coupled coefficients. [Prime dispersion](prime-dispersion.md)
then controls this pilot by regrouping m=dp before Cauchy and retaining
the right-prime cross terms; the general full-dual-range operator bound
remains insufficient at its proved scope.
A one-sided estimate may have a different sufficient budget.
The individual squarefree norm reduction is now ruled out at the stated
uniform power scope; it is not a reason to discard the phase correlation.
