# The decoupled model's own limit theorem, proven: the limit is Pr[GD(2) > u] with no correction term, and the n <= L band is O(1/ln y)

<!-- ledger
id: Q-varE-limit
status: PARTIAL
todo: 9
question: Does lim Var/E on the diagonal window exist, and what is it?
verdict: Step 2 of the two is CLOSED: the decoupled model's limit is exactly Pr[GD(2) > u] with NO correction term (ln n/ln y -> GD(2) proven with rate O(lnln y/ln y); n | L inert exactly; both transition bands O(1/ln y) by an elementary block bound), so lambda_2(2) = 0.45545648 is unchanged and lim Var/E now rests on ONE open step, the theta = 2 decoupling replacement; the n < L band varE-spectral sec.4 left unevaluated is measured exactly at nine levels with B*ln y = 0.063616 .. 0.063008 over x = 13..37, and the model's own approach to its limit is 0.886/ln y.
-->

*Staging note, 2026-08-28. TODO item 9. Attacks the SECOND of the two open
steps named in `redteam-0828-varE.md` §0: the limit theorem for the decoupled
model of `varE-spectral.md` §§3-5, whose `n <= L` band that note's §4 states as
`O(1/ln W)` and does not evaluate. The first step, the theta = 2 decoupling
replacement, is untouched here and stays open;
`research/varE-exact-ladder-01.js` is the sibling that prices it, and its band
numbers are an independent witness to §6 below. Producer:
`research/history/staging/varE-limit-theorem.js` (embedded, `code-sha256` and
`out-sha256` verified statically; 4929.5 s, of which 4792 s is the `x = 37`
level). Nothing from `paper/variance-note.md` is recomputed; the nine diagonal
levels and the exact `delta*X_dec` column are read from `variance-note.md` §7
and `varE-theta2-step.md` §4.*

## 0. Verdict, disconfirming half first

**This does not close the question, and the constant stays HEURISTIC.**
`varE-spectral.md` §2's decoupling replacement, the first of that note's two
open steps, is untouched here and stays open; the whole chain from the exact
comb variance to any constant rests on it. What this pass removes is the
second step. The count goes from two open steps to one.

**Nothing here touches the conjecture.** `variance-note.md` §4 already records
that Var/E is a statement about a uniformly random window and says nothing
about the one anchored window the twin problem needs. This note asks only
whether a stated limit is the limit of a stated model.

**The rate is not proven, only the limit.** Theorem C bounds the two
transition bands at `O(1/ln y)`, elementarily and uniformly. It does **not**
bound the model's distance from `GD(2)`'s tail; that needs an Esseen-type
conversion of Theorem A's transform rate, and it is NOT DONE. So
`varE-spectral.md` §4's "the drift family is a series in `1/ln W`" is still
not derived. It is now measured for the model: `(lambda_2(2) - E[g]) ln y`
reads 0.817373, 0.847013, 0.872474, 0.880131, 0.884491, 0.885452, 0.886133 at
`x = 13..37`, settling on 0.886, which is a measurement and not a derivation.

**And a fresh derivation is a fresh derivation.** Everything below is written
out and checkable, and none of it has had an adversarial pass. The four notes
this one builds on were all corrected by one
(`redteam-0828-varE.md`, `applied-0828-varE.md`, forty-two edits), so PROVEN
here means "the argument is on the page and can be checked", not "the argument
has been checked by someone else". This note is HELD like the rest.

With that said, what the pass produced:

- **PROVEN. The decoupled model's limit is exactly `Pr[GD(2) > u]`, and there
  is no correction term.** `ln n/ln y -> GD(2)` with an explicit
  Laplace-transform rate `O_s(lnln y/ln y)` (Theorem A, §2), the conductors
  dividing `L` contribute exactly zero (§3), and the transition region
  `n asymp L`, where `g` is neither 0 nor 1, is killed by the boundedness of
  `GD(2)`'s density alone (Theorem B, §4). So `varE-spectral.md` §5's closed
  form omits nothing: `lambda_2(2) = 1 - e^{-2gamma}(9/2 - 4 ln 2) =
  0.45545648` is the model's limit as written.
- **PROVEN, elementary. The `n <= L` band `varE-spectral.md` §4 declined to
  evaluate is `O(1/ln y)`.** The proof is a block bound for a
  dimension-2 multiplicative function (Lemma C1), which gives a local bound
  `Pr[ln n in (T-1,T]] = O((1+T)/ln^2 y)` uniform in `y` (Lemma C2), which
  bounds both transition bands (Theorem C, §5). No local limit theorem and no
  equidistribution is used.
- **MEASURED, exact, nine levels, no Monte Carlo.** The band the red team
  flagged is `B*ln y = 0.063616, 0.064678, 0.064691, 0.063820, 0.063440,
  0.063175, 0.063008` at `x = 13..37`, bounded and settling on 0.0630, against
  the local-density prediction `f_2(2) I = 0.062729`. The producer also
  supplies three exact model values where the corpus had Monte Carlo,
  `0.3771445`, `0.387405` and `0.39566` at `x = 29, 31, 37`, each now with two
  or three independent witnesses (§6a).
- **CORRECTIONS to `varE-spectral.md`.** Its two-open-step count becomes one,
  in five places and in its ledger verdict; its §4 `n <= L` row can carry a
  proof and a coefficient instead of an assertion; and its §6a model value at
  `x = 37`, `0.39643`, is `0.0008` high against the exact `0.39565`, which is
  larger than the residual that column is used to discuss. Full list in §10.

## 1. The model, stated exactly

Notation follows `varE-spectral.md` §3. Fix a sieve level `y` and a window
length `L`. For a prime `p <= y` let `alpha_p` be the number of comb classes
surviving at `p`:

    alpha_2 = alpha_3 = 1,   alpha_5 = 2,   alpha_p = p - 2 for 7 <= p <= y,

so that the comb density is `delta = prod_{p <= y} alpha_p/p`.

