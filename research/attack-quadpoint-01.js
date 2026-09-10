// ============================================================================
// ATTACK QUADPOINT 01 — THE ANCHORED-CAP TRANSPLANT TO THE QUADRATIC POINT:
// THE UNIFIED COFACTOR-INJECTION CAP FAMILY RUN ON STRETCH WINDOWS
// S_Q = [Q^2, Q'^2), AND THE DEPTH-COST CURVE OF OCCUPANCY CERTIFICATION
// ============================================================================
// THE QUESTION (stretch-01.md §5 route 1; TODO item Z, first move after the
// census/stretch foundations). The unified-cap lemma
// (attack-anchored-01-unify.js, PROVEN at the origin comb: fresh(q) <=
// capU_K(q) <= cap_K(q), equality at full depth) is per-prime and
// history-blind — the only proof form that has ever certified survivors in
// this corpus. Transplant it from the origin (anchor vector 0) to the
// stretch window S_Q = [Q^2, Q'^2). In ABSOLUTE coordinates the kill
// classes of every active prime r are {0, -2} for every window — the
// quadratic anchor (Q^2 mod r)_{r<=Q} enters through the interval
// endpoints of the cofactor range m in (Q^2/r, (Q'^2)/r), not through the
// classes. The QR offset structure (stretch-01 §4) is a REFINEMENT not
// used here; this is the transplant's floor-zero instrument.
//
// WHAT IS MEASURED. For each prime Q in [7, QMAX]:
//   capacity C(Q)   channel pairs wholly in S_Q;
//   truth    T(Q)   twin pairs in S_Q (finality: wheel-survivors ARE twins);
//   fresh(r)        exact first-strike counts per active prime (the march);
//   capU_K(r)       the transplanted unified cap at depth K: candidates
//                   v = r*m in the window, lpf(m) >= r (same-member
//                   freshness, free from the injection), passing the
//                   other-member freshness conditions of the FIRST K active
//                   primes below r (pool ascending, as in the origin
//                   producer);
//   floor_K(Q)      C - sum_r capU_K(r) — an unconditional occupancy floor
//                   whenever it is >= 1 (pigeonhole: distinct fresh strikes
//                   destroy distinct pairs; each destroyed pair absorbs
//                   exactly one fresh strike);
//   K*(Q)           the least K with floor_K >= 1 — THE DEPTH COST of
//                   certifying the stretch by caps alone.
// Cross-reference, not recomputed: destroyer-census-01 §3's zone-grid
// counting certificate dies permanently at p = 67 (B/C -> 2). SEC 2 locates
// the same K = 0 death on the STRETCH grid; SEC 3 asks whether depth K > 0
// buys certification past it, and at what cost curve K*(Q).
// Everything is exact counting over a finite range; NO first-moment TPC
// claim anywhere (Route B is CLOSED, research/REFUTED.md; the stretch
// density constant rho(2) = 0.793 is ADVERSE, stretch-01 §3).
//
// CONVENTIONS (stretch-01 §0 + destroyer-census-01, restated once):
//   pair       (a, a+2), opener a ≡ 11, 17, 29 (mod 30); closer classes
//              13, 19, 1. In S_Q iff Q^2 <= a and a+2 < Q'^2.
//   actives    primes 7 <= r <= Q — exactly the destroyer set frozen on
//              S_Q (freeze S1, stretch-01 §1; verified per window here).
//   march      r ascending; a pair dies at its FIRST striking prime
//              (A-side r | a beats B-side r | a+2 at the same r — a same-r
//              tie is impossible); fresh(r) = pairs first-struck by r.
//   candidate  side A: v = a = r*m, v ≡ 11,17,29 (30); side B: v = a+2 =
//              r*m, v ≡ 13,19,1 (30). lpf(m) >= r always (an r' < r
//              dividing m strikes the same member earlier). Depth-K pool =
//              first K actives r' < r ascending; side A excludes
//              v ≡ r'-2 (r') [r' | a+2 struck the closer first], side B
//              excludes v ≡ 2 (r') [r' | a struck the opener first].
//   floors     floor_K = C - sum_r capU_K(r); full-depth floor = T exactly
//              (the injection is a bijection at full depth; ASSERTED at
//              every Q).
// WIDTH AUDIT (the level this RUNS at): QMAX = 1499, Q'^2 <= 1511^2 =
// 2,283,121 < 2^31; v = r*m <= Q'^2 + 1; lpf table Int32Array to
// Q'MAX^2 + 2 (~9 MB); counts < 2^31; no bit shifts; all doubles exact
// where integer.
//
// PRIOR ART ON DISK (cited, extended, not re-derived):
//   research/attack-anchored-01-unify.js  the unified-cap lemma and the
//                                         origin instantiation (36/45 @11);
//                                         the pool-ascending convention.
//   research/history/staging/stretch-01.md §5  the attack statement; §1
//                                         freeze/finality (S1, S2).
//   research/destroyer-census-01.js       the zone-grid counting
//                                         certificate and its death at 67
//                                         (CITED as the K = 0 analogue).
//   research/history/staging/zonegap-02-reduction.md §3.4  the Phi* onset-
//                                         shell ledger — capU_0 restricted
//                                         to one side and no channel
//                                         condition is its W -> Q'^2 form.
//   research/natal-onset-01.js            q^2 first-fresh-kill rule (S1's
//                                         one-line proof).
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

