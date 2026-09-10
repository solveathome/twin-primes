# The Fourier sup bound, extended: does `u_sup` plateau?

<!-- ledger
id: Q-lemmaV-usup
status: ANSWERED
todo: none
question: Does u_sup plateau below beta2, or diverge?
verdict: It rises at every added level, 2.0617 at z = 13 to 3.2026 at z = 43: a plateau below beta2 is rejected and so is the fast divergence attack 1 feared, leaving "plateau above beta2, or divergence", which for this route is the same verdict (divergence since REFUTED at fixed s by attack-0829n-rml-proof.md section 4.1, adjudicated in verify-0830-usup-convention.md).
-->

Brief: extend attack 1's `u_sup` past its four points and decide plateau against
slow divergence. Script: `research/lemmaV-sup-extension.js` (new). Parents:
`research/history/staging/attack-beta2-01-lemmaV-meansquare.md` §5,
`research/lemmaV-parseval.js` S5, `research/sift-limit-attack.md` §7b/§7c.
No repository file was edited, nothing was committed, nothing was pushed.

---

## THE VERDICT

**`u_sup` rises at every added level. A plateau BELOW `β₂` is rejected; the fast
divergence attack 1 feared is rejected too; and the question is not "plateau or
divergence" but "plateau ABOVE `β₂`, or divergence" — which for this route is the
same verdict.**

```
  z        13      17      19      23      29      31      37      41      43      47
  u_sup  2.0617  2.3036  2.5518  2.6666  2.7464  2.8924  3.0125  3.1103  3.2026    --
  u_sat  2.2850  2.4623  2.7228  2.8281  2.8827  3.0259  3.1644  3.2543  3.3448  3.4306
                                                                   beta_2 = 4.26645
```

Nine points for `u_sup` against attack 1's four, ten for `u_sat`. Four statements,
in decreasing order of how firmly the data support them.

**1. `u_sup` is rising, and a strict plateau is rejected.** It increases at all
eight steps, 2.0617 to 3.2026, with no step negative and no step near zero. The
constant model's RSS is **1.14** against **2.34e-2** for the best-fitting model —
49× worse, with a maximum residual of 0.666. Over the measured range a flat
`u_sup` is not a live hypothesis.

**2. Attack 1's `θ(z)/ln z` shape is rejected too, and in the conservative
direction.** Residuals against its own endpoint fit
`u_sup = 0.2865·θ(z)/ln z + 1.197` are −0.0004, +0.064, +0.076, −0.0003 at the
four levels it was fitted to, then **−0.086, −0.189, −0.249, −0.373, −0.535** at
the five new ones: monotonically negative and growing. **The rise is real but
slower than attack 1 feared**, which is the one piece of good news here and the
reason nothing crosses at `z = 45`.

**3. Every model that fits crosses `β₂`, including the bounded one, and the
location spans 1.5 orders of magnitude.** `a ln z + b` crosses at `z = 147`
[141, 158]; `a lnln z + b` at `267` [253, 297]; `a θ(z)/ln z + c` at `73`
[71, 79]; and `A − B/ln z`, which is BOUNDED, has asymptote **A = 5.4635 —
above `β₂`** — so it crosses at `z = 1544` [1189, 2438]. **The direction is
unanimous. The location is undetermined, and no arithmetic here pins it down.**

**4. And the mechanism can be read with no model at all, which outranks every
extrapolation above.** `u_sat` converges to the log–log slope of `Ssat`, and that
slope is **4.99 regressed over all ten levels and 6.20 over the top five —
rising, and above `β₂ = 4.26645` in every window.** The profile over the
asymptote agrees from the other side: the best-fitting limit is `A = 5.46` for
`u_sup` and `5.56` for `u_sat`, and forcing the limit down to `β₂` costs a factor
**8.70** in RSS. **So even the bounded reading of this instrument lands above
`β₂`.** §4 says why: the absolute-value step that removes the position quantifier
is the step that loses a factor geometric in `π(z)`, measured at 2.05 per added
prime across nine levels.

---

## 0. CUSTODY, AND THE INSTRUMENT AGAINST KNOWN POSITIVES

The whole file is a re-implementation, so nothing may be believed until it
reproduces what already exists. Six reproductions run before a single new level.

```
(a) the fast |sin(pi t)| against Math.sin over 2.4e6 arguments m/e
    worst absolute error 6.63e-10, worst RELATIVE error 6.63e-10
    (relative is the one that matters: G = |Theta|/|sin(pi a/e)| divides by it)

(b) the PEELED Theta_e(a) against lemmaV-parseval.js's own factorisation sum,
    evaluated term by term, over 2309 / 3000 / 3000 / 3000 pairs (e,a):
    worst |peeled - direct| = 1.96e-17, 1.64e-17, 1.25e-17, 9.22e-18
    at z = 13, 17, 19, 23, with 0 CRT-weight mismatches at every one.

(c) Ssup(nP), Ssat, SCS and Var(c) against A1.supBoundTable(), which evaluates
    the same sums at cost phi(e) 2^omega(e):
    Ssup rel 4.81e-11 / 4.29e-11 / 4.92e-11 / 4.80e-11
    Ssat rel 1.14e-11 / 8.99e-12 / 7.05e-12 / 5.99e-12
    SCS and Var(c) at machine epsilon (they never touch the fast sine).

(d) the spectral mean square from the SAME sweep against the repository's
    INDEPENDENT O(N^2) divisor-pair meanSquare(), sharing no code path:
    z=13 H=169  1.161265531 vs 1.161265531   rel 1.46e-10
    z=17 H=289  3.013047790 vs 3.013047790   rel 5.64e-11
    z=19 H=361  4.217260880 vs 4.217260880   rel 5.07e-11
    z=23 H=529  5.049384489 vs 5.049384488   rel 1.79e-10
    z=29 H=841  6.769446539 vs 6.769446539   rel 8.72e-11

(e) attack 1 sec.5's published H_sup and u_sup, by its own protocol:
    z=13 H_sup = 198  u_sup = 2.0617   CONFIRMED
    z=17 H_sup = 683  u_sup = 2.3036   CONFIRMED
    z=19 H_sup = 1833 u_sup = 2.5518   CONFIRMED
    z=23 H_sup = 4278 u_sup = 2.6666   CONFIRMED

(f) is closure an up-set in H?  (every integer H from 8 to 2 H_sup)
    z    H_min   H_sup(protocol)   overshoot   d u       later failures
    13     198             198       0.00%    0.0000        0   UP-SET
    17     659             683       3.64%    0.0126       21   NOT AN UP-SET
    19    1833            1833       0.00%    0.0000        0   UP-SET
```

