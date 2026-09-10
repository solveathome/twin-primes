# Red team, 2026-08-30: the two TODO-1d notes — the sign lemma, the K → β_bound map, and the six δ-readers, re-derived on independent code

<!-- ledger
id: Q-redteam-0830-fekete
status: ANSWERED
todo: 1d
question: Do the load-bearing claims of attack-0829n-hsubpow-K.md (the sign lemma, the K -> beta_bound map, the zone, the TODO.md base-16 correction) and measure-0830-delta-reader.md (the six pre-registered readers, their kill gates, the joint fit's calibration, the RB circularity argument) survive independent re-derivation, and are the two live-doc corrections they caused the right sentences?
verdict: Every number in both notes reproduces on independently written code (all 14 cells of the beta_bound / K_min table, all 48 cells of the reader-calibration table, all 24 figures of the real-control table, the margins, the sups, the 5.607 correction, the 10-of-81 count), and the sign lemma is re-proven as stated for continuous exact laws. Two claims are WEAKENED and one live-doc sentence needs a qualifier: the sign lemma's constant 1.0597 loses 43% of its value if the base floor moves from 2 to 3 and its whole shape fails for the stepped law that a primorial ladder must present, where beta re-enters the sup and a delta = 0 law already needs K = 1.37 at beta = 2, inside the trap; and TODO.md 1d's "the sign of delta is unreadable for G2 at reach 79 by any instrument tried" is wrong on the letter, since reader RB passed all four pre-registered criteria and read delta_hat = +0.80 +- 0.09, the note voiding it post-hoc on a circularity the pre-registration flagged but did not make a kill criterion; the honest sentence adds "non-circular". No claim in either note is refuted.
-->

*(Internal, HELD under the publication moratorium. Adversarial re-derivation
only: no existing file was edited, no script in `research/` was touched, no git
command was run. This note and `redteam-0830-fekete.js` are the only two files
written. Calibration markers follow `CLAUDE.md`.)*

## 0. VERDICT

**Three caveats, first.**

1. **Nothing here reopens anything, and nothing here moves the wall.** Both
   notes' own verdicts (no `K` proven at any base; `δ`'s sign unread) survive.
   The corrections below are to a constant, to a hypothesis's scope, and to one
   sentence already in `TODO.md`.
2. **The sign lemma's hypothesis is empty for the object it is about.** The
   lemma is stated for `Ĝ(n) = c·n^β·(ln n)^δ` *exactly*. `Ĝ` is a step
   function — `Ĝ(3) = Ĝ(4) = 6` on the trusted ladder — and a strictly
   increasing continuous law cannot equal it at two consecutive integers. The
   lemma is therefore a conditional whose antecedent no `G₂`-shaped object
   satisfies. Both notes are honest about the "exact law" qualifier; what
   neither says is that the qualifier excludes `Ĝ`. Its consequences are
   quantified in §2 and they are not small: for the *stepped* law that a
   primorial-indexed ladder can present, `β` re-enters the sup, the attainment
   point moves off `(2,1)`, and a `δ = 0` law with `β = 2` already needs
   `K = 1.3658`, **inside the trap `[1.0033, 1.3946)`** where the continuous
   lemma prices it at `K = 0`.
3. **The `δ < 0` truth gap is real and unreachable.** `D(b,1) = |δ|(ln ln b −
   ln 2)` for the continuous law, so exceeding the zone ceiling `K = 11.3568`
   needs `b > exp(1.711e+5)` at `δ = −1` and `b > exp(4.197e+49)` at
   `δ = −0.1`. "False for every finite `K`" is correct mathematics and is
   unfalsifiable by any computation, at any reach, ever. That belongs in the
   sentence wherever the truth gap is quoted.

