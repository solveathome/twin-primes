// ============================================================================
// WINDOW EXCEPTIONS — how close to the edge each window family runs
// ============================================================================
// Chris, 2026-08-17: he dislikes the narrow windows because they have genuine
// exceptions, the (n^2, (n+1)^2) family failing twelve times and last at 122,
// while the full zone (p, p'^2) has no known failure at all.
//
// Logically a finite exception set is harmless: "for all n > 122" still implies
// TPC. So the objection has to be about something else, and it is. This file
// measures what.
//
// Three window families, same sieve:
//   A  (n^2, (n+1)^2)   width 2n+1     OEIS A091592
//   B  (n^2, (n+2)^2)   width 4n+4     the pane
//   C  (p, p'^2)        width ~p^2     the zone
//
// For each: the exceptions, the minimum twin count ever attained, where, and
// the Hardy-Littlewood expectation there. The expectation is the diagnostic:
// a family fails exactly while its expected count is O(1), and stops failing
// when the expectation clears a few units.
//
// Run:  node --max-old-space-size=6000 window-exceptions.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

const N = 1e8;
const C2x2 = 1.3203236316;                     // 2*C_2

log(`sieving primes to ${N.toExponential(0)} ...`);
const comp = new Uint8Array(N + 3);
comp[0] = comp[1] = 1;
for (let i = 2; i * i <= N + 2; i++) if (!comp[i]) for (let j = i * i; j <= N + 2; j += i) comp[j] = 1;

log('collecting twin lower members ...');
const tw = [];
for (let n = 3; n + 2 <= N; n++) if (!comp[n] && !comp[n + 2]) tw.push(n);
const TW = Int32Array.from(tw);
console.log('='.repeat(94));
console.log('WINDOW EXCEPTIONS — how close to the edge each window family runs');
console.log('='.repeat(94));
console.log(`   CUSTODY: twin pairs with lower member below 1e8 = ${TW.length.toLocaleString()}  (known: 440,312)  ` +
  (TW.length === 440312 ? 'MATCH' : 'CHECK'));

// count twin pairs (q, q+2) fully inside (lo, hi): lo < q and q+2 < hi
function countIn(lo, hi) {
  // first index with TW[i] > lo
  let a = 0, b = TW.length;
  while (a < b) { const m = (a + b) >> 1; if (TW[m] > lo) b = m; else a = m + 1; }
  const start = a;
  // first index with TW[i] + 2 >= hi
  a = 0; b = TW.length;
  while (a < b) { const m = (a + b) >> 1; if (TW[m] + 2 >= hi) b = m; else a = m + 1; }
  return b - start;
}
// Hardy-Littlewood expectation for the window
const hl = (lo, hi) => C2x2 * (hi - lo) / (Math.log(Math.max(hi, 3)) ** 2);

function family(name, items, note) {
  const exc = [], rows = [];
  let minC = Infinity, minAt = null, minHL = null;
  for (const { key, lo, hi } of items) {
    const c = countIn(lo, hi);
    if (c === 0) exc.push(key);
    if (c < minC) { minC = c; minAt = key; minHL = hl(lo, hi); }
    rows.push({ key, lo, hi, c, e: hl(lo, hi) });
  }
  console.log('');
  console.log(`${name}   ${note}`);
  console.log('-'.repeat(94));
  console.log(`   windows tested: ${items.length.toLocaleString()},  top of range: ${items[items.length - 1].hi.toExponential(2)}`);
  console.log(`   EXCEPTIONS (zero twins): ${exc.length === 0 ? 'NONE' : exc.length + ' -> ' + exc.join(', ')}`);
  if (exc.length) console.log(`   last exception at ${exc[exc.length - 1]}`);
  console.log(`   minimum twin count ever: ${minC} at ${minAt},  HL expectation there = ${minHL.toFixed(2)}`);
  // how the floor moves: minimum count and minimum expectation in dyadic bands of the window top
  console.log('   band of window top | windows |  min count |  min HL expectation | min count/HL');
  let lo = 100;
  while (lo < items[items.length - 1].hi) {
    const hi = lo * 100;
    const sub = rows.filter((r) => r.hi >= lo && r.hi < hi);
    if (sub.length) {
      const mc = Math.min(...sub.map((r) => r.c));
      const me = Math.min(...sub.map((r) => r.e));
      const mr = Math.min(...sub.map((r) => r.c / r.e));
      console.log(`   ${lo.toExponential(0).padStart(8)} - ${hi.toExponential(0).padStart(8)} | ${String(sub.length).padStart(7)} | ` +
        `${String(mc).padStart(10)} | ${me.toFixed(2).padStart(19)} | ${mr.toFixed(3).padStart(12)}`);
    }
    lo = hi;
  }
  return { exc, minC, minAt };
}

