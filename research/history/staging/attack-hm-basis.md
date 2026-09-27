# The `u_sup` ladder in the `(h,m)` basis: the divergence is the object, and the natural basis is the worse of the two

<!-- ledger
id: Q-hm-basis
status: ANSWERED
todo: none
question: Does the u_sup divergence survive the change to the natural (h,m) basis?
verdict: It survives: the two bases are nested rather than rivals, the natural one is the outer and weaker member, and the gap between them is a flat factor of 7.26 across nine levels, so the divergence that closed u_sup runs in both bases.
-->

*(2026-08-19, attack E of five. Producer: `research/attack-hm-basis.js`, one run,
OUTPUT block written by `research/qc/embed.js` with `--streams both`. Legend:
**[PROVEN]** published theorem with source; **[VERIFIED]** computed in this
repository; **[MEASURED]** empirical, finite range; **[ABSENT]** searched, with
the channel and a same-session calibration named; **[INFERRED]** our deduction.
**No literature channel was opened in this session and no `[ABSENT]` claim is
made anywhere in this document.** No repository file was edited: every
correction below is a draft for a human to apply. Nothing committed, nothing
pushed.)*

## HEADLINE

**The computation the ledger recorded as never run is now run. The two bases are
not rivals — they are nested, the natural one is the outer and weaker member of
the pair, and the gap between them is a flat factor of 7.26 across nine levels.
So the divergence that closed `u_sup` survives the change of basis with the same
growth law, and reading 21's "basis-dependent" turns out to be a statement about
term counts that does not transfer to the total price.**

1. **The weights are `K_h(m)`, and attaching them is not an extension of the
   identity — it is the identity with one summation not yet performed.**
   [VERIFIED] `K_h(m) = Σ_{i : q_i = m} (w_i/q_i) e(−h c_i/m)`. Its `h = 0` value
   rebuilds the main term (`Σ_m W(m) = M` to **7.7e-15**), and its aggregation
   over the moduli divisible by `e` rebuilds attack 1's `Θ_e(a)` at every
   frequency, worst discrepancy **3.12e-16 over 2309** frequencies at `z = 13`
   and **5.62e-16 over 30029** at `z = 17`, against a `Θ` rebuilt independently
   from the raw term list.

2. **(T1), and it decides the shape of the answer before any number is read.**
   [VERIFIED] The one absolute-value step is taken at the same place in both
   bases and they differ only in whether the sum over `m` is inside or outside
   it, so `Ssup_hm(H) ≥ Ssup_e(H)` at every frequency, every `H` and every `z`.
   Checked directly rather than inherited: **0 violations out of 2309, 30029 and
   510509 frequencies** at `z = 13, 17, 19`. **The `(h,m)` basis could never have
   rescued `u_sup`. What was genuinely open was the size of the gap.**

3. **The size is a constant.** [MEASURED] `Ssat_hm/Ssat_e` = 6.6170, 7.8932,
   7.3607, 6.9840, 7.5211, 7.5241, 7.4093, 7.0958, **7.0136** over `z = 13..43`.
   Geometric mean **7.2599**, total spread 1.19×, and the log-log slope of the
   ratio against `z` is **0.0133**. Nine levels, no trend.

4. **So the divergence survives, with the same law.** [MEASURED] Per added prime
   the saturation grows **2.0889** in the `e` basis and **2.1042** in the `(h,m)`
   basis on the common range, a ratio of **1.0073**. Log-log slopes
   `d ln Ssat/d ln z` are **4.9872 against 4.8678** over all levels and **6.1967
   against 6.1204** over the top five. Both above `β₂ = 4.26645` in every window.
   **The 2.05-per-added-prime law that closed `u_sup` is not a property of the
   `e` basis.**

5. **And it survives on the ladder itself, not only on the saturation.**
   [VERIFIED] `u_sup` in the `(h,m)` basis reads **2.8201, 3.0313, 3.2463,
   3.3030, 3.3723, 3.5062** over `z = 13..31`, rising at **5 of 5** steps, beside
   the `e` basis's 2.0617, 2.3036, 2.5518, 2.6666, 2.7464, 2.8924 rising at 5 of
   5. `H_hm/H_e` = 6.995, 7.861, 7.729, 7.353, 8.228, 8.230 — the same flat
   factor of about 7, now in the window.

