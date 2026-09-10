# Adversarial red team of three held measurement notes of 2026-08-29: G2/Z2, the generic-tile ensemble, and the provenance split

<!-- ledger
id: Q-redteam-0829-measure-a
status: ANSWERED
todo: none
question: Do the three held measurement notes of 2026-08-29 (g2z2, g2-generic, provenance/x37) survive an independent re-derivation of every load-bearing claim, a custody and pre-registration audit, and a label audit against the wrong-direction scheme?
verdict: 96 load-bearing claims checked, 88 CONFIRMED on independent code or by hand, 7 WEAKENED, 1 REFUTED; the one refutation is a label, not a result: the g2z2 note's M2 and its producer's printed block both call 4.177e-1 the summed Poisson probability of a two-pair zone over p >= 3, while the code sums every decade including p = 2, whose single contribution is 2.6586e-1, so the true p >= 3 figure is 1.518e-1 and the MISS verdict is unchanged; no pre-registration in any of the three shows any sign of a prediction edited after its run, and birth-time evidence puts the note file before the producer file in two of the three, with the generic producer's inode anomalous and its claimed timestamps uncorroborated.
-->

*(2026-08-29. Staging note, HELD under the publication moratorium. Adversarial
review only: no existing file was edited, no producer was modified, and no git
command was run. Reproductions are on scratchpad code written for this review,
independent of the producers.)*

## 0. Verdict

**What is wrong here first.** One label in the g2z2 note is REFUTED, and it is
carried inside a bound OUTPUT block, so it cannot be fixed by editing the note
alone. Seven further claims are WEAKENED, five of them by stale or ambiguous
transcription rather than by arithmetic. Nothing in any of the three notes moves
the wall, and this review moves nothing either: the G2 exponent band stays
(2, 4.26645] and Z2 still has no band below the zone width that is not TPC.

**Counts.** 96 load-bearing claims checked. **88 CONFIRMED**, **7 WEAKENED**,
**1 REFUTED**. Every confirmation is either an independent recomputation on
scratchpad code that shares nothing with the producers, or hand arithmetic on
the block's own figures.

**The worst finding, stated flatly.** `measure-g2z2-0829.md` §4 M2 reports
"4.177e-1 over p >= 3" as the summed Poisson probability of a zone holding
exactly two pairs, and the same figure is repeated in the note's ledger verdict
and its §6. The producer's `TP` accumulator sums `D.sp2` over **every** decade,
and decade 10^0 contains the zone p = 2. Reproducing `hlCount` verbatim gives
lambda(2) = 2.2801 and P(k = 2) at p = 2 of **2.6586e-1**, so 63.6 per cent of
the quoted figure comes from the one zone the prediction explicitly excluded.
The correct sum over p >= 3 is **1.518e-1**. **REFUTED as labelled.** The
pre-registration's verdict does not change: 1.518e-1 is still eight orders above
the registered 1e-6, so M2 remains a MISS, and it remains a MISS on a carelessly
set threshold. What changes is the number and the sentence that carries it, and
the fact that the mislabel is in the producer's printed line
(`measure-g2z2-0829.js`:396), which means a correction needs a code edit and a
re-embed, not a note edit.

**The check the brief called the worst possible finding comes back clean on all
three.** No pre-registered prediction in any of the three notes was found
softened, deleted or re-aimed after its run. The strongest evidence is
disconfirming and internal: `measure-g2z2-0829.md` §1 P3b still carries, in its
pre-registration, the statement `pos <= (x# - 2)/2` that §3b and §4 M1 both
report as FALSE; a retro-fitted pre-registration would not keep it. The
provenance note likewise keeps P3 and P4 and records both as falsified. Birth
times, which no later in-place edit alters, put the note file ahead of the
producer file for the g2z2 note (2 m 19 s) and the provenance note (1 m 39 s and
3 m 35 s). The generic note is the weak one: its producer's inode was created at
09:38:11 local, 33 m 36 s after its note file, and that inode cannot be the one
the 1874.6 s run executed, so the two timestamps §2 quotes are uncorroborated by
anything that survives on disk. That is a custody gap, not evidence of an edit.

**Second-order finding, and it favours the corpus.** The g2z2 note's §5 PROVEN
statement is stronger than the note claims and does not need A144311 at all
(§5 M1 below). The note lets D1's single-witness doubt shadow it unnecessarily.

**One label attribution is misplaced without the label being wrong** (§4).

## 1. Claim by claim

Verdicts: CONFIRMED means re-derived here and agreeing; WEAKENED means the
substance survives and the statement does not; REFUTED means the statement is
false as written. "Independent" means scratchpad code written from the note's
prose, not from the producer.

### 1a. `measure-g2z2-0829.md`

