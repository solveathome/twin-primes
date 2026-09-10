# 17-signed-moment — report

**Question.** Is there an argument for the block `T = sum_m A_left(gm) Y(m)` that
does not pay `sqrt(M)` at the first Cauchy inequality or that extracts
cancellation from the `R=0` class, and what are its budgets at the corner
`a=b=1` and at the target box `(delta,nu)=(8/25,9/20)`?

**Calibration and global payoff.** Two DERIVED elementary lemmas (one pass, by
me, not independently reviewed), one CONDITIONAL budget, one HEURISTIC ceiling.
**Global payoff: none.** No region added, `W_dagger`, `E_dagger`, the consumer
grouped-divisor-moment (20), the reduction `S(x)=C_2x+E_dagger+O_H(x/log^H x)`
and the uniform product threshold are all unchanged; the sufficient margin and
twin-prime infinitude remain OPEN. Nothing beats `41/40` at the target box.
Files: `research/signed-moment.md`, `research/signed-moment-validation.js`
(embedded via `node research/qc/embed.js`, 0.4 s, 29 assertions, 6 controls all
firing).

## The caveats first

- Lemma B **adds no region**: 6906 usable grid boxes on a 191x191 lattice, **0**
  outside the region already controlled. At the benchmark `(2/5,2/5)` it is
  `209/200`, strictly **worse** than the grouped moment's `199/200`. At the
  target box it ties the grouped moment at `103/100` and loses to
  left-divisor-signs' `41/40`. Its only advantage is at the corner.
- The corner is still not reached. Lemma B gives `3/2` there against a required
  `1-eta`. Even granting complete cancellation in the right Möbius signs it
  gives exactly `1`, with no fixed margin.
- The heuristic ceiling below is heuristic: a random model plus an assumed
  square-root cancellation. The rigorous half (Khintchine) is missing a lower
  bound on `sum_{u,h}|G(u,h)|^2` that nothing here supplies.
- No literature imported, nothing re-verified at source. Every pricing quoted
  for Bettin–Chandee/Wright, FKM, Wu–Xi, Guria is the one already recorded in
  left-divisor-signs §6 / small-divisor-kernel §5 / structural-literature-audit
  §3D, taken as given.

## The exact expansion

With `G(u,h) = sum_{m in I_m,(m,u)=1} A_left(gm) e_u(sigma theta h mbar) Phi_{u,h}(m)`
and `T = sum_{u,h} b_u c_h G(u,h)`,

`|T|^2 = (a) + (b) + (c)`, split by `(a)` = `m1=m2,u1=u2,h1=h2`,
`(b)` = `m1!=m2,u1=u2,h1=h2`, `(c)` = `(u1,h1)!=(u2,h2)`, with phase
`e(sigma theta[h1 m1bar/u1 - h2 m2bar/u2])` and the four endpoint terms of
`Phi(m1) conj(Phi(m2))`.

## 1. The true diagonal is NOT binding — the item-1 dichotomy resolved

`(a) = sum_u |b_u|^2 sum_h |c_h|^2 sum_m |A_left(gm)|^2 |Phi|^2`
`≍ B^2C^2 f^2 (MN/A) log x`. On the top band `A ~ MN/x` this is `f^2 MN/A = x`
identically, at **every** box including the corner. But that is a contribution
to `|T|^2`: it is `|T| ≍ x^(1/2)`, a power **below** the requirement
`|T| << x^(1-eta)`, not at it. The assignment's parenthetical ("if (a) is
already of size x at the corner, no argument of this shape can help") compares
`x` to `x^(1-eta)` at the wrong power; the correct comparison is `x` against
`x^(2-2eta)`.

**What the first Cauchy costs, exactly.** `|T| <= F * Mom^(1/2)` with
`F^2 = sum_m|A_left|^2 ≍ M log x` and `Mom`'s diagonal `≍ f^2 MN/A ≍ x`, so the
m-Cauchy bounds the diagonal's contribution to `|T|^2` by `F^2 x ≍ M x log x`
whereas it really is `x log x`. **The first Cauchy inflates the true diagonal
by exactly `F^2 ≍ M log x`,** which at `a=1` is `x` — the entire zero-budget
deficit. Reachability-coverage §5.2's judgement ("the loss is the Cauchy step")
is confirmed and the missing factor identified.

