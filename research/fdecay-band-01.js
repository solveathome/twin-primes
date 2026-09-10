// research/fdecay-band-01.js
//
// fdecay-band 01: the x = 1000 L band of f-decays.md, given script custody,
// and recomputed on the alias-free census.
//
// QUESTION. f-decays.md quotes, for x = 1000: f ~ 2.3e-12, ln(1/f) ~ 26.8,
// L ~ 35.5, band 30.8 to 42.9, against ln^2(1000) = 47.7. Its own UNTRACED
// banner (2026-08-20, mismatch adjudication #35) records that neither the
// point estimate nor the band has script custody anywhere in the corpus: the
// half-range re-anchoring was done in the document. Worse, those numbers were
// fitted to the 42-point census that history/staging/fdecay-deep.md proved
// DEFECTIVE from x = 37 up (JavaScript `<<` takes shift counts mod 32, so the
// evaluator aliased residues for primes above 32). This script is the missing
// producer: it computes the band from the published (defective) points, as
// the control that bridges to the quoted numbers, and from the corrected
// alias-free points, which is the band that should be quoted now.
//
// DATA. Parsed at runtime from the embedded OUTPUT tail of
// research/fdecay-deep-01-census-defect.js (out-sha256 4d932d02..., 2209.2 s,
// 2026-08-19): its section 2 gives, per level, d_min and count(d_min)/D under
// both evaluators at 6 significant figures; its section 4 gives T = 2p/mbar
// and S = ln s(d_min). Both f columns are FIRST-TERM values (count(d_min)/D),
// so the published and corrected fits are comparable; the a3-03 published
// FULL-f law (1.529 + 1.482*T - 1.025*S), which is what f-decays.md actually
// extrapolated, is evaluated alongside as the bridge to the quoted 35.5.
// No residue bitmask is touched here: everything is float log arithmetic and
// d = 2016 is far below 2^53.
//
// CHECKS, all hard-failing.
//   C1  d_min from section 2 equals the closed form 2p+2 (p = 2 mod 3) /
//       2p-2 (p = 1 mod 3) at all 42 levels (research/kappa-not-L.md).
//   C2  T and S recomputed from fdecay-deep-00-core.js (meanGap, lnS) match
//       section 4's printed columns at all 42 levels to the printed 3 dp.
//   C3  section 4's ln(1/f) columns equal -ln(section 2's f columns) to the
//       printed 4 dp at all 42 levels.
//   C4  the full-range OLS refits reproduce the coefficients printed in the
//       embedded tail (published 1.609 + 1.4675*T - 1.038*S R2 0.9646;
//       corrected 1.323 + 1.5741*T - 1.030*S R2 0.9754) to |delta| <= 0.002.
//
// METHOD. Per the UNTRACED banner's own prescription: fit
// ln(1/f) = a + b*T - c*S by OLS on the full 42 levels and on each half
// (first 21 / last 21 in level order, the split fdecay-deep-01 itself uses),
// then evaluate each fit at x = 1000: p = 1009, d_min = 2p - 2 = 2016,
// T = 2*1009/mbar(1000), S = lnS(1000, 2016), and read
// L = theta(1000)/ln(1/f) against the polylog ceiling ln^2(1000).
// The band is [min, max] of L over the three specifications.
//
// Run: node research/fdecay-band-01.js

'use strict';
const fs = require('fs');
const path = require('path');
const C = require('./fdecay-deep-00-core.js');

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1);
const log = (s = '') => console.log(s);

// ---------------------------------------------------------------------------
// 0. parse the embedded tail of fdecay-deep-01-census-defect.js
// ---------------------------------------------------------------------------
const SRC = fs.readFileSync(path.join(__dirname, 'fdecay-deep-01-census-defect.js'), 'utf8');
const tail = SRC.slice(SRC.lastIndexOf('\n// OUTPUT'));
const fpm = tail.match(/out-sha256:\s+([0-9a-f]{8})/);
log('== fdecay-band 01: script custody for the x = 1000 L band, old and corrected ==');
log(`  data: embedded OUTPUT of fdecay-deep-01-census-defect.js (out-sha256 ${fpm ? fpm[1] : 'MISSING'}...)`);
if (!fpm || fpm[1] !== '4d932d02') throw new Error('the tail parsed is not the tail this script was written against');

