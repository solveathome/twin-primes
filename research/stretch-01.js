// ============================================================================
// STRETCH 01 — THE SQUARE-TO-SQUARE STRETCH DECOMPOSITION: FREEZE AND
// FINALITY VERIFIED, THE DELTA SPLIT (BOUNDED DENSITY CONSTANT vs DIVERGING
// WIDTH MARGIN), OCCUPANCY CERTIFIED FROM ADOPTED DATA TO 7.3e15, AND THE
// QUADRATIC-RESIDUE STRUCTURE OF THE SQUARE ANCHOR
// ============================================================================
// THE QUESTION (Chris's framing, 2026-08-21). Between consecutive prime
// squares, S_k = [q_k^2, q_{k+1}^2), the active destroyer set is FROZEN at
// {7..q_k} (mod-30 wheel frame): the stretch is a finite window of the
// periodic tile T_{q_k}, and it is a FINALITY window — every destroyer of
// every position in it is already active — so tile survivors there are true
// twins. His hand examples: 11 wakes at 121 (first prime 127), 13 at 169
// (first prime 173); [169, 289) feels only the moire of {7, 11, 13}.
// This producer: (a) verifies the decomposition exactly (freeze, finality,
// the zone-as-union-of-stretches identity); (b) quantifies the delta — the
// BOUNDED density constant (rho(2) = e^{2gamma}/4; Route B stays closed, no
// density-advantage claim anywhere here) against the DIVERGING width margin
// M = width/danger; (c) verifies stretch occupancy — directly to 1e8, and by
// a straddle criterion from the adopted record ladder to q^2 < 7.36e15;
// (d) works out the square anchor's QR kill structure, proves its ensemble
// mean is exactly the generic 2/r, and tests its measured signature.
// Companion report: research/history/staging/stretch-01.md.
//
// CONVENTIONS (zonegap-01's govern where shared; stretch-specific stated):
//   pair        (a, a+2), both prime, named by OPENER a.
//   stretch S_q [q^2, q'^2) for consecutive primes q < q'; the GLOSSARY's
//               "onset shell" of q, Chris's term adopted for the interval.
//   in S_q      q^2 <= a and a+2 < q'^2 (pair wholly inside; no pair can
//               straddle a boundary — verified below).
//   occupancy   S_q holds >= 1 pair.
//   zone        (p, p'^2), zonegap-01 conventions; Z2, head, tail as there.
//   t           offset a - q^2 of an opener inside its stretch.
// WIDTH AUDIT: TOS F(g) reaches 9,993,981,791,330,417 > 2^53 — F is parsed
// as BigInt with a Number shadow (shadow error <= 2, asserted); comparisons
// inside the ambiguous +-4 band are resolved in BigInt. The criterion sweep
// is capped so that q'^2 < 2^53: every square used arithmetically is exact
// in doubles. Bitwise ops only on sieve indices < 1.3e7 and residues < 32.
// The 75 starred record F's are all < 2.8e15 < 2^53 (asserted).
//
// PRIOR ART ON DISK (cited, extended, not re-derived):
//   - research/history/staging/zonegap-02-reduction.md — Lemma A (zone
//     certification), SEC D (the deep end is an onset desert; the stretch
//     (p^2, p'^2) is p's own onset shell). The freeze lemma here is D1
//     restated on the stretch grid; finality is Lemma A restricted.
//   - research/natal-onset-01.js — the q^2 first-fresh-kill rule and the
//     three-onset collapse; its 1..1e4 window totals are calibration
//     anchors here (999 channel pairs, 203 survivors).
//   - research/zonegap-01.js + history/staging/zonegap-01.md — Z2 dataset
//     conventions, the envelope identity; Z2(11) = 30, Z2(13) = 30 are
//     calibration anchors, recomputed by brute force at those two levels.
//   - research/tos-twin-gaps-1e16.txt — adopted under zonegap-01 §1's
//     custody (sha256 78767cad d001b1b0...); parsed here under the same
//     transcription guards, ABORT on any mismatch.
//   - research/a113274-gap-records.js — the record ladder; record 41
//     (8040 @ 65095731749) and record 75 (28842 @ 2797282815481499) are
//     asserted against the TOS starred rows.
//   - research/ZONE-POSTULATE.md §5a, §6 — the square-window lesson (margin
//     is not evidence), rho(2) = e^{2gamma}/4 = 0.79305 and the
//     e^{2gamma} = 3.1722 enrichment constant; both echoed here.
//   - research/REFUTED.md Route B — density-advantage arguments CLOSED;
//     SEC B1 and SEC C1 each carry the guardrail explicitly.
// ============================================================================
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const T0 = Date.now();

let failures = 0;
function assertTrue(tag, cond) {
  if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); }
  return cond;
}
function assertEq(tag, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); }
  return ok;
}
function abortIf(tag, cond) { // calibration aborts: nothing printed past a bad anchor
  if (cond) { console.log(`CALIBRATION ABORT [${tag}]`); process.exit(1); }
}

// ---------- sieve to just past 10007^2 (covers every integer touched) ------
const N = 100140200; // 10007^2 = 100140049; also covers primes to 8.6e7
const bits = new Uint8Array((N >> 3) + 1);
for (let i = 2; i * i <= N; i++) {
  if (bits[i >> 3] & (1 << (i & 7))) continue;
  for (let j = i * i; j <= N; j += i) bits[j >> 3] |= 1 << (j & 7);
}
function isP(n) { return n >= 2 && !(bits[n >> 3] & (1 << (n & 7))); }
const smallPrimes = []; // primes to 10007 inclusive (stretch bases + tops)
for (let n = 2; n <= 10007; n++) if (isP(n)) smallPrimes.push(n);
function piSmall(t) { let c = 0; for (const p of smallPrimes) { if (p > t) break; c++; } return c; }

