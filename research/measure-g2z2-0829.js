// ============================================================================
// MEASURE-G2Z2 0829 — THE REDUCTION'S PRICE G2(x#)/Z2(x) AT EVERY LEVEL WHERE
// BOTH OBJECTS EXIST, WHERE THE TILE'S RECORD GAP SITS, AND HOW OFTEN A ZONE
// IS TIGHT
// ============================================================================
// THE QUESTION. The Gap Reformulation passes from Z2(p), the largest gap
// between consecutive twin openers inside the zone (p, p'^2), to G2(p#), the
// largest gap between consecutive twin slots of the whole tile. The corpus
// records the loss at fourteen exact levels only (zonegap-01.md §5: G2/Z2 =
// 1.00 at p = 2..7, then 1.40, 2.20, 3.00, 2.08, 1.36, 1.72, 2.32, 3.52, 3.64,
// 4.12 at p = 11..43). G2 is trusted at 22 terms to x = 79 and Z2 at x <= 79
// needs only the twin primes below 83^2 = 6889, so eight further levels are
// free. Three sections here: (A) reproduce the fourteen digit for digit and
// cross-check them a second way; (B) the full 22-term table plus the location
// of the tile's least attaining position against zone, stratum, seam and
// mirror; (C) sweep the zones and count the tight case k = 2.
//
// THE HONEST DOUBT, first. None of this is a bound and none of it becomes one.
// The ratio measured here is (i) in the bridge note's scheme: a descriptive
// statistic over 22 levels, of which 8 are single-witness trusted data and 14
// are custody. An UPPER bound on G2/Z2 combined with any Z2 bound below the
// zone width would be (ii), TPC-strength; no such bound is claimed, and the
// ratio's own direction over the trusted range is evidence against any small
// constant ceiling existing. Section C's Poisson arm is a model, not a law, and
// its calibration is printed so it can be disbelieved on its own numbers. The
// 22-term G2 ladder's terms 15-22 are single-witness (A144311, Alekseyev 2009
// and Wang 2024); everything above x = 43 inherits that doubt.
//
// PRE-REGISTRATION: research/history/staging/measure-g2z2-0829.md §1, written
// 2026-08-29 before this file existed. Custody is disk order, not a git
// object; no git command was run this session.
//
// CONVENTIONS, zonegap-01.js §0 verbatim.
//   pair       (a, a+2) both prime, named by its OPENER a.
//   in zone p  p < a AND a + 2 < p'^2, both strict.
//   gap        a_{i+1} - a_i over consecutive in-zone openers.
//   Z2(p)      max of those gaps; defined when the zone holds >= 2 pairs.
//   head(p)    a_first - p;  tail(p) = p'^2 - a_last. Never inside Z2.
//   k(p)       the zone's pair count.
//   seam       a multiple of the previous primorial (GLOSSARY.md "Seam").
//   stratum    the interval [x^2, 2x^2] (GLOSSARY.md "Stratum (fossil)").
//   mirror     sigma(s) = x# - 2 - s; centre (x# - 2)/2 (GLOSSARY.md "Mirror").
//
// WIDTH AUDIT. Sections A and B: zone arithmetic to 83^2 = 6889, exact in
// doubles. Tile positions and primorials from 23# up exceed 2^53 and are
// BigInt throughout section B, never Number. Section C: X <= 4e15 asserted;
// every opener, boundary p'^2 <= X and cumulative count < 2^53, exact in
// doubles. Sieve strides p <= sqrt(X) <= 6.4e7 as int32 offsets inside a
// segment of 2^21 odd numbers.
//
// PRIOR ART ON DISK (cited, not re-derived):
//   research/zonegap-01.js / zonegap-01.md   the conventions, the 1e11 sweep,
//        the fourteen ratios reproduced in section A. Q-zonegap-Z2, PARTIAL.
//   research/zonegap-02-reduction.md §2      R0: width = head + sum gaps +
//        tail, with head + Z2 + tail <= width and equality iff k = 2. That
//        equality is what section C counts.
//   research/exact-g2-ladder.js LADDER       the least attaining position and
//        multiplicity at the fourteen custody levels.
//   research/a144311-full-ladder.js          the 22 trusted G2 terms to x = 79.
//   research/a113274-gap-records.js          the adopted record ladder, first
//        41 records inlined below as the second witness for Z2 = env.
//   research/history/staging/zonegap-03-model.md   Z2(p) = env(p) identically
//        (PROVEN conditional on the adopted ladder). Section A's second engine
//        is that identity, used as a cross-check and not as a definition.
//
// Usage:  node research/measure-g2z2-0829.js [X]     default X = 1e11
// ============================================================================
'use strict';
const T0 = Date.now();
const X = Number(process.argv[2] || 1e11);
if (!(X >= 1e6 && X <= 4e15)) { console.error('X out of audited range'); process.exit(1); }
const C2 = 0.6601618158468696;

// --- TRUSTED DATA 1: the 22-term A144311 ladder in G2 convention ------------
const LP = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const LG = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618, 708, 870, 966, 1080, 1284, 1398, 1530, 1710];

// --- TRUSTED DATA 2: least attaining position and multiplicity, x <= 43 -----
const POS = {
  2: [1n, 1], 3: [5n, 1], 5: [17n, 2], 7: [71n, 2], 11: [899n, 4], 13: [731n, 12],
  17: [701n, 20], 19: [659n, 20], 23: [76166567n, 4], 29: [1205437109n, 2],
  31: [8813641451n, 4], 37: [544899485411n, 2], 41: [3784200788231n, 4],
  43: [830330079152051n, 8],
};

// --- TRUSTED DATA 3: A113274/A113275 records with p_end <= 1e11 -------------
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

// --- TRUSTED DATA 4: zonegap-01.md §5's fourteen ratios, quoted verbatim ----
const QUOTED = { 2: '1.00', 3: '1.00', 5: '1.00', 7: '1.00', 11: '1.40', 13: '2.20',
  17: '3.00', 19: '2.08', 23: '1.36', 29: '1.72', 31: '2.32', 37: '3.52',
  41: '3.64', 43: '4.12' };

const log = console.log;
let FAILS = 0;
const need = (ok, msg) => { if (!ok) { FAILS++; log('  FAIL: ' + msg); } };

