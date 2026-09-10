# Review and integration of the research returns

<!-- ledger
id: Q-research-round-validation
status: ANSWERED
todo: C
parity: Independent proof and source review at the stated scopes. Regional estimates, exact identities, rational certificates, finite checks and sufficient open margins are distinguished. No universal parity obstruction or sufficient twin-prime estimate is asserted.
question: Which submitted results from lanes A, A2, B, C, D, E, V and W survive direct review, and what can be integrated or used to choose the next attempt?
verdict: Reviewed incoming commits 07ab47f through 46fa948 on 2026-09-09. A's truncation and A2's repaired low Type I estimate are accepted with bookkeeping corrections. B's ordinary-BV family identity survives; its uniform Dickman constant and complement condition are repaired. C's norm obstruction survives on all smooth inputs, but low nonzero Fourier modes are also 1-bounded. D's block estimate and fourth residual cut survive; its next moment saving is 7/200, not 17/200. E's rough-product distribution and aggregate constant 4 are accepted at the stated Wu uniformity reading; rational certificates close the two displayed tests for every fixed u>4. W remains OCR-only at the original 1974 theorem page. All sufficient twin-prime margins remain OPEN.
-->

**Twin-prime infinitude and all sufficient signed margins remain OPEN.**
This review covers the second dispatch from 1285d47 through its closeout
46fa948, including the corrections and second-reader returns. The incoming
state is preserved in Git. Owning lane notes contain the current proofs;
[OUTCOMES.md](OUTCOMES.md) records reusable results, failed steps and
reopening conditions. No novelty claim is made for this integration.

## 1. Current dispositions

| Lane | Accepted at stated scope | Remaining limitation |
|---|---|---|
| [A](centered-discrepancy-estimate.md) | D_y=D^(e_1)+O_(A,eps)(x/log^A x) | D^(e_1) has no sufficient signed bound |
| [A2](fixed-endpoint-discrepancy.md) | Repaired low Type I estimate; S=C2*x+B+O_A(x/log^A x) | Exact B, the Type II plus band sum, remains unestimated |
| [B](joint-factor-estimate.md) | Family identity R_F=C2*x*H_delta-Z_F^p+o_delta(x), using ordinary BV at all moduli | Separate-sign sieve bound is insufficient; the complement is unpaid |
| [C](full-coefficient-average.md) | Exact Fourier lift and norm >=(log x)^(2/5) for 1-bounded representations on all smooth inputs | No matched filtered correlation rate; some nonzero modes satisfy the unit-disc condition |
| [D](structured-dispersion-estimate.md) | Lemma H, (D1), additional region and fourth simultaneous residual cut | Target box exponent 407/400>1; no global signed margin |
| [E](fold-arithmetic-bridge.md) | Rough-product BV and aggregate constant 4 at the stated source reading; certified all-depth failure of the two displayed tests | Cov_u, Dec_1 and better joint contamination estimates remain OPEN |
| [V/W](history/reviews-0907/12-halberstam-richert-second-access.md) | Source-custody distinctions and existing finite measurement corrections | Original H–R theorem page unread; constants and onset unpriced |

The analytic statements below were checked from their arguments, not
accepted from prior grades or repeated reviewer agreement. Deep external
theorems remain named dependencies; this is not a proof audit of every
historical note in the repository.

## 2. A: original failed steps and current scope

The original endpoint replacement n>=e_1*m by n>e_1*m loses the
n=15 atom at x=16,e_1=3,m=5. Odd square divisors must be retained after
removing powers of two. The reciprocal-totient local factor is (p-1)/p,
with coprimality still present, not its reciprocal. These are real
defects in the first argument, not counterexamples to the truncation.
Section 3a of the owning note repairs them; section 7 below records the
reviewed analytic chain. The undefined old H_band interface is withdrawn.

## 3. C: representation and transfer are different obligations

Rounded cutoffs require w_i=log(a_i)/log x and w'_i=log(b_i)/log x in
the Fourier profile. The fixed-exponent proxy is a measurement of a
different finite function. The exact identity with these moving endpoints
has uniformly summable coefficients.

Unweighted cancellation does not transfer through an arithmetic envelope:
a=(1,-1), w=(2,1) gives sum a=0 but sum wa=1. The composite filter is
not multiplicative, since it vanishes at primes p,q>W but not at pq.
Its exact expansion reintroduces the prime-pair sum. This invalidates
that direct transfer, not every possible joint Fourier estimate.

