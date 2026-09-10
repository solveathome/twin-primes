# The mixed lags, priced exactly: half the decoupling error is now unconditional, the other half is one logarithm short and the missing logarithm is named

<!-- ledger
id: Q-varE-limit
status: PARTIAL
todo: 9
question: Does lim Var/E on the diagonal window exist, and what is it?
verdict: OPEN with the obstruction named. Two of the three lag groups of the decoupling error are now closed unconditionally: |2*X2| <= 60 prod p(p-3)/(p-2)^2 = O(ln y), and delta*(X1 - X_dec) -> 0 at rate O((ln ln y)^{-1/4}) by monotone coupling plus Kolmogorov-Rogozin, which removes that half's dependence on varE-spectral's own limit theorem (both derived here, unreviewed, and the second is numerically vacuous at all six computed levels). The CRT-mixed lags stay OPEN: every lag's phase sum is exact and elementary (R_n(c) = [(r-c)^+ + (r+c-n)^+ - r^2/n]/L), so the frequency route closes by identity and no exponential-sum bound applies; the residual is a divisor-distribution statement about y-smooth divisors of C(C^2-4) exceeding 2L, and the flat/active split that the kernel offers is measured lossy with delta*|flat| rising 0.559 to 1.301 on six levels. lim Var/E = 0.45546 stays HEURISTIC on both steps.
-->

> **RIDER 2026-08-30 (orchestrator, from `verify-0830-record-defects.md` §1.3 item 2).** Where this note
> reads "loose by a factor 14 to 48 against the measured 2X2 = 5.3" (§0, §3,
> §5, §7), the measured group sum is 2X2 = 0.2694, 0.2314, 0.1846 at x = 13,
> 17, 19 (the 5.3 was a doubled half-pattern), so the looseness is a factor
> 511 to 1148; "flat near 5.3, so the truth is O(1)" reads "O(1) and falling,
> 0.27 → 0.18 over x = 13..19"; and "Xmix = −9.78 against ln y = 9.611" reads
> "Xmix = −3.94 at x = 19 against ln y = 8.042, coefficient −0.49 on three
> levels; x = 23 not recomputed". The PROVEN status of the bound is untouched.

*Staging note, 2026-08-28. Forward work on the first of the two open steps in
`varE-spectral.md`, as narrowed by `varE-theta2-step.md`: does the decoupling
error `delta*(X - X_dec)` vanish on the diagonal. The second step, the model's
own limit theorem, is a sibling's and is not touched here. Producer:
`research/history/staging/varE-theta2-proof.js`. Reads
`varE-theta2-step.md` for the six exact levels and the group split, and
`varE-spectral.md` sections 1-3 for the model. Recomputes none of the six
`Var/E` readings.*

## 0. Verdict, the open half first

**The mixed lags are still open, and this pass does not bound them.** No
inequality below covers `Xmix`. What it does is price the obstruction: the only
split the exact kernel offers, flat against active, has `delta*|flat|` rising
on every one of six levels (0.559, 0.912, 0.960, 1.087, 1.188, 1.301) against a
target of zero, so every absolute-value route through that split is already
lost at the levels that can be computed, and the derivation says it is lost by
one logarithm asymptotically.

**The frequency-side hope is closed by identity, not by failure.** Every lag's
phase sum, mixed or not, is exact and elementary: `R_n(c)` is a difference of
two interval-overlap counts, with no error term and no equidistribution
anywhere. Re-summing the surviving pieces returns the real-space sum term by
term. So the CRT-mixed lags carry no phase that "averages out over `t`", and
there is no exponential sum to estimate. Weil does not apply here and is not
needed; the residual difficulty is a counting statement about divisors, not an
oscillation statement.

**The two propositions proved here have had no adversarial pass.** They are
this pass's own derivations, elementary, machine-checked only where a number is
printed. The campaign ledger's standing rate is four of five same-day
integrations needing correction within twelve hours. Treat them accordingly,
and see the named weak steps in sections 3 and 4.

**Nothing here touches the conjecture.** `variance-note.md` section 4 already
records that `Var/E` over a uniformly random window says nothing about the one
anchored window the twin problem needs.

