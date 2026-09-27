# The fifth decade sealed on the sampling-error scale: which finite-size comparator is the depth law's main term, the exact-Mertens partial product (C1) or the ω-at-finite-u crossing (C2), tested blind past Q = 100003

<!-- ledger
id: Q-quadpoint-c1c2-0830
status: ANSWERED
todo: Z2
question: Does the fourth decade's post-hoc, unsealed preference for the omega-form comparator C2 over the exact-Mertens comparator C1 (C1 above the data by 3.46 and 8.83 se at B11 and B12, C2 within 2.82 se) survive a sealed blind test at the fifth decade, Q in (100003, 316243], and what does that say about which mechanism explains the depth law's drift?
verdict: MEASURED, sealed before the run and scored blind on 17702 new anchors, and it decides nothing asymptotic: the sealed D1 row HITs at both B13 and B14 (C1 above the data by 13.33 and 23.82 se, C2 within 1.26 and 1.82 se), so by the sealed rule the omega-at-finite-u crossing of import-rough-anatomy.md §2.1 is CONFIRMED over the exact-Mertens product of u2-engine-depth.md §5 as the depth law's main term at the sampling scale, while both still HIT every ±0.0015 row, the kill rows on C2 all HIT, K*/pool falls 0.013 -> 0.010 -> 0.008 with no bend, and the band means sit 0.0012 to 0.0018 below both asymptotes, so the two constants 0.280438 and 0.280730 stay unseparated by the pre-declared rule and the run separates two mechanisms, not two limits.
-->

> **RIDER 2026-08-30 (orchestrator, from `redteam-0830-zone.md`, which
> reproduced the z's at B9–B12 and class A at B13/B14 and all four point
> anchors exactly).** Three weakenings, none touching the C1-versus-C2
> ruling: (i) the OLD R2 row at B14 is a boundary call (−0.00150) that a
> 1-in-8 subsample reads as −0.00148 and scores HIT, so two of 42 rows are
> decided inside the sampling noise; (ii) the custody line "three tails,
> one code-sha256" is NOT evidence, because `qc/tailfmt.js`:148 forces a
> shared hash on any multi-tail file; (iii) the unscored y* check carries a
> Jensen bias of +0.43/+0.44 in y, which exceeds the C2 gap it is read as
> corroborating, so it corroborates nothing. Three separate attacks on the
> D-row statistic failed (paired se 0.999–1.006, C1's 7.5 = 2·15/4 derived
> not fitted, band-edge selection under 0.1 se).

*(2026-08-30. Staging note; nothing here is integrated into a live document.
HELD. Producer, formally embedded, three tails:
`research/history/staging/blind-0830-quadpoint-c1c2.js` (tail 1 `--stage
seal`, tail 2 `--stage b13`, tail 3 `--stage b14`). Calibration marked per
claim: PROVEN, VERIFIED (exact computation), MEASURED, HEURISTIC, OPEN,
REFUTED. Every figure below sits in that producer's OUTPUT tails or is quoted
from an embedded OUTPUT block of `blind-0830-quadpoint-31607.js`,
`attack-quadpoint-02.js` or `attack-quadpoint-03.js` by line; nothing is
transcribed by hand. This note edits no other file. No git command was run
by the author, so the seal is by disk order and by the producer's tail order,
not by commit.)*

---

## 0. What is open first, and the label

