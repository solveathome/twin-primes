**Question.** At finite dyadic x = 2^j, how large is the corner correlation
K(x) = sum_{x/2 < n <= x} mu(n) mu(n-2) L(n) L'(n-2) relative to (a) C_2 x,
(b) its absolute mass sum |mu(n) mu(n-2)| L(n) L'(n-2), and (c) the same sum with
mu(n) mu(n-2) replaced by independent random signs, and how does K(x)/mass behave
as j grows?

**Calibration = MEASURED.** This can only support or undercut a heuristic; it
cannot prove a rate and it does not move the proof.

Files: `research/corner-measurement.js` (output bound by
`node research/qc/embed.js`, code-sha256 `e18ddee9436f1ef3...`, out-sha256
`14f55dae22052d02...`, 1393.4 s), `research/corner-measurement.md`,
`research/corner-measurement.json`. No existing file was edited. Fast QC gate:
2 findings on my note, both the coordinator's (crosslink, TODO ledger line);
`search-convention` clean after the fix requested mid-task.

---

## FALSIFIER VERDICT (pre-registered in the script header before the first run)

**The runs give no evidence of arithmetic cancellation in the corner
correlation at these scales.**

|K|/mass does fall with x in all four live variants, so the falsifier's "slope
>= 0" branch did not fire. But the pre-registered second clause did: the decay
is not faster than the matched random-sign control in any variant. Slopes of
log(|K|/mass) against log x, with the exact null slope log(sqrt(sum w^2)/mass)
on the same points, and OLS standard errors from the residuals (this last
calculation is scratchpad-grade, derived from the bound JSON, not itself under
output custody):

| variant | n points (j) | slope log(\|K\|/mass) | exact-null slope | difference | in s.e. |
|---|---|---|---|---|---|
| `A-eta100` (actual, eta0=1/100) | 12 (j=23..36) | -0.6658 +- 0.1104 | -0.5003 +- 0.0435 | -0.1655 +- 0.1187 | -1.39 |
| `B-eta40` (actual, eta0=1/40) | 17 (j=20..36) | -0.5412 +- 0.0620 | -0.5173 +- 0.0073 | -0.0239 +- 0.0624 | -0.38 |
| `C-dyadic` (actual, (V,2V],(Z,2Z]) | 17 (j=20..36) | -0.4872 +- 0.0947 | -0.4546 +- 0.0054 | -0.0326 +- 0.0948 | -0.34 |
| `D-scaled` (MODEL, v=1/8) | 16 (j=20..36) | -0.4962 +- 0.0819 | -0.5347 +- 0.0245 | +0.0385 +- 0.0855 | +0.45 |

Two variants fall marginally faster than their null, two marginally slower; the
largest deviation is 1.4 s.e., in the variant with the fewest points. Without
any fit, the same statement: the median of |K|/sqrt(sum w^2) over the j with
data is 0.9433 (n=12), 0.6353 (n=17), 0.5611 (n=17) and 0.4985 (n=16). K sits at
the size of a random-sign sum on its own support, no smaller.

**A prior and larger caveat, which limits everything above.** At every x this
machine can reach, the actual right cutoff Z = floor(x^(1/20)) admits AT MOST
ONE prime in its band, and none at j=20, 21, 22, 32, 33. The actual-parameter
rows are therefore not a measurement of the asymptotic corner: they are a sum
whose right prime is the single fixed prime 3 (j=23..31) or 5 (j=34..36), so
L'(n-2) is a fixed multiple of one residue-class indicator. `D-scaled` raises
the right exponent to 1/8 only to populate the band; it is a model of the
corner's shape, not the corner. Populating the actual band needs roughly 4
primes at x=2^70 and 17 at x=2^100 (PNT estimate), neither reachable by a sieve
over (x/2, x]. The degeneracy is structural, not a compute budget problem.

**Sign, and the one-sided consumer.** K changes sign erratically in every
variant (sign strings `-+-+-+--+-++`, `-+--++-+---++-+++`, `----+--+--++--+-+`,
`+-+-++--++-+----`; longest run 4). **K is never below -C_2 x**: the largest
|K/(C_2 x)| over all 62 non-empty rows is 3.287e-4 (`C-dyadic`, j=20). Finite
scales cannot settle the asymptotic; corner-correlation §2.2 derives that the
one-sided statement, given the complement, IS the theorem.

