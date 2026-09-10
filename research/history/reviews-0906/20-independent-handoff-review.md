# Independent handoff review: arithmetic retained, conclusions narrowed

Review of commit `9be041f`, 2026-09-06. Internal; publication moratorium
unchanged. This is a scoped mathematical review, not a certification of
the whole repository. No twin lower bound, new controlled rectangle or
new cancellation estimate is established.

## 1. Verdict

**DEFECTS FOUND in the consumer comparison, the full-corner summary and
the shrinking-margin deduction.** A further scope error concerns the
equal-frequency class in the signed-moment note. These affect the choice
of the next research question. They do not refute the grouped moment or
the fixed-margin regional reduction.

**NO DEFECT FOUND IN SCOPE** in the grouped-divisor moment, its classical
completion input, the full positive majorant, the uniform excluded-prime
mean, the orientation change for the prime-power moment, or the
four-cut separation. The six classical contributions from S to E_> were
not all independently re-proved in this pass. Accordingly this report
does not promote the complete reduction to a new end-to-end review grade.

## 2. Defects and their consequences

### F1. The cumulative margin is not strictly weaker

**DEFECT FOUND.** [consumer-comparison.md](../../consumer-comparison.md)
§2 items 2–3 and §4's P/P' and P0/T0 rows. The same inference appears in
TWIN-REDUCTION §2, RESEARCH-HANDOFF §3 and README Status.

Fix K>=0 and put w_j=2^j/j^K, a_j=S(2^j)>=0 and
A_j=sum_{i=j0}^j a_i. Then

\[
 \sum_{i=j_0}^j w_i=(2+o(1))w_j.
\]

For example, split at j/2. The early part divided by w_j tends to zero;
on the later part write i=j-r and use the summable majorant
2^K 2^{-r}, obtaining sum_{r>=0}2^{-r}=2 by dominated convergence.

If A_j>=c w_j infinitely often, it is impossible that a_i<c w_i/4
eventually: summing that bound gives A_j< (c/2+o(1))w_j, plus a fixed
initial contribution. Thus a_i>=c w_i/4 infinitely often. Conversely
a_j>=c w_j infinitely often implies A_j>=c w_j on those indices.

Consequently the two existential positive-constant consumers are
**equivalent at the same fixed K**, with a possible change of constant
and witnessing scales. The reduction's O_H errors transfer both ways by
choosing fixed H>K. The fixed initial blocks and the shift by 2 cost
only negligible errors. This proof uses the actual nonnegative S, not
an assumption that E_dagger is nonnegative.

At K=0 a cumulative lower bound at every sufficiently large scale
implies the unbounded-scale dyadic consumer. The converse need not imply
an eventual cumulative lower bound: positive blocks can be separated by
arbitrarily long gaps. If T0 means positivity along an unbounded set,
the two are equivalent. The original text mixed these quantifiers and
treated failure of subtracting a single upper bound as failure of the
implication.

**Consequence:** there is no cost-free weakening here. The cumulative
form remains a valid alternative formulation and can still be a more
convenient object to estimate. The asserted interval-transfer obligation
from Murty–Vatwani's cumulative lower bound is unnecessary for our
unbounded-scale consumer; it would matter for a bound on every dyadic
interval. External theorem statements are not altered by this finding.

### F2. The nonnegative prime-band form covers a subfamily

**DEFECT FOUND.** README Status, G2-STATE §0, RESEARCH-HANDOFF §§1,6,
and TWIN-REDUCTION §§1,4–5 describe the full corner as
sum mu(n)mu(n-2)L(n)L'(n-2), with L,L'>=0.

The owning argument [corner-correlation.md](../../corner-correlation.md)
§1.4 states a different, correct-scope identity:

\[
 R_{S_0}(x)=\sum_{n\in J_x} C^{S_0}_{U,V}(n)
                                C'^{S_0}_{Y,Z}(n-2).
\]

Only the k=r, t=r' prime-cofactor subfamily s=s'=1 has the asserted
Möbius-product form, up to its proper-square error. Even there the exact
weight is

\[
 L(n)=\sum_{r\mid n,\ r\ {m prime},\ r>V\atop D_1<n/r\le D_0}\log r,
\]