// ---------------------------------------------------------------------------
// A simple sieve for the small range, used by sections A and B.
// ---------------------------------------------------------------------------
function smallPrimes(n) {
  const s = new Uint8Array(n + 1); s[0] = s[1] = 1;
  for (let i = 2; i * i <= n; i++) if (!s[i]) for (let j = i * i; j <= n; j += i) s[j] = 1;
  const out = []; for (let i = 2; i <= n; i++) if (!s[i]) out.push(i);
  return { out, comp: s };
}
const SMALL_N = 7000;
const SP = smallPrimes(SMALL_N);
const isP = (n) => n >= 2 && n <= SMALL_N && !SP.comp[n];
const OPEN = []; for (let a = 3; a + 2 <= SMALL_N; a += 2) if (isP(a) && isP(a + 2)) OPEN.push(a);

// zone statistics from prime data alone
function zoneStats(p) {
  const q = SP.out[SP.out.indexOf(p) + 1], B = q * q;
  const inz = OPEN.filter(a => a > p && a + 2 < B);
  let Z = 0; for (let i = 1; i < inz.length; i++) Z = Math.max(Z, inz[i] - inz[i - 1]);
  return { p, q, B, k: inz.length, Z2: inz.length >= 2 ? Z : null,
           head: inz[0] - p, tail: B - inz[inz.length - 1], first: inz[0], last: inz[inz.length - 1] };
}
// second witness: env(p) = largest adopted record wholly inside the zone
function envOf(p, B) {
  let e = 0;
  for (let i = 0; i < REC_GAP.length; i++)
    if (REC_START[i] > p && REC_START[i] + REC_GAP[i] + 2 < B) e = Math.max(e, REC_GAP[i]);
  return e;
}

log('=== SECTION A. CUSTODY: zonegap-01.md §5 reproduced =====================');
log('  x   x\'   x\'^2     k   head   Z2   tail   G2      G2/Z2   quoted  match  env  env=Z2');
for (let i = 0; i < 14; i++) {
  const x = LP[i], z = zoneStats(x), r = LG[i] / z.Z2, rs = r.toFixed(2);
  const e = envOf(x, z.B);
  const okQ = rs === QUOTED[x], okE = e === z.Z2;
  need(okQ, `x=${x}: computed ratio ${rs} vs quoted ${QUOTED[x]}`);
  need(okE, `x=${x}: env ${e} vs Z2 ${z.Z2}`);
  need(z.head + z.Z2 + z.tail <= z.B - x, `x=${x}: R0 inequality violated`);
  log('  ' + String(x).padEnd(4) + String(z.q).padEnd(5) + String(z.B).padEnd(9) +
      String(z.k).padEnd(4) + String(z.head).padEnd(7) + String(z.Z2).padEnd(5) +
      String(z.tail).padEnd(7) + String(LG[i]).padEnd(8) + rs.padEnd(8) +
      QUOTED[x].padEnd(8) + (okQ ? 'YES' : 'NO ').padEnd(7) +
      String(e).padEnd(5) + (okE ? 'YES' : 'NO'));
}
log('  fourteen ratios reproduced digit for digit: ' + (FAILS === 0 ? 'YES' : 'NO'));

log('');
log('=== SECTION B. THE 22-TERM TABLE ========================================');
log('  x   x\'^2     k    head  Z2    tail   G2      G2/Z2    Z2/G2   width   Z2/width');
const ROWS = [];
for (let i = 0; i < LP.length; i++) {
  const x = LP[i], z = zoneStats(x), W = z.B - x;
  const row = { x, ...z, G2: LG[i], ratio: LG[i] / z.Z2, frac: z.Z2 / LG[i], W };
  ROWS.push(row);
  log('  ' + String(x).padEnd(4) + String(z.B).padEnd(9) + String(z.k).padEnd(5) +
      String(z.head).padEnd(6) + String(z.Z2).padEnd(6) + String(z.tail).padEnd(7) +
      String(LG[i]).padEnd(8) + row.ratio.toFixed(4).padEnd(9) +
      row.frac.toFixed(4).padEnd(8) + String(W).padEnd(8) + (z.Z2 / W).toFixed(6));
}
const r47 = ROWS.filter(r => r.x >= 47).map(r => r.ratio.toFixed(4));
log('  G2/Z2 at x = 47..79: ' + r47.join('  '));
log('  Z2 at x = 47..79:    ' + ROWS.filter(r => r.x >= 47).map(r => r.Z2).join('  '));
let falls = 0; for (let i = 1; i < ROWS.length; i++) if (ROWS[i].ratio < ROWS[i - 1].ratio) falls++;
let falls47 = 0; const T47 = ROWS.filter(r => r.x >= 47);
for (let i = 1; i < T47.length; i++) if (T47[i].ratio < T47[i - 1].ratio) falls47++;
log(`  falls over all 22 terms: ${falls};  over x = 47..79: ${falls47}`);
log(`  ratio at x = 79: ${ROWS[21].ratio.toFixed(4)};  max over 22 terms: ` +
    Math.max(...ROWS.map(r => r.ratio)).toFixed(4) + ' at x = ' +
    ROWS.reduce((a, b) => a.ratio > b.ratio ? a : b).x);

log('');
log('=== SECTION B3. HOW THE PRICE GROWS, WITH NO SINGLE FORM QUOTED =========');
// The caveat is the reading, not a footnote: 22 terms over a staircase-driven
// quantity cannot separate these forms, and zonegap-01.md §4's one-class lesson
// (a fitted "exponent" is a range summary) applies here verbatim. Three
// normalisations are printed so the drift of each can be read against the
// others; none is fitted and none is offered as a law.
log('  x    G2/Z2    r/(x^2/ln^3 x)  r/(x^2/ln^4 x)  r/x       G2/x^2   Z2/ln^3(x\'^2)');
const NRM = [];
for (const r of ROWS) {
  if (r.x < 11) continue;
  const L = Math.log(r.x), q3 = r.ratio / (r.x * r.x / (L * L * L)),
        q4 = r.ratio / (r.x * r.x / (L * L * L * L)), qx = r.ratio / r.x,
        LB = Math.log(r.B);
  NRM.push({ x: r.x, q3, q4, qx });
  log('  ' + String(r.x).padEnd(5) + r.ratio.toFixed(4).padEnd(9) + q3.toFixed(4).padEnd(16) +
      q4.toFixed(4).padEnd(16) + qx.toFixed(4).padEnd(10) +
      (r.G2 / (r.x * r.x)).toFixed(4).padEnd(9) + (r.Z2 / (LB * LB * LB)).toFixed(4));
}
const rng = (f) => { const v = NRM.map(f); return `${Math.min(...v).toFixed(4)}..${Math.max(...v).toFixed(4)}` +
  `  first ${v[0].toFixed(4)} last ${v[v.length - 1].toFixed(4)}  drift ${((v[v.length - 1] / v[0] - 1) * 100).toFixed(1)}%`; };
