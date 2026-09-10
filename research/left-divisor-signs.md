# Möbius structure of the left divisor instead of the first Cauchy inequality

<!-- ledger
id: Q-left-divisor-signs
status: PARTIAL
todo: C
parity: Uses the exact convolution structure of the left coefficient (13), classical completion with Ramanujan and composite-modulus Weil bounds, averaged gcd losses, partial summation against the endpoint factor, and Cauchy in the original divisor rather than in the expanded one. Both gcd branches, both endpoint conventions, all four coefficient sectors, prime powers, arbitrary harmonic subsets and independent divisor twists are retained. No cancellation of the right coefficient's Möbius signs is used and no parity obstruction is asserted; the failures recorded are failed upper bounds, not refutations of the arithmetic target.
question: Can the Möbius structure of the left coefficient A_left(gm) replace the first Cauchy inequality, so that its sqrt(M) loss is not paid, and what does that buy at the target box (delta,nu)=(8/25,9/20) and at the corner a=b=1?
verdict: Partly, and not where it is needed. Two lemmas are derived: a Type I bound with no zero-frequency budget, usable at the target box whenever the arbitrary block is shorter than x^(1/4), and a Type II bound that is uniform in the Perron twist heights. Applied to the actual coefficient they confine the target-box deficit to sectors with left prime power r>=x^(43/200) and right prime power q>x^(3/100), and lower the worst block exponent there from 103/100 to 41/40. The corner a=b=1 is untouched: grouped, Type I, Type II, Bettin-Chandee/Wright and even a hypothetical per-block square-root bound all exceed 1 there. No region is added, E_dagger and the consumer (20) are unchanged, and the global twin margin remains OPEN.
-->

**Twin-prime infinitude and the sufficient signed margin of
[RESEARCH-HANDOFF §3](RESEARCH-HANDOFF.md) remain OPEN. Nothing here
changes the controlled region, W_dagger, E_dagger or the consumer
[grouped-divisor-moment (20)](grouped-divisor-moment.md).** What follows
is a derived reduction of one block exponent at one box, a set of failed
upper bounds with their exact failed steps, and a sharper localization of
the remaining deficit. A smaller deficit at one rectangle is not evidence
that the global estimate will follow.

Everything is derived once, by me, in one pass. It has not been
independently reviewed. It inherits the unreviewed upstream dependency
listed in the wave-1 review of grouped-divisor-moment: that the residual's
expanded blocks really have the shape `sum_m A_left(gm) Y(m)` with a
separate left coefficient in m, a separate right coefficient in u and a
harmonic weight depending only on h. If that reduction is wrong every
number below changes.

## 0. What is being replaced

[grouped-divisor-moment §4](grouped-divisor-moment.md) bounds each block by
Cauchy in the expanded left variable m,

\[
 \left|\sum_{m\in I_m}A_{\rm left}(gm)Y(m)\right|
   \le F\cdot\mathfrak M^{1/2},\qquad
 F=\Big(\sum_m|A_{\rm left}(gm)|^2\Big)^{1/2}\ll\sqrt M\log x,
\]

with the moment (2)-(3). The wave-1 reachability report records that F is
sharp and that the moment's diagonal `u1=u2, h1=h2` is nonnegative of exact
order `f^2 MN/A`, so the zero-frequency budget `(1+a)/2` cannot be improved
inside that shape; at `a=1` it equals one. Its judgement was that the loss
is Cauchy itself, which discards the correlation between the Möbius signs
of `A_left(gm)` and `Y(m)`. This note prices the two standard ways of not
paying it.

## 1. The left coefficient, exactly, and its three sectors

By [grouped-divisor-moment (13)](grouped-divisor-moment.md) and
[endpoint-fourier §2 (4)-(5)](endpoint-fourier.md), for `Re(s)>=0` and an
original divisor interval `I` contained in `(D,2D]`,

\[
 A_0^{(s)}(\ell)=\mu(\ell)\ell^{-s}1_I(\ell),\qquad
 A_1^{(s)}(\ell)=-\mu(\ell)\ell^{-s}1_I(\ell)\log\ell
 -\sum_{r\mid\ell,\ 2\le r\le W}\mu(\ell/r)(\ell/r)^{-s}1_I(\ell/r)\Lambda(r),
\]

with `W=V=floor(x^(6/25))` on the left and `Z=floor(x^(1/20))` on the
right. Three observations, all immediate from the display and all checked
finitely in the validator:

1. **`A_0` and the first term of `A_1` are supported inside `I`.** Only
   the prime-power term reaches beyond it, to `l<=2DW`. The interval
   indicator sits on the *original* divisor `d`, and so does the twist:
   in the prime-power term the original divisor is `l/r`, not `l`.
