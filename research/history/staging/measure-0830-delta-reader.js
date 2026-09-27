// measure-0830-delta-reader.js  —  TODO 1d: a delta-reader that passes its control
//
// SCRATCHPAD-GRADE. Arithmetic only: no enumeration, no new G2 value. Every
// ladder term is PARSED from the corpus keepers (never retyped):
//   research/exact-g2-ladder.js               14 custody-exact G2 terms
//   research/import-interp-01-bgt-defect.js   the 22-term A144311 column (+1)
//   research/exponent-control.js              the 64-term A048670 control h
//
// NOTATION. Ghat(t) = G2(P(t)#), P(t) the largest ladder prime <= t, f = ln Ghat.
// The control is hhat(t) = h(P(t)#). The target is the SIGN of delta in a law
// c n^beta (ln n)^delta (sign lemma, attack-0829n-hsubpow-K.md 3b: all-bases
// (H-sub-pow) holds with finite K iff delta >= 0).
//
// SECTIONS (the note's pre-registration, measure-0830-delta-reader.md 3, was
// written BEFORE this file ran; the G2 gate in SEC F is that pre-registration
// made mechanical):
//  A. custody: the three ladders parse and agree on overlap.
//  B. R0, the diagonal meter D(b,1) = f(b^2) - 2 f(b) on ln ln b, reproduced
//     digit for digit against attack-0829n-hsubpow-K.js SEC E.
//  C. diagnosis of R0 on the control: slope vs reach, leave-one-out, rounding
//     isolated on stepped synthetic laws, the (1 + a/ln n) family.
//  D. readers RA (chain second differences), RB (pinned beta), RC2 (base-2
//     ratios), RC (all power-pair ratios), RD (joint 3-parameter fit) on
//     stepped, integer-rounded synthetic laws, delta in {-1,0,1,2}, in the
//     control's geometry (64 primes, beta 1) and G2's (22 primes, beta 1.5);
//     criteria S1, S2; the noise Monte Carlo S3 (reported, not scored).
//  E. the same readers on the real control at reach 312 (C1) and at G2's
//     reach 82 (C2).
//  F. the gate: a reader's G2 reading is printed only if S1, S2, C1, C2 all
//     hold; otherwise "withheld".
//
// No wall-clock figure is printed to stdout.
// usage: node research/history/staging/measure-0830-delta-reader.js

'use strict';

const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..');
const R = (p) => fs.readFileSync(path.join(REPO, p), 'utf8');
const F = (v, d = 4) => (Number.isFinite(v) ? (v >= 0 ? ' ' : '') + v.toFixed(d) : '   n/a');
const pad = (s, n) => String(s).padStart(n);
let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) FAILS++;
  console.log('  ' + (ok ? 'ok  ' : 'FAIL') + '  ' + label + (detail ? '   ' + detail : ''));
}
function sievePrimes(n) {
  const s = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return out;
}

// ---- general OLS: rows X (arrays), y; intercept optional; returns coef, se, n
function ols(X, y, intercept) {
  const n = y.length; const k0 = X[0].length; const k = k0 + (intercept ? 1 : 0);
  const rows = X.map((r) => (intercept ? [1, ...r] : r.slice()));
  const A = Array.from({ length: k }, () => new Array(k).fill(0)); const b = new Array(k).fill(0);
  for (let i = 0; i < n; i++) for (let p = 0; p < k; p++) { b[p] += rows[i][p] * y[i]; for (let q = 0; q < k; q++) A[p][q] += rows[i][p] * rows[i][q]; }
  // invert A by Gauss-Jordan
  const M = A.map((r, i) => [...r, ...Array.from({ length: k }, (_, j) => (i === j ? 1 : 0))]);
  for (let c = 0; c < k; c++) {
    let piv = c; for (let r = c + 1; r < k; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
    [M[c], M[piv]] = [M[piv], M[c]];
    const d = M[c][c]; if (Math.abs(d) < 1e-300) return { coef: new Array(k).fill(NaN), se: new Array(k).fill(NaN), n };
    for (let j = 0; j < 2 * k; j++) M[c][j] /= d;
    for (let r = 0; r < k; r++) if (r !== c) { const m = M[r][c]; for (let j = 0; j < 2 * k; j++) M[r][j] -= m * M[c][j]; }
  }
  const inv = M.map((r) => r.slice(k));
  const coef = inv.map((r) => r.reduce((s, v, j) => s + v * b[j], 0));
  let ss = 0; for (let i = 0; i < n; i++) { let yh = 0; for (let p = 0; p < k; p++) yh += rows[i][p] * coef[p]; ss += (y[i] - yh) ** 2; }
  const dof = n - k; const s2 = dof > 0 ? ss / dof : NaN;
  const se = inv.map((r, i) => Math.sqrt(s2 * r[i]));
  return { coef, se, n };
}
function corr(xs, ys) {
  const n = xs.length; const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0, syy = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
  return sxy / Math.sqrt(sxx * syy);
}

// ---------------------------------------------------------- A. custody
const srcLadder = R('research/exact-g2-ladder.js');
const srcInterp = R('research/import-interp-01-bgt-defect.js');
const srcCtrl = R('research/exponent-control.js');
const EXACT = [];
{ const re = /\{ x: (\d+),\s+g: (\d+),/g; let m; while ((m = re.exec(srcLadder)) !== null) EXACT.push({ x: +m[1], g: +m[2] }); }
let A144311 = null;
{ const m = srcInterp.match(/const A144311 = \[([^\]]+)\]/s); if (!m) throw new Error('parse failure: A144311'); A144311 = m[1].split(',').map((s) => parseInt(s.trim(), 10)); }
let HCTRL = null;
{ const m = srcCtrl.match(/const H = \[([^\]]+)\]/s); if (!m) throw new Error('parse failure: H'); HCTRL = m[1].split(',').map((s) => parseInt(s.trim(), 10)); }
const PRALL = sievePrimes(400);
const PR22 = PRALL.slice(0, 22);
const PR64 = PRALL.slice(0, 64);
const G2FULL = A144311.map((v) => v + 1);

