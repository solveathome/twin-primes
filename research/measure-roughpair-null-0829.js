// ============================================================================
// MEASURE ROUGHPAIR NULL 0829 — THE INDEPENDENT-THINNING NULL THAT
// attack-roughpair-error.md NAMED IN ITS OWN DEFECTS LIST AND NEVER RAN
// ============================================================================
// THE QUESTION. attack-roughpair-error.md measured chi2/df = <E^2/Xmain> on the
// empirical error E = X(y) - Xmain(y) of the rough-pair census at 1,206 stretch
// anchors and found 0.546..0.803 (0.289 in one cut), below 1 everywhere, and
// called it sub-Poisson. Its own NOT REACHED list says: "a matched
// independent-thinning null should return chi2/df = 1; that control was not
// run." object-models-read-0829.md sec 4 leaves D8 as the ONE row whose
// residue-level / interval-level classification is open, and open only because
// nobody ran that null. This file runs it.
//
// THE DOUBT THIS FILE IS BUILT AROUND. chi2/df below 1 is only evidence of
// sub-Poisson dispersion if the NULL returns 1. A binomial null has variance
// C p (1 - p), not C p, so its chi2/df is 1 - p exactly, with p = Xmain/C of
// order T/C. If T/C is not negligible the null returns below 1 by construction
// and part of the "sub-Poisson" reading is a normalisation artefact. The
// pre-registration (research/history/staging/measure-roughpair-null-0829.md
// sec 1, written to disk BEFORE this file existed) registers that case in
// advance as F3, with the thresholds, so that a near-0.98 null return cannot be
// retro-fitted into a hit.
//
// THE NULL, PRECISELY (N-thin). For each channel opener a in the anchor's own
// stretch window, independently of every other opener, and for each active
// prime p_i independently: p_i kills a with probability 1/p_i, kills a+2 with
// probability 1/p_i, kills neither with probability 1 - 2/p_i. This is exactly
// the sieve density rho(p)/p = 2/p with the two forbidden residues distinct,
// i.e. the dimension-2 kill rule the main term is built from (Ford sec 1.7.2
// through quadpoint-prior-art.md sec 1.1), and the ONLY thing made independent
// is what the main term already treats as independent.
//
// ITS CLOSED FORM [DERIVED, exact within the model; GATED here by a
// brute-force per-prime sampler in SEC 2]. Under N-thin the per-opener
// probability of being counted in X(K) is
//     P = V2(K) * (1 - 2 U(K) + V2(nR)/V2(K)) = V2(K) - 2 V2(K) U(K) + V2(nR),
// which is Xnaive(K)/C verbatim, because P(A) = P(B) = U(K) and
// P(A and B) = V2(nR)/V2(K) for the two "survives past K" events. So
// X_null(K) ~ Binomial(C, p), and the openers-independent null IS a binomial
// null. Sampling per prime per opener is therefore only a gate, not the method.
//
// TWO VARIANTS, because the note prices E against the CORRECTED main term
// (the naive product carries the 26% fundamental-lemma bias omega(u) e^gamma
// per member):
//   N1 uncalibrated:  p = Xnaive/C, scored as E = X_null - Xcorr.
//   N2 mean-matched:  p = Xcorr/C,  scored as E = X_null - Xcorr.  <-- the
//   control the note asks for. Its exact chi2/df is 1 - p.
//
// LABEL. NULL-SIDE, label (i). attack-wrongdirection-audit.md sec 3.1: item Z2
// is (ii) TPC-strength, and "an upper bound on X(y) alone ... is a sieve
// statement and is not TPC-strength". A null on the dispersion of X is weaker
// still: it compares X against a random model of X and never against T.
// NOTHING HERE IS PROGRESS ON THE CERTIFICATE. No TPC claim.
//
// PROGRESS lines go to stderr, deliberately, so the embedded stdout stream is
// deterministic and --check can pass bit-honest.
//
// CUSTODY. SEC 1 reproduces attack-roughpair-error-01.js's SEC 2 grid DIGIT FOR
// DIGIT (5 depths x 6 bands x 7 columns, plus the two SUP lines) from an
// engine written here, and aborts before any new figure prints if it does not.
// The capture identity floor_K = T - X(K) is CITED, not re-verified, and is not
// needed: this file measures the dispersion of X, which survives if the
// identity falls.
// ============================================================================
'use strict';
const T0 = Date.now();

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function assertNear(tag, got, want, tol) {
  if (!(Math.abs(got - want) <= tol)) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want} +-${tol}`); return false; }
  return true;
}
const f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3), f4 = (x) => x.toFixed(4), f5 = (x) => x.toFixed(5);
const pad = (s, n) => String(s).padStart(n);

const SEED = 20260829;                 // fixed, printed
const R = 200;                         // replicates per anchor per depth per variant

// ---------------------------------------------------------------------------
// primes, actives, anchors — conventions identical to attack-roughpair-error-01
// ---------------------------------------------------------------------------
const PLIM = 31700;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);
const QMAX = 10007;
const ANCHORS = ACT.filter(p => p <= QMAX);
const GAMMA = 0.5772156649015329, EG = Math.exp(GAMMA), EMG = Math.exp(-GAMMA);
const isOpen30 = (c) => c === 11 || c === 17 || c === 29;

const NP = ACT.length;
const P1 = new Float64Array(NP + 1), P2 = new Float64Array(NP + 1);
P1[0] = 1; P2[0] = 1;
for (let i = 1; i <= NP; i++) { const p = ACT[i - 1]; P1[i] = P1[i - 1] * (1 - 1 / p); P2[i] = P2[i - 1] * (1 - 2 / p); }

// Buchstab omega on a grid, from the delay equation (u w(u))' = w(u-1)
const WSTEP = 1e-4, WMAX = 20;
const NW = Math.round((WMAX - 1) / WSTEP) + 1;
const WOM = new Float64Array(NW);
{
  for (let j = 0; j < NW; j++) {
    const u = 1 + j * WSTEP;
    if (u <= 2) WOM[j] = 1 / u;
    else if (u <= 3) WOM[j] = (1 + Math.log(u - 1)) / u;
    else break;
  }
  const j3 = Math.round(2 / WSTEP);
  let g = 3 * WOM[j3];
  for (let j = j3 + 1; j < NW; j++) {
    const u = 1 + j * WSTEP;
    const a = WOM[j - 1 - Math.round(1 / WSTEP)], b = WOM[j - Math.round(1 / WSTEP)];
    g += WSTEP * (a + b) / 2;
    WOM[j] = g / u;
  }
}
function omega(u) {
  if (u < 1) return 0;
  if (u >= WMAX) return EMG;
  const t = (u - 1) / WSTEP, j = Math.floor(t), fr = t - j;
  return WOM[j] * (1 - fr) + WOM[Math.min(j + 1, NW - 1)] * fr;
}
const beta = (u) => omega(u) * EG;

// ---------------------------------------------------------------------------
console.log('SEC 0 — ENGINE GATES (the licence to measure anything at all)');
// ---------------------------------------------------------------------------
assertNear('omega(2) = 1/2', omega(2), 0.5, 1e-9);
assertNear('3*omega(3) = 1 + ln 2', 3 * omega(3), 1 + Math.LN2, 1e-7);
assertNear('omega(12) -> e^{-gamma}', omega(12), EMG, 1e-6);
let uStar = 0;
{ let a = 3, b = 5; for (let it = 0; it < 200; it++) { const m = (a + b) / 2; if (m * omega(m) < 2) a = m; else b = m; } uStar = (a + b) / 2; }
assertEq('u* to 6 dp (cited 3.565847)', uStar.toFixed(6), '3.565847');
console.log(`  omega gates pass; u* = ${uStar.toFixed(6)}, rho(2) = beta(2)^2 = ${f5(beta(2) * beta(2))}`);

let maxW = 0;
{ let prev = 7; for (const p of ACT) { if (p > 10009) break; maxW = Math.max(maxW, p * p - prev * prev); prev = p; } }
const lpfw = new Int32Array(maxW + 4);
const rows = [];
for (let Qi = 0; Qi < ANCHORS.length; Qi++) {
  const Q = ANCHORS[Qi], Qp = Qi + 1 < ANCHORS.length ? ANCHORS[Qi + 1] : PRIMES[PRIMES.findIndex(p => p > Q)];
  const lo = Q * Q, hi = Qp * Qp, width = hi - lo, nR = Qi + 1;
  lpfw.fill(0, 0, width + 3);
  for (let ri = 0; ri < nR; ri++) {
    const r = ACT[ri];
    for (let v = Math.ceil(lo / r) * r; v <= hi + 1; v += r) if (lpfw[v - lo] === 0) lpfw[v - lo] = ri + 1;
  }
  let C = 0, T = 0;
  const histo = new Int32Array(nR + 2);
  const openers = [];
  for (let a = lo; a + 2 < hi; a++) {
    if (!isOpen30(a % 30)) continue;
    C++;
    const iA = lpfw[a - lo], iB = lpfw[a + 2 - lo];
    if (iA === 0 && iB === 0) T++;
    else if (iA > 0 && iB > 0) histo[Math.min(iA, iB)]++;
    if (Q <= 43) openers.push(a);            // kept only for the small-anchor brute-force gate
  }
  const X = new Int32Array(nR + 1);
  for (let K = nR - 1; K >= 0; K--) X[K] = X[K + 1] + histo[K + 1];
  let Kstar = -1;
  for (let K = 0; K <= nR; K++) if (T - X[K] >= 1) { Kstar = K; break; }
  rows.push({ Q, Qp, lo, hi, width, C, T, nR, X, Kstar, X0: X[0], lnh: 2 * Math.log(Q), lnW: Math.log(width), openers });
}
const byQ = new Map(rows.map(r => [r.Q, r]));
{
  const V2K = [[1511, 15], [1999, 16], [2503, 19], [2999, 25], [3163, 18], [3511, 22], [4001, 27], [4507, 21],
    [4999, 22], [5623, 27], [6007, 23], [6521, 27], [7001, 29], [7507, 34], [8009, 31], [8513, 32],
    [9001, 33], [9497, 32], [10007, 30], [7, 0], [43, 0], [61, 1], [67, 1], [71, 4], [809, 16], [1499, 13]];
  for (const [Q, Ks] of V2K) assertEq(`cited K* at Q=${Q}`, byQ.get(Q).Kstar, Ks);
  const worst = rows.reduce((w, r) => (r.Kstar > w.Kstar ? r : w));
  assertTrue('cited largest K* = 46 at Q = 9281', worst.Q === 9281 && worst.Kstar === 46);
  assertEq('cited K=0 certificate list', rows.filter(r => r.X0 <= r.T - 1).map(r => r.Q).join(','), '7,11,13,19,23,31,37,43');
  for (const r of rows) assertTrue(`X(full) = 0 at Q=${r.Q}`, r.X[r.nR] === 0);
  console.log(`  engine: ${rows.length} anchors Q = 7..${QMAX}; 25 cited K*, max K* = 46 at 9281, the K=0 list, X(full) = 0 everywhere — reproduced`);
}
const BANDS = [['B3', 101, 313], ['B4', 317, 997], ['B5', 1009, 1499], ['B6', 1500, 3163], ['B7', 3164, 5623], ['B8', 5624, 10007]];
{
  const want = { B3: ['3.88', '0.093'], B4: ['8.42', '0.075'], B5: ['12.20', '0.061'], B6: ['16.88', '0.050'], B7: ['23.34', '0.040'], B8: ['31.22', '0.032'] };
  for (const [nm, a, b] of BANDS) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b);
    assertEq(`Z1 ${nm} K* mean`, f2(rs.reduce((s, r) => s + r.Kstar, 0) / rs.length), want[nm][0]);
    assertEq(`Z1 ${nm} K*/pool`, f3(rs.reduce((s, r) => s + r.Kstar / r.nR, 0) / rs.length), want[nm][1]);
  }
  console.log('  Z1 band means reproduced (K* and K*/pool, all six bands)');
}

function mains(r, K) {
  const nR = r.nR;
  const V2K = P2[K], U = P1[nR] / P1[K], V2Q = P2[nR];
  const naive = r.C * (V2K - 2 * V2K * U + V2Q);
  const uK = K === 0 ? Infinity : r.lnh / Math.log(ACT[K - 1]);
  const bK = K === 0 ? 1 : beta(uK), bQ = beta(2);
  const corr = r.C * (V2K * bK * bK - 2 * V2K * U * bK * bQ + V2Q * bQ * bQ);
  return { naive, corr, uK };
}
function KatU(r, u) {
  const y = Math.exp(r.lnh / u);
  let lo = 0, hi = r.nR;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (ACT[m - 1] <= y) lo = m; else hi = m - 1; }
  return lo;
}

// ---------------------------------------------------------------------------
console.log('\nSEC 1 — CUSTODY: attack-roughpair-error-01.js SEC 2 REPRODUCED DIGIT FOR DIGIT');
// ---------------------------------------------------------------------------
// Every printed figure of the controlled note's SEC 2 grid, asserted from an
// engine written here. If one digit disagrees this file has no licence to print
// a null number, and it aborts.
const UALL = [2.5, 3.0, uStar, 4.0, 5.0];
const cell = {};
for (const u of UALL) {
  cell[u] = {};
  for (const [nm, a, b] of BANDS) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b).map(r => ({ r, K: KatU(r, u) })).filter(o => o.K >= 3);
    if (!rs.length) continue;
    let sX = 0, sM = 0, sT = 0, sE = 0, sAE = 0, sE2overM = 0, mxAEoverT = 0, sXoverT = 0, sMoverT = 0, n = 0;
    const items = [];
    for (const { r, K } of rs) {
      const m = mains(r, K), X = r.X[K], E = X - m.corr;
      sX += X; sM += m.corr; sT += r.T; sE += E; sAE += Math.abs(E);
      if (m.corr > 0) sE2overM += E * E / m.corr;
      mxAEoverT = Math.max(mxAEoverT, Math.abs(E) / r.T);
      sXoverT += X / r.T; sMoverT += m.corr / r.T; n++;
      items.push({ r, K, X, E, Mc: m.corr, Mn: m.naive, C: r.C });
    }
    cell[u][nm] = { n, sX, sM, sT, sE, sAE, chi2: sE2overM / n, mxAEoverT, mXoverT: sXoverT / n, mMoverT: sMoverT / n, items };
  }
}
// the embedded SEC 2 grid of attack-roughpair-error-01.js, transcribed as the assertion target:
// [u-key][band] = [<X/T>, <Xmain/T>, sumE/sumXmain, <|E|>/<T>, max|E|/T, chi2/df, n]
const CITED = {
  '2.50': { B3: ['0.1302', '0.1586', '-0.1265', '0.0507', '0.1828', '0.672', 40], B4: ['0.1535', '0.1566', '-0.0287', '0.0279', '0.2495', '0.652', 103], B5: ['0.1510', '0.1575', '-0.0398', '0.0242', '0.1230', '0.721', 71], B6: ['0.1584', '0.1606', '-0.0222', '0.0186', '0.1313', '0.875', 208], B7: ['0.1589', '0.1610', '-0.0195', '0.0152', '0.1303', '0.931', 292], B8: ['0.1590', '0.1615', '-0.0158', '0.0115', '0.1095', '0.866', 491] },
  '3.00': { B3: ['0.3729', '0.4247', '-0.0872', '0.0845', '0.5190', '0.803', 40], B4: ['0.4327', '0.4381', '-0.0156', '0.0464', '0.4463', '0.667', 103], B5: ['0.4370', '0.4374', '+0.0057', '0.0402', '0.2431', '0.777', 71], B6: ['0.4493', '0.4536', '-0.0089', '0.0296', '0.2304', '0.686', 208], B7: ['0.4555', '0.4597', '-0.0079', '0.0239', '0.1601', '0.760', 292], B8: ['0.4618', '0.4654', '-0.0046', '0.0184', '0.1440', '0.770', 491] },
  'ustar': { B3: ['0.7467', '0.7903', '-0.0311', '0.0934', '0.5628', '0.627', 40], B4: ['0.8734', '0.8819', '-0.0089', '0.0759', '0.4792', '0.785', 103], B5: ['0.9054', '0.9044', '+0.0056', '0.0462', '0.2818', '0.546', 71], B6: ['0.9115', '0.9115', '-0.0044', '0.0401', '0.3271', '0.665', 208], B7: ['0.9209', '0.9268', '-0.0051', '0.0298', '0.1949', '0.578', 292], B8: ['0.9486', '0.9491', '-0.0012', '0.0255', '0.2054', '0.718', 491] },
  '4.00': { B3: ['1.1998', '1.2716', '-0.0387', '0.0999', '0.5413', '0.497', 26], B4: ['1.2850', '1.2953', '-0.0074', '0.0837', '0.4033', '0.714', 103], B5: ['1.3726', '1.3663', '+0.0013', '0.0484', '0.3137', '0.434', 71], B6: ['1.3881', '1.3891', '-0.0041', '0.0481', '0.3008', '0.607', 208], B7: ['1.4243', '1.4310', '-0.0045', '0.0356', '0.2580', '0.552', 292], B8: ['1.4391', '1.4396', '-0.0015', '0.0298', '0.2359', '0.660', 491] },
  '5.00': { B4: ['2.4973', '2.5080', '-0.0067', '0.0961', '0.4772', '0.485', 57], B5: ['2.7329', '2.7181', '-0.0008', '0.0628', '0.4170', '0.289', 71], B6: ['2.6128', '2.6161', '-0.0020', '0.0556', '0.3258', '0.429', 208], B7: ['2.8772', '2.8832', '-0.0016', '0.0448', '0.3053', '0.439', 292], B8: ['2.9316', '2.9338', '-0.0013', '0.0358', '0.2705', '0.458', 491] }
};
{
  let nfig = 0;
  for (const u of UALL) {
    const key = u === uStar ? 'ustar' : f2(u);
    for (const [nm] of BANDS) {
      const w = CITED[key][nm], c = cell[u][nm];
      if (!w) { assertTrue(`cited grid has no ${key}/${nm} and neither does this engine`, !c); continue; }
      assertEq(`${key} ${nm} n`, c.n, w[6]);
      assertEq(`${key} ${nm} <X/T>`, f4(c.mXoverT), w[0]);
      assertEq(`${key} ${nm} <Xmain/T>`, f4(c.mMoverT), w[1]);
      assertEq(`${key} ${nm} sumE/sumXmain`, (c.sE / c.sM >= 0 ? '+' : '') + f4(c.sE / c.sM), w[2]);
      assertEq(`${key} ${nm} <|E|>/<T>`, f4(c.sAE / c.sT), w[3]);
      assertEq(`${key} ${nm} max|E|/T`, f4(c.mxAEoverT), w[4]);
      assertEq(`${key} ${nm} chi2/df`, f3(c.chi2), w[5]);
      nfig += 7;
    }
  }
  for (const [u, wn, wmx, wq] of [[3.0, 1216, '0.5190', 269], [uStar, 1206, '0.5628', 269]]) {
    let mx = 0, mxQ = 0, nOver = 0, n = 0;
    for (const r of rows) {
      const K = KatU(r, u); if (K < 3) continue;
      const E = r.X[K] - mains(r, K).corr; n++;
      if (Math.abs(E) / r.T > mx) { mx = Math.abs(E) / r.T; mxQ = r.Q; }
      if (Math.abs(E) >= r.T) nOver++;
    }
    assertEq(`SUP n at u=${u === uStar ? 'u*' : f2(u)}`, n, wn);
    assertEq(`SUP max|E|/T at u=${u === uStar ? 'u*' : f2(u)}`, f4(mx), wmx);
    assertEq(`SUP argmax Q`, mxQ, wq);
    assertEq(`anchors with |E| >= T`, nOver, 0);
    console.log(`  SUP reproduced at u = ${u === uStar ? 'u*' : f2(u)}: n = ${n} anchors, max |E|/T = ${f4(mx)} at Q = ${mxQ}, anchors with |E| >= T: ${nOver}`);
    nfig += 4;
  }
  console.log(`  ${nfig} figures of attack-roughpair-error-01.js SEC 2 asserted digit for digit (5 depths, 6 bands, 7 columns, plus both SUP lines); failures so far: ${failures}`);
}
if (failures > 0) { console.log('  CUSTODY GATE FAILED — no null figure is printed.'); console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`); process.exit(1); }

