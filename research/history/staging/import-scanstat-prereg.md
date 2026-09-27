# Pre-registration: IMPORT-MAP row 1, the maxsum exponent at T_23 and T_29

<!-- ledger
id: Q-import-scanstat-prereg
status: OPEN
todo: none
question: What is the maxsum exponent at T_23 and T_29, predicted from a T_13/T_17/T_19 fit before the run?
verdict: Machine-written pre-registration only: the extrapolation laws, the grid and the kill criterion (Model A must beat Model B on the ln-RMS of excess_m at T_23) are fixed before any scoring, so part 4 cannot be scored against a prediction chosen after the fact.
-->

**This file is machine-written by `research/import-scanstat-03-prereg.js` and is not
hand-edited.** It exists so that part 4 of the experiment cannot be scored against a
prediction chosen after the fact. Regenerate with `node research/import-scanstat-03-prereg.js`;
the fit reads T_13, T_17 and T_19 only.

Rule: OLS in lnD over T_13,T_17,T_19; grid 1,2,3,4,6,8,12,16,24,32,48,64. Model A is `sd_m = c* m^H*`; Model B is `sd_m = sd_1* sqrt(m)`;
both give `maxsum_m = m*mbar + sd_m*sqrt(2 ln D)`. Kill criterion: Model A must beat
Model B on the ln-RMS of `excess_m = maxsum_m - m*mbar` at T_23.

Extrapolation laws, OLS in `ln D`:

```
ln c   = 2.266792 + 0.052776 * lnD
H      = 0.220511 + 0.006140 * lnD
ln sd_1= 2.026484 + 0.064025 * lnD
```

## T_23   (D = 7952175, W = 223092870, mbar = 28.05432, sqrt(2 lnD) = 5.6372)

H* = 0.3181, c* = 22.3170, Model B sd_1* = 20.9845

| m | A: sd_m | A: maxsum_m | B: sd_m | B: maxsum_m |
|---|---|---|---|---|
| 1 | 22.317 | 153.9 | 20.984 | 146.3 |
| 2 | 27.822 | 212.9 | 29.677 | 223.4 |
| 3 | 31.651 | 262.6 | 36.346 | 289.1 |
| 4 | 34.684 | 307.7 | 41.969 | 348.8 |
| 6 | 39.458 | 390.8 | 51.401 | 458.1 |
| 8 | 43.239 | 468.2 | 59.353 | 559.0 |
| 12 | 49.191 | 613.9 | 72.692 | 746.4 |
| 16 | 53.904 | 752.7 | 83.938 | 922.0 |
| 24 | 61.324 | 1019.0 | 102.802 | 1252.8 |
| 32 | 67.200 | 1276.6 | 118.706 | 1566.9 |
| 48 | 76.450 | 1777.6 | 145.385 | 2166.2 |
| 64 | 83.775 | 2267.7 | 167.876 | 2741.8 |

## T_29   (D = 214708725, W = 6469693230, mbar = 30.13242, sqrt(2 lnD) = 6.1943)

H* = 0.3383, c* = 26.5569, Model B sd_1* = 25.9144

| m | A: sd_m | A: maxsum_m | B: sd_m | B: maxsum_m |
|---|---|---|---|---|
| 1 | 26.557 | 194.6 | 25.914 | 190.7 |
| 2 | 33.575 | 268.2 | 36.649 | 287.3 |
| 3 | 38.511 | 328.9 | 44.885 | 368.4 |
| 4 | 42.448 | 383.5 | 51.829 | 441.6 |
| 6 | 48.688 | 482.4 | 63.477 | 574.0 |
| 8 | 53.665 | 573.5 | 73.297 | 695.1 |
| 12 | 61.555 | 742.9 | 89.770 | 917.7 |
| 16 | 67.847 | 902.4 | 103.658 | 1124.2 |
| 24 | 77.822 | 1205.2 | 126.954 | 1509.6 |
| 32 | 85.776 | 1495.6 | 146.594 | 1872.3 |
| 48 | 98.387 | 2055.8 | 179.540 | 2558.5 |
| 64 | 108.444 | 2600.2 | 207.315 | 3212.7 |

Disclosed leak: the T_23 exponent and its `sd_m/(sd_1 sqrt m)` column are already
published in the embedded output of `../../import-chaining-03.js`, so T_23 is out of
sample for the fit and not blind to the author. T_29 has never been computed here for
any moving-sum statistic and is the blind level.
