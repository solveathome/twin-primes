# ATTACK 9 staging: the anchored gap against the global gap (2026-08-18)

<!-- ledger
id: Q-anchored-vs-global-gap
status: CLOSED
todo: none
question: Is the anchored gap A(v) = F(v) - v easier to bound than the global gap G2(v#)?
verdict: The separation is real and correctly measured but worth exactly one unit of exponent against a deficit of 2.2665, and the anchored quantity's only proven bound is beta_2 = 4.26645, the IDENTICAL theorem rather than a consequence, because the DHR sieve is position-uniform; so the anchored object sits further from its bound, and Proposition D is a closure at today's exponent only.
-->

Object: `A(v) = F(v) - v`, where `F(v)` is the first twin slot of `T_v` above the
origin, against `G2(v#)`, the largest twin-slot gap anywhere in the tile. The
brief's premise was that the anchored quantity is three to four orders of
magnitude smaller than the global one, and that the difficulty of the programme
may therefore be an artifact of bounding the wrong thing.

**Verdict, in one line.** The separation is real, it is measured correctly, and
it is worth exactly **one unit of exponent** against a deficit of **2.2665**. The
anchored quantity has no proven bound of its own: the only bound it carries is
`beta_2 = 4.26645`, which is the *same theorem* as the global bound rather than a
consequence of it, because the DHR sieve that proves it is position-uniform. So
the anchored object is *further* from its proven bound than the global object is
from the same bound, not closer. Route closed, and closed for a different reason
than attack 10 gave.

---

## 0. Findings, ranked

1. **[PROVEN, and it is the crux] The proven bound on the anchored gap is not
   inherited from the global bound. It is the identical theorem.**
   `paper/beta2-note.md`:185-190 proves "**every interval of length z^{beta_2+eps}
   contains a twin candidate**, uniformly in the interval's position x", and then
   derives the global bound as a corollary: "Taking x to range over a period
   gives G2(n) << pn^{beta_2+eps}". The interval statement applies at the origin
   directly. Anchoring buys nothing in the proven layer, at any exponent.

2. **[MEASURED] The separation itself is exponent 1, not more.** Denoised over
   the ten exact levels, `G2(x#) / Abar(x) = (0.75 +/- 0.25) x`; against the worst
   `A` in each band, `(0.31 +/- 0.15) x`. On the 16-level certified ladder to
   x = 4001 it stays at exponent 1. The useful threshold is `v^2.2665`.

3. **[NEW, answers the coordinator's question 3] Statement (b), "anchored <=
   global / f(v)", is not TPC-equivalent as a schema, but it is dead by a
   dichotomy: at any strength that closes the band it is TPC-implying via the
   already-proven beta_2 theorem, and at any strength that is true it closes
   nothing.** The threshold is `f = v^{2.2665}`; the true ceiling is `v^{1+o(1)}`.
   There is no band of `f` in which (b) is both true and useful. Propositions A to
   E, section 6. Proposition E adds the symmetry that settles the premise: the
   anchored exponent cannot be proven below 2 either, because that is TPC, so both
   routes start at 4.2665 and finish at 2.

4. **[NEW, unconditional] The ratio route is strictly complementary to the Gap
   Reformulation, never a shortcut past it.** It requires
   `G2(v#) > 2 v^{beta_2 - 2} > v'^2` at every large v, so it is available only
   in the regime where the Gap Reformulation's own inequality fails everywhere.

5. **[CORRECTION to attack 10's stated reason, not to its verdict] Attack 10's
   loophole 2 evaluates the origin at the wrong end of the interval.**
   `rho(2) = e^{2gamma}/4 = 0.79305` is the value at the zone edge. The first slot
   sits at `u = 1.000000`, where `rho(1) = e^{2gamma} = 3.1722`, enriched by
   3.17x. The coordinator's reading is correct and is confirmed to the digit here,
   including against the exact Mertens product. Attack 10's conclusion survives on
   finding 1 instead; its clause "the origin is not a favoured position" is false
   and its clause "there is no discount for asking at the origin" is true only of
   the proof, not of the object. Section 7.

6. **[CALIBRATION] The premise's headline number mixes two normalisations the
   corpus has already ruled must not be traded**, and its `G2/window ~ 0.25 to
   0.32` input is exact only for x <= 37. Section 4.

7. **[MEASURED, new constant] The extremal anchored gap is
   `max A = (0.49 +/- 0.09) ln^3 v` per decade**, exhaustive to 1e11, flat over
   nine decades. This puts a constant on the "call it `ln^3 p` to be safe" guard
   `ZONE-POSTULATE.md` §4 uses without one. Section 2a. The typical gap is
   `E[A] = ln^2 v/(2C2)`, measured at 98.6% of that limit at v = 1e15.

---

## 1. Custody

Three numbers below are quoted from the corpus rather than recomputed here, and
they are flagged where they appear: `G2` at x = 29, 31, 37 (the tiles are too
large for a direct array in budget), the 16-level `Y2` certificate ladder, and
`window-check.js`'s exhaustive run to 1e11. Everything else was recomputed.

**The global ladder, from scratch.** Direct sieve of the full tile `T_x` mod
`x#`, no fold engine, marking residues coprime to `x#` and scanning for cyclic
gaps between `r` with `r, r+2` both coprime:

```
  x |            W |     slots |    G2 | custody |   F
  5 |           30 |         3 |    12 |  OK  12 |  11
  7 |          210 |        15 |    30 |  OK  30 |  11
 11 |         2310 |       135 |    42 |  OK  42 |  17
 13 |        30030 |      1485 |    66 |  OK  66 |  17
 17 |       510510 |     22275 |   108 |  OK 108 |  29
 19 |      9699690 |    378675 |   150 |  OK 150 |  29
 23 |    223092870 |   7952175 |   204 |  OK 204 |  29
```

Reproduces `G2 = 12, 30, 42, 66, 108, 150, 204` and the census
`D_23 = 7,952,175` exactly. Cost 1.4 s. `G2` at x = 29, 31, 37 (258, 348, 528) is
taken from the brief's established list and was not recomputed here; the tile at
x = 29 is 6.47e9 residues and out of budget for a direct array.

**The segmented sieve, at the top of its range.** In a 3,000,000-wide window at
v = 1e15 the sieve reports 3,261 twin pairs. Deterministic Miller-Rabin (bases 2
through 37) on all 6,522 members: **0 false positives**. An independent
Miller-Rabin sweep of a 60,000-wide subwindow found 69 pairs; the sieve found the
same 69, **identical lists**. Both directions checked, so neither false positives
nor misses.

**Calibration of the searches.** Every grep reported as empty in section 5 was
first run against a known positive. `grep -rn "Gap Reformulation"` returns 34
hits, so the pattern machinery works; the absence claims there are about specific
statements inside files that were opened and read, not about failed searches.

---

## 2. Reproduction, and the anchored ladder over odd v

**The four measured points reproduce exactly.**

```
   v |  F(v) | A=F-v | window v^2-v | A/window
  37 |    41 |     4 |         1332 | 0.3003%
 211 |   227 |    16 |        44310 | 0.0361%
1009 |  1019 |    10 |      1017072 | 0.0010%
2003 |  2027 |    24 |      4010006 | 0.0006%
```

**The odd-v extension is not a new object, and here is why.** For odd `v`, `v#`
means the primes up to `v`, so `T_v = T_p` for `p` the largest prime `<= v`, and
`A(v) = F(v) - v` where `F(v)` is the least twin-slot above `v`. Two consequences,
both worth stating because they bound the value of extending to odd v at all:

- The window `v^2 - v` is *larger* for composite odd `v` than for the prime below
  it, while the tile is the same. So the odd-v Zone Postulate is strictly weaker
  than the prime-v one, and no odd-v measurement can falsify anything the prime
  ladder does not already falsify.
- The extremal problem collapses to a known one. For odd `v` running between
  consecutive twin lower members `a < b`, `F(v) = b` throughout, so
  `max A = b - a - 2` attained at `v = a + 2`. **The exhaustive odd-v extremal
  anchored gap is exactly the maximal twin-prime gap minus 2** (OEIS A113274 for
  the record progression). That is a well-studied sequence, tabulated far past
  anything computed here, and it is the correct prior art for question 1's
  extremal half.

**The sampled ladder.** 10,000,000 odd `v` at each decadic height, first slot
found by segmented sieve. Base sieve to 3.162e7 (1,952,014 primes, 0.2 s); whole
ladder 42 s.

```
   height |    odd v |  mean A | median |    p99 |    max A | meanA/ln^2v | maxA/ln^2v |  max A/(v^2-v) | F<v^2
     1e+3 |     1e+7 |   177.4 |    124 |    814 |     2190 |      0.6830 |      8.430 |      2.190e-11 | yes
     1e+4 |     1e+7 |   177.5 |    124 |    814 |     2190 |      0.6832 |      8.429 |      2.186e-11 | yes
     1e+5 |     1e+7 |   178.0 |    124 |    816 |     2190 |      0.6845 |      8.419 |      2.147e-11 | yes
     1e+6 |     1e+7 |   181.8 |    128 |    830 |     2190 |      0.6916 |      8.331 |      1.810e-11 | yes
     1e+7 |     1e+7 |   201.4 |    142 |    916 |     2190 |      0.7126 |      7.749 |      5.475e-12 | yes
     1e+8 |     1e+7 |   245.7 |    172 |   1120 |     2658 |      0.7167 |      7.753 |      2.197e-13 | yes
     1e+9 |     1e+7 |   308.6 |    218 |   1370 |     3108 |      0.7179 |      7.230 |      3.047e-15 | yes
    1e+10 |     1e+7 |   387.8 |    270 |   1772 |     4662 |      0.7314 |      8.792 |      4.653e-17 | yes
    1e+11 |     1e+7 |   471.9 |    330 |   2162 |     4476 |      0.7356 |      6.977 |      4.475e-19 | yes
    1e+12 |     1e+7 |   565.5 |    394 |   2568 |     5532 |      0.7406 |      7.246 |      5.532e-21 | yes
    1e+13 |     1e+7 |   663.7 |    458 |   3074 |     7176 |      0.7408 |      8.009 |      7.176e-23 | yes
    1e+14 |     1e+7 |   771.7 |    540 |   3520 |     8550 |      0.7426 |      8.228 |      8.550e-25 | yes
    1e+15 |     1e+7 |   890.6 |    620 |   4122 |    11010 |      0.7466 |      9.229 |      1.101e-26 | yes
```

The guard `F(v) < v^2` held at every one of the 1.3e8 values of `v` sampled. That
is not new (`window-check.js` verified it exhaustively for every prime to 1e11),
and it cannot be more than a check, since it is statement (a).

**What the ladder costs and where it stops.** 42 s to 1e15 on one core. The stop
is arithmetic, not time: the segmented sieve's start-offset `ceil(lo/p)*p` must be
exact, and doubles are exact only below 2^53 = 9.007e15. Going past that needs
BigInt or a split representation and was not attempted.

**The law, with its band.**

- `E[A(v)] / ln^2 v` climbs monotonically 0.6830 to 0.7466 across twelve decades,
  against the Hardy-Littlewood waiting-time value `1/(2C2) = 0.75736`. At 1e15 it
  is **98.6% of the limit**. So the *typical* anchored gap is `ln^2 v / (2C2)`,
  and this is now measured rather than assumed.
- `max A / ln^2 v` over 1e7 samples per height: **6.98 to 9.23, no trend over
  twelve decades**. That flatness is an artifact of a fixed sample size and must
  not be read as a law: each height draws about `1e7/(2 E[A])` twin gaps, a count
  that *falls* with height, so the extremal factor is being held down by the
  sampling. The exhaustive scan below removes the artifact and the answer changes.
- `max A / mean A` runs 12.34, 12.34, 12.30, 12.05, 10.87, 10.82, 10.07, 12.02,
  9.48, 9.78, 10.81, 11.08, 12.36. Flat, for the same reason. Exponential tail.

### 2a. The exhaustive extremal scan, and the `ln^3` law with its constant

Every odd `v` to 1e11, segmented sieve, 1,204 s on one core (about 8.3e7
integers/s). By the reduction above this is the maximal-twin-gap table.

```
  decade of a |  max gap |  at a         | ln^2 a | gap/ln^2a | gap/ln^3a | maxA = gap-2
      10^ 2   |      150 |           659 |   42.1 |     3.560 |     0.549 | 148
      10^ 3   |      210 |          5879 |   75.3 |     2.788 |     0.321 | 208
      10^ 4   |      630 |         62297 |  121.9 |     5.169 |     0.468 | 628
      10^ 5   |     1452 |        850349 |  186.4 |     7.789 |     0.571 | 1450
      10^ 6   |     1722 |       9923987 |  259.5 |     6.635 |     0.412 | 1720
      10^ 7   |     2868 |      96894041 |  338.2 |     8.481 |     0.461 | 2866
      10^ 8   |     4770 |     698542487 |  414.7 |    11.502 |     0.565 | 4768
      10^ 9   |     6030 |    4289385521 |  491.9 |    12.258 |     0.553 | 6028
      10^10   |     8040 |   65095731749 |  620.0 |    12.968 |     0.521 | 8038
```

**Custody, two independent checks.** The `maxA` column at decades 1e0 to 1e6
reads 4, 28, 148, 208, 628, 1450, 1720 against `a3-06-origin-vs-max.js`'s worst
`F(x) - x` over *primes* x, which reads 6, 30, 150, 210, 630, 1452, 1722. The
difference is exactly 2 at every decade, which is what the odd-v reduction
predicts and is therefore a check on both. And the record at `a = 65,095,731,749`
reproduces `ZONE-POSTULATE.md` §4's "largest seen anywhere in the run is 8,042, at
p = 65,095,731,749" (8,042 is the distance to the *top* of the twin, so gap 8,040
is the same event).

> **The extremal anchored gap is `ln^3`, and its constant is
> `max A = (0.49 +/- 0.09) ln^3 v` per decade, flat over nine decades (band 0.321
> to 0.571, no trend).** `gap/ln^2 a` by contrast climbs 3.6 to 13.0 and is
> plainly not the right normalisation. This puts a measured constant on the "call
> it `ln^3 p` to be safe" guard that `ZONE-POSTULATE.md` §4 uses without one, and
> it is a different object from `maxgap-law.md` §8's localized `M(x, x'^2)/ln^3 x`
> flat at 3.2 to 3.7, which is the max gap *inside* one zone rather than the
> anchored gap across a decade.

Nothing in the verdict moves: `ln^3 v` is still exponent 0.

---

## 3. The joint ladder

Exact `G2`, `F` recomputed here, window `= x'^2 - 2`.

```
  x | G2(x#) |    F | A=F-x | window | G2/win | F/win  |  A/win  | F/G2   |  A/G2   | G2/(x ln^2x) | f_max=G2/A
  5 |     12 |   11 |     6 |     47 | 0.2553 | 0.2340 | 0.12766 | 0.9167 | 0.50000 |       0.9265 |        2.0
  7 |     30 |   11 |     4 |    119 | 0.2521 | 0.0924 | 0.03361 | 0.3667 | 0.13333 |       1.1318 |        7.5
 11 |     42 |   17 |     6 |    167 | 0.2515 | 0.1018 | 0.03593 | 0.4048 | 0.14286 |       0.6640 |        7.0
 13 |     66 |   17 |     4 |    287 | 0.2300 | 0.0592 | 0.01394 | 0.2576 | 0.06061 |       0.7717 |       16.5
 17 |    108 |   29 |    12 |    359 | 0.3008 | 0.0808 | 0.03343 | 0.2685 | 0.11111 |       0.7914 |        9.0
 19 |    150 |   29 |    10 |    527 | 0.2846 | 0.0550 | 0.01898 | 0.1933 | 0.06667 |       0.9106 |       15.0
 23 |    204 |   29 |     6 |    839 | 0.2431 | 0.0346 | 0.00715 | 0.1422 | 0.02941 |       0.9022 |       34.0
 29 |    258 |   41 |    12 |    959 | 0.2690 | 0.0428 | 0.01251 | 0.1589 | 0.04651 |       0.7846 |       21.5
 31 |    348 |   41 |    10 |   1367 | 0.2546 | 0.0300 | 0.00732 | 0.1178 | 0.02874 |       0.9520 |       34.8
 37 |    528 |   41 |     4 |   1679 | 0.3145 | 0.0244 | 0.00238 | 0.0777 | 0.00758 |       1.0945 |      132.0
```

Two columns deserve to be lifted out.

**`G2/(x ln^2 x)` is flat at 0.66 to 1.13 with no trend.** That is `G2(x#) ~ c x
ln^2 x` with `c` near 0.9, which is the Maier-Pomerance shape `g(x#) = x (log
x)^{2+o(1)}` transferred through `G2 >= g` (`two-class-lower-bounds.md` §3, CONJ
line). It is also what makes the exponent accounting below possible: **the global
object sits at exponent 1**, and the corpus's own fitted 1.57 with bracket
[1.3, 1.9] (`exponent-control.md`) is that same object read on a ten-point ladder
where a `ln^2` factor masquerades as exponent.

**`f_max = G2/A` is the whole of the anchored advantage.** It is the largest `f`
for which statement (b) can be true at that level.

---

## 4. The ratio trend, its band, and a calibration on the premise

**The pointwise ratio cannot carry a trend, and must not be read as one.** `A(x)`
takes the values 6, 4, 6, 4, 12, 10, 6, 12, 10, 4 across x = 5 to 37. It
fluctuates by a factor 3 between adjacent rungs while the trend across the whole
ladder is a factor 66. Reading `A/G2` down the column, 0.500 to 0.0076, is
reading a trend out of ten draws from a distribution whose spread is comparable
to the trend. The adjudicator's own lesson applies to the adjudicator's premise.

**Denoised.** Replace `A(x)` by its statistics over odd `v` in `[x, 4x]`:

```
  x | G2(x#) | A(x) | Abar | Amax | band n | G2/Abar | (G2/Abar)/x | G2/Amax | (G2/Amax)/x
  5 |     12 |    6 |  5.8 |   12 |      8 |     2.1 |       0.42  |     1.0 |      0.20
  7 |     30 |    4 |  5.5 |   12 |     11 |     5.5 |       0.79  |     2.5 |      0.36
 11 |     42 |    6 |  7.6 |   18 |     17 |     5.5 |       0.50  |     2.3 |      0.21
 13 |     66 |    4 |  8.4 |   18 |     20 |     7.9 |       0.61  |     3.7 |      0.28
 17 |    108 |   12 |  8.2 |   18 |     26 |    13.1 |       0.77  |     6.0 |      0.35
 19 |    150 |   10 |  9.9 |   30 |     29 |    15.1 |       0.79  |     5.0 |      0.26
 23 |    204 |    6 | 11.6 |   30 |     35 |    17.6 |       0.77  |     6.8 |      0.30
 29 |    258 |   12 | 12.6 |   30 |     44 |    20.4 |       0.70  |     8.6 |      0.30
 31 |    348 |   10 | 13.0 |   30 |     47 |    26.7 |       0.86  |    11.6 |      0.37
 37 |    528 |    4 | 12.0 |   30 |     56 |    44.0 |       1.19  |    17.6 |      0.48
```

> **The ratio, with its band.** `G2(x#)/Abar(x) = (0.75 +/- 0.25) x` and
> `G2(x#)/Amax(x) = (0.31 +/- 0.15) x`. Both are **exponent 1 in x, flat**, with
> no residual trend after x = 13. The anchored/global ratio therefore *shrinks*
> like `1/v`, which is the answer to question 2: shrinking, at exponent 1,
> with the band above.

**Extended by the certified ladder** (16 levels, `two-class-lower-bounds.md` §5;
`Y2 <= G2 - 1`, so `Y2/A` is a *lower* bound on `f_max` and every shortfall below
is an *upper* bound on the true shortfall, the reading most generous to the
route):

```
   x  |    Y2   |  F(x) |  A | Abar[x,4x] | f_max >= Y2/A | need x^2.2665 | shortfall <= | Y2/x^2  | Y2/(x ln^2x)
   37 |     355 |    41 |  4 |       12.0 |            89 |      3.583e+3 |      4.04e+1 | 0.25931 | 0.7359
  113 |    2501 |   137 | 24 |       19.0 |           104 |      4.500e+4 |      4.32e+2 | 0.19586 | 0.9904
  229 |    6748 |   239 | 10 |       37.6 |           675 |      2.231e+5 |      3.31e+2 | 0.12868 | 0.9980
  421 |   16453 |   431 | 10 |       39.4 |          1645 |      8.868e+5 |      5.39e+2 | 0.09283 | 1.0703
  773 |   39277 |   809 | 36 |       41.3 |          1091 |      3.515e+6 |      3.22e+3 | 0.06573 | 1.1489
 1009 |   56213 |  1019 | 10 |       37.5 |          5621 |      6.429e+6 |      1.14e+3 | 0.05521 | 1.1645
 1699 |  118367 |  1721 | 22 |       41.6 |          5380 |      2.094e+7 |      3.89e+3 | 0.04101 | 1.2594
 2003 |  144712 |  2027 | 24 |       44.2 |          6030 |      3.042e+7 |      5.04e+3 | 0.03607 | 1.2500
 3001 |  245270 |  3119 |118 |       48.5 |          2079 |      7.604e+7 |      3.66e+4 | 0.02723 | 1.2749
 4001 |  356711 |  4019 | 18 |       58.0 |         19817 |      1.459e+8 |      7.36e+3 | 0.02228 | 1.2960
```

Denoised with `Abar`, the shortfall runs 121 at x = 37 to 23,720 at x = 4001, a
factor 196 over a 108-fold range in x, i.e. **shortfall exponent 1.13 measured
against 1.2665 predicted**. The route falls further behind at every level, and
the direction is unambiguous even though the constant is not.

**Calibration on the premise, two items.**

1. The brief compares `A/window` against `G2/window`. Those are different
   normalisations, and `ZONE-POSTULATE.md` §5 with `a3-06-origin-vs-max.js`
   reading 7 already ruled that they must not be traded: the Gap Reformulation's
   argument bounds `F + 1`, not `A`, because it reads forward from the tile's slot
   at `W - 1`. Apples to apples, the quantity the Gap Reformulation's own argument
   produces is `F/G2`, which runs 0.9167 down to 0.0777 across x = 5 to 37, a
   factor 12, not `10^3` to `10^4`. The extra three orders are the bookkeeping
   factor `v/(F - v) ~ v/ln^2 v`. **Both readings agree on the exponent, which is
   the only part that matters, so the premise's conclusion is unharmed and its
   headline number is inflated.**

2. "`G2/window` sits around 0.25 to 0.32 at every computable level" is exact only
   for x <= 37. The certificate ladder's own share of the window collapses
   monotonically, `Y2/x^2` from 0.25931 to 0.02228 over x = 37 to 4001
   (`two-class-lower-bounds.md` §10 states the one-sidedness of that inference
   explicitly). Extending the flat 0.3 to v = 2003 inflates the separation from a
   certified `>= 6030` (3.8 orders) to a modelled `~ 5e4` (4.7 orders). The
   certified figure is the one to quote.

---

## 5. Proven versus measured: the exact inventory

### Proven about the anchored gap, complete

1. **`F(x) + 1 <= G2(x#)`.** Trivial: `x# +/- 1` are both coprime to `x#`, so the
   tile carries a slot at `W - 1`, and `F + 1` *is* one of the tile's gaps, the
   one closing the cycle. `two-class-lower-bounds.md`:571 states it as
   `G2(x#) >= F(x) + 1 >= x'`.
2. **`F(x) >= x'`.** Trivial.
3. **`F(x) <<_eps x^{beta_2 + eps}`, `beta_2 = 4.26645028414864191641`.** And
   this is the finding that decides the attack. It is *not* a corollary of the
   `G2` bound. `paper/beta2-note.md`:185-190:

   > The main term dominates by the factor `z^{eps/2}/log^9 z -> inf`. Hence
   > `S(A, z) > 0`: **every interval of length `z^{beta_2+eps}` contains a twin
   > candidate**, uniformly in the interval's position `x` (uniformity is free:
   > (*) holds for every `x` with the same constants...). Taking `x` to range
   > over a period gives `G2(n) <<_eps p_n^{beta_2+eps}`.

   The interval statement is the theorem and the global gap bound is its
   corollary. The origin is one interval among the others, with the same
   constants. **The anchored quantity's proven bound and the global quantity's
   proven bound are one theorem with one exponent.**