**What reproduced.** All 14 cells of `attack-0829n-hsubpow-K.md` §1b's
`β_bound(K)` / `K_min(β)` table with their argmin and argmax bases; the zone
`[1.3946, 11.3568)` as exactly `[K_min(2), K_min(β₂))`; the reachable-pair
counts 15 / 9 / 15 / 29 and the sups `1.0033 (4,2)`, `0.9694 (2,4)`,
`0.6931 (9,1)`, `0.9478 (10,1)`; the control's `+0.2546`-nat sup movement,
whose closed form is `ln(258/200)`; the margins `10.3535` and `0.3913`;
`max S(n) = 1.3946`; the base-16 reading `5.6072` at the corrected ceiling and
base 82 as the binding base there; the `10 of 81` count at `K = 11`. From
`measure-0830-delta-reader.md`: **all 48 cells** of §4a (six readers × four
`δ` × two geometries) and **all 24 figures** of §4c (six readers × two reaches,
value and standard error), to `5e−4`, on readers rebuilt from the note's §3a
definitions rather than copied. The noise study replicates on a different
generator and seed.

**The two verdicts asked for, per note.**

> **`attack-0829n-hsubpow-K.md`: STANDS, with the sign lemma WEAKENED in
> scope.** Every number is right. The lemma's *iff* — finite all-bases `K` for
> `δ ≥ 0`, divergence for `δ < 0` — is re-proven here and survives stepping.
> Its *constant* does not: `1.0597 = ln 2 − ln ln 2` loses 43% of its value the
> moment the base floor moves from 2 to 3 (`1.059660 → 0.599099`), and from
> `b ≥ 16` it is negative. Base 2 is where an asymptotic law is a formal
> extension (`ln ln 2 = −0.3665 < 0`). §3b's third bullet, which prices `K` against the
> trap using `1.0597`, is the one place the constant is load-bearing, and it is
> already flagged **[HEURISTIC]** there. The §5 rider for oscillating
> corrections, `K ≤ ln(c₂/c₁²) + 1.0597δ`, is re-derived and holds.

> **`measure-0830-delta-reader.md`: STANDS on every measurement, WEAKENED on
> the sentence it exported.** The four power-chain readers do read the wrong
> sign at true `δ = +1` on stepped laws, in both geometries, on independent
> code; and the failure is the **stepping**, not the integer rounding
> (unrounded stepped laws read within `0.05` of rounded ones, while the
> continuous law returns `−δ` exactly). But a reader **did** pass all four
> pre-registered gates and **did** read a sign: RB, `δ̂ = 0.8024 ± 0.0875`,
> positive at more than two standard errors. The note voids it for circularity;
> the pre-registration flagged the circularity in §3a and *did not make it a
> kill criterion*, so the void is post-hoc. So `TODO.md` 1d's exported sentence
> is wrong on the letter and right in substance: it needs "non-circular".

---

## 1. CLAIMS TABLE

Every row: the claim as quoted with its file and line, what independent
re-derivation returned, the verdict, and — where the verdict is not STANDS —
the replacement sentence. Producer sections in the last column.

### 1a. `attack-0829n-hsubpow-K.md`

