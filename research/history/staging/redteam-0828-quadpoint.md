# The quadpoint red team: the capture identity survives its proof line by line, section 4 names the wrong object by up to 37%, the crossing law's "2% of the residual" is 6.6%, and the prereg's escalation tier sits above its own engine cap

<!-- ledger
id: Q-redteam-0828-quadpoint
status: ANSWERED
todo: Z0, Z2
question: Do the four HELD quadpoint notes of 2026-08-22 survive an adversarial pass: the capture identity's proof line by line, the depth law and its asymptote, the sealed prereg scoring, and the prior-art citations at page level?
verdict: The identity is PROVEN once its window convention is written down and holds at every K of 50 anchors under an independent implementation; four load-bearing sentences are wrong (section 4's gloss on Sum capU, v1 section 2's limit, the prior-art note's 2%, and the note's unconditional y* sentences), and none of the four defects opens or closes a route.
-->

*(2026-08-28. Staging note; nothing here is integrated into a live document and
no existing file was edited. Red team commissioned under TODO Z0's standing
debt, owed since 2026-08-22, against `quadpoint-identity-01.md`,
`attack-quadpoint-01.md`, `attack-quadpoint-02.md` with
`quadpoint-decade-prereg.md`, and `quadpoint-prior-art.md`. House method:
refuted-until-rederived, format per `redteam-0820-math.md` section 0. Companion
producer, formally embedded: `research/history/staging/redteam-0828-quadpoint.js`
(1.3 s; code-sha256 32fac619...; out-sha256 dbe7f44d...; `--check` passes
bit-honest; one forced stamp on this session's own extension, 0 of 157 figures
changed). No git command was run, at any point, per the brief. `research/qc.js`
was not run. Calibration marked per claim: PROVEN, VERIFIED by exact
computation, MEASURED, REFUTED. No TPC claim; Route B closed; rho(2) adverse.)*

---

## 0. The scoreboard

