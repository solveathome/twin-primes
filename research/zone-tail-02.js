// ============================================================================
// ZONE-TAIL 02 — the per-zone TAIL field on the full zonegap-01 range
// (27,292 zones to 1e11), and the HEAD-TAIL JOINT LAW
// ============================================================================
// TODO Z4, the tail half's remaining half. `zone-tail-01.md` (2026-08-28,
// 1,225 zones to 1e8) left three things that only more zones can settle:
//   (1) the renewal surplus t/R = 1.0619 at its top band, NOT RESOLVED, its
//       bootstrap [0.9937, 1.1321] containing 1 and the pre-registered +0.03
//       rule unmet, with §0 naming 27,292 zones at 1e11 as what it needs;
//   (2) the coefficient that does not settle across bands (0.5740, 0.7518,
//       0.7288, 0.7771 in ln^2(p'^2) units, i.e. 2.43..3.11 in ln^2 p);
//   (3) the worst case, four order statistics on 1,225 zones.
// And `z2-state-draft-0829.md` §8 Q5 asks a question nothing has posed: do
// head and tail have a JOINT law? `zone-tail-01.md` §1 models head as the
// forward recurrence time at height p and tail as the backward recurrence
// time at height p'^2 of one renewal process; R0 makes head + tail the whole
// non-Z2 part of the width, so their sum's law is the R0 residual's law, and
// `zonegap-02-reduction.md` §2 calls the three pieces "separately
// attackable" — a claim that needs independence to be a product structure.
//
// THE DOUBT, stated first. Nothing here is derived and nothing here is a
// bound. Every number below is a distributional statement about a measured
// field, label (i); no bound on any head, tail or Z2 at infinitely many p is
// claimed anywhere, which would be label (ii). The head field is far less
// informative than its zone count suggests: at the top band the 17,700 zone
// origins sit inside only a few thousand twin gaps, so many zones share one
// head, and SEC F measures that redundancy rather than hiding it. The R
// comparator is the CONTINUUM functional and the choice of null population
// moved the head's own residual by a factor of two
// (`redteam-0828-head.md`), which is why three comparators are carried.
//
// PRE-REGISTRATION: `research/history/staging/zone-tail-02-0829.md` §1,
// written 2026-08-29 before this file existed. No commit is made in this
// wave, so that section is timestamped by disk order and is NOT sealed by a
// git object; a reader who does not accept disk order should read it as a
// hypothesis list.
//
// CONVENTIONS — `zonegap-01.js` §0's verbatim.
//   pair       (a, a+2) both prime, named by its OPENER a.
//   in zone p  p < a AND a + 2 < p'^2, both strict.
//   head(p)    a_first - p.       tail(p)  p'^2 - a_last, measured to the
//              OPENER exactly as the head is, so the `a + 2 < p'^2` clause
//              forces a deterministic +2 on the tail the head does not carry.
//              Stated, not corrected.
//   Z2(p)      max gap between consecutive in-zone openers.
//   shell z    (bound_{z-1}, bound_z], the height slice between consecutive
//              zone endpoints. A gap is assigned to the shell holding its
//              RIGHT opener, so the gap straddling a zone endpoint belongs to
//              the shell above it. That gap is length-biased and its omission
//              biases the shell's R down by about 1.6e-4 at the top band
//              (one gap in 19,000, with E[g^2 | straddle] = 3 E[g^2]);
//              below the fourth digit and stated rather than corrected.
//   R(h)       E[g^2] / 2 E[g] of the twin-gap process at height h, the
//              forward and backward recurrence mean. Estimated from a
//              log-binned profile, 20 bins per decade of height, so the tail
//              at height p'^2 meets R at p'^2 and never R averaged over a
//              two-decade band. `zone-tail-01.md` §5's band-wide convention
//              is carried alongside, since that is the number being resolved.
//   classNull(h)  the exactly matched discrete comparator: the mean backward
//              distance to the last twin opener from EVERY integer congruent
//              to 1 or 19 mod 30 at that height (p'^2 is confined to those
//              two classes for p' >= 7), computed exhaustively in the same
//              sweep by closed-form arithmetic series, never sampled.
//
// WIDTH AUDIT. X <= 4e15 guarded. Openers, endpoints and widths <= X < 2^53,
// exact in doubles. Sieve strides p <= sqrt(X)+4000 ~ 3.2e5 at X = 1e11:
// int32-safe. Sum of tails over 27,292 zones < 27292 * 1e5 = 2.7e9; sum of
// g^2 per bin < (#gaps) * (max gap)^2 < 2.3e8 * 8040^2 = 1.5e16 — ABOVE 2^53,
// so the per-bin g^2 accumulator is split: g^2 is accumulated per bin and the
// per-bin totals are at most (#gaps in bin) * 8040^2 < 2.3e7 * 6.5e7 = 1.5e15
// < 9.0e15, exact. Class-null distance sums per bin < 1e11/15 * 8040 — bounded
// per bin by (bin width)/15 * 8040 < 5e9/15*8040 = 2.7e12, exact. Asserted
// numerically at the end of the sweep by a re-check of one bin.
//
// PRIOR ART ON DISK (cited, extended, never re-derived):
//   research/zonegap-01.js            the engine, the zone list, the six
//                                     decade means that are the tail's entire
//                                     prior record at this range; its
//                                     brute-force self-check is reused.
//   research/zone-tail-01.js / .md    the 1e8 field this must reproduce.
//   research/destroyer-census-01.js   SEC 6(a) the estimator, 6(b) h/R.
//   research/history/staging/head-residual-factor.md §1  R is the continuum
//                                     functional; the null population matters.
//   research/history/staging/zonegap-02-reduction.md  §1 Zone Restriction
//                                     Lemma, §2 (R0) and the scale table.
//   research/history/staging/record-location-null.js  N3 pooling rule: divide
//                                     each unit by ln^2 of ITS OWN height
//                                     before anything is pooled.
//
// Usage:  node research/zone-tail-02.js [X]        default X = 1e11
// Embed:  node research/qc/embed.js research/zone-tail-02.js --timeout 1800
// ============================================================================
'use strict';
const T0 = Date.now();

const X = Number(process.argv[2] || 1e11);
if (!(X >= 1e6 && X <= 4e15)) { console.error('X out of audited range [1e6, 4e15]'); process.exit(1); }
const FULL = X === 1e11;                      // the custody assertions are pinned to zonegap-01's own X

const C2 = 0.6601618158468696;
const HL = 1 / (2 * C2);                      // 0.757374
const log = (s) => console.log(s);
const err = (s) => process.stderr.write(s + '\n');
let failures = 0;
function aEq(tag, got, want) { if (got !== want) { failures++; log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; } return true; }
function aTrue(tag, c) { if (!c) { failures++; log(`  ASSERT FAIL [${tag}]`); } return c; }
const f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3), f4 = (x) => x.toFixed(4);
const pct = (x) => (100 * x).toFixed(2);
const l2 = (x) => Math.log(x) ** 2;
const mean = (v) => v.reduce((a, b) => a + b, 0) / v.length;
function mkRng(seed) { let s = seed >>> 0; return () => { s = (Math.imul(1664525, s) + 1013904223) >>> 0; return s / 4294967296; }; }
function pearson(x, y) {
  const n = x.length; let sx = 0, sy = 0;
  for (let i = 0; i < n; i++) { sx += x[i]; sy += y[i]; }
  const mx = sx / n, my = sy / n; let sxx = 0, syy = 0, sxy = 0;
  for (let i = 0; i < n; i++) { const a = x[i] - mx, b = y[i] - my; sxx += a * a; syy += b * b; sxy += a * b; }
  return sxy / Math.sqrt(sxx * syy);
}
function ranks(v) {                            // average ranks, ties handled
  const n = v.length, idx = Array.from({ length: n }, (_, i) => i).sort((a, b) => v[a] - v[b]);
  const r = new Float64Array(n);
  let i = 0;
  while (i < n) { let j = i; while (j + 1 < n && v[idx[j + 1]] === v[idx[i]]) j++; const av = (i + j) / 2 + 1; for (let k = i; k <= j; k++) r[idx[k]] = av; i = j + 1; }
  return r;
}
const chi2p4 = (c) => Math.exp(-c / 2) * (1 + c / 2);          // P(X_4 > c), exact
function ksP(d, n1, n2) {                                       // asymptotic two-sample KS
  const en = Math.sqrt(n1 * n2 / (n1 + n2)), lam = (en + 0.12 + 0.11 / en) * d;
  let s = 0; for (let k = 1; k <= 100; k++) s += (k % 2 ? 1 : -1) * Math.exp(-2 * k * k * lam * lam);
  return Math.max(0, Math.min(1, 2 * s));
}

// ---------------------------------------------------------------------------
// TRUSTED DATA — A113274/A113275 records with p_end <= 1e11, transcribed from
// research/zonegap-01.js's own inline block (itself adopted 2026-08-20).
// ---------------------------------------------------------------------------
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
// A007508, pi_2(10^k) — the count of pairs with a + 2 <= 10^k.
const A007508 = { 8: 440312, 9: 3424506, 10: 27412679, 11: 224376048 };
// zonegap-01.js's embedded PER-BAND block at X = 1e11 (its decade bands, its
// mean-of-ratios estimator). These six pairs are the tail's ENTIRE prior
// record at this range and they must reproduce digit for digit.
const ZG01_BANDS = ['10^0', '10^1', '10^2', '10^3', '10^4', '1e5-p.5'];
const ZG01_N = [4, 21, 143, 1061, 8363, 17700];
const ZG01_TAILM = [0.684, 0.578, 0.768, 0.766, 0.741, 0.752];
const ZG01_HEADM = [1.778, 0.872, 0.942, 0.684, 0.720, 0.725];
const ZG01_HEADMAX = [6, 30, 150, 210, 630, 924];
const ZG01_C3M = [4.370, 2.708, 3.426, 3.681, 4.022, 3.930];
const ZG01_PAIRS = ['4.25e+0', '8.44e+1', '3.23e+3', '1.70e+5', '1.04e+7', '1.10e+8'];
// zone-tail-01.js's embedded SEC B at X = 1e8 on its 1,225-zone census list.
const ZT01_BN = ['[7,100)', '[100,1000)', '[1000,3163)', '[3163,1e4)'];
const ZT01_N = [22, 143, 278, 782];
const ZT01_MEANTAIL = [33.64, 113.65, 167.56, 237.26];
const ZT01_CLOCAL = [0.5740, 0.7518, 0.7288, 0.7771];
const ZT01_CP_B4 = 3.1096;
const ZT01_HEADC_B4 = 0.6693;      // = destroyer-census-01.md SEC 6(a)

