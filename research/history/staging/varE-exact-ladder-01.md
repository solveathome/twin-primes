# Two more exact levels for the decoupling ratio, and the n <= L band evaluated at last

<!-- ledger
id: Q-varE-limit
status: PARTIAL
todo: 9
question: Does lim Var/E on the diagonal window exist, and what is it?
verdict: Neither open step closes here: x = 29 and 31 add two exact levels on which the decoupling error stays bounded and keeps falling (X/X_dec 1.000725 and 1.000471, delta(X - X_dec) ln y 0.00309 and 0.00238) without separating 1/ln y from anything faster, and the group-1 half of the near-cancellation is settled at 0.13347 while the other half is still drifting through the third decimal; the model's n <= L band, which varE-spectral section 4 states as O(1/ln W) and does not evaluate, is now EXACT at nine levels and reads 0.063/ln y to three figures with its share of delta*X_dec falling 4.16 % to 0.94 %; the n | L band is exactly zero and carries 6.4 % of the conductor mass at x = 37; the model itself is exact at x = 37 (0.395667) and 0.402368 +- 3.4e-5 at x = 41; the limit 0.45546 stays HEURISTIC with both steps open.
-->

*Staging note, 2026-08-28. TODO item 9. Producer:
`research/varE-exact-ladder-01.js` (embedded, `code-sha256` and body verified
static, 2510.3 s; the run-side `embed.js --check` needs `--timeout 2700`).
Reads `varE-spectral.md`, `varE-theta2-step.md`, `redteam-0828-varE.md` and
`paper/variance-note.md` sections 3 and 7. It edits nothing. Every figure below
is labelled with the producer section that printed it; figures marked DERIVED
are arithmetic performed in this note on that block's own columns, not by the
producer.*

---

## 0. Verdict, the part that did not move first

**Neither open step is closed, and nothing here attempts either.**
`redteam-0828-varE.md` section 0 names the two: the theta = 2 decoupling
replacement, and the model's own limit theorem. This pass adds levels and
sizes. It derives no inequality.

**The two new levels do not sharpen the step-1 reading.** The extra data are
consistent with the error being `O(1/ln y)` and equally consistent with its
being smaller. `varE-theta2-step.md` section 5 said four levels exclude growth
and nothing finer; six levels exclude growth and nothing finer.

**One half of the near-cancellation is drifting, which makes the net worse, not
better.** `delta*(X1 - X_dec)*ln y` is settled at 0.13342, 0.13344, 0.13347 over
x = 23, 29, 31, but `delta*(X - X1)*ln y` reads -0.12883, -0.13035, -0.13109 on
the same three levels and is still moving in the third decimal (SEC 1). The net
0.00238 at x = 31 is a difference of two numbers fifty times its size, one of
which has not stopped moving. Do not quote a coefficient for it.

**Nothing here touches the conjecture.** `variance-note.md` section 4 already
records that Var/E over a uniformly random window says nothing about the one
anchored window the twin problem needs.

With that said, what the pass produced:

- **MEASURED, exact, two new levels.** `X/X_dec` = 1.000725 at x = 29 and
  1.000471 at x = 31; `delta*(X - X_dec)` = 0.000273 and 0.000183;
  `delta*(X - X_dec)*ln y` = 0.00309 and 0.00238. `delta*X` reproduces
  `variance-note.md` section 7's measured 0.3774 and 0.3876 (SEC 1).
- **MEASURED, exact, nine levels, and it is the number section 4 left blank.**
  The model's `n <= L` conductor band is 0.012344728, 0.009853657, 0.008044066,
  0.006640313, 0.005616554, 0.004855050, 0.004252203 at x = 13..37, and its
  product with `ln y` is 0.06362, 0.06468, 0.06469, 0.06382, 0.06344, 0.06317,
  0.06301: constant to three figures over a factor 500 in y, still creeping
  down (SEC 2, SEC 4B).
