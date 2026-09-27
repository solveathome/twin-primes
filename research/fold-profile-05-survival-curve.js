// ============================================================================
// FOLD PROFILE 05 — THE SURVIVAL CURVE INSIDE A FIXED TILE WINDOW
// ============================================================================
// Chris's question, 2026-08-17: fix the N-tile window. Now fold in EVERY
// subsequent prime, one after another. Can we say how many twin slots survive
// inside the ORIGINAL window?
//
// Take the window to be [0, W) with W = 23# = 223,092,870, which is a full
// period of T23 and therefore starts with exactly D = 7,952,175 slots, no error
// term at all. Then sieve in 29, 31, 37, ... and count what is left after each.
//
// The window is small enough that this can be run to the END. Folding in every
// prime up to sqrt(W) = 14,937 leaves exactly the twin primes above sqrt(W),
// so the whole curve from u = 6.13 down to u = 2.00 is computable exactly, with
// no theory anywhere. u = ln W / ln y is the sifting parameter: the survivors
// are pairs whose members have no prime factor below W^(1/u).
//
// The landmarks the curve has to pass:
//   u = 6.13  the tile itself, y = 23, S = D exactly
//   u = 4.266 beta_2, the Diamond-Halberstam-Richert threshold: above this the
//             two-dimensional sieve has a PROVEN positive lower bound
//   u = 2     y = sqrt(W): the survivors ARE the twin primes. Positivity here
//             is the twin prime conjecture.
//
//   S1  the fold-by-fold ledger for the first folds: survivors, actual
//       multiplier, and the predicted (1 - 2/p)
//   S2  the full curve to y = sqrt(W), with the product law and its ratio
//   S3  the three provable regimes marked on the curve, and where each dies
//
// Method: one Uint8Array roughness map over [0, W+2], updated incrementally.
// Killing n costs a decrement for the pair on each side, so the whole run is
// sum_p W/p operations, not (number of primes) * W.
//
// Run:  node --max-old-space-size=6000 fold-profile-05-survival-curve.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

const TILEP = 23;
const TILEPRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23];
const W = TILEPRIMES.reduce((a, b) => a * b, 1);          // 223092870
const D_EXPECT = TILEPRIMES.filter((q) => q > 2).reduce((a, q) => a * (q - 2), 1); // 7952175
const LIMIT = W + 2;

function primesTo(n) {
  const c = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!c[i]) { out.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } }
  return out;
}
const ROOT = Math.floor(Math.sqrt(LIMIT)) + 1;
const SIEVEP = primesTo(ROOT + 10);

console.log('='.repeat(100));
console.log('FOLD PROFILE 05 — survival inside a fixed tile window as every later prime is folded in');
console.log('='.repeat(100));
console.log(`   window = [0, W) with W = ${TILEP}# = ${W.toLocaleString()}`);
console.log(`   sqrt(W) = ${Math.sqrt(W).toFixed(1)},  ln W = ${Math.log(W).toFixed(4)}`);
console.log('');

// --- roughness map, built at level 23 ---------------------------------------
log('building the T23 roughness map over [0, W+2] ...');
const rough = new Uint8Array(LIMIT + 1).fill(1);
rough[0] = 0;
for (const q of TILEPRIMES) for (let m = q; m <= LIMIT; m += q) rough[m] = 0;
// 1 is rough (no prime factors) and stays so.

let alive = 0;
for (let n = 0; n < W; n++) if (rough[n] && rough[n + 2]) alive++;
console.log(`   CUSTODY: slots in [0,W) at level 23 = ${alive.toLocaleString()}   expected D = ${D_EXPECT.toLocaleString()}   ` +
  (alive === D_EXPECT ? 'MATCH' : '*** MISMATCH ***'));
if (alive !== D_EXPECT) throw new Error('custody failed');

// --- the product law ---------------------------------------------------------
// P(y) = W * (1/2) * prod_{3<=q<=y} (1 - 2/q)
let prod = 0.5;
for (const q of TILEPRIMES) if (q > 2) prod *= (1 - 2 / q);
const P_at = (p) => W * prod;   // updated as we go

console.log('');
console.log('S1. THE FOLD-BY-FOLD LEDGER — the first twenty folds after the tile');
console.log('-'.repeat(100));
console.log('   fold p |      survivors |   removed |  actual multiplier |  1 - 2/p  |  ratio  |   S / product law');

