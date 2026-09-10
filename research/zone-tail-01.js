// ============================================================================
// ZONE-TAIL 01 — tail(p) = p'^2 - a_last(p): THE FIRST PER-ZONE TAIL DATASET
// ON THE HEAD CENSUS'S 1,225 ZONES
// ============================================================================
// TODO Z4, tail half. `zonegap-02-reduction.md` §2 lists the tail as the
// "unstudied (cheapest piece)" of the R0 decomposition width = head + Σgaps +
// tail, with one number to its name: band means 0.58..0.77 in ln^2(p'^2)
// units, which is `zonegap-01.js`'s `tailM: mean(z.tail / l2(z.bound))` at
// X = 1e11. No per-zone tail dataset exists in the corpus. This produces one,
// on `destroyer-census-01.js`'s zone list verbatim, so the head census's
// numbers are quotable against it without re-banding.
//
// PRE-REGISTRATION: `research/history/staging/zone-tail-01.md` §1, written
// 2026-08-28 14:53Z before this file existed. No commits this session, so §1
// is timestamped and not sealed by a git object; its custody is that it was
// on disk first.
//
// SETTING. p a prime >= 7, p' the next prime, the zone the open interval
// (p, p'^2), width W = p'^2 - p. Conventions are `zonegap-01.js` §0's
// verbatim (restated in `zonegap-02-reduction.md`'s preamble):
//   pair       (a, a+2) with both members prime; named by its OPENER a.
//   in zone p  p < a AND a + 2 < p'^2, both strict — both members strictly
//              inside the zone.
//   head(p)    a_first - p, a_first the least in-zone opener.
//   tail(p)    p'^2 - a_last, a_last the greatest in-zone opener. Measured to
//              the OPENER, exactly as the head is; the `a + 2 < p'^2` clause
//              therefore forces a deterministic +2 on the tail that the head
//              does not carry. Stated, not corrected.
//   Z2(p)      max gap between consecutive in-zone openers (>= 2 pairs).
//   R0         width = head + Σgaps + tail exactly; head + Z2 + tail <= width,
//              equality iff exactly 2 pairs (zonegap-02 (R0), PROVEN). Both
//              are ASSERTED per zone here, never measured.
//   L-rough    n with no prime factor <= L. The Zone Restriction Lemma
//              (zonegap-02 §1, PROVEN) makes the p-rough numbers in (p, p'^2)
//              exactly the primes there; SEC D checks it by trial division
//              rather than by the sieve, so the check is independent.
//
// WIDTH AUDIT. Range XOPEN = 1e8; every opener, endpoint and width is
// < 1e8 < 2^53 and exact in doubles. Largest zone endpoint p'^2 = 9973^2 =
// 99,460,729 < XOPEN. Sums: Σ tail over 1,225 zones < 1225 * 1e5 = 1.2e8;
// Σ ln^2 < 1225 * 340; Σ gaps per zone < 1e8. The exhaustive-origin null in
// SEC G sums ratios (each < 1e4), not integers, over < 6.7e6 class origins:
// < 7e10, exact. Trial division uses primes <= 1e4 as int32. No BigInt.
//
// PRIOR ART ON DISK (cited, not re-derived):
//   research/zonegap-01.js          the conventions, the engine, the six band
//                                   means that are the tail's entire prior
//                                   record; its brute-force self-check design
//                                   is reused here.
//   research/zonegap-02-reduction.md  §1 Zone Restriction Lemma, §2 (R0), the
//                                   scale table this note fills a row of, §4
//                                   the tread-free tail (deep-end desert).
//   research/destroyer-census-01.js  §6(a) the half-level head test this
//                                   mirrors, §6(b) R = E[g^2]/2E[g] and the
//                                   h/R residual; the zone list is its own.
//   research/history/staging/redteam-0828-head.md  R is the CONTINUUM
//                                   functional; a discrete integer origin
//                                   sees R + 1/2 exactly. Both comparators
//                                   are carried here, plus a class-matched
//                                   one, because on the head that choice
//                                   moved the residual by a factor of two.
//   research/history/staging/record-location-null.js  N3, the repo's pooling
//                                   rule: divide each unit by its own height
//                                   marginal BEFORE pooling.
//
// Usage:  node research/zone-tail-01.js
// ============================================================================
'use strict';
const T0 = Date.now();

// ---------- toolbox ----------
let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function isqrt(n) { let r = Math.floor(Math.sqrt(n)); while ((r + 1) * (r + 1) <= n) r++; while (r * r > n) r--; return r; }
const f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3), f4 = (x) => x.toFixed(4);
const pct = (x) => (100 * x).toFixed(2);
const mean = (v) => v.reduce((a, b) => a + b, 0) / v.length;
function median(v) { const s = [...v].sort((a, b) => a - b); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; }
// seeded LCG (numerical recipes), so every draw below reproduces bit for bit
function mkRng(seed) { let s = seed >>> 0; return () => { s = (Math.imul(1664525, s) + 1013904223) >>> 0; return s / 4294967296; }; }

const XOPEN = 100_000_000;
const C2 = 0.6601618158468696;
const HLCOEFF = 1 / (2 * C2);            // 0.757374, the HL mean twin gap coefficient
const l2 = (x) => Math.log(x) ** 2;

// ============================================================================
// SIEVE + OPENERS + ZONE LIST
// ============================================================================
const half = (XOPEN >> 1) + 2;           // odd n = 2i+1 -> index i
const comp = new Uint8Array(half);
for (let i = 1; 2 * i + 1 <= isqrt(XOPEN) + 1; i++) {
  if (comp[i]) continue;
  const q = 2 * i + 1;
  for (let m = q * q; m <= XOPEN + 2; m += 2 * q) comp[m >> 1] = 1;
}
const isPr = (n) => n === 2 ? true : (n > 2 && (n & 1) === 1 && !comp[n >> 1]);

const PR = [2];                                    // primes <= 1e4 (trial division + zone list)
for (let n = 3; n <= 10_000; n += 2) if (isPr(n)) PR.push(n);

const op = new Int32Array(500000);                 // twin openers, a + 2 <= XOPEN
let nOp = 0;
for (let a = 3; a + 2 <= XOPEN; a += 2) if (!comp[a >> 1] && !comp[(a + 2) >> 1]) op[nOp++] = a;

// zone list: destroyer-census-01.js's rule verbatim — primes p >= 7 with
// p'^2 - 1 <= 1e8.
const Zp = [], Zpp = [];
for (let i = 0; i < PR.length - 1; i++) {
  const p = PR[i]; if (p < 7) continue;
  const pp = PR[i + 1]; if (pp * pp - 1 > XOPEN) break;
  Zp.push(p); Zpp.push(pp);
}
const NZ = Zp.length;
const prevPrime = Zp.map((p) => PR[PR.indexOf(p) - 1]);

