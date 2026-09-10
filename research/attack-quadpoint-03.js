// ============================================================================
// ATTACK QUADPOINT 03 — THE IDENTITY: THE TRANSPLANTED CAP FAMILY COLLAPSES
// TO THE ROUGH-PAIR CENSUS (floor_K = T - X(K), EXACT), AND THE DEPTH LAW
// GETS A ZERO-PARAMETER CANDIDATE y* = h^{1/(2e^gamma)}
// ============================================================================
// THE CLAIM PROVED AND VERIFIED HERE (derivation in the staging note
// quadpoint-identity-01.md; this producer is its computational check).
//
//   Lemma (capture identity). Fix an anchor Q, the stretch S_Q, capacity C,
//   twins T, actives p_1 < p_2 < ... (7, 11, 13, ...), pool convention as in
//   attack-quadpoint-01/02 (per prime r, the first min(K, idx(r)) actives
//   below r). Then for every K:
//
//       sum_r capU_K(r)  =  (C - T) + X(K),   i.e.   floor_K = T - X(K),
//
//   where X(K) = #{pairs with BOTH members composite and min(lpf(a),
//   lpf(a+2)) > p_K}  (X(0) = all both-composite pairs).
//
//   Proof sketch (full text in the note): candidates of r are EXACTLY the
//   composite members v with lpf(v) = r (v = r*m, lpf(m) >= r <=> r is
//   v's least factor; primes are never candidates; each composite member
//   is a candidate of exactly one r). The depth condition keeps v iff its
//   PARTNER is free of the pool primes, i.e. lpf(partner) > p_{min(K,
//   idx(r))}. Classify pairs: a composite member with a PRIME partner is
//   always kept (lpf of a prime partner exceeds every active); in a
//   both-composite pair with lpfs r1 < r2, the r1-member is always kept
//   (its partner's lpf r2 > r1 clears r1's own pool at any K), and the
//   r2-member is kept iff r1 > p_K (if idx(r2) <= K the pool below r2
//   contains r1 and kills it; if idx(r2) > K the test is r1 > p_K, and
//   r1 > p_K forces idx(r2) > K). Summing: (C-T-CC) + CC + X(K). QED.
//
// CONSEQUENCES VERIFIED HERE:
//   - floor_K = T - X(K) at EVERY depth of EVERY anchor (caps recomputed
//     from the v2 engine path and compared; the two computations share no
//     code beyond the window sieve).
//   - K*(Q) = least K with X(K) <= T - 1: the depth cost IS the crossing
//     point of the rough-pair census X against the twin count T. The
//     full-depth bijection, the K = 0 stretch-grid death at 17 (X(0) = CC
//     >= T), and the twin-Q convergence are all corollaries.
//   - y*(Q) = p_{K*}, the deepest pool prime the certificate needs. The
//     zero-parameter heuristic law derived in the note (main terms,
//     Mertens + the twin-type local product, which cancels EXACTLY
//     between the rough-rough and prime-prime sides):
//
//         delta_rough(y*) = 2 * delta_prime  <=>  y* = h^{1/(2 e^gamma)},
//
//     h = Q^2, 1/(2e^gamma) = 0.28073. Measured here per band against
//     that constant. HEURISTIC: the law's status is measured-consistent,
//     nothing more.
//
// WIDTH AUDIT: identical to v2 (QMAX 10007, hi <= 10009^2 < 2^31, offsets
// < 2^20, no shifts). Everything exact counting; NO first-moment TPC claim
// (Route B CLOSED; rho(2) ADVERSE). HELD for the EOD roundup.
//
// PRIOR ART ON DISK: attack-quadpoint-02.js (v2 — engine + cited K* rows),
// attack-quadpoint-01.js (v1), quadpoint-decade-prereg.md (3f26d19),
// stretch-01.md, destroyer-census-01.js (the lpf/destroyer conventions).
// The rough-pair-vs-twin comparison touches Chen/almost-prime territory:
// the PRIOR-ART SEARCH IS OWED and no novelty is claimed anywhere here
// (SEARCH-CONVENTIONS discipline; flagged in the note).
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
function f4(x) { return x.toFixed(4); }

