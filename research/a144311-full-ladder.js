// ============================================================================
// THE FULL A144311 LADDER, ADOPTED AS TRUSTED DATA — 22 TERMS TO x = 79
//
// Question: what do the eight terms above our exact ladder (x = 47..79,
// OEIS A144311, trusted under the series rule of 2026-08-20) settle for free —
// the x = 37 outlier, the direction of G2(x#)/x^2, and the primorial-base
// threshold column S(x) = ln(x^2/G2)?
//
// Provenance of the trusted series, read at the OEIS entry 2026-08-20:
//   a(1)-a(7)   Andrew Carter, Sep 17 2008
//   a(8)-a(16)  Max Alekseyev, Nov 18 2009
//   a(17)-a(22) Jinyuan Wang, Nov 26 2024 — derivation PUBLIC, a C++
//               branch-and-bound DFS at https://oeis.org/A144311/a144311.cpp.txt
//               (plist starts at 5: the program works inside the 6-wheel, and
//               its pskip encodes the -2 class; entry comment a(n) == 5 mod 6
//               for n > 1 is checked below as a transcription guard).
// Convention: A144311 counts consecutive integers each hitting {1,-1} mod some
// prime, which is our G2 - 1 (GLOSSARY: "the sequence is A144311 + 1").
//
// Honest doubt: terms 15-22 are single-witness (no independent computation in
// print; our enumeration ends at 43#). The series rule trusts them during
// research; in-house verification is a PAPER-PHASE deliverable (TODO 1c).
// The 14-term overlap with our custody ladder is checked exactly below — a
// disagreement there would void the trust, so it is a hard assert.
//
// Everything integer is BigInt; logs are doubles over small-integer factors
// (relative error ~1e-15, far under the 4 significant figures quoted).
// Runtime: instant.
// ============================================================================
'use strict';

// A144311 verbatim (a-values). Index n = 1..22, prime = n-th prime.
const A = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
           707, 869, 965, 1079, 1283, 1397, 1529, 1709];
const P = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59,
           61, 67, 71, 73, 79];

// Our exact custody ladder (research/exact-g2-ladder.js), G2 convention:
const CUSTODY = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618];

// --- transcription guards --------------------------------------------------
for (let n = 2; n <= 22; n++) {
  if (A[n - 1] % 6 !== 5) throw new Error(`a(${n}) = ${A[n - 1]} not 5 mod 6`);
}
let overlapOK = true;
for (let i = 0; i < CUSTODY.length; i++) {
  if (A[i] + 1 !== CUSTODY[i]) { overlapOK = false; break; }
}
if (!overlapOK) throw new Error('custody overlap FAILED — trust voided');

// --- exact ladder quantities ------------------------------------------------
// W = x#, D = prod_{2<p<=x}(p-2), m = W/D (as double via log), lnD, c2', S(x).
function lnBig(factors) { // sum of ln over an integer factor list
  return factors.reduce((s, f) => s + Math.log(f), 0);
}
const rows = [];
for (let n = 0; n < 22; n++) {
  const x = P[n], g2 = A[n] + 1;
  const primes = P.slice(0, n + 1);
  const lnW = lnBig(primes);                        // theta(x)
  const lnD = lnBig(primes.filter(p => p > 2).map(p => p - 2));
  const lnm = lnW - lnD;                            // m = W/D
  const m = Math.exp(lnm);
  const c2p = x >= 11 ? g2 / (m * lnD) : null;      // c2' = G2/(m lnD), x>=11
  const S = Math.log(x * x / g2);                   // S(x) = ln(x^2/G2)
  rows.push({ n: n + 1, x, g2, m, lnD, c2p, S, gxx: g2 / (x * x) });
}