4. **Nothing else.** `a3-06-origin-vs-max.js` reading 9 is the complete inventory
   and says so: "WHAT IS STILL PROVABLE ABOUT F WITHOUT G2, which is little...
   `F < G2` is proven and trivial... That is structure, but it bounds nothing."
   Reading 8 states the negative directly: "no PROVEN bound on F that does not
   route through G2."

**Absence claim, calibrated.** An unconditional bound `F(x) << x^theta` from
Chen's theorem or from almost-prime results is **not on record** in this corpus.
`bv-import-survey.md` §4 recasts Chen as an anchored *bias* statement
`beta_Chen(x) >= c`, a density claim with no height content, and marks the
tile-native reproof as an unexecuted assessment.
`attack-09-chen-theta.js` is purely empirical (parity price 8%, Chen territory
2.0x) with no first-occurrence content. `THE-DIALS.md`:89-90 attaches
`u ~ 4.27` to almost-prime pairs, which is the same `beta_2` sieve, not an
independent route. `sift-limit-attack.md`:344-350 records the systematic
literature negative. The producer files were opened, not merely grepped.

**Worth recording, since it was derived here and it loses.** Chen's theorem *does*
give an unconditional height bound. In the classical statement the `P_2` carries
prime factors above `X^{1/10}`, so a Chen prime `r <= X` is a slot of `T_v` for
`v = X^{1/10}`; the count `>> X/ln^2 X` far exceeds `v = X^{1/10}`, so one such
`r` lies above `v`, giving `F(v) << v^{10+o(1)}`. Against `beta_2 = 4.2665` that
is worse by a factor `v^{5.7}`. Chen's switching principle buys the almost-prime
side and pays for it in sifting depth, and for this question the pure dimension-2
sieve is the better instrument.

