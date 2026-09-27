# Attack C: the last 0.209 of theta_total

<!-- ledger
id: Q-theta-last-gap
status: CLOSED
todo: none
question: Can the last 0.209 of theta_total be recovered by sharper absolute-value accounting?
verdict: No: theta_total stays 1 and the obstruction now carries an exponent, the absolute-value ceiling is c*H^theta_total with c > 0 rather than H*polylog, so the shortfall is a power H^0.212 and the entire budget any constant could ever buy is O(lnln H / ln H) against a break-even of 1.208983.
-->

**HEADLINE. The defensible `theta_total` is still 1, the break-even re-derives at
1.208983, and the obstruction at the margin now has a name and an exponent: the
absolute-value ceiling is `c * H^{theta_total}` with `c > 0`, not `H * polylog`.
It is a power of `H`, so no sharper constant and no refinement of absolute-value
accounting can reach 1.209 — the shortfall is `H^{0.212}` and the entire budget
a constant could ever buy is `O(lnln H / ln H)`.** Four things are new: the
ceiling is now an exact finite computation (a maximum over 2-colourings of the
odd primes below `z`); the `(+,+)` diagonal term is shown to be free, so the
missing lemma is needed for the cross terms alone at levels exactly
`(H^{1/2}, H^{0.7122})`; independent levels per component are shown to buy
nothing; and the corpus's flagged open arithmetic is closed — Brüdern–Fouvry's
published `0,2406` **is** our threshold function at their own split, and their
split is not optimal for their own side condition.

Script: `research/attack-theta-margin.js` — seeded, 110.7 s, exit 0, output block
written by `research/qc/embed.js` (code-sha256 `c25181abf402aa88…`,
out-sha256 `7c74e8ec63f12798…`), so every figure quoted below is the machine's.

---

## 1. The 0.209, isolated as an inequality chain

The vector-sieve inequality is
`th1(r) th2(r+2) >= L1- L2+ + L1+ L2- - L1+ L2+`. Both components are linear
sieves over `p < z`, so both take the **same** majorant level `D+ = H^a` and the
same minorant level `D- = H^b`; the asymmetry that pays is majorant against
minorant, not component against component. Summing over the window and
evaluating each factor with `F(s) = 2e^g/s` and `f(s) = 2e^g ln(s-1)/s`
(`s = u * a` or `u * b`, in units of `ln z`, `H = z^u`), the main term is a
positive multiple of

    2 s+ ln(s- - 1) - s-  >  0     i.e.     u > (1 + e^{b/2a}) / b .

The moduli that appear are `d1 d2` with `d1 <= D+, d2 <= D-` in the two cross
terms and `d1, d2 <= D+` in the diagonal, so
`theta_total = ln(max modulus product)/ln H = a + b` at the optimum (where
`b > a`). The threshold function is homogeneous of degree `-1` in `(a,b)`, so

    min over the split of  theta_total * u  =  K = 5.1580646803   at b/a = 1.3130863738
    u_min(theta_total) = K / theta_total
    break-even against beta_2 = 4.26645028 :  theta_total* = K/beta_2 = 1.2089827

**[VERIFIED, `research/attack-theta-margin.js` §A.]** This confirms `sift-limit-attack.md`
§4.5's corrected 1.2090 to seven places and confirms that the symmetric split
`a = b` gives the *worse* `2(1+sqrt e) = 5.29744254`, which is the coupled figure.
The sieve-function validity ranges are satisfied at the optimum: `u*a = 2.2299`
lies in `[1,3]` where `F` is exact and `u*b = 2.9281` lies in `[2,4]` where `f` is.

**What is proved at `theta_total = 1`.** `|r_{d1,d2}(x)| <= 1` at every window
position, so the remainder is at most the pair count, and `D+ D- <= H^{1-eps}`
makes that `<< H^{1-eps}`. Nothing else is used, and nothing else is available.

