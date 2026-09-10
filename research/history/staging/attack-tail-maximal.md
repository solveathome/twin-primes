# The tail-only maximal inequality: the split is a reparametrisation, not a localisation

<!-- ledger
id: Q-tail-maximal
status: CLOSED
todo: none
question: Is a tail-only maximal inequality a smaller ask than the full one, as attack-AB-bounded section 4.4 supposed?
verdict: No: the split is exact but is a reparametrisation rather than a localisation, the tail is maximal and saturates the Gaussian law, a fixed cut buys nothing asymptotically, and the tail is not a smaller ask but the whole ask.
-->

*(2026-08-18/19, attack 1 of 10 on the 4.2665 exponent. Script:
`research/attack-tail-maximal.js`. Legend: **[PROVEN]** published theorem with
source; **[VERIFIED]** checked computationally in this repository;
**[MEASURED]** empirical, finite range; **[ABSENT]** searched and found nothing,
with the channel and a known-positive calibration probe named in the same
session; **[INFERRED]** our deduction from sourced facts. **No literature
channel was opened in this session and no `[ABSENT]` claim is made anywhere in
this document.**)*

## HEADLINE

**`attack-AB-bounded.md` §4.4 is right that the wall is in the tail, and wrong
about why, and the "why" is what decides whether the tail is a smaller ask. It
is not. It is the whole ask.**

1. **The split is exact and the head needs no supremum at all.** [VERIFIED] For
   a cut `m = prod_{p<=y} p` dividing `W = P(z) = prod_{p<z} p`, the head
   `Phi_m` is the *conditional mean of `R_H` on the residue class `x mod m`*,
   and the tail `T_m = R_H - Phi_m` is the fluctuation about it. The head
   carries exactly `m-1` frequencies, so Cauchy–Schwarz gives
   `sup_x |Phi_m| <= SsupH <= sqrt(m-1) * rms(Phi_m)` with **no quantifier over
   `x` anywhere**. At a fixed `m` that is a constant in `z`.
2. **So §4.4's flatness is a theorem, not a discovery, and it is a theorem about
   the CUT, not about the sieve.** The head's `sup/rms` is flat because the head
   has boundedly many frequencies. Measured here at a fixed cut `m = 210`:
   `lam_head` = 1.7472, 2.2154, 1.9809, 1.9466 at `z = 13,17,19,23`, flat.
3. **The tail is measured maximal, and it saturates the Gaussian law.**
   [MEASURED] Nobody had run §4.4's measurement on the other half. At the same
   fixed cut `lam_tail = sup|T|/rms(T)` = **2.3142, 2.9410, 3.7037, 4.1244** —
   rising at every step — and `lam_tail / sqrt(2 ln W)` sits at 0.59, 0.65,
   0.72, 0.73. **The tail behaves exactly like a Gaussian maximum over `W`
   positions.** The head is flat, the tail tracks `sqrt(2 ln W)`. That is the
   contrast the split was supposed to exploit and it runs the wrong way.
4. **And at a fixed cut the split buys nothing asymptotically.** [VERIFIED] The
   tail's share of the mean square at `m = 2310` is 0.5287, 0.5782, 0.8889,
   0.9943, 0.9920, 0.9965 over `z = 17..37` — **converging to 1** — and the
   ceiling on any perfect treatment of the head, `Ssup/SsupT`, is 1.6270,
   1.1965, 1.0674, 1.0181, 1.0108, 1.0039 — **converging to 1**. This is
   §4.3's "the benefit of a FIXED cutoff decays geometrically" made exact in the
   two currencies that matter.
5. **The one genuine gain in this report: a proven chain that beats `u_sup` at
   every computable level.** [VERIFIED] Head by absolute values, tail by the
   per-class `l^2` bound that the DP1 integrality mechanism reduces to:
   `Bd(m) = SsupH(m,H) + max_c sqrt(sum_{y = c mod m} T(y)^2)`. At `H = nP`,
   `Bd/Ssup` = **0.6157, 0.5249, 0.5138, 0.4722** at `z = 13..23`, and in window
   exponent `u_int` = **1.9612, 2.0985, 2.3501, 2.4769** against
   `u_sup` = 2.0617, 2.3036, 2.5518, 2.6666. **A 2.1x better constant and
   0.10 to 0.20 of window exponent, unconditional.**
6. **And it dies on the same law.** `u_int - theta(z)/(2 ln z)` = 0.4514,
   0.2790, 0.1182, **-0.0885** — falling to the almost-all curve. `u_int` is
   `theta(z)/(2 ln z) + O(1)`, which diverges like `z/(2 ln z)`. It is a better
   constant on the route `sift-limit-attack.md` §7e already prices as `u_1`, not
   a new route.