Item (d) is the strongest of the six: it validates the entire `Theta` pipeline
against a computation carried out in the other basis entirely.

**The floors, which are the "known positives" a sup bound must never dip under.**

```
  z    H=nP   Ssup(nP)     rms(R_nP)   true sup|R|   Ssup/sup   Ssup/rms   sup/rms   u_true   u_max   nP/W
  13    60     11.4467      1.1949       2.6494       4.32       9.58      2.22  1.5963  3.0196  2.6e-2
  17   126     28.4118      1.4885       4.9203       5.77      19.09      3.31  1.7070  3.6390  4.2e-3
  19   198     60.0382      1.4478       6.8403       8.78      41.47      4.72  1.7960  4.4637  3.9e-4
  23   258    118.3280      1.7365       7.8157      15.14      68.14      4.50  1.7710  5.1308  2.7e-5
```

`Ssup/sup` reproduces attack 1's 4.32 / 5.77 / 8.78 / 15.14 to four digits, and
is never below 1: the bound never dips under the truth. `u_sup` clears
`u_true = ln(nP)/ln z` by 0.47 to 0.90 at all four levels. `nP/W` runs from
2.6e-2 down to 2.7e-5 and `u_max = ln W/ln z` stays above `u_sup` everywhere, so
no row is near the degeneracy `R_W ≡ 0`.

**What attack 1's `u₁` flag means, and why it is the whole point here.** Attack 1
§4(ii) found its mean-square exponent `u₁` below `β₂` at `z = 13, 17, 19, 23` and
crossing at `z = 29`, and refused to call that a result: `u₁ = θ(z)/(2 ln z) +
1.45` **diverges**, so "below `β₂`" at toy `z` says only that `θ(z)/(2 ln z)` has
not got there yet — and the crossing landed exactly where the law puts it, which
is what proved it was a law. `u_sup` sits in precisely that position. Four points
below `β₂` prove nothing until the shape is known, and attack 1's own fit for it
has the same divergent shape with a smaller constant. §3 is the test of the shape.

---

## 1. THE COST, AND WHAT MADE THE EXTENSION AFFORDABLE

Two changes remove the exponential factor from the evaluation of `Θ_e(a)` and
almost all of its trigonometry. Neither is a new inequality; both are the same
sum, evaluated differently.

**(P1) The phase is a product over the primes of `e`.** From attack 1's Theorem
B, `c_i ≡ 0 (mod e1)` and `c_i ≡ −2 (mod e2)`. Splitting `1/e = Σ_{p|e} b_p/p`
mod 1 with `b_p = inverse(e/p) mod p`, every prime of `e1` contributes 0 to
`a·c_i/e` and every prime of `e2` contributes `2 a b_p / p`, so

```
    e(-a c_i / e)  =  prod_{p | e2} e( 2 a b_p / p ),
    Theta_e(a)     =  sum_{T subset primes(e)} V(e/e_T, e_T) prod_{p in T} e(2 a b_p / p),
```

a multilinear form in `ω(e)` unit roots, each depending on `a` only through
`a mod p`, `p ≤ z`. All the trigonometry collapses into tables of size `p`.

**(P2) A multilinear form is evaluated on a whole grid by peeling.** Fixing
`a mod p₁, …, a mod p_j` collapses the `2^ω` coefficient array to `2^{ω−j}`. Over
the mixed-radix enumeration of `(Z/e)*`, peeling the primes in ASCENDING order
costs `Σ_j Π_{i≤j}(p_i−1)·2^{ω−j} ≈ φ(e)`, against `φ(e)·2^{ω(e)}` term by term.

```
  z    N(terms)  #recs   max e        #(e,a)      term-by-term  saving   plan
  13      852     31  2.310e+3  2.3090e+3  1.3903e+4    6.0x  u_sup + u_sat
  17     2236     63  3.003e+4  3.0029e+4  2.8369e+5    9.4x  u_sup + u_sat
  19     4764    127  5.105e+5  5.1051e+5  3.6742e+6    7.2x  u_sup + u_sat
  23     9636    243  8.818e+5  2.6494e+6  1.7493e+7    6.6x  u_sup + u_sat
  29    20700    448  3.432e+6  1.7193e+7  9.1850e+7    5.3x  u_sup + u_sat
  31    35868    763  9.700e+6  6.0577e+7  3.4427e+8    5.7x  u_sup + u_sat
  37    76484   1494  3.187e+7  5.2512e+8  3.9789e+9    7.6x  u_sup + u_sat
  41   125884   2501  7.328e+7  1.7951e+9  1.3648e+10   7.6x  u_sup + u_sat
  43   183084   3814  8.365e+7  3.7441e+9  2.8070e+10   7.5x  u_sup + u_sat
  47   293980   6035  2.231e+8  1.0915e+10  8.5411e+10  7.8x  u_sat only
```

The `saving` column is the count only. In time the gain is larger, because (P1)
turns every one of those `cos`/`sin` pairs into a table lookup; what remains is
one `|sin(πa/e)|` per `(e,a)` and one per scanned window length, taken with a
degree-13 odd polynomial whose relative error S0(a) measures at 6.63e-10.