2. **The prime-power term is exactly a Dirichlet convolution**
   `(mu(.).^{-s}1_I) * (Lambda 1_{[2,W]})`. Writing `d=l/r` it is
   `-sum_{d in I} sum_{r<=W} mu(d)d^{-s}Lambda(r)` over `l=dr`. No
   coprimality between `d` and `r` is imposed and none is needed.
3. **`g=2` costs a relabelling only.** With `l=gm` and `g=2`, split the
   prime-power term by whether `r` is a power of 2. If `r=2^k` then
   `m=d*2^(k-1)` with `2^(k-1)` fixed, so the second block has O(1)
   elements and the piece is linear in `d`; if `r` is odd then `2|d`,
   write `d=2d'` and `m=d'r` with `d'` in an interval and
   `|mu(2d')|<=1`. Both stay inside the lemmas below.

Consequently, parametrise every block by two sector exponents: the left
prime power `r ~ x^rho` with `0<=rho<=6/25` and the right one `q ~ x^sigma`
with `0<=sigma<=1/20`. The expanded lengths are then

\[
 M\asymp x^{\delta+\rho},\qquad N\asymp x^{\nu+\sigma},
 \qquad\text{i.e. } a=\delta+\rho,\quad b=\nu+\sigma,
\]

rather than the uniform top values `a=delta+6/25`, `b=nu+1/20` used in
grouped-divisor-moment (14). Each dyadic `m`-box receives O(1) values of
`R=x^rho` (since `d` is confined to one dyadic interval), so the split is
into O(log^2 x) sectors and the triangle inequality across them is free.
Using the top support for every sector, as (14) does, is a valid
over-estimate; the sector split is a refinement of that bookkeeping, not
a defect in it.

## 2. Type I: no zero-frequency budget, but a twist-height obligation

**Lemma I (derived).** Let the left coefficient factor as `m=ab` with
`a ~ A_1` carrying divisor-bounded coefficients `c_a` and `b` carrying a
weight of bounded variation in `b` (coefficient 1, or `log b`). With the
hypotheses and notation of [grouped-divisor-moment §1](grouped-divisor-moment.md),

\[
 \Big|\sum_{a}c_a\sum_{b}\;Y(ab)\Big|
 \ll_\epsilon x^\epsilon f(1+v)\,BC\Big[A_1N^{3/2}
   +M\,\mathbf 1_{M\ge N/2}\Big].
\]

*Proof.* For fixed `a`, `u`, `h`, the inner sum is
`sum_{b in J_a,(b,u)=1} e_u(k bbar) Phi_{u,h}(ab)` with `k=sigma theta h abar`,
`J_a` an interval of length `<=2M/a`. The single endpoint factor obeys
`|Phi|<<f` and `|Phi'|<<f(1+v)/M`, the two displays used to prove
[grouped-divisor-moment (6)](grouped-divisor-moment.md); hence
`sup|Phi|+TV(Phi) << f(1+v)`, and partial summation reduces to the
completion bound (7), which is stated for every subinterval:
`<< x^eps[sqrt(uG)+(|J_a|/u)G]`, `G=(k,u)=(sigma theta h,u)<=2(h,u)`
because `abar` is a unit. Now
`sum_h |c_h|(h,u)^(1/2) << C tau(u)` and `sum_h |c_h|(h,u) << C tau(u)` by
the gcd average [(9)](grouped-divisor-moment.md) with `alpha=1/2` and
`alpha=1`; `sum_{u~N}|b_u|sqrt u tau(u) << B x^eps N^(3/2)` and
`sum_{u~N}|b_u|(M/(au))tau(u) << B x^eps M/a`. Summing `|c_a|` gives
`A_1 x^eps` for the first and `x^eps` for the second. The period term is
absent when `|J_a|<u` for every `a`, i.e. when `M<N/2`. QED

The block budgets are therefore `alpha_1+3b/2` and `a`, with
`A_1=x^(alpha_1)`. **The zero-frequency budget `(1+a)/2` does not
appear**: no second moment is taken, so the nonnegative diagonal that
forces it is never formed. The `N^(3/2)` is the same as in (14); Lemma I
replaces the Cauchy factor `sqrt M = x^(a/2)` by `A_1`, and is a strict
improvement exactly when `A_1<sqrt M`.

