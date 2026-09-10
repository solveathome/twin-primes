// redteam-0904-item0.js — AN INDEPENDENT ADVERSARIAL CHECK OF THE TWO HELD
// ITEM-0 NOTES OF 2026-09-04: THE EXIT-CHAIN LP AND ITS LEVEL SPLITS, THE
// DYADIC FAMILY AND ITS ONSET, THE PLANTED CLASS, AND THE L7 TRANSFER
// ---------------------------------------------------------------------------
'use strict';
/* ===========================================================================
 * redteam-0904-item0.js
 *
 * INDEPENDENT ADVERSARIAL CHECK of two HELD staging notes of 2026-09-04:
 *   (1) redteam-0904-floor-growth-2.md  (+ its producer)
 *   (2) derive-0904-L7-transfer.md      (+ its producer)
 *
 * QUESTION (one line). Do the two notes' load-bearing numbers and their
 * proposed live-layer corrections survive an independent re-derivation, and
 * is the scope of the adverse floor's death "the Rosser lattice at EQUAL
 * levels" or something wider?
 *
 * INDEPENDENCE. Requires nothing. Shares no code with any producer under
 * review: the LP here is solved by an EXACT RATIONAL PRIMAL SIMPLEX with
 * Bland's rule over BigInt fractions (the reviewed note used exact vertex
 * enumeration; the first pass used a grid), the prime sieve is a plain
 * byte sieve, the CRT check walks the period with a different loop, and the
 * vector-sieve constants are recomputed from the linear-sieve F/f formulas
 * rather than quoted.
 *
 * SECTIONS
 *   S1  exact-rational LP: capped four-prime max, the 2k closed form, the
 *       corollary crossing, the exit-expression max and the s >= 7 emptiness
 *   S2  the LOWER-sieve LP (D-minus, even-m exits) and the floor under an
 *       ARBITRARY level split: does any split escape?
 *   S3  the literal dyadic family A1*A2 on my own sieve, at s = 3.0/2.8/2.7,
 *       with the fitted constant and the z^{beta2} crossing
 *   S4  the EXACT onset of the literal family, definition stated
 *   S5  the planted class: ln(n1 n2) and its density, at one split
 *   S6  the L7 note: CRT counts re-enumerated, the union-bound budget, the
 *       certificate's minimum over positions, and the vector-sieve constants
 *
 * CALIBRATION. Everything printed is a computation: VERIFIED where exact and
 * exhaustive, MEASURED where a count at finite levels, DERIVED where an LP
 * value stands in for an asymptotic exponent. Nothing here proves an
 * asymptotic statement.
 * ======================================================================== */

const out = [];
const say = (s) => out.push(s);

/* ------------------------------------------------ exact rational numbers */
const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { const t = a % b; a = b; b = t; } return a; };
function fr(n, d = 1n) {
  n = BigInt(n); d = BigInt(d);
  if (d === 0n) throw new Error('zero denominator');
  if (d < 0n) { n = -n; d = -d; }
  const g = bgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
}
const fadd = (a, b) => fr(a.n * b.d + b.n * a.d, a.d * b.d);
const fsub = (a, b) => fr(a.n * b.d - b.n * a.d, a.d * b.d);
const fmul = (a, b) => fr(a.n * b.n, a.d * b.d);
const fdiv = (a, b) => fr(a.n * b.d, a.d * b.n);
const fcmp = (a, b) => { const l = a.n * b.d, r = b.n * a.d; return l < r ? -1 : (l > r ? 1 : 0); };
const fnum = (a) => Number(a.n) / Number(a.d);
const F0 = fr(0n), F1 = fr(1n);

/* ------------------------------ exact primal simplex, Bland's rule
 * maximise c.x subject to A x <= b (b >= 0 componentwise), x >= 0.        */
function simplex(A, b, c) {
  const m = A.length, n = c.length, W = n + m + 1;
  const T = [];
  for (let i = 0; i < m; i++) {
    const row = new Array(W).fill(F0);
    for (let j = 0; j < n; j++) row[j] = A[i][j];
    row[n + i] = F1;
    row[W - 1] = b[i];
    T.push(row);
  }
  const obj = new Array(W).fill(F0);
  for (let j = 0; j < n; j++) obj[j] = fr(-c[j].n, c[j].d);
  T.push(obj);
  const basis = []; for (let i = 0; i < m; i++) basis.push(n + i);
  for (let guard = 0; guard < 20000; guard++) {
    let enter = -1;
    for (let j = 0; j < W - 1; j++) if (fcmp(T[m][j], F0) < 0) { enter = j; break; }
    if (enter < 0) break;
    let leave = -1, best = null;
    for (let i = 0; i < m; i++) {
      if (fcmp(T[i][enter], F0) <= 0) continue;
      const ratio = fdiv(T[i][W - 1], T[i][enter]);
      if (best === null || fcmp(ratio, best) < 0 || (fcmp(ratio, best) === 0 && basis[i] < basis[leave])) { best = ratio; leave = i; }
    }
    if (leave < 0) throw new Error('unbounded');
    const piv = T[leave][enter];
    for (let j = 0; j < W; j++) T[leave][j] = fdiv(T[leave][j], piv);
    for (let i = 0; i <= m; i++) {
      if (i === leave) continue;
      const f = T[i][enter];
      if (fcmp(f, F0) === 0) continue;
      for (let j = 0; j < W; j++) T[i][j] = fsub(T[i][j], fmul(f, T[leave][j]));
    }
    basis[leave] = enter;
  }
  const x = new Array(n).fill(F0);
  for (let i = 0; i < m; i++) if (basis[i] < n) x[basis[i]] = T[i][W - 1];
  return { val: T[m][W - 1], x };
}

/* ---- the exit-chain polytope.  a_1 >= a_2 >= ... >= a_n >= 0, a_i <= 1.
 * D+ (odd-m exits): the prefix conditions are at ODD m  -> sum_{i<m} a_i + 3 a_m <= sig
 * D- (even-m exits): the prefix conditions are at EVEN m
 * `bonus` adds coefficient 3 on a_n to the objective (the exit expression).  */
function chainLP(n, sig, side, bonus) {
  const A = [], b = [];
  const parity = side === '+' ? 1 : 0;              // m odd for D+, m even for D-
  for (let m = 1; m <= n; m++) {
    if (m % 2 !== parity) continue;
    const row = new Array(n).fill(F0);
    for (let i = 0; i < m - 1; i++) row[i] = F1;
    row[m - 1] = fr(3n);
    A.push(row); b.push(sig);
  }
  for (let i = 0; i + 1 < n; i++) {                  // a_{i+1} - a_i <= 0
    const row = new Array(n).fill(F0);
    row[i] = fr(-1n); row[i + 1] = F1;
    A.push(row); b.push(F0);
  }
  for (let i = 0; i < n; i++) {                      // a_i <= 1
    const row = new Array(n).fill(F0);
    row[i] = F1; A.push(row); b.push(F1);
  }
  const c = new Array(n).fill(F1);
  if (bonus) c[n - 1] = fadd(F1, fr(3n));            // objective sum a + 3 a_n
  return simplex(A, b, c);
}
const lpMax = (n, sig, side) => chainLP(n, sig, side, false).val;      // max sum a
const lpExitMax = (n, sig, side) => chainLP(n, sig, side, true).val;   // max (sum a + 3 a_n)

