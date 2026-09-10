# Attack 1 of 5 on the upper bound: Lemma V by Parseval

<!-- ledger
id: Q-lemmaV-meansquare
status: PARTIAL
todo: none
question: Does the mean-square-in-x form of Lemma V hold, and what does the proof cost?
verdict: Proved unconditionally, <R^2>_H <= B(z,s)*H for every H, z and level s, and the proof stops at exactly one place, B(z,s) bounded: B(z,3.0) measures 1.3833 to 1.4883 at z = 13..37, flat to 8 per cent over the whole computable range, which is a measurement and not a bound.
-->

Brief: section 6 item (i) of `research/sift-limit-attack.md`, the
mean-square-in-x form of Lemma V. Script: `research/lemmaV-parseval.js` (new).
No repository file was edited, nothing was committed, nothing was pushed.

---

## THE FOUR DELIVERABLES, COMPRESSED

**1. The mean-square Lemma V is proved.** Not measured: proved, by a chain of
four identities and two triangle inequalities, all unconditional.

```
    <R^2>_H  <=  B(z,s) * H          for every H, every z, every level s,
    B(z,s)   =  sum_{e | P(z), e>1}  e * Vabs(e)^2,
    Vabs(e)  =  sum_{e1 e2 = e} | V(e1,e2) |,
    V(e1,e2) =  sum over certificate terms with e | q, gcd(e,d1) = e1  of  w/q.
```

`B(z,3.0)` measures **1.3833, 1.4214, 1.4348, 1.4503, 1.4660, 1.4764, 1.4883**
at z = 13, 17, 19, 23, 29, 31, 37: flat to 8 percent over the whole computable
range, drifting 0.10 per unit `ln z`. Over `s` from 2.0 to 3.4 it stays inside
[1.27, 1.68]. **The proof stops at exactly one place: `B(z,s)` bounded (or
polylog) as z grows.** That is a character-free mean-value estimate for signed
Rosser weights. It is not a maximal inequality and it does not quantify over
positions.

**2. The almost-all exponent is 0, and it is worth nothing.** Chebyshev needs
`H > B/(eta M^2)`, and `B/M^2` is polylog (`~ log^4 z`, measured 443 to 1725
across z = 13 to 31). So `u_aa(eta) = (4 lnln z + ln(1/eta) + O(1))/ln z -> 0`:
every positive exponent holds for almost all positions, at a window that is not
a power of z at all. The quantifier is a density statement about one period.
`G2` is the maximum over that period, so it is decided entirely by the set this
argument discards. The elementary second moment already owns the same almost-all
fact and owns it about 1.4x more cheaply at every point brute force can reach,
though it scales worse in H and is overtaken near H ~ 4e4 at z = 19
(`research/history/MORNING-2026-08-16.md`:73-84, which states both halves).

**3. The number, and it is not the one I expected.** The mean square used at
full strength (exact `<R^2>`, Chebyshev, union bound over the W = P(z)
positions) gives an all-positions exponent

```
    u_1(z) = theta(z)/(2 ln z) + c(z),   c = 1.339, 1.387, 1.437, 1.498, 1.522 (FLAT)
    u_1    = 2.8489, 3.2063, 3.6686, 4.0634, 4.3767   at z = 13, 17, 19, 23, 29
    u_true = 1.5963, 1.7070, 1.7960, 1.7710, 1.7718   (exhaustive, nP of S0(b))
    gap    = 1.2527, 1.4993, 1.8725, 2.2924, 2.6049   units of window exponent
```

**The gap is `theta(z)/(2 ln z) - 1.45` and it diverges like `z/(2 ln z)`.**
Priced in moment order, which is the currency a proof is actually paid in: the
2k-th moment buys `lambda_k = (W m_2k)^{1/2k}`, and the order needed is
`k = 2, 2, 3, 3, 3` for the vector-sieve target and `k = 3, 4, 6, 7, 7` for
exponent 2, at z = 13, 17, 19, 23, 29. The order needed to reach `beta_2` is
`k ~ theta(z)/(2 ln z (beta_2 - 1.45))`, which reads 0.54, 0.65, 0.79, 0.91,
1.01 across those levels: **up to z = 23 the second moment alone already clears
`beta_2` (u_1 = 4.06 there), from z = 29 on it does not (u_1 = 4.38), and the
required order grows without bound.** That finite-window win is a
soundness check firing, not progress, and section 4 says so at length.

**4. Pilot: complete periods, every position.** Custody reproduces the
`theta-ladder.md` correction box exactly (nP = 60/126/198/258 and the tightness
ratios 0.5634/0.7279/0.9215/0.7935, four digits). Chebyshev's predicted
exceptional density is checked against the exact density at every position of
the period, at 20 (z, H) pairs; it over-predicts by 2.3x to 21.6x, never
under-predicts.

**AND ONE THING THE BRIEF DID NOT ASK FOR, WHICH MAY BE WORTH MORE THAN ITEMS 1
TO 3.** The same identity that makes Parseval work gives an UNCONDITIONAL
worst-position bound with no maximal law in it:

```
    sup_x |R_H(x)| <= Ssup(H) := sum_{e>1} sum*_a |Theta_e(a)| |S_H(a/e)|,
    u_sup = 2.0617, 2.3036, 2.5518, 2.6666   at z = 13, 17, 19, 23,
    against the exhaustive truth u_true = 1.5963, 1.7070, 1.7960, 1.7710.
```

It takes absolute values in the FOURIER variables, where the sieve's own
cancellation is already inside `Theta_e(a)`, rather than in the divisor-pair
variables, where taking them destroys it. The change of basis is worth a flat
factor of **74, 79, 79, 81**, and the resulting bound is within **4.3x, 5.8x,
8.8x, 15.1x** of the true supremum. Attack 2's absolute-value ceiling is
therefore a ceiling on the representation, not on the problem. See section 5,
including why this is not yet a theorem and what would make it one.

---

## 0. CUSTODY

