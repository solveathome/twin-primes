// hsubpow-explicit-K.js  —  TODO 1d: (H-sub-pow) with an explicit K, checked
//
// SCRATCHPAD-GRADE. Arithmetic only: no enumeration, no new G2 value. Every
// G2 term is PARSED from the corpus keepers (never retyped):
//   research/exact-g2-ladder.js               14 custody-exact terms
//   research/import-interp-01-bgt-defect.js   the 22-term A144311 column
// and the two are cross-checked on their 14-term overlap before use.
//
// WHAT IT CHECKS (each section answers one question the report asks):
//  A. custody: the two ladders parse and agree on the overlap.
//  B. the legal-zone arithmetic of attack-wrongdirection-audit.md 3.5 /
//     TODO 1d, re-derived: S(b) = ln(b^2/Ghat(b)) and the beta2 ceiling
//     Cb(b) = beta2*ln b - ln Ghat(b), their argmaxes at BOTH grades. The
//     quoted zone [1.3555, 7.6394) is stated at b = 16; the audit's own
//     conclusion formula takes an inf over ALL n, so the operative floor
//     and ceiling are the argmaxes, not base 16's values.
//  C. the base-16 chain: which of its rungs are reachable at all.
//  D. the Bridging-Lemma certificate K* (attack-doubling-01.md 3) against
//     the elementary lower bound K* >= pi(y') - pi(y) proved in the report,
//     at the eleven enumerable doubling steps.
//  E. the residue-density closure theta at a general base b (doubling-01
//     3 computed b = 2 only), and its growth law.
//  F. the exponent-gap obstruction: the defect an upper-bound/lower-bound
//     proof of (H-sub-pow) must carry, in nats, at the corpus's proven
//     exponents gamma = beta2 (upper) and lambda = 1 (FGKMT lower).
//
// beta2 = 4.26645028414864191641 is quoted from research/dhr-verification.md
// row 1a (Booker-Browning rigorous value); it is a constant here, not
// recomputed.
//
// usage: node research/history/staging/hsubpow-explicit-K.js

'use strict';

const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..');
const R = (p) => fs.readFileSync(path.join(REPO, p), 'utf8');
const F = (v, d = 4) => (Number.isFinite(v) ? (v >= 0 ? ' ' : '') + v.toFixed(d) : '   n/a');
const pad = (s, n) => String(s).padStart(n);
let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) FAILS++;
  console.log('  ' + (ok ? 'ok  ' : 'FAIL') + '  ' + label + (detail ? '   ' + detail : ''));
}

const BETA2 = 4.26645028414864191641;

// ---------------------------------------------------------- A. custody
const srcLadder = R('research/exact-g2-ladder.js');
const srcInterp = R('research/import-interp-01-bgt-defect.js');

const EXACT = [];
{
  const re = /\{ x: (\d+),\s+g: (\d+),/g;
  let m;
  while ((m = re.exec(srcLadder)) !== null) EXACT.push({ x: +m[1], g: +m[2] });
}
let A144311 = null;
{
  const m = srcInterp.match(/const A144311 = \[([^\]]+)\]/s);
  if (!m) throw new Error('parse failure: A144311 not found');
  A144311 = m[1].split(',').map((s) => parseInt(s.trim(), 10));
}
const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2FULL = A144311.map((v) => v + 1);

console.log('=== A. CUSTODY =====================================================');
check('exact ladder parsed (14 terms)', EXACT.length === 14, 'n=' + EXACT.length);
check('A144311 parsed (22 terms)', A144311.length === 22, 'n=' + A144311.length);
let agree = true;
for (let i = 0; i < 14; i++) agree = agree && EXACT[i].x === PR[i] && EXACT[i].g === G2FULL[i];
check('exact ladder == A144311+1 on the 14 shared terms', agree);

