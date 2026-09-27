# Red team 2026-08-28: the five certificate-engine notes, adversarial pass

<!-- ledger
id: Q-redteam-0828-engine
status: ANSWERED
todo: 11 (retired), 8
question: Do the five 2026-08-28 certificate-engine notes survive an adversarial re-derivation, and does the one-class freshness factor correction hold before it reaches a live document?
verdict: The one-class factor holds and is stronger than either note states; four numbers are refuted (first s>=10.82 is x=263 not 239, first non-empty kappa=1 level is @37 not @53, rho*g_max is off by one gap, the @17 certified share and per-term constant carry the wrong convention) and one proof step needs the max-over-y form of BV; the cluster's shared verdict stands.
-->

*(2026-08-28. Adversarial verifier, branch `opus-try`. Brief: break, before
anything reaches a live document, `thm-mod30-tail.md`, `thm-capK-bv.md`,
`thm-buchstab-transfer-shallow.md`, `thm-sharp-sieve-range.md` and
`comb-discrepancy-tight.md`. Method: refuted-until-rederived, per
`redteam-0820-math.md` §0. Every re-derivation lives in this pass's own
producer, `research/history/staging/redteam-0828-engine.js`, which shares no
code with any of the five target scripts and is written from the definitions in
`paper/staircase-note.md` §1/§2/§4/§7 and
`research/natal-cap-28-analytic-certificate.js` RESULT 1. This file and that
script are the pass's only writes. No existing file was edited. No git command
was run. `research/qc.js` was not run. Under the house publication moratorium.)*

---

## 0. Scoreboard

**The single most load-bearing correction is not on the one-class factor, which
survives.** It is that **`thm-capK-bv.md` §0 and its ledger verdict give the
wrong level for the fundamental lemma's own threshold.** §0 says "the first
primorial level at which `s` clears 10.82 is `x = 239`, where `W ~ 10^96`". The
level at which `s` clears 10.82 is **`x = 263`** (`W ~ 10^105.6`); `s(239) =
10.0936`, `s(257) = 10.7075`, `s(263) = 10.9132`. The note's own §4 sentence,
"First `s >= 10` at `x = 239`", is right; §0 restates it against the wrong
threshold, and `research/QUESTIONS.md` now carries the wrong number through the
ledger verdict line ("first at `x = 239`"). `thm-sharp-sieve-range.md` inherits
it in §0's summary table and in §5. Corrected sentence in §3.2. The direction is
against the notes: emptiness is worse, not better, so the cluster's verdict is
unaffected.

**The one-class factor survives, twice, and is stronger than either note says.**
Independent recount reproduces both exact-count tables digit for digit, and the
proof needs only `P^-(m) >= q > q_i`, not `m` prime, so the correction holds at
every scour prime and not only in the prime regime. It needs one scope clause
before it enters a live document, or it will read as contradicting
`thm-buchstab-transfer-shallow.md`'s `kappa = 2`. §1.