**Obligation Lemma I does not discharge.** The coupled cuts of
[residual-coverage §4](residual-coverage.md) are separated by truncated
Perron at height `T_P=x^10`, which multiplies the coefficients by twists
`d^(-s)` with `|Im s|` up to `x^10`. The moment (2) is uniform in those
heights because Cauchy sees only `|A_left|<=2 log l`. Lemma I is not: the
smooth variable `b` carries `b^(-s)`, whose total variation over `b ~ B`
is `>> |Im s|`, and the partial summation step then costs `x^10`.
Subdividing into `|Im s|` pieces costs the same. So **any route that
replaces the first Cauchy by cancellation in a smooth `m`-variable must
first redo the cut separation with twist heights `x^(o(1))`**, or work
only on boxes that do not straddle a cut. That is a real additional
obligation and it is not discharged here. Lemma II below does not have it.

### 2.1 Vaughan and Heath-Brown on `mu(m)`, and what the combinatorics leave

Vaughan's identity for the Möbius function,
`mu = mu_{<=U} + mu * (delta - 1*mu_{<=U})`, produces only Type II pieces:
both factors carry non-smooth coefficients. Heath-Brown's identity does
produce smooth variables: with `z=M^(1/K)`,
`mu = sum_{j<K} M_z*(1-zeta M_z)^j` for arguments below `z^K`, so every
piece is a convolution of at most `K` Möbius variables of length `<=z`
with at most `K-1` variables carrying the coefficient 1.

At the target box `(delta,nu)=(8/25,9/20)`, top supports `M=x^(14/25)`,
`N=x^(1/2)`, `A<=x^(3/50)`:

* **Lemma I is decisive iff `alpha_1<1/4`** (`alpha_1+3/4<1`), i.e. iff a
  single 1-variable exceeds `x^(31/100)`. The Cauchy exponent it replaces
  is `a/2=7/25=0.28`, so the identity buys the interval `[1/4,7/25)` of
  short-block lengths *and no more*.
* **Type II is needed otherwise.** Lemma II below controls a split
  `m=ab`, `A_2=x^(s_A)`, `B_2=x^(s_B)`, iff `min(s_A,s_B)` lies in
  `(3/25,19/100)`.
* **The two together do not cover.** Take `m=n_1n_2` with `n_1,n_2` both
  1-variables of exponent `7/25=0.28`. No 1-variable exceeds `0.31`, and
  the achievable subset sums are `{0,0.28,0.56}`, none in `(0.12,0.19)`.
  This configuration is left over, and on it the only available treatment
  is Cauchy in `m` with `||alpha||_2 = sqrt(M)` — exactly the step the
  identity was supposed to avoid, with exactly the same budget `103/100`.

**So the answer to the headline question is: the identity avoids the
`sqrt(M)` loss on the unbalanced pieces and does not avoid it on the
balanced one, and the balanced piece is where the deficit sits.** This is
a failed upper bound for the balanced range, not a statement that the
balanced sum is large.

## 3. Type II: Cauchy in the original divisor, uniform in the twists

**Lemma II (derived).** Let `m=ab` with `a ~ A_2` in an interval carrying
`|x_a|<=x^eps`, `b ~ B_2` carrying `|y_b|<=x^eps`, `B_2<N`. Then, with the
hypotheses of grouped-divisor-moment §1,

\[
 \Big|\sum_{a,b}x_ay_bY(ab)\Big|
 \ll_\epsilon x^\epsilon f(1+v)^{1/2}BC\,N
   \Big[A_2B_2^{1/2}+A_2^{1/2}B_2N^{1/4}+A_2B_2N^{-1/2}\Big].
\]

*Proof.* Fix `u` and `h` and Cauchy over `a`, so
`|S(u,h)|^2 <= ||x||_2^2 sum_a |sum_b y_b 1_{(ab,u)=1} e_u(k abar bbar) Phi(ab)|^2`
with `||x||_2^2 << A_2 x^eps`. Expand the square over `(b_1,b_2)`. The
weight left on the `a`-sum is `F(a)=Phi(ab_1)conj(Phi(ab_2))`, which obeys
(6): `|F|<<f^2`, `TV_a(F)<<f^2(1+v)`. **The coefficient `x_a`, and with it
the divisor twist `a^(-s)`, has been removed by Cauchy, so no weight of
large total variation survives; the bound is uniform in the Perron
heights.** The diagonal `bbar_1=bbar_2` forces `b_1=b_2` because
`B_2<N<=u`, and contributes `<< A_2B_2f^2x^eps`. Off the diagonal,
partial summation and (7) give
`<< x^eps f^2(1+v)[sqrt(uG')+(A_2/u)G']` with
`G'=(k(bbar_1-bbar_2),u)`. Since
`bbar_1-bbar_2 = bbar_1bbar_2(b_2-b_1)` modulo `u`, we have
`(bbar_1-bbar_2,u)=(b_1-b_2,u)` exactly, so `G'<=2(h,u)(b_1-b_2,u)`; the
divisor argument of (9) gives
`sum_{0<|n|<=B_2}(n,u)^(1/2)<=4B_2 tau(u)` and the same at exponent 1.
Collecting, `|S(u,h)|^2 << x^eps A_2 f^2[A_2B_2+(1+v)B_2^2(sqrt u+A_2/u)]`,
and summing `|S(u,h)|` over `u ~ N` and `h` with
`sum_h|c_h|(h,u)^(1/4)<<C tau(u)` gives the display. QED