6. **The bounded reading agrees in both bases.** [MEASURED] Fitting the one
   bounded model `u = A − B/ln z`, like for like on the same nine levels, `u_sat`
   reads **A = 5.4512** in the `e` basis against **5.4823** in the `(h,m)` basis;
   on `u_sup` over six levels, **5.2163** against **5.3737**. All four are above
   `β₂`. **The most favourable reading the natural basis admits still lands above
   the target.**

7. **The withdrawn `τ(m)` re-pricing did not come back in, and the check is
   decisive rather than rhetorical.** If the basis change had smuggled it back,
   the `(h,m)` total would have come out cheaper. It comes out **more expensive at
   every level, by 6.62× at the least and 7.89× at the most.**

8. **Two corrections fall out, both moving their own file's conclusion in the
   direction it already points.** `attack-tau-repricing.md`'s "at most `3·τ(m)`"
   holds for odd `m` and is **4.5·τ(m)** at even `m`; and
   `attack-tail-maximal.md` reading 21's "`z^{2s}` moduli" is a cap on the
   **size** of `m`, not a count — the realised `(h,m)` modulus count is **fewer**
   than `2^{π(z)}` at every level, falling to **0.474** of it at `z = 43`.

**WHAT THIS IS NOT.** The `(h,m)` basis is **not a second independent
instrument**. By (T1) it is the `e` basis with one summation moved outside an
absolute value, and it agrees because it must. §6 states this at length, because
this project has been burned twice this week by exactly that distinction.

---

## 0. Custody

Everything numeric below is quoted from `research/attack-hm-basis.js`, run once
in this session, with its OUTPUT block written by `research/qc/embed.js`. The
divisor-pair term list, the exact mean square and the full-period walk are
`research/sift-limit-lemmaV.js`'s; the `e`-basis spectral records are
`research/lemmaV-parseval.js`'s `spectralRecords()`; the `(e,a)` sweep kernel and
the `H_sup` protocol are `research/lemmaV-sup-extension.js`'s `sweep()` and
`findHsup()`. All are imported, never recopied. **Both columns below are produced
by one kernel, and differ only in whether the `V`-array is aggregated across
moduli or kept per modulus.** A basis comparison run on two implementations would
be measuring the implementations. `research/qc.js` and `research/qc/units.js`
were read before any file was written.

**The published anchors, reproduced before anything new** (§A of the output; the
brief named the `u_sup` ladder and the 2.0516 explicitly):

| anchor | published | here | source of the published figure |
|---|---|---|---|
| `Ssat` at ten levels | 1.9602e+1 … 1.2623e+4 | same to 5 figures, worst rel. diff **2.7e-5** | `lemmaV-sup-extension.md` §2 |
| `H_sup` at `z = 13..31` | 198, 683, 1833, 4278, 10384, 20586 | **all six exact** | same |
| `u_sup` at `z = 13..23` | 2.0617, 2.3036, 2.5518, 2.6666 | **identical** | `lemmaV-parseval.js` S5 |
| `S_sat` per added prime, `z = 13..47` | 2.0516 | **2.0516**, rel. diff 5.4e-6 | `attack-tau-repricing.md` §2 (a) |
| bounded-family asymptote for `u_sat` | 5.5649 | **5.5649** | same |

Two further published figures fall out without being aimed at. §F(c):
`N/Ssat_e` = **43.47** at `z = 13` and **25.76** at `z = 43`, the two ends of
`attack-tau-repricing.md`'s "23–44× and falling". §F(a): `n/τ` at `m = 2310`
reads **3.0000** at `z = 13` (its `96 = 3·τ(2310)`) and **3.5625** at `z = 17`
(its `114`).

**Convention.** `s = 3.0` throughout, the level the published ladder uses.
`π(z)` is the sieve prime count `#{p < z}`, matching `rosserSupport()`.
`u = ln H / ln z`, `u_sat = ln(Ssat/M)/ln z`. The `H`-scan uses the published
grid schedule `K = 20` at `z ≥ 29` and `24` below, and **both bases are scanned
on the same grid at the same `z`**, because `H_sup` off a geometric grid depends
on the grid.

