# The corner S_0: a weighted two-point Möbius correlation at the fixed shift 2

<!-- ledger
id: Q-corner-correlation
status: PARTIAL
todo: C
parity: Inputs used here are exact divisibility and CRT algebra, the classical Mobius mean estimate and quantitative PNT (Tao, Notes 2, Exercise 66 and Corollary 39) and Mertens. No step uses more than residue and density information plus those classical means; in particular no non-residue input, no bilinear estimate and no sieve upper bound beyond counting is used. The note's conclusion is that closing the corner appears to require an input beyond that list, and that is recorded as an ASSESSMENT, not as an obstruction theorem: no method class, retained statistics, error tolerance or quantifiers are supplied for an impossibility claim, and none is asserted.
question: On the corner S_0 where both cofactors sit just above their own cutoffs, what exactly is the remaining endpoint sum, what does the sufficient consumer need there, and does any reviewed correlation theorem supply it?
verdict: The full corner is exactly sum_n C(n)C'(n-2). Proper-prime-power terms above the cutoffs are negligible at fixed eta by §1.1; the remaining prime-r terms with s>1 or s'>1 and non-squarefree inputs remain OPEN. The s=s'=1 piece has a nonnegative Mobius-product weight with exact moving cuts. The multiplicative lift and round-review sampling give small continuous and dyadic scale-average log savings for that subfamily, with no o(x), full-corner control or twin margin. The complement is still open.
-->