Lemma II uses no cancellation over `u` or `h` at all: they are summed
absolutely. It is therefore crude wherever the `u`-average matters, and
in the balanced range it is *worse* than the grouped moment. Its value is
that in the deficit sector the split is supplied by the coefficient
itself.

## 4. What this buys at (delta,nu)=(8/25,9/20)

Write the sector budgets with `a=8/25+rho`, `b=9/20+sigma`. All arithmetic
below is exact rationals, re-derived in
[left-divisor-signs-validation.js](left-divisor-signs-validation.js).

**Grouped moment (14), sector-wise.** Zero `33/50+rho/2`, cross
`167/200+rho/2+3sigma/2`, period `8/25+rho`. Only the cross term can
reach one, so the grouped moment controls the sector iff

\[
 \rho+3\sigma<33/100.                                     \tag{1}
\]

At `rho=0` the cross budget is `91/100`: **the `A_0` sector and the
`-mu log` sector are already controlled at this box**, whatever the right
sector is. At the top, `rho=6/25`, `sigma=1/20`, it is `103/100`, the
note's stated figure.

**Lemma II with the split supplied by the coefficient**, `A_2=D=x^(8/25)`
the original divisor block and `B_2=R=x^rho` the prime-power block:

\[
 E_1=77/100+\sigma+\rho/2,\quad
 E_2=289/400+\rho+5\sigma/4,\quad
 E_3=109/200+\rho+\sigma/2 .
\]

`E_1` and `E_3` are below one on the whole sector box, so Lemma II
controls the sector iff

\[
 \rho+5\sigma/4<111/400.                                  \tag{2}
\]

**Union.** (1) and (2) cross at `sigma=3/100`, where both read
`rho<6/25`. Hence

* every sector with `sigma<3/100` is controlled — at `sigma=3/100` both
  budgets read exactly `1` at `rho=6/25`, so the strict statement is
  **the deficit needs the right prime power `q` to reach `x^(3/100)`**,
  against its ceiling `x^(1/20)`;
* at `sigma=1/20` the surviving range is `43/200<=rho<=6/25`, i.e.
  `x^(0.215)<=r<=x^(0.24)`, against the old `rho>=9/50=0.18`;
* on the surviving set the block exponent is
  `min(167/200+rho/2+3sigma/2, 289/400+rho+5sigma/4)`, whose supremum is
  attained at `(6/25,1/20)` and equals **41/40**, versus **103/100** from
  the grouped moment alone.

So the target-box deficit in block exponent falls from `3/100` to `1/40`.
In the moment-exponent currency of
[grouped-divisor-moment (21)](grouped-divisor-moment.md) the analogous
requirement drops from "more than 3/50" to "more than 1/20", but the
comparison is only indicative: Lemma II is not a second moment and (21)
remains stated for the moment route.

Lemma I removes a further sub-family of the surviving sector — those `d`
with a single 1-variable factor above `x^(31/100)`, for which the
arbitrary block is `r<x^(1/4)` — but only subject to the twist-height
obligation of §2, and it is a sub-family, not a uniform improvement. It
does not lower the `41/40`.

## 5. The corner a=b=1

Every route priced here fails there, and by wide margins:

| route | block exponent at `a=b=1` |
|---|---|
| grouped moment (14), either orientation | `1` (zero), `2` (cross), `1` (period) |
| Lemma I, any `A_1>=1` | `>= 3/2` (`N^(3/2)`), plus `1` from the periods |
| Lemma II, best split | `15/8` |
| Bettin-Chandee / Wright Thm 2.1 | `15/8` |
| hypothetical per-block square-root cancellation in `m`, summed trivially over `u,h` | `3/2` |

The last row is the decisive one. Trivially summing over `u ~ N` and `h`
costs `N`, and `u^(-eta')=x^(-eta' b)` because `u ~ x^b`, so a per-block
bound `M f u^(-eta')` yields total exponent `a+b-eta' b`; sufficiency is

\[
 \eta'>\frac{a+b-1}{b},
\]

which is `3/25` at the target box (`b=1/2`, so `2(a+b-1)` there) and
**`1` at the corner** (`b=1`). Full square-root cancellation in `m` is
`M u^(-a/(2b))`, i.e. `eta'=a/(2b)`: `14/25` at the target box and `1/2`
at the corner. **The corner therefore needs twice the square-root ceiling
from a per-block argument: it cannot be reached by any bound that treats
the `u`-sum absolutely, however strong the `m`-cancellation.** At the
target box the requirement `3/25` sits inside the ceiling `14/25` with a
factor 4.7 of room; the gap there is proof strength, not a ceiling. (The
ceiling itself is heuristic; the exponent arithmetic is derived.)