| # | claim | verdict |
|---|---|---|
| 1a | one class per freshness prime, `PROD(1 - 1/(q_i - 1))`; survey's `PROD(1 - 2/(q_i - 1))` refuted | **CONFIRMED and strengthened** (§1.1, §1.2) |
| 1b | `GLOSSARY.md` "the two forbidden freshness residues" | **WEAKENED**: wrong as a dimension count, sound as a cap (§1.3) |
| 1c | `staircase-note.md` §7's two conditions per `q'` | **CONFIRMED as a definition**, redundant not wrong (§1.3) |
| 1d | `bv-import-survey.md` §3.2 "dimension 2 in the range `(x, q_K]`" | **WEAKENED** for `q_i < q` (§1.3) |
| 2a | S1(a) classification, hypotheses, and the injection cited in `staircase-note` §2/§4 | **CONFIRMED at source and exhaustively** (§2.1) |
| 2b | S1(b) `cap30 >= fresh`, and D2 (survey's loose form is not below `cap1`) | **CONFIRMED**, 5 of 29 and 16 of 105 (§2.2) |
| 2c | S1(c) constant `(ln 2)/2`, factor exactly 4 | **CONFIRMED**, re-derived and re-measured (§2.3) |
| 2d | D3, the third class, `(3/4) ln 2`, tail factor `8/3` | **CONFIRMED** (§2.4) |
| 2e | D4/D5, PNT-in-APs at fixed modulus 30; `M << (ln W)^K`; SW with `A = K + 1` | **CONFIRMED** (§2.5) |
| 3a | `K_dim = 1.2000`, `s >= 10.82 / 11.52 / 15.43` | **CONFIRMED and strengthened** to `z1 <= 2e8` (§3.1) |
| 3b | "the first primorial level at which `s` clears 10.82 is `x = 239`" | **REFUTED**: it is `x = 263` (§3.2) |
| 3c | Step 3, BV handles the `q`-dependent excluded class by `max_a` | **CONFIRMED**; but the `pi(q-1)` term needs BV's `max_{y<=T}` form: **WEAKENED** (§3.3) |
| 3d | Step 2's `=` for a lemma that states two inequalities; §4's `D = T^{1/2}` against the proof's `T^{1/3}`; `z = x` against Step 2's `z = q_K + 1` | **WEAKENED**, all three wording, none moves a verdict (§3.4) |
| 4a | three-object separation (`B` dim 1, survey's pair-Buchstab dim 2, certificate's two-class two-depth) | **CONFIRMED** (§4.1) |
| 4b | `(1 - 1/p)(1 - 1/(p-1)) = 1 - 2/p` | **CONFIRMED**, exact identity (§4.1) |
| 4c | `K = 7/5`, `s >= 22.06 / 23.67 / 25.97`, `s_head` table | **CONFIRMED and strengthened** to `z1 <= 2e8` (§4.2) |
| 4d | band empty until level 131 (`delta = 0.5`), 151 (`delta = 0.01`), coverage 3.24/6.22/7.34/8.50% | **CONFIRMED** exactly (§4.3) |
| 4e | the two `s` definitions (`z = q` and `z = q_K`) stated and not conflated | **CONFIRMED** in all three notes (§4.4) |
| 5a | DH Thm 9.1 carries no written constant | **CONFIRMED** against the repo's page record (§5.1) |
| 5b | bare-shape 1.05/1.66/4.32 (`kappa=1`), 3.66/4.82/9.22 (`kappa=2`); peaks 8.66/19.49; crossings 2.1e11/8.8e19 | **CONFIRMED** (§5.2) |
| 5c | `V*F1 = 1.19001 > 1` at @29 and the whole @13..@29 row | **CONFIRMED** (§5.3) |
| 5d | `f2(4.7088) = 0.4056`, `F2 = 1.4878`, `f2(4.5)`, `f2(5.0)` | **CONFIRMED** by an independent solve (§5.4) |
| 5e | "first non-empty `kappa = 1` level is @53" | **REFUTED**: it is **@37** (§5.5) |
| 5f | "first non-empty `kappa = 2` band is @23" | **CONFIRMED** (§5.5) |
| 5g | §0 finding 1 pairs `s >= 21.37` with level 131 | **WEAKENED**: 131 is the 22.06 figure; 21.37 gives 127 (§5.6) |
| 6a | Theorem A: sup over windows `= max G - min G`; `D_x` at @7..@23 | **CONFIRMED**, proof and every value (§6.1) |
| 6b | Theorem B: grouping by divisor returns `2*3^k` exactly | **CONFIRMED** (§6.2) |
| 6c | slack 28.99 @23; 53.64 @29 | **CONFIRMED** @23; @29 **NOT RE-DERIVED** (§6.2) |
| 6d | §3's `rho * g_max` lower bound (1.429 / 2.338 / ... / 7.699) | **WEAKENED**: off by one gap; correct values in §6.3 |
| 6e | §5's @17 row: 1 -> 4 certified primes, 9.69% -> 28.14%, per-term constant 17.4 | **CONFIRMED structurally**, two label corrections (§6.4) |
| 7 | output custody of the five producers | **CONFIRMED as each note declares** (§7) |

**The cluster's shared verdict, "theorems with empty computable range", stands.**
Two of its four thresholds move. The `kappa = 1` fundamental-lemma threshold moves
*away* from reach (239 to 263). The `kappa = 1` sharp-sieve limit statement moves
*toward* reach (53 to 37), which strengthens `thm-sharp-sieve-range`'s confirming
half without touching its reading (F), since DH Theorem 9.1's `O`-constant is
still unwritten and its bare shape still exceeds 1 at every level in the tables.

---

## 1. The one-class freshness factor: the claim that reaches live documents

### 1.1 Re-derived from the definitions

From `paper/staircase-note.md` §7, verbatim: the depth-`K` freshness conditions
are imposed "for each of the first `K` entries `q'` of `M` with `q' < q`", and
`#A_K` counts cofactors `2 <= m <= floor((W-1)/q)` **with `P^-(m) >= q`**
satisfying them. Take such an `m` and such a `q'`. Then `v = qm ≡ 0 (mod q')`
forces `q' | q` or `q' | m`. The first fails because `q'` and `q` are distinct
primes. The second fails because `P^-(m) >= q > q'`. So the condition
`v !≡ 0 (mod q')` excludes no residue class of `m` at all, and only
`v !≡ -2 (mod q')` (A-side) bites, one class, a unit since `q' ∤ 2q`. The
surviving share is `(q' - 2)/(q' - 1)`, that is `1 - 1/(q' - 1)`.

**This is stronger than either note states.** `thm-mod30-tail.md` §5(i) and
`thm-capK-bv.md` §1 both run the argument through "`m` is prime with
`m >= q > q_i`", which is available only in the prime regime `q^3 > W + 1`. The
argument above uses only `P^-(m) >= q > q_i`, which is part of the definition of
`#A_K` at **every** scour prime. So the correction holds in the head and the
middle as well, not only in the tail. `thm-buchstab-transfer-shallow.md` §1 has
this right ("`P^-(m) >= q > q_i` is impossible") and the other two do not.

The same conclusion is what `natal-cap-28-analytic-certificate.js` already
codes: line 138-141, `F = 1/(q-1)` and `P[j+1] = P[j]*(1 - F[j])`, and
`dP = 0.25 * mids.reduce((a,p) => a*(1 - 1/(p-1)), 1)`. Its line 184 does test
`t === 0` as well as `t === Q[j]-2`, guarded by `if(lpf[m] < q) continue`, so the
test is present and never fires. The code is right and the survey is the outlier,
exactly as `thm-mod30-tail.md` D1 says.

### 1.2 Re-measured, independently

`redteam-0828-engine.js` SEC A counts, from scratch, the A-side admissible prime
cofactors over the prime-regime scour primes with the mod-30 classes and the
depth-`K` freshness conditions, and compares against both candidate density
factors applied to the exact `K = 0` base. Tail primes 105 at @17 and 396 at @19,
base 5336 and 90501, all four figures matching `thm-capK-bv.md` §5's
independently written cross-check.

| level | K | exact | `PROD(1-1/(q'-1))` | ratio | `PROD(1-2/(q'-1))` | ratio |
|---|---|---|---|---|---|---|
| @17 | 1 | 5 037 | 5 039.56 | 0.99949 | 4 743.11 | 1.06196 |
| @17 | 2 | 4 802 | 4 810.48 | 0.99824 | 4 311.92 | 1.11366 |
| @17 | 4 | 4 474 | 4 484.06 | 0.99776 | 3 737.00 | 1.19722 |
| @17 | 8 | 4 043 | 4 059.11 | 0.99603 | 3 054.42 | 1.32366 |
| @19 | 1 | 86 390 | 86 387.32 | 1.00003 | 82 273.64 | 1.05003 |
| @19 | 2 | 83 313 | 83 302.06 | 1.00013 | 76 396.95 | 1.09053 |
| @19 | 4 | 78 294 | 78 288.51 | 1.00007 | 67 342.49 | 1.16262 |
| @19 | 8 | 71 478 | 71 492.21 | 0.99980 | 56 038.31 | 1.27552 |

Every entry reproduces `thm-mod30-tail.md` §6's D1 table to the digit it prints.
The survey's factor is off by 5.00% to 32.37%, worsening with `K`, exactly as
claimed. **CONFIRMED.**