console.log('ZONE-TAIL 01 — the per-zone tail field on the head census\'s zone list');
console.log(`  sieve to ${XOPEN.toExponential(0)}, ${nOp.toLocaleString('en-US')} twin openers, ${NZ} zones (p = ${Zp[0]} .. ${Zp[NZ - 1]}, p' = ${Zpp[NZ - 1]}, max endpoint ${Zpp[NZ - 1] ** 2})`);
assertEq('zone count == the head census\'s 1225', NZ, 1225);
assertEq('pi2(1e8) openers == A007508', nOp, 440312);
console.log('');

// ============================================================================
// PER-ZONE FIELD: head, tail, Z2, count, sumGaps  (sliding-window max, both
// window ends non-decreasing in p, so one pass with a monotonic deque)
// ============================================================================
const zHead = new Int32Array(NZ), zTail = new Int32Array(NZ), zZ2 = new Int32Array(NZ);
const zCnt = new Int32Array(NZ), zSum = new Float64Array(NZ);
{
  let lo = 0, hi = -1;                       // opener index window [lo, hi]
  const dq = new Int32Array(nOp); let dh = 0, dt = 0;   // indices i of gap g_i = op[i+1]-op[i]
  for (let z = 0; z < NZ; z++) {
    const p = Zp[z], bound = Zpp[z] * Zpp[z];
    while (lo < nOp && op[lo] <= p) lo++;
    while (hi + 1 < nOp && op[hi + 1] + 2 < bound) {
      hi++;
      if (hi > lo) {
        const g = op[hi] - op[hi - 1];
        while (dt > dh && (op[dq[dt - 1] + 1] - op[dq[dt - 1]]) <= g) dt--;
        dq[dt++] = hi - 1;
      }
    }
    while (dt > dh && dq[dh] < lo) dh++;
    assertTrue(`zone occupied p=${p}`, hi >= lo);
    zCnt[z] = hi - lo + 1;
    zHead[z] = op[lo] - p;
    zTail[z] = bound - op[hi];
    zSum[z] = op[hi] - op[lo];        // Sigma gaps telescopes; R0 is then an identity, asserted in SEC F
    zZ2[z] = zCnt[z] >= 2 ? op[dq[dh] + 1] - op[dq[dh]] : 0;
  }
}

// ---- SEC A: independent brute-force engine over every zone below 1e6 -------
console.log('SEC A — ENGINE SELF-CHECK (independent brute force, every zone with p\'^2 < 1e6)');
{
  const M = 1e6, s = new Uint8Array(M + 3);
  for (let i = 2; i * i <= M + 2; i++) if (!s[i]) for (let j = i * i; j <= M + 2; j += i) s[j] = 1;
  const bo = []; for (let a = 3; a + 2 <= M; a += 2) if (!s[a] && !s[a + 2]) bo.push(a);
  let checked = 0;
  for (let z = 0; z < NZ; z++) {
    const bound = Zpp[z] * Zpp[z]; if (bound >= M) break;
    const inz = bo.filter((a) => a > Zp[z] && a + 2 < bound);
    let m = 0, sg = 0;
    for (let i = 1; i < inz.length; i++) { const g = inz[i] - inz[i - 1]; sg += g; if (g > m) m = g; }
    assertEq(`brute cnt p=${Zp[z]}`, zCnt[z], inz.length);
    assertEq(`brute head p=${Zp[z]}`, zHead[z], inz[0] - Zp[z]);
    assertEq(`brute tail p=${Zp[z]}`, zTail[z], bound - inz[inz.length - 1]);
    assertEq(`brute Z2 p=${Zp[z]}`, zZ2[z], m);
    assertEq(`brute sumGaps p=${Zp[z]}`, zSum[z], sg);
    checked++;
  }
  console.log(`  ${checked} zones recomputed (count, head, tail, Z2, sum of gaps): IDENTICAL`);
  // cross-check against zonegap-02-reduction.js's five hand-verified levels
  const KNOWN = [[7, 30, 4, 14], [11, 30, 6, 20], [13, 30, 4, 8], [17, 36, 12, 14], [23, 150, 6, 14]];
  for (const [p, z2, h, t] of KNOWN) {
    const z = Zp.indexOf(p);
    assertEq(`zonegap-02 Z2@${p}`, zZ2[z], z2); assertEq(`zonegap-02 head@${p}`, zHead[z], h); assertEq(`zonegap-02 tail@${p}`, zTail[z], t);
  }
  console.log('  the five levels zonegap-02-reduction.js verified by hand (p = 7,11,13,17,23): Z2/head/tail IDENTICAL');
}
console.log('');

// ---- bands: destroyer-census-01.js SEC 6(a)'s head bands -------------------
const BN = ['[7,100)', '[100,1000)', '[1000,3163)', '[3163,1e4)'];
const bandOf = (p) => p < 100 ? 0 : p < 1000 ? 1 : p < 3163 ? 2 : 3;
const bandIdx = [[], [], [], []];
for (let z = 0; z < NZ; z++) bandIdx[bandOf(Zp[z])].push(z);