**What the measurement could not have detected.** corner-correlation §2.2
prices the absolute target on this sub-family at log^(2+eps) x. Over the factor
of at most 1.8 in log x available here, a log-power saving of that size is
invisible, so a negative result was the expected outcome even if the target
holds.

---

## TABLE

`count n` is the number of n in (x/2, x] with mu(n)mu(n-2) != 0 and both weights
nonzero; `mass` is sum |mu(n)mu(n-2)| L(n) L'(n-2) on that support; `randMean`
and `randSd` are over 16 seeded draws (seed 0x5eed1234) of independent signs on
the same support; `sec` is the wall clock for that j across all five variants,
not per variant. Total run 1393 s for j=20..36.

**`A-eta100`** - actual cutoffs, eta0=1/100  (w=6/25, v=1/20, eta0=1/100)

| j | x | V | Z | r band | rp band | count n | mass | K | |K|/mass | K/(C2 x) | randMean | randSd | sec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 20 | 2^20 | 27 | 2 | (27,36] 2p | (2,2] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.0 |
| 21 | 2^21 | 32 | 2 | (32,44] 3p | (2,2] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.1 |
| 22 | 2^22 | 38 | 2 | (38,52] 3p | (2,2] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.1 |
| 23 | 2^23 | 45 | 2 | (45,63] 4p | (2,3] 1p [3] | 940 | 4232.03 | -131.827 | 0.03115 | -2.380e-5 | 42.81 | 169.3 | 0.1 |
| 24 | 2^24 | 54 | 2 | (54,75] 5p | (2,3] 1p [3] | 6516 | 30697.8 | 984.409 | 0.03207 | 8.888e-5 | -72.28 | 434.3 | 0.2 |
| 25 | 2^25 | 64 | 2 | (64,90] 6p | (2,3] 1p [3] | 21312 | 103513 | -1211.03 | 0.0117 | -5.467e-5 | 150.4 | 744.5 | 0.3 |
| 26 | 2^26 | 75 | 2 | (75,108] 7p | (2,3] 1p [3] | 46435 | 233445 | 1144.18 | 0.004901 | 2.583e-5 | 88.41 | 979.3 | 0.6 |
| 27 | 2^27 | 89 | 2 | (89,129] 7p | (2,3] 1p [3] | 121367 | 633710 | -381.711 | 6.023e-4 | -4.308e-6 | 31.02 | 1042 | 1.2 |
| 28 | 2^28 | 105 | 2 | (105,155] 9p | (2,3] 1p [3] | 263917 | 1.417e+6 | 1507.63 | 0.001064 | 8.508e-6 | -68.45 | 2880 | 2.4 |
| 29 | 2^29 | 124 | 2 | (124,186] 12p | (2,4] 1p [3] | 651832 | 3.644e+6 | -4808.72 | 0.00132 | -1.357e-5 | -270.9 | 4555 | 5.1 |
| 30 | 2^30 | 147 | 2 | (147,222] 13p | (2,4] 1p [3] | 1465733 | 8.464e+6 | -6207.37 | 7.334e-4 | -8.757e-6 | 95.03 | 7713 | 10.5 |
| 31 | 2^31 | 173 | 2 | (173,266] 16p | (2,4] 1p [3] | 2689218 | 1.605e+7 | 4312.85 | 2.688e-4 | 3.042e-6 | 4477 | 9421 | 21.5 |
| 32 | 2^32 | 205 | 3 | (205,319] 20p | (3,4] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 38.8 |
| 33 | 2^33 | 242 | 3 | (242,382] 22p | (3,4] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 77.1 |
| 34 | 2^34 | 286 | 3 | (286,458] 27p | (3,5] 1p [5] | 2536891 | 2.490e+7 | -16592.7 | 6.665e-4 | -1.463e-6 | 2766 | 14620 | 160.4 |
| 35 | 2^35 | 337 | 3 | (337,548] 33p | (3,5] 1p [5] | 11247485 | 1.132e+8 | 1534.82 | 1.356e-5 | 6.766e-8 | -6108 | 39720 | 346.1 |
| 36 | 2^36 | 398 | 3 | (398,657] 41p | (3,5] 1p [5] | 32345791 | 3.338e+8 | 54562.1 | 1.635e-4 | 1.203e-6 | 7925 | 44680 | 703.6 |

