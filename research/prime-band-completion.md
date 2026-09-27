# The remaining prime bands and the cost of completion

<!-- ledger
id: Q-prime-band-completion
status: ANSWERED
todo: C
parity: Exact prime-band splitting and the paired Bettin-Chandee budget remove small prime factors and low harmonics uniformly; the full Vaaler tail retains its divisor-count bound. CRT splitting then completes the right prime modulus with both gcd branches and endpoint phases present. An exact Gram identity rules out a uniform operator-norm saving on the full dual frequency range, not cancellation for the actual Mobius coefficients. The pilot is controlled by the separate prime-dispersion follow-up; the twin margin remains OPEN.
question: Can the remaining squarefree correlation be localized to simpler prime and harmonic bands, and does completion then permit a direct general bilinear Kloosterman estimate?
verdict: The pilot reduces, with power-saving endpoint errors, to p in (x^0.235,x^0.24], q in (x^0.045,x^0.05] and positive h in (x^0.029,T], with T=O(x^0.0342). Both primes exceed 2h eventually. Completion is exact but produces coupled h-dependent coefficients on every dual residue modulo q. Its full-frequency Kloosterman matrix has norm exactly q, so a uniform power saving by an arbitrary-coefficient operator bound is impossible at that scope. This completion alone leaves the 61/20000 budget deficit; prime-dispersion.md controls the pilot using a different second moment. No twin lower bound is established.
-->

**The sufficient twin margin remains OPEN.** The pilot is now controlled
by [prime-dispersion.md](prime-dispersion.md), which consumes the reductions
here and uses a different second moment. This note narrows the arithmetic and audits a particular theorem
interface. It does not reduce the remaining exponent deficit or control
another full rectangle. The reductions below are written derivations;
the finite checks are separate and do not establish asymptotic rates.

## 1. Remove the small distinguished primes without separating their averages

Keep x dyadic, D=floor(x^(277/1000)), E=floor(x^(467/1000)),
I=(D,2D], J=(E,2E], V=floor(x^(6/25)), Z=floor(x^(1/20)).
For any prime set B define the squarefree coefficient

$$
 Q_{I,B}(\ell)=\mu(\ell)\sum_{p\in B,\ p\mid\ell,\ \ell/p\in I}\log p.
                                                               \tag{1}
$$

It is bounded in modulus by log l. Equivalently it is minus the
sum of mu(d)log p over dp=l, d in I, p in B, p not dividing d.
These are the Q coefficients of [coefficient-structure.md](coefficient-structure.md).
Set V_0=floor(x^(47/200)), Z_0=floor(x^(9/200)), and split each
coefficient into primes below its new cutoff and primes above it,
denoted Q_- and Q_+. The exact product split is

$$
       Q_{I,\le V}Q_{J,\le Z}
       =Q_{I,-}Q_{J,\le Z}+Q_{I,+}Q_{J,-}+Q_{I,+}Q_{J,+}.   \tag{2}
$$

No prime-by-prime triangle inequality is taken. The first two products
have expanded upper support exponents (0.512,0.517) and (0.517,0.512).
In [endpoint-pairing.md](endpoint-pairing.md) the sufficient exponent is

$$
 \frac3{20}+\frac7{10}(a+b)+\frac14\max(a,b)
                          =\frac{19991}{20000}<1.            \tag{3}
$$

Its endpoint proof applies to any separate logarithmically bounded
coefficients with these supports. Take tau=1/10000: (3)+3tau<1.
Thus both discarded **endpoint** pieces have a power saving, including
all dyadic boxes and both gcd branches. No independent density estimate
is needed for this step, since the coefficients multiply Delta itself.

Let E_+ be the remaining exact QQ discrepancy. Then for every fixed H,

$$
 R_{I,J}(x)=E_+(x)+O_H(x/\log^H x),\qquad
 E_+=\sum_{p\in(V_0,V],\ q\in(Z_0,Z]}\log p\log q
       \sum_{d\in I,e\in J\atop p\nmid d,\ q\nmid e}
                        \mu(d)\mu(e)\Delta_{dp,eq}(x).       \tag{4}
$$