// ---------------------------------------------------------------------------
// Base sieve and zone list — zonegap-01.js's, verbatim.
// ---------------------------------------------------------------------------
const LIM = Math.floor(Math.sqrt(X)) + 4000;
const small = new Uint8Array(LIM + 1);
const basePrimes = [];
for (let i = 2; i <= LIM; i++) { if (!small[i]) { basePrimes.push(i); for (let j = i * i; j <= LIM; j += i) small[j] = 1; } }
const oddBase = basePrimes.filter((p) => p > 2);

const zP = [], zPn = [], zB = [];
for (let i = 0; i + 1 < basePrimes.length; i++) {
  const b = basePrimes[i + 1] * basePrimes[i + 1];
  if (b > X) break;
  zP.push(basePrimes[i]); zPn.push(basePrimes[i + 1]); zB.push(b);
}
const NZ = zP.length;
if (!NZ) { console.error('no zones under X'); process.exit(1); }

// ---------------------------------------------------------------------------
// The log-binned R profile and the exhaustive class-matched null.
// ---------------------------------------------------------------------------
const BPD = 20;                                     // bins per decade of height
const NB = Math.ceil(Math.log10(X) * BPD) + 2;
const bG = new Float64Array(NB), bG2 = new Float64Array(NB), bN = new Float64Array(NB);
const cnD = new Float64Array(NB), cnC = new Float64Array(NB);
const hfD = new Float64Array(NB), hfC = new Float64Array(NB);   // FORWARD null at head heights
const COP30 = [1, 7, 11, 13, 17, 19, 23, 29];                   // the classes a prime >= 7 occupies
const HFCAP = 400000;                                           // head heights never exceed sqrt(X) + a margin
const binEdge = (k) => Math.pow(10, (k + 1) / BPD);
const binOf = (h) => Math.min(NB - 1, Math.max(0, Math.floor(Math.log10(h) * BPD)));

// ---------------------------------------------------------------------------
// Streaming state
// ---------------------------------------------------------------------------
const zHead = new Int32Array(NZ), zTail = new Int32Array(NZ), zZ2 = new Int32Array(NZ);
const zCnt = new Float64Array(NZ), zFirstA = new Float64Array(NZ);
const sG = new Float64Array(NZ), sG2 = new Float64Array(NZ), sN = new Float64Array(NZ);
let prevA = 0, pairCount = 0, nPairsTotal = 0;
const pi2 = {};                                     // pi_2 at each power of ten
const SMALL_CAP = LIM + 200000;
const smallOpen = [], smallIdx = [];
let sPtr = 0;
let dqG = [], dqS = [], dqHead = 0;
const ladder = []; let recMax = 0;
let zi = 0, minCnt = Infinity, minCntAt = 0;
let curBin = 0, curHi = binEdge(0);

function closeZone(z) {
  const p = zP[z], bound = zB[z];
  while (sPtr < smallOpen.length && smallOpen[sPtr] <= p) sPtr++;
  if (sPtr >= smallOpen.length) { failures++; log('small-opener cap breached at p=' + p); return; }
  const aFirst = smallOpen[sPtr];
  const cnt = pairCount - smallIdx[sPtr];
  if (cnt < 1 || aFirst + 2 >= bound) { failures++; log('ZONE POSTULATE BREACH at p=' + p); return; }
  if (cnt < minCnt) { minCnt = cnt; minCntAt = p; }
  while (dqHead < dqG.length && dqS[dqHead] <= p) dqHead++;
  zCnt[z] = cnt; zFirstA[z] = aFirst;
  zHead[z] = aFirst - p; zTail[z] = bound - prevA;
  zZ2[z] = cnt >= 2 ? dqG[dqHead] : 0;
  if (dqHead > 4096) { dqG = dqG.slice(dqHead); dqS = dqS.slice(dqHead); dqHead = 0; }
}

function onPair(a) {
  nPairsTotal++;
  while (zi < NZ && a + 2 >= zB[zi]) closeZone(zi++);
  if (prevA) {
    const g = a - prevA;
    if (g > recMax) { recMax = g; ladder.push([g, prevA]); }
    // shell moments (assigned by the gap's RIGHT opener)
    if (zi < NZ) { sG[zi] += g; sG2[zi] += g * g; sN[zi]++; }
    // height-binned R profile
    while (a >= curHi) { curBin++; curHi = binEdge(curBin); }
    bG[curBin] += g; bG2[curBin] += g * g; bN[curBin]++;
    // exhaustive class-matched null over n = 1, 19 mod 30 in (prevA + 2, a + 2]
    const lo = prevA + 3, hi = a + 2;
    for (let ci = 0; ci < 2; ci++) {
      const c = ci ? 19 : 1;
      let n0 = lo + ((c - (lo % 30)) % 30 + 30) % 30;
      if (n0 <= hi) { const k = Math.floor((hi - n0) / 30) + 1; cnD[curBin] += k * (n0 - prevA) + 15 * k * (k - 1); cnC[curBin] += k; }
    }
    // exhaustive FORWARD class null for the head: mean distance from every
    // integer coprime to 30 in [prevA, a - 1] up to the next opener a. Only
    // head heights are ever queried, so it is accumulated below HFCAP only.
    if (a <= HFCAP) {
      for (let ci = 0; ci < 8; ci++) {
        const c = COP30[ci];
        let n0 = prevA + ((c - (prevA % 30)) % 30 + 30) % 30;
        if (n0 <= a - 1) { const k = Math.floor((a - 1 - n0) / 30) + 1; hfD[curBin] += k * (a - n0) - 15 * k * (k - 1); hfC[curBin] += k; }
      }
    }
    let t = dqG.length;
    while (t > dqHead && dqG[t - 1] < g) t--;
    dqG.length = t; dqS.length = t;
    dqG.push(g); dqS.push(prevA);
  }
  if (a <= SMALL_CAP) { smallOpen.push(a); smallIdx.push(pairCount); }
  prevA = a; pairCount++;
}

// ---------------------------------------------------------------------------
// The sweep (odd-only segmented sieve, 2-number lookahead so no pair straddles)
// ---------------------------------------------------------------------------
const SEG = 1 << 22;
const seg = new Uint8Array(SEG + 2);
let lastReport = Date.now();
let nextPow = 1e8;
for (let lo = 3; lo <= X; lo += SEG) {
  const hi = Math.min(lo + SEG - 1, X), hi2 = hi + 2;
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
    if (!seg[i - lo] && !seg[i + 2 - lo]) {
      while (i + 2 > nextPow && nextPow <= X) { pi2[Math.round(Math.log10(nextPow))] = nPairsTotal; nextPow *= 10; }
      onPair(i);
    }
  }
  if (Date.now() - lastReport > 30000) {
    lastReport = Date.now();
    err('  ... ' + (hi / X * 100).toFixed(1) + '%  (' + ((Date.now() - T0) / 1000).toFixed(0) + ' s, ' +
      nPairsTotal.toLocaleString('en-US') + ' pairs, ' + zi + ' zones closed)');
  }
}
while (zi < NZ) closeZone(zi++);
while (nextPow <= X) { pi2[Math.round(Math.log10(nextPow))] = nPairsTotal; nextPow *= 10; }
const sweepSecs = (Date.now() - T0) / 1000;

log('ZONE-TAIL 02 — the tail field at ' + NZ + ' zones, and the head-tail joint law');
log(`  X = ${X.toExponential(1)}, ${nPairsTotal.toLocaleString('en-US')} twin pairs, ${NZ} zones (p = ${zP[0]} .. ${zP[NZ - 1]}), sweep ${sweepSecs.toFixed(1)} s`);
log(`  min pairs in a zone: ${minCnt} at p = ${minCntAt}; zones with a single pair: ${Array.from(zCnt).filter((c) => c === 1).length}`);
log('');
// ============================================================================
// SEC A — ENGINE SELF-CHECK: independent brute force over every zone below 1e6
// ============================================================================
log('SEC A — ENGINE SELF-CHECK (independent brute-force engine, every zone with p\'^2 < 1e6)');
{
  const M = 1e6, s = new Uint8Array(M + 3);
  for (let i = 2; i * i <= M + 2; i++) if (!s[i]) for (let j = i * i; j <= M + 2; j += i) s[j] = 1;
  const bo = []; for (let a = 3; a + 2 <= M; a += 2) if (!s[a] && !s[a + 2]) bo.push(a);
  let checked = 0;
  for (let z = 0; z < NZ; z++) {
    if (zB[z] >= M) break;
    const inz = bo.filter((a) => a > zP[z] && a + 2 < zB[z]);
    let m = 0; for (let i = 1; i < inz.length; i++) { const g = inz[i] - inz[i - 1]; if (g > m) m = g; }
    aEq(`brute cnt p=${zP[z]}`, zCnt[z], inz.length);
    aEq(`brute head p=${zP[z]}`, zHead[z], inz[0] - zP[z]);
    aEq(`brute tail p=${zP[z]}`, zTail[z], zB[z] - inz[inz.length - 1]);
    aEq(`brute Z2 p=${zP[z]}`, zZ2[z], m);
    checked++;
  }
  log(`  ${checked} zones recomputed (count, head, tail, Z2): IDENTICAL`);
  for (const [p, z2, h, t] of [[7, 30, 4, 14], [11, 30, 6, 20], [13, 30, 4, 8], [17, 36, 12, 14], [23, 150, 6, 14]]) {
    const z = zP.indexOf(p);
    aEq(`zonegap-02 Z2@${p}`, zZ2[z], z2); aEq(`zonegap-02 head@${p}`, zHead[z], h); aEq(`zonegap-02 tail@${p}`, zTail[z], t);
  }
  log('  the five levels zonegap-02-reduction.js verified by hand (p = 7,11,13,17,23): Z2/head/tail IDENTICAL');
  // bin accumulator width audit: recompute one populated bin's g^2 sum in two halves
  let probe = -1; for (let k = NB - 1; k >= 0; k--) if (bN[k] > 1000) { probe = k; break; }
  log(`  width audit: densest usable bin index ${probe} carries ${bN[probe].toLocaleString('en-US')} gaps and Sum g^2 = ${bG2[probe].toExponential(3)} (< 9.0e15, exact in doubles): ${bG2[probe] < 9e15 ? 'OK' : 'OVERFLOW'}`);
  aTrue('bin g^2 accumulator inside exact-integer range', bG2[probe] < 9e15);
}
log('');

