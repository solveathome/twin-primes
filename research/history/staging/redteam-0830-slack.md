# The 0830 red team, slack half: every number in the three notes and in the verification reproduces on a third implementation, and four sentences do not — one of them a replacement already queued for a live file

<!-- ledger
id: Q-redteam-0830-slack
status: ANSWERED
todo: Z4, 9
question: Do attack-0830-head-remainder.md, attack-0830-tail-derivation.md and verify-0830-record-defects.md survive an adversarial re-derivation on independent code, and do the five riders the verification put on live notes stand as written?
verdict: Arithmetically they survive: every figure of the three notes that this pass could recompute reproduced to the printed digit on code written from the definitions, 0 assertion failures over 58 assertion call sites (most inside per-level loops), including every figure of the verification's three claims and the half-decade Delta_HL it quoted rather than recomputed. Four sentences do not survive. (1) verify-0830-record-defects.md:316, a replacement queued for head-residual-hl3.md sec.0, says the pooled value sits "0.038 to 0.052 below the sub-window mean at all three decades"; measured, the two lower decades run to 0.076 and 0.066, and the same note's own falsifier row says 0.038 to 0.076, so the wrong half is the one queued to land. (2) verify-0830-record-defects.md:379's un-measured "+0.005" residual inside the eighths is +0.0004 measured at sixteenths, so the de-pooled top-decade value is converged and the caution can be dropped. (3) the ruling that the class null is "the matched figure" for the tail is matched on residue class only: p'^2 is coprime to every q <= p', and the ensemble's rough-class offset is E_rc - R = 5.6714 -> 7.5357 over x = 7..29 against the class null's 5.6000 -> 6.0336, giving t/(R_shell + 7.5357) = 1.0123 against t/classNull = 1.0157. (4) attack-0830-head-remainder.md sec.3's top row is not gap-scale matched: E[g] 244.0 against 235.9, y_match capped at 19997, and on the note's own six ensemble points Delta_ens ~ E[g]^-0.312, so meas/ens reads 0.9640 not 0.9539 and the headline "0.954 to 0.995" reads 0.964 to 0.995. Three levels the notes recorded as out of reach are run here: the X2 group at x = 23, the tile identities and conditionals at x = 29, and the ensemble ladder at y = 29 (pipe/ens 0.9535, 40 s, against the head note's "about fifteen minutes"). No route opens or closes and nothing here touches Z2.
-->

*(2026-08-30, staging. HELD. Adversarial pass by mandate: refuted-until-
re-derived. One producer,
`research/history/staging/redteam-0830-slack.js`, formally embedded
(`node research/qc/embed.js`; code-sha256 `363f9f1c…`, out-sha256
`41b27959…`, 157 output lines, 118.8 s, `--check` bit-honest). No existing
file was edited and no git command was run. The producer shares no line with
`attack-0830-head-remainder.js`, `attack-0830-tail-derivation.js`,
`verify-0830-record-defects.js`, `varE-theta2-step.js`, `zone-tail-02.js` or
`head-residual-hl3.js`: the tile is sieved from `gcd(a(a+2), x#) = 1` and every
origin in `[0, W)` is visited; `W(h)` is rebuilt from `E_2={1}`, `E_3={2}`,
`E_5={1,2}`, `E_p = Z_p \ {0,-2}`; `rho(t,g)` is rebuilt from
`nu_4 = |{0,2,g,g+2} mod q|` and `nu_5` and normalised by its own generic
factor; the head windows come from a fresh sieve to 1.2e8. Calibration per
claim: PROVEN, VERIFIED by exact computation, MEASURED, ARGUED.)*

---

## 0. VERDICT, caveats first

**Three caveats before anything else.**

1. **This pass grades arithmetic and wording, not the two open steps.** Neither
   note claims to derive its coefficient, and nothing here derives one either.
   The head's anchoring part and the tail's `rho(2)` limit are untouched: both
   remain the HL-strength statements the notes call them, and §2's rulings do
   not move that. Nothing below touches Z2, the width, or any exponent.
