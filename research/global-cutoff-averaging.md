# Average the whole identity before isolating the corner

<!-- ledger
id: Q-global-cutoff-averaging
status: PARTIAL
todo: C
parity: Exact averaged Vaughan identities, the existing prime BV and derived Mobius BV inputs with fixed uniform margins, the existing comparison-sequence calculation, Graham's imported one-point mean square and the sharp-corner norm bounds. The new cancellation statement is at the same input, not at shift 2. No signed twin margin or universal method obstruction is proved.
question: Does the wider corpus suggest changing the global decomposition before extending the small-cofactor estimate, and can that change be made without an unpaid transition or outside term?
verdict: Derived: independently averaging the two initial Mobius cutoffs over fixed exponent intervals gives S=C2*x+sum G_L(n)G_R(n-2)+O_A(x/log^A x), uniformly on dyadic scales, with all cofactor and prime-power branches included. Each full G has squared norm O(x log x). The existing sharp-corner lower norm then forces cancellation between the corner coefficient and the rest at the same input. This does not estimate their shifted product. The global signed residual was already O(x) by the sieve upper bound and positivity; the new norm representation is not an improved signed bound. Prefer a bounded attempt on this global coefficient pair and a one-sided consumer; the twin margin remains OPEN.
-->

**Twin-prime infinitude remains OPEN.** This is a change of representation
and a derived one-point cancellation statement, not a signed improvement.
It revises the priority of extending the isolated corner. No claim is made
that it is the best possible proof route or a novel identity in the literature.

Baseline: clean commit 3a15541, 2026-09-06. The cross-check used the current
question/outcome registers, the arithmetic chain, the earlier
[cross-campaign review](cross-campaign-synthesis.md), the proposal registry,
and the owning arguments listed in section 6. It is not a fresh independent
audit of every archived manuscript, script or imported theorem.

## 1. The distinction that changes the next question

Smoothing only the isolated corner leaves a sharp-to-smooth transition and
E_out. Both are open at the required signed precision. The sharp transition
has a non-negligible squared norm for sufficiently small fixed eta.

Instead, the initial Vaughan cutoffs are choices in an identity for the
**same** twin count. Average those identities while their already-proved
Type I estimates hold uniformly. The resulting full smooth remainder
represents the original count; there is no need to restore a chosen sharp
corner. The arithmetic previously in E_out is included, not discarded.

This is a different operation from averaging the corner cutoffs
D_L approximately x^(19/25-2eta) and D_R approximately x^(19/20-2eta).
The cutoffs averaged below are the much smaller initial U and Y.

## 2. A uniform family of complete reductions

Keep x dyadic, J_x=(x/2,x], V=floor(x^(6/25)), Z=floor(x^(1/20)),
and C2 as in [prime-detection-spec.md](prime-detection-spec.md).
Choose integers

\[
 a_L=\lfloor x^{11/50}\rfloor,\quad b_L=\lfloor x^{6/25}\rfloor,
 \qquad
 a_R=\lfloor x^{1/25}\rfloor,\quad b_R=\lfloor x^{1/20}\rfloor .
                                                               \tag{1}
\]

For real u in [a_L,b_L] and v in [a_R,b_R], use the exact cuts d>u,
e>v in the two Vaughan expansions, leaving V,Z fixed. For integer
divisors these are the cuts floor(u), floor(v). Define

\[
 C_{u,V}(m)=\sum_{\substack{d\mid m\\d>u}}\mu(d)\beta_V(m/d),
 \qquad
 R_{u,v}(x)=\sum_{n\in J_x}C_{u,V}(n)C_{v,Z}(n-2).               \tag{2}
\]

Then, for every fixed A>0,

\[
 S(x)=C_2x+R_{u,v}(x)+O_A(x/\log^A x),                         \tag{3}
\]

**uniformly over the whole rectangle of u,v.** Here is the uniformity
check against the owning proofs, rather than an assumption that any
choice of cutoff works.