7. **The `tau(m)` substitution is CONFIRMED, and it is larger than the corpus
   says.** [VERIFIED] `Omega(z,s) := max{k : p_1...p_k <= z^{2s}}` is governed
   by `ln m`, not by `z`, so the per-modulus price `2^Omega` costs
   `Omega ln 2 / ln z` = **1.8917 at `z = 13` falling to 1.0285 at `z = 1e12`**,
   while `C^{pi(z)}` costs `pi(z) ln C / ln z` = **1.399 rising to 9.743e8** over
   the same range. **The substitution converts a divergent window-exponent cost
   into a bounded and slowly decaying one.** The obvious kill — at `m = P(z)`,
   `tau(m) = 2^{pi(z)}` and the two prices are the same number — is answered by
   the range of `m`: `m = [d1,d2] <= D^2 = z^{2s}`, and the caps `Omega` and
   `pi(z)` cross at `z = 23` (both 8), after which `P(z)` leaves the admissible
   set and the cap parts from `pi(z)` (**9 against 13 at `z = 43`**, 21 against
   9592 at `z = 100003`). Crossover `z = 20` at the measured `C = 2.05`. It is not free: the `tau` basis pays `z^{2s}` moduli where
   the `e` basis pays `2^{pi(z)}`, and that comparison runs the other way below
   `z ~ 200`.
8. **Two of the three suggested attacks are closed with a reason, not an
   impression.** The **large sieve** on the tail moduli is void: the tail's
   frequencies are all multiples of `1/W`, so the large sieve delivers `(H+W)H`
   against Parseval's exact `H(W-H)`, a ratio of **1.000053 at `z = 23`** — it
   *is* the mean square we already have proved, to four digits. **Divisor
   switching** is not void — the certificate is genuinely asymmetric under
   `d1 <-> d2`, mean relative asymmetry 0.49 to 0.52 — but its best case is
   bounded: adding the two orderings coherently before the absolute value takes
   `B` to **0.500, 0.504, 0.533, 0.534, 0.536** of itself over `z = 13..29`, a
   factor of 2 that is *flat in `z`*, against a deficit that is a growing power.

**WHAT WOULD CLOSE IT, PRICED.** At `H = z^{beta_2}` the tail-only maximal
inequality must deliver `lam_req = (H*M - SsupH)/rms(T)` = 2.11e3, 7.30e3,
5.74e3, 7.88e3, 1.53e4, 1.49e4, 1.70e4 at `z = 13..37`, growing like
`z^{1.8795}`; the absolute-value step delivers `lam_abs = SsupT/rms(T)` = 5.83,
16.49, 22.11, 30.34, 43.99, 60.20, 87.66, growing like `z^{2.4064}`. **The
required inequality is 193x weaker than what we already have at `z = 37` and the
margin closes like `z^{-0.53}`.** Class: the ask is a **maximal** statement, this
project's wall, and it is being asked for far less than usual — `lam_req` is
2350x the Gaussian value `sqrt(2 ln W)` at `z = 37`. Everything cheaper than a
maximal inequality — Parseval, the large sieve, per-class `l^2`, divisor
switching — has now been measured and each buys a bounded constant.

---

## 0. Custody

Everything numeric below is quoted from `research/attack-tail-maximal.js`, run in
this session, with its OUTPUT block written by `research/qc/embed.js`. The
certificate term list, the exact `O(N^2)` divisor-pair mean square and the
Rosser–Iwaniec supports are the repository's own (`sift-limit-lemmaV.js`); the
spectral records and the peeled `Ssup` sweep are `lemmaV-parseval.js`'s and
`lemmaV-sup-extension.js`'s. All are imported, never recopied. `research/qc.js`
and `research/qc/units.js` were run and read before any edit.

**Convention, stated because §4.4's figures use the other one.** The sieve here
uses the primes `p < z` (that is what `rosserSupport` does), so
`W = P(z) = prod_{p<z} p`: `W = 2310, 30030, 510510, 9699690` at
`z = 13, 17, 19, 23`. `attack-AB-bounded.md` §4.4 quotes `P(11) = 2310` with
`z = 13` as a proper cut, i.e. primes `p <= y`, and its `z` labels therefore sit
one prime above this file's. **No figure of §4.4 is reproduced here**; the same
measurement is re-run in this file's convention instead.


---

## 1. THE SPLIT, STATED AS A LEMMA

This is the deliverable the brief asked for first: the cut as a parameter, and
exactly which sums need a supremum over `x`.

### 1.1 The lemma

Let `z` be the sieve level, `W = P(z) = prod_{p<z} p` the period, and let `y < z`
be a prime. Put `m = prod_{p<=y} p`, a divisor of `W`. Write attack 1's L5
identity (`research/lemmaV-parseval.js`, chain step L5) as

```
  R_H(x) = sum_{e | W, e>1} sum*_{a mod e} Theta_e(a) S_H(a/e) e(ax/e)
```

and split the `e`-sum at the cut:

```
  Phi_m(x) = sum_{e | m, e>1} sum*_a Theta_e(a) S_H(a/e) e(ax/e)      HEAD
  T_m(x)   = sum_{e | W, e not| m} sum*_a Theta_e(a) S_H(a/e) e(ax/e)  TAIL
  R_H      = Phi_m + T_m                                               exactly
```

