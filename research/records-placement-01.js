// ============================================================================
// RECORDS PLACEMENT 01 — THE SEVEN UNSWEPT RECORDS (76..82, STARTS ABOVE
// 2^53) PLACED INSIDE THEIR STRETCHES, SCORED AGAINST THE SEALED PREREG
// ============================================================================
// THE QUESTION (TODO item Z6; stretch-01 §5's cheapest falsifiable probe;
// prereg SEALED ALONE at research/history/staging/records-placement-prereg.md,
// commit 11de808, BEFORE this file existed). stretch-01 SEC C3 measured the
// record process square-blind over records 1..75 (mean placement fraction
// 0.479 vs null 0.5) but stopped at the 2^53 cutoff. Records 76..82 (starts
// 1.29e16 .. 7.05e16) were never placed. This producer computes their
// placement fractions f = (F - q^2)/(q'^2 - q^2), q the largest prime with
// q^2 <= F, in BigInt where needed, and scores the prereg's three sealed
// readings: READ-1 mean-of-7 band [0.282, 0.718]; READ-2 outer-decile count
// >= 4 flags clustering; READ-3 pooled 82-record mean band [0.436, 0.564].
//
// DATA (adopted, series rule): research/a113274-gap-records.js — A113274
// gaps + A113275 starts, b-file 2026-08-20, single-witness tails trusted
// during research; record 41 = 8040 at 65,095,731,749 is the in-house
// custody anchor. The GAP/START arrays are EXTRACTED FROM THAT FILE'S
// SOURCE AT RUNTIME — never transcribed. (A first draft transcribed them
// and mistyped record 45's start; the calibration gate caught it against
// stretch-01's cited 0.479. The two-document wrong constant is the QC
// framework's named biggest unguarded class; extraction removes the
// channel.) Guards re-run here: 82 terms, gaps increasing, starts
// increasing, gaps 0 mod 6 past n=1, PLUS a cross-check of records 1..75
// against the sha-checked TOS table, the independent second witness.
//
// WIDTH AUDIT (the level this RUNS at): starts to 7.05e16 > 2^53 — ALL
// position arithmetic (F, q^2, q'^2, comparisons) is BigInt. q = isqrt(F)
// <= 2.66e8 fits Number exactly; widths q'^2 - q^2 = (q'-q)(q'+q) <= ~1e11
// fit Number exactly (< 2^53); fractions are Number divisions of exact
// Numbers. Primality at q ~ 2.66e8 by trial division over sieved primes to
// 16,400 (sqrt(2.66e8) = 16,310). No typed-array value exceeds 2^31; no
// bit shifts.
//
// Exact counting + placement only; NO first-moment TPC claim (Route B
// CLOSED; rho(2) ADVERSE). Results HELD for the EOD roundup.
//
// PRIOR ART ON DISK: research/a113274-gap-records.js (the ladder + guards);
// research/history/staging/stretch-01.md §4-5 (SEC C3's 75-record result,
// cited as the calibration target); records-placement-prereg.md (11de808).
// ============================================================================
'use strict';
const T0 = Date.now();

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function f3(x) { return x.toFixed(3); }
function f4(x) { return x.toFixed(4); }

