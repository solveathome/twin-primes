# A cross-prime second moment controls the squarefree pilot

<!-- ledger
id: Q-prime-dispersion
status: ANSWERED
todo: C
parity: Regroup the left prime and Mobius divisor before Cauchy-Schwarz, retain the right prime and harmonic averages, and use classical Ramanujan and Weil bounds for composite moduli. Both gcd branches, coprimality conditions and endpoint perturbations are explicit. Together with the established sector, prime-strip, low-frequency and full-majorant bounds, this controls the pilot rectangle. The rest of the endpoint remainder and the sufficient twin margin remain OPEN.
question: Can a second moment retaining two right primes control the remaining localized squarefree pilot after its actual conductor and coefficient costs are included?
verdict: Yes at this rectangle: aggregation in m=dp before Cauchy gives a logarithmically bounded coefficient on a long interval. The only zero-phase pairs are identical (q,h). Distinct primes give modulus e*q1*q2 with gcd loss at most O(A*Z); completion and Weil bound all off-diagonal terms. The diagonal has exponent 1989/2000 and the largest off-diagonal exponent is 1173/1250 before an arbitrarily small loss. The remaining high-frequency polynomial is O(x^(199/200)); consuming the previous reductions gives R_IJ=O_H(x/log^H x) at D=x^0.277, E=x^0.467. This is a full rectangle at product scale x^0.744, not a uniform product cutoff or a twin lower bound.
-->

**Twin-prime infinitude and the complete endpoint estimate remain OPEN.**
The narrower pilot rectangle is controlled by the argument below using
classical inputs. The movement is from a reduction of that rectangle to
an estimate for it. Finite checks test the identities and bookkeeping;
they do not prove the asymptotic inputs or provide an effective onset.
No novelty claim is made.

## 1. The input already established

Use the notation and reductions of
[prime-band-completion.md](prime-band-completion.md). The original
divisor intervals are I=(D,2D], J=(E,2E], with
D=floor(x^(277/1000)), E=floor(x^(467/1000)). The only sector still
requiring a bound there is the squarefree-squarefree discrepancy E_+.
After removal of small prime factors and low harmonics, its positive
Vaaler polynomial has

$$
 x^{.235}<p\le V=\lfloor x^{.24}\rfloor,\qquad
 x^{.045}<q\le Z=\lfloor x^{.05}\rfloor,\qquad
 x^{.029}<h\le T\ll x^{.0342}.                         \tag{1}
$$

Fix a reduced expanded-divisor box m~M, n~N, meaning (M,2M] and
(N,2N], and a gcd branch g in {1,2}. Both M,N lie between constant
multiples of x^.512 and x^.517. The cutoff is fixed on this box:

$$
 T=\lceil x^{2\tau}\max(1,MN/x)\rceil,\quad
 \tau=1/10000.                                           \tag{2}
$$

Its entire positive approximation tail is controlled by the divisor-count
lemma in [endpoint-pairing.md](endpoint-pairing.md). No approximation
error is discarded in passing to the polynomial. Let z_0=x/2 and
z in [x/2,x], with z=x for the actual endpoint. Write theta=2/g and

$$
 \Phi_{h,q,e}(m)=\mathrm e\left(\frac{hz_0}{gmeq}\right)
                    -\mathrm e\left(\frac{hz}{gmeq}\right),\qquad
 c_h=-\frac{W(h/(T+1))}{2\pi i h}.                        \tag{3}
$$

Here W is the Vaaler weight specified in the preceding notes; |c_h|<<1/h.
Split the remaining positive h into dyadic blocks A<h<=2A, clipping
at the actual lower and upper cutoffs. Thus A>>x^.029 and A<<x^.0342;
constants from the first clipped block do not affect exponents. All
q exceed 2h eventually. Only this eventual regime is claimed.

## 2. Aggregate the left prime before Cauchy

Define, on the fixed m box,

$$
 \alpha_g(m)=\sum_{p\mid m\atop p\text{ in (1)},\ gm/p\in I,\ p\nmid m/p}
                 \mu(gm/p)\log p
       =-\mu(gm)\sum_{p\mid m\atop p\text{ in (1)},\ gm/p\in I}\log p.
                                                               \tag{4}