// ---------- TOS twin-gap table, parsed under zonegap-01's guards ----------
const TOSPATH = path.join(__dirname, 'tos-twin-gaps-1e16.txt');
const tosBytes = fs.readFileSync(TOSPATH);
const tosSha = crypto.createHash('sha256').update(tosBytes).digest('hex');
abortIf('tos-sha256', !tosSha.startsWith('78767cadd001b1b0'));
const rows = []; // { g, gstar, F (Number shadow), Fbig (exact), fstar, T }
for (const line of tosBytes.toString('utf8').split('\n')) {
  const m = line.match(/^\s*(\d+)(\*?)\s+(\d+)(\*?)\s+(\d+)\s*$/);
  if (m) {
    const Fbig = BigInt(m[3]), F = Number(m[3]);
    abortIf('tos-F-shadow', Fbig > 0n && (Fbig - BigInt(Math.round(F)) > 2n || BigInt(Math.round(F)) - Fbig > 2n));
    rows.push({ g: +m[1], gstar: m[2] === '*', F, Fbig, fstar: m[4] === '*', T: +m[5] });
  }
}
abortIf('tos-rowcount', rows.length !== 4051); // 4051 (g, F, T) rows parse; zonegap-01's own loader parses the same file with the same regex
for (let i = 1; i < rows.length; i++) abortIf('tos-g-monotone', rows[i].g <= rows[i - 1].g);
for (const r of rows) abortIf('tos-g-mod6', !(r.g % 6 === 0 || r.g === 2));
const records = rows.filter(r => r.gstar); // starred g rows = A113274 records 1..75
abortIf('tos-75-records', records.length !== 75);
for (let i = 1; i < records.length; i++) abortIf('rec-F-monotone', records[i].F <= records[i - 1].F);
abortIf('rec-first-six', records.slice(0, 6).map(r => r.g).join(',') !== '2,6,12,18,30,36');
abortIf('rec-41', records[40].g !== 8040 || records[40].F !== 65095731749);
abortIf('rec-75', records[74].g !== 28842 || records[74].F !== 2797282815481499);
const rowsByF = rows.slice().sort((a, b) => (a.Fbig < b.Fbig ? -1 : 1));
const maxFbig = rowsByF[rowsByF.length - 1].Fbig; // largest known first-occurrence opener
abortIf('maxF-value', maxFbig !== 9993981791330417n); // > 2^53: BigInt path required
abortIf('rec-F-under-2^53', !records.every(r => r.F < 2 ** 53));

console.log('CALIBRATION (abort on mismatch)');
console.log(`  TOS table: sha256 ${tosSha.slice(0, 16)}... OK; 4051 rows, 75 starred records; record 41 = 8040 @ 65095731749, record 75 = 28842 @ 2797282815481499  OK`);
console.log(`  largest first-occurrence opener in table: maxF = ${maxFbig} (g = ${rowsByF[rowsByF.length - 1].g}); maxF > 2^53, BigInt shadow parse in force  OK`);

// ---------- remaining calibration anchors ----------------------------------
// Chris's hand examples (the frame's own anchors):
function nextPrimeSieve(n) { let m = n + 1; while (!isP(m)) m++; return m; }
abortIf('chris-11', nextPrimeSieve(121) !== 127);
abortIf('chris-13', nextPrimeSieve(169) !== 173);
console.log('  Chris anchors: first prime after 121 is 127, after 169 is 173  OK');
// natal-onset-01 window totals over 1..1e4 (channel pairs / survivors):
{
  let chan = 0, surv = 0;
  for (let a = 11; a <= 9998; a++) {
    const c = a % 30;
    if (c === 11 || c === 17 || c === 29) { chan++; if (isP(a) && isP(a + 2)) surv++; }
  }
  abortIf('natal-999', chan !== 999);
  abortIf('natal-203', surv !== 203);
  console.log('  natal-onset window 1..1e4: 999 channel pairs, 203 survivors (true twins)  OK');
}
// zonegap-01 anchors: Z2(11) = 30, Z2(13) = 30 (brute force, prime side):
function zoneStats(p) {
  const pp = nextPrimeSieve(p), top = pp * pp;
  const openers = [];
  for (let a = p + 1; a + 2 < top; a++) if (isP(a) && isP(a + 2)) openers.push(a);
  let z2 = 0;
  for (let i = 1; i < openers.length; i++) z2 = Math.max(z2, openers[i] - openers[i - 1]);
  return { n: openers.length, z2, head: openers[0] - p, tail: top - openers[openers.length - 1] };
}
{
  const z11 = zoneStats(11), z13 = zoneStats(13);
  abortIf('Z2(11)', z11.z2 !== 30 || z11.n !== 9 || z11.head !== 6 || z11.tail !== 20);
  abortIf('Z2(13)', z13.z2 !== 30 || z13.n !== 16 || z13.head !== 4 || z13.tail !== 8);
  console.log('  zonegap anchors: Z2(11) = 30 (9 pairs, head 6, tail 20), Z2(13) = 30 (16 pairs, head 4, tail 8)  OK');
}
// constants (ZONE-POSTULATE §6 machinery):
const GAMMA = 0.5772156649015329, C2 = 0.6601618158468696;
const RHO2 = Math.exp(2 * GAMMA) / 4;
abortIf('rho2', Math.abs(RHO2 - 0.793055) > 1e-6);
console.log(`  e^{2gamma} = ${Math.exp(2 * GAMMA).toFixed(4)}, rho(2) = e^{2gamma}/4 = ${RHO2.toFixed(6)}, 2*C2 = ${(2 * C2).toFixed(7)}  OK`);
console.log('');

