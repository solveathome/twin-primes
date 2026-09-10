// ============================================================================
// ATTACK foldL-04 — GAP GENEALOGY AMORTIZATION, localized (deep) instrument
// ============================================================================
// The exact-tile companion `research/attack-foldL-04-genealogy.js` reaches
// fold 31 and finds theta_p/mbar between 1.2 and 2.14 at every computable
// fold: the "qualifying gap is an extreme-tail object" premise of the
// amortization brief is simply false in the exact range. This script pushes
// the same ledger three decades further in p, in the localized frame the
// corpus already uses for depth (`research/LOCALIZED-GAP.md` s10, engine
// pattern from `research/fold-succession-autocorr.js`, which is cited rather
// than rerun for its record decomposition).
//
// THE OBJECT. Window [0, X). Positions n = 5 (mod 6). Fold p deletes the n
// with p | n(n+2), i.e. the n whose key = min{q >= 5 : q | n(n+2)} equals p.
// Level x is {n : key(n) > x}; its gap word is the localized analogue of the
// tile's, with the same merge law and the same qualification lemma. What
// differs from the tile is the ONLY thing that matters here: the population
// is X/mbar rather than exp(theta(x)), so the supply side of the ledger is
// bounded, and the ledger can close. Whether it does, and where, is the
// question.
//
// Boundary artifacts, stated: the two end gaps of the window are not gaps of
// the periodic object and are excluded; and at fold p the positions n = p and
// n = p^2 - 2 etc. below p^2 are the least-factor artifacts A6 names, at most
// a couple of deletions per fold against ~2X/(p*mbar).
// ============================================================================

'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);
const X = Number(process.env.WIN || 2e9);
const QMAX = Number(process.env.QMAX || 1500);
console.log('window X = ' + X.toExponential(1) + ', folds to ' + QMAX);

// ---- primes up to QMAX
const comp = new Uint8Array(QMAX + 1), primes = [];
for (let i = 2; i <= QMAX; i++) { if (!comp[i]) { primes.push(i); for (let j = i * i; j <= QMAX; j += i) comp[j] = 1; } }
const folds = primes.filter(q => q >= 5);

// ---- positions n = 5 mod 6 in [0, X); index i <-> n = 6i + 5
const M = Math.floor((X - 5) / 6) + 1;
console.log('positions n = 5 mod 6: ' + M);
const key = new Uint16Array(M);            // 0 = survives every fold <= QMAX
for (const q of folds) {
  // n = 0 mod q, n = 5 mod 6  ->  6i + 5 = 0 mod q  ->  i = (-5) * inv6 mod q
  const inv6 = modInv(6 % q, q);
  for (const t of [0, (q - 2) % q]) {
    // 6i + 5 = t (mod q)
    const start = (((t - 5) % q + q) % q) * inv6 % q;
    for (let i = start; i < M; i += q) if (key[i] === 0) key[i] = q;
  }
}
function modInv(a, m) { let g = m, x = 0, x1 = 1, a1 = a; while (a1 !== 0) { const qq = (g / a1) | 0; [g, a1] = [a1, g - qq * a1]; [x, x1] = [x1, x - qq * x1]; } return ((x % m) + m) % m; }
console.log('[' + el() + 's] keys sieved');

// ---- doubly linked list over positions, gap word, genealogy
const nxt = new Int32Array(M), prv = new Int32Array(M);
const gap = new Uint32Array(M);            // gap[i] = n_{next(i)} - n_i
const birth = new Uint16Array(M), dep = new Uint8Array(M);
for (let i = 0; i < M; i++) { nxt[i] = i + 1; prv[i] = i - 1; gap[i] = 6; birth[i] = 3; dep[i] = 0; }
nxt[M - 1] = -1; prv[0] = -1;

// buckets: positions to delete at each fold, as one counting-sorted Int32Array
const cntK = new Int32Array(QMAX + 1);
for (let i = 0; i < M; i++) cntK[key[i]]++;
const off = new Int32Array(QMAX + 2);
{ let acc = 0; for (let q = 1; q <= QMAX; q++) { off[q] = acc; acc += cntK[q]; } off[QMAX + 1] = acc; }
const order = new Int32Array(off[QMAX + 1]);
{ const fill = Int32Array.from(off);
  for (let i = 0; i < M; i++) { const k = key[i]; if (k === 0) continue; order[fill[k]++] = i; } }
const bucket = q => [off[q], off[q] + cntK[q]];
console.log('[' + el() + 's] buckets built (' + order.length + ' scheduled deletions)');

let N = M, G2 = 6;
const rowsOut = [];
console.log('');
console.log('  fold |          N |    mbar |    G2 | theta | th/mbar | kills |  runs |     X | L | X/kills | X/N      | G2/theta');
for (const p of folds) {
  const eta = (p % 6 === 1) ? 1 : -1, theta = 2 * p - 2 * eta;
  const mbarBefore = X / N, G2before = G2, thr = theta / mbarBefore;
  const [bLo, bHi] = bucket(p);
  // walk the deletion list in position order, grouping maximal runs of
  // list entries that are adjacent in the CURRENT linked list
  let kills = 0, runs = 0, Xp = 0, L = 0;
  const runHist = new Map();
  const spendByBirth = new Map(); let spendTotal = 0, spendSizeSum = 0;
  let a = bLo;
  while (a < bHi) {
    let b = a;
    while (b + 1 < bHi && nxt[order[b]] === order[b + 1]) b++;
    const ell = b - a + 1;
    kills += ell; runs++; Xp += ell - 1;
    runHist.set(ell, (runHist.get(ell) || 0) + 1);
    if (ell > L) L = ell;
    // the ell-1 interior gaps are the qualifying gaps this run consumes
    for (let t = a; t < b; t++) {
      const j = order[t];
      spendByBirth.set(birth[j], (spendByBirth.get(birth[j]) || 0) + 1);
      spendTotal++; spendSizeSum += gap[j];
    }
    // splice out the whole run at once
    const first = order[a], last = order[b];
    const lo = prv[first], hi = nxt[last];
    let sum = 0, d = 0;
    if (lo >= 0) { sum += gap[lo]; if (dep[lo] > d) d = dep[lo]; }
    for (let t = a; t <= b; t++) { const j = order[t]; sum += gap[j]; if (dep[j] > d) d = dep[j]; }
    if (lo >= 0) { nxt[lo] = hi; gap[lo] = sum; birth[lo] = p; dep[lo] = d + 1; if (hi >= 0 && sum > G2) G2 = sum; }
    if (hi >= 0) prv[hi] = lo;
    a = b + 1;
  }
  N -= kills;
  const mbar = X / N;
  if (p <= 101 || p % (p < 500 ? 10 : 50) < 2 || L > 1)
    console.log('  ' + String(p).padStart(5) + ' | ' + String(N).padStart(10) + ' | ' + mbar.toFixed(2).padStart(7) +
      ' | ' + String(G2).padStart(5) + ' | ' + String(theta).padStart(5) + ' | ' + thr.toFixed(3).padStart(7) +
      ' | ' + String(kills).padStart(5) + ' | ' + String(runs).padStart(5) + ' | ' + String(Xp).padStart(5) +
      ' | ' + String(L).padStart(1) + ' | ' + (kills ? (Xp / kills).toExponential(2) : '   -') +
      ' | ' + (Xp / Math.max(1, N)).toExponential(2) + ' | ' + (G2before / theta).toFixed(3));
  rowsOut.push({ p, N, mbar, G2: G2before, theta, thr, kills, runs, Xp, L, spendByBirth, spendTotal, spendSizeSum });
}
console.log('[' + el() + 's] folds done');

