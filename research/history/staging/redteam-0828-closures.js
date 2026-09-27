// redteam-0828-closures.js — the adversarial verifier's OWN re-derivations for
// the five 2026-08-28 closure notes. Companion to redteam-0828-closures.md.
//
// HOUSE METHOD: refuted-until-rederived. Nothing here reads a target note's
// script for a number it can compute itself. The G2 ladder is retyped from
// OEIS A144311 and cross-checked against research/exact-g2-ladder.js on the
// 14-term overlap; every pi(), every product, every threshold is computed here.
//
// SECTIONS
//   R1  hsubpow-explicit-K: the legal zone at both grades, the trap, the
//       power-pair defect. All independently re-derived.
//   R2  hsubpow-explicit-K: Lemma 1 (K* >= pi(y')-pi(y)) against the eleven
//       cited doubling certificates, and the first-y thresholds. THE DEFECT:
//       y = 117 belongs to K = 1.3555, not to K = 1.3946 (that is y = 122).
//   R3  hsubpow-explicit-K: theta_b(y) at three bases and the 1/V(y) floor.
//   R4  rho2-analytic-bound: the constant 170.88 and FORM I* at z = 47.
//   R5  rho2-analytic-bound: THE DEFECT. The cited R1f column is C_L = 1 with
//       the MEASURED mean square, not the "absolute floor C_L = ms = 1".
//       The true absolute floor CLEARS at z = 41 and 43.
//   R6  rho2-analytic-bound: THE DEFECT. The quoted Rosser-Schoenfeld form is
//       FALSE at z = 109 and z = 113 in the note's own p < z convention.
//
// usage: node research/history/staging/redteam-0828-closures.js   (~25 s)
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..');
const GAMMA = 0.5772156649015329;
const BETA2 = 4.26645028414864191641;
const pad = (s, n) => String(s).padStart(n);
const F = (v, d = 4) => (v >= 0 ? ' ' : '') + v.toFixed(d);
let FAILS = 0;
const check = (label, ok, detail) => {
  if (!ok) FAILS++;
  console.log('  ' + (ok ? 'ok  ' : 'FAIL') + '  ' + label + (detail ? '   ' + detail : ''));
};

// --- the ladder, retyped here from OEIS A144311 (a(n) = G2(p_n#) - 1) -------
const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
  707, 869, 965, 1079, 1283, 1397, 1529, 1709];
const G2 = A144311.map(v => v + 1);

// --- one sieve for the whole file ------------------------------------------
const LIM = 33000000;
const halfN = (LIM >> 1) + 1;
const comp = new Uint8Array(halfN);
for (let i = 1; (2 * i + 1) * (2 * i + 1) <= LIM; i++)
  if (!comp[i]) { const q = 2 * i + 1; for (let j = (q * q - 1) >> 1; j < halfN; j += q) comp[j] = 1; }
const isP = n => (n === 2 ? true : (n < 2 || n % 2 === 0) ? false : !comp[(n - 1) >> 1]);