// ============================================================================
// SEC A — THE STRETCH DECOMPOSITION, EXACT (freeze, finality, zone identity)
// ============================================================================
console.log('SEC A — STRETCH DECOMPOSITION (freeze, finality, zone = union of stretches)');
// (A1) freeze: for every n in S_q, the influencer set {r prime : r^2 <= n}
//      is exactly {r prime : r <= q} — verified integer by integer, q <= 97.
// (A2) finality/certification: wheel-survivors of T_q inside S_q (lpf test:
//      lpf(a) > q and lpf(a+2) > q) == twin-prime openers in S_q, as SETS.
// (A3) no pair straddles a boundary: no opener a with a < q'^2 <= a+2.
function lpfOver(n, q) { // true iff least prime factor of n exceeds q
  for (const r of smallPrimes) { if (r > q) break; if (n % r === 0) return false; }
  return true;
}
{
  let stretches = 0, npairs = 0;
  for (let qi = 0; smallPrimes[qi] <= 97; qi++) {
    const q = smallPrimes[qi], qp = smallPrimes[qi + 1];
    const lo = q * q, hi = qp * qp;
    // A1 freeze: for EVERY n in S_q, the largest prime r with r^2 <= n is q
    // (computed independently via isqrt + sieve, not via the interval bounds):
    for (let n = lo; n < hi; n++) {
      let s = Math.floor(Math.sqrt(n));
      while (s * s > n) s--; while ((s + 1) * (s + 1) <= n) s++; // exact isqrt
      let r = s; while (r >= 2 && !isP(r)) r--;                  // largest prime <= isqrt(n)
      if (r !== q) { assertTrue(`A1-freeze q=${q} n=${n}`, false); break; }
    }
    // A2 finality:
    const slotSide = [], primeSide = [];
    for (let a = lo; a + 2 < hi; a++) {
      if (lpfOver(a, q) && lpfOver(a + 2, q)) slotSide.push(a);
      if (isP(a) && isP(a + 2)) primeSide.push(a);
    }
    assertEq(`A2-finality q=${q}`, slotSide, primeSide);
    // A3 straddle: the only candidates are a = hi-2, hi-1 (a < hi <= a+2):
    for (let a = hi - 2; a < hi; a++) if (isP(a) && isP(a + 2)) assertTrue(`A3-straddle q=${q}`, false);
    stretches++; npairs += primeSide.length;
    if (q <= 23) console.log(`  S_${q} = [${lo}, ${hi}): ${primeSide.length} pairs, slot-side == prime-side EQUAL, frozen set {7..${q}} (wheel)`);
  }
  console.log(`  A1/A2/A3 verified at all ${stretches} stretches q = 2..97 (${npairs} pairs)`);
}
// (A4) zone identity: (p, p'^2) = (p, r0^2) U S_{r0} U ... U S_p, r0 = least
//      prime with r0^2 > p; count of full stretches = pi(p) - pi(sqrt(p)).
{
  const rowsOut = [];
  for (const p of [7, 11, 13, 17, 23, 53, 97]) {
    const pp = nextPrimeSieve(p);
    let r0 = 2; while (r0 * r0 <= p) r0 = nextPrimeSieve(r0);
    // chain the stretch endpoints from r0^2: tops of consecutive stretches
    // must meet exactly, and the last stretch's top must be p'^2:
    let q = r0, chainOK = (r0 * r0 > p) && (nextPrimeSieve(Math.floor(Math.sqrt(p))) === r0);
    let count = 0, cursor = r0 * r0;
    while (q <= p) {
      const qn = nextPrimeSieve(q);
      chainOK = chainOK && (q * q === cursor); // bottom of S_q meets the chain
      cursor = qn * qn; count++; q = qn;
    }
    chainOK = chainOK && (cursor === pp * pp) && (count === piSmall(p) - piSmall(Math.floor(Math.sqrt(p))));
    assertTrue(`A4-zone p=${p}`, chainOK);
    rowsOut.push(`p=${p}: (${p}, ${pp * pp}) = (${p}, ${r0 * r0}) + ${count} stretches [pi(p)-pi(sqrt p) = ${count}], last = S_${p}`);
  }
  for (const r of rowsOut) console.log('  ' + r);
  console.log('  S_p is a subset of zone p at every level (SP => strong ZP containment): true by p < p^2');
}
// (A5) the stretch is an unwrapped window of T_q for q >= 7: q'^2 < q#:
{
  let W = 1, ok = true;
  for (const q of [2, 3, 5, 7, 11, 13]) { W *= q; const qp = nextPrimeSieve(q); if (q >= 7) ok = ok && (qp * qp < W); }
  assertTrue('A5-unwrapped', ok);
  console.log('  A5: q\'^2 < q# at q = 7, 11, 13 (121 < 210, 169 < 2310, 289 < 30030); ln q# ~ q vs 2 ln q\' thereafter');
}
console.log('');
// ============================================================================
// SEC B — THE DELTA, SPLIT HONESTLY: BOUNDED CONSTANT vs DIVERGING MARGIN
// ============================================================================
// B1. The density delta is a BOUNDED CONSTANT and it is ADVERSE. The
// stretch's survivor density is the tile density d(q) = (1/10) *
// prod_{7<=r<=q}(1 - 2/r) (per integer; the 1/10 is the mod-30 channel
// share). The true twin density at height q^2 is 2*C2/ln^2(q^2). Their
// ratio tends to rho(2) = e^{2gamma}/4 = 0.79305 — the SAME constant that
// closed Route B (REFUTED.md; ZONE-POSTULATE.md §6): the stretch sits at
// u = 2, the MINIMUM of the survival curve. Measured per band below.
// NO density-advantage claim is made here or anywhere in this producer.
console.log('SEC B1 — DENSITY DELTA (bounded, adverse; Route B stays closed)');
const BANDS = [[101, 313], [317, 997], [1009, 3161], [3163, 9973]];
// one pass over all stretches q = 2..9973: occupancy, pair counts, band
// aggregates, and the SEC C2 offset histograms (q >= 317 only).
const HR = [7, 11, 13, 17, 19, 23];
const hist = {}; for (const r of HR) hist[r] = new Array(r).fill(0);
const cond = {}; for (const r of HR) cond[r] = new Array(r).fill(0); // conditional null mass
let forbiddenHits = 0; // must stay 0 (certification in offset coordinates)
const band = BANDS.map(() => ({ w: 0, pairs: 0, dsum: 0, hl: 0 }));
let minPairs = Infinity, minPairsQ = -1, totStretch = 0, totPairs = 0, unocc = 0;
{
  let d = 1 / 10; // tile density: channel share, then (1-2/r) per active r >= 7
  for (let qi = 0; smallPrimes[qi] <= 9973; qi++) {
    const q = smallPrimes[qi], qp = smallPrimes[qi + 1];
    if (q >= 7) d *= 1 - 2 / q;
    const lo = q * q, hi = qp * qp, width = hi - lo;
    let a0 = lo % 2 === 0 ? lo + 1 : lo, pairs = 0;
    const doHist = q >= 317;
    const forb = doHist ? HR.map(r => { const al = (q % r) * (q % r) % r; return [(r - al) % r, (2 * r - al - 2) % r]; }) : null;
    for (let a = a0; a + 2 < hi; a += 2) {
      if (isP(a) && isP(a + 2)) {
        pairs++;
        if (doHist) {
          const t = a - lo;
          for (let k = 0; k < HR.length; k++) {
            const r = HR[k], c = t % r;
            hist[r][c]++;
            if (c === forb[k][0] || c === forb[k][1]) forbiddenHits++;
          }
        }
      }
    }
    if (doHist && pairs > 0) { // conditional null: anchors and per-stretch totals fixed,
      // only the offsets' placement among the r-2 allowed classes is tested
      for (let k = 0; k < HR.length; k++) {
        const r = HR[k];
        for (let c = 0; c < r; c++) if (c !== forb[k][0] && c !== forb[k][1]) cond[r][c] += pairs / (r - 2);
      }
    }
    totStretch++; totPairs += pairs;
    if (pairs === 0) unocc++;
    if (pairs < minPairs) { minPairs = pairs; minPairsQ = q; }
    for (let b = 0; b < BANDS.length; b++) if (q >= BANDS[b][0] && q <= BANDS[b][1]) {
      band[b].w += width; band[b].pairs += pairs; band[b].dsum += width * d;
      band[b].hl += width * 2 * C2 / Math.pow(Math.log(q * qp), 2);
    }
  }
  for (let b = 0; b < BANDS.length; b++) {
    const B = band[b], meas = B.pairs / B.w, dbar = B.dsum / B.w, hl = B.hl / B.w;
    console.log(`  q in [${BANDS[b][0]}, ${BANDS[b][1]}]: measured ${meas.toExponential(3)}  tile d ${dbar.toExponential(3)}  measured/tile = ${(meas / dbar).toFixed(4)}  HL/tile = ${(hl / dbar).toFixed(4)}  measured/HL = ${(meas / hl).toFixed(4)}  [limit rho(2) = ${RHO2.toFixed(4)}]`);
  }
  console.log('  the delta is the bounded constant rho(2) and it is a DEFICIT (stretch sits at the survival-curve minimum u = 2); the divergence lives in the WIDTH, below.');
}
console.log('');