**One live lead falls out of that calculation, and it is the only constructive
thing in this report.** The exponent 10 above is driven entirely by the `1/10` in
the classical Chen statement, which is not the best published constant and was not
chased here. More to the point, the object actually needed is weaker than Chen's:
not "`r` prime and `r+2` a `P_2`" but only "`r` and `r+2` both free of prime
factors below `X^{1/theta}`", which is a pure dimension-2 sifted-set question.
**Any published almost-prime result of that shape with `theta < 4.2665` lowers the
anchored exponent immediately.** It does not close anything by itself, because of
the floor below, but by the Corollary in section 6 a *global* bound at
`theta <= 3` combined with (b) at its true strength does close it. A literature
pass on the best two-sided rough-pair exponent is cheap and was not done.

### Measured about the anchored gap

- `E[A(v)] = ln^2 v/(2C2) (1 - o(1))`, at 98.6% of the limit at v = 1e15, over
  1.3e8 sampled v (section 2).
- `max A(v) = (6.98 to 9.23) ln^2 v` over 1e7 samples per height, twelve decades,
  no trend.
- `F(v) < v^2` at every v tested here and at every prime to 1e11
  (`window-check.js`).

### The gap between them, stated as an exponent

|  | true exponent | proven upper bound | needed | proven-to-needed |
|---|---|---|---|---|
| global `G2(v#)` | 1 (`c v ln^2 v`, measured/conjectural) | `beta_2 = 4.2665` | 2 | 2.2665 |
| anchored `A(v)` | 0 (`ln^2 v`, measured) | `beta_2 = 4.2665` (same theorem) | 2 | 2.2665 |

