// attack-0829n-hsubpow-K.js  —  TODO 1d: (H-sub-pow) with an explicit K, pass 2
//
// SCRATCHPAD-GRADE. Arithmetic only: no enumeration, no new G2 value. Every
// ladder term is PARSED from the corpus keepers (never retyped):
//   research/exact-g2-ladder.js               14 custody-exact G2 terms
//   research/import-interp-01-bgt-defect.js   the 22-term A144311 column (+1)
//   research/exponent-control.js              the 64-term A048670 control h
// The G2 ladders are cross-checked on their 14-term overlap before use.
//
// NOTATION. Ghat(t) = G2(P(t)#), P(t) the largest ladder prime <= t;
// f(t) = ln Ghat(t). The control is hhat(t) = h(P(t)#) (Jacobsthal, one
// class), g(t) = ln hhat(t). (H-sub-pow) at base b, rung k, constant K:
//   f(b^(k+1)) <= f(b^k) + f(b) + K,   defect D(b,k) = f(b^(k+1)) - f(b^k) - f(b).
// S(n) = ln(n^2 / Ghat(n)) is the slack of hsubpow-explicit-K.md 1b (P3):
// beta < 2 iff S(n) > K at one integer.
//
// SECTIONS (each answers one question of the note):
//  A. custody: the three ladders parse, the two G2 ladders agree on overlap.
//  B. S(n) on every step of the G2 ladder (value at the step's first and
//     last integer), and the control's analogue; the argmax base.
//  C. the power-pair defect D(b,k) on every reachable pair, for G2 (cap 82)
//     and for the control (cap 312); the sup, its argmax, the running sup
//     as reach grows, and the control's sup at G2's reach vs its own reach.
//  D. the exponent map both ways: beta_bound(K) = min_b (f(b)+K)/ln b over
//     reachable b, and K_min(beta) = max_b (beta ln b - f(b)); the legal
//     zone endpoints reproduced as K_min(2) and K_min(beta2).
//  E. the diagonal (k = 1) family D(b,1) = f(b^2) - 2 f(b) against ln ln b.
//     Under an EXACT law c n^beta (ln n)^delta, D(b,1) = -ln c + delta ln 2
//     - delta ln ln b, so the OLS slope against ln ln b reads -delta with
//     beta and c eliminated; synthetic laws at delta = +2, 0, -1 calibrate
//     the reading, and the sign lemma (all-bases sup finite iff delta >= 0)
//     is exhibited numerically at large b.
//  F. the lifting identity D(b^j,k) = sum_{i=jk}^{jk+j-1} D(b,i)
//     - sum_{i=1}^{j-1} D(b,i), checked on the ladder (base 2 -> 4, 8; 3 -> 9).
//  G. margins at the top of the zone: K - D(b,k) at every reachable rung,
//     and the required ratio cap e^K Ghat(b) against the measured ratios.
//
// beta2 = 4.26645028414864191641 is quoted from research/dhr-verification.md
// row 1a; it is a constant here, not recomputed.
//
// usage: node research/history/staging/attack-0829n-hsubpow-K.js

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
const BETA2 = 4.26645028414864191641;

function sievePrimes(n) {
  const s = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return out;
}
function ols(xs, ys) {
  const n = xs.length; let sx = 0, sy = 0;
  for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; }
  const mx = sx / n, my = sy / n; let sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); }
  const a = sxy / sxx, b = my - a * mx; let ss = 0;
  for (let i = 0; i < n; i++) ss += (ys[i] - a * xs[i] - b) ** 2;
  const se = n > 2 ? Math.sqrt(ss / (n - 2) / sxx) : NaN;
  return { a, b, se, n };
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
check('control tail a(59)..a(64) = 978..1110 (single-witness b-file terms)', HCTRL[58] === 978 && HCTRL[63] === 1110);

function mkLadder(name, pr, vals, cap) {
  const at = (t) => { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k < 0 ? null : vals[k]; };
  return { name, pr, vals, cap, at, f: (t) => Math.log(at(t)) };
}
const G = mkLadder('G2 (22 trusted)', PR22, G2FULL, 82);       // Ghat known on [2, 83)
const Hc = mkLadder('h control (64)', PR64, HCTRL, 312);       // hhat known on [2, 313)
const Gc = mkLadder('G2 (14 custody)', PR22.slice(0, 14), G2FULL.slice(0, 14), 46);