// ============================================================================
// SEC B — THE LAW: tail against ln^2, per band, both units
// ============================================================================
console.log('SEC B — THE LAW (ratio-of-sums estimator, destroyer-census-01 SEC 6(a)\'s, arguments swapped)');
console.log('  local unit = ln^2(p\'^2) (the tail\'s own height); ln^2 p is the head\'s unit, kept for comparison.');
console.log('  HL reference in either unit: 1/(2 C2) = ' + f4(HLCOEFF) + '. Bootstrap 2000 resamples, seed 20260828.');
console.log('  band          zones   mean tail   c_local=Στ/Σln²(p\'²)  [2.5,97.5]        c_p=Στ/Σln²p   head c (census/this)');
const cLocal = [], cP = [];
for (let b = 0; b < 4; b++) {
  const ix = bandIdx[b];
  let st = 0, sl = 0, sp = 0, sh = 0, shp = 0;
  for (const z of ix) { st += zTail[z]; sl += l2(Zpp[z] * Zpp[z]); sp += l2(Zp[z]); sh += zHead[z]; shp += l2(Zp[z]); }
  const c = st / sl, cpp = st / sp, ch = sh / shp;
  cLocal.push(c); cP.push(cpp);
  const rng = mkRng(20260828 + b), bs = [];
  for (let r = 0; r < 2000; r++) {
    let a = 0, d = 0;
    for (let k = 0; k < ix.length; k++) { const z = ix[(rng() * ix.length) | 0]; a += zTail[z]; d += l2(Zpp[z] * Zpp[z]); }
    bs.push(a / d);
  }
  bs.sort((x, y) => x - y);
  console.log('  ' + BN[b].padEnd(13) + String(ix.length).padStart(5) + '  ' + f2(mean(ix.map(z => zTail[z]))).padStart(10) +
    '  ' + f4(c).padStart(20) + '  [' + f4(bs[50]) + ',' + f4(bs[1949]) + ']  ' + f4(cpp).padStart(12) + '   ' + f4(ch).padStart(8));
}
console.log('  (the last column is the head coefficient in ln^2 p units on the SAME zones and the SAME estimator;');
console.log('   destroyer-census-01 SEC 6(a) reports 0.6693 for band [3163,1e4) and it must reproduce here.)');
console.log(`  band drift, local units: B2->B3 ${f4(cLocal[2] - cLocal[1])}, B3->B4 ${f4(cLocal[3] - cLocal[2])}, spread B2..B4 ${f4(Math.max(cLocal[1], cLocal[2], cLocal[3]) - Math.min(cLocal[1], cLocal[2], cLocal[3]))}`);
console.log(`  ratio of units: c_p / c_local = ${f4(cP[3] / cLocal[3])} at B4 (4 exactly in the ln^2(p'^2) = 4 ln^2 p' limit)`);
// CUSTODY — reproduce, on this independent engine, the only tail numbers the
// corpus already holds: zonegap-01.js's per-decade `tailM` (mean of ratios,
// not ratio of sums) at X = 1e11, and destroyer-census-01 SEC 6(a)'s head
// coefficient. A miss here voids every comparison in this file.
{
  const dec = [[10, 100, 0.578], [100, 1000, 0.768], [1000, 10000, 0.766]];
  console.log("  CUSTODY vs zonegap-01.js (its decade bands, its mean-of-ratios estimator, its X = 1e11 sweep):");
  for (const [lo, hi, want] of dec) {
    const ix = []; for (let z = 0; z < NZ; z++) if (Zp[z] >= lo && Zp[z] < hi) ix.push(z);
    const got = mean(ix.map(z => zTail[z] / l2(Zpp[z] * Zpp[z])));
    console.log(`    decade 10^${String(Math.log10(lo))}: ${f3(got)} vs zonegap-01's published ${want.toFixed(3)} (${ix.length} zones)`);
    assertEq(`zonegap-01 tailM decade ${lo}`, Number(got.toFixed(3)), want);
  }
  const ix = bandIdx[3];
  let sh = 0, sl = 0; for (const z of ix) { sh += zHead[z]; sl += l2(Zp[z]); }
  console.log(`    head coefficient band [3163,1e4): ${f4(sh / sl)} vs destroyer-census-01 SEC 6(a)'s 0.6693`);
  assertEq('destroyer-census-01 head coefficient', Number((sh / sl).toFixed(4)), 0.6693);
}
console.log('');
// ============================================================================
// SEC C — THE RENEWAL COMPARATOR: is the tail the backward recurrence time?
// ============================================================================
// Mirror of destroyer-census-01 SEC 6(b). For a renewal process the forward
// and backward recurrence times share the mean R = E[g^2] / 2E[g]. R is the
// CONTINUUM functional (redteam-0828-head.md); a discrete integer origin sees
// R + 1/2 exactly. p'^2 is a discrete origin confined to {1,19} mod 30 for
// p' >= 7, so the exactly matched comparator is the class-origin null: the
// mean backward distance from EVERY integer of that class at the same heights,
// computed exhaustively here rather than modelled.
function lastOpenerBelow(x) {            // largest index i with op[i] + 2 < x
  let lo = 0, hi = nOp - 1, r = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (op[m] + 2 < x) { r = m; lo = m + 1; } else hi = m - 1; }
  return r;
}
function classNull(H0, H1, classes) {
  let j = -1, sRaw = 0, sNorm = 0, cnt = 0;
  for (let base = Math.floor(H0 / 30) * 30; base < H1; base += 30) {
    for (const c of classes) {
      const n = base + c;
      if (n < H0 || n >= H1) continue;
      while (j + 1 < nOp && op[j + 1] + 2 < n) j++;
      if (j < 0) continue;
      const d = n - op[j];
      sRaw += d; sNorm += d / l2(n); cnt++;
    }
  }
  return { raw: sRaw / cnt, norm: sNorm / cnt, n: cnt };
}
console.log('SEC C — RENEWAL COMPARATOR PER BAND (heights are the band\'s own p\'^2 range)');
{
  // every p'^2 with p' >= 7 lies in {1,19} mod 30 — asserted, since the
  // class-matched null depends on it
  const cls = new Set(); for (let z = 0; z < NZ; z++) cls.add((Zpp[z] * Zpp[z]) % 30);
  console.log(`  p'^2 mod 30 over the ${NZ} zones: {${[...cls].sort((a, b) => a - b).join(',')}}`);
  assertTrue("p'^2 confined to {1,19} mod 30", [...cls].every(c => c === 1 || c === 19));
  console.log('  band          height range          g      g/ln²   R=E[g²]/2E[g]  R+1/2   mean tail   t/R    t/(R+.5)  classNull  t/classNull');
  const tOverR = [];
  for (let b = 0; b < 4; b++) {
    const ix = bandIdx[b];
    const H0 = Zpp[ix[0]] * Zpp[ix[0]], H1 = Zpp[ix[ix.length - 1]] * Zpp[ix[ix.length - 1]];
    let sg = 0, sg2 = 0, ng = 0;
    const i0 = Math.max(1, lastOpenerBelow(H0)), i1 = lastOpenerBelow(H1);
    for (let i = i0; i <= i1; i++) { const g = op[i] - op[i - 1]; sg += g; sg2 += g * g; ng++; }
    const mg = sg / ng, R = sg2 / (2 * sg);
    const cn = classNull(H0, H1 + 1, [1, 19]);
    const t = mean(ix.map(z => zTail[z]));
    tOverR.push(t / R);
    console.log('  ' + BN[b].padEnd(13) + ('[' + H0.toExponential(2) + ',' + H1.toExponential(2) + ']').padEnd(20) +
      f2(mg).padStart(8) + '  ' + f4(sg / (ng * l2(Math.sqrt(H0 * H1)))).padStart(6) + '  ' + f2(R).padStart(12) + '  ' + f2(R + 0.5).padStart(7) +
      '  ' + f2(t).padStart(9) + '  ' + f4(t / R).padStart(6) + '  ' + f4(t / (R + 0.5)).padStart(7) + '  ' + f2(cn.raw).padStart(9) + '  ' + f4(t / cn.raw).padStart(10));
  }
  console.log('  the head\'s own figures on the same object (destroyer-census-01 SEC 6(b), cited): h/R = 1.09 -> 1.03 across its five windows.');
  {   // bootstrap over zones for t/R at B4 (R held fixed: it is a property of the gap process, not of the 782 zones)
    const ix = bandIdx[3];
    const H0 = Zpp[ix[0]] * Zpp[ix[0]], H1 = Zpp[ix[ix.length - 1]] * Zpp[ix[ix.length - 1]];
    let sg = 0, sg2 = 0; const i0 = Math.max(1, lastOpenerBelow(H0)), i1 = lastOpenerBelow(H1);
    for (let i = i0; i <= i1; i++) { const g = op[i] - op[i - 1]; sg += g; sg2 += g * g; }
    const R = sg2 / (2 * sg), rng = mkRng(555000111), bs = [];
    for (let r = 0; r < 2000; r++) { let a = 0; for (let k = 0; k < ix.length; k++) a += zTail[ix[(rng() * ix.length) | 0]]; bs.push(a / ix.length / R); }
    bs.sort((x, y) => x - y);
    console.log(`  t/R at B4 = ${f4(tOverR[3])}, bootstrap [${f4(bs[50])}, ${f4(bs[1949])}] (2000 resamples, seed 555000111); pre-registered MATCH band is |t/R - 1| <= 0.03`);
  }
  console.log('  POOLING RULE (record-location-null.js N3): every unit divided by ln^2 of ITS OWN height before pooling —');
  console.log('  band          mean tail/ln²(p\'²)   classNull mean d/ln²(n)   ratio');
  for (let b = 0; b < 4; b++) {
    const ix = bandIdx[b];
    const H0 = Zpp[ix[0]] * Zpp[ix[0]], H1 = Zpp[ix[ix.length - 1]] * Zpp[ix[ix.length - 1]];
    const cn = classNull(H0, H1 + 1, [1, 19]);
    const tn = mean(ix.map(z => zTail[z] / l2(Zpp[z] * Zpp[z])));
    console.log('  ' + BN[b].padEnd(13) + f4(tn).padStart(16) + f4(cn.norm).padStart(24) + '   ' + f4(tn / cn.norm).padStart(6) + `   (${cn.n.toLocaleString('en-US')} class origins)`);
  }
}
console.log('');