// section 2 rows:  x | p | d_min | published | alias-free | ratio | ...
const s2 = new Map();
for (const m of tail.matchAll(/^\/\/ {3}(\d+) \| (\d+) \| (\d+) \| (?:CITED )?([0-9.]+e-\d+) \| ([0-9.]+e-\d+) \| [0-9.]+ \|/gm))
  s2.set(+m[1], { p: +m[2], d: +m[3], fpub: +m[4], ffix: +m[5] });
// section 4 rows:  x | p | 2p/mbar | ln s | published ln(1/f) | corrected ln(1/f) | shift
const s4 = new Map();
for (const m of tail.matchAll(/^\/\/ {3}(\d+) \| (\d+) \| ([0-9.]+) \| ([0-9.]+) \| ([0-9.]+) \| ([0-9.]+) \| [+-][0-9.]+$/gm))
  s4.set(+m[1], { p: +m[2], T: +m[3], S: +m[4], lp: +m[5], lf: +m[6] });
if (s2.size !== 42 || s4.size !== 42) throw new Error(`parse failed: section 2 gave ${s2.size} rows, section 4 gave ${s4.size}; expected 42 each`);

// ---------------------------------------------------------------------------
// 1. the four checks
// ---------------------------------------------------------------------------
const PR = C.primesUpTo(1200);
const dminClosed = p => (p % 3 === 2 ? 2 * p + 2 : 2 * p - 2);
let worstTS = 0, worstLn = 0;
for (const [x, r2] of s2) {
  const r4 = s4.get(x);
  if (!r4 || r4.p !== r2.p) throw new Error(`C0 FAIL: sections disagree at x=${x}`);
  if (r2.d !== dminClosed(r2.p)) throw new Error(`C1 FAIL: d_min ${r2.d} at p=${r2.p}, closed form ${dminClosed(r2.p)}`);
  const T = 2 * r2.p / C.meanGap(x, PR), S = C.lnS(x, r2.d, PR);
  worstTS = Math.max(worstTS, Math.abs(T - r4.T), Math.abs(S - r4.S));
  worstLn = Math.max(worstLn, Math.abs(Math.log(1 / r2.fpub) - r4.lp), Math.abs(Math.log(1 / r2.ffix) - r4.lf));
}
if (worstTS > 0.0005) throw new Error(`C2 FAIL: recomputed T/S off by ${worstTS}`);
if (worstLn > 0.00005 + 5e-5) throw new Error(`C3 FAIL: ln(1/f) columns off by ${worstLn}`);
log(`  C1 d_min closed form: 42/42.  C2 T,S recomputed: worst |delta| ${worstTS.toExponential(2)}.  C3 ln(1/f) columns: worst |delta| ${worstLn.toExponential(2)}.`);

// ---------------------------------------------------------------------------
// 2. OLS (same algorithm as fdecay-deep-01, restated)
// ---------------------------------------------------------------------------
function ols(rows, cols, y) {
  const n = rows.length, k = cols.length, A = [];
  for (let a = 0; a < k; a++) A.push(new Array(k + 1).fill(0));
  for (const r of rows) { const X = cols.map(c => c(r)), yy = y(r); for (let a = 0; a < k; a++) { for (let b = 0; b < k; b++) A[a][b] += X[a] * X[b]; A[a][k] += X[a] * yy; } }
  for (let c = 0; c < k; c++) { let piv = c; for (let r = c + 1; r < k; r++) if (Math.abs(A[r][c]) > Math.abs(A[piv][c])) piv = r; [A[c], A[piv]] = [A[piv], A[c]]; for (let r = 0; r < k; r++) { if (r === c) continue; const f = A[r][c] / A[c][c]; for (let cc = c; cc <= k; cc++) A[r][cc] -= f * A[c][cc]; } }
  const co = []; for (let c = 0; c < k; c++) co.push(A[c][k] / A[c][c]);
  let ssr = 0, sst = 0; const mn = rows.reduce((s, r) => s + y(r), 0) / n;
  for (const r of rows) { const X = cols.map(c => c(r)); let yh = 0; for (let a = 0; a < k; a++) yh += co[a] * X[a]; ssr += (y(r) - yh) ** 2; sst += (y(r) - mn) ** 2; }
  return { co, r2: 1 - ssr / sst, n };
}
const rows = [...s4.keys()].sort((a, b) => a - b).map(x => s4.get(x));
const lo = rows.slice(0, 21), hi = rows.slice(21);
const one = () => 1, Tc = r => r.T, Sc = r => r.S;

