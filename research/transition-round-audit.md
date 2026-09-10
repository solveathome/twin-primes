# Review of the completed transition research

<!-- ledger
id: Q-transition-round-audit
status: ANSWERED
todo: C
parity: Review of exact identities, inference scopes and primary theorem statements. The sharp mean-square imports remain imports. Counterexamples disprove specific algebraic or logical claims, not arithmetic cancellation or a proof method in general. No signed estimate or twin lower bound is obtained.
question: Which conclusions of the completed transition round survive direct review, which require correction, and what research decisions remain justified?
verdict: The sharp upper norms and sufficiently-small-fixed-eta lower norms survive. The integration contained substantive errors: an omitted lower cutoff, an incorrect Mellin formula for the transition, a conflation of singleton divisor fibers with long cofactor fibers, an unpriced source representation and overbroad closures of joint or cutoff arguments. Owning notes and current records are corrected. No signed improvement or sufficient twin margin is established; the corrected cofactor and joint-correlation interfaces remain open.
-->

**No signed improvement or twin-prime proof survives from this round because
none was derived.** The core energy argument survives this review. Several
conclusions about what cannot work do not. They have been corrected in the
owning notes, rather than retained as competing assessments.

Reviewed return: `cb957a1`, against mathematical baseline `0292082` and
execution specification `cb51292`. Scope: all four returned reports, their
integration, all four validators, the decisive owning energy derivations,
and the cited theorem statements. Agreement between reports and passing
finite checks are not independent evidence for an asymptotic estimate.

## 1. Dispositions that affect the next move

| Finding | Disposition | Consequence |
|---|---|---|
| Sharp upper norms and small-fixed-eta lower norms | Retained with their imported inputs and original quantifiers | A negligible transition in L2 is ruled out in that eta range; signed cancellation is not |
| Transition kernel written using rho without the lower cut | Incorrect; use tau(d)=rho(d)1_(D<d<z) | The validator used tau already and did not check the displayed formula |
| Fixed-(d,e) singleton fibers described as the same fact as fixed-(k,v) fibers | Incorrect | The cofactor progression can be long; singleton geometry does not close its cancellation problem |
| An absolutely integrable Mellin kernel asserted for the transition | Incorrect; the kernel supplied rho, not tau | Restoring the sharp subtraction introduces a 1/s tail; the stated separation cost is withdrawn |
| Theta's three-term identity treated as a full normalized theorem representation for T | Not established | Outer prime-power sums, affine coefficients, sharp terms and their costs remain to be matched |
| Moving-cutoff argument declared unable to improve any joint budget | Too broad | Only average, triangle inequality, then Cauchy is saturated; signed cutoff estimates remain open |
| R_00 declared to need its own signed saving under any grouping | False inference from its coefficient being 1 | Joint cancellation can avoid separate bounds; the required quantity is the complete signed margin |
| Proper-power cost O(x^(79/80+epsilon)) | Valid but weaker than existing support argument | Reuse O(x^(39/40+epsilon)) for R_11's proper-power remainder |
| Input M described as a fully quantified sufficient twin input | Incomplete global budget | Separate the local R_11 hypothesis from mixed/outside hypotheses on the same scales |

## 2. The lower cutoff changes both the kernel and Mellin analysis

For each side put L=log(z/D), with integer D<z. The smoothing weight is
rho=1 below D, log(z/d)/L on (D,z), and zero above z. The transition
weight is

\[
 \tau(d)=\rho(d)-1_{d\le D}=\rho(d)1_{D<d<z}.
\]

Thus the cofactor kernel must be

\[
 \Phi(k,v)=\sum_{\substack{dk\in J_x\\v\mid dk-2}}
 \mu(d)\mu((dk-2)/v)\tau_L(d)\tau_R((dk-2)/v).
\]

The returned signed validator's `rhoT` implemented this correctly. A formula
using unrestricted rho computes a different sum. The new targeted validator
finds changed coefficients when the missing cut is restored.

For c>0, elementary Mellin inversion of y^s/s^2 gives

\[
 \frac{1}{2\pi i}\int_{(c)}d^{-s}\frac{z^s-D^s}{Ls^2}\,ds
 =\frac{(\log(z/d))_+-(\log(D/d))_+}{L}=\rho(d).
\]

It does not give tau. For d different from D, the kernel for tau is

\[
 K(s)=\frac{z^s-D^s}{Ls^2}-\frac{D^s}{s}.
\]