/* ============================== S1 ==================================== */
const BETA2 = 4.26645028414864;
say('=== S1  exact-rational LP for the D+ exit chains (own simplex) ===');
say('  four-prime capped LP against the claimed closed form');
say('  s | LP4+ | claim | agree');
const claim4 = (s) => (s <= 3 ? 8 * s / 9 : (s <= 5 ? (2 * s + 2) / 3 : 4));
let dev = 0, maxres = 0;
for (const [num, den] of [[24n, 10n], [2648721n, 1000000n], [27n, 10n], [28n, 10n], [29n, 10n], [3n, 1n], [31n, 10n], [35n, 10n], [4n, 1n], [45n, 10n], [5n, 1n], [6n, 1n], [7n, 1n], [8n, 1n], [10n, 1n], [20n, 1n]]) {
  const s = fr(num, den), sv = fnum(s);
  const v = fnum(lpMax(4, s, '+'));
  const cl = claim4(sv);
  const res = Math.abs(v - cl); if (res > maxres) maxres = res;
  if (res > 1e-12) dev++;
  say(`  ${sv.toFixed(6)} | ${v.toFixed(10)} | ${cl.toFixed(10)} | ${res < 1e-12 ? 'YES' : 'NO'}`);
}
say(`  deviations from the closed form: ${dev} of 16, largest residual ${maxres.toExponential(3)}`);
say('  the optimal vertex at s = 2.7 (printed, not assumed):');
say('    a = ' + chainLP(4, fr(27n, 10n), '+', false).x.map(v => fnum(v).toFixed(8)).join(', '));

say('');
say('  the 2k pattern s(1 - 3^-k), D+ chains');
for (const [num, den, lbl] of [[28n, 10n, '2.8'], [3n, 1n, '3.0']]) {
  const s = fr(num, den), sv = fnum(s);
  const row = [];
  for (let k = 1; k <= 4; k++) {
    const v = fnum(lpMax(2 * k, s, '+'));
    row.push(`2k=${2 * k}: ${v.toFixed(6)} (claim ${(sv * (1 - Math.pow(3, -k))).toFixed(6)})`);
  }
  say(`  s = ${lbl}: ` + row.join('; '));
}

say('');
say('  the corollary crossing 2 * LP4+(s) = beta2, by bisection on the exact LP');
let lo = 2, hi = 3;
for (let it = 0; it < 60; it++) {
  const mid = (lo + hi) / 2;
  const v = 2 * fnum(lpMax(4, fr(BigInt(Math.round(mid * 1e12)), 10n ** 12n), '+'));
  if (v < BETA2) lo = mid; else hi = mid;
}
say(`  crossing s* = ${((lo + hi) / 2).toFixed(12)}   9*beta2/16 = ${(9 * BETA2 / 16).toFixed(12)}   |diff| = ${Math.abs((lo + hi) / 2 - 9 * BETA2 / 16).toExponential(3)}`);
say(`  1+sqrt(e) = ${(1 + Math.sqrt(Math.E)).toFixed(6)} clears it by ${((1 + Math.sqrt(Math.E)) - 9 * BETA2 / 16).toFixed(6)}`);

say('');
say('  the exit expression max(sum a + 3 a_last) against s: exit exists iff max > s');
say('  s | n=4 max(sum a) | n=4 max(sum a + 3a4) | exit at the optimum? | family empty?');
for (const sv of [2.7, 3, 4, 5, 6, 6.9, 7, 7.5, 9, 20]) {
  const s = fr(BigInt(Math.round(sv * 1e6)), 10n ** 6n);
  const o = fnum(lpMax(4, s, '+'));
  const e = fnum(lpExitMax(4, s, '+'));
  const lex = chainLP(4, s, '+', true);
  const lexSum = fnum(lex.x.reduce((a, v) => fadd(a, v), F0));
  const lexExit = lexSum + 3 * fnum(lex.x[3]);
  say(`  ${sv} | ${o.toFixed(6)} | ${e.toFixed(6)} | ${lexExit > sv + 1e-12 ? 'YES (' + lexExit.toFixed(4) + ')' : 'NO (' + lexExit.toFixed(4) + ')'} | ${e <= sv + 1e-12 ? 'EMPTY' : 'non-empty'}`);
}
say('  all-ones 2k chains: feasible iff 2k+1 <= s; exit iff 2k+3 > s (checked)');
for (const sv of [7, 9, 12, 20]) {
  const s = fr(BigInt(Math.round(sv * 1e6)), 10n ** 6n);
  let bestk = 0, bestv = 0;
  for (let k = 1; k <= 12; k++) {
    const e = fnum(lpExitMax(2 * k, s, '+'));
    const o = fnum(lpMax(2 * k, s, '+'));
    if (e > sv + 1e-12 && o > bestv) { bestv = o; bestk = 2 * k; }
  }
  say(`  s = ${sv}: best chain length with a legal exit = ${bestk}, doubled threshold ${(2 * bestv).toFixed(4)} against beta2 ${BETA2.toFixed(4)}`);
}