The unit-disc rejection of every nonzero mode was false. At p<=W_i,
|G_(i,k,u)(p^v)|=2|sin(pi k log p/(2log x))|<=1 if
|k|log W_i/log x<=1/3; at larger primes its modulus is one. Thus at
least k=0,±1 on the left and l=0,±1,...,±6 on the right qualify for
every real Mellin twist. This does not check their other correlation
hypotheses or supply the required filtered o(x/log^2 x) rate. Only an
upper bound O(x/log^2 x), not a matching asymptotic, is used for the
unfiltered rough-pair count.

## 4. E: finite evidence versus all-depth inequalities

The parity-table identity is exact, including its denominator-free form
at S=0. The pair (125,127) on (64,128] survives y=4 with both parities
odd but is not a twin pair. The safe no-three-factor cutoff on a dyadic
interval is (2X+2)^(1/3).

The original grid did not prove an all-depth statement. The current
Proposition 5 has an elementary analytic bound whose five pieces are
certified with directed rational logarithms in the integration validator.
Its upper bounds are below 1 for Q_cov and below 4 for c*_real, with
positive slack. Its sub-2 conclusion holds on (4,4.8] and (8,infinity).
The stronger sub-2 observation throughout the intervening interval is
still only measured. These close the two displayed tests with aggregate
constant 4, not the decorrelation hypotheses or every improved consumer.

## 5. V/W: source and retained-data custody

[Report 10](history/reviews-0907/10-independent-review-0908.md) supplies
finite tolerances and the CRT representative repair. The shared M
columns in the retained D_y and shifted-prime JSONs agree within their
recorded floating-point tolerance. The S/x and D_y comparisons remain
finite measurements; no asymptotic conclusion follows from them. Pooled
random-control results do not bound each omitted control separately.

[Report 11](history/reviews-0907/11-two-class-theorem2c-source-review.md)
and [report 12](history/reviews-0907/12-halberstam-richert-second-access.md)
separate published statements, same-author secondary page readings and
OCR-only evidence for H–R 1974 Theorem 2.2. The substitution matches the
reported OCR hypotheses, but that does not certify the original page or
Lemma 2.2 behind its Remark. The thirteen access attempts are a retained
worker report, not thirteen fetches repeated in this review. The manuscript
already marks the source OCR ONLY; retain that limitation. The asserted
onset with constants set to one is not an effective threshold.

## 6. Validation and limits

[research-round-validation.js](research-round-validation.js) retains the
endpoint, local-factor, rounded-profile, weighted-transfer and dyadic
parity controls; reads the existing JSONs; and adds exact rational
checks of D's exponent target, B's uniform constant, C's low-mode
condition, A2's density/consumer logic and E's five-piece inequalities.
It also independently recomputes the C norm witnesses. The q=1 Mobius
mean values are finite consistency checks, not tests of an asymptotic rate.

The six lane validators and this integration validator are bounded checks.
Their invocation and output hashes belong to their embedded OUTPUT blocks.
No census producer, random-control regeneration or Lean build is run by this
review. Required combined gates are strict QC with indexes, QC self-tests,
audit-numbers and git diff --check. Their final execution record is in the
CHANGELOG. Green mechanical checks do not certify the analytic corpus.

## 7. A: reviewed truncation chain

The review reconstructs the prefix version (BV*) by a logarithmic mesh
from [Tao Notes 3, Theorem 17](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/),
re-read on 2026-09-09. The fixed power margin absorbs all logarithmic
rounding and multiplicity costs. The square-divisor and coprimality
tails (3a.10)–(3a.11), c(q)<=tau(q)^3, and Cauchy against the tau^6
moment are sufficient.

For the main term, the corrected weight has series H_(b,g)(s)/zeta(1+s).
Its coefficients eta satisfy sum |eta(k)|sqrt(k)<<tau(g)^2 uniformly
in b. Convolution with the q=1 Mobius means gives P_0=o(log^-A u) at
that cost and P_1=-H_(b,g)(0)+O_A(tau(g)^2log^-A u). These means follow
by partial summation and Abel limits from [Tao Notes 2, Exercises 64 and 66](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/),
re-read at their statements. Untwisted Abel summation over the clipped
length completes (3a.16).