With that said, what the pass produced:

- **PROVEN, checked to 1.71e-13 on 4000 random triples.** The Fejer-weighted
  contribution of every lag is
  `R_n(c) = [(r-c)^+ + (r+c-n)^+ - r^2/n]/L` with `r = L mod n`; Fact A is its
  `c = 0` case; `|R_n(c)| <= min(1, n/L)`; and for `n > 2L`,
  `R_n(c) = (L - ||c||_n)^+/L - L/n` (section 1). The whole object rebuilds at
  `x = 7` from 192 (modulus, class) pairs to 4.612929 against the corpus
  4.612929 (PART B).
- **PROVEN, unconditional, no hypothesis.**
  `|2 X2| <= 60 prod_{7<=p<=y} p(p-3)/(p-2)^2 = O(ln y) = o(1/delta)`. The two
  pure `+-2` shift groups therefore leave the open list. The bound is loose by
  14 to 48 against the measured `2X2 = 5.3` at six levels (section 3, PART D).
- **PROVEN here, unreviewed, and numerically vacuous at every computed level.**
  `delta*(X1 - X_dec) -> 0` unconditionally, at rate `O((ln ln y)^{-1/4})`, by
  the monotone coupling of the two product measures, `A_tot = B_tot` exactly,
  and Kolmogorov-Rogozin anti-concentration for `ln n`. This removes the `c = 0`
  half's dependence on `varE-spectral` section 5's own unproven limit theorem.
  The rate factor is 0.815 at `x = 23`, so the proposition explains none of the
  six measured rows (section 4).
- **MEASURED, exact, six levels.** The flat/active split of `X`:
  flat -16.970 to -433.802, active +21.583 to +555.281, against `X` 4.61 to
  121.48, with `|flat|/X` between 3.21 and 3.68 and `delta*|flat|` rising
  throughout (section 2, PART C2).
- **MEASURED, exact, six levels.** The equidistribution-free flat half of the
  mixed group, `Phi`, runs 0.3765 to 6.3689 with local exponent 2.6 then 2.5 in
  `ln y`: consistent with `ln^3 y` approached slowly, not with `ln^2 y`
  (section 5, PART C).
- **NOT CHECKED.** Whether the divisor-distribution estimate of section 6 is
  available in the literature. No search has been run. Do not call this
  reduction new.

**Where that leaves 0.45546.** Still HEURISTIC, and still resting on both open
steps, but the first step is now smaller than it was. Of the three groups the
decoupling error splits into, two are closed unconditionally and one, the
CRT-mixed lags, is open with the obstruction named. The sibling's attack on the
second step, the model's own limit theorem, is what the *value* 0.45546 needs;
this note's remaining gap is what the *vanishing* of the replacement error
needs. Both are required, and neither is finished.

## 1. The exact lag kernel

`varE-theta2-step.md` section 2 leaves the object in the form: the exact
conductor-`n` term is `sum_{r,r' in E_n} T_n(r-r')`, a sum over `3^omega(n)`
lags of the Fejer autocorrelation `T_n(d)`, of which two are the clean
`d = +-2` shifts and the rest are CRT-mixed. The first thing this pass does is
evaluate `T_n(d)` in closed form. It is elementary and it is exact.

Write the shift sum in the form the lag expansion needs. For a modulus `n`, a
class `c` mod `n`, and the triangular window of half-length `L`,

    S_n(c) := sum_{|h| < L, h = c mod n} (1 - |h|/L),
    R_n(c) := S_n(c) - L/n.

`L*(1 - |h|/L)` counts the pairs `(u,v)` in `[0,L)^2` with `u - v = h`, so
`L*S_n(c)` counts the pairs with `u - v = c mod n`. Splitting `L = qn + r`,
`r = L mod n`, each class `a` mod `n` holds `q + [a < r]` of the `u`, and

    L*S_n(c) = sum_b (q + [b+c < r])(q + [b < r]) = n q^2 + 2qr + I_n(c,r),
    I_n(c,r) = #{b in [0,r) : (b+c) mod n in [0,r)} = (r-c)^+ + (r+c-n)^+,