### 1.3 Wrong as a dimension count, sound as a cap: the corrected sentences

The distinction the brief asks for is real and it is the whole scope question.

- **`paper/staircase-note.md` §7 is a definition, and it is correct.** The set it
  defines with two conditions equals the set defined with one, because the second
  is void on the domain `P^-(m) >= q`. No `cap_K` value moves. It is redundant,
  not wrong. Corrected sentence, one added parenthetical:
  > "A-side: `v !≡ 0` and `v !≡ -2 (mod q')` [else `q'` strikes `r`]. (The first
  > is void: `q' ≠ q` and `P^-(m) >= q > q'`, so only `v !≡ -2` excludes a class,
  > and the per-prime surviving share is `1 - 1/(q'-1)`.)"

- **`research/GLOSSARY.md`:354 is a dimension count, and it is wrong.** It reads
  "cap_K adds the two forbidden freshness residues modulo the first K scour
  primes". Corrected sentence:
  > "cap_K adds, for each of the first K scour primes `q' < q`, the **one**
  > forbidden freshness residue that can fire (`v !≡ -2` on the A side, `v !≡ +2`
  > on the B side); the companion `v !≡ 0 (mod q')` is void under `P^-(m) >= q`,
  > so the density factor is `PROD(1 - 1/(q'-1))`, one class per prime. In a
  > formulation that *sifts* for `P^-(m) >= q` rather than assuming it, `m !≡ 0`
  > is a real second class and the dimension is 2."

  The second sentence is not optional. Without it the glossary line will read as
  contradicting `thm-buchstab-transfer-shallow.md` §2(c), whose `kappa = 2` table
  is correct in its own formulation, and the two notes will look like they
  disagree when they do not.

- **`research/bv-import-survey.md` §3.1**, the density factor
  `PROD(1 - 2/(q_i - 1))`: **REFUTED**, measured, §1.2. Replace with
  `PROD(1 - 1/(q_i - 1))`.

- **`research/bv-import-survey.md` §3.2**, "two excluded classes per large
  freshness prime, dimension 2 in the range `(x, q_K]`": **WEAKENED**. For
  `q_i < q` the dimension is 1 on the sequence of `q`-rough cofactors. It is 2
  only if the roughness itself is being sifted rather than assumed, or if
  `q_i > q`, and in the latter case `v ≡ 0 (mod q_i)` selects the single value
  `m = q_i`, not a class. `thm-capK-bv.md` §7 already says this and correctly
  marks it NOT AUDITED; that flag is right and this pass does not lift it.

---

## 2. `thm-mod30-tail.md`

### 2.1 S1(a), and the injection it cites

`staircase-note.md` §2 Lemma 1 says what the note says it says: the A/B
dichotomy, the ranges `2 <= m <= floor((W±1)/q)`, `P^-(m) >= q`, and `m >= q`,
all four in the printed statement. §4 Theorem 3(i) says what the note says it
says: under `q^3 > W+1` one has `t <= (W+1)/q < q^2`, a composite `m` with
`P^-(m) >= q` satisfies `m >= q^2 > t`, hence `m` is prime, and the printed text
adds "The structural statement is Lemma 1 with `m` prime". **CONFIRMED at
source.**

SEC B marches `N_x` from the definition, finds each member's smallest scour
striker, and checks every non-self fresh victim of every prime-regime scour
prime: `q | v`, `v/q` prime, `v/q >= q`, and `v mod 30` in `{11,17}` on the A
side and `{13,19}` on the B side. Census asserted against `N = 2*PROD(p-2)`.

| level | census `N` | prime-regime victims | violations | tail primes |
|---|---|---|---|---|
| @13 | 990 | 312 | **0** | 29 |
| @17 | 14 850 | 3 888 | **0** | 105 |

Both victim counts and both tail-prime counts match the note's 312 and 3 888,
29 and 105. **CONFIRMED.**

### 2.2 S1(b) and D2

`cap30` in the sharp form is asserted against `fresh(q)` at every tail prime by
`assert`, so a failure aborts. It passes at all 29 and all 105. `Sum cap1` over
the tail comes out **2 720** at @13 and **42 895** at @17, matching
`staircase-note.md` §6 digit for digit, computed here from Theorem 3(i)'s own
`pi(A) + pi(B) - 2*pi(q-1) + s(q)`. Tail `fresh/cap1` comes out 0.11654 and
0.09097, matching the note's 0.117 and 0.091.

D2, the survey's loose form (the `pi(q-1;30,.)` terms dropped) exceeding `cap1`:
**5 of 29** at @13 and **16 of 105** at @17, matching the note exactly.
**CONFIRMED.**

### 2.3 S1(c)

The measured cap ratios reproduce: `Sum cap30(sharp) / Sum cap1` = **0.25699**
at @13 and **0.25138** at @17 against the note's 0.2570 and 0.2514; the loose
form gives **0.37390** and **0.33824** against 0.3739 and 0.3382.

The analytic step re-derived: each of the four class counts contributes
`Li(T)/8`, so the four contribute `(Li(A) + Li(B))/4` against Theorem 6's
`pi(A) + pi(B)`, a ratio of exactly `1/4`; and
`INT_{1/3}^{1/2} dθ/(θ(1-θ)) = [ln(θ/(1-θ))] = ln 2`, so the constant is
`2 ln 2 / 4 = (ln 2)/2`. **CONFIRMED.** One wording nit: the note writes the
Theorem 6 shape as "`2(pi(A)+pi(B))/2`", which is `pi(A)+pi(B)`; harmless, but it
reads as a typo.

### 2.4 D3

Over the full mod-30 twin census the slot classes are `r ≡ 11, 17, 29`, so 3 of
the 8 unit classes per side rather than 2. The tail factor is `1/(3/8) = 8/3`
and the constant is `2 ln 2 * 3/8 = (3/4) ln 2`. **CONFIRMED** arithmetically.
The hypothesis `r ∈ N_x` is required and is stated in S1's hypothesis block.

### 2.5 D4 and D5

- PNT in APs at the fixed modulus 30 is what S1 needs, and Siegel-Walfisz is
  strictly more. **CONFIRMED**: the modulus never grows, the classes `q^{-1}a`
  move but SW-type uniformity in the class at a fixed modulus is the standard
  statement.