and similarly on the right. Replacing that cofactor window by the fixed
band (V,V x^(2eta_0)] is not an identity: near n=x/2 the upper allowed
prime is approximately half the endpoint at n=x. The later log-average
note itself prices that replacement as an uncontrolled signed error.

For general k=rs, t=r's', even on the squarefree class the weight has
the extra signs mu(k)mu(t). Outside that class, mu(d)mu(e) can be
nonzero while mu(n)mu(n-2)=0. In particular g=2 belongs to this omitted
class. There is no error estimate discarding it. The owning note
explicitly warns that it is not negligible.

**Consequence:** controlling the displayed nonnegative-weight
correlation does not by itself control the full corner. The one-sided
equivalence with the global margin applies to the full R_{S_0} with its
full complement hypothesis; it cannot be transferred to the subfamily
without additionally controlling all omitted branches. Review-request
§2 rank 5 needs this qualification. The endpoint reduction itself does
not discard these branches and is not refuted by this summary error.

### F3. A fixed-margin theorem does not justify a logarithmic-width corner

**DEFECTIVE DEDUCTION.** [reachability-coverage.md](../../reachability-coverage.md)
§2.5 and its ledger, reused by OUTCOMES and the later edge assessment.

The underlying estimates are O_epsilon(x^epsilon times the displayed
budgets); their proofs choose fixed epsilon,tau small compared with a
**fixed** margin eta. Setting eta=C loglog(x)/log(x) does not preserve
that reasoning. For every fixed epsilon>0,

\[
 x^{\epsilon-c\eta(x)}
       =x^\epsilon/(\log x)^{cC}\longrightarrow\infty.
\]

Choosing epsilon depending on x is also invalid without control of the
implicit constants. The completion, gcd sums and majorant all absorb
divisor factors using x^epsilon. A polylogarithmic replacement uniform
in the shrinking margins has not been supplied.

Thus the O(loglog x) by O(loglog x) box count is valid geometry for that
chosen window, **not a proved analytic remainder of the present bounds**.
This finding leaves every concrete fixed-margin cut defining E_dagger
intact. A uniform logarithmic-loss argument could repair the deduction;
this review supplies no such argument and asserts no impossibility.

There is also a quantifier qualification even at fixed margins. The set
S_0(eta) is unreachable at the **prescribed saving x^{-eta}**. Its
interior is not intrinsically unreachable at every positive saving:
with hypothetical uniform gamma=2 and p=q=eta>0, the zero/cross budgets
are 1-eta/2 and 1-2eta, so a smaller fixed saving is available. At
p=q=0 the zero budget remains exactly 1. The latter is the genuine
endpoint limitation of this budget list. “Equals one on the corner” is
false on a corner of positive width.

### F4. Lemma A does not bound the entire R=0 class

**DEFECT FOUND IN SCOPE CLAIM.** [signed-moment.md](../../signed-moment.md)
§2 after (4)–(5), its summary in OUTCOMES, and review-request §3 item 3.

Lemma A's nonnegative expression fixes u1=u2 and h1=h2. The grouped
moment's R=0 condition is h1/u1=h2/u2 and includes unequal pairs.
For instance u1=6,h1=3,u2=10,h2=5 are in common dyadic bands and give
R=3*5-5*3=0. Taking m1=m2=7 also satisfies both coprimality conditions.
These terms belong to piece (c), not to Lemma A's (a)+(b).

**Consequence:** the displayed lemma can be retained at its actual
scope, but “the whole R=0 class has been controlled” has not been proved
by it. This does not invalidate Lemma B's full-sum estimate or its
failure to add a region.

Two further proof-writing repairs are needed. Expanding Phi into four
pure exponentials loses the small factor f; it cannot simply be
“restored” after the geometric-series bound. For v<=1 it can be kept
by writing each endpoint difference as an integral of its derivative:
extract v(h/A) times a bounded m,u-dependent factor, then apply Abel
summation to (h/A)^2 on [A,2A]. This has bounded variation and recovers
f^2 with the same frequency-spacing bound. For v>=1 use the original
four exponentials and f=1. This repairs that step without changing the
lemma's exponents. Also, using the note's own orders, the ratio
(F^2*x)/(x log x) is M, not F^2~M log x. The exponent loss is still a.