log('  r/(x^2/ln^3 x) over x = 11..79: ' + rng(o => o.q3));
log('  r/(x^2/ln^4 x) over x = 11..79: ' + rng(o => o.q4));
log('  r/x            over x = 11..79: ' + rng(o => o.qx));
const rng2 = (f) => { const v = NRM.filter(o => o.x >= 23).map(f);
  return `${Math.min(...v).toFixed(4)}..${Math.max(...v).toFixed(4)}` +
  `  first ${v[0].toFixed(4)} last ${v[v.length - 1].toFixed(4)}  drift ${((v[v.length - 1] / v[0] - 1) * 100).toFixed(1)}%`; };
log('  restricted to x = 23..79, dropping the four-term head:');
log('    r/(x^2/ln^3 x): ' + rng2(o => o.q3));
log('    r/(x^2/ln^4 x): ' + rng2(o => o.q4));
log('    r/x           : ' + rng2(o => o.qx));
log('  levels with Z2 = G2 (the reduction lossless): ' +
    ROWS.filter(r => r.Z2 === r.G2).map(r => r.x).join(', '));

log('');
log('=== SECTION B2. WHERE THE TILE\'S LEAST ATTAINING POSITION SITS ==========');
const primesUpTo = (x) => SP.out.filter(p => p <= x);
const primorial = (x) => primesUpTo(x).reduce((a, p) => a * BigInt(p), 1n);
function isSlot(r, x) {
  for (const q of primesUpTo(x)) { const Q = BigInt(q);
    if (r % Q === 0n) return false; if ((r + 2n) % Q === 0n) return false; }
  return true;
}
log('  x   pos                 mult  in zone  in stratum  pos/x#    d_seam         d_seam/S   d_mirror/x#  partner');
const SEAMD = [];
for (let i = 0; i < 14; i++) {
  const x = LP[i], [pos, mult] = POS[x], z = ROWS[i];
  const P = primorial(x), Sprev = primorial(x - 1);   // previous primorial = seam spacing
  const inZone = pos > BigInt(x) && pos < BigInt(z.B);
  const inStr = pos >= BigInt(x * x) && pos <= BigInt(2 * x * x);
  const m = pos % Sprev, dSeam = m < Sprev - m ? m : Sprev - m;
  // The Mirror-Sweep Lemma acts on GAPS, not on slots: a gap [s, s+G2] maps to
  // [W-2-s-G2, W-2-s], so the partner of an attaining position is
  //   sigmaGap(s) = (W - 2 - G2 - s) mod W,  W = x#.
  // Checked here by the lower certificate: the partner must be a twin slot whose
  // next twin slot is exactly G2 above. The naive "pos <= (W-2)/2" is FALSE and
  // was pre-registered wrongly; see §6.
  const partner = ((P - 2n - BigInt(z.G2) - pos) % P + P) % P;
  need(isSlot(partner, x), `x=${x}: mirror partner ${partner} is not a twin slot`);
  let st = 1n; while (!isSlot((partner + st) % P, x)) st++;
  need(st === BigInt(z.G2), `x=${x}: next slot above the mirror partner is +${st}, not +${z.G2}`);
  need(partner >= pos, `x=${x}: mirror partner below the reported least attaining position`);
  const centre = (P - 2n) / 2n, dMir = pos > centre ? pos - centre : centre - pos;
  const fPos = Number(pos) / Number(P), fSeam = Number(dSeam) / Number(Sprev);
  SEAMD.push({ x, fSeam });
  log('  ' + String(x).padEnd(4) + pos.toString().padEnd(20) + String(mult).padEnd(6) +
      (inZone ? 'YES' : 'no ').padEnd(9) + (inStr ? 'YES' : 'no ').padEnd(12) +
      fPos.toFixed(6).padEnd(10) + dSeam.toString().padEnd(15) +
      fSeam.toFixed(6).padEnd(11) + (Number(dMir) / Number(P)).toFixed(6).padEnd(13) + partner.toString());
}
const mean = (a) => a.reduce((u, v) => u + v, 0) / a.length;
const all14 = SEAMD.map(r => r.fSeam), big = SEAMD.filter(r => r.x >= 11).map(r => r.fSeam);
log(`  d_seam/S over all fourteen: mean ${mean(all14).toFixed(4)}, min ` +
    Math.min(...all14).toFixed(4) + ', max ' + Math.max(...all14).toFixed(4));
log(`  d_seam/S over x = 11..43 (ten terms, non-degenerate seams): mean ${mean(big).toFixed(4)}, min ` +
    Math.min(...big).toFixed(4) + ', max ' + Math.max(...big).toFixed(4));
const low = [23, 29, 31, 37, 41, 43].filter(x => Number(POS[x][0]) / Number(primorial(x)) < 0.25);
log(`  of x = 23..43, terms with pos/x# < 0.25: ${low.length} of 6 (${low.join(', ')})`);
log(`  positions inside their zone: ${LP.slice(0, 14).filter(x => POS[x][0] > BigInt(x) && POS[x][0] < BigInt(ROWS[LP.indexOf(x)].B)).join(', ') || 'none'}`);
log(`  positions inside their stratum: ${LP.slice(0, 14).filter(x => POS[x][0] >= BigInt(x * x) && POS[x][0] <= BigInt(2 * x * x)).join(', ') || 'none'}`);

