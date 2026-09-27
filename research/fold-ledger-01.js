// ============================================================================
// FOLD LEDGER 01 — CHRIS'S COUNTING TABLE: PER FOLD q, THE PAIR OPPORTUNITIES
// ADDED AND REMOVED IN THE WINDOW THAT FOLD MAKES FINAL, WITH THE REMOVALS
// SPLIT BY OWNER (THE NEW PRIME vs THE OLD MOIRE), DUMPED AS CSV
// ============================================================================
// THE QUESTION (Chris, 2026-08-22): "for each fold (added p) for the window
// p > p*p, how many new prime pair opportunities are added and how many are
// removed?" The clean disjoint bookkeeping is the STRETCH grid: the
// stretches S_q = [q^2, q'^2) partition the line, and fold q is exactly the
// moment S_q becomes FINAL (freeze S1: its destroyer set is {7..q},
// complete when q activates — stretch-01 §1). So the per-fold ledger reads:
//
//   added(q)        = channel pairs wholly inside S_q (openers ≡ 11,17,29
//                     mod 30) — the fold's newborn opportunities;
//   //                     smallest striking prime, the census convention):
//     removed_by_q    destroyer = q itself — the new prime's own kills in
//                     its newborn stretch (structurally: q x prime member
//                     with a prime partner, the entry-fee/live-kill class);
//     removed_by_old  destroyer < q — the frozen moire of {7..q-1}
//                     continuing into new territory;
//   net_twins(q)    = added - removed = the fold's surviving pairs;
//   cc(q)           = both-composite pairs among the removed (each absorbs
//                     TWO composite members — the mechanism that kills the
//                     counting certificate, destroyer-census-01 §3 /
//                     the capture identity).
//
// A prime q also keeps killing in LATER stretches (q * m for larger prime
// cofactors m); those kills appear as removed_by_old in later rows — this
// table logs each stretch's ledger AT ITS OWN FOLD, once, no overlap, and
// the columns telescope: cum_added - cum_removed = cum_twins exactly.
//
// RANGE: q = 7..9973 (stretch tops to 9973'^2 = 99,460,729 ~ 1e8; the
// easily-computable set, seconds). OUTPUT: research/fold-ledger-01.csv
// (one row per fold; open in any spreadsheet), plus band summaries and
// calibration in this producer's OUTPUT block.
//
// CALIBRATION (abort on mismatch): S_7 by hand (added 6, removed 2 — both
// by 7 itself: 77 = 7*11 A-side, 91 = 7*13 B-side on (89,91) — net 4);
// stretch-01's occupancy (net >= 1 at every fold in range); the capture
// identity's CC bookkeeping (cc <= removed); cum_twins at the top equals
// an independent direct sieve count.
//
// WIDTH AUDIT (the level this RUNS at): tops <= 99,460,731 < 2^31; all
// arithmetic in Numbers, exact; window offsets < 2^20; no bit shifts.
// NO first-moment TPC claim (Route B CLOSED; the diverging net column is
// a BUDGET, not evidence — the square-window lesson rides every row).
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

const QMAX = 9973;
const PLIM = 10100;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7 && p <= QMAX);
const QTOP = PRIMES[PRIMES.findIndex(p => p > QMAX)];
assertEq('next prime above QMAX', QTOP, 10007);
assertEq('width audit: top < 2^31', QTOP * QTOP < 2 ** 31, true);

const isOpen30 = (c) => c === 11 || c === 17 || c === 29;
let maxW = 0;
{ let prev = 7; for (const p of PRIMES) { if (p < 7) continue; if (p > QTOP) break; if (p > prev) maxW = Math.max(maxW, p * p - prev * prev); prev = p; } }
const lpfw = new Int32Array(maxW + 4);