// Ghat(t) = G2(P(t)#), P(t) = largest listed prime <= t.
function mkG(pr, vals, cap) {
  return {
    cap,
    at(t) { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k < 0 ? null : vals[k]; },
  };
}
const Gcus = mkG(PR.slice(0, 14), EXACT.map((e) => e.g), 47);   // Ghat known on [2,47)
const Gtru = mkG(PR, G2FULL, 83);                                // Ghat known on [2,83)

// ---------------------------------------------------------- B. the legal zone
console.log('');
console.log('=== B. LEGAL-ZONE ARITHMETIC, RE-DERIVED ============================');
console.log('  S(b)  = 2 ln b - ln Ghat(b)          (K < S(b) at some b  =>  beta < 2)');
console.log('  Cb(b) = beta2 ln b - ln Ghat(b)      (K < Cb(b) at some b =>  beta < beta2)');
console.log('');
function scan(G, label) {
  let bS = 0, S = -Infinity, bC = 0, C = -Infinity;
  const rows = [];
  for (let b = 2; b < G.cap; b++) {
    const g = G.at(b);
    const s = 2 * Math.log(b) - Math.log(g);
    const c = BETA2 * Math.log(b) - Math.log(g);
    rows.push({ b, g, s, c });
    if (s > S) { S = s; bS = b; }
    if (c > C) { C = c; bC = b; }
  }
  rows.sort((p, q) => q.s - p.s);
  const top = rows.slice(0, 4).map((r) => r.b + ':' + r.s.toFixed(4)).join('  ');
  console.log('  ' + label);
  console.log('    max S  = ' + F(S) + ' at b = ' + bS + '   (top four by S: ' + top + ')');
  console.log('    max Cb = ' + F(C) + ' at b = ' + bC);
  console.log('    => the operative LEGAL ZONE for an all-bases K: [' + F(S) + ', ' + F(C) + ')'
    + '   width ' + F(C - S) + ' nats');
  return { S, bS, C, bC };
}
const cus = scan(Gcus, 'custody grade (14 exact terms, Ghat on [2,47))');
console.log('');
const tru = scan(Gtru, 'trusted grade (22-term A144311 ladder, Ghat on [2,83))');

console.log('');
console.log('  The zone AS QUOTED in TODO 1d / attack-wrongdirection-audit.md 3.5,');
console.log('  which evaluates only at b = 16:');
{
  const g16 = Gcus.at(16);
  const s16 = 2 * Math.log(16) - Math.log(g16);
  const c16 = BETA2 * Math.log(16) - Math.log(g16);
  console.log('    Ghat(16) = ' + g16 + '   ln 16 = ' + Math.log(16).toFixed(6)
    + '   ln Ghat(16) = ' + Math.log(g16).toFixed(6));
  console.log('    S(16)  = ' + F(s16, 4) + '        (quoted 1.3555)');
  console.log('    Cb(16) = ' + F(c16, 4) + '        (quoted 7.6394)');
  console.log('    quoted width = ' + F(c16 - s16) + ' nats   (quoted 6.28)');
  check('S(16) reproduces 1.3555', Math.abs(s16 - 1.3555) < 5e-5, s16.toFixed(6));
  // the audit quotes 7.6394; the value is 7.639457, i.e. TRUNCATED not rounded.
  // For a strict upper endpoint truncation is the conservative direction, so
  // this is a display nit, not a defect. Checked as truncation-to-4dp.
  check('Cb(16) reproduces the quoted 7.6394 as a truncation',
    Math.floor(c16 * 1e4) / 1e4 === 7.6394, c16.toFixed(6));
  check('b = 16 IS the custody argmax of S', cus.bS === 16, 'argmax b = ' + cus.bS);
  check('b = 16 is NOT the trusted argmax of S', tru.bS !== 16, 'trusted argmax b = ' + tru.bS);
  check('b = 16 is NOT the argmax of Cb at either grade',
    cus.bC !== 16 && tru.bC !== 16, 'argmax b = ' + cus.bC + ' (cus), ' + tru.bC + ' (trusted)');
  console.log('    TPC-IMPLYING SLIVER the quoted floor misses, at trusted grade:');
  console.log('      K in [' + F(s16) + ', ' + F(tru.S) + ')  width ' + F(tru.S - s16)
    + ' nats, fires through b = ' + tru.bS);
  console.log('    CEILING the quoted zone leaves unclaimed, at trusted grade:');
  console.log('      K in [' + F(c16) + ', ' + F(tru.C) + ')  width ' + F(tru.C - c16)
    + ' nats, delivered by b = ' + tru.bC);
}