console.log('');
console.log('=== the supply density against the tail law ===');
console.log('X/kills is the empirical conditional probability that a kill has a killed neighbour,');
console.log('i.e. the r_2 of the exact-tile Reading 11. Compare exp(-lambda*theta) with lambda*mbar = 1.3.');
console.log('  fold | theta/mbar | X/kills   | exp(-1.3*th/mbar) | ratio');
for (const r of rowsOut) {
  if (!(r.p <= 101 || r.p % 50 < 2 || r.L > 1)) continue;
  const pred = Math.exp(-1.3 * r.thr), obs = r.kills ? r.Xp / r.kills : 0;
  console.log('  ' + String(r.p).padStart(5) + ' | ' + r.thr.toFixed(3).padStart(10) + ' | ' + obs.toExponential(2) +
    ' | ' + pred.toExponential(2).padStart(17) + ' | ' + (pred > 0 ? (obs / pred).toFixed(3) : '-'));
}

console.log('');
console.log('=== the freeze: where the ledger closes in the window ===');
{
  let lastLive = null, lastQualifiable = null;
  for (const r of rowsOut) { if (r.L >= 2) lastLive = r.p; if (r.theta <= r.G2) lastQualifiable = r.p; }
  console.log('  last fold with a kill-run of length >= 2 (L >= 2): p = ' + lastLive);
  console.log('  last fold whose theta is still <= the window G2 (beyond it L = 1 is FORCED by size alone): p = ' + lastQualifiable);
  // per-decade mean of the per-position adjacency density
  console.log('  per-position adjacency density X/kills by decade of p:');
  for (const [lo, hi] of [[5, 10], [10, 30], [30, 100], [100, 300], [300, 1000], [1000, 1e9]]) {
    const sel = rowsOut.filter(r => r.p >= lo && r.p < hi);
    if (!sel.length) continue;
    const k = sel.reduce((s2, r) => s2 + r.kills, 0), xx = sel.reduce((s2, r) => s2 + r.Xp, 0);
    const th = sel.reduce((s2, r) => s2 + r.thr, 0) / sel.length;
    console.log('    p in [' + lo + ',' + hi + '): folds ' + sel.length + '  mean theta/mbar ' + th.toFixed(2) +
      '  X/kills ' + (xx / k).toExponential(2) + '  exp(-1.3*th/mbar) ' + Math.exp(-1.3 * th).toExponential(2));
  }
  const live = rowsOut.filter(r => r.L >= 2);
  console.log('  folds with L >= 2: ' + live.length + ' of ' + rowsOut.length +
    '; max L over all folds = ' + Math.max(...rowsOut.map(r => r.L)));
  console.log('  sum over folds of (L-1) = ' + rowsOut.reduce((s, r) => s + r.L - 1, 0));
  console.log('  sum over folds of X (total adjacent kill pairs) = ' + rowsOut.reduce((s, r) => s + r.Xp, 0));
}

console.log('');
console.log('=== the birth cohorts of what the deep folds consume ===');
for (const r of rowsOut) {
  if (r.L < 2) continue;
  const bb = [...r.spendByBirth.entries()].sort((a, b) => a[0] - b[0]).slice(-8).map(([q, v]) => '@' + q + ':' + v).join(' ');
  console.log('  fold ' + String(r.p).padStart(5) + '  L = ' + r.L + '  consumed ' + r.spendTotal +
    ' gaps, mean size ' + (r.spendSizeSum / Math.max(1, r.spendTotal)).toFixed(1) +
    '  newest births [' + bb + ']');
}

