# Review of the completed agent round and its research conclusions

<!-- ledger
id: Q-round-review-0906
status: ANSWERED
todo: C
parity: Independent review of local deductions and source hypotheses, with an elementary sampling argument applied to the existing bounded-multiplicative correlation input. No new prime correlation theorem, full-corner estimate or twin margin is supplied. Failures and lower-bound claims are restricted to their stated hypotheses.
question: Which conclusions of the completed agent round survive review, and which corrections change the next research specification?
verdict: The fixed-band lift and continuous moving-window estimate survive the checked source interface. Interval stability additionally gives a dyadic scale-average logarithmic saving, so the blanket scale exclusion was too strong. The rate and missing prime-cofactor terms with s>1 or s'>1 still prevent a twin margin. Proper-prime-power branches already have a negligible bound on the fixed corner. The driver computes integer parity, not the CRT gcd partition; its total coefficient identities survive. Diagonal lower-bound, reachability and six-cut bookkeeping overclaims are corrected. No region, exact residual cut or twin lower bound changes.
-->

**The sufficient twin margin remains OPEN.** Reviewed baseline: `c589d90`,
clean working tree, 2026-09-06. The review checks the three most recent
round outputs, their mathematical inputs and the conclusions in the live
handoff. It is not a reproof of every upstream reduction or every external
theorem in the campaign's 79 changed files since `6e4a4fc`.

## 1. Disposition

| Finding | Evidence and correction | Consequence |
|---|---|---|
| R1: the exceptional-scale exclusion was too strong | Section 2 derives a dyadic average from the existing fixed-band continuous estimate, using stability of bounded interval sums and the existing moving-band comparison. | A new theorem valid at every scale is not necessary just to obtain an average over dyadic scales. The saving remains too weak for the twin consumer. |
| R2: already controlled proper prime powers were listed as open | corner-correlation §1.1 bounds every term with a proper prime power above V or Z. Section 3 checks the bound including multiplicities. | Keep Q in exact finite diagnostics, but do not reassign its fixed-corner asymptotic bound. The prime-r branches with s>1 and their non-squarefree inputs remain open. |
| R3: integer parity was described as the CRT gcd partition | The driver assigns `n % 2`, which computes gcd(n,n-2). Section 4 gives a counterexample to identifying this with a term's modulus gcd or cofactor gcd. | Relabel the output as integer parity. The total C-product and its P/S/Q algebra are retained; no claim of testing the CRT partition follows. |
| R4: summary lower bounds exceeded the hypotheses | Zero coefficients or coincident endpoints make the diagonal zero. Report 21 F9 had corrected this in signed-moment but the consolidated summary and reachability note retained the stronger claim. | Retain upper budgets and their limitations; withdraw a universal nonzero diagonal or unavoidable norm floor. |
| R5: conditional reachability bookkeeping | The four sets A,B,C,D contain six scalar cutoffs; a fixed-margin bulk need not persist for every gamma<2, though edge strips do. Areas are monotone when gamma is ordered. | Correct six Perron factors and log^6 cost. The conditional gamma=2 threshold for covering the complement of the prescribed corner is retained. No unconditional coverage is added. |