console.log('=== A. CUSTODY =====================================================');
check('exact ladder parsed (14 terms)', EXACT.length === 14, 'n=' + EXACT.length);
check('A144311 parsed (22 terms)', A144311.length === 22, 'n=' + A144311.length);
check('A048670 control parsed (64 terms)', HCTRL.length === 64, 'n=' + HCTRL.length);
let agree = true;
for (let i = 0; i < 14; i++) agree = agree && EXACT[i].x === PR22[i] && EXACT[i].g === G2FULL[i];
check('exact ladder == A144311+1 on the 14 shared terms', agree);
check('last G2 prime is 79, last control prime is 311', PR22[21] === 79 && PR64[63] === 311, PR22[21] + ', ' + PR64[63]);
check('last terms: G2(79#) = 1710, h(311#) = 1110', G2FULL[21] === 1710 && HCTRL[63] === 1110);

function mkLadder(name, pr, vals, cap) {
  const at = (t) => { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k < 0 ? null : vals[k]; };
  return { name, pr, vals, cap, at, f: (t) => Math.log(at(t)) };
}
const G = mkLadder('G2 (22 trusted)', PR22, G2FULL, 82);
const Hc = mkLadder('h control (64)', PR64, HCTRL, 312);
const Hc22 = mkLadder('h control (22, reach 82)', PR64.slice(0, 22), HCTRL.slice(0, 22), 82);

// ---------------------------------------------------------- B. R0 custody
console.log('');
console.log('=== B. R0, THE DIAGONAL METER, REPRODUCED ============================');
function R0(L, bmax) {
  const X = [], y = [], rows = [];
  for (let b = 2; b <= bmax; b++) { const D = L.f(b * b) - 2 * L.f(b); X.push([Math.log(Math.log(b))]); y.push(D); rows.push({ b, D }); }
  const o = ols(X, y, true); return { slope: o.coef[1], se: o.se[1], delta: -o.coef[1], dse: o.se[1], n: y.length, rows };
}
const r0G = R0(G, 9), r0H9 = R0(Hc, 9), r0H = R0(Hc, 17);
console.log('  G2       b = 2..9   (n=8):  slope ' + F(r0G.slope) + ' +- ' + F(r0G.se) + '   -> delta_hat = ' + F(r0G.delta));
console.log('  control  b = 2..9   (n=8):  slope ' + F(r0H9.slope) + ' +- ' + F(r0H9.se) + '   -> delta_hat = ' + F(r0H9.delta));
console.log('  control  b = 2..17  (n=16): slope ' + F(r0H.slope) + ' +- ' + F(r0H.se) + '   -> delta_hat = ' + F(r0H.delta));
check('R0 control 16 bases reproduces +0.5157 +- 0.1969', Math.abs(r0H.slope - 0.5157) < 5e-5 && Math.abs(r0H.se - 0.1969) < 5e-5);
check('R0 control 8 bases reproduces +0.5298 +- 0.3018', Math.abs(r0H9.slope - 0.5298) < 5e-5 && Math.abs(r0H9.se - 0.3018) < 5e-5);
check('R0 G2 8 bases reproduces +0.0961 +- 0.4137', Math.abs(r0G.slope - 0.0961) < 5e-5 && Math.abs(r0G.se - 0.4137) < 5e-5);

// ---------------------------------------------------------- C. diagnosis
console.log('');
console.log('=== C. WHY R0 FAILS ON THE CONTROL ====================================');
console.log('  C1. slope vs reach (control, b = 2..bmax):');
let line = '   ';
for (let bmax = 5; bmax <= 17; bmax++) { const r = R0(Hc, bmax); line += ' ' + bmax + ':' + F(r.slope, 3).trim() + '(' + F(r.se, 2).trim() + ')'; }
console.log(line);
console.log('  C1b. slope vs reach (G2, b = 2..bmax):');
line = '   ';
for (let bmax = 5; bmax <= 9; bmax++) { const r = R0(G, bmax); line += ' ' + bmax + ':' + F(r.slope, 3).trim() + '(' + F(r.se, 2).trim() + ')'; }
console.log(line);
console.log('  C1c. control, tail-only windows b = bmin..17:');
line = '   ';
for (let bmin = 2; bmin <= 10; bmin++) {
  const X = [], y = []; for (let b = bmin; b <= 17; b++) { X.push([Math.log(Math.log(b))]); y.push(Hc.f(b * b) - 2 * Hc.f(b)); }
  const o = ols(X, y, true); line += ' ' + bmin + ':' + F(o.coef[1], 3).trim() + '(' + F(o.se[1], 2).trim() + ')';
}
console.log(line);
console.log('  C2. leave-one-out slopes (control, 16 bases; the base dropped -> slope):');
line = '   ';
for (let drop = 2; drop <= 17; drop++) {
  const X = [], y = []; for (let b = 2; b <= 17; b++) if (b !== drop) { X.push([Math.log(Math.log(b))]); y.push(Hc.f(b * b) - 2 * Hc.f(b)); }
  const o = ols(X, y, true); line += ' ' + drop + ':' + F(o.coef[1], 3).trim();
}
console.log(line);
console.log('  C2b. D(b,1) on the control with P(b) and P(b^2), and the rounding gap ln(b^2/P(b^2)) - 2 ln(b/P(b)):');
const Pof = (pr, t) => { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return pr[k]; };
console.log('  ' + pad('b', 4) + pad('P(b)', 6) + pad('P(b^2)', 8) + pad('D(b,1)', 9) + pad('roundgap', 10));
for (let b = 2; b <= 17; b++) {
  const pb = Pof(PR64, b), pb2 = Pof(PR64, b * b);
  const rg = Math.log(b * b / pb2) - 2 * Math.log(b / pb);
  console.log('  ' + pad(b, 4) + pad(pb, 6) + pad(pb2, 8) + F(Hc.f(b * b) - 2 * Hc.f(b), 3).padStart(9) + F(rg, 3).padStart(10));
}

