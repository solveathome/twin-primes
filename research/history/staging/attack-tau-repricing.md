# The `τ(m)` re-pricing, recomputed: the separability is right and the price is not

<!-- ledger
id: Q-tau-repricing
status: CLOSED
todo: none
question: Does the tau(m) re-pricing of the x-free bound stand?
verdict: The separability claim is true and re-derived four ways, but the re-pricing substitutes one quantity for a different one: summed over the modulus set the tau(m) bound IS the divisor-pair count up to the vector sieve's fixed factor 3, and used as a bound it is 4 to 5x weaker than the exact quantity in the Fourier basis and 23 to 44x weaker in the divisor-pair basis.
-->

*(Attack 7 of ten, overnight wave of 2026-08-18/19. Producer:
`research/attack-tau-repricing.js`, one run, output block written by
`research/qc/embed.js`. Legend: **[PROVEN]** published theorem with source;
**[VERIFIED]** computed here; **[MEASURED]** empirical, finite range;
**[INFERRED]** our deduction. No repository file was edited; every correction
below is a draft for a human to apply. Nothing committed, nothing pushed.)*

## HEADLINE

**The separability claim is true and I re-derived it four ways. The re-pricing
drawn from it is not, and it is a substitution of one quantity for a different
one. `τ(m)` is the number of terms inside a *single* modulus; `C^{π(z)}` is the
size of the *whole* x-free bound. Summed over the modulus set the `τ(m)` bound
**is** the divisor-pair count `N`, up to the vector sieve's fixed factor 3, so it
is not an alternative to `C^{π(z)}`; it is that same figure written per modulus,
and a worse version of it. Used as a bound,
`τ(m)` is **4 to 5× weaker** than the exact quantity the corpus already computes
in the Fourier basis, and **23 to 44× weaker** in the divisor-pair basis
[VERIFIED].**

**Nothing downstream moves.** `u_1^prov` re-priced with every per-modulus price
down to a price of literally 1: `3.4299…7.1966` (`Vabs`, the corpus figure) →
`3.0839…7.0324` (exact `Θ*`) → `2.6523…6.5619` (exact in `a` too) → floor
`2.6346…5.7972`. The whole re-pricing buys **0.78 falling to 0.63** of window
exponent, a *shrinking* constant, and the floor `(θ(z)/2 − ln M)/ln z` diverges
like `z/(2 ln z)`. It exceeds 2 at every measured `z` by 0.63 to 3.80. **The
Gap Reformulation's `θ < 2` is not reachable on this chain at any price.**

**`u_sup`'s closure does not reopen; it never used the price.** All three
closure numbers re-derive from the exact `S_sat` (`d ln S_sat/d ln z` = 4.9872
and 6.1967 against the published 4.99 and 6.20; bounded-family asymptote 5.5649
against 5.56). Under the `τ(m)` price the ladder reads **+0.43 to +0.58 worse**
at every level.

**And the worst-case/average distinction closes route C1 far earlier than §6
says.** The sum needs the saving on average. On the true working-point modulus
set the mean `τ` is **flat at ≈17** while the requirement is `H^{θ−1}`, a power
of `z`. They have already crossed at `z = 31`, the lowest level tested — not at
`z = 10¹²`.

---

## 1. Separability: derived here, and it is not new

`attack-theta-last-gap.md` §6 (C1) writes the remainder as
`R(x) ~ Σ_h c_h Σ_m e(−hx/m) K_h(m)` and observes that `x` occurs once. That is
correct. The exact finite version, derived from scratch in §B of the script:

    1[y ≡ c mod q] − 1/q = (1/q) Σ_{a=1}^{q−1} e(a(y−c)/q),

and writing `a = g·a′`, `g = gcd(a,q)`, `e = q/g > 1` so that each divisor
`e > 1` of `q` and each `a′` coprime to `e` occurs exactly once, then summing
`y = x+1 … x+H`:

