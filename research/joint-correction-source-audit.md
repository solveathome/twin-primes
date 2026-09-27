# Joint correction: known cancellation and the remaining arithmetic

<!-- ledger
id: Q-joint-correction-source-audit
status: ANSWERED
todo: C
parity: Source checks and exact Vaughan reconstruction only. Ordinary prime BV controls the full short divisor approximants; the selected prime-cofactor branch does not inherit this control. No Type II hypothesis, signed lower margin, or universal obstruction is proved.
question: Does completing the supported prime-partner correction yield cancellation beyond the existing Vaughan reduction, and which literature inputs actually justify that completion?
verdict: CHECKED prior-art matches for subset convolution, complementary sieve sums and signed smooth-number distribution. DERIVED reconstruction identifies the unrestricted factor weight with an existing short divisor approximant, up to the paid prime-power error. Its supports are x^(12/25) and x^(1/10). Reassembling the entire joint correction returns the already-open Vaughan remainder and supplies no new signed bound. A formal factor-vector control distinguishes the unrestricted logarithmic weight from the selected prime-cofactor branch. The matched general sieve theorems require inputs not supplied here. Literature novelty is unestablished; twin infinitude remains OPEN.
-->

**No new twin-prime lower bound follows.** The proposed completion of
[supported-coefficient-dickman.md](supported-coefficient-dickman.md)
does not by itself supply a new estimate: it reconstructs the existing
Vaughan remainder. This audit records what can already be evaluated,
what the literature actually supplies, and why the branch restriction
must not be assigned the support of an unrestricted divisor sum.

## 1. Novelty check before the local calculation

Read on 2026-09-06, before the reconstruction and finite controls below:

