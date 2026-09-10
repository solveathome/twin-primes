# Factor signs in the complete global remainder

<!-- ledger
id: Q-global-factor-signs
status: PARTIAL
todo: C
parity: Exact divisor algebra for the full logarithmic profiles, an elementary count of exceptional prime-power divisors, and the standard divisor bound; PNT is used only for existence of the single-input factor cell. The signed shifted estimate is not supplied. Refutation concerns a specified pair-trigger majorant, not sieve methods generally.
question: Which full factor configurations cause negative global products, can prime-power exceptions be paid, and does a pair-trigger upper bound control the negative part?
verdict: Derived: G_i(n)=Lambda_(>W_i)(n)-F_i(s_i(n))*log t_i(n)-E_i(n), with all small-prime factors in s_i and all primes of t_i exceeding W_i. The correction is supported on a small-prime power exceeding W_i; its full shifted effect is O_epsilon(x^(39/40+epsilon)). After also paying proper prime powers, the residual is a composite-filtered signed smooth/rough cofactor sum. A ten-small-prime cell has F=-84 although every pair lies below a, refuting the proposed pair-trigger majorant. Prime filters contribute explicit terms when bounding the negative part; dropping them is an upper bound, not an identity. No scale-x signed improvement or twin margin follows.
-->

**Twin-prime infinitude remains OPEN; this attempt gives no improved
signed bound.** It derives a factor formula and pays its exceptional
terms, then refutes a particular proposed upper bound on negative mass.
The next estimate is stated with the full small-prime sum and the prime
filters intact. This is not a novelty claim.

Baseline: commit 689dac9, 2026-09-06. The parameters, uniform global
identity and consumer are those of
[global-cutoff-averaging.md](global-cutoff-averaging.md). In particular
W_L=b_L=floor(x^(6/25)), W_R=b_R=floor(x^(1/20)), and
F_i(m)=sum_(d|m) mu(d) rho_i(d). All assertions below concern sufficiently
large x, so both inputs in J_x and J_x-2 exceed both W_i.

## 1. Exact factor formula, including the exceptional term

Suppress the side index. Factor uniquely

\[
 n=s_W(n)t_W(n),\qquad
 s_W(n)=\prod_{p\le W}p^{v_p(n)},\qquad
 t_W(n)=\prod_{p>W}p^{v_p(n)}.
                                                               \tag{1}
\]

Write s=s_W(n), t=t_W(n), and H_W(n)=log t. Empty products are one.
Since rho(d)=0 for d>=b=W, no nonzero divisor term in F contains a
prime exceeding W. Consequently F(n)=F(s), including repeated prime
factors, and

\[
 F(s)=\sum_{A\subseteq\{p:p\mid s\}}
            (-1)^{|A|}\rho\left(\prod_{p\in A}p\right).
                                                               \tag{2}
\]

This is the complete subset sum, not a truncation by the number of
prime factors. F depends only on the radical of s.

The convolution identity in the preceding note also reads

\[
 G(n)=\Lambda_{>W}(n)-
             \sum_{\substack{r\mid n\\r>W}}\Lambda(r)F(n/r).
                                                               \tag{3}
\]

For r=p^j with p>W, removing any number of copies of p leaves F
unchanged. The sum of their Lambda weights is log t. Thus exactly,

\[
 \boxed{G(n)=\Lambda_{>W}(n)-H_W(n)F(s)-E_W(n),}
 \qquad
 E_W(n)=\sum_{\substack{p\le W,\ j\ge2\\p^j\mid n,\ p^j>W}}
                      (\log p) F(n/p^j).
                                                               \tag{4}
\]

No prime powers inside beta were replaced by primes. The Lambda term
is the r=n correction; in particular G(p)=0 at every prime.

Call n regular for W when p^(v_p(n))<=W for every p<=W dividing n.
Then E_W(n)=0. On a regular composite which is not a prime power,

\[
 G(n)=-(\log t)F(s).                                           \tag{5}
\]

For a regular proper prime power n=p^k>W, necessarily p>W, and
G(n)=-(k-1)log p. Therefore it too has the negative sign of -F(s),
since s=1 and F(1)=1. These inputs must not be assigned -k log p
without an error calculation.

Thus, on regular composite inputs with t>1, a negative coefficient
product occurs exactly when the two F values have opposite signs.
The positive rough weights only change its size. Primes have zero
G; smooth inputs with t=1 and regularity also have zero G. This
classification includes all regular squareful composites.

## 2. The exceptional terms have a power saving on the full pair

For each prime p<=W let k(p) be the least integer with p^k(p)>W.
Then k(p)>=2 and every irregular n is divisible by some p^k(p).
Split the reciprocal sum at sqrt(W). For p<=sqrt(W), each summand
is less than 1/W and there are at most sqrt(W) choices. For larger p,
k(p)=2, and the sum is bounded by the tail of sum_(m>sqrt(W)) m^-2.
Hence, using only the union bound,

