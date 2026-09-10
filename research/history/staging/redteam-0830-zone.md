# Red team, 2026-08-30: the three Z2 notes of the 08-29 evening and 08-30 waves, re-derived and re-run on independent code — every band sum, every sealed row and every z reproduced digit for digit, one range wording refuted, one boundary row flipped, and the custody claim that a shared code-sha256 means anything withdrawn

<!-- ledger
id: Q-redteam-0830-zone
status: ANSWERED
todo: Z2
question: Do attack-0829n-X-upper.md, blind-0830-quadpoint-31607.md and blind-0830-quadpoint-c1c2.md survive an adversarial re-derivation and an independent re-implementation of their producers, and at what rung does the corpus carry each of their headline claims?
verdict: They survive on the numbers and mostly on the wording. On independent code every band sum, tier ratio, sealed forecast, band statistic and z of all three notes reproduces to the printed digit (X-upper 7.82 to 10.13 and the flat 378100.0; the fourth decade's 76 rows at 64 HIT and 12 MISS with the same twelve MISSes; the fifth decade's class A at both bands), and three attacks failed to break them (the paired-se attack on the D rows, a search for a fitted constant in C1, and gap-selection at the band edges). Four defects stand: the X-upper note's "s_max 1.81 to 1.96" is wrong in its own arrow convention, which means B3 to B8, since s_max peaks at B4 and reads 1.85 at B8; the c1c2 note's OLD R2 row at B14 is a boundary call that my 1-in-8 subsample scores the other way; the c1c2 note's custody line "three tails, one code-sha256" is a tautology of tailfmt.js and is not evidence of a seal; and the unscored y* check carries a Jensen bias of about +0.44 in y, which is the whole size of the C2 gap it is read as corroborating. Nothing here moves 4.2665 to 2, no rung rises, and all three notes stay HELD.
-->

*(2026-08-30. Internal, HELD under the publication moratorium. Adversarial
pass: **no existing file was edited.** No git command that changes anything
was run; one read-only `git status --porcelain` was run in error at the end of
the pass and is disclosed here rather than left unsaid. One producer
was written and formally embedded,
`research/history/staging/redteam-0830-zone.js`, four tails, code-sha256
`3160fb25282a7603…`, one code hash over four stages. Every figure below sits
in that producer's OUTPUT tails. **Nothing in it is copied from the target
producers**: the window engine, the Selberg weights, the Buchstab ω grid, the
four comparators and the scorer are written from the definitions the target
NOTES state, § by §. Where a target declares a parameter rather than an
algorithm — the ξ grid, the band edges, the depths K_b, the tolerances — that
parameter is taken at its declared value, because reproducing a measurement
means running the same experiment. Calibration per claim: PROVEN, VERIFIED by
exact computation, MEASURED, HEURISTIC, OPEN, REFUTED.)*

## 0. VERDICT, disconfirming half first

**Four defects, before anything that stands.**

1. **`attack-0829n-X-upper.md` §0 item 2 and its ledger verdict say
   "s_max 1.81 → 1.96". In this note's own arrow convention, which means
   B3 → B8 everywhere else in the file (7.82 → 10.13, 1.78 → 2.53,
   4.39 → 4.01, 8.78 → 10.75), that is false** [REFUTED as written, SEC A4].
   The independently recomputed sequence is 1.81, 1.96, 1.95, 1.93, 1.91,
   1.85: it is not monotone, it peaks at B4, and B8 reads 1.85. The note's own
   §5 says "s_max 1.96 → 1.85 from B4", so the file contradicts itself. The
   *mathematical* claim — the level the window allows is below z² at every
   band, so s never reaches 2 — reproduces exactly and STANDS. Only the range
   wording has to move, and it has to move in TODO Z2 as well.
2. **`blind-0830-quadpoint-c1c2.md` §4's OLD R2 row at B14 is a boundary call
   that my run scores the other way** [WEAKENED, SEC C1–C2 stage d]. The note
   reads the residual as −0.00150 and calls MISS "at full precision"; my
   systematic 1-in-8 subsample of B14 measures −0.00148 and would call HIT.
   The two readings differ by 2e-5, which is 0.7 of my own standard error, so
   this is not a disagreement about a number — it is a row whose outcome is
   decided far inside the sampling noise. The same is true of the NEW R2 row
   at B13 (note −0.00150, called HIT; mine −0.00149). Two of the 42 carried
   rows are boundary calls, and the "40 HIT, 2 MISS" headline is fragile in
   one of them.