**Level of distribution.** At the target box `M=x^(14/25)`, `u ~ x^(1/2)`:
the `m`-sum has `~x^(3/50)` complete periods modulo `u`, so completion is
marginally effective, and `u = M^(25/28)`. At the corner `M ~ u ~ x`:
`u=M^(1+o(1))`, there is not one complete period, and Weil's `sqrt u`
per `(u,h)` pair already totals `N sqrt u = x^(3/2)`. Every method priced
here obtains its saving from completing the `m`-sum; when the modulus
equals the length there is nothing to complete.

**Left budgets recomputed (item 4 of the brief).** Swapping `a,b` gives
`(1+b)/2, b/2+3a/2, b`. At the target box: `3/4, 109/100, 1/2` — the cross
term is worse than the right orientation's `103/100`. At the corner:
`1, 2, 1` — *identical* to the right orientation. The asymmetry
`U=V=x^(6/25)` against `Y=Z=x^(1/20)` enters only through
`a=delta+6/25`, `b=nu+1/20`; at the corner both equal one by definition
and the asymmetry is invisible. Lemma II in the left orientation (Cauchy
in `e`, second moment over `q`, modulus `m`) gives `207/200, 39/40, 39/50`
at the target box: the `q_1=q_2` diagonal alone is `1.035`, worse than
`41/40`, because `Q<=x^(1/20)` is too short to pay for the diagonal.
**Neither the swap nor the asymmetry helps at either place.**

## 6. Algebraic twists and the two new primary sources

The trivial-summation route needs a per-`(u,h)` saving
`u^(-eta')` with

\[
 \eta'>\frac{a+b-1}{b}
 =\begin{cases}3/25&\text{at the target box }(b=1/2),\\
                1&\text{at the corner }(b=1).\end{cases}
\]

* **Fouvry-Kowalski-Michel, *Algebraic trace functions over the primes*,
  Duke Math. J. 163 (2014) = arXiv:1211.6043v3 (31 Mar 2014), Theorem 1.7**
  (read at source, PDF text extracted 2026-09-06):
  `sum_{n<=X} mu(n)K(n) << X(1+p/X)^(1/12) p^(-eta/2)` for any `eta<1/24`,
  for `K` an isotypic trace weight modulo a **prime** `p`, non-exceptional
  (not proportional to `chi(n)psi(n)`), of bounded conductor; the constant
  depends polynomially on the conductor.
  *Hypotheses checked:* our kernel `K(m)=e_u(sigma theta h mbar)` is the
  Artin-Schreier sheaf pulled back by inversion, of conductor O(1), and is
  not of the form `chi psi` (its singularity is at 0, not at infinity), so
  it is non-exceptional. `X=M=p^(28/25)>p`, so the factor `(1+p/X)^(1/12)`
  is O(1) and the range condition `X>=p^(3/4+eps)` holds with room.
  *Hypothesis that fails:* `p` prime. Our `u` is an arbitrary expanded
  right divisor.
  *Pricing even granting prime `u`:* the ceiling is `eta'<1/48`, against
  the required `3/25`. Short by a factor `144/25 = 5.76`. It removes
  `1/96` of the `3/50` deficit, leaving `119/2400`.
  Remark 1.9 of the same paper (attributed to Bourgain) gives
  `sum_{n<=X}mu(n)K(n)=o(X)` for `X>=p^(1/2+eps)` with **no power saving**;
  a `o(1)` factor cannot pay a fixed power deficit.
* **Wu-Xi (with an appendix by Sawin), *Arithmetic exponent pairs for
  algebraic trace functions*, arXiv:1603.07060v5 (19 Apr 2021)**, read at
  source: the moduli are required **squarefree with all prime factors below
  `q^eta`**, the sums are **short** (`|I|<q`), and the word "Möbius" does
  not occur in the paper. Our `u` has no squarefreeness or friability
  guarantee and our `m`-sum is longer than `u`. Not applicable.
* **FKMS, *Bilinear forms with trace functions*, arXiv:2511.09459v3, Thm 1.1**
  and **Korolev-Shparlinski, Thm 2.1** were already priced in
  [structural-literature-audit §3D](structural-literature-audit.md) (prime
  modulus with monodromy hypotheses; logarithmic saving only). The
  Kowalski-Michel-Sawin Annals 186 (2017) line is recorded CLOSED in
  [OUTCOMES.md](OUTCOMES.md). What is new here is only the numeric
  requirement `eta'>3/25` at the target box and `eta'>1` at the corner,
  and the observation that the corner requirement is twice the
  square-root ceiling `1/2` there.

