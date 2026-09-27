// ============================================================================
// THE TWO RECORD NULLS THAT WERE NEVER RUN — C1 (INHOMOGENEOUS INTENSITY) AND
// C2 (THE 6Z LATTICE) — AND THE DECOMPOSITION OF KOURBATOV'S b
// ============================================================================
// THE QUESTION. `zonegap-03-model.md` §3 measured the A113274/A113275 twin-gap
// record ladder against a matched Kourbatov-Wolf pure-Exp record process and
// found the records 6.0% of trend low; `record-location-null.md` showed that
// survives every available correction at z = -3.3 over five window cuts; and
// `lit-kourbatov-shortfall.md` identified the effect as Kourbatov's published
// finite-height shortfall coefficient b = 1.2597, with the two in-house
// estimators of b disagreeing by 15% (1.125 from the A route, 1.298 from mean
// z). `object-models-read-0829.md` §4 D3 computes by hand that the matched
// null's own level already implies b_null = 0.167 under the constant-b model
// A(b) = 1 - b*mean_k(1/L_k), so about 15% of the effect is calculus on the
// trend, and §7 names two nulls that have never been run:
//   C1  the INHOMOGENEOUS-INTENSITY null: a Poisson process of intensity
//       1/abar(t) varying continuously ACROSS each gap's own span, instead of
//       an exponential of mean abar frozen at the gap's left endpoint.
//   C2  the LATTICED null: gaps drawn on 6Z, since real twin gaps past the
//       first are 0 mod 6. `record-location-null.md` §8 argues this at 1.7e-4
//       relative and never ran it.
// TODO Z5's first move is "pin b before hunting its mechanism". This file pins
// what the null side of b is, and leaves the residual named.
//
// HONEST DOUBT, WRITTEN BEFORE THE RUN. Three things could make every number
// below uninteresting. (1) The whole comparison is against a conjectural null:
// nothing in Kourbatov-Wolf is a theorem ("Theorem" occurs zero times in the
// 2019 paper, `zonegap-prior-art.md` §1), so a decomposition of b decomposes a
// fitted coefficient of a heuristic, not a fact about twin primes. (2) The
// arithmetic estimate for C1 says its effect is concentrated at the very
// bottom of the window and is of order 0.01 in b units, so C1 is expected to
// be a NEGATIVE result; it is run because "expected small" is not a
// measurement, and because the residual cannot be named until it is. (3) The
// lattice estimate contradicts a cited argument in the corpus by about three
// orders of magnitude in the unit that matters, which is exactly the sort of
// claim that is usually the new code's bug rather than the old note's error;
// the lattice law is therefore checked analytically AND empirically against
// its own mean before it is used.
//
// SCOPE, category (i). Null-side calibration only. Nothing here is a statement
// about T, about the tile, or about the Zone Postulate. The quantifier gap
// stands over every line: Kourbatov-Wolf's strongest conjecture is an
// almost-all over a log-sparse record sequence, and an almost-all over a
// log-sparse sequence cannot deliver an every-zone statement
// (`import-kw-zonegap.md` §0, §2).
//
// PRE-REGISTRATION. `research/history/staging/measure-record-null2-0829.md`
// §1, written and saved to disk BEFORE this file existed. Timestamped by disk
// order, not sealed by a commit. Predictions: P1 the estimator identity
// reproduces to 1e-12; P2 |Delta b| <= 0.05 for C1, sign negative, falsifier
// |Delta b| > 0.20; P3 Delta b = +0.08..+0.19 for C2, sign positive, falsifier
// |Delta b| < 0.02; P4 the two nulls together carry about 25% of b_data.
//
// WHAT THIS FILE IS NOT. No new census, no sieve, no twin data beyond
// `research/a113274-gap-records.js`, whose arrays are extracted from source at
// runtime (never transcribed — records-placement-01.js's lesson). Every null
// figure is a MEASUREMENT on a simulated ensemble, never a proof.
//
// CITED, NOT RECOMPUTED (standing compute rule): `zonegap-03-model.js` §(b)'s
// 15 record-block figures and `record-location-null.js`'s N0/N2/N3 readings
// are reproduced here as a GATE, which is a reproduction and not a
// recalculation of a result; `lit-kourbatov-shortfall.md` §5's b values are
// likewise gated against, not re-derived.
//
// Run it:
//   node research/qc/embed.js research/measure-record-null2-0829.js --timeout 1800
// Progress goes to stderr so the embedded stdout stays byte-reproducible.
// ============================================================================
'use strict';
const fs = require('fs'), path = require('path');
const T0 = Date.now();
const C2HL = 0.6601618158468696;              // Hardy-Littlewood C_2
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const sd = (a) => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) * (x - m)))); };
const med = (a) => { const b = a.slice().sort((x, y) => x - y), n = b.length;
                     return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };
const log = (s) => console.log(s);
const prog = (s) => process.stderr.write('[' + ((Date.now() - T0) / 1000).toFixed(0) + 's] ' + s + '\n');
const fail = (s) => { console.log('FAIL: ' + s); process.exit(1); };
const F = (x, d) => x.toFixed(d);

// ---- ladder, extracted from the adopted producer's source -------------------
const LSRC = fs.readFileSync(path.join(__dirname, 'a113274-gap-records.js'), 'utf8');
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

// ---- zonegap-03-model.js's estimator, verbatim ------------------------------
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
  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { const x = ln[i], y = i + 1; sx += x; sy += y; sxx += x * x; sxy += x * y; }
  const rate = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const d = []; for (let i = 1; i < n; i++) d.push(ln[i] - ln[i - 1]);
  const z = w.map(r => (r.g - trend(r.e)) / abar(r.e));
  const load = w.map(r => r.g / trend(r.e));
  return { n, rate, dCV: sd(d) / mean(d), zMean: mean(z), zSd: sd(z),
           A: mean(load), load, ln, w, z };
}
// ---- b, in BOTH in-house normalisations, per realisation --------------------
// L_k = ln(e_k/abar(e_k)); trend = abar*L; z = (g - trend)/abar; so
// g/T = 1 + z/L and 1 - A = -mean(z/L).  b_A is therefore the 1/L-WEIGHTED
// mean of -z and b_z the UNWEIGHTED mean of the same numbers.
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

