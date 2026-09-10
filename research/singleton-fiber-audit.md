# Singleton fibers: both signs have mass beyond the target scale

<!-- ledger
id: Q-singleton-fiber-audit
status: ANSWERED
todo: C
parity: Classical prime BV, PNT and the Mobius mean estimate give lower bounds on each sign's singleton mass, using an explicit subfamily of determinant-2 solutions. This refutes O(x) control of the ungrouped negative singleton mass, not cancellation of the signed remainder or any universal method on exact residues.
question: Can the one-point fibers of the coupled remainder be discarded or controlled in absolute value at scale x, and what do the actual weights and archived intervals show?
verdict: The grouped coefficient is zero whenever either integer is prime. Each sign's ungrouped singleton mass is at least c*x*log(x) eventually for an absolute c>0, by a written derivation from named classical inputs. Finite full-interval and archived-prefix checks validate the partition. The signed singleton and longer-fiber contributions remain OPEN; no twin lower bound or novelty is claimed.
-->

Internal research, 2026-09-05. **The required signed estimate remains OPEN.**
The result here closes an absolute-value treatment of the singleton family.
It does not estimate its signed difference. Definitions and the conditional
twin payoff are in [shifted-prime-decomposition.md](shifted-prime-decomposition.md)
and [prime-detection-spec.md](prime-detection-spec.md). The companion
[validator](singleton-fiber-validation.js) reuses existing inputs as documented
in [data-reuse-audit.md](data-reuse-audit.md).

## 1. Partition and a data-selection identity

Keep J_x=(x/2,x]∩Z, U=V=⌊x^(6/25)⌋, Y=Z=⌊x^(1/20)⌋ and
β_W(m)=Σ_{r|m,r>W}Λ(r). For fixed k>V and v>Z let

$$
 I_{k,v}=\{(d,e)\in\mathbb N^2:d>U,\ e>Y,\ dk-ev=2,\ dk\in J_x\}.
                                                               \tag{1}
$$

The cardinality includes solutions with zero Möbius or β weight. It is
not the number of nonzero terms. Put R=R₁+R_{≥2}, partitioning the actual
remainder by |I_{k,v}|=1 and |I_{k,v}|≥2, and define

$$
 P_1=\sum_{|I_{k,v}|=1}\ \sum_{(d,e)\in I_{k,v}}
        1_{\mu(d)\mu(e)=1}\beta_V(k)\beta_Z(v),\qquad
 N_1=\sum_{|I_{k,v}|=1}\ \sum_{(d,e)\in I_{k,v}}
        1_{\mu(d)\mu(e)=-1}\beta_V(k)\beta_Z(v).
                                                               \tag{2}
$$

Thus R₁=P₁−N₁ and its ungrouped absolute mass is A₁=P₁+N₁. On a nonempty
fiber, g=gcd(k,v) divides 2 and its solutions are spaced by v/g in d.
Its real interval has length at most xg/(2kv). In particular **kv>x
implies |I_{k,v}|=1**. The converse is not needed or asserted.

There is also an exact regrouping, for any cutoffs A,B≥1:

$$
 C_{A,B}(n)=\sum_{d>A,\ k>B\atop dk=n}\mu(d)\beta_B(k),\qquad
 R(x)=\sum_{n\in J_x}C_{U,V}(n)C_{Y,Z}(n-2).                    \tag{3}
$$

For a prime p the only factorizations have d=1 or k=1, so C_{A,B}(p)=0.
Consequently the summand in (3) vanishes whenever **either** n or n−2
is prime. The nonzero support is among pairs of composites, including
proper prime powers. A saved twin list therefore samples zero coefficients
of R. It can measure the separate prime detector S, but it does not supply
R by summing over that list. This is an algebraic support statement, not
a claim that primes are irrelevant to the asymptotic identity
S(x)=C₂x+R(x)+o(x).

## 2. Statement and imported inputs