### 6.1 Wright, *Trilinear Kloosterman fractions II*, arXiv:2608.27732v1 (27 Aug 2026)

Theorem 2.1, read at source (HTML rendering, 2026-09-06). With
`B(M,N,A) = sum_{a in A, m in M, n in N, (m,n)=1} alpha_m beta_n gamma_a e(theta a mbar/n)`
and `A ⊂ [A,2A]`, `M ⊂ [M,2M]`, `N ⊂ [N,2N]`, each set an interval **or
consecutive elements of a congruence class**, with `|M| << M X^(-eta)`
**and** `|N| << N X^(-eta)` for some `eta>0`:

\[
 \mathcal B\ll\|\alpha\|\|\beta\|\|\nu\|X^\epsilon
   \Big(1+\tfrac{|\vartheta|A}{NM}\Big)^{1/2}
   \Big[A^{1/2}\big(M^{1/2}N^{3/8}+M^{3/8}N^{1/2}\big)
    +A^{7/20}\big(M^{3/5}N^{7/20}+M^{7/20}N^{3/5}\big)X^{-2\eta/5}\Big].
\]

The norms used below are `||alpha||_2 << M^(1/2)log x`,
`||beta||_2 << B N^(1/2)log x` and `||nu||_2 << C A^(-1/2)` (since
`|c_h|<=C/A` on a band of at most `A+1` harmonics), evaluated on the top
band `A ~ MN/x`, where `f=1` and `(1+|theta|A/(NM))^(1/2)=O(1)`. At the
target box that prefactor is `x^(1/2)`; at the corner (`M=N=A=x`) it is
also `x^(1/2)`. At `eta=0` the display is exactly Bettin-Chandee
Theorem 1 rewritten
(`(AMN)^(7/20)(M+N)^(1/4) = A^(7/20)M^(3/5)N^(7/20)` for `M>=N`, and
similarly for the other bracket), which reproduces the wave-1 pricing:
prefactor `x^(1/2)`, first term `399/400`, second term `129/125` — the
second term is the whole failure, and it is exactly the term the `eta`
saving attacks. Required: `X^(-2eta/5)<=x^(-4/125)`, i.e.
`X^(-eta)<=x^(-2/25)` with `X=MN=x^(53/50)`.

**Why it does not apply.** The subdyadic hypothesis is on the two
*inverted* variables `m` and `u`, not on the harmonic band; the short
harmonic band `A ~ x^(3/50)` is irrelevant to it. Our `m`-support is the
full dyadic box and so is our `u`-support, so `eta=0`. The only structure
that makes them subdyadic in the required "congruence class" sense is
fixing the prime-power variables: for fixed `r`, `m=dr` runs over
consecutive multiples of `r`, of size `M/r`; for fixed `q`, `u=eq` runs
over consecutive multiples of `q`, of size `N/q`. A common `eta` is then
limited by the *smaller* shortening, `X^(-eta)=1/q>=x^(-1/20)`, and the
outer sum over the `R=x^(6/25)` values of `r` and `Q=x^(1/20)` values of
`q` costs `RQ=x^(29/100)` while the norms only drop by
`(RQ)^(1/2)=x^(29/200)`. The block exponent goes from `129/125=1.032` to

\[
 \underbrace{29/100}_{\text{count}}+\underbrace{71/200}_{\text{norms}}
 +\underbrace{133/250-1/50}_{\text{bracket}}=1157/1000,
\]

i.e. **strictly worse**. Generally, manufacturing `X^(-eta)` by cutting
both supports into `K` pieces costs `K^2` applications against `K^(-1)`
in the norms and `K^(-2/5)` in the bracket: a net loss `K^(3/5)`.
*Failed step:* the subdyadic gain `X^(-2eta/5)` is smaller than the
`X^(eta)` price of creating the shortness. What would change this: a
natural sub-dyadic support on both `m` and `u` simultaneously, arising
from the arithmetic rather than from subdivision, with `X^(-eta)` below
`x^(-2/25)`. Our supports are dyadic boxes of the original divisor
domain, so none is present.

At the corner Wright/BC gives `15/8` (first bracket `11/8` over a
prefactor `1/2`; second `9/5`), far above 1, and no `eta` is available
there either.

The scout's confirmation of Wright v2 of arXiv:2604.25177 Theorem 2.1 at
byte level is consistent with the earlier pricing recorded in
[small-divisor-kernel.md](small-divisor-kernel.md) and
[SEARCH-CONVENTIONS.md](SEARCH-CONVENTIONS.md); nothing in this note
depends on it.