// ---- the null family --------------------------------------------------------
// scale(x): the exponential scale actually used to draw a gap at x.
//   continuous: abar(x), so E[gap] = abar(x).
//   lattice:    s(x) = -6/ln(1 - 6/abar(x)), so that an Exp(s) draw ROUNDED UP
//               to the next multiple of 6 is exactly the mean-matched
//               memoryless lattice law P(G = 6j) = (1-q)q^(j-1), q = 1 - 6/abar,
//               whose mean is exactly abar. Checked in CHK3.
const scCont = abar;
const scLat = (x) => -6 / Math.log(1 - 6 / abar(x));
// SECOND LATTICE LAW (S8, added on the second pass of 2026-08-29). Rounding to
// the NEAREST multiple of 6, with a floor at 6 because real twin gaps past the
// first are at least 6. Its mean at scale s is closed-form:
//   M(s) = 6(1 - e^{-3/s}) + 6(e^{3/s} - e^{-3/s}) q/(1-q)^2,  q = e^{-6/s},
// the first term being the mass below 3 that rounds to 0 and is floored to 6.
// M is increasing in s, so the mean-matching scale solves M(s) = abar(x) and is
// found by bisection. Doing that per gap draw is too slow, so it is tabulated
// once on a uniform grid in ln x and interpolated linearly; the grid is fine
// enough that the interpolation error in the scale is under 1e-6 relative,
// which is 1e-5 in z units and four orders under the effect being measured.
const Mround = (s) => {
  const q = Math.exp(-6 / s), a = Math.exp(3 / s), b = Math.exp(-3 / s);
  return 6 * (1 - b) + 6 * (a - b) * q / ((1 - q) * (1 - q));
};
const RLO = Math.log(100), RHI = Math.log(1e17), RN = 20000, RW = (RHI - RLO) / RN;
const RTAB = new Float64Array(RN + 1);
for (let i = 0; i <= RN; i++) {
  const target = abar(Math.exp(RLO + i * RW));
  let lo = target / 4, hi = target * 4;
  for (let it = 0; it < 80; it++) { const mid = (lo + hi) / 2;
    if (Mround(mid) < target) lo = mid; else hi = mid; }
  RTAB[i] = (lo + hi) / 2;
}
const scLatRound = (x) => {
  const t = (Math.log(x) - RLO) / RW;
  let i = Math.floor(t); if (i < 0) i = 0; if (i >= RN) i = RN - 1;
  const f = t - i;
  return RTAB[i] * (1 - f) + RTAB[i + 1] * f;
};
// inhomogeneous inversion: solve integral_x^{x+g} dt/sc(t) = Ev, Newton from
// the frozen-endpoint guess, 2-panel Simpson for the integral.
function drawInhom(sc, x, Ev, sc0) {
  let g = Ev * sc0;
  for (let it = 0; it < 2; it++) {
    const I = (g / 6) * (1 / sc0 + 4 / sc(x + g / 2) + 1 / sc(x + g));
    g += (Ev - I) * sc(x + g);
  }
  return g;
}
const XEXACT = 1e7, DLN = 0.005;
// TWO RNG STREAMS, one for the exact regime and one for the block regime. The
// gate passes the SAME function for both, which consumes the stream in exactly
// the published order and reproduces record-location-null.js bit for bit. The
// five ensembles of S5 pass two INDEPENDENT streams with seeds shared across
// all five variants, so that every uniform is index-aligned between variants
// and the deltas of S6 are PAIRED. Without that pairing the C1 delta (-0.008)
// sits inside the unpaired standard error of the difference (0.0075) and is
// not resolved from zero; with it the comparison is a matched one.
function simulate(rndEx, rndBl, opts) {
  const inhom = !!opts.inhom, lat = !!opts.lattice, gum = !!opts.gumbel;
  const rnd6 = opts.latmode === 'round';                 // else round UP
  const sc = lat ? (rnd6 ? scLatRound : scLat) : scCont;
  const snap = (g) => rnd6 ? Math.max(6, 6 * Math.round(g / 6)) : 6 * Math.ceil(g / 6);
  const recs = [];
  let x = 100, rm = 0;
  while (x < XEXACT) {
    const sc0 = sc(x);
    let u = rndEx(); if (u > 1 - 1e-12) u = 1 - 1e-12;
    const Ev = -Math.log(1 - u);
    let g = inhom ? drawInhom(sc, x, Ev, sc0) : Ev * sc0;
    if (lat) g = snap(g);
    x += g;
    if (g > rm) { rm = g; recs.push({ e: x, g }); }
  }
  const Lhi = Math.log(EMAX);
  for (let L = Math.log(XEXACT); L < Lhi; L += DLN) {
    const xl = Math.exp(L), xh = Math.exp(L + DLN), xm = Math.exp(L + DLN / 2);
    const scm = sc(xm);
    // expected count of gaps in the block
    const N = inhom
      ? ((xh - xl) / 6) * (1 / sc(xl) + 4 / scm + 1 / sc(xh))
      : (xh - xl) / scm;
    let u = rndBl(); if (u < 1e-12) u = 1e-12; if (u > 1 - 1e-12) u = 1 - 1e-12;
    // block maximum of N iid Exp(scm)
    let m = gum
      ? scm * (Math.log(N) - Math.log(-Math.log(u)))          // the published Gumbel form
      : -scm * Math.log(-Math.expm1(Math.log(u) / N));        // exact inversion
    if (lat) m = snap(m);
    if (m > rm) { rm = m; recs.push({ e: xm, g: m }); }
  }
  return recs;
}
const WLO = 1e4;

// ============================================================================
log('MEASURE-RECORD-NULL2 (0829) — C1 inhomogeneous + C2 latticed record nulls,');
log('  and the decomposition of Kourbatov b. Ladder: 82 records, extracted from');
log('  research/a113274-gap-records.js at runtime. Category (i), null-side only.');
log('');

// ---- S1. CUSTODY: reproduce the published record block and the corrected null
prog('S1 custody gate');
const data = estimators(L82, WLO, EMAX);
const gateNull = [];
for (let r = 0; r < 200; r++) gateNull.push(estimators((f => simulate(f, f, { gumbel: true }))(mulberry32(0xC0FFEE + r)), WLO, EMAX));
const gs = (f) => { const v = gateNull.map(f); return { m: mean(v), s: sd(v), v }; };
const gN = gs(o => o.n), gRate = gs(o => o.rate), gCV = gs(o => o.dCV),
      gZm = gs(o => o.zMean), gZs = gs(o => o.zSd), gA = gs(o => o.A);
const zN0 = (data.A - gA.m) / gA.s;
const BIG = 5000, bigRecs = [];
for (let r = 0; r < BIG; r++) bigRecs.push((f => simulate(f, f, { gumbel: true }))(mulberry32(0x5EED00 + r)));
const big = bigRecs.map(rc => estimators(rc, WLO, EMAX));
const bA5 = big.map(o => o.A), bN5 = big.map(o => o.n);
const bAm = mean(bA5), bAs = sd(bA5);
let n2 = {}, n3 = {};
{
  const mn = mean(bN5), ma = bAm;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < BIG; i++) { sxy += (bN5[i] - mn) * (bA5[i] - ma); sxx += (bN5[i] - mn) * (bN5[i] - mn); }
  const b = sxy / sxx, r = sxy / Math.sqrt(sxx * BIG * bAs * bAs);
  const sRes = sd(bA5.map((a, i) => a - (ma + b * (bN5[i] - mn))));
  const condMean = ma + b * (data.n - mn);
  n2 = { r, b, condMean, sRes, z: (data.A - condMean) / sRes, def: 100 * (1 - data.A / condMean) };
}
{
  const LO = Math.log(WLO), HI = Math.log(EMAX), NB = 15, W = (HI - LO) / NB;
  const sum = new Array(NB).fill(0), cnt = new Array(NB).fill(0);
  for (const o of big) for (let i = 0; i < o.n; i++) {
    const b = Math.min(NB - 1, Math.floor((o.ln[i] - LO) / W));
    sum[b] += o.load[i]; cnt[b]++;
  }
  const mu = sum.map((s, i) => (cnt[i] ? s / cnt[i] : NaN));
  if (cnt.some(c => c < 30)) fail('a height bin has < 30 null records; rebin');
  const marg = (o) => { const v = [];
    for (let i = 0; i < o.n; i++) v.push(o.load[i] / mu[Math.min(NB - 1, Math.floor((o.ln[i] - LO) / W))]);
    return mean(v); };
  const dM = marg(data), nM = big.map(marg);
  n3 = { dM, m: mean(nM), s: sd(nM), z: (dM - mean(nM)) / sd(nM), def: 100 * (1 - dM / mean(nM)) };
}
{
  const want = [
    ['data n', data.n, 72], ['data A', +F(data.A, 4), 0.9295], ['data zMean', +F(data.zMean, 3), -1.298],
    ['data zSd', +F(data.zSd, 3), 1.021], ['data rate', +F(data.rate, 3), 2.562], ['data dCV', +F(data.dCV, 3), 0.908],
    ['null N', +F(gN.m, 1), 68.4], ['null N sd', +F(gN.s, 1), 7.9],
    ['null A', +F(gA.m, 4), 0.9895], ['null A sd', +F(gA.s, 4), 0.0182],
    ['null zMean', +F(gZm.m, 3), -0.212], ['null zMean sd', +F(gZm.s, 3), 0.244],
    ['null zSd', +F(gZs.m, 3), 1.264], ['null rate', +F(gRate.m, 3), 2.356],
    ['null dCV', +F(gCV.m, 3), 0.944],
    ['N0 z', +F(zN0, 2), -3.30],
    ['BIG A', +F(bAm, 4), 0.9891], ['BIG A sd', +F(bAs, 4), 0.0178],
    ['BIG z', +F((data.A - bAm) / bAs, 2), -3.34],
    ['N2 corr', +F(n2.r, 3), -0.703], ['N2 slope', +F(n2.b, 5), -0.00162],
    ['N2 condMean', +F(n2.condMean, 4), 0.9833], ['N2 sRes', +F(n2.sRes, 4), 0.0127],
    ['N2 z', +F(n2.z, 2), -4.24],
    ['N3 data', +F(n3.dM, 4), 0.9413], ['N3 null', +F(n3.m, 4), 1.0014],
    ['N3 def', +F(n3.def, 2), 6.01], ['N3 z', +F(n3.z, 2), -3.33],
  ];
  let bad = 0;
  for (const [tag, got, exp] of want) if (got !== exp) { log('  GATE FAIL [' + tag + ']: ' + got + ' != ' + exp); bad++; }
  if (bad) fail('S1 gate: this file does not reproduce its two predecessors');
  log('S1 CUSTODY GATE. All 15 published record-block figures of zonegap-03-model.js');
  log('  §(b) AND all 13 corrected-null figures of record-location-null.js (N0 z,');
  log('  the 5000-rep ensemble, N2 conditional-on-N, N3 marginal-subtracted)');
  log('  reproduced from the same seeds, digit for digit: 28/28. The estimator and');
  log('  the null are those files\', unmodified. This is the first time the family');
  log('  runs inside output custody.');
  log('  The reproduced values, printed so that no reading of this file quotes a');
  log('  number the block does not carry:');
  for (let i = 0; i < want.length; i += 3) {
    log('    ' + want.slice(i, i + 3).map(([t, g]) => (t + ' = ' + g).padEnd(26)).join('').replace(/\s+$/, ''));
  }
}
// b of the data, and the shortfall note's published b values
const dB = bstats(data);
// Kourbatov's own cut is e < 1e15 on the WHOLE ladder, with no lower cut:
// 71 records, ten of them below this file's window floor WLO = 1e4.
const dCut = bstats(estimators(L82, 0, 1e15));
{
  const want = [
    ['mean 1/L', +F(dB.meanInvL, 5), 0.06269], ['b_A data', +F(dB.bA, 4), 1.1251],
    ['b_z data', +F(dB.bZ, 4), 1.2981], ['b_med data', +F(dB.bMed, 4), 1.3159],
    ['n at cut 1e15', dCut.n, 71], ['b_med at cut 1e15', +F(dCut.bMed, 4), 1.2597],
  ];
  let bad = 0;
  for (const [tag, got, exp] of want) if (got !== exp) { log('  GATE FAIL [' + tag + ']: ' + got + ' != ' + exp); bad++; }
  if (bad) fail('S1 gate: lit-kourbatov-shortfall.md §5 b values do not reproduce');
  const inWin = bstats(estimators(L82, WLO, 1e15));
  log('  CONVENTION, stated because it is not stated in the note being reproduced:');
  log('    the 1e15 cut is on the WHOLE ladder, no lower cut, n = ' + dCut.n + '. Applying this');
  log('    family\'s standing window floor WLO = 1e4 to the same cut gives n = ' + inWin.n +
      ' and b_med = ' + F(inWin.bMed, 3) + ',');
  log('    which is NOT the published match; the ten records below 1e4 are load-bearing.');
  log('  And all 6 b figures of lit-kourbatov-shortfall.md §5, including the');
  log('  four-digit median-unbiased b = ' + F(dCut.bMed, 4) + ' at Kourbatov\'s own cut');
  log('  e < 1e15 on n = ' + dCut.n + ' records: 6/6.');
}
log('');