**Derived:** there are constants c>0 and x₀ such that, for every x≥x₀
with the prescribed cutoffs,

$$
                         P_1(x)\ge c x\log x,\qquad
                         N_1(x)\ge c x\log x.                  \tag{4}
$$

No effective onset x₀ is calculated. This derivation imports classical
theorems and has been checked here; it is not independently refereed.
No novelty claim is made.

We use prime Bombieri–Vinogradov in the form

$$
 \sum_{q\le K^{1/2}/\log^{B_A}K}\max_{(a,q)=1}
 \left|\sum_{m\le K\atop m\equiv a\ (q)}\Lambda(m)
                         -{K\over\varphi(q)}\right|
                  \ll_A K/\log^A K.                            \tag{5}
$$

The prime BV input is [Tao, Notes 3, Theorem 17](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/),
with the usual PNT replacement of its primitive-class mean. We also use
PNT and Σ_{n≤t}μ(n)=o(t); the latter follows already from the q=1 case of
[Tao, Notes 2, Exercise 66](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/).
Only these named inputs are imported. The restricted-pair count, witness
construction and parameter accounting below are derived here.

For fixed m, the Möbius estimate implies
Σ_{n≤t,(n,m)=1}μ(n)=o(t). One verification is the convolution whose
Dirichlet series is ζ(s)^{-1}∏_{p|m}(1−p^{-s})^{-1}. Its second factor
has coefficients 1 on integers supported on the finite prime set dividing
m, and their reciprocal sum is finite. Divide the convolution sum by t
and apply dominated convergence. Subtracting endpoints gives the same
estimate on (t,2t]. No uniformity for growing m is imported this way.

## 3. Each Möbius sign occupies a positive proportion of divisor pairs

Let G be the pairs d∈(U,2U], e∈(Y,2Y] that are odd, squarefree and
coprime, and let G_σ impose μ(d)μ(e)=σ for σ=±1. We show

$$
                         |G_+|,|G_-|\gg UY.                    \tag{6}
$$

There are UY/4+O(U+Y+1) odd pairs. A bad pair has p²|d, p²|e or
p|gcd(d,e) for an odd prime p. Counting each event gives a union bound
with main term at most

$$
 {3UY\over4}\sum_{p>2}{1\over p^2}< {3UY\over16},\qquad
 \sum_{p>2}p^{-2}\le\sum_{j\ge1}(2j+1)^{-2}
           <\sum_{j\ge1}{1\over4j(j+1)}={1\over4}.             \tag{7}
$$

The square-divisibility counting errors are
O(Y√U+U√Y+U+Y+√U+√Y); the common-prime error is
O((U+Y)log(2Y)+Y), since a common prime is at most 2Y. All are o(UY)
for our U and Y. Thus |G|≥UY/16+o(UY), and ≥UY/32 eventually.

To separate signs, set

$$
 T=\sum_{U<d\le2U,\ Y<e\le2Y\atop d,e\text{ odd},\ (d,e)=1}
                   \mu(d)\mu(e).
$$

First require only that no prime p≤P divide both d and e, with P fixed.
For each e the d sum excludes a subset of the fixed primes ≤P and the
prime 2. There are finitely many such restrictions. The preceding fixed-m
Möbius mean estimate gives o_P(UY) after summing over e. Removing pairs
sharing a prime p>P changes the sum by at most

$$
 O\left(UY\sum_{p>P}p^{-2}+(U+Y)\log(2Y)+Y\right)
                         =O(UY/P)+o(UY).
$$

Let x tend to infinity first and then P tend to infinity. This proves
T=o(UY). Squareful pairs have zero weight, so T=|G_+|−|G_-|. Combining
with the lower bound on |G| proves (6); conservatively each sign has
at least UY/128 pairs eventually. In particular

$$
 \sum_{(d,e)\in G_\sigma}{1\over d\varphi(e)}\ge {1\over512}
                 \quad\text{eventually},                      \tag{8}
