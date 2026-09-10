// ============================================================================
// FOLD PROFILE 14 — THE SUB-BINOMIAL DISPERSION: real, or my estimator?
// ============================================================================
// 13 measured the dispersion of its z-statistic at 0.84 to 0.96 across three
// tiles, i.e. twin primes fluctuating LESS than independent sampling would give.
// Before that gets called an anomaly it has to survive two checks.
//
// CHECK 1, THE SYNTHETIC CONTROL. Take the real slot positions and the real
// smooth survival profile, then generate FAKE twin primes by an honest binomial
// draw at that profile. Push the fake data through the identical pipeline. If the
// synthetic also disperses at 0.84-0.96, the deficit is an artifact of the
// flank-baseline estimator and there is nothing to see. If the synthetic sits at
// 1.00 and the real data does not, the deficit is in the arithmetic.
//
// CHECK 2, THE WIDTH DEPENDENCE. 13's dispersions fall with window width:
// 0.96, 0.92, 0.84 at 8, 80, 800 bins in T23. A variance deficit that GROWS with
// interval length is the signature of the classical short-interval variance
// deficit for primes (Montgomery-Soundararajan), not of a local clustering
// effect. Measuring the shape says which.
//
//   S1  synthetic control against real, same pipeline, several replicates
//   S2  the Fano factor directly, on disjoint windows, real against synthetic
//   S3  the width dependence, and what shape it has
//
// Run:  node --max-old-space-size=7000 fold-profile-14-underdispersion.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

const TPR = [2, 3, 5, 7, 11, 13, 17, 19, 23];
const W = TPR.reduce((a, b) => a * b, 1);
const NB = 200000, B = Math.ceil(W / NB), nb = Math.ceil(W / B);

log(`sieving to ${(W + 2).toExponential(2)} ...`);
const comp = new Uint8Array(W + 3);
comp[0] = comp[1] = 1;
for (let i = 2; i * i <= W + 2; i++) if (!comp[i]) for (let j = i * i; j <= W + 2; j += i) comp[j] = 1;
const rough = new Uint8Array(W + 3).fill(1);
rough[0] = 0;
for (const q of TPR) for (let m = q; m <= W + 2; m += q) rough[m] = 0;

log('binning ...');
const bs = new Int32Array(nb), bt = new Int32Array(nb);
for (let r = 0; r < W; r++) {
  const b = (r / B) | 0;
  if (rough[r] && rough[r + 2]) bs[b]++;
  if (!comp[r] && !comp[r + 2]) bt[b]++;
}
const D = bs.reduce((a, b) => a + b, 0), TT = bt.reduce((a, b) => a + b, 0);

console.log('='.repeat(100));
console.log('FOLD PROFILE 14 — is the sub-binomial dispersion real, or an artifact of the estimator?');
console.log('='.repeat(100));
console.log(`   T23: W = ${W.toLocaleString()}, ${nb.toLocaleString()} bins of ${B}, slots ${D.toLocaleString()}, twins ${TT.toLocaleString()}`);
console.log(`   mean slots per bin = ${(D / nb).toFixed(1)},  mean survival = ${(TT / D).toFixed(6)}`);

// --- the smooth survival profile, from a wide moving window -----------------
const K = 5000;                      // half-width of the smoother, 2.5% of the tile
const PS = new Float64Array(nb + 1), PT = new Float64Array(nb + 1);
for (let i = 0; i < nb; i++) { PS[i + 1] = PS[i] + bs[i]; PT[i + 1] = PT[i] + bt[i]; }
const rate = new Float64Array(nb);
for (let i = 0; i < nb; i++) {
  const lo = Math.max(0, i - K), hi = Math.min(nb, i + K + 1);
  const s = PS[hi] - PS[lo], t = PT[hi] - PT[lo];
  rate[i] = s > 0 ? t / s : TT / D;
}