**Label (i), measurement.** y*(Q) = p_{K*}, the deepest pool prime the
capture-identity certificate needs, is defined only where T(Q) ≥ 1
(`quadpoint-identity-01.md` §2, TODO Z2's 2026-08-27 quantifier). Every
anchor this note runs has T ≥ 1 (asserted per anchor), so nothing below can
test the quantifier, and every law is stated on {T ≥ 1}. A decade of HITs on
that set measures a heuristic main term's finite-size behaviour and is not
evidence for the all-Q form, which is stronger than TPC
(`attack-wrongdirection-audit.md` §3.2, cited through TODO Z2). Whatever the
score, nothing here moves 4.2665 → 2, nothing is a Z₂ bound, and the decade
cannot separate the two asymptotes 0.280438 and 0.280730 (§2, rule (c) fails
before the run).

**What is being tested, and why it needs a seal.** At the fourth decade both
finite-size comparators HIT every sealed row at ±0.0015 on L = ln y*/ln h;
then, post hoc and unsealed, C1 (exact Mertens, `u2-engine-depth.md` §5) sat
above the data by more than sampling allows at B11 and B12 while C2 (ω at
finite u, `import-rough-anatomy.md` §2.1) sat closer
(`blind-0830-quadpoint-31607.md` §4, "Post-hoc, not sealed"). A preference
noticed after a run is worth nothing until it is sealed and tested on data
nobody has seen. Tail 1 seals it; tails 2 and 3 run the fifth decade.

**Base rate, written before tails 2 and 3 were read.** The C1 − C2 forecast
gap at B13/B14 is 9 to 20 predicted se (tail 1 SEC E), so the outcome is
decided by where the data sit relative to C2 alone, and C2's own residual ran
−1.62, −1.05, −0.39, −2.82 se over B9–B12 (tail 1 SEC D). The author's prior:
class A (D1 HIT) at a given band about 0.5, class F with C2 closer about
0.35, class B (data climb to C1) under 0.1, class N about 0 given the gap.
CONFIRMED at both bands is therefore expected at about 0.25 to 0.3.

**Brief errors and rounding slips found while verifying at the record.**
(a) The brief and `blind-0830-quadpoint-31607.md` §4 give C1's excess at B11
as 3.6 se; at full precision it is −3.46 se (tail 1 SEC D: residual −0.00018
over se 0.000052). The 3.6 is the rounded residual over the rounded se
(0.00018/0.00005); the sign of the reading does not change and it still
clears 3. B9's 1.6 reads −1.70 for C1 and −1.62 for C2 at full precision;
B12's 8.8 reads −8.83. (b) The brief says C2 "does not" sit above the data:
at B12 it does, by −2.82 se (the earlier note's "except marginally at B12"),
so under this note's own sealed rule the fourth decade's last band is already
class F, not class A (tail 1 SEC D). (c) Every other figure the brief quotes
(K*/pool 0.026/0.020/0.016/0.013; C2 residuals −0.00022/−0.00009/−0.00002/
−0.00009; "3.6 to 8.8 se"; the 100003 endpoint; ~200 s for the fourth
decade) was found at its record and is asserted digit for digit in tail 1
SEC C2.

---

## 1. Width audit, calibration gate, fourth-decade custody gate (tail 1)

**Width audit at the new level.** Primes sieved to 316800; anchors 7..316243,
27292 of them; next prime above 316243 is 316259; largest prime gap among
anchors 86 at Q = 155921; largest window width 43909320 (< 2³¹, asserted);
largest hi = 100019755081 (< 2⁵³, a safe integer, asserted). Every value is
an exact double, first multiples formed as `lo + ((r − lo % r) % r)`, offsets
in an Int32Array, no bit shifts. Nothing else in the engine changed from the
fourth decade's producer: the identity path of `attack-quadpoint-03.js`
(first-touch lpf by the actives ascending, T by the wheel-30 channel, K* as
least K with T − X(K) ≥ 1, no pool cap) and the independent full-mask
recount of T.

**Bands, defined as the earlier decades were.** B13 = (100003, 177828]
(10^5.25 = 177827.94, rounded as 56234 was for 10^4.75), B14 = (177828,
316243]. The decade point 10^5.5 = 316227.77 has 316223 as the largest prime
below it and 316241 as the first above; the edge is 316243, the anchor
`import-rough-anatomy.md` §3's standing forward table names, for the same
reason B12 ran to the standing forecast's 100003 and not to 10⁵ (tail 1 SEC
A asserts all three primes). Anchor counts: B13 = 6551, B14 = 11151. Point
anchors: 177823 (largest prime ≤ 177828) and 316243.

**Calibration gate, Q ≤ 10007 [VERIFIED].** The fourth decade's gate is
carried unchanged: 1227 anchors, the 24 v1 rows, the 19 v2 rows, the K = 0
list, six band and twin-Q tables, six v3 SEC 2 rows, top-band 0.9843, the
largest K* and worst fraction, the independent T recount: ALL REPRODUCED,
0 failures (tail 1 SEC C).

**Fourth-decade custody gate [VERIFIED], rule 9 of the brief.** B9–B12 were
re-run with this engine, 8363 anchors, and asserted digit for digit against
`blind-0830-quadpoint-31607.js` tails 1–3: per band n, m, K* mean, y* mean,
L, sd_L, se_L, max, largest K* with its Q and pool, twin-Q n/mean/max, the
C2 and C1 residuals on L (−0.00022/−0.00009/−0.00002/−0.00009 and
−0.00023/−0.00018/−0.00018/−0.00028), gap/se, the 3-decimal reproduction
target 0.026/0.020/0.016/0.013, all 16 sealed forecast rows of that note's
SEC E, the two point rows (313 at 31607, 631 at 100003, with K*, pool, T,
L and all four forecasts), the T recount on every 25th anchor, and the
fourth decade's width audit (gap 72 at 31397, width 11484288, hi
10003800361): ALL REPRODUCED (tail 1 SEC C2). The seal stage then asserts
"anchors above 100003 sieved by this stage" = 0, a mechanical guard on the
contamination claim of §2.

