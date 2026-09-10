// ============================================================================
// ZONEGAP 01 — Z2(p): THE LARGEST GAP BETWEEN CONSECUTIVE TWIN PAIRS IN THE
// ZONE (p, p'^2), MEASURED AT EVERY ZONE OF ONE SWEEP
// ============================================================================
// THE QUESTION (Chris, 2026-08-21). The zone (p, p'^2) is the one region
// where the tile's twin slots ARE twin primes (certification: a hole below
// p'^2 with no factor <= p is prime — ZONE-POSTULATE.md §1), and it is the
// onset shell: every prime q in (sqrt(p), p] has its first fresh kill q^2
// inside it (Chris's staircase, research/natal-onset-01.js). The Zone
// Postulate asks for one pair per zone; Z2(p) refines it to the zone's whole
// gap structure — a first-class object measurable from prime data alone,
// with thousands of levels where the tile ladder has 22. Framing is Chris's:
// the copy theorem gives the tile, the onset mechanism gives the zone, and
// the calibration line stands as before — the first-moment argument is
// closed (first-moment L is polylog; sofic + corrected census 2026-08-19/20)
// and THE MAX IS THE WALL: nothing here evades TPC-hardness, see READINGS.
//
// CONVENTIONS, stated once and used everywhere.
//   pair       (a, a+2), both prime; the pair is named by its OPENER a
//              (= "lesser", matching A113274/A113275 and Oliveira e Silva).
//   in zone p  p < a and a+2 < p'^2 (strict, the postulate's "below p'^2-2").
//   gap        difference of consecutive in-zone openers a_{i+1} - a_i
//              (lesser-to-lesser, the A113274 convention).
//   Z2(p)      max of those gaps; defined when the zone holds >= 2 pairs.
//   head       a_first - p; tail: p'^2 - a_last. Counted separately, never
//              inside Z2 (the boundary slacks are their own objects).
//   position   u = (gapStart - p)/(p'^2 - p), gapStart the opener STARTING
//              the earliest maximal gap; u in (0,1), 1 = the deep end.
//   height     a gap "lives at" its own scale s_end = gapStart + Z2 (the
//              opener ending it), which is where Kourbatov's ceiling reads.
//
// WIDTH AUDIT (range: X = 1e11 default-capable). All quantities <= p'^2 <=
// X < 2^53: exact in doubles. Segment indices < 2^22. Base primes to
// sqrt(X)+4000 ~ 3.2e5: int32-safe. No BigInt needed anywhere; asserted by
// X <= 4e15 guard below. Sieve marking strides p <= 3.2e5 over j <= X+2:
// double adds, exact (integers < 2^53).
//
// PRIOR ART ON DISK (cited, extended, not re-derived):
//   - research/ZONE-POSTULATE.md — the postulate, the 1e11 exhaustive check
//     (window-check.js, 599 s), the 0.76 ln^3 p guard; this file reuses the
//     segmented-sieve approach of research/window-check.js and extends the
//     per-zone measurement from "first twin" to the full gap structure.
//   - research/maxgap-law.md §8 — M(x, x^2)/ln^3 x flat at 3.2-3.7 on seven
//     levels 211..9973; Z2(p) is the same object at window (p, p'^2), swept
//     at EVERY level; §8's seven levels are cross-checked here in-pass.
//   - research/a113274-gap-records.js — the adopted 82-record ladder; its
//     first 41 records (p_end <= 1e11) are inlined below as trusted data.
//   - research/tos-twin-gaps-1e16.txt — ADOPTED THIS PASS under the series
//     rule: Tomás Oliveira e Silva, "Gaps between twin primes", exhaustive
//     first-occurrence table F(g), T(g) to 1e16 (sweet.ua.pt/tos/
//     twin_gaps.html, table dated 2013-08-05, page 2015-12-28;
//     sha256 78767cad...). Transcription guards below; his 75 record-starred
//     rows must equal A113274 records 1..75 or trust is VOID. (The brief
//     said "Nicely's twin-gap tables": trnicely.net carries first-occurrence
//     PRIME gaps and twin COUNTS only — verified against the archived site;
//     the twin-gap first-occurrence table is Oliveira e Silva's.)
//   - research/G2-STATE.md §2 — the exact G2(x#) ladder inlined for the
//     shared-level comparison (values 2..43 computed in-house).
//   - research/REFUTED.md — Route B (origin density advantage) is CLOSED;
//     nothing here argues from density advantage. The zone frame's value is
//     data volume + a classical object with literature, not a new route.
//
// ENGINE. One segmented sieve to X (odd-only marking). Twin pairs stream in
// ascending order; zones close at p'^2 boundaries; the in-zone max gap is a
// sliding-window maximum kept by a monotonic deque (both window ends are
// non-decreasing in p), so the whole sweep is one pass, O(#pairs) deque work.
// An independent brute-force engine recomputes every zone below 1e6 and the
// stream must match it exactly before anything else is printed.
//
// Usage:  node research/zonegap-01.js [X] [extraBands]   default X = 1e10
//   extraBands (2026-08-29, added because the sealed 1e12 preregistration
//   names a band this table could not print): a comma-separated list of
//   EXTRA band intervals `lo:hi`, half-open [lo, hi), appended to the
//   standard decade bands and named X1, X2, ... with a legend line under
//   the table. The standard bands, their order, their names and every other
//   line of output are untouched, and the argument DEFAULTS TO EMPTY, so
//   `node research/zonegap-01.js 1e11` reproduces this file's embedded 1e11
//   OUTPUT byte for byte (verified by re-embedding, 2026-08-29). Extra
//   bands are additive only: they never enter the ln^2*lnln drift line,
//   which still reads the last STANDARD band.
// ============================================================================
'use strict';
const fs = require('fs');
const path = require('path');
const t0 = Date.now();

const X = Number(process.argv[2] || 1e10);
if (!(X >= 1e6 && X <= 4e15)) { console.error('X out of audited range [1e6, 4e15]'); process.exit(1); }

// EXTRA BANDS (argv[3], default none). Parsed here so a bad spec dies before
// the sweep, not after it.
const EXTRA_BANDS = String(process.argv[3] || '').split(',').map(s => s.trim()).filter(s => s.length)
  .map((spec, i) => {
    const m = /^([0-9.eE+]+):([0-9.eE+]+)$/.exec(spec);
    if (!m) { console.error('bad extra band spec ' + spec + ' (want lo:hi)'); process.exit(1); }
    const lo = Number(m[1]), hi = Number(m[2]);
    if (!(lo > 0 && hi > lo)) { console.error('bad extra band interval ' + spec); process.exit(1); }
    return [lo, hi, 'X' + (i + 1), true];
  });

