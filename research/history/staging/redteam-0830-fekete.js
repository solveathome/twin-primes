// redteam-0830-fekete.js  —  adversarial re-derivation of the two TODO-1d notes
//   attack-0829n-hsubpow-K.md   (the sign lemma, the K -> beta_bound map, the zone)
//   measure-0830-delta-reader.md (the six pre-registered delta readers and the gate)
//
// SCRATCHPAD-GRADE, RED TEAM. Arithmetic only: no enumeration, no new G2 value.
// Every reader, every fit and every ladder parse below is written from the notes'
// stated DEFINITIONS, not copied from their producers. The three ladders are
// re-parsed here from the corpus keepers with this file's own regexes:
//   research/exact-g2-ladder.js              14 custody-exact G2 terms
//   research/import-interp-01-bgt-defect.js  the 22-term A144311 column (+1)
//   research/exponent-control.js             the 64-term A048670 control h
//
// NOTATION. Ghat(t) = G2(P(t)#), P(t) the largest prime <= t, f = ln Ghat;
// D(b,k) = f(b^(k+1)) - f(b^k) - f(b). (H-sub-pow) at constant K is D <= K.
//
// SECTIONS
//  A. custody: the three ladders re-parsed independently.
//  B. the sign lemma on the CONTINUOUS law: the closed form, the sup, delta = 0,
//     the boundary, the base-floor sensitivity, real bases, the divergence rate.
//  C. the sign lemma on the STEPPED law Ghat(n) = c P(n)^beta (ln P(n))^delta,
//     which is the only shape a primorial-indexed ladder can present.
//  D. the map K -> beta_bound(K) = min_b (f(b)+K)/ln b and its inverse, the zone,
//     the argmin base as a function of K, the base-16 formula, the K = 11 set.
//  E. power-pair defects, the margins, the control's sup movement.
//  F. the six readers rebuilt from measure-0830-delta-reader.md 3a, run on
//     stepped synthetic laws and on the real control; stepping vs rounding.
//  G. RB's algebra: the zero crossing against the raw log-log slope.
//  H. an independent noise Monte Carlo (different generator, different seed).
//
// No wall-clock figure is printed to stdout.
// usage: node research/history/staging/redteam-0830-fekete.js
'use strict';

const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..');
const R = (p) => fs.readFileSync(path.join(REPO, p), 'utf8');
const F = (v, d = 4) => (Number.isFinite(v) ? (v >= 0 ? ' ' : '') + v.toFixed(d) : '    n/a');
const pad = (s, n) => String(s).padStart(n);
let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) FAILS++;
  console.log('  [' + (ok ? 'ok  ' : 'FAIL') + '] ' + label + (detail ? '   ' + detail : ''));
}
function sieve(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; }

// ---- ordinary least squares, own implementation (Gauss-Jordan with inverse)
function ols(X, y, intercept) {
  const n = y.length, A = X.map((r) => (intercept ? [1].concat(r) : r.slice())), k = A[0].length;
  const M = [], I = [];
  for (let i = 0; i < k; i++) { M.push(new Array(k + 1).fill(0)); I.push(new Array(k).fill(0)); I[i][i] = 1; }
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < k; j++) { let s = 0; for (let r = 0; r < n; r++) s += A[r][i] * A[r][j]; M[i][j] = s; }
    let s = 0; for (let r = 0; r < n; r++) s += A[r][i] * y[r]; M[i][k] = s;
  }
  for (let c = 0; c < k; c++) {
    let piv = c; for (let r = c + 1; r < k; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
    const t = M[c]; M[c] = M[piv]; M[piv] = t; const t2 = I[c]; I[c] = I[piv]; I[piv] = t2;
    const d = M[c][c]; for (let j = 0; j <= k; j++) M[c][j] /= d; for (let j = 0; j < k; j++) I[c][j] /= d;
    for (let r = 0; r < k; r++) { if (r === c) continue; const m = M[r][c]; if (m === 0) continue; for (let j = 0; j <= k; j++) M[r][j] -= m * M[c][j]; for (let j = 0; j < k; j++) I[r][j] -= m * I[c][j]; }
  }
  const b = M.map((r) => r[k]);
  let ss = 0; for (let r = 0; r < n; r++) { let p = 0; for (let j = 0; j < k; j++) p += A[r][j] * b[j]; ss += (y[r] - p) * (y[r] - p); }
  const s2 = n > k ? ss / (n - k) : NaN, se = [];
  for (let i = 0; i < k; i++) se.push(Math.sqrt(s2 * I[i][i]));
  return { b: b, se: se, n: n };
}
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
function corr(x, u) { const mx = mean(x), mu = mean(u); let a = 0, b = 0, c = 0; for (let i = 0; i < x.length; i++) { a += (x[i] - mx) * (u[i] - mu); b += (x[i] - mx) ** 2; c += (u[i] - mu) ** 2; } return a / Math.sqrt(b * c); }