| # | claim, and where it lives | grade | the number |
|---|---|---|---|
| 1 | `quadpoint-identity-01.md` section 4: "`Sum capU = C - T + X` = #{composite members whose partner is `y`-rough}" | **REFUTED** on the right-hand description | the two counts agree at `K = 0` and `K = 1` and part from there; at the operative depth `K*` the gap is 11% (`Q = 313`) to **37%** (`Q = 9281`) of `Sum capU` |
| 2 | `quadpoint-prior-art.md` section 2.2: the Buchstab correction is "2% of that residual", residual quoted as `0.0144` at the top band | **REFUTED** | correction `0.000291`, top-band residual `0.004414`, ratio **6.6%**. The quoted `0.0144` is neither band's residual (top `0.004414`, bottom `0.018344`). The 2% figure is already in `TODO.md` Z2 |
| 3 | `attack-quadpoint-01.md` section 2: `Sum capU_0/C` is "smaller than the zone budget's `B/C -> 2` because lpf-freshness is built into `capU_0`" | **REFUTED** as an explanation | by the identity the ratio IS `1 - T/C + CC/C`; measured `CC/C` climbs `0.223 -> 0.622` and `T/C` falls `0.268 -> 0.041`, so the limit is 2 as well |
| 4 | `quadpoint-identity-01.md` section 1, the Lemma **as stated** | **WEAKENED**; the mathematics is **PROVEN** | the window convention is unstated and load-bearing: `Q'^2` is a CLOSE channel position at **1227 of 1227** anchors and `lpf(Q'^2) = Q'` is never in the anchor's pool |
| 5 | `quadpoint-identity-01.md` sections 2 and 3, `K*` and `y*` written unconditionally | **WEAKENED** | Z2's 2026-08-27 quantifier (`y*` exists iff `T >= 1`) is applied in `TODO.md` and is **not** applied in the note; three sentences still presuppose existence |
| 6 | `quadpoint-decade-prereg.md` escalation clause, "the SAME session extends to QMAX = 31607 ... under these same rules" | **REFUTED** as a pre-commitment | at the measured `max/mean = 1.47` the `B9-B10` band max forecasts to `~94` against `KCAP = 64`, and capped anchors are dropped from the band means by the scorer's `Kstar >= 0` filter, which biases READ-2 toward FALL-CONSISTENT |
| 7 | `attack-quadpoint-02.md` section 2, READ-2 fired as registered | **CONFIRMED**, and **WEAKENED** on power | no band moved: coded `0.051/0.041/0.031 +/- 0.012` equals the sealed text, band edges equal. But the admissible `m8` given the measured `m7` is `[0.019, 0.040]`, a factor **2.10** wide, and it contains the flat outcome `m8 = m7` |
| 8 | `attack-quadpoint-02.md` section 2, "no anchor approaches KCAP" | **WEAKENED** | `46 / 64 = 0.719` of the cap |
| 9 | `quadpoint-prior-art.md` section 3, Chen's switching principle as the partner condition's owner | **WEAKENED** | Lichtman's own definition of switching is switching the sifted SET; the partner condition follows from `A_p = {n : p \| n(n+2)}` plus Buchstab, which the note derives one paragraph earlier. Verdict ADJACENT-STANDARD is unaffected |
| 10 | `quadpoint-prior-art.md` section 7, "numerics in arXiv:2607.21883" | **WEAKENED** | the identifier is real (Weingartner, *Explicit bounds for Buchstab's function*, fetched and confirmed) but it appears in no query row, no section 5 artifact row, and no section 8 NOT-REACHED entry, while section 2.2 says the numerics are a session script |
| 11 | the capture identity itself, at every depth | **CONFIRMED** | holds at every `K` of 50 anchors under a wholly independent implementation; every proof clause checked separately over `Q = 7..401`, **0 violations in 14,789 pairs** |
| 12 | the depth-law band table, all 24 figures of `attack-quadpoint-03.js` SEC 2 | **CONFIRMED** | reproduced digit-for-digit by independent code and asserted |
| 13 | the crossing root `u* = 3.565845`, `1/u* = 0.280438` | **CONFIRMED** | re-integrated here at `h = 1e-5`, `u* = 3.565847`, with the closed-form control `3*omega(3) = 1 + ln 2 = 1.693147` |
| 14 | `attack-wrongdirection-audit.md` section 3.8's `s = u*/2 = 1.7829`, short by `2.393x` | **CONFIRMED** | `4.26645 / 1.78292 = 2.393` |
| 15 | `attack-roughpair-error.md` section 6's zero-parameter caveat, `3.92 -> 31.15` against `3.88 -> 31.22` | **CONFIRMED** as quoted | the measured column reproduces here; the main-term column is cited, not recomputed |
| 16 | `quadpoint-prior-art.md` sha256 custody, both artifacts | **CONFIRMED** | fetched fresh six days later: Ford `a6e8462f...`, Lichtman `1b64fc36...`, both byte-identical to the recorded values |
| 17 | the four Ford quotes and the Lichtman constant, at page level | **CONFIRMED** verbatim | one deviation: Lemma 3.8's "`A_p` does holds" is silently normalized to "does hold" inside a blockquote |
| 18 | the ABSENT-PER-CONVENTION verdicts, queries A4 and B1 | **CONFIRMED** | re-run on a channel calibrated in the same minutes (Kourbatov arXiv:1301.2242 returned first); same negatives, no new carrier |

Nothing in this pass opens a route, closes a route, or moves the wall. Twenty-one
import attacks in two days produced zero routes; this is not the twenty-second.

---

## 1. The most load-bearing correction: section 4 names the wrong object

`quadpoint-identity-01.md` section 4 is the wall statement, and it is the
sentence an analyst working TODO Z2 would take as the target:

> "`Sum capU = C - T + X` = #{composite members whose partner is `y`-rough}"

The middle equality is the Lemma and it is exact. The right-hand description is
not what `capU` counts. Each composite member `v` with `lpf(v) = r` is tested
against its own threshold `p_{min(K, idx(r))}`, not against a uniform `y = p_K`.
The two counts differ by #{both-composite pairs whose LARGER lpf is at most
`p_K`}, which is exactly the `r_1`-members that clause (iii) of the note's own
proof keeps unconditionally, whatever the partner's roughness.

Measured (companion SEC H, `Sum capU_K` against #{composite members with a
`p_K`-rough partner}):

| `Q` | `K*` | `Sum capU_{K*}` | the uniform count | gap |
|---|---|---|---|---|
| 313 | 5 | 249 | 222 | 10.8% |
| 809 | 16 | 322 | 242 | 24.8% |
| 1499 | 13 | 3610 | 2789 | 22.7% |
| 3001 | 19 | 6007 | 4374 | 27.2% |
| 9281 | 46 | 3709 | 2356 | 36.5% |

The two agree at `K = 0` and at `K = 1` (no both-composite pair has its larger
lpf at 7), which is presumably where the sentence came from, and part from
`K = 2` on.

