# Research handoff: current proof status and the next obligations

> Public mirror edition: repository-internal working instructions were removed. See MIRROR.md.

<!-- ledger
id: Q-research-handoff
status: ANSWERED
todo: C
parity: Consolidates the existing arithmetic reduction, classical grouped moment and open signed remainder. No new arithmetic estimate is asserted. Limits of arbitrary-coefficient bounds are scoped to those bounds; no universal parity obstruction or necessity of a particular cancellation mechanism is claimed.
question: What must an incoming research agent understand, verify and return before its work can advance the current twin-prime argument?
verdict: Current handoff after the 2026-09-09 independent review of the dispatch ending at 46fa948. The full residual has four simultaneous complement conditions after D's regional estimate. A's centered truncation and A2's repaired low Type I estimate give the alternative S=C2*x+B+O_A(x/log^A x). B and all sufficient signed margins remain OPEN. The C3 absolute bound, family identities and scoped C/E failures retain their owning hypotheses. Execution is owned by RESEARCH-EXECUTION.md.
-->

**Twin-prime infinitude remains OPEN. No demonstrated path from the current
estimates to a full proof has been established.** Current integration: 2026-09-09, reviewing the dispatch through 46fa948.
Check intervening Git changes before reuse.

This file owns the mathematical contract. [AGENT-START.md](AGENT-START.md)
owns onboarding; [RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md) owns the
assignment board, reviewed dispositions and integration workflow. Detailed proofs stay
in their owning notes. The earlier transition round is completed and
reviewed in [transition-round-audit.md](transition-round-audit.md).

## 1. Assessment to preserve in every report

The current formulations expose a signed arithmetic estimate that remains
unproved. A new representation, an absolute O(x) bound, an improved local
rectangle or a conditional sufficient statement is not that estimate.

| Reusable result | Exact limit | Owning argument |
|---|---|---|
| Complete smooth Vaughan reduction | No signed lower margin | [global-cutoff-averaging.md](global-cutoff-averaging.md) |
| Full absolute O(x) for a C3 profile | Implied constant does not establish the needed signed comparison; not transferred to the older linear taper | [global-smooth-majorant.md](global-smooth-majorant.md) |
| Small-prime tail and factor-family budgets | Fixed-cutoff tail does not automatically pay a shrinking logarithmic margin; complement essential | [smooth-sieve-literature.md](smooth-sieve-literature.md), [paired-factor-budget.md](paired-factor-budget.md) |
| Classical Dickman evaluation and full algebraic completion | Separate-sign bound insufficient; reassembly returns the original remainder | [supported-coefficient-dickman.md](supported-coefficient-dickman.md), [joint-correction-source-audit.md](joint-correction-source-audit.md) |
| Moving-endpoint repair and centered tolerance | Actual prime/Mobius discrepancy estimate OPEN | [moving-cutoff-parity.md](moving-cutoff-parity.md) |
| Grouped and structured divisor moments | Four-condition residual domain; no global signed margin | [grouped-divisor-moment.md](grouped-divisor-moment.md), [structured-dispersion-estimate.md](structured-dispersion-estimate.md) |
| Centered truncation and low Type I evaluation | Exact B remains without a sufficient signed bound | [centered-discrepancy-estimate.md](centered-discrepancy-estimate.md), [fixed-endpoint-discrepancy.md](fixed-endpoint-discrepancy.md) |
| Growing polylogarithmic cofactor transfer | Rate weaker than o(x); both mixed tails and outside remainder remain | [cofactor-progression-transfer.md](cofactor-progression-transfer.md) |

All are subject to their named hypotheses and proof checks. An ANSWERED
ledger question can contain an OPEN target. A failed estimate closes only
its stated scope. Exact residue arrangements are not universally
parity-blind; a claimed obstruction needs its own method and quantifiers.

No completion percentage, success probability, effective onset or proof
date is established. The assessment changes only with a checked correction,
additional arithmetic estimate or justified payoff.