// B2. OCCUPANCY. Direct: every stretch q = 2..9973 (tops to 10007^2 ~ 1e8).
// Criterion (adopted data, no sieve): if S_q held no pair, the twin-opener
// gap straddling it would run from some a < q^2 to b >= q'^2 - 2; for
// q^2 <= maxF the table's own opener maxF sits above a, so b <= maxF and
// the gap is in-table, of size <= runmax(q^2) = max{g : F(g) < q^2}
// (records complete below 1e16, zonegap-01 custody). So
//   q'^2 - q^2 - 2 > runmax(q^2)  ==>  S_q occupied.
console.log('SEC B2 — OCCUPANCY');
console.log(`  direct (sieve to 1e8): ${totStretch} stretches q = 2..9973, unoccupied: ${unocc}; min pairs = ${minPairs} at q = ${minPairsQ}; total pairs ${totPairs}`);
assertTrue('B2-direct-occupancy', unocc === 0);
{
  // streaming pass over consecutive primes q < q'. Cap: q'^2 < 2^53 keeps
  // every square exact in doubles (94906265^2 = 9007199171075225 < 2^53);
  // and q^2 < 2^53 < maxF keeps the straddle argument's b <= maxF valid.
  const QP_CAP = 94906265; // q' must not exceed this
  let prev = 2, ptr = 0, runmax = 0, envPtr = 0, env = 0;
  const byF = rowsByF; // all rows sorted by F (running max over ALL first occurrences)
  // pointer comparisons: Number shadows decide outside a +-4 band; inside it, BigInt.
  const fBelow = (row, limit) => { // is row.F < limit (limit an exact double integer)?
    if (row.F < limit - 4) return true;
    if (row.F > limit + 4) return false;
    return row.Fbig < BigInt(limit);
  };
  const recByF = records.slice().sort((a, b) => a.F - b.F);
  const dec = []; // per-decade of q: min slack ratio, min/mean margin M_env
  const decOf = q => Math.floor(Math.log10(q));
  const failQ = []; let minSlack = Infinity, minSlackQ = 0, checked = 0, maxHi = 0;
  for (let n = 3; n <= N; n++) {
    if (!isP(n)) continue;
    const q = prev, qp = n; prev = n;
    if (q < 3) continue;
    if (qp > QP_CAP) break;
    const lo = q * q, hi = qp * qp, width = hi - lo;
    if (hi > maxHi) maxHi = hi;
    while (ptr < byF.length && fBelow(byF[ptr], lo)) { if (byF[ptr].g > runmax) runmax = byF[ptr].g; ptr++; }
    while (envPtr < recByF.length && recByF[envPtr].F + recByF[envPtr].g + 2 < hi) { if (recByF[envPtr].g > env) env = recByF[envPtr].g; envPtr++; } // record F's all < 2.8e15, exact
    checked++;
    if (!(width - 2 > runmax)) failQ.push(q);
    const slack = (width - 2) / Math.max(runmax, 2);
    if (slack < minSlack) { minSlack = slack; minSlackQ = q; }
    const D = decOf(q);
    if (!dec[D]) dec[D] = { minSlack: Infinity, q1: 0, minM: Infinity, q2: 0, sumM: 0, n: 0, env: 0, lnq: 0 };
    const M = env > 0 ? width / env : Infinity;
    const d = dec[D];
    if (slack < d.minSlack) { d.minSlack = slack; d.q1 = q; }
    if (M < d.minM) { d.minM = M; d.q2 = q; }
    if (M !== Infinity) { d.sumM += M; d.n++; } d.env = env; d.lnq = Math.log(q);
  }
  // the sufficient criterion is allowed to fail ONLY where the direct sieve
  // already certifies occupancy (q <= 9973). It fails at exactly one stretch:
  assertEq('B2-criterion-exceptions', failQ, [29]); // S_29 = [841, 961): width-2 = 118 < runmax = 150 (record 8 at F = 659); direct sieve shows 2 pairs there
  console.log(`  criterion (adopted record data, NO sieve): width - 2 > runmax(q^2) at ${checked - failQ.length} of ${checked} stretches with q'^2 < 2^53`);
  console.log('  sole exception q = 29: S_29 = [841, 961), width - 2 = 118 < runmax = 150 (record 8 at F = 659); covered by the direct sieve (S_29 holds 2 pairs)');
  console.log(`  (largest stretch top checked: q'^2 = ${maxHi}); worst slack beyond q = 29: see decade table`);
  console.log('  => STRETCH OCCUPANCY holds at every stretch with q\'^2 < 2^53 ~ 9.007e15: direct sieve to 1e8, adopted-table criterion beyond (TOS custody, zonegap-01 §1)');
  console.log('');
  // B3. THE MARGIN THAT DIVERGES: M(k) = width / env(q'^2), env = largest
  // published record wholly below the stretch top (= the zone envelope
  // Z2(q), zonegap-03's identity). Danger is polylog, width is ~2q ln q.
  console.log('SEC B3 — THE DIVERGING MARGIN M = width/env (per decade of q)');
  console.log('  decade | min slack (width-2)/runmax | min M = width/env | mean M | env at decade top | env/ln^3 q | q/(minM ln^2 q)');
  for (let D = 0; D < dec.length; D++) {
    if (!dec[D]) continue;
    const d = dec[D];
    const qtop = Math.pow(10, D + 1);
    console.log(`  10^${D}..10^${D + 1}: minSlack ${d.minSlack.toFixed(2)} @ q=${d.q1} | minM ${d.minM.toFixed(2)} @ q=${d.q2} | meanM ${(d.sumM / d.n).toFixed(1)} | env ${d.env} | ${(d.env / Math.pow(d.lnq, 3)).toFixed(2)} | ${(d.q2 / (d.minM * Math.pow(Math.log(d.q2), 2))).toFixed(3)}`);
  }
  console.log('  M diverges ~ q/ln^2 q (mean) and ~ q/ln^3 q (min, twin-q stretches of width 4q+4); none of this divergence is evidence at the gap scale (square-window lesson, ZONE-POSTULATE §5a).');
}
console.log('');
// ============================================================================
// SEC C — THE SQUARE ANCHOR: QR STRUCTURE, ITS EXACT MEAN, ITS SIGNATURE
// ============================================================================
// C1. PROVEN structure, verified exhaustively. Inside S_q, active prime r
// kills opener q^2 + t iff t = -alpha or -alpha - 2 (mod r), where
// alpha = (q mod r)^2 mod r is a NONZERO QUADRATIC RESIDUE. Consequences,
// each verified below for r in {7..31} over all prime anchors q in (r, 2000]:
//   (i)  the forbidden pair per r is {-alpha, -alpha-2}, alpha in QR(r);
//        only (r-1)/2 of the r generic offset pairs can occur.
//   (ii) offset class t is r-killable at SOME anchor iff -t or -t-2 is a
//        nonzero QR mod r; classes with BOTH nonresidues (or 0) are IMMUNE
//        at every square anchor — structure a generic window does not have.
//   (iii) GUARDRAIL: the anchor-ensemble mean kill incidence is EXACTLY the
//        generic 2/r — sum_c [roots(-c) + roots(-c-2)] = 2(r-1) with
//        roots(a) = #{units u : u^2 = a} — so the QR structure REDISTRIBUTES
//        kills over offsets and adds NO density advantage (Route B closed).
console.log('SEC C1 — SQUARE-ANCHOR KILL STRUCTURE (proven, verified)');
for (const r of [7, 11, 13, 17, 19, 23, 29, 31]) {
  const qr = new Set();
  for (let u = 1; u < r; u++) qr.add((u * u) % r);
  const roots = a => { a = ((a % r) + r) % r; return a === 0 ? 0 : (qr.has(a) ? 2 : 0); };
  // exhaustive verification over prime anchors:
  const seenAlpha = new Set();
  let ok = true;
  for (const q of smallPrimes) {
    if (q <= r) continue; if (q > 2000) break;
    const al = (q % r) * (q % r) % r;
    seenAlpha.add(al);
    ok = ok && qr.has(al) && al !== 0;
    // direct kill check on the first r offsets of the actual stretch:
    for (let t = 0; t < r; t++) {
      const killsA = (q * q + t) % r === 0, killsB = (q * q + t + 2) % r === 0;
      ok = ok && (killsA === (t % r === (r - al) % r)) && (killsB === (t % r === (2 * r - al - 2) % r));
    }
  }
  assertTrue(`C1-r${r}-forbidden-pair`, ok);
  assertTrue(`C1-r${r}-alpha-covers-QR`, seenAlpha.size === (r - 1) / 2);
  const immune = []; let inc = 0;
  for (let c = 0; c < r; c++) { const f = roots(-c) + roots(-c - 2); inc += f; if (f === 0) immune.push(c); }
  assertTrue(`C1-r${r}-mean-exact`, inc === 2 * (r - 1));
  console.log(`  r=${r}: alpha ranges over all ${(r - 1) / 2} QRs; immune offset classes {${immune.join(',')}} (${immune.length}/${r}); total kill incidence ${inc} = 2(r-1) exactly => ensemble mean 2/r, generic`);
}
console.log('');