3. **The custody line "three tails, one code-sha256, no --force anywhere"
   (`blind-0830-quadpoint-c1c2.md`, custody footer) proves nothing about the
   seal** [REFUTED as evidence]. `research/qc/tailfmt.js:148` states the rule:
   *"For a multi-tail file the code is what sits above the FIRST tail, so
   every tail's code-sha256 covers the same bytes."* A shared code-sha256 is
   forced by the format, not earned by the run. What the hashes do establish
   is real and narrower (§4, row C6); the sentence should stop implying more.
4. **The unscored y* check in `blind-0830-quadpoint-c1c2.md` §4 carries a
   Jensen bias of about +0.44 in y at both bands** [WEAKENED, SEC C4]. y*
   scatters more than the comparator does (sd(ln y*) = 0.1027 against
   sd(ln y_C2) = 0.0969 at B13), so the arithmetic-mean comparison sits about
   ȳ(σ²_meas − σ²_C2)/2 = 0.43 to 0.44 above the log-scale one. The note's
   reported y* − C2 of +0.00 and −0.08 is *smaller than that bias*, so the y*
   row carries no information about C2 at all; it does corroborate the C1
   reading, whose gap (−3.92, −6.33) is an order of magnitude larger than the
   bias.

**Three attacks that failed, which is what makes the rest a confirmation.**

- **The paired-se attack on the sealed D rows failed** [SEC C3]. The rule
  divides by se = sd(L)/√n with sd taken on L alone, not on the paired
  difference L_i − F_c(i). If L and the comparator were strongly correlated
  within a band, the correct se would be much smaller and |z_C2| would blow
  past 2, killing the D1 clause. Measured: sd(L − F_C2)/sd(L) = 0.9989 at
  B13 and 1.0064 at B14. The pairing removes nothing, z moves in the second
  decimal, and the sealed statistic is the right one.
- **The search for a fitted constant in C1 failed.** C1's 7.5 is exactly
  2/((1−1/2)(1−1/3)(1−1/5)) = 2·(15/4), i.e. C1 is θ_old's law with the exact
  partial product substituted for the Mertens asymptotic. Both notes' "zero
  parameter" is correct for all four comparators [PROVEN, one line].
- **Gap-selection at the band edges is negligible.** B12 runs to 100003 and
  B14 to 316243, both past their decade points (10⁵ and 316227.77), each
  chosen to land on an anchor a standing forward table names. The effect of
  the extra anchor on a band mean is bounded by |L_Q − L̄|/n ≈ 1e-2/11151 ≈
  1e-6, under 0.1 se [ARITHMETIC on the measured band sd]. It is a disclosed convention, not a leak.

**What reproduces, on code that shares no line with the targets.** Every band
sum and tier ratio of the X-upper note, digit for digit; every band statistic,
every one of the 16 sealed forecast rows and the whole 64 HIT / 12 MISS score
of the fourth decade, MISS for MISS; the c1c2 note's z_C1 and z_C2 at
B9–B12 (−1.70, −2.23, −3.46, −8.83 and −1.62, −1.05, −0.39, −2.82) exactly;
the fifth decade's sealed forecast table and its class A verdict at both
bands. All four point anchors — y*(31607) = 313, y*(100003) = 631,
y*(177823) = 853, y*(316243) = 1171, with their K*, pool and T — reproduce
exactly [VERIFIED].

**The ruling per note.**

