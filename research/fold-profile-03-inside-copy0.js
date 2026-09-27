// ============================================================================
// FOLD PROFILE 03 — INSIDE COPY 0: WHERE THE DAMAGE FALLS
// ============================================================================
// 01 and 02 answered the counting question: copy 0 takes 2D/p kills, the same
// as every other copy, to a relative precision of 1e-5 at T23 and falling. That
// is the total. This file asks where inside the original tile section those
// kills sit, and why the total comes out level despite the head being provably
// quiet (A6: inside [0, p^2) copy 0 deletes at most the single slot p).
//   ⚠ CORRECTION 2026-08-18: that parenthesis, as written, is refuted by this
//   file's own S4 table below, which prints "which = 29,839" for T23 folded by
//   29 — TWO kills below p^2, not one, and neither the count nor the identity
//   is what A6 says. The original wording is left standing above; the corrected
//   statement is in READINGS 1. A6's CONCLUSION (the head is O(1)-quiet, so any
//   origin-only argument for the strong Zone Postulate is vacuous) is unharmed:
//   the count is 0, 1 or 2, still O(1). The CORRECT statement already exists in
//   the corpus, as the Head Lemma of research/FOLD-PROFILE.md:144-150 ("copy
//   0's kills below p^2 are contained in {p, p^2-2}", with a four-line proof).
//   This header and research/a3-06-origin-vs-max.js:597-598 are the two places
//   still carrying the pre-Head-Lemma wording. a3-06 is not this partition's
//   file and is logged for the adjudicator.
//
// THE MECHANISM, stated before it is measured. Copy 0 deletes the slots
// r = 0 or -2 (mod p), i.e. r = p*t and r = p*t - 2. Both families require t to
// be x-rough, so a kill sitting at POSITION y is p times a rough number of size
// y/p. In the roughness variable u = ln y / ln x the kill therefore samples the
// rough-pair density curve one full step EARLIER than a slot at the same
// position does, at u - ln p / ln x, and ln p / ln x is close to 1 on the fold
// ladder. Since that curve decreases to 1 from above (the repo's Unification
// Law rho(u) = e^{2gamma}/u^2 for u <= 2, continuing as (e^gamma omega(u))^2),
// the kill profile is the slot profile shifted one unit toward the head:
//
//     zero in the head, then ABOVE average, then settling to average.
//
// The head deficit and the shoulder excess are the same displacement seen twice,
// so they must cancel. That cancellation is what 01 measured as 1e-5.
//
//   S1  the exact running ledger over the WHOLE of copy 0, in roughness bins:
//       kills, slots, and kills / (2/p * slots), for real tiles
//   S2  the cumulative view: how far into the copy before the ledger levels
//   S3  the shift test: is the kill curve the slot curve translated by
//       delta = ln p / ln x?
//   S4  A6's head result re-derived from the same table, and the crossover
//
// Run:  node fold-profile-03-inside-copy0.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

function tileT5() { return { x: 5, W: 30, s0: 11, D: 3, gaps: Uint16Array.from([6, 12, 12]) }; }
function fold(T, p) {
  const { W, s0, D, gaps } = T;
  const Dn = D * (p - 2), Wn = W * p;
  const ng = new Uint16Array(Dn);
  const w = W % p, dead2 = p - 2;
  let idx = 0, prev = -1, first = -1;
  for (let k = 0; k < p; k++) {
    const base = k * W, shift = (k * w) % p;
    let r = (s0 + shift) % p, pos = base + s0;
    for (let j = 0; j < D; j++) {
      if (r !== 0 && r !== dead2) { if (first < 0) first = pos; else ng[idx++] = pos - prev; prev = pos; }
      const g = gaps[j]; pos += g; r += g % p; if (r >= p) r -= p;
    }
  }
  ng[idx++] = (first + Wn) - prev;
  if (idx !== Dn) throw new Error('census mismatch');
  return { x: p, W: Wn, s0: first, D: Dn, gaps: ng };
}

const TILES = {};
{ let T = tileT5(); TILES[5] = T; for (const p of [7, 11, 13, 17, 19, 23]) { T = fold(T, p); TILES[p] = T; } }

console.log('='.repeat(104));
console.log('FOLD PROFILE 03 — inside copy 0: the head deficit, the shoulder excess, and their cancellation');
console.log('='.repeat(104));

// ---------------------------------------------------------------------------
// The exact ledger. Walk copy 0's slots in position order, bin by
// u = ln(position)/ln(x), and record slots and kills per bin.
// ---------------------------------------------------------------------------
function ledger(x, p, nbin) {
  const T = TILES[x];
  const lnx = Math.log(x);
  const umax = Math.log(T.W) / lnx;
  const bins = nbin, du = umax / bins;
  const slot = new Float64Array(bins), kill = new Float64Array(bins);
  let pos = T.s0, r = T.s0 % p;
  const d2 = p - 2;
  for (let j = 0; j < T.D; j++) {
    let b = Math.floor((Math.log(pos) / lnx) / du);
    if (b >= bins) b = bins - 1; if (b < 0) b = 0;
    slot[b]++;
    if (r === 0 || r === d2) kill[b]++;
    const g = T.gaps[j]; pos += g; r += g % p; if (r >= p) r -= p;
  }
  return { T, bins, du, slot, kill, umax, lnx };
}