log('');
log('=== SECTION C. THE TIGHT CASE k = 2, SWEPT =============================');
// Zone list: every prime p with p'^2 <= X.
const RT = Math.floor(Math.sqrt(X)) + 1;
function primesTo(n) {
  const s = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return out;
}
const BASE = primesTo(RT + 10);
const ZONES = [];
for (let i = 0; i + 1 < BASE.length; i++) {
  const p = BASE[i], q = BASE[i + 1], B = q * q;
  if (B <= X) ZONES.push({ p, q, B }); else break;
}
const MAXP = ZONES[ZONES.length - 1].p;
log(`  X = ${X.toExponential(1)}   zones (p'^2 <= X): ${ZONES.length}   largest p = ${MAXP}`);

// Hardy-Littlewood expectation for a zone: lambda = 2*C2*int_p^{B-2} dt/ln^2 t.
function hlCount(a, b) {
  const N = 512, h = (b - a) / N; let s = 0;
  for (let i = 0; i <= N; i++) {
    const t = a + i * h, f = 1 / (Math.log(t) * Math.log(t));
    s += (i === 0 || i === N) ? f : (i % 2 ? 4 * f : 2 * f);
  }
  return 2 * C2 * s * h / 3;
}

// Small openers (a <= MAXP) held explicitly: the zone's left end never exceeds MAXP.
const SMALLOPEN = [];
{
  const sp = primesTo(MAXP + 4);
  const set = new Uint8Array(MAXP + 5); for (const q of sp) set[q] = 1;
  for (const q of sp) if (q + 2 <= MAXP + 4 && set[q + 2]) SMALLOPEN.push(q);
}

// Monotonic deque for the sliding-window maximum gap.
const DQ = 8192, dqL = new Float64Array(DQ), dqG = new Float64Array(DQ);
let dh = 0, dt = 0;                                   // [dh, dt)
function pushGap(left, g) {
  while (dt > dh && dqG[(dt - 1) % DQ] <= g) dt--;
  if (dt - dh >= DQ - 1) { log('  FAIL: deque overflow'); FAILS++; process.exit(1); }
  dqL[dt % DQ] = left; dqG[dt % DQ] = g; dt++;
}

let cnt = 0, lastOpener = -1, zi = 0, smallPtr = 0, mile = 0;
const OUT = [];
function closeZone() {
  const z = ZONES[zi];
  while (smallPtr < SMALLOPEN.length && SMALLOPEN[smallPtr] <= z.p) smallPtr++;
  const k = cnt - smallPtr;
  const first = SMALLOPEN[smallPtr];
  while (dt > dh && dqL[dh % DQ] <= z.p) dh++;
  const Z2 = dt > dh ? dqG[dh % DQ] : 0;
  const W = z.B - z.p, head = first - z.p, tail = z.B - lastOpener;
  if (head + Z2 + tail > W) { log(`  FAIL: R0 violated at p = ${z.p}`); FAILS++; }
  if (k === 2 && head + Z2 + tail !== W) { log(`  FAIL: k=2 but not tight at p = ${z.p}`); FAILS++; }
  OUT.push({ p: z.p, B: z.B, k, Z2, head, tail, W, tight: head + Z2 + tail === W });
  zi++;
}

// One segmented odd-only sieve; twin openers stream out in ascending order.
const SEG = 1 << 21;                                   // odd numbers per segment
const seg = new Uint8Array(SEG);
let prevPrime = false, prevN = 1;
for (let lo = 3; lo <= X && zi < ZONES.length; lo += 2 * SEG) {
  const hi = Math.min(lo + 2 * SEG - 2, X + 2);
  const len = Math.floor((hi - lo) / 2) + 1;
  seg.fill(0, 0, len);
  for (let i = 1; i < BASE.length; i++) {
    const q = BASE[i]; if (q * q > hi) break;
    let st = q * q; if (st < lo) { st = lo + ((q - (lo % q)) % q); if (st % 2 === 0) st += q; }
    for (let j = st; j <= hi; j += 2 * q) seg[(j - lo) >> 1] = 1;
  }
  for (let i = 0; i < len; i++) {
    const n = lo + 2 * i, isp = seg[i] === 0;
    if (isp && prevPrime && prevN === n - 2) {
      const a = n - 2;
      while (zi < ZONES.length && a + 2 >= ZONES[zi].B) closeZone();
      if (zi >= ZONES.length) break;
      cnt++; if (lastOpener >= 0) pushGap(lastOpener, a - lastOpener); lastOpener = a;
    }
    prevPrime = isp; prevN = n;
  }
  // Progress on a DETERMINISTIC milestone (each 5% of X), not on wall clock, so
  // the OUTPUT block is byte-reproducible and the embed gate is not forced by
  // timing noise. At X = 1e11 that is a line roughly every 17 s.
  while (mile < 20 && hi >= (mile + 1) * (X / 20)) {
    mile++;
    log(`  ... sieved to ${(mile * 5)}% of X, zones closed ${zi}/${ZONES.length}`);
  }
}
while (zi < ZONES.length && OUT.length < ZONES.length) closeZone();

// custody: the swept zones must reproduce section A's Z2, k, head, tail exactly
let agree = 0;
for (let i = 0; i < 14; i++) {
  const x = LP[i], o = OUT.find(r => r.p === x), z = ROWS[i];
  if (o && o.k === z.k && o.Z2 === z.Z2 && o.head === z.head && o.tail === z.tail) agree++;
  else { FAILS++; log(`  FAIL: sweep disagrees with section A at p = ${x}`); }
}
log(`  sweep reproduces section A at the fourteen custody levels: ${agree}/14`);
// Second witness across the WHOLE sweep: Z2(p) must equal env(p), the largest
// adopted A113274 record wholly inside the zone (zonegap-03-model.md, PROVEN
// conditional on the ladder). Valid only while p'^2 <= 1e11, the reach of the
// 41 inlined records.
{
  let same = 0, diff = [];
  for (const r of OUT) { const e = envOf(r.p, r.B); if (e === r.Z2) same++; else diff.push(r.p); }
  log(`  Z2 = env (adopted record ladder) at ${same}/${OUT.length} swept zones` +
      (diff.length ? `; disagreements at p = ${diff.slice(0, 10).join(', ')}` : ''));
  if (diff.length) FAILS++;
}