Here p,q are prime. The other sectors and the total density were
already controlled in coefficient-structure.md. A separate high-band
density estimate is also available from that note's excluded-prime
argument, since restricting the outer prime sums only decreases their
absolute harmonic cost. At finite x the discrepancy still includes its
actual density subtraction.

## 2. A low-frequency bound uniform in the expanded divisors

The preceding note bounded h<=x^0.03 on the top expanded boxes only.
That qualification matters. This section supplies one cutoff valid on
**every** box of the pilot.

Write P=MN, Q=M+N, u=P/x for reduced divisor sizes M,N and let
positive h run in a dyadic block of size A. The paired polynomial
bound is, apart from a fixed arbitrarily small power loss,

$$
 (1+A/u)^{1/2}\min(1,A/u)
   \left[P^{17/20}Q^{1/4}A^{-3/20}+P^{7/8}Q^{1/8}\right].  \tag{5}
$$

Put r=P/(Ax). If r>=1, the two terms are bounded by
x^(17/20)A^(7/10)Q^(1/4)r^(-3/20) and
x^(7/8)A^(7/8)Q^(1/8)r^(-1/8), up to constants.
If r<=1, the corresponding extra powers of r are 7/20 and 3/8.
In both cases they are at most one. Consequently (5) is bounded by

$$
             x^{17/20}A^{7/10}Q^{1/4}
                         +x^{7/8}A^{7/8}Q^{1/8}.            \tag{6}
$$

Since Q<<x^(517/1000), all A<=x^(29/1000) have first exponent
19991/20000 and second exponent 193/200. Choose the theorem epsilon
small enough that its loss is at most tau/2. Summing boxes preserves
a fixed power saving. The full positive approximation tail is controlled
by the divisor-count lemma in endpoint-pairing.md, with

$$
             T=\lceil x^{2\tau}\max(1,P/x)\rceil,
                         \tau=1/10000.                      \tag{7}
$$

Choose harmonic blocks so that h<=floor(x^0.029) is cut exactly;
the one clipped dyadic block is allowed by the arbitrary harmonic
coefficients in the published estimate. Empty remaining bands cost zero.

We have therefore reduced E_+ to its signed Vaaler polynomial with

$$
 \begin{gathered}
 x^{0.235}<p\le x^{0.24},\qquad x^{0.045}<q\le x^{0.05},\qquad
 x^{0.029}<h\le T\ll x^{171/5000},\\
                         171/5000=0.0342.                   \tag{8}
 \end{gathered}
$$

For each box T is as in (7), not a common upper cutoff applied to all
boxes. Both expanded divisors lie between constant multiples of
x^0.512 and x^0.517. In particular p!=q and p,q>2h eventually.
The latter follows from 0.0342<0.045, including fixed constants and
floors by taking x sufficiently large. It is not asserted on the saved
finite prefixes. Thus both primes are odd and coprime to (2/g)h.

The top-box first deficit is still 61/20000 before strict losses.
Nothing in (8) is an improvement of that exponent, a statement about
the proportion of residual mass removed, or a uniform product cutoff.

## 3. Exact completion in the right prime modulus

Here is an explicit interface to ordinary Kloosterman sums. Fix a
reduced-divisor box and a compatible g in {1,2}. Since p,q are odd,
write the original divisors as gd and ge, so the expanded divisors
are gdp, geq and (dp,eq)=1. Keep the weights mu(gd)mu(ge);
they enforce the squarefree parity restrictions, including odd d,e
when g=2. Put theta=2/g and z_0=x/2, with z in [x/2,x].
Define I_g=(D/g,2D/g] and J_g=(E/g,2E/g], and also impose the
relevant box conditions dp~M, eq~N.

Compatibility requires (e,pq)=1. For fixed p,e,q satisfying this,
put e_c(v)=exp(2 pi i v/c) and

$$
 \begin{split}
 b_h&=-\theta h\,\overline{pe}\pmod q,\\
 \Phi_h(d)&=\mathrm e\left(\frac{hz_0}{gdepq}\right)
                  -\mathrm e\left(\frac{hz}{gdepq}\right),\\
 F_h(d)&=\mu(gd)1_{d\in I_g,\ dp\sim M}1_{(d,pe)=1}
       \mathrm e_e\left(-\theta h\,\overline{pq}\,\overline d\right)
       \Phi_h(d),\\
 \widehat F_h(t)&=\sum_d F_h(d)\mathrm e_q(-td).
 \end{split}                                                  \tag{9}