for `c` taken in `[0,n)`, while `L^2/n = n q^2 + 2qr + r^2/n`. Subtracting,

    **R_n(c) = [ (r - c)^+ + (r + c - n)^+ - r^2/n ] / L,     r = L mod n.**

PART A tests this against brute force on 4000 random triples `(L, n, c)`: worst
absolute error 1.71e-13, machine noise. At `c = 0` it returns
`R_n(0) = r(n-r)/(nL)`, which is `varE-spectral`'s Fact A, so Fact A is the
`c = 0` case of a formula that covers every lag.

Two consequences used throughout:

- `|R_n(c)| <= min(1, n/L)`, since `I_n` and `r^2/n` both lie in `[0, r]` and
  `r <= min(n, L)`.
- For `n > 2L`, with `||c||_n` the least absolute representative,
  **`R_n(c) = (L - ||c||_n)^+/L - L/n`.**

PART B rebuilds the whole spectral object at `x = 7` from this formula alone:
192 (modulus, class) pairs, summed as `sum w(m,c) R_m(c)`, give 4.612929
against the direct real-space sum 4.612929 and the corpus 4.612929. So the lag
expansion, the CRT bookkeeping and the kernel are all correct as coded.

## 2. Which lags average out, and which do not

The task asks which lags carry phases `e(2t/n)` that average out over `t` and
which do not. The closed form answers it, and the answer is not the hoped-for
dichotomy.

Every lag's phase sum is **exact**. The sum over `t` (here `nu`) of
`e(-nu c/n) K_L(nu/n)` is not estimated at all: it is `n R_n(c)`, and
`R_n(c)` splits into two pieces with no error term,

    R_n(c)  =  -r^2/(nL)        the FLAT piece, identical for every class c
             + I_n(c,r)/L       the ACTIVE piece, nonzero only if ||c||_n < r.

So the correct statement is: **the oscillating part of every lag, mixed or not,
cancels completely and elementarily; what survives is not a phase but an
interval overlap.** For `n > 2L` the active piece is nonzero exactly when the
CRT-combined shift satisfies `||c||_n < L`. Since `n` is squarefree and `c` is
`0` or `+-2` at each `p | n`, that condition is

    n | C(C^2 - 4)   for the integer representative C with |C| < L.

which is the real-space sum again. Summing the active pieces over `(n, c)` and
re-indexing by `C` returns `sum_{|C|<L}(1-|C|/L) W(C)` term by term. The
frequency side is therefore not a new route: it is the same sum written twice,
and it offers no cancellation the real-space form does not already contain.
That closes the brief's step 1 as a source of progress, in the negative, and it
closes it by identity rather than by failure to find a bound.

What the split does buy is a decomposition of `X` into two explicit halves with
no equidistribution in either. PART C2 computes both at six levels:

| x | flat | active | X | \|flat\|/X | delta*\|flat\| |
|---|---|---|---|---|---|
| 7  | -16.970  | 21.583  | 4.61   | 3.679 | 0.559 |
| 11 | -53.647  | 68.722  | 15.08  | 3.559 | 0.912 |
| 13 | -94.737  | 124.295 | 29.56  | 3.205 | 0.960 |
| 17 | -170.932 | 222.337 | 51.40  | 3.325 | 1.087 |
| 19 | -278.018 | 359.307 | 81.29  | 3.420 | 1.188 |
| 23 | -433.802 | 555.281 | 121.48 | 3.571 | 1.301 |

`delta*X` tends to 0.45546 by hypothesis, while `delta*|flat|` runs 0.559,
0.912, 0.960, 1.087, 1.188, 1.301, rising on every level. So the two halves are
individually larger than the object and are growing faster than it. Any bound
that takes absolute values after this split is already lost, and that is
measured, not argued.

## 3. The pure shift lags, bounded unconditionally

The two groups `X2`, where every prime `p >= 7` takes `p | h-2` or every prime
takes `p | h+2`, come off the open list with a two-line argument.