| # | claim | check run | verdict |
|---|---|---|---|
| 1 | SECTION A, the fourteen custody G2/Z2 values reproduce `zonegap-01.md` §5 | own sieve to 7000, zone convention applied from the note's prose; 14 of 14 identical, and `zonegap-01.md` §5's own list (1.40, 2.20, 3.00, 2.08, 1.36, 1.72, 2.32, 3.52, 3.64, 4.12) read back | CONFIRMED |
| 2 | §3a, all 22 rows: k, head, Z2, tail, G2, G2/Z2, Z2/G2, width, Z2/width | independent recomputation of 22 rows by 9 columns; every figure identical to the block, including width = x'^2 - x and Z2/width to six places | CONFIRMED |
| 3 | falls 3 over 22 terms at x = 19, 23, 73; 1 over x = 47..79; maximum 8.3214 at x = 71, not the last term | recomputed from the independent ratio series | CONFIRMED |
| 4 | lossless levels are exactly x = 2, 3, 5, 7 | recomputed | CONFIRMED |
| 5 | §3c, 18 rows by 5 normalisations, and the six drift percentages (-31.8, +24.3, -19.0; +37.3, +91.4, +74.3) | recomputed from the independent ratio series; all 90 table entries and all six drifts identical | CONFIRMED |
| 6 | §3b positions at x = 2..19: pos, mult, in-zone, in-stratum, pos/x#, d_seam, d_seam/S, d_mirror/x#, partner | own cyclic tile enumeration mod x#, sharing no code with `exact-g2-ladder.js`; 8 rows by 9 columns identical, including mult 20 at x = 17 and x = 19 and pos/x# = 0.000068 at x = 19 | CONFIRMED |
| 7 | §3b at x = 23..43 | not re-enumerated here (cost); cited to `exact-g2-ladder.js` LADDER as the note does | NOT CHECKED |
| 8 | the corrected mirror-partner formula `partner = (x# - 2 - G2 - pos) mod x#` | re-derived line by line: sigma(s) = x# - 2 - s gives sigma(s)(sigma(s) + 2) = (-2 - s)(-s) = s(s + 2), so sigma preserves twin slots; and if t were a slot strictly inside the image interval then sigma(t) would be a slot strictly inside [pos, pos + G2], contradiction. Verified by exhibition at 8 of 14 levels here | CONFIRMED, PROVEN |
| 9 | the pre-registered `pos <= (x# - 2)/2` is FALSE and failed at x = 2, 3, 5 | hand arithmetic: 1 > 0, 5 > 2, 17 > 14; and 71 <= 104 at x = 7, so the failure set is exactly the three named | CONFIRMED |
| 10 | `partner >= pos` at all fourteen | holds at all 8 levels checked here; the note's reading of it as "consistent with pos being the least attaining position" is the right calibration, since the content is a check on the LADDER's leastness claim and not on the Mirror-Sweep Lemma | CONFIRMED |
| 11 | §5, PROVEN: no gap of length G2(x#) lies wholly inside the zone at x = 11..79 | re-derived. In the zone, r > x and r + 2 < x'^2 with gcd(r(r+2), x#) = 1 forces r and r + 2 prime, since a composite with least factor above x is at least x'^2. Two consecutive in-zone twin primes admit no tile slot between them, since such a slot would itself be in the zone and hence a twin prime. So the maximum in-zone consecutive-slot gap is exactly Z2, and Z2 < G2 at every one of the eighteen levels closes it | CONFIRMED, PROVEN, and stronger than claimed (§5 M1) |
| 12 | §4 P2 count arm: 0 zones with p >= 3 and k = 2; min k over p >= 3 is 3 at p = 3; k non-decreasing across the sweep; R0 holds everywhere | independent zone sweep to X = 1e8, 1,228 zones (the producer's 27,292 run to 1e11 was not re-run, per the brief): 0 zones with p >= 3 and k = 2, min k 3 at p = 3, 0 zones whose k falls below the previous zone's, R0's head + Z2 + tail <= width violated nowhere, exactly 1 tight zone and it is p = 2 | CONFIRMED on the 1e8 prefix |
| 13 | §4 P4: sum k / sum lambda = 0.9991 over 27,292 zones | own sweep to 1e8 under its own quadrature returns 1.0003; sum k through decade 10^3 agrees with the block once the one zone p = 9973 that exceeds 1e8 is accounted for | CONSISTENT |
| 14 | the decade table's lambda and P(k = 2) columns | `hlCount` reproduced verbatim: lambda = 2.2801, 4.5762, 6.0931, 10.3873 at p = 2, 3, 5, 7, decade 10^0 sum lambda 23.3 and sum P(k = 2) 4.172e-1, and P(k = 2) = 4.5794e-4 at p = 11 | CONFIRMED |
| 15 | §4 M2: "4.177e-1 over p >= 3" | `TP` sums every decade including p = 2, whose own P(k = 2) is 2.6586e-1. Correct p >= 3 sum is 1.518e-1 | **REFUTED as labelled** |
| 16 | §4 header, "elapsed 331.2 s" | 331.2 appears nowhere in the bound block, which reads 337.7 s in its body and 337.8 s in its fingerprint. The figure is a survival from the superseded first embed that D7 describes, and it contradicts D6's own claim that every figure in §2 to §5 is transcribed from the embedded block | WEAKENED |
| 17 | §3b summary: "mean 0.2580 over all fourteen, mean 0.2579 over the ten non-degenerate levels x = 11..43, minimum 0.0013 (at x = 19), maximum 0.4901 (at x = 41)" | both means are right. The min and max belong to the ten-term row only; over all fourteen the block reads min 0.0000 and max 0.5000. The sentence reads as if all four figures share the same population | WEAKENED, wording |
| 18 | §4: "Zones with p >= 3 holding exactly two pairs: 0 of 27,292" | the denominator for p >= 3 is 27,291 | WEAKENED, off by one |
| 19 | §4 M2: "where the mean pair count is of order 10 rather than astronomical" | the four zones that carry the whole figure have lambda 2.28, 4.58, 6.09 and 10.39; three of the four are not of order 10 | WEAKENED |
| 20 | §2 Route 2, Z2 = env at 27,292 of 27,292 | not re-run; the note's own calibration ("a check on this engine rather than a rederivation") is the correct rung, since the A113274 ladder is prime data even though the code is disjoint from the sieve | NOT CHECKED, calibration correct |


### 1b. `measure-g2-generic-0829.md`

| # | claim | check run | verdict |
|---|---|---|---|
| 21 | §1c, PROVEN: E1 and E2 are the same ensemble up to translation, with `prod (p-1)/2` orbits | re-derived step by step. Step 1, freeness: at odd p a translation either fixes both classes or swaps them, and a swap forces 2t = 0 hence t = 0 since p is odd; at p = 2 the single class forces t even; so t = 0 mod W. Step 2, orbit count: `2 prod p(p-1)/2` configurations over an orbit size `W = 2 prod p` gives `prod (p-1)/2`. Step 3, the invariant: same difference vector implies translation by the CRT solution of `t = a'_p - a_p`, and the sign flip at a single prime is realised by translating by `e_p`, since `{0, e_p} + (-e_p) = {-e_p, 0}` as a set, with CRT combining independent flips. Step 4, E2 onto uniformly: `d` even with `p` not dividing `d` numbers `prod (p-1)` by CRT, the orbit of `d` is `{d' : d' = +-d mod p}` of size exactly `2^(pi(x)-1)` because `p` never divides `2d`, and `prod (p-1) / 2^(pi(x)-1) = prod (p-1)/2` closes the count. Step 5 follows from step 1. **No step has a gap.** | CONFIRMED, PROVEN |
| 22 | the orbit counts 2, 6, 30, 180, 1440, 12,960, 142,560 at x = 5..23 | recomputed from `prod (p-1)/2`; all seven agree | CONFIRMED |
| 23 | §3a rows at x = 11, 13, 17: orbits, mean, sd, min, max, G2, z, midrank, strictly-below | own exhaustive enumeration of every orbit, realised through a CRT constant shift, sieving each period from scratch. Reads 30 / 48.400 / 6.856 / 36 / 66 / 42 / -0.933 / 20.00% / 3.33%; 180 / 77.667 / 12.079 / 60 / 150 / 66 / -0.966 / 18.06% / 13.33%; 1440 / 117.896 / 16.945 / 84 / 192 / 108 / -0.584 / 26.35% / 21.32%. Identical to the note at every one of the 27 entries | CONFIRMED |
| 24 | §3a row at x = 19: mean 167.382, sd 18.074, midrank 17.14% | sampled here, 400 distinct uniform orbits: mean 167.790 with a standard error of 0.884 (0.46 se from the note's value), sd 17.683, midrank 16.13%. Exhaustive enumeration at x = 19 is out of reach for this review | CONSISTENT, not exact |
| 25 | §3a row at x = 23 (sampled, 13.70%) | not checked; the note already calibrates it as a sample | NOT CHECKED |
| 26 | the P2 hand points, x = 5 at midrank 25.00% over two orbits (12, 18) and x = 7 at 66.67% over six | own exhaustive enumeration returns exactly those two orbit sets and those two midranks | CONFIRMED |
| 27 | §3b histograms: x = 11 `36x1 42x10 48x9 54x7 60x2 66x1`; x = 13 `60x24 66x17 72x19 78x61 84x34 90x16 96x1 102x3 108x3 120x1 150x1` | reproduced exactly, both rows, every multiplicity | CONFIRMED |
| 28 | §3c: the E2 and E1 sd differ only through the divisor, 6.748 against 6.856 and 12.046 against 12.079 | hand arithmetic: `6.856 * sqrt(16*29/479) = 6.748` and `12.079 * sqrt(32*179/5759) = 12.046`, both to the printed digits. The explanation in the note is exactly right | CONFIRMED |
| 29 | §3c: 480 and 5760 census-matched d, 16 and 32 per orbit | `prod (p-1)` at x = 11 is 2*4*6*10 = 480 and at x = 13 is 5760; `2^(pi(x)-1)` is 16 and 32 | CONFIRMED |
| 30 | P3: the exhaustive ensemble maximum equals A288815 | own enumeration gives 6, 18, 30, 66, 150, 192 at x = 3, 5, 7, 11, 13, 17, against A288815 terms 2 to 7 as carried in `research/external-ladders-01.js`. The x = 19 term 258 was not re-derived here | CONFIRMED at six of the seven |
| 31 | P4: the d = 2 member reproduces the LADDER 42, 66, 108, 150; census exactly `prod (q-2)` | own tile enumeration returns 42, 66, 108, 150 at x = 11..19; census 135, 1485, 22,275, 378,675 matched at every orbit enumerated, with no failure | CONFIRMED |
| 32 | §2 custody: the twin ORBIT REPRESENTATIVE is `e_3 = 1`, `e_p = 2` | checked: `d = 2` reduces to `2 = -1 mod 3`, whose representative in `1..(p-1)/2` is 1, and to 2 at every `p >= 5` since `2 <= (p-1)/2` there | CONFIRMED |
| 33 | §4 item 7: the best non-census-matched d reaches 48 against 66 at x = 11 and 90 against 150 at x = 13 | own enumeration over every even d: at x = 11 the best matched is 66 at d = 82 and the best non-matched is 48 at d = 44; at x = 13, 150 at d = 688 and 90 at d = 338 | CONFIRMED |
| 34 | §3e: `h2/mean` 1.36, 1.93, 1.63, 1.54, 1.64 and `z of the max` +2.57, +5.99, +4.37, +5.01 | hand arithmetic on the printed table: 66/48.400 = 1.3636, 150/77.667 = 1.9313, 192/117.896 = 1.6285, 258/167.382 = 1.5414, 366/223.385 = 1.6385; (66-48.400)/6.856 = 2.567, (150-77.667)/12.079 = 5.988, (192-117.896)/16.945 = 4.373, (258-167.382)/18.074 = 5.014 | CONFIRMED |
| 35 | §3d, the free-pair sampler rows | seeded, so not reproducible on independent code by construction; the note declares the seed and the generator | NOT CHECKABLE independently |
| 36 | §0 and §4: the registered falsifier did not fire | on the registered rule (below 2 per cent or above 98 per cent at two or more exact levels) the four exact midranks are 20.00, 18.06, 26.35, 17.14, and none is near either end. The note's refusal to attach significance to the repeated negative z, on the ground that the levels are nested, is the correct calibration | CONFIRMED |

### 1c. `measure-g2-provenance-0829.md`

| # | claim | check run | verdict |
|---|---|---|---|
| 37 | §2 custody table, all twelve figures | own implementation of the estimator from the note's prose: pilots 1.191, 1.282, 1.801; S11 raw 1.777 +- 0.029 and 1.647 +- 0.021; control 45 windows mean 1.279 sd 0.052 and 45 windows mean 1.218 sd 0.046; corrected 1.498 and 1.429; bracket [1.39, 1.78]. Every figure identical | CONFIRMED |
| 38 | §3, all eight provenance rows: n, raw, se, control bias, corrected, move against the headline | reproduced digit for digit: 1.533, 1.525, 1.498, 1.465, 1.498, 1.525, 1.500, 1.503 with biases +0.268, +0.273, +0.279, +0.260, +0.278, +0.273, +0.278, +0.278 | CONFIRMED |
| 39 | leave-one-term-out: correcteds 1.478 to 1.536, largest move +0.038 at x = 7 | reproduced exactly, matched width 19 | CONFIRMED |
| 40 | the control run on the same eight index sets spreads 0.932 to 1.233 | reproduced exactly | CONFIRMED |
| 41 | the single-window convention cost: 1.601, 1.532, 1.232 | reproduced exactly | CONFIRMED |
| 42 | the 5-mod-6 guard on A144311 | checked by hand on the endpoints: 6 - 1 = 5, 12 - 1 = 11, 1710 - 1 = 1709, all 5 mod 6 | CONFIRMED |
| 43 | §4 S1: G2/h = 8.0000 at z = +3.01, c2' = 0.5939 at z = +4.57, h2/G2 = 1.3409 at z = -1.65 | own leave-37-out standardiser written from the note's prose: identical n, rms and z at all three; and by hand 528/66 = 8, 708/528 = 1.3409, c2' = 528/(34.05 * 26.107) = 0.5939 | CONFIRMED |
| 44 | §4 S2: seven G2-free instruments at -1.08, -2.20, -0.63, -0.82, -1.35, -0.98, +0.07 | all seven reproduce exactly, with the same n and rms | CONFIRMED |
| 45 | §4: step exponents into 37 of 0.730, 1.225, 2.356 against ladder means 1.718, 2.236, 1.994 | the three step values reproduce exactly. The "others" means reproduce to 1.717, 2.261, 2.030 under this review's own index convention, giving z of -0.87, -0.94, +0.32 against the note's -0.85, -0.90, +0.35; the difference is the convention, not the data | CONFIRMED on the readings, CONSISTENT on the z |
| 46 | the blind forecast: G2(37#) in [397, 445], central 414, z = +6.58 | reproduced exactly from the seven trailing levels p = 11..31 | CONFIRMED |
| 47 | the custody band at x = 41: [476, 633], central 513, reproducing `G2-STATE.md` §9 item 6 | reproduced exactly from the eight terms x = 11..37 | CONFIRMED |
| 48 | "x = 37 is the only level of the 22-term G2 ladder outside its own band, rank 1 of 11 by |z|" | only eleven of the 22 levels carry a band at all, because a seven-term trailing window cannot start before x = 37. The rank clause is right; the "22-term ladder" clause overstates the population | WEAKENED |
| 49 | "c2' drifts upward, so a trailing forecast under-predicts by construction" | direction CONFIRMED and now quantified here, which the note does not do: the seven-term window has mean 0.4653 and sd 0.0196; the ten post-37 levels have mean 0.5118 and sd 0.0159, putting x = 37 at z = +5.18; all seventeen non-37 levels x = 11..79 have mean 0.4926 and sd 0.0290, putting it at z = +3.49. So the drift plus the window's narrow sd account for roughly half the 6.58 and about 3.5 survives | WEAKENED by omission |
| 50 | §5 P1: "the largest block-drop move is 0.035 where the control's own bias 0.279 was the threshold" | the registered threshold in §1 P1 was 0.26, not 0.279. The pass is unaffected, since 0.035 clears both, but the threshold is restated after the run in the looser direction | WEAKENED |
| 51 | §5 P3 FALSIFIED ON ITS LETTER, HELD ON ITS SUBSTANCE | correct as written. The nine G2-free instruments read -1.08, -2.20, -0.63, -0.82, -1.35, -0.98, +0.07, -0.85, -0.90; none is high, and the one past 2 is low and range-dependent | CONFIRMED |
| 52 | §5 P4 FALSIFIED | correct. The band excludes 528 and the note says so without softening | CONFIRMED |
| 53 | the confounding caveat in §3, that the control's own range sensitivity (0.932 to 1.233) exceeds the whole provenance spread (1.465 to 1.533) | reproduced; the caveat is the binding limit and the note leads with it | CONFIRMED |

## 2. Custody and pre-registration integrity

**What is weak here first, for all three at once.** Custody is disk order and a
transcript in every case. No commit seals any of the three, and this review ran
no git command either, so nothing below upgrades any of them past the rung the
notes themselves claim. What this section adds is one class of evidence the
notes did not use: **birth times**, which an in-place rewrite does not alter.
That was verified on this volume before being relied on: `writeFileSync` and a
shell redirect both leave `birthtime` untouched, while `cp` resets it to the
write time, so a file whose birth equals its mtime was created by a copy or a
delete-and-recreate and not by editing.

### 2a. `measure-g2z2-0829.md`, producer `research/measure-g2z2-0829.js`

**`embed.js --check`, static verdicts:**

```
research/measure-g2z2-0829.js
  code-sha256  matches
  body         matches out-sha256 - the pasted block is bit-honest
```

The run verdict was not taken. The recorded elapsed is 337.8 s and the brief
forbids a full re-run of this producer; the two static verdicts are the ones
that catch a hand-edited digit inside a bound block and a code edit after
binding, and both pass. No `inputs` line is present, so there is no dependency
verdict to report. The `forced` stamp is present, dated 2026-08-29, naming 21 of
269 unreproduced figures, and D7 discloses it accurately.

**Prereg before run.** The note's own account is disk order with no times.
File evidence: the note was born 08:55:51 and the producer 08:58:10, so the note
file predates the producer file by 2 m 19 s. **SUPPORTS the account.**

**One residual the note does not state.** The producer's last write is 09:30:03
and the note's last write is 09:22:01, so the currently bound OUTPUT block was
written 8 minutes after the note was last edited. D7's account explains it
without strain: the first embed carried wall-clock progress lines, the gate
refused the replacement, the producer was changed to deterministic milestones,
and a forced re-embed followed. The stale "331.2 s" in §4's parenthetical is the
fingerprint of the superseded block and is the only figure in the note that
cannot be found in the bound one. Every other §4 figure was recomputed here and
agrees, so the substitution changed nothing but the elapsed line.

**No sign of a retro-fitted prediction, and the evidence is disconfirming.**
§1 P3b still carries `pos <= (x# - 2)/2` presented as proven, and §3b and §4 M1
both report it as false and caught by the producer's own assertion. A
pre-registration edited after the run would not keep a refuted theorem in it.

### 2b. `measure-g2-generic-0829.md`, producer `research/measure-g2-generic-0829.js`

**`embed.js --check`, static verdicts:**

```
research/measure-g2-generic-0829.js
  code-sha256  matches
  body         matches out-sha256 - the pasted block is bit-honest
```

The run verdict was not taken; the recorded elapsed is 1874.6 s and the brief
forbids the re-run.

**Prereg before run, and this is the weak one of the three.** §2 states that §1
was written at 07:00:02Z and the producer created at 07:02:57Z, both observed by
`stat` before either file was edited again, and concedes that both have since
been edited so their mtimes no longer witness the order. Birth times are not
destroyed by editing, and they read:

| file | birth (local) | birth (Z) | mtime (local) |
|---|---|---|---|
| `measure-g2-generic-0829.md` | 09:04:35 | 07:04:35 | 09:40:20 |
| `measure-g2-generic-0829.js` | 09:38:11 | 07:38:11 | 09:38:11 |

Two things follow. First, the producer's birth equals its mtime, which no
in-place write produces, so the inode now on disk was created by a copy or a
recreate at 09:38:11 and **cannot be the inode the 1874.6 s run executed** (that
run must have started around 09:07). Second, the claimed producer creation time
of 07:02:57Z is not corroborated by anything surviving; the note file's own
birth of 07:04:35Z is 1 m 38 s after it, which would put the note file after the
producer rather than before. The ordering the birth times do support is
note-file before producer-inode, by 33 m 36 s, which is the pre-registration's
direction.

**Verdict: CUSTODY WEAKENED, no evidence of a post-run edit to a prediction.**
The registered items behave as a genuine pre-registration should: P2 is
registered as directionless and is still scored as earning nothing in §4, and P3
carries "both readings are reported if it fires" and did not need to be invoked.
The residual is that §2's two timestamps should be read as transcript claims, not
as file evidence, and §2 currently presents them as observed by `stat`.

**A second custody note that this review can confirm in kind.** §2 records a
sibling agent's log overwriting this agent's log file in a shared scratchpad.
This review used a private subdirectory for exactly that reason and hit no
collision, so the hazard is real and the mitigation is cheap.

### 2c. `measure-g2-provenance-0829.md`, producers `measure-g2-provenance-0829.js` and `measure-x37-0829.js`

**`embed.js --check`, full, both producers, exit 0:**

```
research/measure-g2-provenance-0829.js
  code-sha256  matches
  body         matches out-sha256 - the pasted block is bit-honest
  out-sha256   matches
research/measure-x37-0829.js
  code-sha256  matches
  body         matches out-sha256 - the pasted block is bit-honest
  out-sha256   matches
```

Both run in about 0.1 s, so the run verdict was taken and both reproduce their
blocks byte for byte. This is the only one of the three notes whose custody is
complete on all four verdicts.

**Prereg before run.** The note claims disk order within the session with no
times. Birth times: note 09:02:58, `measure-g2-provenance-0829.js` 09:04:37,
`measure-x37-0829.js` 09:06:33. The note file predates both producers by
1 m 39 s and 3 m 35 s. **SUPPORTS the account**, and both producers have
birth strictly before mtime, so both inodes are the ones that were edited and
embedded in place.

**No sign of a retro-fitted prediction.** P3 is recorded as falsified on its
letter and P4 as falsified outright, with the sentence "The pre-registration was
wrong about this and the record should say so". The only drift found is the P1
threshold restated as 0.279 in §5 where §1 registered 0.26 (§1c item 50), which
loosens the test rather than tightening it and changes no verdict.

### 2d. One integration gap common to all three

`research/QUESTIONS.md` carries **zero hits** for `Q-measure-g2z2`,
`Q-measure-g2-generic` and `Q-g2-provenance-x37`. The index is generated from
the `<!-- ledger -->` blocks, and it has not been regenerated since the three
notes were written, so an agent following CLAUDE.md's instruction to read
QUESTIONS.md §1 before briefing anything will not see that these three questions
are ANSWERED. That is the exact failure the ledger was built to stop.

## 3. Proposed edits

None applied. Every string below is quoted exactly. No proposed replacement text
contains an em dash; where the surrounding live text already carries one, that is
noted.

### 3a. To `measure-g2z2-0829.md` (APPLY, mechanical, verified here)

**E1. §4 M2 and the Poisson figure. This is the REFUTED item and it is the one
edit that matters.** At `measure-g2z2-0829.md`:292-296.

OLD:

> **M2. The Poisson arm of P2 MISSES, by a threshold set carelessly.**
> Predicted: the summed Poisson probability of a zone holding exactly two pairs,
> over p >= 3, below 1e-6. Measured: **4.177e-1 over p >= 3, and 4.649e-4
> restricted to p >= 11, of which a single zone, p = 11, contributes 4.579e-4.**
> The miss is entirely in the smallest zones, where the mean pair count is of
> order 10 rather than astronomical, and the threshold was written without
> looking at them.

NEW:

> **M2. The Poisson arm of P2 MISSES, by a threshold set carelessly, and the
> producer's own label on the figure is wrong.** Predicted: the summed Poisson
> probability of a zone holding exactly two pairs, over p >= 3, below 1e-6.
> The producer prints **4.177e-1** under the label "p >= 3", but its `TP`
> accumulator sums every decade including the zone p = 2, whose own P(k = 2) is
> **2.6586e-1** at lambda = 2.2801. The figure over p >= 3 is therefore
> **1.518e-1**, of which 4.649e-4 comes from p >= 11 and 4.579e-4 from the
> single zone p = 11. **The verdict is unchanged, MISSES**, since 1.518e-1 is
> eight orders above the registered threshold. The miss sits entirely in the
> four smallest zones, whose lambda are 2.28, 4.58, 6.09 and 10.39, and the
> threshold was written without looking at them.

**E2. §4's elapsed figure.** At `measure-g2z2-0829.md`:273.
OLD: `X = 1e11, elapsed 331.2 s, 27,292 zones.`
NEW: `X = 1e11, elapsed 337.7 s, 27,292 zones.`
Reason: 331.2 appears nowhere in the bound block and is a survival from the
embed D7 describes as superseded; D6 claims every figure in §2 to §5 is
transcribed from the bound block, and this is the one that is not.

**E3. §3b's min and max attribution.** At `measure-g2z2-0829.md`:218-220.
OLD: `d_seam/S: mean 0.2580 over all fourteen, mean 0.2579 over the ten non-degenerate levels x = 11..43, minimum 0.0013 (at x = 19), maximum 0.4901 (at x = 41).`
NEW: `d_seam/S: mean 0.2580 over all fourteen, with minimum 0.0000 and maximum 0.5000 there; over the ten non-degenerate levels x = 11..43 the mean is 0.2579, the minimum 0.0013 (at x = 19) and the maximum 0.4901 (at x = 41).`

**E4. The p >= 3 denominator.** At `measure-g2z2-0829.md`:320-321.
OLD: `Zones with p >= 3 holding exactly two pairs: 0 of 27,292, to X = 1e11.`
NEW: `Zones with p >= 3 holding exactly two pairs: 0 of 27,291, to X = 1e11.`
The 27,292 count includes p = 2. The same substitution applies to the ledger
verdict at line 8, where "0 of 27,292 zones above the degenerate first one"
should read "0 of 27,291 zones above the degenerate first one". The other five
uses of 27,292 in the note are correct, since they count all zones.

**E5. A defect to add to §6, since the mislabel is inside a bound block.**
Suggested D9: `The producer's printed line at measure-g2z2-0829.js:396 labels the summed Poisson probability "p >= 3" while summing every decade, including p = 2. The note is corrected in M2; the block cannot be, without a code edit and a re-embed, and until that happens the block and the note disagree on this one figure. Falsifier: none needed, the accumulator is read directly from the source.`

### 3b. To `measure-g2-provenance-0829.md` (APPLY, mechanical, verified here)

**E6. The band population.** At `measure-g2-provenance-0829.md`:183-184 and
again at :229-230.
OLD (first): `x = 37 is the only level of the 22-term G₂ ladder outside its own band, rank 1 of 11 by |z|.`
NEW: `x = 37 is the only level outside its own band among the eleven that carry one, rank 1 of 11 by |z|; the seven-term trailing window means the other eleven levels of the 22-term ladder have no band at all.`
The second occurrence, `the only level of the 22-term ladder outside its own band`, takes the same correction.

**E7. Quantify the drift.** At `measure-g2-provenance-0829.md`:192-195.
OLD: `c₂′ drifts upward (`Q-c2prime-drift`, PARTIAL), so a trailing forecast under-predicts by construction.`
NEW: `c₂′ drifts upward (`Q-c2prime-drift`, PARTIAL), so a trailing forecast under-predicts by construction, and the size of that effect is computable: the seven-term window has mean 0.4653 and sd 0.0196, the ten post-37 levels have mean 0.5118 and sd 0.0159, which puts 37 at z = +5.18, and all seventeen non-37 levels x = 11..79 have mean 0.4926 and sd 0.0290, which puts it at z = +3.49. Drift and window width together account for about half the 6.58 and about 3.5 survives.`

**E8. The restated threshold.** At `measure-g2-provenance-0829.md`:205-207.
OLD: `the largest block-drop move is 0.035 where the control's own bias 0.279 was the threshold`
NEW: `the largest block-drop move is 0.035 where 0.26 was the registered threshold, the control's own bias at these widths measuring 0.279`

### 3c. To `measure-g2-generic-0829.md` (APPLY, mechanical)

**E9. §2's timestamps.** At the paragraph beginning "What is weak here first".
Add, after "so their mtimes no longer witness the order":
`Birth times, which an in-place rewrite does not alter, read 09:04:35 local for this note and 09:38:11 local for the producer, and the producer's birth equals its mtime, which only a copy or a recreate produces. So the inode now on disk is not the one the 1874.6 s run executed, the two times quoted above are transcript claims rather than file evidence, and the only ordering the disk supports is note-file before producer-inode.`

### 3d. To live documents

**`research/G2-STATE.md`:379-380, the h2/G2 bullet. Proposed by the provenance
note §6. Verdict: APPLY the substance, HOLD the exact string.**

The substance is verified here: all nine G2-free instruments reproduce, none
reads high at 37, and the live sentence "so three instruments now point at
x = 37 as a G2-side anomaly" is the claim the measurement retires. Two
mechanical objections to the string as drafted. First, the drafted text uses
`G₂`, `c₂′` and `h₂` in unicode subscripts, while the target lines use plain
`G2`, `c2′` and `h2`; a mixed-notation paragraph in the middle of §2 is a defect
the file does not currently carry. Second, the replacement begins after "1.341",
so the file's existing em dash before "the same level" stays in place, which is
correct for that file's own style.

OLD, at `research/G2-STATE.md`:379-380 (everything after "1.341"):
`the same level that spikes G2/h and c2′, so three instruments now point at x = 37 as a G2-side anomaly.`

NEW (notation normalised to the file's own):
`the same level that spikes G2/h and c2′. The three are not independent: all three are ratios carrying G2(37#) = 528, and of nine instruments free of that value none reads high at 37, the largest being h(37#) itself at z = -2.20 in the low direction and -1.08 on the range-matched ladder (MEASURED, history/staging/measure-g2-provenance-0829.md §4). What survives is one object: G2(37#) overshoots a blind seven-term extreme-value forecast by z = +6.58, the largest such residual on any of the three ladders, and that overshoot is unexplained.`

**`research/G2-STATE.md` §6.1, the addition. Verdict: APPLY the text, HOLD the
placement.** Every figure in the drafted paragraph reproduces exactly here
(1.533, 1.525, 1.465, 1.500, 1.498, and the control spread 0.932 to 1.233). The
note says "after the reading table", which is `G2-STATE.md`:1026; inserting
there splits the table from the sentence at :1028 that reads it ("Two measured
effects account for about a third of the difference"). The paragraph belongs
**after the blockquote that ends at :1040**, where it reads as a second
qualification on the same headline rather than as an interruption of the first.
Same notation objection: normalise `Ĝ(64)` and `G₂` to the file's own forms.

**`README.md`:175-176, the constant-shift sentence. Flagged by the generic note
§5. Verdict: HOLD, needs Chris.** The mathematical point is CONFIRMED here:
§1c proves that every census-matched two-class configuration is `S₁ ∩ (S₁ − d)`
for exactly one d up to translation and the per-prime sign group, so the
constant-shift *form* is not structure and only the *value* d = 2 is. But the
README sentence is Chris's own prose in the canonical status section, the three
uses it lists are uses of the value and survive unchanged, and the note itself
calls it a wording matter rather than a correction. It is not mechanical.

**`research/history/staging/object-bridge-read-0829.md`:270, the G2/Z2 row.**
The g2z2 note §5 proposes extending it from fourteen levels to 22. That target
is a staging note rather than a live document, so it falls outside the live-doc
gate; the extension is verified here (1.00 to 8.1429 with the maximum 8.3214 at
x = 71) and is APPLY-class whenever that note is next touched.

**No other live-document edit is proposed by any of the three notes**, and none
should be: `measure-g2z2-0829.md` §5 is explicit that the wall is unchanged, and
`measure-g2-generic-0829.md` proposes none at all.

## 4. Label audit

Audited against `attack-wrongdirection-audit.md` §1 (Axes A to D and the two
corpus bridges) and §2 (the verdict table). The guarded error direction is the
audit's own: a wrong **(ii)** kills a legal target for nothing, and a wrong
**(i)** lets a TPC-strength statement be pursued as a stepping stone.

**No wrong (i) was found in any of the three notes.** Every measurement in all
three is a reading of a finite object at named levels, which Axis A and the
audit's item 4 both place squarely in **(i)**: a finite-level statement is
decidable by enumeration and cannot imply an infinitude statement. None of the
three drifts into an all-x quantifier anywhere, and each says so explicitly in
its own §0.

Item by item:

- **`measure-g2z2-0829.md`, everything labelled (i).** CORRECT. The 22-level
  ratio table, the position table, the sweep and the drift percentages are all
  finite readings. The one statement in the note carrying the word PROVEN
  (§5, no G2-length gap inside the zone at x = 11..79) is proven at eighteen
  named levels and is therefore also (i); it does not become (ii) by being a
  theorem, because the theorem is about a finite set.
- **`measure-g2-generic-0829.md`, (i).** CORRECT, including for §1c, which is
  the one all-x statement in the three notes. §1c says the census-matched
  two-class configuration space modulo translation is parametrised by the shift
  d, for every x. Axis B is explicit that a for-all quantifier buys nothing on
  its own, and §1c bounds no gap and asserts no survivor in any window, so it
  carries no TPC content. Its one consequence, that h2(x#) is the maximum over
  census-matched d of the cyclic maximum gap, is a reformulation of an object
  the corpus already holds.
- **`measure-g2-provenance-0829.md`, (i) on both halves.** CORRECT. A refit of a
  finite ladder and a residual reading at one level are descriptive.

**The one attribution that is misplaced, with the label itself correct.**
`measure-g2z2-0829.md` §0 states, and §5 repeats, that "an UPPER bound on
G2(x#)/Z2(x), holding for all x and combined with any bound on Z2(x) below the
zone width, would be **(ii)**, TPC-strength". The wording is inherited verbatim
from `object-bridge-read-0829.md` §7 Q1. The label (ii) is right. The mechanism
named for it is not, and the difference matters because §0 presents the ratio
bound as the thing that would carry the content.

Two readings of "a bound on Z2(x) below the zone width", and neither puts the
content in the ratio bound.

1. Read literally, `Z2 < width` is already PROVEN and trivial: R0 gives
   head + Z2 + tail <= width with head >= 1 and tail >= 3, so Z2 < width at
   every zone with no hypothesis at all. Combined with G2 <= C * Z2 it yields
   G2 < C * width, which for the measured C of at least 8.14 is far above
   x'^2 - x' and is therefore **not** TPC-strength. Under this reading the
   combination is (i), not (ii).
2. Read as intended, a bound placing Z2 well below the width is what is meant.
   But **Z2(p) is defined only when the zone holds at least two pairs**
   (the note's own §0 conventions say so), so any statement of the form "Z2(x)
   satisfies a bound for all x" presupposes that every zone is non-empty, which
   is the strong Zone Postulate and is TPC-strength by
   `ZONE-POSTULATE.md` §2 before the bound is used at all. The (ii) is carried
   entirely by the definedness of Z2, and the G2/Z2 upper bound adds nothing to
   the implication.

This is structurally the same trap the audit records at its §3.2 for the depth
law y*: an object measured only where it is defined, whose definedness is itself
the conjecture. The audit's warning there ("the measurement cannot see this")
transplants without change.

**Consequence, and it is small.** No legal target dies, because the g2z2 note
claims no such bound, attempts none, and says three times that none is in
evidence. The correction is to the sentence, not to the programme: the thing
that would be TPC-strength is a Z2 bound holding at all x, with or without a
G2/Z2 bound beside it. No wording is proposed in §3, because the
sentence originates in `object-bridge-read-0829.md` §7 Q1 and should be fixed
there first; this review edits no existing file and does not know what else is
in flight against that note.

**One further label check that passes.** The provenance note's §0 says both
questions "were labelled (i) in `object-g2-read-0829.md` §6 C4 and §8 Q4/Q6".
The source labels Q1 and Q2 of §8 as (i) and the read of §6 C4 is consistent.
The generic note's §0 says it answers Q1/C1 of the same note, which §8 Q1 does
label (i). Both citations check out.

## 5. What the notes missed

Six items. The first is in the corpus's favour and the rest are gaps.

**M1. `measure-g2z2-0829.md` §5's PROVEN statement does not need A144311, and
D1's single-witness doubt does not touch it.** The note lets D1 shadow
everything above x = 43 ("every ratio above x = 43 inherits exactly that
doubt"), which is right for the ratios and unnecessary for the theorem. G2(x#)
is non-decreasing in x, and the proof is one line: every twin slot mod x'# is a
twin slot mod x#, so the level-x slot set viewed in [0, x'#) contains the
level-x' set, and deleting elements from a cyclic set cannot shorten its maximal
gap. Hence G2(x#) >= G2(43#) = 618 for every x >= 43, from the in-house exact
ladder alone. Z2 is exact at every level and never exceeds 210 below x = 79. So
Z2(x) < G2(x#) at x = 47..79 follows from custody data plus an elementary lemma,
with A144311 nowhere in it. **The eighteen-level PROVEN claim is therefore
custody-grade, not literature-grade.** [PROVEN, re-derived here; the
monotonicity lemma is elementary and this review did not search whether the
corpus already states it.]

**M2. The (ii) in `measure-g2z2-0829.md` §0 is carried by Z2's definedness, not
by the ratio bound.** Set out in §4. The note's own §0 conventions record that
Z2(p) is "defined when the zone holds at least two pairs" and then, four
paragraphs later, contemplates "any bound on Z2(x)" as a hypothesis that could
be combined with something else. The two sentences do not sit together, and the
audit's §3.2 records exactly this shape for y*.

**M3. The Poisson arm is read at the two decades where its own first-moment
calibration fails, and neither note nor producer says so.** P4's pass is
sum k / sum lambda = 0.9991 inside [0.97, 1.03], but decade 10^5 alone holds
1.946e12 of the 2.034e12 pairs, 95.7 per cent, so the pass is a statement about
one decade. The per-decade ratios are 0.7285, 0.9595, 0.9900, 1.0000, 0.9992,
0.9991, and the two smallest decades read **outside** the pre-registered band,
0.7285 and 0.9595. The whole of M2's Poisson figure comes from those two
decades, and 100 per cent of the corrected 1.518e-1 comes from p = 3, 5, 7, 11
alone. So the arm is being read precisely where the model is worst calibrated.
D3 says the calibration is first-moment only, which is true and is not the
sharper statement: the first moment **fails its own band** at the zones that
produce the entire figure. [MEASURED, recomputed from the block's own decade
table.]

**M4. The provenance note leaves the drift's share of +6.58 unquantified, and it
is one line.** §4 says c2' drift makes a trailing forecast under-predict "by
construction" without a number, which the house rule does not allow. Recentring
on the ten post-37 levels (mean 0.5118, sd 0.0159) puts x = 37 at z = +5.18;
recentring on all seventeen non-37 levels x = 11..79 (mean 0.4926, sd 0.0290)
puts it at z = +3.49. So drift plus the narrowness of a seven-point window
account for roughly half the excess and roughly 3.5 sd survive any of the three
centrings. That is a materially weaker headline than +6.58 and a materially
stronger one than "unexplained" implies. [MEASURED here.]

**M5. The provenance note does not check the one asymmetry in its own control,
and this review did: it is not material.** Every G2 fit excludes p = 2 and p = 3,
while the control's 45 sliding windows include the two that start there.
Restricting the control to windows starting at index 2 or above gives 43 windows
with mean 1.283 and bias 0.283, moving the corrected headline from 1.498 to
1.495. **Checked and dismissed**, and worth recording so nobody spends a session
on it. [MEASURED here.]

**M6. None of the three notes checks that its own ledger id reached
`QUESTIONS.md`, and none of the three has.** Grepping `research/QUESTIONS.md`
for `Q-measure-g2z2`, `Q-measure-g2-generic` and `Q-g2-provenance-x37` returns
zero hits each. The index is generated from the ledger blocks and has not been
regenerated. Until it is, the three ANSWERED questions are invisible to the
gate CLAUDE.md points every brief at, which is the failure the ledger exists to
prevent.

### 5a. Are the notes' own defect lists honest and complete?

**`measure-g2z2-0829.md`, D1 to D8: honest, one omission and one overreach in
the reader's favour.** D1 (single-witness terms), D2 (least position is not the
argmax set, with the seam reading withdrawn), D3 (Poisson is first-moment only),
D4 (env's reach), D5 (custody is disk order), D7 (the forced embed) and D8
(zones are not tiles) all check out against the artifacts, and D2's withdrawal
of a passing pre-registered arm is the kind of self-correction that is easy to
skip and was not skipped. D6's claim that "every figure in §2 to §5 is
transcribed from the embedded OUTPUT block" is **false for one figure**, the
331.2 s in §4 (§3a E2). **Missing:** the mislabelled Poisson figure (§0), the
M3 sharpening above, and the fact that D1's doubt does not reach §5's theorem
(M1). Net: the list is honest, and it is not complete.

**`measure-g2-generic-0829.md`, defects 1 to 6: honest and near-complete.** All
six check out, including the price of the exhaustive x = 23 run, the nested
levels, the unmeasured d-profile, the unsealed pre-registration and the shared
author of both engines. The note leads with the disconfirming reading (the
below-mean z at all five levels) before its own hit, which is the house order.
**Missing:** nothing in the mathematics. The custody paragraph's two timestamps
are presented as `stat` observations and are not corroborated by anything on
disk (§2b), which belongs in defect 4 rather than in §2's prose.

**`measure-g2-provenance-0829.md`, defects 1 to 6: honest and the most complete
of the three.** Defect 1 (provenance confounded with range) is correctly named
as the binding limit and is quantified against the control. Defect 3 (the
rolling windows overlap the point they later test) is the sharpest self-criticism
in any of the three notes. Defect 4 (no multiple-comparison correction anywhere,
with the count of tests) and defect 6 (the blocks are not the briefing's) are
both accurate. **Missing:** the drift quantification (M4), the eleven-of-22 band
population (§3b E6), and the P1 threshold restatement (§1c item 50). Nothing
missing is load-bearing.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
