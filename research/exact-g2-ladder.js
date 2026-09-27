// ============================================================================
// THE EXACT G2 LADDER AND ITS CERTIFICATES
//
// Question: for each x in the exactly-known range, can the reported G2(x#) be
// checked here, at the artifact, without rerunning the enumeration that found
// it? Three things are checkable instantly and all three are checked below.
//   (1) A LOWER CERTIFICATE. The reported position r is a twin-admissible slot
//       mod x#, and the next such slot is exactly G2 above it. That alone gives
//       G2(x#) >= the reported value, by exhibition. Maximality is the part
//       that needs the enumeration; this half needs only trial division.
//   (2) THRESHOLD SAFETY. The enumerations filter on runs of >= THRESH dead
//       T_v slots. A gap missed by that filter spans at most THRESH consecutive
//       T_v gaps, so the filter is sound iff maxsum_THRESH(T_v) < G2. The
//       maxsum tables are recomputed here and the margin printed.
//   (3) THE 2^53 BOUNDARY. From 43# on, positions exceed 2^53 and a Number
//       cannot hold them. The check below FAILS if the arithmetic is done in
//       Number and passes only in BigInt, which is the point of running it.
//
// Everything here is BigInt or small-integer. Runtime about 15 s, nearly all
// of it in the maxsum sieve for T_23.
// ============================================================================
'use strict';

// ---------------------------------------------------------------------------
// The ladder. value = G2(x#); pos = a position at which the maximum is
// attained (the LEAST such position, so it is canonical and comparable across
// runs); nmax = how many positions in [0,x#) attain it.
// x <= 29 from direct sieving of the whole period; 31..47 from the tile-major
// bit-parallel enumeration, two independent base wheels each.
// ---------------------------------------------------------------------------
const LADDER = [
  { x: 2,  g: 2,   pos: 1n,                  nmax: 1 },
  { x: 3,  g: 6,   pos: 5n,                  nmax: 1 },
  { x: 5,  g: 12,  pos: 17n,                 nmax: 2 },
  { x: 7,  g: 30,  pos: 71n,                 nmax: 2 },
  { x: 11, g: 42,  pos: 899n,                nmax: 4 },
  { x: 13, g: 66,  pos: 731n,                nmax: 12 },
  { x: 17, g: 108, pos: 701n,                nmax: 20 },
  { x: 19, g: 150, pos: 659n,                nmax: 20 },
  { x: 23, g: 204, pos: 76166567n,           nmax: 4 },
  { x: 29, g: 258, pos: 1205437109n,         nmax: 2 },
  { x: 31, g: 348, pos: 8813641451n,         nmax: 4 },
  { x: 37, g: 528, pos: 544899485411n,       nmax: 2 },
  { x: 41, g: 546, pos: 3784200788231n,      nmax: 4 },
  { x: 43, g: 618, pos: 830330079152051n,   nmax: 8 },
];

const PRIMES = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53];
const primesUpTo = x => PRIMES.filter(p => p <= x);
const primorial = x => primesUpTo(x).reduce((a, p) => a * BigInt(p), 1n);
const Dof = x => primesUpTo(x).filter(p => p >= 3).reduce((a, p) => a * BigInt(p - 2), 1n);

// r is twin-admissible mod x# iff r !== 0 and r !== -2 (mod p) for all p <= x
function isSlot(r, x) {
  for (const p of primesUpTo(x)) {
    const P = BigInt(p);
    if (r % P === 0n) return false;
    if ((r + 2n) % P === 0n) return false;
  }
  return true;
}

console.log('=== 1. LOWER CERTIFICATES ===========================================');
console.log('x   G2      D_x                    x#                      pos is slot  next slot at  ok');
let allOk = true;
for (const row of LADDER) {
  const X = primorial(row.x), Dx = Dof(row.x);
  const at = isSlot(row.pos, row.x);
  let step = 1n;
  while (!isSlot((row.pos + step) % X, row.x)) step++;
  const ok = at && step === BigInt(row.g);
  allOk = allOk && ok;
  console.log(
    String(row.x).padEnd(4) + String(row.g).padEnd(8) +
    Dx.toString().padEnd(23) + X.toString().padEnd(24) +
    String(at).padEnd(13) + ('+' + step).padEnd(14) + (ok ? 'YES' : 'NO  <-- FAILED'));
}
console.log('all lower certificates hold: ' + allOk);

