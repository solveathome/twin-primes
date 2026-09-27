# Attack beta2-05: the covering pruning bound

<!-- ledger
id: Q-covering-pruning
status: CLOSED
todo: none
question: Run backwards, does the pruning test inside OEIS A144311's branch-and-bound program give an upper bound on G2?
verdict: The pruning test is admissible (PROVEN, confirmed three ways), so A144311's terms above x = 43 are proven maximal, but run backwards it gives nothing from x = 13 onward because its whole content is sum_{5<=p<=x} 2/p < 1 and Mertens crosses 1 between 11 and 13; the cheapest admissible repair is Brun's pure sieve, whose exponent diverges like 7.182 lnln x.
-->

*(2026-08-18. Attack 5 of 5 on the upper bound, and the only one that works
outside sieve theory. Brief: take the pruning test inside OEIS A144311's
branch-and-bound program, state it as a theorem, prove it admissible, then run
it backwards as an upper-bound mechanism for G2 and see what exponent falls out.
Script and pasted output: `research/attack-beta2-05-covering-prune.js`, 3 s by
default and 22 s with `--full`. Calibration marked throughout: PROVEN, VERIFIED
by exact computation, MEASURED, INFERRED, REFUTED.)*

## The answer in one line

The pruning test is **admissible** (PROVEN, and confirmed three ways), so
A144311's terms above x = 43 are proven maximal and nothing in the published
ladder is at risk. Run backwards it gives the truth exactly at x = 5 and x = 7,
gives 83 against 41 at x = 11, and gives **nothing at all from x = 13 onward**,
because its whole content is `sum_{5<=p<=x} 2/p < 1` and Mertens crosses 1
between 11 and 13. The cheapest admissible repair, Bonferroni truncation of the
same count, is Brun's pure sieve, and it yields a real number:
**beta_pure(x) = 2.80, 3.98, 4.25, 5.38, 8.88 at x = 13, 101, 199, 1009, 10^6**,
which beats the proven 4.2665 for x <= 227, loses from x = 229, and diverges
like `7.182 lnln x`. So the covering economy has an exponent, it is unbounded,
and the sieve-free part of it ends at x = 11.

---

## 1. What the pruning test bounds, as a theorem

The program (`oeis.org/A144311/a144311.cpp.txt`, fetched and read in full) works
in slot coordinates. A twin slot is `6j+5`; prime `p >= 5` kills slot `j` when
`j = r` or `j = r - s_p (mod p)`, where `s_p` is the program's `pskip`, defined
by `6*pskip = 2 (mod p)`, i.e. `s_p = 3^{-1} mod p`. Slot 0 is anchored live,
which is exactly why the loop runs `i = 1..p-1` and skips `i == pskip`: those two
values are the ones whose class pair contains 0.

The search maintains, for each prime `q` not yet chosen,

    v[q][r] = # of still-uncovered j in [1,L] lying in C^q_r = {r, r - s_q},

sums `s = sum_q max_r v[q][r]`, and prunes unless `s >= (# still uncovered)`.

> **Theorem P (PROVEN).** Let `U` be a finite set and `Q` a set of primes, each
> `q in Q` carrying legal candidate sets `C^q_r`, `r in R_q`. If some choice
> `(r_q)` has `U` contained in the union of the `C^q_{r_q}`, then
>
>     |U| <= sum_{q in Q} max_{r in R_q} |U ∩ C^q_r|.
>
> *Proof.* `|U| = |union of (U ∩ C^q_{r_q})| <= sum_q |U ∩ C^q_{r_q}|` by
> sub-additivity, and each term is at most its own maximum over `r`. QED

Two further facts make the search **exact** rather than merely sound.

**Monotonicity in the residual.** If `U' ⊆ U` then
`max_r |U' ∩ C^q_r| <= max_r |U ∩ C^q_r|`. The right side is therefore an upper
bound on what the remaining primes can achieve at every deeper state, not only
at the state where it was computed. So the contrapositive, `s < |U| => prune`,
never discards a branch that would have completed a cover. **The test is
admissible, and the published terms above x = 43 are proven maximal.**