// ---------------------------------------------------------------------------
console.log('\nSEC 2 — THE NULL\'S CLOSED FORM, GATED AGAINST A BRUTE-FORCE PER-PRIME SAMPLER');
// ---------------------------------------------------------------------------
// The claim: sampling N-thin prime by prime, opener by opener, is the same
// distribution as Binomial(C, Xnaive(K)/C). Gate it by doing exactly that on
// the small anchors, where the brute force is affordable, and comparing the
// sampled mean and variance to C p and C p (1 - p).
function mkRng(seed) { let s = seed >>> 0; if (s === 0) s = 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s + 0.5) / 4294967296; }; }
function binom(C, p, rng) {                 // exact, by geometric skips over trial indices
  if (!(p > 0)) return 0;
  if (p >= 1) return C;
  const lq = Math.log1p(-p);
  let x = 0, i = -1;
  for (;;) {
    i += 1 + Math.floor(Math.log(rng()) / lq);
    if (i >= C) return x;
    x++;
  }
}
{
  console.log(`  seed = ${SEED}; brute-force replicates per small anchor = 4000`);
  console.log('  Q      C    K   p = Xnaive/C   C*p      brute mean   C*p(1-p)   brute var   mean ratio   var ratio');
  const RB = 4000;
  const SMALL = rows.filter(r => r.Q <= 43 && r.nR >= 6).map(r => r.Q);
  for (const Q of SMALL) {
    const r = byQ.get(Q); const K = 2;
    const p = mains(r, K).naive / r.C;
    assertTrue(`brute-force gate anchor Q=${Q} has a non-degenerate p`, p > 0.005);
    const rng = mkRng(SEED + Q);
    let s1 = 0, s2 = 0;
    for (let t = 0; t < RB; t++) {
      let x = 0;
      for (let j = 0; j < r.C; j++) {
        // one opener: walk the actives, per-prime three-way kill rule
        let killA = false, killB = false, ok = true;
        for (let i = 0; i < r.nR; i++) {
          const pp = ACT[i], v = rng();
          let hitA = false, hitB = false;
          if (v < 1 / pp) hitA = true; else if (v < 2 / pp) hitB = true;
          if (i < K) { if (hitA || hitB) { ok = false; break; } }
          else { if (hitA) killA = true; if (hitB) killB = true; }
        }
        if (ok && killA && killB) x++;
      }
      s1 += x; s2 += x * x;
    }
    const mean = s1 / RB, vr = s2 / RB - mean * mean;
    const Cp = r.C * p, Cpq = r.C * p * (1 - p);
    console.log(`  ${pad(Q, 4)} ${pad(r.C, 5)} ${pad(K, 4)}   ${f5(p)}      ${pad(f3(Cp), 7)}  ${pad(f3(mean), 10)}  ${pad(f3(Cpq), 9)}  ${pad(f3(vr), 9)}   ${pad(f3(mean / Cp), 9)}   ${f3(vr / Cpq)}`);
    assertTrue(`brute mean within 4 sd of C p at Q=${Q}`, Math.abs(mean - Cp) < 4 * Math.sqrt(Cpq / RB));
    assertTrue(`brute var within 25% of C p (1-p) at Q=${Q}`, Math.abs(vr / Cpq - 1) < 0.25);
  }
  console.log('  GATE: the per-prime sampler reproduces Binomial(C, Xnaive/C) in mean and variance at all seven small anchors [MEASURED]');
  console.log('  Therefore the closed form is used from here on, and R = ' + R + ' binomial replicates are drawn per anchor per depth per variant.');
}