// ============================================================================
// SEC D — THE FROZEN-SIEVE MIRROR OF THE HALF-LEVEL HEAD TEST
// ============================================================================
// destroyer-census-01 SEC 6(a): head(p) IS the first survivor above p of the
// FROZEN sqrt(p)-level sieve in 1,184 of 1,225 zones (96.65%). Three mirror
// levels at the deep end. Roughness by TRIAL DIVISION, never by the sieve, so
// SEC D(a) is an independent check of the Zone Restriction Lemma and not a
// restatement of the array that produced a_last.
function rough(n, L) {
  for (let k = 0; k < PR.length; k++) { const q = PR[k]; if (q > L) return true; if (n % q === 0) return false; }
  return true;
}
function lastRoughPair(bound, L) {
  let a = bound - 3; if ((a & 1) === 0) a--;
  for (; a >= 3; a -= 2) if (rough(a, L) && rough(a + 2, L)) return a;
  return -1;
}
console.log('SEC D — FROZEN-LEVEL LAST SURVIVOR BELOW p\'^2 (mirror of SEC 6(a); trial division, not the sieve)');
{
  const levels = [['p (the zone\'s own level)', (z) => Zp[z]],
                  ['p^- (one fold back)', (z) => prevPrime[z]],
                  ['sqrt(p) (the head\'s own frozen level)', (z) => isqrt(Zp[z])]];
  for (const [name, Lof] of levels) {
    let ok = 0, nullSum = 0, supply = 0; const errs = []; const bandOK = [0, 0, 0, 0], bandN = [0, 0, 0, 0];
    for (let z = 0; z < NZ; z++) {
      const bound = Zpp[z] * Zpp[z], L = Lof(z), p2 = Zp[z];
      const a = lastRoughPair(bound, L);
      const b = bandOf(Zp[z]); bandN[b]++;
      if (a === bound - zTail[z]) { ok++; bandOK[b]++; } else errs.push(a - (bound - zTail[z]));
      // Two prices, each valid in one regime only.
      // (i) MERTENS, valid when L is small against sqrt(bound) (u = ln bound /
      //     ln L large): an L-rough pair sits at an odd a with probability
      //     rho_L = prod_{3<=q<=L}(1 - 2/q), so P(no L-rough pair strictly
      //     above a_last inside the tail) = exp(-rho_L * tail / 2). Quoted for
      //     level sqrt(p) (u ~ 4) and for NOTHING else: at u ~ 2 the rough
      //     count is Buchstab's, not Mertens's, and this formula is wrong
      //     there by more than a factor of two.
      let rho = 1; for (let k = 1; k < PR.length && PR[k] <= L; k++) rho *= 1 - 2 / PR[k];
      nullSum += Math.exp(-rho * zTail[z] / 2);
      // (ii) EXACT SUPPLY, the right price at level p^-: the only integers the
      //      frozen level p^- keeps and level p kills are the n < p'^2 with
      //      lpf(n) = p. Count them in the tail window exactly.
      if (L === prevPrime[z]) {
        for (let n = (bound - zTail[z]) + 1; n < bound; n++)
          if (n % p2 === 0 && rough(n / p2, p2 - 1)) supply++;   // lpf(n) = p exactly
      }
    }
    const priced = name.startsWith('sqrt') ? `, Mertens price ${pct(nullSum / NZ)}%`
      : name.startsWith('p^-') ? `, exact supply of level-p^- extra survivors (lpf(n) = p) inside the tail window: ${supply} over the ${NZ} zones, ${f4(supply / NZ)} per zone, of which ${NZ - ok} (${pct((NZ - ok) / supply)}%) actually move a_last — the rest lack a level-p^- rough partner`
      : '';
    console.log(`  level ${name}: ${ok} of ${NZ} zones (${pct(ok / NZ)}%)${priced}` +
      (errs.length ? `; when it differs the frozen survivor sits ${median(errs)} above a_last (median), max ${Math.max(...errs)}` : ''));
    console.log('    per band: ' + BN.map((n, b) => `${n} ${pct(bandOK[b] / bandN[b])}%`).join('  '));
    if (name.startsWith('p (')) assertEq('Zone Restriction Lemma at every zone (level p is exact)', ok, NZ);
  }
  console.log('  head comparator, cited not recomputed: 1184/1225 = 96.65% at level sqrt(p) above p (destroyer-census-01 SEC 6(a)).');
}
console.log('');

