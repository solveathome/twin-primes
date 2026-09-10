# The decoupling step at two excluded classes: what it actually is, what it costs, and the part of it that needs no proof

<!-- ledger
id: Q-varE-limit
status: PARTIAL
todo: 9
question: Does lim Var/E on the diagonal window exist, and what is it?
verdict: The theta=2 mean-coefficient step is neither proven nor refuted: the replacement error is exactly a sum over shifts of W(h) - V(h), it splits into a c=0 group (needs no decoupling) and CRT-mixed lags (open); measured ratios true/model 1.0098, 1.0039, 1.0014, 1.0013 at x = 13..23 with delta(X - X_dec) ln y falling rather than settling, so the error is O(1/ln y) or better MEASURED on four levels that exclude growth and nothing finer, and the limit 0.45546 stays HEURISTIC with varE-spectral's second step, its own limit theorem, still open.
-->

> **RIDER 2026-08-30 (orchestrator, from `verify-0830-record-defects.md` §1, CONFIRMED to every digit on
> independent code at x = 7..19).** PART 3 of `varE-theta2-step.js` builds the
> shift group X2 by doubling the positive-h half of one pattern that is a
> mirror image, not even. The corrected reading of §5 (lines 222-225): the
> group sum δ·X2 reads −0.009235, 0.004509, 0.001365, 0.000736, 0.000394 at
> x = 7..19 (2X2 = −0.5603 .. 0.1846, O(1) and falling; the column first
> carried here, 0.094199 .. 0.007968, is withdrawn); δ·Xmix runs −0.034971
> .. −0.016835 over the same levels, Xmix = −0.49 ln y on the top three, the
> slower of the two. **Applied 2026-09-05: the producer now sums both mirror
> patterns, is re-embedded, and reproduces these values with x = 23 added
> (δ·X2 = 0.000236, δ·Xmix = −0.013876); §5 above carries the corrected
> numbers.** X, X1, X_dec and all ratios
> are untouched; the §8 row's rung (MEASURED) is unchanged.

*Staging note, 2026-08-28. Forward work on `varE-spectral.md` §2, one of the two
open steps in that note; the other is its §5 limit theorem for the model, which
this pass does not touch. Producer:
`research/history/staging/varE-theta2-step.js` (embedded, `--check` clean,
1.7 s). Reads `varE-spectral.md` and its `.js` for the nine diagonal points,
the exact `X_dec` at x = 7 and 11, and the level table (L = x#, y the largest
prime below sqrt(L)). Recomputes nothing from `paper/variance-note.md`.*

## 0. Verdict, the open half first

**The step is not proven and not bounded here.** No inequality is derived. What
replaces it is a smaller open statement plus four new exact data points, and
the smaller statement is still open.

**The frequency-side hope in the task brief fails.** The local coefficients do
not recombine into one shifted Fejer term. They recombine into
`|Ehat_n(t)|^2` with `E_n = {r : n | r(r+2)}`, which expands into `3^omega(n)`
distinct shifts carrying `4^omega(n)` total weight. Exactly two of those shifts
are the clean `d = +-2` terms the brief predicted, and those two are indeed
harmless. The remaining `3^omega(n) - 3` are CRT-mixed, and they are where the
difficulty lives.

**The measured coefficient is a near-cancellation.** The decoupling error, after
the `delta` normalisation, is the sum of a `+0.1334/ln y` term and a
`-0.1288/ln y` term (reading 4). The net `0.0046/ln y` is a difference of two
numbers thirty times larger, so its value is not established even though its
order is.

**Nothing here touches the conjecture.** `variance-note.md` §4 already records
that Var/E over a uniformly random window says nothing about the one anchored
window the twin problem needs. This note is about whether a stated limit is the
limit of the stated object, not about primes.

With that said, what the pass produced:

- **PROVEN, elementary, and checked at six levels.** The spectral sum is a
  real-space shift sum: `X = sum_{|h|<L} (1 - |h|/L)(W(h) - 1)` with
  `W(h) = prod_{p<=y} p rho_p(h)/alpha_p^2`, the y-truncated correlation of the
  comb with its own shift. The run reproduces `varE-spectral` PART 0's
  brute-forced 4.612929 at x = 7 and the §7 column to 2.4e-6 .. 1.7e-4 at the
  other five levels (§1, reading 1).
- **PROVEN.** The decoupled sum is the same expression with `W` replaced by
  `V(h) = C_y prod_{p | h, 7<=p<=y} (p-1)/(p-3)`. So the replacement error is
  exactly `sum_{|h|<L} (1 - |h|/L)(W(h) - V(h))`: a sum over shifts, not a
  per-prime defect (§1). The run reproduces the corpus's own divisor
  enumeration, 5.405185 at x = 7 and 15.694986 at x = 11, to the printed digit.
- **PROVEN.** Over `p >= 7` the exact `W` splits into `3^omega` groups indexed
  by which of `p | h`, `p | h-2`, `p | h+2` each prime takes. The group where
  every prime takes `p | h` is the only one whose CRT class is 0, so Fact A
  evaluates it verbatim, with no equidistribution and no replacement. Its
  weight is the model's weight with `pi_p = 2/(p-2)` in place of `2/(p-1)`,
  because `(p-1)(p-4) + 2 = (p-2)(p-3)` exactly (§3, PART 1).
- **MEASURED, exact, six levels, no Monte Carlo.** `X/X_dec` = 0.853427,
  0.960382, 1.009802, 1.003895, 1.001448, 1.001312 at x = 7, 11, 13, 17, 19,
  23. The corpus had the first two. `delta*(X - X_dec)` = -0.026118, -0.010572,
  +0.002907, +0.001268, +0.000502, +0.000477 (§4).
- **MEASURED.** `delta*(X - X_dec)*ln y` is bounded on every level computed,
  and falling rather than settling: 0.01498, 0.00832, 0.00404, 0.00459 at
  x = 13..23. Bounded implies the error vanishes, so on this evidence the limit
  0.45546 is not moved by the replacement (§5), and the evidence is for
  `O(1/ln y)` or better. Four levels exclude growth and nothing finer.
- **Correction to `varE-spectral` §6a.** The model column there is Monte Carlo
  and is off by up to 0.0017 at x = 23, which is larger than any residual the
  note reports at x >= 13 (§6).

## 1. The replacement, restated in real space

`K_L(t) = sum_{|h| < L} (1 - |h|/L) e(ht)` is the Fejer kernel, so

    X = sum_{nu != 0 mod M} What(nu) K_L(nu/M)
      = sum_{|h| < L} (1 - |h|/L) W(h) - L
      = sum_{|h| < L} (1 - |h|/L) (W(h) - 1),

using `sum_{|h|<L}(1 - |h|/L) = L` and `What(0) = 1`. The CRT twist
`varE-spectral` §1 insists on is what makes `What` the transform of
`W(h) = prod_p f_p(h)` in the first place, so it is automatic in this form and
cannot be dropped by accident.

For `7 <= p <= y` the comb excludes `{0, -2}` mod p, and exactly one of
`p | h`, `p | h-2`, `p | h+2` can hold:

    f_p(h) = p(p-4)/(p-2)^2  generically,
             p/(p-2)         if p | h,
             p(p-3)/(p-2)^2  if p | h-2 or p | h+2.

The decoupled object is the same sum with `hat f_p` flattened to `gamma_p`,
which in real space is `V(h) = prod_p (1 + gamma_p c_p(h))` with `c_p` the
Ramanujan sum. Since `1 + gamma_p(p-1) = p/(p-2)` and
`1 - gamma_p = p(p-3)/((p-1)(p-2))`, this collapses to

    V(h) = C_y * prod_{p | h, 7 <= p <= y} (p-1)/(p-3),
    C_y  = prod_{7 <= p <= y} (1 - 2/((p-1)(p-2))).

So the replacement does one thing: it deletes the dependence of the local
factor on `p | h-2` and `p | h+2`, and rescales the rest. The error is

    X - X_dec = sum_{|h| < L} (1 - |h|/L) (W(h) - V(h)).