All three reproductions use the repository's own
`research/sift-limit-lemmaV.js`, imported and not recopied, so custody runs back
through it to the 2026-08-14 pilot.

```
(a) meanSquare() closed form against brute force over the FULL period
    z=13 H= 60 : brute 1.4276943835   closed 1.4276943835   rel 2.6e-15
    z=17 H=126 : brute 2.2157558991   closed 2.2157558991   rel 1.4e-13

(b) the thresholds of the theta-ladder.md:408 CORRECTION BOX
    (research/history/staging/phase1-T4-maximal-law.md sec.4), s = 3.0:
    z=13 : min_x T = 0 at H = 59  (2 bad positions),  = 1 at H = 60   -> nP =  60
    z=17 : min_x T = 0 at H = 125 (3 bad positions),  = 1 at H = 126  -> nP = 126
    z=19 : min_x T = 0 at H = 197 (2 bad positions),  = 1 at H = 198  -> nP = 198
    z=23 : min_x T = 0 at H = 257 (2 bad positions),  = 1 at H = 258  -> nP = 258
    T4 reports 60 / 126 / 198 / 258. CONFIRMED at all four, exhaustively.

(c) T4 sec.4 law tightness sup / (rms * sqrt(2 lnW)) at the operative window
    T4:       0.5634 / 0.7279 / 0.9215 / 0.7935   at z = 13 / 17 / 19 / 23
    measured: 0.5634 / 0.7279 / 0.9215 / 0.7935
```

I used the correction box and never section 5b's numbers.
`research/theta-ladder-sup.js`:18 was read directly
(`const z=Number(process.argv[2]), u=3.2, s=3.0;`); the defect is real and I did
not run that script.

---

## 1. THE CHAIN, WITH PROOFS

Notation. `z >= 3`, `D = z^s`, `W = P(z) = prod_{p<z} p`. `S+`, `S-` are the
Rosser-Iwaniec supports at level D with `lambda^± = mu` on them. The
Brüdern-Fouvry pointwise minorant and its window sum:

```
    c(y) = Lm(y)Lp(y+2) + Lp(y)Lm(y+2) - Lp(y)Lp(y+2),
    T(x) = sum_{x < r <= x+H} c(r)  =  H M + R(x).
```

Expanding both factors, `c(y) = sum_i w_i 1_{y = c_i mod q_i}`, the index i
running over (block, d1, d2) with `gcd(d1,d2) | 2`, `w_i in {+-1}`,
`q_i = [d1,d2]`, `c_i = CRT(0 mod d1, -2 mod d2)`; `M = sum_i w_i/q_i`.

**L1 (window-sum form).** `R(x) = sum_{m=1}^{H} (c(x+m) - M)`. Immediate.
Trivial, and it is the step that makes everything else classical: R is a
windowed sum of a fixed periodic function, so its mean square is that
function's autocovariance against a Fejér kernel.

**L2 (autocovariance).** With `K(v) = <c(y)c(y+v)>_y - M^2`,

```
    <R^2>_H = sum_{|v|<H} (H-|v|) K(v),
    K(v) = sum_{i,j} w_i w_j [ g 1_{v = delta mod g} - 1 ]/(q_i q_j),
    g = gcd(q_i,q_j),  delta = (c_j - c_i) mod g.
```

Verified exactly at z = 13, s = 2.2, H = 40: `<R^2>` over the full period is
1.1906373569 and the autocovariance sum is 1.1906373569.

**L3 (Parseval over the period).** With
`Theta_e(a) = sum_{i : e|q_i} (w_i/q_i) e(-a c_i/e)`,

```
    K(v)    = sum_{e|P(z), e>1} sum*_{a mod e} |Theta_e(a)|^2 e(av/e),
    <R^2>_H = sum_{e|P(z), e>1} sum*_{a mod e} |Theta_e(a)|^2 F_H(a/e),
    F_H(t)  = |sum_{m<=H} e(mt)|^2 = sin^2(pi H t)/sin^2(pi t).
```

Proof: `g 1_{g|n} = sum_{e|g} c_e(n)` (Ramanujan), `c_e(n) = sum*_a e(an/e)`,
and `sum_{|v|<H}(H-|v|)e(av/e) = F_H(a/e)`. This is the corpus's S3 spectral
form re-derived from the autocovariance instead of by resumming the sawtooth
Fourier series. Verified against `meanSquare()` at rel 4.7e-16, 5.6e-14,
1.3e-13 at z = 13, 17, 19.

**L4 (exact Fejér mass), which proves (V1) and (V2).** For `e >= 2`, `H >= 1`,
`h = H mod e`:

```
    sum_{a mod e, a != 0} F_H(a/e)  =  h(e-h)      EXACTLY.
```

Proof. `sum_{a mod e} F_H(a/e) = e * #{(m,n) in [1,H]^2 : e | m-n}`. Writing
`H = Qe+h`, the count is `h(Q+1)^2 + (e-h)Q^2 = eQ^2 + 2hQ + h`, so the full
sum is `e^2Q^2 + 2ehQ + eh`; subtracting the `a=0` term `H^2 = (Qe+h)^2` leaves
`eh - h^2`. Checked to 1.5e-12 over all `e <= 30`, `H <= 40`.

Corollary. The per-pair quantity `Psi(g,delta,H)` that
`sift-limit-lemmaV.js` builds from `Pg(d) = dbar(g-dbar)/2` is exactly
`sum_{a != 0 mod g} F_H(a/g) e(-a delta/g)`. Hence

* `|Psi| <= Psi(g,0) = h(g-h)`, equality iff `delta = 0`. That is **(V2) with
  its equality case**, which the repository asserts and checks but does not prove.
* `g | H => h = 0 => Psi = 0`. That is **(V1)**.

Both from one elementary count.

**Theorem B (the phase factorises; the Kloosterman phase is present but short).**
For `e | q_i`, put `e1 = gcd(e,d1)`, `e2 = e/e1`. Since e is squarefree and each
prime of e divides d1 or d2, `c_i = 0 mod e1` and `c_i = -2 mod e2`, so `c_i mod
e` depends on i only through `(e1,e2)`, and