Bookkeeping repaired: M=x/floor(x^(.5+eps))<=2x^(.5-eps), not the
unrounded bound with constant one; the last term of (3a.13) costs
log^(L+3)x, not log^(L+2)x. Fixed power slack absorbs both corrections.
The truncation and its arbitrary fixed logarithmic precision survive.

## 8. C: growing norm obstruction checked

For r=35m the equal-prime profile produces
F_r=sum_j(-1)^j C(r,j)chi(35j/r-11). Fourth differences isolate the
junction at 12m; the limiting binomial ratio 12/23 gives the nonzero
constant -22957/18515. The main binomial coefficient grows with entropy
H(12/35)>.92. Taking r proportional to log log x and using primes in
[P,2P] with P=x^(.7/r) makes the profile perturbation tend to zero.
This supplies actual smooth inputs with |F_L|>=(log x)^(2/5) for all
sufficiently large x, as detailed in Proposition 6.5.

Any representation by functions bounded by one on every such input has
coefficient norm at least that supremum. This is the missing growing
witness, and is stronger than the earlier single finite norm example.
It does not rule out density-one representations, explicitly paid growing
components or an estimate treating the coefficient sum jointly.

## 9. B: ordinary BV repair and constant range

The right short approximant has nonsquarefree moduli, so Wu's
squarefree-weighted lemma cannot evaluate its entire Type I term.
Ordinary BV at each cofactor length Y=x/m>=sqrt x does: moduli are at
most W_R^2<=x^.1, below sqrt(Y/2) by a fixed power. Prime-power removal,
two prefixes and a mesh for the variable log weight are affordable at
arbitrary fixed logarithmic precision. The family has bounded harmonic
mass for each fixed delta, so the errors sum to o_delta(x). The Mobius
density constant and its local exclusions give the stated family identity.

The imported 24/22! Dickman error was specialized to delta=1/100.
For all 0<delta<1/50 the proof instead gives
E_delta<=(b/delta)D(a/delta)<=12D(11)<=12/11!<1/1000.
This still yields 1+H_delta<31/100 and the insufficient coefficient
1+H_delta-(40/9)H_delta^+<-2/5. The failure survives even with pair
constant 2. These are bounds on the proposed lower-bound coefficient,
not an upper bound proving the actual family count negative.

A positive family bound must also pay B_L^comp on the same scales.
The owning note now states that complement inequality. A generic o(x)
claim for all bounded coefficients without a main term is removed;
positive coefficients need not cancel. Exact Type I reassembly alone
adds no estimate, but does not exclude a useful signed family inequality.

## 10. D: completion, structure and the exact residual cut

The review checks Lemma H by counting h-pairs in a progression modulo
lcm(d_2,p^i), including zero numerators and the branch p|ell_1. The
geometric-mean step and divisor sums give the displayed harmonic gcd
bound. Keeping q outside the first Cauchy leaves e-pairs with the same
prime-power factor, rather than discarding that structure.