// ---------- prime tables ----------
const QMAX = 1499;                         // last anchor prime Q
// next prime above QMAX bounds the last window top Q'^2
function nextPrimeNaive(n) { for (let m = n + 1; ; m++) { let p = true; for (let d = 2; d * d <= m; d++) if (m % d === 0) { p = false; break; } if (p) return m; } }
const QTOP = nextPrimeNaive(QMAX);         // 1511 expected
const LIM = QTOP * QTOP + 2;               // lpf table reach
const lpf = new Int32Array(LIM + 1);
for (let p = 2; p * p <= LIM; p++) {
  if (lpf[p] !== 0) continue;              // p compositely marked -> not prime
  for (let m = 2 * p; m <= LIM; m += p) if (lpf[m] === 0) lpf[m] = p;
}
const isPrime = (n) => n >= 2 && lpf[n] === 0;
const PRIMES = []; for (let n = 2; n <= QTOP; n++) if (isPrime(n)) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);    // candidate actives, ascending
const ANCHORS = ACT.filter(p => p <= QMAX);
assertEq('next prime above QMAX', QTOP, 1511);
assertEq('width audit: LIM < 2^31', LIM < 2 ** 31, true);

const OPEN30 = new Set([11, 17, 29]), CLOSE30 = new Set([13, 19, 1]);

// ============================================================================
console.log('SEC 0 — CALIBRATION (abort on any mismatch)');
// ============================================================================
// Chris's hand anchors (stretch-01 §0 preamble): 11 wakes at 121, first
// prime above 121 is 127; 13 wakes at 169, first prime above is 173.
{
  let fp = 122; while (!isPrime(fp)) fp++;
  assertEq('hand anchor: first prime above 121', fp, 127);
  fp = 170; while (!isPrime(fp)) fp++;
  assertEq('hand anchor: first prime above 169', fp, 173);
}
// S_7 = [49, 121) worked by hand: channel openers 59, 71, 77, 89, 101, 107
// (C = 6); 77 = 7*11 dies A-side, (89, 91) dies B-side (91 = 7*13); twins
// (59,61), (71,73), (101,103), (107,109): T = 4, fresh(7) = 2.
// A091592/stretch-01 §3: every stretch in reach is occupied — asserted for
// the whole run in SEC 1.