const C2 = 0.6601618158468696;                 // Hardy-Littlewood twin constant (OUR notation)
const log = (s) => console.log(s);
const err = (s) => process.stderr.write(s + '\n');
const fail = (s) => { console.log('FAIL: ' + s); process.exit(1); };

// ----------------------------------------------------------------------------
// TRUSTED DATA 1 — A113274/A113275 records with p_end <= 1e11 (41 records),
// transcribed from research/a113274-gap-records.js (adopted 2026-08-20; its
// own guards: mod 6, monotone, first 21 sieve-recomputed, in-house extreme
// = record 41). Numbers < 2^53, kept as plain numbers.
// ----------------------------------------------------------------------------
const REC_GAP = [2, 6, 12, 18, 30, 36, 72, 150, 168, 210, 282, 372, 498, 630,
  924, 930, 1008, 1452, 1512, 1530, 1722, 1902, 2190, 2256, 2832, 2868, 3012,
  3102, 3180, 3480, 3804, 4770, 5292, 6030, 6282, 6474, 6552, 6648, 7050,
  7980, 8040];
const REC_START = [3, 5, 17, 41, 71, 311, 347, 659, 2381, 5879, 13397, 18539,
  24419, 62297, 187907, 687521, 688451, 850349, 2868959, 4869911, 9923987,
  14656517, 17382479, 30752231, 32822369, 96894041, 136283429, 234966929,
  248641037, 255949949, 390817727, 698542487, 2466641069, 4289385521,
  19181736269, 24215097497, 24857578817, 40253418059, 42441715487,
  43725662621, 65095731749];

// TRUSTED DATA 2 — the exact G2(x#) ladder, G2-STATE.md §2 (in-house, exact).
const G2_LADDER = [[2, 2], [3, 6], [5, 12], [7, 30], [11, 42], [13, 66],
  [17, 108], [19, 150], [23, 204], [29, 258], [31, 348], [37, 528],
  [41, 546], [43, 618]];

// maxgap-law.md §8 cross-check levels: x -> M(x, x^2) measured there.
const MAXGAP_LAW_S8 = [[211, 498], [401, 630], [797, 924], [1601, 1452],
  [3203, 1722], [6421, 2832], [9973, 2868]];

// ----------------------------------------------------------------------------
// TRUSTED DATA 3 — Oliveira e Silva's first-occurrence table, adopted with
// transcription guards. Rows "g[*] F[*] T"; a * on g marks a record-holder
// gap (his definition: F(u) > F(g) for all u > g), which must reproduce
// A113274 exactly on the shared range or the adoption is VOID.
// ----------------------------------------------------------------------------
function loadTOS() {
  const file = path.join(__dirname, 'tos-twin-gaps-1e16.txt');
  const txt = fs.readFileSync(file, 'utf8');
  const rows = [];
  for (const line of txt.split('\n')) {
    const m = line.match(/^\s*(\d+)(\*?)\s+(\d+)\*?\s+(\d+)\s*$/);
    if (m) rows.push({ g: Number(m[1]), star: m[2] === '*', F: Number(m[3]), T: Number(m[4]) });
  }
  if (rows.length < 3000) fail('TOS parse: only ' + rows.length + ' rows');
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (i > 0 && r.g <= rows[i - 1].g) fail('TOS g not increasing at row ' + i);
    if (r.g !== 2 && r.g % 6 !== 0) fail('TOS g=' + r.g + ' not 2 and not 0 mod 6');
    if (r.F > 1e16 || r.F < 3) fail('TOS F out of range: ' + r.F);
  }
  const starred = rows.filter(r => r.star);
  if (starred.length !== 75) fail('TOS starred count ' + starred.length + ' != 75');
  // A113274 cross-check on the shared prefix (records 1..41 inlined here):
  for (let i = 0; i < REC_GAP.length; i++) {
    if (starred[i].g !== REC_GAP[i] || starred[i].F !== REC_START[i])
      fail('TOS record ' + (i + 1) + ' (' + starred[i].g + '@' + starred[i].F +
        ') != A113274 (' + REC_GAP[i] + '@' + REC_START[i] + ')');
  }
  // beyond our inline prefix his ladder must stay monotone in F:
  for (let i = 1; i < starred.length; i++)
    if (starred[i].F <= starred[i - 1].F) fail('TOS starred F not increasing at ' + i);
  return rows;
}
const TOS = loadTOS();
const TOS_BY_G = new Map(TOS.map(r => [r.g, r]));

// ----------------------------------------------------------------------------
// Base sieve: primes to sqrt(X) + 4000 (need p' one past sqrt(X)).
// ----------------------------------------------------------------------------
const LIM = Math.floor(Math.sqrt(X)) + 4000;
const small = new Uint8Array(LIM + 1);
const basePrimes = [];
for (let i = 2; i <= LIM; i++) {
  if (!small[i]) { basePrimes.push(i); for (let j = i * i; j <= LIM; j += i) small[j] = 1; }
}
const oddBase = basePrimes.filter(p => p > 2);

// Zones: (p, p'^2] for consecutive primes with p'^2 <= X.
const zones = [];
for (let i = 0; i + 1 < basePrimes.length; i++) {
  const p = basePrimes[i], pn = basePrimes[i + 1], bound = pn * pn;
  if (bound > X) break;
  zones.push({ p, pn, bound });
}
if (!zones.length) fail('no zones under X');

// ----------------------------------------------------------------------------
// Streaming state
// ----------------------------------------------------------------------------
let prevA = 0;                     // opener of the last pair seen
let pairCount = 0;                 // pairs seen so far
let nPairsTotal = 0;
// small openers (everything a zone boundary can ever need): opener + global idx
const SMALL_CAP = LIM + 200000;
const smallOpen = [], smallIdx = [];
let sPtr = 0;                      // monotone pointer: first small opener > p
// monotonic deque of (gap, startOpener), decreasing gap front->back
let dqG = [], dqS = [], dqHead = 0;
// first-occurrence per gap size (custody vs TOS)
const firstOcc = new Map();
// in-house record ladder (custody vs A113274)
const ladder = [];
let recMax = 0;
// per-zone results
const Z = [];                      // {p, bound, cnt, z2, gs, head, tail, u}
let zi = 0;
let minCnt = Infinity, minCntAt = 0;