// C2. MEASURED signature: aggregate offset histograms t mod r over all twin
// openers in stretches q in [317, 9973] (heights 1e5..1e8), against the
// DERIVED null (no fit): share(c) = (1 - f(c))/(r - 2) with
// f(c) = [roots(-c) + roots(-c-2)]/(r - 1) — q uniform over units mod r
// (Dirichlet) and openers uniform over their allowed classes (HL).
console.log('SEC C2 — MEASURED OFFSET SIGNATURE vs THE DERIVED NULL');
assertTrue('C2-forbidden-zero', forbiddenHits === 0);
console.log(`  certification in offset coordinates: twin openers in forbidden classes: ${forbiddenHits} (must be 0)`);
for (const r of HR) {
  const qr = new Set(); for (let u = 1; u < r; u++) qr.add((u * u) % r);
  const roots = a => { a = ((a % r) + r) % r; return a === 0 ? 0 : (qr.has(a) ? 2 : 0); };
  // marginal null: q uniform over units (Dirichlet) — carries anchor-sampling
  // variance the chi2 does not price. Conditional null: the realized anchors
  // and per-stretch pair totals are FIXED; only offset placement is random.
  const Ntot = hist[r].reduce((x, y) => x + y, 0);
  let chi2 = 0, chi2c = 0, worst = 0, worstC = 0;
  const obs = [], exp = [], expc = [];
  for (let c = 0; c < r; c++) {
    const f = (roots(-c) + roots(-c - 2)) / (r - 1);
    const e = Ntot * (1 - f) / (r - 2), o = hist[r][c], ec = cond[r][c];
    obs.push((o / Ntot).toFixed(4)); exp.push((e / Ntot).toFixed(4)); expc.push((ec / Ntot).toFixed(4));
    chi2 += (o - e) * (o - e) / e;
    chi2c += (o - ec) * (o - ec) / ec;
    const dev = Math.abs(o / ec - 1);
    if (dev > worst) { worst = dev; worstC = c; }
  }
  console.log(`  r=${r} (N=${Ntot}): marginal null chi2/df = ${(chi2 / (r - 1)).toFixed(2)}; CONDITIONAL null (anchors fixed) chi2/df = ${(chi2c / (r - 1)).toFixed(2)} (df ${r - 1}); worst class vs conditional c=${worstC}, ${(worst * 100).toFixed(2)}%`);
  if (r === 7) { console.log(`    obs shares:  [${obs.join(', ')}]`); console.log(`    cond null:   [${expc.join(', ')}]`); console.log(`    marg null:   [${exp.join(', ')}]`); }
}
console.log('  the offset signature is REAL (non-flat, character-determined) and it is EXACTLY the CRT null: structure, not advantage.');
console.log('');

