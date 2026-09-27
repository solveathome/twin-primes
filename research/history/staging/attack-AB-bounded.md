# Attacks A and B, salvaged: B is proved polylog, and B never mattered

<!-- ledger
id: Q-beta2-AB-bounded
status: ANSWERED
todo: none
question: Is B(z,s) bounded, and does bounding it move the 4.2665 exponent?
verdict: B(z,s) <= 9 A(z)^2 (E(z) - 1) = O((log z)^8) is proven, unconditional, explicit and uniform in s, but the gap it closed was never load-bearing, the estimate has a published neighbour at s >= 9, Opera de Cribro Lemma 6.18, which does not cover this corpus's s in [2.0, 3.4], and the route to B = O(1) is measured dead as a uniform statement.
-->

*(2026-08-18 salvage of attacks A and B of ten on the 4.2665 exponent. Both
died on API errors before writing a report; they left one shared script,
`research/attack-beta2-A-B-bounded.js`, and attack B left unverified
prototypes. This file is the report neither of them wrote. Legend:
**[PROVEN]** published theorem with source; **[VERIFIED]** checked
computationally in this repository; **[MEASURED]** empirical, finite range;
**[ABSENT]** searched and found nothing, with the channel and a
known-positive calibration probe named in the same session; **[INFERRED]**
our deduction from sourced facts.)*

## HEADLINE

**Attack A closed its gap and then showed the gap was never load-bearing.**

1. `B(z,s) <= 9 A(z)^2 (E(z) - 1) = O((log z)^8)`, unconditional, explicit and
   uniform in `s`. Three-step chain, every step verified per-`e` with zero
   violations over `z = 13..41`. **[PROVEN]** for the chain (re-derived 2026-08-29,
   `redteam-0829-theorem1.md`), **[VERIFIED]** for the steps.
2. That is **enough**. The mean-square Lemma V needs `B <= H/log^6 H`; `H = z^u`
   is a *power* of `z` and `B` is *polylog* in `z`, so the inequality holds for
   every fixed `u > 0` and all large `z`. **The mean-square Lemma V is now
   unconditional and useful, with no hypothesis anywhere.**
3. **The `O(1)` question is measured DEAD as a uniform statement and alive only
   as a mean.** `sup phi` rises at all nine steps over `z = 13..47`
   (1.2000 -> 2.0658); the constant model's RSS is **248x** the linear model's.
   The `phi^2`-weighted mean is flat (0.5733 -> 0.5839, RSS ratio 5.7x). So no
   sup-norm argument gives `B = O(1)`; only a mean-value argument over the
   divisor lattice can.
4. **And the mechanism of the observed flatness is exact.** The per-prime
   algebra collapses: `(1-2/p)^2 (1+4p/(p-2)^2) = 1 + 4/p^2` EXACTLY (worst
   deviation 2.22e-16 over all odd `p < 2000`). `B` sits at a constant fraction
   `0.3286 -> 0.3352` of `B_model = (9/4) prod(1+4/p^2) - Delta(z)^2`, an
   absolutely convergent Euler product with limit **4.6063**. `B` is flat
   because it is `O(1/(z log z))` from a limit, not because a `log^4` cancels.

5. **In the currency that could reach `G2`, `B` is not a term at all.**
   `attack-beta2-01` §4(ii)'s all-positions exponent takes `min(B H, B2)`, and the
   `min` picks the `B2` branch at **every** `z` from 13 to 47. `B` binds only
   below the crossover `u* = ln(B2/B)/ln z` = 1.4641..2.6912, while the exponent
   itself runs 3.4299..7.1966. **[VERIFIED]**, and the corrected computation
   reproduces the source's 4.3604 / 4.7087 / 5.0021 exactly.
6. **The estimate is already published.** Opera de Cribro **Lemma 6.18** —
   corrected proof in J. B. Friedlander, *"A weaker but simpler sieve
   inequality"*, arXiv:2607.05707 (7 Jul 2026), appendix — is our object with a
   *stronger* conclusion. **[PROVEN]**, with source. It needs `beta >= 8`,
   i.e. `s >= 9`, against our `s` in [2.0, 3.4]. **The forward move is no longer a
   search.**

**AND ATTACK B'S SPLIT IS CLOSED, WITH ONE VALUABLE BY-PRODUCT.** Attack B left
no repo footprint at all. Its recovered prototypes, re-run here, show the phase
split has **no interior optimum at any computable `z`**: `u_split` falls
monotonically in the cutoff and the optimum end `E = P(z)` is the exhaustive
full-period walk — an identity, not a bound — while a fixed cutoff's benefit
decays geometrically in `z`. **The interpolation is asymptotically the bad horn**,
exactly as the brief predicted. The by-product is worth more than the verdict:
**the retained-phase part is NOT a maximal-inequality problem in miniature.**
`sup|Phi|/rms` is **flat in `z`** at 2.93..3.45 over `z = 13..43` and sits below
`sqrt(2 ln E)` at every point. **The maximal wall is entirely in the tail.**

**THE HANDED HEADLINE IS FALSE AS LITERALLY WRITTEN AND IS CORRECTED HERE.**
The script's own closing line says "the spread from A = 0 to A = 8 is under half
a unit of window exponent". It is not: that spread is **2.9379 at z = 13 and
2.8012 at z = 47**. What is under half a unit is the cost **per unit of A**,
`lnln z / ln z` = **0.3672 -> 0.3501** over the same range. Both shrink; only
the per-`A` figure is under half a unit. Corrected statement, **[VERIFIED]**:

> Each extra power of `log z` in `B` costs under **0.37** units of window
> exponent, and that cost shrinks with `z` like `lnln z / ln z`, while
> `theta(z)/ln z` diverges like `z/ln z`. `B` is not the binding term in any of
> the three currencies.

**WHAT THIS DOES TO ITEM A OF TODO.md.** Item A calls the boundedness of `B`
"the single place Lemma V's proof stops". After this salvage that sentence is
wrong twice over, and it should be retired: (i) the gap is **closed** at polylog
strength, which is all the downstream use needs; (ii) it was **never the binding
term** — in the all-positions currency `B` is not even a term (reading 5), and the
exponent that IS delivered there is already **7.1966 at z = 47** and diverging
like `theta(z)/(2 ln z)`. Closing item A is a real theorem and buys **zero**
exponent. What separates the proved mean-square lemma from Lemma V proper is the
position quantifier, not `B` — and that is attack B's ground, where `u_sup` is
already closed.

*(sections below)*

---

## 0. Custody: what was run in this session, by me

Everything numeric below is quoted from one of these.

| artifact | what I did with it |
|---|---|
| `research/attack-beta2-A-B-bounded.js` | ran to completion three times (exit 0, 53-56 s). The first run **reproduces the adjudicator's saved run line for line** — `diff` shows only elapsed-time stamps differing across all 234 lines. |
| the same script's exported `profile()` | imported directly with `node -e` to recompute `u_1`, `B2`, the crossover, and the `z = 53..73` ladder, independently of the printed tables |
| `research/qc.js` | run before and after every edit |
| `research/qc/units.js` | read in full, as required |
| `.../lit/corpus/friedlander-weaker-simpler.txt` | 28,902 bytes on disk; every quotation below checked against it by line number |
| the dead session's surviving background outputs `b3ovopggw.output`, `b2a7mk2ee.output` | read, and then **re-derived from scratch in this session** rather than trusted |

**Nothing in this report is quoted from the dead agents' own prose.** Their
transcripts were mined for *what they did*; every number they claimed has been
re-run here. Their thinking blocks are empty strings with signatures only — the
reasoning content was stripped at write time — so the mathematics was recovered
from the script they wrote and the tool results they received, not from
narrative.

---

## 1. ATTACK A — ESTABLISHED

### 1.1 Theorem 1: `B(z,s) <= 9 A(z)^2 (E(z) - 1) = O((log z)^8)`

**[PROVEN]** for the chain, re-derived step by step in
`history/staging/redteam-0829-theorem1.md` §2 (2026-08-29); the input
`|lambda_d| <= 1` holds exactly by construction for `rosserSupport`, so it
is not a citation the chain depends on. **[VERIFIED]** for each step
per-`e`, which is evidence for the tabled instances and a check that these
definitions match the producer's. Unconditional, explicit, and uniform in
`s`. Three steps:

1. **Partition + triangle.** The sets `{i : e|q_i, gcd(e,d1_i) = e1}` partition
   `{i : e|q_i}` as `e1` runs over divisors of `e`, so
   `Vabs(e) <= T(e) := sum_{i : e|q_i} 1/q_i`. *This step discards every sign,
   and it is where all the looseness lives.*
2. **Euler product over `p < z`.** `T(e) <= 3 A(z) rho(e)`, because each of the
   three certificate blocks has `d1, d2` ranging over subsets of the divisors of
   `P(z)`, and the local states at odd `p` are (neither), (`p|d1`), (`p|d2`) —
   `(p|both)` barred by `gcd | 2` — with weights `1, 1/p, 1/p`, while `e|[d1,d2]`
   bars the first state when `p|e`. At `p = 2` all four states are admissible.
   Hence `A(z) = (5/2) prod_{2<p<z}(1+2/p)`, `r(2) = 3/5`, `r(p) = 2/(p+2)`.
3. **Sum over `e`.** `B <= 9 A(z)^2 (prod_{p<z}(1+p r(p)^2) - 1) = 9 A(z)^2 (E(z)-1)`
   with `E(z) = (43/25) prod_{2<p<z}(1+4p/(p+2)^2)`.

`A(z) ~ c (log z)^2` and `E(z) ~ c (log z)^4` by Mertens, so
`B = O((log z)^8)`, uniformly in `s`, with no hypothesis anywhere.

**Verification, my run** — `viol1` is the worst violation of step 1, `viol2` of
step 2; both read `none` at every level:

```
  z    B(z,3.0)   sum_e e T(e)^2   A(z)      E(z)      9A^2(E-1)   bound/B    viol1  viol2
  13  1.383263    3.3238e+3      8.8636    6.0796  3.5917e+3  2.597e+3   none   none
  19  1.434774    7.5596e+3     11.4305    8.8946  9.2832e+3  6.470e+3   none   none
  29  1.465995    1.3910e+4     13.7323   11.9623  1.8605e+4  1.269e+4   none   none
  37  1.488330    2.1930e+4     15.6264   14.9328  3.0619e+4  2.057e+4   none   none
  41  1.496346    2.5750e+4     16.4710   16.3858  3.7567e+4  2.511e+4   none   none
```

**The bound is honest and enormously lossy**: `bound/B` runs 2,597x to 25,110x
over `z = 13..41`, its looseness growing like `(log z)^6.15` on that range and
heading for `(log z)^8`. Section 4 is where that stops mattering.