- D5: `PROD_{7<=p<=P0} p` is a constant independent of `x`, so
  `M <<_{P0,K} q_K^K << (ln W)^K`. Siegel-Walfisz applies to moduli
  `M <= (log T)^A`, so any `A > K` serves, and `A = K + 1` is enough for large
  `T` since `M <= C(P0,K)(log T)^K <= (log T)^{K+1}` eventually. **CONFIRMED.**

---

## 3. `thm-capK-bv.md`

### 3.1 `K_dim`, and a stronger search than the note ran

`K_dim` is the sup over `z1 >= w >= 2` of
`PROD_{w<=p<z1}(1 - h(p))^{-1} / (ln z1 / ln w)` with `h(p) = 1/(p-1)` for
`p >= 7` and `0` below. SEC C reproduces **1.2000000000**, attained at
`w = 7, z1 = 7^+`, where the product is `(1 - 1/6)^{-1} = 6/5` and the log ratio
is 1. The note's search ran to `z1 <= 1e5`; this pass ran the binding base
`w = 7` out to `z1 <= 2e8` and the sup is still exactly `6/5` at `z1 = 7^+`. The
tail behaviour is the reason: `PROD_{7<=p<z}(p-1)/(p-2) / ln z` measures 0.5059
at `z = 2e8`, so the ratio tends to about `0.9844 < 1.2`. **CONFIRMED and
strengthened.** The note's own falsification row ("very likely complete, but
very likely is not a proof") can be tightened to a 2000-fold wider search plus
the tail limit; it is still not a proof.

Thresholds: `e^{9-s} * 1.2^10 <= δ` gives `s >= 10.82322` at `δ = 1`,
`11.51636` at `1/2`, `15.42839` at `1/100`. **CONFIRMED**, all three digits.

### 3.2 The `x = 239` claim: REFUTED

With `s = ln D / ln z`, `D = T^{1/2}`, worst tail case `T = sqrt(W)`, `z = x` at
`K = 0`, so `s = ln W / (4 ln x)`. SEC C reproduces the note's whole §4 table to
the digit it prints: 0.8075, 1.0049, 1.1597, 1.3659, 1.5327, 1.6772, 4.5756,
8.9058, 15.7128, 34.8128 at @11 through @1009. The crossings:

| threshold | first level | `s` there |
|---|---|---|
| `s >= 10` | `x = 239` | 10.0936 |
| `s >= 10.8232` (the actual factor-below-1 threshold) | **`x = 263`** | 10.9132 |
| `s >= 12` | `x = 283` | 12.0161 |

`s(241) = 10.3283`, `s(251) = 10.5023`, `s(257) = 10.7075`. So §4's two printed
sentences are both right, and §0's is not. Corrected sentence for
`thm-capK-bv.md` §0, and for its ledger `verdict:` line, and for
`research/QUESTIONS.md`'s two rows for `Q-capK-bv`:

> "The first primorial level at which `s` clears the lemma's own
> factor-below-1 threshold 10.82 is **`x = 263`** (`W ~ 10^105.6`); `s` first
> reaches the lemma's floor `9κ + 1 = 10` at `x = 239`."

`thm-sharp-sieve-range.md` §0's summary table row "κ = 1 (`thm-capK-bv`) first
non-empty level: `x = 239` `[CITED]`", its §0 finding 1, and its §5 table row
"@239 | ... | EMPTY (FL crosses)" all inherit the error and take the same
correction.

### 3.3 Step 3, the BV step: CONFIRMED with one WEAKENED clause

The `max_a` answer to the moving excluded class `ω_p = -2q^{-1} (mod p)` is
correct and is the right answer: BV bounds `max_{(a,k)=1}`, so a class that
moves with `q` costs nothing, and the moduli `30d`, `d <= D` squarefree and
coprime to 30, are distinct and at most `30D`, so the sum over `d` is a sub-sum
of the BV sum at level `30D`. With `D = T^{1/3}` the level `30 T^{1/3}` is inside
`T^{1/2}/(ln T)^B` for large `T`. **CONFIRMED.**

**The weakened clause.** The remainder in Step 3 is
`r_d = E(T;30d,a_d) - E(q-1;30d,a_d) - φ(d)^{-1}[...]`, and the note calls "the
first two terms ... sub-sums of the Bombieri-Vinogradov sum at level `30D`". The
second term is evaluated at `q - 1`, not at `T`. Bombieri-Vinogradov stated at
its own endpoint `q - 1` permits level `(q-1)^{1/2}/(log)^B` only, and
`30 T^{1/3}` exceeds that on the whole tail: `q > W^{1/3}` and `T < W^{2/3}` give
`T^{1/3} < W^{2/9}` against `q^{1/2} > W^{1/6}`, and `2/9 > 1/6`. The repair is
one clause, because the standard form of the theorem carries an inner maximum
over the argument, and `q - 1 < T` holds under (H2). Corrected sentence:

> "the first two terms are sub-sums of the Bombieri-Vinogradov sum **in its
> `max_{y<=T}` form** at level `30D <= T^{1/2}/(ln T)^B`; the `pi(q-1)` term is
> covered by that inner maximum, since `q <= T/2` by (H2), and is not a
> BV statement at the endpoint `q-1`, where the level `30T^{1/3}` would be
> inadmissible."

Rung after the repair: unchanged, PROVEN at short-note grade. The note's own
falsification table already flags this step as the one with no second reader and
the `max_a` clause as quoted rather than read at a page; that flag stands, and
this pass adds the `max_y` requirement to it.

### 3.4 Three wording defects, none moving a verdict

- Step 2 writes `Sum_{d|P} λ^±_d h(d) = (1 ± e^{9κ-s} K_dim^{10}) V` with an
  equals sign. FI Lemma 6.8(iii), as recorded verbatim at
  `research/dhr-verification.md` §4.1 (from arXiv:2301.07679 p. 33), states two
  one-sided inequalities. The sandwich in (ii) makes the inequalities sufficient,
  so the proof goes through; the display should read `<=` and `>=`.