**`B-eta40`** - actual cutoffs, eta0=1/40  (w=6/25, v=1/20, eta0=1/40)

| j | x | V | Z | r band | rp band | count n | mass | K | |K|/mass | K/(C2 x) | randMean | randSd | sec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 20 | 2^20 | 27 | 2 | (27,55] 7p | (2,3] 1p [3] | 3444 | 14489.7 | -38.4913 | 0.002656 | -5.560e-5 | 120.6 | 215.9 | 0.0 |
| 21 | 2^21 | 32 | 2 | (32,68] 8p | (2,4] 1p [3] | 6685 | 29343.6 | 200.507 | 0.006833 | 1.448e-4 | 216.4 | 371.7 | 0.1 |
| 22 | 2^22 | 38 | 2 | (38,83] 11p | (2,4] 1p [3] | 16836 | 77360.4 | -363.154 | 0.004694 | -1.312e-4 | 87.66 | 616.6 | 0.1 |
| 23 | 2^23 | 45 | 2 | (45,101] 12p | (2,4] 1p [3] | 35273 | 169156 | -989.974 | 0.005852 | -1.788e-4 | -127.6 | 923.4 | 0.1 |
| 24 | 2^24 | 54 | 2 | (54,124] 14p | (2,5] 2p [3,5] | 82468 | 445190 | 2033.22 | 0.004567 | 1.836e-4 | 444.4 | 1190 | 0.2 |
| 25 | 2^25 | 64 | 2 | (64,152] 18p | (2,5] 2p [3,5] | 190524 | 1.129e+6 | 1779.26 | 0.001576 | 8.032e-5 | 407.4 | 3076 | 0.3 |
| 26 | 2^26 | 75 | 2 | (75,186] 21p | (2,6] 2p [3,5] | 398385 | 2.562e+6 | -4222.08 | 0.001648 | -9.530e-5 | -1878 | 5619 | 0.6 |
| 27 | 2^27 | 89 | 2 | (89,227] 25p | (2,6] 2p [3,5] | 843497 | 5.823e+6 | 1561.13 | 2.681e-4 | 1.762e-5 | -2858 | 5796 | 1.2 |
| 28 | 2^28 | 105 | 2 | (105,278] 32p | (2,6] 2p [3,5] | 1838874 | 1.346e+7 | -14313.4 | 0.001063 | -8.077e-5 | 161 | 10240 | 2.4 |
| 29 | 2^29 | 124 | 2 | (124,340] 38p | (2,7] 3p [3,5,7] | 4160431 | 3.363e+7 | -7985.81 | 2.375e-4 | -2.253e-5 | 1031 | 20430 | 5.1 |
| 30 | 2^30 | 147 | 2 | (147,415] 46p | (2,7] 3p [3,5,7] | 8986679 | 7.874e+7 | -26985.7 | 3.427e-4 | -3.807e-5 | 4213 | 26540 | 10.5 |
| 31 | 2^31 | 173 | 2 | (173,508] 56p | (2,8] 3p [3,5,7] | 18258218 | 1.717e+8 | 152199 | 8.865e-4 | 1.074e-4 | 9728 | 41040 | 21.5 |
| 32 | 2^32 | 205 | 3 | (205,621] 68p | (3,9] 2p [5,7] | 19078947 | 2.141e+8 | 36214.2 | 1.691e-4 | 1.277e-5 | -12430 | 51490 | 38.8 |
| 33 | 2^33 | 242 | 3 | (242,760] 81p | (3,9] 2p [5,7] | 41611557 | 4.857e+8 | -10517.6 | 2.166e-5 | -1.855e-6 | -7146 | 92690 | 77.1 |
| 34 | 2^34 | 286 | 3 | (286,929] 97p | (3,10] 2p [5,7] | 87433110 | 1.062e+9 | 105363 | 9.922e-5 | 9.290e-6 | -4529 | 108500 | 160.4 |
| 35 | 2^35 | 337 | 3 | (337,1136] 121p | (3,11] 3p [5,7,11] | 192536207 | 2.459e+9 | 25215.3 | 1.026e-5 | 1.112e-6 | 69330 | 129400 | 346.1 |
| 36 | 2^36 | 398 | 3 | (398,1389] 143p | (3,12] 3p [5,7,11] | 413855192 | 5.617e+9 | 125446 | 2.233e-5 | 2.765e-6 | 13000 | 331800 | 703.6 |

