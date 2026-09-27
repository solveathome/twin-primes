# Where a proof opportunity remains after Chen

<!-- ledger
id: Q-chen-opportunity
status: ANSWERED
todo: C
parity: Exact weight identities and classical sieve constants diagnose a particular signed target. The proposed next input concerns joint factor/cofactor sums with a shifted-prime constraint on long intervals; no such estimate is proved, and no universal obstruction for the tile is claimed.
question: Does the signed Chen target identify an approachable proof mechanism, and what should the next research obligation be?
verdict: The target is sufficient but subtracts an avoidable odd-composite penalty; even cancellation of its obvious signed components does not close the existing separate bounds. Select a prime-detecting weight against explicitly justified arithmetic input ranges before pursuing a new estimate. The opportunity is a research judgment, not a proved mechanism.
-->

Internal assessment, 2026-09-05. The missing arithmetic remains **OPEN**.
The identities and inequalities below are elementary consequences of
[the Chen benchmark](chen-fold-benchmark.md) and
[the signed target](chen-signed-target.md). They do not advance the known
asymptotic twin-prime lower bound. Finite checks and exact rational
certificates are in [chen-benchmark-validation.js](chen-benchmark-validation.js).

## 1. The proposed target contains an avoidable loss

Retain the benchmark's I_x, z=x^(1/8), r=x^(1/3), χ_z and W. In this section
restrict openers to actual primes and use weights log p. Write Q_P and R_P
for these versions of Q and R, and let T_Λ be the weighted twin count.
Removing proper prime powers changes Q and R by O(√x log²x).

Define the nonnegative quantity

$$
 L(x)=\sum_{p\in I_x\atop p\text{ prime}}
  (\log p)\chi_z(p+2)[-W_x(p+2)]
                 1_{\Omega(p+2)\ge3\text{ odd}}.
$$

Then, **exactly** for sufficiently large x,

$$
                 Q_P-R_P=2\bigl(T_\Lambda-L\bigr).                 \tag{1}
$$

Indeed a prime partner has W=1 and λ=−1, an even factor count contributes
zero to (1−λ)W, and an odd composite contributes 2W≤0. Thus the signed
condition Hη asks twins to outweigh L by a positive margin on its chosen
scales. Infinitely many twins alone would not justify that condition.

There is a cleaner diagnostic. Put W⁺=max(W,0). On x^(2/3)<m≤x,

$$
 W^+(m)>0\iff\Omega(m)\le2,
 \qquad {1-\lambda(m)\over2}W^+(m)=1_{m\text{ prime}}.              \tag{2}
$$

For Ω≥3 the Chen lemma gives W≤0. For a semiprime, both factors cannot be
at most r, since their product would be at most x^(2/3); hence W is 1 or
1/2. Prime partners have W=1. This proves (2), including square factors.
Consequently

$$
                 Q_P^+-R_P^+=2T_\Lambda,\qquad Q_P^+\ge Q_P.        \tag{3}
$$

Clipping removes the penalty but does not supply an estimate of R_P⁺. It
re-expresses the exact count through a nonnegative measure supported on
primes and semiprimes. Proving that this measure cannot be entirely carried
by semiprimes is still the missing step. Neither (2) nor (3) is a parity
escape or a newly obtained asymptotic lower bound.

## 2. Which composites create the loss?

For a squarefree z-rough m, Ω(m)≤8. Let k count its prime factors at most r.
The possible nonzero odd-composite contributions to L are:

| Ω(m) | factor condition | −W(m) |
|---|---|---|
| 3 | all three factors at most r | 1/2 |
| 5 | four factors at most r | 1 |
| 5 | all five factors at most r | 3/2 |
| 7 | all seven factors at most r | 5/2 |

For three factors, k=1 gives k=b=1, and k=2 gives W=0. For five factors,
two factors above r would force m>x^(2/3+3/8)>x. For seven factors, even
one above r would force m>x^(1/3+6/8)>x. These prove the table.

The triple row is negligible at the benchmark scale: m>x/2 and all factors
at most r forces each factor above r/2. There are O(x/log³x) such triples
by the elementary prime-counting upper bound, so their log-weighted
contribution is O(x/log²x)=o(x/log x). Squareful rough partners also contribute
only

$$
 O\!\left(\log x\sum_{z\le q\le\sqrt x\atop q\text{ prime}}
                  (x/q^2+1)\right)
       =O((x/z+\sqrt x)\log x)=o(x/\log x).
$$

Here |W|≤3 on rough partners: k+e≤Ω≤8, and b=1 forces k=1,e=0.
The five- and seven-factor rows remain possible contributions at the
benchmark scale; no negligible bound for them is proved here. Counting the
number of configurations in a finite tile does not settle their asymptotic
weight under the shifted-prime constraint.

## 3. Why cancelling the obvious signed terms is insufficient

Let K=R₁−R₂/2, using the signed note's notation. Its exact decomposition gives