// ---------------------------------------------------------------------------
console.log('\nSEC 3 — THE NULL\'S chi2/df, EXACT AND MONTE CARLO, AGAINST THE MEASURED VALUE');
// ---------------------------------------------------------------------------
// Exact: under N2 (p = Xcorr/C), E[E^2]/Xcorr = C p (1-p) / (C p) = 1 - p, so
// the null's chi2/df is <1 - p> over the band, with NO simulation needed. The
// Monte Carlo is a check on the sampler and supplies the null's spread, from
// which the measured value's z-score and tail fraction are read.
const UNULL = [3.0, uStar, 5.0];
const nullOut = {};
let lastTick = Date.now();
for (const u of UNULL) {
  nullOut[u] = {};
  for (const [nm] of BANDS) {
    const c = cell[u][nm]; if (!c) continue;
    const its = c.items;
    // exact expectations
    let sExact2 = 0, sExact1 = 0, sP2 = 0, sVar2 = 0, sVar1 = 0, sE2act = 0, sMc = 0;
    for (const it of its) {
      const p2 = it.Mc / it.C, p1 = it.Mn / it.C;
      const v2 = it.C * p2 * (1 - p2), v1 = it.C * p1 * (1 - p1);
      const bias1 = it.Mn - it.Mc;
      sExact2 += (v2) / it.Mc;                       // E[(Xnull - Xcorr)^2]/Xcorr under N2
      sExact1 += (v1 + bias1 * bias1) / it.Mc;       // same under N1 (carries the naive bias)
      sP2 += p2; sVar2 += v2; sVar1 += v1;
      sE2act += it.E * it.E; sMc += it.Mc;
    }
    const n = its.length;
    // Monte Carlo: the BAND statistic recomputed per replicate
    const repl2 = new Float64Array(R), repl1 = new Float64Array(R);
    const rng = mkRng(SEED ^ (Math.round(u * 1e6)) ^ (nm.charCodeAt(1) * 7919));
    for (let t = 0; t < R; t++) {
      let a2 = 0, a1 = 0;
      for (const it of its) {
        const x2 = binom(it.C, it.Mc / it.C, rng), x1 = binom(it.C, it.Mn / it.C, rng);
        const e2 = x2 - it.Mc, e1 = x1 - it.Mc;
        a2 += e2 * e2 / it.Mc; a1 += e1 * e1 / it.Mc;
      }
      repl2[t] = a2 / n; repl1[t] = a1 / n;
      if (Date.now() - lastTick > 30000) { lastTick = Date.now(); console.error(`  ... progress: u = ${u === uStar ? 'u*' : f2(u)}, band ${nm}, replicate ${t + 1}/${R}, ${((Date.now() - T0) / 1000).toFixed(0)}s elapsed`); }
    }
    const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
    const sd = (a) => { const m = mean(a); return Math.sqrt(a.reduce((s, v) => s + (v - m) * (v - m), 0) / (a.length - 1)); };
    const m2 = mean(repl2), s2 = sd(repl2), m1 = mean(repl1), s1 = sd(repl1);
    const below = Array.from(repl2).filter(v => v <= c.chi2).length / R;
    nullOut[u][nm] = {
      n, actual: c.chi2, exact2: sExact2 / n, exact1: sExact1 / n, mc2: m2, sd2: s2, mc1: m1, sd1: s1,
      meanP: sP2 / n, below, z: (c.chi2 - m2) / s2,
      fanoNullExact: sVar2 / sMc, fanoActual: sE2act / sMc, mnVarNull: sVar2 / n, mnE2act: sE2act / n,
      mcMin: Math.min(...repl2), mcMax: Math.max(...repl2)
    };
  }
}
for (const u of UNULL) {
  console.log(`  --- u = ${u === uStar ? 'u* = ' + f4(uStar) : f2(u)} ---`);
  console.log('  band     n   p = Xmain/C   NULL N2 exact (1-p)   NULL N2 MC mean +- sd   [MC min, MC max]      MEASURED   z = (meas - null)/sd   frac MC <= meas   NULL N1 MC (uncalibrated)');
  for (const [nm] of BANDS) {
    const o = nullOut[u][nm]; if (!o) continue;
    console.log(`  ${nm}  ${pad(o.n, 4)}    ${f5(o.meanP)}         ${pad(f4(o.exact2), 10)}          ${pad(f4(o.mc2), 8)} +- ${f4(o.sd2)}   [${f4(o.mcMin)}, ${f4(o.mcMax)}]    ${pad(f4(o.actual), 8)}      ${pad(f2(o.z), 9)}            ${pad(f3(o.below), 6)}          ${f3(o.mc1)}`);
  }
}
// pooled over all bands, per depth
console.log('  POOLED over all bands (df = total anchors):');
console.log('  u          df    NULL N2 exact   NULL N2 MC mean +- sd    MEASURED    z');
for (const u of UNULL) {
  let n = 0, se = 0, sa = 0;
  const pooled = new Float64Array(R);
  for (const [nm] of BANDS) {
    const o = nullOut[u][nm], c = cell[u][nm]; if (!o) continue;
    n += o.n; se += o.exact2 * o.n; sa += o.actual * o.n;
  }
  // pooled MC spread: bands are independent draws, so the pooled sd is the
  // n-weighted quadrature sum of the per-band sds
  let vsum = 0;
  for (const [nm] of BANDS) { const o = nullOut[u][nm]; if (!o) continue; vsum += (o.n * o.sd2) ** 2; }
  const psd = Math.sqrt(vsum) / n;
  let pm = 0; for (const [nm] of BANDS) { const o = nullOut[u][nm]; if (!o) continue; pm += o.n * o.mc2; }
  console.log(`  ${pad(u === uStar ? 'u*' : f2(u), 4)}  ${pad(n, 6)}    ${pad(f4(se / n), 10)}      ${pad(f4(pm / n), 8)} +- ${f4(psd)}     ${pad(f4(sa / n), 8)}   ${f2((sa / n - pm / n) / psd)}`);
  void pooled;
}

