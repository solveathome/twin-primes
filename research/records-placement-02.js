// ============================================================================
// RECORDS PLACEMENT 02 — THE SEC C2 CONDITIONAL-NULL OFFSET TEST REPLICATED
// ON THE STRETCHES q IN [10^4, 3.16*10^4], SCORED AGAINST THE PREREG
// ============================================================================
// THE QUESTION (TODO item Z6's remaining half; stretch-01 §5's SECOND probe,
// same cost class, named unrun there and again in records-placement-01.md §4).
// stretch-01.js SEC C2 measured the square anchor's offset signature over
// q in [317, 9973] (heights 1e5..1e8, 439,644 twin openers) and read the
// CONDITIONAL null - realised anchors and per-stretch totals FIXED, only the
// offsets' placement among the r-2 allowed classes random - at chi2/df
// 0.52..1.63 for r = 7..23. stretch-01.md §6 records that as one decade with
// NO SEALED BANDS. This producer replicates it on the next half-decade of
// anchors, q in [10^4, 3.16*10^4] (heights 1e8..1e9), with the bands written
// first in research/history/staging/records-placement-02.md §1 and a matched
// non-square-anchor control reused from attack-z3-immune-01.js §1c.
//
// THE GUARDRAIL, FIRST. stretch-01.md §4 PROVES the total QR kill incidence
// over the r offset classes is exactly 2(r-1) - the generic ensemble mean
// 2/r. The anchor's structure REDISTRIBUTES kills and removes none. Route B
// (a density advantage at the anchor) is CLOSED (REFUTED.md). Nothing here
// argues from density; the redistribution is this test's NULL. A flag here
// would be offset structure BEYOND the redistribution, MEASURED, on this
// finite range, and would carry no occupancy statement (that is the Stretch
// Postulate, unproven), no Z2 bound and no TPC content.
//
// THE STATISTIC (identical to SEC C2). For r in {7,11,13,17,19,23} and each
// anchor Q with realised twin-opener count n_Q, forbidden classes
// F_r(Q) = {-alpha, -alpha-2} mod r with alpha = (Q mod r)^2 (the QR kill
// law, stretch-01 §4(i), PROVEN):
//     o_c = #{twin openers a in S_Q : (a - Q^2) = c mod r}
//     e_c = sum_Q n_Q * 1[c not in F_r(Q)] / (r - 2)
//     X^2_r = sum_c (o_c - e_c)^2 / e_c,  reported as X^2_r/(r-1).
// Per-anchor marginals are subtracted by construction: an anchor contributes
// expected mass only to its own allowed set (the 113%-artefact rule,
// attack-z3-immune-01.md §1a).
//
// THE ENVELOPE IS NOT THE NOMINAL CHI-SQUARE TABLE, and §1c says so before
// the run. Under the conditional null Cov(o) = sum_Q n_Q [diag(p_Q) -
// p_Q p_Q^T], so the Pearson form's null mean is strictly below r-1. The
// registered band is the 99.73rd percentile of sum_k lambda_k Z_k^2 / (r-1),
// lambda = eig(D^{-1/2} Cov D^{-1/2}) by cyclic Jacobi, B = 200,000 draws,
// mulberry32 seed 20260828. The nominal chi2_{r-1} quantile is printed as a
// secondary reference carrying no band.
//
// THE MATCHED CONTROL (attack-z3-immune-01.js §1c, reused verbatim, including
// its forced deviation D1). Window [N, N+w) with w = Q'^2 - Q^2 the treatment
// width and N = Q^2 - w, stepped down by 30 while N is a perfect square.
// Every composite below Q^2 has least prime factor below Q, so the active set
// is the same {7..Q} and finality holds identically; N is not a square, so
// its kill classes {-N, -N-2} mod r are unconstrained by the QR law; and the
// height is matched to within w/Q^2 ~ 1e-4. Same statistic, same envelope,
// recomputed from the control's own realised n and allowed sets.
//
// CALIBRATION GATE, abort before any new-range figure prints: reproduce
// stretch-01.js SEC C2's embedded OUTPUT block digit-exact on q in
// [317, 9973]. THE TARGETS ARE EXTRACTED FROM research/stretch-01.js's
// EMBEDDED OUTPUT AT RUNTIME, NEVER TRANSCRIBED - the two-document wrong
// constant is the QC framework's named biggest unguarded class and it already
// fired once in this probe family (records-placement-01.md §3).
//
// WIDTH AUDIT (the level this RUNS at): top height is q'^2 for the last
// anchor q <= 31600, which is 9.99e8 < 2^31 = 2.147e9; the odd-index bit
// address is height>>1 <= 5.0e8 < 2^31; per-anchor twin counts are ~1e3 and
// pooled counts ~3e6, all exact in double. Both bounds are asserted at
// runtime. No BigInt is needed and none is used.
//
// PRIOR ART ON DISK: research/stretch-01.js SEC C1/C2 (the kill law, the
// guardrail, the replicated statistic and its calibration targets);
// research/attack-z3-immune-01.js (the matched control design and its forced
// deviation D1); research/history/staging/records-placement-01.md (the first
// half of Z6, and §4's naming of this probe as unrun);
// research/history/staging/records-placement-02.md §1 (the prereg this is
// scored against, UNSEALED - no commit is possible in this session).
// ============================================================================
'use strict';
const T0 = Date.now();
const fs = require('fs');

let failures = 0;
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}

// ---------------------------------------------------------------------------
// PREREGISTERED CONSTANTS (research/history/staging/records-placement-02.md §1)
// ---------------------------------------------------------------------------
const HR = [7, 11, 13, 17, 19, 23];   // §1b: the replicated prime set
const QLO_NEW = 10000, QHI_NEW = 31600;  // §1a: 10^4 <= q <= 3.16*10^4
const QLO_CAL = 317, QHI_CAL = 9973;     // §1f: stretch-01 SEC C2's own range
const B_MC = 200000;                      // §1c: envelope replicates
const SEED = 20260828;                    // §1c
const ALPHA_ENV = 0.9973;                 // §1c: the 99.73% envelope

