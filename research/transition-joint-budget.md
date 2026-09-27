# Joint budget for the four transition pieces

<!-- ledger
id: Q-transition-joint-budget
status: PARTIAL
todo: C
parity: Exact divisor algebra, the imported uniform truncated-Mobius mean square (de la Breteche-Dress-Tenenbaum) and the imported Graham/An mean square, together with Minkowski's integral inequality and the derived norm lower bound of sharp-corner-transition section 4. The negative below is scoped to one named mechanism (moving sharp cutoff followed by Cauchy) and to bounds that pass through the two one-point norms; no impossibility theorem for signed cancellation, no positive shift-2 correlation and no method-class obstruction is claimed. No consumer input is supplied.
question: Can the mixed and smoothed terms be handled jointly with the transition pair, and what complete inequality would make such an estimate useful for the twin consumer?
verdict: The exact split, cutoff-average identities and separate upper budgets survive. Averaging cutoff norms after triangle and Cauchy is saturated for sufficiently small fixed eta, but signed cutoff arguments and joint cancellation are not closed. R_00 need not be estimated separately under every grouping. The short-window constraint is corrected with a bounded majorant and a safely reduced lower constant. No consumer input or signed improvement is supplied; E_out and the sufficient twin margin remain OPEN.
-->

**The sufficient twin margin remains OPEN, and nothing below estimates
it.** The outside remainder E_out has no derived bound at all here beyond
the tautology inherited from S(x)>=0. The one analytic attempt made below
does not improve the joint budget; it is a scoped negative for a named
mechanism, and its own decisive input, the norm lower bound of
[sharp-corner-transition.md](sharp-corner-transition.md) section 4, is
retained at its stated scope by transition-round-audit.md. No novelty is claimed.

Baseline: mathematical commit `0292082`, working checkout at
`cb51292` (clean at launch). Definitions, cutoffs and equations (E1),
(E2) are those of
[TRANSITION-RESEARCH-EXECUTION.md](TRANSITION-RESEARCH-EXECUTION.md)
section 2. Owning derivations:
[corner-correlation.md](corner-correlation.md),
[corner-coefficient-energy.md](corner-coefficient-energy.md),
[sharp-corner-transition.md](sharp-corner-transition.md). Consumer:
[RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) section 3 and
[endpoint-target-audit.md](endpoint-target-audit.md).

## 1. The decomposition, its supports, and what it does not touch

### 1.1 The split is exact and pointwise

With rho_i and h_i=1-rho_i as in the contract, for every m,

\[
 1_{d>D_i}-h_i(d)=\rho_i(d)1_{D_i<d<z_i},
\]

since h_i vanishes for d<=D_i and equals 1 for d>=z_i, and
rho_i(d)=1-h_i(d) on the transition band. Hence, on the interval I_i
where the upper divisor cut is redundant,

\[
 T_i(m)=C_i(m)-\widetilde C_i(m)
       =\sum_{\substack{d\mid m\\ D_i<d<z_i}}\mu(d)\rho_i(d)
                \beta_{W_i}(m/d).                              \tag{1}
\]

This is the coefficient appearing in (E1). Summing the pointwise
identity C_i=T_i+\widetilde C_i against the shifted factor gives

\[
 R_{\rm cor}=\sum_{n\in J_x}C_L(n)C_R(n-2)
            =R_{00}+R_{10}+R_{01}+R_{11},                     \tag{2}
\]

with no error term and no hypothesis beyond the interval. Checked
exactly in section 6.

### 1.2 Redundancy of the upper cut, and no leakage

A nonzero beta_{W_i}(m/d) forces an integer r>W_i with r | m/d, so
m/d>=W_i+1 and d<=m/(W_i+1). On I_L=J_x this gives d<=floor(x/(V+1))
=D_L^+, and on I_R=(x/2-2,x-2] it gives d<=floor((x-2)/(Z+1))=D_R^+.
So the upper cut may be written or omitted in C_i, \widetilde C_i and
T_i without changing any of the four sums. The finite check in section 6
also exhibits terms outside I_L for which the cut is **not** redundant,
so the hypothesis is not treated as free.