// C3. RECORDS vs PRIME SQUARES: is the deep-end loading a square-anchor
// effect? The null (derived first): record-gap positions are square-blind,
// so (s - p0^2)/(p0'^2 - p0^2) is uniform on [0,1), and the number of
// records whose gap interval CONTAINS a prime square is sum g/(2 sqrt(s) ln sqrt(s)).
console.log('SEC C3 — RECORD GAPS vs PRIME SQUARES (deep-end reconciliation)');
{
  let contain = 0, expect = 0, fracSum = 0, fmin = 2, fmax = -1;
  const bins = new Array(10).fill(0);
  let containList = [];
  for (const rec of records) {
    const s = rec.F, e = rec.F + rec.g + 2;
    let r0 = Math.floor(Math.sqrt(s)); while (r0 * r0 > s) r0--; while ((r0 + 1) * (r0 + 1) <= s) r0++;
    // primes p with s < p^2 < e  <=>  sqrt(s) < p < sqrt(e):
    let inCount = 0;
    for (let p = r0 + 1; p * p < e; p++) if (isP(p)) inCount++;
    if (inCount > 0) { contain += 1; containList.push(`n=${records.indexOf(rec) + 1} (g=${rec.g}, ${inCount} square${inCount > 1 ? 's' : ''})`); }
    assertTrue('C3-no-two-squares', inCount <= 1); // two would swallow a whole stretch
    expect += rec.g / (2 * Math.sqrt(s) * Math.log(Math.sqrt(s)));
    // placement fraction of the record start inside its own stretch:
    let p0 = r0; while (p0 >= 2 && !isP(p0)) p0--;
    const p1 = nextPrimeSieve(p0);
    const frac = (s - p0 * p0) / (p1 * p1 - p0 * p0);
    fracSum += frac; fmin = Math.min(fmin, frac); fmax = Math.max(fmax, frac);
    bins[Math.min(9, Math.floor(frac * 10))]++;
  }
  console.log(`  records whose gap interval contains a prime square: ${contain} (null expectation ${expect.toFixed(2)})${contain ? ' — ' + containList.join('; ') : ''}`);
  console.log(`  placement of record starts inside their stretch: mean frac ${(fracSum / records.length).toFixed(3)} (null 0.5), min ${fmin.toFixed(3)}, max ${fmax.toFixed(3)}`);
  console.log(`  decile counts: [${bins.join(', ')}] over ${records.length} records (null 7.5 each)`);
  console.log('  no record contains two consecutive prime squares (none may: occupancy, SEC B2); the deep-end u->1 loading is ENVELOPE BOOKKEEPING (zonegap-03: Z2 = env, D = 0; zonegap-02 D1: the deep end is an onset desert), not square-anchor attraction.');
}
console.log('');