In the lag expansion the group carries weight `G(n) = D_y prod_{p|n} 1/(p-4)`
at modulus `n` (times the `p <= 5` lag weights, which total 30 including the
factor 6 from `p = 2, 3`). Its total mass is a closed product:

    sum_n G(n) = D_y prod_{7<=p<=y} (p-3)/(p-4) = prod_{7<=p<=y} p(p-3)/(p-2)^2,

and `p(p-3)/(p-2)^2 = 1 + (p-4)/(p-2)^2 = 1 + 1/p + O(1/p^2)`, so the product is
`asymptotic to c ln y`. With `|R_m(c)| <= 1` from section 1,

    **|2 X2| <= 60 prod_{7<=p<=y} p(p-3)/(p-2)^2 = O(ln y) = o(1/delta).**

PROVEN, no hypothesis. PART D prints the bound and the measured value:

| x | bound on \|2X2\| | \|2X2\| measured | ratio | B_2/ln y |
|---|---|---|---|---|
| 7  | 78.44  | 5.715 | 13.7 | 0.5097 |
| 11 | 106.82 | 5.628 | 19.0 | 0.4624 |
| 13 | 137.73 | 5.333 | 25.8 | 0.4454 |
| 17 | 173.68 | 5.352 | 32.5 | 0.4410 |
| 19 | 211.82 | 5.327 | 39.8 | 0.4390 |
| 23 | 252.81 | 5.314 | 47.6 | 0.4384 |

The bound is not violated at any level and is loose by a factor 14 to 48, which
grows: the measured `2X2` is flat near 5.3, so the truth is `O(1)` and the
bound gives `O(ln y)`. `O(ln y)` is what the verdict needs, so the looseness
costs nothing. The measured column is `2*delta*X2` from
`varE-theta2-step.md` section 5 divided by this run's `delta`, not a
recomputation of `X2`.

## 4. The c = 0 half, bounded unconditionally

`varE-theta2-step.md` section 3 leaves `X1 - X_dec` resting on a HEURISTIC: the
two carry `pi_p = 2/(p-2)` and `pi_p = 2/(p-1)`, their `E[ln n]` differ by
`O(1)` against `ln L`, so they were said to share a `GD(2)` limit and therefore
to inherit `varE-spectral` section 5's own unproven limit theorem. That
dependence can be removed. The argument below is elementary and does not need
either measure to converge to anything.

**Setup.** Both halves are the same functional against two product measures.
With `K = L/6` the half-length in `k = h/6` coordinates, put
`F_m(c) := R_m(c)` from section 1. Then

    X1     = A_tot * sum_{c5} w5(c5) E_A[ F_{5n}(c(n,c5)) ],
    X_dec  = B_tot * ( 3.75 E_B[ F_n(0) ] + 11.25 E_B[ F_{5n}(0) ] ),

where `n` is squarefree with prime factors in `[7,y]`, drawn with each `p`
present independently, `pi_p = 2/(p-2)` under `E_A` and `pi'_p = 2/(p-1)` under
`E_B`, and `w5` is `15` at the `5 | k` lag and `7.5` at each of the two
`k = +-1 mod 5` lags. `A_tot = D_y prod (p-2)/(p-4) = prod p/(p-2)` and
`B_tot = C_y prod (p-1)/(p-3)`, and

    **A_tot = B_tot exactly**,

which is the sibling's PART 1 identity restated; PART F checks it to 5.6e-15 at
six levels. `A_tot` is measured at `0.24066 ln^2 y` and settling (PART E).

**Step 1, the shape of F.** As a function of `z = ln n`, `F_m(0)` splits as
`F_mono + F_osc`, where `F_mono = (1 - K/m) 1[m > K]` is monotone with total
variation 1, and `F_osc = F 1[m <= K]` satisfies `0 <= F_osc <= m/(4K)`. The
`k = +-1 mod 5` lags give `||c||_{5n} = jn`, `j in {1,2,3,4}`, and by section 1
their `F` is a sum of three monotone pieces of total variation at most 3, plus
the same `m <= K` remainder.