\[
 \#\{n\le x:n\text{ irregular for }W\}
 \le x\sum_{p\le W}p^{-k(p)}\ll xW^{-1/2}.                     \tag{6}
\]

There is no squarefree restriction on the remaining integers.
Pointwise beta_W(m)<=log m, |F(m)|<=tau(m), and the definition of G
gives |G(n)|<=tau(n)log n. Also |H_W(n)F(s)|<=tau(n)log n and
|E_W(n)|<=tau(n)log n by summing the prime-power Lambda weights.
The elementary divisor bound tau(n)<<_epsilon n^epsilon therefore
pays the difference of full products on the union of the two
exceptional sets:

\[
 O_\epsilon\left(x^{39/40+\epsilon}\right).                    \tag{7}
\]

Here the worse cutoff is W_R approximately x^(1/20); absorb both
pointwise divisor factors and logarithms into the displayed epsilon.
The number of proper prime powers up to x is O(sqrt(x) log x),
by summing the integer bases for exponents at least two. Their
full product correction is O_epsilon(x^(1/2+epsilon)), also within
(7). The same reasoning applies to positive and negative parts,
since z -> max(z,0) is Lipschitz with constant one.

For clarity define the explicit all-input coefficient

\[
 D_i(n)=H_{W_i}(n)F_i(s_i(n)),\qquad
 C_i^{\rm comp}(n)=\mathbf1_{\{n\ {\rm composite}\}}D_i(n).
                                                               \tag{8}
\]

This C^comp is not the sharp corner coefficient C in the previous
notes. Equations (4)--(7) give the full statement

\[
 \mathcal R(x)=
 \sum_{n\in J_x} C_L^{\rm comp}(n)C_R^{\rm comp}(n-2)
 +O_\epsilon(x^{39/40+\epsilon}).                             \tag{9}
\]

Fix any epsilon<1/40 when consuming this error; it is then smaller
than x/log^A x for every fixed A. No irregular, squareful, or
prime-power term is silently discarded.

## 3. A proposed pair-trigger majorant fails

A natural first attempt was to charge F(s)^-=max(-F(s),0) to pairs
of small primes whose product crosses the initial cutoff. A concrete
version would require some fixed K with

\[
 F(s)^-\ \le\
 K\sum_{\substack{p<q\\pq\mid s}}\mathbf1_{\{pq>a\}}.            \tag{10}
\]

Even restricting the individual primes to p<=a does not repair
this inequality.

Take ten distinct small primes such that every triple product is
below a and every quadruple product is above b. All the divisor
profile values in (2) are then zero or one, and

\[
 F(s)=1-10+45-120=-84.                                        \tag{11}
\]

Every pair is below a, so the right side of (10) is zero for every
K. For n=sq with q>W prime and all ten small primes <=W, (4)
gives G(n)=84 log q. This is a positive coefficient caused by
higher-order subset cancellation, not by a pair crossing a.

The configuration fits strict margins in the actual left exponent
ranges: choose the ten prime exponents in (.069,.071). Triple
products have exponent at most .213<.22, and quadruple products
have exponent at least .276>.24. Their product has exponent in
(.69,.71), leaving a large prime cofactor near exponent .30,
above .24. The usual [prime number theorem, Tao Notes 2, (3)](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/)
supplies distinct primes
in these fixed power intervals and a prime q in
(x/(2s),x/s] for sufficiently large x. Only this existence statement
uses that standard input; no shifted occurrence or density is
claimed. Floors preserve the strict margins eventually.

An independent finite integer instance uses the ten primes
101,103,107,109,113,127,131,137,139,149, with a=4,000,000,
b=W=6,000,000 and q=10,000,019. The validator checks primality,
all subsets, (11), and the zero pair count exactly with integer
arithmetic. These finite cutoffs are a proxy; the exponent argument
above gives the separate asymptotic admissibility check.

This refutes (10) and any bound that vanishes whenever all pairs
are below a. It does not refute a higher-order majorant, a
different signed inequality, or the use of small-prime structure.
Nor does the single-input cell prove that it occurs together with
a particular factorization of n-2.

## 4. A valid negative-part inequality and its missing estimate

The [switching follow-up](switching-negative-mass.md) now proves
that the negative-only target (15) below is false at the present
cutoffs: an actual composite-filtered family already has negative
mass with liminf at least kappa*C2*x, kappa>3/2. This holds for
both the linear and C3 profiles. The inequalities and prime-filter
algebra here remain valid; use the net consumer retaining P_comp.