$$

because dφ(e)≤4UY. The fixed-P argument is not a growing-modulus
Möbius correlation theorem: the uncontrolled large common primes were
bounded by their summable density.

## 4. A singleton witness with enough actual β weight

Take (d,e)∈G_σ, a prime k∈(x/(2d),x/d], and put v=(dk−2)/e when this
is integral. For sufficiently large x these variables meet all four
cutoffs. Here k is odd, v is odd and

$$
 \beta_V(k)=\log k,\qquad
 kv={n(n-2)\over de}\gg {x^2\over UY}\asymp x^{171/100}>x,
                       \quad n=dk\in J_x.                      \tag{9}
$$

Every such solution is a singleton of the full fiber, with sign σ.
Retain from β_Z(v) just the prime divisors ℓ in
x^(1/10)<ℓ≤x^(1/5). Eventually ℓ>2Y, so

$$
                 \beta_Z(v)\ge
                 \sum_{x^{1/10}<\ell\le x^{1/5}\atop
                       \ell\text{ prime},\ \ell\mid v}\log\ell.
                                                               \tag{10}
$$

For fixed d,e,ℓ, the condition eℓ|dk−2 is impossible if ℓ|d and
otherwise is the primitive progression k≡2d^{-1} mod eℓ. Both eℓ and d
are odd and coprime. Multiple ℓ dividing one v contribute distinct
additive terms of β_Z(v); they do not count the entire β weight twice.

Use (5) at K=x/d and K/2. The parameters satisfy

$$
 K\asymp x^{19/25},\qquad q=e\ell\le2Yx^{1/5}\ll x^{1/4},
            \qquad \sqrt K\asymp x^{19/50}.                    \tag{11}
$$

The power margin absorbs every fixed logarithmic loss. For a fixed d,
each modulus q has at most one representation eℓ in these ranges:
two distinct primes ℓ,ℓ'>2Y would force ℓ'|e≤2Y. Thus summing progression
errors over the selected e,ℓ with coefficient log ℓ costs at most
O_A(K/log^(A−1)x). The sign selection in G_σ does not change this bound.
Summing d∈(U,2U] gives O_A(x/log^(A−1)x).

BV counts Λ, whereas k must be prime for the witness. Subtract proper
prime powers. At any modulus their Λ mass is at most O(√K log²K).
There are O(x^(1/4)) moduli for each of O(U) values of d, and the extra
ℓ weight is at most log x. A deliberately loose total bound is

$$
 O\bigl(x^{6/25+1/4+19/50}\log^3x\bigr)
               =O(x^{87/100}\log^3x)=o(x\log x).                \tag{12}
$$

The resulting lower bound on the singleton mass of sign σ is

$$
 {x\over2}\sum_{(d,e)\in G_\sigma}{1\over d\varphi(e)}
       \sum_{x^{1/10}<\ell\le x^{1/5}\atop
                    \ell\text{ prime},\ \ell\nmid d}
                  {\log\ell\over\ell-1}+o(x\log x).           \tag{13}
$$

PNT and partial summation make the inner sum (1/10+o(1))log x.
Excluding ℓ|d costs at most O(log d/x^(1/10)) uniformly over these d,
so it is at least (1/20)log x eventually. Combining with (8) proves (4).
For example c=1/40960 is a nonoptimized choice after absorbing the
o(x log x) error; no practical threshold for this constant is asserted.

This proof uses an average over primitive prime progressions to build a
positive witness. It has not estimated the original β-weighted, signed
Möbius correlation by BV.

## 5. Finite checks, including the terms omitted asymptotically

These are **measurements**, not evidence for an asymptotic rate. The
validator checks its optimized divisor and β enumeration against the
defining sums in 2,555 integer/cutoff cases. It checks all determinant
solutions at x=256 against independently
grouped fibers, retaining zero coefficients in the geometry. It then
computes (3) independently of the singleton partition, and checks the
witness weight against a separate progression enumeration. At larger
sizes the weighted sums use compensated floating-point arithmetic, with
tolerance scaled to their absolute mass; integer counts are exact.