// --- family A: (n^2, (n+1)^2) -----------------------------------------------
{
  const items = [];
  for (let n = 1; (n + 1) * (n + 1) <= N; n++) items.push({ key: n, lo: n * n, hi: (n + 1) * (n + 1) });
  family('A. (n^2, (n+1)^2)   width 2n+1', items, 'OEIS A091592');
}

// --- family B: the pane (n^2, (n+2)^2) --------------------------------------
{
  const items = [];
  for (let n = 1; (n + 2) * (n + 2) <= N; n++) items.push({ key: n, lo: n * n, hi: (n + 2) * (n + 2) });
  family('B. (n^2, (n+2)^2)   width 4n+4', items, 'the pane');
}

// --- family C: the zone (p, p\'^2) -------------------------------------------
{
  const ps = [];
  for (let i = 2; i * i <= N; i++) if (!comp[i]) ps.push(i);
  const items = [];
  for (let i = 0; i + 1 < ps.length; i++) {
    const p = ps[i], q = ps[i + 1];
    if (q * q > N) break;
    items.push({ key: p, lo: p, hi: q * q });
  }
  family('C. (p, p\'^2)        width ~p^2', items, 'the zone');
}

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/window-exceptions.js
//   invocation:  node research/window-exceptions.js
//   code-sha256: ef2090de10d4cb6b429744b420fecd9ee75480beaa5b41f6f885278f2726b4fc
//   out-sha256:  b590680e83695b082d1a2e9a2c4e9faf8b340c657f1212af1707512766476aee
//   body-lines:  38
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     0.6 s
// ============================================================================
// ==============================================================================================
// WINDOW EXCEPTIONS — how close to the edge each window family runs
// ==============================================================================================
//    CUSTODY: twin pairs with lower member below 1e8 = 440,312  (known: 440,312)  MATCH
//
// A. (n^2, (n+1)^2)   width 2n+1   OEIS A091592
// ----------------------------------------------------------------------------------------------
//    windows tested: 9,999,  top of range: 1.00e+8
//    EXCEPTIONS (zero twins): 12 -> 1, 9, 19, 26, 27, 30, 34, 39, 49, 53, 77, 122
//    last exception at 122
//    minimum twin count ever: 0 at 1,  HL expectation there = 2.06
//    band of window top | windows |  min count |  min HL expectation | min count/HL
//        1e+2 -     1e+4 |      90 |          0 |                1.18 |        0.000
//        1e+4 -     1e+6 |     900 |          0 |                3.10 |        0.000
//        1e+6 -     1e+8 |    9000 |          7 |               13.83 |        0.471
//
// B. (n^2, (n+2)^2)   width 4n+4   the pane
// ----------------------------------------------------------------------------------------------
//    windows tested: 9,998,  top of range: 1.00e+8
//    EXCEPTIONS (zero twins): 1 -> 26
//    last exception at 26
//    minimum twin count ever: 0 at 26,  HL expectation there = 3.21
//    band of window top | windows |  min count |  min HL expectation | min count/HL
//        1e+2 -     1e+4 |      90 |          0 |                2.24 |        0.000
//        1e+4 -     1e+6 |     900 |          1 |                6.16 |        0.144
//        1e+6 -     1e+8 |    9000 |         17 |               27.64 |        0.575
//
// C. (p, p'^2)        width ~p^2   the zone
// ----------------------------------------------------------------------------------------------
//    windows tested: 1,228,  top of range: 9.95e+7
//    EXCEPTIONS (zero twins): NONE
//    minimum twin count ever: 2 at 2,  HL expectation there = 1.91
//    band of window top | windows |  min count |  min HL expectation | min count/HL
//        1e+2 -     1e+4 |      21 |          8 |                6.54 |        1.135
//        1e+4 -     1e+6 |     143 |        202 |              156.58 |        1.176
//        1e+6 -     1e+8 |    1061 |       8278 |             7017.42 |        1.131
//
//    done in 0.5s
// ============================================================================
// READINGS
// ============================================================================