> `R(x) = Σ_{e | P(z), e>1} Σ*_{a mod e} Θ_e(a) · S_H(a/e) · e(ax/e)`,
> `Θ_e(a) = Σ_{i : e | q_i} (w_i/q_i) e(−a c_i/e)`, `S_H(t) = Σ_{m≤H} e(mt)`.

`x` appears in `e(ax/e)` and nowhere else. **[VERIFIED]** four ways, none of
them a re-reading of the corpus:

| check | result |
|---|---|
| one-class Fourier identity against brute-force counting, 12 moduli × 5 positions | worst error `5.08e-14` |
| reciprocity `c(d₁,d₂)/(d₁d₂) ≡ −2·d̄₁/d₂ mod 1`, all coprime pairs at z = 13..23 | 13,116 pairs, **0 violations**, worst `0.00e+0` |
| the aggregate identity against a direct count over the full period W = 2310 | worst error `2.52e-13` |
| the per-modulus term count is at most `3·τ(m)` and its sum is `N` | `96 = 3·τ(2310)` exactly at z = 13, cut to 114 against 192 at z = 17 by the level truncation; 852…20700 pairs over 32…468 moduli |

**It is also not new.** It is L5 of attack 1, in `research/lemmaV-parseval.js`
lines 55–62, which already says *"The window position enters ONLY as the
unimodular phase e(ax/e)"* and *"Parseval kills the left factor for free"*.
`sift-limit-attack.md` §7e says the same in Brüdern–Fouvry's variables:
*"unimodular, so Parseval kills it for free"*. What was new on 2026-08-18 is
the `τ(m)` reading of what separability buys, and that is where the defect is.

## 2. The defect: `τ(m)` and `C^{π(z)}` are one quantity at two granularities

The chain has **one** absolute-value step and it does two things at once:

    sup_x |Σ_{e,a} Θ_e(a) S_H(a/e) e(ax/e)|  ≤  Σ_{e,a} |Θ_e(a)| |S_H(a/e)|

(i) `|e(ax/e)| = 1` discharges the position quantifier. Free, pointwise.
(ii) the triangle inequality **over the pair (e,a)** is what makes the result
`x`-free at all, and it discards every cancellation *across* moduli.

**You cannot do (i) without (ii).** A bound that still contains a sum over `e`
is still a function of `x`. §6's *"the quantifier is discharged at no cost"* is
a statement about (i) alone; the cost is entirely in (ii), and `τ(m)` — the
term count inside one `Θ_e(a)` — says nothing about (ii).

Three `x`-free bounds, differing only in what is kept inside one modulus, all
computed at `s = 3.0` over `z = 13..47` **[VERIFIED]**:

```
  z    N        S_sat_triv   S_sat      N/S_sat  Striv/S_sat  u(N)     u_triv  u_sat
  13      852   7.9693e+1   1.9602e+1    43.47      4.07      3.7555   2.8318  2.2850
  23     9636   1.1438e+3   2.4250e+2    39.74      4.72      4.0025   3.3228  2.8281
  31    35868   4.7730e+3   9.5263e+2    37.65      5.01      4.0825   3.4952  3.0259
  43   183084   3.7608e+4   7.1072e+3    25.76      5.29      4.2085   3.7877  3.3448
  47   293980   6.7104e+4   1.2623e+4    23.29      5.32      4.2482   3.8645  3.4306
```

`S_sat_triv = Σ_e Vabs(e) Σ*_a 1/|sin(πa/e)|` with `Vabs(e) = Σ_{e₁e₂=e}|V|`
is exactly "`τ(e)` terms, each bounded" — **it is the `τ(m)` price**. `S_sat`
carries the exact `|Θ_e(a)|` and is what `u_sup` and `u_sat` have always been
built from.

Three readings.

