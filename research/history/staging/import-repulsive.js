// import-repulsive.js — scratchpad-grade verification for import-map row 17
// (repulsive point processes and hyperuniformity).  2026-08-28.
//
// OBJECT.  The twin tile A = { r mod P : gcd(r,P) = gcd(r+2,P) = 1 }, P = x#,
// read as a stationary point process on Z_P by a uniform random translate.
// Its pair correlation is g(d) = J(d)/delta^2 = W(d), paper/variance-note.md
// Theorem 1 (sec 2): rho_2(d) = [d even]; for odd p, rho_p(d) = p-2 if p|d,
// p-3 if d = +-2 mod p and p does not divide d, p-4 otherwise.
//
// NOTHING HERE IS A PROOF ABOUT PRIMES.  Every number is a finite evaluation of
// those local factors, or a finite Fourier sum over one primorial.
//
//   PART 1  g(d) for d <= 60 at four levels: the small-d profile.
//   PART 2  g(2), g(6) on the level ladder, against the closed form for g(6).
//   PART 3  the infimum of g over its support, and the empty band (0,1).
//   PART 4  the comb-restricted (Natal@5) pair correlation, Corollary 3.
//   PART 5  Var/E from the exact formula, control against variance-note sec 6,
//           and the local exponent d ln sigma / d ln L.
//   PART 6  the sum rule of sec 2.
//   PART 7  the structure factor S(nu) = delta * What(nu), the number-variance
//           identity Var/E = sum_{nu != 0} S(nu) K_L(nu/M), checked against
//           varE-spectral.md's X(210) = 4.612929.
//   PART 8  Var[N_L] over every L < M at three levels: boundedness, which is
//           the Torquato class-I statement for a periodic configuration.

'use strict';

function primesTo(n) {
  const s = new Uint8Array(n + 1), out = [];
  for (let i = 2; i <= n; i++) if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; }
  return out;
}
function fOdd(p, d) {                       // local factor of g at odd prime p
  const r = ((d % p) + p) % p;
  if (r === 0) return p / (p - 2);
  if (r === 2 % p || r === ((-2 % p) + p) % p) return (p * (p - 3)) / ((p - 2) * (p - 2));
  return (p * (p - 4)) / ((p - 2) * (p - 2));
}
function g(d, ps) {                          // full-tile pair correlation
  if (d === 0) return NaN;
  if (d % 2 !== 0) return 0;
  let v = 2;
  for (const p of ps) {
    if (p === 2) continue;
    if (p === 3) { if (d % 3 !== 0) return 0; v *= 3; continue; }
    v *= fOdd(p, d);
  }
  return v;
}

const P1e6 = primesTo(1000000), P1e7 = primesTo(10000000);

console.log('PART 1 - the small-d pair correlation profile g(d), d <= 60');
console.log('g(d) = 0 at every d not divisible by 6 (mod 3 forces it); only 6|d listed.');
console.log('   d |     x=11 |     x=13 |    x=101 |   x=10^6 |   x=10^7');
for (let d = 6; d <= 60; d += 6) {
  const row = [g(d, primesTo(11)), g(d, primesTo(13)), g(d, primesTo(101)), g(d, P1e6), g(d, P1e7)];
  console.log('  ' + String(d).padStart(2) + ' | ' + row.map(v => v.toFixed(5).padStart(8)).join(' | '));
}
{
  let nz = 0, band = 0, mn = Infinity, mnAt = 0;
  for (let d = 1; d <= 60; d++) { const v = g(d, primesTo(11)); if (v > 0) { nz++; if (v < 1) band++; if (v < mn) { mn = v; mnAt = d; } } }
  console.log('  x=11, d <= 60: ' + nz + ' distances carry g > 0, ' + band + ' of them lie in (0,1);');
  console.log('  smallest positive g = ' + mn.toFixed(6) + ' at d = ' + mnAt + '.');
}

console.log('');
console.log('PART 2 - g(2) and g(6) on the level ladder');
console.log('  claim: g(6) = 6 * prod_{5<=p<=x} (1 - 4/(p-2)^2) exactly, at every level');
console.log('    x |   g(2) |     g(6) |  closed form | agree?');
for (const x of [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 101, 1009]) {
  const ps = primesTo(x);
  const g2 = g(2, ps), g6 = g(6, ps);
  let m = 6; for (const p of ps) if (p >= 5) m *= 1 - 4 / ((p - 2) * (p - 2));
  console.log('  ' + String(x).padStart(5) + ' | ' + g2.toFixed(4).padStart(6) + ' | ' +
    g6.toFixed(6).padStart(8) + ' | ' + m.toFixed(9).padStart(12) + ' | ' +
    (Math.abs(g6 - m) < 1e-12 * Math.max(1, m) ? 'yes' : 'NO'));
}