**`C-dyadic`** - actual cutoffs, one dyadic band (V,2V] and (Z,2Z]  (w=6/25, v=1/20, dyadic bands (V,2V], (Z,2Z])

| j | x | V | Z | r band | rp band | count n | mass | K | |K|/mass | K/(C2 x) | randMean | randSd | sec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 20 | 2^20 | 27 | 2 | (27,54] 7p | (2,4] 1p [3] | 7927 | 34093.8 | -227.525 | 0.006673 | -3.287e-4 | -40.56 | 530.1 | 0.0 |
| 21 | 2^21 | 32 | 2 | (32,64] 7p | (2,4] 1p [3] | 13191 | 59181 | -151.33 | 0.002557 | -1.093e-4 | -130.3 | 497.3 | 0.1 |
| 22 | 2^22 | 38 | 2 | (38,76] 9p | (2,4] 1p [3] | 28974 | 136173 | -645.094 | 0.004737 | -2.330e-4 | -210.5 | 446.9 | 0.1 |
| 23 | 2^23 | 45 | 2 | (45,90] 10p | (2,4] 1p [3] | 54197 | 265286 | -234.981 | 8.858e-4 | -4.243e-5 | -16.75 | 1197 | 0.1 |
| 24 | 2^24 | 54 | 2 | (54,108] 12p | (2,4] 1p [3] | 107886 | 552125 | 195.186 | 3.535e-4 | 1.762e-5 | -425.3 | 1642 | 0.2 |
| 25 | 2^25 | 64 | 2 | (64,128] 13p | (2,4] 1p [3] | 206083 | 1.084e+6 | -827.848 | 7.638e-4 | -3.737e-5 | -1285 | 2810 | 0.3 |
| 26 | 2^26 | 75 | 2 | (75,150] 14p | (2,4] 1p [3] | 375221 | 2.039e+6 | -3495.86 | 0.001714 | -7.891e-5 | -594 | 3709 | 0.6 |
| 27 | 2^27 | 89 | 2 | (89,178] 16p | (2,4] 1p [3] | 723727 | 4.072e+6 | 2084.38 | 5.119e-4 | 2.352e-5 | -611.5 | 5977 | 1.2 |
| 28 | 2^28 | 105 | 2 | (105,210] 19p | (2,4] 1p [3] | 1466767 | 8.531e+6 | -8455.95 | 9.912e-4 | -4.772e-5 | -1752 | 8781 | 2.4 |
| 29 | 2^29 | 124 | 2 | (124,248] 23p | (2,4] 1p [3] | 3005536 | 1.810e+7 | -12272.6 | 6.781e-4 | -3.463e-5 | 2310 | 9765 | 5.1 |
| 30 | 2^30 | 147 | 2 | (147,294] 28p | (2,4] 1p [3] | 6152123 | 3.835e+7 | 7214.64 | 1.881e-4 | 1.018e-5 | 2111 | 15550 | 10.5 |
| 31 | 2^31 | 173 | 2 | (173,346] 28p | (2,4] 1p [3] | 10666613 | 6.785e+7 | 31352.5 | 4.621e-4 | 2.212e-5 | -276.5 | 17310 | 21.5 |
| 32 | 2^32 | 205 | 3 | (205,410] 34p | (3,6] 1p [5] | 13034273 | 1.257e+8 | -23422.7 | 1.863e-4 | -8.261e-6 | 6381 | 40160 | 38.8 |
| 33 | 2^33 | 242 | 3 | (242,484] 39p | (3,6] 1p [5] | 25274940 | 2.507e+8 | -20675.1 | 8.246e-5 | -3.646e-6 | -11520 | 53980 | 77.1 |
| 34 | 2^34 | 286 | 3 | (286,572] 44p | (3,6] 1p [5] | 48335946 | 4.923e+8 | 360.354 | 7.320e-7 | 3.177e-8 | -18590 | 82260 | 160.4 |
| 35 | 2^35 | 337 | 3 | (337,674] 54p | (3,6] 1p [5] | 101044616 | 1.059e+9 | -83068.1 | 7.847e-5 | -3.662e-6 | -27680 | 108200 | 346.1 |
| 36 | 2^36 | 398 | 3 | (398,796] 60p | (3,6] 1p [5] | 193085514 | 2.069e+9 | 85558 | 4.136e-5 | 1.886e-6 | -21440 | 162000 | 703.6 |