// ---- S2. P1, the estimator identity ----------------------------------------
prog('S2 identity');
{
  const Lk = data.w.map(r => Math.log(r.e / abar(r.e)));
  const wt = Lk.map(L => 1 / L), mw = mean(wt);
  const id1 = (1 - data.A) / mw;                       // the A route as published
  const cov = mean(data.z.map((z, i) => (-z - dB.bZ) * (wt[i] - mw)));
  log('S2. P1, THE ESTIMATOR IDENTITY (arithmetic on the 72 ladder records; not a');
  log('  measurement and not a simulation).');
  log('  b_A  = sum(-z/L)/sum(1/L) = ' + F(dB.bA, 10) + '   (1/L-WEIGHTED mean of -z)');
  log('  b_A  = (1 - A)/mean(1/L)  = ' + F(id1, 10) + '   (the published route)');
  log('  |difference| = ' + (Math.abs(dB.bA - id1)).toExponential(2));
  log('  b_z  = -mean(z)           = ' + F(dB.bZ, 10) + '   (UNWEIGHTED mean of -z)');
  log('  b_A - b_z                 = ' + F(dB.bA - dB.bZ, 10));
  log('  cov(-z, w)/mean(w), w=1/L = ' + F(cov / mw, 10));
  log('  |difference| = ' + (Math.abs((dB.bA - dB.bZ) - cov / mw)).toExponential(2));
  log('  So the 15% disagreement is a WEIGHTED against an UNWEIGHTED mean of one');
  log('  vector of 72 numbers, and is nonzero exactly because b varies with height.');
}
log('');

// ---- S3. CHK3, the lattice law is mean-matched -------------------------------
prog('S3 lattice law check');
{
  log('S3. CHK3, the C2 gap law, checked before it is used.');
  log('    x        abar(x)      q = 1-6/abar   s = -6/ln q   E[6*ceil(Exp(s)/6)]   rel err');
  let worst = 0;
  for (const x of [1e2, 1e4, 1e8, 1e12, 1e16]) {
    const ab = abar(x), q = 1 - 6 / ab, s = scLat(x), m = 6 / (1 - Math.exp(-6 / s));
    const rel = Math.abs(m / ab - 1); if (rel > worst) worst = rel;
    log('    ' + x.toExponential(0).padStart(6) + '   ' + F(ab, 4).padStart(9) + '   ' +
        F(q, 6).padStart(10) + '   ' + F(s, 4).padStart(11) + '   ' + F(m, 6).padStart(14) +
        '        ' + rel.toExponential(1));
  }
  if (worst > 1e-12) fail('lattice law is not mean-matched');
  const rnd = mulberry32(0x1A771CE);
  const xt = 1e4, s = scLat(xt); let acc = 0, K = 2000000;
  for (let i = 0; i < K; i++) { let u = rnd(); if (u > 1 - 1e-12) u = 1 - 1e-12;
    acc += 6 * Math.ceil((-Math.log(1 - u) * s) / 6); }
  const emp = acc / K, ab4 = abar(xt);
  log('    empirical, ' + (K / 1e6) + 'e6 draws at x = 1e4: mean gap ' + F(emp, 4) +
      ' against abar = ' + F(ab4, 4) + ', ' + F(100 * (emp / ab4 - 1), 3) + '% (s.e. ' +
      F(100 * ab4 / Math.sqrt(K) / ab4, 3) + '%). All drawn gaps are 0 mod 6 by construction.');
}
log('');

// ---- S4. CHK4, the C1 inversion reproduces the twin-pair count integral ------
prog('S4 inhomogeneous inversion check');
{
  // 2C2 * integral_100^1e7 dt/ln^2 t, by composite Simpson in v = ln t
  const v0 = Math.log(100), v1 = Math.log(1e7), M = 200000, h = (v1 - v0) / M;
  const f = (v) => Math.exp(v) / (v * v);
  let S = f(v0) + f(v1);
  for (let i = 1; i < M; i++) S += (i % 2 ? 4 : 2) * f(v0 + i * h);
  const LAM = 2 * C2HL * S * h / 3;
  const REP = 2000, cI = [], cF = [], dif = [];
  for (let r = 0; r < REP; r++) {
    const uu = [];                                 // one shared uniform stream
    const rnd = mulberry32(0x0DDBA11 + r);
    const draw = (i) => { while (uu.length <= i) { let u = rnd();
      if (u > 1 - 1e-12) u = 1 - 1e-12; uu.push(-Math.log(1 - u)); } return uu[i]; };
    let x = 100, c = 0;
    while (x < XEXACT) { x += drawInhom(scCont, x, draw(c), scCont(x)); c++; }
    cI.push(c);
    x = 100; let d = 0;
    while (x < XEXACT) { x += draw(d) * scCont(x); d++; }
    cF.push(d); dif.push(d - c);
  }
  const mI = mean(cI), mF = mean(cF), md = mean(dif), sdd = sd(dif) / Math.sqrt(REP);
  log('S4. CHK4, the C1 inversion against the integral it is supposed to realise.');
  log('  Expected pair count on [100, 1e7] = 2C2 * int dt/ln^2 t = ' + F(LAM, 2) +
      '  (Simpson, ' + M + ' panels).');
  log('  C1 (inhomogeneous), ' + REP + ' reps: mean count ' + F(mI, 2) + ', ' +
      F(100 * (mI / LAM - 1), 4) + '% off the integral, ' +
      F((mI - LAM) / (sd(cI) / Math.sqrt(REP)), 2) + ' s.e.');
  log('  N0 (frozen left endpoint), SAME uniforms: mean count ' + F(mF, 2) + ', ' +
      F(100 * (mF / LAM - 1), 4) + '% off, ' + F((mF - LAM) / (sd(cF) / Math.sqrt(REP)), 2) + ' s.e.');
  log('  Paired difference N0 - C1 = ' + F(md, 3) + ' +- ' + F(sdd, 3) + ' pairs on ' +
      F(LAM, 0) + ', i.e. ' + (Math.abs(md) / LAM).toExponential(2) + ' relative.');
  log('  So the frozen-endpoint construction generates the pair count right to a few');
  log('  parts in 1e5 below 1e7; that, and not a bias in the count, is the size of');
  log('  what C1 corrects there.');
}