// --- the analysis pipeline, identical to fold-profile-13 --------------------
function pipeline(binTwins, label) {
  const QT = new Float64Array(nb + 1);
  for (let i = 0; i < nb; i++) QT[i + 1] = QT[i] + binTwins[i];
  const S = (i, j) => PS[Math.min(j, nb)] - PS[Math.max(i, 0)];
  const Tw = (i, j) => QT[Math.min(j, nb)] - QT[Math.max(i, 0)];
  const out = [];
  for (const wb of [8, 80, 800]) {
    const HEADCUT = Math.max(Math.ceil(nb / 1000), wb);
    let n = 0, sum = 0, sum2 = 0;
    for (let i = HEADCUT; i + 2 * wb <= nb; i++) {
      const s = S(i, i + wb); if (s < 100) continue;
      const t = Tw(i, i + wb);
      const fs = S(i - wb, i) + S(i + wb, i + 2 * wb);
      const ft = Tw(i - wb, i) + Tw(i + wb, i + 2 * wb);
      if (fs < 100) continue;
      const p = ft / fs; if (p <= 0 || p >= 1) continue;
      const z = (t - s * p) / Math.sqrt(s * p * (1 - p) * (1 + s / fs));
      n++; sum += z; sum2 += z * z;
    }
    const m = sum / n;
    out.push({ wb, n, sd: Math.sqrt(sum2 / n - m * m) });
  }
  return out;
}