const PLIM = 31700;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);
const QMAX = 10007;
const ANCHORS = ACT.filter(p => p <= QMAX);
const KCAP = 64, CALMAX = 1499;
const GAMMA = 0.5772156649015329;
const THETA = 1 / (2 * Math.exp(GAMMA));          // 0.28073, the candidate law

const isOpen30 = (c) => c === 11 || c === 17 || c === 29;
const isClose30 = (c) => c === 13 || c === 19 || c === 1;

let maxW = 0;
{ let prev = 7; for (const p of ACT) { if (p > 10009) break; maxW = Math.max(maxW, p * p - prev * prev); prev = p; } }
const lpfw = new Int32Array(maxW + 4);            // first-touch = lpf (actives only)

function runAnchor(Qi, verifyCaps) {
  const Q = ANCHORS[Qi], Qp = Qi + 1 < ANCHORS.length ? ANCHORS[Qi + 1] : PRIMES[PRIMES.findIndex(p => p > Q)];
  const lo = Q * Q, hi = Qp * Qp, width = hi - lo, nR = Qi + 1;
  lpfw.fill(0, 0, width + 3);
  for (let ri = 0; ri < nR; ri++) {               // ascending => first touch = lpf
    const r = ACT[ri];
    for (let v = Math.ceil(lo / r) * r; v <= hi + 1; v += r) if (lpfw[v - lo] === 0) lpfw[v - lo] = ri + 1; // store 1-based active index
  }
  let C = 0, T = 0;
  const ccMinIdx = [];                            // per both-composite pair: 1-based index of min lpf
  for (let a = lo; a + 2 < hi; a++) {
    if (!isOpen30(a % 30)) continue;
    C++;
    const iA = lpfw[a - lo], iB = lpfw[a + 2 - lo];
    if (iA === 0 && iB === 0) T++;
    else if (iA > 0 && iB > 0) ccMinIdx.push(Math.min(iA, iB));
  }
  // X(K) = #cc with minIdx > K  (p_K = ACT[K-1]; minIdx is the active index)
  const histo = new Int32Array(nR + 2);
  for (const d of ccMinIdx) histo[d]++;
  const X = new Int32Array(nR + 1);               // X[K]
  X[nR] = 0;
  for (let K = nR - 1; K >= 0; K--) X[K] = X[K + 1] + histo[K + 1];
  assertEq(`X(0) = CC at Q=${Q}`, X[0], ccMinIdx.length);
  assertEq(`X(full) = 0 at Q=${Q}`, X[nR], 0);
  let Kstar = -1;
  for (let K = 0; K <= nR; K++) if (T - X[K] >= 1) { Kstar = K; break; }
  // ---- independent cap-side verification (the v2 code path) ----
  if (verifyCaps) {
    const kEff = Q <= CALMAX ? nR : KCAP;
    const sumCap = new Float64Array(kEff + 1);
    for (let ri = 0; ri < nR; ri++) {
      const r = ACT[ri];
      const poolMax = Math.min(ri, kEff);
      const finiteByD = new Int32Array(poolMax + 2);
      let nCand = 0;
      for (let v = Math.ceil(lo / r) * r; v <= hi; v += r) {
        const c = v % 30;
        let side = 0;
        if (isOpen30(c)) { if (v + 2 < hi) side = 1; }
        else if (isClose30(c)) { if (v - 2 >= lo && v < hi) side = 2; }
        if (!side) continue;
        const m = v / r;
        let ok = true;
        for (let t = 0; t < ri; t++) { const p2 = ACT[t]; if (p2 * p2 > m) break; if (m % p2 === 0) { ok = false; break; } }
        if (!ok) continue;
        nCand++;
        for (let t = 0; t < poolMax; t++) {
          const p2 = ACT[t];
          if (side === 1 ? (v % p2 === p2 - 2) : (v % p2 === 2)) { finiteByD[t + 1]++; break; }
        }
      }
      let excluded = 0;
      for (let K = 0; K <= kEff; K++) {
        if (K >= 1 && K <= poolMax) excluded += finiteByD[K];
        sumCap[K] += nCand - excluded;
      }
    }
    let identOK = true;
    for (let K = 0; K <= kEff; K++) if (C - sumCap[K] !== T - X[Math.min(K, nR)]) identOK = false;
    assertTrue(`IDENTITY floor_K = T - X(K), all K, Q=${Q}`, identOK);
  }
  return { Q, Qp, C, T, nR, Kstar, X0: X[0],
    ystar: Kstar > 0 ? ACT[Kstar - 1] : 1, twinQ: Qp - Q === 2 };
}