## 2. Read in this order, then open the owning arguments

Follow [AGENT-START.md](AGENT-START.md), read section 3 here, then the owning
notes and OUTCOMES/QUESTIONS entries for the chosen lane. Read
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md) before searching.
[README.md](README.md) is the question router.

For the centered route, start with moving-cutoff-parity; for the smooth
route, start with global-smooth-majorant and joint-correction-source-audit.
For the regional route, read sections 4–5 here and
[TWIN-REDUCTION.md](TWIN-REDUCTION.md), including its review-state table,
then the cited moment/endpoint proofs. No worker needs the entire corpus
as an undifferentiated first read.

The [integration review](research-round-validation.md) accepts the
centered truncation, repaired Type I term and additional regional cut,
and corrects C's low-mode scope and E's aggregate sieve statement.
All lane returns are present. Sections 3–5 below use the reviewed current
definitions; the board is a completed dispatch with candidate next steps.

## 3. Exact target and remaining object

Throughout x=2^j tends to infinity and J_x=(x/2,x] intersected with the
integers. The Mobius function is mu, the von Mangoldt function is Lambda,
and C2=product over p>2 of (1-1/(p-1)^2) is the positive twin constant.
Set

\[
 U=V=\lfloor x^{6/25}\rfloor,\quad Y=Z=\lfloor x^{1/20}\rfloor,
 \quad D_0=\left\lfloor\frac{x}{V+1}\right\rfloor,
 \quad E_0=\left\lfloor\frac{x-2}{Z+1}\right\rfloor.
\]

The underlying arithmetic residual, before the controlled cuts, is

\[
 R(x)=\sum_{\substack{d>U,\ k>V,\ e>Y,\ t>Z\\
                      dk-et=2,\ dk\in J_x}}
       \mu(d)\mu(e)\beta_V(k)\beta_Z(t),\qquad
 \beta_W(k)=\sum_{r\mid k,\ r>W}\Lambda(r).
\]

All four variables are positive integers. The beta weights are
nonnegative, at most log k, and zero for k<=W. They are not arbitrary
bounded multiplicative functions. In the original divisor domain
U<d<=D0, Y<e<=E0, define W_dagger by the four simultaneous conditions

\[
 de>\lfloor x^{3/4}\rfloor,\qquad
 d^5e^2>\lfloor x^{49/20}\rfloor,\qquad
  \bigl(d>\lfloor x^{151/200}\rfloor\ \text{or}\quad
       de^3>\lfloor x^{321/200}\rfloor\bigr),
\]
\[
 \bigl(d>\lfloor x^{141/200}\rfloor\ \text{or}\quad
       de^3>\lfloor x^{1631/1000}\rfloor\ \text{or}\quad
       de\le\lfloor x^{77/100}\rfloor\bigr).
\]

The fourth condition is the cut of
[structured-dispersion-estimate.md (10)–(12)](structured-dispersion-estimate.md),
added alongside the third on 2026-09-08 after two readings; it removes
the strip delta<=141/200, delta+3nu<=1631/1000, delta+nu>=77/100 and
changes only the summation domain.

E_dagger is the exact weighted compatible CRT endpoint sum in
[residual-coverage.md (16)](residual-coverage.md), with W_* replaced by
W_dagger, as specified in [grouped-divisor-moment.md (19)](grouped-divisor-moment.md).
Its small-factor weights, logarithmic weights, compatibility tests and
endpoint convention are part of the definition. It is not an unweighted
count of remaining divisor pairs. Incompatible congruences contribute
zero. The sawtooth convention includes psi(integer)=-1/2.

The current quantitative reduction is, for every fixed H>0,

\[
 S(x):=\sum_{n\in J_x}\Lambda(n)\Lambda(n-2)
      =C_2x+E_\dagger(x)+O_H(x/\log^H x).
\]

The previous E_>, E_* and the three-condition version of E_dagger differ
from this four-condition E_dagger by errors with this same
arbitrary fixed logarithmic precision. They are distinct exact sums;
their sufficient consumers transfer, not their literal domains.