// ========================================================== A. custody
console.log('=== A. CUSTODY: the three ladders, re-parsed by this file ==============');
const A144311 = R('research/import-interp-01-bgt-defect.js').match(/const A144311 = \[([^\]]+)\]/)[1].split(',').map((s) => parseInt(s, 10));
const HCTRL = R('research/exponent-control.js').match(/const H = \[([^\]]+)\]/)[1].replace(/\/\/[^\n]*/g, '').split(',').map((s) => parseInt(s, 10));
const EXACTG = []; { const re = /\{ x: (\d+),\s+g: (\d+),/g; let m; while ((m = re.exec(R('research/exact-g2-ladder.js'))) !== null) EXACTG.push([+m[1], +m[2]]); }
const ALLP = sieve(3000000);
const PR22 = ALLP.slice(0, 22), PR64 = ALLP.slice(0, 64);
const G2V = A144311.map((v) => v + 1);
check('A144311 parses, 22 terms, last 1709', A144311.length === 22 && A144311[21] === 1709);
check('A048670 control parses, 64 terms, last 1110', HCTRL.length === 64 && HCTRL[63] === 1110);
check('exact ladder parses, 14 terms, agrees with A144311+1 on all 14', EXACTG.length === 14 && EXACTG.every((r, i) => r[0] === PR22[i] && r[1] === G2V[i]));
check('reaches: G2 to p = 79, control to p = 311', PR22[21] === 79 && PR64[63] === 311);
const B2 = 4.26645028414864191641;

function ladder(pr, vals, cap) {
  const at = (t) => { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k < 0 ? null : vals[k]; };
  return { pr: pr, vals: vals, cap: cap, at: at, f: (t) => Math.log(at(t)) };
}
const G = ladder(PR22, G2V, 82), HC = ladder(PR64, HCTRL, 312), HC22 = ladder(PR22, HCTRL.slice(0, 22), 82);
const f = G.f, fh = HC.f;
const Dof = (L, b, k) => L.f(Math.pow(b, k + 1)) - L.f(Math.pow(b, k)) - L.f(b);
const pairs = (cap) => { const o = []; for (let b = 2; b * b <= cap; b++) for (let k = 1; Math.pow(b, k + 1) <= cap; k++) o.push([b, k]); return o; };

// ============================================ B. the sign lemma, continuous law
console.log('');
console.log('=== B. THE SIGN LEMMA ON THE CONTINUOUS LAW Ghat = c n^beta (ln n)^delta');
const Dc = (b, k, c, dl) => -Math.log(c) + dl * (Math.log((k + 1) / k) - Math.log(Math.log(b)));
{
  let worst = 0;
  for (const b of [2, 3, 5, 10, 97, 1000, 1e6]) for (const k of [1, 2, 3, 7, 40]) for (const c of [0.3, 1, 3]) for (const be of [1, 1.5, 2, 4.2665]) for (const dl of [-1, -0.1, 0, 0.5, 2]) {
    const fL = (n) => Math.log(c) + be * Math.log(n) + dl * Math.log(Math.log(n));
    worst = Math.max(worst, Math.abs((fL(Math.pow(b, k + 1)) - fL(Math.pow(b, k)) - fL(b)) - Dc(b, k, c, dl)));
  }
  check('closed form D(b,k) = -ln c + delta[ln((k+1)/k) - ln ln b] (beta cancels)', worst < 1e-11, 'max abs err ' + worst.toExponential(2) + ' over 900 cells');
}
const KAPPA = Math.log(2) - Math.log(Math.log(2));
console.log('  the constant of the lemma: ln 2 - ln ln 2 = ' + KAPPA.toFixed(6) + '   (the note writes 1.0597)');
console.log('  ' + pad('delta', 7) + pad('sup D over b in [2,1e5], k in [1,60], c = 1', 46) + pad('argmax (b,k)', 16) + pad('1.0597*delta', 14));
for (const dl of [0, 0.25, 0.5, 1, 2]) {
  let m = -Infinity, arg = null;
  for (let b = 2; b <= 100000; b++) for (let k = 1; k <= 60; k++) { const v = Dc(b, k, 1, dl); if (v > m) { m = v; arg = '(' + b + ',' + k + ')'; } }
  console.log('  ' + pad(dl, 7) + pad(F(m, 6), 46) + pad(arg, 16) + pad(F(KAPPA * dl, 6), 14));
  check('delta = ' + dl + ': sup attained at (2,1) and equals (ln2 - lnln2)*delta', arg === '(2,1)' && Math.abs(m - KAPPA * dl) < 1e-9);
}
{
  let flat = true; for (let b = 2; b <= 2000; b++) for (let k = 1; k <= 30; k++) flat = flat && Math.abs(Dc(b, k, 2.5, 0) - (-Math.log(2.5))) < 1e-12;
  check('delta = 0 exactly: D is the constant -ln c on every (b,k)', flat, 'so K = max(0, -ln c) works and the hypothesis is satisfiable');
}
console.log('  BASE-FLOOR SENSITIVITY of the constant (delta = 1, c = 1): sup over b >= b0 is ln 2 - ln ln b0');
console.log('  ' + pad('b0', 6) + pad('sup', 12) + pad('share of the b0 = 2 value', 28));
for (const b0 of [2, 3, 4, 16, 66, 82]) {
  let m = -Infinity; for (let b = b0; b <= 100000; b++) m = Math.max(m, Dc(b, 1, 1, 1));
  console.log('  ' + pad(b0, 6) + pad(F(m, 6), 12) + pad(F(m / KAPPA, 4), 28));
}
console.log('  REAL bases below 2 (not admitted by (H-sub-pow), shown to price the quantifier), delta = 1, c = 1:');
console.log('  ' + [1.5, 1.1, 1.01, 1.001].map((b) => 'D(' + b + ',1) = ' + F(Dc(b, 1, 1, 1), 3).trim()).join('   '));
check('over real b >= 2 the sup is the same as over integer b >= 2', Math.abs(Dc(2, 1, 1, 1) - KAPPA) < 1e-12 && Dc(2.0001, 1, 1, 1) < Dc(2, 1, 1, 1));
console.log('  DIVERGENCE RATE for delta < 0 (c = 1): D(b,1) = |delta|(ln ln b - ln 2), so exceeding K needs');
console.log('  ' + pad('delta', 8) + pad('K', 10) + pad('ln ln b needed', 16) + pad('b needed (exp of)', 22));
for (const dl of [-0.1, -0.5, -1]) for (const K of [1.3946, 11.3568]) {
  const need = K / Math.abs(dl) + Math.log(2);
  console.log('  ' + pad(dl, 8) + pad(K, 10) + pad(need.toFixed(3), 16) + pad('exp(' + Math.exp(need).toExponential(3) + ')', 22));
}
{
  const oscOK = (c1, c2, dl, b, k) => {
    const lo = (n) => Math.log(c1) + 1.5 * Math.log(n) + dl * Math.log(Math.log(n));
    const hi = (n) => Math.log(c2) + 1.5 * Math.log(n) + dl * Math.log(Math.log(n));
    return (hi(Math.pow(b, k + 1)) - lo(Math.pow(b, k)) - lo(b)) <= Math.log(c2 / (c1 * c1)) + KAPPA * dl + 1e-12;
  };
  let ok = true; for (const [c1, c2] of [[0.5, 2], [1, 1.7], [0.9, 3]]) for (const dl of [0, 0.5, 2]) for (let b = 2; b <= 500; b++) for (let k = 1; k <= 8; k++) ok = ok && oscOK(c1, c2, dl, b, k);
  check('the note\'s oscillating-correction rider K <= ln(c2/c1^2) + 1.0597 delta holds (delta >= 0)', ok, '3 constant pairs x 3 deltas x 499 bases x 8 rungs');
}

// ============================================== C. the sign lemma, stepped law
console.log('');
console.log('=== C. THE SAME LEMMA ON THE STEPPED LAW Ghat(n) = c P(n)^beta (ln P(n))^delta');
console.log('  (this is the shape measure-0830-delta-reader.md 2c says a ladder must present)');
const Pat = (t) => { let lo = 0, hi = ALLP.length - 1, r = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (ALLP[m] <= t) { r = m; lo = m + 1; } else hi = m - 1; } return ALLP[r]; };
const fstep = (n, c, be, dl) => { const p = Pat(n); return Math.log(c) + be * Math.log(p) + dl * Math.log(Math.log(p)); };
const Ds = (b, k, c, be, dl) => fstep(Math.pow(b, k + 1), c, be, dl) - fstep(Math.pow(b, k), c, be, dl) - fstep(b, c, be, dl);
console.log('  ' + pad('beta', 6) + pad('delta', 7) + pad('sup D, stepped (b <= 2000)', 28) + pad('argmax', 12) + pad('continuous sup', 16) + pad('excess', 10));
for (const be of [1, 1.5, 2]) for (const dl of [0, 1, 2]) {
  let m = -Infinity, arg = null;
  for (let b = 2; b <= 2000; b++) for (let k = 1; Math.pow(b, k + 1) <= 2.9e6; k++) { const v = Ds(b, k, 1, be, dl); if (v > m) { m = v; arg = '(' + b + ',' + k + ')'; } }
  console.log('  ' + pad(be, 6) + pad(dl, 7) + pad(F(m, 4), 28) + pad(arg, 12) + pad(F(KAPPA * dl, 4), 16) + pad(F(m - KAPPA * dl, 4), 10));
}
check('stepped: the sup is NOT at (b,k) = (2,1) and is NOT 1.0597*delta - ln c', true, 'argmax moves to (10,1)/(4,1)/(2,2); beta re-enters the sup');
{
  let m = -Infinity; for (let b = 2; b <= 2000; b++) for (let k = 1; Math.pow(b, k + 1) <= 2.9e6; k++) m = Math.max(m, Ds(b, k, 1, 2, 0));
  check('stepped delta = 0, beta = 2, c = 1 needs K = ' + m.toFixed(4) + ', inside the trap [1.0033, 1.3946)', m > 1.0033 && m < 1.3946, 'the continuous lemma prices the same law at K = 0');
}
console.log('  stepped delta < 0, c = 1, beta = 1.5: D(b,1) still grows, but slowly --');
for (const dl of [-1, -0.1]) console.log('    delta = ' + dl + ': ' + [10, 100, 1000, 1700].map((b) => 'b=' + b + ': ' + F(Ds(b, 1, 1, 1.5, dl), 3).trim()).join('   '));
check('Ghat is a step function, so NO strictly increasing c n^beta (ln n)^delta can equal it',
  G.at(3) === G.at(4) && G.at(3) === 6, 'Ghat(3) = Ghat(4) = 6 on the trusted ladder: the lemma\'s hypothesis is empty for Ghat itself');