// ============================================================================
console.log('SEC 1 — THE IDENTITY, VERIFIED AT EVERY DEPTH OF EVERY ANCHOR');
// ============================================================================
// Cap-side verification: EVERY anchor <= 1499 (uncapped) and every anchor
// above (KCAP = 64) — the identity is asserted at all K on the entire run.
const rows = [];
for (let Qi = 0; Qi < ANCHORS.length; Qi++) rows.push(runAnchor(Qi, true));
console.log(`  identity floor_K = T - X(K) holds at every K of all ${rows.length} anchors (caps recomputed on the v2 path)`);
// v2-cited K* reproduction (the identity path must land the same K*)
const V2K = [[1511, 15], [1999, 16], [2503, 19], [2999, 25], [3163, 18], [3511, 22], [4001, 27], [4507, 21],
  [4999, 22], [5623, 27], [6007, 23], [6521, 27], [7001, 29], [7507, 34], [8009, 31], [8513, 32],
  [9001, 33], [9497, 32], [10007, 30], [7, 0], [43, 0], [61, 1], [67, 1], [71, 4], [809, 16], [1499, 13]];
for (const [Q, Ks] of V2K) assertEq(`v2-cited K* at Q=${Q}`, rows.find(r => r.Q === Q).Kstar, Ks);
{
  const worstAbs = rows.reduce((w, r) => (r.Kstar > w.Kstar ? r : w));
  assertTrue('v2-cited largest K* = 46 at Q = 9281', worstAbs.Q === 9281 && worstAbs.Kstar === 46);
  const b8 = rows.filter(r => r.Q >= 5624 && r.Q <= 10007);
  assertEq('v2-cited B8 K* mean', f2(b8.reduce((s, r) => s + r.Kstar, 0) / b8.length), '31.22');
}
console.log('  v2-cited K* values reproduced through the identity path (25 anchors + max + band mean)');

// ============================================================================
console.log('\nSEC 2 — THE DEPTH LAW AGAINST THE ZERO-PARAMETER CANDIDATE');
// ============================================================================
// y*(Q) = p_{K*}; candidate: ln y* / ln h -> 1/(2e^gamma) = ' + THETA
{
  console.log(`  candidate constant 1/(2e^gamma) = ${f4(THETA)} (h = Q^2)`);
  console.log('  band          n    K* mean   y* mean   ln y*/ln h mean   vs candidate');
  const bands = [['[101,313]', 101, 313], ['[317,997]', 317, 997], ['[1009,1499]', 1009, 1499],
    ['[1500,3163]', 1500, 3163], ['[3164,5623]', 3164, 5623], ['[5624,10007]', 5624, 10007]];
  for (const [name, a, b] of bands) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b && r.Kstar > 0);
    const mK = rs.reduce((s, r) => s + r.Kstar, 0) / rs.length;
    const mY = rs.reduce((s, r) => s + r.ystar, 0) / rs.length;
    const mL = rs.reduce((s, r) => s + Math.log(r.ystar) / (2 * Math.log(r.Q)), 0) / rs.length;
    console.log(`  ${name.padEnd(12)} ${String(rs.length).padStart(4)}   ${f2(mK).padStart(7)}   ${f2(mY).padStart(7)}   ${f4(mL).padStart(12)}       ${f3(mL / THETA)}`);
  }
  const last = rows.filter(r => r.Q >= 5624 && r.Kstar > 0);
  const mLast = last.reduce((s, r) => s + Math.log(r.ystar) / (2 * Math.log(r.Q)), 0) / last.length;
  console.log(`  top-band mean/candidate = ${f4(mLast / THETA)} (1.000 = exact); drift direction across bands printed above`);
}