// ---- S5. the five ensembles, COMMON RANDOM NUMBERS across all five ----------
const REPS = 2000, SEX = 0x7E5100, SBL = 0x9B1000;
const ENS = [
  ['N0  published (Gumbel blocks, frozen abar, continuous)', { gumbel: true }],
  ['N0e baseline   (exact blocks,  frozen abar, continuous)', {}],
  ['C1  inhomogen. (exact blocks,  1/abar(t),   continuous)', { inhom: true }],
  ['C2  latticed   (exact blocks,  frozen abar, gaps on 6Z)', { lattice: true }],
  ['C12 both       (exact blocks,  1/abar(t),   gaps on 6Z)', { inhom: true, lattice: true }],
  ['C2n second law (exact blocks,  frozen abar, 6Z, to NEAREST)', { lattice: true, latmode: 'round' }],
];
const KEYS = ['N0', 'N0e', 'C1', 'C2', 'C12', 'C2n'];
const RES = {};
for (let i = 0; i < KEYS.length; i++) RES[KEYS[i]] = { name: ENS[i][0], bA: [], bZ: [], bM: [], A: [], n: [], zSd: [], zSk: [] };
const N0eHeights = [];                       // pooled null record heights, for S8
{
  let last = Date.now();
  for (let r = 0; r < REPS; r++) {
    for (let i = 0; i < KEYS.length; i++) {
      const o = estimators(simulate(mulberry32(SEX + r), mulberry32(SBL + r), ENS[i][1]), WLO, EMAX);
      const b = bstats(o);
      const R = RES[KEYS[i]];
      R.bA.push(b ? b.bA : NaN); R.bZ.push(b ? b.bZ : NaN); R.bM.push(b ? b.bMed : NaN);
      R.A.push(b ? b.A : NaN); R.n.push(o.n);
      R.zSd.push(b ? b.zSd : NaN); R.zSk.push(b ? b.zSkew : NaN);
      if (KEYS[i] === 'N0e') for (const r of o.w) N0eHeights.push(r.e);
    }
    if (Date.now() - last > 30000) { prog('  ... rep ' + r + '/' + REPS); last = Date.now(); }
  }
  for (const k of KEYS) if (RES[k].bA.some(v => !isFinite(v))) fail('a replicate produced < 2 in-window records');
}
log('S5. THE FIVE ENSEMBLES, ' + REPS + ' seeded replicates each, COMMON RANDOM');
log('  NUMBERS: every variant sees the same two uniform streams at the same');
log('  indices, so the deltas of S6 are paired. Same window [1e4, 7.05e16], same');
log('  estimator, b read in both in-house normalisations plus the median.');
log('  b_A is the 1/L-weighted mean of -z (the A route); b_z the unweighted mean');
log('  (Kourbatov\'s own definition); b_med the median (his median-unbiased b).');
log('  Mean +- ensemble sd.');
log('');
log('  ensemble                                                   N        A            b_A              b_z              b_med');
const row = (k) => {
  const R = RES[k];
  log('  ' + R.name.padEnd(56) + F(mean(R.n), 1).padStart(5) + '   ' + F(mean(R.A), 4) +
      '   ' + (F(mean(R.bA), 4) + ' +- ' + F(sd(R.bA), 4)).padStart(16) +
      '   ' + (F(mean(R.bZ), 4) + ' +- ' + F(sd(R.bZ), 4)).padStart(16) +
      '   ' + (F(mean(R.bM), 4) + ' +- ' + F(sd(R.bM), 4)).padStart(16));
};
for (const k of KEYS) row(k);
log('  ' + 'DATA (the adopted ladder, 82 records, 72 in window)'.padEnd(56) +
    String(data.n).padStart(5) + '   ' + F(data.A, 4) + '   ' + F(dB.bA, 4).padStart(16) +
    '   ' + F(dB.bZ, 4).padStart(16) + '   ' + F(dB.bMed, 4).padStart(16));
log('');

// ---- S6. the deltas and the decomposition -----------------------------------
prog('S6 decomposition');
{
  const M = (k, f) => mean(RES[k][f]), S = (k, f) => sd(RES[k][f]);
  log('S6. THE DELTAS, PAIRED. Each is the mean of a per-replicate difference on');
  log('  common random numbers, with the standard error of that paired mean.');
  log('    effect                                    d b_A                d b_z              d b_med');
  const pd = (a, b, f) => RES[a][f].map((v, i) => v - RES[b][f][i]);
  const pstr = (a, b, f) => { const d = pd(a, b, f);
    return F(mean(d), 4) + ' +- ' + F(sd(d) / Math.sqrt(d.length), 4); };
  const drow = (tag, a, b) => log('    ' + tag.padEnd(36) +
    pstr(a, b, 'bA').padStart(17) + '  ' + pstr(a, b, 'bZ').padStart(17) +
    '  ' + pstr(a, b, 'bM').padStart(17));
  drow('block form (N0e - N0), a control', 'N0e', 'N0');
  log('      (that control at full precision, b_z: ' +
      mean(pd('N0e', 'N0', 'bZ')).toExponential(2) + ' +- ' +
      (sd(pd('N0e', 'N0', 'bZ')) / Math.sqrt(REPS)).toExponential(2) + ')');
  log('      On common random numbers the exact block maximum and the published');
  log('      Gumbel block maximum select the same records at the same heights, so');
  log('      the block form is not a route to any part of b.');
  drow('C1 inhomogeneous (C1 - N0e)', 'C1', 'N0e');
  drow('C2 lattice (C2 - N0e)', 'C2', 'N0e');
  drow('C1+C2 jointly (C12 - N0e)', 'C12', 'N0e');
  log('    additivity check: (C1-N0e)+(C2-N0e) vs (C12-N0e) =  ' +
      F((M('C1', 'bA') - M('N0e', 'bA')) + (M('C2', 'bA') - M('N0e', 'bA')), 4) + ' vs ' +
      F(M('C12', 'bA') - M('N0e', 'bA'), 4) + '  (b_A);  ' +
      F((M('C1', 'bZ') - M('N0e', 'bZ')) + (M('C2', 'bZ') - M('N0e', 'bZ')), 4) + ' vs ' +
      F(M('C12', 'bZ') - M('N0e', 'bZ'), 4) + '  (b_z)');
  log('');
  log('  THE DECOMPOSITION OF b, in each normalisation. "carried" = the ensemble');
  log('  mean of b under that null, i.e. what the null reproduces with no twin-prime');
  log('  arithmetic in it at all. "residual" = data minus the fullest null (C12).');
  log('    quantity                                      b_A         b_z       b_med');
  const SE = (k, f) => S(k, f) / Math.sqrt(REPS);
  const q = (tag, va, vz, vm) => log('    ' + tag.padEnd(40) + F(va, 4).padStart(9) + '  ' +
    F(vz, 4).padStart(10) + '  ' + F(vm, 4).padStart(10));
  const qe = (tag, k) => log('    ' + tag.padEnd(40) +
    (F(M(k, 'bA'), 4) + '+-' + F(SE(k, 'bA'), 4)).padStart(16) + '  ' +
    (F(M(k, 'bZ'), 4) + '+-' + F(SE(k, 'bZ'), 4)).padStart(16) + '  ' +
    (F(M(k, 'bM'), 4) + '+-' + F(SE(k, 'bM'), 4)).padStart(16));
  q('data (the adopted ladder)', dB.bA, dB.bZ, dB.bMed);
  qe('carried by N0, the published null', 'N0');
  qe('carried by C1 alone', 'C1');
  qe('carried by C2 alone', 'C2');
  qe('carried by C12, the fullest null', 'C12');
  q('RESIDUAL, data - C12', dB.bA - M('C12', 'bA'), dB.bZ - M('C12', 'bZ'), dB.bMed - M('C12', 'bM'));
  log('    (the +- on the four null rows is the STANDARD ERROR of the ensemble mean');
  log('     at ' + REPS + ' replicates, not the ensemble sd, which is in S5 and is the');
  log('     band a single realisation carries.)');
  log('    plug-in comparison: object-models-read-0829.md §4 D3 computes b_null = 0.167');
  log('    by hand from A_null = 0.9895 and the DATA\'s mean_k(1/L_k) = 0.06269. The');
  log('    ensemble mean of the estimator itself reads ' + F(M('N0', 'bA'), 4) + ' +- ' + F(SE('N0', 'bA'), 4) +
      ', which is ' + F((0.16749 - M('N0', 'bA')) / SE('N0', 'bA'), 1) + ' s.e. away:');
  log('    the hand arithmetic is CONFIRMED within Monte-Carlo error, not corrected.');
  log('    ' + 'fraction of data b carried by C12'.padEnd(40) +
      F(100 * M('C12', 'bA') / dB.bA, 1).padStart(8) + '%  ' +
      F(100 * M('C12', 'bZ') / dB.bZ, 1).padStart(9) + '%  ' +
      F(100 * M('C12', 'bM') / dB.bMed, 1).padStart(9) + '%');
  log('    ' + 'fraction carried by N0 alone (the 15%)'.padEnd(40) +
      F(100 * M('N0', 'bA') / dB.bA, 1).padStart(8) + '%  ' +
      F(100 * M('N0', 'bZ') / dB.bZ, 1).padStart(9) + '%  ' +
      F(100 * M('N0', 'bM') / dB.bMed, 1).padStart(9) + '%');
  log('    ' + 'residual in ensemble sd of C12'.padEnd(40) +
      F((dB.bA - M('C12', 'bA')) / S('C12', 'bA'), 2).padStart(8) + '   ' +
      F((dB.bZ - M('C12', 'bZ')) / S('C12', 'bZ'), 2).padStart(9) + '   ' +
      F((dB.bMed - M('C12', 'bM')) / S('C12', 'bM'), 2).padStart(9));
  log('');
  log('  THE TWO ESTIMATORS, before and after the null is subtracted. If the 15%');
  log('  disagreement were an estimation defect it would survive subtraction.');
  log('    raw:        b_A = ' + F(dB.bA, 4) + ', b_z = ' + F(dB.bZ, 4) +
      ', ratio ' + F(dB.bZ / dB.bA, 4));
  log('    residual:   b_A = ' + F(dB.bA - M('C12', 'bA'), 4) + ', b_z = ' +
      F(dB.bZ - M('C12', 'bZ'), 4) + ', ratio ' + F((dB.bZ - M('C12', 'bZ')) / (dB.bA - M('C12', 'bA')), 4));
}
log('');

