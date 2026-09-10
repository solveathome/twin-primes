// ============================================================================
// FOLD LEDGER 02 — CAN THE LEDGER'S COLUMNS BE DERIVED IN CLOSED FORM, THE
// WAY THE FULL TILE'S COUNTS CAN? EACH COLUMN TESTED AGAINST ITS CANDIDATE
// ============================================================================
// THE QUESTION (Chris, 2026-08-22, follow-up to fold-ledger-01): the full
// tile has EXACT closed forms (twin-slot census D_x = prod (q-2), A059861)
// because the tile is a full period — CRT counts everything. The ledger's
// columns live in a SHORT WINDOW [q^2, q'^2) of that tile. Which columns
// keep exact closed forms, which have zero-parameter DERIVED EXPECTATIONS
// (census-null grade), and where does closure fail?
//
// THE CANDIDATES, one per column:
//   added(q)     EXACT closed form claimed: pure floor arithmetic —
//                #{a ≡ 11,17,29 (30), q^2 <= a <= q'^2 - 3}. Deterministic;
//                asserted EQUAL at every fold.
//   by_new(q)    derived expectation (the fold's own kills): pairs with one
//                member q*m (m prime) and a prime partner. Null =
//                sum over the deterministic q-multiples in member classes of
//                (30/8)/ln m * (30/8)/ln v * kappa, kappa = the converged
//                twin-type local product prod_{r>=7} r(r-2)/(r-1)^2 —
//                exactly the capture-identity note's kappa. Zero parameters.
//   net(q) = T   two derived forms, both zero-parameter:
//                (T1, tile-form) added * prod_{7<=r<=q}(1-2/r) * rho(2) —
//                the FROZEN TILE's own closed form localized to the window,
//                times the origin-excess constant e^{2gamma}/4;
//                (T2, HL-form) integral of 2*C2/ln^2 x over the stretch.
//                T1 is the tile's closed form wearing the window; T2 is
//                Hardy-Littlewood; asymptotically equal by rho(2)'s
//                definition — measured against both.
//   cc(q)        derived expectation by inclusion-exclusion:
//                added * [1 - 2*(30/8)/ln h] + T2 (both-composite = 1 -
//                either-prime + both-prime), h at the stretch midpoint.
//   removed(q)   = added - net; carried by the net forms.
// The grade sought is the census's: DERIVED null vs MEASURED, ratio per
// band. NO claim that expectations pin per-fold VALUES — the per-fold
// dispersion is measured and reported (that gap IS the short-window wall).
//
// CALIBRATION (abort on mismatch): the ledger is recomputed with the
// fold-ledger-01 engine and asserted row-identical to the committed CSV
// (binds this producer to the table Chris holds); constants recomputed
// from scratch (C2 to 1e7, kappa to 1e7, rho(2) from gamma).
//
// WIDTH AUDIT: identical to fold-ledger-01 (tops < 2^31, Numbers exact,
// no shifts). NO first-moment TPC claim (Route B CLOSED): a validated
// EXPECTATION is a null, not a floor; nothing here certifies occupancy.
// ============================================================================
'use strict';
const T0 = Date.now();
const fs = require('fs');

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function f3(x) { return x.toFixed(3); }
function f4(x) { return x.toFixed(4); }

const QMAX = 9973;
const PLIM = 10100;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7 && p <= QMAX);
const QTOP = PRIMES[PRIMES.findIndex(p => p > QMAX)];
assertEq('next prime above QMAX', QTOP, 10007);

// ---------- constants, recomputed from scratch ----------
const GAMMA = 0.5772156649015329;
const RHO2 = Math.exp(2 * GAMMA) / 4;                 // 0.79305, origin excess
let C2 = 1, KAPPA = 1;
{
  const R = 10_000_000;
  const fl = new Uint8Array(R + 1); fl[0] = fl[1] = 1;
  for (let p = 2; p * p <= R; p++) if (!fl[p]) for (let m = p * p; m <= R; m += p) fl[m] = 1;
  for (let p = 3; p <= R; p++) if (!fl[p]) C2 *= 1 - 1 / ((p - 1) * (p - 1));
  for (let p = 7; p <= R; p++) if (!fl[p]) KAPPA *= p * (p - 2) / ((p - 1) * (p - 1));
}
assertEq('C2 to 5 digits', C2.toFixed(5), '0.66016');
assertEq('kappa to 4 digits', KAPPA.toFixed(4), '0.9389');
console.log(`constants: C2 = ${C2.toFixed(6)}, kappa = ${KAPPA.toFixed(6)}, rho(2) = ${RHO2.toFixed(5)}`);