**s-uniformity.** The bound does not see `s`; `B` does, a little, and its
**maximum over the corpus band is at `s = 2.0`, not `s = 3.0`** — `B(29,2.0) =
1.6718` against `B(29,3.0) = 1.4660`. Anyone quoting "B is flat at 1.38-1.49"
is quoting the `s = 3.0` column only.

### 1.2 Theorem 1 is ENOUGH, and this is the deliverable

**[INFERRED]**, and it is a two-line check. `sift-limit-attack.md` §4.5 asks for
`R << H/log^3 H`. In mean square that is `sqrt(B H) <= H/log^3 H`, i.e.

> `B <= H / log^6 H`.

`H = z^u` is a **power** of `z`; `B` is **polylog** in `z`. A power beats a
polylog, so for every fixed `u > 0` the inequality holds for all large `z`.
Under Theorem 1 the threshold is `H >> (log z)^14` — a polylog window, below
every window in this corpus. **[VERIFIED]** at the explicit crossing:

```
  z      B proved     H_min (proved)   as u = ln H/ln z    H_min (measured B)   as u
       13  3.592e+3   1.852e+12        11.0128          4.039e+7          6.8283
       29  1.861e+4   1.452e+13         9.0003          4.372e+7          5.2248
      101  1.900e+5   2.565e+14         7.1890            --                --
     1009  4.386e+6   1.126e+16         5.3436            --                --
  1000000  1.091e+9   1.009e+18         3.0007            --                --
```

`u_min` falls 11.01 -> 3.00 across that range and tends to 0. **So the
mean-square Lemma V is now unconditional and useful, with `B = O(1)` not
needed.** That is the answer to the brief's item 3, and the growth rate that
still leaves the statement useful is **any polylog whatsoever** — `A = 8` is
fine, `A = 14` is fine.

### 1.3 The mechanism of the flatness is exact

**[VERIFIED]**, to machine precision. With full (untruncated) Rosser supports
`V(e1,e2)` is computable in closed form and does not depend on the split, giving
`B_model = Delta(z)^2 (9 prod_{2<p<z}(1+4p/(p-2)^2) - 1)`. The per-prime algebra
then **collapses exactly**:

> `(1 - 2/p)^2 (1 + 4p/(p-2)^2) = 1 + 4/p^2`, worst deviation **2.22e-16** over
> all odd `p < 2000`

so `B_model = (9/4) prod_{2<p<z}(1+4/p^2) - Delta(z)^2`, an **absolutely
convergent** Euler product with limit **4.60631320** (both forms agree to
< 5.3e-15 at every `z` tested). At `p = 2` the two admissible states cancel
exactly, so `V_full = 0` for even `e`; even `e` appear at all only because the
level truncation breaks that cancellation.

**So `B` is flat because it sits `O(sum_{p>z} 4/p^2) = O(1/(z log z))` from a
limit — not because a `log^4` cancels a `log^-4`.** `B_model` moves 7% over
`z = 13..47` and has 2% left to run.

### 1.4 The route to `B = O(1)` is measured dead as a UNIFORM statement

**[MEASURED]**, `z = 13..47`, and this is the sharpest structural result in the
attack. With `phi(e) := e Vabs(e) / (2^omega(e) N(e))`, one has exactly
`B = sum_e (4^omega(e) N(e)^2/e) phi(e)^2`, so a uniform `phi <= K` would give
`B <= K^2 B_model = O(1)`.

```
  z    sup phi   arg e     sup psi   rms_w phi   B/B_model
  13    1.2000      33      1.2000     0.5733     0.32863
  23    1.5535     665      2.5872     0.5741     0.32820
  37    1.8667    2387      5.9111     0.5783     0.33128
  47    2.0658    4199      7.5822     0.5839     0.33437
```

`sup phi` rises at **all nine steps**. Model comparison: constant fit RSS
7.593e-1 against linear `c + b ln z` RSS 3.062e-3 — the constant model is
**247.9x worse**, slope `b = 0.6645`. For the `phi^2`-weighted mean the ratio is
only **5.7x**, slope 0.0080, i.e. flat. `sup psi` — the single-split statistic a
one-divisor-at-a-time argument would have to bound — rises far faster,
1.2000 -> 7.5822.

> **The consequence, and it re-classifies the remaining gap.** No sup-norm
> argument can deliver `B = O(1)`; on this evidence the best a uniform argument
> gives is `B = O((log z)^2)`. What is flat is a **weighted mean over the divisor
> lattice**, which is not a statement any maximal technique produces. The `O(1)`
> question is irreducibly a mean-value question.

The rise is not an artifact of `s = 3.0`: at `s = 2.0` the sup runs
3.733, 4.719, 3.049, 3.300 at `z = 13, 19, 29, 37` — higher, and not monotone.

### 1.5 The ladder, extended to z = 73

**[VERIFIED]** — I re-derived `z = 53..73` from scratch in this session rather
than trusting the dead session's surviving background output, and the two agree
to every digit printed (`B(61) = 1.5306277` both ways). Two independent
implementations in the repo (`profile()` and `spectralRecords()`) also agree to
six decimals at `z = 53, 59, 61, 67`.

```
   z     N          #e       B(z,3.0)     B_model     B/B_model
   13        852      31   1.3832631   4.2091415   0.32863
   23       9636     243   1.4502543   4.4188662   0.32820
   37      76484    1527   1.4883304   4.4926608   0.33128
   47     293980    6119   1.5135499   4.5265417   0.33437
   53     466340    9553   1.5201580   4.5347986   0.33522
   59     774812   15385   1.5238048      --          --
   61    1025812   21111   1.5306277      --          --
   67    1574044   31019   1.5343743      --          --
   71    2148388   42947   1.5400763      --          --
   73    2712324   56703   1.5471042      --          --
```