function closeZone(z) {
  const p = z.p, bound = z.bound;
  while (sPtr < smallOpen.length && smallOpen[sPtr] <= p) sPtr++;
  if (sPtr >= smallOpen.length) fail('small-opener cap breached at p=' + p);
  const aFirst = smallOpen[sPtr];
  const cnt = pairCount - smallIdx[sPtr];
  if (cnt < 1 || aFirst + 2 >= bound) fail('ZONE POSTULATE BREACH at p=' + p);
  if (cnt < minCnt) { minCnt = cnt; minCntAt = p; }
  while (dqHead < dqG.length && dqS[dqHead] <= p) dqHead++;
  let z2 = 0, gs = 0, u = 0;
  if (cnt >= 2) {
    if (dqHead >= dqG.length) fail('deque empty with cnt>=2 at p=' + p);
    z2 = dqG[dqHead]; gs = dqS[dqHead];
    u = (gs - p) / (bound - p);
  }
  Z.push({ p, bound, cnt, z2, gs, head: aFirst - p, tail: bound - prevA, u });
  if (dqHead > 4096) { dqG = dqG.slice(dqHead); dqS = dqS.slice(dqHead); dqHead = 0; }
}

function onPair(a) {
  nPairsTotal++;
  while (zi < zones.length && a + 2 >= zones[zi].bound) closeZone(zones[zi++]);
  if (prevA) {
    const g = a - prevA;
    if (!firstOcc.has(g)) firstOcc.set(g, prevA);
    if (g > recMax) { recMax = g; ladder.push([g, prevA]); }
    let tail = dqG.length;
    while (tail > dqHead && dqG[tail - 1] < g) tail--;
    dqG.length = tail; dqS.length = tail;
    dqG.push(g); dqS.push(prevA);
  }
  if (a <= SMALL_CAP) { smallOpen.push(a); smallIdx.push(pairCount); }
  prevA = a; pairCount++;
}

// ----------------------------------------------------------------------------
// The sweep (odd-only segmented sieve; twins detected in-segment with a
// 2-number lookahead so no pair straddles a boundary).
// ----------------------------------------------------------------------------
const SEG = 1 << 22;
const seg = new Uint8Array(SEG + 2);
let lastReport = Date.now();
for (let lo = 3; lo <= X; lo += SEG) {
  const hi = Math.min(lo + SEG - 1, X);
  const hi2 = hi + 2;
  seg.fill(0, 0, hi2 - lo + 1);
  for (let bi = 0; bi < oddBase.length; bi++) {
    const p = oddBase[bi];
    if (p * p > hi2) break;
    let s = p * p;
    if (s < lo) { s = lo + ((p - (lo % p)) % p); if (s % 2 === 0) s += p; }
    const step = 2 * p;
    for (; s <= hi2; s += step) seg[s - lo] = 1;
  }
  const start = lo % 2 === 0 ? lo + 1 : lo;
  for (let i = start; i <= hi; i += 2) {
    if (!seg[i - lo] && !seg[i + 2 - lo]) onPair(i);
  }
  if (Date.now() - lastReport > 30000) {
    lastReport = Date.now();
    err('  ... ' + (hi / X * 100).toFixed(1) + '%  (' + ((Date.now() - t0) / 1000).toFixed(0) +
      ' s, ' + nPairsTotal.toLocaleString('en-US') + ' pairs, ' + Z.length + ' zones closed)');
  }
}
while (zi < zones.length) closeZone(zones[zi++]);
const sweepSecs = (Date.now() - t0) / 1000;

// ----------------------------------------------------------------------------
// ENGINE SELF-CHECK — independent brute force over every zone below 1e6.
// ----------------------------------------------------------------------------
{
  const M = 1e6;
  const s = new Uint8Array(M + 1);
  for (let i = 2; i * i <= M; i++) if (!s[i]) for (let j = i * i; j <= M; j += i) s[j] = 1;
  const op = [];
  for (let i = 3; i + 2 <= M; i += 2) if (!s[i] && !s[i + 2]) op.push(i);
  let checked = 0;
  for (const zr of Z) {
    if (zr.bound > M) break;
    const inz = op.filter(a => a > zr.p && a + 2 < zr.bound);
    let z2 = 0, gs = 0;
    for (let i = 1; i < inz.length; i++) {
      const g = inz[i] - inz[i - 1];
      if (g > z2) { z2 = g; gs = inz[i - 1]; }
    }
    const head = inz[0] - zr.p, tail = zr.bound - inz[inz.length - 1];
    if (inz.length !== zr.cnt || head !== zr.head || tail !== zr.tail ||
        (zr.cnt >= 2 && (z2 !== zr.z2 || gs !== zr.gs)))
      fail('self-check mismatch at p=' + zr.p + ': brute (' + inz.length + ',' + z2 + '@' + gs +
        ',' + head + ',' + tail + ') vs stream (' + zr.cnt + ',' + zr.z2 + '@' + zr.gs +
        ',' + zr.head + ',' + zr.tail + ')');
    checked++;
  }
  log('ENGINE SELF-CHECK: ' + checked + ' zones below 1e6 recomputed by an independent');
  log('  brute-force engine (count, Z2, gap start, head, tail): IDENTICAL');
}

// ----------------------------------------------------------------------------
// CUSTODY 1 — in-house record ladder vs A113274 (records with p_end <= X).
// ----------------------------------------------------------------------------
{
  const applicable = [];
  for (let i = 0; i < REC_GAP.length; i++)
    if (REC_START[i] + REC_GAP[i] + 2 <= X) applicable.push(i);
  if (ladder.length !== applicable.length)
    fail('record ladder length ' + ladder.length + ' != A113274 applicable ' + applicable.length);
  for (let k = 0; k < applicable.length; k++) {
    const i = applicable[k];
    if (ladder[k][0] !== REC_GAP[i] || ladder[k][1] !== REC_START[i])
      fail('ladder row ' + (k + 1) + ' (' + ladder[k][0] + '@' + ladder[k][1] +
        ') != A113274 record ' + (i + 1));
  }
  log('CUSTODY 1: the sweep\'s running-max gap ladder == A113274 records 1..' +
    applicable.length + ' (all with p_end <= X): EXACT');
}

