# Local completion of the handoff audit

**The sufficient twin margin is OPEN.** This continues review 20 against
the working tree based on `9be041f`. It records the mathematical checks
before integrating their corrections. It is a scoped review, not a
reproof of imported classical theorems or a certification of the corpus.

## A. Upstream reduction: checked dependencies

The local derivations in `prime-detection-spec.md`,
`polylog-fold-transfer.md` and `shifted-prime-decomposition.md` were
re-read in full, together with `mobius-bv-derivation.md`.

- The comparison sequence has mean coefficient d/phi(d) on odd
  progressions. Its divisor-series tail is summable, including repeated
  primes in d. Even d leave only powers of 2. The total comparison cost
  is O(x^(12/25) log^4 x). The first Vaughan coefficients are bounded
  by log d; partial summation costs a fixed power of log x.
- The polylogarithmic fold has mean zero separately on each gcd class.
  Expanding beta and applying prime Siegel–Walfisz uses prime powers
  above a fixed power of x, not short intervals. The excluded primes
  cost O(N log Q/V). The comparison coefficient is mu*h with
  sum |h(e)|/sqrt(e) uniformly bounded. Splitting e at sqrt(T) proves
  its quantitative mean; no estimate against Lambda(dk-2) is imported.
- The Möbius BV convolution identity is exact. Type I costs
  Q T^(2/5) log T; the character decomposition keeps the exclusion
  (n,r)=1 when q=dr. With U=V=T^(1/5), the large-conductor terms are
  T L^(11/2-C), T^(9/10)L^(13/2), Q sqrt(T)L^(11/2), L=log T.
  C=B=A+6 is sufficient. Small conductors use the excluded-prime
  Siegel–Walfisz bound with a larger fixed exponent. For its small-y
  case use the trivial bound up to T/L^D; above that log y is comparable
  with log T, so its exclusion hypothesis holds in y as required.
- In the second Vaughan step T=x/k>x^(6/25), while the moduli are
  at most x^(1/10). They remain below sqrt(T) by a fixed power.
  gcd(k,l) not dividing 2 gives no solutions. The gcd 2 case is a
  primitive progression; the gcd 1 even-modulus case uses d=2h and
  mu(2h)=-mu(h)1_(h odd), including the unique odd lift when necessary.
  Each reduced modulus has bounded multiplicity. Interval endpoints
  and logarithms lose only fixed log powers. Thus both second Type I
  pieces have the stated O_H(x/log^H x) cost.

**Source verification, not source reproof.** Koukoulopoulos's author
preliminary PDF, PDF pages 146,291,294 (one-based), contains
Corollary 13.4 and Theorems 26.2,26.6 used in the Möbius BV derivation.
The hypotheses and primitive-character maximum match the local uses.
Equation (26.3) supplies the character identity. Prefer theorem numbers
and the PDF page locations below over unverified printed pagination.