**Step 2, the oscillating remainder is a concentration function.** For either
measure,

    E[F_osc] <= (1/4) E[ e^{-(ln K - ln m)} 1[m <= K] ]
             <= (1/4) sum_{j>=0} e^{-j} Pr[ ln K - ln m in [j, j+1) ]
             <= 0.40 * Q(1),

with `Q(T) := sup_t Pr[ln n in [t, t+T]]` the Levy concentration function of
`ln n = sum_p xi_p ln p`. The same bound covers `E[K/(5n); n > K]`, which is
what the `+-1` lags leave above `K`.

**Step 3, anti-concentration.** Kolmogorov-Rogozin with all `lambda_p = T`,
keeping only the primes with `ln p > T` (for those, `1 - Q(xi_p ln p; T) = pi_p`),
gives

    Q(T) <= C ( sum_{e^T < p <= y} pi_p )^{-1/2},   sum_{e^T<p<=y} 2/(p-1) = 2 ln(ln y / T) + O(1),

so `Q(T) = O( (ln(ln y/T))^{-1/2} )`. This is the only place the length of the
prime range enters, and it enters through `ln ln y`, not `ln y`.

**Step 4, the coupling.** `pi_p >= pi'_p` with
`pi_p - pi'_p = 2/((p-1)(p-2))`, so the two measures admit the monotone
coupling `n' | n`, and `Delta := ln n - ln n' >= 0` has
`E[Delta] = mu = sum_p 2 ln p/((p-1)(p-2))`, a convergent sum, measured
`mu = 0.3518` at `y = 14929` and still rising in the fourth decimal (PART F).
Hence the Kolmogorov distance obeys
`d_K(ln n, ln n') <= Pr[Delta > T] + Q(T) <= mu/T + Q(T)`, and for a function of
bounded variation vanishing at `-infinity`,
`|E_A[G] - E_B[G]| <= TV(G) * d_K`.

**Step 5, assembling.** Applying steps 2-4 to each of the five terms above, and
using that `E_B[F_{5n}(0)]` and `E_B[F_n(0)]` differ only by the deterministic
shift `ln 5` in `ln n` (Kolmogorov distance `<= Q(ln 5)`), the `15`-weighted
`5 | k` lag of `X1` pairs against `3.75 + 11.25 = 15` of `X_dec`, the two
`+-1` lags contribute `O(Q(2) + Q(1))`, and

    **|X1 - X_dec| <= A_tot * O( mu/T + Q(T) ) = O( ln^2 y * (ln ln y)^{-1/4} )**

on taking `T = (ln ln y)^{1/4}`. Since `1/delta` is `asymptotic to ln^2 y / 0.2775`,
this is `o(1/delta)`: **`delta*(X1 - X_dec) -> 0`, unconditionally, at rate
`O((ln ln y)^{-1/4})`.**

**Three caveats, ahead of the claim.** First, the rate is vacuous at every
computed level: `(ln ln y)^{-1/4}` is 1.015 at `x = 7` and 0.815 at `x = 23`
(PART F), so this proposition explains none of the six measured rows and cannot
be checked against them except for consistency of order. The measured
`delta*(X1 - X_dec) * ln y = 0.1334` is `O(1/ln y)`, far stronger than what is
proved. Second, the derivation is this pass's own and has had **no adversarial
pass**; the campaign ledger records four of five same-day integrations needing
correction within twelve hours. The step most likely to break is step 5's
bookkeeping of the `p = 5` lag weights, where `X1` carries three lags of total
weight 30 and `X_dec` carries two of total weight 15, and only the
large-modulus limits of the weights agree (15 against 15); the pairing is
argued, not machine-checked. Third, `A_tot = B_tot` is exact and is doing real
work: without it the two halves would differ at order `ln^2 y` and nothing
below would matter.

What this buys: the `c = 0` half no longer inherits `varE-spectral` section 5.
The sibling's limit theorem is still needed for the *value* 0.45546, but not
for the *vanishing* of this half of the decoupling error.

## 5. The mixed lags: the size of the obstruction, measured