### F5. The edge note retains a known prime-power error

**DEFECTIVE PROOF LINE, REPAIRABLE.** reachability-coverage §3.1 says
P^j>V, j>=2 forces P>sqrt(V). This is false for j>=3. Section 3.2 uses
the same cutoff argument. The later corner note already notices the
problem, but the earlier owning note was not repaired.

A short uniform repair is

\[
 \sum_{p^j>W,\ j\ge2}p^{-j}\ll W^{-1/2}.
\]

Split p at sqrt(W). Below it, the tail of powers for each prime is at
most 2/W and there are at most sqrt(W) bases. Above it, the tail is at
most 2/p^2; sum even over all integers. Counting multiples up to x
therefore costs O(x/sqrt(W)); the divisor multiplicities and logarithmic
weights add x^epsilon. This restores negligible bounds
O_epsilon(x^(22/25+epsilon)) and O_epsilon(x^(39/40+epsilon)) for V,Z.
It does not justify deleting the s,s'>1 prime-base branches in F2.

## 3. Decisive positive checks

| step | verdict | independently checked argument |
|---|---|---|
| grouped moment (4)–(12) | CHECKED | c=j ell1 ell2, R=h1 ell2-h2 ell1; gcd(theta R,c)<=2(R,j)(h1,ell1)(h2,ell2). For R!=0, j-average costs J tau(R); harmonic gcd averages cost A tau(ell). The Weil sum is N^3/J^(3/2), periods cost M per dyadic j-band. |
| equal frequencies | CHECKED | Write u_i=j ell_i and h_i=t ell_i with coprime ell_i. Counting j,t and primitive pairs gives O(NA log(2NA)); after coefficients and the m-sum this gives f^2 MN/A times logarithms. Unequal equal-frequency pairs are retained here. |
| interval completion | CHECKED | Remove complete c-periods, costing (M/c)(r,c). Complete the remaining interval; its Fourier L1 norm is O(c log(2c)), and the Weil gcd is at most (r,c). This gives sqrt(c(r,c))+(M/c)(r,c), up to logarithms/divisor losses. |
| paired variation | CHECKED | Phi=e(hz0/(gmu))(1-e(h(z-z0)/(gmu))); its size is O(f), derivative O(f(1+v)/M). Product variation is O(f^2(1+v)). |
| coefficient bound and benchmark | CHECKED | sum_{r|ell} Lambda(r)=log ell gives |A1|<=2 log ell, uniformly in divisor twist heights. First Cauchy yields budgets (1+a)/2, a/2+3b/2, a; at (delta,nu)=(2/5,2/5), these are 41/50,199/200,16/25. |
| right prime-power orientation | CHECKED | Exchange the expanded left and right divisor, change sigma, and use native endpoints z0,z instead of z0-2,z-2. The completed numerator changes sign only; gcds and variation bounds are unchanged. The other coefficient is arbitrary, including even reduced indices. |
| first branch | CHECKED | Replacing base D by D/P in prime-power (13) gives D^(5/4)R^(1/2)P^(-1/4); R<=PW and P<=W bound this by D^(5/4)W^(3/4). Prime-set cuts depend on that base, not the variable being completed. |
| full positive majorant | CHECKED | endpoint-pairing (12)–(13) counts divisors of k and k-2 and sums (1+|k-z|/w)^(-2). k=0,2 contribute nothing since original expanded divisors exceed 2. For 1<=w<=x and fixed epsilon<1 the tails are O(w x^epsilon). No paired factor is applied to the positive error. |
| four intersecting cuts | CHECKED | Work box by box; a box meeting the new cut has fixed slack up to absolute dyadic factors. Four truncated Perron integrals produce separate twists and logarithmic integration cost. Thresholds are at most x^(49/20), height x^10 and unaggregated mass O(x^2 log^C x), giving separation error O(x^(2+49/20-10)log^C x). Density is treated before twisting on intervals in d. |
| excluded-prime mean | CHECKED conditional on classical quantitative Mertens | mu 1_(n,m)=1 = mu*h_m. Splitting h at sqrt(t) gives t log^(1-A)x+t^(3/4)m^(1/100); t>=x^(6/25)/O(1), m<=x^2 leave x^(-1/25) relative saving. Partial summation consumes only fixed logarithmic powers. |
| sufficient margin | CHECKED conditional on the full reduction | Choose H>K, absorb its error and O(sqrt(x)log^3 x) proper-prime-power pairs, then divide by log^2 x. No fixed H is replaced by an x-dependent one. |