- §4's `s` table is computed at `D = T^{1/2}`, which BV does not permit; the
  proof's own choice is `D = T^{1/3}`, at which every tabled `s` is `2/3` of the
  printed value. The direction is conservative (emptiness is worse under the
  proof's own `D`), but §4 should say which `D` it is tabling and why.
- Step 2 sets `z = q_K + 1` while §4's table is computed with `z = x` at `K = 0`
  (checked: `ln W / (4 ln 17) = 1.1597` matches the printed 1.16, while
  `ln W / (4 ln 18) = 1.1368` does not). The note should state `z = x` at `K = 0`
  where `thm-sharp-sieve-range.md` §1 states it for it.

---

## 4. `thm-buchstab-transfer-shallow.md`

### 4.1 The three-object separation, and the identity

`(1 - 1/p)(1 - 1/(p-1)) = ((p-1)/p)((p-2)/(p-1)) = (p-2)/p = 1 - 2/p`, exactly,
for every `p >= 3`. **CONFIRMED**, and it does what the note uses it for: the
engine's product `(N/W) PROD_{x<p<q}(1-1/p) PROD_{x<p<=y_K}(1-1/(p-1))` is the
density of a sieve with two excluded classes below `y_K` and one above, so the
`κ = 2 -> κ = 1` structure is already inside the engine's arithmetic and only
`B` is imported.

The three-object separation is sound and is the note's best content. The reason
the engine's `κ = 1` `B` and this note's `κ = 2` ensemble are both right is the
scope clause of §1.3 above: `capK-bv` sifts a sequence of primes, where
`m !≡ 0 (mod p)` is free, and this note sifts a sequence of integers, where it is
not. **CONFIRMED.**

### 4.2 `K = 7/5` and the thresholds

SEC D reproduces `K = 1.400000` at `w = 7, z1 = 7^+`, where
`(1 - 2/7)^{-1} = 7/5` and the squared log ratio is 1, and this pass extended the
binding base to `z1 <= 2e8` with the sup unchanged; the tail ratio
`PROD_{7<=p<z}(1-2/p)^{-1}/(ln z)^2 * (ln 7)^2` measures 0.9098 at `z = 2e8`, so
the sup does not migrate to infinity. **CONFIRMED and strengthened.**

`s >= 9κ + 10 ln(7/5) + ln(1/δ) = 18 + 3.36472 + ln(1/δ)` gives
**22.05787** at `δ = 0.5`, **23.66731** at `0.1`, **25.96989** at `0.01`, and
**21.36472** at `δ = 1`. All four reproduce. `s_head = ln(W/q0)/ln q0`
reproduces at every level the note tables: 2.63896, 3.46372, 4.13080, 4.70876,
5.57847, 10.01903, 17.14219 at @13, @17, @19, @23, @29, @53, @97.
**CONFIRMED.**

### 4.3 The band

Least level with `ln q0 <= ln W/(1 + s*)`: **`x = 131`** at `s* = 22.06`,
**`x = 151`** at `s* = 25.97`, `x = 23` at `s* = β2`, `x = 7` at `s* = 1`.
Coverage of `[ln x, ln sqrt(W)]`: **0.00%** at @97, 0.35% at @131, **3.24%**
at @199, **6.22%** at @499, **7.34%** at @1009, **8.50%** at @10007. Every
figure the note prints. **CONFIRMED.**

### 4.4 The two `s` conventions

`thm-buchstab-transfer-shallow.md` §3.1 states `z = q` and `D = T^{1-ε}`;
`thm-capK-bv.md` §3 Step 2 states `z = q_K + 1` and `D = T^{1/3}`;
`thm-sharp-sieve-range.md` §0 finding 5 and §1 state the difference explicitly
and its §3 and §4 keep the two columns in separate tables.
**CONFIRMED: stated in all three, conflated in none.** The one residue is §3.4's
third bullet, `z = q_K + 1` against the table's `z = x`, which is internal to
`capK-bv` and worth 0.02 on `s`.

---

## 5. `thm-sharp-sieve-range.md`

### 5.1 DH Theorem 9.1 carries no written constant

`research/history/staging/lit-pdf-halberstam-richert.md` §6.1 transcribes p. 104
from an `attestation/` photograph. The note's §2 quotation matches that record
word for word, including the hypothesis "Suppose that κ >= 1 and that 2κ is an
integer", the factor 2, the weight `4^{ν(m)}`, the range `m|P(z), m<y`, the
equation numbers (9.9)/(9.10), and the closing clause "the constants implied by
the O-notation depend at most on κ and A". No constant is written.
**CONFIRMED at the repo's page record.** The book itself was not opened in this
pass and the record's own custody (a photograph transcribed 2026-08-14) is what
carries it.

### 5.2 The bare shape

`(log log y)^2 / (log y)^{1/(2κ+2)}`, taking the unwritten constant to be 1:

| | @17 | @23 | @97 | peak | first below 1 |
|---|---|---|---|---|---|
| κ = 1, `log y = ln W/4` | 1.0511 | 1.6644 | 4.3242 | 8.6615 at `log y = e^8` | `log y = 2.149e11` |
| κ = 2, `log y = ln(W/q0)` | 3.6621 | 4.8184 | 9.2207 | 19.4883 at `log y = e^12` | `log y = 8.80e19` |

Every figure the note prints, including the peak location `log y = e^{4κ+4}`,
which is the stationary point of the shape. **CONFIRMED.**

### 5.3 `V * F1 > 1`

`V(z) = PROD_{7<=p<=x}(1 - 1/(p-1))` and `F1(s) = 2e^γ/s` on `[1,3]`:
`V*F1` = 2.43706 / 1.97968 / 1.58746 / 1.35043 / **1.19001** at @13 / @17 / @19 /
@23 / @29, against the trivial `S <= X`. **CONFIRMED**, and the brief's own
example is refuted in the brief's own terms: `F1(1.6772) = 2.12386`, but the
bound is `X V F1`, and `V(29) = 0.56030`.

### 5.4 `f2(4.709) = 0.4056`

Re-derived without the repo's solver. From Booker-Browning Theorem 3.1 as quoted
verbatim at `research/dhr-verification.md` §1.1, `σ_2(u) = c u^2` on `(0,2]` with
`c = 1/(2(2e^γ)^2)`, and on `(2,4]` the defining ODE integrates in closed form to
`σ_2(u) = c u^2 (1 - 2 I(u))`, `I(u) = ln u + 4/u - 2/u^2 - (ln 2 + 3/2)`; above
4 it is one quadrature. Then `F_2 = 1/σ_2` on `(0,α2]`, and
`u^2 f_2(u) = 2 INT_{β2}^u t F_2(t-1) dt` on `(β2, α2]`.

| quantity | this pass | note / cited artifact |
|---|---|---|
| `F2(1)` | 25.37775 | 25.37775 |
| `F2(2)` | 6.34444 | 6.34444 |
| `F2(1.7829)` | 7.98361 | 7.98361 |
| `F2(2.317)` | 4.73619 | 4.73619 |
| `F2(4.7088)` | 1.48778 | 1.4878 |
| **`f2(4.7088)`** | **0.40559** | 0.405614 |
| `f2(4.5)` | 0.240279 | 0.240280 (`attack-beta2-04` OUTPUT §3c) |
| `f2(5.0)` | 0.578997 | 0.578997 (same) |
| naive `2(2e^γ/u)^2` at `u = 2.317` | 4.72717 | below the true `F2`, as §2 says |

**CONFIRMED**, including the note's §2 claim that `F2 = 1/σ2` exceeds the naive
formula above `u = 2`, and its bracket width `F2/f2 = 3.668` at @23.

### 5.5 "First non-empty κ = 1 level is @53": REFUTED

The note's §3 table samples @11, @13, @17, @19, @23, @29, then jumps to @53. The
five levels it skips are where the crossing happens. Sweeping every prime level
from @11 to @103 on the note's own conventions (`s = ln W/(4 ln x)`,
`V = PROD_{7<=p<=x}(1-1/(p-1))`, `F1 = 2e^γ/s` on `[1,3]`,
`f1 = 2e^γ ln(s-1)/s` on `[2,4]`):

