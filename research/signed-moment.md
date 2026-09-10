# The block without the first Cauchy: where the corner's loss actually sits

<!-- ledger
id: Q-signed-moment
status: PARTIAL
todo: C
parity: Expands the block T = sum_m A_left(gm) Y(m) with no Cauchy inequality and prices the pieces. The two local lemmas use elementary inputs only; the linked joint-Cauchy follow-up additionally consumes the classical completion inputs of grouped-divisor-moment. The local inputs are: the exact combination of two inverse phases into a single modulus c = lcm(u1,u2), the coset structure of the resulting frequency, a geometric series in the harmonic variable after completing the harmonic subset by positivity, the elementary count of residues of an inverse in an interval, and the sup/variation bounds on the endpoint factor. No Weil or Ramanujan estimate is needed in Lemmas A and B themselves; the joint follow-up keeps those named imports explicit. Both gcd branches, both endpoint conventions, arbitrary harmonic subsets, all four coefficient sectors and prime powers are retained; no cancellation of any Mobius sign is assumed. The ceilings recorded are properties of named argument shapes and, for the arbitrary-coefficient ceiling, of a stated random model; no parity obstruction, impossibility theorem or necessity of a future mechanism is asserted. Failed upper bounds here say nothing about the sign or size of the underlying correlation.
question: Is there an argument for the block that does not pay sqrt(M) at the first Cauchy inequality or that extracts cancellation from the R=0 class, and what are its budgets at the corner a=b=1 and at the target box (delta,nu)=(8/25,9/20)?
verdict: The true diagonal has an upper bound x^(1+o(1)) on the transition band, not a uniform nonzero lower bound. Lemma A controls only u1=u2,h1=h2; unequal proportional R=0 pairs remain outside it. Lemma B and the now-priced joint Cauchy arrangement add no region. The former general Holder floor is valid only under additional coefficient assumptions, not for arbitrary sparse coefficients. Conditional off-diagonal budgets and the random-matrix ceiling remain conditional and heuristic. No necessity of using both signs, full-corner estimate or sufficient twin margin is established.
-->

**Twin-prime infinitude remains OPEN, and the sufficient margin
`C_2 x + E_dagger(x) >= c_0 x/(log x)^K` remains OPEN. Nothing here changes
the controlled region, `W_dagger`, `E_dagger`, the consumer
[grouped-divisor-moment (20)](grouped-divisor-moment.md), or the uniform
product threshold.** What follows is one exact expansion, two derived
elementary lemmas, one conditional budget, one heuristic ceiling, and a set of
failed upper bounds with their exact failed steps. A smaller block exponent at
one point of the domain is not a lower bound on twins.

Independent reviews 20 and 21 check the displayed block shape and
local upper-bound arguments, with the corrections below. Imported
upstream theorems remain named dependencies. The exact coefficient,
endpoint and twist restrictions still matter for every application.

Companion validator: [signed-moment-validation.js](signed-moment-validation.js),
exact BigInt rationals plus small finite integer and analytic identities. It
validates no imported estimate and establishes no rate.

## 0. The object, and what the block has to beat

Notation follows [grouped-divisor-moment §1](grouped-divisor-moment.md) and
[RESEARCH-HANDOFF §4](RESEARCH-HANDOFF.md). Let `I_m` be an integer
subinterval of `(M,2M]`, `H` any subset of the integers in `[A,2A]`,
`|b_u| <= B` on `(N,2N]`, `|c_h| <= C/A` with `C` fixed, `g in {1,2}`,
`theta = 2/g`, `sigma in {-1,1}`,

\[
 \Phi_{u,h}(m)=e\Big(\frac{hz_0'}{gmu}\Big)-e\Big(\frac{hz'}{gmu}\Big),
 \qquad v=\frac{Ax}{MN},\qquad f=\min(1,v),
\]

with `|z0'|, |z'|, |z'-z0'| <= x`. Set

\[
 Y(m)=\sum_{u\sim N}b_u\sum_{h\in H}c_h\,1_{(m,u)=1}\,
       e_u(\sigma\theta h\bar m)\,\Phi_{u,h}(m),\qquad
 T=\sum_{m\in I_m}A_{\rm left}(gm)\,Y(m),
\]