**(a) `Σ_m τ_w(m) = N` by definition, and `N` grows geometrically in `π(z)`.**
The bookkeeping is exact rather than approximate: the sum identity holds at every
`z`, and the per-modulus ceiling is `3·τ(m)`, the 3 being the vector sieve's
`(−,+), (+,−), (+,+)`. At z = 13 the extremal modulus attains it on the nose,
`96 = 3·τ(2310)`; from z = 17 on the level truncation `d₁, d₂ ≤ z^s` cuts it
below (114 against 192), which only makes the `τ(m)` price looser still.
Geometric-mean per-added-prime factors over z = 13..47: `N` **1.9142**,
`S_sat_triv` **2.1137**, `S_sat` **2.0516** — the last reproducing the corpus's
*"`S_sat` grows ~2.05× per added prime"* to three digits. Log-log slopes 4.4993,
5.1391, 4.9872. **So "the price is `τ(m)`" and "the price is `C^{π(z)}`" are the
same statement at two granularities. The first does not replace the second.**

**(b) As a bound, `τ(m)` is a regression.** `N/S_sat` runs 43.47 → 23.29 and
`S_sat_triv/S_sat` runs 4.07 → 5.32. The corpus's exact quantity is already
cheaper than the `τ(m)` price by a factor 4 to 5 in the Fourier basis and 23 to
44 in the divisor-pair basis. **The `τ(m)` saving is already spent.**

**(c) The unspent part is not even bounded.** `S_sat_triv/S_sat` has log-log
slope **+0.1519** over ten levels (RSS 2.78e-2), so what `τ(m)` bounds is
itself growing, slowly, in `z`. That is the honest version of "how much
headroom is left inside one modulus": a factor about 5, rising like `z^{0.15}`,
against a requirement that is a power of `z`.

### 2a. Concurrent corroboration, and the one place it stops short

Attack 10 of this same wave reached the same verdict from the other end and
landed independently: `research/history/staging/redteam-2026-08-18.md` §5 marks
headline 5 **WEAKENED**, on the ground that at the worst `m | P(z)` the maximal
order `τ(m) = 2^{π(ln m)}` returns `2^{π(z)}` exactly, so *"priced at `τ(m)`
rather than `C^{π(z)}`" does **not** lower the worst-case price*
(`research/redteam-tau-and-split.js`). That is the same conclusion at one
modulus; §2 above is the same conclusion summed over all of them, with the
downstream consequences measured.

Two places this report goes further. (a) That section records
**[CANNOT VERIFY]** for the Fourier expansion itself — *"not derivable from
anything in this repository"*. §1 above derives it and checks it four ways, so
that flag can be lifted. (b) It then grants, conditionally, that *"taking
absolute values in a factor that is the only carrier of `x` discharges the
quantifier at no cost"*. That is the one clause that does not survive: the
factor is free, but the triangle inequality over the modulus sum is not
optional, and it is where the whole loss lives.

## 3. `u_1^prov` re-priced: a constant, and a shrinking one

`u_1^prov` is the smallest `u` with `HM ≥ √(W·min(B·H, B₂))`. The `B₂` branch
wins at every `z = 13..47` (`attack-AB-bounded.md` §5; reproduced here at
z = 19, 23, 29 as 4.3604 / 4.7087 / 5.0021 and at the endpoints as 3.4299 and
7.1966), so

    u_1^prov = (θ(z)/2 + ln B₂/2 − ln M)/ln z,

and `B₂` is **the only place a per-modulus price enters**. Four prices:

```
  z    B2_Vabs     B2_star    B2_ex      Vabs/ex  u(Vabs)  u(star)  u(ex)   u(B2=1)
  13  5.9130e+1  1.002e+1  1.095e+0      54.00   3.4299   3.0839  2.6523   2.6346
  23  8.0239e+2  2.464e+2  7.982e+0     100.52   4.7087   4.5204  3.9735   3.6422
  29  1.9388e+3  4.575e+2  1.360e+1     142.60   5.0021   4.7876  4.2656   3.8780
  37  1.1093e+4  3.046e+3  8.568e+1     129.47   5.8829   5.7039  5.2095   4.5932
  47  4.7864e+4  1.352e+4  3.609e+2     132.62   7.1966   7.0324  6.5619   5.7972
```