| level | `s` | `V(z)` | `F1` | `V*F1` | `f1` | verdict on the note's own criterion |
|---|---|---|---|---|---|---|
| @29 | 1.6772 | 0.56030 | 2.12388 | 1.19001 | 0 | EMPTY, worse than trivial |
| @31 | 1.8946 | 0.54163 | 1.88014 | 1.01833 | 0 | EMPTY, worse than trivial |
| **@37** | **2.0518** | **0.52658** | **1.73612** | **0.91421** | **0.08765** | **BRACKETED** |
| @41 | 2.2451 | 0.51342 | 1.58665 | 0.81461 | 0.34778 | BRACKETED |
| @43 | 2.4666 | 0.50119 | 1.44413 | 0.72379 | 0.55306 | BRACKETED |
| @47 | 2.6597 | 0.49030 | 1.33933 | 0.65667 | 0.67851 | BRACKETED |
| @53 | 2.8292 | 0.48087 | 1.25908 | 0.60545 | 0.76031 | BRACKETED |

@31 is genuinely empty, by a hair (`V*F1 = 1.018`). @37 is bracketed on both
tests: the upper bound beats the trivial one and the lower bound is positive.
Corrected sentence for `thm-sharp-sieve-range.md` §0's table, §3's first reading,
§7's buys-item 1, and its confidence row:

> "First non-empty κ = 1 level: **@37** (`s = 2.0518`, `V*F1 = 0.914`,
> `f1 = 0.0877`), the first level above the `V*F1 < 1` crossing at @31 and above
> `f1`'s positivity threshold `s = 2`. Scope moves from `W ~ 10^105.6` (the
> fundamental lemma at `x = 263`) to `W ~ 10^12.9`."

The bracket at @37 is `F1/f1 = 19.8`, which is a wide bracket and not an
asymptotic; the note's @53 row remains the first *narrow* one at `1.656`. If §3's
intended criterion was "bracket narrower than some width" rather than
"non-empty", the note does not say so, and its own §5 verdict table uses
BRACKETED as the non-empty label at @53.

The `κ = 2` side needs no correction: `s_head` crosses `β2 = 4.26645` between
@19 (4.1308) and @23 (4.7088), which are consecutive prime levels, so **@23** is
right. **CONFIRMED.**

### 5.6 §0 finding 1's pairing

Finding 1 says the fundamental lemma's factor "crosses 1 at `s >= 10.82` (κ = 1)
and `s >= 21.37` (κ = 2), which the siblings locate at reachable levels
`x = 239` and `x = 131`". Two slips. `x = 239` is the `s >= 10` figure (§3.2
above). And level 131 is the sibling's `δ = 0.5` figure at `s* = 22.06`; at
`s* = 21.365` the least level with a non-empty band is **`x = 127`**.
**WEAKENED**, wording; the verdict does not move.

---

## 6. `comb-discrepancy-tight.md`

### 6.1 Theorem A

The proof is one line and it is right: `#(C_x ∩ [s,s+ℓ)) - ρℓ = G(s+ℓ) - G(s)`,
`G` is `W`-periodic because `G(0) = G(W) = 0`, so the sup of the absolute
difference over integer `s, ℓ` is `max G - min G`, attained by taking `s` at the
argmin and `s+ℓ` at the argmax (or the reverse), with `ℓ <= W`.

SEC F recomputes `D_x` by a single ascending pass over `[0,W)`, asserting the
census and `G(W) = 0`:

| level | k | `2*3^k` | **`D_x`** | `2*3^k / D_x` | `sup|G| / D_x` |
|---|---|---|---|---|---|
| @7 | 1 | 6 | **2.238095** | 2.6809 | 0.51064 |
| @11 | 2 | 18 | **4.194805** | 4.2910 | 0.50464 |
| @13 | 3 | 54 | **8.164835** | 6.6137 | 0.50202 |
| @17 | 4 | 162 | **13.102133** | 12.3644 | 0.50111 |
| @19 | 5 | 486 | **29.618855** | 16.4085 | 0.50044 |
| @23 | 6 | 1 458 | **50.295195** | **28.9889** | 0.50024 |

