// ============================================================================
// ATTACK QUADPOINT 02 — THE DEPTH-COST DECADE EXTENSION (Z1): THE SEGMENTED
// ENGINE CARRIES THE TRANSPLANTED UNIFIED-CAP CERTIFICATE FROM Q = 1499 TO
// Q = 10007, SCORED AGAINST THE SEALED PREREG
// ============================================================================
// THE QUESTION (TODO item Z1; prereg SEALED ALONE at
// research/history/staging/quadpoint-decade-prereg.md, commit 3f26d19,
// BEFORE this file existed). Does K*/pool — the depth cost of certifying
// stretch occupancy by the transplanted unified caps — keep falling over
// the next decade of anchors, or bend upward (the second-death signature)?
// Registered readings READ-1..READ-4, the trend line with bands, the kill
// rule, KCAP = 64, and the pre-committed escalation all live in the prereg
// and are scored here mechanically.
//
// THE OBJECT (identical to research/attack-quadpoint-01.js, v1, embedded —
// definitions restated once): anchors are primes Q; S_Q = [Q^2, Q'^2);
// channel pair (a, a+2), opener a ≡ 11, 17, 29 (mod 30), in S_Q iff
// Q^2 <= a and a+2 < Q'^2; actives r = 7..Q; march ascending, first
// striking prime wins, fresh(r) = pairs first-struck by r; capU_K(r) =
// candidates v = r*m in the window on either side with lpf(m) >= r and no
// other-member exclusion among the first K actives below r (pool
// ascending); floor_K = C - sum capU_K; K* = least K with floor_K >= 1.
//
// WHAT IS NEW HERE: the ENGINE ONLY. v1 built a full lpf table to Q'^2
// (dies ~400 MB at Q = 10^4). This producer is segmented: per-window
// composite mask by direct marking (an INDEPENDENTLY CODED second sieve
// that re-derives T at every anchor), march by multiples of each active,
// lpf(m) >= r by trial division with early exit, pool scan capped at
// KCAP = 64 for Q > 1499 (disclosed in the prereg; floors exact for all
// K <= 64; any K* > 64 fires READ-3). For Q <= 1499 the pool scan is
// UNCAPPED and the v1 bijection assert (full-depth floor = T) runs at
// every anchor, plus digit-exact reproduction of v1's 24 shown rows, band
// statistics, K = 0 certificate list, and max K*.
//
// WIDTH AUDIT (the level this RUNS at): QMAX = 10007, next prime 10009,
// hi <= 10009^2 = 100,180,081 < 2^31; v = r*m <= hi; all window offsets
// < 2^20; counts < 2^31; no bit shifts on values above 2^30; doubles
// exact where integer. The pre-committed escalation to 31607 (hi ~ 1.0e9
// < 2^31) reuses this audit; past 31607 NOTHING runs without a fresh one.
//
// Everything is exact counting over a finite range; NO first-moment TPC
// claim anywhere (Route B CLOSED, research/REFUTED.md; rho(2) = 0.793
// ADVERSE, stretch-01 §3). Results are HELD for the EOD roundup.
//
// PRIOR ART ON DISK (cited, extended, not re-derived):
//   research/attack-quadpoint-01.js   v1: the transplant instrument; its
//                                     embedded OUTPUT is the calibration
//                                     authority quoted in SEC 0.
//   quadpoint-decade-prereg.md        the sealed readings scored in SEC 3.
//   research/history/staging/attack-quadpoint-01.md  the HELD v1 note.
//   research/history/staging/stretch-01.md §5        the attack statement.
// ============================================================================
'use strict';
const T0 = Date.now();

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function f2(x) { return x.toFixed(2); }
function f3(x) { return x.toFixed(3); }

// ---------- prime tables (small: to 31700, covers the escalation bound) ----
const PLIM = 31700;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);
const QMAX = 10007;
const ANCHORS = ACT.filter(p => p <= QMAX);
const nextPrime = (n) => PRIMES[PRIMES.findIndex(p => p > n)];
assertEq('next prime above QMAX', nextPrime(QMAX), 10009);
assertEq('width audit: top window < 2^31', 10009 * 10009 < 2 ** 31, true);