```
    c_i/e = -2 * inverse(e1) / e2   (mod 1),
    Theta_e(a) = sum_{e1 e2 = e} e(2a inverse(e1)/e2) V(e1,e2),
    V(e1,e2)   = sum_{i : e|q_i, gcd(e,d1)=e1} w_i/q_i,
    Theta*(e) := max_{(a,e)=1}|Theta_e(a)|  <=  Vabs(e) = sum_{e1e2=e}|V(e1,e2)|.
```

Verified: max over all (e,a) of `|Theta_e(a) - factorised|` is 3.4e-15 at
z = 13, 17, 19. `V(e1,e2)` carries no additive character at all.

**Theorem A (the mean-square Lemma V).** From L3, L4 and B, for every H:

```
    <R^2>_H  <=  sum_{e>1} Theta*(e)^2 h_e(e-h_e)          (A)
             <=  sum_{e>1} Vabs(e)^2  h_e(e-h_e)           (B)
             <=  H * sum_{e>1} e Vabs(e)^2  =  B(z,s) H.   (C)
```

`(A)` is `sum*_a <= sum_{a != 0}` plus L4; `(B)` is Theorem B's triangle
inequality; `(C)` is `h(e-h) <= He`. All unconditional.

**L5 (the pointwise expansion), which splits the problem in two.**

```
    R(x) = sum_{e|P(z), e>1} sum*_{a mod e} Theta_e(a) S_H(a/e) e(a x/e),
    S_H(t) = sum_{m<=H} e(mt).
```

Proof: `1_{q|n} - 1/q = (1/q) sum_{e|q,e>1} sum*_a e(an/e)`, applied to
`Delta_i(x) = sum_{m=1..H}(1_{q_i | x+m-c_i} - 1/q_i)`. Verified to 7e-15 and
1.7e-14 against direct evaluation at ten positions, z = 13 and 17.

**The window position enters only through the unimodular phase `e(ax/e)`.**
That is the whole geography of the problem in one line, and section 6 spends it.

**Where the proof of the mean-square Lemma V stops, precisely.** At
`B(z,s) = O(1)`, or anything up to `O(log^A z)`. Unpacking:
`e Vabs(e)^2 = 4^{omega(e)} (e Vabs(e)/2^{omega(e)})^2 / e` and
`sum_{e|P(z)} 4^{omega(e)}/e = prod_{p<z}(1+4/p) ~ C log^4 z`, so what is needed
is that the normalised profile `e Vabs(e)/2^{omega(e)}` is `O(1/log^2 z)`, the
size of the sieve main term M itself. `V(e1,e2)` is a signed sum of Rosser
weights over a sublattice of divisor pairs with no exponential factor in it.
Bounding it uniformly in `(e1,e2)` is the two-dimensional analogue of the
mean-value estimates Iwaniec 1980 proves for the one-class linear sieve.

---

## 2. THE BOUND MEASURED, AND WHAT EACH STEP COSTS

s = 3.0, two windows per level: `H = round(z^2/2)` (the operative scale) and
`H = z^2` (the zone budget).

```
  z    s   H     N       truth      /H        A        A/tr    Bnd      B/tr    B(z,s)   C/tr    sharp/tr
  13 3    85    852  1.811e+0 2.130e-2 5.709e+0    3.15 3.463e+1    19.1 1.3833    64.9  7.60e+3
  13 3   169    852  1.161e+0 6.871e-3 6.096e+0    5.25 3.551e+1    30.6 1.3833   201.3  1.25e+4
  17 3   145   2236  2.136e+0 1.473e-2 1.816e+1    8.50 7.603e+1    35.6 1.4214    96.5  1.99e+4
  17 3   289   2236  3.013e+0 1.043e-2 2.533e+1    8.41 1.009e+2    33.5 1.4214   136.3  1.63e+4
  19 3   181   4764  2.138e+0 1.181e-2 2.589e+1   12.11 1.034e+2    48.4 1.4348   121.5  3.85e+4
  19 3   361   4764  4.217e+0 1.168e-2 3.714e+1    8.81 1.430e+2    33.9 1.4348   122.8  2.30e+4
  23 3   265   9636  3.144e+0 1.187e-2 3.658e+1   11.63 1.573e+2    50.0 1.4503   122.2  5.27e+4
  23 3   529   9636  5.049e+0 9.545e-3 5.278e+1   10.45 2.248e+2    44.5 1.4503   151.9  3.91e+4
  29 3   421  20700  4.802e+0 1.141e-2   --     --   2.628e+2    54.7 1.4660   128.5  7.36e+4
  29 3   841  20700  6.769e+0 8.049e-3   --     --   4.097e+2    60.5 1.4660   182.1  6.55e+4

  B(z,s) against the level s:
  z     s=2.0     s=2.6     s=3.0     s=3.4
  13    1.2728    1.3392    1.3833    1.3968
  17    1.4032    1.3903    1.4214    1.4279
  19    1.4426    1.4469    1.4348    1.4460
  23    1.5834    1.4815    1.4503    1.4667
  29    1.6718    1.4794    1.4660    1.4771
  31    1.6847    1.4886    1.4764    1.4837
  37    1.6443    1.5389    1.4883    1.4916
```

**(a) `B(z,s)` is flat.** 1.3833 to 1.4883 over z = 13 to 37, drift 0.10 per
unit `ln z` across a range in which its natural competitor `prod(1+4/p)` moves
by a factor 2.7. Over s it stays in [1.27, 1.68]. Six levels of z and four of s
is a short range; I report a band and a drift, not a limit.

**(b) Going through the spectrum is worth three orders of magnitude.** The
repository's absolute-value accounting, `sharpBound = sum |w w| |Psi|/(q q)`, is
7.6e3 times the truth at z = 13 and 7.4e4 at z = 29, RISING. Corollary C is 65
to 201 times the truth with NO trend. The absolute-value route destroys the
sign structure of the weights; `Theta_e(a)` keeps it.