// ---- S7. the lattice claim in the two units --------------------------------
prog('S7 lattice units');
{
  const M = (k, f) => mean(RES[k][f]);
  log('S7. THE CITED 1.7e-4, checked in both units (record-location-null.md §8:');
  log('  "the lattice spacing is 6 against gaps of 3.6e4, a 1.7e-4 perturbation ...');
  log('  two orders below the effect").');
  log('    x        abar     L       6/g_record   3/abar    predicted d z = -3(L-1)/abar');
  for (const x of [1e4, 1e8, 1e12, 1e16]) {
    const ab = abar(x), L = Math.log(x / ab), g = ab * L;
    log('    ' + x.toExponential(0).padStart(6) + '  ' + F(ab, 1).padStart(7) + '  ' + F(L, 2).padStart(6) +
        '   ' + (6 / g).toExponential(2).padStart(10) + '   ' + (3 / ab).toExponential(2).padStart(9) +
        '        ' + F(-3 * (L - 1) / ab, 4).padStart(8));
  }
  log('    top of the adopted ladder: 6/35640 = ' + (6 / 35640).toExponential(2) +
      ', which is the cited number.');
  log('    measured lattice effect in b units (C2 - N0e): d b_z = ' +
      F(M('C2', 'bZ') - M('N0e', 'bZ'), 4) + ', d b_A = ' + F(M('C2', 'bA') - M('N0e', 'bA'), 4) + ',');
  log('    against b_data(z) = ' + F(dB.bZ, 4) + ': ' +
      F(100 * (M('C2', 'bZ') - M('N0e', 'bZ')) / dB.bZ, 1) + '% of the effect.');
}
log('');

// ---- S8. the second lattice law, and the derived form of the lattice effect --
prog('S8 second lattice law');
{
  const M = (k, f) => mean(RES[k][f]);
  const pd = (a, b, f) => RES[a][f].map((v, i) => v - RES[b][f][i]);
  const pstr = (a, b, f) => { const d = pd(a, b, f);
    return F(mean(d), 4) + ' +- ' + F(sd(d) / Math.sqrt(d.length), 4); };
  log('S8. THE SECOND LATTICE LAW (owed check 1). C2n rounds to the NEAREST');
  log('  multiple of 6 with a floor at 6; C2 rounds UP. Both are mean-matched to');
  log('  abar by solving for their OWN continuous scale, so they differ in scale,');
  log('  not in mean. The scale each law needs, and the mean it then delivers:');
  log('    x        abar      s(round UP)   s(to NEAREST)   mean under NEAREST   rel err');
  let worst = 0;
  for (const x of [1e2, 1e4, 1e8, 1e12, 1e16]) {
    const ab = abar(x), sc = scLat(x), sr = scLatRound(x), m = Mround(sr);
    const rel = Math.abs(m / ab - 1); if (rel > worst) worst = rel;
    log('    ' + x.toExponential(0).padStart(6) + '  ' + F(ab, 4).padStart(9) + '  ' +
        F(sc, 4).padStart(12) + '  ' + F(sr, 4).padStart(14) + '  ' + F(m, 6).padStart(19) +
        '   ' + rel.toExponential(1));
  }
  if (worst > 1e-6) fail('the round-to-nearest law is not mean-matched');
  {
    const rnd = mulberry32(0x2B77CE), xt = 1e4, sr = scLatRound(xt);
    let acc = 0; const K = 2000000;
    for (let i = 0; i < K; i++) { let u = rnd(); if (u > 1 - 1e-12) u = 1 - 1e-12;
      acc += Math.max(6, 6 * Math.round((-Math.log(1 - u) * sr) / 6)); }
    log('    empirical, 2e6 draws at x = 1e4: mean gap ' + F(acc / K, 4) + ' against abar = ' +
        F(abar(xt), 4) + ', ' + F(100 * (acc / K / abar(xt) - 1), 3) + '%. All gaps 0 mod 6.');
  }
  log('  PAIRED DELTAS against the same N0e baseline, same common random numbers:');
  log('    law                                       d b_A                d b_z              d b_med');
  log('    ' + 'C2  rounding UP (the law of S5-S7)'.padEnd(36) + pstr('C2', 'N0e', 'bA').padStart(17) +
      '  ' + pstr('C2', 'N0e', 'bZ').padStart(17) + '  ' + pstr('C2', 'N0e', 'bM').padStart(17));
  log('    ' + 'C2n rounding to NEAREST'.padEnd(36) + pstr('C2n', 'N0e', 'bA').padStart(17) +
      '  ' + pstr('C2n', 'N0e', 'bZ').padStart(17) + '  ' + pstr('C2n', 'N0e', 'bM').padStart(17));
  log('    ' + 'difference between the two laws'.padEnd(36) + pstr('C2', 'C2n', 'bA').padStart(17) +
      '  ' + pstr('C2', 'C2n', 'bZ').padStart(17) + '  ' + pstr('C2', 'C2n', 'bM').padStart(17));
  // the derived form: d b = mean_k[ (abar - s) L_k - r ] / abar_k, r the rounding gain
  const pred = (scf, r) => mean(N0eHeights.map(e => {
    const ab = abar(e), L = Math.log(e / ab);
    return ((ab - scf(e)) * L - r) / ab; }));
  const pCeil = pred(scLat, 3), pRound = pred(scLatRound, 0);
  log('  DERIVED, not fitted: mean-matching fixes a lattice law\'s MEAN but not its');
  log('  SCALE, and a record is governed by the scale. With rounding gain r the');
  log('  prediction is d b = mean_k[ (abar - s)L_k - r ]/abar_k over the null\'s own');
  log('  ' + N0eHeights.length + ' pooled record heights:');
  log('    C2  (r = 3): predicted ' + F(pCeil, 4) + ' against measured ' + F(M('C2', 'bZ') - M('N0e', 'bZ'), 4) +
      ', ratio ' + F(pCeil / (M('C2', 'bZ') - M('N0e', 'bZ')), 3));
  log('    C2n (r = 0): predicted ' + F(pRound, 4) + ' against measured ' + F(M('C2n', 'bZ') - M('N0e', 'bZ'), 4) +
      ', ratio ' + F(pRound / (M('C2n', 'bZ') - M('N0e', 'bZ')), 3));
  log('  Mean scale offset abar - s: ' + F(mean(N0eHeights.map(e => abar(e) - scLat(e))), 4) +
      ' under rounding UP, ' + F(mean(N0eHeights.map(e => abar(e) - scLatRound(e))), 4) +
      ' under rounding to NEAREST.');
  log('  DECOMPOSITION UNDER THE SECOND LAW: b carried by C2n alone = ' + F(M('C2n', 'bZ'), 4) +
      ' (b_z),');
  log('    against ' + F(M('C2', 'bZ'), 4) + ' under C2 and ' + F(M('N0', 'bZ'), 4) +
      ' under the published null; fraction of b_data carried = ' +
      F(100 * M('C2n', 'bZ') / dB.bZ, 1) + '% against ' + F(100 * M('C2', 'bZ') / dB.bZ, 1) + '%.');
}
log('');