**The reason the ladder stopped at `z = 23` was a cost estimate, and the estimate
was wrong by about 550×.** `Π_{p<z}(2p−1)` counts every `e | P(z)`, but `e` must
divide some `q_i = [d1,d2]` with both `d1, d2 ≤ D = z^s`, which caps `max e` at
3.432e6 against `P(29) = 2.23e8`. The honest term-by-term count at `z = 29` is
9.185e7, not 7.8e10.

---

## 2. THE LADDER

Both exponents are LEGAL unconditional worst-position statements at each `z`.
`H·M > Ssup(H)`, and a fortiori `H·M > Ssat`, put `T(x) > 0` at EVERY position,
with no maximal law and no averaging. `u_sat` is the `H`-free one and is an upper
bound for `u_sup` by construction.

```
  z    #(e,a)     Ssat        u_sat    H_sup     u_sup [bracket]        u_sat-u_sup  0.51/ln z   u_max    H_sup/W
  13  2.309e+3  1.9602e+1  2.2850       198  2.0617 [2.0598,2.0617] exact   0.2232     0.1988   3.020   8.6e-2
  17  3.003e+4  5.0314e+1  2.4623       683  2.3036 [2.3030,2.3036] exact   0.1587     0.1800   3.639   2.3e-2
  19  5.105e+5  1.2006e+2  2.7228      1833  2.5518 [2.5516,2.5518] exact   0.1709     0.1732   4.464   3.6e-3
  23  2.649e+6  2.4250e+2  2.8281      4278  2.6666 [2.6666,2.6666] exact   0.1614     0.1627   5.131   4.4e-4
  29  1.719e+7  5.2311e+2  2.8827     10384  2.7464 [2.7198,2.7464]         0.1362     0.1515   5.709   4.7e-5
  31  6.058e+7  9.5263e+2  3.0259     20586  2.8924 [2.8662,2.8924]         0.1336     0.1485   6.578   3.2e-6
  37  5.251e+8  2.5727e+3  3.1644     52989  3.0125 [2.9876,3.0125]         0.1519     0.1412   7.207   2.6e-7
  41  1.795e+9  4.6495e+3  3.2543    103823  3.1103 [3.0750,3.1103]         0.1440     0.1373   7.980   1.4e-8
  43  3.744e+9  7.1072e+3  3.3448    170378  3.2026 [3.1678,3.2026]         0.1421     0.1356   8.867   5.6e-10
  47  1.091e+10 1.2623e+4  3.4306      --        --                          --        0.1325   9.639      --
```

Every row is a legal finite statement. At `z = 43`, for instance: **every window
of 170,378 consecutive integers contains an `r` with `r` and `r+2` both
43-rough** — established with no maximal law, no Gaussian hypothesis and no
exceptional set. `H_sup/W` falls from 8.6e-2 to 5.6e-10 and `u_max = ln W/ln z`
stays above `u_sup` by 1.0 to 5.7 at every level, so no row is anywhere near the
degeneracy `R_W ≡ 0`.

**The two exponents converge.** `u_sat − u_sup = ln(Ssat/Ssup(H_sup))/ln z`, and
`Ssup(H_sup)/Ssat` sits near 0.6 at every level, so the gap tracks `0.51/ln z`
and shrinks. That is why `u_sat` is a faithful and far cheaper stand-in at large
`z`: it needs one sweep with no window scan, which is what lets it reach `z = 47`
where `u_sup` does not.

Measured `Ssup(H_sup)/Ssat` is 0.531, 0.637, 0.605, 0.603, 0.592, 0.591, 0.567,
0.569, 0.576 — flat near 0.58, close to the `2/π = 0.6366` an equidistributed
`|sin(πHa/e)|` would give.

**The increments, which is the form the plateau question actually takes.**

```
  step        d u_sup   d u_sat   d ln z    d(th/ln z)   du_sup/dlnz   du_sup/d(th/lnz)
  13 -> 17    0.2418    0.1773   0.2683     0.6194       0.901          0.390
  17 -> 19    0.2483    0.2605   0.1112     0.8248       2.232          0.301
  19 -> 23    0.1148    0.1053   0.1911     0.6671       0.601          0.172
  23 -> 29    0.0798    0.0546   0.2318     0.5780       0.344          0.138
  29 -> 31    0.1459    0.1433   0.0667     0.8697       2.188          0.168
  31 -> 37    0.1201    0.1384   0.1769     0.6287       0.679          0.191
  37 -> 41    0.0978    0.0899   0.1027     0.7731       0.953          0.127
  41 -> 43    0.0923    0.0905   0.0476     0.8863       1.938          0.104
  43 -> 47      --      0.0858   0.0889     0.7721        --             --
```

Attack 1 read three increments (+0.242, +0.248, +0.115) and could not tell
deceleration from noise. With eight, the raw `d u_sup` column does decline —
0.242 down to 0.092 — **but the `z` steps shorten as well**, and `du_sup/d ln z`
is 0.90, 2.23, 0.60, 0.34, 2.19, 0.68, 0.95, 1.94, which is not a decaying
sequence at all. The two rows where it explodes (17→19 and 41→43) are the ones
where `Δ ln z` is smallest. **Per-level increments are the wrong statistic here
and this table is the reason; the fits in §3 are the right one.** The last
column, `du_sup/d(θ/ln z)`, IS decaying (0.390 → 0.104), which is the same fact
as attack 1's shape being too steep, seen locally.

**Tightness: how much the bound loses, at EVERY level.**

```
  z    H_sup    Ssup(H_sup)   rms(R_Hsup)   Ssup/rms   sqrt(2 lnW)   ratio
  13      198       10.4063        0.8006      13.00         3.936   3.30
  17      683       32.0666        2.2635      14.17         4.541   3.12
  19     1833       72.5791        2.7877      26.04         5.127   5.08
  23     4278      146.1371        3.3467      43.67         5.672   7.70
  29    10384      309.6710        4.2195      73.39         6.200  11.84
  31    20586      563.0990        5.4216     103.86         6.722  15.45
  37    52989     1459.4064        8.4046     173.64         7.214  24.07
  41   103823     2644.7690       10.1577     260.37         7.699  33.82
  43   170378     4096.3370       13.2210     309.84         8.167  37.94
```

