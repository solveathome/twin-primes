# Red team, 2026-08-29: object-g2-read-0829 and object-bridge-read-0829 at the record

<!-- ledger
id: Q-redteam-0829-objects-gb
status: ANSWERED
todo: none
question: Does every load-bearing claim of the two 2026-08-29 object reads (G2 and the bridge) survive independent re-derivation at the cited record?
verdict: 60 load-bearing claims re-derived at the record: 47 CONFIRMED, 8 WEAKENED, 1 REFUTED, 4 left UNCHECKED and marked so; the refutation is the G2 note's L5 formula, which pairs the corrected trusted zone K in [1.3946, 11.3568) with the superseded single-base expression (ln 66 + K)/ln 16, an expression that evaluates to 5.607 above beta2 at the top of its own stated range, and the three live-layer edits already applied by the orchestrator are correct as written.
-->

*(Red-team note, HELD, internal, publication moratorium. Adversarial pass over
`research/history/staging/object-g2-read-0829.md` and
`research/history/staging/object-bridge-read-0829.md`. Every verdict is against
the record: the cited file at the cited line, and the producer's embedded OUTPUT
block where a number is cited. Calibration markers per `CLAUDE.md`.)*

## 0. Verdict first

**60 load-bearing claims checked at the record: 47 CONFIRMED, 8 WEAKENED,
1 REFUTED, and 4 left UNCHECKED and marked so rather than assumed.** Every verdict below was reached by opening the cited file at the
cited line, and by re-deriving the arithmetic or the argument independently
before agreeing with it. No producer was written. Three producers' embedded
tables were read; no script was re-executed, so every verdict is
document-against-record and none is document-against-fresh-computation.

**The worst finding, stated first.** `object-g2-read-0829.md` §4b row L5 carries
a formula that is false at the top of its own stated range. The row reads
"`K in [1.3946, 11.3568)` trusted gives `beta <= (ln 66 + K)/ln 16 < beta2`".
The zone is right and its legality verdict (i) is right, but the expression is
the superseded single-base pairing whose own ceiling is 7.6394, not 11.3568:
`(ln 66 + 11.3568)/ln 16 = 5.607`, which is above `beta2 = 4.26645`, so the
stated implication fails on its own numbers. `hsubpow-explicit-K.md`:42-51 and
:147 are explicit that the trusted zone's floor sits at base 66 and its
**ceiling at base 82**, and that the old pairing "mixes a single base into an
all-bases hypothesis". The defect is the exact failure mode that note's own §5
item (4) is about, reproduced one section earlier in the same note. REFUTED as
written; §2 carries the replacement text.

**The second finding, and it reaches the live layer.**
`object-bridge-read-0829.md` §4 quotes killer 2's shortfall as "8.38e-6 at @19
against the decision threshold 1.03e-7, a factor 81 short", citing
`paper/anchored-note.md` §3. `paper/wall-note.md`:260-262 carries a standing
instruction, dated 2026-08-27, that **"That 81 must never be quoted without its
ensemble"**, because the epsilon in it is the window ensemble's while the
cardinality is the rotation ensemble's; read self-consistently the miss is
e^3025 in the window ensemble and 1,682 at x = 17 in the rotation ensemble.
`paper/anchored-note.md`:151-152 still carries the bare 81 with no rider, and
neither morning note flagged that. The bridge note propagated a superseded
mixed-ensemble number; the G2 note quoted the corrected one. WEAKENED for the
bridge, and §2 proposes the live-layer rider.

**What did not break.** Both proven inequalities that the brief singled out
survive independent re-derivation without amendment: P1's `Z2(p) <= G2(p#)`,
including the step that consecutive in-zone openers are consecutive twin slots
of the tile, and P2's Euclid anchor with its `-p-1`, whose four verification
gaps 12, 18, 18, 30 at p = 7, 11, 13, 17 were recomputed here by hand and
match. The G2 note's §2a hypothesis list reproduces `paper/beta2-note.md` §2 and
§6 item 1 item for item, including the load-bearing quantifier "for all pairs
2 <= w1 < w" of DH Definition 1.3, eq. (1.5), p. 8. Every file:line pair in the
G2 note's §5 items (1) to (7) resolves to the text quoted, and every file:line
pair in the bridge note's §6 items I1 to I5 does the same. The bridge's §3
ratio table reproduces `ZONE-POSTULATE.md` §5 and `G2-STATE.md` §2 value for
value, and its I1 arithmetic band 3.11 to 4.18 was recomputed here at all
fourteen levels and matches.

**The three applied edits are correct as written**, checked at the producer:
the tail unit against `zonegap-01.js`:391 and `zone-tail-01.md` §3, the Z4
dataset lines against `zone-tail-01.md` §0 and §5, and the TPC-strength label
against Axis A. Two nits inside them, both HOLD, are in §2.

**The calibration gap worth naming.** The G2 note's §4a opens with an
exhaustive negative over the whole corpus, "every upper-bound argument the
programme has produced consumes one or more of the following, and nothing
else", and that sentence carries no calibration marker. It is PROVEN for the
beta2 bound, which §2a checks line by line; for the rest of the corpus it is an
unenumerated audit claim. Under the lower-rung rule it should read MEASURED
over the corpus, or "no counterexample found in this reading".

## 1. Claim-by-claim

Rungs in column 2 are the note's own. Verdicts are this pass's. "Record" names
what was opened; where the entry says "re-derived", the argument or the
arithmetic was reproduced here before the verdict was set.

### 1a. `object-g2-read-0829.md`