---

## 1. THE WEIGHTS — what they are and where they come from

The brief's step 1. `attack-tail-maximal.js` reading 13 says a total price in the
`(h,m)` basis "needs the weights attached to each `m`, which are not computed
here". Those weights are one object.

Each divisor-pair term contributes a sawtooth at its **own** modulus `q_i`, and
that modulus's Fourier expansion has frequencies `h/m`, `h = 1..m−1`. Collecting
the terms that share a modulus:

```
  K_h(m) := sum_{i : q_i = m} (w_i / q_i) e(-h c_i / m)                [THE WEIGHTS]

  R(x) = sum_m sum_{h=1}^{m-1} K_h(m) S_H(h/m) e(h x / m),   S_H(t) = sum_{j<=H} e(jt)
```

So the weight attached to `m` is a **signed** sum of `w_i/q_i` over the terms
whose lcm is exactly `m`, twisted by the phase of that term's CRT class. It is
not a new quantity: `K_0(m) = W(m)` is that modulus's share of the main term, and
`Σ_m W(m) = M`.

Computing it costs one extra index. For a modulus `m` and a divisor `e | m`, the
class `c_i mod e` depends on `i` only through `(e₁,e₂) = (gcd(e,d₁), e/gcd(e,d₁))`
— `c_i ≡ 0 mod e₁` and `≡ −2 mod e₂`, so `c_i/e ≡ −2·inv(e₁)/e₂ mod 1` — which is
exactly `lemmaV-parseval.js`'s `V(e₁,e₂)` structure with the `m`-restriction not
yet dropped. **`hmRecords()` is `spectralRecords()` with one key added.** That is
the whole implementation, and it is why the comparison is clean.

**Two identities, and both must hold if `K_h(m)` is the right object** — §A(d),
[VERIFIED]:

| check | `z = 13` | `z = 17` |
|---|---|---|
| `Σ_m W(m) = M`, relative | 7.7e-15 | 1.7e-14 |
| worst `\|Σ_{m : e\|m} K_{a m/e}(m) − Θ_e(a)\|` | **3.12e-16** | **5.62e-16** |
| frequencies checked | 2309 | 30029 |

The `Θ_e(a)` on the right is rebuilt **from the raw term list**, not from the same
factorisation arrays, so this is a check on the construction and not a tautology.

§B prints the weights themselves at `z = 13`: all 32 moduli, their term counts,
`W(m)`, `max_h |K_h(m)|` and what each pays. The largest single modulus
contributes **8.2%** of `Ssat_hm`, so no one modulus owns the answer.

---

## 2. THE TWO BASES, AND WHY THEY ARE NESTED — (T1)

Putting a frequency in lowest terms, `h = g·a` with `g = gcd(h,m)` and `e = m/g`,
turns the `(h,m)` identity into attack 1's L5:
`Θ_e(a) = Σ_{m : e | m} K_{a m/e}(m)`. **One line is the whole difference**, and
it is where the sum over `m` sits relative to the absolute value:

```
  e basis      Ssup_e (H) = sum_e sum*_a | sum_{m : e|m} K_{a m/e}(m) | |S_H(a/e)|
  (h,m) basis  Ssup_hm(H) = sum_e sum*_a  sum_{m : e|m} |K_{a m/e}(m)| |S_H(a/e)|
```

**(T1)** [PROVEN, one line of triangle inequality] `Ssup_hm(H) ≥ Ssup_e(H)` for
every `H`, `z` and `s`, frequency by frequency. Hence `Ssat_hm ≥ Ssat_e`,
`H_hm ≥ H_sup`, and `u_hm ≥ u_sup`.

Checked directly in §C rather than rested on: **0 violations** out of 2309,
30029 and 510509 frequencies at `z = 13, 17, 19`.

