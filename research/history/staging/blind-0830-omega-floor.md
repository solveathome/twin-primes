# The derived floor-growth law Ω ≫ z^{16s/9}/ln⁸z put to a sealed blind test: custody of both objects, a forecast of the local slope written before the run, the exact floor to z = 113 and the certified family to z = 1e9, scored

<!-- ledger
id: Q-omega-floor-blind-0830
status: ANSWERED
todo: 0
question: Does the local log-slope of the pointwise floor Omega(z) of attack-0830-rec-cheapest.md (exact to z = 73, certified 2+4-chain family to z = 5e5), extended blind to new levels under a sealed forecast, behave as the DERIVED growth law Omega >> z^{16s/9}/ln^8 z predicts at s = 2.698721, and at what z would the test be decisive?
verdict: MEASURED, blind, on the derived law only: 18 of 22 sealed rows HIT; the certified 2+4-chain family at p* = (47, 43) runs 5e5 -> 1e9 (A1A2 = 8.863e17 -> 9.351e32, exact integers) with its step slope falling 4.85 -> 4.38 through every sealed band onto the law's log-corrected slope, the decisive decade 1e8 -> 1e9 reading 4.410 against 16s/9 - 8/ln z = 4.389 (HIT, kill rule not triggered at 4.452 +/- 0.011); the 4 MISSes are the ratio to z^{16s/9}/ln^8 z sitting at 2.00-2.14 above the sealed cap of 2 at z >= 1e8, the pre-declared non-adverse direction; the exact floor is extended 73 -> 113 (251 -> 1980, equal to the hill-climb floors at 89 and 101), where the law predicts nothing; no exponent moves and the law stays DERIVED and HELD.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-floor-growth.md` §4).**
> This test measures the CONSTRUCTION's own count, not the growth law: the
> family whose slope is scored is the one the derivation builds, so its
> construction fixes the growth being tested. The ten HIT rows are therefore
> a consistency check on the count and are not evidence for the law, and any
> live sentence quoting them as "the growth law survived a blind test" is
> wrong. TODO item 0 is corrected accordingly.

*(2026-08-30, staging. HELD like every staging note. Producer, formally
embedded, two tails: `research/history/staging/blind-0830-omega-floor.js`
(tail 1 `--stage seal`, bound before any new level was computed; tail 2
`--stage run`). Calibration per claim: PROVEN, VERIFIED (exact computation),
MEASURED, HEURISTIC, DERIVED (a written argument not adversarially checked),
OPEN, REFUTED. Every figure below sits in one of those two tails or is quoted
from the embedded OUTPUT block of
`research/history/staging/attack-0830-rec-cheapest.js` by line. No existing
file was edited; no git command was run, so the seal is by disk order and by
the producer's tail order, not by commit. This note is a measurement of the
derived law's prediction; it does not re-derive the floor, does not grade the
source note, and says nothing about REC(s, u₀) beyond what the source already
says.)*

---

## 0. What is open first

- **The law under test is DERIVED and HELD, and stays so.** The blind test
  below is consistency with its growth prediction on the family it builds:
  18 of 22 sealed rows HIT, the decisive decade 1e8 → 1e9 included (tail 2
  lines 584–609). Consistency at 1e9 is not the adversarial pass §4.2 is
  held for and does not stand in for it.
- **What the four MISSes are.** The ratio A₁A₂ / (z^{16s/9}/ln⁸z) reads
  2.00, 2.09, 2.14, 2.10 at z = 1e8, 2e8, 5e8, 1e9 against a sealed cap of
  2 (tail 2 lines 600–603): the family sits ABOVE the model, the direction
  the seal declared "not adverse to ≫" (§2). A cap of 2 was this note's
  guess at the constant, and the guess was low; nothing about the exponent
  is in those rows.
- **What the test cannot resolve.** A change of the log power by one moves
  the predicted slope by 1/ln z ≈ 0.05 at 1e9; the measured excess over the
  ln⁸ model's slope is +0.02 at 5e8 and −0.02 at 1e9 (tail 2 lines
  580–581), so the log power is pinned to about 8 ± 1 and no better, and
  whether the ratio has settled near 2.1 or has begun a slow polylog decline
  is not decidable from two points. Decisive for the power of the log would
  need a further decade at z ≥ 1e10 with the same engine (about 30× the
  cost of 1e9).
- **Unchanged from the seal.** Nothing here is
  the adversarial pass `attack-0830-rec-cheapest.md` §4.2 is held for. A
  blind HIT on a growth prediction is consistency, not proof; a MISS at
  reachable z is finite-size unless the sealed rules say otherwise.