// ---------------------------------------------------------- B. slack S(n)
console.log('');
console.log('=== B. THE SLACK S(n) = ln(n^2/Ghat(n)) ON EVERY STEP, AND THE CONTROL ====');
console.log('  step x -> next: S at n = x (first integer of the step) and at n = next-1 (last);');
console.log('  the control column is ln(n^2/hhat(n)) at n = next-1.');
console.log('  ' + pad('x', 4) + pad('Ghat', 7) + pad('S(x)', 10) + pad('S(next-1)', 12) + pad('hhat', 7) + pad('S_h(next-1)', 13));
let sMax = -Infinity, sArg = 0, shMaxG = -Infinity, shArgG = 0;
for (let i = 0; i < 22; i++) {
  const x = PR22[i], nx = PR22[i + 1] - 1;
  const s0 = Math.log(x * x / G2FULL[i]), s1 = Math.log(nx * nx / G2FULL[i]);
  const sh = Math.log(nx * nx / HCTRL[i]);
  if (s1 > sMax) { sMax = s1; sArg = nx; }
  if (sh > shMaxG) { shMaxG = sh; shArgG = nx; }
  console.log('  ' + pad(x, 4) + pad(G2FULL[i], 7) + F(s0, 4).padStart(10) + F(s1, 4).padStart(12) + pad(HCTRL[i], 7) + F(sh, 4).padStart(13));
}
console.log('  max_n S(n) over n in [2,83)     = ' + F(sMax) + ' at n = ' + sArg + '   (the trusted trap ceiling)');
console.log('  control: max_n S_h(n), n < 83  = ' + F(shMaxG) + ' at n = ' + shArgG);
let shMax = -Infinity, shArg = 0;
for (let i = 0; i < 64; i++) { const nx = PR64[i + 1] - 1; const sh = Math.log(nx * nx / HCTRL[i]); if (sh > shMax) { shMax = sh; shArg = nx; } }
console.log('  control: max_n S_h(n), n < 313 = ' + F(shMax) + ' at n = ' + shArg + '   (the control slack keeps rising with reach: truth exponent below 2)');
check('trusted trap ceiling reproduces 1.3946 at n = 66', Math.abs(sMax - 1.3946) < 5e-5 && sArg === 66, F(sMax) + ' @ ' + sArg);

// ---------------------------------------------------------- C. power-pair defects
function powerPairs(L) {
  const out = [];
  for (let b = 2; b * b <= L.cap; b++) {
    for (let k = 1; Math.pow(b, k + 1) <= L.cap + 1e-9; k++) {
      const n = Math.round(Math.pow(b, k + 1)), m = Math.round(Math.pow(b, k));
      const D = L.f(n) - L.f(m) - L.f(b);
      out.push({ b, k, n, m, D });
    }
  }
  return out;
}
function defectReport(L) {
  const pp = powerPairs(L).sort((u, v) => u.n - v.n || u.b - v.b);
  console.log('  ' + L.name + ': ' + pp.length + ' reachable power pairs (b^(k+1) <= ' + L.cap + ')');
  let sup = -Infinity, arg = null;
  const runs = [];
  for (const p of pp) {
    if (p.D > sup) { sup = p.D; arg = p; runs.push({ n: p.n, sup, b: p.b, k: p.k }); }
  }
  return { pp, sup, arg, runs };
}
console.log('');
console.log('=== C. THE POWER-PAIR DEFECT D(b,k), REACHABLE RANGE, AND THE RUNNING SUP ====');
const dG = defectReport(G);
console.log('  ' + pad('b', 3) + pad('k', 3) + pad('b^k', 5) + pad('b^(k+1)', 8) + pad('D(b,k)', 10) + pad('K-D @1.3946', 13) + pad('K-D @11.3568', 14));
for (const p of dG.pp) console.log('  ' + pad(p.b, 3) + pad(p.k, 3) + pad(p.m, 5) + pad(p.n, 8) + F(p.D).padStart(10) + F(1.3946 - p.D).padStart(13) + F(11.3568 - p.D).padStart(14));
console.log('  sup D over the 15 pairs = ' + F(dG.sup) + ' at (b,k) = (' + dG.arg.b + ',' + dG.arg.k + '), i.e. the pair (' + dG.arg.m + ',' + dG.arg.b + ')');
console.log('  running sup K_run(n) = max D over pairs with b^(k+1) <= n, at each record:');
for (const r of dG.runs) console.log('    n <= ' + pad(r.n, 4) + '   K_run = ' + F(r.sup) + '   set by (b,k) = (' + r.b + ',' + r.k + ')');
check('trusted power-pair sup reproduces 1.0033 at (16,4)', Math.abs(dG.sup - 1.0033) < 5e-5 && dG.arg.m === 16 && dG.arg.b === 4, F(dG.sup));
const dGc = defectReport(Gc);
console.log('  custody sup D = ' + F(dGc.sup) + ' at (b,k) = (' + dGc.arg.b + ',' + dGc.arg.k + ')');
check('custody power-pair sup reproduces 0.9694 at (16,2)', Math.abs(dGc.sup - 0.9694) < 5e-5 && dGc.arg.m === 16 && dGc.arg.b === 2, F(dGc.sup));
console.log('');
const dH = defectReport(Hc);
console.log('  control running sup at each record (reach 312):');
for (const r of dH.runs) console.log('    n <= ' + pad(r.n, 4) + '   K_run = ' + F(r.sup) + '   set by (b,k) = (' + r.b + ',' + r.k + ')');
const dH82 = dH.pp.filter((p) => p.n <= 82);
let supH82 = -Infinity, argH82 = null;
for (const p of dH82) if (p.D > supH82) { supH82 = p.D; argH82 = p; }
console.log('  control sup D at G2 reach (b^(k+1) <= 82, ' + dH82.length + ' pairs) = ' + F(supH82) + ' at (' + argH82.b + ',' + argH82.k + ')');
console.log('  control sup D at own reach (b^(k+1) <= 312, ' + dH.pp.length + ' pairs) = ' + F(dH.sup) + ' at (' + dH.arg.b + ',' + dH.arg.k + ')');
console.log('  control: sup moved by ' + F(dH.sup - supH82) + ' nats when reach grew 82 -> 312');
// per-base sup for the control, to see which bases carry the sup
{
  const byB = new Map();
  for (const p of dH.pp) { if (!byB.has(p.b) || byB.get(p.b).D < p.D) byB.set(p.b, p); }
  const bs = [...byB.keys()].sort((u, v) => u - v);
  console.log('  control per-base sup_k D(b,k):  ' + bs.map((b) => b + ':' + byB.get(b).D.toFixed(3) + '(k=' + byB.get(b).k + ')').join('  '));
}