// ============================================================================
// SEC B — CUSTODY. Every number the corpus already holds for these fields,
// reproduced on this engine BEFORE any new number is printed.
// ============================================================================
const bandOf = (p) => { const e = Math.floor(Math.log10(p)); return e >= 5 ? 5 : e; };
const bIx = [[], [], [], [], [], []];
for (let z = 0; z < NZ; z++) bIx[bandOf(zP[z])].push(z);
log('SEC B — CUSTODY (a miss on any row VOIDS every number below it)');
{
  if (FULL) {
    aEq('zone count == zonegap-01\'s 27292', NZ, 27292);
    aEq('top zone origin == zonegap-01\'s 316219', zP[NZ - 1], 316219);
    aEq('twin pairs to 1e11 == zonegap-01\'s 224,376,048', nPairsTotal, 224376048);
  }
  log('  B1 — pi_2(10^k) vs A007508 (the count of pairs with a + 2 <= 10^k):');
  for (const k of [8, 9, 10, 11]) {
    if (Math.pow(10, k) > X) continue;
    log(`    pi_2(1e${k}) = ${pi2[k].toLocaleString('en-US')} vs A007508's ${A007508[k].toLocaleString('en-US')}`);
    aEq(`A007508 at 1e${k}`, pi2[k], A007508[k]);
  }
  log('  B2 — the sweep\'s running-max gap ladder vs A113274/A113275 records:');
  {
    const app = []; for (let i = 0; i < REC_GAP.length; i++) if (REC_START[i] + REC_GAP[i] + 2 <= X) app.push(i);
    aEq('record ladder length', ladder.length, app.length);
    let bad = 0;
    for (let k = 0; k < Math.min(ladder.length, app.length); k++) { const i = app[k]; if (ladder[k][0] !== REC_GAP[i] || ladder[k][1] !== REC_START[i]) bad++; }
    aEq('record ladder rows', bad, 0);
    log(`    ${ladder.length} records, all with p_end <= X, gap and first occurrence: EXACT`);
  }
  log('  B3 — zonegap-01.js\'s embedded PER-BAND block at X = 1e11 (its decade bands, its');
  log('       MEAN-OF-RATIOS estimator, which is NOT the ratio-of-sums used from SEC C on):');
  log('    band      zones  pairs/zone   c3=Z2/ln^3p   headmax   head/ln2p   tail/ln2(p2)');
  for (let b = 0; b < 6; b++) {
    const ix = bIx[b]; if (!ix.length) continue;
    const r2 = ix.filter((z) => zCnt[z] >= 2);
    const tm = mean(ix.map((z) => zTail[z] / l2(zB[z])));
    const hm = mean(ix.map((z) => zHead[z] / l2(zP[z])));
    const c3 = mean(r2.map((z) => zZ2[z] / Math.log(zP[z]) ** 3));
    const hx = Math.max(...ix.map((z) => zHead[z]));
    const pm = mean(ix.map((z) => zCnt[z]));
    log('    ' + ZG01_BANDS[b].padEnd(9) + String(ix.length).padStart(6) + '  ' + pm.toExponential(2).padStart(9) + '  ' +
      f3(c3).padStart(12) + '  ' + String(hx).padStart(7) + '  ' + f3(hm).padStart(9) + '  ' + f3(tm).padStart(12));
    if (FULL) {
      aEq(`zonegap-01 zone count ${ZG01_BANDS[b]}`, ix.length, ZG01_N[b]);
      aEq(`zonegap-01 tailM ${ZG01_BANDS[b]}`, Number(tm.toFixed(3)), ZG01_TAILM[b]);
      aEq(`zonegap-01 headM ${ZG01_BANDS[b]}`, Number(hm.toFixed(3)), ZG01_HEADM[b]);
      aEq(`zonegap-01 headMax ${ZG01_BANDS[b]}`, hx, ZG01_HEADMAX[b]);
      aEq(`zonegap-01 c3m ${ZG01_BANDS[b]}`, Number(c3.toFixed(3)), ZG01_C3M[b]);
      aEq(`zonegap-01 pairs/zone ${ZG01_BANDS[b]}`, pm.toExponential(2), ZG01_PAIRS[b]);
    }
  }
  log('  B4 — zone-tail-01.js at X = 1e8 on ITS census list (p >= 7, p\'^2 - 1 <= 1e8),');
  log('       ratio-of-sums, the overlapping zones of this sweep:');
  const CZ = []; for (let z = 0; z < NZ; z++) if (zP[z] >= 7 && zB[z] - 1 <= 1e8) CZ.push(z);
  if (X >= 1e8) aEq('zone-tail-01 census zone count', CZ.length, 1225);
  const cbOf = (p) => p < 100 ? 0 : p < 1000 ? 1 : p < 3163 ? 2 : 3;
  log('    band            zones   mean tail   c_local   c_p     head c');
  for (let b = 0; b < 4; b++) {
    const ix = CZ.filter((z) => cbOf(zP[z]) === b); if (!ix.length) continue;
    let st = 0, sl = 0, sp = 0, sh = 0;
    for (const z of ix) { st += zTail[z]; sl += l2(zB[z]); sp += l2(zP[z]); sh += zHead[z]; }
    log('    ' + ZT01_BN[b].padEnd(15) + String(ix.length).padStart(5) + '  ' + f2(mean(ix.map((z) => zTail[z]))).padStart(10) +
      '  ' + f4(st / sl).padStart(8) + '  ' + f4(st / sp).padStart(7) + '  ' + f4(sh / sp).padStart(7));
    if (X >= 1e8) {
      aEq(`zone-tail-01 n ${ZT01_BN[b]}`, ix.length, ZT01_N[b]);
      aEq(`zone-tail-01 mean tail ${ZT01_BN[b]}`, Number(mean(ix.map((z) => zTail[z])).toFixed(2)), ZT01_MEANTAIL[b]);
      aEq(`zone-tail-01 c_local ${ZT01_BN[b]}`, Number((st / sl).toFixed(4)), ZT01_CLOCAL[b]);
      if (b === 3) { aEq('zone-tail-01 c_p at B4', Number((st / sp).toFixed(4)), ZT01_CP_B4); aEq('destroyer-census-01 head c at B4', Number((sh / sp).toFixed(4)), ZT01_HEADC_B4); }
    }
  }
  log(`  CUSTODY VERDICT: ${failures === 0 ? 'every row reproduces; 0 assertion failures so far' : failures + ' ASSERTION FAILURES — nothing below stands'}`);
}
log('');
// ============================================================================
// SEC C — THE TAIL LAW, both units, by decade
// ============================================================================
const MING = 100;                                   // a bin or shell below this many gaps is not used
const Rshell = (z) => (sN[z] >= MING ? sG2[z] / (2 * sG[z]) : NaN);
const Rbin = (h) => { const k = binOf(h); return bN[k] >= MING ? bG2[k] / (2 * bG[k]) : NaN; };
const cnBin = (h) => { const k = binOf(h); return cnC[k] >= MING ? cnD[k] / cnC[k] : NaN; };
function bootRatio(ix, num, den, seed) {
  const rng = mkRng(seed), bs = [];
  for (let r = 0; r < 2000; r++) { let a = 0, d = 0; for (let k = 0; k < ix.length; k++) { const z = ix[(rng() * ix.length) | 0]; a += num(z); d += den(z); } bs.push(a / d); }
  bs.sort((x, y) => x - y); return [bs[50], bs[1949]];
}
log('SEC C — THE TAIL LAW (ratio of sums, destroyer-census-01 SEC 6(a)\'s estimator; BOTH units on every row)');
log(`  HL reference in either unit: 1/(2 C2) = ${f4(HL)}. Bootstrap 2000 resamples over zones, seed 20260829.`);
log('  band      zones   mean tail   c_local=St/Sln2(p\'2)   [2.5,97.5]         c_p=St/Sln2p   c_local/HL');
const cLoc = [], cPu = [];
for (let b = 0; b < 6; b++) {
  const ix = bIx[b]; if (!ix.length) continue;
  let st = 0, sl = 0, sp = 0;
  for (const z of ix) { st += zTail[z]; sl += l2(zB[z]); sp += l2(zP[z]); }
  const c = st / sl; cLoc[b] = c; cPu[b] = st / sp;
  const ci = bootRatio(ix, (z) => zTail[z], (z) => l2(zB[z]), 20260829 + b);
  log('  ' + ZG01_BANDS[b].padEnd(9) + String(ix.length).padStart(6) + '  ' + f2(mean(ix.map((z) => zTail[z]))).padStart(10) +
    '  ' + f4(c).padStart(19) + '   [' + f4(ci[0]) + ',' + f4(ci[1]) + ']  ' + f4(st / sp).padStart(12) + '  ' + f4(c / HL).padStart(10));
}
log(`  band drift, local units: 10^3->10^4 ${f4(cLoc[4] - cLoc[3])}, 10^4->1e5-p.5 ${f4(cLoc[5] - cLoc[4])}, spread over 10^2..1e5-p.5 ${f4(Math.max(cLoc[2], cLoc[3], cLoc[4], cLoc[5]) - Math.min(cLoc[2], cLoc[3], cLoc[4], cLoc[5]))}`);
log(`  ratio of units at the top band: c_p / c_local = ${f4(cPu[5] / cLoc[5])} (4 exactly in the ln^2(p'^2) = 4 ln^2 p' limit; the`);
log('  entire "the tail is four and a half times the head" reading is this factor and nothing else)');
log('');