**`B` rises monotonically at every one of the fifteen steps, `1.3833 -> 1.5471`,
+11.84% over `z = 13..73`, with no sign of turning over.**
(Corrected 2026-08-20, mismatch adjudication #40: this said "twenty steps".
The primes from 13 to 73 are 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59,
61, 67, 71, 73 — sixteen rows, fifteen steps. The monotonicity and the +11.84%
both hold; only the count was wrong. `attack-beta2-A-B-bounded.js` now runs the
whole ladder by default and prints `B = 1.5471042` at `z = 73`, so this table
is reproducible from an embedded block instead of being its only witness.) Model comparison over
the `z <= 53` ladder: constant RSS 1.8275e-2; `c + b ln z` RSS 2.0707e-4;
`c (ln z)^a` RSS 1.2312e-4 with `a = 0.20762`; `kappa B_model` RSS 1.2360e-3
with `kappa = 0.33103`.

> **The adversarial thread nobody pulled, and I am flagging it rather than
> closing it.** `B/B_model` is itself **rising**, 0.32820 (z=23) -> 0.33522
> (z=53), while `B_model` has already saturated to within 2% of its limit. So
> `B` is **not** `kappa B_model` for constant `kappa`, and the +11.84% drift in
> `B` is larger than `B_model`'s entire remaining headroom. The Euler-product
> story of section 1.3 explains most of the flatness and leaves a slowly rising
> residual it does not explain. On this data `B = O(1)` remains plausible and is
> **not established**; only `O((log z)^8)` is.

---

## 2. ATTACK A — PROTOTYPE ONLY, AND WHAT REMAINS OPEN

**What attack A never ran.** It died on the weekly token limit at 16:14:56 with
S5 (the ladder) and S6 (the threshold) **written but never executed**, the
`OUTPUT`/`READINGS` banner blocks unfilled, and its report unwritten. So
everything in sections 1.2 and 1.5 above was *coded* by attack A and *first run*
in this salvage. Its own header's claim (4), "EXTENDS the measurement above
z = 37 ... and prices the threshold (S6)", was an assertion about work in flight.

**What remains open, precisely.**

| open question | status | what it costs |
|---|---|---|
| `B = O(1)` | **open.** Theorem 1 gives `O((log z)^8)`; the measured `B` rises +11.84% to z = 73 and `B/B_model` drifts upward while `B_model` saturates | **nothing downstream** — section 1.2. Worth doing for its own sake, not for the exponent |
| the shape of the `O(1)` proof | **identified** — a weighted mean over the divisor lattice, not a sup | section 1.4 rules out every maximal technique |
| `s` at the corner `s = 2.0` | **unexamined.** `B` is largest there (1.6847 at z = 31) and the trend was never fitted at that corner | small |

---

## 3. ATTACK A — THE LITERATURE, AND THE FIND ITS CHILD DIED HOLDING

### 3.1 The absence claims from that session are VOID, and I am not repeating them

Attack A's literature child ran **four** WebSearch calls before the session-wide
budget was exhausted (200 of 200), and thereafter every general channel failed:
arXiv API 301 then 429, Semantic Scholar 429, DuckDuckGo bot-challenge, Mojeek /
Ecosia / Startpage / SearX / Yep / Marginalia all dead, OpenAlex returning *The
Bernoulli sieve* and *Cosmological constant — the weight of the vacuum* for
sieve-weight queries, and Internet Archive `numFound 0`.

**Bing-via-WebFetch is demonstrably poisoned**: for the query
`"sieve weights" "multiples of" Rosser linear sieve "lambda_d"` it returned ten
software-development blog posts, including one on founder velocity.

**No known-positive calibration probe from `research/SEARCH-CONVENTIONS.md` was
run in that session.** Per the standing rule, **every absence claim originating
there is void**, and this report makes none. What the session does have are
three de facto positive controls, all in-session and on-channel: Brave-via-curl
returned the correct Opera de Cribro book and AMS page; zbMATH returned
`Opera de cribro` (Colloq. Publ. AMS 57, 2010) and `The illusory sieve` with
full reviews; local `grep` over a `pdftotext`-ed corpus returned the sourced
weight bounds in section 3.3. Those are channels that worked, not calibrations
of a negative.

### 3.2 THE FIND: the estimate is PUBLISHED, and it is Opera de Cribro Lemma 6.18

**[PROVEN], with source.** The child's last successful fetch, arriving 23 seconds
before it died and never read by it or by its parent:

> **J. B. Friedlander, "A weaker but simpler sieve inequality",
> arXiv:2607.05707v1 [math.NT], 7 July 2026.** MSC 2020: 11N05, 11N35.

Quoting the paper (local text, `friedlander-weaker-simpler.txt`, verified by line
number in this session):

> *"In [3, Lemma 6.18] with H. Iwaniec we gave, for `lambda_d` either the upper
> or lower bound beta-sieve weights, the following bound:"* (line 56)
>
> **(1.3)** `sum_{d|P} d ( sum_{m|P, m = 0 mod d} lambda_m/m )^2 << prod_{p|P} (1 - 1/p)`
>
> *"It is obvious that, by simply using the trivial bound `|lambda_d| <= 1` for
> all d, one obtains the bound `W << (log D)^3` or, even worse, `(log D)^5` if we
> take k = 3. However, as these are sieve weights we should expect a good deal of
> cancellation. But how much? It turns out to be quite a bit."* (line 58)

