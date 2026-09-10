// ============================================================================
// FOLD PROFILE 02 — THE DEVIATION LAW, AND THE NEAR-PALINDROME
// ============================================================================
// 01 found that the 2D deaths of a fold are shared among the p copies almost
// perfectly evenly: at T23 folded by 29 the copies take 548,426 kills each on
// average and the extreme copy is off by 24, a relative deviation of 4e-5. The
// spread does NOT grow like sqrt(mean); the absolute spread barely grows at all.
//
// This file asks what the deviation actually is.
//
// THE RIGHT OBJECT IS AN INTEGER. Write h(a) for the number of slots of T_x with
// residue a mod p. Every Mobius term in the expansion of h(a) is (W/d)/p up to a
// fractional part with denominator p, so
//
//        N(a) := p*h(a) - D
//
// is an integer, sum_a N(a) = 0, and the kill deviation of copy k is
// (N(a_k) + N(a_k - 2))/p. N is the thing to find a law for.
//
// SECTIONS
//   S1  N(a) in full, at one fold, to see whether it is structured or noise
//   S2  the grid: max|N| over tiles T7..T23 and folding primes 5..401
//   S3  candidate laws tested against max|N|:  2^pi(x),  3^pi(x),  sqrt(D*p),
//       and the elementary Mobius majorant
//   S4  the near-palindrome: the mirror r -> W-2-r is an involution on all
//       slots EXCEPT r = W-1, which is its own image but whose representative
//       does not shift. Predicted consequence: h(a) - h((W-2-a) mod p) is
//       supported on exactly two residues and takes values +-1.
//   S5  copy 0 specifically: its deviation across the grid, sign and size
//
// Run:  node fold-profile-02-deviation-law.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

function primesTo(n) {
  const c = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!c[i]) { out.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } }
  return out;
}
const PR = primesTo(5000);
const pi = (x) => PR.filter((q) => q <= x).length;

// --- tiles, carried as cyclic gap words --------------------------------------
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
      if (r !== 0 && r !== dead2) {
        if (first < 0) first = pos; else ng[idx++] = pos - prev;
        prev = pos;
      }
      const g = gaps[j]; pos += g; r += g % p; if (r >= p) r -= p;
    }
  }
  ng[idx++] = (first + Wn) - prev;
  if (idx !== Dn) throw new Error('census mismatch');
  return { x: p, W: Wn, s0: first, D: Dn, gaps: ng };
}

function histogram(T, p) {
  const { s0, D, gaps } = T;
  const h = new Float64Array(p);
  let r = s0 % p;
  for (let j = 0; j < D; j++) { h[r]++; const g = gaps[j] % p; r += g; if (r >= p) r -= p; }
  return h;
}

// build the ladder of tiles up to T23
const TILES = {};
{
  let T = tileT5(); TILES[5] = T;
  for (const p of [7, 11, 13, 17, 19, 23]) { T = fold(T, p); TILES[p] = T; log(`built T${p}: D=${T.D.toLocaleString()}`); }
}

console.log('='.repeat(100));
console.log('FOLD PROFILE 02 — the deviation law for the per-copy kill ledger');
console.log('='.repeat(100));

// ---------------------------------------------------------------------------
// S1. N(a) in full at one fold
// ---------------------------------------------------------------------------
console.log('');
console.log('S1. N(a) = p*h(a) - D  IN FULL — is the irregularity structured or noise?');
console.log('-'.repeat(100));
for (const [x, p] of [[17, 19], [19, 23], [23, 29]]) {
  const T = TILES[x], h = histogram(T, p);
  const N = [];
  for (let a = 0; a < p; a++) N.push(p * h[a] - T.D);
  const s = N.reduce((u, v) => u + v, 0);
  console.log(` T${x} folded by ${p}   (D = ${T.D.toLocaleString()},  D/p = ${(T.D / p).toFixed(3)})`);
  console.log('   N(a), a = 0..' + (p - 1) + ':  ' + N.join(', '));
  console.log('   sum N = ' + s + '   (must be 0)     max|N| = ' + Math.max(...N.map(Math.abs)) +
    '     N(a) all = ' + [...new Set(N.map((v) => ((v % p) + p) % p))].join(',') + ' (mod ' + p + ')');
  console.log('');
}