**This is not a small pointwise perturbation.** At p = 5 the comb excludes
three classes, `W(h) = 0` on `h = +-2 mod 5` while `V(h) > 0` there, and that
gap does not shrink with y. On `p >= 7` the ratio `W/V` is a convergent product
times `prod_{p | h^2-4} (p-3)/(p-4)`, which is order one but not one. Whatever
makes the totals agree is cancellation in the h-sum, not closeness of the
summands.

## 2. What the frequency side actually gives

Working the brief's step 1 through: with `nu_p = t (n/p)^{-1} mod p` the local
coefficients multiply to

    prod_{p | n} hat f_p(nu_p) = |Ehat_n(t)|^2 / prod_{p|n} (p-2)^2,
    Ehat_n(t) = sum_{r in E_n} e(tr/n),   E_n = {r mod n : n | r(r+2)},

so the exact conductor-n sum is `sum_{r, r' in E_n} T_n(r - r')` with
`T_n(d) = sum_{|j|<L} (1 - |j|/L) c_n(j + d)`, the Fejer autocorrelation at lag
d. The lags are `d = r - r'`, that is `d_p in {0, 2, -2}` independently per
prime: `3^omega(n)` distinct lags, the lag-0 one carried with multiplicity
`2^omega(n)`.

The brief's guess is right for exactly two of them. For `n > 2L` and `d = +-2`,
`T_n(+-2) = T_n(0) - 2n/L + O(L)`, so those two lags each contribute a
`(1 - 2/L)`-type copy of the unshifted term. They are the groups called `X2`
below, and they are measured harmless. The clean recombination the brief hoped
for does not extend past them: the remaining lags are CRT-mixed residues whose
least representative is generically of size n, so their `T_n` values are not a
fixed multiple of `T_n(0)` and their sum is exactly the equidistribution
question the replacement was standing in for. Decoupling is not repaired by
evaluating a shifted Fejer kernel.

## 3. The group that needs nothing

Expanding the `p >= 7` product over the three cases gives

    X = X1 + 2*X2 + Xmix,

with `X1` the group where every prime takes `p | h`, `X2` each of the two
groups where every prime takes `p | h-2` or `p | h+2`, and `Xmix` the rest.
Only `X1` has CRT class 0 at every prime, so only `X1` is a sum of `A_q(0)`
terms and Fact A applies to it with nothing assumed.

Its weight relative to the model's is fixed by one identity:

    (D_y / C_y) * prod_{7 <= p <= y} (1 + 2/((p-1)(p-4))) = 1,
    D_y = prod_{7 <= p <= y} p(p-4)/(p-2)^2,

which holds prime by prime because `(p-1)(p-4) + 2 = (p-2)(p-3)`. PART 1 prints
1.00000000000000 at all six levels. Size-biased, `X1` carries
`pi_p = 2/(p-2)` where the model carries `2/(p-1)`; the two differ in
`E[ln n]` by `sum 2 ln p/((p-1)(p-2))`, which is O(1) against
`ln L = 2 ln y`. So `X1` and the model share a `GD(2)` limit law at the same
rung the model has it, HEURISTIC, inheriting `varE-spectral` §5's own unproven
limit theorem, which is that note's second open step, rather than adding a new
assumption.

**What that buys.** The open statement is no longer "the local coefficients may
be replaced by their means". It is "the shift groups `2*X2 + Xmix` contribute
`o(1/delta)`". That is a statement about two explicit sums over shifts
`h = +-2 mod q`, not about frequencies.

## 4. The error, exact, at six levels

`delta*X` is Var/E. Both columns below are exact arithmetic, Kahan-summed, no
Monte Carlo anywhere.