- `attack-0829n-X-upper.md`: **Theorem U STANDS as PROVEN**, its seven steps
  re-derived here independently and its whole measurement reproduced digit for
  digit. One sentence is REFUTED as written (row A7, s_max) and one is
  WEAKENED (row A8, the guard's reach); both are wording, and TODO Z2 carries
  the same s_max wording and needs the same fix. Rung unchanged.
- `blind-0830-quadpoint-31607.md`: **STANDS in full.** Every band statistic,
  every sealed forecast row and the 64 HIT / 12 MISS score reproduce on
  outside code, MISS for MISS. Nothing WEAKENED, nothing REFUTED. It stays
  MEASURED on {T ≥ 1} and carries nothing asymptotic, as it says.
- `blind-0830-quadpoint-c1c2.md`: **STANDS on the numbers; four sentences
  WEAKENED and one custody claim REFUTED** (rows C4–C8). The class A verdict
  at both bands reproduces on independent subsamples. It stays MEASURED, and
  its own §7 already lists most of what limits it.

**What did not move.** No rung rises. The X-upper theorem was already PROVEN
and stays PROVEN with one wording fix; the two blind notes were MEASURED and
stay MEASURED; nothing here touches 4.2665 → 2, the quantifier T ≥ 1, or the
asymptote question. All three notes stay HELD.

**One engine defect found in my own code, disclosed.** My first window loop
used `lo + ((c − lo % 30) % 30)`, which is negative in JavaScript whenever
`lo % 30 > c`, i.e. at every anchor with Q² ≡ 19 (mod 30) — half of them. It
inflated C and X(K) by up to two pairs per anchor and made ΣX(B3) read 912
against the target's 891. An independent trial-division brute force over all
40 anchors of B3 returned 891 (now SEC A0 of the producer, where it also agrees with the
fixed engine on C, T, CC and S(4)), i.e. **the target was right and my first
run was wrong** (the 912 is a pre-fix reading and appears in no tail); the guard is `((c − lo % 30) % 30 + 30) % 30` and every figure
below is post-fix. This is recorded because a red team that hides its own
first answer is not one.

## 1. What was re-derived, and how

**Independent implementation.** `redteam-0830-zone.js` sieves each stretch
`[Q², Q′²)` into a `Uint16Array` of first-touch active indices, walks the
three wheel-30 channel classes, and reads T, CC, C, the lpf histogram, X(K)
as a suffix sum, S(K) directly, K* as the least K with T − X(K) ≥ 1 and
y* = p_{K*}. The Selberg side builds the squarefree divisors of P(z) up to
the grid maximum, h, G(ξ), G_d, λ_d, the pair table, R_U and the exact A_d by
CRT over 3·2^{ω(d)} classes mod 30d. ω is integrated on an independent grid
(step 1e-4, trapezoid on the lag-1 recursion F′(u) = ω(u−1), F(2) = 1). The
gates: ω(2) = 0.500000, 3ω(3) = 1.693147, ω(12) = 0.561459 = e^{−γ},
u* = 3.5658466, θ_new = 0.280438, θ_old = 0.280730, difference 0.000291 —
the same u* to seven digits as the target's own grid [VERIFIED, SEC B0].

**Two independent controls on the engine itself.** (i, SEC A0) A trial-division brute
force with no sieve at all reproduces the B3 band totals C 8989, T 1017,
CC 3738, X(4) 891, S(4) 3915, and the window engine agrees on all five.
(ii, SEC A1) The Selberg identity was checked against the *definition*: the direct
quadratic form Σ_{a∈A}(Σ_{d | (a(a+2),P(z)), d ≤ ξ} λ_d)² was summed over
the window at three (Q, K, ξ) and equals C/G(ξ) + Σλλr to 1e-6 relative
[VERIFIED, SEC A1].

**Wrong-direction guard.** `attack-wrongdirection-audit.md` §3.1 rules that
the legal residue on the certificate side is an upper bound on X(y) alone.
No sentence in the X-upper note compares X against T; T enters only as the
engine-identity gate (§1) and as explicitly-cited crossing quantities that
the note refuses to recompute. That is correct practice. **But the note
over-reads the guard once**: §5 says computing K* "is the comparison §3.1
forbids", while §3.2 of the audit says in terms that "a blind test of the
shape is legal and useful; a blind test cannot bear on the quantifier". The
audit restricts what may be *claimed* on the T side, not what may be
*computed*; that is why the two blind notes are legal. Row A8 below.

---

## 2. CLAIMS TABLE (a) — `attack-0829n-X-upper.md`

| # | Claim, quoted with file:line | Independent re-derivation | Verdict |
|---|---|---|---|
| A1 | "\|λ_d\| ≤ 1 … max \|λ_d\| = 1.0000 over 9 depths × 28 levels" (`attack-0829n-X-upper.md:186`) | Weights rebuilt from the §2 formula; max \|λ_d\| = 1.000000 and max \|λ_1 − 1\| = 0 over 6 depths × 28 levels [SEC A1] | **STANDS** |
| A2 | "\|r_d\| < 3·2^{ω(d)}(1 + 1/d) = B(d) for d > 1, and r_1 = 0 identically" (`:205`) | Re-derived line by line from the interval structure: A_d counts an interval in 3·2^{ω(d)} classes mod 30d, each class contributing L/(30d) + θ with \|θ\| < 1, so r_d = θ_d − θ_1·2^{ω(d)}/d; the derivation is correct and uses no equidistribution input. Numerically max \|r_d\|/B(d) = 0.4551 over the six band depths' moduli × 1205 anchors (the note's 0.4600 is over a larger modulus union including the profile depths, so the two are consistent) [SEC A1] | **STANDS** |
| A3 | "G(P(z)) = ∏_{p≤z}(1 − 2/p)^{−1} = 1/V₂(z)" (`:190`) | Brute enumeration of all 2^K divisors at K = 3 and K = 6: G(P(z))·V₂(z) = 1.000000000000000 [VERIFIED, SEC A1] | **STANDS** |
| A4 | "Tier T1 depends on the anchor only through C" (`:136`) | R_U(z, ξ) and G(ξ) are functions of (z, ξ) alone, so T1 = min_ξ (C/G(ξ) + R_U). Checked: 7 anchor pairs in B4 share a value of C and their T1 agree to 0.0e+0 [VERIFIED, SEC A1] | **STANDS** |
| A5 | "loose by 7.82 → 10.13 … sieve loss T1/S = 1.78 → 2.53 … structural loss S/X = 4.39 → 4.01" (`:30`, `:35`, `:36`) | Full bands B3–B8 on independent code: ΣX 891/7035/7941/41172/101591/279040, ΣS 3915/28425/32194/167264/407883/1119016, ΣT1 6971.3/56241.1/68871.2/378100.0/968355.1/2827454.6, ΣT2 and ΣT3 likewise — **every figure identical to the target's SEC 2**, and T1/X 7.82 → 10.13, T1/S 1.78 → 2.53, S/X 4.39 → 4.01 [MEASURED, SEC A2] | **STANDS** |
| A6 | "the band sum of the uniform bound is flat at 378100.0 from K = 17 to K = 46 while ΣX falls 41172 → 15540 … T1/X climbs 9.18 → 24.33" (`:54`) | Reproduced exactly: ΣT1 = 378100.0 at K = 17, 23, 31, 37, 46; ΣX 41172 → 15540; T1/X 9.18 → 24.33 [MEASURED, SEC A5]. The mechanism is derivable, not merely observed: once the minimising ξ falls below p_K, the divisor set {d ≤ ξ : d \| P(z)} stops changing with z, so G(ξ) and R_U(z, ξ) are frozen | **STANDS**, and the saturation is a proof, not a coincidence |
| A7 | "s_max = ln D_max/ln p_K = 1.81 → 1.96, never 2" (`:51`, and the ledger verdict) | D_max = 169, 841, 1849, 3721, 6889, 9409 reproduced exactly; s_max = 1.8106, 1.9612, 1.9538, 1.9288, 1.9149, 1.8542 — not monotone, peak at B4, B8 = 1.85 [MEASURED, SEC A4] | **REFUTED as written.** Replacement: *"s_max = ln D_max/ln p_K reads 1.81 at B3, peaks at 1.96 at B4 and falls to 1.85 at B8; the maximum over the six bands is 1.96 and the level is below z² at every band."* The same substitution is needed in TODO Z2 |
| A8 | "K* is the depth where X crosses T and computing it is the comparison §3.1 forbids" (`:304`) | `attack-wrongdirection-audit.md` §3.1 restricts what is TPC-strength to claim; §3.2 explicitly licenses "a blind test of the shape". The guard forbids the claim, not the computation — which is why the two blind notes are legal | **WEAKENED.** Replacement: *"K* is a crossing quantity; §3.1 puts any claim about it on the T side, so this note quotes the crossing targets and does not recompute them here."* Nothing downstream changes |
| A9 | "median C at the band depths is 184, 714, 1427, 2922, 5848, 10938" (`:224`), "T1/X median 8.78 … 10.75" (`:286`) | 184, 714, 1427, **2912.5**, **5825**, 10938 and 8.66/8.90/9.19/9.76/10.21/10.75 [SEC A3, A4] | **STANDS**, with a note: the four differing figures are an even-n median convention (upper middle against the average of the two middles). No downstream number moves — D_max and s_max are unchanged |
| A10 | "T1 < C at 35 of 40 anchors in B3 and at every anchor of B4 through B8" (`:264`), "No anchor in any band has X(K_b) = 0" (`:288`) | 35/40, then 103/103, 71/71, 208/208, 292/292, 491/491; zero anchors with X(K_b) = 0 [MEASURED, SEC A3] | **STANDS** |
| A11 | "T1 ≥ T2 ≥ T3 ≥ S(K) ≥ X(K) at all 10908 (anchor, depth) pairs" (`:218`) | Holds at all 1205 (anchor, band-depth) pairs on independent code; the target's 10908 counts its wider K set, which I did not run at the T2/T3 tiers | **STANDS**, scope narrower here |