// A113274 / A113275 extracted at runtime from the adopted producer's source:
const fs = require('fs'), crypto = require('crypto');
const ladderSrc = fs.readFileSync('research/a113274-gap-records.js', 'utf8');
function extractArray(name) {
  const m = ladderSrc.match(new RegExp(name + String.raw` = \[([\s\S]*?)\];`));
  if (!m) throw new Error('array ' + name + ' not found in ladder source');
  return m[1].match(/\d+/g).map(BigInt);
}
const GAP = extractArray('GAP'), START = extractArray('START');
assertEq('82 gaps', GAP.length, 82); assertEq('82 starts', START.length, 82);
{
  let ok = true;
  for (let i = 1; i < 82; i++) {
    if (GAP[i] % 6n !== 0n || GAP[i] <= GAP[i - 1] || START[i] <= START[i - 1]) ok = false;
  }
  assertTrue('ladder guards (mod 6, both series increasing)', ok);
}
// independent second witness: records 1..75 must equal the sha-checked TOS
// table's starred rows (start values), byte-parsed here
{
  const tosBytes = fs.readFileSync('research/tos-twin-gaps-1e16.txt');
  const tosSha = crypto.createHash('sha256').update(tosBytes).digest('hex');
  assertTrue('TOS sha256 prefix 78767cadd001b1b0', tosSha.startsWith('78767cadd001b1b0'));
  const tosF = [];
  for (const line of tosBytes.toString('utf8').split('\n')) {
    const m = line.match(/^\s*(\d+)(\*?)\s+(\d+)(\*?)\s+(\d+)\s*$/);
    if (m && m[2] === '*') tosF.push(BigInt(m[3]));
  }
  assertEq('TOS starred rows', tosF.length, 75);
  let ok = true;
  for (let i = 0; i < 75; i++) if (tosF[i] !== START[i]) { ok = false; console.log(`  TOS/ladder mismatch at record ${i + 1}`); }
  assertTrue('records 1..75 starts equal the TOS starred rows (second witness)', ok);
}

// ---------- toolbox ----------
const PSMALL = 16400;                       // covers sqrt(2.66e8)
const flag = new Uint8Array(PSMALL + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PSMALL; p++) if (!flag[p]) for (let m = p * p; m <= PSMALL; m += p) flag[m] = 1;
const SP = []; for (let n = 2; n <= PSMALL; n++) if (!flag[n]) SP.push(n);
function isPrimeN(n) {                       // n <= ~2.7e8
  if (n < 2) return false;
  for (const p of SP) { if (p * p > n) break; if (n % p === 0) return n === p; }
  return true;
}
function isqrtBig(F) {                       // floor sqrt, exact, BigInt in
  let x = BigInt(Math.floor(Math.sqrt(Number(F))));
  while (x * x > F) x--;
  while ((x + 1n) * (x + 1n) <= F) x++;
  return Number(x);                          // <= 2.66e8, exact in Number
}
function placement(F) {
  const s = isqrtBig(F);
  // stretch-01 SEC C3's exact convention: the descent stops at 2 and may
  // rest at q = 1 for the degenerate pre-wheel records (record 1 only)
  let q = s; while (q >= 2 && !isPrimeN(q)) q--;
  let qp = q + 1; while (!isPrimeN(qp)) qp++;
  const qB = BigInt(q), qpB = BigInt(qp);
  assertTrue(`q^2 <= F < q'^2 at F=${F}`, qB * qB <= F && F < qpB * qpB);
  const off = Number(F - qB * qB);           // < width <= ~1e11 < 2^53, exact
  const width = (qp - q) * (qp + q);         // exact in Number
  const f = off / width;
  assertTrue(`fraction in [0,1) at F=${F}`, f >= 0 && f < 1);
  return { q, qp, width, f };
}

// ============================================================================
console.log('SEC 0 — CALIBRATION (abort on any mismatch)');
// ============================================================================
assertEq('custody anchor: record 41 gap', GAP[40], 8040n);
assertEq('custody anchor: record 41 start', START[40], 65095731749n);
{
  const c = 2n ** 53n;
  let ok = true; for (let i = 75; i < 82; i++) if (START[i] <= c) ok = false;
  assertTrue('records 76..82 all start above 2^53 (the unswept premise)', ok);
  ok = true; for (let i = 0; i < 75; i++) if (START[i] > c) ok = false;
  assertTrue('records 1..75 all start below 2^53', ok);
}
// reproduce stretch-01 §4's cited 75-record mean placement fraction 0.479
const f75 = [];
for (let i = 0; i < 75; i++) f75.push(placement(START[i]).f);
const mean75 = f75.reduce((s, x) => s + x, 0) / 75;
assertEq('stretch-01 §4 cited mean over records 1..75', f3(mean75), '0.479');
console.log(`  75-record mean placement fraction ${f4(mean75)} reproduces the cited 0.479; all guards pass`);