**[VERIFIED]**, where `B2_star = ¼Σ e²Θ*(e)²` uses the exact maximum over `a`
and `B2_ex = Σ_e Σ*_a |Θ_e(a)|²/(4 sin²(πa/e))` is the sharpest `H`-free bound
this chain admits — every cancellation `τ(m)` could ever bound, banked exactly.

**What the re-pricing buys, plainly.** `u(Vabs) − u(ex)` = 0.7776, 0.7996,
0.7603, 0.7352, 0.7365, 0.7205, 0.6734, 0.6602, 0.6499, **0.6347** over
z = 13..47, with slope `−0.1241` per unit `ln z`. **It is a constant, and it is
shrinking.** It is not an exponent.

**And it cannot be made to matter, because the floor diverges.** Setting
`B₂ = 1` — a per-modulus price of literally nothing, cheaper than any `τ(m)`
statement could ever be — leaves

    u_floor(z) = (θ(z)/2 − ln M)/ln z = 2.6346, 2.8988, 3.3285, 3.6422, 3.8780,
                 4.3177, 4.5932, 4.9705, 5.4201, 5.7972   at z = 13..47,

fitted slope `+2.3632` per unit `ln z`. `θ(z) ~ z` **[PROVEN**, Chebyshev**]**,
so `u_floor` diverges like `z/(2 ln z)` whatever happens inside a modulus. The
gap to the `θ < 2` the Gap Reformulation needs is `+0.6346` at z = 13 rising to
`+3.7972` at z = 47 **[MEASURED]**.

> **Answer to the brief's item 2, stated plainly.** The `τ(m)` price changes a
> constant and nothing else. It does not move the ladder toward `θ < 2`, and no
> per-modulus price can, because the all-positions exponent is bounded below by
> `θ(z)/(2 ln z) − ln M/ln z`, which contains no divisor-pair structure at all.
> That lower bound is the union bound over the period, and it is the same
> `θ(z)/(2 ln z)` that `attack-beta2-01` §4(ii) already identified as the
> divergent term in `u_1`.

For the record, the sharpest reading `u(ex)` sits **below `β₂ = 4.26645` only
to `z = 29` (4.2656) and crosses between 29 and 31 (4.7849)** — the same shape,
and the same verdict, as `u_sup`.

## 4. `u_sup`'s closure: it does not reopen, and it never used the price

The closure rested on three measurements of `S_sat`. Re-derived here from
scratch **[VERIFIED]**:

| closure number | source | recomputed here |
|---|---|---|
| `d ln S_sat/d ln z`, ten levels / top five | 4.99 / 6.20 | **4.9872 / 6.1967** |
| bounded family `A − B/ln z` asymptote (`u_sat`) | 5.56 | **5.5649** |
| forcing the asymptote to `β₂` | 8.70× RSS | 7.21× RSS |
| constant model against the bounded family | 49× RSS (on `u_sup`) | 26.8× RSS (on `u_sat`) |

The last two rows are the `u_sat` analogues of `u_sup` figures and are not
claimed as reproductions; the first two are, and they land. **Every one of the
three is a property of the exact `S_sat`. None takes a per-modulus price as an
input, so none can move when that price is renamed.**

And the direction is measurable rather than arguable. Under the `τ(m)` price
the ladder reads:

```
  z    u_sat (exact)   u_sat under the tau(m) price   difference
  13      2.2850              2.8318                    +0.5468
  29      2.8827              3.3514                    +0.4687
  47      3.4306              3.8645                    +0.4339
```