**(L-a) The head is a conditional mean.** [INFERRED, and [VERIFIED] to 10–11
digits in S1] The frequencies appearing in `Phi_m` are exactly the rationals
`a/e` with `e | m`, i.e. the rationals with denominator dividing `m`, so `Phi_m`
is the orthogonal projection of `R_H` onto the period-`m` functions:

```
  Phi_m(x) = (m/W) * sum_{y = x (mod m)} R_H(y),      T_m = R_H - Phi_m.
```

Hence `T_m` has mean zero **on every residue class mod `m`**, not merely
globally.

**(L-b) Orthogonality.** [VERIFIED, S0(d)] `<R_H^2> = <Phi_m^2> + <T_m^2>` for
every cut. Checked at 26 cuts across `z = 13..23`, worst relative error
**9.00e-14**.

**(L-c) The head needs no supremum.** [PROVEN, elementary] The head has exactly
`n_head = sum_{e|m} phi(e) - 1 = m - 1` frequencies, so

```
  sup_x |Phi_m(x)|  <=  SsupH(m,H) := sum_{e|m,e>1} sum*_a |Theta_e(a)| |S_H(a/e)|
                    <=  sqrt(m-1) * rms(Phi_m)                    [Cauchy-Schwarz]
```

and **no quantifier over `x` appears in either bound**. At a fixed `m` the loss
`sqrt(m-1)` is a constant in `z`. Verified as a three-term chain at every cut and
every `z = 13..23` in S1: "chain ok = yes" at all 17 rows.

**(L-d) What is left.** The certificate needs `H*M > sup_x |R_H(x)|`, and

```
  sup_x |R_H(x)|  <=  SsupH(m,H)  +  sup_x |T_m(x)|.
```

**The first term is a mean-value object with the quantifier already discharged.
The second is the entire maximal-inequality problem.** That is the exact content
of "the wall is in the tail", stated as an inequality chain with the cut as a
parameter.

### 1.2 What §4.4 actually measured

`attack-AB-bounded.md` §4.4 reports `sup|Phi|/rms` flat at 2.93 to 3.45 and reads
it as evidence that the retained part is not a maximal problem. **(L-c) makes
that a theorem rather than a measurement, and locates its cause: the head has
`m-1` frequencies and `m` is being held fixed.** The flatness is a property of
the cut, not of the sieve, and it says nothing about what happens when `m` is
allowed to grow with `z` — which S2 shows is exactly where it stops holding
(`lam_head` reaches 4.1321 at `m = 510510`, `z = 23`).

---

## 2. THE TAIL IS MAXIMAL, AND IT SATURATES THE GAUSSIAN LAW — [MEASURED]

S2 runs §4.4's measurement on both halves, at `H = nP` and at `H = z^{beta_2}`.
At a **fixed** cut `m = 210`, growing `z` (all figures at `H = z^{beta_2}`):

| `z` | `lam_head` | `lam_tail` | `sqrt(2 ln W)` | `lam_tail/sqrt(2 ln W)` |
|---|---|---|---|---|
| 13 | 1.7472 | 2.3142 | 3.9357 | 0.5880 |
| 17 | 2.2154 | 2.9410 | 4.5409 | 0.6477 |
| 19 | 1.9809 | 3.7037 | 5.1270 | 0.7224 |
| 23 | 1.9466 | 4.1244 | 5.6723 | 0.7271 |

**Reading 1.** `lam_head` is flat — 1.75 to 2.22, no trend — exactly as §4.4
found, and for the reason §1.1 (L-c) gives.

**Reading 2.** `lam_tail` **rises at every step**, 2.3142 to 4.1244, and its
ratio to the Gaussian extreme-value scale `sqrt(2 ln W)` is itself rising, 0.588
to 0.727. The tail is not a bounded-ratio object; it behaves like the maximum of
`W` roughly independent terms.

**Reading 3.** The same contrast holds at `H = nP` and at every cut: over the 22
rows of S2's first table, `lam_head` runs 1.00 to 4.01 and is monotone **in the
cut**, while `lam_tail` runs 1.96 to 5.28 and is monotone **in `z`**. Widening
the cut moves the maximal behaviour from the tail into the head. It does not
remove it.

> **So the split does not localise the obstruction; it parametrises it.** The
> maximal cost is a monotone function of the cut, and the two ends of the family
> are the two horns the corpus already knows: `m = 1` is the undivided problem,
> `m = W` is the exhaustive full-period walk (`attack-AB-bounded.md` §4.3, no
> interior optimum). The measurement here says what is between them.

---

## 3. AT A FIXED CUT THE SPLIT BUYS NOTHING ASYMPTOTICALLY — [VERIFIED]

S3, at `H = z^{beta_2}`, cut `m = 2310` held fixed while `z` grows:

| `z` | tail share of `<R^2>` | `Ssup(H)/SsupT` |
|---|---|---|
| 17 | 0.52868 | 1.6270 |
| 19 | 0.57817 | 1.1965 |
| 23 | 0.88885 | 1.0674 |
| 29 | 0.99433 | 1.0181 |
| 31 | 0.99203 | 1.0108 |
| 37 | 0.99654 | 1.0039 |

**Reading 4.** Both columns converge to 1. By `z = 37` the tail carries
**99.654%** of the mean square and **99.61%** of the absolute-value bound, so a
*perfect* treatment of the head — not a better bound, a free one — would improve
the certificate by a factor of **1.0039**. This is `attack-AB-bounded.md` §4.3's
"the benefit of any FIXED cutoff decays geometrically in `z`" made exact in the
only two currencies the certificate trades in.

**Reading 5.** At the **widest** cut available at each level (`m = W/p_max`) the
ceiling `Ssup/SsupT` instead **rises**: 1.5538, 1.6270, 1.7245, 1.8303, 2.0913,
2.2285, 2.3245 over `z = 13..37`. So there is a real and slowly growing gain
available from a wide cut — but a wide cut is exactly where §2 shows the head
inherits the maximal problem (`lam_head = 4.1321` at `z = 23`), and where the
head's own treatment costs an exhaustive walk over `m` positions.

---

## 4. THE PRICE OF A TAIL-ONLY MAXIMAL INEQUALITY — [VERIFIED]

S4 asks the brief's second question directly. A tail-only maximal inequality of
the shape `sup_x |T_m| <= lambda * rms(T_m)` closes the certificate iff

```
  lambda  <  lam_req := ( H*M - SsupH(m,H) ) / rms(T_m).
```

At `H = z^{beta_2}` and the widest cut of each level:

| `z` | `lam_abs = SsupT/rms(T)` | `lam_req` | `lam_req/lam_abs` | `sqrt(2 ln W)` |
|---|---|---|---|---|
| 13 | 5.8269e+0 | 2.1130e+3 | 3.6263e+2 | 3.9357 |
| 17 | 1.6487e+1 | 7.2991e+3 | 4.4271e+2 | 4.5409 |
| 19 | 2.2107e+1 | 5.7418e+3 | 2.5973e+2 | 5.1270 |
| 23 | 3.0343e+1 | 7.8784e+3 | 2.5964e+2 | 5.6723 |
| 29 | 4.3991e+1 | 1.5255e+4 | 3.4678e+2 | 6.2005 |
| 31 | 6.0200e+1 | 1.4878e+4 | 2.4714e+2 | 6.7217 |
| 37 | 8.7661e+1 | 1.6952e+4 | 1.9338e+2 | 7.2145 |

**Reading 6.** The required inequality is **very slack**: `lam_req` is
**2350x** the Gaussian value at `z = 37` (1.6952e4 against 7.2145). This
independently reproduces the shape of `attack-theta-last-gap.md` §6 (C2) — a
maximal inequality here is allowed to lose a polynomial factor where the
classical ones lose logarithms.

**Reading 7.** And the absolute-value step is already **193x inside** what is
needed at `z = 37`. The route is alive at every computable level; it dies on
growth rates, not on the current numbers.

**Reading 8.** The two growth rates, fitted over the seven levels:
`d ln(lam_req)/d ln z = 1.8795` against `d ln(lam_abs)/d ln z = 2.4064`. The
margin closes like `z^{-0.53}`. The two-parameter extrapolation puts the crossing
at `ln z = 13.9001`, `z = 1.088e6`. **That figure is an order of magnitude at
best** — seven points and two straight lines — and is quoted only to record that
the crossing is finite, which is the same verdict `sift-limit-attack.md` §7e
already reaches for `u_sup` by four mutually indistinguishable models.

**Reading 9.** `lam_req` grows like `z^{1.88}` while `sqrt(2 ln W)` grows like
`z^{0.58}` (fitted 0.5831). **A Gaussian maximal law for the tail alone would
close the certificate with a margin diverging like `z^{1.30}`.** The tail-only
maximal inequality is therefore *sufficient* and, by §2, *exactly as hard as the
general one*: the tail is where all `W - m` of the frequencies live.

---

## 5. THE ATTACK, AND WHAT EACH ROUTE IS WORTH

### 5.1 The large sieve over the tail moduli — VOID, with a reason [VERIFIED]

The tail's frequencies are `a/e` with `e | W`. Every one of them is a multiple of
`1/W`, so the spacing is `delta = 1/W` and the large sieve delivers
`sum |S_H(a/e)|^2 <= (H + W) H` where Parseval delivers the exact `H(W - H)`.
S7: the ratio `(H+W)H / H(W-H)` is **1.053333, 1.008427, 1.000776, 1.000053** at
`z = 13..23`.