2. **Two of the four corrections cut against the notes and two cut for them.**
   The class-null ruling (§2, claim 6) and the top-row matching (claim 15) make
   the corpus's numbers slightly worse for the record's story; the `+0.005`
   correction (claim 10) and the `y = 29` level (claim 14) make the notes'
   own conclusions slightly firmer. Reported in that order, not that weight.
3. **One check is arithmetic on somebody else's Monte Carlo.** Claim 15's
   sensitivity uses `attack-0830-head-remainder.md` §3's own six sampled
   `(E[g], Delta_ens)` points and does not re-run the CRT sampler; the ensemble
   at `y ≥ 313` was not rebuilt here at all. That is the largest un-reproduced
   object in the chain.

**The ruling.** Every figure that could be recomputed was, and it reproduced:
0 assertion failures, over 58 assertion call sites at 1e-4 or tighter (1e-9
for the tile identities), most of them inside per-level loops. That covers the tail
note's §2b and §4 tables at x = 7..29, the seven convention constants, the
verification's three claims to every printed digit, the head note's SEC 0
custody block, its half-decade `Delta_meas` and `Delta_HL` rows, its exact
ensemble ladder at y = 11..23, and the record's split arithmetic. **The
mathematics of all three notes stands. The defects are in four sentences, and
the most consequential is a replacement sentence already queued for a live
file** (§2, claim 9).

**Two of my own errors, for calibration.** A first draft of the tile walk used
a one-period opener pointer and returned `R + 2.500004` at x = 23 rather than
`R + 5/2`; a first draft of the x = 29 pre-pass stepped by 2 from an even
start, emptied the wrap list, and mis-scored the first fourteen origins. Both
were caught by the identities the tail note supplies. The identities are a
better test of an implementation than the implementation is of them.

---

## 1. The claims table

Grades: **STANDS** (an attempt to break it on independent code failed),
**WEAKENED** (true as arithmetic, wrong or unsupported as a characterisation),
**REFUTED** (false as written).