These checks discharge review-request §3 items 1,4,5,6,7 at the stated
scope. For item 6 the completion estimate was independently re-derived,
not every line of the earlier pilot note. Item 3 is partially checked
with F4's corrections. Other obligations remain as listed below.

## 4. Imported inputs and validation

Primary source opened during this review:
[Pascadi, Geometric and Functional Analysis, published 21 August 2026](https://link.springer.com/article/10.1007/s00039-026-00746-0),
Lemmas 3.2 and 3.3. They bound the Ramanujan sum by gcd(n,c) and the
Kloosterman sum by c^{o(1)}sqrt(c gcd(m,n,c)), for every positive integer
modulus and integer numerators. Composite moduli, nonprimitive
numerators, negative signs and the zero Fourier mode are within scope.
No newer bilinear theorem from that paper is imported. Its Weil-bound
proof is cited there to Iwaniec–Kowalski Corollary 11.12 and was not
independently proved here.

The classical quantitative Möbius mean is retained as an input from
signed-divisor-grouping (4), not source-reviewed again. No claim in this
report about a negative literature search is based on a fresh search.

Re-run for finite consistency: prime-detection-validation.js,
grouped-divisor-validation.js and corner-correlation-validation.js.
These are the existing producers, not independent implementations.
Their finite successes do not validate asymptotic estimates. In
particular the corner validator deliberately uses proxy windows; its
negative control that keeps only s=s'=1 tests exactly F2's discarded
branches, not their asymptotic mass at the actual cutoffs.

Repository checks: qc.js --index --strict, qc/selftest.js and
audit-numbers.js. Execution outcomes are recorded in the live review
index after completion. No output is hand-pasted into this report.

## 5. What was not checked

- A fresh line-by-line derivation of all S-to-E_> contributions, including
  the full Möbius BV derivation and the polylog transfer outside its density
  mean. The former review grades remain historical evidence.
- The sharp asymptotic constants claimed for corner absolute mass; in
  particular n<=x versus J_x, cofactor clipping, and the phrase “one top
  dyadic box” need care. They are not needed for F1–F4.
- The complete logarithmic-Chowla transfer, Pilatte rate calculation,
  all direct Bettin–Chandee prices, or conditional-source hypotheses.
- A full CRT/density/cut reduction for Heath–Brown pieces. Its
  free-cofactor requirement is correct for the current unweighted CRT
  template; this does not exclude other representations or summation
  across identity pieces. The random-coefficient ceiling remains a
  heuristic and cannot exclude arbitrary-coefficient research.
- Asymptotic cancellation in the full corner, its complement, or the
  original pre-second-decomposition bilinear remainder.

## 6. Recommended next decision

**Assessment, not theorem:** retain the regional estimates as reusable
work, but do not adopt “nothing cheaper is left” as a mathematical
conclusion. The record contains failed interfaces and useful reductions,
not an exhaustive proof that the remaining choices are impossible.

First integrate F1–F5 across the owning notes and live summaries, keeping
the exact full-corner object and fixed-margin quantifiers. Finish the
remaining review obligations in a short dependency checklist instead of
another generation of summaries. Success means one auditable reduction
with no unlisted hypotheses; it does not move the twin margin.

After that, a new arithmetic attempt should begin with one explicitly
stated estimate for the original bilinear remainder or full corner,
its actual coefficients, and a deduction of its global payoff. The
Heath–Brown Type I/II classification is already recorded; repeating it
is not such an estimate. Another rectangle or a larger finite census
does not qualify without a new mechanism and a specified consumer.

If no such input can be formulated, park new work on item C and choose
a bounded proof-completion task, such as item W's outstanding source
review of the two-class lower-bound adaptation. That is a different
goal from proving twins and should be chosen as such.