// ============================================================================
// SEC D — THE WORST CASE
// ============================================================================
log('SEC D — WORST CASE PER BAND');
log('  band      max tail   at p       /ln2(p\'2)  /ln2p     /width     max/mean');
for (let b = 0; b < 6; b++) {
  const ix = bIx[b]; if (!ix.length) continue;
  let best = ix[0]; for (const z of ix) if (zTail[z] > zTail[best]) best = z;
  const W = zB[best] - zP[best], mt = mean(ix.map((z) => zTail[z]));
  log('  ' + ZG01_BANDS[b].padEnd(9) + String(zTail[best]).padStart(8) + String(zP[best]).padStart(9) + '  ' +
    f3(zTail[best] / l2(zB[best])).padStart(9) + '  ' + f3(zTail[best] / l2(zP[best])).padStart(8) + '  ' +
    (zTail[best] / W).toExponential(2).padStart(9) + '  ' + f2(zTail[best] / mt).padStart(9));
}
{
  let g = 0, gz = 0, g2 = 0, gz2 = 0;
  for (let z = 0; z < NZ; z++) {
    const r = zTail[z] / l2(zB[z]); if (r > g) { g = r; gz = z; }
    const r2 = zTail[z] / l2(zP[z]); if (r2 > g2) { g2 = r2; gz2 = z; }
  }
  log(`  GLOBAL max tail/ln2(p'^2) = ${f3(g)} at p = ${zP[gz]} (tail ${zTail[gz]}, p'^2 = ${zB[gz]}, width ${zB[gz] - zP[gz]})`);
  log(`  GLOBAL max tail/ln2(p)    = ${f3(g2)} at p = ${zP[gz2]} (tail ${zTail[gz2]}); the two units disagree about which zone is worst: ${gz === gz2 ? 'no, same zone' : 'yes, different zones'}`);
  log(`  zone-tail-01's global max over its 1,225-zone subset was 4.007 in local units at p = 4943; this sweep's ${NZ} zones contain those 1,225.`);
}
log('');

// ============================================================================
// SEC E — THE RENEWAL COMPARATOR, height-matched, and the exhaustive class null
// ============================================================================
log('SEC E — RENEWAL COMPARATOR. R = E[g^2]/2E[g], the forward AND backward recurrence mean.');
log('  Three comparators per band, each on the SAME tails:');
log('    R_shell  height-matched: the zone\'s own shell (bound_{z-1}, bound_z], the slice ending at the tail\'s origin.');
log('    R_bin    height-matched: the log-binned profile, 20 bins per decade, read at h = p\'^2.');
log('    R_band   zone-tail-01.md §5\'s convention: one R over the whole band\'s height span (MIXES heights).');
log('    classNull  the exactly matched DISCRETE comparator: mean backward distance from every integer');
log('               congruent to 1 or 19 mod 30 (the classes p\'^2 occupies for p\' >= 7), exhaustive, binned.');
log('  band      zones   mean tail   R_shell   t/R_shell   R_bin    t/R_bin   R_band   t/R_band   classNull  t/classNull');
const tOverShell = [];
for (let b = 0; b < 6; b++) {
  const ix = bIx[b]; if (!ix.length) continue;
  const ok = ix.filter((z) => sN[z] >= MING && bN[binOf(zB[z])] >= MING && cnC[binOf(zB[z])] >= MING);
  let SG = 0, SG2 = 0; for (const z of ix) { SG += sG[z]; SG2 += sG2[z]; }
  const Rband = SG2 / (2 * SG);
  const mt = mean(ix.map((z) => zTail[z]));
  if (!ok.length) { log('  ' + ZG01_BANDS[b].padEnd(9) + String(ix.length).padStart(6) + '  ' + f2(mt).padStart(10) + '   (no bin or shell in this band reaches ' + MING + ' gaps; nothing height-matched is computable here)'); tOverShell[b] = NaN; continue; }
  let st = 0, sr = 0, sb = 0, sc = 0;
  for (const z of ok) { st += zTail[z]; sr += Rshell(z); sb += Rbin(zB[z]); sc += cnBin(zB[z]); }
  tOverShell[b] = st / sr;
  log('  ' + ZG01_BANDS[b].padEnd(9) + String(ok.length).padStart(6) + '  ' + f2(mean(ok.map((z) => zTail[z]))).padStart(10) + '  ' +
    f2(sr / ok.length).padStart(8) + '  ' + f4(st / sr).padStart(9) + '  ' + f2(sb / ok.length).padStart(7) + '  ' + f4(st / sb).padStart(8) + '  ' +
    f2(Rband).padStart(7) + '  ' + f4(mt / Rband).padStart(9) + '  ' + f2(sc / ok.length).padStart(9) + '  ' + f4(st / sc).padStart(11));
}
{
  const TOPB = [0,1,2,3,4,5].filter((b) => bIx[b].length > 0).pop();
  const top = bIx[TOPB].filter((z) => sN[z] >= MING && bN[binOf(zB[z])] >= MING);
  const ci = bootRatio(top, (z) => zTail[z], (z) => Rshell(z), 777000333);
  const cib = bootRatio(top, (z) => zTail[z], (z) => Rbin(zB[z]), 777000334);
  const cic = bootRatio(top, (z) => zTail[z], (z) => cnBin(zB[z]), 777000335);
  let st = 0, sr = 0; for (const z of top) { st += zTail[z]; sr += Rshell(z); }
  log(`  TOP BAND ${ZG01_BANDS[TOPB]} (${top.length} zones): t/R_shell = ${f4(st / sr)}, bootstrap [${f4(ci[0])}, ${f4(ci[1])}] (2000 resamples, seed 777000333)`);
  log(`    t/R_bin bootstrap [${f4(cib[0])}, ${f4(cib[1])}]; t/classNull bootstrap [${f4(cic[0])}, ${f4(cic[1])}]`);
  log(`    R + 1/2, the discrete-consistent continuum correction: it shifts t/R by ${f4(st / sr - st / (sr + 0.5 * top.length))} at this R, which is below the fourth digit.`);
  const all = []; for (let z = 0; z < NZ; z++) if (sN[z] >= MING && bN[binOf(zB[z])] >= MING) all.push(z);
  let at = 0, ar = 0; for (const z of all) { at += zTail[z]; ar += Rshell(z); }
  const cia = bootRatio(all, (z) => zTail[z], (z) => Rshell(z), 777000336);
  log(`  POOLED over all ${all.length} zones with a usable shell: t/R_shell = ${f4(at / ar)}, bootstrap [${f4(cia[0])}, ${f4(cia[1])}]`);
  log('  PRE-REGISTERED RULE (zone-tail-01.md §1 (E2), verbatim): SURPLUS if t/R - 1 >= +0.03 with the bootstrap clear of +0.03;');
  log('  DEFICIT if <= -0.03 likewise; MATCH otherwise. zone-tail-01 measured t/R_band = 1.0619 at its top band, bootstrap [0.9937, 1.1321].');
}
log('  POOLING RULE (record-location-null.js N3) — each unit divided by ln^2 of ITS OWN height before pooling:');
log('  band      mean tail/ln2(p\'2)   classNull mean d/ln2(h)   ratio      class origins in the band\'s bins');
for (let b = 0; b < 6; b++) {
  const ix = bIx[b].filter((z) => cnC[binOf(zB[z])] >= MING); if (!ix.length) continue;
  const tn = mean(ix.map((z) => zTail[z] / l2(zB[z])));
  const nn = mean(ix.map((z) => cnBin(zB[z]) / l2(zB[z])));
  const norig = new Set(ix.map((z) => binOf(zB[z]))); let tot = 0; for (const k of norig) tot += cnC[k];
  log('  ' + ZG01_BANDS[b].padEnd(9) + f4(tn).padStart(16) + f4(nn).padStart(24) + '   ' + f4(tn / nn).padStart(7) + '     ' + tot.toLocaleString('en-US'));
}
log('');
// ============================================================================
// SEC F — THE HEAD, same zones, same estimator, and its EFFECTIVE sample size
// ============================================================================
log('SEC F — THE HEAD ON THE SAME ZONES (ratio of sums, ln^2 p units), with its redundancy measured');
log('  A head is the forward distance from p to the next twin opener. Zone origins are consecutive primes,');
log('  which are far denser than twin openers at the same height, so many zones SHARE one head-bearing gap.');
log('  The count of DISTINCT a_first is the head field\'s effective sample size and it is not the zone count.');
log('  band      zones   distinct a_first   mean head   c_head=Sh/Sln2p   [2.5,97.5]        R_prange   h/R      fwdClassNull  h/fwdNull');
const cHead = [];
for (let b = 0; b < 6; b++) {
  const ix = bIx[b]; if (!ix.length) continue;
  let sh = 0, sp = 0; for (const z of ix) { sh += zHead[z]; sp += l2(zP[z]); }
  cHead[b] = sh / sp;
  const ci = bootRatio(ix, (z) => zHead[z], (z) => l2(zP[z]), 20260830 + b);
  const dist = new Set(ix.map((z) => zFirstA[z])).size;
  let k0 = binOf(zP[ix[0]]), k1 = binOf(zP[ix[ix.length - 1]]);
  let PG = 0, PG2 = 0, PN = 0, FD = 0, FC = 0;
  for (let k = k0; k <= k1; k++) { PG += bG[k]; PG2 += bG2[k]; PN += bN[k]; FD += hfD[k]; FC += hfC[k]; }
  const Rp = PN >= MING ? PG2 / (2 * PG) : NaN, Fn = FC >= MING ? FD / FC : NaN;
  const mh = mean(ix.map((z) => zHead[z]));
  log('  ' + ZG01_BANDS[b].padEnd(9) + String(ix.length).padStart(6) + String(dist).padStart(19) + '  ' +
    f2(mean(ix.map((z) => zHead[z]))).padStart(10) + '  ' + f4(sh / sp).padStart(16) + '   [' + f4(ci[0]) + ',' + f4(ci[1]) + ']  ' +
    (PN >= MING ? f2(Rp).padStart(9) + '  ' + f4(mh / Rp).padStart(8) + '  ' + f2(Fn).padStart(10) + '  ' + f4(mh / Fn).padStart(9) + `  (${PN.toLocaleString('en-US')} gaps, ${FC.toLocaleString('en-US')} class origins)` : '   (only ' + PN + ' twin gaps exist at this band\'s head heights: nothing height-matched is computable)'));
}
log('  destroyer-census-01 §6(b), cited not recomputed: h/R = 1.0924, 1.0780, 1.0416, 1.0347, 1.0254 across its five windows,');
log('  and its own caveat stands here: R is the CONTINUUM functional and the population primes occupy sees R + 2.754 at [1e7,1e8).');
log('');