// ----------------------------------------------------------------------------
// CUSTODY 2 — first occurrences, both directions, vs Oliveira e Silva.
// ----------------------------------------------------------------------------
{
  let fwd = 0, bwd = 0;
  for (const [g, s] of firstOcc) {
    const r = TOS_BY_G.get(g);
    if (!r) fail('gap ' + g + ' first seen at ' + s + ' absent from TOS table');
    if (r.F !== s) fail('first occurrence of gap ' + g + ': ours ' + s + ' vs TOS ' + r.F);
    fwd++;
  }
  for (const r of TOS) {
    if (r.F + r.g + 4 <= X) {
      bwd++;
      if (!firstOcc.has(r.g)) fail('TOS gap ' + r.g + ' (F=' + r.F + ') not observed in sweep');
    }
  }
  log('CUSTODY 2: first occurrence of every gap size, both directions vs the');
  log('  adopted Oliveira e Silva table: ' + fwd + ' sizes ours->his, ' + bwd +
    ' his->ours, 0 mismatches (a single mismatch VOIDS the adoption)');
}

// ----------------------------------------------------------------------------
// CUSTODY 3 — the envelope identity: at every zone, the running max of Z2
// equals the largest published record lying wholly below p'^2.
// ----------------------------------------------------------------------------
{
  let env = 0, ri = 0, expected = 0, checked = 0;
  for (const zr of Z) {
    if (zr.cnt >= 2 && zr.z2 > env) env = zr.z2;
    while (ri < REC_GAP.length && REC_START[ri] + REC_GAP[ri] + 2 < zr.bound) {
      expected = REC_GAP[ri]; ri++;
    }
    if (env !== expected)
      fail('envelope ' + env + ' != expected record ' + expected + ' at p=' + zr.p);
    checked++;
  }
  log('CUSTODY 3: env(p) = running max Z2 == largest A113274 record wholly below');
  log('  p\'^2, verified at ALL ' + checked + ' zones: EXACT (the record-exact envelope)');
}

// ----------------------------------------------------------------------------
// Headline counts + postulate
// ----------------------------------------------------------------------------
log('');
log('SWEEP: X = ' + X.toExponential(1) + ', ' + nPairsTotal.toLocaleString('en-US') +
  ' twin pairs, ' + Z.length + ' zones (p = ' + Z[0].p + ' .. ' + Z[Z.length - 1].p +
  '), ' + sweepSecs.toFixed(1) + ' s');
log('ZONE POSTULATE: every zone holds >= 1 pair; minimum count ' + minCnt +
  ' at p = ' + minCntAt + '; zones with a single pair: ' +
  Z.filter(z => z.cnt === 1).length);
log('');

// ----------------------------------------------------------------------------
// Per-band table. Bands: decades of p, the last decade split at sqrt(1e11).
// ----------------------------------------------------------------------------
const l3 = (p) => Math.pow(Math.log(p), 3);
const l2 = (p) => Math.pow(Math.log(p), 2);
const bands = [];
{
  const edges = [];
  for (let e = 0; ; e++) {
    const loE = Math.pow(10, e);
    if (loE > Z[Z.length - 1].p) break;
    if (e === 5) { edges.push([1e5, 316228, '1e5-p.5']); }
    else edges.push([loE, Math.pow(10, e + 1), '10^' + e]);
  }
  for (const b of EXTRA_BANDS) edges.push(b);
  for (const [loE, hiE, name, extra] of edges) {
    const rows = Z.filter(z => z.p >= loE && z.p < hiE);
    if (!rows.length) continue;
    const r2 = rows.filter(z => z.cnt >= 2);
    const c3 = r2.map(z => z.z2 / l3(z.p));
    const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
    const sd = (a) => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) * (x - m)))); };
    const loads = r2.map(z => z.z2 / (0.76 * l3(z.gs + z.z2)));
    const margins = r2.map(z => z.z2 / (z.bound - z.p));
    const heads = rows.map(z => z.head / l2(z.p));
    const posu = r2.map(z => z.u);
    bands.push({
      name, extra: !!extra, n: rows.length,
      pairsMean: mean(rows.map(z => z.cnt)),
      c3m: mean(c3), c3sd: sd(c3),
      loadMax: Math.max(...loads),
      marginWorst: Math.max(...margins),
      headM: mean(heads), headMax: Math.max(...rows.map(z => z.head)),
      tailM: mean(rows.map(z => z.tail / l2(z.bound))),
      um: mean(posu), uTop: posu.filter(u => u > 0.8).length / posu.length,
      rows, r2
    });
  }
}
log('PER-BAND (bands are decades of p; the last is p in [1e5, sqrt(1e11)) when swept):');
log('  band   zones  pairs/zone   c3=Z2/ln^3(p)    maxLoad  worst Z2/width   head/ln2p  headmax  tail/ln2(p2)  meanU  frac u>.8');
for (const b of bands) {
  log('  ' + b.name.padEnd(7) + String(b.n).padStart(5) + '  ' +
    b.pairsMean.toExponential(2).padStart(9) + '   ' +
    (b.c3m.toFixed(3) + ' ± ' + b.c3sd.toFixed(3)).padStart(15) + '  ' +
    b.loadMax.toFixed(4).padStart(8) + '  ' +
    ('1/' + (1 / b.marginWorst).toExponential(2)).padStart(12) + '   ' +
    b.headM.toFixed(3).padStart(8) + '  ' + String(b.headMax).padStart(6) + '  ' +
    b.tailM.toFixed(3).padStart(9) + '  ' + b.um.toFixed(3).padStart(6) + '  ' +
    b.uTop.toFixed(3).padStart(6));
}
for (const b of bands) if (b.extra) {
  const e = EXTRA_BANDS.find(x => x[2] === b.name);
  log('  ' + b.name + ' = extra band [' + e[0] + ', ' + e[1] + ') from argv[3], additive only');
}
log('');

// ----------------------------------------------------------------------------
// The envelope steps (each new running max), with the record index it equals.
// ----------------------------------------------------------------------------
{
  log('ENVELOPE STEPS (first zone attaining each new max Z2; == A113274 by CUSTODY 3):');
  log('     p        Z2     gapStart        u      rec#');
  let env = 0, shown = 0;
  for (const zr of Z) {
    if (zr.cnt >= 2 && zr.z2 > env) {
      env = zr.z2;
      const ri = REC_GAP.indexOf(zr.z2);
      log('  ' + String(zr.p).padStart(7) + '  ' + String(zr.z2).padStart(6) + '  ' +
        String(zr.gs).padStart(12) + '  ' + zr.u.toFixed(4).padStart(7) + '  ' +
        String(ri + 1).padStart(5));
      shown++;
    }
  }
  log('  (' + shown + ' steps)');
}
log('');