**The probability space.** `Omega = {0,1}^{P(y)}`, `P(y)` the primes up to `y`,
with the product measure `Pi` under which the coordinate at `p` is 1 with
probability

    pi_p = (p - alpha_p)/(p - 1),

independently: `pi_2 = pi_3 = 1`, `pi_5 = 3/4`, `pi_p = 2/(p-1)` for `p >= 7`.
The **random conductor** is `n = prod_{p : coordinate 1} p`, a squarefree
`y`-smooth integer, always divisible by 6.

**The functional.** `g(n) = {L/n} (1 - {L/n}) n/L`, and the model's value is
`E_Pi[g(n)]`. `varE-spectral.md` §3 proves, given its decoupling step, that
this equals `delta * X_dec`, the decoupled spectral sum after normalisation.

**The diagonal.** `L = W = x#` and `y` is the largest prime `<= sqrt(L)`, so
the window exponent is `u_y = ln L / ln y`. Bertrand alone gives
`y > sqrt(L)/2`, hence `ln y >= (ln L)/2 - ln 2` and `u_y -> 2`; no prime-gap
input is needed for that. At the computed levels `u_y` reads 2.0847, 2.0116,
then 2.000x from `x = 13` up (`redteam-0828-varE.md` §2), which this note's
producer reproduces.

**Two exact identities, both one line.** First, the size-bias dual of
`varE-spectral.md` §3's `E_Theta[n] = 1/delta`:

    E_Pi[1/n] = prod_{p <= y} (1 - pi_p + pi_p/p)
              = prod_{p <= y} (1 - pi_p (p-1)/p)
              = prod_{p <= y} (1 - (p - alpha_p)/p)
              = prod_{p <= y} alpha_p/p  =  delta.

PROVEN, and checked to `2.4e-15` at every level (PART 0). It is what makes the
band decomposition below computable without enumerating `n > L`. Second,
`Pr[n | L] = C_y prod_{5 <= p <= x} (1 + rho_p)` with `rho_p = pi_p/(1-pi_p)`
and `C_y = prod_{5 <= p <= y} (1 - pi_p)`, since on the diagonal `L = x#` is
the primorial and `n | L` says exactly that every prime factor of `n` is
`<= x`. Checked against the enumerated `r_n = 0` nodes at every level, to the
printed digit (PART 1).

## 2. Theorem A: the limit law of ln n / ln y

Write `D_y = ln n / ln y = sum_{p <= y} 1_p (ln p / ln y)`.

**Theorem A.** For every fixed `s > 0`,

    ln E[e^{-s D_y}] = 2 int_0^1 (e^{-sw} - 1)/w dw  +  O_s( lnln y / ln y ),

equivalently `E[e^{-sD_y}] = exp(2 int_0^1 (e^{-sw}-1)/w dw)(1 + O_s(lnln y/ln y))`,
and consequently `D_y -> GD(2)` in distribution, `GD(2)` the generalized
Dickman law of index 2.

*Proof.* Put `w_p = ln p / ln y in (0,1]` and `phi_p = e^{-s w_p} - 1`, so
`E[e^{-sD_y}] = prod_{p<=y} (1 + pi_p phi_p)`, every factor positive.

(i) *Linearisation.* `|pi_p phi_p| <= 1/3` for `p >= 7` because `pi_p <= 1/3`
there and `|phi_p| <= 1`; and for `p in {2,3,5}`, `|pi_p phi_p| <= s ln 5/ln y
<= 1/2` once `ln y >= 2 s ln 5`. So all factors admit
`ln(1+z) = z + O(z^2)`, and

    sum_p (pi_p phi_p)^2 <= 3 (s ln 5/ln y)^2
                            + (s^2/ln^2 y) sum_{p >= 7} 4 ln^2 p/(p-1)^2
                          = O_s(1/ln^2 y),

the tail sum converging. Hence `ln E[e^{-sD_y}] = sum_p pi_p phi_p + O_s(1/ln^2 y)`.

(ii) *The exact `pi_p` against the rate 2/p.* Write `pi_p = 2/p + eps_p`. For
`p >= 7`, `eps_p = 2/(p(p-1))`; for `p in {2,3,5}`, `|eps_p| <= 1`. Since
`|phi_p| <= min(1, s w_p) <= s ln p/ln y`,

    | sum_p eps_p phi_p | <= (s/ln y) sum_p |eps_p| ln p = O_s(1/ln y),

because `sum_{p>=7} 2 ln p/(p(p-1))` converges. **This is where the exact
`pi_p` is spent, and it is spent as a convergent sum**: the deviation of the
model's inclusion rate from `2/p` is summable against `ln p`, so it moves the
transform by `O(1/ln y)` and cannot move the limit. It is the only place the
value 2 in `theta = 2` enters.

(iii) *Mertens.* Fix `t_0 = 3`. The primes below `t_0` contribute
`O(s ln t_0/ln y) = O_s(1/ln y)` to `sum_{p<=y} 2 phi_p/p`, again by
`|phi_p| <= s ln p/ln y`. Above `t_0`, write
`A(t) = sum_{p<=t} 1/p = lnln t + M + r(t)` with `|r(t)| <= c/ln t`
unconditionally for `t >= t_0` (Mertens 1874), and `phi(w) = e^{-sw} - 1`:

    sum_{t_0 < p <= y} phi(ln p/ln y)/p = int_{t_0}^y phi(ln t/ln y) dt/(t ln t)
                                        + int_{t_0}^y phi(ln t/ln y) dr(t).

The substitution `w = ln t/ln y` turns `dt/(t ln t)` into `dw/w`, giving
`int_{w_0}^1 phi(w) dw/w` with `w_0 = ln t_0/ln y`; since `|phi(w)| <= sw` near
0, extending the integral down to 0 costs `O(s/ln y)`. Integration by parts on
the second integral, with `d phi(ln t/ln y) = -s e^{-s ln t/ln y} dt/(t ln y)`,
gives boundary terms `O(1/ln y)` and

    (s/ln y) int_{t_0}^y (c/ln t) dt/t = O(s lnln y/ln y).