**What is needed at 1.2090.** The pair count is now `H^{1.209}`, which exceeds the
window length. The requirement is a **saving of `H^{0.209}`** in a signed
bilinear sum over a fixed lattice of divisor pairs, uniformly in `x`.

**Where the two differ, with numbers.** Exactly one step: the passage from
`sum |lambda lambda r|` to `|sum lambda lambda r|`. Nothing else in the chain
changes. Writing `|R| ~ (pair count)^gamma`:

| accounting | gamma | saving | verdict |
|---|---|---|---|
| absolute values | 1.000 | none | `theta_total <= 1` |
| **needed** | **0.824975** | **`H^{0.212157}`** | break-even |
| square-root cancellation | 0.500 | `H^{0.606079}` | far more than needed |

**The needed input is 35.0 per cent of square-root cancellation, in log scale**
**[VERIFIED, §E].** That is the single most useful number in this report: the
0.209 does not need a hard estimate, it needs *any* power saving at all.

## 2. The diagonal is free, and the lemma shrinks

The `(+,+)` term carries moduli `d1 d2 <= D+^2 = H^{2a}`. At the unconstrained
optimum `a = 0.522670`, so `D+^2 = H^{1.0453}` and the diagonal is also outside
the trivial range. Forcing `a <= 1/2` puts the diagonal exactly at `H^1`, where
absolute values already suffice, and costs

    theta_total  1.208983  ->  1.212157      (a = 1/2 exactly, b = 0.712157)

a price of **0.003175 [VERIFIED, §D]**. So the missing estimate is needed for the
**cross terms only**, at levels exactly `(H^{1/2}, H^{0.712157})`, where the two
moduli come from *different* weight systems — `lambda+` against `lambda-`. The
short side is exactly `H^{1/2}`, which is the length at which completion methods
for incomplete Kloosterman sums start to pay. Every number below uses this
working point, `theta = 1.212157`.

## 3. Independent levels per component buy nothing, and the trap that says they do

Giving each component its own majorant and minorant level (four free parameters
`D1+ = H^P, D1- = H^Q, D2+ = H^R, D2- = H^T`) turns positivity into
`P T ln(uQ-1) + Q R ln(uT-1) > Q T` with
`theta_total = max(Q+R, P+T, P+R)`. Minimising `u` at `theta_total <= 1` over
1500 seeded restarts with local descent returns

    u = 5.1580646803  at  P = R = 0.432323, Q = T = 0.567677

— the symmetric point, to ten places, gain `0.0000000000` **[VERIFIED, §C]**.

**The trap, recorded because it cost a search.** With the linear sieve's validity
ranges dropped, the identical search reports `u = 4.697691` at `u*P = 0.0063`, an
apparent gain of 0.4604 that would clear the break-even at `theta_total = 1`. It is
the formula being read outside its range: `u*P < 1` means `D1+ < z`, where
`F(s) = 2e^g/s` is not the sieve's `F` at all. Any future re-optimisation of this
threshold must carry `1 <= u*a <= 3` and `u*b >= 2` explicitly.

## 4. Brüdern–Fouvry reconciled: the flagged open arithmetic is closed

`sift-limit-attack.md` §7b flags, as open, that our `5.158065/theta_total` reads
`4.126452` at `theta_total = 5/4` where Brüdern–Fouvry report `4.156000`. The
discrepancy is not an error on either side. **Their number is our threshold
function evaluated at their split** **[VERIFIED, §B]**:

    u(a = 1/2, b = 3/4) = 4.1560000222 = (4/3)(1 + e^{3/4})     ->  1/u = 0.2406159756
    their published constant, read from their own Theoreme :        "0,2406"
    1/beta_2 = 0.2343868868 ;  the DHR figure they quote :           "0,2343"

