# TODO 1b: is the corrected greedy a G₂ oracle?

<!-- ledger
id: Q-greedy-oracle
status: ANSWERED
todo: 1b (retired)
question: Is the corrected greedy a G2 oracle?
verdict: Oracle established on the rule as sealed and by a clean sweep rather than by the margin the rule allows - the covering optimum is hit at 13 of 13 on the rule's own terms and 14 of 14 measured, minimum ratio 1.0000 - but the degradation clause fires just above the rule's scope, log-log slope -0.02353, se 0.00706, over x = 13..79, excluding zero.
-->

*2026-08-19. Producer: `research/greedy-oracle-validation.js`, about 14 minutes,
formal embed, `code-sha256` and `out-sha256` bound, ten self-tests and eleven
numbered readings in the script's own tail. No other repo file was edited.
Nothing was committed or pushed. `node research/qc.js` was run before and after.*

*Legend as in `research/sift-limit-attack.md`: **[PROVEN]** published theorem with
source; **[VERIFIED]** checked computationally here; **[MEASURED]** empirical,
finite range.*

---

## 0. The pre-registration, quoted before any result

This is `TODO.md` item 1b's own sentence, sealed before the run, reproduced
verbatim and not rewritten:

> **PRE-REGISTER before running**: oracle established if greedy = optimum at
> ≥ 12 of 13 and ≥ 0.99 at all 13; oracle dead if the ratio degrades with x,
> in which case record the degradation rate, which is itself the result.

It was written when the corpus held thirteen exact terms, `x = 2..41`. A
fourteenth, `G₂(43#) = 618`, landed afterwards. The rule is scored twice, on the
thirteen it names and on all fourteen, and both readings are printed, so a miss
at the newest level cannot hide in a denominator. The count threshold stays the
literal 12 in both; rescaling it to 13-of-14 would be rewriting a sealed rule in
the oracle's favour.

---

## 1. Verdict

> **ORACLE ESTABLISHED, on the rule as sealed, and by a clean sweep rather than
> by the margin the rule allows.** At a single uniform budget the greedy hits the
> covering optimum at **13 of 13** on the thirteen terms the rule names and at
> **14 of 14** on all fourteen measured here, minimum ratio **1.0000** in both.
> **[VERIFIED]**

> **And the degradation clause fires just above the rule's scope.** Over every
> exact level including the eight published ones, `x = 13..79`, the log-log slope
> of the ratio is **−0.02353**, se 0.00706, band `[−0.03736, −0.00970]`,
> leave-one-out range `[−0.02830, −0.01851]`. That excludes zero. Inside the
> rule's own scope the ratios are identically 1.0000 and the slope is exactly
> zero. Both are the result. **[MEASURED]**

The honest one-line reading: **the greedy is an oracle to x = 43, is exact at one
further level nobody here computed, and decays measurably from there.** The
frontier of the oracle claim is around `x = 53`, not the `x = 100+` item 1b hoped
for.

---

## 2. Custody

**The instrument is not re-implemented.** `greedyD2`, `verifyD2`, `mkVariants`,
`searchMax`, `mulberry32` and `fit` are extracted as **source text** from
`research/two-class-lower-bounds.js` at run time and evaluated, so what is scored
is the instrument itself rather than a copy of it. Both hashes are printed:

```
file sha256     726e5a4bef8f8241295d37b264ba575486cb5aaba76b37550c1d06d2004f4023
extracted       mulberry32, greedyD2, verifyD2, mkVariants, searchMax, fit
bytes           4971
extract sha256  d89573d36a947f9f30423860dd1e4ac5abef721b44cd7c6e70e4708933a81044
```

**The truth is parsed, never retyped.** The fourteen own terms come out of
`research/exact-g2-ladder.js`'s `LADDER` by regex; the eight published ones are
OEIS **A144311** a(15)–a(22) (Carter 2008 opened the sequence; a(8)–a(16)
Alekseyev 2009, a(17)–a(22) Wang 2024). `A144311(n)` **is** `G₂ − 1`, so the
published levels are already covering optima and need no conversion
(`research/SEARCH-CONVENTIONS.md` §2). Both tables are cross-checked against the
instrument's own `G2EXACT`, 14 of 14 and 8 of 8.