| # | claim | note's rung | verdict | reason | record |
|---|---|---|---|---|---|
| G1 | §2a: the beta2 hypothesis list is exactly items 1-5 and nothing more | PROVEN | **CONFIRMED** | all five reproduce; item 4's quantifier "for all pairs 2 <= w1 < w" of DH Definition 1.3, eq. (1.5), p. 8 is verbatim, and it is the load-bearing part | `paper/beta2-note.md`:99-195, :291-315 |
| G2 | §2a: "the distance 2 enters at exactly one place, item 2 ... nowhere in §2, §3 or the assembly does the value 2 appear again" | PROVEN | **WEAKENED** | §2 also instantiates DH Example 1.2 at "L(n) = n(n+2), Delta = 2", and `omega(2) = 1` is precisely the `p | Delta` exception, so the distance enters a second time, to select which primes are exceptional. The count-only reading survives; the literal claim does not | `paper/beta2-note.md`:170-172, :305-308 |
| G3 | §2a: the theorem bounds any dimension-2 sieve with the same remainder control "whatever the two classes are" | PROVEN | **WEAKENED** | hypothesis 5 is `0 <= omega(p) < p`, which forces `omega(2) <= 1`. A free two-class adversary taking two classes mod 2 sits outside the theorem. Correct scope: any configuration with `omega(2) <= 1` and `omega(p) = 2` for odd p | `paper/beta2-note.md`:99-195 |
| G4 | §2a rider: beta2 is an upper bound on what the DHR sieve attains, not a floor on what the axioms permit | PROVEN, corrected 2026-08-27 | **CONFIRMED** | stated there in those terms, with the kappa = 2 extremal example recorded ABSENT | `paper/wall-note.md` §2 Face 4 |
| G5 | §2a rider: constants inexplicit, and the O((loglog y)^2/(log y)^{1/6}) implied constant's dependence on the Omega constants is not explicit in anything read | PROVEN | **CONFIRMED** | verbatim, "not made explicit anywhere we have read" | `paper/beta2-note.md`:341-353 |
| G6 | §2a rider: MO 37679 answer 52890 already reads j(x#) off a dimension-1 sieve error exponent | (cited) | **UNCHECKED** | not verified at source in this pass; the pointer resolves to `G2-STATE.md` §8 but the MO post was not fetched | `research/G2-STATE.md` §8 |
| G7 | §2b: `G2(19#) <= 210`, `G2(23#) <= 420`, loose by 1.40 and 2.06 | PROVEN | **CONFIRMED** | statement verbatim; 210/150 = 1.400 and 420/204 = 2.059 re-derived here | `research/REFUTED.md`:50; `attack-beta2-03-exact-strata.md`:169 |
| G8 | §3a: raw fit 1.777 +/- 0.029 on 20 fitted points, x in [5, 79] | MEASURED | **CONFIRMED** | the note's "20 fitted points" is more precise than the source table's headline "22 trusted terms" and matches the source's own prose (p = 2, 3 excluded) | `research/exponent-control.md`:184-197 |
| G9 | §3a: corrected 1.50 +/- 0.05 for G2, bias at matched width 20; 1.57 +/- 0.06 for h2 on 19 terms | MEASURED | **CONFIRMED** | verbatim | `research/exponent-control.md`:186-197 |
| G10 | §3: control bias +0.262, +0.267, +0.280, +0.282, +0.283 at widths 10, 12, 19, 21, 30 | MEASURED | **UNCHECKED** | §5 of the source carries only the width-10 and width-20 endpoints (+0.262, +0.279); the five-point series lives in §§1-2, which this pass did not open | `research/exponent-control.md` §§1-2 |
| G11 | §3e: G2/g maximum moves to the last term, 8.55 at x = 79, old 8.00 peak an artefact of ending at 43 | MEASURED | **CONFIRMED** | verbatim, with the same reading | `research/G2-STATE.md`:365-372 |
| G12 | §3e: G2/x^2 slope +0.05 +/- 0.11 over eleven exact terms, instrument sharp at 11.6 sigma on its control | MEASURED | **CONFIRMED** | verbatim | `TODO.md`:377-378 |
| G13 | §4a: P1-P5 is what **every** upper-bound argument the programme produced consumes, "and nothing else" | no marker on the header sentence | **WEAKENED** | PROVEN for the beta2 bound only (G1 above). The corpus-wide negative is unenumerated and carries no rung; the lower rung is MEASURED over the corpus | `object-g2-read-0829.md` §4a head |
| G14 | §4a: the l1 -> l2 conversion IS the sharp maximal law, true constant 0.56-0.92 against the TPC line 1.36-2.23 | PROVEN + MEASURED | **CONFIRMED** | C_true 0.5634 to 0.9215, C_crit 1.3580 to 2.2250 | `import-l1l2.md`:45, :214-223 |
| G15 | §4a: chaining's entropy integral exceeds the union bound at every level, 1.04-1.10x | CLOSED | **CONFIRMED** | lower branch 1.040 to 1.099 across z = 13..23; the note's 1.04 is the faithful low end (the source's own verdict line says 1.054, which its table does not support) | `import-chaining.md`:233-236 |
| G16 | §0 killer 2: the second-moment bound misses by e^3025 at x = 19 read self-consistently in the window ensemble | (cited, corrected 2026-08-27) | **CONFIRMED** | verbatim, and it is the corrected reading rather than the superseded factor 81 | `paper/wall-note.md`:265-268 |
| G17 | §4 head: `ZONE-POSTULATE.md` §8 item 4 and `G2-STATE.md` §9 item 4 are TPC-strength and unlabelled | PROVEN as an implication | **CONFIRMED** | re-derived: unbounded gives, for every M, some x with `G2 < x'^2/M`, hence `G2 < x'^2 - 2` i.o., hence weak ZP, hence TPC by Axis A verbatim | `attack-wrongdirection-audit.md` §1 Axis A; `ZONE-POSTULATE.md` §2 |
| G18 | §5 (2): h2 defined two incompatible ways in the live layer | OPEN, definitional | **CONFIRMED** | all four pointers resolve: free-per-prime at `GLOSSARY.md`:278 and `U-FRAME.md`:579-580; offset-max at `two-class-lower-bounds.md`:80 with free 2-class on the next row; ZM Def. 2.2 at `covering-dive.md`:56 | as cited |
| G19 | §5 (3): certificate ladder stale at three places in `G2-STATE.md` | staleness | **CONFIRMED** | :421 "356,712 at x = 4001", :1026 "x <= 4001, 16 levels", :1148 "to x = 4001, sixteen levels" against :919's 5003 rung and `two-class-lower-bounds.md`:975, :1100 | as cited |
| G20 | §5 (4): the audit's 1d landing zone is superseded by TODO's | staleness in a HELD note | **CONFIRMED** | audit:82 and :250 carry `[1.3555, 7.6394)`; `TODO.md`:366 records the supersession explicitly | as cited |
| G21 | §5 (5): three shared-term counts for two pointwise relations | staleness | **CONFIRMED but INCOMPLETE** | the three resolve (22 at `G2-STATE.md`:365, eleven at `two-class-lower-bounds.md`:84 with eleven ratios printed, 12 at `exponent-control.md`:151). A **fourth** exists and is not listed: `ZONE-POSTULATE.md`:103 reads "VERIFIED at all ten shared terms" | as cited, plus `ZONE-POSTULATE.md`:103 |
| G22 | §5 (6): `paper/beta2-note.md` is one ladder term behind | staleness | **CONFIRMED** | §1 lists thirteen terms to p_n = 41, §5 checks at p_n = 41 and carries the 37 -> 41 in-place correction; `G2-STATE.md` §2 runs to 43 with fourteen | `paper/beta2-note.md`:62-64, :247-254 |
| G23 | §5 (7): two conjectural truths, 3 and 4, in one file and propagated | staleness / label collapse | **CONFIRMED** | :979 and :401 carry both; the reconciliation is exact at the §4c ledger, whose two-class total reads "4 (CONJ); 3 unconditional" and whose rows sum 1 + 1 + 1 unconditional plus 1 CONJ | `two-class-lower-bounds.md`:389-402, :979; `G2-STATE.md`:423, :434 |
| G24 | §7a: Jacobsthal's order conjecture H(r) << r^2 is Erdos #970, OPEN; the extremality conjecture is false at r = 24 | CONJ / PROVEN FALSE | **CONFIRMED** | Hajdu-Saradha abstract quoted verbatim at the record, "true for r <= 23 and fails at r = 24" | `covering-dive.md`:23-24 |
| G25 | §7a: proven one-class upper is Iwaniec 1971 Thm 2 / 1978 at primorials and Vaughan 1977 for general n | PROVEN | **WEAKENED** | the record says Vaughan is the general-n exponent-2 statement and Iwaniec 1971 Thm 2 the primorial case, which the note has right; but Iwaniec **1978** is the deduction to all integers m, not a primorial statement, so grouping it under "at primorials" mis-attributes the paper's own contribution | `covering-dive.md`:24, :31-33 |
| G26 | §7a: Maier-Pomerance exponent decomposes 1 + 1, TAMS 322 (1990) 201-237, p. 205; Ford's Montreal slides buy only T(log T)^{1+c} | CONJ | **CONFIRMED** | both quoted verbatim at the record with the URL | `two-class-lower-bounds.md` §2c |
| G27 | §7a: elementary line is Kanold 2^{sqrt k}, Stevens k^{Theta(log k)}, Paseman k^{O(loglog k)} | PROVEN | **CONFIRMED** | verbatim | `covering-dive.md`:26 |
| G28 | §7b: the ln^3 / ln^4 reconciliation is 3 unconditional against 4 with the multi-kill row | INFERRED | **CONFIRMED** | the ledger table is reproduced row for row and its arithmetic checks | `two-class-lower-bounds.md`:389-402 |
| G29 | §7b: no published statement about A144311's asymptotic growth; no lower bound attached to A288815 or A072753 | ABSENT | **UNCHECKED** | an absence claim; not re-searched in this pass | `Q-a144311-vocabulary` |
| G30 | §5 head and §8: `REFUTED.md` holds 67 rows and `QUESTIONS.md` 392 distinct Q- ids | (count) | **CONFIRMED** | both counted independently here: 68 table lines minus the header at `REFUTED.md`, and 392 unique Q- ids | `research/REFUTED.md`; `research/QUESTIONS.md` |
| G31 | §8 Q4: the three x = 37 instruments are not independent, all three carry G2(37#) | (rider) | **CONFIRMED** | correct, and the honest control the source file does not state: `G2-STATE.md`:375-380 calls them "three instruments" without it | `research/G2-STATE.md`:365-380 |
| G32 | §4b row L5: "`K ∈ [1.3946, 11.3568)` trusted gives `β ≤ (ln 66 + K)/ln 16 < β₂`" | (i), stated as arithmetic | **REFUTED** | the expression is the superseded single-base pairing whose ceiling is 7.6394. At the stated ceiling `(ln 66 + 11.3568)/ln 16 = 5.607`, above `β₂ = 4.26645`, so the implication fails on its own numbers. The trusted zone's floor sits at base 66 and its ceiling at base 82. The legality verdict (i) is unaffected. Edit E1 | `hsubpow-explicit-K.md`:42-51, :134-135, :147 |

### 1b. `object-bridge-read-0829.md`

| # | claim | note's rung | verdict | reason | record |
|---|---|---|---|---|---|
| B1 | §2 (P1): `Z2(p) <= G2(p#)`, with consecutive in-zone openers being consecutive twin slots of the tile | PROVEN | **CONFIRMED** | re-derived independently. The step holds: if a < c < b with c a tile opener, then c > a > p and c + 2 < b + 2 < p'^2, so c is in A, contradicting consecutiveness. The p'^2 < W premise genuinely fails at p = 5 (49 > 30) and the note handles it by direct check at p = 2, 3, 5. The invocation of the Zone Restriction Lemma is surplus to the inequality but harmless | `zonegap-01.md`:105-107; `stretch-01.md` §0 |
| B2 | §2 (P2): `F(p) <= G2(p#) - p - 1`, the Euclid anchor supplying the -p-1 | PROVEN | **CONFIRMED** | re-derived. The tile carries the opener at residue -1; for p >= 3 no opener lies in [0, p), since r < p coprime to p# forces r = 1 and r + 2 = 3 is killed. So the cyclic gap from -1 to p + F(p) is F(p) + p + 1 and is a consecutive-opener gap. The four verification numbers were recomputed here: F = 4, 6, 4, 12 at p = 7, 11, 13, 17 give anchor gaps 12, 18, 18, 30 against G2 = 30, 42, 66, 108 | `zonegap-02-reduction.md`:122 |
| B3 | §2 (P3): head + Z2 + tail <= width, equality iff k = 2 | PROVEN | **CONFIRMED** | re-derived: width telescopes to `p'^2 - p` exactly, and max gap <= sum of k-1 gaps with equality iff k - 1 = 1 | `zonegap-02-reduction.md` §2 (R0) |
| B4 | §2 (P3): shares 1.82% head, 89.72% Z2, 8.46% tail at B4, tail share falling | MEASURED | **CONFIRMED** | verbatim | `zone-tail-01.md`:8, :71-73 |
| B5 | §2 (P4): `G2(x#) < x'^2 - 2` implies the Zone Postulate at x | PROVEN | **CONFIRMED** | re-derived through the same anchor: `x + F(x) + 1 <= G2 < x'^2 - 2` puts the opener and its partner inside the zone, and the Zone Restriction Lemma makes both prime | `G2-STATE.md` §1b; `ZONE-POSTULATE.md` §3 |
| B6 | §2 (P5): SP implies strong ZP by containment; the converse containment FAILS | PROVEN | **CONFIRMED** | `[Q^2, Q'^2)` sits inside `(Q, Q'^2)`; the converse would need `Q^2 <= p` and `Q'^2 >= p'^2` at once, which is impossible | `stretch-01.md` §2 |
| B7 | §2 (P8): `G2 >= g` VERIFIED at all ten shared terms, ratios 2.00 to 8.00 | PROVEN | **CONFIRMED as a quotation, and it is the fourth count** | the source says "ten"; `G2-STATE.md`:365 says 22, `two-class-lower-bounds.md`:84 says eleven, `exponent-control.md`:151 says 12. The bridge quoted its source faithfully; the corpus carries four counts, and the G2 note's §5 item (5) lists only three | `ZONE-POSTULATE.md`:103-104 |
| B8 | §3: the four ratio rows (x'^2/G2 at fourteen levels, x^2/G2 at ten, G2/F ~ 7, window/F within 1.0000004 of x') | MEASURED | **CONFIRMED** | every value reproduces verbatim; the fourteen x'^2/G2 values match `G2-STATE.md` §2's column term for term | `ZONE-POSTULATE.md`:243-270; `G2-STATE.md`:345-360 |
| B9 | §3: x^2/certificate 3.8, 7.8, 18.1, 44.9; M(x, x'^2)/ln^3 x flat 3.2 to 3.7; G2/Z2 1.00 x4 then 1.40 .. 4.12 | MEASURED | **CONFIRMED** | all three verbatim | `ZONE-POSTULATE.md`:264-270; `zonegap-01.md`:105-107 |
| B10 | §3: "the reduction gives up an advantage the instrument on the far side cannot exploit", worth one unit of exponent against a deficit of 2.2665 | MEASURED + one closure | **CONFIRMED** | the deficit arithmetic checks: 4.26645 - 2 = 2.26645; the anchored-versus-global identity is `Q-anchored-vs-global-gap`, CLOSED | `QUESTIONS.md` `Q-anchored-vs-global-gap` |
| B11 | §4: killer 1 is HEURISTIC with a PROVEN number inside it | HEURISTIC | **CONFIRMED** | the lower rung is right: the exponent is a theorem, the cap is a property of a construction class plus a closed search, and no kappa = 2 extremal example is in print | `sift-limit-attack.md` §2; `paper/wall-note.md` §2 Face 4 |
| B12 | §4: killer 2 is the one with a THEOREM in it, its core exact counting | PROVEN core | **CONFIRMED** | the source marks it so: "Part (i) is exact" | `paper/anchored-note.md`:147-160 |
| B13 | §4: killer 2's shortfall is "8.38e-6 at @19 against 1.03e-7, a factor 81 short" | MEASURED | **WEAKENED** | the arithmetic is right (81.4x) but the pairing is the superseded mixed-ensemble one. `paper/wall-note.md`:260-262 instructs that the 81 "must never be quoted without its ensemble", corrected 2026-08-27; self-consistently it is e^3025 in the window ensemble and 1,682 at x = 17 in the rotation ensemble | `paper/wall-note.md`:255-270 against `paper/anchored-note.md`:151-152 |
| B14 | §4: killer 3 is a MEASURED pattern with two PROVEN components | MEASURED + PROVEN | **CONFIRMED** | component (a) re-derived here: `1 + e(2v/q) = 0` needs `4v = q mod 2q`, even against odd, no solution for odd q, and the v = 0 factor is q - 2 >= 1. Component (b) is Shearer on a complete graph | `recon-0828-farfields.md` §2a; `import-shearer.md` §4 |
| B15 | §4: the twelve-prime numerical check of the Fourier non-vanishing | (cited as "checked numerically at twelve primes") | **WEAKENED** | the source marks that line `[SCRATCHPAD-GRADE]`; the bridge drops the marker. The one-line theorem does not need it, so nothing downstream moves | `recon-0828-farfields.md` §2a |
| B16 | §5: no separation theorem exists on either side | PROVEN for the non-existence-here, OPEN as mathematics | **CONFIRMED** | the audit states its own separations are never model-theoretic and that "strictly weaker" means only "does not imply TPC through any bridge this corpus holds"; nothing of the wanted shape was found here either | `attack-wrongdirection-audit.md` §0 |
| B17 | §5: P4 is a rotation-invariant statement that reaches the zone statement, so the discarded information is PROVABLY NOT NEEDED | PROVEN NO | **WEAKENED** | the **hypothesis** is rotation-invariant and that half is right. The derivation nevertheless consumes one origin fact, the Euclid slot at residue -1, which the same note states at §2 (P2) and (P4) and §5 does not. Correct form: a rotation-invariant hypothesis plus one elementary origin fact reaches the zone statement | `object-bridge-read-0829.md` §2 (P4) against its own §5 |
| B18 | §5: Tao's Claim 1 is vacuous on the bare tile property and applies in full to the zone property | PROVEN modulo Dirichlet / PROVEN given H4 | **CONFIRMED** | both readings are at the record with the same scoping, and the note carries the "no computed level is evidence about it in either direction" rider | `lit-tao-parity.md` §§2.1-2.3 |
| B19 | §6 (I1): "window/G2" names two ratios; the x'^2 - x convention runs 3.11 to 4.18 | ARITHMETIC, no producer | **CONFIRMED** | all fourteen values recomputed here from `G2-STATE.md` §2's terms: 3.50, 3.67, 3.67, 3.80, 3.76, 4.18, 3.19, 3.40, 4.01, 3.61, 3.84, 3.11, 3.31, 3.50. Band 3.11 to 4.18, min at x = 37, max at x = 13 | `ZONE-POSTULATE.md`:245-257; `zonegap-01.md`:96 |
| B20 | §6 (I2): "restricted" used in opposite senses | (inconsistency) | **CONFIRMED** | `zonegap-01.md`:107 and `zonegap-02-reduction.md`:38 both resolve to the quoted text, and the two senses are multiset against maximum | as cited |
| B21 | §6 (I3): a bound proven for F is stated for head, the object (R2) is not entitled to | (inconsistency) | **CONFIRMED** | :89 defines F unconditionally, :122 states the bound for head | `zonegap-02-reduction.md`:89, :122 |
| B22 | §6 (I4): M(x, x'^2) and M(x, x^2) quoted as one object on a seven-level coincidence | (inconsistency) | **CONFIRMED** | `maxgap-law.md`:513 is headed M(x,x^2) and :523 states flatness for M(x,x^2)/ln^3 x; `ZONE-POSTULATE.md`:267 quotes it for M(x, x'^2); `zonegap-01.md`:53-55 is where "happen to bind the same gap" lives | as cited |
| B23 | §6 (I5): a stale registry count, 83 against today's 67 | minor | **CONFIRMED** | :67 reads "All 83 rows were read"; the registry holds 67 rows, counted independently here | `attack-obstruction-audit.md`:67; `research/REFUTED.md` |
| B24 | §1 table: Z2 VERIFIED exhaustively to p = 1e11, 27,292 zones, envelope record-exact | VERIFIED | **CONFIRMED** | verbatim | `zonegap-01.md`:50-52 |
| B25 | §7 Q1-Q4 greps returning 0 | (absence) | **UNCHECKED** | the greps were not re-run in this pass | as cited |

### 1c. The three applied edits

| # | edit | verdict | reason | record |
|---|---|---|---|---|
| A1 | `TODO.md`:51-52, the tail's unit | **CONFIRMED** | the estimator is `mean(z.tail / l2(z.bound))` with `bound = p'^2`, so the band means are in `ln^2(p'^2)` units. `zone-tail-01.md` §3's "in ln^2 p units" column reads 2.4277, 3.0220, 2.9185, 3.1096, so "(2.4..3.1) ln^2 p" is the correct conversion at the quoted precision. One nit: the 0.58..0.77 band is `zonegap-01.js`'s mean-of-ratios decade means while the converted band is `zone-tail-01.js`'s ratio-of-sums, two estimators, and the "which is" reads as a conversion of the first. The numbers agree to the quoted digits because the low band's unit factor is 4.23 rather than 4.00, so nothing moves | `research/zonegap-01.js`:391; `zone-tail-01.md`:225-232 |
| A2 | `TODO.md`:211-214 and :227-230, Z4's tail dataset | **CONFIRMED** | every figure resolves: 1,225 zones (22 + 143 + 278 + 782), 3.11 ln^2 p at the top band against the head's 0.67 on the same 782 zones, "the coefficient does not settle" verbatim, t/R = 1.0619 with bootstrap [0.9937, 1.1321] containing 1, and the 27,292-zone 1e11 range named in §0 as what t/R needs | `zone-tail-01.md`:36-53, :225-232, :310-315 |
| A3 | `ZONE-POSTULATE.md` §8 item 4 and `G2-STATE.md` §9 item 4, the TPC-strength label | **CONFIRMED** | the implication was re-derived (G17) and both lines now carry it, with the item kept rather than deleted, which is the right call | `ZONE-POSTULATE.md`:523-531; `G2-STATE.md`:1212-1219 |

## 2. Proposed live-layer edits

Five items. Two are APPLY (mechanical, verified at the record, no number
without custody enters). Three are HOLD. No em dashes in any proposed text.

### E1. APPLY. `research/history/staging/object-g2-read-0829.md`:557, row L5's formula

The single REFUTED item. The row pairs the corrected trusted zone with the
superseded single-base expression, whose own ceiling is 7.6394; evaluated at
the stated ceiling the expression gives 5.607, above beta2.

OLD (the argument column of row L5):

    `K ∈ [1.3946, 11.3568)` trusted gives `β ≤ (ln 66 + K)/ln 16 < β₂` with no TPC content.

NEW:

    `K ∈ [1.3946, 11.3568)` trusted gives `β < β₂` with no TPC content; the floor sits at base 66 and the ceiling at base 82, and the single-base pairing `(ln 66 + K)/ln 16` that produced the superseded `[1.3555, 7.6394)` must not travel with the corrected zone (`hsubpow-explicit-K.md` §2).

Record: `hsubpow-explicit-K.md`:42-51 ("mixes a single base into an all-bases
hypothesis, and both endpoints move") and :147 (trusted row: floor 1.3946 at
b = 66, ceiling 11.3568 at b = 82).

### E2. APPLY. `research/ZONE-POSTULATE.md`:103-104, a stale shared-term count

The fourth of four counts in the corpus for one relation. The fix removes a
number rather than adding one, so no custody question arises.

OLD:

    - **G₂(x#) ≥ g(x#) pointwise (PROVEN, elementary; VERIFIED at all ten shared
      terms, ratios 2.00 to 8.00).**

NEW:

    - **G₂(x#) ≥ g(x#) pointwise (PROVEN, elementary; VERIFIED at every shared
      term of the trusted ladders, ratios 2.00 to 8.55; the count and the ratio
      table live at `G2-STATE.md` §2).**

Record: `G2-STATE.md`:365 (22 shared terms) and :371 (maximum 8.55 at x = 79)
against this file's ten and 8.00. The other two counts, eleven at
`two-class-lower-bounds.md`:84 and 12 at `exponent-control.md`:151, are the G2
note's §5 item (5) and are left to that item.

### E3. HOLD. `paper/anchored-note.md`:151-152, the factor 81 with no ensemble rider

Needs Chris: the file is a paper draft under the moratorium, and the rider
changes what a headline number means rather than correcting a digit.

OLD:

    ε ≈ (Var/E)·(1/E) ≍ ln²W / W (measured: 8.38e−6 at @19 against the decision
    threshold 1/W = 1.03e−7, a factor 81 short and growing like ln²W)

NEW:

    ε ≈ (Var/E)·(1/E) ≍ ln²W / W (measured: 8.38e−6 at @19 against the decision
    threshold 1/W = 1.03e−7, a factor 81 short and growing like ln²W; that 81
    pairs the window ensemble's ε with the rotation ensemble's cardinality and
    must not be quoted without both, per `paper/wall-note.md` §2 Face 1 as
    corrected 2026-08-27, where the self-consistent readings are e^3025 in the
    window ensemble at x = 19 and 1,682 in the rotation ensemble at x = 17)

Record: `paper/wall-note.md`:260-262, verbatim: "That 81 must never be quoted
without its ensemble". The instruction stands in one live file and is not
honoured in the other, and the bridge note propagated the un-ridered form.

### E4. HOLD. `TODO.md`:229-230, the Z4 tail item's cost line

Inside an edit the orchestrator has already applied, so it needs the
orchestrator's or Chris's call rather than a silent second pass.

OLD:

    that note's §0 names as what the unresolved t/R needs (about ten minutes
    from `zonegap-01.js`'s embedded 315.7 s).

NEW:

    that note's §0 names as what the unresolved t/R needs (315.7 s by
    `zonegap-01.js`'s embed, so about five minutes of compute).

Record: `zone-tail-01.md`:53 and :403 both price it at 315.7 s, which is 5.26
minutes. Nothing else in the item turns on it.

### E5. HOLD. `research/ZONE-POSTULATE.md` §8, the list's ordering after the applied label

The applied edit added, correctly, that item 4 "is at least item 3 and not a
cheaper stepping stone". The list's own header says "In descending order of
value", so it now ranks an item below one it says it is at least as strong as.
This is a judgment call about ordering and about whether item 3 and item 4
should merge, so it is not mechanical. No text proposed; flagged so the
contradiction is not read as a residue of the label.

Record: `ZONE-POSTULATE.md`:520 ("In descending order of value") against
:523-531 (item 4's new label).

## 3. What the two notes missed

Nine items, found in the same files the notes were reading. Six are small and
two reach the live layer; the ranking is by what a reader would get wrong.

**(M1) A fourth shared-term count, in a live file.** The G2 note's §5 item (5)
lists three counts for `G2 >= g` and `G2 <= h2`, at `G2-STATE.md`:365 (22),
`two-class-lower-bounds.md`:84 (eleven) and `exponent-control.md`:151 (12).
There is a fourth: `research/ZONE-POSTULATE.md`:103-104 reads "VERIFIED at all
**ten** shared terms, ratios 2.00 to 8.00", and it is the one the bridge note
quoted for its own P8. Four live files, four evidence bases, one relation.
Edit E2. [Staleness in the live layer.]

**(M2) A standing instruction in one live paper is not honoured in the other.**
`paper/wall-note.md`:260-262 says, of the second-moment shortfall, "That 81
must never be quoted without its ensemble", corrected 2026-08-27.
`paper/anchored-note.md`:151-152 quotes it bare, and that is where the bridge
note took it. Neither morning note flagged the collision, and one of them
propagated the superseded reading. Edit E3. [Live-layer inconsistency between
two paper drafts.]

**(M3) The distance 2 enters the beta2 setup twice, not once.** §2a's
"nowhere in §2, §3 or the assembly does the value 2 appear again" is
contradicted by `paper/beta2-note.md`:170-172, which instantiates DH Example
1.2 at "L(n) = n(n+2), Delta = 2" and derives `omega(2) = 1` from `2 | Delta`.
The second entry is the selection of the exceptional primes `p | Delta`. For a
general even offset d it would be the primes dividing d, so the class-blind
reading is a statement about `omega`, not about the offset being irrelevant.
Nothing measured moves; the reading of killer 1 is unaffected. [PROVEN as a
reading of the source.]

**(M4) The DHR theorem does not cover the free two-class adversary at p = 2.**
Hypothesis 5, `0 <= omega(p) < p`, forces `omega(2) <= 1`. So §2a's "whatever
the two classes are" is out of scope for exactly the adversary the h2 control
is supposed to be, if h2 is the free-per-prime object of §1 defect (ii). This
is a one-line qualification, not a defect in the bound, and it bears on defect
(ii) rather than on the theorem. [PROVEN from the hypothesis list.]

**(M5) A calibration marker dropped in transit.** The twelve-prime numerical
check of the Fourier non-vanishing carries `[SCRATCHPAD-GRADE]` at
`recon-0828-farfields.md` §2a; the bridge note quotes it as "checked
numerically at twelve primes" with no marker. The one-line theorem beside it
does not need the numbers, so nothing downstream moves. [Calibration.]

**(M6) A producer note's verdict line does not match its own table.**
`import-chaining.md`:8 and :26 state the lower branch as 1.054-1.099;
its table at :233-236 reads 1.054, 1.040, 1.099 over z = 13, 17, 23, so the
minimum is 1.040 at z = 17. The G2 note quotes 1.04-1.10 and is the faithful
one; the bridge quotes the verdict line. The conclusion is unaffected, since
1.040 still exceeds 1. [Staleness inside a HELD note.]

**(M7) The x = 37 coincidence carries no independence caveat in the live
layer.** `G2-STATE.md`:375-380 says "three instruments now point at x = 37 as a
G2-side anomaly" and stops. All three ratios carry `G2(37#) = 528` in them, so
one high term produces all three signs at once. The G2 note's §8 Q4 states this
correctly; the live file does not, and it is the live file a summary copies.
[Live-layer, and a candidate for a one-sentence rider rather than a number.]

**(M8) A cost line that contradicts its own citation.** `TODO.md`:229-230 says
"about ten minutes from `zonegap-01.js`'s embedded 315.7 s". 315.7 s is about
five minutes. Edit E4. [Arithmetic, inside an edit applied today.]

**(M9) A sweep sentence that overstates its own uniformity.** The G2 note's §5
head says the exponent readings are "quoted identically in ... and
`paper/beta2-note.md` §5, with the same n and the same control line in each".
`paper/beta2-note.md`:262-270 additionally carries its own ten-term pair, raw
1.801 +/- 0.074 and corrected 1.54 +/- 0.09, which no other file carries, and
labels them as that note's original record. That is correct behaviour by the
paper, so it is not a defect; it makes the sweep's blanket sentence imprecise.
[No action.]

**Checked and clean, recorded so it is not re-opened.**
`paper/beta2-note.md` §5 uses a 58-term control in its body and a "64-term
control" in its 2026-08-21 update. Both resolve at `exponent-control.md`:29 and
:194: A048670 carries 64 terms, the matched-width bias is read over the 64-term
ladder (+0.279, 45 windows), and the pinned 58-term windows give +0.281 and
move the corrected reading by 0.002. The house control line is the 58-term one.
Not an inconsistency.

## 4. Label audit

Every (i), (ii) and (iii) label in the two notes, with an independent verdict.
The scheme is the audit's: **(i)** strictly weaker than TPC in the corpus's
witnessed sense, **(ii)** TPC-strength, **(iii)** undetermined
(`attack-wrongdirection-audit.md` §2). The error direction guarded against is
the audit's own: a wrong (i) spends a session on a TPC-strength target, a wrong
(ii) kills a legal one for nothing. **No label in either note is wrong in the
expensive direction.** One (i) row is loose in its statement rather than in its
verdict, and it is flagged.

### 4a. `object-g2-read-0829.md` §4b, the legal open set

| row | note's label | verdict | reason |
|---|---|---|---|
| L1, any unconditional exponent in (2, 4.26645) | (i) | **CONFIRMED (i)** | audit §2 target 10, verbatim; separation is exhibited, not modelled, and both bridges transition at 2 |
| L2, RML(alpha) for any alpha < beta2 | (i) | **CONFIRMED (i)** | the win condition is alpha < beta2, not alpha < 2, per audit target 6's second half; the rho-tilde form forfeits the lag-H cancellation |
| L3, `Ĝ(2s) ≤ C₂·Ĝ(s)` for all s, any C₂ < 19.2455 | (i) | **verdict CONFIRMED (i), statement WEAKENED** | the verdict matches audit §3.3 ("trap-free AS WRITTEN"). The statement as written admits C₂ below 5.2727, which the on-chain witness 348/66 REFUTES, so the open range is `[5.2727, 19.2455)`. The row's own argument column states the floor, so a reader who reads both columns is safe |
| L4, (H-sub-pow) with unnamed K | (i) | **CONFIRMED (i)** | audit target 5's separation witness `f(n) = 2 ln n` at K = 0 gives beta = 2 with TPC undecided |
| L5, (H-sub-pow) with explicit K in the legal zone | (i) | **verdict CONFIRMED (i), formula REFUTED** | the zone `[1.3946, 11.3568)` is legal and the route's three closed mechanisms are correctly cited, but the expression `(ln 66 + K)/ln 16` is the superseded single-base pairing and gives 5.607 above beta2 at the stated ceiling. Edit E1 |
| L6, any improvement of the lower bounds | (i) | **CONFIRMED (i)** | a lower bound on G2 is compatible with TPC being false, so no member of the family can be TPC-strength. The safest row on the object |
| L7, `G2 ≪ g·(ln x)^A` for fixed A >= 0 | (i) | **CONFIRMED (i), with an edge** | at A > 0 the conclusion sits above exponent 2 and carries nothing by Axis A. At A = 0 the conclusion is exponent 2 with Iwaniec's inexplicit constant, which Axis A rules OPEN, so still (i); it would become (ii) only with an explicit constant below 1, which no route in the corpus supplies |
| L8, `G2(47#)` or an exhaustive certificate at 41 <= x <= 79 | (i) | **CONFIRMED (i)** | a finite computation, decidable by enumeration |
| L9, strictness of `G2 <= h2` and the law of h2/G2 | (i) | **CONFIRMED (i)** | a comparison of two finite ladders |
| L10, which object the corpus's h2 is | (i) | **CONFIRMED (i)** | a definitional reading of two published definitions; no theorem depends on it |
| U1, sup/sd bounded in the two-class discrepancy channel | (iii) | **CONFIRMED (iii)** | the reason given is the right one: with no bridge from DeltaPhi2 to G2 in the corpus, the strength cannot be read off, and (iii) is the lower rung |
| U2, whether `G2/x²` falls as against tends to 0 | (iii) | **CONFIRMED (iii)** | falling is decidable-looking; falling to zero is (ii) by Axis A; the slope +0.05 +/- 0.11 does not separate them |
| U3, whether the diagonal cancellation in c is exact | (iii) | **CONFIRMED (iii)** | re-derived: bounded c on the diagonal gives `G2 ≈ c·m₂·θ(x) = O(x ln²x)`, exponent 1, which implies TPC, so the upper half is (ii) and the mechanism is legal. The split is stated correctly |
| (ii) list, `x'^2/G2` unbounded, `G2 = o(x²)`, `G2 ≤ (1−ε)x'^2` i.o., including the two live items | (ii) | **CONFIRMED (ii)** | re-derived at G17; matches Axis A verbatim |
| (ii) list, the extreme-value law read as an upper bound | (ii) | **CONFIRMED (ii)** | same arithmetic as U3's upper half, exponent 1 |
| (ii) list, `Ĝ(2s) ≤ C₂Ĝ(s)` eventual with C₂ in (3.1034, 4) | (ii) | **CONFIRMED (ii)** | audit §3.3's trap window verbatim, 0.254 nats, floor on one literature-grade term |
| (ii) list, explicit K < 1.3946 trusted / < 1.3555 custody | (ii) | **CONFIRMED (ii)** | `hsubpow-explicit-K.md`:152: `K ∈ [1.3555, 1.3946)` gives beta < 2 through base 66, hence TPC; below 1.3555 it holds at custody grade too |
| (ii) list, the sharp Gaussian maximal law on R_H | (ii) | **CONFIRMED (ii)** | audit target 6's first half, and it is additionally false as literally stated |

### 4b. `object-g2-read-0829.md` §§6 and 8

| row | label | verdict |
|---|---|---|
| C1 / Q1, is G2 generic among two-class configurations | (i) | **CONFIRMED (i)**, a percentile carries no infinitude content |
| C2 / Q2, where the maximum sits and with what multiplicity | (i) | **CONFIRMED (i)**, a position law at named levels is decidable by enumeration |
| C3 / Q5, free-per-prime against offset-max | (i) | **CONFIRMED (i)**, a finite comparison of two ladders |
| C4 / Q6, does 1.50 survive dropping the literature terms | (i) | **CONFIRMED (i)**, a refit on a prefix |
| Q3, structural reason for `G2/g` to stay polylog | (i) | **CONFIRMED (i)**, it is L7 restated and inherits L7's edge at A = 0 |
| Q4, the x = 37 coincidence | (i) | **CONFIRMED (i)** |
| Q7, how much of G2 is realised inside the zone | (iii) | **CONFIRMED (iii)**, and the caveat is the right one: the descriptive ratio is legal, the "always below the width" phrasing is the Zone Postulate |
| Q8, the mirror as a null model | (i) | **CONFIRMED (i)** |

### 4c. `object-bridge-read-0829.md` §1 and §7

| row | label | verdict |
|---|---|---|
| Z2(p) | (ii) in every form bounding it below the width | **CONFIRMED (ii)** |
| head F(p) | (ii) | **CONFIRMED (ii)**, re-derived: `F(p) < p'^2 − p − 2` puts opener and partner inside the zone, so i.o. gives weak ZP |
| tail | (ii) as a summand of R0 | **CONFIRMED (ii)**, by the same (R1) circularity: the object is defined only where the zone is occupied |
| M(x, x'^2) | (ii), same object as Z2 | **CONFIRMED (ii)**, with the scope the row leaves implicit: the label transfers to the same forms, those that bound it below the width, not to every statement about M |
| stretch S_Q and T(Q) | (ii) | **CONFIRMED (ii)** |
| X(K), floor_K, capU_K | certificate (ii), upper bound on X alone legal | **CONFIRMED**, audit §3.1 verbatim |
| y* | (ii) all-Q, legal conditionally on {T >= 1} | **CONFIRMED**, audit §3.2 verbatim |
| S(x) | (ii) | **CONFIRMED (ii)**, `anchored-note.md` Proposition 2 |
| E(x) | (i) | **CONFIRMED (i)**, an ensemble mean decides nothing about one member |
| beta(x) | (ii), possibly stronger, no converse proven | **CONFIRMED (ii)** |
| anchored calm delta | (ii) | **CONFIRMED (ii)**, and MEASURED false in the shape wanted |
| anchored caps and floors | (i) at named levels, (ii) for any all-x family with floor -> infinity | **CONFIRMED**, audit §3.4 verbatim |
| advmin@11 = 16 | (i) | **CONFIRMED (i)**, one level, two proof stacks |
| maxsum_m | (i) as an upper-bound instrument | **CONFIRMED (i)** |
| theta ladder, R_H | (ii) for the sharp law on R_H, (i) for the H-free rho-tilde | **CONFIRMED**, audit §3.6 verbatim, and it is the resolution of the two-object ambiguity |
| G2(x#) | (i) across (2, 4.26645], (ii) at exponent 2 with constant < 1 | **CONFIRMED**, audit target 10 |
| g(x#) | (i) above exponent 2, prize-adjacent at exponent 2 with an explicit constant | **CONFIRMED (i)**, and the hedge is correct: a one-class bound gives no twin pair, so it is never (ii) |
| Ĝ(s) | (i) all-s, (ii) eventual on (3.1034, 4) | **CONFIRMED**, audit §3.3 |
| §7 Q1, is G2/Z2 bounded | (i), label stated in halves | **CONFIRMED (i)**, and the half-statement is right, though the compound it names is (ii) trivially, since any Z2 bound below the width is already (ii) |
| §7 Q2, where the tile's maximal gap leaves (x, x²) | (i) | **CONFIRMED (i)**, a location statistic |
| §7 Q3, where G2 is attained and its multiplicity | (i) | **CONFIRMED (i)**, and it is the same question as the G2 note's C2 and Q2, posed independently on both sides |
| §7 Q4, how many zones hold exactly two pairs | (i) | **CONFIRMED (i)**, a count on a sweep already run |

---

*Red-team note; process record, HELD under the publication moratorium. No
existing file was edited, no producer was written and no script was run. Every
verdict is document-against-record: the cited file at the cited line, with the
arithmetic and the arguments re-derived here before agreement. What this pass
did NOT do: it re-executed no producer, so no verdict is
document-against-fresh-computation, and the four rows marked UNCHECKED in §1
are marked so rather than assumed. See `research/history/CHANGELOG.md` for the
corpus rule.*