// ============================================================================
// SEC E — THE WORST CASE
// ============================================================================
console.log('SEC E — WORST CASE PER BAND');
console.log('  band          max tail   at p     /ln²(p\'²)  /ln²p    /width      max/mean   (mean tail/ln²(p\'²))');
for (let b = 0; b < 4; b++) {
  const ix = bandIdx[b];
  let best = ix[0]; for (const z of ix) if (zTail[z] > zTail[best]) best = z;
  const bound = Zpp[best] * Zpp[best], W = bound - Zp[best];
  const mt = mean(ix.map(z => zTail[z]));
  console.log('  ' + BN[b].padEnd(13) + String(zTail[best]).padStart(8) + String(Zp[best]).padStart(8) + '  ' +
    f3(zTail[best] / l2(bound)).padStart(9) + '  ' + f3(zTail[best] / l2(Zp[best])).padStart(7) + '  ' +
    (zTail[best] / W).toExponential(2).padStart(9) + '  ' + f2(zTail[best] / mt).padStart(9) + '   ' +
    f4(mean(ix.map(z => zTail[z] / l2(Zpp[z] * Zpp[z])))).padStart(8));
}
{
  let g = 0, gz = 0;
  for (let z = 0; z < NZ; z++) { const r = zTail[z] / l2(Zpp[z] * Zpp[z]); if (r > g) { g = r; gz = z; } }
  console.log(`  global max tail/ln²(p'²) = ${f3(g)} at p = ${Zp[gz]} (tail ${zTail[gz]}, width ${Zpp[gz] ** 2 - Zp[gz]})`);
}
console.log('');
// ============================================================================
// SEC F — THE R0 ACCOUNTING (a theorem, ASSERTED per zone, never measured)
// ============================================================================
console.log('SEC F — R0: width = head + Σgaps + tail exactly, and head + Z2 + tail <= width (zonegap-02 (R0))');
{
  let eq2 = 0, strict3 = 0;
  for (let z = 0; z < NZ; z++) {
    const W = Zpp[z] * Zpp[z] - Zp[z];
    assertEq(`R0 partition p=${Zp[z]}`, zHead[z] + zSum[z] + zTail[z], W);
    const s = zHead[z] + zZ2[z] + zTail[z];
    assertTrue(`R0 inequality p=${Zp[z]}`, s <= W);
    if (zCnt[z] === 2) { assertEq(`R0 equality at k=2, p=${Zp[z]}`, s, W); eq2++; }
    else if (zCnt[z] >= 3) { assertTrue(`R0 strict at k>=3, p=${Zp[z]}`, s < W); strict3++; }
  }
  console.log(`  partition identity and the inequality hold at all ${NZ} zones; equality asserted at the ${eq2} zones with exactly 2 pairs, strict at the ${strict3} with >= 3`);
  console.log('  band          head/width   Z2/width    tail/width   sum/width    (means over zones)');
  for (let b = 0; b < 4; b++) {
    const ix = bandIdx[b];
    const wo = (f) => mean(ix.map(z => f(z) / (Zpp[z] * Zpp[z] - Zp[z])));
    console.log('  ' + BN[b].padEnd(13) + wo(z => zHead[z]).toExponential(2).padStart(10) + '  ' + wo(z => zZ2[z]).toExponential(2).padStart(10) +
      '  ' + wo(z => zTail[z]).toExponential(2).padStart(10) + '  ' + wo(z => zHead[z] + zZ2[z] + zTail[z]).toExponential(2).padStart(10));
  }
  console.log('  band          share of the three-piece sum: head / Z2 / tail');
  for (let b = 0; b < 4; b++) {
    const ix = bandIdx[b];
    let h = 0, k = 0, t = 0; for (const z of ix) { h += zHead[z]; k += zZ2[z]; t += zTail[z]; }
    const s = h + k + t;
    console.log('  ' + BN[b].padEnd(13) + `${pct(h / s)}%  ${pct(k / s)}%  ${pct(t / s)}%`);
  }
}
console.log('');