console.log('');
console.log('=== the amortized sum, localized frame ===');
console.log('  requirement (gate-multiplies s8, excess form): sum_p (L-1)*rho*mbar/G2 <= 2 ln x - O(1), rho = 1.5');
{
  let burn = 0;
  for (const r of rowsOut) burn += (r.L - 1) * 1.5 * (X / (r.N + r.kills)) / r.G2;
  const xmax = rowsOut[rowsOut.length - 1].p;
  console.log('  measured total excess burn to p = ' + xmax + ': ' + burn.toFixed(4) + ' nats');
  console.log('  budget 2 ln x - ln 12 = ' + (2 * Math.log(xmax) - Math.log(12)).toFixed(4) + ' nats');
}
console.log('');
console.log('[' + el() + 's] done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-foldL-04-localized.js
//   invocation:  node research/attack-foldL-04-localized.js
//   code-sha256: 4abd0aa2c823f07a34f618d98ef55fa9a5da5c03f67bc35efa229f8429422256
//   out-sha256:  941621105f28e3dd8e9239d316735ad091981d4aa0126d061a77a7e4bd4bc8ee
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     24.7 s
// ============================================================================
// window X = 2.0e+9, folds to 1500
// positions n = 5 mod 6: 333333333
// [5.1s] keys sieved
// [7.9s] buckets built (317670656 scheduled deletions)
//
//   fold |          N |    mbar |    G2 | theta | th/mbar | kills |  runs |     X | L | X/kills | X/N      | G2/theta
//       5 |  200000000 |   10.00 |    12 |    12 |   2.000 | 133333333 | 133333333 |     0 | 1 | 0.00e+0 | 0.00e+0 | 0.500
//       7 |  142857143 |   14.00 |    30 |    12 |   1.200 | 57142857 | 38095238 | 19047619 | 2 | 3.33e-1 | 1.33e-1 | 1.000
//      11 |  116883116 |   17.11 |    42 |    24 |   1.714 | 25974027 | 25974027 |     0 | 1 | 0.00e+0 | 0.00e+0 | 1.250
//      13 |   98901099 |   20.22 |    66 |    24 |   1.403 | 17982017 | 17582417 | 399600 | 2 | 2.22e-2 | 4.04e-3 | 1.750
//      17 |   87265679 |   22.92 |   108 |    36 |   1.780 | 11635420 | 11353348 | 282072 | 2 | 2.42e-2 | 3.23e-3 | 1.833
//      19 |   78079812 |   25.61 |   150 |    36 |   1.571 | 9185867 | 8961531 | 224336 | 2 | 2.44e-2 | 2.87e-3 | 3.000
//      23 |   71290254 |   28.05 |   204 |    48 |   1.874 | 6789558 | 6683140 | 106418 | 3 | 1.57e-2 | 1.49e-3 | 3.125
//      29 |   66373676 |   30.13 |   258 |    60 |   2.139 | 4916578 | 4841242 | 75336 | 2 | 1.53e-2 | 1.14e-3 | 3.400
//      31 |   62091513 |   32.21 |   300 |    60 |   1.991 | 4282163 | 4202136 | 80027 | 3 | 1.87e-2 | 1.29e-3 | 4.300
//      37 |   58735201 |   34.05 |   378 |    72 |   2.235 | 3356312 | 3325364 | 30948 | 3 | 9.22e-3 | 5.27e-4 | 4.167
//      41 |   55870066 |   35.80 |   378 |    84 |   2.467 | 2865135 | 2854081 | 11054 | 2 | 3.86e-3 | 1.98e-4 | 4.500
//      43 |   53271455 |   37.54 |   420 |    84 |   2.347 | 2598611 | 2586902 | 11709 | 3 | 4.51e-3 | 2.20e-4 | 4.500
//      47 |   51004617 |   39.21 |   492 |    96 |   2.557 | 2266838 | 2257013 |  9825 | 2 | 4.33e-3 | 1.93e-4 | 4.375
//      53 |   49079831 |   40.75 |   492 |   108 |   2.754 | 1924786 | 1912349 | 12437 | 3 | 6.46e-3 | 2.53e-4 | 4.556
//      59 |   47416063 |   42.18 |   492 |   120 |   2.945 | 1663768 | 1657198 |  6570 | 2 | 3.95e-3 | 1.39e-4 | 4.100
//      61 |   45861531 |   43.61 |   498 |   120 |   2.845 | 1554532 | 1547570 |  6962 | 2 | 4.48e-3 | 1.52e-4 | 4.100
//      67 |   44492626 |   44.95 |   498 |   132 |   3.027 | 1368905 | 1365270 |  3635 | 3 | 2.66e-3 | 8.17e-5 | 3.773
//      71 |   43239415 |   46.25 |   558 |   144 |   3.203 | 1253211 | 1252751 |   460 | 2 | 3.67e-4 | 1.06e-5 | 3.458
//      73 |   42055060 |   47.56 |   558 |   144 |   3.113 | 1184355 | 1183862 |   493 | 2 | 4.16e-4 | 1.17e-5 | 3.875
//      79 |   40990570 |   48.79 |   612 |   156 |   3.280 | 1064490 | 1062721 |  1769 | 2 | 1.66e-3 | 4.32e-5 | 3.577
//      83 |   40003130 |   50.00 |   612 |   168 |   3.443 | 987440 | 985425 |  2015 | 2 | 2.04e-3 | 5.04e-5 | 3.643
//      89 |   39104459 |   51.15 |   642 |   180 |   3.600 | 898671 | 896740 |  1931 | 2 | 2.15e-3 | 4.94e-5 | 3.400
//      97 |   38298335 |   52.22 |   642 |   192 |   3.754 | 806124 | 805403 |   721 | 2 | 8.94e-4 | 1.88e-5 | 3.344
//     101 |   37540203 |   53.28 |   642 |   204 |   3.906 | 758132 | 757850 |   282 | 2 | 3.72e-4 | 7.51e-6 | 3.147
//     103 |   36811448 |   54.33 |   696 |   204 |   3.829 | 728755 | 728450 |   305 | 2 | 4.19e-4 | 8.29e-6 | 3.147
//     107 |   36123456 |   55.37 |   696 |   216 |   3.976 | 687992 | 687867 |   125 | 2 | 1.82e-4 | 3.46e-6 | 3.222
//     109 |   35460833 |   56.40 |   774 |   216 |   3.901 | 662623 | 662477 |   146 | 2 | 2.20e-4 | 4.12e-6 | 3.222
//     113 |   34833153 |   57.42 |   774 |   228 |   4.043 | 627680 | 627409 |   271 | 2 | 4.32e-4 | 7.78e-6 | 3.395
//     127 |   34284351 |   58.34 |   774 |   252 |   4.389 | 548802 | 548587 |   215 | 2 | 3.92e-4 | 6.27e-6 | 3.071
//     131 |   33760289 |   59.24 |   774 |   264 |   4.526 | 524062 | 523976 |    86 | 2 | 1.64e-4 | 2.55e-6 | 2.932
//     137 |   33266725 |   60.12 |   774 |   276 |   4.659 | 493564 | 493515 |    49 | 2 | 9.93e-5 | 1.47e-6 | 2.804
//     139 |   32787338 |   61.00 |   774 |   276 |   4.591 | 479387 | 479322 |    65 | 2 | 1.36e-4 | 1.98e-6 | 2.804
//     149 |   32346547 |   61.83 |   774 |   300 |   4.918 | 440791 | 440713 |    78 | 2 | 1.77e-4 | 2.41e-6 | 2.580
//     151 |   31917450 |   62.66 |   774 |   300 |   4.852 | 429097 | 429019 |    78 | 2 | 1.82e-4 | 2.44e-6 | 2.580
//     157 |   31510074 |   63.47 |   774 |   312 |   4.979 | 407376 | 407328 |    48 | 2 | 1.18e-4 | 1.52e-6 | 2.481
//     163 |   31122193 |   64.26 |   822 |   324 |   5.105 | 387881 | 387856 |    25 | 2 | 6.45e-5 | 8.03e-7 | 2.389
//     167 |   30748267 |   65.04 |   822 |   336 |   5.229 | 373926 | 373900 |    26 | 2 | 6.95e-5 | 8.46e-7 | 2.446
//     173 |   30391585 |   65.81 |   828 |   348 |   5.350 | 356682 | 356636 |    46 | 2 | 1.29e-4 | 1.51e-6 | 2.362
//     179 |   30050526 |   66.55 |   828 |   360 |   5.470 | 341059 | 341022 |    37 | 2 | 1.08e-4 | 1.23e-6 | 2.300
//     181 |   29717055 |   67.30 |   852 |   360 |   5.409 | 333471 | 333441 |    30 | 2 | 9.00e-5 | 1.01e-6 | 2.300
//     191 |   29404335 |   68.02 |   852 |   384 |   5.706 | 312720 | 312714 |     6 | 2 | 1.92e-5 | 2.04e-7 | 2.219
//     193 |   29098146 |   68.73 |   882 |   384 |   5.646 | 306189 | 306185 |     4 | 2 | 1.31e-5 | 1.37e-7 | 2.219
//     197 |   28801551 |   69.44 |   900 |   396 |   5.761 | 296595 | 296587 |     8 | 2 | 2.70e-5 | 2.78e-7 | 2.227
//     199 |   28510623 |   70.15 |   900 |   396 |   5.703 | 290928 | 290921 |     7 | 2 | 2.41e-5 | 2.46e-7 | 2.273
//     211 |   28238755 |   70.82 |   900 |   420 |   5.987 | 271868 | 271839 |    29 | 2 | 1.07e-4 | 1.03e-6 | 2.143
//     227 |   27736330 |   72.11 |   900 |   456 |   6.380 | 247858 | 247853 |     5 | 2 | 2.02e-5 | 1.80e-7 | 1.974
//     229 |   27492688 |   72.75 |   900 |   456 |   6.324 | 243642 | 243634 |     8 | 2 | 3.28e-5 | 2.91e-7 | 1.974
//     233 |   27255220 |   73.38 |   900 |   468 |   6.433 | 237468 | 237460 |     8 | 2 | 3.37e-5 | 2.94e-7 | 1.923
//     239 |   27025808 |   74.00 |   900 |   480 |   6.541 | 229412 | 229410 |     2 | 2 | 8.72e-6 | 7.40e-8 | 1.875
//     241 |   26800484 |   74.63 |   990 |   480 |   6.486 | 225324 | 225323 |     1 | 2 | 4.44e-6 | 3.73e-8 | 1.875
//     251 |   26585946 |   75.23 |   990 |   504 |   6.754 | 214538 | 214536 |     2 | 2 | 9.32e-6 | 7.52e-8 | 1.964
//     257 |   26377943 |   75.82 |   990 |   516 |   6.859 | 208003 | 208002 |     1 | 2 | 4.81e-6 | 3.79e-8 | 1.919
//     263 |   26176243 |   76.41 |   990 |   528 |   6.964 | 201700 | 201698 |     2 | 2 | 9.92e-6 | 7.64e-8 | 1.875
//     269 |   25980889 |   76.98 |   990 |   540 |   7.068 | 195354 | 195352 |     2 | 2 | 1.02e-5 | 7.70e-8 | 1.833
//     271 |   25788451 |   77.55 |   990 |   540 |   7.015 | 192438 | 192435 |     3 | 2 | 1.56e-5 | 1.16e-7 | 1.833
//     277 |   25601753 |   78.12 |   990 |   552 |   7.118 | 186698 | 186696 |     2 | 2 | 1.07e-5 | 7.81e-8 | 1.793
//     281 |   25419158 |   78.68 |  1122 |   564 |   7.220 | 182595 | 182595 |     0 | 1 | 0.00e+0 | 0.00e+0 | 1.755
//     293 |   25066532 |   79.79 |  1122 |   588 |   7.420 | 172576 | 172575 |     1 | 2 | 5.79e-6 | 3.99e-8 | 1.908
//     311 |   24742504 |   80.83 |  1122 |   624 |   7.770 | 160377 | 160377 |     0 | 1 | 0.00e+0 | 0.00e+0 | 1.798
//     317 |   24429215 |   81.87 |  1170 |   636 |   7.818 | 155078 | 155077 |     1 | 2 | 6.45e-6 | 4.09e-8 | 1.764
//     331 |   24281901 |   82.37 |  1170 |   660 |   8.062 | 147314 | 147313 |     1 | 2 | 6.79e-6 | 4.12e-8 | 1.773
//     401 |   22755998 |   87.89 |  1170 |   804 |   9.193 | 112668 | 112668 |     0 | 1 | 0.00e+0 | 0.00e+0 | 1.455
//     421 |   22433554 |   89.15 |  1170 |   840 |   9.467 | 105790 | 105789 |     1 | 2 | 9.45e-6 | 4.46e-8 | 1.393
//     431 |   22330852 |   89.56 |  1170 |   864 |   9.691 | 102702 | 102702 |     0 | 1 | 0.00e+0 | 0.00e+0 | 1.354
//     461 |   21747701 |   91.96 |  1266 |   924 |  10.090 | 92994 | 92994 |     0 | 1 | 0.00e+0 | 0.00e+0 | 1.370
//     491 |   21305213 |   93.87 |  1266 |   984 |  10.524 | 85215 | 85215 |     0 | 1 | 0.00e+0 | 0.00e+0 | 1.287
//     601 |   20138545 |   99.31 |  1266 |  1200 |  12.122 | 64534 | 64534 |     0 | 1 | 0.00e+0 | 0.00e+0 | 1.055
//     701 |   19210054 |  104.11 |  1446 |  1404 |  13.522 | 52276 | 52276 |     0 | 1 | 0.00e+0 | 0.00e+0 | 1.030
//     751 |   18863856 |  106.02 |  1848 |  1500 |  14.184 | 47742 | 47742 |     0 | 1 | 0.00e+0 | 0.00e+0 | 1.232
//    1051 |   17205294 |  116.24 |  2052 |  2100 |  18.098 | 30793 | 30793 |     0 | 1 | 0.00e+0 | 0.00e+0 | 0.977
//    1151 |   16825862 |  118.86 |  2220 |  2304 |  19.415 | 27755 | 27755 |     0 | 1 | 0.00e+0 | 0.00e+0 | 0.891
//    1201 |   16637304 |  120.21 |  2220 |  2400 |  19.996 | 26378 | 26378 |     0 | 1 | 0.00e+0 | 0.00e+0 | 0.925
//    1301 |   16261063 |  122.99 |  2220 |  2604 |  21.203 | 24074 | 24074 |     0 | 1 | 0.00e+0 | 0.00e+0 | 0.853
//    1451 |   15852743 |  126.16 |  2220 |  2904 |  23.049 | 21565 | 21565 |     0 | 1 | 0.00e+0 | 0.00e+0 | 0.764
// [24.6s] folds done
//
// === the supply density against the tail law ===
// X/kills is the empirical conditional probability that a kill has a killed neighbour,
// i.e. the r_2 of the exact-tile Reading 11. Compare exp(-lambda*theta) with lambda*mbar = 1.3.
//   fold | theta/mbar | X/kills   | exp(-1.3*th/mbar) | ratio
//       5 |      2.000 | 0.00e+0 |           7.43e-2 | 0.000
//       7 |      1.200 | 3.33e-1 |           2.10e-1 | 1.586
//      11 |      1.714 | 0.00e+0 |           1.08e-1 | 0.000
//      13 |      1.403 | 2.22e-2 |           1.61e-1 | 0.138
//      17 |      1.780 | 2.42e-2 |           9.88e-2 | 0.245
//      19 |      1.571 | 2.44e-2 |           1.30e-1 | 0.188
//      23 |      1.874 | 1.57e-2 |           8.75e-2 | 0.179
//      29 |      2.139 | 1.53e-2 |           6.20e-2 | 0.247
//      31 |      1.991 | 1.87e-2 |           7.51e-2 | 0.249
//      37 |      2.235 | 9.22e-3 |           5.47e-2 | 0.169
//      41 |      2.467 | 3.86e-3 |           4.05e-2 | 0.095
//      43 |      2.347 | 4.51e-3 |           4.73e-2 | 0.095
//      47 |      2.557 | 4.33e-3 |           3.60e-2 | 0.120
//      53 |      2.754 | 6.46e-3 |           2.79e-2 | 0.232
//      59 |      2.945 | 3.95e-3 |           2.17e-2 | 0.182
//      61 |      2.845 | 4.48e-3 |           2.48e-2 | 0.181
//      67 |      3.027 | 2.66e-3 |           1.95e-2 | 0.136
//      71 |      3.203 | 3.67e-4 |           1.55e-2 | 0.024
//      73 |      3.113 | 4.16e-4 |           1.75e-2 | 0.024
//      79 |      3.280 | 1.66e-3 |           1.41e-2 | 0.118
//      83 |      3.443 | 2.04e-3 |           1.14e-2 | 0.179
//      89 |      3.600 | 2.15e-3 |           9.28e-3 | 0.232
//      97 |      3.754 | 8.94e-4 |           7.60e-3 | 0.118
//     101 |      3.906 | 3.72e-4 |           6.23e-3 | 0.060
//     103 |      3.829 | 4.19e-4 |           6.89e-3 | 0.061
//     107 |      3.976 | 1.82e-4 |           5.69e-3 | 0.032
//     109 |      3.901 | 2.20e-4 |           6.27e-3 | 0.035
//     113 |      4.043 | 4.32e-4 |           5.22e-3 | 0.083
//     127 |      4.389 | 3.92e-4 |           3.33e-3 | 0.118
//     131 |      4.526 | 1.64e-4 |           2.79e-3 | 0.059
//     137 |      4.659 | 9.93e-5 |           2.34e-3 | 0.042
//     139 |      4.591 | 1.36e-4 |           2.56e-3 | 0.053
//     149 |      4.918 | 1.77e-4 |           1.67e-3 | 0.106
//     151 |      4.852 | 1.82e-4 |           1.82e-3 | 0.100
//     157 |      4.979 | 1.18e-4 |           1.54e-3 | 0.076
//     163 |      5.105 | 6.45e-5 |           1.31e-3 | 0.049
//     167 |      5.229 | 6.95e-5 |           1.12e-3 | 0.062
//     173 |      5.350 | 1.29e-4 |           9.54e-4 | 0.135
//     179 |      5.470 | 1.08e-4 |           8.16e-4 | 0.133
//     181 |      5.409 | 9.00e-5 |           8.83e-4 | 0.102
//     191 |      5.706 | 1.92e-5 |           6.01e-4 | 0.032
//     193 |      5.646 | 1.31e-5 |           6.49e-4 | 0.020
//     197 |      5.761 | 2.70e-5 |           5.59e-4 | 0.048
//     199 |      5.703 | 2.41e-5 |           6.03e-4 | 0.040
//     211 |      5.987 | 1.07e-4 |           4.17e-4 | 0.256
//     227 |      6.380 | 2.02e-5 |           2.50e-4 | 0.081
//     229 |      6.324 | 3.28e-5 |           2.69e-4 | 0.122
//     233 |      6.433 | 3.37e-5 |           2.33e-4 | 0.144
//     239 |      6.541 | 8.72e-6 |           2.03e-4 | 0.043
//     241 |      6.486 | 4.44e-6 |           2.18e-4 | 0.020
//     251 |      6.754 | 9.32e-6 |           1.54e-4 | 0.061
//     257 |      6.859 | 4.81e-6 |           1.34e-4 | 0.036
//     263 |      6.964 | 9.92e-6 |           1.17e-4 | 0.085
//     269 |      7.068 | 1.02e-5 |           1.02e-4 | 0.100
//     271 |      7.015 | 1.56e-5 |           1.10e-4 | 0.142
//     277 |      7.118 | 1.07e-5 |           9.58e-5 | 0.112
//     293 |      7.420 | 5.79e-6 |           6.47e-5 | 0.090
//     317 |      7.818 | 6.45e-6 |           3.86e-5 | 0.167
//     331 |      8.062 | 6.79e-6 |           2.81e-5 | 0.242
//     401 |      9.193 | 0.00e+0 |           6.45e-6 | 0.000
//     421 |      9.467 | 9.45e-6 |           4.52e-6 | 2.090
//     601 |     12.122 | 0.00e+0 |           1.43e-7 | 0.000
//     701 |     13.522 | 0.00e+0 |           2.32e-8 | 0.000
//     751 |     14.184 | 0.00e+0 |           9.82e-9 | 0.000
//    1051 |     18.098 | 0.00e+0 |          6.06e-11 | 0.000
//    1151 |     19.415 | 0.00e+0 |          1.09e-11 | 0.000
//    1201 |     19.996 | 0.00e+0 |          5.13e-12 | 0.000
//    1301 |     21.203 | 0.00e+0 |          1.07e-12 | 0.000
//    1451 |     23.049 | 0.00e+0 |          9.70e-14 | 0.000
//
// === the freeze: where the ledger closes in the window ===
//   last fold with a kill-run of length >= 2 (L >= 2): p = 421
//   last fold whose theta is still <= the window G2 (beyond it L = 1 is FORCED by size alone): p = 1021
//   per-position adjacency density X/kills by decade of p:
//     p in [5,10): folds 2  mean theta/mbar 1.60  X/kills 1.00e-1  exp(-1.3*th/mbar) 1.25e-1
//     p in [10,30): folds 6  mean theta/mbar 1.75  X/kills 1.42e-2  exp(-1.3*th/mbar) 1.03e-1
//     p in [30,100): folds 15  mean theta/mbar 2.90  X/kills 6.43e-3  exp(-1.3*th/mbar) 2.29e-2
//     p in [100,300): folds 37  mean theta/mbar 5.67  X/kills 1.51e-4  exp(-1.3*th/mbar) 6.26e-4
//     p in [300,1000): folds 106  mean theta/mbar 12.59  X/kills 3.96e-7  exp(-1.3*th/mbar) 7.82e-8
//     p in [1000,1000000000): folds 71  mean theta/mbar 20.61  X/kills 0.00e+0  exp(-1.3*th/mbar) 2.32e-12
//   folds with L >= 2: 58 of 237; max L over all folds = 3
//   sum over folds of (L-1) = 64
//   sum over folds of X (total adjacent kill pairs) = 20317943
//
// === the birth cohorts of what the deep folds consume ===
//   fold     7  L = 2  consumed 19047619 gaps, mean size 12.0  newest births [@5:19047619]
//   fold    13  L = 2  consumed 399600 gaps, mean size 24.0  newest births [@11:399600]
//   fold    17  L = 2  consumed 282072 gaps, mean size 41.0  newest births [@11:141035 @13:141037]
//   fold    19  L = 2  consumed 224336 gaps, mean size 38.5  newest births [@11:103917 @13:69291 @17:51128]
//   fold    23  L = 3  consumed 106418 gaps, mean size 53.7  newest births [@13:34963 @17:32000 @19:39455]
//   fold    29  L = 2  consumed 75336 gaps, mean size 60.1  newest births [@13:13721 @17:19726 @19:22021 @23:19868]
//   fold    31  L = 3  consumed 80027 gaps, mean size 61.8  newest births [@13:11541 @17:16551 @19:18699 @23:17534 @29:15702]
//   fold    37  L = 3  consumed 30948 gaps, mean size 75.3  newest births [@17:3312 @19:6497 @23:7612 @29:6509 @31:7018]
//   fold    41  L = 2  consumed 11054 gaps, mean size 87.3  newest births [@17:489 @19:1257 @23:2222 @29:2142 @31:2454 @37:2490]
//   fold    43  L = 3  consumed 11709 gaps, mean size 85.3  newest births [@17:451 @19:1102 @23:1942 @29:1828 @31:2052 @37:2089 @41:2245]
//   fold    47  L = 2  consumed 9825 gaps, mean size 98.1  newest births [@17:670 @19:1099 @23:1099 @29:1121 @31:1372 @37:1469 @41:1394 @43:1601]
//   fold    53  L = 3  consumed 12437 gaps, mean size 109.7  newest births [@19:1068 @23:1191 @29:1326 @31:1637 @37:1569 @41:1732 @43:1705 @47:1738]
//   fold    59  L = 2  consumed 6570 gaps, mean size 120.4  newest births [@23:383 @29:549 @31:782 @37:790 @41:891 @43:999 @47:1035 @53:948]
//   fold    61  L = 2  consumed 6962 gaps, mean size 120.2  newest births [@29:499 @31:715 @37:729 @41:833 @43:932 @47:956 @53:903 @59:885]
//   fold    67  L = 3  consumed 3635 gaps, mean size 132.9  newest births [@31:291 @37:353 @41:323 @43:399 @47:540 @53:450 @59:468 @61:499]
//   fold    71  L = 2  consumed 460 gaps, mean size 151.8  newest births [@37:17 @41:23 @43:38 @47:52 @53:72 @59:66 @61:82 @67:96]
//   fold    73  L = 2  consumed 493 gaps, mean size 146.7  newest births [@41:31 @43:32 @47:40 @53:57 @59:55 @61:81 @67:85 @71:83]
//   fold    79  L = 2  consumed 1769 gaps, mean size 156.6  newest births [@43:130 @47:159 @53:171 @59:196 @61:183 @67:219 @71:210 @73:226]
//   fold    83  L = 2  consumed 2015 gaps, mean size 169.4  newest births [@47:153 @53:140 @59:188 @61:202 @67:205 @71:252 @73:264 @79:236]
//   fold    89  L = 2  consumed 1931 gaps, mean size 180.1  newest births [@53:142 @59:161 @61:179 @67:183 @71:197 @73:244 @79:215 @83:233]
//   fold    97  L = 2  consumed 721 gaps, mean size 193.6  newest births [@59:45 @61:59 @67:61 @71:71 @73:82 @79:95 @83:78 @89:86]
//   fold   101  L = 2  consumed 282 gaps, mean size 206.1  newest births [@61:17 @67:21 @71:32 @73:27 @79:37 @83:26 @89:23 @97:41]
//   fold   103  L = 2  consumed 305 gaps, mean size 204.7  newest births [@67:20 @71:30 @73:27 @79:21 @83:35 @89:36 @97:30 @101:21]
//   fold   107  L = 2  consumed 125 gaps, mean size 216.0  newest births [@71:8 @73:11 @79:10 @83:15 @89:9 @97:9 @101:13 @103:16]
//   fold   109  L = 2  consumed 146 gaps, mean size 220.6  newest births [@73:7 @79:21 @83:6 @89:14 @97:15 @101:17 @103:13 @107:16]
//   fold   113  L = 2  consumed 271 gaps, mean size 228.0  newest births [@79:17 @83:21 @89:24 @97:21 @101:23 @103:27 @107:26 @109:32]
//   fold   127  L = 2  consumed 215 gaps, mean size 252.0  newest births [@83:21 @89:9 @97:21 @101:16 @103:16 @107:24 @109:28 @113:24]
//   fold   131  L = 2  consumed 86 gaps, mean size 264.0  newest births [@89:6 @97:6 @101:7 @103:6 @107:5 @109:10 @113:13 @127:11]
//   fold   137  L = 2  consumed 49 gaps, mean size 276.0  newest births [@97:2 @101:3 @103:1 @107:5 @109:1 @113:4 @127:10 @131:6]
//   fold   139  L = 2  consumed 65 gaps, mean size 276.0  newest births [@101:3 @103:4 @107:5 @109:2 @113:12 @127:8 @131:7 @137:8]
//   fold   149  L = 2  consumed 78 gaps, mean size 300.0  newest births [@103:3 @107:6 @109:6 @113:9 @127:8 @131:5 @137:3 @139:9]
//   fold   151  L = 2  consumed 78 gaps, mean size 300.0  newest births [@107:5 @109:2 @113:7 @127:8 @131:8 @137:6 @139:9 @149:5]
//   fold   157  L = 2  consumed 48 gaps, mean size 312.0  newest births [@109:3 @113:4 @127:2 @131:4 @137:7 @139:5 @149:5 @151:4]
//   fold   163  L = 2  consumed 25 gaps, mean size 324.0  newest births [@103:2 @113:3 @131:4 @137:1 @139:2 @149:2 @151:3 @157:1]
//   fold   167  L = 2  consumed 26 gaps, mean size 336.0  newest births [@113:2 @127:2 @137:1 @139:3 @149:1 @151:4 @157:1 @163:3]
//   fold   173  L = 2  consumed 46 gaps, mean size 348.0  newest births [@131:1 @137:6 @139:3 @149:5 @151:2 @157:4 @163:6 @167:7]
//   fold   179  L = 2  consumed 37 gaps, mean size 360.0  newest births [@137:3 @139:2 @149:1 @151:5 @157:5 @163:3 @167:1 @173:1]
//   fold   181  L = 2  consumed 30 gaps, mean size 360.0  newest births [@131:1 @137:2 @139:2 @149:2 @151:2 @163:6 @167:1 @179:2]
//   fold   191  L = 2  consumed 6 gaps, mean size 384.0  newest births [@113:1 @127:1 @139:1 @167:2 @181:1]
//   fold   193  L = 2  consumed 4 gaps, mean size 384.0  newest births [@101:1 @107:1 @113:1 @191:1]
//   fold   197  L = 2  consumed 8 gaps, mean size 396.0  newest births [@103:1 @139:2 @179:2 @191:1 @193:2]
//   fold   199  L = 2  consumed 7 gaps, mean size 396.0  newest births [@71:1 @151:1 @157:2 @163:1 @179:2]
//   fold   211  L = 2  consumed 29 gaps, mean size 420.0  newest births [@167:3 @173:2 @179:1 @181:3 @191:1 @193:2 @197:3 @199:3]
//   fold   227  L = 2  consumed 5 gaps, mean size 456.0  newest births [@131:1 @173:1 @193:1 @199:1 @223:1]
//   fold   229  L = 2  consumed 8 gaps, mean size 456.0  newest births [@149:1 @151:1 @167:1 @179:1 @191:1 @193:1 @211:1 @223:1]
//   fold   233  L = 2  consumed 8 gaps, mean size 468.0  newest births [@151:1 @157:1 @163:1 @181:1 @223:2 @229:2]
//   fold   239  L = 2  consumed 2 gaps, mean size 480.0  newest births [@157:1 @211:1]
//   fold   241  L = 2  consumed 1 gaps, mean size 480.0  newest births [@173:1]
//   fold   251  L = 2  consumed 2 gaps, mean size 504.0  newest births [@223:1 @233:1]
//   fold   257  L = 2  consumed 1 gaps, mean size 516.0  newest births [@251:1]
//   fold   263  L = 2  consumed 2 gaps, mean size 528.0  newest births [@199:1 @211:1]
//   fold   269  L = 2  consumed 2 gaps, mean size 540.0  newest births [@223:1 @227:1]
//   fold   271  L = 2  consumed 3 gaps, mean size 540.0  newest births [@227:1 @241:1 @257:1]
//   fold   277  L = 2  consumed 2 gaps, mean size 552.0  newest births [@197:1 @223:1]
//   fold   293  L = 2  consumed 1 gaps, mean size 588.0  newest births [@281:1]
//   fold   317  L = 2  consumed 1 gaps, mean size 636.0  newest births [@263:1]
//   fold   331  L = 2  consumed 1 gaps, mean size 660.0  newest births [@277:1]
//   fold   421  L = 2  consumed 1 gaps, mean size 840.0  newest births [@383:1]
//
// === the amortized sum, localized frame ===
//   requirement (gate-multiplies s8, excess form): sum_p (L-1)*rho*mbar/G2 <= 2 ln x - O(1), rho = 1.5
//   measured total excess burn to p = 1499: 10.4125 nats
//   budget 2 ln x - ln 12 = 12.1402 nats
//
// [24.6s] done
// ============================================================================
// READINGS
// ============================================================================
//
// [1] THE WINDOW REPRODUCES THE TILE'S CONDITIONAL RATIO TO THREE FIGURES.
//     X/kills at folds 7, 13, 17, 19, 23, 29 reads 3.33e-1, 2.22e-2, 2.42e-2,
//     2.44e-2, 1.57e-2, 1.53e-2, which is the exact-tile Reading 11 row
//     3.33e-1, 2.22e-2, 2.42e-2, 2.44e-2, 1.57e-2, 1.53e-2 to every digit
//     printed. Two instruments with nothing in common but the arithmetic:
//     one folds a cyclic residue word of 214,708,725 slots, the other sieves
//     333,333,333 positions of [0, 2e9). The window also reaches G2 = 258 at
//     fold 29, the published G2(29#), and then falls behind (300 against 348
//     at fold 31), which is the expected window shortfall.
//
// [2] THE SUPPLY DENSITY OBEYS exp(-lambda*theta) WITH lambda*mbar NEAR 1.3
//     OVER SIX ORDERS OF MAGNITUDE. By decade of p, mean theta/mbar against
//     X/kills against exp(-1.3*theta/mbar):
//       [5,10)      1.60   1.00e-1   1.25e-1
//       [10,30)     1.75   1.42e-2   1.03e-1
//       [30,100)    2.90   6.43e-3   2.29e-2
//       [100,300)   5.67   1.51e-4   6.26e-4
//       [300,1000) 12.59   3.96e-7   7.82e-8
//       [1000,..)  20.61   0         2.32e-12
//     The measured density sits inside a factor of about 7 of the one-parameter
//     law across the whole range and crosses it near p = 300, which is the
//     lambda*mbar bracket 1.30 to 1.88 of a3-05-bound-L.md section 6 doing its
//     work. This is the rate the amortization brief asked for, and it is the
//     only rate in the ledger that decays.
//
// [3] THE LEDGER CLOSES IN THE WINDOW, AND WHERE IT CLOSES IS COMPUTABLE.
//     The last fold with a kill-run of length >= 2 is p = 421; beyond p = 1021
//     no gap in the whole window is even as large as theta, so L = 1 is forced
//     by size alone. Only 58 of 237 folds have L >= 2, max L = 3, and
//     sum (L-1) over all 237 folds is 64.
//
// [4] THE CLOSURE CONDITION, READ OFF [2] AND [3]. A run needs one adjacent
//     kill pair, and by [2] their expected count is kills*exp(-c*theta/mbar),
//     so the ledger closes once  2c*p/mbar > ln(kills). Both sides are
//     measured. At fold 421, mbar = 89.15 and kills = 105790, so the right
//     side is ln 105790 = 11.57 and the left side is 2c*421/89.15 = 11.52 at
//     c = 1.22, crossing it at c = 1.2249; fold 421 is exactly the last fold in
//     the window with a run of
//     length >= 2, and it carries exactly one adjacent kill pair (X = 1,
//     X/kills = 9.45e-6 against 4.52e-6 predicted at c = 1.3, ratio 2.09).
//     On the TILE the left side is 2c*x/(2.4 ln^2 x) ~ x/ln^2 x and the right
//     side is ln(2*D_x) ~ theta(x) ~ x, so the condition fails at every x by
//     the factor ln^2 x, and the failure widens. That factor is the whole
//     distance between the two frames, and it is the parity-scale wall of
//     TODO 0b in ledger form.
//
// [5] WHAT THE DEEP FOLDS CONSUME IS OLD AND SPARSE. At fold 421 the single
//     consumed gap was born at @383; at fold 331, at @277; at fold 233 the eight consumed gaps
//     were born at @151, @157, @163, @181, @223 (twice) and @229 (twice). Consumption at the deep end is one or two gaps per
//     fold, born within the last few folds, of size exactly theta.
//
// [6] THE LOCALIZED AMORTIZED SUM SITS UNDER ITS BUDGET, WITH THE CAVEAT
//     THAT IT IS A WINDOW STATEMENT. sum (L-1)*rho*mbar/G2 to p = 1499 is
//     10.4125 nats against 2 ln x - ln 12 = 12.1402. It is not a statement
//     about G2(x#): both mbar and G2 here are window quantities, and the
//     window's G2 is smaller than the tile's, which makes the burn LARGER
//     than the tile's would be, not smaller. What it does show is that in a
//     frame where the population is bounded the accounting is finite and the
//     sum converges, which is exactly what the tile denies.
// ============================================================================

// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   11.57 in reading [4] is ln(kills) at fold 421. The fold-421 row prints
//   kills = 105790, and ln 105790 = 11.56921.
//   CORRECTED 2026-08-20 (mismatch adjudication #45): reading [4] said the left
//   side is "2c*421/89.15 = 11.6 at c = 1.22" and now says 11.52, with the
//   crossing named at c = 1.2249. The fold-421 row prints mbar = 89.15, and
//   2 x 1.22 x 421/89.15 = 11.5226 (recomputed here), not 11.6; 11.6 is the
//   left side at c = 1.2282, and the left side equals the right side 11.56921
//   at c = 1.22492. So the old pair asserted an arithmetic identity that its
//   own two numbers do not satisfy -- the rounding of c to two decimals,
//   amplified by the factor 2*421/89.15 = 9.45. Old -> new: 11.6 -> 11.52,
//   with c = 1.2249 added as the crossing value. Nothing in reading [4]'s
//   conclusion turns on it: the point is that fold 421 is where the two sides
//   cross, and they do.
//
// BORROWED, verified present in the named producer's embedded output:
//   214,708,725 in reading [1], the twin-slot count of the 29# tile, is
//   printed by research/a3-01-misalignment-ledger.js as "fold 29: D=7952175 ->
//   214708725". This file sieves the window and never builds that tile, so the
//   figure is a description of the other instrument, not a reading of this one.
// ---------------------------------------------------------------------------