What is left is `Xmix`, the `3^omega(n) - 3` CRT-mixed lags. Sections 3 and 4
have removed everything else, so `delta*(X - X_dec) -> 0` now holds if and only
if `Xmix = o(1/delta) = o(3.6 ln^2 y)`.

**How big is it.** From the sibling's embedded columns, `delta*Xmix` runs
-0.241840 at `x = 7` to -0.029342 at `x = 23`, so at `x = 23`,
`Xmix = -9.78` against `ln y = 9.611`: the truth is of order `ln y`, one
logarithm below the target. Nothing in this section disputes that; the question
is only whether it can be derived.

**The three bounds available, and what each gives.**

1. *Absolute values on the lag expansion.* `|R| <= 1` and the total mixed mass
   `sum_n W_tot(n) = prod p^2/(p-2)^2` measured at `0.0579 ln^4 y` (PART E)
   give `O(ln^4 y)`. Three logarithms short.
2. *Absolute values with the kernel bound `|R| <= min(1, n/L)`.* This is the
   step that recovers the first logarithm and is the same phenomenon as
   `varE-spectral` section 2's "mean gives `2^omega`, maximum gives `4^omega`".
   It is not computable at the top levels here, but at `x = 7` PART B prints
   `sum |w R| = 13.99` against `|X| = 4.61`, a loss factor 3.03 at one level.
3. *The flat/active split of section 2.* Measured at all six levels, and it is
   the decisive negative: `delta*|flat|` runs 0.559, 0.912, 0.960, 1.087,
   1.188, 1.301, **rising on every level**, against a target of `-> 0`. The
   active half is its near-mirror. So the one split the exact kernel hands over
   for free is already lossy, at every computed level, by a factor that is not
   settling.

**The flat half of the mixed group alone.** PART C isolates the piece with no
equidistribution in it whatsoever:

    Phi := K * sum_{n > 2K} (W_tot - A)(n)/n,
    W_tot(n) = D_y prod 4/(p-4),  A(n) = D_y prod 2/(p-4),

computed exactly by enumerating every squarefree `y`-smooth `n <= 2K` with
prime factors `>= 7` (5.3 million of them at `x = 23`) against the closed forms
`sum_n W_tot(n)/n = 1` and `sum_n A(n)/n = prod(1 - 2/(p-2)^2)`, both checked to
1e-12:

| x | ln y | Phi | Phi/ln^2 y | Phi/ln^3 y | delta*Phi |
|---|---|---|---|---|---|
| 7  | 2.565 | 0.3765 | 0.0572 | 0.0223 | 0.0124 |
| 11 | 3.850 | 0.5678 | 0.0383 | 0.0099 | 0.0097 |
| 13 | 5.153 | 1.2697 | 0.0478 | 0.0093 | 0.0129 |
| 17 | 6.564 | 2.3840 | 0.0553 | 0.0084 | 0.0152 |
| 19 | 8.042 | 4.0592 | 0.0628 | 0.0078 | 0.0173 |
| 23 | 9.611 | 6.3689 | 0.0689 | 0.0072 | 0.0191 |

`delta*Phi` rises on four of the five steps, falling only from `x = 7` to `x = 11`. The local exponent of `Phi` in `ln y`
over the top three levels is 2.62 then 2.53, so the data are consistent with
`ln^3 y` approached slowly and are not consistent with `ln^2 y`. The
corresponding derivation is standard but is **not verified here**: with
`n^2 W_tot(n)/n = prod_{p|n} 4p/(p-4)`, a `4^omega`-type weight, partial
summation off `sum_{n <= T} 4^{omega(n)} = c T ln^3 T (1+o(1))` gives
`Phi = O(ln^3 K)`, and the missing check is that restricting `n` to
`y`-smooth, squarefree, `(n,30) = 1` costs only a bounded factor.

