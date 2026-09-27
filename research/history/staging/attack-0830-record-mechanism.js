// ============================================================================
// A MECHANISM ATTACK ON THE RESIDUAL OF KOURBATOV'S b (TODO Z5, 2026-08-30)
// ============================================================================
// THE QUESTION. `measure-record-null2-0829.md` §4 leaves 0.78 to 0.97 of
// Kourbatov's finite-height shortfall coefficient b unexplained after the two
// nulls it ran (inhomogeneous intensity, the 6Z lattice). This file runs three
// candidate mechanisms, each pre-registered in
// `research/history/staging/attack-0830-record-mechanism.md` §2 BEFORE this file
// existed, as replacements of the null's exponential gap law, on the same two
// seeded uniform streams so that every delta is PAIRED against the N0e
// baseline of the predecessor:
//   (i)   sub-Poisson dispersion, transported through a gamma family and a
//         shifted-exponential family at four values of CV^2 (the tile's
//         period-wide 0.5285; the height 0.93 read from zone-tail-02's R;
//         the tail field's 0.986; and CV^2(x) = a_c(x)/abar(x), Kourbatov-
//         Wolf's own lower-trend scale);
//   (ii)  the tile's exact @31 gap law (gap-spectrum-01.js's embedded tail
//         table, parsed from that file at runtime), rescaled to mean abar;
//   (ii') the twin-prime gap law AT HEIGHT, from a NEW segmented sieve, in
//         units of abar at each gap's own start, by decade of height;
//   (iii) Kourbatov-Wolf 2019 §2.3.2's k = 1 bin-count criterion transported
//         to k = 2, and the trend-swap composition term, both arithmetic.
//
// HONEST DOUBT, WRITTEN BEFORE THE RUN. (1) Every candidate is a model of a
// gap law the corpus cannot derive; a landing is a fit, not a mechanism.
// (2) Two of the candidates are registered to OVERSHOOT by 3 to 10x, and a
// run that confirms an overshoot closes a route without opening one. (3) The
// height law of (ii') is measured at one decade and applied at all heights in
// abar units; that stationarity is a hypothesis this file cannot test above
// 1e11. (4) The whole comparison is against a conjectural null (nothing in
// Kourbatov-Wolf is a theorem; `zonegap-prior-art.md` §1).
//
// SCOPE, category (i). Null-side calibration of a record statistic. Nothing
// here is a statement about T, about the tile's G2 exponent, or about the Zone
// Postulate; Z5 is off the exponent's critical path.
//
// CUSTODY. The ladder arrays are extracted from `research/a113274-gap-records.js`
// at runtime; the tile tail table from `research/gap-spectrum-01.js`'s embedded
// block at runtime; S1 gates on reproducing the predecessor's data b values and
// its N0e null at the same seeds before any new number is printed. The sieve's
// running maxima are checked against the ladder at every decade end.
//
// Run it:
//   node research/qc/embed.js --timeout 3600 research/history/staging/attack-0830-record-mechanism.js
// Progress and timings go to stderr ONLY; stdout carries no wall-clock figure.
// ============================================================================
'use strict';
const fs = require('fs'), path = require('path');
const T0 = Date.now();
const C2HL = 0.6601618158468696;              // Hardy-Littlewood C_2
const EULER = 0.5772156649015329;
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const sd = (a) => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) * (x - m)))); };
const med = (a) => { const b = a.slice().sort((x, y) => x - y), n = b.length;
                     return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };
const log = (s) => console.log(s);
const prog = (s) => process.stderr.write('[' + ((Date.now() - T0) / 1000).toFixed(0) + 's] ' + s + '\n');
const fail = (s) => { console.log('FAIL: ' + s); process.exit(1); };
const F = (x, d) => x.toFixed(d);
const REPO = path.resolve(__dirname, '..', '..', '..');

// ---- ladder, extracted from the adopted producer's source -------------------
const LSRC = fs.readFileSync(path.join(REPO, 'research/a113274-gap-records.js'), 'utf8');
function extractArray(name) {
  const m = LSRC.match(new RegExp(name + String.raw` = \[([\s\S]*?)\];`));
  if (!m) fail('array ' + name + ' not found in ladder source');
  return m[1].match(/\d+/g).map(BigInt);
}
const GAP = extractArray('GAP'), START = extractArray('START');
if (GAP.length !== 82 || START.length !== 82) fail('ladder term counts');
for (let i = 1; i < 82; i++) {
  if (GAP[i] % 6n !== 0n || GAP[i] <= GAP[i - 1] || START[i] <= START[i - 1]) fail('ladder guards at n=' + (i + 1));
}
const E = START.map((s, i) => s + GAP[i] + 2n);            // zonegap-03 convention
const EMAX = Number(E[81]);
const L82 = GAP.map((g, k) => ({ e: Number(E[k]), g: Number(g) }));

// ---- zonegap-03-model.js's estimator, verbatim (via measure-record-null2) ----
const abar = (x) => Math.log(x) * Math.log(x) / (2 * C2HL);
const trend = (x) => abar(x) * Math.log(x / abar(x));
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function estimators(recs, WLO, WHI) {
  const w = recs.filter(r => r.e >= WLO && r.e <= WHI);
  const n = w.length;
  const ln = w.map(r => Math.log(r.e));
  const z = w.map(r => (r.g - trend(r.e)) / abar(r.e));
  const load = w.map(r => r.g / trend(r.e));
  return { n, zMean: mean(z), zSd: sd(z), A: mean(load), load, ln, w, z };
}
function bstats(o) {
  if (o.n < 2) return null;
  const Lk = o.w.map(r => Math.log(r.e / abar(r.e)));
  const wt = Lk.map(L => 1 / L);
  let sw = 0, swz = 0;
  for (let i = 0; i < o.n; i++) { sw += wt[i]; swz += -o.z[i] * wt[i]; }
  const zm = mean(o.z), zs = sd(o.z);
  const skew = mean(o.z.map(v => Math.pow((v - zm) / zs, 3)));
  return { bA: swz / sw, bZ: -zm, bMed: -med(o.z), zSd: zs, zSkew: skew,
           meanInvL: sw / o.n, A: o.A, n: o.n };
}
const WLO = 1e4;