> **The answer to question 3.** The anchored gap is smaller than the global gap
> only as a measurement. Provably, `F < G2` and nothing more, and the one
> quantitative bound either object carries is the same sifting limit. The
> anchored object is **further** from its proven bound than the global object is
> from that same bound, by a full unit of exponent. Being three to four orders
> smaller has increased the unproven slack, not reduced the proof burden.

---

## 6. Trap 2: statement (a) against statement (b)

**(a) "the first slot after v lands before v^2, for infinitely many v" is
TPC-equivalent.** Confirmed, and the mechanism is crystallization: a slot below
`v'^2` has both members free of every prime `<= v` and is below the square of the
next prime, so both are prime; the pair exceeds `v`, and `v -> inf`. Dead by
trap 2, and it is exactly what the sampled ladder verifies rather than proves.

**(b) "anchored <= global / f(v)" is a combinatorial statement about the tile,
and it is not TPC-equivalent as a schema.** It asserts a relation between two
finite computable functions and makes no primality claim. The adjudicator's
reading is right on that point. What follows is the dichotomy that decides it
anyway.

Write `B(v)` for any proven upper bound on `G2(v#)`; currently
`B(v) = C_eps v^{beta_2 + eps}`.

> **Proposition A (the f-threshold).** Suppose (b) holds and is combined with `B`
> to conclude the Zone Postulate. The derived bound is `A(v) <= B(v)/f(v)`, and it
> lands inside the window exactly when `B(v)/f(v) < v'^2 - v`. So the route
> requires
> `f(v) > B(v)/(v'^2 - v) = v^{beta_2 - 2 - o(1)} = v^{2.2665 - o(1)}`.