const isOpen30 = (c) => c === 11 || c === 17 || c === 29;
const MEMBER30 = new Set([11, 13, 17, 19, 29, 1]);

// ============================================================================
console.log('\nSEC 0 — THE LEDGER RECOMPUTED AND BOUND TO THE COMMITTED CSV');
// ============================================================================
let maxW = 0;
{ let prev = 7; for (const p of PRIMES) { if (p < 7) continue; if (p > QTOP) break; if (p > prev) maxW = Math.max(maxW, p * p - prev * prev); prev = p; } }
const lpfw = new Int32Array(maxW + 4);
const rows = [];
for (let Qi = 0; Qi < ACT.length; Qi++) {
  const q = ACT[Qi], qn = Qi + 1 < ACT.length ? ACT[Qi + 1] : QTOP;
  const lo = q * q, hi = qn * qn, width = hi - lo;
  lpfw.fill(0, 0, width + 3);
  for (let ri = 0; ri <= Qi; ri++) {
    const r = ACT[ri];
    for (let v = Math.ceil(lo / r) * r; v <= hi + 1; v += r) if (lpfw[v - lo] === 0) lpfw[v - lo] = r;
  }
  let added = 0, remByQ = 0, remByOld = 0, twins = 0, cc = 0;
  for (let a = lo; a + 2 < hi; a++) {
    if (!isOpen30(a % 30)) continue;
    added++;
    const lA = lpfw[a - lo], lB = lpfw[a + 2 - lo];
    if (lA === 0 && lB === 0) { twins++; continue; }
    if (lA !== 0 && lB !== 0) cc++;
    if ((lA !== 0 && lB !== 0 ? Math.min(lA, lB) : (lA || lB)) === q) remByQ++; else remByOld++;
  }
  rows.push({ q, qn, lo, hi, width, added, removed: remByQ + remByOld, remByQ, twins, cc });
}
{
  const csv = fs.readFileSync('research/fold-ledger-01.csv', 'utf8').trim().split('\n').slice(1);
  assertEq('CSV row count', csv.length, rows.length);
  let ok = true;
  for (let i = 0; i < rows.length; i++) {
    const c = csv[i].split(','), r = rows[i];
    if (Number(c[1]) !== r.q || Number(c[5]) !== r.added || Number(c[6]) !== r.removed ||
        Number(c[7]) !== r.remByQ || Number(c[9]) !== r.twins || Number(c[10]) !== r.cc) { ok = false; break; }
  }
  assertTrue('recomputed ledger row-identical to the committed CSV', ok);
}
console.log(`  ${rows.length} folds recomputed and bound to research/fold-ledger-01.csv`);

// ============================================================================
console.log('\nSEC 1 — added(q): THE EXACT CLOSED FORM (floor arithmetic, no sieve)');
// ============================================================================
{
  let ok = true;
  for (const r of rows) {
    let n = 0;
    for (const c of [11, 17, 29]) {
      const last = r.hi - 3, first = r.lo;             // openers a with a+2 < hi
      n += Math.floor((last - c) / 30) - Math.floor((first - 1 - c) / 30);
    }
    if (n !== r.added) { ok = false; console.log(`  mismatch at q=${r.q}: formula ${n} vs ${r.added}`); break; }
  }
  assertTrue('added(q) equals the floor formula at EVERY fold', ok);
  console.log('  VERDICT: added(q) is EXACT — deterministic floor arithmetic in q^2, q\'^2,');
  console.log('  the same grade as the tile\'s D_x = prod (q-2). No primality input.');
}