**Reading 10.** The large sieve on this frequency set *is* the mean square, to
four decimal places by `z = 23`. Since the mean-square Lemma V is already proved
unconditionally (`attack-AB-bounded.md` reading 2), **the large sieve can add
nothing here**: it is a mean-square inequality and the mean square is not the
missing input. Verified in the other direction too — the exact spectral sum
`sum_{j=1}^{W-1} |S_H(j/W)|^2` reproduces `H(W-H)` to 5.61e-15, 1.04e-14,
2.43e-14 at `z = 13, 17, 19`.

### 5.2 Divisor switching on the tail — NOT VOID, BUT BOUNDED [MEASURED]

The switch `d1 <-> d2` acts on attack 1's split `(e1,e2) = (gcd(e,d1), e/gcd(e,d1))`
by exchanging the two factors, and it preserves the tail (the condition `e not| m`
is a condition on `q = [d1,d2]`, which is symmetric). So the switch is available
on the tail — the question is whether there is any asymmetry to exploit. S7(b),
tail records only:

| `z` | pairs | max asymmetry | mean asymmetry | best-case `Vabs` ratio | best-case `B` ratio |
|---|---|---|---|---|---|
| 13 | 74 | 1.000000 | 0.486486 | 0.750000 | 0.500000 |
| 17 | 210 | 1.000000 | 0.514286 | 0.761039 | 0.504193 |
| 19 | 497 | 1.000000 | 0.509054 | 0.771219 | 0.532869 |
| 23 | 918 | 1.000000 | 0.522876 | 0.772904 | 0.533965 |
| 29 | 1600 | 1.000000 | 0.517750 | 0.805011 | 0.536009 |

**Reading 11.** The certificate is genuinely asymmetric under the switch — mean
relative asymmetry 0.49 to 0.52, and pairs with `V(e2,e1) = 0` against
`V(e1,e2) != 0` exist at every level (max asymmetry 1.000000). So divisor
switching is **not** ruled out by symmetry, which was the first thing worth
knowing.

**Reading 12.** But its ceiling is a constant. Adding the two orderings
coherently *before* the absolute value — the most any rearrangement can give —
takes `sum_e e Vabs(e)^2` to **0.500, 0.504, 0.533, 0.534, 0.536** of itself over
`z = 13..29`. **A factor of about 2, and rising towards 1 rather than falling.**
Against a deficit that is a growing power of `z` (reading 8), a bounded
rearrangement is not a route. Class: mean-value, tractable, and worth a constant.

### 5.3 Second moment + Chebyshev + integrality, run per class — THE REAL ONE

`attack-DP1-mechanism.md` §6 is [PROVEN]: over a finite period the count of bad
positions is a non-negative integer, so a failure count below one forces it to
zero. **The split sharpens the mechanism.** `T_m` has mean zero on every class
mod `m` (§1.1 (L-a)) and a class holds only `W/m` positions, so the test runs per
class and pays `sqrt(W/m)` where the global version pays `sqrt(W)`:

```
  Need_k(c) := ( sum_{y = c mod m} T(y)^{2k} )^{1/2k}  <  H*M + Phi_m(c)
```

for every class `c`, with `k = 1` the Chebyshev case.

**Reading 13, and it is a demotion the corpus should record.** For a **supremum**
target the integrality dressing adds nothing: Chebyshev-plus-integrality at a
single threshold gives exactly `|T(y)| <= (sum_{y' = c} T(y')^{2k})^{1/2k}`, which
is the `l^{2k} -> l^inf` inequality on the class and holds term by term. The DP1
mechanism's power is in driving an exceptional **count** below one, and a count
of one is what a supremum already is. **[INFERRED]** So what follows is the
`l^{2k}` bound, honestly labelled; the integrality step is the reason it is
allowed, not a source of strength.

S5(a), at `H = nP`, with `Phi_m` used exactly (`k*` is the smallest moment order
in 1..3 that closes; `m = W` is the exhaustive identity, not a bound):

```
  z=23   m        W/m       H*M     max_c(Need_1-Phi)   k=2       k=3      k*
        2310      4199    8.8157         115.5061    18.9218   11.7024   >3
       30030       323    8.8157          32.0034    11.4513    9.3650   >3
      510510        19    8.8157          10.3973     8.5434    8.2203    2
     9699690         1    8.8157           7.8157     7.8157    7.8157    1
```

**Reading 14.** The moment order required is a function of the cut and diverges
as the cut narrows: at `z = 23` the fourth moment closes at `m = 510510`
(`8.5434 < 8.8157`), and nothing in `k <= 3` closes at `m = 30030` or below. The
`k -> inf` limit is `sup|R| = 7.816`, as it must be. **This is the moment ladder
of `lemmaV-parseval.js` S4 in a new variable: the split trades moment order
against cut, and the cheap end of one is the expensive end of the other.**

**Reading 15 — the one genuine gain.** The fully proven chain, with no
exhaustive input anywhere (head by absolute values per §1.1 (L-c), tail by the
per-class `l^2` bound),

```
  sup_x |R_H|  <=  Bd(m)  :=  SsupH(m,H)  +  max_c sqrt( sum_{y = c mod m} T(y)^2 )
```