| part of the existing reduction | largest support or smallest length | fixed margin |
|---|---|---|
| first prime BV Type I sums | floor(u)V <= b_L V <= x^(12/25) | below x^(1/2) by exponent 1/50 |
| comparison term with b(n) | nonempty Mobius intervals have length scale T=x/k > a_L | the uniform mean in polylog-fold-transfer section 4 applies at endpoints at least a_L, a fixed power of x |
| second Mobius BV Type I sums | introduced modulus <= b_R Z <= x^(1/10); T=x/k > a_L | sqrt(T) is at least a constant times x^(11/100), leaving exponent margin 1/100 |
| nonprimitive congruences | the same gcd 1, gcd 2 and odd-lift cases as before | the bounded parity reduction and intervals T or T/2 leave those fixed margins intact |

The coefficient bounds used in the first and second Type I sums remain
|c(d)|<=log d. Their endpoint maxima already include the varying lower
cuts; summing beta_V(k) x/k costs only fixed logarithms. Thus the arbitrary
logarithmic precision of each imported estimate absorbs the same losses
uniformly, with constants depending on A and the fixed exponents in (1).
No x-dependent epsilon or shrinking power margin is used.

The proofs being extended are
[prime-detection-spec.md](prime-detection-spec.md) sections 2–4,
[polylog-fold-transfer.md](polylog-fold-transfer.md) section 4 and
[shifted-prime-decomposition.md](shifted-prime-decomposition.md)
sections 2–4. The latter's Mobius BV input has its own owning derivation
in [mobius-bv-derivation.md](mobius-bv-derivation.md); it is not assumed
from a citation to a prime BV theorem.