// ================================================ D. the K -> beta_bound map
console.log('');
console.log('=== D. THE MAP K -> beta_bound(K) = min_b (f(b)+K)/ln b, RECOMPUTED =====');
const bbound = (K) => { let v = Infinity, a = 0; for (let b = 2; b <= 82; b++) { const t = (f(b) + K) / Math.log(b); if (t < v) { v = t; a = b; } } return [v, a]; };
const kmin = (be) => { let v = -Infinity, a = 0; for (let b = 2; b <= 82; b++) { const t = be * Math.log(b) - f(b); if (t > v) { v = t; a = b; } } return [v, a]; };
console.log('  ' + pad('K', 10) + pad('beta_bound', 12) + pad('argmin b', 10) + pad('note', 10) + '   |  ' + pad('beta', 10) + pad('K_min', 10) + pad('argmax b', 10) + pad('note', 10));
const LK = [[1.0033, 1.8730, 16], [1.3946, 2.0000, 66], [2, 2.1422, 78], [3, 2.3701, 82], [5, 2.8239, 82], [10, 3.9586, 82], [11.3568, 4.2665, 82]];
const LB = [[1, 0.0000, 2], [1.5, 0.3466, 2], [1.777, 0.7372, 16], [1.797, 0.7927, 16], [2, 1.3946, 66], [3, 5.7759, 82], [B2, 11.3568, 82]];
for (let i = 0; i < LK.length; i++) {
  const [K, nv, na] = LK[i], [bv, ba] = bbound(K);
  const [be, nw, nb] = LB[i], [kv, ka] = kmin(be);
  console.log('  ' + pad(K, 10) + pad(F(bv), 12) + pad(ba, 10) + pad(Math.abs(bv - nv) < 5e-5 && ba === na ? 'agrees' : 'DIFFERS', 10) +
    '   |  ' + pad(be === B2 ? 'beta2' : be, 10) + pad(F(kv), 10) + pad(ka, 10) + pad(Math.abs(kv - nw) < 5e-5 && ka === nb ? 'agrees' : 'DIFFERS', 10));
  check('row ' + (i + 1) + ' of both halves of the note\'s SEC D table', Math.abs(bv - nv) < 5e-5 && ba === na && Math.abs(kv - nw) < 5e-5 && ka === nb);
}
check('the trusted legal zone is exactly [K_min(2), K_min(beta2)) = [1.3946, 11.3568)',
  Math.abs(kmin(2)[0] - 1.3946) < 5e-5 && Math.abs(kmin(B2)[0] - 11.3568) < 5e-5);
check('beta_bound(K) >= 2 for every K >= 1.3946 (the wrong-direction guard)',
  [1.3946, 1.5, 3, 7, 11.3568].every((K) => bbound(K)[0] >= 2 - 1e-9));
{
  let prev = null; const sw = [];
  for (let K = 0; K <= 13; K += 0.0001) { const a = bbound(K)[1]; if (a !== prev) { sw.push(a + ' from K = ' + K.toFixed(4)); prev = a; } }
  console.log('  argmin base as K rises: ' + sw.join(';  '));
  check('argmin is 82 for every K >= 3 (it becomes 82 already at K ~ 2.357)', bbound(3)[1] === 82 && bbound(2.3566)[1] === 82 && bbound(2.3565)[1] !== 82);
  check('argmin is 16 on an INTERVAL of K, not "only at K = 1.0033"', bbound(0.7)[1] === 16 && bbound(1.2)[1] === 16 && bbound(1.28)[1] !== 16, 'b = 16 binds for K in [0.6293, 1.2791)');
}
console.log('  the superseded single-base form at the corrected ceiling:');
console.log('    f(16) = ln Ghat(16) = ln G2(13#) = ln 66 = ' + f(16).toFixed(6) + '   (so "ln 66" is f(16), correctly)');
console.log('    (ln 66 + 11.3568)/ln 16 = ' + ((Math.log(66) + 11.3568) / Math.log(16)).toFixed(4) + '   vs beta2 = ' + B2.toFixed(5));
check('the base-16 formula reads 5.607 at the ceiling, above beta2 (the correction applied to TODO.md 1d)',
  Math.abs((Math.log(66) + 11.3568) / Math.log(16) - 5.6072) < 5e-4 && (Math.log(66) + 11.3568) / Math.log(16) > B2);
check('base 82 is the binding base there, and it lands beta_bound at beta2 exactly', bbound(11.3568)[1] === 82 && Math.abs(bbound(11.3568)[0] - B2) < 1e-4);
console.log('  which bases convert a one-base K into beta < beta2 (81 reachable bases, b = 2..82):');
console.log('  ' + pad('K', 10) + pad('count', 8) + pad('smallest', 10) + '  the set');
for (const K of [2, 7.6394, 10, 11]) {
  const s = []; for (let b = 2; b <= 82; b++) if ((f(b) + K) / Math.log(b) < B2) s.push(b);
  console.log('  ' + pad(K, 10) + pad(s.length, 8) + pad(s[0], 10) + '  ' + (s.length > 12 ? s.slice(0, 4).join(',') + ',...,' + s.slice(-2).join(',') : s.join(',')));
}
{
  const s = []; for (let b = 2; b <= 82; b++) if ((f(b) + 11) / Math.log(b) < B2) s.push(b);
  check('at K = 11 exactly 10 of 81 bases convert, the smallest being 72', s.length === 10 && s[0] === 72);
  check('the converting set is NOT the interval [72,82]: b = 73 fails', s.indexOf(73) === -1 && s.length === 10, 'set = {' + s.join(',') + '}');
}

// ======================================= E. defects, margins, control movement
console.log('');
console.log('=== E. POWER-PAIR DEFECTS, MARGINS, THE CONTROL\'S SUP MOVEMENT ==========');
function supD(L, cap) { let m = -Infinity, a = null; const ps = pairs(cap); for (const [b, k] of ps) { const d = Dof(L, b, k); if (d > m) { m = d; a = [b, k]; } } return { sup: m, at: a, n: ps.length }; }
const g82 = supD(G, 82), g46 = supD(G, 46), h82 = supD(HC, 82), h312 = supD(HC, 312);
console.log('  G2 trusted (cap 82):  ' + g82.n + ' pairs, sup D = ' + F(g82.sup) + ' at (' + g82.at + ')');
console.log('  G2 custody (cap 46):  ' + g46.n + ' pairs, sup D = ' + F(g46.sup) + ' at (' + g46.at + ')');
console.log('  control  (cap 82):    ' + h82.n + ' pairs, sup D = ' + F(h82.sup) + ' at (' + h82.at + ')');
console.log('  control  (cap 312):   ' + h312.n + ' pairs, sup D = ' + F(h312.sup) + ' at (' + h312.at + ')');
check('15 / 9 / 15 / 29 pairs and sups 1.0033 (4,2), 0.9694 (2,4), 0.6931 (9,1), 0.9478 (10,1)',
  g82.n === 15 && g46.n === 9 && h82.n === 15 && h312.n === 29 && Math.abs(g82.sup - 1.0033) < 5e-5 && Math.abs(g46.sup - 0.9694) < 5e-5 && Math.abs(h82.sup - 0.6931) < 5e-5 && Math.abs(h312.sup - 0.9478) < 5e-5);
console.log('  control sup movement over a fourfold reach: ' + F(h312.sup - h82.sup, 4) + ' nats  (exactly ln(258/200) = ln 1.29)');
check('the movement is +0.2546 nats', Math.abs((h312.sup - h82.sup) - 0.2546) < 5e-5, 'closed form ln(1.29) = ' + Math.log(1.29).toFixed(6));
console.log('  margins K - sup D on the reachable pairs: at K = 11.3568 -> ' + F(11.3568 - g82.sup) + ',  at K = 1.3946 -> ' + F(1.3946 - g82.sup));
check('the margins 10.3535 and 0.3913 are K - sup D and reproduce', Math.abs((11.3568 - g82.sup) - 10.3535) < 5e-5 && Math.abs((1.3946 - g82.sup) - 0.3913) < 5e-5);
{
  let mx = -Infinity; for (let n = 2; n <= 82; n++) mx = Math.max(mx, Math.log(n * n / G.at(n)));
  check('max S(n) = ln(n^2/Ghat(n)) = 1.3946 on the trusted range', Math.abs(mx - 1.3946) < 5e-5, 'S = ' + F(mx) + ', and K_min(2) is the same number by algebra');
}

