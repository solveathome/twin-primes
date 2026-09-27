# Keeping the two CRT endpoints together

<!-- ledger
id: Q-endpoint-pairing
status: ANSWERED
todo: C
parity: The exact difference of CRT sawtooths is integrated before applying Bettin-Chandee Theorem 1 and Remark 1. Vaaler's full positive majorant, composite moduli and both gcd branches remain present. An elementary divisor-count argument also bounds the entire majorant; the uniform excluded-prime Mobius mean controls the density. The resulting bound is regional; the global endpoint remainder and sufficient twin margin are OPEN.
question: Does retaining the difference of interval endpoints improve the complete Fourier budget, and are the lowest frequencies actually the next obstruction on the squarefree pilot rectangle?
verdict: A written derivation controls the full rectangle d~x^(11/40), e~x^(93/200) to O_H(x/log^H x), with product of order x^(37/50). The sufficient first exponent becomes 3/20+(7/10)(a+b)+(1/4)max(a,b), equal to 3999/4000 there. On the a=b=517/1000 pilot, this transition-frequency budget is 20061/20000, not the separate-endpoint 20163/20000; prime-dispersion.md now controls that pilot with a different estimate. Finite identities and exact exponent checks validate the implementation, not the asymptotic theorem. No uniform product cutoff or twin lower bound follows.
-->

**The twin margin remains OPEN.** The larger squarefree pilot is now
controlled by [prime-dispersion.md](prime-dispersion.md), consuming the
endpoint and majorant work here.
This note derives a stronger regional estimate from the same published
inputs as [endpoint-fourier.md](endpoint-fourier.md). The improvement is
in their application: retain the difference of endpoints at low
frequencies, and retain the actual Fourier coefficients of the error
majorant. No new exponential-sum theorem or novelty is claimed.

## 1. Statement and scope

Use the exact rectangle R_{I,J}, coefficients A_0,A_1 and cutoffs
U=V=floor(x^(6/25)), Y=Z=floor(x^(1/20)) in endpoint-fourier.md.
Let x tend to infinity through dyadic integers,
D=floor(x^delta), E=floor(x^nu), I=(D,2D], J=(E,2E], and put

$$
 a=\delta+6/25,\qquad b=\nu+1/20,\qquad
 \mathfrak c(a,b)=\frac3{20}+\frac7{10}(a+b)+\frac14\max(a,b).
                                                               \tag{1}
$$

**Derived regional bound.** If delta>6/25, nu>1/20 and
mathfrak c(a,b)<1, then, for every fixed H>0,

$$
                         R_{I,J}(x)\ll_H x/\log^H x.           \tag{2}
$$

The endpoint error has a fixed power saving. The density has arbitrary
fixed logarithmic savings, from the existing uniform Mobius lemma.
The constants can depend on delta,nu,H; a fixed strict margin is required.
The earlier sufficient condition remains valid, and can be preferable
when a+b<1. Both are sufficient conditions, not optimality claims.

For delta=11/40 and nu=93/200, we have a=b=103/200 and
mathfrak c=3999/4000<1. Thus the full rectangle with
d~x^0.275, e~x^0.465 and de~x^0.74 is controlled. It is eventually
disjoint from the earlier d~x^0.27 rectangle and from de<=x^0.70.
This does **not** control all pairs up to product x^0.74.
The larger d~x^0.277, e~x^0.467 rectangle in
[coefficient-structure.md](coefficient-structure.md) is still only reduced
to its QQ endpoint sector.

## 2. Pairing is an identity, not a pointwise factor pulled from a sum

For compatible divisors write l=gm, j=gn, (m,n)=1, g in {1,2},
q=gmn, and let n_0 be the CRT origin. Write e(u)=exp(2 pi i u),
z_0=x/2, z_0<=t<=x. The exact discrepancy is

$$
 \Delta_{\ell,j}(t)
 =\psi((z_0-n_0)/q)-\psi((t-n_0)/q),\qquad
 \frac{n_0}{q}\equiv\frac2g\frac{\overline m}{n}\pmod1.      \tag{3}
$$

Use the Vaaler polynomial and positive majorant from
endpoint-fourier.md (7), including psi(k)=-1/2 at integers. Its
coefficient is c_h=-W(h/(T+1))/(2 pi i h). For each nonzero h,

$$
 c_h\big[\mathrm e(hz_0/q)-\mathrm e(ht/q)\big]
   =\frac{W(h/(T+1))}{gmn}
                    \int_{z_0}^{t}\mathrm e(hz/(gmn))\,dz.  \tag{4}
$$