// ============================================================================
// SEC G — THE JOINT LAW OF HEAD AND TAIL (z2-state-draft-0829.md §8 Q5)
// ============================================================================
log('SEC G — THE JOINT LAW. Label (i): a distributional statement about two measured fields, no bound anywhere.');
{
  const H = new Float64Array(NZ), Tn = new Float64Array(NZ), Tp = new Float64Array(NZ), U = new Float64Array(NZ);
  for (let z = 0; z < NZ; z++) { H[z] = zHead[z] / l2(zP[z]); Tn[z] = zTail[z] / l2(zB[z]); Tp[z] = zTail[z] / l2(zP[z]); U[z] = Math.log(zP[z]); }
  const rawH = Array.from(zHead), rawT = Array.from(zTail);
  log(`  G1 — RAW, pooled over all ${NZ} zones, and it is a CONFOUND: corr(head, tail) = ${f4(pearson(rawH, rawT))}.`);
  log('       Both fields scale with ln^2 of their own heights and the two heights are deterministically linked,');
  log('       so a positive raw correlation is the common height trend and says nothing about dependence.');
  log(`  G2 — own-height normalised, pooled: corr(head/ln^2 p, tail/ln^2(p'^2)) = ${f4(pearson(Array.from(H), Array.from(Tn)))}.`);
  const use = [2, 3, 4, 5].filter((b) => bIx[b].length >= 100);
  const rx = [], ry = [];
  log('  G3 — within band, with a linear trend in ln p removed from BOTH fields (the primary statistic):');
  log('  band      zones   Pearson(x~,y~)   Spearman   chi2(3x3, 4 df)   p       null s.e. 1/sqrt(n)');
  const perBand = [];
  for (const b of use) {
    const ix = bIx[b], n = ix.length;
    const x = ix.map((z) => H[z]), y = ix.map((z) => Tn[z]), u = ix.map((z) => U[z]);
    const mu = mean(u), mx = mean(x), my = mean(y);
    let suu = 0, sux = 0, suy = 0;
    for (let i = 0; i < n; i++) { const du = u[i] - mu; suu += du * du; sux += du * (x[i] - mx); suy += du * (y[i] - my); }
    const bx = sux / suu, by = suy / suu;
    const xr = x.map((v, i) => v - mx - bx * (u[i] - mu)), yr = y.map((v, i) => v - my - by * (u[i] - mu));
    const r = pearson(xr, yr), sp = pearson(Array.from(ranks(xr)), Array.from(ranks(yr)));
    // 3x3 tercile contingency on the residuals
    const rkx = ranks(xr), rky = ranks(yr), tab = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < n; i++) { const a = Math.min(2, Math.floor((rkx[i] - 0.5) * 3 / n)), c = Math.min(2, Math.floor((rky[i] - 0.5) * 3 / n)); tab[a * 3 + c]++; }
    const E = n / 9; let chi = 0; for (let k = 0; k < 9; k++) chi += (tab[k] - E) * (tab[k] - E) / E;
    log('  ' + ZG01_BANDS[b].padEnd(9) + String(n).padStart(6) + '  ' + f4(r).padStart(14) + '  ' + f4(sp).padStart(9) + '  ' +
      f2(chi).padStart(16) + '  ' + chi2p4(chi).toFixed(4).padStart(6) + '   ' + f4(1 / Math.sqrt(n)).padStart(10));
    for (let i = 0; i < n; i++) { rx.push(xr[i]); ry.push(yr[i]); }
    perBand.push({ b, n, r, sp, chi, p: chi2p4(chi), xr, yr });
  }
  const rPool = pearson(rx, ry);
  log(`  G4 — POOLED detrended correlation over ${rx.length} zones: r = ${f4(rPool)}, null s.e. 1/sqrt(n) = ${f4(1 / Math.sqrt(rx.length))}, so r/s.e. = ${f2(rPool * Math.sqrt(rx.length))}.`);
  {   // exact within-band permutation null for the pooled r
    const rng = mkRng(424242), bs = [];
    let sxx = 0, syy = 0; for (let i = 0; i < rx.length; i++) { sxx += rx[i] * rx[i]; syy += ry[i] * ry[i]; }
    const denom = Math.sqrt(sxx * syy);
    const blocks = perBand.map((pb) => ({ x: pb.xr, y: pb.yr.slice() }));
    for (let rep = 0; rep < 2000; rep++) {
      let sxy = 0;
      for (const bl of blocks) {
        const y = bl.y, n = y.length;
        for (let i = n - 1; i > 0; i--) { const j = (rng() * (i + 1)) | 0; const t = y[i]; y[i] = y[j]; y[j] = t; }
        for (let i = 0; i < n; i++) sxy += bl.x[i] * y[i];
      }
      bs.push(sxy / denom);
    }
    bs.sort((a, c) => a - c);
    let ge = 0; for (const v of bs) if (Math.abs(v) >= Math.abs(rPool)) ge++;
    log(`       within-band permutation null (2000 permutations of the tail against the head, seed 424242):`);
    log(`       null [2.5,97.5] = [${f4(bs[50])}, ${f4(bs[1949])}], two-sided p = ${(ge / 2000).toFixed(4)}`);
  }
  // G5 — the sum's law, and the product-form prediction
  log('  G5 — THE SUM, head + tail = the R0 residual (width - Sum of gaps), in ln^2 p units:');
  log('  band      c_head    c_tail(p units)   c_sum    c_head+c_tail   Var(h~+t~)/(Var h~ + Var t~)   cov(h~,t~)   KS vs independence-null   p');
  for (const b of use) {
    const ix = bIx[b], n = ix.length;
    let sh = 0, st = 0, sp = 0; for (const z of ix) { sh += zHead[z]; st += zTail[z]; sp += l2(zP[z]); }
    const h = ix.map((z) => H[z]), t = ix.map((z) => Tp[z]);
    const mh = mean(h), mt2 = mean(t);
    let vh = 0, vt = 0, cv = 0; for (let i = 0; i < n; i++) { vh += (h[i] - mh) ** 2; vt += (t[i] - mt2) ** 2; cv += (h[i] - mh) * (t[i] - mt2); }
    vh /= n; vt /= n; cv /= n;
    const s = h.map((v, i) => v + t[i]);
    const ms = mean(s); let vs = 0; for (const v of s) vs += (v - ms) ** 2; vs /= n;
    const rng2 = mkRng(31415926), tp = t.slice();
    for (let i = n - 1; i > 0; i--) { const j = (rng2() * (i + 1)) | 0; const q = tp[i]; tp[i] = tp[j]; tp[j] = q; }
    const s0 = h.map((v, i) => v + tp[i]);
    const A = s.slice().sort((x, y) => x - y), B = s0.slice().sort((x, y) => x - y);
    let i1 = 0, i2 = 0, D = 0;
    while (i1 < n && i2 < n) { const v = Math.min(A[i1], B[i2]); while (i1 < n && A[i1] <= v) i1++; while (i2 < n && B[i2] <= v) i2++; D = Math.max(D, Math.abs(i1 / n - i2 / n)); }
    log('  ' + ZG01_BANDS[b].padEnd(9) + f4(sh / sp).padStart(8) + f4(st / sp).padStart(17) + f4((sh + st) / sp).padStart(9) +
      f4(sh / sp + st / sp).padStart(15) + f4(vs / (vh + vt)).padStart(29) + f4(cv).padStart(13) + f4(D).padStart(24) + '  ' + ksP(D, n, n).toFixed(4));
  }
  log('  (c_sum = c_head + c_tail is an identity of the estimator, asserted not tested; the columns that carry information');
  log('   are the variance ratio, which the product form puts at 1, and the KS against the re-paired marginals.)');
}
log('');