Both h_i and rho_i 1_{(D_i,z_i)} vanish for d<=D_i, so every one of the
four pieces is supported on the same divisor rectangle
D_L<d<=D_L^+, D_R<e<=D_R^+, that is on S_0. Consequently (2) partitions
the corner mass only, and the split against E_out in (E2) neither
double counts nor omits.

### 1.3 E_dagger and the controlled cuts are unchanged

The smoothing acts on the coefficients inside S_0. E_dagger, the region
W_dagger, its three cuts, the floors, the boundary strips and the
compatibility tests are untouched, and no divisor pair outside S_0 is
reweighted. The auxiliary claim of
[corner-coefficient-energy.md](corner-coefficient-energy.md) section 4,
that E_dagger weighted by h(d)h'(e) equals R_00 up to O_H(x/log^H x),
is consistent with (E2): it is the h h'-weighted instance of the same
uniform density replacement.

### 1.4 The corner lies inside W_dagger, with more room than recorded

On S_0, d>x^{19/25-2eta} and e>x^{19/20-2eta}, so

\[
 de>x^{171/100-4\eta},\quad d^5e^2>x^{57/10-14\eta},\quad
 de^3>x^{361/100-8\eta}.
\]

Against floor(x^{3/4}), floor(x^{49/20}) and floor(x^{321/200}) these
hold for all sufficiently large x when eta<6/25, eta<13/56 and
eta<401/1600 respectively. The third W_dagger condition is a
disjunction, and its **second** disjunct de^3>floor(x^{321/200}) is
satisfied with a margin of about x^2. [corner-correlation.md](corner-correlation.md)
section 0 verifies the inclusion through the first disjunct
d>floor(x^{151/200}), which needs eta<1/400. That check is correct, but
the inclusion S_0 subset W_dagger is not what forces eta<1/400: at fixed
eta the binding constraints are elsewhere, namely eta<eta_0 for the norm
lower bound (17) and eta<1/40 for the single-prime-power cofactor
statement of corner-correlation section 1.1. This is a scope
correction only. Every statement below is made at fixed eta<eta_0 and is
unaffected.

## 2. The four budgets with their eta-dependence, and what they cost

### 2.1 Explicit constants

Let B be the absolute constant of the imported uniform mean square
S(N,z)<=BN, and A the absolute constant of the imported Graham/An mean
square used in corner-coefficient-energy (11). On both sides
R_i/W_i=x^{2eta}, so the weighted Cauchy of
sharp-corner-transition (5) gives

\[
 \|C_i\|^2\le Bx\log x\,(2\eta\log x+O(1))
      =2B\eta\,x\log^2x\,(1+o(1)),                            \tag{3}
\]

and corner-coefficient-energy (12), with L_i=eta log x and
log(x/(W_iz_1))=2eta log x, gives

\[
 \|\widetilde C_i\|^2\le A x\log x\frac{1+2\eta\log x}{\eta\log x}
       =2Ax\log x\,(1+o(1)).                                  \tag{4}
\]

The eta cancels in (4). By the triangle inequality
||T_i||^2<=2B eta x log^2 x (1+o(1)) as well. Cauchy at shift 2 then
gives, for each fixed 0<eta<eta_0 and all sufficiently large x,

| piece | absolute budget | contribution after division by x |
|---|---|---|
| R_00 | 2A x log x (1+o(1)) | O(log x), constant free of eta |
| R_10, R_01 | 2 sqrt(AB eta)\, x log^{3/2}x (1+o(1)) each | O(sqrt(eta) log^{3/2}x) |
| R_11 | 2B eta\, x log^2 x (1+o(1)) | O(eta log^2 x) |

### 2.2 The decomposition buys nothing at the level of norms