**ω gates.** ω(2) = 0.500000, 3ω(3) = 1.693147, ω(12) = 0.561459; u* =
3.5658466, θ_new = 0.280438, θ_old = 0.280730, difference 0.000291 (tail 1
SEC B). The comparator reproduces `import-rough-anatomy.md` §3's
scratchpad-grade forward row at 316243 exactly (C2: K 192, y 1187,
L 0.27949; printed, not asserted).

## 2. Pre-registration, SEALED in tail 1 before any anchor above 100003 ran

**The comparators** are the fourth decade's four, unchanged and computed per
anchor at h = Q² with pool = π(Q) − 3, then band-averaged: OLD (θ_old =
1/(2e^γ)), NEW (θ_new = 1/u*), C1 (least active y with ∏_{7≤p≤y}(1 − 1/p) ≤
7.5/ln h), C2 (least K ≥ 1 with ω(ln h/ln p_K) < ∏_{K<i≤nR}(1 − 1/p_i)).
None has a parameter; none was touched after the fourth decade.

**Carried rows, unchanged.** R1–R8 with the fourth decade's tolerances (R1
±5% on K*/pool, R2 ±0.0015 on L, R3 ±5% on y*, R4 ±0.006, R5 no bend, R6 sup
quiet and largest K* ≤ 2 × C2 mean K*, R7 twin-Q within 0.005, R8 point
y* within ±25%), scored per comparator per band. R1–R3 on C2 remain the kill
rows of the finite-size law (K1 below). These rows are expected to HIT on C1
and C2 alike: their forecasts differ by 0.0002 in L and the band is 0.0015.

**The discriminating statistic, new and sealed.** Per band b and comparator
c ∈ {C1, C2}: z_c(b) = (L_b − F_c(b))/se_b, with L_b the measured band mean
of ln y*/ln h, F_c(b) the comparator's own band mean (no sieving), and
se_b = sd_b/√n_b from the measured in-band sample sd. Rows, per band:

| row | reading | HIT iff |
|---|---|---|
| D1 | C2-preferred | z_C1 ≤ −3 (C1 above the data at ≥ 3 se, the post-hoc sign) AND \|z_C2\| ≤ 2 |
| D2 | C1-preferred (the converse) | \|z_C2\| ≥ 3 AND \|z_C1\| ≤ 2 |
| D3 | C2 closer | \|z_C2\| < \|z_C1\| (necessary for D1, not sufficient) |

Outcome classes: A = D1 HIT; B = D2 HIT; N = both |z| ≤ 2 (not separable
at this n); F = neither, and not N (both main terms off at the sampling
scale; D3 says which is closer, and closer is not a HIT). The y* band mean's
z is printed as a check and is not scored.