Collecting, `sum_p pi_p phi_p = 2 int_0^1 (e^{-sw}-1)/w dw + O_s(lnln y/ln y)`,
which is the display.

(iv) *Identification and convergence.* `exp(theta int_0^1 (e^{-lambda x}-1)/x dx)`
is the Laplace transform of `GD(theta)`, whose density is
`p_theta = e^{-theta gamma} rho_theta/Gamma(theta)` with
`rho_theta(x) = x^{theta-1}` on `(0,1]` and
`x rho_theta' + (1-theta) rho_theta + theta rho_theta(x-1) = 0` beyond, and
whose mean is `theta` (Pinsky, arXiv:1611.07207v3, pp. 2-3, read at the page
this session; §8 below). Convergence of Laplace transforms of non-negative
random variables on `s > 0` gives convergence in distribution. `[]`

Two remarks worth keeping.

- **The rate is measured, not only asserted.** PART 4 evaluates the model's
  transform exactly against `GD(2)`'s at `s = 0.5, 1, 2, 4` on all nine levels;
  the error times `ln y/lnln y` is bounded and settles, which is the predicted
  shape.
- **`GD(2)`'s density is bounded and its law is continuous**, which is what
  §4 uses: `p_2(t) = e^{-2gamma} t` on `(0,1]`, and `p_theta(x) <=
  C_theta/Gamma(x+1)` for `x >= 1` (Pinsky p. 2), so `sup p_2 < infinity` and
  the distribution function is continuous everywhere.

## 3. The three bands

`g(n) = {L/n}(1 - {L/n}) n/L`, and `{L/n} = r_n/n` with `r_n = L mod n`. Read
the three bands straight off.

**(a) `n | L`: exactly zero.** `n | L` gives `r_n = 0`, so `g(n) = 0` and the
whole conductor contributes nothing. This is the model-side face of
`varE-asymptotic.md` Fact A, `sum_{nu != 0 mod q} K_L(nu/q) = r_q(q - r_q)/L`,
whose right side vanishes precisely when `q | L`; and the converse holds too,
`g(n) = 0` **iff** `n | L`, since `{L/n}(1-{L/n}) = 0` forces `{L/n} = 0`. On
the diagonal `L = x#` this is exactly the inert set of `varE-asymptotic.md`
Fact B. Its probability is not merely inert but vanishing:
`Pr[n | L] = prod_{x < p <= y}(1 - pi_p) asymp (ln x/ln y)^2`, and
`x ~ ln W` on the diagonal, so `Pr[n|L] asymp (lnln W/ln W)^2 -> 0`. Measured:
0.666666667 at `x = 7` falling to 0.063810103 at `x = 37` (PART 1).

**(b) `n < L`, `n` not dividing `L`.** Here `L/n > 1` and
`0 < g(n) <= n/(4L)`, since `t(1-t) <= 1/4`.

**(c) `n > L`.** Here `0 < L/n < 1`, so `{L/n} = L/n` and

    g(n) = (L/n)(1 - L/n)(n/L) = 1 - L/n,   exactly.

So, with `P_> = Pr[n > L]`, `R = E[(L/n) 1_{n>L}]` and `B = E[g(n) 1_{n<L}]`,

    E[g] = P_>  -  R  +  B,     all four quantities exact.

The producer computes all four at nine levels; `P_>` and `R` come from the
`n <= L` enumeration and the closed form `E[1/n] = delta` of §1, so nothing
above `L` is ever enumerated. **The decomposition is what makes the `n <= L`
band evaluable at all**, and it is the piece `varE-spectral.md` §4 did not
write down: that note bounded the band by `n^2/4L` summed against
`2^omega(n)`, got `O(ln W)` before the `delta`, and stopped.

## 4. Theorem B: the limit, and there is no correction term

**Theorem B.** Let `y -> infinity` with `u_y = ln L/ln y -> u > 0`. Then

    E[g] -> Pr[GD(2) > u] = lambda_2(u).

In particular the transition region `n asymp L`, where `g` is neither 0 nor 1,
contributes nothing in the limit, and `lambda_2(u)` is the whole answer.

*Proof.* Since `n > L` iff `D_y > u_y`, and `GD(2)` has a continuous
distribution function (§2), Theorem A plus Polya's theorem give
`P_> = Pr[D_y > u_y] -> lambda_2(u)`.

For the two remainders, both are dominated by
`M := E[min(n/L, L/n)] = E[exp(-ln y |D_y - u_y|)]`, because
`R <= M` and `0 <= B <= M/4`. Fix `eps > 0` and split. On
`|D_y - u_y| > eps` the integrand is at most `e^{-eps ln y} = y^{-eps} -> 0`.
On `|D_y - u_y| <= eps` the integrand is at most 1, and

    limsup_y Pr[|D_y - u_y| <= eps] = Pr[|GD(2) - u| <= eps] <= 2 eps sup p_2,

again by Theorem A and the continuity of the limit law. So
`limsup M <= 2 eps sup p_2` for every `eps > 0`, hence `M -> 0`, hence
`R -> 0` and `B -> 0`. `[]`

Four things this settles, in the order they matter.

1. **`Pr[GD(2) > u]` already includes the transition.** The question the brief
   asks is whether the note's closed form omits a correction from `n asymp L`.
   It does not. The transition band is a two-sided window of width `O(1/ln y)`
   in `D_y`, and it is killed by the boundedness of `GD(2)`'s density alone.
   No term is added to `lambda_2(u)` and none is subtracted.
2. **The limit needs no local limit theorem.** Weak convergence and a bounded
   limiting density suffice. That matters, because the *rate* does need
   something local (§5) and the rate is not what the constant depends on.