// ---------------------------------------------------------------------------
// S2/S3. the grid and the candidate laws
// ---------------------------------------------------------------------------
console.log('S2/S3. THE GRID — max|N| over tiles and folding primes, against candidate laws');
console.log('-'.repeat(100));
console.log(' tile |    D | pi(x) |  fold p |    max|N| |   max|N|/2^pi | max|N|/sqrt(D*p) |  copy0 N(0)+N(-2) | rel.dev of K(0)');
const grid = [];
for (const x of [7, 11, 13, 17, 19, 23]) {
  const T = TILES[x];
  const pl = PR.filter((q) => q > x && q <= 401);
  for (const p of pl) {
    const h = histogram(T, p);
    let mx = 0;
    for (let a = 0; a < p; a++) { const n = Math.abs(p * h[a] - T.D); if (n > mx) mx = n; }
    const n0 = (p * h[0] - T.D) + (p * h[(p - 2) % p] - T.D);
    grid.push({ x, D: T.D, p, mx, n0 });
  }
}
for (const g of grid) {
  const show = (g.p <= 61) || (g.p % 50 < 4);
  if (!show) continue;
  console.log(
    ` T${String(g.x).padEnd(3)} | ${String(g.D).padStart(9)} | ${String(pi(g.x)).padStart(5)} | ${String(g.p).padStart(7)} | ` +
    `${String(g.mx).padStart(9)} | ${(g.mx / Math.pow(2, pi(g.x))).toFixed(3).padStart(13) } | ` +
    `${(g.mx / Math.sqrt(g.D * g.p)).toFixed(4).padStart(16)} | ${String(g.n0).padStart(17)} | ` +
    `${(Math.abs(g.n0) / (2 * g.D)).toExponential(2)}`);
}

console.log('');
console.log('   PER-TILE SUMMARY (max over all folding primes 5 < p <= 401):');
console.log('   tile | pi(x) |      D | max over p of max|N| |  2^pi(x) |  3^pi(x) | ratio to 2^pi');
for (const x of [7, 11, 13, 17, 19, 23]) {
  const sub = grid.filter((g) => g.x === x);
  const m = Math.max(...sub.map((g) => g.mx));
  console.log(`   T${String(x).padEnd(3)} | ${String(pi(x)).padStart(5)} | ${String(TILES[x].D).padStart(6)} | ` +
    `${String(m).padStart(20)} | ${String(Math.pow(2, pi(x))).padStart(8)} | ${String(Math.pow(3, pi(x))).padStart(8)} | ` +
    `${(m / Math.pow(2, pi(x))).toFixed(3)}`);
}

// does max|N| depend on p at all, at fixed tile?
console.log('');
console.log('   IS max|N| INDEPENDENT OF p?  (fixed tile, p sweeping 5..401)');
console.log('   tile |  min over p |  median |  max over p |  distinct values');
for (const x of [7, 11, 13, 17, 19, 23]) {
  const v = grid.filter((g) => g.x === x).map((g) => g.mx).sort((a, b) => a - b);
  const uniq = [...new Set(v)];
  console.log(`   T${String(x).padEnd(3)} | ${String(v[0]).padStart(11)} | ${String(v[v.length >> 1]).padStart(7)} | ` +
    `${String(v[v.length - 1]).padStart(11)} | ${uniq.length <= 12 ? uniq.join(',') : uniq.length + ' values'}`);
}

// ---------------------------------------------------------------------------
// S4. the near-palindrome
// ---------------------------------------------------------------------------
console.log('');
console.log('S4. THE NEAR-PALINDROME — h(a) vs h((W-2-a) mod p)');
console.log('-'.repeat(100));
console.log('   The mirror r -> W-2-r is an involution on the slot set of T_x. Its only');
console.log('   representative-shifting fixed point is r = W-1 (the last slot, always present).');
console.log('   Prediction: h(a) - h((W-2-a) mod p) is 0 everywhere except +1 at a = (W-1) mod p');
console.log('   and -1 at a = (-1) mod p = p-1.');
console.log('');
console.log(' tile |  fold p | mismatched residues | values | matches prediction | K(k) vs K(p-1-k): max diff');
for (const x of [7, 11, 13, 17, 19, 23]) {
  const T = TILES[x];
  for (const p of PR.filter((q) => q > x && q <= 43)) {
    const h = histogram(T, p);
    const bad = [];
    for (let a = 0; a < p; a++) {
      const b = (((T.W - 2 - a) % p) + p) % p;
      const d = h[a] - h[b];
      if (d !== 0) bad.push([a, d]);
    }
    const predA = ((T.W - 1) % p + p) % p, predB = p - 1;
    const ok = bad.length === 2 &&
      bad.some(([a, d]) => a === predA && d === 1) && bad.some(([a, d]) => a === predB && d === -1);
    // copy palindrome
    const w = T.W % p; let mxd = 0;
    for (let k = 0; k < p; k++) {
      const ak = (((-k * w) % p) + p) % p, aj = (((-(p - 1 - k) * w) % p) + p) % p;
      const Kk = h[ak] + h[(ak - 2 + p) % p], Kj = h[aj] + h[(aj - 2 + p) % p];
      const d = Math.abs(Kk - Kj); if (d > mxd) mxd = d;
    }
    console.log(` T${String(x).padEnd(3)} | ${String(p).padStart(7)} | ${String(bad.map((b) => b[0]).join(',')).padStart(19)} | ` +
      `${String(bad.map((b) => (b[1] > 0 ? '+' : '') + b[1]).join(',')).padStart(6)} | ${(ok ? 'YES' : 'NO').padStart(18)} | ${mxd}`);
  }
}