**So the obstruction, stated exactly.** The mixed-lag sum is a difference of
two explicit halves each of size at least `ln^2 y` and plausibly `ln^3 y`, whose
difference is `ln y`. Nothing in the lag expansion, the kernel, or the
`p <= 5` bookkeeping produces that cancellation; it is a statement about how the
CRT-combined shifts `c` mod `n` distribute relative to the window, i.e. about
how the large `y`-smooth divisors of `C(C^2 - 4)` distribute as `C` runs over
`|C| < L`. **OPEN.**

## 6. The named estimate that would close it, and why Weil does not apply

The task asks, if a cancellation over `t` is needed that cannot be proved here,
for the exact exponential sum (modulus, length, phase) and the known bound that
would suffice.

**There is no such exponential sum.** That is the finding, and it is negative
in a useful direction. The complete sum is

    sum_{nu != 0 mod n} e(-nu c/n) K_L(nu/n),   K_L the Fejer kernel,

a **linear** phase against a kernel that is itself the square of a geometric
sum. Section 1 evaluates it in closed form with no error term. So:

- **Weil does not apply and is not needed.** No nontrivial algebraic character
  sum appears anywhere. The phase is additive and linear in `nu`; the local
  factor `2 + 2 cos(4 pi nu_p/p)` is `|1 + e(2 nu_p/p)|^2`, a squared linear
  phase, not a curve. There is nothing for a square-root cancellation bound to
  bite on. Quoting Weil here would be a category error.
- **Ramanujan-sum orthogonality is already used, and used exactly.** It is what
  produces the flat piece `-r^2/(nL)`, identical across classes. It is the
  content of the closed form, not an estimate on top of it.
- **The large sieve is the right shape but the wrong variable.** The residual
  after orthogonality is the active piece, and it is a counting statement, not
  an oscillation statement.

**The estimate that would suffice.** Re-indexing the active pieces by the
integer representative `C` (section 2), what is needed is: for
`w(n,C) = D_y prod_{p|n} (2 or 1)/(p-4)` according as `p | C` or `p | C -+ 2`,

    sum_{0<|C|<L} (1 - |C|/L) sum_{n | C(C^2-4), n > 2L, P^+(n) <= y} w(n,C)
      =  L sum_{n > 2L} sum_{c != 0} w(n,c)/n  +  O(ln y * (something o(ln y))),

that is: **the weighted count of large `y`-smooth divisors of `C(C^2-4)` agrees
with its expected count to one logarithm better than trivially, on average over
a window of length `L = y^2`.** The owning conventions for that are the
distribution of divisors of a polynomial value in a dyadic range (Ford's
`H(x,y,z)`, Hooley's `Delta`-function, Erdos's multiplication-table problem),
applied to the reducible cubic `C(C-2)(C+2)` with a smoothness constraint at
`u in (2, 6]`, since `n in (2L, L^3)` and `ln y = (1/2) ln L` (range corrected 2026-08-29, redteam-0829-measure-c.md E23; the earlier text named only the lower endpoint). `research/SEARCH-CONVENTIONS.md` applies: the words to search are
"divisors of `n(n+2)` in intervals", "Hooley Delta function polynomial values",
"Ford divisors in intervals", and Montgomery-Soundararajan / Gorodetsky for the
singular-series side that `varE-theta2-step.md` section 7 already flags. **That
search has NOT been run here**, and until it is, no claim that this reduction is
new is available.

Whether such a statement is available in the literature at the precision needed
(one logarithm below the trivial bound, with the `y`-smoothness constraint and
the `4^omega`-sized weights) is not known to this pass, and the honest prior is
against it: the same one-logarithm gap in divisor problems of this shape is
usually the whole difficulty.

## 7. Checked against the six measured ratios

A bound the data violate is wrong, so every bound stated above is put against
the six exact levels of `varE-theta2-step.md` section 4.

| claim | at x = 23 | measured | violated |
|---|---|---|---|
| `\|2 X2\| <= 60 prod p(p-3)/(p-2)^2` | 252.81 | 5.314 | no, loose by 47.6 |
| `\|X1 - X_dec\| = O(ln^2 y (ln ln y)^{-1/4})` | 18.1 times an unnamed constant | 4.63 | no, and vacuous: the rate factor is 0.815 |
| `X = flat + active`, exact | -433.802 + 555.281 | 121.479 | no, identity |
| `X` from the lag expansion at `x = 7` | 4.612929 | 4.612929 | no |
| `Phi` grows faster than `ln^2 y` | `Phi/ln^2 y` = 0.0689 | rising on 4 of 5 steps | no |
| `delta*(X - X_dec) -> 0` | not proved | 0.000477 | open |