| x | ln y | delta*X | delta*X_dec exact | corpus model (MC) | delta*(X - X_dec) | X/X_dec |
|---|---|---|---|---|---|---|
| 7  | 2.565 | 0.152075 | 0.178193 | 0.1785  | -0.026118 | 0.853427 |
| 11 | 3.850 | 0.256267 | 0.266839 | 0.26744 | -0.010572 | 0.960382 |
| 13 | 5.153 | 0.299499 | 0.296592 | 0.2975  | +0.002907 | 1.009802 |
| 17 | 6.564 | 0.326772 | 0.325504 | 0.32579 | +0.001268 | 1.003895 |
| 19 | 8.042 | 0.347302 | 0.346800 | 0.34637 | +0.000502 | 1.001448 |
| 23 | 9.611 | 0.364320 | 0.363842 | 0.36214 | +0.000477 | 1.001312 |

The sign change `varE-spectral` §2 inferred indirectly, from the model sitting
above the data at x = 7 and 11 and below it from x = 13, is now direct: it sits
between x = 11 and x = 13. The last two rows are 0.000502 and 0.000477, so the
sequence is not monotone at the top; these are exact numbers, so that is
arithmetic fluctuation between levels and not noise.

x = 29 is out of reach for this method: `L/6 = 1.1e9` array entries, roughly 35
GB in the present layout. A segmented sieve would fit the memory and cost
minutes, not seconds.

## 5. The 1/ln y split, and why the net coefficient is not established

| x | delta*(X1 - X_dec)*ln y | delta*(X - X1)*ln y | sum |
|---|---|---|---|
| 7  | 0.07008 | -0.13708 | -0.06699 |
| 11 | 0.10310 | -0.14381 | -0.04070 |
| 13 | 0.13201 | -0.11703 | +0.01498 |
| 17 | 0.13350 | -0.12518 | +0.00832 |
| 19 | 0.13308 | -0.12905 | +0.00404 |
| 23 | 0.13342 | -0.12883 | +0.00459 |

Both halves settle. The group-1 excess settles near +0.1334 and the shift-group
deficit near -0.1288, each stable in the third decimal over the top three
levels, and each therefore consistent with an exact `c/ln y`. Their sum is the
decoupling cost, and it is the difference of two quantities thirty times its
own size. A one percent systematic error in either half would change it by half
its value.

So the defensible reading is the order, not the constant: the replacement error
is `O(1/ln y) = O(2/ln L)` on every level computed, the same order as the
model's own drift, hence it does not move the limit. Whether the net
coefficient is 0.0046 or 0.002 or 0.008 is not settled by six levels, and
nothing here needs it to be. The order is also the weaker of the two readings
available: over x = 13..23 the net runs 0.01498, 0.00832, 0.00404, 0.00459,
which falls rather than settles, so the evidence is for `O(1/ln y)` or better
and the only failure mode these four levels exclude is growth
(`redteam-0828-varE.md` §6).

The two shift groups separately: `delta*X2` (each group, both mirror halves
summed) reads -0.009235, 0.004509, 0.001365, 0.000736, 0.000394, 0.000236 at
x = 7..23, so `2*X2` is `O(1)` and falling, and `delta*X2 = O(1/ln^2 y)`, one
order better than needed. `delta*Xmix` runs -0.034971 .. -0.013876 and is the
slower of the two, about `-0.49 ln y` in `Xmix` on the top levels. So the open
statement narrows once more: it is about `Xmix`, the CRT-mixed lags, alone.

## 6. Two corrections this forces on `varE-spectral.md`

- **§6a's model row is Monte Carlo.** Exact against quoted: 0.178193/0.1785,
  0.266839/0.26744, 0.296592/0.2975, 0.325504/0.32579, 0.346800/0.34637,
  0.363842/0.36214. The x = 23 gap is 0.0017, larger than any residual the note
  reports at x >= 13, so the residual column there is partly MC noise in the
  model, not structure in the data. With the exact model the residuals at
  x = 13..23 read +0.00291, +0.00127, +0.00050, +0.00048, all positive, where
  the note's read +0.0020, +0.0010, +0.0009, +0.0022. An independent rebuild
  reads +0.00291, +0.00130, +0.00050, +0.00063 at the same four levels
  (`redteam-0828-varE.md` §6). The last-digit differences are the measured
  column's own quantisation: `variance-note.md` §7 prints Var/E to four
  decimals, so that column carries +-5e-5, comparable to the residuals at
  x >= 29 (+0.00036, +0.00025, +0.00023). Residual structure at the top three
  levels is at the quantisation floor and is not signal. The same MC caution
  applies to the x = 41 forecast, which the exact method cannot reach and which
  a two-seed rerun at N = 2e7 puts at 0.402364 +- 0.000075 rather than
  0.40184 +- 0.00075 (`redteam-0828-varE.md` §4).
