# Moving cutoffs and an explicit conditional target

<!-- ledger
id: Q-moving-cutoff-parity
status: ANSWERED
todo: C
parity: Ordinary prime BV, the quantitative Mobius mean theorem, squarefree divisor expansion and exact partial summation. A missing moving endpoint in a published equality is checked and retained in a dyadic repair. The centered shifted-prime discrepancy is not estimated. No unconditional twin margin or novelty claim follows.
question: Does a proof-level reading of the shifted-Mobius sieve give a valid, explicit error-tolerant arithmetic target, and does its divisor switching preserve the moving boundary?
verdict: CHECKED prior art: Murty--Vatwani already supplies the conditional squarefree/parity mechanism and fixed-residue reduction. Its printed p. 654 swap omits n+h>ey; an exact finite counterexample verifies failure of that equality. DERIVED dyadic repair keeps the boundary and gives S=C2*x-2*C2*M+D_y+O_A(x/log^A x). A one-sided D_y>=-4*x/25+o(x) on unbounded dyadic scales is sufficient, using the certified margin C2*(1-A2)>33/200. That discrepancy estimate remains OPEN. Vatwani's recovered author preprint clarifies the one-odd-exponent cases and unfilled near-level-one hypotheses. No new signed bound is obtained; literature novelty is unestablished.
-->

**No new signed estimate or proof of twin-prime infinitude is obtained.**
This pass reads the relevant papers before doing the local calculation,
checks a defective displayed equality immediately, and derives a repair
with an explicit sufficient error tolerance. The underlying conditional
mechanism is published mathematics. The extra arithmetic input below
remains OPEN; its reformulation is not evidence that it is easier to prove.

## 1. Novelty and source check first

The existing [consumer comparison](consumer-comparison.md) already reads
Murty--Vatwani, *Twin primes and the parity problem*, JNT 180 (2017),
643--659. This pass rereads Theorem 1.1, the remark on p. 647, the
proof of Lemma 3.4, section 4 and section 5 in the published PDF.
The paper already uses squarefree support to switch a long Mobius divisor
to a short cofactor, then centers the shifted-Mobius progression sums
around their unknown total. It also explicitly permits the fixed residue
class -h instead of all reduced classes. None of those ideas is new here.

