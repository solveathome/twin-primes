# The zero-parameter depth law's blind test at the third decade: fresh width audit, sealed forecasts on both asymptotic forms and on the two finite-size comparators, the run to Q = 31607 and beyond, scored row by row

<!-- ledger
id: Q-quadpoint-blind-31607-0830
status: ANSWERED
todo: Z2
question: Does the zero-parameter depth law y*(Q), stated on the set where T(Q) >= 1 and on both the 1/(2e^gamma) = 0.280730 and the u*omega(u) = 2 (1/u* = 0.280438) forms with and without the finite-size Mertens factor, survive a sealed blind test on the bands past Q = 10007, and can that decade tell the two asymptotes apart?
verdict: MEASURED, blind, and it decides nothing asymptotic: on 8363 new anchors 10009 <= Q <= 100003 the 76 sealed rows score 64 HIT and 12 MISS with every MISS on the two naked asymptotes as pre-declared, the two finite-size zero-parameter comparators HIT every row at every band (residual on ln y*/ln h -0.00022 to -0.00002 against C2), K*/pool falls 0.032 -> 0.026 -> 0.020 -> 0.016 -> 0.013 with no bend and a quiet sup, and the band means sit 0.0017 to 0.0037 below both asymptotes, six to twelve times their 0.000291 difference, so which limit the deficit tends to is set by the comparator and not by the data.
-->