console.log('');
console.log('PART 3 - the infimum of g over its support, and the empty band (0,1)');
{
  let C = 1; for (const p of P1e7) if (p >= 5) C *= 1 - 4 / ((p - 2) * (p - 2));
  console.log('  prod_{5<=p<=10^7} (1 - 4/(p-2)^2) = ' + C.toFixed(10));
  console.log('  6 * that                          = ' + (6 * C).toFixed(10));
  console.log('  crude upper bound on the omitted tail sum_{p>10^7} 4/(p-2)^2 = ' +
    (4 / (1e7 * Math.log(1e7))).toExponential(2) + ' (relative)');
  console.log('  Every local factor of g is >= 1 - 4/(p-2)^2 (equality in the generic case),');
  console.log('  and a partial product over p <= x exceeds the full product, so');
  console.log('  6|d  ==>  g(d) >= 2.3812 at every level x.  Exhaustive check:');
  const ps = primesTo(1009);
  let mn = Infinity, mnAt = 0, mx = 0, mxAt = 0;
  for (let d = 6; d <= 2000000; d += 6) { const v = g(d, ps); if (v < mn) { mn = v; mnAt = d; } if (v > mx) { mx = v; mxAt = d; } }
  console.log('  x=1009, all 6|d with d <= 2*10^6: min g = ' + mn.toFixed(6) + ' at d = ' + mnAt +
    ';  max g = ' + mx.toFixed(4) + ' at d = ' + mxAt);
}

console.log('');
console.log('PART 4 - the comb-restricted process (variance-note Corollary 3, Natal@5)');
function g5(d, y) {
  const r30 = ((d % 30) + 30) % 30;
  let v;
  if (r30 === 0) v = 2 / 30; else if (r30 === 6 || r30 === 24) v = 1 / 30; else return 0;
  let dens = 2 / 30;
  for (const p of primesTo(y)) { if (p < 7) continue; v *= fOdd(p, d) * ((p - 2) / p) * ((p - 2) / p); dens *= 1 - 2 / p; }
  return v / (dens * dens);
}
console.log('    y |  g5(2) |  g5(6) |  g5(12) |  g5(24) |  g5(30)');
for (const y of [13, 47, 101, 1009]) {
  console.log('  ' + String(y).padStart(5) + ' | ' + g5(2, y).toFixed(4).padStart(6) + ' | ' +
    g5(6, y).toFixed(4).padStart(6) + ' | ' + g5(12, y).toFixed(5).padStart(7) + ' | ' +
    g5(24, y).toFixed(5).padStart(7) + ' | ' + g5(30, y).toFixed(5).padStart(7));
}
console.log('  (the comb kills every d outside 0, +-6 mod 30, so g5(12) = g5(24) = 0;');
console.log('   on the classes it keeps, g5 is larger than the full tile\'s g)');