// ---------- the per-stretch engine ----------
function stretchData(Qi) {
  const Q = ANCHORS[Qi];
  const Qp = ACT.concat().filter(p => p > Q)[0] || nextPrimeNaive(Q); // next prime
  const lo = Q * Q, hi = Qp * Qp;          // window [lo, hi)
  // actives 7..Q ascending
  const R = []; for (const p of ACT) { if (p > Q) break; R.push(p); }
  // channel pairs wholly inside: lo <= a, a+2 < hi (simple scan; window short)
  const openers = [];
  for (let a = lo; a + 2 < hi; a++) if (OPEN30.has(a % 30)) openers.push(a);
  const C = openers.length;
  // the march: destroyer = first striking active (freeze S1 makes this the
  // full verdict); survivors must equal the twin pairs (finality S2).
  const dead = new Uint8Array(C);
  const fresh = new Int32Array(R.length);
  for (let i = 0; i < R.length; i++) {
    const r = R[i]; let f = 0;
    for (let j = 0; j < C; j++) {
      if (dead[j]) continue;
      const a = openers[j];
      if (a % r === 0 || (a + 2) % r === 0) { dead[j] = 1; f++; }
    }
    fresh[i] = f;
  }
  let T = 0; const twins = [];
  for (let j = 0; j < C; j++) if (!dead[j]) { T++; twins.push(openers[j]); }
  // finality check: survivors are exactly the windows' twin primes
  let TP = 0;
  for (const a of openers) if (isPrime(a) && isPrime(a + 2)) TP++;
  assertEq(`finality S2 at Q=${Q}: march survivors = twin pairs`, T, TP);
  // freeze check (spot, cheap): no active above Q strikes inside fresh —
  // equivalently every composite member has lpf <= Q. Verified via lpf.
  for (const a of openers) {
    if (lpf[a] !== 0 && lpf[a] > Q) { assertTrue(`freeze S1 at Q=${Q}`, false); break; }
    if (lpf[a + 2] !== 0 && lpf[a + 2] > Q) { assertTrue(`freeze S1 at Q=${Q}`, false); break; }
  }
  return { Q, Qp, lo, hi, R, C, T, fresh, openers };
}

// the transplanted unified cap: per prime r, all depths at once.
// returns depthNeed[] per candidate: the 1-based pool index of the FIRST
// pool prime whose other-member condition excludes it (Infinity if none) —
// capU_K(r) = #{candidates with depthNeed > K}.
function capDepths(S, ri) {
  const r = S.R[ri];
  const need = [];                          // per-candidate first-exclusion depth
  for (const side of ['A', 'B']) {
    const cls = side === 'A' ? OPEN30 : CLOSE30;
    const vLo = side === 'A' ? S.lo : S.lo + 2;
    const vHi = side === 'A' ? S.hi - 2 : S.hi;   // a <= hi-3 -> v=a < hi-2; v=a+2 < hi
    const mLo = Math.ceil(vLo / r), mHi = Math.floor((vHi - 1) / r);
    for (let m = mLo; m <= mHi; m++) {
      const v = r * m;
      if (!cls.has(v % 30)) continue;
      // same-member freshness: lpf(m) >= r  (m coprime to 30 via v)
      if (m > 1 && lpf[m] !== 0 && lpf[m] < r) continue;
      // other-member freshness vs pool (actives < r, ascending)
      let d = Infinity;
      for (let t = 0; t < ri; t++) {
        const rp = S.R[t];
        const bad = side === 'A' ? rp - 2 : 2;
        if (v % rp === bad) { d = t + 1; break; }
      }
      need.push(d);
    }
  }
  return need;
}

