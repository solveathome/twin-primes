# The corner and logarithmically averaged correlation theorems

<!-- ledger
id: Q-corner-log-average
status: PARTIAL
todo: C
parity: Exact divisibility, CRT counting and partial summation audit named correlation-theorem interfaces. Imported analytic theorems are not reproved. Failure of a direct application or an absolute error budget is not a universal impossibility claim. The full corner and its sufficient margin remain OPEN.
question: What do logarithmically averaged correlation theorems and their quantitative successors actually supply for the prime-cofactor corner weight, with exact support, rates and scale quantifiers?
verdict: The pure band is invariant under dilation by primes outside it; the exact cofactor window is not, but its support extends to x^(1-2eta) and need not leave the window under a fixed dilation. Uniform-prefix logarithmic bounds imply block bounds by Abel summation; a relative exponent above 3 is one sufficient route to o(x), not a universal necessary threshold. Pilatte's 1/(96e) calculation applies only to his displayed parameter choice. A bounded multiplicative Fourier lift now gives a small continuous scale-average log saving for the prime-cofactor subfamily via Tao-Teravainen v2; see prime-band-transfer.md. No o(x), dyadic pointwise estimate, full-corner estimate or positive twin margin follows.
-->

**Twin-prime infinitude and the sufficient signed margin remain OPEN.**
The previous assessment overstated support, transfer barriers and rate
necessity. [Readiness review F6–F7](history/reviews-0906/21-readiness-review.md)
supplies the corrections; [prime-band-transfer.md](prime-band-transfer.md)
owns the resulting weaker arithmetic transfer. Nothing here changes a
controlled region or the full endpoint remainder.

## 1. Objects and support

Use the exact floors and weights L_w,L'_w of
[corner-correlation (5)](corner-correlation.md). These represent only the
s=s'=1 prime-cofactor subfamily, up to its proper-square error. The full
corner is that note's C(n)C'(n-2) sum, including all other branches.

For a pure band B=(V,V*x^(2eta)], let L_b(n)=sum_(p|n,p in B) log p.
For every prime q outside B, L_b(qn)=L_b(n), exactly. For the window,
a term p*d is retained when D1<d<=D0, and is retained after dilation
by q when D1/q<d<=D0/q. The common interval (D1,D0/q] is nonempty
for every fixed q at sufficiently large x. Thus **not every support
point leaves the window**. The lower support can be near x^(1-2eta),
not a constant multiple of x. Boundary discrepancies still need a bound.

For mu, the additional identity is
mu(qn)=-mu(n)1_(q does not divide n). In the two-point product the
exception is q|n(n-2); this is a support correction, not an estimate
for the full weighted correlation.

## 2. Unsigned masses and the window swap

At fixed eta, the top-block pure-band mass is
2*eta^2*x*log^2 x+o_eta(x log x). The unsigned product-weight swap cost is

    sum_(n in J_x) |L_b(n)L'_b(n-2)-L_w(n)L'_w(n-2)|
      = 2*eta*(1-log 2)*x*log x + o_eta(x log x).

The proof in review F6 uses CRT with all clipping intervals retained and
quantitative PNT. The integral is a **natural** average: using the
harmonic average of log(x/n) gives the wrong leading constant. These
formulas do not include mu^2 restrictions. A large unsigned cost does
not give a lower bound for the signed swap error.

With bands pinned at x, the full logarithmic mass has order
Theta_eta(log^3 x). The same CRT main term is not valid on every
smaller block. For the lower bound it suffices to use y>=x^rho with
rho>29/100+4eta; for the upper bound use L_b,L'_b<=log x.
No sharp uniform eta dependence is asserted for that full average.

An O_eta(x log x) swap is too costly for an o(x) target, but is affordable
for a normalized relative log saving smaller than one log power. The
latter distinction is used in prime-band-transfer §3. A moving band is
not exactly dilation invariant; that fact alone does not prohibit other
representations or signed estimates.

## 3. Rates and quantifiers

Put T_x(y)=sum_(n<=y) a_x(n)/n for a family pinned at x. If
sup_(y<=x)|T_x(y)|<=E_x, Abel summation gives
|sum_(n in J_x)a_x(n)|<=4xE_x. A bound only at y=x does not suffice.
Against an envelope of order log^3 x, a uniform-prefix bound
O(log^(3-c)x) with c>3 is sufficient for o(x). So is o(1) at the
borderline. These are sufficient conditions for this conversion, not
necessary conditions for the one-sided consumer or all scale-average
arguments. A qualitative logarithmic theorem alone supplies no useful
pointwise dyadic improvement at this normalization.

The elementary witness a_x(n)=1_(n in J_x) shows the worst-case loss of
one logarithm between normalized logarithmic and natural averages.
It does not rule out a better conversion for an arithmetic family with
additional structure. Continuous scale integrals do not automatically
bound a prescribed discrete dyadic sequence.

## 4. Source interfaces and a corrected open route

[Tao v4](https://arxiv.org/pdf/1509.05422v4) uses bounded multiplicative
functions with fixed affine parameters; its Proposition 2.2 convolution
reduction and Lemma 2.5 have their stated cutoffs. Substituting a growing
prime cofactor into a fixed-parameter theorem is unjustified.
[Helfgott–Radziwill v2](https://arxiv.org/pdf/2103.06853v2) and
[Pilatte v3](https://arxiv.org/pdf/2310.19357v3) give quantitative
Liouville results; their statements are not automatically weighted
Möbius theorems. The earlier four-source search was not exhaustive.

Pilatte's Lemma 2.3(d), with the specific choice log x=(log H)^6 in §2.3,
gives an optimistic exponent c0/12, with
c0=t^2 log(1/(2t)). Its unrestricted maximum is 1/(96e). The exponential
O(J) factor is an additional bound cost. This calculation neither
specifies the theorem's c nor bounds every possible variant of the
method; changing the x,H relation changes the denominator.

**Nonmultiplicativity of mu L_b does not close the route.**
[prime-band-transfer.md](prime-band-transfer.md) represents it exactly
by an integrable Fourier superposition of bounded multiplicative
functions mu(n) exp(it L_b(n)/log X). Their non-pretentiousness survives
uniformly because changing prime values in a fixed exponent band changes
the squared distance by O(1). The non-pretentious case of
[Tao–Teravainen v2, Theorem 3.1](https://arxiv.org/html/2512.01739v2)
then supplies a continuous scale-average saving. Tonelli handles the
parameter integral, and an explicitly priced mesh handles moving
cofactor windows. The achieved normalization remains too weak for o(x),
and the other full-corner branches remain unestimated.

No universal absence of a suitable theorem is claimed. Revisit a source
only for a changed coefficient class, rate, scale quantifier or proof
step. A generic repeat of the older direct substitutions adds nothing.

## 5. Validation scope

[corner-log-average-validation.js](corner-log-average-validation.js)
retains the original finite proxy measurements and their bound output.
Its T1–T3 divisibility checks and T5 worst-case witness remain useful.
T4's old edge predictor is a diagnostic, not the corrected natural-average
constant or an asymptotic test. T6 checks arithmetic for one parameter
choice only. The script's finite proxies are not the fixed-eta asymptotic
regime. [agent-readiness-validation.js](agent-readiness-validation.js)
adds active controls for the support and representation corrections.
Neither producer proves an analytic rate or a twin lower bound.