// ---------------------------------------------------------- C. the base-16 chain
console.log('');
console.log('=== C. THE BASE-16 CHAIN, RUNG BY RUNG =============================');
console.log('  (H-sub-pow) at b = 16 is one inequality per k >= 1:');
console.log('    Ghat(16^(k+1)) <= e^K * Ghat(16) * Ghat(16^k)');
for (let k = 1; k <= 3; k++) {
  const arg = Math.pow(16, k + 1);
  console.log('    k = ' + k + ':  Ghat(' + arg + ') = G2(P(' + arg + ')#)'
    + '   reachable? ' + (arg < Gtru.cap ? 'YES' : 'NO  (ladder ends at 82)'));
}
{
  // the k = 1 rung as a finite statement, with the corpus's own POW fit as a
  // HEURISTIC yardstick only (1.84 * p^1.546, attack-doubling-01.js SEC D null).
  const g16 = Gcus.at(16);
  const est = 1.84 * Math.pow(251, 1.546);
  console.log('    k = 1 in numbers: Ghat(256) = G2(251#) <= e^K * 66^2 = e^K * ' + g16 * g16);
  console.log('      at K = 1.3555 (quoted floor):  G2(251#) <= ' + Math.round(Math.exp(1.3555) * g16 * g16));
  console.log('      at K = 7.6394 (quoted ceiling): G2(251#) <= ' + Math.round(Math.exp(7.6394) * g16 * g16));
  console.log('      POW-fit yardstick 1.84*251^1.546 = ' + Math.round(est) + '   [HEURISTIC, not a bound]');
  console.log('      43# enumeration cost ~1 h on ten cores; 251# is out of reach by every measure.');
}

// ---------------------------------------------------------- D. K* vs pi(y')-pi(y)
console.log('');
console.log('=== D. THE BRIDGING CERTIFICATE K* AGAINST ITS PROVEN FLOOR ========');
console.log('  Bridging Lemma (attack-doubling-01.md 3, PROVEN): Ghat(y\') <= (K*+1) Ghat(y),');
console.log('  K* = longest run of consecutive level-y slots all killed by primes in (y, y\'].');
console.log('  Report 2 proves: K* >= pi(y\') - pi(y)   (CRT, one line).');
console.log('');
const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
const pi = (x) => { let c = 0; for (let n = 2; n <= x; n++) if (isPrime(n)) c++; return c; };
// the eleven distinct enumerable doubling steps s -> 2s, s = 2..13, and the
// certificates K*+1 QUOTED from attack-doubling-01.md 3 (cited, not recomputed).
const STEPS = [
  { s: 2, cert: 3 }, { s: 3, cert: 2 }, { s: 4, cert: 5 }, { s: 5, cert: 3 },
  { s: 6, cert: 4 }, { s: 7, cert: 4 }, { s: 9, cert: 6 }, { s: 10, cert: 9 },
  { s: 11, cert: 7 }, { s: 12, cert: 11 }, { s: 13, cert: 9 },
];
console.log('   s   level step      entering primes N   K* (cited)   K*/N   floor holds?');
let allHold = true;
for (const st of STEPS) {
  const s = st.s, N = pi(2 * s) - pi(s), Kstar = st.cert - 1;
  const Ps = (() => { let p = 0; for (let q = 2; q <= s; q++) if (isPrime(q)) p = q; return p; })();
  const P2s = (() => { let p = 0; for (let q = 2; q <= 2 * s; q++) if (isPrime(q)) p = q; return p; })();
  const ok = Kstar >= N;
  allHold = allHold && ok;
  console.log('  ' + pad(s, 2) + '   ' + pad(Ps + '# -> ' + P2s + '#', 12) + '   ' + pad(N, 15)
    + '   ' + pad(Kstar, 10) + '   ' + F(Kstar / N, 2) + '   ' + (ok ? 'yes' : 'NO'));
}
check('K* >= pi(2s) - pi(s) at all eleven enumerable steps', allHold);
console.log('  Asymptotics: pi(by) - pi(y) ~ (b-1) y / ln y -> infinity for every fixed b >= 2,');
console.log('  so K* is NOT sublinear in the level, and (K*+1) Ghat(y) is unbounded');
console.log('  against the constant e^K Ghat(b) that (H-sub-pow) allows.');