beats the pure absolute-value bound `Ssup(H)` at every level. S5(b), `H = nP`:
`Bd/Ssup` = **0.6157** (best cut 210), **0.5249** (2310), **0.5138** (2310),
**0.4722** (30030) at `z = 13, 17, 19, 23`, against true `sup|R|` of 2.649,
4.920, 6.840, 7.816. **A factor 1.6 to 2.1 on the constant, improving with `z`.**

**Reading 16 — and in exponent, it beats `u_sup`.** S5(c):

| `z` | `u_true` | `u_sup` | `u_int` | best `m` | `theta(z)/(2 ln z)` | `u_int - theta/(2 ln z)` |
|---|---|---|---|---|---|---|
| 13 | 1.5963 | 2.0617 | 1.9612 | 210 | 1.5098 | 0.4514 |
| 17 | 1.7070 | 2.3036 | 2.0985 | 2310 | 1.8195 | 0.2790 |
| 19 | 1.7960 | 2.5518 | 2.3501 | 30030 | 2.2319 | 0.1182 |
| 23 | 1.7710 | 2.6666 | 2.4769 | 510510 | 2.5654 | -0.0885 |

`u_int` is below `u_sup` by **0.1005, 0.2051, 0.2017, 0.1897** at the four levels.
**This is the first thing in this campaign to beat the Fourier absolute-value
bound at a worst position, and it is unconditional.**

**Reading 17 — and it dies on the almost-all law.** `u_int - theta(z)/(2 ln z)`
falls monotonically, 0.4514, 0.2790, 0.1182, **-0.0885**: `u_int` is
`theta(z)/(2 ln z) + O(1)`, and `theta(z)/(2 ln z)` diverges like `z/(2 ln z)`.
That is precisely the `u_1` curve `sift-limit-attack.md` §7e already prices
("`u_1 = theta(z)/(2 ln z) + 1.45`, the gap diverging like `z/(2 ln z)`").
**The per-class `l^2` route is `u_1` with a better constant, not a new route.**
The mechanism is visible in the table: the best cut grows like `W/p_max` rather
than like the balance point `sqrt(W)` (210 against 48, 510510 against 3114),
because `SsupH` is much tighter than its Cauchy–Schwarz relaxation — but the
`sqrt(W/m)` the tail pays is still exponential in `theta(z) - theta(y)`.

---

## 6. THE `tau(m)` SUBSTITUTION, CHECKED RATHER THAN INHERITED — [VERIFIED]

`attack-theta-last-gap.md` §6 (C1) states that all the `x`-dependence sits in one
factor `e(-hx/m)`, so the quantifier is separable and its price is `tau(m)`, not
`C^{pi(z)}`. `sift-limit-attack.md` §7e carries it as "materially cheaper... still
a wall". The brief asked me to check the substitution myself. **It is right, and
the corpus understates it.**

The two prices are combinatorial factors and can be compared exactly.

- `C^{pi(z)}`: the `e`-basis absolute-value step runs over the divisors of
  `P(z)`, `2^{pi(z)}` of them. S6(a) re-derives the per-prime factor from an
  independent invocation: `Ssat` ratios **2.5668, 2.3863, 2.0198, 2.1572,
  1.8211, 2.7006** over `z = 13..37`. (The first four reproduce
  `attack-AB-bounded.md` §4.5's 2.5668 / 2.3863 / 2.0198 / 2.1572 exactly; the
  last two are new here and the `z = 37` step is the largest in the ladder.)
- `tau(m)`: in the `(h,m)` basis `m = [d1,d2] <= D^2 = z^{2s}` is an **integer**,
  so `omega(m) <= Omega(z,s) := max{k : p_1...p_k <= z^{2s}}` and
  `max tau(m) = 2^Omega`. **`Omega` is governed by `ln m`, not by `z`.**

S6(b), at `s = 3.0`, in window-exponent currency `u_price = ln(price)/ln z`.
**Units, stated because they are exactly the kind that has cost this corpus
waves: `pi(z)` here is the SIEVE prime count `#{p < z}`, matching
`rosserSupport()`, one less than `#{p <= z}` at every prime `z`.**

| `z` | `pi(z)` | `Omega` | `u_tau` | `u_C` at `C = 2.05` |
|---|---|---|---|---|
| 13 | 5 | 7 | 1.8917 | 1.399e+0 |
| 43 | 13 | 9 | 1.6586 | 2.481e+0 |
| 1009 | 168 | 15 | 1.5032 | 1.744e+1 |
| 1000003 | 78498 | 24 | 1.2041 | 4.079e+3 |
| 1e12 | 37501010277 | 41 | 1.0285 | 9.743e+8 |

**Reading 18.** `u_C` **diverges** — `pi(z) ln C / ln z ~ z ln C / ln^2 z` — while
`u_tau` is **bounded and slowly decaying**, `Omega ln 2/ln z`, falling from 1.8917
to 1.0285 across eleven orders of magnitude in `z`. **The substitution converts a
divergent window-exponent cost into a bounded one.** That is a stronger statement
than "materially cheaper" and it should replace the §7e wording.