| Primary source and checked part | Match and limit |
|---|---|
| [Ford--Maynard, arXiv:2407.14368v1](https://arxiv.org/pdf/2407.14368v1), Definition 7.1; section 7.2; Proposition 7.22's final step (7.23) | Their vector convolution sums over all prime-factor subsets. Lemma 7.21 handles the full short divisor weight using Type I; Proposition 7.19 handles its complementary sum using additional Type II information. The proof ends by applying the arbitrary-coefficient Type II hypothesis. Subset aggregation and joint treatment of the complement are prior art, not automatic new cancellation. |
| [Mounier, arXiv:2402.13198v3](https://arxiv.org/pdf/2402.13198v3), Theorem 1.1, Remark 1.2, Lemma 3.8, proof on p. 31 | Its weaker condition D_theta places the absolute value outside a signed sum of factor-product remainders over convex exponent regions. The resulting smooth-number lower bound still requires (1-theta)u<1. It neither asserts D_theta for our sequence nor evaluates the signed prime-partner correction. |
| [Friedlander--Iwaniec, Asymptotic sieve for primes](https://arxiv.org/pdf/math/9811186), (R), (B), Theorem 1 | A classical prime-producing consumer that adds a specific Möbius bilinear hypothesis to distribution. It requires distribution past x^(2/3), plus its bilinear estimate on a stated range; the theorem's initial formulation also assumes squarefree support. These hypotheses have not been supplied here. No application of that theorem is claimed. |
| [Tao, Notes 3, Theorem 17 and Lemma 18](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/) | Ordinary prime BV and Vaughan's identity are the actual inputs for the short sums below. They already own this part of the project's reduction. |

For the natural shifted-prime sequence and smoothness y=x^(6/25),
Mounier's u=25/6 condition requires theta>19/25. The presently matched
ordinary BV estimate supplies every fixed theta<1/2, not that condition.
Pan--Ding's aggregate theorem concerns a different prime-cofactor
sequence and cannot simply be substituted. Even a future verification
of D_theta would first supply the paper's smooth-number conclusion;
the signed weight and prime-cofactor condition would need another match.
This is a failure of the present direct import, not a theorem ruling
out stronger structured distribution estimates.

Ford--Maynard section 4.6 explicitly distinguishes additional estimates
for structured or multilinear coefficients from its general Type I/II
class. Thus failure to establish arbitrary-coefficient Type II is not
an impossibility theorem for our particular coefficients.
Its Theorem 7.3 additionally requires the stated weight support and
sign conditions; neither a bounded subset coefficient nor a good
harmonic integral alone meets them.

The search used the owning terms: prime-producing sieves, vector subset
convolution, complementary sieve sums, asymptotic sieve for primes,
signed factor-product remainders, and smooth-number lower-bound sieves.
The results above are positive prior-art matches. Literature novelty
of the local application is unestablished; no exhaustive absence claim
is made. The earlier Dickman and integration audit remains valid.

## 2. Reconstruct the unrestricted weight exactly

Keep the C3 cutoffs and hats from
[global-smooth-majorant.md](global-smooth-majorant.md).
Below P_i is a new notation for an **existing approximant**, not a
new prime detector. Put

\[
 a_i(d)=\mu(d)\widehat\rho_i(d),\qquad
 b_i(e)=-a_i(e)\log e-
           \sum_{\substack{dq=e\\q\le W_i}}a_i(d)\Lambda(q).
                                                               \tag{1}
\]

These lower-case a_i,b_i are coefficient sequences; they are not the
cutoff endpoints or the comparison sequence of prime-detection-spec.
They satisfy

\[
 a_i(d)=0\ (d>W_i),\quad b_i(e)=0\ (e>W_i^2),\qquad
 |a_i(d)|\le1,\quad |b_i(e)|\le2\log e.
                                                               \tag{2}
\]

The last inequality uses sum_(q|e)Lambda(q)=log e. For t>W_i define

\[
 P_i(t)=(\log t)\sum_{d\mid t}a_i(d)+\sum_{e\mid t}b_i(e).
 \qquad \boxed{\Lambda(t)=P_i(t)+\widehat G_i(t).}
                                                               \tag{3}
\]

Indeed the first expression is
mu_rho*log - mu_rho*Lambda_(<=W_i)*1. The exact identity (7) in
[global-cutoff-averaging.md](global-cutoff-averaging.md) proves (3);
Lambda_(<=W_i)(t)=0 here. Prime powers in Lambda are retained.
At a prime t>W_i, P_i(t)=log t and Ghat_i(t)=0.

Let s_i(t) be the small-prime part with multiplicities and let
D_i(t)=Fhat_i(s_i(t))log(t/s_i(t)). The exact exceptional term E_i in
[global-factor-signs.md](global-factor-signs.md) gives

\[
                         P_i(t)=D_i(t)+E_i(t).                 \tag{4}
\]

This follows by comparing (3) with Ghat_i=Lambda-D_i-E_i. Thus
**the full logarithmic large-factor weight is already short-supported
up to the paid exception**. In particular its apparent marking of a
large prime does not imply that all ways of summing it lie outside BV.
The old statement about a directly marked *selected prime cofactor*
was narrower and remains correct.

On squarefree inputs the same cancellation is transparent:
log(t/s_i)=log t-sum_(p|t,p<=W_i)log p. Multiplying the complete
subset sum by the latter prime sum introduces divisors no larger
than W_i^2. Terms with a prime already in the subset must be combined;
(1)--(4) implement this exactly, also for repeated primes.
No Poisson--Dirichlet law is needed.

## 3. Which complete sums are already within known ranges?

Write J=(x/2,x], T=log x. For a function f of bounded variation,
prime BV controls the appropriate progression averages with weight f
at every fixed modulus exponent below 1/2. Equations (1)--(2) and
partial summation therefore apply to

\[
 L(x)=\sum_{n\in J}P_L(n)\Lambda(n-2),\qquad
 R(x)=\sum_{n\in J}\Lambda(n)P_R(n-2).
                                                               \tag{5}
\]

Their divisor supports are respectively x^(12/25) and x^(1/10),
with positive margins below 1/2. Each b_i costs only O(T), and
the logarithmic weight costs another fixed logarithm, paid by BV's
arbitrary fixed precision. Odd moduli use residues 2 or -2 and
density 1/varphi(d). Even moduli contain only the appropriate shifted
powers of 2; the bound O(W_i^2 T^2) suffices. These are the same
parity and endpoint transfers as in prime-detection-spec section 3.

For an entirely explicit density expression put
alpha_i(d;t)=a_i(d)log t+b_i(d), with zero coefficients outside (2),
and define

\[
 \begin{split}
 L_0(x)&=\sum_{\substack{d\le W_L^2\\d\ {\rm odd}}}
             \frac{1}{\varphi(d)}\int_J\alpha_L(d;t)\,dt,\\
 R_0(x)&=\sum_{\substack{e\le W_R^2\\e\ {\rm odd}}}
             \frac{1}{\varphi(e)}\int_J\alpha_R(e;t-2)\,dt .
 \end{split}                                                   \tag{6}
\]

Then L=L0+O_A(x/T^A) and R=R0+O_A(x/T^A).
No restriction to a particular factor count, to small-prime-free
inputs, or to the support M_delta is present in these statements.

Similarly CRT directly evaluates J_P=sum_J P_L(n)P_R(n-2).
Compatibility is gcd(d,e)|2 and the progression modulus is lcm(d,e):

\[
 J_0(x)=
 \sum_{\substack{d\le W_L^2,\ e\le W_R^2\\(d,e)\mid2}}
 \frac1{[d,e]}\int_J\alpha_L(d;t)\alpha_R(e;t-2)\,dt,\qquad
 J_P=J_0+O(x^{29/50}T^2).
                                                               \tag{7}
\]

For each compatible progression, partial summation of its O(1)
counting discrepancy costs O(T^2). There are at most
W_L^2 W_R^2<=x^(29/50) coefficient pairs. This verifies the full
error without a prime distribution theorem for J_P.

Expanding (3) on both sides now gives, exactly before these estimates,

\[
 \widehat{\mathcal R}=S-L-R+J_P.
                                                               \tag{8}
\]

Consequently the already-derived complete identity
S=C2*x+Rhat+O_A(x/T^A) entails

\[
                L_0+R_0-J_0=C_2x+O_A(x/T^A).                  \tag{9}
\]

Equation (9) is a consistency consequence of the owning reduction,
not an independent proof of its constant. We have neither replaced
S by its conjectural asymptotic nor inferred a new lower bound.
The exception budget in (4), used in any of these weighted products,
is O_epsilon(x^(39/40+epsilon)) as in the global factor note.

## 4. The selected branch and the exact joint correction

Keep M_delta, c_x, B_c^r, B_c^p and R_delta from the Dickman note.
Put U_delta=T B_c^r and Q_delta=T B_c^p. Its paid reconstruction is
R_delta=U_delta-Q_delta+o_delta(x). Therefore

\[
 \begin{split}
 \mathcal C_\delta
   &=\widehat{\mathcal R}-R_\delta-Q_\delta\\
   &=S-L-R+J_P-U_\delta+o_\delta(x)\\
   &=S-C_2x-U_\delta+o_\delta(x).
 \end{split}                                                   \tag{10}
\]

The prime-partner subtraction cancels when this **entire** complement
is restored. The uncancelled arithmetic is S, or equivalently the
original full signed remainder. Treating that cancellation as an
estimate for C_delta would be circular. In particular, (10) supplies
no improvement to the Dickman note's insufficient separate-sign bound.

The selected one-prime-cofactor weight is not the unrestricted D_L.
A formal factor-vector control makes the distinction explicit. Use
exponents relative to log n, away from every cutoff boundary:

\[
 \mathbf t=(12,13,75)/100,\qquad
 \mathbf t'=(12,13,36,39)/100.                                 \tag{11}
\]

Both have the same small-prime vector (12,13)/100, total small
exponent 1/4<1/2, F_L=1-1-1=-1, and total large-factor exponent 3/4.
Thus the unrestricted normalized weight F_L log(t_L)/log n is
-3/4 for both. The selected prime-cofactor weight is -3/4 for the
first vector and zero for the second, which has two large factors.
The distinction persists on open neighborhoods with total exponent one.

This is a counterexample to identifying the two **factor-vector
functions**, or to inferring the selected branch from just its
small-factor vector and total large-factor exponent. It is not an
arithmetic density theorem, a shifted occurrence claim, or an
impossibility theorem for all divisor representations. No assertion
about the actual primality of n-2 is made from these vectors.

## 5. Research decision: require an additional arithmetic estimate

The bounded completion test is finished. Its reusable parts are (1)--(7),
the precise source interfaces, and the distinction (11). Its attempted
payoff failed: source-matched whole-subset algebra reconstructed an
existing open problem without improving its estimate.

For reference the one-sided target may still be stated using the actual
left Vaughan coefficients:

\[
 \mathcal B_L(x)=
 \sum_{\substack{dk\in J\\d>a_L,\ k>W_L}}
 \mu(d)(1-\widehat\rho_L(d))\beta_{W_L}(k)\Lambda(dk-2),
 \qquad
 \mathcal B_L(x)\ge -C_2x+c\,x/T^K                             \tag{12}
\]

for some fixed c>0, K>=0 on unbounded common dyadic scales.
The inequality is **OPEN**. The uniform first reduction and comparison
transfer in global-cutoff-averaging section 2 give
S=C2*x+B_L+O_A(x/T^A); the second reduction gives
B_L=Rhat+O_A(x/T^A). Thus (12) is already the earlier sufficient
consumer, not a new conjecture suggested by this audit.

A next attempt must name an additional estimate for these actual
coefficients, or a different justified one-sided estimate for the full
residual, before doing harmonic constant optimization. If using
Ford--Maynard, specify which structured factor sums are controlled and
which complement is left; do not assign their arbitrary-coefficient
Type II conclusion to Pan--Ding's prime-cofactor mean value theorem.
If using Mounier, verify the stated signed remainder range and then
derive the needed weighted conclusion. An exact rewriting, a finite
positive sample, or an unproved distribution hypothesis does not
complete either requirement.

This audit narrows the justification for further work; it does not
establish that this route is the most promising route to a proof.

## 6. Checks and source custody

[joint-correction-validation.js](joint-correction-validation.js) checks
(1)--(4) against independent divisor convolutions using formal prime
logarithms, including repeated primes, exceptional powers and prime
inputs. It checks the four-term product identity, CRT compatibility
and support budgets, and the two factor-vector functions in (11).
The output is a VERIFIED finite control, not proof of BV or any
asymptotic density. The arguments and input ranges above carry those
claims. Decisive falsifiers include a lost prime-power term, reversal
of E_i in (4), omission of a prime intersection in (8), assigning
the full divisor support to a branch restriction, or an unsupported
Type II import. Those checks were performed; no new signed estimate
or effective onset was computed.

PDFs read as text, with selected pages inspected as images:

- Ford--Maynard arXiv v1: Definition 7.1 on p. 36, Lemma 7.18 and
  Proposition 7.19 on p. 51, and the decisive Type II step on p. 60
  inspected as images. Section 4.6, Theorem 7.3, Lemma 7.21 and
  the beginning/end of Proposition 7.22's proof were also read.
  SHA-256: 3ca8078509f8f9e7cf52ca943a1599a714e23c1387ae27bbd0845998d76d2301.
- Mounier arXiv v3 (2025-10-26, journal reference Acta Arith. 220):
  pp. 3, 4, 31 inspected as images; Lemma 3.8 and its weighted
  partial-summation proof on pp. 18--19 read.
  SHA-256: bd4e146159bf75844cdaaa6b666126a712762c032075c1ec1cdbbb9caf008ed7.
- Friedlander--Iwaniec arXiv v1: pp. 3--4 (printed 1043--1044)
  inspected as images; discussion through printed p. 1046 read.
  SHA-256: d39f5249d9003a8a7ce121c93e785dcffa2dfb5ccc9e728820a705826d953d1f.

No full reproof of these papers or the entire upstream reduction is
claimed. The exact imported hypotheses and failed direct matches,
rather than paper titles or repeated agreement, determine this decision.