// ---------------------------------------------------------- E. theta at base b
console.log('');
console.log('=== E. THE RESIDUE-DENSITY CLOSURE AT A GENERAL BASE ===============');
console.log('  theta_b(y) = 2 Ghat(y) * sum_{y < q <= by} 1/q ;  the AP cap closes the');
console.log('  Bridging Lemma iff theta < 1 (attack-doubling-01.md 3, b = 2 only).');
function theta(y, b, G) {
  let s = 0;
  for (let q = y + 1; q <= b * y; q++) if (isPrime(q)) s += 1 / q;
  const g = G.at(y);
  return g === null ? null : 2 * g * s;
}
console.log('    y     theta_2      theta_4      theta_16');
for (const y of [2, 3, 4, 5, 8, 11, 16, 23, 31, 41]) {
  const t2 = 16 * y < Gtru.cap || true ? theta(y, 2, Gtru) : null;
  const t4 = theta(y, 4, Gtru);
  const t16 = theta(y, 16, Gtru);
  console.log('  ' + pad(y, 4) + '   ' + F(t2) + '   ' + F(t4) + '   ' + F(t16));
}
console.log('  Growth law: sum_{y<q<=by} 1/q ~ ln b / ln y (Mertens), so');
console.log('  theta_b(y) ~ 2 Ghat(y) ln b / ln y, and Ghat(y) >= 1/V(y) ~ ln^2 y / 0.41621');
console.log('  already forces theta_b(y) >= (2/0.41621) ln b ln y -> infinity at EVERY base.');

// ---------------------------------------------------------- F. exponent gap
console.log('');
console.log('=== F. THE EXPONENT-GAP OBSTRUCTION ================================');
console.log('  A proof of (H-sub-pow) at base b that goes through an unconditional');
console.log('  upper bound Ghat(n) <= A n^gamma and a lower bound Ghat(n) >= a n^lambda');
console.log('  carries defect  D_k >= (gamma - lambda) k ln b + O(1).  Finite K iff gamma <= lambda.');
const GAMMA = BETA2;        // proven upper exponent: paper/beta2-note.md
const LAMBDA = 1.0;         // proven lower exponent: FGKMT via two-class-lower-bounds.md 3
console.log('  corpus gamma  = ' + GAMMA.toFixed(5) + '   (beta2, paper/beta2-note.md)');
console.log('  corpus lambda = ' + LAMBDA.toFixed(5) + '   (x log x logloglog x / loglog x, FGKMT)');
console.log('  gap = ' + (GAMMA - LAMBDA).toFixed(5) + ' > 0  =>  K = +infinity at every base.');
console.log('    defect growth at b = 16, per rung: ' + F((GAMMA - LAMBDA) * Math.log(16))
  + ' nats/k  (legal zone is ' + F(tru.C - tru.S) + ' nats WIDE, total)');
console.log('    rungs before the defect exits the legal zone at b = 16: k = '
  + Math.ceil((tru.C - tru.S) / ((GAMMA - LAMBDA) * Math.log(16))));