// ---------------------------------------------------------- D. the exponent map both ways
console.log('');
console.log('=== D. THE MAP K -> EXPONENT BOUND, AND ITS INVERSE, ON THE REACHABLE LADDER ====');
function betaBound(L, K) { let best = Infinity, arg = 0; for (let b = 2; b <= L.cap; b++) { const v = (L.f(b) + K) / Math.log(b); if (v < best) { best = v; arg = b; } } return { best, arg }; }
function kMin(L, beta) { let best = -Infinity, arg = 0; for (let b = 2; b <= L.cap; b++) { const v = beta * Math.log(b) - L.f(b); if (v > best) { best = v; arg = b; } } return { best, arg }; }
console.log('  beta_bound(K) = min_{2<=b<=82} (f(b)+K)/ln b   [an UPPER bound on beta under the hypothesis; the inf over all b is <= this]');
console.log('  ' + pad('K', 9) + pad('beta_bound', 12) + pad('argmin b', 10) + '   control: ' + pad('beta_bound_h', 13) + pad('argmin', 8));
const KGRID = [1.0033, 1.3946, 2, 3, 4, 5, 6, 8, 10, 11.3568, 12, 15];
for (const K of KGRID) {
  const g = betaBound(G, K), h = betaBound(Hc, K);
  console.log('  ' + F(K).padStart(9) + F(g.best).padStart(12) + pad(g.arg, 10) + '            ' + F(h.best).padStart(13) + pad(h.arg, 8));
}
const bb1 = betaBound(G, 1.3946), bb2 = betaBound(G, 11.3568);
check('beta_bound(1.3946) = 2.0000 at b = 66', Math.abs(bb1.best - 2) < 5e-5 && bb1.arg === 66, F(bb1.best) + ' @ ' + bb1.arg);
check('beta_bound(11.3568) = beta2 to 4 places at b = 82', Math.abs(bb2.best - BETA2) < 5e-5 && bb2.arg === 82, F(bb2.best) + ' @ ' + bb2.arg);
console.log('  K_min(beta) = max_{2<=b<=82} (beta ln b - f(b))   [a LOWER bound on any K for which the all-bases hypothesis holds, if beta is the true exponent]');
console.log('  ' + pad('beta', 9) + pad('K_min', 10) + pad('argmax b', 10) + '   control: ' + pad('K_min_h', 10) + pad('argmax', 8));
const BGRID = [1, 1.43, 1.5, 1.777, 1.797, 2, 2.5, 3, BETA2];
for (const be of BGRID) {
  const g = kMin(G, be), h = kMin(Hc, be);
  console.log('  ' + F(be).padStart(9) + F(g.best).padStart(10) + pad(g.arg, 10) + '            ' + F(h.best).padStart(10) + pad(h.arg, 8));
}
const km2 = kMin(G, 2), kmB = kMin(G, BETA2);
check('K_min(2) = 1.3946 at b = 66 (trap ceiling = zone floor)', Math.abs(km2.best - 1.3946) < 5e-5 && km2.arg === 66, F(km2.best));
check('K_min(beta2) = 11.3568 at b = 82 (zone ceiling)', Math.abs(kmB.best - 11.3568) < 5e-5 && kmB.arg === 82, F(kmB.best));
console.log('  read: the trusted legal zone [1.3946, 11.3568) is exactly [K_min(2), K_min(beta2)) on the reachable ladder.');
console.log('  K_min(1.5) vs the measured power-pair sup 1.0033: ' + F(kMin(G, 1.5).best) + ' vs ' + F(dG.sup) + '   (both are floors on the true K; the larger binds)');

