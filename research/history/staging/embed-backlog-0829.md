<!-- ledger
id: Q-embed-backlog-0829
status: PARTIAL
todo: none
question: How much of the embed backlog (legacy scripts with no OUTPUT block, readings not traceable to their block) could be closed in one pass, and what did the fresh runs contradict?
verdict: MEASURED. embed-backlog fell 218 -> 189 findings in one pass: no-output-block 34 -> 5, readings-not-traceable 181 -> 181 (untouched by design), hand-pasted-tail 3 -> 3. Twenty-nine legacy scripts were bound with node research/qc/embed.js, zero --force was used, and one legacy reading is contradicted by its own fresh output (attack-beta2-03-exact-strata reading 8, "1.04 to 1.07 across y = 7..23" against a printed 1.102 at y = 7).
-->

# Embed backlog, the cheap half: one pass, 2026-08-29

## 0. Counts before and after, and the worst finding

MEASURED, by `node research/qc.js embed-backlog` on this working tree, before
and after the pass:

| class | before | after |
|---|---|---|
| `readings-not-traceable` | 181 | 181 |
| `no-output-block` | 34 | 5 |
| `hand-pasted-tail` | 3 | 3 |
| **TOTAL** | **218** | **189** |

The brief priced `readings-not-traceable` at 182 and `no-output-block` at 34.
The 34 reproduces; the 181 measured here is one below the briefed 182, and no
readings block was edited in this pass, so the discrepancy predates it and is
not explained by anything done here.

`node research/qc.js` (fast gate) reads TOTAL 0 after the pass, across all
thirteen gated checks, unchanged from before it.

**The worst finding, stated first.** `research/attack-beta2-03-exact-strata.js`
carries a legacy hand-pasted READINGS section whose reading 8 says the
diagnostic F_meas at u = 3 "is flat at 1.04 to 1.07 across y = 7..23". The
fresh output block printed by the run bound today gives, in its `u = 3.00`
table, F_meas = 1.102, 1.067, 1.040, 1.040, 1.049, 1.042 at y = 7, 11, 13, 17,
19, 23. The stated interval does not contain the y = 7 value. 1.07 is a
legitimate hand-rounding of the printed 1.067, but that is the y = 11 row, so
the reading's SPAN is wrong: the interval is the one for y = 11..23, carrying a
label that claims y = 7..23. The qualitative claim (flatness) survives at
1.04 to 1.10; the quoted interval does not. NOT FIXED, per the standing rule
that a readings block is never edited to match its output.

Second in severity, and structural rather than arithmetic:
`research/h2-lower-ladder.js` cannot ever reproduce its own `out-sha256`. Its
table header ends `... secs  cum-secs`, and `scrubSecsColumns` in
`research/qc/tailfmt.js` only scrubs a timing column when `secs` is literally
the LAST header token. Both wall-clock columns therefore enter the hash. The
mathematics columns reproduced exactly across two runs (n = 3..26 identical);
only the seconds moved. So the `--check` verdict `out-sha256 DIFFERS` on that
file is a timing artefact of the scrubber's scope rule, not a computation that
disagrees with itself.

Third: the pass required a hand edit that the brief did not anticipate.
`embed.js` exits 4 and writes nothing on a file with no OUTPUT banner, so
none of the 34 could be bound without first adding the six-line empty banner
scaffold that `embed.js`'s own refusal message prints. That scaffold was
appended verbatim to 29 files, by hand, and contains no data: every byte of
every OUTPUT body in this pass was written by `embed.js`. The empty
`// READINGS` banner below each was left empty, because this pass writes no
readings.

## 1. The full backlog listing, before the pass

Verbatim from `node research/qc.js embed-backlog`, run before any file was
touched.