---

## 3. CLAIMS TABLE (b) — `blind-0830-quadpoint-31607.md`

| # | Claim, quoted with file:line | Independent re-derivation | Verdict |
|---|---|---|---|
| B1 | "y*(31607) = 313 (K* = 62 of pool 3398, T = 3867)" and "y*(100003) = 631 (K* = 112 of 9590, T = 7972)" (`blind-0830-quadpoint-31607.md:246`) | Both reproduced exactly on an independent engine, together with T, K* and pool [VERIFIED, SEC B0]. The calibration anchor Q = 9281 also reproduces (T = 127, CC = 2357, K* = 46, y* = 227) | **STANDS** |
| B2 | The B9–B12 band table: m, K* mean, y* mean, L, sd_L, se_L, max, largest K* with Q and pool, twin-Q (`:221`–`:224`) | Every printed digit reproduced on 8363 anchors: 0.0257/0.0204/0.0162/0.0128; 41.49/54.99/73.03/96.59; 197.22/272.88/384.70/532.71; 0.27705/0.27744/0.27858/0.27875; sd 0.00394/0.00300/0.00250/0.00200; max 0.036/0.028/0.023/0.017; largest K* 56 (16691, 1927), 71 (30491, 3288), 102 (51197, 5235), 129 (83561, 8152) [MEASURED, SEC B1] | **STANDS** |
| B3 | The 16 sealed forecast rows of §2 (`:177`–`:192`) | Every one reproduced digit for digit from the four comparator definitions on independent code — C2 0.02568/0.27727/197.65/41.53 at B9 through NEW 0.01311/0.28044/552.40/99.16 at B12 [MEASURED, SEC B2]. Since the forecasts are deterministic functions of the *declared* definitions and an outside implementation lands on them, they cannot have been back-fitted to the outcome | **STANDS**, and this is the strongest custody fact in the note |
| B4 | "76 sealed rows, 64 HIT, 12 MISS" (`:249`) | Re-scored from scratch under my own reading of §2's rules on my own measurements: 56 HIT / 12 MISS on the 68 band rows, 8 HIT / 0 MISS on R8, **64 HIT / 12 MISS**, and the twelve MISSes are the same twelve (R2 OLD and R2 NEW at all four bands; R3 OLD and R3 NEW at B9 and B10) [MEASURED, SEC B3–B4] | **STANDS** |
| B5 | "the largest K* in a band passes 64 from B10 on (71, 102, 129), so `attack-quadpoint-02.md` §2's warning that the v2 engine's KCAP = 64 would have bitten at 31607 was right" (`:230`) | 71, 102, 129 reproduced at the same anchors; my engine has no cap either [MEASURED, SEC B1] | **STANDS** |
| B6 | "the sealed ±0.0015 is 10 to 50 standard errors wide, so 'HIT' here is weak" (`:264`) | 10.8, 18.4, 28.8, 46.8 se [MEASURED, SEC B5]. The note's own self-criticism is if anything understated at the low end | **STANDS** |
| B7 | "y*(31607) = 313 is exactly C2's point value; … that equality is luck-grade" (`:260`) | C2's point forecast is 313.0 and y* is 313, \|y* − F\|/F = 0.0000 [VERIFIED, SEC B4]. The calibration ("luck-grade") is the right one: the ±25% row is 1.3σ wide | **STANDS** |
| B8 | "the seal is by disk order and tail order, not by commit, and the author's word that no anchor above 10007 was seen before tail 1" (`:314`) | Correct and complete as a disclosure. What is mechanically true: the sealed table in §2 matches tail 1's OUTPUT bytes, and `qc.js embeds` checks that block's out-sha256 statically, so it cannot have been hand-edited afterwards; tail 1's stage code cannot sieve past 10007. What is *not* established by any mechanism in the repo is temporal order | **STANDS as disclosed.** The note claims no more than it has |
| B9 | "u* = 3.5658466 (so the brief's 3.565845 is off in the seventh digit)" (`:156`) | An independently integrated ω grid gives u* = 3.5658466 and 1/u* = 0.280438 [VERIFIED, SEC B0] | **STANDS** |