/* ============================== S2 ==================================== */
say('');
say('=== S2  the LOWER-sieve LP and the floor under an ARBITRARY level split ===');
say('  D- chains (odd omega, even-m prefix conditions), LP-(sig), caps a_i <= 1');
say('  sig | n=3 | n=5 | n=7 | n=9 | n=11');
for (const sv of [2.0, 2.6487, 3.0, 3.5, 4.0]) {
  const s = fr(BigInt(Math.round(sv * 1e6)), 10n ** 6n);
  const r = [3, 5, 7, 9, 11].map(n => fnum(lpMax(n, s, '-')).toFixed(6));
  say(`  ${sv} | ` + r.join(' | '));
}
say('  D+ chains for comparison, LP+(sig)');
say('  sig | n=4 | n=6 | n=8 | n=10 | n=12');
for (const sv of [2.0, 2.6487, 3.0, 3.5, 4.0]) {
  const s = fr(BigInt(Math.round(sv * 1e6)), 10n ** 6n);
  const r = [4, 6, 8, 10, 12].map(n => fnum(lpMax(n, s, '+')).toFixed(6));
  say(`  ${sv} | ` + r.join(' | '));
}
say('');
say('  positivity of the vector sieve main term with upper level a, lower level b:');
say('    2 f(b) > F(a),  F(sig) = 2 e^gamma / sig,  f(sig) = 2 e^gamma ln(sig-1)/sig');
const EG = 2 * Math.exp(0.5772156649015329);
const Fu = (x) => EG / x;                    // valid 1 <= x <= 3, an upper bound of the truth beyond
const fl = (x) => (x <= 2 ? 0 : EG * Math.log(x - 1) / x);   // valid 2 <= x <= 4
say(`    f(sig) < 1 for every sig, so positivity forces F(a) < 2, i.e. a > e^gamma = ${(EG / 2).toFixed(6)}`);
say(`    equal levels a = b: 2f(s) > F(s) <=> s > 1 + sqrt(e) = ${(1 + Math.sqrt(Math.E)).toFixed(10)} (check: 2f - F at s = 1+sqrt(e) is ${(2 * fl(1 + Math.sqrt(Math.E)) - Fu(1 + Math.sqrt(Math.E))).toExponential(2)})`);
say('');
say('  ESCAPE SCAN.  floor exponent = LP+(a) + max(LP+(a), LP-(b))   [Omega >= A1A2 + A1B2 + B1A2]');
say('  decoupled window exponent u = max(a, b).  An escape needs floor <= u AND positivity.');
say('  a | b | positivity | u | floor(4-chain) | floor(long chain) | escape?');
let escapes4 = 0, escapesL = 0, bestGap4 = Infinity, bestAB = null;
const cache = new Map();
const LPv = (n, sv, side) => {
  const key = n + '|' + sv.toFixed(4) + '|' + side;
  if (!cache.has(key)) cache.set(key, fnum(lpMax(n, fr(BigInt(Math.round(sv * 1e4)), 10n ** 4n), side)));
  return cache.get(key);
};
const rows = [];
for (let ai = 0; ai < 60; ai++) {
  const a = 1.7 + ai * 0.05;
  for (let bi = 0; bi < 60; bi++) {
    const b = 2.0 + bi * 0.05;
    if (b > 4.0) continue;
    const pos = 2 * fl(b) > Fu(a);
    if (!pos) continue;
    const u = Math.max(a, b);
    const f4 = LPv(4, a, '+') + Math.max(LPv(4, a, '+'), LPv(3, b, '-'));
    const fL = LPv(12, a, '+') + Math.max(LPv(12, a, '+'), LPv(11, b, '-'));
    if (f4 <= u) { escapes4++; if (u - f4 < bestGap4) { bestGap4 = u - f4; } }
    if (fL <= u) escapesL++;
    const gap = f4 - u;
    rows.push([a, b, u, f4, fL, gap]);
  }
}
rows.sort((p, q) => p[5] - q[5]);
for (let i = 0; i < 6; i++) {
  const r = rows[i];
  say(`  ${r[0].toFixed(2)} | ${r[1].toFixed(2)} | yes | ${r[2].toFixed(3)} | ${r[3].toFixed(4)} | ${r[4].toFixed(4)} | ${r[3] <= r[2] ? 'ESCAPE' : 'no (floor - u = ' + r[5].toFixed(4) + ')'}`);
}
say(`  admissible (a,b) cells scanned: ${rows.length}; escapes with 4-chains: ${escapes4}; with 12-chains: ${escapesL}`);
say(`  smallest margin floor - u over the admissible region: ${rows[0][5].toFixed(6)} at (a,b) = (${rows[0][0].toFixed(2)}, ${rows[0][1].toFixed(2)})`);
say('  equal-level slice for reference:');
for (const s of [2.6487, 2.7, 2.8, 3.0]) {
  const f4 = LPv(4, s, '+') + Math.max(LPv(4, s, '+'), LPv(3, s, '-'));
  const fL = LPv(12, s, '+') + Math.max(LPv(12, s, '+'), LPv(11, s, '-'));
  say(`    s = ${s}: 2*LP4+ = ${(2 * LPv(4, s, '+')).toFixed(4)} (the note's route);`);
  say(`      full floor with the B-terms: 4-chain ${f4.toFixed(4)}, long chain ${fL.toFixed(4)} (exponents)`);
}

/* ============================== S3 ==================================== */
say('');
say('=== S3  the literal dyadic family A1*A2 on an independent byte sieve ===');
const NMAX = 100000000;
const t0 = Date.now();
const comp = new Uint8Array(NMAX + 1);
for (let i = 2; i * i <= NMAX; i++) if (!comp[i]) for (let j = i * i; j <= NMAX; j += i) comp[j] = 1;
const pref = new Int32Array((NMAX >> 8) + 2);   // primes counted in blocks of 256
{
  let c = 0, blk = 0;
  for (let n = 2; n <= NMAX; n++) { if (!comp[n]) c++; if ((n & 255) === 255) pref[++blk] = c; }
  pref[(NMAX >> 8) + 1] = c;
}
function piUpTo(x) {                                   // exact pi(x) for x <= NMAX
  x = Math.floor(x); if (x < 2) return 0; if (x > NMAX) throw new Error('range');
  const blk = (x >> 8);
  let c = pref[blk];
  for (let n = blk << 8; n <= x; n++) if (n >= 2 && !comp[n]) c++;
  return c;
}
const boxCount = (loEx, hiIn) => piUpTo(hiIn) - piUpTo(Math.floor(loEx));
say(`  sieve to ${NMAX.toExponential(0)} built in ${((Date.now() - t0) / 1000).toFixed(1)} s; pi(1e8) = ${piUpTo(1e8)} (control: 5761455)`);
say('  boxes: p1 in (D^(1/3)/2, D^(1/3)], p2 in (D^(1/3)/4, D^(1/3)/2],');
say('         p3 in (D^(1/9)/2, D^(1/9)], p4 in (D^(1/9)/4, D^(1/9)/2]');
say('  A1 = prod ceil(c_j/2), A2 = prod floor(c_j/2)   (index-parity split)');
say('  s | z | c1,c2,c3,c4 | A1A2 | log_z(A1A2) | step slope');
const fam = {};
for (const s of [3.0, 2.8, 2.7]) {
  fam[s] = [];
  let prev = null;
  for (const z of [1e6, 3e6, 1e7, 3e7, 1e8]) {
    const D3 = Math.pow(z, s / 3), D9 = Math.pow(z, s / 9);
    if (D3 > NMAX) { say(`  ${s} | ${z.toExponential(0)} | out of sieve range`); continue; }
    const c = [boxCount(D3 / 2, D3), boxCount(D3 / 4, D3 / 2), boxCount(D9 / 2, D9), boxCount(D9 / 4, D9 / 2)];
    if (c.some(v => v < 2)) { say(`  ${s} | ${z.toExponential(0)} | ${c.join(',')} | a box holds < 2 primes, family empty after the split`); continue; }
    let lnA1 = 0, lnA2 = 0;
    for (const cj of c) { lnA1 += Math.log(Math.ceil(cj / 2)); lnA2 += Math.log(Math.floor(cj / 2)); }
    const lnA = lnA1 + lnA2, lz = Math.log(z);
    const slope = prev ? (lnA - prev.lnA) / (lz - prev.lz) : null;
    say(`  ${s} | ${z.toExponential(0)} | ${c.join(',')} | ${Math.exp(lnA - Math.floor(lnA / Math.LN10) * Math.LN10).toFixed(3)}e${Math.floor(lnA / Math.LN10)} | ${(lnA / lz).toFixed(4)} | ${slope === null ? '--' : slope.toFixed(4)}`);
    fam[s].push({ z, lnA, lz, c });
    prev = { lnA, lz };
  }
  const model = (z) => 16 * s / 9 - 8 / Math.log(z);
  say(`  model 16s/9 - 8/ln z at z = 1e8: ${model(1e8).toFixed(4)}`);
}
say('');
say('  fitted constant C in A1A2 = C z^{16s/9} / ln^8 z, from the top measured level,');
say('  and the level at which C z^{16s/9}/ln^8 z first reaches z^{beta2}:');
say('  AND its dependence on u0: the crossing solves C z^{16s/9}/ln^8 z = z^{u0}, so it moves with u0.');
say('  s | C | crossing at u0 = beta2 | crossing at u0 = 4.2165 (the record\'s reduced-range u0)');
const crossAt = (s, lnC, u0) => {
  let a = Math.log(10) * 5, b = Math.log(10) * 2000;
  for (let it = 0; it < 300; it++) {
    const m = (a + b) / 2;
    if (lnC + (16 * s / 9) * m - 8 * Math.log(m) < u0 * m) a = m; else b = m;
  }
  return (a + b) / 2 / Math.LN10;
};
for (const s of [3.0, 2.8, 2.7]) {
  const arr = fam[s]; if (!arr.length) continue;
  const top = arr[arr.length - 1];
  const lnC = top.lnA - (16 * s / 9) * top.lz + 8 * Math.log(top.lz);
  say(`  ${s} | ${Math.exp(lnC).toExponential(4)} (from z = ${top.z.toExponential(0)}) | 10^${crossAt(s, lnC, BETA2).toFixed(2)} | 10^${crossAt(s, lnC, 4.2165).toFixed(2)}`);
}
say('  the record\'s "z ~ 5.6e31" is 10^31.75; the s = 2.7 row at u0 = 4.2165 is the cell it sits in,');
say('  NOT the s = 2.7 cell at u0 = beta2, so the figure is u0-specific as well as s-specific.');

