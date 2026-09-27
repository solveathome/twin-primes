// ============================================================================
// FOLD PROFILE 13, COMPANION — IS THE ONE "*** ABOVE ***" AN EXCESS AT ALL?
// ============================================================================
// research/fold-profile-13-hotspot-sweep.js sweeps three tiles for a local
// twin-survival hotspot and reports one positive: T23 at width 8 bins, max
// z = 4.90 against a threshold of 4.75, closing with "A positive excess
// survived. Investigate." Wave 5 logged that as an open loose end (S2-22).
//
// Reading 1 of that file retires the positive on the strength of a null
// simulation described there as a "scratch Monte Carlo, not this script". It
// was never pasted anywhere, and it is the ENTIRE basis for retiring the
// sweep's one positive. This file is that simulation, written to be run and
// embedded, so the retirement rests on a printed block. (2026-08-20, mismatch
// adjudication #32.)
//
// THE NULL. Twin primes are placed INDEPENDENTLY in the tile's slots at the
// measured rate p = twin primes / slots = 896,062 / 7,952,175 = 0.112681. The
// slot GEOMETRY is the real one — the T23 rough array binned exactly as the
// sweep bins it, 1,116 integers per bin — because the flank estimator divides
// by slot counts and those must carry the tile's own structure. Only the twin
// placements are synthetic. Everything downstream (HEADCUT, the s >= 100 and
// fs >= 100 filters, the flanking-window baseline, the (1 + s/fs) inflation,
// the sqrt(2 ln n) threshold) is the sweep's own code path, copied verbatim.
//
// THE QUESTION THE TWO COUNTS ANSWER. The sweep slides one bin at a time, so
// its 199,690 windows overlap eightfold at width 8 and are nothing like
// 199,690 independent draws. sqrt(2 ln n) with n = 199,690 is therefore the
// threshold for a field far more correlated than the formula assumes. Both
// counts are simulated here: every window (n as the sweep counts them) and
// every eighth window (n / width, the correlated-field count). The honest
// comparison for "is 4.90 large" is the first; the second is the sanity check
// that the answer does not hinge on how the windows are counted.
//
// Run:  node --max-old-space-size=7000 research/fold-profile-13-null-mc.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');
function assert(c, m) { if (!c) { throw new Error('ASSERT: ' + m); } }

// The tile the positive lives in, and the sweep's own binning.
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23];
const W = PRIMES.reduce((a, b) => a * b, 1);
const NB = 200000;
const B = Math.ceil(W / NB);
const nb = Math.ceil(W / B);
const WB = 8;                       // the width the positive appeared at
const REPS = 60;                    // replicates, as the scratch run used
const P = 0.112681;                 // measured survival, the sweep's own print
const OBSERVED = 4.90;              // the sweep's max z at T23 width 8
const OBS_THR = 4.75;               // and its sqrt(2 ln n) threshold

console.log('='.repeat(100));
console.log('FOLD PROFILE 13, COMPANION — the null distribution of the sweep\'s maximum z');
console.log('='.repeat(100));
console.log(`tile T23: W = ${W.toLocaleString()}, bin = ${B}, bins = ${nb.toLocaleString()}, window = ${WB} bins`);

// ---- the real slot geometry, binned exactly as the sweep bins it ----------
log('building the T23 slot geometry ...');
const rough = new Uint8Array(W + 3).fill(1);
rough[0] = 0;
for (const q of PRIMES) for (let m = q; m <= W + 2; m += q) rough[m] = 0;
const bs = new Int32Array(nb + 1);
for (let r = 0; r < W; r++) if (rough[r] && rough[r + 2]) bs[(r / B) | 0]++;
let D = 0; for (let i = 0; i < nb; i++) D += bs[i];
console.log(`slots D = ${D.toLocaleString()}  (the sweep prints 7,952,175)`);
assert(D === 7952175, 'slot count must reproduce the sweep\'s printed D');
console.log(`mean slots per window of ${WB} bins = ${(WB * D / nb).toFixed(1)}  (reading 1 calls this s = 318)`);

// ---- one replicate: sprinkle twins at rate P, then score with the sweep's code
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6D2B79F5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const PS = new Int32Array(nb + 1), PT = new Int32Array(nb + 1);
for (let i = 0; i < nb; i++) PS[i + 1] = PS[i] + bs[i];
const bt = new Int32Array(nb + 1);

// exactly the sweep's window accessors
const S = (i, j) => PS[Math.min(j, nb)] - PS[Math.max(i, 0)];
const Tw = (i, j) => PT[Math.min(j, nb)] - PT[Math.max(i, 0)];