3. **Nothing in the proof uses `theta = 2`.** Step (ii) of Theorem A is the
   only place the value enters, and it enters as "`pi_p - theta/p` is summable
   against `ln p`". Any excluded-class count `theta` gives `lambda_theta(u)` by
   the same two proofs. At `theta = 1` that is
   `lambda_1(u) = e^{-gamma} int_u^infty rho`, Gorodetsky's function, and
   `varE-spectral.md` §9 already checks the corresponding decoupled sum against
   his (1.5)/(1.6) to relative `1.7e-16`. So the `theta = 1` branch is a check
   on this proof and not only on the arithmetic: a published theorem sits at
   `theta = 1` on the same object, and the limit this note proves for the model
   agrees with it there.
4. **The `n | L` band is doubly harmless.** It contributes exactly zero at
   every finite level, and its probability tends to zero, so it is not even a
   `1/ln y` correction. `varE-asymptotic.md` §6 item 4 warned that treating
   `{L/e}` as equidistributed would be wrong by the inert share, 0.539 of the
   Mertens mass at `x = 37`; that warning is about the arithmetic side, and on
   the model side the inert conductors are handled exactly rather than
   approximated.

## 5. Theorem C: the rate, from an elementary local bound

Theorem B says the bands vanish. How fast is a separate question, and it is
the one `varE-spectral.md` §4 answered by assertion (`O(1/ln W)`, not
evaluated). It is provable, elementarily.

**Lemma C1 (block bound).** Let `h` be multiplicative, supported on squarefree
integers whose prime factors lie in `[5, y]`, with `h(5) = 3` and
`h(p) = 2/(p-3)` for `7 <= p <= y`. Then for every `N >= 1`,

    sum_{N < m <= eN} h(m)  <=  K (1 + ln 2N),

with `K` absolute, in particular uniform in `y`.

*Proof.* `h(m) <= c(m)/m` with `c(m) = m h(m)` multiplicative, squarefree
supported, `c(5) = 15` and `c(p) = 2p/(p-3) = 2 + 6/(p-3)` for `7 <= p <= y`.
So the block is at most `N^{-1} sum_{m <= eN} c(m)`. Let
`q_y(m) = mu^2(m) 2^{omega(m)} 1[m is y-smooth and coprime to 6]`. Then
`sum_{m <= M} q_y(m) <= sum_{m <= M} mu^2(m) 2^{omega(m)} <= M(1 + ln M)`,
because for squarefree `m` the ordered coprime factorisations `m = ab` number
`2^{omega(m)}`, so `mu^2(m) 2^{omega(m)} = sum_{ab=m} mu^2(a) mu^2(b)` and
`sum_{m<=M} <= sum_{a<=M} floor(M/a)`.

Write `c = q_y * b` (Dirichlet). Locally, `sum_k b(p^k) z^k = (1 + c(p)z)/(1 + 2z)`,
so `b(p^k) = (-2)^{k-1}(c(p) - 2)` for `k >= 1`. For `p < 5` or `p > y` both
`c(p)` and `q_y(p)` vanish and `b(p^k) = 0`. For `7 <= p <= y`,
`|c(p) - 2| = 6/(p-3)`, and

    sum_k |b(p^k)|/p^k = |c(p) - 2|/(p - 2) = 6/((p-3)(p-2)),

summable over primes; the single prime 5 contributes the finite factor
`1 + 13/3`. Hence `sum_m |b(m)|/m <= K_0 < infinity`, absolute. Then

    sum_{m<=M} c(m) = sum_{d<=M} b(d) sum_{e <= M/d} q_y(e)
                    <= sum_{d<=M} |b(d)| (M/d)(1 + ln M)
                    <= K_0 M (1 + ln M).  []

The `1 +` is bookkeeping: only `N >= 1` occurs in Lemma C2, because the
support satisfies `6 | n`.

**Lemma C2 (local bound).** Uniformly in `T > 0` and `y`,

    Pr[ ln n in (T-1, T] ]  <=  K' (1 + T)/ln^2 y.

*Proof.* The support is `n = 6m` with `m` as in Lemma C1, and the weight is
`w(6m) = C_y h(m)` with `C_y = prod_{5<=p<=y}(1 - pi_p) = (1/4) prod_{7<=p<=y}(p-3)/(p-1)`.
Since `(p-3)/(p-1) = (1-1/p)^2 (1 - (3p-1)/(p-1)^3)` and
`sum_p (3p-1)/(p-1)^3` converges, Mertens gives `C_y asymp 1/ln^2 y`. Lemma C1
with `N = e^{T-1}/6` gives the claim. `[]`

**Theorem C.** With `L = y^{u + o(1)}` and `u` fixed,

    R = E[(L/n) 1_{n>L}] = O_u(1/ln y),
    B = E[g 1_{n<L}] <= (1/4) E[(n/L) 1_{n<L}] = O_u(1/ln y),

hence `E[g] = Pr[n > L] + O_u(1/ln y)`.

*Proof.* Bin by `j >= 0`. For the lower band,
`E[(n/L)1_{n<L}] <= sum_j e^{-j} Pr[ln n in (ln L - j - 1, ln L - j]]
<= K' (1 + ln L)/ln^2 y sum_j e^{-j} = O_u(1/ln y)` by Lemma C2 and
`ln L = u ln y (1+o(1))`. For the upper band,
`E[(L/n)1_{n>L}] <= sum_j e^{-j} Pr[ln n in (ln L + j, ln L + j + 1]]
<= (K'/ln^2 y) sum_j e^{-j}(2 + ln L + j) = O_u(1/ln y)`, the `j` sum
converging. `[]`

**What is still not proven.** Theorem C bounds the two transition bands at
`O(1/ln y)`. It does not bound `|Pr[D_y > u_y] - lambda_2(u)|`. Theorem A
gives a rate for the Laplace transform, `O_s(lnln y/ln y)`, and Lemma C2 gives
the modulus of continuity a smoothing argument needs, so an Esseen-type
inequality would convert one into the other; that conversion is **NOT DONE
here**. So the model's own rate of approach to `lambda_2(2)` is measured (§6)
and not derived, while the model's *limit* is proven.

## 6. The bands, measured exactly at nine levels