// synthetic stepped laws: V_i = max(2, round(c p_i^beta (ln p_i)^delta (1 + a/ln p_i))), c matched to the last term
function synth(pr, beta, delta, last, a = 0, noise = null) {
  const law = (p) => Math.pow(p, beta) * Math.pow(Math.log(p), delta) * (1 + a / Math.log(p));
  const c = last / law(pr[pr.length - 1]);
  const vals = pr.map((p, i) => { let v = c * law(p); if (noise) v *= Math.exp(noise[i]); return Math.max(2, Math.round(v)); });
  return vals;
}
console.log('  C3. R0 on STEPPED, INTEGER-ROUNDED synthetic laws in the control geometry (beta = 1, c matched to 1110 at 311), b = 2..17:');
console.log('      delta:  slope (se)  -> delta_hat   [exact law would read -delta]');
for (const d of [2, 1, 0, -1]) {
  const L = mkLadder('syn', PR64, synth(PR64, 1, d, 1110), 312); const r = R0(L, 17);
  console.log('      ' + pad(d, 4) + ':   ' + F(r.slope) + ' (' + F(r.se) + ')  -> ' + F(r.delta) + '   [' + F(-d) + ']');
}
console.log('  C3b. the same at continuous n (no step, no rounding), b = 2..17: slope reads -delta exactly');
for (const d of [2, 1, 0, -1]) {
  const X = [], y = []; for (let b = 2; b <= 17; b++) { const fl = (t) => Math.log(t) + d * Math.log(Math.log(t)); X.push([Math.log(Math.log(b))]); y.push(fl(b * b) - 2 * fl(b)); }
  const o = ols(X, y, true); console.log('      ' + pad(d, 4) + ':   ' + F(o.coef[1]) + ' (' + F(o.se[1]) + ')');
}
console.log('  C4. R0 on stepped synthetic laws WITH a small-n factor (1 + a/ln n), control geometry, b = 2..17: slope -> delta_hat');
console.log('      ' + pad('a', 6) + pad('delta=2', 22) + pad('delta=1', 22) + pad('delta=0', 22));
for (const a of [-1, 0, 1, 3, 10, 30]) {
  line = '      ' + pad(a, 6);
  for (const d of [2, 1, 0]) { const L = mkLadder('syn', PR64, synth(PR64, 1, d, 1110, a), 312); const r = R0(L, 17); line += pad(F(r.slope, 3) + '->' + F(r.delta, 2), 22); }
  console.log(line);
}
console.log('  read: which (delta, a) cells land within 1 se (0.197) of the observed +0.516 is the diagnosis; the cells are a model, not a fit.');