Two checks that the run also passes and that would have caught a wrong
framework: `sum_n W_tot(n)/n = 1` and `sum_n A(n)/n = prod(1-2/(p-2)^2)` hold to
1e-12 at all six levels, and `A_tot = B_tot` to 5.6e-15. The first two are what
makes the main term cancel against the `-L` in `X = sum (1-|h|/L)(W(h)-1)`; if
either failed, every number in this note would be wrong by an amount of order
`L`.

The one number this note does **not** support: the coefficient. Nothing here
improves on the sibling's reading that the net `delta*(X - X_dec) * ln y` is a
difference of two terms thirty times larger, so 0.0046 remains a number not to
quote as a constant.

## 8. What would falsify this, and whether that check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| `R_n(c) = [(r-c)^+ + (r+c-n)^+ - r^2/n]/L` | PROVEN | one `(L,n,c)` where it disagrees with the shift sum | YES, 4000 seeded random triples, worst error 1.71e-13 (PART A) |
| the lag expansion with that kernel reproduces `X` | PROVEN | a level where the rebuilt sum misses the corpus `X` | YES at `x = 7` only, to 1e-9 against the direct sum and 2e-4 against the corpus. NO at `x >= 11`: the modulus exceeds 2^53 and exact CRT would need BigInt |
| every lag's phase sum is exact, so no exponential-sum estimate is needed | PROVEN | an oscillating factor surviving the closed form | YES, by construction; the closed form has no error term |
| `\|2 X2\| = O(ln y)`, unconditional | PROVEN | a level where the measured `\|2X2\|` exceeds `60 prod p(p-3)/(p-2)^2` | YES, six levels, loose by 14 to 48 (PART D) |
| `delta*(X1 - X_dec) -> 0`, unconditional | PROVEN here, UNREVIEWED | an error in step 5's `p = 5` weight pairing, or a misapplication of Kolmogorov-Rogozin | NO. Derived this pass, no second reader, no machine check of the pairing. The rate is vacuous at all six levels so the data cannot test it |
| `A_tot = B_tot` exactly | PROVEN | a prime where `(p-1)(p-4) + 2 != (p-2)(p-3)` | YES, six levels to 5.6e-15 (PART F); it is the sibling's PART 1 identity |
| the flat/active split is lossy: `delta*\|flat\|` does not vanish | MEASURED, 6 exact levels | a level where `delta*\|flat\|` turns and falls | PARTLY. Rising on five of five steps, 0.559 to 1.301; `x = 29` not computed |
| `Phi = O(ln^3 K)` and not `O(ln^2 y)` | HEURISTIC | the `y`-smooth, squarefree, `(n,30)=1` restriction costing more than a bounded factor in `sum_{n<=T} 4^{omega(n)}` | NO for the derivation. The six measured levels give local exponent 2.6, 2.5, consistent but not decisive |
| `Xmix = o(1/delta)`, hence `delta*(X - X_dec) -> 0` | OPEN | nothing proved either way; measured `delta*Xmix` = -0.0293 at `x = 23` and falling | NO. This is the whole remaining gap in step 1 |
| the divisor estimate of section 6 is not already in print | NOT CLAIMED | Ford, Hooley, Montgomery-Soundararajan or Gorodetsky supplying it | NO. Not searched. Do not call this reduction new before that search |
| `lim Var/E = 0.45546` | HEURISTIC | either open step failing | NO. Step 1 is reduced but open here; step 2 is the sibling's |

The one line worth carrying out of this pass: the open step is no longer about
Fourier coefficients and is no longer about equidistribution of phases, because
every phase sum here is exact. It is a divisor-counting statement, and the two
halves it must balance are each at least a logarithm larger than the answer.