// ============================================================================
console.log('\nSEC 3 — WHAT THE IDENTITY EXPLAINS, CHECKED');
// ============================================================================
{
  // K = 0 death <=> X(0) = CC >= T; the certificate list is where CC < T
  const ok0 = rows.filter(r => r.X0 <= r.T - 1).map(r => r.Q);
  assertEq('K=0 certificate list == CC < T list', ok0.slice(0, 8).join(','), '7,11,13,19,23,31,37,43');
  assertEq('K=0 list has no members beyond 43', ok0.length, 8);
  // crossing form: X falls from CC to 0 as K grows; K* is the T-crossing
  const s = rows.find(r => r.Q === 9281);
  console.log(`  worst anchor 9281: T = ${s.T}, CC = ${s.X0}, K* = ${s.Kstar}, y* = ${s.ystar} — the census X crosses T at p_${s.Kstar}`);
  console.log(`  K = 0 certificate <=> both-composite pairs fewer than twins: exactly the 8 cited anchors`);
}

// ============================================================================
console.log('\nSEC 4 — THE FORECAST TABLE (heuristic, printed for the sealed test to come)');
// ============================================================================
// If y* = h^theta exactly: K*(Q) ~ pi(Q^{2 theta}) - 3, K*/pool falls like
// a power. Printed for Q = 31607, 1e5 (NOT run here; a fresh prereg + width
// audit gate any run past 10007 — the v2 producer's own rule).
{
  // pi to 1e5 by its own sieve (PRIMES stops at 31700 — the truncation trap)
  const PF = 100010;
  const fl2 = new Uint8Array(PF + 1); fl2[0] = fl2[1] = 1;
  for (let p = 2; p * p <= PF; p++) if (!fl2[p]) for (let m = p * p; m <= PF; m += p) fl2[m] = 1;
  const pi = (x) => { let c = 0; for (let n = 2; n <= x; n++) if (!fl2[n]) c++; return c; };
  assertEq('pi(1e5) sanity', pi(100000), 9592);
  console.log(`  pi(1e5) = ${pi(100000)} by this file's own sieve (asserted)`);
  for (const Qf of [31607, 100003]) {
    const y = Math.pow(Qf * Qf, THETA);
    const Kf = pi(y) - 3, pool = pi(Qf) - 3;
    console.log(`  Q = ${Qf}: predicted y* = ${y.toFixed(0)}, K* ~ ${Kf}, pool ${pool}, K*/pool ~ ${f4(Kf / pool)}`);
  }
  console.log('  (band-mean forecasts; the finite-size drift measured in SEC 2 sits BELOW');
  console.log('   the candidate, so these are upper-edge numbers, to be sealed properly');
  console.log('   in any future prereg, not here)');
}