```
qc: 87 working documents, 401 history documents, 336 scripts
running: embed-backlog

────────────────────────────────────────────────────────────────────────────
EMBED-BACKLOG  —  legacy tails awaiting an embed, and readings ranked by how much of them the output does not contain
218 finding(s)   [230 ms]
────────────────────────────────────────────────────────────────────────────

  readings-not-traceable  (181)
    research/01-zone-twin-share.js:84
        2 of 4 figures in READINGS are not in the OUTPUT block (50%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.793, 0.7930547395
    research/03-legendre-error-budget.js:63
        1 of 1 figures in READINGS are not in the OUTPUT block (100%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 20,000
    research/04-crystallization-and-hl.js:77
        6 of 24 figures in READINGS are not in the OUTPUT block (25%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 662, -662, 661.81, 661.86
    research/05-twin-jacobsthal.js:82
        10 of 14 figures in READINGS are not in the OUTPUT block (71%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 214,708,725, 0.23, 0.30, 1.2e9
    research/05b-twin-jacobsthal-segmented.js:61
        2 of 2 figures in READINGS are not in the OUTPUT block (100%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.0e11, 200,560,490,130
    research/06-variance-theorem.js:159
        6 of 11 figures in READINGS are not in the OUTPUT block (55%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.25, 1.2e-2, 1.3e-3, 99.87
    research/a060256-seam-ladder.js:195
        1 of 15 figures in READINGS are not in the OUTPUT block (7%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1000
    research/a3-01-misalignment-ledger.js:354
        5 of 27 figures in READINGS are not in the OUTPUT block (19%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.349, 214.7, 6.23e9, 1.34883
    research/a3-02-diagonal-f.js:571
        21 of 121 figures in READINGS are not in the OUTPUT block (17%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.058, 0.78, 0.11, 0.15
    research/a3-03-f-from-census.js:599
        22 of 129 figures in READINGS are not in the OUTPUT block (17%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.62, 1.05, 1e80, 1e82
    research/a3-04-maxsum-recursion.js:732
        12 of 70 figures in READINGS are not in the OUTPUT block (17%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 214.7, 252, 366, 1,1,2,2,2,3,3,4
    research/a3-06-origin-vs-max.js:597
        14 of 106 figures in READINGS are not in the OUTPUT block (13%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1011, 337, 29,839, 1847
    research/a3-07-pane-overlap.js:700
        36 of 163 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 77.8, 1.48, 3.301, 1.549
    research/a3-08-adjacent-pairs.js:825
        49 of 96 figures in READINGS are not in the OUTPUT block (51%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 8192, 6.2e9, 200.9, 401.7
    research/a3-09-histogram-operator.js:620
        25 of 113 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 17.8, 11.5, 5e-16, 0.13333
    research/a3-10-lower-tightness.js:779
        18 of 63 figures in READINGS are not in the OUTPUT block (29%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 4096, 214.7, 223092870, 214708725
    research/attack-01-gap-cartography.js:80
        11 of 16 figures in READINGS are not in the OUTPUT block (69%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 659,661, 809,811, 809, 1.205e9
    research/attack-02-head-bias.js:76
        17 of 38 figures in READINGS are not in the OUTPUT block (45%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.09, 1.30, 0.006, 2197
    research/attack-03-higher-moments.js:56
        6 of 12 figures in READINGS are not in the OUTPUT block (50%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 34.8, 30.4, 37.4, 34.83
    research/attack-04-fourier-budget.js:90
        1 of 6 figures in READINGS are not in the OUTPUT block (17%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 117.3
    research/attack-05-annulus-induction.js:58
        1 of 1 figures in READINGS are not in the OUTPUT block (100%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 192870
    research/attack-06-difference-hierarchy.js:71
        4 of 6 figures in READINGS are not in the OUTPUT block (67%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2,4,8,16, 8,16, 258, 288815
    research/attack-06b-difference-map.js:360
        12 of 43 figures in READINGS are not in the OUTPUT block (28%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 32,64,128, 5,7,11,13, 5.86, 258
    research/attack-10-anchored-origin.js:71
        9 of 15 figures in READINGS are not in the OUTPUT block (60%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.005, 3.17, 0.793, 0.895
    research/attack-D-twopoint.js:743
        14 of 50 figures in READINGS are not in the OUTPUT block (28%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: -10.07, 0.044, 13.1, 33.3
    research/attack-ab-coupling-01.js:835
        1 of 11 figures in READINGS are not in the OUTPUT block (9%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 103
    research/attack-ab-coupling-02-lp.js:1178
        2 of 19 figures in READINGS are not in the OUTPUT block (11%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 5582, 52230
    research/attack-advmin-1113.js:816
        5 of 19 figures in READINGS are not in the OUTPUT block (26%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.6e9, 2e10, 5e10, 100
    research/attack-beta2-04-loss-budget.js:1443
        15 of 203 figures in READINGS are not in the OUTPUT block (7%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.8824, 0.8462, 2.2e-16, 2.2204e-16
    research/attack-beta2-05-covering-prune.js:565
        16 of 49 figures in READINGS are not in the OUTPUT block (33%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 8.35, 104, 15.3, 1.1437
    research/attack-beta2-A-B-bounded.js:807
        7 of 56 figures in READINGS are not in the OUTPUT block (13%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2,597, 25,110, 11.84, 6.18
    research/attack-bf-split.js:715
        22 of 71 figures in READINGS are not in the OUTPUT block (31%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 102, 337, 345, 5.1580646803
    research/attack-f4weak-01.js:666
        2 of 64 figures in READINGS are not in the OUTPUT block (3%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 4.2e+3, 1,1,1,1,2,2,2,2,2,3
    research/attack-foldL-01-census.js:1240
        1 of 37 figures in READINGS are not in the OUTPUT block (3%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 12,12
    research/attack-foldL-03-transport.js:1286
        1 of 116 figures in READINGS are not in the OUTPUT block (1%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.046
    research/attack-foldL-04-genealogy.js:856
        6 of 49 figures in READINGS are not in the OUTPUT block (12%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.985, 5940, 244000, 9.5e-2
    research/attack-foldL-04-localized.js:430
        12 of 69 figures in READINGS are not in the OUTPUT block (17%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 214,708,725, 11.57, 11.52, 1.22
    research/attack-foldL-05-maxsum-direct.js:813
        2 of 99 figures in READINGS are not in the OUTPUT block (2%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 302, 4.2665
    research/attack-ford-halberstam.js:852
        15 of 68 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 3.553e-15, 6.821e-13, 102, 337
    research/attack-frontier37-01-word.js:369
        15 of 35 figures in READINGS are not in the OUTPUT block (43%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 246, 372, 6.2e9, 1.47
    research/attack-frontier37-02-transport.js:512
        8 of 24 figures in READINGS are not in the OUTPUT block (33%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.0119, 432,036, 6.34, 100,000
    research/attack-growth-law.js:1243
        4 of 87 figures in READINGS are not in the OUTPUT block (5%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.282, 2.8e10, 1.282, 1.214
    research/attack-hsub-01.js:575
        3 of 35 figures in READINGS are not in the OUTPUT block (9%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1080, 2.01, 146,969
    research/attack-hybrid-bound.js:468
        9 of 55 figures in READINGS are not in the OUTPUT block (16%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.29, 2.01, 1.19, 0.95
    research/attack-ioslack-survey.js:1245
        2 of 44 figures in READINGS are not in the OUTPUT block (5%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.054, 335
    research/attack-kk-substitution.js:1054
        2 of 66 figures in READINGS are not in the OUTPUT block (3%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1e12, 048670
    research/attack-lower-bound.js:956
        11 of 70 figures in READINGS are not in the OUTPUT block (16%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.27, 1.48, 0.082, 2.30e3
    research/attack-prior-art-last-ground.js:992
        5 of 11 figures in READINGS are not in the OUTPUT block (45%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 9798831607314, 1389, 1399, -1963
    research/attack-quadpoint-01.js:406
        3 of 19 figures in READINGS are not in the OUTPUT block (16%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 9.0e15, 121, 169
    research/attack-quadpoint-02.js:381
        1 of 23 figures in READINGS are not in the OUTPUT block (4%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 9.0e15
    research/attack-sigma31-01.js:834
        2 of 30 figures in READINGS are not in the OUTPUT block (7%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.65, 1.34e10
    research/attack-sqrt-cancellation.js:639
        2 of 45 figures in READINGS are not in the OUTPUT block (4%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.209, 4.2665
    research/attack-tail-maximal.js:1093
        5 of 118 figures in READINGS are not in the OUTPUT block (4%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2350, -0.53, 1e12, 2349.71
    research/attack-x-offset-01-terms.js:395
        10 of 25 figures in READINGS are not in the OUTPUT block (40%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.201e-4, 1.185e-4, 1.311e-4, 0.976e-4
    research/attack-x-offset-02-profile.js:835
        9 of 47 figures in READINGS are not in the OUTPUT block (19%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 147.6, 0.03402, 0.02859, 1.15
    research/attack-x-offset-03-cofactor.js:158
        2 of 16 figures in READINGS are not in the OUTPUT block (13%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 5.05e8, 6.12
    research/attack-z3-immune-01.js:940
        2 of 48 figures in READINGS are not in the OUTPUT block (4%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 9.0e15, 173
    research/attack2-01-06-seam-census.js:165
        16 of 42 figures in READINGS are not in the OUTPUT block (38%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 900,000, 0.03, 0.02, 0.0275
    research/attack2-02-08-tomography.js:309
        19 of 66 figures in READINGS are not in the OUTPUT block (29%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 357, 12.5, 1667,1956, 209,211
    research/attack2-03-09-depth-formula.js:150
        6 of 24 figures in READINGS are not in the OUTPUT block (25%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.79305, 11,13, 121, 0.7935
    research/attack2-04-10-hierarchy-oeis.js:175
        7 of 29 figures in READINGS are not in the OUTPUT block (24%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.65, -105,105, 1,2,4, 2,1,1,2,1,6,8,11,4,16,22,4,74,24,37,28,14,11,242,11
    research/attack2-05-07-integral-ladder.js:234
        3 of 4 figures in READINGS are not in the OUTPUT block (75%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 500, 060256, 384545
    research/attack2-rankin2d.js:493
        34 of 158 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 20.5, 3.49e8, 7.55e8, 5.4e3
    research/attack2-rich-vein.js:310
        5 of 65 figures in READINGS are not in the OUTPUT block (8%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 16.9, 97.5, 137, 1667,1679,1691,1697,1709,1721,1739,1751,1781,1787,1817,1829,1847,1871
    research/birth-cohorts.js:92
        3 of 10 figures in READINGS are not in the OUTPUT block (30%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 22275, 135, 297
    research/destroyer-census-01.js:955
        3 of 44 figures in READINGS are not in the OUTPUT block (7%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 27.51, 440,312, 0.79305
    research/discrepancy-two-class.js:745
        25 of 115 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 20.913, 0.0e0, 9.6e-14, 25.7
    research/exponent-control.js:620
        22 of 78 figures in READINGS are not in the OUTPUT block (28%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.191, 0.238, 0.008, 1.610
    research/fdecay-band-01.js:206
        1 of 20 figures in READINGS are not in the OUTPUT block (5%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.3e-12
    research/fdecay-deep-01-census-defect.js:452
        7 of 60 figures in READINGS are not in the OUTPUT block (12%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.8e+5, 1e16, 0.11, -1.038
    research/fdecay-deep-03-ladder.js:475
        3 of 77 figures in READINGS are not in the OUTPUT block (4%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1e11, 1.695, 0.906
    research/fold-profile-01-per-copy.js:371
        16 of 59 figures in READINGS are not in the OUTPUT block (27%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 42.0, 39.6, 15.6, 0.266
    research/fold-profile-02-deviation-law.js:439
        14 of 46 figures in READINGS are not in the OUTPUT block (30%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: -22275, -378675, -7952175, 22.2
    research/fold-profile-03-inside-copy0.js:435
        9 of 58 figures in READINGS are not in the OUTPUT block (16%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 41,43, 1367, 1847, -14.9
    research/fold-profile-04-count-vs-damage.js:233
        5 of 15 figures in READINGS are not in the OUTPUT block (33%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.577, 0.083, 500, 0.5774
    research/fold-profile-05-survival-curve.js:306
        17 of 63 figures in READINGS are not in the OUTPUT block (27%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.892627, 0.8912, 0.8929, 0.8927
    research/fold-profile-06-scale-free.js:191
        17 of 49 figures in READINGS are not in the OUTPUT block (35%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.50, 0.19, 0.16, 9.7e6
    research/fold-profile-07-impact-window.js:388
        6 of 40 figures in READINGS are not in the OUTPUT block (15%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 23,100, 10000,14947, 17,973, 199,999
    research/fold-profile-08-zone-localized-gap.js:304
        32 of 57 figures in READINGS are not in the OUTPUT block (56%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 359, 839, 714, 10.2
    research/fold-profile-09-natal-dispersion.js:259
        18 of 46 figures in READINGS are not in the OUTPUT block (39%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 4.9e11, 700,000, 2e11, 4.5e5
    research/fold-profile-10-lineage-census.js:221
        8 of 30 figures in READINGS are not in the OUTPUT block (27%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 440,312, 321, 99.93, 6000
    research/fold-profile-11-lineage-yield.js:182
        31 of 61 figures in READINGS are not in the OUTPUT block (51%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.98, 0.37, 0.04403, 0.06164
    research/fold-profile-12-anatomy-survival.js:267
        19 of 55 figures in READINGS are not in the OUTPUT block (35%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 576, 400, -1.41, 0.13
    research/fold-profile-13-hotspot-sweep.js:311
        32 of 60 figures in READINGS are not in the OUTPUT block (53%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 318, 24,962, 4.78, 4.44
    research/fold-profile-13-null-mc.js:225
        1 of 5 figures in READINGS are not in the OUTPUT block (20%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 200
    research/fold-profile-14-underdispersion.js:256
        20 of 58 figures in READINGS are not in the OUTPUT block (34%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.0034, 0.0078, 0.0554, 0.0015
    research/fold-profile-15-variance-law.js:254
        31 of 82 figures in READINGS are not in the OUTPUT block (38%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 118, 20260817, 0.32, 0.18
    research/fold-profile-16-is-it-the-tile.js:243
        9 of 45 figures in READINGS are not in the OUTPUT block (20%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 20260817, 10.5, 895,790, 268
    research/fold-succession-autocorr.js:155
        1 of 16 figures in READINGS are not in the OUTPUT block (6%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: -0.02
    research/foldL-window5-01-extinction.js:874
        1 of 25 figures in READINGS are not in the OUTPUT block (4%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 7038e0
    research/fossil-shadows.js:72
        10 of 20 figures in READINGS are not in the OUTPUT block (50%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.639, 223, 0.64, 87.0
    research/genealogy.js:93
        6 of 14 figures in READINGS are not in the OUTPUT block (43%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.41625, 1.3203236316937248, -1.1544313298, 0.6601618158
    research/grain-census.js:426
        11 of 37 figures in READINGS are not in the OUTPUT block (30%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0,6,12, 0.4117, 1.23846, 170170
    research/h2-length-needed.js:217
        6 of 28 figures in READINGS are not in the OUTPUT block (21%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.004, 0.25, 1.262, 1.267
    research/history/staging/c2prime-refit-22.js:594
        3 of 59 figures in READINGS are not in the OUTPUT block (5%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.279, 1.880, 4000
    research/history/staging/head-residual-null.js:451
        1 of 49 figures in READINGS are not in the OUTPUT block (2%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 8.4661
    research/history/staging/redteam-0828-varE.js:564
        9 of 71 figures in READINGS are not in the OUTPUT block (13%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.9e-11, 2.5e-5, 13,210, 13,2310
    research/history/staging/varE-asymptotic.js:396
        23 of 90 figures in READINGS are not in the OUTPUT block (26%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 9.2e-5, 0.9426, 1.0982, 1.1058
    research/history/staging/varE-limit-theorem.js:329
        36 of 84 figures in READINGS are not in the OUTPUT block (43%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.377144535, 0.387403848, 0.395666501, 0.377144494
    research/history/staging/varE-spectral.js:468
        6 of 70 figures in READINGS are not in the OUTPUT block (9%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.9e-7, 4.441347, 16.7, 0.611
    research/history/staging/varE-theta2-proof.js:303
        12 of 58 figures in READINGS are not in the OUTPUT block (21%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1e-12, 14929, 2.62, 2.53
    research/history/staging/varE-theta2-step.js:201
        4 of 55 figures in READINGS are not in the OUTPUT block (7%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.0046, 0.0017, 1.1e9, 6469693230
    research/import-bfree-01-toeplitz.js:673
        1 of 49 figures in READINGS are not in the OUTPUT block (2%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 048670
    research/import-bfree-03-admissible-complexity.js:315
        2 of 42 figures in READINGS are not in the OUTPUT block (5%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 4.26645, 4.26645028414864191641
    research/import-bridge-01-verify.js:527
        2 of 38 figures in READINGS are not in the OUTPUT block (5%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 422, 23,23
    research/import-chaining-01.js:419
        28 of 101 figures in READINGS are not in the OUTPUT block (28%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.0530, 0.1168, 0.0875, 109.1
    research/import-chaining-02.js:294
        8 of 80 figures in READINGS are not in the OUTPUT block (10%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 3.822, 4.475, 7.25, 9.04
    research/import-chaining-03.js:169
        5 of 62 figures in READINGS are not in the OUTPUT block (8%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 3.03, 4.25, 1.04, 2.05
    research/import-kw-01-calibrate.js:297
        4 of 20 figures in READINGS are not in the OUTPUT block (20%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.05, 7e16, 0.759, 59.8
    research/import-l1l2-01.js:637
        2 of 59 figures in READINGS are not in the OUTPUT block (3%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.0516, -0.081980
    research/import-maxplus-02-subadditivity.js:870
        4 of 76 figures in READINGS are not in the OUTPUT block (5%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.11, 4.26645, -0.11, 317
    research/import-suen-01-transfer.js:511
        1 of 81 figures in READINGS are not in the OUTPUT block (1%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.0e11
    research/import-thinning-02-coalescence.js:554
        1 of 42 figures in READINGS are not in the OUTPUT block (2%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.05
    research/import-thinning-03-deepfolds.js:312
        4 of 35 figures in READINGS are not in the OUTPUT block (11%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.0818, 0.0317, 1.0577, 0.987
    research/lemmaV-parseval.js:820
        26 of 147 figures in READINGS are not in the OUTPUT block (18%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.2865, 1.197, 2.6e-15, 1.4e-13
    research/lemmaV-sup-extension.js:1005
        57 of 215 figures in READINGS are not in the OUTPUT block (27%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: -0.535, 147, 1544, 4.987
    research/level-ledger-tight.js:828
        21 of 94 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 801, 3.937e4, 49.1520, 5.97
    research/lp-push-x43.js:958
        21 of 51 figures in READINGS are not in the OUTPUT block (41%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 3.2665, 0.9513, 0.130, 0.093
    research/measure-g2-generic-0829.js:534
        11 of 49 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 4.26645, 1.36, 1.93, 1.63
    research/measure-g2z2-0829.js:587
        7 of 37 figures in READINGS are not in the OUTPUT block (19%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.2801, 1e11, 2.0339e12, 2.0358e12
    research/natal-cap-01-window-cartography.js:333
        14 of 74 figures in READINGS are not in the OUTPUT block (19%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 10.1, 781, 1.63, 0.791
    research/natal-cap-02-fourier-budget.js:430
        10 of 47 figures in READINGS are not in the OUTPUT block (21%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1e-13, 149, 1.165, 1.185
    research/natal-cap-03-dilation-ensemble.js:527
        14 of 79 figures in READINGS are not in the OUTPUT block (18%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1563.8, 1.007, 1.038, 1.19
    research/natal-cap-04-packing-cap.js:626
        4 of 57 figures in READINGS are not in the OUTPUT block (7%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1000, 1600, 154, 11,13,17,19,29,31
    research/natal-cap-05-second-moment.js:451
        8 of 45 figures in READINGS are not in the OUTPUT block (18%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.894, 0.939, 25.2, 50.8
    research/natal-cap-06-bonferroni.js:462
        12 of 35 figures in READINGS are not in the OUTPUT block (34%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 98.7, 500, 0.6065, 53.8
    research/natal-cap-07-trajectory.js:377
        17 of 70 figures in READINGS are not in the OUTPUT block (24%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 164, 1.06, 1.02, 340
    research/natal-cap-08-staircase.js:444
        19 of 61 figures in READINGS are not in the OUTPUT block (31%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 343, 11,17, 13,19, 1,7,23,29
    research/natal-cap-09-mirror.js:305
        6 of 22 figures in READINGS are not in the OUTPUT block (27%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 166, 0.28, 0.36, 167
    research/natal-cap-10-sieve-cap.js:380
        4 of 47 figures in READINGS are not in the OUTPUT block (9%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 19,23, 700, 0.080, 4.266
    research/natal-cap-11-kstar23.js:409
        17 of 75 figures in READINGS are not in the OUTPUT block (23%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 151, 14768, 0.17, 0.41
    research/natal-cap-12-overlap-sign.js:406
        9 of 70 figures in READINGS are not in the OUTPUT block (13%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 601.5, 35,906, 11,042,680, 1,631
    research/natal-cap-13-anchored-calm.js:495
        22 of 71 figures in READINGS are not in the OUTPUT block (31%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.4e-8, 7140, 164, 2.78
    research/natal-cap-14-discrepancy-lemma.js:667
        28 of 95 figures in READINGS are not in the OUTPUT block (29%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1e-14, 164, 32,340, 210,400
    research/natal-cap-15-head-certificate.js:301
        12 of 67 figures in READINGS are not in the OUTPUT block (18%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 599, 0.44, 0.45, 0.47
    research/natal-cap-16-fast-variance.js:300
        35 of 139 figures in READINGS are not in the OUTPUT block (25%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 6413, 194176, 1.2e-9, 29000
    research/natal-cap-17-cheap-laws.js:375
        12 of 81 figures in READINGS are not in the OUTPUT block (15%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.64, 1.98, 0.65, 143,139,150
    research/natal-cap-18-at29.js:640
        32 of 125 figures in READINGS are not in the OUTPUT block (26%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.026, 0.0025, 0.022, 0.9917
    research/natal-cap-19-calm-lemma.js:539
        27 of 79 figures in READINGS are not in the OUTPUT block (34%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.00014, 0.000062, 1.84, 3.94
    research/natal-cap-20-third-order.js:363
        12 of 43 figures in READINGS are not in the OUTPUT block (28%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.00032, 0.00063, 4e10, 0.79
    research/natal-cap-22-at31-drift.js:264
        22 of 70 figures in READINGS are not in the OUTPUT block (31%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 5.3e11, 150.3, 4.151e9, 6.83
    research/natal-cap-23-covadj-proof.js:344
        5 of 25 figures in READINGS are not in the OUTPUT block (20%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 99.3, 0.94, 99.332, 0.9352
    research/natal-cap-24-boundK-curve.js:281
        12 of 66 figures in READINGS are not in the OUTPUT block (18%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2328, 868, 1.74, 2,839
    research/natal-cap-25-excess-law.js:416
        18 of 252 figures in READINGS are not in the OUTPUT block (7%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.183, 0.0094, 1.69, 1.17
    research/natal-cap-26-minus-half.js:314
        8 of 95 figures in READINGS are not in the OUTPUT block (8%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 599, 0.94, 1600, -0.29
    research/natal-cap-27-t4-at13.js:389
        26 of 58 figures in READINGS are not in the OUTPUT block (45%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.0e-14, 990,2, 4.9e-8, 0.996
    research/natal-cap-28-analytic-certificate.js:452
        12 of 290 figures in READINGS are not in the OUTPUT block (4%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.83, 0.996, 99.6, 7.4e8
    research/natal-cap-29-sigma-plateau.js:371
        34 of 156 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 8e-16, 0.69, 1.732, 0.45
    research/natal-cap-30-skeleton-bound.js:268
        26 of 100 figures in READINGS are not in the OUTPUT block (26%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.095, 1593, 7.3e6, 99.99
    research/natal-cap-31-calm-vs-kill.js:275
        31 of 91 figures in READINGS are not in the OUTPUT block (34%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 16.3, 669, 1146, 43654
    research/natal-cap-32-wrap-identity.js:869
        47 of 52 figures in READINGS are not in the OUTPUT block (90%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1e-13, -1.7e-2, 0.77, 0.87
    research/natal-cap-33-overnight.js:594
        37 of 78 figures in READINGS are not in the OUTPUT block (47%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.295, 0.429, 0.327, 0.388
    research/natal-cap-34-wrap-precision.js:878
        132 of 208 figures in READINGS are not in the OUTPUT block (63%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: -3.5e-5, -3.48e-5, -4.53e-5, 1.06e-5
    research/natal-cap-35-x-multiplicity.js:675
        30 of 122 figures in READINGS are not in the OUTPUT block (25%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 18.5, 11,13,17, 0.0398, 2.2e8
    research/natal-cap-36-skeleton-door.js:377
        29 of 71 figures in READINGS are not in the OUTPUT block (41%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 340, 0.29, 5.7e2, 1.8e1
    research/natal-cap-37-at41-march.js:857
        12 of 76 figures in READINGS are not in the OUTPUT block (16%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.7e9, 74987566147, 4532204145, 32000
    research/natal-cap-38-loudness-driver.js:294
        22 of 53 figures in READINGS are not in the OUTPUT block (42%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 272, 4,200, 99.34, 99.3
    research/natal-cap-39-triple-census.js:650
        21 of 71 figures in READINGS are not in the OUTPUT block (30%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 63756, 48.7, 0.52, 2.75
    research/natal5-variance.js:213
        14 of 37 figures in READINGS are not in the OUTPUT block (38%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.0e-4, 8.4e-6, 320, 100
    research/null-limsup-01-score.js:559
        1 of 80 figures in READINGS are not in the OUTPUT block (1%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1400
    research/records-placement-01.js:226
        1 of 11 figures in READINGS are not in the OUTPUT block (9%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.8e15
    research/redteam-DP1-certificate.js:331
        7 of 42 figures in READINGS are not in the OUTPUT block (17%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 3149, 3151, 0.98748, 1.020
    research/removal-ledger.js:74
        28 of 34 figures in READINGS are not in the OUTPUT block (82%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 447840, 37,534, 2.52, 68.7
    research/scanstat-t37-02-validate.js:180
        5 of 23 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1485, 30030, 135, 22275
    research/scanstat2-01-t31.js:456
        12 of 89 figures in READINGS are not in the OUTPUT block (13%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.73, 1.38, 26.107437, 0.3565
    research/scanstat2-02-crossover.js:259
        4 of 50 figures in READINGS are not in the OUTPUT block (8%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.0179, 0.0177, 2.25, 2.61
    research/scour-into-fixed-tile.js:441
        1 of 26 figures in READINGS are not in the OUTPUT block (4%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 29,41
    research/sift-limit-attack.js:166
        7 of 11 figures in READINGS are not in the OUTPUT block (64%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 5.297, 0.93, 223, 200
    research/uframe-repro-01-fold-ladder.js:528
        9 of 28 figures in READINGS are not in the OUTPUT block (32%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.27, 0.28, 2.18e11, 0.267
    research/uframe-repro-02-maxgap-forensics.js:485
        9 of 30 figures in READINGS are not in the OUTPUT block (30%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 2.18e11, 243,822, 1.765, 0.079
    research/varE-exact-ladder-01.js:611
        5 of 79 figures in READINGS are not in the OUTPUT block (6%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1e-15, 6e-18, 7.6e-4, 1.0e-4
    research/verify-kk-substitution.js:584
        4 of 46 figures in READINGS are not in the OUTPUT block (9%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1e300, 2.07, 285, 285.1
    research/verify-ladder-big.js:140
        3 of 11 figures in READINGS are not in the OUTPUT block (27%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 7.42, 54.1, 059861
    research/verify-ladder.js:79
        10 of 15 figures in READINGS are not in the OUTPUT block (67%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 7.42e12, 214,708,725, 6,226,553,025, 217,929,355,875
    research/whatmadeit.js:67
        2 of 9 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.581, 348
    research/xchan-at29-01-segmented.js:593
        4 of 30 figures in READINGS are not in the OUTPUT block (13%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 1.203, 0.000120, 0.000118, 41,809,706.52
    research/xchan-at37-02-verify.js:438
        6 of 15 figures in READINGS are not in the OUTPUT block (40%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 104, 8.511e-6, 3e10, 1.20e-4
    research/zone-tail-01.js:618
        1 of 57 figures in READINGS are not in the OUTPUT block (2%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 0.753
    research/zonegap-01.js:756
        12 of 55 figures in READINGS are not in the OUTPUT block (22%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 706, 34,900, 1,660,000, 4.05
    research/zonegap-02-reduction.js:453
        2 of 4 figures in READINGS are not in the OUTPUT block (50%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 4.2665, 115
    research/zonegap-04-sweep-1e12.js:542
        15 of 43 figures in READINGS are not in the OUTPUT block (35%)
        ADVISORY. prose arithmetic and literature constants land here too; read the file. first: 4e15, 1.14, 2.88, 0.696

  no-output-block  (34)
    research/Lgrowth.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/a3-05-bound-L.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/attack-beta2-02-theta-total.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/attack-beta2-03-exact-strata.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/block-L-first-dead.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/fdecay-deep-00-core.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/gate-multiplies-01.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/gate-multiplies-02.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/gate-multiplies-03.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/h2-lower-ladder.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/h2-prototype.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/h2-randomised.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/history/staging/comb-discrepancy-tight.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/history/staging/lit-kourbatov-shortfall.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/history/staging/record-location-null.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/history/staging/redteam-0828-engine.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/history/staging/redteam-0828-litimports.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/history/staging/thm-buchstab-transfer-shallow.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/history/staging/thm-sharp-sieve-range.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/lit-provenance.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/localized-01-ladder.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/localized-02-fixed-window.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/localized-03-merge-lemma.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/localized-04-maxsum.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/localized-single-alignment.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/lucky-control.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/scanstat-t37-01-engine.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/scanstat-t37-03-shard.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/scope-fractional-retention.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/sift-limit-lemmaV.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/square-window.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/theta-ladder-row.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/window-check.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen
    research/window-exceptions.js:1
        script has no OUTPUT banner: its results have no output custody at all
        ADVISORY. add the banner and bind with qc/embed.js; a cited script whose output exists only in documents is the attack-lower-bound shape waiting to happen

  hand-pasted-tail  (3)
    research/natal-cap-33-overnight.js:565
        OUTPUT block carries no embed fingerprint
        legacy. bind it with: node research/qc/embed.js research/natal-cap-33-overnight.js
    research/natal-cap-34-wrap-precision.js:697
        OUTPUT block carries no embed fingerprint
        legacy. bind it with: node research/qc/embed.js research/natal-cap-34-wrap-precision.js
    research/natal-cap-37-at41-march.js:635
        OUTPUT block carries no embed fingerprint
        legacy. bind it with: node research/qc/embed.js research/natal-cap-37-at41-march.js

════════════════════════════════════════════════════════════════════════════
SUMMARY
  embed-backlog   218 finding(s)   230 ms
  TOTAL          218
════════════════════════════════════════════════════════════════════════════

Findings are candidates, not verdicts. Open the target before editing:
a paraphrase inside quote marks is a style defect, a changed claim is a
correctness defect, and the two get different fixes.

WHAT A ZERO CERTIFIES (verify-the-verifier, 2026-08-20): this is a fast
SYNTACTIC gate — pointers resolve, quotations reproduce contiguously, bound
blocks hash to their own record, markers agree. It is silent by construction
where meaning or arithmetic is at stake: a consistent wrong constant across
documents, a stale count in prose, a single-sited overstatement, and a
falsified dated absence remain a HUMAN and audit-numbers concern.

This is the fast gate only. The full gate is three commands:
  node research/qc.js                     the 14 checks above (0.4 s)
  node research/qc/selftest.js        do these checks still fire on defects we know are defects? (instant)
  node research/audit-numbers.js      every load-bearing number recomputed, retired values included (~400 s)
Run all three, or `node research/qc.js --full`, before believing the corpus is clean.
```