// ============================================================================
console.log('SEC 0/1 — THE LEDGER (calibration inline, abort on mismatch)');
// ============================================================================
const rows = [];
let cumAdd = 0, cumRem = 0, cumTwin = 0;
for (let Qi = 0; Qi < ACT.length; Qi++) {
  const q = ACT[Qi], qn = Qi + 1 < ACT.length ? ACT[Qi + 1] : QTOP;
  const lo = q * q, hi = qn * qn, width = hi - lo;
  lpfw.fill(0, 0, width + 3);
  for (let ri = 0; ri <= Qi; ri++) {          // ascending actives: first touch = lpf
    const r = ACT[ri];
    for (let v = Math.ceil(lo / r) * r; v <= hi + 1; v += r) if (lpfw[v - lo] === 0) lpfw[v - lo] = r;
  }
  let added = 0, remByQ = 0, remByOld = 0, twins = 0, cc = 0;
  for (let a = lo; a + 2 < hi; a++) {
    if (!isOpen30(a % 30)) continue;
    added++;
    const lA = lpfw[a - lo], lB = lpfw[a + 2 - lo];
    if (lA === 0 && lB === 0) { twins++; continue; }
    const destroyer = (lA !== 0 && lB !== 0) ? Math.min(lA, lB) : (lA !== 0 ? lA : lB);
    if (lA !== 0 && lB !== 0) cc++;
    if (destroyer === q) remByQ++; else remByOld++;
  }
  const removed = remByQ + remByOld;
  assertEq(`ledger closes at q=${q}`, added - removed, twins);
  assertTrue(`occupancy at q=${q}`, twins >= 1);
  cumAdd += added; cumRem += removed; cumTwin += twins;
  rows.push({ q, qn, width, added, removed, remByQ, remByOld, twins, cc, cumAdd, cumRem, cumTwin });
}
// hand calibration: S_7
{
  const r = rows[0];
  assertTrue('hand anchor S_7 (added 6, removed 2 both by 7, net 4)',
    r.added === 6 && r.removed === 2 && r.remByQ === 2 && r.remByOld === 0 && r.twins === 4 && r.cc === 0);
}
// independent top check: cum twins = direct sieve count of twins in [49, QTOP^2)
{
  const N = QTOP * QTOP + 2;
  const f = new Uint8Array(N + 1); f[0] = f[1] = 1;
  for (let p = 2; p * p <= N; p++) if (!f[p]) for (let m = p * p; m <= N; m += p) f[m] = 1;
  let t = 0;
  for (let a = 49; a + 2 < QTOP * QTOP; a++) if (isOpen30(a % 30) && !f[a] && !f[a + 2]) t++;
  assertEq('cum twins vs independent direct sieve over [49, top)', cumTwin, t);
}
console.log(`  ${rows.length} folds, q = 7..${QMAX}; every row closes (added - removed = net), occupancy everywhere;`);
console.log(`  cumulative: added ${cumAdd}, removed ${cumRem}, surviving twins ${cumTwin} (verified against an independent sieve)`);

// ---- CSV dump ----
const CSVPATH = 'research/fold-ledger-01.csv';
{
  const lines = ['fold_n,q,q_next,stretch_lo,width,added_pairs,removed_total,removed_by_new_prime,removed_by_old_moire,net_new_twins,both_composite_pairs,removal_share,by_new_share_of_removed,cum_added,cum_removed,cum_twins'];
  rows.forEach((r, i) => {
    lines.push([i + 1, r.q, r.qn, r.q * r.q, r.width, r.added, r.removed, r.remByQ, r.remByOld, r.twins, r.cc,
      (r.removed / r.added).toFixed(4), r.removed ? (r.remByQ / r.removed).toFixed(4) : '0.0000',
      r.cumAdd, r.cumRem, r.cumTwin].join(','));
  });
  fs.writeFileSync(CSVPATH, lines.join('\n') + '\n');
  console.log(`  CSV written: ${CSVPATH} (${rows.length} rows + header, 16 columns)`);
}

// ============================================================================
console.log('\nSEC 2 — THE SHAPE, IN BANDS (what the CSV holds)');
// ============================================================================
{
  console.log('  band            folds   added     removed   by_new  by_old     net   removal%  by_new% of removals   cc/removed');
  const bands = [[7, 31], [37, 97], [101, 313], [317, 997], [1009, 3163], [3167, 9973]];
  for (const [a, b] of bands) {
    const rs = rows.filter(r => r.q >= a && r.q <= b);
    const s = (k) => rs.reduce((x, r) => x + r[k], 0);
    const add = s('added'), rem = s('removed'), bn = s('remByQ'), bo = s('remByOld'), tw = s('twins'), cc = s('cc');
    console.log(`  [${String(a).padStart(4)},${String(b).padStart(5)}]  ${String(rs.length).padStart(5)}  ${String(add).padStart(8)}  ${String(rem).padStart(8)}  ${String(bn).padStart(6)}  ${String(bo).padStart(8)}  ${String(tw).padStart(6)}   ${(100 * rem / add).toFixed(2).padStart(6)}%   ${(100 * bn / rem).toFixed(3).padStart(7)}%          ${(cc / rem).toFixed(4)}`);
  }
  // the per-fold O(1) law for the new prime's own kills
  const mBn = rows.reduce((s, r) => s + r.remByQ, 0) / rows.length;
  const worstBn = rows.reduce((w, r) => Math.max(w, r.remByQ), 0);
  console.log(`  removed_by_new_prime per fold: mean ${mBn.toFixed(3)}, max ${worstBn} — the fold's own kills in its newborn stretch stay O(1)`);
  console.log(`  (a prime's LATER kills land in later rows' by_old column; this table logs each stretch once, at its fold)`);
}