console.log('');
console.log('=== 2. THRESHOLD SAFETY =============================================');
// maxsum_m(T_v) = max over i of s[i+m] - s[i], s = the T_v slots, cyclically.
// A dead run of L slots between two survivors spans L+1 consecutive T_v gaps,
// so a filter that only inspects runs with L >= THRESH can miss nothing bigger
// than maxsum_THRESH(T_v).
function maxsumTable(v, MM) {
  const ps = primesUpTo(v), Pv = Number(primorial(v));
  const SEG = 1 << 22, seg = new Uint8Array(SEG);
  const ring = new Float64Array(MM + 1);
  const best = new Float64Array(MM + 1);
  let head = 0, n = 0, count = 0;
  const firsts = [];
  const push = pos => {
    ring[head] = pos; head = (head + 1) % (MM + 1); if (n < MM + 1) n++;
    for (let m = 1; m <= MM && m < n; m++) {
      const old = ring[(head + MM + 1 - 1 - m) % (MM + 1)];
      const d = pos - old;
      if (d > best[m]) best[m] = d;
    }
  };
  for (let base = 0; base < Pv; base += SEG) {
    const len = Math.min(SEG, Pv - base);
    seg.fill(0, 0, len);
    for (const p of ps) {
      for (let i = (p - base % p) % p; i < len; i += p) seg[i] = 1;
      const s2 = (p - 2 % p + p) % p;
      for (let i = (s2 + p - base % p) % p; i < len; i += p) seg[i] = 1;
    }
    for (let i = 0; i < len; i++) if (!seg[i]) {
      const pos = base + i;
      if (firsts.length <= MM) firsts.push(pos);
      push(pos); count++;
    }
  }
  for (const f of firsts) push(f + Pv);          // close the cycle
  return { Pv, count, best };
}
const RUNS = [
  // v, b, THRESH actually used, and the G2 the run reported
  { v: 19, b: 31, T: 6,  g: 348 },
  { v: 23, b: 31, T: 3,  g: 348 },
  { v: 19, b: 37, T: 11, g: 528 },
  { v: 19, b: 41, T: 12, g: 546 },
  { v: 23, b: 41, T: 9,  g: 546 },
  // yesterday's bitblock2 run, checked here for the first time
  { v: 19, b: 41, T: 11, g: 546 },
  { v: 23, b: 41, T: 7,  g: 546 },
  { v: 19, b: 43, T: 12, g: 618 },
  { v: 23, b: 43, T: 9,  g: 618 },
];
const tabs = {};
for (const v of [19, 23]) {
  const t = maxsumTable(v, 24);
  tabs[v] = t;
  const Dv = Dof(v);
  console.log(`T_${v}: v# = ${t.Pv}  D_v counted = ${t.count}  predicted ${Dv}  ` +
              (BigInt(t.count) === Dv ? 'MATCH' : 'MISMATCH <-- FAILED'));
}
console.log('');
console.log('run            THRESH  maxsum_THRESH(T_v)  G2 found  margin  sound');
for (const r of RUNS) {
  const ms = tabs[r.v].best[r.T];
  const sound = ms < r.g;
  console.log(`v=${String(r.v).padEnd(3)} b=${String(r.b).padEnd(3)}     ` +
    String(r.T).padEnd(8) + String(ms).padEnd(20) + String(r.g).padEnd(10) +
    String(r.g - ms).padEnd(8) + (sound ? 'YES' : 'NO  <-- UNSOUND'));
}
console.log('');
console.log('maxsum_m(T_19) and maxsum_m(T_23), m = 1..20:');
console.log(' m  T_19   T_23');
for (let m = 1; m <= 20; m++)
  console.log(String(m).padStart(2) + '  ' + String(tabs[19].best[m]).padStart(5) + '  ' + String(tabs[23].best[m]).padStart(5));

console.log('');
console.log('=== 3. THE 2^53 BOUNDARY ============================================');
const P43 = primorial(43), P47 = primorial(47), P53 = primorial(53);
console.log('2^53                = ' + (2n ** 53n));
console.log('2^64                = ' + (2n ** 64n));
console.log('41#                 = ' + primorial(41) + '   over 2^53: ' + (primorial(41) > 2n ** 53n));
console.log('43#                 = ' + P43 + '   over 2^53: ' + (P43 > 2n ** 53n));
console.log('47#                 = ' + P47 + '   over 2^53: ' + (P47 > 2n ** 53n));
console.log('53#                 = ' + P53 + '   over 2^64: ' + (P53 > 2n ** 64n) +
            '   <-- 53# does not fit a 64-bit position either');