// ---- the generalised null: a gap law given by U(v, x) ------------------------
// Every law is stated through its mean-normalised quantile U(v, x): the gap in
// units of abar(x) whose survival probability is e^{-v}. The exponential is
// U = v, and with it the simulation below consumes the two streams in EXACTLY
// the predecessor's order (exact regime: g = abar*v with v = -ln(1-u); block
// regime: the exact inversion of the max of N iid draws, S(t) = -expm1(ln u/N),
// t = abar*U(-ln S)), so N0e reproduces bit for bit and every other law is
// paired with it. Frozen abar at the gap's left endpoint throughout (the
// inhomogeneous correction is measured at -0.0012 by the predecessor and is not
// re-run).
const XEXACT = 1e7, DLN = 0.005;
function simulate(rndEx, rndBl, U) {
  const recs = [];
  let x = 100, rm = 0;
  while (x < XEXACT) {
    const sc0 = abar(x);
    let u = rndEx(); if (u > 1 - 1e-12) u = 1 - 1e-12;
    const g = sc0 * U(-Math.log(1 - u), x);
    x += g;
    if (g > rm) { rm = g; recs.push({ e: x, g }); }
  }
  const Lhi = Math.log(EMAX);
  for (let L = Math.log(XEXACT); L < Lhi; L += DLN) {
    const xl = Math.exp(L), xh = Math.exp(L + DLN), xm = Math.exp(L + DLN / 2);
    const scm = abar(xm);
    const N = (xh - xl) / scm;
    let u = rndBl(); if (u < 1e-12) u = 1e-12; if (u > 1 - 1e-12) u = 1 - 1e-12;
    const v = -Math.log(-Math.expm1(Math.log(u) / N));
    const m = scm * U(v, xm);
    if (m > rm) { rm = m; recs.push({ e: xm, g: m }); }
  }
  return recs;
}
const Uexp = (v) => v;