The completed phase has c=q*j*ell_1*ell_2 and
R=h_1*ell_2-h_2*ell_1. The nonzero-R j-sum, ell-sum, zero term and
complete-period term give (D1). Completion (7) was rederived by splitting
full periods (Ramanujan bound) and the finite Fourier remainder (Weil
bound and the logarithmic Fourier l1 cost). The imported bounds are
[Pascadi Lemmas 3.2–3.3](https://link.springer.com/article/10.1007/s00039-026-00746-0),
read in the primary text for all integer numerators and positive moduli.
The separate coefficients and gcd branches required from endpoint-fourier
(4)–(9) were also checked. The q=1 remnant of the power-of-two branch
uses the existing grouped bound, not a prime-power lemma with q=1.

The fourth condition removes C' only after intersection with the three
existing complement conditions. Its eight inclusion-exclusion terms have
separable monomial Perron factors; the untwisted density at each fixed e
uses a clipped interval in d and the uniform excluded-prime Mobius lemma.
The fixed slack pays the Perron and dyadic logarithms. This accepts the
additional domain cut, not a sign comparison between two residuals.

At the target sector the moment exponent is 57/40, the Cauchy-factor
exponent 61/100, and their half-sum 407/400. For a block saving the
moment must fall below 139/100: the missing exponent is 7/200. The
j^(-3/2) factor pays that gap once j>x^(7/300+epsilon), with fixed
positive epsilon. The small-gcd range remains open. The returned
59/40, 17/200 and 17/300 misstated this target; they are corrected in
the owning note and handoff. This does not control the full target box,
corner or global residual, or improve the uniform product threshold 19/25.

## 11. E: imported sieve scope and certificate

Wu, [arXiv:0705.1652v1](https://arxiv.org/pdf/0705.1652v1), printed page 6,
was re-read at the rendered page on 2026-09-09; PDF SHA-256
`41d432dd63da6d1fe7836ba3beda8b601ce6e64420e50501d26d79f7d971043e`.
Lemma 2.3 has the weight mu(q)^2*3^nu(q), so only squarefree moduli are
controlled. Proposition 3 uses that scope correctly. Its passage from
the distinct-prime-weighted convolution to set_k pays repeated-prime
terms; three uses of the lemma handle the moving endpoints. The
coefficient-uniform reading for bounded f is explicit in the note;
the original Pan–Ding proof was not independently read in this review.

Lemma 2.2 supplies an order-one, level-Q upper sieve. Applying it to the
aggregate set_k-2 gives 4D_k(u) after summing tuples. It does not give
constant 4 uniformly for each cofactor tuple. Keep an additive
O_(A,k,u)(X/log^A X) in the cardinality form, including k=u where D_k=0.
The two ratio tests need only the aggregate statement, so this correction
does not reopen those tests. Section 4a's rational certificate establishes
their all-depth failure with the standard linear-sieve functions.

## 12. A2: independent reading of the repaired Type I estimate

The original bound e[r,g]<=e_0UV is false: at x=2^16,e=g=209,r=1 it
gives 43681>1908. The corrected proof truncates g<=G=(log x)^(A+13).
The body then lies below x^(1/2-eps'/3)G. On the progression side,
(r,g)=sum_(d|(r,g))phi(d) yields the tail x log^12 x/G. On the density
side, the same divisor sums with phi denominators give
x log^11 x (log log x)^2/G. Both are affordable.

The full local density is 1_((r,e)=1)/(e phi(r)), including repeated
powers in r. Its local exponent at p|e,p|r is v_p(r)+1. The main term
uses A's mean at (b,g)=(k,e), uniformly in the varying excluded primes.
The multiplicity bound tau(q)^4 and tau^8/phi sum cost log^256 and
are paid by the arbitrary BV precision. The repaired argument survives.

Two bookkeeping fixes matter for the written quantifiers: the weighted
triple count costs log^2 before the log^2 error weight, giving log^4,
and delta=1/100 in the divisor-bound estimate handles the power-of-two
atom for every 0<eps'<1/2. Neither changes the conclusion.

### 12a. Current consumer after the repair

S=C2*x+B+O_A(x/log^A x) is now accepted. The stronger D margin is
B+2C2*M>=-4x/25+o(x). It implies B>=-(C2-1/200)x+o(x) using the
squarefree upper bound for M; the converse does not follow. The exact
clipped endpoints keep the ±1 atoms. Statement (4.9) is a stronger
sufficient all-modulus input for the band, not a necessary condition.
For an elementary size comparison B=O(x log^5 x) suffices; the reported
O(x log^4 x) was not justified by Brun–Titchmarsh on every divisor class.
No sufficient signed bound for B has been supplied.

## 13. Integrated research decision

A/A2 reduce an exact representation; B evaluates a linear family part;
C limits a particular representation strategy; D adds a controlled region;
E rules out two explicit sufficient tests. These are different statements
with different gaps. Calling all of them the same bilinear theorem would
lose the coefficients and quantifiers needed for a useful next attempt.

The most concrete next local obligation is D's remaining small-gcd
moment saving greater than 7/200 at the target sector, with every
separation cost included. This is a research-priority judgment, not a
claim that it is necessary for twins or likely to succeed. It requires
a source/structure check before new analysis or compute, and success at
that box would still leave a global complement. The independent alternative
is a one-sided bound for the actual B of A2 with its fixed parameters.
B/C/E can be reopened by a matched rate, different consumer or a precise
correctness concern; their scoped failures are not universal exclusions.

No new agents, scheduled jobs, long runs or publication actions are started
by this integration. Current priorities and ownership live in
[RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md) and [../TODO.md](../TODO.md).
