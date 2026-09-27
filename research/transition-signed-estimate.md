# Signed transition kernel: fiber form, cutoff-difference interface and the missing input

<!-- ledger
id: Q-transition-signed-estimate
status: PARTIAL
todo: C
parity: Exact divisor and CRT identities, the uniform DBDT mean-square input through sharp-corner-transition (5), Mertens and a divisor bound. Both Mobius factors, both gcd branches, all prime powers and small cofactors are retained. No cancellation at shift 2 is obtained; the one-sided input is written with its quantifiers and left OPEN.
question: Can the signed transition kernel (E1) be estimated beyond its absolute norm budget, and if not, what exact input does the consumer need?
verdict: No signed improvement. Derived: the proper-prime-power part of R_11 is O(x^(39/40+epsilon)); the prime part is an exact beta-weighted sum over pairs of linear forms of two-point Mobius correlations with coefficients up to x^(6/25+2eta) and x^(1/20+2eta); the Cauchy budget is at most 2B*eta*x*log^2(x)(1+o(1)) and the fiber triangle budget 4*eta^4*x*log^4(x)(1+o(1)), so every existing inequality loses one of the two signs. The cutoff-difference identity converts T at pn into a sharp-window coefficient times log(p)/L plus two boundary windows; the entropy-decrement route then needs bounded coefficients, a short-interval one-point input for T and a log-weighted consumer, none available. The required one-sided input is stated exactly in section 5. The twin margin remains OPEN.
-->

**The twin-prime margin remains OPEN.** This note records the core
handler's bounded attempt on the central kernel (E1) of
[TRANSITION-RESEARCH-EXECUTION.md](TRANSITION-RESEARCH-EXECUTION.md).
It produces no signed saving. What it produces is exact structure,
two absolute budgets with explicit constants, the identified but still unpriced obligations of
the small-prime cutoff-difference route, and the missing input written
with its quantifiers. Launch commit
`cb51292c7635c3b75540ab5f2ac5b8a9e40eaa2d`, clean working tree;
mathematical baseline `029208295099b60d7a8b837d19eb361cfc12e6b1`.

Notation follows the contract: x=2^j, J_x=(x/2,x], fixed
0<eta<1/400, sides i in {L,R} with w_L=6/25, w_R=1/20,
W_L=V, W_R=Z, lower cuts D_i=max(W_i,floor(x^(1-w_i-2eta))) (the power cut wins for sufficiently large x),
z_i=floor(x^(1-w_i-eta)), L_i=log(z_i/D_i)=eta*log x+O(x^(-1/2)),
rho_i, h_i=1-rho_i, and

\[
 T_i(m)=\sum_{d\mid m,\ D_i<d<z_i}\mu(d)\rho_i(d)\beta_{W_i}(m/d),
 \qquad
 R_{11}=\sum_{n\in J_x}T_L(n)T_R(n-2).
\]

Every bound below that uses the uniform mean square (3) of
[sharp-corner-transition.md](sharp-corner-transition.md) uses the imported input and the derivation reviewed in
[transition-energy-review.md](transition-energy-review.md), rows A2 and A3; the dependency is marked
where it enters. The exact identities are independent of it and are
finitely checked in
[transition-signed-estimate-validation.js](transition-signed-estimate-validation.js).

## 1. Single-prime reduction and the priced proper-power part

Let b_L=0, b_R=2, n in I_i=(x/2-b_i,x-b_i], and d|n with
D_i<d<z_i. Then k=n/d satisfies

\[
 \frac{x/2-b_i}{z_i}<k<\frac{x}{D_i},\qquad
 \frac{x}{D_i}\le x^{w_i+2\eta}(1+o(1)).
\]

Since eta<3/25 on the left and eta<1/40 on the right, for large x
every active cofactor satisfies k<=W_i^2.

**Lemma 1 (single base).** If k<=W^2 and beta_W(k) is nonzero, all prime powers r|k with r>W
have one prime base p. If moreover p>W then p divides k exactly once
and beta_W(k)=log p. Otherwise p<=W<p^a for some a>=2.