**The `τ(m)` price is worse at every level. It cannot reopen a closure it makes
harder.** `u_sup` stays closed, with the same verdict and the same numbers.

## 5. Worst case against average, and route C1 dies at z = 31

§6(C1) prices the residual as `Σ_m |K_h(m)|` with `|K_h(m)| ≤ τ(m)`, compares
`max τ(m)` against the requirement `H^{θ−1}`, and gets a crossover at
`z ≈ 10¹²` (reproduced here at `z = 9.388e11`). **The comparison is against the
wrong statistic.** What has to be small is the total over the modulus set, so
the saving has to be there **on average**.

**A trap that has to be said first.** The textbook average `Σ_{m≤M} τ(m) ~ M ln M`
does **not** apply. Every modulus here is a squarefree `z`-smooth number, so
`τ(m) = 2^{ω(m)}` and it is far larger than `ln m` on this set. An earlier draft
of this report used `ln m` and got the crossover wrong by five orders of
magnitude in the optimistic direction. The average must be measured on the
actual set.

Measured, exhaustively, at the true working point of `attack-theta-last-gap.md`
§2 (`H = z^{β₂}`, `D⁺ = H^{1/2}`, `D⁻ = H^{0.712157}`, `d₁ ≤ D⁺` and `d₂ ≤ D⁻`
squarefree `z`-smooth and coprime, `m = d₁d₂`, every pair enumerated):

```
  z     N pairs    #moduli   mean tau  max tau  need H^{th-1}  mean/need  mass share
  31       6966       493     14.130      38      22.38         0.6313    9.459e-1
  43      47757      2943     16.227      55      30.10         0.5391    7.976e-1
  61     352076     20477     17.194      72      41.31         0.4163    5.977e-1
 101    6025096    342495     17.592     122      65.20         0.2698    3.354e-1
 113   14507542    874975     16.581     134      72.17         0.2297    2.558e-1
 127   22247827   1266333     17.569     145      80.22         0.2190    2.427e-1
```

**[VERIFIED].** `d ln(mean τ)/d ln z = 0.1172`; `d ln(need)/d ln z = 0.9052`,
which is exactly `β₂(θ−1)`. **The mean is flat at about 17 and the requirement
is a power of `z`.** They have already crossed at `z = 31`, the lowest level
tested, and the ratio falls monotonically to 0.219 by `z = 127`. The share of
the total sitting on moduli that even individually meet `τ(m) ≥ m^{0.17502}`
falls from `9.459e-1` to `2.427e-1` over the same range.

> **Answer to the brief's item 4.** The argument needs the **average**. The
> average supplies a bounded factor of about 17 against a requirement growing
> like `z^{0.905}`, so route C1 is closed from `z = 31` on, not from `z = 10¹²`.
> The `10¹²` figure is the worst-case crossover, and the worst case is attained
> at the extremal modulus, which cannot carry a sum over 1,266,333 of them at
> z = 127. This is the third route in
> this corpus killed by exactly this distinction.

## 6. What this leaves, and what it takes back

**Kept.** Separability is real, exact, and worth having: it localises the entire
difficulty in the `m`-sum, i.e. in cancellation *across* moduli, and it does
dissolve Brüdern–Fouvry's left factor. `θ_total = 1` is unchanged. The
break-even 1.208983 (1.212157 with the diagonal free) is unchanged.

**Taken back.** The sentence *"its price is `τ(m)`, not `C^{π(z)}`"* and the
three corpus edits that carried it. `C^{π(z)}` was the correct figure for the
correct object, and it stands.