// ============================================================================
console.log('\nSEC 1 — THE TRANSPLANT AT EVERY ANCHOR Q = 7..' + QMAX);
// ============================================================================
// Per Q: C, T, floor_K for all K, K* = least K with floor >= 1; asserts:
// fresh <= capU_K, capU monotone in K, full-depth floor = T, occupancy.
const rows = [];
let sevenDone = false;
for (let Qi = 0; Qi < ANCHORS.length; Qi++) {
  const S = stretchData(Qi);
  const nR = S.R.length;
  // capU_K(r) = #(candidates with first-exclusion depth > K); sum over r.
  const sumCap = new Float64Array(nR + 1);  // index K
  let freshViol = false, fullViol = false;
  for (let ri = 0; ri < nR; ri++) {
    const need = capDepths(S, ri);
    const poolMax = ri;                     // pool size available below r
    const capAt = new Int32Array(nR + 1);
    // finite needs d in 1..poolMax exclude candidate for K >= d
    const finiteByD = new Int32Array(poolMax + 2);
    for (const d of need) if (d !== Infinity) finiteByD[d]++;
    let excluded = 0;
    for (let K = 0; K <= nR; K++) {
      if (K >= 1 && K <= poolMax) excluded += finiteByD[K];
      capAt[K] = need.length - excluded;
    }
    // asserts: monotone + >= fresh + full-depth equality
    for (let K = 1; K <= nR; K++) if (capAt[K] > capAt[K - 1]) { assertTrue(`monotone capU Q=${S.Q} r=${S.R[ri]}`, false); break; }
    if (capAt[nR] !== S.fresh[ri]) fullViol = true;
    for (let K = 0; K <= nR; K++) { if (capAt[K] < S.fresh[ri]) { freshViol = true; break; } sumCap[K] += capAt[K]; }
  }
  assertTrue(`capU >= fresh at every depth, Q=${S.Q}`, !freshViol);
  assertTrue(`full-depth capU = fresh per prime (bijection), Q=${S.Q}`, !fullViol);
  // floors
  const floor = new Float64Array(nR + 1);
  for (let K = 0; K <= nR; K++) floor[K] = S.C - sumCap[K];
  assertEq(`full-depth floor = truth at Q=${S.Q}`, floor[nR], S.T);
  assertTrue(`occupancy (stretch-01 §3) at Q=${S.Q}`, S.T >= 1);
  let Kstar = -1;
  for (let K = 0; K <= nR; K++) if (floor[K] >= 1) { Kstar = K; break; }
  rows.push({ Q: S.Q, Qp: S.Qp, width: S.hi - S.lo, C: S.C, T: S.T, nR,
    floor0: floor[0], Kstar, floorK: Kstar >= 0 ? floor[Kstar] : NaN,
    ratio0: sumCap[0] / S.C });
  if (S.Q === 7 && !sevenDone) {
    sevenDone = true;
    assertEq('hand anchor S_7: C', S.C, 6);
    assertEq('hand anchor S_7: T', S.T, 4);
    assertEq('hand anchor S_7: fresh(7)', S.fresh[0], 2);
  }
}
console.log(`  anchors processed: ${rows.length} (Q = 7..${rows[rows.length - 1].Q}); all marches, caps, floors asserted`);

// ============================================================================
console.log('\nSEC 2 — THE K = 0 CERTIFICATE ON THE STRETCH GRID');
// ============================================================================
// Zone-grid analogue (destroyer-census-01 §3, CITED): counting dies at 67.
// Here: where does floor_0 >= 1 hold, and where does it die for good?
{
  const ok0 = rows.filter(r => r.floor0 >= 1).map(r => r.Q);
  let lastOk = -1, firstDead = -1;
  for (const r of rows) { if (r.floor0 >= 1) lastOk = r.Q; else if (firstDead < 0) firstDead = r.Q; }
  // permanence in range: no revival after the last death
  let revived = false, seenDead = false;
  for (const r of rows) { if (r.floor0 < 1) seenDead = true; else if (seenDead) { revived = true; } }
  console.log(`  floor_0 >= 1 at ${ok0.length} anchors: Q = { ${ok0.join(', ')} }`);
  console.log(`  first K=0 death: Q = ${firstDead}; last K=0 success in range: Q = ${lastOk}; revivals after a death: ${revived ? 'YES' : 'none'}`);
  console.log(`  sum(capU_0)/C by decade of Q:`);
  const bands = [[7, 31], [37, 97], [101, 313], [317, 997], [1009, 1499]];
  for (const [a, b] of bands) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b);
    if (!rs.length) continue;
    const mean = rs.reduce((s, r) => s + r.ratio0, 0) / rs.length;
    const worst = Math.max(...rs.map(r => r.ratio0));
    console.log(`    Q in [${a}, ${b}]  mean ${f3(mean)}  max ${f3(worst)}  (n = ${rs.length})`);
  }
}