// ============================================================================
console.log('\nSEC 2 — by_new(q): THE DERIVED EXPECTATION vs MEASURED');
// ============================================================================
// E[by_new] = sum over deterministic q-multiples v = q*m in member classes,
// pair wholly in stretch, of (30/8)^2 * kappa / (ln m * ln v).
{
  const dens = 30 / 8;
  const Eby = rows.map(r => {
    let E = 0;
    const mLo = Math.ceil(r.lo / r.q), mHi = Math.floor((r.hi + 1) / r.q);
    for (let m = mLo; m <= mHi; m++) {
      const v = r.q * m, c = v % 30;
      if (!MEMBER30.has(c)) continue;
      const opener = isOpen30(c) ? v : v - 2;
      if (opener < r.lo || opener + 2 >= r.hi) continue;
      E += dens * dens * KAPPA / (Math.log(m) * Math.log(v));
    }
    return E;
  });
  console.log('  band            measured   derived    ratio');
  const bands = [[7, 97], [101, 313], [317, 997], [1009, 3163], [3167, 9973]];
  for (const [a, b] of bands) {
    let ms = 0, ds = 0;
    rows.forEach((r, i) => { if (r.q >= a && r.q <= b) { ms += r.remByQ; ds += Eby[i]; } });
    console.log(`  [${String(a).padStart(4)},${String(b).padStart(5)}]   ${String(ms).padStart(6)}    ${ds.toFixed(1).padStart(7)}    ${(ms / ds).toFixed(3)}`);
  }
  let ms = 0, ds = 0; rows.forEach((r, i) => { ms += r.remByQ; ds += Eby[i]; });
  console.log(`  ALL             ${String(ms).padStart(6)}    ${ds.toFixed(1).padStart(7)}    ${(ms / ds).toFixed(3)}`);
  // dispersion: is the per-fold count Poisson-like around the derived mean?
  let chi = 0, n = 0;
  rows.forEach((r, i) => { if (Eby[i] > 0.05) { chi += (r.remByQ - Eby[i]) ** 2 / Eby[i]; n++; } });
  console.log(`  per-fold dispersion (Poisson chi2/df around the derived mean): ${(chi / n).toFixed(3)} over ${n} folds`);
}

// ============================================================================
console.log('\nSEC 3 — net(q) = T: THE TWO DERIVED FORMS vs MEASURED');
// ============================================================================
{
  let tileProd = 1;                                     // prod_{7<=r<=q}(1-2/r), running
  let ri = 0;
  const T1 = [], T2 = [];
  for (const r of rows) {
    while (ri < ACT.length && ACT[ri] <= r.q) { tileProd *= 1 - 2 / ACT[ri]; ri++; }
    T1.push(r.added * tileProd * RHO2);
    // HL integral, 8-panel midpoint
    let s = 0; const d = r.width / 8;
    for (let k = 0; k < 8; k++) { const x = r.lo + (k + 0.5) * d; s += 2 * C2 * d / (Math.log(x) ** 2); }
    T2.push(s);
  }
  console.log('  band            measured   tile-form T1  ratio    HL-form T2   ratio');
  const bands = [[7, 97], [101, 313], [317, 997], [1009, 3163], [3167, 9973]];
  for (const [a, b] of bands) {
    let ms = 0, d1 = 0, d2 = 0;
    rows.forEach((r, i) => { if (r.q >= a && r.q <= b) { ms += r.twins; d1 += T1[i]; d2 += T2[i]; } });
    console.log(`  [${String(a).padStart(4)},${String(b).padStart(5)}]  ${String(ms).padStart(8)}   ${d1.toFixed(0).padStart(9)}   ${(ms / d1).toFixed(4)}   ${d2.toFixed(0).padStart(9)}   ${(ms / d2).toFixed(4)}`);
  }
  // cc: inclusion-exclusion closed form
  console.log('  cc (both-composite) vs 1 - either-prime + both-prime:');
  console.log('  band            measured   derived    ratio');
  for (const [a, b] of bands) {
    let ms = 0, ds = 0;
    rows.forEach((r, i) => {
      if (r.q < a || r.q > b) return;
      const h = r.lo + r.width / 2, dP = (30 / 8) / Math.log(h);
      ms += r.cc; ds += r.added * (1 - 2 * dP) + T2[i];
    });
    console.log(`  [${String(a).padStart(4)},${String(b).padStart(5)}]  ${String(ms).padStart(8)}   ${ds.toFixed(0).padStart(8)}   ${(ms / ds).toFixed(4)}`);
  }
}