### 6.1 The objection this has to survive, and it does

There is an obvious kill: **if `m` may be `P(z)` itself then `tau(m) = 2^{pi(z)}`
is the same number and the substitution is cosmetic.** (Attack 10's red team of
this same wave, `research/redteam-tau-and-split.js` §A, evaluates exactly there
and reports "at `m = P(z)` the two prices are the SAME NUMBER".) That evaluation
point is outside the object. `m = [d1,d2]` with `d1, d2 <= D = z^s`, so
`m <= D^2` and `P(z)` is an admissible `m` only while `theta(z) <= 2 s ln z`.
S6(b2):

| `z` | `theta(z) = ln P(z)` | `ln(D^2) = 2 s ln z` | `P(z)/D^2` | `Omega` vs `pi(z)` |
|---|---|---|---|---|
| 13 | 7.7450 | 15.3897 | 4.786e-4 | 7 vs 5 |
| 23 | 16.0876 | 18.8130 | 6.552e-2 | 8 vs 8 |
| 43 | 33.3489 | 22.5672 | 4.813e+4 | 9 vs 13 |
| 101 | 83.7284 | 27.6907 | 2.172e+24 | 11 vs 25 |
| 1009 | 956.2453 | 41.5003 | infinite | 15 vs 168 |
| 100003 | 99685.3893 | 69.0777 | infinite | 21 vs 9592 |

**Reading 19.** Stated exactly, because the boundary matters: `m` is `z`-smooth,
so `omega(m) <= min(Omega, pi(z))`, and the two caps **cross at `z = 23`**, where
both read 8 and `P(z)/D^2 = 6.552e-2` — `P(z)` is still just admissible there.
By `z = 43` it is not: `P(z)/D^2 = 4.813e+4`, the worst admissible `m` is four
orders of magnitude below `P(z)`, and the cap is `Omega = 9` against
`pi(z) = 13`. At `z = 100003` it is **21 against 9592**. **So the objection is
right about `m = P(z)` and right only up to `z = 23`; beyond that `m = P(z)` is
not in the sum.** The substitution is real for the reason the corpus gave, and
its size is governed by `ln m` against `theta(z)` — a comparison nothing in the
corpus had made.

**Reading 20.** The crossover is early and invisible: S6(c) puts the first integer
`z` with `2^Omega < C^{pi(z)}` at **`z = 20`** for the measured `C = 2.05`,
`z = 24` for `C = 2.00`, `z = 62` for `C = 1.50`. So the substitution is winning
throughout this repository's computable range while being far too small there to
be seen.

**Reading 21 — and it is not free.** S6(d): the `e` basis has `2^{pi(z)}` moduli,
exponent `pi(z) ln 2/ln z` = 1.3512, 1.7685, 2.3958, 3.7548, 16.8358, 92.4844 at
`z = 13, 23, 43, 101, 1009, 10007`; the `tau` basis has about `z^{2s}` moduli,
exponent **6.0000 flat**. The `tau` basis is more expensive on modulus count below
`z ~ 200` and enormously cheaper above. **[INFERRED]** Net: the substitution
replaces one divergent factor with a bounded one and one bounded factor with a
larger bounded one, so it is a genuine strengthening — but the total price in the
`(h,m)` basis depends on the weights `w_i/q_i` attached to each `m`, which this
file does not compute, and no claim is made about the total here.

---

## 7. THE RESIDUE, PRICED AND CLASSIFIED

What is left, stated as the brief's step 4 asks.

**The missing input.** A bound `sup_x |T_m(x)| <= lambda * rms(T_m)` for the tail
alone, at the widest available cut, with `lambda` growing no faster than
`z^{1.88}` (reading 8). **Class: MAXIMAL — this project's wall.** It is not a
smaller ask than the general one: by reading 4 the tail carries 99.65% of the
mean square at `z = 37` and by reading 3 it is the half that carries all the
`z`-dependence of the sup/rms ratio.

**How slack the ask is.** `lam_req / sqrt(2 ln W) = 2.35e3` at `z = 37`
(reading 6). A Gaussian maximal law for the tail closes the certificate with a
margin diverging like `z^{1.30}`. Any maximal inequality losing less than
`z^{1.88}` over the `l^2` scale suffices. This is the same message as
`attack-theta-last-gap.md` §6 (C2) reached from the `theta_total` side, arrived
at independently and in the split's variables.

**What is now measured to be worth only a constant, and should not be spent
again.**

| route | what it buys | class |
|---|---|---|
| a fixed cut, head treated perfectly | **1.0039x** at `z = 37` (reading 4) | mean-value |
| the widest cut, head treated perfectly | 2.3245x at `z = 37`, rising slowly (reading 5) | mean-value |
| the large sieve on tail moduli | **1.000053x** — it is Parseval (reading 10) | mean-value, void |
| divisor switching on the tail | **~2x, flat in `z`** (reading 12) | mean-value |
| per-class `l^2` (Chebyshev + integrality) | 2.1x, and `u_int` beats `u_sup` by ~0.2 — then lands on `theta(z)/(2 ln z)` (readings 15-17) | mean-value |
| the `tau(m)` basis for the quantifier | a divergent exponent becomes bounded (readings 18-19) | structural |