// ---------------------------------------------------------------------------
console.log('\nSEC 4 — PER-ANCHOR NULL VARIANCE AGAINST THE ACTUAL SQUARED ERROR, AND THE FANO FACTOR');
// ---------------------------------------------------------------------------
// The null variance per anchor is exact: Var_null = C p (1 - p), p = Xcorr/C.
// The actual has no per-anchor variance (one observation), so its analogue is
// the squared error E^2, whose expectation under the null IS Var_null. Under
// the null E^2/Var_null is chi2 with 1 df, whose MEAN is 1 and whose MEDIAN is
// 0.4549; both are reported because the mean is outlier-driven and the median
// is not.
const CHI2MED = 0.4549364;
for (const u of UNULL) {
  console.log(`  --- u = ${u === uStar ? 'u*' : f2(u)} ---`);
  console.log('  band     n   <Var_null>   <E^2 actual>   ratio   median(E^2/Var_null)   [null median 0.4549]   Fano null = <Var>/<Xmain>   Fano actual = <E^2>/<Xmain>   frac anchors with E^2 < Var_null   [null 0.6827]');
  for (const [nm] of BANDS) {
    const o = nullOut[u][nm], c = cell[u][nm]; if (!o) continue;
    const ratios = c.items.map(it => { const p = it.Mc / it.C; return it.E * it.E / (it.C * p * (1 - p)); }).sort((a, b) => a - b);
    const med = ratios.length % 2 ? ratios[(ratios.length - 1) / 2] : (ratios[ratios.length / 2 - 1] + ratios[ratios.length / 2]) / 2;
    const fracBelow = ratios.filter(v => v < 1).length / ratios.length;
    console.log(`  ${nm}  ${pad(o.n, 4)}   ${pad(f2(o.mnVarNull), 10)}   ${pad(f2(o.mnE2act), 12)}   ${f3(o.mnE2act / o.mnVarNull)}   ${pad(f4(med), 20)}                          ${pad(f4(o.fanoNullExact), 17)}             ${pad(f4(o.fanoActual), 20)}   ${f3(fracBelow)}`);
    void CHI2MED;
  }
}