**Corrected sentence, for section 4:**

> `Sum_r capU_K(r) = C - T + X(K)`, and that count is the number of composite
> members whose partner is rough beyond `min(p_K, the largest active below that
> member's own least prime factor)`. It is NOT the number of composite members
> with a `p_K`-rough partner: at the operative depth `K*` the two differ by 11%
> to 37% over `Q = 313..9281` [MEASURED, `redteam-0828-quadpoint.js` SEC H].

This does not move the wall. The exact object `C - T + X(K)` is unchanged, and
so is "certifying `floor >= 1` is proving `X(y) < T`". What changes is that a
bound on the uniform count is not a bound on `Sum capU`, and the difference runs
to a third of the total at the depth the certificate actually uses.

---

## 2. The correction that has already left staging: 2% is 6.6%

`quadpoint-prior-art.md` section 2.2 records the Buchstab correction and then
sizes it:

> "The identity note's measured band means climb `0.2624 -> 0.2763`, leaving a
> residual of `0.0144` against the candidate at the top band. The correction is
> **2% of that residual**."

Re-derived here (companion SEC F, own integrator, own root-find):

| quantity | value |
|---|---|
| candidate `1/(2e^gamma)` | `0.280730` |
| root of `u*omega(u) = 2` | `u* = 3.565847`, `1/u* = 0.280438` |
| the correction | `0.000291` |
| measured top-band mean of `ln y*/ln h` | `0.276316` |
| **top-band residual** | **`0.004414`** |
| bottom-band residual | `0.018344` |
| correction / top-band residual | **6.6%** |
| correction / bottom-band residual | 1.6% |

The quoted `0.0144` is neither residual. Whatever produced it, the arithmetic
`0.000291 / 0.0144 = 2%` is the only way to reach the stated figure, and against
the residual the note itself names, "at the top band", the answer is 6.6%.

**The number is in a live document.** `TODO.md` Z2 carries "which moves the
target only 2% of the measured residual". That is the one defect in this pass
that has already left the staging layer.

**Corrected sentence, for the prior-art note and for TODO Z2:**

> The Buchstab correction moves the predicted exponent DOWN by `0.000291`,
> which is 6.6% of the `0.004414` residual at the top band and 1.6% of the
> `0.018344` residual at the bottom [MEASURED]. It points the right way and it
> does not explain the drift; the finite-size model is still the open item.

The conclusion the note drew is unaffected: at 6.6% the correction is still an
order of magnitude short of the drift, and section 2.2's closing instruction
("anyone tempted to read the monotone climb as convergence-with-a-Buchstab-
correction should stop here") stands with the corrected number.

Two further notes on the same object. First, `quadpoint-prior-art.md` section 8
records the rule "`0.280438` is scratchpad-grade ... if it is ever quoted
outside this file it must first be re-derived inside [an embedded producer]".
`TODO.md` Z2 quotes it. The re-derivation is now on disk, in this red team's
companion, with an integrator control (`3*omega(3) = 1.693147` against the
closed form `1 + ln 2`), so the debt is discharged in substance; the companion is
a staging file, not a gated producer under `research/`, so a maintainer who
wants the number inside the gate still owes that move. Second, section 7's
proposed SEARCH-CONVENTIONS row attributes "numerics in arXiv:2607.21883". The
identifier is real (Weingartner, *Explicit bounds for Buchstab's function*,
confirmed by fetch this session) and it is directly on point, since explicit
bounds for `omega` would let `u*` be certified rather than integrated. It
appears in none of the note's own provenance structures. It should either move
to section 6 as a proposed PRIOR-ART entry with the fetch recorded, or come out
of the row.

---

## 3. The capture identity, checked line by line

### 3.1 The proof survives, clause by clause

Each clause of section 1's proof was checked as a separate predicate over every
non-twin channel pair of every anchor `Q = 7..401` (companion SEC B, 14,789
pairs, 0 violations):

- **(iii-a)** a composite member with a prime partner survives at every `K`:
  7,704 pairs, no exception. The reason is one line and is correct: a prime
  member of a pair inside `[Q^2, Q'^2)` exceeds every active, so no pool prime
  divides it.
- **(iii-b)** in a both-composite pair with lpfs `r_1 < r_2`, the `r_1`-member
  survives at every `K`: 7,085 pairs, no exception.
- **(iii-c)** the `r_2`-member survives if and only if `r_1 > p_K`, at every
  `K`: 7,085 pairs, no exception. The note's two-case split is consistent, and
  the direct argument is shorter: the `r_2`-member is killed iff
  `idx(r_1) <= min(K, idx(r_2))`, and `idx(r_1) < idx(r_2)` always, so the `min`
  never binds and the condition is `idx(r_1) <= K`.
- **equality is impossible**: `lpf(a) = lpf(a+2)` would force that prime to
  divide 2. Measured 0 occurrences.
- **(i) the bijection**, checked two ways rather than assumed: the candidate set
  built from the note's definition (`v = r*m`, `lpf(m) >= r`, full factorization
  of `m`, no square-root shortcut) and the candidate set built as `lpf(v) = r`
  agree elementwise, 0 disagreements over the 50 anchors, and the total equals
  `2*CC + mixed` at every anchor.