const curve = [];
const FOLDS = SIEVEP.filter((q) => q > TILEP);
let shown = 0;
const CHECK = new Set([29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109,
  127, 151, 199, 251, 307, 401, 503, 601, 701, 809, 907, 1009, 1201, 1499, 2003, 2503, 3001,
  4001, 5003, 6007, 7001, 8009, 9001, 10007, 11003, 12007, 13001, 14009, 14929]);

for (const p of FOLDS) {
  const before = alive;
  // kill multiples of p that are still rough, updating the pair count as we go
  for (let m = p; m <= LIMIT; m += p) {
    if (!rough[m]) continue;
    rough[m] = 0;
    if (m >= 2 && m - 2 < W && rough[m - 2]) alive--;      // pair (m-2, m)
    if (m < W && rough[m + 2]) alive--;                    // pair (m, m+2)
  }
  prod *= (1 - 2 / p);
  const Pnow = W * prod;
  const u = Math.log(W) / Math.log(p);
  curve.push({ p, alive, before, u, P: Pnow, ratio: alive / Pnow });
  if (shown < 20) {
    console.log(
      ` ${String(p).padStart(8)} | ${alive.toLocaleString().padStart(14)} | ${(before - alive).toLocaleString().padStart(9)} | ` +
      `${(alive / before).toFixed(8).padStart(18)} | ${(1 - 2 / p).toFixed(6).padStart(9)} | ` +
      `${((alive / before) / (1 - 2 / p)).toFixed(5).padStart(7)} | ${(alive / Pnow).toFixed(6).padStart(17)}`);
    shown++;
  }
}
log('sieve complete');

console.log('');
console.log('S2. THE FULL CURVE — every prime folded in, down to y = sqrt(W)');
console.log('-'.repeat(100));
console.log('   The product law is P(y) = W * (1/2) * prod_{3<=q<=y}(1-2/q). The ratio S/P is what');
console.log('   sieve theory has to supply, and it is the pair-Buchstab factor.');
console.log('');
console.log('       y |     u = lnW/lny |       survivors S |        product P |    S/P | 3^pi(y) vs S  | regime');
const REG = (u) => u >= 4.26645 ? 'DHR lower bound PROVEN' : (u > 2 ? 'OPEN BAND' : 'u = 2: this IS TPC');
for (const c of curve) {
  if (!CHECK.has(c.p)) continue;
  const pic = SIEVEP.filter((q) => q <= c.p).length;
  const leg = Math.pow(3, pic);
  console.log(
    ` ${String(c.p).padStart(7)} | ${c.u.toFixed(4).padStart(15)} | ${c.alive.toLocaleString().padStart(17)} | ` +
    `${c.P.toFixed(0).padStart(16)} | ${c.ratio.toFixed(4).padStart(6)} | ` +
    `${(leg < c.alive ? 'usable ' : 'DEAD   ') + leg.toExponential(1).padStart(8)} | ${REG(c.u)}`);
}

const last = curve[curve.length - 1];
console.log('');
console.log(`   end of sieve: y = ${last.p}, u = ${last.u.toFixed(4)}, survivors = ${last.alive.toLocaleString()}`);
console.log('   at this point the survivors are exactly the n < W with n and n+2 both prime and both > y.');

// custody: count twin primes above ROOT directly
{
  let tw = 0;
  for (let n = 0; n < W; n++) if (rough[n] && rough[n + 2]) tw++;
  const hl = 1.3203236316 * W / (Math.log(W) * Math.log(W));
  console.log(`   CUSTODY: direct recount = ${tw.toLocaleString()}   (matches running count: ${tw === last.alive ? 'YES' : 'NO'})`);
  console.log(`   Hardy-Littlewood 2*C2*W/ln^2 W = ${hl.toFixed(0)},  ratio S/HL = ${(last.alive / hl).toFixed(4)}`);
}

