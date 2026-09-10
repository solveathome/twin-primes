# The single-alignment recursion for M(x, x³): measured, decomposed, and where it closes

<!-- ledger
id: Q-single-alignment
status: CLOSED
todo: 0d (retired)
question: Does the head's single-alignment fold recursion for M(x, x^3) give a proven-shaped handle on the per-fold multiplier that the max-over-alignments recursion lacked?
verdict: The answer splits: the multiplier IS different in shape, measured - exactly 1 at 225 of 240 folds from x = 53, total spend 1.09 nats against a tile-shaped ladder's 7.12, measured M(1613) = 2220 against a tile-shaped 3.7e5 - but the route to a growth law through the recursion closes anyway, because the growth is initiated by the window's expansion into fresh ground, a boundary term that is the localized gap problem re-posed and that no fold reaches.
-->

*(2026-08-17. TODO 0d's first move, executed. Calibration marked throughout:
PROVEN, VERIFIED, MEASURED, REFUTED, PREDICTED-AND-REFUTED. Script:
`research/localized-single-alignment.js` — predictions were written into the
script and frozen before the first run; two of the five were refuted and are
reported below with the confirmations. Deepest run: x = 1613, window
Y = 4.20·10⁹, 240 measured folds, 36 s.)*

## 1. The verdict

The route asked whether the head's fold recursion — single-alignment, because
copy 0 receives only a = 0 — gives the per-fold multiplier a proven-shaped
handle the max-over-alignments recursion lacked. The answer splits, and both
halves matter:

**The multiplier IS different in shape, decisively (MEASURED).** The
fixed-window multiplier is exactly 1 at 225 of the 240 folds from x = 53. Its
total spend over the ladder is 1.09 nats against the 7.12 nats a tile-shaped
`ln c ≈ 2 ln p / p` ladder would spend; a tile-shaped M(1613) would be
3.7·10⁵, and the measured value is **2220**. The "different shape" premise of
TODO 0d is confirmed, not refuted.

**And the route to a growth law through the recursion CLOSES anyway.** The
object's growth is initiated, at every record of the deep ladder, by the
window's own expansion into fresh ground — a term the tile recursion never
had, because the tile's new territory is p aligned copies of the old tile
while the head's new territory is genuinely new. The boundary term is not a
fold statement at all: it is the localized gap problem at the new scale,
re-posed. A fold recursion cannot bound the object whose growth happens where
no fold reaches. This closure is forced in the following sense: any window
that must grow with x carries the boundary term, and the window of M(x, xᵏ)
must grow with x by definition.

What survives is two countable laws (§6) and a compute observation (§8).

## 2. The object and the statement, precisely

Definitions exactly as `localized-01-ladder.js`: rough[r] = 1 iff r has no
prime factor ≤ x (all primes folded, 2 and 3 included); a twin slot is r with
r and r+2 both rough; M(x, Y) is the largest gap between consecutive twin
slots whose left endpoint is < Y, straddle included. This note takes Y = x³,
the smallest k at which the head is neither frozen (Impact Lemma: [0, p²) is
untouched) nor crystallised (the standing caveat: at k = 2 the slots are twin
primes and everything is TPC-hard by construction).

**Single-alignment (PROVEN, trivial once said).** For x ≥ 11, x# > x′³, so
the whole window [0, x′³) lies inside copy 0 of the fold by p = x′, and the
kills in it are exactly the twin slots r ≡ 0 or −2 (mod p): one deterministic
2-set, no maximum over p alignments. The honest per-fold decomposition is

> M(x′, x′³) = max( M(x′, x³) , boundary term ),

where M(x′, x³)/M(x, x³) is the single-alignment multiplier and the boundary
term is the largest gap with left endpoint in the fresh ground [x³, x′³).
The window GROWS under the fold — the tile recursion never had this term, and
it turns out to be the story.

## 3. Predictions on record, and what the measurement said

Registered in the script before any run; the runs did not edit them. Controls
first, per the house rule: the incremental engine was verified against a
from-scratch full scan at x = 61, 307, 1009, 1289, 1613 (C1), against the
independent engine `localized-01-ladder.js` at M(307) = 870 and M(491) = 990
(C2), and against FOLD-PROFILE §12b's tile-computed kill counts 33, 41, 63 at
p = 19, 23, 29 (C3). **All controls passed on every run.**

| # | prediction | outcome |
|---|---|---|
| P1 | M/ln³x flat in [3.6, 4.8] to x = 1289 | **REFUTED as stated** — climbs to 6.41 (x = 739), falls back to 5.51 (x = 1613); see §5 |
| P2a | tile-shaped multiplier would give M ≈ 2.4·10⁵; refutable by two orders | **REFUTED as predicted**: measured 2220 |
| P2b | lifetime budget 3 ln(ln x₁/ln x₀) ≈ 1.8 nats, ~3/p per fold, a factor (2/3)ln p tighter than the tile's | **CONFIRMED**: spend 2.001 nats vs budget 1.862 — 107%, no slack |
| P3 | kills in [0, p³) = c_K·p²/ln²p, c_K ∈ [0.6, 1.1] flat | **CONFIRMED**: c_K ∈ [0.778, 0.852] over 240 folds, mean 0.807, thirds 0.812/0.803 |
| P4 | boundary carries ≥ 2/3 of record increments by count and nats | **REFUTED as registered** — kills are co-equal: 12 KILL events (0.993 nats, 42%) vs 9 BOUNDARY (1.394 nats, 58%); by count kills lead 12 to 9 |
| P5 | a record-moving fusion contains 1–3 kills, never more | **CONFIRMED**: exactly 1 at every event from p = 19 on (2 at p = 7, 17) |

## 4. MEASURED: the ladder