Every column below is exact arithmetic over the model's own support: the
conductors `n <= L` are enumerated one at a time by descent over the primes,
Kahan-summed, and the two quantities above `L` come from the closed form
`E[1/n] = delta` of §1. There is no Monte Carlo anywhere in the producer. The
levels are `variance-note.md` §7's nine, and the deepest costs 4792 s and
121,901,832,970 enumerated conductors.

**6a. The recomposition, and the model against the corpus.**

| `x` | `Pr[n\|L]`, closed form | `Pr[n\|L]`, enumerated | `P_>` | `R` | `B` | `E[g]` exact | corpus |
|---|---|---|---|---|---|---|---|
| 7 | 0.666666667 | 0.666666667 | 0.283333333 | 0.108197358 | 0.003056943 | 0.178192918 | 0.178193 |
| 11 | 0.417387328 | 0.417387328 | 0.335525028 | 0.081053290 | 0.012367138 | 0.266838875 | 0.266839 |
| 13 | 0.296671934 | 0.296671934 | 0.350725586 | 0.066478692 | 0.012344728 | 0.296591623 | 0.296592 |
| 17 | 0.212414912 | 0.212414912 | 0.368116926 | 0.052466671 | 0.009853657 | 0.325503912 | 0.325504 |
| 19 | 0.160547361 | 0.160547361 | 0.382620145 | 0.043864663 | 0.008044066 | 0.346799547 | 0.346800 |
| 23 | 0.123952461 | 0.123952461 | 0.394436926 | 0.037234816 | 0.006640313 | 0.363842423 | 0.363842 |
| 29 | 0.096758571 | 0.096758571 | 0.403580143 | 0.032052128 | 0.005616554 | 0.377144569 | 0.37695 (MC) |
| 31 | 0.078138150 | 0.078138150 | 0.410607924 | 0.028055939 | 0.004855050 | 0.387407034 | 0.38740 (MC) |
| 37 | 0.063810103 | 0.063810103 | 0.416225089 | 0.024823834 | 0.004252203 | 0.395653458 | 0.39643 (MC) |

Four readings, the disconfirming ones first.

- **The deepest levels carry a float floor, and the printed digits overstate
  them.** `R` is `L(E[1/n] - sum_{n<=L} w(n)/n)`, a difference of two
  quantities of size `L delta = E[N_W] = 9.38e9` at `x = 37`
  (`variance-note.md` §7), and PART 0's `E[1/n]/delta - 1` column measures the
  two products' mutual inconsistency at `-1.25e-14` there, which bounds `R`'s
  absolute error by about `1e-4`. The independent descent of
  `research/varE-exact-ladder-01.js` SEC 2, whose `delta*L` is BigInt-exact,
  reads `0.377144535`, `0.387403848`, `0.395666501` at `x = 29, 31, 37`, and
  its SEC 1 sieve reads `0.377144494` and `0.387404967`. So the witness spread
  is `7.5e-8`, `3.2e-6`, `1.3e-5`, the honest quotes are `0.3771445`,
  `0.387405` and `0.39566`, and the sibling's `x = 37` value is the better of
  the two. `B`, `P_>` and `Pr[n|L]` are direct sums with no cancellation and
  agree with the sibling to every printed digit, including the `x = 37` band
  `0.004252203` and mass `0.063810`.
- **`varE-spectral.md` §6a's model column is `0.0008` high at `x = 37`.** It
  quotes `0.39643`, Monte Carlo at `N = 4e5`, against `0.39566`;
  `redteam-0828-varE.md` §4's Monte Carlo at `N = 2e7` reads
  `0.395567 +- 0.000106`. `0.0008` is larger than every residual that column is
  used to discuss.
- **The recomposition is exact.** `P_> - R + B` returns `E[g]` with residual
  `0.0e+0` at all nine levels, and `E[g]` reproduces `varE-theta2-step.md` §4's
  exact `delta*X_dec` at `x = 7..23` to every printed digit. Two independent
  routes to the same six numbers, three counting the sibling.
- **Against the true variance.** `research/varE-exact-ladder-01.js` SEC 1
  computes the exact `delta*X = Var/E` at `x = 29, 31`, reading `0.377418` and
  `0.387588`, so the decoupling error of link 2 is `+0.000273` and `+0.000183`
  with `delta(X - X_dec) ln y = 0.00309` and `0.00238`, extending
  `varE-theta2-step.md` §5's six levels to eight and continuing to fall. That
  is the sibling's finding, cited and not recomputed here. At `x = 37` no exact
  `Var/E` exists; `variance-note.md` §7's `0.3958` carries `+-5e-5` from its
  own rounding, and against `0.39566` that leaves `+0.00014`.

**6b. The two transition bands against `1/ln y`.**

| `x` | `ln y` | `u_y` | `R ln y` | `f_2(u_y)` | `B ln y` | `f_2(u_y) I` | `B/(R I)` | `Bmax ln y/4` |
|---|---|---|---|---|---|---|---|---|
| 7 | 2.5649 | 2.0847 | 0.277521 | 0.375559 | 0.007841 | 0.060886 | 0.17427 | 0.157459 |
| 11 | 3.8501 | 2.0116 | 0.312067 | 0.385490 | 0.047615 | 0.062496 | 0.94114 | 0.108935 |
| 13 | 5.1533 | 2.0007 | 0.342584 | 0.386845 | 0.063616 | 0.062716 | 1.14540 | 0.105435 |
| 17 | 6.5639 | 2.0024 | 0.344384 | 0.386638 | 0.064678 | 0.062682 | 1.15844 | 0.100464 |
| 19 | 8.0421 | 2.0004 | 0.352762 | 0.386872 | 0.064691 | 0.062721 | 1.13115 | 0.099629 |
| 23 | 9.6111 | 2.0001 | 0.357866 | 0.386913 | 0.063820 | 0.062727 | 1.10001 | 0.098267 |
| 29 | 11.2951 | 2.0000 | 0.362033 | 0.386924 | 0.063440 | 0.062729 | 1.08086 | 0.097716 |
| 31 | 13.0122 | 2.0000 | 0.365069 | 0.386925 | 0.063175 | 0.062729 | 1.06740 | 0.097314 |
| 37 | 14.8176 | 2.0000 | 0.367831 | 0.386925 | 0.063008 | 0.062729 | 1.05658 | 0.097069 |