The Fourier superposition, the O(1) pretentious-distance comparison,
Tonelli order and mesh proof in [prime-band-transfer.md](prime-band-transfer.md)
survive the checked hypotheses. I read
[Tao–Teräväinen v2, Theorem 3.1(ii)](https://arxiv.org/html/2512.01739v2)
and [Matomäki–Radziwiłł–Tao, (1.12)](https://arxiv.org/pdf/1503.05121v3)
at source. The technical prime-value condition belongs to case (i).
The non-pretentiousness exponent 7/24 permits L=(log X)^(1/4).
No deep imported proof is independently reproduced here.

The function-class and normalization mismatches in
[the source map](next-correlation-source-map.md) remain real. In particular,
[Guo v4, Theorem 1.8](https://arxiv.org/html/2608.23500v4)
states a logarithmic Liouville-pair bound, not the complex pair needed by
the lift. Its proof is not reviewed here. The stronger all-scales input
specified in that map is one possible route, not a necessary prerequisite
for every averaged or unbounded-scale argument. This review makes no
claim about suitable theorems beyond the inspected statements.

## 2. A dyadic sampling consequence missed by the scale discussion

All logarithms are natural. Use c from prime-band-transfer (4), decreased
if necessary so 0<c<1, and fixed 0<eta<1/400. That note's c_* is c/2.
Functions and frozen prime bands may depend on the outer X, but are fixed
while applying the following lemma within that X.

### 2.1 Stability and sampling for a fixed bounded sequence

Let |a(n)|<=B for n<=2X+2, with B fixed, and
F(t)=t^(-1) sum_(t<n<=2t) a(n). For 1<=N<=t<=min(X,(1+h)N), 0<h<=1/4,
the two integer intervals have symmetric difference at most 3hN+2.
Their normalization changes by at most h/N. Therefore

\[
 |F(t)-F(N)|\le B(4h+3/N).                         \tag{1}
\]

This is an upper bound; no differentiability or multiplicativity is
assumed. It also bounds the change of |F|. The intervals
[2^j,(1+h)2^j] are disjoint. Integrating (1) over each one, using
log(1+h)>=h/2, and adding gives

\[
 \frac1{\log X}\sum_{\sqrt X\le2^j\le X}|F(2^j)|
 \ll \frac1{h\log X}\int_{\sqrt X}^{X}|F(t)|\frac{dt}{t}
       +B\left(h+\frac1{\log X}+X^{-1/2}\right).       \tag{2}
\]

At most one top interval protrudes beyond X; bound its sampled value by
2B, paying O(B/log X). This retains that endpoint rather than silently
discarding it. There are O(log X) sample points. If the integral divided
by log X is O((log X)^(-c)), choose h=(log X)^(-c/2). Equation (2) then
gives a dyadic average O((log X)^(-c/2)).

A measure-zero exceptional set can contain all dyadic points, as the
agents observed. It cannot by that observation alone rule out (2): large
values of these interval sums persist on neighborhoods whose width is
controlled by (1). Arbitrary measurable spikes would lack this property.

### 2.2 Apply the lemma before freezing the moving windows

For fixed B,B', apply (2) to

\[
 a(n)=\mu(n)\mu(n-2)L_B(n)L_{B'}(n-2)/(\log X)^2.
\]

Set a(n)=0 for n<=2. Its modulus is at most 4 on n<=2X+2. The
continuous input is exactly prime-band-transfer (4), uniformly in the
bands there. Consequently its dyadic average has saving c/2.

Now use that note's exact-window comparison (5). Partition
theta=log N/log X into O(1/delta) cells and freeze a band pair on each.
The normalized pointwise error between the exact moving-window sum A_w(N)
and its frozen-band version is
O_eta(delta+1/log X+X^(-1/10)). Its proof counts prime pairs by CRT;
the count is a fixed power below every N>=sqrt X. This comparison is
pointwise and is therefore applicable at dyadic N.

For each cell bound its nonnegative dyadic sum by the sum over all
dyadic samples for its own frozen band pair. The O(1/delta) cells cost
that factor; no common exceptional set is assumed. We obtain

\[
 \frac1{\log X}\sum_{\sqrt X\le2^j\le X}
 \frac{|A_w(2^j)|}{2^j(\log X)^2}
 \ll_\eta \delta^{-1}(\log X)^{-c/2}
                  +\delta+1/\log X+X^{-1/10}.         \tag{3}
\]

Choose delta=(log X)^(-c/4). Thus, for some fixed d=c/4=c_*/2>0,

\[
 \boxed{\frac1{\log X}\sum_{\sqrt X\le2^j\le X}
 \frac{|A_w(2^j)|}{2^j(\log X)^2}
          \ll_\eta (\log X)^{-d}.}                   \tag{4}
\]

The campaign's upper endpoints are x=2N, so dyadic N also gives dyadic x.
The proper-square error in converting A_w to the raw P-by-P contribution
is O(N^(19/20+epsilon)); divided by N log^2 X and averaged it is negligible
for a sufficiently small fixed epsilon. No eta depending on X is used.

**Payoff and limit.** (4) is a dyadic scale-average relative saving, and
in particular supplies an unbounded sequence of dyadic scales with that
relative saving for this subfamily. It is not a bound at every prescribed
dyadic point, o(N), or a positive margin. The resulting averaged bound
on |A_w|/N is O_eta(log^(2-d) X); d is small and unextracted. Other
prime-r cofactor branches and the complement of S_0 remain unestimated
at the required precision. No change to W_dagger or E_dagger follows.

## 3. Proper prime powers already have a fixed-corner bound

For W>=2,

\[
 \sum_{p^a>W,\ a\ge2}p^{-a}\ll W^{-1/2}.             \tag{5}
\]

Split p at sqrt W. For each smaller prime, the tail starting at the
first eligible exponent is at most 2/W; for larger primes it is at
most 2/p^2. Bounding primes by integers proves (5).
There are at most x times this sum integers n<=x divisible by one
such power. For each n the number of divisor/cofactor choices and all
logarithmic weights are O_epsilon(x^epsilon), after distributing a
sufficiently small fixed epsilon among the divisor bounds. Thus the
total absolute contribution of all Q-containing products is

\[
 O_\epsilon(x^{22/25+\epsilon}+x^{39/40+\epsilon}),   \tag{6}
\]

as already derived in corner-correlation §1.1. Taking epsilon<1/40
absorbs this into every fixed O_H(x/log^H x). Repeated powers count
with their multiplicity; the divisor bound pays for it. This does not
remove non-squarefree inputs arising from small repeated prime factors
in the remaining P/S products, and does not bound the complement.

## 4. What the finite driver measures

The exact integer prime-log-vector comparison tests the full C coefficient,
including all P/S/Q branches. It survives this review and reruns. Its
`n % 2` split is exactly gcd(n,n-2), hence integer parity.

It does not compute the per-term gcd of the two CRT moduli, or that of
the two cofactors K,T in corner-correlation (1). For example,
330=5*11*6 and 328=41*2*4 give nonzero Mobius divisors d=5,e=41,
prime powers r=11,r'=2 and s=6,s'=4. Then gcd(330,328)=2 but
gcd(dr,er')=gcd(55,82)=1; likewise the pair d=10,e=41,K=33,T=8
has gcd(K,T)=1 while n is even. Both occur in the toy proxy window
x=512, U=V=Dlo=4, Y=Z=Elo=1, D0=102, E0=255; 330 lies in J_x.
These are proxy lower cuts, not a claim that the asymptotic S_0 is
populated at x=512.
A future CRT-branch test must retain the relevant indices before grouping.
The total identity keeps all these terms; the existing output is relabeled
instead of claiming a partition that it never computed.

The retained corner probe is also empty because Elo=48854902 exceeds
E0=44739242 at the recorded parameters. This blocks its right side over
the entire dyadic interval, independently of the left-prefix restriction.
The proxy matrix remains useful for finite algebra only.

## 5. Further corrections to the live summaries

The general diagonal is nonnegative but only bounded above by a constant
times B²C²f²MN/A under the stated hypotheses. b=0, c=0, an empty harmonic
set or equal endpoints refute a uniform positive lower bound. The
sqrt(M) norm cost is an upper bound, not an unavoidable lower bound for
every actual coefficient. These were already identified in review 21 F9.
The consolidated unsigned-mass comparison also mixed a single dyadic box
with the full fixed-eta prime-cofactor subfamily: the stated log^(K+2)
excess belongs to the latter's x log^2 x envelope, as corner-correlation
§1.5 derives. That envelope is not a lower bound on the signed sum.

In reachability (1), let t=2-gamma+2eta_0. In the bulk p,q>=2eta_0,
both p+3q and 3p+q are at least 8eta_0. Therefore that bulk's open
uncontrolled part is empty when gamma>=2-6eta_0. Edge strips still
persist for gamma<2: p=2eta_0,q=0 fails the right cross bound and the
left zero bound. The claim that the bulk and both strips all persist
for every gamma<2 was too strong; the stated overall threshold stays 2.

The four conditional controlled sets in reachability §4.4 contain six
scalar inequalities. At most six Perron integrals, with O(log^6 x)
cost, are required for their intersection. The uniform twists already
available cover them; the claimed four-factor separation omitted the
vertical cutoffs. Area is monotone for nested sets: 37/25<3/2 explains
why the table's 37/25 row is larger despite being printed later.

Ineffective constants mean no effective numerical onset has been
obtained, not that an asymptotic onset does not exist. The consolidated
claim is corrected accordingly. No necessity or exhaustion conclusion
is inferred from these bookkeeping corrections.

## 6. Verification and next decision

[round-review-validation.js](round-review-validation.js) checks finite
interval stability, exact integration of the fixed-sequence sampling
bound, endpoint handling and counterexamples to dropping the neighborhood
factor, using arbitrary complex test sequences rather than prime data.
It also checks the parity/gcd counterexamples, prime-power-tail bounds,
the fixed-margin bulk counterexample and all six cutoff exponents.
The driver tails and existing transfer validators are rerun through the
custody tools. These tests validate finite algebra and catch specified
errors; they do not prove a logarithmic correlation rate.

Verification run: `node research/qc.js --index --strict` (zero findings),
`node research/qc/selftest.js` (all known positives and controls pass),
`node research/audit-numbers.js` (all checks pass), and
`git diff --check`. The new sampling validator, transfer-review validator,
readiness validator and corner-correlation validator reproduce their
embedded outputs. Both branch-driver tails were regenerated after label
corrections; their measured coefficient figures reproduce. QUESTIONS and
SCRIPTS are regenerated. These gates do not independently prove the
imported source theorems or the mathematical conclusions of this review.

Retain the agents' coefficient identities, Fourier lift and source
matching work with these corrections. The next arithmetic priority is a
matched estimate for the remaining prime-r terms with s>1 or s'>1 and the full
one-sided/global payoff, or a substantially stronger averaged rate.
Requiring a theorem that excludes every dyadic exceptional point would
unnecessarily discard the route in §2. Another local kernel rectangle
alone still would not complete the global argument.