- **PROVEN, and it needed no enumeration.** `E[1/n] = delta` exactly for the
  model's conductor law, the dual of `varE-spectral` section 3's
  `E[n] = 1/delta`. That is what turns the infinite `n > L` band into a
  by-product of the finite `n <= L` descent, and it is why x = 37's model value
  is reachable at all (producer header; the identity is checked against
  `variance-note.md` section 7's `E[N_W]` column at nine levels in SEC 2).
- **MEASURED, exact.** The `n | L` band is 0.000000000 at every level, and it
  is not a small set: it carries 7.8 % of the conductor mass at x = 31 and
  6.4 % at x = 37 (SEC 2).
- **MEASURED.** The model at x = 37 is 0.395667 by the exact identity route and
  0.395728 +- 3.34e-5 by Monte Carlo at N = 1e8 on two seeds. At x = 41 it is
  0.402368 +- 3.36e-5 (SEC 2, SEC 3).
- **Two levels NOT computed, with their prices.** x = 37's ratio `X/X_dec`
  needs the real-space sieve, priced at 21656 s of wall clock, over the 4-hour
  rule. x = 41's exact model needs 5.3e12 descent nodes (section 5).

## 1. The step-1 ladder, now eight exact levels

`delta*X` is Var/E. Both columns are exact arithmetic, no Monte Carlo (SEC 1).

| x | ln y | delta*X | delta*X_dec | delta*(X - X_dec) | X/X_dec | * ln y |
|---|---|---|---|---|---|---|
| 7  | 2.565  | 0.152075 | 0.178193 | -0.026118 | 0.853427 | -0.06699 |
| 11 | 3.850  | 0.256267 | 0.266839 | -0.010572 | 0.960382 | -0.04070 |
| 13 | 5.153  | 0.299499 | 0.296592 | +0.002907 | 1.009802 | +0.01498 |
| 17 | 6.564  | 0.326772 | 0.325504 | +0.001268 | 1.003895 | +0.00832 |
| 19 | 8.042  | 0.347302 | 0.346800 | +0.000502 | 1.001448 | +0.00404 |
| 23 | 9.611  | 0.364320 | 0.363842 | +0.000477 | 1.001312 | +0.00459 |
| 29 | 11.295 | 0.377418 | 0.377144 | +0.000273 | 1.000725 | +0.00309 |
| 31 | 13.012 | 0.387588 | 0.387405 | +0.000183 | 1.000471 | +0.00238 |

The last column is bounded on every level computed and falls at every step
above x = 23. The ratio column is monotone from x = 17 up. Neither fact
separates `O(1/ln y)` from anything faster: multiplying by `ln^2 y` instead
gives 0.0772, 0.0546, 0.0325, 0.0441, 0.0349, 0.0310 at x = 13..31 [DERIVED,
arithmetic on the two columns above], which also falls and is also
non-monotone. Eight levels exclude growth. That is the whole of it.

The engine is a rewrite: `varE-theta2-step.js` held four `Float64Array`s of
`L/6` entries and said x = 29 would need 35 GB. The producer here blocks the
same sieve into 2^17 positions, carrying each prime's next-hit index across
blocks, so the working set is 4 MB at every level. It reproduces theta2's six
levels to 1e-6 (SEC 0) and costs 12.0 to 16.3 s per 1e9 positions (SEC 1).

## 2. The model's conductor bands, exact

`varE-spectral.md` section 3 collapses the decoupled sum to
`delta*X_dec = E[(n/L){L/n}(1 - {L/n})]` with `p | n` independently at
`pi_p = (p - alpha_p)/(p - 1)`, so `n` is always a multiple of 6. Section 4
then splits the conductors into three groups and evaluates one of them.

Two observations make all three exactly computable up to x = 37.

**The band below L is finite.** Every conductor there is a squarefree y-smooth
integer `<= L`, so it is enumerable by descent over the primes with the running
product as the state, each conductor visited once. The cost is about 0.0167
nodes per unit of L, against the sieve's L/6 positions.

**The band above L needs no enumeration.** For the model's law,

    E[1/n] = (1/6)(1 - pi_5 + pi_5/5) prod_{7<=p<=y} (1 - pi_p + pi_p/p)
           = (1/6)(2/5) prod_{7<=p<=y} (p-2)/p = delta,

because `1 - 2/(p-1) + 2/(p(p-1)) = (p-2)/p` prime by prime. That is the dual
of section 3's `E[n] = 1/delta`, and it gives

    band(n > L) = (1 - P[n <= L]) - ( delta*L - L*E[(1/n) 1{n <= L}] ),

whose three ingredients are all by-products of the same descent. `delta*L` is
formed exactly in BigInt and printed against `variance-note.md` section 7's
`E[N_W]` column, which it reproduces at all nine levels (SEC 2).

The bands, exact (SEC 2):

| x | n \| L | n < L | n > L | of which L < n < 4L | n > 4L |
|---|---|---|---|---|---|
| 7  | 0 | 0.003056943 | 0.175135975 | 0.075485625 | 0.099650350 |
| 11 | 0 | 0.012367138 | 0.254471738 | 0.063202354 | 0.191269383 |
| 13 | 0 | 0.012344728 | 0.284246894 | 0.041699091 | 0.242547803 |
| 17 | 0 | 0.009853657 | 0.315650254 | 0.034339926 | 0.281310328 |
| 19 | 0 | 0.008044066 | 0.338755481 | 0.028190788 | 0.310564693 |
| 23 | 0 | 0.006640313 | 0.357202109 | 0.023927028 | 0.333275081 |
| 29 | 0 | 0.005616554 | 0.371527981 | 0.020542354 | 0.350985627 |
| 31 | 0 | 0.004855050 | 0.382548799 | 0.017963073 | 0.364585726 |
| 37 | 0 | 0.004252203 | 0.391414298 | 0.015868 (MC) | 0.375609 (MC) |
| 41 | 0 | 0.003769 (MC) | 0.398599 (MC) | 0.014177 (MC) | 0.384422 (MC) |

The x = 37 sub-split and the whole x = 41 row are Monte Carlo at N = 1e8 on two
seeds, standard error 3.4e-5 on a total and 1.3e-6 on the `n < L` band (SEC 3);
the x = 41 `n > L` entry is DERIVED as 0.014177 + 0.384422. The descent to 4L
at x = 37 is 1.8 h and was declined; the descent at x = 41 is 19 h and was
declined.

**The check that could have failed.** The descent and the sieve of section 1
share no code path, and their totals differ by -1.17e-15, -1.25e-14, -1.58e-13,
-6.17e-12, -1.79e-10, -9.50e-10, +4.16e-8, -1.12e-6 over x = 7..31 (SEC 2). The
growth is the descent's own cancellation floor, about `6e-18 * L`, since
`band(n > L)` subtracts two quantities of size `delta*L` (9.4e9 at x = 37) to
leave 0.39. That is why the x = 37 total is quoted to five decimals and no
further. The `n < L` band does not pass through that cancellation: it is a sum
of positive terms with `sum|terms| <= 0.013`, so Kahan bounds its error by
3e-18 at every level, x = 37 included.

## 3. The n <= L band: the coefficient section 4 did not have

`varE-spectral.md` section 4 records the middle band as "`O(1/ln W)`: moves the
drift, not the limit" and states, in its own words, that it is **not** evaluated
there; section 5 and the note's own falsification table both carry that gap, and
`redteam-0828-varE.md` section 0 names it as half of the second open step. Here
it is, exact (SEC 4B):

| x | n < L band | share of delta*X_dec | band * ln y |
|---|---|---|---|
| 13 | 0.0123447 | 4.162 % | 0.06362 |
| 17 | 0.0098537 | 3.027 % | 0.06468 |
| 19 | 0.0080441 | 2.320 % | 0.06469 |
| 23 | 0.0066403 | 1.825 % | 0.06382 |
| 29 | 0.0056166 | 1.489 % | 0.06344 |
| 31 | 0.0048550 | 1.253 % | 0.06317 |
| 37 | 0.0042522 | 1.075 % | 0.06301 |
| 41 | 0.0037694 | 0.937 % | 0.06285 (MC) |

Read it at its rung. The band is **MEASURED** to behave as `c/ln y` with
`c` near 0.063, on nine levels, with no derivation, and the last column is
still creeping down rather than settling, so 0.063 is an upper reading of a
constant that may not exist. What the table does establish, at the level of
data, is that the band vanishes and vanishes at the rate section 4 guessed:
in `ln W` units it is `0.126/ln W`, since `ln W = 2 ln y` on the diagonal.
`varE-limit-theorem.md`, the sibling pass of the same day, states the same band
as `O(1/ln y)` and proves it; these are the sizes that claim has to match.

**The other two corrections, for the same sibling.** Writing the model as
`delta*X_dec = P[n > L] - E[(L/n) 1{n > L}] + band(n < L)` splits its distance
from `lambda_2(2) = 0.45545648` into three measured pieces [DERIVED, arithmetic
on SEC 2's mass and band columns; `P[n > L]` is the sum of that table's last
two mass entries, printed directly only at x = 37]:

| x | P[n > L] | lambda_2(2) - P[n>L] | * ln y | E[(L/n) 1{n>L}] | * ln y |
|---|---|---|---|---|---|
| 13 | 0.350726 | 0.104730 | 0.5397 | 0.066479 | 0.3426 |
| 17 | 0.368117 | 0.087339 | 0.5733 | 0.052467 | 0.3444 |
| 19 | 0.382620 | 0.072836 | 0.5858 | 0.043865 | 0.3528 |
| 23 | 0.394437 | 0.061019 | 0.5865 | 0.037235 | 0.3579 |
| 29 | 0.403580 | 0.051876 | 0.5860 | 0.032052 | 0.3620 |
| 31 | 0.410608 | 0.044848 | 0.5836 | 0.028059 | 0.3651 |
| 37 | 0.416225 | 0.039231 | 0.5813 | 0.024811 | 0.3676 |

The three add up: `0.039231 + 0.024811 - 0.004252 = 0.059790`, against
`lambda_2(2) - 0.395667 = 0.059789` at x = 37 [DERIVED]. So of the model's whole
distance from the limit at that level, the convergence of `P[n > L]` to the
Dickman tail supplies 0.039231, or 66 %, and the two band corrections supply a
net +0.020559, or 34 %. The largest of the three is the one the limit theorem
cannot avoid. Their coefficients against `1/ln y` are 0.58 (settled to three
figures over four levels), 0.37 (rising) and 0.063 (falling), so none of the
three is an established constant and only their sum is checked.

## 4. x = 37 and x = 41

**x = 37, exactly.** The model is 0.395667 (SEC 2, identity route, +- ~5e-5 from
the cancellation floor of section 2) and 0.395728 +- 3.34e-5 (SEC 3, Monte
Carlo, N = 1e8, two seeds). The two agree to 6.15e-5 against a combined bar of
about 6e-5. Against that, `varE-spectral.md` section 6a's model column reads
0.39643, which is 7.6e-4 high and is Monte Carlo at N = 4e5;
`redteam-0828-varE.md` section 4's 0.395567 +- 0.000106 is 1.0e-4 low, inside
its own bar. The measured Var/E at x = 37 is 0.3958 with a +-5e-5 quantisation
from `variance-note.md` section 7's four printed decimals, so the residual
there is +0.00013 +- 0.00005 against the exact model rather than the -0.0006
the note carries. **That correction is not applied to any file by this pass.**

**x = 41.** 0.402368 +- 3.36e-5 (SEC 3), against `redteam-0828-varE.md`
section 4's 0.402364 +- 0.000075: a difference of 4e-6, and a five-fold
tightening of the same number by the same method at five times the sample. It
sits inside `var41-prereg.md`'s registered [0.4013, 0.4040] and 0.053 below the
closed form 0.455456, so the tenth level still does not test the constant, which
is what `varE-spectral.md` section 8 already says.

## 5. What was priced and declined

Chris's rule is that anything under four hours is simply run. Three things were
priced out of it (producer header and SEC 1):

| object | method | price | verdict |
|---|---|---|---|
| `X` and `X/X_dec` at x = 37 | real-space sieve, 1.237e12 positions | 21656 s of wall clock, 6.02 hours | DECLINED, over the rule |
| the L < n < 4L band at x = 37 | descent to 4L, 5.2e11 nodes | 1.8 h | DECLINED, MC used instead |
| the exact model at x = 41 | descent to L, 5.3e12 nodes | 19 h | DECLINED, MC used instead |
| Var(41) itself | `var41-price.js` | ~40x the x = 37 point | not attempted, TODO item 2 |

**No cheaper exact route to `X` was found, and the reason is structural.** The
conductor sum works for `X_dec` because `V(h)` depends on `h` only through
`prod_{p|h}`, one linear form. `W(h)` depends jointly on the factorisations of
`h`, `h - 2` and `h + 2` restricted to primes `<= y`, which is three linear
forms and no multiplicative structure over conductors; the frequency-side
version of the same sum is `varE-theta2-step.md` section 2's `3^omega(n)` lag
expansion, which has more terms than the sieve has positions. So the ratio
ladder stops at x = 31 until someone finds a different identity, not a faster
machine.

## 6. What would falsify this, and whether that check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| `X` and `X_dec` at x = 29 and 31, six figures | MEASURED, exact arithmetic | a second implementation disagreeing | PARTLY. SEC 0 reproduces theta2's six lower levels to 1e-6 in a rewritten engine, and SEC 2's descent reproduces `X_dec` at x = 29 and 31 to 4.2e-8 and 1.1e-6 by an unrelated route. `X` itself has one implementation family at the two new levels |
| `delta*X` matches the measured column at x = 29, 31 | MEASURED | disagreement with `variance-note.md` section 7 | YES, 0.377418 vs 0.3774 and 0.387588 vs 0.3876 |
| the decoupling error is `O(1/ln y)` or better | MEASURED, 8 exact levels | `delta*(X - X_dec)*ln y` growing at a new level | PARTLY. Falling on x = 13..31; the levels exclude growth and nothing finer, exactly as at six levels |
| the net coefficient of the decoupling error | NOT CLAIMED | nothing; one half of the cancellation is still drifting | Do not quote a value |
| `E[1/n] = delta` for the model's law | PROVEN | a prime where `1 - 2/(p-1) + 2/(p(p-1)) != (p-2)/p` | YES, algebra, plus `delta*L` against `E[N_W]` at nine levels |
| the `n < L` band is `0.063/ln y` to three figures | MEASURED, 9 exact levels | a level where `band * ln y` leaves [0.062, 0.065] | NO for x > 41. The column is still falling, so 0.063 is an upper reading |
| the `n \| L` band is exactly 0 | PROVEN | Fact B failing | YES, it is Fact B, and the descent prints 0.000000000 |
| the model at x = 37 is 0.395667 | MEASURED, exact to ~5e-5 | a third route outside 0.39567 +- 1e-4 | YES, MC at N = 1e8 gives 0.395728 +- 3.3e-5 |
| the model at x = 41 is 0.402368 | MEASURED, MC | a value outside +- 1e-4 | YES, `redteam-0828-varE.md` section 4's independent 0.402364 |
| x = 37's ratio is out of reach | MEASURED price | a route to `X` that is not a position sum | NO. Section 5 argues one does not exist; it is an argument, not a proof |
| any of this closes either open step | NOT CLAIMED | — | Both steps stand open |

The one line worth carrying out of this pass: the middle conductor band, the
one `varE-spectral.md` section 4 declined to evaluate, is `0.063/ln y` on nine
exact levels and 1.1 % of the model at x = 37, and the decoupling error above
it is still a near-cancellation whose second half has not settled.