**This is the most important structural fact in the file.** It means the answer
to "does the divergence survive?" was never going to be "no". The `(h,m)` basis
is pointwise weaker, so if `u_sup` diverges then `u_hm` diverges, unconditionally
and with no measurement at all. **What was genuinely open, and is what §3 and §4
measure, is the size and the shape of the gap** — a bounded factor leaves the
growth law untouched, a growing factor would mean the `e` basis flatters the
bound by an unbounded amount and the two ladders would be telling different
stories about the rate.

---

## 3. THE LADDER, BOTH COLUMNS — the brief's step 2

Every row is a legal unconditional worst-position statement in **both** bases:
`H·M > Ssup(H)` puts `T(x) > 0` at every position, with no maximal law and no
averaging. §D:

```
  z    Ssat_e      Ssat_hm     ratio    u_sat_e  u_sat_hm  diff    H_sup_e  H_sup_hm  u_sup_e  u_sup_hm  diff
  13  1.9602e+1  1.2970e+2   6.6170  2.2850   3.0217   0.7367       198      1385   2.0617   2.8201   0.7584 exact
  17  5.0314e+1  3.9714e+2   7.8932  2.4623   3.1915   0.7292       683      5369   2.3036   3.0313   0.7278 exact
  19  1.2006e+2  8.8374e+2   7.3607  2.7228   3.4007   0.6779      1833     14167   2.5518   3.2463   0.6945 exact
  23  2.4250e+2  1.6936e+3   6.9840  2.8281   3.4480   0.6199      4278     31458   2.6666   3.3030   0.6363 exact
  29  5.2311e+2  3.9344e+3   7.5211  2.8827   3.4819   0.5992     10384     85435   2.7464   3.3723   0.6259
  31  9.5263e+2  7.1676e+3   7.5241  3.0259   3.6136   0.5877     20586    169427   2.8924   3.5062   0.6138
  37  2.5727e+3  1.9062e+4   7.4093  3.1644   3.7190   0.5546
  41  4.6495e+3  3.2992e+4   7.0958  3.2543   3.7819   0.5277
  43  7.1072e+3  4.9847e+4   7.0136  3.3448   3.8627   0.5179
  47  1.2623e+4      --         --   3.4306     --       --
```

The `u_sup` scan stops at `z = 31` in **both** bases because it costs the ladder
times the grid, and the `(h,m)` basis pays **1.106e+10** frequency points at
`z = 43` on its own. `u_sat` carries the comparison to 43, which
`lemmaV-sup-extension.md` §2 licenses: it measures `u_sat − u_sup` tracking
`0.51/ln z` and shrinking.

At `z = 31`, for instance, the `(h,m)` statement is: **every window of 169,427
consecutive integers contains an `r` with `r` and `r+2` both 31-rough**,
established with no maximal law and no exceptional set. It is true, it is
legally derived, and it is 8.23× weaker than the same statement in the `e`
basis.

---

## 4. DOES THE DIVERGENCE SURVIVE? — the brief's step 3

**Yes, and with the same law. Here is the honest size of that.**

**(a) The gap between the bases is flat.** `Ssat_hm/Ssat_e` over nine levels:
6.6170, 7.8932, 7.3607, 6.9840, 7.5211, 7.5241, 7.4093, 7.0958, 7.0136. Minimum
6.6170, maximum 7.8932, geometric mean **7.2599**, log-log slope against `z`
**0.0133**. In window exponent, `u_sat_hm − u_sat_e` falls 0.7367 → 0.5179 and
`(u_sat_hm − u_sat_e)·ln z` stays between **1.8896 and 2.0660** at all nine
levels — the difference *is* `ln(7.2599)/ln z`, and it goes to zero.

**(b) The growth law is the same in both.** Per added prime, on the common range
`z = 13..43`: **2.0889** (`e`) against **2.1042** (`(h,m)`), ratio **1.0073**.
Log-log slopes `d ln Ssat/d ln z`: **4.9872 / 4.8678** over all levels,
**6.1967 / 6.1204** over the top five, **7.2037 / 6.2285** over the top three.
Every window in both bases sits above `β₂ = 4.26645`.

**(c) The ladder itself rises identically.** `u_sup` rises at **5 of 5** steps in
both. The step sizes track: 0.2418/0.2112, 0.2483/0.2150, 0.1148/0.0566,
0.0798/0.0693, 0.1459/0.1339.