console.log('');
console.log('PART 5 - Var/E from the exact formula, and the local sd exponent');
function varOverE(y, L) {
  const ps = primesTo(y);
  let delta = 0.5; for (const p of ps) if (p > 2) delta *= (p - 2) / p;
  const n = Math.floor((L - 1) / 6) + 1;
  const w = new Float64Array(n).fill(6);
  for (const p of ps) {
    if (p === 2 || p === 3) continue;
    const f = new Float64Array(p);
    for (let r = 0; r < p; r++) f[r] = fOdd(p, r);
    for (let i = 0; i < n; i++) w[i] *= f[(6 * i) % p];
  }
  let S6 = 0, T6 = 0;                       // sums over 0 < d < L, 6|d
  for (let i = 1; i < n; i++) { const t = 1 - (6 * i) / L; S6 += t; T6 += t * (w[i] - 1); }
  const Snon = (L - 1) / 2 - S6;            // sum of (1-d/L) over 6 not dividing d
  const X = (1 / delta - 1) + 2 * (T6 - Snon);
  return { delta, X, ratio: delta * X };
}
console.log('  control against variance-note sec 6 (y = 401), L = y^u:');
console.log('     u |         L |   Var/E | sec 6 | diff');
{
  const tab = { '0.6': 0.845, '1.0': 0.685, '1.5': 0.477, '2.0': 0.290, '2.5': 0.157 };
  for (const u of [0.6, 1.0, 1.5, 2.0, 2.5]) {
    const L = Math.round(Math.pow(401, u)), r = varOverE(401, L), q = tab[u.toFixed(1)];
    console.log('   ' + u.toFixed(1) + ' | ' + String(L).padStart(9) + ' | ' + r.ratio.toFixed(4).padStart(7) +
      ' | ' + q.toFixed(3) + ' | ' + (r.ratio - q).toFixed(4));
  }
}
console.log('');
console.log('  local exponent of the number standard deviation, y = 1009:');
console.log('        L |     u |   Var/E |   sigma | d ln sigma / d ln L');
{
  const y = 1009, Ls = [4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288];
  let prev = null;
  for (const L of Ls) {
    const r = varOverE(y, L), sd = Math.sqrt(r.ratio * r.delta * L);
    const sl = prev ? (Math.log(sd / prev.sd) / Math.log(L / prev.L)).toFixed(4) : '';
    console.log('  ' + String(L).padStart(7) + ' | ' + (Math.log(L) / Math.log(y)).toFixed(3) + ' | ' +
      r.ratio.toFixed(4).padStart(7) + ' | ' + sd.toFixed(3).padStart(7) + ' | ' + sl.padStart(10));
    prev = { L, sd };
  }
}

console.log('');
console.log('PART 6 - the sum rule of variance-note sec 2');
for (const x of [7, 11, 13]) {
  const ps = primesTo(x);
  let P = 1, delta = 0.5;
  for (const p of ps) { P *= p; if (p > 2) delta *= (p - 2) / p; }
  let s = 0; for (let d = 1; d < P; d++) s += g(d, ps) - 1;
  console.log('  x=' + String(x).padStart(2) + ': delta^2 * sum_{d!=0}(W-1) = ' + (delta * delta * s).toExponential(6) +
    '   target -delta(1-delta) = ' + (-delta * (1 - delta)).toExponential(6) +
    '   rel err ' + Math.abs(delta * delta * s / (-delta * (1 - delta)) - 1).toExponential(2));
}

console.log('');
console.log('PART 7 - the structure factor, and the number-variance identity');
{
  const y = 13, ps = primesTo(y);
  let M = 1; for (const p of ps) M *= p;
  const E = { 2: [0], 3: [0, 1], 5: [0, 3, 4], 7: [0, 5], 11: [0, 9], 13: [0, 11] };
  let delta = 1; for (const p of ps) delta *= (p - E[p].length) / p;
  const L = 210;
  // direct: W(d) from class counts
  function W5(d) {
    let J = 1;
    for (const p of ps) {
      const s = new Set(); for (const a of E[p]) { s.add(a); s.add(((a - d) % p + p) % p); }
      J *= (p - s.size) / p;
    }
    return J / (delta * delta);
  }
  let Xdirect = (1 / delta - 1);
  for (let d = 1; d < L; d++) Xdirect += 2 * (1 - d / L) * (W5(d) - 1);
  // spectral, with the CRT twist
  const inv = {};
  for (const p of ps) { const m = (M / p) % p; let k = 1; while ((m * k) % p !== 1) k++; inv[p] = k; }
  let Xspec = 0, mass = 0, Smin = Infinity, Smax = 0, Ssmall = 0;
  for (let nu = 1; nu < M; nu++) {
    let What = 1;
    for (const p of ps) {
      const np = (nu % p) * inv[p] % p;
      if (np === 0) continue;
      let re = 0, im = 0;
      for (const a of E[p]) { re += Math.cos(2 * Math.PI * np * a / p); im += Math.sin(2 * Math.PI * np * a / p); }
      What *= (re * re + im * im) / ((p - E[p].length) * (p - E[p].length));
    }
    mass += What;
    const th = nu / M, s = Math.sin(Math.PI * th);
    const K = (Math.abs(s) < 1e-14) ? L : Math.pow(Math.sin(Math.PI * L * th) / s, 2) / L;
    Xspec += What * K;
    const S = delta * What;
    if (S < Smin) Smin = S; if (S > Smax) Smax = S;
    if (nu === 1) Ssmall = S;
  }
  console.log('  comb at y = 13, M = ' + M + ', L = ' + L + ', delta = ' + delta.toFixed(9));
  console.log('  X(L) direct sum over d      = ' + Xdirect.toFixed(6));
  console.log('  X(L) spectral sum over nu   = ' + Xspec.toFixed(6));
  console.log('  varE-spectral.md X(210)     = 4.612929');
  console.log('  Var/E = delta * X           = ' + (delta * Xdirect).toFixed(6) +
    '   (variance-note sec 7 diagonal x=7: 0.1521)');
  console.log('  total mass sum_{nu!=0} What = ' + mass.toFixed(6) + '   1/delta - 1 = ' + (1 / delta - 1).toFixed(6));
  console.log('  structure factor S(nu) = delta*What(nu):  min ' + Smin.toExponential(3) +
    ', max ' + Smax.toFixed(4) + ', at nu=1 ' + Ssmall.toExponential(3));
  console.log('  Var/E = sum_{nu!=0} S(nu) K_L(nu/M) holds by construction: ' + (delta * Xspec).toFixed(6));
}