> **Proposition B ((b) at useful strength is TPC-implying).** If (b) holds with
> `f(v) >= v^{beta_2 - 2 + eps}` for infinitely many v, then with the *already
> proven* `B` it gives `F(v) < v'^2` for infinitely many v. That is statement (a),
> which is TPC. So (b) at any strength that closes the band does not evade trap 2;
> it routes into trap 2 through a theorem that is already on the books.

> **Proposition C ((b) at true strength closes nothing).** (b) holds with `f` if
> and only if `f(v) <= G2(v#)/A(v)`. Measured, that ceiling is `(0.75 +/- 0.25) v`
> denoised and `(0.31 +/- 0.15) v` against the worst `A` in each band, and it
> stays at exponent 1 across the 16-level certified ladder to x = 4001
> (section 4). So the true ceiling is `v^{1+o(1)}` against a useful threshold of
> `v^{2.2665-o(1)}`. Shortfall `v^{1.2665}`, measured growing at exponent 1.13
> over a 108-fold range in x.

> **Proposition D (unconditional, and the one that does not depend on any model).**
> Since `A(v) >= 2` always, (b) at the strength Proposition A requires entails
> `G2(v#) >= 2 f(v) > 2 v^{beta_2 - 2 - o(1)}`, and `beta_2 - 2 = 2.2665 > 2`, so
> it entails `G2(v#) > v'^2` at every large v. **The ratio route is available only
> in the regime where the Gap Reformulation's own inequality fails everywhere.**
> The two routes are strictly complementary. (b) can never be a shortcut past the
> Gap Reformulation's open band; it activates only if the pessimistic side of that
> band turns out to be the truth.