## 2. One row per script

Price is the MEASURED wall clock of the run, on this machine, node v22.21.0,
with two heavy sibling jobs also running. Every row priced under ten minutes
was run through `node research/qc/embed.js <script> --timeout 900` and then
`--check`. Rows priced over ten minutes were not run.

`--check` legend: OK means all of `code-sha256`, `body` against `out-sha256`,
and the re-run `out-sha256` matched.

| script | price (measured) | ran / skipped / failed | --check |
|---|---|---|---|
| `research/Lgrowth.js` | 12.4 s | ran | OK |
| `research/a3-05-bound-L.js` | 70.3 s | ran | OK |
| `research/attack-beta2-02-theta-total.js` | 6.4 s | ran | OK |
| `research/attack-beta2-03-exact-strata.js` | 22.2 s | ran | OK |
| `research/block-L-first-dead.js` | 16.1 s | ran | OK |
| `research/fdecay-deep-00-core.js` | 0.05 s, 0 lines | skipped, module | n/a |
| `research/gate-multiplies-01.js` | 0.4 s | ran | OK |
| `research/gate-multiplies-02.js` | 22.6 s | ran | OK |
| `research/gate-multiplies-03.js` | 4.4 s | ran | OK |
| `research/h2-lower-ladder.js` | 101.4 s | ran | code-sha256 and body OK; **out-sha256 DIFFERS**, timing columns only |
| `research/h2-prototype.js` | ~4 h estimated | skipped, over ten minutes | n/a |
| `research/h2-randomised.js` | 232.9 s | ran | OK |
| `research/history/staging/comb-discrepancy-tight.js` | 34.4 s | ran | OK |
| `research/history/staging/lit-kourbatov-shortfall.js` | 0.1 s | ran | OK, 1 input hashed |
| `research/history/staging/record-location-null.js` | 15.5 s | ran | OK, 1 input hashed |
| `research/history/staging/redteam-0828-engine.js` | 1.6 s | ran | OK |
| `research/history/staging/redteam-0828-litimports.js` | 14.6 s | ran | OK, 1 input hashed |
| `research/history/staging/thm-buchstab-transfer-shallow.js` | 0.7 s | ran | OK |
| `research/history/staging/thm-sharp-sieve-range.js` | 0.1 s | ran | OK |
| `research/lit-provenance.js` | 0.1 s | ran | OK, 1 input hashed |
| `research/localized-01-ladder.js` | 3.7 s | ran | OK |
| `research/localized-02-fixed-window.js` | 43.3 s | ran | OK |
| `research/localized-03-merge-lemma.js` | 17.4 s | ran | OK |
| `research/localized-04-maxsum.js` | 59.8 s | ran | OK |
| `research/localized-single-alignment.js` | 20.3 s | ran | OK (progress on stderr, not hashed) |
| `research/lucky-control.js` | 76.4 s | ran | OK |
| `research/scanstat-t37-01-engine.js` | 0.05 s, 0 lines | skipped, module | n/a |
| `research/scanstat-t37-03-shard.js` | box-class, see below | **failed**, no arguments | n/a |
| `research/scope-fractional-retention.js` | 0.1 s | ran | OK |
| `research/sift-limit-lemmaV.js` | 184.9 s | ran | OK |
| `research/square-window.js` | 46.7 s | ran | OK |
| `research/theta-ladder-row.js` | > 300 s at its documented argument | skipped, over ten minutes | n/a |
| `research/window-check.js` | 5.3 s | ran | OK |
| `research/window-exceptions.js` | 0.6 s | ran | OK |

