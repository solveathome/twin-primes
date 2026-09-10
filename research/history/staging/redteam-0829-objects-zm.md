# Red team: z2-state-draft-0829 and object-models-read-0829 (HELD)

<!-- ledger
id: Q-redteam-0829-objects-zm
status: ANSWERED
todo: none
question: Do the load-bearing claims of z2-state-draft-0829.md and object-models-read-0829.md survive independent re-derivation at the record, and is the Z2 draft fit to become research/Z2-STATE.md?
verdict: 96 load-bearing claims re-derived at the record, 84 CONFIRMED and 11 WEAKENED and 1 REFUTED; the one refutation is a custody label, since the Z2 draft grades as unstamped hand arithmetic a table that sits in an embedded producer's OUTPUT block, and the draft is fit to become Z2-STATE only after eight named line fixes.
-->

*(Adversarial pass. Every claim below was re-derived or re-read at the cited
file and line. This note edits no other file and is HELD in staging. It ran one
existing producer read-only, `lit-kourbatov-shortfall.js` at 0.0 s, licensed
because that producer is flagged SCRATCHPAD-GRADE and its figures are
hand-pasted; everything else is cited to an embedded OUTPUT block or recomputed
from the constants.)*

## 0. Verdict first

**Load-bearing claims re-derived at the record: 96.** CONFIRMED 84, WEAKENED 11,
REFUTED 1. Every number quoted below was read in the producer's OUTPUT block or
recomputed; the four hand-arithmetic figures were recomputed independently and
all four reproduce.

**The worst finding, and it runs against the standing compute rule.**
`z2-state-draft-0829.md` section 7 marks its eight-number band table
(`3.633, 4.074, 4.368, 4.532` and the ratios `0.943, 0.904, 0.921, 0.867`) as
"**[ARITHMETIC]**, hand computation on cited constants, **UNSTAMPED, no
producer, no adversarial pass**". That custody label is REFUTED at the record.
All eight numbers sit verbatim in the embedded OUTPUT block of
`research/import-kw-01-calibrate.js` (lines 272-278), cited at
`import-kw-zonegap.md` section 5, whose header line 13 reads "Producer,
formally embedded". The producer uses the same four geometric band midpoints
the draft names. So the draft hand-recomputed a stamped measurement, then
graded the result BELOW the rung the corpus already holds for it. The numbers
are right: an independent recomputation reproduces 3.6334, 4.0735, 4.3678,
4.5321 and 0.9429, 0.9036, 0.9208, 0.8671. What is wrong is the custody
sentence and the duplication. `object-models-read-0829.md` section 2b cites the
same four ratios correctly to `import-kw-zonegap.md` section 5, so the two
morning notes disagree about the provenance of one table and the models note is
the one that is right.

**Second, and it is the one a state document must not carry.** The draft states
the Euclid edge anchor as `head(p) <= G2(p#) - p - 1` in section 0, section 2
and section 4a. At the record the same inequality is written twice under two
symbols: `zonegap-02-reduction.md`:95 writes it for `F(p)`, the tile's first
twin-SLOT opener distance, and :122 writes it for `head(p)`. Only the `F` form
is unconditional. `head(p)` is defined only where the zone is occupied, and
where it is defined it equals `F(p)`, so the inequality is true but conditional,
and stating it with `head` hides exactly the non-circularity that makes R2
worth quoting. The draft's own section 1 table and section 5i name this
collision as load-bearing, so the draft contradicts itself across three
sections. WEAKENED, with a one-word fix.

**Third, two of the draft's three HIGH inconsistencies are already applied.**
`research/history/CHANGELOG.md`:15 records the 2026-08-29 pass; `TODO.md`:51-52
now carries both tail units and `TODO.md`:211-215 now states that the tail
census ran. Section 5a and section 5c are historical, not live, and a reader
acting on them would file a duplicate fix.

**What did NOT break.** The whole of section 2's PROVEN list survives on
hypotheses and quantifiers, R0's equality clause included. Every one of the
fifteen-plus MEASURED numbers spot-checked in section 3 reproduces digit-exact
against its producer's OUTPUT block, with one n mis-stated. Section 4a's
`s = 1.7829` recomputes exactly (`u*/2 = 1.7829225`, `beta_2/s = 2.39295`).
Section 7's arithmetic is right in every digit. Section 4b's nine (ii) verdicts
are all CONFIRMED against `attack-wrongdirection-audit.md`, and no legal (i)
target is mislabelled (ii), which is the expensive error and it did not happen.
On the models note, the `b_null = 0.167` arithmetic reproduces exactly from
`mean_k(1/L_k) = 0.06269` re-run out of the producer, and eight of the nine
deviation classifications survive an adversarial argument against them.


## 1. Claim-by-claim

Method: each row was checked by opening the cited file at the cited line, and
where a number was cited, by opening the producer's OUTPUT block. Rows marked
"recomputed" were re-derived independently from the constants, not read.

### 1a. `z2-state-draft-0829.md`, section 2 PROVEN

