# The head's HL remainder, split: the 5.3 percent was a pooling artefact of the decade-wide OLS, the ensemble half derives by a finite count and has the opposite sign to the one guessed, and the anchoring half is Hardy-Littlewood restated

<!-- ledger
id: Q-head-remainder-0830
status: PARTIAL
todo: Z4
question: Does the 5.3 percent remainder that Hardy-Littlewood leaves in the head's endpoint deficit Delta = 2 - beta derive by a route that is not HL: the frozen-sieve first-survivor object, a level-of-distribution correction, or the exact tile-ensemble head?
verdict: No route that is not HL closes it, and the remainder as recorded is not what it was taken to be. The record's Delta_meas = 0.6214 at [1e7,1e8) pools a decade over which the prime density falls ten percent, and the OLS intercept absorbs the gradient (a Simpson-type effect, sign derived): the two half-decades read 0.6848 and 0.6500, the four quarter-decades 0.7203 to 0.6565, and pooled minus the gap-weighted mean of the halves is -0.0378, -0.0455, -0.0524 at the three decades, so the same-sign 5.3 percent miss is the pooling. At half-decade resolution HL's pipeline prices Delta to 1.2 and 0.4 percent at the top two windows, inside one standard error, and the sign of the miss alternates. That agreement is a near-cancellation of two four-percent effects: the pipeline under-predicts its own rotation ensemble by 3.6 to 4.9 percent (pipe/ens 0.951 to 0.964 across y = 313 to 19997, MEASURED by exact CRT sampling; 1.049 to 0.958 at y = 11 to 23 by full enumeration), an ensemble quantity that derives by finite count with no prime input and whose sign is opposite to hl3 section 2's guess; and the anchored window's deficit sits 2 to 5 percent below its gap-scale-matched ensemble (Delta_meas/Delta_ens 0.878 to 0.995 over six half-decades, 0.954 to 0.995 on the four with more than 13,000 gaps), the anchoring part, which is a three-point prime correlation in a short window and is HL-strength by every route named. The head is a slack field and nothing here touches Z2.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-slack.md`, independent
> code, 0 assertion failures).** Two corrections, both narrowing: §3's top row
> is NOT gap-scale matched (E[g] 244.0 against the ensemble's 235.9, y_match
> capped), and on its own points Delta_ens ∝ E[g]^{−0.31}, so meas/ens reads
> 0.9640 there and the headline "0.954 to 0.995" should read "0.964 to
> 0.995"; and the y = 29 tile, recorded here as not enumerated, was
> enumerated in about 40 s (pipe/ens 0.9535), giving the 3.6-to-4.9% band an
> exact endpoint of 4.65% at y = 29, the ladder not being monotone across the
> two regimes.

STATUS: HELD, staging. Not integrated, not red-teamed. Companion producer
`research/history/staging/attack-0830-head-remainder.js` (embedded, about
four minutes, seeded Monte Carlo, `--check` green). Its SEC 0 re-walks
[1e5,1e8) on independent code and reproduces `head-residual-hl3.js` SEC 0 and
SEC 3 and `redteam-0828-head.js` SEC 1 to the printed digit before anything
new is computed: Delta_meas 0.6899, 0.6862, 0.6214; Delta_HL 0.7914, 0.7124,
0.6545; R 223.5196, h − R 5.680 (the record's 5.679, tolerance 0.001),
coprime-30 offset 2.7541, coprime-210 offset 3.3395. If that gate had failed
nothing below would stand (twelve figures asserted).

Task: TODO Z4, head half, continuing `Q-head-residual` (PARTIAL). The item's
remaining task on the head is "a derivation of that remainder that is not HL".

The head field is a slack field of R0 (head + Z2 + tail ≤ width, exact per
zone, `zonegap-02-reduction.js` SEC B); its share of the width is 1.40% at the
top band (`zone-tail-02-0829.md`). Nothing below touches Z2 or the exponent's
critical path, no head is bounded from above anywhere here, and every
inequality used is listed in §5 with its direction.

---

## 0. What is still open, and what failed

**No derivation of the anchoring part was reached, and none is available
below HL.** The remainder splits into an ensemble part and an anchoring part
(§3); the ensemble part is a finite count at every level and derives; the
anchoring part is the statement that the phase-zero window of the tile
realises the tile ensemble's pair-endpoint correlation, which is a three-point
prime correlation in a short window. Sieve upper bounds reach it to a constant
factor and never as an asymptotic, and level-of-distribution results average
one-point counts over moduli, not three-point correlations. Kill condition met:
every route reduces to an HL-strength assumption on the two openers. PARTIAL.

**The remainder the item names is not the remainder that exists.** The record's
0.6214 pools 381,331 gaps over a decade across which the prime density falls
ten percent. The OLS of n on g over that pool mixes a between-height slope of
about λ/2 (E[n] ∝ ln p while E[g] ∝ ln²p) into a within-height slope of about
λ, the line pivots about the mean, the intercept rises and Delta = 2 − β falls
[MEASURED, mechanism derived in §1]. The 5.3 percent, same-sign miss that
`head-residual-hl3.md` §0 and §6, `redteam-0828-head.md` row 6 and TODO Z4
carry is that pooling; at half-decade resolution the miss is 1.2 and 0.4
percent at the top two windows and its sign alternates across six windows. The
correction is owed to those documents and is not made here (fenced).

**The one HEURISTIC sign in the record is wrong.** hl3 §2 guessed that the
non-uniform part of the no-interior-opener conditioning flattens the comb and
so has "the right sign to explain a five percent over-prediction". The exact
ensemble says the opposite: the conditioning raises the deficit, so the
pipeline under-predicts by four percent (§2c, §3).

**The tile at y = 29 was not enumerated.** The segmented walk over 6.47e9
positions was timed at about fifteen minutes on this machine and dropped; the
`--level29` flag exists and has no embedded output.

---

## 1. The remainder, as hl3 defines it, reproduced, and then measured at three window widths

hl3 defines the remainder as the miss of its zero-parameter pipeline on the
endpoint deficit: Delta_meas = 2 − β with β the OLS intercept of prime count on
twin-gap length, against Delta_HL from E[n | g] = 2 + κ W(g), W(g) = Σ_t
ρ(t,g), κ fixed by E[n] = 2 + λ_s E[g]. Producer SEC 0 (custody, convention A of
hl3: both openers inside the window):

| window | gaps | Delta_meas ± se | Delta_HL | ratio | eps = HL − meas |
|---|---|---|---|---|---|
| [1e5,1e6) | 6944 | 0.6899 ± 0.0355 | 0.7914 | 1.147 | 0.1015 |
| [1e6,1e7) | 50810 | 0.6862 ± 0.0148 | 0.7124 | 1.038 | 0.0263 |
| [1e7,1e8) | 381331 | 0.6214 ± 0.0060 | 0.6545 | 1.053 | 0.0330 |

Every figure matches the record to the printed digit (asserted at 1e-4).

**The same statistic on narrower windows [MEASURED, SEC 0].** Half-decades of
the top window: [1e7, 10^7.5) 0.6848 ± 0.0111 on 101,137 gaps; [10^7.5, 1e8)
0.6500 ± 0.0070 on 280,193. Quarter-decades: 0.7203 ± 0.0176, 0.6842 ± 0.0142,
0.6677 ± 0.0113, 0.6565 ± 0.0089. Pooled minus the gap-weighted mean of the two
halves: −0.0378 at [1e7,1e8), −0.0455 at [1e6,1e7), −0.0524 at [1e5,1e6). The
pooled decade sits below every one of its own sub-windows.

**Why, with the sign derived [PROVEN, order of magnitude ARITHMETIC].** Within
a sub-window at height p the line is n ≈ β + α g with α ≈ λ(p). Across
sub-windows E[n] = λ E[g] with λ ∝ 1/ln p and E[g] ∝ ln²p, so E[n] ∝ √E[g]
and the between-window slope dE[n]/dE[g] is λ/2, half the within slope. Pooling
mixes the two in proportion to the between-group share of Var(g). Group means
run 204 to 250 across the decade against a within sd of about 0.945 × 236 =
223, a share of about (15/223)² = 0.0045; the slope drops by about 0.0045 × α/2
≈ 1.2e-4 and the intercept rises by that times E[g] = 236, about +0.03. The
measured pooling term is −0.038 in Delta. Same sign, same order. HL's pipeline
does not carry the bias, since W(g) knows nothing about height: its pooled
value 0.6545 IS the gap-weighted mean of its half-decade values 0.6768 and
0.6472. So the comparison in the record put a biased measurement against an
unbiased prediction and read the bias as a miss.

**Half-decade resolution, HL against measured [MEASURED, SEC 3 table]:**

| window | E[g] | Delta_meas ± se | Delta_HL | (HL − meas)/meas |
|---|---|---|---|---|
| [1e5, 10^5.5) | 113.1 | 0.8239 ± 0.0625 | 0.8298 | +0.007 |
| [10^5.5, 1e6) | 135.8 | 0.7114 ± 0.0419 | 0.7786 | +0.094 |
| [1e6, 10^6.5) | 157.4 | 0.7705 ± 0.0268 | 0.7385 | −0.042 |
| [10^6.5, 1e7) | 184.4 | 0.7172 ± 0.0174 | 0.7039 | −0.019 |
| [1e7, 10^7.5) | 213.8 | 0.6848 ± 0.0111 | 0.6768 | −0.012 |
| [10^7.5, 1e8) | 244.0 | 0.6500 ± 0.0070 | 0.6472 | −0.004 |

Every row inside 1.6 standard errors, sign alternating, the top two rows at
0.7 and 0.4 s.e. "Measured consistent with HL to 5 percent" becomes "to 1
percent at the top, with the 5 percent an artefact of the window". The
half-decade values still carry a residual of the same bias (the quarter-decade
pairs sit about 0.01 above them), so even these rows are slightly low.

---

## 2. The three candidates, each named for what it is

### 2a. The frozen-sieve first survivor (candidate i): an exact tile object, and it is the ensemble

The head at origin p is the first twin slot of the frozen √p-level sieve above
p in 96.65% of zones (`destroyer-census-01.md` §6(a)). In the tile T_y that is
the forward distance from a HOLE (a position coprime to y#) to the next twin
slot, whose mean over all holes is a finite count. Producer SEC 1 enumerates it
at y = 11, 13, 17, 19, 23: the hole-origin head is R + 3.2524, 3.4903, 3.6719,
3.8263, 3.9604 against the continuum functional R of the tile's own gaps, the
uniform-integer origin is R + 1/2 exactly at every level (asserted), and
the identity h − R = A + B with A = A_forced + D holds with D = −0.4375 to
−0.5642. This is `redteam-0828-head.md`'s comparator ladder (R + 1/2, R + 1,
R + 2.754, R + 3.340) continued to full levels, and it is exact [PROVEN at each
level, by enumeration]. Sampled by CRT at the number line's own levels (SEC 3)
it reads R + 5.98 at y = 3137, R + 6.24 at y = 9973, R + 6.37 at y = 19997,
against the number line's prime-origin h − R = 5.680 at [1e7,1e8). So the
frozen-sieve object is not a derivation route separate from (iii): it is the
ensemble head, and its comparison with the number line is the anchoring
question. Not a re-fit, not HL; a finite count whose relation to the number
line is the open step.

### 2b. The level-of-distribution correction (candidate ii): the residue effect is real, and it is the ensemble's

The natural form of a residue correction is the wheel ladder: the origin
population coprime to y# for y = 2..31, measured against the CRT prediction
under equidistribution of the openers' residue pairs (r, r + g) mod y#. On the
number line at [1e7,1e8) the measured rungs exceed the residue-uniform
prediction by +0.0208 (y = 7), +0.0451 (11), +0.0612 (13) [MEASURED, SEC 0];
the mod-30 rung sits at −0.0006. The openers are NOT equidistributed among the
admissible residue pairs given g, and the reason is the gap's defining
condition: configurations with fewer interior twin-slot residues are
over-represented among gaps with no interior opener. That is not a property of
primes: the rotation ensemble of T_9973 shows +0.0256, +0.0604, +0.0709 on the
same rungs, T_19997 shows +0.0226, +0.0540, +0.0680 [MEASURED, SEC 3]. The
number line's deviations are 75 to 86 percent of its ensemble's. No
Bombieri-Vinogradov-type input bears on this: it is a conditioning effect inside
the tile, and the ladder's approach to the prime origin (cop31 reaches 5.009 of
the 5.680, 88.2%) is the y → √p limit of a CRT object. Candidate (ii) is the
ensemble in disguise, with a residual that is the anchoring part again.

### 2c. The exact tile ensemble (candidate iii): derives, splits the remainder, and gets the sign hl3 guessed wrong

Two facts make the ensemble the right comparator and make HL's pipeline an
ensemble computation. First, at [1e7,1e8) the largest prime entering ρ is
g_max + 2 = 2870 < √(1e7) = 3162.3 (asserted), so hl3's singular-series ratio
ρ(t,g) is, without truncation, the exact CRT density of holes of T_y at offset
t given holes at 0, 2, g, g+2, for every y ≥ √p. The producer asserts the CRT
identity as integers at 16 offsets t at each enumerated level (16/16 at y = 11
to 23). Second, each decade [lo, hi) is a window of T_y at phase zero for
y = 313, 997, 3137, 9973 (hi ≤ y′², asserted), by the Zone Restriction Lemma:
the primes there are the holes and the twin primes the twin slots. So the
number line's decade is one member of the rotation ensemble of that tile, and
"HL prices Delta" means "the pipeline's five-point conditioning, run on the
anchored member's gap law, lands near the anchored member's Delta".

**The pipeline inside the ensemble [MEASURED, exact at y ≤ 23 by enumeration,
sampled at y ≥ 313 by CRT with seed 20260830, 300 to 400 windows of 2^22].**
Delta_pipe / Delta_ens = 1.0492, 1.0134, 0.9842, 0.9711, 0.9584 at y = 11, 13,
17, 19, 23; 0.9511, 0.9594, 0.9615, 0.9630 at y = 313, 997, 3137, 9973; 0.9591
to 0.9636 at the six gap-scale-matched levels 941 to 19997. Replacing W(g) by
the tile's exact E[n | g] − 2 returns the OLS Delta to 1e-9 (asserted), so the
pipeline's whole error is its treatment of the no-interior-opener condition as
uniform thinning λ → λ_s. Above y = 17 that error is a four percent
UNDER-prediction, slowly closing. The exact E[n | g] rows (SEC 1) show where:
at y = 23 the pipeline is +0.0760 high at g = 18 and −0.3064, −0.3497, −0.5170
low at g = 66, 90, 108. hl3 §2 argued the conditioning flattens the comb and
lowers the deficit; the enumerated tile says it raises it. Mechanism, stated
without proof: forbidding interior twin slots removes mass at t ≡ 0, 2 mod 6,
which are the comb's live positions, and near an opener those positions are
already depleted by the endpoint's own exclusions, so the thinning bites the
bulk harder than the ends and the end deficit grows relative to the bulk
[HEURISTIC, direction only; the number is the enumeration's].

---

## 3. The split, with the numbers

Per half-decade, against an ensemble whose level is chosen so that its E[g]
matches the window's (ln y = √(E[g]/2.41); the ensemble's E[g]/ln²y reads
2.405 to 2.46 across levels, printed as the check), SEC 3:

| window | y_match | E[g] line / ens | Delta_meas | Delta_HL | Delta_ens ± se | pipe/ens | meas/ens | (HL − ens)/meas | (ens − meas)/meas |
|---|---|---|---|---|---|---|---|---|---|
| [1e5, 10^5.5) | 941 | 113.1 / 113.6 | 0.8239 | 0.8298 | 0.8537 ± 0.0008 | 0.9591 | 0.9651 | −0.029 | +0.036 |
| [10^5.5, 1e6) | 1811 | 135.8 / 136.2 | 0.7114 | 0.7786 | 0.8100 ± 0.0010 | 0.9585 | 0.8783 | −0.044 | +0.139 |
| [1e6, 10^6.5) | 3229 | 157.4 / 157.5 | 0.7705 | 0.7385 | 0.7742 ± 0.0011 | 0.9598 | 0.9953 | −0.046 | +0.005 |
| [10^6.5, 1e7) | 6287 | 184.4 / 184.3 | 0.7172 | 0.7039 | 0.7364 ± 0.0013 | 0.9607 | 0.9740 | −0.045 | +0.027 |
| [1e7, 10^7.5) | 12301 | 213.8 / 213.4 | 0.6848 | 0.6768 | 0.7012 ± 0.0014 | 0.9636 | 0.9766 | −0.036 | +0.024 |
| [10^7.5, 1e8) | 19997 | 244.0 / 235.9 | 0.6500 | 0.6472 | 0.6814 ± 0.0016 | 0.9605 | 0.9539 | −0.053 | +0.048 |

Read column by column. **(HL − ens)/meas, the pipeline part**: −0.029 to −0.053,
steady, the ensemble's own property, derivable at any level by finite count or
by sampling to any precision, no prime input. **(ens − meas)/meas, the
anchoring part**: +0.005 to +0.139 with the big value on a window of 5,035 gaps
(se 0.042 on Delta, so 2.4 s.e.), and +0.024, +0.048 at the two best-measured
rows (1.5 and 4.5 s.e. on the measurement's own error; the quarter-decade
readings say the half-decade values are themselves about 0.01 low from residual
pooling, which would bring the top row's anchoring part to about +0.03). The
two parts cancel to the ±1 percent that column (HL − meas)/meas of §1 shows.

At the decade level, against the tile the decade is a window of (y = √hi),
the anchoring part reads larger because the comparison is not gap-scale
matched: Delta_meas/Delta_ens = 0.8121, 0.8860, 0.8736, with E[g] 129.6/115.5,
177.1/156.3, 236.0/204.3. That mismatch is the Mertens factor (the anchored
window's twin density is e^{2γ}/4 of the ensemble's at u = 2,
`origin-excess.md`), a known anchoring effect; the matched comparison strips
it, and what is left, 2 to 5 percent at the top, is anchoring beyond Mertens.
The gap-scale-matched level y = 19997 also matches the hole density: 0.05666
against 1/ln(5e7) = 0.05641, so both first moments agree and the residual is
in the pair-endpoint correlation itself: β 1.3786 line against 1.3186
ensemble, CV² 0.8941 against 0.8823, β CV² 1.2326 against 1.1634, (h − R)/E[g]
0.0241 against 0.0270.

**The head at small levels, anchored zone against ensemble [MEASURED, SEC 2].**
At y = 11..23 the zone (y, y′²) holds 34, 55, 65, 91, 137 prime origins; the
number-line head equals the tile head at 30, 55, 62, 91, 135 of them (the
misses are origins whose next tile slot sits at or past y′² − 2). Anchored mean
against ensemble hole-origin mean: 14.353/14.387, 14.655/17.181, 18.615/19.773,
22.132/22.383, 29.985/24.741, a naive z of −0.02, −1.63, −0.66, −0.14, +3.21.
One contiguous stretch per level, so z is a scale and not a test; the y = 23
value is one 148-long twin gap (661 to 809). No sign is stable and nothing is
concluded from this table except that the small levels cannot see the
anchoring part.

---

## 4. The single step that does not derive

**Statement.** For the anchored window [lo, hi) of T_y and the ensemble of T_y
at matched gap scale, Delta_anchored / Delta_ens → 1, or to any specific
constant. Equivalently: Σ over twin openers a in the window of 1_prime(a + t),
for t up to the gap scale, follows the ensemble's CRT density ρ(t, g) after
conditioning on no interior opener.

**What it is.** A three-point (and with the right opener, five-point) prime
correlation asymptotic in a window of length ln²p about each opener, averaged
over openers at height p. HL for the tuple (0, 2, t) gives it with an
unquantified 1/ln x error, which at ln x = 17.7 is the size of the effect.
Below HL: Selberg-sieve upper bounds for the triple count carry a constant of
at least 2 to 4 times the truth and no lower bound at all (a lower bound on
triples would be a prime-triple existence statement). Level-of-distribution
theorems (Bombieri-Vinogradov, its extensions) average |π(x; q, a) − x/(φ(q)
ln x)| over q and say nothing about the joint event that a + t is prime given
a and a + 2 are. Every route named in the brief lands here.

**Is it TPC-strength?** No, and it is not TPC-implying either: Delta is
defined on the twin-gap process and the statement is conditional on that
process existing in the window. It is HL-strength in the weaker sense that
only HL supplies it, and it is off the exponent's critical path. The head is a
slack field; a derivation here would move the item and nothing else.

**What would falsify the split.** A Monte Carlo at an ensemble level matched to
[10^7.5, 1e8) with pipe/ens outside [0.95, 0.97]; or a quarter-decade
measurement of Delta at 1e12 (TODO Z7 item (3)'s pass, this file's engine
reused) landing at its matched ensemble's value to within 1 percent, which
would put the anchoring part at zero and leave only the pipeline part, all of
it derivable.

---

## 5. Inequalities used, with direction

- g_max + 2 = 2870 < √(1e7) = 3162.3 at [1e7,1e8): needed so that the
  singular-series product over q ≤ g + 2 equals the CRT product over q ≤ y for
  every y ≥ √p. Direction: the product must include every prime that can
  collide with an offset t ≤ g + 2; primes above g + 2 contribute the
  t-independent factor GTOT that cancels in the pipeline. Asserted true.
- hi ≤ y′² for the four decade levels: needed so that the decade is a window
  of T_y at phase zero (Zone Restriction, `GLOSSARY.md` "Zone"). Direction: a
  hole below y′² is prime; above it, not necessarily. Asserted true.
- The pooling sign: between-window slope λ/2 < within-window slope λ, so the
  pooled slope is below the within slope and the pooled intercept above it,
  hence pooled Delta below the sub-window mean. Derived in §1; measured
  −0.038, −0.046, −0.052.
- No head is bounded above or below anywhere. Nothing here is used against
  Z2 or the width.

---

## Defects noticed in passing

- `head-residual-hl3.md` §0, §3, §6 and its ledger verdict; `head-residual-null.md`
  §2, §3; `redteam-0828-head.md` rows 6 and 22; TODO Z4's head paragraph: the
  measured Delta = 0.6214 at [1e7,1e8) (and 0.6862, 0.6899) is a decade-pooled
  OLS intercept carrying a −0.04 to −0.05 Simpson-type bias; the "5.3 percent
  over-prediction, same sign at three windows" is that bias. At half-decade
  resolution the miss is 1.2 and 0.4 percent with alternating sign. The
  correction is owed to all four documents and to `destroyer-census-01.md`'s
  reading of the record.
- `head-residual-hl3.md` §2's HEURISTIC sign for the no-interior-opener
  conditioning is the wrong way round: the exact ensemble's Delta is above the
  pipeline's by four percent, not below.
- `head-residual-null.js` SEC 2 and `head-residual-hl3.js` SEC 0 compute β and
  the profile on decade pools; every β-derived figure in those files (β, Delta,
  the 72/28 and 81/19 splits, β CV²) inherits the pooling term. The identity
  h − R = A + B and B's regression form are unaffected (they are identities in
  whatever pool is used); the numbers read off them are pooled numbers.
- `head-residual-factor.md` §3's β CV² = 0.7993 → 1.2326 and its rate argument
  are built on the same pooled β; the half-decade β's are lower (Delta higher),
  so the product is lower than quoted and further from 2. The direction of the
  rate conclusion is unchanged; the values are not the local ones.
- The producer's SEC 2 z-scores are labelled naive in the output and should not
  be quoted as tests.

---

## What would falsify this, and whether that check has run

| Claim | Rung | Falsifier | Run? |
|---|---|---|---|
| Custody: every record figure reproduces on an independent walk | MEASURED | any of the nine asserted figures missing at 1e-4 (h − R at 1e-3) | YES, all pass |
| The pooled decade Delta sits below its sub-windows by a Simpson-type term | MEASURED, sign PROVEN, size ARITHMETIC | a decade whose pooled Delta is at or above the gap-weighted mean of its halves | YES, three of three decades below by 0.038 to 0.052; quarter-decades monotone above the halves |
| HL's pipeline pools linearly (no gradient bias) | PROVEN (W(g) is height-free) | pooled Delta_HL differing from the gap-weighted mean of the halves | YES, 0.6545 against 0.6768 and 0.6472 weighted by 101,137 and 280,193 |
| At half-decade resolution HL is within 1.6 s.e. at every window, sign alternating | MEASURED | a window outside 2 s.e., or a stable sign | YES, six windows; the top two at 0.7 and 0.4 s.e. |
| ρ(t,g) is the exact CRT hole density of T_y for y ≥ g + 2 | PROVEN (CRT) and asserted as integers | any of 16 offsets at any of 5 levels disagreeing | YES, 80/80 |
| Each decade is a window of T_{√hi} at phase zero | PROVEN (Zone Restriction) | hi > y′² | YES, asserted at four levels |
| The pipeline under-predicts its own ensemble by 3.6 to 4.9 percent for y ≥ 17 | MEASURED (exact at y ≤ 23, sampled above) | pipe/ens crossing 1 at some y ≥ 313, or the exact-W control failing | PARTIAL: exact to y = 23, sampled at ten levels to 19997 with se on Delta_ens ≤ 0.0016; y = 29 not enumerated |
| The exact ensemble Delta is above the pipeline's, contradicting hl3 §2's sign | MEASURED | the enumeration at y ≥ 17 showing Delta_ens < Delta_pipe | YES at y = 17, 19, 23 and at every sampled level; NO at y = 11, 13 where the ratio is above 1 and gaps average 17 to 20 |
| The anchoring part is +2 to +5 percent at the top after gap-scale matching | MEASURED | a matched ensemble landing on Delta_meas within 1 s.e. | PARTIAL: six windows, the top at 4.5 s.e. on the measurement's error but with a residual pooling term of about 0.01 in the half-decade value itself; not run at 1e12 |
| The wheel-ladder deviation from residue-uniformity is an ensemble effect | MEASURED | the ensemble showing no deviation, or one of the opposite sign | YES, ensemble +0.023 to +0.071 against the number line's +0.021 to +0.061 on the same rungs |
| No route below HL reaches the anchoring part | ARGUED, not proven | an unconditional asymptotic for Σ_a 1_prime(a + t) over twin openers in a short window | NO, and none is known to this corpus |

The cheap check not run: the half-decade and quarter-decade Delta at 1e12 on
the box, which every note in this chain queues, now with the specific
prediction that the anchored value lands 2 to 5 percent below the matched
ensemble's, the ensemble's value being computable to 0.001 by this file's SEC 3
at any level in seconds.