Twenty-nine ran and bound, three skipped as too slow, two skipped as modules,
one failed.

### Forces disclosed

**Zero `--force` was used in this pass, and the count of figures not
reproduced is therefore zero across all 29.** The trap the brief pre-registered
could not fire on this half of the backlog by construction: a script in
`no-output-block` has no bound OUTPUT block and, in 26 of the 29 cases, no
READINGS section either, so `embed.js` had nothing to guard. Every embed here
wrote into an empty scaffold, and no embed exited 3.

One force in the corpus is visible today and is NOT this pass's:
`research/attack-hybrid-bound.js` carries
`forced: 2026-08-29, 0 of 317 figures in the replaced block not reproduced`
in its fingerprint, written before this pass began. It was read, not written,
here. Its zero count is what §4 re-verifies from the other side.

### The failures, verbatim

`research/scanstat-t37-03-shard.js`, bare invocation:

```
Error: usage: <shard> <nShards> <level> <outdir>
    at Object.<anonymous> (research/scanstat-t37-03-shard.js:19:77)
```

It is one shard of the T_37 stream. `research/history/staging/scanstat-t37-prereg.md`
§S5 prices the whole sharded pass at "at most 12 h at `nice -n 15`, on a
10-core machine", so any single shard is a box-class run and is over ten
minutes by that record. Not run, and no invocation was invented for it.