const CASES = [[19, 23], [23, 29]];

for (const [x, p] of CASES) {
  const L = ledger(x, p, 24);
  const { T } = L;
  const totalKill = L.kill.reduce((a, b) => a + b, 0);
  const expected = 2 * T.D / p;
  console.log('');
  console.log(`S1. THE EXACT LEDGER — T${x} folded by ${p}.  copy 0 = [0, ${T.W.toLocaleString()}),  ` +
    `D = ${T.D.toLocaleString()},  2D/p = ${expected.toFixed(2)}`);
  console.log(`     shift  delta = ln p / ln x = ${(Math.log(p) / Math.log(x)).toFixed(4)}`);
  console.log('-'.repeat(104));
  console.log('   u band        |   position band           |     slots |  kills | kills/slot vs 2/p | cum kills | cum expected');
  let cs = 0, ck = 0;
  for (let b = 0; b < L.bins; b++) {
    if (L.slot[b] === 0 && L.kill[b] === 0) continue;
    cs += L.slot[b]; ck += L.kill[b];
    const u0 = b * L.du, u1 = (b + 1) * L.du;
    const y0 = Math.pow(x, u0), y1 = Math.pow(x, u1);
    const ratio = L.slot[b] === 0 ? NaN : (L.kill[b] / L.slot[b]) / (2 / p);
    console.log(
      `   ${u0.toFixed(2)}-${u1.toFixed(2)}  | ${y0.toExponential(2)} - ${y1.toExponential(2)} | ` +
      `${L.slot[b].toLocaleString().padStart(9)} | ${L.kill[b].toLocaleString().padStart(6)} | ` +
      `${(isNaN(ratio) ? '-' : ratio.toFixed(3)).padStart(17)} | ${ck.toLocaleString().padStart(9)} | ` +
      `${(2 * cs / p).toFixed(1).padStart(12)}`);
  }
  console.log(`   TOTAL: kills = ${totalKill.toLocaleString()}   against 2D/p = ${expected.toFixed(2)}   ` +
    `deviation = ${(totalKill - expected).toFixed(2)}   relative = ${((totalKill - expected) / expected).toExponential(2)}`);
}

// ---------------------------------------------------------------------------
// S2. the cumulative view — how deep into the copy before the ledger levels
// ---------------------------------------------------------------------------
console.log('');
console.log('S2. THE CUMULATIVE VIEW — running (kills so far) / (2/p * slots so far)');
console.log('-'.repeat(104));
console.log('   the fair share is 1.000. A6 says the head is at 0. How far out does it take to level?');
console.log('');
for (const [x, p] of CASES) {
  const T = TILES[x];
  const marks = [];
  for (const m of [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 4096, 16384, 65536, 1 << 20]) marks.push(m * p * p);
  marks.push(T.W);
  const out = [];
  let pos = T.s0, r = T.s0 % p, cs = 0, ck = 0, mi = 0;
  const d2 = p - 2;
  for (let j = 0; j < T.D && mi < marks.length; j++) {
    while (mi < marks.length && pos > marks[mi]) {
      out.push([marks[mi], cs, ck]); mi++;
    }
    cs++; if (r === 0 || r === d2) ck++;
    const g = T.gaps[j]; pos += g; r += g % p; if (r >= p) r -= p;
  }
  while (mi < marks.length) { out.push([marks[mi], cs, ck]); mi++; }
  console.log(`   T${x} folded by ${p}   (p^2 = ${(p * p).toLocaleString()},  W = ${T.W.toLocaleString()})`);
  console.log('     window Y      |  Y/p^2 |     slots<Y |  kills<Y | fair share 2/p*slots |  ratio');
  for (const [Y, s, k] of out) {
    if (Y > T.W) continue;
    const fair = 2 * s / p;
    console.log(`   ${Y.toExponential(3).padStart(12)}  | ${(Y / (p * p)).toExponential(1).padStart(6)} | ` +
      `${s.toLocaleString().padStart(11)} | ${k.toLocaleString().padStart(8)} | ${fair.toFixed(1).padStart(20)} | ` +
      `${(fair === 0 ? '-' : (k / fair).toFixed(4)).padStart(7)}`);
  }
  console.log('');
}