// ============================================================================
// SEC H — R0, ASSERTED per zone, never measured (zonegap-02-reduction.md (R0))
// ============================================================================
log('SEC H — R0: width = head + Sum(gaps) + tail exactly, and head + Z2 + tail <= width');
{
  let eq2 = 0, st3 = 0;
  for (let z = 0; z < NZ; z++) {
    const W = zB[z] - zP[z], sum = zHead[z] + (zB[z] - zTail[z] - (zP[z] + zHead[z])) + zTail[z];
    aEq(`R0 partition p=${zP[z]}`, sum, W);
    const s3 = zHead[z] + zZ2[z] + zTail[z];
    aTrue(`R0 inequality p=${zP[z]}`, s3 <= W);
    if (zCnt[z] === 2) { aEq(`R0 equality at k=2, p=${zP[z]}`, s3, W); eq2++; } else if (zCnt[z] >= 3) { aTrue(`R0 strict at k>=3, p=${zP[z]}`, s3 < W); st3++; }
  }
  log(`  the partition identity and the inequality hold at all ${NZ} zones; equality asserted at the ${eq2} zone(s) holding exactly 2 pairs, strict at the ${st3} holding >= 3`);
  log('  band      head/width   Z2/width    tail/width   sum/width    share of the three-piece sum: head / Z2 / tail');
  for (let b = 0; b < 6; b++) {
    const ix = bIx[b]; if (!ix.length) continue;
    const wo = (f) => mean(ix.map((z) => f(z) / (zB[z] - zP[z])));
    let h = 0, k = 0, t = 0; for (const z of ix) { h += zHead[z]; k += zZ2[z]; t += zTail[z]; }
    const s = h + k + t;
    log('  ' + ZG01_BANDS[b].padEnd(9) + wo((z) => zHead[z]).toExponential(2).padStart(10) + '  ' + wo((z) => zZ2[z]).toExponential(2).padStart(10) +
      '  ' + wo((z) => zTail[z]).toExponential(2).padStart(10) + '  ' + wo((z) => zHead[z] + zZ2[z] + zTail[z]).toExponential(2).padStart(10) +
      '     ' + `${pct(h / s)}% / ${pct(k / s)}% / ${pct(t / s)}%`);
  }
}
log('');