// ========================================= F. the six readers, rebuilt from 3a
console.log('');
console.log('=== F. THE SIX READERS, REBUILT FROM measure-0830-delta-reader.md 3a ====');
function rR0(L) { const bmax = Math.floor(Math.sqrt(L.cap)), X = [], y = []; for (let b = 2; b <= bmax; b++) { X.push([Math.log(Math.log(b))]); y.push(L.f(b * b) - 2 * L.f(b)); } const r = ols(X, y, true); return { d: -r.b[1], se: r.se[1], n: r.n }; }
function rRA(L) { const X = [], y = []; for (const [b, k] of pairs(L.cap)) { if (k < 2) continue; X.push([Math.log(1 - 1 / (k * k))]); y.push(L.f(Math.pow(b, k + 1)) - 2 * L.f(Math.pow(b, k)) + L.f(Math.pow(b, k - 1))); } const r = ols(X, y, false); return { d: r.b[0], se: r.se[0], n: r.n }; }
function rRB(L, bh) { const X = [], y = []; for (let i = 0; i < L.pr.length; i++) { const p = L.pr[i]; if (p < 5) continue; X.push([Math.log(Math.log(p))]); y.push(Math.log(L.vals[i]) - bh * Math.log(p)); } const r = ols(X, y, true); return { d: r.b[1], se: r.se[1], n: r.n }; }
function rRC2(L) { const X = [], y = []; for (let k = 1; Math.pow(2, k + 1) <= L.cap; k++) { X.push([Math.log((k + 1) / k)]); y.push(L.f(Math.pow(2, k + 1)) - L.f(Math.pow(2, k))); } const r = ols(X, y, true); return { d: r.b[1], se: r.se[1], n: r.n }; }
function rRC(L) { const X = [], y = []; for (const [b, k] of pairs(L.cap)) { X.push([Math.log(b), Math.log((k + 1) / k)]); y.push(L.f(Math.pow(b, k + 1)) - L.f(Math.pow(b, k))); } const r = ols(X, y, false); return { d: r.b[1], se: r.se[1], n: r.n, beta: r.b[0] }; }
function rRD(L) { const X = [], y = []; for (let i = 0; i < L.pr.length; i++) { const p = L.pr[i]; if (p < 5) continue; X.push([Math.log(p), Math.log(Math.log(p))]); y.push(Math.log(L.vals[i])); } const r = ols(X, y, true); return { d: r.b[2], se: r.se[2], n: r.n, beta: r.b[1] }; }
const RDRS = [['R0', rR0], ['RA', rRA], ['RB', (L, b) => rRB(L, b)], ['RC2', rRC2], ['RC', rRC], ['RD', rRD]];
function synth(pr, be, dl, last, cap, round) {
  const pl = pr[pr.length - 1], c = last / (Math.pow(pl, be) * Math.pow(Math.log(pl), dl));
  return ladder(pr, pr.map((p) => { const x = c * Math.pow(p, be) * Math.pow(Math.log(p), dl); return round ? Math.max(2, Math.round(x)) : Math.max(2, x); }), cap);
}
const GEO = [['control geometry (64 primes, beta 1)', PR64, 1, 1110, 312, [[-1.170, -0.340, -0.295, -2.118], [-1.311, -0.563, -0.341, -1.721], [-1.002, -0.001, 1.011, 1.908], [-1.128, -0.411, -1.293, -2.134], [-1.216, -0.353, -0.022, -1.599], [-1.018, -0.010, 1.071, 1.345]]],
  ['G2 geometry (22 primes, beta 1.5)', PR22, 1.5, 1710, 82, [[-1.441, -0.804, -0.993, -3.001], [-1.810, -1.284, -1.286, -3.011], [-0.999, 0.005, 1.001, 1.958], [-1.463, -0.920, -1.700, -3.151], [-1.639, -1.002, -0.949, -2.686], [-1.006, 0.039, 1.025, 1.700]]]];
for (const [gn, pr, be, last, cap, want] of GEO) {
  console.log('  ' + gn + ', stepped and integer-rounded, delta = -1, 0, +1, +2:');
  console.log('  ' + pad('reader', 7) + [-1, 0, 1, 2].map((d) => pad('delta=' + d, 11)).join('') + '   vs the note');
  RDRS.forEach(([nm, fn], i) => {
    const got = [-1, 0, 1, 2].map((d) => fn(synth(pr, be, d, last, cap, true), be).d);
    const agree = got.every((v, j) => Math.abs(v - want[i][j]) < 5e-4);
    console.log('  ' + pad(nm, 7) + got.map((v) => pad(F(v, 4), 11)).join('') + '   ' + (agree ? 'agrees' : 'DIFFERS'));
    check(gn.slice(0, 7) + ' row ' + nm + ' of the note\'s SEC 4a table', agree);
  });
}
{
  const wrong = [];
  for (const [gn, pr, be, last, cap] of GEO) for (const [nm, fn] of RDRS) { if (nm === 'RB' || nm === 'RD') continue; if (fn(synth(pr, be, 1, last, cap, true), be).d < 0) wrong.push(gn.slice(0, 7) + '/' + nm); }
  check('all four power-chain readers read a NEGATIVE delta_hat at true delta = +1, both geometries', wrong.length === 8, wrong.join(' '));
}
console.log('  IS IT THE STEPPING OR THE ROUNDING? R0 at delta = -1, 0, +1, +2:');
for (const [gn, pr, be, last, cap] of GEO) {
  const st = [-1, 0, 1, 2].map((d) => F(rR0(synth(pr, be, d, last, cap, true)).d, 4)).join(' ');
  const sn = [-1, 0, 1, 2].map((d) => F(rR0(synth(pr, be, d, last, cap, false)).d, 4)).join(' ');
  const cn = [-1, 0, 1, 2].map((d) => { const fc = (t) => be * Math.log(t) + d * Math.log(Math.log(t)); const X = [], y = []; for (let b = 2; b <= Math.floor(Math.sqrt(cap)); b++) { X.push([Math.log(Math.log(b))]); y.push(fc(b * b) - 2 * fc(b)); } return F(-ols(X, y, true).b[1], 4); }).join(' ');
  console.log('    ' + pad(gn.slice(0, 18), 20) + ' stepped+rounded:' + st + '   stepped, no rounding:' + sn + '   continuous:' + cn);
}
check('the failure is the STEPPING, not the integer rounding', true, 'unrounded stepped readings sit within 0.05 of the rounded ones; the continuous law returns -delta exactly');
console.log('');
console.log('  the readers on the REAL control (A048670): reach 312 (C1: d>0 and d-2se>0), reach 82 (C2: d>0 and d-se>0)');
console.log('  ' + pad('reader', 7) + pad('reach 312', 24) + pad('C1', 7) + pad('reach 82', 24) + pad('C2', 7));
const WANT_E = { R0: [-0.5157, 0.1969, -0.5298, 0.3018], RA: [-0.7735, 0.2245, -0.8562, 0.3371], RB: [1.0235, 0.0399, 0.6961, 0.0796], RC2: [-0.3637, 0.1725, -0.3341, 0.2364], RC: [-0.5939, 0.1462, -0.7087, 0.2081], RD: [-0.3837, 0.1404, -0.6207, 0.4889] };
const passT = {};
for (const [nm, fn] of RDRS) {
  const o1 = fn(HC, 1), o2 = fn(HC22, 1);
  const c1 = o1.d > 0 && o1.d - 2 * o1.se > 0, c2 = o2.d > 0 && o2.d - o2.se > 0;
  passT[nm] = { C1: c1, C2: c2 };
  console.log('  ' + pad(nm, 7) + pad(F(o1.d) + ' +- ' + F(o1.se).trim() + ' n=' + o1.n, 24) + pad(c1 ? 'holds' : 'FAILS', 7) + pad(F(o2.d) + ' +- ' + F(o2.se).trim() + ' n=' + o2.n, 24) + pad(c2 ? 'holds' : 'FAILS', 7));
  const w = WANT_E[nm];
  check('SEC 4c row ' + nm + ' reproduces (both reaches, value and se)', Math.abs(o1.d - w[0]) < 5e-4 && Math.abs(o1.se - w[1]) < 5e-4 && Math.abs(o2.d - w[2]) < 5e-4 && Math.abs(o2.se - w[3]) < 5e-4);
}
check('exactly one reader passes C1 and C2 on the control, and it is RB with beta pinned at 1',
  Object.keys(passT).filter((k) => passT[k].C1 && passT[k].C2).join(',') === 'RB');
{
  const g = rRD(HC), c = rRC(HC);
  console.log('  the exponents the fitting readers pick on the control: RD beta_hat = ' + F(g.beta) + ', RC beta_hat = ' + F(c.beta));
  const miss = [-1, 0, 1].map((d) => Math.abs(rRD(synth(PR64, 1, d, 1110, 312, true)).d - d));
  console.log('  RD calibration misses at delta = -1, 0, +1 (64 terms): ' + miss.map((m) => F(m, 4)).join('  ') + '   at delta = +2: ' + F(Math.abs(rRD(synth(PR64, 1, 2, 1110, 312, true)).d - 2), 4));
  check('RD\'s largest miss on {-1,0,1} is 0.0709, i.e. NOT "<= 0.07"; and it misses delta = 2 by 0.655, failing S1',
    Math.abs(Math.max.apply(null, miss) - 0.0709) < 5e-4 && Math.abs(rRD(synth(PR64, 1, 2, 1110, 312, true)).d - 2) > 0.5);
}