**Sufficient, OPEN:** fixed c0>0 and K>=0 such that

\[
 C_2x+E_\dagger(x)\ge c_0x/(\log x)^K
       \quad\text{on an unbounded set of dyadic }x.
\]

Choose fixed H>K. Subtract the O(sqrt(x)*log^3 x) contribution with a
proper prime power on either side. Eventually on those scales, actual
prime pairs number at least (c0/2)*x/log^(K+2) x, so this condition
implies infinitude. It is sufficient, not asserted necessary for twins.
The reduction does not permit H or K to grow with x.

Alternatively, for fixed K>0 and fixed j0, it suffices to prove

\[
 \limsup_{J\to\infty}\frac{1}{J-j_0+1}
 \sum_{j=j_0}^{J}(\log 2^j)^K
       \left(C_2+\frac{E_\dagger(2^j)}{2^j}\right)>0.
\]

This rescaled average is also OPEN. Averaging does not make a theorem
about fixed coefficients uniform in the growing coefficients here.

A third sufficient form, equivalent to the unbounded-scale dyadic one at
the same fixed K after allowing a different positive constant, follows by
summing the reduction over dyadic blocks: for fixed c_0, K>0,
2 C_2 2^j + sum_{i<=j} E_dagger(2^i) >= c_0 2^j / j^K on an unbounded set
of j. At K=0 this is positivity of Tao's delta_x along an unbounded set
of scales; the dictionary is
E_dagger(x)/x = C_2 (2 delta_x - delta_{x/2} - 1) + o(1), and the K>0
forms lie below the o(1) resolution of that normalisation
([consumer-comparison.md](consumer-comparison.md)). Also OPEN.

### Complete smooth alternative

With the fixed C3 profiles of
[global-smooth-majorant.md (1)–(3)](global-smooth-majorant.md), set

\[
 \widehat G_i(m)=\sum_{d\mid m}\mu(d)(1-\widehat\rho_i(d))
                       \beta_{W_i}(m/d),\qquad
 \widehat{\mathcal R}(x)=\sum_{n\in J_x}\widehat G_L(n)\widehat G_R(n-2).
\]

Here (a_L,b_L,W_L)=(floor(x^.22),floor(x^.24),floor(x^.24)) and
(a_R,b_R,W_R)=(floor(x^.04),floor(x^.05),floor(x^.05)).
The profile, not merely these endpoints, is part of the definition.

For every fixed H>0, S=C2*x+Rhat+O_H(x/log^H x) and
Rhat=E_dagger+O_H(x/log^H x). The same sufficient margins therefore
transfer to Rhat. The complete sum already includes the outside
arithmetic. Its absolute O(x) bound supplies no sufficient signed
constant; the older taper has its separate stated norm bound.

### Centered prime–Mobius alternative

Use standard Lambda, including proper prime powers. Set
y=ceil(x^(12/25)), Q=floor(x/y), f(n)=Lambda(n-2)mu(n),
and M(x)=sum over J_x of f(n). For odd e<=Q and x/2<=t<=x, define

\[
 \Delta_e(t)=\sum_{\substack{x/2<n\le t\\ e\mid n}}f(n)
       -\frac1{\varphi(e)}\sum_{x/2<n\le t}f(n),\qquad
 a_e=\max(x/2,ey),
\]
\[
 \mathcal D_y(x)=\sum_{\substack{e\le Q\\ e\ {\rm odd}}}\mu(e)
       \int_{(a_e,x]}\log(e/t)\,d\Delta_e(t).
\]

The integral is a finite atomic Stieltjes sum. The endpoint a_e is excluded.
The density subtraction uses an unknown total; it assumes no cancellation.

[moving-cutoff-parity.md (12)–(16)](moving-cutoff-parity.md) derives

\[
 S(x)=C_2x-2C_2M(x)+\mathcal D_y(x)+O_H(x/\log^H x).
\]