// ---- incomplete gamma, for the gamma family ----------------------------------
function lnGamma(z) {
  const c = [76.18009172947146, -86.50532032941677, 24.01409824083091,
             -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let x = z, y = z, tmp = x + 5.5; tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += c[j] / ++y;
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}
// ln Q(a, x), Q the upper regularized incomplete gamma (NR gser/gcf, in logs)
function lnQ(a, x) {
  if (x <= 0) return 0;
  if (x < a + 1) {
    let ap = a, sum = 1 / a, del = sum;
    for (let n = 0; n < 500; n++) { ap += 1; del *= x / ap; sum += del; if (Math.abs(del) < Math.abs(sum) * 1e-16) break; }
    const P = sum * Math.exp(-x + a * Math.log(x) - lnGamma(a));
    return Math.log1p(-P);
  }
  let b = x + 1 - a, c = 1 / 1e-300, d = 1 / b, h = d;
  for (let i = 1; i < 1000; i++) {
    const an = -i * (i - a); b += 2;
    d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300;
    c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300;
    d = 1 / d; const del = d * c; h *= del;
    if (Math.abs(del - 1) < 1e-15) break;
  }
  return -x + a * Math.log(x) - lnGamma(a) + Math.log(h);
}
// quantile table: X(v) solves lnQ(a, X) = -v, on v in [0, VMAX] step DV
const VMAX = 70, DV = 0.02, NV = Math.round(VMAX / DV);
function gammaTable(a) {
  const tab = new Float64Array(NV + 1);
  for (let i = 0; i <= NV; i++) {
    const v = i * DV; let lo = 0, hi = 2 * v + 60;
    for (let it = 0; it < 64; it++) { const mid = (lo + hi) / 2; if (lnQ(a, mid) > -v) lo = mid; else hi = mid; }
    tab[i] = (lo + hi) / 2;
  }
  return tab;
}
const lookup = (tab, v) => {
  if (v >= VMAX) return tab[NV] + (v - VMAX) * (tab[NV] - tab[NV - 1]) / DV;
  const t = v / DV, i = Math.floor(t), f = t - i;
  return tab[i] * (1 - f) + tab[i + 1] * f;
};
function gammaLaw(cv2) {                 // fixed CV^2; mean-normalised: U = X/alpha
  const a = 1 / cv2, tab = gammaTable(a);
  return (v) => lookup(tab, v) / a;
}
function shiftedLaw(cv2) {               // g = delta + Exp(abar - delta), delta = abar(1 - CV)
  const cv = Math.sqrt(cv2);
  return (v) => (1 - cv) + cv * v;
}

// ---- Li_2, a_c(x) = x/pi_2(x) under HL, T_c (Kourbatov-Wolf 2019 Def. 2, 4) --
// Li_2(x) = int_2^x dt/ln^2 t, tabulated by Simpson in v = ln t on a fine grid.
const LI_LO = Math.log(2), LI_HI = Math.log(1e18), LI_N = 400000, LI_H = (LI_HI - LI_LO) / LI_N;
const LITAB = new Float64Array(LI_N + 1);
{
  const f = (v) => Math.exp(v) / (v * v);
  let acc = 0; LITAB[0] = 0;
  for (let i = 1; i <= LI_N; i++) {                // Simpson on each panel pair via midpoint rule
    const v0 = LI_LO + (i - 1) * LI_H, v1 = v0 + LI_H, vm = (v0 + v1) / 2;
    acc += LI_H / 6 * (f(v0) + 4 * f(vm) + f(v1)); LITAB[i] = acc;
  }
}
const Li2 = (x) => { const t = (Math.log(x) - LI_LO) / LI_H, i = Math.min(LI_N - 1, Math.max(0, Math.floor(t))), f = t - i;
                     return LITAB[i] * (1 - f) + LITAB[i + 1] * f; };
const pi2HL = (x) => 2 * C2HL * Li2(x);
const ac = (x) => x / pi2HL(x);
const Tc = (x) => ac(x) * Math.log(pi2HL(x));   // KW eq (12) with phi_{2,H}(2) = 1
// alpha(x) = abar/a_c, tabulated gamma quantiles on an alpha grid, bilinear
const AL_LO = 1.0, AL_HI = 2.2, AL_N = 120, AL_W = (AL_HI - AL_LO) / AL_N;
let ALTABS = null;
function acLaw() {
  if (!ALTABS) { ALTABS = []; for (let i = 0; i <= AL_N; i++) ALTABS.push(gammaTable(AL_LO + i * AL_W)); }
  return (v, x) => {
    const a = abar(x) / ac(x);
    let t = (a - AL_LO) / AL_W; if (t < 0) t = 0; if (t > AL_N - 1e-9) t = AL_N - 1e-9;
    const i = Math.floor(t), f = t - i;
    return (lookup(ALTABS[i], v) * (1 - f) + lookup(ALTABS[i + 1], v) * f) / a;
  };
}

// ---- the tile's @31 law, parsed from gap-spectrum-01.js's embedded block -----
const GSRC = fs.readFileSync(path.join(REPO, 'research/gap-spectrum-01.js'), 'utf8');
function tileTable() {
  const i0 = GSRC.indexOf('//   x = 31   mbar = 32.2105   D = 6226553025');
  if (i0 < 0) fail('gap-spectrum-01.js @31 tail table not found');
  const block = GSRC.slice(i0, GSRC.indexOf('// ----', i0));
  const pts = [];
  for (const line of block.split('\n')) {
    const m = line.match(/^\/\/\s+([\d.]+) \|\s+[\d.]+ \|\s+(\d+) \|\s+([\d.e+-]+) \|/);
    if (m && Number(m[2]) > 0) pts.push({ u: Number(m[1]), cnt: Number(m[2]), S: Number(m[3]) });
  }
  const sl = GSRC.slice(GSRC.indexOf('x = 31   points with #{g>t} > 100'), GSRC.indexOf('x = 31   points with #{g>t} > 100') + 1200)
                 .match(/1e-6\.\.1eend \|[^|]*\|[^|]*\|\s+(-[\d.]+)/);
  if (!sl) fail('gap-spectrum-01.js @31 last-decade slope not found');
  return { pts, slope: -Number(sl[1]), maxOverMean: 348 / 32.2105 };
}
function tableLaw(pts, slope, cap) {      // pts: {u, w = -ln S}, w increasing; piecewise-linear inverse
  const n = pts.length;
  return (v) => {
    if (v <= 0) return 0;
    let u;
    if (v >= pts[n - 1].w) u = pts[n - 1].u + (v - pts[n - 1].w) / slope;
    else {
      let i = 0; while (pts[i].w < v) i++;                    // first point with w >= v
      const p = i === 0 ? { u: 0, w: 0 } : pts[i - 1], q = pts[i];
      u = p.u + (v - p.w) * (q.u - p.u) / (q.w - p.w);
    }
    return cap ? Math.min(u, cap) : u;
  };
}

// ---- the NEW sieve: twin-prime gaps at height, histogrammed in u = g/abar(p) --
const QUICK = process.argv.includes('--quick');
const XS = QUICK ? 1e9 : 1e11, HB = 0.01, HMAX = 80, HN = Math.round(HMAX / HB);
const DEC_LO = 4, DTOP = QUICK ? 8 : 10;               // registered decade is DTOP-1, extension DTOP                                            // decades [1e4,1e5) .. [1e10,1e11)
const decOf = (p) => Math.floor(Math.log10(p) + 1e-12);
function sieveHist() {
  const hists = {}, counts = {}, maxg = {}, runmax = {};
  for (let d = 0; d < 12; d++) { hists[d] = new Float64Array(HN + 1); counts[d] = 0; maxg[d] = 0; }
  const SEG = 1 << 24, lim = Math.floor(Math.sqrt(XS)) + 1;
  const small = new Uint8Array(lim + 1), primes = [];
  for (let i = 3; i <= lim; i += 2) { if (!small[i]) { primes.push(i); for (let j = i * i; j <= lim; j += 2 * i) small[j] = 1; } }
  const seg = new Uint8Array(SEG);
  let prev = -1, lastTwin = -1, rm = 0, last = Date.now();
  for (let lo = 3; lo < XS; lo += 2 * SEG) {
    seg.fill(0);
    const hi = Math.min(lo + 2 * SEG, XS);
    for (const p of primes) { if (p * p >= hi) break;
      let s = Math.max(p * p, Math.ceil(lo / p) * p); if (s % 2 === 0) s += p;
      for (let j = (s - lo) >> 1; j < SEG && lo + 2 * j < hi; j += p) seg[j] = 1; }
    const n = (hi - lo) >> 1;
    for (let j = 0; j < n; j++) {
      if (seg[j]) continue;
      const q = lo + 2 * j;
      if (q - prev === 2) {
        if (lastTwin > 0) {
          const g = prev - lastTwin, d = decOf(lastTwin);
          if (g > rm) rm = g;
          if (d >= DEC_LO) {
            const u = g / abar(lastTwin), k = Math.min(HN, Math.floor(u / HB));
            hists[d][k] += 1; counts[d] += 1; if (g > maxg[d]) maxg[d] = g;
          }
          const dNext = decOf(prev);
          if (dNext !== d) runmax[d] = rm;         // running max at the moment the decade is left
        }
        lastTwin = prev;
      }
      prev = q;
    }
    if (Date.now() - last > 30000) { prog('  sieve at ' + hi.toExponential(2)); last = Date.now(); }
  }
  runmax[decOf(lastTwin)] = rm;
  return { hists, counts, maxg, runmax };
}
function histLaw(h, n) {
  // moments from bin centres; S(u) at raw edges every 0.05; -ln S table where the
  // tail count >= 30; far-tail slope by OLS of -ln S on raw u over u in [4, 12].
  let s1 = 0, s2 = 0;
  for (let k = 0; k <= HN; k++) { const c = (k + 0.5) * HB; s1 += h[k] * c; s2 += h[k] * c * c; }
  const mu = s1 / n, cv2 = (s2 / n - mu * mu) / (mu * mu);
  const tail = new Float64Array(HN + 2); tail[HN + 1] = 0;
  for (let k = HN; k >= 0; k--) tail[k] = tail[k + 1] + h[k];
  const pts = [];
  for (let k = 5; k <= HN; k += 5) { if (tail[k] < 30) break; pts.push({ u: k * HB, w: -Math.log(tail[k] / n), cnt: tail[k] }); }
  let sx = 0, sy = 0, sxx = 0, sxy = 0, m = 0;
  for (const p of pts) if (p.u >= 4 && p.u <= 12) { sx += p.u; sy += p.w; sxx += p.u * p.u; sxy += p.u * p.w; m++; }
  const slope = (m * sxy - sx * sy) / (m * sxx - sx * sx);
  const ratio = (uu) => { const k = Math.round(uu / HB); return (tail[k] / n) / Math.exp(-uu); };
  return { mu, cv2, pts, slope, npts: m, ratio, U: tableLaw(pts, slope, null), tail, ulast: pts[pts.length - 1].u };
}

// ============================================================================
log('ATTACK-0830-RECORD-MECHANISM — three candidate mechanisms for the residual of');
log('  Kourbatov b, each a gap law replacing the null\'s exponential, paired against');
log('  the predecessor\'s N0e on its own seeds. Category (i), null-side only.');
log('');

// ---- S1. CUSTODY GATE ---------------------------------------------------------
prog('S1 gate');
const data = estimators(L82, WLO, EMAX), dB = bstats(data);
const dCut = bstats(estimators(L82, 0, 1e15));
const REPS = 2000, NEWREPS = QUICK ? 40 : 2000, SEX = 0x7E5100, SBL = 0x9B1000;
const N0eHeights = [];
const N0e = { bA: [], bZ: [], bM: [], zSd: [], zSk: [], n: [], z: [] };
for (let r = 0; r < REPS; r++) {
  const o = estimators(simulate(mulberry32(SEX + r), mulberry32(SBL + r), Uexp), WLO, EMAX), b = bstats(o);
  N0e.bA.push(b.bA); N0e.bZ.push(b.bZ); N0e.bM.push(b.bMed); N0e.zSd.push(b.zSd); N0e.zSk.push(b.zSkew); N0e.n.push(o.n);
  for (const w of o.w) N0eHeights.push(w.e);
}
{
  const want = [
    ['n', data.n, 72], ['mean 1/L', +F(dB.meanInvL, 5), 0.06269], ['b_A data', +F(dB.bA, 4), 1.1251],
    ['b_z data', +F(dB.bZ, 4), 1.2981], ['b_med data', +F(dB.bMed, 4), 1.3159],
    ['n at cut 1e15', dCut.n, 71], ['b_med at cut 1e15', +F(dCut.bMed, 4), 1.2597],
    ['N0e b_A', +F(mean(N0e.bA), 4), 0.1639], ['N0e b_z', +F(mean(N0e.bZ), 4), 0.2147], ['N0e b_med', +F(mean(N0e.bM), 4), 0.4255],
    ['N0e b_z sd', +F(sd(N0e.bZ), 4), 0.2350], ['N0e N', +F(mean(N0e.n), 1), 68.4],
  ];
  let bad = 0;
  for (const [tag, got, exp] of want) if (got !== exp) { log('  GATE FAIL [' + tag + ']: ' + got + ' != ' + exp); bad++; }
  if (bad) fail('S1 gate: the predecessor\'s b values or its N0e null do not reproduce');
  log('S1 CUSTODY GATE, 12/12: the data\'s b in all three normalisations, mean(1/L),');
  log('  the median-unbiased b at Kourbatov\'s cut, and the N0e null (2000 replicates,');
  log('  seeds 0x7E5100/0x9B1000 + r) all reproduce measure-record-null2-0829.js S1/S5');
  log('  digit for digit through the generalised law U(v) = v:');
  for (let i = 0; i < want.length; i += 3)
    log('    ' + want.slice(i, i + 3).map(([t, g]) => (t + ' = ' + g).padEnd(28)).join('').replace(/\s+$/, ''));
  log('  Kourbatov\'s definition (JIS 16 (2013) 13.5.2 eq. (1)): E_1 = a log(p/a) - b a,');
  log('  a = C_2 log^2 p; b_z = -mean(z), b_med = -median(z), z = (g - abar ln(e/abar))/abar.');
  log('  Baseline residual this file attacks, z route: b_z(data) - b_z(N0e) = ' + F(dB.bZ - mean(N0e.bZ), 4));
  // the data's band profile of b, arithmetic on the ladder
  const bands = [[1e4, 1e8], [1e8, 1e11], [1e11, 1e14], [1e14, 8e16]];
  log('  Data band profile of b_z (arithmetic on the ladder): ' + bands.map(([a, b]) => {
    const o = estimators(L82, a, b); return '[' + a.toExponential(0) + ',' + b.toExponential(0) + ') ' + F(-o.zMean, 3) + ' (n=' + o.n + ')'; }).join('; '));
}
log('');

// ---- S2. PREDICTIONS, evaluated from the registered formulas ------------------
prog('S2 predictions');
{
  log('S2. THE REGISTERED PREDICTIONS, evaluated over the N0e ensemble\'s ' + N0eHeights.length + ' pooled');
  log('  record heights (first-order formulas of the note\'s section 2; these are the');
  log('  arithmetic side of the pre-registration, not measurements).');
  const Ls = N0eHeights.map(e => Math.log(e / abar(e)));
  const gam = (cv2) => { const a = 1 / cv2; return mean(Ls.map(L => (1 - cv2) * L - cv2 * ((a - 1) * Math.log(L) - lnGamma(a)))); };
  const shf = (cv2) => { const cv = Math.sqrt(cv2); return mean(Ls.map(L => (1 - cv) * (L - 1))); };
  log('    mean L over null record heights = ' + F(mean(Ls), 3));
  for (const cv2 of [0.5285, 0.93, 0.986]) log('    gamma, CV^2 = ' + cv2 + ':   predicted d b_z = ' + F(gam(cv2), 4));
  log('    shifted exp, CV^2 = 0.93: predicted d b_z = ' + F(shf(0.93), 4));
  const acp = mean(N0eHeights.map(e => { const eps = 1 - ac(e) / abar(e), L = Math.log(e / abar(e)); return eps * (L - Math.log(L) - EULER); }));
  log('    gamma, CV^2(x) = a_c/abar: predicted d b_z = ' + F(acp, 4) + '   (eps = 1 - a_c/abar: ' +
      [1e4, 1e8, 1e12, 1e16].map(x => x.toExponential(0) + ' ' + F(1 - ac(x) / abar(x), 4)).join(', ') + ')');
  log('    (iii-B) KW bin-count transported, mean ln(abar/6) = ' + F(mean(N0eHeights.map(e => Math.log(abar(e) / 6))), 4) +
      '   (profile: ' + [1e4, 1e8, 1e12, 1e16].map(x => x.toExponential(0) + ' ' + F(Math.log(abar(x) / 6), 2)).join(', ') + ')');
  const comp = mean(N0eHeights.map(e => (trend(e) - Tc(e)) / abar(e))) - mean(data.w.map(r => (trend(r.e) - Tc(r.e)) / abar(r.e)));
  log('    (iii-S) trend swap T_c for T-bar: mean_data (T-bar - T_c)/abar = ' + F(mean(data.w.map(r => (trend(r.e) - Tc(r.e)) / abar(r.e))), 4) +
      ', mean_data T_c/T-bar = ' + F(mean(data.w.map(r => Tc(r.e) / trend(r.e))), 4) + ', composition term = ' + F(comp, 4));
  log('    records below T_c: ' + data.w.filter(r => r.g < Tc(r.e)).length + ' of ' + data.n +
      '; b_z measured against T_c in a_c units = ' + F(-mean(data.w.map(r => (r.g - Tc(r.e)) / ac(r.e))), 4));
}
log('');

// ---- S3. THE NEW SIEVE --------------------------------------------------------
prog('S3 sieve to ' + XS.toExponential(0));
const SV = sieveHist();
const HL = {};
{
  log('S3. THE TWIN-PRIME GAP LAW AT HEIGHT. Segmented sieve to ' + XS.toExponential(0) + ', gaps');
  log('  lesser-to-lesser (the A113274 convention), each gap in units u = g/abar(p) at');
  log('  its own start p, histogrammed by decade of p. Custody: pair count per decade');
  log('  against 2C2 Li_2, and the running maximum at each decade end against the ladder.');
  log('    decade       gaps        HL2 pairs     ratio     max gap   runmax   ladder   mean u    CV^2    slope[4,12]  npts  u_last   a_c/abar  1-6/abar');
  log('    (last two columns at the decade midpoint 10^(d+0.5): the HL second-order ansatz CV^2 = a_c/abar, and the 6Z geometric lattice CV^2)');
  let bad = 0;
  for (let d = DEC_LO; d <= DTOP; d++) {
    const lo = Math.pow(10, d), hi = Math.pow(10, d + 1);
    const hl = pi2HL(hi) - pi2HL(lo);
    const ladderMax = Number(GAP.filter((g, i) => START[i] < BigInt(Math.round(hi))).slice(-1)[0]);
    if (SV.runmax[d] !== ladderMax) bad++;
    HL[d] = histLaw(SV.hists[d], SV.counts[d]);
    log('    [1e' + d + ',1e' + (d + 1) + ')  ' + String(SV.counts[d]).padStart(10) + '  ' + F(hl, 0).padStart(12) + '   ' +
        F(SV.counts[d] / hl, 5) + '   ' + String(SV.maxg[d]).padStart(7) + '  ' + String(SV.runmax[d]).padStart(7) + '  ' +
        String(ladderMax).padStart(7) + '   ' + F(HL[d].mu, 4) + '   ' + F(HL[d].cv2, 4) + '   ' + F(HL[d].slope, 4).padStart(8) +
        '   ' + String(HL[d].npts).padStart(3) + '   ' + F(HL[d].ulast, 2).padStart(5) + '   ' + F(ac(Math.pow(10, d + 0.5)) / abar(Math.pow(10, d + 0.5)), 4) +
        '    ' + F(1 - 6 / abar(Math.pow(10, d + 0.5)), 4));
  }
  if (bad) fail('sieve running maxima do not match the ladder');
  log('  Running maxima match the ladder at all ' + (DTOP + 1 - DEC_LO) + ' decade ends. mean u is the raw');
  log('  mean of g/abar(p); the law fed to the null is rescaled by it so that its mean');
  log('  is exactly 1. CV^2 = Var(u)/mean(u)^2 from 0.01 bins. slope = OLS of -ln S(u)');
  log('  on u over raw u in [4, 12] on edges with tail count >= 30 (renewal: 1).');
  log('  Tail ratio S(u)/e^{-u} at raw u (top two decades):');
  log('      u      [1e' + (DTOP - 1) + ',1e' + DTOP + ')   [1e' + DTOP + ',1e' + (DTOP + 1) + ')      -ln S [1e' + (DTOP - 1) + ',1e' + DTOP + ')  tail count');
  for (const uu of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]) {
    const k = Math.round(uu / HB);
    log('    ' + F(uu, 1).padStart(5) + '   ' + F(HL[DTOP - 1].ratio(uu), 5).padStart(9) + '   ' + F(HL[DTOP].ratio(uu), 5).padStart(10) +
        '        ' + (HL[DTOP - 1].tail[k] > 0 ? F(-Math.log(HL[DTOP - 1].tail[k] / SV.counts[DTOP - 1]), 3) : 'n/a').padStart(8) + '     ' + String(HL[DTOP - 1].tail[k]).padStart(9));
  }
}
log('');