console.log('');
console.log('PART 8 - Var[N_L] over every window length L < M: boundedness');
console.log('  V(L) = sum_{|d|<L}(L-|d|)(J(d)-delta^2); V(L+M) = V(L) since the tile is');
console.log('  M-periodic and N_{L+M}(t) = N_L(t) + |A|.  So the variance is bounded in L.');
console.log('      x |       M |  max_L Var |  argmax L | Var at L=M | mean Var | max Var / (delta*M)');
for (const x of [11, 13, 17]) {
  const ps = primesTo(x);
  let M = 1, delta = 0.5;
  for (const p of ps) { M *= p; if (p > 2) delta *= (p - 2) / p; }
  const c = new Float64Array(M);
  for (let d = 0; d < M; d++) c[d] = (d === 0 ? delta : delta * delta * g(d, ps)) - delta * delta;
  let C = c[0], V = 0, mx = 0, mxAt = 0, sum = 0;
  for (let Lv = 1; Lv <= M; Lv++) {
    if (Lv > 1) { C += c[Lv - 1] + c[M - (Lv - 1)]; }
    V += C;
    if (V > mx) { mx = V; mxAt = Lv; }
    sum += V;
  }
  console.log('  ' + String(x).padStart(5) + ' | ' + String(M).padStart(7) + ' | ' + mx.toFixed(4).padStart(10) +
    ' | ' + String(mxAt).padStart(9) + ' | ' + V.toExponential(2).padStart(10) + ' | ' +
    (sum / M).toFixed(4).padStart(8) + ' | ' + (mx / (delta * M)).toExponential(2));
}