| # | claim, quoted, with `file:line` | re-derivation | verdict | replacement sentence | SEC |
|---|---|---|---|---|---|
| A1 | "`D(b,k) = −ln c + δ[ln((k+1)/k) − ln ln b]`" (`attack-0829n-hsubpow-K.md:299`) | identity to `2.35e−13` over 900 cells of `(b,k,c,β,δ)`; `β` cancels exactly | **STANDS** | — | B |
| A2 | "`sup_{b≥2, k≥1} D(b,k) = δ(ln 2 − ln ln 2) − ln c = 1.0597δ − ln c` … attained at `(b,k) = (2,1)`, if `δ ≥ 0`" (`:300-301`) | exhaustive scan `b ≤ 1e5`, `k ≤ 60`, `δ ∈ {0, ¼, ½, 1, 2}`: argmax `(2,1)` in every case, value `= 1.059660δ` to `1e−9` | **STANDS** | — | B |
| A3 | the same sup, read as a number about `Ĝ` | `sup_{b≥b₀}` is `ln 2 − ln ln b₀`: `1.059660` at `b₀ = 2`, `0.599099` at 3, `0.366513` at 4, **negative** from `b₀ = 16`. Moving the floor from 2 to 3 removes 43% of the constant; at `b = 2`, `ln ln 2 = −0.3665` and the asymptotic law is a formal extension | **WEAKENED** | "the constant `1.0597` is `ln 2 − ln ln 2`; restricted to `b ≥ 3` it is `0.5991`, a 43% drop, and from `b ≥ 16` it is negative, so the all-bases price is set entirely by the smallest bases, where an asymptotic law is least believable" | B |
| A4 | "`= +∞` if `δ < 0`, the `k = 1` rung diverging as `b → ∞`" (`:301-302`) | correct; rate is `|δ|(ln ln b − ln 2)`. Exceeding `K = 1.3946` needs `b > exp(8.07)` at `δ = −1` but `b > exp(2.279e+6)` at `δ = −0.1`; exceeding `K = 11.3568` needs `b > exp(1.711e+5)` at `δ = −1`, `b > exp(4.197e+49)` at `δ = −0.1` | **STANDS**, with a caveat owed | add: "the divergence is at rate `ln ln b`; no reachable base, and no base any proof would name, exhibits it" | B |
| A5 | the case `δ = 0` (the brief's question) | `D ≡ −ln c` on **every** `(b,k)`, checked flat to `1e−12` over 2000 bases × 30 rungs; so `K = max(0, −ln c)` serves and `K ≥ 0` of the hypothesis is satisfiable | **STANDS**; the lemma's formula gives the right answer at the boundary | — | B |
| A6 | "for **all** integers `b ≥ 2`" versus "all bases `b ≥ 2`" (the brief's question) | no difference: over real `b ≥ 2` the sup is the same, attained at `b = 2`. The quantifier is load-bearing only *below* 2: over real `b > 1` the sup is `+∞` for **every** `δ > 0` (`D(1.001,1) = 7.601` at `δ = 1`) | **STANDS** as written | — | B |
| A7 | the lemma applied to `Ĝ` at all | `Ĝ(3) = Ĝ(4) = 6` on the trusted ladder: a strictly increasing `c·n^β(ln n)^δ` cannot equal a step function at two consecutive integers, so **no `G₂`-shaped object satisfies the hypothesis** | **WEAKENED** (vacuous antecedent, not a false claim) | "for an exact power-log law — a shape `Ĝ` itself cannot have, being a step function — the all-bases hypothesis holds with finite `K` iff `δ ≥ 0`" | C |
| A8 | the lemma read as a guide to what `Ĝ` needs | for the **stepped** law `Ĝ(n) = c·P(n)^β(ln P(n))^δ`, `β` re-enters the sup, which moves off `(2,1)`. At `δ = 0`, `c = 1` the sup is `0.6829 (β = 1)`, `1.0243 (1.5)`, `1.3658 (2)` against the continuous lemma's `0`; the `β = 2` value sits **inside the trap `[1.0033, 1.3946)`**. At `δ = 1` the stepped sup runs `1.1216` to `1.5549` against `1.0597`. The *iff* survives stepping; the constant and the attainment point do not | **WEAKENED** | "for the stepped law a primorial ladder presents, the sup is not `1.0597δ − ln c` and is not attained at `(2,1)`: `β` re-enters, and the stepping alone contributes up to `1.37` nats at `δ = 0`, the width of the trap window itself. The sign condition survives; the pricing does not" | C |
| A9 | "`K ≤ ln(c₂/c₁²) + 1.0597δ` for `δ ≥ 0`" for oscillating corrections (`:417-419`) | re-derived and verified over 3 constant pairs × 3 `δ` × 499 bases × 8 rungs | **STANDS** | — | B |
| A10 | the whole `β_bound(K)` / `K_min(β)` table, 14 cells with argmin / argmax bases (`:129-139`) | every cell agrees to `5e−5` and every argmin / argmax base agrees, recomputed from the 22 trusted terms (A144311 + 1, re-parsed here) | **STANDS** | — | D |
| A11 | "the trusted legal zone `[1.3946, 11.3568)` … is exactly `[K_min(2), K_min(β₂))`" and "`β_bound(K) ≥ 2` for every `K ≥ 1.3946`, by construction" (`:143-148`) | both hold; the guard is monotonicity of `β_bound` plus `β_bound(1.3946) = 2.0000` | **STANDS** | — | D |
| A12 | "The argmin base is 16 only at `K = 1.0033`, 66 at `1.3946`, 78 at `2`, and 82 for every `K ≥ 3`" (`:46-48` §0; `:149-150` §1b) | argmin switches `2 → 4 → 6 → 16 → 66 → 78 → 82` at `K = 0.4055, 0.5782, 0.6293, 1.2791, 1.7507, 2.3566`. "82 for every `K ≥ 3`" holds and is true from `2.3566`. **"16 only at `K = 1.0033`" is an interval**, `K ∈ [0.6293, 1.2791)` | **WEAKENED** (wording) | "the argmin base is 16 for `K ∈ [0.6293, 1.2791)`, 66 for `[1.2791, 1.7507)`, 78 for `[1.7507, 2.3566)` and 82 for every `K ≥ 2.3566`" | D |
| A13 | "TODO 1d's formula `β ≤ (ln 66 + K)/ln 16` reads `5.607` at the corrected ceiling, above `β₂`; base 82 carries the bound there, not base 16" (`:77-79`, `:443-445`) — **this correction is APPLIED at `TODO.md:633-635`** | `f(16) = ln Ĝ(16) = ln G₂(13#) = ln 66 = 4.189655`, so "ln 66" is `f(16)`, correctly. `(ln 66 + 11.3568)/ln 16 = 5.6072 > β₂ = 4.26645`. `β_bound(11.3568) = 4.2665` at argmin `b = 82` | **STANDS**; the applied live-doc correction is arithmetically right and names the right binding base | — | D |
| A14 | "at `K = 11` only 10 of 81 reachable bases (from `b = 72`) convert a one-base `K` into `β < β₂`" (`:81-83`); §4a's "`b ≥ 72` at `K = 11`, `b ≥ 49` at `K = 10`, `b ≥ 16` at `K = 7.6394`, any `b` at `K ≤ 2`" (`:341-342`) | the count 10 is right and 72 is the smallest, but the set is `{72, 74, 75, …, 82}`: **`b = 73` does not convert** (the ladder steps at 73). So "`b ≥ 72`" is not the set. Other counts: 81 of 81 at `K = 2`, 65 from `b = 16` at `7.6394`, 34 from `b = 49` at `10` | **WEAKENED** (the count stands, the parenthesis does not) | "at `K = 11` only 10 of 81 reachable bases convert, the set `{72, 74–82}`; `b = 73` fails because the ladder steps there" | D |
| A15 | the margins "`10.3535` nats at `K = 11.3568` and `0.3913` at `K = 1.3946`" (`:68-69`, `:194`) | both are `K − sup D` with `sup D = 1.0033` at `(4,2)` over 15 pairs; reproduce to `5e−5` | **STANDS** | — | E |
| A16 | the sups `1.0033 (4,2)` trusted, `0.9694 (2,4)` custody, and 15 / 9 reachable pairs (`:188-190`) | reproduce exactly | **STANDS** | — | E |
| A17 | the control readings "`+0.5157 ± 0.1969`" on 16 bases and "`+0.5298 ± 0.3018`", "`+0.0961 ± 0.4137`" for `G₂` (`:60-62`, `:227-229`) | reproduce digit for digit on an independently written OLS | **STANDS** | — | F |
| A18 | "the sup moved `+0.2546` nats when the reach grew from 82 to 312" (`:200-201`) | `0.9478 − 0.6931 = 0.254642`, whose closed form is `ln(258/200) = ln 1.29`: the movement is the ratio of two single control terms, `h(97#)/h(79#)` against `h(7#)²` cancelling, not an average over 29 pairs | **STANDS**, and is sharper than stated | optional: "the movement is exactly `ln 1.29`, one term against one term" | E |
| A19 | "`max_n S(n) = 1.3946` at `n = 66`" (`:177`) | `max ln(n²/Ĝ(n)) = 1.3946` on `[2,82]`; it is the same number as `K_min(2)` by algebra, which the note's own §1b implies and does not say | **STANDS** | — | E |

### 1b. `measure-0830-delta-reader.md`

| # | claim, quoted, with `file:line` | re-derivation | verdict | replacement sentence | SEC |
|---|---|---|---|---|---|
| B1 | "PRE-REGISTRATION (written before any reader ran on any ladder)" (`measure-0830-delta-reader.md:150`) and the kill gates | **not verifiable from the artifacts, and I did not run git.** What *is* checkable, and checks out: the gate is mechanical, not tabled. In `measure-0830-delta-reader.js` the `pass` table is filled by computation inside the SEC D and SEC E loops (`:237-249`, `:281-286`), SEC F reads it and branches to `'G2 reading withheld'` (`:302-317`), and the criteria constants live in `GEOM` before the loop. Two tuning tests: the S1 tolerance `0.5` **kills the note's own preferred reader RD** (miss `0.6547` at `δ = 2`), which is not what a tolerance chosen after the fact would do; and the chain readers fail on **sign**, which is tolerance-free | **STANDS** on the mechanics; **UNCHECKED** on the temporal order | flag as: "the gate is mechanical and the tolerance is not tuned in the author's favour; the writing order is attested by the note, not verified here" | F |
| B2 | "Every power-chain reader reads a negative `δ̂` at true `δ = +1` in both geometries" (`:255-257`); the whole 48-cell §4a table (`:245-252`) | **all 48 cells reproduce to `5e−4`** on readers rebuilt from the §3a definitions. R0, RA, RC2, RC all read negative at `δ = +1` in both geometries, 8 of 8 | **STANDS** | — | F |
| B3 | "the `P(n)` stepping at `b^k` is fatal to the chain family at these reaches, not a correction to it" (`:257-258`) | isolated here: stepped **without** integer rounding, R0 reads `−1.1743, −0.3347, −0.2810, −2.1162` (control geometry) against `−1.1700, −0.3398, −0.2948, −2.1178` rounded, and the continuous law returns `−δ` exactly. The rounding contributes `< 0.05`; the stepping contributes all of it | **STANDS**, and the attribution is now separated | — | F |
| B4 | the stepping model itself — "a ladder can only present a *stepped* law (`Ĝ(n) = V(P(n))`)" (`:38-40`) — is it the right model? | Yes, and it is forced. `Ĝ(n) = G₂(P(n)#)` is constant between consecutive ladder primes by definition, so any law it satisfies is a law at primes plus a step. The synthetic construction `V_i = max(2, round(c·p_i^β(ln p_i)^δ))` at the *ladder's own* primes, then stepped, is that shape. The model choice this note makes and does not flag: the law is put on `p`, not on `θ(p) = ln p#`; over the reach `ln p#/p ∈ [0.69, 1.13]`, so the two conventions differ by an `O(1)` factor that a `δ` fit can absorb into `c` only to first order. Not measured here | **STANDS**, one modelling choice unflagged | add to §6 NOT REACHED: "the law is placed on `p`; the `θ(p)` convention was not tried" | F |
| B5 | "RD is calibrated within `0.07` for `δ ∈ {−1, 0, 1}` at 64 terms" (`:258-259`), "largest miss `0.071`" (`:366`) | misses are `0.0185`, `0.0104`, `0.0709`. "Largest miss `0.071`" is right; "within `0.07`" is `0.0709`, off by `0.0009` | **STANDS** (the falsifier table's figure is the exact one) | in §0 read `0.071`, not `0.07` | F |
| B6 | "RD … failing S1 on the letter; it is carried forward as the one non-circular calibrated reader" (`:259-261`), and its control reading `−0.38 ± 0.14` used as the note's headline (`:46-49`) and exported to `TODO.md:663-665` | RD misses `δ = 2` by `0.6547` against tolerance `0.5`: **RD is a reader the pre-registration killed.** The kill rule (`:224-228`) withholds a killed reader's `G₂` reading, which the producer does, but says nothing about its *control* reading, which is quoted everywhere. The reading itself reproduces exactly: `−0.3837 ± 0.1404`, `n = 62`, and RD's own `β̂ = 1.3838` | **WEAKENED** (a rule-bend, not an error) | "the joint fit RD, which resolves `δ = ±1` at 64 terms but misses `δ = 2` by `0.655` and is killed by S1 on that ground, reads the control `−0.38 ± 0.14`" | F |
| B7 | the whole 24-figure §4c real-control table (`:275-282`) | every value and every standard error reproduces to `5e−4`, at both reaches, on independent OLS; RD's `β̂ = 1.3838` and RC's `1.4687` reproduce (`1.384`, `1.469` as printed) | **STANDS** | — | F |
| B8 | "RB … passed all four criteria" and "it is **void as evidence on the sign of `δ`**" (`:301-322`) | RB is confirmed the **only** reader passing C1 and C2 on the control, and on `G₂` at `β̂ = 1.50` it reads `δ̂ = 0.8024 ± 0.0875`, `n = 20`: positive at more than two standard errors. The circularity is real — `∂δ̂/∂β̂ = −2.8949`, `corr(ln p, ln ln p) = 0.9902`, and the bracket `[1.3, 1.8]` spans `+1.381` to `−0.066` — but the pre-registration only **flagged** it (`:176-178`), never made it a criterion, and its own kill rule says a reader passing all four "is reported on `G₂`, as MEASURED" | **WEAKENED**: the voiding is correct in substance and post-hoc in procedure | "one pre-registered reader, RB, passed all four gates and returned `δ̂ = +0.80 ± 0.09`; its sign is algebraically the sign of `β_raw − β̂` and `β̂` comes from an argument that assumes a positive log power, so the reading is treated as void — a disqualification the pre-registration flagged but did not register as a kill criterion" | G |
| B9 | "The zero crossing sits at `β̂ = 1.777`, which is the raw log-log slope of the same 20 terms … to three places, **as the collinearity says it must**" (`:312-315`) | crossing `= S_uy/S_ux = 1.777190`; raw slope `= S_xy/S_xx = 1.777143`; difference `4.71e−5`. These are **different estimators** (an instrument ratio against an OLS slope); `S_uy S_xx = S_xy S_ux` is no identity. Collinearity `0.9902` makes them close; it does not force equality | **WEAKENED** (the "must") | "the crossing `1.77719` and the raw slope `1.77714` agree to three places; they are different estimators and the near-collinearity explains the agreement without forcing it" | G |
| B10 | "misses ≤ 0.07 at `δ ∈ {−1,0,1}`, 64 terms" as a *calibration* claim, and S3's "RD resolves `δ = ±1` with `P(sign right) = 1.00` … sd `0.16` at 64 terms, `0.32` at 22" (`:264-267`) | replicated on a different generator (xorshift32) and a different seed, 400 draws, `sd = 0.055`: RD `P = 1.00` in both geometries, sd `0.1499` and `0.3436`; RB `P = 1.00`, sd `0.0259`, `0.0468`; R0 `P = 0.00` and RC `P = 0.43` at `δ = +1`, inside the note's "`0.00` to `0.45`" | **STANDS** | — | H |
| B11 | the exported live-doc sentence: "`δ`'s sign for `G₂` is unreadable at reach 79 by any instrument tried" (`:333-334`), applied at `TODO.md:667-669` as "the sign of δ is unreadable for G₂ at reach 79 by any instrument tried" | **wrong on the letter.** One instrument tried — RB — passed every pre-registered gate and read a sign, positive at `2.3 se`. The note's own §0 says so ("the one reader that passes does so by importing the exponent"); the sentence that reached `TODO.md` dropped that half | **WEAKENED**; the substance is right and the qualifier is missing | `TODO.md` 1d should read: "the sign of δ is unreadable for G₂ at reach 79 by any **non-circular** instrument tried; the one reader that passed the gate, RB, returns the sign of the exponent correction that was put into it" | G |
| B12 | §1's correction of the brief: the control's `δ` is not known to be 2, only conjectured `x(log x)^{2+o(1)}` with `o(1)` unconstrained (`:87`) | not re-checked at the literature here (no fetch was made); it is a strictly *weakening* correction to the note's own earlier position, and it is applied consistently — C1 demands only the sign | **UNCHECKED** at source, consistent internally | flag as CITED-not-verified in this pass | — |
| B13 | §3b's "Pre-declared expectation": that no reader may pass C1 and the failure would be the object's (`:231-237`), scored as having happened (`:293-297`) | the outcome matches the expectation. As evidence this cuts both ways: a pre-registration that names the outcome it then observes is a *prediction confirmed*, and it also means the kill carries no independent information about the readers. RB passing C1 is, strictly, a partial miss of that expectation, since it says "*no* reader passes C1" | **WEAKENED** | "the pre-declared expectation held for five of the six readers; RB passed C1, so 'no reader passes' is the expectation for the non-circular readers only" | F |

---

## 2. The one finding that is not a wording fix: the two notes disagree about stepping

`measure-0830-delta-reader.md` §2c establishes, and this pass confirms on
independent code, that **a primorial-indexed ladder can only present a stepped
law**, and that the difference between the stepped and the continuous shape is
large enough to reverse the sign a fitted instrument reads. The same note then
takes its target from `attack-0829n-hsubpow-K.md` §3b, whose sign lemma is
derived on the **continuous** shape. Applying the delta-reader note's own
diagnosis to the sign lemma is the natural adversarial move, and it costs the
lemma its constant.

Write `Ĝ_s(n) = c·P(n)^β·(ln P(n))^δ` for the stepped law. Then

```
  D(b,k) = −ln c + β[ln P(b^{k+1}) − ln P(b^k) − ln P(b)]
                 + δ[ln ln P(b^{k+1}) − ln ln P(b^k) − ln ln P(b)],
```

and the `β` bracket no longer vanishes: it is `e(b^k) + e(b) − e(b^{k+1})` for
`e(x) = ln x − ln P(x) ≥ 0`. Measured sups over `b ≤ 2000`, `b^{k+1} ≤ 2.9e6`,
at `c = 1` (producer SEC C):

| `β` | `δ` | stepped sup | argmax | continuous sup `1.0597δ` | excess |
|---|---|---|---|---|---|
| 1 | 0 | `0.6829` | `(10,1)` | `0.0000` | `+0.6829` |
| 1 | 1 | `1.1216` | `(4,1)` | `1.0597` | `+0.0619` |
| 1 | 2 | `2.0305` | `(2,2)` | `2.1193` | `−0.0888` |
| 1.5 | 0 | `1.0243` | `(10,1)` | `0.0000` | `+1.0243` |
| 1.5 | 1 | `1.3054` | `(4,1)` | `1.0597` | `+0.2458` |
| 1.5 | 2 | `2.1076` | `(2,2)` | `2.1193` | `−0.0117` |
| 2 | 0 | `1.3658` | `(10,1)` | `0.0000` | `+1.3658` |
| 2 | 1 | `1.5549` | `(10,1)` | `1.0597` | `+0.4952` |
| 2 | 2 | `2.2431` | `(4,1)` | `2.1193` | `+0.1238` |

Three readings, all **[VERIFIED]**, none of them a refutation:

- **The *iff* survives.** For `δ ≥ 0` the stepped sup is finite (the `β`
  bracket is bounded because `e(x)` is), and for `δ < 0` the `k = 1` rung still
  diverges (`e(b²), e(b) → 0`, so the `−δ ln ln P(b)` term carries). The sign
  condition on the all-bases hypothesis is unaffected.
- **The constant does not survive, and the excess is trap-sized.** At `δ = 0`,
  where the continuous lemma prices the law at `K = −ln c = 0`, stepping alone
  costs `0.68` to `1.37` nats depending on `β` — the `β = 2` value lands inside
  the trap window `[1.0033, 1.3946)`. §3b's third bullet, "the log term alone
  contributes `1.0597` per unit `δ` at `(2,1)`; whether that lands in the trap
  … or the zone depends on `ln c`", is computed on a shape `Ĝ` cannot have, and
  the omitted stepping term is the same size as the window it is being placed
  in. That bullet is already carried at **[HEURISTIC]**, which is the right
  rung; the sentence needs the stepping caveat next to it.
- **The attainment point moves.** `(2,1)` is the argmax for the continuous law
  at every `δ ≥ 0` tested. Stepped, it is `(10,1)`, `(4,1)` or `(2,2)`. Any
  argument that tries to make the all-bases hypothesis cheap by working at
  small bases loses the base it was working at.

The honest summary: `attack-0829n-hsubpow-K.md` §3b is a correct lemma about a
class of laws that excludes its own object, and it remains the right qualitative
guide — the sign condition is the thing, and it is real — while its number is
not a price for `Ĝ`.

## 3. What would falsify this note's own claims, and whether the check has run

| claim of this note | falsifier | has it run |
|---|---|---|
| every figure of both notes reproduces | one cell differing beyond `5e−5` (map, sups, margins) or `5e−4` (readers) | **RUN**: 14 + 48 + 24 cells plus margins, sups and counts; `FAILS = 0` in the producer |
| the sign lemma's constant is a `b = 2` artefact | a base floor `b₀ ≥ 3` giving back `1.0597` | **RUN**: closed form `ln 2 − ln ln b₀`, so no `b₀ > 2` can |
| the stepped sup differs from `1.0597δ − ln c` | a `(β, δ)` cell where the stepped and continuous sups agree | **RUN**: 9 cells, excess `−0.089` to `+1.366`, none zero. Not run for `δ < 0` sups (they are infinite) |
| the `δ < 0` divergence is unreachable | a `δ < 0` and a `K` in the zone with a base below `1e6` exceeding `K` | **RUN** at `δ = −1, −0.5, −0.1`; smallest requirement is `b > exp(8.07)` at `δ = −1, K = 1.3946`, which is reachable, and `b > exp(1.7e5)` at the ceiling, which is not. The claim is about the ceiling |
| `b = 73` fails to convert at `K = 11` | the count being 11 | **RUN**: the set is `{72, 74–82}`, 10 members |
| RB passed the gate and read a positive sign | RB failing any of S1, S2, C1, C2 under independent code | **RUN**: RB is the unique reader passing C1 and C2 on the control; `δ̂ = 0.8024 ± 0.0875` on `G₂` |
| RB's crossing and the raw slope are different estimators | `S_uy S_xx = S_xy S_ux` on this ladder | **RUN**: they differ by `4.71e−5` |
| the pre-registration was written before the run | a producer whose gate is a hand-written table rather than computed flags | **NOT RUN as a temporal check**; no git command was run. The mechanical check passed |
| the `θ(p)` convention would not change the reader verdicts | a reader passing all four gates under the `θ` convention | **NOT RUN** |

## 4. NOT REACHED

- The temporal order of `measure-0830-delta-reader.md` §3's writing. Attested by
  the note and by the producer's own header comment; not verified.
- The withheld `G₂` readings of R0, RA, RC2, RC and RD. The gate is the note's
  protocol and this pass respected it: they were neither computed nor quoted.
  Whether they would agree with RB in sign is therefore open.
- `measure-0830-delta-reader.md` §1's literature correction (Maier–Pomerance
  via FGKMT, Ford's slides). No fetch was made in this pass; the row is carried
  **[CITED]**, not verified.
- The `θ(p) = ln p#` convention for placing the law. Not tried.
- `Ĝ` past reach 82 and the control past 312. No enumeration, no new term.
- The three mechanisms closed on 2026-08-28 (`hsubpow-explicit-K.md` §§2–4)
  and the wall itself. Not re-examined, not reopened.
- Whether any of this changes item 1d's status. It does not: the fixed-base
  form at `b = 2` sidesteps the sign condition, as both notes already say, and
  the stepping finding of §2 strengthens rather than weakens that instruction.

## 5. Ledger and reproduction

The two questions this pass touches are already in `research/QUESTIONS.md`
(`Q-hsubpow-K-0829n` OPEN, `Q-delta-reader-0830` ANSWERED); neither is re-run
here, both are audited. This note answers `Q-redteam-0830-fekete`.

| artifact | what it carries |
|---|---|
| `research/history/staging/redteam-0830-fekete.js` | independent parse of the three ladders (A); the sign lemma on the continuous law, its constant's base-floor sensitivity, the real-base price of the quantifier, the `δ < 0` divergence rate, the oscillating rider (B); the same lemma on the stepped law (C); the `β_bound` / `K_min` map, the argmin switch points, the base-16 formula, the `K = 11` converting set (D); pair counts, sups, margins, the control's sup movement, `max S(n)` (E); the six readers rebuilt from the definitions, both tables, stepping against rounding (F); RB's algebra and the zero crossing (G); an independent noise study (H); twelve readings |
| `research/history/staging/attack-0829n-hsubpow-K.md` | the sign lemma, the map, the zone, the margins, the `TODO.md` correction |
| `research/history/staging/measure-0830-delta-reader.md` | the six readers, the pre-registration, the gate, the RB circularity argument |
| `research/import-interp-01-bgt-defect.js`, `research/exact-g2-ladder.js`, `research/exponent-control.js` | the three ladders, re-parsed at run time by this pass's own regexes |
| `research/dhr-verification.md` row 1a | `β₂ = 4.26645028414864191641` |

Reproduce with `node research/qc/embed.js --check
research/history/staging/redteam-0830-fekete.js`; the fingerprint matches as of
2026-08-30 (`code-sha256 99b1c117…`, `out-sha256 ae4fdbb9…`, `body-lines 196`).