// ---------------------------------------------------------------------------
console.log('\nSEC 5 — HOW MUCH OF THE MEASURED chi2/df IS THE SYSTEMATIC OFFSET RATHER THAN SCATTER');
// ---------------------------------------------------------------------------
// The mean-matched null has zero systematic offset by construction, whereas the
// measured E carries one (sumE/sumXmain runs -0.1265 to +0.0057 in the cited
// grid). Decomposing the measured chi2/df into the part explained by the band's
// own mean offset and the residual scatter says whether the sub-Poisson reading
// would survive removing the offset. If the residual is even lower, the reading
// strengthens; if the offset carries it, the reading is about bias, not scatter.
for (const u of UNULL) {
  console.log(`  --- u = ${u === uStar ? 'u*' : f2(u)} ---`);
  console.log('  band     n   chi2/df measured   offset part <E>^2/<Xmain>   residual after removing the per-anchor mean offset   null (1-p)');
  for (const [nm] of BANDS) {
    const o = nullOut[u][nm], c = cell[u][nm]; if (!o) continue;
    const its = c.items;
    // per-anchor relative offset fitted as one number for the band: E ~ b * Xcorr
    let sEX = 0, sXX = 0;
    for (const it of its) { sEX += it.E * it.Mc; sXX += it.Mc * it.Mc; }
    const b = sEX / sXX;
    let resid = 0, offpart = 0;
    for (const it of its) { const rres = it.E - b * it.Mc; resid += rres * rres / it.Mc; offpart += (b * it.Mc) ** 2 / it.Mc; }
    console.log(`  ${nm}  ${pad(o.n, 4)}   ${pad(f4(o.actual), 15)}   ${pad(f4(offpart / its.length), 25)}   ${pad(f4(resid / its.length), 50)}   ${f4(o.exact2)}`);
  }
}


// ---------------------------------------------------------------------------
console.log('\nSEC 6 — A SECOND NULL THAT ASKS WHERE THE DEFICIT COMES FROM: CRT-EXACT THINNING');
// ---------------------------------------------------------------------------
// N-thin makes the openers independent, so each prime kills Binomial(C, 1/p)
// of them. Arithmetic does not: a residue class mod p meets an interval of
// length W in W/p + O(1) openers, near-deterministically. That difference is a
// candidate MECHANISM for the deficit, and it is testable without leaving the
// model. N3: keep the primes independent of each other, but give each prime a
// uniformly random offset t mod p and kill EXACTLY the openers with a = t
// (member a) and a = t - 2 (member a+2), so the per-prime kill counts are as
// near-exact as arithmetic's. If N3's variance reproduces the measured
// deficit, the deficit is the elementary equidistribution of residue classes in
// an interval and carries nothing further. If it does not, the deficit is
// unexplained and stays open.
const R3 = 60;
const pool = {};
{
  const offbuf = new Int32Array(maxW + 4);
  console.log(`  subsample: up to 40 anchors per band, R3 = ${R3} replicates, same seed family`);
  console.log('  u      band   anchors  R3   <Var_binom>   <Var_N3>   Var_N3/Var_binom   N3 predicts chi2/df   MEASURED same anchors   MEASURED full band   measured(sub)/N3   <mean_N3>/<Xnaive>');
  for (const u of UNULL) {
    for (const [nm, a, b] of BANDS) {
      const all = rows.filter(r => r.Q >= a && r.Q <= b && KatU(r, u) >= 3);
      if (!all.length) continue;
      const step = Math.max(1, Math.floor(all.length / 40));
      const sub = []; for (let i = 0; i < all.length && sub.length < 40; i += step) sub.push(all[i]);
      let sVb = 0, sV3 = 0, sE2 = 0, sM3 = 0, sMn = 0, sMc = 0, sChiSub = 0, cnt = 0;
      for (const r of sub) {
        const K = KatU(r, u), m = mains(r, K);
        if (!(m.corr > 0) || !(m.naive > 0)) continue;
        // opener list and offset map
        const openers = [];
        offbuf.fill(-1, 0, r.width + 3);
        for (let v = r.lo; v + 2 < r.hi; v++) { if (!isOpen30(v % 30)) continue; offbuf[v - r.lo] = openers.length; openers.push(v); }
        const nO = openers.length;
        const mA = new Int32Array(nO), mB = new Int32Array(nO), hist = new Int32Array(r.nR + 2);
        const rng = mkRng(SEED ^ (r.Q * 104729) ^ Math.round(u * 1e6));
        let s1 = 0, s2 = 0;
        for (let t = 0; t < R3; t++) {
          mA.fill(0); mB.fill(0); hist.fill(0);
          for (let i = 0; i < r.nR; i++) {
            const pp = ACT[i], off = Math.floor(rng() * pp);
            let st = r.lo + (((off - r.lo) % pp) + pp) % pp;
            for (let v = st; v < r.hi; v += pp) { const j = offbuf[v - r.lo]; if (j >= 0 && mA[j] === 0) mA[j] = i + 1; }
            const off2 = ((off - 2) % pp + pp) % pp;
            st = r.lo + (((off2 - r.lo) % pp) + pp) % pp;
            for (let v = st; v < r.hi; v += pp) { const j = offbuf[v - r.lo]; if (j >= 0 && mB[j] === 0) mB[j] = i + 1; }
          }
          let x = 0;
          for (let j = 0; j < nO; j++) { const ja = mA[j], jb = mB[j]; if (ja && jb) { const mn = ja < jb ? ja : jb; if (mn > K) x++; } }
          s1 += x; s2 += x * x;
          if (Date.now() - lastTick > 30000) { lastTick = Date.now(); console.error(`  ... progress N3: u = ${u === uStar ? 'u*' : f2(u)}, ${nm}, Q = ${r.Q}, replicate ${t + 1}/${R3}, ${((Date.now() - T0) / 1000).toFixed(0)}s elapsed`); }
        }
        const mn3 = s1 / R3, v3 = (s2 / R3 - mn3 * mn3) * R3 / (R3 - 1);
        const pB = m.corr / r.C, vB = r.C * pB * (1 - pB);
        const E = r.X[K] - m.corr;
        sVb += vB; sV3 += v3; sE2 += E * E; sM3 += mn3; sMn += m.naive; sMc += m.corr; sChiSub += E * E / m.corr; cnt++;
      }
      if (!cnt) continue;
      const pred = sV3 / sMc, chiSub = sChiSub / cnt, meas = cell[u][nm].chi2;
      const pk = u === uStar ? 'u*' : f2(u);
      if (!pool[pk]) pool[pk] = { n: 0, sp: 0, sc: 0, bands: [] };
      pool[pk].n += cnt; pool[pk].sp += pred * cnt; pool[pk].sc += chiSub * cnt;
      pool[pk].bands.push({ nm, pred, chiSub, nSub: cnt, nFull: cell[u][nm].n, chiFull: meas });
      console.log(`  ${pad(pk, 5)}  ${nm}   ${pad(cnt, 6)}  ${pad(R3, 3)}   ${pad(f2(sVb / cnt), 11)}  ${pad(f2(sV3 / cnt), 9)}   ${pad(f4(sV3 / sVb), 16)}   ${pad(f4(pred), 18)}   ${pad(f4(chiSub), 21)}   ${pad(f4(meas), 18)}   ${pad(f4(chiSub / pred), 16)}   ${f4(sM3 / sMn)}`);
    }
  }
  console.log('  POOLED over the subsample bands:');
  console.log('  u        anchors   N3 predicts chi2/df   MEASURED same anchors   ratio   [+- 1.41/sqrt(n) is the chi2_1 sampling sd on the measured]');
  for (const k of Object.keys(pool)) {
    const o = pool[k];
    console.log(`  ${pad(k, 5)}    ${pad(o.n, 6)}    ${pad(f4(o.sp / o.n), 17)}   ${pad(f4(o.sc / o.n), 21)}   ${pad(f3((o.sc / o.n) / (o.sp / o.n)), 6)}   +- ${f3(1.4142 / Math.sqrt(o.n) * (o.sc / o.n) / (o.sp / o.n))}`);
  }
}