At d=D the symmetric Perron limit leaves a half-weight; subtract an
additional half there to obtain the defined zero value. At fixed c,
K(c+it)=-D^(c+it)/(c+it)+O_(D,z,c)(t^-2), so its absolute integral over
an infinite vertical line diverges logarithmically. Finite truncation is
possible, but requires a height, endpoint conventions, truncation errors
and costs for the theorem to which it is applied. This is a defect in the
claimed cheap representation, not a theorem that Mellin methods cannot work.

## 3. Two different fiber geometries

For fixed admissible d,e, existence forces gcd(d,e) to divide 2. Their
common progression in n has step lcm(d,e)>=de/2. The lower band product
is x^(171/100-4eta+o(1)), so eventually the step exceeds |J_x|=x/2.
This is a valid singleton statement.

For fixed k,v, put g=gcd(k,v). When g divides 2, set k'=k/g,v'=v/g,
choose c_0 as the least positive representative of
(2/g)(k')^(-1) modulo v', and c_1=(kc_0-2)/v. Then

\[
 d=c_0+v't,\qquad e=c_1+k't.
\]

Use the intersection of **all** inequalities dk in J_x, D_L<d<z_L and
D_R<e<z_R as the integer set of t. Its cardinality is at most

\[
 \frac{gx}{2kv}+1\le\frac{x}{kv}+1
 \ll x^{71/100-2\eta}+1.
\]

There is no uniform positive lower bound after clipping. The raw n-interval
can have length on the order of x/(kv), and intersecting bands may retain
many points, one point, or none. The previous comparison x/(2k)<v' was in
the wrong direction at the stated scales. The two orientations partition
the same sum differently; they do not have equal fiber lengths.

Finite fixtures exercise both gcd branches: the cofactor fibers have 11
and 7 points, yet all 18 corresponding fixed-divisor fibers are singletons.
These are algebraic controls, not asymptotic data at the campaign exponents.

## 4. What the source checks actually establish

The exact identities
Theta=(Lambda_z-Lambda_D)/L-M(.,D) and
T(n)=sum_(r|n,r>W)Lambda(r)Theta(n/r) are retained. The scalar coefficient
mass 1+2/L belongs to Theta's formal three-term expansion. It is not the
cost of representing T in a theorem's bounded function class.

The primary-source recheck gives these narrower conclusions:

- Goldston–Yildirim III, (8.1), (8.2), Theorem 8.1, treats products of
  Lambda_R(n+j). Its displayed product-of-levels error is insufficient
  at the raw transition levels. But T also contains M and the outer r,r'
  sums: n/r and (n-2)/r' become affine forms, not just n and n-2. The
  substitution into the theorem was incomplete. An upper error budget
  larger than x is not a lower bound for the actual remainder.
  [Primary paper](https://arxiv.org/pdf/math/0209102).
- GKM Theorem 1.3 contains **both** the lcm main-form asymptotic (1.14)
  and the finite band moment (1.15), the latter explicitly requiring
  R^(2k)<=x. That range citation in the return was correct; it must not
  be attached to all of the theorem or paper. Neither statement is a
  signed two-point estimate for T. [Primary paper](https://arxiv.org/html/1606.06781v4).
- Topacogullari Theorems 1.1–1.2 and Drappeau Theorem 1.5 concern specified
  divisor-function correlations. They do not directly allow arbitrary
  Mobius-weighted divisor bands. This does not exhaust their methods,
  and a blanket modulus ceiling of x^(1/2) is not a valid summary of
  these papers. [Topacogullari](https://arxiv.org/pdf/1605.02364),
  [Drappeau](https://arxiv.org/pdf/1504.05549).
- MRT Theorem 1.6 averages shifts, has bounded functions and an explicit
  dependence on the affine-coefficient bound A. It does not supply the
  prescribed cofactor residues without additional work. Its displayed
  (log X)^(-1/3000) term must be multiplied by the **actual** representation
  and parameter costs. Mass one times that term tends to zero; the
  integration's claim of a deficit for every mass at least one was false.
  No such bounded representation for full T was supplied.
  [Primary paper](https://arxiv.org/html/1503.05121v3).

The fixed-shift counterexample with g_2=lambda and g_1(n)=lambda(n-2)
for n>=3 is retained: the product is identically one. It refutes a
uniform bound against an arbitrary second factor. It does not prove
that every possible proof must use a particular structure in both factors.

## 5. Scope of the norm obstruction and the joint consumer

The exact identities T_i=<G_i^(S)> and R_cor=Phi(D_L,D_R) survive, as
does R_11 being a mixed cutoff difference. Minkowski gives

\[
 \langle\|G_L^{(S)}\|\rangle\langle\|G_R^{(T)}\|\rangle
 \ge \|T_L\|\|T_R\|.
\]

This constrains that particular output, not a signed estimate before
triangle/Cauchy. Nor does it compare every new numerical bound with the
existing upper constant 2B eta: inequalities between exact norms need
not order two different upper bounds.

For a safe explicit lower constant, write T=P+(Q-C_tilde). The owning
prime lower bound gives ||P||^2 >= (L_0 w eta/16)x log^2 x, while
||Q-C_tilde||=o_eta(sqrt(x)log x). For sufficiently large x the latter
norm is at most half the former. Therefore

\[
 \|T_i\|^2\ge (L_0w_i\eta/64)x\log^2x
\]

for fixed 0<eta<eta_0. This pays the remainder before assigning a
constant; the qualitative Theta_eta result is unchanged.

A proposed uniform window bound Sigma_(D,S](N)<=theta(S)N can be capped
at theta_eff=min(theta,4B), since summing |M(m,S)-M(m,D)|^2 over m<=N gives at most 4BN.
Only with a bounded majorant or uniform integrability does smallness outside
a vanishing fraction force the average of sqrt(theta) to vanish. A
restricted-range source requires pricing its missing range; an upper bound
for that range is not evidence that its true contribution has that size.

Finally R_00's coefficient being one does not make separate control
necessary. Already for scalar factors (a,b,c,d)=(1,-1,1,0), the four
products ac,bc,ad,bd sum to zero while ac=1. This refutes the proposed
algebraic necessity, without claiming cancellation for the arithmetic
coefficients. Current separate upper budgets do not close the consumer;
joint one-sided estimates remain admissible.

Input M is now explicitly local: R_11^(PP)>=-Ax on an unbounded dyadic
set for a fixed A>=0. To imply twins through the separate-budget template,
one also needs B_mix>=-F_mix and E_out>=-F_out on that same set, with
Ax+F_mix+F_out<=C_2x-2cx/log^K x for fixed c,K>0 and error exponent H>K.
A joint or admissible averaged estimate can replace this template.

## 6. Other corrections and limits

The proper-power support argument from corner-correlation section 1.1
already yields O_epsilon(x^(39/40+epsilon)) for any R_11 term containing
T^Q: use |T_i|,|T_i^Q|<=tau(n)log n and the support count
O(x W_i^(-1/2)). The returned Cauchy estimate with exponent 79/80 was
valid but weaker. This is reuse, not a new prime-power theorem.

The proposed cross-prime support interval is only an enclosing interval;
arithmetic zeros and integer endpoints can shrink it. A positive prefix
Gram sum would not imply positive dyadic differences. The validator gives
M(.,2)M(.,13) prefix sums 1 at 8 and 0 at 16; their difference is negative.
This fixture does not meet the corner's prime hypotheses. The needed
question concerns the actual shifted dyadic interval and those hypotheses.
The unretained positivity probe in the return is not used as evidence.
S(z,z)=1 shows localization, not the impossibility of sharper short-window
bounds. That closure is withdrawn.

The DBT volume is 66, not 166; its publisher confirms the citation.
[Publication record](https://londmathsoc.onlinelibrary.wiley.com/doi/abs/10.1112/mtk.12021).
The constants B, eta_0 and the onset are not numerically extracted here.
That does not establish ineffectivity. No attempt was made to reproduce
all imported proofs or to claim exhaustive coverage of the literature.

## 7. Verification and next research decision

[transition-round-audit-validation.js](transition-round-audit-validation.js)
contains active controls for the missing cut, Mellin ramp, both fiber
orientations, clipping, component cancellation and prefix/dyadic inference.
The four returned validators still pass their own tests; the new controls
explain why that was insufficient. The owning notes and current registers
carry these corrections; Git retains the original return.

Validation completed on 2026-09-06: the four returned validators and the
new audit validator pass. The strict consistency gate reports zero findings;
its self-test exercises 58 known defects and 47 clean controls. The full
numerical audit passes 251/251 checks. The source validator gained a
mass-one rate control; its output and readings were regenerated with the
repository embed tool. The signed validator's gcd control is now labeled
cofactor-pair, matching the variables it actually tests. These gates support
reproducibility and consistency,
not the truth of an asymptotic claim.

The next bounded attempt should keep the signs **before** Cauchy, using
either the correctly clipped cofactor average or the joint cutoff
correlation. First write an exact theorem interface with variable
coefficients, prescribed residues, endpoint errors and total normalization.
Then attempt a signed estimate that feeds a common-scale joint budget.
This is a research judgment, not evidence that such an estimate is near.
A norm refinement may still be useful for supporting estimates, but its
proved saturation prevents it alone from supplying the missing signed gain.