$$

The inverses in e_e are modulo e; the inverse in b_h is modulo q.
There is deliberately no restriction q not dividing d inside F_h.
It will be supplied by the completed kernel. For compatible d,
the elementary CRT phase split is

$$
 \mathrm e\left(-\theta h\frac{\overline{dp}}{eq}\right)
 =\mathrm e_e\left(-\theta h\,\overline{pq}\,\overline d\right)
       \mathrm e_q\left(-\theta h\,\overline{pe}\,\overline d\right).
                                                               \tag{10}
$$

Define the unnormalized classical sum
S(t,b;q)=sum_{u mod q,u!=0} e_q(tu+b inv(u)). Finite Fourier
inversion gives the exact identity

$$
 \sum_{d,\ q\nmid d}F_h(d)\mathrm e_q(b_h\overline d)
                 =\frac1q\sum_{t\bmod q}S(t,b_h;q)\widehat F_h(t).
                                                               \tag{11}
$$

Indeed q^(-1)sum_t e_q(t(u-d)) is 1 precisely for u=d mod q.
In particular it gives zero when q divides d. This verifies the sign,
the normalization 1/q and the coprimality condition without a theorem
import.

For the original positive-h polynomial, (11) is multiplied by
c_h=-W(h/(T+1))/(2 pi i h), then summed over h,p,q,e with the
outer weight mu(ge)log p log q. Negative h give its complex conjugate,
so twice the real part is taken. The e interval and eq~N cut remain.
This identity keeps all prime averages: no absolute value has yet been
taken over p,q,e or h. It also keeps the true endpoint perturbation.

Two obstacles prevent treating this as an ordinary separate-coefficient
bilinear form in h and t. The transform has **all** t modulo q, and
F_h depends on h through both its modulo-e phase and Phi_h. It also
depends on p,e,q and the actual box. No short dual support or
factorization hat F_h(t)=alpha_h beta_t has been established.

Even with Phi_h replaced by 1, the modulo-e phase causes this issue.
An exact small example is g=1, D=4, p=17, e=11, q=13, h=1,2.
The nonzero d values in (4,8] are 5,6,7, distinct modulo q. The
ratios F_2(d)/F_1(d) are e_11(4), e_11(7), e_11(6), respectively.
They differ, so these two residue vectors and their invertible discrete
Fourier transforms are not proportional. The validator also checks the
actual endpoint-dependent transform on explicit examples. This is a
failure of an automatic separation identity, not an asymptotic claim
about effective low-rank approximation.

## 4. The full dual range has an exact operator-norm obstruction

This is a precise closure for arbitrary coefficients, not for (9).
Let q be prime, lambda a unit modulo q, and H a set of r distinct
nonzero residues with 2<=r<=q-1. Define the r by q matrix
K_{h,t}=S(t,lambda h;q). Orthogonality gives

$$
 \sum_{t\bmod q}K_{h_1,t}\overline{K_{h_2,t}}
  =q\sum_{u\ne0}\mathrm e_q(\lambda(h_1-h_2)\overline u)
  =\begin{cases}q(q-1),&h_1=h_2,\\-q,&h_1\ne h_2.\end{cases}
                                                               \tag{12}
$$

Thus K K*=q^2 I-q J. On the subspace orthogonal to the all-ones
vector its eigenvalue is exactly q^2, and its other eigenvalue is
q(q-r). Consequently ||K||_(2 to 2)=q exactly. The kernel normalized
by 1/q in (11) has norm exactly 1: it has no uniform power saving.

More specifically, every coefficient vector v satisfies

$$
 \|K^*v\|_2^2=q^2\|v\|_2^2-q\left|\sum_h v_h\right|^2
                         \ge q^2(1-r/q)\|v\|_2^2.            \tag{12a}
$$

Here r<=T=o(q). Thus even fixing the actual harmonic weights cannot
supply a fixed-power saving against arbitrary full-range dual
coefficients merely through this operator estimate.