**(d) Even the bounded reading lands above `β₂` in the natural basis.** The one
model in `lemmaV-sup-extension.md` §1 item 3 that is bounded, `u = A − B/ln z`:

| fit | levels | `A` | `B` | RSS |
|---|---|---|---|---|
| `u_sat`, `e` basis | 10 (`z = 13..47`) | **5.5649** | 8.5739 | 4.772e-2 |
| `u_sat`, `e` basis, restricted | 9 (`z = 13..43`) | **5.4512** | 8.2419 | 3.660e-2 |
| `u_sat`, `(h,m)` basis | 9 (`z = 13..43`) | **5.4823** | 6.3603 | 2.665e-2 |
| `u_sup`, `e` basis | 6 | **5.2163** | 8.0799 | 1.660e-2 |
| `u_sup`, `(h,m)` basis | 6 | **5.3737** | 6.5156 | 1.467e-2 |

The restricted row matters and is why it is printed. Fitted over ten levels the
`e` basis reads 5.5649, **above** the `(h,m)` basis's 5.4823, which would look
like a violation of (T1). It is not: like for like on the same nine levels the
`e` basis reads 5.4512 and the `(h,m)` basis is the higher of the two, as (T1)
requires. **The apparent inversion is the tenth level and nothing else.** This is
the sort of comparison the units file's window-convention entry exists to catch,
and it fired here.

**(e) The mechanism, and it is worth recording.** The mean number of moduli
sharing one frequency **grows**: 6.81, 10.56, 14.30 at `z = 13, 17, 19` with
maxima 16, 32, 62. The mean cross-modulus collapse `Σ_m|K| / |Σ_m K|` grows with
it: 9.2472, 10.5341, 10.0385. **More moduli pile onto each frequency and the
cancellation among them grows in step**, which is why the total ratio in (a) does
not move. The `e` basis's advantage is real and it is not accumulating.

### What this licenses, and what it does not

**It licenses this:** the `e`-basis divergence recorded in
`sift-limit-attack.md` §7e is not an artefact of where the summation over moduli
sits. That was named as an open escape route by `attack-tail-maximal.md` §7 and
by `TODO.md` item 3, and it is now closed by computation.

**It does not license calling this an independent confirmation.** By (T1) the
`(h,m)` basis is the `e` basis with one summation moved, so it agrees because it
must. The corpus's own two recent injuries were exactly this shape — a "second
independent instrument" that turned out to be the first in other coordinates, and
a variable that should have been `θ(x)` rather than `x`. **The correct statement
is: one specific alternative representation was named, it has now been computed,
and it is strictly worse.** Two bases are not all bases, and nothing here bears
on a representation nobody has written down.

---

## 5. THE PRICE CHECK — the brief's step 4

The test is simple and it is decisive rather than rhetorical: if the basis change
had smuggled the withdrawn `τ(m)` re-pricing back in, the `(h,m)` total would
have come out **cheaper**. It comes out **more expensive at every level, by
6.6170× at the least (`z = 13`) and 7.8932× at the most (`z = 17`)**.

**(a) The bookkeeping identity reproduces from the modulus side.**
`Σ_m n_m = N` exactly at all six levels tested, 852 through 35868 — the identity
`attack-tau-repricing.md` §2 (a) rests on, recomputed here from a different
direction.

**(b) The three-way nesting, which is the cleanest way to read the whole file.**
§F(c), all three at `s = 3.0`:

| `z` | `N` | `Ssat_hm` | `Ssat_e` | `N/Ssat_hm` | `Ssat_hm/Ssat_e` | `N/Ssat_e` |
|---|---|---|---|---|---|---|
| 13 | 852 | 1.2970e+2 | 1.9602e+1 | 6.57 | 6.6170 | **43.47** |
| 23 | 9636 | 1.6936e+3 | 2.4250e+2 | 5.69 | 6.9840 | 39.74 |
| 31 | 35868 | 7.1676e+3 | 9.5263e+2 | 5.00 | 7.5241 | 37.65 |
| 43 | 183084 | 4.9847e+4 | 7.1072e+3 | 3.67 | 7.0136 | **25.76** |