**`D-scaled`** - MODEL not the corner: v=1/8, eta0=1/100  (w=6/25, v=1/8, eta0=1/100)

| j | x | V | Z | r band | rp band | count n | mass | K | |K|/mass | K/(C2 x) | randMean | randSd | sec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 20 | 2^20 | 27 | 5 | (27,36] 2p | (5,7] 1p [7] | 172 | 1171.08 | 6.16313 | 0.005263 | 8.903e-6 | 17.18 | 99.23 | 0.0 |
| 21 | 2^21 | 32 | 6 | (32,44] 3p | (6,8] 1p [7] | 523 | 3779.71 | -43.2011 | 0.01143 | -3.120e-5 | -10.26 | 146 | 0.1 |
| 22 | 2^22 | 38 | 6 | (38,52] 3p | (6,9] 1p [7] | 1988 | 14789.8 | 243.658 | 0.01647 | 8.800e-5 | 97.2 | 403.1 | 0.1 |
| 23 | 2^23 | 45 | 7 | (45,63] 4p | (7,10] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.1 |
| 24 | 2^24 | 54 | 8 | (54,75] 5p | (8,11] 1p [11] | 474 | 4883.27 | -530.135 | 0.1086 | -4.786e-5 | -92.15 | 210.3 | 0.2 |
| 25 | 2^25 | 64 | 8 | (64,90] 6p | (8,12] 1p [11] | 6287 | 66559.4 | 751.991 | 0.0113 | 3.395e-5 | -145.4 | 957.8 | 0.3 |
| 26 | 2^26 | 75 | 9 | (75,108] 7p | (9,13] 2p [11,13] | 20558 | 233810 | 687.416 | 0.00294 | 1.552e-5 | 86.26 | 1415 | 0.6 |
| 27 | 2^27 | 89 | 10 | (89,129] 7p | (10,15] 2p [11,13] | 61721 | 745391 | -6409.57 | 0.008599 | -7.234e-5 | 139.8 | 2682 | 1.2 |
| 28 | 2^28 | 105 | 11 | (105,155] 9p | (11,16] 1p [13] | 64962 | 815288 | -1277.24 | 0.001567 | -7.207e-6 | -145.5 | 4318 | 2.4 |
| 29 | 2^29 | 124 | 12 | (124,186] 12p | (12,18] 2p [13,17] | 217944 | 2.973e+6 | 1076.61 | 3.622e-4 | 3.038e-6 | -3184 | 5765 | 5.1 |
| 30 | 2^30 | 147 | 13 | (147,222] 13p | (13,20] 2p [17,19] | 282199 | 4.366e+6 | 4192.96 | 9.604e-4 | 5.915e-6 | 69.03 | 7451 | 10.5 |
| 31 | 2^31 | 173 | 14 | (173,266] 16p | (14,22] 2p [17,19] | 775093 | 1.248e+7 | -6186.65 | 4.959e-4 | -4.364e-6 | 716.8 | 15690 | 21.5 |
| 32 | 2^32 | 205 | 16 | (205,319] 20p | (16,24] 3p [17,19,23] | 2114902 | 3.612e+7 | 40807.4 | 0.00113 | 1.439e-5 | -7793 | 24640 | 38.8 |
| 33 | 2^33 | 242 | 17 | (242,382] 22p | (17,27] 2p [19,23] | 2869531 | 5.118e+7 | -25406.8 | 4.964e-4 | -4.480e-6 | 258 | 30630 | 77.1 |
| 34 | 2^34 | 286 | 19 | (286,458] 27p | (19,30] 2p [23,29] | 3314212 | 6.382e+7 | -36260.2 | 5.682e-4 | -3.197e-6 | -15760 | 28770 | 160.4 |
| 35 | 2^35 | 337 | 20 | (337,548] 33p | (20,33] 3p [23,29,31] | 12110961 | 2.490e+8 | -18257.8 | 7.332e-5 | -8.049e-7 | -20830 | 74480 | 346.1 |
| 36 | 2^36 | 398 | 22 | (398,657] 41p | (22,37] 4p [23,29,31,37] | 31130966 | 6.676e+8 | -38174.3 | 5.718e-5 | -8.415e-7 | 51850 | 111700 | 703.6 |