const KCAP = 64;                 // pool-scan cap for Q > 1499, per the prereg
const CALMAX = 1499;             // v1 overlap range: uncapped, fully asserted

const isOpen30 = (c) => c === 11 || c === 17 || c === 29;
const isClose30 = (c) => c === 13 || c === 19 || c === 1;

// scratch buffers, allocated once at max window width
let maxW = 0;
{ let prev = 7; for (const p of ACT) { if (p > 10009) break; if (prev >= 7 && p > prev) maxW = Math.max(maxW, p * p - prev * prev); prev = p; } }
const comp = new Uint8Array(maxW + 4);      // independent composite mask
const dead = new Uint8Array(maxW + 4);      // march state at opener offsets

// ---------- the per-anchor engine ----------
function runAnchor(Qi) {
  const Q = ANCHORS[Qi], Qp = Qi + 1 < ANCHORS.length ? ANCHORS[Qi + 1] : nextPrime(Q);
  const lo = Q * Q, hi = Qp * Qp, width = hi - lo;
  const nR = Qi + 1;                         // actives 7..Q = ANCHORS[0..Qi]
  comp.fill(0, 0, width + 3); dead.fill(0, 0, width + 3);
  // capacity: openers lo <= a, a+2 < hi
  let C = 0;
  { // count and pre-mark opener offsets (dead = 2 means "not an opener")
    for (let a = lo; a + 2 < hi; a++) if (isOpen30(a % 30)) C++;
  }
  // ---- independent composite sieve (second code path, all primes <= Q) ----
  for (const p of PRIMES) {
    if (p > Q) break;
    let v = Math.ceil(lo / p) * p;
    for (; v <= hi + 1; v += p) comp[v - lo] = 1;
  }
  let T2 = 0;
  for (let a = lo; a + 2 < hi; a++) if (isOpen30(a % 30) && !comp[a - lo] && !comp[a + 2 - lo]) T2++;
  // ---- the march: actives ascending, first touch wins ----
  const fresh = new Int32Array(nR);
  for (let ri = 0; ri < nR; ri++) {
    const r = ACT[ri];
    let v = Math.ceil(lo / r) * r;
    for (; v <= hi; v += r) {
      const c = v % 30;
      if (isOpen30(c)) {                     // A-side: r | a
        if (v + 2 < hi && v >= lo && !dead[v - lo]) { dead[v - lo] = 1; fresh[ri]++; }
      } else if (isClose30(c)) {             // B-side: r | a+2
        const a = v - 2;
        if (a >= lo && v < hi && !dead[a - lo]) { dead[a - lo] = 1; fresh[ri]++; }
      }
    }
  }
  let T = 0;
  for (let a = lo; a + 2 < hi; a++) if (isOpen30(a % 30) && !dead[a - lo]) T++;
  assertEq(`independent T recount at Q=${Q}`, T, T2);
  // ---- the caps: per prime, per-candidate first-exclusion depth ----
  const kEff = Q <= CALMAX ? nR : KCAP;      // pool-scan bound
  const sumCap = new Float64Array(kEff + 1);
  let fullViol = false, freshViol = false;
  for (let ri = 0; ri < nR; ri++) {
    const r = ACT[ri];
    const poolMax = Math.min(ri, kEff);
    const finiteByD = new Int32Array(poolMax + 2);
    let nCand = 0;
    let v = Math.ceil(lo / r) * r;
    for (; v <= hi; v += r) {
      const c = v % 30;
      let side = 0;                          // 1 = A (v = a), 2 = B (v = a+2)
      if (isOpen30(c)) { if (v + 2 < hi) side = 1; }
      else if (isClose30(c)) { if (v - 2 >= lo && v < hi) side = 2; }
      if (!side) continue;
      // lpf(m) >= r by trial division, early exit (m coprime to 30 via v)
      const m = v / r;
      let ok = true;
      for (let t = 0; t < ri; t++) { const p2 = ACT[t]; if (p2 * p2 > m) break; if (m % p2 === 0) { ok = false; break; } }
      if (!ok) continue;
      // NOTE: the loop above stops at sqrt(m); a single prime factor above
      // sqrt(m) is >= r only if m is prime or m's cofactor structure keeps
      // lpf >= r — completed exactly by checking divisibility by ALL
      // actives < r up to min(ri, sqrt(m)); a composite m with lpf >= r
      // needs m >= r^2, handled by the same loop since then p2*p2 <= m
      // holds through p2 < r. So the test is exact.
      nCand++;
      // other-member exclusion: first pool prime that fires
      let d = poolMax + 1;                   // "> poolMax"
      for (let t = 0; t < poolMax; t++) {
        const p2 = ACT[t];
        if (side === 1 ? (v % p2 === p2 - 2) : (v % p2 === 2)) { d = t + 1; break; }
      }
      if (d <= poolMax) finiteByD[d]++;
    }
    // capU_K for K = 0..kEff, this prime
    let excluded = 0;
    for (let K = 0; K <= kEff; K++) {
      if (K >= 1 && K <= poolMax) excluded += finiteByD[K];
      const capK = nCand - excluded;
      if (capK < fresh[ri]) freshViol = true;
      sumCap[K] += capK;
    }
    if (Q <= CALMAX && (nCand - (() => { let e = 0; for (let K = 1; K <= poolMax; K++) e += finiteByD[K]; return e; })()) !== fresh[ri]) fullViol = true;
  }
  assertTrue(`capU >= fresh at every depth, Q=${Q}`, !freshViol);
  if (Q <= CALMAX) assertTrue(`full-depth capU = fresh (bijection), Q=${Q}`, !fullViol);
  const floor0 = C - sumCap[0];
  let Kstar = -1, floorK = NaN;
  for (let K = 0; K <= kEff; K++) if (C - sumCap[K] >= 1) { Kstar = K; floorK = C - sumCap[K]; break; }
  if (Q <= CALMAX) assertEq(`full-depth floor = truth at Q=${Q}`, C - sumCap[nR], T);
  assertTrue(`occupancy at Q=${Q}`, T >= 1);
  return { Q, Qp, width, C, T, nR, floor0, Kstar, floorK, twinQ: Qp - Q === 2 };
}