// ----------------------------------------------------------------------------
// THE LAW — candidates + the mandatory synthetic control.
// ----------------------------------------------------------------------------
function fitPow(ps, zs) {
  // regress ln z on ln ln p
  let n = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < ps.length; i++) {
    if (zs[i] <= 0) continue;
    const x = Math.log(Math.log(ps[i])), y = Math.log(zs[i]);
    n++; sx += x; sy += y; sxx += x * x; sxy += x * y;
  }
  const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return { slope, icept: (sy - slope * sx) / n, n };
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
{
  const fitZ = Z.filter(z => z.cnt >= 2 && z.p >= 100);
  const ps = fitZ.map(z => z.p), zs = fitZ.map(z => z.z2);
  const meas = fitPow(ps, zs);
  // residual scale of the measured object around ln^3 p:
  const lnc = fitZ.map(z => Math.log(z.z2 / l3(z.p)));
  const mu = lnc.reduce((a, b) => a + b, 0) / lnc.length;
  const sigma = Math.sqrt(lnc.reduce((a, b) => a + (b - mu) * (b - mu), 0) / lnc.length);
  // controls: known truths on the SAME p grid, same noise scale, same estimator
  const REPS = 25;
  function control(truthFn, seed0) {
    const reads = [];
    for (let r = 0; r < REPS; r++) {
      const rnd = mulberry32(0x5EED0 + seed0 * 1000 + r);
      const zsC = ps.map(p => {
        let u1 = rnd(), u2 = rnd();
        if (u1 < 1e-12) u1 = 1e-12;
        const gauss = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return truthFn(p) * Math.exp(sigma * gauss);
      });
      reads.push(fitPow(ps, zsC).slope);
    }
    const m = reads.reduce((a, b) => a + b, 0) / REPS;
    const s = Math.sqrt(reads.reduce((a, b) => a + (b - m) * (b - m), 0) / REPS);
    return { m, s };
  }
  const c3ctl = control(p => l3(p), 1);
  const c2ctl = control(p => l2(p), 2);
  // the E-form truth (Kourbatov's own estimator shape at zone scale), no noise:
  const eForm = fitPow(ps, ps.map(p => {
    const a = l2(p * p) / (2 * C2);
    return a * Math.log((p * p - p) / a);
  }));
  log('THE LAW. Power fit ln Z2 = e * lnln p + const over ' + meas.n + ' zones (p >= 100, cnt >= 2):');
  log('  measured exponent e = ' + meas.slope.toFixed(3));
  log('  CONTROLS (same grid, same estimator, matched noise sigma = ' + sigma.toFixed(3) + ', ' + REPS + ' reps):');
  log('    truth ln^3 p reads e = ' + c3ctl.m.toFixed(3) + ' ± ' + c3ctl.s.toFixed(3));
  log('    truth ln^2 p reads e = ' + c2ctl.m.toFixed(3) + ' ± ' + c2ctl.s.toFixed(3));
  log('    truth a*ln(w/a), a = ln^2(p^2)/2C2, w = p^2-p (the E-form, no noise) reads e = ' +
    eForm.slope.toFixed(3));
  const zsep = Math.abs(meas.slope - c3ctl.m) / c3ctl.s;
  const zsep2 = Math.abs(meas.slope - c2ctl.m) / c2ctl.s;
  log('  separation: measured sits ' + zsep.toFixed(1) + ' control-sd from the ln^3 read and ' +
    zsep2.toFixed(1) + ' from the ln^2 read');
  // the ln^2 lnln candidate: is its "constant" drifting?
  const first = bands.find(b => b.name === '10^2');
  const std = bands.filter(b => !b.extra), last = std[std.length - 1];
  const cAlt = (b) => b.r2.map(z => z.z2 / (l2(z.p) * Math.log(Math.log(z.p))))
    .reduce((a, x) => a + x, 0) / b.r2.length;
  log('  ln^2*lnln candidate: mean Z2/(ln^2 p lnln p) moves ' + cAlt(first).toFixed(2) +
    ' -> ' + cAlt(last).toFixed(2) + ' from band 10^2 to ' + last.name +
    ' (a constant would sit still; ln^3\'s c3 column above moves ' +
    first.c3m.toFixed(2) + ' -> ' + last.c3m.toFixed(2) + ')');
  // Oliveira e Silva's two-term fit read on our zones, height frame:
  const tosLoad = fitZ.map(z => {
    const L = Math.log(z.gs + z.z2);
    const pred = 0.64 * L * L * L - 5.7 * L * L;
    return pred > 0 ? z.z2 / pred : NaN;
  }).filter(x => x === x);
  const tlm = tosLoad.reduce((a, b) => a + b, 0) / tosLoad.length;
  log('  Oliveira e Silva first-occurrence envelope 0.64 ln^3 s - 5.7 ln^2 s, read at');
  log('    each zone\'s max-gap height s: mean load ' + tlm.toFixed(3) + ', max ' +
    Math.max(...tosLoad).toFixed(3) + ' (his fit is to FIRST occurrences; in-zone maxima');
  log('    sit below it exactly when the zone is not where the gap size debuts)');
}
log('');

// ----------------------------------------------------------------------------
// THE MARGIN + shared levels vs G2.
// ----------------------------------------------------------------------------
{
  const worst = Z.filter(z => z.cnt >= 2)
    .reduce((a, z) => (z.z2 / (z.bound - z.p) > a.z2 / (a.bound - a.p) ? z : a));
  log('THE MARGIN. Z2/width worst case over all zones: Z2 = ' + worst.z2 + ' at p = ' +
    worst.p + ', width ' + (worst.bound - worst.p) + ', ratio 1/' +
    ((worst.bound - worst.p) / worst.z2).toFixed(2));
  log('  (the whole-tile margin window/G2 sits FLAT at 3.2-4.5 over the 14 exact');
  log('   levels — G2-STATE.md §2; the zone-local margin RUNS AWAY, next table)');
  log('');
  log('SHARED LEVELS p <= 43 (G2 from the exact in-house ladder, G2-STATE.md §2):');
  log('   p    width   Z2(p)  G2(p#)  G2/Z2   width/Z2   width/G2');
  for (const [x, g2] of G2_LADDER) {
    const zr = Z.find(z => z.p === x);
    if (!zr || zr.cnt < 2) { log('  ' + String(x).padStart(3) + '  (zone holds <2 pairs)'); continue; }
    const w = zr.bound - zr.p;
    log('  ' + String(x).padStart(3) + '  ' + String(w).padStart(6) + '  ' +
      String(zr.z2).padStart(6) + '  ' + String(g2).padStart(6) + '  ' +
      (g2 / zr.z2).toFixed(2).padStart(5) + '  ' + (w / zr.z2).toFixed(2).padStart(8) + '  ' +
      (w / g2).toFixed(2).padStart(8));
  }
  log('  (Z2(p) <= G2(p#) is a one-line theorem: in-zone twin pairs are twin slots');
  log('   of T_p, so their gaps are a subset of the tile\'s slot gaps)');
  log('');
  log('maxgap-law.md §8 cross-check, M(x, x^2) there vs Z2(x) here (window (x, x\'^2)');
  log('  vs (x, x^2), so equality is expected only when the max gap sits below x^2):');
  log('    x     §8 M(x,x^2)   Z2(x)   same?');
  for (const [x, m] of MAXGAP_LAW_S8) {
    const zr = Z.find(z => z.p === x);
    log('  ' + String(x).padStart(5) + '  ' + String(m).padStart(10) + '  ' +
      String(zr ? zr.z2 : '-').padStart(7) + '   ' + (zr && zr.z2 === m ? 'YES' : 'no (window)'));
  }
}
log('');