**Not attempted here, and flagged.** Whether cancellation across `m` — the (ii)
step — admits any bound better than the triangle inequality is the actual open
question, and it is the maximal-inequality wall in a new coordinate. Attack B's
localisation (`attack-AB-bounded.md` §4.4: *"The whole wall is in the
tail"*) is the sharper statement of where to look, and nothing here touches it.

---

## 7. DRAFT CORRECTIONS (I edited nothing; these are for the adjudicator)

**`research/sift-limit-attack.md` §7e**, the block beginning *"The price is
CHEAPER than this block said, corrected 2026-08-18"* — **RETIRE.** (The
`CHANGELOG` entry files this under "§4.5", but the text itself is in §7e; §4.5
carries no `τ(m)` sentence.) Replace with:

> **The price is `C^{π(z)}` and the 2026-08-18 correction to `τ(m)` is
> withdrawn.** All of the `x`-dependence does sit in a single factor `e(−hx/m)`
> and the quantifier is separable — that part stands, and it is L5 of attack 1
> rather than new. But `τ(m)` counts the terms inside **one** modulus, and
> `Σ_m τ(m)` over the modulus set **is** the divisor-pair count `N`, which grows
> at 1.9142 per added prime. Used as a bound the `τ(m)` price is 4 to 5× weaker
> than `S_sat` in the Fourier basis and 23 to 44× weaker in the divisor-pair
> basis, and the ladder it gives is `+0.43` to `+0.55` worse at every
> `z = 13..47`. `research/attack-tau-repricing.js` §C.

**`TODO.md` item B**, *"the price was corrected on 2026-08-18 from `C^{π(z)}` to
`τ(m)`"* — **RETIRE** the same way, and add: the closure does not depend on
either name, because all three closure numbers are measurements of the exact
`S_sat` and re-derive to 4.9872 / 6.1967 / 5.5649.

**`research/history/staging/attack-theta-last-gap.md` §6(C1)** — **two
corrections.** (a) *"Take absolute values THERE and the estimate is uniform in
`x` for free — the quantifier is discharged at no cost"*: the unimodular factor
is free, but the triangle inequality over the modulus sum is not optional and is
where the whole loss lives. (b) The crossover table compares `max τ(m)` against
the requirement; the sum needs the **average**, which is flat at about 17 on the
actual modulus set while the requirement grows like `z^{0.905}`. The route is
closed from `z = 31`, not from `z = 10¹²`. §7's *"its price is `τ(m)`, not
`C^{π(z)}`"* goes with it.

**`research/history/CHANGELOG.md`, entry of 2026-08-18 attack C**, the section
*"sift-limit-attack.md §4.5 and TODO item B, 'the quantifier is priced, and the
price is C^{π(z)}'"* — **REVERSED.** Draft replacement entry:

> **2026-08-19 — the `τ(m)` re-pricing is withdrawn; `C^{π(z)}` was right.**
> *(Report: `research/history/staging/attack-tau-repricing.md`; producer
> `research/attack-tau-repricing.js`.)* Attack C's separability observation is
> correct and re-derived four ways, and it is L5 of attack 1 rather than new.
> Its consequence is not: `τ(m)` is the per-modulus term count and `C^{π(z)}` is
> the size of the whole `x`-free bound, and `Σ_m τ(m) = N`, so the second is the
> aggregate of the first and not an alternative to it. Downstream, recomputed:
> `u_1^prov` moves 3.4299…7.1966 → 2.6523…6.5619 under the sharpest possible
> per-modulus price, a saving of 0.78 falling to 0.63 of window exponent, and is
> bounded below by `(θ(z)/2 − ln M)/ln z` = 2.6346…5.7972, which diverges like
> `z/(2 ln z)` and exceeds 2 at every measured `z`. `u_sup` stays closed and
> reads worse, not better, under the `τ(m)` price. Route C1's crossover moves
> from `z ≈ 10¹²` to `z = 31` once the average rather than the maximum of `τ` is
> used, the average being flat at about 17 on the actual (`z`-smooth,
> level-restricted) modulus set against a requirement growing like `z^{0.905}`.

---

*Producer: `research/attack-tau-repricing.js`. Everything above is from one
embedded run; no figure was transcribed by hand.*