Source: [Koukoulopoulos, author preliminary text](https://dms.umontreal.ca/~koukoulo/documents/publications/primes.pdf).
SHA-256 `1445e107bba9c89db6529aeb4bca3ecf01170fc2854a675f5ca6f288c77ea0a8`.
The actual PDF page indexes checked are 145,290,293 (zero-based).
Tao Notes 3 Theorem 17 and Lemma 18 are the prime-BV/Vaughan imports;
the quantitative PNT/Möbius mean remain classical named dependencies.
No defect was found in these local deductions. No effectivity claim is
made for the Siegel–Walfisz constants.

## B. Further defects affecting research selection

### F6. Window support and mass

The exact cofactor weight is not supported on a single top dyadic block.
A term r*d with r>V and D1<d<=D0 can start near x^(1-2 eta).
For a prime p outside the band, the same r survives dilation precisely
when D1/p<d<=D0/p. In particular D1<d<=D0/p is a nonempty common
window for each fixed p and all sufficiently large x. The assertion
that every dilation leaves the support is false. Boundary terms remain;
exact band invariance does not imply exact window invariance.

For pure bands pinned at x, CRT proves the top-block mass, but does not
give the same main term on *every* block y>V. The summed counting error
is of order x^(29/100+4 eta) times logarithms. A safe lower-bound range
is y>=x^rho with rho>29/100+4 eta. The full logarithmic mass is
Theta_eta(log^3 x): use these blocks for the lower bound and
L_b(n),L'_b(n-2)<=log x for the upper bound. This does not specify a
sharp uniform eta-dependent constant.

For the unweighted top-block window/band swap, put L=2 eta log x.
Ignoring floors initially, at n=tx the available prime log-measures are
L and L+log t on both sides. CRT, followed by partial summation of
the quantitative PNT, gives

    sum_(x/2<n<=x) L_b(n)L'_b(n-2) = (1/2)L^2 x + o_eta(x log x),
    sum_(x/2<n<=x) |L_b L'_b-L_w L'_w|
      = 2 eta (1-log 2) x log x + o_eta(x log x).

Indeed the difference integral is
x integral_(1/2)^1 [-2L log t-(log t)^2]dt and
integral_(1/2)^1 -log t dt=(1-log 2)/2. For each prime pair the
intersection of all cuts is an interval, so its CRT error is O(1).
The summed errors are O(x^(29/100+4 eta)log^2 x). Floor and shift
changes contribute o_eta(x log x), since V,Z are fixed powers of x;
PNT remainders may be taken to any fixed logarithmic precision.
These statements concern unsigned weights, without mu^2 restrictions.
The old harmonic-average constant is not the natural-average constant.
The large absolute swap cost does not prove the signed swap is large.

For the full corner, no sharp leading constant is required. Its
term-wise absolute mass has order eta^4 x log^4 x for fixed eta;
the prime-cofactor subfamily has order eta^2 x log^2 x. A valid lower
bound restricts r,r' to log-width eta bands and s,s' to odd coprime
integers below x^eta/4. This puts all lower cofactor cuts below x/2.
Count odd n by CRT modulo 2rsr's'. Excluding p^2|d or p^2|e for odd p
removes at most 2 sum_(p odd) p^(-2)<1 of the main count. The error per
quadruple is O(sqrt(x/V)+sqrt(x/Z)); after summing the at most
x^(29/100+8 eta+o(1)) quadruples it is o(x). Harmonic coprimality has
a positive Euler product, so it preserves the four log factors.
For an upper bound retain gcd(rs,r's')<=2 and use at most
2x/(rsr's')+O(1). This accounts for the compatible gcd 2 case omitted
from the old main-term formula. Neither argument is uniform as eta
shrinks with x. Sharp constants and shrinking-window conclusions based
on the old formula must not be consumed.

### F7. A sufficient rate is not a necessary rate

For a family a_x(n) let T_x(y)=sum_(n<=y) a_x(n)/n. A bound at y=x
alone does not bound its top block. If sup_(y<=x)|T_x(y)|<=E_x, Abel
summation does give |sum_(n in J_x)a_x(n)|<=4x E_x.
Consequently a *uniform-prefix* bound E_x=O(log^(3-c)x), c>3, is
sufficient for o(x). Equality c=3 with a little-o bound also suffices.
The one-log worst-case loss is real, but c>3 is not necessary for all
methods or for the one-sided consumer. Direct block or absolute
scale-average inputs have different transfers. An unsigned envelope
does not establish failure of signed cancellation.

Pilatte v3, Lemma 2.3(d), §2.3, was checked at source. With the displayed
choice log x=(log H)^6, the optimistic exponent from V^(-J/2) is at most
max_(t>0) t^2 log(1/(2t))/12 = 1/(96e).
The e^(O(J)) bound is an additional cost, not a measured constant.
This is arithmetic for that displayed choice, not an upper bound on
all attainable exponents or variants of the proof. Changing the
relation between x and H changes the denominator. The paper supplies
some positive c for unweighted Liouville correlations at shift one;
it is not an imported theorem for the full Möbius corner.

Source: [Pilatte v3](https://arxiv.org/pdf/2310.19357v3),
SHA-256 `f23e885ae2c4b28d5c3afe618865f7b961e2d67607d9f224f0ca5a39a9172f12`.
The transfer's non-pretentiousness input was also checked at its source,
MRT arXiv:1503.05121 equation (1.12): M is bounded below by
(1/3-epsilon) log log X+O(1), not log log X+O(1). The prepared lift
therefore uses the safe parameter L=(log X)^(1/4), decreasing the
unspecified saving exponent by a factor of four before its mesh loss.
No effective value for the final exponent is asserted.
The bounded multiplicative lift in `prime-band-transfer.md` below also
withdraws the claim that nonmultiplicativity of mu L alone closes all
transfers. Its scale-average payoff is explicitly weaker than o(x).

### F8. Identity pieces do not establish an intrinsic edge

The Heath–Brown convolution identity and subset-sum classification are
valid. The exponent simplex has sup a=1 at j=K, all Möbius variables
of exponent 1/K and free variables of exponent zero. Exponent zero
allows subpower growth, not only bounded variables. The point is an
upper-envelope calculation for separately bounded pieces. Their signed
cancellations have not been excluded.

The old Vaughan explanation also mixed an r>V prime cofactor with an
r<=V expansion parameter. For k prime above V, the latter sum is empty.
For k=2r with r<=V prime and 2r>V (away from powers of 2), beta_V(k)=0
and the log/small-prime terms cancel exactly. Thus a formal expanded
block is not evidence of surviving mass in the original residual.

With bounded free products l,l', the actual Heath–Brown piece is
sum_(lm-l'm'=2) F(m)F'(m') log n1 log n1', not literally
F(n)F(n-2) times O(1). Its coefficients and bounded affine dilations
must be retained. A finite lower mass measurement for F alone proves
no asymptotic lower bound for this correlation.

Linnik's fixed-truncation *term-wise absolute* tail really is large,
but finite growth was not its proof. For fixed k=K+1>=2, restrict the
first k-1 factors to [2,x^(1/(2(k-1)))] and the last factor to
(x/(2d),x/d], d their product. The count is
gg_K x (log x)^(k-1). Multiplication by log n/k gives an absolute
tail gg_K x (log x)^k on J_x. This rules out discarding that tail by
a term-wise triangle inequality. It does not bound the *signed* tail
below, nor prove all reorganizations fail.

The BV exponent 1/2 in front-end tables is a supremum with logarithmic
slack. A fixed untrimmed U=V=x^(1/4) is not supplied by BV at that
exact endpoint. No new front end has been integrated into E_dagger.

### F9. Diagonal size and Holder quantifiers

The true diagonal is bounded above by
B^2 C^2 f^2 (MN/A) log^2 x from the stated coefficient sup bounds.
No uniform lower bound holds when coefficients vanish, H is empty or
endpoints coincide. The previously asserted L2 bound M log x is not
supplied by those hypotheses; fixed log powers are harmless to the
subsequent x^epsilon upper bounds. The transition-band diagonal remains
at most x^(1+o(1)), which is the only needed exponent conclusion.

Likewise ||a||_p ||Y||_(p')>=sqrt(M)||Y||_2 is false for arbitrary a.
At M=4,p=1 take a and Y to be unit vectors on distinct coordinates:
the sides are 1 and 2. For constant |a|=D it follows with the factor D
by norm monotonicity, but that restricted model does not establish a
universal ceiling for the actual arithmetic coefficient. Rademacher
averaging identifies the diagonal in expectation; nondegeneracy and
uniform lower bounds are separate obligations. The local note has
been corrected without changing its valid upper-bound lemmas.

## C. Complete the formerly unpriced joint Cauchy arrangement

Use the hypotheses and Phi of grouped-divisor-moment §1, and let
T=sum_m a_m sum_h c_h sum_u b_u K(m,u,h), |a_m|<=D.
Cauchy in (m,h) gives

    |T|^2 <= O(D^2 C^2 M/A) sum_(m,h~A)|sum_u b_u K(m,u,h)|^2.

The u1=u2 diagonal is O(B^2 f^2 MAN). For u1!=u2 write u_i=j ell_i,
(ell1,ell2)=1. The nonzero numerator is
r=sigma theta h(ell2-ell1), modulus c=j ell1 ell2. Exactly,

    gcd(r,c) <= 2 gcd(h(ell2-ell1),j) gcd(h,ell1 ell2).

For fixed h,ell1,ell2 the first gcd averages over j by the divisor
inequality in grouped-divisor-moment (9). Then the second averages
over h, for powers 1/2 and 1, by the same inequality. In a j band
[J,2J), completion and complete periods cost, respectively,

    B^2 x^epsilon f^2(1+v) A N^3/J^(3/2),
    B^2 x^epsilon f^2(1+v) A M.

The paired endpoint variation is exactly that note's (6), and there
is no need for M to exceed c to complete an incomplete interval.
After summing J and applying Cauchy,

    |T| << B C D x^epsilon f
       [M sqrt(N) + sqrt((1+v)(M N^3+M^2))].                 (C1)

At the transition band its exponents are a+b/2, a/2+3b/2, a.
At the target (a,b)=(14/25,1/2) its maximum is 103/100; at the corner
it is 2. It adds no region: when a+b>=1 its diagonal budget is at
least the grouped diagonal (1+a)/2 and its other terms are identical;
when a+b<1, delta+nu<71/100 is already controlled. The low-product
case is also inside that existing region. Arbitrary subsets, complex
coefficients, both signs and gcd branches are retained. This prices
the arrangement; it does not prove the actual joint moment cannot
be smaller.

The remaining signed-moment Lemma B geometric-series argument survives
the endpoint integral/Abel repair in review 20. Its usable region is
analytically contained in delta+nu<71/100, so a finite grid is not
needed to infer no added region. The random-matrix lower-bound claim
remains heuristic. No coefficient lower bound is inferred from an
upper bound on its off-diagonal.

## D. Scope and resulting work allocation

The outstanding checklist from review 20 has been completed at the
level needed for another bounded local campaign: local proofs checked,
load-bearing source statements located, false closures withdrawn, and
the unpriced Cauchy variant settled. Imported deep theorems remain
imports. The new band transfer is in its own owning note and must not
be promoted to a full-corner result. No full-margin proof, effective
onset, sharp shrinking-window estimate or arbitrary-coefficient
impossibility theorem has been supplied.

`AGENT-START.md` supplies bounded follow-ups and exact return rules.
Future agents should consume these preparations instead of being
assigned the same unresolved audit or a generic instruction to prove
the missing twin margin.
