# The anchored ladder at @17 and beyond: the @17/@19 rungs were already on record, and the unified ladder is taken one level up, to @23, under a sealed forecast

<!-- ledger
id: Q-anchored-ladder-17-0830
status: ANSWERED
todo: A
question: At @17 and above, at which depth K does the composed (unified) anchored floor first turn positive and at which K does it reach the truth, and does the depth-cost curve K_first_positive(level), K_truth(level) move with level?
verdict: At @17/@19 the answer was already on record (Q-anchored-ladder: positive at K = 2/10, truth at ascending K = 109/410, minimal pool 88/350) and is re-derived here as the custody gate; the new level @23 ran under a sealed 14-of-14 forecast: positive first at K = 27 = K* (PROVEN from the record before the run), truth at ascending K = 1732 of 1739, minimal pool 1543 = 0.887 of the scour (PROVEN lower bound meets VERIFIED upper bound); across five levels positivity costs exactly K* while the truth fraction rises 0.40, 0.62, 0.73, 0.81, 0.89, a MEASURED finite table with no law in x and no exponent touched.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-engine.md`).** The
> whole @23 ladder re-derived on an independent engine and STANDS: K* = 27,
> floors 4841/5364/523, truth 597475, the minimal pool 1543 proven exact, and
> the sealed sheet rescored 14 of 14.

*(2026-08-30. Staging note; HELD; nothing here is integrated into a live
document. Producer, formally embedded:
`research/history/staging/attack-0830-anchored-ladder-17.js` (12.0 s, its
fingerprint line 449; `--check` passes). Calibration marked per claim: PROVEN,
VERIFIED (exact computation), MEASURED, HEURISTIC, OPEN, REFUTED. Every figure
below sits in that producer's OUTPUT block (lines cited) or is quoted by file
and line from an embedded artifact (`research/attack-anchored-02-ladder17.js`,
`research/natal-cap-11-kstar23.js`, `paper/staircase-note.md` Theorem 8). This
note edits no other file. Scope per `attack-wrongdirection-audit.md` §3.4 and
`paper/staircase-note.md` §10 item 1: finite per-level counts only; nothing
below is a law in x, and nothing below can move an exponent.)*

---

## 0. What is open first, and what the brief got wrong

**The brief re-posed an ANSWERED question.** Its deliverable (b), "the @17
ladder in K: at which K the composed floor first becomes positive and at which
K it reaches the truth, @19 if it fits", is `Q-anchored-ladder`, ANSWERED
2026-08-21 in `attack-anchored-02.md`, with the full 121-rung @17 table
embedded (`research/attack-anchored-02-ladder17.js` lines 629 to 749) and the
@19 table at selected rungs (lines 771 to 829). Those rungs are quoted here,
not re-run. The custody gate re-derives them because the engine must reproduce
the record before it is trusted one level up, and that is the only sense in
which they are computed again.

**Brief errors, recorded.** (1) The brief states truth "at K = 8 and K = 28" at
@11/@13; that is the ascending-pool depth. The exact minimal pool is 4 and 21
(`attack-anchored-02.md` HEADLINE table: PROVEN lower bound by sole killers,
VERIFIED upper bound by the greedy pool). (2) The brief says @17 and @19 "need
the segmented-march engines"; they do not. The record's producer runs both
levels in 0.7 s (`research/attack-anchored-02-ladder17.js` line 608). The level
that needs a segmented tile is @29 (W = 6469693230 > 2^31); the level in
between, @23 (flat Uint8Array tile as in `research/natal-cap-11-kstar23.js`),
is the one this note adds. (3) `attack-anchored-02.md` §5 gives the @23 march
as "5.3M slots x 1863 primes"; the scour at @23 has 1739 primes
(`research/natal-cap-11-kstar23.js` line 321). Slip in the record, noted, not
edited.

**A reading of my own, REFUTED in the run.** I expected the largest killer
prime at every level to be the lower member of a twin pair inside the scour
(shadow duty, `attack-anchored-02.md` §3). It is at @11, @17, @23 and is not at
@13 (q = 139, q + 2 not in the scour) or @19 (q = 2887, neither neighbour in
the scour): producer lines 626 to 631, the one FAIL in the block, left visible.
The record's shadow guarantee says a twin's lower member is a killer; it never
said the last killer is one. The over-reading was mine.

**What is open.** Whether the truth fraction K_truth/scour keeps rising toward
1 is OPEN and, as an all-x statement, outside scope; this note adds one point.
@29 is priced in §5 and not run. Whether the sole-killer count equals the
greedy truth pool at @29 (the coincidence `attack-anchored-02.md` §4 flags as
asserted, not derived) is OPEN; it held at @23 (line 609).

## 1. Pre-registration for @23, written before the run

Sealed here, in this file, before the producer's SEC 3 executed. Forecasts
are of two kinds: DERIVED from the record (a miss would mean an engine
defect), and EXTRAPOLATED from the four measured levels (a miss is
information). Anchors quoted from `paper/staircase-note.md` Theorem 8 and
`research/natal-cap-11-kstar23.js` lines 321 and 360 to 369: N = 5301450,
scour 1739 primes 29..14929, sum cap1 = 48424543, sum cap2 = 7034588,
K* = 27, certified floor 4841, truth 597475, removed 4703975, sum s = 868,
self-strikes 175, cap-infinity anchor 4704668.

DERIVED (expected exact):
- D1. Truth 597475. Classic plateau = N minus the cap-infinity anchor =
  596782. Waste = 868 minus 175 = 693. Fresh self-strikes = 175.
- D2. The K = 0 unified floor is vacuous: the margin identity bounds
  sumC minus sumU by sum s = 868, and sum cap2 minus N = 1733138, so
  floorU(0) is below minus 1732000. DEAD, as at @17 and @19.
- D3. K_first_positive (unified) = 27 = K*. Reason: at K = 26 the classic sum
  is 5312453 (line 367), 11003 above N, and the unified lead is at
  most 868, so the unified sum is still above N at K = 26; at K = 27 the
  classic sum is already below N. PROVEN from the record plus the margin
  identity, before the run.
- D4. Hard-cap chain and margin identity: zero violations at all 1740 depths
  times 1739 primes; full-depth capU = fresh per prime.
- D5. @11, @13, @17, @19 reproduce every record figure named in the producer's
  CITED block, digit for digit.

EXTRAPOLATED (bands; the measured values at @11/@13/@17/@19 in parentheses):
- E1. Wheel-excluded allowances WE: share of allowances 0.40 (0.33, 0.29,
  0.40, 0.40) gives 347; band [280, 420]. Shadows = 693 minus WE.
- E2. Unified floor at K* = 27: 4841 plus WE plus the shadows dead by depth
  27; forecast 5350, band [5240, 5490]; margin over classic 510, band
  [400, 650] (margins 2, 5, 26, 110).
- E3. Ascending plateau-crossing depth: fraction 0.72 of scour (0.20, 0.44,
  0.56, 0.65), forecast 1250, band [1130, 1390]. Greedy: 0.70, forecast 1217,
  band [1100, 1390] (0.20, 0.41, 0.53, 0.63).
- E4. Ascending truth depth: fraction 0.96 (0.80, 0.82, 0.91, 0.94), forecast
  1670, band [1600, 1739].
- E5. Minimal truth pool = sole-killer count: fraction 0.86 (0.40, 0.62,
  0.73, 0.80), forecast 1495, band [1390, 1600]; and sole count = greedy pool
  size (the asserted coincidence) HOLDS.
- E6. Dead primes: fraction 0.10 of scour (0.60, 0.38, 0.25, 0.16), forecast
  174, band [120, 260]. Redundant killers (0, 0, 2, 14): forecast 60, band
  [20, 200].

Scoring rule: inside the band is HIT, outside is MISS, and D-forecast misses
are reported as engine defects, not findings.

**Score (producer lines 594 to 610): 14 HIT of 14, the E5 coincidence HOLDS
(1543 = 1543).** The extrapolated points sat inside their bands but not at
their centres: WE 372 against point 347, the ascending truth depth 1732
against 1670 (the band's upper 40 percent), the minimal pool 1543 against 1495,
dead primes 159 against 174, redundant killers 37 against 60. Bands of this
width are a weak test, and the note says so; the derived five are the custody
content, the extrapolated nine are calibration of the extrapolator.

## 2. The family, restated with its quantifiers (deliverable a)

Fix a prime level x, W = x#, the Natal@5 comb N_x (`paper/staircase-note.md`
§1), the ascending scour q_1 < q_2 < ... < q_n (primes in (x, sqrt W]), and
the ANCHORED point: every scour prime strikes the classes 0 and minus 2. For a
scour prime q and a side, the admissible cofactor candidates are v = q m with
m >= 1, m = 1 or P^-(m) >= q, v in the side's mod-30 house (11/17 on the
A-side, 13/19 on the B-side), and v outside the transcribed comb-exclusion
class of every wheel prime 7 <= p <= x (§7 of the staircase note; the m = 1
extension is anchored-01's unified-cap lemma, red-teamed in
`redteam-0820-night-proofs.md` §1a). A candidate is alive at depth K if none of
the first K scour primes below q strikes it. capU_K(q) counts alive candidates;
capC_K(q) counts them over m >= 2 and adds s(q).

- PROVEN, for every K >= 0 and every scour prime q of the fixed level x, at the
  anchored point: fresh(q) <= capU_K(q) <= capC_K(q). Hence
  floorU(K) := N minus sum_q capU_K(q) is a lower bound on the anchored
  survivor count, and every anchored survivor is a twin prime pair (Lemma 5).
- PROVEN (`attack-anchored-02.md` §1, the margin identity):
  capC_K(q) minus capU_K(q) = s(q) minus [the m = 1 candidate is alive at
  depth K]; so the unified lead over the classic family at depth K equals the
  number of self-strike allowances the classic family wastes at that depth.
- The quantifier is a finite one: "at level x, for the stated pool order".
  floorU(K) is a number per (x, K); the family is a table, not a function of x
  with a limit.

Custody gate, digit for digit (producer lines 451 to 507, abort-on-mismatch):
@11 floor 36 at K = 0, truth 45 at ascending K = 8, plateau 41; @13 floor 115,
truth 307 at K = 28, plateau 296; the witness replays 16 and 152; @17 and @19
every [STC] and [AA2] anchor named in the CITED block, including the landmark
rungs printed for line-by-line comparison with the record (lines 475 to 507
here against lines 629 to 829 there).

## 3. The ladders at @17, @19 (quoted) and @23 (new)

| | @17 (record) | @19 (record) | @23 (this run) |
|---|---|---|---|
| scour | 120 | 435 | 1739 |
| candidates / killer incidences | 16112 / 5235 | 308315 / 119912 | 7034216 / 3082915 |
| unified floor at K = 0 | minus 1262, vacuous | minus 55865, vacuous | minus 1732766, vacuous |
| K_first_positive (unified) = classic K* | 2 | 10 | 27 |
| classic certified floor at K* / unified at K* / margin | 82 / 108 / 26 | 1877 / 1987 / 110 | 4841 / 5364 / 523 |
| classic plateau = truth minus waste | 3057 = 3099 minus 42 | 38219 = 38380 minus 161 | 596782 = 597475 minus 693 |
| waste = wheel-excluded + shadows + fresh-self | 58 = 23 + 19 + 16 | 213 = 86 + 75 + 52 | 868 = 372 + 321 + 175 |
| plateau passed, ascending / greedy | 67 / 64 | 281 / 273 | 1242 / 1227 |
| truth, ascending / minimal pool | 109 / 88 | 410 / 350 | 1732 / 1543 |
| killers / dead / sole / redundant | 90 / 30 / 88 / 2 | 364 / 71 / 350 / 14 | 1580 / 159 / 1543 / 37 |

Sources: @17/@19 columns from `research/attack-anchored-02-ladder17.js`
lines 629 to 836 and 903 to 907 (the killer/dead split is that file's SEC 4c)
and re-derived here at lines 468 to 507; @23 column from lines 521 to 589 here. All entries
VERIFIED (exact finite counts), the minimal pool PROVEN exact by the sole-killer
lower bound meeting the greedy upper bound (line 609, 1543 = 1543).

**Reading of the @23 column, caveats first.** The K = 0 gain that anchored-01
carried at @11/@13 is dead by three orders of magnitude at @23 (sum cap2
exceeds N by 1733138 while the whole unified lead is bounded by 868). Nothing
below the crossing is certified by either family. The unified family's lead
at K* is 523 twin pairs over the classic 4841, an 11 percent improvement on a
certificate that itself catches 0.9 percent of the truth (4841 of 597475,
`paper/staircase-note.md` §10 item 2). Truth costs 1543 of 1739 primes as an
exact minimum, and the ascending pool must walk 1732 rungs because the last
killer is q = 14867, whose twin 14869 sits in the scour (line 630): the deep
tail is forced by shadow duty exactly as the record described, even though
that mechanism does not pick the last killer at every level (§0).

## 4. The depth-cost curve across five levels (deliverable c)

MEASURED (producer lines 614 to 623):

| level | scour | K_pos = K* | K*/scour | plateau K greedy, fraction | K_truth minimal, fraction | dead fraction |
|---|---|---|---|---|---|---|
| @11 | 10 | 0 | 0.0000 | 2, 0.200 | 4, 0.400 | 0.600 |
| @13 | 34 | 0 | 0.0000 | 14, 0.412 | 21, 0.618 | 0.382 |
| @17 | 120 | 2 | 0.0167 | 64, 0.533 | 88, 0.733 | 0.250 |
| @19 | 435 | 10 | 0.0230 | 273, 0.628 | 350, 0.805 | 0.163 |
| @23 | 1739 | 27 | 0.0155 | 1227, 0.706 | 1543, 0.887 | 0.091 |

Five checks pass across all five levels (lines 619 to 623): K_first_positive
equals the classic K* at every level; the unified floor at K* beats the
classic certified floor at every level; the minimal-truth fraction and the
greedy plateau fraction rise at every consecutive pair; the sole count equals
the greedy truth pool at every level. Per-rung efficiency (lines 634 to 638)
keeps its three regimes: to positivity 685, 5785, 64375 per rung at @17, @19,
@23; positivity to plateau 45.4, 133.7, 486.8; plateau to truth 0.93, 1.22,
1.41.

**What the curve suggests, HEURISTIC.** The cost of positivity is the classic
K*, which the staircase note's K* law tracks as the quarter-power band
(K*/scour 0.0167, 0.0230, 0.0155 here, 0.0088 at @29 per `paper/staircase-note.md`
§7); the cost of exactness is a fraction of the scour that has risen at every
step and at @23 leaves 11 percent of the scour outside the minimal pool, most
of it the dead tail (159 primes, 9 percent). The natural reading is that the
truth fraction tends to 1 minus the dead fraction, and the dead fraction is
falling; on five points that is a description, not a law, and this note does
not state one in x.

**What would falsify it.** (a) A level at which the minimal-truth fraction
falls, or the sole count and the greedy pool separate (line 623 is where it
would show; the redundant-killer count 0, 0, 2, 14, 37 is the pressure on that
coincidence). (b) A level at which the unified K_first_positive exceeds the
classic K*; the margin identity bounds the lead by sum s, so this happens
exactly when the classic sum at K* minus 1 exceeds N by less than the
wheel-excluded count, which is checkable from the record's ladder before any
run, as D3 was. Neither check has run at @29.

**What this cannot do, stated flatly.** A finite table of certification depths
at five levels moves no exponent; the certified quantity is a per-tile count of
twin prime pairs at a named level, and any all-x floor family with floor(x)
unbounded would be TPC-strength (`attack-wrongdirection-audit.md` §3.4). Base
rate as posed: this is item A's first move (a), a level added, and it landed
where the record's four levels pointed.

## 5. @29, priced, not run

Inputs (lines 640 to 641, [STC]): W = 6469693230 (above 2^31, so the tile must
be segmented as in `research/natal-cap-18-at29.js`), N = 143139150, scour 7863
primes, sum cap2 = 202133083, so roughly 2.0e8 candidates against 7.0e6 at @23
(28.7 times), and the killer-scan work (candidates times scour) 130 times the
@23 run. The @23 level took most of this producer's 12.0 s (the four lower
levels run in under a second, `research/attack-anchored-02-ladder17.js` line
608), so a linear scaling puts the @29 killer scans near 26 minutes, plus the
segmented march (the record's @29 march ran about 16 minutes at 2 GB, header of
`research/natal-cap-18-at29.js`). Memory is the real cost: the CSR candidate
store at 2.0e8 entries and the n-squared K-curve at 7863 squared entries need
about 4 to 5 GB unless the K-curve is collapsed to per-prime first-kill
histograms, which it can be. That is under the 3.5-hour rule and could simply
be run; it was not run here because the brief's level list ends at @19, the
value store must move from Int32 to exact doubles, and the tile must be
segmented, which is a redesign and not a parameter change. Plan, if wanted:
four `--tail` segments (march and fresh vector; candidate enumeration by
scour-index blocks, which needs no tile; the K-curve and spend; the scorecard),
with D3's K_first_positive already derivable from the record: the classic
sum at K = 68 is 143231102 (`research/natal-cap-18-at29.js` line 595), 91952
above N, and the unified lead is at most sum s <= 7863 (one allowance per
scour prime), so the unified family cannot cross before K = 69 = K*; PROVEN
from the record and the margin identity, the same argument as D3.

## 6. Transfer to the zone side, item Z2 (deliverable d)

One thing transfers and two things do not. The sole-killer lower bound is a
statement about any per-prime cap family built by cofactor injection: a
candidate with exactly one killer forces that killer into every pool that
reaches exactness, and the zone transplant's capU (`quadpoint-identity-01.md`,
floor_K = T minus X(K)) is the same injection on a window, so the exact price
of X(K) = X(full) on the zone side is the sole-killer count there, PROVEN by
the same two lines and not yet measured. What does not transfer: (i) Z1's
measured quantity is the positivity depth K*/pool (0.061 to 0.032 over its
decades), and the tile-side twin of that is the K*/scour column above, which
is small and non-monotone, not the truth fraction, which rises; the two
questions are different and this note does not let one answer the other.
(ii) Nothing here touches Z2's comparison sum capU_K <= C minus 1, which is
TPC-strength by the capture identity (`attack-wrongdirection-audit.md` §3.1);
the unified lead is bounded by sum s at every depth, a term of size pi(sqrt W)
against a comparison that is off by the whole X(K) minus T. Calibration:
the transfer is a tool for pricing exactness on the zone side (PROVEN, unused),
not an improvement to any certificate.

## 7. Reproduction and custody

```
node research/history/staging/attack-0830-anchored-ladder-17.js            # 12.0 s, one process
node research/qc/embed.js --check research/history/staging/attack-0830-anchored-ladder-17.js
```

Custody inside the run: SEC 0 aborts unless the @11/@13 [STC] sums, floors
and truths, the [AA1] unified benchmarks, the [AA2] ladder figures and both
[ADV] witness replays reproduce exactly; SEC 1 aborts unless every @17/@19
[STC] and [AA2] anchor reproduces; SEC 3 asserts the @23 [STC] anchors
(N, scour, sum cap1, sum cap2, K*, floor, truth, the classic sums at K = 26
and 27, removed, sum s, self-strikes, the cap-infinity anchor) before any new
figure is printed; the hard-cap chain and the margin identity are asserted at
every depth of every prime at all five levels; the minimal pool is a checked
LB = UB coincidence; width guards (`research/qc/widths.js`, the one static
dependency hashed in the fingerprint) gate the slot store and the pool index
at each level. Timing goes to stderr only. The block's final line reads
"1 CHECK(S) FAILED": that is the refuted expectation of §0 (line 631), kept
visible per the house rule; every custody assertion and every other check
passes. The tail carries code-sha256 and out-sha256 and the exact invocation.

**Integration note for the orchestrator (not acted on here):** if this
survives its adversarial pass, `attack-anchored-02.md` §5's "@23 and @29 not
reached" is half settled and its "1863 primes" reads 1739; TODO item A's first
move (a) has run one level up and its cheap-K clause has a fifth point; the
Theorem 8 table's @23 row has a unified companion (5364 at K* = 27 against
4841). This report edits none of them.