- **Base rate, written before the run.** At reachable z the log correction
  8/ln z and the family's own turn-on dominate: the source's certified
  count sits at 0.35 of the model at z = 5e5 with a local slope of 4.99
  against the law's log-corrected 4.17 there (tail 1 SEC D, quoted rows).
  The expected outcome is a slope that falls toward the model's over the
  next decade, a test that is indecisive below z ≈ 1e7, and one decisive
  row, the decade 1e8 → 1e9, if the engine reaches it.
- **Not a verdict on REC.** Whether REC(s, u₀) is false at u₀ < 16s/9 is
  decided by the derivation, not by any count here; the counts can only
  say whether the family grows as the derivation says it grows.

---

## 1. The objects, exactly as the source defines them, and custody (deliverable a; tail 1 SEC A–C)

**Level and point.** s = 1 + √e + η with η = 0.05, s = 2.698721, u₀ = β₂ − η
= 4.216450, D = z^s, W = P(z), the source's working point (its S0). The law's
exponent at this s is 16s/9 = 4.7977 (tail 1 line 428–432; the source's S5
prints the same 4.7977).

**Object (A), the exact floor.** Ω(z) = −min_r cc(r) = max over splits
(P₁ | r, P₂ | r+2, 2 allowed in both) of A₁A₂ + A₁B₂ + B₁A₂ with A_i =
λ⁺(∏P_i) ≥ 0, B_i = −λ⁻(∏P_i) ≥ 0, the Rosser weights of level D
(source §4.1, PROVEN there; the sign facts are re-checked here as `viol` at
every level, old and new). Two engines: the source's 3^{k−1}·2 brute force,
copied verbatim, and this producer's pruned exact search (an upper bound
(A₁+B₁)·max A₂ + A₁·max B₂ over the complement, by a subset-max transform,
valid because the coefficients and the maxima are non-negative; same search
space, nothing else). **Custody: 16 of 16 source levels z = 13..73 reproduce
digit for digit on both engines** (tail 1 lines 436–452; Ω(73) = 251, 598
and 590 support elements, viol = 0 throughout). VERIFIED.