| # | claim, quoted, with `file:line` | re-derivation here | grade | replacement sentence |
|---|---|---|---|---|
| 1 | `verify-0830-record-defects.md`:72-77, claim 1: the corpus `delta*X2` column "is the positive half of the p \| h-2 pattern doubled" and that pattern's mirror is the `p \| h+2` pattern | third implementation, SEC 2: `delta*X2c` = 0.094199, 0.047843, 0.027019, 0.017012, 0.011379 at x = 7..19, the corpus column; group `delta*X2` = −0.009235, 0.004509, 0.001365, 0.000736, 0.000394; `2X2` = −0.5603 … 0.1846 against `2X2c` = 5.7147 … 5.3266; corpus/true `Xmix` = 6.915, 2.869, 3.017, 2.585, 2.305. Brute force over every `\|h\| < L` at x = 7 and 11: `max \|W-(-h) - W+(h)\| = 0.0e+0` | **STANDS**, every digit | — |
| 2 | `varE-theta2-step.md`:20 rider: "X, X1, X_dec and all ratios are untouched" | true, and the useful stronger statement is missing: `delta*(X - X1)`, the column §5 tabulates and the source of that note's "+0.1334 against −0.1288" headline, is identical under either split at all six levels (asserted to 1e-9) | **AMEND**, by addition | add: "and `delta*(X - X1)`, hence the whole §5 `1/ln y` table and §0's near-cancellation reading, is identical under either split (`redteam-0830-slack.js` SEC 2)." |
| 3 | `varE-theta2-proof.md`:14 rider: "the looseness is a factor 511 to 1148" | 511.2, 750.6, 1147.6 at x = 13, 17, 19 checks; but `2X2` changes sign between x = 7 (−0.5603) and x = 11 (+0.5304), so the factor is a ratio to a quantity that passes through zero — 140.0 at x = 7, 201.4 at 11, 1608.8 at 23 | **WEAKENED** | "the bound is loose by 511, 751, 1148, 1609 at x = 13, 17, 19, 23 and by 140, 201 at x = 7, 11 where `2X2` changes sign; the factor tracks `2X2` falling, and is not a stable characterisation of the bound" |
| 4 | `verify-0830-record-defects.md`:8 and :76: "`W-(h) != W-(-h)` at 9, 159, 2444, 45296, 900679 of the L/6 − 1 positive shifts" | 9, 159, 2444, 45296, **900,676** here. The tally is a float-equality count and misses the shifts where `f_5 = 0` kills both sides; by divisor set the counts are 17, 274, 4091, 75231, 1,495,753 | **WEAKENED**, immaterially | "…at 9, 159, 2444, 45296, ~9.0e5 of the positive shifts (a float-equality tally; by divisor set, 17 to ~1.5e6)" |
| 5 | `verify-0830-record-defects.md`:169-170, claim 2: "tail,all = R + 2.5; tail,odd = R + 3; tail,1 mod 6 = R + 5; head,all = R + 0.5; head,odd = R + 1; backward a < o = R + 0.5; a ≤ o = R − 0.5" | all seven exact to 1e-9 at x = 7..23 on a third implementation, and the three tail constants exact at x = 29 as well (the verification asserted x ≤ 23). The hand derivation is one line each and is reproduced in §3 | **STANDS**, and extends to x = 29 | — |
| 6 | `verify-0830-record-defects.md`:8 and `zone-tail-02-0829.md`:18 rider: "with the class null (1.0157) the matched figure" | the class null is matched on residue class and not on roughness, which is the property the record's own surplus is attributed to. `p'^2` is coprime to every `q ≤ p'`; the ensemble's rough-class offset `E_rc - R` reads 5.6714, 6.0649, 6.5174, 6.8650, 7.1053, 7.3465, 7.5357 at x = 7..29, rising, against the class null's 5.6000 → 6.0336. At x = 29 the two differ by 1.5020, and `t/(R_shell + 7.5357) = 1.0123` against `t/classNull = 1.0157` | **WEAKENED** | "…the class null carries the matched RESIDUE-class value (`classNull − R_shell = 6.05`, against the ensemble's `E_cls − R = 6.03` at x = 29). It is not matched on roughness: `p'^2` is coprime to every `q ≤ p'`, and the ensemble's rough-class offset is 7.54 at x = 29 and still rising, which would read `t/R = 1.0123`. The ensemble conditional is a whole-period average and the record's is a `u = 2` window, so this is a caution on the comparator, not a correction to 1.0157" |
| 7 | `verify-0830-record-defects.md`:207-214: "`head-residual-factor.md`:70 … **DO NOT APPLY**" | read at the record: `head-residual-factor.md`:60-61 defines `F(p)` as the first twin opener strictly above `p`, minus `p`; under that convention `R + 1/2` and `R + 1` are exact at x = 7..23 here | **STANDS** | — |
| 8 | `verify-0830-record-defects.md`:239-243 and §3.2, claim 3: sub-window means 0.6592, 0.6705, 0.6736; pooling term −0.0378, −0.0491, −0.0522; between-slope piece 0.0187, 0.0245, 0.0261; "46 to 50 % at every one" of nine splits; `s_B` 0.02867, 0.02848, 0.02848 against `lambda/2`; halves re-read from eighths 0.7005 and 0.6638 | every figure reproduces on a fresh sieve. The between share is 46.9 % to 50.3 % over the nine splits; `s_B` = 0.02867, 0.02848, 0.02848 against `lambda/2 = 0.02832`, and the law holds for `lambda = E[n]/E[g]`, not for `lambda_s` (`lambda_s/2 = 0.02408`, which does not match). `alpha_k` falls 0.05339 → 0.05018 across halves, 0.05523 → 0.04939 across eighths | **STANDS** | — |
| 9 | `verify-0830-record-defects.md`:316, a replacement queued for `head-residual-hl3.md` §0: "the pooled value sits 0.038 to 0.052 below the sub-window mean at all three decades" | measured: [1e7,1e8) −0.0378, −0.0491, −0.0522; [1e6,1e7) −0.0455, −0.0592, −0.0655; [1e5,1e6) −0.0524, −0.0706, −0.0757 at 2, 4, 8 splits. The quoted range is the top decade's alone. The same note's own falsifier row (`:372`) says "the three decades below by 0.038 to 0.076" | **REFUTED as written** | "…and the pooled value sits 0.038 to 0.052 below the sub-window mean at the top decade, 0.046 to 0.066 at [1e6,1e7) and 0.052 to 0.076 at [1e5,1e6), over 2, 4 and 8 splits" |
| 10 | `verify-0830-record-defects.md`:379: "the residual pooling term inside the eighths (order +0.005, estimated from the 2 → 4 → 8 steps, not measured)" | measured here at 16 splits: the decade mean runs 0.6592, 0.6705, 0.6736, **0.6740**, so the 8 → 16 step is +0.0004. Within each half of the top decade the sequence at K = 1, 2, 4, 8 is 0.6848, 0.6978, 0.7005, **0.7009** and 0.6500, 0.6607, 0.6638, **0.6643** | **AMEND**; it firms up their conclusion | "…and the residual inside the eighths is measured at +0.0004, not +0.005, so the de-pooled top-decade value 0.7005 / 0.6638 is converged (`redteam-0830-slack.js` SEC 3). At [1e5,1e6) it is not: the sequence turns down at 16 splits (0.7656 → 0.7628) on about 430 gaps per window" |
| 11 | `head-residual-hl3.md`:19-21 rider: "halves re-read from eighths (0.7005, 0.6638) put HL 2.5 to 3.4% BELOW the measurement at about 2 se in 5 of 6 half-decades" | the numbers hold: HL − local = −0.0245, +0.0466, −0.0614, −0.0298, −0.0237, −0.0166 at z = −0.40, +1.12, −2.30, −1.72, −2.15, −2.37 on the de-pooled standard errors. But the rider states a signed conclusion that the same note's own recommended §0 text declines to state ("The sign of the residual is not established at this height"), and `attack-0830-head-remainder.md`:260-261 prices HL's own unquantified `1/ln x` term at 5.6 % at `ln x = 17.7`, larger than the residual | **AMEND** the rider, not the numbers | append: "The sign is not established: 5.6 % of Delta is HL's own unquantified `1/ln x` term at this height, larger than the 2.5 to 3.4 %. The size of the residual is under 4 % either way." |
| 12 | `verify-0830-record-defects.md`:39-40: "the half-decade `Delta_HL` values are quoted from `attack-0830-head-remainder.js:848-878`" — the ruling in claim 3 rests on numbers it did not recompute | recomputed here first-hand from `nu_4`, `nu_5` on an independent `rho`: 0.8298, 0.7786, 0.7385, 0.7039, 0.6768, 0.6472 at the six half-decades and 0.7914, 0.7124, 0.6545 at the three decades, all asserted at 1.5e-4. HL's pooling linearity extends to 16 splits: pooled minus sub-window mean is −0.0006 to −0.0014 at every split of every decade | **STANDS**, now first-hand | — |
| 13 | `attack-0830-head-remainder.md`:90-98: the between-window slope is `lambda/2`, "half the within slope", pooled intercept rises, "about +0.03" | `s_B` = 0.02867 against `lambda/2` = 0.02832 at the top decade, a 1.2 % agreement; the arithmetic estimate +0.03 overshoots the between-slope piece (0.0187) and undershoots the whole term (0.0378), which is the "same sign, same order" the note claims | **STANDS** | — |
| 14 | `attack-0830-head-remainder.md`:61-63: "The tile at y = 29 was not enumerated. The segmented walk over 6.47e9 positions was timed at about fifteen minutes on this machine and dropped"; falsifier row `:340` "y = 29 not enumerated" | enumerated here in about 40 s of the producer's 118.8: D = 214,708,725 = `prod (q-2)`, holes = `phi(W)`, `E[g]` = 30.132, R = 22.6944, CV² = 0.5063, `Delta_ens` = 1.2057, `Delta_pipe` = 1.1496, **pipe/ens = 0.9535**, hole-origin head − R = 4.0581. The exact ladder is 1.0492, 1.0134, 0.9842, 0.9711, 0.9584, 0.9535 | **AMEND**; the falsifier row closes | replace the falsifier row's "PARTIAL … y = 29 not enumerated" with "exact to y = 29 (pipe/ens 0.9535, `redteam-0830-slack.js` SEC 4), sampled at ten levels to 19997" |
| 15 | `attack-0830-head-remainder.md`:8 and :212: the anchoring part is "2 to 5 percent", `Delta_meas/Delta_ens` "0.954 to 0.995 on the four with more than 13,000 gaps", against a "gap-scale-matched" ensemble | five of six rows match `E[g]` to 0.4 %; the top row is off by 3.4 % (244.0 line against 235.9 ensemble) because `y_match` was capped at 19997 rather than solved. On the note's own six ensemble points `Delta_ens ~ E[g]^-0.312` (local slope −0.286), so at the line's own `E[g]` the matched ensemble reads 0.6743 (0.6749 local) and `meas/ens` = **0.9640**, not 0.9539 | **WEAKENED** | "…the anchored window's deficit sits 2 to 4 percent below its gap-scale-matched ensemble (`Delta_meas/Delta_ens` 0.964 to 0.995 on the four windows with more than 13,000 gaps, after correcting the top window's un-matched `E[g]`, 244.0 against the ensemble's 235.9, on the fitted `Delta_ens ~ E[g]^-0.31`)" |
| 16 | `attack-0830-head-remainder.md`:8: "the pipeline under-predicts its own rotation ensemble by 3.6 to 4.9 percent" | now has an exact endpoint: 4.65 % at y = 29. The band's own endpoints stay sampled, y = 29 → 313 is unbridged, and the ladder is not monotone across the two regimes: falling 1.0492 → 0.9535 to y = 29, then 0.9511 at y = 313 and rising to 0.9636 at 19997, so a minimum sits between | **STANDS**, with the non-monotonicity to disclose | append: "the ladder is not monotone across the two regimes: exact to 0.9535 at y = 29, sampled 0.9511 at y = 313, rising to 0.9636 at 19997" |
| 17 | `attack-0830-tail-derivation.md`:143-151 and :230-238: the §2b and §4 tables, `E_cls − R` = 5.600 → 6.034, `E_rc/E_cls` = 1.0050 → 1.0523, `E_sq/E_rc` < 1 at every level | every cell reproduces at 1e-4 on a third implementation, x = 7..29 (the x = 29 walk is segmented over 6.47e9 origins, with the 1,995,840 square units generated by CRT rather than tested): `E_cls − R` = 5.6000, 5.7091, 5.8326, 5.9127, 5.9728, 6.0078, 6.0336; `n_rc`, `n_sq` exact | **STANDS**, and the direct all-origin sum now covers x = 29 | — |
| 18 | `attack-0830-tail-derivation.md`:44-46 and :163-166: `e^{2gamma}/(8 C2) = 0.6007` is `HL × rho(2)`, marked PROVEN | the identity is arithmetic once `HL = 1/(2 C2)` and `rho(2) = e^{2gamma}/4` are written down (0.757390 × 0.793055 = 0.600652, asserted at 1e-12), and `mbar ~ e^{2gamma} ln^2 x/(2 C2)` follows from Mertens by the chain in §3 below. Numerically the ratio runs 1.5389 (x = 7), 1.1061 (29), 1.0411 (101), 1.0070 (1009), 1.0025 (1e4), 1.0006 (1e5), 1.00008 (1e6), 1.00002 (1e7) | **STANDS as PROVEN** | the note's "still 1.5389 → 1.1061" should not read as monotone: the ratio runs 1.2386, 1.2793, 1.1884, 1.2297, 1.1877, 1.1061 at x = 11..29 |
| 19 | `attack-0830-tail-derivation.md`:209 and :280: `c_local = 0.7304 × 1.0298`, `R_shell/ln^2 = 0.9644 × HL`, `c_local/ENS = 1.2523 against 1/rho(2) = 1.2609 at CV² = 1` | arithmetic reproduces from the record's parsed figures: implied `ln^2(p'^2) = 594.60`, `R_shell/ln^2 = 0.7304`, `/HL = 0.9644`, product 0.7522; 0.7522/0.6007 = 1.2523; `4/e^{2gamma}` = 1.2609 | **STANDS**; one misplaced qualifier | "at CV² = 1" belongs to ENS, not to `1/rho(2)`, which does not depend on CV² |
| 20 | `attack-0830-head-remainder.md`:45-46: the top decade is one "across which the prime density falls ten percent" | `ln(1e7)/ln(1e8) = 0.8750`, so 12.5 %. Already caught at `verify-0830-record-defects.md`:360 | **WEAKENED** | "…across which the prime density falls 12.5 percent (`1/ln p`)" |
| 21 | `attack-0830-head-remainder.md` SEC 0 custody: R = 223.5196, `h − R` = 5.680, coprime-30 offset 2.7541, coprime-210 offset 3.3395, `g_max + 2 = 2870`, `6 \| g` | fresh sieve to 1.2e8: R = 223.5196, `h − R` = 5.6794 on 5,096,876 primes, offsets 2.7540 and 3.3394, `g_max` = 2868, and 0 of 381,331 gaps above 3 not divisible by 6 | **STANDS** | — |
| 22 | `attack-0830-tail-derivation.md`:30-39 and §5(b): the anchored coefficient is HL in disguise because every route passes through `rho(2) -> e^{2gamma}/4` and `CV²_zone -> 1` | not adjudicated here; both cited statements are the corpus's own at the cited lines (`origin-excess.md`:433 "HL-conditional in its exact value"; `GLOSSARY.md`:328-329 "algebraically equivalent to HL"; `head-residual-factor.md`:166 "a Hardy-Littlewood statement for twin gaps"). The ruling is an argument about routes, not a computation, and this pass does not test it | not graded | — |

---

## 2. A ruling per note

**(a) `attack-0830-head-remainder.md`: SOUND, with two sentences to amend and
one falsifier row to close.** Its SEC 0 custody block, its half-decade tables
(both the measured and the HL column), its exact ensemble ladder at y = 11..23,
its pooling mechanism and the `lambda/2` law all reproduce. Its `Delta_HL`
values, which the verification quoted rather than recomputed, are correct on an
independent `rho`. The two amendments are the un-matched top row (claim 15,
which moves the note's own headline anchoring range from 2–5 % to 2–4 %) and
the density figure (claim 20). The `y = 29` falsifier row closes in the note's
favour: 0.9535, inside its claimed band. The open half — no derivation of the
anchoring part below HL — is untouched by everything above.

**(b) `attack-0830-tail-derivation.md`: SOUND. No defect found in its numbers
at any level, including the x = 29 row its ledger quotes.** The identities are
exact under a third implementation, now at x = 29 as well as x ≤ 23; the
conditionals table reproduces cell by cell; the Mertens constant is PROVEN and
its convergence, which the note is careful not to lean on, is confirmed to be
as slow as the note says. The two wording points (claims 18, 19) do not change
a reading. The note's own kill-clause ruling (claim 22) is an argument this
pass did not test.

**(c) `verify-0830-record-defects.md`: its three claims are CONFIRMED to every
digit and one of its replacement sentences is REFUTED as written.** Claim 1's
structural reading is right and its numbers reproduce on a third
implementation, with the x = 23 row it left NOT RUN supplied below. Claim 2's
constants are right and its `head-residual-factor.md` ruling is right; its
"matched figure" clause is matched on residue class only (claim 6). Claim 3
reproduces in full — but the sentence it queues for `head-residual-hl3.md` §0
misstates the pooling range as a three-decade range when it is the top
decade's, while the note's own falsifier row has the right one, and it carries
an un-measured `+0.005` that is `+0.0004` measured (claims 9, 10).

---

## 3. The convention constants, derived by hand, and the Mertens chain

Openers `a_1 < … < a_D` mod `W = x#`, gaps `g_i`, `sum g_i = W`,
`R = sum g_i^2 / 2W`. Every opener is `5 mod 6` for `x ≥ 5`, so `6 | g_i`.