**What remains genuinely open, and is the one thing this file did not price.**
`u_int` beats `u_sup` at every computable level (reading 16) and the two die on
*different* laws — `u_sup` on `C^{pi(z)}` in the `e` basis, `u_int` on
`sqrt(W/m)`. Readings 18-19 say the first of those two laws is an artefact of the
basis. **Nobody has computed the `u_sup` ladder in the `tau` basis.** If the
`e`-basis divergence is basis-dependent and the `(h,m)`-basis price is bounded,
the `u_sup` closure recorded in `sift-limit-attack.md` §7e is a closure of a
*representation* and not of a route. That is the next measurement, and it is
mean-value work throughout: it needs the weights `sum_m |K_h(m)| w`, no
quantifier over `x`, and no maximal inequality anywhere.

---

## 8. DRAFT `CHANGELOG.md` ENTRY (for the adjudicator to apply; I have edited nothing)

> **2026-08-18/19 — the tail split, priced.** `research/attack-tail-maximal.js`,
> report `history/staging/attack-tail-maximal.md`.
>
> - `attack-AB-bounded.md` §4.4's "the retained part is not a maximal problem" is
>   **upgraded from measurement to theorem and simultaneously narrowed**: the head
>   is the conditional mean of `R_H` on `x mod m`, carries `m-1` frequencies, and
>   Cauchy–Schwarz bounds its supremum with no quantifier at all. The flatness is a
>   property of the fixed cut, not of the sieve. `lam_head` reaches 4.1321 once the
>   cut is widened.
> - **The tail is measured maximal and saturates the Gaussian law**:
>   `sup|T|/rms(T)` = 2.3142, 2.9410, 3.7037, 4.1244 at `z = 13..23` and
>   `lam_tail/sqrt(2 ln W)` rises 0.588 to 0.727. §4.4's conclusion "the wall is
>   entirely in the tail" stands; "so the tail is a smaller ask" does not.
> - **At a fixed cut the split buys 1.0039x by `z = 37`**; the tail's share of the
>   mean square is 0.99654 there.
> - **NEW UNCONDITIONAL BOUND, and it beats `u_sup`**: head by absolute values plus
>   tail by the per-class `l^2` bound gives `u_int` = 1.9612, 2.0985, 2.3501,
>   2.4769 at `z = 13..23` against `u_sup` = 2.0617, 2.3036, 2.5518, 2.6666.
>   It then lands on `theta(z)/(2 ln z)` (residual 0.4514 -> -0.0885) and diverges,
>   i.e. it is §7e's `u_1` with a better constant.
> - **`attack-DP1-mechanism.md` §6 demoted for THIS use**: for a supremum target,
>   Chebyshev-plus-integrality at one threshold is exactly `l^{2k} -> l^inf` on the
>   class. Its strength is against counts and densities, not against maxima.
> - **The large sieve on the tail moduli is void**: `(H+W)H / H(W-H)` = 1.000053 at
>   `z = 23`. It is the mean square, which is already proved.
> - **Divisor switching on the tail is available but bounded**: the certificate is
>   asymmetric (mean relative asymmetry 0.49–0.52) and the best case takes `B` to
>   0.500–0.536 of itself, flat in `z`.
> - **`sift-limit-attack.md` §7e's `tau(m)` sentence should be strengthened.** The
>   substitution converts a *divergent* window-exponent cost `pi(z) ln C/ln z`
>   (1.399 at `z = 13`, 9.743e8 at `z = 1e12`) into a *bounded and decaying* one
>   `Omega ln 2/ln z` (1.8917 to 1.0285 over the same range), because `omega(m)` is
>   governed by `ln m` and not by `z`. The natural objection — at `m = P(z)`,
>   `tau(m) = 2^{pi(z)}` and the two are the same number — is answered by the range
>   of `m`: `m = [d1,d2] <= D^2 = z^{2s}`, and `P(z)/D^2` = 6.552e-2, 4.813e+4,
>   2.172e+24 at `z = 23, 43, 101`, so the caps cross at `z = 23` (both 8), `P(z)`
>   leaves the admissible set just above it, and the `omega` cap parts from
>   `pi(z)` (9 against 13 at `z = 43`, 21 against 9592 at `z = 100003`). Crossover
>   `z = 20` at the measured `C = 2.05`. The `tau` basis pays a larger modulus
>   count (`z^{2s}`, exponent 6.0000 flat) below `z ~ 200`.
> - **Open, and named as the next measurement**: the `u_sup` ladder has never been
>   computed in the `(h,m)` basis. Its `e`-basis divergence is driven by
>   `C^{pi(z)}`, which the previous item shows is basis-dependent.