// ============================================================================
console.log('SEC 0 — CALIBRATION: the v1 overlap, digit-exact (abort on mismatch)');
// ============================================================================
// The 24 rows shown in v1's embedded OUTPUT (Q: width C T pool floor0 K* floor@K*):
const V1ROWS = [
  [7, 72, 6, 4, 1, 4, 0, 4], [11, 48, 4, 2, 2, 2, 0, 2], [13, 120, 11, 7, 3, 7, 0, 7],
  [23, 312, 30, 8, 6, 4, 0, 4], [43, 360, 35, 11, 11, 1, 0, 1], [61, 768, 76, 19, 15, -9, 1, 2],
  [67, 552, 54, 11, 16, -6, 1, 3], [71, 288, 28, 3, 17, -6, 4, 1], [101, 408, 40, 7, 23, -10, 2, 1],
  [149, 600, 59, 10, 32, -10, 2, 2], [199, 4920, 491, 52, 43, -143, 4, 6], [293, 8400, 839, 88, 59, -283, 5, 7],
  [401, 6480, 647, 54, 76, -244, 7, 3], [499, 4008, 400, 28, 92, -171, 9, 4], [601, 7248, 724, 52, 107, -291, 8, 2],
  [701, 11280, 1127, 79, 123, -488, 9, 4], [809, 3240, 323, 19, 137, -147, 16, 1], [907, 7272, 726, 59, 152, -313, 7, 4],
  [1009, 8088, 808, 54, 166, -370, 10, 8], [1103, 13272, 1326, 89, 182, -627, 11, 1], [1201, 28968, 2896, 194, 194, -1379, 12, 14],
  [1301, 5208, 520, 32, 209, -242, 13, 4], [1399, 28080, 2807, 174, 219, -1383, 13, 8], [1499, 36120, 3611, 224, 236, -1742, 13, 1],
];
{
  let fp = 122; while (flag[fp]) fp++;
  assertEq('hand anchor: first prime above 121', fp, 127);
  fp = 170; while (flag[fp]) fp++;
  assertEq('hand anchor: first prime above 169', fp, 173);
}
const rows = [];
for (let Qi = 0; Qi < ANCHORS.length; Qi++) rows.push(runAnchor(Qi));
// v1 row reproduction
for (const [Q, w, C, T, pool, fl0, Ks, flK] of V1ROWS) {
  const r = rows.find(x => x.Q === Q);
  assertTrue(`v1 row Q=${Q}`, r.width === w && r.C === C && r.T === T && r.nR === pool &&
    r.floor0 === fl0 && r.Kstar === Ks && r.floorK === flK);
}
const r7 = rows.find(x => x.Q === 7);
assertTrue('hand anchor S_7', r7.C === 6 && r7.T === 4);
// v1 aggregate reproduction over Q <= 1499
function bandStats(rs) {
  const fr = rs.map(r => r.Kstar / r.nR);
  return { mK: rs.reduce((s, r) => s + r.Kstar, 0) / rs.length,
    mF: fr.reduce((s, x) => s + x, 0) / fr.length, mn: Math.min(...fr), mx: Math.max(...fr), n: rs.length };
}
const cal = rows.filter(r => r.Q <= CALMAX);
{
  const ok0 = cal.filter(r => r.floor0 >= 1).map(r => r.Q);
  assertEq('v1 K=0 certificate list', ok0.join(','), '7,11,13,19,23,31,37,43');
  const b3 = bandStats(cal.filter(r => r.Q >= 101 && r.Q <= 313));
  const b4 = bandStats(cal.filter(r => r.Q >= 317 && r.Q <= 997));
  const b5 = bandStats(cal.filter(r => r.Q >= 1009 && r.Q <= 1499));
  assertTrue('v1 band means/maxes B3', f2(b3.mK) === '3.88' && f3(b3.mF) === '0.093' && f3(b3.mx) === '0.179');
  assertTrue('v1 band means/maxes B4', f2(b4.mK) === '8.42' && f3(b4.mF) === '0.075' && f3(b4.mx) === '0.128');
  assertTrue('v1 band means/maxes B5', f2(b5.mK) === '12.20' && f3(b5.mF) === '0.061' && f3(b5.mx) === '0.090');
  const dead0 = cal.filter(r => r.floor0 < 1);
  assertEq('v1 max K* over K=0-dead anchors', Math.max(...dead0.map(r => r.Kstar)), 21);
}
console.log(`  v1 overlap reproduced: 24 rows, certificate list, band statistics, max K*; ${cal.length} anchors uncapped with bijection asserts`);