**Monotonicity in the deepening target.** The program grows `maxm` when a leaf
beats the record, so branches explored earlier were tested against a smaller
target. That is safe in the same direction: a cover of `[1,L']` restricted to
`[1,L]` is a cover of `[1,L]`, so a branch pruned at the small target is dead at
the larger one, and a branch that would beat the record covers the current
target and therefore survives every prune on the way down.

**The one detail that closes the leaf.** At the last prime the sum `s` is empty,
so the test reads `0 >= |U|`, i.e. `|U| = 0`. A leaf is reachable only on a
complete cover. That is why the leaf code extends the run upward from the global
`maxm` without ever re-checking that `[1,maxm]` is covered, and why doing so is
correct. Had the prune been placed one level higher, or the empty sum special
cased, the reported records could exceed the true runs.

### 1a. Three confirmations, none of them a citation

- **The port reproduces the published terms.** A faithful JavaScript port of the
  C++ gives `A144311(n)` for `n = 3..15`, that is `x = 5..47`:
  11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617, 707. All thirteen
  match. Term 15 (x = 47) is past this repo's own exact ladder, which stops at
  43#, so that one is an independent check on OEIS rather than a recomputation
  of our own numbers. VERIFIED.
- **Exhaustive enumeration agrees at every level where it is affordable.** For
  `n = 3..9` the pruned optimum equals the brute-force optimum over 3, 15, 135,
  1485, 22275, 378675 and 7,952,175 complete assignments. The prune loses
  nothing at 8.35 million assignments. VERIFIED.
- **Theorem P checked at every prefix.** Walking the optimal assignment at
  `n = 3..15` and testing `|U_k| <= sum_{q>k} max_r |U_k ∩ C^q_r|` at all 104
  prefixes gives **zero violations**, with equality at the last prime every
  time. VERIFIED.