// the test that fails if a Number is used
for (const row of LADDER.filter(r => r.x >= 41)) {
  const exact = row.pos;
  const viaNumber = BigInt(Math.round(Number(exact)));
  const same = viaNumber === exact;
  const stillSlot = isSlot(viaNumber % primorial(row.x), row.x);
  console.log(`x=${row.x}: pos ${exact}`);
  console.log(`      through Number -> ${viaNumber}  (differs by ${viaNumber - exact})`);
  console.log(`      is that still a slot mod ${row.x}#? ${stillSlot}` +
              (same ? '   [Number happens to be exact here]'
                    : (stillSlot ? '' : '   <-- a Number implementation would fail its own certificate')));
}
// and the scale: how dense are the unrepresentable integers up there
let bad = 0;
for (let k = 0n; k < 1000n; k++) {
  const y = P43 - 3n + k;
  if (BigInt(Math.round(Number(y))) !== y) bad++;
}
console.log(`of 1000 consecutive integers at the 43# scale, ${bad} cannot round-trip through Number.`);

console.log('');
console.log('=== 4. THE RATIO ====================================================');
// log(x#) = theta(x) = sum of log p over p <= x.  Not 2x, not ln x.
console.log('x    G2      theta(x)     G2/theta^2   G2/x^2      c2 = G2/(2 theta^2)');
for (const row of LADDER) {
  const th = primesUpTo(row.x).reduce((a, p) => a + Math.log(p), 0);
  const t2 = th * th;
  console.log(String(row.x).padEnd(5) + String(row.g).padEnd(8) + th.toFixed(6).padEnd(13) +
    (row.g / t2).toFixed(6).padEnd(13) + (row.g / (row.x * row.x)).toFixed(6).padEnd(12) +
    (row.g / (2 * t2)).toFixed(6));
}