**(c) The three steps cost about 3 to 12, about 5, and about 3.** Theorem A
with the exact `Theta*` is 3.15 to 12.11 times the truth (the `max_a` step);
Theorem B's triangle inequality over the `2^omega(e)` factorisations costs a
further ~5; `h(e-h) <= He` a further 2 to 3.

**(d) Against Lemma V's literal ask.** `sift-limit-attack.md` sec.4.5 asks for
`R << H/log^3 H`. The proved bound gives `rms|R| <= sqrt(BH) ~ 1.21 sqrt(H)`, so
the ratio to `H/log^3 H` is `1.21 log^3 H/sqrt(H) -> 0`. At the operative window
it has not got there: at z = 29, H = 390 the bound is 13.0 times `H/log^3 H`
while the true rms is 1.18 times it. The asymptotic mean-square Lemma V holds
with room; toy scales cannot show it.

---

## 3. THE ALMOST-ALL EXPONENT, AND ITS QUANTIFIER

```
    density{ x mod W : T(x) <= 0 }  <=  <R^2>_H/(HM)^2  <=  B/(H M^2),
    so  T(x) > 0 at all but eta of positions once  H > B/(eta M^2).

  z    M          B(z,3)   B/M^2      u_aa(1/2)  u_aa(1/100)  | C=<R^2>/H  C/M^2  u_true(1/2)
  13  5.5844e-2  1.3833  4.436e+2     2.6464     4.1716       | 6.871e-3    2.20   0.5782
  17  4.6986e-2  1.4214  6.438e+2     2.5274     3.9081       | 1.043e-2    4.72   0.7926
  19  3.9598e-2  1.4348  9.150e+2     2.5513     3.8799       | 1.168e-2    7.45   0.9175
  23  3.4169e-2  1.4503  1.242e+3     2.4933     3.7410       | 9.545e-3    8.18   0.8912
  29  3.1843e-2  1.4660  1.446e+3     2.3668     3.5285       | 8.049e-3    7.94   0.8211
  31  2.9253e-2  1.4764  1.725e+3     2.3723     3.5115       | 8.722e-3   10.19   0.8779
```

`B/M^2 ~ log^4 z`, so `u_aa(eta) = (4 lnln z + ln(1/eta) + O(1))/ln z -> 0`.
**The almost-all window is polylogarithmic in z, not a power.** The decay is
`4 lnln z/ln z`, which is slow: with the proven constant the column reads 2.65
down to 2.37 across z = 13 to 31 and would reach 1.0 only near z = 10^6. Both
facts belong in the same sentence.

**The quantifier, stated as honestly as I can.** This is a statement about the
DENSITY of bad positions in one period. `G2(x#)` is the largest gap over that
period, decided entirely by the exceptional set this argument throws away. An
almost-all statement at exponent 0 and an all-positions statement at exponent
4.2665 are not near neighbours; they are different quantifiers over the same
object, and the second does not follow from the first at any exponent.

**Pilot, every position of the complete period.**

```
  z   H    H*M     rms     Chebyshev    true density   over-predicts by   minT
  13  10   0.558 0.5978  1.146e+0   4.589e-1        2.50          -1
  13  20   1.117 0.7736  4.798e-1   2.026e-1        2.37          -1
  13  40   2.234 0.9484  1.803e-1   1.212e-2       14.87           0
  13  60   3.351 1.1949  1.272e-1   0.000e+0        (0)            1
  13  90   5.026 1.3443  7.154e-2   0.000e+0        (0)            2
  17  10   0.470 0.5682  1.463e+0   5.404e-1        2.71          -3
  17  20   0.940 0.7494  6.360e-1   2.775e-1        2.29          -3
  17  40   1.879 0.9789  2.713e-1   6.787e-2        4.00          -2
  17  60   2.819 1.2046  1.826e-1   2.338e-2        7.81          -2
  17  90   4.229 1.3989  1.094e-1   5.062e-3       21.62          -1
  19  10   0.396 0.5754  2.111e+0   5.953e-1        3.55          -5
  19  20   0.792 0.7690  9.430e-1   3.528e-1        2.67          -5
  19  40   1.584 1.0231  4.172e-1   1.294e-1        3.22          -5
  19  60   2.376 1.2485  2.761e-1   6.209e-2        4.45          -5
  19  90   3.564 1.4452  1.645e-1   2.637e-2        6.24          -4
  23  10   0.342 0.5769  2.850e+0   6.357e-1        4.48          -6
  23  20   0.683 0.7744  1.284e+0   4.107e-1        3.13          -6
  23  40   1.367 1.0279  5.655e-1   1.837e-1        3.08          -6
  23  60   2.050 1.2296  3.597e-1   9.542e-2        3.77          -5
  23  90   3.075 1.4066  2.092e-1   3.985e-2        5.25          -4
```

Chebyshev over-predicts by 2.3x to 21.6x and never under-predicts. Honest and
mildly lossy, as a second-moment bound on a near-Gaussian field should be. The
point of running it is that the comparison is against the exact density over
the complete period, not a sample.

---

## 4. THE GAP: WHAT A WORST-POSITION PROOF MUST BEAT

**The mean square SATURATES in H**, so no linear model may be used here.
`<R^2>_H` at z = 29 grows only 4.0x between H = 841 and H = 1.73e6. Every row
below is the exact mean square at that H, on a grid, with the bracket printed.
A first draft of this section priced the gap with a linear model `<R^2> ~ C H`
and got the answer badly wrong in both directions; the tables below replace it.

### (i) Deviation

A worst-position proof must certify `sup_x |R_H| <= lambda * rms(R_H)` with
lambda small enough that `H M > lambda * rms`. The mean square by itself gives
only Chebyshev's `lambda <= sqrt(W)`, since one position carrying `lambda rms`
forces `<R^2> >= lambda^2 rms^2 / W`.