**Twin-prime infinitude remains OPEN. The sufficient margin
C_2 x + E_dagger(x) >= c_0 x/(log x)^K remains OPEN. Nothing below changes
either, and nothing below is an estimate.** This note is a classification and
a pricing of one region. It supplies no new bound, and its central negative —
that the (r,r') average is not a shift average — closes a hoped-for route
rather than opening one.

Baseline: [RESEARCH-HANDOFF.md](RESEARCH-HANDOFF.md) §3, commit `4edb6ba`.
The full-coefficient follow-up is
[corner-coefficient-energy.md](corner-coefficient-energy.md): an exact
sharp energy formula, a Graham-based norm for the full smoothed corner,
and a small-prime cutoff difference. Those auxiliary results leave the
sharp transition, signed saving and global complement open; the exact
corner here is unchanged.

The corner S_0 is the object of the wave-1 reachability analysis, whose Q1
derives that **the existing zero-frequency budget fails the prescribed fixed
margin on S_0 in either orientation; only the exact a=b=1 endpoint
fails every positive margin regardless of the cross-kernel saving**. That analysis is the
reason this note exists; its budget table is used here as given, not
re-derived.

---

## 0. Coordinates, and one correction to the wave-1 sizing

Throughout x=2^j, J_x=(x/2,x], and, with
w=6/25, v=1/20,

\[
 U=V=\lfloor x^{w}\rfloor,\quad Y=Z=\lfloor x^{v}\rfloor,\quad
 D_0=\Big\lfloor\frac{x}{V+1}\Big\rfloor,\quad
 E_0=\Big\lfloor\frac{x-2}{Z+1}\Big\rfloor,
\]
\[
 R(x)=\sum_{\substack{d>U,\ k>V,\ e>Y,\ t>Z\\ dk-et=2,\ dk\in J_x}}
       \mu(d)\mu(e)\beta_V(k)\beta_Z(t),\qquad
 \beta_W(k)=\sum_{r\mid k,\ r>W}\Lambda(r).
\]

Fix eta_0 with 0<eta_0<1/400 and set
D_1=lfloor x^(19/25-2eta_0) rfloor, E_1=lfloor x^(19/20-2eta_0) rfloor,

\[
 S_0=\{(d,e):\ \max(U,D_1)<d\le D_0,\ \max(Y,E_1)<e\le E_0\}.
\]

Equivalently k=n/d<x^(6/25+2eta_0) and t=(n-2)/e<x^(1/20+2eta_0): both
cofactors lie within x^(2eta_0) of their own thresholds. The three
W_dagger conditions hold on S_0 with the stated eta_0 (checked: the
exponents are 171/100-4eta_0>3/4, 57/10-14eta_0>49/20, and
19/25-2eta_0>151/200 exactly when eta_0<1/400), so S_0 ⊂ W_dagger and
its mass belongs to E_dagger. The third condition is a disjunction; its
second disjunct de^3>floor(x^(321/200)) holds on S_0 with exponent
361/100-8eta_0, so the inclusion itself holds for every eta_0<13/56.
The bound eta_0<1/400 is forced elsewhere, by the single-prime-power
cofactor statement in section 1.1 and the norm lower-bound range of
[sharp-corner-transition.md](sharp-corner-transition.md), not by this
inclusion ([transition-joint-budget.md](transition-joint-budget.md) §1.4).

**Correction to the wave-1 sizing (derived).** That report records the
e-edge proper-prime-power class, of size O(x^(39/40) log^C x), as "not
negligible against x/log^H x on its own". It is negligible: for every
fixed H,
x^(39/40)log^C x · log^H x / x = log^(C+H)x / x^(1/40) -> 0.
Both prime-power classes below are therefore absorbed into the arbitrary
fixed logarithmic error, and neither has to be carried. One conclusion in
that report does depend on the point: its J4 triage against the e-edge
cites this class as a cost that must be carried. That reason falls away.
J4's other two reasons stand — the split (19/20, 1/20) is worse than
(19/25, 6/25) on every axis, and its clearing price is the larger — so
the triage survives with one fewer argument.

---

## 1. The corner sum, written exactly

### 1.1 One prime base on each side, with the s, s' branches kept

On S_0, k<x^(6/25+2eta_0)<V^2 (using eta_0<3/25) and
t<x^(1/20+2eta_0)<Z^2 (using eta_0<1/40). This excludes two **distinct
prime bases** each contributing a power above the cutoff: P^a>V and Q^b>V
with P!=Q would force k>=P^aQ^b>V^2. It does **not** exclude two powers
of one base, P^a and P^(a+1), both dividing k and both above V; those
have a>=1 and P^(a+1)|k, hence lie inside the proper-prime-power class
priced below. So the correct statement is: **at most one prime base
contributes, and up to that class exactly one prime power divides each
cofactor, with weight (log r)(log r').** The validator counts the
exceptions explicitly — cofactors with two prime powers above the cutoff:
2, 0 and 5 in the three cases — and sums over all of them, so the
identity checks of §6 are unaffected by this correction. Write

\[
 k=rs,\qquad r=P^a>V,\qquad s=k/r<x^{2\eta_0},
\]
\[
 t=r's',\qquad r'=P'^{a'}>Z,\qquad s'=t/r'<x^{2\eta_0},
\]

so beta_V(k)=log P and beta_Z(t)=log P' on the single-power class. Since
s<x^(2eta_0)<V and s'<x^(2eta_0)<Z, neither s nor s' contributes a prime
power above its cutoff, so the base is unique; the split (r,s) is unique
once the power is fixed.

*Proper prime powers.* Uniformly for W>=2,
sum_(p^j>W,j>=2) p^(-j) << W^(-1/2): split p at sqrt(W).
For each smaller p its geometric tail is at most 2/W; for larger p
sum_(j>=2)p^(-j)<=2/p^2, and summing over integers bounds both ranges.
Counting multiples costs at most x times this tail. Divisor multiplicity
and logarithmic weights are absorbed in x^epsilon. Thus the V and Z
classes cost O(x^(22/25+epsilon)) and O(x^(39/40+epsilon)), respectively,
including repeated powers of the same base. For fixed sufficiently small
epsilon these are O_H(x/log^H x) for every fixed H. This does not remove
s,s'>1 or all non-squarefree n. See independent review F5.

*Coprimality of the two band primes.* For eta_0<19/200 the two bands
(V, V x^(2eta_0)] and (Z, Z x^(2eta_0)] are disjoint, so r≠r' always and
(r,r')=1 is automatic. It is **not** automatic for the cofactors: with
s,s'>1 the gcd g=(k,t) may be 2, and g must divide 2 for a solution to
exist. Both branches are kept below.

### 1.2 The exact corner sum

For K=rs, T=r's' with g=(K,T)|2, put
K/g · d_0 ≡ 2/g (mod T/g), 0<=d_0<T/g, e_0=(d_0 K-2)/T. All integer
solutions of dK-eT=2 are d=d_0+(T/g)m, e=e_0+(K/g)m. Hence, exactly,

\[
 R\big|_{S_0}(x)=
 \sum_{\substack{r\ \text{prime}\\ V<r\le \lfloor x/(D_1+1)\rfloor}}\
 \sum_{\substack{r'\ \text{prime}\\ Z<r'\le \lfloor (x-2)/(E_1+1)\rfloor}}(\log r)(\log r')
 \sum_{\substack{s<x^{2\eta_0}\\ s'<x^{2\eta_0}}}
 \mathbf 1_{(rs,\,r's')\mid 2}
 \sum_{m\in I(rs,r's')}\mu(d_0+\tfrac{r's'}{g}m)\,\mu(e_0+\tfrac{rs}{g}m)
\]
\[
 \hskip 6em +\ O_H(x/\log^H x)\qquad\text{for every fixed }H>0. \tag{1}
\]

I(K,T) is the integer window cut out by max(U,D_1)<d<=D_0,
max(Y,E_1)<e<=E_0 and x/2<dK<=x. Always |I(K,T)| << gx/(2KT)+1. The
matching lower bound |I(K,T)| >> gx/(2KT) holds where the two corner cuts
d>D_1, e>E_1 are already implied by x/2<dK<=x, which is the foot of the
bands; higher in the bands those cuts bind and only the upper bound is
claimed. For s=s'=1 the two forms are d_0+r'm and e_0+rm with determinant
r'e_0-rd_0=-2, and at the foot of the bands the window has length
≍ x/(2rr') = x^(71/100). This is the assignment's (**), with the s, s'
branches and the gcd branch restored.

### 1.3 The CRT endpoint weights on S_0 degenerate; the sawtooth is not the object

E_dagger is the exact weighted compatible CRT endpoint sum
[residual-coverage (16)](residual-coverage.md), i.e.
[signed-divisor-grouping (15)–(18)](signed-divisor-grouping.md) with
W_dagger as its divisor region. Its kernel is
Delta_{a,b}(m)=psi((A-n_0)/q)-psi((m-n_0)/q) with a=dr, b=es
(r ∈ P_V, s ∈ P_Z are the prime-power *parameters* of the expansion, both
below the cutoffs), g=(a,b), q=ab/g, A=x/2, psi(u)={u}-1/2 and
psi(integer)=-1/2.

**Derived: on S_0 the modulus exceeds the interval.** a>=d>x^(19/25-2eta_0)
and b>=e>x^(19/20-2eta_0), so

\[
 q=\frac{ab}{g}\ \ge\ \tfrac12\,x^{171/100-4\eta_0}\ \gg\ x . \tag{2}
\]

Each compatible congruence class therefore meets J_x in **at most one**
integer, and Delta_{a,b} is a difference of two sawtooths at essentially
arbitrary arguments with no complete period available. This is the exact
local form of the wave-1 observation that at the corner "there is no
complete period to remove"; Fourier completion buys nothing here.

The useful consequence is in the other direction. By the exact discrete
partial summation of signed-divisor-grouping (17)–(18),
R|_{S_0}=M|_{S_0}+E_dagger|_{S_0} with M the discrete density term (11).
At fixed (n,e,r,s) the S_0 condition leaves d in a single interval inside
[U/2,x], and the excluded-prime Möbius mean
[signed-divisor-grouping (7)–(8)](signed-divisor-grouping.md), which is
uniform in the excluded-prime parameter m<=2es<=x^2, applies verbatim.
Hence M|_{S_0}=O_H(x/log^H x) and

\[
 E_\dagger\big|_{S_0}(x)=R\big|_{S_0}(x)+O_H(x/\log^H x). \tag{3}
\]

So the sawtooth weights do **not** simplify into anything summable on
S_0; what simplifies is that one may discard the sawtooth formalism
there and work with the raw signed residual (1). That is a removal of a
false hope, not a saving.

### 1.4 The two-point form

Let C_{U,V}^{S_0}(n)=sum over dk=n with k>V, max(U,D_1)<d<=D_0 of
mu(d)beta_V(k), and C'^{S_0}_{Y,Z} the same for n-2 with Y,Z,E_1,E_0.
By the regrouping of
[singleton-fiber-audit (3)](singleton-fiber-audit.md), exactly,

\[
 R\big|_{S_0}(x)=\sum_{n\in J_x}C^{S_0}_{U,V}(n)\,C'^{S_0}_{Y,Z}(n-2). \tag{4}
\]

If n and n-2 are squarefree then (d,k)=(e,t)=1 and
mu(d)mu(e)=mu(n)mu(n-2)mu(k)mu(t), so on that class (4) is a two-point
Möbius correlation at the fixed shift 2 with a signed divisor weight. On
the **s=s'=1 sub-family** the identity is unconditional up to a
negligible class: k=r prime and r|d forces r^2|n, costing
O(x^(19/25)); likewise r'^2|(n-2) costs O(x^(19/20)). Hence, exactly,

\[
 R\big|_{S_0,\ s=s'=1}(x)=\sum_{n\in J_x}\mu(n)\mu(n-2)\,L(n)\,L'(n-2)
                    +O(x^{19/20+\epsilon}), \tag{5}
\]
\[
 L(n)=\!\!\sum_{\substack{r\mid n\ \text{prime},\ r>V\\ D_1<n/r\le D_0}}\!\!\log r\ \ge0,
 \qquad
 L'(m)=\!\!\sum_{\substack{r'\mid m\ \text{prime},\ r'>Z\\ E_1<m/r'\le E_0}}\!\!\log r'\ \ge0 .
\]

**The prime-cofactor subfamily is mu(n)mu(n-2) against a
nonnegative weight with exact cofactor cuts.** No dominance of this
subfamily over the full corner is established. On the squarefree class, the general
family (4) has a signed divisor weight. Outside that class it needs a
separate remainder and cannot be written as a multiple of mu(n)mu(n-2). Two riders, both derived and both checked
numerically in §6:

- *2-adic reduction.* If mu(n)mu(n-2)≠0 then n is odd (n even forces
  4|n or 4|n-2), so k and t are odd and g=(k,t)=1. The g=2 branch of the
  CRT kernel lives entirely on the class where mu(n)mu(n-2)=0 while
  mu(d)mu(e)≠0.
- *The non-squarefree class is not small.* Terms with mu(d)mu(e)≠0 but n
  or n-2 non-squarefree arise when a prime dividing s also divides d, and
  those are common. At the finite parameters of §6 they carry the
  majority of the term-wise mass. Isolating (5) first is therefore not a
  cosmetic step.

### 1.5 How much mass is there

At fixed 0<eta_0<1/400 the term-wise absolute mass has order
eta_0^4*x*log^4 x; its s=s'=1 subfamily has order eta_0^2*x*log^2 x.
Only these orders are used here. The proof in
[readiness review F6](history/reviews-0906/21-readiness-review.md)
keeps the clipping, compatible gcd 2 cases, squarefree-divisor lower
bound and summed CRT errors. The formerly stated sharp constants are
withdrawn: the interval has length x/2, compatible CRT density is
gcd(rs,r's')/(rsr's'), and the cofactor cuts depend on n.

For the upper envelope each one-sided coupled sum has size
sum_(r>V,rs<=x^(w+2eta_0)) (log r)/(rs) of order
eta_0^2*log^2 x. For a lower bound restrict both prime log-widths and
small-cofactor log-widths to eta_0, with odd coprime s,s', then count
squarefree d,e as in the review. No leading Euler-product constant is
asserted, and these fixed-eta statements cannot be substituted at eta(x).

---

## 2. What the sufficient consumer actually needs on S_0

### 2.1 The conditional requirement

Suppose the complement W_dagger \ S_0 were controlled to O_H(x/log^H x)
with H>K — which is **not** proved. A formal exponent calculation in
reachability Q3.5 is not a necessity theorem for all ways of estimating
that complement. Under this explicit complement hypothesis,
handoff §3's consumer becomes exactly

\[
 E_\dagger\big|_{S_0}(x)\ \ge\ -C_2x+c_0\,\frac{x}{\log^Kx}
 \quad\text{on an unbounded set of dyadic }x. \tag{6}
\]

### 2.2 (6) is not a lemma; it is the theorem

Unconditionally S(x)=sum_{n in J_x}Lambda(n)Lambda(n-2)>=0, and
S=C_2x+E_dagger+O_H(x/log^H x). So

\[
 E_\dagger(x)\ \ge\ -C_2x-O_H(x/\log^Hx) \tag{7}
\]

holds with **no further arithmetic input** beyond the reduction itself.
The entire content of the sufficient consumer is the margin c_0 x/log^K x.
Consequently, given the complement hypothesis, (6) implies and is implied
by S(x) >= c_0 x/log^K x + O_H(x/log^H x). That margin sits between two
quantitative twin lower bounds differing by log^2 x: it yields
N_2(x) >= (c_0/2)x/log^(K+2)x (handoff §3), and conversely
N_2(x) >= c x/log^K x yields a margin of that shape, since each genuine
pair contributes ≍ log^2 x to S. So a one-sided attack on S_0 is not a
step towards the theorem; conditionally it is the theorem up to that
log^2 x. This is stated flatly because it determines what is worth
attempting there.

The absolute route is the one that behaves like a lemma. If
|E_dagger|_{S_0}|=o(x) then, given the complement,
C_2x+E_dagger>=(C_2-o(1))x, a fixed-fraction margin, far more than (6)
asks. By §1.5 the triangle inequality gives ≍ eta_0^4 x log^4 x, so:

A saving of log^(4+eps) x over the full unsigned envelope is sufficient
for o(x); for the prime-cofactor subfamily log^(2+eps) x is sufficient.
These are sufficient absolute estimates, not necessary rates for every
one-sided argument.

### 2.3 Shrinking eta requires new uniform estimates

The mass estimates above hold for fixed eta_0. The moment bounds retain
x^epsilon losses and constants depending on fixed margins. Neither is
uniform at eta(x) without additional work. In particular the former
comparison of eta^4*log^4 x against x^(-c eta+epsilon) does not prove
that no eta(x) works. It only diagnoses a tension in an optimistic
substitution that has not been justified. The global shrinking-window
strategy remains OPEN; the existing bounds do not establish it.

### 2.4 Is there structural positivity or a sign bias in (1)?

Assessed candidate by candidate. **No bias was found; the sum is
genuinely signed.**

| candidate source of a sign | status |
|---|---|
| the u_1=u_2, h_1=h_2 diagonal | not present. That diagonal is nonnegative inside the *second moment* after the first Cauchy; (1) is the raw signed sum, before any moment. Reachability Q1.6 item 3 is about the moment, not about R|_{S_0}. |
| coprimality forced by dr-er'=2 | derived: (d,e)|2, (d,r')=1, (e,r)=1, (n,n-2)|2, and by §1.4 n odd on the squarefree class. Each is a *support* restriction; none biases mu(d)mu(e). singleton-fiber-audit §3 derives that both signs occupy a positive proportion of odd squarefree coprime divisor pairs on a box, and that counting argument transfers verbatim to the corner's boxes. |
| the density subtraction already performed | removes nothing exploitable: by (3), M|_{S_0}=O_H(x/log^H x), so no positive main term survives on S_0 to be leaned on. |
| nonnegativity of L, L' in (5) | the weights are nonnegative but the sign is carried by mu(n)mu(n-2), which is exactly the unknown. |
| S(x)>=0 | gives (7) only, i.e. the trivial direction; see §2.2. |
| longest-fiber structure | on S_0, kt can range up to x^(29/100+4eta_0), still below x; away from clipping, fibers have many points, while upper-edge clipping can shorten them: S_0 is the *opposite* extreme to the singleton family of singleton-fiber-audit, whose lower bounds are for kv>x. No sign information is transferred either way. |

Heuristically, under a Chowla-type independence model the inner sums in
(1) are square-root sized and the whole of (1) is O(x^(0.65+eps)), far
inside (6). That is a heuristic and carries no weight here beyond saying
that the obstruction is not expected to be a real main term.

---

## 3. Classification against the literature, in the owning conventions

Searched per [SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md) row
"the residual with two signed factors and fixed product difference"
(owning words: two-point Möbius correlations, averaged Chowla,
logarithmically averaged Elliott, determinant equation). The mismatches
already recorded as [F-0905-11](OUTCOMES.md) are not repeated as new
findings; what is new here is §3.1, which is structural rather than a
parameter mismatch.

### 3.1 What averaging our object actually offers — derived negative

The corner offers x^(29/100+4eta_0+o(1)) pairs of prime dilations
(r,r') with r ≍ x^(6/25) and r' ≍ x^(1/20), each with an inner sum of
length ≍ x/(rr') (so x^(71/100) at the foot of the bands), logarithmic
weights (log r)(log r'), a fixed interval J_x, and the additional (s,s')
divisor sums.

**The map (r,s,r',s',m) ↦ (n, k, t, r, r') with n = d·rs, k = rs,
t = r's' is a bijection onto
{(n,k,t,r,r'): k|n, t|(n-2), r in supp beta_V(k), r' in supp beta_Z(t),
corner cuts}.** The last two coordinates record which prime power supplies
the weight, so this is a bijection with multiplicity rather than onto the
triples alone; the s=s'=1 sub-family and the exceptional multi-power
cofactors of §1.1 are both covered. Summing the weights over the last two
coordinates gives (4). Either form supports the conclusion equally:

- the (r,r') average **is** the average over the factorisations of n and
  n-2 at the single fixed shift 2. It is not an independent resource
  sitting outside the correlation; it is the correlation, re-indexed;
- the change of variables the assignment asks about does exist — fixing r
  and varying r' moves d_0(r,r') = 2·r-bar mod r' over residues — but it
  moves the base point of a progression, **not** the shift of a
  correlation. The shift is invariant at 2. The available additive-shift
  range is zero, at zero cost, because there is nothing to convert;
- consequently [Matomäki–Radziwiłł–Tao's averaged Chowla](https://arxiv.org/abs/1503.05121),
  whose whole content is an average over additive shifts h_1..h_k<=H with
  H->infinity, has no purchase here. This is stronger than the parameter
  mismatch recorded in F-0905-11: the mismatch is structural.

The one genuinely relevant reading of the (r,r') average is the opposite
one: the weight "n has a prime factor in a band" is exactly the device
Tao's entropy decrement and the Helfgott–Radziwiłł / Pilatte expansion
arguments use *inside* their proofs. Our object arrives with that device
already applied, at fixed prime scales x^(6/25) and x^(1/20) rather than
at the ranges those arguments require.

### 3.2 Sources, statements and hypotheses

Statements below were read at the cited source; "CHECKED" means the
statement and the listed hypotheses were read there in this session,
"ASSUMED" means it is carried from an existing repository record.

| source | statement read | average | coefficients / shift | saving | why it does not close S_0 |
|---|---|---|---|---|---|
| [Tao, *Forum Math. Pi* **4** (2016) e8 = arXiv:1509.05422](https://arxiv.org/abs/1509.05422), Thm 1.2, Thm 1.3 | logarithmically averaged Chowla for **two linear forms** a_1n+b_1, a_2n+b_2 with a_1b_2-a_2b_1≠0; Thm 1.3 the Elliott/nonasymptotic form with a non-pretentiousness hypothesis on g_1 | logarithmic, over (x/omega,x] | a_i, b_i **fixed**; Thm 1.3 has a threshold A=A(eps,a_1,a_2,b_1,b_2) | qualitative o(log omega) | our a_i are r' ≍ x^(1/20) and r ≍ x^(6/25), growing; the threshold is not stated uniformly in them, and a logarithmic-average o(1) is not a natural-average saving. CHECKED (statement and the coefficient-dependent threshold). Already recorded as F-0905-11. |
| [Matomäki–Radziwiłł–Tao, arXiv:1503.05121](https://arxiv.org/abs/1503.05121) | sum over h_1..h_k<=H of the absolute correlation is o(H^k X), any H=H(X)->infinity | additive-shift average | forms fixed, shifts averaged | ≍ log log H/log H | no shift average exists here, by §3.1. CHECKED (abstract and main statement). |
| [Helfgott–Radziwiłł, arXiv:2103.06853](https://arxiv.org/abs/2103.06853), Main Theorem | eigenvalues of the centered divisibility operator are O(sqrt(L)) off a density-1 set; consequence (1/log x)sum lambda(n)lambda(n+1)/n = O((log log x)^(-1/2)) | logarithmic | fixed shift 1, lambda not mu, no weights | (log log x)^(-1/2) | wrong average, and the saving is (log log)^(-1/2) against a requirement of log^(4+eps). CHECKED (abstract, main theorem, prime ranges log H_0 >= (log H)^(2/3+eps), log H <= (log N)^(1/2-eps)). Also recorded in structural-literature-audit §3E. |
| [Pilatte, arXiv:2310.19357](https://arxiv.org/abs/2310.19357), Thm 1.1 | sum_{n<=x} lambda(n)lambda(n+1)/n << (log x)^(1-c), c>0 absolute | logarithmic | fixed shift 1 | (log x)^(-c), c unspecified, described as best possible with current methods | wrong average; c is not claimed to exceed 4, or 2 for the sub-family; no weights, lambda not mu. Abstract CHECKED; the value of c and Theorem 1.1's exact form NOT checked at source. |
| [Tao–Teräväinen, arXiv:1809.02518](https://arxiv.org/abs/1809.02518), Cor. 1.13 and the Chowla corollary | **unweighted** two-point Chowla/Elliott at all scales X outside a set of logarithmic Banach density zero | natural within a scale; exceptional scale set | shifts h_1,h_2 **fixed**, no uniformity stated | qualitative o(X) | closest interface to the handoff's scale-average consumer, and the only one on a natural average. Two blocks: coefficients fixed, and o(X) applied fibrewise gives o(mass)=o(eta_0^4 x log^4 x), not o(x). CHECKED via the ar5iv text; the proof's uniformity NOT checked. |
| [arXiv:2608.23500 (2026)](https://arxiv.org/html/2608.23500), Thm 1.1 | (log x)^(1-c) bound on sum_{n<=y} lambda(n)lambda(n+h)/n for every h outside a set E_x with |E_x ∩ [1,H]| <<_A H(log x)^(-A) | logarithmic | fixed forms; h ranges | (log x)^(-c) | wrong average; and h=2 is one shift, which the theorem's exceptional set is not shown to avoid. CHECKED (abstract and theorem statement). |
| [Tao–Teräväinen, arXiv:2512.01739](https://arxiv.org/html/2512.01739v2), Thm 3.1, Rem. 3.2 | quantitative correlations of 1-bounded multiplicative functions outside a small set of logarithmic scales; moduli and shifts bounded by a small power of a parameter <= log X | logarithmic scales | polylogarithmic coefficients | quantitative | our coefficients are fixed powers of x. ASSUMED from structural-literature-audit §3E; not re-fetched here. |
| Frantzikinakis; [Frantzikinakis–Host](https://arxiv.org/abs/1611.09338) | ergodic reductions: ergodicity/genericity hypotheses on the Liouville system imply Chowla | — | — | conditional | conditional on an unproved ergodic hypothesis; supplies no unconditional bound. CHECKED at abstract level only. |
| Klurman, *Compositio* **153** (2017) 1622–1657; [Klurman–Mangerel, *Math. Ann.* **372** (2018) 651–697](https://arxiv.org/abs/1707.07817) | rigidity/converse: if many binary correlations of a 1-bounded multiplicative f match a character's, then f(n)=chi'(n)n^(it) | — | fixed shifts | — | the converse direction. Gives no upper bound for our sum. CHECKED at abstract level only. |
| [Friedlander–Iwaniec, asymptotic sieve for primes](https://arxiv.org/pdf/math/9811186), Thm 1 with (R),(B) | distribution plus a signed bilinear hypothesis yields a prime asymptotic | — | — | — | hypothesis (B) is itself a signed bilinear axiom; invoking it renames the problem. ASSUMED from structural-literature-audit §3F. |

*Not verified, and not used:* the assignment's remark that Chowla for
mu(an+b)mu(cn+d) with fixed a,c is equivalent to the two-point case. Tao's
Theorem 1.2 covers two linear forms directly in the logarithmically
averaged setting, which is what matters here; a formal equivalence for the
unaveraged conjecture was not located and is not relied on anywhere above.

### 3.3 Two determinant-equation interfaces, priced at the corner

These two were checked at source in this session because they attach to the
determinant equation itself rather than to the correlation. Both fail, with
explicit exponents. Neither failure is a refutation of the underlying
target.

#### (a) Bettin–Chandee, *Adv. Math.* **328** (2018) = arXiv:1502.00769v1, Corollary 1 — fails on smoothness, and on norms, in mutually exclusive orientations

Read at source (p. 3, eq. (1.4)). For Delta≠0 and
T = sum over m_1n_2-m_2n_1=Delta of f(m_1)g(m_2)alpha_{n_1}beta_{n_2},
with supports [M_i/2,M_i], [N_i/2,N_i], **alpha and beta arbitrary** but
f, g smooth to all orders,

\[
 f^{(j)}\ll\eta^{j}M_1^{-j},\qquad g^{(j)}\ll\eta^{j}M_2^{-j}
 \quad(\forall j\ge0,\ \text{some }\eta>1),
\]

the asymptotic holds with main term over (n_1,n_2)|Delta and error

\[
 O\big((\eta R)^{3/2}\,\|\alpha\|\,\|\beta\|\,(N_1N_2)^{7/20}(N_1+N_2)^{1/4+\epsilon}(M_1M_2)^{\epsilon}\big),
 \quad R=\frac{M_1N_2}{M_2N_1}+\frac{M_2N_1}{M_1N_2}.
\]

Matching our corner equation dk-et=2 (so Delta=2) admits three orientations.
R ≍ 1 in all three, which is the one hypothesis the corner satisfies
comfortably. Exponents of x, with the s=s'=1 scales
d ≍ x^(19/25), e ≍ x^(19/20), k=r ≍ x^(6/25), t=r' ≍ x^(1/20):

| orientation | (M_1,M_2,N_1,N_2) | smooth weights required on | required eta | error exponent at eta=1 | error exponent at the actual eta | main term |
|---|---|---|---|---|---|---|
| A: smooth on the cofactors | (x^(6/25), x^(1/20), x^(19/20), x^(19/25)) | beta_V(k), beta_Z(t) | ≍ M_1 = x^(6/25) | 1691/1000 | 2051/1000 | ≍ x |
| B: smooth on the divisors | (x^(19/25), x^(19/20), x^(1/20), x^(6/25)) | mu(d), mu(e) | ≍ M_1 = x^(19/25) | 613/2000 | 2893/2000 | ≍ x |
| C: primes absorbed, smooth on s, s' | (x^(2eta_0), x^(2eta_0), x, x) | the constant 1 | O(1) | 39/20 | 39/20 | ≍ x^(1+2eta_0) |

Readings, all derived from the displayed error term:

- **Orientation B is the only one whose norms work, and it fails exactly on
  smoothness.** At eta=1 the error exponent is 613/2000 against a main
  term of exponent 1 — a saving of x^(1387/2000). The affordable smoothness
  budget is eta<x^(1387/3000) (from (3/2)log_x eta + 0.3065 < 1), i.e. f and g
  must be essentially constant on scales x^(893/3000) and x^(1463/3000). The
  actual weights are mu(d) and mu(e), which vary at consecutive integers,
  so the smallest defensible reading is eta ≍ M_1 = x^(19/25), giving error
  exponent 2893/2000. **The gap is x^(893/2000), and it is entirely the
  smoothness hypothesis.** Even that reading is charitable: the hypothesis
  is f^(j) << eta^j M_1^(-j) for **all** j>=0, with the implied constants
  independent of j, so admitting mu(d) at eta ≍ M_1 presupposes a smooth
  interpolation of mu on [M_1/2,M_1] whose derivative constants are
  uniform in j. No such interpolation is exhibited here or known to the
  author; without one the orientation does not meet the hypothesis at any
  eta, and 2893/2000 is a lower bound on its cost, not its cost. This is the
  coordinator's point, confirmed with the exponents: the corner's weights are
  the least smooth case, and it fails there.
- **Orientation A puts the arbitrary coefficients on the long variables**,
  where ||alpha||||beta||(N_1N_2)^(7/20)(N_1+N_2)^(1/4) alone is x^(1691/1000),
  already x^(691/1000) above the object before any smoothness cost. The
  corollary saves N^(1/20) when N ≍ M; our box has N_1N_2 = x^(171/100)
  against M_1M_2 = x^(29/100), unbalanced in the direction that hurts.
- **Orientation C satisfies the smoothness hypothesis** (f=g=1 on a dyadic
  block) but aggregates the primes into the long variables, giving
  ||alpha||,||beta|| ≍ x^(1/2) and error exponent 39/20, x^(19/20) above the
  object.

So smoothness and the norm budget are satisfiable at the corner only in
mutually exclusive orientations. A separate agent owns Corollary 1 on the
bulk; nothing above bears on that.

#### (b) Guria, arXiv:2410.10856v2, Theorems 1.2 and 1.3 — the right prime mechanism, no free variable to apply it to

Read at source. Theorem 1.2 counts (a,b,p,d) in [-X,X]^4 with ad-pb=r,
p prime, one weight alpha(a)=O(a^eps) and b, d free; Theorem 1.3 has two
primes p, q with b, d free and gives
S_r(X) = 8 K_r (li X)^2 + O(X^(1+3/4+eps) + r^(1/5)X^(1+11/20+eps)),
uniformly for 0<|r|<<X^(2-eps). The method is Poisson summation in the
unrestricted variables b, d followed by averaging Kloosterman fractions
over the prime. This is the one located published mechanism that uses
exactly the prime structure the corner has, so the transfer question is
real; three things block it, in increasing order of severity.

1. **Box shape (quantitative).** Her box is the cube. Evaluating her error
   at X = the corner's largest variable x^(19/20) gives
   X^(7/4) = x^(133/80) = x^(1.6625) and r^(1/5)X^(31/20) = x^(589/400) at
   r=2; the corner's entire term-wise mass is x^(1+o(1)). Her *relative*
   saving X^(-1/4) against a main term X^2 would be more than sufficient if
   it transferred, but no such statement is proved for an unbalanced box,
   and the balance is exactly where the Poisson step enters (next item).
2. **The Poisson step needs a long free variable.** Poisson in a variable of
   length L against a modulus q produces a dual of length ≍ q/L and helps
   only when L >= q. In her cube, b and d have length X against moduli
   a, p ≍ X, so the dual has length ≍ 1. At the corner the only variables
   not carrying an oscillating weight are the cofactors: k has length
   x^(6/25) against a modulus e ≍ x^(19/20), dual length x^(71/100) — the
   dual sum is longer than the original by x^(47/100), and r' is shorter
   still. Her prime is also comparable to the other variables; ours are
   x^(6/25) and x^(1/20), and the r'-average has only x^(1/20+2eta_0+o(1))
   terms.
3. **Two Möbius weights, and no main term (structural).** Her theorems allow
   one arbitrary weight; the other three variables are free, which is why
   Poisson applies and why the conclusion is an asymptotic with a genuine
   main term of size ≍ (li X)^2. The corner carries mu(d) *and* mu(e) on the
   two long variables and prime restrictions on both short ones: no free
   variable exists. And by (3) the density on S_0 has already been
   subtracted and is O_H(x/log^H x), so there is no main term to produce —
   the whole object is the fluctuation. A counting theorem transfers to it
   only through its error term, and by item 1 that term already exceeds it.

What would have to be proved instead: an analogue of Theorem 1.3 for the
unbalanced box d ≍ x^(19/25), e ≍ x^(19/20), r ≍ x^(6/25), r' ≍ x^(1/20),
with arbitrary bounded coefficients on **both** long variables and error
o(x/log^K x). By §2.2 that statement is, given the complement, at least as
strong as a quantitative twin lower bound. That is not a reason to dismiss
the mechanism, but it is a reason not to expect it from a parameter
substitution into a counting theorem.

### 3.4 Updated quantitative comparison

The earlier source table describes the particular versions and direct
substitutions inspected there. It is not an exhaustive current absence
claim. [prime-band-transfer.md](prime-band-transfer.md) now consumes
[Tao-Teravainen v2 Theorem 3.1](https://arxiv.org/html/2512.01739v2)
through an exact bounded multiplicative Fourier lift. Uniformity in its
parameters and the moving-window mesh are priced there. This gives a
small continuous scale-average log saving for the absolute
prime-cofactor sum normalized by N*log^2 X, at fixed eta.

The interval-stability argument in [round-review-0906.md](round-review-0906.md)
§2 also gives a dyadic scale-average saving, with exponent c_*/2. Neither
estimate gives o(N) or a bound at every dyadic point. The full C-product
retains remaining prime-r cofactor and non-squarefree branches; proper
prime powers are separately negligible by §1.1. The handoff's one-sided
consumer needs a stronger rate and the full remainder's accounting.
No full-corner estimate follows from these transfers.

Against the fixed-eta unsigned envelopes, a saving of more than four
log powers for the full corner, or more than two for the subfamily,
is **sufficient** to reach o(x) by absolute estimation. These are not
necessary exponents for every one-sided argument, and a suitable
little-o improvement at equality would also suffice. Any new theorem
comparison must price its actual norm, rate, exceptional scales and
coefficient class rather than repeat a blanket absence assertion.

---

### 3.6 Prior art for the shape, found after the classification

The object in (5) is not new as a shape. Tao's 2016 notes on the Bombieri
asymptotic sieve state that on GEH the twin asymptotic is equivalent to
sum_{n<=x} mu(n) 1_R(n) mu(n+2) 1_R(n+2) = o(x/log^2 x) for the
x^alpha-rough indicator 1_R, "and similarly with 1_R replaced by other
sieves", and give the reason recent Chowla progress does not transfer:
the weight destroys multiplicativity of mu at small primes. Maynard's
ICM 2022 survey poses the four-variable determinant-2 sum with arbitrary
bounded coefficients as Question 17 and remarks that the natural
Cauchy-Schwarz argument gains little. The identification in (4)-(5) is
therefore an independent rediscovery of a known framing, reached here
through the Vaughan-type remainder rather than the asymptotic sieve; see
[consumer-comparison.md](consumer-comparison.md) for the sources. Two
differences travel with the attribution: the weight L here restricts a
large prime factor and leaves small primes unrestricted, so Tao's stated
non-transfer reason does not apply verbatim and would have to be
re-argued; and the required relative saving here is log^(4+eps) x against
his o(1), because the whole prime band is summed with log r weights. The
one-sided target's equivalence with the twin margin holds for any
subregion whose complement is controlled, so it is a property of the
consumer, not of S_0.

## 4. The parity input, named

*What this note used.* Exact divisibility and CRT algebra; the classical
Möbius mean [Tao, Notes 2, Exercise 66](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/)
through signed-divisor-grouping (7)–(8); quantitative PNT
[Tao, Notes 2, Corollary 39](https://terrytao.wordpress.com/2014/12/09/254a-notes-2-complex-analytic-multiplicative-number-theory/);
Mertens; and counting. Nothing here uses more than residue and density
information plus those classical means. In particular §§1–2 use no
bilinear estimate, no large sieve and no sieve upper bound beyond
counting.

*Does closing S_0 require more?* **Assessment, medium-high confidence,
not a theorem.** Yes. Identity (5) says the corner's leading family is
sum_n mu(n)mu(n-2)L(n)L'(n-2) with L,L'>=0: the corner does not merely
resemble the parity difficulty, it **is** the two-point Möbius
correlation at shift 2, weighted. Every advance on that object reviewed
in §3 uses inputs beyond residue counting and sieve upper bounds —
Halász/pretentious distance, Matomäki–Radziwiłł short-interval averages,
entropy decrement, expander and non-backtracking estimates. Nothing in
the tile framework supplies any of those.

*What is NOT claimed.* No obstruction theorem. Per
[F-0905-01](OUTCOMES.md) and the parity gate, an obstruction claim must
name its method class, the statistics it retains, the errors it tolerates
and its quantifiers, and prove a statement at that scope. This note names
none and proves none. What is derived instead is narrower and checkable:
the structural negative in §3.1 (no shift average exists), the
quantitative gap in §2.2 (log^(4+eps) on a natural average), and the
incompatibility in §2.3 (eta_0 cannot be shrunk).

---

## 5. Payoff, exactly

**What a complete corner estimate would change.**

- The reduction S(x)=C_2x+E_dagger(x)+O_H(x/log^H x) is unchanged. A
  corner estimate changes only the accounting: |E_dagger|_{S_0}|=o(x)
  would give E_dagger=E_dagger|_{W_dagger\S_0}+o(x), so the sufficient
  consumer of handoff §3 would reduce to a statement about the complement
  alone.
- It changes **no** budget, region or cut in
  [grouped-divisor-moment (15), (19), (21)](grouped-divisor-moment.md).
  The block budgets (1+a)/2, a/2+3b/2, a are untouched; the added region
  delta<19/25 and delta+3nu<161/100 is untouched; the target (21) and its
  "more than 3/50" are untouched.
- It does **not** raise the uniform product threshold, which stays at
  every fixed exponent below 19/25. The witness (8/25,11/25) is outside
  S_0.
- It does **not** let the vertical cutoff delta<19/25 in (15) be dropped.
  S_0 is the *intersection* {delta>19/25-2eta_0} ∩ {nu>19/20-2eta_0}; the
  d-edge strip S_R and the e-edge strip S_T of reachability Q3.1 both
  survive. Their clearing prices are not 11/10 and 37/25: those are the
  costs at the *cheapest single points* of the two edges, (19/25,1/20) and
  (6/25,19/20). Clearing either edge apart from the corner drives gamma to
  2, because along the d-edge the only usable orientation is the left one,
  whose requirement 2-3p-q tends to 2 as q tends to 0, and symmetrically
  on the e-edge. Both strips inherit the corner's own price in the limit.

**What it would not do, and what nothing else does.** Reachability D1
derives that no nonzero-kernel improvement, of any size, reaches S_0; D2
derives that reducing the leftover to S_0 alone already needs gamma=2
uniformly. So the corner cannot be removed by the moment route and the
complement cannot be removed by the corner route: the two halves are
disjoint and neither is proved. Even both together would then have to be
combined with the still-unproved uniform saving to reach (6).

**Triage opinion (mine, flagged).** The absolute target on the s=s'=1
sub-family, (5) with a log^(2+eps) saving, is the smallest well-posed
piece of the corner and the only one whose statement is a recognisable
open problem rather than an equivalent of the theorem. I would not spend
an attempt on the one-sided form (6): §2.2 shows it is the conclusion.
Medium confidence; this is triage, not a result.

---

## 6. Validation, controls and falsifiers

[corner-correlation-validation.js](corner-correlation-validation.js)
checks the algebra of §1 exactly, as integer combinations of
log(r)log(r'), at three finite parameter sets. At reachable x the
asymptotic windows are degenerate (Z=floor(x^(1/20)) is 2 at x=2^22), so
two of the three cases use larger cutoff exponents w, v chosen so that
the s>1, s'>1, prime-power and g=2 branches are actually populated; the
corner is defined intrinsically as V<k<=V·Delta, Z<t<=Z·Delta with Delta
standing for x^(2eta_0). **These are identity checks. No asymptotic rate,
saving or cancellation is measured, and the density subtraction (3) is
not tested, being asymptotic.**

Checked and passing in all three cases: the direct four-variable
enumeration equals the fiber/CRT progression of §1.2, equals the
prime-band form (1), and equals the two-point form of §1.4 plus its
independently computed non-squarefree remainder.

Negative controls, each of which must change the value: using the
un-reduced modulus T in place of T/g; keeping only s=s'=1; using the
shift 4 in place of 2; dropping the mu(k) sign inside the two-point
weight; widening the right corner cut. Four are active in all three
cases. The fifth, dropping mu(k), is **inactive** at the case with
v=1/20, and the reason is derived rather than a defect: there
s=s'=1 is forced on the squarefree class, so mu(k)mu(t)=1 identically.
It is active in the other two cases. The run takes 1.8 s.

The runs also record that the non-squarefree class carries the majority
of the term-wise mass at these parameters, which is why §1.4 isolates
(5) rather than working with (4) directly.

**Falsifiers, and whether they have been run.**

- A defect in (1), (4) or (5): the finite identity checks above have run
  and pass; they do not test the asymptotic error terms in (1) or (5).
- (3) failing because M|_{S_0} is not controlled: NOT tested numerically;
  it rests on signed-divisor-grouping (7)–(8) being uniform in the
  excluded-prime parameter, which is stated there for m<=x^2 and is used
  here at m<=2x. That dependency is ASSUMED, not re-derived.
- §1.5's mass asymptotic being wrong in the eta_0 dependence: NOT tested;
  the finite parameters are far from the asymptotic regime.
- §2.3 failing: it would fail if the complement's control were not
  x^(1-c·eta+eps) with c absolute, e.g. if the saving degraded
  superlinearly in eta. That has not been checked against
  grouped-divisor-moment's proof; only the budget inequalities were used.
- §3.1's bijection: the A==C identity check verifies the (r,s) and
  (r',s') re-indexing **with multiplicity** — bandSum iterates every prime
  power in beta's support — which is what the corrected statement in §3.1
  asserts. It does **not** verify uniqueness of the prime power, and by
  §1.1 uniqueness is false off the proper-prime-power class; the validator
  counts those exceptions (2, 0, 5) rather than assuming them away.

**Unreviewed dependencies.** grouped-divisor-moment (2)–(3) and the
Pascadi Lemmas 3.2–3.3 behind them are used only through the reachability
budget table and are ASSUMED. The reachability report's Q1/Q3 arithmetic
is used as given; only its x^(39/40) sizing remark was re-derived, and
corrected, in §0.