$$
 Q-R=A_1-\tfrac12 A_2-A_3-K+o(x/\log x).                          \tag{4}
$$

Even **granting the unproved estimate** K=o(x/log x), the separate classical
bounds from the benchmark give only the leading lower-bound coefficient

$$
 \log3-\tfrac12\log6-J
       =\tfrac12\log(3/2)-J< -\tfrac1{12}<0,                     \tag{5}
$$

in units H=C₂x/(2 log z). This is a negative **certified lower-bound
coefficient**, not an assertion that Q−R itself is negative. It shows that
these separate bounds do not close the conditional theorem merely by
cancelling K. Joint estimates, a sharper unsigned estimate, or a different
weight could change the conclusion.

For a check of the strict sign without floating point integration, use
log u≥2(u−1)/(u+1) for u≥1 to obtain

$$
 J=\int_{1/8}^{1/3}{\log(2-3t)\over t(1-t)}\,dt
 \ge {2\over3}\log(7/2)-{10\over21}>{1\over3}.
$$

Also log(3/2)<1/2. The validator certifies both strict comparisons with
rational bounds from a positive logarithm series. The original positive
Chen margin pays half of A₃; the prime minorant in (4) must pay all of it.

## 4. The research opening and the literature interface

**Research judgment:** the best next opening identified here is a joint
arithmetic estimate for actual factors, with the shift 2 retained, coupled
to a weight that converts the estimate into a positive prime count. The
fold representation may help organize factor ancestry and combine deletion
terms before taking absolute values. No such saving has been derived from
the representation. Its exactness alone is not an estimate.

The present identity exposes terms Λ(qv−2)λ(v)χ_z(v), where q is prime,
x^(1/8)≤q≤x^(1/3), and qv lies in the specified long interval. It is a
concrete starting expression, not a privileged final coefficient or range.
The coefficient λ(v) may be replaced by other coefficients if the algebra
and the final prime minorant require them; every replacement needs its own
justification. Separate control of divisibility by q does not establish
control of this interaction.

[Ford–Maynard, *On the theory of prime-producing sieves*, v1](https://arxiv.org/html/2407.14368v1)
provides a framework for checking what Type I and Type II information can
force. Its Theorem 2.1 gives prime-free examples when the Type II range is
too narrow. Theorem 2.7 gives positive lower bounds in specified ranges.
These are statements about defined input classes, not all fold arguments.
Their Type II hypothesis covers arbitrary divisor-bounded coefficients on
both factors, not only one Liouville sum with a prime first factor. Section 4
also requires growth control and a comparison sequence satisfying a
generalized prime-number condition. The perturbed parameters in Theorem
2.7(a) use the bounded class (4.1), not automatically the general class.
An application here would have to verify every hypothesis.

For instance, the natural positive sequence a_m=Λ(m−2), restricted to a
long interval, has a prime-index sum counting weighted twins apart from
proper prime powers. But b_m=1 is not the correct comparison sequence:
for fixed odd d its divisibility mass is asymptotic to x/(2φ(d)), not
x/(2d); even m have a separate local obstruction. Moreover the natural
logarithmic weights do not automatically meet a fixed pointwise bound
|a_m−b_m|≤τ(m)^ρ at prime indices. Normalizing the weights must also
preserve the comparison prime mass required by the selected theorem.
These are concrete obligations, not a completed transplant.

## 5. The resulting specification and its remaining obligation

The [conditional prime-detection specification](prime-detection-spec.md)
supplies the following deliverables, using a classical Vaughan consumer:

1. A nonnegative shifted-prime sequence, its locally correct comparison
   sequence, and the precise target prime-index sum.
2. A table of actually justified Type I and candidate Type II inputs,
   giving factor ranges, coefficient classes, interval restrictions and
   errors. Mark each input PROVEN, imported with its hypotheses, or OPEN.
3. A proved implication from those inputs to a positive prime count,
   including a certified margin and all auxiliary hypotheses. Select the
   weight after doing this budget. Hη and W⁺ remain useful diagnostics.
4. One explicitly isolated missing estimate with a quantitative statement
   of what improvement would close the chosen bound. The first joint
   least-prime-factor and second-moment attempts are executed in
   [bilinear-fold-attack.md](bilinear-fold-attack.md); neither supplies it.

Failure to obtain a positive margin rejects that particular package of
inputs and weights; it does not reject the tile. Merely renaming the unknown
twin count is also a failed deliverable. A numerical experiment earns its
place only if it tests a mechanism proposed to establish the missing estimate.

Successful scales need only be unbounded. A proof of infinitude need not
control every phase, every zone, the global maximum gap, or the full
Hardy–Littlewood asymptotic. Working on long intervals preserves this freedom.
The input package and positive conditional payoff are specified; the missing
arithmetic estimate is still open. Neither this audit nor the specification
supplies an asymptotic twin-prime lower bound.
