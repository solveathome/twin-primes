# Red team, 2026-08-30: the EXACT half of the pointwise floor. E2, E3, E4 and Omega survive an independent re-derivation and Omega is extended past z = 73; E1's realisability clause is false as written, the note's "z^{u0} = 1.05e6" is HM, and the exact half constrains REC at no u0 on its own

<!-- ledger
id: Q-redteam-0830-floor-sign
status: ANSWERED
todo: 0
question: Does the EXACT half of attack-0830-rec-cheapest.md sec.4 (E1-E4, the sign facts, the window bound T <= cc(r) + H - 1, the exact Omega, and sec.(d)/(e)'s calibration sentences) survive an adversarial re-derivation on independent code, and does it by itself constrain REC at any u0 without the growth law?
verdict: The mathematics STANDS as PROVEN and is stronger in two places than the note claims, but it constrains REC at NO u0 by itself: E3's identity is pure algebra and holds at every position (0 mismatches in 20.5M positions, both s), E2 holds at every divisor n > 1 under three disjoint routes at every s >= 1 and FAILS at s = 0.8, locating a hypothesis D >= z the note omits, E4 has 0 violations at every x over four complete periods with the wrap, and Omega is reproduced by an independent enumeration at all 26 tabled values and EXTENDED to z = 101 (285, 441, 684, 990, 1155 at z = 79, 83, 89, 97, 101), confirming blind-0830's exact 684 and 1155; three sentences are wrong -- E1's "every pair with gcd | 2 is realised" (exactly half are; the missing half is all those with 2 dividing one side), the ledger's and sec.0's "251 against z^{u0} = 1.05e6" (1.05e6 is HM, z^{u0} = 7.19e7, so the gap is understated 68.3x), and sec.4.4's reason for lam+(P(z)) = 0 (0.24 exceeds 1/8; the figure that closes the slab is 0.1199 at z = 89, under 1/8 by 4 percent) -- and sup|rho~| >= (Omega - M)/2 is loose: sup|R_1| = Omega + M exactly. Every exactly known log_z Omega is under 2 while REC needs it above u0 > 2, so the exact half touches REC at no u0 and every adverse consequence in the note still rests entirely on the growth half. No exponent moves.
-->

*(2026-08-30, staging, HELD like every staging note. Adversarial pass ordered
by Chris on the notes landed 2026-08-29 evening and 2026-08-30. Target:
`research/history/staging/attack-0830-rec-cheapest.md` sec.4 and sec.(d)/(e),
the EXACT half only; the growth half of sec.4.2 is another agent's. Producer,
formally embedded: `research/history/staging/redteam-0830-floor-sign.js`,
independent code -- it requires nothing from `sift-limit-lemmaV.js` or from
the producer under test, and every object is rebuilt from its definition and
cross-checked by at least two disjoint routes. No existing file was edited and
no git command was run. Calibration per `CLAUDE.md`.)*

## 0. VERDICT

**Caveats first.**

1. **Nothing here moves an exponent, and nothing here grades the growth half.**
   Every adverse consequence the target note draws -- REC false below 16s/9,
   RML(alpha) false below beta_2, rider 2's band asymptotically empty -- rests
   on sec.4.2, which this pass does not touch. What survives below is a set of
   facts about computed levels.
2. **The exact half constrains REC at no u0, by itself.** REC(s, u0) is
   contradicted at a level z only when Omega(z) >= H = z^{u0}, i.e. only when
   log_z Omega >= u0 > 2. Every value of log_z Omega that has ever been
   computed exactly is below 2: 1.2878 at z = 73 (the target note), 1.5280 at
   z = 101 (this note, X5), 1.6057 at z = 113 (`blind-0830-omega-floor.md`).
   The exact half therefore supplies **no** constraint on REC at any u0 in the
   legal band (2, beta_2], and none asymptotically either -- it is a family of
   pointwise statements at levels that have been enumerated. The two
   unconditional things it does deliver, `nP(z) > Omega(z)` and
   `sup|rho~| >= (Omega + M)/2`, are floors in the adverse direction at those
   levels and carry no TPC content.
3. **Three load-bearing sentences are wrong** (rows 1, 7, 8 below), and one is
   loose by a term the note could have kept (row 6). None of the four changes a
   verdict; two of them make the note's own case marginally weaker, one
   (row 7) makes the gap it reports 68.3x larger than the sentence says.

**The ruling asked for.** The EXACT half stands as PROVEN, with one hypothesis
added (E2 needs `D >= z`; the legal band has `s > 2`, so it is free) and one
clause corrected (E1's realisability). It is stronger than stated in two ways:
E3's identity is not confined to doubly non-rough points, and the sup bound it
implies is `(Omega + M)/2`, not `(Omega - M)/2`. And on its own it constrains
REC at no `u0` whatsoever. The whole adverse reading of sec.4 is the growth
half's to carry.

---

## 1. CLAIMS TABLE

Line numbers are `attack-0830-rec-cheapest.md`. "X#" points at the section of
this note's producer. Verdicts: STANDS / WEAKENED / REFUTED.

| # | claim, quoted, with line | verdict | independent re-derivation | replacement sentence |
|---|---|---|---|---|
| 1 | L164, (E1): "every pair (n1, n2) of divisors of P with gcd(n1, n2) \| 2 is realised by some r in Z/W (CRT: r == 0 mod n1, r == -2 mod n2, r != 0, -2 mod every other odd prime)" | **REFUTED** as written | exactly half are realised: 162 of 324 at z = 13, 486 of 972 at 17, 1458 of 2916 at 19, 4374 of 8748 at 23, by walking every position of Z/W and collecting the pairs (X3). Every unrealised pair is one where 2 divides exactly one of n1, n2 (162 of 162, 486 of 486, 1458 of 1458, 4374 of 4374), smallest (n1, n2) = (1, 2). The parenthetical system is inconsistent there: 2 \| n2 forces r even, hence 2 \| n1. The producer is NOT affected -- `omegaExact` puts the prime 2 in both sides or neither, which is the correct set | "every pair (n1, n2) of divisors of P with gcd(n1, n2) \| 2 **and 2 \| n1 if and only if 2 \| n2** is realised by some r in Z/W" |
| 2 | L166-174, (E2): "lam+(n) >= 0 and lam-(n) <= 0 at every n \| P with n > 1", by the Buchstab boundary identity, "Checked exhaustively over every divisor of P(z) at z = 13..73 (S3, viol = 0 at every level, both s)" | **STANDS**; **WEAKENED** on the hypothesis and on the stated range | lam+ and lam- computed at every divisor n of P(z) by three disjoint routes -- direct summation over a support rebuilt here from the prefix conditions, the exit-chain boundary count, and a subset-sum transform -- at z = 13..37 and s in {0.8, 1.0, 1.5, 2.0, 2.698721, 3.0, 4.0, 6.0}: 0 sign violations and 0 route disagreements at every s >= 1 (X2). At **s = 0.8 E2 FAILS**: lam-(n) > 0 at 1, 3, 7, 7, 7, 15, 15 divisors (z = 13..37), and the boundary count parts from the direct sum at exactly those divisors. Re-derived reason: "D- exits only at even m" needs the size condition to be unfailable at m = 1, i.e. `D >= max{p < z}`. At s = 3.0 the producer's own S3 stops at z = 47, as L336 states correctly | "...at every n \| P with n > 1, **for D >= z** (so at every s >= 1; the legal band has s > 2)... Checked exhaustively over every divisor of P(z) at z = 13..73 at the cheapest s and z = 13..47 at s = 3.0" |
| 3 | L175-178, (E3): "At a doubly non-rough point, cc(r) = -(A1 A2 + A1 B2 + B1 A2) with A_i = lam+(n_i) >= 0, B_i = -lam-(n_i) >= 0" | **STANDS**, and is **stronger** than stated | the identity is pure algebra in A = lam+, B = -lam- and holds at EVERY position: 0 mismatches over 2,310 + 30,030 + 510,510 + 9,699,690 positions at each of s = 2.698721 and s = 3.0 (X3, `bad0..bad3` all zero, the rough classes included). Doubly non-rough is what the four factors' non-negativity needs, and there it holds exactly (`neg0` = 0 at all eight rows); on the rough classes B = -lam-(1) = -1 at every position | "cc(r) = -(A1 A2 + A1 B2 + B1 A2) identically, with A_i = lam+(n_i), B_i = -lam-(n_i); **at a doubly non-rough point** all four factors are non-negative, so cc(r) <= -A1 A2" |
| 4 | L179-181, (E4): "For every window (x, x+H] containing r: T(x) <= cc(r) + (H - 1)", from cc(r') <= theta(r')theta(r'+2) <= 1 | **STANDS** | re-derived from E2 alone: 0 <= (lam+(n1) - theta1)(lam+(n2) - theta2) gives theta1 theta2 >= lam+_1 theta2 + theta1 lam+_2 - lam+_1 lam+_2 >= lam+_1 lam-_2 + lam-_1 lam+_2 - lam+_1 lam+_2 = cc, using lam+ >= 0 and lam- <= theta <= lam+. Machine: cc > 1 at 0 of 20.5M positions (X3, `cc>1` = 0 at all eight rows); the binding form T(x) - (H-1) <= min{cc(r) : x < r <= x+H} tested at EVERY x over the full period **with the period wrap**, for H in {1, 2, 3, Omega, Omega+1, 10, 50}, both s, z = 13..23: **0 violations in every row** (X4) | none |
| 5 | L183-185: "Omega(z, s) = -min_r cc(r) = max over splits ...; for every H <= Omega the window starting at r - 1 has T <= -1, so nP(z) > Omega(z, s), F1 fails at H" | **STANDS** | Omega = -min cc confirmed against the brute-force walk at z = 13..23, both s (X3, MATCH at all eight rows). X4 exhibits min_x T <= -1 at every H <= Omega and T = -Omega exactly at the window starting at r - 1 in every such row. Two riders: sec.4.3's "F1 and F2 fail at every H < Omega" is `H <= Omega` (X4 fails at H = Omega too); and F1 is an EXISTENTIAL over H, so removing the H <= Omega candidates refutes F1 only once Omega >= z^{beta_2 - eps}, which is section 2's point | sec.4.3: "F1 and F2 fail at every H <= Omega(z); F1 itself, being existential in H, is untouched until Omega passes z^{beta_2 - eps}" |
| 6 | L186: "R_1(x) = cc(x+1) - M, **sup\|rho~\| >= (Omega - M)/2**" | **STANDS but loose by M** | sup\|R_1\| walked over the full period is **Omega + M exactly** at all eight (z, s) rows: 1.0506494, 2.0437895, 3.0353509, 6.0307005 at the cheapest s and 1.0558442, 2.0469863, 3.0395977, 3.0341692 at s = 3.0 (X7), so the sharp consequence is (Omega + M)/2. The producer's control `Omega - M <= 2 sup\|rho~\|` is the weak form of the same thing; no verdict turns on it | "R_1(x) = cc(x+1) - M and sup\|R_1\| = Omega + M, so **sup\|rho~\| >= (Omega + M)/2**" |
| 7 | ledger L8 and sec.0 L38-39: "Omega(z) ... is exact to z = 73 and reads 251 against **z^{u0} = 1.05e6** (S3)" | **REFUTED** as labelled | z^{u0} at z = 73 is **7.188e+7**. 1.052e6 is `HM(u0)`, the producer's own S3 column, i.e. z^{u0} times M = 1.464e-2. So Omega/z^{u0} = **3.492e-6**, not the 2.386e-4 the sentence implies (that ratio is Omega/HM). sec.4.4 and reading 6 use HM correctly, so the defect is confined to the ledger verdict and sec.0, where it **understates the gap by 68.3x** (X0) | "...reads 251 against HM(u0) = 1.05e6, and against z^{u0} = 7.19e7" |
| 8 | L262-263: "lam+(P(z)) = 0 at every level (the D/8 slab is empty: **max d/D <= 0.24** everywhere, so the two-prime and four-prime chains cannot reach it)" | fact **STANDS**, reason **REFUTED** | the slab at n = P(z) has p* = 2 and needs d' \| P/2 (odd), omega(d') even, d' > D/8 = 0.125 D. 0.24 > 0.125, so the quoted figure does not close the slab. The figure that does is the max of d/D over the **odd, omega-even** part of D+: 0.0345 at z = 13, 0.0302 at z = 23, and then **0.1169, 0.1166, 0.1124, 0.1195, 0.1181, 0.1199** at z = 37, 47, 61, 73, 83, 89 (X6) -- under 1/8, but by only 4 to 7 percent, so the emptiness is a near-miss and not the comfortable margin 0.24-vs-nothing suggests | "lam+(P(z)) = 0 at every level: the D/8 slab is empty because the largest odd d in D+ with omega(d) even reaches 0.1199 of D at z = 89, under 1/8 by 4 percent -- a margin that closes, not one that holds by construction" |
| 9 | L264-265: "the maximisers are one band of middle primes with p* = 5 or 7 against the top three to five primes" | **WEAKENED** | true at 8 of the 16 cheapest-s levels (z = 41, 43, 47, 53, 59, 61, 71, 73). At z = 13, 17, 19 the second side is EMPTY (n2 = 1; the note's own S3 prints B2 = -1 there); at z = 23, 29, 31, 37 it is one or two primes, not three to five; and at z = 67 the split is p* = 13 against p* = 3 with sides of 9 and 8 primes -- neither a middle band nor a top band (X5) | "at z >= 23 the maximisers are one band of middle primes with p* = 5, 7 or 13 against the top one to five primes, with z = 67 an exception; at z = 13..19 one side of the maximiser is trivial" |
| 10 | L318-321: "No exact sup exists at z = 41, 43, 47 (only <rho~^2>; `rho-exact-z31-01.md` sec.0 prices those walks at 37x to **65,232x** the z = 37 cost)" | **STANDS** on substance, **WEAKENED** on the quoted arithmetic | `rho-exact-z31-01.md` sec.0 (line 70) and sec.4.6 do restrict the exact sup to z = 13..37, and the corpus has no exact sup|rho~| past 37; the quote is faithful. The multipliers are exactly W(z)/W(37) = **37, 1517 and 65,231** (X0); the source's 65,232 is off by one and the target inherits it. Not load-bearing | "...at 37x to 65,231x the z = 37 cost" |
| 11 | L96-97: "the route supplies zero saving at any positive demand" | **STANDS**, as a tautology | the cap's saving over itself is 1 by construction; the note says so itself ("identically 1", L94-95). It is a definition, not a measurement, and is not marked with a rung | (optional) "...supplies zero saving at any positive demand -- by definition, not by measurement" |
| 12 | L104-107: the union route's moment order "z/(2.1332 ln z) against z/(1.5 ln z) at u0 = 3: a constant factor **1.42**" | **STANDS** | (beta_2/2)/1.5 = **1.4221** at the eta -> 0 figure the sentence itself quotes; at the note's own working point eta = 0.05 it is 1.4055 (X0). Internally consistent | none |
| 13 | L141: "saving = CAP_big / z^{2s} = z^{o(1)}, **for every split point delta**", and reading 3's "ZERO" | **WEAKENED** one rung | the instrument argument (a bound from {sup <= A, rms <= B} alone is A) is sound and is the load-bearing half. The evidence offered for "the ell^1 mass sits at the top of the modulus range" is one finite-z share, 0.5684 at z = 37 (`attack-0829n-rml-proof.js` OUTPUT S3, line 355), measured at u0 = 4.00 and delta = 0.50 rather than at the cheapest point, on a column that is not monotone (0.0000, 0.1122, 0.2445, **0.2054**, 0.2599, 0.3813, 0.5684 -- it falls at z = 23) | "saving = CAP_big / z^{2s}, which is z^{o(1)} whenever the ell^1 mass sits at the top of the modulus range; that is DERIVED, with one supporting share, 0.5684 at z = 37, measured at (u0, delta) = (4.00, 0.50) and rising at 6 of 7 steps" |
| 14 | L335-337, the E2 falsifier: "RUN exhaustively over all 2^{pi(z)} divisors at z = 13..73 (cheapest s) and 13..47 (s = 3): zero violations" | **STANDS** | reproduced here over the same range and six further values of s (X2). The divisor count is 2^{pi(z) - 1} for prime z, since P(z) is the product of the primes BELOW z (2^20 at z = 73, not 2^21); a naming slip only | "...over all 2^{pi(z) - 1} divisors..." |
| 15 | the exact Omega columns themselves (L259-267): 1, 2, 3, 6, 10, 18, 22, 30, 45, 63, 86, 111, 134, 168, 205, **251** at z = 13..73 (cheapest s) and 1, 2, 3, 3, 3, 9, 21, 36, 63, **100** at z = 13..47 (s = 3.0) | **STANDS**; **CONFIRMED and EXTENDED** | all 26 values reproduced by an enumeration that shares nothing with the note's -- an odometer over every subset of the odd primes with an inner submask descent, a running max initialised at -inf rather than 0 (X5). The clipping at 0 is harmless: the maximum was positive at every level. Extended past the note: Omega = **285, 441, 684, 990, 1155** at z = 79, 83, 89, 97, 101, log_z Omega 1.2936 -> 1.5280. The two values `blind-0830-omega-floor.md` also has exactly, 684 at z = 89 and 1155 at z = 101, agree; so do the target note's own S4a hill-climb LOWER bounds at those two levels (6.840e+2 and 1.155e+3), which were therefore already exact. z = 103 needs 3^25 splits and z = 113 needs 3^28 with 2^29 tables (~6.4 GB); the blind note's 1980 at z = 113 is NOT checked here | none |
| 16 | sec.5's arrow table, L300-315 (five rows at the cheapest s) | **STANDS**, reproduced | rewalked on independent code over the full period: sup\|R_H\|, rms(R_H), sup/rms, log_z(sup/rms), min T, max T and log_z F all reproduce (X8), including min_x T = 2517 -> 41384 against HM = 2520.3 -> 41411.0 | none |

---

## 2. Does the exact half constrain REC on its own? No.

The chain the note builds is: E2 gives the signs, E3 turns cc(r) at a planted
point into minus a sum of three products, E4 turns that into a window bound,
and Omega(z) = -min_r cc(r) is the resulting pointwise floor. Every link is
PROVEN (row 2-5). What the chain then says, unconditionally, is:

    for every H <= Omega(z, s):  min_x T(x) <= -1,  so nP(z) > Omega(z, s).

REC(s, u0) asserts a consequence at `H = z^{u0}` for all large z. The chain
contradicts it at a level only if `Omega(z) >= z^{u0}`, i.e. `log_z Omega >= u0`,
and `u0 > 2` throughout the legal band. Against that:

| where Omega is known exactly | z | Omega | log_z Omega | u0 needed |
|---|---|---|---|---|
| target note, S3 | 73 | 251 | 1.2878 | 4.2165 |
| this note, X5 (new levels) | 79, 83, 89, 97 | 285, 441, 684, 990 | 1.2936 - 1.5078 | 4.2165 |
| this note, X5 (new level) | 101 | 1155 | 1.5280 | 4.2165 |
| `blind-0830-omega-floor.md` sec.0 | 113 | 1980 | 1.6057 | 4.2165 |

No exactly known value is even above 2, let alone above `beta_2 - eta`. So the
exact half, taken alone, rules out **no** `u0` in `(2, beta_2]` and says nothing
about any z that has not been enumerated. It is not an asymptotic statement and
cannot become one without sec.4.2. The note is careful about this in sec.0
bullet 3 and in reading 6 ("proof gap at every computable z"); the caveat is
recorded here because rows 5 and 15 are the part of sec.4 that is PROVEN, and a
reader who stops there should not carry away that REC has been touched.

Two by-products of the exact half are worth keeping, both adverse-direction and
neither TPC-bearing: `nP(z) > Omega(z, s)`, and `sup|rho~| >= (Omega + M)/2`
(row 6, sharper than the note's form). At s = 3.0 the second reads 0.528, 1.023,
1.520, 1.517 at z = 13..23 against the cited exact sup|rho~| of 2.620, 4.337,
9.152, 12.106 (X7): the floor is a factor 5 to 8 under the truth there, so it
does not price sup|rho~| at any level yet measured.

**One structural caveat on the small-z evidence.** The exit-chain PRODUCT
mechanism that sec.4.2 needs sets the record only from z = 23 (cheapest s) and
z = 31 (s = 3.0). Below that the minimiser is rough on one side, so cc(r)
reduces to a single weight `lam-(n1)` and there is no product at all: at z = 13
the best doubly non-rough value of cc is **0** while Omega = 1 (X3, class
breakdown; X5's "minimiser is" column). The first three or five rows of the
exact Omega column are therefore not evidence about the mechanism, only about
the objective.

## 3. Method and custody

Everything in the producer is rebuilt from definitions:

- **The Rosser supports.** `D^sigma` re-derived from the prefix conditions
  (descending primes, `d <= D`, and `p_1...p_{l-1} p_l^3 <= D` at odd `l` for
  `+`, even `l` for `-`), by recursion AND, at z = 13..23, by testing every one
  of the `2^k` squarefree divisors of P(z) against every prefix condition. The
  two routes agree as multisets at all eight (z, s) rows, and the sizes match
  the note's `|D+|`, `|D-|` columns (X1).
- **The weights.** `lam+-` by three routes (X2), described in row 2.
- **cc, T and rho.** cc(r) walked from the lambda arrays directly; M taken as
  the period mean of cc, which reproduces the note's cited M to every printed
  digit (0.050649, 0.043790, 0.035351, 0.030700 at z = 13..23, X3) and so
  independently confirms `buildTerms`' `M = sum_i w_i/q_i`.
- **Omega.** By the odometer of row 15, not the note's ternary recursion.
- **The window bound.** By sliding-window minimum with the period wrap, at
  every x, not by sampling.

The three routes for `lam+-` are the check that matters most: the boundary
identity the note's E2 proof rests on is itself verified numerically as an
identity (route 2 against route 1) at every divisor and every s, and it is
exactly at s = 0.8, where the identity's hypothesis fails, that both the
identity and E2 break. That is the shape a correct proof should have.

## 4. Not reached

- The growth half (sec.4.2, the dyadic four-prime construction and the
  `z^{16s/9}/ln^8 z` claim), by the brief.
- Exact Omega past z = 101: z = 103 needs 3^25 splits and 2^26 tables, z = 113
  needs 3^28 and 2^29 (about 6.4 GB). `blind-0830-omega-floor.md` reports 1980
  at z = 113 by a different engine; that value is NOT independently checked here.
- The full-period identity walk past z = 23 (z = 29 needs 223M positions with
  two lambda arrays resident); sec.5's z = 29 row is rewalked in X8, its
  position-by-position identity check is not.
- Any re-pricing of the certified sub-family (S4b) or the OLS fits (S5): both
  belong to the growth half.
- No literature search was run; none was needed for this half.

## 5. Readings

1. **PROVEN, with one hypothesis added.** E2, E3, E4 and the Omega identity are
   theorems: the signs hold at every divisor n > 1 for `D >= z` under three
   disjoint routes, the cc identity is algebra and holds at every position, and
   the window bound has 0 violations at every x over four complete periods with
   the wrap. At s = 0.8 E2 fails, which locates the omitted hypothesis rather
   than damaging the claim (the legal band has s > 2).
2. **CONFIRMED and EXTENDED.** All 26 tabled exact values of Omega reproduce on
   an independent enumeration, and the column is extended past the note's
   z = 73: Omega = 285, 441, 684, 990, 1155 at z = 79, 83, 89, 97, 101
   (log_z 1.2936 -> 1.5280). The two values `blind-0830-omega-floor.md` also
   has exactly, 684 at z = 89 and 1155 at z = 101, agree, and so do the target
   note's S4a hill-climb lower bounds at those levels, which were already
   exact. Every new value is still under 2 in log_z, so the extension changes
   nothing about REC.
3. **REFUTED, three sentences.** E1's realisability clause (exactly half of the
   `gcd | 2` pairs occur; the missing half is all of those with 2 dividing one
   side), the ledger's and sec.0's "z^{u0} = 1.05e6" (that is HM; z^{u0} is
   7.19e7, so the reported gap is 68.3x too small), and sec.4.4's reason for
   `lam+(P(z)) = 0` (0.24 exceeds 1/8; the closing figure is 0.1199 at z = 89, under 1/8 by 4 percent). None
   changes a verdict; the second makes the finite-z gap 68.3x wider than the
   sentence reports, which strengthens the note's own "proof gap at every
   computable z" reading and weakens nothing.
4. **WEAKENED, four sentences.** E2's stated check range at s = 3.0, the
   maximiser description, the inherited `65,232x`, and sec.3's "for every split
   point delta". Replacements are in the table.
5. **STRONGER THAN STATED, twice.** E3's identity is not confined to doubly
   non-rough points, and `sup|rho~| >= (Omega + M)/2`, not `(Omega - M)/2`;
   `sup|R_1| = Omega + M` exactly at all eight rows walked.
6. **NO CONSTRAINT ON REC.** Section 2: every exactly known `log_z Omega` is
   under 2, and REC needs `log_z Omega >= u0 > 2` at some level to be touched.
   The exact half is a set of pointwise facts at enumerated levels. All of the
   note's adverse consequences remain the growth half's to carry, and this pass
   says nothing about whether it carries them.
7. **UNCHANGED.** No exponent moved. The target note stays HELD on sec.4.2.

## 6. Corrections proposed to the record (no live file edited)

- `attack-0830-rec-cheapest.md` L164, L173-174, L186, L262-263, L264-265,
  L318-321, L141, L336, and the ledger `verdict:` plus sec.0 bullet 3 --
  replacement sentences in the table above, rows 1, 2, 6, 8, 9, 10, 13, 14, 7.
- `rho-exact-z31-01.md` sec.0: "65,232x" is `W(47)/W(37) = 65,231`.
- The candidate `REFUTED.md` row the note drafts (L419-422) quotes the exact
  half correctly except for the E1 clause; if it is ever landed it should say
  `gcd(n1, n2) | 2 with 2 dividing both sides or neither`.

*Gate: `node research/qc.js --full` after this note landed -- 251/251
audit-numbers checks pass, `embeds` clean (so the producer's tail binds to its
code and to its own bytes), and the only findings are two `ledger-todo-unlisted`
lines at `TODO.md:556`, one for `Q-redteam-0830-floor-sign` and one for another
agent's `Q-redteam-0830-rml`. Both are the re-run guard asking TODO item 0's
`Ledger:` line to name the new ids. **This pass is forbidden to edit any existing
file, so the fix is owed to whoever integrates: add `Q-redteam-0830-floor-sign`
to item 0's `Ledger:` line.** `qc/embed.js --check` was also run in full (a 2321.5 s
re-execution) and returns `code-sha256 matches`, `body matches out-sha256 -- the
pasted block is bit-honest`, `out-sha256 matches`.*