The identity `floor_K = T - X(K)` then holds at every `K` of all 50 anchors,
with the caps built from the literal definition by code that shares nothing with
`attack-quadpoint-03.js` beyond the arithmetic (companion SEC A). The cited
`K*` values reproduce: `Q = 809 -> 16`, `Q = 1499 -> 13`, `Q = 10007 -> 30`, and
the worst anchor `Q = 9281` reproduces in full, `T = 127`, `CC = 2357`,
`K* = 46`, `y* = 227`.

### 3.2 What the Lemma as written is missing

Step (i) rests on a parenthetical: "(finality: a composite in the window has its
least factor among the actives)". That is true and its proof is one line, but
the line is exactly where the window convention enters, and the Lemma statement
does not fix the convention. `C` is given as "capacity (channel pairs)" and
nothing says which pairs.

The convention is not cosmetic. Measured (companion SEC C): `Q'^2 mod 30` is a
CLOSE channel position at **1227 of 1227** anchors, and `Q'^2 - 2` is OPEN at
1227 of 1227, so `(Q'^2 - 2, Q'^2)` is a channel pair at every anchor. Its close
member is `Q'^2`, whose least prime factor is `Q'`, which is not in this
anchor's pool. Under the loose convention "`a + 2 <= hi`" the pair joins `C`
while its composite member is a candidate of no `r`, so `floor_K` moves by `+1`
and `T - X(K)` does not: the identity breaks by exactly one at every anchor
tested (12 of 12).

**Corrected Lemma statement, one clause added:**

> Fix anchor `Q`, the half-open stretch `S_Q = [Q^2, Q'^2)`, and let `C` count
> the channel pairs `(a, a+2)` with BOTH members in `S_Q`. Then for every `K`,
> `Sum_r capU_K(r) = (C - T) + X(K)`.
>
> [The convention is load-bearing. Every composite member of such a pair
> satisfies `lpf(v) <= sqrt(v) < Q'`, hence `lpf(v) <= Q`, which is step (i)'s
> finality. It fails at `v = Q'^2`, and `(Q'^2 - 2, Q'^2)` is a channel pair at
> all 1227 anchors, so admitting it breaks the identity by `+1`.]

`attack-quadpoint-03.js` implements the strict convention on both sides and is
consistent throughout; this is a defect in the written Lemma, not in the run.

### 3.3 Is the capture identity PROVEN as stated?

**No, and yes.** The mathematics is proven: the derivation is checkable, every
clause survives re-derivation, and the statement is verified at every depth of
every anchor by two independent implementations. As *written*, the Lemma is one
clause short of a proof, because it does not state the window convention its
step (i) requires. With the clause of section 3.2 added it is PROVEN,
elementary, and per `quadpoint-prior-art.md` section 3 it is standard sieve
bookkeeping to which no novelty language may attach.

### 3.4 The quantifier is applied in TODO and not in the note

`attack-wrongdirection-audit.md` section 3.2 and `TODO.md` Z2 both carry the
2026-08-27 catch: `y*(Q)` exists if and only if `T(Q) >= 1`, so the all-`Q`
asymptotic form of the depth law presupposes the conclusion. The note itself
does not carry it. Three sentences still read unconditionally:

- section 2, first bullet: "`K*(Q)` is a crossing point: the least `K` with
  `X(K) <= T - 1`". If `T = 0` there is no such `K`, since `X >= 0`.
- section 3: "the heuristic predicts no second death, with exponent margin
  `0.56 < 1`". "No second death at any `Q`" is "`T(Q) >= 1` at every large `Q`".
- section 3: "the forecasts for any future run are `y* ~ 336` at `Q = 31607`".