| claim | verdict | reason, at the record |
|---|---|---|
| weak ZP <=> TPC, both directions | CONFIRMED | `ZONE-POSTULATE.md` section 2; the backward construction (p the largest prime below r, p' = r) is checkable in one line and the draft states it |
| strong ZP strictly stronger than TPC | CONFIRMED | same section; the draft adds "every G2-based route proves the strong form, because a gap bound is uniform by construction", which is correct and is the useful half |
| the chain A091592-complete => SP => strong ZP => weak ZP <=> TPC | CONFIRMED | `stretch-01.md` section 2; the converse-containment failure is stated with its reason (no zone fits inside any stretch) |
| R0: width = head + sum(gaps) + tail exactly; head + Z2 + tail <= width, equality iff k = 2 | CONFIRMED | `zonegap-02-reduction.md` section 2 SEC B, and independently: Z2 = max gap <= sum of the k-1 gaps with equality iff k-1 = 1. The producer asserts the identity and the inequality at all 1,225 zones (`zone-tail-01.js` SEC F), with 0 zones at exactly 2 pairs in that range |
| the definedness hypothesis carried on R0 | CONFIRMED | stated by the draft in its own words, "Occupancy is not concluded by R0; it is assumed by R0's own definitions". Correct and load-bearing |
| R1 trivial and circular | CONFIRMED | `zonegap-02-reduction.md` section 2; the draft's reading that the strict inequality is exactly "k >= 3" follows from R0's equality clause |
| R2 non-circular, `F(p) < p'^2 - p - 2` i.o. => weak ZP | CONFIRMED | `zonegap-02-reduction.md`:88-92 verbatim, including the "for EVERY p => strong ZP" half |
| the occupancy caveat carried on all three | CONFIRMED | `zonegap-02-reduction.md` section 1 convention caveat; the draft's "the corpus has no proof that this set is everything" is correct |
| Zone Restriction Lemma (Lemma A) | CONFIRMED | `zonegap-02-reduction.md` section 1, VERIFIED at p = 7, 11, 13, 17, 23; the two supporting clauses are each one line |
| `Z2(p) <= G2(p#)`, equality at p = 2, 3, 5, 7, ratios 1.40..4.12 at p = 11..43 | CONFIRMED | `zonegap-01.js` OUTPUT, SHARED LEVELS table: G2/Z2 reads 1.00, 1.00, 1.00, 1.00, 1.40, 2.20, 3.00, 2.08, 1.36, 1.72, 2.32, 3.52, 3.64, 4.12. Digit-exact |
| `Z2(p) = env(p)`, `D(p)` identically 0, 27,292 of 27,292, 79 ladder transitions, tightest ratio 4.74, runs to `e_82 = 7.05e16` | CONFIRMED | `zonegap-01.js` OUTPUT CUSTODY 3 asserts the record-exact envelope at all 27,292 zones; `zonegap-03-model.md` section 1 carries the two-line argument and the 204 assertions. The conditional grade ("conditional on the adopted ladder being the true running max") is correctly carried |
| the Euclid edge anchor, `head(p) <= G2(p#) - p - 1`, anchor gaps 12, 18, 18, 30 against G2 = 30, 42, 66, 108 | **WEAKENED** | the anchor gaps and the G2 values are exact (`zonegap-02-reduction.md`:124). The SYMBOL is wrong: :95 states the same inequality for `F(p)`, the slot object, and only that form is unconditional. `head` is defined only on the occupied set, where it equals `F`, so the draft's statement is true but conditional and it erases R2's non-circularity. The record itself carries the collision at :122 |
| the companion: Euclid-type guarantees give SINGLES only inside the zone | CONFIRMED | `zonegap-02-reduction.md`:127-132, with the quantitative rider that the edge pair sits `W - p'^2` beyond the frontier |
| the capture identity, `sum_r capU_K(r) = (C - T) + X(K)`, VERIFIED at every depth of all 1,227 anchors | CONFIRMED | `quadpoint-identity-01.md`:21, :65 |
| the window clause is load-bearing: `(Q'^2 - 2, Q'^2)` a channel pair at 1,227 of 1,227, breaking the loose convention by +1, MEASURED 12 of 12 | CONFIRMED | `quadpoint-identity-01.md`:37-40 and `redteam-0828-quadpoint.md`:200-207, 218. The two counts are two different objects (1,227 anchors carry the channel pair; 12 anchors were tested for the +1 break) and the draft states both correctly |
| consequence: the certificate at (Q, y) is exactly "X(y) < T in S_Q"; at K = 0 the 8-anchor list {7, 11, 13, 19, 23, 31, 37, 43} is precisely the CC < T list | CONFIRMED | `quadpoint-identity-01.md`:84 verbatim |
| the L = 1 residue equivalence, split (a) PROVEN / (b) PROVEN + MEASURED / (c) MEASURED | CONFIRMED on the split | `attack-l1-residue.md`:36 (a, VERIFIED at 237 folds), :41-42 (T* <= G2 PROVEN, equality at four of four MEASURED), :49 (6.386e-4 to 9.724e-4). The draft's insistence that "the honest statement is (b)'s split, not proven equivalent" is exactly what the record supports |
| ...but the item's ROUTE grade is absent | **WEAKENED** | `attack-l1-residue.md`:8's ledger verdict is "REFUTED as a hypothesis", and `REFUTED.md`:74 carries the row. Section 2 places the item under PROVEN with no route-level marker; only section 4b names it. A reader of section 2 alone gets the wrong rung for the route |
| the fourteen forced fold-ledger constraints, split into identities and wrong-direction bounds | CONFIRMED | `fold-ledger-forced.md`: the fourteen are F1, F2, F3, F4b, F5, F6, F7, F8, F9, F10, F11, F12, F13, F14 (F10 at section 7, line 347; Lemma B at line 237 is a lemma, not a fifteenth constraint, and the draft counts it that way). The numbers reproduce: B3 mean 1.271, max 5 against column mean 0.267, max 3, tight at 34.0%, forces 0 at 297 folds (:183-187, :339); floors holding 29.89%, 47.10%, 84.59% with band shares 0.2984, 0.4746, 0.8444 (:37-40, :268, :343); bound/net 1.100 to 4.517 and 2.250 to 12.875 (:305, :317); min net = 2 over 1,226 folds (:32); the grid is the stretch grid, width `q'^2 - q^2` (:332) |
| "All seven point away from occupancy" | CONFIRMED | `fold-ledger-forced.md`:320, "Nothing forces net from below. F14 is a ceiling", and :404 groups F9, F10 and F11-F13 the same way. F4b sits inside the record's "definitional constraints" section but is an inequality and its direction is as the draft says |
| the zone's exact destruction ledger, `freshZone(q)` | CONFIRMED | `zonegap-02-reduction.md` section 3.4, VERIFIED SEC C4 at p = 7, 11, 13, every q; the draft's "it does not bound where the misses sit" is the record's own reading |
| the deep end is an onset desert, D1/D2/D3, 24 levels and 1,084 (p, delta) cells | CONFIRMED | `zonegap-02-reduction.md`:208 (24 levels), :222 (1,084 (p, delta) cells for D2's stride bound), :201 (D3 at all 24 levels to 97) |
| the Mirror-Sweep transfer PROVEN and its refutation as a channel, 1 of 16 at p = 7 rising to 21 of 34 at p = 17 | CONFIRMED | `zonegap-02-reduction.md`:146-147, including the named witness (167, 169) with 169 = 13^2 |
| the anchored/staircase machinery degenerates inside the zone; a windowed pigeonhole is vacuous | CONFIRMED | `zonegap-02-reduction.md` section 3.3, VERIFIED SEC C3 at five levels |
| the head-calm lemma and the first-slot recursion, both REFUTED as routes | CONFIRMED | `ZONE-POSTULATE.md` section 6 route B and `research/a3-06-origin-vs-max.js`; the draft leads with the refutation, which is the right order |
| the stretch decomposition S1/S2/S3 | CONFIRMED | `stretch-01.md` section 1, 25 stretches to q = 97, digit-exact p = 7..97 |
| the QR kill law and its guardrail summing to exactly 2(r-1) | CONFIRMED | `stretch-01.md` section 4, VERIFIED r = 7..31; the refinement is CLOSED at `REFUTED.md`:93 (`attack-z3-immune-01.md`) |

### 1b. `z2-state-draft-0829.md`, section 3 MEASURED (spot-checks at the producer)

Twenty-two numbers opened at the OUTPUT block. All reproduce except one n.

| number | verdict | producer |
|---|---|---|
| 27,292 zones, p = 2 to 316,219, 224,376,048 twin pairs, 315.7 s | CONFIRMED | `zonegap-01.js` OUTPUT header and SWEEP line |
| band `c3` = 3.426 +- 0.497, 3.681 +- 0.362, 4.022 +- 0.243, 3.930 +- 0.219 | CONFIRMED | `zonegap-01.js` PER-BAND table, digit-exact; the non-monotonicity is visible in the column |
| power fit e = 3.192 over 27,267 zones | CONFIRMED | same, THE LAW block |
| controls: ln^3 reads 3.000 +- 0.003, ln^2 reads 1.999 +- 0.004, E-form reads 3.261, sigma = 0.064, 58 and 339 control-sd | CONFIRMED | same, CONTROLS block: 58.3 and 339.0 |
| ln^2 lnln candidate's "constant" runs 11.60 to 19.17 | CONFIRMED | same |
| guard: max load `Z2/(0.76 ln^3 s)` = 0.7504 | CONFIRMED | `zonegap-01.js` maxLoad column, maximum 0.7504 at two bands |
| prereg 2 of 5, P1/P2/P5 MISS, the 9,592-vs-9,591 disclosure | CONFIRMED | `zonegap-01-prereg.md` as cited by the draft; the sealed commit `cdd753c` is named |
| mean head/ln^2 p = 0.7229 "over 27,292 zones" | **WEAKENED** | the figure is right; the n is not. `zonegap-01.js` THE HEAD block reads "over 27267 zones (p >= 100)". The draft uses 27,267 correctly for the power fit two bullets earlier |
| HL 1/(2 C2) = 0.7574, head 4.6% under | CONFIRMED, recomputed | 0.7229/0.7574 = 0.9545 |
| worst head against the Kourbatov ceiling 0.7218 at p = 659 | CONFIRMED | `zonegap-01.js` THE HEAD block |
| census window values 0.7064, 0.7177, 0.7236, 0.7192, 0.7344, non-monotone; half-decade span 0.669 to 0.753 | CONFIRMED | `destroyer-census-01.js`:943-947 and `destroyer-census-01.md`:210 |
| head is the frozen sqrt(p)-level first survivor in 1,184 of 1,225 (96.65%); tread in 105, changes 41; differ-fraction 9.09% to 1.79% | CONFIRMED | `destroyer-census-01.js`:935-939, :1016 |
| h - R = 5.679, 5.179 discrete-uniform, 2.925 coprime-to-30, offset 2.754 | CONFIRMED | `redteam-0828-head.js`:582-587, digit-exact |
| class term -0.0001; HL prices the remainder to 5.3%; 0.6545 predicted against 0.6214 +- 0.0060; 1.038 and 1.147 at the two lower decades; 0.276% amplified 19.29x; the 5.49 s.e. framing dropped | CONFIRMED | `redteam-0828-head.js`:628, :658-665; the ratio at [1e7,1e8) is 1.0532, and the jackknife alternatives 6.51 / 3.31 s.e. are why dropping the 5.49 framing is right |
| tail local units 0.5740, 0.7518, 0.7288, 0.7771 with their bootstrap intervals | CONFIRMED | `zone-tail-01.js` SEC B, digit-exact including all four intervals |
| the 0.03 drift missed at 0.0483 | CONFIRMED | `zone-tail-01.js` SEC B, "B2->B3 -0.0230, B3->B4 0.0483" |
| ln^2 p units 2.4277, 3.0220, 2.9185, 3.1096 against head 0.8530, 0.9863, 0.7494, 0.6693; `c_p/c_local` = 4.0013 | CONFIRMED | `zone-tail-01.js` SEC B |
| head 11.6% below HL, tail 2.6% above, same 782 zones | CONFIRMED, recomputed | 0.6693/0.7574 = 0.8837; 0.7771/0.7574 = 1.0260 |
| `t/R` = 1.0619, bootstrap [0.9937, 1.1321], class null over 5,962,057 origins | CONFIRMED | `zone-tail-01.js` SEC C and POOLING RULE |
| three matched non-square endpoints, sign tests z = 0.14, -0.54, +0.66, six paired intervals all containing zero | CONFIRMED | `zone-tail-01.js` SEC G; all six intervals opened and all six contain 0 |
| E4b: sqrt(p) identifies the tail in 280 zones, 22.86%, registered <= 5, Mertens price 15.21% | CONFIRMED | `zone-tail-01.js` SEC D |
| R0 shares 1.82% / 89.72% / 8.46% at B4, tail falling and Z2 rising | CONFIRMED | `zone-tail-01.js` SEC F, and the four-band trend confirms both directions |
| earlier corpus tail figures 0.578 / 0.768 / 0.766 | CONFIRMED | `zone-tail-01.js` CUSTODY block reproduces zonegap-01's published values exactly |
| record deficit: count 72 (null 68 +- 8), rate 2.562 (2.356 +- 0.304), CV 0.908 (0.944 +- 0.100), z sd 1.021 (1.264 +- 0.177) | CONFIRMED | `zonegap-03-model.md` section 3 as cited; not re-run |
| A = 0.9295 against null 0.9895, about 6.0% of trend, z = -3.3 over five window cuts | CONFIRMED, recomputed | (0.9895 - 0.9295)/0.9895 = 6.064% |
| it is Kourbatov's b = 1.2597, in-house median z = -1.2597 at n = 71 | CONFIRMED, producer re-run | `lit-kourbatov-shortfall.js` prints "b implied by the in-house z median, e < 1e15   1.2597" |
| the two in-house estimators disagree by 15%: 1.125 from A, 1.298 from mean z | CONFIRMED, producer re-run | the producer prints 1.1251 and 1.2981 on the same 72 records |
| CUSTODY: both producers SCRATCHPAD-GRADE, no OUTPUT banner | CONFIRMED | `grep -c "OUTPUT - EMBEDDED"` returns 0 for both `record-location-null.js` and `lit-kourbatov-shortfall.js` |
| depth bands K*/pool 0.061 -> 0.050 -> 0.040 -> 0.032; K* means 12.20 -> 31.22; largest K* 46 of a 1,146 pool | CONFIRMED | `attack-quadpoint-02.js`:351-368, digit-exact |
| main-term K* 3.92 -> 31.15 against measured 3.88 -> 31.22, ratio 0.998 at B8 | CONFIRMED | `attack-roughpair-error-01.js`:569-574, :643, :669 |
| ln y*/ln h 0.2624 -> 0.2763, top band 0.9843 of 1/(2 e^gamma) = 0.280730; corrected 1/u* = 0.280438, 0.10% below, moving the target by 6.6% of the residual | CONFIRMED, recomputed | `attack-quadpoint-03.js`:262-268; 1/u* = 0.2804384, the shift is 0.104% of 0.280730 and 6.63% of the residual 0.004407 |
| 0 of 1,206 anchors reach `\|E\| >= T`; chi^2/df 0.546 to 0.785; systematic 0.1% at the top band, favourable sign | CONFIRMED | `attack-roughpair-error-01.js`:523, :501-503, :605-618. The B8 systematic is -0.0012 |
| rms E 0.405 +- 0.022 against rms T 0.812 +- 0.018, gap 0.407 | CONFIRMED with a nit | `attack-roughpair-error-01.js`:536-542, :638. The record says 0.407 at u = 3 and 0.399 at u*; the draft quotes 0.407 without the depth |
| X/T = 3.054 -> 5.631 rising at beta_2; certificate only for s < 2.317; slack 1.056 falling | CONFIRMED | same producer, :560, :562-565, :651-655 |
| extinction: last kill-run at p = 181, 331, 421, 457, 631; fifth blind, sealed band [571, 877] | CONFIRMED | `ZONE-POSTULATE.md`:308-311 and `foldL-window5.md`:8, :22 |
| M_p blind validation 33 of 37 and 34 of 37, 0 of 37 outside 99.73%; the +-3 sqrt(lambda) clause failed at 43.2%; producer-02 exists in git 5m21s after the seal | CONFIRMED | as cited to `perfold-error-model.md` and `mp-derivation.md`; the custody residual is carried, which is the right call |
| occupancy at three grids: 4,118,054,813 primes to 1e11 in 599 s; 27,292 zones all with >= 2 pairs; 5,484,595 of 5,484,596 stretches | CONFIRMED | `ZONE-POSTULATE.md`:133-134; `zonegap-01.js` ZONE POSTULATE line ("zones with a single pair: 0"); `stretch-01.md`:139 |

### 1c. `z2-state-draft-0829.md`, sections 4a, 4b, 5, 7, 8

| claim | verdict | reason |
|---|---|---|
| `s = u*/2 = 1.7829`, short of `beta_2` by 2.393x; a direct twin bound needs `s ~ 1`, short by 4.266x | CONFIRMED, recomputed | 3.565845/2 = 1.7829225; 4.26645028414864191641/1.7829225 = 2.39295; 4.26645/1 = 4.26645 |
| the UNSTAMPED grade on `s = 1.7829` | CONFIRMED | `attack-wrongdirection-audit.md`:30-33 flags it in its own section 0, in the same words. The draft carries the flag rather than laundering it, which is the right handling |
| section 4a's other seven killer rows | CONFIRMED | each opened: `paper/beta2-note.md`, `attack-roughpair-error.md`, `attack-wrongdirection-audit.md` section 1 Axis C, `zonegap-02-reduction.md` section 3.3, `import-boolean-analysis.md` section 4, `stretch-01.md` section 4, `paper/wall-note.md` section 2 |
| the "factor of 81 is corrected and must not be quoted" | **WEAKENED** | `paper/wall-note.md`:261-262 says "That 81 must never be quoted **without its ensemble**", not that it must not be quoted. The draft's rule is stricter than the record's and would delete a usable citation |
| section 5a, the tail unit at `TODO.md`:51 | **WEAKENED (stale)** | the defect was real; it is applied. `TODO.md`:51-52 now reads "tail ~ (0.58..0.77) ln²(p′²), which is (2.4..3.1) ln²p in the head's unit". `CHANGELOG.md`:25-32 records it |
| section 5a's supporting line references | CONFIRMED | `zonegap-01.js`:391 is `tailM: mean(rows.map(z => z.tail / l2(z.bound)))` and :162 sets `bound = pn * pn`. `zonegap-01.md`:150 and `zonegap-02-reduction.md`:108 both write ln²(p²) |
| section 5b, Z2 absent from both routing documents | CONFIRMED, and it is exact | `grep -cE "Z₂\|Z2\|zone gap\|Zone gap"` returns 0 for `research/ZONE-POSTULATE.md` and 0 for `research/README.md`, against 3 for `G2-STATE.md`. `TODO.md`:26 does carry "The programme's one goal: prove Z₂ stays below the window" |
| section 5c, TODO Z4 says the tail field does not exist | **WEAKENED (stale)** | applied. `TODO.md`:211-215 now reads "The tail field's first per-zone dataset landed 2026-08-28 ... `Q-zone-tail` PARTIAL", and :227-230 says the first move is half executed with the 1e11 range left |
| section 5d, three constants for the margin (3.5, 3.9, 4.2) | CONFIRMED, one line number stale | `TODO.md`:53 (not :52 after the applied edit) carries 3.9; `ZONE-POSTULATE.md`:268 and :534 (not :530) carry 3.5; `maxgap-law.md`:531 is the source of 3.5; the TA-3 correction to 4.2 is still unlanded |
| section 5e, `M(x, x^2)` against `M(x, x'^2)` | CONFIRMED | `maxgap-law.md`:523 measures M(x,x^2) and reports "flat at 3.2 to 3.7"; `ZONE-POSTULATE.md`:235 and :267 quote the same band as M(x, x′²). The 7-of-7 agreement is in `zonegap-01.js`'s maxgap-law cross-check block, all YES |
| section 5f, three ranges for the tile margin column | CONFIRMED, and the arithmetic checks out | `G2-STATE.md`:401 (min 3.18 at x = 37: 1681/528 = 3.183); `ZONE-POSTULATE.md`:247 (1644/528 = 3.114); :257 ("3 to 4"); `zonegap-01.md`:96 ("3.2-4.5"). Recomputed x'^2/G2 over the 14 exact levels: min 3.183, max 4.500. The draft's "all four are arithmetically right for their own definition" is correct |
| section 5g, `stretch-01.md`'s "echoed" | CONFIRMED | :126-127 verbatim; 3.67..4.65 against the zonegap band constants 3.426..4.022, which do not match at either end |
| section 5h, the dropped qualifier at `ZONE-POSTULATE.md`:325 | CONFIRMED | :325 reads "is PROVEN EQUIVALENT to this postulate itself ... and the chain sum vanishes iff G₂ < θ" with no qualifier, against `attack-l1-residue.md`:41-42's split and `REFUTED.md`:74's parenthesis |
| section 5i, `F(p)` two objects and `tail` three | CONFIRMED | `GLOSSARY.md`:95-97 defines F(p) as the distance to the first twin OPENER; `TODO.md`:37-38 and `zonegap-02-reduction.md` section 2 define it as the first twin-SLOT opener. `GLOSSARY.md`:100-106 registers the scour tail and the distributional tail and not the zone tail |
| section 5j, "verified to 1e11" means two things | CONFIRMED | `ZONE-POSTULATE.md`:133 (every prime to 1e11) against `zonegap-01.js` (every zone with p'^2 <= 1e11, p to 316,219) |
| section 5k, seven places checked and found consistent | CONFIRMED | spot-checked four of the seven independently (the Z2 <= G2 ladder, the 0.7504/0.8434 pair, rho(2) = 0.7930547, beta_2); all consistent |
| section 7's effective coefficients 3.633, 4.074, 4.368, 4.532 and the ratios 0.943, 0.904, 0.921, 0.867 | CONFIRMED as numbers | recomputed from `a = 4*0.75739*ln^2 p` and `E3 = a*(ln H - ln a)` at p = 10^2.5, 10^3.5, 10^4.5, 10^5.25: 3.6334, 4.0735, 4.3678, 4.5321 and 0.9429, 0.9036, 0.9208, 0.8671. `ln(3.02956) = 1.108418` and `4/C2 = 6.059121` also check |
| ...their custody grade "[ARITHMETIC], UNSTAMPED, no producer, no adversarial pass" | **REFUTED** | `research/import-kw-01-calibrate.js`:272-278 carries all eight in its embedded OUTPUT block, with the same geometric band midpoints (:183-188), cited at `import-kw-zonegap.md` section 5. The producer is described at :13 as "Producer, formally embedded" |
| section 7's Kourbatov quotations: 0.76 log^3 p, the C2 notation collision, the four slopes 0.4576/0.4756/0.5203/0.5628, "not a one-slope-fits-all situation" | CONFIRMED | `ZONE-POSTULATE.md` section 4 and `lit-kourbatov-shortfall.md`:279-284, both read at page image per those notes |
| section 8's eight questions, each graded (i) | CONFIRMED | none restates a `REFUTED.md` row; the eight rows the draft names as the zone-side closures all exist (`REFUTED.md`:33, :34, :37, :70, :74, :75, :90, :93) |

### 1d. `object-models-read-0829.md`

| claim | verdict | reason |
|---|---|---|
| (a) independent thinning: gap word exactly Geometric, `c_null` 1.527151 at fold 7 to 1.023916 at fold 1499, `mbar = 2.402607 ln^2 x`, prediction `G2 ~ 2.4026 x ln^2 x` | CONFIRMED | `import-thinning.md`:31 and `null-limsup.md`:42, :92, :109 |
| (a)'s deviation term `Psi - Phi^2` | CONFIRMED | `import-thinning.md` section 2.3 as cited; the draft correctly calls it PROVEN as a statement about the null, not about the tile |
| (b) Cramer comb: `G2_null = mbar ln D`, sd/mean 1, skew 2, tail slope -1, `\|B_N\|/W = exp(-N/mbar)` | CONFIRMED | `gap-spectrum-01.md` section 1 pre-registration |
| (b)'s one-log separation from dimension-2 Maier-Pomerance, and the FGKT accounting `c = T1 r/log x` | CONFIRMED | `maxgap-law.md` section 7 and `two-class-lower-bounds.md` sections 4b, 9, as cited |
| (c) HL/Kourbatov CONJECTURE-ONLY, zero theorems in the source | CONFIRMED | `import-kw-zonegap.md`:8's own verdict says the same |
| (c)'s forms, `b ~ 2/k = 1`, `b = 1.2597`, `-b = mu* + gamma` giving 1.0818 | CONFIRMED, producer re-run | `lit-kourbatov-shortfall.js` (c) table: 1, 1.0818, 1.2597 with A(b) 0.9373, 0.9322, 0.9210 |
| (d) pure-Exp record process, three controls passing, A = 1.000000 and injection 0.525 against truth 0.500 | CONFIRMED | `zonegap-03-model.md` section 3 as cited |
| (d)-vs-(c): the two trend curves 8.9% apart, `mean T_c/Tbar = 0.9114` | CONFIRMED, producer re-run | the producer prints 0.9114 and `mean (Tbar - T_c)/abar = 1.4830` |
| (e) `lambda_2(2) = 1 - e^(-2 gamma)(9/2 - 4 ln 2) = 0.45546` | CONFIRMED, recomputed | 1 - 0.315225 * 1.727411 = 0.455463 |
| (f) the Survival Quotient Identity, VERIFIED 39 of 39; rho(2) = e^(2 gamma)/4 = 0.79305 measured 0.79303 at x = 1487 | CONFIRMED | `origin-excess.md`:36-37; recomputed e^(2 gamma)/4 = 0.7930547 |
| section 2a: max/mean, sd/mean, skew, log-tail slopes, deficit factors 2.241 and 2.087, `\|B_N\|` ratios, `Var/E` nine levels, TV 0.18069 -> 0.01397, N2 0.75..0.86, 33/37 and 34/37 | CONFIRMED | `gap-spectrum-01.md`:8, :91-92, :174-175, :262, :292; `import-thinning.md` section 2.2; `foldL-window5.md`; `perfold-error-model.md`. The ratios 0.446 and 0.479 are 1/2.241 and 1/2.087 exactly |
| section 2b: the Z2 rows | CONFIRMED | each traced; the four ratios 0.943..0.867 are correctly cited to `import-kw-zonegap.md` section 5, which is the stamped source the Z2 draft missed |
| section 2b's `R0 share` row, n given as 1,225 zones | **WEAKENED** | the shares 1.82 / 89.72 / 8.46 are B4's, which is 782 zones (`zone-tail-01.js` SEC F); 1,225 is where the identity is asserted. Two n's in one cell |
| D1 origin deficit REAL and PROVEN in direction | CONFIRMED | and the note correctly separates the proven identity from the un-proven argmin claim at u = 2 |
| D2 beta's descent, 1.156 -> 0.846, z = +1.05 to -22,633, four on-record forecasts | CONFIRMED | `paper/wall-note.md`:272 and `paper/anchored-note.md` sections 3, 10 |
| D3 the 6.0% deficit REAL, NOT new, not blind; the out-of-sample b = 0.937 on 17 records | CONFIRMED, producer re-run | the producer's height profile prints 0.7133, 1.8161, 1.6197, 0.9372 |
| D4 sub-Poisson REAL, the fitted 0.611 REFUTED by control | CONFIRMED | `redteam-0828-varE.md` as cited; the note is right that no value of `lim Var/E` is measured anywhere |
| D5 lighter-than-renewal tail, REAL, pre-registered, confined to x <= 31 | CONFIRMED on the numbers, **WEAKENED on one item of evidence** | the deficit factors, slopes and `\|B_N\|` ratios all reproduce. But "exactly zero at s = 1.75 where the null predicts 6.5e5 empty windows" is listed as evidence without the source's own lead caveat: `gap-spectrum-01.md`:273-274 says "**The caveat first.** `\|B_N\|` collapses to exactly 0 at s = 1.75 at every level from x = 13 up, **because G2 < x^1.75 at every level from x = 13 up**". It follows from the exponent being under 1.75, so it is not an independent falsification of the null. The same unqualified use recurs in section 5's D5 row |
| D6 the ~20% overprediction with two sealed blind hits, +25.4 nats, `W1` exponent reading 1.031 where the derivation says 1 | CONFIRMED | `mp-derivation.md` and `perfold-error-model.md` as cited |
| D7 the -0.41% to -0.48% offset, sigma_J understating by 2.11x and 2.12x | CONFIRMED | `G2-STATE.md` section 0 and `xchan-at29.md` as cited |
| D8 sub-Poisson rough-pair error, control NOT RUN, chi^2/df as low as 0.289 | CONFIRMED | `attack-roughpair-error-01.js`:518 gives 0.289 at u = 5 B5; the note's "below 1 everywhere" matches the producer's own "never exceeds 0.931 anywhere in SEC 2" |
| D9 the forbidden band, `g(6) = 2.661728` at x = 11 | CONFIRMED, recomputed | 6 * (5/9)(21/25)(77/81) = 2.6617284 |
| section 4's `b_null = 0.167` and `b_data = 1.125` | CONFIRMED as arithmetic, **WEAKENED as framing** | recomputed: (1 - 0.9895)/0.06269 = 0.16749 and (1 - 0.9295)/0.06269 = 1.12458, and the producer prints `mean 1/L_k = 0.06269` at n = 72 and 1.1251 for the A-route. Two framing problems. First, "That much is a calculus fact about the trend and is free" overstates: `A_null = 0.9895` is a 200-replicate simulation output, not calculus. Second, "reproduces about 15% of the effect" is 15% of `b_data`, but the corpus's "effect" is the 6.06% deficit measured AGAINST that null, of which `b_null` explains 0% by construction. Both readings are defensible; the sentence does not say which is meant |
| section 4's D3 arithmetic custody | **WEAKENED** | the two inputs come from `lit-kourbatov-shortfall.md` sections 4-5, whose producer carries no OUTPUT banner. Section 7 C1 states this constraint; section 4 does not carry it where the number is used |
| section 4's D4 "misses that threshold by a factor 81 at @19" | **WEAKENED** | quoted with a hedge but without naming the two ensembles the pairing mixes, which is what `paper/wall-note.md`:261-262 requires |
| section 4's D5 classification RESIDUE-LEVEL, and the sharper placement argument | CONFIRMED | the two supports are at the record: `import-thinning.md`:269-270 ("manufactures a tail out of nothing, while CRT merges only at qualifying gaps, leaves the bulk alone") and the Merge Rate Identity PROVEN at :224, :384. The `G2 <= N + \|B_N\|` degeneracy is `gap-spectrum-01.md`:8's own verdict |
| section 4's other seven classifications | CONFIRMED (see section 4 below for the adversarial arguments) | |
| section 5's direction table | CONFIRMED | each "does the corpus already say it" column entry traced; `TODO.md`:53 carries the margin marker (at :52-53 after the applied edit) |
| section 6 I1 | CONFIRMED, now APPLIED | `CHANGELOG.md`:25-32 |
| section 6 I2, the sealed T5 prediction `c3 = 4.182 +- 0.132` above TODO's 4.0 | CONFIRMED as posed | `TODO.md`:50 still reads "(3.4..4.0) ln³p drifting"; the contradiction is pending, not current, which is how the note grades it |
| section 6 I3, the 15% estimator disagreement | CONFIRMED, producer re-run | 1.1251 against 1.2981, and the bottom band's b = 0.7133 is the stated cause |
| section 6 I4, the uncorrected earlier note | CONFIRMED | `lit-kourbatov-shortfall.md` section 8 says the decade slopes are "the weaker of the two available citations"; `record-location-null.md` still reads as written |
| section 6 I5, the `Var/E` window convention at `GLOSSARY.md`:401-403 | CONFIRMED | the entry gives the levels and not the comb-diagonal coordinate |
| section 6 I6, the h2/h control conflation | CONFIRMED | `exponent-control.md`:19 (control 1.282, truth 1), :138 (all 40 windows, minimum 1.197), :182-183 (1.57 +- 0.06 for h2, 1.50 +- 0.05 for G2 on 22 trusted terms). The note's correction is right |
| section 8's "checked against all 67 rows" | CONFIRMED | `REFUTED.md` holds exactly 67 data rows |


## 2. Proposed live-layer edits

**Lead with what is NOT proposed.** No edit to any live document is proposed
from this pass except the two below, and both are one-line pointer additions.
Every other CONFIRMED inconsistency this pass found sits inside the two HELD
staging notes it red-teamed, so the fix is to those notes and not to the live
layer. Section 5a and section 5c of the Z2 draft are already applied and must
not be applied twice.

All proposed text is plain and carries no em dashes. Items are flagged APPLY
(mechanical, verified at the record by this pass) or HOLD (needs Chris, because
it changes a rung, a target label, or a live document's scope).

### 2a. APPLY, to `z2-state-draft-0829.md` (the note under review)

**E1. The section 7 custody sentence is wrong and must come out.** This is the
worst finding and the fix is mechanical.

- File: `research/history/staging/z2-state-draft-0829.md`, lines 1029-1032.
- OLD: `[**[ARITHMETIC]**, hand computation on cited constants, **UNSTAMPED, no producer, no adversarial pass**: the same grade as §4a's s = 1.7829, and it should be stamped before it is quoted outside this note.]`
- NEW: `[**[MEASURED]**, and it is already stamped: all eight numbers below sit in the embedded OUTPUT block of ` + "`research/import-kw-01-calibrate.js`" + ` (lines 272-278), cited at ` + "`import-kw-zonegap.md`" + ` §5, which runs the same four geometric band midpoints. Recomputed here from the constants and reproduced to four digits; this paragraph is a re-derivation of a stamped artifact and not a new one, and by the standing compute rule the artifact is what should be cited.]`

**E2. The Euclid anchor's symbol.** Three places in the same note.

- File: same, line 58-59 (§0), lines 228-233 (§2), line 584 (§4a table row 1).
- OLD (each): `head(p) <= G2(p#) - p - 1`
- NEW (each): `F(p) <= G2(p#) - p - 1`
- And append once, at the §2 occurrence: `where F(p) is R2's slot object; head(p) equals F(p) exactly on the set where the zone is occupied, and only the F form is unconditional. ` + "`zonegap-02-reduction.md`" + `:95 states it for F and :122 states the same inequality for head, which is the collision §5i names.`

**E3. The head coefficient's n.**

- File: same, line 402.
- OLD: `mean head/ln^2 p = **0.7229** over 27,292 zones to 1e11`
- NEW: `mean head/ln^2 p = **0.7229** over 27,267 zones to 1e11 (the p >= 100 subset, ` + "`zonegap-01.js`" + ` THE HEAD block)`

**E4. The factor-of-81 rule.**

- File: same, line 94.
- OLD: `the earlier mixed-ensemble "factor of 81" is corrected and must not be quoted`
- NEW: `the earlier mixed-ensemble "factor of 81" is corrected and must never be quoted without naming its two ensembles (` + "`paper/wall-note.md`" + `:261-262)`

**E5. The stale `REFUTED.md` row number.**

- File: same, line 618.
- OLD: `` + "`REFUTED.md`" + ` row 64 (any constant bound on the anchored delta)`
- NEW: `` + "`REFUTED.md`" + `, the row "bounding the anchored delta by the forced scale (or any constant) as a lemma" (the file is unnumbered; that row is data row 46 today, so cite it by text)`

**E6. The two stale section 5 findings.** Both were verified and applied on
2026-08-29; the note should say so rather than read as a live defect.

- File: same, line 706 heading and line 745 heading.
- OLD (line 706): `### 5a. HIGH: the tail is quoted in the wrong unit in the live TARGET block, a factor of four`
- NEW: `### 5a. APPLIED 2026-08-29: the tail was quoted in the wrong unit in the live TARGET block, a factor of four`
- OLD (line 745): `### 5c. HIGH: TODO Z4 says the tail field does not exist; it was produced on 2026-08-28`
- NEW: `### 5c. APPLIED 2026-08-29: TODO Z4 said the tail field did not exist; it was produced on 2026-08-28`
- And in both, append: `Applied by the orchestrator after verification at the record; see ` + "`research/history/CHANGELOG.md`" + ` 2026-08-29. ` + "`TODO.md`" + `:51-52 now carries both units and :211-215 now states what ran.`

**E7. The line numbers that drifted under the same applied pass.**

- File: same, line 767 and line 769.
- OLD: `` + "`TODO.md`" + `:52, "Margin diverges like p²/(3.9 ln³p)"` and `` + "`research/ZONE-POSTULATE.md`" + `:268 and :530`
- NEW: `` + "`TODO.md`" + `:53, "Margin diverges like p²/(3.9 ln³p)"` and `` + "`research/ZONE-POSTULATE.md`" + `:268 and :534`

**E8. The L = 1 item's missing route grade.**

- File: same, line 252.
- OLD: `**The L = 1 residue equivalence** [PROVEN in part, MEASURED in part,`
- NEW: `**The L = 1 residue equivalence** [the ROUTE is REFUTED, ` + "`REFUTED.md`" + ` row "the L = 1 residue count as a smaller target than the postulate"; the lemmas below are PROVEN in part, MEASURED in part,`

### 2b. APPLY, to `object-models-read-0829.md` (the note under review)

**E9. D5's `s = 1.75` evidence needs the source's own caveat.**

- File: `research/history/staging/object-models-read-0829.md`, line 394 (§3 D5) and line 641 (§5 table row D5).
- OLD (each): `exactly zero at s = 1.75 where the null predicts 6.5e5 empty windows`
- NEW (each): `exactly zero at s = 1.75, which the source leads with as a caveat rather than as evidence, because it follows from G2 < x^1.75 at every level from x = 13 up (` + "`gap-spectrum-01.md`" + `:273-274) and so is not an independent falsification of the null`

**E10. The `b_null` framing.**

- File: same, lines 503-511 (§4, the first bullet).
- OLD: `So the matched pure-Exp record process on the correct arithmetic mean density reproduces about 15% of the effect and no more. **That much is a calculus fact about the trend and is free; the remaining 0.96 is not explained by it.**`
- NEW: `So on the b scale the matched pure-Exp record process sits at 0.167 against the data's 1.125, about 15% of it. **State which baseline is meant: against a b = 0 baseline the null accounts for that 15%, while against the 6.06% deficit as the corpus measures it, which is measured relative to this null, the null accounts for none of it by construction. The remaining 0.96 on the b scale is not explained by the null's own level.** And the level itself is a 200-replicate simulation output, not a closed form.`

**E11. The custody of D3's inputs.**

- File: same, line 511, appended to the same bullet.
- NEW (append): `Custody, carried where the number is used: both inputs come from ` + "`lit-kourbatov-shortfall.md`" + ` §§4-5, whose producer carries no OUTPUT banner and is SCRATCHPAD-GRADE, so this arithmetic inherits that grade and none of it may leave staging until a producer carries a banner. Re-run for this pass, the producer does print mean 1/L_k = 0.06269 at n = 72 and 1.1251 for the A route.`

**E12. The factor-of-81 ensemble.**

- File: same, line 589.
- OLD: `misses that threshold by a factor 81 at @19 with the gap growing like ` + "`ln^2 W`" + ``
- NEW: `misses that threshold by a factor 81 at @19, a figure that must never be quoted without naming its two ensembles, since the epsilon is the window ensemble's and the cardinality is the rotation ensemble's (` + "`paper/wall-note.md`" + `:261-262), with the gap growing like ` + "`ln^2 W`" + ``

**E13. The `R0 share` row's n.**

- File: same, line 313.
- OLD: `| ` + "`R0` share" + ` | - | 1.82% head, 89.72% ` + "`Z2`" + `, 8.46% tail at B4 | 1,225 zones | asserted at all zones | no | ` + "`zone-tail-01.md`" + ` §0 |`
- NEW: `| ` + "`R0` share" + ` | - | 1.82% head, 89.72% ` + "`Z2`" + `, 8.46% tail at B4 | 782 zones (B4); the identity is asserted at all 1,225 | asserted at all zones | no | ` + "`zone-tail-01.md`" + ` §0 |`

### 2c. HOLD, for Chris

**H1. `zonegap-02-reduction.md`:122 states the Euclid anchor for `head` where
:95 states it for `F`.** The same file carries both symbols for one inequality.
Only the `F` form is unconditional. This is a HELD record and the fix changes
the statement of a PROVEN item, so it is not mechanical. Proposed: :122's
`head(p) <= G2(p#) - p - 1` becomes `F(p) <= G2(p#) - p - 1, and head(p) <=
G2(p#) - p - 1 wherever head is defined`, with a one-clause reason.

**H2. `ZONE-POSTULATE.md`:325 drops a qualifier the record and `REFUTED.md`
both carry** (the Z2 draft's section 5h, CONFIRMED here). The live document
reads "is PROVEN EQUIVALENT to this postulate itself"; the record proves
`T* <= G2` always and MEASURES `T* = G2` at four of four windows. Proposed:
append `(three lemmas; T* = G₂ measured at four of four windows)`, which is the
exact parenthesis `REFUTED.md`:74 already carries. HOLD because it downgrades a
rung in a live canonical document.

**H3. Z2 is unreachable from `research/ZONE-POSTULATE.md` and
`research/README.md`** (the Z2 draft's section 5b, CONFIRMED here at zero
occurrences in each). The draft proposes either a Z2 section inside
`ZONE-POSTULATE.md` or a promoted standalone `research/Z2-STATE.md`. That is
Chris's call and section 5 below gives the fitness read.

**H4. The margin constant, 3.5 against 3.9 against the audited 4.2.** The Z2
draft's section 5d is CONFIRMED and the TA-3 correction is still unlanded at
four live files. HOLD because landing it changes a number quoted in
`ZONE-POSTULATE.md` twice and in `TODO.md` once, and because whether the zone
figure (3.9) and the tile figure (3.5) are one object is not settled anywhere.

**H5. The (iii) label on the Z2 draft's legal item 10 (strong ZP => SP by a
non-containment route).** The paragraph's own argument establishes (i): the
implication between two TPC-strength statements is not itself TPC-strength, so
proving it certifies no twin pair. (iii) is the more cautious label and it does
not kill the target, so this is not urgent; but the label and the argument in
the same paragraph disagree, and one of the two should move.

**H6. The Z2 draft's legal item 4 (a derivation of Kourbatov's b) carries no
quantifier-police clause, while items 7 and 11 carry one for the same
exposure.** A sharper in-house estimate of `b` is plainly (i). An unconditional
all-heights derivation of `b` as a mechanism is an asymptotic for maximal twin
gaps, which is the very reason the draft grades item 11 (iii). Proposed: add to
item 4 the same rider item 7 carries, `police the quantifier: the unconditional
all-heights form is at least item 11's grade`.


## 3. What the two notes missed

**Lead with the shape of the miss.** Neither note read the other, and the two
misses below are complementary: the Z2 draft hand-recomputed a table the models
note cites correctly, and the models note omits the custody caveat the Z2 draft
carries for the same family of numbers. A single cross-read of the two morning
notes would have caught both.

**M1. The Z2 draft's section 7 table is a stamped artifact, and the models note
already says so.** `research/import-kw-01-calibrate.js`:272-278 prints the four
effective coefficients and the four ratios; `research/import-kw-01-calibrate.js`:183-188
sets the same four geometric band midpoints the draft names;
`import-kw-zonegap.md`:13 grades the producer "formally embedded" and
`import-kw-zonegap.md`:211-213 carries the ratios. `object-models-read-0829.md`
line 299 cites exactly that. The Z2 draft cites `ZONE-POSTULATE.md` §4 and
`import-kw-zonegap.md` for the model's FORM at line 1007 but not for its
numbers. Checked further: the producer's own advisory at
`import-kw-zonegap.md`:226-227 flags four figures as prose reformattings, and
the band table is not among them, so the promoted rung in section 2's E1 is
safe.

**M2. The `head`/`F` collision lives inside one file, and section 5i does not
look there.** `zonegap-02-reduction.md`:95 states `F(p) <= G2(p#) - p - 1` and
:122 states `head(p) <= G2(p#) - p - 1` for the same inequality, twelve lines
of prose apart. Section 5i correctly finds the collision between
`GLOSSARY.md`:95-97 and `TODO.md`:37-38, but the load-bearing instance is the
one inside the note that proves the item, and it is what the draft then copies
into its own section 0, section 2 and section 4a.

**M3. Both notes drop the audit's instrument rider on the exponent band.**
`attack-wrongdirection-audit.md`:87 (§2 row 10) grades the band (2, 4.2665]
legal and then says what to police: "police the *instrument*, not the exponent:
RML's legality rests on the **measured** floor crossing in (31, 47], not on a
proof, and the rho -> R_H step that turns it TPC-implying is invisible in the
delivered exponent". The Z2 draft's legal item 3 (lines 636-640) carries the
separation argument and not the rider. A reader taking item 3 as the whole label
would spend a session on an instrument whose legality is measured, not proven.

**M4. R0's equality branch has zero witnesses on the swept grid, and neither
note says so.** `research/zone-tail-01.js` SEC F reports "equality asserted at
the 0 zones with exactly 2 pairs, strict at the 1225 with >= 3". R0's
"equality iff k = 2" is PROVEN and the draft states it correctly, but on the
1,225-zone range the equality branch is vacuous, so nothing empirical tests it.
A state document should carry that, because the identity's equality case is the
one a future reader will reach for when the zone is thin.

**M5. `TODO.md`'s applied tail line asserts a conversion that is not one.**
`TODO.md`:51-52 now reads "tail ~ (0.58..0.77) ln²(p′²), which is (2.4..3.1)
ln²p in the head's unit". The first range is `zonegap-01.js`'s six decade bands
at X = 1e11 under a mean-of-ratios estimator (0.578 to 0.768); the second is
`zone-tail-01.js`'s four bands at X = 1e8 under a ratio-of-sums estimator
(2.4277 to 3.1096). Four times the first range is (2.31, 3.07), which is not
the second. The word "which is" reads as arithmetic and is in fact two
measurements on two grids. The fix is one clause naming the second range's
source, and `zone-tail-01.md` §3 is already cited on the next line, so the
severity is low.

**M6. The Z2 draft says the tail note is "HELD and NOT red-teamed" (line 437).**
Nineteen of its numbers were opened at the producer for this pass and all
nineteen reproduce, so that clause is now stale in one direction. Not a defect,
recorded so it is not carried forward unchanged into a promoted document.

## 4. Label audit

**Method, and the error direction guarded against.** A wrong (ii) kills a legal
target for nothing, so each (ii) was attacked first: an argument was built for
why the target might NOT imply TPC, and the label stands only where that
argument fails. Each (i) was attacked in the other direction: an argument was
built for a bridge to TPC, and the label stands only where no bridge is found.
Labels follow `attack-wrongdirection-audit.md` §2's definitions, which the Z2
draft restates correctly at lines 601-604.

### 4a. `z2-state-draft-0829.md` section 4b, the settled (ii) table

| # | statement | draft label | my verdict |
|---|---|---|---|
| 1 | the certificate `sum_r capU_K(r) <= C - 1`, equivalently `X(y) < T` | (ii) | **CONFIRMED**. Attacked: could the certificate hold with `T = 0`? No, `X(K) >= 0` forces `T >= X(K) + 1 >= 1`, and the capture identity is PROVEN and verified at every depth of 1,227 anchors. `attack-wrongdirection-audit.md`:91-115 |
| 2 | the all-Q depth law `y* = h^{1/(2 e^gamma)}` | (ii) and stronger | **CONFIRMED**. Attacked: is `y*` definable without occupancy? No, `y*(Q)` exists iff `T(Q) >= 1` (`quadpoint-identity-01.md` §2), so the all-Q asymptotic presupposes the strong stretch postulate. Audit §3.2 |
| 3 | Z2 route (b), beating the twin density in a rough-pair error term | (ii) and stronger | **CONFIRMED**. Attacked: could an error bound alone stop short of a comparison to T? Its only use is to certify `X(y*) < T`, which is row 1. Audit §3.8 |
| 4 | any bound placing Z2 below the window i.o., in R1 form | (ii) | **CONFIRMED**. Attacked: is the premise satisfiable vacuously? No, head, Z2 and tail are defined only at k >= 2, so the premise contains occupancy. `zonegap-02-reduction.md` §2 |
| 5 | `F(p) < p'^2 - p - 2` i.o. (R2) | (ii) | **CONFIRMED**. Attacked: F is a slot object, so does the conclusion need a further step? Lemma A closes it: the in-zone slot openers and the in-zone prime openers are the same set, and the premise puts the whole slot inside the zone. `zonegap-02-reduction.md` §2 |
| 6 | `net >= 1` at every fold; bounding the ledger's short-window fluctuation below the mean at every fold | (ii) | **CONFIRMED**. `fold-ledger-forced.md`:320, "Nothing forces net from below", and :32, "bounding it below the mean at every fold IS the postulate" |
| 7 | the L = 1 chain sum vanishing with the `L >= 2` terms restored | (ii) | **CONFIRMED**. `attack-l1-residue.md`:8's own verdict; `REFUTED.md`:74 |
| 8 | SP (every stretch occupied); A091592-completeness | (ii) | **CONFIRMED**. SP => strong ZP by containment, and strong ZP => weak ZP <=> TPC. `stretch-01.md` §2. Attacked: does SP => TPC need the containment to be strict? No, one pair in one stretch above any height suffices |
| 9 | any positivity statement at the anchored point, i.o. | (ii) | **CONFIRMED on the label, citation stale**. `paper/anchored-note.md` §8 does hold Proposition 2 (line 323 sits inside §8, lines 304-340), so that pointer is right. The `REFUTED.md` "row 64" pointer is not resolvable: the file is unnumbered and the named row is data row 46 |

**No (ii) here is a wrong (ii).** That is the expensive error and it did not
occur. Nine of nine stand.

### 4b. `z2-state-draft-0829.md` section 4b, the legal list

| # | target | draft label | my verdict |
|---|---|---|---|
| 1 | an upper bound on `X(y)` alone, no comparison to T | (i) | **CONFIRMED**. The audit says it in those words at §3.1's closing paragraph. Attacked: could an upper bound on X plus a known lower bound on T close it? A lower bound on T is the conjecture, and none is quoted here |
| 2 | the conditional depth law on the set where `T >= 1` | (i) | **CONFIRMED, one divergence**. The audit's repair (§2 row 2) is the same statement with limit `1/(2 e^gamma)`; the draft substitutes the corrected `1/u* = 0.280438`. The substitution is defensible and cited, but it is the draft's and not the audit's, and the label is unaffected |
| 3 | any unconditional two-class exponent in (2, 4.26645] | (i) | **CONFIRMED, rider missing**. The band is legal by Axis A, and 4.26645 is PROVEN while TPC is open. The audit's explicit "police the instrument, not the exponent" rider (:87) is dropped; see section 3 M3 |
| 4 | a derivation of Kourbatov's `b`, and a sharper in-house estimate | (i) | **WEAKENED, not wrong**. A sharper estimate of a finite-height coefficient on 72 existing records is plainly (i). But an unconditional all-heights derivation of `b` as a mechanism is an asymptotic for maximal twin gaps, which is precisely why the draft grades item 11 (iii). The two items are labelled inconsistently for the same exposure. Fix is a police clause, not a relabel (section 2, H6) |
| 5 | a non-HL derivation of the head's residual remainder | (i) | **CONFIRMED as posed**. It is a statement about `E[head]`, an average over the p where head is defined, so it produces no occupancy. Police the same quantifier: an unconditional pointwise asymptotic `head(p) ~ 0.7574 ln^2 p` at every p asserts head is finite at every p, which is the strong form |
| 6 | resolving the tail's `t/R = 1.0619` surplus | (i) | **CONFIRMED**. A distributional statement about a measured field on zones already known occupied |
| 7 | `Z2(p) < p'^2 - p^2` at every p where Z2 is defined | (i) | **CONFIRMED, and it is the best-labelled item in the list**. The definedness clause is explicit and the draft polices the unconditional form as (ii) in the same bullet. Attacked: does the conditional form plus R0 produce anything? No, a conditional statement cannot generate occupancy |
| 8 | a general written proof of the `Phi*` transplant's regime boundaries | (i) | **CONFIRMED**. It bounds destruction, which section 2's own framing shows is the wrong direction |
| 9 | the co-edge window bookkeeping | (i) | **CONFIRMED**. Certification does not survive the mirror (`zonegap-02-reduction.md` §3.2), so nothing transfers and nothing is certified |
| 10 | whether strong ZP implies SP by a non-containment route | (iii) | **WEAKENED**. The paragraph's own argument establishes (i): an implication between two TPC-strength statements is not itself TPC-strength, and proving it certifies no twin pair. (iii) is the safer label and does not kill the target, so this is a consistency defect and not a hazard. See section 2, H5 |
| 11 | whether the record process's trend load `A` rises toward 1 | (iii) | **CONFIRMED**. A proof that `A -> 1` is an asymptotic for maximal twin gaps at unbounded height, at least Kourbatov-conjecture strength, and nothing in the corpus prices that implication. (iii) is right |
| 12 | whether `M_p`'s anchor-constancy is a measured identity | (i) | **CONFIRMED**. A statement about a fold-factor field's dependence on its anchor; it certifies nothing |

### 4c. `z2-state-draft-0829.md` sections 6 and 8

| where | labels | my verdict |
|---|---|---|
| §6 item 1, Z2's binding gap against the last stretch S_p | (i), with the unconditional form policed as (ii) | **CONFIRMED**. The police clause is present and correct |
| §6 items 2, 3, 5, 6, 7 | (i) | **CONFIRMED**, five of five. Item 2 bounds destruction; item 3 verifies a proven statement; item 5 is a measured field; item 6 extends a table-certified budget; item 7 fits a cloud against a trend |
| §6 item 4, pin Kourbatov's `b` | (i) | **CONFIRMED as posed**, because "reconcile the two in-house estimators on 72 existing records" is finite arithmetic. The same police clause as legal item 4 belongs here |
| §8 items 1, 3, 5, 6, 8 | (i) | **CONFIRMED**, five of five: a classification of statements, a completeness question about a deterministic functional, a distributional question about two measured fields, a comparison of two measured coefficients, and a question about a finite ladder |
| §8 item 2, the equivariance wall's zone-side statement | (i), with "anything that concludes positivity at the anchor is (ii)" | **CONFIRMED**, and the police clause is the right one |
| §8 item 4, the SP/ZP separation rate | (i) | **CONFIRMED**. A heuristic failure-rate computation on a model implies nothing about either postulate |
| §8 item 7, the fourteen constraints' zone-grid analogues | (i) for identities and ceilings, (ii) for the floor on `net`, excluded | **CONFIRMED**, and the split is exactly right: a floor on `net` is the postulate |

### 4d. `object-models-read-0829.md` sections 7 and 8

| where | labels | my verdict |
|---|---|---|
| §7 C1, the inhomogeneous-intensity record null | "NONE, category (i) strictly weaker" | **CONFIRMED**. A null-side calibration produces no statement about T |
| §7 C2, the latticed record null | NONE | **CONFIRMED**. Same reason |
| §7 C3, a zero-parameter prediction of the tail-deficit factor | NONE | **CONFIRMED**. A statement about the SIZE distribution of tile gaps is silent about placement, which the note's own §4 argues |
| §7 C4, the control the rough-pair note names | NONE for the control; the surrounding item Z2 labelled (ii) | **CONFIRMED, and this is the most careful label in either note**. It separates the null-side control from the certificate it sits next to and says the control must never be reported as progress on the certificate |
| §7 C5, the @37 gap spectrum; §7 C6, `Var/E` at x = 41 | NONE | **CONFIRMED**, both. Exact computations of a distribution and a variance |
| §8 Q1-Q6 | NONE on all six | **CONFIRMED**, six of six. Q1 is a closed form for a null's own coefficient; Q2 a limit of a fitted slope; Q3 an identification of two residue objects; Q4 a consistency check between two second moments; Q5 a taxonomy statement; Q6 a question about two measured constants, and the note explicitly says it "proposes no origin advantage", which keeps it clear of `REFUTED.md`'s reversed row |

**Totals.** Fifty-three labels audited across the two notes. Fifty CONFIRMED,
three WEAKENED (Z2 draft legal items 3 and 4, and legal item 10's (iii) against
its own argument). Zero legal targets are mislabelled TPC-strength, and zero
TPC-strength statements are mislabelled legal. That is the outcome that matters
most and it is clean.


## 5. Z2-STATE fitness

**Verdict: not fit as it stands, fit after eight named line fixes, and one of
the eight is not cosmetic.** The draft's discipline is close to what a state
document needs. Every section leads with its limit rather than its result, the
PROVEN list is separated from the MEASURED list and the wrong-direction items
inside the PROVEN list are marked as such, the (i)/(ii)/(iii) labels are right
at fifty of fifty-three and no legal target is killed, every number spot-checked
reproduces at its producer, and the closing paragraph correctly subordinates the
document to `README.md` §Status and `research/G2-STATE.md` §0. What blocks
promotion is that a canonical state document must never carry a rung that is
wrong in the loose direction and must never carry a proven statement under the
wrong symbol, and the draft does both once each: section 7 grades a stamped
producer's OUTPUT block as unstamped hand arithmetic, and sections 0, 2 and 4a
state the Euclid edge anchor for `head(p)` where only the `F(p)` form is
unconditional, which is the exact collision the draft's own section 5i calls
load-bearing. Two further lines would mislead a reader into duplicating work
already applied on 2026-08-29. None of the eight is a mathematical error: the
draft's numbers are right, its labels are right, and its calibration is right
everywhere except at the two places named. Promotion should also settle the
scope question the draft raises in its own section 5b and cannot answer, which
is Chris's call: a Z2 section inside `ZONE-POSTULATE.md` against a standalone
`research/Z2-STATE.md`. Whichever is chosen, `TODO.md`:26 names Z2 as the
programme's one goal and both routing documents currently return zero
occurrences of it, so the routing fix must land with the document.

**Every line that is not fit, with what is wrong.**

| line(s) | what is wrong | rung effect |
|---|---|---|
| 1029-1032 | the section 7 custody block grades an embedded producer's OUTPUT as "[ARITHMETIC] ... UNSTAMPED, no producer, no adversarial pass". The eight numbers are at `research/import-kw-01-calibrate.js`:272-278 | a rung too LOW, which in a state document is as corrupting as a rung too high, because it invites a re-run of a stamped artifact and it hides the artifact from the next reader |
| 58-59, 228-233, 584 | the Euclid edge anchor is stated for `head(p)`. Only `F(p) <= G2(p#) - p - 1` is unconditional; `head` is defined only on the occupied set | a PROVEN item stated under a symbol that makes it conditional without saying so, and it contradicts the same note's sections 1 and 5i |
| 402 | "over 27,292 zones" for the head coefficient; the producer says 27,267 (the p >= 100 subset) | wrong n on a MEASURED figure |
| 94 | "the factor of 81 is corrected and must not be quoted"; the record says it must never be quoted WITHOUT its ensemble | a rule stated stricter than its source, which deletes a usable citation |
| 618 | "`REFUTED.md` row 64"; the file is unnumbered and that row is data row 46 | an unresolvable pointer on a (ii) verdict |
| 706-744, 745-764 | sections 5a and 5c present applied defects as live ones; both landed 2026-08-29 (`research/history/CHANGELOG.md`:15) | a reader would file a duplicate fix |
| 767, 769 | `TODO.md`:52 is now :53, and `ZONE-POSTULATE.md`:530 is now :534, both from the same applied pass | stale pointers |
| 252 | the L = 1 item sits under PROVEN with no route-level marker; the record's ledger verdict is REFUTED and `REFUTED.md`:74 carries the row | a reader of section 2 alone gets the wrong rung for the route |
| 636-640 | legal item 3 drops the audit's "police the instrument, not the exponent" rider (`attack-wrongdirection-audit.md`:87) | an incomplete label on a legal target |
| 641-646 | legal item 4 carries no quantifier-police clause where items 7 and 11 carry one for the same exposure | internal inconsistency in the labelling scheme |
| 674-679 | legal item 10 is graded (iii) while the paragraph's own argument establishes (i) | the label and its argument disagree |
| 437 | "HELD and NOT red-teamed" for the tail note; nineteen of its numbers were opened at the producer for this pass and reproduce | stale in the safe direction |

**One thing the draft does that a promoted document should keep verbatim.**
Section 2's opening, "Nothing in this section bounds Z2. Every item either
certifies, decomposes, or bounds DESTRUCTION", with three items marked
wrong-direction by construction. That sentence is the whole calibration of the
object in one line and it is what stops the next reader from mistaking a long
PROVEN list for progress.

---

*Red-team pass, HELD in staging. It edits no other file, ran no git command,
and ran one existing producer read-only (`lit-kourbatov-shortfall.js`, 0.0 s,
to check two scratchpad-grade constants) plus independent recomputation of the four
hand-arithmetic figures. `README.md` §Status, `research/G2-STATE.md` §0 and
`research/ZONE-POSTULATE.md` are canonical and win against anything here.
History layer and corpus rule: `research/history/CHANGELOG.md`.*