// ============================================================================
console.log('\nSEC 1 — THE NEW DECADE, Q = 1511..10007');
// ============================================================================
{
  console.log('     Q   width      C      T  pool  floor0    K*  K*/pool  floor@K*  twinQ');
  const show = new Set([1511, 1999, 2503, 2999, 3163, 3511, 4001, 4507, 4999, 5623, 6007, 6521, 7001, 7507, 8009, 8513, 9001, 9497, 10007]);
  // plus every twin-Q anchor's worst case is covered in SEC 3
  for (const r of rows) {
    if (!show.has(r.Q)) continue;
    console.log(`  ${String(r.Q).padStart(5)}  ${String(r.width).padStart(6)}  ${String(r.C).padStart(5)}  ${String(r.T).padStart(5)}  ${String(r.nR).padStart(4)}  ${String(r.floor0).padStart(6)}  ${String(r.Kstar).padStart(4)}  ${f3(r.Kstar / r.nR).padStart(7)}  ${String(r.floorK).padStart(7)}  ${r.twinQ ? 'yes' : '   '}`);
  }
  const capped = rows.filter(r => r.Q > CALMAX && r.Kstar < 0);
  console.log(`  anchors with K* > KCAP=${KCAP}: ${capped.length ? capped.map(r => r.Q).join(' ') : 'NONE'}`);
}