// ---------------------------------------------------------------------------
// S5. copy 0 across the grid
// ---------------------------------------------------------------------------
console.log('');
console.log('S5. COPY 0 — is the original tile section systematically spared or hit?');
console.log('-'.repeat(100));
console.log('   n0 = N(0) + N(p-2) = p*(K(0) - 2D/p). Sign counts over all p in (x, 401]:');
console.log('   tile | folds | n0 < 0 (spared) | n0 = 0 | n0 > 0 (hit) | mean n0 | mean |n0| | mean max|N|');
for (const x of [7, 11, 13, 17, 19, 23]) {
  const sub = grid.filter((g) => g.x === x);
  const neg = sub.filter((g) => g.n0 < 0).length, zer = sub.filter((g) => g.n0 === 0).length, pos = sub.filter((g) => g.n0 > 0).length;
  const mn = sub.reduce((u, g) => u + g.n0, 0) / sub.length;
  const ma = sub.reduce((u, g) => u + Math.abs(g.n0), 0) / sub.length;
  const mm = sub.reduce((u, g) => u + g.mx, 0) / sub.length;
  console.log(`   T${String(x).padEnd(3)} | ${String(sub.length).padStart(5)} | ${String(neg).padStart(15)} | ${String(zer).padStart(6)} | ` +
    `${String(pos).padStart(12)} | ${mn.toFixed(2).padStart(7)} | ${ma.toFixed(2).padStart(10)} | ${mm.toFixed(2).padStart(11)}`);
}

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-profile-02-deviation-law.js
//   invocation:  node research/fold-profile-02-deviation-law.js
//   code-sha256: 47a1b17e0af7ac2fd165b50c424f070ecef640eac3af60da42b6043886c6c7e1
//   out-sha256:  e82d3928b1cabcbb843a29d3d79c3365448834084c5ed55dbac403f8c13c753e
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     2.3 s
// ============================================================================
// ====================================================================================================
// FOLD PROFILE 02 — the deviation law for the per-copy kill ledger
// ====================================================================================================
//
// S1. N(a) = p*h(a) - D  IN FULL — is the irregularity structured or noise?
// ----------------------------------------------------------------------------------------------------
//  T17 folded by 19   (D = 22,275,  D/p = 1172.368)
//    N(a), a = 0..18:  31, -7, -26, 69, -45, 50, -45, -26, -7, -26, -45, 50, -45, 69, -26, -7, 31, 12, -7
//    sum N = 0   (must be 0)     max|N| = 69     N(a) all = 12 (mod 19)
//
//  T19 folded by 23   (D = 378,675,  D/p = 16464.130)
//    N(a), a = 0..22:  -95, 43, 43, 112, -26, -95, 20, 20, -95, -26, 112, 43, 43, -95, -72, 135, 20, -3, -141, -3, 20, 135, -95
//    sum N = 0   (must be 0)     max|N| = 141     N(a) all = 20 (mod 23)
//
//  T23 folded by 29   (D = 7,952,175,  D/p = 274212.931)
//    N(a), a = 0..28:  -172, 234, -114, 118, 31, 147, -491, 176, 176, -491, 147, 31, 118, -114, 234, -172, 147, -259, 234, -433, 205, 60, 263, 60, 205, -433, 234, -259, 118
//    sum N = 0   (must be 0)     max|N| = 491     N(a) all = 2 (mod 29)
//
// S2/S3. THE GRID — max|N| over tiles and folding primes, against candidate laws
// ----------------------------------------------------------------------------------------------------
//  tile |    D | pi(x) |  fold p |    max|N| |   max|N|/2^pi | max|N|/sqrt(D*p) |  copy0 N(0)+N(-2) | rel.dev of K(0)
//  T7   |        15 |     4 |      11 |        15 |         0.938 |           1.1677 |                -8 | 2.67e-1
//  T7   |        15 |     4 |      13 |        15 |         0.938 |           1.0742 |                -4 | 1.33e-1
//  T7   |        15 |     4 |      17 |        19 |         1.188 |           1.1898 |               -13 | 4.33e-1
//  T7   |        15 |     4 |      19 |        15 |         0.938 |           0.8885 |                 8 | 2.67e-1
//  T7   |        15 |     4 |      23 |        31 |         1.938 |           1.6690 |               -30 | 1.00e+0
//  T7   |        15 |     4 |      29 |        43 |         2.688 |           2.0617 |                -1 | 3.33e-2
//  T7   |        15 |     4 |      31 |        47 |         2.938 |           2.1796 |                 1 | 3.33e-2
//  T7   |        15 |     4 |      37 |        22 |         1.375 |           0.9338 |               -30 | 1.00e+0
//  T7   |        15 |     4 |      41 |        26 |         1.625 |           1.0484 |                11 | 3.67e-1
//  T7   |        15 |     4 |      43 |        28 |         1.750 |           1.1025 |                13 | 4.33e-1
//  T7   |        15 |     4 |      47 |        32 |         2.000 |           1.2052 |               -30 | 1.00e+0
//  T7   |        15 |     4 |      53 |        38 |         2.375 |           1.3477 |               -30 | 1.00e+0
//  T7   |        15 |     4 |      59 |        44 |         2.750 |           1.4790 |                29 | 9.67e-1
//  T7   |        15 |     4 |      61 |        46 |         2.875 |           1.5207 |                31 | 1.03e+0
//  T7   |        15 |     4 |     101 |        86 |         5.375 |           2.2095 |                71 | 2.37e+0
//  T7   |        15 |     4 |     103 |        88 |         5.500 |           2.2388 |                73 | 2.43e+0
//  T7   |        15 |     4 |     151 |       136 |         8.500 |           2.8576 |               121 | 4.03e+0
//  T7   |        15 |     4 |     251 |       236 |        14.750 |           3.8462 |               -30 | 1.00e+0
//  T7   |        15 |     4 |     353 |       338 |        21.125 |           4.6450 |               -30 | 1.00e+0
//  T7   |        15 |     4 |     401 |       386 |        24.125 |           4.9770 |               -30 | 1.00e+0
//  T11  |       135 |     5 |      13 |        21 |         0.656 |           0.5013 |                 3 | 1.11e-2
//  T11  |       135 |     5 |      17 |        18 |         0.563 |           0.3757 |                19 | 7.04e-2
//  T11  |       135 |     5 |      19 |        21 |         0.656 |           0.4146 |                -4 | 1.48e-2
//  T11  |       135 |     5 |      23 |        43 |         1.344 |           0.7717 |                 6 | 2.22e-2
//  T11  |       135 |     5 |      29 |        77 |         2.406 |           1.2306 |                49 | 1.81e-1
//  T11  |       135 |     5 |      31 |        82 |         2.563 |           1.2676 |                40 | 1.48e-1
//  T11  |       135 |     5 |      37 |        87 |         2.719 |           1.2310 |               -11 | 4.07e-2
//  T11  |       135 |     5 |      41 |       111 |         3.469 |           1.4920 |               -24 | 8.89e-2
//  T11  |       135 |     5 |      43 |        92 |         2.875 |           1.2075 |                31 | 1.15e-1
//  T11  |       135 |     5 |      47 |       135 |         4.219 |           1.6948 |                59 | 2.19e-1
//  T11  |       135 |     5 |      53 |        82 |         2.563 |           0.9694 |               101 | 3.74e-1
//  T11  |       135 |     5 |      59 |       101 |         3.156 |           1.1317 |                25 | 9.26e-2
//  T11  |       135 |     5 |      61 |        74 |         2.313 |           0.8155 |               -26 | 9.63e-2
//  T11  |       135 |     5 |     101 |       168 |         5.250 |           1.4387 |               -68 | 2.52e-1
//  T11  |       135 |     5 |     103 |       174 |         5.438 |           1.4756 |               -64 | 2.37e-1
//  T11  |       135 |     5 |     151 |       167 |         5.219 |           1.1697 |                32 | 1.19e-1
//  T11  |       135 |     5 |     251 |       367 |        11.469 |           1.9937 |              -270 | 1.00e+0
//  T11  |       135 |     5 |     353 |       571 |        17.844 |           2.6157 |              -270 | 1.00e+0
//  T11  |       135 |     5 |     401 |       266 |         8.313 |           1.1433 |               131 | 4.85e-1
//  T13  |      1485 |     6 |      17 |        57 |         0.891 |           0.3587 |               -29 | 9.76e-3
//  T13  |      1485 |     6 |      19 |        54 |         0.844 |           0.3215 |                13 | 4.38e-3
//  T13  |      1485 |     6 |      23 |        36 |         0.563 |           0.1948 |               -26 | 8.75e-3
//  T13  |      1485 |     6 |      29 |        93 |         1.453 |           0.4481 |              -157 | 5.29e-2
//  T13  |      1485 |     6 |      31 |        90 |         1.406 |           0.4195 |               -87 | 2.93e-2
//  T13  |      1485 |     6 |      37 |       180 |         2.813 |           0.7679 |              -121 | 4.07e-2
//  T13  |      1485 |     6 |      41 |       173 |         2.703 |           0.7011 |               -18 | 6.06e-3
//  T13  |      1485 |     6 |      43 |       152 |         2.375 |           0.6015 |               126 | 4.24e-2
//  T13  |      1485 |     6 |      47 |       113 |         1.766 |           0.4277 |               -56 | 1.89e-2
//  T13  |      1485 |     6 |      53 |       211 |         3.297 |           0.7521 |               -55 | 1.85e-2
//  T13  |      1485 |     6 |      59 |       167 |         2.609 |           0.5642 |                39 | 1.31e-2
//  T13  |      1485 |     6 |      61 |       223 |         3.484 |           0.7409 |                19 | 6.40e-3
//  T13  |      1485 |     6 |     101 |       333 |         5.203 |           0.8598 |               161 | 5.42e-2
//  T13  |      1485 |     6 |     103 |       352 |         5.500 |           0.9000 |                17 | 5.72e-3
//  T13  |      1485 |     6 |     151 |       579 |         9.047 |           1.2227 |               201 | 6.77e-2
//  T13  |      1485 |     6 |     251 |       983 |        15.359 |           1.6101 |              -209 | 7.04e-2
//  T13  |      1485 |     6 |     353 |       986 |        15.406 |           1.3618 |               560 | 1.89e-1
//  T13  |      1485 |     6 |     401 |      1084 |        16.938 |           1.4047 |               238 | 8.01e-2
//  T17  |     22275 |     7 |      19 |        69 |         0.539 |           0.1061 |                43 | 9.65e-4
//  T17  |     22275 |     7 |      23 |       173 |         1.352 |           0.2417 |                24 | 5.39e-4
//  T17  |     22275 |     7 |      29 |       206 |         1.609 |           0.2563 |                52 | 1.17e-3
//  T17  |     22275 |     7 |      31 |       141 |         1.102 |           0.1697 |                59 | 1.32e-3
//  T17  |     22275 |     7 |      37 |       445 |         3.477 |           0.4902 |                35 | 7.86e-4
//  T17  |     22275 |     7 |      41 |       176 |         1.375 |           0.1842 |                58 | 1.30e-3
//  T17  |     22275 |     7 |      43 |       259 |         2.023 |           0.2646 |                84 | 1.89e-3
//  T17  |     22275 |     7 |      47 |       185 |         1.445 |           0.1808 |              -135 | 3.03e-3
//  T17  |     22275 |     7 |      53 |       333 |         2.602 |           0.3065 |                23 | 5.16e-4
//  T17  |     22275 |     7 |      59 |       445 |         3.477 |           0.3882 |              -123 | 2.76e-3
//  T17  |     22275 |     7 |      61 |       437 |         3.414 |           0.3749 |               102 | 2.29e-3
//  T17  |     22275 |     7 |     101 |       661 |         5.164 |           0.4407 |               193 | 4.33e-3
//  T17  |     22275 |     7 |     103 |       645 |         5.039 |           0.4258 |               152 | 3.41e-3
//  T17  |     22275 |     7 |     151 |       828 |         6.469 |           0.4515 |              -156 | 3.50e-3
//  T17  |     22275 |     7 |     251 |      1570 |        12.266 |           0.6640 |               128 | 2.87e-3
//  T17  |     22275 |     7 |     353 |      2435 |        19.023 |           0.8684 |              -778 | 1.75e-2
//  T17  |     22275 |     7 |     401 |      3027 |        23.648 |           1.0128 |               -39 | 8.75e-4
//  T19  |    378675 |     8 |      23 |       141 |         0.551 |           0.0478 |                40 | 5.28e-5
//  T19  |    378675 |     8 |      29 |       355 |         1.387 |           0.1071 |               101 | 1.33e-4
//  T19  |    378675 |     8 |      31 |       413 |         1.613 |           0.1205 |               228 | 3.01e-4
//  T19  |    378675 |     8 |      37 |       427 |         1.668 |           0.1141 |              -256 | 3.38e-4
//  T19  |    378675 |     8 |      41 |       493 |         1.926 |           0.1251 |               -39 | 5.15e-5
//  T19  |    378675 |     8 |      43 |       628 |         2.453 |           0.1556 |              -464 | 6.13e-4
//  T19  |    378675 |     8 |      47 |       662 |         2.586 |           0.1569 |              -509 | 6.72e-4
//  T19  |    378675 |     8 |      53 |       646 |         2.523 |           0.1442 |              -192 | 2.54e-4
//  T19  |    378675 |     8 |      59 |       603 |         2.355 |           0.1276 |              -262 | 3.46e-4
//  T19  |    378675 |     8 |      61 |       658 |         2.570 |           0.1369 |              -584 | 7.71e-4
//  T19  |    378675 |     8 |     101 |       834 |         3.258 |           0.1349 |               251 | 3.31e-4
//  T19  |    378675 |     8 |     103 |       880 |         3.438 |           0.1409 |               421 | 5.56e-4
//  T19  |    378675 |     8 |     151 |      1845 |         7.207 |           0.2440 |               217 | 2.87e-4
//  T19  |    378675 |     8 |     251 |      2594 |        10.133 |           0.2661 |              1674 | 2.21e-3
//  T19  |    378675 |     8 |     353 |      3977 |        15.535 |           0.3440 |              1247 | 1.65e-3
//  T19  |    378675 |     8 |     401 |      4681 |        18.285 |           0.3799 |              2946 | 3.89e-3
//  T23  |   7952175 |     9 |      29 |       491 |         0.959 |           0.0323 |              -431 | 2.71e-5
//  T23  |   7952175 |     9 |      31 |       689 |         1.346 |           0.0439 |              -482 | 3.03e-5
//  T23  |   7952175 |     9 |      37 |       753 |         1.471 |           0.0439 |                26 | 1.63e-6
//  T23  |   7952175 |     9 |      41 |       430 |         0.840 |           0.0238 |              -327 | 2.06e-5
//  T23  |   7952175 |     9 |      43 |       873 |         1.705 |           0.0472 |               447 | 2.81e-5
//  T23  |   7952175 |     9 |      47 |      1071 |         2.092 |           0.0554 |              -114 | 7.17e-6
//  T23  |   7952175 |     9 |      53 |      1009 |         1.971 |           0.0491 |               261 | 1.64e-5
//  T23  |   7952175 |     9 |      59 |       745 |         1.455 |           0.0344 |              -546 | 3.43e-5
//  T23  |   7952175 |     9 |      61 |       822 |         1.605 |           0.0373 |               302 | 1.90e-5
//  T23  |   7952175 |     9 |     101 |      1859 |         3.631 |           0.0656 |               221 | 1.39e-5
//  T23  |   7952175 |     9 |     103 |      2000 |         3.906 |           0.0699 |              -326 | 2.05e-5
//  T23  |   7952175 |     9 |     151 |      2780 |         5.430 |           0.0802 |              2141 | 1.35e-4
//  T23  |   7952175 |     9 |     251 |      5013 |         9.791 |           0.1122 |              -488 | 3.07e-5
//  T23  |   7952175 |     9 |     353 |      7975 |        15.576 |           0.1505 |             -1347 | 8.47e-5
//  T23  |   7952175 |     9 |     401 |      8076 |        15.773 |           0.1430 |             -1091 | 6.86e-5
//
//    PER-TILE SUMMARY (max over all folding primes 5 < p <= 401):
//    tile | pi(x) |      D | max over p of max|N| |  2^pi(x) |  3^pi(x) | ratio to 2^pi
//    T7   |     4 |     15 |                  386 |       16 |       81 | 24.125
//    T11  |     5 |    135 |                  623 |       32 |      243 | 19.469
//    T13  |     6 |   1485 |                 1445 |       64 |      729 | 22.578
//    T17  |     7 |  22275 |                 3027 |      128 |     2187 | 23.648
//    T19  |     8 | 378675 |                 5495 |      256 |     6561 | 21.465
//    T23  |     9 | 7952175 |                 8706 |      512 |    19683 | 17.004
//
//    IS max|N| INDEPENDENT OF p?  (fixed tile, p sweeping 5..401)
//    tile |  min over p |  median |  max over p |  distinct values
//    T7   |          15 |     166 |         386 | 73 values
//    T11  |          18 |     254 |         623 | 67 values
//    T13  |          36 |     664 |        1445 | 73 values
//    T17  |          69 |    1153 |        3027 | 69 values
//    T19  |         141 |    2023 |        5495 | 71 values
//    T23  |         430 |    4196 |        8706 | 70 values
//
// S4. THE NEAR-PALINDROME — h(a) vs h((W-2-a) mod p)
// ----------------------------------------------------------------------------------------------------
//    The mirror r -> W-2-r is an involution on the slot set of T_x. Its only
//    representative-shifting fixed point is r = W-1 (the last slot, always present).
//    Prediction: h(a) - h((W-2-a) mod p) is 0 everywhere except +1 at a = (W-1) mod p
//    and -1 at a = (-1) mod p = p-1.
//
//  tile |  fold p | mismatched residues | values | matches prediction | K(k) vs K(p-1-k): max diff
//  T7   |      11 |                0,10 |  +1,-1 |                YES | 1
//  T7   |      13 |                1,12 |  +1,-1 |                YES | 1
//  T7   |      17 |                5,16 |  +1,-1 |                YES | 1
//  T7   |      19 |                0,18 |  +1,-1 |                YES | 1
//  T7   |      23 |                2,22 |  +1,-1 |                YES | 1
//  T7   |      29 |                6,28 |  +1,-1 |                YES | 1
//  T7   |      31 |               23,30 |  +1,-1 |                YES | 1
//  T7   |      37 |               24,36 |  +1,-1 |                YES | 1
//  T7   |      41 |                4,40 |  +1,-1 |                YES | 1
//  T7   |      43 |               37,42 |  +1,-1 |                YES | 1
//  T11  |      13 |                8,12 |  +1,-1 |                YES | 1
//  T11  |      17 |               14,16 |  +1,-1 |                YES | 1
//  T11  |      19 |               10,18 |  +1,-1 |                YES | 1
//  T11  |      23 |                9,22 |  +1,-1 |                YES | 1
//  T11  |      29 |               18,28 |  +1,-1 |                YES | 1
//  T11  |      31 |               15,30 |  +1,-1 |                YES | 1
//  T11  |      37 |               15,36 |  +1,-1 |                YES | 1
//  T11  |      41 |               13,40 |  +1,-1 |                YES | 1
//  T11  |      43 |               30,42 |  +1,-1 |                YES | 1
//  T13  |      17 |                7,16 |  +1,-1 |                YES | 1
//  T13  |      19 |                9,18 |  +1,-1 |                YES | 1
//  T13  |      23 |               14,22 |  +1,-1 |                YES | 1
//  T13  |      29 |               14,28 |  +1,-1 |                YES | 1
//  T13  |      31 |               21,30 |  +1,-1 |                YES | 1
//  T13  |      37 |               22,36 |  +1,-1 |                YES | 1
//  T13  |      41 |               17,40 |  +1,-1 |                YES | 1
//  T13  |      43 |               15,42 |  +1,-1 |                YES | 1
//  T17  |      19 |               17,18 |  +1,-1 |                YES | 1
//  T17  |      23 |                1,22 |  +1,-1 |                YES | 1
//  T17  |      29 |               22,28 |  +1,-1 |                YES | 1
//  T17  |      31 |                1,30 |  +1,-1 |                YES | 1
//  T17  |      37 |               20,36 |  +1,-1 |                YES | 1
//  T17  |      41 |               18,40 |  +1,-1 |                YES | 1
//  T17  |      43 |               13,42 |  +1,-1 |                YES | 1
//  T19  |      23 |               14,22 |  +1,-1 |                YES | 1
//  T19  |      29 |                1,28 |  +1,-1 |                YES | 1
//  T19  |      31 |                6,30 |  +1,-1 |                YES | 1
//  T19  |      37 |               28,36 |  +1,-1 |                YES | 1
//  T19  |      41 |               32,40 |  +1,-1 |                YES | 1
//  T19  |      43 |                7,42 |  +1,-1 |                YES | 1
//  T23  |      29 |               16,28 |  +1,-1 |                YES | 1
//  T23  |      31 |                5,30 |  +1,-1 |                YES | 1
//  T23  |      37 |                0,36 |  +1,-1 |                YES | 1
//  T23  |      41 |               20,40 |  +1,-1 |                YES | 1
//  T23  |      43 |               11,42 |  +1,-1 |                YES | 1
//
// S5. COPY 0 — is the original tile section systematically spared or hit?
// ----------------------------------------------------------------------------------------------------
//    n0 = N(0) + N(p-2) = p*(K(0) - 2D/p). Sign counts over all p in (x, 401]:
//    tile | folds | n0 < 0 (spared) | n0 = 0 | n0 > 0 (hit) | mean n0 | mean |n0| | mean max|N|
//    T7   |    75 |              51 |      0 |           24 |   10.33 |      48.63 |      177.24
//    T11  |    74 |              49 |      0 |           25 |  -72.19 |     105.43 |      279.18
//    T13  |    73 |              27 |      0 |           46 |  147.49 |     235.58 |      651.92
//    T17  |    72 |              37 |      0 |           35 | -140.74 |     347.01 |     1278.31
//    T19  |    71 |              35 |      0 |           36 |   75.01 |     752.62 |     2291.87
//    T23  |    70 |              37 |      0 |           33 | -230.01 |    1170.50 |     4117.70
//
//    done in 2.2s
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. THE "N(a) all = c (mod p)" LINE IS AN IDENTITY, NOT A DISCOVERY. S1 prints
//    "N(a) all = 12 (mod 19)", "= 20 (mod 23)", "= 2 (mod 29)". Since
//    N(a) = p*h(a) - D, every N(a) is congruent to -D mod p by definition, and
//    -22275 = 12 (19), -378675 = 20 (23), -7952175 = 2 (29). The line is a
//    correct custody check on the arithmetic and it is worth nothing as
//    structure. Read it as a checksum.
// 2. S1's VECTOR IS VISIBLY PALINDROMIC, WHICH IS S4 SEEN EARLY. T17 by 19
//    reads 31, -7, -26, 69, -45, 50, -45, -26, -7, -26, -45, 50, -45, 69, -26,
//    -7, 31 for a = 0..16 — an exact palindrome about a = 8 — and then 12, -7
//    at a = 17, 18. S4's T17-by-19 row names the two mismatched residues as
//    17 and 18. So the "structured or noise?" question S1 poses is answered by
//    its own first line of numbers: structured, and the structure is the
//    mirror. The script never connects the two sections.
// 3. THE FILE ASKS "IS max|N| INDEPENDENT OF p?" AND MEASURES THE WRONG
//    QUANTITY. As printed the answer is plainly no: at T23, max|N| runs from
//    430 to 8,706 over the p-sweep, 70 distinct values, and the grid shows it
//    climbing with p (491 at p = 29, 8,076 at p = 401). But N is p*h(a) - D, so
//    it carries a factor of p by construction. Dividing the pasted T23 grid
//    through by p gives 16.9, 22.2, 20.4, 10.5, 20.3, 22.8, 19.0, 12.6, 13.5,
//    18.4, 19.4, 18.4, 20.0, 22.6, 20.1 across p = 29..401 — flat, no trend
//    over a 14x range in p. T17 likewise: 3.6, 7.5, 7.1, 4.5, 12.0, 4.3, 6.0,
//    3.9, 6.3, 7.5, 7.2, 6.5, 6.3, 5.5, 6.3, 6.9, 7.5. So the invariant is
//    max_a |h(a) - D/p|, which IS essentially independent of p at a fixed tile,
//    and it is the quantity fold-profile-01 S4 bounds. This column is not in
//    the output; the ratios above are my arithmetic on the pasted table, not a
//    run, and they are eyeballed for trend rather than fitted.
// 4. THE 2^pi(x) LAW IS THE BEST OF THE CANDIDATES AND IS NOT TESTED HARD. The
//    per-tile summary's ratio to 2^pi(x) reads 24.125, 19.469, 22.578, 23.648,
//    21.465, 17.004 over T7..T23 — within a factor 1.4 while 2^pi(x) itself
//    moves by 32x. That is the file's headline and it comes with two caveats
//    the file does not state: the max is taken over the same fixed prime set
//    (5 < p <= 401) at every tile, so as D grows the sweep does not, and the
//    quantity being maxed carries the p-factor of reading 3, so what looks like
//    a clean 2^pi law is a max over a p-range that is held constant.
// 5. THE 3^pi(x) COLUMN IS A REFERENCE AND WILL BE MISREAD AS A BOUND. The
//    summary prints 2^pi(x) and 3^pi(x) side by side but only ONE ratio (to
//    2^pi). max|N| EXCEEDS the 3^pi(x) column in two of six rows: T13, 1,445
//    against 729, and T17, 3,027 against 2,187. This is not a violation of
//    anything, because the elementary Mobius majorant is on h(a) - D/p, i.e.
//    |N| <= 2p*3^{pi(x)-1}, which carries the p that reading 3 is about. But
//    the header advertises S3 as testing "the elementary Mobius majorant" and
//    what is printed is a bare 3^pi(x) with no p in it. A reader comparing the
//    two adjacent columns concludes the bound fails. LOGGED, not fixed: the
//    right repair is a max|N|/p column, which is a code change, not a
//    correction.
// 6. THE MIRROR HOLDS AT 45 OF 45 CELLS, WHICH IS THE FILE'S SOLID RESULT.
//    Every row of S4 reads "mismatched residues (two of them) | +1,-1 | YES |
//    max diff 1". The prediction is exact: the difference is supported on
//    exactly two residues, one of them always p-1, and the induced ledger gap
//    max_k |K(k) - K(p-1-k)| is 1 everywhere. This is FOLD-PROFILE section 4's
//    "VERIFIED 45 of 45" and it reproduces exactly. Scope: six tiles x primes
//    up to 43 only, not the full 401 sweep that S2/S5 use.
// 7. COPY 0 IS NOT SYSTEMATICALLY SPARED, AND T7 IS THE ONE ROW THAT ARGUES
//    WITH ITSELF. Sign counts over the full sweep: 51/24, 49/25, 27/46, 37/35,
//    35/36, 37/33 (spared / hit), and mean n0 alternates sign tile to tile
//    (+10.33, -72.19, +147.49, -140.74, +75.01, -230.01). No systematic
//    sparing. The exception worth naming is T7: 51 negative of 75 is 3.1 sd
//    from an even split, yet its MEAN n0 is POSITIVE (+10.33) — spared more
//    often, hit harder when hit. With D = 15 the T7 row is also the one where
//    rel.dev of K(0) reaches 1.00 and 4.03, i.e. K(0) = 0 or several times the
//    mean; T7 is too small for these statistics and should not be read as a
//    trend endpoint.
// 8. SCOPE AND ONE HEADER SLIP. The printed grid shows 15-20 folding primes per
//    tile; S5's "folds" column shows the summaries run over 70-75. So the grid
//    is a displayed SAMPLE and the per-tile maxima (e.g. T23's 8,706) come from
//    primes not shown. Header S2 says "folding primes 5..401"; every sweep in
//    fact starts at the first prime above x (T7 starts at 11), so 5 and 7 never
//    fold anything. Runtime 2.3 s.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure:
//   "-22275", "-378675" and "-7952175" in reading 1 are the quantity -D of the
//   identity N(a) = p*h(a) - D. The magnitudes are the D column of the S2/S3
//   grid, printed there as 22275 at T17, 378675 at T19 and 7952175 at T23; the
//   leading minus is the identity's sign, not part of any printed value. The
//   three congruences check: -22275 = 12 (mod 19), -378675 = 20 (mod 23),
//   -7952175 = 2 (mod 29), matching the three S1 checksum lines.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   the fifteen ratios 16.9 through 20.1 in reading 3 are the T23 grid's
//   max|N| column divided by its fold-p column, row by row, from 491/29 at
//   p = 29 to 8076/401 at p = 401. Reading 3 already declares them as
//   arithmetic on the pasted table rather than a run. The seventeen T17
//   ratios 3.6 through 7.5 in the same reading are the same division on the
//   T17 rows, 69/19 up to 3027/401. Every one of the thirty-two divisions
//   reproduces the quoted value.
// ---------------------------------------------------------------------------