**Floor of the whole m-separated family (derived).** Random Rademacher
`b_u, c_h` give `E[Mom] ≍ B^2C^2 f^2 MN/A`, so some admissible coefficient
choice attains it; since the estimate must be uniform in admissible
coefficients, no m-Cauchy argument beats `x^((1+a)/2)`. Hölder in `m` with
`p<=2` obeys `||A||_p ||Y||_(p') >= M^(1/2)||Y||_2`, so the whole family is no
better than Cauchy. **The zero budget `(1+a)/2` is exactly the ceiling of
separating `A_left` from `Y` in `m`.**

## 2. Lemma A (DERIVED): the whole (u,h)-diagonal, including R=0

Key elementary step, used twice: `(a)+(b)` is a sum of **nonnegative** terms in
`h`, so the arbitrary harmonic subset `H` may be completed to the full band
`[A,2A]` for free; and `Phi_{u,h}(m)` is a difference of two **pure
exponentials in h**, so the h-sum is a geometric series — no partial summation,
no completion, no Weil/Ramanujan input, hence no composite-modulus obstacle.

`(a)+(b) <<_eps B^2C^2 x^eps f^2(1+v)[MN/A + M^2/A + (M^2N+MN^2)/A^2]`,
and on the top band `<<_eps x^(2-min(a,b)+eps)`.

That is a power below `x^2` at **every** box (36481/36481 grid boxes). As a
`|T|` bound it permits `x^(1-min(a,b)/2)`: `x^(1/2)` corner, `x^(3/4)` target,
`x^(31/40)` benchmark. **Neither the true diagonal nor the R=0 class is what
blocks the corner. The whole obstruction is the (u,h)-off-diagonal (c).** No
Kloosterman input (FKM Thm 1.7 and its prime-modulus hypothesis) is needed for
(b) at all; the h-positivity completion replaces it.

## 3. Lemma B (DERIVED): Cauchy in the harmonic variable

`|T| <<_eps BC x^eps f(1+v)^(1/2)[MN/sqrt(A) + M sqrt(N) + N^(3/2)sqrt(M/A) + N sqrt(M)]`

Proof: Cauchy in `h` (cost `C/sqrt(A)`), complete `H` to `[A,2A]` by positivity,
combine the two inverse phases exactly as structural-literature-audit §2 (1)
into `e_c(sigma theta h P)`, `c=[u1,u2]=j l1 l2`,
`P = m1bar l2 - m2bar l1 mod c`; the h-sum is a geometric series; for fixed
`(u1,u2,m1)` and `t = m2bar mod u2` the frequency `P = P0 - t l1` runs
bijectively over the coset `P0 + l1 Z/cZ` of size `c/l1 = u2`, with nonzero
elements spaced `l1 g'`, `g'=(theta,j l2)<=2`; each `t` carries `<= M/u2+1`
values of `m2`. Entirely elementary — no Weil, no completion, no bilinear
theorem — and uniform over arbitrary harmonic subsets, both gcd branches, both
endpoint conventions, all four coefficient sectors including prime powers, and
over the Perron twists at all heights (only moduli are used, so Lemma I's
twist-height obligation does not arise).