- **Tail, `a + 2 < o`, all origins.** Gap `i` serves `o = a_i + 3, …, a_i + g_i + 2`,
  distances `3 … g_i + 2`, mean `(g_i + 5)/2`, so
  `E = sum g_i(g_i+5)/2W = R + 5/2`.
- **Odd origins.** `o - a_i` is even, so the distances are `4, 6, …, g_i + 2`,
  `g_i/2` of them, mean `(g_i + 6)/2`, and `E = R + 3`.
- **Origins `1 mod 6`.** `o - a_i ≡ 2 mod 6`, distances `8, 14, …, g_i + 2`,
  `g_i/6` of them, mean `g_i/2 + 5`, and `E = R + 5`. `p'^2 ≡ 1 mod 6` for
  `p' ≥ 5`, so this is the tail's own coarse constant.
- **Head, `a > o`.** Distances `1 … g_i`, so `R + 1/2`; odd origins `R + 1`.
- **Backward `a < o`:** `R + 1/2`. **`a ≤ o`:** `R − 1/2`.

All seven verified to 1e-9 at x = 7..23 by visiting every origin, the three
tail constants also at x = 29. **The Mertens chain**, for claim 18:
`mbar = W/D = 6 prod_{5≤q≤x} q/(q-2)`;
`(1-2/q)^{-1} = (1-1/q)^{-2} · (q-1)^2/(q(q-2))`;
`prod_{5≤q≤x}(1-1/q)^{-1} ~ e^{gamma} ln x / 3` and
`prod_{q≥5}(q-1)^2/(q(q-2)) = 3/(4 C2)`, so
`prod_{5≤q≤x} q/(q-2) ~ e^{2gamma} ln^2 x/(12 C2)` and
`mbar ~ e^{2gamma} ln^2 x/(2 C2)` [PROVEN, classical]. In the tail's unit
`ln^2(p'^2) = 4 ln^2 p'`, giving `e^{2gamma}/(8 C2) = HL × rho(2)`.

