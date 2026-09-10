# Red team 2026-08-28: the census, the stretch and the placement probe attacked, twenty-three load-bearing claims re-derived, one sealed reading refuted as vacuous, four sentences corrected

<!-- ledger
id: Q-redteam-0828-census
status: ANSWERED
todo: Z0, Z4, Z6 (retired)
question: Do destroyer-census-01.md, stretch-01.md and records-placement-01.md survive an independent re-derivation of every load-bearing claim, and may they leave HELD?
verdict: All three survive on arithmetic, every decisive number reproducing exactly on an independent engine; one sealed reading (records READ-3) is REFUTED as vacuous and four sentences need correcting before integration.
-->

*(2026-08-28. Adversarial pass over the three notes HELD since 2026-08-22,
executing TODO Z0's standing debt. Method: refuted-until-rederived. Every
decisive statistic recomputed on a different code path in
`research/history/staging/redteam-0828-census.js` (2.8 s, formally embedded,
`--check` bit-honest), which sieves primality only and resolves heads by a
two-pointer scan over the twin-opener array rather than by the census's
segmented lpf walk and pending list, builds explicit per-class prefix counts
rather than threshold snapshots, re-derives the immune offset classes from
Euler's criterion rather than replaying stretch-01's own kill test, and
re-extracts A113274/A113275 in BigInt. `node research/qc/embed.js --check`
re-run on all three producers: all three green. Grades: CONFIRMED /
WEAKENED (corrected sentence given) / REFUTED (failing line given). Nothing
here is a theorem and nothing here is a TPC claim; Route B stays closed.
NOT DONE HERE, and owed to the primary agent: the git custody check that
`1bc0dd8` exists and predates `research/records-placement-01.js`. This pass
ran no git command of any kind.)*

## 1. Scoreboard

| note | claim | grade |
|---|---|---|
| records-placement-01 | READ-3 (pooled 82-record mean, band [0.436, 0.564]) as a registered test | **REFUTED, vacuous** |
| records-placement-01 | headline "UNIFORM-CONSISTENT on all three registered readings" | **WEAKENED, two readings had power, not three** |
| records-placement-01 | seven fractions, READ-1 0.4585, READ-2 count 1, READ-3 0.4773 | CONFIRMED, digit-exact |
| records-placement-01 | sealed bands unmoved after the seal | CONFIRMED, all three re-derived from the prereg's own nulls |
| records-placement-01 | runtime extraction, values match A113274/A113275 | CONFIRMED, and strengthened: all 82 rows match the OEIS b-files |
| records-placement-01 | "closes its fourth decade" | WEAKENED, the seven records occupy one decade and add 1.40 |
| records-placement-01 | "no square-anchor coupling at any measured scale" | WEAKENED, one statistic and seven fresh points |
| destroyer-census-01 | §1 the destroyer convention, and "time a beats time a+2" | **WEAKENED, the rule is positional, not temporal** |
| destroyer-census-01 | §3 "It DIES at p = 67 ... B/C climbs toward 2" | **WEAKENED, death is at B/C = 1.0121** |
| destroyer-census-01 | §3 "the a-priori CRT main term crosses at p = 59" | **WEAKENED, the crossing is at p = 61** |
| destroyer-census-01 | §6(b) "their ratio is again e^{2gamma}/4" | WEAKENED, tautological: the producer constructs it that way |
| destroyer-census-01 | §6(b) head coefficients "run 0.7064 to 0.7344 across windows" | WEAKENED, the estimator is range-composition dominated |
| destroyer-census-01 | §3 the 15 certified zones and their forced counts | CONFIRMED, digit-exact, tight at p = 7 |
| destroyer-census-01 | §3 closed form, p* = 42.52, B/C band means | CONFIRMED, all four band means digit-exact |
| destroyer-census-01 | §4 shells partition, 438,186 frozen twins, minimum 2 | CONFIRMED, digit-exact |
| destroyer-census-01 | §6(a) 96.65%, 1,184 of 1,225, differ-fraction 9.09% to 1.79% | CONFIRMED, digit-exact including the four band rows |
| destroyer-census-01 | §6(b) h/R = 1.0924 ... 1.0254 | CONFIRMED, digit-exact on the independent head engine |
| destroyer-census-01 | §6(b) nulls 0.6007, 0.7574, ratio e^{2gamma}/4 | CONFIRMED as arithmetic, see the tautology row |
| destroyer-census-01 | §6(c) mod-30 deviation 7.4% at residue 12, and the pooling rule | CONFIRMED at 7.41%, and stratifying the marginals moves it by nothing |
| stretch-01 | §2 the chain A091592-complete to weak SP, arrow by arrow | CONFIRMED, including the q <= 109 cutoff |
| stretch-01 | §2 "the finite check q <= 109 (done directly here)" | WEAKENED, no keyed check exists in the producer |
| stretch-01 | §4 the QR kill law, immune classes, redistribution guardrail | CONFIRMED, and the guardrail is weaker than the truth |
| stretch-01 | §3 "certified six decades past the sweep" | WEAKENED, 7.95 decades and understated |
| brief's premise | "the grid death at Q = 17 with revivals to 43" in stretch-01 §4 | **MISATTRIBUTED, it is attack-quadpoint-01.md §2** |