**`E-empty`** - control (iv): r band forcibly emptied  (w=6/25, v=1/20, eta0=1/100)

| j | x | V | Z | r band | rp band | count n | mass | K | |K|/mass | K/(C2 x) | randMean | randSd | sec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 20 | 2^20 | 27 | 2 | empty | (2,2] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.0 |
| 21 | 2^21 | 32 | 2 | empty | (2,2] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.1 |
| 22 | 2^22 | 38 | 2 | empty | (2,2] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.1 |
| 23 | 2^23 | 45 | 2 | empty | (2,3] 1p [3] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.1 |
| 24 | 2^24 | 54 | 2 | empty | (2,3] 1p [3] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.2 |
| 25 | 2^25 | 64 | 2 | empty | (2,3] 1p [3] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.3 |
| 26 | 2^26 | 75 | 2 | empty | (2,3] 1p [3] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 0.6 |
| 27 | 2^27 | 89 | 2 | empty | (2,3] 1p [3] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 1.2 |
| 28 | 2^28 | 105 | 2 | empty | (2,3] 1p [3] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 2.4 |
| 29 | 2^29 | 124 | 2 | empty | (2,4] 1p [3] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 5.1 |
| 30 | 2^30 | 147 | 2 | empty | (2,4] 1p [3] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 10.5 |
| 31 | 2^31 | 173 | 2 | empty | (2,4] 1p [3] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 21.5 |
| 32 | 2^32 | 205 | 3 | empty | (3,4] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 38.8 |
| 33 | 2^33 | 242 | 3 | empty | (3,4] EMPTY | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 77.1 |
| 34 | 2^34 | 286 | 3 | empty | (3,5] 1p [5] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 160.4 |
| 35 | 2^35 | 337 | 3 | empty | (3,5] 1p [5] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 346.1 |
| 36 | 2^36 | 398 | 3 | empty | (3,5] 1p [5] | 0 | 0 | 0 | n/a | 0 | 0 | 0 | 703.6 |

---

## CONTROLS, and an independent reimplementation

All four pre-registered negative controls fire, on the full j=20..36 run:

- **(i) shift 4 differs from shift 2** on all 28 rows where it was computed
  (`A-eta100` and `D-scaled`, every j with data). Example at `A-eta100` j=25:
  K(shift 2) = -1211.03 on 21312 n, K(shift 4) = -461.317 on 31987 n.
- **(ii) mu replaced by the constant 1 reproduces the unrestricted mass**
  sum_n L(n)L'(n-2) exactly, and that unrestricted mass strictly exceeds the
  squarefree-restricted mass on at least one row (both flags true).
- **(iii) random-sign mean within 4 standard errors of zero** on every row with
  data (`randMeanWithin4sd`=true, 62 rows, 16 draws each).
- **(iv) r band forcibly emptied gives K=0 and count=0** on all 17 rows of
  `E-empty`.

Beyond the controls, an **independent full-sieve enumeration** over (d,e,k,t)
at j in {20, 22, 24} reproduces the segmented pipeline's K exactly on all 9
(j, variant) rows checked (`enumMatchesSegmentedK`=true), and verifies the sign
identity mu(d)mu(e) = mu(n)mu(n-2) of corner-correlation §1.4 term by term on
every quadruple of the s=s'=1 prime class (`enumIdentityHolds`=true), along with
the exact split s11Prime = twoPoint + nonSquarefree (`enumSplitExact`=true). Two
different algorithms over different index sets agree; that is the strongest
check here.

## Mass split (s=s'=1 versus the non-squarefree class), from the enumeration