*(2026-08-30. Staging note; nothing here is integrated into a live document.
HELD. Producer, formally embedded, three tails:
`research/history/staging/blind-0830-quadpoint-31607.js` (tail 1 `--stage seal`,
tail 2 `--stage decade3`, tail 3 `--stage decade4`). Calibration marked per
claim: PROVEN, VERIFIED (exact computation), MEASURED, HEURISTIC, OPEN,
REFUTED. Every figure below sits in that producer's OUTPUT tails or is quoted
from an embedded OUTPUT block of `research/attack-quadpoint-02.js` or
`research/attack-quadpoint-03.js` by line; nothing is transcribed by hand. This
note edits no other file. No git command was run by the author of this note,
so the seal is by disk order and by the producer's tail order, not by commit.)*

---

## 0. What is open first, and the label

**Label (i), measurement.** y*(Q) = p_{K*}, the deepest pool prime the
capture-identity certificate needs, is defined only where T(Q) ≥ 1
(`quadpoint-identity-01.md` §2, TODO Z2's 2026-08-27 quantifier). Every anchor
this note runs has T ≥ 1 (asserted per anchor; occupancy on this range is known
to 9.0e15 from adopted data, `attack-quadpoint-01.md` §5), so nothing below can
test the quantifier, and every law is stated on {T ≥ 1}. A decade of HITs on
that set is a measurement of a heuristic main term's finite-size behaviour and
is not evidence for the all-Q form, which is stronger than TPC
(`attack-wrongdirection-audit.md` §3.2, cited through TODO Z2).

**Base rate, written before the run.** The expected outcome is another decade
of HITs on the two finite-size comparators (§2, C1 and C2), MISSes on the two
naked asymptotes at the first two new bands, and no separation of 0.280438 from
0.280730: the two asymptotes differ by 0.000291 in ln y*/ln h and the
finite-size deficit the comparators forecast at the third decade is ten times
that. Nothing here moves 4.2665 → 2; nothing here is a Z₂ bound or a TPC claim.

**Brief errors found while verifying its numbers at the record.** The brief and
TODO Z2 give the root of u·ω(u) = 2 as u* = 3.565845; `u2-engine-depth.md` §2
and `import-rough-anatomy.md` §3 both record 3.565847 on their own ω grids; the
producer's own grid (step 10⁻⁵, tail 1 SEC B) gives 3.5658466. The brief's
value is off in the seventh digit; all three agree in 1/u* to six decimals,
0.280438, so nothing downstream moves. Every other
figure the brief quotes (0.061 → 0.050 → 0.040 → 0.032; 0.2624 → 0.2763;
0.9843; 0.923 → 0.984; 336 and 642; 0.28073; 0.280438) was found at its
record: `attack-quadpoint-02.js` lines 349–357, `attack-quadpoint-03.js` lines
262–268 and 275–280, `u2-engine-depth.md` §5.

---

## 1. Width audit and calibration gate (tail 1, run before any new anchor)

**Width audit, the level this runs at.** Anchors are primes Q ≤ 100003, next
prime 100019, so hi = Q′² ≤ 100019² ≈ 1.0004e10. That exceeds 2³¹ (the old
audit's ceiling) but sits far below 2⁵³, so every value v ≤ hi + 1 is an exact
double; `v % 30`, `v % r` and `lo % r` are exact on such integers; the first
multiple of r at or above lo is formed as `lo + ((r − lo % r) % r)`, integer
arithmetic only, never `Math.ceil(lo / r) · r`. Window offsets v − lo < width,
and width = (Q′ − Q)(Q′ + Q) is bounded by the largest prime gap below 100019
times 2·100019; the producer computes that gap from its own sieve and asserts
width < 2³¹ and hi < 2⁵³ before any window is allocated. Active indices are
stored in an Int32Array (nR ≤ 9592 per anchor). No bit shifts anywhere. Counts
per window are below 2³¹.

**Engine.** The identity path of `attack-quadpoint-03.js`: per-window
first-touch marking by the actives 7..Q ascending (first touch = lpf), C and T
by the wheel-30 channel, the both-composite pairs binned by the index of their
smaller lpf, X(K) as suffix sums, K* = least K with T − X(K) ≥ 1, y* = p_{K*}.
No pool cap exists on this path, so `attack-quadpoint-02.md` §2's KCAP
objection to any run past 10007 does not arise: K* is exact at every anchor.

**Calibration gate, digit-exact, abort before any new figure prints.** The
producer hard-codes and asserts, from the embedded OUTPUT blocks: the 24 v1
rows (`attack-quadpoint-02.js` lines 186–197, as width C T pool floor0 K*
floor@K*), the 19 v2 rows of SEC 1 (lines 328–346), the B5–B8 band table
(lines 349–357: n, K* mean, K*/pool mean, max), the B3–B8 twin-Q table (lines
359–368), the largest K* (46 at Q = 9281, pool 1146) and the worst fraction
(Q = 29, 2 of 7), the K = 0 certificate list, the 03.js SEC 2 table (lines
262–268: n, K* mean, y* mean, ln y*/ln h mean, ratio to 0.2807) and its
top-band ratio 0.9843, and the Q = 9281 line (T = 127, CC = 2357, y* = 227).
An independent second sieve recounts T at every anchor of the whole run.

---

## 2. Pre-registration, SEALED in tail 1 before any anchor above 10007 ran

**The four comparators, all zero-parameter, all evaluated per anchor at
h = Q² with pool = π(Q) − 3 and then band-averaged.**

- **OLD**: y = h^θ_old, θ_old = 1/(2e^γ); K = π(y) − 3. (`quadpoint-identity-01.md` §3.)
- **NEW**: y = h^θ_new, θ_new = 1/u*, u* the root of u·ω(u) = 2 on the producer's own ω grid; K = π(y) − 3. (`quadpoint-prior-art.md` §2.2, `import-rough-anatomy.md` §2.1.)
- **C1**: the exact-Mertens main term of `u2-engine-depth.md` §5: y = least active prime with ∏_{7≤p≤y}(1 − 1/p) ≤ 7.5/ln h.
- **C2**: the ω-form of `import-rough-anatomy.md` §2.1: K = least K ≥ 1 with ω(ln h/ln p_K) < ∏_{K<i≤nR}(1 − 1/p_i), y = p_K.

**Bands**, geometric, fixed now: B9 = (10007, 17783], B10 = (17783, 31607],
B11 = (31607, 56234], B12 = (56234, 100003]; every prime in a band is an
anchor, as in B3–B8. Statistics per band, exactly as `attack-quadpoint-02.js`
SEC 2–3 and `attack-quadpoint-03.js` SEC 2 compute them: m_b = mean K*/pool,
max_b = max K*/pool, L_b = mean ln y*/ln h, Y_b = mean y*, the twin-Q
subfamily's mean, the largest K* in the band. B9 and B10 are the mandated
third decade (`quadpoint-decade-prereg.md`'s escalation clause named these
edges); B11 and B12 run if the compute budget allows.

**Sealed rows and the HIT/MISS rule, per band b.**

| row | statistic | forecast | HIT iff |
|---|---|---|---|
| R1 | m_b | band mean of K_c/pool, c ∈ {C2, C1, OLD, NEW} | \|m_b − F\| ≤ 0.05·F, scored per comparator |
| R2 | L_b | C2 band mean; C1 band mean; θ_old; θ_new | \|L_b − F\| ≤ 0.0015, per comparator |
| R3 | Y_b | band mean of y_c, per comparator | \|Y_b − F\| ≤ 0.05·F, per comparator |
| R4 | drift ratios L_b/θ_old and L_b/θ_new | C1 band mean over θ | \|r − F\| ≤ 0.006 |
| R5 | shape | m_b ≤ m_{b−1}, m_8 = the reproduced B8 value | BEND fires on any rise |
| R6 | sup | max_b ≤ max_{b−1}; largest K* in band ≤ 2 × C2 band-mean K* | FLAG on either failure |
| R7 | twin-Q | \|mean_twinQ − m_b\| ≤ 0.005 | HIT iff so |
| R8 | points | y*(31607) and y*(100003) against each comparator's point value | \|y* − F\| ≤ 0.25·F |

The headline comparator is C2; R1–R3 on C2 are the kill rows. **Kill rule:**
any MISS on R1–R3(C2) at any band is reported as a MISS and the finite-size
law is marked REFUTED at that band, with no repair; a BEND on R5 or a FLAG on
R6 is a second-death signal reported separately and not averaged away. Rows
on OLD and NEW carry a pre-declared expectation: MISS on R2 at B9 and B10
(the comparators forecast a deficit of about 0.003, twice the band); a HIT
there would falsify the finite-size account of the drift. R8 is low-power by
construction (the per-anchor sd of ln y*/ln h, 0.00925 over 1,219 anchors,
`u2-engine-depth.md` §5, is 19% in y* at ln h ≈ 21; the ±25% band is 1.3σ)
and is sealed because the corpus's standing forecasts are point forecasts.

**Distinguishability rule for θ_old versus θ_new, pre-declared.** Band b
separates the two asymptotes only if (a) R2(C2) HITs at b, (b)
θ_old − θ_new = 0.000291 exceeds 3·SE_b with SE_b = sd_b/√n_b, and (c) the
C2 comparator's own rms residual on B3–B8 is below 0.000291/3 = 0.000097. The
cited rms residual is 0.000294 (`import-rough-anatomy.md` §3), so (c) fails
before the run, and the pre-declared verdict is: the decade cannot separate
them. Tail 1 prints the predicted SE_b so the reader can see (b) as well.

**Dry run on the record, tail 1.** The identical row machinery is applied to
B6, B7 and B8 against the same comparators before the seal, so the reader can
see what each tolerance would have said on the decade already measured.

**Contamination disclosure.** No anchor above Q = 10007 was run, timed or
seen by the author before tail 1 was embedded; engine timing used the
calibration range only.

**Seal.** Tail 1 was embedded with invocation
`node research/history/staging/blind-0830-quadpoint-31607.js --stage seal`,
code-sha256 `34dd79029b6fe9d70a07af5b0c39a76c623211a26974e74ce7e0d06415aeefb2`,
out-sha256 `7c396a1022369ee5d3998dc7a4f46826faeb3fa32621ac5c9123535a5fb5fd46`,
and this section was completed against that tail before tail 2 ran. Tail 1
records: primes sieved to 100100, largest anchor gap 72 at Q = 31397, largest
width 11484288 (< 2³¹), largest hi 10003800361 (a safe integer); ω gates
ω(2) = 0.500000, 3ω(3) = 1.693147, ω(12) = 0.561459; u* = 3.5658466 (so the
brief's 3.565845 is off in the seventh digit and the notes' 3.565847 is the
rounding of this), θ_new = 0.280438, θ_old = 0.280730, θ_old − θ_new =
0.000291; the calibration gate ALL REPRODUCED on 1227 anchors with 0
assertion failures; the comparators reproduce the two notes' scratchpad
forward values exactly (C2: 35/163 at 10007, 62/313 at 31607, 110/617 at
100003; C1: 317 at 31607, 617 at 100003; OLD 336.1 and 641.7).

**Dry run on B6–B8 (tail 1 SEC D), what the tolerances say on the record.**
C2 and C1 HIT every R1–R4 row at all three bands (C2 residuals on L
−0.00030, +0.00003, −0.00016); OLD and NEW MISS R2 and R3 at all three bands
(L residuals −0.00672/−0.00643, −0.00586/−0.00557, −0.00441/−0.00412) and
MISS R1 at B6 and B7 but HIT it at B8; R5, R6, R7 HIT at all three. Scores
11/6, 11/6, 13/4 HIT/MISS of 17 rows. So on the record the machinery
separates the finite-size comparators from the naked asymptotes on L and y*,
and cannot on K*/pool by B8.

**Sealed forecast values (tail 1 SEC E; n = anchors per band).**

| band | n | comp | K*/pool | L | y* | K* | r_old | r_new |
|---|---|---|---|---|---|---|---|---|
| B9 | 810 | C2 | 0.02568 | 0.27727 | 197.65 | 41.53 | 0.9877 | 0.9887 |
| B9 | 810 | C1 | 0.02569 | 0.27728 | 197.69 | 41.55 | 0.9877 | 0.9887 |
| B9 | 810 | OLD | 0.02689 | 0.28073 | 210.92 | 43.46 | 1.0000 | 1.0010 |
| B9 | 810 | NEW | 0.02674 | 0.28044 | 209.75 | 43.23 | 0.9990 | 1.0000 |
| B10 | 1361 | C2 | 0.02045 | 0.27752 | 272.91 | 55.05 | 0.9886 | 0.9896 |
| B10 | 1361 | C1 | 0.02048 | 0.27762 | 273.45 | 55.14 | 0.9889 | 0.9899 |
| B10 | 1361 | OLD | 0.02140 | 0.28073 | 291.13 | 57.58 | 1.0000 | 1.0010 |
| B10 | 1361 | NEW | 0.02131 | 0.28044 | 289.42 | 57.33 | 0.9990 | 1.0000 |
| B11 | 2302 | C2 | 0.01620 | 0.27860 | 384.47 | 72.96 | 0.9924 | 0.9934 |
| B11 | 2302 | C1 | 0.01624 | 0.27876 | 385.79 | 73.18 | 0.9930 | 0.9940 |
| B11 | 2302 | OLD | 0.01674 | 0.28073 | 402.27 | 75.41 | 1.0000 | 1.0010 |
| B11 | 2302 | NEW | 0.01664 | 0.28044 | 399.77 | 74.98 | 0.9990 | 1.0000 |
| B12 | 3890 | C2 | 0.01277 | 0.27884 | 533.39 | 96.68 | 0.9933 | 0.9943 |
| B12 | 3890 | C1 | 0.01282 | 0.27903 | 535.72 | 97.05 | 0.9940 | 0.9950 |
| B12 | 3890 | OLD | 0.01318 | 0.28073 | 556.04 | 99.69 | 1.0000 | 1.0010 |
| B12 | 3890 | NEW | 0.01311 | 0.28044 | 552.40 | 99.16 | 0.9990 | 1.0000 |

Predicted SE of L per band from sd_L(B8) = 0.00570: 0.00020, 0.00015,
0.00012, 0.00009. Point forecasts (R8): y*(31607) = 313.0 (C2), 317.0 (C1),
336.1 (OLD), 334.1 (NEW); y*(100003) = 617.0, 617.0, 641.7, 637.4. The
forecast R2 deficits of OLD/NEW against C2 are 0.0035/0.0032 (B9),
0.0032/0.0029 (B10), 0.0021/0.0018 (B11), 0.0019/0.0016 (B12), so OLD and
NEW are expected to MISS R2 at every band, NEW marginally at B12.

---

## 3. The run [MEASURED, tails 2 and 3; VERIFIED where marked]

Tail 2 (`--stage decade3`) ran B9 and B10, 810 and 1361 anchors, after
re-running B8 silently and asserting it against the cited table (m = 0.0321,
K* mean 31.22, max 0.045); tail 3 (`--stage decade4`) ran B11 and B12, 2302
and 3890 anchors, after re-running B10 and printing the same m = 0.0204. Every
one of the 8363 new anchors has T ≥ 1 and K* > 0 (asserted; "0 with T = 0" at
each band), so y* is defined everywhere and, as §0 says, the quantifier is
untested by construction. The independent composite sieve recounted T on every
25th anchor of each band with 0 mismatches [VERIFIED]. The whole run to
Q = 100003 fits the budget with room to spare (the embed fingerprints carry
the elapsed figures); the fourth decade therefore ran in full and B12 reaches
the 1e5 anchor the standing forecasts named.

Band statistics, measured (tails 2–3 SEC F):

| band | n | m = K*/pool | K* mean | y* mean | L = ln y*/ln h | sd_L | se_L | max K*/pool | largest K* (Q, pool) | twin-Q n, mean, max |
|---|---|---|---|---|---|---|---|---|---|---|
| B9 | 810 | 0.0257 | 41.49 | 197.22 | 0.27705 | 0.00394 | 0.00014 | 0.036 | 56 (16691, 1927) | 103, 0.0256, 0.036 |
| B10 | 1361 | 0.0204 | 54.99 | 272.88 | 0.27744 | 0.00300 | 0.00008 | 0.028 | 71 (30491, 3288) | 178, 0.0205, 0.028 |
| B11 | 2302 | 0.0162 | 73.03 | 384.70 | 0.27858 | 0.00250 | 0.00005 | 0.023 | 102 (51197, 5235) | 282, 0.0164, 0.023 |
| B12 | 3890 | 0.0128 | 96.59 | 532.71 | 0.27875 | 0.00200 | 0.00003 | 0.017 | 129 (83561, 8152) | 455, 0.0127, 0.017 |

Two things the table shows that no row was sealed on. The per-anchor scatter
of ln y*/ln h shrinks with Q (sd 0.00570 at B8, then 0.00394 → 0.00200), so
the band means are far more precise than the ±0.0015 the rows were sealed
with; and the largest K* in a band passes 64 from B10 on (71, 102, 129), so
`attack-quadpoint-02.md` §2's warning that the v2 engine's KCAP = 64 would
have bitten at 31607 was right, and the identity path, which has no cap, is
what made this run scorable. The four hardest sampled anchors in the shown
rows (16691, 30491, 51197, 83561) are all twin-Q stretches, the narrowest
windows; their L runs to 0.2927 at Q = 51197 while the subfamily's band
mean sits within 0.0002 of the all-band mean at every band.

## 4. The score, row by row [MEASURED against §2's seal; no row repaired]

| band | R1 C2/C1/OLD/NEW | R2 C2/C1/OLD/NEW (residual) | R3 C2/C1/OLD/NEW | R4 old/new | R5 | R6 | R7 | band score |
|---|---|---|---|---|---|---|---|---|
| B9 | HIT/HIT/HIT/HIT | HIT (−0.00022)/HIT (−0.00023)/MISS (−0.00368)/MISS (−0.00339) | HIT/HIT/MISS/MISS | HIT/HIT | no bend | quiet | HIT | 13 HIT, 4 MISS |
| B10 | HIT/HIT/HIT/HIT | HIT (−0.00009)/HIT (−0.00018)/MISS (−0.00329)/MISS (−0.00300) | HIT/HIT/MISS/MISS | HIT/HIT | no bend | quiet | HIT | 13 HIT, 4 MISS |
| B11 | HIT/HIT/HIT/HIT | HIT (−0.00002)/HIT (−0.00018)/MISS (−0.00215)/MISS (−0.00186) | HIT/HIT/HIT/HIT | HIT/HIT | no bend | quiet | HIT | 15 HIT, 2 MISS |
| B12 | HIT/HIT/HIT/HIT | HIT (−0.00009)/HIT (−0.00028)/MISS (−0.00198)/MISS (−0.00169) | HIT/HIT/HIT/HIT | HIT/HIT | no bend | quiet | HIT | 15 HIT, 2 MISS |

R8, the point rows: y*(31607) = 313 (K* = 62 of pool 3398, T = 3867), HIT
against all four forecasts at ±25% (C2 313.0, C1 317.0, OLD 336.1, NEW 334.1);
y*(100003) = 631 (K* = 112 of 9590, T = 7972), HIT against all four (617.0,
617.0, 641.7, 637.4). Total: 76 sealed rows, 64 HIT, 12 MISS.

**Reading, flat.** The kill rows R1–R3 on C2 HIT at every band, so the
finite-size zero-parameter law is not refuted on this range; C1 HITs every
row as well. Every MISS is on OLD or NEW: their R2 rows at all four bands, as
pre-declared in §2 (NEW at B12 by −0.00169, past the 0.0015 band rather than
marginal), and their R3 rows at B9 and B10, which the dry run had shown at
B6–B8 and §2's expectation line did not list separately. The R1 rows on
K*/pool separate nothing at ±5%: the asymptotic forms sit 3–5% above the
measurement and HIT, which is the same weakness `attack-quadpoint-02.md` §2
recorded for the K*/pool bands. y*(31607) = 313 is exactly C2's point value;
a single anchor carries sd 0.0039 in L, about 8% in y*, so that equality is
luck-grade and is not evidence beyond the band rows.

**Post-hoc, not sealed, stated as such.** With se_L at 0.00003–0.00014, the
sealed ±0.0015 is 10 to 50 standard errors wide, so "HIT" here is weak. Read
against the sampling error the residuals say more: C2's are 1.6, 1.1, 0.4 and
2.8 se from zero (B9–B12), C1's 1.6, 2.2, 3.6 and 8.8 se, all negative. C1
(Mertens exact, ω at its limit) sits above the data at the fourth decade by
more than sampling allows; C2 (ω at finite u) does not, except marginally at
B12. That is a measured preference between two heuristics, on one run, with
no sealed row behind it; a sharper prereg at the next decade would seal the
band at a few se, not at 0.0015. No fit was made to any of it.

## 5. The reproduction target restated [MEASURED]

Any analytic bound on the crossing must reproduce, alongside m6/m7/m8 =
0.050/0.040/0.032 (`attack-quadpoint-02.md` §4): **m9/m10/m11/m12 =
0.026/0.020/0.016/0.013** (tails 2–3 SEC G, printed to three decimals; four
decimals in §3), K* band means 41.49 → 54.99 → 73.03 → 96.59, y* band means
197.22 → 272.88 → 384.70 → 532.71. The caveat TODO Z2 carries on the old
target applies with more force here: the zero-parameter main term C2 hits
every one of these numbers to the printed precision (m to four decimals at
all four bands, y* to 0.7 at B12), so the target is necessary for any
proof-side bound and is nowhere near sufficient, and a bound that is loose by
7.82 → 10.13 (`attack-0829n-X-upper.md` §5) fails it for the reason that note
already gives.

## 6. Can the third decade tell 0.280438 from 0.280730? [MEASURED: no]

The sampling half of §2's rule passes from B10 on: gap/se = 2.10, 3.58, 5.60,
9.09 (B9–B12). The model half fails as pre-declared, and the data show why it
must. The measured band means lie below BOTH asymptotes at every band, by
0.00368/0.00339 (B9), 0.00329/0.00300, 0.00215/0.00186, 0.00198/0.00169
(B12), that is by six to twelve times the 0.000291 that separates them. What
the run measures is the deficit series; which constant it tends to is
supplied by the comparator that models the deficit (C2's ω-form converges to
1/u* by construction, `import-rough-anatomy.md` §2.2), not by any band mean.
Under C2's own forward table the deficit first drops to the size of the gap
near Q = 10⁷ (`import-rough-anatomy.md` §3, 0.28019 at 10000019, scratchpad
grade), two decades in Q past this run and about 10⁴ times its total window
length, which this engine does not reach. So: the decade cannot distinguish
the two asymptotes, the error bar is not the obstacle, and no run of this
kind at any reachable Q will, because the deficit it would have to see
through is a model term.

## 7. NOT REACHED

- Nothing asymptotic: four HIT decades of a heuristic main term on {T ≥ 1}
  are a measurement; the all-Q form stays stronger than TPC and untested.
- No sealed row at the sampling-error scale; §4's post-hoc C1-versus-C2
  preference needs its own prereg before it is more than a remark.
- The combined comparator (ω at finite u AND the per-anchor prime-grid
  discreteness, `import-rough-anatomy.md` §2.3) was not separated from C2's
  residual; C2 already includes both.
- No red-team pass; HELD. The seal is by disk and tail order, not by commit,
  and the author's word that no anchor above 10007 was seen before tail 1.

---

*Producer and custody: `research/history/staging/blind-0830-quadpoint-31607.js`,
three tails, each `--check` verified. Cited, never recomputed: the v1/v2/v3
calibration constants (their embedded OUTPUT blocks, lines above), the
scratchpad-grade forward values of `u2-engine-depth.md` §5 and
`import-rough-anatomy.md` §3, which are printed beside the producer's own
comparators as a cross-check and never asserted. History layer: process
record, staging. See `research/history/CHANGELOG.md` for the corpus rule.*