Two prime powers above W with distinct bases dividing k would have coprime product greater than W^2, contradicting k<=W^2. If p>W and
p^2|k then k>=p^2>W^2. Both checked finitely, with a control fixture
where k>W^2 and two bases occur.

Split beta_W=beta^P+beta^Q, where beta^P(k)=log p when k=ps with p>W
prime and p not dividing s, and beta^Q collects the proper-power case.
Correspondingly T_i=T_i^P+T_i^Q with

\[
 T_i^P(n)=\sum_{p\mid n,\ p>W_i}\log p\ g_i(n/p),\qquad
 g_i(m)=\sum_{d\mid m,\ D_i<d<z_i}\mu(d)\rho_i(d).              \tag{1}
\]

The interchange uses pd|n if and only if p|n and d|n/p.

**Lemma 2 (proper-power cost).** For every fixed epsilon>0 and either
actual interval I_i=(x/2-b_i,x-b_i],

\[
 \sum_{n\in I}|T_i^Q(n)|^2\ll_\epsilon x^{1-w_i/2+\epsilon}.
\]

The coefficient T_i^Q is supported on n divisible by a proper prime
power above W_i (checked finitely: every nonzero value found has such a
divisor). Its size is at most tau(n)log n. The support has at most
x*sum_(p^a>W,a>=2)p^(-a)<<x W^(-1/2) elements, by the reciprocal-power
estimate in sharp-corner-transition section 4.1. The divisor bound
absorbs tau(n)^2 log^2 n.

A direct support estimate is stronger than applying Cauchy to that norm.
For any product containing T_i^Q, both factors have pointwise bound
at most a divisor function times log x. Summing over its support gives
O_epsilon(x^(1-w_i/2+epsilon)). Thus the existing argument in
corner-correlation section 1.1, applied to weights bounded by one, gives

\[
 R_{11}=R_{11}^{PP}+O_\epsilon(x^{39/40+\epsilon}),\qquad
 R_{11}^{PP}=\sum_{n\in J_x}T_L^P(n)T_R^P(n-2).                 \tag{2}
\]

The right side determines the exponent, 1-w_R/2=39/40. For
0<epsilon<1/40 this is o(x/log^H x) for every fixed H. This reuses
an existing proper-power estimate and does not depend on a transition
mean-square bound. The earlier Cauchy exponent 79/80 was valid but weaker.

## 2. Exact fiber form: pairs of linear forms

Write k=n/d and v=(n-2)/e. Then

\[
 R_{11}^{PP}=\sum_{k,v}\beta^P_V(k)\beta^P_Z(v)\,\Phi(k,v),
 \qquad
 \Phi(k,v)=\sum_{\substack{dk\in J_x\\ dk\equiv2\ (\mathrm{mod}\ v)}}
   \mu(d)\mu\!\left(\tfrac{dk-2}{v}\right)\tau_L(d)\tau_R\!\left(\tfrac{dk-2}{v}\right).
                                                                    \tag{3}
\]

Here tau_i(d)=rho_i(d)1_(D_i<d<z_i). The lower cut does not sit inside rho_i: rho_i is one below D_i. It must be written explicitly or included in tau_i.
Let g=(k,v). If g does not divide 2, Phi(k,v)=0. Otherwise put
k'=k/g, v'=v/g, let c_0 be the least positive residue of
(2/g)k'^(-1) modulo v', and c_1=(c_0k-2)/v. The solutions form one
arithmetic progression,

\[
 d=c_0+v't,\qquad e=c_1+k't,\qquad t\in\mathcal T_{kv},           \tag{4}
\]