**The Fourier gain the corpus records as "23–44× and falling" is now split.** At
`z = 43` the 25.76× is a factor **3.67 from summing coherently inside a modulus**
and a factor **7.0136 from summing coherently across moduli**. The first is
falling; the second is flat. **All of the corpus's shrinking Fourier advantage
lives in the within-modulus half.** That is a fact about the instrument that
nothing in the corpus had isolated, and it is what a per-modulus price like
`τ(m)` is blind to by construction.

---

## 6. DRAFTED CORRECTIONS — I have edited nothing

**(C1) `research/qc/ledgers.js`, `ABSENCE_VERIFIED`, key `'TODO.md|not run'`.**
The entry's own closing clause says it "goes stale the moment anyone attaches the
weights". That has happened. The entry should be retired with a pointer to
`research/attack-hm-basis.js` and this report, not merely re-dated.

**(C2) `TODO.md` item 3, "Compute the `u_sup` ladder in the `(h,m)` basis".**
Done. Its premise, "`attack-tail-maximal.md` reading 18 shows the `e`-basis
divergence that closed `u_sup` is basis-dependent", is the part that needs
correcting rather than deleting: reading 18 compares **per-modulus term counts**,
and the total price in the `(h,m)` basis is **7.26× the `e` basis's, flat over
nine levels**, with the same per-added-prime factor to 0.7%.

**(C3) `research/history/staging/attack-tail-maximal.md` reading 21 and
`research/attack-tail-maximal.js` reading 12.** Both set "`2^{π(z)}` moduli" in
the `e` basis against "about `z^{2s}` moduli" in the `τ` basis and conclude the
`τ` basis is the more expensive of the two on modulus count below `z ≈ 200`.
`z^{2s}` is the cap on the **size** of `m`, not a count: every `m = [d₁,d₂]` here
is squarefree and `z`-smooth, so `m | P(z)` and the `(h,m)` modulus count is
capped by `2^{π(z)}` as well. Measured: 32, 64, 128, 244, 468, 828, 1528, 2536,
**3880** against `2^{π(z)}` = 32, 64, 128, 256, 512, 1024, 2048, 4096, **8192**,
a ratio falling 1.000 → **0.474**, while `z^{2s}` at `z = 43` is 6.32e+9. The
`(h,m)` basis has **fewer** moduli at every level, and the frequency count it
actually pays is 2.587 to 3.220× the `e` basis's, flat.

**(C4) The same two files' "no claim is made about the total here".** Superseded:
the total is `Ssat_hm` = 1.2970e+2 … 4.9847e+4 over `z = 13..43`, and the
`(h,m)` basis is the weaker of the pair by (T1).

**(C5) `research/history/staging/attack-tau-repricing.md` §1 table and §2 (a),
and `research/attack-tau-repricing.js` check (iv): "the per-modulus term count is
at most `3·τ(m)`".** True for **odd** `m` (measured maximum 3.0000 over odd `m`
at all six levels) and false for even `m`: it is **4.5000·τ(m)** at `m = 2` at
every level, and at `m = 2310` it reads 3.0000 at `z = 13`, 3.5625 at `z = 17`
and 19, then 4.5000 from `z = 23` on as the level truncation stops biting. The
reason is structural — an ordered pair `(d₁,d₂)` with `lcm = m` and `gcd | 2`
sends each odd prime of `m` to exactly one of `d₁, d₂`, but may send the prime 2
to `d₁`, to `d₂` **or to both** — so the ceiling is `4.5·τ(m)` at even `m`. Zero
moduli exceed it anywhere. What was checked in that file was the ceiling at
`m = P(z)` specifically; the general statement is what needs narrowing. **This
makes the `τ` price looser than that file assumed, which is the direction its own
verdict already runs.**

**(C6) `research/sift-limit-attack.md` §7e** could gain one sentence: the
`C^{π(z)}` law is basis-independent across the pair `(e, (h,m))` — the natural
basis pays a flat 7.26× more and grows at 2.1042 per added prime against 2.0889.
It should **not** gain the word "independently confirmed", for the reason in §4.

**(C7) `research/G2-STATE.md`** `u_sup` row and **`research/ZONE-POSTULATE.md`**
could record that the closure survives the change to the natural basis, with the
same caveat.