// ---------------------------------------------------------- E. the diagonal and the sign of delta
console.log('');
console.log('=== E. THE DIAGONAL D(b,1) = f(b^2) - 2 f(b) AGAINST ln ln b: READS -delta ====');
function diag(L, bmax) { const xs = [], ys = [], rows = []; for (let b = 2; b <= bmax; b++) { const D = L.f(b * b) - 2 * L.f(b); xs.push(Math.log(Math.log(b))); ys.push(D); rows.push({ b, D }); } return { xs, ys, rows }; }
const eG = diag(G, 9), eH = diag(Hc, 17);
console.log('  G2, b = 2..9:      ' + eG.rows.map((r) => r.b + ':' + F(r.D, 3).trim()).join('  '));
console.log('  control, b = 2..17: ' + eH.rows.map((r) => r.b + ':' + F(r.D, 3).trim()).join('  '));
const oG = ols(eG.xs, eG.ys), oH = ols(eH.xs, eH.ys), oH9 = ols(eH.xs.slice(0, 8), eH.ys.slice(0, 8));
console.log('  OLS slope of D(b,1) on ln ln b  (reads -delta under an exact law c n^beta ln^delta n):');
console.log('    G2       b = 2..9   (n=8):  ' + F(oG.a) + ' +- ' + F(oG.se) + '   -> delta_hat = ' + F(-oG.a));
console.log('    control  b = 2..9   (n=8):  ' + F(oH9.a) + ' +- ' + F(oH9.se) + '   -> delta_hat = ' + F(-oH9.a));
console.log('    control  b = 2..17  (n=16): ' + F(oH.a) + ' +- ' + F(oH.se) + '   -> delta_hat = ' + F(-oH.a));
// synthetic exact laws evaluated at the same b (continuous, no step function)
function lawF(c, beta, delta) { return (t) => Math.log(c) + beta * Math.log(t) + delta * Math.log(Math.log(t)); }
for (const [c, beta, delta] of [[1.84, 1.546, 0], [1.016, 1, 2], [1, 1.5, -1]]) {
  const fl = lawF(c, beta, delta); const xs = [], ys = [];
  for (let b = 2; b <= 9; b++) { xs.push(Math.log(Math.log(b))); ys.push(fl(b * b) - 2 * fl(b)); }
  const o = ols(xs, ys);
  console.log('    synthetic c=' + c + ' beta=' + beta + ' delta=' + delta + ', b = 2..9: slope ' + F(o.a) + ' +- ' + F(o.se) + '   (exact: ' + F(-delta) + ')');
}
check('synthetic slope reads -delta exactly (delta = 2 law)', (() => { const fl = lawF(1.016, 1, 2); const xs = [], ys = []; for (let b = 2; b <= 9; b++) { xs.push(Math.log(Math.log(b))); ys.push(fl(b * b) - 2 * fl(b)); } return Math.abs(ols(xs, ys).a + 2) < 1e-9; })());
console.log('  the sign lemma, numerically: D(b,1) for exact laws at large b (c = 1, beta = 1.5):');
console.log('  ' + pad('b', 8) + pad('delta=+1', 12) + pad('delta=0', 12) + pad('delta=-1', 12) + pad('delta=-0.1', 12));
for (const b of [10, 100, 1e3, 1e4, 1e6, 1e9]) {
  const row = [1, 0, -1, -0.1].map((d) => { const fl = lawF(1, 1.5, d); return fl(b * b) - 2 * fl(b); });
  console.log('  ' + pad(b, 8) + row.map((v) => F(v).padStart(12)).join(''));
}
console.log('  read: delta < 0 makes sup_b D(b,1) = +infinity (all-bases (H-sub-pow) FALSE); delta >= 0 keeps it at delta(ln 2 - ln ln 2) - ln c = ' + F(1 * (Math.log(2) - Math.log(Math.log(2)))) + ' per unit delta, attained at b = 2.');

// ---------------------------------------------------------- F. the lifting identity
console.log('');
console.log('=== F. THE LIFTING IDENTITY D(b^j,k) = sum_{i=jk}^{jk+j-1} D(b,i) - sum_{i=1}^{j-1} D(b,i) ====');
function Dof(L, b, k) { return L.f(Math.pow(b, k + 1)) - L.f(Math.pow(b, k)) - L.f(b); }
let liftOK = true;
for (const [b, j, k] of [[2, 2, 1], [2, 2, 2], [2, 3, 1], [3, 2, 1]]) {
  if (Math.pow(b, j * (k + 1)) > G.cap) continue;
  const lhs = Dof(G, Math.pow(b, j), k);
  let rhs = 0; for (let i = j * k; i <= j * k + j - 1; i++) rhs += Dof(G, b, i); for (let i = 1; i <= j - 1; i++) rhs -= Dof(G, b, i);
  liftOK = liftOK && Math.abs(lhs - rhs) < 1e-12;
  console.log('  b=' + b + ' j=' + j + ' k=' + k + ':  D(' + Math.pow(b, j) + ',' + k + ') = ' + F(lhs) + '   block-sum form = ' + F(rhs));
}
check('lifting identity holds on the ladder to 1e-12', liftOK);