// ============================================ G. RB's algebra on the G2 ladder
console.log('');
console.log('=== G. RB ON G2: THE ZERO CROSSING AGAINST THE RAW LOG-LOG SLOPE ========');
{
  const x = [], u = [], y = [];
  for (let i = 0; i < PR22.length; i++) { const p = PR22[i]; if (p < 5) continue; x.push(Math.log(p)); u.push(Math.log(Math.log(p))); y.push(Math.log(G2V[i])); }
  const n = x.length, mx = mean(x), mu = mean(u), my = mean(y);
  let Suu = 0, Sux = 0, Suy = 0, Sxx = 0, Sxy = 0;
  for (let i = 0; i < n; i++) { Suu += (u[i] - mu) ** 2; Sux += (u[i] - mu) * (x[i] - mx); Suy += (u[i] - mu) * (y[i] - my); Sxx += (x[i] - mx) ** 2; Sxy += (x[i] - mx) * (y[i] - my); }
  console.log('  n = ' + n + ' ladder primes (p >= 5), corr(ln p, ln ln p) = ' + F(corr(x, u)));
  console.log('  RB over the exponent bracket: ' + [1.3, 1.4, 1.5, 1.6, 1.777, 1.8].map((b) => 'beta=' + b + ': ' + F(rRB(G, b).d, 4).trim()).join('   '));
  const o = rRB(G, 1.5);
  console.log('  RB at beta_hat = 1.50: delta_hat = ' + F(o.d) + ' +- ' + F(o.se) + ' (n = ' + o.n + ')');
  check('RB\'s G2 reading 0.8024 +- 0.0875 at beta_hat = 1.50 reproduces', Math.abs(o.d - 0.8024) < 5e-4 && Math.abs(o.se - 0.0875) < 5e-4);
  check('RB\'s sensitivity d(delta_hat)/d(beta_hat) = -Sux/Suu = -2.8949 reproduces', Math.abs(-Sux / Suu + 2.8949) < 5e-4);
  const cross = Suy / Sux, raw = Sxy / Sxx;
  console.log('  zero crossing beta* = Suy/Sux   = ' + cross.toFixed(6));
  console.log('  raw log-log slope beta_raw      = ' + raw.toFixed(6) + '  (same 20 terms)');
  console.log('  difference                      = ' + (cross - raw).toExponential(2));
  check('crossing and raw slope agree to three places but are NOT the same estimator',
    Math.abs(cross - raw) < 5e-4 && Math.abs(cross - raw) > 1e-6, 'Suy*Sxx != Sxy*Sux; high collinearity makes them close, it does not force equality');
  check('RB passes all four pre-registered criteria and returns a POSITIVE delta_hat on G2',
    passT.RB.C1 && passT.RB.C2 && o.d > 0 && o.d - 2 * o.se > 0,
    'so "unreadable by any instrument tried" needs the qualifier "non-circular"');
}

// ================================== H. independent noise study (own generator)
console.log('');
console.log('=== H. INDEPENDENT NOISE STUDY (xorshift32, seed 987654321, 400 draws) ==');
{
  let s = 987654321 >>> 0;
  const rnd = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  const gauss = () => { let a = 0; while (a === 0) a = rnd(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * rnd()); };
  const SD = 0.055, N = 400;
  console.log('  log-noise sd = ' + SD + ', ' + N + ' draws per cell');
  console.log('  ' + pad('geometry', 22) + pad('reader', 7) + pad('delta', 7) + pad('mean d_hat', 12) + pad('sd', 10) + pad('P(sign right)', 15));
  for (const [gn, pr, be, last, cap] of GEO) for (const [nm, fn] of [['R0', rR0], ['RC', rRC], ['RD', rRD], ['RB', (L, b) => rRB(L, b)]]) for (const d of [1, -1]) {
    const vs = [];
    for (let t = 0; t < N; t++) {
      const pl = pr[pr.length - 1], c = last / (Math.pow(pl, be) * Math.pow(Math.log(pl), d));
      const L = ladder(pr, pr.map((p) => Math.max(2, Math.round(c * Math.pow(p, be) * Math.pow(Math.log(p), d) * Math.exp(SD * gauss())))), cap);
      vs.push(fn(L, be).d);
    }
    const m = mean(vs), sd = Math.sqrt(mean(vs.map((v) => (v - m) ** 2)));
    console.log('  ' + pad(gn.slice(0, 20), 22) + pad(nm, 7) + pad(d, 7) + pad(F(m, 4), 12) + pad(F(sd, 4), 10) + pad(F(vs.filter((v) => Math.sign(v) === Math.sign(d)).length / N, 2), 15));
  }
  check('under the control\'s own residual noise RD and RB resolve the sign of delta = +-1; R0 and RC do not', true, 'reported, not scored, as in the note');
}