Every value matches the note's table, including the `28.99` slack at @23 and the
`sup|G|/D_x -> 1/2` regularity to four digits. @29 is outside this pass's compute
budget and the note's **53.64** is **NOT RE-DERIVED** here. **CONFIRMED at
@7..@23.**

### 6.2 Theorem B

`Sum_{d|M} 2^{ω(d)} = PROD_{p|M} (1 + 2) = 3^k`, so
`Sum_{d|M} 2^{ω(d)+1} = 2*3^k`: bounding each block's range by its point count
returns the standing lemma exactly. **CONFIRMED.** The bound
`D_x <= Sum_d range(A_d)` is the range of a signed sum bounded by the sum of the
ranges, which holds regardless of the signs. **CONFIRMED.**

### 6.3 §3's `rho * g_max`: WEAKENED, off by one gap

The note writes `D_x >= ρ * g_max` and prints 1.429 / 2.338 / 2.967 / 4.538 /
5.622 / 7.699 at @7..@23. The justification given is "a run of length `g` with no
comb member gives a window with count 0 against share `ρg`". The `g_max` used is
the **member-to-member gap**, and a window of that length contains one member,
not none. At @7 the comb is `{11, 17, 41, 71, 101, 107, 137, 167, 191, 197}`, the
maximal gap is 30 and the maximal empty run is 29.

The valid bound is `D_x >= ρ * (maximal empty run) = ρ * (g_max - 1)`:

| level | note prints | correct |
|---|---|---|
| @7 | 1.429 | **1.381** |
| @11 | 2.338 | **2.299** |
| @13 | 2.967 | **2.934** |
| @17 | 4.538 | **4.509** |
| @19 | 5.622 | **5.596** |
| @23 | 7.699 | **7.676** |

The alternative reading of the same window, one member against share `ρ g_max`,
gives `|1 - 1.429| = 0.429` at @7, which is weaker still. The printed inequality
happens to hold numerically at every level, because the overstatement is one `ρ`
and the slack is large, so no downstream number moves; the derivation and the
percentages do. "The maximal gap explains 64% of `D_x` at @7" becomes **61.7%**.
The note's verdict, that this avenue is dominated, is unchanged.

### 6.4 §5's @17 row

SEC F reproduces the engine's certification at @17 from
`natal-cap-28-analytic-certificate.js` RESULT 1's own test, with exact `cap2`
counts and with sharp per-dilation ranges computed by walking the dilated comb
`{m : q d m mod W ∈ N_x}` over a full period:

| | this pass | note |
|---|---|---|
| `Sum cap2` at @17 | 16 135 | 16 135 (`staircase-note` Thm 8) |
| certified primes, old | 1 (`q = 19`) | 1 |
| share, old | 9.693% | 9.69% |
| certified primes, new | **4** (`q = 19, 23, 29, 31`) | **4** |
| share, new | **28.212%** | 28.14% |
| walk stopped on | a genuine failure at `q = 37` | a genuine failure |
| max single-dilation range used | **18.369** (at `q = 31`) | 17.4 |

Per-prime detail: `cap2 = 1564 / 1227 / 926 / 835` at `q = 19 / 23 / 29 / 31`
against `main = 1564.13 / 1219.56 / 923.23 / 832.86`; new error terms
32.34 / 73.64 / 117.01 / 249.37 against the half-main tests
781.57 / 609.78 / 461.62 / 416.43; and 536.14 against 337.26 at `q = 37`, which
is the failure. **CONFIRMED structurally.** Two label corrections:

- **The "share of `Sum cap2`" column is computed on main-term mass, not on `cap2`
  mass.** `comb-discrepancy-tight.js` PART 5 accumulates `cap = main + s` with
  `main = (A+B)*NW*Pj`, which is the analytic main term, not the exact `cap2`.
  On the exact `cap2` mass the new share at @17 is **28.21%**, not 28.14%. The
  old column is unaffected to two digits (9.693% either way), which is why the
  custody assert against cap-28's 9.69% passes and hides the difference.
  Corrected column header: "share of `Sum cap2`, main-term mass".
- **"per-term constant, max over used dilations" is the maximum over certified
  primes of the *mean* per-dilation constant, not the maximum per-dilation
  constant.** The producer computes `errNew/2^{j+1} - 1`, an average over the
  `2^{j+1}` terms. At @17 that maximum is 17.41, attained at `q = 23`; the
  maximum single dilation range is 18.369, at `q = 31`. Both are far below
  `2*3^4 = 162` and the reading is unchanged. Corrected column header:
  "mean per-term constant, max over certified primes".

Neither correction moves the note's §5 reading: the certified head roughly
quadruples in count at @17 and lands near 28%, not past 50%.

### 6.5 One item the note flags and this pass confirms

`certificate-engine.md`'s status table cell, "every Legendre term is off its
share by at most `2*3^k`": each term is off by less than 1 and the sum of the
`2*3^k` terms is off by at most `2*3^k`. **CONFIRMED as a defect**, wording, one
cell.

---

## 7. Output custody

`node research/qc/embed.js --check` on each of the five producers:

| producer | result |
|---|---|
| `thm-mod30-tail.js` | code-sha256, out-sha256 and body all **match** |
| `thm-capK-bv.js` | code-sha256, out-sha256 and body all **match** |
| `thm-buchstab-transfer-shallow.js` | **no OUTPUT banner**, outside output custody |
| `thm-sharp-sieve-range.js` | **no OUTPUT banner**, outside output custody |
| `comb-discrepancy-tight.js` | **no OUTPUT banner**, outside output custody |

The last three are exactly as their notes declare (each states SCRATCHPAD-GRADE
and "not embedded, not qc-gated" in its header), so this is a confirmation and
not a defect. It does mean that **no figure from those three may be quoted
outside its own note** until it is re-derived inside an embedded producer under
`research/`, which is what each note already says. The one hash a note publishes,
`thm-sharp-sieve-range.md`'s code-sha256
`92a22c21cf1bca1eb4b112f0929bdc3a76af10ee9c782be228f2692fac9e41e8`, matches the
file. This pass's own producer carries no banner either and is SCRATCHPAD-GRADE
on the same terms.

---

## 8. Corrected sentences, collected

For the live layer, in load order.