The paper's [author URL](https://mast.queensu.ca/~murty/TwinPrimes-Parity.pdf)
redirected to a missing page. The published PDF was recovered from the
[archived author copy](https://web.archive.org/web/20250808094448id_/https://mast.queensu.ca/~murty/TwinPrimes-Parity.pdf).
The [coauthor's publication page](https://sites.google.com/view/akshaa/publications)
also links both this paper and an accessible version of the previously
unread follow-up, *Variants of equidistribution in arithmetic progression
and the twin prime conjecture* (Math. Z. 293 (2019), 285--317).

For that follow-up this pass reads the **author preprint dated 2018-10-02**,
[author-linked PDF](https://drive.google.com/file/d/1TUI1HVzNf9MRV8cJbGRsC_2U26dmGBj4/view),
not a verified copy of the journal version. The checked statements are:

- Theorem 1.2 treats exactly one odd Mobius exponent, with the remaining
  factors squarefree indicators, through a square-root modulus level
  with logarithmic losses. It is not an estimate for Lambda(n)mu(n+2).
- Theorem 1.5 assumes both the (mu,mu^2) and (mu,mu) progression
  conjectures to a near-level-one range x/exp((log x)^delta). Its
  conclusion remains conditional; the proven square-root case is not
  a verification of those hypotheses.
- Theorem 2.1 requires H1--H2, including a q-independent bound on the
  normalized main term. Its explanatory paragraph explicitly notes the
  q/phi(q) issue for Lambda. We do not apply that theorem to Lambda
  merely by reading the abstract's description of squarefree filtering.

The start and conclusion of section 6.3 were also read. The displayed
rearrangement before (6.23) again omits the moving condition n>eQ;
for the formal switch at x=40,Q=3,h=2 the added term is exactly
2*log(3)*log(5), also checked by the validator. The contributing
configurations are (n,e,u)=(3,1,5),(33,11,5) in that paper's notation.
The later cofactor switch needs n+h>v*sqrt(x) as well. Those displays
must retain their domains before reuse. This note does **not** claim a
full repair or reproof of the follow-up's Theorem 1.5.

Searches used shifted-prime Mobius sums, fixed-residue equidistribution,
squarefree filtering, divisor switching, and the paper title with
correction/erratum; see [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md).
They identify positive prior art, not an exhaustive correction search.
No priority claim is made for the endpoint observation or the explicit
error tolerance below. The distinction between a mean bound and
progression equidistribution in consumer-comparison remains essential.

## 2. The missing endpoint: verify before reuse

On published p. 654, write m=n+h=de. The condition d>y becomes
e<m/y. Upon exchanging sums, the correct identity is

\[
 S_2(y)=\sum_{e<(x+h)/y}\mu(e)
   \sum_{\substack{n\le x,\ n\equiv-h\pmod e\\n+h>ey}}
       \Lambda(n)\mu(n+h)\log\frac e{n+h}.                    \tag{1}
\]

The printed second equality drops the last condition. This is not
just an endpoint choice for the outer sum: it changes an interval
inside each progression.

For x=20, y=3, h=2, use the paper's printed prime-only Lambda convention.
The expression with the condition dropped minus (1) is exactly

\[
                       \log3\,(\log13+\log19)>0.              \tag{2}
\]

The added pairs are (n,e)=(13,5),(19,7). Each has (n+h)/e=3,
which the original strict d>3 excludes. Under the standard von Mangoldt
convention, the difference also contains log2*log3+2(log2)^2 and
is still nonzero. These are exact formal logarithm identities checked
by [moving-cutoff-validation.js](moving-cutoff-validation.js).
An initial floating check mixed the two Lambda conventions; the
retained validator tests both independently with the appropriate terms.

The published p. 654 was inspected as an image to confirm that the
condition is absent from the PDF, not lost by text extraction.
Equation (2) refutes the **displayed equality**, not Theorem 1.1.
Its uniform-prefix distribution hypotheses can still handle the
correct intervals. We now give that repair in the project's dyadic
normalization, keeping the needed errors explicit.

## 3. A complete dyadic decomposition

Here Lambda is the standard von Mangoldt function, including prime
powers. Let x be a large integer power of two and put

\[
 J=(x/2,x],\quad y=\lceil x^{12/25}\rceil,\quad Q=\lfloor x/y\rfloor,
 \quad a(n)=\Lambda(n-2),\quad f(n)=a(n)\mu(n),
 \quad M=\sum_{n\in J}f(n).
                                                               \tag{3}
\]

This is an auxiliary squarefree divisor split. It changes none of the
C3 profiles or cutoffs in the existing global remainder. In particular,
Q<=x^(13/25), while y times any fixed logarithmic power stays below
the ordinary BV level for large x.

Define A_y(n)=-sum_(d|n,d<=y)mu(d)log d and

\[
 T_1=\sum_{n\in J}a(n)\mu^2(n)A_y(n),\qquad
 T_2=\sum_{n\in J}f(n)
            \sum_{\substack{e\mid n\\ey<n}}\mu(e)\log(e/n).
                                                               \tag{4}
\]

The identities mu^2(n)mu(n/e)=mu(n)mu(e) and
Lambda(n)=-sum_(d|n)mu(d)log d give

\[
 S=T_1+T_2+E_{\rm pp},\qquad
 E_{\rm pp}=\sum_{n\in J}a(n)(1-\mu^2(n))\Lambda(n)\ge0,
 \quad E_{\rm pp}\ll\sqrt x\,\log^3x.                         \tag{5}
\]

Every term is retained before estimation. The part E_even of T2 with
even e has n-2 a power of two. There are O(log x) such n, and
tau(n)<=2sqrt(n) bounds its divisor sum. Thus
|E_even|<<sqrt(x)log^3(x). This is a paid error, not an exact zero.

### 3.1. The ordinary terms and their quantitative precision

For every fixed A>0, ordinary prime BV and the quantitative Mobius
mean theorem give

\[
 T_1=C_2x+O_A(x/\log^A x),\qquad
 V:=\sum_{n\in J}a(n)\mu^2(n)
       ={A_2x\over2}+O_A(x/\log^A x),
 \quad A_2=\prod_{p>2}\left(1-\frac1{p(p-1)}\right).           \tag{6}
\]

Here is the error and constant check, rather than an unexamined
interval transfer of the printed theorem. Expand mu^2(n) as
sum_(b^2|n)mu(b), and first restrict b<=z=(log x)^B in T1.
The discarded part has absolute bound O(x log^4(x)/z): for squarefree
d,b write delta=(d,b), d=delta*d', b=delta*b', so
[d,b^2]=delta^2*b'^2*d'. Summing the elementary multiple count
x/[d,b^2]+1 over d' leaves a harmonic sum and
sum_(b>z)tau(b)/b^2<<log(2z)/z. Both logarithmic weights are included.

For b<=z the moduli are [d,b^2]<=yz^2. Their multiplicities are at
most tau_3 of the modulus. Cauchy and the trivial weighted progression
bound O(x log x/q+log x) convert this divisor weight to a fixed
logarithmic cost in BV. Non-coprime moduli require n-2 to be a power
of two and cost at most O(yz log^3 x). All these costs are paid by
choosing B and the BV precision large enough, at the fixed exponent
12/25<1/2.

The remaining density is

\[
 {x\over2}\sum_{\substack{d\le y,\ b\le z\\db\ {
m odd}}}
        {-\mu(d)\mu(b)\log d\over\varphi([d,b^2])}.
                                                               \tag{7}
\]

Extending b to infinity costs O(x log^6(x)/z). For example,
phi([d,b^2])=phi(d)*b*phi(b)/phi((d,b)); put b=rk with
r=(b,d), sum over r|d, and use the convergent tail of 1/(k phi(k)).
The resulting bound is O(tau(d)log(2z)/z) inside the d-sum.
The infinite b-sum then makes (7)

\[
 {x\over2} A_2 \sum_{\substack{d\le y\\d\ {
m odd}}}
             {-\mu(d)g(d)\log d\over\varphi(d)},\qquad
 g(p)=\frac{(p-1)^2}{p(p-1)-1}.
                                                               \tag{8}
\]

The Euler product for sum_(d odd)mu(d)g(d)/(phi(d)d^s) is
H_g(s)/zeta(1+s). The coefficients of H_g have an absolutely
convergent sum weighted by d^epsilon for some epsilon>0: its local
factor is (1-c_p p^(-s))/(1-p^(-1-s)), with
c_p=(p-1)/(p(p-1)-1)=1/p+O(p^(-3)); the omitted p=2 factor is
geometric. Convolving with mu(d)/d and using its quantitative mean
and logarithmic moment gives the sum in (8) equal to
H_g(0)+O_A(log^(-A)y). The Euler factors give A2*H_g(0)=2*C2.
This proves the first part of (6) with arbitrary fixed logarithmic
precision. It does not require a Tauberian theorem for unbounded
coefficients without checking that theorem's hypotheses.

For V the same squarefree expansion is simpler. Restrict b<=x^(1/10),
use BV on b^2<=x^(1/5), and bound the tail by
O(x^(9/10)log x+sqrt(x)log x). Its absolutely convergent main series
is sum_(b odd)mu(b)/phi(b^2)=A2. Subtraction of the two endpoints
gives the factor x/2 in (6). The primary BV source is
[Tao, Notes 3, Theorem 17](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/);
the Mobius mean and its uniform convolution use the same classical
input as [signed-divisor-grouping.md](signed-divisor-grouping.md).
The conditional mechanism and the Euler factors in (8) match
Murty--Vatwani Propositions 3.2--3.3 and Lemma 3.4.

## 4. The centered discrepancy with its true interval

For odd e<=Q and x/2<=t<=x define

\[
 \Delta_e(t)=\sum_{\substack{x/2<n\le t\\e\mid n}}f(n)
             -\frac1{\varphi(e)}\sum_{x/2<n\le t}f(n),
 \qquad a_e=\max(x/2,ey).
\]

The unknown arithmetic quantity we retain is the finite signed sum

\[
 \boxed{\mathcal D_y(x)=
   \sum_{\substack{e\le Q\\e\ {
m odd}}}\mu(e)
     \int_{(a_e,x]}\log(e/t)\,d\Delta_e(t).}                  \tag{9}
\]

These are Stieltjes integrals of finite atomic measures; intervals
with a_e=x are empty. Thus (9) is also an exact, computable sum.
The residue class for the prime variable n-2 is -2 modulo e.
Centering subtracts the **unknown** total M(t); it does not assert
that M(t) is small.

Exchanging only the density part, with the moving cut retained, gives

\[
 T_2=\mathcal D_y+
  \sum_{n\in J}f(n)
       \sum_{\substack{e<n/y\\e\ {
m odd}}}
          \frac{\mu(e)}{\varphi(e)}(\log e-\log n)+E_{\rm even}.
                                                               \tag{10}
\]

The classical sums over odd e<u satisfy, for every fixed A,

\[
 \sum_{e<u}\frac{\mu(e)}{\varphi(e)}=O_A(\log^{-A}u),\qquad
 \sum_{e<u}\frac{\mu(e)\log e}{\varphi(e)}
       =-2C_2+O_A(\log^{-A}u).                                \tag{11}
\]

To check the input, its Dirichlet series is H_0(s)/zeta(1+s),
where H_0 has local coefficients from c_p=1/(p-1)=1/p+O(p^(-2))
and the same p=2 geometric factor. Its coefficients are absolutely
summable with a small positive power; H_0(0)=2C2. The convolution
argument used for (8) gives (11), including the logarithmic weight.
Strict versus non-strict cutoffs cost O(log(u)tau(u)/u) at an integer
endpoint. In (10), u=n/y is uniformly at least x/(2y), a fixed
positive power of x. Since sum_J|f(n)|<=sum_J Lambda(n-2)=O(x),
(5)--(11) prove

\[
 \boxed{S(x)=C_2x-2C_2M(x)+\mathcal D_y(x)
                   +O_A(x/\log^A x).}                        \tag{12}
\]

This is the repaired dyadic relation. It also justifies the
conditional dyadic consequence at this fixed interior cutoff when
the shifted-Mobius distribution hypothesis supplies D_y=o(x).
No such unconditional hypothesis has been established.

### 4.1. Price the additional estimate

Partial summation in (9), with Delta_e(x/2)=0, gives

\[
 |\mathcal D_y|\le
  2\sum_{\substack{e\le Q\\e\ {
m odd}}}
       \log(x/e)\max_{x/2\le t\le x}|\Delta_e(t)|
  \le 2\log x\sum_{e\le Q,\ e\ {
m odd}}\max_t|\Delta_e(t)|.
                                                               \tag{13}
\]

Indeed log(e/t) is negative and decreasing, and the sum of its
two endpoint magnitudes and total variation on [a_e,x] is
exactly 2log(x/e). Its jump at the excluded boundary has not been
silently discarded. Equation (13) shows how the paper's uniform-prefix
input pays for the correct domain. The two endpoints in the dyadic
Delta cost only a fixed factor relative to cumulative discrepancies.

Since M<=V, (6) and (12) imply

\[
 S(x)\ge C_2(1-A_2)x+\mathcal D_y(x)+O_A(x/\log^A x).
                                                               \tag{14}
\]

The signs of the error in this lower bound are unspecified; equivalently
replace its O term by minus its absolute bound. Rational finite Euler
products through 1000, with elementary infinite-tail bounds, certify

\[
             \frac{33}{200}<C_2(1-A_2)<\frac{21}{125}.         \tag{15}
\]

For C2 the omitted factor product lies between 1-1/999 and 1,
because sum_(p>1000)1/(p-1)^2<=1/999. For A2 it lies between
1-1/1000 and 1 by telescoping sum_(m>1000)1/(m(m-1)). Multiplying
these rational enclosures proves the certified inequalities in the
validator; no decimal Euler-product guess is used.

One sufficient **OPEN** estimate is therefore

\[
                  \mathcal D_y(x)\ge-\frac4{25}x+o(x)        \tag{16}
\]

on an unbounded set of dyadic x. It would give
S(x)>=x/200+o(x), and hence S(x)>=x/400 on sufficiently large
witnessing scales. Removing the proper-prime-power contribution
then gives infinitely many twins, with a positive scale-x weighted
margin. Alternatively, the first weighted absolute sum in (13)
being <=2x/25 on those scales suffices. The allowance is finite;
full arbitrary-logarithmic equidistribution is a stronger sufficient
input. No reverse logical non-implication is asserted.

## 5. What this changes, and what remains open

Compared with the existing left Vaughan remainder B_L, equations
(12) and [joint-correction-source-audit.md](joint-correction-source-audit.md)
(12) give

\[
                \mathcal D_y=B_L+2C_2M+O_A(x/\log^A x).      \tag{17}
\]

Thus this is a different explicitly centered sufficient consumer,
not a second independent estimate of the twin count. The density
bound for M is unconditional and provides the tolerance (15);
the required bound on D_y is still missing. Neither ordinary BV
for Lambda nor the one-odd-exponent squarefree theorem controls
Delta_e: its sequence is Lambda(n-2)mu(n), at the fixed shift two.
An average over shifts also cannot select that fixed shift.
The missing input is not merely an extension by 1/50 beyond the
ordinary BV exponent: ordinary BV concerns a different sequence.

The bounded attempt establishes the endpoint correction, the complete
dyadic relation and its conditional tolerance. It fails to establish
(16). A finite census of D_y to x=2^38
([centered-discrepancy-measurement.md](centered-discrepancy-measurement.md))
refutes neither (16) nor the absolute form behind (13) at those scales,
and shows that at every reachable x the value of D_y is the finite-size
error of the classical term T_1 in (6), of order x/log^2 x, beneath which
the discrepancy's own fluctuation is invisible; it measures no asymptotic
trend and no improvement to B_L. The contribution is source validation
and a precise arithmetic interface, with literature novelty unestablished.

The next useful attempt must supply actual information about (9),
retaining both its density subtraction and the moving lower endpoint.
A bounded comparison of a candidate structured progression estimate
against (13)--(16) is appropriate. A census of D_y without a specified
falsifier, another generic rewriting, or an automatic import of
untwisted BV would repeat the unresolved step. The 2019 source gap
is now filled at the stated reading scope; do not reassign its retrieval.

## 6. Validation and custody

[moving-cutoff-validation.js](moving-cutoff-validation.js) uses exact
rational polynomials in formal prime logarithms. It checks (2) under
both Lambda conventions and the author-preprint swap before (6.23).
It checks (5), the odd/even split, and (10)
by independently ordered sums on 40 finite (x,y) fixtures, with
x in {32,48,64,96,128,192,256}. Controls detect deletion of the moving
boundary, replacement of phi(e) by e, loss of the density projection,
even-modulus terms and proper prime powers. It also certifies (15)
using rational arithmetic and proved tail inequalities.
These are finite controls for the formulas; the written BV and
convolution arguments carry the asymptotic claims. They do not prove
(16). The source observation was checked during this pass before
being promoted into the records; no promising deduction was deferred
merely to await another research prompt.

Source artifacts read on 2026-09-06:

- Murty--Vatwani published PDF, 17 pages: Theorem 1.1 and sections
  2--5 read; printed p. 654 inspected as an image. SHA-256:
  0d53d7e1ed7879ffb0fbdb958832d9697ea37d2b261ab2db56a3cf62adbe861e.
- Vatwani author preprint dated 2018-10-02, 31 pages: introductory
  statements, H1--H2/Theorem 2.1, selected section 4 induction steps
  and section 6.3 read; pp. 4--5 and 28 inspected as images. SHA-256:
  4eadaa6e7ca8c47cb0ef81932f105175c35d20d7956fbc89b2ea682d16a89075.

The second artifact's journal-version equivalence was not checked.
No assertion that either paper's entire proof has been verified is made.