Confirmed on the data (companion SEC G): 0 of 1,227 anchors have `T = 0`, so the
measured band means live entirely on `{T >= 1}` and cannot test the quantifier.
The repair is the one `TODO.md` already states, and it is free: state the law on
the set where `T >= 1`.

### 3.5 Two smaller readings in section 3

The identity `(2*theta)^2 = 1/(4*rho(2))` is true and is a tautology: this
corpus defines `rho(2) = e^{2gamma}/4` (`GLOSSARY.md`, `G2-STATE.md` section 0's
neighbourhood), so both sides are `e^{-2gamma}` by definition. It is a
restatement, not evidence of a connection to the origin-excess family. Separately,
`rho` here is not Dickman's `rho` (Dickman's `rho(2) = 1 - ln 2 = 0.30685`), and
the prior-art note's section 7 rows are about to put this family in front of
readers who will assume Dickman. That collision belongs in the proposed
SEARCH-CONVENTIONS rows.

The derivation of the law itself is confirmed: `delta_R(y) = (15/4e^gamma)/ln y`
is Mertens over the actives divided by the channel density `4/15`,
`delta_P = (15/4)/ln h` likewise, the local product `kappa` cancels between
`X/C ~ kappa(delta_R - delta_P)^2` and `T/C ~ kappa*delta_P^2` because a prime
is automatically rough, and `delta_R < 2*delta_P` gives `ln y > ln h/(2e^gamma)`.
The correct main term replaces Mertens by Buchstab and gives `1/u*`, section 2
above.

---

## 4. `attack-quadpoint-01.md`

Section 1 (soundness), section 2's certificate list, and section 3's depth-cost
curve all reproduce exactly under independent code: the `K = 0` list is
`{7, 11, 13, 19, 23, 31, 37, 43}` and is precisely the `CC < T` list; max
`K* = 21` over the `K = 0`-dead anchors to 1499; band means `3.88 / 8.42 /
12.20` and `0.093 / 0.075 / 0.061`; band maxes `0.179 / 0.128 / 0.090`;
`Q = 809` needs `K* = 16`.

The one refuted sentence is section 2's explanation. `Sum capU_0/C` is, by the
identity, `1 - T/C + CC/C`. Measured (companion SEC I):

| band | `Sum capU_0 / C` | `CC/C` | `T/C` |
|---|---|---|---|
| [7, 97] | 0.955 | 0.223 | 0.268 |
| [101, 313] | 1.291 | 0.409 | 0.118 |
| [317, 997] | 1.415 | 0.496 | 0.080 |
| [1009, 1499] | 1.474 | 0.540 | 0.066 |
| [1500, 3163] | 1.515 | 0.570 | 0.055 |
| [3164, 5623] | 1.552 | 0.599 | 0.047 |
| [5624, 10007] | 1.581 | 0.622 | 0.041 |

`CC/C -> 1` and `T/C -> 0`, so the ratio tends to 2, the same limit as the zone
budget it was contrasted against. "Smaller ... because lpf-freshness is built
into `capU_0`" reads a finite-size value as a structurally smaller limit.

**Corrected sentence:** `Sum capU_0/C` climbs `0.955 -> 1.581` across bands to
`Q = 10007`. By the capture identity the ratio is `1 - T/C + CC/C`, so it tends
to 2, the same limit as the zone budget's `B/C`; lpf-freshness buys a slower
approach, not a lower ceiling [MEASURED].

---

## 5. The prereg and its scoring

### 5.1 No band moved after the seal

Read side by side, the sealed text and the scorer agree exactly. The prereg
registers `B6 = (1499, 3163]`, `B7 = (3163, 5623]`, `B8 = (5623, 10007]` and
forecasts `0.051 / 0.041 / 0.031`, all `+/- 0.012`. `attack-quadpoint-02.js`
line 252 codes `[1500, 3163]`, `[3164, 5623]`, `[5624, 10007]` and
`[0.051, 0.012]`, `[0.041, 0.012]`, `[0.031, 0.012]`. Same intervals on the
integers, same centers, same widths. READ-1's two bend conditions and READ-2's
monotone clause are coded as registered, the monotone clause more strictly than
the text requires. Every scored statistic reproduces here under independent
code: `m5..m8 = 0.061 / 0.050 / 0.040 / 0.032`, band maxes
`0.090 / 0.075 / 0.065 / 0.045`, `K*` band means
`12.20 / 16.88 / 23.34 / 31.22`, largest `K*` anywhere 46 at `Q = 9281`. The
registered trend line reproduces to `+/- 0.001` under either anchoring (ordinary
least squares on the three cited band means against `ln` of the geometric band
centers gives slope `-0.0165` against the registered `-0.0166`), well inside the
registered width. **CONFIRMED: no band moved.**