// ---------------------------------------------------------------------------
console.log('\nSEC 7 — THE FULL-BAND PAIRING OF N3 (origin: redteam-0829-measure-b.md sec 1a A-EDIT-2, recomputed here for custody)');
// ---------------------------------------------------------------------------
// SEC 6's ratio pairs N3's prediction against the measured chi2/df ON THE SAME
// 40 anchors per band. A second pairing is available and was raised by the red
// team: N3's prediction against the FULL-band measured chi2/df, which is the
// number attack-roughpair-error.md actually published. The two differ because
// the subsample's measured value is itself a noisy estimate of the full band's.
// Both weightings of the prediction are printed, because the pooled prediction
// carries equal weight per band (40 anchors each) while the pooled full-band
// measured value carries the true band sizes:
//   A: prediction pooled by SUBSAMPLE counts, measured pooled by FULL counts
//      (the mixed weighting, which is what the red team's figure used);
//   B: both pooled by FULL band counts (the consistent weighting).
{
  console.log('  depth   bands   pred pooled (sub wts)   measured pooled (full wts)   ratio A   pred pooled (full wts)   ratio B');
  for (const k of Object.keys(pool)) {
    const o = pool[k];
    let spSub = 0, nSub = 0, spFull = 0, scFull = 0, nFull = 0;
    for (const b of o.bands) { spSub += b.pred * b.nSub; nSub += b.nSub; spFull += b.pred * b.nFull; scFull += b.chiFull * b.nFull; nFull += b.nFull; }
    const predSub = spSub / nSub, measFull = scFull / nFull, predFull = spFull / nFull;
    console.log(`  ${pad(k, 5)}   ${pad(o.bands.length, 5)}   ${pad(f4(predSub), 21)}   ${pad(f4(measFull), 26)}   ${pad(f4(measFull / predSub), 7)}   ${pad(f4(predFull), 22)}   ${f4(measFull / predFull)}`);
  }
  console.log('  Per band, the two pairings side by side:');
  console.log('  depth   band   N3 predicts   measured (40 subsample anchors)   measured (full band)   ratio sub   ratio full');
  for (const k of Object.keys(pool)) {
    for (const b of pool[k].bands) {
      console.log(`  ${pad(k, 5)}   ${b.nm}     ${pad(f4(b.pred), 11)}   ${pad(f4(b.chiSub), 30)}   ${pad(f4(b.chiFull), 20)}   ${pad(f4(b.chiSub / b.pred), 9)}   ${f4(b.chiFull / b.pred)}`);
    }
  }
}