// ---------------------------------------------------------- G. margins at the top of the zone
console.log('');
console.log('=== G. WHAT A PROOF AT THE TOP OF THE ZONE MUST CERTIFY, AGAINST THE DATA ====');
const KTOP = 11.3568;
console.log('  required cap e^K Ghat(b) on the ratio Ghat(b^(k+1))/Ghat(b^k), K = ' + KTOP + ', against every reachable ratio and the b^1.5 model:');
console.log('  ' + pad('b', 3) + pad('Ghat(b)', 8) + pad('cap e^K Ghat(b)', 18) + pad('max ratio seen', 16) + pad('at k', 5) + pad('b^1.5', 10) + pad('b^beta2', 12) + pad('bound (f(b)+K)/ln b', 22));
for (let b = 2; b <= 9; b++) {
  let mr = 0, mk = 0;
  for (const p of dG.pp) if (p.b === b) { const r = G.at(p.n) / G.at(p.m); if (r > mr) { mr = r; mk = p.k; } }
  console.log('  ' + pad(b, 3) + pad(G.at(b), 8) + (Math.exp(KTOP) * G.at(b)).toExponential(3).padStart(18) + F(mr, 2).padStart(16) + pad(mk, 5) + F(Math.pow(b, 1.5), 2).padStart(10) + Math.pow(b, BETA2).toExponential(3).padStart(12) + F((G.f(b) + KTOP) / Math.log(b), 3).padStart(22));
}
console.log('  min over reachable b of the K-margin K - D(b,k): at K = 1.3946 -> ' + F(1.3946 - dG.sup) + ' nats; at K = 11.3568 -> ' + F(KTOP - dG.sup) + ' nats.');
console.log('  which reachable bases deliver beta_bound < beta2 (one-base proof at that K): smallest such b, and the count of such b in [2,82]:');
for (const K of [1.3946, 2, 3, 5, 7.6394, 10, 11]) {
  let first = null, cnt = 0;
  for (let b = 2; b <= 82; b++) if ((G.f(b) + K) / Math.log(b) < BETA2) { cnt++; if (first === null) first = b; }
  console.log('    K = ' + F(K) + ':  first b = ' + pad(first === null ? 'none' : first, 4) + '   count = ' + pad(cnt, 3) + ' of 81');
}
console.log('  the base-16 bound TODO 1d quotes, (ln 66 + K)/ln 16, at K = 1.3946, 7.6394, 11.3568: ' + [1.3946, 7.6394, 11.3568].map((K) => F((G.f(16) + K) / Math.log(16), 3).trim()).join(', ') + '   (beta2 = ' + F(BETA2, 3).trim() + ')');
console.log('  read: a one-base proof at a small base is legal and useless; only the largest reachable bases turn a zone K into beta < beta2.');