### 5.2 What READ-2 could not have failed

The registered half-width is `+/- 0.012` against forecasts of `0.051`, `0.041`,
`0.031`. Given the measured `m7 = 0.040`, READ-2's admissible `m8` is the
intersection of `[0.019, 0.043]` with `m8 <= m7`, that is `[0.019, 0.040]`, a
factor **2.10** wide, and it contains the flat outcome `m8 = m7 = 0.040`.
A plateau in the last band fires FALL-CONSISTENT.

**Corrected sentence, for `attack-quadpoint-02.md` section 2:** READ-2 fired as
registered, and the reading is weaker than it looks in two independent ways: a
plateau at `m8 = m7` lies inside the registered band, and (per
`attack-roughpair-error.md` section 6, cited) a zero-parameter main term passes
the same target to 0.2% at B8 [MEASURED].

### 5.3 The escalation clause is not executable under its own engine cap

The prereg pre-commits: if neither READ-1 nor READ-2 fires cleanly, "the SAME
session extends to QMAX = 31607 ... under these same rules, no new prereg". The
same prereg fixes `KCAP = 64` and fires READ-3 on any `K* > 64`.

Measured here: the largest `K*` to 10007 is 46, which is `0.719` of the cap, not
"nowhere near" it, and the `B8` max/mean ratio is `1.47`. The band-mean forecast
at `Q = 31607`, on the note's own candidate exponent, is `K* ~ 64`, so at the
measured max/mean the band MAX forecasts to `~94`, and at `Q = 100003` to
`~167`. Two consequences:

- READ-3 would fire at 31607 on the ENGINE CAP, not on a second death, and the
  prereg gives no rule for telling those apart.
- The scorer filters bands on `r.Kstar >= 0` (line 254), so an anchor whose
  `K*` exceeds `KCAP` is DROPPED from the band mean rather than entering it as a
  bound. Since the dropped anchors are the largest, the filter biases the READ-2
  statistic DOWNWARD, that is, toward FALL-CONSISTENT, exactly where the second
  death would first show. The prereg registers no rule for capped anchors in the
  means. On this run the filter never bit (no anchor exceeded `KCAP`), so the
  scored verdict stands as scored.

**Corrected sentence, for whoever writes the next prereg:** any run past
`Q = 10007` needs `KCAP` raised above the forecast band MAX, not the band mean
(at 31607 that is `>= 96`, at 100003 `>= 168`), and a registered rule for how a
capped anchor enters the band statistics; without both, READ-3 fires on the cap
and READ-2 is computed on a survivor-filtered set.

A third registered READ-3 trigger, "any anchor with no `K <= pool` achieving
`floor >= 1`", is not scored separately: the code's `overCap` boolean covers it
for `Q > 1499` and excludes it for `Q <= 1499`. Conservative in the right
direction on this run (both conditions raise the same flag, and v1 established
that every anchor to 1499 certifies), so no false quiet. WEAKENED, not refuted.

### 5.4 Custody, owed

`attack-quadpoint-02.md` and `attack-quadpoint-02.js` both assert the prereg was
"SEALED ALONE at commit `7800bd2` before the producer existed". The prereg file
does not and cannot record its own hash. The attestation therefore comes from
the party being scored, and no git command was run in this pass, by instruction.
**The custody check is owed to the primary agent**: confirm `7800bd2` exists,
that its tree touches `quadpoint-decade-prereg.md` and nothing else, and that it
precedes the first commit containing `attack-quadpoint-02.js`. Everything else in
section 5 holds regardless of how that check comes out; the seal is what makes
READ-2 a prereg rather than a fit.

---

## 6. The prior-art note at page level

Both artifacts were re-fetched this session and hashed. Ford,
`ford126.web.illinois.edu/sieve2023.pdf`, HTTP 200, 944,592 bytes, sha256
`a6e8462f1e76606614e5c2891b419515be408d5f11f0b82915f5c24e05c00e06`. Lichtman,
`msp.org/ant/2025/19-1/ant-v19-n1-p01-p.pdf`, HTTP 200, 1,754,823 bytes, sha256
`1b64fc36e8a73993ae221505b8c87e27f6c9d01679efc15ee4b8aedf0a85327c`. Both are
byte-identical to the values `quadpoint-prior-art.md` section 5 recorded on
2026-08-22, and the Lichtman hash also matches what `attack-lichtman-decomp.md`
and `lit-wu2004.md` recorded independently. **Custody CONFIRMED.**