// --- synthetic twin primes: honest binomial draws at the smooth rate --------
// SEEDED 2026-08-17. The draws used Math.random(), so the synthetic column was
// a different number on every run and nothing downstream could be checked
// against it. fold-profile-15 and -16 both quoted a range from one such run
// that no later run reproduces. mulberry32 with a fixed seed keeps the control
// honest and makes it citable.
let RNGSTATE = 20260817;
function rnd() {
  RNGSTATE = (RNGSTATE + 0x6D2B79F5) | 0;
  let t = Math.imul(RNGSTATE ^ (RNGSTATE >>> 15), 1 | RNGSTATE);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function synth() {
  const st = new Int32Array(nb);
  for (let i = 0; i < nb; i++) {
    const k = bs[i], p = rate[i];
    let c = 0;
    for (let j = 0; j < k; j++) if (rnd() < p) c++;
    st[i] = c;
  }
  return st;
}

console.log('');
console.log('S1. SYNTHETIC CONTROL — identical pipeline, fake twins drawn binomially at the real rate');
console.log('-'.repeat(100));
const real = pipeline(bt, 'real');
const reps = [];
for (let r = 0; r < 5; r++) { log(`synthetic replicate ${r + 1}/5 ...`); reps.push(pipeline(synth(), 'synth')); }

console.log('   width (bins) |  windows |  REAL dispersion |  SYNTHETIC dispersion (5 reps)      | mean synth | real/synth');
for (let k = 0; k < real.length; k++) {
  const sds = reps.map((r) => r[k].sd);
  const ms = sds.reduce((a, b) => a + b, 0) / sds.length;
  console.log(`   ${String(real[k].wb).padStart(12)} | ${String(real[k].n).padStart(8)} | ${real[k].sd.toFixed(4).padStart(16)} | ` +
    `${sds.map((v) => v.toFixed(3)).join(' ').padStart(35)} | ${ms.toFixed(4).padStart(10)} | ${(real[k].sd / ms).toFixed(4)}`);
}
console.log('');
console.log('   If the synthetic column sits at 1.00 the estimator is clean and the real deficit is');
console.log('   arithmetic. If the synthetic is also low, the deficit is the estimator.');

// ---------------------------------------------------------------------------
console.log('');
console.log('S2. THE FANO FACTOR DIRECTLY — disjoint windows, no flank estimator at all');
console.log('-'.repeat(100));
console.log('   Restricted to bins [nb/4, 3nb/4] so the smooth trend is mild. chi2/dof against the');
console.log('   binomial null with the LOCAL smooth rate. 1.00 = binomial, below = under-dispersed.');
console.log('');
console.log('   width (bins) |  disjoint windows |  REAL chi2/dof |  SYNTH chi2/dof |  real/synth');
function fano(binTwins) {
  const QT = new Float64Array(nb + 1);
  for (let i = 0; i < nb; i++) QT[i + 1] = QT[i] + binTwins[i];
  const res = [];
  for (const wb of [4, 8, 20, 80, 200, 800, 2000]) {
    let chi = 0, n = 0;
    for (let i = nb >> 2; i + wb <= (3 * nb) >> 2; i += wb) {
      const s = PS[i + wb] - PS[i]; if (s < 50) continue;
      const t = QT[i + wb] - QT[i];
      // local rate from the smoother, averaged over the window
      let p = 0; for (let j = i; j < i + wb; j++) p += rate[j]; p /= wb;
      chi += ((t - s * p) * (t - s * p)) / (s * p * (1 - p));
      n++;
    }
    res.push({ wb, n, f: chi / n });
  }
  return res;
}
const fr = fano(bt), fsy = fano(synth());
for (let k = 0; k < fr.length; k++) {
  console.log(`   ${String(fr[k].wb).padStart(12)} | ${String(fr[k].n).padStart(17)} | ${fr[k].f.toFixed(4).padStart(14)} | ` +
    `${fsy[k].f.toFixed(4).padStart(15)} | ${(fr[k].f / fsy[k].f).toFixed(4)}`);
}

console.log('');
console.log('S3. THE SHAPE — how the deficit moves with interval length');
console.log('-'.repeat(100));
console.log('   window width in integers |  slots per window |  REAL chi2/dof |  deficit 1 - f');
for (const r of fr) {
  const hInt = r.wb * B;
  console.log(`   ${hInt.toLocaleString().padStart(24)} | ${(r.wb * D / nb).toFixed(0).padStart(17)} | ` +
    `${r.f.toFixed(4).padStart(14)} | ${(1 - r.f).toFixed(4)}`);
}
console.log('');
console.log('   A deficit that GROWS with interval length is the classical short-interval variance');
console.log('   deficit for primes (Montgomery-Soundararajan): the count in [x, x+h] has variance');
console.log('   below Poisson by a factor that widens as h grows. A deficit that is FLAT in h would');
console.log('   instead point at local repulsion, which would be a new object.');

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/fold-profile-14-underdispersion.js
//   invocation:  node research/fold-profile-14-underdispersion.js
//   code-sha256: cabf2981a25771a15377d088767f89015bd382a34e15e67aa3bc664d7a45c6bc
//   out-sha256:  790deab4511ea0355f921a63ad4a6d77dbad790f09ff6325bcf15928dfedad91
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     2.5 s
// ============================================================================
// ====================================================================================================
// FOLD PROFILE 14 — is the sub-binomial dispersion real, or an artifact of the estimator?
// ====================================================================================================
//    T23: W = 223,092,870, 199,905 bins of 1116, slots 7,952,175, twins 896,062
//    mean slots per bin = 39.8,  mean survival = 0.112681
//
// S1. SYNTHETIC CONTROL — identical pipeline, fake twins drawn binomially at the real rate
// ----------------------------------------------------------------------------------------------------
//    width (bins) |  windows |  REAL dispersion |  SYNTHETIC dispersion (5 reps)      | mean synth | real/synth
//               8 |   199690 |           0.9621 |       1.005 1.006 1.011 1.008 1.013 |     1.0086 | 0.9540
//              80 |   199546 |           0.9213 |       0.994 0.994 0.996 0.983 1.005 |     0.9944 | 0.9265
//             800 |   197506 |           0.8376 |       0.963 1.020 0.927 0.886 1.006 |     0.9603 | 0.8723
//
//    If the synthetic column sits at 1.00 the estimator is clean and the real deficit is
//    arithmetic. If the synthetic is also low, the deficit is the estimator.
//
// S2. THE FANO FACTOR DIRECTLY — disjoint windows, no flank estimator at all
// ----------------------------------------------------------------------------------------------------
//    Restricted to bins [nb/4, 3nb/4] so the smooth trend is mild. chi2/dof against the
//    binomial null with the LOCAL smooth rate. 1.00 = binomial, below = under-dispersed.
//
//    width (bins) |  disjoint windows |  REAL chi2/dof |  SYNTH chi2/dof |  real/synth
//               4 |             24988 |         0.9093 |          1.0206 | 0.8909
//               8 |             12494 |         0.8901 |          1.0123 | 0.8794
//              20 |              4997 |         0.8472 |          1.0473 | 0.8090
//              80 |              1249 |         0.8064 |          1.0797 | 0.7469
//             200 |               499 |         0.7190 |          1.1287 | 0.6370
//             800 |               124 |         0.5922 |          1.3194 | 0.4488
//            2000 |                49 |         0.4702 |          0.9483 | 0.4959
//
// S3. THE SHAPE — how the deficit moves with interval length
// ----------------------------------------------------------------------------------------------------
//    window width in integers |  slots per window |  REAL chi2/dof |  deficit 1 - f
//                       4,464 |               159 |         0.9093 | 0.0907
//                       8,928 |               318 |         0.8901 | 0.1099
//                      22,320 |               796 |         0.8472 | 0.1528
//                      89,280 |              3182 |         0.8064 | 0.1936
//                     223,200 |              7956 |         0.7190 | 0.2810
//                     892,800 |             31824 |         0.5922 | 0.4078
//                   2,232,000 |             79560 |         0.4702 | 0.5298
//
//    A deficit that GROWS with interval length is the classical short-interval variance
//    deficit for primes (Montgomery-Soundararajan): the count in [x, x+h] has variance
//    below Poisson by a factor that widens as h grows. A deficit that is FLAT in h would
//    instead point at local repulsion, which would be a new object.
//
//    done in 2.4s
// ───── stderr ─────
//    [0.0s] sieving to 2.23e+8 ...
//    [1.2s] binning ...
//    [1.8s] synthetic replicate 1/5 ...
//    [1.9s] synthetic replicate 2/5 ...
//    [2.0s] synthetic replicate 3/5 ...
//    [2.1s] synthetic replicate 4/5 ...
//    [2.2s] synthetic replicate 5/5 ...
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. THE DEFICIT SURVIVES THE CONTROL AND THAT IS THE FILE'S JOB DONE. Real
//    dispersion 0.9621, 0.9213, 0.8376 against synthetic means 1.0086, 0.9944,
//    0.9603 at widths 8, 80, 800, giving real/synth 0.9540, 0.9265, 0.8723. The
//    synthetic sits at 1.00 where the estimator is well conditioned, so the
//    estimator is clean and the deficit is in the arithmetic, not in the
//    pipeline. Check 1 passes.
// 2. THE THREE ROWS ARE NOT EQUALLY STRONG AND THE TABLE DOES NOT SAY SO. The
//    five synthetic replicates have sd 0.0034, 0.0078, 0.0554 at widths 8, 80,
//    800 (= the sd of the five values printed in each S1 row), i.e. standard
//    errors of the mean (sd/sqrt(5)) of 0.0015, 0.0035, 0.0248. The real
//    value sits 30.9, 20.9 and 5.0 of those below the synthetic mean
//    (= (mean synth - REAL)/SEM from the S1 rows). So the
//    two narrow widths are overwhelming and the 800-bin row — the one carrying
//    the largest effect — is a 5-sigma statement resting on a standard error
//    estimated from FIVE draws. Wave 5's correction to the sibling files says
//    the same thing in words ("the 800-bin comparison is the weakest of the
//    three"); the numbers are here.
// 3. THE SYNTHETIC CONTROL IN S2 IS NOT AT 1.00 WHERE IT MATTERS MOST, AND THE
//    real/synth COLUMN QUIETLY DIVIDES BY IT. SYNTH chi2/dof reads 1.0206,
//    1.0123, 1.0473, 1.0797, 1.1287, 1.3194, 0.9483 as the width grows. Against
//    the chi-square null those are +2.3, +1.0, +2.4, +2.0, +2.0, +2.5 and -0.3
//    standard deviations from 1 (sd = sqrt(2/dof) with dof = 24988 down to 49).
//    Six of seven are on the high side and the drift grows with width, so the
//    control is mildly OVER-dispersed exactly where the real deficit is
//    deepest, and dividing by it inflates the reported effect. The real column
//    alone (0.9093 down to 0.4702) is the trustworthy series; the "real/synth"
//    column at widths 800 and 2000 (0.4488, 0.4959) should not be quoted.
// 4. THE FANO SERIES IS THE REAL RESULT AND ITS SHAPE IS UNAMBIGUOUS. REAL
//    chi2/dof falls monotonically 0.9093, 0.8901, 0.8472, 0.8064, 0.7190,
//    0.5922, 0.4702 as the window grows from 4,464 to 2,232,000 integers, i.e.
//    the deficit 1 - f grows from 9.1% to 53.0%. This is measured with NO flank
//    estimator at all, on disjoint windows, so it is independent of the
//    machinery that produced reading 1. A deficit that grows with h is the
//    Montgomery-Soundararajan short-interval variance deficit, not local
//    repulsion. Check 2 passes and it decides the question the header poses.
// 5. TWO CAVEATS ON THE TAIL OF THAT SERIES, BOTH IN THE CONSERVATIVE
//    DIRECTION. The last two rows rest on 124 and 49 disjoint windows, so the
//    sampling sd of chi2/dof is 0.127 and 0.202 — 0.5922 and 0.4702 are 3.2 and
//    2.6 sd below 1, real but not overwhelming. And at width 2,000 bins a
//    window spans 1% of the tile, so any residual smooth trend across it INFLATES
//    the chi-square; the measured deficit is therefore a lower bound on the true
//    one. Neither caveat is in the file.
// 6. S3 IS S2's REAL COLUMN IN DIFFERENT UNITS. The seven chi2/dof values in S3
//    are exactly S2's seven, relabelled from bins to integers with a slots-per-
//    window column added. Nothing is recomputed. Read S3 as the interpretation
//    of S2, not as a third measurement.
// 7. THE SEEDING FIX HOLDS AND THE FILE IS NOW REPRODUCIBLE. The synthetic
//    generator is seeded (mulberry32, seed 20260817, wave-5 repair S2-12) and
//    this run reproduces the replicate range 0.886 to 1.020 that
//    fold-profile-15 and -16 now quote in their corrected headers. Before that
//    repair the control drew from Math.random() and was a different number
//    every run, and two sibling files quoted a range ("0.993-1.014") that no
//    later run reproduces. Verified here: the quoted range and the run agree.
// 8. SCOPE. One tile, T23, one replicate count (5), one binning (199,905 bins of
//    1,116). S2 restricts to the middle half of the tile. Nothing here tests
//    whether the deficit is a TILE phenomenon — that is fold-profile-16, and its
//    answer is no. Runtime 2.4 s, plain node; the header's
//    --max-old-space-size=7000 was not needed.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure: "0.993-1.014" (reading 7) is a hyphenated
//   range, so its upper end reads as a negative number.
// DERIVED IN THIS READING by arithmetic over printed values:
//   sd 0.0034, 0.0078, 0.0554 (reading 2) is the sample standard deviation of
//   the five synthetic replicates printed in each S1 row, and the standard
//   errors 0.0015, 0.0035, 0.0248 are those divided by sqrt 5.
//   30.9, 20.9 and 5.0 (reading 2) are (mean synth - REAL)/SEM off the same S1
//   rows: 0.0465/0.0015, 0.0731/0.0035, 0.1227/0.0248.
//   9.1% to 53.0% (reading 4) is the printed deficit column, 0.0907 and
//   0.5298, as percentages.
//   Sampling sd 0.127 and 0.202 (reading 5) is sqrt(2/dof) at the printed
//   disjoint-window counts 124 and 49.
// BORROWED, verified in the named producer, though not from an OUTPUT block:
//   the range "0.993-1.014" (reading 7) is quoted from the ⚠ CORRECTED header
//   lines of research/fold-profile-15-variance-law.js:9 and
//   research/fold-profile-16-is-it-the-tile.js:9, which both record it as the
//   line they used to carry. It appears in no embedded OUTPUT anywhere, and by
//   those files' own account it cannot: it came from one unseeded run of this
//   script that no later run reproduces. That is the point the reading makes.
// IN-CODE: mulberry32 seed 20260817 is RNGSTATE at line 103, with the reason
//   for seeding in the comment at line 101; --max-old-space-size=7000 is the
//   Run: line at line 25.
// ---------------------------------------------------------------------------