// ============================================================================
// SEC G — THE MATCHED CONTROL: the same statistic at a non-square endpoint
// ============================================================================
// Pre-registered design (zone-tail-01.md §1 (E7)): E(p) = p'^2 - h(p),
// h(p) a seeded draw in [W/4, 3W/4]; the control window is (E - W, E) and
// ctrl = E - a_last(E). Control B additionally matches the residue class,
// E ≡ p'^2 (mod 30), since p'^2 is confined to {1,19} mod 30. Comparison
// follows the pooling rule: per-zone paired ratios FIRST, band means after.
console.log('SEC G — MATCHED CONTROL AT A NON-SQUARE RIGHT ENDPOINT OF THE SAME WIDTH');
{
  const rngAB = mkRng(917234561);   // control A/B's stream — SEPARATE, so adding control C cannot move a pre-registered number
  const rngC = mkRng(220044660);
  const ctrlA = new Int32Array(NZ), ctrlB = new Int32Array(NZ), ctrlC = new Int32Array(NZ);
  const EA = new Float64Array(NZ), EB = new Float64Array(NZ), EC = new Float64Array(NZ);
  for (let z = 0; z < NZ; z++) {
    const bound = Zpp[z] * Zpp[z], W = bound - Zp[z];
    let e = bound - Math.floor(W / 4 + rngAB() * (W / 2));
    while (isqrt(e) * isqrt(e) === e) e--;          // the draw hit a square at p = 71; step off it
    assertTrue(`control A endpoint not a square p=${Zp[z]}`, isqrt(e) * isqrt(e) !== e);
    let i = lastOpenerBelow(e);
    assertTrue(`control A window occupied p=${Zp[z]}`, i >= 0 && op[i] > e - W - 1);
    EA[z] = e; ctrlA[z] = e - op[i];
    // class-matched: step down to the nearest e' <= e with e' ≡ bound (mod 30)
    let e2 = e - (((e - bound) % 30) + 30) % 30;
    while (isqrt(e2) * isqrt(e2) === e2) e2 -= 30;
    assertTrue(`control B class match p=${Zp[z]}`, ((e2 - bound) % 30 + 30) % 30 === 0);
    let i2 = lastOpenerBelow(e2);
    assertTrue(`control B window occupied p=${Zp[z]}`, i2 >= 0);
    EB[z] = e2; ctrlB[z] = e2 - op[i2];
    // control C — NOT PRE-REGISTERED. Added because A and B put the endpoint
    // 25-75% below p'^2, so their ln^2(own height) normalisation carries a
    // height correction of the same order as the effect being tested (the
    // measured gap coefficient itself drifts, SEC C). C keeps the endpoint
    // within 1% of p'^2 in height while staying far enough below it that
    // a_last(E) is a different pair, and matches the residue class.
    let d = W < 20000 ? Math.floor(W / 10 + rngC() * (W * 0.15)) : Math.floor(W / 1000 + rngC() * (W / 100 - W / 1000));
    if (d < 3) d = 3;
    let e3 = bound - d; e3 -= (((e3 - bound) % 30) + 30) % 30;
    while (isqrt(e3) * isqrt(e3) === e3) e3 -= 30;
    let i3 = lastOpenerBelow(e3);
    assertTrue(`control C window occupied p=${Zp[z]}`, i3 >= 0);
    EC[z] = e3; ctrlC[z] = e3 - op[i3];
  }
  {
    let sep = 0; for (let z = 0; z < NZ; z++) if (lastOpenerBelow(EC[z]) !== lastOpenerBelow(Zpp[z] * Zpp[z])) sep++;
    console.log(`  control C endpoint separation: a_last(E) differs from a_last(p'^2) at ${sep} of ${NZ} zones; median |ln E - ln p'^2| / ln p'^2 = ${(median(Array.from({length: NZ}, (_, z) => Math.abs(Math.log(EC[z]) - Math.log(Zpp[z] * Zpp[z])) / Math.log(Zpp[z] * Zpp[z]))) * 100).toFixed(3)}%`);
  }
  for (const [nm, ctrl, EE] of [['A (free endpoint, PRE-REGISTERED)', ctrlA, EA], ['B (class-matched, E ≡ p\'^2 mod 30)', ctrlB, EB], ['C (height-matched to within ~1%, class-matched; NOT pre-registered)', ctrlC, EC]]) {
    const r = [];
    for (let z = 0; z < NZ; z++) r.push((zTail[z] / l2(Zpp[z] * Zpp[z])) / (ctrl[z] / l2(EE[z])));
    const up = r.filter(v => v > 1).length, dn = r.filter(v => v < 1).length, n = up + dn;
    const zsc = (up - n / 2) / Math.sqrt(n / 4);
    console.log(`  control ${nm}: per-zone paired ratio (tail/ln²(p'²)) / (ctrl/ln²E) over ${NZ} zones —`);
    console.log(`    median ${f4(median(r))}, mean ${f4(mean(r))}; sign test ${up} up / ${dn} down (${n} non-ties), z = ${f2(zsc)}`);
    console.log('    band          zones   tail/ln²(p\'²)   ctrl/ln²E    ratio of band means');
    for (let b = 0; b < 4; b++) {
      const ix = bandIdx[b];
      const tn = mean(ix.map(z => zTail[z] / l2(Zpp[z] * Zpp[z]))), cnv = mean(ix.map(z => ctrl[z] / l2(EE[z])));
      console.log('    ' + BN[b].padEnd(13) + String(ix.length).padStart(5) + f4(tn).padStart(14) + f4(cnv).padStart(13) + f4(tn / cnv).padStart(15));
    }
    // paired DIFFERENCE, the test the median and the band means disagree about
    const d = []; for (let z = 0; z < NZ; z++) d.push(zTail[z] / l2(Zpp[z] * Zpp[z]) - ctrl[z] / l2(EE[z]));
    const dB4 = bandIdx[3].map(z => zTail[z] / l2(Zpp[z] * Zpp[z]) - ctrl[z] / l2(EE[z]));
    for (const [tag, v] of [['all zones', d], ['B4 only', dB4]]) {
      const rg = mkRng(31415926), bs = [];
      for (let r = 0; r < 2000; r++) { let a = 0; for (let k = 0; k < v.length; k++) a += v[(rg() * v.length) | 0]; bs.push(a / v.length); }
      bs.sort((x, y) => x - y);
      console.log(`    paired difference tail/ln² - ctrl/ln², ${tag}: mean ${f4(mean(v))}, median ${f4(median(v))}, bootstrap [${f4(bs[50])}, ${f4(bs[1949])}]`);
    }
  }
}
console.log('');
console.log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/zone-tail-01.js
//   invocation:  node research/zone-tail-01.js
//   code-sha256: 751a244f75956120d29c9a5c93e1c5f4503390686a7ed6f59c9e91717405e3a8
//   out-sha256:  bbd3d870432a28004e17f4696530508e7c8475693766e7151b1b2cc658ef5bec
//   body-lines:  103
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     1.0 s
// ============================================================================
// ZONE-TAIL 01 — the per-zone tail field on the head census's zone list
//   sieve to 1e+8, 440,312 twin openers, 1225 zones (p = 7 .. 9967, p' = 9973, max endpoint 99460729)
//
// SEC A — ENGINE SELF-CHECK (independent brute force, every zone with p'^2 < 1e6)
//   164 zones recomputed (count, head, tail, Z2, sum of gaps): IDENTICAL
//   the five levels zonegap-02-reduction.js verified by hand (p = 7,11,13,17,23): Z2/head/tail IDENTICAL
//
// SEC B — THE LAW (ratio-of-sums estimator, destroyer-census-01 SEC 6(a)'s, arguments swapped)
//   local unit = ln^2(p'^2) (the tail's own height); ln^2 p is the head's unit, kept for comparison.
//   HL reference in either unit: 1/(2 C2) = 0.7574. Bootstrap 2000 resamples, seed 20260828.
//   band          zones   mean tail   c_local=Στ/Σln²(p'²)  [2.5,97.5]        c_p=Στ/Σln²p   head c (census/this)
//   [7,100)         22       33.64                0.5740  [0.4315,0.7423]        2.4277     0.8530
//   [100,1000)     143      113.65                0.7518  [0.6490,0.8545]        3.0220     0.9863
//   [1000,3163)    278      167.56                0.7288  [0.6443,0.8135]        2.9185     0.7494
//   [3163,1e4)     782      237.26                0.7771  [0.7301,0.8271]        3.1096     0.6693
//   (the last column is the head coefficient in ln^2 p units on the SAME zones and the SAME estimator;
//    destroyer-census-01 SEC 6(a) reports 0.6693 for band [3163,1e4) and it must reproduce here.)
//   band drift, local units: B2->B3 -0.0230, B3->B4 0.0483, spread B2..B4 0.0483
//   ratio of units: c_p / c_local = 4.0013 at B4 (4 exactly in the ln^2(p'^2) = 4 ln^2 p' limit)
//   CUSTODY vs zonegap-01.js (its decade bands, its mean-of-ratios estimator, its X = 1e11 sweep):
//     decade 10^1: 0.578 vs zonegap-01's published 0.578 (21 zones)
//     decade 10^2: 0.768 vs zonegap-01's published 0.768 (143 zones)
//     decade 10^3: 0.766 vs zonegap-01's published 0.766 (1060 zones)
//     head coefficient band [3163,1e4): 0.6693 vs destroyer-census-01 SEC 6(a)'s 0.6693
//
// SEC C — RENEWAL COMPARATOR PER BAND (heights are the band's own p'^2 range)
//   p'^2 mod 30 over the 1225 zones: {1,19}
//   band          height range          g      g/ln²   R=E[g²]/2E[g]  R+1/2   mean tail   t/R    t/(R+.5)  classNull  t/classNull
//   [7,100)      [1.21e+2,1.02e+4]      49.94  1.0154         42.90    43.40      33.64  0.7841   0.7751      49.77      0.6759
//   [100,1000)   [1.06e+4,1.02e+6]     124.43  0.9325        114.64   115.14     113.65  0.9913   0.9870     120.75      0.9412
//   [1000,3163)  [1.03e+6,1.00e+7]     177.30  0.7901        164.11   164.61     167.56  1.0210   1.0179     170.15      0.9848
//   [3163,1e4)   [1.00e+7,9.95e+7]     235.93  0.7912        223.42   223.92     237.26  1.0619   1.0595     229.46      1.0340
//   the head's own figures on the same object (destroyer-census-01 SEC 6(b), cited): h/R = 1.09 -> 1.03 across its five windows.
//   t/R at B4 = 1.0619, bootstrap [0.9937, 1.1321] (2000 resamples, seed 555000111); pre-registered MATCH band is |t/R - 1| <= 0.03
//   POOLING RULE (record-location-null.js N3): every unit divided by ln^2 of ITS OWN height before pooling —
//   band          mean tail/ln²(p'²)   classNull mean d/ln²(n)   ratio
//   [7,100)                0.5794                  0.7282   0.7957   (673 class origins)
//   [100,1000)             0.7684                  0.7241   1.0612   (67,166 class origins)
//   [1000,3163)            0.7297                  0.7181   1.0161   (598,561 class origins)
//   [3163,1e4)             0.7793                  0.7339   1.0619   (5,962,057 class origins)
//
// SEC D — FROZEN-LEVEL LAST SURVIVOR BELOW p'^2 (mirror of SEC 6(a); trial division, not the sieve)
//   level p (the zone's own level): 1225 of 1225 zones (100.00%)
//     per band: [7,100) 100.00%  [100,1000) 100.00%  [1000,3163) 100.00%  [3163,1e4) 100.00%
//   level p^- (one fold back): 1209 of 1225 zones (98.69%), exact supply of level-p^- extra survivors (lpf(n) = p) inside the tail window: 88 over the 1225 zones, 0.0718 per zone, of which 16 (18.18%) actually move a_last — the rest lack a level-p^- rough partner; when it differs the frozen survivor sits 114 above a_last (median), max 360
//     per band: [7,100) 100.00%  [100,1000) 97.20%  [1000,3163) 98.92%  [3163,1e4) 98.85%
//   level sqrt(p) (the head's own frozen level): 280 of 1225 zones (22.86%), Mertens price 15.21%; when it differs the frozen survivor sits 150 above a_last (median), max 1128
//     per band: [7,100) 31.82%  [100,1000) 24.48%  [1000,3163) 27.70%  [3163,1e4) 20.59%
//   head comparator, cited not recomputed: 1184/1225 = 96.65% at level sqrt(p) above p (destroyer-census-01 SEC 6(a)).
//
// SEC E — WORST CASE PER BAND
//   band          max tail   at p     /ln²(p'²)  /ln²p    /width      max/mean   (mean tail/ln²(p'²))
//   [7,100)            80      29      1.696    7.055    8.58e-2       2.38     0.5794
//   [100,1000)        500     743      2.851   11.441    8.88e-4       4.40     0.7684
//   [1000,3163)       938    2203      3.956   15.831    1.93e-4       5.60     0.7297
//   [3163,1e4)       1172    7643      3.664   14.659    2.00e-5       4.94     0.7793
//   global max tail/ln²(p'²) = 4.007 at p = 4943 (tail 1160, width 24507458)
//
// SEC F — R0: width = head + Σgaps + tail exactly, and head + Z2 + tail <= width (zonegap-02 (R0))
//   partition identity and the inequality hold at all 1225 zones; equality asserted at the 0 zones with exactly 2 pairs, strict at the 1225 with >= 3
//   band          head/width   Z2/width    tail/width   sum/width    (means over zones)
//   [7,100)         9.97e-3     8.64e-2     2.79e-2     1.24e-1
//   [100,1000)      2.32e-4     5.38e-3     1.16e-3     6.77e-3
//   [1000,3163)     1.23e-5     4.83e-4     5.22e-5     5.47e-4
//   [3163,1e4)      1.46e-6     7.31e-5     7.53e-6     8.20e-5
//   band          share of the three-piece sum: head / Z2 / tail
//   [7,100)      6.26%  75.94%  17.81%
//   [100,1000)   3.84%  84.39%  11.77%
//   [1000,3163)  2.52%  87.69%  9.80%
//   [3163,1e4)   1.82%  89.72%  8.46%
//
// SEC G — MATCHED CONTROL AT A NON-SQUARE RIGHT ENDPOINT OF THE SAME WIDTH
//   control C endpoint separation: a_last(E) differs from a_last(p'^2) at 1221 of 1225 zones; median |ln E - ln p'^2| / ln p'^2 = 0.033%
//   control A (free endpoint, PRE-REGISTERED): per-zone paired ratio (tail/ln²(p'²)) / (ctrl/ln²E) over 1225 zones —
//     median 1.0102, mean 3.9533; sign test 615 up / 610 down (1225 non-ties), z = 0.14
//     band          zones   tail/ln²(p'²)   ctrl/ln²E    ratio of band means
//     [7,100)         22        0.5794       1.0404         0.5569
//     [100,1000)     143        0.7684       0.7663         1.0027
//     [1000,3163)    278        0.7297       0.6741         1.0825
//     [3163,1e4)     782        0.7793       0.7170         1.0869
//     paired difference tail/ln² - ctrl/ln², all zones: mean 0.0443, median 0.0031, bootstrap [-0.0123, 0.1019]
//     paired difference tail/ln² - ctrl/ln², B4 only: mean 0.0623, median 0.0170, bootstrap [-0.0151, 0.1374]
//   control B (class-matched, E ≡ p'^2 mod 30): per-zone paired ratio (tail/ln²(p'²)) / (ctrl/ln²E) over 1225 zones —
//     median 0.9687, mean 3.0028; sign test 603 up / 622 down (1225 non-ties), z = -0.54
//     band          zones   tail/ln²(p'²)   ctrl/ln²E    ratio of band means
//     [7,100)         22        0.5794       0.9381         0.6176
//     [100,1000)     143        0.7684       0.8037         0.9560
//     [1000,3163)    278        0.7297       0.6934         1.0524
//     [3163,1e4)     782        0.7793       0.7391         1.0544
//     paired difference tail/ln² - ctrl/ln², all zones: mean 0.0233, median -0.0074, bootstrap [-0.0359, 0.0824]
//     paired difference tail/ln² - ctrl/ln², B4 only: mean 0.0402, median -0.0031, bootstrap [-0.0329, 0.1140]
//   control C (height-matched to within ~1%, class-matched; NOT pre-registered): per-zone paired ratio (tail/ln²(p'²)) / (ctrl/ln²E) over 1225 zones —
//     median 1.0826, mean 3.1205; sign test 624 up / 601 down (1225 non-ties), z = 0.66
//     band          zones   tail/ln²(p'²)   ctrl/ln²E    ratio of band means
//     [7,100)         22        0.5794       0.8666         0.6686
//     [100,1000)     143        0.7684       0.7359         1.0441
//     [1000,3163)    278        0.7297       0.6850         1.0652
//     [3163,1e4)     782        0.7793       0.7141         1.0914
//     paired difference tail/ln² - ctrl/ln², all zones: mean 0.0504, median 0.0356, bootstrap [-0.0027, 0.1021]
//     paired difference tail/ln² - ctrl/ln², B4 only: mean 0.0652, median 0.0370, bootstrap [-0.0012, 0.1286]
//
// elapsed 0.9 s
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS (all MEASURED unless marked; pre-registration in
// research/history/staging/zone-tail-01.md §1, written before this file)
// ============================================================================
// 1. THE TAIL IS THE HEAD IN LOCAL UNITS, TO ABOUT SEVEN PER CENT. c_tail =
//    0.7771 ln^2(p'^2) at B4 [3163,1e4), bootstrap [0.7301, 0.8271]; the head
//    on the same 782 zones and the same estimator is 0.6693 ln^2 p. Both are
//    referenced to the same HL constant 1/(2 C2) = 0.7574, and the tail sits
//    ABOVE it where the head sits below. The pre-registered symmetric
//    prediction was 0.72 +- 0.05: MISSED, the point estimate sitting just
//    above the band's top with the bootstrap interval straddling it.
// 2. THE FACTOR OF FOUR IS UNITS. c_p / c_local = 4.0013 at B4, the identity
//    ln^2(p'^2) = 4 ln^2 p' to measurement precision. In ln^2 p units the tail
//    is 3.1096 ln^2 p against the head's 0.6693, and any statement of that ratio
//    that does not name the unit is wrong.
// 3. THE BAND DRIFT DOES NOT SETTLE. B2 0.7518, B3 0.7288, B4 0.7771: the
//    pre-registered <= 0.03 step is MISSED at B3 -> B4 (0.0483) and the
//    <= 0.05 spread is met (0.0483). Non-monotone, exactly as the head's
//    half-decade spread is (0.669 to 0.753, cited from
//    destroyer-census-01.md §6(b), not recomputed here); it is band composition on this range,
//    not a measured convergence.
// 4. THE MIRROR OF THE HALF-LEVEL HEAD IS EXACT, AND THAT IS A THEOREM, NOT A
//    MEASUREMENT. At the zone's own level p the last frozen survivor below
//    p'^2 IS a_last at 1225 of 1225 zones — the Zone Restriction Lemma
//    (zonegap-02 §1), here verified by trial division independent of the
//    sieve. The head's 96.65% and the tail's 100% are not the same kind of
//    number: the head sits at height p where the zone's level p is
//    quadratically over-strong and treads can still arrive, the tail at height
//    p'^2 where level p is exactly the certifying level and the deep end is an
//    onset desert (zonegap-02 §4).
// 5. ONE FOLD BACK THE TAIL IS STILL RIGHT 98.69% OF THE TIME, ABOVE THE
//    HEAD'S 96.65%, AND THE RATE IS PRICED EXACTLY. Freezing at p^- keeps 88
//    extra survivors (lpf(n) = p) inside the 1,225 tail windows, 0.0718 per
//    zone, of which 18.18% move a_last. Pre-registered band [98%, 100%]: HIT.
// 6. THE HEAD'S OWN FROZEN LEVEL FAILS AT THE DEEP END, AND MY PRE-REGISTERED
//    NUMBER FOR IT WAS WRONG. Level sqrt(p) identifies the tail in 280 of 1225
//    zones (22.86%) against a registered [0, 5] zones: REFUTED, and the fault
//    is the prediction. The Mertens price exp(-rho_L tail / 2) averaged over
//    the zones reads 15.21%, the right order; the registered figure came from
//    evaluating that at a fixed tail instead of averaging over the tail's own
//    distribution.
// 7. THE RENEWAL COMPARATOR: A SURPLUS THE DATA CANNOT RESOLVE. t/R rises
//    0.7841, 0.9913, 1.0210, 1.0619 across the four bands; at B4 the bootstrap is
//    [0.9937, 1.1321], so the pre-registered SURPLUS threshold of +0.03 is
//    crossed by the point estimate and not by the interval. The exhaustively
//    computed class-matched origin null (every integer ≡ 1 or 19 mod 30 at the
//    same heights, 5,962,057 origins at B4) puts the same surplus at a ratio of
//    1.0619 under the pooling rule. VERDICT: NOT RESOLVED at 1,225 zones. The head's
//    +9% -> +3% is a comparable figure with a comparable defence.
// 8. THE CONTROL SEES NOTHING. Three matched non-square endpoints — free,
//    class-matched, and height-matched to 0.033% — give per-zone paired sign
//    tests z = 0.14, -0.54, 0.66 and six paired-difference bootstrap intervals
//    that all contain zero. Pre-registered MATCH: HIT. The band-mean ratios
//    run 1.05..1.09 at B3/B4 in all three controls, the same direction as
//    reading 7, and the paired test cannot separate that from zero here. So
//    nothing measured here is a property of the endpoint being a prime SQUARE.
// 9. THE R0 SHARES. head + Sigma gaps + tail = width exactly and
//    head + Z2 + tail <= width at all 1,225 zones (asserted, a theorem). The
//    three pieces take 8.20e-5 of the width at B4 and split 1.82% / 89.72% /
//    8.46% head / Z2 / tail. The tail is between four and five times the head
//    and is an order of magnitude below Z2: Z2 is the piece that matters, and
//    the tail's share is FALLING (17.81% -> 8.46% across the four bands).
// 10. WORST CASE. max tail / ln^2(p'^2) = 3.664 at B4 (tail 1172 at p = 7643),
//    global max 4.007 at p = 4943; max tail / width = 2.00e-5 at B4. Both
//    pre-registered bands ([2.5, 6] and <= 1e-3): HIT. The worst case is 4.7
//    times the mean and shows no growth in the ratio across B2..B4.
// 11. CUSTODY. This engine reproduces, digit for digit at three decimals,
//    zonegap-01.js's three published decade tail means (0.578, 0.768, 0.766 —
//    its mean-of-ratios estimator, its X = 1e11 sweep) and
//    destroyer-census-01.js SEC 6(a)'s head coefficient 0.6693 at
//    [3163,1e4); 164 zones below 1e6 and zonegap-02-reduction.js's five
//    hand-verified levels are recomputed by an independent brute force.
//    pi2(1e8) = 440,312 asserts against A007508.
// ============================================================================