---

## 4. The five riders, one line each

| rider | verdict | what to do |
|---|---|---|
| `varE-theta2-step.md`:11-22 | **STANDS**, AMEND by addition | add claim 2's sentence: the §5 `1/ln y` table and §0's near-cancellation reading are identical under either split. Without it a reader cannot tell how far the correction reaches |
| `varE-theta2-proof.md`:11-18 | **AMEND** | replace the "511 to 1148" clause with claim 3's sentence; `2X2` changes sign at x = 7 → 11 and the factor tracks it |
| `varE-spectral.md`:11-17 | **STANDS**, untested here | it is a pointer to `varE-limit-theorem.md`'s own HELD status and carries no number this pass can check. Not graded |
| `zone-tail-02-0829.md`:11-21 | **AMEND** | append claim 6's sentence: the class null is matched on residue class, not on roughness; the ensemble's rough-class offset is 7.54 at x = 29 against the class null's 6.03. Its `head-residual-factor.md`:70 clause is correct and stays |
| `head-residual-hl3.md`:11-24 | **AMEND** | append claim 11's sentence on the sign, and correct nothing else: every number in it reproduces here, including the 46–50 % share and the de-pooled 0.7005 / 0.6638 |

None of the five is **WITHDRAW**.

---

## 5. What this pass ran that the notes recorded as out of reach