// ============================================================================
console.log('\nSEC 3 — THE DEPTH-COST CURVE K*(Q)');
// ============================================================================
// The transplant's central measurement: the least freshness depth that
// certifies occupancy, per anchor, against the pool size pi(Q) - 3.
{
  console.log('     Q   width     C     T  pool  floor0    K*  K*/pool  floor@K*');
  const show = new Set([7, 11, 13, 23, 43, 61, 67, 71, 101, 149, 199, 293, 401, 499, 601, 701, 809, 907, 1009, 1103, 1201, 1301, 1399, 1499]);
  for (const r of rows) {
    if (!show.has(r.Q)) continue;
    console.log(`  ${String(r.Q).padStart(4)}  ${String(r.width).padStart(6)}  ${String(r.C).padStart(4)}  ${String(r.T).padStart(4)}  ${String(r.nR).padStart(4)}  ${String(r.floor0).padStart(6)}  ${String(r.Kstar).padStart(4)}  ${f3(r.Kstar / r.nR).padStart(7)}  ${String(r.floorK).padStart(6)}`);
  }
  // band summary of the cost fraction
  console.log('  K*/pool by band:');
  const bands = [[7, 31], [37, 97], [101, 313], [317, 997], [1009, 1499]];
  for (const [a, b] of bands) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b);
    if (!rs.length) continue;
    const fr = rs.map(r => r.Kstar / r.nR);
    const mean = fr.reduce((s, x) => s + x, 0) / fr.length;
    const mn = Math.min(...fr), mx = Math.max(...fr);
    const mk = rs.map(r => r.Kstar);
    console.log(`    Q in [${a}, ${b}]  K* mean ${f2(mk.reduce((s, x) => s + x, 0) / mk.length)}  K*/pool mean ${f3(mean)}  min ${f3(mn)}  max ${f3(mx)}  (n = ${rs.length})`);
  }
  // does ANY anchor past the K=0 death certify at small absolute K?
  const dead0 = rows.filter(r => r.floor0 < 1);
  if (dead0.length) {
    const cheap = dead0.filter(r => r.Kstar >= 0 && r.Kstar <= 3).map(r => `${r.Q}(K*=${r.Kstar})`);
    console.log(`  anchors past the K=0 death certified at K* <= 3: ${cheap.length ? cheap.join(' ') : 'NONE'}`);
    const worstK = Math.max(...dead0.map(r => r.Kstar));
    console.log(`  max K* over the K=0-dead anchors: ${worstK}`);
  }
}