// mulberry32, seeded once, used for the envelope only.
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// SIEVE
// ---------------------------------------------------------------------------
function smallPrimesTo(n) {
  const fl = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!fl[i]) { out.push(i); for (let j = i * i; j <= n; j += i) fl[j] = 1; } }
  return out;
}
const basePrimes = smallPrimesTo(40000);
function nextPrimeAfter(p) { for (let i = 0; i < basePrimes.length; i++) if (basePrimes[i] > p) return basePrimes[i]; throw new Error('base prime table exhausted'); }

const anchorsNew = basePrimes.filter(p => p >= QLO_NEW && p <= QHI_NEW);
const anchorsCal = basePrimes.filter(p => p >= QLO_CAL && p <= QHI_CAL);
const qLast = anchorsNew[anchorsNew.length - 1];
const HI = nextPrimeAfter(qLast) * nextPrimeAfter(qLast);

console.log('SEC 0 — LEVEL, WIDTH AUDIT, SIEVE');
console.log(`  new-range anchors: ${anchorsNew.length} primes q = ${anchorsNew[0]}..${qLast}; top height q'^2 = ${HI}`);
assertTrue('W1-top-below-2^31', HI < 2147483648);
assertTrue('W2-bitindex-below-2^31', (HI >> 1) < 2147483648);
assertTrue('W3-sqrt-in-base-table', Math.floor(Math.sqrt(HI)) < 40000);

const comp = new Uint32Array(((HI >> 1) >> 5) + 2);
for (let p = 3; p * p <= HI; p += 2) {
  if ((comp[(p >> 1) >> 5] >>> ((p >> 1) & 31)) & 1) continue;
  for (let m = p * p; m <= HI; m += 2 * p) { const i = m >> 1; comp[i >> 5] |= 1 << (i & 31); }
}
function isP(n) { const i = n >> 1; return ((comp[i >> 5] >>> (i & 31)) & 1) === 0; }
// sieve calibration against the base table (independent code path):
{
  let mism = 0;
  for (const p of basePrimes) if (p > 2 && !isP(p)) mism++;
  for (const c of [9, 15, 21, 25, 27, 33, 35, 39, 49, 121, 169, 289, 1000003 * 3]) if (c <= HI && c % 2 === 1 && isP(c)) mism++;
  assertEq('S1-sieve-vs-base-table', mism, 0);
  // spot pi(x): pi(10^6) = 78498
  let cnt = 1; for (let n = 3; n <= 1000000; n += 2) if (isP(n)) cnt++;
  assertEq('S2-pi(1e6)', cnt, 78498);
}
console.log(`  odd-bit sieve to ${HI} built and cross-checked (base table to 40000, pi(1e6) = 78498); ${((Date.now() - T0) / 1000).toFixed(1)} s so far`);
console.log('');

// ---------------------------------------------------------------------------
// KILL-LAW OBJECTS
// ---------------------------------------------------------------------------
function qrSet(r) { const s = new Set(); for (let u = 1; u < r; u++) s.add((u * u) % r); return s; }
const QRS = {}; for (const r of HR) QRS[r] = qrSet(r);
function rootsCount(r, a) { a = ((a % r) + r) % r; return a === 0 ? 0 : (QRS[r].has(a) ? 2 : 0); }
// forbidden classes of a window whose origin is N (square anchor: N = Q^2)
function forbOf(r, N) { const m = ((N % r) + r) % r; return [(r - m) % r, ((2 * r) - m - 2 + r) % r]; }

console.log('SEC 1 — KILL LAW, IMMUNE CLASSES, GUARDRAIL (recomputed, not cited)');
for (const r of HR) {
  const immune = []; let inc = 0;
  for (let c = 0; c < r; c++) { const f = rootsCount(r, -c) + rootsCount(r, -c - 2); inc += f; if (f === 0) immune.push(c); }
  assertEq(`C1-r${r}-guardrail-2(r-1)`, inc, 2 * (r - 1));
  console.log(`  r=${r}: immune offset classes {${immune.join(',')}} (${immune.length}/${r}); total kill incidence ${inc} = 2(r-1) exactly => ensemble mean 2/r, generic`);
}
console.log('');

// ---------------------------------------------------------------------------
// THE SCAN. One pass per window; openers restricted to the mod-30 twin
// channels (a = 11, 17, 29 mod 30), which is exact for a > 5.
// ---------------------------------------------------------------------------
const CH = [11, 17, 29], DL = [6, 12, 12];
function firstOpener(lo) {
  // least a >= lo with a mod 30 in {11,17,29}; returns [a, channel index]
  const base = lo - (lo % 30);
  for (let k = 0; k < 3; k++) { const a = base + CH[k]; if (a >= lo) return [a, k]; }
  return [base + 30 + CH[0], 0];
}