## 2. The refutation: records-placement-01's READ-3 could not have fired

The prereg registers READ-3 as the pooled mean over all 82 records against
the band 0.5 plus or minus 2/sqrt(12*82) = [0.436, 0.564], and it attaches
the probe's conclusion to it: "Inside with no READ-2 flag = the
square-blindness measurement closes its fourth decade".

Seventy-five of the eighty-two fractions were already fixed and already
published when the prereg was written, summing to 35.925. A placement
fraction lives in [0, 1) by construction. So the pooled mean over the 82
was confined, before any of the seven fresh records was placed, to

    [(35.925 + 0)/82, (35.925 + 7)/82] = [0.4381, 0.5235],

reproduced by the companion script. That range sits strictly inside
[0.436, 0.564]. No assignment whatever of the seven fresh fractions could
have moved READ-3 outside its band. The reading has zero power and carries
no information about the seven records.

READ-1 and READ-2 do have power: READ-1's mean-of-seven ranges over [0, 1)
against [0.282, 0.718], and READ-2 fires at 4 of 7 outer-decile points,
null tail 0.0333 re-derived exactly. The operative content of the probe is
those two readings, and the prereg's own conclusion clause is gated on
READ-3 (which cannot fail) and on READ-2, so it reduces to READ-2 alone.

This is not a band moved after the seal. The three bands re-derive exactly
from the prereg's own stated nulls, [0.282, 0.718], [0.436, 0.564] and
P(X >= 4) = 0.0333, and the note scores against them unchanged. The defect
is that a reading with no failure mode was registered, scored, and then
counted in the headline as one of three.

**Corrected sentence for §1.** Replace "UNIFORM-CONSISTENT on all three
registered readings" with: "UNIFORM-CONSISTENT on the two registered
readings that had power. READ-1's mean-of-seven is 0.4585, inside
[0.282, 0.718]; READ-2 finds one outer-decile point against an expectation
of 1.4, no clustering. READ-3, the pooled 82-record mean, reads 0.4773
inside [0.436, 0.564], but its reachable range over all possible fresh data
was [0.4381, 0.5235]: it could not have fired and is reported as
descriptive, not as a third passed test."

**Corrected sentence for §1's conclusion.** "The record process shows no
square-anchor coupling at any measured scale" over-reads a mean and a
decile count on seven points. Replace with: "Seven fresh placements are
consistent with uniform on both readings that could have flagged; no
square-anchor coupling is detected in record-start placement at heights
1.29e16 to 7.05e16." §4's "seven points close a decade of measurement,
nothing more" already says the right thing, and §1 should not say more
than §4.

**The decade arithmetic, checked.** All seven fresh records sit in the
single decade [1e16, 1e17); the reach moves from 2.8e15 to 7.05e16, which
is 1.40 decades. "Fourth decade" is nowhere defined in the prereg or the
note. It is prereg-sealed language, so it is not a post-hoc move, and the
honest restatement is "extends the measured reach by a factor 25, into the
decade above 1e16".

**Custody, and one strengthening.** The producer does extract GAP and
START from `research/a113274-gap-records.js` source at runtime, so the
08-22 hand-transcription channel is closed as claimed. This pass fetched
`oeis.org/A113275/b113275.txt` and `oeis.org/A113274/b113274.txt` and
compared all 82 rows of both against the extracted arrays: zero
mismatches, records 76 through 82 included. Those seven were single-witness
under the series rule; they now have a page-level second witness. The git
custody check on `1bc0dd8` is still owed.