On the top band the four block exponents are
**`(1+a+b)/2`, `b+1/2`, `a+b/2`, `b+a/2`** — **there is no `(1+a)/2` term.**
This is precisely the falsifier reachability-coverage §5.3 named and left as an
outstanding check ("a block-budget list whose zero-frequency term is below
`(1+a)/2`"). Such a shape exists. It does not reach the corner.

## 4. Budgets (exact rationals, validator §A)

| box | a | b | grouped R | grouped L | Lemma B | Lemma A on the square | Lemma B u-diag (COND.) | heuristic ceiling |
|---|---|---|---|---|---|---|---|---|
| corner (19/25,19/20) | 1 | 1 | 2 | 2 | **3/2** | 1 | 1 | 1 |
| target (8/25,9/20) | 14/25 | 1/2 | 103/100 | 109/100 | **103/100** | 3/2 | 39/50 | 3/4 |
| benchmark (2/5,2/5) | 16/25 | 9/20 | 199/200 | 237/200 | **209/200** | 31/20 | 41/50 | 29/40 |
| (8/25,11/25) | 14/25 | 49/100 | 203/200 | 217/200 | **41/40** | 151/100 | 39/50 | 149/200 |
| d-edge (19/25,1/20) | 1 | 1/10 | 1 | 31/20 | **21/20** | 19/10 | 1 | 11/20 |
| e-edge (6/25,19/20) | 12/25 | 1 | 87/50 | 61/50 | **3/2** | 38/25 | 1 | 37/50 |

Lemma B usable iff `a+b<1` and `b<1/2`: 6906 grid boxes, 0 outside the
controlled region. It beats both grouped orientations on 16173 boxes (all with
`a,b > 1/2`), on none of which is it below 1.

## 5. Decisive inequalities, and where the remaining loss is

**At the corner.** `|T|^2 <= (C^2/A) sum_{h~A}|W(h)|^2`; Lemma B's moment is
`x^4` there and the requirement is `x^(3-2eta)`. **Failed inequality:
`x^4 <= x^(3-2eta)`; a saving of `x^(1+2eta)` in that moment is needed,
i.e. `1/2+eta` in block exponent.** Lemma B takes absolute values in exactly
two places:

1. `|b_{u1} conj(b_{u2})| <= B^2` — the right Möbius signs. Keeping only the
   `u1=u2` part (CONDITIONAL, assumes unproved cancellation across u-pairs)
   gives block exponents `(1+a)/2, a, (1+b)/2, (a+b)/2`, max **`(1+max(a,b))/2`**:
   `39/50` at the target box, **exactly 1 on both edges including the corner**
   (below 1 on 36100 of 36481 grid boxes, on none of the 381 edge boxes). So
   even total cancellation in the right divisor leaves the corner at exactly
   the failure threshold with no fixed margin. The object is the signed
   cross-divisor sum residual-coverage (19)-(20) transposed to the harmonic
   Cauchy at `a=b=1`; its analogue there is written nowhere in this corpus.
2. `|A_left(gm1) conj(A_left(gm2))| << log^2 x` — the left Möbius signs. The
   remaining `x^eta` has to come from here. With both retained the object is a
   four-fold Möbius correlation over `(m1,m2,u1,u2)` against the phase of the
   pair kernel — which is where corner-correlation.md arrives from the other
   side (`sum_n mu(n)mu(n-2)L(n)L'(n-2)`, a one-sided bound there being, given
   the complement, the twin margin itself). **The two readings agree: the
   corner needs cancellation in both Möbius coefficients at once.**

**At the target box.** Lemma B ties the grouped moment at `103/100`;
left-divisor-signs' `41/40` is still the best; deficit `1/40` in block exponent,
more than `1/20` of moment-exponent saving. Nothing moved at this box.

## 6. HEURISTIC arbitrary-coefficient ceiling (the sharper statement, flagged)

Model: (i) `|G(u,h)| ≍ f M^(1/2)` for typical `(u,h)` (square-root cancellation
in `m`); (ii) the `N x A` array `(G(u,h))` has `||G||_(inf->1) ≍ ||G||_F(sqrt N + sqrt A)`.
Then `sup_{|b_u|<=B,|c_h|<=C/A}|T| ≍ BCf[N sqrt(M/A) + sqrt(MN)] = x^((1+b)/2)`
on the top band, and `x^((1+a)/2)` in the reciprocal orientation, hence
**`x^((1+min(a,b))/2)` — exactly the better of the two zero-frequency
budgets.** Below 1 at every box of the domain **except the corner, where it is
exactly 1**. If the model holds, **no argument using only `|b_u|<=B` and
`|c_h|<=C/A`, however organised, reaches `x^(1-eta)` at the corner**; the best
any reorganisation of Cauchy can do there is exactly `x^1`. Scope:
arbitrary-coefficient arguments only; asserts nothing about arguments that use
the actual coefficients, and it is not an obstruction claim.

Rigorous half available: `sup|T| >= c B(C/A) sum_u (sum_h|G(u,h)|^2)^(1/2)`
(Khintchine, then align `b_u`). Missing: a lower bound on
`sum_{u,h}|G(u,h)|^2`. Lemma A's upper bound on the `m1!=m2` part is the same
order as the `m1=m2` part at the corner, so no lower bound follows. Grid
consistency control: the ceiling never exceeds a proven bound (36481/36481);
any proven bound below it refutes the model.

**Explicit answer to the assignment's item-4 request:** the true diagonal (a)
is **not** the binding constraint, so the corner is **not** excluded by a
second-moment/absolute-diagonal argument. The sharper statement that survives
is the heuristic ceiling above, whose scope is *arbitrary-coefficient arguments
on the top harmonic band*, and it is HEURISTIC, not derived.

## 7. Other arrangements priced

- Cauchy in `u` = the left orientation by reciprocity (small-divisor-kernel §4);
  already in the corpus. Corner `2`, target `109/100`.
- Cauchy in `(m,h)` jointly: diagonal floor `M sqrt(N)` (`3/2` corner, `81/100`
  target — below `41/40`), but the `u1!=u2` part has completion modulus
  `c=u1u2/j` up to `N^2`, exceeding `M` at the corner, so nothing can be
  completed there. **Open, not priced**; the `81/100` floor makes it the one
  arrangement worth working out next at the target box.
- Hölder in `m`, `p<=2`: provably no better than Cauchy. `p>2`: would need `Y`
  concentrated on a sparse set of `m`; heuristic, nothing suggests it.
- No-Cauchy `L^1` over `(u,h)` against Lemma A's second moment: identical
  numbers to Lemma B (`3/2` corner, `103/100` target), as it must be.

## 8. Effect on the global consumer

**None.** No budget falls below 1 outside the already-controlled region.
`W_dagger`, its concrete cuts, `E_dagger`, the reduction and the sufficient
margin `C_2x+E_dagger >= c_0 x/(log x)^K` are unchanged and OPEN. The rescaled
average and dyadic-block forms are unchanged.

## 9. Validation and what would change the reading

`node research/qc.js` reports 2 findings, both integration steps I was barred
from making: `crosslinks` (no existing working document cites the new note) and
`ledger-todo-unlisted` (TODO item C does not list `Q-signed-moment`). Both are
flagged in the note's last paragraph, together with the owed `OUTCOMES.md`
entry and QUESTIONS regeneration. `node research/qc/selftest.js`: 58/58
positives fire, 47/47 controls silent.

Validator checks: block exponents at six boxes; all four Lemma B terms equal
`3/2` at the corner; grouped zero budget exactly 1 there; the 191x191 region
comparison; the conditional (9) below 1 on exactly the 36100 interior boxes;
the ceiling never above a proven bound. Finite identities: the phase
combination on 995328 configurations; the `l1`-spaced coset on 3481 modulus
pairs (size `c/l1 = u2` and membership); the geometric-series sum bound with
absolute constant below 2 over 8192 configurations; the per-residue inverse
count `<= |I|/u + 1`; `Phi` a difference of pure exponentials in `h` with
`|Phi| <= 2 pi min(1, h|z-z0|/(gmu))`. Six negative controls, all firing,
including reading Lemma A's `x^1` as a `|T|` rather than a `|T|^2` exponent.

Would change the reading: (a) an error in Lemma A or Lemma B — the analytic
steps have **not** been independently reviewed; (b) a proven block bound below
`x^((1+min(a,b))/2)` at any box, which refutes the heuristic ceiling outright;
(c) an estimate for the `u1!=u2` part of the `(m,h)`-Cauchy moment at large
`j`, which would reopen the `81/100` floor at the target box; (d) an error in
the upstream reduction to `sum_m A_left(gm) Y(m)`, unreviewed here and in the
wave-1 review.