// ---------------------------------------------------------------------------
// S3. the shift test — kill curve vs slot curve translated by delta
// ---------------------------------------------------------------------------
console.log('S3. THE SHIFT TEST — is the kill profile the slot profile moved by delta = ln p / ln x?');
console.log('-'.repeat(104));
console.log('   slotDensity(u) = slots per unit position in the band at u, normalised by the tile average D/W.');
console.log('   killDensity(u) = kills   per unit position in the band at u, normalised by (2/p)*(D/W).');
console.log('   PREDICTION: killDensity(u) = slotDensity(u - delta).');
console.log('');
for (const [x, p] of CASES) {
  const L = ledger(x, p, 48);
  const { T } = L;
  const delta = Math.log(p) / Math.log(x);
  const dens = new Float64Array(L.bins), kdens = new Float64Array(L.bins);
  for (let b = 0; b < L.bins; b++) {
    const y0 = Math.pow(x, b * L.du), y1 = Math.pow(x, (b + 1) * L.du);
    const width = y1 - y0;
    dens[b] = L.slot[b] / width / (T.D / T.W);
    kdens[b] = L.kill[b] / width / ((2 / p) * (T.D / T.W));
  }
  console.log(`   T${x} folded by ${p},  delta = ${delta.toFixed(3)} bins = ${(delta / L.du).toFixed(2)} bin widths`);
  console.log('      u    |  slotDensity(u) |  killDensity(u) |  slotDensity(u-delta) | kill/shifted-slot');
  for (let b = 0; b < L.bins; b++) {
    if (L.slot[b] === 0) continue;
    const u = (b + 0.5) * L.du;
    // linear interpolation of slotDensity at u - delta
    const ub = (u - delta) / L.du - 0.5;
    let sh = NaN;
    if (ub >= 0 && ub < L.bins - 1) {
      const i = Math.floor(ub), f = ub - i;
      if (L.slot[i] > 0 && L.slot[i + 1] > 0) sh = dens[i] * (1 - f) + dens[i + 1] * f;
    } else if (ub < 0) sh = 0;
    console.log(`   ${u.toFixed(3).padStart(6)} | ${dens[b].toFixed(4).padStart(15)} | ${kdens[b].toFixed(4).padStart(15)} | ` +
      `${(isNaN(sh) ? '-' : sh.toFixed(4)).padStart(21)} | ${(isNaN(sh) || sh === 0 ? '-' : (kdens[b] / sh).toFixed(3)).padStart(17)}`);
  }
  console.log('');
}