> **Corollary (what (b) is worth, exactly).** One unit of exponent. At its true
> strength, (b) converts a proven `G2 << v^theta` into a proven `A << v^{theta-1}`.
> It closes the Zone Postulate precisely when `theta <= 3`, and not before. It
> supplies no part of the descent from 4.2665 to 3.

> **Proposition E (the anchored exponent has the same finish line, and it is
> TPC).** Any proven bound `F(v) << v^{2-eps}` valid for all large v is TPC. By
> crystallization the slot it produces below `v'^2` is a genuine twin pair above
> `v`, and `v -> inf`. So the anchored exponent can no more be proven below 2 than
> the global one can. **Both routes start at the same proven exponent 4.2665 and
> end at the same unreachable finish line 2.** The anchored reformulation changes
> the size of the object by a factor `v` and changes neither endpoint. That is the
> whole answer to the brief's premise: the difficulty is not an artifact of
> bounding the wrong thing, because both things are bounded by one theorem and
> both need the same exponent.

**A direct check that the true `f` really is at exponent 1 and no higher.** Test
`f(v) = v` pointwise at the ten exact levels: `A(x) <= G2(x#)/x` holds at 5 of 10
and **fails at 5** (x = 5, 11, 17, 19, 29). Against the band maximum in `[x, 4x]`
it fails at all 10. So even `f(v) = v` is already too strong to be true as
stated; the honest true form carries a `1/polylog`, and the ceiling is
`v^{1-o(1)}`, on the wrong side of 1 rather than the right one.