// ---- S4. THE ENSEMBLES, paired -----------------------------------------------
prog('S4 ensembles');
const TT = tileTable();
const tilePts = TT.pts.map(p => ({ u: p.u, w: -Math.log(p.S) }));
const LAWS = [
  ['G-tile  gamma, CV^2 = 0.5285 (tile @31 period-wide)', gammaLaw(0.5285)],
  ['G-R     gamma, CV^2 = 0.93 (height, zone-tail-02 R)', gammaLaw(0.93)],
  ['SE-R    shifted exp, CV^2 = 0.93', shiftedLaw(0.93)],
  ['G-tail  gamma, CV^2 = 0.986 (tail field)', gammaLaw(0.986)],
  ['G-ac    gamma, CV^2(x) = a_c(x)/abar(x)', acLaw()],
  ['TILE    @31 law, extrapolated slope ' + F(TT.slope, 4), tableLaw(tilePts, TT.slope, null)],
  ['TILEcap @31 law, hard cap at max/mean 10.804', tableLaw(tilePts, TT.slope, TT.maxOverMean)],
  ['HEIGHT  sieve law [1e' + (DTOP - 1) + ',1e' + DTOP + '), registered decade', (v) => HL[DTOP - 1].U(v) / HL[DTOP - 1].mu],
  ['HEIGHT2 sieve law [1e' + DTOP + ',1e' + (DTOP + 1) + '), extension', (v) => HL[DTOP].U(v) / HL[DTOP].mu],
];
const RES = {};
for (const [name, U] of LAWS) {
  const R = { name, bA: [], bZ: [], bM: [], zSd: [], zSk: [], n: [] };
  let last = Date.now();
  for (let r = 0; r < NEWREPS; r++) {
    const o = estimators(simulate(mulberry32(SEX + r), mulberry32(SBL + r), U), WLO, EMAX), b = bstats(o);
    if (!b) fail('a replicate produced < 2 in-window records under ' + name);
    R.bA.push(b.bA); R.bZ.push(b.bZ); R.bM.push(b.bMed); R.zSd.push(b.zSd); R.zSk.push(b.zSkew); R.n.push(o.n);
    if (Date.now() - last > 30000) { prog('  ' + name.slice(0, 7) + ' rep ' + r); last = Date.now(); }
  }
  RES[name] = R;
}
{
  log('S4. THE ENSEMBLES, ' + NEWREPS + ' replicates each on the predecessor\'s two seeded streams,');
  log('  every law paired with N0e index by index. Mean +- ensemble sd; then the PAIRED');
  log('  delta against N0e with its standard error; then the shape statistics.');
  log('  law                                                    N      b_A               b_z               b_med');
  const row = (name, R) => log('  ' + name.padEnd(54) + F(mean(R.n), 1).padStart(5) + '  ' +
    (F(mean(R.bA), 4) + ' +- ' + F(sd(R.bA), 4)).padStart(17) + ' ' + (F(mean(R.bZ), 4) + ' +- ' + F(sd(R.bZ), 4)).padStart(17) +
    ' ' + (F(mean(R.bM), 4) + ' +- ' + F(sd(R.bM), 4)).padStart(17));
  row('N0e     baseline, exponential', N0e);
  for (const [name] of LAWS) row(name, RES[name]);
  log('  DATA'.padEnd(56) + '72  ' + F(dB.bA, 4).padStart(17) + ' ' + F(dB.bZ, 4).padStart(17) + ' ' + F(dB.bMed, 4).padStart(17));
  log('');
  log('  PAIRED DELTAS against N0e (mean of per-replicate differences +- s.e.):');
  log('  law                                                    d b_A              d b_z              d b_med         residual left (z)  share of ' + F(dB.bZ - mean(N0e.bZ), 4));
  for (const [name] of LAWS) {
    const R = RES[name];
    const pd = (f) => R[f].map((v, i) => v - N0e[f][i]);  // paired on index r
    const ps = (f) => { const d = pd(f); return F(mean(d), 4) + ' +- ' + F(sd(d) / Math.sqrt(d.length), 4); };
    const dz = mean(pd('bZ'));
    log('  ' + name.padEnd(54) + ps('bA').padStart(18) + ' ' + ps('bZ').padStart(18) + ' ' + ps('bM').padStart(18) +
        '   ' + F(dB.bZ - mean(R.bZ), 4).padStart(8) + '        ' + F(100 * dz / (dB.bZ - mean(N0e.bZ)), 1).padStart(6) + '%');
  }
  log('');
  log('  SHAPE (deliverable d). D = b_med - b_z = mean(z) - median(z); data D = ' + F(dB.bMed - dB.bZ, 4) +
      ', sd(z) = ' + F(dB.zSd, 4) + ', skew(z) = ' + F(mean(data.z.map(v => Math.pow((v - data.zMean) / data.zSd, 3))), 4));
  log('  law                                                    D (mean +- sd)      z_D     sd(z)            skew(z)');
  const shape = (name, R) => {
    const D = R.bM.map((v, i) => v - R.bZ[i]), dD = dB.bMed - dB.bZ;
    log('  ' + name.padEnd(54) + (F(mean(D), 4) + ' +- ' + F(sd(D), 4)).padStart(18) + '  ' + F((dD - mean(D)) / sd(D), 2).padStart(6) +
        '   ' + (F(mean(R.zSd), 4) + ' +- ' + F(sd(R.zSd), 4)).padStart(16) + '  ' + (F(mean(R.zSk), 4) + ' +- ' + F(sd(R.zSk), 4)).padStart(16));
  };
  shape('N0e     baseline, exponential', N0e);
  for (const [name] of LAWS) shape(name, RES[name]);
}
log('');