// ---------------------------------------------------------- D. readers on synthetic laws
console.log('');
console.log('=== D. THE READERS, PRE-REGISTERED, ON STEPPED SYNTHETIC LAWS =========');
console.log('  RA lever arms ln(1 - 1/k^2) at k = 2..5: ' + [2, 3, 4, 5].map((k) => F(Math.log(1 - 1 / (k * k))).trim()).join(', ') + '   (a 0.1-nat error in one f moves delta_hat by ' + F(0.1 / -Math.log(1 - 1 / 4), 2).trim() + ' to ' + F(0.1 / -Math.log(1 - 1 / 25), 2).trim() + ')');
function powerPairs(cap) { const out = []; for (let b = 2; b * b <= cap; b++) for (let k = 1; Math.pow(b, k + 1) <= cap; k++) out.push([b, k]); return out; }
function RA(L) { // second differences along chains, k >= 2
  const X = [], y = [];
  for (const [b, k] of powerPairs(L.cap)) if (k >= 2) { X.push([Math.log(1 - 1 / (k * k))]); y.push(L.f(Math.pow(b, k + 1)) - 2 * L.f(Math.pow(b, k)) + L.f(Math.pow(b, k - 1))); }
  if (y.length < 2) return { delta: NaN, se: NaN, n: y.length };
  const o = ols(X, y, false); return { delta: o.coef[0], se: o.se[0], n: y.length };
}
function RB(L, betaHat) { // pinned beta, ladder primes >= 5
  const X = [], y = [];
  for (let i = 0; i < L.pr.length; i++) if (L.pr[i] >= 5) { X.push([Math.log(Math.log(L.pr[i]))]); y.push(Math.log(L.vals[i]) - betaHat * Math.log(L.pr[i])); }
  const o = ols(X, y, true); return { delta: o.coef[1], se: o.se[1], n: y.length };
}
function RC2(L) { // base-2 chain ratios
  const X = [], y = [];
  for (let k = 1; Math.pow(2, k + 1) <= L.cap; k++) { X.push([Math.log((k + 1) / k)]); y.push(L.f(Math.pow(2, k + 1)) - L.f(Math.pow(2, k))); }
  const o = ols(X, y, true); return { delta: o.coef[1], se: o.se[1], n: y.length, beta: o.coef[0] / Math.log(2) };
}
function RC(L) { // all power-pair ratios, two regressors through the origin
  const X = [], y = [];
  for (const [b, k] of powerPairs(L.cap)) { X.push([Math.log(b), Math.log((k + 1) / k)]); y.push(L.f(Math.pow(b, k + 1)) - L.f(Math.pow(b, k))); }
  const o = ols(X, y, false); return { delta: o.coef[1], se: o.se[1], n: y.length, beta: o.coef[0] };
}
function RD(L) { // joint 3-parameter fit on ladder primes >= 5
  const X = [], y = [];
  for (let i = 0; i < L.pr.length; i++) if (L.pr[i] >= 5) { X.push([Math.log(L.pr[i]), Math.log(Math.log(L.pr[i]))]); y.push(Math.log(L.vals[i])); }
  const o = ols(X, y, true); return { delta: o.coef[2], se: o.se[2], n: y.length, beta: o.coef[1] };
}
const READERS = [
  { id: 'R0', run: (L) => R0(L, Math.floor(Math.sqrt(L.cap))) },
  { id: 'RA', run: (L) => RA(L) },
  { id: 'RB', run: (L, beta) => RB(L, beta) },
  { id: 'RC2', run: (L) => RC2(L) },
  { id: 'RC', run: (L) => RC(L) },
  { id: 'RD', run: (L) => RD(L) },
];
const GEOM = [
  { id: 'control geometry (64 primes to 311, beta 1, cap 312)', pr: PR64, beta: 1, last: 1110, cap: 312, tol: 0.5, crit: 'S1' },
  { id: 'G2 geometry (22 primes to 79, beta 1.5, cap 82)', pr: PR22, beta: 1.5, last: 1710, cap: 82, tol: 1.0, crit: 'S2' },
];
const DELTAS = [-1, 0, 1, 2];
const pass = {}; for (const r of READERS) pass[r.id] = { S1: true, S2: true, C1: false, C2: false };
for (const g of GEOM) {
  console.log('  ' + g.crit + ': ' + g.id + ', |delta_hat - delta| <= ' + g.tol + (g.crit === 'S2' ? ' and sign right at delta = +-1, +2' : ''));
  console.log('  ' + pad('reader', 7) + DELTAS.map((d) => pad('delta=' + d, 20)).join('') + '   verdict');
  for (const r of READERS) {
    line = '  ' + pad(r.id, 7); let ok = true;
    for (const d of DELTAS) {
      const L = mkLadder('syn', g.pr, synth(g.pr, g.beta, d, g.last), g.cap); const o = r.run(L, g.beta);
      const good = Number.isFinite(o.delta) && Math.abs(o.delta - d) <= g.tol && (g.crit !== 'S2' || d === 0 || Math.sign(o.delta) === Math.sign(d));
      ok = ok && good; line += pad(F(o.delta, 3) + '(' + F(o.se, 2).trim() + ')' + (good ? ' ' : '*'), 20);
    }
    pass[r.id][g.crit] = ok; console.log(line + '   ' + (ok ? 'holds' : 'FAILS ' + g.crit));
  }
}
// S3: noise Monte Carlo, reported not scored
function mulberry32(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const rng = mulberry32(20260830);
const gauss = () => { let u = 0, v = 0; while (u === 0) u = rng(); v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const NOISE_SD = 0.055, NDRAW = 400;
console.log('  S3 (reported, not scored): white log-noise sd ' + NOISE_SD + ', ' + NDRAW + ' draws, seed 20260830. Cells: mean delta_hat, sd, P(sign right) at delta = -1 / +1');
for (const g of GEOM) {
  console.log('  ' + g.id);
  console.log('  ' + pad('reader', 7) + pad('delta=-1', 30) + pad('delta=+1', 30));
  for (const r of READERS) {
    line = '  ' + pad(r.id, 7);
    for (const d of [-1, 1]) {
      let s = 0, s2 = 0, right = 0, cnt = 0;
      for (let t = 0; t < NDRAW; t++) {
        const noise = g.pr.map(() => NOISE_SD * gauss());
        const L = mkLadder('syn', g.pr, synth(g.pr, g.beta, d, g.last, 0, noise), g.cap); const o = r.run(L, g.beta);
        if (Number.isFinite(o.delta)) { s += o.delta; s2 += o.delta * o.delta; cnt++; if (Math.sign(o.delta) === Math.sign(d)) right++; }
      }
      const m = s / cnt, sd = Math.sqrt(Math.max(0, s2 / cnt - m * m));
      line += pad(F(m, 2) + ' sd ' + F(sd, 2).trim() + ' P ' + F(right / cnt, 2).trim(), 30);
    }
    console.log(line);
  }
}

// ---------------------------------------------------------- E. the real control
console.log('');
console.log('=== E. THE READERS ON THE REAL CONTROL (A048670) =======================');
console.log('  C1: reach 312 (64 terms): delta_hat > 0 and delta_hat - 2 se > 0.   C2: reach 82 (22 terms): delta_hat > 0 and delta_hat - se > 0.');
console.log('  RB uses beta_hat = 1 on the control (circular: it assumes the conjectured exponent).');
console.log('  ' + pad('reader', 7) + pad('reach 312', 26) + pad('C1', 8) + pad('reach 82', 26) + pad('C2', 8) + '   beta_hat where the reader fits one (312 / 82)');
for (const r of READERS) {
  const o1 = r.run(Hc, 1), o2 = r.run(Hc22, 1);
  const c1 = Number.isFinite(o1.delta) && o1.delta > 0 && o1.delta - 2 * o1.se > 0;
  const c2 = Number.isFinite(o2.delta) && o2.delta > 0 && o2.delta - o2.se > 0;
  pass[r.id].C1 = c1; pass[r.id].C2 = c2;
  const bh = (o) => (o.beta !== undefined ? F(o.beta, 3).trim() : '-');
  console.log('  ' + pad(r.id, 7) + pad(F(o1.delta) + ' +- ' + F(o1.se).trim() + ' n=' + o1.n, 26) + pad(c1 ? 'holds' : 'FAILS', 8) + pad(F(o2.delta) + ' +- ' + F(o2.se).trim() + ' n=' + o2.n, 26) + pad(c2 ? 'holds' : 'FAILS', 8) + '   ' + bh(o1) + ' / ' + bh(o2));
}
{
  const xs = [], us = []; for (const p of PR64) if (p >= 5) { xs.push(Math.log(p)); us.push(Math.log(Math.log(p))); }
  const xg = [], ug = []; for (const p of PR22) if (p >= 5) { xg.push(Math.log(p)); ug.push(Math.log(Math.log(p))); }
  console.log('  collinearity corr(ln p, ln ln p): control 64 = ' + F(corr(xs, us)) + ', G2 22 = ' + F(corr(xg, ug)));
  // RB sensitivity d delta_hat / d beta_hat = -cov(x,u)/var(u)
  const sens = (x, u) => { const n = x.length, mx = x.reduce((a, b) => a + b, 0) / n, mu = u.reduce((a, b) => a + b, 0) / n; let sxu = 0, suu = 0; for (let i = 0; i < n; i++) { sxu += (x[i] - mx) * (u[i] - mu); suu += (u[i] - mu) ** 2; } return -sxu / suu; };
  console.log('  RB sensitivity d(delta_hat)/d(beta_hat): control 64 = ' + F(sens(xs, us)) + ', G2 22 = ' + F(sens(xg, ug)));
}
console.log('  RB on the control at other pinned exponents (reach 312): ' + [0.9, 1.0, 1.1, 1.282].map((b) => { const o = RB(Hc, b); return 'beta=' + b + ': ' + F(o.delta, 3).trim() + '+-' + F(o.se, 2).trim(); }).join('   '));
console.log('  RD on control windows (3-parameter fit, delta_hat +- se): ' + [[5, 311], [5, 79], [23, 311], [79, 311], [127, 311]].map(([lo, hi]) => { const pr = PR64.filter((p) => p >= lo && p <= hi), vals = pr.map((p) => HCTRL[PR64.indexOf(p)]); const o = RD(mkLadder('w', pr, vals, hi + 1)); return '[' + lo + ',' + hi + ']: ' + F(o.delta, 2).trim() + '+-' + F(o.se, 2).trim(); }).join('   '));

// ---------------------------------------------------------- F. the gate
console.log('');
console.log('=== F. THE GATE: G2 READINGS ONLY FOR READERS PASSING S1, S2, C1, C2 ====');
let anyPass = false;
for (const r of READERS) {
  const p = pass[r.id]; const all = p.S1 && p.S2 && p.C1 && p.C2;
  const flags = 'S1 ' + (p.S1 ? 'ok' : 'FAIL') + ', S2 ' + (p.S2 ? 'ok' : 'FAIL') + ', C1 ' + (p.C1 ? 'ok' : 'FAIL') + ', C2 ' + (p.C2 ? 'ok' : 'FAIL');
  if (all) {
    anyPass = true;
    const o = r.run(G, 1.5);
    console.log('  ' + pad(r.id, 7) + '  ' + flags + '   G2 (22 trusted, reach 82): delta_hat = ' + F(o.delta) + ' +- ' + F(o.se) + ' n=' + o.n + (r.id === 'RB' ? '  (beta_hat 1.50)' : ''));
    if (r.id === 'RB') console.log('         RB scan over the exponent bracket: ' + [1.3, 1.4, 1.5, 1.6, 1.777, 1.8].map((b) => 'beta=' + b + ': ' + F(RB(G, b).delta, 3).trim()).join('   '));
  } else {
    console.log('  ' + pad(r.id, 7) + '  ' + flags + '   G2 reading withheld (killed by the pre-registration)');
  }
}
console.log('  readers passing all four criteria: ' + (anyPass ? 'at least one' : 'NONE'));
console.log('');
console.log('FAILS = ' + FAILS);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/measure-0830-delta-reader.js
//   invocation:  node research/history/staging/measure-0830-delta-reader.js
//   code-sha256: d0e9da7eeadc66348811b914e2e1f5803c00813f9cb6cf619de5cc44da1b59ab
//   out-sha256:  470e09a654e0a344d03c7f1d22a890649ff1dc0672a7aa6287a529efe668b42f
//   body-lines:  126
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     0.2 s
// ============================================================================
// === A. CUSTODY =====================================================
//   ok    exact ladder parsed (14 terms)   n=14
//   ok    A144311 parsed (22 terms)   n=22
//   ok    A048670 control parsed (64 terms)   n=64
//   ok    exact ladder == A144311+1 on the 14 shared terms
//   ok    last G2 prime is 79, last control prime is 311   79, 311
//   ok    last terms: G2(79#) = 1710, h(311#) = 1110
//
// === B. R0, THE DIAGONAL METER, REPRODUCED ============================
//   G2       b = 2..9   (n=8):  slope  0.0961 +-  0.4137   -> delta_hat = -0.0961
//   control  b = 2..9   (n=8):  slope  0.5298 +-  0.3018   -> delta_hat = -0.5298
//   control  b = 2..17  (n=16): slope  0.5157 +-  0.1969   -> delta_hat = -0.5157
//   ok    R0 control 16 bases reproduces +0.5157 +- 0.1969
//   ok    R0 control 8 bases reproduces +0.5298 +- 0.3018
//   ok    R0 G2 8 bases reproduces +0.0961 +- 0.4137
//
// === C. WHY R0 FAILS ON THE CONTROL ====================================
//   C1. slope vs reach (control, b = 2..bmax):
//     5:0.286(0.61) 6:0.514(0.47) 7:0.356(0.39) 8:0.377(0.31) 9:0.530(0.30) 10:0.699(0.31) 11:0.691(0.27) 12:0.735(0.25) 13:0.607(0.26) 14:0.545(0.24) 15:0.523(0.23) 16:0.533(0.21) 17:0.516(0.20)
//   C1b. slope vs reach (G2, b = 2..bmax):
//     5:0.103(0.64) 6:0.447(0.54) 7:0.018(0.58) 8:-0.036(0.47) 9:0.096(0.41)
//   C1c. control, tail-only windows b = bmin..17:
//     2:0.516(0.20) 3:0.733(0.28) 4:0.339(0.35) 5:0.429(0.47) 6:0.164(0.60) 7:0.322(0.79) 8:-0.633(0.89) 9:-1.705(1.00) 10:-1.976(1.36)
//   C2. leave-one-out slopes (control, 16 bases; the base dropped -> slope):
//     2:0.733 3:0.349 4:0.546 5:0.504 6:0.525 7:0.513 8:0.518 9:0.500 10:0.476 11:0.507 12:0.482 13:0.569 14:0.550 15:0.531 16:0.504 17:0.533
//   C2b. D(b,1) on the control with P(b) and P(b^2), and the rounding gap ln(b^2/P(b^2)) - 2 ln(b/P(b)):
//      b  P(b)  P(b^2)   D(b,1)  roundgap
//      2     2       3    0.000     0.288
//      3     3       7   -0.470     0.251
//      4     3      13    0.318    -0.368
//      5     5      23    0.105     0.083
//      6     5      31    0.477    -0.215
//      7     7      47    0.000     0.042
//      8     7      61    0.278    -0.219
//      9     7      79    0.693    -0.478
//     10     7      97    0.948    -0.683
//     11    11     113    0.521     0.068
//     12    11     139    0.748    -0.139
//     13    13     167    0.052     0.012
//     14    13     193    0.241    -0.133
//     15    13     223    0.394    -0.277
//     16    13     251    0.573    -0.396
//     17    17     283    0.421     0.021
//   C3. R0 on STEPPED, INTEGER-ROUNDED synthetic laws in the control geometry (beta = 1, c matched to 1110 at 311), b = 2..17:
//       delta:  slope (se)  -> delta_hat   [exact law would read -delta]
//          2:    2.1178 ( 0.4405)  -> -2.1178   [-2.0000]
//          1:    0.2948 ( 0.3808)  -> -0.2948   [-1.0000]
//          0:    0.3398 ( 0.1584)  -> -0.3398   [ 0.0000]
//         -1:    1.1700 ( 0.0790)  -> -1.1700   [ 1.0000]
//   C3b. the same at continuous n (no step, no rounding), b = 2..17: slope reads -delta exactly
//          2:   -2.0000 ( 0.0000)
//          1:   -1.0000 ( 0.0000)
//          0:   -0.0000 ( 0.0000)
//         -1:    1.0000 ( 0.0000)
//   C4. R0 on stepped synthetic laws WITH a small-n factor (1 + a/ln n), control geometry, b = 2..17: slope -> delta_hat
//            a               delta=2               delta=1               delta=0
//           -1          2.839->-2.84          0.904->-0.90         -0.838-> 0.84
//            0          2.118->-2.12          0.295->-0.29          0.340->-0.34
//            1          1.627->-1.63          0.022->-0.02          0.839->-0.84
//            3          1.283->-1.28          0.198->-0.20          1.063->-1.06
//           10          0.785->-0.79          0.376->-0.38          1.158->-1.16
//           30          0.398->-0.40          0.321->-0.32          1.179->-1.18
//   read: which (delta, a) cells land within 1 se (0.197) of the observed +0.516 is the diagnosis; the cells are a model, not a fit.
//
// === D. THE READERS, PRE-REGISTERED, ON STEPPED SYNTHETIC LAWS =========
//   RA lever arms ln(1 - 1/k^2) at k = 2..5: -0.2877, -0.1178, -0.0645, -0.0408   (a 0.1-nat error in one f moves delta_hat by 0.35 to 2.45)
//   S1: control geometry (64 primes to 311, beta 1, cap 312), |delta_hat - delta| <= 0.5
//    reader            delta=-1             delta=0             delta=1             delta=2   verdict
//        R0       -1.170(0.08)        -0.340(0.16)        -0.295(0.38)*       -2.118(0.44)*   FAILS S1
//        RA       -1.311(0.13)        -0.563(0.25)*       -0.341(0.69)*       -1.721(0.84)*   FAILS S1
//        RB       -1.002(0.00)        -0.001(0.00)         1.011(0.00)         1.908(0.02)    holds
//       RC2       -1.128(0.12)        -0.411(0.26)        -1.293(0.78)*       -2.134(0.59)*   FAILS S1
//        RC       -1.216(0.07)        -0.353(0.13)        -0.022(0.33)*       -1.599(0.43)*   FAILS S1
//        RD       -1.018(0.00)        -0.010(0.01)         1.071(0.02)         1.345(0.08)*   FAILS S1
//   S2: G2 geometry (22 primes to 79, beta 1.5, cap 82), |delta_hat - delta| <= 1 and sign right at delta = +-1, +2
//    reader            delta=-1             delta=0             delta=1             delta=2   verdict
//        R0       -1.441(0.18)        -0.804(0.31)        -0.993(0.59)*       -3.001(0.42)*   FAILS S2
//        RA       -1.810(0.35)        -1.284(0.58)*       -1.286(1.28)*       -3.011(1.03)*   FAILS S2
//        RB       -0.999(0.00)         0.005(0.00)         1.001(0.00)         1.958(0.01)    holds
//       RC2       -1.463(0.33)        -0.920(0.56)        -1.700(1.23)*       -3.151(0.93)*   FAILS S2
//        RC       -1.639(0.15)        -1.002(0.25)*       -0.949(0.51)*       -2.686(0.43)*   FAILS S2
//        RD       -1.006(0.01)         0.039(0.01)         1.025(0.01)         1.700(0.06)    holds
//   S3 (reported, not scored): white log-noise sd 0.055, 400 draws, seed 20260830. Cells: mean delta_hat, sd, P(sign right) at delta = -1 / +1
//   control geometry (64 primes to 311, beta 1, cap 312)
//    reader                      delta=-1                      delta=+1
//        R0          -1.18 sd 0.09 P 1.00          -0.27 sd 0.09 P 0.00
//        RA          -1.31 sd 0.13 P 1.00          -0.32 sd 0.14 P 0.01
//        RB          -1.00 sd 0.03 P 1.00           1.00 sd 0.02 P 1.00
//       RC2          -1.14 sd 0.13 P 1.00          -1.27 sd 0.05 P 0.00
//        RC          -1.22 sd 0.10 P 1.00          -0.01 sd 0.10 P 0.45
//        RD          -0.99 sd 0.15 P 1.00           1.00 sd 0.16 P 1.00
//   G2 geometry (22 primes to 79, beta 1.5, cap 82)
//    reader                      delta=-1                      delta=+1
//        R0          -1.45 sd 0.15 P 1.00          -0.99 sd 0.13 P 0.00
//        RA          -1.81 sd 0.16 P 1.00          -1.28 sd 0.14 P 0.00
//        RB          -1.00 sd 0.05 P 1.00           1.00 sd 0.05 P 1.00
//       RC2          -1.47 sd 0.16 P 1.00          -1.69 sd 0.10 P 0.00
//        RC          -1.64 sd 0.14 P 1.00          -0.95 sd 0.14 P 0.00
//        RD          -1.00 sd 0.32 P 1.00           0.98 sd 0.32 P 1.00
//
// === E. THE READERS ON THE REAL CONTROL (A048670) =======================
//   C1: reach 312 (64 terms): delta_hat > 0 and delta_hat - 2 se > 0.   C2: reach 82 (22 terms): delta_hat > 0 and delta_hat - se > 0.
//   RB uses beta_hat = 1 on the control (circular: it assumes the conjectured exponent).
//    reader                 reach 312      C1                  reach 82      C2   beta_hat where the reader fits one (312 / 82)
//        R0    -0.5157 +- 0.1969 n=16   FAILS     -0.5298 +- 0.3018 n=8   FAILS   - / -
//        RA    -0.7735 +- 0.2245 n=13   FAILS     -0.8562 +- 0.3371 n=7   FAILS   - / -
//        RB     1.0235 +- 0.0399 n=62   holds     0.6961 +- 0.0796 n=20   holds   - / -
//       RC2     -0.3637 +- 0.1725 n=7   FAILS     -0.3341 +- 0.2364 n=5   FAILS   1.405 / 1.382
//        RC    -0.5939 +- 0.1462 n=29   FAILS    -0.7087 +- 0.2081 n=15   FAILS   1.469 / 1.516
//        RD    -0.3837 +- 0.1404 n=62   FAILS    -0.6207 +- 0.4889 n=20   FAILS   1.384 / 1.455
//   collinearity corr(ln p, ln ln p): control 64 =  0.9849, G2 22 =  0.9902
//   RB sensitivity d(delta_hat)/d(beta_hat): control 64 = -3.6662, G2 22 = -2.8949
//   RB on the control at other pinned exponents (reach 312): beta=0.9: 1.390+-0.05   beta=1: 1.023+-0.04   beta=1.1: 0.657+-0.03   beta=1.282: -0.010+-0.03
//   RD on control windows (3-parameter fit, delta_hat +- se): [5,311]: -0.38+-0.14   [5,79]: -0.62+-0.49   [23,311]: 1.12+-0.44   [79,311]: -1.16+-1.05   [127,311]: 1.99+-2.44
//
// === F. THE GATE: G2 READINGS ONLY FOR READERS PASSING S1, S2, C1, C2 ====
//        R0  S1 FAIL, S2 FAIL, C1 FAIL, C2 FAIL   G2 reading withheld (killed by the pre-registration)
//        RA  S1 FAIL, S2 FAIL, C1 FAIL, C2 FAIL   G2 reading withheld (killed by the pre-registration)
//        RB  S1 ok, S2 ok, C1 ok, C2 ok   G2 (22 trusted, reach 82): delta_hat =  0.8024 +-  0.0875 n=20  (beta_hat 1.50)
//          RB scan over the exponent bracket: beta=1.3: 1.381   beta=1.4: 1.092   beta=1.5: 0.802   beta=1.6: 0.513   beta=1.777: 0.001   beta=1.8: -0.066
//       RC2  S1 FAIL, S2 FAIL, C1 FAIL, C2 FAIL   G2 reading withheld (killed by the pre-registration)
//        RC  S1 FAIL, S2 FAIL, C1 FAIL, C2 FAIL   G2 reading withheld (killed by the pre-registration)
//        RD  S1 FAIL, S2 ok, C1 FAIL, C2 FAIL   G2 reading withheld (killed by the pre-registration)
//   readers passing all four criteria: at least one
//
// FAILS = 0
// ============================================================================
// READINGS
// (written after the block above was embedded; every figure is quoted from it)
//
// 1. CUSTODY. Three ladders parse (14, 22, 64), the two G2 ladders agree on
//    their 14 shared terms, and the diagonal meter R0 reproduces the three
//    2026-08-29 readings digit for digit: control 16 bases +0.5157 +- 0.1969,
//    control 8 bases +0.5298 +- 0.3018, G2 8 bases +0.0961 +- 0.4137.
//    [VERIFIED]
// 2. R0 ON THE CONTROL, DECOMPOSED. The slope is positive at every reach
//    bmax = 5..17 (0.286 to 0.735) and no single base carries it: the
//    leave-one-out slopes run 0.349 (drop b = 3) to 0.733 (drop b = 2), the
//    other fourteen 0.476 to 0.569. Tail-only windows b >= 8 turn negative
//    (-0.633 +- 0.89, -1.705 +- 1.00, -1.976 +- 1.36) at about one standard
//    error: no significant sign flip with reach. The P(n) rounding gap
//    ln(b^2/P(b^2)) - 2 ln(b/P(b)) reaches -0.683 (b = 10) and -0.478
//    (b = 9), the same order as the D values themselves. [MEASURED]
// 3. STEPPING ISOLATED. On an exact law made into a ladder the only way a
//    ladder can present one (sampled at the 64 primes, integer-rounded, then
//    stepped), R0 at b = 2..17 reads slope 2.1178 (delta_hat -2.12) for
//    delta = 2, 0.2948 (-0.29) for delta = 1, 0.3398 (-0.34) for delta = 0,
//    1.1700 (-1.17) for delta = -1; the continuous law returns -delta to four
//    places. So the 2026-08-29 calibration was on the continuous law, which
//    no ladder presents; stepping alone does NOT flip the sign of a delta = 2
//    law at this reach but destroys the meter's resolution below delta ~ 1
//    (delta = 0 and delta = 1 read within 0.05 of each other). [VERIFIED]
// 4. THE (1 + a/ln n) FAMILY. Cells within one standard error (0.197) of the
//    observed +0.516: (delta = 2, a = 30) 0.398; (delta = 1, a = 10) 0.376;
//    (delta = 1, a = 30) 0.321; (delta = 0, a = 0) 0.340. A delta = 2 law
//    reproduces the control's meter reading only with a = 30, which is not a
//    small correction at any reachable p. A model, not a fit. [HEURISTIC]
// 5. SYNTHETIC SCORES. S1 (control geometry): only RB holds, and RB is handed
//    the true exponent; RD misses at delta = 2 only (1.345 against 2). The
//    four chain readers R0, RA, RC2, RC fail S1 and S2, every one reading a
//    NEGATIVE delta_hat at true delta = +1 (control geometry -0.295, -0.341,
//    -1.293, -0.022; G2 geometry -0.993, -1.286, -1.700, -0.949): the P(n)
//    stepping at b^k kills every power-chain reader at both reaches. S2 (G2
//    geometry): RB and RD hold. [VERIFIED]
// 6. POWER UNDER NOISE (S3, reported). RD resolves delta = +-1 with P(sign
//    right) = 1.00 in both geometries (sd 0.16 at 64 terms, 0.32 at 22); the
//    chain readers at delta = +1 have P = 0.00 to 0.45. [MEASURED]
// 7. THE REAL CONTROL. Every reader that does not import an exponent reads
//    delta_hat NEGATIVE at reach 312: R0 -0.5157 +- 0.1969, RA -0.7735 +-
//    0.2245, RC2 -0.3637 +- 0.1725, RC -0.5939 +- 0.1462, RD -0.3837 +-
//    0.1404 (RD's beta_hat 1.384). RB at pinned beta = 1 reads +1.0235 +-
//    0.0399 (reach 82: +0.6961 +- 0.0796) and at pinned beta = 1.282, the
//    raw fit of exponent-control.md, -0.010 +- 0.03: RB's sign is the sign
//    of (beta_raw - beta_hat), sensitivity -3.6662 per unit beta_hat. RD on
//    windows swings +1.12 +- 0.44 on [23,311], -1.16 +- 1.05 on [79,311],
//    +1.99 +- 2.44 on [127,311]: no window-stable delta. Collinearity
//    corr(ln p, ln ln p) = 0.9849 (control), 0.9902 (G2). [MEASURED]
// 8. THE GATE. RB alone passes S1, S2, C1, C2 and reads G2 (22 trusted,
//    reach 82) delta_hat = 0.8024 +- 0.0875 at beta_hat = 1.50; over the
//    exponent bracket it runs 1.381 (beta 1.3), 1.092, 0.802, 0.513, 0.001
//    (beta 1.777, the raw fit), -0.066 (beta 1.8); sensitivity -2.8949. The
//    OLS error bar is not the error: the reading's sign is the sign of
//    (1.777 - beta_hat), i.e. the sign of the control-corrected bias, which
//    is the quantity exponent-control.md 3 derives FROM a positive log power.
//    Circular; not a reading of delta's sign. Every other reader's G2
//    reading is withheld. [MEASURED, VOID AS EVIDENCE ON THE SIGN]
// 9. VERDICT. The sign of delta for G2 is unreadable at reach 79 by every
//    instrument tried. The witness is the control: five independent readers
//    agree its finite-reach delta is negative (item 7) while its conjectured
//    asymptotic delta is +2, so at these reaches the finite-reach delta does
//    not carry the asymptotic sign, and a G2 reading from a perfect
//    instrument would still not decide the sign lemma's condition. The one
//    passing reader passes by importing the exponent. [MEASURED]