## 3. destroyer-census-01: the convention is positional, not temporal

§1 states the rule and justifies it in one clause: destroyed pairs
"always attribute to the opener's lpf, A-side, because time a beats time
a+2". The producer implements exactly that: the destroyer is lpf(a) when a
is composite and lpf(a+2) otherwise. The clause is a position rule wearing
a time word. It overrides fold order whenever lpf(a+2) < lpf(a), and that
is not rare.

Measured over channel openers 11 to 1e7 (companion script SEC 1): 941,021
destroyed pairs, 560,657 of them with both members composite. The census
convention and fold-activation order, min over the composite members of
lpf, name a **different destroyer on 280,288 pairs, 49.99% of the
both-composite pairs and 29.79% of all destroyed pairs**. The share of
q = 7 as destroyer moves from 19.60% under the census convention to 30.36%
under fold-activation.

The commit of 2026-08-24 already recorded that the fold ledger runs
fold-activation order and the census runs position-time order. What this
pass adds is the size of the difference, and that the census's own
justification for its choice is wrong. Nothing numerical breaks: the
derived null is convention-consistent. s(q) = (1/q)prod_{7<=r<q}(1-1/r) is
exactly the density of lpf(a) = q among channel openers, and the B-side
factor cf(q) = (q/(q-1))prod_{7<=r<q} r(r-2)/(r-1)^2 is exactly the
conditioning on a prime: q/(q-1) from removing the zero class, and
r(r-2)/(r-1)^2 from removing one nonzero class out of r-1 rather than out
of r. Both re-derived by hand here and both correct.

**Corrected sentence for §1.** Replace "always attributes to the opener's
lpf, A-side, because time a beats time a+2" with: "always attributes to
the opener's lpf, A-side. This is a POSITION rule, not a time rule: it
overrides fold-activation order whenever lpf(a+2) < lpf(a), which is
49.99% of both-composite pairs and 29.79% of all destroyed pairs to 1e7,
and it moves q = 7's destroyer share from 30.36% to 19.60%. The fold
ledger (`research/fold-ledger-01.js`) runs the other convention; every
null below is derived against this one."

**One consequence to carry.** "Every A-side fresh channel kill destroys a
live pair" in §1's A/B-split bullet is true only by the convention's fiat,
not as a fact about liveness: half of those pairs had already lost their
closer to a smaller prime in fold order. Say "is attributed a live pair
under this convention", not "destroys a live pair".

## 4. destroyer-census-01: three more sentences

**(a) §3's death threshold reads as 2 and it is 1.** "It DIES at p = 67
(B = 503 vs C = 497) and never returns: B/C climbs toward 2" is literally
true and reads as if 2 were the threshold. Reproduced here: B = 503,
C = 497, B/C = 1.0121 at p = 67; last certified zone p = 61 at C - B = 1;
zero revivals; band means 0.8528 / 1.3218 / 1.4663 / 1.5419 digit-exact.
`attack-bc-parity-floor.md` §5 named this same phrase on 2026-08-26 and
gave the repair, which is still unapplied. Corrected sentence: "It DIES at
p = 67, where B/C first crosses 1 (B = 503 against C = 497, B/C = 1.0121),
and never returns; the ratio's LIMIT is 2, which is not the threshold."

**(b) §3's CRT crossing is off by one prime.** The note says "the a-priori
CRT main term 2(1 - prod_{7<=q<=p}(1-1/q)) crosses at p = 59, between the
two". The producer's OUTPUT block says something different and correct:
"stays < 1 up to p = 59". The term reaches 0.99665 at p = 59 and first
reaches 1 at p = 61. The producer's own READINGS block carries the same
off-by-one as the note, so the drift is producer-internal. Corrected
sentence: "the a-priori CRT main term 2(1 - prod_{7<=q<=p}(1-1/q)) stays
below 1 up to p = 59 and first crosses at p = 61, which is the last
certified zone". The ordering p* = 42.52 < crossing < 67 survives; the
crossing coincides with the last certificate rather than sitting strictly
between.