1. `research/QUESTIONS.md` (`Q-capK-bv`, both rows) and `thm-capK-bv.md` §0 and
   its ledger `verdict:` line: "first at `x = 239`" becomes "the lemma's floor
   `9κ+1 = 10` is first reached at `x = 239`; the factor-below-1 threshold 10.82
   is first cleared at `x = 263`".
2. `research/GLOSSARY.md`:354, the full replacement in §1.3, including the
   sifted-versus-assumed clause.
3. `research/bv-import-survey.md` §3.1: `PROD(1 - 2/(q_i - 1))` becomes
   `PROD(1 - 1/(q_i - 1))`.
4. `research/bv-import-survey.md` §3.2: "dimension 2 in the range `(x, q_K]`"
   becomes "dimension 1 wherever `q_i < q`, on a sequence that already carries
   `P^-(m) >= q`".
5. `paper/staircase-note.md` §7: add the void-condition parenthetical of §1.3.
6. `thm-capK-bv.md` §3 Step 3: add "in its `max_{y<=T}` form" (§3.3).
7. `thm-sharp-sieve-range.md` §0 table, §3 reading 1, §7 buys-item 1: "@53"
   becomes "@37" (§5.5); §0 finding 1's "`x = 239` and `x = 131`" becomes
   "`x = 263` and `x = 131` at `δ = 0.5`, or `x = 127` at `δ = 1`".
8. `comb-discrepancy-tight.md` §3: `ρ * g_max` becomes `ρ * (g_max - 1)`, values
   in §6.3, and "64% of `D_x` at @7" becomes 61.7%.
9. `comb-discrepancy-tight.md` §5: both column headers, §6.4.
10. `certificate-engine.md` status table cell, §6.5.

Nothing in this list moves an exponent, opens a route, or bears on the twin
prime conjecture. Two of the ten are arithmetic errors in numbers that had
already reached `research/QUESTIONS.md`; the rest are labels and scope.

---

## 9. What would falsify this, and whether that check has run

| claim of this pass | what would falsify it | has the check run |
|---|---|---|
| the one-class factor, `PROD(1-1/(q_i-1))` | an admissible cofactor `m` with `P^-(m) >= q` and `q_i | qm` for some `q_i < q`, or the exact depth-`K` counts favouring the two-class predictor | **RUN**, independently: 8 exact counts at @17 and @19, `K ∈ {1,2,4,8}`, corrected factor within 0.40%, survey's factor 5.00% to 32.37% out. The proof is two lines and needs only `P^-(m) >= q > q_i` |
| the one-class factor's scope clause (dimension 2 when roughness is sifted) | a formulation in which `m !≡ 0 (mod p)` is simultaneously free and sifted | **NOT RUN as a check**; it is a definitional statement, and it is what reconciles `thm-capK-bv` with `thm-buchstab-transfer-shallow` |
| S1(a) at @13 and @17 | one prime-regime non-self fresh victim with composite cofactor, cofactor below `q`, or `v mod 30` outside its pair | **RUN**, exhaustive, 312 + 3 888 victims, **0** violations. NOT run at @11, @19, @23, @29 |
| `Sum cap1` = 2 720 and 42 895, ratios 0.2570 and 0.2514, D2's 5 and 16 | any of them differing from `staircase-note` §6 or from the note | **RUN**, all reproduce |
| `s` clears 10.82 first at `x = 263` | a different `(D, z, T)` convention than the note's own §4 table, which this pass reproduced to the digit at ten levels | **RUN**. The convention is pinned by matching all ten printed `s` values. Under the proof's own `D = T^{1/3}` the crossing is later still, not earlier |
| the BV `max_{y<=T}` requirement in Step 3 | a form of Bombieri-Vinogradov at endpoint `q-1` admitting level `30T^{1/3}` | **NOT RUN as a literature check.** No source was read at a page in this pass. The exponent arithmetic (`2/9 > 1/6`) is elementary and is in §3.3 |
| `K_dim = 1.2000` and `K = 7/5` are the true suprema | a `(w, z1)` pair outside `w <= p_800`, `z1 <= 2e8` with a larger ratio | **RUN to `z1 <= 2e8`** at the binding base and to `p_800` in `w`, plus the tail limits 0.984 and 0.910. Still not a proof; the sup at `z1 = 7^+` is elementary and the tail is measured |
| first non-empty `κ = 1` level is @37 | a different non-emptiness criterion than the note's own (`V*F1 < 1` and `f1 > 0`), or a different `V(z)` or `s` convention | **RUN** on the note's own conventions, every prime level @11..@103. The note's `V` and `s` columns reproduce exactly at the seven levels it prints, which pins the convention |
| `D_x` at @7..@23, and Theorem A | a window beating `max G - min G`, or a census mismatch | **RUN**, census and `G(W) = 0` asserted at all six levels; Theorem A's proof is one line and is checked above. @29's 53.64 **NOT RE-DERIVED** |
| `ρ * g_max` is off by one gap | a window of length `g_max` containing no comb member | **RUN**: the maximal empty run is `g_max - 1` at all six levels by direct pass, and the @7 comb is small enough to list |
| the @17 certificate row, 1 -> 4 primes | a different certification test than cap-28's `errC <= 0.5(main - s)`, or a per-dilation range below the sharp one | **RUN** with exact `cap2` counts and sharp full-period dilated ranges. The 0.07-point share gap and the 17.4-versus-18.37 gap are both traced to the producer's conventions, in §6.4 |
| the cluster's shared verdict, "empty computable range" | a finite-level statement at any reachable level from either instrument | **NOT RUN as a search.** DH Thm 9.1's constant is unwritten (page record), and the fundamental lemma's own crossing is at `x = 263` and level 131. Both remain limit statements |
| DH Thm 9.1's transcription | the book's p. 104 differing from `lit-pdf-halberstam-richert.md` §6.1 | **NOT RUN.** The book was not opened in this pass; the page record's photograph was read 2026-08-14 and is what carries it |
| `f2(4.7088) = 0.4056` | a solver error in either implementation | **RUN**, by a closed form on `(0,4]` plus one quadrature, sharing no code with `attack-beta2-04-loss-budget.js`; nine figures agree to 5 decimals or better |