`I = int_1^infty {v}(1-{v}) v^{-2} dv = 0.162122045`.

**This is the answer to the brief's question about the `n < L` band.** It is
`O(1/ln y)`, proven in §5 and bounded on nine levels here, with
`B ln y` settling on `0.0630` over the top five levels. Its size at the exact
levels is `0.0124` at `x = 13` down to `0.00425` at `x = 37`, against an
`E[g]` of `0.297` and `0.396`: between 1.1% and 4.2% of the model's value at
every level from `x = 13` up, and shrinking like `1/ln y`.

**The two bands are the same local density, measured.** If the distribution of
`ln n` has a local density `f_2(u)/ln y` near the threshold, then
`R ln y -> f_2(u)` and `B ln y -> f_2(u) I`, `I` the average of
`{v}(1-{v})` against `v^{-2} dv`. `R ln y` climbs to `0.367831` against
`f_2(2) = 0.386925`, and `B/(R I)` falls to `1.05658` against 1. Both are
consistent and neither has arrived; the local density itself is not proven
here, only the upper bound of Lemma C2 is.

**The analytic bound is within a factor 1.5.** Theorem C bounds `B` by
`(1/4) E[(n/L) 1_{n<L}]`, whose `ln y` scaling settles at `0.097069` against
the measured `0.063008`.

**6c. `P_>` against `GD(2)`'s tail.**

| `x` | `u_y` | `lambda_2(u_y)` | `P_>` | `lambda_2 - P_>` | `(lambda_2 - P_>) ln y` | `lambda_2(u_y) - E[g]` |
|---|---|---|---|---|---|---|
| 7 | 2.0847 | 0.423157222 | 0.283333333 | 0.139823889 | 0.358641 | 0.244964 |
| 11 | 2.0116 | 0.450971828 | 0.335525028 | 0.115446800 | 0.444487 | 0.184133 |
| 13 | 2.0007 | 0.455203553 | 0.350725586 | 0.104477967 | 0.538405 | 0.158612 |
| 17 | 2.0024 | 0.454545812 | 0.368116926 | 0.086428886 | 0.567307 | 0.129042 |
| 19 | 2.0004 | 0.455288498 | 0.382620145 | 0.072668353 | 0.584403 | 0.108489 |
| 23 | 2.0001 | 0.455417153 | 0.394436926 | 0.060980227 | 0.586085 | 0.091575 |
| 29 | 2.0000 | 0.455451877 | 0.403580143 | 0.051871735 | 0.585898 | 0.078307 |
| 31 | 2.0000 | 0.455455045 | 0.410607924 | 0.044847122 | 0.583558 | 0.068048 |
| 37 | 2.0000 | 0.455456016 | 0.416225089 | 0.039230928 | 0.581310 | 0.059803 |

The delay-equation solution returns total mass `0.999990778` and
`lambda_2(2) = 0.455456480` against the closed form
`1 - e^{-2gamma}(9/2 - 4 ln 2) = 0.455456480`, a third witness to
`redteam-0828-varE.md` §1's three.

`(lambda_2 - P_>) ln y` is bounded and near 0.58 over the top five levels; no
bound on it is proven here, which is the gap §5 names. Adding it to `R ln y`
and subtracting `B ln y` gives the model's whole distance from its limit,
`(lambda_2(2) - E[g]) ln y = 0.817373, 0.847013, 0.872474, 0.880131, 0.884491,
0.885452, 0.886133` at `x = 13..37`, settling on `0.886`. Two consequences,
both consistency checks rather than new information: it explains
`varE-spectral.md` §5's "at `x = 41` it is still 0.053 short" as
`0.886/16.674 = 0.0531`, and extrapolated it predicts the model at `x = 41` to
be `0.40231`, against `redteam-0828-varE.md` §4's Monte Carlo
`0.402364 +- 0.000075`.

**6d. The local bound of Lemma C2, measured.**

| `x` | `ln y` | `sup_T ln y Pr[ln n in (T-1,T]]` | at `T` | top full bin |
|---|---|---|---|---|
| 7 | 2.5649 | 0.997480 | 4 | 0.128247 |
| 11 | 3.8501 | 0.749935 | 4 | 0.430153 |
| 13 | 5.1533 | 0.594548 | 4 | 0.388697 |
| 17 | 6.5639 | 0.474950 | 10 | 0.395823 |
| 19 | 8.0421 | 0.439211 | 11 | 0.394282 |
| 23 | 9.6111 | 0.439692 | 13 | 0.390114 |
| 29 | 11.2951 | 0.427448 | 17 | 0.393066 |
| 31 | 13.0122 | 0.420507 | 19 | 0.384880 |
| 37 | 14.8176 | 0.417147 | 23 | 0.390133 |

Lemma C2 says this column is bounded by an absolute constant. It is, and it
falls, from `0.997480` to `0.417147`. The top full bin, which sits at the
threshold `ln L`, reads `0.390133` at `x = 37` against `f_2(2) = 0.386925`,
which is the local density the two transition bands are governed by, appearing
directly.

**The transform's rate (PART 4).** `err ln y/lnln y` is bounded at all four
`s` on all nine levels. At `s = 0.5` and `s = 1` it rises then falls,
`0.12758 -> 0.10285` and `0.10494 -> 0.09450`; at `s = 2` and `s = 4` it is
still rising at `x = 37`, `0.05696` and `0.02199`. Bounded is what Theorem A
predicts and what the levels show. Settled they are not, so nothing here pins
the rate's constant.

## 7. What this does to 0.45546

