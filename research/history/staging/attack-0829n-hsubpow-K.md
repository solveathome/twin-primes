# TODO 1d: (H-sub-pow) with an explicit K, second pass — the fourth mechanism named and priced, the needed K measured against the one-class control, and the all-bases hypothesis shown to carry a sign condition on the second-order term

<!-- ledger
id: Q-hsubpow-K-0829n
status: OPEN
todo: 1d
question: Can (H-sub-pow) be proven with an explicit K inside the trusted legal zone [1.3946, 11.3568) by a mechanism the 2026-08-28 pass did not close?
verdict: No K is proven at any base; the single open inequality is the uniform-in-k ratio cap G(b^(k+1))/G(b^k) <= e^K G(b), which is a proof gap at a fixed base and a possible truth gap across bases, since for any law G ~ c n^beta (ln n)^delta the all-bases hypothesis holds with finite K if and only if delta >= 0.
-->

*2026-08-29. Producer: `research/history/staging/attack-0829n-hsubpow-K.js`
(formal embed; fingerprint checked with `embed.js --check` after writing).
Arithmetic only: no enumeration, no new `G₂` value, every ladder term parsed
from the corpus keepers (`research/import-interp-01-bgt-defect.js` for the
22-term A144311 column, `research/exact-g2-ladder.js` for the 14 custody terms,
`research/exponent-control.js` for the 64-term A048670 control). Nothing was
committed, no git command was run, no existing corpus document was edited.
HELD, awaiting the standing one-pass adversarial review. Legend as in
`research/sift-limit-attack.md`: **[PROVEN]** proof given here or published;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical, finite
range; **[INFERRED]** deduction from sourced facts; **[CITED]** taken from a
corpus artifact, not recomputed.*

---

## 0. The verdict, up front

> **No K is proven, at any base, by any mechanism, and this pass adds no
> fourth mechanism that closes. What it adds is the name of the fourth
> mechanism, its price, and a sign condition the all-bases hypothesis was
> carrying unstated.** The open inequality is one line: a cap on the ratio
> of maximal gaps at consecutive levels of a chain, uniform in the rung,
> `Ĝ(b^{k+1}) ≤ e^K·Ĝ(b)·Ĝ(b^k)` for all `k`. At a fixed base that is a
> proof gap (every law the corpus entertains satisfies it, and nothing in
> the corpus or the literature bounds such a ratio uniformly). Across all
> bases it is a possible truth gap: for any exact law
> `Ĝ ~ c·n^β·(ln n)^δ` the all-bases hypothesis holds with a finite `K` if
> and only if `δ ≥ 0`, the `k = 1` rung alone diverging when `δ < 0`, and
> the sign of `δ` for `G₂` is not known. The one instrument that reads `δ`
> off the reachable ladder returns the wrong sign on the control.

1. **The map from `K` to the exponent bound is exact and reproduces the
   zone.** Under the hypothesis `β ≤ β_bound(K) := min_b (f(b)+K)/ln b`,
   and on the reachable ladder `β_bound(1.3946) = 2.0000` at `b = 66`,
   `β_bound(11.3568) = 4.2665` at `b = 82`; the trusted legal zone is exactly
   `[K_min(2), K_min(β₂))` with `K_min(β) = max_b (β ln b − f(b))`. The
   argmin base is 16 only at `K = 1.0033`, 66 at `1.3946`, 78 at `2`, and 82
   for every `K ≥ 3`: on this ladder the whole exponent prize of a zone `K`
   above 3 rests on the last trusted term. **[VERIFIED]** (§1)
2. **What the data needs, with the control beside it.** `max S(n) = 1.3946`
   at `n = 66` and the power-pair sup `1.0033` at `(16,4)` reproduce; custody
   `0.9694` at `(16,2)` reproduces. On the one-class control the same sup is
   `0.6931` at `G₂`'s reach and `0.9478` at its own, `+0.2546` nats for a
   fourfold reach, every record after `n = 8` a `k = 1` rung at a growing
   base. A sup read at reach 82 is a floor on the true constant, and its
   movement lives on the diagonal. **[MEASURED]** (§2)