```
  z    lnW    u_max   sqrt(W)   lambda needed at u = 4.2665 / 2.6487 / 2.5790 / 2.0   lam_true  sqrt(2lnW)
  13   7.745  3.020  4.806e+1   (H/W=2.4e+1) (H/W=3.9e-1) (H/W=3.2e-1) (H/W=7.3e-2)    2.42     3.936
  17  10.310  3.639  1.733e+2   (H/W=5.9e+0) (H/W=6.0e-2)  2.885e+1     7.823e+0       3.29     4.541
  19  13.143  4.464  7.145e+2   (H/W=5.6e-1)  3.692e+1     2.832e+1     6.961e+0       4.90     5.127
  23  16.088  5.131  3.114e+3   (H/W=6.7e-2)  4.139e+1     3.307e+1     8.044e+0       4.54     5.672
  29  19.223  5.709  1.494e+4    1.080e+4     5.942e+1     4.851e+1     1.029e+1        --      6.200
```

Cells printing `H/W` are refusals: at those (z, u) the window is more than 5
percent of the period, where `R_H` degenerates (`R_W == 0` identically) and no
statement should be read off. `lam_true` is the measured `sup|R|/rms` at
`H = z^2/2`, and it sits at 2.4 to 4.9 against `sqrt(2 lnW)` of 3.9 to 6.2: the
true field really does live at a few rms units, while Chebyshev allows
`sqrt(W)`, which is 48 at z = 13 and 14,940 at z = 29. **That ratio,
`sqrt(W)/lam_true`, is the raw size of the gap: 20, 53, 146, 686 at z = 13, 17,
19, 23. It grows like `exp(theta(z)/2)`.** I did not measure `lam_true` at
z = 29 (it needs a blocked full-period walk), so I do not quote a fifth value.

The one row that directly prices `beta_2` is z = 29, the smallest level where
`H = z^4.2665` is safely inside the period: the lambda needed there is 1.080e4
against Chebyshev's `sqrt(W) = 1.494e4`, short by a factor 1.38. That is the
same statement as `u_1 = 4.3767 > 4.26645` in (ii), reached without any model.
Reading the gap in window exponent is (ii); in moment order is (iii).

### (ii) Window exponent, measured

```
  z    u_1 [bracket]      u_1^prov [bracket]   u_true   u_max   theta/(2lnz)  u_1-theta/(2lnz)  u_1-u_true
  13  2.8489 [2.75,3.00]     --                1.5963  3.0196   1.5098        1.3392            1.2527
  17  3.2063 [3.00,3.25]     --                1.7070  3.6390   1.8195        1.3868            1.4993
  19  3.6686 [3.50,3.75]   4.3604 [4.25,4.50]  1.7960  4.4637   2.2319        1.4367            1.8725
  23  4.0634 [4.00,4.25]   4.7087 [4.50,4.75]  1.7710  5.1308   2.5654        1.4980            2.2924
  29  4.3767 [4.00,4.50]   5.0021 [5.00,5.50]  1.7718  5.7088   2.8544        1.5224            2.6049
```

`u_1` is the smallest u with `HM >= sqrt(W <R^2>_H)`: the all-positions
exponent Chebyshev plus a union bound over the period actually delivers.
`u_1^prov` is the same with the PROVEN bound `min(B H, B2)` in place of the
exact mean square, `B2 = (1/4) sum e^2 Vabs(e)^2` being the H-free half of
Theorem A. `u_max = lnW/ln z` guards the degeneracy `R_W == 0`.

**The decomposition is the finding.** `u_1 - theta(z)/(2 ln z) = 1.339, 1.387,
1.437, 1.498, 1.522`: flat, drifting 0.23 across a range where the term it is
subtracted from moves by 1.34. So `u_1 = theta(z)/(2 ln z) + O(1)` and it
DIVERGES like `z/(2 ln z)`, while `u_true` sits flat near 1.60 to 1.80.
**The gap the mean square must be supplemented by is
`theta(z)/(2 ln z) - 1.45`: 1.25 at z = 13, 2.29 at z = 23, 2.60 at z = 29, and
no upper bound.** That is the answer to item 3 of the brief.

**A trap, flagged before anyone quotes it.** `u_1` is BELOW `beta_2 = 4.26645`
at z = 13, 17, 19, 23, and crosses it at z = 29 (4.3767). That is not a theorem
in waiting. It is `theta(z)/(2 ln z)` still being small at toy z, and at z = 13
and 17 the window is also a large fraction of the period (`u_1` against `u_max`
is 2.85 vs 3.02 and 3.21 vs 3.64), where `R_H` collapses because a full period
contains every class exactly. Attack 8 section 4's alarm applies verbatim: a
soundness check firing, not progress. The crossing lands where the law puts it:
`theta(z)/(2 ln z)` reads 2.5654 at z = 23 and 2.8544 at z = 29 against the
threshold `beta_2 - 1.45 = 2.8165`, so the crossing must fall between those two
levels, and it does. That the law predicts its own crossing point is the check
that it is a law and not a coincidence.

### (iii) Moment order, which is the currency a proof is paid in

`<R^2k> <= m_2k <R^2>^k` plus a union bound gives `lambda_k = (W m_2k)^{1/2k}`;
`k = 1` is Chebyshev, `k -> inf` with Gaussian `m_2k = (2k-1)!!` is the maximal
law `sqrt(2 lnW)`. Read off the exact lambda grid:

```
  z     k=1     k=2     k=3     k=4     k=6     k=10   Gauss-max  u_true | measured m4 m6 m8
  13   2.849   2.032   1.877   1.821   1.782   1.778   1.769     1.596  | 2.03  5.4   17
  17   3.206   2.402   2.056   1.914   1.804   1.758   1.750     1.707  | 3.11 16.2  114
  19   3.669   2.710   2.344   2.152   1.955   1.837   1.814     1.796  | 3.55 24.9  276
  23   4.063   2.862   2.396   2.197   2.010   1.859   1.814     1.771  | 2.98 14.8  103
  29   4.377   2.987   2.502   2.248   2.016   1.850   1.786     1.772  |  --

  order that first beats each target:
  z    k < 4.26645   k < 2.6487   k < 2.5790   k < 2.0   theta/(2 ln z (beta_2-1.45))
  13        1             2            2          3        0.54
  17        1             2            2          4        0.65
  19        1             3            3          6        0.79
  23        1             3            3          7        0.91
  29        2             3            3          7        1.01
```

