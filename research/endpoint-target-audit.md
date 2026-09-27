# Endpoint target audit: a shrinking margin suffices

<!-- ledger
id: Q-endpoint-target-audit
status: ANSWERED
todo: C
parity: Quantitative PNT and the previously derived prime BV, Mobius BV and CRT bounds retain an error smaller than every fixed logarithmic scale. This permits a shrinking one-sided margin in the endpoint consumer. No such margin is established, and no universal obstruction is inferred from a failed Kloosterman bound.
question: Does the endpoint reduction require a fixed positive fraction of the expected twin count, and do recorded uniform-gap theorem failures exclude its weaker consumer?
verdict: No fixed fraction is required: for every fixed H the reduction has error O_H(x/log^H x), so C2*x+E_>(x)>=c*x/log^K x on unbounded dyadic scales suffices, as does a stated logarithmically rescaled average. These implications are derived from named inputs; their endpoint hypotheses remain OPEN. The recorded uniform-gap theorem comparison has different quantifiers and does not establish an obstruction for this consumer.
-->

**The endpoint estimate and twin-prime infinitude remain OPEN.** This audit
checks two assumptions that affect the next research decision: the size of
the required positive margin and the scope of a recorded theorem failure.
It derives a weaker sufficient condition from the existing error budgets.
It supplies no new cancellation estimate, numerical evidence or novelty claim.

The exact definitions and cutoffs are those of
[signed-divisor-grouping.md](signed-divisor-grouping.md): x is dyadic,
J_x=(x/2,x], U=V=floor(x^(6/25)), Y=Z=floor(x^(1/20)), and
L=floor(x^(7/10)). E_>(x) is that note's equation (18), with all four
indices, signs, parity branches and endpoint weights retained.

[residual-coverage.md](residual-coverage.md) now removes a larger exact
union of controlled cuts. Its E_* can replace E_> in every sufficient
condition below: their difference is O_H(x/log^H x) for every fixed H.
[grouped-divisor-moment.md (19)--(20)](grouped-divisor-moment.md) further
replaces E_* by the current E_dagger at the same arbitrary fixed
logarithmic precision. Every sufficient condition below therefore also
applies to E_dagger. These are distinct exact sums with explicitly
controlled differences, not interchangeable definitions. The one-sided
margin itself remains OPEN. [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md)
states the current object and assignment requirements together.

## 1. Recover the quantitative error before weakening the target

Write S(x)=sum_{n in J_x} Lambda(n)Lambda(n-2), and let M(x), B(x),
I_1(x), I_2(x) be the quantities in
[prime-detection-spec.md](prime-detection-spec.md). The displayed o(x)
in its main-term formula can be sharpened to

$$
             M(x)=C_2x+O_H(x/\log^H x)\quad(H>0).             \tag{1}
$$

To check this, at every odd prime power p^j,
b(p^j)=2C_2(1+1/(p-2)); even integers have b=0. Hence M differs from
2C_2 sum_{n in J_x} Lambda(n) by the contribution of powers of 2 and
the sum of 2C_2 log(p)/(p-2) over odd prime powers in J_x.
For j=1, p>x/2 and the latter sum is O(log x), even using only the
integer count. The terms with j>=2 cost O(sqrt(x) log^2 x) by counting
proper prime powers and bounding each weight by O(log x). Powers of 2
are absorbed in that allowance.

The required classical input is
psi(t)=t+O_H(t/log^H t), stated with a stronger error in
[Tao, Notes 2, Corollary 39](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/).
Subtract its values at x and x/2. Every fixed power of log x is
dominated by sqrt(x), so the prime-power allowance is also absorbed
in (1). This is an application of quantitative PNT, not an inference
of a rate from the bare statement M=C_2x+o(x).

Now retain the rate in every other step:

| contribution to S-C_2x-E_> | available bound and owning argument |
|---|---|
| M-C_2x | (1) above |
| I_1-I_2 | O_H(x/log^H x), prime-detection-spec.md section 4 |
| -Bcal(b), where B=Bcal(a)-Bcal(b) | O_H(x/log^H x), polylog-fold-transfer.md section 4 |
| P_1-P_2, where Bcal(a)=P_1-P_2+R | O_H(x/log^H x), shifted-prime-decomposition.md section 4 |
| R_{<=L} | O_H(x/log^H x), signed-divisor-grouping.md sections 2-4 |
| M_>, where R_{>L}=M_>+E_> | O_H(x/log^H x), signed-divisor-grouping.md section 5 |

These are a fixed number of contributions. Their identities give

$$
 S(x)=C_2x+E_>(x)+O_H(x/\log^H x)
                   \quad\hbox{for every fixed }H>0.           \tag{2}
$$

All constants may depend on H. This statement supplies neither effective
onsets nor uniformity when H itself grows with x. The pre-existing
arithmetic derivations are inputs to (2), not newly independently refereed
theorems. Their finite identities have checks in
[prime-detection-validation.js](prime-detection-validation.js),
[shifted-prime-validation.js](shifted-prime-validation.js) and
[signed-divisor-validation.js](signed-divisor-validation.js).

## 2. A logarithmically shrinking margin

Fix K>0 and c>0. The following hypothesis is sufficient and **OPEN**:

$$
 C_2x+E_>(x)\ge {c x\over\log^K x}
                 \quad\hbox{on an unbounded set of dyadic }x.  \tag{3}
$$

Choose H>K in (2). Its error is o(x/log^K x). The contribution to S
from pairs with a proper prime power on either side is
O(sqrt(x) log^3 x), also o(x/log^K x), by
prime-detection-spec.md section 1. If N_2(x) counts genuine prime pairs
in J_x, each contributes at most log^2 x to S. For all sufficiently
large x in the same set, absorb each of these two errors into one
quarter of the margin in (3), obtaining

$$
                   N_2(x)\ge {c\over2}
                                  {x\over\log^{K+2}x}.         \tag{4}
$$

The intervals escape to infinity, so (4) implies infinitely many twins.
An additional o(x/log^K x) term on the right of (3) can be absorbed by
reducing c. A bare o(x) error cannot be absorbed this way.

The earlier fixed-fraction condition implies (3) for any fixed K>0
eventually. Condition (3) allows the guaranteed fraction of x/log^2 x
to tend to zero. It is still a stronger requirement than infinitude:
infinitude alone need not supply the lower count (4). This audit proves
sufficiency and does not prove logical independence of arithmetic
conjectures. The stronger fixed-fraction target remains available.

## 3. An average with the same smaller margin

Let x_j=2^j and fix j_0. Another sufficient and **OPEN** hypothesis is

$$
 \limsup_{J\to\infty}{1\over J-j_0+1}
       \sum_{j=j_0}^{J}(\log x_j)^K
          \left(C_2+{E_>(x_j)\over x_j}\right)>0.              \tag{5}
$$

Multiplying (2) by (log x)^K/x gives an error tending to zero if H>K;
its Cesaro average therefore tends to zero. Thus (5) gives a positive
limsup average of the nonnegative quantities
S(x_j)(log x_j)^K/x_j. Infinitely many exceed a fixed positive constant:
otherwise their eventual upper bound could be chosen below the positive
limsup. Removing proper prime powers on those scales yields a positive
constant times x_j/log^(K+2) x_j genuine prime pairs, as in section 2.

The factor (log x_j)^K is essential to this formulation: a positive
fixed limsup for the unscaled average of S(x_j)/x_j was the stronger
consumer in shifted-prime-decomposition.md section 6. Averaging still
does not make fixed-coefficient correlation theorems uniform in our
changing cutoffs. Neither (3) nor (5) is estimated here.

## 4. What the recorded Kloosterman failure actually decides

The theorem comparison in
[attack-sqrt-cancellation.md](history/staging/attack-sqrt-cancellation.md)
addresses a uniform gap certificate. Its conclusions must be read at
that scope before deciding whether to reuse or revisit the argument.

| feature | recorded comparison | present endpoint problem |
|---|---|---|
| interval position | every translate across a primorial period | the actual interval (x/2,x] |
| coefficients | selected linear-sieve weight products | the exact Mobius and prime-power coefficients in E_> |
| required conclusion | an absolute bound uniform in position | (3), or the signed average (5), is sufficient |
| role of the theorem calculation | prices particular published estimates in its specified ranges | the Fourier follow-up prices an additional rectangle with its phase and tail costs; the complement remains open |

[Bettin-Chandee, Theorem 1 and Remark 1](https://arxiv.org/pdf/1502.00769)
allow arbitrary separate coefficients in a trilinear inverse-residue sum
and charge an additional factor for a differentiable phase perturbation.
The recorded uniform-position calculation cannot simply be transferred
to this different position range. Conversely, the actual interval does
not make that factor free: its cost depends on the Fourier cutoff and
the product of the moduli. [endpoint-fourier.md](endpoint-fourier.md)
now supplies that budget and a matched application on an additional
rectangle after aggregating the coefficients.

A published upper bound exceeding the desired budget does not establish
that the underlying signed sum exceeds it. The recorded calculation
therefore cannot establish a universal obstruction to this endpoint
consumer. This scope check neither overturns its numerical comparison
nor asserts that the published theorem suffices here.

## 5. Consequence for the next attempt and its falsifiers

The current controlled union and exact E_dagger are in
grouped-divisor-moment.md section 5. Its section 6 leaves a nonzero
small-common-divisor kernel at d~x^(8/25), e~x^(9/20), with a required
moment-exponent saving strictly greater than 3/50. Price that local
target and its possible extension across the remaining domain, or pursue
(3) or (5) directly with E_dagger substituted. The earlier squarefree
pilot was controlled by prime-dispersion.md and is not a remaining task.
Preserve signs before estimating: a useful one-sided estimate need not
give E_dagger=o(x). A successful local estimate alone does not establish
either global margin. Require the complete arithmetic and error budget
before changing weights or commissioning another numerical run.

The derivation here fails if any discarded term has only an unspecified
o(x) bound, if a constant must be uniform in a growing H, or if the
prime-power subtraction is comparable to the claimed margin. Section 1
lists every discarded term and its arbitrary fixed logarithmic rate;
H is fixed after K, and the prime-power error is smaller than that margin.
A positive E_> margin is still an unproved arithmetic input. Rewriting
its sufficient size is a specification improvement, not progress on
estimating the signed correlation itself.
