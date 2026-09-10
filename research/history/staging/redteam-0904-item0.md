<!-- ledger
id: Q-redteam-0904-item0
status: ANSWERED
todo: 0
question: Do the two HELD notes of 2026-09-04 on item 0, the second adversarial pass on the adverse floor's growth half and the L7 one-class-to-two-class transfer, survive an independent adversarial pass, and do the live-layer changes they propose survive verbatim?
verdict: Both notes SURVIVE at their own rungs and neither moves an exponent, but SIX of their proposed live-layer changes need rewording and two of their supporting derivations are wrong; every load-bearing number reproduces on independent code (18 of 18 A1A2 cells digit for digit, the LP maximum 8s/9 at 0 deviations of 16 with residual 4.441e-16, the crossing 2.399878284834 against 9beta2/16 at 1.097e-13, the fitted C = 1.1206e-4 and the s = 3.0 crossing 10^15.30, the onsets 4.390e5 / 1.111e6 / 1.860e6, ln(n1n2) = 7.4993e7, and the L7 CRT counts EQUAL at x = 7, 11, 13), so the truth-gap reading of REC is CONFIRMED and the growth half stays DERIVED and red-teamed twice, not proven; what does not survive is the scoping, the exit-window and the price wording: the proposed clause "at equal levels D1 = D2 = z^s" is NARROWER than the derivation supports, since over 1643 admissible upper-and-lower level splits the floor beats the decoupled window at every cell by at least 0.644444, so no level split escapes and the sibling rider "asymmetric levels give 8s1/9 + 8s2/9 with s1 + s2 pinned" is REFUTED as written (it holds only while both s_i <= 3); the record's z ~ 5.6e31 is u0-specific as well as s-specific (10^31.68 at u0 = 4.2165 against 10^35.36 at u0 = beta2, same s), so replacing it with a beta2-convention 10^15.30 mixes two conventions; the onset correction is right numerically and wrong in wording, since at the record's own s = 2.698721 the exact onset is 1.875e6, LATER than the quoted analytic 1.055e6, not earlier; the escape-(a) correction is right in substance but its "(A1A2)^2 / (2 n1n2)" is a LOWER bound on the split's contribution, and the two-sided version through lambda+(n) <= 2^omega(n) reads 10^{-3.004323e+7} against B ~ 10^{10.1}, still no contradiction; and on the L7 side the union-bound argument and the CRT count are CONFIRMED while the coupled vector-sieve price 2(1 + sqrt e) = 5.297442541400 is the FORCED-equal-level constant, the corpus's live figure being K_BF = 5.158064680330, reproduced here to twelve digits at (a, b) = (2.229949, 2.928115), and the sieve-on-holes is the vector sieve only after the Ford-Halberstam substitution step that sift-limit-attack.md 7b(1b) already owns; the "no third mechanism excluded" line is honest but incomplete, since weighted sieves with Chen switching are already priced and closed at sift-limit-attack.md 4.2; scope of death gains one row, L7's mechanism 2, which the growth note's own section 10 calls untouched while its sibling calls it dead; no exponent moved.
-->

# Adversarial pass on the two HELD item-0 notes of 2026-09-04

*(2026-09-04, staging, HELD under the publication moratorium. Adversarial only.
Targets: `redteam-0904-floor-growth-2.md` with its producer, and
`derive-0904-L7-transfer.md` with its producer. One new producer,
`research/history/staging/redteam-0904-item0.js`, embedded through
`qc/embed.js` and verified with `--check`; it shares no code with any producer
under review. The LP here is solved by an exact rational primal simplex with
Bland's rule over BigInt fractions, not by vertex enumeration and not by a
grid; the sieve, the box counts, the CRT walk and the vector-sieve constants
are all rebuilt. No existing file was edited and no git command beyond a
read-only status was run. Calibration per `CLAUDE.md`: PROVEN, VERIFIED
(exact exhaustive computation), MEASURED, DERIVED (a written argument not
adversarially checked), HEURISTIC, OPEN, REFUTED.)*

## 0. Verdict, disconfirming half first

**Nothing here moves an exponent, and nothing here raises a rung.** The growth
half is still a derivation that has survived attacks, and the attacks have now
been run in three adversarial passes rather than two. Three passes that failed
to break a derivation are three passes that failed to break a derivation.

**What is wrong in the two notes, before what is right.**

1. **The proposed `REFUTED.md` scope clause is narrower than the derivation
   supports, and the rider offered for it is wrong.** `redteam-0904-floor-growth-2.md`
   §3 scope fact 1 asks the row to say "on the Rosser vector-sieve lattice at
   equal levels `D₁ = D₂ = z^s`", and defends the restriction with rider (i),
   "asymmetric levels do not escape: the exponent becomes `8s₁/9 + 8s₂/9` with
   `s₁ + s₂` pinned by the joint level `2s`". That rider is **REFUTED as
   written**: `8s₁/9 + 8s₂/9` is the capped maximum only while both `s_i ≤ 3`,
   and above 3 the capped maximum falls to `(2s+2)/3` and then to 4, so a
   lopsided split lowers the floor rather than leaving it unchanged. The
   conclusion survives on a different argument (§3.1), and the surviving
   argument is **wider** than the clause: over 1643 admissible upper-level and
   lower-level splits the floor beats the decoupled window at every cell, by at
   least **0.644444** (S2). "At equal levels" is therefore the wrong
   restriction to write into the row.