console.log('');
console.log('=== G. THE RUNG AT WHICH THE BRIDGING CERTIFICATE LEAVES THE ZONE ===');
console.log('  (H-sub-pow) at b = 16 is delivered by the Bridging Lemma only if');
console.log('  K*+1 <= e^K * Ghat(16) = 66 e^K, a constant in k. With K* >= pi(16y) - pi(y):');
{
  // odd-only sieve to 8e7, then walk y upward keeping N(y) = pi(16y) - pi(y)
  // incrementally; report the first rung at which N exceeds each cap.
  const LIM = 160000000;
  const half = (LIM >> 1) + 1;              // index i <-> odd number 2i+1
  const comp = new Uint8Array(half);
  for (let i = 1; (2 * i + 1) * (2 * i + 1) <= LIM; i++) {
    if (!comp[i]) { const q = 2 * i + 1; for (let j = (q * q - 1) >> 1; j < half; j += q) comp[j] = 1; }
  }
  const isP = (n) => (n === 2 ? true : (n < 2 || n % 2 === 0) ? false : !comp[(n - 1) >> 1]);
  const caps = [1.3555, 1.3946, 7.6394, 11.3568].map((K) => ({ K, cap: Math.exp(K) * 66, hit: null }));
  let N = 0, hi = 0, lo = 0;
  for (let y = 2; 16 * y <= LIM; y++) {
    while (hi < 16 * y) { hi++; if (isP(hi)) N++; }
    while (lo < y) { lo++; if (isP(lo)) N--; }
    for (const c of caps) if (c.hit === null && N > c.cap) c.hit = { y, N };
    if (caps.every((c) => c.hit !== null)) break;
  }
  for (const c of caps) {
    const row = '    K = ' + F(c.K) + '  cap 66 e^K = ' + pad(Math.round(c.cap), 9);
    if (c.hit === null) console.log(row + '   not exceeded below y = ' + (LIM / 16) + ' (sieve limit)');
    else console.log(row + '   first y with pi(16y)-pi(y) > cap: y = ' + pad(c.hit.y, 9)
      + '   rung k = ' + Math.ceil(Math.log(c.hit.y) / Math.log(16)) + ' of the base-16 chain');
  }
}
console.log('  So at base 16 the certificate provably exceeds the ENTIRE legal zone');
console.log('  from a single-digit rung onward; no truncation of the chain helps,');
console.log('  because (H-sub-pow) is quantified over all k.');

