# The exact sup at z = 41: sup|ρ̃| over 7.42e12 positions and sup|R_H| at H = z³, z⁴, TODO item 0's first move (b), run

<!-- ledger
id: Q-rho-sup-z41-0830
status: PARTIAL
todo: 0
question: What is the exact sup over all positions of the centred sawtooth remainder at z = 41 (period 7.42e12), and of R_H at H = z^3 and z^4, and what does the eighth exact point do to the truth's slope and to the u0 = 3 form of REC(s, u0)?
verdict: Not run in full; the exact z = 41 point prices at 4.8 to 5.4 h on this machine from measured per-position costs (naive 69.8, table 23.5, table-plus-windows 36.6 ns per worker; fleet 4.52 ns of wall at z = 41), above the 3.5 h rule, so what exists is a new engine (a PROVEN reflection that halves the walk, a P(29) periodic table worth 2.9x, per-block exact re-seeding) reproducing every cited exact sup at z = 13..37 digit for digit, sup|R_H| at H = z^3 walked for the first time at z = 19..37 (F3 = 26.4 to 35.9, the factor 2 was 1.5 to 2.2x loose), a sealed pre-registration (forecast sup 60.07, band [47.25, 76.37], kill needs sup|R_H3| >= 1807.417), one pilot twelfth giving lower bounds sup|rho~|(41) >= 70.651250 and sup|R_H3| >= 64.416936, and an eleven-segment plan for the box; no bound-and-prune exists on three routes; nothing asymptotic can move whatever the point turns out to be.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-rml.md`).** The
> reflection identity ρ̃(W−3−y) = −ρ̃(y) is PROVEN under independent code,
> together with the two hypotheses it needs (the three-entry COMB list closed
> under swap with the weight fixed; the swapped class −2 − c mod q), verified
> at every term of z = 13..37. The sealed forecast's arithmetic and the cost
> extrapolation reproduce. Two custody limits, disclosed: the independent walk
> reaches only z = 29, so sup|ρ̃|(31) = 28.122062, sup|ρ̃|(37) = 52.219092 and
> sup|R_H3| at 31 and 37 are NOT re-derived (five of seven and three of five
> is what the custody claim rests on after that pass); and the seal's TIMING
> cannot be verified by any method available — every sealed number reproduces
> from the seven cited sups alone, which is consistent with pre-registration
> and is not evidence of when it was written (an out-sha256 binds content, not
> the clock).

*(2026-08-30, staging. Producer:
`research/history/staging/measure-0830-rho-sup-z41.js`, a four-tail file
embedded tail by tail with `qc/embed.js --streams both` (stdout is the
deterministic record; every timing figure is on stderr, by rule). No existing
file edited, no git command run. Every number below is in one of the four
OUTPUT blocks or is quoted from an embedded artifact cited by file and
section, except the arithmetic named in §8. Calibration per claim: PROVEN,
MEASURED, HEURISTIC, OPEN, REFUTED.)*

## 0. What is open, first

- **RML(α) is open at every α, REC(s, u₀) is open at every (s, u₀), and no
  exponent moves here.** One more exact point on a measured curve cannot
  decide a statement quantified over all z ≥ z₀. Whatever the eighth point
  does to the seven-point slope 2.7660 ± 0.2120
  (`attack-0829n-rml-proof.md` OUTPUT S5), it moves a fit. A point that
  lands the slope at or above 3.0 within one standard error refutes nothing
  asymptotic, and a point that lands it below 3.0 by two standard errors
  proves nothing. That was written before the run (§5).
- **The only kill on the table is finite-z**: REC(3.0, 3.0) is false AT
  z = 41 iff the walked sup|R_H| at H = 41³ reaches HM − 1
  (`attack-0829n-rml-proof.md` §6, first bullet). Its forecast margin is a
  factor above ten (§5), and the expected outcome, stated in advance, was
  "not killed".
- **The exact z = 41 point does NOT exist after this note.** The run that
  answers the question priced at 4.8 to 5.4 h of wall clock on this machine
  from measured per-position costs (§4), above the 3.5 h rule, so it was
  not run; what exists is the engine, its custody at every lower level, the
  pre-registration, one pilot segment of twelve (tail 2, a lower bound), and
  the segmented plan for the compute box. The eleven remaining segments are
  an ask.
- **The sup at z = 41, when it exists, will be one number from one engine.** The engine is new in
  three places (§2), each proven to compute the same object, and each checked
  against the old engine at every level where both can run (§3). There is no
  independent second implementation at z = 41 itself; the O(n) recomputation
  at the argmax is a self-check, not an independent one.
- **z = 43 and 47 stay out of reach for the exact sup** by the same
  accounting as before (`rho-exact-z31-01.md` §6): 41× and 1763× the z = 41
  work respectively, and nothing in §2 changes the linear-in-W law.
- **The brief carried one error, recorded in §7 (checks): the seven exact
  points do not span "less than an octave" of z.** log₂(37/13) = 1.509, so
  they span one and a half octaves; the phrase is the corpus's own
  (`attack-0829n-rml-proof.md` §0, §5; `rho-exact-z31-01.md` §0) and it is
  wrong there too. Adding z = 41 extends the span to log₂(41/13) = 1.657
  octaves, not to two.

## 1. The object, unchanged

s = 3.0, D = z^s, terms from `sift-limit-lemmaV.js`'s `buildTerms(z, D)`,
the identical call at every exact level; ρ(y) = Σ_j w_j ψ((y − c_j)/q_j),
ψ(t) = t − ⌊t⌋ − 1/2, period W = P(z) = ∏_{p<z} p; ρ̃ = ρ + M/2 with
M = Σ_j w_j/q_j; sup|ρ̃| is the maximum over ALL W positions of one period
(`rho-exact-z31-01.md` §3). R_H(x) = ρ̃(x) − ρ̃(x + H). REC(s, u₀) of
`attack-0829n-rml-proof.md` §3 asks sup_x |R_H(x)| ≤ z^{u₀/2 − ε} ⟨R_H²⟩^{1/2}
at H = ⌊z^{u₀}⌋; this note walks H = ⌊41³⌋ = 68,921 and ⌊41⁴⌋ = 2,825,761,
the u₀ = 3 and u₀ = 4 forms, with ⟨R_H²⟩ from the PROVEN closed form of
`sift-limit-lemmaV.js` `meanSquare` (multi-H, checked against it in S0).
At z = 41, W = 7,420,738,134,810 and n = 125,884 terms (S2). β₂ = 4.26645 per
`paper/beta2-note.md`. No normalisation is introduced and none is changed.

## 2. The engine: three changes, each proven to compute the same object

**(a) Reflection halves the walk. PROVEN.** For every integer y,
ρ̃(W − 3 − y) = −ρ̃(y). The term set is symmetric under (d₁, d₂) ↦ (d₂, d₁)
(the three-entry COMB list of `buildTerms` is), and the class of the swapped
pair is −2 − c mod q, because r ≡ 0 (d₁), r ≡ −2 (d₂) becomes r ≡ −2 (d₁),
r ≡ 0 (d₂) under r ↦ −r − 2. With ψ(−t) = −ψ(t) off the integers and
ψ(−t) = −ψ(t) − 1 at them, summing over the paired terms gives
ρ(−y − 2) = −ρ(y) − K(y), K(y) = Σ_{j: y ≡ c_j (q_j)} w_j. The walk's own
recurrence ρ̃(y) = ρ̃(y − 1) + M − K(y) turns that into ρ̃(−y − 2) = −ρ̃(y − 1),
i.e. ρ̃(W − 3 − u) = −ρ̃(u). Consequently R_H(W − 3 − H − x) = R_H(x). The
map y ↦ W − 3 − y sends [0, L) onto [W − 2 − L, W − 3], which together with
[0, L) covers [0, W − 3] as soon as 2L ≥ W − 1; the wrap chunk
[W − 2 − HMAX, W) supplies the last two positions and, for R_H, the x with
x + H ≥ W. Range walked: L = ⌈W/2⌉ + HMAX + 4 plus the wrap chunk. The
identity is checked at every position of z = 13, 17, 19 and the half-range
engine against the full-period engine at z = 13..37 (S0).

**(b) A periodic table for the small-modulus terms. PROVEN (an identity),
and the recurrence is bit-identical.** Every term whose modulus divides
P(29) = 6,469,693,230 has a stamping contribution periodic with that period.
Their sum K_small is built once into a shared Int8 array (its K range is
printed and lies inside Int8), and only the residual terms are stamped per
block. K(y) = K_block(y) + K_small(y) is the same exact integer as before,
so the double recurrence v += M − K is bit for bit the old engine's; the
'legacy' mode of the producer keeps the old chunking too and must reproduce
`rho-exact-z31-01.js` S2 digit for digit (§3). At z = 41 the event density
Σ_j 1/q_j is 48.07 per position, of which 43.39 is in the 56,588 table
terms and 4.68 in the 69,296 residual ones (S2), which is the whole of the
speed-up.

**(c) Per-block exact re-seeding.** v is reset to the exact O(n) ρ(a) at
every block of 2²¹ positions, so float drift never crosses a block; the
worst |recurrence − exact| at any block boundary is printed. The old engine
re-seeded per chunk (drift 2.5e-7 at z = 37; `rho-exact-z31-01.md` §4.1).

**(d) Bound-and-prune: NOT AVAILABLE, and why.** ρ̃ is piecewise linear
with slope M ≈ 0.026 between events and drops by K(y) at them; a block of
B positions can be bounded only by |ρ̃(a)| + MB + (number of events in the
block), and with 48 events per position that bound exceeds the sup at B in
the single digits, so no block can be pruned. The scan-statistic engine of
`scanstat-t37.md` visits the 2.18e11 wheel survivors and their gaps, a
different object with a sparse support; ρ̃ has no sparse support (every
position is an event position at density 48). The Fourier side has 5.5e8
nonzero modes at z = 37 (`rho-exact-z31-01.js` S1) and grows. Rung: a
negative on the routes tried here, not a theorem that none exists.

## 3. Custody: the old readings reproduced, and the new engine against the old

Tail 1, S0. Every control passes. The OLS estimator returns 2.500000 on a
known z^2.5 truth. The reflection identity of §2(a) holds at every position
of z = 13, 17, 19 to 1.6e-14, 3.5e-14, 7.3e-14, and its R_H form to 9.1e-14
at H = z³. The multi-H closed form reproduces `L.meanSquare` for ⟨ρ̃²⟩ and
⟨R_H²⟩ at both H at z = 13..31 to 4.2e-15 worst. The custody gate proper:

| z | legacy sup (this file) | cited (`rho-exact-z31-01.js` S2) | half+wrap sup | half − legacy | drift(reseed) |
|---|---|---|---|---|---|
| 31 | 28.122062 | 28.122062 | 28.122062 | 8.8e-8 | 4.3e-9 |
| 37 | 52.219092 | 52.219092 | 52.219092 | 1.2e-7 | 3.0e-9 |

All seven legacy values (z = 13..37) match the cited six decimals (S0,
"CUSTODY GATE: PASS"); the legacy column's |diff| against the cited values
is 1.3e-7 to 3.9e-7, which is the cited values' own rounding to 6 dp, and
the half-range reseed engine agrees with the legacy full-period engine to
1.2e-7 at worst, inside the legacy engine's own drift (2.5e-7 at z = 37).
At z = 41 the three engines (naive, table-legacy, table-reseed) agree on
three sample chunks of 1.34e8 positions to 1.4e-7 (S2). Rung: MEASURED, the
engine change is arithmetically inert at every level where the old engine
can run.

Two z = 41 inputs that need no walk also reproduce: M = 2.623898e-2 against
the cited 2.624e-2, and the closed-form ⟨ρ̃²⟩ = 143.927339 against the cited
11.99697² = 143.927289 (S2), so the eighth point, when it exists, sits on a
lattice whose second moment is already confirmed.

**S1, the seven exact levels re-walked, with the new columns.** sup|ρ̃|
reproduces at all seven; new are the argmax positions and the walked
sup|R_H| at H = z³ and z⁴ (never walked before; `attack-0829n-rml-proof.md`
§5 used the factor 2 in |R_H| ≤ 2 sup|ρ̃| instead). At H = z³:
sup|R_H3| = 8.600331, 15.737099, 21.611574, 29.537383, 47.838730 at
z = 19, 23, 29, 31, 37, i.e. 0.94, 1.30, 1.21, 1.05, 0.92 times sup|ρ̃|
[ARITHMETIC on S1], so the factor 2 was 1.5 to 2.2× conservative there. The
walked half-range ⟨R_H²⟩ agrees with the closed form to 3.3e-5 at z = 37
(S1, walked/closed 1.000033), the residual being the range's overlap with
its own reflection. The ratio sup|R_H3|/rms(R_H3) runs 3.39 → 5.68 over
z = 19..37, log_z 0.41 → 0.48; the certified margin at u₀ = 3 is
F3 = (HM − 1)/sup|R_H3| = 31.5, 26.4, 35.9, 29.5, 29.7 at z = 19..37, not
falling. Rung: MEASURED, five exact levels.

## 4. The price, measured, and the decision

All timing figures are from tail 1's stderr section (embedded with
`--streams both`); position counts are from S3. Machine: Apple M1 Max, 10
cores (8 performance, 2 efficiency), 64 GB, node v22.21.0; `os.cpus()`
reports 10 and the producer runs 10 workers.

| engine | measured | where |
|---|---|---|
| naive (all 125,884 terms stamped, no table, no trackers), one worker, z = 41 | 69.8 ns/position | S2 stderr, 4.03e8 positions |
| table-legacy (P(29) table, no trackers), one worker, z = 41 | 23.5 ns/position | same |
| table-reseed (table, re-seed per block, two window trackers), one worker, z = 41 | 36.6 ns/position | same |
| table-reseed, the full fleet of 10 workers, z = 37 half+wrap | 1.003e11 positions in 490.4 s = 4.89 ns/position of wall | stderr |
| table-legacy, full fleet, z = 37 full period | 2.006e11 positions in 447.9 s = 2.23 ns/position of wall | stderr |
| the P(29) table build at z = 41 (10 workers) | 452.8 s (2501.6 − 2048.8) | stderr |
| the old engine of `rho-exact-z31-01.md` (26-window grid), z = 37 | 77 min for 2.006e11 | that note, §2 |

[ARITHMETIC on those rows.] Positions the exact sup at z = 41 needs: the
full period 7,420,738,134,810 for the naive engine, or 3,710,374,718,933
(half range plus wrap, S3) for the reflected engines. Wall clock on this
machine:

- naive engine, full period: 7.42e12 × 69.8 ns / (10 workers at the
  measured fleet gain of 36.6/4.89 = 7.5 over one worker) ≈ 6.9e4 s ≈ 19 h;
  the old engine's own extrapolation was ~48 h (`rho-exact-z31-01.md` §6);
- table-reseed with reflection, the engine that delivers sup|R_H|: at the
  z = 37 fleet rate, 3.71e12 × 4.89 ns ≈ 1.81e4 s ≈ 5.0 h of walking, plus a
  table build per segment (0.13 h each), i.e. **about 5.4 h in three
  segments** on the z = 37 rate; the pilot then measured the z = 41 fleet
  rate itself at 4.52 ns/position (§6), which makes the eleven unrun
  segments 4.8 h — the same side of the rule;
- table-legacy with reflection (sup|ρ̃| only, no windows): ≈ 3.71e12 ×
  2.23 ns ≈ 2.3 h plus builds, ≈ 2.7 h — under the rule, but it does not walk
  the object the falsifier needs (sup|R_H| at H = z³).

**Decision, from the measurement:** 5.4 h is above the 3.5 h rule for the
run that answers the question, so the full z = 41 walk was NOT run here. The
speed-ups actually obtained are 2× (reflection, PROVEN) and 2.9× (table,
69.8 → 23.5 ns single-worker, legacy mode); the window trackers give a third
of it back (23.5 → 36.6). No bound-and-prune exists (§2(d)). What was run
instead is one pilot segment of twelve, K = 12, segment 12/12 (one twelfth
of the half range plus the wrap chunk, 3.12e11 positions), embedded as
tail 2: it measures the fleet rate at z = 41 itself, validates the segment
pipeline end to end, and banks a lower bound on the sup. §6 reports it.

**The segmented plan for the compute box (5950X, 16 cores, 128 GB;
script-only ferry, no git on the box).** Ferry the producer and
`research/sift-limit-lemmaV.js` (its one `require`); on the box run, for
k = 1..11, `node measure-0830-rho-sup-z41.js --stage B --seg k/12
> seg-k.out 2> seg-k.err` (segment 12 is done); each segment is ~3.09e11
positions and independent; the table (6.47 GB shared) is rebuilt per
segment. On this machine a segment is ≈ 3.09e11 × 4.89 ns + 453 s ≈ 33 min;
on the box, per-core Zen 3 against M1 P-core is unmeasured (run `bench/`
first per the box protocol), and with 16 cores at 0.7× per core the eleven
segments price at roughly 11 × 33 × (10/16)/0.7 ≈ 5.4 h, overnight class,
nice-able, 7 GB resident. Ferry the 22 output files back; bind each as a
tail via the declared-provenance path with the box's node version and
hardware recorded; combine by max (sup|ρ̃|, sup|R_H3|, sup|R_H4|) and by sum
(Σ R_H², positions) over the twelve tails, and check Σ positions =
3,710,374,718,933. Nothing in this plan changes the object.

## 5. Pre-registration, written to tail 1 before any z = 41 segment ran

Tail 1, S4, embedded (out-sha256 78984bb6…) before tail 2 was launched.

- **(i) The seven-point slope** recomputed on this file's own S1 column:
  2.7660 ± 0.2120, matching `attack-0829n-rml-proof.js` S5. Span: 1.509
  octaves of z, not "less than one".
- **(ii) OLS forecast** of sup|ρ̃|(41): 60.07; 1-se prediction band
  [47.25, 76.37]; 2-se band [37.16, 97.11].
- **(iii) Gaussian-law forecast:** C_true(41) inside the seven-point range
  [0.6044, 0.8412], i.e. sup|ρ̃|(41) in [55.83, 77.69]; F4 (C_true ≤ 1) is
  false at z = 41 iff sup|ρ̃|(41) > 92.36. sup/rms forecast for ρ̃:
  [4.653, 6.476]; for R_H3, from the five-point trend (vi): 5.646, band
  [4.869, 6.546].
- **(iv) Kill rule for the u₀ = 3 form, finite-z:** REC(3.0, 3.0) is FALSE
  AT z = 41 iff sup|R_H3|(41) ≥ HM − 1 = 1807.417. Forecast: not killed,
  with F3 ≥ 9.31 even at the 2-se top of the band; the kill needs
  sup|ρ̃|(41) ≥ 903.71, fifteen times the forecast.
- **(v) What the eighth point does to the fit:** on the forecast, the
  eight-point slope is 2.7660 ± 0.1656; at the 1-se band ends 2.6562 /
  2.8757; at the 2-se ends 2.5465 / 2.9855. The eight-point fit excludes
  u₀ = 3.0 from below (slope − se ≥ 3.0) iff sup|ρ̃|(41) ≥ 343.0, and from
  above (slope + se ≤ 3.0) iff sup|ρ̃|(41) ≤ 68.9. Forecast: neither. Either
  way it moves a fit and refutes nothing asymptotic.
- **(vi) sup|R_H3|** five-point slope 2.4522 ± 0.2095; forecast at 41:
  58.26, band [50.24, 67.56].
- **(vii)** The allowance REC(3,3) grants at z = 41 is 41^{1.5} = 262.53
  against a forecast ratio of 5.6; no ε is in force, so only (iv) is a kill.

**Scoring rule, fixed here:** the pilot segment (tail 2) covers a twelfth of
the half range and so yields LOWER BOUNDS only; none of (ii)–(vi) can be
scored against it, and the note will not score them. They are scored when
the twelve tails exist.

## 6. The pilot segment at z = 41 (tail 2): lower bounds, the fleet rate, and nothing scored

Tail 2, S5: segment 12 of 12, 101 of the 1201 chunks (every twelfth plus
the wrap chunk), 309,200,483,133 positions, the count matching the plan;
worst block drift 6.0e-9; the sup's argmax recomputed exactly in O(n) to
5.7e-9. What it measured, every figure a bound on the full-period value
and none of them the value:

- **sup|ρ̃|(41) ≥ 70.651250**, attained at position 1,704,538,822,781. That
  lower bound already sits inside the pre-registered 1-se band
  [47.25, 76.37] and above 68.9, the level below which the eight-point fit
  would exclude u₀ = 3.0 from above (§5 (v)); so that exclusion is already
  impossible, and no other forecast is scored here (§5's scoring rule).
- **sup|R_H|(41) ≥ 64.416936 at H = z³ and ≥ 97.905636 at H = z⁴.** The
  segment's F3 = 28.058 is an UPPER bound on the full-period margin; the
  kill (sup|R_H3| ≥ 1807.417) is not reached in this twelfth and cannot be
  ruled out from it.
- The segment's m2 = 144.009169 against the full-period closed form
  143.927339 (S2), 0.06% apart on one twelfth of the range [ARITHMETIC];
  the segment mean 8.96e-4 against the proven 0.
- **The fleet rate at z = 41 itself** (stderr): 3.092e11 positions in
  1398.6 s = 4.52 ns/position of wall with 10 workers, and the table build
  164.6 s. [ARITHMETIC] The remaining eleven segments price at 11 ×
  (1398.6 + 164.6) s = 4.8 h on this machine, which confirms the §4
  decision from the z = 41 rate rather than the z = 37 one; one segment is
  26 min.

Rung: MEASURED, one twelfth of the half range, lower bounds only.

## 7. Brief-claim checks

| brief claim | record | verdict |
|---|---|---|
| period P(41) = 7.4e12 | W = 7,420,738,134,810 (S3; `scanstat-t37.md` header) | holds |
| existing exact points z = 13..37, seven | `rho-exact-z31-01.js` S2, seven rows | holds |
| slope 2.766 ± 0.212, 1.1 se under u₀ = 3, 5.8 se under u₀ = 4 | `attack-0829n-rml-proof.js` S5: 2.7660 ± 0.2120, 1.10 se, 5.82 se | holds |
| "seven points spanning less than an octave" | log₂(37/13) = 1.509 | WRONG, in the brief and in the corpus (§0) |
| z = 31, 37 walks cost 6928 s | `rho-exact-z31-01.md` §4: 6928.4 s for the whole producer, Λ included | holds as stated there |
| `scanstat-t37.md` found G₂(37#) over 7.4e12 positions "in minutes" | 5 shards × 35.2 min in lockstep over 2.18e11 slots | 35 min wall, a different object (gaps between survivors) |
| compute box 5950X, 16 cores, 128 GB | memory file; not verified here | not verified |

## 8. Readings

1. **MEASURED, custody.** The new engine (reflection, P(29) table, per-block
   re-seeding) reproduces the cited exact sup|ρ̃| at all seven levels
   z = 13..37 to the cited six decimals in legacy mode and to 1.2e-7 in
   half-range reseed mode, and the three engines agree at z = 41 on three
   sample chunks to 1.4e-7. The reflection identity is PROVEN (§2(a)) and
   checked at every position of z = 13, 17, 19. Tail 1, S0, S2.
2. **MEASURED, new columns at the old levels.** sup|R_H| at H = z³ walked
   for the first time: 8.600331, 15.737099, 21.611574, 29.537383, 47.838730
   at z = 19..37, between 0.92 and 1.30 times sup|ρ̃|, so the factor 2 that
   `attack-0829n-rml-proof.md` §5 stood in with was 1.5 to 2.2× loose; the
   certified margin at u₀ = 3 is F3 = 26.4 to 35.9 over five levels and is
   not falling. sup|R_H3|/rms runs 3.39 → 5.68 (log_z 0.41 → 0.48). Tail 1, S1.
3. **MEASURED, the price.** Naive 69.8, table-legacy 23.5, table-reseed
   36.6 ns/position per worker at z = 41; fleet 4.89 ns/position of wall at
   z = 37 in the mode the falsifier needs; the half range plus wrap is
   3,710,374,718,933 positions, so the exact point is ≈ 5.4 h here, over the
   rule, and was not run. The obtained speed-ups are 2× (PROVEN reflection)
   and 2.9× (table); no bound-and-prune exists on the routes tried (§2(d)).
   Tail 1 stderr, S2, S3.
4. **PRE-REGISTERED, unscored.** Forecast sup|ρ̃|(41) = 60.07, 1-se band
   [47.25, 76.37]; kill of REC(3,3) at z = 41 needs sup|R_H3| ≥ 1807.417,
   fifteen times the forecast; the eight-point fit cannot exclude u₀ = 3
   from below unless sup|ρ̃|(41) ≥ 343.0. Scored only when all twelve
   segments exist. Tail 1, S4.
5. **MEASURED, lower bounds from the pilot twelfth.** sup|ρ̃|(41) ≥
   70.651250, sup|R_H3|(41) ≥ 64.416936, sup|R_H4|(41) ≥ 97.905636; the
   fleet rate at z = 41 is 4.52 ns/position of wall, so the eleven unrun
   segments are 4.8 h here or an overnight run on the box. The one
   pre-registered outcome already decided is negative: the eight-point fit
   cannot exclude u₀ = 3 from above (needs sup ≤ 68.9). Tail 2, S5.
6. **Corrected, not applied.** "Seven points spanning less than an octave"
   (brief; `attack-0829n-rml-proof.md` §0, §5; `rho-exact-z31-01.md` §0) is
   arithmetically wrong: log₂(37/13) = 1.509 octaves. Recorded here for the
   adjudicator; no live file edited.

## 9. Not reached

- **The exact sup|ρ̃|(41), sup|R_H3|(41), sup|R_H4|(41):** eleven of twelve
  segments unrun; plan in §4. Until then nothing in §5 is scored.
- **z = 43, 47:** 41× and 1763× the z = 41 work; a different object is
  needed, not a faster walk (`rho-exact-z31-01.md` §6, unchanged).
- **A bound-and-prune certificate:** not found; §2(d) is a negative on
  three routes, not a theorem.
- **sup|R_H| at u₀ = 3.5 and 4.25:** dropped from the trackers to buy
  speed; only u₀ = 3 and 4 are walked.
- **An independent second implementation at z = 41:** none; the argmax
  recomputation is a self-check.

## 10. Custody and gate

Producer `research/history/staging/measure-0830-rho-sup-z41.js`, four
declared tails. Tail 1 (stage A) bound by `node research/qc/embed.js
--streams both --tail 1 … -- --stage A`, code-sha256 61af2c79…, out-sha256
78984bb6…, 201 body lines, elapsed 2554.6 s. Tail 2 (stage B, segment
12/12) bound the same way; its fingerprint is in the file. Tails 3 and 4
are reserved and unbound (the segments belong on the box). A `--check`
re-run of tail 1 costs 43 minutes and was not bought. Derived arithmetic in
this note, done on embedded columns and not by the script: the ratios and
"×" factors in §3, every wall-clock extrapolation in §4, and the octave
counts. `node research/qc.js --full` was run at the end; its result is in
the final report. The ledger gate requires TODO.md item 0 to list
`Q-rho-sup-z41-0830`; this note may not edit TODO.md, so that line is the
orchestrator's.