Deleting t=0 does not repair this. Since S(0,lambda h;q)=-1,
the new Gram matrix is q^2 I-(q+1)J, with the same largest eigenvalue
q^2. For example the row vector (1,-1,0,...) attains it.
A bound q^(1-eta) times the two coefficient norms, for fixed eta>0
and all arbitrary full-range vectors, is therefore false.

In (8), h<q and lambda=-theta inv(pe) is a unit, so this obstruction
applies even to the optimistic version of (11) where the transformed
coefficient is allowed to be arbitrary but independent of h. It does
**not** supply a lower bound for the actual signed expression, exclude
short-frequency estimates, or exclude cancellation from its coupled
coefficients and averages over the moduli.

## 5. The theorem audit and the next research obligation

[Pascadi, Non-Abelian Amplification and Bilinear Forms with Kloosterman Sums](https://link.springer.com/article/10.1007/s00039-026-00746-0)
was read at Theorems 1.1, 1.2 and 7.1, checked 2026-09-05. The
paper treats separate-coefficient bilinear forms with ordinary Kloosterman
sums, including composite moduli. Its introductory power-saving bounds
require both interval lengths at most roughly the square root of the
modulus; the general theorem has explicit length and factorization costs.
The complete t range in (11) and its coupled coefficient fail this
direct interface; in (8), full dyadic h blocks also exceed sqrt(q)
by a fixed power. Equation (12) shows why an unrestricted operator bound
cannot bypass that issue. The paper's results are not imported to assert
a new estimate here, and their failure in this attempted application is
not a criticism of those results. No literature-absence or novelty claim
is made.

The surviving prime bands supply one useful exact fact for dispersion:
if 0<h_i<q_i are positive integers and q_i are prime, then

$$
             h_1q_2=h_2q_1
                    \quad\Longleftrightarrow\quad
                     (h_1,q_1)=(h_2,q_2).                    \tag{13}
$$

For distinct primes, q_1 would otherwise divide h_1, which is impossible.
This identifies the exact equal-fraction diagonal only. It does not
bound near coincidences or the off-diagonal terms, and it does not
claim that these are the only diagonals in a future dispersion identity.

**Completed consumer:** [prime-dispersion.md](prime-dispersion.md)
regroups the left variable m=dp before Cauchy and retains the right
prime and harmonic averages. Its full second moment identifies every
pair class and the modulus e*q_1*q_2, with the endpoint phase retained.
Classical composite-modulus bounds suffice on that long m interval.
It controls the pilot without contradicting the operator obstruction
above. The next range question belongs to that note and TODO C; the
elementary full-tail bound and prime/low-h removals here are reusable inputs.

## 6. Validation, data reuse and limits

[prime-band-completion-validation.js](prime-band-completion-validation.js)
and [its artifact](data-reuse/prime-band-completion.json) test:

* exact coefficient splitting and CRT endpoint reconstruction with
  the densities retained;
* rational prime-strip and uniform low-frequency budgets, including
  boxes whose transition lies below the top-box transition;
* phase splitting, full Fourier completion, and the actual endpoint
  perturbation for both gcd branches;
* both Gram matrices in (12), the norm-attaining vector, and the
  non-proportional coefficient example;
* the rational-frequency diagonal, and which of the retained archived
  inputs contain any of the newly specified prime bands.

The archived factors are reused without another sieve run. Empty finite
prime bands reflect the rounded cutoffs at those scales; they cannot
validate asymptotic cancellation. The small completion examples are
algebra checks, not samples satisfying all the pilot's asymptotic
scale relations.

A dropped condition p not dividing d or q not dividing e would break
(1); dropping q not dividing d in (11) without its kernel would break
completion. Omitting the modulo-e or endpoint phase would change the
coefficient being estimated. These are explicit falsifiers covered by
the argument and finite tests. No conclusion here moves the full
pilot below scale x, establishes a twin lower bound, or measures a
fraction of the complete residual that has been controlled.

The completed pass also ran all fourteen strict QC gates with zero
findings, the verifier self-tests (58 positives and 47 controls), and
the existing numerical audit (251/251). Those checks are separate from
the new finite validator and from reviewing the mathematical arguments.