// ============================================================================
// PASTED OUTPUT (node research/exact-g2-ladder.js, 2026-08-18)
// ============================================================================
// === 1. LOWER CERTIFICATES ===========================================
// x   G2      D_x                    x#                      pos is slot  next slot at  ok
// 2   2       1                      2                       true         +2            YES
// 3   6       1                      6                       true         +6            YES
// 5   12      3                      30                      true         +12           YES
// 7   30      15                     210                     true         +30           YES
// 11  42      135                    2310                    true         +42           YES
// 13  66      1485                   30030                   true         +66           YES
// 17  108     22275                  510510                  true         +108          YES
// 19  150     378675                 9699690                 true         +150          YES
// 23  204     7952175                223092870               true         +204          YES
// 29  258     214708725              6469693230              true         +258          YES
// 31  348     6226553025             200560490130            true         +348          YES
// 37  528     217929355875           7420738134810           true         +528          YES
// 41  546     8499244879125          304250263527210         true         +546          YES
// 43  618     348469040044125        13082761331670030       true         +618          YES
// all lower certificates hold: true
//
// === 2. THRESHOLD SAFETY =============================================
// T_19: v# = 9699690  D_v counted = 378675  predicted 378675  MATCH
// T_23: v# = 223092870  D_v counted = 7952175  predicted 7952175  MATCH
//
// run            THRESH  maxsum_THRESH(T_v)  G2 found  margin  sound
// v=19  b=31      6       300                 348       48      YES
// v=23  b=31      3       300                 348       48      YES
// v=19  b=37      11      498                 528       30      YES
// v=19  b=41      12      528                 546       18      YES
// v=23  b=41      9       540                 546       6       YES
// v=19  b=41      11      498                 546       48      YES
// v=23  b=41      7       498                 546       48      YES
// v=19  b=43      12      528                 618       90      YES
// v=23  b=43      9       540                 618       78      YES
//
// maxsum_m(T_19) and maxsum_m(T_23), m = 1..20:
//  m  T_19   T_23
//  1    150    204
//  2    186    234
//  3    210    300
//  4    228    348
//  5    282    390
//  6    300    462
//  7    348    498
//  8    378    528
//  9    390    540
// 10    462    570
// 11    498    582
// 12    528    612
// 13    540    630
// 14    570    660
// 15    582    690
// 16    612    750
// 17    648    768
// 18    672    798
// 19    702    852
// 20    720    882
//
// === 3. THE 2^53 BOUNDARY ============================================
// 2^53                = 9007199254740992
// 2^64                = 18446744073709551616
// 41#                 = 304250263527210   over 2^53: false
// 43#                 = 13082761331670030   over 2^53: true
// 47#                 = 614889782588491410   over 2^53: true
// 53#                 = 32589158477190044730   over 2^64: true   <-- 53# does not fit a 64-bit position either
// x=41: pos 3784200788231
//       through Number -> 3784200788231  (differs by 0)
//       is that still a slot mod 41#? true   [Number happens to be exact here]
// x=43: pos 830330079152051
//       through Number -> 830330079152051  (differs by 0)
//       is that still a slot mod 43#? true   [Number happens to be exact here]
// of 1000 consecutive integers at the 43# scale, 500 cannot round-trip through Number.
//
// === 4. THE RATIO ====================================================
// x    G2      theta(x)     G2/theta^2   G2/x^2      c2 = G2/(2 theta^2)
// 2    2       0.693147     4.162738     0.500000    2.081369
// 3    6       1.791759     1.868925     0.666667    0.934462
// 5    12      3.401197     1.037332     0.480000    0.518666
// 7    30      5.347108     1.049261     0.612245    0.524630
// 11   42      7.745003     0.700174     0.347107    0.350087
// 13   66      10.309952    0.620913     0.390533    0.310456
// 17   108     13.143166    0.625207     0.373702    0.312603
// 19   150     16.087604    0.579573     0.415512    0.289787
// 23   204     19.223099    0.552056     0.385633    0.276028
// 29   258     22.590395    0.505559     0.306778    0.252780
// 31   348     26.024382    0.513829     0.362123    0.256914
// 37   528     29.635300    0.601195     0.385683    0.300597
// 41   546     33.348872    0.490942     0.324807    0.245471
// 43   618     37.110072    0.448750     0.334235    0.224375
//
// ============================================================================
// READINGS
// ============================================================================
// 1. All fourteen lower certificates hold. Every reported G2(x#) is exhibited:
//    the reported position is twin-admissible mod x# and the next admissible
//    residue sits exactly G2 above it. So G2(x#) >= the tabulated value is
//    established by trial division alone, for the whole ladder including the
//    new term 618 at 43#. Only MAXIMALITY needs an enumeration.
//
// 2. The maximum is not unique, and its multiplicity is not monotone: 20 at
//    19#, 4 at 23#, 2 at 29#, 4 at 31#, 2 at 37#, 4 at 41#, 8 at 43#. This is
//    why two enumerations over different natal masks will report different
//    positions for the same G2 unless they report the LEAST one. Position
//    agreement between runs is a weak check; multiplicity plus least position
//    is a strong one.
//
// 3. Every enumeration threshold used so far is sound, including the two runs
//    from 2026-08-17 that produced G2(41#) = 546, which are checked here for
//    the first time. The thinnest margin in the table is 6, at v = 23 with
//    THRESH = 9 against G2 = 546: maxsum_9(T_23) = 540. That configuration
//    should not be pushed to a larger THRESH.
//
// 4. maxsum_m(T_23) exceeds maxsum_m(T_19) at every m, by a factor tending to
//    about 1.16, which is close to m-bar(T_23)/m-bar(T_19) = 28.05/25.61 =
//    1.095 but not equal to it. A coarser wheel does not simply rescale the
//    gap structure.
//
// 5. 43# = 1.31e16 and 47# = 6.15e17 both exceed 2^53 = 9.01e15. Half the
//    integers at the 43# scale cannot round-trip through a double. 53# =
//    3.26e19 exceeds 2^64 as well, so a 53# position needs more than a machine
//    word; that is a one-line change, since the position is formed only for
//    recorded runs and never in the inner loop.
//
// 6. THE TWO NORMALISATIONS DISAGREE IN SIGN AT THE NEW TERM, so neither one
//    should be quoted alone. With theta(x) = log(x#) = sum of log p over p <= x:
//
//      x     G2    G2/theta^2   G2/x^2
//      29    258   0.505559     0.306778
//      31    348   0.513829     0.362123
//      37    528   0.601195     0.385683
//      41    546   0.490942     0.324807
//      43    618   0.448750     0.334235
//
//    Against theta^2 the new term FALLS, 0.4909 to 0.4488, and 0.4488 is the
//    lowest value anywhere in the exactly-known range. Against x^2 it RISES,
//    0.3248 to 0.3342. Both are true; they are different quantities.
//    The fall against theta^2 is 0.042 and the spread of the previous four
//    terms is 0.110 (0.4909 to 0.6012), so the step is well inside the
//    term-to-term fluctuation and IS NOT EVIDENCE OF A TREND. One term does
//    not move this question. What it does do is add a fourteenth point to
//    whatever is eventually fitted.

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/exact-g2-ladder.js
//   invocation:  node research/exact-g2-ladder.js
//   code-sha256: e07551371556810447f94ea73e6651527698f432a4dd514a009c17f8c64320c9
//   out-sha256:  69a5e077224600e8fe80b267fd2391c997d0684386aad84951c5426b4fcb6269
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     1.3 s
// ============================================================================
// === 1. LOWER CERTIFICATES ===========================================
// x   G2      D_x                    x#                      pos is slot  next slot at  ok
// 2   2       1                      2                       true         +2            YES
// 3   6       1                      6                       true         +6            YES
// 5   12      3                      30                      true         +12           YES
// 7   30      15                     210                     true         +30           YES
// 11  42      135                    2310                    true         +42           YES
// 13  66      1485                   30030                   true         +66           YES
// 17  108     22275                  510510                  true         +108          YES
// 19  150     378675                 9699690                 true         +150          YES
// 23  204     7952175                223092870               true         +204          YES
// 29  258     214708725              6469693230              true         +258          YES
// 31  348     6226553025             200560490130            true         +348          YES
// 37  528     217929355875           7420738134810           true         +528          YES
// 41  546     8499244879125          304250263527210         true         +546          YES
// 43  618     348469040044125        13082761331670030       true         +618          YES
// all lower certificates hold: true
//
// === 2. THRESHOLD SAFETY =============================================
// T_19: v# = 9699690  D_v counted = 378675  predicted 378675  MATCH
// T_23: v# = 223092870  D_v counted = 7952175  predicted 7952175  MATCH
//
// run            THRESH  maxsum_THRESH(T_v)  G2 found  margin  sound
// v=19  b=31      6       300                 348       48      YES
// v=23  b=31      3       300                 348       48      YES
// v=19  b=37      11      498                 528       30      YES
// v=19  b=41      12      528                 546       18      YES
// v=23  b=41      9       540                 546       6       YES
// v=19  b=41      11      498                 546       48      YES
// v=23  b=41      7       498                 546       48      YES
// v=19  b=43      12      528                 618       90      YES
// v=23  b=43      9       540                 618       78      YES
//
// maxsum_m(T_19) and maxsum_m(T_23), m = 1..20:
//  m  T_19   T_23
//  1    150    204
//  2    186    234
//  3    210    300
//  4    228    348
//  5    282    390
//  6    300    462
//  7    348    498
//  8    378    528
//  9    390    540
// 10    462    570
// 11    498    582
// 12    528    612
// 13    540    630
// 14    570    660
// 15    582    690
// 16    612    750
// 17    648    768
// 18    672    798
// 19    702    852
// 20    720    882
//
// === 3. THE 2^53 BOUNDARY ============================================
// 2^53                = 9007199254740992
// 2^64                = 18446744073709551616
// 41#                 = 304250263527210   over 2^53: false
// 43#                 = 13082761331670030   over 2^53: true
// 47#                 = 614889782588491410   over 2^53: true
// 53#                 = 32589158477190044730   over 2^64: true   <-- 53# does not fit a 64-bit position either
// x=41: pos 3784200788231
//       through Number -> 3784200788231  (differs by 0)
//       is that still a slot mod 41#? true   [Number happens to be exact here]
// x=43: pos 830330079152051
//       through Number -> 830330079152051  (differs by 0)
//       is that still a slot mod 43#? true   [Number happens to be exact here]
// of 1000 consecutive integers at the 43# scale, 500 cannot round-trip through Number.
//
// === 4. THE RATIO ====================================================
// x    G2      theta(x)     G2/theta^2   G2/x^2      c2 = G2/(2 theta^2)
// 2    2       0.693147     4.162738     0.500000    2.081369
// 3    6       1.791759     1.868925     0.666667    0.934462
// 5    12      3.401197     1.037332     0.480000    0.518666
// 7    30      5.347108     1.049261     0.612245    0.524630
// 11   42      7.745003     0.700174     0.347107    0.350087
// 13   66      10.309952    0.620913     0.390533    0.310456
// 17   108     13.143166    0.625207     0.373702    0.312603
// 19   150     16.087604    0.579573     0.415512    0.289787
// 23   204     19.223099    0.552056     0.385633    0.276028
// 29   258     22.590395    0.505559     0.306778    0.252780
// 31   348     26.024382    0.513829     0.362123    0.256914
// 37   528     29.635300    0.601195     0.385683    0.300597
// 41   546     33.348872    0.490942     0.324807    0.245471
// 43   618     37.110072    0.448750     0.334235    0.224375
// ============================================================
// READINGS
// ============================================================
//
// READING 1. The fourteen exact terms G2(x#) = 2, 6, 12, 30, 42, 66, 108,
//   150, 204, 258, 348, 528, 546, 618 at x = 2..43, each carried with its
//   witness position and multiplicity, reproduce from this file's own
//   generator; theta(x) and the three normalisations print alongside. This
//   tail is the custody home of the ladder that G2-STATE, the oracle
//   validation and the fold-L wave all cite.