$$

The second identity follows by adjoining the odd prime p to a
squarefree number; all other terms vanish on both sides. In particular

$$
                  |\alpha_g(m)|\le\log m,\qquad
             \sum_{m\sim M}|\alpha_g(m)|^2\ll M\log^2 x.  \tag{5}
$$

For g=2, mu(gm) enforces odd m. No assertion that this coefficient is
smooth, or has a smaller norm, is required.

For each e with ge in J and mu(ge)!=0, let Q_e be the primes q in
(1) with eq~N and (e,q)=1. Put

$$
 Y_e(m)=\sum_{q\in Q_e}\sum_{h\text{ in the block}}
       (\log q)c_h\,1_{(m,eq)=1}
       \mathrm e\left(-\theta h\frac{\overline m}{eq}\right)
       \Phi_{h,q,e}(m),\quad
 B_e=\sum_{m\sim M}\alpha_g(m)Y_e(m).                    \tag{6}
$$

The block's positive polynomial is exactly sum_e mu(ge) B_e;
negative h contribute its conjugate. This is a regrouping of the
actual coefficients: (m,eq)=1 retains, in particular, p not dividing
eq and q not dividing m. The right condition q not dividing e is in
Q_e. Both Mobius signs and their gcd branches have been retained
before any inequalities.

Take the triangle inequality in e, **after retaining both q and h in
Y_e**, and use (5):

$$
 |\text{block}|\ll \sqrt M\log x\sum_{ge\in J\atop\mu(ge)\ne0}
                       \left(\sum_{m\sim M}|Y_e(m)|^2\right)^{1/2}.
                                                               \tag{7}
$$

There are O(E) outer values. The summation inside the norm now runs
over a full interval of length M. There is no Mobius weight in that
second moment. Enlarging to all m in the interval is valid because
the norm's summands are nonnegative. This is the step that the
full-spectrum operator obstruction in the preceding note does not cover.

## 3. Expand the exact second moment

For i=1,2 set w_i=(log q_i)c_(h_i). Expansion of (6) gives

$$
 \sum_{m\sim M}|Y_e(m)|^2
   =\sum_{q_1,h_1,q_2,h_2}w_1\overline{w_2}\,K_e(q_1,h_1;q_2,h_2),
                                                               \tag{8}
$$

where, with F(m)=Phi_(h1,q1,e)(m) conjugate(Phi_(h2,q2,e)(m)),

$$
 K_e=\sum_{m\sim M\atop(m,c)=1}\mathrm e_c(a\overline m)F(m),
 \quad
 (c,a)=\begin{cases}
 (eq,\theta(h_2-h_1)),&q_1=q_2=q,\\
 (eq_1q_2,\theta(h_2q_1-h_1q_2)),&q_1\ne q_2.
 \end{cases}                                                \tag{9}
$$

The ordered pair (c,a) in (9) denotes the modulus and numerator,
not a gcd. The identity follows by taking inv(m) modulo the common
modulus and reducing it in each original phase. Because the right
primes are coprime to e, the displayed common moduli are their exact
least common multiples.

There are three cases:

* Identical (q,h): a=0 and K_e=sum |Phi|^2 over the unit m, at most 4M
  up to interval rounding.
* Same q, different h: q does not divide a, and
  G:=gcd(a,c)<=|a|<<A.
* Different q: r=h_2q_1-h_1q_2 is nonzero and coprime to q_1q_2.
  Indeed q_i dividing r would force q_i dividing h_i. Thus
  G=gcd(theta r,e)<<AZ.

These are all pairs in this second moment. In particular no additional
zero-phase pair is hidden among nonidentical indices, although gcd
losses at primes dividing e can occur and are kept. The additive phase
can reduce to modulus c/G; its unit indicator must still be retained.
It is not legitimate to replace c by q_1q_2 automatically. For example,
e=5, q_1=11, q_2=13, h_1=h_2=1, theta=1 gives c=715, a=-2;
the phases at m=1 and m=144 differ although the two m agree modulo 143.