**Object (B), the certified family.** Q = primes in (47, z) split by index
parity into Q₁, Q₂; per side the exact count of exit chains of length 2 and 4
at the best p* ≤ 47 (source S4b); Ω ≥ A₁A₂ is a PROVEN lower bound there.
Two engines again: the source's triple loop, verbatim, and this producer's
reordered count (for fixed (p₃, p₄) the p₂-sum is split at the point where
the lower bound t/(p₂p₃p₄) falls below p₂; above it the term is
p₄-independent and prefix-summed once per p₃; below it the term is evaluated
in the source's own floating-point expressions). **Custody: 20 of 20
engine-rows reproduce the source's ten S4b rows digit for digit**, A₁, A₂,
both chain counts and both p* included (tail 1 lines 456–480; the z = 5e5
row reads 979017225 and 905294776), and the two engines agree at two levels
the source did not run, z = 3e5 and 4e5 (lines 476–479). VERIFIED.

**The one definitional change at new levels, declared.** Above 5e5 the
producer fixes p* = (47, 43) instead of running the greedy p* loop. The
count is monotone nondecreasing in p* (t = D/p*³ falls, the slab widens;
tail 1 line 481 shows it at z = 5e5, 0 → 979017225 across the fourteen p*),
and the source's greedy choice was (47, 43) at every level from z = 2000 on
(source lines 413–420). The new-level object is therefore the source's
family with side 1 at 47 and side 2 at 43: still a certified lower bound on
Ω, and equal to the source's value unless side 1 tied at a smaller p*.

**Levels planned (fixed in tail 1 before the run).** Exact Ω at z = 79, 83,
89, 97, 101, 103, 107, 109, 113 (k = 29 primes at z = 113; the tables are
2²⁹ × 4 Int16, 4.3 GB). Certified family at z = 1e6, 2e6, 5e6, 1e7, 2e7,
5e7, 1e8, 2e8, 5e8, 1e9. Compute rule: the source's exact engine was timed
at 27 s for z = 73 and scales 3× per prime; the pruned engine is 200× faster
at z = 73, which is what makes 113 reachable. The reordered certified engine
was timed at 1.3 s per side at z = 2e7 and scales close to z^{1.9}
(timings on stderr only, none in a tail).

---

## 2. The sealed forecast (deliverable b; tail 1 SEC D, lines 483–536)

Written before any new level ran, bound in tail 1 (code-sha edf15965…,
out-sha 3615034b…), recomputed by the same code in tail 2.

**What the law predicts, and what it does not.** Ω ≫ z^{16s/9}/ln⁸z gives a
local slope d ln Ω/d ln z of σ_model(z) = 16s/9 − 8/ln z. The log
correction is 0.61 at z = 5e5 and 0.39 at z = 1e9 (tail 1 lines 488–498),
so at these z the law predicts 4.19 → 4.41, never 4.80. The law is a lower
bound and asymptotic: no finite count can refute "≫"; what a count can test
is whether the family the derivation builds grows the way the derivation
says. For object (A) the law predicts nothing at z ≤ 113: the dyadic box of
the construction needs primes in (D^{1/9}/4, D^{1/9}/2] above a p* >
4D^{1/27}, empty below z of order 1e5, and λ⁺(P(z)) = 0 at every source
level (source S3). Object (A) is extended as custody and as a record of
the exact floor's own trend, and its rows are marked "not a law test".

**The finite-size arithmetic that shaped the bands (HEURISTIC, from the
same construction; tail 1 lines 486–500).** The family only uses primes
above 47, while the construction's small primes sit near D^{1/9}: 51 at
z = 5e5 (no usable prime), 63 at 1e6 (three), 126 at 1e7 (fifteen), 250 at
1e8 (thirty-eight), 500 at 1e9 (eighty). The share of the corner mass the
cut removes, 47²D^{−2/9} on the p₃ side and 47·D^{−1/9} on the p₄ side,
reads 0.84 and 0.92 at 5e5, 0.14 and 0.37 at 1e7, 0.035 and 0.19 at 1e8,
0.009 and 0.094 at 1e9. And the p₃ terms saturate (p₃ ≤ D^{1/9}) one by one
from z = 5.6e5 (p₃ = 53) to 1.0e8 (p₃ = 251), which is why the source's
own step slopes run 5.42 → 5.34 → 5.17 → 4.99 over 5e4..5e5 with an excess
over σ_model of 1.40 → 0.83 (lines 503–513): the family is still turning
on. The forecast is therefore a slope that keeps falling, crosses σ_model
somewhere in 1e6..1e7, and sits near σ_model from 1e8 on.

**The sealed rows (lines 515–536).**

| step ends at | σ_model(mid) | point | band |
|---|---|---|---|
| 1e6 | 4.20 | 4.70 | [4.30, 5.10] |
| 2e6 | 4.23 | 4.50 | [4.10, 4.90] |
| 5e6 | 4.26 | 4.40 | [4.00, 4.80] |
| 1e7 | 4.29 | 4.35 | [3.95, 4.75] |
| 2e7 | 4.31 | 4.35 | [3.95, 4.75] |
| 5e7 | 4.33 | 4.35 | [3.95, 4.75] |
| 1e8 | 4.36 | 4.35 | [4.00, 4.70] |
| 2e8 | 4.37 | 4.37 | [4.05, 4.70] |
| 5e8 | 4.39 | 4.39 | [4.05, 4.70] |
| 1e9 | 4.41 | 4.41 | [4.05, 4.70] |

- **Ratio rule.** r(z) = A₁A₂ / (z^{16s/9}/ln⁸z) inside [0.05, 2] at every
  new level is a HIT; below is adverse to the ln⁸ model of this family;
  above says the model under-counts, which is not adverse to "≫".
- **Decade rule, the decisive row.** Mean slope over 1e8 → 1e9: below 3.90
  is ADVERSE to the exponent 16s/9 for this family (the cut shares there are
  below 0.2 and falling); [3.90, 4.05) adverse-leaning with finite-size not
  excluded; [4.05, 4.70] HIT; above 4.70 faster than the model, not adverse
  to "≫" but the ln⁸ is then wrong as a model.
- **Kill rule (the brief's).** OLS slope of ln(A₁A₂) on ln z over the
  points z ≥ 1e7 below 2 by more than 2 se is adverse to the law. The counts
  are exact integers, so "se" here is the regression scatter, not a sampling
  error. Anything at z < 1e7 is finite-size by the arithmetic above.
- **What would falsify the law and what would merely be finite-size.** A
  measured decade slope at 1e8 → 1e9 below 3.9 would say the four-chain
  family does not reach D^{16/9} up to logs, which is the derivation's
  own claim about its own construction; that is adverse to §4.2, not to the
  exact facts E1–E4. A slope in the band, or above it, is consistency only.
  Any miss in 1e6..1e7 is the turn-on and the cut, both computed above,
  and decides nothing.
- **Object (A).** X1, a control: Ω(89) ≥ 684 and Ω(101) ≥ 1155, the
  source's hill-climb floors (its lines 393–394; legal splits, so a failure
  is an engine defect). X2: OLS slope of ln Ω on ln z over z = 73..113,
  point 4.1, band [3.4, 5.2] (from the source's 3.2825 ± 0.1205 exact and
  4.1394 ± 0.0898 hill-climb slopes, and the floor at 89 forcing ≥ 5.06 over
  73 → 89). X3: log_z Ω at z = 113 in [1.5, 1.9]. Neither X2 nor X3 tests
  the law.

---

## 3. The run (deliverable c; tail 2 SEC E–F, lines 556–581)

Tail 2 was bound after tail 1 under the same code-sha (edf15965…), 58 lines,
one invocation with `--max-old-space-size=16000` recorded; every level
planned in §1 was reached.

**Object (A), exact Ω at z = 79..113 (lines 558–566).** viol = 0 at every
level, so the sign facts and the pruning's validity hold to k = 29. Ω = 285,
441, 684, 990, 1155, 1320, 1485, 1782, 1980 at z = 79, 83, 89, 97, 101, 103,
107, 109, 113; log_z Ω rises 1.2936 → 1.6057. At z = 89 and 101 the exact
value EQUALS the source's hill-climb floor (684 and 1155): the hill-climb
had found the maximum there. At every new level the maximiser has A₂ = 0
and B₂ = 18..30 with p*₂ = 5, so Ω = A₁B₂ + B₁A₂ with A₁ = 15..66 and p*₁ =
17 or 19 (the second side's λ⁺ vanishes and its λ⁻ carries the value).
Step slopes on single primes run 1.6 to 9.8, an integer maximum on steps of
ln(113/109) = 0.036; the OLS slope over 73..113 is 4.9996 ± 0.1895 on ten
points, and 3.7961 ± 0.1071 over 29..113 on twenty-one (line 567), against
the source's 3.2825 ± 0.1205 over 29..73. VERIFIED (exact), the slopes
MEASURED on a regime that is still changing.

**Object (B), the certified family at p* = (47, 43), z = 1e6..1e9 (lines
572–581).** Two-chains are empty at every new level (t = D/47³ exceeds
D^{2/3} from z = 5e5 on, source line 420 already shows 0); the count is
four-chains only. A₁A₂ runs 2.550e19 → 9.351e32; the per-side integers are
printed exactly (A₁ = 5216382404 at 1e6 to 31271556429270830 at 1e9, above
2⁵³ and carried in BigInt). log_z(A₁A₂) rises 3.2344 → 3.6634. The step
slope falls monotonically 4.8468, 4.7407, 4.6505, 4.5829, 4.5378, 4.4940,
4.4604, 4.4357, 4.4103, 4.3836; the excess over σ_model at the step midpoint
falls 0.6431, 0.5079, 0.3873, 0.2924, 0.2259, 0.1595, 0.1053, 0.0643,
0.0213, −0.0215. The ratio to z^{16s/9}/ln⁸z rises 0.5536 → 2.1353 at 5e8
and reads 2.1038 at 1e9, its first fall. MEASURED (exact integers; the
ratios and slopes are arithmetic on them).

---

## 4. The score (deliverable d; tail 2 SEC G, lines 584–609)

| sealed row | measured | sealed | result |
|---|---|---|---|
| step slope, 10 rows 1e6..1e9 | 4.8468 → 4.3836 | bands of §2 | 10 HIT, none within 0.05 of an edge except 1e6 (4.85 in [4.30, 5.10]) |
| ratio r, 1e6..5e7 | 0.55 → 1.86 | [0.05, 2] | 6 HIT |
| ratio r, 1e8..1e9 | 2.0026, 2.0939, 2.1353, 2.1038 | [0.05, 2] | 4 MISS, all above the cap |
| decade rule 1e8 → 1e9 | 4.4099 | σ_model(3.16e8) = 4.3890; HIT band [4.05, 4.70] | HIT |
| kill rule, OLS over z ≥ 1e7 (7 points) | 4.4522 ± 0.0114 | adverse if < 2 by 2 se | not triggered |
| X1 control | Ω(89) = 684, Ω(101) = 1155 | ≥ 684, ≥ 1155 | ok, with equality |
| X2 (not a law test) | 4.9996 | [3.4, 5.2] | HIT |
| X3 (not a law test) | 1.6057 | [1.5, 1.9] | HIT |

Tally 18 HIT, 4 MISS over 22 sealed rows (line 609). The four MISSes share
one cause, the sealed cap on the ratio; §2 declared that direction
"faster than the model, not adverse to ≫" before the run, and the score is
reported as sealed rather than re-cut. The point forecasts were low at
every step (4.70 → 4.41 against 4.85 → 4.38): the turn-on decayed more
slowly than the arithmetic of §2 implied, and the band widths absorbed it.

---

## 5. Verdict, on the derived law only (deliverable e)

1. **MEASURED, consistent.** The family the derivation builds grows over
   5e5 → 1e9 with a local slope that falls onto 16s/9 − 8/ln z and sits
   within 0.021 of it over the decade 1e8 → 1e9 (4.410 against 4.389), the
   one row the seal named decisive. The kill rule is not triggered: the OLS slope over z ≥ 1e7 reads
   4.4522 ± 0.0114 against a kill line of 2. This is what the derived law predicts for its own construction,
   and it is the first measurement of that prediction outside the turn-on
   regime the source's 601..5e5 data sit in.
2. **MEASURED, the constant.** The family is 2.0–2.1 times
   z^{16s/9}/ln⁸z at z ≥ 1e8, above this note's sealed cap. The derivation
   claims "≫", so a larger constant is inside its claim; the four MISSes
   are a defect of the seal's constant, recorded as such.
3. **Not resolved.** The power of the log to ±1 (§0); whether the ratio has
   settled; anything about the exact floor Ω(z) in the law's regime, since
   at z ≤ 113 the construction's box is empty and the exact maximiser is
   still a two-side split with one side's λ⁺ = 0.
4. **What this is not.** Not the adversarial pass on §4.2, which must
   check the exit identity, the prefix conditions and the parity split as
   written. Not a statement about REC(s, u₀), F1, F2 or RML(α): those rest
   on E1–E4 plus the derivation, and this note touched neither. Not an
   exponent movement. If the adversarial pass finds the construction
   sound, this note says its growth is as claimed to z = 1e9; if the pass
   finds it unsound, this note's counts are counts of something else and
   carry no weight.
5. **Decisive z, stated.** For the exponent, z ≥ 1e8 was decisive at the
   band width used and the data landed inside it. For the log power, a
   decade at z ≥ 1e10 (about 30× the 1e9 cost with this engine, box-class)
   would move the 1/ln z lever to 0.043 per unit of the power; nothing
   below that separates ln⁷ from ln⁹.

---

## 6. Brief verification, defects noticed, and what was not done

**Brief claims checked at the record.** "Exact Ω(z) = 251 at z = 73":
source line 377, and reproduced (tail 1 line 451). "Certified counts to
z = 5e5" and "0.012 → 0.35 of the model over 601 → 5e5": source lines
411 and 420, 9.000e4/7.649e6 = 0.0118 and 8.863e17/2.500e18 = 0.3545 (tail
1 lines 504 and 513 print 0.0118 and 0.3545). "Ω ≫ z^{16s/9}/ln⁸z from
4-prime chains": source §4.2. "REC(s, u₀) false for every u₀ < 4.7088 >
β₂": 16(1+√e)/9 = 4.7088 (source S0 line 327; tail 1 line 484). "Grows like
z^{16s/9}/ln⁸z at the note's s": s = 2.698721, 16s/9 = 4.7977 (source line
428). All verify. One brief imprecision: it names the seal as an embed
option `--stage seal`; `embed.js` has no such flag, the stage is the
script's own argument and the tail is chosen with `--tail N -- --stage
seal` (embed.js header; the 2026-08-30 quadpoint blind uses the same form).

**Noticed in the source, HELD here, not edited.** (i) The source's §4.4
says the certified bound "tracks z^{16s/9}/ln⁸z at 0.012 of it at z = 601
and 0.35 at z = 5e5, rising: consistent with the Chebyshev-count derivation
and its ln⁸z". The tracking is rising because the family is turning on
(§2 above: no usable prime below D^{1/9} until z ≈ 6e5), not because it
has reached the law's regime; "consistent" is the right word there and
"tracks" is generous. (ii) The source's S5 fits slopes on a range where the
maximiser switches from band splits to interleaved splits (its S4a), so
those slopes describe a regime change, not a law; the source says as much
("indicative only") for the hill-climb fit but not for the exact fit.
Neither point touches E1–E4 or the derivation itself.

**Not done.** No adversarial re-derivation of §4.2 (not this brief). No
six-prime chains (dormant below z ≈ 1e5 per the source, and their exponent
2s(1 − 3⁻ᵏ) is not what the law under test states). No s other than
2.698721. No hill-climb at the new exact levels. The exact floor above
z = 113 needs 2³⁰ tables (8.6 GB at Int16) and was not attempted.

*Gate: `node research/qc.js --full` result recorded in the closing report;
both tails verify under `qc/embed.js --check`.*