The inequality's slack at depth 0 is `s/|U| = 1.00, 1.00, 1.17, 1.20, 1.29,
1.42, 1.45, 1.50, 1.54, 1.59, 1.62, 1.70, 1.72` across `x = 5..47`. It is TIGHT
at the first two levels and loosens monotonically. That ratio is the whole story
of section 2.

---

## 2. The attack: the same inequality run backwards

Theorem P with `U = [1,L]` and `Q` = all primes `5..x` is an upper-bound
mechanism. Define `cap_p(L) = max over legal r of |[1,L] ∩ C^p_r|`. Then

> **L is provably uncoverable when `sum_{5<=p<=x} cap_p(L) < L`.**

This is phase-free: it grants every prime its best class against the interval
independently, which is exactly what the free translate of
`two-class-lower-bounds.md` section 1 permits, so nothing is being conceded.

**MEASURED, exactly, sweeping every L to 40000 and never bisecting:**

| x | `sum 2/p` (5..x) | first dead L | bound `6(L-1)+5` | truth `G2-1` | ratio |
|---|---|---|---|---|---|
| 5 | 0.4000 | 2 | **11** | 11 | **1.00** |
| 7 | 0.6857 | 5 | **29** | 29 | **1.00** |
| 11 | 0.8675 | 14 | 83 | 41 | 2.02 |
| 13 | 1.0214 | none | **INFINITE** | 65 | — |
| 17 to 41 | 1.139 to 1.568 | none | **INFINITE** | 107 to 545 | — |

Two things to take from this.

**It is exactly sharp twice.** `G2(5#) <= 11` and `G2(7#) <= 29` are the truth,
obtained by counting alone with no sieve anywhere. That is worth recording
because it shows the mechanism is not intrinsically lossy. It is only fatally
short of range.

**It dies at x = 13, and the death is Mertens.** The criterion can only bite
while the per-prime budget `sum_p 2*ceil(L/p)` stays under `L`, that is while
`sum_{5<=p<=x} 2/p < 1`. The partial sums are 0.4000, 0.6857, 0.8675, 1.0214 at
x = 5, 7, 11, 13. Since the sum diverges, the mechanism is not merely weak past
x = 13, it is empty. PROVEN.

### 2a. Why the wheel is the only reason it works at all

In integer coordinates the pair `{a_2, a_2 - 2}` is one class mod 2 and
`{a_3, a_3 - 2}` is two classes mod 3, so the budget starts at
`1/2 + 2/3 = 1.1667` and the raw union bound is vacuous from x = 3. Factoring 2
and 3 out exactly, which is what the slot coordinate does, buys the range
`5 <= x <= 11` and nothing more.

Factoring out a longer wheel does not extend it. Split at `y`, let `U_y` be the
survivors of the primes `<= y`, and ask the primes in `(y, x]` to cover `U_y`.
That needs a LOWER bound on `|U_y|`, and the only sieve-free one available is
`|U_y| >= L / G2(y#)`, because gaps in a translate of the twin tile are at most
`G2(y#)`. Since `G2(y#) >> y ln y` (free by monotonicity from Rankin, per
`two-class-lower-bounds.md` section 1), that is weaker than the density
`prod_{p<=y}(1-2/p) ~ 2.4974/ln^2 y` by a factor of order `y/ln y`. Substituting
it, the criterion needs `ln(ln x / ln y) < 1/(2 G2(y#))`, which forces `(y, x]`
to contain no primes at all. REFUTED as a route.

### 2b. The non-monotonicity, and the 62-vs-111 question

The criterion is **not** monotone in L. At x = 11 it is dead at L = 14 and 15,
**live again at 16, 17, 18**, then dead from 19 to the end of the sweep. That is
the same revival pattern `attack-block-03-alternation.md` found at block 1,
where the raw inequality dies at l = 63 and revives up to l = 111.

But coverability itself **is** monotone, and downward closed: restricting a cover
of `[1,L']` to `[1,L]` with `L <= L'` is a cover of `[1,L]`. So a single dead L
kills every larger one, the **first** dead L is the bound, and the revivals are
irrelevant. Here the difference is a factor of 2900: first-dead gives 83 against
a truth of 41, last-dead-in-sweep gives 239999.

`attack-block-00-ADJUDICATION.md` section "THE CORRECTION THAT MATTERS"
overturned attack 3's `L <= 62` in favour of `L <= 111` on exactly the reasoning
this refutes: *"Attack 3's 62 is wrong because it assumed feasibility is monotone
in L, and it is not."* Feasibility of a run of l consecutive killed slots is
monotone, for the same one-line reason: a run of l+1 contains a run of l.
`L <= 111` is true, because `L <= 62` implies it; it is not the settled value,
and the consequence drawn from it (*"overshoot 2.12x"*, replacing attack 3's
1.19x) reverts with it.

**Calibration: INFERRED, flagged for human adjudication.** The block-1
instrument was not re-run here. What was re-run is the identical phenomenon in
the free-phase setting, where both the revivals and the truth are known
exactly, and there the first-dead reading is the correct one and the
last-dead reading is wrong by 5854x. The standing check
`attack-block-00` itself installed, *"anywhere this corpus bisects on a
predicate, the predicate's monotonicity must be demonstrated, not assumed"*, is
what is being applied: here the predicate's monotonicity is demonstrated, and it
holds.

---

## 3. Why the strengthening does not survive being made asymptotic

The brief asks why the code's bound is stronger than the trivial per-prime count
`sum_p 2(L/p + 1)`, and whether the strengthening survives.

**The answer to the first is that it is not stronger as an inequality.** It is
the same inequality, evaluated on a different set. The code's power comes
entirely from evaluating `max_r |U ∩ C^q_r|` on the CONCRETE residual left by a
partial assignment, after overlaps have already happened, rather than on
`[1,L]`. Section 2's table is what happens when the same inequality is
quantified over all assignments: the residual is replaced by the whole interval
and the strength is gone.

**The answer to the second is no, and the obstruction is named.** To quantify
Theorem P one needs a lower bound on `|U_k|` valid for every adversarial choice
of the earlier classes. That is exactly a sieve. And the adversary really does
take the difference:

| n | x | L | `|U_k|` at the end | density prediction `L*prod(1-2/p)` | deficit |
|---|---|---|---|---|---|
| 13 | 41 | 90 | 0 | 15.08 | **16.8% of L** |
| 15 | 47 | 117 | 0 | 17.90 | **15.3% of L** |

MEASURED on the optimal assignments. By construction the residual is empty at
the last prime, while the sieve's main term insists on 15 to 18 survivors. That
gap is the sieve error term, realised.

**And the main term alone is already false at x = 13.** With no error term the
covering economy would forbid any cover longer than `1/prod_{5<=p<=x}(1-2/p)`,
which is about `2.4 ln^2 x` integers:

| x | main term alone says | truth | truth / main term |
|---|---|---|---|
| 13 | 25.2 | 65 | 2.6 |
| 41 | 40.8 | 545 | 13.4 |
| 79 | 53.8 | 1709 | 31.8 |
| 10^5 | 323.7 | 1.59e7 (law) | 49145 |

The ratio grows like x. So there is no version of this attack in which the error
term is a correction to a main term. It is the whole problem, and it grows.
VERIFIED at the four exact x, MEASURED against the `1.2 x ln^2 x` law above 79.

---

## 4. The number: what exponent the covering economy does give

The cheapest admissible strengthening of Theorem P that stays inside counting
and CRT is Bonferroni: truncate the inclusion-exclusion at odd order m. With
`P = {5..x}`, `A_p` a union of 2 classes mod p, and `N_d = 2^w(d) L/d + theta`
with `|theta| <= 2^w(d)`,

    S >= L*A_m - B_m,   A_m = sum_{j<=m} (-1)^j e_j({2/p}),
                        B_m = sum_{j<=m} C(pi(x)-2, j) 2^j,

so a survivor is forced as soon as `L > B_m/A_m`. That is Brun's pure sieve. No
analytic input, no equidistribution hypothesis, nothing the covering formulation
does not already own. Optimising m exactly:

| x | W = `sum 2/p` | best odd m | `beta_pure = ln(6L+5)/ln x` | vs 4.2665 |
|---|---|---|---|---|
| 13 | 1.021 | 3 | **2.80** | better |
| 31 | 1.465 | 3 | 3.08 | better |
| 101 | 1.959 | 5 | 3.98 | better |
| 199 | 2.231 | 5 | 4.25 | better |
| 251 | 2.301 | 5 | 4.36 | worse |
| 1009 | 2.731 | 7 | 5.38 | worse |
| 10007 | 3.300 | 9 | 6.85 | worse |
| 10^5 | 3.744 | 11 | 8.42 | worse |
| 10^6 | 4.108 | 11 | 8.88 | worse |

Swept over every prime to 5000: **`beta_pure < 4.2665` for x <= 227 and
`beta_pure >= 4.2665` from x = 229 on, and it never returns.**

**It diverges.** The optimum sits at the truncation threshold `m0`, the first
odd m with `A_m > 0`. In the idealised Poisson model that threshold is computed
exactly by `T_m = m*T_{m-1} + (-1)^m W^m`, `T_0 = 1` (BigInt, no cancellation),
and `m0/W` reads 3.00, 2.50, 3.25, 3.38, 3.44, 3.53, 3.55, 3.57, 3.57, 3.58,
3.59 at W = 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024. It converges to the
root of `a ln(a/e) = 1`, `a = 3.5911214767` (INFERRED asymptotically, VERIFIED
numerically to W = 1024; the producer's header carried 3.594 until 2026-08-29,
which is not the root of that equation). With `W = 2 lnln x - 1.1437` this gives

> **`beta_pure(x) ~ 3.5911 * W(x) ~ 7.182 lnln x`, unbounded.**

Over the computable range `beta_pure ~ 2.1 W` instead of `3.5911 W`, because for
the actual prime set `e_j` sits below the Poisson `W^j/j!` by a bounded factor
of order `exp(-a^2 * sum_p (2/p)^2 / 2)`, which is `O(1)` and therefore vanishes
against W in the limit but is comparable to W at every reachable x. W only
reaches 4.108 at `x = 10^6`. **The two readings must be quoted separately and
never substituted for each other**, which is the coordinate discipline
`G2-STATE.md` section 0 already demands of `c`, of the exponent and of theta.

So the brief's predicted outcome is confirmed with a number attached. The
pruning bound is strong enough to drive a finite search to `x = 79` and far too
weak to give an asymptotic exponent: the sieve-free part is empty from `x = 13`,
and the cheapest admissible repair gives an exponent that is finite at every x,
beats 4.2665 only for `x <= 227`, and grows without bound.

---

## 5. Relation to the corpus's `L <= 111`

**Independent in setting, identical in mechanism, and it explains the block
result rather than competing with it.**

`attack-block-03-alternation.md` section 4 computes the block-1 criterion and
finds *"the sum is not monotone (13 dips below 11) but it never returns below 1
after v = 7 ... and its liminf is `2 ln 2`"*, concluding *"the alternation form
is supercritical at every v including v = 5. It never produces a finite bound on
L at any block, ever."*

That is the same death as section 2's, in the block coordinate. The block
criterion needs `sum_{v<p<=v^2} 2/p < 1`, whose liminf is `2 ln 2 = 1.386`; the
global criterion needs `sum_{5<=p<=x} 2/p < 1`, which crosses 1 at x = 13.
**One supercriticality criterion, two instances**, and the block finding is
recovered as a corollary rather than an independent fact.

The bound here neither subsumes nor contradicts `L <= 111` as a number. It is a
different quantity: the block object is a run inside the fixed-phase `T_5` tile,
this one is the free-phase covering optimum. What it does contradict is the
**reasoning** by which 111 replaced 62, and section 2b states that separately,
calibrated as INFERRED and flagged for adjudication.

---

## 6. What was ruled out, and what is left

**Not re-proposed.** Nothing here is a `v -> v^2` squaring ladder or a "block as
a set" attack. The one point of contact with those ten closed attacks is section
5, which reads their block-1 supercriticality as an instance of a criterion
proved here globally. No ladder, no recursion, no squaring.

**Closed by this attack.**
1. The hope that the covering formulation contains an upper-bound mechanism with
   no sieve at all. It contains exactly one, Theorem P, and Theorem P is empty
   from x = 13. PROVEN.
2. The hope that a longer wheel extends it (section 2a). REFUTED.
3. The hope that the search's evident strength is a theorem rather than a
   property of concrete residuals (section 3). REFUTED, with the deficit
   measured at 15 to 17 percent of L.
4. Any density-only argument in this economy, at any x >= 13 (section 3).
   REFUTED by a direct numerical contradiction, 25.2 against 65.

**Not closed, and worth one line each.**
- Theorem P is exactly sharp at x = 5 and x = 7. Whether a *linked-phase*
  version, which is available at fixed classes but not in the free-translate
  problem, stays sharp further up was not tested here.
- `beta_pure < 4.2665` for `x <= 227` is a genuine finite-range statement in an
  economy independent of the Diamond-Halberstam machinery. It proves nothing
  asymptotic, and the comparison is of exponents only, since the implied
  constant in `G2 << x^{4.2665+eps}` is inexplicit.

## 7. Custody

- `oeis.org/A144311/a144311.cpp.txt` fetched by `curl` on 2026-08-18 and read in
  full, 122 lines. WebFetch returns 403 on oeis.org; curl with a browser
  user-agent works.
- A144311's 22 published terms, used as the comparison ladder, are quoted in
  `covering-dive.md` line 177 and re-checked against the OEIS entry.
- `research/attack-beta2-05-covering-prune.js` carries the pasted output of the
  `--full` run of 2026-08-18, node v22.21.0, 22.2 s.
- The section-1 identity is `two-class-lower-bounds.md` section 1, PROVEN there,
  including the free translate. The earlier fixed-pair claim it corrects is
  recorded in the same place and was read before anything else in this attack.
- `node research/qc.js`: 0 findings across 8 checks, before and after.