The primary Vaughan identity and prime BV statement were rechecked in
[Tao, Notes 3, Lemma 18 and Theorem 17](https://terrytao.wordpress.com/2015/01/10/254a-notes-3-the-large-sieve-and-the-bombieri-vinogradov-theorem/).
Their complete analytic proofs are not newly audited here.

## 3. The averaged global coefficient and exact bookkeeping

For i=L,R put L_i=log(b_i/a_i) and

\[
 \rho_i(d)=
 \begin{cases}
 1,&d\le a_i,\\
 \log(b_i/d)/L_i,&a_i<d<b_i,\\
 0,&d\ge b_i,
 \end{cases}
 \quad h_i=1-\rho_i,\quad
 G_i(m)=\sum_{d\mid m}\mu(d)h_i(d)\beta_{W_i}(m/d),
 \quad W_L=V,\quad W_R=Z.                                    \tag{4}
\]

Pointwise h_i(d)=L_i^-1 int_(a_i)^(b_i) 1_(d>u) du/u. Independent
probability measures on the two cutoff intervals therefore give

\[
 \langle R_{u,v}(x)\rangle_{u,v}
   =\sum_{n\in J_x}G_L(n)G_R(n-2)=:\mathcal R(x).               \tag{5}
\]

Averaging (3), using its uniform error, yields

\[
 \boxed{S(x)=C_2x+\mathcal R(x)+O_A(x/\log^A x).}               \tag{6}
\]

The main term is unchanged because the left side of each averaged identity
is the same S(x). This is not a positive average over translations of the
primes, and it does not assume that good sets of x intersect.

All divisors, nonsquarefree integers, prime powers inside beta, strict
cuts and shifted endpoints are retained. There is no separate T or E_out
in (6). Relative to the existing fixed-cut reduction,
mathcal R=E_dagger+O_A(x/log^A x); this is a comparison of the complete
signed sums, not a termwise deletion of E_out or an extension of the
previous controlled geometric region.

For another exact check, if rho is any cutoff profile, write mu_rho(d)
=mu(d)rho(d) and mu_h=mu-mu_rho. Dirichlet convolution gives

\[
 \Lambda=\Lambda_{\le W}+\mu_\rho*\log
       -\mu_\rho*\Lambda_{\le W}*1
       +\mu_h*\Lambda_{>W}*1.                                \tag{7}
\]

Indeed log=Lambda*1 and mu*1=delta, so the right side collapses to
Lambda_(<=W)+Lambda_(>W). The analytic uniformity above requires the
specified profiles and supports; (7) alone proves no estimate.

## 4. What the full coefficient norm buys

Put F_i(m)=sum_(d|m) mu(d)rho_i(d). Exactly,

\[
 G_i(n)=-\sum_{\substack{r\mid n\\r>W_i,\ r<n}}
                         \Lambda(r)F_i(n/r).                  \tag{8}
\]

The r=n term is excluded: the coefficient at m=1 cancels against
mu*1=delta. Also F_i(m)=0 for 1<m<=a_i. The full prime-power convention
Lambda(p^j)=log p remains in force.

The already-derived range repair of Graham's mean square gives, for
N>=a_i and L_i>=1,
sum_(a_i<m<=N) F_i(m)^2 << N/L_i, including N<b_i.
See [corner-coefficient-energy.md](corner-coefficient-energy.md)
section 3.1. The primary statement was checked again in
[Chen An, arXiv:2206.10104v1, (1.1)](https://arxiv.org/html/2206.10104v1),
which states Graham's integer estimate.

Using sum_(r|n) Lambda(r)=log n and Cauchy as in that note's (12),

\[
 \sum_{n\le x}|G_i(n)|^2
 \ll \frac{x\log x}{L_i}
       \left(1+\log\frac{x}{W_i a_i}\right)
 \ll x\log x.                                                \tag{9}
\]

Here L_L is asymptotic to (1/50)log x and L_R to (1/100)log x.
For the right shifted interval use its subinterval of n<=x.
In particular the **whole global pair**, not only a smoothed corner,
has the absolute product budget O(x log x).

This is not a new O(x log x) bound on S, nor an improvement of the known
signed size of the global remainder. Positivity and the classical twin
upper-bound sieve already give mathcal R=O(x) through (6); see
[consumer-comparison.md](consumer-comparison.md). They still permit
mathcal R=-C2*x+o(x). The new content is the complete coefficient
representation and its one-point norm, suitable for testing another
signed argument.

### 4.1 The corpus forces cancellation across the corner split at one input

Fix eta in the sufficiently small fixed range of
[sharp-corner-transition.md](sharp-corner-transition.md), and let C_i
denote its sharp corner coefficient, with lower cut D_i. Eventually
D_i>b_i, so the corresponding part of (4) has h_i(d)=1. Thus

\[
 G_i=C_i+B_i,\qquad
 B_i(m)=\sum_{\substack{d\mid m\\d\le D_i}}
                        \mu(d)h_i(d)\beta_{W_i}(m/d).           \tag{10}
\]

On I_L=J_x and I_R=J_x-2 the owning sharp estimate has
||C_i||_2^2=Theta_eta(x log^2 x), while (9) has
||G_i||_2^2=O(x log x). Hence, by Cauchy,

\[
 \langle C_i,B_i\rangle
   =-\|C_i\|_2^2+\langle C_i,G_i\rangle
   =-\|C_i\|_2^2+O_\eta(x\log^{3/2}x).                        \tag{11}
\]

In particular the ratio of this cross term to ||C_i||_2^2 tends to -1.
Much of the corner's one-point energy is canceled by the rest of the
same full coefficient. Treating the corner as the whole problem can
discard that cancellation.

**This is not a shift-2 assertion.** Neither (11) nor its norm proof
estimates C_L(n)B_R(n-2), B_L(n)C_R(n-2), or mathcal R. Replacing a
common input by two shifted inputs is precisely the unproved step.

## 5. The next attempt and what would count as success

The subsequent [smooth-majorant note](global-smooth-majorant.md)
gives an absolute O(x) bound for a C3 probability profile inside
the same uniform rectangle. This is a different admissible pair;
only the complete signed residual is transferred to arbitrary
logarithmic precision. The signed or sufficient-constant estimate remains OPEN.

Research judgment: prioritize a bounded signed attempt on the global pair
G_L(n),G_R(n-2), allowing the two initial profiles to vary within explicitly
admissible supports. Keep cofactor sums inside the coefficient until a
justified inequality is applied. The new small-cofactor transfer remains
a possible ingredient; it is not automatically applicable to G_i, which
is neither 1-bounded nor multiplicative.

The consumer is a one-sided lower bound: for some fixed c,K>0 on an
unbounded common set of dyadic scales,

\[
 \mathcal R(x)\ge -C_2x+\frac{c x}{\log^K x}.                  \tag{12}
\]

Equation (6), with A>K, then implies twins. A justified signed scale
average can also serve; retain its rate and positivity implication.
The stronger mathcal R=o(x) would give the full weighted main term
and is not a necessary research requirement.

The [first factor-sign attempt](global-factor-signs.md) now gives an exact
small-prime formula, pays its exceptional prime-power contribution,
and refutes a pair-trigger negative-part majorant. Continue from its
full signed cofactor sum and explicit prime-filter correction to seek
an estimate at scale x. The positive part may have to be retained:
an unsigned negative-part bound is sufficient, not necessary. A norm bound
of O(x log x), or a relative logarithmic saving too small to reach scale x,
does not meet (12). No choice of profile is certified to do so.

The immediate falsifiers are a failed uniform BV margin, a changed main
term when averaging, an omitted r=n correction, or an unretained piece in
(10). These have analytic derivations above and finite controls below.
An eventual signed attempt must separately test its proposed inequality
on admissible factor configurations and price all its terms.

## 6. Why this precedes the other routes in the current corpus

| candidate | checked reason for its current priority |
|---|---|
| Extend small cofactors term by term | The two priced losses in cofactor-progression-transfer remain: power-sized moduli and accumulated cofactor cost; its restricted rate is still weaker than o(x). |
| Shrink eta with x | reachability-coverage section 2.5 leaves x^epsilon constants unpaid; shrinking geometry does not control its signed mass. No uniform repair is supplied here. |
| Smooth only the isolated corner | The norm transition is non-negligible; sections 2–4 above instead average the whole identity in an admissible initial-cutoff range. |
| Use a better prime-detecting weight | chen-opportunity-audit identifies a real removable penalty, already removed in prime-detection-spec. The present use of profile freedom stays within that complete consumer; a generic optimization is not itself a new estimate. |
| Return to anchored survival or fold transport | The anchored survivor implication is valid, but no new anchor-specific lower bound is supplied. The exact transport evaluator does not supply the missing recurrence. Those missing inputs are not refuted just because this arithmetic route is pursued first. |
| Demand generic Type I/II control | Ford–Maynard's source theorem concerns specified uniform coefficient classes. The actual-coefficient estimate here does not imply those hypotheses; their prime-free examples are not a universal obstruction to this task. |

Sources checked for the last two comparisons: the relevant proofs and
limits in [paper/anchored-note.md](../paper/anchored-note.md),
[the transport proposal](../paper/proposals/prop-tailcount-transport.md),
[chen-opportunity-audit.md](chen-opportunity-audit.md), and
[Ford–Maynard v1, Theorem 2.1](https://arxiv.org/html/2407.14368v1).
No proposal grade, novelty assessment or publication status is changed.

[global-cutoff-averaging-validation.js](global-cutoff-averaging-validation.js)
checks exact finite coefficient identities using integer prime-log vectors,
independent cutoff averaging, the complete two-expansion product identity,
and controls for omitted prime powers, r=n and lower-divisor complements.
No finite output is a test of the asymptotic estimates or a twin margin.

The finite fixture uses rational averages of integer cutoffs, an exact
finite counterpart of (5) and (7), rather than pretending to test the
asymptotic exponent range at a small x. The analytic extension and the
same-input comparison have been self-audited here; independent
mathematical review remains appropriate before relying on them downstream.

Verification on 2026-09-06: the finite validator passed;
strict QC with index regeneration reported zero findings; the verifier's
58 positive and 47 negative controls passed; the numerical audit passed
all 251 checks; git diff --check was clean. The embedding tool initially
required an output banner; a later descriptive label correction was
re-embedded with its recorded override and no numerical change. These
mechanical checks do not certify the analytic derivation.