with `|A_left| << log x` by [grouped-divisor-moment (13)](grouped-divisor-moment.md).
For `d ~ x^delta`, `e ~ x^nu` the expanded lengths are `M << x^a`, `N << x^b`
with `a = delta + 6/25`, `b = nu + 1/20`; the domain is
`delta in [6/25,19/25]`, `nu in [1/20,19/20]`, so `a, b <= 1` with equality on
the two edges. **The block must satisfy `|T| << x^(1-eta)` for a fixed
`eta>0`.** The top harmonic band is `A ~ MN/x`, where `f = 1` and `v ~ 1`;
this is the band that binds, and every displayed number below is on it unless
said otherwise.

The single useful abbreviation is

\[
 G(u,h)=\sum_{m\in I_m,\ (m,u)=1}A_{\rm left}(gm)\,
        e_u(\sigma\theta h\bar m)\,\Phi_{u,h}(m),
 \qquad T=\sum_{u\sim N}\sum_{h\in H}b_uc_h\,G(u,h).                  \tag{1}
\]

## 1. The expansion with no Cauchy inequality, and the true diagonal

Squaring (1) and expanding both `G`'s:

\[
 |T|^2=\sum_{\substack{m_1,m_2\in I_m\\ u_1,u_2\sim N,\ h_1,h_2\in H}}
   A_{\rm left}(gm_1)\overline{A_{\rm left}(gm_2)}\,
   b_{u_1}\overline{b_{u_2}}c_{h_1}\overline{c_{h_2}}\,
   e\big(\sigma\theta[\tfrac{h_1\bar m_1}{u_1}-\tfrac{h_2\bar m_2}{u_2}]\big)
   \Phi_{u_1,h_1}(m_1)\overline{\Phi_{u_2,h_2}(m_2)} .               \tag{2}
\]

Split (2) three ways:

| piece | index restriction | name |
|---|---|---|
| `(a)` | `m1=m2`, `u1=u2`, `h1=h2` | the true diagonal |
| `(b)` | `m1!=m2`, `u1=u2`, `h1=h2` | the `m`-off-diagonal |
| `(c)` | `(u1,h1) != (u2,h2)` | the `(u,h)`-off-diagonal |

`(a)` is real and nonnegative, and exactly

\[
 (a)=\sum_{u\sim N}|b_u|^2\sum_{h\in H}|c_h|^2
 \sum_{m\in I_m,(m,u)=1}|A_{\rm left}(gm)|^2|\Phi_{u,h}(m)|^2.
 \tag{3}
\]

The available sup bound |A_left|<<log x gives

    (a) << B^2 C^2 f^2 (MN/A) log^2 x.

On the transition band this is x^(1+o(1)) at bounded B,C, a power
below the required square x^(2-2eta) for fixed eta<1/2. This is an
**upper bound on one contribution**, not a bound on |T| or a lower
bound for (a). Empty H, zero coefficients or coincident endpoints make
it zero. The previous asymptotic x log x also used an L2 norm not
supplied uniformly by the stated hypotheses; its log exponent is not
needed for Lemmas A or B, which absorb fixed logarithms in x^epsilon.

For filled, nondegenerate constant-modulus model coefficients, comparing
the direct diagonal with the generic first-Cauchy diagonal explains a
factor of order M. It is a comparison in that model, not a universal
lower bound on the actual arithmetic block or all separated arguments.
The Rademacher calculation gives the exact expectation of the moment
as its diagonal; a positive lower bound needs additional nondegeneracy
hypotheses and does not follow for arbitrary H and endpoints.