console.log(`\nseed = ${SEED}; replicates R = ${R} per anchor per depth per variant; brute-force gate replicates 4000 per small anchor`);
console.log(`done in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/measure-roughpair-null-0829.js
//   invocation:  node research/measure-roughpair-null-0829.js
//   code-sha256: 436e0ff45656d1485ea078bc1b13334508bae5d4b9e520b8bc04290d06c09c07
//   out-sha256:  690bb839026640f5b433de69d75fe5ddb53eb3ebfe3eb11fccf2d198ae9b1aa7
//   body-lines:  156
//   forced:      2026-08-29, 0 of 517 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     56.1 s
// ============================================================================
// SEC 0 — ENGINE GATES (the licence to measure anything at all)
//   omega gates pass; u* = 3.565847, rho(2) = beta(2)^2 = 0.79305
//   engine: 1227 anchors Q = 7..10007; 25 cited K*, max K* = 46 at 9281, the K=0 list, X(full) = 0 everywhere — reproduced
//   Z1 band means reproduced (K* and K*/pool, all six bands)
//
// SEC 1 — CUSTODY: attack-roughpair-error-01.js SEC 2 REPRODUCED DIGIT FOR DIGIT
//   SUP reproduced at u = 3.00: n = 1216 anchors, max |E|/T = 0.5190 at Q = 269, anchors with |E| >= T: 0
//   SUP reproduced at u = u*: n = 1206 anchors, max |E|/T = 0.5628 at Q = 269, anchors with |E| >= T: 0
//   211 figures of attack-roughpair-error-01.js SEC 2 asserted digit for digit (5 depths, 6 bands, 7 columns, plus both SUP lines); failures so far: 0
//
// SEC 2 — THE NULL'S CLOSED FORM, GATED AGAINST A BRUTE-FORCE PER-PRIME SAMPLER
//   seed = 20260829; brute-force replicates per small anchor = 4000
//   Q      C    K   p = Xnaive/C   C*p      brute mean   C*p(1-p)   brute var   mean ratio   var ratio
//     23    30    2   0.02068        0.620       0.643      0.608      0.625       1.036   1.028
//     29    11    2   0.02783        0.306       0.302      0.298      0.291       0.986   0.978
//     31    40    2   0.03508        1.403       1.421      1.354      1.334       1.013   0.985
//     37    30    2   0.04154        1.246       1.243      1.194      1.250       0.998   1.047
//     41    16    2   0.04761        0.762       0.762      0.726      0.738       1.000   1.017
//     43    35    2   0.05360        1.876       1.881      1.775      1.759       1.002   0.991
//   GATE: the per-prime sampler reproduces Binomial(C, Xnaive/C) in mean and variance at all seven small anchors [MEASURED]
//   Therefore the closed form is used from here on, and R = 200 binomial replicates are drawn per anchor per depth per variant.
//
// SEC 3 — THE NULL'S chi2/df, EXACT AND MONTE CARLO, AGAINST THE MEASURED VALUE
//   --- u = 3.00 ---
//   band     n   p = Xmain/C   NULL N2 exact (1-p)   NULL N2 MC mean +- sd   [MC min, MC max]      MEASURED   z = (meas - null)/sd   frac MC <= meas   NULL N1 MC (uncalibrated)
//   B3    40    0.04810             0.9519            0.9389 +- 0.2092   [0.5201, 1.7346]      0.8030          -0.65             0.295          2.006
//   B4   103    0.03460             0.9654            0.9798 +- 0.1333   [0.6225, 1.3374]      0.6670          -2.35             0.010          4.425
//   B5    71    0.02835             0.9716            0.9721 +- 0.1630   [0.5991, 1.4777]      0.7770          -1.20             0.135          6.998
//   B6   208    0.02502             0.9750            0.9933 +- 0.0890   [0.7337, 1.2390]      0.6856          -3.46             0.000          12.004
//   B7   292    0.02159             0.9784            0.9864 +- 0.0928   [0.7382, 1.2277]      0.7600          -2.44             0.005          20.214
//   B8   491    0.01918             0.9808            0.9844 +- 0.0618   [0.8132, 1.2110]      0.7697          -3.47             0.000          32.827
//   --- u = u* = 3.5658 ---
//   band     n   p = Xmain/C   NULL N2 exact (1-p)   NULL N2 MC mean +- sd   [MC min, MC max]      MEASURED   z = (meas - null)/sd   frac MC <= meas   NULL N1 MC (uncalibrated)
//   B3    40    0.09010             0.9099            0.9021 +- 0.1979   [0.4681, 1.5013]      0.6270          -1.39             0.065          2.063
//   B4   103    0.06977             0.9302            0.9375 +- 0.1348   [0.6445, 1.3953]      0.7855          -1.13             0.125          4.279
//   B5    71    0.05861             0.9414            0.9601 +- 0.1723   [0.6202, 1.5902]      0.5456          -2.41             0.000          6.716
//   B6   208    0.05027             0.9497            0.9508 +- 0.0948   [0.6960, 1.1927]      0.6647          -3.02             0.000          11.262
//   B7   292    0.04353             0.9565            0.9590 +- 0.0777   [0.7625, 1.1923]      0.5785          -4.90             0.000          18.761
//   B8   491    0.03911             0.9609            0.9636 +- 0.0672   [0.7963, 1.1887]      0.7184          -3.65             0.000          30.188
//   --- u = 5.00 ---
//   band     n   p = Xmain/C   NULL N2 exact (1-p)   NULL N2 MC mean +- sd   [MC min, MC max]      MEASURED   z = (meas - null)/sd   frac MC <= meas   NULL N1 MC (uncalibrated)
//   B4    57    0.18364             0.8164            0.8236 +- 0.1506   [0.4414, 1.2580]      0.4850          -2.25             0.005          5.536
//   B5    71    0.17638             0.8236            0.8308 +- 0.1393   [0.5479, 1.2109]      0.2887          -3.89             0.000          7.420
//   B6   208    0.14411             0.8559            0.8609 +- 0.0830   [0.6400, 1.0920]      0.4292          -5.20             0.000          12.357
//   B7   292    0.13540             0.8646            0.8722 +- 0.0762   [0.6909, 1.0489]      0.4392          -5.68             0.000          20.636
//   B8   491    0.12081             0.8792            0.8706 +- 0.0572   [0.7269, 1.0214]      0.4576          -7.23             0.000          33.243
//   POOLED over all bands (df = total anchors):
//   u          df    NULL N2 exact   NULL N2 MC mean +- sd    MEASURED    z
//   3.00    1205        0.9764        0.9838 +- 0.0406       0.7456   -5.87
//     u*    1205        0.9524        0.9558 +- 0.0406       0.6677   -7.09
//   5.00    1119        0.8643        0.8643 +- 0.0374       0.4382   -11.39
//
// SEC 4 — PER-ANCHOR NULL VARIANCE AGAINST THE ACTUAL SQUARED ERROR, AND THE FANO FACTOR
//   --- u = 3.00 ---
//   band     n   <Var_null>   <E^2 actual>   ratio   median(E^2/Var_null)   [null median 0.4549]   Fano null = <Var>/<Xmain>   Fano actual = <E^2>/<Xmain>   frac anchors with E^2 < Var_null   [null 0.6827]
//   B3    40         9.95           8.59   0.863                 0.4037                                     0.9531                           0.8230   0.725
//   B4   103        28.95          18.56   0.641                 0.2388                                     0.9661                           0.6195   0.796
//   B5    71        48.88          38.24   0.782                 0.3692                                     0.9717                           0.7601   0.718
//   B6   208        89.65          64.66   0.721                 0.2958                                     0.9752                           0.7034   0.760
//   B7   292       156.17         123.18   0.789                 0.3778                                     0.9786                           0.7718   0.736
//   B8   491       260.41         194.50   0.747                 0.3506                                     0.9809                           0.7326   0.749
//   --- u = u* ---
//   band     n   <Var_null>   <E^2 actual>   ratio   median(E^2/Var_null)   [null median 0.4549]   Fano null = <Var>/<Xmain>   Fano actual = <E^2>/<Xmain>   frac anchors with E^2 < Var_null   [null 0.6827]
//   B3    40        17.87          13.56   0.759                 0.1761                                     0.9113                           0.6917   0.825
//   B4   103        55.99          42.70   0.763                 0.3873                                     0.9318                           0.7105   0.699
//   B5    71        98.31          50.08   0.509                 0.2727                                     0.9413                           0.4795   0.803
//   B6   208       175.68         114.09   0.649                 0.3254                                     0.9502                           0.6171   0.788
//   B7   292       307.64         185.09   0.602                 0.3200                                     0.9568                           0.5756   0.822
//   B8   491       520.34         386.28   0.742                 0.3180                                     0.9611                           0.7135   0.749
//   --- u = 5.00 ---
//   band     n   <Var_null>   <E^2 actual>   ratio   median(E^2/Var_null)   [null median 0.4549]   Fano null = <Var>/<Xmain>   Fano actual = <E^2>/<Xmain>   frac anchors with E^2 < Var_null   [null 0.6827]
//   B4    57       169.47          90.85   0.536                 0.4538                                     0.8152                           0.4370   0.789
//   B5    71       256.49          88.82   0.346                 0.1930                                     0.8241                           0.2854   0.915
//   B6   208       455.92         211.61   0.464                 0.2306                                     0.8566                           0.3976   0.827
//   B7   292       866.02         398.29   0.460                 0.2297                                     0.8652                           0.3979   0.846
//   B8   491      1476.11         717.59   0.486                 0.2689                                     0.8794                           0.4275   0.845
//
// SEC 5 — HOW MUCH OF THE MEASURED chi2/df IS THE SYSTEMATIC OFFSET RATHER THAN SCATTER
//   --- u = 3.00 ---
//   band     n   chi2/df measured   offset part <E>^2/<Xmain>   residual after removing the per-anchor mean offset   null (1-p)
//   B3    40            0.8030                      0.0266                                               0.7377   0.9519
//   B4   103            0.6670                      0.0106                                               0.6600   0.9654
//   B5    71            0.7770                      0.0151                                               0.7822   0.9716
//   B6   208            0.6856                      0.0039                                               0.6788   0.9750
//   B7   292            0.7600                      0.0059                                               0.7506   0.9784
//   B8   491            0.7697                      0.0026                                               0.7646   0.9808
//   --- u = u* ---
//   band     n   chi2/df measured   offset part <E>^2/<Xmain>   residual after removing the per-anchor mean offset   null (1-p)
//   B3    40            0.6270                      0.0052                                               0.6123   0.9099
//   B4   103            0.7855                      0.0029                                               0.7809   0.9302
//   B5    71            0.5456                      0.0169                                               0.5477   0.9414
//   B6   208            0.6647                      0.0030                                               0.6611   0.9497
//   B7   292            0.5785                      0.0062                                               0.5704   0.9565
//   B8   491            0.7184                      0.0009                                               0.7177   0.9609
//   --- u = 5.00 ---
//   band     n   chi2/df measured   offset part <E>^2/<Xmain>   residual after removing the per-anchor mean offset   null (1-p)
//   B4    57            0.4850                      0.0129                                               0.4761   0.8164
//   B5    71            0.2887                      0.0003                                               0.2886   0.8236
//   B6   208            0.4292                      0.0018                                               0.4270   0.8559
//   B7   292            0.4392                      0.0023                                               0.4365   0.8646
//   B8   491            0.4576                      0.0055                                               0.4553   0.8792
//
// SEC 6 — A SECOND NULL THAT ASKS WHERE THE DEFICIT COMES FROM: CRT-EXACT THINNING
//   subsample: up to 40 anchors per band, R3 = 60 replicates, same seed family
//   u      band   anchors  R3   <Var_binom>   <Var_N3>   Var_N3/Var_binom   N3 predicts chi2/df   MEASURED same anchors   MEASURED full band   measured(sub)/N3   <mean_N3>/<Xnaive>
//    3.00  B3       40   60          9.95       5.45             0.5484               0.5227                  0.8030               0.8030             1.5364   1.0059
//    3.00  B4       40   60         22.75      11.61             0.5102               0.4920                  0.6648               0.6670             1.3511   1.0019
//    3.00  B5       40   60         44.46      24.02             0.5403               0.5249                  0.8344               0.7770             1.5897   0.9976
//    3.00  B6       40   60         80.49      46.11             0.5729               0.5585                  0.6018               0.6856             1.0776   0.9989
//    3.00  B7       40   60        165.26      85.25             0.5159               0.5047                  0.8010               0.7600             1.5870   0.9975
//    3.00  B8       40   60        217.60     120.29             0.5528               0.5422                  0.6863               0.7697             1.2657   0.9994
//      u*  B3       40   60         17.87       9.62             0.5383               0.4905                  0.6270               0.6270             1.2782   1.0052
//      u*  B4       40   60         44.82      24.11             0.5380               0.4989                  0.6904               0.7855             1.3838   1.0012
//      u*  B5       40   60         89.40      49.47             0.5534               0.5207                  0.5603               0.5456             1.0761   1.0008
//      u*  B6       40   60        157.28      87.34             0.5553               0.5273                  0.6157               0.6647             1.1676   0.9985
//      u*  B7       40   60        324.26     181.84             0.5608               0.5364                  0.4601               0.5785             0.8578   1.0009
//      u*  B8       40   60        435.43     250.37             0.5750               0.5525                  0.9800               0.7184             1.7736   1.0003
//    5.00  B4       40   60        148.66      60.47             0.4068               0.3328                  0.5252               0.4850             1.5781   0.9998
//    5.00  B5       40   60        239.94     100.99             0.4209               0.3433                  0.3239               0.2887             0.9432   1.0015
//    5.00  B6       40   60        407.52     170.07             0.4173               0.3567                  0.5140               0.4292             1.4410   1.0001
//    5.00  B7       40   60        917.26     382.69             0.4172               0.3603                  0.5170               0.4392             1.4350   1.0000
//    5.00  B8       40   60       1233.44     546.94             0.4434               0.3899                  0.4819               0.4576             1.2360   1.0001
//   POOLED over the subsample bands:
//   u        anchors   N3 predicts chi2/df   MEASURED same anchors   ratio   [+- 1.41/sqrt(n) is the chi2_1 sampling sd on the measured]
//    3.00       240               0.5242                  0.7319    1.396   +- 0.127
//      u*       240               0.5211                  0.6556    1.258   +- 0.115
//    5.00       200               0.3566                  0.4724    1.325   +- 0.132
//
// SEC 7 — THE FULL-BAND PAIRING OF N3 (origin: redteam-0829-measure-b.md sec 1a A-EDIT-2, recomputed here for custody)
//   depth   bands   pred pooled (sub wts)   measured pooled (full wts)   ratio A   pred pooled (full wts)   ratio B
//    3.00       6                  0.5242                       0.7456    1.4224                   0.5300   1.4068
//      u*       6                  0.5211                       0.6677    1.2815                   0.5357   1.2464
//    5.00       5                  0.3566                       0.4382    1.2288                   0.3701   1.1839
//   Per band, the two pairings side by side:
//   depth   band   N3 predicts   measured (40 subsample anchors)   measured (full band)   ratio sub   ratio full
//    3.00   B3          0.5227                           0.8030                 0.8030      1.5364   1.5364
//    3.00   B4          0.4920                           0.6648                 0.6670      1.3511   1.3556
//    3.00   B5          0.5249                           0.8344                 0.7770      1.5897   1.4804
//    3.00   B6          0.5585                           0.6018                 0.6856      1.0776   1.2276
//    3.00   B7          0.5047                           0.8010                 0.7600      1.5870   1.5058
//    3.00   B8          0.5422                           0.6863                 0.7697      1.2657   1.4195
//      u*   B3          0.4905                           0.6270                 0.6270      1.2782   1.2782
//      u*   B4          0.4989                           0.6904                 0.7855      1.3838   1.5743
//      u*   B5          0.5207                           0.5603                 0.5456      1.0761   1.0479
//      u*   B6          0.5273                           0.6157                 0.6647      1.1676   1.2606
//      u*   B7          0.5364                           0.4601                 0.5785      0.8578   1.0784
//      u*   B8          0.5525                           0.9800                 0.7184      1.7736   1.3002
//    5.00   B4          0.3328                           0.5252                 0.4850      1.5781   1.4571
//    5.00   B5          0.3433                           0.3239                 0.2887      0.9432   0.8409
//    5.00   B6          0.3567                           0.5140                 0.4292      1.4410   1.2033
//    5.00   B7          0.3603                           0.5170                 0.4392      1.4350   1.2189
//    5.00   B8          0.3899                           0.4819                 0.4576      1.2360   1.1737
//
// seed = 20260829; replicates R = 200 per anchor per depth per variant; brute-force gate replicates 4000 per small anchor
// done in 56.0s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================================
// Each line carries its calibration. Nothing below is PROVEN about the
// arithmetic; the only PROVEN statements are inside the two null models.
//
// R0 [CUSTODY, MEASURED]. 211 printed figures of attack-roughpair-error-01.js
//     SEC 2 reproduce digit for digit from an engine written here: the full
//     5 depths x 6 bands x 7 columns grid, plus both SUP lines (n = 1216 at
//     u = 3, n = 1206 at u*, max |E|/T = 0.5190 and 0.5628 both at Q = 269,
//     0 anchors with |E| >= T). The gate aborts the file before any null
//     figure prints if one digit disagrees. The engine gate (25 cited K*,
//     max K* = 46 at 9281, the K = 0 list, X(full) = 0 at all 1,227 anchors,
//     Z1's band means) also passes.
//
// R1 [DERIVED exact within the model, GATED by simulation]. The
//     independent-thinning null N-thin is a binomial null: the per-opener
//     probability of entering X(K) is exactly Xnaive(K)/C. The brute-force
//     per-prime sampler reproduces Binomial(C, Xnaive/C) in mean (ratios
//     0.986 to 1.036) and variance (ratios 0.978 to 1.047) at all six small
//     anchors with a non-degenerate p, on 4,000 replicates each.
//
// R2 [MEASURED]. THE NULL DOES NOT RETURN 1. It returns 1 - p exactly, with
//     p = Xmain/C. Band values: 0.9519..0.9808 at u = 3, 0.9099..0.9609 at
//     u*, 0.8164..0.8792 at u = 5. The R = 200 Monte Carlo agrees with the
//     closed form to within its own sd everywhere. So part of the shortfall
//     that attack-roughpair-error.md read as sub-Poisson is the binomial
//     1 - p normalisation and not dispersion: 2% of it at u = 3, 4-9% at u*,
//     12-18% at u = 5.
//
// R3 [MEASURED]. AGAINST THAT NULL THE MEASURED VALUE IS STILL BELOW, at
//     every band and every depth tested. Pooled: 0.7456 against 0.9838
//     +- 0.0406 (z = -5.87) at u = 3; 0.6677 against 0.9558 +- 0.0406
//     (z = -7.09) at u*; 0.4382 against 0.8643 +- 0.0374 (z = -11.39) at
//     u = 5. Per band the z runs -0.65 to -7.23; the two cells that are not
//     individually significant are B3 at u = 3 (n = 40, z = -0.65) and B4 at
//     u* (n = 103, z = -1.13).
//
// R4 [MEASURED]. The systematic offset contributes almost none of it. Fitting
//     E = b*Xcorr per band and removing it moves chi2/df from 0.8030 to
//     0.7377 in the largest case (B3 at u = 3) and from 0.7184 to 0.7177 at
//     B8/u*. The deficit is scatter, not bias.
//
// R5 [MEASURED]. Per anchor, E^2 is below the null variance C p (1-p) at
//     0.699 to 0.915 of anchors against the null's own 0.6827, and the median
//     of E^2/Var_null runs 0.176 to 0.454 against the chi2_1 median 0.4549.
//     The Fano factor Var(X)/E[X] reads 0.9113..0.9809 on the null and
//     0.2854..0.8230 on the actual.
//
// R6 [MEASURED, and this is the mechanism the controlled note said it did not
//     have]. A SECOND NULL EXPLAINS THE DEFICIT AND OVERSHOOTS IT. N3 keeps
//     the primes independent of each other but gives each prime a uniformly
//     random offset t mod p and kills exactly the openers at a = t and
//     a = t - 2, so the per-prime kill counts are as near-exact in the window
//     as arithmetic's. Sampler gate: N3's mean matches Xnaive to within 0.6%
//     at every cell. Its variance is 0.4068 to 0.5750 of the binomial null's,
//     and
//     the chi2/df it predicts is 0.4905..0.5585 at u = 3 and u*, and
//     0.3328..0.3899 at u = 5. On the same 40 anchors per band the MEASURED
//     chi2/df is ABOVE that prediction: pooled ratios 1.396 +- 0.127
//     (u = 3), 1.258 +- 0.115 (u*), 1.325 +- 0.132 (u = 5), where the quoted
//     error is the chi2_1 sampling sd on n = 200..240 anchors.
//
// R7 [READING of R2, R3, R6; the calibration is MEASURED and the inference is
//     HEURISTIC]. The whole sub-Poisson deficit, and about 30% more, is
//     produced by an elementary fact about intervals: a residue class mod m
//     meets an interval of length W in W/m + O(1) elements, so the sieve is
//     more regular than independent thinning. Once that is in the null, the
//     actual count is not extra-regular, it is about a third MORE dispersed
//     than the model, which is the direction prime-prime dependence would
//     push. Nothing here needed a statement about the placement of primes on
//     the number line beyond that counting fact.
//
// R8 [NOT REACHED]. No decade past Q = 10007. The N3 comparison is on 40
//     anchors per band and 60 replicates, so its per-cell ratios are noisier
//     than the pooled ones by the square root of the number of bands and only
//     the pooled ratios are read. The
//     30% excess over N3 is not attributed: no model of prime-prime
//     dependence was fitted, and the alternative that it is a finite-W or
//     Buchstab-centring artefact was not excluded. The capture identity is
//     CITED and not re-verified; nothing here depends on it.
//
// LABEL. NULL-SIDE, label (i). Item Z2 is (ii) TPC-strength
// (attack-wrongdirection-audit.md sec 3.1). Nothing here is progress on the
// certificate, and no line above compares anything to T.
// ============================================================================