// ============================================================================
console.log('\nSEC 2 — PREREG SCORING (quadpoint-decade-prereg.md, sealed 3f26d19)');
// ============================================================================
{
  const B = [['B5', 1009, 1499, 0.061, null], ['B6', 1500, 3163, null, [0.051, 0.012]],
    ['B7', 3164, 5623, null, [0.041, 0.012]], ['B8', 5624, 10007, null, [0.031, 0.012]]];
  const stats = {};
  console.log('  band       Q-range        n   K* mean  K*/pool mean  max     forecast        verdict');
  for (const [name, a, b, cited, fc] of B) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b && r.Kstar >= 0);
    const s = bandStats(rs); stats[name] = s;
    let note = '';
    if (cited !== null) note = `(cited ${f3(cited)})`;
    if (fc) {
      const inBand = Math.abs(s.mF - fc[0]) <= fc[1];
      note = `${f3(fc[0])} ± ${f3(fc[1])}  ${inBand ? 'IN BAND' : 'OUT'}`;
    }
    console.log(`  ${name}  [${String(a).padStart(5)}, ${String(b).padStart(5)}]  ${String(s.n).padStart(4)}   ${f2(s.mK).padStart(6)}   ${f3(s.mF).padStart(8)}   ${f3(s.mx)}   ${note}`);
  }
  const m5 = stats.B5.mF, m6 = stats.B6.mF, m7 = stats.B7.mF, m8 = stats.B8.mF;
  const bendConsec = (m6 > m5 && m7 > m6) || (m7 > m6 && m8 > m7);
  const bendLevel = m8 >= m5;
  console.log(`  READ-1 (shape): two-consecutive-rises ${bendConsec}; m8 >= m5 ${bendLevel}  =>  ${bendConsec || bendLevel ? 'BEND FIRES' : 'no bend'}`);
  const in6 = Math.abs(m6 - 0.051) <= 0.012, in7 = Math.abs(m7 - 0.041) <= 0.012, in8 = Math.abs(m8 - 0.031) <= 0.012;
  const mono = m6 <= m5 && m7 <= m6 && m8 <= m7;
  console.log(`  READ-2 (trend): in-band ${in6}/${in7}/${in8}, monotone ${mono}  =>  ${in6 && in7 && in8 && mono ? 'FALL-CONSISTENT FIRES' : 'not clean'}`);
  const mx5 = stats.B5.mx, mx6 = stats.B6.mx, mx7 = stats.B7.mx, mx8 = stats.B8.mx;
  const supRise = mx6 > mx5 || mx7 > mx6 || mx8 > mx7;
  const overCap = rows.some(r => r.Q > CALMAX && r.Kstar < 0);
  console.log(`  READ-3 (sup): band maxes ${f3(mx5)} -> ${f3(mx6)} -> ${f3(mx7)} -> ${f3(mx8)}; rising ${supRise}; K*>KCAP ${overCap}  =>  ${supRise || overCap ? 'FLAG' : 'quiet'}`);
}

// ============================================================================
console.log('\nSEC 3 — READ-4: THE TWIN-Q SUBFAMILY (width 4Q+4, the hard cases)');
// ============================================================================
{
  const bands = [['B3', 101, 313], ['B4', 317, 997], ['B5', 1009, 1499], ['B6', 1500, 3163], ['B7', 3164, 5623], ['B8', 5624, 10007]];
  console.log('  band     twin-Q n   K*/pool mean   max      all-band mean');
  for (const [name, a, b] of bands) {
    const tw = rows.filter(r => r.Q >= a && r.Q <= b && r.twinQ && r.Kstar >= 0);
    const all = rows.filter(r => r.Q >= a && r.Q <= b && r.Kstar >= 0);
    if (!tw.length) { console.log(`  ${name}   none`); continue; }
    const s = bandStats(tw), sa = bandStats(all);
    console.log(`  ${name}   ${String(s.n).padStart(6)}    ${f3(s.mF).padStart(8)}    ${f3(s.mx)}    ${f3(sa.mF)}`);
  }
  const worst = rows.filter(r => r.Kstar >= 0).reduce((w, r) => (r.Kstar / r.nR > w.Kstar / w.nR ? r : w));
  console.log(`  worst anchor anywhere: Q = ${worst.Q} (twinQ ${worst.twinQ}), K* = ${worst.Kstar} of pool ${worst.nR} = ${f3(worst.Kstar / worst.nR)}`);
  const worstAbs = rows.reduce((w, r) => (r.Kstar > w.Kstar ? r : w));
  console.log(`  largest absolute K*: Q = ${worstAbs.Q}, K* = ${worstAbs.Kstar} (pool ${worstAbs.nR})`);
}