// ---------------------------------------------------------------------------
console.log('');
console.log('S3. WHERE EACH PROVABLE REGIME DIES');
console.log('-'.repeat(100));
// Legendre: error majorant 3^pi(y) against the main term
let legDead = null, dhrDead = null;
for (const c of curve) {
  const pic = SIEVEP.filter((q) => q <= c.p).length;
  if (legDead === null && Math.pow(3, pic) >= c.P) legDead = c;
  if (dhrDead === null && c.u < 4.26645) dhrDead = c;
}
console.log(`   1. LEGENDRE / the Level Ledger iterated. Error majorant 3^pi(y) exceeds the main term`);
console.log(`      first at y = ${legDead.p} (u = ${legDead.u.toFixed(3)}), where P = ${legDead.P.toFixed(0)} and 3^pi(y) = ` +
  `${Math.pow(3, SIEVEP.filter((q) => q <= legDead.p).length).toExponential(2)}.`);
console.log(`      Survivors known exactly to relative precision up to there: S = ${legDead.before.toLocaleString()} region.`);
console.log('');
console.log(`   2. FUNDAMENTAL LEMMA (dimension 2). Relative error e^{-u ln u}, valid at any FIXED u,`);
console.log(`      so it reaches y = W^(1/u) for every u. It covers the whole table above with an`);
console.log(`      error that only becomes O(1) as u approaches a constant of order 1.`);
console.log('');
console.log(`   3. DHR TWO-DIMENSIONAL LOWER BOUND. Positive survivors PROVEN for u > beta_2 = 4.26645,`);
console.log(`      i.e. y < W^(1/4.26645) = ${Math.pow(W, 1 / 4.26645).toFixed(0)}. The last fold still inside the`);
console.log(`      proven region is p = ${dhrDead ? curve[curve.indexOf(dhrDead) - 1].p : '?'}, leaving ` +
  `${dhrDead ? curve[curve.indexOf(dhrDead) - 1].alive.toLocaleString() : '?'} survivors.`);