The inequality ||A_left||_p ||Y||_(p')>=sqrt(M)||Y||_2 is false for
arbitrary A_left. For example, with M=4, p=1, a supported on one point
with value 1 and Y supported on a different point with value 1, its
left side is 1 and its right side is 2. With constant |A_left|=D on
all M points, norm monotonicity does give the analogous lower bound
D*sqrt(M)||Y||_2 for p<=2. This restricted comparison is not a
universal Holder or first-Cauchy ceiling for the actual coefficients.

## 2. Lemma A: the whole `(u,h)`-diagonal, by completing the harmonic band

The step that makes the rest of this note work is elementary and is used
twice: **`(a)+(b)` and the Lemma B moment are sums of nonnegative terms in
`h`, so the arbitrary harmonic subset `H` may be replaced by the full band
`[A,2A]` before anything else is done.** Once the band is complete, and
because `Phi_{u,h}(m)` is a difference of two *pure exponentials in `h`*, the
`h`-sum is a geometric series after the small-v integral and Abel step stated
below. There is no modular completion in these two lemmas.

**Lemma A (derived).** With the hypotheses of
[grouped-divisor-moment §1](grouped-divisor-moment.md), for every fixed
`epsilon>0`,

\[
 (a)+(b)=\sum_{u\sim N}|b_u|^2\sum_{h\in H}|c_h|^2|G(u,h)|^2
 \ \ll_\epsilon\ B^2C^2x^\epsilon f^2(1+v)
   \left[\frac{MN}{A}+\frac{M^2}{A}
        +\frac{M^2N+MN^2}{A^2}\right].                               \tag{4}
\]

*Proof.* All terms are nonnegative, so extend `H` to `[A,2A]` and replace
`|b_u|^2, |c_h|^2` by `B^2, C^2/A^2`. Fix `u`. Expanding `|G(u,h)|^2` and
`Phi(m_1)\overline{Phi(m_2)}` into its four exponential terms, the summand is
`e(h beta)` with

\[
 \beta=\frac{\sigma\theta\,(\bar m_1-\bar m_2)}{u}
   +\frac{z_i}{gm_1u}-\frac{z_j}{gm_2u},\qquad i,j\in\{0,1\},
\]

so `sum_{A<=h<=2A} e(h beta) << min(A, ||beta||^(-1))`, and the perturbation
obeys `|z_i/(gm_1u) - z_j/(gm_2u)| <= 2x/(gMN) = 2v/(gA)`. Group the pairs by
`r = \bar m_1 - \bar m_2 mod u`. For fixed `m_1` and `r`, `m_2` lies in one
residue class mod `u`, so each `r` receives at most `M(M/u+1)` pairs. Summing
over `r`: the `O(1 + uv/A)` residues with `||theta r/u|| <= 2(1+2v)/A` give
`A` each, contributing `O(A + uv)`; the rest give
`sum_r ||theta r/u||^(-1) << u log(2A)`. Hence

\[
 \sum_{h\sim A}|G(u,h)|^2\ll x^\epsilon f^2
   \Big(\frac{M^2}{u}+M\Big)\big(u(1+v)+A\big),
\]

and multiplying by `B^2C^2/A^2` and summing over `u ~ N` gives (4). QED

The small factor f needs a step not supplied by expanding four pure
exponentials alone. If v<=1, write each endpoint difference as the
integral of its endpoint derivative, extracting v(h/A) times a uniformly
bounded m,u-dependent factor. In the product, (h/A)^2 has bounded
variation on [A,2A], so Abel summation preserves the same geometric-series
bound and supplies f^2. If v>=1, expand directly and f=1. The same repair
applies in Lemma B below. No Weil or Ramanujan input is required.

**Scope correction:** this lemma bounds u1=u2,h1=h2 only. The R=0 class
also contains unequal proportional pairs, for example (u1,h1)=(6,3) and
(u2,h2)=(10,5), in common dyadic bands. Those pairs remain in piece (c).
Neither this lemma nor its positivity completion controls that whole
class. See [independent review F4](history/reviews-0906/20-independent-handoff-review.md).

**On the top band `A ~ MN/x`** the bracket in (4) is
`x + Mx/N + x^2/N + x^2/M`, and `Mx/N <= x^2/N` since `M << x`, so

\[
 (a)+(b)\ \ll_\epsilon\ x^{2-\min(a,b)+\epsilon}.                     \tag{5}
\]

That is a power below `x^2` at *every* box of the original domain (36481 of
36481 grid boxes). As a bound on `|T|` it would permit `x^(1-min(a,b)/2)`:
`x^(1/2)` at the corner, `x^(3/4)` at the target box, `x^(31/40)` at the
benchmark. **The true diagonal and the u1=u2,h1=h2 contribution have been bounded
below x^2.** Piece (c), including the remaining equal-frequency pairs,
is uncontrolled by this lemma.

## 3. Lemma B: Cauchy in the harmonic variable, with no zero-frequency budget

The same positivity step supports a complete alternative to the first Cauchy.
Write `T = sum_{h in H} c_h W(h)` with `W(h) = sum_u b_u G(u,h)` and apply
Cauchy in `h`.

**Lemma B (derived).** With the hypotheses of grouped-divisor-moment §1, for
every fixed `epsilon>0`,

\[
 |T|\ \ll_\epsilon\ BC\,x^\epsilon f(1+v)^{1/2}
   \left[\frac{MN}{\sqrt A}+M\sqrt N+N^{3/2}\sqrt{M/A}+N\sqrt M\right].
                                                                     \tag{6}
\]

*Proof.* `|T| <= (sum_{h in H}|c_h|^2)^(1/2)(sum_{h in H}|W(h)|^2)^(1/2)`, and
`sum_{h in H}|c_h|^2 <= C^2/A`. The second factor has nonnegative terms, so
extend `H` to `[A,2A]`. Expand; the summand is again `e(h beta)`, now with the
two inverses taken to different moduli. With `j=(u_1,u_2)`, `u_i=j ell_i`,
`(ell_1,ell_2)=1`, `c=j ell_1 ell_2 = [u_1,u_2]`, and `c/u_1 = ell_2`,
`c/u_2 = ell_1`, the two phases combine exactly as in
[structural-literature-audit §2 (1)](structural-literature-audit.md):

\[
 e_{u_1}(\sigma\theta h\bar m_1)\overline{e_{u_2}(\sigma\theta h\bar m_2)}
 =e_c(\sigma\theta h\,P),\qquad
 P=\bar m_1\ell_2-\bar m_2\ell_1 \bmod c,                            \tag{7}
\]

so `beta = sigma theta P/c + (endpoint perturbation)` is again a fixed number
given `(m_1,m_2,u_1,u_2)` and the `h`-sum is a geometric series. Fix
`u_1,u_2,m_1` and let `t = \bar m_2 mod u_2` range over `[0,u_2)`, which
over-counts and is admissible because the summand is nonnegative. Then
`P = P_0 - t ell_1 mod c` runs bijectively over the coset
`P_0 + ell_1 Z/cZ`, of size `c/ell_1 = u_2`, whose nonzero elements are spaced
`ell_1 g'` apart with `g' = (theta, j ell_2) <= 2`. Consequently

\[
 \sum_{t<u_2}\min\big(A,\|\sigma\theta P/c\|^{-1}\big)
   \ll A+u_2(1+v)+u_2\log(2A),
\]

each `t` carrying at most `M/u_2+1` values of `m_2`. Summing over `m_1` and
over the `N^2` pairs `(u_1,u_2)`, and restoring `f^2` from `|Phi|^2` and
`log^2 x` from `|A_left|^2`,

\[
 \sum_{h\sim A}|W(h)|^2\ll_\epsilon B^2x^\epsilon f^2(1+v)
   \big[N^2M^2+NM^2A+MN^3+MN^2A\big],
\]

and multiplying by `C^2/A` and taking the square root gives (6). QED

Like Lemma A, Lemma B is entirely elementary: geometric series, the coset
structure of (7), and counting. It uses **no** Weil or Ramanujan bound, no
completion, no trace-function input and no bilinear theorem, and it is uniform
over arbitrary harmonic subsets, both gcd branches `g in {1,2}`, both endpoint
conventions, all four coefficient sectors of
[grouped-divisor-moment (13)](grouped-divisor-moment.md) including prime
powers, and — because Cauchy removes `c_h` and the remaining weights are
bounded, not smooth — over the independent divisor twists at all Perron
heights, so it does not carry Lemma I's twist-height obligation from
[left-divisor-signs §2](left-divisor-signs.md).

**On the top band `A ~ MN/x`** the four terms of (6) are
`sqrt(MNx)`, `M sqrt(N)`, `N sqrt(x)`, `N sqrt(M)`, with block exponents

\[
 \frac{1+a+b}{2},\qquad b+\frac12,\qquad a+\frac b2,\qquad b+\frac a2 .
                                                                     \tag{8}
\]

**There is no `(1+a)/2` term in (8).** This is exactly the falsifier
[reachability-coverage §5.3](reachability-coverage.md) named and left standing
as an outstanding check: "a block-budget list for this moment shape whose
zero-frequency term is below `(1+a)/2` — an argument that does not pay the
left norm at the first Cauchy inequality". Lemma B supplies such a list. The
answer is that the shape exists and does not reach the corner.

## 4. Budgets, and the region Lemma B adds

Exact rationals, all re-derived in
[signed-moment-validation.js](signed-moment-validation.js) §A.

| box | `a` | `b` | grouped right | grouped left | **Lemma B (8)** | Lemma A on the square (5) |
|---|---|---|---|---|---|---|
| corner `(19/25,19/20)` | 1 | 1 | 2 | 2 | **3/2** | 1 |
| target `(8/25,9/20)` | 14/25 | 1/2 | 103/100 | 109/100 | **103/100** | 3/2 |
| benchmark `(2/5,2/5)` | 16/25 | 9/20 | 199/200 | 237/200 | **209/200** | 31/20 |
| `(8/25,11/25)` | 14/25 | 49/100 | 203/200 | 217/200 | **41/40** | 151/100 |
| d-edge `(19/25,1/20)` | 1 | 1/10 | 1 | 31/20 | **21/20** | 19/10 |
| e-edge `(6/25,19/20)` | 12/25 | 1 | 87/50 | 61/50 | **3/2** | 38/25 |

At the corner all four terms of (8) equal `3/2` simultaneously.

**Region: none added.** (8) is below one exactly when `a+b<1` and `b<1/2`,
i.e. `delta+nu < 71/100` and `nu < 2/5`. On a `191 x 191` rational lattice
over the full domain, 6906 boxes are usable under (8) and **0 of them lie
outside** the region already controlled by
`delta+nu<19/25` or `5delta+2nu<123/50` or
`(delta<19/25 and delta+3nu<161/100)`. Lemma B beats *both* grouped
orientations on 16173 boxes, all of them with `a` and `b` above `1/2`, and on
none of those is it below one. So `W_dagger`, `E_dagger`, the exact cuts
[grouped-divisor-moment (19)](grouped-divisor-moment.md), the consumer (20)
and the uniform product threshold (every fixed exponent below `19/25`) are all
unchanged.

**What did change, and only this.** In the grouped-moment shape the corner is
out of reach for *every* kernel saving `gamma`, including an unbounded one,
because the zero budget is `1` there and no kernel saving enters it
([reachability-coverage §2.1](reachability-coverage.md)). Lemma B has no such
term, so the corner stops being a hard stop and becomes a finite deficit: from
`3/2` one needs a further block saving of `1/2 + eta`, equivalently a saving
of `x^(1+2eta)` in the moment `sum_h |W(h)|^2`, whose current size at the
corner is `x^4` against a required `x^(3-2eta)`. That is the decisive
inequality. It is a change in the *reading* of reachability's ceiling, whose
own scope statement already said it was a property of one argument shape; its
item 1 is untouched.

## 5. Where the remaining loss is, term by term

Lemma B takes absolute values in exactly two places. Pricing each:

**(i) The right Möbius signs, `|b_{u_1}\overline{b_{u_2}}| <= B^2`.** Keeping
the `u_1=u_2` part of the moment and discarding the rest — that is, assuming
unproved cancellation across the `u`-pairs — replaces the bracket in Lemma B's
moment by `(M^2+MN)(N+A)` and gives block exponents `(1+a)/2`, `a`,
`(1+b)/2`, `(a+b)/2`, whose maximum is

\[
 \frac{1+\max(a,b)}{2}.                                              \tag{9}
\]

CONDITIONAL. (9) is `39/50` at the target box and **exactly 1 on both edges,
corner included**; it is below one on the 36100 interior boxes of the lattice
and on none of the 381 edge boxes. So even complete cancellation in the right
divisor's Möbius signs leaves the corner at exactly the failure threshold,
with no fixed margin. The object one would have to estimate is the `u_1!=u_2`
part of `sum_h |W(h)|^2`, which is precisely the signed cross-divisor sum
[residual-coverage (19)-(20)](residual-coverage.md) transposed to the harmonic
Cauchy and taken at `a=b=1`; that note writes it at one sector of
`(2/5,2/5)` and its analogue at the corner is written nowhere in this corpus.

**(ii) The left Möbius signs, `|A_left(gm_1)\overline{A_left(gm_2)}| << log^2 x`.**
Retaining these signs is one possible source of an improvement to this
particular bound. With both sets of signs kept, the moment involves
four aggregated coefficients against the phase of (7); no estimate for
that signed off-diagonal is supplied here. The full arithmetic corner
is the C(n)C'(n-2) sum in corner-correlation (4). Its nonnegative
mu(n)mu(n-2)L(n)L'(n-2) form covers only s=s'=1, and a sufficient bound
for the full corner must also include every omitted branch. A necessity
of cancellation in both Möbius coefficients for every future argument
does not follow from these failed upper bounds.

**A heuristic ceiling for the whole class of arbitrary-coefficient arguments.**
HEURISTIC, under a stated model, not derived. Model: (i) for the typical
`(u,h)` the `m`-sum has square-root cancellation, `|G(u,h)| ≍ f M^(1/2)`;
(ii) the `N x A` array `(G(u,h))` behaves like a random matrix for its
`∞ -> 1` norm, `||G||_(∞->1) ≍ ||G||_F(\sqrt N + \sqrt A)`. Then

\[
 \sup_{|b_u|\le B,\ |c_h|\le C/A}|T|
   \ \asymp\ BC f\big[N\sqrt{M/A}+\sqrt{MN}\big]
   \ =\ x^{(1+b)/2}\ \hbox{on the top band,}
\]

and the reciprocal orientation ([small-divisor-kernel §4](small-divisor-kernel.md))
exchanges the roles of `m` and `u`, giving `x^((1+a)/2)`. So the ceiling is
`x^((1+min(a,b))/2)`, which is **exactly the better of the two zero-frequency
budgets**: below one at every box of the domain except the corner, where it is
exactly one. Rigorously available is only the Khintchine half,
`sup |T| >= c B(C/A) sum_u (sum_h |G(u,h)|^2)^(1/2)`; the missing input is a
lower bound on `sum_{u,h}|G(u,h)|^2`, and Lemma A's upper bound on the
`m_1!=m_2` part is of the same order as the `m_1=m_2` part at the corner, so
no lower bound follows from anything derived here. On the grid the ceiling
never exceeds the best proven bound at its box (36481 of 36481), which is the
active consistency control; it would be refuted outright by any proven bound
below it.

If the model is right, the corner is out of reach for *every* argument that
uses only `|b_u| <= B` and `|c_h| <= C/A`, however organised, and reorganising
the Cauchy step can at best reach `x^1`, never `x^(1-eta)`. That is a sharper
statement than reachability's, and it is heuristic; its scope is
arbitrary-coefficient arguments, and it asserts no obstruction to arguments
that use the actual coefficients.

## 6. The other arrangements, priced

| arrangement | what it is | corner | target box | comment |
|---|---|---|---|---|
| Cauchy in `m` | grouped moment (14), right orientation | 2 (zero term exactly 1) | 103/100 | the current shape |
| Cauchy in `u` | the left orientation, by reciprocity | 2 (zero term exactly 1) | 109/100 | already in the corpus; not a new arrangement |
| **Cauchy in `h`** | **Lemma B (6)** | **3/2** | **103/100** | no zero-frequency term; adds no region |
| Cauchy in `(m,h)` jointly | completed in [readiness review C](history/reviews-0906/21-readiness-review.md): budgets a+b/2, a/2+3b/2, a | 2 | 103/100 | incomplete intervals can be completed even when c>M; no added region |
| Hölder in `m`, `p<=2` | coefficient-dependent norm product | not priced for actual sparse coefficients | not priced | the comparison with Cauchy needs constant-modulus or equivalent norm hypotheses; see §1 |
| Hölder in `m`, `p>2` | same | — | — | would need `Y` concentrated on a sparse set of `m`; heuristic, nothing suggests it |
| no Cauchy, `L^1` over `(u,h)` | the `L^1` norm of `G` over `(u,h)`, Cauchy–Schwarz against Lemma A's second moment | 3/2 | 103/100 | identical numbers to Lemma B, as it must be |
| Type I / Type II on `mu(m)` | [left-divisor-signs](left-divisor-signs.md) Lemmas I, II | `>= 3/2`, `15/8` | 41/40 (best at that box) | still the best available at the target box; Lemma B does not improve it |

Nothing here beats `41/40` at the target box, and the deficit there remains
`1/40` in block exponent, i.e. more than `1/20` of moment-exponent saving in
the currency of [grouped-divisor-moment (21)](grouped-divisor-moment.md).

**Lemmas A and B import no literature.** The linked joint-Cauchy follow-up
uses the classical completion inputs of grouped-divisor-moment. The two
elementary lemmas here use no named theorem, so
no literature search was run for them and none is claimed; the conventions
that would own such a search are listed in
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md). The pricings quoted in the table for Bettin–Chandee/Wright, FKM,
Wu–Xi and Guria are those already recorded in
[left-divisor-signs §6](left-divisor-signs.md),
[small-divisor-kernel §5](small-divisor-kernel.md) and
[structural-literature-audit §3D](structural-literature-audit.md); **they were
not re-verified at source here**, and nothing in Lemmas A or B depends on
them. A consequence worth stating: because Lemma A and Lemma B avoid
completion entirely, the composite-modulus hypothesis that blocks the
trace-function inputs is simply absent from them — and that is also why they
are weak, since they extract no square-root cancellation from the `m`-sum.