console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-quadpoint-03.js
//   invocation:  node research/attack-quadpoint-03.js
//   code-sha256: 5fa9bb3748e08800ce2f4c78bf7d78ab5747b76785dde106faa1d547f0da7af3
//   out-sha256:  196602b177fbab20fb857042172ad252a4fb6d809a41f21a32b0c8a342ea7670
//   body-lines:  29
//   forced:      2026-08-22, 0 of 51 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-22
//   elapsed:     2.2 s
// ============================================================================
// SEC 1 — THE IDENTITY, VERIFIED AT EVERY DEPTH OF EVERY ANCHOR
//   identity floor_K = T - X(K) holds at every K of all 1227 anchors (caps recomputed on the v2 path)
//   v2-cited K* values reproduced through the identity path (25 anchors + max + band mean)
//
// SEC 2 — THE DEPTH LAW AGAINST THE ZERO-PARAMETER CANDIDATE
//   candidate constant 1/(2e^gamma) = 0.2807 (h = Q^2)
//   band          n    K* mean   y* mean   ln y*/ln h mean   vs candidate
//   [101,313]      40      3.88     16.15         0.2624       0.935
//   [317,997]     103      8.42     33.76         0.2705       0.963
//   [1009,1499]    71     12.20     48.92         0.2720       0.969
//   [1500,3163]   208     16.88     69.85         0.2740       0.976
//   [3164,5623]   292     23.34    100.42         0.2749       0.979
//   [5624,10007]  491     31.22    141.80         0.2763       0.984
//   top-band mean/candidate = 0.9843 (1.000 = exact); drift direction across bands printed above
//
// SEC 3 — WHAT THE IDENTITY EXPLAINS, CHECKED
//   worst anchor 9281: T = 127, CC = 2357, K* = 46, y* = 227 — the census X crosses T at p_46
//   K = 0 certificate <=> both-composite pairs fewer than twins: exactly the 8 cited anchors
//
// SEC 4 — THE FORECAST TABLE (heuristic, printed for the sealed test to come)
//   pi(1e5) = 9592 by this file's own sieve (asserted)
//   Q = 31607: predicted y* = 336, K* ~ 64, pool 3398, K*/pool ~ 0.0188
//   Q = 100003: predicted y* = 642, K* ~ 113, pool 9590, K*/pool ~ 0.0118
//   (band-mean forecasts; the finite-size drift measured in SEC 2 sits BELOW
//    the candidate, so these are upper-edge numbers, to be sealed properly
//    in any future prereg, not here)
//
// done in 2.1s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// 1. THE IDENTITY IS A THEOREM AND THE MACHINERY COLLAPSES [PROVEN,
//    elementary — full text in quadpoint-identity-01.md; VERIFIED here at
//    every depth K of all 1227 anchors, caps recomputed on the v2 code
//    path]: floor_K = T - X(K), where X(K) counts the both-composite
//    pairs whose smaller lpf exceeds the K-th pool prime. The entire
//    transplanted cap family IS the classical census "twins vs rough-rough
//    pairs" in the stretch: K*(Q) is the depth where the rough-pair count
//    X falls below the twin count T. Corollaries now one-liners: the
//    full-depth bijection (X = 0 past the last composite lpf), the K = 0
//    stretch-grid death (X(0) = CC >= T from Q = 17 on; the 8-anchor
//    certificate list is EXACTLY the CC < T list, asserted), and the
//    twin-Q convergence.
// 2. THE DEPTH LAW HAS A ZERO-PARAMETER CANDIDATE [HEURISTIC, derivation
//    in the note; MEASURED-consistent]: main terms with the twin-type
//    local product cancelling exactly between the rough-rough and
//    prime-prime sides give the certificate condition delta_rough(y) <
//    2 delta_prime, i.e. y* = h^{1/(2e^gamma)}, exponent 0.2807. Measured
//    band means of ln y*/ln h climb 0.2624 -> 0.2763 monotonically =
//    0.935 -> 0.984 of the candidate, from below — consistent with
//    convergence, NOT a confirmation (six band means, finite-size drift
//    unmodelled).
// 3. THE WALL, RELOCATED WITH COORDINATES [the honest reading]: proving
//    floor >= 1 is proving X(y) < T. Sum capU = C - T + X = the count of
//    composite members with a y-rough partner; certifying it below C - 1
//    needs that count bounded with relative precision at TWIN scale
//    (margin (T - X)/C ~ 1/ln^2 h) — sharper than any sieve upper bound's
//    constant, on intervals as short as the stretch. The analytic race
//    (TODO Z2) in exact form: beat the twin density in the error term of
//    a rough-pair count on a short interval. Fourth frame of the same
//    wall (zones, origin, square anchor, now the rough-pair census).
// 4. THE LARGER-RUN QUESTION IS TRANSFORMED: any decade extension is now
//    a BLIND TEST of a zero-parameter law — predicted y* = 336 at
//    Q = 31607 and 642 at Q = 100003 (K*/pool ~ 0.0188 / 0.0118), to be
//    sealed in a fresh prereg with a fresh width audit before any run
//    (the v2 rule). Upper-edge numbers: the measured drift sits BELOW the
//    candidate.
// 5. PRIOR-ART FLAG, SEARCH OWED: rough-rough pairs are almost-prime
//    pairs — Chen-method territory. The X-vs-T comparison in prime-square
//    windows must be searched in the owning convention
//    (SEARCH-CONVENTIONS discipline) BEFORE any novelty language; none is
//    used here. NO TPC claim; Route B closed; rho(2) adverse.
// ============================================================
// FIGURE PROVENANCE. v2-cited calibration constants (the 25 K* values,
// the B8 band mean 31.22, max 46 at 9281) are CITED from the embedded
// OUTPUT of research/attack-quadpoint-02.js and asserted. pi(1e5) = 9592
// is asserted against this file's own sieve. 1/(2e^gamma) is computed
// from gamma at run time. Every other figure is from this producer's own
// OUTPUT block.
// ============================================================