**(c) §6(b)'s "again" is a tautology.** "The Mertens forward density gives
0.6007 ln^2 p; HL truth 0.7574 (their ratio is again e^{2gamma}/4)". The
producer computes the first constant as `HLCOEFF * MERTENS_RATIO`, that is
as the second times e^{2gamma}/4. The ratio is exact by construction, not
a second sighting of rho(2). The derivation content sits in
`origin-excess.md`, which is where the note should point. Corrected
sentence: "The staircase-Mertens forward density gives
e^{2gamma}/(8 C2) = 0.6007 ln^2 p, which is the HL coefficient
1/(2 C2) = 0.7574 multiplied by the origin-excess constant
rho(2) = e^{2gamma}/4 by construction (origin-excess.md); measured head
coefficients sit between them."

**(d) §6(b)'s coefficient trend is a composition artefact as much as a
height trend.** The note reports "measured head coefficients run 0.7064 to
0.7344 across windows". Two things are wrong with reading that as a
climb. First, it is not monotone: 0.7064, 0.7177, 0.7236, 0.7192, 0.7344.
Second, the estimator is a ratio of sums over wide windows, and the
producer's own zone-band figure at [3163, 1e4), a sub-band at the TOP of
the first window, reads 0.6693, BELOW the whole window's 0.7064. On
half-decade bands the same estimator reads 0.7494, 0.6689, 0.7526, 0.7079,
0.7250, 0.7232, 0.7160, 0.7201, 0.7336, 0.7346 from 1e3 to 1e8: a spread
of 0.084 with no clean trend below 1e5. Corrected sentence: "measured head
coefficients read 0.7064, 0.7177, 0.7236, 0.7192, 0.7344 across the five
windows, non-monotone; on half-decade bands the same ratio-of-sums
estimator spans 0.669 to 0.753, so the window figures carry range
composition and are not a measured convergence to 0.7574." The h/R
reduction, which is the section's actual result, is unaffected: h/R is a
ratio of two means over the SAME population and reproduces digit-exactly.

**The pooling rule, checked and clean.** §6(c) pools 5,761,432 heads over
the whole range against a class-independence null built from
whole-range-pooled marginals of p mod 30 and a mod 30. Recomputing the
null with per-window marginals and summing changes nothing: the worst
deviation is 7.41% at residue 12 under both, and the six most deviant
residues read 1.074 / 0.927 / 1.053 / 0.950 / 1.044 / 1.036 identically.
The repo's subtract-the-marginals-first rule is satisfied in effect here.
The 7.4% figure stands.

**What reproduced exactly.** 9,999,999 channel pairs; 440,310 channel
twins, so 9,559,689 destroyed; 1,225 zones; the 15 certified zones p = 7
to 61 with forced counts 8, 8, 15, 13, 17, 20, 19, 20, 22, 19, 20, 18, 12,
10, 1, tight at p = 7 where C - B = T = 8; first death p = 67 with zero
revivals; p* = e^{15/4} = 42.52; 1,225 shells with 438,186 frozen twins,
no empty shell, minimum 2; 1,184 of 1,225 at 96.65% with tread present in
105 and changing the head in 41, and all four band rows 9.09 / 6.29 / 5.76
/ 1.79 with tread counts 7 / 30 / 23 / 45; h/R = 1.0924, 1.0780, 1.0416,
1.0347, 1.0254; the zone-band coefficient 0.6693.

**§3's theorem re-derived.** D <= B needs each channel member to belong to
exactly one channel pair. Openers sit in classes 11, 17, 29 mod 30 and
closers in 13, 19, 1 mod 30, disjoint, so no integer is both. The
inequality T >= C - B holds, and the closed form is right:
B = 2C - (prime members), prime members are 6 of the 8 coprime classes
mod 30 hence (3/4) of the zone's primes, C = (p'^2 - p)/10, the zone's
typical logarithm is 2 ln p, so B/C = 2 - (15/2)/(2 ln p) = 2 - 15/(4 ln p)
and B = C at ln p = 15/4.

## 5. stretch-01: the chain and the QR structure hold

**§2's implication chain, arrow by arrow.**