Both constants match their text to every digit they print (`BF.txt` line 146,
numdam `CM_1996__102_3_337_0`: *"tendant vers 0,2406"* and *"de theta a
1 4.2664 = 0,2343..."*). Their `(x^{1/2}, x^{3/4})` is `(majorant, minorant)` and
`a + b = 5/4` saturates their Proposition 2 side condition
`q^{C0} D1^4 D2^4 <= x^{5-c eps}`. **[PROVEN, their theorem; the identification is
INFERRED and arithmetically exact.]**

**Consequence, and it is a small new result about a published theorem.** Their
side condition constrains only the **product** `D1 D2`, so the split is free
inside it. The optimal split at `theta_total = 5/4` gives `u = 4.1264517443`,
i.e. `theta = 0.2423389541`. Brüdern–Fouvry therefore leave **0.0295482779 in
exponent (0.0017229785 in their own currency) unclaimed in their own theorem**,
subject only to their other three side conditions being insensitive to the split
— which we have not checked and which is the one caveat.

**[ABSENT: no published re-optimisation of that split.]** Channels, both
calibrated this session: OpenAlex — calibration, the search `Le crible a
vecteurs` returns the target work `W2581797856` (1996, 10 citations) as its first
hit; the citation filter `cites:W2581797856` returns all 10 citing works, and all
ten apply the vector-sieve *machinery* to Waring–Goldbach, Lagrange-four-squares
and Diophantine-approximation problems, none to the `n, n+2` constant. WebSearch —
calibration, the query naming the paper returns the numdam PDF as first hit; two
further queries on improving the constant and on optimising the level split
return nothing on either. Semantic Scholar returned HTTP 429 on the first call
and **no negative is claimed from it**. Owning convention per
`research/SEARCH-CONVENTIONS.md` §1: the paper's own object is the pair
`(n, n+2)` with both least prime factors above `x^theta` and `n = 1 mod q`.

## 5. The ceiling on absolute values, computed exactly

This is the section that names the obstruction. **`sup_x` of the absolute-value
remainder is set by one integer, and that maximum is a finite computation.**

Let `S1, S2` partition the odd primes below `z`. By CRT there is `n0 < P(z)` with
`n0 = 0 mod prod(S1)` and `n0 + 2 = 0 mod prod(S2)`. Then **every** pair
`(d1, d2)` with `d1 | P(z)` squarefree `S1`-smooth and `d1 <= D+`, and `d2`
squarefree `S2`-smooth and `d2 <= D-`, and `d1 d2 > H`, has
`|r_{d1,d2}(x)| = 1 - H/(d1 d2)` simultaneously, at each of the `H` window
positions that hold `n0`. Coprimality is automatic: `g | n0` and `g | n0+2`
force `g | 2`. Conversely, any single integer realises exactly one such
colouring. So

    sup_x (absolute-value sum)  >=  max over 2-colourings of the odd primes < z,

and that maximum is decidable. Computed at the true working point
`H = z^{beta_2}`, `D+ = H^{1/2}`, `D- = H^{0.712157}`, by seeded local search
over colourings **[VERIFIED, §F]**:

| z | H | ceiling | ceiling/H | log(ceiling)/log H | ceiling / coprime-blind count |
|---|---|---|---|---|---|
| 31 | 2.306e6 | 3.900e1 | 1.69e-5 | 0.2501 | 0.00649 |
| 43 | 9.313e6 | 4.030e2 | 4.33e-5 | 0.3738 | 0.00782 |
| 61 | 4.140e7 | 3.681e3 | 8.89e-5 | 0.4682 | 0.00856 |
| 101 | 3.559e8 | 7.339e4 | 2.06e-4 | 0.5690 | 0.00912 |
| 151 | 1.979e9 | 8.030e5 | 4.06e-4 | 0.6352 | 0.00946 |
| 211 | 8.250e9 | 5.330e6 | 6.46e-4 | 0.6783 | 0.00958 |
| 307 | 4.086e10 | 4.078e7 | 9.98e-4 | 0.7172 | 0.00944 |

The measured exponent is still rising and has not reached `theta_total`. **The
squeeze settles where it is going.** Factor the ceiling as

    ceiling = (D+ D-) * [#smooth <= D+ / D+] * [#smooth <= D- / D-] * [high fraction] * [colouring factor]

with `D+ D- = H^{theta_total}` exactly. The four bracketed factors, measured:

| z | #sm/D+ | #sm/D- | high fraction | colouring | product = ceiling/H^theta |
|---|---|---|---|---|---|
| 31 | 0.05927 | 0.006738 | 0.29161 | 0.00649 | 7.557e-7 |
| 101 | 0.06345 | 0.008222 | 0.66446 | 0.00912 | 3.163e-6 |
| 211 | 0.06833 | 0.009651 | 0.80526 | 0.00958 | 5.087e-6 |
| 307 | 0.06947 | 0.010022 | 0.85207 | 0.00944 | 5.597e-6 |

The first two are Dickman densities `rho(u*a)`, `rho(u*b)` times the squarefree
density, converging upward to positive constants; the third tends to 1; the
fourth is flat at 0.0094 across three decades of `H`. **So the ceiling is
`c * H^{theta_total}` with `c > 0`, and the exponent of the absolute-value
ceiling is `theta_total` exactly, not 1.**

**That is the obstruction at the margin, and it is a power.** It cannot be closed
by a better constant, a sharper Rosser bound, a smoothness gain, or any
refinement of `sum |r|`. The only thing a constant could ever buy is the
*average*-position statement, and §F prices that too: `E_x[A]/H` fits
`c (ln H)^k` with `k = 3.1532`, `c = 1.497e-6`, reaching 1 only at `ln H = 70.36`,
`z = 1.451e7`. That is a `O(lnln H / ln H)` movement in `theta_total`. It is not
0.209.

**Why no finite scan can see any of this.** The `H`-scan in §H, run over `2e7`
consecutive positions in the all-divisors surrogate at `theta = 1.2119`, finds a
window sum flat to **3.4 per cent** (`mean 1.7429 H`, `max 1.8020 H`), with the
largest single-integer term at 0.7 per cent of the high-pair count and the longest
run above `1.02 * mean` only `0.1138 H` long. The extremal integer of the
colouring argument has size `P(z)` and no scan of a real range contains one.
Two crossovers, both computed **[VERIFIED, §G]**: the ceiling first exceeds `H` at
`z > 3.87e4` (free-exponent fit) to `z > 6.34e5` (theta-pinned fit). **Below that
`z`, absolute-value accounting at `theta_total = 1.2122` is not obstructed at any
position at all.** A flat scan here is not evidence, and `sift-limit-attack.md`
§4.5's honest-limits paragraph is if anything understated.

## 6. The smallest sufficient improvement, priced

Four candidates, each stated as a lemma and classified mean-value (tractable)
against maximal inequality (this project's wall).

**(C1) Drop only the window phase.** Fourier-expand the sawtooth; by reciprocity
`rho/(d1 d2) = -2 dbar1/d2 mod 1`, so

    R(x) ~ sum_h c_h sum_m e(-h x/m) K_h(m),   K_h(m) = sum_{d1 d2 = m} w e(-2 h dbar1/d2).

**All of the `x`-dependence sits in `e(-hx/m)`.** Take absolute values there and
the estimate is uniform in `x` for free — the quantifier is discharged at no
cost, which is exactly what §7b's `C^{pi(z)}` price does not achieve. What
remains is `sum_m |K_h(m)|`, and `K_h(m)` has at most `tau(m)` terms, so the
entire saving available on this route is `tau(m)`. **CLOSED, asymptotically, with
a crossover [VERIFIED, §G(ii)]:** the requirement is `m^{(theta-1)/theta} =
m^{0.175}` and `tau(m) = 2^{pi(ln m)}`, so the route survives to `z = 1e11` and
is dead from `z = 1e12` on. It is a real kill but a late one, and it is the
reason the window phase cannot simply be discarded: all the cancellation that
could reach `H^{0.212}` lives in the `m`-sum, which is where `x` lives.

**(C2) A maximal inequality with polynomial loss.** The `L2` statistics are
comfortable. Measured at `z = 307`: `sd_x` of the signed sum is `1.894e4` against
`sqrt(H) = 2.021e5`, and `E_x[A]/H = 0.0359`. Needing `sup_x |R| << H` against an
`L2` scale of about `H^{1/2}` means **a maximal inequality is allowed to lose
`H^{1/2 - delta}`** — a polynomial loss, where the classical ones lose
logarithms. Class: still a maximal inequality, so still the wall, but the wall is
being asked for far less than usual, and that is worth recording as the shape any
attempt should take.

**(C3) Weaken the quantifier by covering.** `G2(P(z)) <= (K+1) H` follows if the
certificate is positive at **one** `x` in every interval of length `KH`, not at
every `x`; for constant `K` this costs nothing in the exponent. The bad positions
are the `H`-intervals holding an extremal integer, and those cannot cluster.
Call `n` extremal when every odd `p < z` divides `n` or `n+2`, and write `c(p)`
for which. If `n, n'` are extremal and `c, c'` **agree** at `p`, then either
`p | n` and `p | n'` or `p | n+2` and `p | n'+2`; either way `p | (n - n')`. So

> **Separation.** `prod` over the primes where `c` and `c'` agree divides
> `n - n'`, hence is at most `|n - n'|`.

Given three extremal integers pairwise within `L`, at every odd `p < z` two of
the three colourings agree (two states, three integers), so the three pairwise
agreement sets cover all of them and `P(z)/2 <= L^3`. With `L = K H = K z^{4.27}`
that fails for every large `z`. **So at most two extremal integers lie in any
interval of length `L` once `L^3 < P(z)/2`, and `K = 4` suffices.** [INFERRED;
elementary, and it does defeat the single-integer obstruction of §5.]

**And it dies anyway, for a reason §F measures.** The relaxation controls only
fully extremal integers. The requirement is on `A(x)` as a whole, and `E_x[A]`
— the value at a *typical* position — crosses `H` at `z = 1.451e7`. Above that
`z` the absolute-value accounting fails at typical positions too, and no covering
argument can help. **The covering relaxation buys the range `z < 1.5e7` and
nothing asymptotically.** Class: mean-value, tractable, and useless at the limit.

**(C4) Cancellation only for `d1 d2` in a dyadic window.** Not attempted here.
The reason it is not the next move: §5 shows the ceiling is saturated by one
integer that contributes to *every* dyadic block at once, so a dyadic restriction
does not isolate the difficulty; it partitions it.

## 7. What this leaves

`theta_total = 1`, unchanged, and now with the reason sharpened from "absolute
values are sharp at the worst position" to "**the absolute-value ceiling is
`c H^{theta_total}` with `c > 0`, so the shortfall is a power `H^{0.212}` and the
whole budget available to any constant is `O(lnln H/ln H)`**". The break-even is
1.208983, or 1.212157 with the diagonal made free. Nothing here reaches it.

The one route this report opens rather than closes is (C1)'s observation that the
`x`-dependence is a single factor `e(-hx/m)` — the quantifier is separable, and
its price is `tau(m)`, not `C^{pi(z)}`. That is a materially cheaper statement of
the wall than the corpus carried, even though it is still a wall.

**Draft CHANGELOG entry, for a human to place** (this report edits nothing):
> `sift-limit-attack.md` §7b — the flagged open arithmetic (`4.126452` against
> Brüdern–Fouvry's `4.156000`) is CLOSED, not an error: `4.156000 = (1+e^{b/2a})/b`
> at their split `(a,b) = (1/2, 3/4)`, and `1/4.156000 = 0.2406159756` reproduces
> their published `0,2406` exactly. Their split is not optimal for their own side
> condition, which constrains only `D1 D2`; re-splitting gives `4.126452`. Also,
> §4.5's "`theta_total <= 1` is a real ceiling on any absolute-value method" is
> strengthened: the ceiling is `c H^{theta_total}`, verified by the colouring
> extremal computation in `research/attack-theta-margin.js` §F.