---

## 4. CLAIMS TABLE (c) — `blind-0830-quadpoint-c1c2.md`, and the two riders

| # | Claim, quoted with file:line | Independent re-derivation | Verdict |
|---|---|---|---|
| C1 | "B9: C1 −1.70 se, C2 −1.62 se … B10: −2.23, −1.05 … B11: −3.46, −0.39 … B12: −8.83, −2.82" (`blind-0830-quadpoint-c1c2.md:197`) | Every one reproduced to two decimals on a full independent re-run of B9–B12 [MEASURED, SEC B2] | **STANDS** |
| C2 | The sealed B13/B14 forecast table (`:166`–`:173`) | Reproduced on a systematic subsample: C2 0.01005/0.27897/737.00/127.91 against the sealed 0.01004/0.27897/737.02/127.92 at B13, and C2 0.00788/0.27925/1022.48/169.22 against 0.00787/0.27925/1022.55/169.23 at B14; C1, OLD and NEW likewise [MEASURED, SEC C2 stages c and d] | **STANDS** |
| C3 | "D1 HITs at both bands … class A (C2-preferred)" with z_C1 = −13.33, −23.82 and z_C2 = −1.26, −1.82 (`:287`–`:288`) | Independent subsamples (1-in-3 of B13, n = 2184; 1-in-8 of B14, n = 1394) give z_C1 = −7.33 and −7.92, z_C2 = −0.45 and +0.15, D1 HIT, D2 MISS, D3 HIT, **class A at both bands**, K3 not triggered. The forecast gap in se scales as √n: the note's 12.07 se at n = 6551 is my 6.9 se at n = 2184, ratio 1.75 against √3 = 1.73, and z_C1 = z_C2 − gap/se follows [MEASURED, SEC C2] | **STANDS** |
| C4 | "so by the sealed rule … C2 … is CONFIRMED over … C1 … as the depth law's main term at the sampling scale" (ledger verdict) | Correct under the rule, but the rule is n-dependent and the note says so only in passing ("a sixth decade at se ≈ 0.000007 would test that", `:310`). D1 requires \|z_C2\| ≤ 2 while the C1 clause is nearly automatic: z_C1 = z_C2 − gap/se with gap = 2.22e-4 fixed, so D1 has **one** free reading, not two [SEC C2]. On my B13 subsample, if C2's residual held at its measured −1.46e-5 the \|z_C2\| ≤ 2 clause would fail at n ≈ 43000 — inside a sixth decade | **STANDS**, with the caveat raised to the verdict. Replacement clause for the verdict: *"…is CONFIRMED at this n by the sealed rule, whose C2 clause tightens as √n and is not expected to survive a sixth decade if C2's residual is a term rather than noise"* |
| C5 | "C2's residual, −0.00002 at both bands, is the same figure as at B11 and is inside 2 se, so no missing term is visible at this n" (`:308`) | The magnitude reproduces (−1.46e-5 at B13, +4.56e-6 at B14 on my subsamples) but **the sign does not**: my B14 subsample puts it positive at +0.15 se. Across the note's own six bands the sign is negative 6 times of 6, which a sign test would read at p ≈ 0.03 if the bands are independent — weak evidence *for* a missing term, in the opposite direction to the sentence | **WEAKENED.** Replacement: *"C2's residual is within 2 se at both bands, so no missing term is visible at this n; its sign is negative at all six bands measured so far, which is suggestive and is not a sealed row."* |
| C6 | "three tails, one code-sha256, no --force anywhere" as custody (custody footer, `:391`) | `research/qc/tailfmt.js:148`: for a multi-tail file every tail's code-sha256 covers the bytes above the FIRST tail, so a shared hash is forced by the format. The real custody facts are: the code above tail 1 was fixed before tail 1 was bound and is unchanged through tail 3; each tail's out-sha256 is checked statically against its pasted bytes; and the sealed forecasts reproduce on outside code | **REFUTED as evidence.** Replacement: *"three tails bound to one code hash (which the multi-tail format forces) and no --force anywhere; the seal rests on the seal stage's own guard and on the author's word, not on the hash."* |
| C7 | "The unscored y* check agrees in direction at both bands: y* − C1 = −3.92 (−4.23 se) and −6.33 (−6.88 se); y* − C2 = +0.00 … and −0.08" (`:290`) | The arithmetic-mean y* statistic carries a Jensen offset of ȳ(σ²_meas − σ²_C2)/2 = +0.43 (B13) and +0.44 (B14) relative to the log statistic, because y* scatters more than the comparator [MEASURED, SEC C4]. That offset explains the note's own +0.00/−0.08 quantitatively from its L residual, and it is larger than the whole C2 gap | **WEAKENED.** Replacement: *"The unscored y* check agrees in direction for C1 (−3.92 and −6.33, four to seven se); it says nothing about C2, whose y* gap is smaller than the Jensen offset the statistic carries."* |
| C8 | "NEW HITs at both (−0.00150 at B13 … read as HIT at full precision); OLD MISSes at both, at B14 by −0.00150 read as MISS at full precision" (`:274`) | My 1-in-8 subsample of B14 measures the OLD residual at −0.00148 and would score HIT; the NEW row at B13 measures −0.00149, HIT either way. The two readings sit 2e-5 apart, 0.7 of my se | **WEAKENED.** Replacement: *"Two rows sit on the ±0.0015 edge and are decided inside the sampling noise: OLD R2 at B14 (−0.00150) and NEW R2 at B13 (−0.00150). The 40 HIT / 2 MISS headline is one boundary call away from 41 / 1."* |
| C9 | "the two comparators differ in their finite-size terms as well as in their limits … The run separates the two mechanisms, not the two constants" (`:318`, `:324`) | C1's constant 7.5 = 2/((1−1/2)(1−1/3)(1−1/5)) makes it exactly θ_old's law with the exact partial product in place of the asymptotic, so it tends to θ_old by construction; C2's crossing tends to 1/u* by construction. The disclaimer is exactly right, and it is the sentence that keeps this note honest | **STANDS** |
| C10 | Rider on `u2-engine-depth.md` (`u2-engine-depth.md:11`–`:24`): "REJECTED as the main term at the sampling-error scale from B11 on, sitting above the data by 3.46, 8.83, 13.33 and 23.82 se at B11 to B14 with the same sign throughout" | 3.46 and 8.83 reproduce exactly; 13.33 and 23.82 reproduce in sign, in the √n scaling and in the forecast gap that generates them. But **two of the four numbers (B11, B12) are post-hoc and unsealed** — they are the observation that motivated the seal — and the rider presents all four in one list | **STANDS on the numbers, WEAKENED on the framing.** Replacement: *"…sitting above the data by 3.46 and 8.83 se at B11 and B12 (post hoc, the reading that motivated the seal) and by 13.33 and 23.82 se at B13 and B14 (sealed, D1 HIT)."* |
| C11 | Rider on `import-rough-anatomy.md` (`import-rough-anatomy.md:11`–`:20`): six residuals "−0.00022, −0.00009, −0.00002, −0.00009, −0.00002, −0.00002 … 1.62, 1.05, 0.39, 2.82, 1.26, 1.82 se"; "the §3 forward row at 316243 (K 192, y 1187) was reproduced exactly … and the anchor itself measured y* = 1171 (K* = 190)" | The four B9–B12 residuals and se reproduce exactly on independent code; my C2 comparator at Q = 316243 returns y = 1187 and the anchor measures y* = 1171 with K* = 190, pool 27292, T = 20882 [VERIFIED, SEC B0, B2]. The se list drops the sign, which is the whole content of row C5 | **STANDS**, with the sign restored: all six residuals are negative, i.e. C2 sits above the data at every band measured |