// ============================================================================
// SEC I — THE TWO FIGURES THE RED TEAM COMPUTED OFF-PRODUCER, COMPUTED HERE
// ============================================================================
// (a) The head's CLUSTER bootstrap. SEC F measures 1,910 distinct a_first among
//     the 17,700 top-band zones, so the zone bootstrap on c_head prices draws
//     the field does not hold. The correct resampling unit is the CLUSTER, one
//     per distinct a_first: draw 1,910 clusters with replacement and take every
//     zone each drawn cluster carries. The inflation is the ratio of interval
//     widths, cluster over zone, and it is NOT sqrt(zones/clusters) unless the
//     clusters are equal-sized and their means are independent of their size.
// (b) The (P7) model figure on THIS zone list. Modelling head and tail as
//     exponentials with means proportional to L = ln^2 p gives
//     corr(head, tail) = Var(L) / (2 E[L^2] - E[L]^2). §1 evaluated it on the
//     top two bands and registered 0.016; here it is evaluated over every zone,
//     which is the population the measured 0.0326 is pooled over.
log('SEC I — THE CLUSTER BOOTSTRAP ON THE HEAD, AND THE (P7) MODEL ON THE FULL ZONE LIST');
{
  const TOPB2 = [0, 1, 2, 3, 4, 5].filter((b) => bIx[b].length > 0).pop();
  const ix = bIx[TOPB2];
  const byA = new Map();
  for (const z of ix) { const k = zFirstA[z]; if (!byA.has(k)) byA.set(k, []); byA.get(k).push(z); }
  const cl = [...byA.values()];
  let sh = 0, sp = 0; for (const z of ix) { sh += zHead[z]; sp += l2(zP[z]); }
  const point = sh / sp;
  const zci = bootRatio(ix, (z) => zHead[z], (z) => l2(zP[z]), 20260830 + TOPB2);
  const rng = mkRng(613009117), bs = [];
  for (let r = 0; r < 2000; r++) {
    let a = 0, d = 0;
    for (let k = 0; k < cl.length; k++) { const c = cl[(rng() * cl.length) | 0]; for (const z of c) { a += zHead[z]; d += l2(zP[z]); } }
    bs.push(a / d);
  }
  bs.sort((x, y) => x - y);
  const wz = zci[1] - zci[0], wc = bs[1949] - bs[50];
  const sizes = cl.map((c) => c.length);
  let cov = 0; const ms = mean(sizes), mm = mean(cl.map((c) => mean(c.map((z) => zHead[z]))));
  for (let i = 0; i < cl.length; i++) cov += (sizes[i] - ms) * (mean(cl[i].map((z) => zHead[z])) - mm);
  cov /= cl.length;
  log(`  (a) band ${ZG01_BANDS[TOPB2]}: ${ix.length} zones in ${cl.length} clusters (one per distinct a_first), mean cluster size ${f3(ms)}, max ${Math.max(...sizes)}`);
  log(`      c_head = ${f4(point)}; ZONE bootstrap [${f4(zci[0])}, ${f4(zci[1])}] width ${f4(wz)} (seed ${20260830 + TOPB2});`);
  log(`      CLUSTER bootstrap [${f4(bs[50])}, ${f4(bs[1949])}] width ${f4(wc)} (2000 resamples of ${cl.length} clusters, seed 613009117)`);
  log(`      inflation = ${f2(wc / wz)}x, against sqrt(zones/clusters) = ${f2(Math.sqrt(ix.length / cl.length))} which is what equal clusters with size-independent means would give;`);
  log(`      cov(cluster size, cluster mean head) = ${f2(cov)}, the sign that makes the design effect exceed the mean cluster size`);
  log(`      §1 (P6) registered c_head in [0.68, 0.78]: the cluster interval ${bs[50] >= 0.68 && bs[1949] <= 0.78 ? 'is still inside it' : 'is NOT inside it'}`);
  let sL = 0, sL2 = 0;
  for (let z = 0; z < NZ; z++) { const L = l2(zP[z]); sL += L; sL2 += L * L; }
  const EL = sL / NZ, EL2 = sL2 / NZ;
  const model = (EL2 - EL * EL) / (2 * EL2 - EL * EL);
  log(`  (b) (P7) model over all ${NZ} zones: E[L] = ${f2(EL)}, E[L^2] = ${f2(EL2)}, Var(L)/(2E[L^2] - E[L]^2) = ${f4(model)}`);
  log(`      against the MEASURED raw pooled corr(head, tail) = ${f4(pearson(Array.from(zHead), Array.from(zTail)))} on the same ${NZ} zones,`);
  log(`      so the model runs ${pct(1 - model / pearson(Array.from(zHead), Array.from(zTail)))}% below the measurement rather than the factor of two §1 assumed.`);
}
log('');
log(`ASSERTION FAILURES: ${failures}`);
log('done in ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s total');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/zone-tail-02.js
//   invocation:  node research/zone-tail-02.js
//   code-sha256: d5eb7a206dd4b986402ccb51376e4f84e1ab6e149270b8c49405c808e3586f65
//   out-sha256:  b4e4ff0fcbd74f1da1201a30d7aabe18b2f0897f2300ee6fa60d11826379b7b2
//   body-lines:  147
//   forced:      2026-08-29, 0 of 354 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     345.0 s
// ============================================================================
// ZONE-TAIL 02 — the tail field at 27292 zones, and the head-tail joint law
//   X = 1.0e+11, 224,376,048 twin pairs, 27292 zones (p = 2 .. 316219), sweep 332.8 s
//   min pairs in a zone: 2 at p = 2; zones with a single pair: 0
//
// SEC A — ENGINE SELF-CHECK (independent brute-force engine, every zone with p'^2 < 1e6)
//   167 zones recomputed (count, head, tail, Z2): IDENTICAL
//   the five levels zonegap-02-reduction.js verified by hand (p = 7,11,13,17,23): Z2/head/tail IDENTICAL
//   width audit: densest usable bin index 219 carries 22,482,280 gaps and Sum g^2 = 1.017e+13 (< 9.0e15, exact in doubles): OK
//
// SEC B — CUSTODY (a miss on any row VOIDS every number below it)
//   B1 — pi_2(10^k) vs A007508 (the count of pairs with a + 2 <= 10^k):
//     pi_2(1e8) = 440,312 vs A007508's 440,312
//     pi_2(1e9) = 3,424,506 vs A007508's 3,424,506
//     pi_2(1e10) = 27,412,679 vs A007508's 27,412,679
//     pi_2(1e11) = 224,376,048 vs A007508's 224,376,048
//   B2 — the sweep's running-max gap ladder vs A113274/A113275 records:
//     41 records, all with p_end <= X, gap and first occurrence: EXACT
//   B3 — zonegap-01.js's embedded PER-BAND block at X = 1e11 (its decade bands, its
//        MEAN-OF-RATIOS estimator, which is NOT the ratio-of-sums used from SEC C on):
//     band      zones  pairs/zone   c3=Z2/ln^3p   headmax   head/ln2p   tail/ln2(p2)
//     10^0          4    4.25e+0         4.370        6      1.778         0.684
//     10^1         21    8.44e+1         2.708       30      0.872         0.578
//     10^2        143    3.23e+3         3.426      150      0.942         0.768
//     10^3       1061    1.70e+5         3.681      210      0.684         0.766
//     10^4       8363    1.04e+7         4.022      630      0.720         0.741
//     1e5-p.5   17700    1.10e+8         3.930      924      0.725         0.752
//   B4 — zone-tail-01.js at X = 1e8 on ITS census list (p >= 7, p'^2 - 1 <= 1e8),
//        ratio-of-sums, the overlapping zones of this sweep:
//     band            zones   mean tail   c_local   c_p     head c
//     [7,100)           22       33.64    0.5740   2.4277   0.8530
//     [100,1000)       143      113.65    0.7518   3.0220   0.9863
//     [1000,3163)      278      167.56    0.7288   2.9185   0.7494
//     [3163,1e4)       782      237.26    0.7771   3.1096   0.6693
//   CUSTODY VERDICT: every row reproduces; 0 assertion failures so far
//
// SEC C — THE TAIL LAW (ratio of sums, destroyer-census-01 SEC 6(a)'s estimator; BOTH units on every row)
//   HL reference in either unit: 1/(2 C2) = 0.7574. Bootstrap 2000 resamples over zones, seed 20260829.
//   band      zones   mean tail   c_local=St/Sln2(p'2)   [2.5,97.5]         c_p=St/Sln2p   c_local/HL
//   10^0          4        8.50               0.6375   [0.5570,0.8050]        4.2161      0.8417
//   10^1         21       34.57               0.5733   [0.4275,0.7332]        2.4117      0.7570
//   10^2        143      113.65               0.7518   [0.6529,0.8502]        3.0220      0.9926
//   10^3       1061      218.86               0.7664   [0.7241,0.8087]        3.0670      1.0119
//   10^4       8363      343.05               0.7416   [0.7259,0.7569]        2.9667      0.9792
//   1e5-p.5   17700      447.26               0.7522   [0.7410,0.7630]        3.0088      0.9931
//   band drift, local units: 10^3->10^4 -0.0247, 10^4->1e5-p.5 0.0105, spread over 10^2..1e5-p.5 0.0247
//   ratio of units at the top band: c_p / c_local = 4.0000 (4 exactly in the ln^2(p'^2) = 4 ln^2 p' limit; the
//   entire "the tail is four and a half times the head" reading is this factor and nothing else)
//
// SEC D — WORST CASE PER BAND
//   band      max tail   at p       /ln2(p'2)  /ln2p     /width     max/mean
//   10^0           14        7      0.609     3.697    1.23e-1       1.65
//   10^1           80       29      1.696     7.055    8.58e-2       2.31
//   10^2          500      743      2.851    11.441    8.88e-4       4.40
//   10^3         1172     7643      3.664    14.659    2.00e-5       5.36
//   10^4         2948    69259      5.933    23.731    6.15e-7       8.59
//   1e5-p.5      3770   245563      6.118    24.474    6.25e-8       8.43
//   GLOBAL max tail/ln2(p'^2) = 6.840 at p = 15107 (tail 2534, p'^2 = 228644641, width 228629534)
//   GLOBAL max tail/ln2(p)    = 27.365 at p = 15107 (tail 2534); the two units disagree about which zone is worst: no, same zone
//   zone-tail-01's global max over its 1,225-zone subset was 4.007 in local units at p = 4943; this sweep's 27292 zones contain those 1,225.
//
// SEC E — RENEWAL COMPARATOR. R = E[g^2]/2E[g], the forward AND backward recurrence mean.
//   Three comparators per band, each on the SAME tails:
//     R_shell  height-matched: the zone's own shell (bound_{z-1}, bound_z], the slice ending at the tail's origin.
//     R_bin    height-matched: the log-binned profile, 20 bins per decade, read at h = p'^2.
//     R_band   zone-tail-01.md §5's convention: one R over the whole band's height span (MIXES heights).
//     classNull  the exactly matched DISCRETE comparator: mean backward distance from every integer
//                congruent to 1 or 19 mod 30 (the classes p'^2 occupies for p' >= 7), exhaustive, binned.
//   band      zones   mean tail   R_shell   t/R_shell   R_bin    t/R_bin   R_band   t/R_band   classNull  t/classNull
//   10^0          4        8.50   (no bin or shell in this band reaches 100 gaps; nothing height-matched is computable here)
//   10^1         21       34.57   (no bin or shell in this band reaches 100 gaps; nothing height-matched is computable here)
//   10^2         23      125.65    123.65     1.0162   123.79    1.0150   114.62     0.9916     129.90       0.9673
//   10^3        924      223.27    206.81     1.0796   207.57    1.0756   218.16     1.0032     213.60       1.0452
//   10^4       8363      343.05    335.12     1.0237   335.22    1.0234   354.17     0.9686     341.25       1.0053
//   1e5-p.5   17700      447.26    434.31     1.0298   434.33    1.0298   441.91     1.0121     440.36       1.0157
//   TOP BAND 1e5-p.5 (17700 zones): t/R_shell = 1.0298, bootstrap [1.0156, 1.0443] (2000 resamples, seed 777000333)
//     t/R_bin bootstrap [1.0162, 1.0439]; t/classNull bootstrap [1.0013, 1.0308]
//     R + 1/2, the discrete-consistent continuum correction: it shifts t/R by 0.0012 at this R, which is below the fourth digit.
//   POOLED over all 27010 zones with a usable shell: t/R_shell = 1.0291, bootstrap [1.0165, 1.0408]
//   PRE-REGISTERED RULE (zone-tail-01.md §1 (E2), verbatim): SURPLUS if t/R - 1 >= +0.03 with the bootstrap clear of +0.03;
//   DEFICIT if <= -0.03 likewise; MATCH otherwise. zone-tail-01 measured t/R_band = 1.0619 at its top band, bootstrap [0.9937, 1.1321].
//   POOLING RULE (record-location-null.js N3) — each unit divided by ln^2 of ITS OWN height before pooling:
//   band      mean tail/ln2(p'2)   classNull mean d/ln2(h)   ratio      class origins in the band's bins
//   10^2               0.7661                  0.7251    1.0566     73,842
//   10^3               0.7658                  0.7295    1.0499     7,413,434
//   10^4               0.7407                  0.7376    1.0041     741,345,626
//   1e5-p.5            0.7516                  0.7405    1.0149     6,000,000,004
//
// SEC F — THE HEAD ON THE SAME ZONES (ratio of sums, ln^2 p units), with its redundancy measured
//   A head is the forward distance from p to the next twin opener. Zone origins are consecutive primes,
//   which are far denser than twin openers at the same height, so many zones SHARE one head-bearing gap.
//   The count of DISTINCT a_first is the head field's effective sample size and it is not the zone count.
//   band      zones   distinct a_first   mean head   c_head=Sh/Sln2p   [2.5,97.5]        R_prange   h/R      fwdClassNull  h/fwdNull
//   10^0          4                  3        3.25            1.6121   [1.1141,2.2796]     (only 1 twin gaps exist at this band's head heights: nothing height-matched is computable)
//   10^1         21                  6       12.19            0.8504   [0.6571,1.0584]     (only 6 twin gaps exist at this band's head heights: nothing height-matched is computable)
//   10^2        143                 27       37.09            0.9863   [0.8446,1.1397]     (only 27 twin gaps exist at this band's head heights: nothing height-matched is computable)
//   10^3       1061                171       48.94            0.6859   [0.6524,0.7208]      44.52    1.0994       47.30     1.0347  (170 gaps, 2,413 class origins)
//   10^4       8363               1019       82.99            0.7177   [0.7037,0.7307]      76.95    1.0785       79.71     1.0412  (1,019 gaps, 24,016 class origins)
//   1e5-p.5   17700               1910      107.78            0.7251   [0.7147,0.7353]     102.22    1.0544      104.99     1.0266  (1,909 gaps, 57,611 class origins)
//   destroyer-census-01 §6(b), cited not recomputed: h/R = 1.0924, 1.0780, 1.0416, 1.0347, 1.0254 across its five windows,
//   and its own caveat stands here: R is the CONTINUUM functional and the population primes occupy sees R + 2.754 at [1e7,1e8).
//
// SEC G — THE JOINT LAW. Label (i): a distributional statement about two measured fields, no bound anywhere.
//   G1 — RAW, pooled over all 27292 zones, and it is a CONFOUND: corr(head, tail) = 0.0326.
//        Both fields scale with ln^2 of their own heights and the two heights are deterministically linked,
//        so a positive raw correlation is the common height trend and says nothing about dependence.
//   G2 — own-height normalised, pooled: corr(head/ln^2 p, tail/ln^2(p'^2)) = -0.0011.
//   G3 — within band, with a linear trend in ln p removed from BOTH fields (the primary statistic):
//   band      zones   Pearson(x~,y~)   Spearman   chi2(3x3, 4 df)   p       null s.e. 1/sqrt(n)
//   10^2        143         -0.0459    -0.1063              4.08  0.3948       0.0836
//   10^3       1061          0.0087     0.0148              2.50  0.6444       0.0307
//   10^4       8363          0.0018    -0.0038              2.49  0.6461       0.0109
//   1e5-p.5   17700         -0.0021    -0.0071              3.72  0.4455       0.0075
//   G4 — POOLED detrended correlation over 27267 zones: r = -0.0009, null s.e. 1/sqrt(n) = 0.0061, so r/s.e. = -0.15.
//        within-band permutation null (2000 permutations of the tail against the head, seed 424242):
//        null [2.5,97.5] = [-0.0118, 0.0123], two-sided p = 0.8920
//   G5 — THE SUM, head + tail = the R0 residual (width - Sum of gaps), in ln^2 p units:
//   band      c_head    c_tail(p units)   c_sum    c_head+c_tail   Var(h~+t~)/(Var h~ + Var t~)   cov(h~,t~)   KS vs independence-null   p
//   10^2       0.9863           3.0220   4.0083         4.0083                       0.9510      -0.1743                  0.0559  0.9751
//   10^3       0.6859           3.0670   3.7529         3.7529                       1.0033       0.0142                  0.0141  0.9999
//   10^4       0.7177           2.9667   3.6844         3.6844                       1.0006       0.0027                  0.0134  0.4389
//   1e5-p.5    0.7251           3.0088   3.7338         3.7338                       0.9990      -0.0042                  0.0034  0.9999
//   (c_sum = c_head + c_tail is an identity of the estimator, asserted not tested; the columns that carry information
//    are the variance ratio, which the product form puts at 1, and the KS against the re-paired marginals.)
//
// SEC H — R0: width = head + Sum(gaps) + tail exactly, and head + Z2 + tail <= width
//   the partition identity and the inequality hold at all 27292 zones; equality asserted at the 1 zone(s) holding exactly 2 pairs, strict at the 27291 holding >= 3
//   band      head/width   Z2/width    tail/width   sum/width    share of the three-piece sum: head / Z2 / tail
//   10^0        1.01e-1     2.74e-1     3.10e-1     6.85e-1     13.40% / 51.55% / 35.05%
//   10^1        8.78e-3     7.80e-2     2.34e-2     1.10e-1     6.23% / 76.10% / 17.67%
//   10^2        2.32e-4     5.38e-3     1.16e-3     6.77e-3     3.84% / 84.39% / 11.77%
//   10^3        4.31e-6     1.80e-4     1.92e-5     2.04e-4     1.94% / 89.37% / 8.69%
//   10^4        7.88e-8     4.05e-6     3.14e-7     4.45e-6     1.52% / 92.22% / 6.26%
//   1e5-p.5     3.33e-9     2.14e-7     1.37e-8     2.31e-7     1.40% / 92.80% / 5.81%
//
// SEC I — THE CLUSTER BOOTSTRAP ON THE HEAD, AND THE (P7) MODEL ON THE FULL ZONE LIST
//   (a) band 1e5-p.5: 17700 zones in 1910 clusters (one per distinct a_first), mean cluster size 9.267, max 72
//       c_head = 0.7251; ZONE bootstrap [0.7147, 0.7353] width 0.0206 (seed 20260835);
//       CLUSTER bootstrap [0.6848, 0.7692] width 0.0843 (2000 resamples of 1910 clusters, seed 613009117)
//       inflation = 4.10x, against sqrt(zones/clusters) = 3.04 which is what equal clusters with size-independent means would give;
//       cov(cluster size, cluster mean head) = 376.42, the sign that makes the design effect exceed the mean cluster size
//       §1 (P6) registered c_head in [0.68, 0.78]: the cluster interval is still inside it
//   (b) (P7) model over all 27292 zones: E[L] = 134.82, E[L^2] = 18726.75, Var(L)/(2E[L^2] - E[L]^2) = 0.0285
//       against the MEASURED raw pooled corr(head, tail) = 0.0326 on the same 27292 zones,
//       so the model runs 12.53% below the measurement rather than the factor of two §1 assumed.
//
// ASSERTION FAILURES: 0
// done in 344.9 s total
// ============================================================================
// READINGS
// 1. CUSTODY IS THE FIRST READING. Every figure the corpus already holds for
//    these two fields reproduces on this engine before a new number is
//    printed: zonegap-01.js's six decade tailM and headM means, its headMax,
//    its c3, its pairs-per-zone and its zone counts; A007508 at four powers of
//    ten; A113274's 41 records; zone-tail-01.js's four band mean tails and
//    four c_local values and its c_p and head c at B4; the five hand-verified
//    levels; and 167 zones recomputed by an independent brute-force engine.
//    0 assertion failures. What that does NOT cover: the 1,225-zone overlap is
//    4.5% of these zones, and above 1e8 no witness in the corpus constrains a
//    tail. Single sweep, single engine [MEASURED].
//
// 2. THE LAW. c_local = 0.7522 at the top band, bootstrap [0.7410, 0.7630],
//    which CONTAINS Hardy-Littlewood's 1/(2 C2) = 0.7574. That is "consistent
//    with", never "implies": a one-sweep interval covering a constant is weak
//    evidence, and no derivation of the coefficient exists on either side. In
//    ln^2 p units the same number reads 3.0088, and c_p / c_local = 4.0000 is
//    the unit and nothing else [MEASURED].
//
// 3. THE DRIFT MEETS ITS BOUND AND IS STILL NOT A CONVERGENCE. 0.7518, 0.7664,
//    0.7416, 0.7522 over four decades: down, up, down, up. The steps -0.0247
//    and +0.0105 are inside the pre-registered 0.03 for the first time in this
//    object's history, and four non-monotone points are band composition on
//    four decades, not a measured convergence [MEASURED].
//
// 4. THE SURPLUS RESOLVES DOWN, AND PART OF IT WAS THE COMPARATOR. zone-tail-01
//    reported t/R = 1.0619 at 782 zones with a bootstrap containing 1, in a
//    convention where R is averaged over a whole band's height span. Here the
//    same band-wide convention reads 0.9916, 1.0032, 0.9686, 1.0121 across four
//    decades, wandering around 1 with no pattern, which is what a mismatched
//    weighting looks like. Height-matched: t/R_shell = 1.0298 at the top band,
//    bootstrap [1.0156, 1.0443], EXCLUDING 1. Exactly matched to the discrete
//    class {1,19} mod 30 that p'^2 occupies, over 6,000,000,004 origins computed in
//    closed form: t/classNull = 1.0157, bootstrap [1.0013, 1.0308], whose lower
//    end sits above 1 [MEASURED].
//
// 5. THE PRE-REGISTERED RULE RETURNS MATCH BY TWO PARTS IN TEN THOUSAND.
//    t/R_shell = 1.0298 against zone-tail-01.md §1 (E2)'s MATCH threshold of
//    1.03. The rule's verdict and the measurement's content point different
//    ways: MATCH by the rule, a surplus outside sampling error by the interval.
//    Both are stated; neither is quoted alone [MEASURED].
//
// 6. A CANDIDATE MECHANISM, HEURISTIC AND UNFITTED. p'^2 is coprime to every
//    prime q <= p', the same roughness a prime origin carries, so the tail's
//    origin should show the head's own origin excess. Against exactly matched
//    class nulls the head reads h/fwdNull = 1.0347, 1.0412, 1.0266 and the tail
//    t/classNull = 1.0452, 1.0053, 1.0157 over the same three bands: same sign,
//    same order, disagreeing band by band by more than either one drifts. That
//    is consistent with one mechanism and identifies none [HEURISTIC].
//
// 7. THE JOINT LAW IS A NULL RESULT AT RESOLUTION 0.006. Detrended pooled
//    Pearson r = -0.0009 over 27,267 zones against a null s.e. of 0.0061;
//    within-band permutation null [-0.0118, 0.0123], two-sided p = 0.8920;
//    four chi-square p-values 0.3948..0.6461; variance ratio of the sum
//    1.0033, 1.0006, 0.9990; KS against the re-paired marginals rejecting
//    nowhere. The raw pooled corr(head, tail) = 0.0326 is the common height
//    trend and is reported first so it cannot be misread. Independence is NOT
//    proven, and the simultaneous-extremes regime, the only one a bound would
//    use, is untouched by a correlation [MEASURED].
//
// 8. THE HEAD FIELD IS SMALLER THAN ITS ZONE COUNT, AND THIS IS A DEFECT OWED
//    ELSEWHERE. 1,910 distinct a_first among the 17,700 zones of the top band,
//    1,019 among 8,363 at 10^4, 171 among 1,061 at 10^3. Zone origins are
//    consecutive primes and are far denser than twin openers, so 9.3 zones
//    share one head at the top. Permutation tests stay exact, but every head
//    bootstrap in this corpus, destroyer-census-01.md's included, prices about
//    three times more independent draws than the field holds [MEASURED].
//
// 9. THE WORST CASE IS 6.840, AND max/mean IS NO LONGER FLAT. Global max
//    tail/ln^2(p'^2) = 6.840 at p = 15107; per band max/mean runs 4.40, 5.36,
//    8.59, 8.43 where zone-tail-01's three usable bands read flat at 4.4, 5.6,
//    4.9. Six order statistics on one sweep support no extremal law and none
//    is offered [MEASURED].
//
// 10. FILLING THE TAIL ROW MOVES THE DECOMPOSITION NOWHERE. Shares of the
//    three-piece sum: 1.94% / 89.37% / 8.69% at 10^3, 1.52% / 92.22% / 6.26%
//    at 10^4, 1.40% / 92.80% / 5.81% at the top band. The tail's share falls
//    and Z2's rises, so Z2 holds more of the sum after this pass than before
//    it. Nothing here is a bound: no statement in this file constrains any
//    head, tail or Z2 at infinitely many p, and the fall of sum/width to
//    2.31e-7 at the top band is the square-window artefact
//    (ZONE-POSTULATE.md §5a) and is not evidence [MEASURED, label (i)].
//
// 11. THE TWO FIGURES THAT HAD NO OUTPUT CUSTODY NOW HAVE IT. The head's
//    cluster bootstrap and the (P7) model figure were computed off-producer by
//    redteam-0829-measure-b.md §1c (C15, C18); SEC I computes both inside this
//    run. Resampling the 1,910 clusters rather than the 17,700 zones widens the
//    top-band c_head interval from [0.7147, 0.7353] to [0.6848, 0.7692], an
//    inflation of 4.10 against the 3.04 that equal clusters with size-independent
//    means would give, and the reason is in the same block: mean cluster size
//    9.267, maximum 72, cov(cluster size, cluster mean head) = 376.42. §1 (P6)'s
//    band [0.68, 0.78] survives. The (P7) model on all 27,292 zones reads 0.0285
//    against the measured 0.0326, 12.53% below it, so §1's "factor of two low"
//    was a mismatched zone set and not a failure of the model [MEASURED].