Consequently the sum over m,n,h can be estimated inside this integral.
On a dyadic box m~M,n~N,h~A put P=MN, Q=M+N, u=P/x, and normalize
the separate divisor coefficients to modulus at most one. In (4),
the coefficients become xi_{gm}/m and zeta_{gn}/n: they remain
separate and their norm product is O(P^(-1/2)). The harmonic norm
is O(sqrt(A)), and the integration costs at most x/2. Compared with
the separate-endpoint norm product O(sqrt(P/A)), this saves O(A/u).
This is a bound on the signed sum; merely taking a pointwise maximum
of the bracket in (4) outside an exponential sum would not justify it.

[Bettin-Chandee, Theorem 1 and Remark 1, pp. 2-3](https://arxiv.org/pdf/1502.00769)
apply to the remaining phase
e(-(2/g)h inv(m)/n+hz/(gmn)). The derivative parameter is O(Ax),
uniformly in z; the phase factor is O((1+A/u)^(1/2)). Positive and
negative harmonics are separate applications with theta=-2/g or 2/g.
Combining (4) with the independent separate-endpoint estimate gives
the polynomial contribution on this harmonic box, up to a fixed
arbitrarily small power loss,

$$
 (1+A/u)^{1/2}\min(1,A/u)
 \left[B_1 A^{-3/20}+B_2\right],\quad
 B_1=P^{17/20}Q^{1/4},\quad B_2=P^{7/8}Q^{1/8}.             \tag{5}
$$

The published statements were reread for this application. Their
arithmetic coefficients are arbitrary and the denominator need not be
prime. Division by m,n does not change those hypotheses.

## 3. The full majorant does not acquire the endpoint-difference factor

The approximation error is bounded by

$$
 D_T((z_0-n_0)/q)+D_T((t-n_0)/q).                           \tag{6}
$$

For the signed sum its coefficients are |xi_{gm}|, |zeta_{gn}|.
The zero mode costs O(P/T). The nonzero coefficients on h~A
have norm O(sqrt(A)/T), giving the distinct bound

$$
 (1+A/u)^{1/2}\frac A T
                 \left[B_1 A^{-3/20}+B_2\right].            \tag{7}
$$

All frequencies in (7) must be included. The factor A/T, rather than
the weaker bound 1 used previously, matters at low frequencies.
The source for (6) is
[Baier-Zhao, Lemma 2.2, p. 344](https://www.impan.pl/shop/publication/transaction/download/product/82887),
as transcribed in endpoint-fourier.md.

**Rejected shortcut:** multiplying the entire error majorant (6) by
min(1,T(t-z_0)/q) is invalid. If a unit interval ends exactly at a
CRT hit, its discrepancy is 1-1/q. At fixed T the polynomial
difference is O(T/q), while the full majorant is at most 1.
As q grows, the proposed extra factor would force an error of order
T/q despite the jump. The validator also retains a finite CRT witness.
This does not invalidate (4), which concerns the polynomial only.

## 4. Complete truncation and all divisor boxes

Choose fixed tau>0 with mathfrak c(a,b)+3tau<1. For boxes
P<=x^(1-tau), use |Delta|<=1 directly, for cost O(x^(1-tau)).
For the other boxes choose

$$
                 T=\left\lceil x^{2\tau}\max(1,u)\right\rceil.
                                                               \tag{8}
$$

The zero mode is O(x^(1-2tau)). We now bound both (5) and (7),
without discarding their harmonic factors.

* If u>=1 and A<=u, the first term in (5) is at most
  O(B_1 A^(17/20)/u)<=O(B_1 u^(-3/20)); its second term is O(B_2).
  For (7), replace u in the denominator by T>=u, with the same bounds.
* If u>=1 and u<=A<=T, the first term in (5) is
  O(B_1 u^(-3/20)(A/u)^(7/20)). Its maximum is
  O(x^(7tau/10)B_1 u^(-3/20)). The first term in (7) increases as
  A^(27/20)/T and has the same upper bound at A=T. Both second
  terms are O(x^tau B_2).
* If x^(-tau)<u<1, the phase factor is O(x^(3tau/2)),
  min(1,A/u)<=1, A/T<=1 and A^(-3/20)<=1<=u^(-3/20).

Thus each harmonic box is bounded by

$$
 x^{3\tau/2+\varepsilon'}
       \left[x^{3/20}P^{7/10}Q^{1/4}+P^{7/8}Q^{1/8}\right]. \tag{9}
$$

Here choose the theorem's fixed epsilon sufficiently small that
epsilon'<=tau/2; all parameters have fixed polynomial size. The
ceiling and dyadic endpoints cost absolute constants. Both monomials
increase with M,N, so the global support bounds M<<x^a,N<<x^b give
the exponents

$$
 c_1=\mathfrak c(a,b),\qquad
 c_2=\frac78(a+b)+\frac18\max(a,b).                         \tag{10}
$$

There is no hidden second-term constraint: since max(a,b)>=(a+b)/2,
c_2<=(25/22)(c_1-3/20). If c_1<1, then c_2<85/88<1.
In fact c_2<c_1 in this range. Also c_1<1 implies a,b<1.
The small-P treatment covers the modulus-one endpoints; in the large-P
boxes both reduced moduli grow since a,b<1 and tau can be decreased.

Sum the logarithmically many boxes and restore the coefficient log
bounds. Uniformly for integer t in [x/2,x], the endpoint sum is
O(x^(1-tau)log^C x). Discrete partial summation restores each of the
four smooth n-weights exactly as in endpoint-fourier.md, costing fixed
logarithms. Its section 3 density argument applies unchanged: the d
interval lies above U, the parity numerator is fixed, the excluded-prime
parameter is at most x^2, and the outer harmonic sums cost logarithms.
This proves (2) at every fixed logarithmic precision.

For a=b=103/200 one may take tau=1/20000:
c_1=3999/4000, c_2=309/320 and c_1+3tau=9999/10000<1.
The endpoint estimate is O(x^(19999/20000)log^C x), with no effective
finite onset asserted. The corresponding separate-endpoint first
budget is 4017/4000>1.

On balanced supports a=b=s, (1) becomes 3/20+33s/20<1, or
s<17/33. The corresponding original divisor-product exponent is
2s-29/100<2443/3300. This is a strict sufficient boundary for these
balanced rectangles, **not** a theorem about the complete product range
or an optimal barrier. The same fraction 17/33 appears in classical
applications of the Bettin-Chandee input; no novelty is inferred.

## 5. Where this generic bound loses its saving on the pilot

On the top expanded boxes of the coefficient-structure pilot,
a=b=517/1000, P~x^(517/500), u~x^(17/500). Put A~x^eta.
The first polynomial exponent in (5) is

$$
 F(\eta)=
 \begin{cases}
  19483/20000+(17/20)\eta,&0\le\eta\le17/500,\\
  20061/20000+(7/20)(\eta-17/500),&\eta\ge17/500.
 \end{cases}                                                \tag{11}
$$

In particular h~1 has exponent 0.97415, below scale x.
For eta<=3/100 the first exponent is at most 19993/20000=0.99965,
before a sufficiently small epsilon loss. The second term is smaller.
These low-frequency statements refer to these top boxes; other boxes
have their own transition u=P/x and are covered by (5)-(9).
The low majorant modes also retain A/T, so do not undo this saving.

At the transition A~P/x~x^0.034, the first budget is
20061/20000=1.00305. T must exceed this transition by a small power
to control the zero mode. In the Fourier treatment (7), the highest
majorant modes also meet this budget; the independent bound below
removes that additional requirement. The signed polynomial estimate
still does not control the pilot: its
limiting deficit is now 61/20000, with additional strict losses to pay.
This replaces 163/20000 as the relevant deficit, but is still a failed
upper-bound budget, not a lower bound on the actual correlation.

The full majorant also has an elementary bound that removes the need
for a further oscillatory estimate on its absolute coefficients. This
is useful for a signed improvement, even though (7)-(9) already suffice
for the controlled rectangle.

**Divisor-count bound for the full tail.** Suppose all nonzero original
divisor indices l,j exceed 2, as they do here eventually. On the fixed
g box above q<=8P. Set w=8P/(T+1). For 1<=w<=x and z in [x/2,x],
normalized coefficients satisfy

$$
 \sum_{\ell,j\atop (\ell,j)\mid2}
    |\xi_\ell\zeta_j|D_T((z-n_0)/q)\ll_\epsilon w x^\epsilon.
                                                               \tag{12}
$$

To prove this, the Fejer-kernel expression in endpoint-fourier.md gives
D_T(v)<=min(1/2,1/(8(T+1)^2||v||^2)). If k is a nearest CRT
solution to z, this is at most 2(1+|k-z|/w)^(-2). Enlarge to the
sum over all integer CRT solutions and interchange the nonnegative sums.
For each integer k other than 0,2, the number of divisor pairs is at most
d(|k|)d(|k-2|)<<_epsilon (1+|k|)^epsilon. At k=0 or 2 there are
no pairs, because j>2 cannot divide -2 and l>2 cannot divide 2.
Negative integers cause no further exception. Thus the left side is at
most a constant times

$$
 \sum_{k\in\mathbb Z\setminus\{0,2\}}
       \frac{(1+|k|)^\epsilon}{(1+|k-z|/w)^2}
                      \ll_\epsilon w x^\epsilon.             \tag{13}
$$

Here choose 0<epsilon<1: for |k-z|<=x the sum is O(w x^epsilon),
and the dyadic outer tails are O(w^2 x^(-1+epsilon)), no larger.
The standard divisor bound used here is elementary: for fixed epsilon,
the ratios (a+1)/p^(epsilon*a) are <=1 for all sufficiently large
primes, and their maxima over a>=0 for the finitely many other primes
have finite product. Apply this with epsilon/2 to each divisor function.

With (8), w<<x^(1-2tau) and w>=1 eventually. Choose epsilon<tau/2
and restore coefficient logarithms: the **entire** positive tail has
cost O(x^(1-3tau/2)log^C x), uniformly at both endpoints. This argument
includes every Fourier mode by bounding D_T itself. It neither drops
nonzero modes nor applies the false pairing factor to the positive tail.
For generic coefficient supports containing 1 or 2 the exceptional
integers need separate estimates; the stated lemma does not omit them.

**Remaining signed estimate:** improve the bound on every box where (5)
lacks a saving, using the exact prime-factor identity (13) in
coefficient-structure.md. On the top boxes it suffices to address
x^0.03<A<=T; the largest deficit approaches 61/20000 around A=P/x,
with the additional losses from T and epsilon still to pay. An estimate
only at A comparable to P/x would leave intervening bands unaddressed.
The full tail can be consumed using (12), so the
new saving is needed in the signed polynomial sum. Retain p,q averaging,
the endpoint perturbation and both gcd branches. A different approximation
or a one-sided argument can have a different budget, but must write it down.
Do not retry a uniform squarefree norm power saving or treat h~1 as
the bottleneck on these top boxes.

[prime-band-completion.md](prime-band-completion.md) now localizes
the remaining distinguished primes and gives a cutoff h<=x^0.029
uniform across the divisor boxes. It derives exact completion in the
right prime modulus and checks why a general full-frequency operator
bound cannot give the missing saving. [prime-dispersion.md](prime-dispersion.md)
supplies a second moment retaining right-prime cross terms and controls
the full pilot, consuming the low-frequency and full-tail inputs here.

Removing this controlled rectangle only replaces E_other in the
existing global identity S=C2*x+E_other+E_QQ+O_H(x/log^H x) by its
remaining contribution. E_QQ is now controlled by the dispersion argument;
E_other and the sufficient twin margin remain OPEN.

## 6. Source checks and an unsuccessful import

Literature checked 2026-09-05, using the Kloosterman-fraction convention.
[Bilinear forms with Kloosterman fractions and applications](https://arxiv.org/abs/2601.00292)
is withdrawn. Its author notice identifies a missing L^2 in (2.53)
and explicitly retracts the advertised improvement. That improvement
is not an available input. The notice does not invalidate every argument
in the paper.

[Wright, v2, Theorem 2.1](https://arxiv.org/html/2604.25177v2)
instead keeps a fixed denominator factor R. Price the direct application
with R=q~x^0.05, M~x^0.517, N~x^0.467, A~x^0.034, retaining the left
prime convolution but estimating the q sum by triangle inequality.
Its condition M<<N^2 holds. The norms and outer prime sum have total
prefactor exponent M_exp+N_exp+(5/4)R_exp=1.0465, after the harmonic
norm cancels A^(1/2). Substituting into the theorem's five terms gives

$$
        0.988125,\quad 0.981875,\quad 1.01895,\quad
                        1.00805,\quad 0.963125.              \tag{14}
$$

Even granting the endpoint perturbation at no power cost, this direct
budget is worse than (11). It cannot supply the missing saving. This
prices a particular use of a preprint statement; its full proof is not
imported into (2). Averaging R before taking absolute values remains a
different, untested argument. Search snippets and an abstract's exponents
are insufficient substitutes for the versioned theorem statement.

## 7. Validation and falsifiers

[endpoint-pairing-validation.js](endpoint-pairing-validation.js) and its
[retained artifact](data-reuse/endpoint-pairing.json) check the exact CRT
count against direct enumeration, polynomial pairing via an independent
sinc integral, both gcd branches, and the full signed majorant inequality.
They retain controls against dropping nonzero majorant modes and against
incorrectly pairing the positive tail. Rational arithmetic checks the
exponent comparisons (10), (11), (14) and the strict truncation margins.
The Fejer tail is also bounded by
grouping nearby positive and negative integers and counting divisors,
with the exceptional integers 0,2 explicitly excluded by the supports.
A finite grid tests the three budget branches without taking their
asymptotics as experimental evidence.

An incorrect sign in (4), failure to preserve separate coefficients,
an unpriced phase derivative, or omission of (7) would defeat the
derivation; these points were rechecked in the argument above. Finite
tests can falsify the algebra or exponent implementation, not prove the
asymptotic exponential-sum input or the density lemma. No larger archived
sieve run is needed for this analytic check. No asymptotic twin count,
proportion of residual mass removed, or effective onset is measured.

The completed check pass also ran all fourteen strict QC gates with no
findings, the verifier self-tests (58 positives and 47 controls), and
the existing numerical audit (251/251). These are distinct from the new
validator's checks and from reviewing the mathematical derivation.