log('');
log('  decade   zones   k=2   min k (at p)      mean k        sum k        sum lambda   k/lambda   sum P(k=2)');
const DEC = {};
for (const r of OUT) {
  const d = Math.floor(Math.log10(r.p));
  if (!DEC[d]) DEC[d] = { n: 0, tight: 0, mink: Infinity, minp: 0, sk: 0, sl: 0, sp2: 0 };
  const D = DEC[d], lam = hlCount(r.p + 1, r.B - 2);
  D.n++; if (r.k === 2) D.tight++;
  if (r.k < D.mink) { D.mink = r.k; D.minp = r.p; }
  D.sk += r.k; D.sl += lam; D.sp2 += Math.exp(-lam) * lam * lam / 2;
}
let TN = 0, TT = 0, TK = 0, TL = 0, TP = 0;
for (const d of Object.keys(DEC).sort((a, b) => a - b)) {
  const D = DEC[d];
  TN += D.n; TT += D.tight; TK += D.sk; TL += D.sl; TP += D.sp2;
  log('  10^' + String(d).padEnd(6) + String(D.n).padEnd(8) + String(D.tight).padEnd(6) +
      (String(D.mink) + ' (' + D.minp + ')').padEnd(18) + (D.sk / D.n).toFixed(2).padEnd(14) +
      String(D.sk).padEnd(13) + D.sl.toFixed(1).padEnd(13) +
      (D.sk / D.sl).toFixed(4).padEnd(11) + D.sp2.toExponential(3));
}
log('  ' + '-'.repeat(100));
log(`  TOTAL     ${TN} zones, ${TT} with exactly two pairs, sum k = ${TK}, ` +
    `sum lambda = ${TL.toFixed(1)}, k/lambda = ${(TK / TL).toFixed(4)}`);
// The decade accumulator TP runs over EVERY zone, p = 2 included, so it is the
// all-p sum and must not be labelled "p >= 3". Both are printed, separately.
// (Correction 2026-08-29, redteam-0829-measure-a.md §1 M2.)
{
  let p2 = 0;
  for (const r of OUT) if (r.p === 2) { const lam = hlCount(r.p + 1, r.B - 2);
    p2 += Math.exp(-lam) * lam * lam / 2; }
  log(`  Poisson expectation of zones with exactly two pairs, ALL p: ${TP.toExponential(3)}` +
      `  (of which p = 2 alone contributes ${p2.toExponential(4)})`);
  log(`  the same restricted to p >= 3: ${(TP - p2).toExponential(3)}`);
}
{
  let s11 = 0, worst = { p: 0, v: 0 };
  for (const r of OUT) if (r.p >= 11) {
    const lam = hlCount(r.p + 1, r.B - 2), v = Math.exp(-lam) * lam * lam / 2;
    s11 += v; if (v > worst.v) worst = { p: r.p, v };
  }
  log(`  the same restricted to p >= 11: ${s11.toExponential(3)}  ` +
      `(largest single zone ${worst.v.toExponential(3)} at p = ${worst.p})`);
}
log(`  zones with exactly two pairs and p >= 3: ${OUT.filter(r => r.p >= 3 && r.k === 2).length}`);
log(`  minimum k over p >= 3: ${Math.min(...OUT.filter(r => r.p >= 3).map(r => r.k))}`);
const mono = [];
{ let run = Infinity, breaks = 0;
  for (const r of OUT) { if (r.k < run) { run = r.k; } else if (r.k < run) breaks++; }
  let prev = -1, nonmono = 0;
  for (const r of OUT) { if (prev >= 0 && r.k < prev) nonmono++; prev = r.k; }
  mono.push(nonmono); log(`  zones whose k is below the previous zone's k: ${nonmono} of ${OUT.length}`); }
log(`  tight zones (head + Z2 + tail = width exactly): ${OUT.filter(r => r.tight).length}` +
    ` at p = ${OUT.filter(r => r.tight).map(r => r.p).join(', ') || 'none'}`);