**Which truth each level uses** is a column in the table below: `ours` for
`x ≤ 43`, `A1443` for `x = 47..79`. The two are never mixed in a verdict.

**Ten self-tests pass**, including brute-force `G₂(x#)` off the tile at
`x = 2,3,5,7,11,13` against the ladder, determinism of both the deterministic and
the seeded greedy, and three negative controls proving the replay verifier is not
a rubber stamp (it rejects a shifted class, a repeated prime, and a prime outside
the allowed list).

**The covering form.** By the CRT identity in `two-class-lower-bounds.js`'s header
(Chris's PAIRED collapse, `research/attack2-rankin2d.js`), `G₂(x#) − 1` **is** the
largest `m` for which `[1,m]` can be covered by one residue pair `{a_p, a_p−2}`
per prime `p ≤ x`, every `a_p` free. So the greedy is scored against an exact
optimum, never against an estimate. **[PROVEN]**

---

## 3. The table

Budget **A**, the headline: `R = 2048` restarts, window `W = 200`, grid `NG = 24`,
call cap `3e6`, **fixed across every level**, chosen from a cost probe before the
ladder ran and never tuned per level. Bracket seed is the instrument's closed
form `start = x (ln x)²`, so no level is seeded from another. Every row is
replay-verified.

| x | np | truth | G₂(x#) | optimum | greedy | short | ratio | direct | from |
|---|---|---|---|---|---|---|---|---|---|
| 2 | 1 | ours | 2 | 1 | 1 | 0 | 1.0000 | 1 | – |
| 3 | 2 | ours | 6 | 5 | 5 | 0 | 1.0000 | 5 | – |
| 5 | 3 | ours | 12 | 11 | 11 | 0 | 1.0000 | 8 | 13 |
| 7 | 4 | ours | 30 | 29 | 29 | 0 | 1.0000 | 27 | 45 |
| 11 | 5 | ours | 42 | 41 | 41 | 0 | 1.0000 | 39 | 63 |
| 13 | 6 | ours | 66 | 65 | 65 | 0 | 1.0000 | 53 | 86 |
| 17 | 7 | ours | 108 | 107 | 107 | 0 | 1.0000 | 85 | 136 |
| 19 | 8 | ours | 150 | 149 | 149 | 0 | 1.0000 | 103 | 165 |
| 23 | 9 | ours | 204 | 203 | 203 | 0 | 1.0000 | 203 | – |
| 29 | 10 | ours | 258 | 257 | 257 | 0 | 1.0000 | 257 | – |
| 31 | 11 | ours | 348 | 347 | 347 | 0 | 1.0000 | 228 | 364 |
| 37 | 12 | ours | 528 | 527 | 527 | 0 | 1.0000 | 518 | 554 |
| 41 | 13 | ours | 546 | 545 | 545 | 0 | 1.0000 | 353 | 629 |
| 43 | 14 | ours | 618 | 617 | **617** | 0 | **1.0000** | 604 | 759 |
| 47 | 15 | A1443 | 708 | 707 | 704 | 3 | 0.9958 | 701 | 728 |
| 53 | 16 | A1443 | 870 | 869 | **869** | 0 | **1.0000** | 854 | 1046 |
| 59 | 17 | A1443 | 966 | 965 | 953 | 12 | 0.9876 | 910 | 989 |
| 61 | 18 | A1443 | 1080 | 1079 | 1074 | 5 | 0.9954 | 1050 | 1215 |
| 67 | 19 | A1443 | 1284 | 1283 | 1228 | 55 | 0.9571 | 1228 | – |
| 71 | 20 | A1443 | 1398 | 1397 | 1313 | 84 | 0.9399 | 1297 | 1385 |
| 73 | 21 | A1443 | 1530 | 1529 | 1487 | 42 | 0.9725 | 1487 | – |
| 79 | 22 | A1443 | 1710 | 1709 | 1635 | 74 | 0.9567 | 1635 | – |

`direct` is the largest target the variant family ever covered outright at that
level; `from` is the target whose **failed** run left the winning prefix, blank
where the answer was a cover of its own target. Both columns cost nothing and
are the subject of §5.

Scored:

| reading | exact | min ratio | mean ratio | verdict |
|---|---|---|---|---|
| the thirteen the rule names, x = 2..41 | **13 of 13** | 1.0000 | 1.0000 | **ESTABLISHED** |
| all fourteen measured here, x = 2..43 | **14 of 14** | 1.0000 | 1.0000 | **ESTABLISHED** |
| the eight A144311 optima, x = 47..79 | 1 of 8 | 0.9399 | 0.9756 | *not in the rule* |

---

## 4. Budget or structure

The control budget **B** is `R = 512`, otherwise identical and equally uniform.
It is exactly the instrument's own `np ≤ 15` schedule row, applied to **all**
levels rather than only the small ones. Differencing the two uniform ladders is
the discriminating test the instrument's own tail asks for and cannot run from
inside, because its extension levels sit on a different schedule row from its
measured ones.

| x | optimum | R=512 | R=2048 | gained | still short | reading |
|---|---|---|---|---|---|---|
| ≤ 41 | – | exact | exact | 0 | 0 | exact at both budgets |
| 43 | 617 | 611 | **617** | 6 | 0 | **budget: 4× restarts closed it** |
| 47 | 707 | 701 | 704 | 3 | 3 | still moving with budget |
| 53 | 869 | 836 | **869** | 33 | 0 | **budget: 4× restarts closed it** |
| 59 | 965 | 953 | 953 | 0 | 12 | no movement from 4× restarts |
| 61 | 1079 | 1028 | 1074 | 46 | 5 | still moving with budget |
| 67 | 1283 | 1211 | 1228 | 17 | 55 | still moving with budget |
| 71 | 1397 | 1313 | 1313 | 0 | 84 | no movement from 4× restarts |
| 73 | 1529 | 1487 | 1487 | 0 | 42 | no movement from 4× restarts |
| 79 | 1709 | 1635 | 1635 | 0 | 74 | no movement from 4× restarts |

**The 43# shortfall was budget, and so was 53.** That settles the question the
instrument's tail flagged at its newest level. Above 53 the picture changes: four
of the top six levels take nothing at all from four times the restarts and stay
12, 84, 42 and 74 short. On this evidence **the greedy rule itself, not the
search around it, is what runs out somewhere in x = 59..79.** **[MEASURED]**

---

## 5. The mechanism, which is the most transferable thing here

**At 15 of the 22 levels the answer came from a covered PREFIX left by a FAILED
attempt at a larger target, not from covering its own target.** A failure at
target `t` still emits a legal `(a_p)` covering `[1, prefix]`, and that prefix is
a certificate in its own right.

`x = 43` is the sharpest case and it is worth stating in full: **the variant
family never covers 617 outright — the largest target it covers is 604 — and the
certificate for 617 falls out of the failed run at 759.**

Three consequences.

1. **"Restarts needed to cover `m = G₂ − 1`" is the wrong meter for this search.**
   §6's table is censored from `x = 41` upward under exactly that meter, at the
   same levels where the ladder is exact. There is no contradiction; the meter is
   narrower than the search.
2. **Any tuning that shrinks the polish window or halts at the first failure
   destroys the path that finds the optimum.** This is the same defect the
   2026-08-18 repair removed, arriving from a second direction.
3. It is a reason to expect the greedy's reach to be *better* than a restart
   count suggests, and it is not a reason to expect it to keep up with `x`.

---

## 6. The budget law

At the optimum's own target, median restarts to first cover, 9 independent seed
bases, cap 6000. Read as a **pessimistic proxy**, per §5.

```
    x   np   optimum   median restarts to first hit   censored
   13    6        65                         2   -
   17    7       107                         3   -
   19    8       149                        10   -
   23    9       203                        15   -
   29   10       257                       986   -
   31   11       347                      1061   -
   37   12       527                       374   -
   41   13       545             6000+ (never)   6 of 9
   43   14       617             6000+ (never)   9 of 9
   47   15       707             6000+ (never)   9 of 9
```

Over the seven uncensored levels `log(median restarts)` rises **1.1436 per added
prime, a factor of 3.14**. Its *slope* is the honest number and it is the slope
that decides whether an oracle extends. **[MEASURED]**

---

## 7. Non-monotonicity, re-measured rather than inherited

Exhaustive scan of the 100 targets below the reached maximum, every variant in
the family:

```
x = 23: max reached  203,   0 infeasible m in the 100 below it, longest run 0
x = 31: max reached  347,  12 infeasible m in the 100 below it, longest run 7
x = 37: max reached  527,  10 infeasible m in the 100 below it, longest run 1
```

So the defect the repair fixed is **level dependent and invisible at some
levels**, which is how a bisection survived being wrong. The window `W = 200`
used throughout sits far above the longest run of 7 seen anywhere here.

---

## 8. The sixteen Y2 levels: SKIPPED-cost

**Not recomputed.** This is a cost decision stated, not a result withheld.

- The corrected instrument already owns that ladder, `two-class-lower-bounds.js`
  §2+3, and its header records the price: **about 235 minutes for the sixteen
  levels, of which x = 4001 alone is 71.**
- The exact ladder measured here, 22 levels topping out at 22 primes, is already
  ~14 minutes. `x = 4001` carries 550 primes. Folding the Y2 ladder into this
  script multiplies its runtime roughly twentyfold and reproduces numbers the
  instrument already produces, at the instrument's schedule rather than at a
  fixed budget.
- **What it would take:** the levels are independent since the chaining was
  removed, so it shards and the wall clock is the longest rung, not the sum:
  `node research/two-class-lower-bounds.js --ladder-only --levels=4001`, one
  process per level, sixteen processes, ~71 minutes wall clock.
- **What this run says about those sixteen numbers anyway:** nothing that
  transfers. Every Y2 is a certified lower bound on `G₂(x#) − 1` and none is an
  estimate of it. Their schedule *falls* with the prime count while §6's
  requirement *rises* with it.

---

## 9. What this does NOT show

1. **It does not license a G₂ ladder to x = 100+.** Item 1b's stated win was a
   conjectural ladder to `x = 100+` accurate to a fraction of a percent. What is
   demonstrated is exactness to `x = 43` on this project's own terms, exactness
   at one further published level, and a measured decay to **0.9567 by x = 79**.
   The fitted ratio reads **0.9483 at x = 229**, and that is a fit, not a
   measurement, on a curve that is not established as a power law.
2. **It does not measure the greedy above x = 79.** Nothing beyond 79 is exact
   for anyone. Every claim about the instrument's fidelity above the exact
   frontier remains unmeasured, here and elsewhere.
3. **It does not establish the degradation as a law.** The −0.02353 slope rests
   on 17 points over a range of 6× in `x`, and 8 of those points are somebody
   else's optima obtained by a different method. The leave-one-out range is
   narrow, which says no single point drives it; it does not say the functional
   form is right.
4. **The 14-of-14 sweep is at one seed base.** All randomness derives from
   `SEED_BASE = 20260818`. §6 shows that at `x = 41` six of nine alternative seed
   bases never cover the optimum's own target within 6000 restarts. §5 explains
   why that is not a contradiction, and it is still a warning: the sweep is a
   property of this instrument at this budget with this seed, not a theorem about
   the greedy rule.
5. **It says nothing about the covering economy asymptotically**, which dies at
   `x = 13` for an entirely different reason, and nothing about the 4.2665
   exponent.
6. **It does not re-derive the exact ladder.** Truth is taken from
   `exact-g2-ladder.js` and A144311. Only the levels `x ≤ 13` are independently
   brute-forced here.

---

## 10. What this unblocks

Item 1b gated 1c–1e. On this result:

- **1c (extend the exact ladder to 43# and 47#)** is *partly answered from the
  side*: the greedy's `x = 47` reading is 704 against the true 707, so the greedy
  does **not** substitute for the enumeration there, and 1c's enumeration is
  still the only route to a new exact term. The Poisson-window pre-registration
  discipline it asks for is untouched by this run.
- **1d (does G₂(x#)/x² fall?)** gets an instrument that is trustworthy to
  `x = 43` and demonstrably not trustworthy at `x = 79`. It does **not** get the
  `x = 100+` ladder it was waiting for. Any refit that leans on greedy values
  above `x = 53` is leaning on numbers that are 4 to 6 percent low and falling.
- **The Y2 curve's levels remain superseded and its direction remains
  unlicensed** by anything here.