| level | the note's status | measured here |
|---|---|---|
| the shift groups at x = 23 | `verify-0830-record-defects.md`:370 "x = 23 NOT RUN" | `delta*X` = 0.364320 (corpus column), `delta*X2c` = 0.007968 (corpus column), group `delta*X2` = 0.000236, `2X2` = 0.1571, `delta*Xmix` true = −0.013876 against corpus −0.029342 (ratio 2.115), `Xmix/ln y` = −0.4814, bound loose by 1608.8 |
| the tile at x = 29 | `attack-0830-tail-derivation.md`:136 asserts the direct all-origin sum at x ≤ 23 | `R + 5/2`, `R + 3`, `R + 5` exact over all 6,469,693,230 origins; `E_cls − R` = 6.0336, `E_rc/E_cls` = 1.0523, `E_sq/E_cls` = 1.0129, `n_rc` = 255,467,520, `n_sq` = 1,995,840 |
| the ensemble at y = 29 | `attack-0830-head-remainder.md`:61-63, dropped at "about fifteen minutes" | pipe/ens = 0.9535, hole-origin head − R = 4.0581, in about 40 s for these statistics (the note's SEC 1 does more per level, so this is not a like-for-like timing) |
| sixteenths of each decade | `verify-0830-record-defects.md`:379, the residual "not measured" | decade means 0.6592, 0.6705, 0.6736, 0.6740; the top decade's de-pooling is converged at eighths to +0.0004 |
| `Delta_HL` at half-decade resolution | `verify-0830-record-defects.md`:39-40, quoted not recomputed | reproduced first-hand from `nu_4`, `nu_5`: 0.8298, 0.7786, 0.7385, 0.7039, 0.6768, 0.6472 |

---

## 6. NOT REACHED, and what would falsify this pass

**NOT REACHED.** The CRT-sampled ensemble at `y ≥ 313` (the head note's SEC 3;
claim 15's sensitivity is arithmetic on its published points, not a re-run).
`X_dec` and the decoupled model at any level. The conductor-band split the
verification also declined (its "82 %" and "18 %" clauses). Anything at 1e12.
The head note's SEC 2 anchored-zone table. `attack-0830-varE-identification.md`
itself, which is the source of claim 1 and was read only through the
verification. Whether the tail note's kill-clause ruling on HL-strength is
right (claim 22).

| claim of this pass | rung | falsifier | run? |
|---|---|---|---|
| every recomputable figure of the three notes reproduces | VERIFIED | any assertion failing at 1e-4 (1e-9 for the tile identities) | YES, 0 failures over 58 call sites |
| the corpus `X2` column doubles one half of a non-even pattern | VERIFIED + PROVEN (the mirror identity) | a level where the doubled half is not the corpus column, or where `max \|W-(-h) - W+(h)\| > 0` | YES at x = 7..23; the mirror brute-forced over every shift at x = 7, 11 |
| the pooling range is 0.038 to 0.076 across three decades, not 0.038 to 0.052 | MEASURED | a decade whose 2-to-8-split pooling terms lie inside [0.038, 0.052] other than the top one | YES, three decades, nine splits |
| the residual inside the eighths is +0.0004, not +0.005 | MEASURED | a 32-split reading moving the decade mean by more than 0.001 | NO, 16 splits is the finest run |
| the top row of the head note's §3 is not gap-scale matched | MEASURED (its `E[g]` column) + fitted | a re-run of the sampler at `y ≈ 23,400` landing on `Delta_ens = 0.6814` | NO; the sampler was not rebuilt |
| the class null is not matched on roughness | VERIFIED at x ≤ 29 | an ensemble level where `E_rc − R` stops rising or falls below `E_cls − R` | NO beyond x = 29; the sequence is still rising by 0.19 over the last step |
| `pipe/ens` = 0.9535 at y = 29 | VERIFIED, exact | a second enumeration disagreeing | NO, one implementation at that level (the identities `D = prod(q-2)`, `holes = phi(W)`, `sum g = W` all hold) |

*Gate: `node research/qc.js --full` run 2026-08-30 after this note landed.
`audit-numbers.js` 251/251, `qc/selftest.js` green (54 known positives fire, 41
controls silent). The gate reports FAILED, and the finding count moves between
runs because five sibling red-team files of the same wave are still landing.
**Exactly two findings name this note, on every run: the ledger re-run guard
against `TODO.md` items Z4 and 9**, which only the owner of `TODO.md` can
clear and which the brief forbade editing. Neither `redteam-0830-slack.md` nor
`redteam-0830-slack.js` appears in refs, quotes, crosslinks, scripts,
transfers, calibration, absence, sourcing, embeds, widths, provenance or
search-convention. Every other finding names a sibling file
(`redteam-0830-doubling`, `-engine`, `-floor-sign`, `-records`, `-rml`,
`-zone`) and is not this pass's to fix. The producer verifies under
`node research/qc/embed.js --check`: code-sha256 matches, body matches
out-sha256, bit-honest. Disclosure: `qc.js --full` regenerates
`research/QUESTIONS.md` by design (`qc.js`:201), so that file now carries this
note's ledger row; that is the gate's own write, not an edit made here. No
other existing file was touched.*