2. **The crossing figure the note replaces is `u₀`-specific as well as
   `s`-specific, and the replacement is quoted in a different convention.**
   The record's `z ≈ 5.6e31` is `10^31.75`; on an independent fit the
   `s = 2.7` crossing is `10^31.68` at `u₀ = 4.2165` and `10^35.36` at
   `u₀ = β₂` (S3). So the record's figure sits in the `u₀ = 4.2165` cell, and
   the note's replacement `10^15.30` is a `u₀ = β₂` cell at a different `s`.
   Both parameters have to be fixed in the same sentence.
3. **The onset correction is right in its numbers and wrong in its wording.**
   The exact onsets reproduce (4.390e5, 1.111e6, 1.860e6 at s = 3.0, 2.8, 2.7,
   against the note's 4.42e5, 1.12e6, 1.86e6, S4), but at the record's own
   `s = 2.698721` the exact onset is **1.875e6**, which is **later** than the
   quoted analytic 1.055e6, not earlier. Writing "the exact onset is 4.42e5,
   not 1.055e6" makes the construction read as turning on 2.4× sooner when at
   the same `s` it turns on 1.78× later.
4. **The escape-(a) correction carries a mislabelled bound.**
   `(A₁A₂)²/(2n₁n₂)` is a **lower** bound on the planted split's contribution
   to `⟨R₁²⟩`, because `Ω ≥ A₁A₂`, so as written it cannot rule out a
   contradiction with Lemma V, only fail to exhibit one. The two-sided version
   is available and passes: with `λ⁺(n) ≤ 2^{ω(n)}` the split's contribution is
   at most `10^{−3.004323e+7}` against `B ≈ 10^{10.1}` (S5). The conclusion is
   unchanged; the label is not.
5. **On the L7 side, the vector-sieve price quoted is the retired one.**
   `2(1+√e) = 5.297442541400` is the constant that appears **only when
   `D⁻ = D⁺` is forced**; the corpus's live coupled figure is
   `K_BF = 5.158064680330`, and `sift-limit-attack.md` §4.5 correction (i)
   explicitly retires the break-even that the larger constant produces.
   Recomputed here from `F` and `f` with no code shared: the free-level optimum
   is **5.158064680330** at `(a, b) = (2.229949, 2.928115)`, twelve digits (S6).
   Both are above `β₂`, so the L7 conclusion is untouched.
6. **The scope of death is one row larger than the growth note says, and its
   own sibling says so.** `redteam-0904-floor-growth-2.md` §10 rules "L3–L10
   are different objects and are untouched"; `derive-0904-L7-transfer.md` §3,
   written the same day, rules that L7's mechanism 2 is **dead** if the growth
   half survives. The statement L7 survives as an open statement; one of its
   two known mechanisms does not.

**What is right.**

- **The truth-gap reading is CONFIRMED**, and by a step the note does not
  claim. `REC(s, u₀)` is stated about `R_H` (`attack-0829n-rml-proof.md` §3,
  read word for word), `R_H` is defined as `T − H·M` for this certificate
  (`rho-maximal-law.md` §1), and the one place the chain could have needed a
  hypothesis it lacks, the mean-square input at the cheapest legal point, does
  not need one: `0.63·β₂ = 2.688 > 1+√e = 2.6487`, so the **conjectural** Lemma
  V's range would fail there, but the chain uses the **proven** mean-square
  form, which `REFUTED.md` records as "a theorem with no hypothesis" (§2).
- **Every load-bearing number reproduces on independent code.** 18 of 18
  `A₁A₂` cells digit for digit including the step slopes; the LP maximum at 0
  deviations of 16 with largest residual 4.441e-16 and the optimal vertex
  printed as `(s/3, s/3, s/9, s/9)`; the corollary crossing at 1.097e-13 of
  `9β₂/16`; `C = 1.1206e-4` and the `s = 3.0` crossing `10^15.30`;
  `ln(n₁n₂) = 7.4993e7`; the L7 CRT counts EQUAL at x = 7, 11, 13 and
  `B(13) = 1.1000`.
- **The `s ≥ 7` emptiness is confirmed and is sharp at 7 itself**:
  `max(Σa + 3a₄) = 7` for every `s ≥ 5` and the exit condition is strict, so
  the four-prime family is empty **from `s = 7` inclusive** (S1).

**The ruling.** `redteam-0904-floor-growth-2.md`: **SURVIVES**, rung unchanged
at DERIVED and red-teamed twice on the growth half, with **four** of its
proposed live-layer changes needing rewording and **one** supporting rider
refuted. `derive-0904-L7-transfer.md`: **SURVIVES** as a PARTIAL, with **two**
of its clauses needing rewording and its central inference (vacuous on average,
hence not non-vacuous at every position) confirmed by exact enumeration.

## 1. What this pass ran, and what it did not

Ran: an exact rational simplex over the exit-chain polytope for both the `D⁺`
and the `D⁻` conditions and for chain lengths 2 to 24; a scan of upper-level
against lower-level splits; an independent byte sieve to 1e8 with exact box
counts, the `A₁A₂` table, the fitted constant and the crossing at two `u₀`; an
onset scan on a 0.2% log grid under a stated definition; the planted class's
`ln(n₁n₂)` with a two-sided bound on its contribution; the L7 CRT counts, the
union-bound certificate's exact period mean and its minimum over all 30030
positions; and the coupled vector-sieve constants from `F` and `f`.

Not run: anything about `E2` above the levels the sibling notes reached; any
derivation for a non-Rosser weight system; any recomputation of `Ω` itself
(the exact half is PROVEN and is not attacked here); any literature search.

## 2. Target 1, claim (a): the quantifier, certificate value or true remainder

**Grade: CONFIRMED.** The proof-gap reading is refuted and the chain has no
step where a certificate value must become a true remainder.

**The chain, written independently, every quantifier explicit.** Fix a prime
`z`, `W = P(z)`, `s > 1+√e`, `D = z^s`, and Rosser-Iwaniec `λ^±` of level `D`
for the two systems `{r ≡ 0 (p)}` and `{r ≡ −2 (p)}`, `p < z`. With
`n₁ = gcd(r, P)`, `n₂ = gcd(r+2, P)`:

    cc(r) = λ⁻(n₁)λ⁺(n₂) + λ⁺(n₁)λ⁻(n₂) − λ⁺(n₁)λ⁺(n₂)
    T(x)  = Σ_{x < n ≤ x+H} cc(n),  M = ⟨cc⟩,  R_H(x) = T(x) − H·M

`REC(s, u₀)` (`attack-0829n-rml-proof.md` §3, verbatim): **∃**ε>0 **∃**z₀
**∀** primes z ≥ z₀, with `H = ⌊z^{u₀}⌋`,
`sup_{x ∈ ℤ/W} |R_H(x)| ≤ z^{u₀/2−ε}·⟨R_H²⟩^{1/2}`.

| step | statement | quantifier | rung, and who owns it |
|---|---|---|---|
| A1 | `∃ r* ∈ ℤ/W` with `cc(r*) = −Ω(z,s) ≤ −A₁A₂` | ∃r*, for each z past the onset | E1–E3, PROVEN (exact half); the onset is S4 here |
| A2 | `cc(r′) ≤ 1` at every `r′`, hence `T(x) ≤ cc(r*) + H − 1` for every window containing `r*` | ∀x | E4, PROVEN, and it is the Brüdern-Fouvry pointwise inequality itself |
| A3 | at `x = r*−1`, `R_H(x) ≤ −Ω + H − 1 − H·M`, so `sup_x |R_H(x)| ≥ Ω − H + 1 + H·M` | the sup runs over the same `ℤ/W` REC ranges over | definition of `R_H`; uses `M > 0`, which holds strictly for `s > 1+√e` and is checked here as `2f − F = 0` exactly at `1+√e` (S2) |
| A4 | `⟨R_H²⟩ ≤ B·H`, `B ≤ 9A(z)²(E(z)−1) = O(ln⁸z)` | ∀H, ∀z, ∀s | PROVEN, and `REFUTED.md`'s Lemma V mean-square row records it as **a theorem with no hypothesis** |
| A5 | REC ⟹ `sup|R_H| ≤ z^{u₀/2−ε}(B·H)^{1/2} = z^{u₀−ε}·O(ln⁴z)` | ∀z ≥ z₀ | arithmetic |
| A6 | contradiction once `log_z Ω > u₀ − ε + o(1)` | ε and u₀ fixed before z | conditional on the growth half |

**Where a certificate value would have to become a true remainder: nowhere.**
`R_H` is the remainder of this certificate by its own definition, `T = H·M + R_H`,
and REC is a statement about `R_H`. The floor bounds `R_H` from below at a
position inside the sup's own index set. The suspicion in the brief would be
right if REC were about the true twin count in `(x, x+H]`; `rho-maximal-law.md`
§1 and `attack-0829n-rml-proof.md` §3 both state it about `R_H`.

**The one step that could have failed, and does not.** A4 is an **upper** bound
on the rms, and an upper bound is what a refutation of REC needs. The
conjectural Lemma V carries a range hypothesis `s ≥ (0.63+δ)u`, and at the
cheapest legal point `(s, u₀) → (1+√e, β₂)` that hypothesis **fails**:
`0.63·4.26645 = 2.6879 > 2.6487`. If the chain leaned on that form, the
"cheapest" point of `attack-0830-rec-cheapest.md` would be exactly the point
the chain could not reach. It does not lean on it: the mean-square form is the
one that is proven, and it is stated for every `H`, `z`, `s`. The reviewed note
does not make this argument; it is the strongest defence of its own §3 that the
material supports, and it is recorded here so a later pass does not re-open it.

**Riders the chain carries.** (i) A3 uses `M > 0`, which is strict only above
`1+√e`; at `1+√e` the main term vanishes to leading order (S2 prints
`2f − F = 0` there), so the legal band is open at its lower end for this reason
as well. (ii) The direction guard holds: the true rms sits below `√(B·H)`, and
a smaller true rms makes REC's allowance smaller and the contradiction easier.

## 3. Target 1, claim (b): the five proposed corrections

### 3.1 The scope clause. WEAKENED, and the rider under it REFUTED

Three separate things are being run together in the note's §3 scope fact 1 and
§12 row 3.

**(i) The row's four named statements are already scoped by their own
definitions.** `rho-maximal-law.md` §1 defines `ρ̃`, and hence `RML(α)`, `F1`,
`F2` and `R_H`, on "the Rosser-Iwaniec linear-sieve weights `λ±` **of level D**
for the two systems", one level for both. `attack-0829n-rml-proof.md` §3 states
REC on "the level-D vector-sieve lattice". So the `REFUTED.md` row is not
making an unscoped false claim about REC, F1, F2 or RML; it is making a claim a
reader cannot see the scope of without opening two other files. The addition is
**legibility, not correction**, and the note's §12 wording "current wording:
unscoped" overstates it.

**(ii) The rider offered for the clause is wrong.** Rider (i) says asymmetric
levels give `8s₁/9 + 8s₂/9` with `s₁ + s₂` pinned, "so the threshold is
unchanged". `8s_i/9` is the capped maximum only for `s_i ≤ 3`; at `s_i > 3` the
exact capped maximum is `(2s+2)/3`, then 4 (S1, 0 deviations of 16, residual
4.441e-16), both strictly below `8s_i/9`. So the sum is **not** a function of
`s₁ + s₂`, and a lopsided split gives a **smaller** floor. **REFUTED as a
derivation of the general claim**; it holds when both `s_i ≤ 3`, a hypothesis
it does not state and which is exactly what a lopsided split violates.

**(iii) The conclusion survives, on a wider argument.** Take the upper level
`a` and the lower level `b` free (this is the axis that actually matters, since
the floor's `−λ⁺λ⁺` term reads the upper level and the `A₁B₂` terms read both).
Two facts, both computed here (S2):

- Positivity of the vector sieve's main term is `2f(b) > F(a)`. Since
  `f(σ) < 1` for every `σ`, positivity **forces `a > e^γ = 1.781072`**,
  whatever the lower level.
- The floor exponent is `LP⁺(a) + max(LP⁺(a), LP⁻(b))`, because
  `Ω ≥ A₁A₂ + A₁B₂ + B₁A₂` and each of the three products is non-negative. The
  decoupled window exponent is `max(a, b)`. Over **1643** admissible `(a, b)`
  cells the floor exceeds the window at **every** cell, minimum margin
  **0.644444** at `(a, b) = (1.85, 4.00)` with four-prime chains, and by more
  with twelve-prime chains: **0 escapes either way**.

So the death is not confined to equal levels. Proposed wording for the row, in
place of the note's:

> ... on the **Rosser vector-sieve lattice**, at every admissible level split
> and not only at `D₁ = D₂` (checked over 1643 splits, minimum margin 0.64 of
> exponent); no other admissible weight system is derived.

**What is still not established, and the note is right to say so.** That no
sup-over-positions statement survives for a **different weight system**. The
`−λ⁺λ⁺` sign fact E2 is Rosser's, and nothing here or there derives an analogue
for Selberg's `Λ²`. That remains HEURISTIC.

**A second-order finding, adverse to REC.** Counting the `B`-terms with long
chains raises the equal-level floor above the note's `16s/9`: 5.2901 at
`s = 1+√e` and 5.9918 at `s = 3.0`, against `2 × cappedLP₄` of 4.7088 and
5.3333 (S2). The `D⁻` chain family has not been membership-checked the way the
`D⁺` family has, so this is an LP reading and not a construction; it is
recorded because it says the note's threshold is conservative, not optimistic.

### 3.2 The `z ≈ 5.6e31` correction. CONFIRMED in substance, REWORD required

The independent fit reproduces the note exactly: `C = 1.1206e-4` at `s = 3.0`
from the top measured level, crossing `10^15.30`; `10^25.01` at `s = 2.8`
(S3). The note's diagnosis that 5.6e31 is an `s = 2.698721` figure quoted
without its `s` is right.

**What the note misses.** The crossing moves with `u₀` as well, and the record's
figure is in a different `u₀` convention from the note's replacement. At
`s = 2.7`, the crossing is `10^35.36` at `u₀ = β₂` and `10^31.68` at
`u₀ = 4.2165` (S3), and the record's `5.6e31` is `10^31.75`, agreeing with the
second cell to 0.07 in the exponent. `u₀ = 4.2165` is the reduced-range
endpoint that `redteam-0830-floor-growth.md` R5 carries. So the sentence needs
both parameters, and comparing `10^15.30` (at `β₂`) against `5.6e31` (at
4.2165) compares two conventions.

Proposed wording: *the falsity's level is `s`- and `u₀`-dependent: at `u₀ = β₂`
it is `z ≈ 10^15.3` at `s = 3.0`, `10^25.0` at `s = 2.8` and `10^35.4` at
`s = 2.7`; the `5.6e31` on the record is the `s = 2.698721`, `u₀ = 4.2165`
cell.* The fitted-constant caveat the note gives in its §11 applies to all of
these and should travel with them.

### 3.3 The exact onset. CONFIRMED numerically, REFUTED as worded

Under an explicitly stated definition (each of the four boxes holds at least
two primes; with `d′_min` the product of the smallest prime in each box, at
least two primes `p* < min(box₄)` satisfy `d′_min·p*³ > D`; and `p₁ ≤ z`), the
onsets are **4.390e5** at `s = 3.0`, **1.111e6** at 2.8, **1.860e6** at 2.7 and
**1.875e6** at 2.698721, on a 0.2% log grid (S4). The note's 4.42e5, 1.12e6 and
1.86e6 reproduce to within the grid.

**The wording is the problem.** At the record's own `s = 2.698721` the analytic
figure 1.055e6 is **early by 1.78×**, not late: the construction turns on at
1.875e6 there. The note's §12 row "the exact onset is 4.42e5 at s = 3.0, not
1.055e6" replaces an `s = 2.6987` analytic figure with an `s = 3.0` exact one
and leaves a reader believing the construction is live 2.4× sooner at the level
the record is talking about. Proposed wording: *the literal construction is
empty below `z = 1.875e6` at `s = 2.698721` (the analytic window bound 1.055e6
is early by 1.78×); at `s = 3.0` the onset is 4.39e5.*

The note's underlying finding, that the analytic window `(4D^{1/27}, D^{1/9}/4)`
is neither necessary nor sufficient, is not re-tested here at the level of
individual `p*`; the onset numbers are consistent with it in both directions.

### 3.4 The `s ≥ 7` emptiness. CONFIRMED, and sharp at 7

`max(Σa + 3a₄)` over the four-prime polytope equals **7 for every `s ≥ 5`**,
attained at all ones, and the exit condition is strict, so the family is
**EMPTY from `s = 7` inclusive** and non-empty at `s = 6.9` (S1). The note's
"once `s ≥ 7`" is right, including the endpoint. `redteam-0830-floor-growth.md`
R3's "8 beyond `s = 5`" therefore holds on `[5, 7)` only, as the note says.

The note's continuation figures (doubled threshold 12 at `s = 7`, 16 at 9, 36
at 20) are the **all-ones** sub-family's, and are conservative: allowing any
chain shape, the best doubled threshold with a legal exit tracks `2s`, reading
13.9999 at `s = 7`, 17.9997 at 9 and 23.9982 at 12 (S1, at a chain-length cap
of 24). Either set of numbers clears `β₂`; the note should say which family its
numbers come from.

### 3.5 The escape-(a) density. CONFIRMED in substance, mislabelled

`ln(n₁n₂) = 7.4993e7` at `(s, z) = (3.0, 1e8)` against `θ(z) = 9.9988e7`, and
2.1960e7 at `(2.8, 1e8)` (S5). So the planted class is larger than one position
in `W` by `exp(2.5e7)`, and the first pass's `1/W` accounting understates it,
as the note says. The class's density is `≈ 1/(n₁n₂) = exp(−Θ(D^{1/3}))`, and
this is **derived and measured, not asserted**: `ln(n₁n₂)` reads three quarters
of `D^{1/3}` at both measured rows, which is `θ(D^{1/3}) − θ(D^{1/3}/4)` under
Chebyshev.

**Two labels are wrong.** (i) The first pass computed `H(Ω + HM)²/W`, which is
`H` positions out of `W`, not "one position out of `W`" as the note says. (ii)
`(A₁A₂)²/(2n₁n₂)` is a **lower** bound on that split's contribution, since
`Ω ≥ A₁A₂`; a lower bound far below `B` shows no contradiction has been
exhibited, not that none exists. The two-sided check is cheap and passes:
`λ⁺(n) ≤ 2^{ω(n)}` over 4195588 box primes gives the split's contribution at
most `10^{−3.004323e+7}` against `B ≈ 10^{10.1}` (S5). Either way the escape
fails by an exponential.

**A limit on what §7 can do at all.** The sum of these contributions over
**all** splits is `⟨R₁²⟩` itself, the object Lemma V bounds. A single split can
never be a full consistency test, only a check that the one split the
construction plants does not by itself exceed `B`. The note should say so.

## 4. Target 1, claim (c): the LP maximum and the corollary's constant

**Grade: CONFIRMED, both.**

- The capped four-prime maximum reproduces `8s/9` (`s ≤ 3`), `(2s+2)/3`
  (`3 ≤ s ≤ 5`) and 4 (`s ≥ 5`) at 16 values of `s`, **0 deviations**, largest
  residual **4.441e-16**, by exact rational simplex; the optimal vertex prints
  as `(0.9, 0.9, 0.3, 0.3)` at `s = 2.7`, that is `(s/3, s/3, s/9, s/9)` (S1).
- The `2k` closed form `s(1 − 3^{−k})` reproduces at `2k = 2, 4, 6, 8` and both
  `s`: 1.866667 / 2.488889 / 2.696296 / 2.765432 at `s = 2.8`, and 2 / 2.666667
  / 2.888889 / 2.962963 at `s = 3.0` (S1).
- The corollary crossing solves at `s* = 2.399878284834` against
  `9β₂/16 = 2.399878284834`, agreeing to **1.097e-13**; `1+√e` clears it by
  0.248843 (S1).

The identity `2·(8s/9) = β₂ ⟺ s = 9β₂/16` is one line and holds only on
`s ≤ 3`, as the note says.

## 5. Target 1, claim (d): the scope of death

**Grade: WEAKENED. One row is missing and one sentence is stronger than its
evidence.**

**The density claim is derived, not asserted** (§3.5). That part stands.

**L7 is not untouched.** `derive-0904-L7-transfer.md` §3, the sibling note of
the same day, rules that L7's mechanism 2 needs "the sup-over-positions law"
for decoupling and is therefore **dead if the growth half survives**. The
growth note's §10 says "L3–L10 are different objects and are untouched". The
statement L7 stays open; one of its two known mechanisms leaves with L2. The
two notes have to be made to agree before either reaches the live layer.

**L1, L3, L4, L5 do not depend on a sup-over-positions law.** L1 is the
unconditional exponent itself and is the target, not an input. L3 is a doubling
inequality on `Ĝ`. L4 and L5 are (H-sub-pow) statements about `ln G₂` and its
sub-power constant. None of the four passes through `R_H`, `ρ̃` or the
certificate.

**The nearest sup-shaped legal row is U1, and it survives for a reason the note
does not give.** U1 asks whether `sup/sd` stays bounded in the two-class
discrepancy channel `ΔΦ₂`. `ΔΦ₂(y, x) = Ψ(y,x) − (D_x/x#)·y` (`G2-STATE.md`, the
two-class discrepancy construction) is the signed discrepancy of the **true** two-class counting function,
not of the certificate, so the floor, which is a statement about `cc` and `ρ̃`,
says nothing about it. Naming that is worth a clause, since "different objects"
is the whole argument for four legal rows and a reader will want to see it once.

**"Every almost-all-positions statement survives" is stronger than the
evidence.** What the floor gives is a **lower** bound on one exceptional class;
it gives no **upper** bound on the exceptional set. The honest form is *untouched
by this construction*, which is what the note's own body says and what its §0
bullet does not. Proposed wording: *the construction plants a class of density
`exp(−Θ(D^{1/3}))`, so it exhibits no obstruction to any almost-all-positions
statement, including Lemma V; it does not bound the exceptional set and does not
certify any such statement.*

## 6. Target 2: the L7 transfer note

### 6.1 "Vacuous on average, hence not non-vacuous at every position". CONFIRMED

The inference is valid as stated, and the average identity is exact rather than
approximate. Over the full period `W = 30030` at `x = 13` the union-bound
certificate `C(x) = #holes in (x, x+H] − Σ_p #{holes ≡ −2 (p)}` has period mean
equal to `H·(φ(W)/W)·(1 − B)` at all four `H` tested, to the printed digits:
−0.9590, −1.9181, −3.8362, −7.6723 at `H` = 50, 100, 200, 400 (S6). A mean at
or below zero forces a position at or below zero, and a Jacobsthal-type bound
needs every position, so the union bound cannot deliver L7 from `x = 11` on.

**One clause overstates.** "From there the union bound certifies nothing in the
period average" is right; "certifies nothing" without the qualifier is not. At
`H = 50` the certificate is still positive at 4644 of 30030 positions, at
`H = 100` at 2574, at `H = 200` at 564, and only at `H = 400` is it non-positive
everywhere (max −1). Proposed wording: *from there the union bound certifies
nothing at every position, which is the form L7 needs; it still certifies at
some positions until `H` is a few hundred at `x = 13`.*

### 6.2 The CRT count. CONFIRMED by independent re-enumeration

Re-enumerated with a different walk at `x = 7, 11, 13`: per-prime counts of
holes in the class `−2 (mod p)` are EQUAL to `φ(W)/(p−1)` at every odd `p`
(3:2880, 5:1440, 7:960, 11:576, 13:480 at `x = 13`), `B(13) = 1.1000`, and the
exact non-twin-slot fraction 0.7422 equals the closed form
`1 − ∏_{3≤p≤x}(p−2)/(p−1)` (S6). The note's `B(x) ∼ lnln x` is the standard
Mertens statement and needs no check.

### 6.3 The sieve-on-holes as the vector sieve. WEAKENED, on two counts

**The identification needs one substitution step that the note skips.** Sieving
`A + 2` with the true indicator of the holes `A` kept on the other side is
**strictly stronger pointwise** than the vector sieve, because the vector sieve
replaces both indicators by sieve weights. The corpus already owns the
adjudication: `sift-limit-attack.md` §7b(1b) reads Ford-Halberstam's Lemma 1 as
"BF (2.6) with the true indicators in the minorant slots, strictly stronger
pointwise, and any usable form of it (minorants substituted for the true
indicators) is (2.6) verbatim". The reason the substitution is forced is that
the count `|A ∩ (−2 mod d)|` is needed two-sidedly and uniformly in `d`, which
is a second sieve. So "That is exactly the Brüdern-Fouvry vector-sieve
decomposition" should read "reduces to the Brüdern-Fouvry vector sieve once the
hole indicator is replaced by a sieve minorant, the step `sift-limit-attack.md`
§7b(1b) prices".

**The price quoted is the retired one.** The note lands mechanism 2 at
`2(1+√e) = 5.2974`. That constant is `K_FH`, the value when `D⁻ = D⁺` is
**forced**; `sift-limit-attack.md` §7b(1b) gives `K_BF = 5.158064680330` as the
free-level figure, and §4.5 correction (i) retires the 1.2417 break-even that
`5.2974/β₂` produces, calling every appearance of it "that much too
pessimistic". Recomputed here with no shared code, by minimising `a + b`
subject to `2f(b) > F(a)`: the minimum is **5.158064680330** at
`(a, b) = (2.229949, 2.928115)`, `b/a = 1.3131`, and forcing `a = b` gives
`2(1+√e) = 5.297442541400`, 2.702135% worse (S6). Both clear `β₂ = 4.266450`,
so the note's conclusion is unaffected; the sentence should quote 5.158065 with
5.2974 as the equal-level variant.

### 6.4 "No third mechanism excluded". HONEST BUT INCOMPLETE

The note's §6 says a third transfer argument "is not known to this note; not
searched in the literature beyond the corpus's own `recon-0828-jacobsthal.md`
and `covering-dive.md`". That is honest, and no third mechanism is hidden. It
is incomplete as a survey of the corpus's own shelf: the family the brief names,
weighted sieves with Chen's switching, **is already priced and closed**, at
`sift-limit-attack.md` §4.2 (Richert's weights, DHR Theorem 11.1, Chen's
switching, through Lichtman's record), verdict "no entry point", with two
reasons that apply verbatim to L7: `G₂` has no almost-prime slack to spend, so
weights tolerating a stray mid-range factor certify the wrong set; and the
sub-8 constants consume progressions-averaged inputs unavailable uniformly in
window position. §4.3 closes GPY / Maynard-Tao the same way ("a lower-bound
device, not an upper bound for gaps of a sifted set"), and §4.4 closes the FKMPT
long-gap machinery on its authors' own Remark 7. Citing those three strengthens
the note's conclusion rather than weakening it, and leaving them out invites a
later session to re-price them.

## 7. The two notes' proposed live-layer changes, graded

| # | proposed change | grade | wording that survives |
|---|---|---|---|
| 1 | `REFUTED.md:99` "red-teamed once on each half" → twice on the growth half, still DERIVED | **SURVIVES verbatim** | as proposed |
| 2 | `REFUTED.md:99` "six independent attacks" → ten | **SURVIVES**, and is now eleven or more counting this pass; the count is bookkeeping, not evidence | prefer "survived repeated independent attacks across three adversarial passes and stays DERIVED", so the row stops carrying a number that changes every session |
| 3 | `REFUTED.md:99` add "on the Rosser vector-sieve lattice at equal levels `D₁ = D₂ = z^s`" | **REWORD** (clause too narrow; the rider under it REFUTED, §3.1) | "on the **Rosser vector-sieve lattice**, at every admissible level split and not only at `D₁ = D₂` (checked over 1643 splits, minimum margin 0.64 of exponent); no other admissible weight system is derived" |
| 4 | `REFUTED.md:99` "falsity beyond `z ≈ 5.6e31`" → `10^15.3` at `s = 3.0` | **REWORD** (mixes two `u₀` conventions, §3.2) | "the falsity's level is `s`- and `u₀`-dependent: at `u₀ = β₂`, `z ≈ 10^15.3` at `s = 3.0`, `10^25.0` at 2.8, `10^35.4` at 2.7; the 5.6e31 on the record is the `s = 2.698721`, `u₀ = 4.2165` cell" |
| 5 | `TODO.md:28` board row 1: ten attacks, crossing `s`-dependent | **REWORD**, same reason as row 4 | as row 4, compressed |
| 6 | `TODO.md:680-687` "the exact onset is 4.42e5 at `s = 3.0`, and 1.055e6 is an analytic figure optimistic by 1.8× at its own `s`" | **REWORD** (the numbers survive, the framing inverts the direction, §3.3) | "the literal construction is empty below `z = 1.875e6` at `s = 2.698721`, the analytic window bound 1.055e6 being early by 1.78×; at `s = 3.0` the onset is 4.39e5" |
| 7 | `TODO.md:29` next move: the second pass has run, so only the non-two-class input remains | **SURVIVES verbatim** | as proposed |
| 8 | `TODO.md:658-661` "then 4" available only on `5 ≤ s < 7`; longer chains carry `s ≥ 7` | **SURVIVES**, and is sharp at `s = 7` itself | add "inclusive at `s = 7`", and say the 12 / 16 / 36 figures are the all-ones sub-family's (any-shape chains give ≈ `2s`) |
| 9 | `README.md:234` "six attacks" → ten | **SURVIVES**, same bookkeeping caveat as row 2 | as row 2 |
| 10 | `G2-STATE.md:186-192` ten attacks, `s`-dependence, and "the second adversarial pass has now run and did not break it, so this sentence's own reopening condition is spent" | **REWORD**: the first two clauses as rows 2 and 4; the third **SURVIVES** | keep "the reopening condition named in this sentence is spent; reopening now needs a new mechanism, not another pass" |
| 11 | `redteam-0830-floor-growth.md` R3 "8 beyond `s = 5`" → only on `[5, 7)` | **SURVIVES verbatim** | as proposed |
| 12 | `redteam-0830-floor-growth.md` §3 escape (a): density `1/W` → `≈ 1/(n₁n₂)`, corrected bound `(A₁A₂)²/(2n₁n₂)` | **REWORD** (mislabelled bound, §3.5) | "the density is `≈ 1/(n₁n₂)`, exponentially larger than `1/W`; the split's contribution is between `(A₁A₂)²/(2n₁n₂)` and `(3·2^{ω})²/(2n₁n₂)`, log₁₀ from −3.257e7 to −3.004e7 at (3.0, 1e8), against `B ≈ 10^{10.1}`; and one split is not the sum over splits" |
| 13 | `attack-0830-rec-cheapest.md` §4.2: the `p*` window is a convenience bound, neither necessary nor sufficient | **SURVIVES verbatim** | as proposed |
| 14 | growth note §10 "L3–L10 are different objects and are untouched" | **REFUTED** as written (§5) | "L1, L3, L4, L5 are untouched; **L7's mechanism 2 dies with L2** (`derive-0904-L7-transfer.md` §3); U1's object `ΔΦ₂` is the true-count discrepancy, not the certificate's, and is untouched" |
| 15 | growth note §0 "every almost-all-positions statement survives" | **REWORD** (§5) | "exhibits no obstruction to any almost-all-positions statement; it does not bound the exceptional set and certifies nothing" |
| 16 | L7 note §2 "from there the union bound certifies nothing in the period average" | **SURVIVES** with a qualifier (§6.1) | add "at every position, which is the form L7 needs" |
| 17 | L7 note §3 "That is exactly the Brüdern-Fouvry vector-sieve decomposition" | **REWORD** (§6.3) | "reduces to the Brüdern-Fouvry vector sieve once the hole indicator is replaced by a sieve minorant, the step `sift-limit-attack.md` §7b(1b) prices" |
| 18 | L7 note §3 "landing at `2(1+√e) = 5.2974`" | **REWORD** (§6.3) | "landing at `K_BF = 5.158065` with free levels, or `2(1+√e) = 5.297443` when `D⁻ = D⁺` is forced; both above `β₂`" |
| 19 | L7 note §6 "a third mechanism, if one exists, is not excluded" | **SURVIVES**, incomplete (§6.4) | add "the corpus already closes weighted sieves with Chen switching (`sift-limit-attack.md` §4.2), GPY / Maynard-Tao (§4.3) and FKMPT (§4.4) for this object" |
| 20 | L7 note's ledger verdict and PARTIAL status | **SURVIVES** | as proposed, with row 18's figure |

## 8. What would falsify this red team

- **The escape scan's grid being too coarse.** RUN at 0.05 in both `a` and `b`
  over `a ∈ [1.70, 4.65]`, `b ∈ [2.00, 4.00]`, 1643 admissible cells, minimum
  margin 0.644444. NOT RUN outside that box, and NOT RUN for the four-parameter
  family in which the two systems carry different upper levels as well. A cell
  with `floor ≤ window` anywhere would restore the "equal levels" clause and
  open a live escape.
- **`LP⁻` being the wrong polytope for the `B`-terms.** The `D⁻` prefix
  conditions are taken here as the even-`m` ones, mirroring E2's statement. If
  that mirror is wrong the §3.1 escape scan and the §3.1 "conservative"
  reading both move. NOT independently checked against `λ⁻` itself; the
  reviewed notes check `λ⁺` at `z ≤ 41` and this pass does not repeat it.
- **The onset definition.** The 0.7% gap between 4.390e5 here and 4.42e5 there
  is grid and definition, not disagreement. A different definition of "live"
  moves both. The definition used is printed in S4 so the comparison can be
  redone.
- **The fitted constant `C`.** Fitted on the top measured level alone, as in
  the reviewed note. Every crossing figure in §3.2 inherits that, and the
  reviewed note's own §11 sensitivity, about one natural log of `z` per unit of
  `ln C`, applies to all of them. These are order-of-magnitude figures.
- **`u₀ = 4.2165` being the wrong reading of the record's 5.6e31.** The
  agreement is 0.07 in the exponent at the same `s`, which is strong but is a
  reconstruction, not a citation of the original calculation. If the record's
  figure was computed at `β₂` with a different `C`, row 4 of §7 changes.
- **The mean-square input.** §2's defence of the chain at the cheapest legal
  point rests on `REFUTED.md`'s Lemma V mean-square row, "a theorem with no hypothesis". If the
  proven mean square turns out to carry a range hypothesis after all, the chain
  loses the band `s ∈ (2.6487, 2.6879)` at `u₀ = β₂` and the "cheapest point"
  framing of `attack-0830-rec-cheapest.md` becomes the one point the argument
  cannot reach. NOT re-derived here.
- **The L7 union-bound enumeration being unrepresentative.** RUN exhaustively
  over the whole period at `x = 13` only, `W = 30030`. The period mean is exact
  at every `x`, so the inference does not depend on the level; the counts of
  positions where the certificate is still positive do.

*Gate: the producer verifies under `node research/qc/embed.js --check`
(code-sha256 matches, body matches out-sha256, out-sha256 matches). No existing
file was edited by this note.*