With A2=product over p>2 of (1-1/(p(p-1))), the squarefree density gives
M<=(A2/2)x+O_H(x/log^H x), and exact rational Euler-product bounds give
33/200<C2(1-A2)<21/125. Thus the **OPEN sufficient input**

\[
 \mathcal D_y(x)\ge -4x/25+o(x)
\]

on unbounded dyadic scales would give S>=x/200+o(x) and twin infinitude
after removing proper prime powers. This fixed-fraction target is an
alternative sufficient route, not claimed equivalent to the weaker
logarithmic margin above.

Q<=x^(13/25), but ordinary prime BV concerns a different sequence.
The prime twist, centering and moving endpoint all matter. Reviewed on
2026-09-08 ([centered-discrepancy-estimate.md](centered-discrepancy-estimate.md)
section 3a): for fixed 0<eps<1/50 and e_1=floor(x^(1/2+eps)),
D_y=D^(e_1)+O_(A,eps)(x/log^A x), where D^(e_1) restricts the sum to odd
e<e_1 with the fixed endpoint a_e=x/2. The OPEN sufficient input above is
therefore equivalent to D^(e_1)>=-4x/25+o(x). This is a truncation, not an
estimate: the moving endpoint acts only above e_1, and the signed
discrepancy of Lambda(n-2)mu(n) at odd moduli below x^(1/2+eps) is
untouched. Its split at x^(1/2-eps') is
[fixed-endpoint-discrepancy.md](fixed-endpoint-discrepancy.md):
S=C_2x+B+O_A(x/log^A x) with B the exact Mobius-weighted shifted-prime
bilinear remainder (2.9) there, unestimated. The below-level Type I term
is O_(A,eps')(x/log^A x), accepted after the 2026-09-09 independent
reading of its g-truncation repair. The body moduli are
x^(1/2-eps'/3)(log x)^(A+13); both tails and all multiplicity losses are paid.
The stronger centered input is B+2C2*M>=-4x/25+o(x); it implies,
but is not equivalent to, B>=-(C2-1/200)x+o(x). More generally the
one-sided B>=-(C2-c0)x+o(x), fixed c0>0 on unbounded dyadic scales,
is sufficient. None of these signed bounds has been proved.
D_y=B_L+2C2*M+O_H(x/log^H x), with B_L the full residual
in joint-correction-source-audit (12), so these formulations cannot be
counted as independent gains.

## 4. What the completed moment actually buys

For d~x^delta and e~x^nu, the limiting original domain is
delta in [6/25,19/25], nu in [1/20,19/20]. Expanded lengths satisfy
M<<x^a, N<<x^b, where a=delta+6/25 and b=nu+1/20; smaller expanded
boxes remain included.
The full convolution coefficients are (I an original divisor interval)

\[
 A_0^{(s)}(\ell)=\mu(\ell)\ell^{-s}1_I(\ell),
\]
\[
 A_1^{(s)}(\ell)=-\mu(\ell)\ell^{-s}1_I(\ell)\log\ell
 -\sum_{r\mid\ell,\ 2\le r\le W}
       \mu(\ell/r)(\ell/r)^{-s}1_I(\ell/r)\Lambda(r).
\]

For Re(s)>=0 they satisfy |A0|<=1, |A1|<=2log ell uniformly in Im(s),
with support below 2DW. The four products of A0,A1 retain the low,
squarefree, repeated-prime and prime-2 sectors. Use the right coefficient
b_u=A_right(gu), rather than replacing it by a squarefree-only model.

Let M,N,A>=1. For an integer subinterval I_m of (M,2M], h in a positive band H contained
in [A,2A], |b_u|<=B and |c_h|<=C/A with C fixed, define

\[
 \Phi_{u,h}(m)=e(hz'_0/(gmu))-e(hz'/(gmu)),\quad
 v_0=Ax/(MN),\quad f=\min(1,v_0),\quad e(y)=\exp(2\pi i y).
\]

Here g in {1,2}, theta=2/g in the application, |z0'|,|z'| and
|z'-z0'| are at most x. Native endpoints are x/2,z with z in [x/2,x]
and sigma=-1; reciprocal endpoints are x/2-2,z-2 with sigma=+1.
With inverse m modulo u,

\[
 \mathfrak M=\sum_{m\in I_m}\left|
   \sum_{u\sim N}b_u\sum_{h\in H}c_h1_{(m,u)=1}
       e(\sigma\theta h\bar m/u)\Phi_{u,h}(m)\right|^2
 \ll_\epsilon B^2x^\epsilon f^2
       [MN/A+(1+v_0)(N^3+M)].
\]

Lengths are polynomially bounded in x, with that power fixed.
On retained MN>x^(1-tau), A<=ceil(x^(2tau)*max(1,MN/x)), this gives
B²*x^epsilon*[x+x^(3tau)*(N³+M)]. First Cauchy costs at most
sqrt(M) times logarithms, yielding right block exponent budgets

\[
 (1+a)/2,\qquad a/2+3b/2,\qquad a.
\]

With a fixed strict margin, the combined controlled region is

\[
  \delta+\nu<19/25\quad\text{or}\quad5\delta+2\nu<123/50
 \quad\text{or}\quad
 (\delta<19/25\ \text{and}\ \delta+3\nu<161/100)
 \quad\text{or}\quad
 (\delta<71/100\ \text{and}\ \delta+3\nu<327/200).
\]

The fourth region is the strip of the structured block bound (D1),
[structured-dispersion-estimate.md](structured-dispersion-estimate.md),
read twice on 2026-09-08; it is a regional upper bound and changes no
signed claim.

The new benchmark delta=nu=2/5 has budgets 41/50,199/200,16/25.
Small losses must still be absorbed: this is not a final claim of an
exact O(x^(199/200)) remainder. The full majorant and density have
separate bounds. The concrete cuts defining W_dagger retain fixed
margins, floors, intersections and boundary strips.

**The uniform product threshold is unchanged:** every fixed exponent
below 19/25. The witness (delta,nu)=(8/25,11/25) has product exponent
19/25 but lies outside all four strict regions ((D1) gives 401/400 there). No larger uniform
product cutoff follows from these estimates. This does not establish
optimality. Shrinking the domain of a signed sum does not establish
monotonicity of its value or a positive twin margin.

## 5. The next local target, with the actual coefficient dependence

At (delta,nu)=(8/25,9/20), the expanded upper lengths are
M<<x^(14/25), N<<x^(1/2). The right budgets are
39/50,103/100,14/25; the older estimates do not fill this gap.
For each ordered pair set

\[
 j=(u_1,u_2),\quad u_i=j\ell_i,\quad(\ell_1,\ell_2)=1,
 \quad c=j\ell_1\ell_2,\quad R=h_1\ell_2-h_2\ell_1,
 \quad F(m)=\Phi_{u_1,h_1}(m)\overline{\Phi_{u_2,h_2}(m)}.
\]

Here R denotes the pair numerator, not the arithmetic residual R(x),
and c denotes the completion modulus, not the positive margin constant.
Integer R=0, all complete-period contributions, and nonzero pairs with
j>x^(1/20) are already controlled at this box. The latter have block
budget 397/400 before small losses. Nonzero R with c dividing theta*R
must retain its gcd loss; it is not a primitive oscillating phase.

The native-orientation target is the real signed ordered-pair sum

\[
 \mathcal X_{\rm small}=\sum_{\substack{u_i\sim N,\ h_i\in H\\
                      (u_1,u_2)\le x^{1/20},\ R\ne0}}
 b_{u_1}\overline{b_{u_2}}c_{h_1}\overline{c_{h_2}}
 \sum_{m\in I_m,(m,c)=1} e(-\theta R\bar m/c)F(m).
\]

**Sufficient for this rectangle, OPEN:** a one-sided bound
X_small<=C*x^(36/25-eta) for some fixed eta>0, uniformly over the
actual coefficient classes, support boxes, harmonic bands, endpoints
and required twists. It is real by conjugate interchange of the ordered
pairs; it is not asserted nonnegative. An absolute bound suffices but
is stronger. This target's contribution after first Cauchy has exponent
at most 1-eta/2 before logarithmic losses; the already controlled terms
retain their own budgets. The generic top moment exponent is 3/2, so a saving
strictly greater than 3/50 is needed. A hypothetical saving of exactly
3/50 leaves no fixed slack.

At the top transition band A~x^(3/50), j~J gives modulus c~x/J,
numerator scale O(x^(14/25)/J), and smooth-completion dual scale
c/M~x^(11/25)/J. Sharp intervals still have a full Fourier spectrum.
The completed weight depends on both (u_i,h_i). A bilinear theorem
for independent coefficient sequences is not applicable until that
dependence is separated with its norm and truncation costs included.
The literature audit supplies source interfaces, not a matched theorem
that already proves this target. Easier large-j ranges are not the gap.

### Structured fixed-q alternative at the same rectangle

The native ordered-u-pair target above remains valid. The newer method
of [structured-dispersion-estimate.md](structured-dispersion-estimate.md)
keeps the common right prime power q outside the first Cauchy. Its pair
gcd j_e is the gcd of e_1,e_2 after u_i=q e_i, distinct from the native
j=(u_1,u_2). At the top sector sigma=1/20, a=14/25, b=1/2,

    moment majorant: Q^(3/2)E^3 -> exponent 57/40;
    Cauchy factor: MQ -> exponent 61/100;
    resulting block: exponent 407/400.

Thus a bound for the actual nonzero-R small-j_e moment below
x^(139/100) with fixed slack would control this sector: the needed
saving is greater than 7/200. The factor j_e^(-3/2) already pays it for
j_e>x^(7/300+epsilon), fixed epsilon>0. No such improvement for the
remaining small-gcd range is proved. The original 3/50 target and this
7/200 target belong to different Cauchy arrangements; do not substitute
one exponent into the other's sum. The return's 17/200 and 17/300 were
arithmetic errors, corrected in the 2026-09-09 review.

Even proving this target controls only this rectangle. It does not
prove the sufficient global margin in §3.

## 6. Completed assignments and the next research specification

The current assignments are in
[RESEARCH-EXECUTION.md](RESEARCH-EXECUTION.md). The first priority is an
additional estimate for the centered discrepancy or the full signed
residual. Sections 4–5 retain a regional route; its required power saving
is not the logarithmic-rate target of the cofactor transfer.

[TRANSITION-RESEARCH-EXECUTION.md](TRANSITION-RESEARCH-EXECUTION.md) was
executed and reviewed in [transition-round-review.md](transition-round-review.md)
and [transition-round-audit.md](transition-round-audit.md). Do not reassign
completed source retrieval, generic completion, constant extraction,
upstream audits or fixed-band lifts without a specific concern or changed
hypothesis. Reviewable closures and reopen conditions are in OUTCOMES.

## 7. What every agent must return and record

Use the execution plan's report and review contract. State the exact result,
hypotheses, quantifiers, source versions, full error budget and global payoff.
Identify every open complement and any common-scale requirement. Return a
precise failed step when the estimate does not close.

Record reusable lemmas and failed steps together by question in
[OUTCOMES.md](OUTCOMES.md). One handler integrates shared registers, TODO,
generated indexes and current state after review. Workers own separate notes.
Git records revisions and authorship; there is no agent-class history.

Novelty checks precede original calculation. A potentially new deduction
gets proof checks and a targeted falsifier in the same pass. Bind computed
output using node research/qc/embed.js, and run appropriate validators.
The required integration gates are:

    node research/qc.js --index --strict
    node research/qc/selftest.js
    node research/audit-numbers.js