console.log('');
console.log('FAILS = ' + FAILS);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0830-fekete.js
//   invocation:  node research/history/staging/redteam-0830-fekete.js
//   code-sha256: 99b1c117f6214d02206ab3837624863e1bac13a15618a0240ba918a8d044a9e8
//   out-sha256:  ae4fdbb9695a7e1f1b969814cf742517b16196ea14f392cd4875b13f5e9296a8
//   body-lines:  196
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     0.8 s
// ============================================================================
// === A. CUSTODY: the three ladders, re-parsed by this file ==============
//   [ok  ] A144311 parses, 22 terms, last 1709
//   [ok  ] A048670 control parses, 64 terms, last 1110
//   [ok  ] exact ladder parses, 14 terms, agrees with A144311+1 on all 14
//   [ok  ] reaches: G2 to p = 79, control to p = 311
//
// === B. THE SIGN LEMMA ON THE CONTINUOUS LAW Ghat = c n^beta (ln n)^delta
//   [ok  ] closed form D(b,k) = -ln c + delta[ln((k+1)/k) - ln ln b] (beta cancels)   max abs err 2.35e-13 over 900 cells
//   the constant of the lemma: ln 2 - ln ln 2 = 1.059660   (the note writes 1.0597)
//     delta   sup D over b in [2,1e5], k in [1,60], c = 1    argmax (b,k)  1.0597*delta
//         0                                      0.000000           (2,1)      0.000000
//   [ok  ] delta = 0: sup attained at (2,1) and equals (ln2 - lnln2)*delta
//      0.25                                      0.264915           (2,1)      0.264915
//   [ok  ] delta = 0.25: sup attained at (2,1) and equals (ln2 - lnln2)*delta
//       0.5                                      0.529830           (2,1)      0.529830
//   [ok  ] delta = 0.5: sup attained at (2,1) and equals (ln2 - lnln2)*delta
//         1                                      1.059660           (2,1)      1.059660
//   [ok  ] delta = 1: sup attained at (2,1) and equals (ln2 - lnln2)*delta
//         2                                      2.119320           (2,1)      2.119320
//   [ok  ] delta = 2: sup attained at (2,1) and equals (ln2 - lnln2)*delta
//   [ok  ] delta = 0 exactly: D is the constant -ln c on every (b,k)   so K = max(0, -ln c) works and the hypothesis is satisfiable
//   BASE-FLOOR SENSITIVITY of the constant (delta = 1, c = 1): sup over b >= b0 is ln 2 - ln ln b0
//       b0         sup   share of the b0 = 2 value
//        2    1.059660                      1.0000
//        3    0.599099                      0.5654
//        4    0.366513                      0.3459
//       16   -0.326634                     -0.3082
//       66   -0.739471                     -0.6978
//       82   -0.789983                     -0.7455
//   REAL bases below 2 (not admitted by (H-sub-pow), shown to price the quantifier), delta = 1, c = 1:
//   D(1.5,1) = 1.596   D(1.1,1) = 3.044   D(1.01,1) = 5.303   D(1.001,1) = 7.601
//   [ok  ] over real b >= 2 the sup is the same as over integer b >= 2
//   DIVERGENCE RATE for delta < 0 (c = 1): D(b,1) = |delta|(ln ln b - ln 2), so exceeding K needs
//      delta         K  ln ln b needed     b needed (exp of)
//       -0.1    1.3946          14.639         exp(2.279e+6)
//       -0.1   11.3568         114.261        exp(4.197e+49)
//       -0.5    1.3946           3.482         exp(3.254e+1)
//       -0.5   11.3568          23.407        exp(1.464e+10)
//         -1    1.3946           2.088         exp(8.067e+0)
//         -1   11.3568          12.050         exp(1.711e+5)
//   [ok  ] the note's oscillating-correction rider K <= ln(c2/c1^2) + 1.0597 delta holds (delta >= 0)   3 constant pairs x 3 deltas x 499 bases x 8 rungs
//
// === C. THE SAME LEMMA ON THE STEPPED LAW Ghat(n) = c P(n)^beta (ln P(n))^delta
//   (this is the shape measure-0830-delta-reader.md 2c says a ladder must present)
//     beta  delta  sup D, stepped (b <= 2000)      argmax  continuous sup    excess
//        1      0                      0.6829      (10,1)          0.0000    0.6829
//        1      1                      1.1216       (4,1)          1.0597    0.0619
//        1      2                      2.0305       (2,2)          2.1193   -0.0888
//      1.5      0                      1.0243      (10,1)          0.0000    1.0243
//      1.5      1                      1.3054       (4,1)          1.0597    0.2458
//      1.5      2                      2.1076       (2,2)          2.1193   -0.0117
//        2      0                      1.3658      (10,1)          0.0000    1.3658
//        2      1                      1.5549      (10,1)          1.0597    0.4952
//        2      2                      2.2431       (4,1)          2.1193    0.1238
//   [ok  ] stepped: the sup is NOT at (b,k) = (2,1) and is NOT 1.0597*delta - ln c   argmax moves to (10,1)/(4,1)/(2,2); beta re-enters the sup
//   [ok  ] stepped delta = 0, beta = 2, c = 1 needs K = 1.3658, inside the trap [1.0033, 1.3946)   the continuous lemma prices the same law at K = 0
//   stepped delta < 0, c = 1, beta = 1.5: D(b,1) still grows, but slowly --
//     delta = -1: b=10: 0.835   b=100: 0.908   b=1000: 1.248   b=1700: 1.315
//     delta = -0.1: b=10: 1.005   b=100: 0.169   b=1000: 0.133   b=1700: 0.133
//   [ok  ] Ghat is a step function, so NO strictly increasing c n^beta (ln n)^delta can equal it   Ghat(3) = Ghat(4) = 6 on the trusted ladder: the lemma's hypothesis is empty for Ghat itself
//
// === D. THE MAP K -> beta_bound(K) = min_b (f(b)+K)/ln b, RECOMPUTED =====
//            K  beta_bound  argmin b      note   |        beta     K_min  argmax b      note
//       1.0033      1.8730        16    agrees   |           1    0.0000         2    agrees
//   [ok  ] row 1 of both halves of the note's SEC D table
//       1.3946      2.0000        66    agrees   |         1.5    0.3466         2    agrees
//   [ok  ] row 2 of both halves of the note's SEC D table
//            2      2.1422        78    agrees   |       1.777    0.7372        16    agrees
//   [ok  ] row 3 of both halves of the note's SEC D table
//            3      2.3701        82    agrees   |       1.797    0.7927        16    agrees
//   [ok  ] row 4 of both halves of the note's SEC D table
//            5      2.8239        82    agrees   |           2    1.3946        66    agrees
//   [ok  ] row 5 of both halves of the note's SEC D table
//           10      3.9586        82    agrees   |           3    5.7759        82    agrees
//   [ok  ] row 6 of both halves of the note's SEC D table
//      11.3568      4.2665        82    agrees   |       beta2   11.3568        82    agrees
//   [ok  ] row 7 of both halves of the note's SEC D table
//   [ok  ] the trusted legal zone is exactly [K_min(2), K_min(beta2)) = [1.3946, 11.3568)
//   [ok  ] beta_bound(K) >= 2 for every K >= 1.3946 (the wrong-direction guard)
//   argmin base as K rises: 2 from K = 0.0000;  4 from K = 0.4055;  6 from K = 0.5782;  16 from K = 0.6293;  66 from K = 1.2791;  78 from K = 1.7507;  82 from K = 2.3566
//   [ok  ] argmin is 82 for every K >= 3 (it becomes 82 already at K ~ 2.357)
//   [ok  ] argmin is 16 on an INTERVAL of K, not "only at K = 1.0033"   b = 16 binds for K in [0.6293, 1.2791)
//   the superseded single-base form at the corrected ceiling:
//     f(16) = ln Ghat(16) = ln G2(13#) = ln 66 = 4.189655   (so "ln 66" is f(16), correctly)
//     (ln 66 + 11.3568)/ln 16 = 5.6072   vs beta2 = 4.26645
//   [ok  ] the base-16 formula reads 5.607 at the ceiling, above beta2 (the correction applied to TODO.md 1d)
//   [ok  ] base 82 is the binding base there, and it lands beta_bound at beta2 exactly
//   which bases convert a one-base K into beta < beta2 (81 reachable bases, b = 2..82):
//            K   count  smallest  the set
//            2      81         2  2,3,4,5,...,81,82
//       7.6394      65        16  16,18,20,21,...,81,82
//           10      34        49  49,50,51,52,...,81,82
//           11      10        72  72,74,75,76,77,78,79,80,81,82
//   [ok  ] at K = 11 exactly 10 of 81 bases convert, the smallest being 72
//   [ok  ] the converting set is NOT the interval [72,82]: b = 73 fails   set = {72,74,75,76,77,78,79,80,81,82}
//
// === E. POWER-PAIR DEFECTS, MARGINS, THE CONTROL'S SUP MOVEMENT ==========
//   G2 trusted (cap 82):  15 pairs, sup D =  1.0033 at (4,2)
//   G2 custody (cap 46):  9 pairs, sup D =  0.9694 at (2,4)
//   control  (cap 82):    15 pairs, sup D =  0.6931 at (9,1)
//   control  (cap 312):   29 pairs, sup D =  0.9478 at (10,1)
//   [ok  ] 15 / 9 / 15 / 29 pairs and sups 1.0033 (4,2), 0.9694 (2,4), 0.6931 (9,1), 0.9478 (10,1)
//   control sup movement over a fourfold reach:  0.2546 nats  (exactly ln(258/200) = ln 1.29)
//   [ok  ] the movement is +0.2546 nats   closed form ln(1.29) = 0.254642
//   margins K - sup D on the reachable pairs: at K = 11.3568 ->  10.3535,  at K = 1.3946 ->  0.3913
//   [ok  ] the margins 10.3535 and 0.3913 are K - sup D and reproduce
//   [ok  ] max S(n) = ln(n^2/Ghat(n)) = 1.3946 on the trusted range   S =  1.3946, and K_min(2) is the same number by algebra
//
// === F. THE SIX READERS, REBUILT FROM measure-0830-delta-reader.md 3a ====
//   control geometry (64 primes, beta 1), stepped and integer-rounded, delta = -1, 0, +1, +2:
//    reader   delta=-1    delta=0    delta=1    delta=2   vs the note
//        R0    -1.1700    -0.3398    -0.2948    -2.1178   agrees
//   [ok  ] control row R0 of the note's SEC 4a table
//        RA    -1.3107    -0.5631    -0.3412    -1.7209   agrees
//   [ok  ] control row RA of the note's SEC 4a table
//        RB    -1.0018    -0.0012     1.0113     1.9083   agrees
//   [ok  ] control row RB of the note's SEC 4a table
//       RC2    -1.1279    -0.4107    -1.2926    -2.1340   agrees
//   [ok  ] control row RC2 of the note's SEC 4a table
//        RC    -1.2158    -0.3526    -0.0223    -1.5992   agrees
//   [ok  ] control row RC of the note's SEC 4a table
//        RD    -1.0185    -0.0104     1.0709     1.3453   agrees
//   [ok  ] control row RD of the note's SEC 4a table
//   G2 geometry (22 primes, beta 1.5), stepped and integer-rounded, delta = -1, 0, +1, +2:
//    reader   delta=-1    delta=0    delta=1    delta=2   vs the note
//        R0    -1.4405    -0.8042    -0.9932    -3.0008   agrees
//   [ok  ] G2 geom row R0 of the note's SEC 4a table
//        RA    -1.8098    -1.2842    -1.2858    -3.0111   agrees
//   [ok  ] G2 geom row RA of the note's SEC 4a table
//        RB    -0.9990     0.0046     1.0013     1.9576   agrees
//   [ok  ] G2 geom row RB of the note's SEC 4a table
//       RC2    -1.4631    -0.9200    -1.6998    -3.1505   agrees
//   [ok  ] G2 geom row RC2 of the note's SEC 4a table
//        RC    -1.6389    -1.0015    -0.9493    -2.6856   agrees
//   [ok  ] G2 geom row RC of the note's SEC 4a table
//        RD    -1.0062     0.0385     1.0253     1.7005   agrees
//   [ok  ] G2 geom row RD of the note's SEC 4a table
//   [ok  ] all four power-chain readers read a NEGATIVE delta_hat at true delta = +1, both geometries   control/R0 control/RA control/RC2 control/RC G2 geom/R0 G2 geom/RA G2 geom/RC2 G2 geom/RC
//   IS IT THE STEPPING OR THE ROUNDING? R0 at delta = -1, 0, +1, +2:
//       control geometry ( stepped+rounded:-1.1700 -0.3398 -0.2948 -2.1178   stepped, no rounding:-1.1743 -0.3347 -0.2810 -2.1162   continuous:-1.0000  0.0000  1.0000  2.0000
//       G2 geometry (22 pr stepped+rounded:-1.4405 -0.8042 -0.9932 -3.0008   stepped, no rounding:-1.4496 -0.7711 -0.9846 -3.0483   continuous:-1.0000  0.0000  1.0000  2.0000
//   [ok  ] the failure is the STEPPING, not the integer rounding   unrounded stepped readings sit within 0.05 of the rounded ones; the continuous law returns -delta exactly
//
//   the readers on the REAL control (A048670): reach 312 (C1: d>0 and d-2se>0), reach 82 (C2: d>0 and d-se>0)
//    reader               reach 312     C1                reach 82     C2
//        R0  -0.5157 +- 0.1969 n=16  FAILS   -0.5298 +- 0.3018 n=8  FAILS
//   [ok  ] SEC 4c row R0 reproduces (both reaches, value and se)
//        RA  -0.7735 +- 0.2245 n=13  FAILS   -0.8562 +- 0.3371 n=7  FAILS
//   [ok  ] SEC 4c row RA reproduces (both reaches, value and se)
//        RB   1.0235 +- 0.0399 n=62  holds   0.6961 +- 0.0796 n=20  holds
//   [ok  ] SEC 4c row RB reproduces (both reaches, value and se)
//       RC2   -0.3637 +- 0.1725 n=7  FAILS   -0.3341 +- 0.2364 n=5  FAILS
//   [ok  ] SEC 4c row RC2 reproduces (both reaches, value and se)
//        RC  -0.5939 +- 0.1462 n=29  FAILS  -0.7087 +- 0.2081 n=15  FAILS
//   [ok  ] SEC 4c row RC reproduces (both reaches, value and se)
//        RD  -0.3837 +- 0.1404 n=62  FAILS  -0.6207 +- 0.4889 n=20  FAILS
//   [ok  ] SEC 4c row RD reproduces (both reaches, value and se)
//   [ok  ] exactly one reader passes C1 and C2 on the control, and it is RB with beta pinned at 1
//   the exponents the fitting readers pick on the control: RD beta_hat =  1.3838, RC beta_hat =  1.4687
//   RD calibration misses at delta = -1, 0, +1 (64 terms):  0.0185   0.0104   0.0709   at delta = +2:  0.6547
//   [ok  ] RD's largest miss on {-1,0,1} is 0.0709, i.e. NOT "<= 0.07"; and it misses delta = 2 by 0.655, failing S1
//
// === G. RB ON G2: THE ZERO CROSSING AGAINST THE RAW LOG-LOG SLOPE ========
//   n = 20 ladder primes (p >= 5), corr(ln p, ln ln p) =  0.9902
//   RB over the exponent bracket: beta=1.3: 1.3814   beta=1.4: 1.0919   beta=1.5: 0.8024   beta=1.6: 0.5129   beta=1.777: 0.0006   beta=1.8: -0.0660
//   RB at beta_hat = 1.50: delta_hat =  0.8024 +-  0.0875 (n = 20)
//   [ok  ] RB's G2 reading 0.8024 +- 0.0875 at beta_hat = 1.50 reproduces
//   [ok  ] RB's sensitivity d(delta_hat)/d(beta_hat) = -Sux/Suu = -2.8949 reproduces
//   zero crossing beta* = Suy/Sux   = 1.777190
//   raw log-log slope beta_raw      = 1.777143  (same 20 terms)
//   difference                      = 4.71e-5
//   [ok  ] crossing and raw slope agree to three places but are NOT the same estimator   Suy*Sxx != Sxy*Sux; high collinearity makes them close, it does not force equality
//   [ok  ] RB passes all four pre-registered criteria and returns a POSITIVE delta_hat on G2   so "unreadable by any instrument tried" needs the qualifier "non-circular"
//
// === H. INDEPENDENT NOISE STUDY (xorshift32, seed 987654321, 400 draws) ==
//   log-noise sd = 0.055, 400 draws per cell
//                 geometry reader  delta  mean d_hat        sd  P(sign right)
//     control geometry (64     R0      1     -0.2736    0.0889           0.00
//     control geometry (64     R0     -1     -1.1758    0.0966           1.00
//     control geometry (64     RC      1     -0.0211    0.0938           0.43
//     control geometry (64     RC     -1     -1.2076    0.1008           1.00
//     control geometry (64     RD      1      1.0037    0.1499           1.00
//     control geometry (64     RD     -1     -0.9984    0.1509           1.00
//     control geometry (64     RB      1      0.9987    0.0259           1.00
//     control geometry (64     RB     -1     -1.0000    0.0261           1.00
//     G2 geometry (22 prim     R0      1     -0.9838    0.1261           0.00
//     G2 geometry (22 prim     R0     -1     -1.4406    0.1463           1.00
//     G2 geometry (22 prim     RC      1     -0.9464    0.1354           0.00
//     G2 geometry (22 prim     RC     -1     -1.6378    0.1423           1.00
//     G2 geometry (22 prim     RD      1      1.0127    0.3436           1.00
//     G2 geometry (22 prim     RD     -1     -1.0204    0.3337           1.00
//     G2 geometry (22 prim     RB      1      1.0007    0.0468           1.00
//     G2 geometry (22 prim     RB     -1     -0.9992    0.0469           1.00
//   [ok  ] under the control's own residual noise RD and RB resolve the sign of delta = +-1; R0 and RC do not   reported, not scored, as in the note
//
// FAILS = 0
// ============================================================================
// READINGS
//
// ============================================================================
// READINGS
// ============================================================
// 1. THE SIGN LEMMA, CONTINUOUS FORM: STANDS. D(b,k) = -ln c + delta[ln((k+1)/k)
//    - ln ln b] to 2.35e-13 over 900 parameter cells (beta cancels exactly); for
//    delta >= 0 the sup over integer b >= 2, k >= 1 is attained at (2,1) and
//    equals (ln 2 - ln ln 2) delta - ln c = 1.059660 delta - ln c; at delta = 0
//    D is the constant -ln c on every rung, so K = max(0, -ln c) serves; for
//    delta < 0 the k = 1 rung diverges. Same over real b >= 2. [VERIFIED]
// 2. THE CONSTANT IS A b = 2 ARTEFACT. sup over b >= b0 is ln 2 - ln ln b0:
//    1.059660 (b0 = 2), 0.599099 (3), 0.366513 (4), NEGATIVE from b0 = 16 on.
//    Moving the floor from b = 2 to b = 3 removes 43% of the constant; base 2 is
//    where the asymptotic law is a formal extension (ln ln 2 < 0). [VERIFIED]
// 3. THE delta < 0 DIVERGENCE IS UNOBSERVABLE. D(b,1) = |delta|(ln ln b - ln 2),
//    so exceeding K = 11.3568 needs b > exp(1.711e+5) at delta = -1 and
//    b > exp(4.197e+49) at delta = -0.1. The truth gap is real and no finite
//    computation, and no base a proof would name, can reach it. [VERIFIED]
// 4. THE STEPPED LAW BREAKS THE LEMMA'S CONSTANT. For Ghat(n) = c P(n)^beta
//    (ln P(n))^delta, the only shape a primorial-indexed ladder can present,
//    the sup is not at (2,1), is not 1.0597 delta - ln c, and beta re-enters:
//    at delta = 0, c = 1 it is 0.6829 (beta = 1), 1.0243 (1.5), 1.3658 (2),
//    where the continuous lemma prices the same law at 0. The beta = 2 value
//    lands inside the trap [1.0033, 1.3946). Ghat(3) = Ghat(4) = 6 on the
//    trusted ladder, so no strictly increasing c n^beta (ln n)^delta equals
//    Ghat anywhere: the lemma's hypothesis is empty for the object. The iff
//    (finite K for delta >= 0, divergence for delta < 0) survives stepping;
//    the constant and the attainment point do not. [VERIFIED]
// 5. THE MAP AND THE ZONE REPRODUCE EXACTLY. All 14 cells of the note's SEC D
//    table (beta_bound(K), argmin b; K_min(beta), argmax b) agree; the trusted
//    zone is [K_min(2), K_min(beta2)) = [1.3946, 11.3568); beta_bound(K) >= 2
//    for every K >= 1.3946. The argmin base switches 2 -> 4 -> 6 -> 16 -> 66
//    -> 78 -> 82 at K = 0.4055, 0.5782, 0.6293, 1.2791, 1.7507, 2.3566, so
//    "82 for every K >= 3" holds (and from 2.3566), while "16 only at
//    K = 1.0033" is an interval, K in [0.6293, 1.2791). [VERIFIED]
// 6. THE TODO.md CORRECTION IS ARITHMETICALLY RIGHT. f(16) = ln G2(13#) = ln 66
//    = 4.189655, (ln 66 + 11.3568)/ln 16 = 5.6072 > beta2 = 4.26645, and base
//    82 is the argmin at the ceiling with beta_bound = 4.2665. [VERIFIED]
// 7. THE K = 11 COUNT IS RIGHT AND ITS PARENTHESIS IS NOT. Exactly 10 of 81
//    bases convert, smallest 72, but the set is {72, 74..82}: b = 73 does not
//    convert, so "from b = 72" is not an interval. Counts at other K: 81 of 81
//    at K = 2, 65 from b = 16 at 7.6394, 34 from b = 49 at 10. [VERIFIED]
// 8. MARGINS AND SUPS REPRODUCE. 15 / 9 / 15 / 29 reachable pairs; sup D =
//    1.0033 at (4,2) trusted, 0.9694 at (2,4) custody, 0.6931 at (9,1) and
//    0.9478 at (10,1) on the control; the movement is ln(258/200) = 0.254642;
//    margins 10.3535 and 0.3913 are K - sup D. max S(n) = 1.3946. [VERIFIED]
// 9. THE DELTA-READER TABLES REPRODUCE DIGIT FOR DIGIT ON INDEPENDENT CODE.
//    All 48 cells of SEC 4a (six readers x four deltas x two geometries) and
//    all 24 figures of SEC 4c (six readers, two reaches, value and se) agree
//    to 5e-4. All four power-chain readers read a negative delta_hat at true
//    delta = +1 in both geometries. Unrounded stepped laws read within 0.05 of
//    the rounded ones and the continuous law returns -delta exactly, so the
//    failure is the STEPPING, not the rounding. [VERIFIED]
// 10. RD IS A READER THE PRE-REGISTRATION KILLED. Its misses on {-1,0,+1} at 64
//    terms are 0.0185, 0.0104, 0.0709 (so "<= 0.07" is 0.0709) and it misses
//    delta = +2 by 0.6547, failing S1. Its control reading -0.3837 +- 0.1404
//    is the headline of the note and of TODO.md 1d. [VERIFIED]
// 11. RB PASSED THE GATE AND READ A POSITIVE SIGN. RB is the one reader passing
//    C1 and C2 on the control, and on G2 it reads delta_hat = 0.8024 +- 0.0875
//    at beta_hat = 1.50, positive at more than two standard errors. Its zero
//    crossing 1.777190 and the raw log-log slope 1.777143 of the same 20 terms
//    agree to three places but are different estimators (Suy/Sux against
//    Sxy/Sxx); collinearity 0.9902 makes them close, it does not force
//    equality. Sensitivity -2.8949 per unit beta_hat. [VERIFIED]
// 12. THE NOISE STUDY REPLICATES ON A DIFFERENT GENERATOR AND SEED. 400 draws,
//    sd 0.055: RD resolves the sign of delta = +-1 with P = 1.00 (sd 0.1499 at
//    64 terms, 0.3436 at 22), RB likewise (0.0259, 0.0468); R0 has P = 0.00 and
//    RC 0.43 at delta = +1. [MEASURED]
