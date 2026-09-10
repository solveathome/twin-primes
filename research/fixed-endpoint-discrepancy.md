# Fixed-endpoint discrepancy: the split at x^(1/2-eps'), the below-level Type I piece, and the remainder that is left

<!-- ledger
id: Q-fixed-endpoint-discrepancy
status: PARTIAL
todo: C
parity: Exact divisor algebra and Vaughan decomposition; ordinary prime BV in the derived prefix form for body moduli e[r,g]<=x^(1/2-eps'/3)(log x)^L; the uniform Mobius mean (3a.9) at (k,e); the q=1 PNT. These pay only the low Type I term. The Type II term and band retain their actual signed coefficients; no twisted-prime BV input is imported.
question: After the accepted truncation to odd moduli e<x^(1/2+eps), what exactly is the fixed-endpoint centered discrepancy D^(e_1) below and above the level x^(1/2-eps'), which piece does an existing theorem estimate, and what single input would close D^(e_1)>=-4x/25+o(x)?
verdict: Reviewed 2026-09-09 after the coprimality repair: T_I^low=O_(A,eps')(x/log^A x), hence S=C_2x+B+O_A(x/log^A x), with B the exact Type II plus band sum (2.9). The untruncated modulus bound was false; g<=(log x)^(A+13), both tails, the coprime density and the weighted BV multiplicity now pay the estimate. Review corrects harmless log powers and the power-of-two atom over the full eps' range. D^(e_1)>=-4x/25+o(x) is equivalent to B+2C_2M>=-4x/25+o(x); it implies, but is not equivalent to, B>=-(C_2-1/200)x+o(x). The latter and H_B are sufficient OPEN margins. The absolute band statement (4.9) is one stronger sufficient input, not a necessary condition. No inspected source estimates the remaining actual signed B. Twin-prime infinitude remains OPEN.
-->

**Twin-prime infinitude, D^(e_1)>=-4x/25+o(x) and every sufficient signed
margin remain OPEN. This note estimates one piece (the below-level Type I
piece, corrected and independently reviewed on 2026-09-09)
and exhibits the rest with exact sums,
trivial sizes and the first unmatched hypothesis per source.** It is lane A's
second checkpoint of 2026-09-08, dispatched from e90d49b after the truncation
T^top=O_(A,eps)(x/log^A x) of
[centered-discrepancy-estimate.md](centered-discrepancy-estimate.md) section 3a
was accepted ([research-round-validation.md](research-round-validation.md)
section 7).

    Lane / stable question id: A (second checkpoint) / Q-fixed-endpoint-discrepancy
    Starting commit / report commit or shared-checkout paths: e90d49b, shared checkout; research/fixed-endpoint-discrepancy.md, research/fixed-endpoint-discrepancy-validation.js
    Disposition / exact claim / unproved hypotheses: exact three-piece reduction from accepted inputs; T_I^low=O_(A,eps')(x/log^A x), corrected and accepted after the independent 2026-09-09 reading (g truncated at (log x)^L, both tails paid); B (Type II below level plus the band) unestimated: the recorded parity object
    Changed step compared with the reviewed baseline: the fixed-endpoint object is split at e_0=floor(x^(1/2-eps')) and the cofactor Mobius is decomposed by Vaughan's identity; the density projection of both parts is evaluated; the consumer is restated as S=C_2x+B+o(x); after V4, the coprimality expansion in the Type I piece is truncated at g<=(log x)^L so that every BV modulus is at most x^(1/2-eps'/3)(log x)^L, and the two g-tails are bounded in section 4.1
    Source theorem and first unmatched hypothesis, if any: none imported beyond (BV*), (3a.9), PNT; for the band, every source in section 3 fails at absolute values over all moduli near x^(1/2+eps') in one fixed class, or at the signed weight
    Validation command, falsifier, result and compute used: node research/fixed-endpoint-discrepancy-validation.js (0.5 s, one core); exact identities at x=2^10..2^16 pass, deletion controls fire, density and multiplicity formulas checked finitely; no asymptotic step is tested
    Independent reviewer / disposition: the 2026-09-09 integration review reconstructs the repaired tails, density, multiplicity and uniform-mean application; accepts (4.1) with the bookkeeping corrections below. The original q<=e_0UV claim remains refuted by the retained witness. See research-round-validation.md section 13.
    Full-consumer payoff and unpaid complement: none; the unpaid complement is B, of elementary size O(x log^5 x), required >= -(C_2-1/200)x+o(x)
    Proposed shared-record changes / next bounded obligation: section 7; section 8

## 1. Question, disposition and what remains open

Question: split D^(e_1) at a level e_0=x^(1/2-eps'), say what estimate the
below-level part needs for f(n)=Lambda(n-2)mu(n) in the progressions
n=0 (mod e) on the fixed interval, name the piece an existing theorem
estimates, define the band count with its density and clipped endpoints,
and give one bounded attempt.

Disposition. The split, the density projections and the Vaughan
three-piece decomposition are exact and finitely checked. The below-level
Type I piece is estimated in section 4.1 by the accepted inputs of the
truncation proof; second reader V4 found its first version's modulus
bound false, the correction (truncation of the coprimality divisor with
both tails paid) was applied on 2026-09-08, and the corrected derivation
was independently reviewed and accepted on 2026-09-09 with the bookkeeping corrections below. Everything else is exhibited: the below-level Type II piece and
the band together form one sum B with S(x)=C_2x+B(x)+O_A(x/log^A x). B
is a shifted-prime bilinear remainder carrying one Mobius factor on a
long variable, the same family as B(x) of
[prime-detection-spec.md](prime-detection-spec.md) (13) and the residual
of [shifted-prime-decomposition.md](shifted-prime-decomposition.md), with
different coefficients and ranges. No theorem with matched hypotheses
estimates any part of it; the stop rule of the assignment applies and the
pass stops at the exact sum.

Open: D^(e_1)>=-4x/25+o(x), equivalently
B+2C_2M>=-4x/25+o(x). Using M<=A_2 x/2 and
C_2(1-A_2)>33/200, this implies B>=-(C_2-1/200)x+o(x).
The converse does not follow: a lower value of M can violate the D
margin while that B bound holds. Both are sufficient for infinitude on
unbounded dyadic scales; the general fixed-c_0 consumer (H_B) is also
OPEN. The regression is a logical counterexample to the claimed
equivalence, not an arithmetic counterexample to either target.

## 2. Exact statement

Notation of the handoff and of centered-discrepancy-estimate section 1:
x=2^j, J=(x/2,x], Lambda standard (prime powers included), f(n)=Lambda(n-2)mu(n),
M=sum_{n in J} f(n), F_1:=sum_{n in J} f(n) log n, C_2 the twin constant,
fixed 0<eps<1/50, e_1=floor(x^(1/2+eps)), and

\[
 \mathcal D^{(e_1)}(x)=\sum_{\substack{e<e_1\\ e\ \mathrm{odd}}}\mu(e)
 \sum_{n\in J}\Bigl(\mathbf 1_{e\mid n}-\frac1{\varphi(e)}\Bigr)f(n)\log\frac en .
\]

Accepted inputs used below, at their stated scopes: (12) of
[moving-cutoff-parity.md](moving-cutoff-parity.md),
S=C_2x-2C_2M+D_y+O_A(x/log^A x); its (11), the two odd Mobius means
S_0(u):=sum_{e<u odd}mu(e)/phi(e)=O_A(log^-A u) and
S_1(u):=sum_{e<u odd}mu(e)log e/phi(e)=-2C_2+O_A(log^-A u);
(3a.1), D_y=D^(e_1)+O_(A,eps)(x/log^A x); the prefix-form prime BV (BV*)
and the uniform Mobius mean (3a.9) of centered-discrepancy-estimate
section 3a; the q=1 prime number theorem psi(t)=t+O_A(t log^-A t)
([Tao, Notes 2, Exercise 64](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/)).
Also sum_{n in J}|f(n)|<=sum_{n in J}Lambda(n-2)=O(x).

### 2.1 The level and the parameters

Fix eps' with 0<eps'<1/2 and put e_0:=floor(x^(1/2-eps')). Choice for
this note: eps'=eps, so the band [e_0,e_1) is the symmetric power window
x^(1/2-eps)<=e<x^(1/2+eps) around the square root. Reason: the identities
below hold for every eps'; the below-level Type I estimate needs only that
e_0 times the Vaughan cutoffs stays a fixed power below x^(1/2), which
U=V=floor(x^(eps'/3)) secures for every eps'; a larger eps' widens the
band, which no inspected source covers, while a smaller eps' pushes the
Type II threshold U toward 1, where the Type II piece contains the pure
shifted-prime Mobius sums with tiny cofactors. Neither side is filled, so
eps'=eps keeps all three pieces present at fixed positive power widths and
uses (BV*) and (3a.9) exactly as accepted. Nothing below depends on the
value beyond 0<eps'<1/2. Cofactor cutoffs: U=V=floor(x^(eps'/3)).

### 2.2 The split and the two density projections

For a range R of odd e, write D_R, P_R, Q_R for the sums over e in R of
the bracket, of its progression part and of its density part:

\[
 \mathcal D_R=P_R-Q_R,\qquad
 P_R=\sum_{e\in R}\mu(e)\sum_{\substack{n\in J\\ e\mid n}}f(n)\log\frac en,\qquad
 Q_R=\sum_{e\in R}\frac{\mu(e)}{\varphi(e)}\bigl(M\log e-F_1\bigr).
\]

With low:={e<e_0} and band:={e_0<=e<e_1}, D^(e_1)=D_low+D_band exactly.

**Flip (exact; centered-discrepancy-estimate (4) at a fixed endpoint).**
For odd squarefree e and n=em, mu(e)mu(em)=mu(m)1_((e,m)=1) and
log(e/n)=-log m, so with the cofactor interval
I_e:=(x/(2e),x/e] cap Z (integer endpoints floor(x/(2e))<m<=floor(x/e)),

\[
 P_R=-\sum_{\substack{e\in R\\ e\ \mathrm{odd},\ \mu^2(e)=1}}
 \ \sum_{\substack{m\in I_e\\ (m,e)=1}}\mu(m)\log m\,\Lambda(em-2). \tag{2.1}
\]

**Density projections (from (11)).** Q_R=M(S_1(hi)-S_1(lo))-F_1(S_0(hi)-S_0(lo))
for R=[lo,hi). Since log e_0>=(1/2-eps'-o(1))log x, |M|=O(x) and
|F_1|=O(x log x),

\[
 Q_{\rm low}=-2C_2M+O_A(x\log^{1-A}x),\qquad Q_{\rm band}=O_A(x\log^{1-A}x). \tag{2.2}
\]

Hence, exactly up to these accepted errors,

\[
 \mathcal D^{(e_1)}=2C_2M+P_{\rm low}+P_{\rm band}+O_A(x\log^{1-A}x). \tag{2.3}
\]

### 2.3 The band count, its density and the clipped endpoints

Two exact arrangements of P_band, both used in section 4.3.

*Modulus e, cofactor m.* For odd squarefree e in [e_0,e_1) define

\[
 N(e):=\sum_{\substack{n\in J\\ n\equiv0\ (e)}}f(n)\log\frac ne
 =\mu(e)\sum_{\substack{m\in I_e\\ (m,e)=1}}\mu(m)\log m\,\Lambda(em-2),\qquad
 \kappa(e):=\frac{F_1-M\log e}{\varphi(e)},
\]

so that D_band=-sum_{e_0<=e<e_1, e odd}mu(e)(N(e)-kappa(e)). The n-interval
is the full J, unclipped, because e_1<=x/(2y) for large x (the accepted
truncation's assumption). The cofactor runs over
I_e subset (x/(2e_1), x/e_0] subset (x^(1/2-eps)/2, 2x^(1/2+eps')].

*Modulus m, cofactor e.* Exchanging the order in (2.1), with n=em,

\[
 P_{\rm band}=-\sum_{x/(2e_1)<m\le x/e_0}\mu(m)\log m
 \sum_{\substack{n\in I_m,\ n\equiv0\ (m)\\ (n/m,\,m)=1,\ \mu^2(n/m)=1,\ n/m\ \mathrm{odd}}}\Lambda(n-2),\qquad
 I_m:=J\cap[e_0m,\,e_1m)=(l_m,u_m]\cap\mathbb Z, \tag{2.4}
\]
\[
 l_m=\max(x/2,\ e_0m-1),\qquad u_m=\min(x,\ e_1m-1).
\]

These exact endpoints include the integer boundary: I_m is the full J
if and only if e_1m>=x+1 and e_0m<=x/2+1. Otherwise use the displayed
max/min endpoints, with any empty interval contributing zero. Expanding mu^2(n/m)=sum_{b^2|n/m}mu(b) with b odd and
1_((n/m,m)=1)=sum_{g|(n/m,m)}mu(g) as in section 3a.1, the inner sum is
sum_{b,g}mu(b)mu(g) sum_{n in I_m, n=0 (m[b^2,g])}Lambda_0(n-2) plus the
single power-of-two atom, with moduli q=m[b^2,g] up to
2x^(1/2+eps')(log x)^(3L) after the truncation b,g<=(log x)^L of 3a.3. Its
main term is |I_m| sum_{b,g}mu(b)mu(g)/phi(m[b^2,g]), the density of 3a.2;
this is the "kappa" of the modulus arrangement, and |I_m| is monotone on
each of the three m-ranges.

Trivial size of the band. Counting multiples in (2.1) and using
Lambda<=log x gives O_(eps,eps')(x log^3 x). Brun–Titchmarsh
improves this to O_(eps,eps')(x log^2 x) for fixed eps<1/50, since
e<x^(1/2+eps) and the class -2 is reduced for odd e; proper powers
are paid separately. Reaching O(x) from this upper bound requires two
logarithms, with a constant and the appropriate sign; a constant-factor
improvement per block would not suffice.

### 2.4 Vaughan's identity for the cofactor Mobius below the level

Identity (V), valid at every m>=1 ([mobius-bv-derivation.md](mobius-bv-derivation.md),
checked exactly to 10^5 there and to 4096 here):

\[
 \mu=\mu_{>U}*\mu_{>V}*1-\mu_{\le U}*\mu_{\le V}*1+\mu_{\le U}+\mu_{\le V}.
\]

For e<e_0 and m in I_e, m>x/(2e_0)>=x^(1/2+eps')/2>max(U,V), so the two
linear terms vanish. Put c(r):=sum_{dk=r, d<=U, k<=V}mu(d)mu(k), |c(r)|<=tau(r),
supported on r<=UV, and gamma_V(b):=sum_{k|b, k>V}mu(k), |gamma_V(b)|<=tau(b).
Then exactly

\[
 P_{\rm low}=T_I^{\rm low}+T_{II}^{\rm low}, \tag{2.5}
\]
\[
 T_I^{\rm low}=\sum_{\substack{e<e_0\\ e\ \mathrm{odd},\ \mu^2(e)=1}}\ \sum_{r\le UV}c(r)
 \sum_{\substack{m\in I_e,\ r\mid m\\ (m,e)=1}}\log m\,\Lambda(em-2), \tag{2.6}
\]
\[
 T_{II}^{\rm low}=-\sum_{\substack{e<e_0\\ e\ \mathrm{odd},\ \mu^2(e)=1}}\ 
 \sum_{\substack{a>U,\ b>V,\ ab\in I_e\\ (ab,e)=1}}\mu(a)\gamma_V(b)\log(ab)\,\Lambda(eab-2). \tag{2.7}
\]

Ranges in (2.7): a in (U, x/(eV)], b in (V, x/(eU)]; so a runs from
x^(eps'/3) up to x^(1-eps'/3) as e and b vary. Heath-Brown's identity for
mu (the 1/zeta analogue of his identity for Lambda, K pieces
mu_{<=Z}^{*j}*1^{*(j-1)}) yields the same two classes with a movable
boundary; the balanced region, both factors of the cofactor near a
fixed power, is present under every such identity, as
[heath-brown-edges.md](heath-brown-edges.md) records for Lambda. It is not
used further here.

**What the below-level part needs.** In the flipped form, the twisted
sequence f(n) in the progression n=0 (mod e) on the fixed interval J is
the cofactor sum sum_{m in I_e,(m,e)=1}mu(m)log m Lambda(em-2). After (V),
the Type I part asks for primes n-2 in the reduced class -2 modulo
e[r,g]<=e_0UVG=x^(1/2-eps'/3)(log x)^L, after truncating the coprimality
divisor at g<=G (section 4.1), with the signs carried by c(r) and evaluated
through Mobius means (section 4.1); the Type II part asks for the
bilinear sum (2.7). No theorem for f itself in progressions is used.

### 2.5 The reduction and the consumer

Combining (12), (3a.1), (2.3) and (2.5),

\[
 S(x)=C_2x+T_I^{\rm low}(x)+\mathcal B(x)+O_A(x\log^{1-A}x),\qquad
 \mathcal B:=T_{II}^{\rm low}+P_{\rm band}, \tag{2.8}
\]

with the accepted inputs only. Written on n=eab with b=1 in the band,

\[
 \mathcal B(x)=-\sum_{n\in J}\Lambda(n-2)\,W(n),\qquad
 W(n)=\sum_{\substack{eab=n,\ e\ \mathrm{odd},\ \mu^2(e)=1\\ (ab,e)=1}}\mu(a)\log(ab)
 \Bigl[\mathbf 1_{e<e_0}\mathbf 1_{a>U}\gamma_V(b)+\mathbf 1_{e_0\le e<e_1}\mathbf 1_{b=1}\Bigr]. \tag{2.9}
\]

By the reviewed section 4.1, S=C_2x+B+O_A(x/log^A x), and then

- the handoff consumer D^(e_1)>=-4x/25+o(x) is B+2C_2M>=-4x/25+o(x);
- the direct twin consumer S>=x/200+o(x) is B>=-(C_2-1/200)x+o(x);
- the first implies the second through 2C_2M<=C_2A_2x+o(x), which is how
  the fixed fraction 4/25 was obtained in moving-cutoff-parity (14)-(16).

**Named hypothesis (H_B), all quantifiers.** With eps, eps', U, V, e_0, e_1
as fixed above and B as in (2.9): there exist c_0>0 and an unbounded set
of j such that B(2^j)>=-(C_2-c_0)2^j+o(2^j). This is a conditional
sufficient statement, not a theorem; under section 4.1 it is equivalent to
S(x)>=c_0x+o(x) on those scales. The weaker margins of handoff section 3
(c_0x/log^K x) transfer verbatim.

For a safe elementary size comparison, (2.9) gives
|T_II^low|<=log x sum_(n in J) Lambda(n-2)tau_4(n)
<<x log^5 x, using Lambda<=log x and sum_(n<=x)tau_4(n)<<x log^3 x.
The band has the O_(eps,eps')(x log^2 x) bound above. Thus B=O(x log^5 x)
without a weighted Titchmarsh import. The previously stated O(x log^4 x)
was not justified by applying Brun–Titchmarsh to every divisor class;
large moduli must be treated separately for that stronger claim. No
argument here needs it. The required lower bound has size
-(C_2-c_0)x, with the sign carried by mu(a) and, in the band, by mu(m).

## 3. Prior work, novelty and the source hypothesis matrix

Nothing here is claimed new. Vaughan's identity for mu and the Type I/II
split are standard; the flip is the reverse of Murty–Vatwani's divisor
switch ([moving-cutoff-parity.md](moving-cutoff-parity.md) section 1); the
one-Mobius-factor shifted-prime hypothesis is Murty–Vatwani's EH_{mu_2}
and Friedlander–Iwaniec's hypothesis (B) at a_n=Lambda(n-2)
([consumer-comparison.md](consumer-comparison.md) sections 1 and 5). The
identity (2.8) is the classical reduction of
[prime-detection-spec.md](prime-detection-spec.md) (13) with the roles
exchanged: there Lambda(n) is decomposed and mu(d) sits on d>U; here mu(n)
is decomposed through its cofactor and Lambda(n-2) is untouched. The two
remainders B(x) and B differ in coefficients and ranges, not in kind.

Local records read before this pass: OUTCOMES and QUESTIONS entries for
Q-centered-discrepancy-estimate, Q-moving-cutoff-parity, Q-consumer-comparison,
Q-mobius-bv-derivation, Q-shifted-prime-decomposition, Q-prime-detection-inputs,
Q-heath-brown-edges, Q-shifted-prime-mobius-sums; SEARCH-CONVENTIONS rows
for the band of D_y and for the twisted sequence. No new literature search
was run; the source matrix of centered-discrepancy-estimate section 4 was
matched against the actual band objects of section 2.3 and 4.3 here.

| Source, locator (as read in the existing matrix) | Statement it makes | Band object it is matched against | First unmatched hypothesis |
|---|---|---|---|
| Tao, Notes 3, Theorem 17, prefix form (BV*) | absolute values over all q<=x^(1/2)log^-B x, reduced classes, ineffective | modulus arrangement (2.4), moduli m[b^2,g] | level: the band moduli reach 2x^(1/2+eps')(log x)^(3L); below x^(1/2-eps'/3) it is used in section 4.1 |
| [Maynard I, arXiv:2006.06572v2](https://arxiv.org/abs/2006.06572) Theorem 1.1 | absolute values over q_1q_2 with Q_1Q_2^2<x^(1-100e), Q_1^12Q_2^7<x^(4-100e), Q_1^20Q_2^19<x^(10-100e) | modulus arrangement with the cofactor Mobius decomposed again on m: Type I moduli r·s·b^2g, Type II moduli a·b'·b^2g | with Q_2 the band factor x^(1/2+eps'), Q_1Q_2^2>x fails; with Q_1 the band factor, Q_1^12>x^6>x^4 fails; Cor. 1.2 admits a divisor in (x^(2eps'+eta), min(x^(1/10-7eps'/5-eta),x^(1/2-19eps'-eta))); both its lower and upper range constraints are required. A lower bound on the smaller factor alone does not establish coverage; outside that sufficient range this corollary supplies no bound |
| Maynard I, Corollary 1.3 | all but 18·delta·Q·phi(a)/a moduli in [Q,2Q], Q=x^(1/2+delta), absolute values | modulus arrangement, all m in a dyadic block | the exceptional moduli carry, with the log weight, trivial mass of order 18·delta·x per block; summed over the blocks delta in (0,eps'] this is of order eps'^2 x log x, above O(x); the signed weight mu(m) on the exceptional set is the obstruction, as recorded |
| BFI II Theorems 3, 5* (restated in Maynard I Lemmas 8.4-8.5; primaries unread) | absolute values over q~Q in (x^(1/2)log^-A x, x^(2/3-e)) for triple convolutions of the prime variable with range constraints | (2.9) read as the sequence n=p+2 with a triple-convolution weight e·a·b | the sequence here is Lambda(n-2) itself in the progression, not a convolution; the convolution sits on the modulus side, and the bad shapes of Maynard I section 3.2 are uncovered in any case |
| BFI II + III Theorem A (as in Maynard I section 1.1; primaries unreached) | no absolute values, Q=x^(1/2+delta), fixed a: sum_{q~Q}(pi(x;q,a)-pi(x)/phi(q))=O(delta^2 x/log x+x(log log x)^O(1)/log^3 x) | modulus arrangement after Vaughan on mu(m): Type I pieces with modulus r·s·b^2g, s unweighted in a block, fixed class -2 | shape matches only for s unweighted and for all q in [Q,2Q], not for multiples of r·b^2g; and a delta^2 saving per block leaves, after the log weight and the (eps+eps')log x/log 2 blocks, order eps'^3 x log x·(log UV)^2 from sum_r tau(r)/r, above O(x); the signed c(r), mu(b), mu(g) are then summed in absolute value |
| BFI I Theorem 10, Maynard II Theorem 1.1 | well-factorable (triply well-factorable) lambda_q, fixed a, level x^(4/7-e) (x^(3/5-e)) | modulus arrangement: lambda_q=mu(m)log m·1_{m in range} or its Vaughan pieces 1_{r|m}log m | not well-factorable (recorded); the Type I piece 1_{r|m}·1_{m~Q} is a convolution of an indicator with an indicator of a long range, which is not a factorization into 1-bounded pieces of every prescribed pair of supports |
| [Polymath, arXiv:1402.0811v3](https://arxiv.org/abs/1402.0811) Theorem 1.1 | x^delta-smooth squarefree moduli, level 1/2+7/300 | modulus arrangement | the band moduli m are arbitrary squarefree; the smooth sub-family carries no sign advantage |
| [Drappeau, arXiv:1504.05549v4](https://arxiv.org/abs/1504.05549), Titchmarsh sum | unweighted modulus average near x^(1/2) with log-power error | Type I pieces on the modulus | window of log-power width around x^(1/2) only; the band has power width |
| Murty–Vatwani Theorem 1.1, EH_{mu_2}(x^(1/2+eps)) | hypothesis, all classes, all prefixes | D^(e_1) directly | it is a hypothesis; (H_B) is one-sided and one-class, weaker, and unproved |

UNREAD in this pass: BFI I, BFI III, Fouvry 1985 primaries (unreached on
2026-09-08 per the existing matrix); no new fetch was attempted, since no
row's shape matched before its first hypothesis.

## 4. Proof of the Type I estimate and the decisive exhibited remainder

### 4.1 Proposition (corrected and reviewed 2026-09-09)

V4 found that the first version bounded the modulus q=e[r,g] by e_0UV,
which is false for g>1: g runs over every divisor of e and [r,g]>=g, so
q reaches e^2 at g=e, r=1 (at x=2^16, e_0=212, U=V=3: e=g=209, r=1 gives
q=43681>1908; validator section 7). The handler's first reading did not
catch this. The repair below truncates g at G:=(log x)^L, exactly as 3a.3
truncates b and g, and pays both tails. The 2026-09-09 independent reading
accepts the repair after correcting the log powers and atom bound below.

For every fixed A>0 and 0<eps'<1/2, with U=V=floor(x^(eps'/3)) and x>=x_0(A,eps'),

\[
 T_I^{\rm low}(x)=O_{A,\epsilon'}\bigl(x\log^{-A}x\bigr). \tag{4.1}
\]

Constants are ineffective (Siegel through (BV*) and (3a.9)).

*Step 1: powers of two and coprimality.* Let Lambda_0 be Lambda with
Lambda_0(2^a)=0. Terms of (2.6) with em-2 a power of two have em=x/2+2=:n_0
(one value, as in 3a.1). Their total is at most
log 2·log x·sum_{e|n_0}sum_{r|n_0/e}|c(r)|tau(e)<=2 log 2·log x·tau(n_0)^3(UV)^(1/2)<<_delta x^(3delta+eps'/3)log x,
using |c(r)|<=tau(r)<=2 r^(1/2) and tau(n)<<_delta n^delta; with delta=1/100
this is O(x^(1/4)). In the remaining terms em is odd, so e, m, r are odd.
Expand 1_((m,e)=1)=sum_{g|(m,e)}mu(g); with r|m and g|m the condition is
[r,g]|m, and [r,g]=rg/(r,g) (validator section 7). Fix L>0, put
G:=(log x)^L and split the g-sum into the body g<=G and the tail g>G:

\[
 T_I^{\rm low}=T_I^{\rm body}+T_I^{\rm tail}+E_2,\qquad
 T_I^{\rm body}=\sum_{\substack{e<e_0\\ e\ \mathrm{odd},\ \mu^2(e)=1}}\sum_{r\le UV}c(r)\sum_{\substack{g\mid e\\ g\le G}}\mu(g)
 \sum_{\substack{n\in J\\ n\equiv0\ (e[r,g])}}\log\frac ne\,\Lambda_0(n-2), \tag{4.2}
\]

and T_I^tail the same with g>G. In the body the modulus q:=e[r,g] is odd
(so the class -2 is reduced) and satisfies, since [r,g]<=rg,

\[
 q\le e_0\,UV\,G\le x^{1/2-\epsilon'/3}(\log x)^L=:Q_0'. \tag{4.2'}
\]

*Step 1a: the tail on the progression side.* Each term of T_I^tail is at
most log x·log x·(number of m in I_e with [r,g]|m)<=log^2x·(x/(2e[r,g])+1),
and x/(e[r,g])=x(r,g)/(erg). Writing (r,g)=sum_{d|(r,g)}phi(d),

\[
 \sum_{r\le UV}\frac{\tau(r)(r,g)}{r}=\sum_{d\mid g}\varphi(d)\sum_{\substack{r\le UV\\ d\mid r}}\frac{\tau(r)}{r}
 \le\sum_{d\mid g}\tau(d)\sum_{r'\le UV}\frac{\tau(r')}{r'}\ll\tau(g)^2\log^2x,
\]

using tau(dr')<=tau(d)tau(r') and sum_{d|g}tau(d)=tau_3(g)<=tau(g)^2. Then
sum_{g|e, g>G}tau(g)^2/g<=tau(e)^3/G (tau(g)<=tau(e), tau(e) divisors) and
sum_{e<e_0}tau(e)^3/e<<log^8x, so

\[
 |T_I^{\rm tail}|\le\log^2x\sum_{e<e_0}\sum_{\substack{g\mid e\\ g>G}}\sum_{r\le UV}\tau(r)\Bigl(\frac{x(r,g)}{2erg}+1\Bigr)
 \ll\frac{x\log^{12}x}{G}+x^{1/2-\epsilon'/3}\log^4x, \tag{4.2''}
\]

For the weighted count, sum_{r<=UV}|c(r)|<=sum_{r<=UV}tau(r)
<<UV log x and sum_{e<e_0}tau(e)<<e_0 log x. The log^2 weight
therefore gives e_0UV log^4 x, absorbed by the fixed power gap.

*Step 2: the progression sum (body only).* With D(q):=sup_{(a,q)=1}sup_{2<=t<=x}|Delta_q(t;a)|
as in 3a.2, partial summation against the increasing weight log(t/e)<=log x
gives, for each body modulus q<=Q_0', exactly as (3a.5) with the constant 2
replaced by 3 for the extra variation term,

\[
 \sum_{\substack{n\in J\\ n\equiv0\ (q)}}\log\frac ne\,\Lambda_0(n-2)
 =\frac1{\varphi(q)}\sum_{n\in J}\log\frac ne+\theta_{e,q},\qquad
 |\theta_{e,q}|\le 3\log x\,D(q)+O_{A_3}\Bigl(\frac{x\log^{1-A_3}x+\log^3x}{\varphi(q)}\Bigr)+O(\log^2x). \tag{4.3}
\]

The middle term replaces Lambda(n-2) by 1 in the main term through the q=1
PNT under the log weight, and pays the Lambda_0 and coprime-sum
corrections of 3a.2.

*Step 3: the coprime density.* For odd squarefree e and odd r, exactly

\[
 \sum_{g\mid e}\frac{\mu(g)}{\varphi(e[r,g])}=\frac{\mathbf 1_{(r,e)=1}}{e\,\varphi(r)}. \tag{4.4}
\]

Proof: prime by prime, since 1/phi is multiplicative and g runs over the
divisors of the squarefree e. At p|e with p|r, the p-part of e[r,g] is p^(v_p(r)+1)
whether or not p|g, so the two choices cancel and the sum is zero. At p|e
with p∤r, the p-part is p when p∤g and p^2 when p|g, contributing
1/(p-1)-1/(p(p-1))=1/p. At p∤e the p-part is that of r, contributing
1/phi(p^k) for p^k||r. The product over p|e of 1/p is 1/e because e is
squarefree, which gives (4.4). The validator checks it on 4128 pairs
(e,r), including e=3, r=3 (value 0) and e=15, r=1 (value 1/15).

*Step 3a: the tail on the main-term side.* The main term of the body is
the full density (4.4) minus the tail density:
sum_{g|e, g<=G}mu(g)/phi(e[r,g])=1_((r,e)=1)/(e phi(r))-sum_{g|e, g>G}mu(g)/phi(e[r,g]).
Since phi([r,g])=phi(rg)/(r,g)>=phi(r)phi(g)/(r,g) and phi(e[r,g])>=phi(e)phi([r,g]),
the tail density contributes at most, with sum_{n in J}log(n/e)<=(x/2)log x,

\[
 E_g^{\rm main}\le\frac x2\log x\sum_{e<e_0}\frac1{\varphi(e)}\sum_{\substack{g\mid e\\ g>G}}\frac1{\varphi(g)}\sum_{r\le UV}\frac{\tau(r)(r,g)}{\varphi(r)}
 \ll x\log^3x\,(\log\log x)^2\,\frac1G\sum_{e<e_0}\frac{\tau(e)^3}{e}\ll\frac{x\log^{11}x(\log\log x)^2}{G}, \tag{4.4'}
\]

by the same divisor sums as Step 1a with phi in place of the plain
product (sum_{r'}tau(r')/phi(r')<<log^2x; g/phi(g) and e/phi(e) are
O(log log x)). Hence (4.5)-(4.6) below, which use the full density (4.4),
survive with the extra error (4.4').

*Step 4: the main term.* Inserting (4.3)-(4.4) into (4.2), with
r=dk, d<=U, k<=V, (dk,2e)=1, and 1/phi(dk)=(1/(phi(d)phi(k)))prod_{p|(d,k)}(p-1)/p,

\[
 {\rm Main}_I=\sum_{\substack{e<e_0\\ e\ \mathrm{odd},\ \mu^2(e)=1}}\frac1e\sum_{n\in J}\log\frac ne
 \sum_{\substack{k\le V\\ (k,2e)=1}}\frac{\mu(k)}{\varphi(k)}\,P_0^{(k,e)}(U),\qquad
 P_0^{(k,e)}(u):=\sum_{d\le u}\frac{\mu(d)h_{k,e}(d)}{\varphi(d)}, \tag{4.5}
\]

where h_{k,e} is multiplicative on squarefree d with h(p)=0 for p|2e,
h(p)=(p-1)/p for p|k (then p∤2e automatically), h(p)=1 otherwise. This is
exactly the weight h_{b,g} of (3a.6) at the pair (b,g)=(k,e): k odd, e odd
squarefree, so (3a.9) applies and gives |P_0^{(k,e)}(U)|<=C_A tau(e)^2 log^-A U
uniformly. With log U=(eps'/3)log x-O(1), sum_{n in J}log(n/e)<=(x/2)log x,
sum_{k<=V}1/phi(k)<<log x and sum_{e<e_0}tau(e)^2/e<<log^4 x,

\[
 |{\rm Main}_I|\ll_{A,\epsilon'}x\log^{6-A}x. \tag{4.6}
\]

*Step 5: the BV error and the multiplicity.* Let
c'(q):=sum_{(e,r,g): e[r,g]=q, e odd squarefree, g|e, r<=UV}|c(r)|. Given e|q
and g|e, the r with [r,g]=q/e divide q/e, so there are at most tau(q/e)
of them, each with |c(r)|<=tau(r)<=tau(q); hence
c'(q)<=sum_{e|q}tau(e)tau(q/e)tau(q)<=tau(q)^4 (validator: 3000 moduli,
the bound is attained at q=1; the bound does not use g<=G). Then, with
D(q)<=4x log x/phi(q) and sum_{q<=Q_0'}tau(q)^8/phi(q)<<(log x)^256 by
Mertens, Cauchy–Schwarz and (BV*) at precision A_1 and level
Q_0'=x^(1/2-eps'/3)(log x)^L (the rounding derivation of 3a.3 applies
verbatim: Q_0'<=t'^(1/2)log^-B t' for x>=x_0(A_1,eps',L) because
x^(-eps'/3) dominates every logarithmic power),

\[
 E_{BV}:=3\log x\sum_{q\le Q_0'}c'(q)D(q)\le3\log x\Bigl(\sum_{q\le Q_0'}\tau(q)^8D(q)\Bigr)^{1/2}\Bigl(\sum_{q\le Q_0'}D(q)\Bigr)^{1/2}
 \ll x\log^{1+(257-A_1)/2}x. \tag{4.7}
\]

*Step 6: the remaining terms of (4.3).* Using phi(e[r,g])>=phi(e)phi(r),
sum_{e<e_0}tau(e)/phi(e)<<log^2x, sum_{r<=UV}tau(r)/phi(r)<<log^2x and the
weighted triple count O(e_0 UV log^2 x),

\[
 E_P\ll x\log^{5-A_3}x+x^{1/2-\epsilon'/3}\log^4x. \tag{4.8}
\]

*Step 7: total.* Choose L:=A+13, A_3:=A+5 and A_1:=2A+260, and apply (4.6)
with A+6 in place of A. Collecting (4.2''), (4.4'), (4.6), (4.7), (4.8) and
the atom,

\[
 |T_I^{\rm low}|\ll_{A,\epsilon'}\frac{x\log^{12}x}{\log^{A+13}x}+\frac{x\log^{11}x(\log\log x)^2}{\log^{A+13}x}
 +x\log^{-A}x+x\log^{-A-1/2}x+x\log^{-A}x+x^{1/2-\epsilon'/3}\log^4x+x^{1/4}
 \ll_{A,\epsilon'}x\log^{-A}x,
\]

which is (4.1). The threshold x_0 depends on A, eps' and L through the
level condition in Step 5.

No expansion of mu^2(e) is needed in this piece (the squarefree filter on
e is a filter, not a weight), but the coprimality expansion is not finite
in the relevant sense: g runs over all divisors of e, and only its
truncation at G keeps the moduli inside (BV*); both g-tails are paid
above. Falsifier for a reader: (4.4), the two tail bounds (4.2'') and
(4.4'), the multiplicity bound in step 5, and the identification of (4.5)
with (3a.9) at (b,g)=(k,e) carry the argument; the finitely checkable
parts are checked, none is thereby proved asymptotically. The finite ratio T_I^low/x=4.49 at x=2^16 with U=V=3
(validator) is bookkeeping at a fixed tiny cutoff and does not bear on
(4.1), whose cutoffs grow with x.

### 4.2 The below-level Type II piece is exhibited, not estimated

(2.7) is a sum over n=eab in J of Lambda(n-2) against mu(a) on
a in (U, x/(eV)] and the divisor-bounded cofactor c=eb with coefficient
(mu^2·1_odd·1_{<e_0} * gamma_V)(c)·1_((ab,e)=1), weight log(ab). Two
sub-ranges are already recorded elsewhere as unfilled: when c is below
x^(1/2-eps') and a is long, the a-sum is a shifted-prime Mobius sum in
the progression n=0 (mod c) ([shifted-prime-mobius-sums.md](shifted-prime-mobius-sums.md),
the object of M itself); when a and c are both above a fixed power it is
the bilinear form of [prime-detection-spec.md](prime-detection-spec.md) (11)
and [shifted-prime-decomposition.md](shifted-prime-decomposition.md) (2)
with different coefficients. No estimate is attempted; the stop rule
applies.

### 4.3 The band is exhibited in both arrangements, not estimated

In the modulus arrangement (2.4), the whole apparatus of section 3a
applies to the band verbatim except the BV step: the main term
sum_m mu(m)log m|I_m|sum_{b,g}mu(b)mu(g)/phi(m[b^2,g]) is
O_A(x log^-A x) by (3a.9) and Abel summation over each of the three
monotone m-ranges (as (3a.15)-(3a.16)), the tails in b,g are (3a.10)-(3a.11),
and the error is E_BV^band=3 log x sum_{q<=Q_1}c(q)D(q) with
Q_1=2x^(1/2+eps')(log x)^(3L), c(q)<=tau(q)^3 and D the prefix supremum
(the clipped intervals are differences of two prefixes). The sign mu(m)
is used only in the main term. One stronger sufficient input for the band in this
arrangement is the unsigned statement

\[
 \sum_{\substack{q\le 2x^{1/2+\epsilon'}(\log x)^{3L}\\ q\ \mathrm{odd}}}\tau(q)^3\sup_{t\le x}|\Delta_q(t;-2)|=o\Bigl(\frac x{\log x}\Bigr), \tag{4.9}
\]

one class, absolute values, level a fixed power beyond the square root.
(4.9) is a case of the Elliott–Halberstam range beyond 1/2 in absolute
value and is not supplied by any source in section 3: the absolute-value
theorems stop at x^(1/2) or need a convenient divisor; the beyond-1/2
theorems have no absolute values or need well-factorable weights, and the
matrix records where each fails. Decomposing mu(m) once more on the
modulus (Type I: 1_{r|m}, Type II: mu_{>U}*gamma_V on m) produces the
shapes in the Maynard and BFI rows of the matrix with the unmatched
hypotheses recorded there; the accumulated log weight and the
(eps+eps')log x/log 2 dyadic blocks defeat a constant-factor saving per
block, by the count in section 2.3.

In the cofactor arrangement, the band is the balanced part of B:
both e and m within a factor x^(eps+eps') of the square root, one Mobius
sign on m, a squarefree filter on e. It is the same family as 4.2.

### 4.4 Why the pass stops

Every piece of D^(e_1) other than T_I^low and the density projections is
an instance of one family: Lambda(n-2) at shift 2 against a product of a
Mobius factor on a long variable and a divisor-bounded cofactor. That
family is the recorded unfilled input (prime-detection-spec (14),
shifted-prime-decomposition, consumer-comparison sections 1 and 5). A
shift average would not select shift 2; a Type I estimate is not the
consumer; the stronger absolute-value statement
(4.9) would suffice, but no inspected source states it. A bound for the
actual signed weights could suffice without (4.9). The exact sum is (2.9) and the required
rate is (H_B). The pass stops here, as the assignment's stop rule
directs.

## 5. Validation, falsifier and outcome

[fixed-endpoint-discrepancy-validation.js](fixed-endpoint-discrepancy-validation.js)
(0.5 s, one core, output embedded) checks at x=2^10, 2^12, 2^14, 2^16 with
eps=eps'=1/60: the split D^(e_1)=D_low+D_band and D_R=P_R-Q_R with P_R in
the flipped form (2.1) against the definition; Q_band against the two odd
Mobius means; the dual divisor identity on odd n,
P^(e_1)_odd=sum Lambda(n-2)Lambda(n)mu^2(n)+sum Lambda(n-2)mu^2(n)sum_{e'|n, e'<=n/e_1}mu(e')log e',
with the even atom bounded; Vaughan's identity (V) at every m<=4096 for
(U,V)=(3,3),(2,5),(4,6) and the three-piece split (2.5) at each pair; two
deletion controls (dropping the coprimality filter, dropping the odd
restriction) that change P_low at three or more scales; the density
(4.4) on 4128 pairs; the multiplicity bound c'(q)<=tau(q)^4 for q<=3000;
after V4, the identity [r,g](r,g)=rg for r,g<=200 and the modulus
witness at x=2^16: e=g=209, r=1 gives q=43681 above e_0UV=1908, triples
above e_0UV are counted, and with g<=G=8 no body modulus exceeds e_0UVG.
All pass. These are finite checks of exact algebra; they test no
asymptotic step, and the derivation of section 4.1 carries (4.1) alone.

Falsifier for (4.1): a defect in (4.4), in the tail bounds (4.2'') and
(4.4'), in c'(q)<=tau(q)^4, or in the application of (3a.9) at (k,e). The
first version's modulus bound was such a defect, found by V4 and
witnessed finitely. Falsifier for (2.8)-(2.9): a finite x at
which the validator's split, dual or three-piece check fails; the four
scales 2^10..2^16 all pass.
No finite computation bears on (H_B), and no census was run (zero
enumeration, per the contract). The finite ratios printed at x=2^16 are
not readings of any asymptotic quantity.

## 6. Payoff for the full twin consumer

None. The identity (2.8) restates the consumer in the classical Type I/II
shape; the Type I piece is paid at the reviewed scope and the remainder B is the
parity object. The regional statement obtained is: the below-level Type I
piece of the cofactor Mobius is O_(A,eps')(x/log^A x). The conditional
statement is: (H_B) implies S(x)>=c_0x+o(x) on unbounded dyadic scales, hence
twin-prime infinitude, using the reviewed (4.1). Nothing here narrows the
unpaid complement: B has elementary size O(x log^5 x) against a required lower
bound of size -(C_2-c_0)x.

## 7. Validation and integration

The lane validator remains the finite identity and original modulus-defect
check. The independent 2026-09-09 controls in
[research-round-validation.js](research-round-validation.js) add exact
rational checks of (4.4) including nonsquarefree r and of the consumer
implication. The proof above, not the finite values of T_I^low, establishes
(4.1). [research-round-validation.md section 13](research-round-validation.md)
owns this review; OUTCOMES and the handoff carry its current disposition.

## 8. Next move or reopening condition

The decompositions inspected here leave the exact B in (2.9) unestimated.
A useful continuation must supply a bound with its actual coefficients,
shift 2, growing ranges and a rate that pays (H_B), or a changed
representation with a quantified saving and its complement paid. Examples
of stronger sufficient inputs are (4.9) or a treatment of the exceptional
moduli in the cited Maynard range that admits the Mobius weight. These
are not necessary conditions and do not exclude a new decomposition.
A correctness concern in an accepted step is also a reason to reopen it.

Revision history: research/history/CHANGELOG.md.