**Where this leaves the adjudicator's ranking.** (b) was rated the most valuable
open target on the board on the grounds that it is not TPC-equivalent. It is not
TPC-equivalent, and it is still not a target: there is no band of `f` in which it
is both true and useful. The gap between its true ceiling `v^{1+o(1)}` and its
useful threshold `v^{2.2665}` is a factor `v^{1.2665}`, which is the Gap
Reformulation's own open band re-coordinatized. Same wall, new clothes, and the
corpus has a name for that pattern already.

**Trap 1 check.** Nothing above reduces to capacity counting. The objects are a
first-occurrence height and a maximum gap, and neither is a sum of `2/p`. Clear.

---

## 7. The u-position, and a correction to attack 10's dismissal

Attack 10's loophole 2 reads: "That would be a weaker requirement if the origin
were a favoured position. It is not... At the zone width, origin/mean = rho(2) ->
e^{2gamma}/4 = 0.79305, so the origin carries 21% *less* than the mean density...
G2 is the right object and there is no discount for asking at the origin."

Split that into its two claims, because they do not stand or fall together.

- **"The origin is not a favoured position": wrong, and the cited number is
  evaluated at the wrong end of the interval.** `rho(2)` is the density at the
  zone *width*, which is where the last slot of the zone sits. The first slot sits
  at `u = 1`.
- **"There is no discount for asking at the origin": right about the proof,
  wrong about the object.** The object carries a discount of `(0.75 +/- 0.25) v`,
  measured (section 4). The *proven bound* carries no discount at all, because it
  is the same theorem (section 5, finding 1). Attack 10's conclusion survives; its
  reason does not, and the surviving reason is a different one.

**Which u the first-slot question lives at, derived rather than assumed.** In the
Unification Law, `u = ln(position)/ln(level)` on `1 <= u <= 2`, and
`rho(u) = e^{2gamma}/u^2` is the slot density at that position in units of the
tile's own mean slot density. Derivation, independent of the law: the local twin
density at height `X = v^u` is `2C2/ln^2 X = 2C2/(u^2 ln^2 v)`; the tile's mean
slot density is `1/m(v)` with `m(v) = 2 prod_{3<=p<=v} p/(p-2)`; and Mertens gives
`m(v) ~ e^{2gamma} ln^2 v/(2C2)`, so the ratio is `e^{2gamma}/u^2`. **Verified
here with the exact product:** `m(v)/(ln^2 v/(2C2))` measures 3.1725, 3.1726,
3.1725, 3.1724, 3.1723, 3.1654 at v = 1e3 to 1e8 against `e^{2gamma} = 3.17222`.

The first slot sits at `F(v) = v + O(ln^2 v)`, so
`u = ln(F(v))/ln(v) = 1 + O(ln ln v / ln v)`. Measured: 1.02843 at v = 37,
1.01366 at 211, 1.00143 at 1009, 1.00157 at 2003, and 1.0000000 at v = 6.5e10 and
v = 1e15.

> **The question lives at `u = 1`, where `rho(1) = e^{2gamma} = 3.1722`, enriched
> by 3.17x. `rho(2) = 0.79305` is the density at the far edge of the zone.**
> Attack 10 transferred a verdict about the count in `[0, x'^2]` to a question
> about the first slot above `v`. The coordinator's reading is correct.

**Does the enrichment actually control the gap?** Partly, and the split matters,
because it is the same split that killed calm-implies-concentration in
`natal-cap-31`.

- **The mean: yes, exactly.** If `rho(1)` governs, then `E[A] = m(v)/e^{2gamma}`.
  Measured `m(v)/E[A]` against `e^{2gamma}`: ratio 1.1390, 1.1380, 1.1297, 1.1009,
  1.0552, 1.0647 at v = 1e3 to 1e8, converging on 1. Density controls the typical
  anchored gap to within 6% at 1e8, and the residual is the usual `ln^2`
  convergence. This is a real correction to the record: the origin's advantage on
  the first-slot question is `e^{2gamma} = 3.1722`, not `0.79305`, and it runs the
  other way.
- **The extreme: no.** `max A / E[A]` is flat near 10 to 12 across every height,
  and density predicts nothing about it. The strong Zone Postulate is a uniform
  statement, so the extreme is what it needs, and density is silent there.

**And it does not reopen the route.** `e^{2gamma} = 3.1722` is a constant. The
deficit is an exponent, 2.2665 of it. `a3-06` reading 12 already priced exactly
this constant and drew the same conclusion for the counting route. The correction
is worth making because a wrong reason for a right verdict is a defect the QC
framework hunts, but the verdict does not move.

---

## 8. The log-modulus check