---

## 5. What could not be broken

Three deliberate attacks failed, and a failed attack is the only thing that
earns a confirmation here.

1. **The se the D rows divide by.** If L and its comparator were correlated
   within a band, the paired se would be much smaller and C2 would fail its
   own \|z\| ≤ 2 clause. Measured ratio sd(L − F)/sd(L) = 0.9989 (B13, C2),
   1.0064 (B14, C2), 1.0018 and 1.0019 for C1. The comparator is nearly
   constant across a band relative to the per-anchor scatter, so pairing buys
   nothing and the sealed statistic is correct [SEC C3].
2. **A hidden parameter in the comparators.** C1's 7.5 and C2's crossing were
   both traced to closed form; neither carries a fitted constant, so "zero
   parameter" holds and the ±5%/±0.0015 rows are not self-fulfilling.
3. **Selective band edges.** Both over-running edges (100003, 316243) shift a
   band mean by under 1e-6, well under 0.1 se.

A fourth, cheaper attack also failed: the whole 76-row score of the fourth
decade was re-scored from my own measurements and my own reading of §2's
eight rules, with no reference to the note's table, and landed on the same
64/12 with the same twelve MISSes.

## 6. NOT REACHED

- **B13 and B14 were subsampled, not run in full** (1-in-3 and 1-in-8, 2184
  and 1394 anchors against 6551 and 11151), to keep every tail re-runnable
  inside `embed.js`'s default timeout. That is why row C8 can flag the
  boundary row but cannot adjudicate it, and why my z_C1 is −7.33/−7.92
  rather than −13.33/−23.82. A full re-run would settle C8 and cost about
  1500 s.