// ============================================================================
console.log('\nSEC 3 — READINGS-IN-RUN (calibrated; the CSV is the deliverable)');
// ============================================================================
console.log('  1. [VERIFIED] Every row closes exactly (added - removed = net) and the');
console.log('     cumulative twin column reproduces an independent direct sieve.');
console.log('  2. [MEASURED] The removal share climbs with q (the survival density');
console.log('     falls like the tread curve) while the NEW prime owns a vanishing');
console.log('     sliver of removals: almost all destruction in newborn territory is');
console.log('     the OLD moire arriving, not the new fold acting.');
console.log('  3. [MEASURED] cc/removed climbs: ever more destroyed pairs absorb two');
console.log('     composite members — the counting-certificate death mechanism');
console.log('     (destroyer-census-01 §3, the capture identity) visible per fold.');
console.log('  4. NO CLAIM: the net column diverging is the BUDGET, not evidence');
console.log('     (Route B closed; the square-window lesson). Exact counting only.');
console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-ledger-01.js
//   invocation:  node research/fold-ledger-01.js
//   code-sha256: ee478f16c9c11efecd17937cb61c0f64f11e88ad4943f66286ffffef3f19efab
//   out-sha256:  bab6ebf1ff65a74ee66a78bde10d22eb14343aa3f199215568b9f789a2d320ff
//   body-lines:  31
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-22
//   elapsed:     1.4 s
// ============================================================================
// SEC 0/1 — THE LEDGER (calibration inline, abort on mismatch)
//   1226 folds, q = 7..9973; every row closes (added - removed = net), occupancy everywhere;
//   cumulative: added 10012774, removed 9571909, surviving twins 440865 (verified against an independent sieve)
//   CSV written: research/fold-ledger-01.csv (1226 rows + header, 16 columns)
//
// SEC 2 — THE SHAPE, IN BANDS (what the CSV holds)
//   band            folds   added     removed   by_new  by_old     net   removal%  by_new% of removals   cc/removed
//   [   7,   31]      8       124        84       4        80      40    67.74%     4.762%          0.2024
//   [  37,   97]     14       869       705       3       702     164    81.13%     0.426%          0.3745
//   [ 101,  313]     40      8989      7972      18      7954    1017    88.69%     0.226%          0.4689
//   [ 317,  997]    103     91656     84570      29     84541    7086    92.27%     0.034%          0.5454
//   [1009, 3163]    279    900902    850075      71    850004   50827    94.36%     0.008%          0.6022
//   [3167, 9973]    782   9010234   8628503     202   8628301  381731    95.76%     0.002%          0.6450
//   removed_by_new_prime per fold: mean 0.267, max 3 — the fold's own kills in its newborn stretch stay O(1)
//   (a prime's LATER kills land in later rows' by_old column; this table logs each stretch once, at its fold)
//
// SEC 3 — READINGS-IN-RUN (calibrated; the CSV is the deliverable)
//   1. [VERIFIED] Every row closes exactly (added - removed = net) and the
//      cumulative twin column reproduces an independent direct sieve.
//   2. [MEASURED] The removal share climbs with q (the survival density
//      falls like the tread curve) while the NEW prime owns a vanishing
//      sliver of removals: almost all destruction in newborn territory is
//      the OLD moire arriving, not the new fold acting.
//   3. [MEASURED] cc/removed climbs: ever more destroyed pairs absorb two
//      composite members — the counting-certificate death mechanism
//      (destroyer-census-01 §3, the capture identity) visible per fold.
//   4. NO CLAIM: the net column diverging is the BUDGET, not evidence
//      (Route B closed; the square-window lesson). Exact counting only.
//
// done in 1.4s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// (the CSV research/fold-ledger-01.csv is the deliverable; SEC 3 carries
// the in-run readings; regenerating the CSV: node research/fold-ledger-01.js)
// ============================================================