**Citation 1, Ford section 1.7.2 and section 3.0.1.** Both quotes are verbatim.
Section 1.7.2 reads "Take `A = [1, x] ∩ Z`, `X = x`, `A_p = {n ∈ A : p|n(n+2)}`.
Here `S(A, sqrt(x) + 2)` counts the number of twin prime pairs", and the
extraction displaces the radical in a way that invites reading `X = sqrt(x)`;
the note read it correctly. "this is a sieve problem of dimension 2 (or sifting
density 2)" is verbatim. Section 3.0.1's quote is verbatim including its closing
clause, and `z = x^{1/7.9}` is the section's own exponent. One trap worth
recording: an almost identical sentence sits near section 1.7.2 at `x^{1/8}`
with different wording, and matching the quote against THAT passage produces a
false refutation. This pass produced that false refutation and then checked the
disk, which is the standing campaign rule.

**Citation 2, `u*omega(u) = 2` and `u* = 3.565845`.** Not a literature citation:
the note marks it scratchpad-grade and it is. Re-derived here on an independent
integrator, `u* = 3.565847`, `1/u* = 0.280438`, with the closed-form control.
CONFIRMED, and the "2%" that sizes it is REFUTED, section 2 above.

**Citation 3, Lichtman's `pi_2 <~ 3.29956*S`.** CONFIRMED at page level.
Theorem 1.2 extracts as `π2(x) ≲ 3.299565(x)` where the trailing `5` is the
Fraktur `S`, so the constant is `3.29956` and the note parsed it correctly.
Table 1's chronology matches the note's transcription row for row, Brun 1919
through Wu 2004 `3.39951`. "The last of which moved it by 2.94%" is Lichtman's
own sentence, verbatim, and the arithmetic `3.5*(1 - 0.0287117) = 3.399509`
reproduces. Two trivia: Table 1 stops at Wu 2004, so the Lichtman row the note
appends is Theorem 1.2 rather than a table entry, and the paper carries both
`x^{7/12}` (the level at which Lemma 6.4 is applied in the final step) and
`x^{10/17}` (the reach of the modified sieve), so section 6's proposed
PRIOR-ART wording "lands the current level-of-distribution record `x^{10/17}`"
needs the qualifier the note itself already flags as unresolved.

**Citation 4, Chen's switching principle as the identity's owner.** WEAKENED.
Lichtman's own description of switching, on the page, is "use a weighted sieve
inequality to split the problem into multiple cases, apply sieve bounds to
`A = {p + 2 : p <= x}` in certain cases, and then reinterpret the remaining
cases as new sieving problems for switched sets `B`". That is switching the
sifted SET. The capture identity switches nothing: the partner condition is
already inside `A_p = {n : p | n(n+2)}`, and reading `min(lpf(a), lpf(a+2))` is
Buchstab's identity for that dimension-2 problem, which is what the note's own
preceding paragraph says. The Ford Lemma 3.8 attribution carries the whole
weight; the switching attribution is an analogy, and it is the one the note's
section 7 would install as canonical. The verdict, ADJACENT-STANDARD with no
verbatim carrier and no novelty language, is unaffected.

**The absences, re-run.** Channel calibrated in the same minutes: the query
`Kourbatov maximal gaps between twin primes arXiv 1301.2242` returned
arXiv:1301.2242 on the first flip. Query A4 (the dimension-2 sifting function
against the twin count) returned Ford's notes as the top hit and no comparison,
which is the note's own recorded result. Query B1 (`u omega(u)` equal to 2 as a
threshold) returned the Buchstab function's definition and nothing else, and an
extra flip on the numeric value `3.5658` returned Gafni-Tao and general rough
number material, no threshold statement. **Both ABSENT-PER-CONVENTION verdicts
reproduce.** Worth exactly what an absence is worth: MathSciNet was not
exercised in either pass, Halberstam-Richert and *Opera de Cribro* stayed
unreached, and the census ladders are still not embedded, so the OEIS
prohibition in section 1.3 still binds.

---

## 7. Ledger and gate