`sup|R| ≥ rms` always, so `Ssup/rms` is an upper bound on the loss and is
measurable at every level, where `Ssup/sup` stops at `z = 23`. It runs
**13.0 → 309.8**, growing by about 1.35× per added prime. `sqrt(2 lnW)`, the
maximal-law size of `sup/rms`, only runs 3.94 → 8.17, so the final column —
**3.30, 3.12, 5.08, 7.70, 11.84, 15.45, 24.07, 33.82, 37.94** — is the part of
the loss that is NOT explained by the field's own extreme-value behaviour.
**That column is the whole story: the bound is loosening geometrically, and the
truth is not moving.** `u_sup` rises because `Ssup` is losing ground, not because
`G₂` is.

---

## 3. THE TREND, FITTED

Five models, least squares, on all points and on the top half, each with a
leave-one-out band on the extrapolated crossing of `β₂ = 4.26645`. The models are
chosen to bracket the plausible shapes: one bounded and constant, two unbounded
and slow, one unbounded and fast (attack 1's), one bounded and rising to an
asymptote.

```
  u_sup  (9 points, z = 13, 17, 19, 23, 29, 31, 37, 41, 43)
  model                    a          b        RSS        max|res|   crosses beta_2 at z
  constant  u = c          0.00000   2.72756    1.14e+0     0.6658   never (constant)
  u = a ln z + b           0.89093  -0.17935    2.57e-2     0.1079   146.9
  u = a lnln z + b         2.81952  -0.58524    2.34e-2     0.0922   267.4
  u = a th(z)/ln z + c     0.18687   1.63550    4.31e-2     0.1380   73.0
  u = A - B/ln z          -8.78899   5.46353    2.72e-2     0.1070   bounded, A = 5.4635; 1543.9
  leave-one-out bands on the crossing (refit dropping each level in turn):
    u = a ln z + b         [141.1, 157.9]
    u = a lnln z + b       [252.9, 296.5]
    u = a th(z)/ln z + c   [ 71.0,  79.0]
    u = A - B/ln z         [1189.4, 2437.9]
  the same models on the TOP 5 levels only (z = 29, 31, 37, 41, 43):
    constant  u = c        a=  0.00000 b=  2.99285 RSS=1.29e-1   never
    u = a ln z + b         a=  1.02743 b= -0.68267 RSS=4.29e-3   123.6
    u = a lnln z + b       a=  3.65749 b= -1.66571 RSS=4.27e-3   158.0
    u = a th(z)/ln z + c   a=  0.14588 b=  1.93254 RSS=1.90e-3    89.0
    u = A - B/ln z         a=-13.00565 b=  6.63515 RSS=4.27e-3   A = 6.6351; 242.4

  u_sat  (10 points, z = 13 ... 47)
  u = a ln z + b           0.85489   0.10053    2.97e-2     0.1051   130.7   [126.2, 135.5]
  u = a lnln z + b         2.72962  -0.31437    3.50e-2     0.1170   211.8   [198.8, 233.5]
  u = a th(z)/ln z + c     0.16730   1.89894    4.06e-2     0.1191    73.0   [ 73.0,  79.0]
  u = A - B/ln z          -8.57390   5.56487    4.77e-2     0.1360   A = 5.5649; 737.6  [499.7, 1049.9]
```

**(1) A strict plateau is rejected.** RSS 1.14 against 2.34e-2 for the best
model, max residual 0.666 against 0.092. That is not a close call.

**(2) Attack 1's `θ(z)/ln z` shape is rejected too.** On nine points its RSS is
4.31e-2, the worst of the four rising models, and its residual against the
endpoint fit grows monotonically negative to −0.535 at `z = 43`. Its crossing at
`z = 73` is the earliest any model gives and the data are already below it.

**(3) The four rising models are statistically indistinguishable and disagree
about everything that matters.** RSS 2.34e-2, 2.57e-2, 2.72e-2, 4.31e-2 across
`lnln z`, `ln z`, `A − B/ln z`, `θ/ln z` — a spread of 1.8×, on nine points. They
cross `β₂` at 267, 147, 1544, 73. **Every one crosses. None of them can be
preferred.** On the top five levels the ordering even flips (the `θ/ln z` model
becomes the best fit, RSS 1.90e-3), which is what "indistinguishable" looks like.

**(4) The profile over the asymptote is the sharpest way to price it, and it is
the one test that answers the question directly.** Fix a candidate limit `A` in
the bounded family `u = A − B/ln z`, minimise over `B` only, and read the cost:

```
    A          best B     RSS         RSS/RSS_min   verdict at beta_2 = 4.26645
     3.00000     1.0036  9.136e-1       33.62    the bound would stay under beta_2
     3.50000     2.5837  5.903e-1       21.72    the bound would stay under beta_2
     4.00000     4.1639  3.400e-1       12.51    the bound would stay under beta_2
     4.26645     5.0059  2.365e-1        8.70    the bound would stay under beta_2
     4.50000     5.7440  1.628e-1        5.99    the bound would cross beta_2
     5.00000     7.3241  5.856e-2        2.15    the bound would cross beta_2
     6.00000    10.4844  6.922e-2        2.55    the bound would cross beta_2
     8.00000    16.8049  9.669e-1       35.58    the bound would cross beta_2
     5.46364     8.7894  2.718e-2        1.00    best-fitting asymptote
```

**Every limit compatible with the data to within a factor 3 in RSS lies between
about 4.8 and 6.2, and all of it is above `β₂`.** Pulling the limit down to
`β₂ = 4.26645` costs 8.70×; to 4.00 costs 12.5×; to 3.50 costs 21.7×. The
`u_sat` profile says the same with the same shape (best `A = 5.5649`, `β₂` costs
7.21×). **This is the answer to "plateau or divergence": if it plateaus, it
plateaus above `β₂`.**

**(5) The mechanism agrees, with no model at all.** `u_sat = (ln Ssat + ln 1/M)
/ ln z`, and `M·log²z` is flat in [0.336, 0.377] across `z = 13..47`, so `u_sat`
converges to the log–log slope of `Ssat`. Regressed:

```
    d ln Ssat / d ln z  =  4.987 over all ten levels (RSS 0.511)
                        =  6.197 over the top five  (RSS 0.019)
    cumulative slope from z = 13/17/19/23/29/31/37/41/43 to z = 47:
        5.03, 5.43, 5.14, 5.53, 6.59, 6.21, 6.65, 7.31, 6.46
```

**Above `β₂` in every window, and rising.** The best-fitting asymptotes of (4),
5.46 and 5.56, sit inside that range, which is the two readings agreeing.

**(6) The `s`-panel says the trend is not an artifact of the level.**

```
  z     s=2.6     s=3.0     s=3.4          fit u_sat = a th(z)/ln z + c:
  13    2.4875    2.2850    2.3298           s=2.6: a = 0.13794, c = 2.04159
  17    2.5134    2.4623    2.4187           s=3.0: a = 0.20596, c = 1.72140
  19    2.6452    2.7228    2.6954           s=3.4: a = 0.25537, c = 1.54454
  23    2.7727    2.8281    2.9145
  29    2.8012    2.8827    3.0049
  31    2.9664    3.0259    3.1924
```

Rising at all three levels of `s`, with the slope increasing in `s`. `s = 2.6`
sits just below `1+√e = 2.6487` and is a stress test only, not a usable level;
even there the slope is positive. No choice of `s` in the usable range flattens
the trend.

**What this prices, and it is the reason to stop measuring.** The two shapes the
data cannot separate are `u ~ a ln z` (so `H ~ exp(a ln² z)`) and
`u ~ (ln C)·π(z)/ln z` (so `H ~ C^{π(z)}`). They differ only in whether the
driver is `ln² z` or `π(z)` — and over the measured range those two are almost
the same function:

```
    z        13     17     19     23     29     31     37     41     43    101    211
    pi(z)     5      6      7      8      9     10     11     12     13     25     46
    ln^2 z  6.58   8.03   8.67   9.83  11.34  11.79  13.04  13.79  14.14  21.25  28.60
```

They agree to within 9% at `z = 43`, cross near `z ≈ 60`, and part company only
well after. **Nine levels cannot separate them because at nine levels they are
the same function.** Separating them needs `z ≈ 200`, where `π(z) = 46` against
`ln²z = 28.6`. The spectral sum is 3.74e9 points at `z = 43` and 3.36e10 at
`z = 53` (measured, both), growing about 3× per level, so `z ≈ 200` is of order
`10^17` points with the `H`-scan on top. **Brute force cannot settle this.** Only
an analytic estimate for `Ssat` can, and §4 says what it would have to be.

---

## 4. WHAT WOULD HAVE TO BE PROVEN

The chain is finite and explicit at every `z`; nothing in it is asymptotic. To
turn a measured level into a theorem, exactly one statement is needed:

```
    Ssat(z,s)  <=  z^u * M(z,s)      for every z >= z0, with u FIXED,

    Ssat(z,s)  =  sum_{e | P(z), e>1} sum*_{a mod e} |Theta_e(a)| / |sin(pi a/e)|,
    Theta_e(a) =  sum_{e1 e2 = e} e(2a * inverse(e1) / e2) * V(e1,e2),
    V(e1,e2)   =  sum_{i : e | q_i, gcd(e,d1) = e1} w_i/q_i,
    M          =  sum_i w_i/q_i,   the vector-sieve main term,  M ~ c/log^2 z.
```

Then `H = floor(z^u)+1` gives `H*M > Ssat >= Ssup(H) >= sup_x |R_H(x)|`, so
`T(x) > 0` at EVERY `x`, so every window of length `z^u` holds a two-class
survivor pair, so `G2(P(z)) <= z^u`. No maximal law, no Gaussian hypothesis, no
exceptional set, no averaging over positions.

**It is a mean-value estimate and not a maximal inequality — and that is exactly
why, at the measured rate, it is not strong enough.** The position `x` has already been discarded,
exactly, by `|e(ax/e)| = 1`. What remains is an `l1` norm of a fixed finite
arithmetic object against the weight `1/|sin(pi a/e)|`. No supremum over
anything appears in it. By the taxonomy this project uses, that is the tractable
class, and attack 1 was right to say so.

But the measurement prices it, and the price is the whole difficulty.

```
    per added prime,  C = Ssat(next level) / Ssat(this level):
    13->17  17->19  19->23  23->29  29->31  31->37  37->41  41->43  43->47
     2.567   2.386   2.020   2.157   1.821   2.701   1.807   1.529   1.776
    geometric mean 2.0516 over all nine, 2.2729 over the first four,
                                         1.9079 over the last four.
    ln Ssat regressed on pi(z):  slope 0.7202 (all ten, RSS 0.317)
                                 slope 0.6184 (top five, RSS 0.103)
```

With `M·log²z` measured flat in [0.336, 0.377] over `z = 13..47`, a per-prime
factor that settles at any fixed `C > 1` gives

```
    u_sat = ln(Ssat/M)/ln z  ~  (ln C) pi(z)/ln z + 2 lnln z/ln z  ~  (ln C) z/ln^2 z,
```

(antecedent REFUTED at fixed `s`: `ln Ssat <= 2s ln z + O(ln ln z)`, so the
average per-prime factor tends to 1; `attack-0829n-rml-proof.md` §4.1,
`verify-0830-usup-convention.md` §3.2, 2026-08-30)

which diverges. **The measured factor is declining — 2.27 over the first four
steps, 1.91 over the last four — so `C` fixed is not what the data show either.
What they show is the decline being too slow.** For `u_sat ≤ u` at fixed `u`, the
per-step increment `Δ ln Ssat` must not exceed `u·Δ ln z`. Measured against
`β₂·Δ ln z`:

```
    step     d ln Ssat   beta_2 * d ln z    step     d ln Ssat   beta_2 * d ln z
    13->17     0.9427        1.1445         31->37     0.9935        0.7549
    17->19     0.8697        0.4745         37->41     0.5918        0.4380
    19->23     0.7030        0.8151         41->43     0.4243        0.2032
    23->29     0.7688        0.9890         43->47     0.5744        0.3795
    29->31     0.5994        0.2845
    cumulative 13 -> 47:     6.4676  against  5.4834, a ratio of 1.18
```

**So the statement a theorem needs is not "bound a sieve mean value"; it is
"prove that `d ln Ssat/d ln z` falls below `β₂` and stays there", and over the
measured range that derivative is 4.99 rising to 6.20.** It is going the wrong
way by about 18% cumulatively and by more at the top. Whether it turns is exactly
what nine levels cannot see — but nothing in them suggests it does.

**Where the tractable version breaks, and where the wall comes back.** The
exponential factor enters at exactly one step, and the step can be pointed at:

```
    sup_x |R_H|  =  sup_x | sum_{e,a} Theta_e(a) S_H(a/e) e(ax/e) |
                 <=  sum_{e,a} |Theta_e(a)| |S_H(a/e)|          <--- HERE
```

Taking the absolute value inside the `a`-sum discards every cancellation among
the `phi(e)` frequencies of each modulus, and the `e`-sum runs over the
divisors of some `q_i <= D^2`, at most `min(2^pi(z), z^{2s})` moduli: every
divisor of `P(z)` at `z <= 19`, 6035 of 16383 at `z = 47`, polynomially many
from `z = 223` on (`verify-0830-usup-convention.md` S3; corrected 2026-08-30).
Any bound keeping `u` fixed must therefore retain the phase
`e(2a*inverse(e1)/e2)` and exploit cancellation across `a`. But that phase sits
beside `e(ax/e)`: keeping one means keeping the other, and the position `x`
re-enters. **The moment the estimate is strong enough it is a statement uniform
in `x`, which is this project's recurring wall; the moment it is only a mean
value it is too weak by a factor measured to grow geometrically over
`z = 13..47` and bounded at fixed `s` by `z^{2s+o(1)}`
(`attack-0829n-rml-proof.md` §4.1, PROVEN; corrected 2026-08-30).** Both halves of that
dichotomy are measured here rather than argued, which is new.

That is also the precise slot Brüdern-Fouvry fill with Deshouillers-Iwaniec.
`Theta_e(a)` carries their RIGHT factor — a modular inverse, by attack 1's
Theorem B — so cancellation across `a` in
`sum*_a Theta_e(a) S_H(a/e) e(ax/e)` is a Kloosterman-sum estimate uniform in
`x`. §7b's location of the transfer failure at one factor, `e(-hN/(d1 d2))`, is
the same sentence in their variables.

**What survives, and it is not nothing.** The chain gives a legal, unconditional,
worst-position exponent at every finite `z` that it reaches, with no hypothesis
anywhere in it: every window of 198, 683, 1833, 4278, 10384, 20586, 52989,
103823, 170378 consecutive integers contains an `r` with `r` and `r+2` both
`z`-rough, at `z = 13` through `43`. These are exact finite verifications rather
than asymptotic theorems, and they are the only worst-position numbers in this
corpus carrying no quantifier debt. What is reachable as a theorem at fixed
`s` is `Ssat <= CAP(z) <= z^{2s} (2s ln z + 1) 6 prod_{p<z} (1 + 2/p)^2`
(`attack-0829n-rml-proof.md` §4.1, PROVEN), giving

```
    G2(P(z))  <=  z^{2s + o(1)},
```

polynomial in `z`, exponent 6 at `s = 3.0` and `2(1+sqrt e) = 5.2974` at
`s` down to `1+sqrt e`, the trivial-level exponent (`attack-0829n-rml-proof.md`
§2 C3-triv, §4.1), above `β₂ = 4.26645` at every admissible `s`. A bound of
the shape `Ssat <= A * C^{pi(z)}` is weaker than this from `z = 331` on at
`C = 2.0516` and is not the end of the route (this paragraph replaced
2026-08-30 per `verify-0830-usup-convention.md` §3.2; it had read
"superpolynomial in z"). **It is weaker than `β₂`, the standing exponent this
attack exists to beat, though not incomparably so.** Saying that
plainly is the honest end of this route in its absolute-value form. (For scale:
the one-class analogue has had a polynomial bound since Iwaniec 1978,
`h(k) ≪ (k log k)²` in `k = π(z)`; the two-class problem has no published
upper bound at any exponent, as `research/covering-dive.md` records, so the
comparison that matters here is against `β₂` and not against a Jacobsthal-type
theorem that does not exist for `G₂`.)

---

## 5. THE TWO REPRESENTATIONS: §7b AGAINST ATTACK 1 §5(a)

`sift-limit-attack.md` §7b finding (3): `Σ|r|` reaches **0.978** of the trivial
pair-count bound at a CRT-constructed worst position, so "`θ_total ≤ 1` is a
genuine ceiling on any absolute-value method". Attack 1 §5(a): the Fourier
absolute-value bound is **74×, 79×, 79×, 81×** smaller at `z = 13..23`, "a flat
factor, not a shrinking one", so that is a ceiling on the REPRESENTATION and not
on the problem. Both are in the corpus and they pull opposite ways.

**Resolved: attack 1 wins on the constant, §7b wins on the rate, and the rate is
what decides the exponent.** The clean comparison is between the two H-free
absolute-value bounds — `N`, the term count, in the divisor-pair basis, and
`Ssat` in the Fourier basis — because both are exactly what taking absolute
values yields, with no `H` in either and no choice of comparison window.

```
  z     N        Ssat        N/Ssat    Ssup(nP)   N/Ssup(nP)   Var(c)      SCS/Ssat
  13     852  1.9602e+1     43.5    11.4467        74     5.792e-2   4.26e+0
  17    2236  5.0314e+1     44.4    28.4118        79     4.984e-2   1.00e+1
  19    4764  1.2006e+2     39.7    60.0382        79     4.652e-2   2.05e+1
  23    9636  2.4250e+2     39.7   118.3280        81     4.328e-2   3.14e+1
  29   20700  5.2311e+2     39.6      --         --       3.878e-2   4.82e+1
  31   35868  9.5263e+2     37.7      --         --       3.665e-2   6.62e+1
  37   76484  2.5727e+3     29.7      --         --       3.365e-2   1.35e+2
  41  125884  4.6495e+3     27.1      --         --       3.237e-2   1.87e+2
  43  183084  7.1072e+3     25.8      --         --       3.148e-2   2.13e+2
  47  293980  1.2623e+4     23.3      --         --       3.040e-2   2.79e+2
```

Three readings.

**(a) The Fourier basis is genuinely far better, and decisively so at any fixed
`z`.** `N/Ssat` is 23 to 44 across the whole range. The divisor-pair
absolute-value bound yields no usable exponent at all — `N` exceeds `H·M` until
`H` is enormous — while `Ssat` yields 2.29 to 3.43. **Attack 1 is right that the
0.978 constant is a fact about the divisor-pair representation and not about the
problem.**

**(b) But the advantage is NOT a flat factor.** `N/Ssat` falls monotonically from
44.4 at `z = 17` to **23.3 at `z = 47`**, a factor 1.9 over the range, with no
sign of levelling. Attack 1's "74×, 79×, 79×, 81× — a flat factor, not a
shrinking one" was measured as `N/Ssup(nP)` at `H = nP`, a comparison window
that itself moves with `z`; the `H`-free comparison shrinks. **The word "flat"
does not survive the extension.**

**(c) And the number that decides the exponent is the loss AGAINST THE TRUTH,
which grows geometrically in BOTH bases at nearly the same rate.** At `z = 13..23`
where the true `sup|R|` is computable: the Fourier loss `Ssup(nP)/sup|R|` is
4.32, 5.77, 8.78, 15.14, growing about 1.52× per added prime; the divisor-pair
loss `N/sup|R|` is 322, 454, 697, 1232, growing about 1.56×. **Same rate,
different constant.** From `z = 29` up only the rms floor is available, and
`Ssup/rms` — an upper bound on the same loss — reaches 309.84 at `z = 43` (§2),
still growing geometrically. **So the absolute-value step
costs a factor exponential in `π(z)` in every basis tried; the change of basis
buys a constant of 30–80, not a better rate — and it is the rate that sets the
exponent.**

`SCS/Ssat`, attack 1's Cauchy–Schwarz relaxation, runs 4.26 → 279 over the ten
levels: 1.60× per step on average but only 1.20× over the last four, so it is
decelerating and still growing. It remains the wrong target; `Ssat` remains the
right one.

So the two claims were never really in conflict: §7b measured a ceiling at one
`z` in one basis, attack 1 measured a constant between two bases at four `z`, and
neither measured the rate. The rate is the thing, and in both bases it is
geometric in `π(z)`.

---

## 6. CORRECTIONS TO THE RECORD

Six, none of them large, all in `attack-beta2-01-lemmaV-meansquare.md` §5 or
`sift-limit-attack.md` §7b/§7c. Listed for the parent session to harvest; no
shared document was edited here.

**C1. `H_sup` is not the minimum of the instrument, because closure is not
monotone in `H`.** Attack 1's protocol — geometric grid, then every integer in
the last gap — returns the first `H` its grid reaches, which equals
`min{H : H·M > Ssup(H)}` only if the predicate is an up-set. It is not. Testing
every integer `H` from 8 to `2·H_sup`: at `z = 13` and `z = 19` the published
value IS the minimum and there are no later failures; at `z = 17` the true
minimum is **659**, not the published **683**, and closure fails again at 21
values of `H` above it. The overshoot is 3.64% in `H`, 0.0126 in `u`. Every
`u_sup` in this corpus, attack 1's and this file's alike, is therefore an UPPER
estimate. The bias is one-signed and works against a plateau reading.

**C2. "It would cross `β₂` near `z = 45`" (attack 1 §5(c) and READING 6) is 24%
low in `z`.** Their fit `u_sup = 0.2865·θ(z)/ln z + 1.197` reaches `β₂` at
`θ(z)/ln z = 10.7136`, first attained at `z = 59`; at `z = 45` the same fit gives
`u = 3.9900`. A small slip. It does not touch the shape claim, and the shape
claim is what this file tests.

**C3. "A flat factor of about 80" (attack 1 §5(a) and READING 6) is not flat.**
It was measured as `N/Ssup(nP)` at `H = nP`, a comparison window that changes
with `z`. The `H`-free ratio `N/Ssat` falls monotonically from 44.4 at `z = 17`
to **23.3 at `z = 47`**, a factor 1.9 across the range, with no sign of
levelling. The Fourier advantage is real and large (23–44×) and it is eroding.

**C4. Attack 1 over-priced its own next step by about 550×, which is why the
ladder stopped at 23.** It states that `z = 29` "needs `prod(2p−1) = 7.8e10`
evaluations of `Theta_e(a)`" and is "an overnight run as written". The true
term-by-term count is **9.185e7**. `Π_{p<z}(2p−1)` counts every `e | P(z)`, but
`e` must divide some `q_i = [d1,d2]` with `d1, d2 ≤ D = z^s`, which caps `max e`
at **3.432e6** against `P(29) = 2.23e8`. (`Π_{p<29}(2p−1)` is also 5.06e10 rather
than the 7.8e10 quoted, so the over-pricing is 550× against the correct product
and 850× against the figure as stated.) Even term by term, `z = 29` is seconds,
not a night; the whole ladder to `z = 43`, window scan included at every level,
runs in **1345 s** on one core.

**C5. §7b's "`θ_total ≤ 1` is a genuine ceiling on any absolute-value method" is
right for a reason it does not give.** The ceiling is not the 0.978 constant at
one constructed position. It is that the absolute-value step costs a factor
GEOMETRIC IN `π(z)`, and §5 measures that factor in both bases at nearly the
same rate. The constant differs by 30–44×; the rate does not.

**C6. "`u_sup` carries no quantifier problem" (§7c's box, attack 1 §5(d)) is true
and is not free.** It is exactly right that `sup_x |R_H| ≤ Ssup(H)` has no
quantifier debt. §4 prices what buying that costs: the same step that removes the
position variable is the step that loses `C^{π(z)}`. Both halves belong in the
same sentence, and the second half is why `u_sup` rises.

*No floor at `β = 4` is invoked anywhere above.* The `u_sup` values land between
2 and roughly 3, and nothing here treats that band as bounded below by an
axiom-class sifting-limit floor; the coordinator's withdrawal of that claim from
§7c is consistent with everything measured here, which never needed it.

---

## 7. COVERAGE, AND WHERE I AM MOST LIKELY WRONG

### What I did not reach, and why

* **`u_sup` stops at `z = 43`, `u_sat` at `z = 47`.** The full run is 1345 s, of
  which `z = 43` alone is 670 s and `z = 47` (H-free only) is 109 s. The spectral
  sum roughly triples per level and the window scan multiplies it by about 15, so
  `u_sup` at `z = 47` is of order an hour and at `z = 53` several hours. I stopped
  there because the next level costs about three times the last and the verdict
  had been stable across the previous three additions: `z = 37`, `41` and `43`
  each landed below attack 1's shape by a widening margin, and each left every
  fitted model still crossing `β₂`.
* **`z = 53` was priced and not run.** The spectrum there is `#(e,a) = 3.362e10`,
  `term-by-term 2.491e11`, `max e = 4.590e8`, `N = 466,340`, and
  `spectralRecords` alone takes 24.3 s. `Ssat` at `z = 53` is roughly a quarter
  of an hour; the `H`-scan is several hours. That is the next affordable level
  and it buys one point.
* **Only `s = 3.0` for `u_sup`.** S6 varies `s` for `u_sat` only, and only to
  `z = 31`.
* **The true `sup_x |R|` is known only to `z = 23`**, because it needs a walk over
  the full period `W = P(z)`. From `z = 29` up, the only floor under `Ssup` is the
  exact rms from the same spectral sweep, and `sup/rms` is then unmeasured.
* **The exhaustive up-set test reaches `z = 19`.** At `z = 23` it is 8,556 window
  lengths against 2.6e6 spectral points, which is affordable but was not run;
  above that it is not affordable at all.
* **I did not re-derive attack 2's CRT worst-position construction**, only
  compared the aggregate bounds the two representations give.
* **No lower bound on `Ssat` is proved here.** Everything about its growth is
  measured over nine levels.
* **Housekeeping, for the parent session:** `research/SCRIPTS.md` does not list
  `lemmaV-parseval.js` either, so the index is stale for the whole `beta2` wave,
  not just for this file. `node research/qc.js --index` regenerates it. It is a
  shared body document and was not edited here.

### Where I am most likely wrong

* **The geometric-in-`π(z)` reading of `Ssat`.** It rests on nine ratios running
  2.567 down to 1.776 with real scatter — a 2.701 at `31→37` sitting between a
  1.821 and a 1.807 — and a genuine downward drift, 2.27 over the first four
  steps against 1.91 over the last four. If the per-prime factor drifts toward 1
  fast enough, `u_sat` is bounded after all and §4's reading of the mechanism is
  too strong. Nine levels cannot see a slow drift, and I did not try to.
* **The bounded model's asymptote is badly determined, and §3(4) leans on it.**
  The best `A` is 5.4635, but its leave-one-out band on the crossing runs
  [1189, 2438], a factor 2, and the top-five refit moves `A` to 6.6351 and the
  crossing to 242, a factor 6 the other way. An asymptote is the hardest thing to
  estimate from the steep part of a curve. What the profile DOES support is the
  weaker and still decisive statement that `A ≤ β₂` costs 8.70× in RSS; the value
  5.46 itself should not be quoted.
* **The extrapolations are extrapolations.** Nine points spanning a factor 3.3 in
  `z`, used to locate a crossing between one and three orders of magnitude
  further out. The models agree on the direction and disagree on everything else.
  Nobody should quote a crossing `z` from this file as a number; the interval is
  the result.
* **The grid bias (C1) is measured at three levels only**, and at one of them it
  was 3.6% in `H`. If it grows with `z`, the high rows overstate `u_sup` by more
  than the printed bracket.
* **"The wall returns when you keep the phase" is an argument, not a
  measurement.** It says no third representation avoids both horns. I checked the
  two representations this corpus holds and did not search for a third.

> **Corrected 2026-08-20 (mismatch adjudication #30).** Both occurrences of
> `P(29)` above read `6.5e8` until this date. `P(z)` is `prod_{p<z} p` — the
> primes strictly below `z`, as `sift-limit-lemmaV.js`'s `primesBelow(z)`
> builds them — so `P(29) = 2 x 3 x ... x 23 = 223,092,870 = 2.23e8`. The S2
> cost table pins it: `max e` equals `P(z)` exactly at `z = 13, 17, 19`
> (2310, 30030, 510510), and the same prime set gives the `5.06e10` quoted
> beside it. Nothing produces `6.5e8`. The argument is unchanged: `max e` of
> `3.432e6` is 77x below `P(29)` rather than 190x.