console.log('=== R0. CUSTODY: the retyped ladder against the corpus keeper =======');
{
  const src = fs.readFileSync(path.join(REPO, 'research/exact-g2-ladder.js'), 'utf8');
  const ex = [];
  const re = /\{ x: (\d+),\s+g: (\d+),/g;
  let m; while ((m = re.exec(src)) !== null) ex.push({ x: +m[1], g: +m[2] });
  let ok = ex.length === 14;
  for (let i = 0; i < 14; i++) ok = ok && ex[i].x === PR[i] && ex[i].g === G2[i];
  check('retyped A144311+1 == exact-g2-ladder.js on all 14 exact terms', ok, 'n=' + ex.length);
  check('G2(61#) = 1080 (the trusted floor rests on it)', G2[17] === 1080, String(G2[17]));
  check('G2(79#) = 1710 (the trusted ceiling rests on it)', G2[21] === 1710, String(G2[21]));
  check('G2(43#) = 618 (the custody ceiling rests on it)', G2[13] === 618, String(G2[13]));
}

// Ghat(t) = G2(P(t)#), P(t) the largest ladder prime <= t, ladder capped at `cap`.
const Gh = (t, cap) => { let k = -1; for (let i = 0; i < PR.length && PR[i] <= cap; i++) if (PR[i] <= t) k = i; return k < 0 ? null : G2[k]; };

console.log('');
console.log('=== R1. THE LEGAL ZONE, RE-DERIVED FROM THE LADDER ==================');
console.log('  legal floor   = max_b S(b),  S(b)  = 2 ln b - ln Ghat(b)     (K < S(b) => beta < 2 => TPC)');
console.log('  legal ceiling = max_b Cb(b), Cb(b) = beta2 ln b - ln Ghat(b) (K < Cb(b) => beta < beta2)');
function zone(cap, nmax, label) {
  let S = -Infinity, bS = 0, C = -Infinity, bC = 0;
  for (let b = 2; b < nmax; b++) {
    const g = Gh(b, cap); if (!g) continue;
    const s = 2 * Math.log(b) - Math.log(g), c = BETA2 * Math.log(b) - Math.log(g);
    if (s > S) { S = s; bS = b; } if (c > C) { C = c; bC = b; }
  }
  console.log('  ' + label + ': [' + F(S) + ', ' + F(C) + ')  width ' + F(C - S)
    + '  argmaxes b = ' + bS + ' (floor), b = ' + bC + ' (ceiling)');
  return { S, bS, C, bC };
}
const cus = zone(43, 47, 'custody (14 exact terms, Ghat on [2,47))');
const tru = zone(79, 83, 'trusted (22-term A144311,  Ghat on [2,83))');
{
  const s16 = 2 * Math.log(16) - Math.log(66), c16 = BETA2 * Math.log(16) - Math.log(66);
  console.log('  base-16 values as quoted in TODO 1d: S(16) = ' + s16.toFixed(6) + ', Cb(16) = ' + c16.toFixed(6));
  check('S(16) = 1.3555', Math.abs(s16 - 1.355523) < 1e-6);
  check('Cb(16) = 7.639457 (quoted 7.6394 = truncation, the safe direction)', Math.abs(c16 - 7.639457) < 1e-6);
  check('custody zone [1.3555, 9.9082) at b = 16 and b = 46',
    Math.abs(cus.S - 1.3555) < 5e-5 && cus.bS === 16 && Math.abs(cus.C - 9.9082) < 5e-5 && cus.bC === 46);
  check('trusted zone [1.3946, 11.3568) at b = 66 and b = 82',
    Math.abs(tru.S - 1.3946) < 5e-5 && tru.bS === 66 && Math.abs(tru.C - 11.3568) < 5e-5 && tru.bC === 82);
  check('TPC-implying sliver the quoted floor calls legal = 0.0391 nats',
    Math.abs((tru.S - s16) - 0.0391) < 5e-5, (tru.S - s16).toFixed(4));
  check('legal room the quoted ceiling forfeits = 3.7173 nats',
    Math.abs((tru.C - c16) - 3.7173) < 5e-5, (tru.C - c16).toFixed(4));
  check('trusted zone width 9.9622 nats', Math.abs((tru.C - tru.S) - 9.9622) < 5e-5);
}
{
  // the power-pair sup defect: max over reachable (b,k) of f(b^{k+1}) - f(b^k) - f(b)
  const pp = (cap, nmax) => {
    let best = -Infinity, at = null, n = 0;
    for (let b = 2; b < nmax; b++) for (let k = 1; Math.pow(b, k + 1) < nmax; k++) {
      const a = Gh(Math.pow(b, k + 1), cap), c = Gh(Math.pow(b, k), cap), d = Gh(b, cap);
      if (!a || !c || !d) continue; n++;
      const v = Math.log(a) - Math.log(c) - Math.log(d);
      if (v > best) { best = v; at = b + '^' + k; }
    }
    return { best, at, n };
  };
  const pt = pp(79, 83), pc = pp(43, 47);
  console.log('  power-pair sup defect: trusted ' + pt.best.toFixed(4) + ' at b^k = ' + pt.at
    + ' (' + pt.n + ' pairs);  custody ' + pc.best.toFixed(4) + ' at ' + pc.at + ' (' + pc.n + ' pairs)');
  check('trusted trap [1.0033, 1.3946), width 0.3913',
    Math.abs(pt.best - 1.0033) < 5e-5 && Math.abs((tru.S - pt.best) - 0.3913) < 5e-5);
  check('custody trap width 0.3861', Math.abs((cus.S - pc.best) - 0.3861) < 5e-5);
  let unord = 0; for (let s = 2; s <= 82; s++) for (let t = s; s * t <= 82; t++) unord++;
  console.log('  the note\'s "111 reachable pairs" is the UNORDERED (H-sub) count st <= 82 = ' + unord
    + ';  reachable POWER pairs (what (H-sub-pow) quantifies over) = ' + pt.n);
  check('111 is the (H-sub) pair count, not the power-pair count', unord === 111 && pt.n === 15);
}

console.log('');
console.log('=== R2. LEMMA 1 (K* >= pi(y\') - pi(y)) AND THE FIRST-y THRESHOLDS ==');
{
  const pi = x => { let c = 0; for (let n = 2; n <= x; n++) if (isP(n)) c++; return c; };
  // K*+1 certificates QUOTED from attack-doubling-01.md sec.3 (cited, not recomputed);
  // the doubling steps s -> 2s they belong to.
  const STEPS = [[2, 3], [3, 2], [4, 5], [5, 3], [6, 4], [7, 4], [9, 6], [10, 9], [11, 7], [12, 11], [13, 9]];
  let hold = true, lo = Infinity, hi = -Infinity;
  console.log('    s   N = pi(2s)-pi(s)   K* (cited)   K*/N   D_s   K* >= N ?');
  for (const [s, cert] of STEPS) {
    const N = pi(2 * s) - pi(s), K = cert - 1;
    let D = 1; for (let q = 3; q <= s; q++) if (isP(q)) D *= (q - 2);
    const ok = K >= N; hold = hold && ok;
    const r = K / N; if (r < lo) lo = r; if (r > hi) hi = r;
    console.log('   ' + pad(s, 3) + pad(N, 17) + pad(K, 13) + '   ' + r.toFixed(2)
      + pad(D, 8) + '     ' + (ok ? 'yes' : 'NO'));
  }
  check('K* >= pi(2s) - pi(s) at all eleven cited doubling steps', hold);
  check('K*/N runs 1.00 to 2.67 as the note reports',
    Math.abs(lo - 1.00) < 5e-3 && Math.abs(hi - 2.67) < 5e-3, lo.toFixed(2) + '..' + hi.toFixed(2));
  // Lemma 1's hypothesis at the note's own counterexample point
  let D5 = 1; for (const q of [3, 5]) D5 *= (q - 2);
  check('D_5 = 3 < N = 19 at y = 5, b = 16 (the note\'s stated small-y exception)',
    D5 === 3 && (pi(80) - pi(5)) === 19);

  // the first y at which the certificate floor breaks the cap 66 e^K
  console.log('  first y with pi(16y) - pi(y) > 66 e^K   (the note\'s own test, sec.G):');
  const caps = [1.3555, 1.3946, 7.6394].map(K => ({ K, cap: Math.exp(K) * 66, y: null }));
  let N = 0, h = 0, l = 0;
  for (let y = 2; 16 * y <= LIM; y++) {
    while (h < 16 * y) { h++; if (isP(h)) N++; }
    while (l < y) { l++; if (isP(l)) N--; }
    for (const c of caps) if (c.y === null && N > c.cap) c.y = { y, N };
    if (caps.every(c => c.y !== null)) break;
  }
  for (const c of caps)
    console.log('    K = ' + F(c.K) + '  cap = ' + pad(Math.round(c.cap), 7)
      + '   first y = ' + pad(c.y.y, 7) + '  (N = ' + c.y.N + ', rung k = '
      + Math.ceil(Math.log(c.y.y) / Math.log(16)) + ')');
  check('y = 117 is the K = 1.3555 row, NOT the K = 1.3946 row', caps[0].y.y === 117);
  check('the K = 1.3946 row is y = 122  <- the note sec.2c and READING 4 say 117', caps[1].y.y === 122);
  check('the K = 7.6394 row is y = 124978 as the note states', caps[2].y.y === 124978);
  console.log('  Both rows land at rung k = 2, so the RUNG claim survives the mis-attribution.');
  console.log('  Note also: pi(by) - pi(y) ~ (b-1) y / ln y IS o(y), i.e. sublinear in the level.');
  console.log('  What Lemma 1 refutes is BOUNDEDNESS, which is what the route needs; the note\'s');
  console.log('  sentence "K* is not sublinear" (sec.0 item 2, sec.2c, SEC D) is false as written.');
}

console.log('');
console.log('=== R3. theta_b(y) AND THE 1/V(y) FLOOR ============================');
{
  const th = (y, b) => { let s = 0; for (let q = y + 1; q <= b * y; q++) if (isP(q)) s += 1 / q; return 2 * Gh(y, 79) * s; };
  console.log('    y    theta_2      theta_4      theta_16');
  for (const y of [2, 41]) console.log('  ' + pad(y, 3) + '  ' + F(th(y, 2)) + '   ' + F(th(y, 4)) + '   ' + F(th(y, 16)));
  check('theta_2(2) = 1.3333', Math.abs(th(2, 2) - 1.3333) < 5e-5);
  check('theta_2(41) = 166.1038', Math.abs(th(41, 2) - 166.1038) < 5e-5);
  check('theta_16(41) = 568.8063', Math.abs(th(41, 16) - 568.8063) < 5e-5);
  check('theta_16(2) = 4.2628', Math.abs(th(2, 16) - 4.2628) < 5e-5);
  const V = y => { let p = 0.5; for (let q = 3; q <= y; q++) if (isP(q)) p *= (1 - 2 / q); return p; };
  for (const y of [41, 1009]) console.log('  y = ' + pad(y, 5) + '  1/V(y) = ' + (1 / V(y)).toFixed(2)
    + '   ln^2 y / 0.41621 = ' + (Math.log(y) ** 2 / 0.41621).toFixed(2)
    + '   Ghat(y) = ' + Gh(y, 79));
  check('Ghat(y) >= 1/V(y) at y = 41 (max >= mean)', Gh(41, 79) >= 1 / V(41));
  check('the constant: 2/0.41621 = 4.805', Math.abs(2 / 0.41621 - 4.805) < 5e-4, (2 / 0.41621).toFixed(4));
  check('0.41621 is (1/2) C2 4 e^{-2gamma} to 5 dp',
    Math.abs(0.5 * 0.6601618158 * 4 * Math.exp(-2 * GAMMA) - 0.41621) < 5e-6);
}

console.log('');
console.log('=== R4. rho2: THE CONSTANT 170.88 AND FORM I* ======================');
{
  const C = (27 / 16) * Math.exp(8 * GAMMA);
  console.log('  (27/16) e^{8 gamma} = ' + C.toFixed(4) + '    81/48 = ' + (81 / 48).toFixed(6));
  check('the named constant is 170.88', Math.abs(C - 170.88) < 5e-3, C.toFixed(4));
  check('81/48 = 27/16 exactly (steps 1-5 vs step 6 agree)', 81 / 48 === 27 / 16);
  const MS = { 13: 1.095066, 47: 360.902 };   // exact <rho~^2>, CITED from attack-rhoms-01.js S0/S3
  for (const z of [13, 47, 1000003]) {
    const L = Math.log(z);
    const I = C * Math.pow(z, 6) * Math.pow(L, 8) * Math.pow(1 + 1 / (2 * L * L), 8);
    console.log('  z = ' + pad(z, 8) + '  FORM I* = ' + I.toExponential(4)
      + '   log_z = ' + (Math.log(I) / L).toFixed(4)
      + (MS[z] ? '   I*/exact = ' + (I / MS[z]).toExponential(3) : ''));
  }
  const L47 = Math.log(47);
  const I47 = C * Math.pow(47, 6) * Math.pow(L47, 8) * Math.pow(1 + 1 / (2 * L47 * L47), 8);
  check('I*/exact = 3.213e+14 at z = 47', Math.abs(I47 / MS[47] / 3.213e14 - 1) < 1e-3);
  check('log_z(FORM I*) = 10.2054 at z = 47', Math.abs(Math.log(I47) / L47 - 10.2054) < 5e-5);
  // the measured truth's own exponent, from the two cited endpoints
  const slope = Math.log(MS[47] / MS[13]) / Math.log(47 / 13);
  console.log('  measured <rho~^2> exponent between the cited endpoints z = 13 and 47: ' + slope.toFixed(3));
  console.log('  against the STATED z^6 that is ' + (100 * slope / 6).toFixed(0)
    + '% , not "roughly half"; against the EFFECTIVE 10.2054 it is ' + (100 * slope / 10.2054).toFixed(0) + '%.');
}

console.log('');
console.log('=== R5. rho2 sec.4: THE "ABSOLUTE FLOOR" IS NOT THE ABSOLUTE FLOOR =');
{
  // attack-rhoms-01.js line 501:  R1f = exp((ln 3 + lnW + ln ms)/3)  <- ms MEASURED.
  // The note calls this column "the ABSOLUTE FLOOR (C_L = 1 and <rho~^2> = 1)".
  // rhoms-01's OWN S5 keeps the two apart: the (C_L = 1, ms = 1) floor dies at
  // z = 47; the (C_L = 1, ms model) floor dies at z = 41.
  const SMAX = { 13: 1.579e3, 17: 4.174e3, 19: 5.654e3, 23: 1.102e4, 29: 2.762e4, 31: 3.372e4, 37: 6.881e4, 41: 9.972e4, 43: 1.138e5, 47: 1.577e5 };
  const MS = { 13: 1.095066, 17: 2.496563, 19: 4.952375, 23: 7.982480, 29: 13.595974, 31: 24.738489, 37: 85.677, 41: 143.927, 43: 201.454, 47: 360.902 };
  const R1F = { 13: 1.97e1, 17: 6.08e1, 19: 1.96e2, 23: 6.15e2, 29: 2.09e3, 31: 7.83e3, 37: 3.72e4, 41: 1.47e5, 43: 5.69e5, 47: 2.42e6 };
  console.log('    z   theta(z-)   cited R1f   rebuilt (C_L=1, ms MEASURED)   TRUE floor (C_L=ms=1)   true/smax   cited/smax');
  let matched = true, first = 0;
  for (const z of [13, 17, 19, 23, 29, 31, 37, 41, 43, 47]) {
    let lnW = 0; for (let p = 2; p < z; p++) if (isP(p)) lnW += Math.log(p);
    const rebuilt = Math.exp((Math.log(3) + lnW + Math.log(MS[z])) / 3);
    const floor = Math.exp((Math.log(3) + lnW) / 3);
    matched = matched && Math.abs(rebuilt / R1F[z] - 1) < 5e-3;
    if (!first && floor > SMAX[z]) first = z;
    console.log('   ' + pad(z, 3) + '   ' + pad(lnW.toFixed(4), 9) + '   ' + pad(R1F[z].toExponential(2), 9)
      + '   ' + pad(rebuilt.toExponential(2), 27) + '   ' + pad(floor.toExponential(3), 21)
      + '   ' + pad((floor / SMAX[z]).toFixed(3), 9) + '   ' + pad((R1F[z] / SMAX[z]).toFixed(3), 10));
  }
  check('the cited R1f column rebuilds ONLY with the MEASURED ms, never with ms = 1', matched);
  const f = z => { let w = 0; for (let p = 2; p < z; p++) if (isP(p)) w += Math.log(p); return Math.exp((Math.log(3) + w) / 3); };
  check('the TRUE absolute floor (C_L = ms = 1) CLEARS at z = 41  <- note claims a 1.474x miss',
    f(41) < SMAX[41], (f(41) / SMAX[41]).toFixed(3));
  check('the TRUE absolute floor CLEARS at z = 43  <- note claims a 5.000x miss',
    f(43) < SMAX[43], (f(43) / SMAX[43]).toFixed(3));
  check('the TRUE absolute floor first fails at z = 47, exactly as rhoms-01 S5 says', first === 47);
  console.log('  corrected: at z = 47 the absolute floor misses by ' + (f(47) / SMAX[47]).toFixed(3)
    + 'x, i.e. ' + (Math.log(f(47) / SMAX[47]) / Math.log(47)).toFixed(4) + ' of exponent,');
  console.log('  not 15.346x and 0.7093. The DIVERGENCE mechanism e^{theta(z)/3} vs z^{beta2} is untouched.');
}

console.log('');
console.log('=== R6. rho2: THE ROSSER-SCHOENFELD INPUT IS FALSE AT z = 109, 113 =');
{
  // quoted in the note as: prod_{p<=x}(1-1/p)^{-1} < e^gamma ln x (1 + 1/(2 ln^2 x)), "RS states x > 1".
  // Tested in the note's own p < z convention, at EVERY prime z below the sieve.
  let prod = 1, worst = 0, wz = 0; const viol = [];
  for (let z = 2; z < LIM; z++) {
    if (!isP(z)) continue;
    const L = Math.log(z), rhs = Math.exp(GAMMA) * L * (1 + 1 / (2 * L * L)), r = prod / rhs;
    if (z >= 3) { if (r > worst) { worst = r; wz = z; } if (r >= 1) viol.push(z); }
    prod *= 1 / (1 - 1 / z);
  }
  console.log('  worst ratio LHS/RHS over all prime z < ' + LIM + ': ' + worst.toFixed(6) + ' at z = ' + wz);
  console.log('  VIOLATIONS (LHS >= RHS): ' + viol.length + '  at z = ' + viol.join(', '));
  check('the quoted RS form FAILS at z = 109 and z = 113',
    viol.length === 2 && viol[0] === 109 && viol[1] === 113);
  check('and holds at every prime z > 113 up to ' + LIM, viol.every(v => v <= 113));
  for (const z of [19, 109, 113]) {
    let p = 1; for (let q = 2; q < z; q++) if (isP(q)) p *= 1 / (1 - 1 / q);
    const L = Math.log(z), rhs = Math.exp(GAMMA) * L * (1 + 1 / (2 * L * L));
    console.log('    z = ' + pad(z, 4) + '  prod_{p<z} = ' + p.toFixed(6) + '   e^g ln z (1+1/(2ln^2 z)) = '
      + rhs.toFixed(6) + '   ratio ' + (p / rhs).toFixed(6) + (p >= rhs ? '   VIOLATION' : ''));
  }
  console.log('  The note\'s sixteen sampled z (13..4e6) missed both. Its stated worst, 0.998681 at');
  console.log('  z = 19, reproduces here; the sampling, not the check, is what passed.');
  console.log('  RS 1962 Thm 8 (3.26) carries x > 285 [MEMORY, this verifier\'s]; both violations are');
  console.log('  below 285, which is what that restriction predicts. The LEADING constant 170.88 =');
  console.log('  (27/16) e^{8 gamma} does not depend on the correction term and is untouched either way.');
}

console.log('');
console.log('=== FAILS: ' + FAILS + ' ===========================================');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0828-closures.js
//   invocation:  node research/history/staging/redteam-0828-closures.js
//   code-sha256: 805865297be348f6f7d685417500d6cc1eee049d5cd4f8248e1325802c391f89
//   out-sha256:  63063601a2047f15ea2ab713800ce04d1c79ff8f5aca45645a9edf7797570466
//   body-lines:  113
//   inputs:      research/exact-g2-ladder.js@999d2c5fa3ab
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     0.2 s
// ============================================================================
// === R0. CUSTODY: the retyped ladder against the corpus keeper =======
//   ok    retyped A144311+1 == exact-g2-ladder.js on all 14 exact terms   n=14
//   ok    G2(61#) = 1080 (the trusted floor rests on it)   1080
//   ok    G2(79#) = 1710 (the trusted ceiling rests on it)   1710
//   ok    G2(43#) = 618 (the custody ceiling rests on it)   618
//
// === R1. THE LEGAL ZONE, RE-DERIVED FROM THE LADDER ==================
//   legal floor   = max_b S(b),  S(b)  = 2 ln b - ln Ghat(b)     (K < S(b) => beta < 2 => TPC)
//   legal ceiling = max_b Cb(b), Cb(b) = beta2 ln b - ln Ghat(b) (K < Cb(b) => beta < beta2)
//   custody (14 exact terms, Ghat on [2,47)): [ 1.3555,  9.9082)  width  8.5527  argmaxes b = 16 (floor), b = 46 (ceiling)
//   trusted (22-term A144311,  Ghat on [2,83)): [ 1.3946,  11.3568)  width  9.9622  argmaxes b = 66 (floor), b = 82 (ceiling)
//   base-16 values as quoted in TODO 1d: S(16) = 1.355523, Cb(16) = 7.639457
//   ok    S(16) = 1.3555
//   ok    Cb(16) = 7.639457 (quoted 7.6394 = truncation, the safe direction)
//   ok    custody zone [1.3555, 9.9082) at b = 16 and b = 46
//   ok    trusted zone [1.3946, 11.3568) at b = 66 and b = 82
//   ok    TPC-implying sliver the quoted floor calls legal = 0.0391 nats   0.0391
//   ok    legal room the quoted ceiling forfeits = 3.7173 nats   3.7173
//   ok    trusted zone width 9.9622 nats
//   power-pair sup defect: trusted 1.0033 at b^k = 4^2 (15 pairs);  custody 0.9694 at 2^4 (9 pairs)
//   ok    trusted trap [1.0033, 1.3946), width 0.3913
//   ok    custody trap width 0.3861
//   the note's "111 reachable pairs" is the UNORDERED (H-sub) count st <= 82 = 111;  reachable POWER pairs (what (H-sub-pow) quantifies over) = 15
//   ok    111 is the (H-sub) pair count, not the power-pair count
//
// === R2. LEMMA 1 (K* >= pi(y') - pi(y)) AND THE FIRST-y THRESHOLDS ==
//     s   N = pi(2s)-pi(s)   K* (cited)   K*/N   D_s   K* >= N ?
//      2                1            2   2.00       1     yes
//      3                1            1   1.00       1     yes
//      4                2            4   2.00       1     yes
//      5                1            2   2.00       3     yes
//      6                2            3   1.50       3     yes
//      7                2            3   1.50      15     yes
//      9                3            5   1.67      15     yes
//     10                4            8   2.00      15     yes
//     11                3            6   2.00     135     yes
//     12                4           10   2.50     135     yes
//     13                3            8   2.67    1485     yes
//   ok    K* >= pi(2s) - pi(s) at all eleven cited doubling steps
//   ok    K*/N runs 1.00 to 2.67 as the note reports   1.00..2.67
//   ok    D_5 = 3 < N = 19 at y = 5, b = 16 (the note's stated small-y exception)
//   first y with pi(16y) - pi(y) > 66 e^K   (the note's own test, sec.G):
//     K =  1.3555  cap =     256   first y =     117  (N = 256, rung k = 2)
//     K =  1.3946  cap =     266   first y =     122  (N = 267, rung k = 2)
//     K =  7.6394  cap =  137181   first y =  124978  (N = 137181, rung k = 5)
//   ok    y = 117 is the K = 1.3555 row, NOT the K = 1.3946 row
//   ok    the K = 1.3946 row is y = 122  <- the note sec.2c and READING 4 say 117
//   ok    the K = 7.6394 row is y = 124978 as the note states
//   Both rows land at rung k = 2, so the RUNG claim survives the mis-attribution.
//   Note also: pi(by) - pi(y) ~ (b-1) y / ln y IS o(y), i.e. sublinear in the level.
//   What Lemma 1 refutes is BOUNDEDNESS, which is what the route needs; the note's
//   sentence "K* is not sublinear" (sec.0 item 2, sec.2c, SEC D) is false as written.
//
// === R3. theta_b(y) AND THE 1/V(y) FLOOR ============================
//     y    theta_2      theta_4      theta_16
//     2   1.3333    2.7048    4.2628
//    41   166.1038    315.0659    568.8063
//   ok    theta_2(2) = 1.3333
//   ok    theta_2(41) = 166.1038
//   ok    theta_16(41) = 568.8063
//   ok    theta_16(2) = 4.2628
//   y =    41  1/V(y) = 35.80   ln^2 y / 0.41621 = 33.13   Ghat(y) = 546
//   y =  1009  1/V(y) = 115.75   ln^2 y / 0.41621 = 114.94   Ghat(y) = 1710
//   ok    Ghat(y) >= 1/V(y) at y = 41 (max >= mean)
//   ok    the constant: 2/0.41621 = 4.805   4.8053
//   ok    0.41621 is (1/2) C2 4 e^{-2gamma} to 5 dp
//
// === R4. rho2: THE CONSTANT 170.88 AND FORM I* ======================
//   (27/16) e^{8 gamma} = 170.8820    81/48 = 1.687500
//   ok    the named constant is 170.88   170.8820
//   ok    81/48 = 27/16 exactly (steps 1-5 vs step 6 agree)
//   z =       13  FORM I* = 2.7764e+12   log_z = 11.1707   I*/exact = 2.535e+12
//   z =       47  FORM I* = 1.1597e+17   log_z = 10.2054   I*/exact = 3.213e+14
//   z =  1000003  FORM I* = 2.3160e+47   log_z = 7.8941
//   ok    I*/exact = 3.213e+14 at z = 47
//   ok    log_z(FORM I*) = 10.2054 at z = 47
//   measured <rho~^2> exponent between the cited endpoints z = 13 and 47: 4.511
//   against the STATED z^6 that is 75% , not "roughly half"; against the EFFECTIVE 10.2054 it is 44%.
//
// === R5. rho2 sec.4: THE "ABSOLUTE FLOOR" IS NOT THE ABSOLUTE FLOOR =
//     z   theta(z-)   cited R1f   rebuilt (C_L=1, ms MEASURED)   TRUE floor (C_L=ms=1)   true/smax   cited/smax
//     13      7.7450     1.97e+1                       1.97e+1                1.907e+1       0.012        0.012
//     17     10.3100     6.08e+1                       6.08e+1                4.483e+1       0.011        0.015
//     19     13.1432     1.96e+2                       1.96e+2                1.153e+2       0.020        0.035
//     23     16.0876     6.15e+2                       6.15e+2                3.076e+2       0.028        0.056
//     29     19.2231     2.09e+3                       2.09e+3                8.747e+2       0.032        0.076
//     31     22.5904     7.83e+3                       7.83e+3                2.687e+3       0.080        0.232
//     37     26.0244     3.72e+4                       3.72e+4                8.442e+3       0.123        0.541
//     41     29.6353     1.47e+5                       1.47e+5                2.813e+4       0.282        1.474
//     43     33.3489     5.69e+5                       5.69e+5                9.700e+4       0.852        5.000
//     47     37.1101     2.42e+6                       2.42e+6                3.398e+5       2.155       15.346
//   ok    the cited R1f column rebuilds ONLY with the MEASURED ms, never with ms = 1
//   ok    the TRUE absolute floor (C_L = ms = 1) CLEARS at z = 41  <- note claims a 1.474x miss   0.282
//   ok    the TRUE absolute floor CLEARS at z = 43  <- note claims a 5.000x miss   0.852
//   ok    the TRUE absolute floor first fails at z = 47, exactly as rhoms-01 S5 says
//   corrected: at z = 47 the absolute floor misses by 2.155x, i.e. 0.1994 of exponent,
//   not 15.346x and 0.7093. The DIVERGENCE mechanism e^{theta(z)/3} vs z^{beta2} is untouched.
//
// === R6. rho2: THE ROSSER-SCHOENFELD INPUT IS FALSE AT z = 109, 113 =
//   worst ratio LHS/RHS over all prime z < 33000000: 1.003226 at z = 113
//   VIOLATIONS (LHS >= RHS): 2  at z = 109, 113
//   ok    the quoted RS form FAILS at z = 109 and z = 113
//   ok    and holds at every prime z > 113 up to 33000000
//     z =   19  prod_{p<z} = 5.539388   e^g ln z (1+1/(2ln^2 z)) = 5.546706   ratio 0.998681
//     z =  109  prod_{p<z} = 8.556739   e^g ln z (1+1/(2ln^2 z)) = 8.545456   ratio 1.001320   VIOLATION
//     z =  113  prod_{p<z} = 8.635968   e^g ln z (1+1/(2ln^2 z)) = 8.608198   ratio 1.003226   VIOLATION
//   The note's sixteen sampled z (13..4e6) missed both. Its stated worst, 0.998681 at
//   z = 19, reproduces here; the sampling, not the check, is what passed.
//   RS 1962 Thm 8 (3.26) carries x > 285 [MEMORY, this verifier's]; both violations are
//   below 285, which is what that restriction predicts. The LEADING constant 170.88 =
//   (27/16) e^{8 gamma} does not depend on the correction term and is untouched either way.
//
// === FAILS: 0 ===========================================
// ============================================================================
// READINGS
//
// 1. THE FIVE NOTES' ARITHMETIC IS CLEAN WHERE THIS FILE CAN REACH IT.
//    Every figure re-derived in R1-R4 reproduces: the legal zone at both
//    grades, the trap widths 0.3913 / 0.3861, the eleven K*/N ratios
//    1.00..2.67, the theta table, the constant 170.88 and the ratio
//    3.213e+14 at z = 47. FAILS = 0 is a statement about agreement, not
//    about correctness of the surrounding argument.
//
// 2. hsubpow-explicit-K sec.2c AND ITS READING 4 QUOTE THE WRONG ROW OF
//    THEIR OWN EMBEDDED TABLE. y = 117 is the K = 1.3555 threshold; the
//    K = 1.3946 threshold is y = 122. Both land at rung k = 2, so the
//    rung claim survives; the figure does not. embed.js --check cannot
//    catch this: 117 IS in the block, on another row.
//
// 3. hsubpow-explicit-K's "K* is NOT sublinear in the level" is false as
//    written. pi(by) - pi(y) ~ (b-1) y / ln y is o(y). Lemma 1 refutes
//    BOUNDEDNESS, which is what the route needs, so the closure stands on
//    a corrected sentence.
//
// 4. rho2-analytic-bound sec.4 MISLABELS THE COLUMN ITS HEADLINE RESTS ON.
//    attack-rhoms-01.js defines its S4 R1f column with the MEASURED mean
//    square; the note calls it "the ABSOLUTE FLOOR (C_L = 1, <rho~^2> = 1)".
//    Rebuilt both ways here: the cited column matches only the measured-ms
//    form. The true absolute floor CLEARS at z = 41 (0.282) and z = 43
//    (0.852) and misses at z = 47 by 2.155x, 0.1994 of exponent, against
//    the note's 1.474x / 5.000x / 15.346x and 0.7093. rhoms-01's own S5
//    keeps the two objects apart and this file agrees with S5.
//
// 5. rho2-analytic-bound's [MEMORY] ROSSER-SCHOENFELD FORM IS FALSE IN
//    RANGE. prod_{p<z}(1-1/p)^{-1} < e^gamma ln z (1 + 1/(2 ln^2 z)) fails
//    at z = 109 (1.001320) and z = 113 (1.003226) and nowhere else below
//    33000000. The note's sixteen sampled z missed both; its stated worst,
//    0.998681 at z = 19, reproduces exactly. The leading constant 170.88 =
//    (27/16) e^{8 gamma} is independent of the correction term, so the
//    headline is untouched and only FORM I*'s validity range moves.
//
// 6. THE "111 REACHABLE PAIRS" IS THE (H-sub) COUNT, NOT (H-sub-pow)'s.
//    Unordered st <= 82 gives 111; the power pairs (H-sub-pow) actually
//    quantifies over number 15. The note's sentence names both objects, so
//    this is a reading hazard rather than a defect.