log('');
log(`FAILS: ${FAILS}`);
log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/measure-g2z2-0829.js
//   invocation:  node research/measure-g2z2-0829.js
//   code-sha256: 29c00df6d5832768342839ed0e45c637b9cdc039371725108582ea8d7149e482
//   out-sha256:  93f0fbe51e5d657545baaca72a888a9a8dd852755df8668cbc71b1eee72743c8
//   body-lines:  142
//   forced:      2026-08-29, 0 of 363 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     320.6 s
// ============================================================================
// === SECTION A. CUSTODY: zonegap-01.md §5 reproduced =====================
//   x   x'   x'^2     k   head   Z2   tail   G2      G2/Z2   quoted  match  env  env=Z2
//   2   3    9        2   1      2    4      2       1.00    1.00    YES    2    YES
//   3   5    25       3   2      6    8      6       1.00    1.00    YES    6    YES
//   5   7    49       4   6      12   8      12      1.00    1.00    YES    12   YES
//   7   11   121      8   4      30   14     30      1.00    1.00    YES    30   YES
//   11  13   169      9   6      30   20     42      1.40    1.40    YES    30   YES
//   13  17   289      16  4      30   8      66      2.20    2.20    YES    30   YES
//   17  19   361      17  12     36   14     108     3.00    3.00    YES    36   YES
//   19  23   529      21  10     72   8      150     2.08    2.08    YES    72   YES
//   23  29   841      29  6      150  14     204     1.36    1.36    YES    150  YES
//   29  31   961      30  12     150  80     258     1.72    1.72    YES    150  YES
//   31  37   1369     41  10     150  50     348     2.32    2.32    YES    150  YES
//   37  41   1681     48  4      150  14     528     3.52    3.52    YES    150  YES
//   41  43   1849     50  18     150  62     546     3.64    3.64    YES    150  YES
//   43  47   2209     61  16     150  68     618     4.12    4.12    YES    150  YES
//   fourteen ratios reproduced digit for digit: YES
//
// === SECTION B. THE 22-TERM TABLE ========================================
//   x   x'^2     k    head  Z2    tail   G2      G2/Z2    Z2/G2   width   Z2/width
//   2   9        2    1     2     4      2       1.0000   1.0000  7       0.285714
//   3   25       3    2     6     8      6       1.0000   1.0000  22      0.272727
//   5   49       4    6     12    8      12      1.0000   1.0000  44      0.272727
//   7   121      8    4     30    14     30      1.0000   1.0000  114     0.263158
//   11  169      9    6     30    20     42      1.4000   0.7143  158     0.189873
//   13  289      16   4     30    8      66      2.2000   0.4545  276     0.108696
//   17  361      17   12    36    14     108     3.0000   0.3333  344     0.104651
//   19  529      21   10    72    8      150     2.0833   0.4800  510     0.141176
//   23  841      29   6     150   14     204     1.3600   0.7353  818     0.183374
//   29  961      30   12    150   80     258     1.7200   0.5814  932     0.160944
//   31  1369     41   10    150   50     348     2.3200   0.4310  1338    0.112108
//   37  1681     48   4     150   14     528     3.5200   0.2841  1644    0.091241
//   41  1849     50   18    150   62     546     3.6400   0.2747  1808    0.082965
//   43  2209     61   16    150   68     618     4.1200   0.2427  2166    0.069252
//   47  2809     74   12    168   8      708     4.2143   0.2373  2762    0.060825
//   53  3481     87   6     168   14     870     5.1786   0.1931  3428    0.049008
//   59  3721     91   12    168   50     966     5.7500   0.1739  3662    0.045877
//   61  4489     110  10    168   8      1080    6.4286   0.1556  4428    0.037940
//   67  5041     121  4     168   20     1284    7.6429   0.1308  4974    0.033776
//   71  5329     123  30    168   50     1398    8.3214   0.1202  5258    0.031951
//   73  6241     138  28    210   44     1530    7.2857   0.1373  6168    0.034047
//   79  6889     152  22    210   20     1710    8.1429   0.1228  6810    0.030837
//   G2/Z2 at x = 47..79: 4.2143  5.1786  5.7500  6.4286  7.6429  8.3214  7.2857  8.1429
//   Z2 at x = 47..79:    168  168  168  168  168  168  210  210
//   falls over all 22 terms: 3;  over x = 47..79: 1
//   ratio at x = 79: 8.1429;  max over 22 terms: 8.3214 at x = 71
//
// === SECTION B3. HOW THE PRICE GROWS, WITH NO SINGLE FORM QUOTED =========
//   x    G2/Z2    r/(x^2/ln^3 x)  r/(x^2/ln^4 x)  r/x       G2/x^2   Z2/ln^3(x'^2)
//   11   1.4000   0.1595          0.3825          0.1273    0.3471   0.2222
//   13   2.2000   0.2197          0.5634          0.1692    0.3905   0.1649
//   17   3.0000   0.2361          0.6689          0.1765    0.3737   0.1763
//   19   2.0833   0.1473          0.4338          0.1096    0.4155   0.2920
//   23   1.3600   0.0793          0.2485          0.0591    0.3856   0.4911
//   29   1.7200   0.0781          0.2629          0.0593    0.3068   0.4630
//   31   2.3200   0.0978          0.3357          0.0748    0.3621   0.3982
//   37   3.5200   0.1211          0.4371          0.0951    0.3857   0.3661
//   41   3.6400   0.1109          0.4118          0.0888    0.3248   0.3524
//   43   4.1200   0.1186          0.4459          0.0958    0.3342   0.3285
//   47   4.2143   0.1089          0.4192          0.0897    0.3205   0.3355
//   53   5.1786   0.1154          0.4581          0.0977    0.3097   0.3098
//   59   5.7500   0.1120          0.4566          0.0975    0.2775   0.3023
//   61   6.4286   0.1200          0.4934          0.1054    0.2902   0.2825
//   67   7.6429   0.1266          0.5322          0.1141    0.2860   0.2711
//   71   8.3214   0.1279          0.5450          0.1172    0.2773   0.2659
//   73   7.2857   0.1080          0.4633          0.0998    0.2871   0.3147
//   79   8.1429   0.1088          0.4756          0.1031    0.2740   0.3042
//   r/(x^2/ln^3 x) over x = 11..79: 0.0781..0.2361  first 0.1595 last 0.1088  drift -31.8%
//   r/(x^2/ln^4 x) over x = 11..79: 0.2485..0.6689  first 0.3825 last 0.4756  drift 24.3%
//   r/x            over x = 11..79: 0.0591..0.1765  first 0.1273 last 0.1031  drift -19.0%
//   restricted to x = 23..79, dropping the four-term head:
//     r/(x^2/ln^3 x): 0.0781..0.1279  first 0.0793 last 0.1088  drift 37.3%
//     r/(x^2/ln^4 x): 0.2485..0.5450  first 0.2485 last 0.4756  drift 91.4%
//     r/x           : 0.0591..0.1172  first 0.0591 last 0.1031  drift 74.3%
//   levels with Z2 = G2 (the reduction lossless): 2, 3, 5, 7
//
// === SECTION B2. WHERE THE TILE'S LEAST ATTAINING POSITION SITS ==========
//   x   pos                 mult  in zone  in stratum  pos/x#    d_seam         d_seam/S   d_mirror/x#  partner
//   2   1                   1     no       no          0.500000  0              0.000000   0.500000     1
//   3   5                   1     YES      no          0.833333  1              0.500000   0.500000     5
//   5   17                  2     YES      no          0.566667  1              0.166667   0.100000     29
//   7   71                  2     YES      YES         0.338095  11             0.366667   0.157143     107
//   11  899                 4     no       no          0.389177  59             0.280952   0.110390     1367
//   13  731                 12    no       no          0.024342  731            0.316450   0.475624     29231
//   17  701                 20    no       no          0.001373  701            0.023343   0.498625     509699
//   19  659                 20    no       YES         0.000068  659            0.001291   0.499932     9698879
//   23  76166567            4     no       no          0.341412  1430953        0.147526   0.158588     146926097
//   29  1205437109          2     no       no          0.186321  89972759       0.403297   0.313679     5264255861
//   31  8813641451          4     no       no          0.043945  2343948221     0.362297   0.456055     191746848329
//   37  544899485411        2     no       no          0.073429  56781984979    0.283117   0.426571     6875838648869
//   41  3784200788231       4     no       no          0.012438  3636537346579  0.490051   0.487562     300466062738431
//   43  830330079152051     8     no       no          0.063467  82420711429579 0.270898   0.436533     12252431252517359
//   d_seam/S over all fourteen: mean 0.2580, min 0.0000, max 0.5000
//   d_seam/S over x = 11..43 (ten terms, non-degenerate seams): mean 0.2579, min 0.0013, max 0.4901
//   of x = 23..43, terms with pos/x# < 0.25: 5 of 6 (29, 31, 37, 41, 43)
//   positions inside their zone: 3, 5, 7
//   positions inside their stratum: 7, 19
//
// === SECTION C. THE TIGHT CASE k = 2, SWEPT =============================
//   X = 1.0e+11   zones (p'^2 <= X): 27292   largest p = 316219
//   ... sieved to 5% of X, zones closed 7005/27292
//   ... sieved to 10% of X, zones closed 9592/27292
//   ... sieved to 15% of X, zones closed 11519/27292
//   ... sieved to 20% of X, zones closed 13131/27292
//   ... sieved to 25% of X, zones closed 14528/27292
//   ... sieved to 30% of X, zones closed 15770/27292
//   ... sieved to 35% of X, zones closed 16923/27292
//   ... sieved to 40% of X, zones closed 17983/27292
//   ... sieved to 45% of X, zones closed 18984/27292
//   ... sieved to 50% of X, zones closed 19909/27292
//   ... sieved to 55% of X, zones closed 20790/27292
//   ... sieved to 60% of X, zones closed 21630/27292
//   ... sieved to 65% of X, zones closed 22431/27292
//   ... sieved to 70% of X, zones closed 23192/27292
//   ... sieved to 75% of X, zones closed 23945/27292
//   ... sieved to 80% of X, zones closed 24667/27292
//   ... sieved to 85% of X, zones closed 25352/27292
//   ... sieved to 90% of X, zones closed 25996/27292
//   ... sieved to 95% of X, zones closed 26660/27292
//   ... sieved to 100% of X, zones closed 27292/27292
//   sweep reproduces section A at the fourteen custody levels: 14/14
//   Z2 = env (adopted record ladder) at 27292/27292 swept zones
//
//   decade   zones   k=2   min k (at p)      mean k        sum k        sum lambda   k/lambda   sum P(k=2)
//   10^0     4       1     2 (2)             4.25          17           23.3         0.7285     4.172e-1
//   10^1     21      0     9 (11)            84.43         1773         1847.8       0.9595     4.649e-4
//   10^2     143     0     208 (101)         3226.54       461395       466075.2     0.9900     1.472e-87
//   10^3     1061    0     8332 (1009)       170081.07     180456020    180459130.7  1.0000     0.000e+0
//   10^4     8363    0     440825 (10007)    10436977.08   87284439305  87356313381.80.9992     0.000e+0
//   10^5     17700   0     27420901 (100003) 109968097.59  19464353274041948281720654.50.9991     0.000e+0
//   ----------------------------------------------------------------------------------------------------
//   TOTAL     27292 zones, 1 with exactly two pairs, sum k = 2033900685914, sum lambda = 2035818961113.3, k/lambda = 0.9991
//   Poisson expectation of zones with exactly two pairs, ALL p: 4.177e-1  (of which p = 2 alone contributes 2.6586e-1)
//   the same restricted to p >= 3: 1.518e-1
//   the same restricted to p >= 11: 4.649e-4  (largest single zone 4.579e-4 at p = 11)
//   zones with exactly two pairs and p >= 3: 0
//   minimum k over p >= 3: 3
//   zones whose k is below the previous zone's k: 0 of 27292
//   tight zones (head + Z2 + tail = width exactly): 1 at p = 2
//
// FAILS: 0
// elapsed 320.5 s
// ============================================================================
// READINGS
// ============================================================================
// Written after the output above was read. Calibration on every line. The
// pre-registration is research/history/staging/measure-g2z2-0829.md §1, on disk
// before this file existed; custody is disk order, not a commit.
//
// 0. WHAT IS WRONG HERE FIRST. Eight of the 22 rows (x = 47..79) rest on
//    single-witness data, A144311 terms 15-22 (Alekseyev 2009, Wang 2024),
//    with no independent computation on disk; every ratio above x = 43
//    inherits that doubt exactly. The positional columns of SECTION B2 report
//    the LEAST attaining position, which is a selected member of a set of size
//    up to 20, so the seam and mirror-distance readings are confounded and are
//    WITHDRAWN below. The Poisson arm of SECTION C is a model whose only
//    calibration here is the first moment; a first-moment agreement says
//    nothing about the tail at k = 2, and the variance check was not run.
//    CORRECTION, 2026-08-29, source research/history/staging/redteam-0829-measure-a.md
//    §1 item M2 (REFUTED): the first version of this file accumulated the
//    Poisson sum over every decade, p = 2 included, and printed it under the
//    label "p >= 3". The label was wrong, not the arithmetic. p = 2 alone
//    contributes 2.6586e-1 of it (lambda = 2.2801), so the all-p sum is
//    4.177e-1 and the correct p >= 3 sum is 1.518e-1. Both are now printed and
//    separately labelled. Reading 10 and the note's §4 M2 carry the corrected
//    figure; the MISS verdict is unchanged, since 1.518e-1 is as far above the
//    pre-registered 1e-6 as 4.177e-1 was. This embed was therefore FORCED a
//    second time, on an intended code change.
//    The first embed was FORCED: the 21 figures the gate could not reproduce are
//    all wall-clock progress lines from the superseded block, replaced here by
//    deterministic 5%-of-X milestones so that future embeds are byte-stable.
//    Readings-traceability advisory (embed.js --check): 6 figures below have no
//    literal source in the block. Three are prose reformattings (1e11 for the
//    block's 1.0e+11; 2.0339e12 and 2.0358e12 for the block's full-precision
//    sum k and sum lambda) and three are external (0.97 and 1.03, the
//    pre-registered band; 4.26645, the exponent band's upper end from
//    G2-STATE.md). Accepted under the advisory's known floor.
//
// 1. CUSTODY HOLDS AT EVERY REACHABLE POINT [VERIFIED]. The fourteen G2/Z2
//    values of zonegap-01.md §5 reproduce digit for digit, 14 of 14, from
//    prime data alone. A second engine, env(p) from the adopted A113274
//    ladder, agrees at all fourteen and at 27,292 of 27,292 swept zones. The
//    sweep closes 27,292 zones at X = 1e11, the count zonegap-01.md reports,
//    and reproduces its own SECTION A rows (k, Z2, head, tail) 14 of 14.
//    FAILS: 0.
//
// 2. THE PRICE OF THE REDUCTION, EXTENDED FROM 14 LEVELS TO 22 [MEASURED].
//    G2/Z2 runs 1.0000 at x = 2..7, then 1.40 to 4.12 at x = 11..43 (the
//    corpus range), then 4.2143, 5.1786, 5.7500, 6.4286, 7.6429, 8.3214,
//    7.2857, 8.1429 at x = 47..79. The maximum over the 22 terms is 8.3214 at
//    x = 71, NOT at the last term. Three falls, at x = 19, 23 and 73.
//
// 3. THE SHAPE IS THE STAIRCASE, AND THAT IS ALL IT IS [MEASURED]. Z2 = env is
//    a staircase (30, 36, 72, 150, 168, 210 over x = 11..79) while G2 rises at
//    every level, so the ratio must rise between steps and can fall at one.
//    The staircase takes five steps over that range and the three falls sit at
//    three of them (x = 19, 23, 73); at the other two, x = 17 and x = 47, the
//    step is too small to overturn G2's own rise. Nothing here is a law about
//    either object.
//
// 4. NO SINGLE GROWTH FORM SHOULD BE QUOTED [MEASURED, with the range summary
//    that replaces a fit]. Over x = 11..79, r/(x^2/ln^3 x) drifts -31.8%,
//    r/(x^2/ln^4 x) +24.3%, r/x -19.0%. Dropping the four-term head, over
//    x = 23..79 all three rise: +37.3%, +91.4%, +74.3%. So the truth sits
//    between the ln^3 and ln^4 corrections and the head dominates the sign;
//    this is zonegap-01.md §4's one-class lesson repeating, and no exponent is
//    claimed. The matched control (the same normalisations on a synthetic
//    staircase with the same step positions) was NOT run.
//
// 5. THE REDUCTION IS LOSSLESS AT FOUR LEVELS AND AT NO OTHER MEASURED ONE
//    [MEASURED at 22 levels; the mechanism PROVEN]. Z2 = G2 at x = 2, 3, 5, 7
//    only. By the Zone Restriction Lemma a gap of length G2 lying wholly
//    inside the zone forces Z2 = G2, so Z2 < G2 at x = 11..79 PROVES that no
//    gap of length G2(x#) lies wholly inside the zone at any of those eighteen
//    levels. That answers object-bridge-read-0829.md §7 Q2 in its strong form
//    without using any argmax data.
//
// 6. THE ZONE-REALISED FRACTION FALLS TO ABOUT AN EIGHTH [MEASURED]. Z2/G2 =
//    1.0000 to x = 7, then falls to 0.1228 at x = 79, non-monotonically (the
//    same three steps). This is object-g2-read-0829.md §8 Q7's descriptive
//    half; its (iii) caveat stands, since the zone is where a twin slot is a
//    twin prime.
//
// 7. THE LEAST ATTAINING POSITION LEAVES THE ZONE AT x = 11 [MEASURED, and
//    weaker than reading 5]. It lies in (x, x'^2) at x = 3, 5, 7 and nowhere
//    above; in the stratum [x^2, 2x^2] at x = 7 and x = 19 only. pos/x# is
//    below 0.25 at 5 of the 6 terms x = 23..43. All of this is about one
//    selected member of the argmax set, per reading 0.
//
// 8. THE MIRROR CERTIFICATE, AFTER A PRE-REGISTERED THEOREM WAS REFUTED
//    [VERIFIED 14 of 14; the pre-registered form REFUTED]. The note's §1
//    asserted pos <= (x# - 2)/2 as a consequence of the Mirror-Sweep Lemma.
//    That is FALSE and the assertion fired at x = 2, 3, 5. The lemma acts on
//    slots and its induced map on gaps carries the gap length, so the partner
//    is (x# - 2 - G2 - pos) mod x#; the reduction mod x# destroys any ordering
//    claim. The corrected partner is exhibited and checked by trial division
//    at all fourteen levels: it is a twin slot whose next twin slot is exactly
//    G2 above, and it is never below pos.
//
// 9. R0's TIGHT CASE IS NOT OBSERVED ABOVE THE FIRST ZONE [MEASURED to 1e11].
//    Zones with p >= 3 holding exactly two pairs: 0 of 27,292. The only tight
//    zone is the degenerate p = 2 (1 + 2 + 4 = 7 = width). Minimum pair count
//    over p >= 3 is 3, at p = 3, and k is non-decreasing across all 27,292
//    zones. So head + Z2 + tail = width is an equality nowhere measured above
//    the first zone, and (R0)'s hypothesis k >= 3 holds everywhere measured.
//
// 10. THE MODEL'S FIRST MOMENT IS CALIBRATED AND ITS PREDICTION FOR THE TIGHT
//    CASE MISSED THE PRE-REGISTERED THRESHOLD [MEASURED / model]. sum k /
//    sum lambda = 0.9991 over 27,292 zones (2.0339e12 pairs against 2.0358e12
//    expected), inside the pre-registered [0.97, 1.03]. The summed Poisson
//    probability of a k = 2 zone is 1.518e-1 over p >= 3 (4.177e-1 over all p,
//    of which the degenerate p = 2 alone is 2.6586e-1) and 4.649e-4 over
//    p >= 11, against a pre-registered "below 1e-6": a MISS caused by setting
//    the threshold without looking at the smallest zones, where lambda is of
//    order 10 rather than astronomical.
//
// 11. NOTHING HERE IS A BOUND. Every number above is label (i). An UPPER bound
//    on G2/Z2 combined with any Z2 bound below the zone width would be (ii),
//    TPC-strength; no such bound is claimed, attempted, or in evidence, and
//    the measured trend runs the wrong way for one. The wall is unchanged: the
//    G2 exponent band stays (2, 4.26645], and Z2 has no band below the zone
//    width that is not TPC.