---

## 7. WHAT THIS FILE DOES NOT ESTABLISH

- **The `(h,m)` basis is not a second independent instrument.** §4, stated there
  at length.
- **Two bases are not all bases.** (T1) is about this pair.
- **`u_sup` is neither reopened nor re-closed here.** The closure rests on
  measurements this file does not repeat. What is removed is one named escape
  route, by computation.
- **The `u_sup` column stops at `z = 31` in both bases**, not at 43. `u_sat`
  carries it to 43.
- **`s = 3.0` throughout, one level.** No claim is made about how the ratio in §4
  moves with `s`.
- **`H_sup` off a geometric grid depends on the grid.** The published schedule is
  used so the `e` column reproduces exactly, and both bases share it. A finer
  grid returns a smaller and equally legal `H_sup` in either basis.
- **No literature channel was opened in this session**, and no `[ABSENT]` claim
  is made anywhere in this document.

---

## 8. DRAFT `CHANGELOG.md` ENTRY (for the adjudicator to apply)

> **2026-08-19 — the `u_sup` ladder computed in the `(h,m)` basis.**
> `research/attack-hm-basis.js`, report `history/staging/attack-hm-basis.md`.
>
> - **The absence recorded in `qc/ledgers.js` under `ABSENCE_VERIFIED`,
>   `'TODO.md|not run'`, is now false and should be retired.** The weights are
>   `K_h(m) = Σ_{q_i = m}(w_i/q_i) e(−h c_i/m)`; `Σ_m K_0(m) = M` to 7.7e-15 and
>   `Σ_{m : e|m} K_{a m/e}(m) = Θ_e(a)` to 3.12e-16 over 2309 frequencies.
> - **(T1): the two bases are NESTED, not rival.** `Ssup_hm(H) ≥ Ssup_e(H)`
>   frequency by frequency, one line of triangle inequality; 0 violations out of
>   2309, 30029 and 510509 checked frequencies.
> - **The gap is a flat factor.** `Ssat_hm/Ssat_e` = 6.6170 … 7.0136 over
>   `z = 13..43`, geometric mean 7.2599, log-log slope 0.0133.
> - **So the divergence is basis-independent across this pair.** Per added prime
>   2.0889 (`e`) against 2.1042 (`(h,m)`) on the common range; log-log slopes
>   4.9872/4.8678 all levels and 6.1967/6.1204 top five; `u_sup` rises at 5 of 5
>   steps in both, reading 2.8201 … 3.5062 in the `(h,m)` basis over `z = 13..31`;
>   the bounded family's asymptote is 5.4512 (`e`) against 5.4823 (`(h,m)`) on
>   matched levels, both above `β₂`.
> - **It is NOT a second instrument.** By (T1) it is the same instrument with one
>   summation moved outside an absolute value.
> - **`attack-tail-maximal.md` reading 21 corrected**: `z^{2s}` caps the size of
>   `m`, not the number of moduli. Realised `(h,m)` modulus counts are 32 … 3880
>   against `2^{π(z)}` = 32 … 8192, ratio falling to 0.474 at `z = 43`.
> - **`attack-tau-repricing.md`'s "at most `3·τ(m)`" narrowed**: true at odd `m`,
>   `4.5·τ(m)` at even `m` (attained at `m = 2` at every level), because the
>   prime 2 may go to both `d₁` and `d₂`. Looser, in the direction that file
>   already argues.
> - **The corpus's "23–44× and falling" Fourier gain is split**: at `z = 43` the
>   25.76× is 3.67 from coherence inside a modulus and 7.0136 from coherence
>   across moduli. The falling half is entirely the within-modulus one.
> - **Custody**: `Ssat` at ten levels to 5 figures, `H_sup` = 198, 683, 1833,
>   4278, 10384, 20586 all exact, `S_sat` per added prime 2.0516, bounded-family
>   asymptote 5.5649, `N/Ssat_e` 43.47 and 25.76, `n/τ(2310)` 3.0000 at `z = 13`
>   and 3.5625 at `z = 17` — every one reproduced before anything new was
>   computed.