3. **The diagonal does not read `δ` at this reach.** The slope of
   `D(b,1) = f(b²) − 2f(b)` on `ln ln b` equals `−δ` for an exact law (the
   synthetic laws return it to `1e−9`); the control, conjectured
   `δ = 2 + o(1)`, reads `+0.5157 ± 0.1969` on 16 bases, the wrong sign by
   more than two standard errors. The `G₂` reading `+0.0961 ± 0.4137` on 8
   bases is therefore void, not evidence for `δ = 0`. **[MEASURED]** (§2)
4. **The proof attempt, at `K` near the ceiling.** Every tool with the right
   direction is one of the three closed on 2026-08-28 or reduces to the
   two-class window sieve, which is the wall; the two new proven statements
   (the lifting identity and the sign lemma) are necessary conditions, not
   mechanisms. The minimum margin `K − D` on the reachable pairs is
   `10.3535` nats at `K = 11.3568` and `0.3913` at `K = 1.3946`: the data
   falsify nothing and reach no decisive rung. Starting high does not buy a
   cheaper proof: at `K = 11` only 10 of 81 reachable bases (from `b = 72`)
   convert a one-base `K` into `β < β₂`, at `K = 2` all 81 do. **[VERIFIED]**
   (§§3–4)
5. **A correction to the record.** The corpus sentence "every power-log law
   has a bounded window-sup defect" (`fekete-1d.md` §4;
   `attack-fekete-1d-01-defect47.js` reading 7) holds for `δ ≥ 0` only; the
   same texts locate the risk on the diagonal, so the mechanism is right and
   a qualifier is missing. TODO 1d's formula `β ≤ (ln 66 + K)/ln 16` reads
   `5.607` at the corrected ceiling, above `β₂`; base 82 carries the bound
   there, not base 16. **[VERIFIED]** (§5)

Nothing here moves the wall. The ledger status is OPEN because the question
as posed (a proof by a mechanism the last pass did not close) is neither
answered nor shown unanswerable; the three closed mechanisms stay closed.

---

## 1. The hypothesis, exactly, and the map from K to the exponent bound

### 1a. The statement, quantifiers included