- *A091592-complete implies SP.* S_q is the union of the integer-square
  windows [n^2, (n+1)^2) for n = q .. q'-1, so completeness gives a twin in
  S_q as soon as some n in that range exceeds 122. The cutoff is checked
  here and the note's number is right: the largest prime whose whole
  stretch lies inside the exceptional index range is exactly q = 109
  (q = 113 has q' = 127 and covers n = 123..126, which completeness
  already governs). A091592 recomputed to n = 3000 gives the 12 terms
  1, 9, 19, 26, 27, 30, 34, 39, 49, 53, 77, 122. CONFIRMED. The
  conjecture-conditional grade the note attaches is correct.
- *SP implies strong ZP.* Containment: S_p = [p^2, p'^2) sits inside
  zone p = (p, p'^2). CONFIRMED, one line. The added clause about the
  tile's first hole is not needed for the arrow.
- *The converse containment fails.* No zone fits inside any stretch.
  CONFIRMED.
- *Weak SP is equivalent to TPC.* Elementary both ways, matching
  ZONE-POSTULATE §2's own argument for zones. CONFIRMED.
- *No arrow is stated stronger than proven.* The bullet headers carry
  PROVEN implication and conjecture-conditional premise where they should.
  CONFIRMED.

One documentation correction: §2 writes "plus the finite check q <= 109
(done directly here)". The producer contains no check keyed to 109; the
number 109 does not appear in `research/stretch-01.js`. What covers the
finite range is SEC B2's direct occupancy sieve over all stretches to
q = 9973, which does include every prime q <= 113. The substance holds and
is re-verified here (every stretch S_q with q prime <= 113 is occupied,
zero exceptions). Corrected sentence: "plus the finite check for q <= 109,
which SEC B2's direct occupancy sweep to q = 9973 subsumes".

**§4's proven structure.** The kill law, the immune classes and the
guardrail all re-derive from Euler's criterion, independently of the
producer's replay:

- Inside S_q, r kills opener q^2 + t iff t is congruent to -alpha or
  -alpha - 2 mod r, alpha = (q mod r)^2 a nonzero QR since r < q. Offset
  class t is killable at some square anchor iff -t or -t-2 is a nonzero QR,
  so a class with both nonresidues or zero is immune at EVERY square
  anchor. Immune sets recomputed: {0, 2} mod 7, {1, 3, 9} mod 11,
  {0, 5, 6, 11} mod 13, and 8 of 31 mod 31 (also 8 of 29 mod 29).
  CONFIRMED.
- The existence proof checked by direct sieve at three square anchors,
  q = 101, 1009 and 9973, sweeping all 40 immune classes across each whole
  stretch, widths 408, 8,088 and 679,320: zero r-kills inside an immune
  class at any of them. CONFIRMED.
- The guardrail: sum over offset classes of the kill incidence is
  2(r - 1) exactly at every r checked, so the anchor-ensemble mean is the
  generic 2/r. CONFIRMED, and it is weaker than the truth. At EVERY prime
  anchor q <= 2000 and every r in {7..31} the number of killed offset
  classes is exactly 2, deterministically, verified exhaustively here. The
  redistribution-only conclusion is therefore not an ensemble statement at
  all; it holds anchor by anchor. That strengthens the note's own
  guardrail and leaves its verdict, structure without advantage, exactly
  where it was.

**§3's understated arithmetic.** "Occupancy, certified six decades past
the sweep" understates. The direct sieve reaches 1e8 and the straddle
criterion certifies to 9.007e15, which is 7.95 decades; against the 1e11
zone sweep it is 4.95. Corrected sentence: "certified nearly eight decades
past the 1e8 sieve". This is an error in the conservative direction.

**Not re-derived in this pass**, and so not cleared by it: §3's density
bands 0.7980 / 0.7978 / 0.8021 / 0.7946 against rho(2), §3's margin table
and the q/ln^2 q and q/ln^3 q rates, §3's straddle count 5,484,595 of
5,484,596 with q = 29 the sole exception, §4(ii)'s conditional-null chi2/df
0.52 to 1.63, and §4(iii)'s literature attributions. Those stay at the
producer's own grade.

**The brief's misattribution.** "The grid death at Q = 17 with revivals to
43" is not in stretch-01 and not in its producer. It is
`attack-quadpoint-01.md` §2, whose producer's line 346 reads "first K=0
death: Q = 17; last K=0 success in range: Q = 43; revivals after a death:
YES". That note is a separate Z0 debt item and was NOT verified here.

## 6. May they leave HELD

- **destroyer-census-01.md.** Yes, after the four corrected sentences in
  §§3 and 4 above are applied (§1's convention clause, §3's death
  threshold, §3's CRT crossing, §6(b)'s tautology and coefficient trend).
  Every measured number in §§1, 3, 4 and 6 reproduced digit-exactly on an
  independent engine. §2's k-th-youngest ledger, §2's kill-rate table and
  §5's staircase were not re-derived here and leave HELD at their own
  grade.
- **stretch-01.md.** Yes for §2 and §4, which are the note's proven
  content and are fully re-derived here, after the two documentation
  corrections (§2's "done directly here", §3's "six decades"). §3's
  measured bands, margins and straddle count were not re-derived and
  should stay HELD or be marked as carrying only the producer's own
  witness.
- **records-placement-01.md.** Not as written. The headline sentence in §1
  counts a reading that had no failure mode, and §1's conclusion clause
  over-reads seven points. With the two corrected sentences in §2 above it
  may leave HELD; the note is then stronger than it was, since all 82
  ladder rows now carry an OEIS page-level second witness. The git custody
  check on `1bc0dd8` is owed before integration and this pass could not
  run it.

**One gate item for whoever integrates.** This note's ledger id
`Q-redteam-0828-census` names TODO items Z0, Z4 and Z6. Z4 carries
`Ledger: Q-head-residual` and Z0 and Z6 carry no `Ledger:` line at all, so
`node research/qc.js` will flag the unacknowledged item until those lines
are added. No file outside this note and its producer was touched here.

## 7. What would falsify this, and whether that check has run

- **The vacuity finding.** It is falsified if a placement fraction can lie
  outside [0, 1), or if the prereg's READ-3 band were not 0.5 plus or minus
  2/sqrt(12*82). Both checked: the producer asserts every fraction in
  [0, 1), and the band re-derives to [0.436, 0.564] from the prereg's own
  stated null. RUN.
- **The convention finding.** It is falsified if lpf(a+2) < lpf(a) is rare
  among both-composite channel pairs. Measured at 49.99% to 1e7. RUN. NOT
  RUN: whether the rate changes at 1e8 or beyond, and whether any census
  number other than the per-q destroyer split is convention-sensitive.
- **The census reproductions.** Falsified by any digit disagreeing between
  the two engines. All disagreed on none. RUN at 1e8, the census's own
  range. NOT RUN: any range above 1e8, where the census itself claims
  nothing.
- **The coefficient-estimator finding.** Falsified if the half-decade
  bands showed a monotone climb toward 0.7574. They do not; they span
  0.669 to 0.753. RUN. NOT RUN: the same estimator at 1e12, which is the
  check all three of today's head-residual notes queue and none has done.
- **The QR immune-class finding.** Falsified by one r-kill inside an
  immune class at any square anchor. Zero over three full stretches and
  40 classes each; and the exactly-two-classes statement checked over all
  prime anchors to 2000 for r in {7..31}. RUN. NOT RUN: anchors above
  2000, and any r above 31.
- **The A091592 arrow.** Falsified by an exceptional n above 122 below
  3000, or by an unoccupied stretch with q <= 113. Neither exists. RUN to
  n = 3000 only; the literature's claim is tested to 1e7 and is cited, not
  reproduced.
- **The OEIS second witness.** Falsified if the b-files disagree with the
  extracted arrays. Zero mismatches over all 82 rows of both sequences,
  fetched today. RUN.
- **Custody.** NOT RUN, and it cannot be run from this seat: whether
  `1bc0dd8` exists in the graph, contains only the prereg, and predates
  `research/records-placement-01.js`. Owed to the primary agent.

---

*Producer and custody: `research/history/staging/redteam-0828-census.js`,
embedded, `node research/qc/embed.js --check` bit-honest, one hashed input
(`research/a113274-gap-records.js`). `--check` re-run on all three target
producers, all green. Cited, never recomputed: the 08-26 repair sentence
(`attack-bc-parity-floor.md` §5), the fold-ledger convention statement
(`research/fold-ledger-01.js`), `origin-excess.md`'s rho(2), OEIS A007508.
Fetched at page level today: OEIS b113274 and b113275. History layer:
process record, staging. See `research/history/CHANGELOG.md` for the corpus
rule.*