// ---- S5. the height profile of d b under the height candidates ---------------
prog('S5 profiles');
{
  log('S5. HEIGHT PROFILE of b_z by band, ensemble means (the data\'s own profile is in S1).');
  const bands = [[1e4, 1e8], [1e8, 1e11], [1e11, 1e14], [1e14, 8e16]];
  const prof = (name, U) => {
    const acc = bands.map(() => []);
    for (let r = 0; r < 400; r++) {
      const recs = simulate(mulberry32(SEX + r), mulberry32(SBL + r), U);
      bands.forEach(([a, b], i) => { const o = estimators(recs, a, b); if (o.n >= 2) acc[i].push(-o.zMean); });
    }
    log('  ' + name.padEnd(54) + acc.map(v => F(mean(v), 3).padStart(7)).join('  ') + '   (400 reps)');
  };
  log('  law                                                    [1e4,1e8) [1e8,1e11) [1e11,1e14) [1e14,8e16)');
  prof('N0e     baseline, exponential', Uexp);
  for (const [name, U] of LAWS) if (/^(G-R|SE-R|G-ac|HEIGHT)/.test(name)) prof(name, U);
}
log('');
log('END. Reps 2000 per law (400 for S5 profiles); seeds as the predecessor. Window');
log('  [1e4, 7.0512e16], WLO 1e4. Sieve to ' + XS.toExponential(0) + ', histogram bins 0.01 in u to 80.');
prog('done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0830-record-mechanism.js
//   invocation:  node research/history/staging/attack-0830-record-mechanism.js
//   code-sha256: b6119e50a67fe1752335a92b12f7294fd401ae82809dd80ae958d33b8a71c8cb
//   out-sha256:  72394a91bea6ccd7cf9bcd9aa34a1e2588dd680f090f484a2c0181d964d9f787
//   body-lines:  120
//   inputs:      research/a113274-gap-records.js@b64796044e4b research/gap-spectrum-01.js@e57a839c67a0
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     1139.3 s
// ============================================================================
// ATTACK-0830-RECORD-MECHANISM — three candidate mechanisms for the residual of
//   Kourbatov b, each a gap law replacing the null's exponential, paired against
//   the predecessor's N0e on its own seeds. Category (i), null-side only.
//
// S1 CUSTODY GATE, 12/12: the data's b in all three normalisations, mean(1/L),
//   the median-unbiased b at Kourbatov's cut, and the N0e null (2000 replicates,
//   seeds 0x7E5100/0x9B1000 + r) all reproduce measure-record-null2-0829.js S1/S5
//   digit for digit through the generalised law U(v) = v:
//     n = 72                      mean 1/L = 0.06269          b_A data = 1.1251
//     b_z data = 1.2981           b_med data = 1.3159         n at cut 1e15 = 71
//     b_med at cut 1e15 = 1.2597  N0e b_A = 0.1639            N0e b_z = 0.2147
//     N0e b_med = 0.4255          N0e b_z sd = 0.235          N0e N = 68.4
//   Kourbatov's definition (JIS 16 (2013) 13.5.2 eq. (1)): E_1 = a log(p/a) - b a,
//   a = C_2 log^2 p; b_z = -mean(z), b_med = -median(z), z = (g - abar ln(e/abar))/abar.
//   Baseline residual this file attacks, z route: b_z(data) - b_z(N0e) = 1.0833
//   Data band profile of b_z (arithmetic on the ladder): [1e+4,1e+8) 0.713 (n=16); [1e+8,1e+11) 1.816 (n=15); [1e+11,1e+14) 1.620 (n=24); [1e+14,8e+16) 0.937 (n=17)
//
// S2. THE REGISTERED PREDICTIONS, evaluated over the N0e ensemble's 136859 pooled
//   record heights (first-order formulas of the note's section 2; these are the
//   arithmetic side of the pre-registration, not measurements).
//     mean L over null record heights = 18.652
//     gamma, CV^2 = 0.5285:   predicted d b_z = 7.4417
//     gamma, CV^2 = 0.93:   predicted d b_z = 1.0719
//     gamma, CV^2 = 0.986:   predicted d b_z = 0.2137
//     shifted exp, CV^2 = 0.93: predicted d b_z = 0.6290
//     gamma, CV^2(x) = a_c/abar: predicted d b_z = 1.2356   (eps = 1 - a_c/abar: 1e+4 0.2734, 1e+8 0.1164, 1e+12 0.0755, 1e+16 0.0559)
//     (iii-B) KW bin-count transported, mean ln(abar/6) = 4.2037   (profile: 1e+4 2.37, 1e+8 3.76, 1e+12 4.57, 1e+16 5.14)
//     (iii-S) trend swap T_c for T-bar: mean_data (T-bar - T_c)/abar = 1.4830, mean_data T_c/T-bar = 0.9114, composition term = -0.0190
//     records below T_c: 32 of 72; b_z measured against T_c in a_c units = -0.2170
//
// S3. THE TWIN-PRIME GAP LAW AT HEIGHT. Segmented sieve to 1e+11, gaps
//   lesser-to-lesser (the A113274 convention), each gap in units u = g/abar(p) at
//   its own start p, histogrammed by decade of p. Custody: pair count per decade
//   against 2C2 Li_2, and the running maximum at each decade end against the ladder.
//     decade       gaps        HL2 pairs     ratio     max gap   runmax   ladder   mean u    CV^2    slope[4,12]  npts  u_last   a_c/abar  1-6/abar
//     (last two columns at the decade midpoint 10^(d+0.5): the HL second-order ansatz CV^2 = a_c/abar, and the 6Z geometric lattice CV^2)
//     [1e4,1e5)        1019          1034   0.98502       630      630      630   1.0170   0.7276        NaN     0    3.10   0.7674    0.9262
//     [1e5,1e6)        6945          6999   0.99224      1452     1452     1452   1.0077   0.8091     1.0829    18    4.85   0.8207    0.9506
//     [1e6,1e7)       50811         50506   1.00604      1722     1722     1722   0.9940   0.8381     1.1834    52    6.55   0.8531    0.9646
//     [1e7,1e8)      381332        381614   0.99926      2868     2868     2868   1.0007   0.8852     1.0935   100    8.95   0.8750    0.9734
//     [1e8,1e9)     2984194       2984940   0.99975      4770     4770     4770   1.0002   0.9037     1.0661   135   10.70   0.8910    0.9793
//     [1e9,1e10)    23988173      23986108   1.00009      6030     6030     6030   0.9999   0.9173     1.0649   161   12.85   0.9033    0.9834
//     [1e10,1e11)   196963368     196957448   1.00003      8040     8040     8040   1.0000   0.9295     1.0638   161   14.70   0.9131    0.9864
//   Running maxima match the ladder at all 7 decade ends. mean u is the raw
//   mean of g/abar(p); the law fed to the null is rescaled by it so that its mean
//   is exactly 1. CV^2 = Var(u)/mean(u)^2 from 0.01 bins. slope = OLS of -ln S(u)
//   on u over raw u in [4, 12] on edges with tail count >= 30 (renewal: 1).
//   Tail ratio S(u)/e^{-u} at raw u (top two decades):
//       u      [1e9,1e10)   [1e10,1e11)      -ln S [1e9,1e10)  tail count
//       1.0     1.01429      1.00193           0.986       8950903
//       2.0     0.96541      0.96854           2.035       3134142
//       3.0     0.91437      0.92655           3.090       1092032
//       4.0     0.85749      0.87842           4.154        376746
//       5.0     0.80306      0.83212           5.219        129799
//       6.0     0.74733      0.78778           6.291         44437
//       7.0     0.69657      0.74633           7.362         15237
//       8.0     0.65887      0.70246           8.417          5302
//       9.0     0.59215      0.66112           9.524          1753
//      10.0     0.57297      0.60936          10.557           624
//      11.0     0.56160      0.57119          11.577           225
//      12.0     0.49529      0.51976          12.703            73
//      13.0     0.44263      0.48293          13.815            24
//      14.0     0.30080      0.37245          15.201             6
//      15.0     0.40883      0.26555          15.894             3
//      16.0     0.37044      0.27069          16.993             1
//      17.0     0.00000      0.24527             n/a             0
//      18.0     0.00000      0.00000             n/a             0
//
// S4. THE ENSEMBLES, 2000 replicates each on the predecessor's two seeded streams,
//   every law paired with N0e index by index. Mean +- ensemble sd; then the PAIRED
//   delta against N0e with its standard error; then the shape statistics.
//   law                                                    N      b_A               b_z               b_med
//   N0e     baseline, exponential                          68.4   0.1639 +- 0.2541  0.2147 +- 0.2350  0.4255 +- 0.2505
//   G-tile  gamma, CV^2 = 0.5285 (tile @31 period-wide)    73.2   5.7187 +- 0.3761  7.4415 +- 0.4076  7.4461 +- 0.7360
//   G-R     gamma, CV^2 = 0.93 (height, zone-tail-02 R)    68.9   0.9757 +- 0.2323  1.2720 +- 0.2331  1.4189 +- 0.2618
//   SE-R    shifted exp, CV^2 = 0.93                       68.5   0.6526 +- 0.2400  0.8370 +- 0.2322  1.0189 +- 0.2511
//   G-tail  gamma, CV^2 = 0.986 (tail field)               68.5   0.3259 +- 0.2484  0.4258 +- 0.2333  0.6291 +- 0.2488
//   G-ac    gamma, CV^2(x) = a_c(x)/abar(x)                71.3   1.3215 +- 0.2143  1.4627 +- 0.2141  1.6273 +- 0.2300
//   TILE    @31 law, extrapolated slope 1.9126             75.6   6.3130 +- 0.4161  8.3107 +- 0.4566  8.3526 +- 0.8291
//   TILEcap @31 law, hard cap at max/mean 10.804          1449.8  16.3452 +- 0.1250 17.1232 +- 0.0517 17.5223 +- 0.0308
//   HEIGHT  sieve law [1e9,1e10), registered decade        68.7   0.9718 +- 0.2325  1.2517 +- 0.2324  1.4036 +- 0.2596
//   HEIGHT2 sieve law [1e10,1e11), extension               68.9   0.9878 +- 0.2316  1.2954 +- 0.2336  1.4407 +- 0.2637
//   DATA                                                  72             1.1251            1.2981            1.3159
//
//   PAIRED DELTAS against N0e (mean of per-replicate differences +- s.e.):
//   law                                                    d b_A              d b_z              d b_med         residual left (z)  share of 1.0833
//   G-tile  gamma, CV^2 = 0.5285 (tile @31 period-wide)     5.5548 +- 0.0095   7.2268 +- 0.0085   7.0206 +- 0.0161    -6.1435         667.1%
//   G-R     gamma, CV^2 = 0.93 (height, zone-tail-02 R)     0.8118 +- 0.0015   1.0573 +- 0.0013   0.9934 +- 0.0034     0.0261          97.6%
//   SE-R    shifted exp, CV^2 = 0.93                        0.4887 +- 0.0008   0.6223 +- 0.0007   0.5934 +- 0.0023     0.4611          57.4%
//   G-tail  gamma, CV^2 = 0.986 (tail field)                0.1620 +- 0.0003   0.2111 +- 0.0003   0.2036 +- 0.0012     0.8723          19.5%
//   G-ac    gamma, CV^2(x) = a_c(x)/abar(x)                 1.1576 +- 0.0015   1.2479 +- 0.0010   1.2018 +- 0.0022    -0.1646         115.2%
//   TILE    @31 law, extrapolated slope 1.9126              6.1492 +- 0.0105   8.0960 +- 0.0095   7.9271 +- 0.0181    -7.0126         747.3%
//   TILEcap @31 law, hard cap at max/mean 10.804           16.1813 +- 0.0077  16.9085 +- 0.0058  17.0967 +- 0.0057   -15.8251        1560.8%
//   HEIGHT  sieve law [1e9,1e10), registered decade         0.8079 +- 0.0014   1.0370 +- 0.0012   0.9781 +- 0.0032     0.0464          95.7%
//   HEIGHT2 sieve law [1e10,1e11), extension                0.8239 +- 0.0016   1.0806 +- 0.0014   1.0152 +- 0.0035     0.0027          99.8%
//
//   SHAPE (deliverable d). D = b_med - b_z = mean(z) - median(z); data D = 0.0179, sd(z) = 1.0213, skew(z) = 0.5446
//   law                                                    D (mean +- sd)      z_D     sd(z)            skew(z)
//   N0e     baseline, exponential                           0.2108 +- 0.1179   -1.64   1.2487 +- 0.1771  1.0415 +- 0.5158
//   G-tile  gamma, CV^2 = 0.5285 (tile @31 period-wide)     0.0046 +- 0.4773    0.03   3.5192 +- 0.2192  0.0247 +- 0.1971
//   G-R     gamma, CV^2 = 0.93 (height, zone-tail-02 R)     0.1469 +- 0.1302   -0.99   1.2979 +- 0.1751  0.7743 +- 0.4714
//   SE-R    shifted exp, CV^2 = 0.93                        0.1819 +- 0.1227   -1.34   1.2509 +- 0.1743  0.9343 +- 0.4995
//   G-tail  gamma, CV^2 = 0.986 (tail field)                0.2033 +- 0.1196   -1.55   1.2427 +- 0.1754  1.0160 +- 0.5112
//   G-ac    gamma, CV^2(x) = a_c(x)/abar(x)                 0.1647 +- 0.1107   -1.33   1.1563 +- 0.1575  0.9350 +- 0.5040
//   TILE    @31 law, extrapolated slope 1.9126              0.0419 +- 0.5336   -0.05   4.0486 +- 0.2379  0.0303 +- 0.1802
//   TILEcap @31 law, hard cap at max/mean 10.804            0.3991 +- 0.0328  -11.61   3.0073 +- 0.0840  2.0011 +- 0.0708
//   HEIGHT  sieve law [1e9,1e10), registered decade         0.1519 +- 0.1288   -1.04   1.2877 +- 0.1749  0.8010 +- 0.4777
//   HEIGHT2 sieve law [1e10,1e11), extension                0.1453 +- 0.1317   -0.97   1.3041 +- 0.1740  0.7664 +- 0.4685
//
// S5. HEIGHT PROFILE of b_z by band, ensemble means (the data's own profile is in S1).
//   law                                                    [1e4,1e8) [1e8,1e11) [1e11,1e14) [1e14,8e16)
//   N0e     baseline, exponential                           0.081    0.162    0.194    0.252   (400 reps)
//   G-R     gamma, CV^2 = 0.93 (height, zone-tail-02 R)     0.519    1.048    1.496    1.969   (400 reps)
//   SE-R    shifted exp, CV^2 = 0.93                        0.366    0.694    0.950    1.229   (400 reps)
//   G-ac    gamma, CV^2(x) = a_c(x)/abar(x)                 1.106    1.403    1.556    1.694   (400 reps)
//   HEIGHT  sieve law [1e9,1e10), registered decade         0.537    1.049    1.461    1.896   (400 reps)
//   HEIGHT2 sieve law [1e10,1e11), extension                0.491    1.124    1.548    1.978   (400 reps)
//
// END. Reps 2000 per law (400 for S5 profiles); seeds as the predecessor. Window
//   [1e4, 7.0512e16], WLO 1e4. Sieve to 1e+11, histogram bins 0.01 in u to 80.
// ============================================================================
// READINGS
// ============================================================================
// Written after the block above exists; every figure quoted must appear there.
//
// R1 [VERIFIED, 12/12 and 7/7]. S1 reproduces the predecessor's data b values
//   (1.1251, 1.2981, 1.3159, mean 1/L 0.06269, 1.2597 at the 1e15 cut on n = 71)
//   and its N0e null (0.1639 / 0.2147 / 0.4255, sd 0.235, N 68.4) at the same
//   seeds through U(v) = v; the sieve's running maxima match the ladder at all
//   seven decade ends (630, 1452, 1722, 2868, 4770, 6030, 8040).
// R2 [MEASURED, sieve to 1e11]. Twin gaps at height are under-dispersed with
//   CV^2 rising 0.7276, 0.8091, 0.8381, 0.8852, 0.9037, 0.9173, 0.9295 by
//   decade from 1e4, mean u within 0.017 of 1 everywhere, far-tail log-slope
//   over u in [4, 12] of 1.0829 to 1.0638 (renewal 1), and S(u)/e^{-u} monotone
//   decreasing above u = 2 in the registered decade. The ansatz a_c/abar tracks
//   CV^2 to within 0.04 at every decade (0.7674 .. 0.9131 against 0.7276 ..
//   0.9295); the geometric lattice CV^2 (0.9262 .. 0.9864) does not.
// R3 [MEASURED on a model, paired, 2000 reps]. Fed into the record null, the
//   measured height law carries d b_z = 1.0370 ([1e9,1e10)) and 1.0806
//   ([1e10,1e11)) of the 1.0833 residual, 95.7% and 99.8%, with ensemble
//   b_z = 1.2517 and 1.2954 against the data's 1.2981. A gamma at the same
//   CV^2 = 0.93 carries 1.0573 (97.6%); a shifted exponential at the same CV^2
//   only 0.6223 (57.4%): the transport of a bare CV^2 is family-dependent.
// R4 [MEASURED]. Closed as posed by overshoot: the tile's period-wide law
//   (d b_z = 8.0960, 747%), a gamma at the tile's CV^2 = 0.5285 (7.2268, 667%),
//   the hard-capped tile law (16.9085, pathological at N = 1449.8 records),
//   and Kourbatov-Wolf's k = 1 bin-count criterion at k = 2 (4.2037, arithmetic).
//   The trend swap T_c for T-bar is not a mechanism: composition term -0.0190;
//   32 of 72 records sit below T_c and the data's b against T_c reads -0.2170.
// R5 [MEASURED]. Shape: the height laws move D = mean(z) - median(z) from
//   0.2108 to 0.1453..0.1519 against the data's 0.0179 (z_D from -1.64 to
//   -0.97..-1.04); skew from 1.0415 to 0.7664..0.8010 against 0.5446; sd(z)
//   does not move (1.2877..1.3041 against 1.0213).
// R6 [MEASURED, 400 reps, means only]. Every candidate's b_z rises with
//   height (HEIGHT2: 0.491, 1.124, 1.548, 1.978 by band) where the data read
//   0.713, 1.816, 1.620, 0.937; the top band is the open falsifier and no
//   band sigma is printed here.