// ============================================================================
console.log('\nSEC 4 — READINGS-IN-RUN (the closed-form verdict, column by column)');
// ============================================================================
console.log('  1. added(q): EXACT closed form, tile grade — floor arithmetic, asserted');
console.log('     at every fold. The only column with full-period-style exactness.');
console.log('  2. by_new(q), net(q), cc(q): the EXPECTATIONS carry zero-parameter');
console.log('     derived forms (kappa/HL/tile-product), scored against measurement');
console.log('     above — census-null grade, not theorems, and the per-fold VALUES');
console.log('     are not pinned by any of them (dispersion measured in SEC 2).');
console.log('  3. THE CONTRAST WITH THE TILE, stated plainly: the tile\'s closed forms');
console.log('     are exact because a full period sees every CRT class exactly once;');
console.log('     the stretch sees a ~2q ln q sliver, so every column above is');
console.log('     [exact combinatorial part] + [short-window fluctuation], and only');
console.log('     the first part closes. The fluctuation is not a nuisance term:');
console.log('     bounding it below the mean at every fold IS the postulate.');
console.log('  4. NO CLAIM: validated expectations are nulls (Route B closed); the');
console.log('     dispersion figures are the honest measure of what closure misses.');
console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-ledger-02-derive.js
//   invocation:  node research/fold-ledger-02-derive.js
//   code-sha256: acb3b31c38c2dcdc95e56c075aa5677647f8c369781c5001081ee9d7a1ec833c
//   out-sha256:  c68ff6359e8e46f6d60094f7085f6742cd81f96da910c2f8c0e264e934a413bc
//   body-lines:  52
//   inputs:      research/fold-ledger-01.csv@ed5364404c9b
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-22
//   elapsed:     0.8 s
// ============================================================================
// constants: C2 = 0.660162, kappa = 0.938897, rho(2) = 0.79305
//
// SEC 0 — THE LEDGER RECOMPUTED AND BOUND TO THE COMMITTED CSV
//   1226 folds recomputed and bound to research/fold-ledger-01.csv
//
// SEC 1 — added(q): THE EXACT CLOSED FORM (floor arithmetic, no sieve)
//   VERDICT: added(q) is EXACT — deterministic floor arithmetic in q^2, q'^2,
//   the same grade as the tile's D_x = prod (q-2). No primality input.
//
// SEC 2 — by_new(q): THE DERIVED EXPECTATION vs MEASURED
//   band            measured   derived    ratio
//   [   7,   97]        7       12.2    0.573
//   [ 101,  313]       18       16.1    1.121
//   [ 317,  997]       29       36.7    0.791
//   [1009, 3163]       71       83.4    0.851
//   [3167, 9973]      202      207.5    0.973
//   ALL                327      355.9    0.919
//   per-fold dispersion (Poisson chi2/df around the derived mean): 0.980 over 1023 folds
//
// SEC 3 — net(q) = T: THE TWO DERIVED FORMS vs MEASURED
//   band            measured   tile-form T1  ratio    HL-form T2   ratio
//   [   7,   97]       204         189   1.0772         207   0.9833
//   [ 101,  313]      1017        1006   1.0109        1036   0.9814
//   [ 317,  997]      7086        7036   1.0072        7119   0.9953
//   [1009, 3163]     50827       50234   1.0118       50533   1.0058
//   [3167, 9973]    381731      380977   1.0020      382007   0.9993
//   cc (both-composite) vs 1 - either-prime + both-prime:
//   band            measured   derived    ratio
//   [   7,   97]       281        287   0.9792
//   [ 101,  313]      3738       3751   0.9966
//   [ 317,  997]     46123      46138   0.9997
//   [1009, 3163]    511932     511445   1.0010
//   [3167, 9973]   5565304    5565298   1.0000
//
// SEC 4 — READINGS-IN-RUN (the closed-form verdict, column by column)
//   1. added(q): EXACT closed form, tile grade — floor arithmetic, asserted
//      at every fold. The only column with full-period-style exactness.
//   2. by_new(q), net(q), cc(q): the EXPECTATIONS carry zero-parameter
//      derived forms (kappa/HL/tile-product), scored against measurement
//      above — census-null grade, not theorems, and the per-fold VALUES
//      are not pinned by any of them (dispersion measured in SEC 2).
//   3. THE CONTRAST WITH THE TILE, stated plainly: the tile's closed forms
//      are exact because a full period sees every CRT class exactly once;
//      the stretch sees a ~2q ln q sliver, so every column above is
//      [exact combinatorial part] + [short-window fluctuation], and only
//      the first part closes. The fluctuation is not a nuisance term:
//      bounding it below the mean at every fold IS the postulate.
//   4. NO CLAIM: validated expectations are nulls (Route B closed); the
//      dispersion figures are the honest measure of what closure misses.
//
// done in 0.7s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// (SEC 4 carries the in-run readings; the verdict table is the OUTPUT block)
// ============================================================