The measured moments at the operative window are 2.03/5.4/17, 3.11/16.2/114,
3.55/24.9/276, 2.98/14.8/103 against Gaussian 3/15/105: **the sawtooth is
genuinely near-Gaussian in low moments**, so `k = 2` and `k = 3` are not
fantasy. Past `k = 4` the ladder uses Gaussian `m_2k` as a stand-in and the
regime an asymptotic argument needs is `k` of order `z/ln z`, where I measured
nothing. Attack 8's Bonferroni depth `K* = 0, 0, 2, 10` is the corpus's record
of what happens when that order is pushed.

**Why Parseval cannot be pushed further.** L3's coefficients `|Theta_e(a)|^2`
are non-negative: Parseval sees only the energy of the field. The worst position
is a phase-alignment question and the energy carries no phase. That is the
structural reason the mean square is a dead end for `G2` rather than a lossy
route to it.

---

## 5. THE FINDING THE BRIEF DID NOT ASK FOR: A LEGAL WORST-POSITION BOUND

L5 gives, by triangle inequality and nothing else,

```
    sup_x |R_H(x)|  <=  Ssup(H) := sum_{e>1} sum*_{a mod e} |Theta_e(a)| |S_H(a/e)|,
```

so `T(x) > 0 at EVERY x` as soon as `H M > Ssup(H)`. **No maximal law, no
Gaussian hypothesis, no averaging over positions.** This takes absolute values
in the FOURIER variables, where the sieve's cancellation already sits inside
`Theta_e(a)`, instead of in the divisor-pair variables, where taking them
destroys it.

```
  z   nP   u_true   H_sup  u_sup   H_sup/nP   Ssup(nP)  true sup|R|  tightness   N/Ssup(nP)
  13   60  1.5963     198  2.0617    3.30     11.4467     2.6494       4.32         74
  17  126  1.7070     683  2.3036    5.42     28.4118     4.9203       5.77         79
  19  198  1.7960    1833  2.5518    9.26     60.0382     6.8403       8.78         79
  23  258  1.7710    4278  2.6666   16.58    118.3280     7.8157      15.14         81
```

Three readings.

**(a) The change of basis is worth a factor of 80, and it is stable.** The same
absolute-value step in the divisor-pair basis gives at best the term count N,
which is 74x, 79x, 79x, 81x larger than `Ssup(nP)` across the four levels: a
flat factor, not a shrinking one. **Attack 2's finding 2, that absolute-value
accounting reaches 0.978 of the trivial pair-count bound at a worst position, is
therefore a ceiling on the DIVISOR-PAIR REPRESENTATION, not on the problem.**
The Fourier representation has its own absolute-value bound and it is a
different, much smaller object.

**(b) It is nearly sharp at small z and loosens.** `Ssup(nP)` against the true
supremum is 4.32, 5.77, 8.78, 15.14. So the bound is genuinely close to the
truth where the truth is checkable, and the margin roughly doubles per two
levels.

**(c) The exponent it yields is 2.0617, 2.3036, 2.5518, 2.6666 at z = 13, 17,
19, 23, and it is rising.** All four are below `beta_2 = 4.26645`; the first
three are below the vector-sieve decoupled target on either reading (2.6487 or
2.5790) and the fourth is just above both. None is below 2, so this is not
TPC-implying, which is exactly why it is legal. The increments are +0.242,
+0.248, +0.115: the last is half the first two, so the rise may be decelerating
or may be noise. Fitting `u_sup = alpha theta(z)/ln z + c` to the endpoints
gives `alpha = 0.2865`, `c = 1.197`, with residuals +0.06 and +0.08 at the two
interior points, i.e. the same divergent SHAPE as `u_1` but with 0.2865 in place
of 0.5. On that fit it would cross `beta_2` near z = 45. **Four points cannot
decide whether it plateaus, and this is the single most important thing left
undone in this attack.**

**(d) What this is and is not.** It is an exact finite verification at each z:
`Ssup(H)` is computed, not estimated, so at z = 13 the statement "every window
of length 198 contains an r with r and r+2 both 13-rough" is established here
with no maximal law anywhere in it. It is NOT a theorem, because a theorem needs
an analytic upper bound on `Ssup`, and the crude one (`|Theta_e(a)| <= Vabs(e)`,
`sum*_a |S_H(a/e)| ~ (e/pi) ln e`) diverges like `3^{pi(z)}`: the numerical
smallness comes from `|Theta_e(a)|` decaying far faster than `Vabs(e)`, and that
decay is the missing estimate.

**The chain hands over a specific analytic target, and it is not an exponential
sum over a moving object.** Two more proven steps:

```
    sup|R_H|  <=  Ssup(H)
              <=  Ssat := sum_{e>1} sum*_a |Theta_e(a)| / |sin(pi a/e)|     (|sin(pi H a/e)| <= 1)
              <=  SCS  := sum_{e>1} sqrt( P(e) (e^2-1)/3 ),                 (Cauchy-Schwarz)
    P(e) = sum*_{a mod e} |Theta_e(a)|^2,   sum_{e>1} P(e) = Var(c)  exactly (L3 at v = 0),
```

using `sum_{a=1}^{e-1} 1/sin^2(pi a/e) = (e^2-1)/3` (checked at e = 2, 3, 5, 7,
11, 30). Both steps are measured:

```
  z   Ssup(nP)     Ssat    Ssat/Ssup      SCS     SCS/Ssat    Var(c)    u from Ssat
  13   11.4467   19.6018     1.71      8.354e+1   4.26e+0   5.792e-2     2.2850
  17   28.4118   50.3136     1.77      5.050e+2   1.00e+1   4.984e-2     2.4623
  19   60.0382  120.0616     2.00      2.463e+3   2.05e+1   4.652e-2     2.7228
  23  118.3280  242.4993     2.05      7.623e+3   3.14e+1   4.328e-2     2.8281
```