// ============================================================================
console.log('\nSEC 1 — THE SEVEN FRESH POINTS');
// ============================================================================
const fresh = [];
console.log('   n       start F              q          q\'         width       fraction');
for (let i = 75; i < 82; i++) {
  const P = placement(START[i]);
  fresh.push(P.f);
  console.log(`  ${i + 1}  ${String(START[i]).padStart(18)}  ${String(P.q).padStart(10)} ${String(P.qp).padStart(10)}  ${String(P.width).padStart(12)}  ${f4(P.f).padStart(9)}`);
}

// ============================================================================
console.log('\nSEC 2 — PREREG SCORING (records-placement-prereg.md, sealed 11de808)');
// ============================================================================
{
  const mean7 = fresh.reduce((s, x) => s + x, 0) / 7;
  const inMean = mean7 >= 0.282 && mean7 <= 0.718;
  console.log(`  READ-1 (mean of 7): ${f4(mean7)}  band [0.282, 0.718]  =>  ${inMean ? 'no shift' : 'MEAN-SHIFT FLAGS'}`);
  const lowD = fresh.filter(f => f < 0.1).length, highD = fresh.filter(f => f >= 0.9).length;
  const outer = lowD + highD;
  console.log(`  READ-2 (outer deciles): ${outer} of 7 (low ${lowD}, high ${highD}; null expectation 1.4)  =>  ${outer >= 4 ? 'CLUSTERING FLAGS' : 'no clustering'}`);
  const all = f75.concat(fresh);
  const mean82 = all.reduce((s, x) => s + x, 0) / 82;
  const inPool = mean82 >= 0.436 && mean82 <= 0.564;
  console.log(`  READ-3 (pooled 82): ${f4(mean82)}  band [0.436, 0.564]  =>  ${inPool ? 'inside' : 'OUTSIDE'}`);
  console.log(`  verdict per the sealed rules: ${inMean && outer < 4 && inPool ? 'UNIFORM-CONSISTENT — the square-blindness measurement closes its fourth decade (heights to 7.05e16)' : 'a sealed flag fired — see above'}`);
}

// ============================================================================
console.log('\nSEC 3 — DESCRIPTIVE ONLY (registered as unscored)');
// ============================================================================
// prime-square containment: does [F, F+gap] contain a prime square?
{
  let count = 0; let expect = 0;
  for (let i = 75; i < 82; i++) {
    const F = START[i], top = F + GAP[i];
    const s0 = isqrtBig(F), s1 = isqrtBig(top);
    let has = false;
    for (let s = s0; s <= s1; s++) if (BigInt(s) * BigInt(s) >= F && BigInt(s) * BigInt(s) <= top && isPrimeN(s)) has = true;
    if (has) count++;
    // null expectation: gap / (prime-square spacing ~ 2 sqrt(F) ln sqrt(F))
    expect += Number(GAP[i]) / (2 * Math.sqrt(Number(F)) * Math.log(Math.sqrt(Number(F))));
  }
  console.log(`  prime-square containment, records 76..82: ${count} observed, null expectation ${expect.toExponential(2)} (no power at these heights; not scored)`);
}