## 4. Complete the interval with its actual endpoint weight

The only additional published inputs are the classical Ramanujan and
Weil bounds, stated for all positive integer moduli in
[Pascadi, Lemmas 3.2 and 3.3](https://link.springer.com/article/10.1007/s00039-026-00746-0):

$$
 |S(0,a;c)|\le\gcd(a,c),\qquad
 |S(t,a;c)|\ll_\epsilon c^\epsilon\sqrt{c\gcd(t,a,c)}.      \tag{10}
$$

The source attributes the second bound to Iwaniec--Kowalski,
Corollary 11.12 and the divisor bound. No short-coefficient bilinear
theorem is being imported. The following completion argument states
the needed interval version explicitly.

For any integer interval L of length at most M, remove complete
periods c. They cost at most (M/c)G by the first bound in (10).
For the remaining interval of length less than c, Fourier inversion
has factor 1/c and the Fourier coefficients of its indicator have
total modulus O(c log(2c)). The second bound in (10), with
gcd(t,a,c)<=G, therefore gives uniformly in the interval's position

$$
 \left|\sum_{m\in L\atop(m,c)=1}\mathrm e_c(a\overline m)\right|
       \ll_\epsilon c^\epsilon
                   \left(\sqrt{cG}+\frac{M}{c}G\right).    \tag{11}
$$

Logarithms are absorbed by adjusting epsilon. This argument also handles
M>c, which can occur for equal q. It retains the Ramanujan term rather
than pretending every interval has length less than its modulus.

The function F in (9) has bounded variation on [M,2M]:

$$
  \|F\|_\infty+\int_M^{2M}|F'(t)|\,dt
              \ll 1+\frac{Ax}{MN}\ll x^{2\tau}.           \tag{12}
$$

To verify it, each of the two exponentials in Phi has derivative
O(Ax/(t^2 e q)); eq~N, |Phi|<=2, and the product rule gives (12).
Equation (2) and A<=T give its last inequality; MN>>x^1.024 here.
Partial summation applies (11) to the actual F at a cost x^(2tau).
Clipped h blocks and the eq box only change the index sets, not F's
variation. No claim of separated h and Fourier coefficients is needed.

Put q_*=x^.045. Since e is between constant multiples of E, the
nonidentical-pair kernels consequently satisfy, uniformly,

$$
 \begin{split}
 |K_{\mathrm{same}}|&\ll_\epsilon x^{2\tau+\epsilon}
     \left((EZA)^{1/2}+\frac{MA}{E q_*}\right),\\
 |K_{\mathrm{cross}}|&\ll_\epsilon x^{2\tau+\epsilon}
     \left((EA Z^3)^{1/2}+\frac{MAZ}{E q_*^2}\right).
 \end{split}                                                \tag{13}
$$

In (8), the diagonal weights sum to O(Z/A) times log powers,
same-prime different-h weights to O(Z), and different-prime weights
to O(Z^2). This uses |c_h|<<1/A and O(A) harmonics, not cancellation
of their weights. Apply (7) and the square-root triangle inequality:

$$
 |\text{block}|\ll_\epsilon x^\epsilon E\sqrt M
    \left[\left(\frac{MZ}{A}\right)^{1/2}
                  +(Z K_s)^{1/2}+Z K_c^{1/2}\right],       \tag{14}
$$

where K_s,K_c denote the nonnegative right sides of (13), with the
arbitrarily small losses combined into epsilon. All logs, including
both prime weights and the norm in (5), are accounted for this way.

## 5. Price the bound and consume the earlier reductions

Use M<<x^.517, E<<x^.467, Z<=x^.05,
A>>x^.029 for the diagonal and A<<x^.0342 for (13).
The following powers are for (14), after summing e and taking the
square root. Off-diagonal rows already include the cost tau from (12);
an arbitrarily small loss remains to cover divisor bounds and logarithms.

| contribution | exponent of x |
|---|---:|
| identical (q,h) | 1989/2000 = 0.9945 |
| same q, different h: Weil term | 2221/2500 = 0.8884 |
| same q, different h: full-period term | 3851/5000 = 0.7702 |
| different q: Weil term | 1173/1250 = 0.9384 |
| different q: full-period term | 7977/10000 = 0.7977 |

For example the largest off-diagonal entry is
.467+.517/2+.05+(.467+.0342+3*.05)/4+.0001=.9384.
The diagonal is .467+.517+(.05-.029)/2=.9945. These use uniform
upper bounds across every pilot box, not just its top box.
Choosing the remaining loss smaller than 1/2000 and absorbing the
logarithmically many boxes and harmonic blocks proves

$$
             \text{remaining high-h polynomial}=O(x^{199/200}).
                                                               \tag{15}
$$

The strict inequality in the loss budget leaves room for the displayed
exponent. The full pilot need not share this particular power: its
previous reductions have their own, smaller savings. Combining (15)
with the prime-strip, uniform low-h and entire-majorant bounds gives
E_+=O_H(x/log^H x) for every fixed H. The coefficient-sector and density
reduction in [coefficient-structure.md](coefficient-structure.md) then gives

$$
 R_{I,J}(x)=O_H(x/\log^H x),\quad
    D=\lfloor x^{.277}\rfloor,\quad E=\lfloor x^{.467}\rfloor.
                                                               \tag{16}
$$

This is a **controlled full rectangle**, with de of order x^.744.
The earlier .00305 deficit belonged to a sufficient generic upper
bound on this pilot; (14) now supplies a different sufficient bound.
There was no impossibility claim to overturn. The previously controlled
rectangle had de of order x^.74; this is still not a uniform cutoff in
de, a controlled mass proportion, or an estimate for the whole E_>.
The one-sided sufficient twin margin in
[endpoint-target-audit.md](endpoint-target-audit.md) remains open.

## 6. Checks, limitations and the next question

The placement of Cauchy is essential to this calculation. If one fixes
the left prime p and applies Cauchy on d instead, the available interval
has length x^.277. The uniform cross-prime Weil budget in (13) is then
larger than this length; using the trivial kernel bound and summing p,e
returns exponent .24+.467+.277+.05=1.034. That upper bound is insufficient.
This does not exclude a more refined argument with that placement.
Regrouping p with d, as in (4), preserves its norm and exposes the long
interval needed by (11). It does not assume a smaller squarefree norm.

[prime-dispersion-validation.js](prime-dispersion-validation.js) and
[its retained artifact](data-reuse/prime-dispersion.json) test the exact
regrouping, both gcd branches, the endpoint-dependent second moment,
all three pair classes, the composite-modulus phase identity, full-period
completion and rational exponents. The checks reuse the archived prime
table for exact factorization; their explicit small examples test algebra,
not the simultaneous asymptotic scale relations. The existing archived
high-band cores are empty, as already documented; no larger sieve is needed
to validate these identities.

Falsifiers include a surviving p-dependence in (6), a missing nonunit
restriction, a nonidentical zero-phase pair, a dropped e factor, a missing
complete-period term, or endpoint variation larger than (12). The written
argument addresses each, and the validator supplies finite controls.
The numerical exponent checks remain bookkeeping, not proofs of (10).

The completed validation has 6,144 coefficient identities, 54 weighted
second-moment identities, 606,096 exact modulus comparisons, 90 interval
completions and 180 rational exponent checks. Its first run caught an
addition error in the same-prime Weil row, corrected to 0.8884; neither
the diagonal nor the largest off-diagonal budget changed. All fourteen
strict QC gates pass with zero findings, the verifier self-tests pass
(58 positives and 47 controls), and the existing numerical audit passes
251/251 checks. These checks are distinct from the written derivation.

The range question is answered at an explicit sufficient scope in
[dispersion-range.md](dispersion-range.md). Reversing the prime average
and averaging the gcd loss supplies a larger region, including a full
rectangle at product scale x^.804. The former uniform low-h split is
not its limiting estimate. That note identifies the remaining left B
and cross-prime budgets; consume the pilot here rather than repeating it.
Neither estimate implies a uniform product cutoff or a twin lower bound.