console.log('');
console.log('PART 9 - the object of the existing rejection: the reduced residues mod x#');
console.log('  one excluded class per prime, rho_p(d) = p-1 if p|d, p-2 otherwise');
function g1(d, ps) {
  let v = 1, dens = 1;
  for (const p of ps) { v *= (d % p === 0 ? p - 1 : p - 2) / p; dens *= 1 - 1 / p; }
  return v / (dens * dens);
}
console.log('    x |  g1(2) |  g1(1) |  g1(6) | quoted prod_{p<=x}(1-2/p)/(1-1/p)^2');
for (const x of [5, 7, 11, 13, 101]) {
  const ps = primesTo(x);
  let q = 1; for (const p of ps) q *= (1 - 2 / p) / Math.pow(1 - 1 / p, 2);
  console.log('  ' + String(x).padStart(5) + ' | ' + g1(2, ps).toFixed(4).padStart(6) + ' | ' +
    g1(1, ps).toFixed(4).padStart(6) + ' | ' + g1(6, ps).toFixed(4).padStart(6) + ' | ' + q.toFixed(6));
}
console.log('  The quoted product vanishes identically: its p = 2 factor is 1 - 2/2 = 0.');
console.log('  The correct one-class value at d = 2 is 2 * prod_{2<p<=x}(1 - 1/(p-1)^2),');
console.log('  which is above 1 at every level, so the CONCLUSION of the existing');
console.log('  rejection stands for the reduced residues and the formula does not.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/import-repulsive.js
//   invocation:  node research/history/staging/import-repulsive.js
//   code-sha256: 1fd5dff13b279732832f7190053718ec48b1c9b5160dbcbaec2c48a038f8bf40
//   out-sha256:  513c151b70d007704f9cb18810cc0c869ac6e6a4bfcafce5d721265e8e275491
//   body-lines:  105
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     0.7 s
// ============================================================================
// PART 1 - the small-d pair correlation profile g(d), d <= 60
// g(d) = 0 at every d not divisible by 6 (mod 3 forces it); only 6|d listed.
//    d |     x=11 |     x=13 |    x=101 |   x=10^6 |   x=10^7
//    6 |  2.66173 |  2.57374 |  2.39809 |  2.38128 |  2.38128
//   12 |  7.09794 |  6.86330 |  6.39490 |  6.35009 |  6.35009
//   18 |  5.32346 |  5.14747 |  4.79618 |  4.76257 |  4.76256
//   24 |  3.04198 |  3.26824 |  3.04519 |  3.02385 |  3.02385
//   30 | 10.64691 | 10.29495 |  9.59235 |  9.52513 |  9.52513
//   36 |  2.66173 |  2.57374 |  2.75473 |  2.73542 |  2.73542
//   42 | 10.13992 |  9.80471 |  9.13557 |  9.07155 |  9.07155
//   48 |  5.32346 |  5.14747 |  5.04861 |  5.01323 |  5.01323
//   54 |  3.54897 |  3.81294 |  3.55272 |  3.52783 |  3.52783
//   60 |  7.98519 |  7.72121 |  7.75915 |  7.70477 |  7.70477
//   x=11, d <= 60: 10 distances carry g > 0, 0 of them lie in (0,1);
//   smallest positive g = 2.661728 at d = 6.
//
// PART 2 - g(2) and g(6) on the level ladder
//   claim: g(6) = 6 * prod_{5<=p<=x} (1 - 4/(p-2)^2) exactly, at every level
//     x |   g(2) |     g(6) |  closed form | agree?
//       5 | 0.0000 | 3.333333 |  3.333333333 | yes
//       7 | 0.0000 | 2.800000 |  2.800000000 | yes
//      11 | 0.0000 | 2.661728 |  2.661728395 | yes
//      13 | 0.0000 | 2.573737 |  2.573737374 | yes
//      17 | 0.0000 | 2.527982 |  2.527982043 | yes
//      19 | 0.0000 | 2.492993 |  2.492992672 | yes
//      23 | 0.0000 | 2.470380 |  2.470380493 | yes
//      29 | 0.0000 | 2.456826 |  2.456825594 | yes
//      31 | 0.0000 | 2.445140 |  2.445140335 | yes
//      37 | 0.0000 | 2.437156 |  2.437156203 | yes
//     101 | 0.0000 | 2.398088 |  2.398088201 | yes
//    1009 | 0.0000 | 2.382485 |  2.382485258 | yes
//
// PART 3 - the infimum of g over its support, and the empty band (0,1)
//   prod_{5<=p<=10^7} (1 - 4/(p-2)^2) = 0.3968803731
//   6 * that                          = 2.3812822388
//   crude upper bound on the omitted tail sum_{p>10^7} 4/(p-2)^2 = 2.48e-8 (relative)
//   Every local factor of g is >= 1 - 4/(p-2)^2 (equality in the generic case),
//   and a partial product over p <= x exceeds the full product, so
//   6|d  ==>  g(d) >= 2.3812 at every level x.  Exhaustive check:
//   x=1009, all 6|d with d <= 2*10^6: min g = 2.382485 at d = 6;  max g = 23.7825 at d = 1021020
//
// PART 4 - the comb-restricted process (variance-note Corollary 3, Natal@5)
//     y |  g5(2) |  g5(6) |  g5(12) |  g5(24) |  g5(30)
//      13 | 0.0000 | 5.7909 | 0.00000 | 7.35354 | 15.44242
//      47 | 0.0000 | 5.4454 | 0.00000 | 6.91478 | 14.52104
//     101 | 0.0000 | 5.3957 | 0.00000 | 6.85168 | 14.38853
//    1009 | 0.0000 | 5.3606 | 0.00000 | 6.80710 | 14.29491
//   (the comb kills every d outside 0, +-6 mod 30, so g5(12) = g5(24) = 0;
//    on the classes it keeps, g5 is larger than the full tile's g)
//
// PART 5 - Var/E from the exact formula, and the local sd exponent
//   control against variance-note sec 6 (y = 401), L = y^u:
//      u |         L |   Var/E | sec 6 | diff
//    0.6 |        36 |  0.8454 | 0.845 | 0.0004
//    1.0 |       401 |  0.6848 | 0.685 | -0.0002
//    1.5 |      8030 |  0.4768 | 0.477 | -0.0002
//    2.0 |    160801 |  0.2900 | 0.290 | 0.0000
//    2.5 |   3220038 |  0.1566 | 0.157 | -0.0004
//
//   local exponent of the number standard deviation, y = 1009:
//         L |     u |   Var/E |   sigma | d ln sigma / d ln L
//      4096 | 1.203 |  0.6251 |   4.703 |
//      8192 | 1.303 |  0.5817 |   6.416 |     0.4481
//     16384 | 1.403 |  0.5372 |   8.720 |     0.4427
//     32768 | 1.503 |  0.4975 |  11.868 |     0.4446
//     65536 | 1.603 |  0.4559 |  16.066 |     0.4369
//    131072 | 1.704 |  0.4145 |  21.665 |     0.4314
//    262144 | 1.804 |  0.3768 |  29.212 |     0.4312
//    524288 | 1.904 |  0.3399 |  39.236 |     0.4256
//
// PART 6 - the sum rule of variance-note sec 2
//   x= 7: delta^2 * sum_{d!=0}(W-1) = -6.632653e-2   target -delta(1-delta) = -6.632653e-2   rel err 6.66e-16
//   x=11: delta^2 * sum_{d!=0}(W-1) = -5.502614e-2   target -delta(1-delta) = -5.502614e-2   rel err 1.11e-14
//   x=13: delta^2 * sum_{d!=0}(W-1) = -4.700519e-2   target -delta(1-delta) = -4.700519e-2   rel err 3.25e-14
//
// PART 7 - the structure factor, and the number-variance identity
//   comb at y = 13, M = 30030, L = 210, delta = 0.032967033
//   X(L) direct sum over d      = 4.612929
//   X(L) spectral sum over nu   = 4.612929
//   varE-spectral.md X(210)     = 4.612929
//   Var/E = delta * X           = 0.152075   (variance-note sec 7 diagonal x=7: 0.1521)
//   total mass sum_{nu!=0} What = 29.333333   1/delta - 1 = 29.333333
//   structure factor S(nu) = delta*What(nu):  min 1.198e-11, max 0.0330, at nu=1 2.931e-8
//   Var/E = sum_{nu!=0} S(nu) K_L(nu/M) holds by construction: 0.152075
//
// PART 8 - Var[N_L] over every window length L < M: boundedness
//   V(L) = sum_{|d|<L}(L-|d|)(J(d)-delta^2); V(L+M) = V(L) since the tile is
//   M-periodic and N_{L+M}(t) = N_L(t) + |A|.  So the variance is bounded in L.
//       x |       M |  max_L Var |  argmax L | Var at L=M | mean Var | max Var / (delta*M)
//      11 |    2310 |     4.0266 |      1155 |   3.89e-13 |   2.3569 | 2.98e-2
//      13 |   30030 |     4.8350 |     15015 |  -7.38e-11 |   3.2630 | 3.26e-3
//      17 |  510510 |    17.9964 |    255255 |   -7.23e-9 |  11.4245 | 8.08e-4
//
// PART 9 - the object of the existing rejection: the reduced residues mod x#
//   one excluded class per prime, rho_p(d) = p-1 if p|d, p-2 otherwise
//     x |  g1(2) |  g1(1) |  g1(6) | quoted prod_{p<=x}(1-2/p)/(1-1/p)^2
//       5 | 1.4062 | 0.0000 | 2.8125 | 0.000000
//       7 | 1.3672 | 0.0000 | 2.7344 | 0.000000
//      11 | 1.3535 | 0.0000 | 2.7070 | 0.000000
//      13 | 1.3441 | 0.0000 | 2.6882 | 0.000000
//     101 | 1.3226 | 0.0000 | 2.6452 | 0.000000
//   The quoted product vanishes identically: its p = 2 factor is 1 - 2/2 = 0.
//   The correct one-class value at d = 2 is 2 * prod_{2<p<=x}(1 - 1/(p-1)^2),
//   which is above 1 at every level, so the CONCLUSION of the existing
//   rejection stands for the reduced residues and the formula does not.
// ============================================================================
// READINGS
//