// ============================================================================
console.log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/stretch-01.js
//   invocation:  node research/stretch-01.js
//   code-sha256: 446167b937f8b7c92c62c834ce3626b4e82a65a74b8a58318d87b143aa663e16
//   out-sha256:  fb0be535a6692a90ccfdad7835c7a717155aba946b18364c382ccb4a603e7092
//   body-lines:  86
//   forced:      2026-08-21, 0 of 152 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     0.9 s
// ============================================================================
// CALIBRATION (abort on mismatch)
//   TOS table: sha256 78767cadd001b1b0... OK; 4051 rows, 75 starred records; record 41 = 8040 @ 65095731749, record 75 = 28842 @ 2797282815481499  OK
//   largest first-occurrence opener in table: maxF = 9993981791330417 (g = 26724); maxF > 2^53, BigInt shadow parse in force  OK
//   Chris anchors: first prime after 121 is 127, after 169 is 173  OK
//   natal-onset window 1..1e4: 999 channel pairs, 203 survivors (true twins)  OK
//   zonegap anchors: Z2(11) = 30 (9 pairs, head 6, tail 20), Z2(13) = 30 (16 pairs, head 4, tail 8)  OK
//   e^{2gamma} = 3.1722, rho(2) = e^{2gamma}/4 = 0.793055, 2*C2 = 1.3203236  OK
//
// SEC A — STRETCH DECOMPOSITION (freeze, finality, zone = union of stretches)
//   S_2 = [4, 9): 1 pairs, slot-side == prime-side EQUAL, frozen set {7..2} (wheel)
//   S_3 = [9, 25): 2 pairs, slot-side == prime-side EQUAL, frozen set {7..3} (wheel)
//   S_5 = [25, 49): 2 pairs, slot-side == prime-side EQUAL, frozen set {7..5} (wheel)
//   S_7 = [49, 121): 4 pairs, slot-side == prime-side EQUAL, frozen set {7..7} (wheel)
//   S_11 = [121, 169): 2 pairs, slot-side == prime-side EQUAL, frozen set {7..11} (wheel)
//   S_13 = [169, 289): 7 pairs, slot-side == prime-side EQUAL, frozen set {7..13} (wheel)
//   S_17 = [289, 361): 2 pairs, slot-side == prime-side EQUAL, frozen set {7..17} (wheel)
//   S_19 = [361, 529): 4 pairs, slot-side == prime-side EQUAL, frozen set {7..19} (wheel)
//   S_23 = [529, 841): 8 pairs, slot-side == prime-side EQUAL, frozen set {7..23} (wheel)
//   A1/A2/A3 verified at all 25 stretches q = 2..97 (209 pairs)
//   p=7: (7, 121) = (7, 9) + 3 stretches [pi(p)-pi(sqrt p) = 3], last = S_7
//   p=11: (11, 169) = (11, 25) + 3 stretches [pi(p)-pi(sqrt p) = 3], last = S_11
//   p=13: (13, 289) = (13, 25) + 4 stretches [pi(p)-pi(sqrt p) = 4], last = S_13
//   p=17: (17, 361) = (17, 25) + 5 stretches [pi(p)-pi(sqrt p) = 5], last = S_17
//   p=23: (23, 841) = (23, 25) + 7 stretches [pi(p)-pi(sqrt p) = 7], last = S_23
//   p=53: (53, 3481) = (53, 121) + 12 stretches [pi(p)-pi(sqrt p) = 12], last = S_53
//   p=97: (97, 10201) = (97, 121) + 21 stretches [pi(p)-pi(sqrt p) = 21], last = S_97
//   S_p is a subset of zone p at every level (SP => strong ZP containment): true by p < p^2
//   A5: q'^2 < q# at q = 7, 11, 13 (121 < 210, 169 < 2310, 289 < 30030); ln q# ~ q vs 2 ln q' thereafter
//
// SEC B1 — DENSITY DELTA (bounded, adverse; Route B stays closed)
//   q in [101, 313]: measured 1.126e-2  tile d 1.412e-2  measured/tile = 0.7980  HL/tile = 0.8132  measured/HL = 0.9813  [limit rho(2) = 0.7931]
//   q in [317, 997]: measured 7.722e-3  tile d 9.679e-3  measured/tile = 0.7978  HL/tile = 0.8016  measured/HL = 0.9953  [limit rho(2) = 0.7931]
//   q in [1009, 3161]: measured 5.641e-3  tile d 7.033e-3  measured/tile = 0.8021  HL/tile = 0.7975  measured/HL = 1.0057  [limit rho(2) = 0.7931]
//   q in [3163, 9973]: measured 4.237e-3  tile d 5.332e-3  measured/tile = 0.7946  HL/tile = 0.7951  measured/HL = 0.9993  [limit rho(2) = 0.7931]
//   the delta is the bounded constant rho(2) and it is a DEFICIT (stretch sits at the survival-curve minimum u = 2); the divergence lives in the WIDTH, below.
//
// SEC B2 — OCCUPANCY
//   direct (sieve to 1e8): 1229 stretches q = 2..9973, unoccupied: 0; min pairs = 1 at q = 2; total pairs 440870
//   criterion (adopted record data, NO sieve): width - 2 > runmax(q^2) at 5484595 of 5484596 stretches with q'^2 < 2^53
//   sole exception q = 29: S_29 = [841, 961), width - 2 = 118 < runmax = 150 (record 8 at F = 659); covered by the direct sieve (S_29 holds 2 pairs)
//   (largest stretch top checked: q'^2 = 9007196099250001); worst slack beyond q = 29: see decade table
//   => STRETCH OCCUPANCY holds at every stretch with q'^2 < 2^53 ~ 9.007e15: direct sieve to 1e8, adopted-table criterion beyond (TOS custody, zonegap-01 §1)
//
// SEC B3 — THE DIVERGING MARGIN M = width/env (per decade of q)
//   decade | min slack (width-2)/runmax | min M = width/env | mean M | env at decade top | env/ln^3 q | q/(minM ln^2 q)
//   10^0..10^1: minSlack 1.83 @ q=5 | minM 2.00 @ q=5 | meanM 2.4 | env 30 | 4.07 | 0.965
//   10^1..10^2: minSlack 0.79 @ q=29 | minM 0.80 @ q=29 | meanM 3.0 | env 210 | 2.19 | 3.197
//   10^2..10^3: minSlack 1.44 @ q=179 | minM 1.45 @ q=179 | meanM 8.0 | env 1452 | 4.41 | 4.601
//   10^3..10^4: minSlack 2.81 @ q=1019 | minM 2.81 @ q=1019 | meanM 38.5 | env 2868 | 3.67 | 7.559
//   10^4..10^5: minSlack 13.96 @ q=10007 | minM 13.96 @ q=10007 | meanM 219.3 | env 6030 | 3.95 | 8.450
//   10^5..10^6: minSlack 66.44 @ q=100151 | minM 66.44 @ q=100151 | meanM 1462.1 | env 11388 | 4.32 | 11.370
//   10^6..10^7: minSlack 351.26 @ q=1000037 | minM 351.26 @ q=1000037 | meanM 10215.7 | env 18384 | 4.39 | 14.916
//   10^7..10^8: minSlack 2175.84 @ q=10000139 | minM 2175.84 @ q=10000139 | meanM 67968.9 | env 28842 | 4.65 | 17.691
//   M diverges ~ q/ln^2 q (mean) and ~ q/ln^3 q (min, twin-q stretches of width 4q+4); none of this divergence is evidence at the gap scale (square-window lesson, ZONE-POSTULATE §5a).
//
// SEC C1 — SQUARE-ANCHOR KILL STRUCTURE (proven, verified)
//   r=7: alpha ranges over all 3 QRs; immune offset classes {0,2} (2/7); total kill incidence 12 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=11: alpha ranges over all 5 QRs; immune offset classes {1,3,9} (3/11); total kill incidence 20 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=13: alpha ranges over all 6 QRs; immune offset classes {0,5,6,11} (4/13); total kill incidence 24 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=17: alpha ranges over all 8 QRs; immune offset classes {3,5,10,12} (4/17); total kill incidence 32 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=19: alpha ranges over all 9 QRs; immune offset classes {4,5,7,9,17} (5/19); total kill incidence 36 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=23: alpha ranges over all 11 QRs; immune offset classes {0,1,2,4,6,16} (6/23); total kill incidence 44 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=29: alpha ranges over all 14 QRs; immune offset classes {0,8,10,12,15,17,19,27} (8/29); total kill incidence 56 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=31: alpha ranges over all 15 QRs; immune offset classes {0,2,5,7,8,14,16,18} (8/31); total kill incidence 60 = 2(r-1) exactly => ensemble mean 2/r, generic
//
// SEC C2 — MEASURED OFFSET SIGNATURE vs THE DERIVED NULL
//   certification in offset coordinates: twin openers in forbidden classes: 0 (must be 0)
//   r=7 (N=439644): marginal null chi2/df = 21.85; CONDITIONAL null (anchors fixed) chi2/df = 0.86 (df 6); worst class vs conditional c=6, 0.47%
//     obs shares:  [0.2007, 0.1309, 0.2008, 0.0635, 0.1361, 0.1324, 0.1356]
//     cond null:   [0.2000, 0.1315, 0.2000, 0.0638, 0.1362, 0.1323, 0.1362]
//     marg null:   [0.2000, 0.1333, 0.2000, 0.0667, 0.1333, 0.1333, 0.1333]
//   r=11 (N=439644): marginal null chi2/df = 5.89; CONDITIONAL null (anchors fixed) chi2/df = 0.52 (df 10); worst class vs conditional c=5, 0.56%
//   r=13 (N=439644): marginal null chi2/df = 7.57; CONDITIONAL null (anchors fixed) chi2/df = 0.93 (df 12); worst class vs conditional c=3, 1.14%
//   r=17 (N=439644): marginal null chi2/df = 3.19; CONDITIONAL null (anchors fixed) chi2/df = 0.91 (df 16); worst class vs conditional c=0, 1.32%
//   r=19 (N=439644): marginal null chi2/df = 5.34; CONDITIONAL null (anchors fixed) chi2/df = 0.64 (df 18); worst class vs conditional c=7, 0.97%
//   r=23 (N=439644): marginal null chi2/df = 3.32; CONDITIONAL null (anchors fixed) chi2/df = 1.63 (df 22); worst class vs conditional c=5, 2.40%
//   the offset signature is REAL (non-flat, character-determined) and it is EXACTLY the CRT null: structure, not advantage.
//
// SEC C3 — RECORD GAPS vs PRIME SQUARES (deep-end reconciliation)
//   records whose gap interval contains a prime square: 8 (null expectation 9.92) — n=1 (g=2, 1 square); n=2 (g=6, 1 square); n=3 (g=12, 1 square); n=4 (g=18, 1 square); n=7 (g=72, 1 square); n=12 (g=372, 1 square); n=13 (g=498, 1 square); n=20 (g=1530, 1 square)
//   placement of record starts inside their stretch: mean frac 0.479 (null 0.5), min 0.011, max 0.963
//   decile counts: [8, 8, 7, 8, 4, 13, 8, 5, 11, 3] over 75 records (null 7.5 each)
//   no record contains two consecutive prime squares (none may: occupancy, SEC B2); the deep-end u->1 loading is ENVELOPE BOOKKEEPING (zonegap-03: Z2 = env, D = 0; zonegap-02 D1: the deep end is an onset desert), not square-anchor attraction.
//
// elapsed 0.8 s
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================================
// 1. THE DECOMPOSITION IS EXACT AND INHERITED, NOT NEW MACHINERY (SEC A).
//    Freeze: for every n in S_q = [q^2, q'^2) the largest prime r with
//    r^2 <= n is q — verified integer by integer at all 25 stretches to
//    q = 97; this is natal-onset's q^2 rule read as an interval statement,
//    and zonegap-02 D1's onset desert IS the stretch's interior. Finality:
//    wheel-survivor openers == twin-prime openers as SETS per stretch
//    (zonegap-02 Lemma A restricted, since S_q sits inside zone q). The
//    zone identity: (p, p'^2) = (p, r0^2) + exactly pi(p) - pi(sqrt p)
//    stretches, the last being S_p — so the Stretch Postulate at p demands
//    occupancy of the zone's DEEPEST stretch, and SP => strong ZP is a
//    containment, PROVEN. The stretch is an unwrapped tile window from
//    q = 7 on (A5), which is Chris's framing verbatim.
// 2. THE DELTA SPLITS EXACTLY AS THE GUARDRAIL DEMANDS (SEC B1). The
//    stretch/tile density ratio is measured 0.7946..0.8021 across four
//    bands against the limit rho(2) = e^{2gamma}/4 = 0.793055, with
//    measured/HL at 0.9813..1.0057: the density delta is a BOUNDED
//    constant, it is a DEFICIT (the stretch sits at u = 2, the survival
//    curve's minimum), and Route B stays closed — nothing here argues from
//    density. What diverges is the WIDTH margin (SEC B3): min M per decade
//    climbs 0.80 -> 2175.84 over q = 10^1..10^8, mean M reaches 67968.9,
//    and the normalization q/(minM ln^2 q) still RISES (3.197 -> 17.691),
//    which says min M grows more slowly than q/ln^2 q — the min is owned
//    by twin-q stretches of width 4q + 4, a ln^3 q denominator against a
//    4q numerator. The mean margin is the task's ~q/ln^2 q; the worst case
//    is q/ln^3 q. Both diverge; neither is evidence (§5a lesson).
// 3. OCCUPANCY IS NOW CERTIFIED SIX DECADES PAST THE SWEEP (SEC B2).
//    Direct: all 1229 stretches to 1e8, zero unoccupied, min 1 pair at the
//    degenerate q = 2. Criterion: if S_q were empty, a straddling in-table
//    twin gap >= width - 2 would exist below q^2; width - 2 > runmax(q^2)
//    at 5,484,595 of 5,484,596 stretches with q'^2 < 2^53 ~ 9.007e15. The
//    SOLE exception is q = 29 (S_29 = [841, 961), width - 2 = 118 against
//    record 8's 150 at F = 659), and the direct sieve holds 2 pairs there.
//    So every stretch with q'^2 < 2^53 is occupied, conditional only on
//    the adopted TOS/A113274 data. The dedicated pass the task priced cost
//    one bit sieve to 1e8 and under a second of compute.
// 4. THE SQUARE ANCHOR IS REAL STRUCTURE, AND IT IS EXACTLY BOOKKEEPING
//    (SEC C1/C2). Proven and verified: the forbidden offset pair is
//    {-alpha, -alpha-2} with alpha = (q mod r)^2 a nonzero QR, so only
//    (r-1)/2 of the r generic offset pairs can occur, and offset classes
//    with -t and -t-2 both nonresidues are IMMUNE at every square anchor
//    ({0,2} mod 7; 2/7 to 8/31 of classes) — a generic window has no such
//    classes. The guardrail is a theorem: total kill incidence is
//    2(r-1) exactly, ensemble mean 2/r, generic — the QR structure
//    REDISTRIBUTES kills over offsets, it does not reduce them. Measured:
//    the offset histogram (439,644 openers) is non-flat exactly as the
//    character null predicts — conditional chi2/df 0.52..1.63 across
//    r = 7..23, worst class 2.40% — and the marginal chi2 excess
//    (21.85 at r = 7) is anchor-sampling variance, not offset structure.
// 5. THE DEEP-END LOADING IS NOT A SQUARE-ANCHOR EFFECT (SEC C3). Record
//    starts sit uniformly inside their stretches (mean frac 0.479 vs null
//    0.5, deciles consistent); 8 records contain a prime square against a
//    null expectation of 9.92, all at small n (n = 1..20); no record
//    contains two consecutive squares. The u -> 1 loading of Z2 is
//    envelope bookkeeping (zonegap-03's Z2 = env identity plus zonegap-02
//    D1's onset desert), and the square anchor neither attracts nor
//    repels the record process at any measured scale.
// ============================================================================
// FIGURE PROVENANCE. Cited, not produced here: rho(2) = e^{2gamma}/4 and
// e^{2gamma} = 3.1722 (ZONE-POSTULATE.md §6, recomputed from gamma as a
// calibration); Z2(11) = 30, Z2(13) = 30 and the zone conventions
// (research/zonegap-01.js, recomputed brute-force as calibration); the
// natal-onset window totals 999/203 (research/natal-onset-01.js, recomputed
// as calibration); the TOS table and A113274 starred rows (adopted data,
// custody research/history/staging/zonegap-01.md §1); the Z2 = env identity
// (research/zonegap-03-model.js); "min pairs = 1 at q = 2" counts the pair
// (5, 7) in the degenerate pre-wheel stretch [4, 9).
// ============================================================================