console.log('');
console.log('=== FAILS: ' + FAILS + ' ===============================================');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/hsubpow-explicit-K.js
//   invocation:  node research/history/staging/hsubpow-explicit-K.js
//   code-sha256: 117343ac541bba63955ae8da7579c96c2c8d6564b9e98f8ca1f874dc212ab41e
//   out-sha256:  8aa25d0fc69b48fdc61c804dd3119e939f847e36c6e4a9e663a7633eb630a09e
//   body-lines:  109
//   forced:      2026-08-28, 0 of 75 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     0.7 s
// ============================================================================
// === A. CUSTODY =====================================================
//   ok    exact ladder parsed (14 terms)   n=14
//   ok    A144311 parsed (22 terms)   n=22
//   ok    exact ladder == A144311+1 on the 14 shared terms
//
// === B. LEGAL-ZONE ARITHMETIC, RE-DERIVED ============================
//   S(b)  = 2 ln b - ln Ghat(b)          (K < S(b) at some b  =>  beta < 2)
//   Cb(b) = beta2 ln b - ln Ghat(b)      (K < Cb(b) at some b =>  beta < beta2)
//
//   custody grade (14 exact terms, Ghat on [2,47))
//     max S  =  1.3555 at b = 16   (top four by S: 16:1.3555  28:1.3463  36:1.3148  27:1.2736)
//     max Cb =  9.9082 at b = 46
//     => the operative LEGAL ZONE for an all-bases K: [ 1.3555,  9.9082)   width  8.5527 nats
//
//   trusted grade (22-term A144311 ladder, Ghat on [2,83))
//     max S  =  1.3946 at b = 66   (top four by S: 66:1.3946  78:1.3804  82:1.3692  65:1.3641)
//     max Cb =  11.3568 at b = 82
//     => the operative LEGAL ZONE for an all-bases K: [ 1.3946,  11.3568)   width  9.9622 nats
//
//   The zone AS QUOTED in TODO 1d / attack-wrongdirection-audit.md 3.5,
//   which evaluates only at b = 16:
//     Ghat(16) = 66   ln 16 = 2.772589   ln Ghat(16) = 4.189655
//     S(16)  =  1.3555        (quoted 1.3555)
//     Cb(16) =  7.6395        (quoted 7.6394)
//     quoted width =  6.2839 nats   (quoted 6.28)
//   ok    S(16) reproduces 1.3555   1.355523
//   ok    Cb(16) reproduces the quoted 7.6394 as a truncation   7.639457
//   ok    b = 16 IS the custody argmax of S   argmax b = 16
//   ok    b = 16 is NOT the trusted argmax of S   trusted argmax b = 66
//   ok    b = 16 is NOT the argmax of Cb at either grade   argmax b = 46 (cus), 82 (trusted)
//     TPC-IMPLYING SLIVER the quoted floor misses, at trusted grade:
//       K in [ 1.3555,  1.3946)  width  0.0391 nats, fires through b = 66
//     CEILING the quoted zone leaves unclaimed, at trusted grade:
//       K in [ 7.6395,  11.3568)  width  3.7173 nats, delivered by b = 82
//
// === C. THE BASE-16 CHAIN, RUNG BY RUNG =============================
//   (H-sub-pow) at b = 16 is one inequality per k >= 1:
//     Ghat(16^(k+1)) <= e^K * Ghat(16) * Ghat(16^k)
//     k = 1:  Ghat(256) = G2(P(256)#)   reachable? NO  (ladder ends at 82)
//     k = 2:  Ghat(4096) = G2(P(4096)#)   reachable? NO  (ladder ends at 82)
//     k = 3:  Ghat(65536) = G2(P(65536)#)   reachable? NO  (ladder ends at 82)
//     k = 1 in numbers: Ghat(256) = G2(251#) <= e^K * 66^2 = e^K * 4356
//       at K = 1.3555 (quoted floor):  G2(251#) <= 16896
//       at K = 7.6394 (quoted ceiling): G2(251#) <= 9053930
//       POW-fit yardstick 1.84*251^1.546 = 9434   [HEURISTIC, not a bound]
//       43# enumeration cost ~1 h on ten cores; 251# is out of reach by every measure.
//
// === D. THE BRIDGING CERTIFICATE K* AGAINST ITS PROVEN FLOOR ========
//   Bridging Lemma (attack-doubling-01.md 3, PROVEN): Ghat(y') <= (K*+1) Ghat(y),
//   K* = longest run of consecutive level-y slots all killed by primes in (y, y'].
//   Report 2 proves: K* >= pi(y') - pi(y)   (CRT, one line).
//
//    s   level step      entering primes N   K* (cited)   K*/N   floor holds?
//    2       2# -> 3#                 1            2    2.00   yes
//    3       3# -> 5#                 1            1    1.00   yes
//    4       3# -> 7#                 2            4    2.00   yes
//    5       5# -> 7#                 1            2    2.00   yes
//    6      5# -> 11#                 2            3    1.50   yes
//    7      7# -> 13#                 2            3    1.50   yes
//    9      7# -> 17#                 3            5    1.67   yes
//   10      7# -> 19#                 4            8    2.00   yes
//   11     11# -> 19#                 3            6    2.00   yes
//   12     11# -> 23#                 4           10    2.50   yes
//   13     13# -> 23#                 3            8    2.67   yes
//   ok    K* >= pi(2s) - pi(s) at all eleven enumerable steps
//   Asymptotics: pi(by) - pi(y) ~ (b-1) y / ln y -> infinity for every fixed b >= 2,
//   so K* is NOT sublinear in the level, and (K*+1) Ghat(y) is unbounded
//   against the constant e^K Ghat(b) that (H-sub-pow) allows.
//
// === E. THE RESIDUE-DENSITY CLOSURE AT A GENERAL BASE ===============
//   theta_b(y) = 2 Ghat(y) * sum_{y < q <= by} 1/q ;  the AP cap closes the
//   Bridging Lemma iff theta < 1 (attack-doubling-01.md 3, b = 2 only).
//     y     theta_2      theta_4      theta_16
//      2    1.3333    2.7048    4.2628
//      3    2.4000    5.2052    9.9398
//      4    4.1143    6.1283    10.5663
//      5    3.4286    10.1315    17.6614
//      8    10.0699    23.3704    40.8888
//     11    15.8238    31.3547    54.6256
//     16    29.2610    48.8181    84.4294
//     23    57.6969    119.7692    223.0946
//     31    103.1195    197.7334    368.1901
//     41    166.1038    315.0659    568.8063
//   Growth law: sum_{y<q<=by} 1/q ~ ln b / ln y (Mertens), so
//   theta_b(y) ~ 2 Ghat(y) ln b / ln y, and Ghat(y) >= 1/V(y) ~ ln^2 y / 0.41621
//   already forces theta_b(y) >= (2/0.41621) ln b ln y -> infinity at EVERY base.
//
// === F. THE EXPONENT-GAP OBSTRUCTION ================================
//   A proof of (H-sub-pow) at base b that goes through an unconditional
//   upper bound Ghat(n) <= A n^gamma and a lower bound Ghat(n) >= a n^lambda
//   carries defect  D_k >= (gamma - lambda) k ln b + O(1).  Finite K iff gamma <= lambda.
//   corpus gamma  = 4.26645   (beta2, paper/beta2-note.md)
//   corpus lambda = 1.00000   (x log x logloglog x / loglog x, FGKMT)
//   gap = 3.26645 > 0  =>  K = +infinity at every base.
//     defect growth at b = 16, per rung:  9.0565 nats/k  (legal zone is  9.9622 nats WIDE, total)
//     rungs before the defect exits the legal zone at b = 16: k = 2
//
// === G. THE RUNG AT WHICH THE BRIDGING CERTIFICATE LEAVES THE ZONE ===
//   (H-sub-pow) at b = 16 is delivered by the Bridging Lemma only if
//   K*+1 <= e^K * Ghat(16) = 66 e^K, a constant in k. With K* >= pi(16y) - pi(y):
//     K =  1.3555  cap 66 e^K =       256   first y with pi(16y)-pi(y) > cap: y =       117   rung k = 2 of the base-16 chain
//     K =  1.3946  cap 66 e^K =       266   first y with pi(16y)-pi(y) > cap: y =       122   rung k = 2 of the base-16 chain
//     K =  7.6394  cap 66 e^K =    137181   first y with pi(16y)-pi(y) > cap: y =    124978   rung k = 5 of the base-16 chain
//     K =  11.3568  cap 66 e^K =   5645982   first y with pi(16y)-pi(y) > cap: y =   6639931   rung k = 6 of the base-16 chain
//   So at base 16 the certificate provably exceeds the ENTIRE legal zone
//   from a single-digit rung onward; no truncation of the chain helps,
//   because (H-sub-pow) is quantified over all k.
//
// === FAILS: 0 ===============================================
// ============================================================================
// READINGS
//
// 1. THE LEGAL ZONE AS QUOTED IS STATED AT ONE BASE, AND BOTH ITS ENDPOINTS
//    ARE WRONG FOR AN ALL-BASES K. S(16) = 1.3555 and Cb(16) = 7.6394
//    reproduce exactly (7.639457, quoted truncated, the safe direction for a
//    strict upper endpoint). But (H-sub-pow) is quantified over all integer
//    bases and its conclusion is an inf over all n, so the operative
//    endpoints are the argmaxes: at trusted grade max S = 1.3946 at b = 66
//    and max Cb = 11.3568 at b = 82, giving [1.3946, 11.3568). The quoted
//    floor 1.3555 therefore leaves a 0.0391-nat TPC-IMPLYING sliver inside
//    what it calls legal (it fires through b = 66), and the quoted ceiling
//    leaves 3.7173 nats of legal room unclaimed. At custody grade alone the
//    zone is [1.3555, 9.9082), argmaxes b = 16 and b = 46. [VERIFIED]
//
// 2. THE BASE-16 CHAIN HAS NO REACHABLE RUNG AT ALL. Its k = 1 instance is
//    G2(251#) <= e^K * 66^2, i.e. <= 16,896 at the quoted floor and
//    <= 9,053,930 at the quoted ceiling. The exact ladder stops at 79 and
//    the 43# enumeration already costs ~1 h on ten cores. So the base the
//    legal zone is quoted at is the base at which not one instance of the
//    hypothesis can be checked. [VERIFIED]
//
// 3. THE BRIDGING CERTIFICATE HAS A PROVEN FLOOR K* >= pi(y') - pi(y), AND
//    IT HOLDS AT ALL ELEVEN ENUMERABLE DOUBLING STEPS with ratio K*/N
//    running 1.00 to 2.67. Since pi(by) - pi(y) ~ (b-1) y / ln y diverges
//    for every fixed b, K* is not sublinear in the level, which is the one
//    condition attack-doubling-01.md 4 named as required for the
//    certificate route to land. [PROVEN the floor; VERIFIED the eleven]
//
// 4. AT BASE 16 THE CERTIFICATE PROVABLY EXITS THE ENTIRE LEGAL ZONE BY
//    RUNG 6. The Bridging Lemma delivers (H-sub-pow) only if K*+1 <= 66 e^K.
//    The floor of reading 3 breaks that cap at y = 117 for K = 1.3946
//    (rung 2), y = 124,978 for K = 7.6394 (rung 5) and y = 6,639,931 for
//    K = 11.3568 (rung 6). Since (H-sub-pow) is quantified over all k, no
//    truncation of the chain rescues it. [PROVEN given reading 3]
//
// 5. THE RESIDUE-DENSITY CLOSURE FAILS AT EVERY BASE, NOT ONLY AT b = 2.
//    theta_b(y) = 2 Ghat(y) sum_{y<q<=by} 1/q reads 1.3333 at y = 2, b = 2
//    and 568.8063 at y = 41, b = 16; by Mertens theta_b(y) ~ 2 Ghat(y) ln b
//    / ln y, and the elementary floor Ghat(y) >= 1/V(y) ~ ln^2 y / 0.41621
//    already forces theta_b(y) >> ln b ln y -> infinity. Larger bases make
//    it worse, monotonically in the table. [VERIFIED the table; PROVEN the
//    growth law]
//
// 6. THE EXPONENT GAP MAKES K INFINITE FOR THE WHOLE UPPER-BOUND/LOWER-BOUND
//    PROOF SHAPE. With the corpus's proven exponents gamma = 4.26645 (beta2,
//    paper/beta2-note.md) and lambda = 1 (FGKMT, two-class-lower-bounds.md
//    3), the defect of any such proof grows by (gamma - lambda) ln b =
//    9.0565 nats per rung at b = 16, against a total legal-zone width of
//    9.9622 nats: the second rung already exhausts it. A finite K by this
//    shape needs gamma <= lambda, that is, matching upper and lower
//    exponents, which is knowing beta. [PROVEN for the stated shape]
//
// 7. NOTHING HERE PROVES ANY INSTANCE OF (H-sub-pow), AT ANY BASE, WITH ANY
//    CONSTANT. Readings 3 to 6 close three named mechanisms; they do not
//    refute the hypothesis, which stays open in both directions, and they
//    say nothing about a proof that bounds the ratio Ghat(b^{k+1})/Ghat(b^k)
//    without passing through K*, through a density cap, or through a pair of
//    unconditional power bounds. [INFERRED]