console.log('');
console.log('=== FAILS: ' + FAILS + ' ===============================================');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0829n-hsubpow-K.js
//   invocation:  node research/history/staging/attack-0829n-hsubpow-K.js
//   code-sha256: 507597061d11ed3a4d2372b257b9a8cf04c3ccb0048ccde44332cb8d12c5681f
//   out-sha256:  686c9c43706346006a746b194047cb851a8f346893646f187ed23df097f145f4
//   body-lines:  166
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     0.1 s
// ============================================================================
// === A. CUSTODY =====================================================
//   ok    exact ladder parsed (14 terms)   n=14
//   ok    A144311 parsed (22 terms)   n=22
//   ok    A048670 control parsed (64 terms)   n=64
//   ok    exact ladder == A144311+1 on the 14 shared terms
//   ok    last G2 prime is 79, last control prime is 311   79, 311
//   ok    control tail a(59)..a(64) = 978..1110 (single-witness b-file terms)
//
// === B. THE SLACK S(n) = ln(n^2/Ghat(n)) ON EVERY STEP, AND THE CONTROL ====
//   step x -> next: S at n = x (first integer of the step) and at n = next-1 (last);
//   the control column is ln(n^2/hhat(n)) at n = next-1.
//      x   Ghat      S(x)   S(next-1)   hhat  S_h(next-1)
//      2      2    0.6931      0.6931      2       0.6931
//      3      6    0.4055      0.9808      4       1.3863
//      5     12    0.7340      1.0986      6       1.7918
//      7     30    0.4906      1.2040     10       2.3026
//     11     42    1.0581      1.2321     14       2.3308
//     13     66    0.9402      1.3555     22       2.4541
//     17    108    0.9843      1.0986     26       2.5226
//     19    150    0.8782      1.1714     34       2.6557
//     23    204    0.9529      1.3463     40       2.9755
//     29    258    1.1816      1.2494     46       2.9738
//     31    348    1.0158      1.3148     58       3.1066
//     37    528    0.9527      1.1087     66       3.1881
//     41    546    1.1245      1.1727     74       3.1713
//     43    618    1.0959      1.2308     90       3.1575
//     47    708    1.1379      1.3400    100       3.2973
//     53    870    1.1721      1.3524    106       3.4574
//     59    966    1.2819      1.3155    118       3.4180
//     61   1080    1.2370      1.3946    132       3.4965
//     67   1284    1.2516      1.3393    152       3.4731
//     71   1398    1.2826      1.3105    174       3.3943
//     73   1530    1.2479      1.3804    190       3.4664
//     79   1710    1.2946         n/a    200          n/a
//   max_n S(n) over n in [2,83)     =  1.3946 at n = 66   (the trusted trap ceiling)
//   control: max_n S_h(n), n < 83  =  3.4965 at n = 66
//   control: max_n S_h(n), n < 313 =  4.4830 at n = 306   (the control slack keeps rising with reach: truth exponent below 2)
//   ok    trusted trap ceiling reproduces 1.3946 at n = 66    1.3946 @ 66
//
// === C. THE POWER-PAIR DEFECT D(b,k), REACHABLE RANGE, AND THE RUNNING SUP ====
//   G2 (22 trusted): 15 reachable power pairs (b^(k+1) <= 82)
//     b  k  b^k b^(k+1)    D(b,k)  K-D @1.3946  K-D @11.3568
//     2  1    2       4    0.4055       0.9891       10.9513
//     2  2    4       8    0.9163       0.4783       10.4405
//     3  1    3       9   -0.1823       1.5769       11.5391
//     2  3    8      16    0.0953       1.2993       11.2615
//     4  1    4      16    0.6061       0.7885       10.7507
//     5  1    5      25    0.3483       1.0463       11.0085
//     3  2    9      27    0.1252       1.2694       11.2316
//     2  4   16      32    0.9694       0.4252       10.3874
//     6  1    6      36    0.8824       0.5122       10.4744
//     7  1    7      49   -0.2400       1.6346       11.5968
//     2  5   32      64    0.4394       0.9552       10.9174
//     4  2   16      64    1.0033       0.3913       10.3535
//     8  1    8      64    0.1823       1.2123       11.1745
//     3  3   27      81    0.3344       1.0602       11.0224
//     9  1    9      81    0.6419       0.7527       10.7149
//   sup D over the 15 pairs =  1.0033 at (b,k) = (4,2), i.e. the pair (16,4)
//   running sup K_run(n) = max D over pairs with b^(k+1) <= n, at each record:
//     n <=    4   K_run =  0.4055   set by (b,k) = (2,1)
//     n <=    8   K_run =  0.9163   set by (b,k) = (2,2)
//     n <=   32   K_run =  0.9694   set by (b,k) = (2,4)
//     n <=   64   K_run =  1.0033   set by (b,k) = (4,2)
//   ok    trusted power-pair sup reproduces 1.0033 at (16,4)    1.0033
//   G2 (14 custody): 9 reachable power pairs (b^(k+1) <= 46)
//   custody sup D =  0.9694 at (b,k) = (2,4)
//   ok    custody power-pair sup reproduces 0.9694 at (16,2)    0.9694
//
//   h control (64): 29 reachable power pairs (b^(k+1) <= 312)
//   control running sup at each record (reach 312):
//     n <=    4   K_run =  0.0000   set by (b,k) = (2,1)
//     n <=    8   K_run =  0.2231   set by (b,k) = (2,2)
//     n <=   16   K_run =  0.3185   set by (b,k) = (4,1)
//     n <=   36   K_run =  0.4769   set by (b,k) = (6,1)
//     n <=   81   K_run =  0.6931   set by (b,k) = (9,1)
//     n <=  100   K_run =  0.9478   set by (b,k) = (10,1)
//   control sup D at G2 reach (b^(k+1) <= 82, 15 pairs) =  0.6931 at (9,1)
//   control sup D at own reach (b^(k+1) <= 312, 29 pairs) =  0.9478 at (10,1)
//   control: sup moved by  0.2546 nats when reach grew 82 -> 312
//   control per-base sup_k D(b,k):  2:0.293(k=6)  3:0.223(k=3)  4:0.486(k=3)  5:0.318(k=2)  6:0.679(k=2)  7:0.000(k=1)  8:0.278(k=1)  9:0.693(k=1)  10:0.948(k=1)  11:0.521(k=1)  12:0.748(k=1)  13:0.052(k=1)  14:0.241(k=1)  15:0.394(k=1)  16:0.573(k=1)  17:0.421(k=1)
//
// === D. THE MAP K -> EXPONENT BOUND, AND ITS INVERSE, ON THE REACHABLE LADDER ====
//   beta_bound(K) = min_{2<=b<=82} (f(b)+K)/ln b   [an UPPER bound on beta under the hypothesis; the inf over all b is <= this]
//           K  beta_bound  argmin b   control:  beta_bound_h  argmin
//      1.0033      1.8730        16                   1.3920     306
//      1.3946      2.0000        66                   1.4604     306
//      2.0000      2.1422        78                   1.5662     306
//      3.0000      2.3701        82                   1.7409     306
//      4.0000      2.5970        82                   1.9156     306
//      5.0000      2.8239        82                   2.0903     306
//      6.0000      3.0509        82                   2.2650     306
//      8.0000      3.5047        82                   2.6140     312
//     10.0000      3.9586        82                   2.9622     312
//     11.3568      4.2665        82                   3.1985     312
//     12.0000      4.4124        82                   3.3105     312
//     15.0000      5.0932        82                   3.8329     312
//   ok    beta_bound(1.3946) = 2.0000 at b = 66    2.0000 @ 66
//   ok    beta_bound(11.3568) = beta2 to 4 places at b = 82    4.2665 @ 82
//   K_min(beta) = max_{2<=b<=82} (beta ln b - f(b))   [a LOWER bound on any K for which the all-bases hypothesis holds, if beta is the true exponent]
//        beta     K_min  argmax b   control:    K_min_h  argmax
//      1.0000    0.0000         2                0.0000       2
//      1.4300    0.2981         2                1.2206     306
//      1.5000    0.3466         2                1.6212     306
//      1.7770    0.7372        16                3.2067     306
//      1.7970    0.7927        16                3.3211     306
//      2.0000    1.3946        66                4.4830     306
//      2.5000    3.5725        82                7.3454     312
//      3.0000    5.7759        82               10.2169     312
//      4.2665   11.3568        82               17.4901     312
//   ok    K_min(2) = 1.3946 at b = 66 (trap ceiling = zone floor)    1.3946
//   ok    K_min(beta2) = 11.3568 at b = 82 (zone ceiling)    11.3568
//   read: the trusted legal zone [1.3946, 11.3568) is exactly [K_min(2), K_min(beta2)) on the reachable ladder.
//   K_min(1.5) vs the measured power-pair sup 1.0033:  0.3466 vs  1.0033   (both are floors on the true K; the larger binds)
//
// === E. THE DIAGONAL D(b,1) = f(b^2) - 2 f(b) AGAINST ln ln b: READS -delta ====
//   G2, b = 2..9:      2:0.405  3:-0.182  4:0.606  5:0.348  6:0.882  7:-0.240  8:0.182  9:0.642
//   control, b = 2..17: 2:0.000  3:-0.470  4:0.318  5:0.105  6:0.477  7:0.000  8:0.278  9:0.693  10:0.948  11:0.521  12:0.748  13:0.052  14:0.241  15:0.394  16:0.573  17:0.421
//   OLS slope of D(b,1) on ln ln b  (reads -delta under an exact law c n^beta ln^delta n):
//     G2       b = 2..9   (n=8):   0.0961 +-  0.4137   -> delta_hat = -0.0961
//     control  b = 2..9   (n=8):   0.5298 +-  0.3018   -> delta_hat = -0.5298
//     control  b = 2..17  (n=16):  0.5157 +-  0.1969   -> delta_hat = -0.5157
//     synthetic c=1.84 beta=1.546 delta=0, b = 2..9: slope -0.0000 +-  0.0000   (exact:  0.0000)
//     synthetic c=1.016 beta=1 delta=2, b = 2..9: slope -2.0000 +-  0.0000   (exact: -2.0000)
//     synthetic c=1 beta=1.5 delta=-1, b = 2..9: slope  1.0000 +-  0.0000   (exact:  1.0000)
//   ok    synthetic slope reads -delta exactly (delta = 2 law)
//   the sign lemma, numerically: D(b,1) for exact laws at large b (c = 1, beta = 1.5):
//          b    delta=+1     delta=0    delta=-1  delta=-0.1
//         10     -0.1409      0.0000      0.1409      0.0141
//        100     -0.8340      0.0000      0.8340      0.0834
//       1000     -1.2395      0.0000      1.2395      0.1239
//      10000     -1.5272      0.0000      1.5272      0.1527
//    1000000     -1.9326      0.0000      1.9326      0.1933
//   1000000000     -2.3381      0.0000      2.3381      0.2338
//   read: delta < 0 makes sup_b D(b,1) = +infinity (all-bases (H-sub-pow) FALSE); delta >= 0 keeps it at delta(ln 2 - ln ln 2) - ln c =  1.0597 per unit delta, attained at b = 2.
//
// === F. THE LIFTING IDENTITY D(b^j,k) = sum_{i=jk}^{jk+j-1} D(b,i) - sum_{i=1}^{j-1} D(b,i) ====
//   b=2 j=2 k=1:  D(4,1) =  0.6061   block-sum form =  0.6061
//   b=2 j=2 k=2:  D(4,2) =  1.0033   block-sum form =  1.0033
//   b=2 j=3 k=1:  D(8,1) =  0.1823   block-sum form =  0.1823
//   b=3 j=2 k=1:  D(9,1) =  0.6419   block-sum form =  0.6419
//   ok    lifting identity holds on the ladder to 1e-12
//
// === G. WHAT A PROOF AT THE TOP OF THE ZONE MUST CERTIFY, AGAINST THE DATA ====
//   required cap e^K Ghat(b) on the ratio Ghat(b^(k+1))/Ghat(b^k), K = 11.3568, against every reachable ratio and the b^1.5 model:
//     b Ghat(b)   cap e^K Ghat(b)  max ratio seen at k     b^1.5     b^beta2   bound (f(b)+K)/ln b
//     2       2          1.711e+5            5.27    4      2.83    1.925e+1                17.384
//     3       6          5.133e+5            8.38    3      5.20    1.085e+2                11.968
//     4       6          5.133e+5           16.36    2      8.00    3.704e+2                 9.485
//     5      12          1.027e+6           17.00    1     11.18    9.597e+2                 8.600
//     6      12          1.027e+6           29.00    1     14.70    2.089e+3                 7.725
//     7      30          2.566e+6           23.60    1     18.52    4.032e+3                 7.584
//     8      30          2.566e+6           36.00    1     22.63    7.128e+3                 7.097
//     9      30          2.566e+6           57.00    1     27.00    1.178e+4                 6.717
//   min over reachable b of the K-margin K - D(b,k): at K = 1.3946 ->  0.3913 nats; at K = 11.3568 ->  10.3535 nats.
//   which reachable bases deliver beta_bound < beta2 (one-base proof at that K): smallest such b, and the count of such b in [2,82]:
//     K =  1.3946:  first b =    2   count =  81 of 81
//     K =  2.0000:  first b =    2   count =  81 of 81
//     K =  3.0000:  first b =    4   count =  79 of 81
//     K =  5.0000:  first b =    6   count =  76 of 81
//     K =  7.6394:  first b =   16   count =  65 of 81
//     K =  10.0000:  first b =   49   count =  34 of 81
//     K =  11.0000:  first b =   72   count =  10 of 81
//   the base-16 bound TODO 1d quotes, (ln 66 + K)/ln 16, at K = 1.3946, 7.6394, 11.3568: 2.014, 4.266, 5.607   (beta2 = 4.266)
//   read: a one-base proof at a small base is legal and useless; only the largest reachable bases turn a zone K into beta < beta2.
//
// === FAILS: 0 ===============================================
// ============================================================================
// READINGS
// ============================================================
// 1. CUSTODY. Three ladders parse (14 exact, 22 A144311+1, 64 A048670), the
//    two G2 ladders agree on the 14 shared terms, FAILS: 0. The control's
//    last six terms 978..1110 are the single-witness b-file tail.
// 2. THE SLACK. max_n S(n) = 1.3946 at n = 66 reproduces the trusted trap
//    ceiling; on the control the same slack reads 3.4965 at n = 66 and 4.4830
//    at n = 306 and is still rising at the end of the ladder, which is what a
//    truth exponent below 2 looks like on this instrument. [VERIFIED/MEASURED]
// 3. THE POWER-PAIR DEFECT. 15 reachable pairs, sup 1.0033 at (b,k) = (4,2),
//    the pair (16,4); custody 0.9694 at (16,2). Both reproduce
//    attack-hsub-01.md 1. The running sup last moved at n <= 64. [VERIFIED]
// 4. THE CONTROL'S SUP MOVES WITH REACH. At G2's reach (b^(k+1) <= 82) the
//    control's sup is 0.6931 at (9,1); at its own reach (<= 312) it is 0.9478
//    at (10,1): +0.2546 nats for a fourfold reach, and every record after
//    n = 8 is a k = 1 (diagonal) rung at a growing base (4, 6, 9, 10). So a
//    sup read at reach 82 is a floor on the true constant, not an estimate
//    of it, and the movement lives on the diagonal. [MEASURED]
// 5. THE MAP. beta_bound(K) = min_b (f(b)+K)/ln b reads 2.0000 at K = 1.3946
//    (b = 66) and 4.2665 at K = 11.3568 (b = 82): the trusted legal zone is
//    exactly [K_min(2), K_min(beta2)) on the reachable ladder. The argmin
//    base is 16 at K = 1.0033, 66 at 1.3946, 78 at 2 and 82 for every K >= 3.
//    K_min(1.5) = 0.3466 (b = 2) and K_min(1.797) = 0.7927 (b = 16) both sit
//    below the measured floor 1.0033: the reachable pairs bind harder than
//    the measured exponent's asymptotic need. [VERIFIED]
// 6. THE DIAGONAL DOES NOT READ delta. Synthetic exact laws return the slope
//    -delta to 1e-9 (0, -2, +1 for delta = 0, 2, -1), so the arithmetic is
//    right. The control, whose conjectured law has delta = 2 + o(1), reads
//    +0.5157 +- 0.1969 on 16 points (delta_hat = -0.5157) and +0.5298 +-
//    0.3018 on the same 8 bases G2 reaches: the wrong sign, more than two
//    standard errors from zero and further from -2. The instrument is NOT
//    calibrated at reach 17, and the G2 reading +0.0961 +- 0.4137 on 8 points
//    is therefore void, not "consistent with delta = 0". [MEASURED]
// 7. THE SIGN LEMMA, numerically. With c = 1, beta = 1.5, D(b,1) at
//    delta = -1 runs 0.1409 (b = 10) to 2.3381 (b = 1e9) and at delta = -0.1
//    0.0141 to 0.2338, unbounded; at delta = +1 it runs -0.1409 to -2.3381,
//    bounded above by its b = 2 value; at delta = 0 it is 0.0000. The
//    all-bases sup for delta >= 0 is 1.0597 per unit delta minus ln c.
// 8. THE LIFTING IDENTITY holds to 1e-12 on all four reachable instances
//    (D(4,1), D(4,2), D(8,1), D(9,1)). [VERIFIED]
// 9. THE TOP OF THE ZONE. At K = 11.3568 the required ratio caps e^K Ghat(b)
//    run 1.711e+5 (b = 2) to 2.566e+6 (b = 9) against observed ratios 5.27
//    to 57.00 and a b^1.5 model of 2.83 to 27.00; the minimum margin K - D
//    over the 15 pairs is 10.3535 nats (0.3913 at K = 1.3946). Which bases
//    convert a one-base K into beta < beta2 shrinks as K rises: 81 of 81 at
//    K = 2, 65 of 81 from b = 16 at K = 7.6394, 34 of 81 from b = 49 at
//    K = 10, 10 of 81 from b = 72 at K = 11. TODO 1d's base-16 formula
//    (ln 66 + K)/ln 16 reads 2.014, 4.266, 5.607 at K = 1.3946, 7.6394,
//    11.3568: below beta2 only up to the OLD ceiling; at the corrected
//    ceiling it is base 82, not 16, that carries the improvement. [VERIFIED]