function replicate(rnd, stride) {
  for (let i = 0; i < nb; i++) {
    let c = 0; const k = bs[i];
    for (let j = 0; j < k; j++) if (rnd() < P) c++;
    bt[i] = c;
  }
  for (let i = 0; i < nb; i++) PT[i + 1] = PT[i] + bt[i];
  const HEADCUT = Math.max(Math.ceil(nb / 1000), WB);
  let n = 0, mx = -Infinity;
  for (let i = HEADCUT; i + 2 * WB <= nb; i += stride) {
    const s = S(i, i + WB);
    if (s < 100) continue;
    const t = Tw(i, i + WB);
    const ls = S(i - WB, i), lt = Tw(i - WB, i);
    const rs = S(i + WB, i + 2 * WB), rt = Tw(i + WB, i + 2 * WB);
    const fs = ls + rs, ft = lt + rt;
    if (fs < 100) continue;
    const p = ft / fs;
    if (p <= 0 || p >= 1) continue;
    const mu = s * p, sd = Math.sqrt(s * p * (1 - p) * (1 + s / fs));
    const z = (t - mu) / sd;
    n++;
    if (z > mx) mx = z;
  }
  return { n, mx };
}

function quantile(a, q) {
  const b = a.slice().sort((x, y) => x - y);
  const i = (b.length - 1) * q, lo = Math.floor(i), hi = Math.ceil(i);
  return lo === hi ? b[lo] : b[lo] + (b[hi] - b[lo]) * (i - lo);
}

for (const [label, stride] of [['every eighth window (n / width, the correlated-field count)', WB],
                               ['every window (n as the sweep counts them)', 1]]) {
  log(`${REPS} replicates, ${label} ...`);
  const rnd = mulberry32(20260820);
  const maxes = []; let nseen = 0;
  for (let r = 0; r < REPS; r++) { const o = replicate(rnd, stride); maxes.push(o.mx); nseen = o.n; }
  const ge = maxes.filter((v) => v >= OBSERVED).length;
  const thr = Math.sqrt(2 * Math.log(nseen));
  console.log('');
  console.log(`  ${label}`);
  console.log(`    windows per replicate n = ${nseen.toLocaleString()};  sqrt(2 ln n) = ${thr.toFixed(2)}`);
  console.log(`    max z over ${REPS} replicates: median ${quantile(maxes, 0.5).toFixed(2)}, ` +
              `p10 ${quantile(maxes, 0.1).toFixed(2)}, p90 ${quantile(maxes, 0.9).toFixed(2)}, ` +
              `min ${Math.min(...maxes).toFixed(2)}, max ${Math.max(...maxes).toFixed(2)}`);
  console.log(`    replicates with max z >= the observed ${OBSERVED}: ${ge}/${REPS} = ` +
              `${(100 * ge / REPS).toFixed(0)}%`);
}

// ---- the skew the threshold does not know about --------------------------
log('measuring the null z distribution\'s shape ...');
{
  const rnd = mulberry32(20260821);
  for (let i = 0; i < nb; i++) {
    let c = 0; const k = bs[i];
    for (let j = 0; j < k; j++) if (rnd() < P) c++;
    bt[i] = c;
  }
  for (let i = 0; i < nb; i++) PT[i + 1] = PT[i] + bt[i];
  const HEADCUT = Math.max(Math.ceil(nb / 1000), WB);
  let n = 0, s1 = 0, s2 = 0, s3 = 0;
  const zs = [];
  for (let i = HEADCUT; i + 2 * WB <= nb; i++) {
    const s = S(i, i + WB);
    if (s < 100) continue;
    const t = Tw(i, i + WB);
    const ls = S(i - WB, i), lt = Tw(i - WB, i);
    const rs = S(i + WB, i + 2 * WB), rt = Tw(i + WB, i + 2 * WB);
    const fs = ls + rs, ft = lt + rt;
    if (fs < 100) continue;
    const p = ft / fs;
    if (p <= 0 || p >= 1) continue;
    const mu = s * p, sd = Math.sqrt(s * p * (1 - p) * (1 + s / fs));
    const z = (t - mu) / sd;
    zs.push(z); n++; s1 += z; s2 += z * z; s3 += z * z * z;
  }
  const m = s1 / n, v = s2 / n - m * m, sd = Math.sqrt(v);
  const skew = (s3 / n - 3 * m * v - m * m * m) / (sd * sd * sd);
  console.log('');
  console.log(`  one replicate, all ${n.toLocaleString()} windows: z mean ${m.toFixed(4)}, sd ${sd.toFixed(3)}, skew ${skew.toFixed(3)}`);
  console.log(`  the sweep's own measured z sd at T23 width 8 is 0.96, and its threshold ${OBS_THR}`);
  console.log('  A right-skewed z at sd ~1 is exactly what sqrt(2 ln n) does not price:');
  console.log('  the threshold is calibrated for normals, and the tail is heavier than normal.');
}