### 6.2 Guria, arXiv:2410.10856v2 (19 Dec 2024), Theorems 1.2-1.3

Read at source (PDF text, 2026-09-06). Theorem 1.2: for arbitrary
`alpha(n)=O(n^eps)` and nonzero `r`,

\[
 S_r(X)=\sum_{|a|,|b|,|p|,|d|\le X,\ ad-pb=r}\alpha(a)
 = 8\sum_{a\le X}\frac{\alpha(a)}{a}\sum_{p\le X}\int_1^X
   w\Big(\frac{|r|+px}{a}\Big)dx
 +O\big(X^{7/4+\epsilon}+r^{1/5}X^{1+11/20+\epsilon}\big),
\]

with `p` prime and `b,d` integers; Theorem 1.3 is the specialisation with
`alpha` the prime indicator, giving `8K_r li(X)^2 + O(X^(7/4+eps))` for
`r<=X`. The mechanism is Poisson summation in the unweighted variables
plus averaging Kloosterman fractions over the prime `p` — the item-3
alternative to Cauchy.

**What fails when both remaining weights are Möbius.** Our determinant
equation `dk-et=2` is (1.6) with `r=2`, but:

1. **Guria has two variables of weight exactly 1** (`b` and `d`), and it
   is on those that Poisson summation is run; the single arbitrary weight
   is on `a` and the prime is `p`. Our four weights are `mu(d)`,
   `beta_V(k)`, `mu(e)`, `beta_Z(t)` — **no variable carries weight 1**.
   Attaching `mu(e)` to the Poisson variable turns the theorem's main
   term into a Möbius sum over an interval in a progression, which is
   precisely the untwisted density
   [signed-divisor-grouping](signed-divisor-grouping.md) already
   subtracts. The theorem's main term corresponds to the part of our
   problem that is done; the part that is open is its error term.
2. **The prime variable is not ours.** Guria averages over `p` prime,
   `p<=X`. Our analogous variable is the cofactor `k=n/d` carrying
   `beta_V(k)=sum_{r|k,r>V}Lambda(r)`, supported on integers with a large
   prime-power divisor, not on primes, and its range is coupled to `d` by
   `dk in J_x`. A Poisson-plus-prime-average argument would have to be
   redone for that weight and that coupling; nothing in the paper does it.
3. **The error is far too large in our normalisation.** Her box is
   `[-X,X]^4` with `~X^(2+eps)` solutions and error `X^(7/4+eps)`, a
   relative saving `X^(1/4)`. Our residual lives on a thin sub-box with
   total mass `~x` (times logarithms) and needs an absolute error
   `O(x/log^K x)`. Taking `X=x` so that our four variables fit gives
   `x^(7/4)`, useless by `x^(3/4)`.

**Reusable, not imported:** the direction "average the Kloosterman
fraction over one prime variable rather than Cauchy it away" is exactly
the resource Lemma II throws away (it sums `u` and `h` absolutely) and the
grouped moment spends on a second moment. A version of Guria's Poisson
step adapted to `beta`-weighted cofactors, with a Möbius weight on a
second variable, is an open direction, not a bound. This is a failed
import, not a refutation.

## 7. Region of validity and effect on the global consumer

Lemmas I and II hold on every box of the original domain, with constants
depending only on `epsilon` and the fixed power bounding the lengths, and
uniformly over: both gcd branches `g in {1,2}`, both endpoint conventions
(native `x/2,z` with `sigma=-1`, reciprocal `x/2-2,z-2` with `sigma=+1`),
arbitrary harmonic subsets `H ⊆ [A,2A]`, all four coefficient sectors, the
low, squarefree, repeated-prime and prime-2 classes, and — for Lemma II —
the independent divisor twists at all Perron heights. Lemma I is uniform
in the twists only at heights `x^(o(1))` (§2).

**Effect on (20): none.** A whole box is controlled by Lemma II only if
its worst sector is, i.e. only if, with `a=delta+6/25`, `b=nu+1/20` and
`s_A=delta`,

\[
 b+a-\tfrac{1}{2}(a-\delta)<1,\quad
 \tfrac54 b+a-\tfrac{\delta}{2}<1,\quad a+\tfrac b2<1 .
\]