Let P_G and N_G be the positive and negative parts of the original
full G product. Define D_i^+=max(D_i,0), D_i^-=max(-D_i,0), and

\[
 N_D(x)=\sum_{n\in J_x}
     \big[D_L^-(n)D_R^+(n-2)+D_L^+(n)D_R^-(n-2)\big].
                                                               \tag{12}
\]

Removing the prime inputs in (8) gives the exact correction

\[
 \begin{split}
 A_{\rm pr}(x)={}&
 \sum_{\substack{n\in J_x\\n\ {\rm prime}}}
             (\log n)D_R^-(n-2)\\
 &+\sum_{\substack{n\in J_x\\n-2\ {\rm prime}}}
             (\log(n-2))D_L^-(n).
 \end{split}                                                   \tag{13}
\]

Both primes exceed the cutoffs, so D_i(p)=log p. A double-prime
input contributes zero to (12) and to (13); there is no missing
intersection correction. Therefore

\[
 N_G=N_D-A_{\rm pr}+O_\epsilon(x^{39/40+\epsilon}),\qquad
 N_G\le N_D+O_\epsilon(x^{39/40+\epsilon}).                     \tag{14}
\]

This is a valid upper bound, not the desired bound. To use the
negative part alone, one would still need, for fixed c,K>0 on
unbounded common dyadics, for example

\[
 N_D-A_{\rm pr}\le C_2x-cx/\log^K x.                           \tag{15}
\]

More generally retain the corresponding composite positive sum
P_comp from (9) and prove
N_D-A_pr-P_comp <= C2*x-c*x/log^K x. Its error is already paid.
Neither inequality is established here.

The available linear Type I estimates do not evaluate (12) or
(13): taking a positive or negative part of a divisor sum is
nonlinear. Replacing F^- by a short signed divisor polynomial
requires a pointwise bound with a stated remainder and support.
No such replacement has been supplied. The support of the original
linear F cannot simply be assigned to its negative part.

## 5. Full cofactor form and the next bounded question

The subsequent [smooth-majorant argument](global-smooth-majorant.md)
completes a higher-order bound: a different C3 admissible profile
has full absolute O(x) mass. The cofactor formula below remains
valid for that profile, with hats; its signed constant is OPEN.

For any s,t let F_L(s),F_R(t) keep their complete subset sums.
The main sum in (9) is exactly

\[
 \sum_{\substack{su-tv=2,\ su\in J_x\\
        P^+(s)\le W_L<P^-(u)\\
        P^+(t)\le W_R<P^-(v)}}
 F_L(s)F_R(t)(\log u)(\log v)\,
 \mathbf1_{\{su,\ tv\ {\rm composite}\}}.                     \tag{16}
\]

Use P^+(1)=1 and P^-(1)=infinity; log 1 makes those rough-cofactor
terms zero. The decompositions are unique and include every small
cofactor, with all multiplicities. There is no unpriced tail.
The nonzero u and v have at most four and nineteen prime factors,
respectively, counted with multiplicity: every integer prime >W_i
is strictly greater than x^(w_i), and the products are at most x.
This does not bound the number of prime factors in s or t.

The remaining signed question is whether a signed Buchstab decomposition
of the rough factors in (16), or a justified majorant/minorant of
the full F sums, can price the mixed-sign mass together with (13)
and retained positive mass at scale x. Keep the small-cofactor sum
inside until the new inequality is justified. A calculation on only
two or three small factors is not a full estimate; it needs a
bound for everything omitted. The subsequent absolute O(x) bound,
without a sufficient constant or signed improvement, does not meet
the consumer.

Changing admissible averaging profiles changes this sign
decomposition, but their full signed residuals all equal
S-C2*x+O_A(x/log^A x) by the uniform global reduction. Thus choosing
a profile can facilitate an estimate; it cannot be asserted to
improve the underlying signed total.

## 6. Falsification and reproducibility

[global-factor-signs-validation.js](global-factor-signs-validation.js)
checks the actual logarithmic ramp using exact integer polynomials
in formal prime logarithms, after multiplying by log(b/a). It
compares the original divisor convolution against (4), checks the
prime zeros and large-prime-power correction, and tests (9) exactly
off its explicitly identified exceptional sets. Squareful regular
inputs are retained. It also exercises active failures when E or
the prime correction is omitted. Positive/negative splits in the
small scan use floating evaluation, separately labeled; the
ten-prime counterexample uses exact integers.

The new algebra would fail on a mismatch in these identities;
those finite tests passed. The uniform error claim is supported
by (6) and the pointwise divisor bounds, not by fitting finite
counts. The pair-trigger inequality has an explicit counterexample.
No asymptotic sign density, estimate for (15), or sufficient twin
margin is tested or claimed by this script.
