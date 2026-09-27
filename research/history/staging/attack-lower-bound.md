# Attack I: the two-class LOWER bound, and its rescued readings

<!-- ledger
id: Q-two-class-lower-bound
status: PARTIAL
todo: none
question: What does the two-class LOWER bound on G2 say, and does it conflict with attack E's measured law?
verdict: The finite range cannot decide and it is not close: with both constants set to 1 the transferred bound and attack E's measured law do not cross until x = 10^7327 while the exact ladder stops at 79, so neither result refutes the other and no computation ever will.
-->

*2026-08-18. Attack I of 10 on the 4.2665 exponent, killed by an API 500 before
it wrote a word of report; recovered and re-verified in a later session.
Producer: `research/attack-lower-bound.js` (0.5 s, five sections A-E, real
pasted output and eight rewritten readings in the script's own tail). Legend as
in `research/sift-limit-attack.md`: **[PROVEN]** published theorem with source;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical, finite
range; **[ABSENT]** searched and found nothing, with the channel and a
known-positive calibration probe run in the same session named;
**[INFERRED]** our deduction from sourced facts.*

## 0. The headline, in four lines

1. **The script is sound and its readings were not.** Attack I wrote the file
   complete with an OUTPUT block and eight READINGS *before it had ever run the
   script*, then ran it, then said "several results differ from what I expected"
   and died mid-repair. **Ten figures in that tail are wrong, two with the sign
   reversed.** The code was never the problem. **[VERIFIED]**
2. **The corrected measurement stands and is stronger than the tail claimed.**
   The two-class deficit `G₂/g` is `1.264 (ln x)^1.268` on 22 exact levels and
   `(ln x)^1.478` on the top fourteen: **one log and rising, not a power of x.**
   The Poisson diagonal `c₂' = G₂/(m lnD)` reads `0.4983 ± 0.0369` over all 20
   terms, and the eight new terms are three times **tighter** than the nine
   §6a fitted and sit **higher**, not lower. **[VERIFIED]**
3. **The cross-attack tension with attack E dissolves, and §7 settles it
   quantitatively rather than waving at it.** The transferred K–K bound and
   attack E's measured law **agree** on the only exponent attack E resolved,
   **do not cross until x = 10^7327**, and are not the same kind of statement.
   The finite range cannot decide, it is not close, and only finishing the
   substitution on paper at D3 will. **[VERIFIED / INFERRED]**
4. **A new result the dead session did not reach.** The `c₂'` diagonal, built
   on exact `G₂` and exact `m lnD` with nothing fitted, **excludes
   `two-class-lower-bounds.md` §6's `c·x·ln²x` at 9.3 se** and puts attack E's
   `x ln²x lnln x` 1.1 se from the data. Two independent instruments, one
   AICc and one diagonal, now agree that §6's law is the wrong one.
   **[MEASURED]**

**Nothing here is a proof and nothing here moves 4.26645.** The lower side is
still free, and the Zone Postulate is still safe against the construction side.

---

## 1. What actually happened, and why the tail cannot be quoted

The producing session's transcript is
`~/.claude/projects/-Users-benjaminsen-Files-Git-primeoire/43d455bc-6530-4df2-9970-05f6622affcb/subagents/agent-ad32f2a9c4bef05b8.jsonl`,
140 entries. The order of events is not in dispute:

| entry | act |
|---|---|
| 122 | **`Write`** of `research/attack-lower-bound.js`, 41,081 chars — *including a full OUTPUT block and all eight READINGS* |
| 126, 129 | two `Edit`s rewriting the D sections "for speed and a sharper threshold test" |
| 131 | **first execution of the script**, `time node research/attack-lower-bound.js` |
| 134 | second read of the same run, lines 200-300 |
| 137 | *"The run is clean and several results differ from what I expected. Let me sharpen sections B3 and C around what the data actually shows."* |
| 138 | `Edit` to `ols`, adding a standard error field |
| 140 | **API Error: 500** |

So the OUTPUT block was a **hand-simulated** run and the READINGS were
**predictions**. The agent then ran the script, saw the divergence, correctly
diagnosed it, started the repair at the wrong end (`ols`, which changes no
printed number), and died. **[VERIFIED]** — every figure the tail carries that
disagrees with the run was searched for across all 140 transcript entries and
appears in none of them, so it was never output by any version of the script.

The final `Edit` at entry 138 is worth naming because it is the one thing the
dead session did that a reader would otherwise trust: it adds `se: sd /
Math.sqrt(sxx)` to the `ols` return. It is correct, it is used by nothing in the
file as the session left it, and it changes no printed figure. It is now used,
by §E2.

### 1a. The ten wrong figures, diffed against the run

Run of record: `node research/attack-lower-bound.js`, exit 0, 2026-08-18,
node v22, macOS arm64. Re-run three times this session, byte-identical, and
byte-identical to the parent session's independent re-run.

| # | reading | the tail claimed | the run says | severity |
|---|---|---|---|---|
| 1 | 1 | `G₂/g` fit `(ln x)^1.10` on 22 terms | **`(ln x)^1.268`** | 15% low |
| 2 | 1 | `(ln x)^1.06` on the top fourteen | **`(ln x)^1.478`** | 28% low, and **reverses the trend**: the tail has the exponent falling toward 1, the run has it rising |
| 3 | 1 | `(G₂/g)/ln x = 1.87 ± 0.15` | **`1.854 ± 0.208`** | sd 39% low |
| 4 | 3 | `c₂'` on the 8 new terms `0.4413`, cv 3.7% | **`0.5142`, cv 3.1%** | **sign of the level shift reversed**: tail says the new terms "sit slightly lower", they sit higher |
| 5 | 3 | `c₂'` on all 20 terms `0.4626`, cv 8.5% | **`0.4983 ± 0.0369`, cv 7.4%** | 7% low |
| 6 | 3 | trend `c₂' ~ (ln x)^−0.087`, "measured as slightly negative" | **`(ln x)^+0.227`** | **sign reversed.** The tail reads this as evidence *against* the K–K template; corrected, it is evidence *between* the two candidates and 2.8 se *above* zero |
| 7 | 4 | `(lll y)²/(ll y)⁴` moves by 91.5x, "5.8x faster than the object" | **22.8x, 1.4x faster** | 4x overstated |
| 8 | 4 | `c₂'` spread 1.47 (max/min) | **1.331** | 10% high |
| 9 | 4 | `G₂/(x ln³x)` cv 4.5%, `G₂/(x ln²x)` cv 15.9% | **7.6% and 14.2%** | both wrong |
| 10 | 5 | one factor of ln x needs `x ~ 1.0e7`; two, `x ~ 1.6e15` | **`x ~ 3.35e2`; `2.30e3`** | wrong by **four and eleven orders of magnitude** |

Two further tail statements are imprecise rather than wrong:

- Reading 6 says D2's violations vanish "exactly at the threshold the proof
  predicts". They do not. §1b.
- Reading 7 prices D4's loss to the greedy at "a factor of 3 to 7". The run
  gives **4.0 to 6.6**.

**Everything else in the tail survives**, including the whole of reading 2 (the
`lll x` argument), the whole of reading 6's Case 1/2/3 analysis, and reading 8's
prior-art verdict. The load-bearing structure of the attack was right; its
arithmetic was invented.

### 1b. D2's threshold: sufficient, and conservative by one prime step

The tail's phrase is the one place where a wrong reading would have flattered
the transfer, so it was re-run rather than re-read. The original sweep skipped
the primes where the transition actually happens. Extending it
(`z0 ∈ {…, 113, 127, 131, 137, 139, …}` at `y = 4001`, `m = 300000`, `z1 = 997`):

| z₀ | survivors | Case-1 violations |
|---|---|---|
| 127 | 4422 | 15 |
| 131 | 4372 | 7 |
| 137 | 4328 | **5** |
| **139** | 4287 | **0** |
| 149 | 4246 | 0 |

The proof's own inequality gives the sufficient threshold
`z₀ ≥ (m+2)/p_min = 149` (with `p_min = 2003`, the first prime `≥ y/2`).
Violations reach zero at **139**. So the derived threshold is **correct and
conservative by exactly one prime step**, which is the right direction for a
step being imported, and the sweep straddles the true transition rather than
landing on it. **[VERIFIED]** The corrected sweep is now in the script.

---

## 2. The measurement, corrected

### 2a. The free bound's deficit is one log, and still rising

`G₂(x#) ≥ g(x#)` pointwise is free, elementary and PROVEN
(`research/two-class-lower-bounds.md` §1: twin slots are a subset of holes).
Both sides are exact at all 22 levels, so the ratio **is** the deficit, with no
model in it.

| window | fitted `G₂/g` |
|---|---|
| all 22 terms, x = 2..79 | `1.264 (ln x)^{1.268}` |
| top 14, x ≥ 23 | `0.997 (ln x)^{1.478}` |
| `(G₂/g)/ln x`, x ≥ 17 | `1.854 ± 0.208`, cv 11.2%, range [1.466, 2.216] |

Reading 8.55 at x = 79. **[VERIFIED]**

The whole two-class part of the free bound's deficit is therefore a single
**logarithmic** factor of about `1.9 ln x` on this range. It is not a power of
x, and there is no room in the data for one. The detail the dead session got
backwards is worth keeping: trimming to the top of the ladder moves the exponent
**up**, 1.27 → 1.48, not down. Nothing in the data says the deficit settles at
exactly one log.

The consequence for the programme is a split. The lower side's remaining
distance to the truth is (i) this measured log-and-a-bit, which a two-class
construction could in principle recover, plus (ii) whatever separates `g(x#)`
from `x ln x lll x / ll x`, which is **Erdős #687**, a $1000 problem, and is not
ours. **Only (i) is a two-class question.**

### 2b. The asymptotic form of the free bound is unmeasurable, by arithmetic

`lll x < 0` for `x < e^e = 15.154`, so `F(x) = x ln x lll x / ll x` is
**negative at eight of the twenty-two exact levels**, and `lll x` does not reach
1 until `x = e^{e^e} = 3.814e6`. Over the whole exact range `lll x` runs 0.0406
to 0.3884, and the implied constant `g/F` drifts from 13.85 at x = 17 to 2.20 at
x = 79, a factor of **6.3**. **[VERIFIED]**

So any statement of the form "the free bound is a factor R below the truth",
quoted with `F` in it, is quoting the behaviour of `lll x` and nothing else. The
pointwise form is the only measurable one, and §2a is that measurement. This
reading survived the tail intact and is the one thing in it that never needed
correcting.

### 2c. The Poisson diagonal, extended from x = 41 to x = 79

`two-class-lower-bounds.md` §6a fits `c₂' = G₂/(m lnD)` on nine levels to
x = 41. The script extends it to all 22 with exact `m = x#/D` and exact `lnD`.

| window | mean | cv | range |
|---|---|---|---|
| x = 11..41 (the 9 terms §6a fitted) | 0.4848 | 9.7% | [0.4463, 0.5939] |
| x = 47..79 (the 8 **new** terms) | **0.5142** | **3.1%** | [0.4842, 0.5337] |
| x = 11..79 (all 20) | **0.4983 ± 0.0369** | 7.4% | [0.4463, 0.5939] |
| trend across all 20 | `c₂' ~ (ln x)^{+0.227}`, se 0.082 | | |

**[VERIFIED]**, and the §6a figures reproduce exactly, which is the check that
the extension is the same instrument and not a new one.

Three readings, all of which the tail had backwards:

- The eight new terms are **three times tighter** than the nine §6a fitted. The
  diagonal was not degrading as the ladder grew; it was sharpening.
- They sit **higher**, not lower. The worry that the diagonal was drifting down
  is retired.
- The x = 37 reading of 0.5939 is now clearly an **outlier**, not a level shift.

The trend is the load-bearing number. The K–K template needs this exponent to be
`+1` asymptotically; `two-class-lower-bounds.md` §6's `c·x·ln²x` needs it to be
`0`. It measures **+0.227 ± 0.082**: 2.8 se above zero and 9.5 se below one.
Neither target is comfortable, and the value sits between them.

### 2d. The shape test cannot decide, and the reason is arithmetic, not sample size

The K–K shape's "slowly varying" part `(lll y)²/(ll y)⁴` moves by a factor of
**22.8** across x = 17..79 (1.400e-3 to 3.190e-2) while `G₂` itself moves by
**15.8**. A correction moving 1.4x **faster** than the object it corrects is not
a correction on this range. `G₂/KK` falls 199.6 → 8.1, and that fall is 23/16
**by construction**: it measures `lll y` and nothing else. **[VERIFIED]**

Meanwhile one factor of `ln x` is worth only **1.822** across x = 11..79 against
a `c₂'` range ratio of **1.331**. So the data is consistent with the template
and equally consistent with one log less.

The crude normalisations appear to say otherwise and should not be quoted:
`G₂/(x ln³x)` has cv **7.6%** against `G₂/(x ln²x)` at **14.2%**, which naively
favours the template. That is an artifact of `θ(x)/x < 1` at small x, which the
Poisson form absorbs and the crude form does not. **§2c, which uses exact `m`
and exact `lnD`, is the one to quote.**

> **Verdict.** The 22 exact terms do **not** contradict
> `G₂(P(y)) ≫ y (ln y)³ (lll y)² / (ll y)⁴`. Anyone hoping to kill it with data
> should stop. It has to be killed or proved on paper.

### 2e. And no future exact term will help

To make one factor of `ln x` exceed the `c₂'` spread of 1.331:

| factors of ln x needed | exact terms required at |
|---|---|
| 1.33 (bare visibility) | **x ~ 3.35e2** |
| 1.77 (2 sigma) | x ~ 2.30e3 |
| 2.36 (3 sigma) | x ~ 2.97e4 |
| 3.14 (4 sigma) | x ~ 8.95e5 |

A144311 cost **2.8e10 years** of exhaustive enumeration at x = 79 already
(`exact-g2-ladder.js`, `sift-limit-attack.md` §7). The **first** of those four
rows is already out of reach, so the question is settled by arithmetic rather
than by budget. **[VERIFIED]**

The certificate ladder to x = 5003 (`two-class-lower-bounds.md` §5d) buys `ln x`
by only **1.95x** over the exact range, one spread-width, exactly at the edge of
readability — and it is a **lower bound of unmeasured fidelity** (§5c), so it
cannot carry the discrimination either. **A lower bound can never establish a
falling ratio** (`research/qc/units.js` §4, and the 14.7-sigma incident it
records). The exponent of `ln` in the two-class lower bound is not an empirical
question.

---

## 3. The cross-attack tension, settled

This is the thing neither attack lived to see, and it is the most interesting
output of either.

**The apparent conflict.** If the K–K substitution stands, the lower bound
becomes

> `G₂(x#) ≫ x (ln x)³ (lll x)² / (ll x)⁴`

which is one log above `two-class-lower-bounds.md` §4b's INFERRED analogue and
**two logs above the free bound**. On the same day,
`research/history/staging/attack-growth-law.md` (attack E,
producer `research/attack-growth-law.js`, re-run clean) **MEASURED**

> `G₂(x#) ≈ 0.762 · x ln²x · lnln x` over x = 11..79,

with the pure power law excluded by 10.6 AICc units and all six surviving model
families having x-exponent → 1. Either the transferred bound is asymptotically
above the measured law, in which case the measured law is not the asymptotic
truth, or the transfer has an error.

**The evidence supports neither horn, because the dichotomy is false as stated.**
Section E of the script settles it in four moves.

### 3a. On the exponent attack E actually resolved, the two AGREE

Attack E's headline result is that **every one of the six surviving families has
x-exponent → 1**, and that `c·x^a` at `a = 1.818` is excluded by 10.6 AICc
units. The transferred K–K bound has **x-exponent exactly 1**. **[VERIFIED]**

So the 10.6 units, which is attack E's strongest single number, does not bear on
this at all. It excludes a *power of x*. The tension lives entirely in the
exponent of `ln`, which attack E did not resolve and does not claim to.

### 3b. On the ln-exponent, the diagonal instrument ranks the candidates

Each candidate law is divided by the **same exact `m lnD`** used in §2c, and the
trend of the quotient in `ln x` is fitted the same way, over the same
x = 11..79 window. Nothing is fitted to the laws; the data's own trend is the
target. **[MEASURED]**

| law | trend exp | se | cv of c₂' | offset from data | verdict |
|---|---|---|---|---|---|
| `c x ln²x` — `two-class-lower-bounds.md` §6 | −0.5308 | 0.0932 | 13.2% | −0.758 = **9.3 se** | **EXCLUDED** |
| `c x ln²x lnln x` — attack E's winner | +0.3181 | 0.0873 | 8.3% | +0.091 = **1.1 se** | **CONSISTENT** |
| `c x ln³x` | +0.4692 | 0.0932 | 10.5% | +0.242 = **3.0 se** | strained but alive |
| `x ln³x (lll x)²/(ll x)⁴` — the transferred bound | +3.6755 | 0.9629 | 50.2% | +3.448 = 42.3 se | off the instrument, see below |
| **`G₂`, the exact data itself** | **+0.2273** | **0.0816** | **7.4%** | — | |

Two things fall out, one of them new.

**The new result.** The diagonal **excludes `two-class-lower-bounds.md` §6's
`c·x·ln²x` at 9.3 se** and puts attack E's `x ln²x lnln x` 1.1 se from the data.
Attack E reached the same ranking by AICc (`MP2` at ΔAICc 31.8, "excluded";
`MP2LL` at 0.0, best) on a completely different instrument. **Two independent
instruments, one model-selection and one exact-frame, now agree that §6's law is
the wrong one.** That is a corpus edit, not just a reading — see §5.

**The KK row is not evidence against the transfer.** Its 42.3 se is §2d's point
restated: `(lll x)²/(ll x)⁴` is not slowly varying on this range, so the
instrument is reading the correction and not the shape. No conclusion about the
transfer may be drawn from that row, in either direction.

### 3c. The two statements do not cross until x = 10^7327

Divide the transferred bound by attack E's law, shapes only, constants set to 1:

> `R(x) = ln x · (lll x)² / (ll x)⁵`

`R → ∞`, so the transferred bound does eventually exceed **any** fixed multiple
of the measured law. The question is only where. **[VERIFIED]**

| ln x | R(x) | |
|---|---|---|
| 4.369 | 9.45e-2 | **top of the exact ladder, x = 79** |
| 1e2 | 1.13e-1 | |
| 1e3 | 2.37e-1 | |
| 1e4 | 7.44e-1 | |
| 1e6 | 1.37e1 | |

| crossing | at ln x | i.e. x |
|---|---|---|
| both constants 1 | 1.687e4 | **10^7327** |
| attack E's 0.762, K–K's 1 | 1.045e4 | 10^4536 |
| K–K constant of FKMPT `C(1/2) = 1/325565` order | 2.979e11 | 10^{1.29e11} |

`R` is *nearly flat* from `ln x = 4` to `ln x = 100` — 0.095 to 0.113 — because
`ln x` and `(ll x)⁵` grow together for a very long time. This is why the exact
ladder sees nothing: the two laws are within 12% of a constant ratio of each
other across four orders of magnitude of `x` beyond the data.

### 3d. They are not the same kind of statement, and attack E says so first

The dichotomy in the tail treats "the measured law" as a claim about the limit.
It is not, and its producer is explicit:

- Attack E tags its law **[MEASURED]** over x = 11..79 and writes, in its §1,
  "the honest statement is the band around it, not the winner".
- Attack E's **§7** states that `MP2LL` and `MP3` are **"not separable, and not
  separable in principle on this range"**, because the factor `ln x / lnln x`
  that distinguishes them "moves from **2.74 to 2.96** across the entire ladder:
  9% of shape over 100% of the data", and that their 6.8 AICc units are
  "measuring the constant, not the shape".
- Attack E adds that **no computable extension separates them**, because at
  `x = 10⁶` the factor is still only 5.7 and the ladder cannot be extended past
  about x = 100 by any known method.

And the objects differ in kind. `0.762 x ln²x lnln x` is a **fit to exact
values**. `≫ x ln³x (lll x)²/(ll x)⁴` is a **lower bound with an unspecified
constant**. A lower bound with a small enough implied constant sits below a
measured law at every computable x and above it asymptotically, with no
contradiction anywhere. `research/qc/units.js` §4 exists because pooling
objects of different kinds manufactured a spurious 14.7-sigma result in this
corpus once already.

### 3e. The verdict, stated precisely

> **The finite range cannot decide, and it is not close.** With both constants
> set to 1 the transferred bound and attack E's measured law do not cross until
> `x = 10^7327`; the exact ladder stops at 79 and cannot be extended past about
> 100. **Neither result refutes the other, and no computation ever will.**
> The horn "the measured law is not the asymptotic truth" is the correct one,
> and it costs attack E nothing, because attack E never claimed otherwise and
> proved in its own §7 that it could not.

**What would decide it**, in order of cost:

1. **Finishing the K–K substitution on paper at D3.** The exponent lives
   entirely in the Mertens ledger `Σ_{p≤√y} g(p)/p = 2 lnln y + 2(lnln z₁ −
   lnln z₀) + O(1)`, and D3 measures the two columns tracking at five values of
   y. This is the only decider that exists. It is a paper argument of the size
   of one section, not a computation.
2. **A proof that `G₂ = O(x ln²x lnln x)`.** This would refute the transfer
   outright. Nothing in the corpus is close; the standing upper bound is the
   4.26645 exponent this whole wave is attacking.
3. **Nothing else.** Not more exact terms (§2e), not the certificate ladder
   (§2e), not the `c₂'` diagonal (§3b's KK row), not AICc on a longer window
   (attack E §7).

---

## 4. The transfer itself: what D1-D4 established

`covering-dive.md` §4.2 names the blocker verbatim: *"K–K's Cases 1–3 (§2) are
stated in terms of the linear and non-linear irreducible factors of f …
substituting an arbitrary 2-element set requires re-deriving that trichotomy for
Ω_p = {a_p, a_p−2}"*. Attack I ran that substitution. This section survived the
tail intact apart from §1b's threshold and the D4 ratio; it is restated because
it is what the attack was for.

**What is published and what is inferred, stated exactly.** K–K's Theorem 1 is

> `j_f(P(y)) ≫ y(ln y)^{ℓ_f−1} ((ln ln y)²/ln ln ln y)^{h_f} (ln y ln ln ln y/(ln ln y)²)^{M(f)}`

**[PROVEN]**, Kalmynin–Konyagin, *A polynomial analogue of Jacobsthal function*,
Izv. Math. 88:2 (2024) 225–235 = arXiv:2302.00459. Re-read at the arXiv abstract
this session and matching
`research/history/staging/lit-pdf-kalmynin-konyagin.md` §2, which read it from
the PDF at page 3 and checked it against the published Izvestiya PDF page 226.
At `f = x(x+2)`: `ℓ_f = 2`, `h_f = 0`, and `M(f) = 2`, giving **exactly**
`y(ln y)³(lll y)²/(ll y)⁴`. So the right-hand side is a theorem, not a template.

**Only the left-hand side is INFERRED.** `j_f` shifts the **value** — the fibre
is `{−1 ± √(1−x_p)}`, centre fixed at −1, separation varying — and `G₂` shifts
the **argument** — pairs `{a_p, a_p−2}`, centre varying, separation fixed at 2.
Two different families of 2-element sets, coinciding only at `x_p = 0`. One may
not apply Theorem 1 at `f = x(x+2)` and read off a `G₂` bound. That verdict is
already in the corpus at `lit-pdf-kalmynin-konyagin.md` §2 and this attack does
not disturb it.

**What the substitution checks. [VERIFIED]**

| step | result |
|---|---|
| **D1** (i) `\|Ω^I_p\| = 2` at every odd p; (ii) `Ω^I_p` disjoint from `Ω^III_p` at `a_p = 1` for every `p ≥ 5`; (iii) `g(p) = 4` in band 2 and 2 elsewhere | **all HOLD**, checked at every prime `3 ≤ p ≤ 100000` |
| **D2** Case 1's smoothness dichotomy | **clean at and above `z₀ = 139`**; derived sufficient threshold 149 is conservative by one prime step (§1b) |
| **D3** the four-class middle band, the Mertens ledger | measured at five values of y; the two columns track, both being `2 lnln + O(1)`; band-2 share runs 0.918 → 1.460 over `y = 1e4..1e8` |
| **D4** the three-band construction at accessible y | **certifies at five levels** (`y = 229, 421, 1009, 2003, 4001`) with independent replay; loses to the §5d greedy by **4.0 to 6.6** |

Three structural facts about the substitution, all of which make it **easier**
in our frame than in theirs:

- **Case 2 is vacuous.** `h_f = 0` for the two-linear-factor system, so
  `Ω^II_p` is empty, and Lemma 2, Chebotarev and the whole Galois apparatus of
  K–K §3 drop out.
- **Case 3 is strictly stronger.** K–K must invoke their `M(f)` definition and
  Theorem 2 to know a fibre of size `M_p(f)` exists, and control `M_p` only on
  logarithmic average. A free translate pair has exactly 2 elements at every odd
  p, with no average and no exceptional primes.
- **Disjointness is bought by choice.** K–K pay an unquantified `p₀` to separate
  `Ω^I` from `Ω^III`. Choosing `a_p = 1` in band 2 gets it at `p₀ = 5`. And
  Corollary 1, which sees `Ω_p` only through `|Ω_p|`, applies at `κ = 4` where
  they need `κ = 3 deg f = 6`. Same `z = √y`, same `X = m`, so the transfer
  introduces **no new analytic requirement**.

**D4 is evidence that the construction works, not evidence about its exponent.**
K–K need `A` and `B` "large", and at `y = 4001` the band boundaries the
asymptotics ask for (`z₀ = (ln y)^A` with `A > 6` is 3.26e5, already past y) do
not exist. Losing to a greedy by a factor of 5 at a y where your own bands do
not fit is what an asymptotic construction does. **The exponent lives in D3's
ledger, and D3 is where the transfer is either true or false.**

---

## 5. Prior art, re-verified in a fresh session

The dead session's WebSearch budget was exhausted at 200 calls and its arXiv API
channel returned zero bytes on every keyword query, so **no negative from that
session is quoted here**. Every claim below was re-run in this session, and every
channel carries its own known-positive calibration probe run in the same session.

### 5a. A144311 carries no bound. [VERIFIED]

Channel: `oeis.org/search?q=id:A144311&fmt=text`. Full record retrieved. It
carries `%S/%T` (22 terms), `%N`, one `%C` (*"For n > 1, a(n) == 5 (mod 6)"*),
two `%H` links (a StackExchange thread on the generating function; Jinyuan
Wang's C++ program), one `%e`, `%Y` (*"Cf. A048670, A049300, A058989"*), `%K
nonn,more,hard`, `%A` Andrew Carter Sep 17 2008, and `%E` credits to Max
Alekseyev (a(8)–a(16), Nov 18 2009) and Jinyuan Wang (a(17)–a(22), Nov 26 2024).

**There is no `%F` formula line and no `%D` reference line at all.** No formula,
no bound, no reference. The tail's claim is exact.

The terms confirm the script's input data: `1,5,11,29,41,65,107,…,1709`, and
`A144311 + 1` is the `G₂` array the script hardcodes.

### 5b. A048670 carries the FGKMT bound explicitly. [VERIFIED]

Channel: same. The record carries, as a **`%C` comment**:

> *"Ford, Green, Konyagin, Maynard, & Tao show that `j(x#) >> x log x log log
> log x / log log x` and hence `a(n) >> n log^2 n log log log n / log log n`. —
> Charles R Greathouse IV, Mar 29 2018"*

and Pintz's bound as both a `%C` and a `%F`. The attribution and date in the
tail are correct; the one refinement is that the FGKMT line is a comment, not a
formula line.

**So the free bound is recorded for the ONE-class object and is absent for the
two-class one.** That is the precise form of the corpus's novelty claim and it
survives.

**A bonus the dead session did not use.** A048670 also carries:

> *"Maier & Pomerance conjecture that `Max_{n <= x} A048669(n) = log(x)*(log log
> x)^(2+o(1))` which suggests `a(n) = n*(log n)^(3+o(1))`. — Charles R
> Greathouse IV, Mar 29 2018"*

In the `x` variable (`n = π(x)`, `log n ≈ log x`) that is `g(x#) = x (ln
x)^{2+o(1)}`, one log **below** the transferred two-class bound, and consistent
with §2a's measured log-and-a-bit of two-class deficit. **[INFERRED]** from a
sourced conjecture. It is a third, independent reason not to expect the K–K
transfer to be off by a whole log.

### 5c. Nobody has cited Kalmynin–Konyagin. [ABSENT]

| channel | query | result |
|---|---|---|
| OpenAlex | `works/W4319049890` (arXiv preprint, DOI 10.48550/arxiv.2302.00459) | `cited_by_count = 0` |
| OpenAlex | `works/W4393170300` (Izv. Math. Russian, DOI 10.4213/im9467) | `cited_by_count = 0` |
| OpenAlex | `works/W4393954820` (Izv. Math. English, DOI 10.4213/im9467e) | `cited_by_count = 0` |
| OpenAlex | `works?search=Kalmynin Konyagin Jacobsthal` | 3 hits, the two K–K records at 0 |
| Semantic Scholar | `paper/arXiv:2302.00459/citations` | **0 entries returned** |

**Calibration probes, same session, same call shape:**

- **OpenAlex**: `works/https://doi.org/10.4007/annals.2016.183.3.4` (Ford,
  Green, Konyagin, Tao, *Large gaps between consecutive prime numbers*) returns
  `cited_by_count = 46`. Channel live, and returns non-zero on the neighbouring
  literature.
- **Semantic Scholar**: `paper/arXiv:1408.4505` returns `citationCount = 80`.
  Channel live.
- **OEIS**: the known-positive numeric query `1,5,11,29,41,65,107` returns
  A144311; A048670 and A288815 both returned full records.
- **WebSearch**: a keyword query on the K–K title returned the arXiv PDF, the
  mathnet record (both language editions) and the ADS record, plus the paper's
  abstract text. Channel live.

All four channels are live and calibrated positive in this session, and three of
them are independent of each other. **Nobody has built on that paper at all, so
nobody has transferred it.** The target named in `covering-dive.md` §4.2 —
"re-derive K–K §2 with `Ω_p = {a_p, a_p−2}`" — is still open ground.

**Not usable, and named as such:** the arXiv API, which the producing session
found broken. It was not re-tested here and no negative is claimed from it.

---

## 6. What this changes in the corpus

Three edits are recommended. None of them is applied here; this file is a
staging report and `research/two-class-lower-bounds.md` and
`research/ZONE-POSTULATE.md` §3 are the corpus homes.

**(a) `two-class-lower-bounds.md` §6a: extend the diagonal, and correct its
direction.** §6a fits `c₂'` on nine terms to x = 41 at 0.4848, cv 9.7%. The
ladder now carries 22 terms. The extended fit is **0.4983 ± 0.0369 over all 20
diagonal terms, cv 7.4%, trend `(ln x)^{+0.227}`**, and the eight new terms are
three times tighter and sit higher. §6a's nine-term figures reproduce exactly,
so this is an extension of the same instrument, not a replacement.

**(b) `two-class-lower-bounds.md` §6: `c·x·ln²x` is now excluded on two
independent instruments.** Attack E excludes it by AICc at 31.8 units; §3b here
excludes it on the exact-frame diagonal at 9.3 se. The replacement both
instruments prefer is `c x ln²x lnln x` with `c = 0.762`. §6 currently states
`c·x·ln²x` as the measured law and `covering-dive.md` §4.2 and its Realistic
Target 4 both quote it downstream, so the edit is not local.

**(c) `two-class-lower-bounds.md` §1's deficit table gains a measurement.** §1
records `G₂/g` **VERIFIED** at eleven shared terms. All 22 are now available and
the fitted deficit is `1.264 (ln x)^{1.268}` on the full window,
`(ln x)^{1.478}` on the top fourteen. The sentence "the honest asymptotic
analogue of Rankin for two classes buys **one factor of `log x`, not a power of
`x`**" is confirmed on the measurement side, with the caveat that the exponent
rises rather than settles as the window is trimmed upward.

**Nothing here touches the Zone Postulate's safety margin.** The lower side
remains free, the best construction remains `Y2`, and `Y2 ≤ G₂ − 1` still bounds
the wrong way for any falling-ratio argument.

### Draft CHANGELOG entry

*(For `research/history/CHANGELOG.md`. Not applied — this report may not edit
it.)*

> **2026-08-18 — Attack I (two-class lower bound) recovered from an API death,
> and its readings corrected.** `research/attack-lower-bound.js` was written
> complete with an OUTPUT block and eight READINGS **before it had ever been
> run**; the producing session ran it once, said "several results differ from
> what I expected", and died on an API 500 mid-repair. Ten figures in that tail
> were wrong, two with the sign reversed, and none of them appears anywhere in
> the session's 140-entry transcript. **Retired from the tail:** `G₂/g ~
> (ln x)^1.10` (now 1.268) and `(ln x)^1.06` on the top fourteen (now 1.478, and
> rising rather than falling); `c₂'` on the eight new terms 0.4413 "sitting
> slightly lower" (now 0.5142, sitting **higher**); `c₂'` on all twenty 0.4626
> (now 0.4983 ± 0.0369); the trend `(ln x)^{−0.087}`, read as evidence against
> the K–K template (now `(ln x)^{+0.227}`, 2.8 se **above** zero); the
> slowly-varying factor moving "91.5x, 5.8x faster than the object" (now 22.8x,
> 1.4x); the `c₂'` spread 1.47 (now 1.331); `G₂/(x ln³x)` cv 4.5% and
> `G₂/(x ln²x)` cv 15.9% (now 7.6% and 14.2%); and the range needed to separate
> `ln²` from `ln³`, quoted as `x ~ 1.0e7` and `1.6e15` (now **3.35e2** and
> **2.30e3**, wrong by four and eleven orders of magnitude). D2's violations
> were said to vanish "exactly at the threshold the proof predicts"; they vanish
> at `z₀ = 139` against a derived sufficient threshold of 149, so the threshold
> is **conservative by one prime step**. D4's loss to the greedy was "3 to 7";
> it is 4.0 to 6.6. **The code was never wrong** and reproduces byte-identically
> across three re-runs and one independent re-run in another session. Script
> repaired: tails replaced with the real run, D2 sweep extended over the primes
> where the transition actually happens, and a new **section E** added that
> reconciles the attack against `attack-growth-law.md` (attack E). **New:** the
> `c₂'` diagonal, on exact `G₂` and exact `m lnD` with nothing fitted, excludes
> `two-class-lower-bounds.md` §6's `c·x·ln²x` at **9.3 se** and puts attack E's
> `x ln²x lnln x` at **1.1 se** — a second, independent instrument agreeing with
> attack E's AICc ranking. **Cross-attack tension resolved:** the transferred
> K–K bound `≫ x ln³x (lll x)²/(ll x)⁴` and attack E's measured
> `0.762 x ln²x lnln x` agree on the x-exponent (both → 1), do not cross until
> `x = 10^7327` with both constants at 1, and are different kinds of statement;
> attack E's own §7 already proved the two ln-exponents "not separable in
> principle on this range". The finite range cannot decide and never will; only
> finishing the K–K substitution on paper at D3 can. Prior art re-verified in a
> fresh session on four calibrated channels: A144311 carries no `%F` and no `%D`
> at all, A048670 carries the FGKMT bound as a `%C` (Greathouse, Mar 29 2018),
> and all three OpenAlex records for Kalmynin–Konyagin plus the Semantic Scholar
> citation list report zero citations.

---

## 7. What this report does not claim

- **It does not move 4.26645**, and nothing in the lower-bound direction can.
- **It does not prove the transfer.** D1–D4 check the substitution's structural
  claims and certify the construction at five accessible y. The exponent lives
  in D3's ledger and that argument is not written.
- **It does not read a falling ratio off anything.** The certificate ladder is a
  ladder of **lower bounds** of unmeasured fidelity above x = 41, and
  `research/qc/units.js` §4 is explicit that a lower bound can never establish a
  falling ratio. Every figure in §2 and §3 uses **exact `G₂`** only.
- **It does not claim the KK row of §3b is evidence.** It is 42.3 se from the
  data because the correction factor is not slowly varying on this range, which
  is a fact about `lll x`, not about the transfer.
- **It does not re-open anything `research/sift-limit-attack.md` closes.** The
  22-term ladder's maximality, the 2.8e10-year cost at x = 79, and the pruning
  bound are all taken from there unchanged.
- **It quotes no negative from the dead session's channels.** Every absence in
  §5 was re-run here with its own calibration probe.