Lemma II also carries the hypothesis `B_2<N`, which for the split used
here (`B_2=x^(6/25)`) reads `nu>19/100`; the target box `nu=9/20` satisfies
it with room, so the `41/40` headline of §4 is unaffected. On a
`191 x 191` rational grid over the full domain `delta in [6/25,19/25]`,
`nu in [1/20,19/20]`, the three displayed inequalities hold on 9943
boxes, of which **5153 also satisfy `nu>19/100`** and so are genuinely
controlled by Lemma II. **0 boxes of either count lie outside the region
already controlled** by `delta+nu<19/25`, `5delta+2nu<123/50`, or
`(delta<19/25 and delta+3nu<161/100)`; the larger count ignores the
hypothesis and is therefore the conservative one for that conclusion. So
`W_dagger`, `E_dagger`, the
exact cuts (19) and the reduction (20) are unchanged, and so is the
uniform product threshold (every fixed exponent below 19/25). The only
movement is the local one of §4.

**What would need to change, term by term.**

| failed step | what would fix it |
|---|---|
| Lemma I on the balanced Heath-Brown piece (`m=n_1n_2`, both `~x^(7/25)`) | a Type II estimate for two arbitrary sequences of length `x^(7/25)` against `e_u(theta h mbar)` with the `u,h` average retained, saving more than `x^(1/40)` over `41/40` |
| Lemma II's Weil term `A_2^(1/2)B_2N^(1/4)` at `A_2=x^(8/25)`, `B_2=x^(6/25)` | either cancellation over `u` (Lemma II sums it absolutely) or a bound better than `sqrt(u)` for the completed `d`-sum with a fixed nonzero numerator |
| Lemma I's twist-height dependence | a cut separation with twists of height `x^(o(1))`, or a boxwise argument that avoids straddling the cuts |
| Bettin-Chandee/Wright first bracket term at `eta=0` | a genuinely subdyadic support on both `m` and `u`, `X^(-eta)<x^(-2/25)`, arising from the arithmetic |
| FKM Thm 1.7 exponent `1/48` and its prime-modulus hypothesis | `eta'>3/25` for composite `u`; a factor `5.76` in the exponent, plus the composite extension |
| everything, at the corner `a=b=1` | cancellation in the `u`-aggregate: no per-block bound suffices, since `eta'>1` is twice the square-root value `1/2` |

None of these is an obstruction. Each is a failed upper bound with a
named missing input. The signed target
[grouped-divisor-moment (21)](grouped-divisor-moment.md), the complement
`E_dagger`, and the sufficient margin `C_2x+E_dagger>=c_0x/(log x)^K`
remain exactly as open as before.

## 8. Validation, falsifiers, limits

[left-divisor-signs-validation.js](left-divisor-signs-validation.js)
(deterministic, 2.1 s, output embedded by `node research/qc/embed.js`)
checks, in exact BigInt rationals, all block exponents quoted above; the
closed forms (1) and (2) against a `201 x 201` sector lattice; the crossing
at `sigma=3/100`; the Type I threshold `1/4` against the Cauchy exponent
`7/25`; the corner table; the required `eta'` values against the
square-root ceilings and the FKM ceiling; the Bettin-Chandee/Wright
pricings; and the global grid, under both the plain and the `nu>19/100`
counts, showing no added region. It also verifies
finitely the three elementary inputs of the lemmas: the identity
`(bbar_1-bbar_2,u)=(b_1-b_2,u)` and the majorant
`G'<=2(h,u)(b_1-b_2,u)`; the averaged gcd bound over a difference range;
the completion bound including its complete-period term; and the exact
convolution identity of endpoint-fourier (5) together with the support
claim that only the prime-power term of `A_1` reaches beyond the original
interval.

Negative controls, all firing: pricing every sector at the top support
(`droppedSectorSplit`); dropping the complete-period term
(`droppedPeriodTerm`); dropping the harmonic gcd factor from `G'`
(`wrongGcdBranch`, 59660 detected violations); dropping Lemma II's
diagonal in the left orientation, which would wrongly look sufficient
(`typeIIWithoutDiagonal`); claiming a corner asymmetry between the two
orientations (`claimedCornerAsymmetry`); and claiming the corner is
reachable (`cornerReachable`).

**Falsifiers, and whether they have run.** (a) An error in Lemma I's or
Lemma II's derivation — the exponent arithmetic has been checked
mechanically, the analytic steps have not been independently reviewed;
this check has NOT run. (b) A sector of the target box outside the
parametrisation `(rho,sigma)` — the support claim was checked finitely
for four `(D,W)` pairs only, not proved for all; the proof is the two
displays in §1 and is one line, but it is mine. (c) A box where Lemma II
adds region — searched on the rational grid of the validator, with zero
such boxes returned (this is a finite grid search over our own budget
inequalities, not a literature claim); a grid is not a proof, and
the boundary strips were not examined separately. (d) The upstream
reduction to `sum_m A_left(gm)Y(m)`, unreviewed here and in the wave-1
review.

Finite checks certify their stated finite scope. They cannot establish an
asymptotic rate, an effective onset, a percentage of completion, or any
lower bound on twins.