- **§2's framing.** "Replace `hat f_p(nu_p)` by `gamma_p`" overstates what has
  to be true. The `c = 0` group survives the replacement exactly, by PART 1's
  identity. What needs an argument is only the CRT-mixed lags.

`variance-note.md` §7's X column agrees with exact recomputation to about five
significant figures (4.6137 against 4.612929, 51.4047 against 51.400255,
121.4787 against 121.485245). Those trailing digits are rounding, not exactness,
and the column should not be quoted past five figures.

## 7. Where the exact object sits in the literature

`X = sum_{|h|<L} (1 - |h|/L)(W(h) - 1)` with `W` the y-truncated correlation of
a two-element pattern with its shift is a truncated singular-series average for
the 4-tuple `{0, 2, h, h+2}` over `S({0,2})^2`. The owning conventions are
Montgomery and Soundararajan on `sum_{h <= H} S(h)` for the untruncated series,
and Gorodetsky's rough-integer variance for the y-truncated one, which
`varE-spectral` §9 already identifies as the `theta = 1` case. Whether either
convention already evaluates the truncated 4-tuple average at `u = log H/log y`
fixed is **NOT CHECKED here**, and it is the first place to look before any more
computation. `research/SEARCH-CONVENTIONS.md` applies: the words to search are
"singular series average short interval" and "rough integers variance", not
anything in this corpus's vocabulary.

## 8. What would falsify this, and whether that check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| `X = sum_{|h|<L}(1-|h|/L)(W(h)-1)`, and `X_dec` the same with `V` | PROVEN | disagreement with the corpus's spectral or divisor sums | YES, six levels for X to 1.7e-4, two levels for X_dec to the printed digit |
| `V(h) = C_y prod_{p|h} (p-1)/(p-3)` | PROVEN | a level where it disagrees with the divisor enumeration | YES, x = 7 and 11 exactly |
| the `c = 0` group needs no decoupling, and carries `pi_p = 2/(p-2)` | PROVEN | a prime where `(p-1)(p-4)+2 != (p-2)(p-3)` | YES, algebra plus PART 1 at six levels |
| the `c = 0` group has the model's `GD(2)` limit | HEURISTIC | the same failure that would break `varE-spectral` §5 | NO. It inherits that note's unproven limit theorem |
| the replacement error is `O(1/ln y)` or better, so the limit 0.45546 stands | MEASURED, 6 exact levels | `delta*(X - X_dec)*ln y` growing at a new level | PARTLY. Falling on x = 13..23, so these levels exclude growth and nothing finer; x = 29 not computed and needs a segmented sieve |
| the net coefficient of the error | NOT CLAIMED | nothing; it is a difference of two terms thirty times larger | Do not quote 0.0046 as a constant |
| `X2 = O(1)`, `Xmix` the slow half | MEASURED | a level where `delta*X2*ln^2 y` grows | PARTLY, six levels, no derivation |
| §6a's model column is MC-contaminated by up to 0.0017 | MEASURED | a recomputation of the MC with larger N agreeing with 0.36214 | Exact value 0.363842 stands against it; the MC was not rerun |
| this reduction is novel | NOT CLAIMED | Montgomery-Soundararajan or Gorodetsky evaluating the truncated 4-tuple average | NO. Not searched. Do not call it new before that search |

The one line worth carrying out of this pass: the open step is no longer about
Fourier coefficients. It is the single statement that the CRT-mixed lags of
`|Ehat_n(t)|^2` contribute `o(1/delta)`, and on six exact levels they contribute
`O(1/ln y)`.