where T_kv is the set of integers t satisfying all three conditions
dk in J_x, D_L<d<z_L and D_R<e<z_R. It is an integer interval, possibly empty.
Its cardinality is at most x/(2kv')+1<=x/(kv)+1. Both branches g=1 and g=2
occur and are counted separately; a rule based on the integer parity of
k and v predicts nonempty fibers for pairs with g>2 whose true fiber is
empty (90 such pairs in the finite fixtures). Equation (3)–(4) is
checked exactly against the direct sum over n.

At fixed eta the fiber parameters are, for large x,

| Quantity | Range |
|---|---|
| v' | greater than Z/2 and at most R_R=x/D_R |
| k' | greater than V/2 and at most R_L=x/D_L |
| number of active fibers | at most (4eta^2/(w_Lw_R))x^(29/100+4eta)(1+o(1)) |
| cardinality of T_kv | at most x/(kv)+1 << x^(71/100-2eta)+1; no uniform positive lower bound after clipping |

These are fixed-cofactor fibers, which can be long. They differ from
fixed-divisor fibers (d,e), which are empty or singleton at these cuts.
The raw t-interval has length gx/(2kv); the band intersection can shorten
it arbitrarily. In particular there is no uniform conversion from the
coefficient powers of x to powers of the clipped interval length.
[The review](transition-round-audit.md) gives explicit controls for this
distinction. This exact regrouping adds no controlled region.

## 3. Two absolute budgets with explicit constants

**(a) Cauchy at n.** Depends on the uniform input (3) of
sharp-corner-transition and on its A2/A3 review. From (5) there, with
R_i=x/D_i and Mertens' sum_(r<=t)Lambda(r)/r=log t+O(1),

\[
 \sum_{n\le x}|C_i(n)|^2\le Bx\log x\bigl(\log(R_i/W_i)+O(1)\bigr)
   =2B\eta\,x\log^2x\,\bigl(1+O(1/(\eta\log x))\bigr).
\]

With ||C_tilde_i||^2<<_eta x log x and the triangle inequality,

\[
 |R_{11}|\le\|T_L\|_{I_0}\|T_R\|_{I_2}
        \le 2B\eta\,x\log^2x\,(1+o_\eta(1)).                          \tag{5}
\]

Here B>=1 is the de la Breteche–Dress–Tenenbaum constant, not
numerically extracted. This is the current absolute budget with its
constant made explicit; it is linear in eta.

**(b) Triangle inequality inside fibers.** From (3)–(4), with
|mu|,rho<=1,

\[
 |R_{11}^{PP}|\le x A_LA_R+\sum_{k,v}\beta^P_V(k)\beta^P_Z(v),
 \qquad
 A_i=\sum_{k\le x/D_i}\frac{\beta^P_{W_i}(k)}{k}.
\]

By Lemma 1, A_i<=sum_(W_i<p<=R_i)(log p/p)(log(R_i/p)+1), and partial
summation with sum_(p<=t)log p/p=log t+O(1) gives the upper budget
A_i<=(1/2)log^2(R_i/W_i)+O(log(R_i/W_i))
=2eta^2 log^2 x+O_eta(log x).
The second sum is O(x^(29/100+4eta)log^2x). Hence

\[
 |R_{11}^{PP}|\le 4\eta^4\,x\log^4x\,\bigl(1+O(1/(\eta\log x))\bigr).  \tag{6}
\]

The ratio of (6) to (5) is 2eta^3 log^2 x/B, unbounded. The fiber
triangle inequality discards the one-point Mobius cancellation in the
small cofactors that the uniform mean square supplies to (5). Neither
inequality retains the sign of mu(d)mu(e) across n and n-2.

**Comparison with the required normalization.** The displayed absolute
budgets grow faster than x and do not establish a one-sided O(x) bound.
This says nothing about the actual signed size. A separate-budget
consumer would need R_11>=-F_11 and compatible mixed/outside estimates
whose total fits below C_2x on a common unbounded set. A joint estimate
could instead exploit cancellation between pieces. Section 5 separates
the local hypothesis from the global obligation.

## 4. The cutoff-difference interface

**Lemma 3 (exact).** Let p<=W_i be prime, p not dividing n, and
pn<=x. Then

\[
 T_i(pn)=\sum_{d\mid n}\mu(d)\{\rho_{T,i}(d)-\rho_{T,i}(pd)\}\beta_{W_i}(n/d),
 \qquad \rho_{T,i}=\rho_i1_{(D_i,z_i)}.                                \tag{7}
\]

If p<z_i/D_i, with S_i^(p)(n)=sum_(d|n, D_i<d<z_i/p)mu(d)beta(n/d),

\[
 T_i(pn)=\frac{\log p}{L_i}S_i^{(p)}(n)
   -\sum_{\substack{d\mid n\\ D_i/p<d\le D_i}}\mu(d)\rho_i(pd)\beta(n/d)
   +\sum_{\substack{d\mid n\\ z_i/p\le d<z_i}}\mu(d)\rho_i(d)\beta(n/d).
                                                                    \tag{8}
\]

If p>=z_i/D_i,

\[
 T_i(pn)=T_i(n)-\sum_{\substack{d\mid n\\ D_i/p<d<z_i/p}}
                \mu(d)\rho_i(pd)\beta(n/d).                          \tag{9}
\]

Equation (7) is coefficient-energy (16) at the transition weight; the
window forms follow from rho(d)-rho(pd)=log(p)/L on D<d<z/p and from
the two boundary intervals. All three are checked exactly on 9378
instances covering both ranges, with controls showing failure when p|n
or p>W. Here z_i/D_i=x^eta(1+o(1)) on both sides, so (8) applies for
p<x^eta(1-o(1)), and the main term of (8) is a sharp-window coefficient
with window (D_i, z_i/p) scaled by log(p)/L_i<=1.

**Restricted-shift identity.** For prime p<=Z, the substitution n=pm
gives exactly

\[
 \sum_{\substack{2p<n\le x\\ p\mid n}}\frac{p}{n}\,T_L(n)T_R(n-2p)
 =\sum_{2<m\le x/p}\frac{T_L(pm)T_R(p(m-2))}{m}.                      \tag{10}
\]

For p not dividing m(m-2) and p<min(z_L/D_L,z_R/D_R), (8) turns the summand into
(log p)^2/(L_L L_R) times S_L^(p)(m)S_R^(p)(m-2)/m plus eight products involving at
least one boundary window. The terms with p|m(m-2) lie in at most two residue
classes (one when p=2) and keep the original T.

**What the entropy-decrement route would then need.** The route of
Tao's logarithmic two-point argument has three further inputs, none
supplied here.

1. Replacing 1_(p|n)p by 1 in (10) on average over p in [P,2P] for most
   P requires 1-bounded sequences in the mutual-information step.
   T_i is bounded only by tau(n)log n. Truncating at a fixed height
   removes mass that is not shown negligible at precision c'x. OPEN.
2. After that replacement the shift is 2p, averaged over primes. Tao's
   argument controls such averages through the Matomaki–Radziwill
   short-interval mean square of each individual function. For T_L the
   corresponding one-point statement is, for H below every active
   divisor (H<x^(19/25-2eta)), a bound for
   sum_(X<x'<=2X)|sum_(x'<n<=x'+H)T_L(n)e(alpha n)|^2 uniform in alpha.
   Expanding it produces self-correlations of T_L at shifts up to H,
   with no multiplicative structure to replace the Dirichlet-polynomial
   argument. Not supplied by any input inspected here. OPEN.
3. The left side of (10) is logarithmically weighted inside each dyadic
   block. A signed block sum with weight 1/n is not a constant multiple
   of the unweighted R_11(2^j)/2^j, so (10) does not feed the K=0
   rescaled-average consumer of RESEARCH-HANDOFF section 3 directly.
   One possible conversion would require the reduction S(x)=C_2x+E_dagger+O_H on every
   subinterval (x/2,t] with cutoffs frozen at x. Not checked here;
   an obligation, not a refutation.

The boundary windows in (8) have logarithmic width log p. The uniform
mean square gives their coefficients the same O(BN) budget as a full
truncation, so this use of that input does not yield a saving from narrowness.
A sharper window estimate or different use is not excluded. Lemma 3
alone supplies no reduction of (5).

## 5. The missing input, with quantifiers

**Input M (local, OPEN).** Fix 0<eta<1/400. There exist a fixed A>=0
and an unbounded set X_eta of dyadic x on which

\[
 \sum_{\substack{k,v\\(k,v)\mid2}}\beta^P_V(k)\beta^P_Z(v)
 \sum_{t\in\mathcal T_{kv}}\mu(v't+c_0)\mu(k't+c_1)
 \tau_L(v't+c_0)\tau_R(k't+c_1)\ \ge -Ax.                    \tag{11}
\]

All cutoffs and the full clipping in T_kv are as in section 2. Equation
(2) would then give R_11>=-Ax-o(x/log^H x) for every fixed H. This is a
local sufficient input for a one-sided bound, not by itself a twin theorem.

To use the separate-budget global template, on the SAME unbounded set
one also needs B_mix=R_00+R_10+R_01>=-F_mix and E_out>=-F_out, with

\[
 Ax+F_{\rm mix}(x)+F_{\rm out}(x)\le C_2x-2cx/\log^Kx
\]

for fixed c,K>0, and H>K in the reduction error. Then the error can be
absorbed to yield the sufficient margin C_2x+E_dagger>=cx/log^Kx.
No such mixed or outside budgets are supplied here. A direct joint
estimate, a weaker lower bound adequate to a different allocation, or an
admissible averaged consumer could replace this particular template.

The cofactor formulation has prescribed residues, variable leading
coefficients, exact interval clipping and beta weights. A source must
match those features and its aggregate cost. It need not control every
fiber separately. Fixed-form or freely shift-averaged results cannot
simply be substituted without pricing the missing uniformity or sampling.
[transition-source-match.md](transition-source-match.md) records the
inspected statement mismatches without excluding the broader methods.

## 6. Verification

[transition-signed-estimate-validation.js](transition-signed-estimate-validation.js)
checks Lemma 1 with a failing control fixture, the support of T^Q, and
the equality of the corrected (3)–(4), implemented with rhoT and explicit cuts, with the direct sum over n in J_x on two
fixtures, the progression structure of every nonempty fiber including
the g=2 branch, the parity-rule control, and (7)–(9) on both p-ranges
with p|n and p>W controls. Proxy cutoffs satisfy x/D<=W^2 so that
Lemma 1 applies. These are finite identities; they certify no asymptotic
rate, sign or correlation saving.

## 7. Outcome, dependencies and next move

Outcome: no signed improvement for R_11. Derived: (2), (3)–(4), (5)
with its constant, (6), Lemma 3 with (8)–(10). Failed steps: the
entropy-decrement route stops at boundedness, at the short-interval
one-point input for T, and at the log-weighted consumer. The absolute
budget of R_11 is unchanged; no region, exact cut or twin margin
changes.

Dependencies: (5) and the o(1) terms in section 3(a) rest on
sharp-corner-transition (3)–(6) and therefore on the reviewer's A2 and
A3. Lemma 1, Lemma 2, (3)–(4) and Lemma 3 do not.

The subsequent [cofactor progression transfer](cofactor-progression-transfer.md)
derives a signed dyadic scale-average estimate for the actual restricted
profiles with s,t<=(log x)^kappa, including nonsquarefree inputs. It does
not improve the full R_11 budget or establish Input M. Its full extension
fails at the theorem's modulus range and accumulated cofactor cost.
Next move: estimate the remaining cofactor sum with both mixed tails,
or a joint cutoff expression, with a complete common-scale consumer. These are
research candidates, not necessary forms of a proof. Repeating the same
norm-only inequality cannot improve its saturated order for small fixed eta;
a new signed mechanism or a concrete correctness concern can justify further work.