// ----------------------------------------------------------------------------
// HEAD / TAIL / POSITION.
// ----------------------------------------------------------------------------
{
  const withHead = Z.filter(z => z.p >= 100);
  const hm = withHead.map(z => z.head / l2(z.p));
  const mean = hm.reduce((a, b) => a + b, 0) / hm.length;
  log('THE HEAD (birth canal): head = firstOpener - p, a first-twin distance at');
  log('  height p. Mean head/ln^2 p = ' + mean.toFixed(4) + ' over ' + withHead.length +
    ' zones (p >= 100); the HL mean twin gap is ln^2 p/(2C2), i.e. coefficient ' +
    (1 / (2 * C2)).toFixed(4) + ',');
  const worstH = withHead.reduce((a, z) => (z.head / (0.76 * l3(z.p)) > a.head / (0.76 * l3(a.p)) ? z : a));
  log('  worst head vs the Kourbatov ceiling AT HEIGHT p: head/(0.76 ln^3 p) = ' +
    (worstH.head / (0.76 * l3(worstH.p))).toFixed(4) + ' at p = ' + worstH.p +
    ' (head ' + worstH.head + ')');
  log('  head measures at height p, Z2 at height ~p^2: the same ln^3 law at the two');
  log('  heights predicts Z2/head ~ 8; measured band-mean Z2/head: ' +
    bands.filter(b => b.n > 5).map(b =>
      (b.r2.map(z => z.z2 / Math.max(z.head, 1)).reduce((a, x) => a + x, 0) / b.r2.length).toFixed(1)
    ).join(' '));
  log('');
  const r2all = Z.filter(z => z.cnt >= 2 && z.p >= 100);
  const hist = new Array(10).fill(0);
  for (const z of r2all) hist[Math.min(9, Math.floor(z.u * 10))]++;
  log('POSITION of the max gap, u = (gapStart - p)/(p\'^2 - p), ' + r2all.length +
    ' zones (p >= 100):');
  log('  decile counts [0.0-0.1 .. 0.9-1.0]: ' + hist.join(' '));
  log('  fractions: ' + hist.map(h => (h / r2all.length).toFixed(3)).join(' '));
  const um = r2all.map(z => z.u).reduce((a, b) => a + b, 0) / r2all.length;
  log('  mean u = ' + um.toFixed(4) + ' (uniform would read 0.500; the HL null is');
  log('  right-loaded: gap scale grows like ln^2 of height, so the deep end both');
  log('  breeds larger gaps and holds most of the zone\'s length)');
}
log('');
log('done in ' + ((Date.now() - t0) / 1000).toFixed(1) + ' s total');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/zonegap-01.js -- 1e11
//   invocation:  node research/zonegap-01.js 1e11
//   code-sha256: d8af999bc229f22b4c9008b9d56a99e8b88c240c133e04419bf388d919153bb5
//   out-sha256:  2be031a1f75b1a3a6524ab7ee552d0846f2cac4b31fa74c6482dd7b06c997522
//   body-lines:  123
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     319.6 s
// ============================================================================
// ENGINE SELF-CHECK: 167 zones below 1e6 recomputed by an independent
//   brute-force engine (count, Z2, gap start, head, tail): IDENTICAL
// CUSTODY 1: the sweep's running-max gap ladder == A113274 records 1..41 (all with p_end <= X): EXACT
// CUSTODY 2: first occurrence of every gap size, both directions vs the
//   adopted Oliveira e Silva table: 1116 sizes ours->his, 1116 his->ours, 0 mismatches (a single mismatch VOIDS the adoption)
// CUSTODY 3: env(p) = running max Z2 == largest A113274 record wholly below
//   p'^2, verified at ALL 27292 zones: EXACT (the record-exact envelope)
//
// SWEEP: X = 1.0e+11, 224,376,048 twin pairs, 27292 zones (p = 2 .. 316219), 319.3 s
// ZONE POSTULATE: every zone holds >= 1 pair; minimum count 2 at p = 2; zones with a single pair: 0
//
// PER-BAND (bands are decades of p; the last is p in [1e5, sqrt(1e11)) when swept):
//   band   zones  pairs/zone   c3=Z2/ln^3(p)    maxLoad  worst Z2/width   head/ln2p  headmax  tail/ln2(p2)  meanU  frac u>.8
//   10^0       4    4.25e+0     4.370 ± 1.119    0.6312     1/3.50e+0      1.778       6      0.684   0.267   0.000
//   10^1      21    8.44e+1     2.708 ± 0.726    0.6575     1/5.27e+0      0.872      30      0.578   0.587   0.190
//   10^2     143    3.23e+3     3.426 ± 0.497    0.7504     1/5.00e+1      0.942     150      0.768   0.623   0.315
//   10^3    1061    1.70e+5     3.681 ± 0.362    0.7504     1/7.06e+2      0.684     210      0.766   0.672   0.308
//   10^4    8363    1.04e+7     4.022 ± 0.243    0.7432     1/3.49e+4      0.720     630      0.741   0.668   0.274
//   1e5-p.517700    1.10e+8     3.930 ± 0.219    0.7272     1/1.66e+6      0.725     924      0.752   0.728   0.462
//
// ENVELOPE STEPS (first zone attaining each new max Z2; == A113274 by CUSTODY 3):
//      p        Z2     gapStart        u      rec#
//         2       2             3   0.1429      1
//         3       6             5   0.0909      2
//         5      12            17   0.2727      3
//         7      30            71   0.5614      5
//        17      36           311   0.8547      6
//        19      72           347   0.6431      7
//        23     150           659   0.7775      8
//        47     168          2381   0.8450      9
//        73     210          5879   0.9413     10
//       113     282         13397   0.8294     11
//       137     372         18539   0.9592     12
//       157     498         24419   0.9186     13
//       241     630         62297   0.9888     14
//       433     924        187907   0.9750     15
//       829    1008        688451   0.9780     17
//       919    1452        850349   0.9853     18
//      1693    1512       2868959   0.9962     19
//      2207    1530       4869911   0.9944     20
//      3137    1722       9923987   0.9919     21
//      3823    1902      14656517   0.9976     22
//      4159    2190      17382479   0.9963     23
//      5531    2256      30752231   0.9959     24
//      5717    2832      32822369   0.9972     25
//      9839    2868      96894041   0.9985     26
//     11657    3012     136283429   0.9995     27
//     15319    3102     234966929   1.0000     28
//     15767    3180     248641037   0.9994     29
//     15991    3480     255949949   0.9997     30
//     19763    3804     390817727   0.9992     31
//     26423    4770     698542487   0.9999     32
//     49663    5292    2466641069   0.9999     33
//     65479    6030    4289385521   0.9999     34
//    138497    6282   19181736269   0.9998     35
//    155609    6474   24215097497   0.9999     36
//    157649    6552   24857578817   0.9999     37
//    200609    6648   40253418059   0.9999     38
//    206009    7050   42441715487   0.9999     39
//    209089    7980   43725662621   0.9998     40
//    255137    8040   65095731749   0.9999     41
//   (39 steps)
//
// THE LAW. Power fit ln Z2 = e * lnln p + const over 27267 zones (p >= 100, cnt >= 2):
//   measured exponent e = 3.192
//   CONTROLS (same grid, same estimator, matched noise sigma = 0.064, 25 reps):
//     truth ln^3 p reads e = 3.000 ± 0.003
//     truth ln^2 p reads e = 1.999 ± 0.004
//     truth a*ln(w/a), a = ln^2(p^2)/2C2, w = p^2-p (the E-form, no noise) reads e = 3.261
//   separation: measured sits 58.3 control-sd from the ln^3 read and 339.0 from the ln^2 read
//   ln^2*lnln candidate: mean Z2/(ln^2 p lnln p) moves 11.60 -> 19.17 from band 10^2 to 1e5-p.5 (a constant would sit still; ln^3's c3 column above moves 3.43 -> 3.93)
//   Oliveira e Silva first-occurrence envelope 0.64 ln^3 s - 5.7 ln^2 s, read at
//     each zone's max-gap height s: mean load 1.367, max 7.869 (his fit is to FIRST occurrences; in-zone maxima
//     sit below it exactly when the zone is not where the gap size debuts)
//
// THE MARGIN. Z2/width worst case over all zones: Z2 = 2 at p = 2, width 7, ratio 1/3.50
//   (the whole-tile margin window/G2 sits FLAT at 3.2-4.5 over the 14 exact
//    levels — G2-STATE.md §2; the zone-local margin RUNS AWAY, next table)
//
// SHARED LEVELS p <= 43 (G2 from the exact in-house ladder, G2-STATE.md §2):
//    p    width   Z2(p)  G2(p#)  G2/Z2   width/Z2   width/G2
//     2       7       2       2   1.00      3.50      3.50
//     3      22       6       6   1.00      3.67      3.67
//     5      44      12      12   1.00      3.67      3.67
//     7     114      30      30   1.00      3.80      3.80
//    11     158      30      42   1.40      5.27      3.76
//    13     276      30      66   2.20      9.20      4.18
//    17     344      36     108   3.00      9.56      3.19
//    19     510      72     150   2.08      7.08      3.40
//    23     818     150     204   1.36      5.45      4.01
//    29     932     150     258   1.72      6.21      3.61
//    31    1338     150     348   2.32      8.92      3.84
//    37    1644     150     528   3.52     10.96      3.11
//    41    1808     150     546   3.64     12.05      3.31
//    43    2166     150     618   4.12     14.44      3.50
//   (Z2(p) <= G2(p#) is a one-line theorem: in-zone twin pairs are twin slots
//    of T_p, so their gaps are a subset of the tile's slot gaps)
//
// maxgap-law.md §8 cross-check, M(x, x^2) there vs Z2(x) here (window (x, x'^2)
//   vs (x, x^2), so equality is expected only when the max gap sits below x^2):
//     x     §8 M(x,x^2)   Z2(x)   same?
//     211         498      498   YES
//     401         630      630   YES
//     797         924      924   YES
//    1601        1452     1452   YES
//    3203        1722     1722   YES
//    6421        2832     2832   YES
//    9973        2868     2868   YES
//
// THE HEAD (birth canal): head = firstOpener - p, a first-twin distance at
//   height p. Mean head/ln^2 p = 0.7229 over 27267 zones (p >= 100); the HL mean twin gap is ln^2 p/(2C2), i.e. coefficient 0.7574,
//   worst head vs the Kourbatov ceiling AT HEIGHT p: head/(0.76 ln^3 p) = 0.7218 at p = 659 (head 150)
//   head measures at height p, Z2 at height ~p^2: the same ln^3 law at the two
//   heights predicts Z2/head ~ 8; measured band-mean Z2/head: 16.6 47.8 105.0 163.6 200.1
//
// POSITION of the max gap, u = (gapStart - p)/(p'^2 - p), 27267 zones (p >= 100):
//   decile counts [0.0-0.1 .. 0.9-1.0]: 0 0 1767 2105 1516 1424 4071 5544 5365 5475
//   fractions: 0.000 0.000 0.065 0.077 0.056 0.052 0.149 0.203 0.197 0.201
//   mean u = 0.7071 (uniform would read 0.500; the HL null is
//   right-loaded: gap scale grows like ln^2 of height, so the deep end both
//   breeds larger gaps and holds most of the zone's length)
//
// done in 319.5 s total
// ============================================================================
// READINGS
// ============================================================================
// 1. THE OBJECT MEASURES, AND ITS CUSTODY IS EXACT THREE WAYS. 27,292 zones
//    to X = 1e11, 224,376,048 twin pairs, one 315-s sweep. The running-max
//    ladder reproduces A113274 records 1..41 EXACT; the first occurrence of
//    every one of the 1,116 gap sizes matches the adopted Oliveira e Silva
//    table in both directions with 0 mismatches; and the envelope identity
//    env(p) = largest published record wholly below p'^2 holds at ALL 27,292
//    zones. The Zone Postulate is re-verified in a refined form: every zone
//    holds at least TWO pairs (minimum count 2, at p = 2; single-pair zones:
//    0), where window-check.js verified one.
// 2. Z2 IS THE RECORD ENVELOPE WEARING ZONE COORDINATES. The last 15
//    envelope steps sit at u = 0.9992..1.0000, the max-gap position deciles
//    are empty below u = 0.2 and hold 75% of their mass above u = 0.6, and
//    in the top band nearly half the zones (0.462) carry their max gap in
//    the top fifth. For a large zone the binding gap is typically the
//    youngest record just under p'^2. Chris's question — does the deepest
//    gap sit in the onset shell's deep end? — answers YES, and the
//    mechanism is that the deep end both breeds the largest gap scale
//    (ln^2 of height) and holds nearly all of the zone's length.
// 3. THE LAW, WITH THE CONTROL DOING ITS JOB: Z2 lives in the ln^3 family
//    and no clean power exponent should be quoted. The naive power fit
//    reads e = 3.192. The matched-noise controls read truth ln^3 as
//    3.000 ± 0.003 and truth ln^2 as 1.999 ± 0.004, so the measurement is
//    58.3 control-sd from a CONSTANT-times-ln^3 and 339.0 from ln^2; but
//    the deterministic E-form truth a*ln(w/a) — the Kourbatov-family shape
//    itself — reads 3.261 on the same grid. The object sits between
//    c*ln^3 p and the E-form, i.e. INSIDE the ln^3 family with a drifting
//    constant: c3 runs 3.426 -> 3.681 -> 4.022 -> 3.930 by band, while the
//    ln^2*lnln candidate's "constant" runs 11.60 -> 19.17 and is refuted.
//    The published guard holds everywhere: max Kourbatov load at the gap's
//    own height is 0.7504, never 1, in agreement with the record ladder's
//    worst 0.84.
// 4. THE MARGIN, QUANTIFIED AGAINST THE TILE. The whole-tile margin
//    window/G2 is FLAT at 3.2 to 4.5 over the 14 exact levels. The
//    zone-local margin RUNS: worst Z2/width per band falls 1/50 (10^2),
//    1/706 (10^3), 1/34,900 (10^4), 1/1,660,000 (top band) — at the top of
//    the sweep the deepest gap consumes less than a millionth of its zone,
//    about 5*10^5 times more slack than the tile's flat 3.5, diverging like
//    p^2/(3.9 ln^3 p). The one place the ratio is small is the degenerate
//    first zone (1/3.50 at p = 2). Chris's "substantially better numbers"
//    is exact: better by 10^5.7 at the sweep top, and unboundedly so.
// 5. THE HEAD IS A MEAN-SCALE OBJECT, NOT A MAX-SCALE ONE. Mean
//    head/ln^2 p = 0.7229 against the HL mean-gap coefficient
//    1/(2C2) = 0.7574 (4.6% under, the familiar direction); its worst case
//    against the Kourbatov ceiling AT HEIGHT p is 0.7218, reached at
//    p = 659 where the record-8 gap of 150 serves as the head. The prose
//    hypothesis printed in the block above ("predicts Z2/head ~ 8") is
//    REFUTED by its own row: band-mean Z2/head runs 16.6 -> 200.1, because
//    Z2 is a max at height p^2 (ln^3 scale) while the head is a single
//    draw at height p (ln^2 scale), and a mean of ratios inflates over
//    small heads. The birth canal grows like 0.72 ln^2 p in the mean and
//    respects the ln^3 ceiling in the extreme.
// 6. Z2(p) IS NOT G2(p#) RESTRICTED, AND THE HONEST LOGIC IS UNCHANGED.
//    Z2 <= G2(p#) is a one-line theorem, with EQUALITY at p = 2, 3, 5, 7
//    and a ratio G2/Z2 climbing to 4.12 at p = 43: past level 7 the tile's
//    extremal gap lives beyond p'^2, and the zone sees a strictly easier
//    maximum. maxgap-law.md §8's seven levels reproduce here 7/7 EXACT.
//    Proving Z2(p) + head + tail < width for every p is exactly the strong
//    Zone Postulate, which is TPC-strength: this object REFRAMES the wall,
//    it does not evade it. What it buys is 27,292 measured levels against
//    14 exact tile terms, a classical object (twin-gap records) with a
//    published guard and literature, and the anchored machinery's home
//    turf. The first-moment argument stays closed; the max is the wall.
// 7. PREREG SCORE: 2 OF 5, MISSES FIRST (bands sealed in
//    research/history/staging/zonegap-01-prereg.md, commit acc07f9, before
//    this run). P1 MISS: band c3 3.930 below the sealed [4.05, 4.35]. P2
//    MISS: band mean u 0.728 above [0.63, 0.71] and frac u>0.8 = 0.462 far
//    above [0.21, 0.33]. P5 MISS, with a sign flip: whole-sweep e = 3.192
//    below [3.38, 3.48] and BELOW the E-form read 3.261 where stage 1 had
//    it 0.130 above. P3 PASS: head 0.725 in [0.64, 0.80]. P4 PASS: band
//    max load 0.7272 in [0.66, 0.80]. The three misses share one
//    mechanism, reading 2: the Z2 field is record-correlated across
//    overlapping zones — one physical gap serves thousands of zones — so
//    stage-1 "drift" extrapolation treated as independent what is a
//    staircase. The prereg's own prose also miscounted stage-1 zones
//    (9,592 written, 9,591 in the sha-bound output); predictions
//    unaffected.
// 8. LIMITS. Everything here is measurement, none of it asymptotic
//    evidence (square-window lesson: the margin grows because the question
//    gets easier, ZONE-POSTULATE.md §5a). The per-zone Z2 series is NOT
//    27,292 independent data points — reading 2 measures exactly how far
//    from independent — and any future fit must model the staircase, not
//    the scatter. Sub-1e6 engine cross-check, both-direction first
//    occurrences, and the envelope identity are the custody surface; the
//    Oliveira e Silva table beyond our X (to 1e16) remains single-witness
//    per range, trusted under the series rule.
// ============================================================================