`research/theta-ladder-row.js` fails a different way, and it is the
invocation problem the `embed.js` header names. With no argument it runs in
56 ms and prints a row of nulls (`"z":null`, `theta: NaN`), because
`z = Number(process.argv[2])` is NaN. Binding that would have put a
meaningless block under custody. At the argument its own header documents
(`node research/theta-ladder-row.js 47`) it exceeded a 300 s probe with
nothing printed, since it prints only on completion. It drives
`sift-limit-lemmaV.row(47, 3.2, 3.0)`, whose s = 3.0 gives D = 47^3 against
the s = 2.6 ladder's D = 47^2.6, and the cost is O(N^2) in the divisor-pair
count by its own header, so the price is plausibly tens of minutes. Skipped,
priced as over ten minutes, arithmetic extrapolation only.

`research/h2-prototype.js` was priced from its own printed progress rather
than guessed: at the default `nmax = 12` it reached n = 10 in 21.44 s with
69.6e6 total nodes, having taken 0.83 s and 2.9e6 nodes at n = 9, a factor of
about 26 per step. n = 11 therefore prices at roughly 560 s and n = 12 at
roughly 4 h. Over ten minutes; not run.

`research/fdecay-deep-00-core.js` and `research/scanstat-t37-01-engine.js`
run clean and print nothing. Both say so in their own headers ("Shared engine
for ...", "THE T_37 MOVING-SUM ENGINE (module, no output)"). No banner was
added to either: a bound empty block would reduce the counter while
certifying nothing, and the honest reading is that `no-output-block` counts a
class it cannot distinguish, a module with no standalone output.

### The three files that already carried an unrecognised pasted block

`research/a3-05-bound-L.js`, `research/block-L-first-dead.js` and
`research/attack-beta2-03-exact-strata.js` each carried a legacy paste headed
`PASTED OUTPUT`, which `OUT_HEAD` in `tailfmt.js` does not match (it requires
the line to be `OUTPUT` followed by end-of-line, a dash, an em-dash or an open
paren). The scaffold and the fresh block were therefore appended BELOW those
pastes, which are now inside the region `code-sha256` covers. Consequence to
record: the two files whose legacy paste included its own READINGS section now
have those readings sitting ABOVE the bound block, where
`readings-not-traceable` will not see them. That is a blind spot created by
this pass, and §3 is the manual substitute for it.

## 3. What the fresh outputs contradict

Every legacy paste that could be compared was compared, after normalising
whitespace and the `[Ns]` timing markers and dropping the progress lines the
old paste elided.

| script | legacy output lines | fresh output lines | differing lines |
|---|---|---|---|
| `research/a3-05-bound-L.js` | 270 | 270 | **0** |
| `research/block-L-first-dead.js` | 136 | 136 | **0** |
| `research/attack-beta2-03-exact-strata.js` | 368 | 368 | **0** |

MEASURED: all three legacy pastes reproduce their fresh run exactly. Nothing
in any OUTPUT body is contradicted. That includes `a3-05-bound-L.js`, whose
own preamble records a 2026-08-18 correction of nine printed lines; the
corrected values are the ones the fresh run prints.

The READINGS are a different matter, and two of the three carry them.

### `research/attack-beta2-03-exact-strata.js`

Five figures in its legacy readings are absent from the fresh block. Four
reconcile; one does not.

| reading | figure | verdict against the fresh block |
|---|---|---|
| 6 (para. before) | `0.103` | prose arithmetic: `u*(8) - u*(9) = 1.7994 - 1.6961 = 0.1033`, both printed |
| 6 (same) | `0.078` | prose arithmetic: `u*(0) - u*(5) = 2.0260 - 1.9484 = 0.0776`, both printed |
| 7 | `3.85` | hand-rounding of the printed `3.8459` (p_k = 19) and `3.8452` (p_k = 23), "u* envelope-priced" column |
| 8 | `1.07` | **CONTRADICTED AS STATED.** The reading says F_meas at u = 3 "is flat at 1.04 to 1.07 across y = 7..23". The block's `u = 3.00` table prints 1.102 at y = 7. 1.07 is a rounding of the printed 1.067, but that is the y = 11 row: the interval quoted is the y = 11..23 interval carrying a y = 7..23 label |
| 8 | `11,13,17,19,23` | the known list-token false positive; it is a y-label list, not a figure |

The contradiction is small in magnitude (1.07 stated against 1.102 printed, an
understatement of 3%) and does not overturn reading 8's conclusion, which is
about F_meas RISING with y at u = 2.0 and u = 1.2 and is unaffected. What is
wrong is the stated span of the flat interval. NOT EDITED.

### `research/block-L-first-dead.js`

Seven figures absent from the fresh block, none contradicted.

| reading | figure | verdict against the fresh block |
|---|---|---|
| 6 | `1.79` | prose arithmetic: 111 / 62 = 1.7903 |
| 6 | `1.78` | prose arithmetic: 1122 / 630 = 1.7810, both printed in reading 7 |
| 7a-discussion | `2.02` | prose arithmetic: 83 / 41 = 2.0244 |
| 7a-discussion | `2.76` | prose arithmetic: 113 / 41 = 2.7561 |
| 8 | `5854` | a figure quoted from `attack-beta2-05-covering-prune.js`, not from this block, and named as such in the sentence |
| 8 | `40000` | the sweep limit of that same other script, named as such |
| 8 | `5,7,11` | list-token false positive (a prime set, not a figure) |

### `research/a3-05-bound-L.js`

Its "READING n." headings are printed BY the script and are part of the
output, not a separate READINGS section, so the 0-line diff above already
covers them. No figure to reconcile.

### Everything else in this pass

The other 26 scripts had no READINGS section at all before this pass and have
an empty one after it, so there is nothing for a fresh output to contradict.

## 4. `research/attack-hybrid-bound.js`: the nine figures, reconciled

`node research/qc/embed.js --check research/attack-hybrid-bound.js` reads:

```
research/attack-hybrid-bound.js
  code-sha256  matches
  body         matches out-sha256 — the pasted block is bit-honest
  out-sha256   matches
  (advisory: 9 READINGS figure(s) not in the block: 0.29, 2.01, 1.19, 0.95, 2.41e-2, 3.51e-3)
```

The advisory names six and counts nine. The remaining three, recovered by
running `tailfmt.figures` over the readings text against the block, are
`1.27`, `2.24e4` and `2.24e6`. Each of the nine was read against the OUTPUT
block bound today (`elapsed: 53.4 s`, `forced: 2026-08-29, 0 of 317`). The file
was NOT edited.

| # | figure | reading | verdict | the block's own value |
|---|---|---|---|---|
| 1 | `0.29` | 2 | hand-rounding of a figure IN the block | `0.287`, table (B) "gain" column, x = 31 row. It is the minimum of that column over the quoted span x = 13..1e6 |
| 2 | `2.01` | 2 | hand-rounding of a figure IN the block | `2.007`, table (B) "gain" column, x = 50021 row. The maximum of that column over the same span |
| 3 | `1.19` | 4 | hand-rounding of a figure IN the block | `1.186`, table (D1) "net" column, x = 1000003, p = 11 |
| 4 | `0.95` | 4 | hand-rounding of a figure IN the block | `0.946`, table (D1) "net" column, x = 1000003, p = 23 |
| 5 | `2.41e-2` | 5 | notation variant of a figure IN the block | `2.410e-2`, table (C) "2/(next prime)" column, x0 = 79 |
| 6 | `3.51e-3` | 5 | hand-rounding of a figure IN the block | `3.509e-3`, table (C) "1/(m0+1)" column, x0 = 79 |
| 7 | `1.27` | 8 | arithmetic over two figures IN the block | `1.880e+11 / 1.479e+11 = 1.2711`, both from the x = 439 row of table (E) |
| 8 | `2.24e4` | 8 | hand-rounding of a figure IN the block | `2.236e+4`, table (E) "law 0.762 x ln^2x lnlnx" column, x = 439 |
| 9 | `2.24e6` | 8 | hand-rounding of a figure IN the block | `2.239e+6`, table (E) "hybrid certificate" column, x = 79 |

**Zero of the nine is a figure from a superseded run, and zero is contradicted
by the block.** All nine are hand-roundings, one notation variant, and one
division over two printed values. The file's own `FIGURE PROVENANCE` note,
added 2026-08-20, already asserts exactly this mapping figure by figure; this
pass re-verified every line of it against the 2026-08-29 re-embed rather than
taking it on trust, and it stands unchanged. The remaining check that could
falsify the pairings is a claim about which ROW each rounding came from, and
that was checked by opening each named table.

One caveat that limits what §4 establishes: the `readings-not-traceable`
advisory is a figure-presence test, so it says nothing about the six readings
in this file whose figures ARE all present. Reading 4's "every other head
prime pays between -0.07 and -0.28" was false as an "every" and was caught by
hand on 2026-08-20 (mismatch adjudication #12, recorded at the foot of the
file), not by this advisory, and nothing here re-tests that class.

## 5. What remains, and its price

`no-output-block`, 5 remaining:

| script | why it remains | price |
|---|---|---|
| `research/h2-prototype.js` | over ten minutes at its default invocation | ~4 h at `nmax = 12`, extrapolated from a factor ~26 per step; a bound tail at `nmax = 10` would cost 22 s but would record an invocation nobody uses |
| `research/theta-ladder-row.js` | over ten minutes at its documented argument, degenerate without one | > 300 s measured at `47`, plausibly tens of minutes; the bare invocation prints nulls in 56 ms and must not be bound |
| `research/scanstat-t37-03-shard.js` | throws without four arguments | box-class: the prereg budgets 12 h for the whole sharded pass on ten cores |
| `research/fdecay-deep-00-core.js` | module, prints nothing | 0.05 s; needs a decision on whether the counter should exempt modules, not a run |
| `research/scanstat-t37-01-engine.js` | module, prints nothing | 0.05 s; same decision |

`readings-not-traceable`, 181 remaining and untouched by this pass. It is
advisory and its false-positive floor is real, as §3 and §4 both demonstrate:
of the 21 absent figures examined by hand here across four files, 20 were
roundings, notation variants, prose arithmetic, list tokens, or figures
correctly attributed to another script, and 1 was a genuine mis-stated span.
That is a 5% hit rate on the figures, which prices the remainder: the 181
findings cover many hundreds of figures, and working them is a per-file read
of the kind §4 records, roughly 20 to 40 minutes per file for the large ones.
The ranking is a reading order, not a defect list, and the top of it
(`fold-profile-08` at 56%, `fold-profile-13-hotspot-sweep` at 53%,
`fold-profile-11-lineage-yield` at 51%, `a3-08-adjacent-pairs` at 51%) is
where a next pass should start.

`hand-pasted-tail`, 3 remaining: `natal-cap-33-overnight.js`,
`natal-cap-34-wrap-precision.js`, `natal-cap-37-at41-march.js`. The qc README
already records that the last two carry provenance notes rather than output,
because their real logs live outside this repository. Those are not
re-runnable here at any price, and the third is an overnight run. None was
touched.

Two further items this pass produced rather than closed:

1. `scrubSecsColumns` in `research/qc/tailfmt.js` scrubs a timing column only
   when `secs` is the last header token. `research/h2-lower-ladder.js` prints
   `secs  cum-secs` and is therefore permanently unreproducible at the
   `out-sha256` level. A one-line widening of the scope rule would fix it;
   that is an edit to the framework and was not made here. Cost: minutes.
2. The two files whose legacy `PASTED OUTPUT` block carried its own READINGS
   now have those readings above the bound block, invisible to
   `readings-not-traceable`. §3 is the manual substitute. A structural fix
   would be to teach `OUT_HEAD` the `PASTED OUTPUT` spelling, which would
   re-open the guard on those blocks; not attempted, because widening
   `OUT_HEAD` is exactly the change the tailfmt header warns against.