// scan a family of windows; origin[i] = window origin N_i, hi[i] = N_i + w_i.
// verifyKill: re-verify the kill law by direct divisibility on the first r
// offsets of each window (treatment only; the control has no kill law).
function scanFamily(anchors, origins, tops, verifyKill) {
  const nA = anchors.length;
  const nQ = new Float64Array(nA);
  const o = {};            // o[r] = Float64Array(nA-agnostic: r classes)  per sub-band + total
  for (const r of HR) o[r] = new Float64Array(r * 4);
  let forbiddenHits = 0, total = 0, structFail = 0, killFail = 0;
  const third = Math.ceil(nA / 3);
  // precompute forbidden classes per anchor per r
  const forb = new Int32Array(nA * HR.length * 2);
  for (let i = 0; i < nA; i++) for (let k = 0; k < HR.length; k++) {
    const f = forbOf(HR[k], origins[i]);
    forb[(i * HR.length + k) * 2] = f[0]; forb[(i * HR.length + k) * 2 + 1] = f[1];
  }
  if (verifyKill) {
    for (let i = 0; i < nA; i++) {
      const Q = anchors[i], lo = origins[i];
      for (let k = 0; k < HR.length; k++) {
        const r = HR[k], al = ((Q % r) * (Q % r)) % r;
        if (!(QRS[r].has(al) && al !== 0)) killFail++;
        for (let t = 0; t < r; t++) {
          const killsA = (lo + t) % r === 0, killsB = (lo + t + 2) % r === 0;
          if (killsA !== (t === forb[(i * HR.length + k) * 2])) killFail++;
          if (killsB !== (t === forb[(i * HR.length + k) * 2 + 1])) killFail++;
        }
      }
    }
  }
  for (let i = 0; i < nA; i++) {
    const lo = origins[i], hi = tops[i], bandIdx = Math.min(2, Math.floor(i / third));
    let [a, k] = firstOpener(lo);
    let cnt = 0;
    while (a + 2 < hi) {
      if (isP(a) && isP(a + 2)) {
        cnt++;
        if (a < lo) structFail++;
        const t = a - lo;
        for (let j = 0; j < HR.length; j++) {
          const r = HR[j], c = t % r;
          o[r][c * 4 + bandIdx]++; o[r][c * 4 + 3]++;
          if (c === forb[(i * HR.length + j) * 2] || c === forb[(i * HR.length + j) * 2 + 1]) forbiddenHits++;
        }
      }
      a += DL[k]; k = (k + 1) % 3;
    }
    nQ[i] = cnt; total += cnt;
  }
  return { nQ, o, forbiddenHits, total, structFail, killFail, forb, third };
}

// pooled expectation, covariance, sub-band expectation
function nullObjects(res, anchors, r) {
  const nA = anchors.length, k = HR.indexOf(r), third = res.third;
  const e = new Float64Array(r), eb = new Float64Array(r * 3);
  const S = new Float64Array(r * r);         // sum_Q n_Q p_c p_d
  const allowed = new Uint8Array(r);
  const inv = 1 / (r - 2);
  for (let i = 0; i < nA; i++) {
    const n = res.nQ[i], f0 = res.forb[(i * HR.length + k) * 2], f1 = res.forb[(i * HR.length + k) * 2 + 1];
    if (n === 0) continue;
    const bandIdx = Math.min(2, Math.floor(i / third));
    allowed.fill(1); allowed[f0] = 0; allowed[f1] = 0;
    for (let c = 0; c < r; c++) if (allowed[c]) { e[c] += n * inv; eb[c * 3 + bandIdx] += n * inv; }
    for (let c = 0; c < r; c++) if (allowed[c]) for (let d = 0; d < r; d++) if (allowed[d]) S[c * r + d] += n * inv * inv;
  }
  return { e, eb, S };
}

function pearsonX2(o, e, r, off, stride) {
  let x2 = 0;
  for (let c = 0; c < r; c++) { const d = o[c * stride + off] - e[c]; x2 += d * d / e[c]; }
  return x2;
}

// ---------------------------------------------------------------------------
// ENVELOPE: lambda = eig(D^{-1/2} Cov D^{-1/2}) by cyclic Jacobi, then the
// 99.73rd percentile of sum lambda_k Z_k^2 / (r-1) over B_MC draws.
// ---------------------------------------------------------------------------
function jacobiEigenvalues(Ain, n) {
  const A = Float64Array.from(Ain);
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p * n + q] * A[p * n + q];
    if (off < 1e-22) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      const apq = A[p * n + q];
      if (Math.abs(apq) < 1e-18) continue;
      const theta = (A[q * n + q] - A[p * n + p]) / (2 * apq);
      const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
      const c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) {
        const akp = A[k * n + p], akq = A[k * n + q];
        A[k * n + p] = c * akp - s * akq; A[k * n + q] = s * akp + c * akq;
      }
      for (let k = 0; k < n; k++) {
        const apk = A[p * n + k], aqk = A[q * n + k];
        A[p * n + k] = c * apk - s * aqk; A[q * n + k] = s * apk + c * aqk;
      }
    }
  }
  const lam = []; for (let i = 0; i < n; i++) lam.push(A[i * n + i]);
  return lam;
}

let gaussSpare = null;
function gauss(rng) {
  if (gaussSpare !== null) { const g = gaussSpare; gaussSpare = null; return g; }
  let u = 0, v = 0;
  while (u === 0) u = rng();
  v = rng();
  const m = Math.sqrt(-2 * Math.log(u));
  gaussSpare = m * Math.sin(2 * Math.PI * v);
  return m * Math.cos(2 * Math.PI * v);
}
function envelopeFromLambda(lam, rng) {
  const L = lam.filter(x => x > 1e-9);
  const draws = new Float64Array(B_MC);
  for (let b = 0; b < B_MC; b++) {
    let s = 0;
    for (let k = 0; k < L.length; k++) { const z = gauss(rng); s += L[k] * z * z; }
    draws[b] = s;
  }
  draws.sort();
  // qLo is POST HOC and DESCRIPTIVE: §1 registered a one-sided upper band
  // only. It is printed because the first run read low in BOTH families and
  // the honest question "how low is low" needs a reference, not because any
  // verdict depends on it.
  return { q: draws[Math.floor(ALPHA_ENV * B_MC)], qLo: draws[Math.floor((1 - ALPHA_ENV) * B_MC)], mean: L.reduce((x, y) => x + y, 0) };
}
function nominalChi2Quantile(df, rng) {
  const draws = new Float64Array(B_MC);
  for (let b = 0; b < B_MC; b++) { let s = 0; for (let k = 0; k < df; k++) { const z = gauss(rng); s += z * z; } draws[b] = s; }
  draws.sort();
  return draws[Math.floor(ALPHA_ENV * B_MC)];
}