**Compare, term for term:**

```
  ours   B(z,s) = sum_{e|P(z), e>1}  e * Vabs(e)^2,   Vabs(e) = sum_{e1 e2 = e} |V(e1,e2)|
  his    W      = sum_{d|P}          d * ( sum_{m|P, m = 0 mod d} lambda_m/m )^2
```

Same divisor weight, same inner sum of sieve weights over multiples, same
second-moment shape. **This is attack A's target, in print, since 2010.** And it
is *stronger* than bounded: the right side **decays** like `1/log z`.

**The history matters and is in the paper.** *"It turned out that this proof in
[3] has a small flaw, pointed out to us by K. Matomaki [5]. Our corrected proof
with H. Iwaniec is given, with acknowledgement, in the appendix."* (line 68).
The corrected Lemma 6.18 (line 337) reads:

> Let `2 <= z <= D^{1/(beta+1)}`, and let `lambda_d` be either the upper- or
> lower-bound **beta-sieve weights of level D with `beta >= 8`**. Then (4.1)
> holds, *"the implied constant depending only on beta."*

### 3.3 Why it does not simply drop in, and this is the queue item

**Four deltas, all identified from the source text in this session, none of them
resolved. [INFERRED].**

1. **The hypothesis range excludes ours.** The proof's finish (line 468) reads:
   *"The density function g satisfies the condition [3, (5.38)] of dimension
   `kappa = 2`. Recall that in our Lemma 6.18 we assume that
   `s = (log D/log z) >= beta + 1` and `beta >= 8`."* So it needs **`s >= 9`**.
   **This corpus runs `s` in [2.0, 3.4].** The hypothesis `z <= D^{1/(beta+1)}`
   fails badly at `s = 3`. *That the finish runs at dimension `kappa = 2` — our
   dimension — is the encouraging half.*
2. **The paper itself flags that restriction as possibly soft.** On the trivial
   step `theta_delta^2 <= tau(delta)|theta_delta|` it says: *"it might be that at
   this point we have lost an opportunity to choose a somewhat lesser restriction
   on the size of beta."* (line 199) So `beta >= 8` is a proof artifact the
   author suspects is improvable, not a known barrier.
3. **The absolute values sit in a different place.** His inner sum is signed —
   the cancellation lives *inside* it. Our `Vabs(e)` takes `|·|` on the split
   pieces `V(e1,e2)` **first**, then sums. So `B` is at least the
   Friedlander-shaped quantity, and the entire gap is the split.
4. **Ours is the two-factor object.** Pairs `(d1,d2)` with `gcd | 2` across three
   certificate blocks, against his one-dimensional `lambda_m`. *But the paper
   supplies the bridge it did not know it was supplying*: for Selberg weights it
   records `lambda_d = sum_{[d1,d2]=d} rho_{d1} rho_{d2}` with `|lambda_d| <=
   3^{nu(d)}` (line 216 ff.), which is structurally our split, and states that
   (1.3) still holds there at `k = 3` with trivial bound `(log D)^5`. **That is
   the same trivial-versus-true gap as our `O((log z)^8)` against a measured
   1.55.**

**The forward move this replaces.** Attack A's brief said *"Look for a published
estimate of exactly this shape before inventing one."* One exists. **The queue
item is no longer a search; it is to price Lemma 6.18's `beta >= 8` against our
`s` range and to price the per-split absolute values.** A `3 MB` grep-able sieve
corpus was assembled at the cost of the session's entire web budget and survives
on disk; re-downloading it would be waste.

### 3.4 Sourced inputs that Theorem 1 actually rests on

**[PROVEN]**, recovered by local grep against downloaded texts:

- `|lambda_d| <= 1` for Rosser/beta weights — Iwaniec, *Lectures on sieves*
  (arXiv:math/0209360), *"It follows from the relations (2.3) and (2.6) that
  |λd| ≤ 1"*; corroborated by Motohashi (1.4.1) and Richert, *Lectures on Sieve
  Methods* (9.29), (11.20).
- `#{(d1,d2) : [d1,d2] = d} = 3^{nu(d)}` — Richert, (9.32).

Iwaniec, *Rosser's sieve*, Acta Arith. **36** (1980) 171-202 and *A new form of
the error term in the linear sieve*, Acta Arith. **37** — both PDFs downloaded
and both **image scans**; `pdftotext` yields 17 and 8 bytes respectively, and no
OCR was available. Those two remain **read only through secondary summaries**.

---

## 4. ATTACK B — WHAT IT ESTABLISHED, AND IT LEFT NO REPO FOOTPRINT

Attack B died at 18:15:47, also on the weekly limit, **23 minutes into its run
and three seconds after its last command returned**. It wrote **no script into
`research/`, no report, and never re-ran the gate**. Everything below comes from
six prototypes recovered from the dead session's scratchpad — `pb-proto.js`,
`pb-scan.js`, `pb-lib.js`, `pb-phi.js`, `pb-split.js`, `pb-cost.js` — **all of
which I re-ran myself in this session**, reproducing every figure quoted.