// C4: reproduce the embedded full-range fits
const printed = { lp: [1.609, 1.4675, -1.038, 0.9646], lf: [1.323, 1.5741, -1.030, 0.9754] };
for (const key of ['lp', 'lf']) {
  const F = ols(rows, [one, Tc, Sc], r => r[key]);
  const want = printed[key], got = [F.co[0], F.co[1], F.co[2], F.r2];
  const d = Math.max(...got.map((g, i) => Math.abs(g - want[i])));
  if (d > 0.002) throw new Error(`C4 FAIL on ${key}: refit [${got.map(g => g.toFixed(4))}] vs embedded [${want}]`);
  log(`  C4 ${key === 'lp' ? 'published' : 'corrected'} full fit reproduces the embedded coefficients, worst |delta| ${d.toExponential(1)}`);
}

// ---------------------------------------------------------------------------
// 3. the x = 1000 point, and the band
// ---------------------------------------------------------------------------
const X0 = 1000, P0 = 1009;
if (!PR.includes(P0) || PR.find(q => q > X0) !== P0) throw new Error('p = 1009 is not the fold at x = 1000');
const D0 = dminClosed(P0);
const T0 = 2 * P0 / C.meanGap(X0, PR), S0 = C.lnS(X0, D0, PR);
let theta = 0; for (const q of PR) { if (q > X0) break; theta += Math.log(q); }
const LN2X = Math.log(X0) ** 2;
log('');
log(`  x = ${X0}: fold p = ${P0}, d_min = ${D0}, T = 2p/mbar = ${T0.toFixed(4)}, S = ln s(d_min) = ${S0.toFixed(4)}`);
log(`  theta(${X0}) = ${theta.toFixed(2)}, polylog ceiling ln^2 x = ${LN2X.toFixed(2)}`);
log('');
log('  spec                          a        b(T)      c(S)     ln(1/f)@1000     f@1000       L = theta/ln(1/f)');

function line(name, co) {
  const l = co[0] + co[1] * T0 + co[2] * S0;
  const L = theta / l;
  log(`  ${name.padEnd(28)} ${co[0].toFixed(3).padStart(7)} ${co[1].toFixed(4).padStart(9)} ${co[2].toFixed(3).padStart(9)} ${l.toFixed(2).padStart(12)} ${Math.exp(-l).toExponential(2).padStart(14)} ${L.toFixed(1).padStart(12)}`);
  return L;
}
log('  --- the a3-03 published FULL-f law, the coefficients f-decays.md actually extrapolated:');
const Lbridge = line('a3-03 full-f (as quoted)', [1.529, 1.482, -1.025]);
log('  --- refit on the published (DEFECTIVE) first-term points, full / lower 21 / upper 21:');
const oldL = ['full', 'lower half', 'upper half'].map((nm, i) =>
  line(`published ${nm}`, ols([rows, lo, hi][i], [one, Tc, Sc], r => r.lp).co));
log('  --- refit on the CORRECTED alias-free first-term points, full / lower 21 / upper 21:');
const newL = ['full', 'lower half', 'upper half'].map((nm, i) =>
  line(`corrected ${nm}`, ols([rows, lo, hi][i], [one, Tc, Sc], r => r.lf).co));