/* ============================== S4 ==================================== */
say('');
say('=== S4  the EXACT onset of the literal dyadic family ===');
say('  DEFINITION USED HERE (stated so it can be compared): the family is live at z iff');
say('   (i) each of the four boxes holds at least 2 primes (so the parity split gives two sides),');
say('   (ii) with d_min = the product of the SMALLEST prime in each box, there are at least two');
say('        primes p* < min(box4) with d_min * p*^3 > D  (the exact first-exit condition at the');
say('        hardest corner), and (iii) p1 <= z.');
say('  s | first z on a 0.2% log grid | 4 D^{1/27} | D^{1/9}/4 | analytic bound 16^{27/(2s)}');
for (const s of [3.0, 2.8, 2.7, 2.698721]) {
  let onset = null;
  for (let lz = Math.log(1e4); lz < Math.log(3e7); lz += 0.002) {
    const z = Math.exp(lz);
    const D3 = Math.pow(z, s / 3), D9 = Math.pow(z, s / 9);
    if (D3 > z * 1.0000001) break;                     // p1 <= z fails for s > 3
    if (D3 > NMAX) break;
    const c = [boxCount(D3 / 2, D3), boxCount(D3 / 4, D3 / 2), boxCount(D9 / 2, D9), boxCount(D9 / 4, D9 / 2)];
    if (c.some(v => v < 2)) continue;
    // smallest prime in each box
    const smallest = (loEx, hiIn) => { for (let n = Math.floor(loEx) + 1; n <= hiIn; n++) if (n >= 2 && !comp[n]) return n; return null; };
    const p1 = smallest(D3 / 2, D3), p2 = smallest(D3 / 4, D3 / 2), p3 = smallest(D9 / 2, D9), p4 = smallest(D9 / 4, D9 / 2);
    if (!p1 || !p2 || !p3 || !p4) continue;
    const lnDmin = Math.log(p1) + Math.log(p2) + Math.log(p3) + Math.log(p4);
    const lnD = s * Math.log(z);
    let cnt = 0;
    for (let q = 2; q < p4; q++) if (!comp[q] && lnDmin + 3 * Math.log(q) > lnD) cnt++;
    if (cnt >= 2) { onset = z; break; }
  }
  const D = (z) => Math.pow(z, s);
  say(`  ${s} | ${onset === null ? 'not found below the scan top' : onset.toExponential(3)} | ${onset ? (4 * Math.pow(D(onset), 1 / 27)).toFixed(2) : '--'} | ${onset ? (Math.pow(D(onset), 1 / 9) / 4).toFixed(2) : '--'} | ${Math.pow(16, 27 / (2 * s)).toExponential(3)}`);
}

/* ============================== S5 ==================================== */
say('');
say('=== S5  the planted class: ln(n1 n2) and its density ===');
say('  n1 n2 = the product of every prime in the four boxes (both sides together)');
say('  s | z | ln(n1 n2) | theta(z) ~ ln W | log10 of (A1A2)^2 / (n1 n2) | ln^8 z');
function boxLogSum(loEx, hiIn) { let t = 0; for (let n = Math.floor(loEx) + 1; n <= hiIn; n++) if (n >= 2 && !comp[n]) t += Math.log(n); return t; }
for (const [s, z] of [[3.0, 1e6], [3.0, 1e8], [2.8, 1e8]]) {
  const D3 = Math.pow(z, s / 3), D9 = Math.pow(z, s / 9);
  const lnN = boxLogSum(D3 / 2, D3) + boxLogSum(D3 / 4, D3 / 2) + boxLogSum(D9 / 2, D9) + boxLogSum(D9 / 4, D9 / 2);
  const rec = fam[s].find(r => Math.abs(r.z - z) < 1);
  const lnA = rec ? rec.lnA : NaN;
  const theta = boxLogSum(1, z);
  say(`  ${s} | ${z.toExponential(0)} | ${lnN.toExponential(4)} | ${theta.toExponential(4)} | ${((2 * lnA - lnN) / Math.LN10).toExponential(6)} | ${(8 * Math.log(Math.log(z)) / Math.LN10).toFixed(3)} (log10)`);
}
say('');
say('  the same split with a TRUE UPPER bound on Omega, so the check is two-sided:');
say('    lambda+(n) <= 2^omega(n), so Omega <= 3 * 2^(number of box primes)');
say('  s | z | box primes | log10 upper bound on the split contribution | log10 B ~ ln^8 z');
for (const [s2, z2] of [[3.0, 1e8], [2.8, 1e8]]) {
  const D3 = Math.pow(z2, s2 / 3), D9 = Math.pow(z2, s2 / 9);
  const nb = boxCount(D3 / 2, D3) + boxCount(D3 / 4, D3 / 2) + boxCount(D9 / 2, D9) + boxCount(D9 / 4, D9 / 2);
  const lnN2 = boxLogSum(D3 / 2, D3) + boxLogSum(D3 / 4, D3 / 2) + boxLogSum(D9 / 2, D9) + boxLogSum(D9 / 4, D9 / 2);
  const lnUp = 2 * (Math.log(3) + nb * Math.LN2) - lnN2;
  say(`  ${s2} | ${z2.toExponential(0)} | ${nb} | ${(lnUp / Math.LN10).toExponential(6)} | ${(8 * Math.log(Math.log(z2)) / Math.LN10).toFixed(3)}`);
}
say('  NOTE ON DIRECTION: (A1A2)^2/(n1n2) is a LOWER bound on the planted split\'s own');
say('  contribution to <R_1^2> (Omega >= A1A2, and the class has prod_{p | n1n2 not} (p-2) members),');
say('  so it can only show that this split does NOT contradict Lemma V; it is not an upper');
say('  bound on the exceptional set and it covers ONE split, not the sum over splits.');