This note carries the block required by `research/qc/questions.js`. The TODO
side of the guard is NOT satisfied and cannot be from inside this fence: items
Z0 and Z2 need a line `Ledger: Q-redteam-0828-quadpoint` (alongside whatever
other ids they already own) before `node research/qc.js --index` will pass
without flagging this note. `research/qc.js` was not run here, by instruction.
The four target notes carry no ledger block of their own, which is correct for
2026-08-22 documents since the mechanism dates from 2026-08-28; they appear in
`QUESTIONS.md` under "unindexed".

---

## 8. NOT REACHED

- **The git custody of `7800bd2`** (section 5.4). No git command was run.
- **The identity at every depth of all 1,227 anchors from the literal
  definition.** Verified here at 50 anchors; the full sweep is
  `attack-quadpoint-03.js`'s own assertion and was cited, not recomputed, per
  the standing compute rule.
- **Evans arXiv:2102.12297 at page level.** Still the highest-value unread item
  for the depth law, exactly as `quadpoint-prior-art.md` section 8 says. Not
  read here.
- **Weingartner arXiv:2607.21883 at page level.** Fetched only far enough to
  confirm the identifier resolves to *Explicit bounds for Buchstab's function*.
  Whether its bounds certify `u* = 3.565845` was not checked and is the cheapest
  route to putting that constant inside the gate.
- **`attack-roughpair-error.md`'s main-term column** (`3.92 -> 31.15`) was cited,
  not recomputed. Only the measured column was reproduced here.
- **The dimension-2 Buchstab correction for `S(A, x^{1/u})`.** Unfound and
  underived, as before. The product form is still validated at exactly one
  point, `u = 2`.
- **`destroyer-census-01.md`, `stretch-01.md`, `records-placement-01.md`.**
  Z0 owes passes on those three and this note does not touch them.

---

## 9. What would falsify this, and whether that check has run

| claim of this note | what would falsify it | has it run |
|---|---|---|
| the capture identity holds under the strict convention | one anchor, one `K`, with `floor_K != T - X(K)` under an implementation built from the definition | **RUN**: 50 anchors, every `K`, two independent candidate constructions, 0 failures. Not run for all 1,227 from the literal definition |
| the identity fails under the loose convention | an anchor where admitting `(Q'^2 - 2, Q'^2)` leaves the identity intact | **RUN**: breaks at 12 of 12 tested; the channel-position fact holds at 1227 of 1227 |
| section 4's gloss is wrong by 11-37% at `K*` | the two counts agreeing at `K*` at any anchor | **RUN**: 6 anchors, gap `0.108` to `0.365` of the total |
| the correction is 6.6%, not 2%, of the top-band residual | a different definition of "residual at the top band" giving `0.0144` | **NOT RUN as a search**; both natural readings give `0.004414` and `0.018344`, and the note's own words say "at the top band" |
| `u* = 3.565845` | an integrator disagreeing past `1e-5` | **RUN**: independent delay-equation integration, agreement to `2e-6`, closed-form control at `u = 3` |
| no prereg band moved | a coded band or half-width differing from the sealed text | **RUN**: read side by side, identical |
| the escalation tier exceeds `KCAP` | `K*`'s max/mean ratio collapsing above 10007 | **NOT RUN.** The forecast uses the measured `1.47` and the candidate exponent; nothing above `Q = 10007` was computed, and the prereg forbids it without a fresh width audit |
| `Sum capU_0/C -> 2` | `CC/C` failing to approach 1 | **PARTIALLY RUN**: monotone `0.223 -> 0.622` over two decades, which is a trend, not a limit. The limit follows from the identity plus `T/C -> 0`, which is Hardy-Littlewood-grade, not proven here |
| the sha256 custody | a fresh fetch differing | **RUN**: both artifacts byte-identical six days later |
| the ABSENT-PER-CONVENTION verdicts | a carrier surfacing on a calibrated channel | **PARTIALLY RUN**: 2 of 18 recorded queries re-flipped, plus 1 new flip. MathSciNet still unexercised in both passes |
| the `7800bd2` seal | the commit not existing, or containing more than the prereg | **NOT RUN**, by instruction. Owed to the primary agent |

---

*Producer and custody: `research/history/staging/redteam-0828-quadpoint.js`,
embedded, `--check` bit-honest, one forced stamp disclosed (0 of 157 figures
changed). Cited, never recomputed: `attack-roughpair-error.md` section 6's
main-term column, `attack-quadpoint-03.js`'s all-anchor identity assertion, the
`beta_2 = 4.26645` constant, `TODO.md` Z2's applied corrections. History layer:
process record, staging. See `research/history/CHANGELOG.md` for the corpus
rule.*