console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/records-placement-01.js
//   invocation:  node research/records-placement-01.js
//   code-sha256: 262d437f27f9fbf98817bf28d4fd977a43abae702923e2fb07e50c028152e97c
//   out-sha256:  efc3d7f7e68245ec23e2e587991a589e8ecf1ef951460096d719b201ca2e62dc
//   body-lines:  24
//   inputs:      research/a113274-gap-records.js@b64796044e4b research/tos-twin-gaps-1e16.txt@78767cadd001
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-22
//   elapsed:     0.1 s
// ============================================================================
// SEC 0 — CALIBRATION (abort on any mismatch)
//   75-record mean placement fraction 0.4790 reproduces the cited 0.479; all guards pass
//
// SEC 1 — THE SEVEN FRESH POINTS
//    n       start F              q          q'         width       fraction
//   76   12914226879316517   113640757  113640803   10454951760     0.5000
//   77   16155559543324757   127104511  127104533    5592598968     0.5054
//   78   37338553629118097   193231861  193231873    4637564808     0.3285
//   79   37962553054417547   194839793  194839823   11690388480     0.6944
//   80   38617975949216087   196514569  196514573    1572116568     0.0763
//   81   52000545890760149   228036257  228036287   13682176320     0.8320
//   82   70478530884377381   265477921  265477951   15928676160     0.2728
//
// SEC 2 — PREREG SCORING (records-placement-prereg.md, sealed 11de808)
//   READ-1 (mean of 7): 0.4585  band [0.282, 0.718]  =>  no shift
//   READ-2 (outer deciles): 1 of 7 (low 1, high 0; null expectation 1.4)  =>  no clustering
//   READ-3 (pooled 82): 0.4773  band [0.436, 0.564]  =>  inside
//   verdict per the sealed rules: UNIFORM-CONSISTENT — the square-blindness measurement closes its fourth decade (heights to 7.05e16)
//
// SEC 3 — DESCRIPTIVE ONLY (registered as unscored)
//   prime-square containment, records 76..82: 0 observed, null expectation 3.44e-5 (no power at these heights; not scored)
//
// done in 0.0s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// 1. THE SEALED VERDICT [MEASURED, scored against records-placement-prereg.md,
//    commit 11de808]: UNIFORM-CONSISTENT on all three registered readings.
//    READ-1: mean of the seven fresh fractions 0.4585, inside [0.282, 0.718].
//    READ-2: one point in the outer deciles (record 80 at 0.0763, low side)
//    against a null expectation of 1.4 — no clustering. READ-3: pooled
//    82-record mean 0.4773, inside [0.436, 0.564]. **The square-blindness
//    measurement closes its fourth decade (heights to 7.05e16):** the
//    record process shows no square-anchor coupling at any measured scale,
//    extending stretch-01 §4's verdict from 2.8e15 to 7.05e16.
// 2. CALIBRATION [VERIFIED]: the 75 swept records reproduce stretch-01's
//    cited mean 0.479 digit-for-digit on this producer's BigInt path; the
//    ladder guards pass; records 1..75 starts equal the sha-checked TOS
//    table's starred rows (the independent second witness); all seven new
//    starts exceed 2^53, confirming why they were unswept.
// 3. A DEFECT CAUGHT BY THE GATE, AND THE CHANNEL REMOVED [process]: the
//    first draft transcribed the ladder arrays and mistyped record 45's
//    start; the calibration gate failed against the cited 0.479 and the diff
//    located it. The producer now EXTRACTS the arrays from
//    a113274-gap-records.js source at runtime — the two-document wrong
//    constant (the QC framework's named biggest unguarded class) has no
//    channel here anymore.
// 4. NO CLAIM: seven points close a decade of measurement, nothing more;
//    the ladder tail is single-witness under the series rule; the
//    prime-square containment statistic has no power at these heights
//    (expectation 3.44e-5) and is reported unscored. Route B closed;
//    rho(2) adverse; no Z2 bound, no TPC content.
// ============================================================
// FIGURE PROVENANCE. The cited 0.479 / record-41 anchors are stretch-01// §4's and a113274-gap-records.js's, asserted in SEC 0; 2.8e15 is stretch-01
// §4's prior reach, cited. The GAP/START
// series are A113274/A113275 via the adopted producer's source (series
// rule); the TOS table is the sha-checked adopted copy. Every other
// figure is from this producer's own OUTPUT block.
// ============================================================