**Kill rules, sealed (tail 1 SEC E, verbatim in substance).** K1: any MISS
on R1–R3(C2) at a band marks the finite-size law REFUTED at that band, no
repair. K2: the C2-preferred reading ("C2 is the better main term; the drift
mechanism is the ω-at-finite-u crossing, not the exact partial product") is
CONFIRMED at the sampling scale iff D1 HITs at both bands; PARTIAL iff D1
HITs at one band and the other is class F with D3 HIT; REFUTED iff D2 HITs
at either band or D3 MISSes at both. K3: |z_C2| > 3 at both bands records C2
itself as off at the sampling scale (a missing finite-size term), without
touching the ±0.0015 law.

**Sealed forecast values (tail 1 SEC E).**

| band | n | comp | K*/pool | L | y* | K* | se_L (sd B12) | se_L (trend) |
|---|---|---|---|---|---|---|---|---|
| B13 | 6551 | C2 | 0.01004 | 0.27897 | 737.02 | 127.92 | 0.000025 | 0.000020 |
| B13 | 6551 | C1 | 0.01009 | 0.27919 | 740.94 | 128.49 | | |
| B13 | 6551 | OLD | 0.01037 | 0.28073 | 768.05 | 132.01 | | |
| B13 | 6551 | NEW | 0.01031 | 0.28044 | 762.77 | 131.20 | | |
| B14 | 11151 | C2 | 0.00787 | 0.27925 | 1022.55 | 169.23 | 0.000019 | 0.000012 |
| B14 | 11151 | C1 | 0.00792 | 0.27949 | 1028.80 | 170.11 | | |
| B14 | 11151 | OLD | 0.00810 | 0.28073 | 1061.02 | 174.09 | | |
| B14 | 11151 | NEW | 0.00805 | 0.28044 | 1053.36 | 173.03 | | |

The C1 − C2 forecast gap in L is 0.00022 at B13 (9.00 se on sd(B12) =
0.00200 held fixed, 11.23 se on the trend sd) and 0.00024 at B14 (12.86 and
20.01 se). So the ±0.0015 rows cannot tell C1 from C2 and the D rows can,
by a margin of 9 to 20 se, which means the outcome is set by where the data
sit relative to C2 alone. Point forecasts (R8): y*(177823) = 857 (C2), 859
(C1), 886.5 (OLD), 880.2 (NEW); y*(316243) = 1187, 1193, 1224.7, 1215.7.
The C2 deficit against θ_new is forecast at 0.00147 (B13) and 0.00119
(B14), five and four times the 0.000291 asymptote gap.

**Pre-declared expectations (tail 1 SEC E, in the tail's own words in
substance).** (i) R1–R3 on C2 and C1 HIT at both bands; OLD/NEW MISS R2 and
HIT R1/R3. (ii) D1 is the test: class A if C2's residual stays within 2 se,
class F with D3 HIT if C2 is off by more than 2 se on the negative side as
at B12 (−2.82 se), class B only if the data climb to C1. (iii) The asymptotes
are not separable: rule (c) of the fourth decade needs the C2 rms residual
below 0.000097 and it reads 0.000129 on B9–B12 (0.000294 on B3–B8), and the
forecast deficit below both asymptotes is four to six times their
difference. (iv) y* exists iff T ≥ 1, every anchor is asserted T ≥ 1, the
run tests nothing about the quantifier, and nothing asymptotic moves
whatever the score.

**Dry run of the D rows on the fourth decade (tail 1 SEC D; post hoc,
disclosed).** B9: C1 −1.70 se, C2 −1.62 se, class N. B10: −2.23, −1.05,
class F, D3 HIT. B11: −3.46, −0.39, class A. B12: −8.83, −2.82, class F, D3
HIT. Under this note's own rule the fourth decade reads one A, two F and one
N, with D3 HIT at all four; that is what the rule would have said on the
data that suggested it, and it is weaker than "C2 does not sit above the
data". The y* check runs the same way (C1 −3.27 se at B12, C2 −0.74 se).

**Contamination disclosure.** No anchor above Q = 100003 was run, timed or
seen by the author before tail 1 was embedded; the seal stage asserts that
it sieved none (SEC C2's last assertion). The compute decision (whole decade
or part) was taken from the fourth decade's recorded elapsed figure and the
window-length ratio, with no slice timed on the new range, so that no
fifth-decade anchor exists outside the bound tails. §0's base rate and
§1–§2 of this note were written while tails 2 and 3 were running and before
their output was read.

**Seal.** Tail 1 was embedded with invocation
`node research/history/staging/blind-0830-quadpoint-c1c2.js --stage seal`,
code-sha256 `a626a40fa88fb4fc75b14fe07c3871fe35a9141389b3655c8d525a87aff1a935`,
out-sha256 `9ab9c64e80a9b8a82d693c98532fd5821a56bb2f5d28ef28f0815ed3671a3038`,
74 body lines, and this section was completed against that tail before tail
2's output was read.

## 3. The run [MEASURED, tails 2 and 3; VERIFIED where marked]

**Budget decision, before the run.** From the fourth decade's recorded 195.9
s for a window length of 9e9 and the fifth decade's window length of 9e10,
the decade was estimated at a few thousand seconds and run in full, B13 in
tail 2 and B14 in tail 3, each with its predecessor re-run silently for the
R5/R6 chain. No slice was timed on the new range (§2, contamination). Tail
2 ran 6551 + 3890 anchors in 1162.9 s (embed fingerprint), well above the
fourth decade's 195.9 s scaled by window length, the window tables having
outgrown the cache; the whole run stays inside the brief's four hours.

Tail 2 (`--stage b13`) re-ran B12 and asserted it against the fourth decade
(m = 0.0128, K* mean 96.59, max 0.017, L = 0.27875), then ran B13. Every
one of the 6551 anchors has T ≥ 1 and K* > 0 (asserted; "0 with T = 0"), so
y* is defined everywhere and the quantifier is untested by construction.
The independent composite sieve recounted T on every 25th anchor with 0
mismatches [VERIFIED].

Band statistics, measured (tails 2–3 SEC F):

| band | n | m = K*/pool | K* mean | y* mean | L = ln y*/ln h | sd_L | se_L | max K*/pool | largest K* (Q, pool) | twin-Q n, mean, max |
|---|---|---|---|---|---|---|---|---|---|---|
| B13 | 6551 | 0.0100 | 127.91 | 737.02 | 0.27894 | 0.00149 | 0.000018 | 0.013 | 167 (169007, 15409) | 727, 0.0101, 0.013 |
| B14 | 11151 | 0.0079 | 169.19 | 1022.47 | 0.27923 | 0.00117 | 0.000011 | 0.010 | 215 (298211, 25860) | 1183, 0.0079, 0.010 |

Tail 3 (`--stage b14`) re-ran B13 for the chain and printed the same n,
m, max, K* mean, y* mean, L and sd as tail 2 (a cross-tail consistency
check, not an assertion), then ran B14: 11151 anchors, all with T ≥ 1 and
K* > 0, T recounted on every 25th anchor with 0 mismatches [VERIFIED].
Tail 3 ran 1371.7 s, the seal tail 250.2 s (embed fingerprints).

The per-anchor scatter keeps shrinking (sd_L 0.00200 at B12, 0.00149 at
B13, 0.00117 at B14), so the measured se, 0.000018 and 0.000011, sits below
both sealed predictions (0.000025/0.000019 on sd(B12) held fixed,
0.000020/0.000012 on the trend); the sealed rule uses the measured one, as
written. The largest K* in each band, 167 and 215, is again a twin-Q anchor
(Q = 169007 and 298211, the narrowest windows), and the subfamily's band
mean sits within 0.0001 of the all-band mean at both bands.

## 4. The score, row by row [MEASURED against §2's seal; no row repaired]

**Carried rows.**

| band | R1 C2/C1/OLD/NEW | R2 C2/C1/OLD/NEW (residual) | R3 C2/C1/OLD/NEW | R4 | R5 | R6 | R7 | score |
|---|---|---|---|---|---|---|---|---|
| B13 | HIT/HIT/HIT/HIT | HIT (−0.00002)/HIT (−0.00025)/MISS (−0.00179)/HIT (−0.00150) | HIT/HIT/HIT/HIT | HIT/HIT | no bend | quiet | HIT | 16 HIT, 1 MISS |
| B14 | HIT/HIT/HIT/HIT | HIT (−0.00002)/HIT (−0.00026)/MISS (−0.00150)/HIT (−0.00121) | HIT/HIT/HIT/HIT | HIT/HIT | no bend | quiet | HIT | 16 HIT, 1 MISS |

R8: y*(177823) = 853 (K* = 144 of pool 16141, T = 12776), HIT against all
four (C2 857, C1 859, OLD 886.5, NEW 880.2); y*(316243) = 1171 (K* = 190 of
27292, T = 20882), HIT against all four (1187, 1193, 1224.7, 1215.7). Carried
rows: 34 sealed R1–R7 rows plus 8 R8 rows, 40 HIT, 2 MISS.

One pre-declared expectation failed and is recorded as such: §2 (i) said
OLD and NEW would MISS R2 at both bands. NEW HITs at both (−0.00150 at B13,
on the band's edge and read as HIT by the scorer at full precision; −0.00121
at B14); OLD MISSes at both, at B14 by −0.00150 read as MISS at full
precision. The forecast NEW deficits were 0.00147 and 0.00119 (§2), so this
is the sealed ±0.0015 being reached by a shrinking finite-size deficit, not
the asymptote being reached: the OLD and NEW residuals are 0.0012 to
0.0018 against measured se of 0.000011 and 0.000018, two orders of
magnitude, which is the reason the D rows exist.

**The discriminating rows (tails 2–3 SEC F, "the discriminating rows").**

| band | se_L | z_C1 | z_C2 | C1 − C2 gap in se | D1 | D2 | D3 | K3 | class |
|---|---|---|---|---|---|---|---|---|---|
| B13 | 0.000018 | −13.33 | −1.26 | 12.07 | HIT | MISS | HIT | no | A (C2-preferred) |
| B14 | 0.000011 | −23.82 | −1.82 | 22.01 | HIT | MISS | HIT | no | A (C2-preferred) |

The unscored y* check agrees in direction at both bands: y* − C1 = −3.92
(−4.23 se) and −6.33 (−6.88 se); y* − C2 = +0.00 (+0.00 se) and −0.08
(−0.09 se).

**The sealed verdicts, applied.** K1: no MISS on R1–R3(C2) at either band;
the finite-size law is not refuted on this range. K2: D1 HITs at both
bands, so the C2-preferred reading is CONFIRMED at the sampling scale,
blind, on 17702 anchors nobody had seen: the exact-Mertens comparator C1
sits above the data by 13 and 24 se and the ω-at-finite-u comparator C2 sits
within 2 se, with the same sign and a widening margin from the fourth
decade's post-hoc −3.46/−8.83 against −0.39/−2.82. K3: not triggered.

**Reading, flat.** This is a measured preference between two heuristic main
terms, on {T ≥ 1}, over Q ≤ 316243; it is now sealed and blind where the
fourth decade's was post hoc, and that is the whole gain. C1 still HITs
every ±0.0015 row, so `u2-engine-depth.md` §5's statement that the exact
partial product reproduces the drift's size and sign stands at the
precision it was made; what fails is C1 as the main term at the precision
the data now have. C2's residual, −0.00002 at both bands, is the same
figure as at B11 and is inside 2 se, so no missing term is visible at this
n; a sixth decade at se ≈ 0.000007 would test that. Nothing asymptotic
moves: the band means sit below both asymptotes by 0.00179/0.00150 (B13)
and 0.00150/0.00121 (B14), four to six times their 0.000291 difference,
and rule (c) failed before the run.

**Post-hoc, not sealed, stated as such.** C1 tends to θ_old and C2 to
θ_new by construction, and one might read "C1 rejected at 24 se, C2 within
2 se" as the decade choosing 1/u* over 1/(2e^γ). It does not: the two
comparators differ in their finite-size terms as well as in their limits
(C2 carries ω at finite u and the Mertens ratio inside one crossing,
`import-rough-anatomy.md` §2.2; C1 carries the Mertens product against
7.5/ln h with ω at its limit), no comparator with C2's mechanism and C1's
limit was defined or sealed, and the deficit the data show is 4 to 6 times
the gap between the limits. The run separates the two mechanisms, not the
two constants; §2 (iii) stands as declared.

## 5. The reproduction target extended [MEASURED]

Any analytic bound on the crossing must reproduce, alongside m6/m7/m8 =
0.050/0.040/0.032 (`attack-quadpoint-02.md` §4) and m9–m12 =
0.026/0.020/0.016/0.013 (`blind-0830-quadpoint-31607.md` §5): **m13/m14 =
0.010/0.008** (tails 2–3 SEC G, three decimals; 0.0100 and 0.0079 at four),
K* band means 127.91 → 169.19, y* band means 737.02 → 1022.47, L band means
0.27894 → 0.27923. The standing caveat applies with more force again: C2
hits every one of these to the printed precision (m to four decimals at
both bands, y* to 0.00 at B13 and 0.08 at B14, L to 0.00002), so the target
is necessary for any proof-side bound and nowhere near sufficient, and a
bound loose by 7.82 → 10.13 (`attack-0829n-X-upper.md` §5) fails it for the
reason that note gives. What this note adds to the target is a precision
statement: from B11 on, a main term that reproduces the band means to
±0.0015 in L is not enough to be the main term, and C1 is the worked
example.

## 6. Consequence for the two HELD notes, as text for the orchestrator (not applied; this note edits nothing)

For `u2-engine-depth.md` §5 (HELD, scratchpad-grade) and TODO Z2's
paragraph quoting it, the orchestrator should write, in substance: the
exact-partial-product main term reproduces the ln y*/ln h band means to
within ±0.0015 through Q = 316243 (blind, sealed rows, four and five
decades), and it is REJECTED as the main term at the sampling-error scale
from B11 on, sitting above the data by 3.46, 8.83, 13.33 and 23.82 se at
B11–B14 with the same sign throughout (`blind-0830-quadpoint-c1c2.md` §4,
sealed D1 rows HIT at B13 and B14); the mechanism that tracks the data to
2 se on 17702 blind anchors is `import-rough-anatomy.md` §2.1's ω-form, the
crossing u·ω(u) = 2M with the Mertens ratio M inside it, so "the drift is a
finite-size Mertens artefact" should read "the drift is the ω-at-finite-u
crossing with the Mertens ratio; the Mertens product alone is off by 13 to
24 se by the fifth decade", and §5's "closes on the numbers" should carry
the precision at which it closes. For `import-rough-anatomy.md` §0/§3
(HELD, scratchpad-grade, three never-red-teamed premises), the orchestrator
should write that the §2.1 comparator now has an embedded producer and a
blind confirmation at the band-mean level over B9–B14 (residuals −0.00022,
−0.00009, −0.00002, −0.00009, −0.00002, −0.00002 on L; 1.62, 1.05, 0.39,
2.82, 1.26, 1.82 se), that its §3 forward row at 316243 (K 192, y 1187)
was reproduced exactly by the embedded comparator and the anchor itself
measured y* = 1171 (K* = 190), and that none of this touches the premises
the note flags as un-red-teamed, the asymptote 1/u* (not separable, §4), or
the main term's heuristic status. Item Z2's reproduction target should be
extended with §5's numbers and the precision statement. Both notes stay
HELD.

## 7. NOT REACHED

- Nothing asymptotic: five HIT decades of a heuristic main term on {T ≥ 1}
  are a measurement; the all-Q form stays stronger than TPC and untested;
  the two asymptotes stay unseparated by rule (c).
- No comparator with C2's mechanism and C1's limit, which is what a test of
  the constants alone would need; not defined, not sealed, not run.
- No sixth decade (Q to 10⁶ would cost about ten times tail 3 by window
  length, more with the cache) and no test of whether C2's −0.00002 at
  B11, B13 and B14 is a missing term or noise at se ≈ 0.00001.
- No red-team pass; HELD. The seal is by disk and tail order, not by
  commit, and the author's word that no anchor above 100003 was seen
  before tail 1, backed by tail 1's own sieved-above-100003 = 0 assertion.
- `research/QUESTIONS.md` was regenerated while this note's ledger block
  still read OPEN; its row needs regenerating (this note edits no other
  file).

---

*Producer and custody: `research/history/staging/blind-0830-quadpoint-c1c2.js`,
three tails, one code-sha256, no --force anywhere. Cited, never recomputed:
the v1/v2/v3 calibration constants and the fourth decade's tails (asserted
in tail 1 SEC C and C2), the scratchpad-grade forward row of
`import-rough-anatomy.md` §3 (printed beside the producer's own comparator
and never asserted). History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