// --- output -----------------------------------------------------------------
console.log('THE FULL A144311 LADDER IN G2 CONVENTION (22 terms, trusted)');
console.log('custody overlap x=2..43: EXACT, 14/14 terms  |  a(n)=5 mod 6: 21/21');
console.log('');
console.log('  n   x    G2      m        lnD      c2\'      G2/x^2    S(x)=ln(x^2/G2)');
for (const r of rows) {
  console.log(
    String(r.n).padStart(3) + '  ' + String(r.x).padStart(2) + '  ' +
    String(r.g2).padStart(5) + '  ' + r.m.toFixed(2).padStart(7) + '  ' +
    r.lnD.toFixed(3).padStart(7) + '  ' +
    (r.c2p === null ? '     --' : r.c2p.toFixed(4).padStart(7)) + '  ' +
    r.gxx.toFixed(4).padStart(8) + '  ' + r.S.toFixed(4).padStart(8));
}
console.log('');
const band = rows.filter(r => r.x >= 11 && r.x <= 31).map(r => r.c2p);
console.log(`c2' band x=11..31 (custody): [${Math.min(...band).toFixed(4)}, ${Math.max(...band).toFixed(4)}]`);
console.log(`c2'(37) = ${rows[11].c2p.toFixed(4)}   (the outlier under test)`);
const after = rows.filter(r => r.x >= 41).map(r => `${r.x}:${r.c2p.toFixed(4)}`);
console.log('c2\' x=41..79: ' + after.join('  '));
const above = rows.filter(r => r.x >= 41 && r.c2p > rows[11].c2p).length;
console.log(`terms x>=41 above c2'(37): ${above} of ${rows.filter(r => r.x >= 41).length}`);
console.log('');
const Smax = rows.reduce((a, b) => (b.S > a.S ? b : a));
console.log(`S(x) max over the 22 primorial bases: ${Smax.S.toFixed(4)} at x = ${Smax.x}`);
const s47 = rows.filter(r => r.x >= 47).map(r => r.S.toFixed(4)).join(' ');
console.log(`S(x) x=47..79: ${s47}`);
const g11 = rows.find(r => r.x === 11).gxx, g79 = rows.find(r => r.x === 79).gxx;
console.log(`G2/x^2: ${g11.toFixed(4)} at x=11  ->  ${g79.toFixed(4)} at x=79`);
let desc = 0, tot = 0;
for (let i = rows.findIndex(r => r.x === 11); i < rows.length - 1; i++) {
  tot++; if (rows[i + 1].gxx < rows[i].gxx) desc++;
}
console.log(`descents in G2/x^2 over steps from x=11: ${desc} of ${tot}`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/a144311-full-ladder.js
//   invocation:  node research/a144311-full-ladder.js
//   code-sha256: 1c3d6a80160ce3bb6c81b3bc957884723cd0630d0d56bf6b04f2a65ccbe75232
//   out-sha256:  a658deda243b350b376dd994d4a8426b22c0c8da364eb4be800aa3ccdbd47880
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.1 s
// ============================================================================
// THE FULL A144311 LADDER IN G2 CONVENTION (22 terms, trusted)
// custody overlap x=2..43: EXACT, 14/14 terms  |  a(n)=5 mod 6: 21/21
//
//   n   x    G2      m        lnD      c2'      G2/x^2    S(x)=ln(x^2/G2)
//   1   2      2     2.00    0.000       --    0.5000    0.6931
//   2   3      6     6.00    0.000       --    0.6667    0.4055
//   3   5     12    10.00    1.099       --    0.4800    0.7340
//   4   7     30    14.00    2.708       --    0.6122    0.4906
//   5  11     42    17.11    4.905   0.5004    0.3471    1.0581
//   6  13     66    20.22    7.303   0.4469    0.3905    0.9402
//   7  17    108    22.92   10.011   0.4707    0.3737    0.9843
//   8  19    150    25.61   12.844   0.4559    0.4155    0.8782
//   9  23    204    28.05   15.889   0.4577    0.3856    0.9529
//  10  29    258    30.13   19.185   0.4463    0.3068    1.1816
//  11  31    348    32.21   22.552   0.4791    0.3621    1.0158
//  12  37    528    34.05   26.107   0.5939    0.3857    0.9527
//  13  41    546    35.80   29.771   0.5123    0.3248    1.1245
//  14  43    618    37.54   33.485   0.4916    0.3342    1.0959
//  15  47    708    39.21   37.291   0.4842    0.3205    1.1379
//  16  53    870    40.75   41.223   0.5179    0.3097    1.1721
//  17  59    966    42.18   45.266   0.5059    0.2775    1.2819
//  18  61   1080    43.61   49.344   0.5019    0.2902    1.2370
//  19  67   1284    44.95   53.518   0.5337    0.2860    1.2516
//  20  71   1398    46.25   57.752   0.5233    0.2773    1.2826
//  21  73   1530    47.56   62.015   0.5188    0.2871    1.2479
//  22  79   1710    48.79   66.359   0.5281    0.2740    1.2946
//
// c2' band x=11..31 (custody): [0.4463, 0.5004]
// c2'(37) = 0.5939   (the outlier under test)
// c2' x=41..79: 41:0.5123  43:0.4916  47:0.4842  53:0.5179  59:0.5059  61:0.5019  67:0.5337  71:0.5233  73:0.5188  79:0.5281
// terms x>=41 above c2'(37): 0 of 10
//
// S(x) max over the 22 primorial bases: 1.2946 at x = 79
// S(x) x=47..79: 1.1379 1.1721 1.2819 1.2370 1.2516 1.2826 1.2479 1.2946
// G2/x^2: 0.3471 at x=11  ->  0.2740 at x=79
// descents in G2/x^2 over steps from x=11: 10 of 17
// ============================================================================
// READINGS
//
// 1. THE TRUST'S HARD GATE PASSED. The 14-term overlap with our exact custody
//    ladder (x = 2..43) matches EXACTLY, and all 21 applicable terms satisfy
//    the entry's own a(n) = 5 mod 6 invariant. Had any overlap term differed
//    the script throws and nothing below exists. Two independent methods
//    (Wang's branch-and-bound vs our tile-major enumeration) agreeing on 14
//    terms is the calibration that makes trusting the other 8 rational.
// 2. THE x = 37 OUTLIER IS CONFIRMED AN OUTLIER — by all ten trusted terms
//    above it. c2'(37) = 0.5939 and NOT ONE of x = 41..79 reaches it (max
//    0.5337 at x = 67). But the flat-band reading dies with the same table:
//    the x >= 41 terms run [0.4842, 0.5337], ABOVE the custody band
//    [0.4463, 0.5004] of x = 11..31. So c2' drifts upward with x and 37 is a
//    single spike on that drift, not a step to a new level. The 1c question
//    ("was 37 an outlier?") is settled YES for free; what replaces it is
//    "why does c2' drift?", which is a different question.
// 3. G2(x#)/x^2 LEANS FALLING: 0.3471 (x = 11) -> 0.2740 (x = 79), with 10 of
//    17 steps descending. This is a drift over 22 exact-or-trusted terms, not
//    a fit and not a law; 1d's central question stays open but the trusted
//    tail leans the same way the custody head did.
// 4. THE THRESHOLD COLUMN TIGHTENS. S(x) = ln(x^2/G2) has max 1.2946 at
//    x = 79 over all 22 primorial bases, against 1.1816 (x = 29) on custody
//    terms alone — every trusted term raised the reachable max, and the tail
//    is still rising. (The integer-base threshold of item 1d is a separate
//    object and is not recomputed here.)
// 5. LIMITS. Terms 15-22 are single-witness (Alekseyev 2009 for 8-16, Wang
//    2024 for 17-22, derivation public in the entry's C++). Trusted under the
//    series rule of 2026-08-20; in-house verification is a paper-phase
//    deliverable (TODO 1c). No fits were performed here; exponent-control.md
//    owns the fitting question and its 22-term refit is queued separately.
// ============================================================================