Requested by the coordinator after a sibling brief's error. **This attack uses no
log-modulus conversion in either direction.** Every quantity here is an integer
or a ratio of integers at the integer scale: `A(v)`, `F(v)`, `G2(v#)`,
`v'^2 - 2`, `Y2`. The one place the two scales meet is the standard remark that
the window `v^2` equals `(ln v#)^2` because `ln(x#) = theta(x) ~ x`, which is the
correct direction and is used only as commentary in section 5's exponent table,
never inside a calculation. Nothing here was computed with `2v`, and nothing needs
redoing.

---

## 9. COVERAGE: what was not reached, and where this is likely wrong

**Not reached.**

- **`G2` beyond x = 37 remains unknown, and that is the binding limit on the whole
  comparison.** The joint ladder is ten rungs long. Everything past it uses `Y2`,
  a certified *lower* bound, which constrains the ratio only in the direction that
  favours the route. No upper bound on `G2` below `v^{4.2665}` exists at any
  level, so the shortfall in Proposition C is measured at ten points and modelled
  thereafter. If `G2(x#)` were computed exactly at even one level near x = 100 it
  would be worth more than everything sampled above.
- **The exhaustive extremal scan past 1e11.** A run to 1e12 was started, abandoned
  at 8 minutes on a runtime estimate of 1 to 2 hours, and restarted at 1e11, which
  completed in 1,204 s (section 2a). Its content is the maximal twin-prime gap
  sequence, tabulated in the literature well past this reach, so extending it was
  judged not worth the cost. The `0.49 +/- 0.09` constant would be worth
  re-measuring against those published tables rather than against nine decades.
- **v past 1e15.** Stopped by double precision at 2^53, not by time. BigInt or a
  split sieve would go further; the ladder's shape is already flat over twelve
  decades and another two would not change a reading.
- **The literature pass on two-sided rough pairs.** Section 5's lead: the best
  published exponent `theta` for "`n` and `n+2` both free of prime factors below
  `n^{1/theta}`" was not looked up. Anything below 4.2665 improves the anchored
  bound directly. This is the cheapest unfinished item in the report.
- **The `beta_2` proof's own slack.** Whether `beta_2 = 4.26645` is *attained* for
  `kappa = 2` was not investigated here. `PRIOR-ART.md` records that no `kappa=2`
  extremal example exists in print. If the sifting limit is not attained, the
  proven exponent could fall without any new idea, and Proposition D's threshold
  moves with it. That is the single most valuable thing adjacent to this attack
  and it is not touched here.

**Suspected but not proven.**

- `G2(x#) ~ c x ln^2 x` with `c` near 0.9. Ten exact points and sixteen certified
  ones are consistent with it, and `Y2/(x ln^2 x)` drifting 0.736 to 1.296 is
  consistent with a lower bound approaching a constant. It is a model.
- `max A = (0.49 +/- 0.09) ln^3 v` per decade. Nine decades, no trend, but the
  band is +/- 18% and a `ln ln` factor would be invisible across nine decades. The
  right reading is "the extremal anchored gap is `ln^{3+o(1)}`", and the constant
  is a description of the computed range rather than a limit.

**Where this is most likely wrong.**

1. **Proposition C rests on a measurement of `G2` extended by a model.** If
   `G2(x#)` is genuinely at exponent above 2 rather than 1, the whole verdict
   inverts and Proposition D's regime is the real one. The corpus's own
   `exponent-control.md` gives a bracket [1.3, 1.9] with floor 1 and calls
   exponent 2 "disfavoured rather than excluded". Proposition D is written to be
   unconditional precisely because Proposition C is not.
2. **The denoising in section 4 uses bands `[x, 4x]` whose sample sizes at the
   bottom of the ladder are 8 and 11 odd v.** `Abar` at x = 5 and x = 7 is a mean
   of single digits. The trend statement is carried by the top half of the ladder,
   and the first four rungs should be treated as decoration.
3. **Position-uniformity was checked at the mechanism, not just at the claim, and
   it holds.** `paper/beta2-note.md` §2-3 was read here. The interval enters only
   through `|A_d| = (omega(d)/d) H + r_d` with `|r_d| <= omega(d) <= 2^{nu(d)}`,
   which is the count of `omega(d)` residue classes in a window of length `H` and
   is manifestly independent of the window's start; `V(z)`, `f_2`, the `Omega`
   constants and the remainder sum `<< y log^7 y` all likewise carry no `x`. So
   the assembly at `H = z^{beta_2+eps}` is uniform in `x`, and the origin is one
   interval among the others. Residual risk: the DHR Theorem 9.1 input itself was
   not re-derived, but `beta2-note.md` §6 records it as fully verified against the
   primary source. If that verification is wrong, finding 1 collapses and the
   attack's central verdict with it.
4. **Section 7 corrects attack 10's reason, not its conclusion.** Its loophole-2
   verdict stands on the finding in section 5, which attack 10 did not have. Only
   the `rho(2)` clause and the "not a favoured position" clause were tested; its
   Collision Proposition, cited in the same breath, was not read and may carry the
   conclusion independently.
5. **Proposition D is stated for the current `B(v)`, and it moves if `B` moves.**
   It reads "`beta_2 - 2 > 2`", which is true at 4.2665 and false the moment the
   proven exponent drops below 4. So Proposition D is not a permanent closure of
   route (b); it is a closure at today's exponent. Proposition C's shortfall is the
   durable one, and Proposition C is the model-dependent one. The two weaknesses
   are in different places on purpose, but neither proposition is both durable and
   unconditional.