The full dyadic measurements use every integer in J_x:

| x | U=V | Y=Z | R₁/x | R_{≥2}/x | P₁/x | N₁/x |
|---|---:|---:|---:|---:|---:|---:|
| 16,384 | 10 | 1 | 2.067754 | −0.098151 | 50.215760 | 48.148007 |
| 65,536 | 14 | 1 | 0.159203 | −0.060664 | 79.350749 | 79.191546 |
| 262,144 | 19 | 1 | −1.771275 | 0.000501 | 128.302162 | 130.073438 |
| 1,048,576 | 27 | 2 | 3.015154 | 0.010144 | 162.394153 | 159.378999 |

The inner cutoff equals 1 in the first three runs and only 2 in the last.
These sizes do not justify dropping asymptotic remainders. To expose this,
the validator also computes S=ΣΛ(n)Λ(n−2) and
P=ΣC_{U,V}(n)Λ(n−2). Exactly S=(S−P)+(P−R)+R. For example, at x=262,144,
the normalized terms are respectively 0.358462, 2.064340 and −1.770774,
giving S/x=0.652028. Here P−R is the second Type I contribution and is
far from negligible. Replacing S−P by C₂x and P−R by zero at this x
would produce a false finite inference. The script's finite budgets keep
both terms; no fitted onset or claimed counterexample to an asymptotic
bound follows from this table.

The archived-prefix checks use the full dyadic definition to classify
fibers, even though only a prefix is measured. Their normalizations and
data lineage are in the companion audit. A small measured signed
longer-fiber contribution does not prove that family negligible either.

## 6. What is closed, and the next proof obligation

**Closed at this scope:** A₁=O(x), N₁=O(x), and treating singletons as
an o(x) *absolute* error are false by (4). Dropping all positive singleton
terms and bounding all negative ones separately cannot give the required
scale-x lower bound. This conclusion concerns the ungrouped masses (2),
with all prescribed cutoffs and β weights, for all sufficiently large x.

**Still open:** cancellation in R₁=P₁−N₁, control of R_{≥2}, their joint
one-sided estimate, and the sufficient dyadic scale average. Singletons
have no within-fiber cancellation; any useful cancellation involving them
must combine different fibers or cancel against the rest of R. The result
does not exclude grouping before taking absolute values or a different
decomposition. A crude O(x log⁴x) bound on the total absolute mass is
available, but has no saving at scale x: |C_{A,B}(n)| and its ungrouped
absolute mass are at most τ(n)log n. The hyperbola inequality
τ(n)≤2Σ_{d≤√x,d|n}1 reduces Σ_{n∈J_x}τ(n)τ(n−2) to divisor pairs
d,e≤√x. Their simultaneous congruences require gcd(d,e)|2 and have at
most x*gcd(d,e)/(de)+1 solutions. Summing gives O(x log²x), and the
two β weights add at most log²x. This also bounds the longer-fiber family
in absolute value; no sharper sufficient bound is established for it.

The signed grouping first move is now completed in
[signed-divisor-grouping.md](signed-divisor-grouping.md). The subfamily
de≤x^(7/10) cancels to O_H(x/log^H x) for every H, despite both of its
signs having the large masses proved here. The remaining product region
has an explicit signed CRT endpoint error to estimate. That note owns
the next move and its use of the retained factors; the full singleton
difference and longer-fiber sum are not settled by the partial result.

Falsifiers for (4) are a sign-density error, a nonprimitive witness
progression, duplicate modulus weight not covered by (5), a failed prime
power budget, or a witness outside the full singleton family. The written
proof checks these asymptotic issues; the independent finite checks test
the algebra and enumeration. Neither those checks nor the corpus gate
certifies the open signed estimate.