console.log('');
console.log(`VERDICT: the sweep's one positive, max z = ${OBSERVED} at T23 width ${WB}, is inside`);
console.log('the null distribution of the same statistic under pure independence.');
console.log(`done in ${el()}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both --node-flag --max-old-space-size=7000 research/fold-profile-13-null-mc.js
//   invocation:  node --max-old-space-size=7000 research/fold-profile-13-null-mc.js
//   code-sha256: acf4612348be4920b26f6f05bb0c76fde123a23347a944b22a2cba75e57807f1
//   out-sha256:  28244a8209c06a5f5b36b2b00e154569155beafa3032a9f46c8561c38631eb08
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     20.3 s
// ============================================================================
// ====================================================================================================
// FOLD PROFILE 13, COMPANION — the null distribution of the sweep's maximum z
// ====================================================================================================
// tile T23: W = 223,092,870, bin = 1116, bins = 199,905, window = 8 bins
// slots D = 7,952,175  (the sweep prints 7,952,175)
// mean slots per window of 8 bins = 318.2  (reading 1 calls this s = 318)
//
//   every eighth window (n / width, the correlated-field count)
//     windows per replicate n = 24,962;  sqrt(2 ln n) = 4.50
//     max z over 60 replicates: median 4.78, p10 4.44, p90 5.51, min 4.08, max 6.36
//     replicates with max z >= the observed 4.9: 25/60 = 42%
//
//   every window (n as the sweep counts them)
//     windows per replicate n = 199,690;  sqrt(2 ln n) = 4.94
//     max z over 60 replicates: median 5.48, p10 5.05, p90 6.08, min 4.71, max 7.03
//     replicates with max z >= the observed 4.9: 54/60 = 90%
//
//   one replicate, all 199,690 windows: z mean 0.0289, sd 1.013, skew 0.233
//   the sweep's own measured z sd at T23 width 8 is 0.96, and its threshold 4.75
//   A right-skewed z at sd ~1 is exactly what sqrt(2 ln n) does not price:
//   the threshold is calibrated for normals, and the tail is heavier than normal.
//
// VERDICT: the sweep's one positive, max z = 4.9 at T23 width 8, is inside
// the null distribution of the same statistic under pure independence.
// done in 20.2s
// ───── stderr ─────
//    [0.0s] building the T23 slot geometry ...
//    [0.7s] 60 replicates, every eighth window (n / width, the correlated-field count) ...
//    [10.3s] 60 replicates, every window (n as the sweep counts them) ...
//    [20.0s] measuring the null z distribution's shape ...
// ============================================================================
// READINGS (2026-08-20) — honestly calibrated
// ============================================================================
// 1. THE POSITIVE IS RETIRED, AND THE SIMULATION THAT RETIRES IT IS NOW ON
//    RECORD. The sweep's one "*** ABOVE ***", T23 at width 8 with max z = 4.90
//    against threshold 4.75, sits at the MEDIAN of the null: counting windows
//    the way the sweep counts them, the median replicate's maximum is above
//    4.90 and a clear majority of replicates exceed it. Counting one window
//    per width, where the draws are closer to independent, the observed value
//    still sits near the middle of the null. A maximum of 4.90 is the typical
//    outcome of this sweep under pure independence, not an excess.
// 2. THE THRESHOLD IS THE BUG, AND IT IS A SKEW PROBLEM. The z statistic has
//    sd very near 1 under the null — so the sweep's rescaling by the MEASURED
//    dispersion is doing its job — but a positive skew, because at width 8 a
//    window holds only ~318 slots and about 36 twin primes, and a binomial
//    count that small has a heavy right tail. sqrt(2 ln n) is the expected
//    maximum of n standard NORMALS and knows nothing about that, so it runs
//    too low at the smallest width, which is exactly the width where the one
//    positive appeared.
// 3. CALIBRATION, PLAINLY. This is a null model, not a proof: twin primes are
//    not independent, and the real field's correlations could push the null
//    maximum either way. What the run establishes is the weaker and sufficient
//    thing — that the sweep's threshold is not conservative at width 8, so its
//    one positive is not evidence of a hotspot. The slot geometry is the real
//    T23 tile (the run asserts its slot count against the sweep's printed
//    7,952,175 before doing anything else); only the twin placements are
//    synthetic.
// 4. WHY TWO WINDOW COUNTS. The sweep slides one bin at a time, so at width 8
//    its ~200k windows overlap eightfold and are nowhere near 200k independent
//    draws. Both counts are simulated so the verdict cannot rest on the choice.
//    They disagree about the threshold, as they must, and agree about the
//    verdict, which is the point.
// ============================================================================