Bounding R_cor directly by Cauchy gives
|R_cor|<=||C_L||\,||C_R||<=2B eta x log^2 x (1+o(1)), by (3). The four
budgets above sum to the same leading quantity. Thus these separate upper estimates have the same leading asymptotic
budget as direct Cauchy and add lower-order terms. They do not give a gain.
This does not rule out signed grouping or improvements using further input.

### 2.3 Shrinking eta redistributes, it does not save

The consumer needs the total of the deductions below C_2x. The R_11
budget alone falls below C_2x only when eta<C_2/(2B log^2 x). Two
separate reasons make that route inert. First, eta is fixed by
hypothesis in every input used here, and an eta shrinking with x needs
every eta-dependent constant and every x^epsilon loss tracked
([cross-campaign-synthesis.md](cross-campaign-synthesis.md) section 5.2).
Second, and independently of that, E_dagger=E_out+R_cor+O_H(x/log^H x)
does not depend on eta while both summands do. For eta'<eta one has
S_0(eta') subset S_0(eta), so the mass removed from R_cor reappears in
E_out. Making the corner budget small by shrinking the corner moves the
open problem into the unestimated term.

### 2.4 The smoothing length is capped by the corner width

In (4) the numerator log(x/(W_i z_1))=2eta log x is fixed by the corner,
and L_i=log(z_i/D_i)<=2eta log x because z_i must stay below
D_i^+ ~ x^{1-w}. So the available bound (4) is at least
A x log x (1+o(1)) for every admissible choice of z_i. Choosing the
longest smoothing gains a factor 2 and no more. A smoothing running
below D_i would place weight outside S_0 and break the split of section
1.2. This particular upper-bound formula therefore gains no logarithmic order
by changing the smoothing length alone. It is not a lower bound for the
actual smoothed norm or a proof that every other norm estimate fails.

## 3. The attempted mechanism: a moving sharp cutoff

### 3.1 Exact representation

The cutoff integral of corner-coefficient-energy (8) is exact, endpoints
included: h_i(d)=(1/L_i) int_{D_i}^{z_i} 1_{d>S}\,dS/S. Write, for
D_i<=S<=z_i,

\[
 C_i^{(S)}(m)=\sum_{\substack{d\mid m\\ d>S}}\mu(d)\beta_{W_i}(m/d),
 \qquad
 G_i^{(S)}(m)=\sum_{\substack{d\mid m\\ D_i<d\le S}}\mu(d)\beta_{W_i}(m/d),
\]

so C_i^{(D_i)}=C_i and G_i^{(S)}=C_i-C_i^{(S)}. Averaging with the
probability measure dS/(S L_i) on [D_i,z_i],

\[
 \widetilde C_i=\Big\langle C_i^{(S)}\Big\rangle_S,\qquad
 T_i=\Big\langle G_i^{(S)}\Big\rangle_S.                       \tag{5}
\]

The transition coefficient is the logarithmic average of the **sharp**
coefficients of the short divisor windows (D_i,S]. Set

\[
 \Phi(S,T)=\sum_{n\in J_x}C_L^{(S)}(n)\,C_R^{(T)}(n-2),
 \qquad S\in[D_L,z_L],\ T\in[D_R,z_R].
\]

Then, exactly,

\[
 R_{00}=\langle\Phi\rangle_{S,T},\quad
 R_{10}=\langle\Phi(D_L,T)\rangle_T-\langle\Phi\rangle_{S,T},\quad
 R_{01}=\langle\Phi(S,D_R)\rangle_S-\langle\Phi\rangle_{S,T},
\]
\[
 R_{11}=\Phi(D_L,D_R)-\langle\Phi(D_L,T)\rangle_T
        -\langle\Phi(S,D_R)\rangle_S+\langle\Phi\rangle_{S,T},
 \qquad R_{\rm cor}=\Phi(D_L,D_R).                             \tag{6}
\]

The four pieces are values and cutoff-averages of one two-parameter
sharp corner correlation; R_11 is its mixed second difference. The
smoothing therefore contributes no new arithmetic object. Its entire
content is regularity of Phi in the two cutoff parameters. All of (5)
and (6) are checked exactly in section 6, with the rho/h orientation and
the window orientation as active controls.

### 3.2 The signed quantity the mechanism bounds, and where cancellation goes

Applied to R_11, the mechanism is: represent by (5), then bound
|R_11|<=<|sum_n G_L^{(S)}(n)G_R^{(T)}(n-2)|>_{S,T}, then apply Cauchy in
n at each fixed (S,T). The signed quantity actually bounded at fixed
(S,T) is the short-window sharp corner correlation
sum_n G_L^{(S)}(n)G_R^{(T)}(n-2), with divisor windows (D_L,S] and
(D_R,T], both shifted endpoints, all prime powers r inside beta with
weight Lambda(r)=log p, the (d,e)|2 compatibility and both gcd branches
retained. Two operations discard cancellation: the triangle inequality
on the (S,T) average discards sign variation in the cutoffs, and Cauchy
in n discards the shift-2 sign structure.

### 3.3 The cost: the route cannot beat the direct Cauchy bound

Write nu_L(S)=||G_L^{(S)}||_{I_0} and nu_R(T)=||G_R^{(T)}||_{I_2}. The
mechanism outputs

\[
 \mathcal M=\langle\nu_L(S)\rangle_S\cdot\langle\nu_R(T)\rangle_T .
\]

Both averages are against probability measures, so Minkowski's integral
inequality applied to (5) gives ||T_L||<=<nu_L(S)>_S and
||T_R||<=<nu_R(T)>_T, hence

\[
 \mathcal M\ \ge\ \|T_L\|\cdot\|T_R\| .                        \tag{7}
\]

Inequality (7) is unconditional. It compares the exact norm output of
this average-triangle-Cauchy procedure with the exact product of transition
norms. It does not compare arbitrary upper constants, and does not apply
to an argument that retains signed cancellation before these inequalities. The finite check in section
6 confirms the direction and finds it strict on the proxies, so (7) is
not an equality being read as a loss.

Combining (7) with the derived lower bound
||T_i||^2>=(L_0w_i eta/64)x log^2 x, valid for sufficiently large x
at each fixed 0<eta<eta_0,

\[
 \mathcal M\ \ge\ \frac{L_0\sqrt{w_Lw_R}}{64}\,\eta\,x\log^2x ,
                                                               \tag{8}
\]

with w_L=6/25, w_R=1/20. The factor 64 pays the remainder: write
T=P+(Q-C_tilde), use the prime lower coefficient 1/16 and
||Q-C_tilde||<=||P||/2 eventually. See transition-round-audit section 5.
Thus this specific procedure is saturated at the order
eta x log^2 x, the same order as its upper budget (3). **First limiting
term: the Cauchy step in n, whose output ||T_L||||T_R|| is bounded below
by (8).** The loss is a norm bound, not a boundary term, a coefficient
separation or a scale misalignment. Statement (7) is unconditional;
statement (8) depends on the retained small-fixed-eta norm lower bound, and if
that lower bound were withdrawn the comparative statement (7) would
still stand while the absolute saturation would become unproved.

The same argument applies unchanged to the mixed terms: representing
T_L by (5) inside R_10 and applying Cauchy at each cutoff outputs at
least ||T_L||\,||\widetilde C_R||, the direct Cauchy bound for R_10.
Whether that is saturated at x log^{3/2}x would require a suitable lower
bound for the smoothed norm, which is not derived here. A one-point
Graham asymptotic for a pure divisor weight is not automatically a lower
bound after its prime convolution and all cross terms. Such a lower bound
would constrain norm-only mixed estimates, not force separate signed control.

### 3.4 A derived constraint on short-window mean squares

(7) also constrains what a short-window input could ever say. Suppose,
for D<S<=z and **uniformly in N>=1**,

\[
 \Sigma_{(D,S]}(N)=\sum_{m\le N}\Big(\sum_{d\mid m,\ D<d\le S}\mu(d)\Big)^2
 \ \le\ \theta(S)\,N .                          \tag{H}
\]

The weighted Cauchy of sharp-corner-transition (5), applied to
G^{(S)}=sum_{r|n,W<r<n}Lambda(r)M_{(D,S]}(n/r), then gives
nu(S)^2<=2 eta theta(S) x log^2 x (1+o(1)).
Here theta may depend on the cutoff parameters; the assertion must be
uniform for every N needed in the convolution. It can be capped at

\[
 \theta_{\rm eff}(S)=\min(\theta(S),4B),
\]

because M_(D,S]=M(.,S)-M(.,D) and the two uniform square bounds give
Sigma_(D,S](N)<=4BN. Combining the bound on nu with the single-side
lower bound ||T_i||^2>=(L_0 w_i eta/64)x log^2 x gives

\[
 \liminf_{x\to\infty}\frac1{L_i}\int_{D_i}^{z_i}
       \sqrt{\theta_{\rm eff}(S)}\,\frac{dS}{S}
       \ \ge\sqrt{L_0w_i/128}>0.                              \tag{9}
\]

This is along the fixed-eta dyadic sequence, for each side. The bounded
cap makes it legitimate to exclude uniform o(1) outside a vanishing
logarithmic proportion: a bounded exceptional part then has vanishing
integral too. Without boundedness or uniform integrability that inference
would not follow. The exact constants in the two sides' L_i retain floors;
L_i=eta log x+o(1) is used only in taking the limit.

A bound valid only on a restricted N-range must be combined with a bound
for the omitted part. The crude upper budget there does not establish its
actual size or make every restricted-range theorem unusable. Nor does (9)
preclude localized improvements; it constrains this averaged norm procedure.

### 3.5 What the reformulation does leave

Two consequences of (6) are worth keeping, since they replace three
separate norm bounds by one quantity and one obligation.

First, because the averages in (6) are against probability measures,

\[
 |R_{10}+R_{01}+R_{11}|\ \le\
 \sup_{\substack{D_L\le S\le z_L\\ D_R\le T\le z_R}}
 \big|\Phi(D_L,D_R)-\Phi(S,T)\big| .                           \tag{10}
\]

A modulus of continuity for Phi in its two cutoff parameters bounds the
whole non-smoothed part. Present knowledge supplies only the trivial
sup<=2sup|Phi|, which returns the budget of section 2.1.

Second, R_cor=R_00+(R_cor-R_00), so with (10),

\[
 |R_{\rm cor}|\ \le\ |R_{00}|+\sup|\Phi(D_L,D_R)-\Phi(S,T)| .  \tag{11}
\]

In the particular triangle bound (11), improving the continuity term
alone leaves the available 2Ax log x bound for |R_00|. That separate
budget is insufficient. It does not follow that every grouping requires
an individual R_00 estimate: the terms can cancel before taking absolute
values. Its coefficient 1 in (2) proves no such necessity.

If one chooses to require |R_00|=o(x) by a fixed-power logarithmic saving
from x log x, a saving exponent greater than one would suffice. That is
one sufficient target, not a necessary global proof obligation. A suitable
constant-sized one-sided O(x) bound may already fit an allocated budget;
a joint estimate may bypass the individual term altogether.

## 4. Sufficient consumer, stated with every term

The template of the assignment is B_mix=R_00+R_10+R_01 and, on a common
unbounded set of dyadic x,

\[
 R_{11}\ge-F_{11},\quad B_{\rm mix}\ge-F_{\rm mix},\quad
 E_{\rm out}\ge-F_{\rm out},\qquad
 F_{11}+F_{\rm mix}+F_{\rm out}\le C_2x-2cx/\log^Kx,
\]

with fixed c,K>0 and fixed H>K in the remaining error. What the present
state actually supplies:

| term | sign | scale set | best available F | status | F/x |
|---|---|---|---|---|---|
| R_11 | unknown | every sufficiently large dyadic x, fixed eta<eta_0 | 2B eta x log^2 x (1+o(1)) | derived, imports S(N,z)<=BN | 2B eta log^2 x |
| R_10, R_01 | unknown | same | 2 sqrt(AB eta) x log^{3/2}x each | derived, imports both mean squares | O(sqrt(eta) log^{3/2}x) |
| R_00 | unknown | same | 2A x log x (1+o(1)) | derived, imports Graham/An (10) | 2A log x |
| E_out | unknown | not established | none | OPEN | not bounded |
| density replacement in (E2) | - | every fixed H | O_H(x/log^H x) | derived, corner-correlation 1.3 | o(1) |

Verdict on the template: **no input is supplied.** The displayed separate upper budgets grow faster than C_2x; this is not
a lower bound on any actual term. No useful F_out is supplied here. The mechanism of section 3
supplies none of the three inequalities; it supplies a reason (7)-(9)
why one particular route to F_11 cannot be improved.

Two accounting points that do hold. The three corner budgets are valid
for every sufficiently large dyadic x at fixed eta, not on a sparse set,
so the disjoint-good-sets problem of cross-campaign-synthesis section
5.1 does not arise among them; it would arise only if some future
estimate for one piece held on a sparse set, and then the common-scale
requirement would have to be re-checked against E_out's own scale set.
And the only unconditional lower bound available for E_out is the one
inherited from S(x)>=0, namely
E_out>=-C_2x-R_cor-O_H(x/log^Hx), which is the tautology identified in
[corner-correlation.md](corner-correlation.md) section 2.2 and carries no
information. **Absence of an estimate for E_out is not evidence that the
corner method fails**, and nothing here converts it into one.

A rescaled-average or cumulative consumer is equally admissible
(endpoint-target-audit sections 2 and 3, consumer-comparison). The four
budgets above are uniform in x, so they average to the same orders; no
sampling or exceptional-set argument improves them. Averaging is
therefore not a way around section 2.1 for these pieces, though it may
be for a future signed estimate.

## 5. Reusable statements and limits

Retain the exact split (1)–(2), the cutoff averages (5), the mixed finite
difference (6), the norm-output comparison (7), its small-fixed-eta
saturation (8), the corrected bounded-average constraint (9), and the
conditional modulus bounds (10)–(11). None supplies a signed estimate.
The complete joint consumer in section 4, or an admissible averaged
alternative, remains the criterion for a proof payoff.

## 6. Verification and falsifiers

[transition-joint-budget-validation.js](transition-joint-budget-validation.js)
checks, on two finite fixtures with proxy cutoffs and both shifted
endpoints: the pointwise split C_i=T_i+\widetilde C_i; the four-piece
identity (2); the reconstruction of R_11 from the determinant-2 kernel
(E1) with the (d,e)|2 test and the gcd 2 branch present; the redundancy
of the upper divisor cut on the interval, together with witnesses off
the interval where it fails; the moving-cutoff representation (5),
computed by exact piecewise integration over integer breakpoints; the
cutoff averages and the mixed second difference (6); and the direction
of the Minkowski step (7). Eight controls are active and each changes
the answer: exchanging rho and h, using the complementary window
(S,z] instead of (D,S], replacing Lambda(r) by log r, dropping the
lower cut in the smoothed weight, evaluating the right factor at n
instead of n-2, dropping the compatibility test, using the upper cut
off its interval, and reading (7) as an equality.

These are finite identity checks with proxy cutoffs. They certify no
asymptotic norm order, no sign, no saving and no twin margin. The
imported mean squares and the derived lower bound (16) are not tested by
them.

## 7. Research use

The norm obstruction applies only after the stated inequalities lose the
signs. A signed estimate for the cutoff correlation or its joint average
remains open. A lower smoothed norm or a local window refinement could be
supporting information, but neither is a required prerequisite for a joint
proof. See [transition-round-audit.md](transition-round-audit.md) for the
scope corrections and finite countermodels. No region, exact cut or
sufficient twin margin has changed.