// ---- S9. a sigma for the shape contrast -------------------------------------
prog('S9 shape contrast');
{
  const M = (k, f) => mean(RES[k][f]), S = (k, f) => sd(RES[k][f]);
  const dataD = dB.bMed - dB.bZ;
  log('S9. A SIGMA FOR THE SHAPE CONTRAST (owed check 2). D = b_med - b_z =');
  log('  mean(z) - median(z), the mean-against-median gap of the standardized');
  log('  record gaps. The location comparison this family runs assumes the data');
  log('  and null z distributions have the SAME shape; D, sd(z) and skew(z) test it.');
  log('    statistic        data      null (ensemble mean +- sd)        z        MC tail');
  const line = (tag, dv, k, f) => {
    const v = RES[k][f], m = mean(v), sv = sd(v);
    const tail = v.filter(t => t <= dv).length;
    log('    ' + tag.padEnd(15) + F(dv, 4).padStart(8) + '      ' +
        (F(m, 4) + ' +- ' + F(sv, 4)).padStart(18) + '   ' + F((dv - m) / sv, 2).padStart(7) +
        '     ' + tail + '/' + v.length);
  };
  const Dv = (k) => RES[k].bM.map((v, i) => v - RES[k].bZ[i]);
  for (const k of ['N0', 'C12', 'C2n']) {
    RES[k].D = Dv(k);
    line('D, vs ' + k.padEnd(3), dataD, k, 'D');
  }
  line('sd(z), vs N0 ', data.zSd, 'N0', 'zSd');
  line('skew(z), vs N0', mean(data.z.map(v => Math.pow((v - data.zMean) / data.zSd, 3))), 'N0', 'zSk');
  log('  The data z distribution is nearly symmetric where the null\'s is strongly');
  log('  right-skewed; the three rows above are the size of that in sigma.');
}
log('');
log('END. Reps per new ensemble: ' + REPS + '. Seeds: N0 0xC0FFEE, BIG 0x5EED00,');
log('  N0e 0x11AA00, C1 0x22BB00, C2 0x33CC00, C12 0x44DD00, lattice check 0x1A771CE,');
log('  count check 0x0DDBA11 (all + rep index). Window [1e4, 7.0512e16], WLO 1e4.');
prog('done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/measure-record-null2-0829.js
//   invocation:  node research/measure-record-null2-0829.js
//   code-sha256: bf88f2a13b4645667a1a167d5551721520d5362eca28cf8d1996b26914368206
//   out-sha256:  67c6b5d30f826def0ef30d7ecd52eaa601c45ec9b116d7fbed07d145e4f372a8
//   body-lines:  169
//   inputs:      research/a113274-gap-records.js@b64796044e4b
//   forced:      2026-08-29, 0 of 173 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     114.5 s
// ============================================================================
// MEASURE-RECORD-NULL2 (0829) — C1 inhomogeneous + C2 latticed record nulls,
//   and the decomposition of Kourbatov b. Ladder: 82 records, extracted from
//   research/a113274-gap-records.js at runtime. Category (i), null-side only.
//
// S1 CUSTODY GATE. All 15 published record-block figures of zonegap-03-model.js
//   §(b) AND all 13 corrected-null figures of record-location-null.js (N0 z,
//   the 5000-rep ensemble, N2 conditional-on-N, N3 marginal-subtracted)
//   reproduced from the same seeds, digit for digit: 28/28. The estimator and
//   the null are those files', unmodified. This is the first time the family
//   runs inside output custody.
//   The reproduced values, printed so that no reading of this file quotes a
//   number the block does not carry:
//     data n = 72               data A = 0.9295           data zMean = -1.298
//     data zSd = 1.021          data rate = 2.562         data dCV = 0.908
//     null N = 68.4             null N sd = 7.9           null A = 0.9895
//     null A sd = 0.0182        null zMean = -0.212       null zMean sd = 0.244
//     null zSd = 1.264          null rate = 2.356         null dCV = 0.944
//     N0 z = -3.3               BIG A = 0.9891            BIG A sd = 0.0178
//     BIG z = -3.34             N2 corr = -0.703          N2 slope = -0.00162
//     N2 condMean = 0.9833      N2 sRes = 0.0127          N2 z = -4.24
//     N3 data = 0.9413          N3 null = 1.0014          N3 def = 6.01
//     N3 z = -3.33
//   CONVENTION, stated because it is not stated in the note being reproduced:
//     the 1e15 cut is on the WHOLE ladder, no lower cut, n = 71. Applying this
//     family's standing window floor WLO = 1e4 to the same cut gives n = 61 and b_med = 1.398,
//     which is NOT the published match; the ten records below 1e4 are load-bearing.
//   And all 6 b figures of lit-kourbatov-shortfall.md §5, including the
//   four-digit median-unbiased b = 1.2597 at Kourbatov's own cut
//   e < 1e15 on n = 71 records: 6/6.
//
// S2. P1, THE ESTIMATOR IDENTITY (arithmetic on the 72 ladder records; not a
//   measurement and not a simulation).
//   b_A  = sum(-z/L)/sum(1/L) = 1.1251215136   (1/L-WEIGHTED mean of -z)
//   b_A  = (1 - A)/mean(1/L)  = 1.1251215136   (the published route)
//   |difference| = 3.77e-15
//   b_z  = -mean(z)           = 1.2980691760   (UNWEIGHTED mean of -z)
//   b_A - b_z                 = -0.1729476625
//   cov(-z, w)/mean(w), w=1/L = -0.1729476625
//   |difference| = 1.11e-15
//   So the 15% disagreement is a WEIGHTED against an UNWEIGHTED mean of one
//   vector of 72 numbers, and is nonzero exactly because b varies with height.
//
// S3. CHK3, the C2 gap law, checked before it is used.
//     x        abar(x)      q = 1-6/abar   s = -6/ln q   E[6*ceil(Exp(s)/6)]   rel err
//       1e+2     16.0624     0.626457       12.8294        16.062420        2.2e-16
//       1e+4     64.2497     0.906614       61.2007        64.249679        4.4e-16
//       1e+8    256.9987     0.976654      253.9869       256.998717        2.0e-15
//      1e+12    578.2471     0.989624      575.2419       578.247113        1.3e-15
//      1e+16   1027.9949     0.994163     1024.9919      1027.994867        2.0e-15
//     empirical, 2e6 draws at x = 1e4: mean gap 64.2619 against abar = 64.2497, 0.019% (s.e. 0.071%). All drawn gaps are 0 mod 6 by construction.
//
// S4. CHK4, the C1 inversion against the integral it is supposed to realise.
//   Expected pair count on [100, 1e7] = 2C2 * int dt/ln^2 t = 58740.28  (Simpson, 200000 panels).
//   C1 (inhomogeneous), 2000 reps: mean count 58738.62, -0.0028% off the integral, -0.32 s.e.
//   N0 (frozen left endpoint), SAME uniforms: mean count 58741.11, 0.0014% off, 0.16 s.e.
//   Paired difference N0 - C1 = 2.489 +- 0.036 pairs on 58740, i.e. 4.24e-5 relative.
//   So the frozen-endpoint construction generates the pair count right to a few
//   parts in 1e5 below 1e7; that, and not a bias in the count, is the size of
//   what C1 corrects there.
// S5. THE FIVE ENSEMBLES, 2000 seeded replicates each, COMMON RANDOM
//   NUMBERS: every variant sees the same two uniform streams at the same
//   indices, so the deltas of S6 are paired. Same window [1e4, 7.05e16], same
//   estimator, b read in both in-house normalisations plus the median.
//   b_A is the 1/L-weighted mean of -z (the A route); b_z the unweighted mean
//   (Kourbatov's own definition); b_med the median (his median-unbiased b).
//   Mean +- ensemble sd.
//
//   ensemble                                                   N        A            b_A              b_z              b_med
//   N0  published (Gumbel blocks, frozen abar, continuous)   68.4   0.9887   0.1639 +- 0.2541   0.2147 +- 0.2350   0.4255 +- 0.2505
//   N0e baseline   (exact blocks,  frozen abar, continuous)  68.4   0.9887   0.1639 +- 0.2541   0.2147 +- 0.2350   0.4255 +- 0.2505
//   C1  inhomogen. (exact blocks,  1/abar(t),   continuous)  68.4   0.9889   0.1610 +- 0.2545   0.2135 +- 0.2352   0.4242 +- 0.2510
//   C2  latticed   (exact blocks,  frozen abar, gaps on 6Z)  68.1   0.9801   0.2912 +- 0.2496   0.3260 +- 0.2323   0.5350 +- 0.2469
//   C12 both       (exact blocks,  1/abar(t),   gaps on 6Z)  68.1   0.9803   0.2884 +- 0.2497   0.3249 +- 0.2325   0.5335 +- 0.2473
//   C2n second law (exact blocks,  frozen abar, 6Z, to NEAREST) 67.7   0.9893   0.1561 +- 0.2543   0.2087 +- 0.2356   0.4190 +- 0.2520
//   DATA (the adopted ladder, 82 records, 72 in window)        72   0.9295             1.1251             1.2981             1.3159
//
// S6. THE DELTAS, PAIRED. Each is the mean of a per-replicate difference on
//   common random numbers, with the standard error of that paired mean.
//     effect                                    d b_A                d b_z              d b_med
//     block form (N0e - N0), a control    -0.0000 +- 0.0000  -0.0000 +- 0.0000  -0.0000 +- 0.0000
//       (that control at full precision, b_z: -7.56e-7 +- 1.58e-8)
//       On common random numbers the exact block maximum and the published
//       Gumbel block maximum select the same records at the same heights, so
//       the block form is not a route to any part of b.
//     C1 inhomogeneous (C1 - N0e)         -0.0029 +- 0.0003  -0.0012 +- 0.0001  -0.0013 +- 0.0002
//     C2 lattice (C2 - N0e)                0.1273 +- 0.0005   0.1113 +- 0.0003   0.1095 +- 0.0007
//     C1+C2 jointly (C12 - N0e)            0.1245 +- 0.0005   0.1101 +- 0.0003   0.1080 +- 0.0007
//     additivity check: (C1-N0e)+(C2-N0e) vs (C12-N0e) =  0.1245 vs 0.1245  (b_A);  0.1101 vs 0.1101  (b_z)
//
//   THE DECOMPOSITION OF b, in each normalisation. "carried" = the ensemble
//   mean of b under that null, i.e. what the null reproduces with no twin-prime
//   arithmetic in it at all. "residual" = data minus the fullest null (C12).
//     quantity                                      b_A         b_z       b_med
//     data (the adopted ladder)                  1.1251      1.2981      1.3159
//     carried by N0, the published null         0.1639+-0.0057    0.2147+-0.0053    0.4255+-0.0056
//     carried by C1 alone                       0.1610+-0.0057    0.2135+-0.0053    0.4242+-0.0056
//     carried by C2 alone                       0.2912+-0.0056    0.3260+-0.0052    0.5350+-0.0055
//     carried by C12, the fullest null          0.2884+-0.0056    0.3249+-0.0052    0.5335+-0.0055
//     RESIDUAL, data - C12                       0.8367      0.9732      0.7824
//     (the +- on the four null rows is the STANDARD ERROR of the ensemble mean
//      at 2000 replicates, not the ensemble sd, which is in S5 and is the
//      band a single realisation carries.)
//     plug-in comparison: object-models-read-0829.md §4 D3 computes b_null = 0.167
//     by hand from A_null = 0.9895 and the DATA's mean_k(1/L_k) = 0.06269. The
//     ensemble mean of the estimator itself reads 0.1639 +- 0.0057, which is 0.6 s.e. away:
//     the hand arithmetic is CONFIRMED within Monte-Carlo error, not corrected.
//     fraction of data b carried by C12           25.6%       25.0%       40.5%
//     fraction carried by N0 alone (the 15%)      14.6%       16.5%       32.3%
//     residual in ensemble sd of C12              3.35        4.19        3.16
//
//   THE TWO ESTIMATORS, before and after the null is subtracted. If the 15%
//   disagreement were an estimation defect it would survive subtraction.
//     raw:        b_A = 1.1251, b_z = 1.2981, ratio 1.1537
//     residual:   b_A = 0.8367, b_z = 0.9732, ratio 1.1631
//
// S7. THE CITED 1.7e-4, checked in both units (record-location-null.md §8:
//   "the lattice spacing is 6 against gaps of 3.6e4, a 1.7e-4 perturbation ...
//   two orders below the effect").
//     x        abar     L       6/g_record   3/abar    predicted d z = -3(L-1)/abar
//       1e+4     64.2    5.05      1.85e-2     4.67e-2         -0.1890
//       1e+8    257.0   12.87      1.81e-3     1.17e-2         -0.1386
//      1e+12    578.2   21.27      4.88e-4     5.19e-3         -0.1052
//      1e+16   1028.0   29.91      1.95e-4     2.92e-3         -0.0844
//     top of the adopted ladder: 6/35640 = 1.68e-4, which is the cited number.
//     measured lattice effect in b units (C2 - N0e): d b_z = 0.1113, d b_A = 0.1273,
//     against b_data(z) = 1.2981: 8.6% of the effect.
//
// S8. THE SECOND LATTICE LAW (owed check 1). C2n rounds to the NEAREST
//   multiple of 6 with a floor at 6; C2 rounds UP. Both are mean-matched to
//   abar by solving for their OWN continuous scale, so they differ in scale,
//   not in mean. The scale each law needs, and the mean it then delivers:
//     x        abar      s(round UP)   s(to NEAREST)   mean under NEAREST   rel err
//       1e+2    16.0624       12.8294         15.0790            16.062420   8.9e-16
//       1e+4    64.2497       61.2007         63.9983            64.249680   7.7e-9
//       1e+8   256.9987      253.9869        256.9349           256.998717   2.2e-16
//      1e+12   578.2471      575.2419        578.2187           578.247113   8.7e-10
//      1e+16  1027.9949     1024.9919       1027.9788          1027.994868   4.9e-10
//     empirical, 2e6 draws at x = 1e4: mean gap 64.2387 against abar = 64.2497, -0.017%. All gaps 0 mod 6.
//   PAIRED DELTAS against the same N0e baseline, same common random numbers:
//     law                                       d b_A                d b_z              d b_med
//     C2  rounding UP (the law of S5-S7)   0.1273 +- 0.0005   0.1113 +- 0.0003   0.1095 +- 0.0007
//     C2n rounding to NEAREST             -0.0077 +- 0.0005  -0.0060 +- 0.0003  -0.0065 +- 0.0006
//     difference between the two laws      0.1351 +- 0.0005   0.1173 +- 0.0003   0.1160 +- 0.0007
//   DERIVED, not fitted: mean-matching fixes a lattice law's MEAN but not its
//   SCALE, and a record is governed by the scale. With rounding gain r the
//   prediction is d b = mean_k[ (abar - s)L_k - r ]/abar_k over the null's own
//   136859 pooled record heights:
//     C2  (r = 3): predicted 0.1212 against measured 0.1113, ratio 1.089
//     C2n (r = 0): predicted 0.0031 against measured -0.0060, ratio -0.514
//   Mean scale offset abar - s: 3.0105 under rounding UP, 0.0563 under rounding to NEAREST.
//   DECOMPOSITION UNDER THE SECOND LAW: b carried by C2n alone = 0.2087 (b_z),
//     against 0.3260 under C2 and 0.2147 under the published null; fraction of b_data carried = 16.1% against 25.1%.
//
// S9. A SIGMA FOR THE SHAPE CONTRAST (owed check 2). D = b_med - b_z =
//   mean(z) - median(z), the mean-against-median gap of the standardized
//   record gaps. The location comparison this family runs assumes the data
//   and null z distributions have the SAME shape; D, sd(z) and skew(z) test it.
//     statistic        data      null (ensemble mean +- sd)        z        MC tail
//     D, vs N0         0.0179        0.2108 +- 0.1179     -1.64     85/2000
//     D, vs C12        0.0179        0.2086 +- 0.1160     -1.64     81/2000
//     D, vs C2n        0.0179        0.2103 +- 0.1184     -1.62     86/2000
//     sd(z), vs N0     1.0213        1.2487 +- 0.1771     -1.28     170/2000
//     skew(z), vs N0   0.5446        1.0415 +- 0.5158     -0.96     278/2000
//   The data z distribution is nearly symmetric where the null's is strongly
//   right-skewed; the three rows above are the size of that in sigma.
//
// END. Reps per new ensemble: 2000. Seeds: N0 0xC0FFEE, BIG 0x5EED00,
//   N0e 0x11AA00, C1 0x22BB00, C2 0x33CC00, C12 0x44DD00, lattice check 0x1A771CE,
//   count check 0x0DDBA11 (all + rep index). Window [1e4, 7.0512e16], WLO 1e4.
// ============================================================================
// READINGS
// ============================================================================
// Written after reading the block above. Every figure quoted appears there.
// Calibration marked per reading. Category (i) throughout: null-side only, no
// statement about T and none about the Zone Postulate.
//
// R1 [VERIFIED, 34/34]. The family is inside output custody for the first time.
//   S1 reproduces, from the same seeds and digit for digit, all 15 published
//   record-block figures of zonegap-03-model.js §(b), all 13 corrected-null
//   figures of record-location-null.js (N0 z = -3.30, the 5000-rep ensemble
//   A = 0.9891 +- 0.0178 at z = -3.34, N2's corr -0.703 / slope -0.00162 /
//   E[A|N=72] = 0.9833 / sd 0.0127 / z = -4.24, N3's 0.9413 against 1.0014 at
//   6.01% and z = -3.33), and all 6 b figures of lit-kourbatov-shortfall.md §5
//   including the median-unbiased b = 1.2597 at Kourbatov's own cut e < 1e15 on
//   n = 71. One correction to the corpus falls out of the gate: that cut is on
//   the WHOLE ladder with no lower cut, ten of whose records sit below the
//   window floor WLO = 1e4; taking it inside the window gives n = 61 and
//   b_med as printed in S1, not 1.2597.
//
// R2 [ARITHMETIC, exact to 3.77e-15; this is an identity, not a measurement].
//   S2 settles the 15% disagreement between the two in-house estimators of b
//   that lit-kourbatov-shortfall.md §5 records and TODO Z5 asks to pin.
//   b_A = sum(-z/L)/sum(1/L) = 1.1251215136 and b_z = -mean(z) = 1.2980691760
//   are the 1/L-WEIGHTED and the UNWEIGHTED mean of ONE vector of 72 numbers,
//   and their difference -0.1729476625 equals cov(-z, 1/L)/mean(1/L) to 1e-15.
//   So the disagreement is not estimation error and cannot be reduced by more
//   data: it is a weighting choice, nonzero exactly because b varies with
//   height, and it survives subtraction of the null unchanged (ratio 1.1537
//   raw, 1.1631 on the residual). Consequence for "pin b": b_z or b_med, which
//   are Kourbatov's own definitions, are the estimators to quote; b_A is a
//   trend-load summary and is a poor estimator of b.
//
// R3 [MEASURED, 2000 paired replicates]. C1, the inhomogeneous-intensity null,
//   moves b by d b_A = -0.0029 +- 0.0003, d b_z = -0.0012 +- 0.0001,
//   d b_med = -0.0013 +- 0.0002. Sign negative as pre-registered, magnitude an
//   order below the pre-registered band and two below its falsifier.
//   The reason is visible in S4: over [100, 1e7] the frozen-endpoint
//   construction and the true inhomogeneous process differ by 2.489 +- 0.036
//   pairs on 58,740, i.e. 4.24e-5 relative, so there is almost nothing for C1
//   to correct. **C1 is a NEGATIVE result and it is the decisive one for the
//   item:** the trend's own varying intensity does NOT carry b.
//
// R4 [MEASURED, 2000 paired replicates]. C2, the 6Z lattice, moves b by
//   d b_A = +0.1273 +- 0.0005, d b_z = +0.1113 +- 0.0003,
//   d b_med = +0.1095 +- 0.0007: positive, and inside the pre-registered
//   pre-registered band. In relative terms that is 8.6% of b_data, which is
//   THREE ORDERS above record-location-null.md §8's argued 1.7e-4 and about
//   half again the whole fixed-abar null's own b. The cited argument fails by a
//   category slip that S7 shows in both units: 6/g_record = 1.95e-4 at 1e16,
//   but the quantity that governs the null is 3/abar = 2.92e-3, and it enters
//   b multiplied by L, giving the predicted d z = -3(L-1)/abar = -0.0844 there
//   and -0.1890 at 1e4. The lattice law is mean-matched analytically
//   (S3, worst 2.0e-15) and to 0.019% on 2e6 draws before it is used, so this
//   is not a mis-scaled null.
//
// R5 [MEASURED]. The decomposition, in three normalisations, of a data b of
//   1.1251 (A route) / 1.2981 (z route) / 1.3159 (median):
//     carried by N0, the published null   0.1639 / 0.2147 / 0.4255
//     carried by C12, the fullest null    0.2884 / 0.3249 / 0.5335
//     RESIDUAL                            0.8367 / 0.9732 / 0.7824
//     fraction carried by C12              25.6% /  25.0% /  40.5%
//   The residual sits at 3.35 / 4.19 / 3.16 ensemble sd of C12, which is the
//   same 3.3-to-4.3 band record-location-null.md already carries; adding both
//   nulls does not move the deficit out of significance. The "about 15%" of
//   object-models-read-0829.md §4 D3 is CONFIRMED for N0 as a plug-in estimate
//   (its 0.167 is 0.6 s.e. from the ensemble mean 0.1639 +- 0.0057) and is
//   REPLACED as the answer to the item's question by 25%, all of the increase
//   being lattice. In the median normalisation, which is Kourbatov's own, the
//   fraction is 40.5%: the headline "how much of b is the null's" has no single
//   value and the normalisation must be quoted with it.
//
// R6 [MEASURED, control]. The published Gumbel block maximum and the exact
//   block-maximum inversion select the same records at the same heights on
//   common random numbers: d b_z = -7.56e-7 +- 1.58e-8. The block
//   approximation is not a route to any part of b, which agrees in sign and
//   size with record-location-null.md's R2 (cited, not recomputed).
//
// R7 [MEASURED]. On common random numbers the two effects are exactly additive
//   to four decimals: (C1-N0e) + (C2-N0e) = 0.1245 = (C12-N0e) in the A route
//   and 0.1101 in the z route. There is no interaction term to attribute.
//
// R8 [OPEN, and this is what the note leaves]. After both nulls, 0.7824 to 0.9732
//   of b, three quarters of the effect, is a residual against a conjectural
//   null and has no mechanism in either corpus. Nothing here touches that.
//
// ---- second pass, 2026-08-29: the two owed checks (S8, S9) ------------------
//
// R9 [MEASURED, 2000 paired replicates]. THE LATTICE SHARE IS LAW-DEPENDENT,
//   and this WEAKENS R4 and R5. C2n, rounding to the NEAREST multiple of 6
//   instead of UP, mean-matched to abar to 7.7e-9 analytically and -0.017% on
//   2e6 draws, gives d b_z = -0.0060 +- 0.0003 where C2 gives +0.1113 +-
//   0.0003; the two laws differ by 0.1173 +- 0.0003. So "gaps live on 6Z" does
//   not by itself carry any of b: the two defensible mean-matched laws bracket
//   the lattice share at [-0.006, +0.111], and the null-side share of b_data in
//   the z normalisation runs 16.1% to 25.1% against the published null's own
//   16.5%. R4's +0.1113 and R5's 25.0% are the UPPER END of a bracket, not
//   numbers. The correction to record-location-null.md §8 stands in a weaker
//   form: its 1.7e-4 is wrong, and no single number replaces it.
//   Mechanism, derived rather than fitted: mean-matching fixes a lattice law's
//   MEAN but not its SCALE, and a record is governed by the scale. The mean
//   scale offset abar - s is 3.0105 under rounding up against 0.0563 under
//   rounding to nearest, a factor of 53. The predicted d b from
//   mean_k[(abar-s)L_k - r]/abar_k reads 0.1212 against a measured 0.1113 for
//   rounding up, ratio 1.089, and 0.0031 against -0.0060 for rounding to
//   nearest, ratio -0.514: the derivation holds at the large offset and gets
//   the SIGN WRONG at the small one, so it is reported as valid for the first
//   case only.
//   Which law is right is NOT SETTLED: rounding up gives the memoryless law on
//   6Z, which preserves the exponential null's defining property; rounding to
//   nearest preserves the mean only. The bracket is the weaker report and is
//   the one taken.
//
// R10 [MEASURED, 2000 replicates]. THE SHAPE EXPOSURE FLAGGED IN R5's note
//   STAYS OPEN, now with a size. D = mean(z) - median(z) reads 0.0179 in the
//   data against 0.2108 +- 0.1179 under N0, z = -1.64, MC tail 85/2000; the
//   same contrast against C12 and C2n reads -1.64 and -1.62. Two further shape
//   statistics point the same way and no further: sd(z) at -1.28 and skew(z)
//   at -0.96. The data's z distribution is less skewed, less dispersed and has
//   a smaller mean-median gap than the null's, consistently in direction, and
//   NO single contrast reaches two sigma while the three are not independent of
//   each other. Neither falsifier fires: |z| > 3 would have compromised every b
//   reading in this family, |z| < 1 would have closed the exposure. The b
//   readings above are location readings taken under a shape assumption that is
//   neither confirmed nor refuted at this n.
//
// R11 [disclosed]. This tail is a --force re-embed: the previous tail was
//   bound and the output changed because S5 gained a sixth ensemble row and
//   S8 and S9 were appended. embed.js's own guard reports 0 of 173 figures in
//   the replaced block not reproduced, and an independent diff of the old
//   block against the new run is line-for-line identical from the first line to
//   the end of S7 with exactly one insertion, the C2n row. No figure in R1
//   through R8 moves.