x = 5 to 1613, window x³ to 4.20·10⁹, 253 folds, every fold recorded.

| quantity | reading |
|---|---|
| M(1613, 1613³) | 2220 (all controls passed; record at r = 397,901,681) |
| folds moving M at all | 21 of 253 |
| fixed-window multiplier = 1 exactly | 238 of 253 folds (225 of 240 from x = 53) |
| M/x² | falls monotonically, 0.107 (53) → 0.00085 (1613) |
| m̄ | 2.39 ln²x at the top, the standing law |
| total spend from x = 53 | 2.001 nats = 45% fixed-window + 55% boundary |
| kill census c_K = kills·ln²p/p² | 0.807 ± 0.04 over the whole ladder, no trend |

The per-fold cost question — is the damage countable? — has a
clean yes for the CENSUS: the kill count in [0, p³) is deterministic given
residues, measured at 0.81·p²/ln²p dead flat, exactly the density
prediction, with the elementary cap 2·rough(p²) ≈ 1.1·p²/ln p one log above
(every kill is p·t or p·t−2 with t p-rough, t < p²). Converting the census to
gap damage is where the old difficulty reappears: a kill's damage is the size
of the adjacent gap, which is M-like, and the doubling guess M → 2M is
already REFUTED (TODO 0b's ledger).

## 5. The P1 refutation, located

M/ln³x does not stay in the registered band. It is 4.63 at x = 307, 6.41 at
739, 6.34 at 1151, 5.51 at 1613. The excursion is one event, not a trend: the
patch born at r = 397,901,849 carries the whole overshoot, and the 76 folds
after x = 1151 add nothing while ln³x catches up. The frame the repo actually
states the law in survives: with M = c·m̄·ln(Y/m̄) (maxgap-law §4), c reads
0.81, 0.86, 1.12, 1.09, 0.98 at x = 61, 307, 1009, 1289, 1613 — inside
maxgap-law's measured off-diagonal surface range 0.74 to 1.17. So the crude
ln³ constant is the wrong frame; the surface law is intact, and the correct
statement stays: **M(x, x³) is polylog in x with an event-lumpy constant; a
decade of new ground did not bend the law and did not settle the constant.**

## 6. The mechanism, from the event log

Every increase of M over 253 folds, typed by cause (28 events). The deep
ladder's records are ASSEMBLED, in two moves:

1. **Birth, by boundary.** p = 739 creates the record patch at
   r = 397,901,849 — inside the strip [719³, 739³) added by that very fold —
   jumping 1266 → 1848 (0.379 nats, the largest single event on the ladder).
2. **Finish, by single kills.** p = 997 fattens the same patch to 2052 and
   p = 1151 to 2220, one kill inside the record gap each time.

This is the same assembly mechanism U-FRAME §7 found at the top of the tile
ladder ("the last three folds did not extend the old maximum but assembled a
fresh one"), now visible in a controlled window with the cause of each move
typed. The misalignment principle, spent at last: with the max over
alignments gone, the a = 0 fold behaves like a typical alignment — kill
census at the density level, record touched a dozen times in 253 folds — and
that is the saving. It is real (two orders of magnitude against the tile
shape) and it lands on the minority share of the growth.

## 7. Why this closes the route, and what would reopen it

The chain the route hoped for was: bound M(x′, x³)/M(x, x³) by something
countable (it is: §4), re-base every fold to escape NFP (it does: no
accumulating index anywhere above), conclude a growth law for M. The
measurement says the conclusion does not follow, because 55% of the nats and
the birth of every deep record sit in the boundary term, and the boundary
term is the original problem: the largest gap of the CURRENT sieve on fresh
ground of width ~x³, which is M's own extreme-value question at the same
scale. The recursion reduces M to itself plus a countable correction. That is
a relocation with a smaller remainder than any previous chain in this branch
— the correction really is countable, which no tile chain achieved — but the
remainder is still the whole problem.

Reopen conditions, stated so they are checkable: (i) a direct bound on
fresh-ground extremes — max twin-slot gap of T_x in [x³ − w, x³) for w ~ x³ —
that does not route through G₂; that is not a fold statement and it is where
this measurement says the object lives. Or (ii) the Merge Lemma's gate
M ≤ (p−2)/4 turning on, which at k = 3 happens near x* ≈ 2.4·10⁴ — see §8.

## 8. Compute, and the reach

Cost observed: x = 1613 (Y = 4.20·10⁹, 4.2 GB flat array): 36.2 s. x = 1289
(2.1 GB): 16.0 s. Control x = 307: 0.3 s. Node v22, single thread. The flat
Uint8Array engine caps at Y < 2³²; past that the segmented walk of
maxgap-law.md is needed. At this cost per decade, the k = 3 regime where the
Localized Merge Lemma's own gate turns on — x* ≈ 2.4·10⁴, Y ≈ 1.4·10¹³,
called "out of computational reach by four decades" in LOCALIZED-GAP §3 — is
roughly single-thread days of a segmented version, not impossible. Whether it
is worth the days is a different question: inside the gate the merge chain
still dies on the Deficit Lemma, which is alignment-blind, so the gate regime
would sharpen §6's forensics, not revive the chain.

## 9. Reproduction

```
node research/localized-single-alignment.js 307    # 0.3 s control, all values known independently
node research/localized-single-alignment.js 1289   # 16 s, 2.1 GB
node research/localized-single-alignment.js 1613   # 36 s, 4.2 GB  (the run quoted here)
```

Custody: M(307) = 870 and M(491) = 990 reproduce `localized-01-ladder.js`
digit for digit; kills 33/41/63 at p = 19/23/29 reproduce FOLD-PROFILE §12b's
tile-side computation; the incremental record equals a from-scratch full scan
at five checkpoints on every run.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