## 7. Effect on the global consumer

**None.** No budget in (6) or (8) falls below one outside the region already
controlled, so the sufficient region of
[RESEARCH-HANDOFF §4](RESEARCH-HANDOFF.md) is unchanged, `W_dagger` and its
concrete cuts are unchanged, `E_dagger` is the same exact sum, the reduction
`S(x) = C_2 x + E_dagger(x) + O_H(x/log^H x)` is unchanged, and the sufficient
margin `C_2 x + E_dagger(x) >= c_0 x/(log x)^K` remains OPEN. The rescaled
average and the dyadic-block form of the consumer are equally unchanged.

## 8. Validation, falsifiers, limits

[signed-moment-validation.js](signed-moment-validation.js) (deterministic,
0.4 s, output embedded by `node research/qc/embed.js`) checks in exact BigInt
rationals: the block exponents of (5), (6), (8) and (9) at six named boxes;
that all four Lemma B terms equal `3/2` at the corner and that the grouped
zero budget is exactly `1` there; the `191 x 191` region comparison, including
the 0 boxes added and the 16173 boxes where Lemma B beats both grouped
orientations; that (9) is below one on exactly the 36100 interior boxes; and
that the heuristic ceiling never exceeds a proven bound. It checks finitely
the four elementary inputs of the lemmas: the phase combination (7) on 995328
configurations of `(u_1,u_2,m_1,m_2,h,theta,sigma)`; the coset structure of
`P` on 3481 modulus pairs, both its size `c/ell_1 = u_2` and its membership in
`P_0 + ell_1 Z/cZ`; the geometric-series sum bound with an absolute constant
below 2 over 8192 configurations; the per-residue inverse count
`<= |I|/u + 1`; and that `Phi` is a difference of pure exponentials in `h`
with `|Phi| <= 2 pi min(1, h|z-z_0|/(gmu))`.