**Dropping the H-dependence is cheap and the L2 relaxation is not.** Going from
`Ssup(H)` to the H-free `Ssat` costs a flat factor 1.71 to 2.05, worth about
+0.2 in exponent (2.285, 2.462, 2.723, 2.828 against `u_sup` = 2.062, 2.304,
2.552, 2.667). Going on to `SCS` costs 4.26, 10.0, 20.5, 31.4, roughly doubling
per level. **So the target to name is `Ssat`, an L1 norm of the spectrum against
the weight `1/|sin(pi a/e)|`, not its L2 relaxation `SCS`.** `Var(c)` is printed
because it is `sum_e P(e)` exactly and is the only closed-form anchor in the
chain: 5.79e-2, 4.98e-2, 4.65e-2, 4.33e-2. **What a worst-position proof needs
here is a decay statement for `|Theta_e(a)|` across the divisor lattice, not a
maximal inequality and not a quantifier over positions.** That is a different
and better-shaped target than anything this route has had.

---

## 6. THE BRUDERN-FOUVRY TRANSFER, WHICH IS THE COORDINATOR'S QUESTION

Attack 2 located the transfer failure at one factor: by reciprocity the shifted
CRT phase splits as `e(h rho/(d1 d2)) = e(-h N/(d1 d2)) * e(-2h dbar1/d2)`, the
right factor theirs verbatim, the left `O(x^eps)` for them and `O(N/H)` for us,
breaking their partial summation in (2.9) and the smoothness hypothesis of their
Lemme 2.

**The answer, and it is L5.** In my variables the split is the same split:

```
    R(x) = sum_{e>1} sum*_a  Theta_e(a)  *  S_H(a/e)  *  e(a x / e).
                             ^RIGHT factor            ^LEFT factor
```

`Theta_e(a)` carries their right factor exactly: Theorem B shows the phase is
`e(2a inverse(e1)/e2)`, the same inverse, carried by only `2^omega(e)` terms.
Their left factor `e(-hN/(d1d2))` is my `e(ax/e)`, the window position.

**The mean square absorbs the left factor for free, because `|e(ax/e)| = 1`.**
It never has to be estimated, so no partial summation is needed, no smoothness
hypothesis is needed, and there is no `N/H` loss at all. Their step (2.9) and
their Lemme 2 exist only to handle the left factor at a FIXED position. So the
transfer failure attack 2 located is real for a fixed-position argument and
vacuous for the mean square.

**And the price is exactly the quantifier, nothing else.** The average over x
that removes the factor is the same average that turns the conclusion into an
almost-all statement. Section 4 is the bill: `theta(z)/(2 ln z) - 1.45` units of
window exponent, 1.25 at z = 13 rising to 2.60 at z = 29, unbounded. **So the
honest sentence the coordinator asked for is: the mean square absorbs the left
factor where their partial summation cannot, and pays for it in the only
currency that matters here, the quantifier.**

**And one qualification that matters more than the sentence.** Section 5 shows
the left factor need not be paid for with the quantifier at all. Bounding it by
1 pointwise, which is exactly what the triangle inequality in `Ssup` does, keeps
the worst-position quantifier and costs a factor of 4.3 to 15.1 against the true
supremum at z = 13 to 23. So the `O(N/H)` loss attack 2 identifies is a loss in
THEIR partial-summation treatment of the left factor, not an intrinsic price of
the factor: in the Fourier basis the factor is unimodular and bounding it by 1
is nearly free. Whether that stays nearly free at larger z is the open question
of section 5(c), and it is now the most valuable thing to compute next.