// ---------------------------------------------------------------------------
// S4. the head, and the crossover
// ---------------------------------------------------------------------------
console.log('S4. THE HEAD AND THE CROSSOVER — where copy 0 stops being quiet and starts overpaying');
console.log('-'.repeat(104));
console.log(' tile | fold p |  p^2 | slots < p^2 | kills < p^2 | which | first killed slot | first kill / p^2 | ratio at 100*p^2');
for (const [x, p] of [[13, 17], [17, 19], [19, 23], [23, 29]]) {
  const T = TILES[x];
  let pos = T.s0, r = T.s0 % p, sh = 0, kh = 0, firstKill = -1;
  const which = []; const d2 = p - 2;
  let s100 = 0, k100 = 0;
  for (let j = 0; j < T.D; j++) {
    const dead = (r === 0 || r === d2);
    if (pos < p * p) { sh++; if (dead) { kh++; which.push(pos); } }
    if (pos < 100 * p * p) { s100++; if (dead) k100++; }
    if (dead && firstKill < 0) firstKill = pos;
    const g = T.gaps[j]; pos += g; r += g % p; if (r >= p) r -= p;
  }
  console.log(` T${String(x).padEnd(3)} | ${String(p).padStart(6)} | ${String(p * p).padStart(4)} | ${String(sh).padStart(11)} | ` +
    `${String(kh).padStart(11)} | ${(which.join(',') || '-').padStart(5)} | ${String(firstKill).padStart(17)} | ` +
    `${(firstKill / (p * p)).toFixed(2).padStart(16)} | ${(k100 / (2 * s100 / p)).toFixed(3)}`);
}

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-profile-03-inside-copy0.js
//   invocation:  node research/fold-profile-03-inside-copy0.js
//   code-sha256: 2fa245b365c42ac286fba58972fd4d4ac4b1aaeaf025eaae804145a4eaf1d79d
//   out-sha256:  e6a46ce4f428c4ee69624b72602dd964859c117efb93210767f7a9b1db5832bc
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.6 s
// ============================================================================
// ========================================================================================================
// FOLD PROFILE 03 — inside copy 0: the head deficit, the shoulder excess, and their cancellation
// ========================================================================================================
//
// S1. THE EXACT LEDGER — T19 folded by 23.  copy 0 = [0, 9,699,690),  D = 378,675,  2D/p = 32928.26
//      shift  delta = ln p / ln x = 1.0649
// --------------------------------------------------------------------------------------------------------
//    u band        |   position band           |     slots |  kills | kills/slot vs 2/p | cum kills | cum expected
//    1.14-1.37  | 2.85e+1 - 5.58e+1 |         2 |      0 |             0.000 |         0 |          0.2
//    1.37-1.59  | 5.58e+1 - 1.09e+2 |         4 |      0 |             0.000 |         0 |          0.5
//    1.59-1.82  | 1.09e+2 - 2.13e+2 |         5 |      0 |             0.000 |         0 |          1.0
//    1.82-2.05  | 2.13e+2 - 4.17e+2 |         6 |      0 |             0.000 |         0 |          1.5
//    2.05-2.28  | 4.17e+2 - 8.15e+2 |        10 |      0 |             0.000 |         0 |          2.3
//    2.28-2.50  | 8.15e+2 - 1.59e+3 |        30 |      5 |             1.917 |         5 |          5.0
//    2.50-2.73  | 1.59e+3 - 3.11e+3 |        59 |      6 |             1.169 |        11 |         10.1
//    2.73-2.96  | 3.11e+3 - 6.09e+3 |       120 |      7 |             0.671 |        18 |         20.5
//    2.96-3.19  | 6.09e+3 - 1.19e+4 |       229 |     21 |             1.055 |        39 |         40.4
//    3.19-3.41  | 1.19e+4 - 2.33e+4 |       442 |     37 |             0.963 |        76 |         78.9
//    3.41-3.64  | 2.33e+4 - 4.55e+4 |       871 |     79 |             1.043 |       155 |        154.6
//    3.64-3.87  | 4.55e+4 - 8.89e+4 |     1,691 |    140 |             0.952 |       295 |        301.7
//    3.87-4.10  | 8.89e+4 - 1.74e+5 |     3,315 |    291 |             1.010 |       586 |        589.9
//    4.10-4.33  | 1.74e+5 - 3.40e+5 |     6,478 |    564 |             1.001 |     1,150 |       1153.2
//    4.33-4.55  | 3.40e+5 - 6.64e+5 |    12,667 |  1,108 |             1.006 |     2,258 |       2254.7
//    4.55-4.78  | 6.64e+5 - 1.30e+6 |    24,753 |  2,154 |             1.001 |     4,412 |       4407.1
//    4.78-5.01  | 1.30e+6 - 2.54e+6 |    48,404 |  4,216 |             1.002 |     8,628 |       8616.2
//    5.01-5.24  | 2.54e+6 - 4.96e+6 |    94,625 |  8,214 |             0.998 |    16,842 |      16844.4
//    5.24-5.46  | 4.96e+6 - 9.70e+6 |   184,964 | 16,088 |             1.000 |    32,930 |      32928.3
//    TOTAL: kills = 32,930   against 2D/p = 32928.26   deviation = 1.74   relative = 5.28e-5
//
// S1. THE EXACT LEDGER — T23 folded by 29.  copy 0 = [0, 223,092,870),  D = 7,952,175,  2D/p = 548425.86
//      shift  delta = ln p / ln x = 1.0739
// --------------------------------------------------------------------------------------------------------
//    u band        |   position band           |     slots |  kills | kills/slot vs 2/p | cum kills | cum expected
//    1.02-1.28  | 2.46e+1 - 5.49e+1 |         2 |      1 |             7.250 |         1 |          0.1
//    1.28-1.53  | 5.49e+1 - 1.22e+2 |         4 |      0 |             0.000 |         1 |          0.4
//    1.53-1.79  | 1.22e+2 - 2.72e+2 |         8 |      0 |             0.000 |         1 |          1.0
//    1.79-2.04  | 2.72e+2 - 6.06e+2 |         9 |      0 |             0.000 |         1 |          1.6
//    2.04-2.30  | 6.06e+2 - 1.35e+3 |        22 |      3 |             1.977 |         4 |          3.1
//    2.30-2.55  | 1.35e+3 - 3.01e+3 |        60 |      5 |             1.208 |         9 |          7.2
//    2.55-2.81  | 3.01e+3 - 6.70e+3 |       136 |     11 |             1.173 |        20 |         16.6
//    2.81-3.07  | 6.70e+3 - 1.49e+4 |       296 |     19 |             0.931 |        39 |         37.0
//    3.07-3.32  | 1.49e+4 - 3.33e+4 |       651 |     42 |             0.935 |        81 |         81.9
//    3.32-3.58  | 3.33e+4 - 7.41e+4 |     1,455 |    103 |             1.026 |       184 |        182.3
//    3.58-3.83  | 7.41e+4 - 1.65e+5 |     3,245 |    210 |             0.938 |       394 |        406.1
//    3.83-4.09  | 1.65e+5 - 3.68e+5 |     7,227 |    504 |             1.011 |       898 |        904.5
//    4.09-4.34  | 3.68e+5 - 8.19e+5 |    16,090 |  1,110 |             1.000 |     2,008 |       2014.1
//    4.34-4.60  | 8.19e+5 - 1.83e+6 |    35,855 |  2,486 |             1.005 |     4,494 |       4486.9
//    4.60-4.85  | 1.83e+6 - 4.07e+6 |    79,889 |  5,504 |             0.999 |     9,998 |       9996.5
//    4.85-5.11  | 4.07e+6 - 9.06e+6 |   177,952 | 12,263 |             0.999 |    22,261 |      22269.0
//    5.11-5.36  | 9.06e+6 - 2.02e+7 |   396,416 | 27,340 |             1.000 |    49,601 |      49608.1
//    5.36-5.62  | 2.02e+7 - 4.50e+7 |   883,122 | 60,928 |             1.000 |   110,529 |     110513.0
//    5.62-5.88  | 4.50e+7 - 1.00e+8 | 1,967,257 | 135,660 |             1.000 |   246,189 |     246185.9
//    5.88-6.13  | 1.00e+8 - 2.23e+8 | 4,382,479 | 302,222 |             1.000 |   548,411 |     548425.9
//    TOTAL: kills = 548,411   against 2D/p = 548425.86   deviation = -14.86   relative = -2.71e-5
//
// S2. THE CUMULATIVE VIEW — running (kills so far) / (2/p * slots so far)
// --------------------------------------------------------------------------------------------------------
//    the fair share is 1.000. A6 says the head is at 0. How far out does it take to level?
//
//    T19 folded by 23   (p^2 = 529,  W = 9,699,690)
//      window Y      |  Y/p^2 |     slots<Y |  kills<Y | fair share 2/p*slots |  ratio
//        5.290e+2  | 1.0e+0 |          21 |        0 |                  1.8 |  0.0000
//        1.058e+3  | 2.0e+0 |          38 |        3 |                  3.3 |  0.9079
//        2.116e+3  | 4.0e+0 |          79 |        7 |                  6.9 |  1.0190
//        4.232e+3  | 8.0e+0 |         162 |       14 |                 14.1 |  0.9938
//        8.464e+3  | 1.6e+1 |         326 |       26 |                 28.3 |  0.9172
//        1.693e+4  | 3.2e+1 |         662 |       56 |                 57.6 |  0.9728
//        3.386e+4  | 6.4e+1 |       1,324 |      112 |                115.1 |  0.9728
//        6.771e+4  | 1.3e+2 |       2,641 |      229 |                229.7 |  0.9972
//        1.354e+5  | 2.6e+2 |       5,288 |      455 |                459.8 |  0.9895
//        2.708e+5  | 5.1e+2 |      10,571 |      915 |                919.2 |  0.9954
//        5.417e+5  | 1.0e+3 |      21,147 |    1,840 |               1838.9 |  1.0006
//        2.167e+6  | 4.1e+3 |      84,589 |    7,351 |               7355.6 |  0.9994
//        8.667e+6  | 1.6e+4 |     338,367 |   29,418 |              29423.2 |  0.9998
//        9.700e+6  | 1.8e+4 |     378,675 |   32,930 |              32928.3 |  1.0001
//
//    T23 folded by 29   (p^2 = 841,  W = 223,092,870)
//      window Y      |  Y/p^2 |     slots<Y |  kills<Y | fair share 2/p*slots |  ratio
//        8.410e+2  | 1.0e+0 |          30 |        2 |                  2.1 |  0.9667
//        1.682e+3  | 2.0e+0 |          55 |        5 |                  3.8 |  1.3182
//        3.364e+3  | 4.0e+0 |         116 |       10 |                  8.0 |  1.2500
//        6.728e+3  | 8.0e+0 |         241 |       20 |                 16.6 |  1.2033
//        1.346e+4  | 1.6e+1 |         483 |       37 |                 33.3 |  1.1108
//        2.691e+4  | 3.2e+1 |         963 |       69 |                 66.4 |  1.0389
//        5.382e+4  | 6.4e+1 |       1,923 |      131 |                132.6 |  0.9878
//        1.076e+5  | 1.3e+2 |       3,838 |      260 |                264.7 |  0.9823
//        2.153e+5  | 2.6e+2 |       7,669 |      530 |                528.9 |  1.0021
//        4.306e+5  | 5.1e+2 |      15,351 |    1,051 |               1058.7 |  0.9927
//        8.612e+5  | 1.0e+3 |      30,696 |    2,117 |               2117.0 |  1.0000
//        3.445e+6  | 4.1e+3 |     122,779 |    8,458 |               8467.5 |  0.9989
//        1.378e+7  | 1.6e+4 |     491,146 |   33,881 |              33872.1 |  1.0003
//        5.512e+7  | 6.6e+4 |   1,964,605 |  135,494 |             135490.0 |  1.0000
//        2.231e+8  | 2.7e+5 |   7,952,175 |  548,411 |             548425.9 |  1.0000
//
// S3. THE SHIFT TEST — is the kill profile the slot profile moved by delta = ln p / ln x?
// --------------------------------------------------------------------------------------------------------
//    slotDensity(u) = slots per unit position in the band at u, normalised by the tile average D/W.
//    killDensity(u) = kills   per unit position in the band at u, normalised by (2/p)*(D/W).
//    PREDICTION: killDensity(u) = slotDensity(u - delta).
//
//    T19 folded by 23,  delta = 1.065 bins = 9.36 bin widths
//       u    |  slotDensity(u) |  killDensity(u) |  slotDensity(u-delta) | kill/shifted-slot
//     1.195 |          2.2535 |          0.0000 |                     - |                 -
//     1.309 |          1.6118 |          0.0000 |                     - |                 -
//     1.423 |          2.3055 |          0.0000 |                     - |                 -
//     1.537 |          1.6490 |          0.0000 |                     - |                 -
//     1.651 |          1.1794 |          0.0000 |                     - |                 -
//     1.764 |          1.2653 |          0.0000 |                     - |                 -
//     1.878 |          1.2066 |          0.0000 |                     - |                 -
//     1.992 |          0.4315 |          0.0000 |                     - |                 -
//     2.106 |          0.7716 |          0.0000 |                     - |                 -
//     2.220 |          0.5518 |          0.0000 |                     - |                 -
//     2.333 |          1.0262 |          2.7233 |                1.8397 |             1.480
//     2.447 |          0.9598 |          1.2985 |                2.0591 |             0.631
//     2.561 |          1.0499 |          0.9287 |                1.8822 |             0.493
//     2.675 |          0.9531 |          1.3285 |                1.3462 |             0.987
//     2.789 |          1.0535 |          0.7126 |                1.2348 |             0.577
//     2.903 |          1.0194 |          0.6796 |                1.2275 |             0.554
//     3.016 |          0.9721 |          0.9721 |                0.7069 |             1.375
//     3.130 |          1.0354 |          1.1299 |                0.6507 |             1.736
//     3.244 |          1.0108 |          1.0567 |                0.6299 |             1.678
//     3.358 |          0.9858 |          0.8892 |                0.8577 |             1.037
//     3.472 |          1.0037 |          0.9540 |                0.9834 |             0.970
//     3.586 |          1.0046 |          1.1144 |                1.0179 |             1.095
//     3.699 |          0.9887 |          0.9597 |                0.9875 |             0.972
//     3.813 |          1.0036 |          0.9424 |                1.0178 |             0.926
//     3.927 |          1.0029 |          0.9985 |                1.0315 |             0.968
//     4.041 |          0.9983 |          1.0177 |                0.9889 |             1.029
//     4.155 |          1.0005 |          1.0216 |                1.0129 |             1.009
//     4.269 |          0.9994 |          0.9864 |                1.0195 |             0.967
//     4.382 |          0.9997 |          1.0147 |                0.9947 |             1.020
//     4.496 |          1.0004 |          0.9998 |                0.9974 |             1.002
//     4.610 |          1.0002 |          0.9969 |                1.0043 |             0.993
//     4.724 |          0.9994 |          1.0030 |                0.9944 |             1.009
//     4.838 |          1.0001 |          0.9988 |                0.9983 |             1.001
//     4.952 |          1.0000 |          1.0037 |                1.0031 |             1.001
//     5.065 |          1.0000 |          0.9954 |                0.9999 |             0.995
//     5.179 |          1.0001 |          1.0004 |                0.9997 |             1.001
//     5.293 |          0.9999 |          1.0003 |                0.9998 |             1.001
//     5.407 |          1.0000 |          1.0002 |                0.9996 |             1.001
//
//    T23 folded by 29,  delta = 1.074 bins = 8.41 bin widths
//       u    |  slotDensity(u) |  killDensity(u) |  slotDensity(u-delta) | kill/shifted-slot
//     1.086 |          2.3128 |         33.5359 |                0.0000 |                 -
//     1.213 |          1.5496 |          0.0000 |                     - |                 -
//     1.341 |          2.0764 |          0.0000 |                     - |                 -
//     1.469 |          1.3912 |          0.0000 |                     - |                 -
//     1.597 |          1.3982 |          0.0000 |                     - |                 -
//     1.724 |          1.5613 |          0.0000 |                     - |                 -
//     1.852 |          0.6276 |          0.0000 |                     - |                 -
//     1.980 |          0.8410 |          0.0000 |                     - |                 -
//     2.107 |          0.8452 |          1.3617 |                     - |                 -
//     2.235 |          0.8180 |          1.8247 |                1.8611 |             0.980
//     2.363 |          0.9696 |          1.2226 |                1.8614 |             0.657
//     2.491 |          1.0451 |          1.2287 |                1.6709 |             0.735
//     2.618 |          0.9841 |          0.8232 |                1.3953 |             0.590
//     2.746 |          1.0651 |          1.4708 |                1.4947 |             0.984
//     2.874 |          1.0024 |          0.7391 |                1.0087 |             0.733
//     3.002 |          1.0131 |          1.0729 |                0.7539 |             1.423
//     3.129 |          0.9915 |          0.9400 |                0.8435 |             1.114
//     3.257 |          0.9990 |          0.9262 |                0.8291 |             1.117
//     3.385 |          1.0014 |          1.0425 |                0.9077 |             1.148
//     3.512 |          0.9978 |          1.0144 |                1.0143 |             1.000
//     3.640 |          1.0051 |          0.9471 |                1.0090 |             0.939
//     3.768 |          0.9973 |          0.9332 |                1.0320 |             0.904
//     3.896 |          0.9972 |          1.0554 |                1.0280 |             1.027
//     4.023 |          1.0021 |          0.9819 |                1.0088 |             0.973
//     4.151 |          0.9997 |          1.0193 |                1.0003 |             1.019
//     4.279 |          0.9995 |          0.9868 |                0.9959 |             0.991
//     4.407 |          0.9991 |          1.0089 |                1.0004 |             1.008
//     4.534 |          1.0004 |          1.0028 |                0.9993 |             1.004
//     4.662 |          1.0001 |          0.9949 |                1.0021 |             0.993
//     4.790 |          1.0001 |          1.0019 |                1.0005 |             1.001
//     4.917 |          1.0000 |          0.9978 |                0.9972 |             1.001
//     5.045 |          1.0000 |          1.0002 |                1.0001 |             1.000
//     5.173 |          1.0000 |          1.0006 |                1.0007 |             1.000
//     5.301 |          1.0000 |          0.9996 |                0.9996 |             1.000
//     5.428 |          1.0000 |          1.0005 |                0.9993 |             1.001
//     5.556 |          1.0000 |          1.0003 |                0.9999 |             1.000
//     5.684 |          1.0000 |          0.9996 |                1.0002 |             0.999
//     5.811 |          1.0000 |          1.0001 |                1.0001 |             1.000
//     5.939 |          1.0000 |          0.9999 |                1.0000 |             1.000
//     6.067 |          1.0000 |          1.0000 |                1.0000 |             1.000
//
// S4. THE HEAD AND THE CROSSOVER — where copy 0 stops being quiet and starts overpaying
// --------------------------------------------------------------------------------------------------------
//  tile | fold p |  p^2 | slots < p^2 | kills < p^2 | which | first killed slot | first kill / p^2 | ratio at 100*p^2
//  T13  |     17 |  289 |          16 |           1 |    17 |                17 |             0.06 | 0.993
//  T17  |     19 |  361 |          18 |           1 |   359 |               359 |             0.99 | 1.000
//  T19  |     23 |  529 |          21 |           0 |     - |               851 |             1.61 | 1.003
//  T23  |     29 |  841 |          30 |           2 | 29,839 |                29 |             0.03 | 0.993
//
//    done in 0.5s
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. THE HEADER'S A6 PARENTHESIS IS REFUTED BY S4, AND THE CORRECT STATEMENT IS
//    SHARPER. Header line 8 says "inside [0, p^2) copy 0 deletes at most the
//    single slot p". S4 prints, for T23 folded by 29, "kills < p^2 = 2" and
//    "which = 29,839". 839 is not p. The mechanism is already in this file's
//    own header ten lines below: copy 0 deletes r = 0 and r = -2 (mod p) with
//    the cofactor x-rough, and below p^2 that admits exactly two candidates,
//    r = p*1 and r = p*p - 2. That is the Head Lemma of FOLD-PROFILE.md:144-150,
//    which the corpus already has with a proof and which this header predates:
//        head kills = ({p} u {p^2 - 2}) intersected with the slot set of T_x,
//    and the count is 0, 1 or 2. Verified exhaustively over the ladder folds
//    (x,p) = (5,7) .. (41,43) by direct enumeration below p^2 (a scratch check,
//    not this script): the kill sets are [47], [11], [167], [17], [359], [],
//    [29,839], [], [1367], [41], [1847]. In FIVE of those eleven the single kill
//    is p^2-2 and p is not a slot at all, against THREE where it is p; two are
//    empty and one has both. So "the single slot p" names the wrong slot more
//    often than the right one. (Corrected 2026-08-20, mismatch adjudication
//    #42: the count read SIX. Regenerating all eleven kill sets from the Head
//    Lemma reproduces the listed sets exactly, and against p and p^2-2 they
//    split 5 / 3 / 2 empty / 1 both = 11. The sentence's point, that five
//    outnumbers three, survives.)
//    A6's CONCLUSION survives untouched — the head loses O(1) slots, so an
//    origin-only argument is still vacuous — but the lemma as quoted is false.
//    The same sentence is a displayed claim in a3-06-origin-vs-max.js:597-598.
// 2. CUSTODY IS EXACT ACROSS FILES. S1's totals are kills = 32,930 against
//    2D/p = 32928.26 (T19 by 23) and kills = 548,411 against 548425.86 (T23 by
//    29). fold-profile-01 S1's K(0) column reads 32,930 and 548,411 for the
//    same two folds, and its K(0)-mean column reads +1.7 and -14.9 against the
//    +1.74 and -14.86 here. Two independent code paths, same numbers.
// 3. THE FILE'S HEADLINE SHAPE IS THERE, BUT EACH HALF IS SEEN IN ONLY ONE
//    TILE. The predicted profile is "zero in the head, then above average, then
//    settling". T19 gives the head half cleanly: five bands of exactly zero
//    kills out to u = 2.28, then 1.917. T23 gives the shoulder half cleanly:
//    S2's cumulative ratio runs 0.9667, 1.3182, 1.2500, 1.2033, 1.1108, 1.0389
//    at Y = p^2 .. 32p^2, a 32% overshoot that decays. But T23 does NOT give
//    the head half (its first band is 7.250, from the single kill at r = 29)
//    and T19 does NOT give a clean shoulder (its overshoot is one band at
//    1.917 on 5 kills). Two tiles, one half each, no error bars anywhere.
// 4. S3'S SHIFT TEST PASSES WHERE IT CANNOT FAIL AND FAILS WHERE IT BITES. The
//    kill/shifted-slot column reads 1.000 or 0.999 for the whole deep half of
//    both tables — but in that region slotDensity, killDensity AND
//    slotDensity(u-delta) are all 1.0000 to four places, so the ratio is 1 by
//    construction and tests nothing. The only discriminating rows are the
//    transition. There, T19 reads 1.480, 0.631, 0.493, 0.987, 0.577, 0.554,
//    1.375, 1.736, 1.678, 1.037 and T23 reads 0.980, 0.657, 0.735, 0.590,
//    0.984, 0.733, 1.423, 1.114, 1.117, 1.148. That is a factor of 3.5 spread,
//    with a run of three consecutive rows 40-70% high in T19. The kill counts
//    in those bands are small enough that Poisson noise explains the first few
//    rows and not obviously the later ones; the script prints no counts per
//    S3 bin and no error bar, so the test cannot be scored as stated. HONEST
//    VERDICT: the one-unit shift is a plausible mechanism that this section
//    does not confirm. It is not refuted either.
// 5. ONE S3 CELL IS A DIVISION ARTIFACT. T23's first row shows killDensity
//    33.5359 against slotDensity(u-delta) = 0.0000 and a ratio of "-". That is
//    the single slot r = 29 in a band containing two slots. Read it as one
//    event, not a density.
// 6. THE LEVELLING IS FAST AND THAT IS THE REAL RESULT. S4's "ratio at 100*p^2"
//    is 0.993, 1.000, 1.003, 0.993 across T13, T17, T19, T23. Whatever the head
//    does, by a hundred times the crystallisation frontier copy 0 is within
//    0.7% of its fair share, and by the end of the copy within 3e-5. The
//    cancellation the header asserts is real and it is quantified twice.
// 7. SCOPE. S1 and S3 run two folds only (T19 by 23, T23 by 29); S2 runs the
//    same two; S4 runs four (T13, T17, T19, T23). Nothing here is a sweep. The
//    u-bands are 19 wide in S1 and roughly 38 in S3, so S1 and S3 rows do not
//    correspond and cannot be cross-read. Runtime 0.5 s.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure: the -150 of reading 1 is the tail of the
//   line range FOLD-PROFILE.md:144-150. The 41,43 of reading 1 is the fold
//   pair (41,43). The -598 of reading 1 is the tail of the line range
//   a3-06-origin-vs-max.js:597-598.
//
// DERIVED, and reproducible from the Head Lemma the same reading states:
//   1367 and 1847 in reading 1 are p^2-2 at p = 37 and p = 43. The eleven
//   kill sets that reading lists come from a scratch enumeration it declares
//   is not this script, and all eleven regenerate exactly from
//   ({p} u {p^2-2}) intersected with the slots of T_x.
//   One count in that sentence does not regenerate. Of the eleven sets, the
//   ones whose single kill is p^2-2 with p not a slot are (5,7), (11,13),
//   (17,19), (31,37) and (41,43): five, not the six the sentence claims. Two
//   more sets are empty and three have p as the single kill. The sentence's
//   point stands, since five of eleven still outnumbers the three where p is
//   the named slot, but the count itself is off by one.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   -14.9 and +1.7 in reading 2 are the K(0)-mean column of
//   research/fold-profile-01-per-copy.js, on its T23 and T19 rows, next to
//   the same 548,411 and 32,930 kill totals.
// ---------------------------------------------------------------------------