console.log(`      Below that, no lower bound is known, all the way down to u = 2 where the`);
console.log(`      question is the twin prime conjecture.`);
console.log('');
console.log(`   4. UPPER BOUNDS are free at EVERY level (Brun/Selberg): S(y) << W/ln^2 y throughout.`);
console.log(`      The asymmetry is the whole story. Chris's question is a LOWER bound question.`);

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-profile-05-survival-curve.js
//   invocation:  node research/fold-profile-05-survival-curve.js
//   code-sha256: 8bd03125db2bde2bae0714cca9b4a03f48357f8e677210e92e132693614604fb
//   out-sha256:  6721570eb16be1c3eb95d1b26f4a32fd1dfe1514cb7323066a6f45e669f5dc84
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     2.2 s
// ============================================================================
// ====================================================================================================
// FOLD PROFILE 05 — survival inside a fixed tile window as every later prime is folded in
// ====================================================================================================
//    window = [0, W) with W = 23# = 223,092,870
//    sqrt(W) = 14936.3,  ln W = 19.2231
//
//    CUSTODY: slots in [0,W) at level 23 = 7,952,175   expected D = 7,952,175   MATCH
//
// S1. THE FOLD-BY-FOLD LEDGER — the first twenty folds after the tile
// ----------------------------------------------------------------------------------------------------
//    fold p |      survivors |   removed |  actual multiplier |  1 - 2/p  |  ratio  |   S / product law
//        29 |      7,403,764 |   548,411 |         0.93103635 |  0.931034 | 1.00000 |          1.000002
//        31 |      6,926,117 |   477,647 |         0.93548592 |  0.935484 | 1.00000 |          1.000004
//        37 |      6,551,741 |   374,376 |         0.94594720 |  0.945946 | 1.00000 |          1.000006
//        41 |      6,232,139 |   319,602 |         0.95121877 |  0.951220 | 1.00000 |          1.000005
//        43 |      5,942,314 |   289,825 |         0.95349510 |  0.953488 | 1.00001 |          1.000012
//        47 |      5,689,532 |   252,782 |         0.95746068 |  0.957447 | 1.00001 |          1.000026
//        53 |      5,474,897 |   214,635 |         0.96227546 |  0.962264 | 1.00001 |          1.000038
//        59 |      5,289,316 |   185,581 |         0.96610329 |  0.966102 | 1.00000 |          1.000040
//        61 |      5,115,886 |   173,430 |         0.96721126 |  0.967213 | 1.00000 |          1.000038
//        67 |      4,963,197 |   152,689 |         0.97015395 |  0.970149 | 1.00000 |          1.000043
//        71 |      4,823,360 |   139,837 |         0.97182522 |  0.971831 | 0.99999 |          1.000037
//        73 |      4,691,183 |   132,177 |         0.97259649 |  0.972603 | 0.99999 |          1.000030
//        79 |      4,572,343 |   118,840 |         0.97466737 |  0.974684 | 0.99998 |          1.000014
//        83 |      4,462,088 |   110,255 |         0.97588654 |  0.975904 | 0.99998 |          0.999996
//        89 |      4,361,681 |   100,407 |         0.97749775 |  0.977528 | 0.99997 |          0.999965
//        97 |      4,271,469 |    90,212 |         0.97931715 |  0.979381 | 0.99993 |          0.999899
//       101 |      4,186,645 |    84,824 |         0.98014173 |  0.980198 | 0.99994 |          0.999842
//       103 |      4,105,003 |    81,642 |         0.98049942 |  0.980583 | 0.99992 |          0.999757
//       107 |      4,028,025 |    76,978 |         0.98124776 |  0.981308 | 0.99994 |          0.999696
//       109 |      3,953,878 |    74,147 |         0.98159222 |  0.981651 | 0.99994 |          0.999635
//
// S2. THE FULL CURVE — every prime folded in, down to y = sqrt(W)
// ----------------------------------------------------------------------------------------------------
//    The product law is P(y) = W * (1/2) * prod_{3<=q<=y}(1-2/q). The ratio S/P is what
//    sieve theory has to supply, and it is the pair-Buchstab factor.
//
//        y |     u = lnW/lny |       survivors S |        product P |    S/P | 3^pi(y) vs S  | regime
//       29 |          5.7088 |         7,403,764 |          7403749 | 1.0000 | usable   5.9e+4 | DHR lower bound PROVEN
//       31 |          5.5979 |         6,926,117 |          6926088 | 1.0000 | usable   1.8e+5 | DHR lower bound PROVEN
//       37 |          5.3236 |         6,551,741 |          6551705 | 1.0000 | usable   5.3e+5 | DHR lower bound PROVEN
//       41 |          5.1764 |         6,232,139 |          6232109 | 1.0000 | usable   1.6e+6 | DHR lower bound PROVEN
//       43 |          5.1109 |         5,942,314 |          5942244 | 1.0000 | usable   4.8e+6 | DHR lower bound PROVEN
//       47 |          4.9928 |         5,689,532 |          5689382 | 1.0000 | DEAD     1.4e+7 | DHR lower bound PROVEN
//       53 |          4.8417 |         5,474,897 |          5474689 | 1.0000 | DEAD     4.3e+7 | DHR lower bound PROVEN
//       59 |          4.7144 |         5,289,316 |          5289106 | 1.0000 | DEAD     1.3e+8 | DHR lower bound PROVEN
//       61 |          4.6762 |         5,115,886 |          5115693 | 1.0000 | DEAD     3.9e+8 | DHR lower bound PROVEN
//       67 |          4.5718 |         4,963,197 |          4962986 | 1.0000 | DEAD     1.2e+9 | DHR lower bound PROVEN
//       71 |          4.5096 |         4,823,360 |          4823183 | 1.0000 | DEAD     3.5e+9 | DHR lower bound PROVEN
//       73 |          4.4804 |         4,691,183 |          4691041 | 1.0000 | DEAD    1.0e+10 | DHR lower bound PROVEN
//       79 |          4.3994 |         4,572,343 |          4572281 | 1.0000 | DEAD    3.1e+10 | DHR lower bound PROVEN
//       83 |          4.3503 |         4,462,088 |          4462105 | 1.0000 | DEAD    9.4e+10 | DHR lower bound PROVEN
//       89 |          4.2826 |         4,361,681 |          4361833 | 1.0000 | DEAD    2.8e+11 | DHR lower bound PROVEN
//       97 |          4.2020 |         4,271,469 |          4271898 | 0.9999 | DEAD    8.5e+11 | OPEN BAND
//      101 |          4.1652 |         4,186,645 |          4187306 | 0.9998 | DEAD    2.5e+12 | OPEN BAND
//      103 |          4.1476 |         4,105,003 |          4105999 | 0.9998 | DEAD    7.6e+12 | OPEN BAND
//      107 |          4.1138 |         4,028,025 |          4029252 | 0.9997 | DEAD    2.3e+13 | OPEN BAND
//      109 |          4.0976 |         3,953,878 |          3955321 | 0.9996 | DEAD    6.9e+13 | OPEN BAND
//      127 |          3.9683 |         3,822,152 |          3824129 | 0.9995 | DEAD    6.2e+14 | OPEN BAND
//      151 |          3.8314 |         3,557,761 |          3560494 | 0.9992 | DEAD    1.5e+17 | OPEN BAND
//      199 |          3.6316 |         3,180,270 |          3181843 | 0.9995 | DEAD    8.9e+21 | OPEN BAND
//      251 |          3.4790 |         2,970,092 |          2968179 | 1.0006 | DEAD    5.8e+25 | OPEN BAND
//      307 |          3.3567 |         2,787,501 |          2780874 | 1.0024 | DEAD    1.1e+30 | OPEN BAND
//      401 |          3.2071 |         2,556,613 |          2540073 | 1.0065 | DEAD    4.9e+37 | OPEN BAND
//      503 |          3.0902 |         2,381,804 |          2356488 | 1.0107 | DEAD    6.4e+45 | OPEN BAND
//      601 |          3.0043 |         2,270,596 |          2241317 | 1.0131 | DEAD    3.0e+52 | OPEN BAND
//      701 |          2.9337 |         2,162,885 |          2133452 | 1.0138 | DEAD    1.3e+60 | OPEN BAND
//      809 |          2.8709 |         2,082,591 |          2055599 | 1.0131 | DEAD    6.3e+66 | OPEN BAND
//      907 |          2.8227 |         2,007,255 |          1984525 | 1.0115 | DEAD    9.0e+73 | OPEN BAND
//     1009 |          2.7792 |         1,945,278 |          1927334 | 1.0093 | DEAD    4.3e+80 | OPEN BAND
//     1201 |          2.7109 |         1,838,142 |          1831329 | 1.0037 | DEAD    9.8e+93 | OPEN BAND
//     1499 |          2.6288 |         1,710,187 |          1721044 | 0.9937 | DEAD   1.1e+114 | OPEN BAND
//     2003 |          2.5286 |         1,560,355 |          1597195 | 0.9769 | DEAD   1.1e+145 | OPEN BAND
//     2503 |          2.4565 |         1,449,010 |          1508647 | 0.9605 | DEAD   3.8e+175 | OPEN BAND
//     3001 |          2.4009 |         1,362,558 |          1440999 | 0.9456 | DEAD   4.4e+205 | OPEN BAND
//     4001 |          2.3176 |         1,238,245 |          1345030 | 0.9206 | DEAD   7.8e+262 | OPEN BAND
//     5003 |          2.2568 |         1,148,530 |          1275442 | 0.9005 | DEAD   Infinity | OPEN BAND
//     6007 |          2.2094 |         1,082,906 |          1223556 | 0.8850 | DEAD   Infinity | OPEN BAND
//     7001 |          2.1712 |         1,030,687 |          1180266 | 0.8733 | DEAD   Infinity | OPEN BAND
//     8009 |          2.1387 |           993,563 |          1147081 | 0.8662 | DEAD   Infinity | OPEN BAND
//     9001 |          2.1112 |           963,229 |          1117774 | 0.8617 | DEAD   Infinity | OPEN BAND
//    10007 |          2.0870 |           939,253 |          1091691 | 0.8604 | DEAD   Infinity | OPEN BAND
//    11003 |          2.0657 |           922,038 |          1069855 | 0.8618 | DEAD   Infinity | OPEN BAND
//    12007 |          2.0465 |           910,214 |          1050885 | 0.8661 | DEAD   Infinity | OPEN BAND
//    13001 |          2.0293 |           901,738 |          1032722 | 0.8732 | DEAD   Infinity | OPEN BAND
//    14009 |          2.0134 |           897,085 |          1016784 | 0.8823 | DEAD   Infinity | OPEN BAND
//    14929 |          2.0001 |           895,790 |          1003543 | 0.8926 | DEAD   Infinity | OPEN BAND
//
//    end of sieve: y = 14947, u = 1.9999, survivors = 895,790
//    at this point the survivors are exactly the n < W with n and n+2 both prime and both > y.
//    CUSTODY: direct recount = 895,790   (matches running count: YES)
//    Hardy-Littlewood 2*C2*W/ln^2 W = 797112,  ratio S/HL = 1.1238
//
// S3. WHERE EACH PROVABLE REGIME DIES
// ----------------------------------------------------------------------------------------------------
//    1. LEGENDRE / the Level Ledger iterated. Error majorant 3^pi(y) exceeds the main term
//       first at y = 47 (u = 4.993), where P = 5689382 and 3^pi(y) = 1.43e+7.
//       Survivors known exactly to relative precision up to there: S = 5,942,314 region.
//
//    2. FUNDAMENTAL LEMMA (dimension 2). Relative error e^{-u ln u}, valid at any FIXED u,
//       so it reaches y = W^(1/u) for every u. It covers the whole table above with an
//       error that only becomes O(1) as u approaches a constant of order 1.
//
//    3. DHR TWO-DIMENSIONAL LOWER BOUND. Positive survivors PROVEN for u > beta_2 = 4.26645,
//       i.e. y < W^(1/4.26645) = 91. The last fold still inside the
//       proven region is p = 89, leaving 4,361,681 survivors.
//       Below that, no lower bound is known, all the way down to u = 2 where the
//       question is the twin prime conjecture.
//
//    4. UPPER BOUNDS are free at EVERY level (Brun/Selberg): S(y) << W/ln^2 y throughout.
//       The asymmetry is the whole story. Chris's question is a LOWER bound question.
//
//    done in 2.1s
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. CUSTODY HOLDS AT BOTH ENDS, WHICH IS WHY THIS FILE CAN BE TRUSTED. The run
//    opens with "slots in [0,W) at level 23 = 7,952,175 expected D = 7,952,175
//    MATCH" and closes with "direct recount = 895,790 (matches running count:
//    YES)". The endpoint is recomputed by a second method, not carried. Between
//    those two anchors the whole curve is exact enumeration with no theory in
//    it, exactly as the header claims.
// 2. THE PAIR-BUCHSTAB FACTOR IS NON-MONOTONE, AND NOTHING IN THE FILE SAYS SO.
//    S/P reads 1.0000 down to y = 89, dips to 0.9995 at y = 127 and 0.9992 at
//    151, RISES back through 1.0006, 1.0024, 1.0065, 1.0107, 1.0131 to a peak
//    1.0138 at y = 701, falls back through 1.0000 near y = 1300, keeps falling
//    to a MINIMUM of 0.8604 at y = 10,007, and then RISES again to 0.8618,
//    0.8661, 0.8732, 0.8823, 0.8926 at the u = 2 endpoint. Two turning points,
//    a 1.4% overshoot above the product law and a 14% undershoot below it. The
//    header describes S/P only as "what sieve theory has to supply"; the shape
//    is the interesting part and it is unremarked. The final upturn matters
//    most: the value at u = 2 (0.8926) is NOT the minimum of the curve, so
//    quoting 0.8926 as "the depth of the deficit" understates it by 3.7%.
// 3. THE u = 2 NUMBER, AND A DIGIT THE SUMMARY GETS WRONG. At y = 14,929,
//    u = 2.0001, S = 895,790 against P = 1,003,543, so S/P = 0.892627.
//    FOLD-PROFILE.md:385 carries 0.8926 correctly in its table and
//    FOLD-PROFILE.md:393 then writes "(e^{2gamma}/4)*(S/HL) = 0.8912 against
//    0.8929" three lines below. 0.8929 is NOT a slip, contrary to wave 5's
//    S2-19: it is fold-profile-06's summary value at y = sqrt(W) exactly
//    ("23#: S(sqrt W) = 895,790, S/P = 0.8929" in that file's pasted run). The
//    quantity has three published values at three sampling conventions — 0.8926
//    here at y = 14,929, 0.8927 in 06's u = 2.000 table row, 0.8929 in 06's
//    sqrt(W) summary — and the .md quotes two of them four lines apart without
//    naming either script. The defect is a missing citation, not a wrong digit.
//    Not this partition's file to edit.
// 4. THE HARDY-LITTLEWOOD RATIO 1.1238 IS EXPECTED, NOT AN EXCESS. The file
//    prints "2*C2*W/ln^2 W = 797112, ratio S/HL = 1.1238" and leaves it there.
//    W/ln^2 W is the crude Hardy-Littlewood form; the integral form
//    2*C2*int dt/ln^2 t runs about 13% higher at W = 2.2e8, so a ratio near
//    1.12 is what a correct twin count gives at this height. Read as
//    confirmation of the enumeration, not as a 12% surplus of twins.
// 5. THE THREE REGIMES ARE MARKED CORRECTLY AND THE OPEN BAND IS THE WHOLE
//    POINT. Legendre's 3^pi(y) majorant overtakes the main term at y = 47
//    (u = 4.993): the table's "usable / DEAD" column flips exactly there
//    (y = 43 usable at 4.8e+6 against P = 5,942,244; y = 47 DEAD at 1.4e+7
//    against P = 5,689,382). DHR's proven positivity survives to u > 4.26645,
//    last fold p = 89 at u = 4.2826 with 4,361,681 survivors; y = 97 at
//    u = 4.2020 is the first OPEN BAND row. So the proven region ends with 4.36
//    million survivors and the region nobody can bound runs from there down to
//    895,790. The gap is a factor of 4.9 in survivor count and a factor of 168
//    in y, and it contains the twin prime conjecture.
// 6. THE 3^pi(y) COLUMN OVERFLOWS AND PRINTS "Infinity". From y = 5,003 down,
//    3^pi(y) exceeds the double-precision range (pi(5003) = 669, 3^669 ~ 1e319)
//    and the column reads Infinity for the last eleven rows. Cosmetic only —
//    the verdict is DEAD everywhere below y = 47, so no row's classification
//    depends on the printed value. Worth knowing before anyone reuses that
//    column for anything quantitative.
// 7. SCOPE AND ONE OFF-BY-A-PRIME. This is ONE window, [0, 23#), chosen because
//    it is an exact period so D has no error term. There is no second window
//    and no control, so nothing here separates "the tile" from "an interval of
//    this size" — that separation is fold-profile-16's job and its answer is
//    that the tile is not special. The sieve ends at y = 14,947, which is the
//    first prime ABOVE sqrt(W) = 14,936.3, so u = 1.9999 rather than exactly 2;
//    the last table row (y = 14,929, u = 2.0001) has the same survivor count,
//    so nothing turns on it. Runtime 2.1 s, and the header's suggested
//    --max-old-space-size=6000 was not needed: it ran under the default heap.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   W = 223,092,870 -> "W = 2.2e8" in reading 4.
//   4,361,681 survivors -> "4.36 million" in reading 5. The 4.3503 in the u
//   column of the p = 83 row is a coincidence, not the source.
// DERIVED IN THIS READING by arithmetic over printed values:
//   CORRECTED 2026-08-20 (mismatch adjudication #19): reading 3's S/P at the
//   u = 2 endpoint read 0.892624 and now reads 0.892627. Both inputs are on
//   that row of the table above: 895,790 / 1,003,543 = 0.892627421,
//   recomputed here. The sixth decimal was off by three in the last place.
//   The rounded 0.8926 that the table prints, and that every downstream
//   document carries, was right all along, so nothing downstream moves.
//   The factor 168 in y in reading 5 is 14,929 over 89, which is 167.74.
//   1e319 in reading 6 is 3^669 in decimal size: 669 * log10(3) = 319.19.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   0.8927 is the S/P cell of the u = 2.000 row of the table in
//   research/fold-profile-06-scale-free.js.
//   0.8929 and 0.8912 are both in that same file's summary line, which reads
//   "23#: S(sqrt W) = 895,790, S/P = 0.8929, S/HL = 1.1238,
//   (e^{2g}/4)*(S/HL) = 0.8912". Reading 3 attributes 0.8912 to
//   FOLD-PROFILE.md, which quotes it from there. Both checked.
// IN-CODE: the 6000 of reading 7 is the heap size in the header's suggested
//   --max-old-space-size flag, not a measurement.
// DEFINITION / LITERATURE constants: pi(5003) = 669 in reading 6 is the prime
//   counting function, not something this run prints.
// STALE POINTERS, both correct when the reading was written on 2026-08-18:
//   FOLD-PROFILE.md:385 for the 0.8926 table cell is now line 389, and
//   FOLD-PROFILE.md:393 for the 0.8912 against 0.8929 sentence is now line
//   397. The document gained the citation block that reading 3 asked for,
//   at lines 404 to 410, which pushed everything down by four.
// ---------------------------------------------------------------------------