**On attack 2's corrections.** I re-checked the arithmetic and used it: break-even
`5.158065/4.26645 = 1.20899` (not 1.2417), full decoupling `5.158065/2 =
2.579033` (not 2.6487), and BF Proposition 2's own `(4/3)(1+e^{3/4}) =
4.156000`, which is `0.110450` below `beta_2`. All four checked to the digits
printed. My section 4 tables carry both 2.6487 and 2.5790 as targets; no
conclusion here depends on which is used. I did not independently re-derive
attack 2's asymmetric optimisation and I am not vouching for it, only for the
arithmetic of the consequences.

---

## 7. WHAT CHANGES, AND COVERAGE

### New

1. **The mean-square Lemma V is proved**, with an explicit constant, uniform in
   H and in s, and the residual analytic burden is named exactly: `B(z,s)`
   bounded. That burden is a character-free sieve mean value.
2. **(V1) and (V2) are proved**, (V2) with its equality case, from one
   elementary count (L4).
3. **L5, the pointwise spectral expansion**, which is the Brüdern-Fouvry
   left/right split in our variables and settles section 6.
4. **The Fourier absolute-value supremum bound** of section 5: legal,
   unconditional, within 4.3x to 15.1x of the true supremum, giving 2.06, 2.30,
   2.55, 2.67 at z = 13 to 23, and beating the divisor-pair absolute-value bound
   by a flat factor of about 80.
5. **Three orders of magnitude of bound quality** over the corpus's
   absolute-value accounting, with the loss going from rising to flat.
6. **A second exhaustive witness** for the `theta-ladder.md` correction box.

### Retires or is downgraded

7. **`sift-limit-attack.md` sec.6 item (i)'s own expectation.** It says the
   mean square "would give the almost-all form of the 2.649 exponent". It does
   not: the almost-all exponent is 0, and it is 0 for reasons unconnected to
   2.649, which is a worst-position number no second-moment argument produces.
8. **"The maximal law is the whole cost" needs a third branch.** T4 split the
   route into S-crude (legal, finishes nothing) and S-sharp (finishes, is TPC).
   Section 5 is a third object: legal, not TPC-implying, and landing at 2.06 to
   2.67 rather than S-crude's rising-past-3.4 column. Whatever it turns out to
   be worth, the dichotomy as stated is not exhaustive, and the branch it misses
   is the only one in the file with a worst-position quantifier and no
   hypothesis.
9. **Attack 2's absolute-value ceiling is representation-dependent.** Its
   finding 2 (`sum|r|` at 0.978 of the trivial pair-count bound at a worst
   position, so `theta_total <= 1` is a genuine ceiling) is a statement about
   the divisor-pair basis. Section 5(a) measures the Fourier basis at a flat 80x
   below that same trivial bound. The ceiling stands where it was measured; it
   does not stand as a statement about the problem.

### Coverage: what I did not reach

* `B(z,s)` is computed for z <= 37 and s in {2.0, 2.6, 3.0, 3.4}. I did not
  prove it bounded and did not find its asymptotic form. The heuristic
  `B ~ M^2 prod(1+4/p)` has the right shape but its implied constant drifts from
  16.4 at z = 13 to 23.3 at z = 29.
* The exact-`Theta*` column (Theorem A) stops at z = 23; past that
  `sum_e phi(e) 2^omega(e) = prod(2p-1)` is prohibitive. `Vabs` runs to z = 37.
* Section 5 reaches z = 23 (four points). z = 29 needs `prod(2p-1) = 7.8e10`
  evaluations of `Theta_e(a)` and I did not run it. **Four points cannot decide
  whether `u_sup` plateaus or keeps climbing, and that is the single most
  important thing left undone in this attack.** The cost is not prohibitive:
  z = 29 is an overnight run as written, and grouping the `a`-sum by the
  factorisation structure would bring it down further.
* Full-period walks stop at z = 23 (`W = 9,699,690`). z = 29 needs a blocked
  walker, which exists only inside `theta-ladder-sup.js` with `u = 3.2`
  hardcoded, and I did not edit that file.
* Moments measured only to order 8 and only at z <= 23.
* I did not test `s < 2.0` or `s > 3.4`, nor look for a minimum of `B` in s.

### Where I am most likely wrong

* **Section 5's rate.** Four points, `u_sup` = 2.06, 2.30, 2.55, 2.67, with
  increments +0.242, +0.248, +0.115. The endpoint fit
  `u_sup = 0.2865 theta(z)/ln z + 1.197` has the same DIVERGENT shape as `u_1`,
  just with a better constant, and on it `beta_2` is crossed near z = 45. The
  decelerating last increment is the only evidence against that, and one
  decelerating increment out of three is not evidence. If the fit is right,
  section 5 is a better instrument than the maximal law and still not a route to
  a theorem below `beta_2`; if the deceleration is real it is the best target
  this route has ever had. **I cannot tell, and nobody should quote section 5 as
  a win until z = 29 and z = 31 are in.**
* **`B(z,s)`'s flatness rests on six levels of z** spanning a factor 2.8. If B
  really grows like `log z` the mean-square statement survives (a log costs
  nothing in section 3) but the word "flat" does not.
* **Section 4's `u_1` values at z = 13 and 17 sit close to `u_max`**, so those
  two rows are partly degenerate. The decomposition column `u_1 -
  theta/(2 ln z)` is flat across all four rows including the two clean ones, so I
  believe the law; the two smallest rows should not be quoted on their own.
* **The claim in section 6 that the mean square pays "only" the quantifier**
  assumes their `O(N/H)` left-factor loss is genuinely a partial-summation
  artifact. I checked that my derivation has no such factor, which is not the
  same as checking that theirs is removable.

### Brief-trap checks

* No threshold here comes from a bisection. Section 0(b) prints the failing and
  the succeeding H. Section 5 scans a geometric grid and then every integer in
  the last gap. Section 4 prints the bracketing grid points beside every
  interpolated `u`.
* Units: every exponent is `ln(window)/ln z` with z the sift bound, the
  convention of `theta-ladder.md` and `beta2-note.md`. `u_max = lnW/ln z` is
  printed wherever H could approach the period.
* Flatness claims are reported as bands with drifts, never as trends.
* Absence claim, calibrated, and my first draft of it was wrong.
  `grep -rln "Parseval" research/ paper/` returns **16 files**, not two: the word
  is all over the natal-set variance work (`natal-cap-14/16/23/25/26`,
  `discrepancy-two-class`, `level-ledger-tight`, `paper/PAPERS.md`) plus
  `sift-limit-attack.md` sec.6 where the request is made. So "Parseval is new
  here" would have been false and I am not claiming it. What IS new:
  `grep -rln "e \* Vabs"` and `grep -rln "Ssup"` return only the new script and
  this report. The repository's prior bounds on `<R^2>` are
  `sift-limit-lemmaV.js`'s `gcdBound` and `sharpBound`, both per-H sums over
  divisor pairs with absolute values taken there; neither has the form
  (H-free constant) x H, and section 2 measures both against the new chain.
  Directory listing taken before writing this: `research/` has 204 entries plus
  `history/staging/`.

### On cap-02 and cap-29, which the brief pointed at

Read both before using anything. `natal-cap-02-fourier-budget.js` factors the
exponential sum of the NATAL SET, `S(k) = prod_p F_p(k y_p)` with `F_p(0) = p-2`
and `F_p(t) = -(1+e(-2t/p))`. `natal-cap-29-sigma-plateau.js` folds that against
a Fejér kernel for the exact window variance,
`Var(l) = (2/pi^2) sum_j |S(j)|^2 sin^2(pi j l/W)/j^2`. **The shape transfers
and the object does not.** L3 is the same manoeuvre, which is why it worked; but
the spectrum being factored there is the survivor set's, while mine is the
divisor-pair lattice of the SIEVE WEIGHTS, whose local factors are linear-sieve
partial sums rather than two-term expressions and whose phases carry a modular
inverse (Theorem B) that cap-02's do not. So cap-29's closed form does not
evaluate `B(z,s)` and I did not try to make it. What cap-29 does supply is the
precedent that a Fejér-folded factored spectrum is exactly summable, and the
warning in its reading 5 that per-level steps are "twist luck, not law", which
is the same caution I have put on `B`'s flatness and on section 5's rate.