// ============================================================================
console.log('\nSEC 4 — READINGS (mechanical; adjudication text belongs to the note)');
// ============================================================================
console.log('  1. [VERIFIED] The segmented engine reproduces v1 digit-exact on the');
console.log('     full overlap (24 rows, certificate list, band statistics, max K*),');
console.log('     with the bijection assert at every anchor <= 1499 and an');
console.log('     independently-coded T recount at every anchor of the whole run.');
console.log('  2. [MEASURED] SEC 2 scores the sealed readings; SEC 3 the subfamily.');
console.log('     Whatever fired above is the verdict; nothing here is asymptotic.');
console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-quadpoint-02.js
//   invocation:  node research/attack-quadpoint-02.js
//   code-sha256: f18a491c5edb5a87bce7403759b339c1bbd57e63b6e0552ec6406b7971cc722a
//   out-sha256:  60815df6384b0752f070a72a2e75753e000e387d6e1c3ec8f08f3f38f449fdd8
//   body-lines:  57
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-22
//   elapsed:     2.5 s
// ============================================================================
// SEC 0 — CALIBRATION: the v1 overlap, digit-exact (abort on mismatch)
//   v1 overlap reproduced: 24 rows, certificate list, band statistics, max K*; 236 anchors uncapped with bijection asserts
//
// SEC 1 — THE NEW DECADE, Q = 1511..10007
//      Q   width      C      T  pool  floor0    K*  K*/pool  floor@K*  twinQ
//    1511   36408   3640    217   237   -1786    15    0.063        8
//    1999   16008   1600     93   300    -790    16    0.053        2
//    2503   90432   9042    465   365   -4698    19    0.052       16
//    2999   12000   1199     54   427    -661    25    0.059        3  yes
//    3163   25320   2531    135   444   -1338    18    0.041        1
//    3511   42168   4216    206   487   -2261    22    0.045        8
//    4001   16008   1600     69   548    -879    27    0.049        1  yes
//    4507   54120   5411    256   608   -2985    21    0.035        9
//    4999   40008   4000    200   666   -2233    22    0.033        4
//    5623  180192  18018    803   736  -10242    27    0.037       28
//    6007   48072   4806    221   781   -2689    23    0.029        3
//    6521  104400  10439    441   840   -5998    27    0.032        3
//    7001  168168  16816    714   898   -9722    29    0.032       11
//    7507  150240  15023    618   948   -8797    34    0.036       12
//    8009   32040   3203    137  1005   -1904    31    0.031        3  yes
//    8513  136272  13626    563  1058   -8017    32    0.030       13
//    9001  108048  10804    461  1115   -6324    33    0.030        3
//    9497  266112  26610   1080  1174  -15675    32    0.027        1
//   10007   40032   4002    160  1227   -2388    30    0.024        3  yes
//   anchors with K* > KCAP=64: NONE
//
// SEC 2 — PREREG SCORING (quadpoint-decade-prereg.md, sealed 3f26d19)
//   band       Q-range        n   K* mean  K*/pool mean  max     forecast        verdict
//   B5  [ 1009,  1499]    71    12.20      0.061   0.090   (cited 0.061)
//   B6  [ 1500,  3163]   208    16.88      0.050   0.075   0.051 ± 0.012  IN BAND
//   B7  [ 3164,  5623]   292    23.34      0.040   0.065   0.041 ± 0.012  IN BAND
//   B8  [ 5624, 10007]   491    31.22      0.032   0.045   0.031 ± 0.012  IN BAND
//   READ-1 (shape): two-consecutive-rises false; m8 >= m5 false  =>  no bend
//   READ-2 (trend): in-band true/true/true, monotone true  =>  FALL-CONSISTENT FIRES
//   READ-3 (sup): band maxes 0.090 -> 0.075 -> 0.065 -> 0.045; rising false; K*>KCAP false  =>  quiet
//
// SEC 3 — READ-4: THE TWIN-Q SUBFAMILY (width 4Q+4, the hard cases)
//   band     twin-Q n   K*/pool mean   max      all-band mean
//   B3       12       0.093    0.130    0.093
//   B4       15       0.081    0.128    0.075
//   B5       15       0.067    0.090    0.061
//   B6       33       0.053    0.075    0.050
//   B7       53       0.041    0.065    0.040
//   B8       70       0.032    0.044    0.032
//   worst anchor anywhere: Q = 29 (twinQ true), K* = 2 of pool 7 = 0.286
//   largest absolute K*: Q = 9281, K* = 46 (pool 1146)
//
// SEC 4 — READINGS (mechanical; adjudication text belongs to the note)
//   1. [VERIFIED] The segmented engine reproduces v1 digit-exact on the
//      full overlap (24 rows, certificate list, band statistics, max K*),
//      with the bijection assert at every anchor <= 1499 and an
//      independently-coded T recount at every anchor of the whole run.
//   2. [MEASURED] SEC 2 scores the sealed readings; SEC 3 the subfamily.
//      Whatever fired above is the verdict; nothing here is asymptotic.
//
// done in 2.5s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// 1. THE ENGINE IS SOUND [VERIFIED]. Digit-exact reproduction of v1 on the
//    full overlap: all 24 shown rows, the K = 0 certificate list, the three
//    band statistics, max K* = 21 — with the full-depth bijection assert at
//    every anchor Q <= 1499 and an independently-coded composite-sieve T
//    recount agreeing at every anchor of the entire run.
// 2. THE SEALED VERDICT [MEASURED, scored against quadpoint-decade-prereg.md,
//    commit 3f26d19]: **FALL-CONSISTENT FIRES; no bend; sup quiet.** Band
//    means m6 = 0.050, m7 = 0.040, m8 = 0.032 — each INSIDE its registered
//    forecast band (0.051, 0.041, 0.031, all ± 0.012), monotone falling.
//    READ-1's bend conditions are both false; READ-3 is quiet (band maxes
//    fall 0.090 -> 0.075 -> 0.065 -> 0.045; no anchor near KCAP = 64 — the
//    largest K* anywhere is 46, at Q = 9281, of a 1146 pool). The prereg's
//    escalation clause is NOT triggered: READ-2 fired cleanly, so the run
//    stops at 10007 by its own rule.
// 3. THE SUBFAMILY CLOSES [MEASURED, READ-4]: the twin-Q hard cases, which
//    own the worst measured depth costs at small Q (means 0.093 vs all-band
//    0.093 at B3 but max 0.130), CONVERGE to the all-band mean by B8
//    (0.032 vs 0.032, max 0.044). The narrow-stretch penalty is a
//    small-anchor effect on this range, not a growing one.
// 4. WHAT GROWS AND WHAT FALLS: absolute depth K* rises (band means
//    12.20 -> 16.88 -> 23.34 -> 31.22) while its pool share falls — the
//    certificate needs more freshness conditions but a shrinking fraction
//    of the available pool. No law is fitted to K*(Q) here, deliberately
//    (the exponent lesson: a fit over two decades is a range summary).
// 5. WHAT THIS DOES AND DOES NOT DECIDE. Two decades of falling cost still
//    decide NOTHING asymptotic — the rate-balance concern (margin
//    ~ 1/ln^2 h vs per-prime HL gains) remains open in both directions.
//    What the run buys is the REPRODUCTION TARGET for the analytic race
//    (TODO Z2): any proof-side bound on sum capU_K must reproduce
//    m6/m7/m8 = 0.050/0.040/0.032 and the K* growth curve before it is
//    believed. Per the prereg's own reading, Z2 proceeds with these
//    constants. NO TPC claim; occupancy here was never in doubt (known to
//    9.0e15 from adopted data); Route B closed; rho(2) adverse.
// ============================================================
// FIGURE PROVENANCE. Calibration constants in SEC 0 are CITED from the
// embedded OUTPUT of research/attack-quadpoint-01.js (v1) and asserted,
// never re-derived by hand; the sealed forecast bands are CITED from
// quadpoint-decade-prereg.md (commit 3f26d19). 9.0e15 is stretch-01 §3's
// adopted-data occupancy bound, cited. Every other figure above is from
// this producer's own OUTPUT block.
// ============================================================