**The number does not move, and there is no correction to state.** The brief
allowed for a second outcome, "PROVEN WITH A CORRECTION, state the corrected
limit to six digits". That outcome does not arise. Theorem B gives the model's
limit as `Pr[GD(2) > u]` exactly: the inert band contributes exactly zero at
every finite level, and the transition region contributes zero in the limit.
So `varE-spectral.md` §5's

    lambda_2(2) = 1 - e^{-2 gamma}(9/2 - 4 ln 2) = 0.45545648

stands unchanged as the decoupled model's limit at `u = 2`.

**What moves is the step count.** The chain, link by link, with each link's
rung:

| link | statement | rung |
|---|---|---|
| 1 | `Var/E = delta X` exactly, `X = sum_{|h|<L}(1-|h|/L)(W(h)-1)` | PROVEN, `varE-asymptotic.md` §1, checked at `x = 7` to `2e-16` |
| 2 | `delta X = delta X_dec + error` | **OPEN.** The theta = 2 decoupling replacement. `varE-theta2-step.md` §5 measures the error `O(1/ln y)` or better on six exact levels and `research/varE-exact-ladder-01.js` SEC 1 extends that to eight, `delta(X - X_dec) ln y` falling to `0.00238` at `x = 31`; falling excludes growth and nothing finer |
| 3 | `delta X_dec = E[g(n)]` with `pi_p = (p-alpha_p)/(p-1)` | PROVEN, `varE-spectral.md` §3 |
| 4 | `E[g(n)] -> Pr[GD(2) > u]` | **PROVEN here** (Theorems A, B). Was open |
| 5 | `Pr[GD(2) > 2] = 1 - e^{-2gamma}(9/2 - 4 ln 2) = 0.45545648` | PROVEN, confirmed to `2.9e-11` by three routes (`redteam-0828-varE.md` §1) |

Exactly one link is unproven. Everything the corpus says about `0.45546`
should now name that one link rather than two, and the corpus's own narrowing
of it stands: `varE-theta2-step.md` §3 shows the `c = 0` shift group survives
the replacement exactly, so what is open is the single statement that the
CRT-mixed lags of `|Ehat_n(t)|^2` contribute `o(1/delta)`.

**One tool this pass leaves behind for that link.** Lemma C2 is a bound on the
model's conductor distribution, `Pr[ln n in (T-1,T]] = O((1+T)/ln^2 y)`,
uniform in `y`, proved from a block bound for a dimension-2 multiplicative
function and nothing else. Whether it helps with the shift groups is untested
and is not claimed.

**The rung of the constant is unchanged.** `lim Var/E = 0.45546` stays
HEURISTIC. A proven limit for the model is not a limit for `Var/E`, and link 2
is what separates them.

**And there is still no measurement of the constant to check against.** The
brief asks to check any corrected value against "the measured 0.455 +- 0.002".
No such measurement exists. The bias-corrected intercept cluster
`[0.4471, 0.4546]` of `varE-spectral.md` §7 reading 3 is bounded a priori by
`||c||_1 max|data - model|` and restates that the model tracks the data
pointwise; `redteam-0828-varE.md` §4 says so. The nine measured levels reach
`0.3958`, and §6 above measures the model's own approach to its limit at `0.886/ln y`,
so no level of the present kind comes near `0.4555`. Extrapolating that drift,
which is a measurement and not a law, `E[g] = 0.45` needs `ln y` near 162, that
is `W` near `e^325`.

## 8. Prior art: what is quoted, what is derived, and one hypothesis that fails

**Quoted, read at the page this session.** Ross G. Pinsky, *On the strange
domain of attraction to generalized Dickman distributions for sums of
independent random variables*, arXiv:1611.07207v3 (4 Jan 2017), sha256
`0faf7919f6ca02429751cdba1d1ec48f701b78dc926dba5b19c0c2d2c6305d71`, pp. 2-3:
`GD(theta)` is the law with Laplace transform
`exp(theta int_0^1 (e^{-lambda x} - 1)/x dx)`, it is infinitely divisible, its
density is `p_theta = e^{-theta gamma} rho_theta/Gamma(theta)` with (1.1)
`rho_theta(x) = x^{theta-1}` on `(0,1]` and
`x rho_theta' + (1-theta) rho_theta + theta rho_theta(x-1) = 0` for `x > 1`,
its mean is `theta`, and `p_theta(x) <= C_theta/Gamma(x+1)` for `x >= 1`. This
is `varE-spectral.md` §5's `f_theta` verbatim, now against a primary source
rather than `lit-dickman-variance.md` §3's secondary statements, and it
supplies the two properties §4 needs: continuity of the law and boundedness of
the density.