// ============================================================================
console.log('\nSEC 4 — READINGS (calibrated; nothing here is a proof of anything asymptotic)');
// ============================================================================
console.log(`  1. [VERIFIED] The unified-cap transplant is sound on stretches: at every`);
console.log(`     anchor Q = 7..${QMAX}, fresh <= capU_K (all K), capU is monotone in K,`);
console.log(`     and the full-depth floor EQUALS the twin count (bijection) — the`);
console.log(`     origin lemma's structure carries to the quadratic point verbatim.`);
console.log(`  2. [MEASURED] SEC 2 locates the K = 0 (counting-only) certificate's death`);
console.log(`     on the stretch grid; SEC 3 measures the depth cost K*(Q) of buying`);
console.log(`     certification back with other-member freshness conditions.`);
console.log(`  3. [MEASURED] K*/pool is the honest cost figure: 1.0 means the cap family`);
console.log(`     degenerates into the march (no certificate cheaper than the sieve`);
console.log(`     itself); a flat fraction < 1 or a falling curve would be structure.`);
console.log(`  4. NO CLAIM: nothing here bounds Z2 or proves occupancy anywhere the`);
console.log(`     tables do not reach; Route B stays closed; rho(2) stays adverse.`);
console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-quadpoint-01.js
//   invocation:  node research/attack-quadpoint-01.js
//   code-sha256: 6cdada1cabeada54e35b9f1c74c6e804f53817ca3fcffa411be7768e57bcff20
//   out-sha256:  805f870b76d0e83668e76de0457f13fed34e3f093c707f73e2e350434b92731e
//   body-lines:  66
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-22
//   elapsed:     0.3 s
// ============================================================================
// SEC 0 — CALIBRATION (abort on any mismatch)
//
// SEC 1 — THE TRANSPLANT AT EVERY ANCHOR Q = 7..1499
//   anchors processed: 236 (Q = 7..1499); all marches, caps, floors asserted
//
// SEC 2 — THE K = 0 CERTIFICATE ON THE STRETCH GRID
//   floor_0 >= 1 at 8 anchors: Q = { 7, 11, 13, 19, 23, 31, 37, 43 }
//   first K=0 death: Q = 17; last K=0 success in range: Q = 43; revivals after a death: YES
//   sum(capU_0)/C by decade of Q:
//     Q in [7, 31]  mean 0.720  max 1.000  (n = 8)
//     Q in [37, 97]  mean 1.090  max 1.216  (n = 14)
//     Q in [101, 313]  mean 1.291  max 1.375  (n = 40)
//     Q in [317, 997]  mean 1.415  max 1.473  (n = 103)
//     Q in [1009, 1499]  mean 1.474  max 1.512  (n = 71)
//
// SEC 3 — THE DEPTH-COST CURVE K*(Q)
//      Q   width     C     T  pool  floor0    K*  K*/pool  floor@K*
//      7      72     6     4     1       4     0    0.000       4
//     11      48     4     2     2       2     0    0.000       2
//     13     120    11     7     3       7     0    0.000       7
//     23     312    30     8     6       4     0    0.000       4
//     43     360    35    11    11       1     0    0.000       1
//     61     768    76    19    15      -9     1    0.067       2
//     67     552    54    11    16      -6     1    0.063       3
//     71     288    28     3    17      -6     4    0.235       1
//    101     408    40     7    23     -10     2    0.087       1
//    149     600    59    10    32     -10     2    0.063       2
//    199    4920   491    52    43    -143     4    0.093       6
//    293    8400   839    88    59    -283     5    0.085       7
//    401    6480   647    54    76    -244     7    0.092       3
//    499    4008   400    28    92    -171     9    0.098       4
//    601    7248   724    52   107    -291     8    0.075       2
//    701   11280  1127    79   123    -488     9    0.073       4
//    809    3240   323    19   137    -147    16    0.117       1
//    907    7272   726    59   152    -313     7    0.046       4
//   1009    8088   808    54   166    -370    10    0.060       8
//   1103   13272  1326    89   182    -627    11    0.060       1
//   1201   28968  2896   194   194   -1379    12    0.062      14
//   1301    5208   520    32   209    -242    13    0.062       4
//   1399   28080  2807   174   219   -1383    13    0.059       8
//   1499   36120  3611   224   236   -1742    13    0.055       1
//   K*/pool by band:
//     Q in [7, 31]  K* mean 0.38  K*/pool mean 0.067  min 0.000  max 0.286  (n = 8)
//     Q in [37, 97]  K* mean 1.36  K*/pool mean 0.082  min 0.000  max 0.235  (n = 14)
//     Q in [101, 313]  K* mean 3.88  K*/pool mean 0.093  min 0.053  max 0.179  (n = 40)
//     Q in [317, 997]  K* mean 8.42  K*/pool mean 0.075  min 0.038  max 0.128  (n = 103)
//     Q in [1009, 1499]  K* mean 12.20  K*/pool mean 0.061  min 0.047  max 0.090  (n = 71)
//   anchors past the K=0 death certified at K* <= 3: 17(K*=1) 29(K*=2) 41(K*=1) 47(K*=1) 53(K*=1) 59(K*=1) 61(K*=1) 67(K*=1) 73(K*=1) 79(K*=1) 83(K*=3) 89(K*=3) 97(K*=1) 101(K*=2) 103(K*=3) 107(K*=3) 109(K*=3) 113(K*=2) 131(K*=2) 137(K*=3) 139(K*=2) 149(K*=2) 163(K*=3) 173(K*=3) 179(K*=2) 193(K*=3) 233(K*=3) 419(K*=3)
//   max K* over the K=0-dead anchors: 21
//
// SEC 4 — READINGS (calibrated; nothing here is a proof of anything asymptotic)
//   1. [VERIFIED] The unified-cap transplant is sound on stretches: at every
//      anchor Q = 7..1499, fresh <= capU_K (all K), capU is monotone in K,
//      and the full-depth floor EQUALS the twin count (bijection) — the
//      origin lemma's structure carries to the quadratic point verbatim.
//   2. [MEASURED] SEC 2 locates the K = 0 (counting-only) certificate's death
//      on the stretch grid; SEC 3 measures the depth cost K*(Q) of buying
//      certification back with other-member freshness conditions.
//   3. [MEASURED] K*/pool is the honest cost figure: 1.0 means the cap family
//      degenerates into the march (no certificate cheaper than the sieve
//      itself); a flat fraction < 1 or a falling curve would be structure.
//   4. NO CLAIM: nothing here bounds Z2 or proves occupancy anywhere the
//      tables do not reach; Route B stays closed; rho(2) stays adverse.
//
// done in 0.2s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// 1. THE TRANSPLANT IS SOUND [VERIFIED, all 236 anchors Q = 7..1499].
//    fresh <= capU_K at every depth, capU monotone in K, and the full-depth
//    floor EQUALS the twin count at every anchor — the origin lemma's
//    injection/bijection structure carries to the quadratic point verbatim,
//    exactly as attack-anchored-01-unify.js's proof predicts (the argument
//    never used the anchor).
// 2. THE K = 0 (COUNTING-ONLY) CERTIFICATE ON THE STRETCH GRID IS WEAKER
//    THAN THE ZONE GRID'S AND DIES EARLIER [MEASURED]: floor_0 >= 1 at only
//    8 anchors {7, 11, 13, 19, 23, 31, 37, 43}, first death already at
//    Q = 17 (the zone-grid census certifies 15 zones to p = 61, dying at
//    67 — destroyer-census-01 §3, cited). Expected direction: the stretch
//    is the zone's deepest, narrowest sub-window. sum(capU_0)/C climbs
//    0.720 -> 1.474 across bands (vs the zone grid's B/C -> 2; smaller
//    because lpf-freshness is built into capU_0, which the member budget
//    B does not have).
// 3. THE HEADLINE MEASUREMENT — DEPTH BUYS EVERY ANCHOR BACK, CHEAPLY SO
//    FAR [MEASURED, no asymptotic claim]: EVERY anchor Q = 7..1499 is
//    certified at some depth (K* exists everywhere; max K* = 21, at a
//    K=0-dead anchor), and the cost FRACTION falls: K*/pool mean 0.093
//    (Q in [101, 313]) -> 0.075 -> 0.061 (Q in [1009, 1499]); absolute K*
//    mean 3.88 -> 8.42 -> 12.20. Q = 67 itself needs K* = 1. The hard
//    anchors are the twin-Q narrow stretches (809: K* = 16; 71: K* = 4;
//    width 4Q+4), matching stretch-01 §3's min-margin owner.
// 4. THE HONEST PROJECTION, WHICH IS THE NEXT QUESTION AND NOT A RESULT:
//    the margin the certificate must clear is T/C ~ c/ln^2(height),
//    falling, while each pool prime r' removes roughly its Hardy-
//    Littlewood share of the remaining double-count. A crude balance of
//    those two rates suggests the depth family, pool capped at Q, could
//    die again far beyond the present range — or not; the constants
//    decide. NOTHING in this range decides it: K*/pool falling on
//    Q <= 1499 is consistent with both fates. The decisive measurement is
//    the next decade (segmented engine, Q to ~10^4) and, on the proof
//    side, an analytic upper bound for capU_K (Legendre/Buchstab count
//    over an interval with K congruence conditions) against a lower bound
//    for C — both elementary objects, no sieve limit invoked; whether
//    their race closes is exactly the wall in this coordinate.
// 5. NO CLAIM: occupancy is already known to 9.0e15 from adopted data
//    (stretch-01 §3); nothing here extends it, bounds Z2, or argues from
//    density (Route B closed; rho(2) adverse). What is new is the
//    INSTRUMENT: the first per-prime, history-blind certificate family
//    running at the quadratic point, with its cost curve measured.
// ============================================================
// FIGURE PROVENANCE. Hand anchors: stretch-01 §0's 121 -> 127 and
// 169 -> 173, and S_7 worked by hand in SEC 0's comment (C = 6, T = 4,
// fresh(7) = 2). Cited, never recomputed: the zone-grid certificate's
// 15/61/67 (destroyer-census-01 §3), occupancy to 9.0e15 and the twin-Q
// min-margin (stretch-01 §3), the unified-cap lemma and pool convention
// (attack-anchored-01-unify.js). Every other figure above is from this
// producer's own OUTPUT block.
// ============================================================