*(Housekeeping: of the nine files handed over as "attack B's prototypes", only
those six are B's. `proto.js`/`proto2.js`/`proto3.js` on disk now hold a
different agent's Brun-Bonferroni hybrid-covering code that overwrote B's, and
`proto4..6.js` predate B's run by two hours and are the `u_sup` extension's
drafts. B's own first two prototypes survive only inside the transcript.)*

### 4.1 The construction, and its custody is clean — [VERIFIED]

B replaced attack 1's Fourier tail estimate with a **position-space dual**: the
Ramanujan-sum transform of `Theta_e` on `Z/e`,

```
  gamma_e(y) = sum_{S subset primes(e)} V_S prod_{p|e} c_p(y_p + 2*[p in S]),
               c_p(n) = p-1 if p|n else -1
  G_e(x)     = sum_{k=1..h_e} gamma_e(x+k),   h_e = H mod e
```

**The custody check is the strong one.** `pb-phi.js` builds the remainder from
prime-support-mask buckets and sweeps a window over `Z/P(z)`; the repository's
`A1.walk` sieves Rosser weight arrays and evaluates pointwise. **Two entirely
disjoint code paths agree to 8 decimals on both `sup|R|` and `rms`** at
z = 13, 17, 19 (`max|Phi| = 2.05714286, 5.90832501, 10.41749427`). B's foundation
is verified, not asserted.

### 4.2 The block bound beats the Fourier tail by a growing factor — [VERIFIED]

Using `sup_x|G_e|` in place of `sum_a |Theta_e(a)||S_H(a/e)|` keeps the `a`-sum
coherent *inside* each modulus and decouples only *across* moduli. My re-run:

```
  z=13 H=198   Sblk= 6.007792   Ssup=10.406270   ratio 1.7321
  z=17 H=683   Sblk=18.593040   Ssup=32.066565   ratio 1.7247
  z=19 H=1833  Sblk=35.540561   Ssup=72.579121   ratio 2.0421
```

**A drop-in strengthening of attack 1's tail estimate, worth 1.73x rising to
2.04x.** In exponent that is `u_sup - u_blk` = 0.1580, 0.2261, 0.2674 at
z = 13, 17, 19.

> **It does NOT reopen `u_sup`, and must not be read as doing so.** `u_blk`
> = 1.9037, 2.0775, 2.2844 at z = 13, 17, 19 **rises at every step**, exactly as
> `u_sup` does. This is a better constant on a closed route, not a new route.
> Under a `ln z` model the `beta_2` crossing moves from z ~ 144 to z ~ 424 —
> **about 3x in z, and 0 in the verdict.** *(A six-point bounded-family fit gives
> an asymptote of 4.2536, just below `beta_2`. Do not quote it: the identical
> estimator on six points of `u_sup` reads 5.2164 against the corpus's nine-point
> 5.4635, i.e. ~0.25 low, and 4.25 + 0.25 sits above `beta_2`.)*

### 4.3 The split has NO interior optimum, at any computable z — [VERIFIED]

This is the answer to B's brief. B implemented the cutoff as `e | P(y)` — phase
retained jointly for all moduli built from the first few primes — rather than the
brief's numeric `e <= E`. My re-runs of `pb-split.js` at z = 13, 17, 19:

```
z=19  M=0.039597657  #recs=127
  y   m=P(y)   H_split  u_split   max|Phi|   tail    maxPhi/rms  sqrt(2 ln m)
   1         1     834   2.2844     0.0000  32.5512      --         --
   5        30     825   2.2807     0.2350  32.4082    1.178      2.608
   7       210     816   2.2770     0.9503  31.0328    2.142      3.270
  11      2310     700   2.2249     4.4559  23.1896    2.232      3.936
  13     30030     495   2.1072     5.4580  14.0070    2.837      4.541
  17    510510     198   1.7960     6.8403   0.0000    4.725      5.127
```

**`u_split` decreases monotonically in `E` at every z, with no interior optimum.
The optimum is always the largest cutoff, `E = P(z)`** — and at `E = P(z)` the
tail is empty and `sup_x|Phi_{P(z)}| = sup_x|R_H|` **exactly** (section 4.1). So
the best end of the family is the exhaustive full-period walk: *you have computed
the answer, not bounded it*. Best `u_split` = 1.5963, 1.7070, 1.7960 at
z = 13, 17, 19 — which is `u_true`, a tautology.

**And the benefit of any FIXED cutoff decays geometrically in z.** At `E = P(11)`
the gain over `E = 1` decays by 3.42x, 3.11x, 2.52x per level, while widening the
cutoff by one prime multiplies the gain by 3.19x, 4.52x, 4.15x. **[INFERRED]:**
those two rates agree to within ~1.3x, so holding a constant benefit requires
adding retained primes at the same rate the sieve adds sifting primes, i.e.
`E -> P(z)`. **The interpolation is asymptotically the bad horn, and the brief's
own predicted failure mode is confirmed with a number.**

### 4.4 The one genuine positive: the retained part is NOT a maximal problem

**[MEASURED]**, z = 13..43, and this is the most valuable thing attack B leaves.
The brief's adversarial question was whether the retained-phase part is itself a
maximal inequality in miniature. **It is not.** Fixing the cutoff and growing z:

```
  FIXED E = P(11) = 2310,  H = 400          sqrt(2 ln m) = 3.936
  z    max|Phi_m|    rms       max/rms
  13     3.337662   1.138204    2.9324
  19     4.219153   1.331189    3.1695
  29     2.442073   0.730830    3.3415
  37     1.913222   0.550361    3.4763
  43     1.644736   0.476537    3.4514
```

`sup|Phi_m| / rms(Phi_m)` is **flat in z** — 2.93 to 3.45 over nine levels — and
sits **below `sqrt(2 ln m)` at every point**. The maximal cost of the retained
part is a Gaussian extreme-value constant of size `sqrt(log E)`: **a log factor,
not a power, and not growing with the sieve.**

> **So the cutoff does not relocate the wall on the small-`e` side; it dissolves
> it there. The whole wall is in the tail.** That is a sharper localisation of the
> obstruction than the corpus had, and it is B's construction that makes it
> measurable.

### 4.5 What attack B never did

- **Never re-derived `S_sat ~ 2.05x per added prime` or `C^{pi(z)}`.** Both were
  *read* from `lemmaV-sup-extension.js`'s READINGS and the §7e box and carried
  forward unchanged. (Re-derived in this salvage from an independent invocation
  of `A1.supBoundTable`: per-prime factors 2.5668, 2.3863, 2.0198, 2.1572 over
  z = 13..29, geometric mean **2.273**, matching the corpus's "2.27 over the
  first four" to three digits; the declining 1.91 tail at z = 31..43 was not
  reached here.)
- **Never pushed the split ladder past z = 17.** z = 19 and 23 are this salvage's.
- **Never ran the adversarial test** (section 4.4) — though `pb-split.js` prints
  exactly its diagnostic column, and `pb-cost.js`, the last thing B executed, is
  the feasibility probe for pushing it up the ladder.

**Two defects in B's prototypes, for whoever picks them up.** (i) `pb-scan.js`
reports `H_blk = 150` at z = 13 where `pb-split.js` reports 132 for the identical
function; 132 is the first genuine closure and `pb-scan`'s coarser bracket walks
past it, so its numbers are conservative overestimates. (ii) **Closure is not an
up-set in `H` for the block bound either** — at z = 13 the first closure is 132
but 18 larger `H` fail; at z = 17, 6 later `H` fail. So every `u_blk` here is a
one-signed **upper estimate**, exactly as the corpus already records for `u_sup`.

---

## 5. DEFECTS FOUND AND FIXED IN THIS SALVAGE

Three, all in `research/attack-beta2-A-B-bounded.js`, all fixed here.

**D1. The closing line was false as written.** The script printed *"The spread
from A = 0 to A = 8 is under half a unit of window exponent"*. That spread is
**2.9379 at z = 13 and 2.8012 at z = 47** — nearly three units. What is under
half a unit is the cost **per unit of `A`**, `lnln z / ln z` = 0.3672 -> 0.3501.
The line conflated the per-power cost with the whole spread. Corrected in the
script, with the retired reading noted in place so nobody re-derives it.

**D2. S6(c) tabled the wrong branch of a `min`, and invited an invalid
comparison.** `attack-beta2-01` §4(ii) defines `u_1^prov` as the smallest `u`
with `H M >= sqrt(W min(B H, B2))`, `B2 = (1/4) sum_e e^2 Vabs(e)^2`. The script
computed the `BH` branch alone, `ln(W B/M^2)/ln z`, and set the result against
the source's `4.3604` at z = 19 and `4.7087` at z = 23. Those are **`B2`-branch**
numbers; the `BH` branch reads **6.7796** and **7.4030**. The two branches differ
by a whole factor of `theta`: `theta/ln z` against `theta/(2 ln z)`.

Reinstating the `min` **reproduces the source exactly** — 4.3604, 4.7087, 5.0021
at z = 19, 23, 29, to four decimals — which is the custody check the first draft
did not have. **[VERIFIED]**

**And the fix strengthens the conclusion rather than weakening it:**

```
  z   theta/lnz    B        B2         u(BH)    u(B2)   u_1^prov   u* = ln(B2/B)/lnz
  13    3.0196   1.3833   5.913e+1    5.3958   3.4299   3.4299       1.4641
  19    4.4637   1.4348   4.357e+2    6.7796   4.3604   4.3604       1.9413
  29    5.7088   1.4660   1.939e+3    7.8697   5.0021   5.0021       2.1344
  37    7.2071   1.4883   1.109e+4    9.2966   5.8829   5.8829       2.4693
  47    9.6386   1.5135   4.786e+4   11.7021   7.1966   7.1966       2.6912
```

> **The `min` picks the `B2` branch at EVERY z from 13 to 47, so `B` does not
> appear in the all-positions exponent at all.** `B` binds only for windows below
> the crossover `u* = ln(B2/B)/ln z`, which runs 1.4641 to 2.6912, while
> `u_1^prov` runs 3.4299 to 7.1966. The solution sits above the crossover at every
> level. **In the currency that could reach `G2`, `B` is not merely not binding —
> it is not a term.**

**D3. Placeholder tails.** Both the `OUTPUT` and `READINGS` blocks read
"(filled in from the run; see the report)". Filled from my own run, in the style
of `research/attack-lower-bound.js`.

---

## 6. THE VERDICT ON ITEM A OF `TODO.md`

`TODO.md` item A currently reads, of the mean-square Lemma V: *"The proof stops
at one place and it is not a maximal inequality: `B` bounded as `z` grows, a
character-free mean-value estimate for signed Rosser weights."*

**That sentence should be retired, and replaced, for three separate reasons.**

1. **The gap is closed at the strength the downstream use needs.** Theorem 1
   gives `B = O((log z)^8)` unconditionally, the ask is `B <= H/log^6 H` with
   `H = z^u` a power of `z`, and a power beats a polylog. The mean-square Lemma V
   is now a theorem with no hypothesis. `B = O(1)` is a nicer statement and is
   still open; nothing downstream wants it.
2. **It was never the binding term.** In the almost-all currency every polylog
   gives exponent 0 — already priced at nothing. In the all-positions currency
   `B` does not appear (D2). In Lemma V's literal ask the required window falls
   to `u -> 0`. **`B`'s growth rate is invisible in all three currencies**, so the
   handed headline's conclusion survives even though its arithmetic did not.
3. **The estimate is published, and the open question changed shape.** Opera de
   Cribro Lemma 6.18 is our object with a stronger conclusion (§3.2). The live
   question is no longer *"can this be proved"* but *"does `beta >= 8`, i.e.
   `s >= 9`, come down to our `s` in [2.0, 3.4], and what do the per-split
   absolute values cost"* — and the author flags the first as a proof artifact he
   suspects is improvable.

**What replaces it.** Nothing in item A's slot deserves the top of the queue.
The mean-square lemma is finished and the exponent did not move. **The distance
between the proved mean-square lemma and Lemma V proper is the position
quantifier, not `B`** — and that ground is `u_sup`, closed, and the phase split,
closed here by §4.3. What attack B leaves in exchange is a real localisation:
**the maximal wall is not in the small-`e` part, which is uniform in `x` at cost
`sqrt(2 ln E)`, flat in `z` (§4.4). The wall is entirely in the tail.** That is
where a next attack belongs, and it is a narrower target than "the maximal
inequality".

---

## 7. DRAFT `CHANGELOG.md` ENTRY (for the adjudicator to apply; I have not edited it)

> **2026-08-18 — Attacks A and B salvaged from the API-death wave; `B` proved
> polylog and shown to be a non-term.**
>
> Attacks A and B of the ten-attack wave on the 4.2665 exponent both died on the
> weekly token limit (A at 16:14:56, B at 18:15:47) leaving one shared script and
> no report. Salvage report: `history/staging/attack-AB-bounded.md`.
>
> * **Theorem 1, unconditional:** `B(z,s) <= 9 A(z)^2 (E(z)-1) = O((log z)^8)`,
>   explicit and `s`-uniform, every step verified per-`e` with zero violations
>   over z = 13..41. Since the mean-square ask is `B <= H/log^6 H` with `H = z^u`,
>   **the mean-square Lemma V is now unconditional and useful.**
> * **`B = O(1)` is measured dead as a uniform statement**: `sup phi` rises at all
>   nine steps z = 13..47, constant-model RSS 247.9x the linear model's, while the
>   `phi^2`-weighted mean is flat. Any `O(1)` proof is irreducibly a mean value
>   over the divisor lattice.
> * **The flatness has an exact mechanism**: `(1-2/p)^2(1+4p/(p-2)^2) = 1+4/p^2`
>   exactly, so `B_model` is an absolutely convergent Euler product, limit
>   4.60631320.
> * **Ladder extended to z = 73**: `B` rises monotonically 1.3833 -> 1.5471
>   (+11.84%), and `B/B_model` drifts upward while `B_model` saturates, so
>   `B = kappa B_model` is rejected.
> * **`u_1^prov` correction:** `attack-beta2-01` §4(ii)'s `min(BH, B2)` picks the
>   `B2` branch at every z = 13..47 (crossover `u*` = 1.4641..2.6912 against
>   `u_1^prov` = 3.4299..7.1966). **`B` is not a term in the all-positions
>   exponent.** A first draft of the script's S6(c) tabled the `BH` branch alone
>   and compared it to `B2`-branch source values; corrected, it reproduces
>   4.3604 / 4.7087 / 5.0021 exactly. Also retired: the script's closing line
>   "the spread from A = 0 to A = 8 is under half a unit of window exponent" —
>   that spread is 2.9379 falling to 2.8012; the per-power cost is what is under
>   half a unit, 0.3672 falling to 0.3501.
> * **`TODO.md` item A is superseded**: `B`'s boundedness is no longer "the single
>   place Lemma V's proof stops".
> * **Literature:** the estimate is **published** — Opera de Cribro Lemma 6.18,
>   corrected proof in Friedlander, arXiv:2607.05707 (7 Jul 2026), appendix:
>   `sum_{d|P} d (sum_{m=0 mod d} lambda_m/m)^2 << prod_{p|P}(1-1/p)` for
>   beta-sieve weights with `beta >= 8`, finish at dimension `kappa = 2`. Needs
>   `s >= 9`; this corpus runs `s` in [2.0, 3.4]. **No calibration probe was run
>   in the dead literature session, so every absence claim originating there is
>   void and none is carried forward.**
> * **Attack B (the `C^pi(z)` price) left no repo footprint.** Its six prototypes
>   were recovered and re-run: the phase split has **no interior optimum at any
>   z <= 23** — `u_split` falls monotonically in the cutoff and the optimum end
>   `E = P(z)` is the exhaustive full-period walk, an identity rather than a
>   bound — and a fixed cutoff's benefit decays geometrically in `z`. **The
>   interpolation is asymptotically the bad horn.** Two by-products: `sup_x|G_e|`
>   beats the Fourier tail by 1.73x rising to 2.04x (moving the `beta_2` crossing
>   from z ~ 144 to z ~ 424 under a `ln z` model, with `u_blk` still rising at
>   every step, so `u_sup` stays closed); and **the retained-phase part is not a
>   maximal problem** — `sup|Phi|/rms` is flat in `z` at 2.93..3.45 over z = 13..43
>   and below `sqrt(2 ln E)`. The maximal wall is entirely in the tail.