/* ============================== S6 ==================================== */
say('');
say('=== S6  the L7 note re-checked ===');
const primesTo = (n) => { const p = []; for (let i = 2; i <= n; i++) { let ok = true; for (const q of p) { if (q * q > i) break; if (i % q === 0) { ok = false; break; } } if (ok) p.push(i); } return p; };
say('  (a) CRT counts and the union-bound budget, re-enumerated with an independent walk');
say('  x | W | holes | per-prime counts of holes in class -2 mod p | B(x) | exact non-twin fraction');
for (const x of [7, 11, 13]) {
  const P = primesTo(x), W = P.reduce((a, b) => a * b, 1);
  const isHole = new Uint8Array(W);
  for (let r = 0; r < W; r++) { let ok = 1; for (const p of P) if (r % p === 0) { ok = 0; break; } isHole[r] = ok; }
  let holes = 0; for (let r = 0; r < W; r++) holes += isHole[r];
  const counts = [], preds = [];
  let B = 0;
  for (const p of P) {
    if (p === 2) continue;
    let c = 0;
    for (let r = 0; r < W; r++) if (isHole[r] && (r + 2) % p === 0) c++;
    counts.push(`${p}:${c}`); preds.push(`${p}:${holes / (p - 1)}`);
    B += 1 / (p - 1);
  }
  let notTwin = 0;
  for (let r = 0; r < W; r++) if (isHole[r] && !isHole[(r + 2) % W]) notTwin++;
  let prod = 1; for (const p of P) if (p > 2) prod *= (p - 2) / (p - 1);
  say(`  ${x} | ${W} | ${holes} | ${counts.join(' ')} (predicted ${preds.join(' ')}) | ${B.toFixed(4)} | ${(notTwin / holes).toFixed(4)} (formula 1 - prod (p-2)/(p-1) = ${(1 - prod).toFixed(4)})`);
}
say('');
say('  (b) the union-bound certificate C(x) = #holes in (x, x+H] - sum_p #{holes = -2 mod p},');
say('      its exact period mean, and its MINIMUM over all W positions, at x = 13');
{
  const x = 13, P = primesTo(x), W = P.reduce((a, b) => a * b, 1);
  const isHole = new Uint8Array(W);
  for (let r = 0; r < W; r++) { let ok = 1; for (const p of P) if (r % p === 0) { ok = 0; break; } isHole[r] = ok; }
  const odd = P.filter(p => p > 2);
  const kill = new Int16Array(W);          // number of odd p <= x with p | r+2, for r a hole
  for (let r = 0; r < W; r++) { if (!isHole[r]) continue; let k = 0; for (const p of odd) if ((r + 2) % p === 0) k++; kill[r] = k; }
  for (const H of [50, 100, 200, 400]) {
    let sum = 0, mn = Infinity, mx = -Infinity, neg = 0;
    let cur = 0;
    for (let i = 1; i <= H; i++) cur += isHole[i % W] ? 1 - kill[i % W] : 0;
    for (let s0 = 0; s0 < W; s0++) {
      sum += cur; if (cur < mn) mn = cur; if (cur > mx) mx = cur; if (cur <= 0) neg++;
      const leave = (s0 + 1) % W, enter = (s0 + 1 + H) % W;
      cur -= isHole[leave] ? 1 - kill[leave] : 0;
      cur += isHole[enter] ? 1 - kill[enter] : 0;
    }
    let B = 0; for (const p of odd) B += 1 / (p - 1);
    const holes = Array.from(isHole).reduce((a, b) => a + b, 0);
    say(`  H = ${H}: mean ${(sum / W).toFixed(4)} (predicted H*(phi/W)*(1-B) = ${(H * holes / W * (1 - B)).toFixed(4)}), min ${mn}, max ${mx}, positions with C <= 0: ${neg} of ${W}`);
  }
  say('  READ: the certificate is POSITIVE at some positions even where the mean is negative,');
  say('  so "vacuous on average" does not mean "non-positive everywhere"; what it does give is');
  say('  "not positive at EVERY position", which is what a Jacobsthal-type bound needs.');
}
say('');
say('  (c) the coupled vector-sieve price, recomputed from F and f rather than quoted');
{
  // levels: upper D+ = z^a, lower D- = z^b, both systems symmetric.
  // positivity 2 f(b) > F(a)  <=>  a > b / (2 ln(b-1))
  // coupled remainder: every block modulus <= H = z^u, so u >= a + b.
  let best = Infinity, bestT = 0;
  for (let t = 0.01; t < 3; t += 0.000001) {
    const b = 1 + Math.exp(t), a = b / (2 * t);
    const u = a + b;
    if (u < best) { best = u; bestT = t; }
  }
  const bB = 1 + Math.exp(bestT), aB = bB / (2 * bestT);
  say(`  free upper/lower levels: min u = a + b = ${best.toFixed(12)} at a = ${aB.toFixed(6)}, b = ${bB.toFixed(6)} (b/a = ${(bB / aB).toFixed(4)})`);
  say(`  forced equal levels a = b: min u = 2(1 + sqrt e) = ${(2 * (1 + Math.sqrt(Math.E))).toFixed(12)}`);
  say(`  the corpus's two constants: K_BF = 5.158064680330, K_FH = 2(1+sqrt e) = 5.297442541400, gap ${((2 * (1 + Math.sqrt(Math.E)) / 5.158064680330 - 1) * 100).toFixed(6)} %`);
  say(`  both are above beta2 = ${BETA2}; the SMALLER, and hence the one a price should quote, is ${best.toFixed(6)}`);
}