| j | variant | quadruples | occurring (r,r') pairs | s=s'=1 share of FULL corner mass | non-squarefree share of the s=s'=1 prime mass |
|---|---|---|---|---|---|
| 20 | `B-eta40` | 6870 | 7 | 1.000 | 0.2694 |
| 22 | `B-eta40` | 43689 | 11 | 0.9953 | 0.2645 |
| 24 | `B-eta40` | 228703 | 28 | 0.9858 | 0.2505 |
| 24 | `A-eta100` | 12170 | 5 | 1.000 | 0.2619 |
| 20 | `D-scaled` | 355 | 2 | 1.000 | 0.1531 |
| 22 | `D-scaled` | 5032 | 3 | 1.000 | 0.1460 |
| 24 | `D-scaled` | 9696 | 5 | 1.000 | 0.09804 |

(`A-eta100` at j=20 and j=22 has an empty right band, 0 quadruples.)

The s=s'=1 share is 1.000 wherever x^(2 eta0) < 2, and the reason is derived:
a cofactor k <= 2V carrying a prime power above V must equal that prime power,
so s=1 is forced. For eta0=1/100 that holds at every j below 50, so **the s>1
branch of the corner is essentially unmeasured**; only `B-eta40` at j=22 and
j=24 clears the threshold, giving 0.9953 and 0.9858. The non-squarefree class
of corner-correlation §1.4 carries between 9.8 and 27 percent of the s=s'=1
prime-class absolute mass at these parameters. That is a smaller share than the
"majority" `corner-correlation-validation.js` reports at its own parameters; the
two runs use different cutoff exponents and different corner cuts, so this is a
parameter effect, not a contradiction, and neither figure is asymptotic.

## Prime pairs actually present

The `rp band` column of the table lists the primes in the right band verbatim at
every j. At the top of the range (j=36): `A-eta100` has 41 left-band primes in
(398,657] and exactly one right-band prime, 5, so 41 available (r,r') pairs;
`B-eta40` has 143 and {5,7,11}, 429 pairs; `C-dyadic` has 60 and {5}, 60 pairs;
`D-scaled` has 41 and {23,29,31,37}, 164 pairs. Exact occurring-pair counts (as
opposed to available) were computed only in the small-j enumeration, where they
are 2 to 28 (table above). Total contributing n summed over all 62 non-empty
rows: 1,297,289,791.

## LIMITATIONS

1. **The actual corner is not measured**, per the degeneracy above. The rows
   with actual cutoffs have a one-prime right band; the rows with a populated
   right band use a different cutoff exponent. No argument is given that the two
   have the same shape.
2. **Short range.** log x varies by a factor of at most 1.8 across each fit
   (j=20..36, or 23..36). A least-squares slope over that has no power to
   distinguish a power law from a slowly varying prefactor, and cannot see a
   log-power saving at all.
3. **|K|/mass is a saving against the triangle inequality on the term-wise mass**
   of corner-correlation §1.5, not the ratio the consumer needs. The consumer
   needs log^(2+eps) x on this sub-family, log^(4+eps) x on the full corner.
4. **16 draws estimate a standard deviation to about 18 percent.** The exact
   second moment sqrt(sum w^2) is computed alongside and is the sharper null;
   it is what the significance table uses. The 16 draws agree with it (they are
   in the table as `randSd`) and mainly serve to check the accumulator.
5. **Draw independence** comes from 16 bits of one 32-bit mixer applied to n.
   Adequate for a null, not a certified independent stream.
6. **Cutoffs are floating-point powers of two** (`Math.floor(Math.pow(2, j*a))`).
   No j in the run is near a point where the floor could slip, but the code does
   not check that.
7. **The OLS standard errors in the verdict table are scratchpad-grade**: they
   are computed from the bound JSON artifact, not inside the bound script.
8. **Nothing here is an input to any estimate.** No step of any argument in the
   corpus may cite a number from this run.

## WHAT WOULD CHANGE THE READING

- A |K|/mass decay measurably faster than the matched null, sustained over more
  than a factor of two in log x. It would still be a measurement.
- Reaching an x where the *actual* band (Z, Z x^(2 eta0)] holds several primes.
  Not reachable by this method at any budget; see the PNT estimate above.
- A single j with K < -C_2 x. Would need re-deriving before being believed.
- A failure of the enumeration cross-check would void every number here.
- A different partition of the corner that populates the s>1 branch at reachable
  x would let the "share of the full corner mass" question be answered; at
  eta0=1/100 it cannot be answered below j=50.

## What did NOT move

Nothing in the proof moved. The corner remains OPEN, the sufficient margin
C_2 x + E_dagger >= c_0 x/log^K x remains OPEN, and no budget, cut or region in
`grouped-divisor-moment.md` is touched. The run's main contribution is negative
and methodological: the actual corner's right band is degenerate at every
reachable x, so this class of measurement cannot inform the corner directly, and
on the shapes that can be measured the correlation is the size of a random-sign
sum.