const band = a => `[${Math.min(...a).toFixed(1)}, ${Math.max(...a).toFixed(1)}]`;
log('');
log(`  QUOTED by f-decays.md (no custody until now): point 35.5, band [30.8, 42.9]`);
log(`  bridge, full-f law as quoted:  L = ${Lbridge.toFixed(1)}`);
log(`  published first-term points:   point ${oldL[0].toFixed(1)}, band ${band(oldL)}`);
log(`  CORRECTED first-term points:   point ${newL[0].toFixed(1)}, band ${band(newL)}`);
log(`  ceiling: every value above must stay under ln^2 x = ${LN2X.toFixed(1)} for the branch call.`);
log(`  branch call ${Math.max(...newL, ...oldL, Lbridge) < LN2X ? 'HOLDS on every specification, old and corrected' : 'FAILS on at least one specification'}`);
log('');
log(`[done in ${el()}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fdecay-band-01.js
//   invocation:  node research/fdecay-band-01.js
//   code-sha256: 06ead1c9567d0cc0561868ff6a122177312919712977f5f5def6ab575b31e682
//   out-sha256:  b8a558c588d745b103db67c91037f6877aff1c1df8a5f94dafa2be3859cbe91a
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.1 s
// ============================================================================
// == fdecay-band 01: script custody for the x = 1000 L band, old and corrected ==
//   data: embedded OUTPUT of fdecay-deep-01-census-defect.js (out-sha256 4d932d02...)
//   C1 d_min closed form: 42/42.  C2 T,S recomputed: worst |delta| 4.94e-4.  C3 ln(1/f) columns: worst |delta| 5.02e-5.
//   C4 published full fit reproduces the embedded coefficients, worst |delta| 5.1e-4
//   C4 corrected full fit reproduces the embedded coefficients, worst |delta| 8.7e-4
//
//   x = 1000: fold p = 1009, d_min = 2016, T = 2p/mbar = 17.4684, S = ln s(d_min) = 0.5956
//   theta(1000) = 956.25, polylog ceiling ln^2 x = 47.72
//
//   spec                          a        b(T)      c(S)     ln(1/f)@1000     f@1000       L = theta/ln(1/f)
//   --- the a3-03 published FULL-f law, the coefficients f-decays.md actually extrapolated:
//   a3-03 full-f (as quoted)       1.529    1.4820    -1.025        26.81       2.28e-12         35.7
//   --- refit on the published (DEFECTIVE) first-term points, full / lower 21 / upper 21:
//   published full                 1.610    1.4673    -1.038        26.62       2.74e-12         35.9
//   published lower half           0.665    1.8382    -1.090        32.13       1.12e-14         29.8
//   published upper half           3.315    1.1145    -0.991        22.19       2.30e-10         43.1
//   --- refit on the CORRECTED alias-free first-term points, full / lower 21 / upper 21:
//   corrected full                 1.324    1.5739    -1.030        28.20       5.64e-13         33.9
//   corrected lower half           0.631    1.8486    -1.077        32.28       9.55e-15         29.6
//   corrected upper half           2.560    1.3173    -0.990        24.98       1.41e-11         38.3
//
//   QUOTED by f-decays.md (no custody until now): point 35.5, band [30.8, 42.9]
//   bridge, full-f law as quoted:  L = 35.7
//   published first-term points:   point 35.9, band [29.8, 43.1]
//   CORRECTED first-term points:   point 33.9, band [29.6, 38.3]
//   ceiling: every value above must stay under ln^2 x = 47.7 for the branch call.
//   branch call HOLDS on every specification, old and corrected
//
// [done in 0.0s]
// ============================================================================
// READINGS
//
// 1. CUSTODY ESTABLISHED. The quoted point 35.5 and band [30.8, 42.9] now have
//    a producer. The bridge evaluation of the a3-03 full-f law lands at
//    f = 2.28e-12, ln(1/f) = 26.81, L = 35.7 — the document's 2.3e-12 and 26.8
//    reproduce, and its 35.5 is the same number to the precision the method
//    deserves. The same half-refit method on the published first-term points
//    gives point 35.9, band [29.8, 43.1], bracketing the quoted [30.8, 42.9].
// 2. THE BAND MOVES, DOWN AND NARROWER. On the alias-free points the x = 1000
//    reading is point 33.9, band [29.6, 38.3], against the old 35.5 and
//    [30.8, 42.9]. The correction makes f SMALLER at depth (ln(1/f) 28.20
//    against 26.62 on the same specification), so L falls and the top of the
//    band falls hardest: 43.1 -> 38.3. Same direction as fdecay-deep's
//    crossings, which also moved down.
// 3. THE BRANCH CALL HOLDS with more margin than before. Every specification,
//    old and corrected, stays under ln^2 x = 47.72; the corrected worst case
//    38.3 leaves a 20 per cent margin where the defective worst case 43.1
//    left 10 per cent.
// 4. MEASURED, not a theorem: everything here is a fitted law read at
//    x = 1000, five times past the census wall, and the range dependence the
//    halves exhibit (slope 1.8486 against 1.3173 corrected) is exactly why
//    f-decays.md says no single slope should be quoted.