**A hypothesis that fails, and why the proof above is not a citation.**
Pinsky's Theorem 1(ii) (p. 6) and Theorem 2 (p. 7) are domain-of-attraction
theorems for exactly the shape of sum studied here,
`W_n = M_n^{-1} sum_k B_k X_k` with `B_k` Bernoulli. Taking `X_k = mu_k = ln p_k`
and `p_k = pi_{p_k}` gives `M_n ~ 2 ln y` and `W_n = D_y/2`, and the conclusion
`W_n -> D_theta/theta` at `theta = 2` is exactly Theorem A. **But hypothesis
(1.14) is not satisfied.** It requires `p_k mu_k/(mu_{k+1} - mu_k) -> theta`,
and here that ratio is `2 ln p_k/(p_{k+1} - p_k) (1 + o(1))`, which oscillates
with the prime gaps and has no limit: it is `ln p_k` across a twin pair, where
the gap is 2, and near zero across a gap much longer than `ln p_k`. Theorem 2's `mu_{k+1} - mu_k ~ mu'(k)` fails for
the same reason. The aggregate Mertens behaviour is right and the pointwise
spacing behaviour is not, which is why §2 proves the transform directly, using
only `sum_{p<=t} 1/p = lnln t + M + O(1/ln t)`. The citation is for
`GD(theta)`'s definition and properties; the limit theorem for this particular
Bernoulli array is derived here.

**Not novel, and not claimed as such.** `lit-dickman-variance.md` §0 records
that `GD(theta)` is published probability and that calling `lambda_theta(u) =
Pr[GD(theta) > u]` new would be wrong. Theorem A is the standard
Dickman/Goncharov convergence for an independent-prime model; the only thing
specific to this corpus is that the array's inclusion rate is `pi_p` rather
than `2/p`, and step (ii) of the proof shows the difference is summable.
Theorem B and Theorem C are about `E[g]`, not about `D_y`, and whether either
is in print at `theta = 2` was **not searched** in this pass;
`lit-dickman-variance.md` §4's six calibrated channels found the `theta = 2`
short-interval variance asymptotic absent, with four legs owed, and that
finding is not extended here.

## 9. What would falsify this, and whether the check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| `E_Pi[1/n] = delta` | PROVEN, one line | a level where the product and `delta` differ | YES, nine levels, `<= 2.4e-15` relative (PART 0) |
| `g(n) = 0` iff `n \| L`; the `n \| L` band is exactly inert and its mass vanishes | PROVEN | a nonzero `g` at `n \| L`, or a non-vanishing `Pr[n\|L]` | YES; the closed form and the enumerated `r_n = 0` nodes agree to the printed digit at nine levels (PART 1) |
| `E[g] = P_> - R + B`, all four exact | PROVEN | a level where the recomposition misses `E[g]` | YES, nine levels, residual `0.0e+0` (PART 1) |
| `ln n/ln y -> GD(2)`, transform rate `O_s(lnln y/ln y)` (Theorem A) | PROVEN | the exact transform failing to approach `GD(2)`'s, or the scaled error growing | YES, four `s` values on nine levels, error times `ln y/lnln y` bounded (PART 4) |
| `E[g] -> lambda_2(u)` with **no** correction term (Theorem B) | PROVEN | an unbounded `GD(2)` density, or a transition contribution surviving the `eps` split | The density bound is Pinsky p. 2, read at the page. The numerical column of PART 3 is consistent and is not a proof of a limit |
| `R` and `B` are `O(1/ln y)`, uniformly (Lemma C1, C2, Theorem C) | PROVEN, elementary | a level where `R ln y` or `B ln y` grows, or a local-bound constant that grows with `y` | YES on nine levels for all three: PART 2's `R ln y` and `B ln y`, PART 5's `sup_T ln y Pr[.]` |
| the model's rate of approach to `lambda_2(2)` | MEASURED, NOT derived | nothing; no bound is claimed | The Esseen conversion of Theorem A's transform rate into a CDF rate is NOT DONE |
| the exact model column at `x = 29, 31, 37` | PROVEN (exact enumeration) to the stated float floor | an independent computation disagreeing by more than that floor | YES. It agrees with the corpus's exact `delta*X_dec` at `x = 7..23` to every printed digit, and with `research/varE-exact-ladder-01.js`'s two independent routes at `x = 29, 31, 37` to `7.5e-8`, `3.2e-6`, `1.3e-5`, which is the floor and not a disagreement |
| `lim Var/E = lambda_2(2) = 0.45546` | HEURISTIC, **one** open step | the decoupling replacement shifting the limit | NO. Step 1 is open; `varE-theta2-step.md` §5 measures it `O(1/ln y)` or better on six exact levels, which excludes growth and nothing finer |
| Theorems A, B, C are novel | NOT CLAIMED | any statement of `lambda_theta` as a sifted-window limit at `theta > 1` | NO. Not searched in this pass. `lit-dickman-variance.md` §4's six channels found the `theta = 2` asymptotic absent with four legs owed, and that finding is not extended here |
| the derivation has survived review | NO | an adversarial pass | NOT RUN. Written this session, HELD |

## 10. Defects noticed in passing

Nothing below is applied; this note edits no other file.

- `varE-spectral.md` §0's "Two steps are unproven, and together they are the
  gap", its §5 paragraph "The passage above is the second open step", its §8
  "item 9 needs both closed", its §11 limit row "HEURISTIC, two open steps",
  and its ledger `verdict:` field all count two open steps. One is left.
  Replacement wording is in §7 above.
- `varE-spectral.md` §4's conductor table gives the `n <= L` row as
  "`O(1/ln W)`: moves the drift, not the limit" with the note's own text saying
  it is "**not** evaluated here". It is proven `O(1/ln y)` in §5 above and
  measured in §6, so the row can carry a proof and a coefficient instead of an
  assertion.
- `varE-spectral.md` §11's row "the drift family is a series in `1/ln W` |
  HEURISTIC | ... | NO. The `n <= L` band that carries the `1/ln W` coefficient
  is not evaluated" needs splitting: the band **is** now evaluated, and the
  drift-family claim is **still** not derived, because the rate at which
  `Pr[D_y > u_y]` approaches `lambda_2(u)` is not bounded here.
- `varE-spectral.md` §6a's model column is Monte Carlo at every level. Exact
  values now exist at all nine; §6 above prints them.
- `lit-dickman-variance.md` §9's row "`GD(theta)` is published and
  `varE-spectral.md` §5's `f_theta` is its density | PROVEN from secondary
  statements | ... | YES against two independent secondary statements of the
  density and the mean; **NO** against a primary" can be raised: Pinsky
  arXiv:1611.07207v3 pp. 2-3 was read at the page this session and states the
  Laplace transform, the density `e^{-theta gamma} rho_theta/Gamma(theta)`, the
  delay equation (1.1), the mean `theta`, and the decay bound. The sha256 is in
  §8.
- `research/QUESTIONS.md` item 9's row says the limit "stays HEURISTIC with
  varE-spectral's second step, its own limit theorem, still open". It is
  generated from the ledger blocks, so it takes no hand edit; regenerate.
- The TODO item 9 brief drafted in `applied-0828-varE.md` §5 says "TWO open
  steps: the theta = 2 mean-coefficient replacement and the model's own limit
  theorem". One.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md`
for the corpus rule. This note edited no other file and ran no git command.*