Write `Ĝ(n) = G₂(P(n)#)` for `P(n)` the largest prime `≤ n`, `f = ln Ĝ`.
Quoted from `hsubpow-explicit-K.md` §1a, itself Reduction 1 of
`attack-hsub-01.md` §1 (**[PROVEN]** there, by inspection of the lemma's proof):

> **(H-sub-pow).** There is a constant `K ≥ 0` such that, for **all** integers
> `b ≥ 2` and **all** integers `k ≥ 1`,
> `f(b^{k+1}) ≤ f(b^k) + f(b) + K`.

Two quantifiers, and they price differently. Write `D(b,k) = f(b^{k+1}) −
f(b^k) − f(b)` for the defect at base `b`, rung `k`. Then (H-sub-pow) at
base `b` with constant `K` is `sup_k D(b,k) ≤ K`, and the all-bases
hypothesis is `sup_b sup_k D(b,k) ≤ K`.

- **One base** buys only `limsup f(n)/ln n ≤ (f(b)+K)/ln b`
  (`attack-fekete-1d-02-lemma.js` header, the limsup half of the proof;
  `hsubpow-explicit-K.md` §1b P1). **[PROVEN]**
- **All bases** buys `β = lim f(n)/ln n` exists and
  `β = inf_{n≥2} (f(n)+K)/ln n` (same source, P2). **[PROVEN]**

The direction of everything below is fixed by this: an upper bound on
`D(b,k)` is what the hypothesis needs and is the legal direction; a lower bound
on `D` (a floor on `K`) can only make the hypothesis harder and carries no TPC
content of its own. No statement in this note runs the other way.

### 1b. The map, both ways, and the zone reproduced

Under the all-bases hypothesis, `β ≤ (f(b)+K)/ln b` at every `b`, so

  `β ≤ β_bound(K) := min_{2≤b≤82} (f(b)+K)/ln b`,

where the minimum over the *reachable* bases is `≥` the infimum over all bases,
so the tabulated value is an upper bound on `β` in the legal direction and never
a sharper claim. Inverting, if the true exponent is `β` then any `K` for which
the hypothesis holds satisfies `f(n) ≥ β ln n − K` for every `n`, hence

  `K ≥ K_min(β) := max_{2≤b≤82} (β ln b − f(b))`,

a floor on the true constant, again read only on the reachable range.

| `K` | `β_bound(K)` | argmin `b` | | `β` | `K_min(β)` | argmax `b` |
|---|---|---|---|---|---|---|
| 1.0033 | 1.8730 | 16 | | 1 | 0.0000 | 2 |
| 1.3946 | 2.0000 | 66 | | 1.5 | 0.3466 | 2 |
| 2 | 2.1422 | 78 | | 1.777 | 0.7372 | 16 |
| 3 | 2.3701 | 82 | | 1.797 | 0.7927 | 16 |
| 5 | 2.8239 | 82 | | 2 | 1.3946 | 66 |
| 10 | 3.9586 | 82 | | 3 | 5.7759 | 82 |
| 11.3568 | 4.2665 | 82 | | β₂ | 11.3568 | 82 |

(producer SEC D; `β₂ = 4.26645028414864191641` quoted from
`research/dhr-verification.md` row 1a.) Three readings, all **[VERIFIED]**:

- The trusted legal zone `[1.3946, 11.3568)` of `hsubpow-explicit-K.md` §1c is
  exactly `[K_min(2), K_min(β₂))` on the reachable ladder; the check lines
  `beta_bound(1.3946) = 2.0000 at b = 66` and `K_min(beta2) = 11.3568 at b =
  82` pass. The wrong-direction guard is built into the map: `β_bound(K) ≥ 2`
  for every `K ≥ 1.3946`, by construction, so no `K` in the zone can land the
  conclusion at or below exponent 2.
- The argmin base moves with `K`: 16 at `K = 1.0033`, 66 at `1.3946`, 78 at
  `2`, and 82 for every `K ≥ 3`. The exponent prize of any `K ≥ 3` in the
  zone rests, on this ladder, on `Ĝ(82) = G₂(79#) = 1710`, a Wang 2024 term
  adopted trusted (`redteam-0820-math.md` §1.2, **[CITED]**). At custody
  grade the ladder stops at 46 and the prize moves with it.
- `K_min(1.5) = 0.3466` and `K_min(1.797) = 0.7927` (the two measured
  exponents of `exponent-control.md` §5 and `attack-block-01-ladder.md`,
  **[CITED]**) both sit below the measured floor `1.0033`. So the reachable
  pairs already bind harder than the asymptotic need under the measured
  exponent; the floor is set by small-`n` structure, not by the exponent.

## 2. What the data needs: S(n), the power-pair defect, and the control

Two different objects answer "what `K` does the data need", and the brief's
word "defect" covers both. `S(n) = ln(n²/Ĝ(n))` is the slack of P3
(`hsubpow-explicit-K.md` §1b): `β < 2 ⟺ S(n) > K` at one integer, so `S` is
the `K` the data would need for the hypothesis to be TPC-strength. `D(b,k)`
is the defect of the hypothesis itself: the `K` the data needs for the
hypothesis to be *true* on the reachable pairs. The control is the one-class
Jacobsthal `ĥ(n) = h(P(n)#)`, A048670, 64 terms to `p = 311`
(`exponent-control.md` "The control"; the last six terms are the
single-witness b-file tail, **[CITED]**), with conjectured order
`p(ln p)^{2+o(1)}` (Maier and Pomerance, cited there), exponent `1 + o(1)`.

### 2a. The slack, on every step

`S` is a step function rising within each step, so its maximum on a step is
at the last integer before the next prime. Producer SEC B tabulates both ends
of every step. `max_n S(n) = 1.3946` at `n = 66` reproduces the trusted trap
ceiling; the next three steps read `1.3393`, `1.3105`, `1.3804` at `n = 70`,
`72`, `78`, below it. **[VERIFIED]** On the control the same slack reads
`3.4965` at `n = 66` and `4.4830` at `n = 306`, and it is still rising at the
end of the ladder: that is what an object whose exponent is below 2 looks like
on this instrument, and `G₂`'s `S` shows nothing of the kind at reach 82.
This is consistent with the flat ratio and says nothing about its limit
(`phase1-T3prep-decision-rule.md`, **[CITED]**). **[MEASURED]**

### 2b. The power-pair defect and its running sup

15 power pairs are reachable at trusted grade (`b^{k+1} ≤ 82`), 9 at custody
(`≤ 46`). The sup is `1.0033` at `(b,k) = (4,2)`, the pair `(16,4)`, and the
custody sup `0.9694` at `(2,4)`, the pair `(16,2)`; both reproduce
`attack-hsub-01.md` §1 to four places. The running sup `K_run(n)`, the
largest defect among pairs with `b^{k+1} ≤ n`, moves at `n = 4, 8, 32, 64`
and is flat from 64 to 82. **[VERIFIED]** Every pair's margin against both
zone endpoints is in the SEC C table; the smallest is `0.3913` nats at the
floor and `10.3535` at the ceiling.

### 2c. The control, at the same reach and at its own

The control has 15 reachable pairs at `G₂`'s reach and 29 at its own. Its
sup is `0.6931` at `(9,1)` on the first and `0.9478` at `(10,1)` on the
second: the sup moved `+0.2546` nats when the reach grew from 82 to 312. The
records, in order, are set at `(2,1)`, `(2,2)`, `(4,1)`, `(6,1)`, `(9,1)`,
`(10,1)`: after `n = 8` every record is a `k = 1` rung at a growing base. The
per-base sups (SEC C's last line) are largest at `b = 10, 12, 9, 6` and are
all `k = 1` or `k = 2`. **[MEASURED]**

Read against `G₂`: the sup at reach 82 is a floor on the true all-bases
constant, and on the one control where a larger reach exists the floor moved
by a quarter nat and moved on the diagonal. The `1.0033` is therefore not an
estimate of `K_true` and should not be quoted as one; `attack-hsub-01.md` §5
already says the diagonal is blind past `√82 ≈ 9`, and the control now puts a
number on what blindness costs at a fourfold reach.

### 2d. The diagonal as a `δ`-meter, and why the reading is void

For an exact law `Ĝ(n) = c·n^β·(ln n)^δ`,

  `D(b,1) = f(b²) − 2f(b) = −ln c + δ ln 2 − δ ln ln b`,

so the slope of `D(b,1)` on `ln ln b` is `−δ` with `β` and `c` both eliminated
(**[PROVEN]**, one line; the producer's three synthetic laws at
`δ = 0, 2, −1` return `−0.0000`, `−2.0000`, `1.0000` with zero residual). On
the ladders:

| object | bases | slope on `ln ln b` | `δ̂` |
|---|---|---|---|
| `G₂` | 2..9 (n = 8) | `+0.0961 ± 0.4137` | `−0.0961` |
| control | 2..9 (n = 8) | `+0.5298 ± 0.3018` | `−0.5298` |
| control | 2..17 (n = 16) | `+0.5157 ± 0.1969` | `−0.5157` |

The control's conjectured `δ` is `2 + o(1)` and the instrument reads
`−0.5157 ± 0.1969`: the wrong sign, more than two standard errors from zero,
and much further from `−2`. So at reach 17 the diagonal is not in any regime
where the exact-law formula applies, and the estimator is uncalibrated. The
`G₂` reading, at eight bases with a standard error four times its value, is
void on that ground and on its own error bar; it is **not** to be read as
"consistent with `δ = 0`". **[MEASURED; the estimator fails its control]**

This is the campaign rule "calibrate the estimator before fitting"
(`primeoire-campaign-lessons`) doing its job: had the control not run in the
same pass, the `G₂` slope would have read as a null result for `δ`.

---

## 3. The proof attempt at the top of the zone, tool by tool, with directions

The target, at `K = 11.3568` and then downward: for a base `b` and every
`k ≥ 1`,

  **(★)** `Ĝ(b^{k+1}) / Ĝ(b^k) ≤ e^K · Ĝ(b)`,

a cap on the ratio of maximal twin gaps at consecutive levels of the chain
`b, b², b³, …`, uniform in the rung. At `K = 11.3568` the caps are large:
`1.711e+5` at `b = 2` and `2.566e+6` at `b = 9`, against observed ratios of
`5.27` to `57.00` on the reachable rungs and a `b^{1.5}` model reading
`2.83` to `27.00` (SEC G). The inequality is nowhere near tight on any datum.
That is the sense in which "start high" was the right instruction; what
follows is why it does not make the proof cheaper.

Every tool considered, with its direction and its status. "Direction ↑"
means the tool bounds the larger object `Ĝ(b^{k+1})` from above, which is
what (★) needs and is legal; "direction ↓" means it bounds from below and can
only floor `K`.

| tool | direction | what it gives | status |
|---|---|---|---|
| T1 Bridging Lemma, `Ĝ(y′) ≤ (K*+1)Ĝ(y)` | ↑ | (★) iff `K*+1 ≤ e^K Ĝ(b)` uniformly | CLOSED: `K* ≥ π(y′) − π(y)` diverges (`hsubpow-explicit-K.md` §2, Lemma 1) |
| T2 AP-cap density, `θ_b(y) < 1` | ↑ | (★) if the entering primes cannot kill a full window | CLOSED: `θ_b → ∞` at every base (§3 there) |
| T3 two power envelopes, `Ĝ ≤ An^γ`, `Ĝ ≥ an^λ` | ↑ on top, ↓ below | defect `≥ (γ−λ)k ln b + O(1)` | CLOSED: `γ − λ = 3.26645` (§4 there, Lemma 2) |
| T4 (H-mono) alone | ↓ | `D(b,k) ≥ −f(b)` | legal, empty: a floor |
| T5 the period, `Ĝ(n) ≤ P(n)#` | ↑ | `D ≤ ln P(b^{k+1})# − …`, exponential in the level | legal, empty: diverges in `k` |
| T6 the lifting identity (§3a, this pass) | neither | `D(b^j,k)` as block sums of `D(b,·)` | PROVEN; converts nothing (§3a) |
| T7 the sign lemma (§3b, this pass) | ↓ | all-bases `K ≥ 1.0597δ − ln c`, `= ∞` if `δ < 0` | PROVEN for exact laws; a necessary condition |
| T8 relative window sieve at level `b^{k+1}` over level-`b^k` slots | ↑ | a survivor in every window of length `e^K Ĝ(b) Ĝ(b^k)` | not a mechanism: it is the two-class Jacobsthal problem in the window coordinate; the CRT adversary of Lemma 1 is exactly its uncontrolled remainder |

Two of these are new and both are proven; neither is a route.

### 3a. The lifting identity, and why one base does not give all bases

> **Identity.** For integers `b ≥ 2`, `j ≥ 1`, `k ≥ 1`,
> `D(b^j, k) = Σ_{i=jk}^{jk+j−1} D(b,i) − Σ_{i=1}^{j−1} D(b,i)`.

*Proof.* Write `δ_i = f(b^{i+1}) − f(b^i) = f(b) + D(b,i)`. Then
`f(b^{j(k+1)}) − f(b^{jk}) = Σ_{i=jk}^{jk+j−1} δ_i = j f(b) + Σ D(b,i)` over
the same range, and `f(b^j) = f(b) + Σ_{i=1}^{j−1} δ_i = j f(b) +
Σ_{i=1}^{j−1} D(b,i)`. Subtract. ∎ **[PROVEN]**; checked to `1e−12` on the
four reachable instances `D(4,1), D(4,2), D(8,1), D(9,1)` (SEC F).

Read: a bound `sup_i D(b,i) ≤ K` at one base gives, at base `b^j`, only
`D(b^j,k) ≤ jK − Σ_{i<j} D(b,i)`, which grows with `j` unless the base-`b`
defects are themselves tuned. So (H-sub-pow) at one base, with any `K`, does
not yield it at the powers of that base with the same `K`, and a fortiori not
at all bases. The uniformity in `b` is a separate demand, and §3b says what
it demands.

### 3b. The sign lemma: what the all-bases quantifier costs

> **Lemma (sign).** Let `Ĝ(n) = c·n^β·(ln n)^δ` exactly, `c > 0`. Then
> `D(b,k) = −ln c + δ[ln((k+1)/k) − ln ln b]`, so
> `sup_{b≥2, k≥1} D(b,k) = δ(ln 2 − ln ln 2) − ln c = 1.0597δ − ln c`,
> attained at `(b,k) = (2,1)`, if `δ ≥ 0`; and `= +∞` if `δ < 0`, the
> `k = 1` rung diverging as `b → ∞`.

*Proof.* `f(b^{k+1}) − f(b^k) − f(b) = −ln c + δ[ln((k+1)ln b) − ln(k ln b) −
ln ln b]`. For `δ ≥ 0` both brackets are maximised at `k = 1`, `b = 2`
(`ln ln 2 < 0`). For `δ < 0`, `−δ ln ln b → +∞`. ∎ **[PROVEN]** Exhibited in
SEC E: at `c = 1`, `β = 1.5`, `D(b,1)` runs `0.1409` to `2.3381` from
`b = 10` to `10⁹` for `δ = −1`, `0.0141` to `0.2338` for `δ = −0.1`, and
`−0.1409` to `−2.3381` for `δ = +1`.

Consequences, stated in the legal direction only:

- **The all-bases hypothesis is not a regularity assumption on the exponent;
  it is a claim about the sign of the second-order term.** Any decreasing
  correction to a pure power (a `1/ln`, a `1/ln ln`, any `g` with
  `g(b²)/g(b)² → ∞`) makes it false for every finite `K`, while the
  fixed-base hypothesis survives all of them. Where the corpus locates the
  risk on the diagonal (`attack-hsub-01.md` §5; `fekete-1d.md` §4), this
  says what the diagonal is measuring.
- **What is known about `δ` for `G₂`: nothing two-sided.** If `β = 1`
  exactly (the "structural, if Q bounded" row of `exponent-control.md` §5)
  then the FGKMT floor `Ĝ ≥ g ≫ x ln x lnlnln x/lnln x`
  (`two-class-lower-bounds.md` §3, **[CITED]**) forces the correction up from
  below, but nothing bounds it above at any exponent; if `β > 1` nothing
  constrains its sign at all. The corpus's LOG null `1.016·p·ln²p`
  (`attack-fekete-1d-01-defect47.js` SEC F) has `δ = 2` and satisfies the
  lemma with room; the corpus never entertained a `δ < 0` law, which is why
  the qualifier went unstated.
- **The `K` an exact law needs is priced.** Under `δ = 2`, the log term alone
  contributes `1.0597` per unit `δ` at `(2,1)`; whether that lands in the trap
  `[1.0033, 1.3946)` or the zone depends on `ln c`, which no exact law for
  `G₂` supplies. This is a heuristic pricing on a model, not a bound on
  `K_true`. **[HEURISTIC]**

## 4. The single inequality that does not close, and whether it is a proof gap or a truth gap

### 4a. The inequality

- **needed, one base:** (★) `Ĝ(b^{k+1}) ≤ e^K Ĝ(b) Ĝ(b^k)` for every `k ≥ 1`,
  at some fixed `b`, with `K` in the zone at that base (which, by SEC G, means
  `b ≥ 72` at `K = 11`, `b ≥ 49` at `K = 10`, `b ≥ 16` at `K = 7.6394`, any
  `b` at `K ≤ 2`).
- **needed, all bases:** (★) at every `b`, which contains the squaring family
  `Ĝ(b²) ≤ e^K Ĝ(b)²` for all `b` (the `k = 1` rungs).
- **available:** per-instance certificates at eleven doubling steps
  (`attack-doubling-01.md` §3, **[CITED]**) and the 15 reachable pairs, all
  with `D ≤ 1.0033`. No bound on any ratio `Ĝ(by)/Ĝ(y)` that is uniform in
  `y` exists in the corpus or, so far as the corpus's reading of the
  literature goes, outside it: Iwaniec's and the DHR two-class bound are
  absolute power bounds at a single level, and the lower bounds are absolute
  too; T3 shows a pair of absolute bounds never yields a uniform ratio.
- **gap:** the whole of (★). Nothing narrows it to a constant.

### 4b. Proof gap or truth gap

**At a fixed base, a proof gap.** Every law the corpus entertains satisfies
(★) at fixed `b` with a finite `K` (the sign lemma at fixed `b` is finite for
every `δ`), the reachable rungs carry margins of `0.3913` nats at the floor
and `10.3535` at the ceiling, and no decisive rung is reachable
(`hsubpow-explicit-K.md` §1d: the base-16 chain's first instance is
`G₂(251#)`, unenumerable). What is missing is a method, not a fact. The
method would have to bound the maximal gap at one level by the maximal gap at
the level below times a constant, in every window, which is the two-class
Jacobsthal problem in its window coordinate; `hsubpow-explicit-K.md` §5
prices the legal-zone version at TODO 1b's strength, and this pass refines
the pricing: at `K` near the ceiling the bases that convert it into
`β < β₂` are only the largest reachable ones, so the base at which the proof
must be done is large and the `Ĝ(b)` factor in (★) is a number the corpus
knows only from Wang's terms.

**Across all bases, a possible truth gap.** By the sign lemma the all-bases
hypothesis is false for every finite `K` under any law with `δ < 0`, and the
sign of `δ` for `G₂` is unknown (§3b). This is a statement about whether the
hypothesis is *true*, not about whether it can be proven, and it is the
first place in the 1d route where the answer could be "no" for a reason
unconnected to TPC. It is not a closure: `δ ≥ 0` is what every model in the
corpus assumes and what the FGKMT floor supports if `β = 1`.

**What would falsify (H-sub-pow) at a given `K`, and whether the data does.**
One pair with `D(b,k) > K`. At `K = 1.3946` none of the 15 reachable pairs
does (largest `1.0033`); at `K = 11.3568` the nearest is `10.3535` nats away.
The data falsify nothing at any `K ≥ 1.0033`, and, since the running sup is
flat from `n = 64` to `82` while the control's moved `+0.2546` nats over a
fourfold reach, the flatness at `G₂`'s reach is not evidence that the sup has
converged. A future exact term at `47#` (priced at 1.49 days per run,
`phase1-T2b-exact-ladder.md`, **[CITED]**) adds no power pair at all
(`47² > 82`): the first new rung is `(b,k) = (2,6)`, and the
first new diagonal point is `b = 10` at `n = 100`, which on the control is
exactly where its record moved.

### 4c. Why the closed routes were not reopened

The Bridging Lemma, the density caps and the two-envelope shape are cited as
closed and were not re-run (`REFUTED.md` carries the certificate route, the
maxsum bridge and the block ladder as separate rows; `hsubpow-explicit-K.md`
§§2–4 carries the three mechanisms). The lifting identity of §3a expresses
higher bases through lower ones and is not the squaring-ladder recursion: it
introduces no averaging, forgets nothing, and is an exact identity that
converts no bound. The squaring family appears in this note only as the
`k = 1` rung of the hypothesis itself, which is where the sign lemma lives;
no argument here proceeds by squaring.

---

## 5. NOT REACHED, falsifiers, trap grading

**Not reached.**

- No instance of (H-sub-pow) is proven or refuted, at any base, with any `K`.
- No fourth mechanism with direction ↑ and a finite output. T8 is the wall
  restated in the window coordinate, not a method.
- The sign of `δ` for `G₂`. The diagonal instrument fails its control and no
  other instrument for `δ` was built.
- `Ĝ` past 82 is untouched; no enumeration; the control's b-file tail is
  used as adopted, not re-verified.
- The sign lemma is proven for *exact* power-log laws. For laws with
  oscillating corrections (`c₁ ≤ Ĝ/(n^β ln^δ n) ≤ c₂`) the same proof gives
  `K ≤ ln(c₂/c₁²) + 1.0597δ` for `δ ≥ 0` and divergence for `δ < 0`; this
  bound is stated, not exhibited numerically.

**Falsifiers, and whether each check has run.**

| claim | falsifier | has it run |
|---|---|---|
| the map reproduces the zone | a reachable `b` giving `β_bound(1.3946) < 2` or `β_bound(11.3568) < β₂` | yes, exhaustive over `b ∈ [2,82]`, both checks pass (SEC D) |
| the sup is a floor that moves | a control whose sup is flat across a fourfold reach | the one control available moved `+0.2546`; a second control (h2, 21 terms) has less reach than `G₂` and was not used |
| the diagonal estimator is uncalibrated | a control reading with the right sign within its error | the control reads `+0.5157 ± 0.1969` against a conjectured `−2`; the falsifier did not occur |
| the sign lemma | an exact law with `δ < 0` and bounded all-bases defect | impossible by the proof; numerically `D(b,1)` reaches `2.3381` at `b = 10⁹` for `δ = −1` |
| the lifting identity | one reachable instance off by more than rounding | four instances, all to `1e−12` |
| "no `K` is proven" | any derivation of an explicit constant | none produced; the trap grading below is therefore vacuous |

**Trap grading.** No explicit `K` was derived. The two proven statements are
an identity and a necessary condition; both can only raise the `K` a proof
would need, never lower it. `β_bound(K) ≥ 2` for every `K ≥ 1.3946` by
construction, so nothing tabulated lands at or below exponent 2. No
inequality in this note bounds `Ĝ` from above.

**Defects noticed in passing, not edited.**

- `fekete-1d.md` §4 and `attack-fekete-1d-01-defect47.js` reading 7: "every
  power-log law has a bounded window-sup defect" needs "with `δ ≥ 0`"; the
  same passages correctly place the risk on the diagonal.
- `TODO.md` item 1d: "an explicit K inside it gives `β ≤ (ln 66 + K)/ln 16 <
  β₂`" is true only for `K` below the old ceiling; at the corrected ceiling
  the base-16 bound reads `5.607` and base 82 carries the improvement.
- The brief for this task quotes the eleven-term flatness figure that
  `hsubpow-explicit-K.md` §7 already flags as a nine-term figure; not
  re-litigated here.

---

## 6. Sources and reproduction

| artifact | what it carries |
|---|---|
| `research/history/staging/attack-0829n-hsubpow-K.js` | custody of the three ladders (SEC A); `S` on every step and the control's (B); the 15 + 9 + 29 power-pair defects, running sups, the control at both reaches (C); `β_bound(K)` and `K_min(β)` (D); the diagonal slopes, synthetic calibration, the sign lemma's numbers (E); the lifting identity (F); the caps and margins at the top of the zone and the base-16 formula (G); nine readings |
| `research/history/staging/hsubpow-explicit-K.md` §§1–5, 9 | the statement, the corrected zone, the three closed mechanisms, the sup-versus-average pricing |
| `research/history/staging/attack-hsub-01.md` §§1, 5 | Reduction 1, the 1.0033 / 0.9694 floors, the diagonal's blindness past 9 |
| `research/history/staging/fekete-1d.md` §§4–6 | the lemma, its hypotheses, the power-log sentence corrected above |
| `research/attack-fekete-1d-02-lemma.js` | the eight-line proof and the LOG / POW controls |
| `research/exponent-control.md` "The control", §5 | the A048670 control, its conjectured order, the measured exponents 1.50 and 1.777 |
| `research/import-interp-01-bgt-defect.js`, `research/exact-g2-ladder.js`, `research/exponent-control.js` | the three ladders, parsed at run time |
| `research/dhr-verification.md` row 1a | `β₂` |

Reproduce with `node research/qc/embed.js --check
research/history/staging/attack-0829n-hsubpow-K.js`; the fingerprint matches
as of 2026-08-29 (`code-sha256 50759706…`, `out-sha256 686c9c43…`,
`body-lines 166`).