function corr(x, y, n) {
  let mx = 0, my = 0; for (let i = 0; i < n; i++) { mx += x[i]; my += y[i]; } mx /= n; my /= n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { const dx = x[i] - mx, dy = y[i] - my; sxy += dx * dy; sxx += dx * dx; syy += dy * dy; }
  return sxy / Math.sqrt(sxx * syy);
}

// ---------------------------------------------------------------------------
// SEC 2 — CALIBRATION GATE (§1f). Targets EXTRACTED from stretch-01.js.
// ---------------------------------------------------------------------------
console.log('SEC 2 — CALIBRATION GATE vs stretch-01.js SEC C2 (targets extracted from its embedded OUTPUT at runtime)');
const s01src = fs.readFileSync('research/stretch-01.js', 'utf8');
const tgt = {};
{
  const mForb = s01src.match(/twin openers in forbidden classes: (\d+) \(must be 0\)/);
  if (!mForb) throw new Error('could not extract the forbidden-class target from stretch-01.js');
  tgt.forbidden = Number(mForb[1]);
  const re = /r=(\d+) \(N=(\d+)\): marginal null chi2\/df = ([\d.]+); CONDITIONAL null \(anchors fixed\) chi2\/df = ([\d.]+) \(df (\d+)\); worst class vs conditional c=(\d+), ([\d.]+)%/g;
  tgt.rows = {}; let m;
  while ((m = re.exec(s01src)) !== null) tgt.rows[Number(m[1])] = { N: Number(m[2]), marg: m[3], cond: m[4], df: Number(m[5]), wc: Number(m[6]), wp: m[7] };
  // anchor on the COMMENT lines of the embedded OUTPUT block, not on the
  // source's template literals (which carry no digits and must not match):
  const mObs = s01src.match(/^\/\/\s+obs shares:\s+\[([^\]]+)\]/m);
  const mCond = s01src.match(/^\/\/\s+cond null:\s+\[([^\]]+)\]/m);
  if (!mObs || !mCond) throw new Error('could not extract the r=7 share vectors from stretch-01.js');
  tgt.obs7 = mObs[1].split(',').map(s => s.trim());
  tgt.cond7 = mCond[1].split(',').map(s => s.trim());
}
assertEq('G0-targets-extracted', Object.keys(tgt.rows).length, HR.length);
{
  const origins = anchorsCal.map(q => q * q);
  const tops = anchorsCal.map(q => { const qp = nextPrimeAfter(q); return qp * qp; });
  const res = scanFamily(anchorsCal, origins, tops, true);
  assertEq('G1-cal-forbidden-hits', res.forbiddenHits, tgt.forbidden);
  assertEq('G2-cal-killlaw', res.killFail, 0);
  assertEq('G3-cal-struct', res.structFail, 0);
  console.log(`  q in [${QLO_CAL}, ${QHI_CAL}]: ${anchorsCal.length} anchors, ${res.total} twin openers; twin openers in forbidden classes: ${res.forbiddenHits} (target ${tgt.forbidden})`);
  for (const r of HR) {
    const T = tgt.rows[r];
    assertEq(`G4-cal-N-r${r}`, res.total, T.N);
    const { e } = nullObjects(res, anchorsCal, r);
    const condDf = (pearsonX2(res.o[r], e, r, 3, 4) / (r - 1)).toFixed(2);
    // marginal null, exactly SEC C2's derived form
    let margX2 = 0;
    for (let c = 0; c < r; c++) {
      const f = (rootsCount(r, -c) + rootsCount(r, -c - 2)) / (r - 1);
      const ee = res.total * (1 - f) / (r - 2), oo = res.o[r][c * 4 + 3];
      margX2 += (oo - ee) * (oo - ee) / ee;
    }
    const margDf = (margX2 / (r - 1)).toFixed(2);
    let worst = 0, worstC = 0;
    for (let c = 0; c < r; c++) { const d = Math.abs(res.o[r][c * 4 + 3] / e[c] - 1); if (d > worst) { worst = d; worstC = c; } }
    assertEq(`G5-cal-cond-r${r}`, condDf, T.cond);
    assertEq(`G6-cal-marg-r${r}`, margDf, T.marg);
    assertEq(`G7-cal-worstclass-r${r}`, worstC, T.wc);
    assertEq(`G8-cal-worstpct-r${r}`, (worst * 100).toFixed(2), T.wp);
    console.log(`  r=${r}: conditional chi2/df ${condDf} (target ${T.cond}); marginal ${margDf} (target ${T.marg}); worst class c=${worstC} at ${(worst * 100).toFixed(2)}% (target c=${T.wc}, ${T.wp}%) — MATCH`);
  }
  {
    const r = 7, { e } = nullObjects(res, anchorsCal, r);
    const obs = [], cnd = [];
    for (let c = 0; c < r; c++) { obs.push((res.o[r][c * 4 + 3] / res.total).toFixed(4)); cnd.push((e[c] / res.total).toFixed(4)); }
    assertEq('G9-cal-obs7', obs.join(','), tgt.obs7.join(','));
    assertEq('G10-cal-cond7', cnd.join(','), tgt.cond7.join(','));
    console.log(`  r=7 observed shares [${obs.join(', ')}] and conditional null [${cnd.join(', ')}] reproduce stretch-01.js digit-exact`);
  }
}
if (failures > 0) { console.log(''); console.log('CALIBRATION GATE FAILED — aborting before any new-range figure prints.'); console.log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`); process.exit(1); }
console.log(`  GATE PASSES. ${((Date.now() - T0) / 1000).toFixed(1)} s so far.`);
console.log('');

// ---------------------------------------------------------------------------
// SEC 3 — THE NEW RANGE: treatment and matched control
// ---------------------------------------------------------------------------
console.log('SEC 3 — THE NEW RANGE q IN [10^4, 3.16*10^4]: TREATMENT AND MATCHED CONTROL');
const widths = anchorsNew.map(q => nextPrimeAfter(q) * nextPrimeAfter(q) - q * q);
const tOrig = anchorsNew.map(q => q * q);
const tTops = anchorsNew.map((q, i) => tOrig[i] + widths[i]);
function isSquare(n) { const s = Math.round(Math.sqrt(n)); return s * s === n; }
let steppedDown = 0;
const cOrig = anchorsNew.map((q, i) => {
  let N = q * q - widths[i];
  while (isSquare(N)) { N -= 30; steppedDown++; }
  return N;
});
const cTops = cOrig.map((N, i) => N + widths[i]);
for (let i = 0; i < anchorsNew.length; i++) {
  assertTrue('D1-control-not-square', !isSquare(cOrig[i]));
  assertTrue('D2-widths-matched', cTops[i] - cOrig[i] === tTops[i] - tOrig[i]);
  assertTrue('D3-control-below-anchor', cTops[i] <= tOrig[i]);
}
const T = scanFamily(anchorsNew, tOrig, tTops, true);
const C = scanFamily(anchorsNew, cOrig, cTops, false);
assertEq('E1-killlaw-new', T.killFail, 0);
assertEq('E2-struct-new', T.structFail + C.structFail, 0);
assertEq('E3-forbidden-new', T.forbiddenHits, 0);
assertEq('E4-forbidden-control', C.forbiddenHits, 0);
const bStart = [anchorsNew[0], anchorsNew[T.third], anchorsNew[Math.min(2 * T.third, anchorsNew.length - 1)]];
const bEnd = [anchorsNew[T.third - 1], anchorsNew[Math.min(2 * T.third, anchorsNew.length - 1) - 1], qLast];
console.log(`  anchors ${anchorsNew.length} (q = ${anchorsNew[0]}..${qLast}); treatment openers ${T.total}; control openers ${C.total}; control origins stepped down by 30 at ${steppedDown} anchor(s)`);
console.log(`  certification in offset coordinates: twin openers in forbidden classes (treatment): ${T.forbiddenHits} (must be 0)`);
console.log(`  sub-bands (equal anchor counts, §1c): A q=${bStart[0]}..${bEnd[0]}, B q=${bStart[1]}..${bEnd[1]}, C q=${bStart[2]}..${bEnd[2]}`);
console.log('');

const rng = mulberry32(SEED);
const rows = [];
for (const r of HR) {
  const out = { r };
  for (const [name, res, anch] of [['T', T, anchorsNew], ['C', C, anchorsNew]]) {
    const { e, eb, S } = nullObjects(res, anch, r);
    const x2 = pearsonX2(res.o[r], e, r, 3, 4);
    // Cov = diag(e) - S ; A = D^{-1/2} Cov D^{-1/2}
    const A = new Float64Array(r * r);
    for (let c = 0; c < r; c++) for (let d = 0; d < r; d++) {
      const cov = (c === d ? e[c] : 0) - S[c * r + d];
      A[c * r + d] = cov / Math.sqrt(e[c] * e[d]);
    }
    const lam = jacobiEigenvalues(A, r);
    const env = envelopeFromLambda(lam, rng);
    let worst = 0, worstC = 0;
    for (let c = 0; c < r; c++) { const dv = Math.abs(res.o[r][c * 4 + 3] / e[c] - 1); if (dv > worst) { worst = dv; worstC = c; } }
    // sub-band residual-shape correlations
    const dFull = new Float64Array(r), dB = [new Float64Array(r), new Float64Array(r), new Float64Array(r)];
    for (let c = 0; c < r; c++) {
      dFull[c] = res.o[r][c * 4 + 3] - e[c];
      for (let j = 0; j < 3; j++) dB[j][c] = res.o[r][c * 4 + j] - eb[c * 3 + j];
    }
    const rho = [0, 1, 2].map(j => corr(dB[j], dFull, r));
    // POST HOC instrument diagnostic (see §2's disclosed deviation): §1c's
    // clause correlates each third's residual with the FULL residual, of
    // which it is a summand, so it is biased toward +1 by construction. The
    // leave-one-out form corr(d^(j), d - d^(j)) has no such bias.
    const rhoLOO = [0, 1, 2].map(j => {
      const rest = new Float64Array(r);
      for (let c = 0; c < r; c++) rest[c] = dFull[c] - dB[j][c];
      return corr(dB[j], rest, r);
    });
    out[name] = { x2df: x2 / (r - 1), env: env.q / (r - 1), envLo: env.qLo / (r - 1), nullMean: env.mean / (r - 1), worst: worst * 100, worstC, rho, rhoLOO, N: res.total };
  }
  // marginal null, descriptive only (treatment)
  let margX2 = 0;
  for (let c = 0; c < r; c++) {
    const f = (rootsCount(r, -c) + rootsCount(r, -c - 2)) / (r - 1);
    const ee = T.total * (1 - f) / (r - 2), oo = T.o[r][c * 4 + 3];
    margX2 += (oo - ee) * (oo - ee) / ee;
  }
  out.marg = margX2 / (r - 1);
  out.nominal = nominalChi2Quantile(r - 1, rng) / (r - 1);
  rows.push(out);
}

console.log('SEC 4 — THE READING, SCORED AGAINST §1e');
console.log('  TREATMENT (square anchors), conditional null, per-anchor marginals subtracted:');
for (const o of rows) {
  const flag = o.T.x2df > o.T.env ? 'OVER' : 'inside';
  console.log(`   r=${o.r} (N=${o.T.N}): chi2/df = ${o.T.x2df.toFixed(2)}  [null mean ${o.T.nullMean.toFixed(3)}, 99.73% envelope ${o.T.env.toFixed(3)} -> ${flag}]  worst class c=${o.T.worstC}, ${o.T.worst.toFixed(2)}%  sub-band residual-shape corr ${o.T.rho.map(x => x.toFixed(2)).join(' / ')}`);
}
console.log('  CONTROL (matched non-square anchors, same widths, same code path):');
for (const o of rows) {
  const flag = o.C.x2df > o.C.env ? 'OVER' : 'inside';
  console.log(`   r=${o.r} (N=${o.C.N}): chi2/df = ${o.C.x2df.toFixed(2)}  [null mean ${o.C.nullMean.toFixed(3)}, 99.73% envelope ${o.C.env.toFixed(3)} -> ${flag}]  worst class c=${o.C.worstC}, ${o.C.worst.toFixed(2)}%`);
}
console.log('  POST HOC, no verdict (disclosed in the note\'s §2): §1c\'s sub-band clause correlates each third\'s residual with the FULL residual, of which it is a summand, so it is biased toward +1 and is never reached here because clause (i) does not fire. The unbiased leave-one-out form corr(d^(j), d - d^(j)), and the null\'s LOWER 0.27% reference the one-sided registered band does not carry:');
for (const o of rows) {
  console.log(`   r=${o.r}: treatment leave-one-out sub-band corr ${o.T.rhoLOO.map(x => x.toFixed(2)).join(' / ')}; control ${o.C.rhoLOO.map(x => x.toFixed(2)).join(' / ')}; null 0.27% lower reference ${o.T.envLo.toFixed(3)} (treatment ${o.T.x2df.toFixed(2)}, control ${o.C.x2df.toFixed(2)})`);
}
console.log('  DESCRIPTIVE, no band: the MARGINAL null (anchor-sampling variance not priced) and the nominal chi2_{r-1} 99.73% quantile/df, which §1c registered as the WRONG reference for this statistic:');
for (const o of rows) console.log(`   r=${o.r}: marginal chi2/df = ${o.marg.toFixed(2)};  nominal chi2_{${o.r - 1}} 99.73%/df = ${o.nominal.toFixed(3)} vs the conditional envelope ${o.T.env.toFixed(3)}`);

const ctrlOver = rows.filter(o => o.C.x2df > o.C.env).map(o => o.r);
const trtOver = rows.filter(o => o.T.x2df > o.T.env).map(o => o.r);
const signOK = rows.filter(o => o.T.x2df > o.T.env && o.T.rho.every(x => x > 0)).map(o => o.r);
let verdict;
if (ctrlOver.length > 0) verdict = `VOID (instrument defect): the matched control is outside its own 99.73% envelope at r = ${ctrlOver.join(', ')}, and §1e voids the treatment verdict in that case`;
else if (trtOver.length > 0 && signOK.length > 0) verdict = `KILL: r = ${signOK.join(', ')} over the envelope with the residual shape reproducing in all three sub-bands, control clean`;
else if (trtOver.length > 0) verdict = `HOLD: r = ${trtOver.join(', ')} over the envelope but the residual shape does not reproduce across all three sub-bands, so §1e's clause (ii) fails`;
else verdict = 'HOLD: every treatment chi2/df is inside its conditional-null 99.73% envelope, and the matched control is inside its own';
console.log('');
console.log(`  PREREGISTERED VERDICT: ${verdict}`);
const lo = Math.min(...rows.map(o => o.T.x2df)), hiv = Math.max(...rows.map(o => o.T.x2df));
const clo = Math.min(...rows.map(o => o.C.x2df)), chi = Math.max(...rows.map(o => o.C.x2df));
console.log(`  treatment chi2/df range over r = 7..23: ${lo.toFixed(2)}..${hiv.toFixed(2)} (stretch-01 SEC C2 read ${tgt.rows[11].cond}..${tgt.rows[23].cond} on the decade below); control ${clo.toFixed(2)}..${chi.toFixed(2)}`);
console.log('');
console.log(`elapsed ${((Date.now() - T0) / 1000).toFixed(1)} s`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `${failures} ASSERTION FAILURES`);
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/records-placement-02.js
//   invocation:  node research/records-placement-02.js
//   code-sha256: d8f512bf0a67f04829e2addfdc276632af4664caf9916a722f20a9cd8d0bf7e2
//   out-sha256:  938232d281a1928adbdd83d4837661974c83848e00674e27c3c76dd0bb114020
//   body-lines:  63
//   inputs:      research/stretch-01.js@2d3cf9f2e077
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     4.9 s
// ============================================================================
// SEC 0 — LEVEL, WIDTH AUDIT, SIEVE
//   new-range anchors: 2170 primes q = 10007..31583; top height q'^2 = 998623201
//   odd-bit sieve to 998623201 built and cross-checked (base table to 40000, pi(1e6) = 78498); 1.9 s so far
//
// SEC 1 — KILL LAW, IMMUNE CLASSES, GUARDRAIL (recomputed, not cited)
//   r=7: immune offset classes {0,2} (2/7); total kill incidence 12 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=11: immune offset classes {1,3,9} (3/11); total kill incidence 20 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=13: immune offset classes {0,5,6,11} (4/13); total kill incidence 24 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=17: immune offset classes {3,5,10,12} (4/17); total kill incidence 32 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=19: immune offset classes {4,5,7,9,17} (5/19); total kill incidence 36 = 2(r-1) exactly => ensemble mean 2/r, generic
//   r=23: immune offset classes {0,1,2,4,6,16} (6/23); total kill incidence 44 = 2(r-1) exactly => ensemble mean 2/r, generic
//
// SEC 2 — CALIBRATION GATE vs stretch-01.js SEC C2 (targets extracted from its embedded OUTPUT at runtime)
//   q in [317, 9973]: 1164 anchors, 439644 twin openers; twin openers in forbidden classes: 0 (target 0)
//   r=7: conditional chi2/df 0.86 (target 0.86); marginal 21.85 (target 21.85); worst class c=6 at 0.47% (target c=6, 0.47%) — MATCH
//   r=11: conditional chi2/df 0.52 (target 0.52); marginal 5.89 (target 5.89); worst class c=5 at 0.56% (target c=5, 0.56%) — MATCH
//   r=13: conditional chi2/df 0.93 (target 0.93); marginal 7.57 (target 7.57); worst class c=3 at 1.14% (target c=3, 1.14%) — MATCH
//   r=17: conditional chi2/df 0.91 (target 0.91); marginal 3.19 (target 3.19); worst class c=0 at 1.32% (target c=0, 1.32%) — MATCH
//   r=19: conditional chi2/df 0.64 (target 0.64); marginal 5.34 (target 5.34); worst class c=7 at 0.97% (target c=7, 0.97%) — MATCH
//   r=23: conditional chi2/df 1.63 (target 1.63); marginal 3.32 (target 3.32); worst class c=5 at 2.40% (target c=5, 2.40%) — MATCH
//   r=7 observed shares [0.2007, 0.1309, 0.2008, 0.0635, 0.1361, 0.1324, 0.1356] and conditional null [0.2000, 0.1315, 0.2000, 0.0638, 0.1362, 0.1323, 0.1362] reproduce stretch-01.js digit-exact
//   GATE PASSES. 2.0 s so far.
//
// SEC 3 — THE NEW RANGE q IN [10^4, 3.16*10^4]: TREATMENT AND MATCHED CONTROL
//   anchors 2170 (q = 10007..31583); treatment openers 2979349; control openers 2978489; control origins stepped down by 30 at 0 anchor(s)
//   certification in offset coordinates: twin openers in forbidden classes (treatment): 0 (must be 0)
//   sub-bands (equal anchor counts, §1c): A q=10007..16931, B q=16937..24071, C q=24077..31583
//
// SEC 4 — THE READING, SCORED AGAINST §1e
//   TREATMENT (square anchors), conditional null, per-anchor marginals subtracted:
//    r=7 (N=2979349): chi2/df = 0.31  [null mean 0.933, 99.73% envelope 3.168 -> inside]  worst class c=3, 0.23%  sub-band residual-shape corr 0.55 / 0.47 / 0.26
//    r=11 (N=2979349): chi2/df = 0.54  [null mean 0.978, 99.73% envelope 2.632 -> inside]  worst class c=8, 0.33%  sub-band residual-shape corr 0.58 / 0.62 / 0.48
//    r=13 (N=2979349): chi2/df = 0.44  [null mean 0.985, 99.73% envelope 2.475 -> inside]  worst class c=12, 0.24%  sub-band residual-shape corr 0.67 / 0.38 / 0.59
//    r=17 (N=2979349): chi2/df = 1.11  [null mean 0.992, 99.73% envelope 2.245 -> inside]  worst class c=8, 0.73%  sub-band residual-shape corr 0.66 / 0.85 / 0.70
//    r=19 (N=2979349): chi2/df = 0.60  [null mean 0.993, 99.73% envelope 2.159 -> inside]  worst class c=16, 0.37%  sub-band residual-shape corr 0.15 / 0.46 / 0.62
//    r=23 (N=2979349): chi2/df = 0.54  [null mean 0.996, 99.73% envelope 2.034 -> inside]  worst class c=22, 0.40%  sub-band residual-shape corr 0.62 / 0.66 / 0.30
//   CONTROL (matched non-square anchors, same widths, same code path):
//    r=7 (N=2978489): chi2/df = 0.45  [null mean 0.933, 99.73% envelope 3.132 -> inside]  worst class c=0, 0.14%
//    r=11 (N=2978489): chi2/df = 0.75  [null mean 0.978, 99.73% envelope 2.657 -> inside]  worst class c=6, 0.27%
//    r=13 (N=2978489): chi2/df = 0.73  [null mean 0.985, 99.73% envelope 2.468 -> inside]  worst class c=4, 0.34%
//    r=17 (N=2978489): chi2/df = 0.67  [null mean 0.992, 99.73% envelope 2.245 -> inside]  worst class c=12, 0.48%
//    r=19 (N=2978489): chi2/df = 0.50  [null mean 0.993, 99.73% envelope 2.165 -> inside]  worst class c=3, 0.38%
//    r=23 (N=2978489): chi2/df = 1.11  [null mean 0.996, 99.73% envelope 2.033 -> inside]  worst class c=3, 0.66%
//   POST HOC, no verdict (disclosed in the note's §2): §1c's sub-band clause correlates each third's residual with the FULL residual, of which it is a summand, so it is biased toward +1 and is never reached here because clause (i) does not fire. The unbiased leave-one-out form corr(d^(j), d - d^(j)), and the null's LOWER 0.27% reference the one-sided registered band does not carry:
//    r=7: treatment leave-one-out sub-band corr -0.14 / -0.44 / -0.51; control 0.08 / 0.25 / 0.35; null 0.27% lower reference 0.083 (treatment 0.31, control 0.45)
//    r=11: treatment leave-one-out sub-band corr -0.07 / 0.11 / -0.16; control -0.14 / -0.22 / -0.17; null 0.27% lower reference 0.180 (treatment 0.54, control 0.75)
//    r=13: treatment leave-one-out sub-band corr 0.28 / -0.23 / -0.25; control 0.26 / -0.18 / -0.27; null 0.27% lower reference 0.220 (treatment 0.44, control 0.73)
//    r=17: treatment leave-one-out sub-band corr 0.41 / 0.46 / 0.35; control -0.06 / -0.20 / -0.06; null 0.27% lower reference 0.289 (treatment 1.11, control 0.67)
//    r=19: treatment leave-one-out sub-band corr -0.38 / -0.30 / -0.38; control -0.32 / -0.17 / -0.34; null 0.27% lower reference 0.308 (treatment 0.60, control 0.50)
//    r=23: treatment leave-one-out sub-band corr 0.04 / -0.02 / -0.34; control 0.10 / 0.13 / 0.52; null 0.27% lower reference 0.360 (treatment 0.54, control 1.11)
//   DESCRIPTIVE, no band: the MARGINAL null (anchor-sampling variance not priced) and the nominal chi2_{r-1} 99.73% quantile/df, which §1c registered as the WRONG reference for this statistic:
//    r=7: marginal chi2/df = 101.47;  nominal chi2_{6} 99.73%/df = 3.355 vs the conditional envelope 3.168
//    r=11: marginal chi2/df = 29.51;  nominal chi2_{10} 99.73%/df = 2.698 vs the conditional envelope 2.632
//    r=13: marginal chi2/df = 8.13;  nominal chi2_{12} 99.73%/df = 2.505 vs the conditional envelope 2.475
//    r=17: marginal chi2/df = 20.55;  nominal chi2_{16} 99.73%/df = 2.255 vs the conditional envelope 2.245
//    r=19: marginal chi2/df = 6.42;  nominal chi2_{18} 99.73%/df = 2.157 vs the conditional envelope 2.159
//    r=23: marginal chi2/df = 2.33;  nominal chi2_{22} 99.73%/df = 2.049 vs the conditional envelope 2.034
//
//   PREREGISTERED VERDICT: HOLD: every treatment chi2/df is inside its conditional-null 99.73% envelope, and the matched control is inside its own
//   treatment chi2/df range over r = 7..23: 0.31..1.11 (stretch-01 SEC C2 read 0.52..1.63 on the decade below); control 0.45..1.11
//
// elapsed 4.9 s
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================
// 1. THE PREREGISTERED VERDICT [MEASURED, scored against
//    research/history/staging/records-placement-02.md §1, UNSEALED — no
//    commit is possible in this session, so the only custody is the write
//    order inside it; the earlier probes in this family were sealed by
//    commit]: **HOLD.** Every treatment chi2/df is inside its own
//    conditional-null 99.73% envelope — 0.31, 0.54, 0.44, 1.11, 0.60, 0.54
//    at r = 7, 11, 13, 17, 19, 23 against envelopes 3.168, 2.632, 2.475,
//    2.245, 2.159, 2.034 — so §1e's clause (i) never fires and clauses (ii)
//    and (iii) are not reached. The matched control is inside its own
//    envelope at every r (0.45 to 1.11), so nothing is VOID either. **No
//    offset structure beyond the QR redistribution is detected at square
//    anchors over q in [10^4, 3.16*10^4], on 2979349 twin openers at
//    heights 1e8..1e9.**
// 2. WHAT THAT IS AND IS NOT: it extends stretch-01 SEC C2's
//    conditional-null read by one decade of height (1e5..1e8 there,
//    1e8..1e9 here) and by a factor 6.8 in openers (439644 to 2979349),
//    with bands written first, which SEC C2 did not have. It is NOT a
//    density statement: the guardrail (total kill incidence 2(r-1) exactly,
//    reproduced in SEC 1 at every r) is PROVEN and Route B is CLOSED. It is
//    NOT an occupancy statement about all q — that is the Stretch
//    Postulate, unproven. No Z2 bound, no TPC content.
// 3. CALIBRATION [VERIFIED]: the identical statistic on q in [317, 9973]
//    reproduces stretch-01.js SEC C2's embedded OUTPUT digit-exact — 439644
//    openers, 0 in forbidden classes, conditional chi2/df 0.86, 0.52, 0.93,
//    0.91, 0.64, 1.63, the marginal chi2/df 21.85, 5.89, 7.57, 3.19, 5.34,
//    3.32, every worst class and its percentage, and both r=7 share vectors.
//    The targets are extracted from that file at runtime, never transcribed.
//    The QR kill law re-verifies by direct divisibility at every anchor of
//    both ranges, and the certification in offset coordinates holds: 0 twin
//    openers in forbidden classes over the new range too.
// 4. A REGISTERED CLAUSE THAT WAS BIASED, FOUND BEFORE IT MATTERED
//    [process, POST HOC]: §1c's sub-band consistency clause correlates each
//    third's residual with the FULL residual, of which that third is a
//    summand, so it is biased toward +1 by construction — and the run shows
//    it, every treatment correlation landing positive (0.15 to 0.85) while
//    nothing flags. The clause was never reached, because clause (i) did not
//    fire, so no verdict here depends on it. The unbiased leave-one-out form
//    corr(d^(j), d - d^(j)) is printed instead and reads mixed-sign in both
//    families (treatment -0.51 to 0.46, control -0.34 to 0.52): no residual
//    shape reproduces across the thirds in either. Any replication of this
//    probe should register the leave-one-out form.
// 5. THE READINGS RUN LOW IN BOTH FAMILIES, AND THAT IS NOT AN ANCHOR
//    EFFECT [MEASURED, descriptive]: five of six treatment values and five
//    of six control values sit below their null mean (0.933 to 0.996). The
//    effect is common to treatment and control, which is exactly what the
//    matched control exists to separate, and every value is above the
//    null's 0.27% lower reference (0.083, 0.180, 0.220, 0.289, 0.308,
//    0.360), so nothing is detected on that side either. It is reported as
//    an observation about the conditional null's dispersion at this range,
//    not as a finding.
// 6. NO CLAIM / NOT REACHED: one half-decade of anchors closes; the decade
//    q ~ 10^5 is not run. r = 29 and 31 are outside the
//    replicated set and were not tested. The control overlaps the previous
//    anchor's treatment openers by construction (note §1h), so its power is
//    against instrument defects and not against sampling accidents. rho(2)
//    is ADVERSE at u = 2; Route B stays closed.
// ============================================================
// FIGURE PROVENANCE. Every figure above is from this producer's own OUTPUT
// block. The calibration targets quoted in reading 3 are stretch-01.js's
// embedded OUTPUT, extracted at runtime and re-derived here, not cited. The
// QR kill law, the immune classes and the guardrail 2(r-1) are recomputed in
// SEC 1 rather than cited from stretch-01.md §4. The matched-control design
// and its forced deviation D1 are attack-z3-immune-01.js's §1c, reused.
// ============================================================