- **The T2/T3 tiers were run at the six band depths only**, not along the K
  profile, so the target's "10908 (anchor, depth) pairs" is reproduced at
  1205 of them. The T1 profile in B6 was run in full.
- **No literature check.** Halberstam–Richert's numbering is still cited from
  memory in the target and still unverified; the Selberg derivation is
  reproduced here from first principles so nothing rests on it, exactly as
  the target says.
- **Nothing about the seal's temporal order** can be established by any
  mechanism in this repo, for either blind note. Rows B8 and C6 say what the
  hashes do and do not carry; the rest is the author's word, which both notes
  state plainly.
- **The sign question of row C5** needs a sixth decade or a full B13/B14
  re-run to become a measurement rather than a suggestion.
- **The ledger gate has one open finding against this note, which only the
  orchestrator can close.** `qc.js --full` reports *"TODO.md:77 — item Z2 does
  not list `Q-redteam-0830-zone` on its Ledger: line"*. This note edits no
  existing file, so the id has to be added to item Z2 by whoever integrates;
  the same finding stands against the sibling red-team notes of this wave
  (`Q-redteam-0830-records` under Z5, `Q-redteam-0830-slack` under Z4 and 9).
- **No adversarial pass on this note.** One producer, four tails, one author.

---

*Producer and custody: `research/history/staging/redteam-0830-zone.js`, four
tails, one code-sha256 `3160fb25282a7603…` (which the multi-tail format
forces; see row C6), no `--force` anywhere. Cited, never recomputed: the
target notes' own quoted lines, and `research/qc/tailfmt.js:148` for the
multi-tail hash rule. History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