Negative controls, all firing: dropping the `h` geometric series returns the
trivial bound `a+b = 2` at the corner (`D1`); "Lemma B adds region" is false
(`D2`); "the corner is reachable by Lemma B" is false (`D3`); reading Lemma
A's `x^1` at the corner as a bound on `|T|` rather than on `|T|^2` (`D4`);
"the saving comes from somewhere other than completing the band by positivity"
(`D5`); and ignoring the `ell_1` spacing of the frequency coset (`D6`).

**Falsifiers, and whether they have run.**
(a) An error in the derivation of Lemma A or Lemma B — the exponent arithmetic
and the four elementary inputs are checked mechanically, the analytic steps were checked in independent reviews 20 and 21,
with the scope and endpoint-factor corrections recorded there.
(b) Formula (3) is exact and its upper bound is sufficient for the
diagonal assessment. The formerly unconditional lower bound and general
Holder ceiling have been withdrawn; see readiness review F9.
(c) The heuristic ceiling of §5 — falsified immediately by any proven block
bound below `x^((1+min(a,b))/2)` at any box; the grid check confirms none of
the currently proven bounds is, but that is consistency, not confirmation.
(d) The `(m,h)`-Cauchy row of §6 is now priced in readiness review C; if a stronger bound for its `u_1!=u_2` part turns out
to be estimable for large `j`, its floor `M sqrt N` is `81/100` at the target
box, below `41/40`, and that row would have to be worked out.
(e) The upstream block shape and its coefficient/twist dependence were
checked in review 20; the named imported theorems remain dependencies.

**Limits.** Finite checks certify their finite scope. They establish no
asymptotic rate, no effective onset, no percentage of completion and no lower
bound on twins. A failed upper bound here is a failure of the stated estimate;
it says nothing about the sign or the size of the correlation it fails to
bound.

**Integration:** TODO C, OUTCOMES, the router and generated QUESTIONS
now carry this note and the review corrections. Current downstream
briefs are in AGENT-START.md.