console.log(out.join('\n'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0904-item0.js
//   invocation:  node research/history/staging/redteam-0904-item0.js
//   code-sha256: 7179235e17b3d8b005943f2baa1b182243bae60a815fa528d18277c80ecac29d
//   out-sha256:  796325ce97e11ba77e18c137abf6b04e821fa1aee625ca96fc5e7fc550262fd8
//   body-lines:  177
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-04
//   elapsed:     1.6 s
// ============================================================================
// === S1  exact-rational LP for the D+ exit chains (own simplex) ===
//   four-prime capped LP against the claimed closed form
//   s | LP4+ | claim | agree
//   2.400000 | 2.1333333333 | 2.1333333333 | YES
//   2.648721 | 2.3544186667 | 2.3544186667 | YES
//   2.700000 | 2.4000000000 | 2.4000000000 | YES
//   2.800000 | 2.4888888889 | 2.4888888889 | YES
//   2.900000 | 2.5777777778 | 2.5777777778 | YES
//   3.000000 | 2.6666666667 | 2.6666666667 | YES
//   3.100000 | 2.7333333333 | 2.7333333333 | YES
//   3.500000 | 3.0000000000 | 3.0000000000 | YES
//   4.000000 | 3.3333333333 | 3.3333333333 | YES
//   4.500000 | 3.6666666667 | 3.6666666667 | YES
//   5.000000 | 4.0000000000 | 4.0000000000 | YES
//   6.000000 | 4.0000000000 | 4.0000000000 | YES
//   7.000000 | 4.0000000000 | 4.0000000000 | YES
//   8.000000 | 4.0000000000 | 4.0000000000 | YES
//   10.000000 | 4.0000000000 | 4.0000000000 | YES
//   20.000000 | 4.0000000000 | 4.0000000000 | YES
//   deviations from the closed form: 0 of 16, largest residual 4.441e-16
//   the optimal vertex at s = 2.7 (printed, not assumed):
//     a = 0.90000000, 0.90000000, 0.30000000, 0.30000000
//
//   the 2k pattern s(1 - 3^-k), D+ chains
//   s = 2.8: 2k=2: 1.866667 (claim 1.866667); 2k=4: 2.488889 (claim 2.488889); 2k=6: 2.696296 (claim 2.696296); 2k=8: 2.765432 (claim 2.765432)
//   s = 3.0: 2k=2: 2.000000 (claim 2.000000); 2k=4: 2.666667 (claim 2.666667); 2k=6: 2.888889 (claim 2.888889); 2k=8: 2.962963 (claim 2.962963)
//
//   the corollary crossing 2 * LP4+(s) = beta2, by bisection on the exact LP
//   crossing s* = 2.399878284834   9*beta2/16 = 2.399878284834   |diff| = 1.097e-13
//   1+sqrt(e) = 2.648721 clears it by 0.248843
//
//   the exit expression max(sum a + 3 a_last) against s: exit exists iff max > s
//   s | n=4 max(sum a) | n=4 max(sum a + 3a4) | exit at the optimum? | family empty?
//   2.7 | 2.400000 | 3.780000 | YES (3.7800) | non-empty
//   3 | 2.666667 | 4.200000 | YES (4.2000) | non-empty
//   4 | 3.333333 | 5.600000 | YES (5.6000) | non-empty
//   5 | 4.000000 | 7.000000 | YES (7.0000) | non-empty
//   6 | 4.000000 | 7.000000 | YES (7.0000) | non-empty
//   6.9 | 4.000000 | 7.000000 | YES (7.0000) | non-empty
//   7 | 4.000000 | 7.000000 | NO (7.0000) | EMPTY
//   7.5 | 4.000000 | 7.000000 | NO (7.0000) | EMPTY
//   9 | 4.000000 | 7.000000 | NO (7.0000) | EMPTY
//   20 | 4.000000 | 7.000000 | NO (7.0000) | EMPTY
//   all-ones 2k chains: feasible iff 2k+1 <= s; exit iff 2k+3 > s (checked)
//   s = 7: best chain length with a legal exit = 24, doubled threshold 13.9999 against beta2 4.2665
//   s = 9: best chain length with a legal exit = 24, doubled threshold 17.9997 against beta2 4.2665
//   s = 12: best chain length with a legal exit = 24, doubled threshold 23.9982 against beta2 4.2665
//   s = 20: best chain length with a legal exit = 24, doubled threshold 39.8519 against beta2 4.2665
//
// === S2  the LOWER-sieve LP and the floor under an ARBITRARY level split ===
//   D- chains (odd omega, even-m prefix conditions), LP-(sig), caps a_i <= 1
//   sig | n=3 | n=5 | n=7 | n=9 | n=11
//   2 | 1.666667 | 1.888889 | 1.962963 | 1.987654 | 1.995885
//   2.6487 | 2.099133 | 2.465511 | 2.587637 | 2.628346 | 2.641915
//   3 | 2.333333 | 2.777778 | 2.925926 | 2.975309 | 2.991770
//   3.5 | 2.666667 | 3.222222 | 3.407407 | 3.469136 | 3.489712
//   4 | 3.000000 | 3.666667 | 3.888889 | 3.962963 | 3.987654
//   D+ chains for comparison, LP+(sig)
//   sig | n=4 | n=6 | n=8 | n=10 | n=12
//   2 | 1.777778 | 1.925926 | 1.975309 | 1.991770 | 1.997257
//   2.6487 | 2.354400 | 2.550600 | 2.616000 | 2.637800 | 2.645067
//   3 | 2.666667 | 2.888889 | 2.962963 | 2.987654 | 2.995885
//   3.5 | 3.000000 | 3.333333 | 3.444444 | 3.481481 | 3.493827
//   4 | 3.333333 | 3.777778 | 3.925926 | 3.975309 | 3.991770
//
//   positivity of the vector sieve main term with upper level a, lower level b:
//     2 f(b) > F(a),  F(sig) = 2 e^gamma / sig,  f(sig) = 2 e^gamma ln(sig-1)/sig
//     f(sig) < 1 for every sig, so positivity forces F(a) < 2, i.e. a > e^gamma = 1.781072
//     equal levels a = b: 2f(s) > F(s) <=> s > 1 + sqrt(e) = 2.6487212707 (check: 2f - F at s = 1+sqrt(e) is 0.00e+0)
//
//   ESCAPE SCAN.  floor exponent = LP+(a) + max(LP+(a), LP-(b))   [Omega >= A1A2 + A1B2 + B1A2]
//   decoupled window exponent u = max(a, b).  An escape needs floor <= u AND positivity.
//   a | b | positivity | u | floor(4-chain) | floor(long chain) | escape?
//   1.85 | 4.00 | yes | 4.000 | 4.6444 | 5.8351 | no (floor - u = 0.6444)
//   1.85 | 3.95 | yes | 3.950 | 4.6111 | 5.7853 | no (floor - u = 0.6611)
//   1.85 | 3.90 | yes | 3.900 | 4.5778 | 5.7355 | no (floor - u = 0.6778)
//   1.90 | 4.00 | yes | 4.000 | 4.6889 | 5.8850 | no (floor - u = 0.6889)
//   1.85 | 3.85 | yes | 3.850 | 4.5444 | 5.6857 | no (floor - u = 0.6944)
//   1.90 | 3.95 | yes | 3.950 | 4.6556 | 5.8353 | no (floor - u = 0.7056)
//   admissible (a,b) cells scanned: 1643; escapes with 4-chains: 0; with 12-chains: 0
//   smallest margin floor - u over the admissible region: 0.644444 at (a,b) = (1.85, 4.00)
//   equal-level slice for reference:
//     s = 2.6487: 2*LP4+ = 4.7088 (the note's route);
//       full floor with the B-terms: 4-chain 4.7088, long chain 5.2901 (exponents)
//     s = 2.7: 2*LP4+ = 4.8000 (the note's route);
//       full floor with the B-terms: 4-chain 4.8000, long chain 5.3926 (exponents)
//     s = 2.8: 2*LP4+ = 4.9778 (the note's route);
//       full floor with the B-terms: 4-chain 4.9778, long chain 5.5923 (exponents)
//     s = 3: 2*LP4+ = 5.3333 (the note's route);
//       full floor with the B-terms: 4-chain 5.3333, long chain 5.9918 (exponents)
//
// === S3  the literal dyadic family A1*A2 on an independent byte sieve ===
//   sieve to 1e+8 built in 0.6 s; pi(1e8) = 5761455 (control: 5761455)
//   boxes: p1 in (D^(1/3)/2, D^(1/3)], p2 in (D^(1/3)/4, D^(1/3)/2],
//          p3 in (D^(1/9)/2, D^(1/9)], p4 in (D^(1/9)/4, D^(1/9)/2]
//   A1 = prod ceil(c_j/2), A2 = prod floor(c_j/2)   (index-parity split)
//   s | z | c1,c2,c3,c4 | A1A2 | log_z(A1A2) | step slope
//   3 | 1e+6 | 36960,19494,10,6 | 7.300e18 | 3.1439 | --
//   3 | 3e+6 | 102661,53917,14,9 | 1.877e21 | 3.2844 | 5.0512
//   3 | 1e+7 | 316066,165441,19,12 | 5.537e23 | 3.3919 | 4.7237
//   3 | 3e+7 | 887155,462443,27,15 | 1.072e26 | 3.4813 | 4.7933
//   3 | 1e+8 | 2760321,1435207,40,20 | 3.924e28 | 3.5742 | 4.9025
//   model 16s/9 - 8/ln z at z = 1e8: 4.8990
//   2.8 | 1e+6 | 15795,8364,10,4 | 1.091e17 | 2.8396 | --
//   2.8 | 3e+6 | 40745,21465,12,6 | 1.549e19 | 2.9627 | 4.5110
//   2.8 | 1e+7 | 115899,60765,14,9 | 3.038e21 | 3.0689 | 4.3845
//   2.8 | 3e+7 | 301970,157951,20,12 | 5.119e23 | 3.1709 | 4.6667
//   2.8 | 1e+8 | 867147,452090,27,15 | 9.790e25 | 3.2488 | 4.3636
//   model 16s/9 - 8/ln z at z = 1e8: 4.5435
//   2.7 | 1e+6 | 10350,5481,7,5 | 1.448e16 | 2.6935 | --
//   2.7 | 3e+6 | 25698,13604,9,6 | 1.375e18 | 2.8004 | 4.1446
//   2.7 | 1e+7 | 70258,36887,12,7 | 1.813e20 | 2.8941 | 4.0549
//   2.7 | 3e+7 | 176592,92470,17,9 | 2.400e22 | 2.9932 | 4.4468
//   2.7 | 1e+8 | 486938,254337,24,12 | 4.969e24 | 3.0870 | 4.4296
//   model 16s/9 - 8/ln z at z = 1e8: 4.3657
//
//   fitted constant C in A1A2 = C z^{16s/9} / ln^8 z, from the top measured level,
//   and the level at which C z^{16s/9}/ln^8 z first reaches z^{beta2}:
//   AND its dependence on u0: the crossing solves C z^{16s/9}/ln^8 z = z^{u0}, so it moves with u0.
//   s | C | crossing at u0 = beta2 | crossing at u0 = 4.2165 (the record's reduced-range u0)
//   3 | 1.1206e-4 (from z = 1e+8) | 10^15.30 | 10^14.44
//   2.8 | 1.9543e-4 (from z = 1e+8) | 10^25.01 | 10^22.99
//   2.7 | 2.6227e-4 (from z = 1e+8) | 10^35.36 | 10^31.68
//   the record's "z ~ 5.6e31" is 10^31.75; the s = 2.7 row at u0 = 4.2165 is the cell it sits in,
//   NOT the s = 2.7 cell at u0 = beta2, so the figure is u0-specific as well as s-specific.
//
// === S4  the EXACT onset of the literal dyadic family ===
//   DEFINITION USED HERE (stated so it can be compared): the family is live at z iff
//    (i) each of the four boxes holds at least 2 primes (so the parity split gives two sides),
//    (ii) with d_min = the product of the SMALLEST prime in each box, there are at least two
//         primes p* < min(box4) with d_min * p*^3 > D  (the exact first-exit condition at the
//         hardest corner), and (iii) p1 <= z.
//   s | first z on a 0.2% log grid | 4 D^{1/27} | D^{1/9}/4 | analytic bound 16^{27/(2s)}
//   3 | 4.390e+5 | 16.94 | 19.00 | 2.621e+5
//   2.8 | 1.111e+6 | 16.94 | 19.00 | 6.391e+5
//   2.7 | 1.860e+6 | 16.94 | 19.00 | 1.049e+6
//   2.698721 | 1.875e+6 | 16.95 | 19.01 | 1.055e+6
//
// === S5  the planted class: ln(n1 n2) and its density ===
//   n1 n2 = the product of every prime in the four boxes (both sides together)
//   s | z | ln(n1 n2) | theta(z) ~ ln W | log10 of (A1A2)^2 / (n1 n2) | ln^8 z
//   3 | 1e+6 | 7.4900e+5 | 9.9848e+5 | -3.252504e+5 | 9.123 (log10)
//   3 | 1e+8 | 7.4993e+7 | 9.9988e+7 | -3.256917e+7 | 10.122 (log10)
//   2.8 | 1e+8 | 2.1960e+7 | 9.9988e+7 | -9.537092e+6 | 10.122 (log10)
//
//   the same split with a TRUE UPPER bound on Omega, so the check is two-sided:
//     lambda+(n) <= 2^omega(n), so Omega <= 3 * 2^(number of box primes)
//   s | z | box primes | log10 upper bound on the split contribution | log10 B ~ ln^8 z
//   3 | 1e+8 | 4195588 | -3.004323e+7 | 10.122
//   2.8 | 1e+8 | 1319279 | -8.742858e+6 | 10.122
//   NOTE ON DIRECTION: (A1A2)^2/(n1n2) is a LOWER bound on the planted split's own
//   contribution to <R_1^2> (Omega >= A1A2, and the class has prod_{p | n1n2 not} (p-2) members),
//   so it can only show that this split does NOT contradict Lemma V; it is not an upper
//   bound on the exceptional set and it covers ONE split, not the sum over splits.
//
// === S6  the L7 note re-checked ===
//   (a) CRT counts and the union-bound budget, re-enumerated with an independent walk
//   x | W | holes | per-prime counts of holes in class -2 mod p | B(x) | exact non-twin fraction
//   7 | 210 | 48 | 3:24 5:12 7:8 (predicted 3:24 5:12 7:8) | 0.9167 | 0.6875 (formula 1 - prod (p-2)/(p-1) = 0.6875)
//   11 | 2310 | 480 | 3:240 5:120 7:80 11:48 (predicted 3:240 5:120 7:80 11:48) | 1.0167 | 0.7188 (formula 1 - prod (p-2)/(p-1) = 0.7188)
//   13 | 30030 | 5760 | 3:2880 5:1440 7:960 11:576 13:480 (predicted 3:2880 5:1440 7:960 11:576 13:480) | 1.1000 | 0.7422 (formula 1 - prod (p-2)/(p-1) = 0.7422)
//
//   (b) the union-bound certificate C(x) = #holes in (x, x+H] - sum_p #{holes = -2 mod p},
//       its exact period mean, and its MINIMUM over all W positions, at x = 13
//   H = 50: mean -0.9590 (predicted H*(phi/W)*(1-B) = -0.9590), min -6, max 3, positions with C <= 0: 25386 of 30030
//   H = 100: mean -1.9181 (predicted H*(phi/W)*(1-B) = -1.9181), min -9, max 4, positions with C <= 0: 27456 of 30030
//   H = 200: mean -3.8362 (predicted H*(phi/W)*(1-B) = -3.8362), min -10, max 3, positions with C <= 0: 29466 of 30030
//   H = 400: mean -7.6723 (predicted H*(phi/W)*(1-B) = -7.6723), min -14, max -1, positions with C <= 0: 30030 of 30030
//   READ: the certificate is POSITIVE at some positions even where the mean is negative,
//   so "vacuous on average" does not mean "non-positive everywhere"; what it does give is
//   "not positive at EVERY position", which is what a Jacobsthal-type bound needs.
//
//   (c) the coupled vector-sieve price, recomputed from F and f rather than quoted
//   free upper/lower levels: min u = a + b = 5.158064680330 at a = 2.229949, b = 2.928115 (b/a = 1.3131)
//   forced equal levels a = b: min u = 2(1 + sqrt e) = 5.297442541400
//   the corpus's two constants: K_BF = 5.158064680330, K_FH = 2(1+sqrt e) = 5.297442541400, gap 2.702135 %
//   both are above beta2 = 4.26645028414864; the SMALLER, and hence the one a price should quote, is 5.158065
// ============================================================================
// READINGS
// 1. LP (S1). The four-prime capped maximum reproduces 8s/9 (s <= 3),
//    (2s+2)/3 (3 <= s <= 5) and 4 (s >= 5) at 16 values of s with 0 deviations
//    and a largest residual 4.441e-16, by an exact rational simplex rather than
//    by vertex enumeration or a grid; the optimal vertex at s = 2.7 prints as
//    (0.9, 0.9, 0.3, 0.3) = (s/3, s/3, s/9, s/9). VERIFIED.
// 2. The corollary crossing 2 * cappedLP4(s) = beta2 lands at 2.399878284834
//    against 9*beta2/16 = 2.399878284834, agreeing to 1.097e-13. VERIFIED.
// 3. The exit expression max(sum a + 3 a_4) equals 7 for every s >= 5, so the
//    four-prime family has NO legal exit prime from s = 7 INCLUSIVE (the
//    condition is strict). Longer chains carry s >= 7 at a doubled threshold
//    that tracks 2s (13.9999 at s = 7, 17.9997 at 9, 23.9982 at 12), never
//    below beta2. VERIFIED at the tested s.
// 4. Level splits (S2). With the upper level a and the lower level b free, the
//    vector sieve's main term is positive only for a > e^gamma = 1.781072
//    (because f < 1 always), and over 1643 admissible (a, b) cells the floor
//    LP+(a) + max(LP+(a), LP-(b)) exceeds the decoupled window max(a, b) at
//    EVERY cell, by at least 0.644444 (at a = 1.85, b = 4.00) with four-prime
//    chains and by more with twelve-prime chains. So no level split escapes,
//    and "at equal levels" is not the operative restriction. DERIVED + computed.
// 5. Counting the B-terms (Omega >= A1A2 + A1B2 + B1A2) with long chains raises
//    the equal-level floor from the note's 2*LP4+ to 5.2901 at s = 1+sqrt(e)
//    and 5.9918 at s = 3.0, i.e. towards 2s. The note's 16s/9 is conservative.
// 6. The dyadic family (S3). Independent sieve, independent box counts:
//    log_z(A1A2) = 3.5742 at (3.0, 1e8) and the step slope 4.9025 at the top
//    step, reproducing the reviewed note digit for digit; the fitted constant
//    is C = 1.1206e-4 at s = 3.0 and the crossing with z^{beta2} is 10^15.30.
//    MEASURED at five levels per s.
// 7. The crossing moves with u0 as well as with s: at s = 2.7 it is 10^35.36 at
//    u0 = beta2 and 10^31.68 at u0 = 4.2165, and the record's 5.6e31 = 10^31.75
//    is the second cell. Any replacement figure must fix both parameters.
// 8. The onset (S4). Under the stated definition the literal family first goes
//    live at z = 4.390e5 (s = 3.0), 1.111e6 (2.8), 1.860e6 (2.7) and 1.875e6
//    (s = 2.698721), against the analytic bound 16^{27/(2s)} = 1.055e6 at the
//    last. At its OWN s the analytic figure is early by 1.78x, not late.
// 9. The planted class (S5). ln(n1 n2) = 7.4993e7 at (3.0, 1e8) against
//    theta(z) = 9.9988e7, i.e. three quarters of D^{1/3}, so the density exp(-Theta(D^{1/3}))
//    is derived and measured. Two-sided: with the true upper bound
//    lambda+(n) <= 2^omega(n) the split's contribution to <R_1^2> is at most
//    10^{-3.004323e+7}, against B ~ 10^{10.1}. No contradiction with Lemma V from
//    this split, in either direction. One split only, not the sum over splits.
// 10. L7 (S6). The CRT counts re-enumerate EQUAL to phi(W)/(p-1) at x = 7, 11,
//    13; B(13) = 1.1000; the exact non-twin-slot fraction 0.7422 equals
//    1 - prod (p-2)/(p-1). The union-bound certificate's period mean matches
//    H*(phi/W)*(1-B) exactly at four H, and it is <= 0 at 25386 of 30030
//    positions at H = 50 rising to all 30030 at H = 400: "vacuous on average"
//    kills the ALL-positions form, which is the form L7 needs, but the
//    certificate is still positive at some positions for H <= 200.
// 11. The coupled vector-sieve price recomputed from F and f: the free-level
//    optimum is 5.158064680330 at (a, b) = (2.229949, 2.928115), reproducing
//    the corpus's K_BF to twelve digits, while 2(1 + sqrt e) = 5.297442541400
//    is the value only when D- = D+ is forced. The smaller is the one a price
//    should quote; both are above beta2.
